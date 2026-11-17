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
