// Pelion's sanctum (the sanctum family): Chiron's rock ledge with its fleece (THRONE), his low stone table (LORD_DESK),
// the bronze medallion of the centaur on the wall behind him (COG_MECH), the clay seals on their cords (SEAL).
// Run from the Administratum root: node <this file>. Writes ui/art/pelion/sanctum.png + .json.
const { writeSheet } = await import(process.cwd() + '/tools/sheet_writer.mjs');

const grid = (w, h) => Array.from({ length: h }, () => Array(w).fill('.'));
const rows = g => g.map(r => r.join(''));
const dot = (g, x, y, c) => { if (g[y]?.[x] !== undefined) g[y][x] = c; };
const put = (g, x, y, rs) => rs.forEach((r, j) => [...r].forEach((c, i) => { if (c !== '.') dot(g, x + i, y + j, c); }));
const outline = g => { const o = g.map(r => [...r]); for (let y = 0; y < g.length; y++) for (let x = 0; x < g[0].length; x++) if (g[y][x] === '.' && [[1, 0], [-1, 0], [0, 1], [0, -1]].some(([dx, dy]) => (g[y + dy]?.[x + dx] ?? '.') !== '.' && g[y + dy][x + dx] !== 'k')) o[y][x] = 'k'; return o; };
const lay = (base, part, crease = 'k') => {
  const o = outline(part);
  return base.map((r, y) => r.map((c, x) => (part[y][x] !== '.' ? part[y][x] : o[y][x] === 'k' ? (c === '.' || c === 'k' ? 'k' : crease) : c)));
};
// the face sheet's volumes (ui/art/faces.json): every pixel of a frame lies in one of its rects
const inside = (rects, x, y) => rects.some(([rx, ry, w, h]) => x >= rx && x < rx + w && y >= ry && y < ry + h);
const clip = (g, rects) => g.map((r, y) => r.map((c, x) => (inside(rects, x, y) ? c : '.')));

// THRONE: the rock ledge with its fleece. A lumpy boulder rises behind him (the mouth of his cave), lit from the
// left, cracked, moss in its dip; the low ledge in front, its top under a sheepskin whose locks hang over the edge.
// The app draws Chiron over it (the body 8 px up and left of its top-left): the horse body covers the ledge's top,
// so the boulder shows over his back, the fleece and the ledge's face under him. Every pixel lies in the base face
// sheet's volumes for THRONE (back, arms, crest, front), which cut the frame for the 2.5D view.
function throne() {
  let g = grid(40, 40);
  const part = f => { const p = grid(40, 40); f(p); return p; };
  // the boulder: a lumpy grey rock (two lumps and the dip between), lit on its tops and left slopes, the far side
  // in shade, cracked, moss in the dip
  const top = [14, 12, 11, 10, 10, 9, 9, 8, 8, 9, 9, 7, 5, 4, 3, 3, 2, 2, 3, 3, 4, 6, 9]; // its crown, x 8..30
  const boulder = part(p => { for (let x = 8; x < 31; x++) for (let y = top[x - 8]; y < 30; y++) p[y][x] = '9'; });
  for (let x = 8; x < 31; x++) for (let y = top[x - 8]; y < 30; y++) {
    const t = top[x - 8], rising = x > 8 && top[x - 9] > t;
    boulder[y][x] = y - t < 1 ? '7' : y - t < 3 && (rising || x < 20) ? '4' : x > 26 || (x > 17 && y > 10 + (x - 17) * 1.5) ? '6' : '9';
  }
  put(boulder, 17, 9, ['A', '.A', '.6A', '..6A', '...6A', '....6']); // the crack from the dip
  put(boulder, 11, 13, ['6', 'A6', '.6']); put(boulder, 25, 6, ['6', 'A']); put(boulder, 28, 12, ['A', '6', 'A']);
  put(boulder, 16, 7, ['vMv', 'MvM']); put(boulder, 9, 12, ['vM']); // moss
  g = lay(g, boulder);
  // the ledge: a low slab of the same rock, its face in courses of shade, a crack or two
  const ledge = part(p => { for (let y = 29; y < 40; y++) for (let x = 3; x < 37; x++) p[y][x] = y < 32 ? '4' : y > 37 ? '6' : (x * 5 + y * 3) % 13 === 0 ? '6' : '9'; });
  put(ledge, 8, 35, ['A', '6A']); put(ledge, 21, 34, ['6', 'A6']); put(ledge, 31, 35, ['A', '6']);
  g = lay(g, ledge);
  // the fleece over the ledge: cream wool flecked with shade and sheen, its locks hanging over the edge
  const hang = [34, 35, 36, 35, 34, 35, 36, 36, 35, 34, 35, 36, 35, 34, 34, 35, 36, 35, 34, 35, 36, 36, 35, 34, 35, 36, 35, 34, 35, 36, 35, 34];
  const fleece = part(p => { for (let x = 4; x < 36; x++) for (let y = 27; y <= hang[x - 4]; y++) p[y][x] = (x * 7 + y * 13) % 9 === 0 ? 'B' : (x * 5 + y * 3) % 11 === 0 ? 'X' : y === hang[x - 4] ? 'B' : 'b'; });
  g = lay(g, fleece, 'B');
  return outline(g);
}

