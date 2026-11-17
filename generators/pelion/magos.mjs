// Pelion's master (the magos family): Chiron the centaur, at rest on his rock ledge (THRONE, sanctum.mjs, which the
// app draws first, 8 art px right of and below the body's top-left; the body goes over it).
// Run from the Administratum root: node <this file>. Writes ui/art/pelion/magos.png + .json.
//
// body (48x48): the centaur lying on folded legs, side on and facing left, the man turned three-quarters to us.
//   The man: an old teacher, grey-brown hair and a long grey beard (S Q 7, brows ]), a laurel wreath (v Y M), the face
//   three-quarters left; bare-chested (skin : ;), a small bronze pendant on a cord under the beard (h g G, where the app
//   pulses the chest light), the himation of undyed linen with a blue border (R r d, u) over his left shoulder and
//   down across the chest to the hip; his right upper arm down his side (the forearm and staff are the arm frame), his
//   left arm down to the hand resting on a scroll (P p) laid across his back. The skin turns to the coat at his waist.
//   The horse: a chestnut (l lit, T, Z shade; l and T are retuned in theme.json) in three masses, shoulder, barrel and
//   haunch, each lit on its upper left, a crease where shoulder and haunch meet the barrel (Z j); the croup high and
//   round, the tail dark (j, strands w) falling from it onto the fleece; the near foreleg folded with its knee forward,
//   the far knee beside it, the hooves (A) tucked; the near hind leg folded, the hock behind, the cannon forward
//   along the fleece. Rows 42-47 are left clear: the ledge's face and the fleece's locks show there.
// arm (10x48): his right forearm and hand round the staff (olive wood L w), planted beside him, its foot on the floor
//   (row 47); the app swings it 1 px about its anchor: the staff leaning a little, a slow gesture.
// claw (6x3): his left forefinger raised over the scroll: the app shows it now and then, so the finger lifts and falls
//   back on the scroll, a tap.
const { writeSheet } = await import(process.cwd() + '/tools/sheet_writer.mjs');

const grid = (w, h) => Array.from({ length: h }, () => Array(w).fill('.'));
const dot = (g, x, y, c) => { if (g[y]?.[x] !== undefined) g[y][x] = c; };
const put = (g, x, y, rows) => rows.forEach((r, j) => [...r].forEach((c, i) => { if (c !== '.') dot(g, x + i, y + j, c); }));
const rows = g => g.map(r => r.join(''));

const BODY = [
  '..................kvkYkvk.......................',
  '.................kvYvMvYMk......................',
  '................kYMS7S7SMvk.....................',
  '...............kvM::S7SSQMvk....................',
  '...............kY::::S7SSQYk....................',
  '...............k:]]:;]]S7SQk....................',
  '...............k:k::;k;;SQQk....................',
  '................k;::;;;;SSQk....................',
  '...............k;77;;77SSQQk....................',
  '................k7S77S7SQQk.....................',
  '.................kS7SS7SQQSk....................',
  '.............kkkkk7SS7SSkQQkk...................',
  '............k:::::kS7SSkuRRrrk..................',
  '...........k:::::::kkSkuRRrrdk..................',
  '...........k::::khgk:;uRRrrdkkkk................',
  '..........k::;::hggG;uRRrrdk:;;k................',
  '..........k::;::kGGkuRRrrd;k:;;k................',
  '..........k::;;;;;;uRRrrd;;k:;;k................',
  '..........k::;:::;uRRrrd:;;k:;;k................',
  '..........k::;::;uRRrrd;:;;k:;;k................',
  '..........k;:;:;uRRrrd;::;;k:;;;k...............',
  '..........kkk:;uRRrrd;:::;;kk:;;k......kkk......',
  '............k;uRRrrd;::::;;k.k:;;k....klllk.....',
  '............kuRRrrd;:::::;;k..k:;;k..klllllkkk..',
  '............kRrd::::::;;;;;k..k:;;:kklllllllkwjk',
  '...........kllT;::::;;;lTlTTlkP:;;:pPklllllTkjwk',
  '..........kkllTl;Tl:TT;TlTTllkPPPPPPPklllTTTkjjw',
  '..........klllllTZllllllllllllTTTTZlllllTTTTkjwj',
  '.........klllllTTTZlllllllllTTTTTTZllllTTTTTkwjj',
  '........klllllTTTTZlllllllTTTTTTTTZlllTTTTTTkjjw',
  '........klllTTTTTTTjlllTTTTTTTTTTTjllTTTTTTTkjwj',
  '........kllTTTTTTTTjlTTTTTTTTTTTTTjTTTTTTTTTkwjj',
  '........klTTTTTTTZZjTTTTTTTTTTTTTZjTTTTTTTTZkjjw',
  '........kTTTTTTTZZjTTTTTTTTTTTTZZZjTTTTTTTZZkjwj',
  '.........kTTTTTZZZjTTTTTTTTTTZZZZZZjTTTTZZZZkwjj',
  '..........kTTZZZZZTTTTTTTTZZZZZZZZZZTTTZZZZZkjjw',
  '........kkllTZkZZZTTTTTTZZZZZZZZZZZZZTZZZZZkjwjj',
  '.......kllTTZZkZTTTTTTZZZZZZZZZZkZTTTTTZZZkjjwjw',
  '......klTZZkkkkZjZkkkkkkkkkkkkkkkkkkkkkZTTTZkjwj',
  '.....kTZlllllllAAk..........kAAllllllllllTZkjwjw',
  '......kZTTTTTZZAAAk........kAAATTTTTTTTZZZkwjjwj',
  '.......kkkkkkkkkkkk.........kkkkkkkkkkkkkkkkkkkk',
  '................................................',
  '................................................',
  '................................................',
  '................................................',
  '................................................',
  '................................................',
];

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
// claw over his left hand on the scroll
export const ANCHORS = { arm: [1, 0], chest: [16, 14], eyeL: [17, 6], eyeR: [21, 6], claw: [34, 22] };

for (const [n, f] of Object.entries(FRAMES)) if (new Set(f.map(r => r.length)).size !== 1) throw new Error(`magos ${n}: ragged rows`);

if (import.meta.url === `file://${process.argv[1]}`) {
  console.log(writeSheet('pelion/magos', FRAMES, [['body', 'arm', 'claw']], { app: 'Pelion theme art (adm-themes generators/pelion/magos.mjs)', anchors: ANCHORS }));
}
