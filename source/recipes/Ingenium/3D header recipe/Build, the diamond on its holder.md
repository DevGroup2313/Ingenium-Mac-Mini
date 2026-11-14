# Build, the diamond on its holder

Module: modules/r292.js (Ingenium 7.00 to 7.05, 13 and 14 November 2026; its sparkles as in 7.03; its starry night in 7.05), from my own design file, Builds_Diamond.html.

## My words that shaped it

"This is the design that I want for the Build page, this is the one, but the day mode diamonds look too dark next to the light silver holder so please deepen the silver colour and definition of the holder"; "I want every surface of the holder to have the animated popped out 3D layered depth look and effect and I want every surface to be animated and clickable"; "Remove the glass, I want the orrery design to not be hindered by it"; "I specifically said that I want the ingenium orrery design from the compass"; "the engine logo needs to be drawn to fit the middle of the holder not this randomised symbol"; "I want the same sound and effect of the balls from Fabrica's tree to be applied to the diamond button"; "I need you to add the sparkles back to the diamond"; "I approve of the deep indigo face".

## What it is

A round brilliant diamond floating and turning over a round silver holder. The holder's open seat carries Vocatio's own Orrery (handed over by IngStudios.kit.dial) with Ingenium's engine logo at its heart; round it a bezel, a band of brilliants and a rim. Behind it, a sky across the whole card with violet northern lights; by night a starry sky (7.05).

## How it is made

- A WebGL shader (WebGL 1, GLSL ES 1.0) traces the stone for each pixel, with its refraction and fire, and the holder beneath it. The stone changes through the day: clear crystal from 5:00, lavender from 11:00, purple from 14:00, the night stone from 18:00.
- A shooting light crosses the stone every 16 to 28 seconds, slowly, and fans out in colour.
- The engine logo is drawn once as a picture in four layers (face, ring, star, heart) at their own small heights; it moves as the logo moves everywhere. By night its face is deep indigo (7.04).
- The sky is drawn on its own canvas across the card, at half sharpness and half the frames.
- Thirty frames a second at rest, sixty while it answers the pointer on a fast machine; the drawing grows coarser only while frames fall behind.

## The sparkles (as restored in 7.03)

Specks twinkle on the facets, each for a fifth to half a second (8 a second at rest, more while the light crosses, under the pointer and after a press); glints flash where a facet catches the light; the light's own stars mark where it enters and leaves. By day each sparkle has a small violet glow under its white star, so it shows against the light sky.

More was tried on 14 November 2026 (twice as many sparkles, glittering points, starburst rays, a shimmer on the facets, then a starry sky) and refused: "The sparkles and shimmers on the diamond is too much, I already told you to reduce and remove them"; "The whole thing looks horrible, revert it back". The diamond keeps the 7.03 sparkles.

## The starry night (7.05)

My words (14 November 2026): "I want it to be a starry night in the landscape with the northern lights"; "I want sparkles and shimmering lights throughout the landscape not just concentrated on the diamond. Use the fictional city of Velaris from the Court of Thorns and Roses as inspiration"; "I want the sparkles added to the atmosphere in a light and enchanting manner and I want a beautiful starry night"; and on the first version: "The sparkles and stars look a bit too much here, please reduce it a little to give it a more natural and fairytale-like vibe instead."

On the sky's own canvas: by night a sky of stars, mostly faint, each twinkling slowly on its own clock, the very brightest with a small four-pointed glint, fainter behind the words and toward the horizon; now and then (on average about every twelve seconds, on two paths) a star falls slowly with a soft tail; a few fine sparkles drift through the air and twinkle briefly. By day a few fine sparkles drift across the light sky, white over a soft violet glow. Velaris lent the mood only (a city of starlight, stars falling slowly); the colours stay Ingenium's, and the diamond is untouched.

## How it answers

The diamond turns toward the pointer. Pressed, it gives Home's click, sinks while held, springs back when let go, and plays one of Home's engine button's flourishes, with a burst of sparkles and the light; no circle spreads round it. Each part of the holder glows softly under the pointer and answers a press: the Orrery spins on and the holder lifts its face (no ripple across it), the bezel turns, the band of brilliants turns with a light running through it, the rim knocks; the engine logo plays Home's flourishes.
