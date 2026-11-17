// Argos, the night watchman of Pelion: a hoplite on his rounds. A bronze Corinthian helmet (lit h, g, shade G) with a
// red horsehair crest (x, shade ( [), its eye holes and the slit between the cheek pieces dark (e); a linen corselet
// (b, shade B) with a blue painted band at the waist (u) and a skirt of linen strips (pteruges); a short red cloak (x)
// over the shoulders; bare arms (: ;); bronze greaves; sandals (W). His round bronze shield (aspis) hangs on his back:
// from the front its rim shows either side of him, from behind it covers him, an eye painted on it (Argos who sees),
// from the side it is a lens of bronze behind his shoulders. He carries a spear in his frame-left hand (front and back;
// upright behind him from the side) and a bronze lantern with horn panes (O F) hanging from his frame-right hand: its
// panes' centre is the light anchor, the same in every frame. ring: he lays the spear by and raises a bronze hand bell
// (the kōdōn the Greek watch carried on its rounds). 32x36 art px: helmet and crest rows 0..13, body 14..25, legs
// 26..35.
import { stamp, frame, rev, put } from './kit.mjs';

const MIRROR = { h: 'G', ':': ';', b: 'B', X: 'b', x: '(' };
// 16-px left halves mirrored into 32-px rows, the lit side's chars turned to shade on the right.
const sym = half => half.map(h => h + [...rev(h)].map(c => MIRROR[c] ?? c).join(''));
// rows padded to 32 px on the right
const pad = rows => rows.map(r => (r + '.'.repeat(32)).slice(0, 32));

// From the front (rows 0..12): the crest seen end-on, a tall narrow red plume; the rounded bowl; the dark T of the face
// opening (two eye slits either side of the nose guard, the slot down between the cheek pieces); the beard in the slot,
// showing under the chin; the shield's rim behind the neck.
const HEAD_DOWN = sym([
  '..............kk',
  '.............kxx',
  '.............kxx',
  '.............kxx',
  '...........kkkxx',
  '..........khhhgg',
  '..........khgggg',
  '..........kgeeeg',
  '..........kgeegg',
  '..........khggge',
  '..........khggej',
  '..........kGgGkj',
  '........kGGGkkjj',
]);
// From behind: the plume, the bowl whole, the neck guard flaring.
const HEAD_UP = sym([
  '..............kk',
  '.............kxx',
  '.............kxx',
  '.............kxx',
  '...........kkkxx',
  '..........khhhgg',
  '..........khgggg',
  '..........khgggg',
  '..........khgggg',
  '..........khgggg',
  '.........khggggg',
  '.........kGGGGGG',
  '........kGGGkkkk',
]);
// The body from the front (rows 13..25): the cloak on the shoulders, the arms down, the corselet, its band, the pteruges.
const BODY_DOWN = sym([
  '.....kkkkkkkkkkk',
  '.....k(x(kbbbbbb',
  '.....k::;kbXbbbb',
  '.....k::;kbbbbbb',
  '.....k::;kbBbbbb',
  '.....k::;kbbbbbb',
  '.....k::;kuuuuuu',
  '.....k::;kbbbbbb',
  '.....k::;kBkBkBk',
  '.....k::;kbkbkbk',
  '.....k::;kbkbkbk',
  '.....kkkk.kkkkkk',
  '.........k:::;k.',
]);
// From behind: the cloak's red hem under the shield, the arms; the shield is stamped over (SHIELD_BACK).
const BODY_UP = sym([
  '.....kkkkkkkkkkk',
  '.....k(x(kxxxxxx',
  '.....k::;kxxxxxx',
  '.....k::;kxxxxxx',
  '.....k::;kxxxxxx',
  '.....k::;kxxxxxx',
  '.....k::;kxxxxxx',
  '.....k::;kxxxxxx',
  '.....k::;k(((((x',
  '.....k::;kbkbkbk',
  '.....k::;kbkbkbk',
  '.....kkkk.kkkkkk',
  '.........k:::;k.',
]);
// The shield from behind: a bronze disc (rim G, face h g), the painted eye in its middle. Stamped at (6, 12).
const SHIELD_BACK = (() => {
  const EYE = ['..kkkkk..', '.kXXuXXk.', 'kXXukuXXk', '.kXXuXXk.', '..kkkkk..'];
  return Array.from({ length: 15 }, (_, y) => Array.from({ length: 20 }, (_, x) => {
    const d = Math.hypot(x - 9.5, (y - 7) * 1.3);
    if (d > 10.2) return '.';
    if (d > 9.3) return 'k';
    if (d > 7.8) return x + y < 14 ? 'h' : 'G';
    const e = EYE[y - 5]?.[x - 6];
    if (e && e !== '.') return e;
    return d > 7 ? 'k' : x - y > 6 ? 'g' : 'h';
  }).join(''));
})();

