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
// The himation, front and back: its top edge (the rolled band) rises from under the right arm to the left shoulder;
// below it the cloth sags in swag folds across the chest and falls straight over the left side; its hem runs long on
// the left (to the knee) and short on the right (the chiton's skirt shows there). One border (t) along the hem.
// lx: the x mirrored so that 0 is under the right arm and 11 at the left shoulder (front: x - 10, back: 21 - x).
const edgeAt = lx => 20 - Math.round(lx * 5 / 11);
const hemAt = lx => 23 + Math.round(lx * 4 / 11);
// rows of the body: [first x, last x] per y (the waist pinched on the bare side)
function cloth(y, x, lx, back) {
  const e = edgeAt(lx), hem = hemAt(lx);
  if (y < e) return (back ? lx <= 1 && y > 17 : lx <= 1 && y > 17) ? 'B' : y === e - 1 && lx > 2 ? 'B' : 'b'; // the chiton's shoulder
  if (y <= e + 1) return 'y'; // the band
  if (y === e + 2) return 'k'; // its seam: the band reads on any cloth
  if (y < hem) {
    if (lx >= 9) return lx === 11 ? 'd' : lx === 10 ? (back ? 'R' : 'd') : (back ? 'r' : 'R'); // falling straight from the shoulder
    const k = y - e - 2; // the swag folds sag under the band
    if (k === 2 || k === 5) return 'd';
    if (k === 1 || k === 4) return lx < 3 ? 'r' : 'R';
    return 'r';
  }
  if (y === hem) return 't'; // the border
  return lx === 2 || lx === 5 ? 'B' : 'b'; // the chiton's skirt, its pleats
}
function bodyRows(back) {
  const r = {}, put = (y, x, c) => (r[y] ??= []).push([x, c]);
  for (let y = 15; y <= 27; y++) {
    const pinch = y === 21 || y === 22, flare = y >= 26;
    for (let x = 9; x <= 22; x++) {
      const lx = back ? 21 - x : x - 10;
      if (lx < -1 || lx > 12) continue;
      const bare = lx <= 0, hem = hemAt(Math.max(0, Math.min(11, lx)));
      if ((lx === -1 || lx === 12) && !(flare && y > hem)) continue; // the skirt flares past the body below the hem
      if (pinch && lx === 0) continue; // the waist, on the bare side
      put(y, x, cloth(y, x, Math.max(0, Math.min(11, lx)), back));
      void bare;
    }
  }
  return [r, put];
}
function torsoDown() {
  const [r, put] = bodyRows(false);
  // the left shoulder and arm under the himation (screen right), its hem bordered, the hand below
  put(15, 19, 'RRRrr'); put(16, 20, 'RRrd');
  for (let y = 17; y <= 22; y++) { put(y, 22, 'k'); put(y, 23, 'Rrd'); }
  put(23, 22, 'k'); put(23, 23, 'ttt');
  put(24, 22, 'k'); put(24, 23, '::;'); put(25, 23, ':;;');
  // his right arm (screen left): the chiton's short sleeve, then bare, hanging
  put(15, 7, 'bbb'); put(16, 6, 'bbbb'); put(17, 6, 'BBB');
  for (let y = 18; y <= 24; y++) put(y, 6, '::;');
  put(25, 6, ':;;');
  for (let y = 17; y <= 25; y++) put(y, 9, 'k');
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
// on the back the himation runs from the left shoulder (screen left) down to under the right arm (screen right)
function torsoUp() {
  const [r, put] = bodyRows(true);
  put(15, 8, 'RRrrr'); put(16, 8, 'RRrr');
  // his left arm (screen left) under the himation, to the elbow: the forearm is forward, hidden by the body
  for (let y = 17; y <= 20; y++) { put(y, 6, 'Rrd'); put(y, 9, 'k'); }
  put(21, 7, 'tt'); put(21, 9, 'k');
  // his right arm (screen right) bare, to the elbow
  put(15, 22, 'bbb'); put(16, 22, 'bbbb'); put(17, 23, 'BBB');
  for (let y = 18; y <= 20; y++) put(y, 23, '::;');
  put(21, 23, ':;');
  for (let y = 17; y <= 21; y++) put(y, 22, 'k');
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
// the side: the himation hangs down his back from the far shoulder, passes under the near arm and crosses the front
const edgeRight = x => (x >= 14 && x <= 18 ? 19 : 18); // round the body at the armpit, sagging under the arm
function torsoRight(step) {
  const r = {}, put = (y, x, c) => (r[y] ??= []).push([x, c]);
  for (let y = 15; y <= 27; y++) for (let x = 10; x <= 21; x++) {
    if ((y === 21 || y === 22) && x === 21) continue; // the waist
    if (x === 10 && y < 17) continue;
    const e = edgeRight(x), hem = 25 + Math.round((21 - x) / 5); // longer at the back
    let c;
    if (y < e) c = x <= 12 ? (x === 12 ? 'r' : 'd') : y === e - 1 && x > 17 ? 'B' : 'b';
    else if (y <= e + 1) c = 'y';
    else if (y === e + 2) c = 'k';
    else if (y < hem) c = x <= 11 ? 'd' : x === 12 ? 'R' : (y - e) % 3 === 0 ? 'd' : x >= 19 ? 'R' : 'r';
    else if (y === hem) c = 't';
    else c = x === 13 || x === 18 ? 'B' : 'b';
    put(y, x, c);
  }
  put(26, 9, 'd'); put(27, 9, 'd'); put(26, 22, 'b'); put(27, 22, 'b');
  // the near arm hanging naturally: the short sleeve, the upper arm, a slight bend at the elbow, the hand at the hip;
  // the forearm swings a pixel with the stride
  const sw = [0, 1, -1][step];
  put(15, 14, 'bbbb'); put(16, 13, 'kbbbb'); put(17, 13, 'kBBBk');
  for (let y = 18; y <= 20; y++) put(y, 13, 'k::;k'); // the upper arm, lit and shadow
  put(21, 13, 'k:::;k'); // the elbow, bending slightly forward
  put(22, 14 + sw, 'k::;k'); // the forearm, swinging with the stride
  put(23, 14 + sw, 'k::;k');
  put(24, 14 + sw, 'k:;;k'); // the hand at the hip
  put(25, 15 + sw, 'kkk');
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

// ---- the forearm at rest, drawn over the back view whenever the student is not walking (at the table, in the
// queue, at the mechanism), mirrored for the left: bent forward from the elbow, the hand toward the belt in front of
// him. Seated it reads as the hands at the table, standing as the hands folded. No stylus: from behind the hand is
// half hidden and a mirrored stylus in the left hand would make no sense. Lifted with the finished scroll (liftOf),
// the forearms rise to the chest.
const ARM = [
  '........',
  '........',
  '........',
  '........',
  '........',
  '........',
  '........',
  '........',
  '....:;..',
  '....::;.',
  '.....:;;',
  '.....::;',
  '......;.',
  '........',
  '........',
  '........',
];
function outlineArm(a) {
  const g = a.map(r => [...r]), out = g.map(r => [...r]);
  for (let y = 0; y < 16; y++) for (let x = 0; x < 8; x++) if (g[y][x] === '.' && [[1, 0], [-1, 0], [0, 1], [0, -1]].some(([dx, dy]) => (g[y + dy]?.[x + dx] ?? '.') !== '.')) out[y][x] = 'k';
  return out;
}
export const frames = {};
const build = (head, torso, legs) => rows(outline(frame(merge(head, torso, legs))));
for (const s of [0, 1, 2]) {
  frames[`down ${s}`] = build(HEAD_DOWN, torsoDown(), legsDown(s));
  frames[`up ${s}`] = build(HEAD_UP, torsoUp(), legsDown(s));
  frames[`right ${s}`] = build(HEAD_RIGHT, torsoRight(s), legsRight(s));
}
frames.arm = rows(outlineArm(ARM));
for (const [n, f] of Object.entries(frames)) {
  const w = n === 'arm' ? 8 : W, h = n === 'arm' ? 16 : H;
  if (f.length !== h || f.some(r => r.length !== w)) throw new Error(`${n}: not ${w}x${h}`);
}
// arm: the forearm's elbow over the back view's right upper arm, armL its mirror over the left
const anchors = { feet: [16, 34], arm: [18, 10], armL: [6, 10], scroll: [26, 14] };
const layout = [['down 0', 'down 1', 'down 2', 'up 0', 'up 1', 'up 2', 'right 0', 'right 1', 'right 2'], ['arm']];
// run as a script, write the sheet; imported (scribe39.mjs), only lend the frames
if (import.meta.url === (await import('node:url')).pathToFileURL(process.argv[1]).href) {
  console.log(writeSheet('pelion/scribe', frames, layout, { app: 'adm-themes generators/pelion/scribe.mjs', anchors }));
  if (process.argv.includes('--print')) for (const [n, f] of Object.entries(frames)) console.log(n + '\n' + f.join('\n'));
}