// COG_MECH: a bronze medallion hung high on the wall behind him, as shields hung on an architrave (the app does not
// turn it): a polished rim, a laurel wreath in relief round it, and on the dark patinated field the centaur in
// profile, walking, his arm raised as he teaches. Its centre is up and right of his head, so his head covers at most
// the rim's lower left.
function medallion() {
  const g = grid(40, 36), cx = 24, cy = 12;
  for (let y = 0; y < 36; y++) for (let x = 0; x < 40; x++) {
    const dx = x - cx, dy = y - cy, r = Math.hypot(dx, dy), lit = dx + dy < -2, dark = dx + dy > 3;
    if (r <= 8.3) g[y][x] = 'V';
    else if (r <= 9) g[y][x] = 'G';
    else if (r <= 10.4) { const a = Math.atan2(dy, dx), leaf = Math.round((a + Math.PI) * 18 / Math.PI) % 2; g[y][x] = leaf ? (lit ? 'h' : 'g') : dark ? 'U' : 'G'; }
    else if (r <= 11.6) g[y][x] = lit ? 'h' : dark ? 'G' : 'g';
  }
  // the field's patina lighter towards the light
  for (let y = 0; y < 36; y++) for (let x = 0; x < 40; x++) if (g[y][x] === 'V' && x + y < cx + cy - 3 && (x * 3 + y) % 4 === 0) g[y][x] = 'M';
  // the centaur, polished bronze in relief, walking left, his right arm raised before him, the tail streaming
  put(g, 17, 6, [
    '...hh.........',
    '..hhgG........',
    '...hg.........',
    'hhhhggG.......',
    '...hggG.......',
    '...hgGG.......',
    '..hhhhhhhhhh.h',
    '..hgggggggggGg',
    '....gGGGGGgG.G',
    '....g.g..g.G..',
    '...g..g..g..G.',
    '..G...G.G...G.',
  ]);
  return outline(g);
}

