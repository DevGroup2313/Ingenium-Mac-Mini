# Metal, light and colour

## The light model

Vocatio's compass set the standard for metal in Ingenium, and its light model is shared (modules/r290.js; Fabrica's tree uses it too, modules/r294.js):

- `vcEnv(x, y, z, night)`: the room the metal reflects, as silver is photographed: a soft sky above, the floor below, a large window above on the left and a slim light on the right.
- `vcSilver(nx, ny, nz, night)`: polished silver, the room reflected about the surface's normal.
- `vcEnamel(nx, ny, nz, base, night)`: enamel of a given colour over metal.
- Parts drawn once through this light are kept as pictures. For example `vcMedalUrl` paints each of Vocatio's medallions pixel by pixel through the case's light: a milled edge, a polished bevel, a sunken groove and a domed enamel face.

Build's diamond and holder are lit in a WebGL shader with the same idea: a room to reflect, a window light, silver that reads as polished metal by day, and Vocatio's own Orrery set into the seat (IngStudios.kit.dial hands it over).

## Colours

- Ingenium's violets by day: #c9b6ee, #9068d6, #6a3fb5, #55309a, #3d2275 (Home's orbs and the keys use them).
- By night the accent is lighter (#c9b2f2), and each of Home's rooms has its own purple.
- Metal, enamel and glass come in silver, pearl and violet.
- Never gold anywhere in Ingenium. Never blue on Ingenium's own documents. Never one app's colours on another app's things.
- Skies: by day soft and colourful (Build's: rose up to the right, periwinkle low in the middle, lilac on the left); by night a violet room. Build's northern lights are violet and purple (by day pastel orchid, lilac and periwinkle). Focus's run through the full spectrum since 7.01: a rose fringe at the foot of each curtain, then green, teal and blue, and violet at its top, the colour drifting along the horizon. Since 7.05 Build's night sky is full of soft stars, a star falling now and then, and a few sparkles in the air ("light and enchanting", "natural and fairytale-like"). I tried the full spectrum on Build too and kept violet there: "I think the violet hues look better on the Build page without the full spectrum" (14 November 2026).

## Day and night

Every header has two looks, and the night look is never the day look darkened. Metal, glass, enamel and sky each take their own night colours. Examples:

- Build's diamond changes through the day: clear crystal from 5:00, lavender from 11:00, purple from 14:00, the night stone from 18:00.
- The engine logo at the heart of Build's holder has a white face by day and, since 7.04, a deep indigo face by night (#3e2f86 to #17113a), chosen to sit with the Orrery's indigo enamel; it replaced a charcoal face I did not like.
- Each app's seal changes with the Display, by day or by night (IngSeal, modules/r140.js).

A header repaints when the Display changes, with no reload.

## How to choose a colour

Render the candidates on the real header, by day and by night, side by side, and look at them in place. When a mark sits on a face, keep it as clear as before (for the engine logo, the contrast between the star's lit side and the face stays at about 5 to 1, measured as screen contrast is usually measured). Then show me the choices on the preview.