// Legs: standing, and either foot lifted (front and back).
const LEG = [
  '.........k:::;k.',
  '.........khggGk.',
  '.........khggGk.',
  '.........khggGk.',
  '.........khggGk.',
  '.........kkhgGk.',
  '.........k;::;k.',
  '........kW;::;Wk',
  '........kkkkkkk.',
];
const LEG_UP = [LEG[0], ...LEG.slice(2), '................'];
const both = (l, r) => l.map((s, j) => s + [...rev(r[j])].map(c => MIRROR[c] ?? c).join(''));
const LEGS_FRONT = [both(LEG, LEG), both(LEG_UP, LEG), both(LEG, LEG_UP)];

// The spear in the frame-left hand: a bronze head, an ash shaft, the bronze butt spike; the fist round it at rows 22..23.
const SPEAR = [
  '.k.', 'khk', 'khk', 'kgk', '.k.',
  ...Array(17).fill('.L.'),
  'k::', 'k:;',
  ...Array(9).fill('.L.'),
  '.g.', '.k.',
];
// The lantern hanging from the frame-right hand: the fist, its bail, a conical cap, horn panes lit (O F), the base.
const LANTERN = [
  '..k:k..',
  '..k;k..',
  '...g...',
  '..kgk..',
  '.kghgk.',
  'kgOFOgk',
  'kgFFFgk',
  'kgOFOgk',
  '.kgggk.',
  '..kkk..',
];
const LX = 22, LY = 24, LIGHT = [LX + 3, LY + 6];

// Facing right: the Corinthian helmet in profile (the bowl, the crest a long arc from over the brow to the nape, the
// face guard with its eye slit, the cheek piece, the beard under it, the neck guard flaring behind), the body, the shield
// a bronze lens at his back, the spear upright behind it; the near arm hangs down along the body, a little forward, the
// lantern at knee height (stamped: ARM_SIDE, LANTERN).
const RIGHT = pad([
  '..........kkkkkk',
  '........kkxxxxxxkk',
  '.......kxx((((((xxk',
  '......kx(kkkkkkkk(xk',
  '......kx(khhhhggggkk',
  '......k[khhgggggggggk',
  '......k[khggggggggggk',
  '.......kkhgggggggeeek',
  '.........khggggggGegk',
  '.........khggggggGkek',
  '.........khgggggGkjjk',
  '.........kGGggggGkjk',
  '..........kGGkkkkkk',
  '...........kkkkkkkk',
  '..........k(xbbbbbbk',
  '..........kxbbbbbbbk',
  '..........kxbbbbbbbk',
  '..........kxbbbbbbbk',
  '..........kxbbbbbbbk',
  '..........kkuuuuuuuk',
  '..........kxbbbbbbbk',
  '..........kbkBkBkBkk',
  '..........kbkbkbkbkk',
  '..........kbkbkbkbkk',
  '..........kkkkkkkkkk',
]);
const SHIELD_SIDE = ['..kk', '.khk', 'khgk', 'khgk', 'khgk', 'khgk', 'khgk', 'khgk', 'khgk', 'khgk', 'khgk', 'khGk', '.kGk', '..kk'];
// The near arm from the shoulder (red cloak over it) down and a little forward to the fist at the lantern's bail.
const ARM_SIDE = [
  'kxxk....',
  'k::;k...',
  'k::;k...',
  '.k::;k..',
  '.k::;k..',
  '.k::;k..',
  '..k::;k.',
  '..k::;k.',
  '..k::;k.',
  '...k::;k',
  '...kk:kk',
];
// Facing left (39° W), the far arm swinging back from the shoulder to the lantern behind him.
const ARM_BACK = Array.from({ length: 11 }, (_, j) => {
  const x = Math.round(j * 0.75);
  return '.'.repeat(x) + (j === 0 ? 'kxxk' : j === 10 ? 'kk:kk' : 'k::;k');
});
// Legs in profile (rows 25..35): standing, and the two strides.
const LEG_SIDE = [
  [
    '............k:::;k',
    '............khggGk',
    '............khggGk',
    '............khggGk',
    '............khggGk',
    '............kkhgGk',
    '............k;::;k',
    '............kW;::;Wk',
    '............kkkkkkkk',
  ],
  [
    '..........k:::;k:::;k',
    '.........khggGk.k::;k',
    '........khggGk...khggk',
    '........khggGk...khggGk',
    '.......khggGk.....khggGk',
    '.......kkhgGk.....kkhgGk',
    '......k;::;k.......k;::;k',
    '......kW;::;Wk.....kW;::;Wk',
    '......kkkkkkkk.....kkkkkkkk',
  ],
  [
    '...........k:::;k::;k',
    '...........khggGk:;k',
    '..........khggGk.khgGk',
    '..........khggGk.khggGk',
    '.........khggGk...khggGk',
    '.........kkhgGk...kkhgGk',
    '........k;::;k.....k;::;k',
    '........kW;::;Wk...kW;::;Wk',
    '........kkkkkkkk...kkkkkkkk',
  ],
].map(pad);
const SPEAR_SIDE = ['.k.', 'khk', 'khk', 'kgk', '.k.', ...Array(29).fill('.L.'), '.g.', '.k.'];

