# adm-themes — for agents

Read [README.md](README.md) first: what the pack is and what each world folder holds. This file says how the worlds
are made. The repo is both the pack people install and the workshop that draws it; the installer keeps only the
theme folders (`pelion/`, `pelion-terra/`, `breakingbad/`), so everything else here never reaches a user.

## What lives where

| Path | What | Shipped |
|---|---|---|
| `pelion/`, `breakingbad/` | the worlds: `theme.json` (colours, wording, the `art` list and its `notes`) and sprite sheets (`<family>.png` + `.json`) | yes |
| `pelion-terra/` | a style of Pelion (`base: "pelion"`): its own `px` for slots 1 2 3 and one sheet, the floor Pelion had before (its generator is `room-floor.mjs` at `00df42a`); nothing to draw, it follows Pelion | yes |
| `pack.json` | the pack's name and format | yes |
| `generators/<world>/` | the scripts that draw each sheet, one per art family (see `generators/README.md`) | no |
| `docs/` | each world's design and plan (Pelion: `2026-11-17-pelion-world-design.md`, `2026-11-17-pelion-world-plan.md`) | no |
| `meta` | the owner's private notes (a link, absent from a clone) | no |

## Drawing: the workshop is an Administratum checkout

A generator does not run here. It needs Administratum's tools (`tools/sheet_writer.mjs`, the sprite viewer, the
tests), so it runs **from the root of an Administratum checkout where the world is registered** (its art under
`ui/art/<world>/`). For Pelion that is the owner's private `pelion` branch; `meta/README.md` says where it is checked
out. That branch is never pushed to Administratum upstream.

The loop, for one family:

1. Edit `generators/<world>/<family>.mjs` here. Keep its header comment true: what is drawn, the key slots used.
2. From the Administratum root: `node <this repo>/generators/<world>/<family>.mjs` (writes `ui/art/<world>/<family>.png` + `.json`; `--print` shows the frames as text).
3. Look before deciding: the sprite viewer (`tools/sprites.html`, see Administratum's `CLAUDE.md`) or the gallery
   `docs/sprites/<world>/`. A raw sheet is drawn in the **key** palette (green is the key's `c` slot, not a colour of
   the world); judge the gallery, which is in the world's colours.
4. If what is drawn changed, update the family's line in `theme.json` `notes`, in both copies.
5. Checks, from the Administratum root: `for t in ui/*.test.mjs; do node "$t" || echo "FAIL $t"; done` prints no
   `FAIL`; `node tools/sprite_sheet.mjs --theme <world>` regenerates the gallery.
6. Copy `ui/art/<world>/<family>.*` (and `theme.json` if changed) into `<world>/` here; then
   `node tools/theme_pack.mjs check <this repo>` reports every theme ok (a warning about `meta` is expected).

A pack changes drawings and colours only, never positions: where a sprite sits is the app's.

## Delivering

- Commit in the Administratum checkout (art and gallery, on the world's branch) and here (generator, sheets,
  `theme.json`). Here, end the message with `Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>`.
- Pushing here **is** the delivery: installed apps see the change at their next start (a toast offers *Update*), or
  through Settings > Hall > Added themes > *Update* / *Update all*. Push only when the owner has seen the drawing.

## In progress

Pelion: the plan's task list in `docs/2026-11-17-pelion-world-plan.md`; the step-by-step ledger lives with the
workshop branch (see `meta/README.md`).
