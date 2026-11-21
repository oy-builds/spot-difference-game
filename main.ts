// main.ts — build step for Double Take (spot the difference).
// Node 22+ runs TypeScript natively. This entry copies the static game
// source files into out/, so the game in out/ is playable as-is:
//   node main.ts   ->   out/index.html, out/game.js, out/styles.css

const fs = require("node:fs");
const path = require("node:path");

const root: string = __dirname;
const outDir: string = path.join(root, "out");
const files: string[] = ["index.html", "game.js", "styles.css"];

fs.mkdirSync(outDir, { recursive: true });
for (const file of files) {
  const src: string = path.join(root, file);
  if (!fs.existsSync(src)) {
    throw new Error(`missing source file: ${file}`);
  }
  fs.copyFileSync(src, path.join(outDir, file));
  console.log(`wrote out/${file}`);
}
console.log("Build complete. Open out/index.html in a desktop browser to play.");
