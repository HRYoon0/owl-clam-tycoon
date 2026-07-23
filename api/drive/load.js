// 드라이브 appDataFolder 에 저장된 게임 기록을 읽어 돌려준다.
// 저장한 적이 없으면 null (브라우저가 "처음"으로 판단하게 한다).

const { requireSession, api } = require("../_lib/google");
const { SAVE_NAME, findSaveFile } = require("../_lib/drive");

module.exports = async (req, res) => {
  const session = await requireSession(req, res);
  if (!session) return;
  try {
    const id = await findSaveFile(session);
    if (!id) return res.json({ save: null });
    const text = await (await api(session, `https://www.googleapis.com/drive/v3/files/${id}?alt=media`)).text();
    res.json({ save: JSON.parse(text) });
  } catch (error) {
    console.error("[drive] 불러오기 실패", error);
    res.status(502).json({ error: "drive_load_failed" });
  }
};
