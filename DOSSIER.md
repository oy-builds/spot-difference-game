# Dossier — Double Take

[![make.fun · best-spot-the-difference-game-20261121-0451](https://make.fun/badge/best-spot-the-difference-game-20261121-0451.svg)](https://make.fun/bounty/best-spot-the-difference-game-20261121-0451?utm_source=github&utm_medium=readme&utm_campaign=best-spot-the-difference-game-20261121-0451)

## Game name

**Double Take** — an original spot-the-difference game for desktop browsers.

## What it is

Two near-identical pictures sit side by side. The right-hand picture hides exactly
**7 differences**. The player clicks a difference in either picture; a red ring
marker appears on **both** pictures at that spot, and the counter at the top tracks
progress ("3 of 7 found - 4 remain"). Find all 7 to complete the scene.

There are **2 scenes**, each with its own palette, layout and 7 differences,
and the hunt deepens: Scene 1 (Sunny Harbour) hides bold colour swaps and
missing objects, while Scene 2 (Mountain Village at Dusk) hides smaller,
quieter changes — a shrunken moon, one star gone, a vanished snow cap.
Everything is drawn procedurally in code as inline SVG — there are no image
assets, no fonts to load, and the game makes **no network requests**: it runs
fully offline from static files. Even the sound effects (a chime on each
find, a buzz on a mistake, a jingle on the win) are synthesized with
WebAudio — there are no audio files either.

## How to play

- **Mouse:** click a difference in either picture to mark it.
- **Wrong clicks** shake the picture, flash a red × and add to the mistake count.
- **Hint button:** pulses a glowing ring around one unfound difference for
  ~1.6 seconds. Limited to **3 hints per scene**.
- **Timer and pace bar:** the clock starts with the scene and stops when the
  last difference is found. A pace bar under the stats fills toward the
  scene's **par time** (2:00 for Scene 1, 3:00 for Scene 2) and turns red —
  with the timer — once par passes, so the time pressure is always visible
  in the frame.
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
  the counter is a high-contrast pill ("X of 7 found - Y remain") so progress
  reads at a glance in screenshots.

## Screenshots

In `screenshots/` — **PNG renders of game states**, drawn with the game's own
coordinates, palettes, markers and counters, at 1280 px wide:

- `1-harbour-mid-game.png` — Scene 1 mid-game: 3 differences ringed in both
  pictures, counter "3 of 7 found - 4 remain", timer running at 00:47 with
  the pace bar part-filled, several differences still unfound.
- `2-mountain-hint.png` — Scene 2 mid-game: 2 differences ringed, a cyan hint
  ring glowing around the missing chimney smoke, counter
  "2 of 7 found - 5 remain".
- `3-harbour-win.png` — Scene 1 win state: all 7 differences ringed in both
  pictures, counter "7 of 7 found - 0 remain", the pace bar full and red
  past par, and the completion panel with the final time and mistakes.

## File outline

The game's source is split into files with one clear job each:

| File | Purpose |
| --- | --- |
| `game/index.html` | Page shell: header, stats bar, pace bar, the two picture panels, controls, help text |
| `game/styles.css` | All styling (dark UI, panels, marker/hint/shake animations) |
| `game/src/main.js` | Game controller: state, rendering, click + keyboard handling, clock and pace bar, hints, win state |
| `game/src/scenes.js` | Scene catalogue: both scenes' 7 differences as data, hit-testing, hint picking |
| `game/src/harbourScene.js` | Sunny Harbour painter — draws the original and changed pictures as SVG |
| `game/src/mountainScene.js` | Mountain Village at Dusk painter — draws the original and changed pictures as SVG |
| `game/src/markers.js` | Marker layer: found rings on both pictures, hint ring, wrong-click cross, keyboard cursor |
| `game/src/soundEffects.js` | Synthesized WebAudio sound effects (find chime, wrong buzz, hint sparkle, win jingle) |
| `main.ts` | Hand-in program (Node 22, stdlib only): copies `game/` + `screenshots/` to the output and writes `dossier.json` |
| `vendor/makefun-game.ts` | The kit's dossier library, byte-identical to the kit's copy |
| `screenshots/` | PNG renders of game states (see above) |
| `smoke.test.mjs` | Smoke tests: structure, gate limits, offline guarantee, game logic |
| `README.md` | Short overview and run instructions |
| `LICENSE` | MIT License |
| `.makefun/owner.json` | make.fun owner proof (public wallet address) |

## How to run

Play: serve `game/` with any static file server (or open `game/index.html`
directly) in a desktop browser. No build step, install or network needed.

Hand in:

```bash
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```

## Tests

```bash
node smoke.test.mjs
```

Verifies: the kit structure exists, `vendor/makefun-game.ts` is byte-identical
to the kit's, every reference in the game stays inside `game/`, the
screenshots are PNGs within the gate's size limits, `node main.ts` hands in
`out/` with a dossier under the cap that is byte-identical across two runs,
and the game logic holds — exactly 7 differences per scene, hit-testing,
markers on found differences, the counter format, hints, timer, win state
and keyboard support.
