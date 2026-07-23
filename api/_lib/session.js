// 세션 쿠키 — AES-256-GCM 으로 암호화해서 담는다.
// 리프레시 토큰은 사용자가 취소하기 전까지 계속 유효해서, 인코딩만 해두면
// 쿠키 저장소에 접근할 수 있는 누구든 그대로 읽어간다. GCM 은 내용을 가리는 동시에
// 위조도 막아준다(태그 검증 실패 = 복호화 실패).

const crypto = require("crypto");

const COOKIE = "owl_session";
const MAX_AGE = 30 * 24 * 60 * 60;   // 30일

function key() {
  const secret = process.env.SESSION_SECRET;
  if (!secret) throw new Error("SESSION_SECRET 환경변수가 없습니다");
  return crypto.createHash("sha256").update(secret).digest();
}

function seal(data) {
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv("aes-256-gcm", key(), iv);
  const body = Buffer.concat([cipher.update(JSON.stringify(data), "utf8"), cipher.final()]);
  return Buffer.concat([iv, cipher.getAuthTag(), body]).toString("base64url");
}

function open(value) {
  try {
    const raw = Buffer.from(value, "base64url");
    const decipher = crypto.createDecipheriv("aes-256-gcm", key(), raw.subarray(0, 12));
    decipher.setAuthTag(raw.subarray(12, 28));
    const body = Buffer.concat([decipher.update(raw.subarray(28)), decipher.final()]);
    return JSON.parse(body.toString("utf8"));
  } catch {
    return null;   // 위조·만료·시크릿 변경 — 어느 경우든 로그인 안 된 것으로 본다
  }
}

function readCookie(req, name) {
  const header = req.headers.cookie || "";
  for (const part of header.split(";")) {
    const [k, ...rest] = part.trim().split("=");
    if (k === name) return rest.join("=");
  }
  return "";
}

const sessionCookie = (value, maxAge = MAX_AGE) =>
  `${COOKIE}=${value}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=${maxAge}`;

// 요청 주소에서 앱 주소를 만든다. 환경변수를 하나 덜 관리하려는 것.
function appUrl(req) {
  const host = req.headers["x-forwarded-host"] || req.headers.host || "";
  const proto = req.headers["x-forwarded-proto"] || (host.startsWith("localhost") ? "http" : "https");
  return `${proto}://${host}`;
}

module.exports = {
  COOKIE, MAX_AGE, seal, open, readCookie, sessionCookie, appUrl,
  getSession: (req) => open(readCookie(req, COOKIE)),
  clearCookie: () => sessionCookie("", 0),
};
