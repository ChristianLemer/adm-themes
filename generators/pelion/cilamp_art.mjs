// Pelion's CI lamp, one by each student (tools/cilamp_art/pelion.mjs, run as `node tools/cilamp_art.mjs pelion`): a
// small bronze lamp-stand, its lens in a bronze housing under a cap, on a slim marble shaft with a moulded foot. The
// lens is the base lamp's place (columns 3..6, rows 3..6, its centre the anchor [5, 5]), its chars the frame's signal
// chars, the same as the base lamp's; the housing uses none of them. As the base lamp (Administratum #44) the verdict
// reads without colour: running the round lens (bronze corners) with its glint and shade, blinking; a pass a square
// lens with a bright check cut in it; a fail a dark X; unlit a flat dark glass.
// Slots: bronze h (lit) U, marble X s 9, outline k.
const SHAPE = [
  '...kkkk...',
  '..khhhhk..',
  '.khUUUUhk.',
  '.kU....Uk.',
  '.kU....Uk.',
  '.kU....Uk.',
  '.kU....Uk.',
  '.khUUUUhk.',
  '..kkhhkk..',
  ...Array(8).fill('...kX9k...'),
  '..kXss9k..',
  '.kXXss99k.',
  '.kkkkkkkk.',
];
// the lens's 4 x 4 block per state, from its chars: main, glint, shade
const LENS = {
  round: (L, Hi, S) => ['U' + L + L + 'U', L + Hi + L + S, L + L + L + S, 'U' + S + S + 'U'],
  pass: (L, Hi) => [L + L + L + L, L + L + L + Hi, Hi + L + Hi + L, L + Hi + L + L],
  fail: L => ['k' + L + L + 'k', L + 'kk' + L, L + 'kk' + L, 'k' + L + L + 'k'],
  off: L => ['U' + L + L + 'U', L + L + L + L, L + L + L + L, 'U' + L + L + 'U'],
};
const lamp = rows => SHAPE.map((r, y) => (y >= 3 && y <= 6 ? r.slice(0, 3) + rows[y - 3] + r.slice(7) : r));
export default () => ({
  'CILAMP.off': lamp(LENS.off('n')),
  'CILAMP.amber': lamp(LENS.round('f', 'F', 'g')),
  'CILAMP.amber_dim': lamp(LENS.round('g', 'f', 'G')),
  'CILAMP.green': lamp(LENS.pass('c', 'O')),
  'CILAMP.red': lamp(LENS.fail('a')),
});
