// Pelion's volumes in the 2.5D view (the faces sheet, ui/faces.js): every object of the default faces, so that none
// borrows the default world's wooden sides and tops; where no side or top frame is drawn here the 39° builder takes
// them from the edge colours of Pelion's own front, in Pelion's colours. The room's mechanism stands on its marble
// plinth (the plinth the box, the cabinet a box on it). The three tables are shaped to Pelion's drawing
// (workstations.mjs): the box is the marble slab's front edge down to the floor (open between the pedestals, its side
// drawn only at the slab), a marble top (veins, a lit front arris), the two pedestals boxes of their own, the back
// stretcher, the wax diptych standing at the back, the abacus and the stylus lying flat, the clay lamp a cylinder with
// its flame; the flat view's slab top (drawn in perspective) is kept for the flat frame only.
// Run from the Administratum root: node <this file>. Writes ui/art/pelion/faces.png + .json (meta.objects).
//
// Slots: marble X (lit) s (face) 7 (veins) 9 6 (shade), outline k.
import fs from 'node:fs';
const { writeSheet, artDir } = await import(process.cwd() + '/tools/sheet_writer.mjs');

const base = JSON.parse(fs.readFileSync(`${artDir}/faces.json`, 'utf8')).meta.objects;
const VS = 2 / Math.tan(39 * Math.PI / 180), cols = d => Math.ceil(d / VS);
const objects = structuredClone(base);
const frames = {};

// a marble top, `rows` deep (row 0 at the back) and w wide: the face s, a few veins 7, the front arris X, a dark back
// edge; x0..x1 the slab's extent (outside it '.')
function marbleTop(w, rows, veins, x0 = 0, x1 = w - 1) {
  const g = Array.from({ length: rows }, (_, j) => Array.from({ length: w }, (_, i) => (i < x0 || i > x1 ? '.' : j === 0 ? '9' : j === rows - 1 ? 'X' : i === x0 ? 'X' : i === x1 ? '9' : 's')));
  for (const [x, y, n] of veins) for (let i = 0; i < n; i++) if (g[y]?.[x + i] === 's') g[y][x + i] = '7';
  return g.map(r => r.join(''));
}
// a slab's side, h rows (of the box) x c columns: the slab's edge in its top `slab` rows, open below
const slabSide = (h, c, slab) => Array.from({ length: h }, (_, r) => (r >= slab ? '.' : r === 0 ? '7' : r === slab - 1 ? 'k' : '9').repeat(c).split('').map((ch, j) => (r < slab && j === c - 1 ? 'k' : ch)).join(''));

// the student's table, 64 x 42 (workstations.mjs DESK)
objects.DESK = {
  front: [0, 26, 64, 16], d: 24,
  details: [
    { name: 'pedestal', rect: [2, 31, 9, 11], kind: 'box', v: 4, d: 16 },
    { name: 'pedestal 2', rect: [53, 31, 9, 11], kind: 'box', v: 4, d: 16 },
    { name: 'stretcher', rect: [10, 31, 44, 3], kind: 'box', v: 6, d: 2 },
    { name: 'diptych', rect: [13, 7, 23, 13], kind: 'box', v: 5, d: 2, z: 16 },
    { name: 'abacus', rect: [38, 19, 15, 7], kind: 'top', v: 5 },
    { name: 'stylus', rect: [8, 21, 12, 4], kind: 'top', v: 13 },
    { name: 'lamp', rect: [48, 11, 12, 7], kind: 'cyl', v: 8, z: 16 },
    { name: 'flame', rect: [48, 7, 4, 4], kind: 'bill', v: 8, z: 23 },
  ],
  flatOnly: [{ name: 'the slab top as the flat view draws it', rect: [0, 18, 64, 8] }],
};
frames['DESK top'] = marbleTop(64, cols(24), [[5, 2, 6], [11, 3, 3], [30, 6, 5], [35, 7, 3], [45, 2, 4], [49, 3, 4]]);
frames['DESK side'] = slabSide(16, cols(24), 5);
// the compact table, 44 x 42 (LECTERN)
objects.LECTERN = {
  front: [0, 26, 44, 16], d: 24,
  details: [
    { name: 'pedestal', rect: [2, 31, 9, 11], kind: 'box', v: 4, d: 16 },
    { name: 'pedestal 2', rect: [33, 31, 9, 11], kind: 'box', v: 4, d: 16 },
    { name: 'stretcher', rect: [10, 31, 24, 3], kind: 'box', v: 6, d: 2 },
    { name: 'diptych', rect: [2, 7, 21, 13], kind: 'box', v: 5, d: 2, z: 16 },
    { name: 'stylus', rect: [26, 21, 12, 4], kind: 'top', v: 13 },
    { name: 'lamp', rect: [32, 11, 12, 7], kind: 'cyl', v: 8, z: 16 },
    { name: 'flame', rect: [32, 7, 4, 4], kind: 'bill', v: 8, z: 23 },
  ],
  flatOnly: [{ name: 'the slab top as the flat view draws it', rect: [0, 18, 44, 8] }],
};
frames['LECTERN top'] = marbleTop(44, cols(24), [[4, 2, 4], [8, 3, 3], [24, 6, 4], [36, 3, 3]]);
frames['LECTERN side'] = slabSide(16, cols(24), 5);
// the helper's table, 28 x 20 (CONSOLE): a small slab on one pedestal, the wax tablet propped on it
objects.CONSOLE = {
  front: [3, 12, 22, 8], d: 14,
  details: [
    { name: 'pedestal', rect: [9, 13, 9, 7], kind: 'box', v: 3, d: 8 },
    { name: 'tablet', rect: [7, 0, 15, 10], kind: 'box', v: 4, d: 2, z: 8 },
  ],
  flatOnly: [{ name: 'the top and the stylus as the flat view draws them', rect: [3, 8, 22, 4] }],
};
frames['CONSOLE top'] = marbleTop(22, cols(14), [[4, 2, 3], [14, 3, 3]]);
frames['CONSOLE side'] = slabSide(8, cols(14), 1);

