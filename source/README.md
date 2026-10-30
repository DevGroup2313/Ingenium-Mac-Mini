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

