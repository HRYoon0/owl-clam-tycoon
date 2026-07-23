# 구글 연동 설정

배포 주소: **https://owlapp2.vercel.app**

구글 로그인·드라이브 저장·캘린더 가져오기는 **버셀 서버리스 함수**(`api/`)가 처리합니다.
브라우저에는 클라이언트 ID도 액세스 토큰도 들어가지 않습니다.

> **GitHub Pages 사본은 그대로 둬도 됩니다.** `/api` 가 없는 곳에서는 연결 버튼이 저절로 숨겨지고
> 게임이 로컬 저장만으로 동작합니다.

---

## 왜 서버를 두는가

브라우저만으로 하는 방식(구글 토큰 클라이언트)은 **리프레시 토큰을 발급받을 수 없습니다.**
액세스 토큰은 한 시간이면 만료되는데, 갱신하려면 팝업을 다시 띄워야 하고 그 팝업은
사용자 클릭 없이는 브라우저가 차단합니다. 즉 한 시간마다 로그인 버튼을 눌러야 합니다.

서버가 있으면 **authorization code 흐름**을 쓸 수 있고, 이 흐름만이 리프레시 토큰을 줍니다.
서버가 그 토큰을 쥐고 조용히 갱신하므로 로그인이 계속 유지됩니다.
덤으로 액세스 토큰이 브라우저에 아예 내려가지 않아 XSS 노출 위험도 사라집니다.

---

## 1. 구글 클라우드 설정

### 1-1. API 사용 설정

**API 및 서비스 → 라이브러리** 에서 각각 **사용 설정**

- **Google Drive API**
- **Google Calendar API**

### 1-2. Google Auth Platform

왼쪽 메뉴가 `개요 / 브랜딩 / 대상 / 클라이언트 / 데이터 액세스 …` 인 새 화면 기준입니다.

| 메뉴 | 할 일 |
|---|---|
| **브랜딩** | 앱 이름 `조개는 일을 한다`, 지원 이메일, 개발자 연락처 |
| **대상** | User Type **외부**, 게시 상태 **테스트**, **테스트 사용자에 본인 계정 추가** |
| **데이터 액세스** | 아래 범위 3개 추가 |
| **클라이언트** | 아래 1-3 참고 |

```
https://www.googleapis.com/auth/drive.appdata
https://www.googleapis.com/auth/calendar.readonly
https://www.googleapis.com/auth/userinfo.email
```

> ⚠️ **프로젝트 소유자라도 테스트 사용자에 따로 등록해야 합니다.** 빠뜨리면 로그인 시
> `403 access_denied` 가 납니다.

### 1-3. 클라이언트 — 리디렉션 URI 등록 ★

**클라이언트 → (웹 애플리케이션 클라이언트 선택) → 승인된 리디렉션 URI**

```
https://owlapp2.vercel.app/api/auth/callback
```

로컬에서 `vercel dev` 로 시험할 거면 이것도 추가합니다.

```
http://localhost:3000/api/auth/callback
```

> **승인된 JavaScript 원본은 이제 필요 없습니다.** 브라우저가 구글과 직접 통신하지 않기 때문입니다.
> 남아 있어도 해롭지는 않습니다.

---

## 2. 버셀 환경변수

| 이름 | 값 | 상태 |
|---|---|---|
| `GOOGLE_CLIENT_ID` | `892165524575-….apps.googleusercontent.com` | ✅ 등록됨 |
| `SESSION_SECRET` | 무작위 32바이트 (세션 쿠키 암호화 키) | ✅ 등록됨 |
| `GOOGLE_CLIENT_SECRET` | 구글 콘솔의 클라이언트 보안 비밀번호 | ❌ **직접 넣으셔야 합니다** |

클라이언트 시크릿은 **콘솔 → 클라이언트 → 해당 클라이언트**에서 확인합니다.
아래 명령을 실행하고 값을 붙여넣으세요 (환경마다 한 번씩).

```bash
vercel env add GOOGLE_CLIENT_SECRET production
vercel env add GOOGLE_CLIENT_SECRET preview
vercel env add GOOGLE_CLIENT_SECRET development
```

또는 [버셀 대시보드 → Settings → Environment Variables](https://vercel.com/tmdsh2000s-projects/owl_app2/settings/environment-variables) 에서 넣어도 됩니다.

**환경변수를 넣은 뒤에는 반드시 다시 배포해야 반영됩니다.**

```bash
vercel deploy --prod
```

> `SESSION_SECRET` 을 바꾸면 기존 로그인 세션이 전부 무효가 됩니다(모두 다시 로그인).
> 보관된 게임 기록은 드라이브에 있으므로 사라지지 않습니다.

---

## 3. 확인

```bash
curl -s https://owlapp2.vercel.app/api/auth/me          # {"connected":false} 면 정상
curl -sI https://owlapp2.vercel.app/api/auth/login | grep -i location   # 구글로 리다이렉트
```

브라우저에서 https://owlapp2.vercel.app 을 열고 오른쪽 위 **`G`** 버튼을 누릅니다.
테스트 모드라 "확인되지 않은 앱" 경고가 나오는데 `고급 → 이동` 으로 통과합니다.
성공하면 버튼이 **청록색**으로 바뀝니다.

---

## 자주 막히는 곳

| 증상 | 원인 |
|---|---|
| `redirect_uri_mismatch` | 1-3의 리디렉션 URI 미등록 또는 오타. 끝에 `/` 를 붙이면 안 됩니다 |
| `403 access_denied` | 1-2의 테스트 사용자에 그 계정이 없음 |
| 로그인 후 `?login=token` 으로 돌아옴 | `GOOGLE_CLIENT_SECRET` 미설정 또는 오타. 넣은 뒤 재배포했는지 확인 |
| `?login=state` | 쿠키가 차단됨. 시크릿 창의 서드파티 쿠키 설정 확인 |
| 저장은 되는데 캘린더가 빔 | Calendar API 미사용 설정, 또는 오늘 일정이 실제로 없음 |
| `G` 버튼이 아예 안 보임 | `/api` 가 없는 곳(GitHub Pages 등). 정상 동작입니다 |
| 자동화 브라우저에서 로그인 거부 | 구글이 자동 제어 브라우저를 차단합니다. 평소 쓰는 브라우저로 여세요 |

## 보안 메모

- **클라이언트 시크릿은 서버 환경변수로만 둡니다.** 저장소에 절대 넣지 마세요.
- 세션 쿠키는 **AES-256-GCM 으로 암호화**하고 `HttpOnly` · `Secure` · `SameSite=Lax` 로 내려갑니다.
  인코딩만 하면 쿠키를 열람할 수 있는 누구든 리프레시 토큰을 읽어갑니다 — 이건 사용자가
  취소하기 전까지 계속 유효해서 액세스 토큰보다 훨씬 위험합니다.
- 로그인 요청에 `state` 를 심어 콜백에서 대조합니다(CSRF 방지).
- 게임 저장은 드라이브의 **`appDataFolder`**(앱 전용 숨김 폴더)에 들어갑니다. 다른 파일은
  볼 수 없고, 앱 연결을 끊으면 함께 정리됩니다.
- 캘린더는 **읽기 전용**입니다. 이 게임은 일정을 만들거나 고칠 수 없습니다.
