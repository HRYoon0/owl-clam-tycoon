// 껍데기 그림은 단계 순서대로 assets/shell/<번호>-top.png · <번호>-bottom.png 를 쓴다.
const stages = [
  { name: "재첩", min: 0, next: 40, rank: "견습 양식가" },
  { name: "바지락", min: 40, next: 100, rank: "골목 양식가" },
  { name: "동죽", min: 100, next: 180, rank: "면 요리 연구원" },
  { name: "맛조개", min: 180, next: 280, rank: "조개 감별사" },
  { name: "키조개", min: 280, next: 420, rank: "진주 수집가" },
  { name: "가리비", min: 420, next: 600, rank: "어패류 스타일리스트" },
  { name: "대왕조개", min: 600, next: null, rank: "만백성의 성군" },
];
const shellUrl = (number, half) => `url("assets/shell/${number}-${half}.png")`;

// 아이콘 그림은 품목 id 그대로 assets/item/<id>.png 를 쓴다.
const shopItems = [
  { id: "pasta", name: "봉골레 파스타", price: 16, note: "바지락의 이태리산 망토" },
  { id: "pickle", name: "피클", price: 9, note: "파스타 경험치 궁합" },
  { id: "kalguksu", name: "30cm 칼국수", price: 18, note: "동죽의 포근한 외투" },
  { id: "kimchi", name: "실비김치", price: 11, note: "칼국수 진주 부스터" },
  { id: "steamed", name: "바지락 술찜", price: 22, note: "야식계의 숨은 강자" },
  { id: "garlic", name: "마늘 토핑", price: 10, note: "술찜 비밀 재료" },
  { id: "chili", name: "청양고추", price: 10, note: "얼큰함 +99" },
  { id: "cheese", name: "모짜렐라 치즈", price: 14, note: "가리비의 최종 장식" },
];
const itemIcon = (id, className = "") => `<img class="${className}" src="assets/item/${id}.png" alt="" />`;

// 도감 그림은 needs의 재료 아이콘을 나열해 만든다 (레시피 전용 그림이 따로 필요 없다).
const recipes = [
  { name: "이태리파 봉골레씨", needs: ["pasta", "pickle"], bonus: "할 일 XP +5" },
  { name: "시장표 동죽 칼국수", needs: ["kalguksu", "kimchi"], bonus: "완료 진주 +2" },
  { name: "불타는 바지락 술찜", needs: ["steamed", "chili", "garlic"], bonus: "완료 XP +10" },
  { name: "치즈 폭포 가리비", needs: ["cheese"], stage: 5, bonus: "진주 발견률 100%" },
];

const encouragements = [
  "오늘 할 일을 하나만 끝내보자!",
  "장난 같아요? 디테일한 성장입니다.",
  "세계관에 몰입하면 월요일도 바다예요.",
  "작은 완료가 대왕조개를 만듭니다.",
  "플랑크톤은 기다려주지 않아요!",
  "힘내요. 진주는 노동 끝에 옵니다.",
  "물살이 좀 세네요. 그래도 갑시다.",
  "한 칸만 더 하면 껍데기가 두꺼워져요.",
  "조개도 쉽니다. 대신 하나는 끝내고요.",
  "오늘 것만 하면 돼요. 내일 건 내일.",
  "가만히 있어도 물은 흘러가요.",
  "끝낸 일은 지워지지 않고 남습니다.",
];

const quotes = [
  "“처음에는 엄청 작은 재첩이었는데, 점점 키우는 거야.”",
  "“진주를 뱉으면서 아이템을 얻어.”",
  "“원래 그런 거 없이 세계관에 몰입해야 해요.”",
  "“칼국수는 김치 주면 부스터 붙고.”",
  "“숨겨진 비밀 요리 레시피도 찾게 해주세요.”",
];

const initialState = { xp: 0, pearls: 12, tasks: [], owned: [], done: 0, streak: 0, sound: false };
const saveKey = "owl-clam-tycoon-v1";
let state = loadState();
let toastTimer;
let audioContext;

