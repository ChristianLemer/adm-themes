// Pelion's students in the 2.5D view (the scribe39 family): the flat students (scribe.mjs) set in the four directions
// of the 39° view, as the other worlds' 2.5D scribes keep their flat drawing: S toward the viewer is the front view
// (down), N away from it the back view (up), E along the back wall to the right the profile (right), W its mirror;
// three walk steps each; the three gestures at the table from behind (N, the flat up ones). The scroll a student
// carries to the queue: a papyrus roll, its ends rolled, a red seal. No arms of its own (optional): seated at the table
// the student keeps his arms along the body.
// Run from the Administratum root: node <this file>. Writes ui/art/pelion/scribe39.png + .json (scribe.mjs, imported,
// only lends its frames).
//
// Slots: the students' (scribe.mjs); the scroll papyrus p P, writing ], seal x a, outline k.
const { writeSheet } = await import(process.cwd() + '/tools/sheet_writer.mjs');
const { frames: flat } = await import('./scribe.mjs');

const mirror = rows => rows.map(r => [...r].reverse().join(''));
const frames = {};
for (const s of [0, 1, 2]) {
  frames[`S ${s}`] = flat[`down ${s}`];
  frames[`N ${s}`] = flat[`up ${s}`];
  frames[`E ${s}`] = flat[`right ${s}`];
  frames[`W ${s}`] = mirror(flat[`right ${s}`]);
}
// the gestures at the table (optional, docs/theme-packs.md "Gestures"): seated, the 39° view sees the student from
// behind as the flat one does, so N think / wonder / stretch are the flat up ones
for (const g of ['think', 'wonder', 'stretch']) if (flat[`up ${g}`]) frames[`N ${g}`] = flat[`up ${g}`];
frames.scroll = [
  '..........',
  '....kk....',
  '..kkppkk..',
  'kkpppppPk.',
  'kp]]ppppPk',
  'kpppp]]pPk',
  'kp]]ppppPk',
  'kppxxp]pPk',
  'kp]xapppPk',
  'kpppppPPkk',
  'kPPppPPkk.',
  '.kkPPkk...',
  '...kk.....',
  '..........',
];
const layout = [['E 0', 'E 1', 'E 2', 'W 0', 'W 1', 'W 2', 'S 0', 'S 1', 'S 2', 'N 0', 'N 1', 'N 2', 'scroll'], ['N think', 'N wonder', 'N stretch'].filter(n => frames[n])];
const anchors = { feet: [16, 34], scroll: [20, 13] };
console.log(writeSheet('pelion/scribe39', frames, layout, { app: 'adm-themes generators/pelion/scribe39.mjs', anchors }));
