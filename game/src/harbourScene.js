"use strict";
/* Sunny Harbour painter: draws one harbour picture as an inline SVG string.
   changed=false draws the original; changed=true draws the same scene with
   this scene's differences applied (sun colour, extra gull, missing lighthouse
   stripe, sail colour, missing window, extra coconut, missing starfish).
   overlaySvg is the marker layer (rings, hint glow, cursor) drawn on top. */

export function drawHarbourPicture(uid, changed, overlaySvg) {
  const sunFill = changed ? "#FF7B54" : "#FFD93D";
  const sailFill = changed ? "#2EC4B6" : "#FFFFFF";
  return `
  <svg viewBox="0 0 400 300" role="img" aria-label="${changed ? "Changed picture" : "Original picture"}">
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
      ${changed ? '<path d="M258 80 q6 -6 12 0 q6 -6 12 0"/>' : ""}
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
      ${changed ? "" : '<rect x="52" y="154" width="26" height="12" fill="#E63946"/>'}
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
      ${changed ? "" : '<rect x="188" y="178" width="14" height="14" fill="#FFF3B0" stroke="#8D6E63" stroke-width="1.6"/>'}
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
      ${changed ? '<circle cx="346" cy="206" r="6" fill="#6F4518"/>' : ""}
    </g>
    <!-- buoy + starfish -->
    <g><rect x="105" y="200" width="10" height="18" fill="#E63946"/><rect x="105" y="206" width="10" height="5" fill="#FFFFFF"/></g>
    ${changed ? "" : '<polygon points="110,258 113,267 122,267 115,273 118,282 110,277 102,282 105,273 98,267 107,267" fill="#FF8C42" stroke="#D96C2C" stroke-width="1.4"/>'}
    ${overlaySvg}
  </svg>`;
}
