// Pelion's refectory is the symposion (the refectorium family), where idle students go to doze. RECAFF a red-figure
// bell krater (the wide bowl where wine is mixed with water) on a marble pedestal, a bronze ladle hooked over its rim,
// a black-glazed wine jug and a water hydria on the floor beside it; TABLE a long low olive-wood table set with
// kylikes (wide two-handled cups), round loaves scored with a cross, grapes and a bowl of olives; BENCH a kline,
// the couch one reclines on, a linen mattress under a red coverlet border woven with blue, red bolsters and a
// headrest at its left end, turned olive-wood legs with bronze caps; DOZE_Z the dozing mark, a capital zeta: the Greek letter has the Z's
// shape, so it keeps the sign every viewer reads as sleep while being written in Greek.
// Run from the Administratum root: node <this file>. Writes ui/art/pelion/refectorium.png + .json.
//
// The app widens BENCH in the strip and column views by repeating its longest run of identical columns (scene.js
// widened): the plain stretches of coverlet between the cushions.
// Slots: black glaze n A (sheen S), clay = ) * -, wine $ %, marble X s 7 4 9 6, bronze h g G U, wood L w W, bread : = *,
// grapes $ % v, olives v M, coverlet ( ) [, cushions b B u, the zeta X p.
const { writeSheet } = await import(process.cwd() + '/tools/sheet_writer.mjs');

const grid = (w, h) => Array.from({ length: h }, () => Array(w).fill('.'));
const dot = (g, x, y, c) => { if (g[y]?.[x] !== undefined) g[y][x] = c; };
const put = (g, x, y, rows) => rows.forEach((r, j) => [...r].forEach((c, i) => { if (c !== '.') dot(g, x + i, y + j, c); }));
const fill = (g, x, y, w, h, c) => { for (let j = 0; j < h; j++) for (let i = 0; i < w; i++) dot(g, x + i, y + j, c); };
const out = g => g.map(r => r.join(''));

const frames = {};

{ // RECAFF, 32 x 36: the krater on its pedestal
  const g = grid(32, 36);
  // the marble pedestal: abacus, echinus, a fluted shaft, a torus and plinth
  put(g, 7, 22, [
    'kkkkkkkkkkkkkkkkkk',
    'kXXXXXXXXXXXXXXX7k',
    'k7ssssssssssss744k',
    '.kk7sssssssss4kkk.',
    '...kX7s7s7s494k...',
    '...kX7s7s7s494k...',
    '...kX7s7s7s494k...',
    '...kX7s7s7s494k...',
    '...kX7s7s7s494k...',
    '...kX7s7s7s494k...',
    '...kX7s7s7s494k...',
    '..kkkkkkkkkkkkkk..',
    '.kXXsssssssss744k.',
    'kXsssssssssss7449k',
    'kkkkkkkkkkkkkkkkkk',
  ]);
  // the krater: a flaring black lip seen a little from above (the wine inside), a reserved band of tongues, a
  // red-figure frieze (two youths facing, a palmette between), a meander band, the black lower body, its foot
  put(g, 1, 3, [
    '..kkkkkkkkkkkkkkkkkkkkkkkkkk..',
    '.kSAAAAAAAAAAAAAAAAAAAAAAAAAAk.',
    'kAn$$%%%$$$$$$$$$$$$$$$$$$$nnAk',
    'kAnn$$$$$$$$$$$$$$$$$$$$$nnnAk.',
    '.kAAnnnnnnnnnnnnnnnnnnnnnnnnk..',
    '..kn=n=n=n=n=n=n=n=n=n=n=n=nk..',
  ]);
  // the body, row by row (x from, to, inner pattern), the frieze reserved in clay = with lit )
  const body = [
    [3, 26, 'nnnnnnnnnnnnnnnnnnnnnn'],
    [3, 26, 'nnnnn)=nnnnnnnnn)=nnnn'],
    [3, 26, 'nnnn=))=nnn=nnn=))=nnn'],
    [4, 25, 'nnnn==nnnn=)=nnn==nnn'],
    [4, 25, 'nnn==)=nn)=n=)nn=)==n'],
    [4, 25, 'nnn=)==nnn=)=nnn==)=n'],
    [5, 24, 'nnn===nnnnn=nnnn===n'],
    [5, 24, 'nnn=n=nnnn===nnn=n=n'],
    [6, 23, '=n=nn=n=nn=n=nn=n='],
    [6, 23, '==================='],
    [7, 22, 'nnnnnnnnnnnnnnnnnn'],
    [8, 21, 'nAnnnnnnnnnnnnnnn'],
  ];
  body.forEach(([a, b, p], j) => {
    const y = 9 + j;
    dot(g, a - 1, y, 'k'); dot(g, b + 2, y, 'k');
    [...p].forEach((c, i) => dot(g, a + i, y, c));
    dot(g, a, y, j < 10 ? 'A' : 'n'); // the glaze's sheen down the lit side
    for (let x = a + p.length; x <= b + 1; x++) dot(g, x, y, 'n');
  });
  // the handles, loops low on the shoulders
  put(g, 0, 9, ['kkk', 'kAk', 'kkk']);
  put(g, 28, 9, ['kkk', 'kAk', 'kkk']);
  // the foot: a short black stem on a disc whose edge is reserved
  put(g, 11, 20, ['kknnnnnnkk']);
  put(g, 9, 21, ['k=nnnnnnnn=k']);
  // the ladle (a kyathos): its bronze handle hooked over the rim, the shank dipping into the wine
  put(g, 21, 0, [
    '.kkkk',
    'khhGk',
    'khkGk',
    'khk.k',
    'khk..',
    'khk..',
    'khk..',
  ]);
  // the wine jug (oinochoe), black glazed with a trefoil mouth and a red band, on the floor at the left
  put(g, 0, 26, [
    '.kkk...',
    'kAnnkk.',
    '.kAnk.k',
    '.kAnnkk',
    'kAnnnnk',
    'kAnnnnk',
    'k=)==*k',
    'kAnnnnk',
    '.kAnnk.',
    '.kkkkk.',
  ]);
  // the water hydria at the right: clay with a black shoulder, a side handle
  put(g, 25, 25, [
    '..kkk..',
    '..k=k..',
    '.knnnk.',
    'knAnnnk',
    'k=))==k',
    'k)===*k',
    'k)===*k',
    'k)==**k',
    '.k=*=k.',
    '.k**=k.',
    '.kkkkk.',
  ]);
  frames.RECAFF = out(g);
}

