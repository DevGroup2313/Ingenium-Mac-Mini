# How I build a 3D header

This is the recipe for the headers that open Ingenium's pages: a card with the page's words on the left and an object of its own on the right, drawn in depth, alive, and answering the pointer. It was worked out page by page between 10 and 14 November 2026, on Home, Blend, Folders, Models, Vocatio, Lector, Fabrica, Focus and Build. The other notes in this folder give each part in detail, and one note for each page says how its header was made.

## What a header is

- A card at the top of the page, on a quiet desk.
- On the left, the words: an eyebrow (INGENIUM and the page's own line), the title in Ingenium's Cormorant, a short line of what the page does, two raised keys, a line of help and an italic hint at the foot.
- On the right, the page's instrument: one object that belongs to the page's theme without being on the nose, drawn in layers at their own depths and lit as real metal, glass, enamel, stone or paper.
- Below the card, the page's own panels, kept as they were.

My words that set the standard (12 November 2026): "I want regal and elevated to match these pages ... refined, elevated and elegant while being 3D ... theme related without being on the nose ... like they are built-in".

## The recipe, step by step

1. **Start from my words and my pictures.** Keep my words, quoted exactly, at the top of the module's own note, so the reason for every choice stays with the code.
2. **Measure the app first.** Take sizes, colours, type and shadows from the app's own surfaces (the shared kit's tokens). Never invent a new look beside the app's own.
3. **Choose the instrument.** One object, theme related, regal and refined, never cartoonish, never pasted on. It must look built in.
4. **Build the card with the shared kit** (IngStudios.kit in modules/r290.js): the same desk, slab, words, keys, line and hint as every other header. See "The card and its words".
5. **Draw the instrument in layers at their own depths**, with the method that suits it: a 3D scene the browser turns, surfaces rendered once, layered canvases, or a shader traced for each pixel. See "Drawing the instrument".
6. **Light it with the compass's light model**: silver, pearl and violet; a day look and a night look; never gold. See "Metal, light and colour".
7. **Give it life**: a slow sway, a lean toward the pointer on a spring, a lift under the pointer, a sink when pressed and a spring back, Home's click, and Home's flourishes for an engine button. Gentle, never brusque. See "Motion, presses and sound".
8. **Keep it light to run**: draw only while it is seen, thirty frames a second at rest, still under Minimal motion and the system's reduced motion, nothing rewritten while the page is left alone. See "Speed: keeping it light to run".
9. **Fit it to a phone**: below 760 pixels the instrument stands under the words, scaled whole. See "Phones and tablets".
10. **Show me a live interactive preview first.** Ship only what I approve, as a module of its own, with a test, in a release. See "From preview to release".

## Where each header lives

| Page | Module | Instrument |
|---|---|---|
| Home | modules/r261.js | the orrery: the engine seal at the centre, the six rooms as orbs on one orbit |
| Blend | modules/r262.js | the movement: Ingenium's wheel and a wheel for each model, on a frosted plate |
| Folders | modules/r263.js | a drawer of my apps' folders, each with its app's seal |
| Models | modules/r269.js | the turret of lenses, one lens for each model |
| Vocatio | modules/r290.js and r293.js | the silver pocket compass with Home's engine button at its heart |
| Lector | modules/r290.js | the fan of documents with the wax seal |
| Focus | modules/r291.js | stepping stones across still water |
| Build | modules/r292.js | the diamond over its silver holder, with Vocatio's Orrery and the engine logo |
| Fabrica | modules/r294.js | the tree of the open app's versions |
| A phone | modules/r296.js | each studio's instrument under its words |

The shared parts: modules/r290.js (IngStudios.kit and the light model), modules/r175.js (the seal key and its flourishes), modules/r176.js (every key's sound), modules/r140.js (IngSeal, each app's own seal).
