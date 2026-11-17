# Pelion World Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** a full Greek world for Administratum, "Pelion, the school of Chiron", drawn at the depth of the 40k world (Flat and 2.5D) and delivered as the theme `pelion/` of the pack `ChristianLemer/adm-themes`.

**Architecture:** no engine change. The world is drawn as a shipped theme folder, `ui/art/pelion/` (`theme.json` plus sheets), in a work branch of Administratum that is never offered upstream, because the sprite viewer, the galleries, the art tests and the generators live there. Each family's drawing is a generator script kept in this repository under `generators/pelion/`. Delivery copies the folder here as `pelion/`.

**Tech Stack:** plain ES modules, Node `assert` test scripts, `tools/sheet_writer.mjs`, the sprite viewer and gallery of Administratum, `tools/theme_pack.mjs check`.

**Spec:** `docs/2026-11-17-pelion-world-design.md` in this repository (outranks this plan where they conflict).

## Global Constraints

- Two repositories. **ADM**: `/home/chris/orca/workspaces/administratum/pelion` (git worktree, branch `pelion`): the work branch, where `ui/art/pelion/` is drawn and tested. **No merges, no push, ever**: it is not offered upstream. **PACK**: `/home/chris/git/kosmos/5-un-environnement-agreable/adm-themes` (this repository): generator scripts and, at a delivery, the theme folder. Push PACK only at a delivery step.
- Commits in ADM: subject `Pelion: <what>`, one line, no attribution trailers, no version bump. Commits in PACK: a plain sentence, ending with the line `Co-Authored-By: Claude Fable 5.2 <noreply@anthropic.com>`.
- The theme is data: `ui/art/pelion/theme.json` (`"format": 1`, `"name": "School of Chiron"`, `"world": "pelion"`, `"worldName": "Pelion"`), listed last in `ui/art/themes.json`. Nothing in `ui/*.js` changes except the test files' lists of shipped themes. If a drawing seems to need an engine change, stop and report.
- **Drawing a family** follows Administratum's house recipe, "Shared recipe: drawing an art family" in `docs/superpowers/plans/2026-10-06-three-worlds.md` of ADM, with these differences: the generator script is `PACK/generators/pelion/<family>.mjs`, run from the ADM root (`node <PACK>/generators/pelion/<family>.mjs`) and importing the writer with `await import(process.cwd() + '/tools/sheet_writer.mjs')`; the family is registered by adding its name to `art` in `ui/art/pelion/theme.json` and a line to its `notes` saying what was drawn; nothing is pushed.
- The default art is read for sizes and anchors only, never traced or recoloured. Sizes are the default's, exactly. An anchor may be moved (same name) to where the drawn feature is. `meta.tiles` of a room family is copied from the default unless the drawing needs another fill.
- Every sprite is a new drawing; nothing of the 40k art stays in a redrawn family. Level of detail: that of the Arcane Tower and Vault 111 redraws (`ART.themed.tower`, `ART.themed.vault`): shaded pixel art with mid-tones and highlights, one dark outline, readable at 1x.
- Setting rules (spec): not Olympus (no gods, lightning, togas), not ruins (the marble is new and painted: a blue and a red band), no machinery but the mechanism on the back wall. Bronze for every metal.
- Rank is colour only: one student drawing; the himation's border and the wreath sit in rank slots that are gold for `high` and take the cloth's and the hair's colour otherwise. The department colour is slot `y`, the himation's band, readable from the front, the back and the side.
- Fonts: `ui['--display']` is `"'VT323', monospace"`. Words are Latin transliteration. A pack may not set `text.risky`, `text.rejectAll`, `text.toast.failed`, `text.prefs.packs`.
- After each art change, from the ADM root: `node ui/theme.test.mjs && node ui/art.test.mjs && node ui/sprites.test.mjs && node ui/themes.test.mjs`, all pass; before each commit `for t in ui/*.test.mjs; do node "$t" || echo "FAIL $t"; done` prints no `FAIL`; `node tools/sprite_sheet.mjs --theme pelion` regenerates its gallery, committed with the art; after the commit `node tools/art_gate.mjs` passes from a clean tree.
- **Look at what you drew.** After writing a sheet, open the gallery PNGs of that family (`docs/sprites/pelion/`) with the Read tool and judge them against the spec's row: does each frame read at 1x as what it is meant to be, without its name? Redo until it does. Report what each frame shows, and what you are not satisfied with.
- Names (decided by Christian): subtitle `Pelion · School of Chiron`; motto `One creature, moving together`; ranks high `Sophos`, standard `Mathētēs`, novice `Ephēbos`; a petition is an `aporia`, plural `aporiai`; the watchman `Argos`; who sends a subagent, the `Mentor`; break-out room `Palaistra`; departments in no rule `Agora`; the refectory `Symposion`; honours `Laurels of the week`; the day's tokens and time `Obols`; the log stays `Chronicon`; the back-wall machine is `the mechanism`; Settings sections `Stoa`, `Aporiai`, `Students`.

