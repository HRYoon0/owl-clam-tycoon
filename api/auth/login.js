// 구글 동의 화면으로 보낸다.
// access_type=offline + prompt=consent 라야 리프레시 토큰이 발급된다.
// (prompt 를 빼면 두 번째 로그인부터는 리프레시 토큰을 주지 않는다)

const crypto = require("crypto");
const { SCOPES } = require("../_lib/google");
const { appUrl } = require("../_lib/session");

module.exports = (req, res) => {
  if (!process.env.GOOGLE_CLIENT_ID) return res.status(500).send("GOOGLE_CLIENT_ID 환경변수가 없습니다");

  // CSRF 방지: 무작위 state 를 쿠키에 심고 콜백에서 대조한다.
  const state = crypto.randomBytes(16).toString("base64url");
  res.setHeader("Set-Cookie", `owl_state=${state}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=600`);

  const params = new URLSearchParams({
    client_id: process.env.GOOGLE_CLIENT_ID,
    redirect_uri: `${appUrl(req)}/api/auth/callback`,
    response_type: "code",
    scope: SCOPES,
    access_type: "offline",
    prompt: "consent",
    include_granted_scopes: "true",
    state,
  });
  res.redirect(`https://accounts.google.com/o/oauth2/v2/auth?${params}`);
};
