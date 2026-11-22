// Breaking Bad's room computer (tools/roomcog_art/breakingbad.mjs, run as `node tools/roomcog_art.mjs breakingbad` in
// a checkout where the module is put back): the lab's workstation, drawn flat as the world is (one outline colour, flat
// fills): a steel cabinet with a dark monitor set in it, a yellow and black hazard plate on a stalk above, two steel
// panels beside the screen, a row of drawers under it; lit (a shell runs there) the screen shows the cook's blue
// readout. The envelope of the kit: the plate rows 0..5, the body 6..23, the screen in SCREEN (10, 8, 12 x 8).
// Slots: steel h (face) U (panels), the screen n, the readout c O, the hazard plate r, outline k.
import { sym, frames } from './kit.mjs';

const off = sym([
  '................',
  '................',
  '........kkkkkkkk',
  '........krkkrrkk',
  '........kkkkkkkk',
  '..........kkkhhk',
  '..kkkkkkkkkkkkkk',
  '..khhhhhhkkkkkkk',
  '..khUUUUhknnnnnn',
  '..khUhhUhknnnnnn',
  '..khUhhUhknnnnnn',
  '..khUhhUhknnnnnn',
  '..khUhhUhknnnnnn',
  '..khUhhUhknnnnnn',
  '..khUUUUhknnnnnn',
  '..khhhhhhknnnnnn',
  '..khhhhhhkkkkkkk',
  '..khhhhhhhhhhhhh',
  '..khUUUUhhUUUUhh',
  '..khhhhhhhhhhhhh',
  '..kkkkkkkkkkkkkk',
  '...kUUk.........',
  '...kUUk.........',
  '...kkkk.........',
]);

export default () => frames(off, [[10, 8, [
  'c.cc.ccc.c..',
  '............',
  'cc.ccccc.cc.',
  '..O.....O...',
  '.ccc.cc.ccc.',
  '............',
  'ccccc.cc.cc.',
  '..c......c..',
]]]);
