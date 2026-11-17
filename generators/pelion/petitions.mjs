// Pelion's petitions (the petitions family): an aporia is written on a potsherd, as Athenians wrote on ostraka.
// SCROLL the ostrakon a student carries to Chiron and holds in the queue: a flat potsherd, its pale inner face written
// in four short lines of dark ink; QSCROLL the same sherd cut from a black-glazed pot, one large question mark
// scratched through the glaze to the pale clay (a question at the end of a turn: dark where a request is pale); SCROLL_HELD a wax tablet held up in both hands when a long turn is done: a school tablet with a grip at its
// top, an olive-wood frame, dark wax scratched with lines of writing (one leaf, so it never reads as a codex).
// Run from the Administratum root: node <this file>. Writes ui/art/pelion/petitions.png + .json.
// Slots: clay : + (the fired break = *), ink k, black glaze n A; wood L w W, wax Z (scratches P), hands : ;.
const { writeSheet } = await import(process.cwd() + '/tools/sheet_writer.mjs');

const grid = (w, h) => Array.from({ length: h }, () => Array(w).fill('.'));
const dot = (g, x, y, c) => { if (g[y]?.[x] !== undefined) g[y][x] = c; };
const put = (g, x, y, rows) => rows.forEach((r, j) => [...r].forEach((c, i) => { if (c !== '.') dot(g, x + i, y + j, c); }));
const fill = (g, x, y, w, h, c) => { for (let j = 0; j < h; j++) for (let i = 0; i < w; i++) dot(g, x + i, y + j, c); };
const out = g => g.map(r => r.join(''));

// The sherd, 12 x 14: a flat broken piece of a pot's wall, its smoothed inner face pale clay (: lit +) to write on,
// the break showing the fired terracotta's thickness (= *) along its lower and right edges, lit from the upper left.
const SHERD = [
  '..kkk.......',
  '.k+:kkkk....',
  'k+::::::kkk.',
  'k+::::::::=k',
  'k:::::::::=k',
  '.k::::::::=k',
  '.k:::::::::k',
  'k+::::::::=k',
  'k:::::::::=k',
  'k:::::::::*k',
  '.k=::::::=*k',
  '.k*==:::=**k',
  '..kk**=**kk.',
  '....kkkkk...',
];

const frames = {};
{ // SCROLL: the sherd written in four short lines
  const g = SHERD.map(r => [...r]);
  put(g, 2, 3, [
    '.kk.k.k',
    '',
    'kk.kkk.k',
    '',
    '.k.kk.kk',
    '',
    'kkk.k.k',
  ]);
  frames.SCROLL = out(g);
}
{ // QSCROLL: a sherd of a black-glazed pot (the glaze n, its sheen A), one large question mark scratched through the
  // glaze to the pale clay: the same shape as SCROLL, its colours turned over so a question never reads as a request
  const g = SHERD.map(r => [...r].map(c => ({ ':': 'n', '+': 'A' })[c] ?? c));
  put(g, 2, 2, [
    '..++++.',
    '.++..++',
    '.++..++',
    '....++.',
    '...++..',
    '...++..',
    '.......',
    '...++..',
    '...++..',
  ]);
  frames.QSCROLL = out(g);
}
{ // SCROLL_HELD, 28 x 14: a school tablet with a grip at its top, held up by its lower corners
  const g = grid(28, 14);
  fill(g, 2, 2, 24, 11, 'k');
  fill(g, 3, 3, 22, 9, 'L');
  fill(g, 24, 3, 1, 9, 'w'); fill(g, 3, 11, 22, 1, 'w');
  fill(g, 4, 4, 20, 7, 'Z');
  for (const [y, gaps] of [[5, [5, 11]], [7, [8]], [9, [4, 13, 14, 15, 16, 17]]]) for (let i = 0; i < 18; i++) if (!gaps.includes(i)) dot(g, 5 + i, y, 'P'); // three lines of writing
  put(g, 11, 0, ['kkkkkk', 'kLwwWk', 'kk..kk']); // the grip, a loop of the frame
  // the hands holding its lower corners
  put(g, 0, 9, ['.kk.', 'k::k', 'k:;k', 'k;;k', '.kk.']);
  put(g, 24, 9, ['.kk.', 'k::k', 'k:;k', 'k;;k', '.kk.']);
  frames.SCROLL_HELD = out(g);
}

const rows = [['SCROLL', 'QSCROLL', 'SCROLL_HELD']];
console.log(writeSheet('pelion/petitions', frames, rows, { app: 'Pelion theme art (adm-themes generators/pelion/petitions.mjs)' }));
