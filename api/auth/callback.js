// 구글이 돌려준 code 를 토큰으로 바꿔 세션 쿠키에 담고 게임으로 되돌려보낸다.

const { seal, sessionCookie, appUrl, readCookie } = require("../_lib/session");

module.exports = async (req, res) => {
  const base = appUrl(req);
  const { code, state, error } = req.query;

  if (error) return res.redirect(`${base}/?login=denied`);
  if (!code) return res.redirect(`${base}/?login=error`);
  // login.js 가 심은 값과 다르면 남이 만든 요청이다.
  if (!state || state !== readCookie(req, "owl_state")) return res.redirect(`${base}/?login=state`);

  try {
    const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        code,
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        redirect_uri: `${base}/api/auth/callback`,
        grant_type: "authorization_code",
      }),
    });
    if (!tokenResponse.ok) {
      console.error("[auth] 토큰 교환 실패", await tokenResponse.text());
      return res.redirect(`${base}/?login=token`);
    }
    const tokens = await tokenResponse.json();

    const me = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
      headers: { Authorization: `Bearer ${tokens.access_token}` },
    }).then((r) => (r.ok ? r.json() : {}));

    const session = {
      accessToken: tokens.access_token,
      refreshToken: tokens.refresh_token || "",
      expiresAt: Date.now() + (tokens.expires_in || 3600) * 1000,
      email: me.email || "",
    };
    res.setHeader("Set-Cookie", [
      sessionCookie(seal(session)),
      "owl_state=; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=0",
    ]);
    res.redirect(`${base}/?login=ok`);
  } catch (err) {
    console.error("[auth] 콜백 실패", err);
    res.redirect(`${base}/?login=error`);
  }
};
