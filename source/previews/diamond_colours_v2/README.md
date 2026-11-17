# The diamond's colours, refined (17 November 2026): a live preview, waiting for her word

Her words on the 7.29 preview (source/previews/diamond_colours): "I want the panel to open beside the diamond and for the controls button
to be a little button on the top right side of the 3D header of the Adamas page in the same format as Ingenium's introduction door ... I
also want the diamonds emojis to actually look like real diamond emojis and look more refined and actually match the 3D diamond from the
Adamas page ... I want the graphics and 3D design of the panel to be refined and elevated." Then, on this preview: "I want the diamond
button to match the sign-in button from the introduction door and be in the same sleek and understated design and implementation. I
don't want it to be sticking out"; "I want the crystals diamonds to be animated and be 3D alone without the acrylic button and the names
written together on the same button. I also want the check mark to be Ingenium's colour instead of blue and I really hate seeing scroll
bars in view ... no scroll bar should ever be in view unless stated otherwise. Also, I hate long wide buttons, please fix the 'The
Holder's Band' buttons"; "I don't want any purple shading over the button when I hover over it".

Published (private): https://claude.ai/artifact/55kQPJwfrgahiHc6GkrbJG (version 3). Not built into Ingenium yet.

- r314v2.js: the refined build/modules/r314.js (same API and settings; the key in the head's corner as the door's sign-in key, value
  for value, read from the 7.29 page; the panel beside the diamond; cut-diamond stones that turn, their names beneath; Ingenium's
  switch; no scroll bar). IngDiamondColours.layout({key:"corner"|"row", place:"beside"|"over"}) switches the layouts for the preview.
- frame.html: the preview's own page around a real Adamas head; extract.py takes r290, r292 and r314 out of a built page (r310 from
  its source); the page is frame.html with the tokens of the built page (its :root and body blocks), the modules and two pictures.
- adamas_diamond_colours.html: the preview as published.
When approved: r314v2.js becomes build/modules/r314.js (rig/t_729_diamond_colours.js then follows the corner key, the stones without
keys, and the switch .dmc-sw in place of .eswitch).

Version 4 (her words: "The diamonds and everything inside of the panel still look very flat and 2D and not very animated and popped
out 3D like the main diamond for Adamas"): r314v3.js. Each stone is Adamas's diamond itself: tools/cap_all.js draws it with r292 on a
transparent ground (a copy of r292 with a hook, W.__yawFix, to hold its turn; Minimal motion, __tFix) in each look and each jewel,
24 frames through 45 degrees (the cut's symmetry, so the turn loops), and the holder with each band; tools/cut.py cuts them into
stones.json (640 KB). r314v3.js holds __SPRITES__, filled from stones.json; a colour of her own outside the eight is the clear stone
tinted on a canvas; By the hour and Any colour change stone at the end of each turn; the stones stand on a glass shelf with their
reflection; the panel leans toward the pointer.
