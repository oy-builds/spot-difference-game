// Smoke tests for Double Take (kit format). Run: node smoke.test.mjs
import { existsSync, readFileSync, rmSync, mkdtempSync, copyFileSync, statSync, readdirSync } from "node:fs";
import { createHash } from "node:crypto";
import { execFileSync } from "node:child_process";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = dirname(fileURLToPath(import.meta.url));
let passed = 0, failed = 0;
function check(name, ok) {
  console.log(`${ok ? "PASS" : "FAIL"}  ${name}`);
  ok ? passed++ : failed++;
}
const sha256 = (buf) => createHash("sha256").update(buf).digest("hex");

// ---------- 1. Kit structure ----------
for (const f of ["main.ts", "README.md", "DOSSIER.md", "LICENSE", "smoke.test.mjs",
                 ".makefun/owner.json", "vendor/makefun-game.ts",
                 "game/index.html", "game/styles.css",
                 "game/src/main.js", "game/src/scenes.js", "game/src/harbourScene.js",
                 "game/src/mountainScene.js", "game/src/markers.js", "game/src/soundEffects.js"]) {
  check(`exists: ${f}`, existsSync(join(root, f)));
}
for (const f of ["index.html", "game.js", "styles.css"]) {
  check(`old flat file gone from root: ${f}`, !existsSync(join(root, f)));
}
const allFiles = [];
(function walk(dir) {
  for (const name of readdirSync(dir, { withFileTypes: true })) {
    if (name.name === ".git") continue;
    const p = join(dir, name.name);
    if (name.isDirectory()) walk(p); else allFiles.push(p);
  }
})(root);
check("no SVG screenshots left anywhere", !allFiles.some((p) => p.endsWith(".svg")));

// ---------- 2. Vendor library is the kit's copy, byte for byte ----------
const kitVendor = join(root, "..", "kits", "best-spot-the-difference-game-20261121-0451",
  "best-spot-the-difference-game-20261121-0451-kit", "starter", "vendor", "makefun-game.ts");
const vendorBytes = readFileSync(join(root, "vendor", "makefun-game.ts"));
if (existsSync(kitVendor)) {
  check("vendor/makefun-game.ts byte-identical to kit", vendorBytes.equals(readFileSync(kitVendor)));
} else {
  check("vendor/makefun-game.ts matches kit sha256",
    sha256(vendorBytes) === "dc67187521b24025ff952f8c231485a6eb92d6d71d29edd2a08154ffb4376129");
}