// ring: the frame-left arm raised, the bronze bell high in the fist, the spear set down.
const noSpearArm = rows => put(rows, 14, 23, 2, '.......'); // clears x 2..8
const BELL_ARM = [
  '...kk....',
  '..kGgk...',
  '.khggGk..',
  '.khggGk..',
  'khgggGGk.',
  'kkkkkkkk.',
  '...kk.k:k',
  '......k:k',
  '......k:;k',
  '.....k::;k',
  '.....k::;k',
  '.....k::;k',
  '.....k::;k',
  '.....k(x(k',
  '.....kk::k',
  '......k::k',
  '......k:;k',
  '......k::k',
  '......k:;k',
  '.....kkkkk',
];

// Legs grown to n rows by repeating the greave's middle row (the bodies differ in height).
const fit = (legs, n) => { const a = [...legs]; while (a.length < n) a.splice(3, 0, a[3]); return a; };

export default () => {
  const DOWN = [...HEAD_DOWN, ...BODY_DOWN], UP = [...HEAD_UP, ...BODY_UP];
  const spear = [SPEAR, 2, 0], lantern = [LANTERN, LX, LY], shield = [SHIELD_BACK, 6, 12];
  const body = i => frame(RIGHT, fit(LEG_SIDE[i], 11), [SPEAR_SIDE, 4, 0], [SHIELD_SIDE, 6, 12]);
  const side = i => frame(body(i), [], [ARM_SIDE, 17, 13], lantern);
  // W faces left: the body mirrored, the lantern kept on the light anchor, carried in the far hand swung back behind him
  // (ARM_BACK, drawn under the body)
  const blank = Array(36).fill('.'.repeat(32));
  const west = i => frame(stamp(frame(blank, [], [ARM_BACK, 15, 13]), body(i).map(rev), 0, 0), [], lantern); // the far arm behind the body
  const flat = {}, iso = {};
  for (const i of [0, 1, 2]) {
    flat[`down ${i}`] = frame(DOWN, fit(LEGS_FRONT[i], 10), spear, lantern);
    flat[`up ${i}`] = frame(UP, fit(LEGS_FRONT[i], 10), shield, spear, lantern);
    flat[`right ${i}`] = side(i);
    iso[`S ${i}`] = flat[`down ${i}`];
    iso[`N ${i}`] = flat[`up ${i}`];
    iso[`E ${i}`] = side(i); // true profiles: E facing right, W its mirror facing left
    iso[`W ${i}`] = west(i);
  }
  flat.ring = frame(noSpearArm(DOWN), fit(LEGS_FRONT[0], 10), [BELL_ARM, 1, 1], lantern);
  iso.ring = flat.ring;
  const anchors = { feet: [16, 36], light: LIGHT };
  return { flat, iso, flatAnchors: anchors, isoAnchors: anchors };
};
