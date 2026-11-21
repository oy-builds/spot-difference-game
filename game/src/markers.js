"use strict";
/* The marker layer: builds the SVG drawn over a picture — a red ring with a
   dashed yellow twin for every found difference (so a find reads over both
   bright sky and dark dusk), a pulsing cyan ring for the hinted difference,
   a red cross where the player just clicked wrong, and the dashed keyboard
   cursor. The same layer is built for both pictures, so a find is always
   ringed in the original and the changed picture alike. */

export function buildMarkerRing(difference) {
  const ringRadius = Math.max(difference.r, 13);
  return (
    `<circle class="marker" cx="${difference.x}" cy="${difference.y}" r="${ringRadius}" fill="none" stroke="#FF3B30" stroke-width="4"/>` +
    `<circle cx="${difference.x}" cy="${difference.y}" r="${ringRadius}" fill="none" stroke="#FFE66D" stroke-width="1.6" stroke-dasharray="4 4"/>`
  );
}

export function buildHintRing(difference) {
  return `<circle class="hint-ring" cx="${difference.x}" cy="${difference.y}" r="${difference.r + 6}" fill="none" stroke="#00E5FF" stroke-width="3"/>`;
}

export function buildWrongClickCross(mark) {
  return (
    `<g stroke="#FF3B30" stroke-width="4" stroke-linecap="round">` +
    `<path d="M${mark.x - 9} ${mark.y - 9} L${mark.x + 9} ${mark.y + 9}"/>` +
    `<path d="M${mark.x + 9} ${mark.y - 9} L${mark.x - 9} ${mark.y + 9}"/></g>`
  );
}

export function buildKeyboardCursor(cursor) {
  return (
    `<circle cx="${cursor.x}" cy="${cursor.y}" r="11" fill="none" stroke="#111111" stroke-width="2" stroke-dasharray="4 3"/>` +
    `<circle cx="${cursor.x}" cy="${cursor.y}" r="2.4" fill="#111111"/>`
  );
}

export function buildOverlaySvg(scene, view) {
  let overlay = "";
  for (const difference of scene.differences) {
    if (view.foundIds.has(difference.id)) overlay += buildMarkerRing(difference);
  }
  if (view.hintId) {
    const hinted = scene.differences.find((d) => d.id === view.hintId);
    if (hinted) overlay += buildHintRing(hinted);
  }
  if (view.wrongMark && view.wrongMark.side === view.side) {
    overlay += buildWrongClickCross(view.wrongMark);
  }
  if (view.cursor.visible && view.cursor.side === view.side) {
    overlay += buildKeyboardCursor(view.cursor);
  }
  return overlay;
}