const $ = (selector) => document.querySelector(selector);
const elements = {
  xp: $("#xpValue"), pearls: $("#pearlValue"), stageName: $("#stageName"),
  stageNumber: $("#stageNumber"), stageText: $("#nextStageText"), progressText: $("#progressText"),
  progressBar: $("#progressBar"), specimen: $("#specimen"), clam: $("#clamButton"),
  clamSays: $("#clamSays"), taskForm: $("#taskForm"), taskInput: $("#taskInput"),
  taskList: $("#taskList"), empty: $("#emptyState"), done: $("#doneCount"),
  streak: $("#streakCount"), shop: $("#shop"), recipeCount: $("#recipeCount"),
  recipeGrid: $("#recipeGrid"), recipeDialog: $("#recipeDialog"), toast: $("#toast"),
  levelUp: $("#levelUp"), levelUpName: $("#levelUpName"), orbit: $("#dishOrbit"),
  quote: $("#fieldQuote"), rank: $("#gameRank"), sound: $("#soundButton"),
  bgm: $("#bgm"),
  widgetXp: $("#widgetXpValue"), widgetPearls: $("#widgetPearlValue"),
  widgetMusic: $("#widgetMusicButton"), widgetExpand: $("#widgetExpandButton"),
  widgetHide: $("#widgetHideButton"),
  widgetOpen: $("#widgetOpenButton"),
};

function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem(saveKey));
    // 브라우저 자동재생 정책에 맞춰 방문할 때마다 직접 음악을 켜도록 한다.
    return saved ? { ...initialState, ...saved, sound: false } : { ...initialState };
  } catch {
    return { ...initialState };
  }
}

function saveState() {
  localStorage.setItem(saveKey, JSON.stringify(state));
}

function getStage(xp = state.xp) {
  let index = stages.findIndex((stage) => stage.next !== null && xp < stage.next);
  if (index === -1) index = stages.length - 1;
  return { ...stages[index], index };
}

function unlockedRecipes() {
  const stage = getStage();
  return recipes.filter((recipe) => recipe.needs.every((id) => state.owned.includes(id)) && (recipe.stage === undefined || stage.index >= recipe.stage));
}

function taskRewards() {
  const unlocked = unlockedRecipes().map((recipe) => recipe.name);
  return {
    xp: 20 + (unlocked.includes("이태리파 봉골레씨") ? 5 : 0) + (unlocked.includes("불타는 바지락 술찜") ? 10 : 0),
    pearls: 5 + (unlocked.includes("시장표 동죽 칼국수") ? 2 : 0) + (unlocked.includes("치즈 폭포 가리비") ? 3 : 0),
  };
}

function render(persist = true) {
  const stage = getStage();
  elements.xp.textContent = state.xp;
  elements.pearls.textContent = state.pearls;
  if (elements.widgetXp) elements.widgetXp.textContent = state.xp;
  if (elements.widgetPearls) elements.widgetPearls.textContent = state.pearls;
  elements.stageName.textContent = stage.name;
  elements.stageNumber.textContent = `STAGE ${String(stage.index + 1).padStart(2, "0")}`;
  elements.specimen.style.setProperty("--shell-top", shellUrl(stage.index + 1, "top"));
  elements.specimen.style.setProperty("--shell-bottom", shellUrl(stage.index + 1, "bottom"));
  // 진화 순간에 그림이 늦게 뜨지 않도록 다음 단계를 미리 받아둔다 (브라우저 캐시가 중복 요청을 막는다).
  if (stage.next !== null) ["top", "bottom"].forEach((half) => {
    new Image().src = `assets/shell/${stage.index + 2}-${half}.png`;
  });
  elements.rank.textContent = stage.rank;
  elements.done.textContent = state.done;
  elements.streak.textContent = state.streak;
  elements.sound.setAttribute("aria-pressed", String(state.sound));
  elements.sound.setAttribute("aria-label", state.sound ? "배경 음악 끄기" : "배경 음악 켜기");
  if (elements.widgetMusic) {
    elements.widgetMusic.setAttribute("aria-pressed", String(state.sound));
    elements.widgetMusic.setAttribute("aria-label", state.sound ? "배경 음악 끄기" : "배경 음악 켜기");
  }

  if (stage.next === null) {
    elements.stageText.textContent = "최종 진화 완료";
    elements.progressText.textContent = `${state.xp} XP`;
    elements.progressBar.style.width = "100%";
  } else {
    const next = stages[stage.index + 1];
    const range = stage.next - stage.min;
    const progress = Math.max(0, state.xp - stage.min);
    elements.stageText.textContent = `다음 진화: ${next.name}`;
    elements.progressText.textContent = `${progress} / ${range} XP`;
    elements.progressBar.style.width = `${(progress / range) * 100}%`;
  }

  renderTasks();
  renderShop();
  renderRecipes();
  renderOrbit();
  if (persist) saveState();
}

