// Pelion's walls (the room-walls family): the stoa's back wall of dressed marble courses under a painted Doric frieze
// (a cornice, blue triglyphs between plain metopes, a red taenia with blue guttae, a short architrave), the wall foot a
// two-step stone plinth, the sanctum's wall the same courses in its warmer painted marble, the dark wall tops, the
// fluted column drums of the sanctum's pillars and the bays' pilasters (a Doric capital), and the beacon: a bronze torch
// on a wall bracket, unlit and lit.
// Run from the Administratum root: node <this file>. Writes ui/art/pelion/room-walls.png + .json.
//
// Slots: plates 4 (west) 5 (east) D (the sanctum's, painted red), their lit edge 7 8 H, joints 6 6 E, light veins 8 7 K, flute shade 9; triglyphs u, their
// grooves V; the taenia x; the plinth 0; wall tops A; bronze g G h U; the torch's pitch * -, its glow & =, flame f F.
const { writeSheet } = await import(process.cwd() + '/tools/sheet_writer.mjs');

const grid = (w, h, c = '.') => Array.from({ length: h }, () => Array(w).fill(c));
const put = (g, x, y, s) => [...s].forEach((c, i) => { if (c !== ' ' && g[y]?.[x + i] !== undefined) g[y][x + i] = c; });
const fill = (g, x, y, w, h, c) => { for (let j = y; j < y + h; j++) for (let i = x; i < x + w; i++) if (g[j]?.[i] !== undefined) g[j][i] = c; };
const rows = g => g.map(r => r.join(''));

// The wall's plates: two courses of 24 x 10 blocks, the second set over by half a block. Each block: its lit top edge,
// a lit left margin (the dressed draft), its joints below and at its right; a few faint veins, different in each block.
function courses(P, L, J, Vn) {
  const g = grid(24, 20, P);
  for (const [y0, jx] of [[0, 23], [10, 11]]) {
    fill(g, 0, y0, 24, 1, L);
    fill(g, 0, y0 + 9, 24, 1, J);
    for (let y = y0; y < y0 + 9; y++) { g[y][jx] = J; g[y][(jx + 1) % 24] = y === y0 ? L : L; }
  }
  // veins: one long faint vein wandering across the lower course's block, a short one in an upper block (kept off the
  // joints and the margins), so the stamp of the repeat does not show as a mark in every block
  for (const [x, y] of [[3, 2], [4, 2], [5, 3], [6, 3], [7, 3], [8, 4], [9, 5], [10, 5], [11, 5], [12, 6], [13, 6], [14, 7], [15, 13], [16, 14], [17, 14], [18, 15], [19, 16]]) g[y][x] = Vn;
  return g;
}
// The frieze over the first course: cornice (lit face, shadow), a frieze of triglyphs (blue, two grooves) between
// plain metopes, the red taenia, the guttae under each triglyph, a short architrave, then the joint over the courses.
function frieze(P, L, J) {
  const g = grid(24, 20, P);
  fill(g, 0, 0, 24, 1, J); // the shadow under the roof
  fill(g, 0, 1, 24, 1, L); // the cornice's lit face
  fill(g, 0, 2, 24, 1, J); // its drip, the metopes set back under it
  fill(g, 0, 3, 24, 1, J);
  for (const x0 of [0, 12]) { // a triglyph every 12: 5 wide, its capital band, two grooves
    fill(g, x0, 3, 5, 9, 'u');
    for (let y = 4; y < 12; y++) { g[y][x0 + 1] = 'V'; g[y][x0 + 3] = 'V'; }
  }
  fill(g, 0, 12, 24, 1, J);
  fill(g, 0, 13, 24, 1, L); // a lit fillet
  fill(g, 0, 14, 24, 3, 'x'); // the taenia, painted red, clear under the garland
  fill(g, 0, 17, 24, 1, J);
  for (const x0 of [0, 12]) for (const dx of [0, 2, 4]) g[17][x0 + dx] = 'u'; // the guttae
  fill(g, 0, 18, 24, 1, L); // the architrave
  fill(g, 0, 19, 24, 1, J);
  return g;
}

