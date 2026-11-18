// Pelion's gate (the gate family): a small propylon. Two Doric marble columns before the door's piers, a painted
// entablature (cornice, blue triglyphs between plain metopes, a red taenia, the architrave) under a low pediment whose
// tympanum is painted blue with a bronze rosette and bronze palmettes at its corners, the whole on a stepped
// stylobate; the leaves bronze doors with studded panels, a cross rail and ring pulls at their meeting edge (the app
// slides them apart behind the columns); beyond, the mountain path at dusk: the sky from night violet down to the
// sunset's glow, the far ridges, the green slope with the sand path climbing it and an olive tree beside it.
// Run from the Administratum root: node <this file>. Writes ui/art/pelion/gate.png + .json.
//
// The opening is the default's (x 16-47, rows 10-53, the leaves 16 x 44 at x 16 and 32): the entablature is drawn over
// the leaves' top (rows 10-18 of the frame) and the threshold over their foot, so the doorway shows from row 19 to 51.
// Slots: marble X (lit) s 7 4 9 6, painted u (blue) x (red); bronze h g G U; dusk @ $ % with the glow N f, the ridges
// S V, the slope M v Y, the path P B Q, the olive w W M Y; a star O.
const { writeSheet } = await import(process.cwd() + '/tools/sheet_writer.mjs');

const grid = (w, h) => Array.from({ length: h }, () => Array(w).fill('.'));
const fill = (g, x, y, w, h, c) => { for (let j = y; j < y + h; j++) for (let i = x; i < x + w; i++) if (g[j]?.[i] !== undefined) g[j][i] = c; };
const dot = (g, x, y, c) => { if (g[y]?.[x] !== undefined) g[y][x] = c; };
const put = (g, x, y, rows) => rows.forEach((r, j) => [...r].forEach((c, i) => { if (c !== '.') dot(g, x + i, y + j, c); }));
const out = g => g.map(r => r.join(''));
const mirrorX = rows => rows.map(r => [...r].reverse().join(''));

const frames = {};

