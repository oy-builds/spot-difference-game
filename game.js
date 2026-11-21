"use strict";
/* Spot the Difference — original procedural scenes, no assets, no network. */

function harbourSVG(uid, right, extras) {
  const sunFill = right ? "#FF7B54" : "#FFD93D";
  const sailFill = right ? "#2EC4B6" : "#FFFFFF";
  return `
  <svg viewBox="0 0 400 300" role="img" aria-label="${right ? "Changed picture" : "Original picture"}">
    <defs>
      <linearGradient id="sky-${uid}" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#7EC8E3"/><stop offset="1" stop-color="#E8F9FF"/>
      </linearGradient>
      <linearGradient id="sea-${uid}" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#2E86AB"/><stop offset="1" stop-color="#1B5E7B"/>
      </linearGradient>
    </defs>
    <rect x="0" y="0" width="400" height="185" fill="url(#sky-${uid})"/>
    <circle cx="330" cy="55" r="28" fill="${sunFill}" stroke="#F4A259" stroke-width="3"/>
    <g fill="#FFFFFF" opacity="0.95">
      <ellipse cx="80" cy="48" rx="30" ry="12"/><ellipse cx="105" cy="42" rx="22" ry="10"/>
      <ellipse cx="205" cy="34" rx="24" ry="9"/><ellipse cx="224" cy="29" rx="16" ry="8"/>
    </g>
    <g stroke="#33546D" stroke-width="2.4" fill="none" stroke-linecap="round">
      <path d="M140 78 q6 -6 12 0 q6 -6 12 0"/>
      <path d="M178 96 q5 -5 10 0 q5 -5 10 0"/>
      ${right ? '<path d="M258 80 q6 -6 12 0 q6 -6 12 0"/>' : ""}
    </g>
    <rect x="0" y="180" width="400" height="72" fill="url(#sea-${uid})"/>
    <g stroke="#BFEFFF" stroke-width="2" fill="none" opacity="0.7" stroke-linecap="round">
      <path d="M20 205 q12 -6 24 0 t24 0"/><path d="M290 225 q12 -6 24 0 t24 0"/>
      <path d="M120 232 q12 -6 24 0 t24 0"/>
    </g>
    <rect x="0" y="250" width="400" height="50" fill="#F6E3B4"/>
    <!-- lighthouse -->
    <g>
      <rect x="52" y="112" width="26" height="92" fill="#FFFFFF" stroke="#33546D" stroke-width="2"/>
      <rect x="52" y="128" width="26" height="12" fill="#E63946"/>
      ${right ? "" : '<rect x="52" y="154" width="26" height="12" fill="#E63946"/>'}
      <polygon points="46,112 84,112 65,92" fill="#33546D"/>
      <circle cx="65" cy="104" r="5" fill="#FFE66D"/>
      <rect x="60" y="182" width="10" height="22" fill="#33546D"/>
    </g>
    <!-- house -->
    <g>
      <rect x="140" y="168" width="72" height="54" fill="#FFE0B2" stroke="#8D6E63" stroke-width="2"/>
      <polygon points="132,168 220,168 176,138" fill="#A44A3F"/>
      <rect x="168" y="192" width="16" height="30" fill="#7A4A21"/>
      <rect x="150" y="178" width="14" height="14" fill="#FFF3B0" stroke="#8D6E63" stroke-width="1.6"/>
      ${right ? "" : '<rect x="188" y="178" width="14" height="14" fill="#FFF3B0" stroke="#8D6E63" stroke-width="1.6"/>'}
    </g>
    <!-- sailboat -->
    <g>
      <line x1="252" y1="162" x2="252" y2="208" stroke="#5D4037" stroke-width="3"/>
      <polygon points="252,164 252,204 282,204" fill="${sailFill}" stroke="#33546D" stroke-width="1.6"/>
      <polygon points="248,176 248,204 228,204" fill="#F1FA8C" stroke="#33546D" stroke-width="1.4"/>
      <path d="M218 208 h76 l-10 16 h-54 z" fill="#A44A3F"/>
    </g>
    <!-- palm tree -->
    <g>
      <path d="M342 252 q-6 -34 4 -62" stroke="#7A4A21" stroke-width="7" fill="none" stroke-linecap="round"/>
      <g stroke="#2E933C" stroke-width="5" fill="none" stroke-linecap="round">
        <path d="M346 190 q-24 -16 -40 -8"/><path d="M346 190 q-8 -24 -26 -30"/>
        <path d="M346 190 q14 -22 32 -24"/><path d="M346 190 q24 -8 36 4"/>
      </g>
      <circle cx="340" cy="196" r="6" fill="#6F4518"/>
      <circle cx="352" cy="198" r="6" fill="#6F4518"/>
      ${right ? '<circle cx="346" cy="206" r="6" fill="#6F4518"/>' : ""}
    </g>
    <!-- buoy + starfish -->
    <g><rect x="105" y="200" width="10" height="18" fill="#E63946"/><rect x="105" y="206" width="10" height="5" fill="#FFFFFF"/></g>
    ${right ? "" : '<polygon points="110,258 113,267 122,267 115,273 118,282 110,277 102,282 105,273 98,267 107,267" fill="#FF8C42" stroke="#D96C2C" stroke-width="1.4"/>'}
    ${extras}
  </svg>`;
}

