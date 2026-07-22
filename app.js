const stages = [
  { name: "재첩", min: 0, next: 40, color: "#f6c66e", rank: "견습 양식가" },
  { name: "바지락", min: 40, next: 100, color: "#f0a76d", rank: "골목 양식가" },
  { name: "동죽", min: 100, next: 180, color: "#d9ad7c", rank: "면 요리 연구원" },
  { name: "맛조개", min: 180, next: 280, color: "#e19268", rank: "조개 감별사" },
  { name: "키조개", min: 280, next: 420, color: "#bf8cc7", rank: "진주 수집가" },
  { name: "가리비", min: 420, next: 600, color: "#ef7891", rank: "어패류 스타일리스트" },
  { name: "대왕조개", min: 600, next: null, color: "#ffd34e", rank: "만백성의 성군" },
];

const shopItems = [
  { id: "pasta", name: "봉골레 파스타", icon: "🍝", price: 16, note: "바지락의 이태리산 망토" },
  { id: "pickle", name: "피클", icon: "🥒", price: 9, note: "파스타 경험치 궁합" },
  { id: "kalguksu", name: "30cm 칼국수", icon: "🍜", price: 18, note: "동죽의 포근한 외투" },
  { id: "kimchi", name: "실비김치", icon: "🌶️", price: 11, note: "칼국수 진주 부스터" },
  { id: "steamed", name: "바지락 술찜", icon: "🫕", price: 22, note: "야식계의 숨은 강자" },
  { id: "garlic", name: "마늘 토핑", icon: "🧄", price: 10, note: "술찜 비밀 재료" },
  { id: "chili", name: "청양고추", icon: "🌶", price: 10, note: "얼큰함 +99" },
  { id: "cheese", name: "모짜렐라 치즈", icon: "🧀", price: 14, note: "가리비의 최종 장식" },
];

const recipes = [
  { name: "이태리파 봉골레씨", icon: "🍝🥒", needs: ["pasta", "pickle"], bonus: "할 일 XP +5" },
  { name: "시장표 동죽 칼국수", icon: "🍜🌶️", needs: ["kalguksu", "kimchi"], bonus: "완료 진주 +2" },
  { name: "불타는 바지락 술찜", icon: "🫕🌶", needs: ["steamed", "chili", "garlic"], bonus: "완료 XP +10" },
  { name: "치즈 폭포 가리비", icon: "🐚🧀", needs: ["cheese"], stage: 5, bonus: "진주 발견률 100%" },
];

const encouragements = [
  "오늘 할 일을 하나만 끝내보자!",
  "장난 같아요? 디테일한 성장입니다.",
  "세계관에 몰입하면 월요일도 바다예요.",
  "작은 완료가 대왕조개를 만듭니다.",
  "플랑크톤은 기다려주지 않아요!",
  "힘내요. 진주는 노동 끝에 옵니다.",
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

function render() {
  const stage = getStage();
  elements.xp.textContent = state.xp;
  elements.pearls.textContent = state.pearls;
  elements.stageName.textContent = stage.name;
  elements.stageNumber.textContent = `STAGE ${String(stage.index + 1).padStart(2, "0")}`;
  elements.specimen.style.setProperty("--shell", stage.color);
  elements.rank.textContent = stage.rank;
  elements.done.textContent = state.done;
  elements.streak.textContent = state.streak;
  elements.sound.setAttribute("aria-pressed", String(state.sound));
  elements.sound.setAttribute("aria-label", state.sound ? "배경 음악 끄기" : "배경 음악 켜기");

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
  saveState();
}

function renderTasks() {
  elements.taskList.innerHTML = "";
  elements.empty.hidden = state.tasks.length > 0;
  state.tasks.forEach((task) => {
    const item = document.createElement("li");
    item.className = "task-item";
    item.innerHTML = `
      <button class="task-item__check" type="button" aria-label="${escapeHtml(task.text)} 완료"></button>
      <span class="task-item__text">${escapeHtml(task.text)}</span>
      <button class="task-item__delete" type="button" aria-label="${escapeHtml(task.text)} 삭제">×</button>`;
    item.querySelector(".task-item__check").addEventListener("click", () => completeTask(task.id));
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
    button.innerHTML = `<span class="shop-item__price">${owned ? "✓" : `● ${item.price}`}</span><span class="shop-item__icon">${item.icon}</span><b>${item.name}</b><small>${item.note}</small>`;
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
    card.innerHTML = `<span>${isUnlocked ? recipe.icon : "❔"}</span><b>${isUnlocked ? recipe.name : "아직 모르는 요리"}</b><small>${isUnlocked ? recipe.bonus : "재료를 모으면 이름과 효과가 나타납니다."}</small>`;
    elements.recipeGrid.append(card);
  });
}

function renderOrbit() {
  const display = state.owned.slice(-3).map((id) => shopItems.find((item) => item.id === id));
  elements.orbit.innerHTML = display.map((item) => `<span title="${item.name}">${item.icon}</span>`).join("");
}

function addTask(text) {
  const clean = text.trim();
  if (!clean) return;
  state.tasks.unshift({ id: Date.now(), text: clean });
  state.streak = 0;
  elements.taskInput.value = "";
  showToast("먹이를 등록했습니다. 이제 끝내러 가요!");
  playTone(330, .06);
  render();
}

function completeTask(id) {
  const before = getStage();
  const rewards = taskRewards();
  state.tasks = state.tasks.filter((task) => task.id !== id);
  state.xp += rewards.xp;
  state.pearls += rewards.pearls;
  state.done += 1;
  state.streak += 1;
  const after = getStage();
  elements.clamSays.textContent = encouragements[state.done % encouragements.length];
  cheer();
  showToast(`완료! +${rewards.xp} XP · +${rewards.pearls} 진주`);
  playTone(520, .08);
  if (after.index > before.index) showLevelUp(after.name);
  render();
}

function deleteTask(id) {
  state.tasks = state.tasks.filter((task) => task.id !== id);
  state.streak = 0;
  showToast("할 일을 양식장에서 뺐습니다.");
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
  const context = new AudioContext();
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
  return element.innerHTML;
}

elements.taskForm.addEventListener("submit", (event) => {
  event.preventDefault();
  addTask(elements.taskInput.value);
});

elements.clam.addEventListener("click", () => {
  const message = encouragements[Math.floor(Math.random() * encouragements.length)];
  elements.clamSays.textContent = message;
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

$("#resetButton").addEventListener("click", () => {
  if (!window.confirm("조개의 성장 기록과 할 일을 모두 초기화할까요?")) return;
  state = { ...initialState, tasks: [], owned: [] };
  elements.clamSays.textContent = encouragements[0];
  showToast("작은 재첩으로 돌아왔습니다.");
  render();
});

const today = new Intl.DateTimeFormat("ko-KR", { month: "2-digit", day: "2-digit", weekday: "short" }).format(new Date());
$("#todayLabel").textContent = today;
elements.quote.textContent = quotes[new Date().getDate() % quotes.length];
render();