function renderTasks() {
  elements.taskList.innerHTML = "";
  elements.empty.hidden = state.tasks.length > 0;
  state.tasks.forEach((task) => {
    const item = document.createElement("li");
    item.className = `task-item${task.done ? " task-item--done" : ""}`;
    item.innerHTML = `
      <button class="task-item__check" type="button" ${task.done ? "disabled" : ""} aria-label="${escapeHtml(task.text)} ${task.done ? "완료함" : "완료하기"}">${task.done ? "✓" : ""}</button>
      <span class="task-item__text">${escapeHtml(task.text)}</span>
      <button class="task-item__delete" type="button" aria-label="${escapeHtml(task.text)} 삭제">×</button>`;
    if (!task.done) item.querySelector(".task-item__check").addEventListener("click", () => completeTask(task.id));
    item.querySelector(".task-item__delete").addEventListener("click", () => deleteTask(task.id));
    elements.taskList.append(item);
  });
}

function renderShop() {
  elements.shop.innerHTML = "";
  shopItems.forEach((item) => {
    const owned = state.owned.includes(item.id);
    const button = document.createElement("button");
    button.type = "button";
    button.className = `shop-item${owned ? " owned" : ""}`;
    button.disabled = owned;
    button.innerHTML = `<span class="shop-item__price">${owned ? "✓" : `● ${item.price}`}</span>${itemIcon(item.id, "shop-item__icon")}<b>${item.name}</b><small>${item.note}</small>`;
    button.addEventListener("click", () => buyItem(item));
    elements.shop.append(button);
  });
}

function renderRecipes() {
  const unlocked = unlockedRecipes();
  elements.recipeCount.textContent = `${unlocked.length}/${recipes.length}`;
  elements.recipeGrid.innerHTML = "";
  recipes.forEach((recipe) => {
    const isUnlocked = unlocked.includes(recipe);
    const card = document.createElement("div");
    card.className = `recipe-card${isUnlocked ? "" : " locked"}`;
    const icons = isUnlocked ? recipe.needs.map((id) => itemIcon(id)).join("") : "?";
    card.innerHTML = `<span class="recipe-card__icons">${icons}</span><b>${isUnlocked ? recipe.name : "아직 모르는 요리"}</b><small>${isUnlocked ? recipe.bonus : "재료를 모으면 이름과 효과가 나타납니다."}</small>`;
    elements.recipeGrid.append(card);
  });
}

function renderOrbit() {
  // 예전 저장 데이터에 없어진 아이템 id가 남아 있어도 화면이 깨지지 않게 거른다.
  const display = state.owned.slice(-3).map((id) => shopItems.find((item) => item.id === id)).filter(Boolean);
  elements.orbit.innerHTML = display.map((item) => `<span title="${item.name}">${itemIcon(item.id)}</span>`).join("");
}

function addTask(text) {
  const clean = text.trim();
  if (!clean) return;
  // 같은 밀리초에 등록해도 겹치지 않는 id를 쓴다.
  state.tasks.unshift({ id: `${Date.now()}-${Math.random()}`, text: clean, done: false });
  elements.taskInput.value = "";
  showToast("먹이를 등록했습니다. 이제 끝내러 가요!");
  playTone(330, .06);
  render();
}

