// Pelion's machine on the back wall (the cogitator family): the Antikythera mechanism, large, in its wooden case on a
// marble plinth. The front is a bronze plate holding three dials where the app animates the default's screens: the
// great dial (zodiac and calendar rings, the sun's and the moon's pointers) under `screen`, a small dial under `wave`
// and the calendar scale (seven slots for the parapegma's pegs) under `bars`; the app's moving marks, in the theme's
// screen inks (dark bronze and a bright glint), read as engraved marks and pointers sweeping them. Below the great dial
// a rail of seven beads, the seven wanderers (`lamps`: the app darkens those not lit); under the small dials four
// subsidiary dials; a bronze plaque engraved with the instructions. The case's left side is open on the gear train
// (two great wheels under the left `drums`, pinions meshing), its right side carries the crank (the right `drums`);
// turned olive-wood posts flank it. On top, the moon-phase ball in its ring, and two small bronze incense burners
// whose smoke is the app's steam from `vents`.
// Run from the Administratum root: node <this file>. Writes ui/art/pelion/cogitator.png + .json (anchors the default's).
//
// The face sheet (faces.test) cuts the frame into the default's volumes, so every pixel is inside them: the front
// (x 9-154, rows 15-96), the posts (x 0-10 and 153-163, rows 29-96), the burners (x 34-54 and 108-129, rows 6-14),
// the ball (x 70-93, rows 0-14), the painted shadow (rows 97-99).
// Slots: bronze h g G U m (the darker inner face), k outline; olive wood L w W, the open side's depth n; marble X s 7
// 4 9; the beads o X 7 F x h 9; the moon ball X and n.
const { writeSheet } = await import(process.cwd() + '/tools/sheet_writer.mjs');

const W = 164, H = 100;
const grid = (w, h) => Array.from({ length: h }, () => Array(w).fill('.'));
const g = grid(W, H);
const dot = (x, y, c) => { x = Math.round(x); y = Math.round(y); if (g[y]?.[x] !== undefined) g[y][x] = c; };
const fill = (x, y, w, h, c) => { for (let j = y; j < y + h; j++) for (let i = x; i < x + w; i++) dot(i, j, c); };
const put = (x, y, rows) => rows.forEach((r, j) => [...r].forEach((c, i) => { if (c !== '.') dot(x + i, y + j, c); }));
const box = (x, y, w, h, c, edge = 'k') => { fill(x, y, w, h, c); fill(x, y, w, 1, edge); fill(x, y + h - 1, w, 1, edge); fill(x, y, 1, h, edge); fill(x + w - 1, y, 1, h, edge); };
const disc = (cx, cy, r, c) => { for (let y = Math.floor(cy - r); y <= cy + r; y++) for (let x = Math.floor(cx - r); x <= cx + r; x++) if ((x - cx) ** 2 + (y - cy) ** 2 <= r * r) dot(x, y, c); };
const ring = (cx, cy, r0, r1, c) => { for (let y = Math.floor(cy - r1); y <= cy + r1; y++) for (let x = Math.floor(cx - r1); x <= cx + r1; x++) { const d = (x - cx) ** 2 + (y - cy) ** 2; if (d <= r1 * r1 && d > r0 * r0) dot(x, y, c); } };
const line = (x0, y0, x1, y1, c) => { const n = Math.max(Math.abs(x1 - x0), Math.abs(y1 - y0)); for (let i = 0; i <= n; i++) dot(x0 + ((x1 - x0) * i) / n, y0 + ((y1 - y0) * i) / n, c); };
const ray = (cx, cy, a, r0, r1, c) => line(cx + Math.cos(a) * r0, cy + Math.sin(a) * r0, cx + Math.cos(a) * r1, cy + Math.sin(a) * r1, c);
// A bronze dial: dark rim, a lit ring, ticks, a face; lit from the upper left.
const shade = (cx, cy, r, lit, mid, dark) => { for (let y = Math.floor(cy - r); y <= cy + r; y++) for (let x = Math.floor(cx - r); x <= cx + r; x++) if ((x - cx) ** 2 + (y - cy) ** 2 <= r * r) { const s = (x - cx) + (y - cy); dot(x, y, s < -r * 0.5 ? lit : s > r * 0.6 ? dark : mid); } };
// A toothed wheel in the case's depth: teeth on the rim, four spokes, the hub (the app turns a lit notch round it).
function wheel(cx, cy, r, teeth) {
  for (let i = 0; i < teeth; i++) { const a = (i / teeth) * 2 * Math.PI; dot(cx + Math.cos(a) * (r + 1), cy + Math.sin(a) * (r + 1), 'G'); }
  shade(cx, cy, r, 'h', 'g', 'G');
  ring(cx, cy, r - 1.5, r - 0.5, 'G');
  if (r > 3) { disc(cx, cy, r - 1.6, 'n'); for (let i = 0; i < 4; i++) ray(cx, cy, Math.PI / 4 + (i * Math.PI) / 2, 1, r - 1, i < 2 ? 'g' : 'G'); }
  disc(cx, cy, 1.2, 'h'); dot(cx, cy, 'k');
}

