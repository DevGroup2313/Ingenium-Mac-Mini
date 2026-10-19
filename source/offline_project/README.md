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

## What changed in Carpe Diem 1053 (18 October 2026)

Tabula keeps every part of a document when it saves itself or moves between windows. Measured: its autosave, and its
hand-over to a floating window or a window of its own, carried only the main text, so the footnotes, endnotes,
bibliography, header, footer and contents were lost after a crash or a move. The fix is one patch
(`../build/apps/tabula_patch.py`) shared by Carpe Diem 1053, Ingenium 5.0 and The Forge 632. When autosave cannot keep a
document, Tabula now says so on the page and offers a copy. A header or footer now comes back shown when it was shown, and a page restored early keeps
its header and footer. The thoughts panel follows day and night while it is open, the
Focus page takes version 2 of the support module, and the mini Forge in the Author Studio holds only the Editor, Files
and Settings (its Tabula placeholder and hidden Tabula key are gone). `carpe_diem_1053/cd1053.py` applies all of this to a
1052 page; `carpe_diem_1053/cd_repo_1053.py` writes it into a website repository.

## What changed in Carpe Diem 1057 (19 October 2026)

The mini Forge in the Author Studio is The Forge 639. Every edition of 1056 still carried the one made from The Forge 629
(12 October), and in the full edition's device pages it had lost pass 1055's rule, so it offered Inkwell and Ingenium
again; it also opened on whichever Carpe Diem had last been chosen in it (on the owner's Mac, a 1051), not on the app
around it. `carpe_diem_1057/cd1057.py` makes the mini Forge again from The Forge 639 (lean), as the 629 one was made,
with the French layer (1052), no Tabula (1053) and Carpe Diem alone (1055, given more weight, because The Forge 639's
own rule for its app keys outranked it); hands it this very build each time it has loaded; stops the false "no room
left" notice when Carpe Diem is shown in its sealed preview; and asks for the demonstration editions' offline keeper
only on a website. `cd_repo_1057.py` writes the website repository and `cd_gift_1057.py` the owner's private one.

## What changed in Carpe Diem 1058, The Forge 641 and Ingenium 5.9 (19 October 2026)

The owner's words: "The Forge 641 needs to contain Ingenium 5.9 and Ingenium 5.9 should contain the Forge 641. And both
The Forge 641 and Ingenium 5.9 should have Carpe Diem 1058 which has the mini Forge 641", with Inkwell 7.49. There is no
circle, because each app carries the other's lean page, which carries no apps. The order:

1. The Forge 641's lean page (`forge_641/forge641.py`, from the 640 lean page: only the build stamp changes, 9s73).
2. Carpe Diem 1058 in every edition (`carpe_diem_1058/cd1058.py`): its mini Forge is made from that lean page by pass
   1057's recipe, and checked to differ from the 1057 one only in its stamp.
3. Ingenium 5.9 carries The Forge 641 (lean), Carpe Diem 1058 and Inkwell 7.49; then its own lean page is made.
4. The Forge 641's full page carries Ingenium 5.9 (lean), Carpe Diem 1058, Inkwell 7.49 and its own lean page; its
   demonstration (`forge_demo/forge_demo_641.py`) carries Carpe Diem 1058's Public sample, with Inkwell 7.49 or without.

`cd_repo_1058.py`, `cd_gift_1058.py` and `forge_641/forge_repo_641.py` write the repositories; the Forge's README names
the versions it carries from the page itself.

The apps show their build number, not a date (the owner's words: "remove the dates from the apps, keep only the build
number"). `no_build_dates.py` makes the change in each page as it is built: Carpe Diem's opening line and About read
"Build 1058 · 528171058" with the edition, The Forge's About and footer read "Build 641 · 9s73", and the Forge's
"This build was finished on" sentence is gone. Ingenium reads "Version 5.9" (`build_page.py`, edit R134), and the
lines of its app library name each app and its version only (`modules/r120.js`). Each page still records its date
in its build record (`CD_BUILD`, and Ingenium's page date), where the tests and the documents' measurements read it;
the site keeps its Latin dates, and Inkwell its own. The same module corrects the texts that read the build by its date
or by an old number: the Guide's "Which build am I running" (every edition of a build shares its stamp; a demonstration
adds its edition's name) and its tip on the build line, in English and French; a Magister lesson that quoted
"Build 2026-10-17 · 630 · 9s62"; the glossary's "this Forge is build 630"; and the build line written into the
Forge's page before its script runs, which now carries its own build.

`forge_fit.py`: Fabrica's frame in the Forge (and in Carpe Diem's mini Forge) follows the room's head at every frame
while the room opens and just after a press. It was fitted at 120 and 500 milliseconds and then every 700, so while
the help card above it unfolded it could stand about 45 pixels below the window's edge (the Forge's Fabrica test
caught it on the full page).

Lector's recipe (`build/recipe/recipe.json`, written by the documents' `gen_recipe.py`) now names the builds the
documents describe (Carpe Diem 1058, The Forge 641, Ingenium 5.9, Inkwell 7.49) and Inkwell's figures from its
development notes up to 7.49. The full edition's figures are measured from its file at 1058, not copied. The recipe
test sets its own older scenario (a document written when the full edition was last measured at 1051) before it checks.

