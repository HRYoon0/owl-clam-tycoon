// 게임 기록을 드라이브 appDataFolder 에 저장한다.

const { requireSession } = require("../_lib/google");
const { writeSave } = require("../_lib/drive");

module.exports = async (req, res) => {
  if (req.method !== "POST") return res.status(405).json({ error: "method_not_allowed" });
  const session = await requireSession(req, res);
  if (!session) return;

  const save = req.body?.save;
  if (!save || typeof save !== "object") return res.status(400).json({ error: "bad_request" });

  try {
    await writeSave(session, JSON.stringify(save));
    res.json({ ok: true });
  } catch (error) {
    console.error("[drive] 저장 실패", error);
    res.status(502).json({ error: "drive_save_failed" });
  }
};
