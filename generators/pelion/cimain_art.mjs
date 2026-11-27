// Pelion's GitHub main lamp (tools/cimain_art/pelion.mjs, run as `node tools/cimain_art.mjs pelion`): a bronze
// lantern on a fluted marble column, its finial and domed cap bronze, the lens set in a bronze cage, a bronze collar,
// the column's flutes, a moulded foot and a marble step. The lens is the kit's 4 x 4 block (columns 5..8, rows 4..7).
// As the base beacons (Administratum #44) the verdict reads without colour: running the lens with its glint and shade,
// blinking; a pass the whole lens bright with a check cut in it; a fail a dark X; unlit a flat dark glass.
// Slots: bronze h (lit) U m, marble X s 4 9 6, outline k (no lens char in the housing).
import { frames } from './kit.mjs';

const SHAPE = [
  '......kk......',
  '.....khhk.....',
  '...kkhUUhkk...',
  '..khhhhhhhhk..',
  '..kUh+***hUk..',
  '..kUh****hUk..',
  '..kUh****hUk..',
  '..kUh*---hUk..',
  '..khhhhhhhhk..',
  '...kUmmmmUk...',
  '....kkhhkk....',
  '....kXs49k....',
  '....kX4s9k....',
  '....kXs49k....',
  '....kX4s9k....',
  '....kXs49k....',
  '....kX4s9k....',
  '....kXs49k....',
  '....kX4s9k....',
  '....kXs49k....',
  '....kX4s9k....',
  '....kXs49k....',
  '....kX4s9k....',
  '...kXXss99k...',
  '..kXsssss96k..',
  '..k66666666k..',
  '.kXXXXXXXXX9k.',
  'kkkkkkkkkkkkkk',
];

// the lens's 4 x 4 block per verdict (main, glint), laid over the round lens the kit's frames() gives every state
const INNER = {
  'CIMAIN.green': ['cccc', 'cccO', 'OcOc', 'cOcc'],
  'CIMAIN.red': ['kaak', 'akka', 'akka', 'kaak'],
  'CIMAIN.off': ['nnnn', 'nnnn', 'nnnn', 'nnnn'],
};
const overLens = (rows, inner) => rows.map((r, y) => (y >= 4 && y <= 7 ? r.slice(0, 5) + inner[y - 4] + r.slice(9) : r));
export default () => Object.fromEntries(Object.entries(frames(SHAPE, 'pelion')).map(([n, rows]) => [n, INNER[n] ? overLens(rows, INNER[n]) : rows]));