// --- the ball on top: the moon's phase in its bronze ring, a finial, two palmette brackets (x 70-93, rows 0-14)
put(80, 0, ['.kk.', 'khgk', 'kgGk']);
ring(81.5, 8.5, 5.2, 6.4, 'k'); ring(81.5, 8.5, 4.2, 5.2, 'g');
for (let y = 3; y <= 14; y++) for (let x = 75; x <= 88; x++) { const d = (x - 81.5) ** 2 + (y - 8.5) ** 2; if (d <= 27 && d > 17.6 && x + y < 88) dot(x, y, 'h'); }
disc(81.5, 8.5, 4.2, 'k'); disc(81.5, 8.5, 3.3, 'n'); // the ball: half dark,
for (let y = 5; y <= 12; y++) for (let x = 78; x <= 81; x++) if ((x - 81.5) ** 2 + (y - 8.5) ** 2 <= 11) dot(x, y, (x === 78 || y === 6) ? 'X' : 's'); // half silver
put(71, 10, ['kkk......', 'khgkk....', 'kgGgGkk..', '.kkkGgGGk', '....kkkkk']);
put(85, 10, ['......kkk', '....kkghk', '..kkgGggk', 'kGGgGkkk.', 'kkkkk....']);
fill(79, 14, 6, 1, 'k'); fill(80, 13, 4, 1, 'G');

// --- the two incense burners (thymiateria) whose smoke rises from the vents (44, 6) and (119, 6)
for (const cx of [44, 119]) put(cx - 4, 6, [
  '....k....',
  '...khk...', // the pierced lid
  '..khkGk..',
  '.khgkgGk.',
  'kkkkkkkkk',
  'khhggggGk', // the bowl
  '.kkgGGkk.',
  '...kGk...', // the stem
  '..khgGk..', // the foot
]);

// --- the case: a moulded olive-wood top (rows 15-20)
fill(9, 15, 146, 1, 'k'); fill(10, 16, 144, 1, 'L'); fill(10, 17, 144, 1, 'w'); fill(10, 18, 144, 1, 'h'); fill(10, 19, 144, 1, 'W'); fill(9, 20, 146, 1, 'k');
dot(9, 16, 'k'); dot(9, 17, 'k'); dot(9, 18, 'k'); dot(9, 19, 'k'); dot(154, 16, 'k'); dot(154, 17, 'k'); dot(154, 18, 'k'); dot(154, 19, 'k');
for (let x = 14; x < 152; x += 8) dot(x, 18, 'G'); // bronze nails in the band
// the case's carcass (wood), rows 21-86
box(9, 21, 146, 66, 'w');
for (let y = 22; y < 86; y++) { dot(10, y, 'L'); dot(153, y, 'W'); }

