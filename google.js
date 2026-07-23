// 구글 연동 — 로그인 · 드라이브 저장 · 캘린더 가져오기
// 설정 방법은 GOOGLE-SETUP.md 참고. 아래 CLIENT_ID 한 줄만 채우면 켜진다.
// 비워두면 연결 버튼이 숨겨지고 게임은 지금까지처럼 로컬로만 동작한다.

const CLIENT_ID = "892165524575-jfne1e5b5gtih6jt4oivm3d2fpmvrkfs.apps.googleusercontent.com";

const SCOPES = [
  "https://www.googleapis.com/auth/drive.appdata",      // 앱 전용 숨김 폴더 (남의 파일은 볼 수 없음)
  "https://www.googleapis.com/auth/calendar.readonly",  // 일정 읽기만
  "https://www.googleapis.com/auth/userinfo.email",     // 어느 계정인지 표시용
].join(" ");

const SAVE_NAME = "save.json";
const CONNECTED_KEY = "owl-clam-google-connected";
const TOKEN_KEY = "owl-clam-google-token";       // 새로고침해도 로그인이 풀리지 않도록 보관
const CALENDAR_KEY = "owl-clam-calendar";        // 메인 창이 받아온 일정을 위젯 창에 넘기는 통로
const CALENDAR_DONE_DAYS = 14;   // 완료 기록을 이 일수만큼만 남긴다

let tokenClient;
let accessToken = "";
let tokenExpiresAt = 0;
let account = "";
let saveFileId = "";
let uploadTimer;
let applyingRemote = false;      // 원격 기록을 반영하는 중에는 다시 올리지 않는다

const cloudButton = document.getElementById("googleButton");

// ── 공통 ────────────────────────────────────────────────────────────────
const dayKey = (date) => {
  const pad = (n) => String(n).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
};

// state: "off" | "on" | "expired"
let uiState = "off";
function setStatus(next) {
  uiState = next;
  if (!cloudButton) return;
  cloudButton.textContent = "G";
  cloudButton.classList.toggle("connected", next === "on");
  cloudButton.classList.toggle("expired", next === "expired");
  const label = next === "on" ? `${account} 연결됨. 눌러서 연결 해제`
    : next === "expired" ? "구글 연결이 만료됐습니다. 눌러서 다시 연결"
    : "구글 계정 연결";
  cloudButton.setAttribute("title", label);
  cloudButton.setAttribute("aria-label", label);
}

// 토큰은 한 시간쯤 살아 있다. 보관해두면 그동안은 새로고침해도 팝업 없이 이어진다.
// 참고: 액세스 토큰을 localStorage에 두는 방식이라 XSS가 나면 함께 노출된다.
// 이 앱의 사용자 입력은 전부 이스케이프 처리돼 있고 범위도 좁아(앱 전용 폴더 · 캘린더 읽기) 감수한다.
function saveToken() {
  try { localStorage.setItem(TOKEN_KEY, JSON.stringify({ accessToken, tokenExpiresAt, account })); } catch {}
}
function restoreToken() {
  try {
    const saved = JSON.parse(localStorage.getItem(TOKEN_KEY) || "null");
    if (!saved?.accessToken || Date.now() >= saved.tokenExpiresAt - 60000) return false;
    accessToken = saved.accessToken;
    tokenExpiresAt = saved.tokenExpiresAt;
    account = saved.account || "";
    return true;
  } catch { return false; }
}
function clearToken() {
  accessToken = ""; tokenExpiresAt = 0;
  localStorage.removeItem(TOKEN_KEY);
}

// 토큰이 만료되면 팝업을 다시 띄워야 하는데, 클릭 없이 띄우면 브라우저가 막는다.
// 그래서 자동 재시도 대신 버튼을 "다시 연결" 상태로 바꿔 사용자가 누르게 한다.
function needsReconnect() {
  clearToken();
  Cloud.calendarTasks = [];
  setStatus("expired");
  showToast("구글 연결이 만료됐습니다. G 버튼을 눌러 다시 연결해 주세요.");
  render(false);
}

