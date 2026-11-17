// Pelion's students (the scribe family): a Greek student of Chiron's school, about the 4th century BC. Bare-headed
// under an olive wreath, a linen chiton to the knee, a himation draped over the left shoulder and across the body,
// its hem border, and a band in the department colour (y) across the chest and the back; sandals.
// Run from the Administratum root: node <this file>. Writes ui/art/pelion/scribe.png + .json.
//
// Slots: himation r (mid) R (lit) d (shadow), its border t (lit) T (shadow), the wreath z (lit leaf) j (shadow leaf),
// the band y; chiton b (lit) B (shadow); skin : (lit) ; (shadow); hair U (mid) i (shadow) w (highlight); eyes n;
// sandals L (sole) W (straps); outline k. Rank (theme.json rank.*.robe) recolours r R d t T z j b B: high a deep blue
// himation, gold border and wreath; standard undyed linen, border = cloth, wreath = hair; novice grey throughout.
const { writeSheet } = await import(process.cwd() + '/tools/sheet_writer.mjs');

const W = 32, H = 34;
// a frame from rows given as [x, str] segments; '.' in a segment leaves what is under it
function frame(rows) {
  const g = Array.from({ length: H }, () => Array(W).fill('.'));
  for (const [y, segs] of Object.entries(rows)) for (const [x, s] of segs) [...s].forEach((c, i) => { if (c !== '.') g[y][x + i] = c; });
  return g;
}
// the dark outline: every empty pixel touching a drawn one (4-neighbours)
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

// ---- facing down (toward the viewer) ----
const HEAD_DOWN = {
  1: [[11, 'UUUUUUUUUU']],
  2: [[9, 'UUUwwUUUUUUUiU']],
  3: [[9, 'zUUwUUUUUUUUiz']],
  4: [[8, 'zjzzjzzjjzzjzzjz']], // the wreath across the brow, its ends out at the temples
  5: [[8, 'jUU::::::::::UUj']],
  6: [[9, 'U::ii::::ii::U']],
  7: [[9, 'U:::n::::n:::U']],
  8: [[8, ':::::n::::n:::;;']],
  9: [[8, '::::::::;:::::;;']],
  10: [[9, ':::::::::::::;']],
  11: [[10, ':::::;;::::;']],
  12: [[11, '::::::::;;']],
  13: [[13, ';;;;;;']],
  14: [[12, 'b::::;b']],
};
// the himation's top edge across the chest, from under the right arm (screen left) up to the left shoulder
const edgeDown = x => 19 - Math.round((x - 10) * 4 / 11);
function torsoDown() {
  const r = {};
  const put = (y, x, c) => (r[y] ??= []).push([x, c]);
  // shoulders and arms: his right arm bare (screen left), the left under the himation
  for (let y = 15; y <= 27; y++) for (let x = 10; x <= 21; x++) {
    const e = edgeDown(x), hem = e + 5;
    let c;
    if (y < e) c = x < 13 && y > 16 ? 'B' : 'b'; // the chiton's upper chest
    else if (y <= e + 1) c = 'y'; // the band
    else if (y === e + 2) c = 'k'; // its lower seam: the band reads on any cloth
    else if (y < hem) c = x > 18 ? 'd' : x < 12 ? 'R' : 'r';
    else if (y === hem) c = 't';
    else if (y === hem + 1) c = 'T';
    else c = (x === 12 || x === 15 || x === 18) && y > hem + 2 ? 'B' : 'b'; // the chiton's skirt, its pleats
    put(y, x, c);
  }
  // the left shoulder under the himation
  put(15, 19, 'RRRrr'); put(16, 20, 'rrrd');
  for (let y = 17; y <= 21; y++) put(y, 23, y === 21 ? 'ttT' : 'rrd');
  put(17, 22, 'k'); put(18, 22, 'k'); put(19, 22, 'k'); put(20, 22, 'k'); put(21, 22, 'k');
  for (let y = 22; y <= 24; y++) put(y, 23, '::;');
  put(25, 23, ':;;');
  for (let y = 22; y <= 25; y++) put(y, 22, 'k');
  // his right arm: the chiton's short sleeve, then bare
  put(15, 7, 'bbb'); put(16, 6, 'bbbb');
  for (let y = 17; y <= 24; y++) { put(y, 6, y === 17 ? 'BBB' : '::;'); put(y, 9, 'k'); }
  put(25, 6, ':;;'); put(25, 9, 'k');
  // the skirt widens to the knee
  put(26, 9, 'b'); put(27, 9, 'b'); put(26, 22, 'B'); put(27, 22, 'B');
  return r;
}
const LEGS_DOWN = {
  // [left leg bottom offset, right leg bottom offset]: 0 planted, -2 lifted behind
  0: [0, 0], 1: [0, -2], 2: [-2, 0],
};
function legsDown(step) {
  const r = {}, put = (y, x, s) => (r[y] ??= []).push([x, s]);
  const [a, b] = LEGS_DOWN[step];
  for (const [x0, off] of [[11, a], [18, b]]) {
    const end = 32 + off;
    for (let y = 28; y <= end - 2; y++) put(y, x0, '::;');
    put(end - 1, x0 - 1, ':WW;');
    put(end, x0 - 1, 'LLLL');
  }
  return r;
}