// --- the open left side: the gear train in the case's depth (x 11-30)
box(11, 22, 20, 64, 'n');
wheel(18, 32, 6, 22); wheel(18, 54, 6, 22); // the great wheels (the app's turning notches: drums 1 and 2)
wheel(27, 43, 3, 10); wheel(26, 65, 4, 14); wheel(17, 75, 5, 18); wheel(27, 81, 3, 10);
line(18, 22, 18, 25, 'G'); line(18, 61, 18, 68, 'G'); // arbors
for (let y = 22; y < 86; y++) dot(30, y, 'k');

// --- the right side: a plain wooden panel with the crank (x 133-152)
box(132, 22, 21, 64, 'w');
for (let y = 23; y < 85; y++) for (const x of [136, 141, 147]) if ((y * 7 + x) % 11 > 2) dot(x, y, 'W'); // the grain
fill(133, 23, 19, 1, 'L');
// the crank wheel (drum 3: the app turns its grip round), the winding key below it (drum 4)
ring(144, 32, 5.6, 6.8, 'k'); ring(144, 32, 4.4, 5.6, 'g'); for (let y = 25; y < 32; y++) for (let x = 137; x < 145; x++) { const r = Math.hypot(x - 144, y - 32); if (r > 4.4 && r <= 5.6) dot(x, y, 'h'); }
for (let i = 0; i < 4; i++) ray(144, 32, (i * Math.PI) / 2, 1, 4.6, i < 2 ? 'g' : 'G'); disc(144, 32, 1.5, 'k'); dot(144, 32, 'h'); // the crank's hand wheel
put(147, 26, ['kk', 'hk', 'gk']); // the crank's handle
shade(144, 54, 4.5, 'h', 'g', 'G'); ring(144, 54, 4.2, 5.4, 'k'); put(142, 52, ['kkkkk', 'khggk', 'kkkkk'].map(r => r)); dot(144, 56, 'G');
for (const y of [64, 74, 84]) { dot(134, y, 'h'); dot(150, y, 'h'); }

// --- the bronze front plate (x 31-131, rows 22-63)
box(31, 22, 101, 42, 'g');
fill(32, 23, 99, 1, 'h'); fill(32, 23, 1, 39, 'h'); fill(32, 62, 99, 1, 'G'); fill(130, 24, 1, 38, 'G');
for (const [x, y] of [[34, 25], [128, 25], [34, 60], [128, 60], [60, 25], [103, 25], [60, 60], [103, 60]]) { dot(x, y, 'h'); dot(x + 1, y + 1, 'U'); } // rivets
// an engraved line of the parapegma along the top
for (let x = 64; x < 100; x++) if ((x * 5) % 7 < 4) dot(x, 25, 'G');

