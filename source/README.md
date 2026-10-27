# Ingenium 4.0: how the page is made

`ingenium.html` in the four Ingenium repositories is built, not written by hand. These are its sources.

- `build/base312.html.gz`: Ingenium 3.12 as it was released, the base of every 4.0 build.
- `build/build_page.py`: applies the exact-match edits listed in it (each must match the base once) and inserts
  the parts in `build/modules/` (r101 onwards, in name order) before the page's last script.
  `python3 build/build_page.py out.html` writes the page.
- `build/release.py`: `python3 build/release.py page` builds the page, stamps the version from
  `build/version.json`, rebuilds the kit store from the repositories' current commits and writes the same page into
  all four repositories (it expects them side by side under /home/user). `release.py bump <version> <date>` moves
  the build number in every build file.
- `icon/`: the seal's tab icons and the 512-pixel picture the page draws (`icon/new/out/page_icons.json`), and the
  script that made the app icons for every device.
- `rig/`: the tests. `run_app.py` serves the page with the desktop app's own back-end, headless; `up.sh` starts it;
  the `t_*.js` scripts drive the page in Chromium through Playwright (layout checks, chat, cloud connections against
  `mockcloud.py`, seal, Code page, coding models, smoke test of every page).

Changing this folder starts no build. The builds start when `ingenium.html` (or a build file) changes.

Stages 2l to 2n (17 October 2026) added three page tests that run against the built page served by any static
server (`python3 -m http.server 8150` in the folder that holds it), with Playwright's Chromium:

    node rig/t_fabrica.js http://127.0.0.1:8150/ingenium.html <out>           # Fabrica, 34 checks; real git clones its bundle
    python3 rig/ghmock.py 8170 &                                              # a stand-in GitHub API, hashing objects as git does
    node rig/t_fabrica_github.js http://127.0.0.1:8150/ingenium.html <out>    # GitHub inside Fabrica, 20 checks
    node rig/t_lector_doctoral.js http://127.0.0.1:8150/ingenium.html <out>   # Lector's charter, examiner's pass and model guidance, 11 checks
    node rig/t_academic.js http://127.0.0.1:8150/ingenium.html <out>          # every source labelled, Journal articles and scholarly books only, Fontes as a database, Lector citing, 24 checks
    node rig/t_models_care.js http://127.0.0.1:8150/ingenium.html <out>       # quality tiers on the houses, the pace measured, health by model, the catalogue, 24 checks
    node rig/t_studio_care.js http://127.0.0.1:8150/ingenium.html <out>       # Blend's judge and ready-made blends, the tour's chapters, the export, the shelf, 22 checks
    node rig/t_apps_whole.js http://127.0.0.1:8150/ingenium.html <out>        # the whole Tabula and Abacus on the Desk, prepared as Carpe Diem prepares them: handovers, theme, saving, opening one another, 20 checks
    node rig/t_thoughts.js http://127.0.0.1:8150/ingenium.html <out>          # the thought cloud (the shared thoughts/thought_cloud.html): light, dragged and resized like a sticky note, put away with a number, the Inbox, reminders, 48 checks
    node rig/t_builtin.js http://127.0.0.1:8150/ingenium.html <out>           # Carpe Diem, The Forge and Inkwell carried inside: kept on first start, never over a newer copy, Lector reads a newer copy afresh, 26 checks (written for Carpe Diem 1052, The Forge 631 and Inkwell 7.42)
    node rig/t_support.js http://127.0.0.1:8150/ingenium.html <out>           # the shared support module (thoughts/support_core.html) in Focus: routines, Today asks of you, a low-energy day, the Focus room, Just start, the switches; and Ingenium's own copy of itself in the app library, 41 checks
    node rig/t_desk.js http://127.0.0.1:8150/ingenium.html <out>              # the five apps as Carpe Diem opens them: the Desk bar and its tabs, the float key, floating windows, a second document, a window of its own with every side button and the shared desk, the thought panel's day and night, 48 checks
    node rig/t_fabrica_narrow.js http://127.0.0.1:8150/ingenium.html <out>    # on a phone and an upright tablet Fabrica always opens on Your apps, 4 checks
    node rig/t_tour_walk.js http://127.0.0.1:8150/ingenium.html <out>    # every card of the chaptered tour rings a visible element; the door opens it (5.1), 57 checks
    node rig/t_recipe.js http://127.0.0.1:8150/ingenium.html <out>       # Lector's recipe (5.2): the apps measured in a frame that refuses every request to another address, a Word file kept, its stale figures and broken rules found, updated run by run, the version before kept, the rules and measures sent with Lector's sections, 47 checks (run it on a page whose version is stamped, as release.py stamps it)

