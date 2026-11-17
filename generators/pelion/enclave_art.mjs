// Pelion's custom room: a small walled garden court. Grass (v, silver blades Y, shade M) strewn with flowers in the
// rule's colour (the sash y, dyed), a low marble balustrade (a lit coping X over a fascia painted in the rule's colour,
// turned balusters, a plinth), small Doric columns for posts with a painted necking, and the gate an opening between two
// small columns under a lintel painted in the rule's colour, a ribbon of that colour tied across it (untied: it hangs
// from the far column).
import { grid, edge } from '../breakout_art/kit.mjs';

const hash = (x, y) => ((x * 37 + y * 101 + x * y * 13) % 89 + 89) % 89;

// The small column: a square abacus, the echinus, a necking painted in the sash, the fluted shaft, a base.
const COLUMN = [
  'kkkkkk',
  'kXss4k',
  '.kXs4k',
  '.kyyk.',
  '.kX94k',
  '.kX94k',
  '.kX94k',
  '.kX94k',
  '.kX94k',
  '.kX94k',
  '.kX94k',
  'kXss4k',
  'k9996k',
  'kkkkkk',
];

export default () => {
  // The balustrade, 10 rows: coping (0..1), the painted fascia (2), balusters (3..7), the plinth (8), its foot (9).
  const rail = (x, y) => {
    if (y === 0) return 'k';
    if (y === 1) return 'X';
    if (y === 2) return 'y';
    if (y === 8) return x % 8 === 0 ? '6' : 's';
    if (y === 9) return 'k';
    const b = x % 4; // a baluster every 4 px, lit on its left, its shadow on the right
    return b === 0 ? (y === 7 ? 'k' : '.') : b === 1 ? (y === 7 ? 's' : 'X') : b === 2 ? (y === 7 ? '9' : '4') : 'k';
  };
  // The gate: two small columns under a lintel painted in the sash; closed, a ribbon of it tied across, its ends hanging.
  const gate = open => (x, y) => {
    if (y < 4) return y === 0 || y === 3 ? 'k' : y === 1 ? 'X' : 'y';
    if (x < 4 || x > 11) {
      const c = x < 4 ? x : x - 12;
      if (y === 4) return c === 0 || c === 3 ? '.' : 'k';
      if (y >= 17) return y === 19 ? 'k' : c === 0 || c === 3 ? 'k' : '9';
      return c === 0 || c === 3 ? 'k' : c === 1 ? 'X' : y === 5 ? 'y' : '4';
    }
    if (y === 19) return 'k';
    if (open) return x === 11 && y > 9 && y < 16 ? (y === 15 ? 'x' : 'y') : null;
    if (y === 9) return 'y';
    if (y === 10 && (x === 7 || x === 8)) return 'x'; // the knot
    if ((x === 7 && y > 10 && y < 14) || (x === 8 && y > 10 && y < 13)) return 'y';
    return null;
  };
  return {
    // Grass with silver blades and shade, a few flowers in the rule's colour.
    ENCLAVE_FLOOR: grid(16, 16, (x, y) => {
      const h = hash(x, y);
      if ((x === 4 && y === 5) || (x === 12 && y === 13)) return 'y';
      if ((x === 4 && (y === 4 || y === 6)) || (y === 5 && (x === 3 || x === 5))) return 'Y';
      if ((x === 12 && (y === 12 || y === 14)) || (y === 13 && (x === 11 || x === 13))) return 'Y';
      if ((x === 10 && y === 3) || (x === 2 && y === 11)) return 'y';
      return h < 9 ? 'Y' : h > 80 ? 'M' : 'v';
    }),
    ENCLAVE_RAIL: grid(16, 10, rail),
    // The coping from above: lit, its painted edge in the rule's colour, a joint every 8 px.
    ENCLAVE_SIDE: grid(4, 16, (x, y) => (edge(x, 4) ? 'k' : y % 8 === 0 ? '6' : x === 1 ? 'X' : 'y')),
    ENCLAVE_POST: COLUMN,
    // The ribbon across the opening from above, its knot in the middle.
    ENCLAVE_GATE: grid(4, 16, (x, y) => (x === 1 || x === 2 ? (y === 7 || y === 8 ? 'x' : 'y') : '.')),
    // Untied: the ribbon hangs down from the near column.
    ENCLAVE_GATE_OPEN: grid(16, 10, (x, y) => (x === 15 ? (y === 9 ? 'x' : 'y') : x === 14 && y > 5 ? 'y' : '.')),
    ENCLAVE_GATE_FRONT: grid(16, 20, (x, y) => gate(false)(x, y) ?? '.'),
    ENCLAVE_GATE_FRONT_OPEN: grid(16, 20, (x, y) => gate(true)(x, y) ?? '.'),
  };
};
