# The diamond's colour families and the northern lights in their colour (for 7.31): drafts, not built yet

Her words (17 November 2026): "I want the light blue pastel shade that I love from Carpe Diem's sticky notes to be among the diamond
colour choices. The current aqua colour loosk still too greenish. I want that other colour added. I like want them to look like true
gemstones and have their light pastel colours, their medium colours and their dark, and night mode dressing that is a variation of the
current dark deep purple colour of that the current crystal has for Night mode. I want for every colour shade to come with their 4
variations so that the diamond has a proper night mode look to match and accompany it if I choose to change the colour from purple to
another colour. I want you to give the diamond, the same treatment as the sticky notes in that regard." And: "I also want the northern
lights to change colours to better complement the new diamond colours when they are selected on the page, instead of only using the
purple hues for every shade."

Carpe Diem's sticky notes (build/apps/builtin/cd.html.gz: STICKY_COLORS and the script cd-sn-night-paper): six papers, each with a day
colour and a night one of its own; the light blue is Inkwell, sky blue by day (#dcefff to #b6e0ff), midnight blue by night.

- patch_r292_fam.py: modules/r292.js gets IngDiamond.family(): the purple stone's four looks (lavender, purple, the night stone by day,
  the night stone of the night theme) dressed in a family's colour after the tone curve (each facet's hue gathered toward the family's,
  its chroma scaled, its brightness curved: one setting per shade); the northern lights (the sky's own canvas, the in-canvas sky, and the
  lights mirrored in the holder's silver by night) gathered toward the family's hue. With no family, nothing runs.
- r314_script.js, r314_tail.js, assemble_r314.py: modules/r314.js with the stone as a family (Ingenium's purple, Sky blue, Sapphire,
  Aqua, Emerald, Citrine, Amber, Rose, Ruby, Clear crystal, Your own colour) and a shade (By the hour, Pastel, Medium, Deep), the night
  shade shown beside them; the panel's stones are the purple stone's frames recoloured by the same sums in the page.
- cap_purple.js: the purple stone's five looks (24 frames each) and the bands, from the patched renderer; cut with
  ../../../previews/diamond_colours_v2/tools/cut.py. famsheet.py: a contact sheet of every family's four shades (palette.json).
  fam_try.js: the head by day and by night with families set.
