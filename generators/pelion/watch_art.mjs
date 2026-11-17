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

const MIRROR = { h: 'G', ':': ';', b: 'B', X: 'b' };
// 16-px left halves mirrored into 32-px rows, the lit side's chars turned to shade on the right.
const sym = half => half.map(h => h + [...rev(h)].map(c => MIRROR[c] ?? c).join(''));

const CREST = [
  '............kkkk',
  '............kxxx',
  '............k(xx',
  '.............k(x',
  '.............k[x',
  '...........kkkkk',
];
// From the front: the dome, the eye holes, the nasal guard between them, the slit between the cheek pieces; the
// shield's rim shows behind the shoulders, either side of the neck.
const HEAD_DOWN = sym([
  ...CREST,
  '..........khhhgg',
  '.........khhgggg',
  '.........khggggg',
  '.........khgeeeg',
  '.........khgeegg',
  '.........khgggge',
  '.......kGkGggGke',
  '.....kkGGGkkkk;;',
]);
// From behind: the dome whole, the neck guard flaring.
const HEAD_UP = sym([
  ...CREST,
  '..........khhhgg',
  '.........khhgggg',
  '.........khggggg',
  '.........khggggg',
  '.........khggggg',
  '........khgggggg',
  '.......kGGGGGGGG',
  '.....kkGGkkkkkkk',
]);
// The body from the front: the cloak on the shoulders, the arms, the corselet, its band, the pteruges.
const BODY_DOWN = sym([
  '.....kkkkkkkkkkk',
  '.....k(x(kbbbbbb',
  '.....k::;kbXbbbb',
  '.....k::;kbbbbbb',
  '.....k::;kbBbbbb',
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
const LX = 22, LY = 23, LIGHT = [LX + 3, LY + 6];

// Facing right: the helmet in profile (its crest arching back, the eye hole and cheek piece at the front), the shield a
// bronze lens behind the shoulders, the spear upright behind it, the near arm bent forward to the lantern.
const RIGHT = [
  '..........kkkkkkk...............',
  '........kkxxxxxxxk..............',
  '.......kx((xxxxxxxk.............',
  '......kx(kkkkkkkkxk.............',
  '......kx(khhhhgggkk.............',
  '......k(khhhgggggggk............',
  '.....k[(khgggggggggk............',
  '.....k[khgggggggkkkk............',
  '.....kk.khggggggkeek............',
  '........khgggggggkek............',
  '........khgggggggggk............',
  '.......khGggggggGggk............',
  '.......kkkGGGGGkkkk.............',
  '...........kk::;k...............',
  '..........kkkkkkkkk.............',
  '.........k(xxbbbbbbk............',
  '.........kxxbbbbbbbk............',
  '.........kxbbbbbbbbk............',
  '.........kxbbbbbbbbk............',
  '.........kkuuuuuuuuk............',
  '.........kxbbbbbbbbk............',
  '.........kbkBkBkBkBk............',
  '.........kbkbkbkbkbk............',
  '.........kbkbkbkbkbk............',
  '.........kkkkkkkkkkk............',
];
const SHIELD_SIDE = ['..kk', '.khk', 'khgk', 'khgk', 'khgk', 'khgk', 'khgk', 'khgk', 'khgk', 'khgk', 'khgk', 'khGk', '.kGk', '..kk'];
const ARM_SIDE = [
  'kxxk.........',
  'k::;k........',
  'k::;k........',
  'k::;k........',
  'k::;kkkkkkkk.',
  'k:::::::::::k',
  '.kk;;;;;;;;;k',
  '...kkkkkkkkk.',
];
const LEG_SIDE = [
  [
    '...........k:::;k...............',
    '...........khggGk...............',
    '...........khggGk...............',
    '...........khggGk...............',
    '...........khggGk...............',
    '...........kkhgGk...............',
    '...........k;::;k...............',
    '...........kW;::;Wk.............',
    '...........kkkkkkkk.............',
  ],
  [
    '.........k:::;k:::;k............',
    '........khggGk.k::;k............',
    '.......khggGk...khggk...........',
    '.......khggGk...khggGk..........',
    '......khggGk.....khggGk.........',
    '......kkhgGk.....kkhgGk.........',
    '.....k;::;k.......k;::;k........',
    '.....kW;::;Wk.....kW;::;Wk......',
    '.....kkkkkkkk.....kkkkkkkk......',
  ],
  [
    '..........k:::;k::;k............',
    '..........khggGk:;k.............',
    '.........khggGk.khgGk...........',
    '.........khggGk.khggGk..........',
    '........khggGk...khggGk.........',
    '........kkhgGk...kkhgGk.........',
    '.......k;::;k.....k;::;k........',
    '.......kW;::;Wk...kW;::;Wk......',
    '.......kkkkkkkk...kkkkkkkk......',
  ],
];
const SPEAR_SIDE = ['.k.', 'khk', 'khk', 'kgk', '.k.', ...Array(29).fill('.L.'), '.g.', '.k.'];

// ring: the frame-left arm raised, the bronze bell high in the fist, the spear set down.
const noSpearArm = rows => put(rows, 15, 24, 2, '.......'); // clears x 2..8
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
  const turned = (rows, d) => rows.map((r, j) => (j >= 6 && j <= 12 ? (d > 0 ? '.' + r.slice(0, 31) : r.slice(1) + '.') : r));
  const spear = [SPEAR, 2, 0], lantern = [LANTERN, LX, LY], shield = [SHIELD_BACK, 6, 12];
  const flat = {}, iso = {};
  for (const i of [0, 1, 2]) {
    flat[`down ${i}`] = frame(DOWN, fit(LEGS_FRONT[i], 10), spear, lantern);
    flat[`up ${i}`] = frame(UP, fit(LEGS_FRONT[i], 10), shield, spear, lantern);
    flat[`right ${i}`] = frame(RIGHT, fit(LEG_SIDE[i], 11), [SPEAR_SIDE, 3, 0], [SHIELD_SIDE, 5, 12], [ARM_SIDE, 12, 15], lantern);
    iso[`S ${i}`] = flat[`down ${i}`];
    iso[`N ${i}`] = flat[`up ${i}`];
    iso[`E ${i}`] = frame(turned(DOWN, 1), fit(LEGS_FRONT[i], 10), spear, lantern);
    iso[`W ${i}`] = frame(turned(UP, -1), fit(LEGS_FRONT[i], 10), shield, spear, lantern);
  }
  flat.ring = frame(noSpearArm(DOWN), fit(LEGS_FRONT[0], 10), [BELL_ARM, 1, 2], lantern);
  iso.ring = flat.ring;
  const anchors = { feet: [16, 36], light: LIGHT };
  return { flat, iso, flatAnchors: anchors, isoAnchors: anchors };
};
