// Pelion's tables (the workstations family): the student's marble table (a slab on two painted pedestals, a wax diptych
// standing open at the back, a bronze stylus, a pebble abacus, a clay oil lamp), the compact table (the app's lectern:
// the same table made narrow, a smaller diptych, no abacus), the helper's small marble table (one pedestal like the
// students', a little wax tablet on a prop), and the shell's turn: a bronze armillary ring spinning on its pin, sixteen
// steps.
// Run from the Administratum root: node <this file>. Writes ui/art/pelion/workstations.png + .json.
//
// Slots: marble X (lit arris) s (face) 7 (veins) 4 9 6 (the grey-blue shades); olive wood L w W; bronze h g G U;
// wax Z (its shade C), its writing c (amber while the student works, the app dims c to screenOff when the table is unlit); papyrus
// p P, ink ]; terracotta : N ; (the clay lamp); flame f F (the app drops them when unlit); pebbles + S N; paint u x.
const { writeSheet } = await import(process.cwd() + '/tools/sheet_writer.mjs');

const grid = (w, h) => Array.from({ length: h }, () => Array(w).fill('.'));
const fill = (g, x, y, w, h, c) => { for (let j = y; j < y + h; j++) for (let i = x; i < x + w; i++) if (g[j]?.[i] !== undefined) g[j][i] = c; };
const dot = (g, x, y, c) => { if (g[y]?.[x] !== undefined) g[y][x] = c; };
// a stamp: rows of chars, '.' leaves what is under it
const put = (g, x, y, rows) => rows.forEach((r, j) => [...r].forEach((c, i) => { if (c !== '.') dot(g, x + i, y + j, c); }));
const out = g => g.map(r => r.join(''));

// The clay oil lamp, side view: a round body with its filling hole, the ring handle at the left, the nozzle at the
// right with its flame (f F, dropped by the app while the table is unlit). 12 x 11, flame centre at (10, 2).
const LAMP = [
  '..........F.',
  '.........fFf',
  '.........fFf',
  '..........f.',
  '...kkkkk..k.',
  '..k:::::kk:k',
  'kkk::kk:::Nk',
  'k.kN:::NNN;k',
  'kkkNNNNNN;k.',
  '..k;;;;;;k..',
  '...kkkkkk...',
];
const LAMP_L = LAMP.map(r => [...r].reverse().join('')); // the same lamp turned, its nozzle and flame at the left
// a wax leaf of the diptych: olive-wood frame (lit top and left, shade bottom and right), brown wax (Z) shaded under
// the frame's top (C), the writing in c
function leaf(g, x, y, w, h, lines) {
  fill(g, x, y, w, h, 'k');
  fill(g, x + 1, y + 1, w - 2, h - 2, 'L');
  fill(g, x + 2, y + h - 2, w - 3, 1, 'W'); fill(g, x + w - 2, y + 2, 1, h - 3, 'W');
  fill(g, x + 2, y + 2, w - 4, h - 4, 'Z'); fill(g, x + 2, y + 2, w - 4, 1, 'C');
  lines.forEach(([dy, s]) => [...s].forEach((c, i) => { if (c !== '.') dot(g, x + 2 + i, y + 2 + dy, c); }));
}

const frames = {};

