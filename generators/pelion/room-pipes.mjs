// Pelion's "pipes" (the room-pipes family): an olive garland in place of the pipe runs, a twisted rope of olive leaves
// (dark green above, silver-green beneath) along the frieze and down the walls; the fittings its bronze hooks, each
// with a knot of red ribbon whose tails hang below the garland; the wide fitting a studded bronze band round a pillar.
// Run from the Administratum root: node <this file>. Writes ui/art/pelion/room-pipes.png + .json.
//
// Slots: leaves v (olive) M (shade) Y (the silver underside); bronze g G h U; ribbon x and ) (its lit fold).
const { writeSheet } = await import(process.cwd() + '/tools/sheet_writer.mjs');

const frames = {};
// along: leaves in pairs, slanting forward, over and under the rope, a pair every 4 px
frames['pipe h'] = [
  '.Yv...Yv',
  'Yvv.YYvv',
  'vMvvvMvv',
  'MvMvMvMv',
  '.MvM.MvM',
  '..M...M.',
];
// down: the same rope turned, its leaves slanting downward
frames['pipe v'] = [
  '.Yv...',
  'YvMv..',
  'vvvMM.',
  '.vMvvM',
  '.Yv...',
  'YvMv..',
  'vvvMM.',
  '.vMvvM',
];
// the hook over the garland: a bronze nail and its hook, a red ribbon knotted round the rope, its two tails hanging
frames['fitting h'] = [
  '.hgG..',
  '.GUU..',
  '..g...',
  'x)xx).',
  ')xUx)x',
  '.x)x..',
  '.x..x.',
  '.)..).',
  'x....x',
  '......',
];
// the hook beside the garland coming down the wall: a bronze ring round it, the ribbon's tails to the side
frames['fitting v'] = [
  '.hG.......',
  '.gg)xx....',
  '.gUx)x)x..',
  '.gg)xx..x.',
  '.hG.....).',
  '..........',
];
// the band round the pillar over the passage: bronze, studded
frames['fitting wide'] = [
  'hhhhhhhhhhhhhhhhhhhG',
  'ghggghggghggghggghgU',
  'GUGGGUGGGUGGGUGGGUGU',
  'UUUUUUUUUUUUUUUUUUUU',
];

const layout = [['pipe h', 'pipe v', 'fitting h', 'fitting v', 'fitting wide']];
const tiles = { 'pipe h': { fill: 'repeat-x' }, 'pipe v': { fill: 'repeat-y' } };
console.log(writeSheet('pelion/room-pipes', frames, layout, { app: 'adm-themes generators/pelion/room-pipes.mjs', tiles }));
if (process.argv.includes('--print')) for (const [n, f] of Object.entries(frames)) console.log(n + '\n' + f.join('\n'));
