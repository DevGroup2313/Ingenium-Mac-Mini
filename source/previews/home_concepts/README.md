# Home concepts (10 November 2026), previews only

Three new looks for Home, made after her words: "I don't like any of them, they all look basic and variations of the same design ...
Please do it again and go deeper." Each is a script that rebuilds Home inside the built page, moving the real keys and the seal key in
whole (so each still does what it did). They are not part of any build; she chooses one, and it is then built properly as a module,
with Blend and Folders in the same direction.

- `orrery.js`: the seal key as the sun; the six rooms revolve as medallions on a gold orbit, nearer ones larger; pointing at one slows
  the orbit to a stop and brings it forward with what it holds.
- `codex.js`: an open illuminated book: a gilded initial opens the greeting, the next step is a note in the margin, the rooms are
  chapters with Roman numerals that lift off the page, and a ribbon carries the seal key.
- `gallery.js`: a salon wall: the Offline Project's crest centred in a gilded frame, the rooms as lit frames that swing toward the
  pointer, the greeting on a brass plaque, the seal key on a gold medallion.

To see them: `node rig/preview_concepts.js <page url> previews/home_concepts <out folder> orrery,codex,gallery '<keys selector>'`
(pictures by day and night, and a video of each).

## Live preview of 6.67 (10 November 2026)

What shipped in Ingenium 6.67 (modules/r261.js), shown live: the page runs the app's own Home styles (modules/r147.js), its seal
key's rules (R104, R175) and the orrery module itself, on Home's real markup; the top bar, side list, side buttons and the rest of
Home are pictures of the app. Her seal is the engine at the centre, its star turning counterclockwise without stopping; the rooms
are orbs made as the seal is made (layers at their own depths, its sway, tilt, lift and press), riding an orbit the browser turns
by itself (CSS 3D, no script redrawing it); by day the orbs wear Ingenium's day violets, by night each room its own purple.

- `live_orrery_template.html`: the page, with places for the pictures and the parts taken from the app.
- `tools/capture_v2.js <page url> <folder>`: takes the top bar, side list, side buttons, backdrop and the rest of Home as pictures,
  and the seal key, the card, the room keys and their style rules as they are.
- `tools/build_live4.py <folder> <template> <out> <modules folder>`: puts them together with modules/r147.js and r261.js into one
  page (the pictures are not kept here).
- `tools/check4.js <page> <out prefix>`: renders it by night and by day and reports any error.
