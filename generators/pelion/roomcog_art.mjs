// Pelion's room computer (tools/roomcog_art/pelion.mjs, run as `node tools/roomcog_art.mjs pelion`): the room's
// mechanism, a small olive-wood cabinet under a blue pediment with a bronze rosette, a marble cornice, its face a
// bronze-rimmed dial with a patinated field and a gear's spokes; lit (a shell runs there) the dial's ticks glow amber
// round a bright hub; a marble plinth. The envelope of the kit: the pediment rows 0..5, the body 6..23, the dial in
// SCREEN (10, 8, 12 x 8).
// Slots: olive wood L (lit) w W, bronze h, patina V M m, paint u, marble X s 4 6, the glow c F, outline k.
import { sym, frames } from './kit.mjs';

const off = sym([
  '................',
  '..............kk',
  '............kkuu',
  '..........kkuuuh',
  '........kkuuuuuh',
  '......kXXXXXXXXX',
  '..kkkkkkkkkkkkkk',
  '..kLLLLLLkhhhhhh',
  '..kLwWwWkhVVVVVV',
  '..kLwWwWkhVVVVmV',
  '..kLwWwWkhVmVVmV',
  '..kLwWwWkhVVmVmm',
  '..kLwWwWkhVVVmmm',
  '..kLwWwWkhVVmVmV',
  '..kLwWwWkhVmVVmV',
  '..kLwWwWkhVVVVVV',
  '..kLwWwWkhhhhhhh',
  '..kLwwwwwwwwwwww',
  '..kLwWLWwWLWwWLW',
  '..kWWWWWWWWWWWWW',
  '.kXXXXXXXXXXXXXX',
  '.ks4s4s4s4s4s4s4',
  'k666666666666666',
  'kkkkkkkkkkkkkkkk',
]);

export default () => frames(off, [[10, 8, [
  '....c..c....',
  '..c......c..',
  '.c...hh...c.',
  'c...hFFh...c',
  'c...hFFh...c',
  '.c...hh...c.',
  '..c......c..',
  '....c..c....',
]]]);