// ── 토큰 ────────────────────────────────────────────────────────────────
// 브라우저 토큰 방식은 리프레시 토큰이 없어 한 시간쯤 뒤 만료된다.
// 이미 동의한 사용자는 prompt:"" 로 화면 없이 조용히 다시 받을 수 있다.
function requestToken(interactive) {
  return new Promise((resolve, reject) => {
    if (!tokenClient) return reject(new Error("토큰 클라이언트가 아직 준비되지 않았습니다"));
    tokenClient.callback = (response) => {
      if (response.error) return reject(new Error(response.error));
      accessToken = response.access_token;
      tokenExpiresAt = Date.now() + (Number(response.expires_in) || 3600) * 1000;
      saveToken();
      resolve(accessToken);
    };
    tokenClient.error_callback = (error) => reject(new Error(error?.type || "토큰 요청 실패"));
    tokenClient.requestAccessToken({ prompt: interactive ? "consent" : "" });
  });
}

const RECONNECT = "RECONNECT";

function ensureToken() {
  if (accessToken && Date.now() < tokenExpiresAt - 60000) return accessToken;
  throw new Error(RECONNECT);   // 자동 팝업은 차단되므로 사용자 클릭을 기다린다
}

async function api(url, options = {}) {
  const token = ensureToken();
  const response = await fetch(url, {
    ...options,
    headers: { Authorization: `Bearer ${token}`, ...(options.headers || {}) },
  });
  if (response.status === 401) throw new Error(RECONNECT);
  if (!response.ok) throw new Error(`${response.status} ${await response.text()}`);
  return response;
}

// ── 드라이브 ────────────────────────────────────────────────────────────
async function findSaveFile() {
  if (saveFileId) return saveFileId;
  const query = new URLSearchParams({
    spaces: "appDataFolder",
    q: `name = '${SAVE_NAME}' and trashed = false`,
    fields: "files(id)",
    pageSize: "1",
  });
  const data = await (await api(`https://www.googleapis.com/drive/v3/files?${query}`)).json();
  saveFileId = data.files?.[0]?.id || "";
  return saveFileId;
}

async function downloadSave() {
  const id = await findSaveFile();
  if (!id) return null;
  const text = await (await api(`https://www.googleapis.com/drive/v3/files/${id}?alt=media`)).text();
  try { return JSON.parse(text); } catch { return null; }
}

async function uploadSave() {
  const body = JSON.stringify(state);
  const id = await findSaveFile();
  if (id) {
    await api(`https://www.googleapis.com/upload/drive/v3/files/${id}?uploadType=media`, {
      method: "PATCH", headers: { "Content-Type": "application/json" }, body,
    });
    return;
  }
  // 첫 저장은 메타데이터와 내용을 한 번에 보내는 multipart 업로드로 만든다.
  const boundary = "owlclam" + Math.random().toString(36).slice(2);
  const metadata = JSON.stringify({ name: SAVE_NAME, parents: ["appDataFolder"] });
  const payload =
    `--${boundary}\r\nContent-Type: application/json; charset=UTF-8\r\n\r\n${metadata}\r\n` +
    `--${boundary}\r\nContent-Type: application/json\r\n\r\n${body}\r\n--${boundary}--`;
  const created = await (await api(
    "https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=id",
    { method: "POST", headers: { "Content-Type": `multipart/related; boundary=${boundary}` }, body: payload },
  )).json();
  saveFileId = created.id;
}

// ── 캘린더 ──────────────────────────────────────────────────────────────
function eventLabel(event) {
  if (event.start?.date) return "종일";
  const at = new Date(event.start.dateTime);
  return `${String(at.getHours()).padStart(2, "0")}:${String(at.getMinutes()).padStart(2, "0")}`;
}

