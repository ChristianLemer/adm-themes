// Pelion's doors (the room-doors family): bronze double doors in the east wall, seen from above as the hall sees its
// doors: marble jamb blocks at each end, a bronze lining down both sides, two studded leaves meeting in the middle
// (rows of studs, a cross rail, a ring pull at the meeting edge); the sanctum's a taller pair with a third row of
// studs. Half: the leaves swung part way, foreshortened and in shade, the marble threshold showing between them.
// Open: the leaves back against the jambs, edge on.
// Run from the Administratum root: node <this file>. Writes ui/art/pelion/room-doors.png + .json.
//
// Slots: bronze g (plate) G (shade) h (lit) U (deep); jambs and threshold marble 7 4 6 9.
const { writeSheet } = await import(process.cwd() + '/tools/sheet_writer.mjs');

const W = 20;
const grid = (h, c = '.') => Array.from({ length: h }, () => Array(W).fill(c));
const put = (g, x, y, s) => [...s].forEach((c, i) => { if (c !== ' ' && g[y]?.[x + i] !== undefined) g[y][x + i] = c; });

// A door frame of height H: the jamb blocks (4 rows each end), the bronze lining, the threshold between (marble slabs,
// a joint every 8 rows), the leaves laid over by the state.
function frame(H) {
  const g = grid(H);
  for (const y0 of [0, H - 4]) { put(g, 0, y0, '7'.repeat(W)); put(g, 0, y0 + 1, '4'.repeat(19) + '6'); put(g, 0, y0 + 2, '4'.repeat(9) + '9' + '4'.repeat(9) + '6'); put(g, 0, y0 + 3, '6'.repeat(W)); }
  for (let y = 4; y < H - 4; y++) {
    put(g, 2, y, 'G' + ((y - 4) % 8 === 7 ? '6'.repeat(14) : (y - 4) % 8 === 0 ? '7'.repeat(14) : '4'.repeat(14)) + 'U');
  }
  return g;
}
// A leaf, full face: rows y0..y0+h-1, lit rim at its top and left, shade at its bottom and right, studs in rows, a
// cross rail, the ring pull by the meeting edge (pullAt: 'bottom' or 'top').
function leaf(g, y0, h, pullAt, studRows) {
  for (let j = 0; j < h; j++) {
    const y = y0 + j;
    put(g, 3, y, j === 0 ? 'h'.repeat(14) : j === h - 1 ? 'G'.repeat(13) + 'U' : 'h' + 'g'.repeat(12) + 'G');
  }
  const rail = y0 + (h >> 1);
  put(g, 4, rail - 1, 'GGGGGGGGGGGG'); put(g, 4, rail, 'hhhhhhhhhhhh');
  for (const r of studRows) for (const x of [5, 8, 11, 14]) { g[y0 + r][x] = 'h'; g[y0 + r + 1][x] = 'U'; }
  const py = pullAt === 'bottom' ? y0 + h - 7 : y0 + 3; // the ring pull: a lion's-head boss and its ring
  put(g, 8, py, ' hG '); put(g, 8, py + 1, 'hUUG'); put(g, 8, py + 2, ' GG '); put(g, 7, py + 3, 'h    G'); put(g, 8, py + 4, 'GhhG');
}
// A leaf swung part way: shorter, in shade (turned from the light), its thick edge lit at the far end.
function swung(g, y0, h, edgeAtBottom) {
  for (let j = 0; j < h; j++) put(g, 3, y0 + j, 'G' + 'G'.repeat(12) + 'U');
  for (let j = 2; j < h - 2; j += 4) for (const x of [6, 10, 14]) g[y0 + j][x] = 'g';
  put(g, 3, edgeAtBottom ? y0 + h - 2 : y0, 'h'.repeat(14)); put(g, 3, edgeAtBottom ? y0 + h - 1 : y0 + 1, 'g'.repeat(13) + 'G');
}
// A leaf open, back against its jamb: its edge only.
const edge = (g, y) => { put(g, 3, y, 'hhhhhhhhhhhhhG'); put(g, 3, y + 1, 'gggggggggggggU'); put(g, 3, y + 2, 'GGGGGGGGGGGGGU'); };

function door(H, studs) {
  const L = (H - 8) >> 1, mid = 4 + L; // each leaf's length, the meeting row
  const closed = frame(H); leaf(closed, 4, L, 'bottom', studs); leaf(closed, mid, L, 'top', studs.map(r => L - 2 - r));
  const half = frame(H); const s = Math.round(L * 0.5); swung(half, 4, s, true); swung(half, H - 4 - s, s, false);
  const open = frame(H); edge(open, 4); edge(open, H - 7);
  return [closed, half, open].map(g => g.map(r => r.join('')));
}

const frames = {};
const [sc, sh, so] = door(80, [3, 8, 13, 22, 27]);
const [rc, rh, ro] = door(48, [3, 6]);
Object.assign(frames, {
  'door sanctum closed': sc, 'door sanctum half': sh, 'door sanctum open': so,
  'door refectory closed': rc, 'door refectory half': rh, 'door refectory open': ro,
});
const layout = [Object.keys(frames)];
const anchors = Object.fromEntries(Object.keys(frames).map(n => [n, { door: [2, 4] }]));
console.log(writeSheet('pelion/room-doors', frames, layout, { app: 'adm-themes generators/pelion/room-doors.mjs', anchors }));
if (process.argv.includes('--print')) for (const [n, f] of Object.entries(frames)) console.log(n + '\n' + f.join('\n'));
