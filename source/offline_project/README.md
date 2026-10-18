# The Offline Project: how Carpe Diem 1052 and The Forge 631 were made

This folder keeps the build scripts behind Carpe Diem 1052 (both demo editions) and The Forge 631, written on
17 and 18 October 2026. It is a record and a handoff note for whoever works on the owner's master copy of Carpe Diem
next. No app loads anything from here. Each app carries everything it needs inside its own page.

The scripts were run inside a temporary workspace. They still name its paths (a folder under `/tmp/claude-0/`).
Change those paths before running them again.

## Where the finished apps are

* Carpe Diem 1052, committee demo: `DevGroup2313/carpe-diem-offline`, commit 8044869 (`index.html`).
* Carpe Diem 1052, public sample: `DevGroup2313/carpe-diem-demo`, commit bc09712 (`index.html`).
* The Forge 631 (stamp 9s63): `DevGroup2313/forge-windows`, commit c09e34c, and `DevGroup2313/the-forge-ios`,
  commit 61b5b37.
* Ingenium 4.9 carries Carpe Diem 1052 (the committee demo's standalone page), The Forge 631 and Inkwell 7.42 in its
  app library (`source/build/apps/builtin/`).

The surest record of every change is a diff of each `index.html` against the commit before it.

## What changed in Carpe Diem 1052

1. **The Focus page.** A new page in the side navigation ("Focus", in French "Concentration"), drawn by the shared
   support module (`../build/thoughts/support_core.html`) with Carpe Diem's own adapter (`carpe_diem_1052/cd_support.html`).
   It has Now, Steps, Time, the Inbox, Calm, Routines, Today asks of you and Your supports.
2. **The thoughts panel.** The shared thought cloud (`../build/thoughts/thought_cloud.html`, version 2, in English and
   French) takes the place of the old quill line. The 💭 side button shows a count in Carpe Diem's colour.
3. **The older support module** (script `cd-audhd-1047`) now hands its work to the new panel and module, so the two
   never disagree.
4. **The tour.** The chapter "Focus" (in French "Concentration") has ten cards (`carpe_diem_1052/cd_tour_1052.js`).
5. **The mini Forge preview no longer shakes.** The cause: `measure()` read the main element's top relative to the
   scroll position, so each scroll moved the preview, which moved the page again. It now measures in page
   coordinates and writes a new value only when it changes by more than one pixel. A second fix stops the lock
   script writing the same label back (the flicker on "Apply to this app").
6. **French in the Author Studio and the mini Forge.** A French layer (`french/fr_engine.js`) puts each drawn English
   line into French while the app is in French, and puts it back when the app returns to English. It never touches
   what a person types. The Studio dictionary has 1,123 entries; the mini Forge has 1,043. The mini Forge is a
   sandboxed frame, so it is told the language by message. Still in English: names, book titles, and the mini
   Forge's Magister code lessons and assessment items.
7. **The tab icon by night, in Safari too.** Safari ignores icons written into the page as data. The website
   editions now carry real files (`favicon-dark.ico`, `icons/icon-dark-32.png`, `-180`, `-192`, `-512`), chosen by an
   early script before any icon is read (`carpe_diem_1052/cd_icon_1052.js`). The service worker caches them. This was
   tested in Chromium only; Safari itself could not be tested here.
8. **The build stamp:** 2026-10-18, pass 1052, stamp 528171052. The page's own embedded copy of itself was taken
   again (`carpe_diem_1052/selfsrc.py`), so "a copy of this app" gives back 1052.

`carpe_diem_1052/cd1052.py` applies all of this to a 1051 page; `cd_repo_1052.py` writes a website edition.

## What changed in The Forge 631

The 💭 side button and its panel, a Focus page as its own room in the side navigation, the support module with the Forge's own data, a
theme guard (the moon by day, the sun by night) and the same preview fix. `forge_631/forge631.py` applies it to a 630
page; `forge_631/forge_support.html` is the Forge's adapter. The Forge stays in English, as the owner asked.

## Three things to know

1. **The uploaded 1051 files held a script that did not belong.** Each began its `<head>` with
   `<script type='text/javascript' src='https://claude.ai/...'>`. It was left out of every build. The master copy
   should be checked for the same line.
2. **The gift edition repository (`carpe-diem-gift`) is empty.** Its fixes need the master copy.
3. **The shared support module moved to version 2 after Carpe Diem 1052 and The Forge 631 were made.** Version 2 adds
   a way to draw single cards into an app's own page (Ingenium uses it), puts the keyboard on a sheet's main key, and
   colours a routine's step dots in the app's own accent (version 1 asked for a colour name the panel does not define,
   so the dots fell back to Carpe Diem's blue in every app).
   Carpe Diem 1052 and The Forge 631 carry version 1, which works as it is. Their next passes can take version 2
   whole.
