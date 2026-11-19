// Pelion's master (the magos family): Chiron the centaur, at rest on his rock ledge (THRONE, sanctum.mjs, which the
// app draws first, 8 art px right of and below the body's top-left; the body goes over it).
// Run from the Administratum root: node <this file>. Writes ui/art/pelion/magos.png + .json.
//
// body (48x48): the centaur lying on folded legs, side on and facing left, the man rising straight from the horse's
//   chest at the front, upright, turned three-quarters to us. The man: an old teacher, his head held level over his
//   shoulders, grey hair under a laurel wreath (v Y M), open eyes (X, pupils k) under grey brows, the nose, a long
//   groomed grey beard (S 7 Q) falling onto the chest; bare-chested (skin : ;), a small bronze pendant on a cord (h g
//   G, where the app pulses the chest light), the himation of undyed linen with a blue border (R r d, u) over his left
//   shoulder and across the chest to the hip; his right upper arm down his side (the forearm and staff are the arm
//   frame), his left forearm forward, the hand on a scroll (P p) laid on the horse's back. The skin turns to the coat
//   at his waist. The horse: a chestnut (l lit, T, Z shade) in three masses, shoulder and chest under the man, the
//   barrel lower, the haunch high and round behind, each lit on its upper left, creases (j) where they meet; the near
//   foreleg folded under the chest, knee forward, the cannon back along the floor to the hoof (A); the far knee beside
//   it; the near hind leg folded, the hock behind, the cannon forward; the dark tail (j w) falling from the croup.
//   Rows 42-47 are left clear: the ledge's face and the fleece's locks show there.
// arm (10x48): his right forearm and hand round the staff (olive wood L w), planted beside him, its foot on the floor
//   (row 47); the app swings it 1 px about its anchor: the staff leaning a little, a slow gesture.
// claw (6x3): his left forefinger raised over the scroll: the app shows it now and then, so the finger lifts and falls
//   back on the scroll, a tap.
const { writeSheet } = await import(process.cwd() + '/tools/sheet_writer.mjs');

const grid = (w, h) => Array.from({ length: h }, () => Array(w).fill('.'));
const dot = (g, x, y, c) => { if (g[y]?.[x] !== undefined) g[y][x] = c; };
const put = (g, x, y, rows) => rows.forEach((r, j) => [...r].forEach((c, i) => { if (c !== '.') dot(g, x + i, y + j, c); }));
const rows = g => g.map(r => r.join(''));

