// Pelion (the school of Chiron): the mentor's exedra, a low marble platform whose north end is a shallow curve, a curved
// marble bench running round it (its back lit along the top, the seat, the seat's front in the grey-blue shade) and
// ending in a scrolled arm each side, a paved floor of marble slabs inside it, a front riser with a painted red and blue
// band; the link a painted red cord twisted of two strands, its end a knot under a bronze cap.
import { grid, across, down } from './kit.mjs';

const exedra = w => {
  const cx = (w - 1) / 2, cy = 18, rx = w / 2, ry = 18, T = 47; // the top runs to row T, the riser below it
  const ell = (x, y, k) => ((x - cx) / (rx - k)) ** 2 + ((y - cy) / (ry - k)) ** 2;
  const inside = (x, y, k = 0) => x >= k && x <= w - 1 - k && (y >= cy ? y <= 53 - (k ? 0 : 0) : ell(x, y, k) <= 1 && y >= k);
  const bench = (x, y) => inside(x, y, 1) && !inside(x, y, 9) && y <= 38; // the seat band, to row 38
  return grid(w, 54, (x, y) => {
    if (!inside(x, y)) return null;
    if (!inside(x, y, 1) || y === 53) return 'k';
    if (y > T) return y === T + 1 ? 'k' : y === T + 2 ? 'X' : y === T + 3 ? (x % 6 < 3 ? 'x' : 'u') : y === 52 ? '6' : x <= 1 ? 'X' : x >= w - 2 ? '4' : 's'; // the riser
    if (y === T) return '4';
    if (bench(x, y)) {
      if (y === 38) return 'k'; // the bench's end
      if (y >= 35 && (x < 10 || x > w - 11)) return y === 35 ? 'X' : y === 37 ? '4' : (x === 3 || x === w - 4) ? '9' : 's'; // the scrolled arms
      if (!inside(x, y, 3)) return !inside(x, y, 2) ? '9' : 'X'; // the back: its outer face, its lit top
      if (!inside(x, y, 7)) return inside(x, y, 6) ? '8' : 's'; // the seat
      return !inside(x, y, 8) ? '4' : '9'; // the seat's front, in shade
    }
    if (!inside(x, y, 9) && y > 38) return y === 39 ? '4' : (x * 3 + y) % 23 === 0 ? '8' : 's'; // the platform's border
    // the paving inside: large square slabs, faint joints, a few veins
    return (x - Math.round(cx) + 60) % 12 === 6 || y % 12 === 4 ? '8' : (x * 5 + y * 3) % 31 === 0 ? '8' : 's';
  });
};

// The cord: two strands twisted, the lit one (x, lit ')') over the shaded one ((, '[' underneath).
const cord = (a, c) => (c === 0 || c === 5 ? null : c === 4 ? '[' : (a + c) % 4 < 2 ? (c === 1 ? ')' : 'x') : '(');

export default () => ({
  DAIS: exedra(80),
  DAIS_C: exedra(60),
  LINK_H: across(cord),
  LINK_V: down(cord),
  LINK_END: [
    '...kggk...',
    '..khhgGk..',
    '..k)xx(k..',
    '.k)x((x(k.',
    '.kx((x([k.',
    '.k(x[[([k.',
    '..k[[[[k..',
    '...kkkk...',
  ],
});
