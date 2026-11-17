// Pelion's drone in the 2.5D view (the skull39 family): Athena's little owl seen from above and in front, as the 39°
// view looks down on it: the spotted crown and the backs of its spread wings show, the face lower and foreshortened
// (white brows, the yellow eyes, the beak), the barred tail under it and the talons where the app hangs the seal.
// Its eyes are o and O (the slots the app turns to the alarm inks while it hovers over a stale aporia).
// Run from the Administratum root: node <this file>. Writes ui/art/pelion/skull39.png + .json (anchors as the default's).
//
// Slots: plumage w (mid brown) W (dark) L (lit), spots and brows b, breast b B, beak and talons S, eyes o O k.
const { writeSheet } = await import(process.cwd() + '/tools/sheet_writer.mjs');

const grid = (w, h) => Array.from({ length: h }, () => Array(w).fill('.'));
const dot = (g, x, y, c) => { if (g[y]?.[x] !== undefined) g[y][x] = c; };
const put = (g, x, y, rows) => rows.forEach((r, j) => [...r].forEach((c, i) => { if (c !== '.') dot(g, x + i, y + j, c); }));
const ellipse = (g, cx, cy, rx, ry, c) => { for (let y = 0; y < g.length; y++) for (let x = 0; x < g[0].length; x++) if (((x - cx) / rx) ** 2 + ((y - cy) / ry) ** 2 <= 1) g[y][x] = c; };
const outline = g => { const o = g.map(r => [...r]); for (let y = 0; y < g.length; y++) for (let x = 0; x < g[0].length; x++) if (g[y][x] === '.' && [[1, 0], [-1, 0], [0, 1], [0, -1]].some(([dx, dy]) => (g[y + dy]?.[x + dx] ?? '.') !== '.' && g[y + dy][x + dx] !== 'k')) o[y][x] = 'k'; return o; };
const mirror = g => g.map(r => { const n = r.length; return r.map((c, x) => (x < n / 2 ? c : r[n - 1 - x])); });
const over = (a, b) => a.map((r, y) => r.map((c, x) => (b[y][x] !== '.' ? b[y][x] : c)));

let w = grid(20, 20);
put(w, 1, 3, [ // the wing's upper side, spread: coverts spotted white, the flight feathers barred dark
  '..LL.....',
  '.LLwL....',
  'LwbLwL...',
  'LbwwbwL..',
  'wwLbwLwL.',
  'wbwwbwLw.',
  'WwWwWwWw.',
  'WWWWWWWw.',
  '.W.W.WW..',
]);
w = outline(mirror(w));
let g = grid(20, 20);
ellipse(g, 9.5, 11.2, 4.2, 4.6, 'w'); // the back and the breast's top
ellipse(g, 9.5, 6.4, 5.6, 4.4, 'w'); // the head, its crown towards us
put(g, 5, 3, ['...Lb', '.bL.L', '..w.w']); // the spotted crown (left half, mirrored)
g = mirror(g);
put(g, 8, 14, ['WWWW', 'WbbW', '.WW.']); // the barred tail
g = over(w, outline(g));
put(g, 5, 5, ['bbbbwwbbbb']); // the brows
put(g, 5, 6, ['kOok', 'kook']); put(g, 11, 6, ['kOok', 'kook']); // the eyes, foreshortened
dot(g, 7, 7, 'k'); dot(g, 12, 7, 'k'); // the pupils, inwards
put(g, 9, 6, ['bb', 'SS', '.S']); // the beak
put(g, 6, 9, ['.bbwwbb.']); // the moustache
put(g, 7, 10, ['bBbbBb']); put(g, 7, 11, ['.bwwb.']); // a glimpse of the streaked breast
put(g, 6, 17, ['.SS..SS.', 'S.S..S.S']); // the talons
g = outline(g);
const SKULL39 = g.map(r => r.join(''));
console.log(SKULL39.join('\n'));
console.log(writeSheet('pelion/skull39', { skull: SKULL39 }, [['skull']], { app: 'Pelion theme art (adm-themes generators/pelion/skull39.mjs)',
  anchors: { centre: [10, 10], carry: [7, 19], beam: [10, 18] } }));
