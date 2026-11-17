// Pelion's helpers (the adept family): a boy of the school, smaller than the students, bare-headed with short curls,
// a short tunic to mid-thigh with a trimmed hem and neckline, a leather satchel on a strap across the body, a papyrus
// roll in his right hand, sandals. The subagent's kind glyph is the satchel's flap, worn on the left hip: seen from the
// front and from the back (the glyph down / glyph up anchors); the side view shows the strap and no glyph.
// Run from the Administratum root: node <this file>. Writes ui/art/pelion/adept.png + .json.
//
// Slots: tunic q (mid) Q (shadow) b (lit), its trim J (lit) I (shadow); skin : ;, hair U i w, eyes n; satchel and strap
// L (leather) W (dark leather); papyrus p P; sandals L W; outline k. Rank (theme.json rank.*.adept) recolours q Q b J I:
// high a blue tunic with a gold trim, standard sand with the trim hidden, novice grey.
const { writeSheet } = await import(process.cwd() + '/tools/sheet_writer.mjs');

const W = 24, H = 28;
function frame(rows) {
  const g = Array.from({ length: H }, () => Array(W).fill('.'));
  for (const [y, segs] of Object.entries(rows)) for (const [x, s] of segs) [...s].forEach((c, i) => { if (c !== '.') g[y][x + i] = c; });
  return g;
}
function outline(g) {
  const out = g.map(r => [...r]);
  for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
    if (g[y][x] !== '.') continue;
    if ([[1, 0], [-1, 0], [0, 1], [0, -1]].some(([dx, dy]) => { const c = g[y + dy]?.[x + dx]; return c && c !== '.' && c !== 'k'; })) out[y][x] = 'k';
  }
  return out;
}
const merge = (...parts) => { const r = {}; for (const p of parts) for (const [y, s] of Object.entries(p)) (r[y] ??= []).push(...s); return r; };
const rows = g => g.map(r => r.join(''));
const sheet = () => { const r = {}; return [r, (y, x, s) => (r[y] ??= []).push([x, s])]; };

// ---- facing down ----
const HEAD_DOWN = {
  2: [[8, 'UUUUUUUU']],
  3: [[7, 'UUwwUUUUiU']],
  4: [[6, 'UUwUUUUUUUiU']],
  5: [[6, 'UU::::::::UU']],
  6: [[6, 'U::i::::i::U']],
  7: [[6, ':::n::::n:;;']],
  8: [[6, ':::n::::n:;;']],
  9: [[7, ':::::;:::;']],
  10: [[8, ':::;;::;']],
  11: [[9, '::::;;']],
  12: [[10, ';;;;']],
};
function bodyDown() {
  const [r, put] = sheet();
  put(13, 5, 'bqqqJIIJqqqQ'); put(13, 17, 'QQ'); // shoulders, the trimmed neckline
  put(14, 4, 'bqq'); put(14, 17, 'qQQ');
  for (let y = 14; y <= 20; y++) for (let x = 8; x <= 15; x++) put(y, x, x === 8 ? 'b' : x >= 14 ? 'Q' : 'q');
  for (let y = 15; y <= 19; y++) { put(y, 4, '::;'); put(y, 7, 'k'); put(y, 16, 'k'); put(y, 17, '::;'); }
  put(19, 7, 'b'); put(20, 7, 'bq'); put(19, 16, 'Q'); put(20, 15, 'QQ');
  put(21, 7, 'JJIJJIJJIJ'); // the hem's trim
  // the strap from the right shoulder (screen left) down to the left hip
  [[13, 9], [14, 9], [15, 10], [16, 11], [17, 12], [18, 13]].forEach(([y, x]) => put(y, x, 'WL'.slice(0, y < 15 ? 1 : 2)));
  // the satchel on the left hip, its flap (the glyph) on top
  put(17, 13, 'WWWWW'); put(18, 13, 'WWWWW'); put(19, 13, 'WWWWW');
  put(17, 12, 'L'); put(18, 12, 'L'); put(19, 12, 'L'); put(17, 18, 'L'); put(18, 18, 'L'); put(19, 18, 'L');
  put(20, 12, 'LLLLLLL'); put(21, 13, 'WWWWW');
  // the papyrus roll in his right hand
  for (let y = 15; y <= 23; y++) put(y, 1, y === 15 || y === 23 ? 'PP' : 'pP');
  put(19, 3, '::;'); put(20, 3, ':;;');
  return r;
}
function legs(step, xs = [9, 13]) {
  const [r, put] = sheet();
  const off = { 0: [0, 0], 1: [0, -2], 2: [-2, 0] }[step];
  xs.forEach((x0, i) => {
    const end = 26 + off[i];
    for (let y = 22; y <= end - 2; y++) put(y, x0, ':;');
    put(end - 1, x0 - (i ? 0 : 1), i ? 'W;:' : ':W;');
    put(end, x0 - (i ? 0 : 1), 'LLL');
  });
  return r;
}

