// Pelion (the school of Chiron): the Laurels of the week on a marble stele. A low pediment (the tympanum painted blue
// with a palmette, small acroteria at its corners) over a frieze, a moulding (lit, a red painted band, dentils), the
// shaft widening a little toward its foot (lit on its left, its right in the grey-blue shade, faint veins), a stepped
// plinth. The title and the four marks are written in gilt (ui --honours-ink) on dark bronze tablets set into the
// stone, as Greek cities set up their decrees on bronze: the night darkens the art but never the words, so no single
// ink reads on bare marble both by day and by night. Signs painted on the stone beside the tablets: a laurel wreath
// (works sealed), a clay oil lamp (the longest study), a running hare (aporiai resolved within the minute), a
// black-figure prize amphora (the busiest day).
import { W, H, TITLE, ICON, ROW, part, pic, plaque } from './kit.mjs';

const P = 7; // the pediment's foot; its apex at row 1
const pediment = (x, y) => y < P && x >= 1 && x <= W - 2 && y >= Math.round(P - 1 - 5 * (1 - Math.abs(x - 35.5) / 34.5));
const frieze = (x, y) => y >= P && y <= 18 && x >= 3 && x <= W - 4;
const cornice = (x, y) => y >= 19 && y <= 21 && x >= 1 && x <= W - 2;
const taper = y => Math.round(4 - 2 * (y - 22) / 66); // the shaft widens toward its foot
const shaft = (x, y) => y >= 22 && y <= 88 && x >= taper(y) && x <= W - 1 - taper(y);
const plinth = (x, y) => (y >= 89 && y <= 91 && x >= 1 && x <= W - 2) || (y >= 92 && y <= H - 1 && x >= 0 && x <= W - 1);
const stone = (x, y) => pediment(x, y) || frieze(x, y) || cornice(x, y) || shaft(x, y) || plinth(x, y);
// the acroteria: a small palmette at each corner
// a palmette painted in the tympanum (rows 2..5 round x 35.5)
const PALM = ['.X.X.X.', 'X.XXX.X', '.XXxXX.', '...x...'];
const SMALL = ['k.k.', 'XkXk', 'kXsk'];
const palm = (x, y) => {
  const at = (rows, ox, oy) => rows[y - oy]?.[x - ox];
  for (const [rows, ox, oy] of [[SMALL, 1, 3], [SMALL.map(r => [...r].reverse().join('')), W - 5, 3]]) {
    const c = at(rows, ox, oy); if (c && c !== '.') return c;
  }
  return null;
};

// A bronze tablet set into the stone (the words are written on it in gilt, ui --honours-ink): its rim dark on the top
// and left where the stone overhangs it, lit on the bottom and right, its first row and column in shadow, the rest the
// dark patinated bronze U.
const tablet = (p, x, y, x0, y0) => (p === 'edge' ? (y === y0 || x === x0 ? 'k' : 'g') : y === y0 + 1 || x === x0 + 1 ? 'V' : 'U');

const body = (x, y) => {
  const p = palm(x, y);
  if (p && !stone(x, y)) return p;
  if (!stone(x, y)) return [[-1, 0], [1, 0], [0, -1], [0, 1]].some(([dx, dy]) => stone(x + dx, y + dy)) ? 'k' : null;
  if (y < P) { // the raking cornice lit, the tympanum painted blue with a palmette
    if (!pediment(x, y - 1) || y === P - 1) return 'X';
    const c = PALM[y - 2]?.[x - 32];
    return c && c !== '.' ? c : 'u';
  }
  if (y >= 89) return y === 89 || y === 92 ? 'X' : y === H - 1 || y === 91 ? '6' : x <= 2 ? 'X' : x >= W - 3 ? '4' : 's';
  if (y >= 19 && y <= 21) return y === 19 ? 'X' : y === 20 ? 'x' : x % 3 === 0 ? '6' : 's'; // the moulding: lit, painted, dentils
  const left = y < 19 ? 3 : taper(y), right = W - 1 - left;
  if (x === left) return 'X';
  if (x === right) return '4';
  if (x === right - 1) return '9';
  if (y === P) return '4'; // the pediment's shadow on the frieze
  const t = part(TITLE, x, y);
  if (t) return tablet(t, x, y, TITLE[0], TITLE[1]);
  for (let i = 0; i < 4; i++) {
    const r = part(ROW(i), x, y), [rx, ry] = ROW(i);
    if (r) return tablet(r, x, y, rx, ry);
  }
  if (y === 22) return '4'; // the moulding's shadow
  if (y === 88) return '9';
  return (x * 7 + y * 3) % 61 === 0 || (x * 5 - y * 2 + 300) % 73 === 0 ? '8' : 's'; // faint veins
};

const icons = [
  pic([ // a laurel wreath tied with a red ribbon
    '....v..v....',
    '..vY.vv.Yv..',
    '.vY......Yv.',
    '.v........v.',
    'vY........Yv',
    'v..........v',
    'vY........Yv',
    '.v........v.',
    '.vY......Yv.',
    '..vY....Yv..',
    '...vvxxvv...',
    '....x..x....',
  ]),
  pic([ // a clay oil lamp, its flame at the nozzle
    '..........F.',
    '.........fFf',
    '.........fF.',
    '..........f.',
    '...kkkkk.k=k',
    '.kk)))k))=k.',
    'k.k)))))))k.',
    'kkk=))))===k',
    '..k=======k.',
    '...k=====k..',
    '....kkkkk...',
    '............',
  ]),
  pic([ // a hare running
    '........k.k.',
    '.......k;k;k',
    '.......k;k;k',
    '....kkkk;;k.',
    '..kk::::::kk',
    '.k:::::::::k',
    'k;::::::::k.',
    'k;;:::::;k..',
    '.kk;;kkk;;k.',
    'k;k.k;k..k;k',
    '.k...k....k.',
    '............',
  ]),
  pic([ // a black-figure prize amphora
    '....kkkk....',
    '...knnnnk...',
    '..k.knnk.k..',
    '.kn.knnk.nk.',
    '.kknnnnnnkk.',
    '..knnnnnnk..',
    '..k==n===k..',
    '..k=nnn==k..',
    '..k==n=n=k..',
    '...knnnnk...',
    '....knnk....',
    '...kkkkkk...',
  ]),
];

export default () => ({ HONOURS: plaque(body, icons) });
