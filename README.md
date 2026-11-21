[![make.fun · best-spot-the-difference-game-20261121-0451](https://make.fun/badge/best-spot-the-difference-game-20261121-0451.svg)](https://make.fun/bounty/best-spot-the-difference-game-20261121-0451?utm_source=github&utm_medium=readme&utm_campaign=best-spot-the-difference-game-20261121-0451)
[![rank](https://make.fun/badge/best-spot-the-difference-game-20261121-0451/oy-builds/spot-difference-game/rank.svg)](https://make.fun/bounty/best-spot-the-difference-game-20261121-0451/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=best-spot-the-difference-game-20261121-0451)
[![reward](https://make.fun/badge/best-spot-the-difference-game-20261121-0451/oy-builds/spot-difference-game/reward.svg)](https://make.fun/bounty/best-spot-the-difference-game-20261121-0451?utm_source=github&utm_medium=readme&utm_campaign=best-spot-the-difference-game-20261121-0451)

# Double Take — Spot the Difference

[![make.fun · best-spot-the-difference-game-20261121-0451](https://make.fun/badge/best-spot-the-difference-game-20261121-0451.svg)](https://make.fun/bounty/best-spot-the-difference-game-20261121-0451?utm_source=github&utm_medium=readme&utm_campaign=best-spot-the-difference-game-20261121-0451)

An original spot-the-difference game for desktop browsers. Two near-identical,
procedurally drawn pictures side by side — the right one hides 7 differences.
Click to ring them in both pictures, race the par-time pace bar, and use at
most 3 hints per scene.

- **2 scenes:** Sunny Harbour (warm-up) and Mountain Village at Dusk (harder —
  smaller, quieter changes), 7 differences each
- **Fully offline:** static files only, no assets, no network requests; even
  the sound effects are synthesized in code with WebAudio
- **Mouse + keyboard:** click, or Tab to a picture and use arrows + Enter
  (H = hint, R = restart)

## Play

Serve `game/` with any static file server and open `game/index.html` in a
desktop browser — or just open the file directly. No build step, no install.

## Hand in (make.fun)

```bash
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts   # Node 22+
```

Copies `game/` and `screenshots/` into `out/` and writes `out/dossier.json`
with the vendored `vendor/makefun-game.ts` library.

## Files

| Path | Purpose |
| --- | --- |
| `game/index.html` | Page shell: header, stats bar, pace bar, the two picture panels, controls, help |
| `game/styles.css` | All styling (dark UI, panels, marker/hint/shake animations) |
| `game/src/main.js` | Game controller: state, rendering, clicks, keyboard, clock and pace bar, hints, win |
| `game/src/scenes.js` | Scene catalogue: the 7 differences per scene, hit-testing, hint picking |
| `game/src/harbourScene.js` | Sunny Harbour painter (original + changed SVG pictures) |
| `game/src/mountainScene.js` | Mountain Village at Dusk painter (original + changed SVG pictures) |
| `game/src/markers.js` | Marker layer: found rings, hint ring, wrong-click cross, keyboard cursor |
| `game/src/soundEffects.js` | Synthesized WebAudio chimes — no audio files |
| `screenshots/` | PNG renders of real game states (see `DOSSIER.md`) |
| `main.ts` | Hand-in program: copies the game + screenshots out and writes the dossier |
| `vendor/makefun-game.ts` | The kit's dossier library, unchanged |
| `smoke.test.mjs` | Smoke tests (`node smoke.test.mjs`) |
| `DOSSIER.md` | Full difference list, design notes and screenshot guide |

## License

MIT — see `LICENSE`.