const frames = {};
frames['wall top'] = rows(frieze('4', '7', '6'));
frames.wall = rows(courses('4', '7', '6', '8'));
frames['wall east top'] = rows(frieze('5', '8', '6'));
frames['wall east'] = rows(courses('5', '8', '6', '7'));
// the sanctum: the same marble frieze over courses painted red (an orthostate dado, as in the painted Macedonian
// tombs), their joints and draft in darker and lighter red
{
  const g = frieze('4', '7', '6');
  fill(g, 0, 19, 24, 1, 'E');
  frames['wall sanctum top'] = rows(g);
}
frames['wall sanctum'] = rows(courses('D', 'H', 'E', 'K'));
// the plinth: two steps, each a lit lip over its face and its shadow
frames['wall foot'] = ['7777', '0000', '0000', '6666'];
// the wall's top seen from above: dark stone
frames['wall dark'] = ['AAAA', 'AAAA', 'AAAA', 'AAAA'];
// the scriptorium's bottom wall: a marble kerb, then the wall's dark top
frames['wall base'] = ['7777', '6666', 'AAAA', 'AAAA', 'AAAA', 'AAAA'];
// the sanctum's bottom wall: the dark top, its marble kerb at the foot
frames['sanctum base'] = ['AAAA', 'AAAA', 'AAAA', 'AAAA', 'EEEE', 'HHHH'];
// the sanctum's pillar: a fluted shaft, lit from the left, its shadow side at the right
frames.pillar = Array(8).fill('6' + '749'.repeat(5) + '74' + '6k');
// the bays' pilaster: a Doric capital (abacus, echinus, necking), a fluted shaft in drums, its plinth under the sill
{
  const g = grid(8, 39, '.');
  put(g, 0, 0, '77777777'); put(g, 0, 1, '44444446'); put(g, 0, 2, '66666666'); // abacus
  put(g, 0, 3, '.777744.'); put(g, 0, 4, '..44446.'); // echinus
  put(g, 0, 5, '.666666.'); // necking
  for (let y = 6; y < 36; y++) put(g, 0, y, y === 16 || y === 26 ? '.966669.' : '.674946.');
  put(g, 0, 36, '77777777'); put(g, 0, 37, '00000000'); put(g, 0, 38, '66666666');
  frames.pilaster = rows(g);
}
// The beacon: a bronze torch held in a wall bracket. Off: the cup packed with dark pitch. On: a flame out of the cup.
// The cage: the bracket's ring and arm, drawn over the torch.
const torch = flame => {
  const g = grid(14, 20, '.');
  put(g, 3, 6, 'GggggggG'); put(g, 3, 7, 'Uhggggg=U'.slice(0, 8)); // the cup's rim
  put(g, 4, 8, 'GgggggG'); put(g, 5, 9, 'GgggG'); put(g, 5, 10, 'UgggU'); // the cup tapering
  for (let y = 11; y < 19; y++) put(g, 6, y, 'GgU'); // the handle
  put(g, 5, 19, 'UGGGU');
  if (!flame) { put(g, 4, 5, '-****-'); put(g, 5, 4, '-**-'); } // pitch heaped in the cup
  else {
    put(g, 6, 0, 'f'); put(g, 5, 1, 'fF'); put(g, 4, 2, '&fFf'); put(g, 4, 3, '&fFFf&'); put(g, 3, 4, '&fFFFf&'); put(g, 3, 5, '&&fFf&&');
    put(g, 3, 6, 'GhhhhhhG'); put(g, 3, 7, 'Uhhgggh='.slice(0, 8)); // the cup's rim lit by the flame
  }
  return rows(g);
};
frames['beacon off'] = torch(false);
frames['beacon on'] = torch(true);
{
  const g = grid(14, 20, '.');
  put(g, 4, 12, 'UhhhhU'); put(g, 4, 13, 'GGGGGG'); // the ring round the handle
  put(g, 10, 12, 'g'); put(g, 10, 13, 'gG'); put(g, 11, 14, 'gG'); put(g, 12, 15, 'G'); // the arm back to the wall
  put(g, 11, 16, 'hGU'); put(g, 11, 17, 'GUU'); // its wall plate
  frames['beacon cage'] = rows(g);
}

const layout = [
  ['wall top', 'wall', 'wall east top', 'wall east', 'wall sanctum top', 'wall sanctum'],
  ['wall foot', 'wall dark', 'wall base', 'sanctum base', 'pillar', 'pilaster', 'beacon off', 'beacon on', 'beacon cage'],
];
const anchors = {
  pilaster: { sill: [0, 30] },
  'beacon off': { centre: [7, 13], sweep: [4, 1, 6, 6] },
  'beacon on': { centre: [7, 13], sweep: [4, 1, 6, 6] },
  'beacon cage': { centre: [7, 13], sweep: [4, 1, 6, 6] },
};
const tiles = {
  wall: { fill: 'repeat', top: 'wall top' }, 'wall east': { fill: 'repeat', top: 'wall east top' },
  'wall sanctum': { fill: 'repeat', top: 'wall sanctum top' }, 'wall foot': { fill: 'repeat' }, 'wall dark': { fill: 'repeat' },
  'wall base': { fill: 'repeat-x' }, 'sanctum base': { fill: 'repeat-x' }, pillar: { fill: 'repeat-y' },
};
console.log(writeSheet('pelion/room-walls', frames, layout, { app: 'adm-themes generators/pelion/room-walls.mjs', anchors, tiles }));
if (process.argv.includes('--print')) for (const [n, f] of Object.entries(frames)) console.log(n + '\n' + f.join('\n'));