## What changed in The Forge 640 and Ingenium 5.8 (19 October 2026)

The Forge 640 (stamp 9s72) carries Carpe Diem 1057, whose mini Forge is The Forge 639, with Ingenium 5.7 (lean),
Inkwell 7.48 and its own lean page; nothing else in the Forge changes but its build stamp (`forge_640/forge640.py`;
`forge_repo_640.py` writes the Windows, Mac and iPhone/iPad repositories; `forge_demo/forge_demo_640.py` makes its
demonstration, with Carpe Diem's Public sample and Inkwell, or Carpe Diem alone). Ingenium 5.8 carries The Forge 640
(lean), Carpe Diem 1057 and Inkwell 7.48.

## The Offline Project's site, as a web app and as one file (19 October 2026)

`master_demo/build_master_demo.py` writes the site in three ways from one page (`master_demo/site.html`):

* `--mode site`: a folder for a web host such as GitHub Pages. With its `manifest.webmanifest` and its own keeper
  (`sw.js`), a phone, a tablet or a computer can install it from the browser, and once each app has been opened it
  opens again with no connection. In `DevGroup2313/carpe-diem-offline`: `offline-project/` (four apps) and
  `offline-project-without-inkwell/` (three).
* `--mode app`: one file, `The_Offline_Project.html` (about 60 MB; without Inkwell about 51 MB), that holds every
  app compressed inside it, with Inkwell's word lists, citation styles and PDF reader. It opens from a computer's
  disk with nothing beside it and no connection. It needs a browser that can unpack gzip by itself
  (DecompressionStream).
* `--mode preview`: the private review page on claude.ai, whose host adds the document skeleton. Each app travels as
  script parts (`apps/<slug>.partN.js`), so it loads even where the host refuses to let a page read its own files.

The page has a mini top bar, as the apps' own pages have: the crest's mark on the left, and two small keys on the right
for French and for night. The Preview tag and the pause key are gone. Each room opens with "← The crest" and the apps by
name, the one you are in marked. Each seal on the page is a push-button ported from the apps' own: it sways, turns toward
the pointer, lifts, sinks when pressed and rises again, and it keeps still when the device asks for reduced motion. In the
site without Inkwell the crest has three fields, Carpe Diem and The Forge above and Ingenium alone across the foot, with
no fourth quarter (the owner's words: "entirely remove the fourth quadrant and only have it turn into one in the bottom
and two at the top"); its icons are drawn from that crest (`master_demo/shield_shot.js`, then `--shield`).

## What changed in Carpe Diem 1054 (18 October 2026)

The tour says what Tabula's autosave keeps since 1053: one card, in English and French, follows "Real files, saved to
your device", added as the page opens (carpe_diem_1054/cd1054.py; cd_repo_1054.py writes the website repositories).
The tour has 201 cards. Nothing else changes but the build stamp and the page's photograph of itself.

## What changed in The Forge 634 (18 October 2026)

It carries Ingenium 5.2 (lean), whose Lector now keeps the owner's documents true to each new build: it measures the apps on
the owner's device, finds every figure an update changed in the owner's own words, and updates the Word files in place, keeping each
version (forge_634/forge634.py; forge_repo_634.py writes the Windows and iPhone/iPad repositories). It also carries
Carpe Diem 1054 and Inkwell 7.43, and a copy of itself. Nothing else in the Forge changes but its build stamp (9s66).

## What changed in The Forge 633 (18 October 2026)

The tour and the Guidebook describe the workshop as it stands (forge_633/forge633.py): nine rooms on the rail in four
groups; the Editor's five steps; new cards for Files, Focus, the Inbox, the Agenda and Projects (English and French);
the Editing switch card rings the key at the head of the room, where the switch now is (it rang a hidden element on
632 too). Magister's tip and the Guidebook say four questions for each module, and year 1, term 1 eight lessons, as the
rooms have them. The lesson after the carried apps are kept names the fingerprints written beside them. The tour has 31
cards. It carries Ingenium 5.1 (lean), Carpe Diem 1054 and Inkwell 7.43. Its look is unchanged.

## What changed in The Forge 632 (18 October 2026)

The Forge carries her apps inside its own page, as Ingenium does, so no app library file (the old zip) is needed: Ingenium
5.0, Carpe Diem 1052 and Inkwell 7.43, each compressed with its size and SHA-256 fingerprint, and its own lean page as its
copy of itself. On the first start of each new Forge, a few seconds in, they are kept in its store (IndexedDB
'forge-applib'), checked as the zip's apps were, and never over a newer copy she keeps. The copies are lean (her choice):
Ingenium comes without the apps Ingenium carries, and the Forge's copy of itself without the apps it carries. The page
also takes the shared thoughts panel that follows day and night while open, and version 2 of the support module.
`forge_632/forge632.py` applies all of this to a 631 page; `forge_632/forge_repo_632.py` writes it into the Windows and
iPhone and iPad repositories. The page is about 48 MB. It needs a browser that can unpack gzip by itself
(DecompressionStream); on one that cannot (an iPhone or iPad older than iOS 16.4, for example), the Forge says so and
each app's own file can still be chosen.

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
