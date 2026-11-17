// Pelion's wall furniture (the walls family): the windows, the space between two painted marble columns under their
// beam, open onto the sky and the Aegean (an island on the horizon, the sun by day; by night the stars and a crescent
// moon); the scroll racks (olive-wood pigeonholes, the scroll ends showing, amphorae and a krater on top); the woven
// hangings (a red one with a meander and a palmette, a blue one with a wave band and a rosette) and the short banner;
// a small bronze sundial for the pillars; a hanging bronze oil lamp.
// Run from the Administratum root: node <this file>. Writes ui/art/pelion/walls.png + .json.
//
// Slots: marble X (lit) s 7 4 9 6, painted band (; olive wood L w W, the pigeonholes' depth n; bronze h g G U; papyrus p P,
// ink ]; terracotta : N ; with black figure k; cloth x (its shade [ and lit )) and u (its shade V), its patterns p;
// olive leaves M Y; flame f F.
// The window's view is drawn only in slots the app swaps by day and night (theme.json ink.windowDay / windowNight):
// u sky, o the haze over the horizon, v sea, Z the deep sea, g the glitter on the sea, x the island, a the sun (sky by
// night), h the stars and the moon (sky by day).
const { writeSheet } = await import(process.cwd() + '/tools/sheet_writer.mjs');

const grid = (w, h) => Array.from({ length: h }, () => Array(w).fill('.'));
const fill = (g, x, y, w, h, c) => { for (let j = y; j < y + h; j++) for (let i = x; i < x + w; i++) if (g[j]?.[i] !== undefined) g[j][i] = c; };
const dot = (g, x, y, c) => { if (g[y]?.[x] !== undefined) g[y][x] = c; };
const put = (g, x, y, rows) => rows.forEach((r, j) => [...r].forEach((c, i) => { if (c !== '.') dot(g, x + i, y + j, c); }));
const out = g => g.map(r => r.join(''));

// --- windows ----------------------------------------------------------------------------------------------------------
// A Doric column, w wide, from y0 to y1: abacus, echinus, a fluted shaft lit from the left with drum joints.
function column(g, x, y0, y1) {
  put(g, x, y0, ['kkkkkkkkk', 'kXXs4449k', 'kkkkkkkkk', '.kX7s49k.', '.kkkkkkk.']);
  const FL = ['.', 'k', 'X', 's', '7', 's', '4', '9', 'k'];
  for (let y = y0 + 5; y <= y1; y++) FL.forEach((c, i) => { if (c !== '.') dot(g, x + i, y, c); });
  for (let y = y0 + 20; y < y1 - 4; y += 18) for (const i of [2, 3, 4, 5, 6]) dot(g, x + i, y, i < 5 ? '7' : '9');
  for (let y = y0 + 5; y <= y1; y++) { dot(g, x, y, '.'); }
}
// The view between the columns, in the window's day/night slots: sky, haze, the island, sea with the sun's glitter,
// stars and the moon (h) that show only by night, the sun (a) only by day.
function view(g, x0, y0, w, h, { sun, moon, stars, island, horizon }) {
  fill(g, x0, y0, w, h, 'u');
  fill(g, x0, y0 + horizon - 5, w, 3, 'o'); for (let i = x0; i < x0 + w; i += 2) dot(g, i, y0 + horizon - 6, 'o');
  fill(g, x0, y0 + horizon - 2, w, 2, 'o');
  for (const [x, y] of stars) dot(g, x0 + x, y0 + y, 'h');
  const [mx, my] = moon; put(g, x0 + mx, y0 + my, ['.hh', 'h..', 'h..', '.hh']);
  const [sx, sy] = sun; put(g, x0 + sx, y0 + sy, ['.aa.', 'aaaa', 'aaaa', '.aa.']);
  const [ix, iw] = island; // an island's long back on the horizon
  for (let i = 0; i < iw; i++) { const t = Math.sin((i / (iw - 1)) * Math.PI); const ht = Math.round(1 + 3 * t * (i < iw / 2 ? 1 : 0.7)); fill(g, x0 + ix + i, y0 + horizon - ht, 1, ht, 'x'); }
  fill(g, x0, y0 + horizon, w, h - horizon, 'v');
  for (let y = y0 + horizon + 4; y < y0 + h; y += 3) for (let i = x0 + ((y * 5) % 4); i < x0 + w; i += 5 + (y % 3)) { dot(g, i, y, 'Z'); dot(g, i + 1, y, 'Z'); }
  for (let k = 0; k < 6; k++) { const y = y0 + horizon + 1 + 2 * k, n = 3 + k; fill(g, x0 + sx + 2 - Math.floor(n / 2) + (k % 2), y, n - (k % 3 === 2 ? 2 : 0), 1, 'g'); }
}