`build/recipe/recipe.json` is Lector's recipe (5.2): the owner's rules, the 32 verified sources as CSL-JSON with the claim each
supports, the owner's kinds of document with their outlines, and the identity of the builds those documents describe. It is written
by `gen_recipe.py` (kept with the documents' tools, outside the repositories) and carries nothing personal: the owner's documents
stay on the owner's device. `build_page.py` writes it into the page (module r126).

`build/apps/builtin/` holds the copies of The Forge, Inkwell and Carpe Diem that Ingenium carries (each page
compressed, with `builtin.json` naming its version, date, size and SHA-256 fingerprint). To update them, run
`python3 -I build/apps/update_builtin.py path/to/the_forge.html path/to/Inkwell.html [path/to/carpe_diem.html]`; without
the third path the Carpe Diem copy already there stays. The build checks each against its fingerprint before it rides
along. Ingenium does not carry itself (a page cannot hold its own copy): from 4.9 each new version keeps its own page in
the app library on first start, checked against the version it names, so Lector and Fabrica can work on it.

From 5.0, The Forge carries Ingenium in the same way, so the two carry each other. A page cannot hold a full copy of an
app that holds a full copy of it back, so each carries a lean copy of the other (the owner's choice, 18 October 2026):
Ingenium carries the Forge's lean page (the Forge without the apps it carries), and the Forge carries Ingenium's lean
page (Ingenium without the apps it carries). The order of a release that changes both:
1. Build the Forge's lean page: `python3 -I offline_project/forge_632/forge632.py the_forge_631.html OUT_DIR`.
2. Put it into Ingenium: `update_builtin.py OUT_DIR/the_forge_632_lean.html Inkwell.html [carpe_diem.html]`, then
   build and release Ingenium's page.
3. Take Ingenium's lean page from the release page: `python3 -I build/apps/make_lean.py ingenium.html ingenium_lean.html`
   (or build it with `ING_LEAN=1 python3 build_page.py OUT.html`).
4. Build the Forge's full page with the apps it carries: `forge632.py the_forge_631.html OUT_DIR ingenium_lean.html
   carpe_diem.html Inkwell.html`. Its own copy of itself is its lean page, the same bytes Ingenium carries.

`build/thoughts/` holds the two shared sources that Ingenium, Carpe Diem and The Forge each carry whole inside their
own page, so no app depends on another: `thought_cloud.html` (the 💭 thought panel and the Inbox) and
`support_core.html` (the support module: calm, smaller steps, time, low-energy days, routines, the Focus room, Just
start). `build_page.py` writes the first in before `modules/r119.js` and the second before `modules/r121.js`.

`build/apps/` holds Carpe Diem's five apps, whole (her own single-page apps, the files Carpe Diem carries): Tabula,
Abacus, Imago (`slides.html`), Scriba and Fontes. Beside them are `dark.json` (Carpe Diem's night dress for each) and
`cd_prep.js` (Carpe Diem's own preparation of an app before it shows it). All of these come out of carpe_diem.html with
`python3 -I apps/extract_from_carpe_diem.py path/to/carpe_diem.html`. `cd_inject.json` holds what Carpe Diem adds to an
app's frame once it is open (the cut stones on the app keys, its seal, its pen); it is taken from the running page with
`node apps/harvest_cd_dress.js http://127.0.0.1:8150/carpe_diem.html`. `build_page.py` rides all of it into the page.
`modules/r118.js` prepares each app and `modules/r123.js` opens it as Carpe Diem does: full width with the Desk bar at
the top, the float key on the side column, floating windows with a tab each on the Desk bar, and a window of its own.
A window of its own carries every side button. The windows share the notes, the reminders, the thought Inbox, day and
night and the Clepsydra's settings, and only the main window writes the saved desk. In the Mac and Windows apps
`ingenium_app.py` opens that window and holds the shared parts (`open_lite`, `lite_hub_put`, `lite_hub_get`).

6.0 (20 October 2026) adds three modules and the shells Fabrica fills:

- `modules/r136.js`: an APK and an IPA made inside the page, with no connection. The APK is the generic Android shell
  (`shells/out/android-shell.dex`, written into the page by `build_page.py`) with the app's page, its manifest, its icons and
  both v1 and v2 signatures, signed with a key made on the device or brought in from a .p12 or .jks file. The IPA is the
  unsigned iPhone and iPad shell (`shells/out/ios-shell.zip`, built by GitHub's macOS runner) with the app's page and icons;
  Sideloadly or AltStore signs it with an Apple ID as it installs it.
- `modules/r137.js`: every page takes the whole width of a wide window, the Apps group of the rail folds, saves go one at a
  time, Code opens as Chat opens and lets its app be closed or removed, and the dividers show their grips.
- `modules/r138.js`: Build holds a large page part by part (each script, style and block of markup; 6.7: up to 480 MB on a
  computer and 128 MB on a tablet or phone, the editor's limit), with a search across the whole page, and runs and saves the
  whole app.
- `shells/`: the sources of the two shells, their build (`.github/workflows/build-shells.yml` in this repository) and the
  reports of the emulator and simulator checks (`shells/out/checks/`).

    node rig/t_v6.js http://127.0.0.1:8150/ingenium.html <out> <tools>       # 6.0, 28 checks: the folding rail, the wide window, the five ship cards, an APK checked by apksig and androguard, an IPA, Releases, removing an app from Fabrica and Code, Build with a 13 MB page
    node rig/t_67_kits.js <url> <out> [ingenium_app.py]   # 6.7, 166 checks: another app shipped as itself (modules/r178.js): The Forge from the app library by every path (Fabrica's Build kits and cards, Download as an app from Fabrica, Chat and Build, the old Build page's rows) gives the Forge's own packages, entry for entry as its own packager makes them; a plain app's generic kits carry its icon, name and id; the Windows app's own saving writes exactly the bytes made (rig/kit_check.py, rig/t_67_winsave.py)

`offline_project/forge_639/forge_fabrica.py` carries the new Fabrica into the Forge (without the APK and IPA cards, which need
Ingenium's shells), and its saves now go one after another there too: `rig/t_forge_fabrica.js`, 45 checks.

6.1 (21 October 2026) adds:

- `boot/splash.html` (written first into the body by `build_page.py`): the loading page. It is painted before the rest of
  the page is read, says the page is still being painted and how far it has got (from where each script begins, written in
  at build time), lifts once the page is ready, and offers Refresh when a start takes too long or never finishes.
- `modules/r151.js`: Refresh the app, the Display panel's first row and a card at the top of Settings. It saves the desk
  first, asks while a reply, a Lector piece or a package is still being made, and answers F5, Ctrl+R and Command+R too; a
  page opened for the first time shows "Painting …" while it is drawn. On a Mac, `ingenium_app.py` adds Refresh Ingenium
  to the app menu and Command+R, which reload the window even when the page has stopped answering.
- `modules/r141.js`: Fabrica's GitHub views (Code, Issues, Pull requests, Compare, Actions, Projects, Wiki, Insights,
  Settings), in Ingenium and in the Forge (store `forge_hub` there).
- `modules/r147.js`: the new Home. `modules/r148.js`: Lector's writing guard (no loops, the owner's manner).
- `modules/r108.js`: Ask Lector at the foot of the document; documents no longer close with a line naming the model, and
  Word, PDF and web files name no program (no watermarks). `modules/r152.js`: the accessibility audit's fixes.
- `held.json`: modules still being finished or reviewed (storage `r142`, backup `r143`, tour `r144`) stay out of a release
  build (`release.py page` sets ING_RELEASE=1); every other build keeps them in.

    node rig/t_61_refresh.js <url> <out>     # 24 checks: the loading page, Refresh in Display and Settings, F5 and Ctrl+R, the painting note, a page that never finishes starting
    node rig/t_61_ask.js <url> <out>         # 20: Ask Lector, and older documents shown and saved without their closing line
    node rig/t_61_hub.js <url> <out>         # 93: Fabrica's GitHub views, also inside the Forge's Fabrica
    node rig/t_61_home.js <url> <out>        # 61: the new Home
    node rig/t_61_seals.js <url> <out>       # 53: The Offline Project's crests
    node rig/a11y/axe_walk.js <url> <axe.min.js> <out>   # axe-core on every page, day and night, desk and phone; run by hand, not by the GitHub builds; its last full run, on 6.2 (22 October 2026), found 0 rules broken

6.2 (23 October 2026) builds four editions from the same sources. `ING_EDITION` picks one (`build/editions.py`):

    ING_EDITION=master python3 build_page.py OUT.html   # everything (the default)
    ING_EDITION=full   python3 build_page.py OUT.html   # without the owner's apps and the owner's personal information
    ING_EDITION=gift   python3 build_page.py OUT.html   # a blank slate: no other app of the owner's, no Ingenium of its own, no Lector
    ING_EDITION=demo   python3 build_page.py OUT.html   # for the Offline Project's public pages: no Lector, no Ingenium of its own

- **full**: Carpe Diem, The Forge and Inkwell are not carried (its app library starts empty, for the apps the person adds,
  which Lector reads); no Lector recipe (`modules/r126.js`: the
  owner's rules, verified sources and kinds of document); the owner's name is in no commit, signing certificate or app id (the app ids
  begin `app.ingenium.`, a key made on the device names the person's own name); Lector writes for "the author".
- **gift** and **demo**: no Ingenium of its own to open in Code or Build or to package (the owner alone publishes Ingenium; a
  new app of the person's own is still packaged), and no Lector: its key, page, modules (`r107`, `r108`, `r126`, `r148`), its
  base parts (R86 and R99) and every word of it. R86 also holds the chat's document maker (Word, a web page, Markdown,
  Tabula), so that much stays: `build/tools/keep_decls.js` keeps the declarations the rest of the page calls and those they
  need. The code's own comments come out (`build/tools/strip_comments.js`; licence notices and the build's markers are
  kept), and the build stops if the word Lector is still anywhere in the page outside its data. The gift edition also names
  none of the owner's other apps, and Home shows Ingenium's seal rather than the Offline Project's crest.
- Every edition keeps the copyright line and the licence. Each change an edition makes must find its text exactly as many
  times as it says, or the build stops. `build/tools/acorn/` is acorn 8.18.0 and acorn-walk 8.3.5 (MIT, their licences
  beside them), which the two tools read JavaScript with; the editions without Lector need Node.js to build.

    node rig/t_62_editions.js <out> master=<url> full=<url> gift=<url> demo=<url>   # 61 checks: what each edition holds and shows

6.7 (25 October 2026) dresses every drop-down in Ingenium's own colours (`modules/r172.js`). Each select keeps its place in
the page, unseen and laid over its field, and still holds the value; beside it stands a field with the role combobox that
opens Ingenium's own list (the WAI-ARIA select-only combobox: the arrows, Home, End, letters, Enter, Space, Escape and Tab).
By night the list is an opaque plum card; on a phone it rises from the foot of the screen as a sheet, inside the safe areas.
A choice sets the select and sends input and change, so every handler runs as before; a value or options set by code show
at once. A list of several lines is left as the system draws it, with readable colours by day and by night.

    node rig/t_67_select.js <url> <out> [axe.min.js]   # 79 checks: every select dressed, contrast open and closed by day and night, keys, code, phone sheet, axe-core

6.7 adds `modules/r176.js`: the analogue sounds of the owner's other two apps, ported voice for voice from their sound
module (pass 675) and made on the device as they play, placed a little left or right by where they happen and given a small
room, with a Sound section in the Display panel, a Sound card in Settings and a panel of choices (stored as `ing_sound_67`).

    node rig/t_67_sound.js <url> <out> [axe.min.js]   # 92 checks: the thirteen voices rendered (never silent, never clipping, a centred sound in the middle with its room), where they sound and where they never do, the 60 ms rule, the place in stereo, the keys and the choices kept across a reload, axe by day and night on a desk and a phone

6.7 adds `rig/idb/`: the library tests across IndexedDB implementations. One suite (`rig/idb/suite.js`) drives the on-device
library (IngRepo, IngBig, the app library, storage and its errors, backup and restore, the owner key, the imported chats,
Fabrica's packages, two tabs on one set of stores, the quota) on Chromium's own IndexedDB, WebKit's own (WebKitGTK) and the
reference implementation of the standard (fake-indexeddb, bundled under /tmp, never in the repositories). What they found is
fixed in `modules/r181.js` (every store lets another tab in and comes back; a refused request's error is named), two edits in
`build_page.py` (the model store answers an aborted write; Reset everything waits for the delete) and a line each in
`modules/r136.js` and `modules/r142.js`; `rig/idb/README.md` has the details and the table.

    rig/idb/run_all.sh http://127.0.0.1:8150/ingenium.html <out>   # 20 tests on each of the three implementations, and the table

6.7 also adds three tools for checking a whole build. `rig/regress_67.py` serves a built page, makes every fixture and runs
the regression, each test with its own arguments, then writes a table of passed and failed checks. `rig/make_big.js` makes
the pages the capacity test edits (a small working app, its code in parts, and embedded data, 12 MB or more), which it needs
and which were never kept before. `rig/t_67_app_sec.py` checks the computer app's two 6.7 security patches with real
redirects between two local servers.

    EYES_PHOTOS=<folder of image1.jpg and image2.jpg> python3 rig/regress_67.py <folder of ingenium.html> <out> [port] [tests]
    node rig/make_big.js <out.html> <size in MB, 12 or more>
    python3 -I rig/t_67_app_sec.py <repo>/ingenium_app.py   # 11 checks: keys never follow a redirect elsewhere; the frame guard


6.8 (27 October 2026). The owner's words: "I want the old display back but I want it fixed. Making everything bigger is not
fixing it." On a phone and a tablet the keys, fields, lists and the side column keep their 6.6 sizes and places: 6.7's rule
that made everything 44 pixels with a finger (`modules/r174.js` points 1 and 4, and the same rule in `r172.js`, `r173.js` and
`r176.js`) is gone. What stays is what kept things whole: every panel of the top bar and of the side keys opens inside the
window and its safe areas (`r174.js`; a panel held by its top and its foot, such as Help, keeps its height when it is moved,
and scrolls inside itself), and the top bar shows the seal alone when the name would be cut. On a very short screen (a small
phone held sideways) the side keys come just small enough to fit (`r155.js`, never under 26 pixels). Settings, Models and Blend
keep their rooms, as small pills that wrap on a phone. `desktop/app_id_68.py` gives the computer app its own identity on
Windows (AppUserModelID, from app.json), and `installer/Ingenium.iss` gives its shortcuts the same, so its taskbar button and
pins are never shared with the owner's other apps when it runs from the kit's script.

    node rig/t_68_phone.js <url> <out> [phones|panels|side|axe|tablets|all]   # 752 checks (axe with T67_AXE=axe.min.js): no overflow, no box past an edge, every panel whole, the keys in their 6.6 sizes, at the iPhone, iPad and Fire sizes

The scripts name Playwright at /opt/node-tools/node_modules/playwright; change the path to where yours is.

6.8.1 (27 October 2026). The owner's words: "Adjust it so that any document prepared keeps the exact same formatting when it
is downloaded. The formatting shown must always match the document that is downloaded. It also writes out the words "header"
and "footer" in the repective words positions when downloading a PDF, please remove that requirement." A document is drawn
once, by the browser, and its PDF and Word file are read off that drawing (`modules/r183.js`, `IngDoc`):
- `build/docfont/`: the typefaces a document is set in, carried in the page (Gelasio, Georgia's measures; Liberation Serif,
  Sans and Mono, Times New Roman's, Arial's and Courier New's; Doc Symbols, the signs of DejaVu Sans renamed; Cormorant and
  Cinzel for Lector's Inkwell and Offline Project papers, renamed Doc Garamond and Doc Capitals), with their licences.
  `docfont.py` lists them; `build_page.py` writes them where r183 says `/*R183_FONTS*/null`.
- A chat's document is shown as its A4 pages, made smaller whole on a narrow panel. Its PDF writes every word where the
  browser put it, in the face the browser used (the part of each font it needs, embedded), with every fill, rule, picture
  and link, and breaks its pages where the page shows them; a character no font here has is drawn as a picture of the
  browser's own drawing. Its Word file is read off the same drawing: Georgia, Times New Roman, Arial and Courier New (whose
  measures the page's faces share), the page's sizes, colours, spacing, indents, tables at the page's column widths.
- Lector's paper (`modules/r108.js`) keeps its 640-pixel measure on every panel and phone (zoomed whole, never re-set;
  `r107.js` no longer narrows it), is set in the carried faces, unkerned, and shows a dashed mark where each PDF page
  begins. Its PDF and Word file are made from the paper itself (`paperPage`, `paperOpts`), with its seals, crest, frame
  (a page border in Word), Inkwell's laid lines, and its faces embedded in Word where no copy of Word has them.
- `apps/tabula_hf_patch.py`: Tabula's PDF and Word file read the header's and footer's own words, not their labels.
- No file names a program: a PDF's information is its title; a Word file's properties, its title.

    node rig/t_681_docs.js <url> <out> && python3 -I rig/t_681_docs.py <out>   # a long document: the shown pages against the PDF's, pixel by pixel; the PDF and the Word file written
    node rig/t_681_lector.js <url> <out>                                      # Lector's paper in six papers: every word in the same place on the page and in the frame its files are made in

Also in 6.8.1 (her words: "Carpe Diem's seal logo should not be inside of Ingenium's seal section on the apps ribbons ... only
the master (owner's version) has the seal or app logo in the apps ribbons, the demos and gift builds should not have them"):
`apps/house_patch.py` gives Tabula, Abacus and Imago the house they are carried in (`window.__ingHouse`). In the master
edition their Seals & letterheads group, its letterheads, the watermark and a signed page show Ingenium's seal, the name
INGENIUM and Ingenium's purple; in every other edition no seal and no wordmark, and the key beside the group opens Your own
(a seal or logo from a picture on the device). Their Word files no longer name Carpe Diem (a watermark is "Watermark", a
tracked change's author "Author").

    node rig/t_681_house.js <url> <out> [master|other]                        # the three apps' seal studio, letterheads and watermark menu, by edition, 14 checks

The group's panel opens under the group (its caret is hidden on these ribbons, and it used to open at the window's corner).
Her words: "Please make sure that all of my handdrawn signatures samples and personal informations are also removed from the
apps ribbons of Ingenium and the Forge's demos." Nothing of hers is written into those editions; but a browser keeps one store
for every page of one address (every GitHub Pages site of an account shares one), so a demo opened on her device read her
own copy's signatures, marks, letterheads, Tabula documents and state. `storage_shim.py` makes every edition but master keep
its storage under its own name ("ing-demo:", "ing-gift:", "ing-full:"), in localStorage and IndexedDB, in the page and in each
app's frame; the master edition stores as before.

    node rig/t_681_own_store.js <master url> <other edition url> <out>         # the other edition, at the same address, finds nothing of the owner's, 9 checks

The popup cards (her words: "the purple colour is too bight and harsh on both light and dark mode ... the popup cards are too
flat, I want them to gain that weighted animated popped out 3D look"): `modules/r184.js` builds every popup as the thought
card is built (a face lit from above, a darker wall at its right and foot, a fine rim, a falling shadow) and brings it in with
a small spring (still when motion is minimal): the note at the foot, the support notes, the tour card, the status menu,
About and the dialogs, the Help and Display panels, a window's menu, the sound and storage dialogs, Lector's recipe. Their
keys are a quieter amethyst by day, a soft lavender by night; the night faces are a deep, greyed amethyst (the reminder card
too, `r153.js`). Contrast checked with axe on the cards by day and by night: no failures.

Ingenium's own sounds (her words: "I want Ingenium to have its own identity and its own sounds ... light and subtle ... the
mechanical analogue 3D look and feel ... Oxbridge DPhil standards"): `modules/r176.js` keeps its engine and replaces Carpe
Diem's thirteen voices with Ingenium's sixteen, the things of a college study: Tuning fork, Orrery bell, Margin note (notices);
Wax seal, Escapement, Brass stamp (keeping); Library door, Study lamp, Archive key (the welcome door); and for moving between
pages, each room its own (a vellum page, a card drawer, a ledger's tap, a pen, a typebar, a brass gear).

    node rig/t_681_sounds.js <url> <out>                                       # every voice rendered offline: it sounds, it stays quiet, it is over in 1.6 s; Ingenium's defaults, none of the old names, 51 checks

