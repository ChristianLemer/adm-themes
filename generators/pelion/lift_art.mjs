// Pelion (the school of Chiron): the mēchanē, the crane of the Greek theatre that lowers a player from the skene's
// roof. The shaft two olive-wood uprights lashed with rope; its head the crane's great beam with a pulley (a wooden
// wheel on a bronze axle) where the rope runs; its pit a marble footing; the cable a twisted rope; the car a wicker
// basket hung from a bronze hook by four ropes, a plaited rim, its front a wicker flap that drops open on rope hinges;
// the floor a marble cornice (a red painted band over dentils) ending on a console; the call lamp a small oil torch.
import { world, disc } from './kit.mjs';

// The uprights, x 0..3 and 52..55: lit on the left of each, a rope lashing every 16 rows.
const upright = (x, y) => {
  const i = x < 4 ? x : x > 51 ? 55 - x : -1;
  if (i < 0) return null;
  if (y % 16 === 6 || y % 16 === 7) return i === 0 ? 'k' : (x + y) % 2 ? 'q' : 'Q';
  return i === 0 ? 'k' : i === 3 ? 'W' : x < 4 ? (i === 1 ? 'L' : 'w') : (i === 1 ? 'W' : 'w');
};
const wheel = disc(28, 7.5, 4.5);
// Wicker: a twill of lit (q) and shaded (Q) strands, a darker strand (W) between the courses every 3 rows.
const weave = (x, y) => (y % 3 === 0 ? ((x >> 1) % 2 ? 'W' : 'Q') : (x + 2 * y) % 4 < 2 ? 'q' : 'Q');
// The basket's front, rows 28..39, its lower corners rounded; a flap (x 18..33) for the door.
const basket = (x, y) => y >= 28 && x >= (y > 36 ? y - 36 : 0) && x <= 51 - (y > 36 ? y - 36 : 0);
const rim = y => y === 28 ? 'k' : y === 29 ? 'q' : y === 30 ? 'Q' : null;
// a straight line from (x0, y0) to (x1, y1): true on it
const line = (x0, y0, x1, y1) => (x, y) => y >= y0 && y <= y1 && Math.abs(x - (x0 + (x1 - x0) * (y - y0) / (y1 - y0))) < 0.6;
const backRopes = [line(25, 3, 6, 22), line(26, 3, 45, 22)], frontRopes = [line(25, 3, 1, 28), line(26, 3, 50, 28)];
const hook = (x, y) => (y <= 3 && x >= 24 && x <= 27 ? (y === 0 ? (x === 25 || x === 26 ? 'k' : null) : y === 3 ? 'G' : x === 24 || x === 27 ? 'k' : y === 1 ? 'h' : 'g') : null);
const front = flap => (x, y) => {
  if (frontRopes.some(f => f(x, y)) && y < 28) return 'P';
  if (!basket(x, y)) return null;
  const door = x >= 18 && x <= 33;
  if (door && flap === 'open') return y >= 37 ? (y === 37 ? 'q' : y === 39 ? 'k' : 'Q') : x === 18 || x === 33 ? (y < 31 ? 'k' : 'W') : null;
  if (door && flap === 'half') { // the flap tipping outward: shorter, its inner face in shadow above it
    if (y < 33) return x === 18 || x === 33 ? 'k' : null;
    if (y === 33) return 'k';
    if (y === 34) return 'Q';
    return y === 39 ? 'k' : (x + y) % 2 ? 'W' : 'Q';
  }
  if (y === 39 || ((x === 0 || x === 51 || x === y - 36 || x === 87 - y) && y > 28)) return 'k';
  if (door && (x === 18 || x === 33)) return 'k'; // the flap's edges
  if (door && y === 33 && x >= 31 && x <= 32) return 'h'; // its bronze toggle
  return rim(y) ?? weave(x, y);
};

export default () => world({
  SHAFT: (x, y) => upright(x, y),
  SHAFT_TOP: (x, y) => {
    if (y <= 4) return y === 0 || y === 4 ? 'k' : y === 1 ? 'L' : x % 12 === 6 && y === 2 ? 'W' : 'w'; // the great beam
    if (wheel(x, y)) {
      const d = Math.hypot(x + 0.5 - 28, y + 0.5 - 7.5);
      return d > 3.6 ? 'k' : d < 1.3 ? 'g' : d < 2 ? 'k' : (x + y) % 3 ? 'L' : 'w';
    }
    if ((x === 23 || x === 32) && y <= 7) return 'W'; // the cheeks holding the axle
    if (y === 5) return x < 4 || x > 51 ? 'W' : null; // the beam's shadow on the uprights
    return upright(x, y);
  },
  SHAFT_PIT: (x, y) => (y < 2 ? upright(x, y) : y === 2 ? 'k' : y === 3 ? 'X' : (x + (y > 5 ? 6 : 0)) % 14 === 0 ? '6' : y === 7 ? '4' : 's'),
  CABLE: (x, y) => ((x + y) % 2 ? 'Q' : 'q'),
  CAR_BACK: (x, y) => {
    const h = hook(x, y);
    if (h) return h;
    if (backRopes.some(f => f(x, y))) return 'Q';
    if (y < 22 || x < 3 || x > 48) return null;
    if (y === 22) return 'k';
    if (y === 23) return 'q';
    if (y === 24) return 'Q';
    return x === 3 || x === 48 ? 'k' : weave(x, y) === 'q' ? 'Q' : weave(x, y) === 'Q' ? 'W' : 'k'; // its inside, in shade
  },
  'CAR_FRONT.shut': front('shut'),
  'CAR_FRONT.half': front('half'),
  'CAR_FRONT.open': front('open'),
  SLAB: (x, y) => (y === 0 ? 'X' : y <= 2 ? 's' : y === 3 ? 'x' : y === 4 ? 'k' : y <= 7 ? (x % 4 === 3 ? '6' : x % 4 === 0 ? 'X' : 's') : y === 8 ? '4' : y <= 10 ? '9' : 'k'),
  SLAB_L: (x, y) => (y <= 4 ? (y === 0 ? 'X' : y === 3 ? 'x' : y === 4 ? 'k' : x === 0 ? 'k' : 's') // the console under its end
    : x < y - 5 ? null : x === y - 5 ? 'k' : y === 11 ? 'k' : x === y - 4 ? 'X' : (x + y) % 5 === 0 ? '4' : 's'),
  'LAMP.off': (x, y) => ['......', '......', '..kkk.', '.kghgk', '..kGk.', '...W..'][y][x].replace('.', '') || null,
  'LAMP.on': (x, y) => ['...F..', '..fFf.', '..fFf.', '.kghgk', '..kGk.', '...W..'][y][x].replace('.', '') || null,
});