// --- the student's table, 64 x 42 --------------------------------------------------------------------------------------
{
  const g = grid(64, 42);
  // the slab: its far edge, the top (marble with faint veins), the lit front arris, the front face, its underside line
  fill(g, 0, 18, 64, 1, 'k');
  fill(g, 0, 19, 64, 7, 's');
  for (const [x, y, n] of [[4, 19, 5], [9, 20, 3], [12, 21, 2], [30, 23, 4], [34, 24, 3], [44, 19, 3], [47, 20, 4]]) fill(g, x, y, n, 1, '7');
  fill(g, 0, 26, 64, 1, 'X');
  fill(g, 0, 27, 64, 1, '7'); fill(g, 0, 28, 64, 1, '4'); fill(g, 0, 29, 64, 1, '9');
  for (let x = 2; x < 62; x += 6) { dot(g, x, 28, 'u'); dot(g, x + 3, 28, 'x'); } // a painted bead band on the edge
  fill(g, 0, 30, 64, 1, 'k');
  for (let y = 18; y < 30; y++) { g[y][0] = 'k'; g[y][63] = 'k'; }
  for (let y = 19; y < 26; y++) { g[y][1] = 'X'; g[y][62] = '9'; }
  g[27][62] = '9'; g[28][62] = '6'; g[29][62] = '6';
  // under the slab: the back stretcher in its shadow
  fill(g, 10, 31, 44, 1, '6'); fill(g, 10, 32, 44, 1, '9'); fill(g, 10, 33, 44, 1, 'k');
  // two marble pedestals (trapezophora): a capital in the slab's shadow, a painted blue band, the shaft, the moulded foot
  const PED = [
    'k6666666k',
    'kXs7777 9k'.replace(' ', ''),
    'kuuuuuuuk',
    '.kXs449k.',
    '.kXs449k.',
    '.kXs449k.',
    '.kXs469k.',
    'kkXs449kk',
    'kXXs4499k',
    'kX7ss449k',
    'kkkkkkkkk',
  ];
  put(g, 2, 31, PED); put(g, 53, 31, PED);
  // the wax diptych, standing open at the back of the slab: two leaves on a cord hinge, its shadow on the marble
  leaf(g, 13, 7, 11, 13, [[1, 'ccc.cc.'], [3, 'cc.ccc.'], [5, 'c.cccc.'], [7, 'ccc.c..']]);
  leaf(g, 25, 7, 11, 13, [[1, 'cc.ccc.'], [3, 'cccc.c.'], [5, 'cc.....'], [7, '.......']]);
  fill(g, 24, 8, 1, 11, 'W'); dot(g, 24, 10, 'x'); dot(g, 24, 16, 'x'); dot(g, 24, 7, 'k'); dot(g, 24, 19, 'k');
  fill(g, 14, 20, 23, 1, '9');
  // the bronze stylus lying before it, point to the left, flat end to the right, and its shadow
  put(g, 8, 21, ['.........XhG', '.....XhhgG9.', '.kXhgG99....', '..99........']);
  // the pebble abacus: an olive-wood board, three grooves, pebbles in white, slate and terracotta
  put(g, 38, 19, [
    '.kkkkkkkkkkkkk.',
    'kLLLLLLLLLLLLLk',
    'kL++W+WWWSSWSwk',
    'kLWNNWWW++WNNwk',
    'kLSSW++WWWWS+wk',
    'kwwwwwwwwwwwwwk',
    '.kkkkkkkkkkkkk9',
  ]);
  // the clay lamp at the back right, nozzle to the left, its shadow on the slab
  put(g, 48, 7, LAMP_L);
  fill(g, 50, 19, 7, 1, '9');
  frames.DESK = out(g);
}

// --- the compact table (the app's lectern, where the hall is crowded), 44 x 42 ----------------------------------------
// The student's table made narrow: the same marble slab with its painted bead band on two pedestals, a smaller wax
// diptych open at the back, the stylus, the clay lamp at the right; no room for the abacus. Its diptych and lamp sit
// in the default lectern's face rects (ui/art/faces.json: the slate 0..23 x 0..17, the lamp in candle, candle 2, dish,
// flame), as the student's table's do in the desk's, so the flat frame composes back whole.
{
  const g = grid(44, 42);
  fill(g, 0, 18, 44, 1, 'k');
  fill(g, 0, 19, 44, 7, 's');
  for (const [x, y, n] of [[3, 19, 4], [7, 20, 3], [24, 23, 4], [28, 24, 2], [36, 20, 3]]) fill(g, x, y, n, 1, '7');
  fill(g, 0, 26, 44, 1, 'X');
  fill(g, 0, 27, 44, 1, '7'); fill(g, 0, 28, 44, 1, '4'); fill(g, 0, 29, 44, 1, '9');
  for (let x = 2; x < 42; x += 6) { dot(g, x, 28, 'u'); dot(g, x + 3, 28, 'x'); }
  fill(g, 0, 30, 44, 1, 'k');
  for (let y = 18; y < 30; y++) { g[y][0] = 'k'; g[y][43] = 'k'; }
  for (let y = 19; y < 26; y++) { g[y][1] = 'X'; g[y][42] = '9'; }
  g[27][42] = '9'; g[28][42] = '6'; g[29][42] = '6';
  fill(g, 10, 31, 24, 1, '6'); fill(g, 10, 32, 24, 1, '9'); fill(g, 10, 33, 24, 1, 'k');
  const PED = [
    'k6666666k',
    'kXs77779k',
    'kuuuuuuuk',
    '.kXs449k.',
    '.kXs449k.',
    '.kXs449k.',
    '.kXs469k.',
    'kkXs449kk',
    'kXXs4499k',
    'kX7ss449k',
    'kkkkkkkkk',
  ];
  put(g, 2, 31, PED); put(g, 33, 31, PED);
  leaf(g, 2, 7, 10, 13, [[1, 'cc.ccc'], [3, 'ccc.cc'], [5, 'c.ccc.'], [7, 'cc.c..']]);
  leaf(g, 13, 7, 10, 13, [[1, 'ccc.cc'], [3, 'cc.c..'], [5, 'ccc...'], [7, '......']]);
  fill(g, 12, 8, 1, 11, 'W'); dot(g, 12, 10, 'x'); dot(g, 12, 16, 'x'); dot(g, 12, 7, 'k'); dot(g, 12, 19, 'k');
  fill(g, 3, 20, 21, 1, '9');
  put(g, 26, 21, ['.........XhG', '.....XhhgG9.', '.kXhgG99....', '..99........']);
  put(g, 32, 7, LAMP_L);
  fill(g, 34, 19, 7, 1, '9');
  frames.LECTERN = out(g);
}