// ---- facing up (its back) ----
const HEAD_UP = {
  1: [[11, 'UUUUUUUUUU']],
  2: [[9, 'UUUwwUUUUUUUiU']],
  3: [[9, 'zUUwUUUUUUUUiz']],
  4: [[8, 'zjzzjzzjjzzjzzjz']],
  5: [[8, 'jUUUUUUjjUUUUUij']], // the wreath's tie at the nape
  6: [[9, 'UUwUUUUjUUUUiU']],
  7: [[9, 'UUUUUUUUUUUUiU']],
  8: [[8, ':UUUUUUUUUUUUiU;']],
  9: [[8, ':UUUUUUUUUUUiiU;']],
  10: [[9, 'UUUUUUUUUUUiiU']],
  11: [[10, 'UUUUUUUUUUii']],
  12: [[11, 'iUUUUUUUii']],
  13: [[13, '::::;;']],
  14: [[12, 'b::::;b']],
};
// on the back the himation runs from the left shoulder (screen left) down to under the right arm
const edgeUp = x => edgeDown(31 - x);
function torsoUp() {
  const r = {}, put = (y, x, c) => (r[y] ??= []).push([x, c]);
  for (let y = 15; y <= 27; y++) for (let x = 10; x <= 21; x++) {
    const e = edgeUp(x), hem = e + 5;
    let c;
    if (y < e) c = x > 18 && y > 16 ? 'B' : 'b';
    else if (y <= e + 1) c = 'y';
    else if (y === e + 2) c = 'k';
    else if (y < hem) c = x < 13 ? 'R' : x > 19 ? 'd' : 'r';
    else if (y === hem) c = 't';
    else if (y === hem + 1) c = 'T';
    else c = (x === 13 || x === 16 || x === 19) && y > hem + 2 ? 'B' : 'b';
    put(y, x, c);
  }
  put(15, 8, 'RRrrr'); put(16, 8, 'Rrrr');
  // his left arm (screen left) under the himation, to the elbow; the forearm forward, hidden by the body
  for (let y = 17; y <= 20; y++) { put(y, 6, y === 20 ? 'Ttt' : 'Rrr'); put(y, 9, 'k'); }
  // his right arm (screen right) bare, to the elbow
  put(15, 22, 'bbb'); put(16, 22, 'bbbb');
  for (let y = 17; y <= 20; y++) { put(y, 23, y === 17 ? 'BBB' : '::;'); put(y, 22, 'k'); }
  put(26, 9, 'b'); put(27, 9, 'b'); put(26, 22, 'B'); put(27, 22, 'B');
  return r;
}

