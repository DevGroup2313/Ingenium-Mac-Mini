# Drawing the instrument

Each instrument is drawn with the method that suits it. All of them stand in layers at their own depths, so they look built, not pasted on. Four methods are used.

## 1. A 3D scene the browser turns (Home)

Home's orbit is a true 3D scene in CSS: a perspective of 2600 pixels, the orbit's plane tilted, the orbit turning once in 105 seconds. CSS animates it, so no script redraws it and Home stays light. Each orb is drawn twice its size in layers at their own depths, the way the seal is: the ball, and the room's mark standing above it with the seal's own shadows, over the seal's soft cast.

Use it when: the object is made of separate keys that must stay real buttons (with their words, sounds and place in the tour).

## 2. Surfaces rendered once, then turned (Blend, Vocatio, Models)

Blend's wheels are computed once from their outlines: an exact distance transform gives every edge its rounding, each wheel's shadow is drawn once, and a light that stays still while the wheel turns is held inside each turning outline. Then CSS and the Web Animations API turn and sway them; nothing is redrawn while Blend is left alone. Vocatio's compass parts (the plate, the bezel, the collar, the medallions) are painted once through the light model and kept as pictures.

Use it when: the object is metal or enamel with a fixed shape that only turns.

## 3. Layered canvases (Lector, Fabrica)

Lector's documents are sheets drawn on canvases under the seal's light, standing at their own depths and swaying as one piece. Their shadows are painted as part of each sheet, with no CSS filter inside the 3D frame: Safari's engine (the Mac's and the iPhone's web view) can draw such a filter in a layer of its own and set it down out of place, which once left a dark patch beside the seal. Fabrica's tree is drawn on a canvas by projecting each part in 3D (the trunk, the beads, the branches, the arches, the collars) as the tree turns; every part is seen from the same place, above, or the branches swing up and down as the tree turns (the glitch fixed in 7.01).

Use it when: the object is made of many small parts that change with the app's own data.

## 4. A shader traced for each pixel (Build, Focus)

Build's diamond is a WebGL shader (WebGL 1, GLSL ES 1.0, so older devices draw it too) that traces a round brilliant for each pixel, with its refraction and fire, over a silver holder whose seat carries Vocatio's Orrery and Ingenium's engine logo. The logo is drawn once as a picture in four layers (face, ring, star, heart), each at its own small height, so they shift against each other as the holder leans. Focus's pool is a shader too: the water and its ripples, the stones, the sky, the stars and the northern lights.

Use it when: the object is glass, water or light, which only a traced picture makes real.

## The sky on its own canvas

Build's sky (the northern lights, the day's glows, the motes) is drawn on a canvas of its own across the whole card, behind the words, at half sharpness and half the frames, so the diamond's own drawing stays light. Focus's pool fills the whole card the same way, within the same budget of pixels.

## Use the app's own pictures

Never redraw the app's own marks by guess. The engine logo comes from the page's own seal (the one on Home's door), each app's seal from IngSeal (modules/r140.js), the Orrery from the compass itself (IngStudios.kit.dial).