const frames = {};
{ // WINDOW_TALL, 36 x 84: the beam (architrave, a painted band, its cornice), two columns, the stylobate
  const g = grid(36, 84);
  view(g, 8, 8, 20, 70, { horizon: 40, sun: [10, 12], moon: [3, 6], island: [1, 9],
    stars: [[2, 2], [7, 4], [15, 3], [18, 8], [12, 9], [5, 14], [16, 17], [9, 21], [2, 26], [14, 27], [18, 31], [6, 30]] });
  // an olive sprig reaching in at the top left, in front of the view
  put(g, 8, 8, ['MYM.M...', '.MMYMY..', '..M.MM.Y', '....YM.M', '.....M..']);
  fill(g, 0, 0, 36, 8, 's'); fill(g, 0, 0, 36, 1, 'k'); fill(g, 0, 1, 36, 1, 'X'); fill(g, 0, 2, 36, 1, '4');
  fill(g, 0, 3, 36, 1, 'k'); fill(g, 0, 4, 36, 2, '('); for (let x = 1; x < 36; x += 4) dot(g, x, 4, 'X'); fill(g, 0, 6, 36, 1, '9'); fill(g, 0, 7, 36, 1, 'k');
  g.forEach(r => { r[0] = r[0] === '.' ? '.' : 'k'; });
  column(g, -1, 8, 77); column(g, 28, 8, 77);
  dot(g, 0, 8, 'k');
  fill(g, 0, 78, 36, 1, 'k'); fill(g, 0, 79, 36, 1, 'X'); fill(g, 0, 80, 36, 2, 's'); fill(g, 0, 82, 36, 1, '9'); fill(g, 0, 83, 36, 1, 'k');
  for (let y = 0; y < 84; y++) { if (g[y][0] !== '.') g[y][0] = 'k'; if (g[y][35] !== '.') g[y][35] = 'k'; }
  frames.WINDOW_TALL = out(g);
}
{ // WINDOW, 32 x 34: the same, short
  const g = grid(32, 34);
  view(g, 7, 6, 18, 23, { horizon: 13, sun: [10, 3], moon: [2, 2], island: [1, 7], stars: [[1, 1], [6, 2], [14, 1], [16, 6], [8, 7], [4, 9]] });
  fill(g, 0, 0, 32, 6, 's'); fill(g, 0, 0, 32, 1, 'k'); fill(g, 0, 1, 32, 1, 'X'); fill(g, 0, 2, 32, 2, '('); for (let x = 1; x < 32; x += 4) dot(g, x, 2, 'X');
  fill(g, 0, 4, 32, 1, '9'); fill(g, 0, 5, 32, 1, 'k');
  for (const x of [0, 24]) {
    put(g, x, 6, ['kkkkkkkk', 'kXXs449k', '.kX7s9k.']);
    for (let y = 9; y < 29; y++) put(g, x + 1, y, ['kX7s49']);
    for (let y = 9; y < 29; y++) dot(g, x + 7, y, 'k');
  }
  fill(g, 0, 29, 32, 1, 'k'); fill(g, 0, 30, 32, 1, 'X'); fill(g, 0, 31, 32, 1, 's'); fill(g, 0, 32, 32, 1, '9'); fill(g, 0, 33, 32, 1, 'k');
  for (let y = 0; y < 34; y++) { if (g[y][0] !== '.') g[y][0] = 'k'; if (g[y][31] !== '.') g[y][31] = 'k'; }
  frames.WINDOW = out(g);
}