function mountainSVG(uid, right, extras) {
  const moonR = right ? 14 : 22;
  const doorFill = right ? "#3A86FF" : "#8A5A2B";
  return `
  <svg viewBox="0 0 400 300" role="img" aria-label="${right ? "Changed picture" : "Original picture"}">
    <defs>
      <linearGradient id="dusk-${uid}" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#2B2D5C"/><stop offset="0.7" stop-color="#7B5EA7"/><stop offset="1" stop-color="#E88CA0"/>
      </linearGradient>
    </defs>
    <rect x="0" y="0" width="400" height="300" fill="url(#dusk-${uid})"/>
    <circle cx="60" cy="50" r="${moonR}" fill="#FDF6D8" stroke="#E8DFA8" stroke-width="2"/>
    <g fill="#FFFFFF">
      <circle cx="140" cy="34" r="2.2"/><circle cx="215" cy="58" r="1.8"/><circle cx="262" cy="26" r="2.4"/>
      <circle cx="368" cy="70" r="1.8"/><circle cx="180" cy="82" r="1.6"/>
      ${right ? "" : '<circle cx="320" cy="40" r="2.6"/>'}
    </g>
    <!-- mountains -->
    <polygon points="0,190 90,84 180,190" fill="#5A5490"/>
    <polygon points="70,112 90,84 112,112 98,104 90,114 82,104" fill="#FFFFFF"/>
    <polygon points="110,195 205,92 300,195" fill="#6C63A6"/>
    ${right ? "" : '<polygon points="182,120 205,92 230,120 216,110 205,124 194,110" fill="#FFFFFF"/>'}
    <polygon points="240,195 322,116 400,195" fill="#4E4880"/>
    <polygon points="304,138 322,116 342,138 330,130 322,140 314,130" fill="#FFFFFF"/>
    <!-- ground + lake -->
    <rect x="0" y="192" width="400" height="50" fill="#37456B"/>
    <rect x="0" y="242" width="400" height="58" fill="#3E5C8A"/>
    <g stroke="#A8C6E8" stroke-width="2" opacity="0.6" stroke-linecap="round"><path d="M30 262 h44"/><path d="M300 276 h52"/><path d="M150 282 h36"/></g>
    <!-- cabin -->
    <g>
      <rect x="148" y="188" width="94" height="58" fill="#8D6E63" stroke="#4E342E" stroke-width="2"/>
      <polygon points="138,188 252,188 195,156" fill="#4E342E"/>
      <rect x="218" y="162" width="14" height="24" fill="#6D4C41"/>
      ${right ? "" : '<g fill="#D7DEE8" opacity="0.85"><circle cx="225" cy="150" r="6"/><circle cx="232" cy="140" r="8"/><circle cx="242" cy="129" r="10"/></g>'}
      <rect x="186" y="216" width="18" height="30" fill="${doorFill}" stroke="#4E342E" stroke-width="1.6"/>
      <rect x="158" y="200" width="15" height="15" fill="#FFE66D" stroke="#4E342E" stroke-width="1.5"/>
      <rect x="216" y="200" width="15" height="15" fill="#FFE66D" stroke="#4E342E" stroke-width="1.5"/>
    </g>
    <!-- pines -->
    <g fill="#1F4D2E">
      <polygon points="30,242 48,196 66,242"/><polygon points="86,246 102,206 118,246"/>
      <polygon points="286,244 302,204 318,244"/>
      ${right ? '<polygon points="338,248 356,200 374,248"/>' : ""}
    </g>
    <g fill="#8A5A2B"><rect x="45" y="240" width="6" height="10"/><rect x="99" y="244" width="6" height="9"/><rect x="299" y="242" width="6" height="9"/>${right ? '<rect x="353" y="246" width="6" height="9"/>' : ""}</g>
    <!-- path + lantern -->
    <path d="M195 246 q-8 22 -22 32 q-10 8 -26 10 l34 8 q22 -4 28 -20 q5 -14 2 -30 z" fill="#9C8B70" opacity="0.8"/>
    ${right ? "" : '<g><rect x="263" y="222" width="4" height="16" fill="#263238"/><circle cx="265" cy="216" r="7" fill="#FFE66D" stroke="#263238" stroke-width="1.6"/></g>'}
    ${extras}
  </svg>`;
}

