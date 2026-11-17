// Pelion's drone (the skull family): Athena's little owl (Athene noctua), hovering towards us: a round flat-topped
// head with white brows and a pale X between two big yellow eyes, the short hooked beak, broad rounded wings spread
// wide (brown with white spots, barred flight feathers), a pale breast streaked brown, the talons under it (where the
// app hangs the seal it carries). Its eyes are o (the iris) and O (their glint), the slots the app turns to ink.alarm
// and ink.alarmGlow while it hovers over a stale aporia; nothing else of the owl is drawn in them.
// Run from the Administratum root: node <this file>. Writes ui/art/pelion/skull.png + .json.
//
// Slots: plumage w (mid brown) W (dark) L (lit), spots and brows b, breast b B, beak and talons S, eyes o O k.
const { writeSheet } = await import(process.cwd() + '/tools/sheet_writer.mjs');

const grid = (w, h) => Array.from({ length: h }, () => Array(w).fill('.'));
const dot = (g, x, y, c) => { if (g[y]?.[x] !== undefined) g[y][x] = c; };
const put = (g, x, y, rows) => rows.forEach((r, j) => [...r].forEach((c, i) => { if (c !== '.') dot(g, x + i, y + j, c); }));
const ellipse = (g, cx, cy, rx, ry, c) => { for (let y = 0; y < g.length; y++) for (let x = 0; x < g[0].length; x++) if (((x - cx) / rx) ** 2 + ((y - cy) / ry) ** 2 <= 1) g[y][x] = c; };
// One dark outline round everything drawn (4-neighbours), as the house style.
const outline = g => { const o = g.map(r => [...r]); for (let y = 0; y < g.length; y++) for (let x = 0; x < g[0].length; x++) if (g[y][x] === '.' && [[1, 0], [-1, 0], [0, 1], [0, -1]].some(([dx, dy]) => (g[y + dy]?.[x + dx] ?? '.') !== '.' && g[y + dy][x + dx] !== 'k')) o[y][x] = 'k'; return o; };
const mirror = g => g.map(r => { const n = r.length; return r.map((c, x) => (x < n / 2 ? c : r[n - 1 - x])); });

// Layers: lay b's drawn pixels over a.
const over = (a, b) => a.map((r, y) => r.map((c, x) => (b[y][x] !== '.' ? b[y][x] : c)));

// The owl, 20 x 20: the wings, then the body outlined over them (so a dark line parts them), then the face.
export function owl() {
  // the wing, from the shoulder out to the rounded tip, its trailing edge in barred flight feathers (mirrored)
  let w = grid(20, 20);
  put(w, 1, 4, [
    '.LL......',
    'LLwL.....',
    'LwbwL....',
    'wLwwbL...',
    'wbwLwbL..',
    'WwbwwbwL.',
    'WWwWwwLw.',
    '.W.WwW.w.',
    '...W.W...',
  ]);
  w = outline(mirror(w));
  let g = grid(20, 20);
  ellipse(g, 9.5, 12.2, 4.4, 4.8, 'b'); // the breast
  ellipse(g, 9.5, 5.4, 5.9, 4.0, 'w'); // the head
  g = mirror(g);
  for (let y = 10; y < 17; y++) for (let x = 5; x < 15; x++) { const d = x < 10 ? 9 - x : x - 10; if (g[y][x] === 'b') g[y][x] = (d + y) % 3 === 0 ? 'w' : (d + y) % 3 === 1 && d % 2 ? 'B' : 'b'; } // brown streaks, in mirror
  put(g, 8, 16, ['WWWW']); // the tail
  g = over(w, outline(g));
  put(g, 6, 2, ['LbL..LbL', 'L..LL..L']); // spots on the crown
  put(g, 5, 4, ['bbbbwwbbbb']); // the white brows
  put(g, 5, 5, ['kOok', 'kokk', 'kook']); put(g, 11, 5, ['kOok', 'kkok', 'kook']); // the eyes, ringed, the pupils inwards
  put(g, 9, 5, ['bb', 'bb', 'SS', '.S']); // the pale X between them, the hooked beak
  put(g, 6, 8, ['.bb..bb.']); // the white moustache either side of it
  put(g, 6, 17, ['.SS..SS.', 'S.S..S.S']); // the talons
  return outline(g);
}
export const OWL = owl().map(r => r.join(''));

if (import.meta.url === `file://${process.argv[1]}`) {
  console.log(OWL.join('\n'));
  console.log(writeSheet('pelion/skull', { SKULL: OWL }, [['SKULL']], { app: 'Pelion theme art (adm-themes generators/pelion/skull.mjs)' }));
}
