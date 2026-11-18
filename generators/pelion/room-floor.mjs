// Pelion's floor (the room-floor family): a pebble mosaic of bluish white pebbles, 3 x 3, lit along the top and shaded
// along the bottom, quiet so the students read on it; its two variants (in place of the vents and bolts) the same
// pebbles with one course shifted; the channels a meander band (a Greek key, dark on white pebbles); the bays' sills a
// marble threshold; the passage through the east wall a marble threshold; the sanctum's floor a rosette mosaic: corner
// rosettes, a meander border, a blue field of small rosettes.
// Run from the Administratum root: node <this file>. Writes ui/art/pelion/room-floor.png + .json.
//
// Slots: pebbles 1 (bluish white) 3 (its lit top) 8 (its shaded foot, the marble's), the gaps 2; the meander ! (dark) +
// (white pebbles); marble 4 7 9 6 (the wall's); the sanctum's rosettes x (red) + ! 3 1, its field and corner squares u
// (Aegean blue).
const { writeSheet } = await import(process.cwd() + '/tools/sheet_writer.mjs');

// A pebble map (one letter a pebble, '.' a gap) to slots: each pebble 1, its top row lit (3), its bottom row in shade
// (8), the light from above; neighbours read on the torus.
function pebbles(map) {
  const H = map.length;
  return map.map((r, y) => [...r].map((c, x) => {
    if (c === '.') return '2';
    if (map[(y + 1) % H][x] !== c) return '8';
    return map[(y + H - 1) % H][x] !== c ? '3' : '1';
  }).join(''));
}
// Pebbles of 3 x 3, in courses set over by half; the two variants (laid over about one cell in five) shift one course
// by a pebble's width so the bond does not run on.
const FLOOR = [
  'AAA.BBB.',
  'AAA.BBB.',
  'AAA.BBB.',
  '........',
  'D.EEE.DD',
  'D.EEE.DD',
  'D.EEE.DD',
  '........',
];
const frames = {};
frames.floor = pebbles(FLOOR);
frames['floor vent'] = pebbles(FLOOR.map((r, y) => y < 3 ? '.AAA.BBB' : r));
frames['floor bolts'] = pebbles(FLOOR.map((r, y) => y > 3 && y < 7 ? 'DD.EEE.D' : r));
// the meander: a line that climbs, runs along the top, drops, runs along the bottom, a tooth hanging into each turn
const KEY = ['!!!!!+++', '!+!+!+!+', '!+!+!+!+', '!+++!!!!'];
frames['channel h'] = KEY;
frames['channel v'] = Array.from({ length: 8 }, (_, y) => KEY.map(r => r[y]).join(''));
// the passage through the east wall: marble threshold slabs
frames['sanctum passage'] = ['7777', '4444', '4494', '6666'];
// the bays' sill: a marble threshold across the floor, its lit edge, its joints, its shadow
frames.sill = ['7'.repeat(24), '4'.repeat(11) + '6' + '7' + '4'.repeat(11), '9'.repeat(4) + '4'.repeat(7) + '6' + '7' + '4'.repeat(11), '6'.repeat(24)];

// The sanctum's floor (nine-slice, edge 14): a rosette in each corner square, a meander band along each side between
// a dark and a white rule, the field an Aegean blue ground with a small rosette in every 12 x 12 cell; the corner
// squares the same blue inside their dark frame.
{
  const FIELD = 'u';
  const W = 40, g = Array.from({ length: W }, () => Array(W).fill(FIELD));
  const set = (x, y, c) => { if (x >= 0 && y >= 0 && x < W && y < W) g[y][x] = c; };
  // the field's rosettes: a four-petal flower (white petals round a red heart) on the cell's centre, at 20, 20 and
  // repeated every 12 from there (the field tile is x, y 14..25)
  const flower = (cx, cy) => {
    for (const [dx, dy] of [[0, -2], [0, 2], [-2, 0], [2, 0]]) set(cx + dx, cy + dy, '+');
    for (const [dx, dy] of [[0, -1], [0, 1], [-1, 0], [1, 0]]) set(cx + dx, cy + dy, '3');
    set(cx, cy, 'x');
    for (const [dx, dy] of [[-1, -1], [1, -1], [-1, 1], [1, 1]]) set(cx + dx, cy + dy, '1');
  };
  for (const cy of [14 + 5]) for (const cx of [14 + 5]) flower(cx, cy);
  // the border band along each side (j 0 the hall's edge .. 13 the field): a dark rule, a meander on white between it
  // and a second dark rule, then the field. The meander (5 rows, period 6) is one continuous line: up, along the top,
  // down one, back, down to the bottom, along the bottom into the next.
  const KEY6 = ['#####.', '#...#.', '#.###.', '#.#...', '#.####'];
  const band = (i, j) => {
    if (j === 0 || j >= 10) return FIELD;
    if (j === 1 || j === 9) return '!';
    if (j === 2 || j === 8) return '+';
    return KEY6[j - 3][((i % 6) + 6) % 6] === '#' ? '!' : '+';
  };
  for (let y = 0; y < W; y++) for (let x = 0; x < W; x++) {
    const top = y < 14, bottom = y >= W - 14, left = x < 14, right = x >= W - 14;
    if ((top || bottom) && !(left || right)) g[y][x] = band(x, top ? y : W - 1 - y);
    else if ((left || right) && !(top || bottom)) g[y][x] = band(y, left ? x : W - 1 - x);
  }
  // the corner squares, as deep as the band: framed in the dark rule, a blue ground, an eight-rayed rosette (white
  // rays, a red heart); the rest of the corner the field
  const corner = (ox, oy, fx, fy) => {
    for (let j = 0; j < 14; j++) for (let i = 0; i < 14; i++) {
      const X = ox + (fx ? 13 - i : i), Y = oy + (fy ? 13 - j : j), e = Math.min(i, j), f = Math.max(i, j);
      g[Y][X] = e === 0 || f >= 10 ? FIELD : e === 1 || f === 9 ? '!' : 'u';
    }
    const R = [
      '...+...',
      '.+.+.+.',
      '..+3+..',
      '+++x+++',
      '..+3+..',
      '.+.+.+.',
      '...+...',
    ];
    R.forEach((r, j) => [...r].forEach((c, i) => { if (c !== '.') g[oy + (fy ? 13 - 2 - j : 2 + j)][ox + (fx ? 13 - 2 - i : 2 + i)] = c; }));
  };
  corner(0, 0, false, false); corner(W - 14, 0, true, false); corner(0, W - 14, false, true); corner(W - 14, W - 14, true, true);
  frames['sanctum floor'] = g.map(r => r.join(''));
}

const layout = [['floor', 'channel h', 'channel v', 'sanctum passage', 'sill', 'floor vent', 'floor bolts'], ['sanctum floor']];
const tiles = {
  floor: { fill: 'repeat', mix: ['floor vent', 'floor bolts'] },
  'channel h': { fill: 'repeat-x' }, // a mosaic band: no glow
  'channel v': { fill: 'repeat-y' },
  'sanctum floor': { fill: 'nine', edge: 14 },
  'sanctum passage': { fill: 'repeat' },
  sill: { fill: 'repeat-x' },
};
console.log(writeSheet('pelion/room-floor', frames, layout, { app: 'adm-themes generators/pelion/room-floor.mjs', tiles }));
if (process.argv.includes('--print')) for (const [n, f] of Object.entries(frames)) console.log(n + '\n' + f.join('\n'));
