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
a small spring (still when motion is minimal): the support notes, the tour card, the status menu, About and the dialogs,
the Help and Display panels, a window's menu, the sound and storage dialogs, Lector's recipe. Their keys are a quieter
amethyst by day, a soft lavender by night; the night faces are a deep, greyed amethyst (the reminder card too, `r153.js`).
Contrast checked with axe on the cards by day and by night: no failures. The note at the foot of the page ("Saved", and the
other short notes) stays flat, as it was (her words: "The "Saved. Your documents is kept on this device." cards can be
exempted from the 3D look and remain flat").

    node rig/t_681_cards.js <url> <out>                                         # the foot note flat by day and by night, a dialog raised

Ingenium's own sounds (her words: "I want Ingenium to have its own identity and its own sounds ... light and subtle ... the
mechanical analogue 3D look and feel ... Oxbridge DPhil standards"): `modules/r176.js` keeps its engine and replaces Carpe
Diem's thirteen voices with Ingenium's sixteen, the things of a college study: Tuning fork, Orrery bell, Margin note (notices);
Wax seal, Escapement, Brass stamp (keeping); Library door, Study lamp, Archive key (the welcome door); and for moving between
pages, each room its own (a vellum page, a card drawer, a ledger's tap, a pen, a typebar, a brass gear).

    node rig/t_681_sounds.js <url> <out>                                       # every voice rendered offline: it sounds, it never reaches the speakers' limit, it is over in 2.4 s (6.8.4); Ingenium's defaults, none of the old names, 54 checks

One type scale (her words: "I want the text fonts and sizes to be consitent and not be random ... particularly on the
Settings page with the different size and font of the Ownership texts"): `modules/r185.js`. The original cards set their own
sizes (a card's title 16.5 in the serif, its words 13 on 1.55, its notes and labels 12); text added since that set none fell
to the page's 16. Now a card gives its size to anything that names none, a heading inside a card is 13 and bold in the sans,
the licence's title is a card's title, and a model's name is 14.5.

    node rig/t_681_type.js <url> <out>                                          # every page and room: no text in a card at the page's 16px; Settings pictured

Tabula's ribbon, at the first press (her words: "The text colours and other functions on Tabula's ribbons do not work well. I
have to keep trying multiple times for it to stick and work"): `apps/tabula_ribbon_patch.py`. Pressed as a person presses it,
with real presses of the pointer and keys, in Safari's engine (WebKitGTK, driven by `rig/wk.py`) and in Chromium's, the
ribbon failed in four ways, in both: a colour or a highlight from its palette, chosen with nothing selected, never reached the
words typed next (the palette put the selection back as it closed, and that forgets a waiting colour); Automatic and No colour
left the next words in the colour around the caret; a size made words 48 pixels high (in Safari's engine always, in
Chromium's when nothing was selected: Tabula turned the browser's largest size into the size chosen only in one spelling and
only at the moment of choosing); and Grow Font and Shrink Font worked once, then let the words go. Each now lands at the
first press, on selected words and on the words typed next, keeps the words' other formatting, leaves Undo as it was, and is
still there seconds later.

    xvfb-run -a python3 rig/t_681_ribbon_wk.py <Ingenium or Tabula url> [--trace]   # Safari's engine: 42 checks (the old Tabula failed 22)
    node rig/t_681_ribbon.js <Ingenium or Tabula url>                              # Chromium's engine: the same 42 (the old Tabula failed 22)

`rig/wk.py` needs WebKitGTK's driver and browser and a display: `apt-get install webkit2gtk-driver libwebkit2gtk-4.1-0`, run
under `xvfb-run`.

Abacus's ribbon, audited the same way (her words: "I want Tabula, Abacus, and Imago to have a full audit for bugs and
functionality and then I want them all fixed"): `apps/abacus_ribbon_patch.py`. With a range selected, Wrap, the number
format list, the Borders and the Cell styles (and their previews) reached the active cell only; the borders now follow
Excel (All on every cell; Top, Bottom, Left and Right on the selection's own edge; Thick round its outline; None from every
cell). "Add a decimal place" always gave two places and "Remove" none, dropping a currency or a percentage; each now adds
or takes one place and keeps what the number is. The workbook was written every four seconds and is what Abacus opens
with, so a change made in the last four seconds before it was closed came back undone; it is now written with every
change and when the page is put away. And a second drag across cells that the first had left selected as text was taken
by the browser as moving the text, so the range came out as one cell; a drag across cells now always selects them.

    node rig/t_681_abacus.js <Ingenium url>                         # Chromium: 36 checks (the old Abacus failed 10)
    xvfb-run -a python3 rig/t_681_abacus_wk.py <Ingenium url>        # Safari's engine: 15 checks (the old Abacus failed 8)

Imago's ribbon, the same way: `apps/imago_ribbon_patch.py`. Everything on its Home ribbon landed and stayed (across slides,
and when Imago is opened again) but the size list, which made words 48 pixels high whatever was chosen, on selected words
and on the words typed after it: the same cause as Tabula's (the browser's largest size written as a style, which Imago did
not look for), mended the same way.

    node rig/t_681_imago.js <Ingenium url>                          # Chromium: 37 checks (the old Imago failed 6)
    xvfb-run -a python3 rig/t_681_imago_wk.py <Ingenium url>         # Safari's engine: 20 checks (the old Imago failed 6)

Imago's Change case worked once: the words were no longer selected after it, so a second press did nothing. They stay
selected now, and each press goes on to the next case, as in Word (both tests press it three times on one word).

Then every key on every tab of the three ribbons, pressed once with something selected (`rig/t_681_sweep.js`). A key that
throws an error fails; a key that cannot be pressed (something covers it, or it is gone) fails; a key after which nothing
changes at all is listed as silent, to be looked at by hand. What it found, and what was mended:
  - Tabula's Styles pane and Comments pane ran the whole height of the window, over the right end of the ribbon and over
    Tabula's own Guide and Close. Each now sits below the ribbon and the row of Write, Documents and the rest (following
    them as the page scrolls) and above the status bar, so its Hide bar key stays in reach; the page makes room for the
    Styles pane as it did for the comments; and inside Ingenium each pane keeps its rows clear of the side keys along the
    window's right edge (`apps/tabula_ribbon_patch.py`).
  - Tabula's Read mode had one way out, its own Exit reading key; Escape now leaves it too, as in Word.
  - Imago's theme and layout galleries (Design) closed only with a press outside them, and an open one covered the keys
    beside it; Escape now closes them too, as PowerPoint's (`apps/imago_ribbon_patch.py`).
  - The letterhead builder, opened from the ribbon in any of the three, could only be closed with its own key; it now
    closes with Escape (`apps/house_patch.py`).
  - Abacus's dialogs (conditional formatting, a rule for what may be typed, a PivotTable and the rest) closed only with
    their own keys; Escape now closes the top one and Enter presses its Apply, OK or Create, as in Excel
    (`apps/abacus_ribbon_patch.py`).

    node rig/t_681_sweep.js <Ingenium url> [tabula|abacus|slides ...]   # TABS='^(Home|View)$' to sweep some tabs only

Abacus's grid, against Excel's keys (`apps/abacus_ribbon_patch.py`). What was typed in a cell chosen was added to what it
held ("Item" and 1 made "Item1"); the arrows moved the caret, never from cell to cell; Ctrl+X, Ctrl+C and Ctrl+V were kept
from the browser, so nothing went to the clipboard or came from it, and Cut, Copy and Paste took one cell only. Now what is
typed takes the cell's place; a double press or F2 edits it in place, and Escape gives back what was there; the arrows go
from cell to cell and, with Shift, widen the selection; Shift+Enter goes up; Cut, Copy and Paste take every cell selected,
with its look, its number format and its formulas (their references following them, as in Excel), and pass columns to and
from other programs.

    node rig/t_681_abacus_keys.js <Ingenium url>                      # Chromium: 28 checks (the old Abacus failed 23)
    xvfb-run -a python3 rig/t_681_abacus_keys_wk.py <Ingenium url>     # Safari's engine: 11 checks

The support notes, the time guard and the timed reminders, quieter (6.8.2; her words: "The continue where you left off popup
card when I first opened the app after install is still that bright ugly purple colour that I requested changed"). "Where
you were", the break offered, Custodia's card and the two-minute word kept the bright amethyst face they were given in 6.1:
the raised cards of r184 never named them. They take its faces now (`modules/r153.js`): the paper by day, the deep greyed
amethyst by night, the quiet amethyst key; the loading screen's Refresh key too (`boot/splash.html`). And by night the
thought card's plain keys (Later, Done) are soft lavender: their words read at 2.6 to 1 on the night card.

    node rig/t_reminder_cards.js <Ingenium url> <out> ingenium        # 79 checks: each card in the quieter faces, words at 4.5 to 1

Comparing two versions of an app in the library (6.8.2; from her list of next steps: "Implement a version comparison tool
to help users understand changes between app versions"). Fabrica compares the versions of a project; the library, which keeps
several versions of each app, now does too (`modules/r187.js`, Settings, Your data, Storage, Compare versions): a plain
summary (places changed, lines added and taken away, how the size moved), then each changed place by its name, its lines
shown when opened; a block of megabytes on one line (an app carried in another) compared by its fingerprint.

    node rig/t_682_compare.js <Ingenium url>                           # 11 checks

Models on an external drive (6.8.2; her words: "models should be allowed to use storage from external hard drives as well as
the machine they are working on"). A model file chosen with the computer's dialog was already linked where it lay, on any
drive, but what Ingenium wrote itself (a lineup model, a copy kept from the page) always went to the computer's own folder,
nothing could be moved, and a model whose drive was not connected when the app started was dropped from the list kept on disk.
Now, in the Mac and Windows apps (`desktop/app_drives_682.py`, the card in `modules/r186.js`, in Models, Your models): a
folder on a drive can be chosen for what Ingenium writes (it makes an "Ingenium models" folder there after checking it can
write to it), each model it wrote can be moved either way with its progress shown, a linked file is never moved or deleted,
and a model on a drive that is not connected (at start, or unplugged while the app is open) stays listed as not connected
and comes back with the drive. The list itself stays on the computer. The phone and tablet apps keep models in their own
storage and do not show the card.

    python3 rig/t_682_drives.py <ingenium_app.py, patched>            # the app's own functions: 19 checks
    node rig/t_682_drives_page.js <run_app.py api port> <drive folder> # the card, bridged to the app: 16 checks

Ingenium 6.9.3 (1 November 2026; her words: "I have two 16 GB RAM HP laptops, I want to be able to use it as a server of sorts for my
macbook pro and run its stronger models on the macbook pro or my fire tablet. The graphics of one of the HP laptop is not the
greatest so I would really love to be able to still use its stronger RAM and storage but on my macbook pro instead.").
`build/modules/r205.js`, models lent between her devices, with the R205 edits in `build_page.py` and the computer apps' side in
`build/desktop/app_lend_693.py` (releases A and B of the lending plan). Lending already worked: the HP thinks in its own memory from
its own disk, and the MacBook and the Fire only send words and show the reply. What spoiled it was that nobody was told the truth.
- The memory a lent model really has. The HP starts a lent model with the largest of 32,768, 16,384 or 8,192 tokens that the page's
  own sum keeps within 70% of its memory (on 16 GB: 32,768 up to the 8B-A1B, 16,384 for the 9B, 8,192 for the 12B); it was always
  8,192 while the MacBook and the Fire believed 32,768, so a long chat ended in an error the Fire could not even read. The HP now
  tells each device the window and the longest reply of every model, the page keeps them (`info.ctx`, `info.out`), the chat's window
  never goes above them, the list is read again when a chat starts and after a refusal, and a conversation that is too long is
  said in plain words ("This conversation is longer than HP-Name's memory for this model (16,384 tokens). Start a new conversation,
  or raise Memory for lent models on HP-Name."). The lender may choose the memory by hand (Settings, Memory for lent models).
- It never goes silent. The HP serves one device at a time, first come first served (four may wait): a second device no longer
  ends the first one's reply by asking for another model, and a device that goes away is dropped before it reaches the engine. A
  reply starts at once, a quiet stream gets a ": waiting" line, and the chat shows "Waiting: HP-Name is answering another device
  first", "HP-Name is loading Qwen3.5 4B (12 seconds so far)…" and "HP-Name is reading your message: 37%…" until the first word; the
  page waits ten minutes for a lender's first word, not two (the call-in route's 45 seconds are only the time to pick a request
  up, and its 504 says so). A reply that stopped because the connection ended says so, one that reached its limit says so, an
  error inside the stream reads like every other ("HTTP 400 …"), the Fire and iPhone now show a refusal's reason (it was
  "HTTP 400 ."), and a failure no longer ends in a doubled full stop. A browser opened at the HP's address no longer locks the
  devices out.
- A weak graphics chip is left alone. Settings, Graphics: Automatic (a real graphics card is used; the small chips that share the
  computer's memory, such as Intel UHD, Iris and Xe, AMD Radeon Graphics, Vega and GeForce MX, are not), Processor only, or
  Graphics chip. The processor is started with `--device none -ngl 0 -b 512`; "Right now: the processor only. …" says what is used
  and why. An engine that stops after it was ready is started again, on the processor if the chip was the reason, the chip is left
  alone for the rest of the run, and the device that is waiting is told. The default pick on a connected computer is now the
  strongest model that is quick there (on a 16 GB laptop's processor: the 8B-A1B or the 4B, not the 9B); each lent model carries
  a word in the model menu (quick, a little slower, slow, too big), "Which models suit this computer" lists the lineup by speed,
  and the speed of every whole reply is kept and shown instead of the guess.
- The sharing card says how to lend from a laptop (plug it in, the lid, the Wi-Fi's Private setting, the firewall for private
  networks only, leave Ingenium open, one model on every device, a fixed address from the router) and shows the number address for
  the Fire and iPhone; nothing is added to the top bar.
- Tests: `rig/t_705_lend_gateway.py` (the patched lender with a stand-in engine, `rig/lend705_stub_llama.py`: 110 checks),
  `rig/t_705_lend_page.js` (the page through the browser's fetch, the computer back-end's relay and an emulation of the Fire app's
  net call, against a stand-in lender, and the lender's card on the real back-end: 122 checks); `t_695_memory.js` (30), `t_698_lineup.js`
  (42) and `t_cloud.js` (12 connections) run as before.
- Not yet seen on her devices: Windows' own firewall question, the Wi-Fi's Private/Public setting, the lid and sleep settings (the app
  does not change them yet), the real graphics chips, the real speeds, the Fire's behaviour with its screen off. The words in the
  card are the steps to take by hand until then.

The plain steps, also written into the documents each download carries (WINDOWS_README.txt, the Macs' START_HERE.txt,
INSTALL_MOBILE.md):

On the computer that lends (a Windows laptop): plug it in; in Settings, System, Power set sleep when plugged in to Never, and in
Control Panel, Power Options, Choose what closing the lid does, pick Do nothing when plugged in. Use the home Wi-Fi, not a guest one, and
set its Network profile type to Private network. When Windows asks whether Ingenium may accept connections, tick Private networks only
and press Allow access (if the question went away: Windows Security, Firewall and network protection, Allow an app through firewall,
Change settings, tick Private for Ingenium). Switch sharing on in Settings, Your models on every device, leave Ingenium open (minimised
is fine), and ask the router for a fixed address for the laptop. Use the same model on every device: a different one makes the first
one wait.

On the MacBook: Settings, Your models on every device, Use another computer's models, Find my other computers (or type the address and the
code), Connect. If macOS asks to find devices on the local network, say Allow (System Settings, Privacy and Security, Local Network, switch
Ingenium on, then quit and open Ingenium). Choose the model in the model menu beside the send arrow; the words beside each model say how
quick it is on the lender.

On the Fire tablet or an iPhone: the same screen, but there is no Find button. Type the lender's number address (for example
192.168.1.23; the lender's card shows it, with a Copy button) and the code, then Connect. Use the number, not the computer's name. Keep the
tablet's screen on while a long answer is on its way.

Ingenium 6.9.3 (31 October 2026; her words: "I want to expand on the parameters of what Ingenium can do as a serious coding and
creating workbench with and without AI. I want to be able to create and train all kinds of AI models, even Frontier level AI
models inside of the app"). The Studio of the Models page (the room of `build/modules/r173.js` that held Your own AIs, Train a
small model and Convert a model in one column) becomes a calm workbench of five rooms, shown one at a time as the page's
rooms are, and it says plainly what can be trained and what cannot. Training at frontier scale cannot happen in Ingenium, on
any device at home, or on a rented machine at a price a person could reasonably pay, and the Studio now says so with the
arithmetic and its sources instead of leaving it unsaid. There is no "frontier" key anywhere. What is new is real:
- The Studio's rooms and its truth card (`build/modules/r199.js`, `window.IngStudio`). Make (Your own AIs, Convert a model),
  Data, Train, Measure and Elsewhere, each existing card filed by its id (a card that arrives later is filed by its id, then by
  the words of its heading) and moved, never copied, so every key, id and handler stays. Whatever scrolls to, focuses, rings
  or shows a card in a closed room opens that room first: the guided tour, Help's Show me, `IngRooms.reveal`. The arrow keys,
  Home and End move between the rooms and the focus with them; the room chosen last is kept across a reload. "What can be
  trained here" reads this device's memory and cores (the computer app's own facts through its bridge, a browser's or a
  phone's hint otherwise) and says, band by band, with the arithmetic and where each figure comes from: Here (small models
  from zero, as lessons: the tiny model, eight passes over 150,000 characters, 140 seconds, its held-back loss 5.85 against
  7.62 for guessing at random); On this computer (training further a model she has, up to what the trainer's own memory rule
  allows, parameters x 16 bytes + 0.6 GB within 70% of the memory: about 660 million numbers at 16 GB, "not measured above
  135 million", llama.cpp's own note that a 1B model needs about 24 GB); Not yet (LoRA on models of 1 to 8 billion needs a
  graphics chip or a rented machine, and nothing in Ingenium trains, applies or merges a LoRA yet; no date is promised); Not at
  home (Meta reports 3.8 x 10^25 operations on 15.6 trillion tokens and up to 16,384 graphics chips for Llama 3.1 405B, which
  is some 26 million years at this trainer's measured pace and about 6.5 TB of training state; DeepSeek reports about US$5.6
  million for the final run of V3 alone; Hoffmann et al.'s twenty pieces of text a number make even a well-proportioned
  135-million model from zero a year and a half here). The words stay kind: it is not a shortcoming of her computer, and what
  home training teaches is manner and form; what a model should know of her sources is better given to it as sources.
  Measure says what the figures say and what they do not (a lower loss is not quality); Elsewhere says what needs another
  machine. Help lists the new cards (Show me opens their room and rings them).
- Datasets from her own work (`build/modules/r200.js`, `window.IngData`, IndexedDB "ingenium_datasets"). A dataset is the text a
  model learns from. The Data room makes one in three steps: a name and the sources (her chats, the conversations carried over
  from other assistants, the conversations brought in from Claude, the reading page's documents, the notes she keeps on her
  sources in Fontes, the Tabula page, her sticky notes and her project files, each counted); a review of every piece with where
  it came from, to keep, edit or drop (exact duplicates are removed; emails and phone numbers are counted before she decides and
  hidden in what goes out when she asks; a tenth or a fifth is held back by the hash of its text, the same pieces every time, so
  a model can be measured on text it never learns from; the size is said in characters and in pieces of text, an estimate of
  four characters a piece); and the dataset kept on the device. It goes out as plain text (the training part, the held-back
  part), as chat lines (JSON Lines, a conversation a line, the shape the Claude panel writes) and as question-and-answer lines
  that a model drafts from the kept pieces (through the page's own ask path: the connection in use, or the model loaded here)
  and that she reads, changes or drops one by one before any is kept; the passages sent to the model have the emails and phone
  numbers hidden first. Train on it hands the training part to Train a small model as its text, or, on a device with no trainer,
  to the learning workbench. Her chats, notes and documents are never changed or removed by it.
- The learning workbench (`build/modules/r201.js`, `window.IngLab`): training in the page, on any device, on the TensorFlow.js
  that Ingenium's eyes already carry (`modules/r157.js` now lends it: `IngEyes.tf`, `IngEyes.net`); nothing new is carried, and
  it is loaded only when a lesson starts. The graphics chip through WebGL where there is one, the processor otherwise (a switch
  at the top, and a failing graphics chip puts the next lesson on the processor and says so); WebGPU is probed and said, not
  used, since this copy carries neither its backend nor a need for it. Four tools, one at a time, each lesson pausable and
  stoppable, one lesson at a time, small enough for a tablet of two to four gigabytes (Medium and Large are offered only where
  the memory allows, the text taken is capped, and every tensor is let go when a model is let go): Write like my text (a small
  transformer reads a text of hers letter by letter; four sizes from 30 thousand to 1.2 million numbers; the loss drawn as it
  falls with the held-back loss beside it; a sample of what it writes every few steps; a way to write with it afterwards), Sort
  my notes (a text classifier that learns her labels from lines like "history: The treaty ended the war.", says how it does on
  the examples held back, which words point to which label, and sorts the lines she has not labelled; six examples give a rough
  figure and it says so), Sort my pictures (the carried MobileNet v2 reads each picture once, only the last step is learned, in
  seconds; the pictures themselves are not kept) and Words that sit together (word embeddings by skip-gram with negative
  sampling: the nearest words of any word, a sum such as king - man + woman, a map of the most used words). What is learned is kept
  in this browser under a name (TensorFlow.js's own IndexedDB store) and used again after a reload, without loading TensorFlow.js
  to list it; letting one go asks first. Each knob has a plain line of its own.
- The computer's side (`build/desktop/app_data_692.py`, registered in `build/release.py`; each method is feature-detected by the
  page, so it works as before with an app that lacks them): the trainer takes its text as a file, handed over a megabyte at a
  time (`train_text_put`, then `text_path`), which lifts the 8 MB cap of one string over the bridge to 256 MB; and a run of
  several passes goes one pass at a time (llama-finetune with `-epochs 1`, the learning rate stepping down from the size's usual
  start to its usual end, the model saved after each pass), so a training the app's closing cut short keeps the passes it did:
  the trainer card offers to go on with it (`train_resume`) or to let it go (`train_discard`). Stop training by hand still
  keeps nothing. Where llama.cpp's llama-perplexity sits beside the trainer, `train_perplexity` measures a model on the held-back
  part of a dataset, as the build's own check does ("Final estimate: PPL"); no build carries that program yet (the lines that
  must carry it are written down in `build/desktop/README.md`), so Measure says so until one does.

- The way back to Ingenium's choice under Faber (her words, 31 October 2026: "limit the button of "Back to Ingenium's choice for
  this computer" to only the text, I don't like the long raised line look, please redesign that button"). The key `build/modules/r105.js`
  adds to Faber's list of coding models had been stretched across the whole tile by the list's grid; it is now a small flat key the
  width of its words, with an arrow before them, by a few lines of CSS in `build/modules/r199.js` (`r105.js` is unchanged).

    python3 -I rig/t_692_app_data.py <repo>/ingenium_app.py build/desktop/app_data_692.py  # 34 checks, on a copy, with stand-ins for llama-finetune and llama-perplexity
    node rig/t_703_studio.js <url> <out>                                                  # 25 checks: the rooms, the truth card's figures, Help, the tour, the keyboard, perplexity, the way-back key
    node rig/t_703b_datasets.js <url> <out> [port]                                        # 30 checks: the sources, the review, the held-back part, the exports, question-and-answer pairs from a stand-in model (rig/mock_qa.py), the computer's side
    node rig/t_703c_lab.js <url> <out>                                                    # 40 checks: the four tools, a character model trained on the processor in headless Chromium (24 steps, under two minutes), pausing, keeping and using again, a 2 GB device, a lean copy
    node rig/t_67_rooms.js <url> <out>                                                    # 59 checks since 6.9.3 (the Studio check now reads its rooms)

Ingenium 6.9.3 (1 November 2026; her words: "The "11 larger models, for computers with more memory" line needs to be made purple
and bolded so that it looks clickable. I want the same for the "Back to Ingenium"s models line as well."). On the Models page the
line that opens the larger models of a list ("11 larger models, for computers with more memory") is the app's purple and bold,
with a soft underline and the pointer of something to press; so is every "Back to Ingenium's choice for this computer", in the
coding models' list and, now, in each house's own list of models too (6.9.2's text-only look reached only the coding models'
list; in the houses' lists the line fell back to a plain button). By night both take the night's purple. `modules/r105.js`;
test `node rig/t_697_back_link.js <page> <out>` (12 checks, day and night).

Ingenium 6.9.3 also carries the folder search's review fixes (its page part stays held, `build/held.json`, until the owner
approves its first phase): the computer apps' side gains `build/desktop/app_rag_693.py` (a link inside a chosen folder can no longer
reach a hidden file or folder there; a folder chosen through a link is forgotten by the path it was chosen with), and the shipped
SQLite is patched for crash safety (`rag/vendor.json`). The whole of the review and the tests are in `rag/notes/review.md`; the
folder search now also runs on GitHub's Apple silicon and Intel Macs (WKWebView) and Windows PC (WebView2) on every change
(`.github/workflows/rag-engines.yml`).

Ingenium 6.9.2 (31 October 2026; her words: "I also want you to add better, faster and stronger models to Ingenium for all of
the houses. I want the app to really be upgraded and be operating up to standards", for her MacBook Pro (8 GB, with a 2 TB
external drive), Mac mini (16 GB), two HP laptops (16 GB), Fire tablet, iPhone and iPad, and "I still want the strong models
to be provided as options in Ingenium because I am aiming to purchase a bigger mac or macbook with a 64 GB RAM").
`build/modules/r203.js` with two R203 edits in `build_page.py` and `build/lineup_quants.json`: the houses by device and memory.
Five new models, every file name, size and SHA-256 read from Hugging Face on GitHub's machines (`.github/lineup/candidates.txt`
round 7, checked mechanically against that log): MiniCPM5 2B, Qwen3.8 27B, Qwen3.6 35B-A3B, Gemma 4 31B and Granite 4.2 8B,
and three copies (Granite 4.2 8B and Qwen3.5 9B in a Compact quality, Qwen3.8 27B in Best). Her 8 GB MacBook Pro: Scriba
MiniCPM5 2B, Magister Qwen3.5 4B, Faber Granite 4.2 8B Compact. Her 16 GB computers: Scriba Gemma 4 E4B (Magister and Faber
were already the strongest that fit). A 64 GB Mac: Scriba and Faber Qwen3.6 35B-A3B, Magister Qwen3.8 27B Best. The strong
models are offered on the Models page and in the catalogue with what each needs and what the device has to spare; a computer
without a graphics chip has its own list; a device that cannot tell its memory takes the smallest model of a list; the
sampling settings come from each model card. On 8 and 16 GB a plain line says that another computer of hers can lend a larger
model. Not in this release: the speed-up files beside the new models, and LFM3 and Bonsai 2, which need a newer engine.
`rig/t_698_lineup.js`, 42 checks.

Ingenium 6.9.2 (31 October 2026; her words: "limit the button of "Back to Ingenium's choice for this computer" to only the
text, I don't like the long raised line look"). `build/modules/r105.js`: the way back under the coding models is a line of text
with a small return mark, as wide as its words; `rig/t_697_back_link.js`, 7 checks.

Ingenium 6.9.2 also carries, unused until its own release, the folder search's desktop bridge (`build/desktop/app_rag_692.py`:
the app's own folder dialog and reading a chosen folder's files on request); its page part (`build/modules/r202.js`, `rag/`)
is held out of release builds (`build/held.json`) until its first phase is reviewed.

Ingenium 6.9.2 (31 October 2026; her words: "I also want for the data on the app to be protected with encryption so that my
data is protected on the device. I also want an optional sign-in / login screen with user name and password.").
`build/modules/r197.js` (`window.IngLock`), with the R197 edits in `build_page.py` and a few lines in `r123.js`, `r131.js`,
`r132.js`, `r136.js`, `r141.js`, `r143.js` and `r173.js`: a sign-in of her own, and her data sealed on the device. Off until
she turns it on; with it off the page is what it was (the welcome door gains one quiet line under Enter, and Settings, Your
data gains a card that says Off), and every earlier test passes unchanged.
- The lock. Turned on from the welcome door (Protect this copy with a sign-in) or from Settings, Your data, it asks for a
  user name and a password (eight characters or more), shows a recovery phrase of ten plain words once (drawn without a
  repeat from 512 words bundled in the module) and asks two of them back before it seals anything. The password goes
  through PBKDF2-SHA-256 (the rounds are measured once on that device to about three quarters of a second, never under
  600,000) into a key that wraps one random AES-GCM-256 data key; the phrase wraps the same data key by its own derivation;
  a check value turns a wrong password away before anything is read. Changing the password wraps the data key again and
  nothing else (no text is sealed again). The record is `localStorage["ingenium_lock"]`: the name, the salts and the wrapped
  keys, nothing that opens anything without the password or the phrase. The data key is a non-extractable WebCrypto key held
  in a closure of the module for the session and never written anywhere (its bytes stay in that closure for one purpose
  only, the moment the window closes in the middle of a write, below).
- The desk sealed. The boot gate (`state=migrateFrom(loadState());`) keeps a sealed desk, or a lock set up over a desk still
  plain, aside for the sign-in and starts from the defaults, and `saveState` returns first while the desk is locked, so a
  locked page can never write a fresh desk over the sealed one. With the lock on, `saveState` hands the desk to the lock's
  writer: one sealing at a time, the newest desk always the one written (gzip first where the browser has CompressionStream,
  then AES-GCM with the place the text belongs to bound as additional data), kept everywhere the base keeps the desk (the
  browser's store, the recovery shelf, the larger store's overflow copy, the computer app's `desk.json`). What is stored is a
  small clear header, `{"ing":"locked","v":1,"__deskAt":…,"theme":…,"look":{theme,motion,depth},"n":{chats,messages},
  "lock":{…},"body":"ING1.<nonce>.<ciphertext>"}`, so the tab's icon, the loading page's theme, `deskAdopt`'s stamp test,
  R132's newer-desk test and the recovery shelf's counts keep working without the key; the lock record rides in the header
  too, so a sealed desk whose browser store was lost (the computer app's web view at a new address, a store cleared by hand)
  still opens with the password. When the window hides or closes, what is still on its way is sealed at once by a
  pure-JavaScript AES-GCM (proved byte for byte equal to WebCrypto's), so the last change is never lost.
- The sign-in. On a locked start a card is drawn over the loading page: her user name (kept with the lock, filled in) and
  her password. A wrong name or password is refused and nothing changes; the right one opens the desk, adopted as R132 and
  `deskAdopt` adopt (the desk's keys replaced in place, then the whole desk painted again), and lifts the cover. Forgot your
  password? takes the ten words (any case, any spacing), opens, and asks for a new password; I have neither the password nor
  the phrase says plainly that nothing sealed can be opened, and only then starts again with an empty desk (the sealed desk
  and its lock are set aside, not destroyed). Lock now (Settings, Your data) saves and seals first, then starts the page
  again; the lock after time away is 5 minutes, 15 (the start), an hour or never, and waits while a reply is being written;
  what was typed in the chat's box and not yet sent is kept inside the sealed desk and put back after the sign-in.
- Her long texts sealed. R81's store of long texts (IndexedDB `ingenium_big`) seals what it puts and opens what it reads,
  and the shell's own bridge (`save_state`, `big_put`, `big_get`) seals what reaches the computer app's disk (`desk.json`,
  `big/*.txt`, the signing keys' copies), so those files are ciphertext too. While the page waits at the sign-in the store
  waits with it, and the sweep that lets go of texts the desk does not name runs only after the sign-in. A plain record and a
  sealed one are both read, so nothing is lost when the lock is turned on or off over texts already there.
- Settings, Your data (`ingLockCard`, in the data room of r173; Find a setting finds it by "encryption" or "password"):
  Off or On with her name; Protect this copy with a sign-in…; Lock now; Change the password…; Show the recovery phrase… (the
  password is asked first); Turn protection off… (the password is asked; everything is written back as plain text, with a
  progress line); the lock after time away; and a fold that says in plain words what is sealed and what is not. Turning
  protection on seals what is already there in small batches that can stop and carry on (a text is replaced only if the
  store still holds the very one that was read), with a progress line. Where the browser offers no cryptography (an address
  that is not https, localhost or the apps' own), the door and the card say so and refuse; the lock never half-works.
- The other stores, too. The conversations brought in from elsewhere (r131), the signing keys (r136, and their copies on the
  computer's disk), Fabrica's issues and pages (r141) and the older copies of the desk are sealed record by record
  (`{ing:"sealed",…}`); r123 no longer keeps a plain shared copy of the notes, reminders and thoughts in the browser's store
  while the lock is on (so a window of its own opened from an app does not share them with the main window until the lock
  is turned off). The Backup page (r143) is as it was for her: a backup stays a plain zip, so it can be restored on any
  copy (its records are opened on their way in and sealed on their way back), and `ingenium_lock` joins the keys it neither
  carries nor overwrites.
- Not sealed: backups made from the Backup page, the documents the carried apps keep in their own frames, her model files,
  the app library, Fabrica's saved versions of her apps, the engine, and on the computer apps the earlier copies of the
  desk already kept in `desk-backups` before the lock was turned on. In the clear: the header above (when the desk was
  saved, the look, how many chats and messages), her user name, and the lock record. This keeps what is on the device
  unreadable while it is locked; it does not hide an open, signed-in page from someone sitting at it. A forgotten password
  with the phrase lost too cannot be reset by anyone, which is the point.

    node rig/t_700_lock.js <url> <out>                                         # 57 checks: the door's choice, the phrase shown once and two words asked back, the lock record and the sealed desk (clear header, no plain trace anywhere in the store), the sign-in (name, wrong password, right password, the recovery phrase, the lock after time away), change of password, turning protection off, the lock off as before, no cryptography
    node rig/t_700b_lock_shell.js <url> <out>                                  # 11 checks: with a stand-in of the computer app's bridge: desk.json and big/*.txt sealed, the base's deskAdopt keeping a sealed desk for the sign-in, Lock now, the unsent words kept
    node rig/t_700c_lock_stores.js <url> <out>                                 # 16 checks: the other stores sealed and read whole, the signing key's bytes the same, turned off plain again, the Backup page's two asks
    node rig/t_700d_lock_backup.js <url> <out>                                 # 15 checks: a backup made with protection on, restored in a fresh profile (plain, no lock) and over the sealed desk (sealed again), the last words sealed when the window closes, Reset everything taking the lock with it

Ingenium 6.9.2 (31 October 2026; her words: "I want to make the Career Studio and the Lector page more capable. I want to be
able to use it for PhD applications and for job applications. I want to be able to automate where I want and also
meticulously review and do on my own at my own pace"). The Career Studio (modules/r188.js) gains, in the order they were
weighed to matter most:
- Dates and reminders. Each application keeps its dates: the closing date, the interview, a reference due, a funding
  deadline, any day she adds; Track lists them with the days left and, on each, Remind me (a week before, three days before,
  the day before) puts a thought in the Inbox that comes back on that morning (the thought cloud nudges it while the page is
  open, Focus's "what today asks of you" lists it), and With the bell keeps a line among the bell's reminders; pressed twice,
  nothing is doubled; a reminder belongs to the day the date had when it was set, so when a date moves the chip is free again
  and the old thought leaves the Inbox as the new one comes. Reminders stay inside Ingenium, and the studio says so: there
  are no alarms outside the app. Today's list opens on a This week strip (every date of every open application in the next
  seven days; a press opens its Track), and the nearest date is said in plain words. An application removed takes its
  thoughts with it.
- Referees. Who will speak for her and where each stands (to ask, asked, agreed, sent, thanked), with the day asked, the date
  due (three days before the closing date, to change), notes, Remind me three days before, and the request, the follow-up or
  the thanks written for her to send (the prompt carries the referee's name, post and due date). A referee comes from the
  profile's Referees entries or by name. The checklist's "Ask your referees" line opens them; Today says "Choose your
  referees" while the posting asks for references and none is chosen, and "Follow up with X" ten days after asking with
  nothing back.
- The interview. In Track, the stage Interview (or Add an interview) opens the card: the day, time, how, where, the panel, a
  list to prepare by that no model writes (the posting once more, an example for each essential criterion, two questions to
  ask them, prefilled from the reading's ASK lines, the way there, what to bring), notes before and after, and a thank-you
  email. With the day set, Today says "Prepare: N days to the interview" before anything else. In Practise, Mock run gives
  one question two minutes on the Clepsydra (its usual length given back at the bell or on Stop, and if the page is closed in
  the middle, when it is opened again), then her answer is looked at as before. When the day has passed, Today says "Note how
  the interview went, and write your thanks" until the notes after it and the thank-you are made.
- Export. Export this application (Track) and Export all (Applications) save one zip through makeZip and saveFileNative: a
  folder per application with posting.txt, particulars/, reading.md (the band with its rule, the wants and criteria tables),
  checklist.md (ticked as it stood), each document as the Word file Save as Word gives and as Markdown, emails/, practise.md,
  notes.md (dates, referees, interview, reading list, notes) and a README that says nothing left the device. Settings' Export
  your data has a new line, "The Career Studio", through a small hook in modules/r117.js (window.__ingExportProviders: any
  module may register what it keeps): each profile's applications as readable files under career/, and career/career.json
  with the studio's records and every text they name, whole (the CV, the writing and the letters the reading page keeps for
  her among them), so a backup carries them.
- A reading list. For each application: a supervisor's work, the programme's pages, the call. Keep to read on anything Look
  it up online found; added by hand; Add to Fontes (a webpage source by title, author and address, remembered on the item);
  Fetch its text, only on press; Read it with the reading page, which reads it as a document (a run tied to the application;
  what it found stands under the item, and the item is marked read). The item follows its run: it says how many parts are
  read, Carry on reading takes up a reading that was paused, one finished in the reading page itself is read here too, and
  one that stopped is not counted as read (reading it again lets go of the run that stopped). Those findings go to the
  prompts as MY READING NOTES, beside the profile and never as facts about her; removing the application, or the whole
  profile, removes the text and the runs.
- Minutes. Every step on Today says about how long it takes (a reading 10, a checklist tick 5, a draft to fill 15, a document
  written step by step 25, written herself with a guide 45). The right panel asks "I have: 10 · 15 · 25 · 45 minutes" and
  lists only the steps that fit, the smallest first; on a low-energy day one step only (on a phone the list has a key, How
  long do you have?, that opens that panel, with a key back to Today). Start the clock runs the Clepsydra for that long; at
  the bell the studio offers Not today (the steps rest until tomorrow) or Carry on.
- The posting checked again. A posting fetched from its address remembers the address and the day; Check it again (The
  posting) fetches it once more, on her press only, and shows each sentence that changed, before and now, and a changed
  closing date; Keep the new text makes it the posting (the date and the checklist's "Send it before it closes" follow; her
  copy of the old text stays kept; the copy before that is let go), Keep my copy leaves it. Add a document keeps further
  particulars, a handbook or the person specification with the application, read with the posting by the reading, the limits
  (limitsIn) and the checklist.
- LinkedIn as a difference. The first import still enters every entry at once; its status says the files and their counts,
  what was skipped and what was not read, and the headline and summary are shown, with Keep as an entry. Imported again, the
  export is read against what is there: an unchanged entry is kept, a new or changed one is offered in Found in your sources
  (a changed one kept replaces the old), one gone from the export is flagged in Your entries with Keep it (it becomes her
  own) and Drop it, and an entry she changed herself or dropped before is never touched or offered again.
Every long text these keep (a fetched page, further particulars, the posting before a change) is named in the application's
record, so IngBig keeps it, a profile copied or removed carries or lets go of it, and removing the application deletes it.
Lector-side (modules/r108.js): the studio's second reading of a doctoral document (statement, statement of purpose, proposal,
funding, supporting or teaching statement) is given the reading page's own examiner instructions (a claim inferred marked as
inferred, one idea to a paragraph, the posting's limit, a citation only where a source supports it), and the document's notes
say "N% of the words were changed in the examiner's pass" as the reading page does; a cover letter or CV keeps the plainer
examination. One posting, two pages: the reading page's brief ("What it is for") offers the studio's open applications as the
posting or the programme's call (kept with from "career:" and the studio's title, organisation and closing date), and a
posting kept in the brief has Also bring it to the Career Studio, brought once (the studio knows it by the brief's id, as the
hand-off of a CV or cover letter with no apps already did; that hand-off now also recognises a posting lent by the studio).
Tests: rig/t_702_career_dates.js (15), t_702_career_refs.js (12), t_702_career_interview.js (17), t_702_career_export.js (the
zip read back in Node, 15), t_702_career_reading.js (18), t_702_career_minutes.js (11, with the phone),
t_702_career_snapshot.js (11), t_702_career_linkedin.js (17), t_702_career_lector.js (13): 129 checks; the stand-in model
answers every request and nothing goes online. The four older tests of the studio and the reading page (t_683, t_685, t_6812,
t_lector_doctoral: 109 checks) pass unchanged.

Ingenium 6.9.1 (31 October 2026; her words: "I want Ingenium and all of its mini apps to work as one ecosystem the same way
that Carpe Diem does [...] I want the Word documents created on the Chats page, Lector Page or Career studio to be able to be
sent and opened in Tabula or the Excel spreadsheets to be able to be opened in Abacus, and the powerpoint slides in Imago and
so forth [...] I want every page and feature to be aware of each other and the rest of the app", and "I want to be able to
import my exported data from other chats into the app and continue working on my projects smoothly. It needs to be a smooth
handoff from any frontier provider").
- `build/modules/r194.js` (IngOpenIn): a document made anywhere opens in its app as the very file a Save key gives. The
  chat's document card's Tabula key hands the Word file (r183, as the page shows it) to Tabula's own opener (__cdOpenFile),
  the sheet card's Abacus key hands the workbook (formulas kept) and the slides card has a new Imago key for the deck; the
  reading page (r108, Open in Tabula beside Save) and the Career Studio (r188, Open in Tabula beside Save as Word) hand their
  own Word files; an app holding work is asked (Replace it, or A second window, the safe way out) and the document opens in a
  second window of that app; inside each app a From Ingenium key (Tabula's File menu, beside Abacus's Open .xlsx and Imago's
  Open .pptx) lists what the chat, the reading page and the studio have made and opens one there; the file Imago asks the host
  to download (carpe-download) is saved. The old routes (web text through a storage line, CSV) are no longer used for documents.
- The chats carried over from other assistants (`build/thoughts/chat_import_core.html`, `build/modules/r160.js`): Claude Code's
  session files (.jsonl: one conversation a session, named by its summary, thinking kept, the tools it used and what they
  answered under the reply, its folder in a note); transcripts headed by Perplexity, Kimi, Poe, Meta AI and others, and by
  "Q:" and "A:"; a conversation pasted in (Settings, Paste a transcript; the list's Paste a conversation; a file dropped on
  the Settings card); what was left aside is named, and a dialog that found nothing offers the paste; a transcript is known by
  its words (two pasted conversations are two); the card names the model the conversation was written with; and the first
  reply after a conversation is carried over tells the model where it came from, with the brief, once (it stays on that
  message as its context).
- Her words (31 October 2026): "Scriba and Fontes are missing their apps symbols from their buttons. The close button from the
  About panel is a different shade of purple from the rest of the app, please fix it. Also, I don't love the look of the
  "Where you were" card, please fix it." `build/modules/r193.js`: Scriba's and Fontes's stones in the rail carry the Forge's
  own marks before their names (the Forge's drawings, in its colours). `build/modules/r196.js`: the primary key of every raised
  card (About's Close, Help, Display, the tour, the dialogs, the support notes) is the page's own primary key again (its
  gradient, its gold ring, its lift), by day and by night; r184 had given them a quieter, greyed amethyst. "Where you were":
  each line carries a drawn mark on an amethyst disc (a step, a conversation, a timer, a parked thought) in place of a type
  glyph (the dotted circle read as an empty hole), its title sits on a fine rule, Not now is a raised ghost key, the card is
  no wider than its words, and it arrives with the raised cards' spring.

    node rig/t_696_cards.js <url> <out>                                        # 13 checks: About's Close against the page's own key by day and by night, the card's marks, keys, width and arrival
    node rig/t_693_stones.js <url> <out>                                       # 17 checks since 6.9.1 (the marks on Scriba and Fontes)

- GitHub's own sign-in page (her words, 30 October 2026: "I want Ingenium to be load up the GitHub sign-in page instead of
  prompting me to create a code or key in order to gain access to GitHub and my account's repositories"). `build/modules/r114.js`:
  Fabrica's GitHub signs in through GitHub's device flow: Sign in with GitHub asks GitHub for a short code, opens GitHub's own
  sign-in page (the computer app's browser through the new `open_url` of `desktop/app_open_691.py`; the Fire and iPhone apps
  through the new `openUrl` of their bridges), shows the code to type there with Copy, waits (never asking GitHub faster
  than it allows), and keeps the sign-in on the device as the token was kept (`state.github.token`, `via:"device"`), with
  Paste a token instead beside it. GitHub's sign-in endpoints refuse a page in a browser, so the asking goes through
  `netFetch` (the relay, the bridges); in a plain browser the token stays the way in, and the row says so. The app id (an
  OAuth App's public client id) is the owner's: GitHub, Settings, Developer settings, OAuth Apps, New OAuth App, with
  Enable Device Flow ticked; it goes in once under Another app id (or Add the app id), and is kept in `state.github.client`.
  The sign-in asks for the scopes repo and workflow (a kit's workflow files cannot be sent without the second).
  `rig/ghmock.py` answers the device flow; `rig/t_fabrica_github.js` signs in on the page first, then with a token.

- The Fire tablet's second built-in model: LFM2.5 1.2B Thinking's file on Hugging Face was replaced upstream (730,899,072
  bytes, fingerprint 4a1e1824…), so the 6.9 Fire build refused it; `lineup_quants.json` and the Fire repository's
  `mobile_models.json` pin the new fingerprint, read from Hugging Face by `.github/workflows/lineup-sources.yml` (round 6).

    node rig/t_695_openin.js <url> <out>                                       # 16 checks: the three cards, Tabula holding work, From Ingenium inside each app, the studio's and the reading page's keys, Imago's download
    node rig/import_fixtures.js <served>/imp && node rig/t_694_import.js <url> <out> <url>/imp   # 18 checks: Claude Code sessions, other heads, Q and A, what is left aside, the paste, the model told once
    (rig/t_62_import.js's check "Ollama is told how much to keep (num_ctx)" has failed since r190 wrapped cloudChat; it reads the function's source)

Ingenium 6.9.1 (30 October 2026; her words: "I want for context and tokens to be massively increased inside of Ingenium").
`build/modules/r195.js`, a longer memory, seen, with the R195 edits in `build_page.py`:
- The page's own engine says what memory it really loaded (it loaded 8,192 whatever the slider said, and the slider reached
  32,768, so the engine refused long conversations instead of the page trimming them); the history is fitted to that, and
  the slider reaches 32,768 only where the fast engine runs on a computer with 8 GB or more.
- A document, an app or a change asked of a server on this computer or in the home (Ollama, LM Studio) keeps its room with
  Thinking off too (it was cut at the slider's 1,024 tokens); a personal AI's length is a floor, never a cut below that room;
  on the computer engine a thinking budget comes on top of the reply (the slider, the budget and 512 more).
- A connected model's window and longest reply are read from the service's own list of models when it gives them (Settings'
  List models, or the first reply), kept by id in `state.cloud.info`; without a list, a current model of Anthropic's (a
  version of 4.6 or later in its id) is given a million tokens (it was 200,000), and its reply up to 128,000 (32,000 stays
  the floor when the list is not read); a remote server's reply reaches the cap its list names; the Longest reply slider
  reaches the model's own cap on a connection; a reply of more than 32,000 tokens is given 1,800 seconds through the apps'
  relay (120 or 900 before); the reading page's parts follow a lender's window when it is known, up to 262,144.
- A memory meter: under the Context window slider, "Memory in use: 41,200 of 131,072 tokens (31%) · 212 messages in the
  window · 88 recalled" from the engines' own counts (the computer engine's usage and the tokens its cache reused, the
  services' counts in their streams, Ollama's), or an estimate; the fit of the chosen window on this device beside the
  slider, before it is loaded; and a small pill beside the model key that says the same in short and opens Controls.
- A rolling summary: when a conversation's oldest messages are put away (r103) or recalled (r159), one background job asks
  the model (Thinking off, 600 tokens, chunks that fit 40% of the memory, at most four rounds a run; never while a reply is
  live or a model is loading, only a model already loaded on the device, or the connection) for a summary of at most 250
  words (names, decisions, open tasks, file names), kept as `c.summary` (at most 4,000 characters) and `c.summaryN`; the
  brief of what came before gives it 60% of its room, and the room recalled scales with the memory (about 48,000
  characters at 200,000 tokens; it was 16,000 whatever the memory).
- The computer app's automatic memory reaches 262,144 and 196,608 by the same 70% rule, for a model trained for them, and
  reads a model's header for its trained length before choosing when it is not yet known.
Not in this stage: the lender's own window sent and reported (`ingenium_ctx`, `_share_models`) and the phones' and tablets'
engine (their caps, eight-bit memory and thinking budget), which touch the Python and native apps.

    python3 rig/mockcloud.py 18795 <out>/mock_req.json &  # started by the test itself; its lists now carry each model's window and longest reply
    node rig/t_695_memory.js <url> <out>                  # 30 checks

Ingenium 6.9 (30 October 2026; her words: "The "On" button for the Sounds feature and the "Ingenium" button on the Chat panel
look really flat compared to the rest of the buttons on the display panel, please make the fix so that they match the rest of
the other pressed buttons inside of the Display panel", "I want a better example for Ingenium's chat tour because the current
one kind of reads a little weird when it shows the "Thinking" box", and "I also want the apps buttons to match the Forge and
have the little coloured circles that show their colours and I also want them reflected on the desktab circle").
- `build/modules/r192.js`: in the Display panel (and the other raised cards of r184), a segmented key that says
  aria-pressed="true" (the Sound keys of r176, the Chat look keys) is the same raised amethyst key as one that says only the
  class "on" (Day, Raised, Side bar, Calm...), by day and by night. r184 had given anything pressed in a card a flat ring.
- The tour's example conversation (`build_page.py`, the R192 edits of TOUR_Q, TOUR_A and TOUR_THINK): the packing list, whose
  thinking spoke of the person in the third person, gives way to a question she might ask (planning the writing of a research
  proposal in three weeks), with the model's thinking in its own first person and a short reply in three dated steps.
- `build/modules/r193.js`: the five apps in the side rail are Carpe Diem's cut stones, as in the Forge's rail (the stone Home
  already wears for each, read off a probe of r147's jewels, 26px high, lettered in Georgia, Fontes in the dock's blue-black);
  folded, the APPS key (r137) wears a row of five circles in the stones' colours, as the Forge's does; each Desk tab's
  circle (r123) is the same colour as the stone; and while the Desk is up the rail lights the stone of the app in hand
  (r123's go() never reached the rail, so Home stayed lit while Tabula was open).

    node rig/t_692_keys.js <url> <out>       # 19 checks: the chosen keys in the Display panel and in Settings, by day and by night; the tour's example
    node rig/t_693_stones.js <url> <out>     # 16 checks: the stones, the circles folded and not, the Desk tab's circle, the app in hand lit, night, a phone

Ingenium 6.8.12 and The Forge 656 (28 October 2026; her words: "I want the Career Studio and the Lector page to be made even
more capabale and proficient in their functions [...] I want to be able to automate where I want and also meticulously review
and do on my own at my own pace", and "I want the Career Studio to be able to hold multiple profiles"; asked, she chose a switch
on each task, a calm Today view, requirement checklists, more PhD documents and changes accepted one by one, and profiles for
other sides of her and for other people she helps, each with its own applications). `build/modules/r188.js`: Today, a room of
its own (only the next small step of each application, its closing date, Do this now, Not today); a Checklist step (what the
posting asks to send and do, read from its own sentences, each item with its quotation; Find anything missed keeps only what
the model quotes word for word and the list does not hold); a statement of purpose, a teaching statement, a funding application
and the choice of a writing sample, with their lessons and limits; each task's way (Do it for me; Step by step with me: a plan
first, then each change she asks for waits, one by one, with Why this change?; Guide me, I do it: a guide to write it herself);
several profiles (state.career becomes {people, cur}; what was kept before is the first; Another side of me copies a profile
without its applications; Someone else is empty and never uses her CV, her writing or Lector's readings), with a switcher
beside the studio's name.

    node rig/t_6812_career.js <url> <out>                                      # 25 checks
    node rig/t_683_career.js <url> <out>                                       # 48 checks (six steps, five rooms since 6.8.12)
    node rig/t_685_career.js <url> <out>                                       # 25 checks
    node offline_project/forge_656/tests/t_656.js <the Forge url> <out>        # on 656 carrying Ingenium 6.8.12

Ingenium 6.8.11 and The Forge 655 (28 October 2026; her words: "I want the models to be aware of what I need them to do and
make surgical edits and help me improve my apps", on the code chat, the main chat page and the Build page, with Claude's
models, Ollama's and Kimi; and "I want to be able to automate where I want and also meticulously review and do on my own at
my own pace"; asked how, she chose a switch on each task). `build/modules/r190.js`, the working loop: a model no longer has one
attempt with passages Ingenium guessed for it; it searches, reads the exact lines, edits, runs the app, reads its errors
and mends them, with six tools (list_files, search, read, edit, write_file, run_app), each step shown under the reply in
plain words. Connected models take the tools in their service's own form (Anthropic's Messages API for Claude, thinking
blocks passed back unchanged and the history only appended to; the OpenAI form for Kimi, OpenRouter, OpenAI, LM Studio and
Gemini; Ollama's own); the models on the device take them as written `<tool_call>` tags, with short results. Each task has
its way, on a key beside the model's name: Do it for me; Step by step with me (each change waits on a card, lines before and
after: Make this change, Skip it with a note the model is told, Make all the rest, Stop here); Guide me, I do it (the model
only reads and shows where and what to change, and why). Code keeps every change as a version, Chat as a changed file, and
Build has Ask a model to change this page, with Undo. A model that refuses tools answers as before. `build/modules/r191.js`:
every connection set up is kept on the device, the model menu lists the models of all of them by service (Claude Fable,
Opus, Sonnet and Haiku by name), choosing one switches service at once, and each conversation keeps the model that last
answered it; Settings lists them with Use and Forget. The Forge 655 carries Ingenium 6.8.11, and Ingenium 6.8.11 carries it.

    python3 rig/mock_agent_server.py 8191                                      # Anthropic, OpenAI and Ollama forms, checked
    node rig/t_690_agent.js <url> http://127.0.0.1:8191 <out>                  # 44 checks
    node rig/t_6811_connections.js <url> http://127.0.0.1:8191 <out>           # 11 checks
    node offline_project/forge_655/tests/t_655.js <the Forge url> <out>        # on 655 carrying Ingenium 6.8.11

Ingenium 6.8.10 and The Forge 654 (28 October 2026; her words: "I want the copyrights and authorship line of "Designed and
built by Yannie D. Forest · © 2026 Yannie D. Forest" placed at the bottom of the app's display page as well as the About panel
like it is done on Carpe Diem. I want the app's page to not just abruptly end."). `build/modules/r189.js`: under the last card
of each page that scrolls (Home, Focus, Models, Blend, Build, Schedae's notes, the Guide, Settings), a colophon as Carpe
Diem's: the seal (drawn by `drawIngeniumSeal`, by day and by night), the app's name, a fine rule with LOCAL MODEL STUDIO, and
the line in her words; the rooms that fill the window keep it. About ends with "Designed and built by Yannie D. Forest" over
"© 2026 Yannie D. Forest", under a fine rule, as Carpe Diem's About does. The Forge 654 carries Ingenium 6.8.10, and
Ingenium 6.8.10 carries it.

    node rig/t_6810_colophon.js <url> <out>                                    # 10 checks
    node offline_project/forge_654/tests/t_654.js <the Forge url> <out>        # 21 checks, on 654 carrying Ingenium 6.8.10

Ingenium 6.8.9 and The Forge 653 (28 October 2026; her words: "I want the Forge to be just as capable and functional as
Ingenium with the same increased capabilities. I just want to do it all without AI", and of Tabula, Abacus and Imago, "I
want them all fixed"). The Forge's own copies of the three apps had none of Ingenium 6.8.1's fixes. Pressed as a person
presses them inside The Forge 652, Tabula's ribbon passed 20 of 42 checks, Abacus's 26 of 36 and Imago's 31 of 38. The
Forge 653 applies the same four patches Ingenium's build applies (`build/apps/tabula_hf_patch.py`, `tabula_ribbon_patch.py`,
`abacus_ribbon_patch.py`, `imago_ribbon_patch.py`) to the Forge's copies (`offline_project/forge_653/forge653.py`); inside
The Forge 653 every check passes. The four tests now take a Forge page too (`rig/in_forge.js` opens the app by its key in
the Forge's side column). `rig/t_681_abacus.js` no longer adds the frame's place to a cell's box Playwright already measures
on the whole window (inside the Forge, whose frame stands 42 pixels down, every drag landed a row low). Ingenium 6.8.9
carries The Forge 653, and The Forge 653 carries it.

    node rig/t_681_ribbon.js <the Forge url>       # 42 checks inside The Forge (652: 20)
    node rig/t_681_abacus.js <the Forge url>       # 36 (652: 26)
    node rig/t_681_abacus_keys.js <the Forge url>  # 28
    node rig/t_681_imago.js <the Forge url>        # 38 (652: 31)

Ingenium 6.8.8 and The Forge 652 (28 October 2026; her words: "You broke something on the Forge it has the wrong Magister
dock. Why is the French tutor button amongst the other buttons inside of the Forge?"). The Forge makes its Magister card by
copying Carpe Diem's Magister dock and rewriting it; it found the key and the row of tutors by marks Carpe Diem's script puts
on them every so often, so a copy made before the marks came kept Carpe Diem's row and "Open Magister", for good. The same
code is in every Forge from 647 to 651. Now the key and the row are also found by their words, and a card made wrong is made
again (`offline_project/forge_652/forge652.py`). Ingenium 6.8.8 carries The Forge 652, and The Forge 652 carries it.

    node offline_project/forge_652/tests/t_652_magister.js <the Forge url>  # 6 checks; on 651, 3 of them fail as on her computer
    node offline_project/forge_652/tests/t_652.js <the Forge url> <out>     # 21 checks, as 651's, on 652 carrying Ingenium 6.8.8

Ingenium 6.8.7 and The Forge 651 (28 October 2026; her words: "I hate the look of the apps buttons. Why are they so big and
bulky? ... I want them back to their actual sizes like they are on Magister's dock"). The apps on Home are the size of
Carpe Diem's keys on Magister's dock, as measured in Carpe Diem 1059: 26px high, as wide as the name with 14px either side,
Georgia 600 at 12px, one row 6px apart, Fontes lettered #0f4b66 (`build/modules/r147.js`). What each app does is told when
the pointer rests on it and to a screen reader. The Forge 651 carries Ingenium 6.8.7 and Ingenium 6.8.7 carries The Forge
651, made together as 6.8.6 and 650 were (`offline_project/forge_651/`).

    node rig/t_685_home.js <url> <out> [<Carpe Diem 1059 url>]           # 18 checks: the stones against the dock's keys
    node offline_project/forge_651/tests/t_651.js <the Forge url> <out>   # 21 checks, as 650's, on 651 carrying Ingenium 6.8.7

Ingenium 6.8.6 and The Forge 650 (28 October 2026; her words: "The Forge needs to carry the latests version of Ingenium and
vice versa"). Each carries the other's lean copy, a page that carries no apps, so the two are made together: Ingenium 6.8.6's
release page is built, its lean copy made (`offline_project/forge_649/lean_ingenium.py`), The Forge 650 built carrying it
(`offline_project/forge_650/forge650.py`, from the 649 page as released), and Ingenium 6.8.6 built again carrying The Forge
650's lean page. Only the carried copy and its line in the list of carried apps depend on which Forge Ingenium carries, and
making the lean copy takes both out, so the lean copy of the release is byte for byte the copy The Forge 650 carries (checked
before release). Nothing else changes from 6.8.5 and 649.

    node offline_project/forge_650/tests/t_650.js <the Forge url> <out>   # 21 checks, as 649's, on 650 carrying Ingenium 6.8.6

Ingenium 6.8.5 (28 October 2026; her words: "I want the cards on the 'How the Studio Works' on the Career page to be
clickable and animated", "I want it operating and writing really well with all of its features", "I want the text colour
of the selected tabs to be white instead of black", "I want the 'Your apps' section to actually show the brick jewelled
sparkling pill look of the apps original button designs from Carpe Diem and the Forge", of the Focus page's Inbox, "They
are supposed to be button and look 3D and popped out and animated", and "I want them to have similar sounds when I hover
over the buttons inside of Ingenium the same way they are inside of Carpe Diem and the Forge").

- The Career Studio (`modules/r188.js`). The room key in hand reads white on its amethyst: the studio's own reset of its
  buttons no longer reaches the room keys, which now look exactly as Lector's and Settings' do. The four cards of How the
  studio works are keys: they rise into place, lift under the pointer and sink when pressed; pressed, a card stays where it
  is, raised and ringed, and beneath the four opens what that part of the studio does, with a key into it (Enter does the
  same; pressed again, it closes; nothing moves out from under the pointer). A limit the posting sets for a document, in
  words or pages, is read from its own sentences (each clause with the document it names), written into the request, and
  the draft's length is shown against it. Which of the posting's criteria a draft speaks to is shown, by their own words (a
  guide, not a judgement), with the essential ones it does not. Improve it rewrites a draft from a note of her own or from
  quick choices (Shorter, Warmer, More formal, Plainer words, Essential criteria first, and when they apply, Within the limit
  and The missing criteria), from her profile alone, read a second time against it; the version before is kept, and The
  version before brings it back. Her own version is never rewritten.
- Home (`modules/r147.js`, `jewels/`). Your apps are Carpe Diem's cut stones: the stone Carpe Diem paints on each app key
  (its table cut, the gilt edge, the 8px cut corners), lettered as Carpe Diem letters it, with white sparks at the corners on
  a clock of their own; Schedae takes Scriba's stone turned to amethyst and Clepsydra Carpe Diem's gold. `jewels/make_jewels.py`
  writes `jewels/jewels.css` from Carpe Diem's own stones (`cd_stones.json`) and its spark (`cd_star.json`).
- The Inbox on the Focus page (`modules/r119.js`): its keys (To a note, To Tabula, Steps, To the chat, A reminder, Done) are
  raised keys, rising into place one after another, lifting under the pointer and going down when pressed.
- Sounds (`modules/r176.js`): a seventh kind, Touching a key: as in Carpe Diem and the Forge, a raised key ticks faintly as
  the pointer comes onto it (Carpe Diem's own tick, at its level: 0.0046 measured there), never twice in a row on the same
  key, never with a finger; Key touch, Light touch or No sound. The Career Studio's keys, Home's stones and the Inbox's keys
  sound when pressed too.
- Ingenium carries The Forge 649 (6.8.6: The Forge 650).

    node rig/t_685_career.js <Ingenium url> <out>                     # 25 checks: the white room key, the cards, limits, criteria, Improve it, the version before
    node rig/t_685_home.js <Ingenium url> <out>                       # 14 checks: the stones, their sparks and lift, the Inbox's keys, the hover tick

Ingenium's sounds, in Carpe Diem's family (6.8.4; her words: "I actually do want the same warm upbeat welcoming sounds from
Carpe Diem on Ingenium, I just don't want them identical but I do want them closely related, I want them very similar to
Carpe Diem's in every way to stay in the family and keep the same feel. The sound is slightly better now but still too slow
and sounds off"). Before this, 6.8.1's own voices were too quiet ("weak and mild"), 6.8.2's struck, mechanical ones harsh,
and 6.8.3's slow warm swells "too slow" and "off". `modules/r176.js` now takes Carpe Diem's own recipe whole: its two parts
(a tone that rises in a few thousandths of a second and dies away, and a grain of filtered noise), its granular wood clouds
over a low falling body, its key tap, its pace, its levels (0.55 by default), and its way out, straight to the speakers
(the room, the filters, the compressor and the placement left and right of 6.8.2 and 6.8.3 are gone, and their code with
them). Ingenium's voices are close relatives under Ingenium's own names: the welcome, First light, is Carpe Diem's four
rising notes at its pace, in A instead of C, with a fifth above the last (or Study lamp; Evensong); notices, Study chime
(or Hand bell; Ink drop); keeping, Seal mark (or Press click; Felt seal); pages, Page set (or Book shut; Lectern lift;
Stacks pass); keys, Key press (or Soft key; No sound); cards, Card lift (or Card chime; No sound). Measured against Carpe
Diem's module as it ships, each voice is as loud as its relative there (the welcome 0.0495 against 0.0486, the key press
0.0236 against 0.0236), and the welcome is over in about 1.3 seconds, as Carpe Diem's is. A sound or a default level kept
from an earlier version gives way to these; a level she chose stays.

    node rig/t_682_sounds.js <Ingenium url> <out>                     # 111 checks (6.8.5): each voice against its relative in Carpe Diem (loudness), brisk, in the middle, never at the limit; the keys, the cards, touching a key, Off
    xvfb-run -a python3 rig/t_682_sounds_wk.py <Ingenium url>         # Safari's engine (the iPhone and iPad): 22 checks

The Career Studio (6.8.3; her words: "I want Ingenium to gain the function and full capabilities to work like my own
Linkedin premium with its full functionality and ressources. I want it curated entirely to my in-app profile, resume, cover
letter and portfolio", "a reviewer/assistant/career counselor/recruitor/mentor all in one inside of Ingenium that will not
sugarcoat anything, that will not invent skills or experiences that I do not possess", "Tell me and I forget. Teach me and
I remember. Involve me and I learn.", "I don't want job postings generated or provided, instead, I want an area where I can
bring jobs, academic programmes, or grants, etc. that I am interested in applying to and help me analyse, review, curate,
rewrite, and track my applications"; and of its look, "I don't want to be endlessly scrolling on this new page").
`modules/r188.js`, its own page after Lector, in Lector's panels: the page never scrolls, only its panels do. Four rooms:

- Applications. A posting, a programme's call or a grant, pasted, from a file, or fetched from its address (only when she
  presses for it). Each in five numbered steps, one on the screen at a time: The posting; How you fit (first how it matches
  what she is looking for, then each criterion judged shown, partly shown or not shown with its evidence, and a band,
  Strong fit, Possible fit, A stretch or Not a fit as the profile stands, that follows from those judgements by a rule shown
  beside it: never a percentage; advice, the case for and against, next steps); What you send (a CV, a cover letter, a
  supporting statement, a personal statement, an outline for a research proposal and emails to a supervisor, a referee, a
  mentor, a hiring manager or a recruiter; each written from her profile and the posting, read a second time against her
  profile, set to British spelling, checked for figures her profile does not give, and shown on the paper it is saved on, as
  Word or PDF; or her own draft, looked at with her and never rewritten); Practise (her evidence for each criterion and her
  answers to interview questions, looked at with her; what she writes can be kept in her profile); Track (where it stands,
  the closing date and the days left, her notes).
- Your profile. What she is looking for; her name and contact line; what the studio may use, each switched on or off (her
  CV, the one Lector keeps; her LinkedIn export, the .zip LinkedIn sends; her documents, such as her proposal; Lector's
  readings of her apps; her writing and past letters, for her voice only; her sources in Fontes); her entries, kept up to
  date as she goes. Entries and skills can be found in her sources, each skill with its evidence and where it counts
  (academic, professional or both), for her to keep or drop. The profile is the only source of facts the studio uses.
- Goals and plan. Her goals with dated steps; steps suggested for a goal; the kinds of role and programme that suit her
  profile and what she is looking for, with why, what is missing and a first step (never postings).
- Learn. How each piece is built, one lesson at a time.

It writes with the model Lector uses, on this device (or her other computer's, over her own network). Lector's brief, asked
for a CV or a cover letter with no apps chosen, hands the posting to the studio, which writes them. The demo and the gift
editions leave it out, as they leave out Lector. In passing: a file's name keeps its words in a browser (a middle dot made
Chromium save it as "download"), and the short note at the foot of the screen no longer takes a tap meant for the key
beneath it on a phone.

    node rig/t_683_career.js <Ingenium url> <out> [phone]             # with a stand-in model: 48 checks (50 on a phone), the page never scrolling in 12 places

A quicker start (her words: "I want Ingenium and the Forge to be working efficiently with no bugs and have its performance
improved immensely as an app"). Measured first (`rig/t_perf.js`, and WebKit through `rig/wk.py`): the page is 74 MB, and 56
MB of it are carried for later (the library's Carpe Diem, the Forge and Inkwell, the engine, the picture reader, the kit
store, and the document typefaces, which were written inside the document engine's code). They sat between the page's
parts, so the browser read all of them before the page could be used; the code itself starts in well under a second.
`build/tail.py` now leaves each in its place as an empty block naming where it is, and carries it after the page's last
part; `ingFill` (and `ingTake`, for what cannot wait) takes it the first time it is wanted. The typefaces travel as a block
of their own (`r183.js` reads them on first use; Lector and the chat's files wait for them). Then each app stops reading
them at all: the computer apps serve the page without them and hand each over when asked
(`desktop/app_quick_681.py`, with the release's other desktop patches), and the phone and tablet apps carry them beside
the page as files of their own (the Fire repository's `tools/app_page.py`, used by its Android and iOS builds).

| what is read when the page opens | before | now |
| --- | --- | --- |
| the page in a browser | 74.3 MB | 74.3 MB, 13 MB of it before it is ready |
| the Mac and Windows apps | 18.1 MB | 13.1 MB |
| the Fire tablet, iPhone and iPad apps | 61.7 MB | 12.6 MB |

Measured on this build machine (no graphics card; a real device is faster, the ratios hold): Chromium, the page in a
browser, ready in 1.67 s rather than 2.23 s, its first paint at 136 ms rather than 244 ms, the loading page lifted at 2.1 s
rather than 2.6 s; WebKit (the iPhone and iPad's engine), the phone and tablet apps' page ready in 2.2 s rather than 4.4 s
and drawn in 3.3 s rather than 5.1 s. In a browser, WebKit draws nothing until it has read the whole page, so there the
page in a browser is drawn no sooner; the apps are where it counts.

    node rig/t_perf.js <url> [runs] [--profile out.cpuprofile]        # time to first paint, to ready, memory, long tasks, each room's opening
    node rig/t_681_tail.js <url>                                       # each block carried for later arrives whole when wanted, 9 checks

