"use strict";
/* Double Take controller: owns the game state and the DOM. One scene at a
   time — the player hunts its seven differences by mouse or keyboard; every
   find rings both pictures, ticks the counter and plays a chime; wrong
   clicks shake the picture and count as mistakes; three hints per scene
   flash a glowing ring; the clock races the scene's par time on the pace
   bar, so the time pressure is always in the frame. Finding all seven
   stops the clock and opens the win panel. */

import { SCENES, findDifferenceAt, nextUnfoundDifference } from "./scenes.js";
import { buildOverlaySvg } from "./markers.js";
import { createSoundEffects } from "./soundEffects.js";

const HINTS_PER_SCENE = 3;
const HINT_RING_MILLISECONDS = 1600;
const WRONG_MARK_MILLISECONDS = 650;

const state = {
  sceneIndex: 0,
  foundIds: new Set(),
  hintsLeft: HINTS_PER_SCENE,
  mistakes: 0,
  seconds: 0,
  timerId: null,
  won: false,
  hintId: null,
  wrongMark: null,
  cursor: { side: "L", x: 200, y: 150, visible: false }
};

const sounds = createSoundEffects();
const element = (id) => document.getElementById(id);
const stageLeft = element("stageL");
const stageRight = element("stageR");

function currentScene() {
  return SCENES[state.sceneIndex];
}

export function formatClock(totalSeconds) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

function renderPictures() {
  const scene = currentScene();
  const view = {
    foundIds: state.foundIds,
    hintId: state.hintId,
    wrongMark: state.wrongMark,
    cursor: state.cursor
  };
  stageLeft.innerHTML = scene.drawPicture("L" + state.sceneIndex, false,
    buildOverlaySvg(scene, { ...view, side: "L" }));
  stageRight.innerHTML = scene.drawPicture("R" + state.sceneIndex, true,
    buildOverlaySvg(scene, { ...view, side: "R" }));
}

function renderHud() {
  const scene = currentScene();
  const foundCount = state.foundIds.size;
  const remain = scene.differences.length - foundCount;
  element("counter").textContent = `${foundCount} of ${scene.differences.length} found - ${remain} remain`;
  element("timer").textContent = `Time: ${formatClock(state.seconds)}`;
  element("timer").classList.toggle("over-par", state.seconds > scene.parSeconds);
  element("paceFill").style.width = `${Math.min(100, (state.seconds / scene.parSeconds) * 100)}%`;
  element("paceFill").classList.toggle("over-par", state.seconds > scene.parSeconds);
  element("parLabel").textContent = `Par: ${formatClock(scene.parSeconds)}`;
  element("mistakes").textContent = `Mistakes: ${state.mistakes}`;
  element("hintsLabel").textContent = `Hints left: ${state.hintsLeft}`;
  element("hintBtn").disabled = state.hintsLeft <= 0 || state.won;
  element("sceneName").textContent = `${scene.name} · ${scene.difficulty}`;
  document.querySelectorAll(".tab").forEach((tab, i) => tab.classList.toggle("active", i === state.sceneIndex));
  element("winBox").hidden = !state.won;
  if (state.won) {
    element("winText").textContent =
      `You found all 7 differences in ${formatClock(state.seconds)} with ` +
      `${state.mistakes} mistake${state.mistakes === 1 ? "" : "s"}!`;
  }
}

function renderGame() {
  renderPictures();
  renderHud();
}

function startClock() {
  stopClock();
  state.timerId = setInterval(() => {
    if (state.won) return;
    state.seconds++;
    renderHud();
  }, 1000);
}

function stopClock() {
  if (state.timerId) clearInterval(state.timerId);
  state.timerId = null;
}

function loadScene(sceneIndex) {
  state.sceneIndex = sceneIndex;
  state.foundIds = new Set();
  state.hintsLeft = HINTS_PER_SCENE;
  state.mistakes = 0;
  state.seconds = 0;
  state.won = false;
  state.hintId = null;
  state.wrongMark = null;
  state.cursor.visible = false;
  element("message").textContent = "Click a difference in either picture to mark it.";
  renderGame();
  startClock();
}

