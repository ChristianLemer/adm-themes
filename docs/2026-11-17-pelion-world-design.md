# Pelion: the school of Chiron

Status: design, not built. A full world for [Administratum](https://github.com/Arylmera/Administratum), delivered as
a theme of this pack (`pelion/`), at the depth of the Warhammer 40k world: every character, every piece of
furniture, the room, Flat and 2.5D.

## Intent

A Greek world for a harness whose methods carry Greek names and whose companion is Chiron, the centaur. The hall
becomes the place where Chiron taught: not Olympus, not a temple, a school. Sessions are his students at work; he
looks over what they do. The centaur is the heart of it: two natures in one body, the teacher who works beside.

## Setting

The school on Mount Pelion, in daylight marble and at night under oil lamps: a stoa open between its columns onto
the Aegean, olive trees beyond, a mosaic floor with a meander border, the mouth of Chiron's cave at the far end.

- Not the cartoon Olympus: no gods, no lightning, no togas (those are Roman).
- Not ruins: the marble is new, painted where the Greeks painted it (a blue and a red band, not white everywhere).
- Not machinery: one machine only, the mechanism on the back wall.

## The cast

| Role in the hall | Warhammer 40k | Pelion |
|---|---|---|
| A session (`scribe`) | a robed scribe | a student in a chiton and a himation, at a stone table; the department colour (`y`) is the band of the himation, readable front, back and side |
| A subagent (`adept`) | an adept | a young helper carrying scrolls or an amphora; the subagent's kind glyph on the satchel, front and back |
| The master (`magos`) | the Magos on his throne | **Chiron**, the centaur, at rest on folded legs by his table, a staff in his hand (the moving `arm`) |
| The drone (`skull`) | the servo-skull | Athena's little owl |
| The night watchman (`watch`) | the Inquisitor | a hoplite on night watch: round shield on his back, a lantern in his hand |
| The Suzerain's dais (`suzerain`) | a dais and its links | a low stone exedra, and a painted cord for the links |

## Art, by family

Sizes and anchors are the default art's, as every pack must keep them. Every sprite is a new drawing; nothing of
the 40k art stays in a redrawn family.

| Family | Pelion design |
|---|---|
| `scribe`, `scribe39` | the students: three rank looks through the rank slots (see Ranks), the himation band in `y` |
| `adept`, `adept39` | the helpers, satchel with the kind glyph |
| `magos`, `magos39` | Chiron: horse body at rest, human torso upright, beard, a wreath; the `arm` is his arm with the staff; the `claw` (drawn now and then by the app, a tap) is his hand tapping the scroll; the app's pulsing chest light is a bronze pendant, its eye glints his eyes (anchors moved to fit) |
| `sanctum` | `THRONE`: the rock ledge with a fleece he rests on (the app draws his body over it: the two are drawn together); `LORD_DESK`: a stone table with a lyre, a mortar of herbs and scrolls; `COG_MECH`: a bronze medallion, the centaur in profile; `SEAL`: a clay seal on a cord |
| `workstations` | `DESK`: a marble table with a wax tablet, a stylus, an abacus of pebbles and a lamp; `LECTERN`: a narrow reading stand with an open scroll; `CONSOLE`: the helper's small table; `SHELL_COG`: a hand astrolabe ring turning |
| `cogitator` | **the Antikythera mechanism**, large: bronze front plate, the gear train seen through an open side, and three dial faces placed where the app animates the default's screens: the app's moving marks then read as the pointers sweeping the great dial, the small dial and the calendar scale, in amber on bronze |
| `walls` | `WINDOW` / `WINDOW_TALL`: the space between two columns, sea and sky by day, stars by night (the app only swaps a few colours between day and night, so the stars are specks drawn in a slot that is sky-coloured by day and bright by night); `SHELF`: a rack of scroll pigeonholes; `BANNER`, `HANGING`: woven hangings with a meander and a wave band; `GAUGE`: a small sundial; `CENSER`: a hanging oil lamp |
| `room-floor` | pebble mosaic, meander border along the channels; the sanctum's floor a rosette mosaic |
| `room-walls` | dressed marble courses under a painted frieze (blue triglyphs, red band); column drums for the pillars; the beacon a bronze torch |
| `room-doors` | bronze doors with studs; the sanctum's a taller pair |
| `room-pipes` | a garland of olive on bronze hooks in place of the pipes |
| `gate` | a small propylon: two columns, a pediment, bronze doors; the void beyond is the mountain path at dusk |
| `fire` | a bronze tripod brazier; a cluster of clay oil lamps |
| `clutter` | scroll baskets, stacked tablets, amphorae, a crate of ostraka, loose papyrus |
| `petitions` | `SCROLL`: a potsherd with writing; `QSCROLL`: the potsherd with a large question mark; `SCROLL_HELD`: a wax tablet held out |
| `commits` | a laurel sprig, a clay seal, a bronze stamp |
| `refectorium` | the symposion: `RECAFF` a krater on its stand, `TABLE` a long low table, `BENCH` couches |
| `breakout` | the palaistra: sand floor, a low stone kerb, a herm at the gate |
| `enclave` | a small walled garden court for a custom room, same kit as the palaistra |
| `honours` | a marble stele with laurel wreaths and cut letters |
| `lift` | the mēchanē, the theatre's crane: timber frame, a rope, a basket car |
| `watch`, `watch39` | the hoplite |
| `suzerain` | the exedra and the cord |
| `skull39` | the owl in 2.5D |
| `faces` | the 2.5D volumes of all the furniture above, edited by hand (there is no generator for them), built last |

Every frame of a family is redrawn, the small ones too: the students' arms at the table and the scroll they hold
up, the watchman's ring, the dozing Z, the flames, the lift's doors and lamp, the half-open doors, the sixteen
steps of the turning ring, the floor's sills and vents, the walls' feet and pilasters.

## Palette

Marble and sun, not white on white: the hall must stay readable for hours.

- Marble warm ivory with a grey-blue shadow; floor pebbles in sand, slate and terracotta.
- Bronze for every metal (in place of brass and iron), with a green patina shadow.
- Aegean blue and a brick red for the painted bands; olive green for the garlands.
- Night: lamplight amber on blue-grey stone, stars and a dark sea in the windows.
- Chrome (the page around the hall): dark, like most worlds, so the marble reads as lit. A light chrome was
  considered and set aside: it makes the hall the dark thing on the screen.
- The builder tunes the exact values against the contrast test Administratum applies to its shipped themes. That
  test runs while Pelion sits in the work branch; the pack check does not apply it, so it is run before delivery.

## Ranks

The app draws one student and recolours him by rank, so rank is colour, never shape. Every student wears the
chiton, the himation with its department band, and a wreath; what changes is what the colours let you see:

| Rank | Look | Name |
|---|---|---|
| high | a deep blue himation with a gold border, the wreath in gold | *to be named by Christian* |
| standard | undyed linen; the border and the wreath take the cloth's and the hair's colour, so they do not show | *to be named by Christian* |
| novice | grey cloth throughout, border and wreath hidden the same way | *to be named by Christian* |

The helpers follow the same rule on their tunic and satchel.

## Wording

The world rewords the hall in its own terms. Proposed, all open to Christian's naming:

| Key | 40k | Proposed |
|---|---|---|
| subtitle | II · Data-Shrine of the Cult Mechanicus | Pelion · School of Chiron |
| motto | Knowledge is power, guard it well | One creature, moving together |
| ranks (high / standard / novice) | Magos / Tech-priest / Novice | Sophos / Mathētēs / Ephēbos |
| a petition | petition | aporia (plural aporiai) |
| the break-out room | Menial Pen | Palaistra |
| the room of the departments in no rule | Elsewhere | Agora |
| the night watchman | Inquisitor | Argos |
| summoned by / suzerain of | Summoned by / Suzerain of | Sent by / Mentor of |
| the refectory | Refectorium | Symposion |
| the back-wall machine | cogitator | the mechanism |
| Hall of Honours | Honours of the Week | Laurels of the week |
| the day's log | Chronicon | Chronicon (already Greek) |
| tokens and time | Tithe | Obols |
| Settings sections | Hall, Petitions, Scribes | Stoa, Aporiai, Students |

## Constraints

- **It is a pack.** Data only: `theme.json` and sheets. No behaviour of its own (no special animation, nothing the
  40k world does in code). Frame sizes and anchors are the default's.
- **Fonts.** A pack may use only the two fonts Administratum bundles: VT323 (a terminal face) and Pirata One (a
  blackletter). Neither is Greek in feel; VT323 is the neutral one and is the choice. No Greek letterforms: the
  bundled fonts are Latin, so words are transliterated (aporia, not ἀπορία). Whether the macrons of Mathētēs or
  Ephēbos draw in VT323 must be checked on screen before the wording is fixed; if not, they are written without.
- **Wording a pack may not change:** the "risky" mark of a petition, the reject-all line, the failed-answer toast,
  and the pack-management labels.
- **Limits:** a sheet at most 1024 frames and 2048 px a side; the pack 2000 files, 2 MiB each.
- **Chiron in a 48x48 frame.** The master's frame is a seated figure's. A centaur does not sit: he rests on folded
  legs, torso upright. This is the hardest drawing of the world and is done first among the furniture, so it can be
  rethought (a three-quarter view, the horse body behind the table) before the sanctum is built around it.

## How it is built and delivered

- Drawn in a work branch of Administratum that is never offered upstream, as a shipped theme folder
  (`ui/art/pelion/`), because the sprite viewer, the galleries, the art tests and the generators live there. The
  house recipe for drawing a family applies (the default read for sizes and anchors only, a generator script per
  family, the sheet written by `tools/sheet_writer.mjs`, the look checked in the viewer).
- Delivered by moving the folder here as `pelion/`, with its `worldName`, checked with
  `node tools/theme_pack.mjs check`, then installed in the app from this repository like Breaking Bad.
- The generators written for it are kept here under `generators/pelion/`.
- Order, with a stop to look after the second step:
  1. The theme: palette, wording, ranks (the hall then shows 40k art in Pelion's colours).
  2. The look: students, helpers, the room (floor, walls, doors, garlands), tables, windows. **Christian looks,
     in the app, before anything else is drawn.**
  3. Chiron and his place; the mechanism; owl, gate, fire.
  4. The small things: clutter, petitions, commits, the symposion.
  5. Palaistra, court, stele, mēchanē, the hoplite, the exedra.
  6. The 2.5D characters and volumes.
  7. Delivery to this repository, and the install.

## Left to the builder

- Exact colours, within the palette above and the contrast test.
- The drawing of each sprite, within its row of the table.
- Which families get a generator and which are drawn frame by frame.

## Later

- Styles of this world (a night school, a bronze-age Pelion): recolourings, each a few lines.
- A sprite viewer pointed at a pack, so a world can be drawn outside an Administratum checkout.
