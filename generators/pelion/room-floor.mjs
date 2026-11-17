// Pelion's floor (the room-floor family): a pebble mosaic, sand pebbles with a few terracotta and slate ones, quiet so
// the students read on it; its two motifs (in place of the vents and bolts) a small terracotta flower and a pair of
// slate pebbles; the channels a meander band (a Greek key, dark on white pebbles); the bays' sills a marble threshold;
// the passage through the east wall a marble threshold; the sanctum's floor a rosette mosaic: corner rosettes, a
// meander border, a field of small rosettes.
// Run from the Administratum root: node <this file>. Writes ui/art/pelion/room-floor.png + .json.
//
// Slots: pebbles 1 (sand) 3 (its lit side) N (terracotta) S (slate), the gaps 2; the meander ! (dark) + (white
// pebbles); marble 4 7 9 6 (the wall's); the sanctum's rosettes x (red) u (blue) + ! 3, its field N.
const { writeSheet } = await import(process.cwd() + '/tools/sheet_writer.mjs');

// A pebble map (one letter a pebble, '.' a gap) to slots: each pebble its colour from `col`, its top-left pixels
// (gap above and to the left, on the torus) lit when it is a sand pebble.
function pebbles(map, col) {
  const H = map.length, W = map[0].length;
  return map.map((r, y) => [...r].map((c, x) => {
    if (c === '.') return '2';
    const s = col[c] ?? c;
    if (s !== '1') return s;
    const up = map[(y + H - 1) % H][x], left = r[(x + W - 1) % W];
    return up !== c && left !== c ? '3' : s;
  }).join(''));
}
const FLOOR = [
  'AAA.BBB.',
  'AAA.BBB.',
  'A.......',
  '..DDD.EE',
  '.DDDD.EE',
  '..DDD.E.',
  '........',
  'AA..BBB.',
];
const frames = {};
frames.floor = pebbles(FLOOR, { A: '1', B: '1', D: '1', E: 'N' });
// the motifs: the middle pebble a small terracotta flower round a lit heart; two slate pebbles for the sand one
frames['floor vent'] = pebbles([
  'AAA.BBB.',
  'AAA.BBB.',
  'A.......',
  '...N..EE',
  '..N3N.EE',
  '...N..E.',
  '........',
  'AA..BBB.',
], { A: '1', B: '1', E: 'N' });
frames['floor bolts'] = pebbles([
  'AAA.BBB.',
  'AAA.BBB.',
  'A.......',
  '..SS..EE',
  '.SS.S.EE',
  '...SS.E.',
  '........',
  'AA..BBB.',
], { A: '1', B: '1', E: 'N' });
// the meander: a line that climbs, runs along the top, drops, runs along the bottom, a tooth hanging into each turn
const KEY = ['!!!!!+++', '!+!+!+!+', '!+!+!+!+', '!+++!!!!'];
frames['channel h'] = KEY;
frames['channel v'] = Array.from({ length: 8 }, (_, y) => KEY.map(r => r[y]).join(''));
// the passage through the east wall: marble threshold slabs
frames['sanctum passage'] = ['7777', '4444', '4494', '6666'];
// the bays' sill: a marble threshold across the floor, its lit edge, its joints, its shadow
frames.sill = ['7'.repeat(24), '4'.repeat(11) + '6' + '7' + '4'.repeat(11), '9'.repeat(4) + '4'.repeat(7) + '6' + '7' + '4'.repeat(11), '6'.repeat(24)];

// The sanctum's floor (nine-slice, edge 14): a rosette in each corner square, a meander band along each side between
// a dark and a white rule, the field a red-brown ground with a small rosette in every 12 x 12 cell.
{
  const W = 40, g = Array.from({ length: W }, () => Array(W).fill('N'));
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
    if (j === 0 || j >= 10) return 'N';
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
      g[Y][X] = e === 0 || f >= 10 ? 'N' : e === 1 || f === 9 ? '!' : 'u';
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