// The body, built: the horse's three masses as shaded ellipses (lit on the upper left), the folded legs, the tail, then
// the man rising straight from the horse's chest at the front (the left), his head over his shoulders, and last the
// outline round everything.
function body() {
  const W = 48, g = grid(W, 48);
  const shade = (dx, dy) => (dx + dy < -0.55 ? 'l' : dx + dy > 0.7 ? 'Z' : 'T');
  const mass = (cx, cy, rx, ry) => { for (let y = 0; y < 42; y++) for (let x = 0; x < W; x++) { const dx = (x - cx) / rx, dy = (y - cy) / ry; if (dx * dx + dy * dy <= 1) g[y][x] = shade(dx, dy); } };
  // the horse lying, facing left: the barrel, the haunch high and round at the back, the shoulder and chest at the front
  mass(25, 34, 12, 4);
  mass(37, 29, 8, 8);
  mass(12, 31, 8, 6);
  // the belly in shade along the floor
  for (let x = 8; x <= 42; x++) if (g[37][x] !== '.') g[37][x] = 'Z';
  // the creases where shoulder and haunch meet the barrel
  for (let y = 28; y <= 37; y++) { dot(g, 21 + Math.round((y - 28) / 4), y, 'j'); }
  for (let y = 27; y <= 37; y++) { dot(g, 30 - Math.round((y - 27) / 5), y, 'j'); }
  // the tail falling from the croup onto the fleece
  for (let y = 24; y <= 40; y++) { const x = 44 + Math.round((y - 24) / 6); put(g, x, y, [y % 3 ? 'jw' : 'wj']); }
  // the near foreleg folded under the chest, the knee forward, the cannon back along the floor, the hoof
  put(g, 5, 34, ['kkkkk', 'klTTZk', 'klTTTZk']); put(g, 2, 37, ['klTTTZkkkkkk', 'klTTTTTTTTTTZAAk', '.kZZZZZZZZZZZAAk']);
  // the far foreleg's knee beside it, in shade
  put(g, 16, 37, ['jZZ', 'jZZZ']);
  // the near hind leg folded: the hock behind under the haunch, the cannon forward along the floor, the hoof
  put(g, 37, 35, ['kkkkkk', 'klTTTlk', '.klTTTlk']); put(g, 26, 38, ['kkkkkkkkkkklTTTTZk', 'kAAlTTTTTTTTTTTTTZk', 'kAAZZZZZZZZZZZZZZk']);
  // the man: his torso rising from the chest, skin lit on the left, shaded on the right, the pectorals and the belly
  for (let y = 13; y <= 27; y++) {
    const xl = y < 15 ? 6 : 5, xr = y < 15 ? 20 : 21;
    for (let x = xl; x <= xr; x++) g[y][x] = x >= xr - 1 ? ';' : ':';
  }
  put(g, 7, 18, [';;;;.;;;;']); put(g, 12, 21, [';']); put(g, 12, 23, [';']); put(g, 11, 24, [';']);
  // the skin turns to the coat at his waist
  for (let x = 5; x <= 21; x++) { g[26][x] = x % 3 ? ':' : 'l'; g[27][x] = 'l'; }
  // his right arm (screen left), the shoulder and the upper arm down to the elbow (the forearm and staff: the arm frame)
  put(g, 3, 14, ['.:::', '::::', ':::;', ':::;', '::;', '::;', '::;']);
  // the himation: a linen band with a blue border from his left shoulder across the chest to his right hip, and over
  // the left shoulder, falling behind
  for (let y = 13; y <= 25; y++) { const x0 = Math.round(19 - (y - 13) * 1.2); put(g, x0, y, ['uRRrd']); }
  put(g, 17, 12, ['RRRRrr', 'RRRrrrd', '.RRrrdd', '..Rrrdd', '..rrdd', '...rdd']);
  // the bronze pendant on its cord under the beard
  put(g, 11, 14, ['k.k', '.k.']); put(g, 11, 16, ['hg', 'gG']);
  // his left arm (screen right): the upper arm down his side, the forearm forward, the hand on the scroll on the
  // horse's back
  put(g, 22, 15, [':;', ':;', ':;', ':;;', '.:;;', '..::;', '...::;']);
  put(g, 23, 24, ['kPpppppppPk', 'kPPPPPPPPPk']);
  put(g, 25, 22, ['::;', ':;;']);
  // the head, three-quarters to the left: the wreath, grey hair behind, the face lit, open eyes under grey brows, the
  // nose, a long grey beard falling onto the chest
  put(g, 7, 0, [
    '....kkkkkk....',
    '...kS77S7Sk...',
    '..kS7SS77SQk..',
    '.kvYvMvYvMYvk.',
    '.k:::::;S7SQk.',
    '.k:77:77;SSQk.',
    '.k:kX:kX;:SQk.',
    '.k::::;:;7SQk.',
    '.k7::;;:77SQk.',
    '.k77S;;S77SQk.',
    '.k7S7777S7SQk.',
    '..k7S7S77SQk..',
    '..k77S77S7Qk..',
    '...k7S7S7Qk...',
    '....k77S7k....',
    '.....kS7k.....',
  ]);
  // the outline: every empty pixel touching a drawn one
  const o = g.map(r => [...r]);
  for (let y = 0; y < 42; y++) for (let x = 0; x < W; x++) if (g[y][x] === '.' && [[1, 0], [-1, 0], [0, 1], [0, -1]].some(([dx, dy]) => { const c = g[y + dy]?.[x + dx]; return c && c !== '.' && c !== 'k'; })) o[y][x] = 'k';
  return rows(o);
}
const BODY = body();

// His right forearm, the hand round the staff planted beside him, its foot on the floor (the staff the frame's height).
export function arm() {
  const g = grid(10, 48);
  for (let y = 1; y < 47; y++) put(g, 0, y, ['kLwk']);
  put(g, 0, 0, ['.kk.']); put(g, 0, 47, ['kkkk']);
  put(g, 0, 20, [
    'kLwk..kkk.',
    'kLwkkk:::k',
    'kk:::::;;k',
    'k::::;;kk.',
    'k:;:;;k...',
    'k;;;;k....',
    'kLwkk.....',
  ]);
  return rows(g);
}

export const FRAMES = { body: BODY, arm: arm(), claw: ['..k...', '.k:k..', '.k:k..'] };
// arm at the staff's top-left; chest on the pendant (the app's scan line runs over its 4 x 3 px); eyeL, eyeR his eyes;
// claw over his left hand on the scroll; the eyes on the whites, where the app's glint reads as a catchlight
export const ANCHORS = { arm: [1, 0], chest: [11, 16], eyeL: [11, 6], eyeR: [14, 6], claw: [24, 20] };

for (const [n, f] of Object.entries(FRAMES)) if (new Set(f.map(r => r.length)).size !== 1) throw new Error(`magos ${n}: ragged rows`);

if (import.meta.url === `file://${process.argv[1]}`) {
  console.log(writeSheet('pelion/magos', FRAMES, [['body', 'arm', 'claw']], { app: 'Pelion theme art (adm-themes generators/pelion/magos.mjs)', anchors: ANCHORS }));
}
