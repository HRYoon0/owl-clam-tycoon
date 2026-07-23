// 구글 토큰 갱신과 인증된 호출.
// 서버가 리프레시 토큰을 쥐고 있어서, 액세스 토큰이 만료되면 사용자 개입 없이 새로 받는다.
// 이것이 브라우저 전용 방식으로는 불가능했던 부분이다.

const { getSession, seal, sessionCookie, clearCookie } = require("./session");

const SCOPES = [
  "https://www.googleapis.com/auth/drive.appdata",
  "https://www.googleapis.com/auth/calendar.readonly",
  "https://www.googleapis.com/auth/userinfo.email",
].join(" ");

async function refresh(session) {
  const response = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: process.env.GOOGLE_CLIENT_ID,
      client_secret: process.env.GOOGLE_CLIENT_SECRET,
      refresh_token: session.refreshToken,
      grant_type: "refresh_token",
    }),
  });
  if (!response.ok) return null;
  const data = await response.json();
  return {
    ...session,
    accessToken: data.access_token,
    expiresAt: Date.now() + (data.expires_in || 3600) * 1000,
  };
}

// 살아 있는 세션을 돌려준다. 만료가 가까우면 갱신하고 쿠키도 새로 심는다.
// 갱신에 실패하면(사용자가 권한을 취소한 경우 등) 쿠키를 지우고 null.
async function liveSession(req, res) {
  const session = getSession(req);
  if (!session?.accessToken) return null;
  if (Date.now() < session.expiresAt - 60000) return session;

  if (!session.refreshToken) { res.setHeader("Set-Cookie", clearCookie()); return null; }
  const renewed = await refresh(session);
  if (!renewed) { res.setHeader("Set-Cookie", clearCookie()); return null; }
  res.setHeader("Set-Cookie", sessionCookie(seal(renewed)));
  return renewed;
}

async function api(session, url, options = {}) {
  const response = await fetch(url, {
    ...options,
    headers: { Authorization: `Bearer ${session.accessToken}`, ...(options.headers || {}) },
  });
  if (!response.ok) throw new Error(`${response.status} ${await response.text()}`);
  return response;
}

// 로그인 안 된 요청을 401 로 끊어주는 공통 처리
async function requireSession(req, res) {
  const session = await liveSession(req, res);
  if (!session) { res.status(401).json({ error: "unauthorized" }); return null; }
  return session;
}

module.exports = { SCOPES, liveSession, requireSession, api };
