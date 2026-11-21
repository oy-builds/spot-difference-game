"use strict";
/* The scene catalogue: each scene pairs its painter with the seven
   differences hidden in its changed picture. Coordinates are centres in the
   400x300 picture space; r is the generous click radius around a difference.
   Scene 1 (Sunny Harbour) uses bold colour swaps and missing objects;
   Scene 2 (Mountain Village at Dusk) hides smaller, quieter changes — a
   shrunken moon, one star gone, a snow cap vanished — so the hunt deepens. */

import { drawHarbourPicture } from "./harbourScene.js";
import { drawMountainPicture } from "./mountainScene.js";

export const SCENES = [
  {
    id: "harbour",
    name: "Sunny Harbour",
    tabLabel: "Scene 1 · Harbour",
    difficulty: "Warm-up",
    parSeconds: 120,
    drawPicture: drawHarbourPicture,
    differences: [
      { id: "sun-colour", description: "Sun changes colour: yellow to coral orange", x: 330, y: 55, r: 30 },
      { id: "bird-extra", description: "A third seagull appears in the sky", x: 270, y: 80, r: 17 },
      { id: "lighthouse-stripe", description: "The lighthouse's lower red stripe is gone", x: 65, y: 160, r: 17 },
      { id: "sail-colour", description: "The main sail changes colour: white to teal", x: 264, y: 186, r: 21 },
      { id: "house-window", description: "The house's right window is gone", x: 195, y: 185, r: 14 },
      { id: "coconut-extra", description: "The palm tree grows a third coconut", x: 346, y: 200, r: 16 },
      { id: "starfish-missing", description: "The starfish on the beach is gone", x: 110, y: 270, r: 15 }
    ]
  },
  {
    id: "mountain",
    name: "Mountain Village at Dusk",
    tabLabel: "Scene 2 · Mountains · Harder",
    difficulty: "Harder",
    parSeconds: 180,
    drawPicture: drawMountainPicture,
    differences: [
      { id: "moon-size", description: "The moon shrinks", x: 60, y: 50, r: 25 },
      { id: "star-missing", description: "A bright star is gone from the sky", x: 320, y: 40, r: 13 },
      { id: "snowcap-missing", description: "The middle mountain's snow cap is gone", x: 206, y: 108, r: 19 },
      { id: "smoke-missing", description: "The cabin's chimney smoke is gone", x: 234, y: 142, r: 17 },
      { id: "door-colour", description: "The cabin door changes colour: brown to blue", x: 195, y: 231, r: 15 },
      { id: "pine-extra", description: "An extra pine tree appears on the right", x: 356, y: 222, r: 24 },
      { id: "lantern-missing", description: "The lantern by the path is gone", x: 265, y: 224, r: 14 }
    ]
  }
];

export function findDifferenceAt(scene, foundIds, x, y) {
  return scene.differences.find(
    (d) => !foundIds.has(d.id) && Math.hypot(d.x - x, d.y - y) <= d.r
  );
}

export function nextUnfoundDifference(scene, foundIds, randomValue) {
  const remaining = scene.differences.filter((d) => !foundIds.has(d.id));
  if (!remaining.length) return null;
  return remaining[Math.floor(randomValue * remaining.length)];
}
