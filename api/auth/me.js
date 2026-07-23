// 로그인 상태 확인. 필요하면 여기서 액세스 토큰이 조용히 갱신된다.
// 액세스 토큰 자체는 절대 브라우저로 내려보내지 않는다.

const { liveSession } = require("../_lib/google");

module.exports = async (req, res) => {
  const session = await liveSession(req, res);
  if (!session) return res.status(401).json({ connected: false });
  res.json({ connected: true, email: session.email || "" });
};
