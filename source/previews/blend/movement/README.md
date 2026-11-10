# Blend as a movement in 3D (10 November 2026), a preview only

Her words, in order: "I don't want the Blend page to just be a repeat of the Home page and its designs and animations. I want that
page to have its own look and identity and its own animation, please redesign the spinning logo and orbs for a different design."
Of the quiet Movement: "I like this design the best and I want it pushed everywhere. I just want the logo icon to be more animated
inside of the little engine wheel. I want it to still have the animation that it has on the Home page." Then: "I want it to look 3D
and refined like the other pages inside of Ingenium ... The engine logo looks bad inside of the design, it does not look built in,
it looks placed on top badly", and "I want the 3D look kept and preserved and deepened. It is starting to look fake and cartoonish."
A version that leaned away from her was refused, so the movement always faces her. On this preview: "I approve of this design,
please push it everywhere and continue working on my requests." It ships in Ingenium 6.70 as modules/r262.js, built on Blend's own
elements (rig/t_670_blend.js).

What the preview shows:
- The movement, one object built in layers at their own depths: a frosted plate with a polished chamfer; Ingenium's wheel holding
  Ingenium's seal key in a polished collar over an enamel dial, its star turning counterclockwise as on Home; each chosen model a
  wheel in its own violet, with its own mark, meshing with Ingenium's wheel.
- The wheels are rendered, not drawn. Each surface is computed once from the wheel's outline: an exact distance transform gives
  every edge its rounding, the rounded edges catch the light as fine bright lines, the holes are cut through, the face is turned.
  A light from the top left stays still while the wheels turn: it lives in a layer that turns backwards inside the turning outline,
  which masks it. Each wheel has three side layers for its thickness and a soft shadow drawn once.
- The whole movement sways a little (the Web Animations API) and settles to face her when she points at a wheel or at the seal;
  the wheels slow to a stop and gather speed again; pressing the seal winds them.

Build: `python3 -I make_movement.py <folder with ingenium.png and ingeniumN.png> <template.html>`, then
`python3 -I ../tools/build_blend.py <scratch folder> <template.html> <page.html>` (the frame pictures and the seal key, as for the
6.68 preview). Checks: `node tools/check_movement.js <abs page> <abs prefix> [scale]` (day and night, a wheel pointed at, four models,
the rows and the answers), `node tools/zoom_movement.js <abs page> <abs prefix>` (the centre wheel at 2x, facing and at either end of
the sway), `node tools/perf_movement.js <abs page> <abs prefix>` (time to render, frame pacing, the still light's net turn, the sway
at rest while pointing). The answers in the preview are made up; the top bar, the side list and the side buttons are pictures.