// --- scroll racks ------------------------------------------------------------------------------------------------------
const AMPHORA = [
  '...kkkk...',
  '..kk:Nkk..',
  '.k.k:Nk.k.',
  '.k.k:Nk.k.',
  '.kk::NNkk.',
  'k:::NNNN;k',
  'kkkkkkkkkk',
  'k:NkNNkN;k',
  'kkkkkkkkkk',
  '.k:NNNN;k.',
  '..k:N;;k..',
  '..kkkkkk..',
];
const KRATER = [
  'kkkkkkkkkkkk',
  'k::::NNNNN;k',
  '.kkkkkkkkkk.',
  'kkkN:kkN;kkk',
  'k.kNkkkkNk.k',
  'kkk:NNNN;kkk',
  '..k;NNN;;k..',
  '...kk;;kk...',
  '....k;;k....',
  '...k:NN;k...',
  '...kkkkkk...',
];
const HYDRIA = ['..kkk..', '..k:k..', '.kk:Nkk', 'k::NN;k', 'k:kkk;k', 'k:NNN;k', '.k:N;k.', '.kkkkk.'];
// rolled scrolls stacked in a pigeonhole, seen end on: a papyrus disc with its dark core, some with a coloured tag
const END = ['ppP', 'p]P', 'PPP'];
function rack(g, fillCell) {
  fill(g, 0, 12, 64, 30, 'k');
  fill(g, 1, 13, 62, 1, 'L'); fill(g, 1, 14, 62, 1, 'w');
  fill(g, 1, 13, 1, 28, 'L'); fill(g, 62, 14, 1, 27, 'W');
  fill(g, 1, 38, 62, 1, 'L'); fill(g, 2, 39, 60, 1, 'w'); fill(g, 2, 40, 60, 1, 'W');
  // the two shelves of pigeonholes: six cells each, olive-wood dividers lit on the left
  for (const [cy, ch] of [[16, 10], [28, 10]]) {
    fill(g, 2, cy - 1, 60, 1, 'k');
    for (let c = 0; c < 6; c++) {
      const cx = 3 + c * 10;
      fill(g, cx, cy, 8, ch, 'n'); fill(g, cx, cy, 8, 1, 'k');
      fill(g, cx - 1, cy - 1, 1, ch + 1, 'k'); fill(g, cx + 8, cy - 1, 1, ch + 1, 'W'); fill(g, cx + 9, cy - 1, 1, ch + 1, 'L');
      fillCell(g, cx, cy, ch, c + (cy > 20 ? 6 : 0));
    }
    fill(g, 2, cy + ch, 60, 1, 'L'); fill(g, 2, cy + ch + 1, 60, 1, 'w');
  }
}
const pyramid = (g, cx, cy, ch, tags, n = 3) => {
  const spots = n === 3 ? [[0, 6], [3, 6], [1, 3], [5, 3], [3, 0]] : [[1, 6], [4, 6], [2, 3]];
  spots.forEach(([dx, dy], i) => { if (i < (n === 3 ? 5 : 3)) put(g, cx + dx, cy + ch - 9 + dy, END); if (tags[i]) dot(g, cx + dx + 1, cy + ch - 9 + dy + 3, tags[i]); });
};
{ // SHELF: scrolls in every hole, two amphorae and a jug on top
  const g = grid(64, 42);
  rack(g, (g, cx, cy, ch, i) => {
    if (i === 4) { put(g, cx, cy + 2, ['kkkkkkkk', 'pppppppP', 'P]P]P]PP', 'kkkkkkkk', 'pppppppP', 'PPPPPPPP']); return; } // scrolls laid flat
    if (i === 9) { put(g, cx + 1, cy + 3, ['kkkkk.', 'kLLLwk', 'kwccwk'.replace(/c/g, 'w'), 'kWWWWk', 'kkkkkk']); put(g, cx + 1, cy + 8, ['pP']); return; } // a box of tablets
    pyramid(g, cx, cy, ch, [i % 3 === 0 && 'x', i % 4 === 1 && 'u', i % 5 === 2 && 'x', 0, i % 2 && 'u'], i % 3 === 2 ? 2 : 3);
  });
  put(g, 6, 0, AMPHORA); put(g, 18, 4, HYDRIA); put(g, 46, 0, AMPHORA);
  frames.SHELF = out(g);
}
{ // SHELF_B: the same rack, scrolls tied in bundles, a krater and a hydria on top
  const g = grid(64, 42);
  rack(g, (g, cx, cy, ch, i) => {
    if (i === 1 || i === 8) { put(g, cx, cy + ch - 7, ['ppP.....', 'p]Pk....', 'PPPppP..', 'ppPp]P..', 'p]PPPPpP', 'PPPxxxp]', '...xx.PP']); return; }
    if (i === 6) { put(g, cx + 1, cy + ch - 9, HYDRIA.map(r => r.slice(0, 7))); return; }
    pyramid(g, cx, cy, ch, [i % 2 && 'x', 0, i % 3 === 0 && 'u', i % 4 === 3 && 'x', 0], i % 4 === 2 ? 2 : 3);
  });
  put(g, 4, 1, KRATER); put(g, 40, 4, HYDRIA); put(g, 50, 0, AMPHORA);
  frames.SHELF_B = out(g);
}

