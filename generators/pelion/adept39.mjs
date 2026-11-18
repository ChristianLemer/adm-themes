// Pelion's helpers in the 2.5D view (the adept39 family): the flat helpers (adept.mjs) in the four directions of the
// 39° view, as the students (scribe39.mjs): S the front (down), N the back (up), E the profile (right), W its mirror;
// three walk steps each. The kind glyph, the satchel's flap, at the flat anchors from the front and from behind, and in
// profile on the satchel where it shows at the back hip (E; W its mirror).
// Run from the Administratum root: node <this file>. Writes ui/art/pelion/adept39.png + .json (adept.mjs, imported,
// only lends its frames).
//
// Slots: the helpers' (adept.mjs).
const { writeSheet } = await import(process.cwd() + '/tools/sheet_writer.mjs');
const { frames: flat } = await import('./adept.mjs');

const mirror = rows => rows.map(r => [...r].reverse().join(''));
const frames = {};
for (const s of [0, 1, 2]) {
  frames[`S ${s}`] = flat[`down ${s}`];
  frames[`N ${s}`] = flat[`up ${s}`];
  frames[`E ${s}`] = flat[`right ${s}`];
  frames[`W ${s}`] = mirror(flat[`right ${s}`]);
}
const glyphs = Object.keys(flat).filter(n => n.startsWith('glyph '));
for (const n of glyphs) frames[n] = flat[n];
const layout = [['E 0', 'E 1', 'E 2', 'W 0', 'W 1', 'W 2', 'S 0', 'S 1', 'S 2', 'N 0', 'N 1', 'N 2'], glyphs];
const anchors = { feet: [12, 28], 'glyph S': [14, 18], 'glyph N': [5, 18], 'glyph E': [6, 19], 'glyph W': [13, 19] };
console.log(writeSheet('pelion/adept39', frames, layout, { app: 'adm-themes generators/pelion/adept39.mjs', anchors }));
