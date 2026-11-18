// Pelion's Palaistra: the wrestling ground of Chiron's school. Raked sand (P, specks p Q), a low kerb of marble blocks
// (lit arris X, face s, grey-blue shade 4, joints 6), small marble stelae with a red painted band for posts, and the
// gate: a herm (a square marble pillar with a bearded head) beside an olive-wood paling gate on bronze hinges; open,
// the leaf swung back flat against the far post over a marble sill.
import { grid, edge } from './kit.mjs';

const hash = (x, y) => ((x * 73 + y * 151 + x * y * 17) % 97 + 97) % 97;

// The post: a small marble stele, its head a palmette (anthemion), a red band under it, a stepped foot.
const POST = [
  '.kkkk.',
  'kXpXsk',
  '.kxxk.',
  'kXss4k',
  'kXxxxk',
  'kXss4k',
  'kXss4k',
  'kXss4k',
  'kXss4k',
  'kXss4k',
  'kXss4k',
  'k7884k',
  'k9996k',
  'kkkkkk',
];

// The herm, 6 wide, 20 tall: the bearded head (hair and beard the dark joint grey 6, face s lit X, the brows dark), the square shaft with its
// arm tenons, a plinth.
const HERM = [
  '.kkkk.',
  'k6666k',
  'k6Xs6k',
  'kskksk',
  'kXss4k',
  'k6ss6k',
  'k6666k',
  '.k66k.',
  'kkkkkk',
  '6Xss46',
  'kXss4k',
  'kXss4k',
  'kXss4k',
  'kXss4k',
  'kXss4k',
  'kXss4k',
  'kXss4k',
  'k7884k',
  'k9996k',
  'kkkkkk',
];
// The far post: a slim marble jamb, 3 wide, from row 6.
const JAMB = ['kkk', 'kxk', 'kXk', 'kXk', 'kXk', 'kXk', 'kXk', 'kXk', 'kXk', 'kXk', 'kXk', 'kXk', 'k9k', 'kkk'];

// An olive-wood paling: pointed tops, lit palings (L) and shaded (w), two rails (W), bronze hinges (g) on the left.
const paling = (x, y, w, top) => {
  if (y === top) return x % 2 === 0 ? 'k' : '.';
  if (y === top + 2 || y === top + 7) return x === 0 ? 'g' : 'W';
  if (x % 2 === 1) return 'k';
  return y === top + 1 ? 'L' : (x + y) % 5 === 0 ? 'w' : 'L';
};

export default () => {
  const front = open => grid(16, 20, (x, y) => {
    if (x < 6) return HERM[y][x];
    if (x >= 13) return y < 6 ? '.' : JAMB[y - 6][x - 13];
    if (y === 19) return 'k';
    if (y === 18) return open ? 'X' : 'k';
    if (open) return x === 12 && y >= 8 ? (y === 8 ? 'k' : 'w') : x === 11 && y >= 8 ? (y === 8 ? 'k' : 'L') : '.';
    return y >= 8 ? paling(x - 6, y, 7, 8) : '.';
  });
  return {
    // Raked sand: a few lighter grains and darker pits, no grid.
    BREAKOUT_FLOOR: grid(16, 16, (x, y) => {
      const h = hash(x, y);
      return h < 3 ? 'p' : h > 93 ? 'Q' : h % 29 === 0 ? 'q' : 'P';
    }),
    // The kerb: low marble blocks (8 px), a lit arris, a shaded foot; rows 0..2 clear.
    BREAKOUT_RAIL: grid(16, 10, (x, y) => (y < 3 ? '.' : y === 3 || y === 9 ? 'k' : y === 4 ? 'X'
      : x % 8 === 0 ? '6' : y === 8 ? '4' : x % 8 === 1 ? 'X' : 's')),
    // The kerb from above: its lit arris and face, a joint every 8 px.
    BREAKOUT_SIDE: grid(4, 16, (x, y) => (edge(x, 4) ? 'k' : y % 8 === 0 ? '6' : x === 1 ? 'X' : 's')),
    BREAKOUT_POST: POST,
    // The closed gate from above: the paling's top rail, olive wood, bronze hinges at its ends.
    BREAKOUT_GATE: grid(4, 16, (x, y) => (edge(x, 4) ? 'k' : y < 2 || y > 13 ? 'g' : y % 2 ? 'w' : x === 1 ? 'L' : 'w')),
    // Swung open: the whole paling leaf (16 px, the gap's width) beside the side.
    BREAKOUT_GATE_OPEN: grid(16, 10, (x, y) => (y < 1 ? '.' : y === 9 ? 'k' : paling(x, y, 16, 1))),
    BREAKOUT_GATE_FRONT: front(false),
    BREAKOUT_GATE_FRONT_OPEN: front(true),
  };
};
