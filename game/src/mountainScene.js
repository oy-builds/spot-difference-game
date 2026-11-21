"use strict";
/* Mountain Village at Dusk painter: draws one dusk-village picture as an
   inline SVG string. changed=false draws the original; changed=true applies
   this scene's differences (smaller moon, missing star, missing snow cap,
   missing chimney smoke, door colour, extra pine, missing lantern) — a
   subtler set than Scene 1, so the hunt gets harder. overlaySvg is the
   marker layer (rings, hint glow, cursor) drawn on top. */

export function drawMountainPicture(uid, changed, overlaySvg) {
  const moonRadius = changed ? 14 : 22;
  const doorFill = changed ? "#3A86FF" : "#8A5A2B";
  return `
  <svg viewBox="0 0 400 300" role="img" aria-label="${changed ? "Changed picture" : "Original picture"}">
    <defs>
      <linearGradient id="dusk-${uid}" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#2B2D5C"/><stop offset="0.7" stop-color="#7B5EA7"/><stop offset="1" stop-color="#E88CA0"/>
      </linearGradient>
    </defs>
    <rect x="0" y="0" width="400" height="300" fill="url(#dusk-${uid})"/>
    <circle cx="60" cy="50" r="${moonRadius}" fill="#FDF6D8" stroke="#E8DFA8" stroke-width="2"/>
    <g fill="#FFFFFF">
      <circle cx="140" cy="34" r="2.2"/><circle cx="215" cy="58" r="1.8"/><circle cx="262" cy="26" r="2.4"/>
      <circle cx="368" cy="70" r="1.8"/><circle cx="180" cy="82" r="1.6"/>
      ${changed ? "" : '<circle cx="320" cy="40" r="2.6"/>'}
    </g>
    <!-- mountains -->
    <polygon points="0,190 90,84 180,190" fill="#5A5490"/>
    <polygon points="70,112 90,84 112,112 98,104 90,114 82,104" fill="#FFFFFF"/>
    <polygon points="110,195 205,92 300,195" fill="#6C63A6"/>
    ${changed ? "" : '<polygon points="182,120 205,92 230,120 216,110 205,124 194,110" fill="#FFFFFF"/>'}
    <polygon points="240,195 322,116 400,195" fill="#4E4880"/>
    <polygon points="304,138 322,116 342,138 330,130 322,140 314,130" fill="#FFFFFF"/>
    <!-- ground + lake -->
    <rect x="0" y="192" width="400" height="50" fill="#37456B"/>
    <rect x="0" y="242" width="400" height="58" fill="#3E5C8A"/>
    <g stroke="#A8C6E8" stroke-width="2" opacity="0.6" stroke-linecap="round"><path d="M30 262 h44"/><path d="M300 276 h52"/><path d="M150 282 h36"/></g>
    <!-- cabin -->
    <g>
      <rect x="148" y="188" width="94" height="58" fill="#8D6E63" stroke="#4E342E" stroke-width="2"/>
      <polygon points="138,188 252,188 195,156" fill="#4E342E"/>
      <rect x="218" y="162" width="14" height="24" fill="#6D4C41"/>
      ${changed ? "" : '<g fill="#D7DEE8" opacity="0.85"><circle cx="225" cy="150" r="6"/><circle cx="232" cy="140" r="8"/><circle cx="242" cy="129" r="10"/></g>'}
      <rect x="186" y="216" width="18" height="30" fill="${doorFill}" stroke="#4E342E" stroke-width="1.6"/>
      <rect x="158" y="200" width="15" height="15" fill="#FFE66D" stroke="#4E342E" stroke-width="1.5"/>
      <rect x="216" y="200" width="15" height="15" fill="#FFE66D" stroke="#4E342E" stroke-width="1.5"/>
    </g>
    <!-- pines -->
    <g fill="#1F4D2E">
      <polygon points="30,242 48,196 66,242"/><polygon points="86,246 102,206 118,246"/>
      <polygon points="286,244 302,204 318,244"/>
      ${changed ? '<polygon points="338,248 356,200 374,248"/>' : ""}
    </g>
    <g fill="#8A5A2B"><rect x="45" y="240" width="6" height="10"/><rect x="99" y="244" width="6" height="9"/><rect x="299" y="242" width="6" height="9"/>${changed ? '<rect x="353" y="246" width="6" height="9"/>' : ""}</g>
    <!-- path + lantern -->
    <path d="M195 246 q-8 22 -22 32 q-10 8 -26 10 l34 8 q22 -4 28 -20 q5 -14 2 -30 z" fill="#9C8B70" opacity="0.8"/>
    ${changed ? "" : '<g><rect x="263" y="222" width="4" height="16" fill="#263238"/><circle cx="265" cy="216" r="7" fill="#FFE66D" stroke="#263238" stroke-width="1.6"/></g>'}
    ${overlaySvg}
  </svg>`;
}
