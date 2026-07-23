// 구글 연동 (브라우저 쪽) — 로그인 · 드라이브 저장 · 캘린더 가져오기
//
// 구글과의 통신은 전부 서버(/api/*)가 대신한다. 그래서 여기에는
// 클라이언트 ID도, 액세스 토큰도, 구글 SDK도 없다.
// 서버가 리프레시 토큰을 쥐고 조용히 갱신하므로 로그인은 계속 유지된다.
//
// /api 가 없는 곳(예: GitHub Pages 같은 정적 호스팅)에 올리면
// 연결 버튼이 저절로 숨겨지고 게임은 지금까지처럼 로컬로만 동작한다.

const CALENDAR_KEY = "owl-clam-calendar";        // 메인 창이 받아온 일정을 위젯 창에 넘기는 통로
const CALENDAR_DONE_DAYS = 14;                   // 완료 기록을 이 일수만큼만 남긴다

let account = "";
let uploadTimer;
let applyingRemote = false;                      // 원격 기록을 반영하는 중에는 다시 올리지 않는다

const cloudButton = document.getElementById("googleButton");

const dayKey = (date) => {
  const pad = (n) => String(n).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
};

function setStatus(connected) {
  if (!cloudButton) return;
  cloudButton.classList.toggle("connected", connected);
  const label = connected ? `${account} 연결됨. 눌러서 연결 해제` : "구글 계정 연결";
  cloudButton.setAttribute("title", label);
  cloudButton.setAttribute("aria-label", label);
}

async function apiJson(path, options) {
  const response = await fetch(path, { credentials: "same-origin", ...options });
  if (response.status === 401) throw new Error("UNAUTHORIZED");
  if (!response.ok) throw new Error(`${path} ${response.status}`);
  return response.json();
}

// ── 드라이브 ────────────────────────────────────────────────────────────
const downloadSave = () => apiJson("/api/drive/load").then((data) => data.save);

const uploadSave = () => apiJson("/api/drive/save", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ save: state }),
});

// ── 캘린더 ──────────────────────────────────────────────────────────────
async function fetchCalendar() {
  // 하루의 경계는 보는 사람의 시간대 기준이어야 하므로 여기서 계산해 넘긴다.
  const start = new Date(); start.setHours(0, 0, 0, 0);
  const end = new Date(start); end.setDate(end.getDate() + 1);
  const query = new URLSearchParams({ timeMin: start.toISOString(), timeMax: end.toISOString() });
  const { events } = await apiJson(`/api/calendar/today?${query}`);

  const today = dayKey(new Date());
  Cloud.calendarTasks = events.map((event) => ({
    id: `cal:${event.id}`,
    eventId: event.id,
    calendar: true,
    text: `${event.allDay ? "종일" : new Date(event.start).toTimeString().slice(0, 5)} ${event.summary}`,
    done: state.calendarDone?.[event.id] === today,
  }));
  // 위젯 창은 로그인을 따로 하지 않으므로, 받아온 일정을 넘겨준다.
  localStorage.setItem(CALENDAR_KEY, JSON.stringify({ day: today, items: Cloud.calendarTasks }));
}

// ── 동기화 ──────────────────────────────────────────────────────────────
// 갈라진 두 기록을 합치는 건 위험해서, 더 최근에 저장된 쪽을 그대로 쓴다.
async function syncOnConnect() {
  const remote = await downloadSave();
  if (!remote) { await uploadSave(); return "이 기기 기록을 드라이브에 올렸습니다."; }

  const neverPlayedHere = localStorage.getItem(saveKey) === null;
  if (neverPlayedHere || (remote.updatedAt || 0) > (state.updatedAt || 0)) {
    applyingRemote = true;
    state = { ...initialState, ...remote, sound: state.sound };
    localStorage.setItem(saveKey, JSON.stringify(state));
    render(false);
    applyingRemote = false;
    return "드라이브에 저장된 기록을 불러왔습니다.";
  }
  await uploadSave();
  return "이 기기 기록이 더 최신이라 드라이브를 갱신했습니다.";
}

function pruneCalendarDone() {
  if (!state.calendarDone) return;
  const limit = dayKey(new Date(Date.now() - CALENDAR_DONE_DAYS * 86400000));
  for (const [id, day] of Object.entries(state.calendarDone)) if (day < limit) delete state.calendarDone[id];
}