{ // TABLE, 92 x 16: a long low olive-wood table set for the symposion, seen from above, its front edge and legs
  const g = grid(92, 16);
  fill(g, 0, 0, 92, 16, '.');
  fill(g, 0, 0, 92, 12, 'k');
  fill(g, 1, 1, 90, 1, 'L');
  fill(g, 1, 2, 90, 8, 'w');
  for (let x = 2; x < 90; x++) { if ((x * 13) % 17 < 3) dot(g, x, 4, 'L'); if ((x * 7) % 19 < 3) dot(g, x, 7, 'W'); if ((x * 11) % 23 < 2) dot(g, x, 5, 'W'); }
  fill(g, 1, 10, 90, 1, 'L');
  // the front (the face sheet wants rows 12-15 whole): the edge board (w), then the shadow under the low table
  // (n) between the three pairs of legs
  fill(g, 1, 12, 90, 1, 'w'); dot(g, 0, 12, 'k'); dot(g, 91, 12, 'k');
  fill(g, 0, 13, 92, 3, 'k');
  fill(g, 1, 13, 90, 2, 'n');
  for (const lx of [1, 44, 87]) put(g, lx, 12, ['LwW', 'LwW', 'wWW', 'kkk']);
  const KYLIX = ['..kkkkk..', 'kknAnnnkk', 'k.nn=nn.k', 'kknnnnnkk', '..kkkkk..']; // black glaze, a clay tondo
  const BREAD = ['.kkkkk.', 'k+::;:k', 'k:;;;:k', 'k::;:=k', '.kkkkk.']; // a round loaf scored with a cross
  const GRAPES = ['..kvk.', '.k%$%k', 'k%$%$k', '.k$%$k', '..k%k.', '...k..'];
  const OLIVES = ['.kkkkk.', 'knvMvnk', 'knMvYnk', '.knnnk.'];
  const FIGS = ['.kk.kk.', 'k$%kk$k', 'k$$kk%k', '.kk..k.'];
  for (const x of [14, 42, 70]) put(g, x, 5, KYLIX); // a cup before each sleeper
  put(g, 4, 2, BREAD); put(g, 27, 2, GRAPES); put(g, 33, 2, BREAD); put(g, 55, 2, OLIVES);
  put(g, 62, 3, FIGS); put(g, 81, 2, BREAD); put(g, 85, 5, GRAPES);
  frames.TABLE = out(g);
}

{ // BENCH, 92 x 8: the kline, seen from the front: a linen mattress (b B) under a red border woven with blue (( u),
  // on an olive-wood rail (L); the headrest at its left end; red bolsters where the sleepers lean. The face sheet wants
  // rows 0-1 whole and the legs (x 1-3, 44-46, 87-89) down to row 6, so the outline runs along row 0.
  const g = grid(92, 8);
  fill(g, 0, 0, 92, 7, 'k');
  fill(g, 1, 1, 90, 1, 'b'); // the mattress's lit top
  fill(g, 1, 2, 90, 1, 'b');
  fill(g, 1, 3, 90, 1, 'B');
  for (let x = 1; x < 91; x++) dot(g, x, 4, x % 4 === 1 ? 'u' : '('); // the coverlet's border hanging over the rail
  fill(g, 1, 5, 90, 1, 'L'); // the rail
  fill(g, 0, 6, 92, 1, '.');
  // the headrest (fulcrum) at the left end, its bronze boss
  put(g, 1, 1, ['LLw', 'hLW', 'LwW']);
  // the bolsters
  for (const cx of [15, 50, 82]) put(g, cx, 1, ['k))b))k', 'k((B([k', 'kkkkkkk']);
  // turned legs with bronze caps under the ends and the middle
  for (const lx of [0, 43, 86]) put(g, lx, 5, ['kLwWk', 'kLwWk', 'kkhkk']);
  frames.BENCH = out(g);
}

frames.DOZE_Z = [ // the zeta, a pale stroke shaded on its lower side, a hooked serif at its top left
  '.kkkkkk',
  'kXXXXXk',
  'kpkkXpk',
  '.kkXpk.',
  'kkXpkkk',
  'kXpXXXk',
  'kkkkkkk',
];

const rows = [['RECAFF', 'TABLE', 'BENCH', 'DOZE_Z']];
console.log(writeSheet('pelion/refectorium', frames, rows, { app: 'Pelion theme art (adm-themes generators/pelion/refectorium.mjs)' }));