// --- hangings ---------------------------------------------------------------------------------------------------------
// a meander (Greek key) band, 5 rows, period 6; a wave band (running scroll), 4 rows, period 6
const MEANDER = ['#####.', '#...#.', '#.###.', '#.#...', '#.####'];
const WAVE = ['..##..', '.#..#.', '#..##.', '#####.'].map(r => r);
const WAVE2 = ['...##.', '..#..#', '##..#.', '######'];
function band(g, x0, y0, w, pat, on, off) {
  pat.forEach((r, j) => { for (let i = 0; i < w; i++) dot(g, x0 + i, y0 + j, r[i % r.length] === '#' ? on : off); });
}
// a cloth hung from a bronze rod: field F (shade S, lit Lt), x0..x1 wide, rod at the top, fringe at the bottom
function cloth(g, w, h, F, S, Lt) {
  // the rod with its finials and the cloth's loops
  put(g, 0, 0, ['.k' + 'k'.repeat(w - 4) + 'k.', 'kh' + 'h'.repeat(w - 4) + 'gk', 'kG' + 'G'.repeat(w - 4) + 'Uk', '.k' + 'k'.repeat(w - 4) + 'k.']);
  for (let x = 3; x < w - 3; x += 4) put(g, x, 3, ['kGk']);
  fill(g, 2, 4, w - 4, h - 9, F);
  for (let y = 4; y < h - 5; y++) { dot(g, 1, y, 'k'); dot(g, w - 2, y, 'k'); dot(g, 2, y, Lt); dot(g, w - 3, y, S); }
  fill(g, 2, 4, w - 4, 1, 'k');
  // the fringe
  for (let x = 2; x < w - 2; x++) { dot(g, x, h - 5, 'k'); if (x % 2 === 0) { fill(g, x, h - 4, 1, 3, x % 4 ? F : S); dot(g, x, h - 1, 'k'); } }
}
// an anthemion (palmette) in papyrus white on the field, centred on (cx, cy)
const PALMETTE = [
  '...p.p.p...',
  '.p.p.p.p.p.',
  '..p.ppp.p..',
  'p..ppppp..p',
  '.pp.ppp.pp.',
  '...p)p)p...',
  '..pp.p.pp..',
  '.p..p.p..p.',
  '.p.pp.pp.p.',
  '..pp...pp..',
  '....ppp....',
];
const ROSETTE = [
  '....p.p....',
  '..p..p..p..',
  '...p.p.p...',
  'p...ppp...p',
  '.pp.pxp.pp.',
  '...ppxpp...',
  '.pp.pxp.pp.',
  'p...ppp...p',
  '...p.p.p...',
  '..p..p..p..',
  '....p.p....',
];
{ // HANGING, 26 x 100: brick red, a meander band at the top and the foot, a wave band, a palmette in the middle
  const g = grid(26, 100);
  cloth(g, 26, 100, 'x', '[', ')');
  band(g, 3, 7, 20, MEANDER, 'p', 'u'); fill(g, 3, 6, 20, 1, 'p'); fill(g, 3, 12, 20, 1, 'p');
  band(g, 3, 82, 20, MEANDER, 'p', 'u'); fill(g, 3, 81, 20, 1, 'p'); fill(g, 3, 87, 20, 1, 'p');
  band(g, 3, 74, 20, WAVE, 'p', 'x'); fill(g, 3, 78, 20, 1, 'u');
  put(g, 7, 36, PALMETTE);
  for (const y of [20, 58]) for (let x = 5; x < 22; x += 4) put(g, x, y, ['.p.', 'p)p', '.p.']); // rows of small rosettes
  frames.HANGING = out(g);
}
{ // HANGING_B, 26 x 100: Aegean blue, red wave bands, a rosette, a meander at the foot
  const g = grid(26, 100);
  cloth(g, 26, 100, 'u', 'V', 'u');
  for (let y = 4; y < 95; y++) dot(g, 2, y, 'p');
  band(g, 3, 8, 20, WAVE2, 'x', 'p'); fill(g, 3, 7, 20, 1, 'x'); fill(g, 3, 12, 20, 1, 'x');
  band(g, 3, 70, 20, WAVE2, 'x', 'p'); fill(g, 3, 69, 20, 1, 'x'); fill(g, 3, 74, 20, 1, 'x');
  band(g, 3, 82, 20, MEANDER, 'p', 'x'); fill(g, 3, 81, 20, 1, 'p'); fill(g, 3, 87, 20, 1, 'p');
  put(g, 7, 34, ROSETTE);
  for (const y of [22, 54]) for (let x = 5; x < 22; x += 4) put(g, x, y, ['.x.', 'xpx', '.x.']);
  frames.HANGING_B = out(g);
}
{ // BANNER, 24 x 30: the short hanging, red, a meander band and a wave band, a small rosette
  const g = grid(24, 30);
  cloth(g, 24, 30, 'x', '[', ')');
  band(g, 3, 6, 18, MEANDER, 'p', 'u'); fill(g, 3, 5, 18, 1, 'p'); fill(g, 3, 11, 18, 1, 'p');
  put(g, 9, 13, ['.p.p.', 'p.p.p', '.ppp.', 'p.p.p', '.p.p.'].map(r => r.replace(/^(..)p/, '$1)')));
  band(g, 3, 19, 18, WAVE, 'p', 'x'); fill(g, 3, 23, 18, 1, 'u');
  frames.BANNER = out(g);
}