async function resume(quiet) {
  const message = await syncOnConnect();
  if (!quiet) showToast(message);
  await fetchCalendar();
  pruneCalendarDone();
  render();
}

function signedOut() {
  account = "";
  Cloud.connected = false;
  Cloud.calendarTasks = [];
  localStorage.removeItem(CALENDAR_KEY);
  setStatus(false);
  render(false);
}

async function disconnect() {
  await fetch("/api/auth/logout", { method: "POST", credentials: "same-origin" }).catch(() => {});
  signedOut();
  showToast("구글 연결을 끊었습니다. 기록은 이 기기에 남아 있습니다.");
}

// ── 바깥에서 쓰는 창구 ──────────────────────────────────────────────────
const Cloud = {
  calendarTasks: [],
  connected: false,
  isConnected: () => Cloud.connected,

  // 저장할 때마다 불린다. 매번 올리면 API를 두들기므로 잠깐 모았다 한 번만 올린다.
  markDirty() {
    if (!Cloud.connected || applyingRemote) return;
    clearTimeout(uploadTimer);
    uploadTimer = setTimeout(() => {
      uploadSave().catch((error) => {
        if (error.message === "UNAUTHORIZED") { signedOut(); return showToast("구글 연결이 풀렸습니다. G 버튼을 눌러 다시 연결해 주세요."); }
        console.error("[google] 업로드 실패", error);
      });
    }, 2500);
  },

  // 캘린더에서 온 할 일은 게임 목록에 저장하지 않는다. 대신 완료한 날짜만 남겨
  // 오늘 안에서는 완료 상태가 유지되고 내일이면 목록에서 사라진다.
  markCalendarDone(task) {
    state.calendarDone = state.calendarDone || {};
    state.calendarDone[task.eventId] = dayKey(new Date());
  },
};
window.Cloud = Cloud;

// ── 시작 ────────────────────────────────────────────────────────────────
// 위젯 창은 로그인하지 않는다. 창이 둘 다 각자 저장하면 서로를 덮어쓴다.
// 대신 메인 창이 localStorage 에 넘겨둔 오늘 일정을 읽어서 보여주기만 한다.
function useSharedCalendar() {
  try {
    const shared = JSON.parse(localStorage.getItem(CALENDAR_KEY) || "null");
    Cloud.calendarTasks = shared && shared.day === dayKey(new Date()) ? shared.items : [];
  } catch { Cloud.calendarTasks = []; }
}

// 로그인 결과(?login=…)는 서버가 되돌려보낼 때 붙여주는 값이다.
// 한 번 읽고 주소에서 지운다 — 주소창·북마크·방문 기록에 남을 이유가 없다.
function takeLoginResult() {
  const params = new URLSearchParams(location.search);
  const result = params.get("login");
  if (!result) return "";
  params.delete("login");
  const rest = params.toString();
  history.replaceState(null, "", location.pathname + (rest ? `?${rest}` : "") + location.hash);
  return result;
}

(async function initGoogle() {
  const loginResult = takeLoginResult();

  if (document.body.classList.contains("widget-mode")) {
    if (cloudButton) cloudButton.hidden = true;
    useSharedCalendar();
    window.addEventListener("storage", (event) => {
      if (event.key !== CALENDAR_KEY) return;
      useSharedCalendar();
      render(false);
    });
    render(false);
    return;
  }
  if (!cloudButton) return;

  let me;
  try {
    me = await apiJson("/api/auth/me");
  } catch (error) {
    if (error.message !== "UNAUTHORIZED") {
      // /api 가 없는 곳에 올라간 것이다. 구글 기능 없이 게임만 돌린다.
      cloudButton.hidden = true;
      return;
    }
  }

  cloudButton.addEventListener("click", () => (Cloud.connected ? disconnect() : (location.href = "/api/auth/login")));

  if (!me?.connected) {
    setStatus(false);
    // 로그인하러 갔다가 실패해서 돌아온 경우에만 알린다.
    if (loginResult && loginResult !== "ok") showToast("구글 로그인에 실패했습니다. 다시 시도해 주세요.");
    return;
  }

  account = me.email || "";
  Cloud.connected = true;
  setStatus(true);
  try {
    await resume();
  } catch (error) {
    if (error.message === "UNAUTHORIZED") return signedOut();
    console.error("[google] 이어붙이기 실패", error);
  }
})();