// ---------- 3. References stay inside game/, nothing loads over the network ----------
const gameDir = join(root, "game");
const html = readFileSync(join(gameDir, "index.html"), "utf8");
const refs = [...html.matchAll(/(?:src|href)\s*=\s*"([^"]+)"/g)].map((m) => m[1]);
check("index.html has references", refs.length >= 2);
for (const ref of refs) {
  check(`reference inside game/: ${ref}`,
    !/^(https?:)?\/\//.test(ref) && !ref.startsWith("/") && existsSync(join(gameDir, ref)));
}
const gameSources = ["index.html", "styles.css", "src/main.js", "src/scenes.js",
  "src/harbourScene.js", "src/mountainScene.js", "src/markers.js", "src/soundEffects.js"]
  .map((f) => readFileSync(join(gameDir, f), "utf8"));
const allGame = gameSources.join("\n");
check("no http/https URLs in game files", !/https?:\/\//.test(allGame));
check("no fetch/XHR/WebSocket in game code", !/fetch\s*\(|XMLHttpRequest|WebSocket/.test(allGame));
const mainJs = readFileSync(join(gameDir, "src", "main.js"), "utf8");
for (const m of mainJs.matchAll(/from\s*"\.\/([a-zA-Z]+)\.js"/g)) {
  check(`main.js import resolves: ${m[1]}.js`, existsSync(join(gameDir, "src", `${m[1]}.js`)));
}

// ---------- 4. Every game script parses as an ES module ----------
const tmp = mkdtempSync(join(root, ".smoke-"));
try {
  for (const f of ["main.js", "scenes.js", "harbourScene.js", "mountainScene.js", "markers.js", "soundEffects.js"]) {
    const probe = join(tmp, f.replace(/\.js$/, ".mjs"));
    copyFileSync(join(gameDir, "src", f), probe);
    let ok = true;
    try { execFileSync(process.execPath, ["--check", probe], { stdio: "pipe" }); } catch { ok = false; }
    check(`parses as ES module: game/src/${f}`, ok);
  }
} finally { rmSync(tmp, { recursive: true, force: true }); }

// ---------- 5. Screenshots meet the gate ----------
const shots = readdirSync(join(root, "screenshots")).filter((n) => !n.startsWith(".")).sort();
check(`exactly 3 screenshots (found ${shots.length})`, shots.length === 3);
for (const name of shots) {
  const buf = readFileSync(join(root, "screenshots", name));
  const isPng = buf.subarray(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]));
  const w = isPng ? buf.readUInt32BE(16) : 0;
  const h = isPng ? buf.readUInt32BE(20) : 0;
  check(`${name}: gate-legal name`, /^[A-Za-z0-9][A-Za-z0-9._-]{0,127}$/.test(name));
  check(`${name}: whole PNG`, isPng);
  check(`${name}: long side <= 1280, short side >= 480 (${w}x${h})`,
    Math.max(w, h) <= 1280 && Math.min(w, h) >= 480);
  check(`${name}: <= 256 KiB (${buf.length} bytes)`, buf.length <= 262144);
}
check("first screenshot by name is the mid-game cover", shots[0].startsWith("1-"));

// ---------- 6. Game logic (the pure modules, imported for real) ----------
const { SCENES, findDifferenceAt, nextUnfoundDifference } =
  await import(pathToFileURL(join(gameDir, "src", "scenes.js")).href);
const { buildOverlaySvg } = await import(pathToFileURL(join(gameDir, "src", "markers.js")).href);

check("two scenes defined", SCENES.length === 2);
check("scene 2 is the harder set", SCENES[1].difficulty === "Harder" && SCENES[1].parSeconds > SCENES[0].parSeconds);
for (const scene of SCENES) {
  const diffs = scene.differences;
  check(`${scene.id}: exactly 7 differences`, diffs.length === 7);
  check(`${scene.id}: difference ids unique`, new Set(diffs.map((d) => d.id)).size === 7);
  check(`${scene.id}: all differences inside the 400x300 picture with sane radii`,
    diffs.every((d) => d.x >= 0 && d.x <= 400 && d.y >= 0 && d.y <= 300 && d.r >= 8 && d.r <= 40));
  const first = diffs[0];
  check(`${scene.id}: hit-test finds an unfound difference at its centre`,
    findDifferenceAt(scene, new Set(), first.x, first.y)?.id === first.id);
  check(`${scene.id}: hit-test ignores an already-found difference`,
    findDifferenceAt(scene, new Set([first.id]), first.x, first.y)?.id !== first.id);
  const corner = [[4, 4], [396, 4], [4, 296], [396, 296]]
    .find(([x, y]) => diffs.every((d) => Math.hypot(d.x - x, d.y - y) > d.r + 2));
  check(`${scene.id}: hit-test misses empty space`, corner && !findDifferenceAt(scene, new Set(), corner[0], corner[1]));
  check(`${scene.id}: hint pick is always an unfound difference`, (() => {
    const found = new Set(diffs.slice(0, 6).map((d) => d.id));
    return nextUnfoundDifference(scene, found, 0)?.id === diffs[6].id &&
           nextUnfoundDifference(scene, new Set(diffs.map((d) => d.id)), 0) === null;
  })());
  const original = scene.drawPicture("T", false, "");
  const changed = scene.drawPicture("T", true, "");
  check(`${scene.id}: changed picture differs from the original`, original !== changed);
  check(`${scene.id}: painter embeds the overlay before </svg>`,
    scene.drawPicture("T", false, "OVERLAY").includes("OVERLAY</svg>") ||
    scene.drawPicture("T", false, "OVERLAY").includes("OVERLAY\n  </svg>"));
}

// Markers: rings for found only, hint ring, wrong cross and cursor per side
const scene = SCENES[0];
const foundIds = new Set(scene.differences.slice(0, 3).map((d) => d.id));
const overlayL = buildOverlaySvg(scene, {
  foundIds, hintId: scene.differences[3].id,
  wrongMark: { side: "L", x: 10, y: 10 }, cursor: { side: "L", x: 50, y: 50, visible: true }, side: "L"
});
const overlayR = buildOverlaySvg(scene, {
  foundIds, hintId: scene.differences[3].id,
  wrongMark: { side: "L", x: 10, y: 10 }, cursor: { side: "L", x: 50, y: 50, visible: true }, side: "R"
});
check("overlay rings exactly the 3 found differences", (overlayL.match(/class="marker"/g) || []).length === 3);
check("overlay shows the hint ring", overlayL.includes('class="hint-ring"'));
check("wrong-click cross only on the clicked side", overlayL.includes('<g stroke="#FF3B30" stroke-width="4" stroke-linecap="round">'));
check("wrong-click cross absent from the other side", !overlayR.includes('<g stroke="#FF3B30" stroke-width="4" stroke-linecap="round">'));

// ---------- 7. Controller wiring (static checks on main.js / index.html) ----------
check("counter format 'X of 7 found - Y remain'", mainJs.includes("found - ${remain} remain"));
check("timer runs on an interval", mainJs.includes("setInterval"));
check("pace bar driven by par time", mainJs.includes("paceFill") && mainJs.includes("parSeconds"));
check("win state stops the clock and celebrates", mainJs.includes("celebrateWin") && mainJs.includes("stopClock()"));
check("hints limited per scene", mainJs.includes("HINTS_PER_SCENE = 3") && mainJs.includes("state.hintsLeft--"));
check("mistakes counted with shake feedback", mainJs.includes("state.mistakes++") && mainJs.includes("shake"));
check("keyboard support: arrows + Enter + H + R",
  mainJs.includes("ArrowLeft") && mainJs.includes("Enter") && mainJs.includes('"h"') && mainJs.includes('"r"'));
check("sound effects wired for finds and wins",
  mainJs.includes("playFoundChime") && mainJs.includes("playWinJingle"));
for (const id of ["counter", "timer", "mistakes", "hintsLabel", "parLabel", "paceFill",
                  "stageL", "stageR", "hintBtn", "restartBtn", "winBox", "nextBtn", "message", "sceneName"]) {
  check(`index.html has #${id}`, html.includes(`id="${id}"`));
}
check("index.html loads the module controller", html.includes('<script type="module" src="src/main.js">'));

// ---------- 8. Hand-in: node main.ts, twice, byte-identical dossier ----------
const outA = mkdtempSync(join(root, ".smoke-out-a-"));
const outB = mkdtempSync(join(root, ".smoke-out-b-"));
try {
  for (const out of [outA, outB]) {
    execFileSync(process.execPath, [join(root, "main.ts")],
      { env: { ...process.env, MAKEFUN_OUTPUT_DIR: out }, stdio: "pipe" });
  }
  for (const f of ["game/index.html", "game/src/main.js", "screenshots/1-harbour-mid-game.png", "dossier.json"]) {
    check(`hand-in produces ${f}`, existsSync(join(outA, f)));
  }
  const dossier = readFileSync(join(outA, "dossier.json"));
  check(`dossier <= 1.5 MiB (${dossier.length} bytes)`, dossier.length <= 1572864);
  check("dossier byte-identical across two runs",
    sha256(dossier) === sha256(readFileSync(join(outB, "dossier.json"))));
  check("handed-in game matches the source game",
    readFileSync(join(outA, "game", "src", "scenes.js"), "utf8") ===
    readFileSync(join(gameDir, "src", "scenes.js"), "utf8"));
} finally {
  rmSync(outA, { recursive: true, force: true });
  rmSync(outB, { recursive: true, force: true });
}

// ---------- 9. Owner proof ----------
const owner = JSON.parse(readFileSync(join(root, ".makefun", "owner.json"), "utf8"));
check("owner.json wallet matches", owner.wallet === "7xpK8LwVVh3QD3a1xVMbhgDxUya3wQESHPs9byJshnAU");

console.log(`\n${failed === 0 ? "All smoke tests passed." : "SOME TESTS FAILED"} (${passed} passed, ${failed} failed)`);
process.exit(failed === 0 ? 0 : 1);