## Review Focus

1. A student's department band (`y`) and rank must both read on the smallest view: at 1x, from the back (`up`) and the side (`right`), in all three ranks. Checked in Task 2.
2. Light marble under the hall's lighting: the night ("candles") mode and the cast lights must not wash the room out or turn it muddy. Checked at the Task 4 checkpoint, both modes.
3. Chrome contrast: every foreground over its fill passes the test Administratum applies (`ui/theme.test.mjs`), with no new entry in its list of known exceptions. Task 1.
4. Macrons: `Mathētēs` and `Ephēbos` must draw in VT323 in the app, not fall back to another font. Checked at the Task 4 checkpoint; if they do not, the macrons are dropped everywhere.
5. The pack check after each delivery: `node tools/theme_pack.mjs check <PACK>` reports `pelion` ok, since the contrast and art tests of ADM do not run on a pack.

---

## Milestone 1: the theme

### Task 1: theme entry, palette, wording, ranks

**Files (ADM):** create `ui/art/pelion/theme.json`; modify `ui/art/themes.json`, `ui/theme.test.mjs` (the shipped ids list, line ~73), `ui/themes.test.mjs` (lines ~12 and ~324), `CLAUDE.md` and `docs/DEVELOPMENT.md` (the viewer's column key gains `O Pelion`).

**Interfaces:** Produces the theme `pelion` with `"art": []`, which later tasks append to; the palette slots later tasks draw in.

- [ ] **Step 1:** update the three test lists (add `pelion` last; sorted where the list is sorted); run the tests: they fail.
- [ ] **Step 2: write `theme.json`.** Read `ui/theme.js` (`BASE`: what each palette slot is; `TEXT`: every wording key; `TIER_II.rank`) and two full worlds as data (`ui/art/tower/theme.json`, `ui/art/vault/theme.json`) first.
  - `px`: the spec's palette. Starting values, to tune: outline `k` `#2a2420`; marble wall plates `#d9d2c0` / `#d2cab6`, seams `#a89f8c`; floor pebbles `#c9b79a`, gaps `#8f7f68`, lit `#e2d6bd`; bronze `g` `#b07a3a`, shadow `G` `#6e4a22`, lit `h` `#e0a85a`, and the iron slots (`m`, `M`, `l`) a darker bronze with a green patina shadow; wood (`w`, `W`, `L`) olive wood `#7a5a38` / `#4e3824` / `#9a7648`; papyrus `p` / `P` `#e6d8b4` / `#b8a67e`; cloth (`r`, `R`, `d`) undyed linen `#d8cdb0` / `#efe6cc` / `#a89c80`; red `x` a brick red `#a8432e`; blue `u` Aegean `#2f6a8f`; green `v` olive `#6f7f3a`; the screen slots amber on dark bronze (`c` `#ffb84a`, `C` `#3a2a14`).
  - `rank`: high — himation deep blue `#2a4a7a` with lit and shadow, border and wreath gold `#d9a84e`; standard — nothing changed; novice — grey cloth `#9a968c` with lit and shadow. The helpers' (`adept`) tunic and satchel by the same rule.
  - `ink`, `light`: lamplight amber for the night, the window slots for sea and sky by day and stars by night; the texture inks (`scratch`, `grime`, `cant`) faint or off on marble.
  - `ui`: a dark chrome in the stone's blue-grey with bronze and Aegean accents; `--display` VT323.
  - `text`: the names of the Global Constraints, and every other key that speaks 40k reworded in the same vocabulary (status lines, the petition lines, the events, the toasts except `toast.failed`, the Settings categories, `watch.button` naming Argos). Keep `{placeholders}` and the `[one, other]` pairs exactly.
  - `notes`: what the world is, one line per part.
- [ ] **Step 3:** tests pass, including the contrast test with no new known exception; the proof `node tools/themes_to_packs.mjs --from 090de41 --check` still ends `13 themes identical`.
- [ ] **Step 4:** `node tools/sprite_sheet.mjs --theme pelion`; look at a dozen gallery sprites: the 40k art in Pelion's colours should already read as marble, bronze and linen. Tune the palette once.
- [ ] **Step 5:** report every `text` key set, as a table (key, 40k, Pelion), for Christian.
- [ ] Commit `Pelion: the theme, its palette and its words`.

## Milestone 2: the look (stop for Christian after Task 4)

Each task: the recipe per family, registered in `art`, tests pass, the gallery looked at, a commit in ADM, and the generator scripts committed in PACK (not pushed).

### Task 2: `scribe`, `adept`
The student: bare-headed with the wreath, short beard or none, chiton to the knee, the himation draped over the left shoulder with its border (rank slot) and its band in `y` across the chest and the back, sandals; `down`, `up`, `right` with their three walk frames; the `arm` frame a bare forearm with a stylus. The helper: smaller, a short tunic, a satchel across the body with the kind glyph front and back, carrying a scroll. Viewer: `SCRIBE.high/standard/novice` show blue-and-gold, linen, grey; the band reads in every direction.
- [ ] Drawn, registered, tests pass, looked at; commit `Pelion: the students and the helpers`.

### Task 3: `room-floor`, `room-walls`, `room-doors`, `room-pipes`
Floor: pebble mosaic, every floor frame (plain, vents, bolts as mosaic motifs, the sills), the channels a meander border, the sanctum's floor a rosette mosaic. Walls: dressed marble courses under a painted frieze (blue triglyphs, a red band), column drums for the pilasters, the wall feet a stone plinth; the beacon a bronze torch (off, on, its cage a bracket). Doors: bronze, studded, the sanctum's a taller pair, closed, half, open. Pipes: an olive garland on bronze hooks.
- [ ] Drawn, registered, tests pass, looked at; commit `Pelion: the stoa, floor, walls, doors and garlands`.

### Task 4: `workstations`, `walls`
`DESK`: a marble table with a wax tablet, a stylus, a pebble abacus and a clay lamp (the lamp and the tablet where the default has its screen and lamp anchors); `LECTERN`: a narrow reading stand with an open scroll; `CONSOLE`: the helper's small table; the sixteen `SHELL_COG` frames: a bronze astrolabe ring turning. `walls`: `WINDOW` and `WINDOW_TALL` the space between two columns with sea and sky (stars in a slot that is sky by day and bright by night, set in `ink.windowDay` / `ink.windowNight`); `SHELF` a rack of scroll pigeonholes; `BANNER`, `HANGING` woven hangings with a meander and a wave band; `GAUGE` a small sundial; `CENSER` a hanging oil lamp.
- [ ] Drawn, registered, tests pass, looked at; commit `Pelion: tables, the turning ring, windows on the sea and the hangings`.
- [ ] **Checkpoint.** Serve ADM and look at `tools/preview.html?theme=pelion&n=12` in Flat, in full light and in candles mode (screenshots), and at the viewer's Pelion column.
- [ ] **First delivery.** Copy `ui/art/pelion/` to `PACK/pelion/`; `node tools/theme_pack.mjs check PACK` says `pelion` ok; commit and push PACK. **Stop: Christian clicks Update in Settings > Hall > Added themes, restarts, picks Pelion, and looks.** Continue only on his go; fold his changes into Tasks 1 to 4 first.

## Milestone 3: Chiron and his place

### Task 5: `magos`, `sanctum`
Drawn together, since the app draws the body over `THRONE`. Chiron: the horse body at rest on folded legs, in three-quarter view, the human torso upright, bearded, wreathed, a bronze pendant where the app pulses the chest light, his eyes where it glints them (anchors moved to fit); `arm` his arm with the staff; `claw` his hand tapping the scroll. `THRONE`: the rock ledge and fleece under him. `LORD_DESK`: a stone table with a lyre, a mortar of herbs and scrolls. `COG_MECH`: a bronze medallion, the centaur in profile. `SEAL`: a clay seal on a cord. If the pose does not read at 1x in 48x48, try the alternatives the spec allows and report them with images before settling.
- [ ] Drawn, registered, tests pass, looked at; commit `Pelion: Chiron at rest, his ledge and his table`.

### Task 6: `cogitator`, `skull`, `gate`, `fire`
The Antikythera mechanism, 164x100: bronze front plate, the gear train through an open side, and three dial faces under the app's animated rectangles (`screen`, `wave`, `bars` anchors: keep them over the great dial, the small dial and the calendar scale; `lamps`, `drums`, `vents` over fitting details). The owl. The propylon: two columns, a pediment, bronze doors (`GATE_L`, `GATE_R`), the mountain path at dusk in `GATE_VOID`. A bronze tripod brazier and a cluster of clay lamps, with their flame frames.
- [ ] Drawn, registered, tests pass, looked at; commit `Pelion: the mechanism, the owl, the propylon and the fires`.

## Milestone 4: the small things

### Task 7: `clutter`, `petitions`, `commits`, `refectorium`
Scroll baskets, stacked tablets, amphorae, a crate of ostraka, loose papyrus. `SCROLL` a potsherd with writing, `QSCROLL` the potsherd with a large question mark, `SCROLL_HELD` a wax tablet held out. A laurel sprig, a clay seal, a bronze stamp. The symposion: `RECAFF` a krater on its stand, `TABLE` a long low table, `BENCH` couches, `DOZE_Z`.
- [ ] Drawn, registered, tests pass, looked at; commit `Pelion: scrolls, potsherds, laurels and the symposion`.

## Milestone 5: the generated families

### Task 8: `breakout`, `enclave`, `honours`, `lift`, `watch`, `suzerain`
These six are drawn by Administratum's generators, one module per world: `tools/breakout_art/pelion.mjs` (the palaistra: sand floor, a low stone kerb, a herm at the gate), `tools/enclave_art/pelion.mjs` (a small walled garden court), `tools/honours_art/pelion.mjs` (a marble stele with laurel wreaths and cut letters; the text anchors of the kit kept), `tools/lift_art/pelion.mjs` (the mēchanē: a timber frame, a rope, a basket car, its lamp a small torch), `tools/watch_art/pelion.mjs` (the hoplite: crested helmet, a round shield on his back, a lantern; the `ring` frame), `tools/suzerain_art/pelion.mjs` (a low stone exedra and a painted cord). Read each generator and one existing world module of each first. The art gate reruns every module: it must pass. The modules are copied to `PACK/generators/pelion/` as well.
- [ ] Drawn, registered, tests pass, art gate passes, looked at; commit `Pelion: the palaistra, the court, the stele, the mechane, Argos and the exedra`.

## Milestone 6: 2.5D

### Task 9: `scribe39`, `adept39`, `magos39`, `skull39`, `watch39`, `faces`
The four directions of the 2.5D characters (`E`, `W`, `S`, `N` with their walk frames; the students' `arm`, `armL` and `scroll`), Chiron and the owl in 2.5D, the hoplite. Then `faces.json` / `faces.png`: the volumes of the furniture drawn in Tasks 4 to 8, edited by hand as the other worlds' are (read `ui/faces.js` head comment and `ui/art/tower/faces.json`); `ui/faces.test.mjs` and `ui/artcheck.test.mjs` pass.
- [ ] Drawn, registered, tests pass; preview `tools/preview.html?theme=pelion&n=12&view=39` looked at; commit `Pelion: the 2.5D characters and volumes`.

## Milestone 7: delivery

### Task 10: the pack
- [ ] The full check in ADM, the contrast test included; the gallery regenerated.
- [ ] Copy `ui/art/pelion/` to `PACK/pelion/`, the generator scripts and modules to `PACK/generators/pelion/`; add a `pelion/` row to PACK's `README.md` and a line to `generators/README.md`; `node tools/theme_pack.mjs check PACK` reports both themes ok.
- [ ] Commit and push PACK. Christian updates the pack in the app and looks, Flat and 2.5D, day and night.
