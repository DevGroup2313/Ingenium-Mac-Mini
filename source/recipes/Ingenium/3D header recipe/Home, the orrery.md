# Home, the orrery

Module: modules/r261.js (Ingenium 6.67, 10 November 2026; refined in 6.71, 6.92 and 6.93).

## My words that shaped it

"I want Ingenium's engine to continuously be spinning and have it counterclockwise animation"; "I don't want the circle around the logo seal. The big one can stay ... I also don't want it to be gold"; "I want the orbs to actually feel like 3D buttons like Ingenium's logo instead of their current weird animations. I want full parity with the rest of the app. I also don't want Ingenium's Engine to look flat either"; "The orbs have a weird glow and a weird animation ... I want the orbs to have that same effect and look and lose that weird flashing effect."

## What it is

The greeting on the left; on the right the engine (Ingenium's seal key, from modules/r175.js, drawn in the seal's own layers) at the centre, with the six rooms as orbs riding one orbit round it.

## How it is made

- Home's own parts are moved in whole, so each keeps what it does (its handler, its sound, its words, its place in the tour).
- The seal key stands larger at the centre, its layers further apart and its rim given a little thickness; its star turns counterclockwise without stopping (9 seconds; 13 in Calm; still in Minimal motion).
- The orbit is a true 3D scene that the browser turns by itself with CSS (perspective 2600 pixels, one turn in 105 seconds), so nearer rooms are larger by perspective and nothing is rewritten while Home is left alone.
- Each orb is made as the seal is: drawn twice its size, the ball and the room's mark standing at their own depths with the seal's shadows, over the seal's soft cast. No glare, no glowing edge.
- By day the orbs wear Ingenium's day violets; by night each room its own purple.

## How it answers

At rest each orb sways as the seal does; under a mouse it tilts to follow it and lifts; pressed, it sinks and sounds. Pointing at a room, or reaching it with the Tab key, stops the orbit and brings that room near. The seal plays Home's flourishes on every press.

## On a phone

From 6.71 the same orrery stacks under the greeting: the orbit tilts 44 degrees and the seal is 58 to 72 pixels, measured so that no room's name passes under the seal.
