// Pelion's CI lamp, one by each student (tools/cilamp_art/pelion.mjs, run as `node tools/cilamp_art.mjs pelion`): a
// small bronze lamp-stand, its lens in a bronze housing under a cap, on a slim marble shaft with a moulded foot. The
// lens is the base lamp's place (columns 3..6, rows 3..6, its centre the anchor [5, 5]), its chars the frame's signal
// chars, the same as the base lamp's; the housing uses none of them.
// Slots: bronze h (lit) U, marble X s 9, outline k.
const SHAPE = [
  '...kkkk...',
  '..khhhhk..',
  '.khUUUUhk.',
  '.kU+***Uk.',
  '.kU****Uk.',
  '.kU****Uk.',
  '.kU**--Uk.',
  '.khUUUUhk.',
  '..kkhhkk..',
  ...Array(8).fill('...kX9k...'),
  '..kXss9k..',
  '.kXXss99k.',
  '.kkkkkkkk.',
];
const LIT = { 'CILAMP.off': ['n', 'M', 'k'], 'CILAMP.amber': ['f', 'F', 'g'], 'CILAMP.amber_dim': ['g', 'f', 'G'], 'CILAMP.green': ['c', 'O', 'C'], 'CILAMP.red': ['a', 'F', 'x'] };
export default () => Object.fromEntries(Object.entries(LIT).map(([n, [L, Hi, S]]) => [n, SHAPE.map(r => r.replace(/\*/g, L).replace(/\+/g, Hi).replace(/-/g, S))]));
