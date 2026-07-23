# Google Cloud 프로젝트 할당량 증가 요청서 초안

요청 페이지: https://support.google.com/code/contact/project_quota_increase?hl=ko

> 폼의 항목 구성은 구글이 수시로 바꿉니다. 아래는 **일반적으로 묻는 항목**에 맞춰 준비한 것이니,
> 실제 화면에 없는 항목은 건너뛰고 비슷한 칸에 옮겨 넣으세요.

---

## 0. 먼저 — 요청이 정말 필요한지 확인

요청은 검토에 며칠 걸리고 거절될 수도 있습니다. 아래 둘을 먼저 확인하는 편이 빠릅니다.

### ① 기존 프로젝트를 재사용하면 됩니다

**프로젝트 하나에 OAuth 클라이언트를 여러 개 만들 수 있고, API도 여러 개 켤 수 있습니다.**
"조개는 일을 한다"를 위해 새 프로젝트를 만들 필요가 없습니다. 이미 있는 프로젝트에서

- **API 및 서비스 → 라이브러리** 에서 Drive API·Calendar API 사용 설정
- **사용자 인증 정보 → OAuth 클라이언트 ID 만들기** 로 이 게임용 클라이언트를 추가

하면 그대로 동작합니다.

**단, 이건 알고 쓰셔야 합니다.** OAuth **동의 화면은 프로젝트당 하나**입니다. 즉 한 프로젝트에 여러 앱을
얹으면 로그인 창에 뜨는 앱 이름이 전부 같아지고, 스코프 목록도 프로젝트 단위로 합쳐집니다.
개인·학급용 소규모 앱 여러 개라면 대개 문제되지 않지만, 앱마다 다른 이름을 보여주고 싶다면
프로젝트를 나눠야 합니다.

### ② 안 쓰는 프로젝트를 지우면 자리가 납니다

**주의: 삭제한 프로젝트는 약 30일간 "삭제 대기" 상태로 남고, 그동안에도 할당량을 계속 차지합니다.**
지우자마자 자리가 나지 않으니, 급하면 ①번이 답입니다.

정리할 프로젝트 찾기: 콘솔 → [프로젝트 선택] → 최근 활동이 없는 것, 이름이 `My First Project`처럼
자동 생성된 것부터 확인하세요.

---

## 1. 폼에 넣을 내용

### 연락처

| 항목 | 값 |
|---|---|
| 이름 | `[본인 이름]` |
| 이메일 | `tmdsh2000@gmail.com` (콘솔에 로그인된 계정과 같아야 합니다) |
| 조직 / 회사 | `[소속 학교명, 없으면 Individual / 개인]` |

### 요청 수량

| 항목 | 값 |
|---|---|
| 현재 사용 중인 프로젝트 수 | `[콘솔에서 확인한 숫자]` |
| 추가로 요청하는 수 | `10` (여유 있게. 너무 큰 숫자는 오히려 소명을 요구받습니다) |
| 결제 계정 ID | `[있으면 기입, 없으면 비움]` |

> 결제 계정이 연결돼 있으면 승인 가능성이 올라갑니다. 무료 한도만 쓰더라도 결제 계정 자체는
> 만들어 둘 수 있습니다.

### 사용 사례 설명 — 한국어

```
초·중등 교육 현장에서 쓰는 소규모 웹 애플리케이션을 직접 개발해 운영하고 있습니다.
학생 활동 기록, 감정일기, 학습 자료 생성, 할 일 관리 등 용도가 서로 다른 앱을 여러 개
만들고 있으며, 각 앱이 서로 다른 OAuth 동의 화면과 API 조합을 필요로 해
프로젝트를 분리해 관리하고 있습니다.

현재 준비 중인 앱은 정적 웹 페이지로 배포되는 할 일 관리 게임으로,
Google Drive API(appDataFolder 범위)로 사용자 본인의 드라이브에 진행 상황을 저장하고,
Google Calendar API(읽기 전용)로 그날의 일정을 불러옵니다.
서버를 두지 않고 브라우저에서 직접 호출하는 구조이며, 상업적 서비스가 아닌
교육용·개인용으로만 사용합니다.

앞으로도 학기마다 소규모 도구를 추가로 만들 예정이라 프로젝트 수가 계속 늘어납니다.
할당량 증가를 요청드립니다.
```

### 사용 사례 설명 — 영어 (영문 입력을 요구하는 경우)

```
I develop and maintain small web applications used in K-12 education.
Each app serves a different purpose (student activity logs, emotion journals,
teaching material generation, task management) and requires its own OAuth consent
screen and API combination, so I keep them in separate Cloud projects.

The app I am currently preparing is a task-management game deployed as a static
web page. It uses the Google Drive API (appDataFolder scope) to store each user's
own progress in their own Drive, and the Google Calendar API (read-only) to show
that day's events. There is no backend server; all API calls are made directly
from the browser. It is used for educational and personal purposes only and is
not a commercial service.

I expect to keep adding small tools each semester, so the number of projects will
continue to grow. I would like to request an increase to my project quota.
```

### 사용할 API / 스코프 (물어보는 경우)

```
Google Drive API   — https://www.googleapis.com/auth/drive.appdata
Google Calendar API — https://www.googleapis.com/auth/calendar.readonly
                     https://www.googleapis.com/auth/userinfo.email
```

---

## 2. 승인 확률을 높이는 요소

- **안 쓰는 프로젝트를 먼저 정리하고 요청** — "정리했는데도 부족하다"가 가장 설득력 있습니다
- **결제 계정 연결** — 무료 한도만 쓰더라도
- **용도를 구체적으로** — "개발용"처럼 막연한 설명보다 위처럼 앱 종류·API·비상업 목적을 명시
- **요청 수량을 현실적으로** — 100개 같은 숫자는 추가 소명을 부릅니다

## 3. 채워 넣을 값 정리

요청 전에 아래 세 개는 직접 확인해서 채우셔야 합니다. 제가 알 수 없는 값입니다.

- [ ] 현재 사용 중인 프로젝트 수 (콘솔 → 프로젝트 목록)
- [ ] 소속 (학교명 또는 "개인")
- [ ] 결제 계정 ID (있는 경우, 콘솔 → 결제)
