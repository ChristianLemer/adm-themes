// Pelion's clutter (the clutter family): what lies about a Greek school. PAPER_STACK stacked wax tablets (olive-wood
// frames, dark wax with scratched writing, a red cord round one bundle); SCROLL_PILE a low wicker basket heaped with
// papyrus rolls; BOOKS a stack of rolls tied with cord (no codices in Greece); LOOSE_A and LOOSE_B loose papyrus
// sheets lying on the floor; CRATE an olive-wood chest heaped with ostraka (potsherds), a black-figure amphora leaning
// on it.
// Run from the Administratum root: node <this file>. Writes ui/art/pelion/clutter.png + .json.
//
// The face sheet (faces.test) rebuilds these frames from the default's volumes, so every pixel stays inside them:
// PAPER_STACK x 0-15 rows 0-8 and 14-23, x 2-15 rows 9-13; SCROLL_PILE a pyramid (x 8-26 rows 0-2, x 6-26 rows 3-6,
// x 2-32 rows 7-10, x 1-34 rows 10-13); BOOKS x 2-15 rows 0-4, x 0-17 rows 4-8, x 2-17 rows 8-11, x 0-19 rows 12-17;
// CRATE x 1-22 rows 0-3 and the whole width from row 4.
// Slots: wood L w W, wax Z (writing N), papyrus X p P (ink ] ), wicker q Q ; , terracotta ) = * - with black glaze
// n A (sheen S), bronze h g G, cord x.
const { writeSheet } = await import(process.cwd() + '/tools/sheet_writer.mjs');

const grid = (w, h) => Array.from({ length: h }, () => Array(w).fill('.'));
const dot = (g, x, y, c) => { if (g[y]?.[x] !== undefined) g[y][x] = c; };
const put = (g, x, y, rows) => rows.forEach((r, j) => [...r].forEach((c, i) => { if (c !== '.') dot(g, x + i, y + j, c); }));
const fill = (g, x, y, w, h, c) => { for (let j = 0; j < h; j++) for (let i = 0; i < w; i++) dot(g, x + i, y + j, c); };
const out = g => g.map(r => r.join(''));

// A wax tablet seen from the front and a little above: its top face (face rows: the frame lit L on top and left, w
// right and below, the wax Z between with scratched writing N), then its edge (w, W) and the outline. Height face + 4.
function tablet(g, x, y, w, face, writing = true) {
  fill(g, x, y, w, face + 4, 'k');
  for (let j = 1; j <= face; j++) for (let i = 1; i < w - 1; i++) {
    const top = j === 1, bot = j === face, l = i === 1, r = i === w - 2;
    let c = top || l ? 'L' : bot || r ? 'w' : 'Z';
    if (c === 'Z' && writing && j % 2 === 0 && (i * 7 + j * 3) % 5 > 1 && i < w - 3) c = 'N';
    dot(g, x + i, y + j, c);
  }
  for (let i = 1; i < w - 1; i++) { dot(g, x + i, y + face + 1, 'L'); dot(g, x + i, y + face + 2, i === w - 2 ? 'W' : 'w'); }
}
// A papyrus roll lying along x, len px long, 5 rows with its outline: lit X, p, shade P; the left end the roll's
// spiral (P with a dark core), the right end its edge; an olive-wood knob of the rod at each end (knobs = true).
function roll(g, x, y, len, { knobs = true, tag = null } = {}) {
  fill(g, x, y, len, 5, 'k');
  for (let i = 1; i < len - 1; i++) { dot(g, x + i, y + 1, 'X'); dot(g, x + i, y + 2, 'p'); dot(g, x + i, y + 3, 'P'); }
  put(g, x + 1, y + 1, ['P', 'k', 'P']); // the spiral seen at the end
  dot(g, x + 2, y + 2, 'P');
  if (knobs) { dot(g, x - 1, y + 2, 'k'); dot(g, x + len, y + 2, 'k'); }
  if (tag) put(g, x + len - 4, y + 4, ['k' + tag + 'k', 'k' + tag + 'k', '.k.']); // the title tag (sillybos)
}

const frames = {};

{ // PAPER_STACK, 16 x 24: two bundles of wax tablets, the upper one tied with a red cord
  const g = grid(16, 24);
  tablet(g, 0, 17, 16, 2, false);
  tablet(g, 1, 14, 15, 2, false);
  tablet(g, 0, 11, 16, 2, false); // its left end hidden by the middle bundle (rows 9-13 keep clear of x 0-1)
  fill(g, 0, 9, 2, 5, '.');
  tablet(g, 2, 8, 14, 2, false);
  tablet(g, 3, 5, 13, 2, false);
  tablet(g, 0, 0, 15, 4); // the top tablet, its wax written
  for (let y = 1; y <= 12; y++) dot(g, 10, y, g[y][10] === 'Z' || g[y][10] === 'N' ? ')' : 'x'); // the cord round the upper bundle
  put(g, 9, 0, ['k)k']); // its knot on top
  frames.PAPER_STACK = out(g);
}

