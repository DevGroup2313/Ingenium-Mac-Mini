# Motion, presses and sound

## At rest

- Each instrument sways a little on a long, slow clock: Home's seal and orbs on 7 seconds; Blend's movement a few degrees on 11 seconds; Vocatio's compass on 10 seconds.
- The engine logo moves the same way everywhere it appears: its star turns in four quarter turns over 9 seconds (13 in Calm), its ring turns the other way, its heart beats twice, its face breathes.
- Lights travel slowly round rims and bands, rising and fading. Nothing flashes.

## Under the pointer

- The instrument leans toward the pointer on a spring, so its layers shift against one another.
- The part under the pointer lifts a little and takes a soft sheen or glow, and the cursor becomes a hand.
- Pointing at a moving instrument stills it, or brings it to rest facing me (Home's orbit, Blend's wheels, Fabrica's tree).

## A press

- Every key and every pressable part sinks when pressed and comes back when let go, and it sounds (modules/r176.js).
- The sound is Ingenium's own: Home's click (`IngSound.play("paper")`). No other sound, unless I ask for one.
- A pressed button sinks to 90 per cent in 80 milliseconds and, let go, springs back through 1.10, 0.96 and 1.03 to 1.00 in 0.6 seconds (Build's diamond and Fabrica's balls, as Home's engine button knocks back).
- An engine button plays one of Home's flourishes, a different one each time, and every seventh press the grand one (modules/r175.js; the shared definitions are SFL in modules/r290.js):
  - spin: the star turns once in 1.15 seconds (easing cubic-bezier(.25,.9,.3,1)) while the ring turns the other way in 1.3 seconds and the heart swells;
  - pulse: the ring swells and settles in 0.95 seconds, with two ripples;
  - hop: the seal hops and squashes in 0.9 seconds;
  - wobble and twirl: a turn about its own axis;
  - beat: the heart beats twice with a warm glow.
- A press on the diamond also sends the light through it and a burst of sparkles (7.03).

## Gentle, always

My words (14 November 2026): "please refine the light animations and the other animations of the page, they are too brusque and intense, they are fast and curt and detract from the smooth visuals of the page." So lights cross slowly, presses settle over two or three seconds, springs are soft, and nothing flashes.

What I asked to remove (14 November 2026): the circle that spread round the diamond when pressed, and the ripple "like I am touching glass or liquid" across the holder's Orrery. The press itself stays. Vocatio's compass keeps its own ripple: I asked for it to be left alone.

## Still when asked

Motion set to Minimal, or a system that asks for reduced motion, holds every header still; a press on the engine button then only glows.