// --- the small bronze sundial for the pillars, 12 x 12: a vertical hemicycle plate, hour lines, its gnomon ----------
{
  const g = grid(12, 12);
  for (let y = 0; y < 12; y++) for (let x = 0; x < 12; x++) {
    const d = Math.hypot(x - 5.5, y - 5.5);
    if (d <= 5.9) g[y][x] = d > 4.9 ? 'k' : d > 4 ? (x + y < 10 ? 'h' : 'G') : 'g';
  }
  // the hour lines across the lower half, the gnomon standing out from the centre and its shadow
  for (const a of [20, 55, 90, 125, 160]) for (let r = 2; r <= 4; r++) dot(g, Math.round(5.5 + r * Math.cos((a * Math.PI) / 180)), Math.round(5.5 + r * Math.sin((a * Math.PI) / 180)), 'U');
  put(g, 4, 3, ['.h.', 'khk', '.k.']);
  dot(g, 7, 7, 'U'); dot(g, 8, 8, 'U');
  frames.GAUGE = out(g);
}

// --- the hanging oil lamp, 10 x 20: a chain, a ring spreading three chains, a bronze lamp with its nozzle and flame ---------------
frames.CENSER = [
  '....kk....',
  '....hG....',
  '....kk....',
  '....Gk....',
  '....kk....',
  '....hG....',
  '....kk....',
  '...k..k...',
  '..G....G..',
  '.k......kF',
  'G.......fF',
  'k.......fF',
  'kkkkkkkk.f',
  'khhhggggkk',
  'khgggggGGk',
  'kkgggGGGkk',
  '.kGGGUUUk.',
  '..kkkkkk..',
  '..........',
  '..........',
];

const layout = [['WINDOW', 'BANNER', 'SHELF', 'GAUGE', 'CENSER', 'WINDOW_TALL', 'HANGING', 'HANGING_B', 'SHELF_B']];
console.log(writeSheet('pelion/walls', frames, layout, { app: 'adm-themes generators/pelion/walls.mjs' }));
if (process.argv.includes('--print')) for (const [n, f] of Object.entries(frames)) console.log(n + '\n' + f.join('\n'));