async function fetchCalendar() {
  const start = new Date(); start.setHours(0, 0, 0, 0);
  const end = new Date(start); end.setDate(end.getDate() + 1);
  const query = new URLSearchParams({
    timeMin: start.toISOString(), timeMax: end.toISOString(),
    singleEvents: "true", orderBy: "startTime", maxResults: "20",
  });
  const data = await (await api(`https://www.googleapis.com/calendar/v3/calendars/primary/events?${query}`)).json();
  const today = dayKey(new Date());
  Cloud.calendarTasks = (data.items || [])
    .filter((event) => event.status !== "cancelled" && event.summary)
    .map((event) => ({
      id: `cal:${event.id}`,
      eventId: event.id,
      calendar: true,
      text: `${eventLabel(event)} ${event.summary}`,
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

// 이미 받아둔 토큰으로 동기화와 캘린더 조회를 한다. 팝업이 필요 없다.
async function resume() {
  const me = await (await api("https://www.googleapis.com/oauth2/v3/userinfo")).json();
  account = me.email || "";
  saveToken();
  const message = await syncOnConnect();
  setStatus("on");
  await fetchCalendar();
  pruneCalendarDone();
  render();
  return message;
}

async function connect() {
  try {
    await requestToken(true);
    localStorage.setItem(CONNECTED_KEY, "1");
    showToast(await resume());
  } catch (error) {
    if (error.message === RECONNECT) return needsReconnect();
    disconnect(true);
    showToast("구글 연결에 실패했습니다. 다시 시도해 주세요.");
    console.error("[google]", error);
  }
}

function disconnect(quiet) {
  if (accessToken && window.google?.accounts?.oauth2) google.accounts.oauth2.revoke(accessToken, () => {});
  clearToken();
  account = ""; saveFileId = "";
  Cloud.calendarTasks = [];
  localStorage.removeItem(CONNECTED_KEY);
  localStorage.removeItem(CALENDAR_KEY);
  setStatus("off");
  if (!quiet) { showToast("구글 연결을 끊었습니다. 기록은 이 기기에 남아 있습니다."); render(); }
}

function pruneCalendarDone() {
  if (!state.calendarDone) return;
  const limit = dayKey(new Date(Date.now() - CALENDAR_DONE_DAYS * 86400000));
  for (const [id, day] of Object.entries(state.calendarDone)) if (day < limit) delete state.calendarDone[id];
}

// ── 바깥에서 쓰는 창구 ──────────────────────────────────────────────────
const Cloud = {
  calendarTasks: [],
  isConnected: () => Boolean(accessToken),

  // 저장할 때마다 불린다. 매번 올리면 드라이브를 두들기므로 잠깐 모았다 한 번만 올린다.
  markDirty() {
    if (!accessToken || applyingRemote) return;
    clearTimeout(uploadTimer);
    uploadTimer = setTimeout(() => {
      uploadSave().catch((error) => {
        if (error.message === RECONNECT) return needsReconnect();
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

// 위젯 창은 로그인하지 않는다. 팝업 안에서 OAuth 팝업을 또 띄우면 차단되기 쉽고,
// 두 창이 각자 토큰을 들고 드라이브에 쓰면 서로를 덮어쓴다.
// 대신 메인 창이 localStorage 에 넘겨둔 오늘 일정을 읽어서 보여주기만 한다.
function useSharedCalendar() {
  try {
    const shared = JSON.parse(localStorage.getItem(CALENDAR_KEY) || "null");
    Cloud.calendarTasks = shared && shared.day === dayKey(new Date()) ? shared.items : [];
  } catch { Cloud.calendarTasks = []; }
}

// ── 시작 ────────────────────────────────────────────────────────────────
function initGoogle() {
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
  if (!CLIENT_ID) { cloudButton.hidden = true; return; }   // 설정 전에는 버튼을 숨긴다

  tokenClient = google.accounts.oauth2.initTokenClient({ client_id: CLIENT_ID, scope: SCOPES, callback: () => {} });
  cloudButton.addEventListener("click", () => (uiState === "on" ? disconnect() : connect()));
  setStatus("off");

  // 보관해둔 토큰이 아직 살아 있으면 팝업 없이 그대로 이어간다.
  if (restoreToken()) {
    setStatus("on");
    resume().catch((error) => {
      if (error.message === RECONNECT) return needsReconnect();
      console.error("[google] 이어붙이기 실패", error);
      setStatus("off");
    });
  } else if (localStorage.getItem(CONNECTED_KEY)) {
    // 지난번엔 연결했지만 토큰이 만료됐다. 자동 팝업은 막히므로 눌러달라고만 표시한다.
    setStatus("expired");
  }
}

// GIS 스크립트는 async 로 실려서 window load 이후에 준비될 수도 있다.
// load 이벤트 한 번만 보고 판단하면 그 경우를 놓치므로 잠깐 기다려본다.
(function waitForGis(triesLeft = 50) {
  if (document.body.classList.contains("widget-mode") || !CLIENT_ID) return initGoogle();
  if (window.google?.accounts?.oauth2) return initGoogle();
  if (triesLeft <= 0) { if (cloudButton) cloudButton.hidden = true; return; }
  setTimeout(() => waitForGis(triesLeft - 1), 100);
})();