const SCENES = [
  {
    id: "harbour",
    name: "Sunny Harbour",
    render: harbourSVG,
    differences: [
      { id: "sun-colour", x: 330, y: 55, r: 30 },
      { id: "bird-extra", x: 270, y: 80, r: 17 },
      { id: "lighthouse-stripe", x: 65, y: 160, r: 17 },
      { id: "sail-colour", x: 264, y: 186, r: 21 },
      { id: "house-window", x: 195, y: 185, r: 14 },
      { id: "coconut-extra", x: 346, y: 200, r: 16 },
      { id: "starfish-missing", x: 110, y: 270, r: 15 }
    ]
  },
  {
    id: "mountain",
    name: "Mountain Village at Dusk",
    render: mountainSVG,
    differences: [
      { id: "moon-size", x: 60, y: 50, r: 25 },
      { id: "star-missing", x: 320, y: 40, r: 13 },
      { id: "snowcap-missing", x: 206, y: 108, r: 19 },
      { id: "smoke-missing", x: 234, y: 142, r: 17 },
      { id: "door-colour", x: 195, y: 231, r: 15 },
      { id: "pine-extra", x: 356, y: 222, r: 24 },
      { id: "lantern-missing", x: 265, y: 224, r: 14 }
    ]
  }
];

const state = {
  scene: 0,
  found: new Set(),
  hintsLeft: 3,
  mistakes: 0,
  seconds: 0,
  timerId: null,
  won: false,
  hintId: null,
  wrong: null,
  cursor: { side: "L", x: 200, y: 150, visible: false }
};

const $ = (id) => document.getElementById(id);
const stageL = $("stageL"), stageR = $("stageR");

function extrasFor(side) {
  const scene = SCENES[state.scene];
  let out = "";
  for (const d of scene.differences) {
    if (state.found.has(d.id)) {
      out += `<circle class="marker" cx="${d.x}" cy="${d.y}" r="${Math.max(d.r, 13)}" fill="none" stroke="#FF3B30" stroke-width="4"/>` +
             `<circle cx="${d.x}" cy="${d.y}" r="${Math.max(d.r, 13)}" fill="none" stroke="#FFE66D" stroke-width="1.6" stroke-dasharray="4 4"/>`;
    }
  }
  if (state.hintId) {
    const d = scene.differences.find((v) => v.id === state.hintId);
    if (d) out += `<circle class="hint-ring" cx="${d.x}" cy="${d.y}" r="${d.r + 6}" fill="none" stroke="#00E5FF" stroke-width="3"/>`;
  }
  if (state.wrong && state.wrong.side === side) {
    const w = state.wrong;
    out += `<g stroke="#FF3B30" stroke-width="4" stroke-linecap="round"><path d="M${w.x - 9} ${w.y - 9} L${w.x + 9} ${w.y + 9}"/><path d="M${w.x + 9} ${w.y - 9} L${w.x - 9} ${w.y + 9}"/></g>`;
  }
  if (state.cursor.visible && state.cursor.side === side) {
    out += `<circle cx="${state.cursor.x}" cy="${state.cursor.y}" r="11" fill="none" stroke="#111111" stroke-width="2" stroke-dasharray="4 3"/><circle cx="${state.cursor.x}" cy="${state.cursor.y}" r="2.4" fill="#111111"/>`;
  }
  return out;
}

function render() {
  const scene = SCENES[state.scene];
  stageL.innerHTML = scene.render("L" + state.scene, false, extrasFor("L"));
  stageR.innerHTML = scene.render("R" + state.scene, true, extrasFor("R"));
  const foundCount = state.found.size;
  const remain = scene.differences.length - foundCount;
  $("counter").textContent = `${foundCount} of ${scene.differences.length} found, ${remain} remain`;
  $("mistakes").textContent = `Mistakes: ${state.mistakes}`;
  $("hintsLabel").textContent = `Hints left: ${state.hintsLeft}`;
  $("hintBtn").disabled = state.hintsLeft <= 0 || state.won;
  $("sceneName").textContent = scene.name;
  document.querySelectorAll(".tab").forEach((b, i) => b.classList.toggle("active", i === state.scene));
  $("winBox").hidden = !state.won;
  if (state.won) {
    $("winText").textContent = `You found all 7 differences in ${formatTime(state.seconds)} with ${state.mistakes} mistake${state.mistakes === 1 ? "" : "s"}!`;
  }
}

