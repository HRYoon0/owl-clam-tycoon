// appDataFolder 는 앱 전용 숨김 폴더다. 사용자 드라이브 목록에 보이지 않고
// 다른 앱은 접근할 수 없다. 남의 파일은 애초에 볼 수 없는 최소 권한.

const { api } = require("./google");

const SAVE_NAME = "save.json";

async function findSaveFile(session) {
  const query = new URLSearchParams({
    spaces: "appDataFolder",
    q: `name = '${SAVE_NAME}' and trashed = false`,
    fields: "files(id)",
    pageSize: "1",
  });
  const data = await (await api(session, `https://www.googleapis.com/drive/v3/files?${query}`)).json();
  return data.files?.[0]?.id || "";
}

async function writeSave(session, body) {
  const id = await findSaveFile(session);
  if (id) {
    await api(session, `https://www.googleapis.com/upload/drive/v3/files/${id}?uploadType=media`, {
      method: "PATCH", headers: { "Content-Type": "application/json" }, body,
    });
    return id;
  }
  // 첫 저장은 메타데이터와 내용을 함께 보내는 multipart 업로드로 만든다.
  const boundary = "owlclam" + Math.random().toString(36).slice(2);
  const metadata = JSON.stringify({ name: SAVE_NAME, parents: ["appDataFolder"] });
  const payload =
    `--${boundary}\r\nContent-Type: application/json; charset=UTF-8\r\n\r\n${metadata}\r\n` +
    `--${boundary}\r\nContent-Type: application/json\r\n\r\n${body}\r\n--${boundary}--`;
  const created = await (await api(
    session,
    "https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=id",
    { method: "POST", headers: { "Content-Type": `multipart/related; boundary=${boundary}` }, body: payload },
  )).json();
  return created.id;
}

module.exports = { SAVE_NAME, findSaveFile, writeSave };