// the great dial (screen: x 66-97, rows 27-59): the zodiac ring, the calendar ring, the face; the sun's pointer reaching
// the zodiac, the moon's shorter with its half-silvered ball
{
  const cx = 81.5, cy = 43;
  disc(cx, cy, 16, 'k');
  disc(cx, cy, 15, 'h'); ring(cx, cy, 13.4, 15, 'g'); // the zodiac ring, lit on its upper left
  for (let y = 27; y < 60; y++) for (let x = 66; x < 98; x++) { const d = Math.hypot(x - cx, y - cy); if (d > 13.4 && d <= 15 && x + y < cx + cy - 6) dot(x, y, 'h'); }
  for (let i = 0; i < 12; i++) ray(cx, cy, (i / 12) * 2 * Math.PI + Math.PI / 12, 13.2, 15, 'U'); // the twelve signs
  ring(cx, cy, 12.4, 13.4, 'G');
  disc(cx, cy, 12.4, 'g'); // the calendar ring
  for (let i = 0; i < 36; i++) { const a = (i / 36) * 2 * Math.PI; dot(cx + Math.cos(a) * 11.6, cy + Math.sin(a) * 11.6, i % 3 ? 'G' : 'U'); }
  ring(cx, cy, 9, 10, 'G');
  disc(cx, cy, 9, 'm'); ring(cx, cy, 7.6, 9, 'g'); // the face
  const d = Math.SQRT1_2; // the sun's pointer to the upper left, its gilt sun on the zodiac
  for (let i = 0; i <= 9; i++) { const x = Math.round(cx - 0.5 - i * d), y = Math.round(cy - i * d); dot(x, y, 'F'); dot(x + 1, y, 'h'); dot(x - 1, y, 'k'); dot(x + 2, y, 'k'); }
  const sx = Math.round(cx - 0.5 - 10.5 * d), sy = Math.round(cy - 10.5 * d);
  disc(sx, sy, 2.6, 'k'); disc(sx, sy, 1.8, 'o'); dot(sx - 1, sy - 1, 'F'); dot(sx, sy - 1, 'F');
  fill(Math.round(cx) + 1, Math.round(cy) - 1, 6, 1, 'k'); fill(Math.round(cx) + 1, Math.round(cy), 6, 1, 'X'); fill(Math.round(cx) + 1, Math.round(cy) + 1, 6, 1, 'k'); // the moon's pointer, to the right
  put(Math.round(cx) + 6, Math.round(cy) - 2, ['.kkk.', 'kXXnk', 'kXnnk', '.kkk.']); // its ball, half silvered
  disc(cx, cy, 2, 'k'); fill(Math.round(cx) - 1, Math.round(cy) - 1, 2, 2, 'h');
}
// the small dial (wave: x 34-55, rows 27-43)
{
  const cx = 44.5, cy = 35;
  disc(cx, cy, 8.4, 'k'); disc(cx, cy, 7.5, 'h'); ring(cx, cy, 5.5, 7.5, 'g');
  for (let y = 27; y < 44; y++) for (let x = 36; x < 54; x++) { const r = Math.hypot(x - cx, y - cy); if (r > 5.5 && r <= 7.5 && x + y < cx + cy - 3) dot(x, y, 'h'); }
  for (let i = 0; i < 8; i++) ray(cx, cy, (i / 8) * 2 * Math.PI + Math.PI / 8, 5.8, 7.4, 'U');
  ring(cx, cy, 4.6, 5.5, 'G'); disc(cx, cy, 4.6, 'm');
  for (let i = 0; i <= 4; i++) { dot(Math.round(cx + 0.5 + i * 0.75), Math.round(cy - i), 'k'); dot(Math.round(cx + 1.5 + i * 0.75), Math.round(cy - i), 'h'); }
  disc(cx, cy, 1.4, 'k'); dot(cx - 0.5, cy - 0.5, 'h');
  for (const [x, y] of [[35, 28], [54, 28], [35, 42], [54, 42]]) dot(x, y, 'G'); // the corners' engraved stars
}
// the calendar scale (bars: x 108-129, rows 27-43): a framed plate, seven slots where the pegs rise from the foot
{
  box(107, 26, 24, 19, 'G'); fill(108, 27, 22, 1, 'g');
  for (let i = 0; i < 7; i++) { const x = 109 + 3 * i; fill(x, 28, 2, 15, 'm'); fill(x, 28, 2, 1, 'U'); dot(x + 2, 28, 'h'); } // the peg slots, their stops
  for (let y = 29; y < 43; y += 2) { dot(108, y, 'h'); dot(129, y, 'h'); } // the graduation
  fill(108, 43, 22, 1, 'g');
}
// four subsidiary dials (gauges: rows 48-58)
[[39.5, 53, -0.8], [50.5, 53, 2.4], [113.5, 53, -2.4], [124.5, 53, 0.8]].forEach(([cx, cy, a]) => {
  disc(cx, cy, 5.4, 'k'); disc(cx, cy, 4.5, 'g'); disc(cx - 0.6, cy - 0.6, 3.4, 'h'); disc(cx, cy, 2.6, 'g');
  for (let i = 0; i < 4; i++) dot(cx + Math.cos((i * Math.PI) / 2 + Math.PI / 4) * 3.6, cy + Math.sin((i * Math.PI) / 2 + Math.PI / 4) * 3.6, 'U');
  dot(cx + Math.cos(a) * 1.4, cy + Math.sin(a) * 1.4, 'k'); dot(cx + Math.cos(a) * 2.6, cy + Math.sin(a) * 2.6, 'k'); dot(cx, cy, 'k');
});
// the vertical inscriptions either side of the great dial
for (const x0 of [58, 101]) for (let y = 29; y < 58; y++) if ((y * 3 + x0) % 5 < 3) { dot(x0, y, 'G'); if (y % 4) dot(x0 + 2, y, 'G'); }

