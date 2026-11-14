# Blend, the movement

Module: modules/r262.js (Ingenium 6.70, 10 November 2026; first made in 6.68).

## My words that shaped it

"I don't want the Blend page to just be a repeat of the Home page and its designs and animations. I want that page to have its own look and identity and its own animation"; "I want it to look 3D and refined like the other pages inside of Ingenium ... The engine logo looks bad inside of the design, it does not look built in, it looks placed on top badly"; "I want the 3D look kept and preserved and deepened. It is starting to look fake and cartoonish." A version leaning away from me was refused: "it is not even facing me". On the preview: "I approve of this design, please push it everywhere".

## What it is

A quiet desk (no sky, no stars, no gold) with Blend's words, and on the right a movement built in layers: a frosted plate with a polished edge; on it Ingenium's wheel holding the seal key in a polished collar over an enamel dial; and a wheel for each chosen model, in its own violet with pale teeth and its own mark (Velox a swift arrow, Magister the scales, Scriba a quill, Faber a hammer, a connected model a cloud), meshing with Ingenium's wheel.

## How it is made

- The wheels are rendered, not drawn: each surface is computed once from its outline (rounded, polished edges, holes you can see through to the plate, a turned face), with a light from the top left that stays still while the wheels turn. Each wheel has its thickness and a soft shadow on the plate.
- The wheels turn by CSS animations, and the whole movement sways a little by the Web Animations API (11 seconds), so nothing is redrawn while Blend is left alone. Out of sight the sway is cancelled, not paused.
- The movement always faces me.

## How it answers

Pointing at a wheel brings the movement to rest facing me, slows the wheels to a stop, lifts that wheel and names it; pressing it opens step I at its row. A press on the seal plays Home's flourish and winds the movement.

## Waiting

I disliked every example of a new Blend engine shown on 13 November 2026; Blend stays as it is until I describe or show what I want.