// --- the helper's small table, 28 x 20 ----------------------------------------------------------------------------------
{
  const g = grid(28, 20);
  // a little wax tablet propped on the table
  leaf(g, 7, 0, 14, 10, [[1, 'cc.ccc.c..'], [3, 'ccc.cc....'], [5, 'c.cc......']]);
  put(g, 20, 4, ['k.', 'Wk', 'Wk', 'Wk', 'Wk', 'Wk']); // its prop
  // a small marble top with the painted bead band of the students' tables, on one pedestal of theirs (capital, blue band,
  // shaft, moulded foot): the school's white marble, not wood
  put(g, 3, 9, [
    'kkkkkkkkkkkkkkkkkkkkkk',
    'kXsss7ssssssss7sssss9k',
    'k4u44x44u44x44u44x449k',
    'kkkkkkkkkkkkkkkkkkkkkk',
  ]);
  put(g, 9, 13, [
    'k6666666k',
    'kuuuuuuuk',
    '.kXs449k.',
    '.kXs469k.',
    'kkXs449kk',
    'kXXs4499k',
    'kkkkkkkkk',
  ]);
  // a stylus on the top
  put(g, 3, 8, ['.XhG', 'kG..']);
  frames.CONSOLE = out(g);
}

// --- the shell's turn: a bronze armillary ring spinning on its pin, 16 steps of one turn, 12 x 12 ---------------------
// The ring is tilted (an ecliptic hoop), turned about the upright pin; its near half lit bronze, its far half dark, a
// bright stud on it marks the turn. A small bronze globe at the centre, the pin and its foot fixed.
for (let k = 0; k < 16; k++) {
  const g = grid(12, 12);
  const th = (k / 16) * 2 * Math.PI, tilt = 0.55, view = 0.35, R = 4.6, cx = 5.5, cy = 5;
  const pts = [];
  for (let i = 0; i < 360; i++) {
    const f = (i / 360) * 2 * Math.PI;
    let x = R * Math.cos(f), y = R * Math.sin(f) * Math.sin(tilt), z = R * Math.sin(f) * Math.cos(tilt);
    [x, z] = [x * Math.cos(th) + z * Math.sin(th), -x * Math.sin(th) + z * Math.cos(th)];
    const sy = cy - y * Math.cos(view) + z * Math.sin(view);
    pts.push({ x: Math.round(cx + x), y: Math.round(sy), z, f });
  }
  // the pin through the poles and its foot (fixed)
  for (let y = 0; y < 11; y++) dot(g, 5, y, y < 1 ? 'k' : 'G');
  put(g, 3, 10, ['kGgGk', 'kkkkk']);
  // the far half of the ring first, the globe, then the near half over it
  for (const p of pts) if (p.z < 0) dot(g, p.x, p.y, 'U');
  put(g, 5, 4, ['kh', 'gG']); dot(g, 4, 4, 'k'); dot(g, 4, 5, 'k'); dot(g, 6, 4, 'k'); dot(g, 6, 5, 'k');
  for (const p of pts) if (p.z >= 0) dot(g, p.x, p.y, p.z > R * 0.5 ? 'h' : 'g');
  // the stud at the ring's start: bright on the near side, a dark bead behind
  const s = pts[0];
  dot(g, s.x, s.y, s.z >= 0 ? 'F' : 'G');
  frames[`SHELL_COG_${k}`] = out(g);
}

const layout = [['DESK', 'LECTERN', 'CONSOLE', ...Array.from({ length: 16 }, (_, k) => `SHELL_COG_${k}`)]];
const anchors = {
  DESK: { screen: [15, 9, 19, 9], lamp: [16, 0], seals: [[3, 24], [11, 25], [54, 24]], candle: [49, 9], slate: [24, 13],
    shadow: [2, 42, 60, 4], paper: [2, 21], pile: [32, 24], cog: [7, 11], puff: [32, 22] },
  LECTERN: { screen: [4, 9, 17, 9], lamp: [5, 0], seals: [[3, 24], [20, 25], [38, 24]], candle: [33, 9], slate: [12, 13],
    shadow: [2, 42, 40, 4], paper: [2, 21], pile: [22, 24], cog: [3, 11], puff: [22, 22] },
  CONSOLE: { screen: [9, 2, 10, 6], lamp: [23, 2], seals: [[30, 7]], shadow: [8, 20, 12, 2], paper: [30, 16], pile: [14, 12], light: [14, 5] },
};
console.log(writeSheet('pelion/workstations', frames, layout, { app: 'adm-themes generators/pelion/workstations.mjs', anchors }));
if (process.argv.includes('--print')) for (const [n, f] of Object.entries(frames)) console.log(n + '\n' + f.join('\n'));