{ // GATE, 64 x 60
  const g = grid(64, 60);
  // the pediment, rows 0-7: raking cornices (lit on the left slope), the blue tympanum
  for (let r = 0; r <= 7; r++) {
    const d = Math.round((r * 29) / 7), xl = 31 - d, xr = 32 + d;
    fill(g, xl, r, xr - xl + 1, 1, 'u');
    dot(g, xl, r, 'k'); dot(g, xr, r, 'k');
    if (r > 0) { dot(g, xl + 1, r, 'X'); dot(g, xl + 2, r, 'X'); dot(g, xl + 3, r, 's'); dot(g, xr - 1, r, '7'); dot(g, xr - 2, r, 's'); dot(g, xr - 3, r, 's'); }
    if (r > 1) { dot(g, xl + 4, r, 'k'); dot(g, xr - 4, r, 'k'); }
  }
  fill(g, 30, 0, 4, 1, 'k'); fill(g, 31, 1, 2, 1, 'X');
  put(g, 29, 3, ['.kkkk.', 'khghGk', 'kghhgk', '.kGGk.']); // the bronze rosette
  // bronze palmettes (acroteria) on the corners
  put(g, 0, 3, ['.kk.', 'khgk', 'kgGk', '.kk.']); put(g, 60, 3, ['.kk.', 'khgk', 'kgGk', '.kk.']);
  // the cornice, rows 8-10
  fill(g, 0, 8, 64, 1, 'k'); fill(g, 1, 9, 62, 1, 'X'); fill(g, 1, 10, 62, 1, 's');
  for (let x = 3; x < 62; x += 4) dot(g, x, 10, '9'); // the mutules' shadows
  dot(g, 0, 9, 'k'); dot(g, 0, 10, 'k'); dot(g, 63, 9, 'k'); dot(g, 63, 10, 'k');
  // the frieze, rows 11-14: blue triglyphs (two grooves) between plain metopes
  fill(g, 1, 11, 62, 1, 'k'); fill(g, 1, 12, 62, 3, 's');
  for (const x of [2, 13, 25, 36, 47, 58]) { put(g, x, 12, ['uku', 'uku', 'uku']); }
  for (const x of [6, 18, 30, 41, 52]) { put(g, x, 13, ['.x.']); } // a red disc painted on each metope
  for (let y = 11; y < 15; y++) { dot(g, 0, y, 'k'); dot(g, 63, y, 'k'); }
  // the red taenia, the guttae under each triglyph, the architrave, rows 15-18
  fill(g, 0, 15, 64, 1, 'k'); fill(g, 1, 16, 62, 1, 'x'); fill(g, 1, 17, 62, 1, 'X'); fill(g, 1, 18, 62, 1, 's');
  for (const x of [2, 13, 25, 36, 47, 58]) put(g, x, 16, ['uuu']);
  dot(g, 0, 16, 'k'); dot(g, 0, 17, 'k'); dot(g, 0, 18, 'k'); dot(g, 63, 16, 'k'); dot(g, 63, 17, 'k'); dot(g, 63, 18, 'k');
  // the piers either side of the doorway, in the porch's shade (they hide the leaves when they slide open)
  for (const x0 of [0, 48]) {
    fill(g, x0, 19, 16, 33, '4');
    for (let y = 22; y < 52; y += 6) fill(g, x0, y, 16, 1, '9'); // courses
  }
  fill(g, 0, 19, 64, 1, 'k'); // the lintel's shadow line
  for (let y = 19; y < 52; y++) { dot(g, 0, y, 'k'); dot(g, 63, y, 'k'); dot(g, 15, y, 'k'); dot(g, 48, y, 'k'); dot(g, 14, y, '6'); dot(g, 49, y, '7'); }
  // two Doric columns before the piers: abacus, echinus, a fluted shaft lit from the left
  const FL = ['k', 'X', 'X', 's', '7', 's', '7', '4', '9', 'k'];
  for (const cx of [3, 51]) {
    put(g, cx - 2, 19, ['kkkkkkkkkkkkkk', 'kXXXsssss7744k', 'kkkkkkkkkkkkkk']);
    put(g, cx - 1, 22, ['kXXss7s7449k', '.kkkkkkkkkk.']);
    for (let y = 24; y < 52; y++) FL.forEach((c, i) => dot(g, cx + i, y, c));
    for (const y of [32, 42]) for (let i = 1; i < 9; i++) dot(g, cx + i, y, i < 5 ? '7' : '6'); // the drums' joints
  }
  // the threshold over the leaves' foot, the stylobate and two steps, rows 52-59
  fill(g, 0, 52, 64, 1, 'k'); fill(g, 1, 53, 62, 1, 'X'); fill(g, 1, 54, 62, 1, 's');
  fill(g, 0, 55, 64, 1, 'k'); fill(g, 1, 56, 62, 1, 'X'); fill(g, 1, 57, 62, 1, '7');
  fill(g, 0, 58, 64, 1, '9'); fill(g, 0, 59, 64, 1, 'k');
  for (const y of [53, 54, 56, 57]) { dot(g, 0, y, 'k'); dot(g, 63, y, 'k'); }
  for (let x = 6; x < 60; x += 11) { dot(g, x, 54, '4'); dot(g, x + 4, 57, '4'); } // joints of the slabs
  frames.GATE = out(g);
}