function formatTime(s) {
  const m = Math.floor(s / 60), r = s % 60;
  return `${String(m).padStart(2, "0")}:${String(r).padStart(2, "0")}`;
}

function startTimer() {
  stopTimer();
  state.timerId = setInterval(() => {
    if (!state.won) { state.seconds++; $("timer").textContent = `Time: ${formatTime(state.seconds)}`; }
  }, 1000);
}
function stopTimer() { if (state.timerId) clearInterval(state.timerId); state.timerId = null; }

function loadScene(idx) {
  state.scene = idx;
  state.found = new Set();
  state.hintsLeft = 3;
  state.mistakes = 0;
  state.seconds = 0;
  state.won = false;
  state.hintId = null;
  state.wrong = null;
  state.cursor.visible = false;
  $("timer").textContent = "Time: 00:00";
  $("message").textContent = "Click a difference in either picture to mark it.";
  render();
  startTimer();
}

function markAt(side, x, y) {
  if (state.won) return;
  const scene = SCENES[state.scene];
  const hit = scene.differences.find((d) => !state.found.has(d.id) && Math.hypot(d.x - x, d.y - y) <= d.r);
  if (hit) {
    state.found.add(hit.id);
    state.wrong = null;
    $("message").textContent = state.found.size === scene.differences.length ? "Scene complete!" : "Found one! Keep going.";
    if (state.found.size === scene.differences.length) { state.won = true; stopTimer(); }
  } else {
    state.mistakes++;
    state.wrong = { side, x, y };
    const stage = side === "L" ? stageL : stageR;
    stage.classList.remove("shake"); void stage.offsetWidth; stage.classList.add("shake");
    $("message").textContent = "Not a difference — try again.";
    setTimeout(() => { if (state.wrong && state.wrong.x === x && state.wrong.y === y) { state.wrong = null; render(); } }, 650);
  }
  render();
}

function stagePoint(evt, stage) {
  const rect = stage.getBoundingClientRect();
  return { x: ((evt.clientX - rect.left) / rect.width) * 400, y: ((evt.clientY - rect.top) / rect.height) * 300 };
}

function useHint() {
  if (state.hintsLeft <= 0 || state.won) return;
  const remaining = SCENES[state.scene].differences.filter((d) => !state.found.has(d.id));
  if (!remaining.length) return;
  state.hintsLeft--;
  const pick = remaining[Math.floor(Math.random() * remaining.length)];
  state.hintId = pick.id;
  $("message").textContent = "A difference is glowing — catch it fast!";
  render();
  setTimeout(() => { if (state.hintId === pick.id) { state.hintId = null; render(); } }, 1600);
}

function bindStage(stage, side) {
  stage.addEventListener("click", (evt) => {
    const p = stagePoint(evt, stage);
    markAt(side, p.x, p.y);
  });
  stage.addEventListener("keydown", (evt) => {
    const step = evt.shiftKey ? 14 : 6;
    state.cursor.side = side;
    let used = true;
    if (evt.key === "ArrowLeft") state.cursor.x = Math.max(0, state.cursor.x - step);
    else if (evt.key === "ArrowRight") state.cursor.x = Math.min(400, state.cursor.x + step);
    else if (evt.key === "ArrowUp") state.cursor.y = Math.max(0, state.cursor.y - step);
    else if (evt.key === "ArrowDown") state.cursor.y = Math.min(300, state.cursor.y + step);
    else if (evt.key === "Enter" || evt.key === " ") { markAt(side, state.cursor.x, state.cursor.y); }
    else used = false;
    if (used) { state.cursor.visible = true; evt.preventDefault(); render(); }
  });
}

bindStage(stageL, "L");
bindStage(stageR, "R");
$("restartBtn").addEventListener("click", () => loadScene(state.scene));
$("hintBtn").addEventListener("click", useHint);
$("nextBtn").addEventListener("click", () => loadScene((state.scene + 1) % SCENES.length));
document.querySelectorAll(".tab").forEach((b, i) => b.addEventListener("click", () => loadScene(i)));
document.addEventListener("keydown", (evt) => {
  if (evt.key === "r" || evt.key === "R") loadScene(state.scene);
  if (evt.key === "h" || evt.key === "H") useHint();
});

loadScene(0);
