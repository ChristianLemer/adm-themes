// Pelion's GitHub main lamp (tools/cimain_art/pelion.mjs, run as `node tools/cimain_art.mjs pelion`): a bronze
// lantern on a fluted marble column, its finial and domed cap bronze, the lens set in a bronze cage, a bronze collar,
// the column's flutes, a moulded foot and a marble step. The lens is the kit's 4 x 4 block (columns 5..8, rows 4..7).
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

export default () => frames(SHAPE, 'pelion');
