// 세션 쿠키를 지운다. 구글 쪽 권한까지 회수하지는 않는다
// (다시 로그인할 때 동의 화면을 또 거치지 않도록).

const { clearCookie } = require("../_lib/session");

module.exports = (req, res) => {
  res.setHeader("Set-Cookie", clearCookie());
  res.json({ connected: false });
};
