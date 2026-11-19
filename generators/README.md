# Generators

The scripts that drew some of the Breaking Bad sheets (the break-out room, the custom room, the Hall of Honours
plaque, the lift, the Suzerain's dais, the Watchman), kept here as the source of that art. They are not part of the
pack: the installer keeps only the theme folders.

They do not run on their own. Each was a module of an Administratum generator (`tools/<name>_art.mjs`, with the
shared `kit.mjs` of its folder and `tools/flat_kit.mjs`): to regenerate a sheet, put the module back as
`tools/<name>_art/breakingbad.mjs` in a checkout of Administratum from before the world moved here, and run that
generator.

`pelion/` draws Pelion, one script per art family (`<family>.mjs`; `faces.mjs` the 2.5D volumes, the `*39.mjs` the
2.5D figures, which borrow the flat ones' frames), plus the modules of Administratum's shared generators
(`*_art.mjs`, run as `tools/<name>_art/pelion.mjs`). How to run them, and the checks: [AGENTS.md](../AGENTS.md).