function completeTask(id) {
  const task = state.tasks.find((item) => item.id === id);
  // 완료는 한 번뿐이다. 되돌릴 수 있게 하면 같은 할 일로 보상을 반복해서 받을 수 있다.
  if (!task || task.done) return;
  const before = getStage();
  const rewards = taskRewards();
  task.done = true;
  state.xp += rewards.xp;
  state.pearls += rewards.pearls;
  state.done += 1;
  state.streak += 1;
  const after = getStage();
  nextCheer();
  cheer();
  showToast(`완료! +${rewards.xp} XP · +${rewards.pearls} 진주`);
  playTone(520, .08);
  if (after.index > before.index) showLevelUp(after.name);
  render();
}

function deleteTask(id) {
  const task = state.tasks.find((item) => item.id === id);
  state.tasks = state.tasks.filter((item) => item.id !== id);
  // 끝내지 않고 지운 것만 연속 기록을 끊는다. 완료한 일을 치우는 건 포기가 아니다.
  if (task && !task.done) state.streak = 0;
  showToast(task?.done ? "완료한 일을 목록에서 치웠습니다." : "할 일을 양식장에서 뺐습니다.");
  render();
}

function buyItem(item) {
  if (state.pearls < item.price) {
    showToast(`진주가 ${item.price - state.pearls}개 부족합니다.`);
    playTone(160, .09);
    return;
  }
  const before = unlockedRecipes().length;
  state.pearls -= item.price;
  state.owned.push(item.id);
  render();
  const after = unlockedRecipes().length;
  showToast(after > before ? `비밀 레시피 발견! ${item.name}이 열쇠였습니다.` : `${item.name} 장만 완료!`);
  playTone(660, .08);
}

// 응원은 순서대로 돌린다. 무작위로 뽑으면 같은 말이 연달아 나온다.
let cheerIndex = 0;
function nextCheer() {
  cheerIndex = (cheerIndex + 1) % encouragements.length;
  sayCheer(encouragements[cheerIndex]);
}

// 조개 말풍선을 갈아끼우고 살짝 튀는 연출을 준다 (조용히 바뀌면 눈치채지 못한다).
function sayCheer(message) {
  elements.clamSays.textContent = message;
  elements.clamSays.classList.remove("pop");
  void elements.clamSays.offsetWidth;
  elements.clamSays.classList.add("pop");
}

function cheer() {
  elements.clam.classList.remove("cheer");
  void elements.clam.offsetWidth;
  elements.clam.classList.add("cheer");
  setTimeout(() => elements.clam.classList.remove("cheer"), 950);
}

function showLevelUp(name) {
  elements.levelUpName.textContent = name;
  elements.levelUp.classList.add("show");
  elements.levelUp.setAttribute("aria-hidden", "false");
  setTimeout(() => {
    elements.levelUp.classList.remove("show");
    elements.levelUp.setAttribute("aria-hidden", "true");
  }, 1800);
}

function showToast(message) {
  clearTimeout(toastTimer);
  elements.toast.textContent = message;
  elements.toast.classList.add("show");
  toastTimer = setTimeout(() => elements.toast.classList.remove("show"), 2300);
}

function playTone(frequency, duration) {
  if (!state.sound) return;
  const AudioContext = window.AudioContext || window.webkitAudioContext;
  if (!AudioContext) return;
  // 브라우저는 문서당 오디오 컨텍스트 개수를 제한하므로 하나를 계속 재사용한다.
  if (!audioContext) audioContext = new AudioContext();
  const context = audioContext;
  if (context.state === "suspended") context.resume();
  const oscillator = context.createOscillator();
  const gain = context.createGain();
  oscillator.frequency.value = frequency;
  oscillator.type = "sine";
  gain.gain.setValueAtTime(.06, context.currentTime);
  gain.gain.exponentialRampToValueAtTime(.001, context.currentTime + duration);
  oscillator.connect(gain).connect(context.destination);
  oscillator.start();
  oscillator.stop(context.currentTime + duration);
}

function escapeHtml(text) {
  const element = document.createElement("div");
  element.textContent = text;
  // textContent는 따옴표를 남겨두므로, 속성값에 넣어도 안전하도록 함께 막는다.
  return element.innerHTML.replaceAll('"', "&quot;");
}

