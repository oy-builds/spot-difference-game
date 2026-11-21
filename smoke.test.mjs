// Smoke tests for Double Take. Run: node smoke.test.mjs
import { existsSync, readFileSync, rmSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(fileURLToPath(import.meta.url));
let passed = 0, failed = 0;
function check(name, ok) {
  console.log(`${ok ? "PASS" : "FAIL"}  ${name}`);
  ok ? passed++ : failed++;
}

// 1. Required files exist
for (const f of ["index.html", "game.js", "styles.css", "main.ts", "README.md", "DOSSIER.md", "LICENSE",
                 ".makefun/owner.json", "screenshots/screenshot-1.svg", "screenshots/screenshot-2.svg", "screenshots/screenshot-3.svg"]) {
  check(`exists: ${f}`, existsSync(join(root, f)));
}

const html = readFileSync(join(root, "index.html"), "utf8");
const js = readFileSync(join(root, "game.js"), "utf8");
const css = readFileSync(join(root, "styles.css"), "utf8");
const all = html + js + css;

// 2. No external URLs / network calls anywhere in the game
check("no http/https URLs in game files", !/https?:\/\//.test(all));
check("no fetch/XHR in game.js", !/fetch\s*\(|XMLHttpRequest|WebSocket/.test(js));
check("no external src/href in HTML", !/(src|href)\s*=\s*"http/.test(html));

// 3. Build: node main.ts produces a playable out/
rmSync(join(root, "out"), { recursive: true, force: true });
execFileSync(process.execPath, [join(root, "main.ts")], { stdio: "pipe" });
for (const f of ["index.html", "game.js", "styles.css"]) {
  check(`build produces out/${f}`, existsSync(join(root, "out", f)));
}
check("out/game.js matches source", readFileSync(join(root, "out/game.js"), "utf8") === js);

// 4. Exactly 7 differences per scene (14 total), defined as data
const diffEntries = js.match(/\{\s*id: "[a-z-]+", x: \d+, y: \d+, r: \d+\s*\}/g) || [];
check(`7 differences per scene, 14 total (found ${diffEntries.length})`, diffEntries.length === 14);
check("two scenes defined", (js.match(/render: (harbourSVG|mountainSVG)/g) || []).length === 2);

// 5. Marker / counter / gameplay logic present
check("marker ring drawn for found differences", js.includes('class="marker"') && js.includes("state.found.add"));
check("counter text 'of 7 found' logic present", js.includes("found, ${remain} remain") || js.includes("of ${scene.differences.length} found"));
check("counter element in HTML", html.includes('id="counter"'));
check("wrong-click feedback present", js.includes("state.mistakes++") && js.includes("shake"));
check("hint button limited to 3", js.includes("hintsLeft: 3") && html.includes('id="hintBtn"') && js.includes('$("hintBtn")'));
check("timer present", js.includes("setInterval") && html.includes('id="timer"'));
check("win state present", js.includes("state.won = true") && html.includes('id="winBox"'));
check("restart present", html.includes('id="restartBtn"'));
check("keyboard support present", js.includes("ArrowLeft") && js.includes("Enter") && js.includes('"r"') && js.includes('"h"'));

// 6. Screenshots are valid SVG renders showing markers + counter
for (const s of ["screenshot-1.svg", "screenshot-2.svg", "screenshot-3.svg"]) {
  const svg = readFileSync(join(root, "screenshots", s), "utf8");
  check(`${s} is SVG with markers and a counter`,
    svg.startsWith("<svg") && svg.includes('stroke="#FF3B30"') && /of 7 found/.test(svg));
}

// 7. Owner proof
const owner = JSON.parse(readFileSync(join(root, ".makefun/owner.json"), "utf8"));
check("owner.json wallet matches", owner.wallet === "7xpK8LwVVh3QD3a1xVMbhgDxUya3wQESHPs9byJshnAU");

console.log(`\n${failed === 0 ? "All smoke tests passed." : "SOME TESTS FAILED"} (${passed} passed, ${failed} failed)`);
process.exit(failed === 0 ? 0 : 1);
