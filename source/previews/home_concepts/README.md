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

## Live preview (10 November 2026, second round)

Her choice: the Orrery as first shown inside her real Home (the "this version" picture), with only the orbs taken from the
interactive preview, made rounder and more 3D, and no ring around Fabrica. Her seal key is the engine at the centre, its star
turning counterclockwise without stopping; the circle that hugged the seal is gone and the larger orbit ring stays, in purple.
The next-step card is Home's own card, its keys at their own width with their own lift and press, without "Read the short guide".

- `live_orrery_template.html`: the page, with places for the pictures and parts taken from the app.
- `tools/capture_v2.js <page url> <folder>`: takes the top bar, side list, side buttons, backdrop and the rest of Home as pictures,
  and the seal key, the card, the room keys and their style rules as they are.
- `tools/build_live.py <folder> <template> <out>`: puts them together into one page (the pictures are not kept here).
- `tools/check3.js <page> <out prefix>`: renders it by night and by day and reports any error.
