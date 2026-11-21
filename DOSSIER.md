# Dossier — Double Take

[![make.fun · best-spot-the-difference-game-20261121-0451](https://make.fun/badge/best-spot-the-difference-game-20261121-0451.svg)](https://make.fun/bounty/best-spot-the-difference-game-20261121-0451?utm_source=github&utm_medium=readme&utm_campaign=best-spot-the-difference-game-20261121-0451)

## Game name

**Double Take** — an original spot-the-difference game for desktop browsers.

## What it is

Two near-identical pictures sit side by side. The right-hand picture hides exactly
**7 differences**. The player clicks a difference in either picture; a red ring
marker appears on **both** pictures at that spot, and the counter at the top tracks
progress ("3 of 7 found, 4 remain"). Find all 7 to complete the scene.

There are **2 scenes**, each with its own palette, layout and 7 differences.
Everything is drawn procedurally in code as inline SVG — there are no image
assets, no fonts to load, and the game makes **no network requests**: it runs
fully offline from static files.

## How to play

- **Mouse:** click a difference in either picture to mark it.
- **Wrong clicks** shake the picture, flash a red × and add to the mistake count.
- **Hint button:** pulses a glowing ring around one unfound difference for
  ~1.6 seconds. Limited to **3 hints per scene**.
- **Timer** starts with the scene and stops when the last difference is found.
- **Win state:** finding all 7 shows a completion panel with the final time and
  mistake count, plus a button to play the next scene.
- **Restart button** resets the current scene (found markers, timer, mistakes, hints).

## Controls

| Input | Action |
| --- | --- |
| Mouse click on a picture | Mark the clicked spot |
| Tab | Move focus between the pictures and controls |
| Arrow keys (in a focused picture) | Move the dashed keyboard cursor (Shift = bigger steps) |
| Enter / Space (in a focused picture) | Mark at the keyboard cursor |
| H | Use a hint |
| R | Restart the scene |

## The differences (judge-facing — not shown in the game UI)

Coordinates are centres in the 400×300 picture space.

### Scene 1 — Sunny Harbour

| # | Difference | Type | Location |
| --- | --- | --- | --- |
| 1 | Sun changes colour: yellow → coral orange | Colour change | (330, 55) |
| 2 | A third seagull appears in the sky | Extra object | (270, 80) |
| 3 | The lighthouse's lower red stripe is gone | Missing object | (65, 160) |
| 4 | The sailboat's main sail changes colour: white → teal | Colour change | (264, 186) |
| 5 | The house's right window is gone | Missing object | (195, 185) |
| 6 | The palm tree grows a third coconut | Extra object | (346, 200) |
| 7 | The starfish on the beach is gone | Missing object | (110, 270) |

### Scene 2 — Mountain Village at Dusk

| # | Difference | Type | Location |
| --- | --- | --- | --- |
| 1 | The moon shrinks (radius 22 → 14) | Size change | (60, 50) |
| 2 | A bright star is gone from the sky | Missing object | (320, 40) |
| 3 | The middle mountain's snow cap is gone | Missing object | (206, 108) |
| 4 | The cabin's chimney smoke is gone | Missing object | (234, 142) |
| 5 | The cabin door changes colour: brown → blue | Colour change | (195, 231) |
| 6 | An extra pine tree appears on the right | Extra object | (356, 222) |
| 7 | The lantern by the path is gone | Missing object | (265, 224) |

The set deliberately mixes colour changes, missing objects, extra objects and a
size change, spread across the whole frame (sky, middle ground and foreground),
so no single scan pattern finds them all.

## Design and art notes

- **Original procedural art.** Both scenes are hand-coded SVG scenes (gradients,
  simple geometric shapes, flat colours) written for this game — a sunny harbour
  with a lighthouse, cottage, sailboat and palm tree; and a dusk mountain village
  with snow-capped peaks, a smoking cabin, pines and a lantern-lit path. No
  photographs, stock art, sprites or third-party assets are used.
- **Fair differences.** Each difference is a single, unambiguous change rendered
  by the same drawing code that draws the original, so the two pictures are
  pixel-identical everywhere else. Hit areas are generous (radius 13–30 units).
- **Readable at judging size.** Bold outlines, high-contrast palettes, and
  markers that pair a solid red ring with a dashed yellow ring so found spots
  stay visible over both bright and dark scenes.
- **Interface.** Dark chrome around the pictures keeps focus on the scenes;
  the counter is a high-contrast pill ("X of 7 found, Y remain") so progress
  reads at a glance in screenshots.

## Screenshots

In `screenshots/` — these are **SVG renders of game states**, drawn to match the
game's layout, palettes, markers and counters:

- `screenshot-1.svg` — Scene 1 mid-game: 3 differences ringed in both pictures,
  counter "3 of 7 found, 4 remain", several differences still unfound.
- `screenshot-2.svg` — Scene 2 mid-game: 2 differences ringed, a hint ring
  glowing around the chimney smoke, counter "2 of 7 found, 5 remain".
- `screenshot-3.svg` — Scene 1 win state: all 7 differences ringed, counter
  "7 of 7 found, 0 remain", completion banner with time and mistakes.

## File outline

| File | Purpose |
| --- | --- |
| `index.html` | Page shell: header, stats bar, the two picture panels, controls, help text |
| `styles.css` | All styling (dark UI, panels, marker/hint/shake animations) |
| `game.js` | Both procedural SVG scenes, the 7-difference data per scene, and all gameplay logic (clicking, markers, counter, hints, timer, win state, keyboard) |
| `main.ts` | Node 22+ TypeScript entry: builds the playable game into `out/` |
| `out/` | Built game (`out/index.html`, `out/game.js`, `out/styles.css`) — generated by `node main.ts` |
| `screenshots/` | SVG renders of game states (see above) |
| `smoke.test.mjs` | Smoke tests: files, build, offline guarantee, difference count, gameplay logic |
| `README.md` | Short overview and run instructions |
| `LICENSE` | MIT License |
| `.makefun/owner.json` | make.fun owner proof (public wallet address) |

## How to run

```bash
node main.ts          # builds the game into out/
# then open out/index.html in a desktop browser
```

Or skip the build and open `index.html` directly — the source files are the
same static game. No server, install step or network connection is needed.

## Tests

```bash
node smoke.test.mjs
```

Verifies: all files exist, `node main.ts` builds a playable `out/`, no external
URLs or network calls in the game, exactly 7 differences per scene, and the
marker / counter / hint / timer / win / keyboard logic is present.