// ---- facing right (its right side toward us) ----
const HEAD_RIGHT = {
  1: [[11, 'UUUUUUUU']],
  2: [[9, 'UUUwwUUUUUU']],
  3: [[8, 'zUUwUUUUUUUUz']],
  4: [[8, 'jzzjzzjzzjzzjz']], // the wreath round the head, its tied ends at the back
  5: [[7, 'jjUUUUUUU:::::']],
  6: [[8, 'jUUUUUUU::ii:']],
  7: [[9, 'UUUUUU::::n:']],
  8: [[9, 'UUUU:;::::n::']],
  9: [[9, 'UUUU;;::::::::']],
  10: [[9, 'iUUUU::::::;']],
  11: [[10, 'iUU::::::;']],
  12: [[11, 'iU;::::;']],
  13: [[13, ';;;;;']],
  14: [[12, 'bb:::b']],
};
const edgeRight = x => 17 + Math.round((x - 10) * 4 / 11);
function torsoRight() {
  const r = {}, put = (y, x, c) => (r[y] ??= []).push([x, c]);
  for (let y = 15; y <= 27; y++) for (let x = 10; x <= 21; x++) {
    const e = edgeRight(x), hem = 23 + Math.round((x - 10) / 5);
    let c;
    if (y < e) c = x <= 11 ? 'd' : 'b'; // the chiton's shoulder; the himation falls down his back from the far shoulder
    else if (y <= e + 1) c = 'y';
    else if (y === e + 2) c = 'k';
    else if (y < hem) c = x < 12 ? 'd' : x > 19 ? 'R' : 'r';
    else if (y === hem) c = 't';
    else if (y === hem + 1) c = 'T';
    else c = x === 12 || x === 19 ? 'B' : 'b';
    put(y, x, c);
  }
  put(26, 9, 'B'); put(27, 9, 'B'); put(26, 22, 'b'); put(27, 22, 'b');
  // his right arm, near side, bare below the sleeve, hanging in front of the body
  put(15, 15, 'bbb'); put(16, 15, 'bbb');
  for (let y = 17; y <= 24; y++) { put(y, 14, 'k'); put(y, 15, '::;'); put(y, 18, 'k'); }
  put(17, 15, 'BBB');
  put(25, 15, ':;;'); put(25, 14, 'k'); put(25, 18, 'k');
  return r;
}
function legsRight(step) {
  const r = {}, put = (y, x, s) => (r[y] ??= []).push([x, s]);
  const legs = { 0: [[14, 0], [16, 0]], 1: [[12, 0], [18, 0]], 2: [[13, -1], [17, 0]] }[step];
  // the far leg first, darker; the near leg over it
  legs.forEach(([x0, off], i) => {
    const sh = i === 0 ? ';;' : ':;';
    for (let y = 28; y <= 30 + off; y++) put(y, x0, sh);
    put(31 + off, x0, ':W;');
    put(32 + off, x0, 'LLLL');
  });
  if (step === 1) { put(28, 13, ';;'); put(28, 17, ':;'); }
  return r;
}

// ---- the arm at the desk: a bare forearm rising from the elbow, the hand with a bronze stylus ----
// drawn over the back view (up 0) at the arm anchor, mirrored at armL
const ARM = [
  '.h......',
  '.h......',
  'kh:k....',
  'k:::k...',
  'k:::;k..',
  '.k::;k..',
  '.k::;k..',
  '..k:;;k.',
  '..k::;k.',
  '..k::;k.',
  '...k:;k.',
  '...k::;k',
  '...k::;k',
  '...k::;k',
  '....k;;k',
  '.....kk.',
];

const frames = {};
const build = (head, torso, legs) => rows(outline(frame(merge(head, torso, legs))));
for (const s of [0, 1, 2]) {
  frames[`down ${s}`] = build(HEAD_DOWN, torsoDown(), legsDown(s));
  frames[`up ${s}`] = build(HEAD_UP, torsoUp(), legsDown(s));
  frames[`right ${s}`] = build(HEAD_RIGHT, torsoRight(), legsRight(s));
}
frames.arm = ARM;
for (const [n, f] of Object.entries(frames)) {
  const w = n === 'arm' ? 8 : W, h = n === 'arm' ? 16 : H;
  if (f.length !== h || f.some(r => r.length !== w)) throw new Error(`${n}: not ${w}x${h}`);
}
// arm: the forearm's elbow over the back view's right upper arm, armL its mirror over the left
const anchors = { feet: [16, 34], arm: [21, 2], armL: [3, 2], scroll: [26, 14] };
const layout = [['down 0', 'down 1', 'down 2', 'up 0', 'up 1', 'up 2', 'right 0', 'right 1', 'right 2'], ['arm']];
console.log(writeSheet('pelion/scribe', frames, layout, { app: 'adm-themes generators/pelion/scribe.mjs', anchors }));
if (process.argv.includes('--print')) for (const [n, f] of Object.entries(frames)) console.log(n + '\n' + f.join('\n'));