elements.taskForm.addEventListener("submit", (event) => {
  event.preventDefault();
  addTask(elements.taskInput.value);
});

elements.clam.addEventListener("click", () => {
  nextCheer();
  cheer();
  playTone(440, .06);
});

$("#recipeButton").addEventListener("click", () => elements.recipeDialog.showModal());
$("#closeRecipeButton").addEventListener("click", () => elements.recipeDialog.close());
elements.recipeDialog.addEventListener("click", (event) => {
  if (event.target === elements.recipeDialog) elements.recipeDialog.close();
});

elements.sound.addEventListener("click", async () => {
  state.sound = !state.sound;
  if (state.sound) {
    elements.bgm.volume = .32;
    try {
      await elements.bgm.play();
      playTone(480, .07);
      showToast("멋쟁이 어패류 재생 중 ♪");
    } catch {
      state.sound = false;
      showToast("음악을 재생하지 못했습니다. 다시 눌러주세요.");
    }
  } else {
    elements.bgm.pause();
    showToast("배경 음악을 껐습니다.");
  }
  render();
});

// 설치 없이 별도 브라우저 창으로 수조 위젯을 띄운다.
const pageParams = new URLSearchParams(window.location.search);
const isWidgetWindow = pageParams.get("widget") === "1";
let widgetWindow;

function gameUrl() {
  const url = new URL(window.location.href);
  url.searchParams.delete("widget");
  url.hash = "";
  return url;
}

function openWidgetWindow() {
  const url = gameUrl();
  url.searchParams.set("widget", "1");
  const left = Math.max(0, window.screen.availWidth - 760);
  const top = Math.max(0, window.screen.availHeight - 700);
  widgetWindow = window.open(
    url,
    "owl-clam-widget",
    `popup=yes,width=740,height=660,left=${left},top=${top},resizable=yes,scrollbars=no`,
  );
  if (!widgetWindow) showToast("팝업이 차단됐습니다. 이 사이트의 팝업을 허용해주세요.");
  else widgetWindow.focus();
}

document.body.classList.toggle("widget-app", isWidgetWindow);
document.body.classList.toggle("widget-mode", isWidgetWindow);
elements.widgetOpen?.addEventListener("click", openWidgetWindow);
elements.widgetMusic?.addEventListener("click", () => elements.sound.click());
elements.widgetExpand?.addEventListener("click", () => {
  if (window.opener && !window.opener.closed) {
    window.opener.focus();
  } else {
    window.open(gameUrl(), "_blank");
  }
});
elements.widgetHide?.addEventListener("click", () => window.close());

// 메인 화면과 위젯 창에서 진행 상황을 즉시 맞춘다.
window.addEventListener("storage", (event) => {
  if (event.key !== saveKey || !event.newValue) return;
  try {
    const incoming = JSON.parse(event.newValue);
    state = { ...initialState, ...incoming, sound: state.sound };
    render(false);
  } catch {
    // 다른 창의 저장 데이터가 완성되기 전이면 다음 변경 이벤트를 기다린다.
  }
});

$("#resetButton").addEventListener("click", () => {
  if (!window.confirm("조개의 성장 기록과 할 일을 모두 초기화할까요?")) return;
  state = { ...initialState, tasks: [], owned: [] };
  cheerIndex = 0;
  sayCheer(encouragements[0]);
  showToast("작은 재첩으로 돌아왔습니다.");
  render();
});

// 아무것도 하지 않아도 조개가 계속 말을 건다. 껍데기도 함께 여닫아 인사처럼 보이게 한다.
// 간격을 10~20초로 흩는 이유: 정확히 같은 주기로 열리면 살아있는 게 아니라 기계처럼 보인다.
function scheduleCheer() {
  setTimeout(() => {
    nextCheer();
    cheer();
    scheduleCheer();
  }, 10000 + Math.random() * 10000);
}
scheduleCheer();

const today = new Intl.DateTimeFormat("ko-KR", { month: "2-digit", day: "2-digit", weekday: "short" }).format(new Date());
$("#todayLabel").textContent = today;
elements.quote.textContent = quotes[new Date().getDate() % quotes.length];
render();