// --- the rail of the seven wanderers under the great dial (lamps: (66 + 5i, 65), 2 x 2 each)
box(62, 63, 40, 6, 'U'); fill(63, 64, 38, 1, 'G');
['o', 'X', '7', 'F', 'x', 'h', '9'].forEach((c, i) => { const x = 66 + 5 * i; fill(x, 65, 2, 2, c); });

// --- the lower case: the bronze plaque of instructions (rows 69-84)
box(38, 69, 88, 16, 'g'); fill(39, 70, 86, 1, 'h'); fill(39, 83, 86, 1, 'G');
for (const y of [72, 75, 78, 81]) { let x = 42; while (x < 121) { const n = 2 + ((x * 7 + y * 3) % 5); fill(x, y, Math.min(n, 121 - x), 1, 'G'); x += n + 1 + ((x + y) % 3 === 0 ? 2 : 0); } }
for (const [x, y] of [[40, 71], [123, 71], [40, 82], [123, 82]]) dot(x, y, 'h');
for (let x = 33; x < 37; x++) for (let y = 70; y < 84; y += 3) dot(x, y, 'W');
for (let x = 127; x < 131; x++) for (let y = 70; y < 84; y += 3) dot(x, y, 'W');

// --- the base moulding (rows 86-90) and the marble plinth (rows 91-96)
fill(9, 86, 146, 1, 'k'); fill(10, 87, 144, 1, 'L'); fill(10, 88, 144, 1, 'w'); fill(10, 89, 144, 1, 'W'); fill(9, 90, 146, 1, 'k');
for (const y of [87, 88, 89]) { dot(9, y, 'k'); dot(154, y, 'k'); }
fill(9, 91, 146, 1, 'X'); fill(9, 92, 146, 2, 's'); fill(9, 94, 146, 1, '7'); fill(9, 95, 146, 1, '9'); fill(9, 96, 146, 1, 'k');
for (const y of [91, 92, 93, 94, 95]) { dot(9, y, 'k'); dot(154, y, 'k'); }
for (let x = 30; x < 150; x += 31) { dot(x, 92, '7'); dot(x + 1, 93, '4'); }

// --- the turned olive-wood posts either side (x 0-9 and 154-163, rows 29-96): a bronze ball on top, rings, a foot
for (const x0 of [0, 154]) {
  put(x0 + 2, 29, ['.kkkk.', 'khhggk', 'khgggk', 'kgggGk', '.kkkk.']);
  for (let y = 34; y < 97; y++) { fill(x0 + 1, y, 8, 1, 'w'); dot(x0, y, 'k'); dot(x0 + 9, y, 'k'); dot(x0 + 2, y, 'L'); dot(x0 + 3, y, 'L'); dot(x0 + 7, y, 'W'); dot(x0 + 8, y, 'W'); }
  for (const y of [38, 58, 78]) { fill(x0 + 1, y, 8, 1, 'k'); fill(x0 + 1, y + 1, 8, 1, 'h'); fill(x0 + 1, y + 2, 8, 1, 'G'); fill(x0 + 1, y + 3, 8, 1, 'k'); }
  fill(x0, 34, 10, 1, 'k'); fill(x0, 96, 10, 1, 'k'); fill(x0 + 1, 92, 8, 1, 'h'); fill(x0 + 1, 93, 8, 1, 'G');
}

// --- the painted shadow on the floor (rows 97-98)
fill(2, 97, 160, 1, 'e'); fill(12, 98, 140, 1, 'e');

const out = g.map(r => r.join(''));
console.log(writeSheet('pelion/cogitator', { COGITATOR: out }, [['COGITATOR']], { app: 'Pelion theme art (adm-themes generators/pelion/cogitator.mjs)' }));
