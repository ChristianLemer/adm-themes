// Pelion's master in the 2.5D view (the magos39 family): Chiron as the flat view draws him (magos.mjs), at rest on his
// rock ledge, side on and facing left, the man turned three-quarters to us; the same staff arm and tapping finger, the
// same anchors. The 39° view seats him on its own throne volume; his body is not foreshortened, as the students'.
// Run from the Administratum root: node <this file>. Writes ui/art/pelion/magos39.png + .json.
//
// Slots: magos.mjs's.
const { writeSheet } = await import(process.cwd() + '/tools/sheet_writer.mjs');
const { FRAMES, ANCHORS } = await import('./magos.mjs');
console.log(writeSheet('pelion/magos39', FRAMES, [['body', 'arm', 'claw']], { app: 'adm-themes generators/pelion/magos39.mjs', anchors: ANCHORS }));