{ // SCROLL_PILE, 36 x 14: a round-bellied wicker basket heaped with rolls
  const g = grid(36, 14);
  // the rolls in the heap (back to front), inside the pyramid of volumes (x 8-26 rows 0-2, x 6-26 rows 3-6)
  roll(g, 10, 0, 14, { tag: 'u' }); // the top roll, lying in the groove of the two below
  roll(g, 7, 3, 9);
  roll(g, 17, 3, 9, { tag: 'x' });
  // the basket: a plaited rim (q, shade Q) narrower than its woven belly (Q ;, shade W; x 2-32 to row 9, x 1-34 below)
  put(g, 1, 7, [
    '.kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk..',
    '.kqqqqqqqqqqqqqqqqqqqqqqqqqqqqqk..',
    '.kQqQqQqQqQqQqQqQqQqQqQqQqQqQqQk..',
    'kq;Q;Q;Q;Q;Q;Q;Q;Q;Q;Q;Q;Q;Q;Q;Qkk',
    'kQQ;Q;Q;Q;Q;Q;Q;Q;Q;Q;Q;Q;Q;Q;Q;Qk',
    'k;;W;W;W;W;W;W;W;W;W;W;W;W;W;W;W;k',
    '.kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk.',
  ]);
  frames.SCROLL_PILE = out(g);
}

{ // BOOKS, 20 x 18: rolls stacked like logs, tied with a red cord
  const g = grid(20, 18);
  roll(g, 1, 13, 18); // bottom, x 0-19 rows 12-17
  roll(g, 3, 8, 14, { tag: 'u' }); // x 2-17 rows 8-11 (its outline row 12 shared)
  roll(g, 1, 4, 16); // x 0-17 rows 4-8
  roll(g, 3, 0, 12, { knobs: true }); // x 2-15 rows 0-4
  // the cord, twice round the bundle, and its bow
  for (const cx of [7, 12]) for (let y = 1; y <= 16; y++) dot(g, cx, y, g[y][cx] === 'k' ? 'x' : y % 2 ? 'x' : '(');
  put(g, 6, 0, ['k(xk']);
  frames.BOOKS = out(g);
}

{ // LOOSE_A, 10 x 8: a papyrus sheet lying flat, written, its corner curling
  frames.LOOSE_A = [
    'kkkkkkkk..',
    'kXpppppPkk',
    'kp]]p]]pPk',
    'kppppppppk',
    'kp]]]p]]pk',
    'kpppppppPk',
    'kp]]p]PPkk',
    'kkkkkkkk..',
  ];
}
{ // LOOSE_B, 8 x 10: a narrow sheet half rolled at its foot
  frames.LOOSE_B = [
    '.kkkkkk.',
    'kXppppPk',
    'kp]]]pPk',
    'kppppppk',
    'kp]]p]Pk',
    'kppppppk',
    'kkkkkkkk',
    'kXXXXXPk',
    'kPkPPPPk',
    '.kkkkkk.',
  ];
}

{ // CRATE, 28 x 24: an olive-wood chest with bronze corners heaped with ostraka, a black-figure amphora standing by it
  const g = grid(28, 24);
  // the heap of sherds over the rim (x 1-22 rows 0-3, then inside the chest's mouth): terracotta = ) * and black
  // glazed n A pieces, edges on
  put(g, 1, 0, [
    '...kk...kkk..kk.....',
    '..k=)k.k=)=kk=)k.kk.',
    '.k=*nkk=*nAk=**k.k=k',
    'k=*nnA=)=*=*nnA=k=*k',
  ]);
  put(g, 0, 4, [
    'k=*=)=*nAk=)=*kn=)=k',
    'k*=nA*=**=*=nA*=**=k',
  ]);
  // the chest: a lit top board, two planks, bronze corner plates and a hasp
  put(g, 0, 6, [
    'kkkkkkkkkkkkkkkkkkkk',
    'khLLLLLLLLLLLLLLLLhk',
    'kGwwwwwwwwwwwwwwwwGk',
    'kkkkkkkkkkkkkkkkkkkk',
    'khLwwwwwwwwwwwwwwwhk',
    'kLwwwwwwwkkkwwwwwwWk',
    'kLwwwwwwkhhGkwwwwwWk',
    'kLwwWwwwkgkGkwwWwwWk',
    'kLwwwwwwwkGkwwwwwwWk',
    'kLwwwwwwwwwwwwwwwwWk',
    'kkkkkkkkkkkkkkkkkkkk',
    'khLwwwwwwwwwwwwwwwhk',
    'kLwwwwwwWwwwwwwwwwWk',
    'kLwwwwwwwwwwwwWwwwWk',
    'kLwWwwwwwwwwwwwwwwWk',
    'kGWWWWWWWWWWWWWWWWGk',
    'kkkkkkkkkkkkkkkkkkkk',
    'kk................kk',
  ]);
  // the amphora: a black-glazed mouth, neck and handles, the clay body with a black frieze of figures (two running
  // men in silhouette, reserved), a dark band, the pointed toe on the floor
  put(g, 19, 4, [
    '..kkkkk..',
    '.kkk=kkk.',
    'kAk.=*kAk',
    'kAkk=*kAk',
    'kkk=)=*kk',
    'k=))))==k',
    'k)nn)nn*k',
    'kn)nnn)nk',
    'knn)n)nnk',
    'k=n)nn)*k',
    'k=))))=*k',
    'knnnnnnnk',
    'k=))))=*k',
    '.k=)))=k.',
    '.k==)=*k.',
    '..k==*k..',
    '..k*=*k..',
    '...k*k...',
    '...knk...',
    '....k....',
  ]);
  frames.CRATE = out(g);
}

const rows = [['PAPER_STACK', 'SCROLL_PILE', 'BOOKS', 'LOOSE_A', 'LOOSE_B', 'CRATE']];
console.log(writeSheet('pelion/clutter', frames, rows, { app: 'Pelion theme art (adm-themes generators/pelion/clutter.mjs)' }));
