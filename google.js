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

function setStatus(label, connected) {
  if (!cloudButton) return;
  cloudButton.textContent = label;
  cloudButton.classList.toggle("connected", Boolean(connected));
  cloudButton.setAttribute("title", account ? `${account} · 눌러서 연결 해제` : "구글 계정 연결");
  cloudButton.setAttribute("aria-label", account ? `${account} 연결됨. 눌러서 연결 해제` : "구글 계정 연결");
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
      resolve(accessToken);
    };
    tokenClient.error_callback = (error) => reject(new Error(error?.type || "토큰 요청 실패"));
    tokenClient.requestAccessToken({ prompt: interactive ? "consent" : "" });
  });
}

async function ensureToken() {
  if (accessToken && Date.now() < tokenExpiresAt - 60000) return accessToken;
  return requestToken(false);
}

// 401이면 토큰을 새로 받아 한 번만 재시도한다.
async function api(url, options = {}, retried = false) {
  const token = await ensureToken();
  const response = await fetch(url, {
    ...options,
    headers: { Authorization: `Bearer ${token}`, ...(options.headers || {}) },
  });
  if (response.status === 401 && !retried) {
    accessToken = "";
    return api(url, options, true);
  }
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

async function connect() {
  setStatus("···");
  try {
    await requestToken(true);
    const me = await (await api("https://www.googleapis.com/oauth2/v3/userinfo")).json();
    account = me.email || "";
    localStorage.setItem(CONNECTED_KEY, "1");

    const message = await syncOnConnect();
    setStatus("G", true);
    showToast(message);

    await fetchCalendar();
    pruneCalendarDone();
    render();
  } catch (error) {
    disconnect(true);
    showToast("구글 연결에 실패했습니다. 다시 시도해 주세요.");
    console.error("[google]", error);
  }
}

function disconnect(quiet) {
  if (accessToken && window.google?.accounts?.oauth2) google.accounts.oauth2.revoke(accessToken, () => {});
  accessToken = ""; tokenExpiresAt = 0; account = ""; saveFileId = "";
  Cloud.calendarTasks = [];
  localStorage.removeItem(CONNECTED_KEY);
  setStatus("G", false);
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
      uploadSave().catch((error) => console.error("[google] 업로드 실패", error));
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
  cloudButton.addEventListener("click", () => (Cloud.isConnected() ? disconnect() : connect()));
  setStatus("G", false);

  // 지난번에 연결했다면 화면 없이 조용히 다시 붙는다.
  if (localStorage.getItem(CONNECTED_KEY)) {
    requestToken(false)
      .then(async () => {
        const me = await (await api("https://www.googleapis.com/oauth2/v3/userinfo")).json();
        account = me.email || "";
        await syncOnConnect();
        setStatus("G", true);
        await fetchCalendar();
        pruneCalendarDone();
        render();
      })
      .catch(() => setStatus("G", false));   // 조용한 재연결 실패는 버튼만 남기고 넘어간다
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
