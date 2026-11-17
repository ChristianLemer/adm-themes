// Pelion's fires (the fire family): a bronze tripod brazier (a wide lebes on three legs gathered by a ring, splaying
// to lion's-paw feet) and a cluster of clay oil lamps (the Greek lamp: a small closed bowl with a filling hole, a ring
// handle and a nozzle, the flame at the nozzle), on a marble block; their flame frames, two other shapes of the same
// flames that the app draws over the still ones in turn.
// Run from the Administratum root: node <this file>. Writes ui/art/pelion/fire.png + .json.
//
// The face sheet (faces.test) cuts these frames into the default's volumes: the brazier's fire (x 4-13, rows 0-6),
// bowl (x 2-15, rows 7-10), stem (x 6-11, rows 11-19) and foot (x 2-15, rows 20-25); the lamps' dish (rows 13-17),
// their bodies (x 2-8 and 10-16 rows 6-12, x 18-23 rows 8-12) and flames (x 3-6, 11-14 rows 0-5, x 19-22 rows 2-7).
// Every pixel is drawn inside them: the tripod's legs are gathered into the stem, the lamps stand on clay feet.
// Slots: bronze h g G U, patina M; flame f F, embers o; terracotta : N ; with its black slip k; marble X s 7 4 9.
const { writeSheet } = await import(process.cwd() + '/tools/sheet_writer.mjs');

const grid = (w, h) => Array.from({ length: h }, () => Array(w).fill('.'));
const dot = (g, x, y, c) => { if (g[y]?.[x] !== undefined) g[y][x] = c; };
const put = (g, x, y, rows) => rows.forEach((r, j) => [...r].forEach((c, i) => { if (c !== '.') dot(g, x + i, y + j, c); }));
const out = g => g.map(r => r.join(''));

const frames = {};

{ // BRAZIER, 20 x 26
  const g = grid(20, 26);
  put(g, 0, 0, [
    '....................',
    '....................',
    '.........f..........',
    '........ff.f........',
    '......f.fFfff.......',
    '......ffFFFff.......',
    '.....ffFFoFFff......', // the flame on its embers
    '..kkkkkkkkkkkkkk....', // the lebes: its rim,
    '..khhhhhhgggggGk....',
    '...kgggggggGGGk.....', // its belly, lit from the left,
    '....kkGGGGGUkk......', // and the round bottom
    '......khkUGk........', // the three legs (the back one dark) under the bowl
    '......kh.UGk........',
    '......kh.UGk........',
    '......khhgGk........', // the ring that gathers them
    '......kGGGUk........',
    '......kh.UGk........',
    '......kh.UGk........',
    '......kh.UGk........',
    '......kh.UGk........',
    '.....kh..U.Gk.......', // the legs splay
    '....kh...U..Gk......',
    '...kh....U...Gk.....',
    '..khk...kGk..kGk....', // the paws
    '..kgGk..kkk.kgGk....',
    '..kkkk......kkkk....',
  ]);
  frames.BRAZIER = out(g);
}
{ // BRAZIER_FIRE_1, 10 x 9 (drawn at the fire anchor, 4, -2: its row 2 is the brazier's row 0): tongues to the left
  frames.BRAZIER_FIRE_1 = [
    '..f.......',
    '..f.......',
    '.ff..f....',
    '.fF..ff...',
    '.fFf.fF...',
    '..fFfFFf..',
    '..fFFFFf..',
    '.ffFFFFff.',
    '.fFFooFFf.',
  ];
}
{ // BRAZIER_FIRE_2, 10 x 9: tongues to the right
  frames.BRAZIER_FIRE_2 = [
    '.......f..',
    '......ff..',
    '......fF.f',
    '..f..fFf.f',
    '..ff.fFFff',
    '..fFfFFFf.',
    '..fFFFFFf.',
    '.ffFFFFFf.',
    '.fFFFooFff',
  ];
}

// A Greek oil lamp, 7 x 4: the filling hole on top, the nozzle to the left (the wick at its column 1); terracotta
// : ;, or black glaze A n (glaze) with a lit S.
const LAMP = ['...kkk.', 'kkk:k:k', 'k:::::k', '.kk;;;k'];
const glaze = rows => rows.map(r => r.replaceAll(':', 'A').replaceAll(';', 'n'));
{ // CANDLES, 24 x 18: three lamps on a marble block, the middle one raised on a small bronze stand
  const g = grid(24, 18);
  // the marble block (the dish volume, rows 13-17)
  put(g, 0, 13, [
    'kkkkkkkkkkkkkkkkkkkkkkkk',
    'kXXXXXXXXXXXXXXXXXXXXX7k',
    'ks7ss7sssssss7ssssss7s4k',
    'k4449444494444944449444k',
    'kkkkkkkkkkkkkkkkkkkkkkkk',
  ]);
  // lamp 1 terracotta on the block (x 2-8), lamp 2 black-glazed on its stand (x 10-16), lamp 3 terracotta (x 18-23)
  put(g, 2, 9, LAMP);
  dot(g, 4, 11, 'N'); dot(g, 5, 11, 'N'); // a red-painted band
  put(g, 10, 6, glaze(LAMP));
  dot(g, 13, 7, 'S'); dot(g, 15, 7, 'S'); dot(g, 12, 8, 'S'); // the glaze's sheen
  put(g, 10, 10, ['...kk..', '...hG..', '..khGk.']); // the stand: a bronze stem on a round foot
  put(g, 18, 9, ['..kkk.', 'kk:k:k', 'k::::k', '.k;;;k']);
  // still flames at the wicks
  put(g, 3, 5, ['.f', 'fF', 'fF', 'f.']);
  put(g, 11, 1, ['.f', '.f', 'fF', 'fF', 'f.']);
  put(g, 19, 5, ['.f', 'fF', 'fF', 'f.']);
  frames.CANDLES = out(g);
}
// The lamps' flames flaring in turn (24 x 8, drawn at 0, -1: a frame row is the lamps' row + 1).
{ // CANDLES_FIRE_1: lamps 1 and 3 flare and lean
  const g = grid(24, 8);
  put(g, 3, 2, ['..f', '.f.', '.ff', 'fFF', 'fF.', 'fF.']);
  put(g, 19, 3, ['..f', '.f.', '.ff', 'fFF', 'fF.']);
  frames.CANDLES_FIRE_1 = out(g);
}
{ // CANDLES_FIRE_2: lamp 2 flares, lamp 1 leans the other way
  const g = grid(24, 8);
  put(g, 11, 0, ['f..', 'ff.', '.fF', '.fF', 'fFF', 'fF.', 'f..']);
  put(g, 3, 4, ['f..', 'ff.', 'fF.', 'fF.']);
  frames.CANDLES_FIRE_2 = out(g);
}

const rows = [['BRAZIER', 'CANDLES', 'BRAZIER_FIRE_1', 'BRAZIER_FIRE_2', 'CANDLES_FIRE_1', 'CANDLES_FIRE_2']];
console.log(writeSheet('pelion/fire', frames, rows, { app: 'Pelion theme art (adm-themes generators/pelion/fire.mjs)' }));
