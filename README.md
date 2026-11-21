# Double Take — Spot the Difference

[![make.fun · best-spot-the-difference-game-20261121-0451](https://make.fun/badge/best-spot-the-difference-game-20261121-0451.svg)](https://make.fun/bounty/best-spot-the-difference-game-20261121-0451?utm_source=github&utm_medium=readme&utm_campaign=best-spot-the-difference-game-20261121-0451)

An original spot-the-difference game for desktop browsers. Two near-identical,
procedurally drawn pictures side by side — the right one hides 7 differences.
Click to mark them in both pictures, beat the timer, use at most 3 hints.

- **2 scenes:** Sunny Harbour and Mountain Village at Dusk, 7 differences each
- **Fully offline:** static files only, no assets, no network requests
- **Mouse + keyboard:** click, or Tab to a picture and use arrows + Enter (H = hint, R = restart)

## Run

```bash
node main.ts   # Node 22+, builds the game into out/
```

Then open `out/index.html` in a desktop browser. (Opening `index.html`
directly works too — it is the same static game.)

## Files

`index.html` · `styles.css` · `game.js` · `main.ts` · `screenshots/` · `DOSSIER.md` (full difference list, design notes, file outline) · `smoke.test.mjs` (`node smoke.test.mjs`)

## License

MIT — see `LICENSE`.
