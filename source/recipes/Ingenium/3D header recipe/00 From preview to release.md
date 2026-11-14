# From preview to release

How a new header goes from my words to the app, step by step.

1. **My words and pictures first.** If something is unclear, ask me before building. Quote my words exactly in the notes.
2. **A live interactive preview.** A page of its own with the header working: by day and by night, with the pointer, presses and sounds, and with notes in plain words saying what changed and why. When I must choose (a colour, a version), the preview gives me a switch to compare them in place.
3. **My verdict.** Change only what I ask, publish the preview again at the same link, and wait for my approval ("I approve ... please push it everywhere").
4. **A module of its own.** The header lives in its own module file (modules/rNNN.js), with my words at the top of its note. Module numbers are taken by whoever ships first, so look at the folder before taking one. A header not yet approved is held in build/held.json and left out of the release.
5. **A test.** A test in rig/ that checks what I asked for, run on the release page itself (for the headers: rig/t_700_heads.js and rig/t_696_fabrica_head.js).
6. **The release, in stages.** The version numbers and the sources first, then the page for all four apps (Mac mini, Mac Intel, Windows, Fire with iPhone and iPad), tested; then the other editions (full, gift, demo), tested. Each stage is committed and pushed before the next. Before taking a version number, check that no other branch has used it.
7. **The editions.** The master edition carries everything. A news line names only what an edition has.
8. **The handoff.** After every release, a private handoff saying what shipped, where, and what waits. It is never committed.

## The preview's own tools

The heads preview is built from the app's own modules, so what I approve is what ships. A preview can never carry my private things: no profile, no documents, no plans.