// the master's table, 88 x 26 (sanctum.mjs LORD_DESK): a marble slab with a blue and a red painted edge on two
// marble supports; on it the lyre, the bronze mortar and the scrolls
objects.LORD_DESK = {
  front: [0, 10, 88, 16], d: 26,
  details: [
    { name: 'support', rect: [6, 14, 12, 12], kind: 'box', v: 6, d: 14 },
    { name: 'support 2', rect: [70, 14, 12, 12], kind: 'box', v: 6, d: 14 },
    { name: 'lyre', rect: [8, 0, 12, 9], kind: 'box', v: 9, d: 2, z: 16 },
    { name: 'mortar', rect: [35, 0, 11, 9], kind: 'cyl', v: 12, z: 16 },
    { name: 'scrolls', rect: [51, 3, 37, 6], kind: 'top', v: 6 },
  ],
  flatOnly: [{ name: 'the slab top and what lies on it as the flat view draws them', rect: [0, 0, 88, 10] }],
};
frames['LORD_DESK top'] = marbleTop(88, cols(26), [[6, 2, 5], [12, 3, 3], [40, 7, 6], [62, 3, 4], [78, 6, 4]]);
frames['LORD_DESK side'] = Array.from({ length: 16 }, (_, r) => (r < 4 ? '7ux9'[r] : r === 4 ? 'k' : '.').repeat(cols(26)));
// the symposion's krater, 32 x 36 (refectorium.mjs RECAFF): round things, so cylinders: the bell krater (its ladle
// hooked over the rim) on a fluted marble pedestal, the wine jug and the hydria on the floor
delete objects.RECAFF.front; delete objects.RECAFF.recess;
Object.assign(objects.RECAFF, { d: 16, details: [
  { name: 'pedestal', rect: [7, 22, 18, 14], kind: 'cyl', v: 8 },
  { name: 'krater', rect: [0, 0, 32, 22], kind: 'cyl', v: 8 },
  { name: 'jug', rect: [0, 26, 7, 10], kind: 'cyl', v: 13 },
  { name: 'hydria', rect: [25, 25, 7, 11], kind: 'cyl', v: 13 },
] });

// the room's mechanism, 32 x 24 (roomcog_art.mjs): the box is the marble plinth on the floor, a step wider than the
// cabinet and with a marble top; the olive-wood cabinet a box on it, its dial set into the face; the pediment on top
objects.ROOMCOG = {
  front: [0, 20, 32, 4], d: 12,
  details: [
    { name: 'cabinet', rect: [2, 6, 28, 14], kind: 'box', v: 1, d: 10, recess: [{ name: 'dial', rect: [10, 8, 12, 8], depth: 2, wall: 'k' }] },
    { name: 'pediment', rect: [0, 0, 32, 6], kind: 'box', v: 2, d: 7 },
  ],
};
frames['ROOMCOG top'] = marbleTop(32, cols(12), [[4, 2, 3], [20, 3, 4]], 1, 30);
frames['ROOMCOG cabinet top'] = Array.from({ length: cols(10) }, (_, j) => (j === 0 ? 'W' : j === cols(10) - 1 ? 'L' : 'w').repeat(28));

const names = Object.keys(frames);
console.log(writeSheet('pelion/faces', frames, [names], { app: 'adm-themes generators/pelion/faces.mjs' }));
const file = `${artDir}/pelion/faces.json`, json = JSON.parse(fs.readFileSync(file, 'utf8'));
json.meta.objects = objects;
fs.writeFileSync(file, JSON.stringify(json, null, 2) + '\n');