function celebrateWin() {
  state.won = true;
  stopClock();
  sounds.playWinJingle();
  element("message").textContent = "Scene complete!";
}

function markDifferenceAt(side, x, y) {
  if (state.won) return;
  const scene = currentScene();
  const hit = findDifferenceAt(scene, state.foundIds, x, y);
  if (hit) {
    state.foundIds.add(hit.id);
    state.wrongMark = null;
    if (state.foundIds.size === scene.differences.length) {
      celebrateWin();
    } else {
      sounds.playFoundChime();
      element("message").textContent = "Found one! Keep going.";
    }
  } else {
    state.mistakes++;
    state.wrongMark = { side, x, y };
    sounds.playWrongBuzz();
    const stage = side === "L" ? stageLeft : stageRight;
    stage.classList.remove("shake");
    void stage.offsetWidth;
    stage.classList.add("shake");
    element("message").textContent = "Not a difference — try again.";
    const shownMark = state.wrongMark;
    setTimeout(() => {
      if (state.wrongMark === shownMark) { state.wrongMark = null; renderPictures(); }
    }, WRONG_MARK_MILLISECONDS);
  }
  renderGame();
}

function picturePoint(event, stage) {
  const rect = stage.getBoundingClientRect();
  return {
    x: ((event.clientX - rect.left) / rect.width) * 400,
    y: ((event.clientY - rect.top) / rect.height) * 300
  };
}

function useHint() {
  if (state.hintsLeft <= 0 || state.won) return;
  const pick = nextUnfoundDifference(currentScene(), state.foundIds, Math.random());
  if (!pick) return;
  state.hintsLeft--;
  state.hintId = pick.id;
  sounds.playHintSparkle();
  element("message").textContent = "A difference is glowing — catch it fast!";
  renderGame();
  setTimeout(() => {
    if (state.hintId === pick.id) { state.hintId = null; renderPictures(); }
  }, HINT_RING_MILLISECONDS);
}

function moveKeyboardCursor(side, event) {
  const step = event.shiftKey ? 14 : 6;
  state.cursor.side = side;
  if (event.key === "ArrowLeft") state.cursor.x = Math.max(0, state.cursor.x - step);
  else if (event.key === "ArrowRight") state.cursor.x = Math.min(400, state.cursor.x + step);
  else if (event.key === "ArrowUp") state.cursor.y = Math.max(0, state.cursor.y - step);
  else if (event.key === "ArrowDown") state.cursor.y = Math.min(300, state.cursor.y + step);
  else if (event.key === "Enter" || event.key === " ") {
    markDifferenceAt(side, state.cursor.x, state.cursor.y);
  } else return;
  state.cursor.visible = true;
  event.preventDefault();
  renderGame();
}

function bindPictureStage(stage, side) {
  stage.addEventListener("click", (event) => {
    const point = picturePoint(event, stage);
    markDifferenceAt(side, point.x, point.y);
  });
  stage.addEventListener("keydown", (event) => moveKeyboardCursor(side, event));
}

bindPictureStage(stageLeft, "L");
bindPictureStage(stageRight, "R");
element("restartBtn").addEventListener("click", () => loadScene(state.sceneIndex));
element("hintBtn").addEventListener("click", useHint);
element("nextBtn").addEventListener("click", () => loadScene((state.sceneIndex + 1) % SCENES.length));
document.querySelectorAll(".tab").forEach((tab, i) =>
  tab.addEventListener("click", () => loadScene(i)));
document.addEventListener("keydown", (event) => {
  if (event.key === "r" || event.key === "R") loadScene(state.sceneIndex);
  if (event.key === "h" || event.key === "H") useHint();
});

loadScene(0);