// ---- facing up ----
const HEAD_UP = {
  2: [[8, 'UUUUUUUU']],
  3: [[7, 'UUwwUUUUiU']],
  4: [[6, 'UUwUUUUUUUiU']],
  5: [[6, 'UUUUwUUUUUiU']],
  6: [[6, 'UUUUUUUUUUiU']],
  7: [[6, ':UUUUUUUUiU;']],
  8: [[6, ':UUUUUUUiiU;']],
  9: [[7, 'UUUUUUUiiU']],
  10: [[8, 'iUUUUUii']],
  11: [[9, '::::;;']],
  12: [[10, ':::;']],
};
function bodyUp() {
  const [r, put] = sheet();
  put(13, 5, 'bqqqJIIJqqqQ'); put(13, 17, 'QQ');
  put(14, 4, 'bqq'); put(14, 17, 'qQQ');
  for (let y = 14; y <= 20; y++) for (let x = 8; x <= 15; x++) put(y, x, x === 8 ? 'b' : x >= 14 ? 'Q' : 'q');
  for (let y = 15; y <= 19; y++) { put(y, 4, '::;'); put(y, 7, 'k'); put(y, 16, 'k'); put(y, 17, '::;'); }
  put(19, 7, 'b'); put(20, 7, 'bq'); put(19, 16, 'Q'); put(20, 15, 'QQ');
  put(21, 7, 'JJIJJIJJIJ');
  // the strap from the right shoulder (screen right) down the back to the left hip (screen left)
  [[13, 14], [14, 14], [15, 12], [16, 11], [17, 10], [18, 9]].forEach(([y, x]) => put(y, x, 'LW'.slice(y < 15 ? 1 : 0)));
  put(17, 6, 'WWWWW'); put(18, 6, 'WWWWW'); put(19, 6, 'WWWWW');
  put(17, 5, 'L'); put(18, 5, 'L'); put(19, 5, 'L'); put(17, 11, 'L'); put(18, 11, 'L'); put(19, 11, 'L');
  put(20, 5, 'LLLLLLL'); put(21, 6, 'WWWWW');
  // the roll in his right hand, screen right
  for (let y = 15; y <= 23; y++) put(y, 21, y === 15 || y === 23 ? 'PP' : 'pP');
  put(19, 18, '::;'); put(20, 18, ':;;');
  return r;
}