{ // GATE_L, 16 x 44: the left bronze leaf (hinge on the left, the meeting edge on the right); rows 0-8 hide under
  // the entablature and 42-43 under the threshold
  const g = grid(16, 44);
  fill(g, 0, 0, 16, 44, 'g');
  for (let y = 0; y < 44; y++) { dot(g, 0, y, 'k'); dot(g, 1, y, 'h'); dot(g, 14, y, 'G'); dot(g, 15, y, 'k'); }
  const panel = (y0, h) => {
    fill(g, 3, y0, 10, h, 'G'); fill(g, 3, y0, 10, 1, 'U'); fill(g, 3, y0, 1, h, 'U'); fill(g, 4, y0 + h - 1, 9, 1, 'h'); fill(g, 12, y0 + 1, 1, h - 1, 'h');
    fill(g, 5, y0 + 2, 6, h - 4, 'g'); fill(g, 5, y0 + 2, 6, 1, 'h'); // the raised field
    for (const [x, y] of [[5, y0 + 2], [10, y0 + 2], [5, y0 + h - 3], [10, y0 + h - 3]]) dot(g, x, y, 'k'); // its studs
  };
  panel(11, 13); panel(29, 11);
  fill(g, 1, 25, 14, 3, 'G'); fill(g, 1, 25, 14, 1, 'h'); fill(g, 1, 27, 14, 1, 'U'); // the cross rail
  for (let x = 2; x < 14; x += 3) dot(g, x, 26, 'h');
  put(g, 10, 23, ['.kkk', 'kh.h', 'kh.h', '.hhk']); // the ring pull at the meeting edge
  for (let y = 3; y < 42; y += 3) { dot(g, 2, y, 'h'); dot(g, 13, y, 'U'); } // the stiles' nails
  fill(g, 1, 9, 14, 1, 'U'); fill(g, 1, 41, 14, 1, 'U');
  frames.GATE_L = out(g);
  frames.GATE_R = mirrorX(frames.GATE_L).map(r => r.replaceAll('h', '§').replaceAll('G', 'h').replaceAll('§', 'G'));
}

{ // GATE_VOID, 32 x 44: the mountain path at dusk (rows 0-8 hide under the entablature)
  const g = grid(32, 44);
  fill(g, 0, 0, 32, 11, '@');
  for (let x = 0; x < 32; x += 2) dot(g, x, 10, '$'); // the sky's bands, each met by one dithered row
  fill(g, 0, 11, 32, 4, '$');
  for (let x = 1; x < 32; x += 2) dot(g, x, 14, '%');
  fill(g, 0, 15, 32, 3, '%'); for (let x = 0; x < 32; x += 2) dot(g, x, 17, 'N');
  fill(g, 0, 18, 32, 1, 'N'); fill(g, 0, 19, 32, 2, 'f'); fill(g, 0, 21, 32, 2, 'N');
  dot(g, 6, 10, 'O'); dot(g, 22, 12, 'O'); dot(g, 27, 9, 'O'); // the first stars
  // the far ridges, dark against the glow
  const ridge = [21, 20, 20, 19, 19, 18, 19, 20, 21, 21, 20, 19, 18, 18, 17, 18, 19, 20, 21, 22, 22, 21, 20, 20, 21, 22, 22, 22, 21, 21, 22, 22];
  ridge.forEach((top, x) => fill(g, x, top, 1, 26 - top, 'A'));
  // the near slope, green, rising to the right
  for (let x = 0; x < 32; x++) { const top = 26 - Math.round(x / 6); fill(g, x, top, 1, 44 - top, 'M'); dot(g, x, top, 'v'); }
  for (let y = 27; y < 44; y += 3) for (let x = (y * 7) % 6; x < 32; x += 6) if (g[y][x] === 'M') { dot(g, x, y, 'V'); dot(g, x + 1, y, 'V'); dot(g, x, y - 1, 'v'); } // tufts of scrub
  // the sand path climbing from the doorway to the ridge
  for (let y = 22; y < 44; y++) {
    const k = (y - 22) / 21, cx = Math.round(14 + 4 * Math.sin(k * 3.2) - 2 * k), w = Math.max(1, Math.round(1 + k * 9));
    fill(g, cx - (w >> 1), y, w, 1, 'P'); dot(g, cx - (w >> 1), y, 'B'); if (w > 3) dot(g, cx + (w >> 1), y, 'Q');
  }
  // the olive tree on the right of the path: a twisted trunk, a silver-green crown
  put(g, 20, 14, [
    '...MYMM.M...',
    '.MMYMMYMMM..',
    'MYMMvMMYMYM.',
    'MMVMMYMMMVMM',
    '.VMMMVMMYMM.',
    '..VVkWVMVV..',
    '....kWk.....',
    '....Wwk.....',
    '...kwWk.....',
    '...kWwk.....',
    '..kWwWWk....',
  ]);
  frames.GATE_VOID = out(g);
}

const rows = [['GATE', 'GATE_L', 'GATE_R', 'GATE_VOID']];
console.log(writeSheet('pelion/gate', frames, rows, { app: 'Pelion theme art (adm-themes generators/pelion/gate.mjs)' }));