// LORD_DESK: his low stone table, a marble slab with a painted edge on two carved supports; on it a lyre (a
// tortoise-shell sound box, two horns and a yoke, its strings), a bronze mortar of herbs with its pestle (where the
// app lights the table), and scrolls, one half open.
function desk() {
  let g = grid(88, 26);
  const part = f => { const p = grid(88, 26); f(p); return p; };
  const table = part(p => {
    for (let y = 6; y < 14; y++) for (let x = (y < 10 ? 3 : 1); x < (y < 10 ? 85 : 87); x++)
      p[y][x] = y === 6 ? 'X' : y < 10 ? ((x * 7 + y * 5) % 23 === 0 ? '7' : 's') : y === 10 ? '7' : y === 11 ? 'u' : y === 12 ? 'x' : '9';
    for (let y = 14; y < 26; y++) for (const x0 of [6, 70]) for (let x = x0; x < x0 + 12; x++) {
      const capital = y < 16, foot = y > 23, w = capital || foot ? 0 : 1;
      if (x < x0 + w || x >= x0 + 12 - w) continue;
      p[y][x] = capital || foot ? (y === 14 || y === 24 ? '7' : '6') : x === x0 + 1 ? '7' : x > x0 + 8 ? '6' : '9';
    }
    for (let x = 18; x < 70; x++) p[14][x] = 'A';
  });
  for (const x0 of [6, 70]) put(table, x0 + 3, 17, ['6666', '6..6', '6..6', '6..6', '6666']); // a sunk panel in each support
  g = lay(g, table);
  g = lay(g, part(p => put(p, 34, 0, [ // the mortar of herbs, its pestle
    '...v.Y..v...',
    '..vMvYvMv.b.',
    '.vMvYvMvMvB.',
    '.khhhhhgggBk',
    '.kgggggggGGk',
    '..kgggggGGk.',
    '...kggGGGk..',
    '....kGGGk...',
    '...kkhgGkk..',
  ])));
  g = lay(g, part(p => { // the scrolls: one rolled, one half open with its lines
    put(p, 50, 6, ['kPppppppppPk', 'kPPPPPPPPPPk']);
    put(p, 57, 4, ['.kPpppppPk', '.kPPPPPPPk']);
    put(p, 66, 5, ['kPpk++++++++kk', 'kPPk+]+]]+]+kPk', 'kPpk++++++++kPk', '.kk.kkkkkkkk.k.']);
  }));
  g = outline(g);
  // the lyre, standing on the table's front, drawn last with its own outline so the wall shows between its
  // strings: the horns curving out, the bronze yoke, the strings, the tortoise-shell sound box
  put(g, 8, 0, [
    '.L........L.',
    'kL........Lk',
    'kLhhhhhhhhLk',
    'kL.X.X.X.XLk',
    'kW.X.X.X.XWk',
    'kWwXwXwXwXWk',
    'WwLwLwXwLwwW',
    'WLwwLwwLwLwW',
    'kWwWwWwWwWWk',
    '.kkkkkkkkkk.',
  ]);
  return g;
}

// SEAL: a clay seal (a bulla, a ring stamped in it round a rosette) on a cord, its two ends hanging.
function seal() {
  const g = grid(12, 20);
  put(g, 1, 0, [
    '..kkkkkk..',
    '.k)))))(k.',
    'k))[[[[((k',
    'k)[(()([(k',
    'k)[()(([(k',
    'k([([[([[k',
    '.k(([[[[k.',
    '..kkkkkk..',
  ]);
  put(g, 2, 8, ['.kLk.k.', '.kLwkLk', '.kLkkLk', '..kwkLk', '..kLkwk', '..kLkLk', '..kwkk.', '..kLk..', '.kLLk..', '.kwwk..', '..kk...', '.......']);
  return g;
}

const THRONE_RECTS = [[2, 28, 36, 12], [8, 8, 24, 20], [2, 22, 6, 6], [32, 22, 6, 6], [10, 0, 20, 8]];
export const FRAMES = { THRONE: rows(clip(throne(), THRONE_RECTS)), LORD_DESK: rows(desk()), COG_MECH: rows(clip(medallion(), [[2, 0, 36, 36]])), SEAL: rows(seal()) };

if (import.meta.url === `file://${process.argv[1]}`) {
  console.log(writeSheet('pelion/sanctum', FRAMES, [['THRONE', 'LORD_DESK', 'COG_MECH', 'SEAL']], { app: 'Pelion theme art (adm-themes generators/pelion/sanctum.mjs)' }));
}
