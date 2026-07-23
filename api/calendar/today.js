// 오늘 일정을 읽어 돌려준다. 읽기 전용이라 이 앱은 일정을 만들거나 고칠 수 없다.
// 하루의 경계는 사용자 시간대 기준이어야 해서, 브라우저가 계산한 범위를 받아 쓴다.

const { requireSession, api } = require("../_lib/google");

module.exports = async (req, res) => {
  const session = await requireSession(req, res);
  if (!session) return;

  const { timeMin, timeMax } = req.query;
  if (!timeMin || !timeMax) return res.status(400).json({ error: "range_required" });

  try {
    const query = new URLSearchParams({
      timeMin, timeMax, singleEvents: "true", orderBy: "startTime", maxResults: "20",
    });
    const data = await (await api(
      session,
      `https://www.googleapis.com/calendar/v3/calendars/primary/events?${query}`,
    )).json();

    // 브라우저에는 필요한 값만 내려보낸다.
    const events = (data.items || [])
      .filter((event) => event.status !== "cancelled" && event.summary)
      .map((event) => ({
        id: event.id,
        summary: event.summary,
        allDay: Boolean(event.start?.date),
        start: event.start?.dateTime || event.start?.date || "",
      }));
    res.json({ events });
  } catch (error) {
    console.error("[calendar] 조회 실패", error);
    res.status(502).json({ error: "calendar_failed" });
  }
};