// ---- facing right ----
const HEAD_RIGHT = {
  2: [[8, 'UUUUUUU']],
  3: [[7, 'UUwwUUUUU']],
  4: [[6, 'UUwUUUUUUUU']],
  5: [[6, 'UUUUUUUU::::']],
  6: [[6, 'UUUUUUU:::i:']],
  7: [[6, 'UUUU:;::::n:']],
  8: [[6, 'UUUU;;::::n::']],
  9: [[6, 'iUUU:::::::::']],
  10: [[7, 'iUU:::::;:']],
  11: [[8, 'iU:::::']],
  12: [[10, ';;;;']],
};
function bodyRight() {
  const [r, put] = sheet();
  put(13, 8, 'qqqJIJqQ');
  for (let y = 14; y <= 20; y++) for (let x = 8; x <= 15; x++) put(y, x, x <= 9 ? 'Q' : x === 15 ? 'b' : 'q');
  put(20, 7, 'Q'); put(20, 16, 'b');
  put(21, 7, 'JJIJJIJJIJ');
  // the strap over the near shoulder, down and round his back; the satchel peeks out behind the left hip
  [[13, 12], [14, 11], [15, 10], [16, 9], [17, 8]].forEach(([y, x]) => put(y, x, 'WL'));
  put(17, 4, 'LWWW'); put(18, 4, 'LWWW'); put(19, 4, 'LLLL'); put(20, 5, 'WWW');
  // the near arm, bare, holding the roll out in front
  put(13, 12, 'bbq'); put(14, 12, 'qqq');
  for (let y = 15; y <= 18; y++) { put(y, 11, 'k'); put(y, 12, '::;'); put(y, 15, 'k'); }
  put(19, 11, 'k'); put(19, 12, ':::'); put(19, 15, 'k');
  put(20, 13, 'PppppP'); put(21, 13, 'PPPPPP');
  put(19, 13, '::;');
  return r;
}
function legsRight(step) {
  const [r, put] = sheet();
  const L = { 0: [[10, 0], [12, 0]], 1: [[8, 0], [14, 0]], 2: [[9, -1], [13, 0]] }[step];
  L.forEach(([x0, off], i) => {
    for (let y = 22; y <= 24 + off; y++) put(y, x0, i ? ':;' : ';;');
    put(25 + off, x0, ':W;');
    put(26 + off, x0, 'LLL');
  });
  return r;
}

const frames = {};
const build = (...p) => rows(outline(frame(merge(...p))));
for (const s of [0, 1, 2]) {
  frames[`down ${s}`] = build(HEAD_DOWN, bodyDown(), legs(s));
  frames[`up ${s}`] = build(HEAD_UP, bodyUp(), legs(s));
  frames[`right ${s}`] = build(HEAD_RIGHT, bodyRight(), legsRight(s));
}
// the kind glyphs, each the satchel's flap face (5x3): an owl's eye (explore), a tablet with a written line (plan),
// a bronze rosette (general), a red meander (custom, any other agent)
frames['glyph explore'] = ['WOOOW', 'OOnOO', 'WOOOW'];
frames['glyph plan'] = ['ppppp', 'PnnnP', 'ppppp'];
frames['glyph general'] = ['WWcWW', 'WcccW', 'WWcWW'];
frames['glyph custom'] = ['aaaaW', 'WWWaW', 'aaWaW'];
// at the default glyph's size (10x5), the flap in its top-left corner, the rest left to the body ('.')
for (const n of Object.keys(frames)) if (n.startsWith('glyph')) frames[n] = [...frames[n].map(r => r.padEnd(10, '.')), '.'.repeat(10), '.'.repeat(10)];
for (const [n, f] of Object.entries(frames)) {
  const [w, h] = n.startsWith('glyph') ? [10, 5] : [W, H];
  if (f.length !== h || f.some(r => r.length !== w)) throw new Error(`${n}: not ${w}x${h}`);
}
const anchors = { feet: [12, 28], 'glyph down': [13, 17], 'glyph up': [6, 17] };
const layout = [['down 0', 'down 1', 'down 2', 'up 0', 'up 1', 'up 2', 'right 0', 'right 1', 'right 2'], ['glyph explore', 'glyph plan', 'glyph general', 'glyph custom']];
console.log(writeSheet('pelion/adept', frames, layout, { app: 'adm-themes generators/pelion/adept.mjs', anchors }));
if (process.argv.includes('--print')) for (const [n, f] of Object.entries(frames)) console.log(n + '\n' + f.join('\n'));
