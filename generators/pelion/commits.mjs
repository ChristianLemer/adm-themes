// Pelion's commit marks (the commits family), hung on the front edge of a student's table. A work is sealed in red
// clay and crowned with laurel: COMMIT_TAG the clay seal's cord hanging ready, a lump of raw clay on its knot (the
// app then drops the red clay on it); COMMIT_STAMP the bronze seal-stamp the app brings down on it (a ring handle, a
// waisted stem, a flared foot); COMMIT_SEAL the sealed work as it stays on the table: the red clay bulla stamped
// with a ring, a laurel sprig bound under it.
// Run from the Administratum root: node <this file>. Writes ui/art/pelion/commits.png + .json.
//
// The app (scene.js stamp) drops its clay (px '(') on art px x 1-6, rows 2-5 and brings the stamp's foot down to
// row 5, so the bulla and the raw clay sit there.
// Slots: red clay ( ) [, raw clay : N, cord x, laurel v Y M (stem W), bronze h g G U.
const { writeSheet } = await import(process.cwd() + '/tools/sheet_writer.mjs');

const frames = {
  COMMIT_SEAL: [
    '.kkkkkk.',
    'k))(((k.',
    'k)[[[(k.',
    'k([)[(k.',
    'k([[[(k.',
    'k((((([k',
    '.kkWkkk.',
    'kYkWkYk.',
    'kvYWYvk.',
    '.kvWvkYk',
    'kYkWkvYk',
    'kvYWYvk.',
    '.kvWvkk.',
    '..kWYk..',
    '...kk...',
  ],
  COMMIT_TAG: [
    '........',
    '........',
    '..kkkk..',
    '.k:::Nk.',
    '.k:NNNk.',
    '..kkkk..',
    '..kxxk..',
    '..kx(k..',
    '..k(xk..',
    '.kx(kxk.',
    '.kxk.xk.',
    '.k(k.(k.',
    '.kxk.xk.',
    '..k...k.',
    '........',
  ],
  COMMIT_STAMP: [
    '..kkkk..',
    '.kh..gk.',
    '.kh..Gk.',
    '..kggk..',
    '..khGk..',
    '..khGk..',
    '..khGk..',
    '.khhgGk.',
    'khhggGGk',
    'kgggGGUk',
    'kUUUUUUk',
    'kkkkkkkk',
  ],
};

const rows = [['COMMIT_SEAL', 'COMMIT_TAG', 'COMMIT_STAMP']];
console.log(writeSheet('pelion/commits', frames, rows, { app: 'Pelion theme art (adm-themes generators/pelion/commits.mjs)' }));
