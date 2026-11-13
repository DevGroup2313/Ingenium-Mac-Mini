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

Ingenium 6.98 (13 November 2026): Vocatio's medallions, as the compass is made.
- Her words (12 November 2026): "I want the balls inside of the compass on the Career Studio to be refined and elevated to match the
  texture and look of the compass but I still want to be animated match the page and the rest of Ingenium." She approved the live preview
  (13 November 2026): "I approve of the medallion preview, please push it everywhere." modules/r290.js: each stage medallion is painted
  pixel by pixel through the case's own light (vcSilver, vcEnamel), as the case's rope and bezel are (vcMedalUrl): a milled silver edge of
  44 ribs, a polished bevel, a sunken groove, and a domed face of enamel over an engine-turned guilloche; its numeral (Cormorant, from a
  mask) raised in polished silver on violet or inlaid in violet on pearl, with a fine engraved edge; the stage in hand ringed in a fine
  silver wire, all at the medallions' original size (her word, 13 November 2026: "I want the size of the little balls inside of Vocatio's
  compass to be remain smaller in their original sizes, they look really odd bigger"): the design is drawn in its own units and scaled so
  its silver edge ends where 6.96's rim did, 12.27 px from the centre of its 32 px box. Violet for a stage done and the one in hand, pearl
  for one ahead, as before. A glint crosses each dome in turn (7 seconds on
  the stage in hand, Home's engine button's clock; 14 on the others; 2.2 under the pointer); Minimal motion and reduced motion hold it.
  The night paints them again in the night's metal. The flat drawing (vcMedal) stays in the module, unused.
- As on the preview, the medallion under the pointer lifts, its glint quickens, its stage's name shows and it sounds; pressed, it sinks
  and sounds. The compass's 3D layers hide the medallions from the pointer (a hit test at a medallion's centre finds the compass), so
  the compass finds the medallion from its own geometry (vcPick) and marks it (.md-over, .md-down: vcMdOver, vcMdDown); when the pointer
  does reach a medallion, its own :hover and the key sounds do the same.
- The Guide's 6.97 news is now two lines, so the editions without Fabrica do not name it (t_627_editions caught it on 6.97's editions,
  which were not committed: 6.98's take their place).
Tests: `node rig/t_698_medallions.js <page url> <out>` (29, by day and by night, the size among them).

Ingenium 6.97 (13 November 2026): the heads' keys never move the page.
- Her word (6.95): "please remove the scrolling down the page effect from it and everywhere else. I dislike it." 6.95 stilled r290's keys
  (Vocatio, Lector, Focus); 6.96 had kept one in Fabrica's own header and four other pages still moved. Measured on 6.96 at 1440 by 900:
  a version pressed on Fabrica's tree (619 px), Folders' "A folder for another app" (252 px), "Bring in your work" (980 px) and a folder
  pressed in the drawer, a wheel pressed on Blend, and the Models turret's "Get one of Ingenium's models" (605 px). Each now acts where it
  stands and the page stays: modules/r294.js (the tree; its hint says the comparison opens in the panels below), r263.js (Folders),
  r262.js (Blend) and r269.js (the turret's keys and lenses). When what a key opens is out of the window, a short line (ingToast) says
  where it is: at 1440 by 900 only "Bring in your work" needs it, its card being at the foot of the page; on a smaller window
  others may. Keys inside the content (a row's Load key, the
  build library's book) and the links that take her to another page keep their own movement; they are not the heads'.
Tests: `node rig/t_697_still.js <page url> <out>` (8: each of these, and every key in the heads of eight pages; it fails on 6.96 in six);
`node rig/t_696_fabrica_head.js <page url> <out>` (18: a version pressed does not move the page, which fails on 6.96; with an app open,
the hint says the comparison opens in the panels below).

Ingenium 6.96 (13 November 2026): Lector's sealed dossier, and Fabrica's header.
- Lector. Her words: "The Lector header looks bad on the latest build and I need it properly refined and deepened. I want it redesigned to
  match this look instead but remove the black dot/shadow that shows up behind the wax seal on the header", with the page of the other
  chat's unshipped work (Lector_Sealed_Dossier.html: 6.95's r290 and the work it marked 6.96). modules/r290.js is that version: the sheets
  drawn as the seal is drawn (one canvas each, the paper, its tab and its printing, under the seal's light); two loose sheets behind the
  three; the bow gone at her word ("Please remove the bow, I hate it and it cheapens the look of the design"); a band round the dossier in
  front, with the seal at its heart and the ribbon's two tails under it; the stack and its seal swaying as one piece on Home's engine
  button's clock (7 seconds; her words: "right now they just pasted in together but not really connected or in unison"). Every line 6.95
  added to r290 is in it (checked line by line), and only r290 and r176 differed from 6.95's page (6.95's r176 is the newer one, kept). The
  dark dot: the seal's cast shadow, a disc of near black by night (rgba 0,0,0,.72) softened only by a CSS blur inside the seal's 3D frame;
  where a web view draws that blur badly a hard dark dot stands behind the wax. The seal casts none on the paper now (#page-lector .lf-seal
  .lxs-cast); its lit edge and side wall stand it off the sheet. rig/t_694_lector.js follows: the seal sways with the stack, its own sway
  stilled, and no shadow behind it (23 checks).
- Fabrica. Her words: "I also want the Fabrica page to get the same makeover as the others. I want everything inside of the 3 panel view
  look but I think that it is missing its header card with the nice 3D animation", then "I also want you to commit and push the Fabrica
  redesign please." modules/r294.js builds Fabrica's header with r290's shared kit (IngStudios.kit: the same slab on Blend's desk, eyebrow,
  title, keys, line, hint and label; r290's colour tokens now name #page-fabrica.sk-on too), the four steps under it as Lector's are
  (Change, Keep, Test, Ship, as Fabrica's own steps stand), and its three panels below at the window's height. Its instrument: the open
  app's versions as a tree on a plinth of spun metal, drawn on one canvas as the turret is (main's first parents the trunk, each version a
  bead of violet glass, the newest with Ingenium's star; each idea open a branch from where it parted; each idea brought in an arch back to
  its merge; each release a collar with its name; a change not kept a bead not yet set above the newest). It turns once in 52 seconds,
  stills under the pointer, turns under a drag; a version under the pointer says its words and, pressed, opens what it changed (Compare).
  Its keys do not scroll the page (as r290's do not, at her word in 6.95), and a sheet Fabrica opens (New app, Bring one in and the
  others) now stands in the window, wherever the page is scrolled. Out of view the tree rests; Minimal motion holds it. (r286 and r287 were
  used and removed in the other chat; this takes the next free number.)
Tests: `node rig/t_694_lector.js <page url> <out>` (23); `node rig/t_696_fabrica_head.js <page url> <out>` (15).

Ingenium 6.95 (13 November 2026, from the other chat's commits, which wrote no note here): Vocatio. The Career Studio renamed at the
owner's word in every word on screen (the menu, the page's title, the tour, help, the Guide, Settings, Lector's keys, the exports); the
page's id, its data and the code keep "career", and the search still finds it by its old name. Its compass rides (r293 out of
build/held.json): the raised compass she chose, with Ingenium's Orrery engraved on its white dial, carried into r290. r290's keys no longer
scroll the page; r176 sounds the compass's stage medallions (.skv-md); editions.py names Vocatio. rig/t_693_studios.js 43/43.

Ingenium 6.94 (13 November 2026): Lector's head released, with its wax seal. modules/r290.js rides: Lector opens on the fan of its documents
she approved, and at its foot the engine logo pressed in wax, as she approved it on its live preview that day ("I approve of the was seal
design for Lector, please push it everywhere"). The seal is a real vintage stamp, drawn and lit pixel by pixel: a poured, uneven edge, a
satin grain with the odd bubble, INGENIUM raised round the top and the day's date in Latin round the foot (from the device's clock; it
turns at midnight), the logo's faceted violet star and its pearl. White wax by day; by night the engine button's own night (deep
violet-black wax, lavender lettering). It moves as Home's engine button does: it sways, leans and lifts under a mouse, sinks when
pressed, and each press plays one of Home's flourishes with Home's click; at rest its pearl beats with Home's heartbeat. The Career
Studio's compass, drawn by the same module, is held: modules/r293.js turns it on and waits in build/held.json for her choice, so the
Career Studio reads as in 6.93.

    node rig/t_694_lector.js <Ingenium page url> <out dir>   # Lector's head and its seal, by day, by night and on a phone

Ingenium 6.93 (13 November 2026): the Models page opening on its turret every time, Home's orbs matched to the seal, and Your
counsellor released. The heads of the Career Studio and Lector (modules/r290.js) are written and tested but held (build/held.json) for her
answer to their next preview: her words that day, "I want to see metal, and not a fake plastic somewhat 3D look. I want a beautiful 3D
metal and vintage design that has a sleek elegant look", and of Lector, "I want the seal logo button to match Inkwell's seal logo 3D look
and animation". What they are, as written:
- The heads (modules/r290.js, held). Her words (12 November 2026): "I want to redesign the Focus, Lector page and the Career Studio to match the
  rest of the app ... but I do like their 3 panel views so I want that preserved"; "I want regal and elevated to match these pages ...
  refined, elevated and elegant while being 3D ... theme related without being on the nose"; "I like and approve of all of the
  previews, please commit and push them everywhere"; and after 6.92, "push my approved design of the Career Studio and the Lector". Each
  page opens on a head measured from Blend's (modules/r262.js): its desk, its words, two raised keys, an italic hint, and the page's own
  object on Blend's stage. The panels below are kept as they were (the Career Studio's two, Lector's three), as tall as the window.
  - The Career Studio: a dial. Blend's frosted plate (its renderer copied) with the seal's star engraved as its rose; a turned bezel
    drawn with Blend's light; the counsellor's five stages set into the bezel as the hub is set (Blend's setting: a polished lip of the
    bezel's own metal round violet enamel), flat and still, each with its numeral in pearl (her words on the first stages: "I want the
    balls to just be flat and there with no animation"; on the lenses tried next: "still look ugly ... fake and pasted on the page"); the
    path walked inlaid in violet; an index cut as one point of the seal's star; the seal at the hub turning as Home's engine turns. The
    bezel turns with a spring to bring the stage in hand under the index; pressing a stage opens it.
  - Lector: the fan she approved (drawn in another session from her pictures, modules/r287.js on claude/relaxed-hopper-nz4ert), carried
    as it was: grained sheets standing on their leaves, tabs, initials, titles, lines and numerals, the one shown in front with its
    ribbon. It sways as one piece and leans toward the pointer. At its foot, Ingenium's own seal key (R104's layers, R175's flourishes,
    r176's sound): it sways, leans, lifts, sinks, knocks, ripples and plays Home's flourishes, and opens nothing (her words: "I just
    want to use it as a fidget button on the page for my amusement"). A wax seal tried first was dark and is gone ("The seal is way too
    dark"; "you've massively regressed it from my approved design").
- The Models page (modules/r269.js). Her words: "the Models page always reverts back to its previosu design everytime I open the page".
  Measured on 6.92 (rig/t_693_models_open.js): the turret was built only when the page was first shown, a frame after its width changed,
  so the former head was painted first. Now it is built as Ingenium starts and laid out in the very frame the page opens.
- Home's orbs (modules/r261.js). Her words: "I also want the orbs from the Home page to be refined and have the whole graphics of the orbs
  pages and the engine logo button be better matched design and animation-wise ... please do not change the design". Each orb now wears
  the seal's polished rim, a highlight lit as the seal's face is that follows the pointer, a surface fading to the edge, and the seal's
  pearl on its mark. Its picture keeps the six parts 6.72's r264 turns, so each planet still turns under its light.
- Your counsellor (modules/r283.js), held since 6.90 for her answer, rides on its own; the dial, when it rides, turns through its stages.
  editions.py keeps r283 and r290 out of the editions without Lector.
- The keys of the heads lift, sink and sound as every key does (modules/r176.js). Tested: rig/t_693_models_open.js on the release page;
  rig/t_693_studios.js (49 of 49) on a test build, which keeps the held heads.

Ingenium 6.92 (12 November 2026): Fabrica resolves on the drive a merge whose two ideas changed the same lines. 6.87 refused it ("Fabrica
does not resolve that on the drive yet"); her list carried it from the 6.89 handoff. modules/r280.js and desktop/app_merge_692.py, with r141:
- Bringing an idea in (Ideas, or a pull request's merge) into a working copy on the drive: Fabrica's three-way merge (r110, as for an app
  kept in Ingenium) is left in the folder as git leaves one. The file both ideas changed holds both versions between git's own marks;
  the rest is as the merge made it; git's index marks the file with its three versions and stages the others; MERGE_HEAD, ORIG_HEAD and
  MERGE_MSG are written (a squash writes no MERGE_HEAD, as git merge --squash). So git status, git add, git commit and git merge --abort
  work on it as after git's own merge. Fabrica's work says Bringing in “idea”: both versions are in 1 file, with Stop the merge.
- Keep this version is refused while a file still holds both versions (named). Resolved in Fabrica or any program, the version has both
  parents (dulwich 0.22.8 reads MERGE_HEAD); a pull request whose versions are now all in is marked merged. Stop the merge puts every
  file back as the version before held it, what they held first kept in .git/ingenium-put-back/<time>/.
- A merge git itself left in the folder (its index marked, which dulwich 0.22.8's status could not read: such a folder read as "could not
  be read" before) is read, shown with the idea's name from MERGE_MSG, kept or stopped the same way.
- A bare repository says to make a working copy and bring the idea in there.
- Two faults found on the way, both since 6.87: a version kept on the drive skipped the hub's step after a version is kept (a pull
  request was marked merged only when Pull requests was opened again; "fixes #3" in its words closed nothing): it now takes it (r141
  fbHub.kept); and a merge in which both ideas changed a file over 48 MB (never brought into the page) could merge Fabrica's own words for
  that file and write them to the drive in its place. Nothing that holds those words is ever written to the drive now; Fabrica says
  why, and changes nothing.
Tests: `python3 -I rig/t_692_drive_merge.py <Mac ingenium_app.py> <Windows ingenium_app.py>` (28 checks, against git);
`node rig/t_692_fabrica_merge.js <app folder> <out>` (14 checks, the page over the app's own back end).

Ingenium 6.91 (12 November 2026): Fabrica holds main to her rules, reads every version for what should not be in it, and says what
changed while she was away. Her words, on preview version 4 of phase 2 (https://claude.ai/artifact/VNwsz2ywj3XkXaCq8gws1o, with the pieces
of commit 9287840): "I approve of the preview, please push it everywhere." modules/r285.js, with hooks in r112 and r141:
- Rules before main, in Care, Settings: Only through a pull request (no version kept, undone or merged straight into main), Your review
  first (main waits for an approval), The checks pass first (Fabrica's checks, passed on the pull request's newest version), Kept
  versions stay as they are (main is never moved back or taken away; it may move forward, as GitHub's versions come). Each is off until
  she turns it on, and is kept with the repository. Fabrica holds to them on this computer: a refusal says why in plain words, and a pull
  request's merge box says what main still waits for, its key held until then. A program other than Fabrica is not held, and the box
  says so. Main is the one GitHub named, else main, else master (r141's defBranch now prefers master to the first idea), else the first.
- Safety, on every version, in Care, Checks: secrets of a known form (cloud, GitHub, Slack, Google, Stripe, Anthropic, OpenAI and Hugging
  Face keys and tokens, private key blocks, and passwords or keys in an environment file, its example files aside) in every text file
  each of the 100 newest versions changed, read once each, a version taken away still counted (it stays in the history); never shown
  whole. The parts made by others it keeps, each licence read from its notice or named in its header (or said to be unnamed), its own
  licence, and the parts its manifests name (their licences are not in the repository, and it says so). Its large files. Read on this
  computer with nothing sent anywhere; kept with the version it read, and read again on asking.
- What changed while she was away: a raised row above Your apps (the preview's), with its list in Ingenium's own look: new versions on
  an idea, a new idea, a new release, and an issue or pull request someone else opened or wrote in. What she does in Fabrica herself is
  followed and never counted. A choice opens it (the versions as a comparison from the one she last saw) and marks all as read.
- desktop/app_refs_691.py (Mac and Windows): the drive's branches and tags are given sorted, so every start shows them in one order.
Test: `node rig/t_691_rules.js <page url> <out>` (36 checks).

Ingenium 6.90 (12 November 2026): two keys that answered late, and the Career Studio as she answered its questionnaire.
- Settings, Help and the guided tour. Her words: "when I press on the card buttons, the reaction is delayed, it took a while for the
  "New to this" button to look pressed after I clicked on it". Measured on 6.89 (rig/t_690_press.js): the press saved the whole of
  Ingenium's state before the card was marked, so the card could not be drawn pressed until the save ended: under 1 ms with an empty
  state, about 170 ms with 18 MB of conversations. Theme, Motion and Sounds (modules/r278.js) waited the same way. Now each is marked
  at once and drawn; the save, and what follows from it, comes in the next frame (modules/r144.js setLevel and afterPaint; r278).
- Home's next step. Her words: "Sometimes the Bring in your model and take the guided tour buttons from the Home page revert back to a
  wider and chunkier look instead of their new designs", and "The button changes when the LFM model is loaded or pompted to be loaded."
  Measured (rig/t_690_homekeys.js): the keys keep one size at every width; the base page writes the step's words into the key
  (renderNextStep), so "Load <model> into the engine" and "Talk to <model>" made it wider than "Bring in your first model", and a long
  model name wrapped it onto two lines on a phone (51 pixels tall). Now the key says Load your model or Start a chat, the model's name
  moves into the line above, the full words stay for a screen reader and under the pointer, and both keys are 34 pixels tall
  (modules/r261.js, shortNext).
- The Career Studio (modules/r188.js), from her answers to the questionnaire of 12 November 2026: the studio opens on Today; it speaks
  frankly, as a good recruiter would, and says when a plan or a document is weak (a choice kept in the profile, prefs.tone: frank, warm
  or measured; sys() adds it to every ask); Paths that fit come as a recommendation with its reason, and one alternative; when the
  model is a connected service that sends what it reads away (lxCloudLeaves), the profile and documents sent leave out email addresses,
  telephone numbers, the contact line, the referees (their entries and a CV's Referees section) and pay figures (leaves, noContact,
  noPay, cvNoRefs); a model on this device or in her home reads everything, as before; From your apps has Copy as CV bullets.
- Held for her answer to its preview (build/held.json): modules/r283.js, Your counsellor, one path of five stages in the Career Studio's
  own faces (what you have, all at once and sorted, a zip of documents and a profile file included; your record, each entry found shown
  to keep or drop, with Keep all the rest; what you want, by chips, with two aims; where you could go, in one run; this week, three
  things with their minutes), Today's whole picture and what changed while she was away, Suggestions beside the document in Lector,
  and a second profile as a copy of hers or someone else's. The preview kit is source/previews/counsel (README there).
- Tests: rig/t_690_press.js 7/7 (4 of its checks fail on 6.89, as they should), rig/t_690_homekeys.js 13/13 (9 fail on 6.89),
  rig/t_690_guard.js 9/9, rig/t_690_counsel.js 33/33 on the test build (it needs r283). rig/inject_modules.js puts changed modules into
  a built test page.

    node rig/t_690_press.js <url> <out>       # the Help cards, Theme and Sounds marked as the click returns, with a heavy state
    node rig/t_690_homekeys.js <url> <out>    # the next step's key through each step, at 1440 and 390
    node rig/t_690_guard.js <url> <out>       # what a connected model is sent; the voice, the paths, CV bullets, Today first
    node rig/t_690_counsel.js <url> <out>     # Your counsellor (a test build: r283 is held)

Ingenium 6.89 (12 November 2026): Fabrica, phase 2, second stage, its third part: people and milestones, a comment on any line, and
templates. Her words, on the preview of this stage (https://claude.ai/artifact/VNwsz2ywj3XkXaCq8gws1o, version 4, which holds the pieces
commit 9287840 added): "I approve of the preview, please push it everywhere." Next in that preview: Rules before main, Safety on every
version, and what changed while she was away.
- modules/r282.js (new, IngPlans): under an issue's or a pull request's first line, the chips People and Milestone, each opening
  Ingenium's own list (r280's, r172's look): the people known in the repository (the author's name, those given issues, those from
  GitHub), Someone else, No one; the milestones with their day and how many of their issues and pull requests are done, A new milestone
  (a name and a day), No milestone. Kept in the record (item.people, item.milestone, rec.milestones, rec.people), said in the
  conversation ("Given to Theo", "Added to the milestone v3.3") and in the lists. In a pull request's Files changed, each line of the
  changes has a + key (drawn by the style, so a line's text stays the code; shown under the pointer and always on a touch screen): a
  comment on that line (p.lines: path, side, line, words, who, when, replies, resolved), its thread under the line with Reply and
  Resolve (a resolved thread folds to its first line), a thread on a line that changed since shown above the file; Viewed folds a file
  away until its git name changes (p.viewed). A new issue or pull request offers the repository's templates at its newest version
  (.github/ISSUE_TEMPLATE/*.md, ISSUE_TEMPLATE.md, PULL_REQUEST_TEMPLATE.md in .github/, docs/ or the top, any case; GitHub's front
  matter name, about, title and labels): one press fills its title, words and labels, a template with words of her own in place asks
  first in Ingenium's own words, and a single pull request template fills a new pull request at once, as GitHub does.
- modules/r141.js: fbHub.live, keep and repaint for r282; its hooks in an issue and a pull request, in Files changed, in the two new
  forms, in the conversation and in the lists. modules/r276.js: a repository brought from GitHub keeps each issue's people (assignees)
  and milestone, the milestones with their days, and the comments made on lines with their replies (review comments). modules/r176.js:
  the chips, the + keys and the template chips lift, sink and sound. modules/r222.js: the news (Fabrica's editions only).
- Tests: rig/t_689_plans.js 22/22 on a test build (an invented app, Quill, and invented people); t_61_hub 90/90 (it found the + key's
  text in each line at first: the + is drawn by the style since), t_661_fabrica 21/21, t_680_old_webview 12/12.

    node rig/t_689_plans.js <page url> <out folder>

Ingenium 6.88 (12 November 2026): Fabrica, phase 2, second stage, its second part. A second copy on another drive, checked by fingerprint,
and Find by what it means. Her words, on the preview of this stage (https://claude.ai/artifact/VNwsz2ywj3XkXaCq8gws1o, version 4; its kit
in source/previews/fabrica_p2): "I approve of the preview, please push it everywhere." 6.87 built its first part (working on the drive);
next come the other chat's pieces of the preview (what changed while she was away, people and milestones, comments on a line, Rules before
main, Safety on every version).
- desktop/app_copy_688.py (new; after app_disk2_687.py in release.py's DESKTOP list): copy_places (this computer and each drive, as
  phase 1 lists them, with the room left), copy_choose (the folder dialog), copy_list, copy_plan(rid, folder, when, label), copy_now,
  copy_check, copy_forget. The copy is a bare repository, <folder>/Ingenium copies/<name>.git (ingenium-copy.json says whose): the
  branches and tags are read first; every pack (its index last) and loose object is copied as it is, each under a temporary name and
  renamed when whole, so only what is new travels the next time; then each branch and tag is set, and HEAD. A branch taken away from the
  repository stays in the copy under refs/ingenium-kept/<time>/; objects borrowed through git's alternates are copied too, so the copy
  stands alone. The check: every branch and tag as copied, every object of the repository present, each pack against its own SHA-1
  (the checksum git writes at its end) and its index's, each loose object against its name; what it finds faulty is taken out and copied
  again next time. One job at a time, in a background thread; a scheduler looks a minute after the first call and every half hour: every
  day means a day since the last check, every Sunday means not checked since the last Sunday began (a Sunday missed is made up at the
  next start); a drive not connected is waited for. Also a fix for 6.86 and 6.87, found while testing: Fabrica holds each repository open,
  and dulwich 0.22.8 reads packed-refs once and keeps it (its own note: "TODO: invalidate the cache on repacking"), so after git gc or
  git pack-refs in another program a branch taken away still showed, or branches git had packed could vanish from Fabrica; the file is
  now read again whenever it changes (its inode, time and size).
- modules/r281.js (new): A second copy in the Ingenium part of Test and ship, as the preview drew it: "Every version, idea and tag, kept
  whole on another drive, and checked against this one by fingerprint"; the drive in Ingenium's own list (r280's, r172's look) with
  Choose another folder; Every day, Every Sunday, By hand; Make the copy now, then Check it now (brings it up to date, then checks); the
  line under it says how far the copy is while it runs, then "Copied and checked just now: every version matches, by fingerprint. Next
  check: ..." or what is wrong; Stop keeping a copy (the copy stays on its drive). The card's line says where the copy is and when it is
  checked. A repository kept in Ingenium itself is told plainly that a second copy is for one on the drive. Find has By its words (6.86)
  and By what it means: the folder search's own engine on this computer (rag/, bge-small, through IngRag.ready and its embedder) reads
  each text file of every repository once (passages of up to 1,100 characters, never cut inside a line, each with its path; at most 4,000
  files a repository, files over 384 KB, vendored folders and lock files left out) and keeps only the numbers and the lines they cover,
  by the file's git name and the model (IndexedDB "ingenium_meaning", named in Storage), so a file is read once in any repository or
  version; a search lists the passages nearest in meaning (within 0.1 of the best, at most twelve), each opening in Code at its line, and
  says how much is read; the reading goes on while Ingenium is open, a pause when the window is hidden, with Stop reading.
- modules/r280.js: the hooks (the copy card's line and view, the find's choice), IngDisk.openList for r281. modules/r141.js:
  fbHub.open("code", {file, line}). modules/r142.js: Storage names the new store. modules/r176.js: the drive chip, the times and the
  find's choice lift, sink and sound. modules/r117.js: the tour's Fabrica card says what Fabrica does now. modules/r222.js: the news.
- Tests: rig/t_688_copy.py 30/30 (the engine, against repositories git made: a working copy, a bare one, one with alternates; git's own
  fsck on every copy; a byte changed and the packs removed, found and put right; gc followed; the schedule read in local time; a branch
  taken away in another program after git packed the refs, gone at once); with it applied, t_686_disk_engine.py 33/33 and
  t_687_disk_write.py 41/41. rig/t_688_fabrica.js 20/20 on a test build with the computer app's back end and the folder search's real
  files (rag-vendor.zip, its fingerprint 57db28f7... checked): for "where night mode is chosen", app/palette.js, which shares none of
  those words, came first (0.506; the other files 0.31 to 0.36) and the words search found nothing. t_686_fabrica.js 36/36 (two checks
  follow 6.88: A second copy opens its view; Find is set to By its words before searching by words), t_687_fabrica.js 17/17,
  t_680_old_webview 12/12.

    python3 -I rig/t_688_copy.py <Mac ingenium_app.py> <Windows ingenium_app.py>
    node rig/t_688_fabrica.js <app folder: patched ingenium_app.py and ingenium.html> <rag vendor folder, or ""> <out folder>

Ingenium 6.87 (12 November 2026): Fabrica, phase 2, second stage. Working on the repositories on this computer, right on their drive.
Her words, on the preview of this stage (https://claude.ai/artifact/VNwsz2ywj3XkXaCq8gws1o, version 4; its kit in source/previews/fabrica_p2):
"I approve of the preview, please push it everywhere." This stage is the first of three: working on the drive (6.87); a second copy on
another drive and Find by what it means come next; then the other chat's pieces of the preview (what changed while she was away, people
and milestones, comments on a line, Rules before main, Safety on every version).
- desktop/app_disk2_687.py (new; after app_disk_686.py in release.py's DESKTOP list): for a working copy, disk_repo gives the folder as
  it is (git's own status, with .gitignore; each changed file's git name read from the file, cached by its size and time), and disk_objs
  and disk_sizes serve a changed file by its git name (read again and checked). disk_commit keeps every change of the folder as one
  version (staged as git add would, deletions too; never a submodule), with the repository's own name and address from git's settings,
  else the name Fabrica uses. disk_put_back restores files from the version kept, after saving what they held in
  .git/ingenium-put-back/<time>/ (a new file is moved there). disk_write_file, disk_remove_file (moved aside) and disk_move_file change
  the folder, never outside it, never inside .git, never from a path given from the root. disk_write takes what the page made (objects
  checked against their git names; each branch or tag moved only if it is where Fabrica read it, with dulwich's compare and swap); the
  branch worked on, or another one switched to, moves the folder with it only when nothing in it waits to be kept and no new file of
  hers stands where the other version puts one (a file .gitignore names is moved aside first): files the new version no longer holds
  are taken away, then git's index and files are built from it. disk_working_copy clones a bare repository into a folder she chooses and
  lists it. Found and fixed while testing, before release: dulwich 0.22.8's checkout_branch moves to another branch over a change not
  kept and leaves the file half switched (so Fabrica checks first, and refuses); its hard reset leaves files the new version deleted (so
  Fabrica takes them away itself); removing a branch with a log message fails inside dulwich (so a removed branch's log is not written,
  as git drops it anyway); a submodule whose folder is absent showed as removed, and Keep would have deleted it from the repository (so
  submodules are left out of staging and of the checks).
- modules/r280.js: Fabrica's writes on a repository on the drive. A working copy's folder is its work: a file saved, taken away or moved
  in Fabrica goes to the folder; Keep this version, Put it back and a file restored go through the calls above. Ideas, tags (annotated,
  with their notes), merges, squashes, rebases and versions undone are made by IngRepo as for any repository (the record is its own to
  change while it writes) and written on the drive: its new objects (those kept in the page, from each moved ref back to what the drive
  holds), and each ref's move. A merge's step between its joined files and its version is held in memory: only the version reaches the
  drive; a merge whose ideas changed the same lines is refused, saying so (resolving that on the drive comes later). The repository open
  is read again from its folder every time, so a change made a moment ago in another program shows at once. A bare repository takes ideas,
  tags and merges; its files change through a working copy (Make a working copy, on its drive line). The drive line says "kept on the
  drive as you work"; a drive tile shows Fabrica's own line (2 to keep, Kept · to test), as any app's.
- modules/r222.js: the news (Fabrica's line, where Fabrica is).
- Tests: rig/t_687_disk_write.py 41/41 (every write checked by git itself: status, log, fsck, branches, tags, the folder following, the
  refusals, a submodule, a bare repository and its working copy); rig/t_687_fabrica.js 17/17 and rig/t_686_fabrica.js 36/36 (updated
  for this stage) on a test build with the computer app's back end, and again on the release page. On the release page: t_61_hub 90/90,
  t_685_folders 37/37, t_62_tour 34/34, t_651_still_keys 25/25 (run alone), t_666_fabrica 23/23, t_661_fabrica 21/21, t_684_settings
  20/20, t_683_hub 17/17, t_680_old_webview 12/12; t_687_disk_write.py 41/41 with the released Mac and Windows apps. t_67_sound fails 8
  of its 14 checks, as on the 6.85 and 6.86 release pages (its expectations predate the sound settings she chose). The calls this stage
  makes into dulwich (porcelain's status, reset_file and clone; stage; do_commit; validate_path) were run inside a bundle frozen as the
  apps are (PyInstaller 6.22.3 and dulwich 0.22.8, as the workflows install them, with the specs' hidden imports), on Linux: PyInstaller
  packs dulwich.porcelain and what it needs although no spec names it. The Mac and Windows builds themselves were not run here.
  Editions: t_627_editions 20/20 (master, full, gift, demo). t_626_guide fails one check (every topic in its room), word for word as
  on the 6.86 release page.

    python3 -I rig/t_687_disk_write.py <Mac ingenium_app.py> <Windows ingenium_app.py>
    node rig/t_687_fabrica.js <app folder: patched ingenium_app.py and ingenium.html> <out folder>

Ingenium 6.86 (12 November 2026): Fabrica, phase 2. Every repository on her computer opens in Fabrica straight from its drive, at any size;
and Ingenium beside her in Test and ship. Her words (12 November 2026): "Please continue working on my requests and deepening and enhancing
Fabrica and making it my own offline GitHub. I want full and complete parity with GitHub but I want you to go above and beyond that and
really enhance it and Ingenium as a whole. Also by "filtered", I meant both options." On the preview drawn from Fabrica itself
(source/previews/fabrica_p2): "Please fix the formatting issues and also redesign the long wide buttons from the "Test and ship" section.
Please make the fixes and then push this preview everywhere, I approve of the design." Then: "I approve, please push it everywhere."
- desktop/app_disk_686.py (new; release.py patches the Mac and Windows apps): disk_list, disk_add, disk_choose, disk_forget, disk_repo,
  disk_objs, disk_part and disk_sizes, read with dulwich (0.22.8, as 6.83). The repositories she adds (any folder that holds a git
  repository, a working copy or a bare one, on any drive) are kept in disk_repos.json in the app's own folder; every repository brought
  from GitHub (6.83) is listed too. A record is its refs, its HEAD and the files at HEAD (a submodule named, not held); a file's size is
  read from its object's header only (in a pack, or a loose object's first bytes), so no file is read whole to be listed; objects come in
  batches, with the history before a version and a tree's folders in the same answer; one over 8 MB comes in parts; one over 48 MB stays
  whole on the drive and is opened from there. Read only: nothing on the drive is written. A drive that is not connected is said to be away.
- modules/r280.js (new): IngRepo's store asks the computer app for a repository whose id begins "disk:", and IndexedDB for the rest. An
  object read from the drive is lent, marked away: the store never counts it as kept, so an app kept in Ingenium keeps its own copy of
  the same file (modules/r110.js: Store.has, put and depth ask the device's own store only). What would write on the drive (a commit,
  an idea, a tag, a merge, a file) is refused in plain words; another branch, a tag or a version can be shown, and notes are kept beside
  it in Ingenium. Your apps: On this computer (the drive, the room left on it, no size limit) and Kept in Ingenium; each drive tile says
  its size; Add one from this computer. Under the work's header: From <drive> · <size>, every version · no size limit · read only for
  now. The branch key opens Ingenium's own list (r172's look): Branches, Tags, All the ideas. Test and ship has a fourth part, Ingenium,
  its keys cards as the ship cards are, two to a row: Explain, Review, Release notes and A message (through window.lxAsk with the model
  chosen in Lector, as modules/r208.js asks it; where the model runs is said: on this computer and nothing is sent, online, or on another
  of her devices); Find in every repository (by their words; at most 6,000 files and 48 MB read in one search, and what was not read is
  said); Any version, live (a version opened as the app in its own window); A second copy (said plainly: it comes in the next stage);
  Its folder (in Folders). A pull request has Ask Ingenium to review it beside Ask for changes. A repository brought from GitHub has its
  issues and pull requests attached once from their records on the drive.
- modules/r110.js: merge(id, other, {squash}) makes one version with one parent; rebase(id, other) makes each version of the other idea
  again on top, keeping its author and date, and writes nothing if one meets a change on the same lines; files() asks the drive for
  sizes in one answer; the history names the version an annotated tag points to (before, only a tag naming the version itself showed).
- modules/r141.js: a pull request is brought in by Merge, Squash and merge or Rebase and merge (Fabrica's own segmented row).
- modules/r112.js: the work's header wraps onto a second row instead of cutting the app's name and branch (her Mac's wider fonts cut
  them); the dialog for a repository on the drive says Forget, not Remove: nothing on the drive is touched.
- modules/r279.js, r176.js: in Folders, the label between the drawer's pulls is a key: only the folders not read yet (state.folders.ui.filter).
- modules/r276.js (its note now points to On this computer), r176.js (the new keys sound), r222.js (the news), the specs (dulwich.object_store
  and dulwich.index inside the apps).
- Tests: rig/t_686_disk_engine.py 33/33 (the computer app's own functions against repositories git made), rig/t_686_repo_unit.js 10/10
  (squash, rebase and lent objects, with no page), rig/t_686_fabrica.js 36/36 (the release page with the computer app's back end,
  rig/run_app.py). On the release page: t_61_hub 90/90, t_685_folders 37/37, t_62_tour 34/34, t_651_still_keys 25/25 (run alone),
  t_666_fabrica 23/23, t_661_fabrica 21/21, t_684_settings 20/20, t_683_hub 17/17, t_680_old_webview 12/12. t_666's two Offline Project
  checks pass only on a release page (a test build carries no demo edition, and the page says so). t_67_sound fails 8 of its 14 checks
  on the 6.85 release page too: its expectations predate the sound settings she chose later. Editions: t_627_editions 20/20 (master,
  full, gift, demo) once the 6.86 line in What is new was split (Fabrica's line is marked "fabrica", as 6.83's, so the gift and demo
  editions, which have no Fabrica, do not name it). t_626_guide fails one check (every topic in its room) the same way on 6.85.

    python3 -I rig/t_686_disk_engine.py <Mac ingenium_app.py> <Windows ingenium_app.py>
    node rig/t_686_repo_unit.js
    node rig/t_686_fabrica.js <app folder: patched ingenium_app.py and ingenium.html> <out folder>

Ingenium 6.85 (12 November 2026): Folders' drawer pulls find and order, Your apps' logos move as Lector's, and any app can wear its own
logo. Her words (12 November 2026): "I want the apps seals on the "your apps" section to be animated and interactive and clickable, I like
the effect. I also want the 3D folders for the apps at the top of the page to be able to filtered, and reorderd by alphabetical order, and
date but do no change the existing page design, just build it in as part of the 3D drawer. I want the Folders page to read and accept any
app icon/logo and not be limited my apps." On the live preview (source/previews/folders/folders_683_template.html): "The animation of the
apps logos on the "Your apps" section is really weird and not what I asked for. I want you to replicate the same animations from the
Lector page for these the apps logos on the "Your apps" section, please push this everywhere. I approve pf the preview with those changes."
- modules/r279.js (new): the drawer's two pulls are keys in the drawer's own grooves (120 by 20, as before): the left finds a folder as she
  types, by its name or its parts (Escape clears it); the right turns through Used last, A to Z, Z to A, Newest and Oldest (Shift turns
  back), kept in state.folders.ui.order. A folder's date is its app.made, else the moment in its id, else its first conversation. Your
  apps: each card's logo is Lector's layered seal with Lector's measures (modules/r107.js .ls): LX7_LAYERS by day and by night, the 7 s
  sway, the turn toward the pointer, the lift and the sink; the Offline Project its live crest with its quarters moving, as on Lector;
  any other app its own logo, or a quiet disc, in the same motion. An opened folder takes any app's logo: a picture (PNG, JPEG, WebP, GIF,
  SVG, ICO, AVIF), a Mac app's .icns (its PNG of 256 pixels or more) or the app's own page, chosen or dropped on its logo; each is drawn
  once on a canvas of at most 256 pixels, so a picture that cannot be read is refused; Its own logo again gives back the app's own.
- modules/r277.js: a logo she gives an app herself (own, setOwn, clearOwn) comes first; a page's icon is read in SVG, GIF, ICO and AVIF
  too (iconOf); every logo drawn whole (the crest is taller than wide, and a circle had cut its shoulders).
- modules/r263.js: the drawer asks r279 which folders stand in it and in what order (as before without it); a logo of her own comes first;
  pictures drawn whole. modules/r176.js (the order pull sounds), r222.js (the news), editions.py (r277's text without Lakay, as before).
- Tests: rig/t_685_folders.js (32); rig/t_669_folders.js and rig/t_683_logos.js follow the quiet disc (6.83) and Lector's logos. On the
  test build: t_685_folders 32/32, t_669_folders 32/32, t_683_logos 12/12, t_684_settings 20/20, t_62_tour 34/34, t_651_still_keys 25/25.

    node rig/t_685_folders.js <page url> <out folder>

Ingenium 6.84 (12 November 2026): Settings as one console, every card in one anatomy, from the preview she approved after three
rounds (her words, 11 November 2026: "all of those lone buttons from the Settings page, the tabs could the entire Setting page could use
a better organising and a slight redesign to keep things looking tidy and cohesive to match the rest of Ingenium"; "It looks exactly the
same with the smooth effect and it looks slow and rigid ... the drop down menus are out of template with the rest of the app"; 12
November: "I approve of the preview, please push it everywhere"). The preview was drawn from the app's own surfaces, measured from the
built page (the card, the keys, the chosen key, Effort's pills, the top bar's menu), with nothing tilting.
- modules/r278.js (new): one console holds Find a setting with Show every setting at once beside it, the room keys, and under them the
  room's line or, in Models and AI and Your data, the section keys with their line (moved there by their ids; nothing copied). Every
  card's title has a small icon; each choice is a row, its name on the left, Ingenium's own list (r172) at its end; Theme and Motion
  are pills (the select is set and its change sent); every checkbox that was a box is the app's switch; Sounds is a switch that presses
  On and Off; Help's levels stand side by side across both columns. Nothing watches the page itself: a room chosen or Settings opened
  is what draws a card met later.
- modules/r234.js: the section bar is found by its id (dxB-ai, dxB-data) wherever it stands.
- modules/r176.js (the pills and switch lift, sink and sound), r222.js (the news).
- Tests: rig/t_684_settings.js (20); rig/t_633_settings.js finds the section keys by their ids. On the test build: t_684_settings 20/20,
  t_633_settings 17/17, t_651_still_keys 25/25, t_62_tour 34/34, t_679_memory 23/23, t_646_switch 19/19, t_680_old_webview 12/12,
  t_683_logos 12/12, t_681_lend (web) 14/14. t_61_backup 44/45 crashes at its computer-app restore, as it does on 6.83 (not of 6.84).

    node rig/t_684_settings.js <page url> <out folder>

Ingenium 6.83 (12 November 2026): Fabrica, phase 1: everything on GitHub brought onto her computer; and every app's folder wears its own
logo. Her words (11 November 2026): "I want to transfer all of my data and contents from GitHub directly to Ingenium and continue working
from there without missing a beat, this is really important to me"; "unlike GitHub I don't want any caps on file size"; GitHub stays as a
backup ("For question 3, yes"); the Mac mini and the HP laptop are her build and test machines (her yes, 11 November). On the preview
(https://claude.ai/artifact/4E99gkSPJ11A6fHH2nk4Va): "I like the preview please push it everywhere but make sure that all of the apps logos
are showing instead of the coloured letters". And (12 November 2026): "I want the Lakay and Offline Project app folders and any future apps
folders to show their logo icon and not have some randomised letter stand-in when they clearly have a logo ... I want that made into the
standard."
- desktop/app_hub_683.py (new; Mac and Windows apps): the engine. hub_scan lists every repository the key reaches (with its versions,
  branches, tags, issues, pull requests, releases and their bytes, and the logo in its own files); hub_bring brings, in the background,
  into "Ingenium GitHub" on the drive chosen (hub_places, hub_choose_place, hub_set_place; refused before anything is fetched when the
  drive has no room): every branch, tag and pull request's versions through git's own protocol (dulwich 0.22.8, into <owner>/<name>.git,
  a bare repository any git program opens), the wiki (<owner>/<name>.wiki.git), and in <owner>/<name>.hub/ the repository's record,
  issues, pull requests, comments, reviews, review comments, labels, milestones, releases with each file (checked by the fingerprint
  GitHub gives, fetched from GitHub's file host without the key), workflows and their run records, and check.json (every name, issue and
  file against GitHub); index.json lists what is here (hub_brought). Pause, carry on, stop; GitHub's request to wait is waited out and
  said; brought again, only what is new travels. Only reading: nothing on GitHub is changed. hub_git_files, hub_git_read and hub_hub_json
  let Fabrica open a repository brought. --selftest-hub: the builds prove the git part is inside each app (it fetches a repository it
  makes), and the Mac and Windows workflows install dulwich==0.22.8 and run it; the specs name it; THIRD_PARTY_NOTICES.txt (11, 12) and
  licences/dulwich-COPYING.txt.
- modules/r276.js (new; editions with Fabrica): the sheet as approved, opened by Everything from GitHub beside Bring one in: sign in once
  (r114's: GitHub's page and a code, or a key), choose (what comes, every repository with its logo, the drive), bring (each repository's
  progress, pause, stop) and checked; Open in Fabrica brings a repository with up to 500 MB of history into Fabrica (IngRepo.fromGitDir,
  now public in modules/r110.js) with its issues, pull requests, comments, reviews, labels and description (fbHub.importAll). On a tablet,
  a phone or in a browser the sheet says it runs in the Mac and Windows apps.
- modules/r277.js (new): IngAppLogo, the one place an app's logo is found: the four seals and the Offline Project's master logo (IngSeal),
  Lakay's Spiral by day and by night (ING_SEALS.lakay and lakayN, build_page.py), and for any other app the logo in its own page, found in
  Fabrica, the app library or a repository brought from GitHub, and kept (state.appLogos); a quiet disc while it is looked for, or when an
  app has none: never a letter. modules/r263.js uses it for the drawer's tabs, the front folder, the cards and an opened folder.
- modules/r176.js: the sheet's choices, repositories and drives lift, sink and sound. modules/r222.js: the news.
- Tests: rig/t_683_hub_engine.py 28/28 (the patched Mac and Windows apps against rig/hub683_mock.py, a stand-in GitHub serving invented
  repositories through git's own protocol and its API, its file host refusing the key, and one request to wait), rig/t_683_hub.js 17/17
  (the sheet with the computer app's back-end and the stand-in), rig/t_683_logos.js 12/12.

    python3 -I rig/t_683_hub_engine.py <Mac ingenium_app.py> <Windows ingenium_app.py>
    node rig/t_683_hub.js <page file> <patched Mac ingenium_app.py> <out folder>
    node rig/t_683_logos.js <page url> <out folder>

Ingenium 6.82 (11 November 2026): room in the page. The page must stay under 100 MiB (104,857,600 bytes), the most GitHub keeps in
one file, and 6.81 had 0.85 MB left (104,004,151 bytes); French and Haitian Creole, the next Carpe Diem or any sizeable module would
not have fitted. Carpe Diem carries its own page, compressed (gzip, level 9) and written in base64, in its block cd-self-src-data:
18.9 MB of the 43.1 MB Carpe Diem took in the page, and a part no compressor makes smaller (xz at its strongest saved 0.84 MB on the
whole of Carpe Diem, measured). Its copy's page is three runs of Carpe Diem's own page and one letter (demo_recipe.delta), and pako's
deflate (1.0.11, a port of zlib, MIT licence) compresses it again to the very same bytes, as Python's zlib 1.3 does. So:
- build/self_copy.py (new): an app named in build_page.py's _SELF_COPY (Carpe Diem: cd-self-src-data) rides without that block's text,
  with a note of how to put it back (data-self: where it stood, its gzip head, its recipe, the app's size and fingerprint); before it
  rides so, the page's own code is run in Node (build/self_copy_prove.js) and must give the app back byte for byte. Anything else (a
  copy compressed otherwise, base64 in lines, a gzip head with a name, no Node) and the app rides whole, as before, and the build says
  why. ING_SELF_WHOLE=1 carries it whole.
- build/self_copy.js (new) puts it back: the copy's page from its runs, compressed by pako at level 9 in the copy's own gzip head with
  its CRC-32 and length, in base64, in its place. build/pako/ holds pako_deflate.min.js and its licence; both ride in the block
  ing-self-copy-src (32 KB), and THIRD_PARTY_NOTICES.txt names pako (10).
- modules/r275.js (new, master edition only): window.ingBuiltinWhole(id, bytes) does it in a worker (the page keeps answering: its
  longest pause 35 ms on the test page), in the page itself where no worker can be made, and checks the whole against the app's
  fingerprint; a mismatch found in the worker is final. modules/r120.js (the app library) and modules/r268.js (Fabrica's
  demonstrations) call it after they unpack a block, and check size and fingerprint as before.
- Carpe Diem's block: 24.0 MB in place of 43.1 MB; the test page 84.5 MB in place of 104.0 MB.
- Tests: rig/t_682_selfcopy_unit.py (12 checks, invented pages: carried without its copy and given back byte for byte; a copy at level
  6, base64 in lines, a gzip head with a name, a copy not made of the page and a page without the block ride whole, each with its
  reason; the carried code ends no script early) and rig/t_682_selfcopy.js (10 checks in Chromium: the note and the code carried, the
  block about 24 MB, the page under 100 MiB by far, Carpe Diem 1089 whole from a worker and from the page, the page answering meanwhile,
  a note that does not match refused, the app library keeping 1089 by its fingerprint, Fabrica's Public sample whole, no page error).

    python3 -I rig/t_682_selfcopy_unit.py
    node rig/t_682_selfcopy.js <Ingenium page url> <out folder> [<the page file>]

Ingenium 6.81 (11 November 2026): sharing models between her devices, made simple, from the preview she approved ("I approve of
the new design, please push it everywhere"; her words of 9 November: "I want it to be easy to do and for it to work everytime and
with no issues"), and Carpe Diem 1089.
- modules/r274.js (new): the card Your models on every device in Settings, Models and AI, Your devices. A device pairs once with the
  computer's code (typed once; a computer, a Fire tablet, an iPhone or an iPad finds the computer on the Wi-Fi by itself, a web
  browser types its address); from then on the computer is kept with every address it has, found again by itself when it moves, and
  the chat follows it. Who answers lists this device, each computer and each kept service side by side, one press each (choosing a
  computer keeps Claude, and the other way round). The top bar's menu lists the paired computers' models too. Every request names
  this device (X-Ingenium-Device), so a computer that lends lists the devices using its models by name and kind, each with Remove; a
  removed device is asked for the code once more. Each device and computer is drawn by its kind (laptop, desktop, Mac mini, tablet,
  phone, browser). A computer paired before 6.81 is kept as one of hers. Nothing in the card is redrawn while it is left alone.
- desktop/app_lend_681.py (Mac and Windows): hello says the computer's id, kind and addresses; POST /ingenium/pair; devices kept in
  share.json; a removed device refused (401, removed) until it pairs again; share_device_remove; CORS allows the device header.
- The Fire bridge (Bridge.java: findLenders, deviceInfo) and the iPhone bridge (EngineBridge.swift, the same two) look on the Wi-Fi
  for a lending computer (48 at a time, the /24, ports 17860 to 17862).
- apps/builtin: Carpe Diem 1089 (2026-11-11, 528171089, 49,367,704 bytes, from Carpe-Diem-Gift) in place of 1084; the sample's
  recipe made again from it; recipe.json's live record measured from it (49.4 MB, 73,130 lines); its news line the master edition's.
- modules/r176.js: the card's keys and the menu's rows lift, sink and sound. modules/r222.js: the news.
- Tests: rig/t_681_lend.js (three paths: a web browser 14, the Fire tablet 4, the computer back-end 4; stand-in rig/lend681_mock.py),
  rig/t_681_lend_gateway.py (19, the patched Mac and Windows apps), rig/t_681_cd1089.js (6). On the test build: t_681_lend 22/22,
  t_681_lend_gateway 19/19, t_681_cd1089 6/6, t_680_old_webview 12/12 (r274 emptied by hand, as 6.80 does), t_646_switch 19/19,
  t_644_claude 8/8, t_679_memory 23/23, t_633_settings 17/17, t_651_still_keys 25/25, t_678_load_anywhere 20/20, t_62_tour 34/34,
  t_657_cloud 14/14, t_705_lend_page 119/122 (its three 503 checks read a wording the computer back-end has changed since; not of 6.81).

    node rig/t_681_lend.js <page url> <out folder> <patched ingenium_app.py> <page file>
    python3 -I rig/t_681_lend_gateway.py <Mac ingenium_app.py> <Windows ingenium_app.py>
    node rig/t_681_cd1089.js <page url> <out folder>

Ingenium 6.80 (11 November 2026): two faults found on the Fire and Android build of 6.79 (GitHub run 43056507079, whose emulator
self-test ran out of time, so that build was never published and the Fire and Android download stayed at 6.78):
- modules/r271.js: the Memory room and the tray are emptied by hand (wipe) instead of Element.replaceChildren, which web views older
  than Chrome 86 lack (the Android 11 emulator's is 83). There the call threw while the room was drawn ("c.replaceChildren is not a
  function"), and on a page without it the whole memory part stopped as it started.
- modules/r273.js (new): Engine.unload stops a read-ahead still in progress before it unloads. The page reads the chat's opening ahead
  0.7 s after a model is ready; the phone and tablet apps do the engine's work one piece at a time (Bridge.java), so a change of model
  waited for the whole reading: 465 s on that run, about the length of a reading there (468 s).
- build_page.py: the app's own self-test has 19 minutes, not 14 (it needed 641 s of 840 s on 6.78's run); the Fire repository's
  emulator_selftest.sh waits 20 minutes with it.
- Tests: rig/t_680_old_webview.js (12 checks: the modules' sources hold nothing Chrome 83 lacks; on a page without replaceChildren the
  tray and the Memory room are drawn; an engine that does one thing at a time is free at once). On the 6.79 page its second part fails
  (the memory part stays "started"). rig/t_679_memory.js takes ING_OLD_WEBVIEW=1 to run its 23 checks on such a page.

    node rig/t_680_old_webview.js <Ingenium page url> <out folder>
    ING_OLD_WEBVIEW=1 node rig/t_679_memory.js <Ingenium page url> <out folder>

Ingenium 6.76 (11 November 2026): the Models page's rooms in the turret's design, the second of the two builds she asked for ("I need
you to push build 6.75 and 6.76 with the models page new turet redesign"), as her preview draws the rooms below the turret:
- modules/r267.js (new): the rooms' cards in the head's own surfaces and titles in Home's Cormorant; the Health card as gauges (This
  device, Loaded now, The page itself, Installed models, and the rest it reports); each of her models in Your models a row with its
  lens, drawn as the turret draws it in the model's own colour (IngTurret.lens, r266), its name in the serif, In the engine beside the
  one loaded, and Load or Unload, which turns the turret (Set active, Settings and Remove stay); each of Ingenium's houses a card with
  its lens on a dark stage. The base page draws these lists again whenever the engine or the models change; each is dressed again
  once it is drawn. Night redraws the lenses; on a phone nothing scrolls sideways.
- rig/t_676_rooms.js (9 checks), with the turret test's invented models and stand-in engine.
Checked on the test page: t_676_rooms 9/9.

Ingenium 6.75 (11 November 2026): the Models page as a turret of lenses. Her words (11 November 2026): "The Models page needs a
redesign and a major makeover to match the rest of the Ingenium's pages, it looks a little basic compared to the rest of the app";
then "I need you to push build 6.75 and 6.76 with the models page new turet redesign", with her preview Ingenium_Models_Designs.html,
design I · The turret ("A turret of lenses, like a microscope's: one turn loads a model, one turn unloads it"). She said another
session had made 6.75 and 6.76; no branch of the four repositories, no other coding session and none of her published pages held
them, and her preview is a page of example models, so the turret is built here from her preview's own drawing, on the real page:
- modules/r266.js (new): the head of the Models page (the page's own title and words give way to it): Ingenium · Models · the
  turret, Models, the turret's words, Get one of Ingenium's models (it opens that room) and Add a model file (it opens Your models),
  and the In the engine card, which says what the engine does from its own status (loading, loaded and the memory it takes, empty,
  or the engine's refusal). The turret, drawn as her preview draws it (canvases of spun metal and coated glass in Ingenium's lavender
  and violet, each model's glass in its own colour): a port for each of her models on this device (up to seven; any more are named
  under it) and one empty port, the rest blank. Pressing a model turns it into the engine's light path, with a detent's sound for
  each step, and loads it by the page's own setActive and loadActiveModel; pressing it again, or the empty port, unloads it
  (Engine.unload). The scale round the turret is this device's memory for a model (lineupUsableGB), and its arc the memory the
  loaded model takes (lineupNeedGB). A model likely too heavy says so first, with Load it anyway. The models' names stand in a layer
  above the lenses. The room shown below is ringed, as the design draws it; the rooms keep everything they did. Night redraws it;
  minimal and reduced motion turn it at once; on a phone it fits the screen. modules/r176.js: its ports and keys sound as keys.
- rig/t_675_turret.js (20 checks), with invented models (Lantern 3B, Quill 8B, Atlas 70B) and a stand-in engine that loads at once.
Checked on the test page: t_675_turret 20/20 (the first run showed two model names hidden under neighbouring lenses and a heavier
fallback serif; the names now stand in a layer above the lenses and the titles use Home's Cormorant).

Ingenium 6.74 (11 November 2026): "logo", not "seal", and a new app's logo you can press. Her words (11 November 2026), on Fabrica's
A new app panel: "Please change "seal" to "logo" because not every app will have an seal themed logo. I also want you to make the app's
logo animated and clickable on the popped out panel page, it needs to be interactive and clickable like the rest of the page." Asked,
she chose "Logo everywhere" (Ingenium's own logo too) and, for a press, both ways offered: it knocks and turns to the next colour, and a
picture of her own can be the logo. She approved the live preview the same night ("I approve of the preview, push it everywhere"),
asking that the rest of the panel move too; she then withdrew a remark that the press felt heavy ("I think its my laptop lagging"), so
the press is as she approved it. On the release she asked once more: "the colour of the letter switches too fast and looks off".
- modules/r265.js (new): the New app panel's logo (r112 draws it; a coin since 6.66, r260) is a key, solid as Home's orbs (r264): a body
  of seven discs in its own colour behind its face, its letter standing up from the face and thick, a cast shadow; at rest it sways,
  its letter lifts and settles and a sheen crosses it; it leans toward the pointer, lifts under it, sinks when pressed; a press
  (pointer, finger, Enter or Space) knocks it with a ripple and turns it to the next of its six colours (the colour row follows); it
  says which colour it wears. "Use a picture" (or a picture dropped on it) puts her picture on its face, cut to a 512 pixel square from
  its middle; "Use its letter" takes it away; "Bring its files in" shows no picture key (her files bring their own logo). The rest of
  the panel moves: the colours bob out of step and the one chosen pops; the ways lean toward the pointer, lift, sink and tick when
  chosen; the fields rise when written in; Make it pops when it is ready. When its colour changes, its face, its letter's raised
  sides, its body and its ripple change together over .6 seconds while it turns (the face faded over .35 seconds and the rest changed
  at once, so the letter's colour ran ahead of the face). Its states are nl-hov and nl-down, because r112's pointer
  code clears hov and down from every logo but a card's. Minimal motion, the calm days and reduced motion keep it all still.
- modules/r112.js: the panel says logo; starterFiles writes the logo (her picture on a disc of its colour, PNG) into the page's icon
  link (the installers read only a picture written into the page, r136 iconSource) and as icon.png beside it, in the manifest and the
  offline copy, so Fabrica's cards (r239), its icon and its installers wear it. modules/r176.js: the logo sounds as Fabrica's keys do.
- Logo, not seal: 32 sentences in modules r102, r108, r112, r140, r144, r147, r175, r176 and r262 (the top bar, the door's setting,
  the Career Studio's documents and their crests, Fabrica's library and panel, the crests' descriptions, the Guide and its help, Home's
  logo, the sounds' names and where they play, Blend's logo), two titles more in r108, three in the base page (build_page.py, "6.74 ..."),
  and Ingenium's own Tabula, Abacus and Imago (apps/house_patch.py: the logo studio, its notes and Tabula's watermarks). "Seal" stays where
  it means locking a backup (Backup, Cloud, the sign-in) or signing an app (the shells); What is new keeps each past line's words.
- rig/t_674_logo.js (37 checks): the logo's body, rest, lean, lift, sink, knock and next colour (its parts fading together), by
  pointer and by keyboard; the
  panel's other motion; a picture (an invented one) on the logo and in the app made with it (index.html, icon.png, the manifest, the
  offline copy, what the installers read, Fabrica's card); minimal motion; and every page's words and labels with no logo called a
  seal. Older tests brought to the new words: t_67_seal, t_61_seals, t_681_house, t_666_fabrica (the coin is solid where r265 is).
Checked on the release page (fingerprint 40e1ca0214b53e9d): t_674_logo 37/37, t_67_seal 34/34, t_666_fabrica 23/23; on the test page:
t_681_house 14/14, t_661_fabrica 21/21; t_61_seals 47/53 as before (its six failures are older and concern pictures' sizes and the
page's fit, not words). In Safari's engine (WebKitGTK)
the logo stands solid, knocks and changes colour.

Ingenium 6.73 (11 November 2026): the Windows apps Fabrica makes open again, and carry their own name. Since 6.70 Windows
refused to start every one of them: GitHub's Windows check of 6.70 (run 21 of the shells, the Windows job) failed at Start-Process with
"The specified executable is not a valid application for this OS platform", for the test app and for The Forge alike, where 6.65 had
passed; the only change between them was 6.70's naming step (modules/r170.js), which put a new resource directory and a version
resource in a section of its own after the shell's others. Every rule of the program's layout that can be checked without Windows held
(section order and alignment, SizeOfImage, the headers' room, pefile reading the name back), so the cause lies in what only Windows'
loader enforces, and the fix moves nothing:
- shells/windows/shell.rc: the shell carries its own version resource, with room kept for an app's name (64 characters), its file (72)
  and its version (24), each found by its mark, as the shell already keeps room for each app's icons.
- modules/r170.js (winNameInto, in place of winVersionInto): Fabrica writes the name, file and version into that room and empties the
  rest of it, sets each value's length, and touches nothing past the room; the numbers under Details come from the version. A shell
  without the room (one built before) is filled as in 6.65, without a name, and the app opens.
- shells/test/ci_windows.ps1: Windows must read each app's own name, product name and file from it, beside the checks that it opens.
Checked here: the shell kept in this branch (no room) is filled with exactly its own layout (seven sections, as in 6.65); the writer,
run on version resources laid out as the resource compiler writes them (with and without each value's ending NUL), writes all six
values, keeps every structure's size, and leaves the program's own bytes untouched. On Windows (GitHub's Windows Server 2025, shells run
42933611062): the test app and The Forge open, Windows reads their own names ("Shell Test", "The Forge") and versions, and the
icon, storage, IndexedDB, file saver, clipboard and second start all pass; that run kept the new shell (796,672 bytes, sha256
429341c7...), which this page carries.

Ingenium 6.72 (11 November 2026): Carpe Diem 1084 carried, the next step's keys at their own width on a phone, and Home's solid orbs,
approved on their live preview. (6.67 to 6.71 are described in their modules' headers, r261 to r263 and r170, and in their commit messages.)

- Carpe Diem 1084 (2026-11-10, 528171084, the full edition, 48,652,801 bytes, from Carpe-Diem-Gift's branch
  claude/beautiful-brahmagupta-1gpfih, the same file in its Mac, Windows and Fire projects) replaces 1081 in apps/builtin (her words, 10
  November 2026: "Carpe Diem has also been updated to build 1084 now, please update Ingenium with the latest build"). Since 1081: Tabula
  prints in colour and splits a long list across pages (1082); on a Mac the five rooms can sit in the Dock as apps of their own (1083);
  set to French, all five rooms are in French throughout (1084). recipe/recipe.json's live record (devrec) is measured from 1084: 48.7 MB
  and 71,421 lines, counted as r126 counts them; its base (the builds her documents were written about, 1058) stays. The news line is
  the master edition's alone (editions.py). Ingenium's own Tabula and Abacus rooms (apps/) are not taken again from 1084 here.
- The next step's keys on a phone (her words, 10 November 2026: "I don't want the "Bring in your first model" and "Take the guided tour"
  buttons to be this wide and long for no reason, please fix that from the iphone app"): Home's own rule (r147) lays the two keys in one
  column as wide as the card when the card is narrower than 330 pixels, so on an iPhone each key filled the card. In the orrery
  (modules/r261.js) each now keeps the width of its words, one under the other (185 and 182 pixels at 390), as on a computer.
- Home's orbs as solid as the seal (modules/r264.js; held for her preview, which she approved on 11 November: "I approve of the preview,
  please commit and push it everywhere"; her words, 10 November 2026:
  "I want the orbs pages circling around the engine logo to have the same feel and density and animation as the engine logo ... it feels
  weird seeing them just light up and feel hollow when I click on them or hover over them"). Each orb is made as the seal is: a body of
  seven discs in its own purples behind its face and a base with the seal's contact shadow; its mark a fifth of its size above the face
  with two copies under it; at rest its mark lifts and settles as the seal's ring does and its surface drifts under a still light, inside
  the ball's own round clip (a CSS clip round a moving layer inside the 3D scene was not honoured in Chromium's software path); under the
  mouse its mark rises and its shadow lengthens; pressed, its mark is pushed down and its body closes up; released, it knocks as the seal
  knocks before the door opens, and its room opens 280 milliseconds later, as the door does. A click that is not a person's, Minimal
  motion and reduced motion open the room at once. Its live preview is built by previews/home_orbs/tools/build_live_orbs.py.
- rig/t_61_home.js dates its "yesterday" chat at noon yesterday: 25 hours ago was two days back between midnight and one o'clock.
- previews/home_concepts/tools/capture_v2.js takes each room's icon from inside its orb (from 6.67 the first picture in a room's jewel is
  its ball).

    node rig/t_672_orbs.js <url> <out>                  # 27 checks: the body, the face, the mark, at rest,
                                                       # left alone, under the mouse, pressed, the knock, the tour's click, Minimal motion,
                                                       # by night, below 260 pixels, no ring or glare, on a phone
    node rig/t_672_cd1084.js <url> <out>                # 6 checks: Carpe Diem 1084 carried, kept, named and measured by Lector
    node rig/t_671_phone.js <url> <out>                 # 24 checks since 6.72 (the next step's keys at their own width, at 390 and 320)

Ingenium 6.66 (10 November 2026): Fabrica in Ingenium's own depth, the Offline Project's shield of three, and a model kept for a
stronger computer (its desktop side; the page's part held for her preview).

- modules/r260.js (new; master and full editions, editions.py): her words (10 November 2026): "The newly added Fabrica pages are still
  and not animated and clickable when I hover over them", "I also really dislike the weird film over the background in the Fabrica
  page when a panel is open", "I want the new app panel's surfaces to be animated and have that popped out 3D look and effect".
  Measured on 6.65: the library's cards, each app's page (side list, head, boxes), the tiles of Bring an app in and the New app
  panel's ways, colours and close key had no lift and no press; a panel stood on a film (rgba(17,13,24,.35)). Now each lifts and
  sinks with Fabrica's own depths and spring; the library's cards lean toward the pointer (at most 3.2 degrees); no film, and the
  panel is a raised plate; the New app's seal is a coin that floats and turns when its letter or colour changes (not while more of
  the same name is typed). Minimal motion, calm days and reduced motion keep it still. modules/r176.js: those surfaces sound as
  keys do, and a Fabrica panel rising is heard as the other panels are.
- modules/r246.js: her words: "The Offline Project without Inkwell app has the wrong seal in Fabrica". Both variations were kept
  under one name, "The Offline Project", and Fabrica (r112) chooses the crest by the name, so the copy without Inkwell wore the crest
  of four and its own card said "Not made here yet". Each variation is now an app of its own ("The Offline Project (without
  Inkwell)" wears the shield of three); a copy kept the old way, every version of it without Inkwell, is renamed once when Fabrica
  opens; one that holds versions of both keeps its name. r112: the variation is named once on its card.
- build/desktop/app_keep_666.py (Mac and Windows apps): a download asked for "for later" is kept and checked as any other but marked
  so; each download's record keeps when it arrived and its size; kept_models, model_later, reveal_model, copy_model_out (to a folder
  she chooses, the first part checked against the fingerprint, a note beside it on adding it elsewhere; stopped, it leaves nothing
  half-made), copy_status, copy_cancel. rig/t_666_keep.py: 31 checks on the app's own functions, Mac and Windows.
- modules/r259.js (new, held in build/held.json for her preview): Downloads, a room of the Models page (r173): keep a model for a
  stronger computer, the kept models (use it here, copy to a folder, show the file, remove), and what was downloaded lately; a kept
  model is left out of the model lists. In a browser, Download the file saves to the device's Downloads folder.
- rig/t_666_fabrica.js: 23 checks.

Ingenium 6.65 (9 November 2026): answers from her folders checked once more, her build library on the Folders page, and her
sticky notes above the floating windows.

- Her choice after the evaluation (8 November 2026): keep the flags under each reply, recommend a larger model for folder answers,
  and add a second pass. modules/r257.js: when a sentence of an answer names no passage, the same model is asked once more, through
  the same way, to cite every sentence; the better answer is kept and the first is folded under it; what still has no source is
  named under the reply; when a small model answered, the device's Magister is named. modules/r202.js: the switch (on by default,
  state.rag.recheck). rag/eval.js and rig/t_rag5_eval.js record the second pass. rig/t_rag3_chat.js: 72 checks.
- modules/r258.js (new, the master edition alone: editions.py): her build library. A zip of Markdown notes, a top folder for each
  app, is brought in on the Folders page and kept on the device in a store of its own (IndexedDB "ingenium-buildlib": never in the
  page, the saved desk or a repository). Each app's notes show in its folder under How it was built (Start here, its parts by name,
  its versions folded, newest first); an app with no folder gets one. A finder on the card and in each folder looks for a word in
  the notes (a note named by the word first, then by how often it holds it) and opens the note at that place, marked. The reader
  joins lines wrapped by hand, so a list item is not cut in two. The store is labelled in Storage (r142) and in backups (r143): a
  backup, and so Ingenium Cloud, carries it, and a library that arrives that way is seen without opening the page again.
  modules/r208.js calls it only where it is. Held on 8 November for her preview; she asked for it to be shipped on 9 November.
  rig/t_665_buildlib.js: 37 checks with an invented library (a second run with "absent" checks another edition carries none of it).
- modules/r123.js: her sticky notes and the side buttons float over a floating window. Her words (9 November 2026): "Schedae's
  sticky notes open behind the exported floating windows ... they never float over". The cause, reproduced on the 6.64 page: the
  notes stand on layer 120 and the side buttons on 130, a floating window on 600, and every press on a window took the next
  number, up to 1800 (after some forty presses it covered Schedae's panel and the Display panel, after two hundred every dialog).
  Now the windows keep to 600 to 607, the one pressed last on top; while a window is shown (body.ing-fw-up) the notes stand on 608
  and the side buttons on 609; the chat's drawer, the panels and the dialogs stay above. rig/t_665_windows.js: 21 checks.
  Not changed, and not verified on a real Mac here: a window of its own (the app's open_lite, a browser's window.open).
- release.py editions: the three other editions built into the Mac mini repository's editions/ with their fingerprints, in one step.

Ingenium 6.64 (8 November 2026): the citation reader made exact, the reranker in the Windows app, and the evaluation's results.

- rag/prompt.js: sentences() does not end a sentence after a title or short form (Mr., Mrs., Dr., St., Capt., No., e.g. and others);
  citations() does not count a bracket joined to a word or number before it (strains[7]); modules/r257.js links follow the same rule.
  Both flags were the checker's, not the model's (the evaluation's second run: H01's two fragments, L07's [7]).
  rig/t_rag5_prompt.mjs: 15 checks on the evaluation's own replies, no browser.
- build-windows.yml (and both build-mac.yml): the reranker's list is read without carriage returns. A Windows checkout ends its lines
  with CR LF, so 6.63's step asked for "config.json\r" and warned "The reranker is left out of this app" (reproduced here with the
  same list); its clean-up named a path that does not exist, so the files from rag-vendor.zip most likely stayed in that app (not
  verified inside the installer).
- rig/t_rag5_eval.js keeps the passages each answer was given in report.json, so a person can check every reading.
- rag/eval/RESULTS.md: the evaluation's results (two runs with the model the apps carry, one with Qwen3.5 9B).

Ingenium 6.63 (8 November 2026): the folder search back in the Mac and Windows apps, and NOT_FOUND kept exact.

- The 6.62 apps were built without the folder search. vendor.json's new entry made the workflow rag-vendor.yml fetch the files again
  and replace rag-vendor.zip on the release; its fingerprint changed (57db28f7... instead of ecd2f34b...), and every Mac and Windows
  build refused it, as it should, and left rag/ out ("The folder search's files have the fingerprint ..."). The new zip holds the
  same 22 files as before, byte for byte, and the reranker's six (each compared with its pinned SHA-256); release.py now pins it
  (tools/rag_vendor.sha256). rag-vendor.yml replaces the zip only when run by hand; a push only checks. The reranker step keeps the
  files the zip already carries and fetches only a missing one.
- rag/prompt.js declaresNotFound(answer, count) and modules/r257.js: a reply that says the NOT_FOUND sentence and cites no passage it
  was given is shown as exactly NOT_FOUND. The evaluation found the model the apps carry (Qwen3.5 2B) refusing correctly but adding an
  explanation before or after the sentence (one of the four end-to-end ACL answers, and H11). A reply that cites a passage given and
  also says the sentence stays an answer, with that sentence flagged. rig/t_rag3_chat.js: 65 checks (two new).

Ingenium 6.62 (8 November 2026): the folder search's evaluation and its optional reranker (phase 5). Her task: "Reranker. Optional,
off by default, loaded on demand. Use a small cross-encoder that has a working ONNX export for Transformers.js. Confirm this on Hugging
Face before choosing a model", "merge with reciprocal rank fusion (k = 60), then rerank to 5 if enabled, else take the top 5", and her
five done criteria (rag/DESIGN.md sections 12 and 13).

- rag/reranker.worker.js, rag/reranker.js (new): `Xenova/ms-marco-MiniLM-L-6-v2` (revision a0914435, confirmed on Hugging Face on
  8 November: tagged transformers.js, onnx and text-classification; quantized, 23.1 MB), loaded the first time a search asks for it.
  rag/retriever.js reorders the fusion's best 20 by its scores and keeps 5 (the folder rule applies before it reads anything);
  rag/main.js keeps the fusion's order with a plain note when its files are missing. modules/r202.js: the card's switch (off, per
  device); modules/r257.js: the chat asks for it when the switch is on. The Mac and Windows build workflows fetch its six files from
  the pinned revision and check each against tools/rag_reranker.sha256 (written by release.py rag); vendor.json pins them.
- rag/eval.js, rag/eval/golden.json, rig/t_rag5_eval.js (new): the evaluation; the results are in rag/eval/RESULTS.md.
- Measured (rig/t_rag5_rerank.js, 15 of 15, the three fixture folders without the 4 MB logbook, so golden item H09 left out): off by
  default and nothing of it fetched until a search asks; Recall@5 17 of 19 with it and without it; the passage holding the answer first
  in 17 of the 17 found with it, 14 without; a search took a median of 48 ms without it and 7.4 s with it (four processors shared
  with the evaluation run), and the first search with it loaded it in about 8 s; test-b got no passage of household_papers with it on;
  a copy without its files keeps the fusion's order and says so under the reply. Her five criteria: rag/eval/RESULTS.md.

    node rig/t_rag5_rerank.js <page url> <out>    # 15 checks (RAG_E2E, RAG_E2E_BARE, RAG_BRIDGE)
    node rig/t_rag5_eval.js <page url> <out>      # her five criteria (LLM: an OpenAI-style model server)

Ingenium 6.61 (8 November 2026): Fabrica's panels rearranged, its library, and each app's own page. Her words (8 November 2026): "The +
New app button opens a little panel that makes no sense and barely seems to do anything, I want that fixed and streamlined ... either keep
the Close or Done button both look weird there together. I also want the app library to be redesigned"; she approved the second preview
(the apps' real 3D seals, Ship and Open on each card), then: "I don't want you to change Fabrica's 3 column view ... I mainly wanted the
popped out panels rearranged and fixed", "I want the library page ... to be the view that I see when I click on the Your apps", and "I want
all of these to be kept and added into Ingenium".

- modules/r112.js: the three panels are unchanged. "Your apps" (the left panel's heading, or its count) opens the library page: her own
  apps (the app library's, kept here or not yet, and the Offline Project's two kinds) and the apps made here, as cards with their seal,
  version, where they stand and the packages made, Ship and Open (or Bring it in, Make it); filters (All, Your own, Made here, Needs
  you) and a search; it redraws when the app library fills (a moment after the app opens). Open shows the app's own page: the apps down
  the left, its seal and name with Run it and Ship, tabs (Overview, Changes, Versions, Plans, Ship, How it was built; the middle four lead
  into the three panels), and three boxes: where it stands, the next step (one key), how it was built (its folder on the Folders page).
  "‹ Back to the work" returns to the three panels. A new app: name, colour, how it starts (Describe it: a model writes its first page in
  Code, linked to Fabrica; A simple first page: index.html, manifest, icon.svg and an offline copy, kept as the first version; Bring its
  files in; Start in Code) and one key; the new app wears its colour as its seal until it has a drawn one. Bring an app in: the library's
  apps as seal tiles (one already here opens), the Offline Project as crests, then a page or zip, a git bundle, From Code. Every panel of
  Fabrica (r112, r141) closes with its ✕, Escape or a press outside, and keeps only its own main key.

    node rig/t_661_fabrica.js <page url> <out>     # 21 checks; rig/t_fabrica.js follows the seal tiles (34 checks)

Ingenium 6.60 (8 November 2026): the folder search keeps itself up to date (phase 4, the scheduler), and the installed Windows
app really carries the speech models and the folder search. Her task: "Use setInterval in a Worker. Default interval 20 minutes,
configurable. It runs only while the app is open ... Reconcile each folder: compare mtime and size first, and hash the content only when
they differ. Reuse stored embeddings for chunks whose content_hash is unchanged. Delete chunks of removed files." She approved phase 4
on 8 November, and chose to keep her specification's five passages (no threshold for weak matches).

- rag/scheduler.worker.js and rag/scheduler.js (new): the clock in a worker and its page side (ticks never overlap). rag/main.js:
  IngRag.schedule, IngRag.reconcile, IngRag.scheduleState: each look lists every folder and compares sizes and times with the index; only
  a folder where something changed is read (the indexer's reconcile: hash, reuse, delete, one transaction per file); where nothing
  changed the reading model is not even loaded. rag/DESIGN.md section 11.
- modules/r202.js: "Look for changes and read them by itself" on the card (never, 10, 20, 30 minutes or an hour; 20 by default; kept per
  device), the first look two minutes after the app opens, and a line with the next look and what the last one found.
- release.py ships scheduler.js and scheduler.worker.js with the folder search.
- Windows (build-windows.yml, pushed during 6.59): GNU sha256sum given a path with backslashes starts its line with a backslash, so the
  fingerprint check had failed since 6.57 and the installed app fetched its speech model instead of carrying it; the fingerprint is now
  read from standard input.

    node rig/t_rag4_schedule.js http://127.0.0.1:8188/ <out>   # her criterion 5 through one tick of the clock: 19 checks

Ingenium 6.59 (8 November 2026): the chat answers from her folders, with its sources (the folder search, phase 3), and the Mac and
Windows apps carry the folder search. Her task (31 October 2026, sent again on 8 November): "Add an opt-in RAG mode to the existing chat
app. When the mode is enabled, every chat turn retrieves context from user-selected local folders ... and the answer cites its sources",
with her grounding contract: "If retrieve() returns zero chunks, do not call the LLM. Return the constant NOT_FOUND", her system prompt,
and "Render each [n] as a clickable link. It opens the source file ... and, where possible, highlights the section". She asked on
8 November that the folder search and its phases come first.

- rag/prompt.js (new, pure functions): NOT_FOUND, her system prompt word for word with the passages numbered, ground() (zero passages:
  NOT_FOUND; otherwise the passages kept, best first, while the prompt fits the model's room), isNotFound(), citations(), sentences()
  and checkGrounded() (every sentence carries a citation to a passage given; the flagged sentences are named). rag/DESIGN.md section 10.
- rag/main.js: IngRag.prompt, and IngRag.openSource(passage, user): the cited file read again through the app's bridge (only a folder
  the user may read), its text from the parse worker without chunking (rag/parse.worker.js and indexer.js: textOnly), and the passage
  found at its offsets, elsewhere, or not at all (the file changed).
- modules/r257.js (new): "Your folders" in the chat's + menu, first of the ways of looking things up, and a chip while it is on
  (turning it on turns Web search and Research off; not in Code; only where the folder search is). A turn: retrieval in the chat's own
  preparation step (the Stop key and the busy state work as for any reply); zero passages, NOT_FOUND and no model asked (a note names
  where folders are added when none has been read); otherwise the chat's model, whichever it is, reads exactly her system prompt and
  the question (chatHistory), nothing else (no earlier turns, memory, web or the working loop's tools). The reply keeps its passages,
  its [n] are links, its sources are listed, sentences without a citation are named under it, a quoted NOT_FOUND becomes exactly
  NOT_FOUND. The viewer: the passage as it was read, then the file with the passage marked (a PDF's page named). A message with a file
  or a picture is answered without the folders, with a note. The switch is kept per device (r255 HERE_KEYS "rag").
- r202.js: the card's last line says how the chat uses the folders; build/held.json no longer holds r202 back: release builds carry
  the folder search's card and loader from 6.59.
- Shipping (release.py ship_rag, RAG_FILES): rag/ into the Mac mini, Mac Intel and Windows repositories with tools/rag_vendor.sha256;
  build-mac.yml and build-windows.yml fetch rag-vendor.zip from Mini's release, check it and unpack it to rag/vendor; ingenium.spec and
  ingenium_win.spec (the installed app) carry rag/ beside the page; without the files the app is built as before. A copy with the
  models over 2,140,000,000 bytes is made again without the folder search (Mac) or not published that time (Windows).

    node rig/t_rag3_chat.js http://127.0.0.1:8188/ <out>     # the built page with rag/ beside it and the bridge stand-in (RAG_E2E)

Ingenium 6.58 (8 November 2026): Your mentor in the Career Studio, the screen kept on while Ingenium works, and dictation in the phone and
tablet apps. Her words (8 November 2026): "I am still unclear on what exactly I am looking for so I would like for Ingenium to provide that
inside of the app and be my in-app recruiter/mentor/counselor/headhunter"; "I want them to spot skills and experience that I have show me how
it can be transferred ... spot my blindspots"; the Career Studio "is not really AuDHD accessible"; and "I want for Ingenium to still be able
to continue running and working in the background even if the screen of the devices go to sleep". She chose the mentor's four sources: her
CV and documents, Lector's readings of her apps, her LinkedIn export, and a short talk.

- modules/r188.js, Your mentor (a room beside Today; paintMentor and its steps, IngCareer.mentor): measured on 6.57, what a mentor needs was
  in the studio already, in five rooms and under a dozen keys, with nothing saying which to press first, and Suggest entries and Find my
  skills each replacing the other's findings. Now seven steps, one on the screen at a time, her place in view: what it may read (CV,
  documents, LinkedIn export, Lector's readings, a profile file); a short talk (eight questions, one at a time, each skippable, saved as
  she types; finished, they fill What you are looking for); entries and skills found, kept together, kept or dropped one at a time; what
  transfers, blind spots and what sets her apart (Your edge's three); paths that fit (Your direction); her CV and documents looked at
  with her (never rewritten); and a summary (this week, what to add to her CV and letters, what Lector found in her apps, blind spots,
  where she stands out, paths). Do the rest for me runs the steps that need the model in order; Stop (stopNow, MSTOP) ends the steps
  after the one running and keeps what was finished; the room opens at the first step not done. Today names the mentor's next step.
  Each profile has its own mentor (CS().mentor).
- modules/r256.js (new): the Screen Wake Lock while Ingenium works here (Engine busy, Lector, the Career Studio, Blend, dictation, the
  Cloud, a model being converted), released as soon as the work ends; a page out of sight cannot hold it, and it is asked for again
  when seen. Settings, Models and AI, Your devices: Keep working (r234, r173). The computers that lend models or keep the Cloud already
  stay awake (R74; 6.57).
- The Fire and Android app (AndroidManifest.xml: RECORD_AUDIO, MODIFY_AUDIO_SETTINGS; MainActivity: onPermissionRequest for the app's
  own address and for sound only, then Android's own question) and the iPhone and iPad app (Info.plist: NSMicrophoneUsageDescription;
  WebViewController: requestMediaCapturePermissionFor, the app's own scheme, main frame, microphone only) pass the microphone to the page.
  Not compiled in the build session: GitHub's Android and iOS builds are the first compile; a device test is still to be done.

- 6.57's Mac runs failed at the last step: the copy with the models, carrying the speech models too, came to 2.18 GB, over GitHub's
  limit of 2 GB for one release file (HTTP 422). build-mac.yml (Mini and Intel) now makes that copy without speech/ (resealed); the app
  alone, the main download (about 200 MB), keeps them. 6.57's Windows, Fire and Android, and iPhone and iPad runs succeeded.

    node rig/t_658_mentor.js <page url> <out>    # the mentor with a stand-in model: 17 checks

Ingenium 6.57 (8 November 2026): Ingenium Cloud. Her words (8 November 2026): "I want you to build Ingenium its own local Cloud or local
network that can store my data and facilitate the transfer of my data across wirelessly across my devices ... I want all of my devices to
have the same content in real time or be able to be updated over Ingenium's Cloud ... continue working on any app, project, assignment, or
chat or anything else inside of Ingenium with great ease as long as I login and connect to the Ingenium's cloud". Asked how, she chose both
ways: her Mac mini as the home hub, and any two devices directly.

- desktop/app_cloud_657.py (Mac and Windows; release.py's DESKTOP list): the gateway that lends models (port 17860, its pairing code and
  lockout) also keeps Ingenium Cloud: GET /ingenium/cloud (the snapshots it keeps), GET and POST /ingenium/cloud/part/<id> (one sealed
  part, its bytes checked against their SHA-256), POST /ingenium/cloud/has, /snap (kept only once every part it names has arrived; the
  newest five per device; parts no snapshot names go an hour later) and /forget. It keeps sealed parts and each snapshot's device name,
  time, size and key-drawing salt in the app's data folder (cloud/), and never sees the passphrase or a word of her work. A new switch,
  cloud_box_set, runs the gateway and keeps the computer awake for the Cloud without lending its models (_share_apply).
- modules/r255.js (new): the Cloud, page side, the same code on the computers, the Fire tablet, iPhone, iPad and a browser (netFetch).
  A snapshot is everything a backup holds (r143's make, with a new option, leave, so the app library stays on each device), each part
  sealed with AES-GCM-256 under a key drawn from her passphrase (PBKDF2-SHA-256, 600,000 rounds, deriveBits: one half seals, the other
  names each part by HMAC-SHA-256; the nonce is drawn from the part too, so a part always seals the same way and only changed parts
  travel). The key is kept on the device as a key the page cannot read out (IndexedDB ingenium_cloudkey, never in a backup: r143's
  NEVER; its settings in localStorage ingenium_cloud, never carried: r143's protectedKey). Bringing in is r143's Merge (each item by
  its own date, the desk kept on the recovery shelf first), then what belongs to one device is put back as it was (its models, the
  computer it borrows from and its online connection, its window and side bars, dictation, app library), then what was deleted
  elsewhere is deleted (each device compares the ids its lists held at its last sync with those they hold now; a change made after a
  deletion wins), and the conversation open on the device that worked last becomes the open one. By itself (on by default): a send a
  minute after a change made by her (an unchanged desk is not sent), a look every minute; new work is announced at the foot of the
  window and brought in when she says, or by itself when she is not typing if she chooses. Away: a sync file sealed with the same
  passphrase (r143's seal), merged the same way. Settings, Your data, Ingenium Cloud (r234; r173): three numbered steps, the one she
  needs open.
- Not in this stage: the app library (each device keeps its own: every Ingenium carries her apps' builds, and a library's entries name
  pieces kept on that device); connection keys and signing keys (each device keeps its own, as in a backup without them); a Cloud kept
  by a device that is not a computer (a page cannot listen on the network); Bluetooth (a page cannot exchange data with another
  computer over it).

- Her choice for dictation (8 November 2026), "Carry them": the Mac builds (build-mac.yml, ingenium.spec, in Mini and Intel) and the
  installed Windows app (build-windows.yml, ingenium_win.spec, its folder build only) fetch speech-vendor.zip from Mini's release, check
  it against tools/speech_vendor.sha256 and carry it as speech/ beside the page, which the app's own server serves (r254 reads it
  first). The portable Windows program does not (it unpacks itself at every start); a fetch that fails or a fingerprint that differs
  builds the app without it (continue-on-error), and dictation then fetches its model once.

    node rig/t_657_cloud.js <page url> <box address> <pairing code> <the box's cloud folder> <out>   # two devices and a third: 14 checks
    (the box: python3 rig/run_app.py <folder with ingenium_app.py patched and ingenium.html> <api port>, then POST /call/cloud_box_set [true])

Ingenium 6.56 (8 November 2026): dictation written on the device with Scriba's speech models, Carpe Diem 1081 in Lector, and Lakay
Build 6. Her words (8 November 2026): "I want for Scriba and its speech models to be wired into the Chats pages compose text box instead
sending it outside of the app to another provider. I want everything kept in-house where possible. Lector quotes a much older Carpe Diem
build 1058 when it should be 1081"; and "The Lakay has been updated to a later build, please update Ingenium's copy to bring it up to date."

- modules/r254.js (new): the microphone key in the message box (Chat and Code share it) used the browser's speech service, which in
  Chrome and Edge sends the sound to Google or Microsoft. It now writes with Scriba's own models in a worker on the device: Moonshine
  base for English, Whisper base for French, Haitian Creole and Spanish (transformers.js 3.8.1, the version Scriba uses). Each phrase is
  cut at a pause, resampled to 16 kHz by the browser's own resampler (the plain average Scriba uses wrote "colour letter" for "cover
  letter" on one test recording; the resampler wrote every word right), and written into the box. The engine and the model come from
  speech/ beside the page when an app carries it, else from the device's own copy (Scriba's store and transformers.js's cache, so
  either fills both), else once from the internet, kept from then on. Settings, Models and AI, Search, eyes and ears (r234; r173)
  holds the Dictation card: the language, Get it ready now (to fetch it before travelling), and the browser's service, off unless she
  turns it on; r180's note about the sound being sent away now shows only then; build_page.py makes the page's own listener (R50) act
  only then. The Mac apps' Info.plist asks for the microphone with its reason (NSMicrophoneUsageDescription; ad hoc signed without the
  hardened runtime, so no entitlement is needed). Not done yet: the Fire and iPhone/iPad apps do not pass the microphone to the page
  (no RECORD_AUDIO and no onPermissionRequest on Android; no microphone line in the iOS Info.plist), so dictation there waits for a
  later stage.
- source/speech/fetch_speech.mjs and .github/workflows/speech-vendor.yml (new): GitHub's machines fetch the engine and both models
  with transformers.js itself (the files the page asks for, dtype q8), transcribe recordings made there with espeak-ng, list every
  file with its SHA-256 and keep them on the release "speech-vendor": engine 21.5 MB, Moonshine base 63.8 MB, Whisper base 76.0 MB.
  On GitHub's machine: "Please summarize the three chapters of my thesis and list the questions that are still open." (6.0 s of speech,
  0.2 s to write) and "I would like to write a cover letter for a remote learning designer role." (both word for word).
- Carpe Diem 1081 (2026-11-01, 528171081, the full edition, 48,542,093 bytes, from Carpe-Diem-Gift's newest branch, identical in its
  Mac, Windows and Fire projects) replaces 1058 in apps/builtin. apps/update_builtin.py now tells The Forge from Carpe Diem by the
  page's title (both carry a Forge section, and their build stamps lie past the first 400,000 characters, so 6.55's version could
  read neither). recipe/recipe.json: the full edition's figures Lector quotes are measured from 1081 (48.5 MB and 71,186 lines,
  split as r126 counts them); the builds the recipe was written for (1058) stay as the old values a document may still carry.
  The page is 95.5 MB (1058 took 25.7 MB of it; 1081 takes 42.5 MB, most of it Carpe Diem's own compressed source and its film), under
  GitHub's 100 MiB limit for one file with about 9 MB to spare.
- Lakay Build 6 (2026-11-07, 1,091,377 bytes, the same page in Lakay-Apps, Lakay-Mac and Lakay-Windows) replaces Build 3. Its Spiral
  is now a coin in sixteen planes (the edge in four, the plate, the engraving, two shadows, the halo, the shell's sides in three, the
  shell, the lattice, the pearl, the sparkles); apps/lakay_mark.py reads them from src/js/09-crest.js (PLANES) and keeps each at its
  own depth (none marked side, which Ingenium's renderers would move to one fixed depth), and lays its still seal flat from the planes
  of Lakay's own still mark.
- Verified, no change: the Career Studio's + Bring one on Today is purple by day and by night (6.21's change holds).

    node rig/t_656_ears.js <url> <out> <English WAV> [<French WAV>]   # dictation on the device, nothing sent away, Settings: 19 checks
    node rig/t_656_cd1081.js <url> <out>                              # Carpe Diem 1081 carried, kept, named and measured by Lector: 6 checks

On the release page: t_656_ears 19/19 (English word for word through the fake microphone; French by Whisper base on a synthetic voice:
"Bon, je vous reste à créer une lettre de motivation pour un poste à l'istreuse", for "Bonjour, je voudrais écrire une lettre de
motivation pour un poste à distance"), t_656_cd1081 6/6, t_633_settings 17/17 (the Dictation card beside the eyes keeps Search, eyes and
ears under 1,650 pixels; a look into the speech store no longer makes it), t_655_fixes 26/26 with the three other editions (none names
Lakay or Carpe Diem 1081: editions.py leaves out their two lines of news), t_627_editions 20/20, t_615_tour 20/20, t_651_still_keys 25/25,
t_695_memory 30/30, t_611_code 37/37, t_6111_popups 17/17, t_616_scroll 9/9, t_700_lock 58/58, t_634_docs 17/17, t_635_newer 10/10,
t_628_train 19/19, t_703_studio 25/25, t_614_connectors 24/24, t_6112_found 10/10, t_632_sealed_stores 21/21, t_6101_device 14/14,
t_633_reset 12/12, t_617_effort 15/15 and t_618_workshop 19/19 (with rig/mock_agent_server.py). Failing on 6.55 in the same way, so
not new: t_626_guide 26/27 (its list of the Guide's rooms predates 6.46's topics), t_613_github 41/43 (its slash-command checks predate
6.47's commands), t_61_backup 44/45 (the browser closes during its last part).

Ingenium 6.55 (7 November 2026): the greeting card's keys as every key, Check with Blend in 3D, the chat greets her by name, Lector
answers at once, Lakay among her apps, and a Mac start that never opens without her work. Her words (7 November 2026): "The Link your
file again, take the guided tour, Read the short guide are the ONLY stupid buttons that don't lift when I hover over them and make no
sound and just look stuck to the card ... I want both the sound and animations restored for those buttons"; "The Check with Blend button
looks flat and has that glossy look with the heavy purple shadow"; "Clicking on any of the 4 apps inside of the "Your apps" section of the
Lector page feels really heaving and slow"; "I want the Chat pages inside of Ingenium to be aware of who I am and actually greet me like
the Home page does"; and of Lakay: "I want its latest build embedded into Ingenium just like my other apps so that I can continue working
on it and developing it further." She approved the preview before it shipped.

- modules/r147.js: the greeting card's keys keep 6.53's size and white face and take Ingenium's own keys' edge, casts, rise (2px, the
  edge to 3px), press (1px, the edge pressed in) and spring, measured from .btn and .btn.primary on Chat and Models, by day and night.
  modules/r176.js: they, Home's rows of recent work and Check with Blend are among the keys that sound (they never were).
- modules/r218.js: Check with Blend keeps its lilac face; its bright top line and violet glow give way to a solid edge (#c9b6ea), soft
  casts in the page's shade, the keys' rise and press.
- build_page.py: the empty Chat and Code pages find her name as Home does (her profile, else the author's name Lector writes under; its
  first word); Code's empty page greets her and asks what to build beneath.
- Her screenshots of the evening showed Chat, Code and Models empty. Measured: the 6.53 and 6.54 pages show the same Chat, Code and Home
  with the same data (rig: the same text and keys, no errors). The Mac app keeps her work at one address (127.0.0.1:17953, R58); a copy
  that cannot take that port opens at the next, with a store of its own: empty. Two ways to get there were found and closed in
  build/desktop/app_port_655.py: another Ingenium still holding the port (this copy now says so and ends; Windows already stopped a
  second copy), and a copy opened again within the minute the closed one's connections linger (TIME_WAIT; the server now reuses its
  address on the Mac and Linux, SO_REUSEADDR, which still refuses a port another program listens on). Her work stays at 17953.
- Lector (modules/r253.js, new; r108.js, r158.js): choosing The Forge read its 14 MB page and prepared it (pictures set aside, code,
  styles and markup separated, words, notes and inventory gathered) on the page's own thread: about 1.4 s, in pieces of up to half a
  second (with the computer slowed four times: pauses of 0.7 and 1.9 s; Inkwell 1.8 and 3.8 s). The same preparation now runs in a
  worker built from the page's own functions (the same result for all five apps, compared whole), from the bytes the library keeps,
  handed over without a copy; the brief's parts are counted once for each depth and model memory; a tile's seal is made once and moved
  into the tile drawn again (a click redrew 31 pictures, half a megabyte). Choosing The Forge now leaves no pause above 0.1 s (57 ms).
- Lakay (apps/builtin, apps/update_builtin.py, apps/lakay_mark.py; build_page.py, editions.py; modules/r120.js, r240.js, r112.js,
  r109.js, r147.js): its latest page (Build 3 of Lakay-Windows, 7 November 2026, its fingerprint as its repository publishes it) is
  carried in the master edition, checked and kept on first start; the library knows it by name, its page and its build number; it is
  listed after the four, by name and in its colour, in Lector, Fabrica's app library and wherever her apps are listed, with its Spiral in
  seven layers (its own depths) and its seal; brought into Fabrica, it is an app with its mark. update_builtin.py now takes any of the
  pages it knows, in any order, and keeps the others as they are. No other edition carries or names Lakay.

    node rig/t_655_fixes.js <url> <out> [other=<edition url> ...]   # the keys, Check with Blend, the greeting, Lakay, Lector (23 checks)
    python3 rig/t_655_port.py <repo>/ingenium_app.py                 # a second copy, a quick restart (6 checks)

Ingenium 6.54 (7 November 2026): 6.8.7's motion again, Home's sparks drawn lightly, and the greeting card's keys. Her words (7 November
2026): "I want the 3D look and animation of build 6.8.7, I want everything else to stay the same in Ingenium. I only want for the buttons
inside of the "Good morning, ..." card on the Home page to be made slightly smaller but keep the acrylic chunky look"; "I like the white
colour of the "Take the guided tour" and "Read the short Guide" buttons from 6.53, I want to keep the colour for the buttons but remove
the glossy, flat effect and animation"; "I also really like the smaller size of 6.53's buttons inside of the app. I want that kept as
well"; "Keep the colours from 6.53." She saw a preview (the card's keys in each state, and Home moving) before it shipped.

Measured against the 6.8.7 release page from the history (git show 749ea1e:ingenium.html), in Chromium, on the common keys of eleven
pages at rest, under the pointer and pressed: most have 6.53's faces and shadows; some were made smaller in 6.38 (the greeting card's
keys, the rooms' tabs, the Career Studio's tabs), which she keeps; a few were redrawn since (Build's Copy, Open and Download, the Guide's
list of topics), and the side bar's apps were plain rows (Carpe Diem's stones since, kept). What 6.53 lacked was the motion: 14
animations ran on 6.8.7's Home with the pointer still, none on 6.53's.

- The motion of 6.8.7: modules/r248.js (the seal and Home's sparks at rest) is out of the build; modules/r251.js keeps only the rail
  arrow's plain face; modules/r118.js no longer rests the apps' key glows in their frames; modules/r140.js moves a crest's quarters
  whenever it is on the screen (resting them only where they cannot be seen), as before 6.51.
- modules/r252.js (new): Home's stone sparks were six growing backgrounds of one layer behind four glows, worked out and drawn again
  for every frame on all seven stones (Home with nothing touched, computer slowed four times: 76 % busy on 6.8.7, 80 % on the 6.54
  page with them as they were, 11.5 % without them). Each stone now has one picture of the star, as large as the stone, moved to each
  place while it is nothing and grown there by a transform the graphics chip draws (translate(x%,y%) scale(s) translate(-17x px,-17y
  px): the star's own x% y% point at the stone's x% y% point, as a background of 17s px at x% y%); its glow is drawn once. Frozen at
  twelve moments of the beat, the old and new sparks have the same place and size. Home with nothing touched: about 10 %. Under a
  moving pointer Home is still busier than on 6.53 (about 80 % against 52 %): every moving thing's style is worked out again whenever
  the pointer changes what it is on; the seal's star, heart and ring (moved inside its picture) are the next largest part.
- modules/r147.js: the greeting card's keys keep 6.53's size (13px, 34 to 36px) and faces; the white keys' bright top line and thin
  foot give way to a solid edge 2px deep (#d9d4e0 by day, #120d1c by night) and their casts; no key in the card has a transition,
  rises or springs; pointed at, a white key's rim darkens and the purple key lightens (brightness 1.06); pressed, a key sits 2px down
  into its edge at once.
- rig/t_654_motion.js (new): 6.8.7's animations on Home and Chat (read from the 6.8.7 page with ref=), the sparks' beat, place and
  size, the crest's quarters on and off the screen, the greeting card's keys at rest, pointed at, pressed and by night (14 checks).
  rig/t_651_still_keys.js and rig/t_653_look.js expect the motion now.

    node rig/t_654_motion.js <url> <out> ref=<the 6.8.7 page>   # 6.8.7's motion; the sparks; the crest; the greeting card's keys

Ingenium 6.53 (7 November 2026): the keys and surfaces of 6.9.4 again; a page that keeps still; the Offline Project as an ordinary
app in Fabrica; the tour, the Guide and Help up to date. Her words (7 November 2026): "I honestly just want Ingenium reverted back to how
it used to look before you started messing it the graphics. I want all of the edits and updates kept but I want my app to look like how
it looked prior to this as far as the buttons. Perhaps how it looked on 6.9.4 or somewhere around that build"; "Th + button and the mic
buttons on the chat pages need to be reverted to how they used to look ... They used to look flat and like they are a part of the compose
box"; "it is mostly slightly faster but still slow on my Macbook pro"; "The Offline Project app looks odd on the Fabrica page ... It
should only be there only if I was working on it inside of Fabrica and recently shipped a new version like any other app"; and "Please
make sure that the guided tour and its demonstrations are also updated as well as the Guide page". (A first draft of 6.53 drew Carpe
Diem's recipe in slate; she asked for 6.9.4's look instead, before it was pushed, and saw a preview before it shipped.)

- The keys: modules/r247.js (6.49's recipe, its rooms' copies and its raised quiet keys) is taken out of the build; the key recipe of
  modules/r248.js (6.51) is taken out, its seal and Home's sparks at rest kept; modules/r251.js keeps only the page at rest. Chat's +
  and microphone keys have the base page's plain look (an outline in the message box); the model key's ring while nothing answers
  (modules/r244.js) is gone. Measured against the 6.9.4 release page from the history (git show aa50c44:ingenium.html; rig/t_653_look.js):
  every common key and surface on Chat, Home, Settings, Models and Blend has 6.9.4's shadow, face, border and motion.
- The page keeps still: the rail's icons (the notepad, the hourglass, the bell, the moon), the seal's sway, the crest's sway, the top
  bar's breathing dots and the Guide's spark animated without end; they move while the pointer is on them (modules/r251.js). With the
  pointer still on Chat, no CSS animation runs. Only two glass blurs were in use (the welcome door, which Carpe Diem's door has too, and
  the rail's arrow); the arrow's is gone.
- modules/r246.js: no tile above Your apps. Bring one in offers The Offline Project, all four apps or without Inkwell (kept as a
  repository named The Offline Project, or a new version of it when it is already there), and its own card (each app's copy, the hall,
  Make and open, Save the app). Kept, it is listed in Your apps as any app, with its crest (modules/r112.js, as since 6.40).
- modules/r250.js (new): the tour gains Who answers, from any page (every level), Connect a service, Context and compacting, How long it
  thinks and sources when you ask, and (the master edition) The Offline Project, made from your apps, each after the card that shows
  that part of the page and placed once Ingenium has started; the Guide gains Models and services: who answers, and how; Context and
  compacting in a chat; Thinking and sources in a chat; and (master) The Offline Project, made in Fabrica; Help gains their lines.
- rig/t_649_keys.js (6.49's recipe) is retired with that recipe; rig/t_651_still_keys.js keeps its stillness checks and leaves the
  keys to rig/t_653_look.js; the Offline Project's tests open its card through Bring one in (rig/t_648_offline.js,
  rig/t_651_offline_lists.js); rig/t_62_import.js follows 6.46's Ollama memory and 6.47's compacting.

    node rig/t_653_look.js <url> <out> ref=<the 6.9.4 page>      # every common key and surface as in 6.9.4; the + key plain; no glass;
                                                                  # nothing animates untouched; the Offline Project in Fabrica
    node rig/t_653_tour.js <out> master=<url> full=<url> gift=<url> demo=<url>   # the new cards, rings, Guide topics and Help lines

Ingenium 6.52 (7 November 2026): Longest reply, Context and Effort kept for each model and service, and at hand on every page. Her
words (7 November 2026): "I want the Tokens and Context controls to be fixed inside of Ingenium, the app always resets it to zero with
the models even though I already moved it to a higher capacity earlier, it never remembers them and they are all out whack all over
the app, I can only regulate it on the chat pages which is not really convenient since that I cannot regulate it on the other pages
that are running these models and I can't adjust the effort level."

Measured on 6.51 (rig/t_652_gen.js repeats it): the chat's Controls kept Longest reply, Context and Effort only inside a model on
this device (its tokens, ctx and effort); with a connected service (Claude, OpenAI ...) or with nothing set up, nothing was kept,
so after a reload Longest reply was 1,024 tokens and Effort Medium again (the service's memory, state.cloud.window, was kept).

- modules/r249.js (new): state.gen keeps {tokens, ctx, effort} for each answerer ("m:<model id>", "c:<provider>|<model>", or
  "none") and the last chosen; every change she makes (the chat's sliders, the effort menus, the model key's controls) is kept;
  at start and whenever who answers changes (a saveState after which the answerer differs; refreshChatNote) the answerer's own
  come back, else a model's own numbers from before 6.52, else the last chosen. The sliders' room is set first from
  ingReplyMax and ingCtxMax, so a large value is not cut to the page's default room. Changes the effort module makes for one
  message (Auto, Ultracode, the reply that follows the effort) send no input event and are not kept.
- modules/r244.js: the top bar's model key (Who answers) holds How it answers: Effort (Auto and the five levels), Longest reply
  (with Follows the effort, which is the effort module's replyAuto; moving the slider sets it by hand) and Context (a model's
  window, or a service's memory, mirroring the Controls' ctlCloudCtx); the arrow keys move a slider there, not the menu's focus.

    node rig/t_652_gen.js <url> <out>   # nothing set up, a service, a model: kept over a reload; each keeps its own both ways; a
                                        # first use starts from the last chosen; How it answers on Settings and Lector, the same
                                        # values as the Controls, kept (13 checks)

Ingenium 6.51 (7 November 2026), its second part: a page that keeps still, keys that stand up from it, and an empty Chat page
without ready-made ideas. Her words (7 November 2026): "The buttons inside of Ingenium still feels flat and are missing the popped
out 3D animated look and effect and everything feels really freaking slow when I move my mouse around inside of the app. I HATE IT
and I already told you to fix this many times!" and "Please remove the 4 prompt buttons from the Chat's page ... please only keep the
"Connect a service" and "Get a model" on there, it looks too crowded and cluttered at the moment."

Measured on the 6.51 test page in Chromium with the computer slowed four times (CDP Emulation.setCPUThrottlingRate 4; Performance
metrics TaskDuration over 5 s with the pointer still, then over a sweep of 122 pointer moves), on the Chat page: the main thread was
busy 37 % of the time with nothing touched and 56 % while the pointer moved; now 4 % and 27 %. What did it:

- modules/r173.js: Blend's step keys were painted again 30 ms after every change of a hidden attribute inside Blend's card, and the
  painting itself set Back's hidden (to the same value), so it went on for ever, on every page, from the start (Blend is built at
  start): about 30 rewrites a second, each waking the page's watchers. Each part is now written only when it changes (idle 37 % to
  8 %). The same fault, at 170 rewrites a second while the Guide was open, was in the Guide's What's new key (modules/r230.js, its
  version number); and smaller ones, once or twice a second, in the who-answers key and the top bar's pill (modules/r244.js, every
  1.5 s), the chat's pace chip (modules/r116.js, every 0.5 s), the thought cloud's number (thoughts/thought_cloud.html, at every
  save) and the storage gauge (modules/r142.js). All write only what changes now.
- modules/r248.js (new): the Ingenium seal's star, heart, ring and breath move inside its picture, which the browser cannot hand to
  the graphics card, so the page was painted again for every frame of them (idle 8 % to 5 %, sweep 48 % to 29 %). They rest now, and
  move while the pointer is on the seal (or it has the keyboard's focus) and on the welcome door; the seal's sway, which the graphics
  card draws, goes on. Home's app stones sparkle while the pointer is on them (their sparks, four glows each, grown by the main
  thread, made Home work out its styles about 55 times a second: 174 times in 3 s, now 31). In the apps' frames (modules/r118.js),
  Tabula's and Abacus's app keys glow and sparkle while pointed at (Tabula's page: 367 style passes in 3 s, now 72).
- modules/r140.js: a live crest's quarters (the Offline Project's, in Fabrica, Lector and the lists of apps) move for 6 s each time
  the crest comes into view and while it or its key is pointed at, then rest; their motion is drawn inside the crest's picture
  (Fabrica, nothing touched: 26 % with them moving, 5 % at rest). Both pictures are kept, so the change is immediate.
- modules/r248.js, the keys (measured against Inkwell's, The Forge's and Carpe Diem's own pages: a shaded face, a drawn rim, an edge
  beneath, a 3 px rise on a spring; Ingenium's face was white to #f9f7fc and its edge 1.5 px at 18 %): by day a key's face shades from
  white to #ebe4f6, with a bright top line and a soft shade along its foot; beneath it a lavender edge 2.5 px deep (the accent at
  20 %, a colour rather than a darker shadow, after "Please reduce the heavyness of the buttons", 6 November), and soft casts. Under
  the pointer it rises 3 px on a spring (0.22 s, a little past and back) and its edge grows to 3.5 px; pressed, it sinks 2 px into
  its edge in 0.05 s. No key changes size. The recipe sits in the head after 6.49's and ahead of the Author Studio's look, so Soft
  and Deep still win; Display's Flat depth, the night theme and reduced motion keep their own ways.
- build_page.py: the empty Chat page keeps its greeting and, while nothing answers, Connect a service and Get a model (modules/r244.js);
  its four ready-made ideas are gone (Code's four, for an open app, stay).

    node rig/t_651_still_keys.js <url> <out>   # left alone on Chat, Home, Settings, Blend and the Guide nothing is rewritten and
                                               # styles are worked out only now and then; the seal, Home's sparks and Tabula's keys
                                               # rest and move when pointed at; Blend's steps, the who-answers key and the thought
                                               # cloud's number still work; the keys' recipe and motion; night, Flat, reduced motion;
                                               # the empty Chat page (39 checks)
    rig/t_649_keys.js follows the new recipe (its token, rise and press checks).

Ingenium 6.51 (7 November 2026): the Offline Project in the lists of her apps, and its hall's words edited in Code (the master edition
alone; her answer of 7 November: "Fabrica and app lists").

- modules/r246.js: Code's Your apps (IngApps.choose) and the + menu's One of your apps (paintPlus("apps")) list both variations; each
  is made fresh when chosen and handed on as any of her apps is: a Code project of its page, or the page staged with the next message.
  Fabrica's card has a row for the hall: Edit its words in Code opens the hall's page in a Code project of its own (The Offline
  Project's hall, marked opHall, made once from the hall Ingenium carries); every making uses it while it keeps the four places the
  build fills, until she chooses the hall Ingenium carries again (state.opMake.ownHall). Lector is left as she asked in 6.43: choosing all
  four apps, or the three, gives the set its crest, drawn from the apps kept now.

    node rig/t_651_offline_lists.js <master url> <out>   # both variations in Code's Your apps and the + menu; the hall edited in Code and
                                                         # used by the making, then the hall Ingenium carries again

Ingenium 6.50 (7 November 2026): the three levels, one card size. Her words (7 November 2026): "The "New to this", "Some
experience", and "Expert" cards are all different sizes and length and they look really weird on the "Help and the guided tour"
section of the Settings page, please fix this."

- modules/r166.js. Measured on 6.49 at 1440 by 900: Settings drew the three as wide as their words (340, 260 and 340 pixels) and
  as tall as their lines (67, 51 and 67); the tour's first card drew them one width but three heights (69, 52 and 52); the Guide's
  Start here one width and three heights (73, 57 and 73). Now Settings' card and the tour's first card hold them in a grid of one
  column whose rows share the tallest's height, their words at the left. Her second word, the same day: "The cards are still too
  wide." So on Settings they are 260 pixels wide, the width Some experience had: the narrowest at which none needs a third line (at
  250 New to this takes three and all three grow from 67 to 84 pixels tall). The tour's first card keeps them as wide as the card,
  a dialog's choices. On a narrow screen the column narrows and the three stay alike.
- modules/r243.js: the Guide's Start here gives the three one height the same way, 270 pixels wide at most (its cards have a
  little more room inside; at 260 all three would take three lines).

    node rig/t_650_levels.js <url> <out>   # the three, one width and one height, in the three places, at 1440, 900 and 390 pixels
                                           # wide and by night; 260 pixels on Settings and 270 in the Guide at most; a press and the arrow keys still choose

Ingenium 6.49 (7 November 2026): keys that rise and seat, elevated and refined. Her words (6 November 2026): "I want Ingenium to have
that analogue look and feel, I want it to have that animated mechanical 3D feeling match Carpe Diem, The Forge and Inkwell's animation
and vibe to stay cohesive and match the rest of the Offline Project." and "I don't want the buttons to be made bigger or wider. I just
want them to look more weighted and 3D animated. I want them to look like clickable buttons and not just flat." Then: "Please reduce
the heavyness of the buttons, it looks a little too intense and take away from the look of the app. I want it to look elevated and
refined." Built on the other session's 6.48 (claude/blissful-heisenberg-1osldl).

- modules/r247.js (new). Measured in the three apps' own pages (6 November 2026): The Forge's and Carpe Diem's keys rest on a dark
  edge 2 px deep at 30 % with casts at 20 % and 13 %, drawn by a crisp rim (The Forge's at 26 %); Inkwell's rest on four casts (30,
  26, 18 and 11 %). Ingenium's had the same shape at 25, 16 and 10 %, but its rim was a 10 % hairline, so on a white card a key read
  as paper with a shadow under it; its top bar pills were at less than half the family's weight; Chat's + and microphone keys, the
  ideas on an empty chat, Lector's Copy and Home's See all had no edge at all. A heavier draft at the family's weight (2 px at 34 %,
  four casts) was set aside after her second message. Now every key has a fine outline (half a pixel at 20 %), a thin edge beneath it
  (1.5 px at 18 %) and a soft, wide lift (3 px at 10 %, 18 px at 9 %); under the pointer it rises 2 px, its edge grows to 2.5 px and
  its lift spreads (16 px, then 30 px); pressed, it sinks 1 px, a little smaller, into its seat in 0.05 s and springs back. The top
  bar's pills have the same outline on a 1 px edge. The rooms' own copies of the key (Lector, Fabrica, the backup card, the Career
  Studio, the setup card, the tour and help, Home's large keys) follow the one recipe by day; the keys above a chat or a Code session
  wear the night's recipe by night, where they kept the day's. The keys that were words or bare outlines are raised keys now, each at
  its own size. No key changes size: the outline is a shadow and takes no room. The recipe is placed in the page's head, ahead of
  the Author Studio's look, so a depth chosen there still wins; Display's Flat depth, the night theme and reduced motion keep their
  own faces.
- modules/r236.js (the master edition): the Author Studio's Look keeps its depths either side of the own keys: Soft is lighter still
  (a fine outline and a faint lift; it was a raised key with a white glare, softer than the own key); Deep is the heavier key with
  the family's weight (it was a 3.5 px edge). The ready look Ink keeps Soft.

    node rig/t_649_keys.js <url> <out> [ref=<an earlier page>]   # the recipe on every kind of key; no key bigger or wider than on
                                                                 # the earlier page; the rise and the seat; the Author Studio's Soft
                                                                 # and Deep; Flat; night; reduced motion
    node rig/t_637_author.js <url> <out>                         # its Deep check follows the new recipe (2 px at 34 %)

Ingenium 6.48 (7 November 2026): the Offline Project, made from her apps, in Fabrica (the master edition alone). Her answer
(7 November 2026), asked how the Offline Project should be built into her master edition: "Fabrica and app lists": in Fabrica she
chooses all four apps or the variation without Inkwell, and Ingenium builds it fresh from her current apps, to try, edit and package
it, and both variations are listed with her apps, each built fresh when opened. And her answer of 6 November (6.45): "Yes, the app
library stop keeping saved copies of the Offline Project's page".

- modules/r246.js (new, the master edition's alone; build/editions.py leaves it out of the others). Measured on 6.47: the Offline
  Project was made only by source/offline_project/master_demo/build_master_demo.py, a Python program run by hand on a computer with
  the four apps' demonstrations beside it. Now Fabrica's list of apps opens with The Offline Project, wearing its live crest; its
  work shows the two variations and each room's copy (the copy the app library keeps now, or its earlier copy where one is kept; what
  each is is said, and Ingenium's room says when it holds this copy, the master edition), and Make and open or Save the app: the
  one-file app of build_master_demo.py's app mode, made in the window: the hall (site.html) with the build's table (the apps inside
  the page, their versions and the line that names them, the seals from the page's own ING_SEALS, the devices' pictures, the icons),
  and each app's page with the three things that program adds at its top (its own corner of the storage, the key back to the hall,
  no scroll bars), compressed (CompressionStream) inside the page. It lives in the window's memory until it is saved; nothing is kept
  in the app library. source/offline_project/master_demo/make_op_data.py writes source/build/op_make.json (the hall compressed, the
  devices' pictures at most 720 pixels high, the icons drawn from master_seal.json as the Python program draws them, the loading
  page's shield, and the three additions taken from build_master_demo.py word for word); build_page.py carries it where her apps
  ride along. Next (6.49): the website (a zip), the hall's words edited in Code, and both variations in Lector's, Code's and the +
  menu's lists of apps.

    node rig/t_648_offline.js <master url> <out>   # Fabrica's Offline Project: the rooms, Make (four and three apps), the page made
                                                   # (the hall, its table, the apps inside, each with its shim), opened, and saved

Ingenium 6.47 (7 November 2026): context and compacting, slash commands, connectors in Code's + menu. Her words (6 November 2026): "I want
for Ingenium's sessions to be automatically compacted like they are on Claude's code chats, the same for the regular chats. I want the
option to have it compacted automatically or to click and compact it myself if I choose to. Please add that function to Ingenium. I also
want the option to add connectors and slash commands in the coding chats in Ingenium. I want full parity with Claude's chat pages for
Ingenium's chat pages please."

- modules/r245.js (new). Measured on 6.46: a conversation longer than the model's memory lost its oldest messages quietly at each send
  (the window moved on; once twenty messages had gone, r195 wrote a summary of 250 words in the background and recalled it with the
  newest message); nothing showed it, nothing could be pressed to do it, and it could not be turned off. The memory key opened
  Controls; Code's session column showed the share used and nothing to do about it; "/" did nothing except in a Code session on a GitHub
  repository (r219's six commands); Code's + menu had no Slash commands, and Connectors stood eleventh in it.
  Now Context opens from the memory key, /context and Code's session column: the share of the model's memory the conversation fills
  (an estimate at 3 characters a token on this device, 2.5 for a connection, and the model's own count of the last reply when it gave
  one), part by part (instructions, the earlier part's summary, the conversation, files, the room kept for the reply), when it compacts by
  itself, Automatic on or off, and Compact now with what to keep in focus. Compacting asks the model in use to summarise everything before
  the newest messages (a quarter of the memory at most, the last exchange at least, twelve messages at most), in rounds that fit its
  memory beside the summary so far, building on the summary already written (c.summary, c.summaryN); the boundary message is marked
  (winStart, compactStart) so the conversation sent starts there, and r159's and r195's recall gives the model the summary in that
  part's place (r195's brief now says the part was compacted). Every message stays on the page; a line marks the boundary, with the
  summary to read. Automatic (state.compactAuto, on by default) compacts before a message is sent (sendRec) when the conversation would
  fill more than 85 percent of the memory and a model is ready to write the summary; Stop ends it. Slash commands: "/" at the start of
  the message box opens the list (arrows, Enter or Tab, Escape), a command sent runs (the send key too): /compact, /context, /clear, /model,
  /connect, /connectors, /effort, /think, /fast, /research, /web, /remember, /help; in Code /plan and /session, and on a GitHub repository
  r219's six in the same list (r219's own list stands aside). The + menu has Slash commands; Code's + menu opens with Add files or
  photos, Slash commands and Add connectors. Code's session column has Compact now, Automatic and Details beside its Context bar.

    node rig/t_647_compact.js <url> <out>   # a stand-in model on this device: Context, Compact now (the summary in the earlier part's
                                            # place, the line, every message kept), Automatic before a send and off, the focus,
                                            # the slash list and commands, the + menus, Code's column

Ingenium 6.46 (7 November 2026), its second part: who answers, at hand. Her words (6 November 2026): "Switching between providers and connections in
Ingenium is really tedious and the whole setting is hidden and not very visible or accessible to new users. I want that process to be
improved and be more acessible to me, its a bit flawed right now."

- modules/r244.js (new). Measured on 6.45: connecting a service took Settings, Models and AI, Connections and a form of five fields (the
  provider, an address, the key, a model's name typed or listed, a switch), and going back to this device took Controls; with nothing set
  up, the model menu beside the message box said only "No models yet. Add them on the Models page."; the top bar's model key named the
  model on this device even while a connection answered, and opened the Models page; the key beside the message box showed the device
  model's colour beside a connection's model and not whose model it was; Controls' A connection, with nothing set up, sent her to
  Settings; the key field had none of the page's look (its style for fields left out password, email and address fields).
  Now Connect a service, in three steps (the service; the key or the address, with where to make a key; a model from the list the
  service gives, the strongest suggested, Find a model for long lists), opens from the model menu, the top bar, Controls, Settings and an
  empty chat; a refused key (401, 403), a missing address (404), a limit (429), a service down, Ollama or LM Studio not running, Ollama on
  another computer not letting the network in, or a browser refusing are each said in plain words. The connection is kept as before
  (r191, the key on this device only) and used at once. The model menu opens on Who answers: This device and each connection kept, one
  press each (the model last chosen there), the one answering marked, then the models, the place answering first; Find a model searches
  every model of every connection (r191's menu shows fourteen of each) and of this device; Connect a service at its foot. A model on this
  device chosen there answers from this device. The top bar's key names who answers and opens Who answers under it, to switch from any
  page without leaving it (arrows and Escape work). The key beside the message box carries the service's name beside the model, and with
  nothing to answer says Choose who answers. Settings' Connections card opens on Connect a service and the connections kept, with the
  form by hand folded under them. Key, email and address fields have the page's look everywhere. Help (r144) and the tour's step on the
  top bar (build_page.py 6.46) say what the key does.

    node rig/t_646_switch.js <url> <out>   # stand-ins for Anthropic, Ollama on another computer and a service with 41 models: nothing set up;
                                           # the sheet's three steps; the menu's Who answers and Find a model; the top bar; Settings

Ingenium 6.46 (7 November 2026): a model thinks briefly and answers; sources when she asks; titles shown twice removed; every
provider within its model's limits. Built on the other session's 6.45 (claude/dreamy-fermi-9ourlk), whose lighter presses (r230,
r172) stand in for the same two fixes made here. Her words (6 November 2026): "The models inside of the chats of Ingenium spend more time debating the prompts and saying "Wait"
and rechecking everytime and it takes ages for them to stop "Thinking" and reply"; "I also don't want sources and citations provided to
me with every reply inside of the app, I only want them provided when I ask for them"; "The "Side bar" title is repeated twice inside of
the Author Studio ... There is a couple more of that occurence around the app".

- modules/r241.js (new). Measured: a model on this device thought as long as it liked: the thinking budget of 6.11 (R101: 1,536 to
  6,144 tokens by the model's size, twice or four times at Extra or Max effort) was kept only by the computer app's engine, and nothing
  noticed a model going round in circles; the standing instructions asked every model to "check your work". Now How long it thinks,
  beside Thinking (Brief, the default, about 700 tokens, 1,400 at Max effort; Standard, the model's own budget; Deep, twice that; No
  limit), sets the budget; Engine.generate passes through ingThinkBudget (build_page.py 6.46), which watches a reply that thinks (in the
  engine's reasoning channel or in <think> written into the answer): past the budget, or the same sentence a third time, or "Wait",
  "Hmm" and "let me check" again and again, it stops the thinking and asks the model once more, without thinking, with its notes, and
  the answer comes in the same reply; the thoughts say why. The computer app's engine keeps its own budget (llama.cpp ends the thoughts
  itself) and is watched for circles. Only when it helps (on unless she turns it off): a short, simple message is answered at once,
  without thinking; a message that needs reasoning (why, explain, compare, plan, code, figures, a file, a long message) still thinks.
  The standing instructions now ask a model to think a question through once, decide and answer (Your Ingenium's careful thinking,
  Magister's layer, and a line for a model on this device that thinks).
- Sources when she asks: the web search and Research tell the model to cite only when her message asks for sources, citations or
  references (ingCiteRule, in place of "Cite them by number" in both prompts); otherwise the answer carries no numbers or list, and the
  sources wait under the reply behind a Sources key. When she asks, they are cited and shown as before.
- Repeated titles (found with an audit that opens every page, room, tab and part): the Author Studio's Side bar room (its head said
  Side bar and the card under it The side bar, with the same sentence twice); Settings' licence card (the licence document repeated the
  card's heading as its own title; thoughts/permit_core.html); the Career Studio's Today (its list and the panel beside it were both
  Today; the panel is now Your day).
- Every provider within its model's limits. Her words (6 November 2026): "I want the fix to be applied to all Claude models and Ollama's,
  GPT and every other provider, I want the caps gone and for the fixes to be applied to them as well inside of Ingenium to prevent
  anything else from crashing." Measured with stand-ins of OpenAI's form and Ollama's: the chat's requests of OpenAI's form (GPT,
  Gemini, Kimi, OpenRouter, LM Studio, any compatible service) asked their reply through ingRemoteCap, which neither the smaller figure
  a refusal named nor the room the window leaves reached, so the same request went again and failed; ingRemoteCap now holds both
  (r206), as the working loop does since 6.44 (r190), and Blend's own requests of that form ask within the figure kept for the model
  (build_page.py 6.46, ingOutFor). Ollama was given 32,768 tokens of memory whatever its model holds (16,384 in Blend), and the working
  loop gave none, so Ollama used its own default of a few thousand and silently cut the start of what was sent, Ingenium's
  instructions and the tools with it; a refusal for the computer's memory (Ollama's 500) was taken for a busy service and sent twice
  more. Now what the model holds is read from Ollama (/api/show, once a model, two seconds at most); each request is given what it
  needs (ingOllamaCtx: 32,768 for a short conversation, or the model's own window when smaller, doubled as it grows, up to the model's
  own), in the chat, the loop and Blend; a refusal for memory halves it, keeps it for the model (memCtx), fits the conversation to it
  and sends again (Lector reads again in smaller parts). Her own figure, when she sets one, is kept as she set it.

    node rig/t_646_providers.js <url> <out>  # stand-ins of OpenAI's form and Ollama's: refusals for length and tokens a minute,
                                             # Ollama's memory read, grown, halved and kept; the loop and Blend
    node rig/t_646_think.js <url> <out>   # a stand-in model that thinks without end: stopped at its length, in circles, or in <think>;
                                          # answered in the same reply; the simple message unthought; the controls; the instructions;
                                          # sources folded and cited on request; the three titles

Ingenium 6.45 (6 November 2026): presses made lighter; no permission opens or packages Ingenium itself outside the master
edition; the app library keeps no copy of the Offline Project's page; the chat box has one stop key; Check with Blend in
lavender; no Name card in Settings; the Career Studio's Today step and the Guide's Start here redesigned. Her answers
(6 November 2026), to whether "edit" should go too: "Yes please remove the
"edit", it can go too"; and to whether the app library should stop keeping saved copies of the Offline Project's page altogether:
"Yes, the app library stop keeping saved copies of the Offline Project's page".

- modules/r162.js, build/editions.py (_no_self), build/thoughts/permit_core.html: until 6.43 a permission of the owner's that
  allowed "edit" still opened Ingenium itself in the full edition's Code and Build. Now no edition but the master lists Ingenium
  itself (this copy, or the one the library keeps) among the apps Code and Build open, whatever a permission says, and none
  packages it (6.43). The permission card the owner signs offers only what Ingenium acts on: use, install, share and sell
  (PermitCore.create takes offer); a permission given before keeps what it says, as a document. rig/t_62_permits.js checks it.
- modules/r240.js: 6.42 kept the Offline Project's page as two more apps of the master edition ("offline" and "offline3"), and the
  full edition kept it as any other app. Now, in every edition, a page that is the Offline Project (its one-file app or its
  site's hall, known by its title, with or without Inkwell) is not kept, nor a zip that holds one (the apps' pages in such a zip
  are the copies it was made with, so they are not kept either), and the library says why: in the master edition, "The Offline
  Project is not kept as a copy: Ingenium makes it from the four apps it holds now, so it always has their latest versions."
  The other editions, which never name it, say "This page holds a set of apps, not one app, so the app library does not keep
  it."
  A copy kept by 6.42 or 6.43 is let go of at the next start, its bytes with it, here and on the computer app's disk. Lector
  shows the set of her apps chosen with the Offline Project's crest (6.43), drawn from the apps Ingenium holds now; Fabrica's
  work on the Offline Project is to be made from her four current apps in the same way (the next stage of it).
  rig/t_642_anyapp.js checks the page, the zip, the copies let go of, and that no list names a copy.
- modules/r215.js, her words (6 November 2026): "Please remove the "Stop" button from Ingenium's chatboxes, there is already a
  purple pause button on screen in the text area, the white stop button seems superfluous there." The clock above the message
  box (6.11) has no Stop key of its own now; the purple key in the box stops the reply, as it always did (what the reply changed
  so far is kept). It wears its stop face whenever a reply is being written, and a screen reader hears it as "Stop writing" or
  "Send" rather than the shape on it. The Guide's words on the Code session say so. rig/t_611_code.js checks it.
- Lighter presses. Her words (6 November 2026): "Everything is moving slower inside of the app and my mouse's cursor is just
  delayed on the screen of the app, it feels off and all of the buttons and the app's entire UI looks flatter and I hate it,
  please fix this and undo whatever did this to the app." Measured with Chrome's profiler, the processor slowed four times, a
  chat of 120 messages: on 6.44 the Guide's What's new key read every entry of every version again on each change to the Guide,
  even hidden (0.8 s over eight presses), the drop-down lists' safety net measured every list each second, the page's scroll to
  the top forced a whole layout in the middle of each press (0.5 s), and a visit to Chat or Code drew every message again and
  saved the desk. Now: modules/r230.js reads the newest version from the first entry and does its work only while the Guide is
  shown; modules/r172.js still reads every list a person can see each second (a value set by code shows within a second) and
  measures their widths every other second, the dearer half of its work;
  build_page.py scrolls at the next frame and only when the page is not at its top, and a visit keeps the messages drawn when
  the conversation is unchanged (its mode, name, count and last four messages), saving the desk only when another one is
  chosen; modules/r242.js (new) has the top bar's two breathing dots grow and fade on layers of their own, which the graphics
  chip moves, where a shadow and a glow filter were redrawn by the processor on every frame of every page. Busy time on the same
  run: a streamed reply 26 percent less, presses between pages 17 percent less. Compared with 6.36 (earlier the same day) and
  6.44, every key's shadow is the same: no release changed the depth. The depth is set by Display, Depth (Raised or Flat) and
  by the Author Studio's Look (Soft or Deep); nothing switches it by itself.
- modules/r218.js, her words: "I want you to make the Check with Blend button inside of the chat pages purple to liven up the
  look of the page, it needs some light colours so it does not look plain, and match the rest of the page's colours." Under a
  reply, Check with Blend is a lavender key: a lilac face, the accent's words, a faint violet edge and lift, and Blend's own
  mark (its two circles); by night a deep plum face with lavender words.
- build_page.py, modules/r144.js, r173.js, editions.py, her words: "since I can rename Ingenium inside of the Author Studio, I
  don't think there is a need to keep that function on the Settings page of the page, please remove it." No edition has the Name
  card now; the Author Studio's Names room (master) names the app, and Find a setting leads "rename" there. rig/t_671_name.js
  and rig/t_627_editions.js check it.
- modules/r188.js, her words: "The Make its checklist page looks odd and not formatted. It looks very plain and reads poorly,
  please redesign it to better fit the rest of the Career Studio and the colour palette and design of Ingenium." Today's step
  is in parts now: the application's strip (its organisation, its date and its stage as coloured chips), the step on a lilac
  card with a mark for its kind (a checklist, a reading, a sending, a flag, a conversation), where it stands among today's
  steps and its minutes, the posting's own words when it quotes them, a card of what the application holds so far (its stage,
  its date, its checklist, its documents, its referees), and the pace in a soft band. Only what the studio holds is shown.
- modules/r243.js (new), r144.js, her words: "The guided tour page looks so off as a page especially with all of these buttons
  just clustered together all in one area, it really bugs me and triggers my sensory issues, please redesign the Guide page to
  fix this. This request is only for the Start here tab page inside of the Guide page." The tour's card held its sentence, its
  key, three level keys and sixteen chapter keys of every width in one run (modules/r166.js had them wrap as they came). Now
  two named parts side by side: Take the tour (the sentence, the key, and the three levels stacked, each with its line) and
  The chapters (how many are seen, on a slim bar, and the sixteen as a book's contents: flat rows in two columns read
  downwards, with no raised faces, after her second word: "I don't like the look of the Chapters area, it still has that many
  clustered 3D buttons look that I said that I didn't like"). The same keys, in the same order for the keyboard and a screen
  reader; below about 1,050 pixels the parts stand one above the other.
- rig/t_67_select.js: since 6.36 Focus shows one part at a time and its first part holds no list; the test asked for at least
  one there (it failed the same way on 6.44). It now asks that every list a person can see is dressed.
- The history: her doctoral plans, quoted in modules/r188.js's header comment and used as sample text in rig/t_681_lector.js and
  rig/t_desk.js until 6.43, are taken out of every earlier commit of this repository, on her yes ("Yes, you may proceed"). Only
  the commits that held them, and the commits after them, were made again (the files otherwise the same, each commit's author,
  dates and message kept, a commit id named in a message pointing at its new self, and signed again); 55 older commits and five branches that never held them are unchanged. Every blob in
  every branch was searched afterwards for the words.

    node rig/t_642_anyapp.js <master url> <out> <full edition url>   # the library keeps no copy of the Offline Project
    node rig/t_611_code.js <url> <out>     # the clock above the message box, with no Stop key of its own
    node rig/t_62_permits.js <master url> <out> <served folder> <its url>   # what the owner's card offers, and what it opens
Ingenium 6.44 (6 November 2026): Your edge and Your direction; what Lector's readings add to her record; Claude within each model's
limits; Ingenium's own caps on how much a model reads taken away.

Her request (6 November 2026), in short: suggestions and recommendations for her CV, portfolio documents and cover letters from Lector and
the Career Studio; the skills and experience she has, and how each transfers to her documents where it suits; her blind spots; what gives
her an edge; and direction in choosing a career. And: "I want Lector to read my updated apps and spot additional skills and experience that
I can add to my resume ... I want it to be built-in for it." (Her own goals stay in her profile, on her device.)

- modules/r188.js (the Career Studio): a room of its own, Your edge, after Your profile. What transfers: each skill or experience her
  record shows, with its evidence (the entry, document or app it rests on), where it counts (which documents, which of her targets) and a
  sentence for her documents drawn from that evidence alone; Add to your profile keeps it under Skills with its evidence. Blind spots:
  what she undersells, what her targets ask that her record does not show yet, habits that weaken her documents, and questions a reader
  will ask, each with why it matters and a fix, ticked when seen to. What sets you apart, with her positioning in three lines (as a
  professional, as an academic, and the bridge between the two). Your documents: her CV, the documents in her profile, those written in
  Applications and those Lector hands over, each looked at with suggestions (what could do more, what her record adds, what could go,
  wording, what a reader will ask, the first thing to do), never rewritten. From your apps: what each app Lector read shows that her CV
  and profile do not show yet. In Goals and plan, Your direction: the paths that fit what she is looking for, each with why, the evidence,
  what is missing, a first step this week, the next three months and how it sits beside her other goals; Make it a goal; and what to
  find out before choosing, ticked. Her targets (goals, the applications she weighs, the roles she kept) go with every ask. Learn gains
  Finding your edge. The chat's + menu attaches her career profile to a message. Nothing is invented and nothing is searched online.
- modules/r108.js (Lector): Suggestions, beside Copy, hands the document shown to the studio, which looks at it there. Built into the
  reading: each app read afresh in a job is noted, and when the job ends the studio reads that reading against her CV and profile, beside
  the earlier copy's reading when there is one, and lists what the app shows that they do not yet show, the new marked; Lector says so in
  its stream. Nothing is added to her CV by itself.
- Claude within each model's limits. Her words (6 November 2026): "Ingenium keeps on failling when I try to use Claude's Opus model in the
  chat, it keeps on giving me an error message saying that the connection failed because of max token limits." Measured: the chat's own
  path (6.9.4, modules/r206.js) kept a model's limits and asked again after a refusal for size, but a chat with files runs the working
  loop (modules/r190.js), which asked for the slider's reply however long (an older model) or at least 32,000 or 64,000 tokens, and never
  took the smaller figure a refusal asked for: the same request went four times and the reply failed. A request on its own connection
  (Blend) had no ceiling either, and a Claude model whose list was never read had none. Now every request to Claude is asked within the
  model's own ceiling (modules/r195.js: the list's figure, else Anthropic's published limit for its family: 1,000,000 tokens to read and
  128,000 to write for Opus 4.6 onwards, the 5 family, Fable and Haiku 5.5; 200,000 and 64,000 for Haiku 4.5; 200,000 and 32,000 for an
  older or unknown model, until its list or a refusal gives the true figures), in the chat, in a chat with files, in Code and in Blend;
  a refusal for the reply's length is said as what it is.
- Caps taken away. Her words (6 November 2026): "I don't want any caps inside of Ingenium's pages. I want the cap of the Career studio
  removed and anywhere else inside of Ingenium that does not harm the app and leave it vulnerable." Removed: the Career Studio's 90,000
  characters a request (30,000 for a model on this device) and its counts of suggestions; a connected model's window held to 262,144
  tokens for Lector and the studio (now its whole window, 1,000,000 for the current Claude models); Folders' 400,000 characters a
  request and 60,000 a conversation; the chat's 30,000 characters for a document written whole. Kept, as each protects the app or is a
  limit of the model or the service: a model's own longest reply and window (asking beyond them is refused, as Opus was), a key's tokens
  a minute, a device model's trained memory, the 4,000,000 characters a file in the chat may hold, and the training's limits on steps.

    node rig/t_644_edge.js <master url> <out> [<full url>]   # 30 checks with an invented person, a stand-in model and an invented app
    node rig/t_644_claude.js <url> <out>                     # checks with a stand-in for Anthropic's API (refusals for length and for
                                                             # tokens a minute), in the chat and the working loop

Ingenium 6.43 (6 November 2026): Ingenium made as an app by its owner alone, the top bar's order, the Author Studio's side
bar, and the Folders page at the app's sizes. Her words: "Please remove the option to download Ingenium as an app from the Build
page and only leave it in the master edition and nowhere else, I should be only person with access to it, I don't want others to
be able to ship and produce variations of my app without my expressed consent and permission." And: "Please move the About
button back to being in front of the Help button and place the 'Author Studio' button in front of the About button and not
behind, the new location throws me off."

- build/editions.py (_no_self_kit, _open_words): until 6.42 the gift and demo editions had no install kit of Ingenium itself,
  but the full edition kept it, hidden until a permission of the owner's allowed "package". Now every edition but the master
  has none: the choice is not in the page, the kits make a new app only, asking for Ingenium's own kit is refused, and a kit
  or a Fabrica package refuses a page that is Ingenium's own (the marks every Ingenium page carries: its edition's variable
  and the parts' register), with "This is Ingenium's own page. Only its owner makes apps of Ingenium." A new app of the
  person's own is still packaged. Build's Open key and its help name only what each edition opens. A permission allowing
  "package" no longer opens it in another edition; "edit" still opens Ingenium in the full edition's Code, as before. A copy
  someone alters by hand cannot be stopped from inside a page; this closes the ways the page offers.
- modules/r236.js: the top bar reads Display, Studio, About, Help (the Studio key goes before About, not between About and
  Help). The Author Studio's second stage, as Carpe Diem's has it: a Side bar room (the order of the pages in each group, Up
  and Down, and which pages the side bar shows; Home and Settings always stay; a hidden page still opens from Home, Help and
  the tour; each change in the change log with Undo; the built order key; Reset all, Export all and Import all carry it).
  A group is put in order only when she has given it one, so pages that add their keys as they start keep their places.
- modules/r208.js: a folder's name in its card at a card heading's size (16.5px, the app's serif, which the Author Studio's
  Look now reaches), the new folder's card at the text's size, and a folder's own title at 21px below the page's 25px.
  rig/t_638_scale.js now puts invented content in before measuring (a folder, an app in Fabrica, a conversation) and measures
  a folder's own view, which is how these were found.
- Lector (modules/r108.js), her words: "I don't want two new Offline project seal logo added to the Lector page, instead I want for
  when I select all 4 apps of the Offline Project the master shield seal of the app appears and when I select only apps the master
  shield of the Offline Project still appears with three quadrants of the selected 3 apps and so forth. I don't want them to look
  like duplicates and also that way, the Offline Project inside of the app can always reflect the 4 latest apps that is kept inside
  of Ingenium instead of an old saved version of older apps versions." 6.42 had given the Offline Project two tiles of its own
  ("offline" and "offline3"); they are gone from Lector. Choosing two, three or all four of her apps gives the set its crest (the
  duo's, the shield of three, the master seal, as since 6.1), drawn from the seals of the apps Ingenium keeps now; a set chosen
  before keeps only the apps Lector lists. The library still knows the Offline Project's page (modules/r240.js), for Fabrica and
  the other pages. rig/t_642_anyapp.js checks the tiles' absence and the crest of four, three, two and one.
- Her doctoral plans (a university and her proposal's title) were quoted in modules/r188.js's header comment and used as
  sample text in two tests; they are taken out of the current source. Earlier commits still hold them: removing them from
  the history would need the branch rewritten, which is hers to decide.

    node rig/t_643_owner_kits.js <out> master=<url> full=<url> gift=<url> demo=<url>
                                           # the master keeps Ingenium itself; full, gift and demo have no trace of it, refuse
                                           # Ingenium's own page in the kits and in Fabrica, and still package an invented app
    node rig/t_643_side.js <url> <out>     # the top bar's order; the Side bar room: move, hide, reload, Undo, built order,
                                           # Export, Import, Reset all, the app's scale

Ingenium 6.42 (6 November 2026): any app, not only her four, in Lector and the app library. Her words (6 November 2026): "I need for
Lector and every other page inside of Ingenium to be able to take other apps. It should not be limited to only the 4 apps inside of
Ingenium. Lector should be able to read and analyse and process any app inside of Ingenium." And: "I want the app library to recognise
other apps and not only be limited to just my 4 apps, it should also recognise the Offline Project and any other apps that I made inside
of Ingenium or elsewhere."

- modules/r240.js (new): the app library keeps any app's page, not only one it recognises as Carpe Diem, The Forge, Ingenium or Inkwell
  (the base page's libDetect). Its name is the page's title (or its application name, its first heading, the file's name), without a
  version written after it; its key is "app-" and that name in plain letters, and a page of the same name again is a newer copy of it,
  the copy before it kept one step back, as for her apps. Its version comes from a version meta, an APP_VERSION or VERSION in its code,
  or a number in its title; its colour from its theme-color. A zip with none of her apps in it gives its main page (index.html, or the
  largest page). libKeys() lists her four first, then the others by name, and libApps() follows it, so the chat's + menu, Fabrica's
  library and Storage list them; libName(k) names any of them (modules r142 and r187 take it).
- Each other app has a seal: its own logo when its page names one (found as 6.41 finds it, modules/r239.js), or else a seal of its
  initials in its colour. It is kept in ING_SEALS beside her apps' seals, so Lector's paper and a Word file's cover carry it.
- The Offline Project, in the master edition: its one-file app and its site's hall are known by their title, The Offline Project; the
  variation without Inkwell by its build's "without": ["inkwell"]. They are kept as "offline" and "offline3", listed after her four
  (in Lector both are always shown, as her four are, "Not added yet" until a copy is kept), and wear their live crests in Lector (r140:
  the master seal with its quarters moving, and the shield of three).
- modules/r108.js (Lector): its apps are her four, then the Offline Project's two, then every other app kept, by name. Another app's
  paper is drawn in its own colour. What stays with her four: the Offline Project's names for a set (all four, a trio, a duo), the
  crests, the master seal and Choose all four; a set with another app in it is named by its apps ("2 apps together", and so on), each
  app's own seal on its cover.
- modules/r112.js (Fabrica): the library sheet names any app by its own name; one brought in becomes a repository under that name, its
  page under its own file name.
- The full edition takes any app the person adds. It lists Ingenium alone by key, so a page of one of her apps added there is now kept as
  any other app, under its own name; before, it was kept under its key and listed nowhere. The public editions have no library and are
  unchanged.
- What's new names this twice: for the master and full editions without naming her apps, and for the master alone with the Offline
  Project.

    node rig/t_642_anyapp.js <master url> <out> [<full url>]   # 20 checks with invented apps (one with a logo, a version and a colour,
                                                              # one with none) and the Offline Project's page in both variations: names,
                                                              # versions, colours, keys and their order; Lector's tiles, seals and crests;
                                                              # the names of a set; a full reading and its documents on the app's own paper
                                                              # with its logo on the cover; the + menu, the library, Storage; the full
                                                              # edition; no page errors

Ingenium 6.41 (6 November 2026): every app's own logo, in 3D, in Fabrica. Her words (6 November 2026): "I want Fabrica to automatically
load the apps' icons and logos with the same animated popped out 3D look and effects. I want that for any app that is made inside of
Ingenium and its pages, especially Fabrica and Lector. When the app clearly has a logo icon, it should replace Ingenium's placeholder
empty slot and show the app's actual 3D logo animated and active and swaying back and forth the same way that it does for Carpe Diem,
The Forge, Ingenium, Inkwell and the Offline Project's app icons inside of Ingenium."

- modules/r239.js (new, window.IngAppIcon): finds an app's logo in its own files and draws its layers. It looks, in order, at the icons
  the page names (<link rel="icon">, apple-touch-icon; the largest first, a drawing to scale before all), the icons of the manifest the
  page names (not those only maskable or monochrome), a Windows tile image, then files named as icons are named (icon, logo,
  apple-touch-icon, favicon, an icons folder). A logo written into the page (a data address) and a file of the app's own are read; a web
  address is never fetched. A clear logo: it loads, it is square or nearly (a banner is not a logo), and it is an SVG or at least 64 pixels
  across; otherwise the placeholder stays. Its layers are drawn once on a canvas: on an opaque square it becomes a tile with rounded
  corners, on a clear ground it keeps its shape; its edge is the same shape darkened behind it, and a sheen the same shape lit from above
  in front. Kept until the app's files change.
- modules/r112.js (Fabrica): an app with no seal of its own wears its logo, in its row of Your apps and at the head of its work, in the
  seals' own classes: the same depth, cast shadow, sway, turn toward the pointer, lift and press. The four seals and the Offline Project's
  crest are as they were. Fabrica's seals and logos now stand still with minimal motion too (they stopped only for the system's reduced
  motion), as Lector's seals and the crests do.
- Lector: its "Your apps" holds the four apps alone (the app library keeps only pages it recognises as Carpe Diem, The Forge, Ingenium or
  Inkwell: the base page's libDetect), and each already wears its own 3D seal, so there is no empty slot there. Lector taking any app
  is a larger change, asked of her.
- rig/t_fabrica.js waited a fixed second after marking a release before judging the tile; on a busy machine that was too short (it
  failed twice as the first test of a run and passed alone every time). It now waits for the release to be drawn, then judges it as before.

    node rig/t_641_logos.js <url> <out>   # 11 checks with six invented apps (an icon file, a manifest's tile, an SVG in the page, a
                                          # banner, a tiny favicon, a web address): the three logos in the seals' layers with shadow and
                                          # sway, the tile's corners and the free shape, the placeholder kept for the other three, nothing
                                          # fetched, the work head, the pointer's turn, minimal motion, after a reload, no page errors

Ingenium 6.40 (6 November 2026): the Offline Project's crest, as its own icon in Fabrica. Her decision of 5 November: "Fabrica (master
edition) shows the master seal live, with each quarter moving as its app's seal moves (port the site's quarter motions, site.html lines
86 to 140 and its medal() drawing, into r140's live crest)." A first reading set the crest at the head of Fabrica, as its logo; she
corrected it (6 November 2026): "I want the Offline Project seal to be shown inside of Fabrica the same way that the other apps icons
are shown inside of Fabrica, I don't want it to be Fabrica's logo." That reading was never released.

- modules/r140.js: a live crest may ask for its quarters to move (IngSeal.el(apps, {live: true, quarters: true})). Its seals layer is
  then drawn by sealsLive, ported from the hall's medal() (source/offline_project/master_demo/site.html): Carpe Diem's ring breathes
  round its seal, The Forge's sparks glint in turn and a sheen crosses it, Ingenium's star turns a quarter at a time and its heart
  stone beats, Inkwell's wax glows. The motions are written into the layer's own picture (the hall's keyframes), so they run inside it;
  the spark positions follow the seal's radius. Only where motion is allowed: with minimal motion, or the system's reduced motion, the
  still seals are drawn, and a change of the Motion setting repaints such a crest at once. A still crest, a document's crest and a
  picture are unchanged. IngSeal.medals(apps) tells where the seals sit.
- modules/r112.js (Fabrica): an app's icon is drawn by sealEl, each of the four apps with its own layered seal. A repository is now known
  as the Offline Project by its name (The Offline Project, Offline-project-forest, offline_project: "offline" and "project" together),
  and wears the master crest, live with its quarters moving, in its row of Your apps (56 pixels high, as a seal) and at the head of its
  work (34); one named for the variation without Inkwell wears the trio's crest; its tile takes the crest's gold. The master edition
  alone (the crest names her own apps); elsewhere such a repository keeps the new app's mark. Only the icon and its tile's colour
  change: packages, kits and their icons follow the app key as before.
- Found, older (the same on the published 6.35 page): rig/t_61_seals.js fails 6 checks (a document's crest drawn 300 pixels wide where
  720 is asked, and Lector's page zoom at 1440 by 900 and on a phone), and rig/t_67_sound.js 8 (it stops on a voice that renders
  nothing in this headless browser). Left for a later stage.

    node rig/t_640_offline.js <url> <out> [<full edition url>]   # 14 checks with three invented repositories: the master crest in the
                                                                 # Offline Project's row, live, at a seal's height; the trio for the
                                                                 # variation without Inkwell; the mark for an ordinary app; the gold
                                                                 # tile; no seal on Fabrica's head; the work head's crest; the motion
                                                                 # measured (each quarter pictured twice differs, a crest without
                                                                 # quarter motions does not); minimal motion; documents unchanged; the
                                                                 # full edition's mark; no page errors

Ingenium 6.39 (6 November 2026): a GitHub repository in a folder, the signing keys kept on a computer app's disk, and three older
test failures fixed. Asked what a folder should take from a GitHub repository, she answered: "I want its README, its files, and its
issues."

- modules/r238.js (new): Bring in a repository (Folders, Bring in your work, and a card in each folder). The link and the folder (a
  new one named after the repository, or one she has); everything is read before anything is kept: the repository (api.github.com),
  its file list (git/trees, recursive), its README, its text files (raw.githubusercontent.com; with a token, the contents API), its
  issues, open and closed, and every comment (issues/comments, a hundred at a time). Pull requests are left out. The README joins
  the folder's files, so it goes with every conversation in the folder; the files and the issues are kept in the long-text store (on
  a computer app on its disk too), each listed in the folder's card with Show and Use in a conversation (a new conversation in the
  folder, the file or the issue added to the next message). Bring it up to date reads it all again and lets the earlier copy go;
  Remove from this folder lets it all go. Left out for the page's stability, and said: a file over 1 MB, more than 3,000 files or
  25 MB of text; what is not text. Refusals in plain words: not found (or private: a token is needed), the token refused, GitHub's
  hourly limit (with the time it opens again, read from the X-RateLimit headers GitHub exposes to pages, or from its message), no
  connection. A public repository needs no token; a private one uses the token Add from GitHub keeps. modules/r208.js holds the two
  hooks; the Guide's Folders card and its search words name it (r222.js, r173.js).
- modules/r136.js and build_page.py: the signing keys' copies on a computer app's disk were written as "signing_<id>", a name the
  app refuses (it keeps only big_ and seven to forty letters or digits), so none was ever kept. Now "big_sgn<id>", with an index
  (big_sgnindex); the long texts' sweep keeps them; keys.diskIds() names them and Reset everything deletes them, so a cleared key
  cannot come back from the disk.
- Three failures of rig/t_67_rooms.js older than 6.38: its Blend run stood in for blAsk, which Blend has not called since 6.12 (it now
  stands in for the engine, as rig/t_612_blend.js does); its model-name rule now leaves aside the Folders guide's search words for
  the assistants it imports from; and two accessibility faults axe-core found are fixed at their source: the Train room's bands, keys
  inside a list, are now a labelled group (r232.js), and a blend's error note by day is #8a5a12 on white, 5.9 to 1 (r218.js).

    node rig/t_639_repo.js <url> <out>       # 21 checks with an invented repository and a stand-in GitHub: the way and the dialog, the
                                             # README, five files word for word, two issues with three comments, the card, Show, Use in
                                             # a conversation, Bring it up to date, refusals, Remove, no token sent, no other host
    node rig/t_639_keys_disk.js <url> <out>  # 8 checks with a stand-in bridge keeping the app's name rule: the copy and its index, the
                                             # sweep, the key back from the disk after the web view forgot, Reset deletes the copies

Ingenium 6.38 (6 November 2026): one scale for the whole app, the model list at its key, and Reset everything clears every store.
Her notes of 6 November: "Everything inside the Author Studio looks big and chunky, very bulky and does not match the rest of the
app, please fix that." "The models drop down list panel from the chats does not open directly on top of the button, it opens on the
other side of the chat text, please fix that." "I want the fonts and sizes of the newly added pages and sections of Ingenium to match
the rest of the app, everything should be consistent and cohesive. I don't want big bulky texts or buttons messing up the look of the
app." And, asked whether Reset everything should clear the other stores too: "the answer is yes".

- The app's own scale, read from the base page: a page's title 25px serif (Home's 30px), its first line (the lede) 14px, a card's
  heading (h2.sec) 16.5px serif, text 13.5px, small text 12px, a key (.btn) 13px at about 34px high (8px by 14px inside it), a small
  key 12px, a field 13.5px. Every page, room and part was measured at 1440 by 900 (47 views on 6.37, with the Author Studio's rooms).
- What stood out, and why: on Home, in the Career Studio and in their keys, a general rule ("buttons take the page's lettering")
  outranked the keys' own size, so keys written at 13px or 13.5px were drawn at 14px and up to 46px high (.hx button over .hx-btn,
  #cs button:not(.rm-tab) over #cs .c-btn). Those rules now give way (:where), and the keys take the app's size. Also brought to the
  scale: Home's keys (13px, 34px), its card names (16.5px), its first line (14px), its greeting (no larger than the app's Home title,
  30px), its section heads (16.5px); the rooms' tabs on Settings, Models, Blend, Guide and the Career Studio (13px, 35px, as the
  app's keys; on a phone they keep 6.8's smaller pills); the Career Studio's empty heading (16.5px) and its link field and key (13.5px
  and 35px); the backup's keys (13px, 34px); Lector's and Fabrica's empty headings (16.5px).
- What stays larger, on purpose: page titles; Home's greeting and the Offline Project's plaque; figures (the storage's size, Focus's
  clock); the chat's greeting when a conversation is empty; Lector's paper and the Ownership notice, which are documents at a reading
  size. rig/t_638_scale.js names each and fails on anything else above the scale.
- The Author Studio (modules/r236.js, the master edition): drawn in the app's measures. Its top bar 44px with the app's title (16.5px
  serif) and pills (24px, 11.5px) instead of keys; its rail lettered as the side bar is (13px, the chosen room in the accent); its
  cards as the app's cards (16px inside, 14px corners, the app's shadow, 16.5px headings, 12px text); its fields 32px at 13px; docked
  480px wide. A room's name shows as a tip under the pointer only when the rail is narrowed to its icons.
- The model list (modules/r237.js, new): it was placed by the rule all the chat's menus share, at the left edge of the composer's
  bar, while its key stands at the right beside the send arrow. Now, in Chat and in Code, it opens just above its key, its right
  edge on the key's (as the effort list's is), moved in only as far as the window's edge asks; it follows the key when the window
  changes size or the list is painted again, and it is placed before the screen is drawn.
- Reset everything (build_page.py): it cleared the desk and the files store; now it clears everything Ingenium keeps on this device:
  the long texts, the app library, Fabrica's apps, packages, issues and pages, the conversations brought in, the signing keys, the
  Author Studio's changes, Ingenium's own preferences, the desk's copy and, on a computer app, the long texts on its disk; the folder
  search's index in the private file system goes too (the dialog does not name it while the folder search is held out of releases).
  A carried app's own keys stay; on a computer app the models on its disk and its earlier desks (desk-backups) stay, and the dialog
  says so. Each edition's dialog names only what that edition holds (editions.py, _reset_words). The apps Ingenium carries are put
  in the library again as it starts.

    node rig/t_638_reset.js <url> <out>    # 8 checks with invented records in every store: the dialog, each store gone or empty,
                                           # the preferences, a rewrite and the index gone, a carried app's key kept, every part runs
    node rig/t_638_menu.js <url> <out>     # 9 checks: the model list above its key in Chat and Code, from the first moment, after a
                                           # resize, on a phone; the + list and the effort list in their places
    node rig/t_638_scale.js <url> <out>    # every page, room and part (and the studio's rooms) against the app's scale

Ingenium 6.37 (6 November 2026): the Author Studio, the room behind the rooms (the master edition only). Her words: "The Author
Studio looks pitiful and does look like it will allow me to make any edits or changes to Ingenium. It does not look like Carpe Diem's
Author Studio, I want to actually be able to make edits and changes to Ingenium."

- What it was (6.25, modules/r226.js and r227.js): a room of Settings with four cards (Check Ingenium, Errors, Your layers, Your
  page). Carpe Diem 1058's Author Studio, carried in Ingenium, was studied first: a studio of its own with a top bar (All changes kept,
  Export all, Import all, Reset all overrides, Close), a rail of 37 rooms, an Editor that asks what is being changed, every word open
  to rewriting, one change log and every change undoable.
- modules/r236.js (new): the Author Studio over the whole window, or docked at the right with Ingenium live beside it. Opened from
  Settings' Author Studio room (now a door), from a Studio key in the top bar, and from go("workshop") or go("author"). Its top bar:
  All changes kept (with the count, flashing on every save), Show Ingenium beside, Export all, Import all, Reset all, Close. Its rail:
  The Editor (four kinds of change, each opening its room), Words, Names, Look, Checks and additions, Change log.
  Words: Edit words on the page (the studio docks; any words pressed open a small editor beside them, and the press does nothing
  else); the rewrite is made on that page, or everywhere when chosen; Find words searches every sentence of every page; Your words
  lists each rewrite with its page, Rewrite and Restore. A rewrite is kept as the words it replaces and the words that replace them,
  and applied as Ingenium starts and whenever a page draws them again (a watcher of the page, only while there are rewrites); never
  inside what is hers: messages, the chat's list, notes, Tabula, Code's editor, fields, code and editable text. Placeholders too.
  Names: Ingenium's own name (state.appName, as Ownership sets it), and each page's name in the side bar, its title and its first
  line. Look: ready looks (Ingenium's own, Carpe Diem blue, Forest, Ink, Rose, Amber), the accent colour with its shades made from
  it for day and night, the headings' font, the text's font, and the depth of keys and cards. Checks and additions: the Workshop's
  cards moved into the studio whole (Check Ingenium, Errors, Your layers, Your page). Change log: every change, newest first, each
  with Undo, and Undo the last change; Export all writes the words, names, look, the app's name and the layers to one file (through
  the computer's own save dialog where there is one), Import all reads it back, Reset all returns Ingenium to how it was built (the
  log keeps the reset, and its Undo brings everything back). Kept in the desk (state.author): on every device with her data, in her
  backups, sealed when the lock is on. editions.py leaves it out of every edition but the master. What is new gains 6.37 (master).
- Not yet (the next stages, as Carpe Diem's has them): the side bar's order and pages hidden, cards moved and hidden from a picker,
  the guided tour and the Guide's words, ready-made changes on a shelf, a Learn drawer, and an Installers room.
- modules/r173.js: the Author Studio room's line says what the studio now holds.

    node rig/t_637_author.js <url> <out>   # 19 checks with invented words and names: the door, the studio and its rail, the Editor,
                                           # words pressed on a page and kept, on that page or everywhere, never in a message, after a
                                           # reload, found, restored; names; a ready look, fonts and depth; the change log and Undo;
                                           # Export all, Reset all, Import all; the Workshop inside; Esc, go("workshop"), the top key

Ingenium 6.36 (6 November 2026): Focus in parts. Her request: the Focus page redesigned the way the Train room was (6.28), with tabs
and sections, animated and clickable cards, and much less scrolling. Measured on 6.35 at 1440 by 900: the page was 2,351 pixels tall
(3,856 on a phone 390 wide), its ten cards one under another.

- modules/r235.js (new): four parts, one at a time, under four raised cards that are the tabs: Today (Now, what today asks of you,
  your routines), Work (Steps, Time and the Inbox), Calm (Calm and Clear words) and Supports (each support's switch). Each card-tab
  says what stands in its part at this moment, read from the page's own state and refreshed each second while Focus is in sight:
  the step in front of you (or the routine whose hour it is), the focus timer counting or paused, the thoughts waiting in the Inbox,
  the calm look and the text size, and how many supports are on. The tabs rise in and lift under the pointer; a part's cards rise in
  one after another; the arrow keys, Home and End move between the tabs; the part chosen last is kept (ing.focus.part.v1), only when
  she chooses it. A card in another part opens its part when it is scrolled to, focused, or ringed by the guided tour (its Focus pages
  and the tour's ring), so Help's Show me and the tour still find it. A low-energy day's card stays above the parts. The Calm look,
  the minimal motion setting and the system's reduced motion stop every movement there.
- Now, with no task, said "Steps, below": it now says "Steps, in Work" and has a Go to Steps key that opens Work with the cursor in
  the task's box. Measured now: each part 676 to 905 pixels at 1440 by 900, 971 to 1,567 on a phone. What is new gains 6.36.

    node rig/t_636_focus.js <url> <out>   # 19 checks: the four card-tabs, each part's cards and only those, its line, the keys, the
                                          # part kept, heights on a computer and a phone, what each tab says (a task, a thought, the
                                          # timer counting and paused, a support turned off), Now's key to Steps, a hidden card
                                          # opening its part (scrolled to, focused, a tour page, the tour's ring), the Calm look

Ingenium 6.35 (6 November 2026): newer models in a room of their own. Her words (4 November 2026): the path to check, download and
install newer models, with "the existing section to be redesigned and be visible". Since 6.11.2 the card (modules/r217.js) sat at the
foot of the card of the four houses in Ingenium's models, which is long, so it was out of sight.

- modules/r173.js: the Models page gains a room, Newer models, beside Ingenium's models, with its own icon and line; the words "newer"
  and "found online" file into it.
- modules/r217.js: the card stands on its own (a card after the houses' card, which r173 files into the new room), with Check for newer
  models at its top; before a look a dashed box says what pressing it does (Ingenium asks Hugging Face once, lists only what this
  device can load and hold, installs nothing until Install is pressed); after one, a line counts what this device can run, and how
  many are new since the look before. Its rows lift a little under the pointer (not with minimal motion or the system's
  reduced motion).
- modules/r222.js: the Guide says where it is now; What is new gains 6.35.
- rig/t_6112_found.js opens the new room for its picture.

    node rig/t_635_newer.js <url> <out>   # 10 checks: the key in the row of rooms beside Ingenium's models; the card on its own in its
                                          # room, Check in sight at the top; the empty state and nothing online before a look; the count
                                          # after one; Install; a ring from the tour or the Guide opens the room; the Guide's words;
                                          # a phone; no page errors (Hugging Face and the computer app are stand-ins)

Ingenium 6.34 (6 November 2026): documents in a chat reach a model on this device, and are read as documents. Her words (4 November
2026): "The documents uploaded inside of the chats of Ingenium are not clickable or offer a preview when you hover over it, the HTML
single file is clickable but not the documents, please fix that." The handoff asked for it to be verified on the device.
modules/r216.js (6.11.1) had made each document a key that opens, with its first lines on hover; rig/t_6111_popups.js checks that on a
message written into the desk. rig/t_634_docs.js takes the whole road instead: real files made by the test (Word documents, a PDF,
plain text, Markdown, a long transcript), chosen in the chat's own file picker, read by the page, and sent to a model stood in at the
engine's adapter, under every part that wraps the engine, so the working loop (modules/r190.js) runs as it does for her. The keys and
previews work; it found two faults, both older than 6.34, in what the model is given:

- for a model on this device, every file of 1,500 characters or more was replaced by a line asking the model to read it with its
  tools, whatever room its memory had; and the files the tools read left out Word documents (kind "doc"), so a model on this device
  never saw a Word document longer than about a page. Any other file of that length it saw only if it chose to use its tools, which
  small models often do not.
- a conversation whose files were all documents was framed as work on code ("the way a careful senior engineer pairs with its
  author", "for a page, run_app").

Now (modules/r190.js): a Word document is among the files the tools read, read-only (a change to it is refused plainly, with the way to
give one: the changed passage, or a new document Ingenium makes a Word file of; the refusal comes before any review card). The page's
own fitting is kept (each message's files in 40 per cent of the memory: a short file whole, a long one as its opening and passages from
across it), and files are left to the tools only when the whole request, with the loop's own words, would take more than four fifths
of the room, the largest first, never one under 1,500 characters (fitFiles). A conversation whose files are all documents (Word, PDF,
text, Markdown, a table) is told to read them as a careful reader does: answer from what it read, name the document and its lines, quote
exactly, and say plainly when something is not there (readerNote). A conversation with code keeps the engineer's note. What is new
gains 6.34.

    node rig/t_634_docs.js <url> <out>   # 17 checks: four documents read and staged; sent whole when they fit (a long Word document
                                         # to its last paragraph) under the reader's note; a long transcript as the page's overview with
                                         # room enough, and left to the tools at 8K, the model reading it through them; a Word document
                                         # read with the tools and never changed; code keeps the engineer's note; each document a key
                                         # (hover, focus, Enter, press, after a reload, a tap on a phone); no page errors

Ingenium 6.33 (6 November 2026): Settings without the long scroll; Reset everything leaves nothing of the earlier desk. Her words (5 November
2026): "The "Your data" tab page of the Settings page needs to be redesigned and reorganised because its still a lot of scrolling on all
of its tabs." Measured on 6.28 (the same on 6.32) at 1440 by 900: Your data 2,792 pixels (3,281 with Backup's Moving open), Models and
AI 2,945, Everyday 1,615.

- modules/r234.js (new; works inside the rooms of modules/r173.js, and never in "Show every setting at once"): Your data in four
  sections, one at a time, under a row of raised keys with a line saying what each holds: Bring in, Back up and move, Storage, Sign-in
  and reset (the sign-in, the older one-file backup and Reset everything). Models and AI in four the same way: Your Ingenium,
  Connections (online and home models, connectors), Search and eyes, Your devices. Backup's Moving shows its four steps two by two on
  a wide window; Storage shows the gauge, your limit and old copies beside what takes the room, with the app library under both;
  Everyday's five small cards stand in two columns from 1,100 pixels. The section chosen last is kept on this device, room by room
  (ing.settings.parts.v1), only when she chooses it; anything that finds, scrolls to, focuses or rings a setting in another section
  (Find a setting, Help's Show me, the tour) opens its section first. Measured now: Your data 900 to 1,686 pixels a section (Moving
  open included), Models and AI 1,004 to 1,506, Everyday 1,321. window.IngSettingsParts: show(room, section, remember), rooms, parts.
- Reset everything (build_page.py, modules/r197.js). rig/t_700d_lock_backup.js failed once in a full sweep: a seal of the desk still
  on its way when Reset was pressed was written after the reset had removed the desk, and the lock record came back from the sealed
  desk's head, so the fresh copy opened to the sign-in. rig/t_633_reset.js makes that moment certain (the seal slowed, the model
  store held open from a frame so the reset waits its five seconds) and found two more faults, both older than 6.33: the recovery
  shelf (three earlier moments of the desk, R50) stayed in the store, and on the computer apps the page brought the earlier desk back
  from the desk on disk (R96 adopts the disk's desk when the view starts with none). Now the reset says it is under way before it
  removes anything (window.__ingResetting: the page's saves, the lock's writer, its close-of-window seal, its copy to disk and its
  record writer all stop), takes the recovery shelf with it, and empties the desk on disk through the bridge's own writer (not the
  lock's, which would seal it) before the page starts again. The computer app keeps the earlier desk among its earlier desks
  (desk-backups: the day's first, and one about to shrink), where it can still be chosen. Not changed: the reset still leaves the
  other stores (long texts, the app library, Fabrica, conversations brought in, the signing keys); with the lock on they stay sealed
  under a key that is gone, and the apps Ingenium carries are kept again, plain, at the fresh copy's first start (checked).
- What's new in the public editions (modules/r222.js): rig/t_627_editions.js found that the entries for 6.29 and 6.32, written
  after the editions were last built (6.28), named Fabrica, the app library and the Career Studio, which the gift and demo editions
  do not hold. An entry can now be marked "fabrica" (shown where Fabrica is) or "nocareer" (the same news in the words of an edition
  without the Career Studio): 6.32 is marked "fabrica", and 6.29 has a second wording that names Folders alone.
- Tests brought up to date for the sections (each opens the section that holds the card it uses, as she would): t_61_backup,
  t_6101_device, t_62_eyes, t_632_sealed_stores, t_700_lock, t_700b_lock_shell, t_700c_lock_stores, t_700d_lock_backup. Still open,
  older than 6.32: rig/t_61_storage.js's simulated 12 MB device (its last part stops with "storage is full").

    node rig/t_633_settings.js <url> <out>               # 17 checks: the sections, their heights at 1440 by 900, Moving two by two,
                                                         # Storage's columns, the section kept, Find a setting and a reveal from
                                                         # elsewhere opening their section, Show every setting at once, a phone
    python3 rig/run_app.py <app dir> 18999 &             # (optional) the computer app's own back-end, for the third part
    node rig/t_633_reset.js <url> <out> [18999]          # 17 checks: a plain copy and its recovery shelf; a protected copy with a
                                                         # seal on its way (finishing during the reset, and still on its way as the
                                                         # page goes); the carried apps kept again; the desk on disk

Ingenium 6.32 (6 November 2026): the app library and Fabrica sealed with the lock. Her words: "I want you to encrypt Ingenium and
everything inside of it." Until now the lock (modules/r197.js, 6.9) left three stores plain: the app library (IndexedDB
ingenium_apps, the pages of her apps), Fabrica's repositories (ingenium_repos: every version's objects and each repository's record)
and the packages Fabrica made (fabrica_made).

- modules/r197.js: a second kind of sealed record, for bytes: {ing:"sealed",v:2,k,id,iv,ct}, AES-GCM-256 under the same data key, a
  fresh nonce each time, its place bound as additional data; the plain value is packed as a small JSON head followed by the byte
  arrays it holds, so a page is never turned into base64 on the way. Fabrica's objects keep their kind, size, depth and base object
  beside the sealed part (the repository reads them to make room and to copy itself to disk without opening every object); these are
  bound to it as additional data, so a change to them is refused. What every record holds is sealed; the names the stores file
  records under (an object's SHA-1 name, a repository's id, a package's name) are not. sealRec and openRec choose the kind by the
  store; the Backup page's open and seal take the new stores; the walker that seals what is already there takes them as a step of its
  own (mig.more), so a copy locked before 6.32 seals them at its next sign-in; turning protection off opens them. A record is
  replaced only if the store still holds the one that was read, now compared byte by byte (sameVal) rather than through text.
  IngLock.sealFor: what a part writes while the page is locked waits for the sign-in, so nothing is written to a sealed store in
  clear. Its three accounts of what is sealed say so.
- build_page.py (base page): libPut seals a page before it is kept, libText opens it, and a page brought back from a computer app's
  disk copy is sealed as it is kept. modules/r187.js (comparing two versions) opens what it reads.
- modules/r110.js: Fabrica's repository store seals as it writes and opens as it reads (objects, records, the list of repositories).
- modules/r112.js: Fabrica's packages and their cards likewise; window.fbMade for the page's tests. modules/r142.js: the storage page
  opens the packages' cards, and opens any sealed record before it looks in it for the long texts it names (so a text a sealed record
  names is never offered as one nothing names). modules/r178.js is unchanged: its one-time clean-up of old kits only skips a card it
  cannot read.
- Not sealed, as before: the carried apps' own documents in their frames, model files (public files, the same for everyone), the
  engine, and on the computer apps the earlier copies of the desk in desk-backups. What is new gains 6.32.
- Found while testing, older than 6.32 (6.31 does the same): rig/t_61_storage.js's simulated small device (12 MB for Ingenium) no
  longer holds four 1.5 MB versions of an app, so its last part stops with "storage is full" (68 of its other checks pass). Left
  for a later stage: it may be the test's assumption about how much a new profile keeps, or the page's own use of room.

    node rig/t_632_sealed_stores.js <url> <out>   # 21 checks with an invented page, repository and package: plain before; all five
                                                  # stores sealed after (no mark readable), read whole, a 40 MB page sealed with no
                                                  # growth and opened whole, written sealed, Fabrica's clean-up keeping every version
                                                  # (one kept as the change from another among them), a changed size
                                                  # refused, the Backup page's asks, a copy locked before 6.32 sealed at its sign-in,
                                                  # reload and sign-in, protection off writes them back plain

Ingenium 6.31 (6 November 2026): Folders brings in work from the other assistants, LM Studio among them. Her request: Folders should
bring in work from ChatGPT, DeepSeek, LM Studio and the other assistants, and from GitHub repositories, not only from Claude and Ollama.

- What was there: the shared import (thoughts/chat_import_core.html, used by Settings through r160 and by Folders) already read
  ChatGPT's .zip, Claude's, Gemini's Google Takeout, Grok, DeepSeek, Le Chat and Copilot as they were laid out in October 2026. Folders'
  card, Bring in your work, named only Claude, Claude Code and Ollama, so the others were not offered there.
- modules/r208.js: a way of its own, ChatGPT, Gemini, Grok, DeepSeek, Le Chat, Copilot and LM Studio, says where each export is found
  and has the key Bring in an export (the same reader as Claude's .zip). What comes in is sorted into the folders as before.
- thoughts/chat_import_core.html: LM Studio's chat files. LM Studio keeps each chat as a JSON file in the conversations folder of
  .lmstudio in the home folder and does not describe the file (its chat page, as a web search reported it on 5 November 2026; the page
  could not be read from here). The reader knows such a file by what it holds (messages that hold versions, a reply made again being a
  second version), reads the version chosen (else the last), its words from its content or its steps, keeps the system prompt as a
  note rather than a message, and takes the title, the dates and the model where they are present. It was tested on files invented in
  that shape, not on real ones: a real file that is not read should be reported, with the file if she is willing.
- modules/r160.js: Settings' import card names LM Studio's chat files too. What is new gains 6.31.
- Not yet: a GitHub repository brought into a folder. What a folder should take from a repository (its README, its files, its issues,
  or its history) is hers to say first.
- Three older tests had fallen behind the page, each found failing on 6.30 too and brought up to date: rig/t_67_claims.js looked for
  two sentences as they were before 6.8.4 (no GitHub on the door) and 6.12 (connected models in Blend answer at the same time), and
  for exactly 36 models in the catalogue (42 since 6.9.2 and 6.10.3; now at least 36, the SmolLM2 sizes still exact);
  rig/t_62_import.js looked for Ollama's num_ctx in its form before 6.12 (a request on Blend's own connection keeps 16,384). The
  import tests read their sample files (rig/import_fixtures.js) from the page's own address, as a browser allows.

    node rig/t_631_imports.js <url> <out>   # 8 checks, with invented files: the way and its key, an LM Studio chat read with its title,
                                            # model, chosen version and steps, the system prompt as a note, ChatGPT's and a plain
                                            # list still read, brought in and sorted into an invented folder, no page errors

Ingenium 6.30 (6 November 2026): a whole backup, sealed with a password of her own. Her words: "I want you to encrypt Ingenium and
everything inside of it. I want Ingenium to be fully encrypted end-to-end, and to be protected that is very important to me. I don't want
Ingenium to be at risk and vulnerable to hackers or malicious software. I don't want my data getting lost or being stolen or leaked".

- What was there (modules/r197.js, 6.9): an optional lock with a name and a password seals the desk, the long texts, the conversations
  brought in, the signing keys and Fabrica's issues and pages on the device (AES-GCM-256 under a data key the password unwraps). A backup
  from the Backup page stayed a plain zip even with the lock on: the Backup page opens the sealed records so that a backup can be
  restored anywhere.
- modules/r143.js. Seal the whole backup, a switch beside the keys' own, shares their password fields (the label says what the password
  is for) and is on by itself while Ingenium is locked. The finished zip is sealed in parts of 4 MB, each with AES-GCM-256 under one key
  drawn from the password (PBKDF2-SHA-256, 600,000 rounds, the keys' own figure), each part's nonce counted from a random one and each
  part bound to the file's head (salt, rounds, size), its place and whether it is the last, so no part can be changed, moved, dropped or
  added unseen. The file starts with a plain line, INGENIUM SEALED BACKUP 1, and its head; its name ends in .sealed. Restoring a sealed
  file asks for its password in place (a wrong one is told so and asked again; a changed byte is refused), then opens it as the zip it
  holds, every fingerprint checked as before; the summary says it was sealed. The file picker takes .sealed files; Save it again keeps
  the type. IngBackup.seal and IngBackup.unseal for other parts.
- modules/r197.js: its account of what is sealed and what is not says a backup is sealed when sealed on the Backup page.
- Still not sealed, as before: the documents the carried apps keep in their own frames, model files (public files, the same for
  everyone), the app library and Fabrica's saved versions of apps. What is new gains 6.30.
- Found by the regression run, older than 6.30 (6.29 does the same): since 6.8.11 every connection is also kept in a list on the
  device (r191, state.cxKept). Restoring a backup without that list, Replace's preview and its report said a connection was "set to a
  different address", and that its key was left empty, when the backup merely did not hold the list; the keys of the connection in use
  were carried as before (r191 puts it back in the list). modules/r143.js: a connection the restored desk does not hold at all is not
  counted as moved, in the preview or the report; where its address does change, the key is still left behind, as in 6.7.
- rig/t_615_tour.js: What is new may now start at 6.30 or later (its pattern stopped at 6.29).

    node rig/t_630_sealed.js <url> <out>     # 13 checks, with an invented conversation and password: the head and name, nothing
                                             # readable inside, the cipher and its rounds, asked without a password, a wrong one told,
                                             # the right one opens, a changed byte refused, the card's switch, the picker, the restore

Ingenium 6.29 (5 November 2026): a model's reply length and memory, remembered, and set wherever it works. Her words: the Tokens and
Context controls "reset", and she wants to set them, and the effort, on every page that runs a model (the Career Studio, Lector and the
rest).

- Measured on 6.24 (and unchanged on 6.28): a model with no saved limits was shown the sliders' midpoints in Chat's Controls (16,512
  tokens of reply and 17,408 of memory: a range input falls back to its midpoint when given no number) and then ran with them; the
  Models page's Settings saved those numbers on the model; and Settings cut a saved memory of 65,536 to 32,768, where its slider stopped.
  Lector, the Career Studio and Folders had Effort beside their model (r225) but no reply length or memory.
- modules/r233.js. A missing, zero or broken reply length, memory or effort is mended to the app's own defaults (1,024; 8,192 or the
  model's trained memory if smaller; 3), on opening, before Chat shows a model, and before Settings opens; a small model's own small
  memory (a trained 256) is kept. Settings raises its sliders to every saved value, so it shows and keeps them. Beside Effort on Lector,
  the Career Studio and Folders (a folder's Where we left off card), Reply up to and Memory set the same two numbers for the model that
  page writes with (Lector's plan), saved on the model and shown at once in Chat's Controls when it is Chat's model too; with a
  connected model they say they follow it. Lector's ask (outermost of its layers) lets a reply run to the model's own length where the
  model's memory has room for it beyond the prompt, and never shortens what a task asked for. A new memory takes effect when the model
  next loads; the strip says so when the loaded model has another.
- What is new gains 6.29.

    node rig/t_629_limits.js <url> <out>     # 12 checks, with stand-in model cards: defaults not midpoints, zero and broken numbers
                                             # mended and a trained 256 kept, Settings keeps 6,144 and 65,536, the strip on the three
                                             # pages, one change seen everywhere and after a reload, the reply length used within room

Ingenium 6.28 (5 November 2026): the Train room, in parts. Her words: "The cards on the Train tab inside of the Models page is really stiff
and not animated or clickable, please fix that. There is also a lot of scrolling on that page, it should have a redesign that has some
tabs and sections to better show the page and not have me endlessly scrolling and losing interest in the page's contents. The rest of the
pages inside of the Models Studio are quite short so the Train exceedingly long page looks off compared to the others."

- Measured on 6.27 at 1440 x 900: the Train room was 3,400 pixels tall (the Studio's other rooms 930 to 1,145): What can be trained here
  (792), Train a small model (176) and the learning workbench (1,412, its five steps one under another); the four bands of the first card
  were plain boxes of text.
- modules/r232.js, inside the Train room (#stP-train, modules/r199.js): three parts, one at a time, under a row of raised keys with their
  line: Overview (What can be trained here), Workbench (the learning workbench) and Trainer (Train a small model); the part chosen last is
  kept (ing.train.part.v1). Each part is 990 to 1,600 pixels tall.
- The Overview's four bands are tiles in two columns: the tag as a chip, the title, the first sentence, a chevron; pressed, Enter or Space
  opens one across the card with all it says, and the one open before folds; they rise in and lift under the pointer (the rise fills
  backwards only); The arithmetic is a raised key.
- Each workbench tool shows one step at a time: a row of numbered steps (Write like my text: Your text, How big, Learn, Try it, Keep it;
  the other tools' own five), and Back and Next under each step, naming the steps either side. A lesson keeps running whichever step is
  shown.
- Anything that opens the workbench (IngLab.open, wrapped), reveals a part of the room (r173's hook, from scrollIntoView, focus, the tour,
  Help) or moves the focus into it opens the part, the step and the band that hold it. The Trainer's and the Overview's words say "the
  Workbench tab" and "the Trainer tab" in place of "below" (r201, r199). What is new gains 6.28.

- rig/t_703c_lab.js opens a step before it uses a key or a field in it (as she would, through the step's key); rig/t_703_studio.js reads
  the truth card's words folded or open, finds the trainer in its own part, and counts the bands' columns on a phone; its rule that no
  key says "frontier" stands for keys that act, not for the band that explains why frontier training cannot happen at home.

    node rig/t_628_train.js <url> <out>      # 19 checks: three parts and each part's height, the part kept, the tiles (fold, lift, open,
                                             # keyboard, one at a time), the steps of all four tools, Back and Next, a real lesson trained in
                                             # the page running while another step is shown, reached from elsewhere, minimal motion, night, phone

Ingenium 6.27 (5 November 2026): the editions, as she set them out. Her words: "The Ingenium edition that will be made available to the
public and participants and even friends and family will only have the Home, Chat, Code, Folders, Focus, Models, Blend, Build, No apps,
and the Guide and Settings page without the Author Studio and its functions. The Lector, Career and Fabrica page as well as the Author
Studio and the rename Ingenium and Author key function are only reserved for my master edition and the "Full" edition with some
limitations such (no renaming Ingenium, and no Author Studio as well as no Author key generation. The Full edition will be a gift to my
partner so it will contain the apps and the Lector page, the Career Stuio and Fabrica but it will not have any of the apps from the
Offline Project built in and it will not have their skills and information or any of my profile information".

- Measured on 6.26 (rig/t_627_editions.js, which opens every page of an edition and reads its words, hidden rooms included, with the
  tour and the help): the gift and demo editions still had Fabrica and the five apps (Tabula, Abacus, Imago, Scriba, Fontes) and named
  them about a hundred times; the full edition named Carpe Diem, The Forge and Inkwell on Home's plaque, in Lector's list of apps
  ("Not added yet") and in the tour, and kept a hidden Author Studio tab.
- The public editions (gift, demo): Home, Chat, Code, Folders, Focus, Models, Blend, Build, the Guide and Settings. The page carries none
  of the five apps (build_page.py; editions.carries_desk) and leaves out their modules (r118, r123, r193, r194); Fabrica's code stays,
  as Build and the chat call it, but its key, page and route go (modules/r231.js, in these editions only, also takes the tour's Fabrica
  chapter and its step on the five apps, and paints the Guide's tour card again), and editions._public() takes every word of them out
  of Home (its Fabrica key and column; its apps row keeps the two instruments), the Guide, the tour, the help, the Inbox, the notes,
  Blend, Folders, the Studio's Data and Train rooms, and Settings (the backup's packages switch, which a backup reads, stays hidden in
  neutral words). Ingenium's own reference database (the chat's My sources, called Fontes) and its model house Scriba stay. Both public
  editions now name none of the owner's other apps (_blank, which the gift edition had alone).
- The full edition: the five apps, Lector, the Career Studio and Fabrica, with no Name card (6.7.1), no owner's key (r162, the master's
  alone) and no Author Studio (r226 and r227 are the master's, and r173 now makes a room only where its edition has it: CONF's when);
  and now _blank too, with Lector and the app library knowing Ingenium alone (LIB_KEYS, Lector's ORDER in r108; r140's seals keep all
  four).
- ING_HAS(part) in every page (an edit after ING_EDITION) answers author, rename and ownerkey (the master) and fabrica, desk, lector and
  career (the master and full editions). What is new: the lines about the Career Studio show only where it is carried (6.24, 6.22,
  and 6.17 split in two); 6.27 shows in the master edition.
- editions/ in this repository (the Mac mini's) holds each release's full, gift and demo pages with their fingerprints
  (editions/README.txt); release.py keeps that folder out of every kit.
- rig/t_62_editions.js expects every edition but the master to name none of the owner's other apps.

    node rig/t_627_editions.js <out> master=<url> full=<url> gift=<url> demo=<url>   # per edition: its side bar, the five apps carried or not,
                                                                                     # no route to a page it lacks, renaming, the owner's key
                                                                                     # and the Author Studio, every word of every page, the
                                                                                     # tour and the help, and no page error (SURVEY=1 lists)

Ingenium 6.26 (5 November 2026): the Guide, in rooms; What's new in a key. Her words: "Please make the "What is new card on the Guide
collapsible from view and folded inside of a cute popped out animated 3D button rather than this long list that is taking up half the
page and overwhelming me. In fact, the entire Guide page looks like a very long document that does not match the rest of Ingenium and its
graphics and designs. I want it rededesigned and reorganised to better fit the app. I want to see sections and animated 3D styling"; and,
of the first key made for it: "The "What's new" button is way too bulky and looks too bright and odd against the rest of the app on both
light and dark mode, please fix it."

- Measured on 6.25 at 1440 x 900: the Guide was 6,408 pixels tall, eighteen cards in one column, What is new the second card.
- Rooms (modules/r173.js, CONF.guide), as Settings and Models have them: Start here, Chat and Code, Models and devices, Making and
  study, Around the app, each with its line (a room's line may now be a function, so it names only what the edition carries); Find in
  the guide (r173's find box, its ids and words by page, Settings keeping its own); Show the whole guide at once. Each room is 900 to
  1,260 pixels tall. r173 gains data-rm-skip (a part of a page that is not a card) and a hook that lets a module open what folds an
  element (W.__rmRevealHook, called from openFolds, so reveal, autoReveal and Find all reach it).
- Topics as tiles (modules/r230.js): each card but the tour's gets a head key (its mark on a raised amethyst disc, its title, its first
  sentence, a chevron); pressed (or Enter), it opens across the room and the one open before folds; the tour's own card stays open,
  first in Start here. The tiles rise in one after another when a room is shown and lift under the pointer (the rise-in fills
  backwards only, so it never outweighs the lift); still with motion set to minimal or prefers-reduced-motion. A part inside a folded
  topic reached from elsewhere (the tour's ring, Help's Show me, Find, the focus) opens the topic and its room. Show the whole guide
  at once opens every topic; back in rooms they fold.
- What's new in a key beside the title: one of the page's own raised keys (the face, rim, shadow and corners of "Show the whole guide
  at once"), a small gold spark that turns now and then, the newest version in a quiet chip, a small gold dot until it is opened on
  this device (ing.guide.seen.v1). Pressed, a card springs out with the versions grouped, the newest open, each earlier one a line that
  opens; its foot says which version and build is running (the Guide's old foot line, moved there); Escape, its close key or a press
  outside folds it and gives the focus back. On a phone it rises from the foot of the screen, above the side keys (z-index 300: above
  the rail's 130, below the chat drawer's 620 and the dialogs' 800). r222's What is new card is kept, hidden, inside it.
- The page is titled Guide, with a new opening line; What is new gains 6.26.
- Tests that read a Guide card's shown words open it first (t_611_code); t_616_scroll shows the whole guide to have a page taller than
  the window; t_615_tour finds What is new in the key.

    node rig/t_626_guide.js <url> <out> [master|full|gift|demo]   # 27 checks: five rooms and their topics, each room's height, the tiles,
                                                                  # one open at a time, the keyboard, the rise and the lift, the key in the
                                                                  # page's family by day and by night, the card and its versions, Escape and a
                                                                  # press outside, Find, reveal, the whole guide, a phone with the side keys

Ingenium 6.25 (5 November 2026): Ingenium in its own words; the Workshop becomes the Author Studio, a room of Settings. Her words:
"There is a lot of mention of Claude on the Plan and session panel of the Coding chat, please remove them unless it is referring to a
function that connects to Claude. I want for Ingenium's pages and chatrooms to have their own identities, please [remove] the Claude,
Ollama and GitHub comparisons and others if there are more scattered around the app. I specifically want you to start with the Plan and
session panel in the Coding chat page"; and "Please rename the "Workshop" page to the Author Studio. Perhaps it would look better added
to the Setting page instead of being a part of Ingenium's side navigation bar."

- Measured on 6.24 (every string of the page's own scripts and markup, read with acorn): twelve places described a part of Ingenium by
  another assistant's way of doing it. In Code's Plan and session column, "as Claude's sessions do" (the GitHub row, r219) and "as
  Claude's connectors" (r220); the connector sheet and the Connectors card in Settings (r220); the Guide's cards on GitHub (r219),
  connectors (r220) and the environment (r223); two tour steps and three lines of What is new (r222); and in the 3.12 base, the Projects
  card ("the way Claude's projects do") and the card of Ingenium's own instructions ("the way Claude has its own"), changed by two edits
  in build_page.py. Each now says what Ingenium does in its own words. GitHub and Ollama were never compared: each is named only where
  Ingenium connects to it or reads its files, and so is Claude (a Claude connection, your Claude export, Claude Code's sessions).
- The Author Studio (modules/r226.js, r227.js, r173.js; the master edition only, as the Workshop was): a sixth room of Settings, after
  Ownership, with its own pen mark, holding everything the Workshop held (Check Ingenium, Errors since it started, Your layers, Your
  page) under a banner of its own. The side bar has no key for it; go("workshop") from anywhere (the tour, a notice, the Mac menu's
  routes) opens Settings at the Author Studio. Find a setting finds it ("diagnostics", "troubleshoot", "layers"). Its styles moved from
  #page-workshop to #wsStudio, the room's card. Check Ingenium opens every page in turn and comes back to the room it was run from
  (Settings alone would show the room chosen last: found by rig/t_618_workshop.js and mended before release). Ingenium's copy of its
  own page in Code is named "Ingenium (Author Studio)"; a copy made before as "Ingenium (workshop)" is still found. A page of her own
  (her layers) joins the side bar after Settings. The tour's step, the Guide's card and What is new say Author Studio. In every other
  edition the room has nothing in it, so its tab does not show.
- What is new gains 6.25.

    node rig/t_625_words.js <url> <out>      # 17 checks: no comparison anywhere in the served page; the Plan and session column; every
                                             # page's words, hidden rooms, the Projects card and the tour; the names kept where Ingenium
                                             # connects; the Author Studio in Settings (six rooms, go("workshop"), its cards, the tab,
                                             # Find a setting, the check coming back to its room, the Guide, the tour's ring, night, phone)
    node rig/t_618_workshop.js <url> <mock url> <out>   # 19 checks, following the Workshop into Settings
    node rig/t_619_page.js <url> <out>                  # 30 checks; rig/t_615_tour.js expects "Settings: The Author Studio"

Ingenium 6.24 (5 November 2026): Stop stops. Her words: "there is a bug on the "Stop" button inside of the Career Studio, I keep on
pressing it over and over again to stop a reading but it does not stop and I have had to close and force quit the app"; "the models
takes ages running in circles trying to dissect the simple instructions and calls it ambiguous"; "make the "Stop" button on the
Applications tab page purple".

- The cause. The engines answer a stop by handing back the words written so far, as if the reply had ended (wllama and the desktop
  adapter resolve with the partial text), so the layers around lxAsk took it for a finished draft and asked again: Ultra's check
  (r225) asked for a revision, and the repetition guard (r148) could ask again too. A connection's request was never cancelled.
- build_page.py 6.24: lxAsk refuses at once a request marked stopped. The layers pass the same request object down, so none of them
  can ask again for it; every other request (Lector, Ask Lector, Folders) is untouched.
- modules/r188.js. Each ask is its own request object; Stop marks it stopped, aborts the engine, cancels a connection's request,
  says Stopping at once (the key is disabled) and ends the panel within 2.5 seconds whatever the engine does. A late answer from a
  stopped request is dropped and never ends a newer run. The Stop key is the studio's purple (pri), as Do this now.
- modules/r188.js. A reading is asked as a reading: its rule opens "You read and advise on this device for the applicant" instead of
  telling the model to write in her first person while it judges (the confusion it reported as ambiguity). r225 counts that opening
  as a reading, so Auto gives it Low effort, without the long thinking that turned in circles; an effort chosen by hand (Medium and
  above) still thinks, and its thinking is shown in the panel. A model on this device reads at most about 30,000 characters
  of posting and profile, so its first word comes sooner; a connection keeps its full room.
- What is new gains 6.24.

    node rig/t_624_stop.js <url> <out>       # 11 checks, with a stand-in engine that answers a stop as the real ones do: the guard
                                             # in the page and through every layer, the purple key, the reading's own rule, one press,
                                             # no request after Stop, a new reading after it, and a deaf engine's late answer dropped

Ingenium 6.23 (5 November 2026): a model installed once. Her words: "there are a lot of duplicate models downloaded on the Models page
of Ingenium, the app does not seem to register when a model has been installed twice".

- modules/r229.js. lineupInstall never asked whether the model was already here, so Get pressed again (on the Models page, in Getting
  ready, from Lector or the Career Studio) fetched it again and added a card; a file brought in again (addEntries) became a second card;
  the other routes matched cards only by their own id. Now a lineup model already here is not fetched again and says so; a file already
  here (the same name and size) is not added again and says so. Cards that are the same model (the same lineup model, or the same file
  name and size) are listed at the top of Your models, with one key: Keep one of each. It asks first, then keeps the one in use (or
  the built-in one, or the first) and removes the others through removeModel, which frees their stored copies and only unlists a
  linked file (an Ollama blob or a file on a drive), never deleting it.
- What is new gains 6.23.

    node rig/t_623_dupes.js <url> <out>      # 10 checks, with stand-in model cards: found, listed, Get not repeated, a file not added
                                             # twice, asked first, the one in use kept, a model installed once untouched

Ingenium 6.22 (5 November 2026): the Career Studio reads a posting as an admissions tutor and a recruiter would, and shows its reasoning.
Her words: "The Career Studio does not analyse the job postings or uploading applications properly, it is waiting to see everything
written from my profile to match the roles or applications requirements verbatim and for it to be saying the exact same thing for them to
be considered as a match, if not, everything is considered as "Not a good fit" or a "Stretch" I want it to be more nuanced ... I want the
Career Studio to bridge the gaps from my resume without inventing any experience, skills and education"; "Instead of seeing a blank canvas,
I want to see the model's thinking on the Applications tab of the Career Studio"; and, of her doctoral choices, "I want the Lector page and
the Career Studio fully briefed and equipped to help me make the best decision with the right reasoning, analysis and data".

- The reading (modules/r188.js, readMsgs, parseRead): the model was asked to mark a criterion MET only when the profile "shows it plainly",
  PARTLY when it shows "something close to it, but not it", and to "never count what the profile does not show", as an adviser "who never
  flatters"; the writing rule added "never stretch what the profile says into more than it says". A model that obeys that marks experience
  that transfers from another setting as not shown. Now it reads as an admissions tutor and a recruiter: MET, TRANSFERABLE (the same ability
  shown in another setting), PARTLY or NOT SHOWN; it names the entry of the profile each judgement rests on and says how it answers the
  criterion; each gap is LEARNABLE, ASK ME (she may have done it) or REQUIRED (a formal requirement); and it says in two or three sentences
  how a reader would see the application. Never inventing stays the rule: drawing the link from her own record is allowed, claiming beyond
  it is not.
- The band (bandOf): a stated, weighted rule (shown 1, transfers 0.85, partly 0.5, not shown but learnable 0.25; desirable criteria a
  fifth), five bands (Strong, Good, Possible, A stretch, Not a fit), a formal requirement not shown makes it a stretch at best, and what the
  band would be if the Ask me criteria are hers. A reading made before 6.22 (no transfers, entries or gaps in it) keeps the rule it was made
  under, and says that reading it again gives the fuller reading.
- The guard against invention (vetEvidence): each judgement is checked first by the entry it names (it must be in her profile), then by its
  words; a "shown" or "transfers" found nowhere counts only as partly shown until she checks it, as before.
- How you fit shows the band with how a reader would see it, what waits on her, the gaps she could close, the formal requirements not
  shown, and for each criterion the entry it rests on and the link to make; How the model reasoned is kept with the reading.
- While it reads (livePanel): the model's reasoning as it comes (two edits in build_page.py: lxAsk hands a model's reasoning to LX.onThink,
  on this device and through a connection), a line saying what it is doing and for how long, and each criterion in a table as it is judged,
  in place of a blank panel.
- The writer (critBlock and the shared rule): a CV, a letter or a statement is told which criteria transfer, from which entry, and the link
  to make, and never to claim what is not shown.
- A profile file may carry applications (with their particulars, dates and notes) and people (each tied to the application the file
  names), or be a pack of only those (kind "ingenium-career-pack"); nothing already there is added twice.
- What is new gains 6.22.

    node rig/t_622_reading.js <url> <out>    # 26 checks, with a stand-in model that streams its reasoning and a reading, an invented
                                             # applicant and posting: the live panel, the request, the judgements, the guard, the band,
                                             # How you fit, the letter's request, an earlier reading, and programmes and people from a file

Ingenium 6.21 (5 November 2026): the Career Studio's add keys, chosen cards and back keys; Copy from the right-click panel; the
preview's own keys. Her words: "I want the "+ Bring one" button to be purple on the Today tab page ... the "+ A person" button of the
People tab page to also be made purple ... add the light purple colour of the "Roles and programmes that suit you" card to the selected
cards of the "Your Profile" tab page"; "The "< Today" button does not do anything when I click on it ... Its the same thing for the "Your
Profile" button"; "I kept on trying to copy this prompt that I typed in Ingenium's sticky notes to Claude's chat text box and no matter
what I tried it would not work properly, I had to use the keyboard's shortcuts"; and "Please redesign the Copy/Open/Download buttons that
is at the bottom of the Build's page live interactive Preview Screen". (The same changes were made in an earlier session and lost before
they were committed; they are made again here.)

- The Career Studio (modules/r188.js): + Bring one on Today and + A person on People take the studio's purple, as + Bring one on
  Applications and + A goal already had. The card open in a list (every room) takes the light purple of the pinned card, Roles and
  programmes that suit you, by day and by night. The back keys (‹ Today, ‹ Your profile, ‹ Goals and plan, ‹ Learn) are for a narrow
  screen, where the list and the open item are shown one at a time; a rule of the same weight that came later (#cs .c-btn) showed them
  on a wide window too, where both are shown and there is nothing to go back to. They now show only on a narrow screen, and there they
  take her back to the list, as before.
- Copy from the right-click panel (ten edits in build_page.py, on the panel ing-editmenu and the touch panel): the panel read the selection again when
  Copy was pressed, and a press on a key of the panel can take the selection out of a note first (in Safari's engine, which the Mac app
  uses; Chromium keeps it, so the test makes that happen by hand); and its copy went through the app's bridge after the press had
  ended, where a web view may refuse the browser's own way back. Now the words selected are kept as the panel opens, a press on the panel
  never moves the selection, and Copy, Cut and Copy the whole field first copy inside the press itself, the way Command+C and Ctrl+C do;
  the bridge and the browser's clipboard stay as the second and third ways. The touch panel's Copy whole note (a held press on the Fire
  and the iPad) does the same. Not yet seen in the Mac app's own web view, which does not run here: the test runs in Chromium with a
  bridge that refuses and a selection taken away.
- The preview's keys (modules/r228.js): Copy, Open and Download under Build's preview, and under Code's, were outlined purple pills in a
  pale tray, alone of their kind on the page; they are now the page's own raised keys (as Save this page beside them), each with a small
  line symbol, by day and by night. Their ids, titles and handlers are unchanged. Build's Copy, and csCopyText wherever it copies, copy
  inside the press first too, and say Copied for a moment.
- What is new gains 6.21.

    node rig/t_621_studio.js <url> <out>     # 24 checks: the four add keys, the chosen card by day and night, the back keys wide and
                                             # narrow, Copy, Cut, Copy the whole field and Paste on a sticky note, the preview's keys

Ingenium 6.20 (4 November 2026): the chat's height holds when it swings; Code's column without an empty band; Your page's downloads.
Her words: "the chat inside of the panel keeps on glitching back and forth"; "Please feel free to make other improvements to the
Conversation panel of the Coding chat page of Ingenium and its sections"; and "I really want for every new feature and everything
else inside of Ingenium works and works well".

- The chat's height (modules/r102.js): 6.11.2 held the steadier of two heights that swing within a moment, for three seconds; the
  same two layouts could then start the swing again, every few seconds. Now a swing seen once (as a page settles) is held for three
  seconds, as before, and the same swing again in the same layout (the window's size, the chat's place, the preview and its view) is
  held until that layout changes. A change of layout lets go at once; a height she sets with the grip is never held. Chromium does
  not swing here, so the test makes the swing by hand: whether this is the swing she sees on her Mac is not yet known.
- Code's column (modules/r215.js): the sessions list grew to 270 px whatever it held, leaving an empty band above Files with one or
  two sessions; it is now as tall as its sessions (up to 270 px, then it scrolls), and the files take the room that is left. Its two
  keys (Close this app, Remove from Code) were already as long as their words (since 6.11; 99 and 126 px measured).
- Your page (modules/r227.js; desktop/app_page_620.py): on the computer app, Download the page running is saved by the app from its
  own file, and the copy in Code goes over in pieces and is written whole by the app; before, about 100 MB crossed the page's bridge
  in one piece. A page file older than 6.19 has no Your page card, so it could not say it has started and Ingenium would go back from
  it after half a minute: it is now refused at once, with that reason.
- What is new gains 6.20; rig/t_615_tour.js accepts versions from 6.20 on as the newest.

    node rig/t_620_hold.js <url> <out>                       # 7 checks
    node rig/t_619_page.js <url> <out>                       # 30 checks now (the downloads and the refusal)
    python3 -I rig/t_619_app_page.py <repo>/ingenium_app.py  # 38 checks with app_page_620.py

Ingenium 6.19 (4 November 2026): Your page, in the master edition's Workshop: Ingenium's own page, changed, in place of the built one.
Her words: "I want full agency and authorship over Ingenium. I want to be able to make proper edits, customise, troubleshoot, fix,
curate, run diagnostics and add or remove new features, pages, sections or different functions in Ingenium as its author and creator."
Her answer on how changes take effect: both, layers first (6.18), then the page itself (here).

- Your page, the Workshop's fourth card (modules/r227.js; editions.py leaves it out of every other edition). On her computers:
  - Use the page from Code (the Workshop's copy, as the model or she changed it), or Use a page file: Ingenium asks first, hands the
    page to the computer app in pieces, keeps it as a version of its own and loads it at once, at the same address and with all her
    work as it is.
  - A changed page counts as working once its Workshop reports in. One that has not within half a minute, or did not come up at a
    start, is left: Ingenium goes back to the last page that worked (or the built one) on its own, says so on the card and once as a
    notice, and keeps her work as it was. A page that worked before is left after two starts in a row that did not come up.
  - Running, chosen for the next start, and each version kept (works, did not start, or not tried yet), with Use and Remove; Go back
    to the built page; Download the page running. At most five versions are kept, beside her stored work.
  - On a Mac, the app menu gains Use the built page, which works whatever a changed page does.
  - When Ingenium itself is updated, a page made on the earlier build does not start in place of the new one: the new built page
    starts, her page is kept, and the card says why. Chosen again, it starts on the new build, as she asks.
  - Reporting in never changes her choice.
  - In a browser, the card says how to keep a changed page: download it whole and open that file.
- The computer apps' side: desktop/app_page_619.py (Mac mini, Mac Intel, Windows), added to release.py's patches.
- The Workshop's copy in Code is lighter: what the page carries at its end (the apps on the Desk, the engine, the kits, the typefaces;
  about 61 MB of the 76) is left out, so the model reads and searches about 15 MB; it is put back whenever the page is used, and when
  Download the app is pressed in Code. The copy is used again while the page running is the one it was made from. The message to
  the model says the empty blocks are filled when the page is used.
- Found by the new test: Code's preview runs Ingenium's own page in a sealed frame, where Chromium, asked for the list of the
  browser's stores, refuses and also reports a rejection with no reason that nothing can catch (three times, for Ingenium's page:
  its saved Lab models and its old kits). Ingenium's own code handled the refusal; the extra report read as an error of the app.
  Every preview now refuses that list at once, first of all (modules/r223.js), so the model is not sent after errors that are not
  there.
- The Guide's Workshop card gains Your page; the tour's Workshop step and What is new gain 6.19.
- Not tested here: the window itself. The switch was tested with a stand-in for the computer app (the page side) and on the Python
  side with a stand-in window; the Mac's and Windows' web views do not run here. If a first real switch goes wrong, Ingenium goes
  back on its own, and on a Mac the app menu's Use the built page is there too.

    node rig/t_619_page.js <url> <out>                      # 27 checks, with a stand-in for the computer app
    python3 -I rig/t_619_app_page.py <repo>/ingenium_app.py  # 34 checks, Mac and Windows alike

Ingenium 6.18 (4 November 2026): the author's workshop, in the master edition; How I work, on every app in every Code session.
Her words: "I want to be able to troubleshoot Ingenium inside of the app. I want to be able to run diagnostics and be able to find and fix
a bug in the app. I want full agency and authorship over Ingenium. I want to be able to make proper edits, customise, troubleshoot, fix,
curate, run diagnostics and add or remove new features, pages, sections or different functions in Ingenium as its author and creator. I
want that capability added to my master version"; her answer on how edits take effect: both, layers first, then the page itself. And:
"I want the scroll bars kept hidden rule to be applied to all of my apps, please add that to the folders inside Ingenium as well for all
future apps" (the other apps' repositories, she then said, are to be left as they are).

- The Workshop (modules/r226.js; editions.py leaves it out of every other edition), after Settings in the side bar:
  - Check Ingenium: every part loaded, every page opened (Chat and Code only when a conversation of that kind exists, so it makes none;
    not the apps on the Desk, pages of their own), both stores written and read back, the room the browser offers, the engine and the
    models, the connections (never their keys) and connectors, the sign-in, her layers, the errors since it started, the version. Each
    line says ok, worth a look or wrong, in plain words; Copy the report.
  - Errors since it started: every error the page meets (thrown, a file that did not load, a promise not caught, an error written to the
    console), newest first, with when and where; the same error said twice (as thrown and again by Ingenium's own handler) is kept once;
    the last 50 are kept across restarts.
  - Find and fix with a model: Ingenium's own page opens as an app in Code (as Your apps opened it), with the report, or one error, in the
    message box for her to read before she sends it. The model searches, reads and changes ingenium.html; the preview runs the changed
    Ingenium; every change is a version she can undo; Download the app keeps the changed page.
  - Your layers, loaded as Ingenium starts on every device that has her data, the built page unchanged: pages of her own in the side bar
    (each in a frame of its own, apart from her data; or one of her Code apps), sections added to any page (written text, or HTML in a
    frame), scripts that run in Ingenium after every part has loaded (with all its power), styles (given the weight of two ids more, so
    they win over Ingenium's own), and pages or named cards she hides.
  - A safe start: Start without your layers (and with them again); and on its own when the last start stopped while one of her scripts
    ran, saying which. A script that fails is marked with its error and listed with the errors.
  - Next: on her computers, a changed page taking the place of the installed one, and going back to the last working version if it
    does not start.
- Folders: her rule (scroll bars hidden in every app, scrolling kept) is added once at the end of How I work, on every app, in the
  master edition, where she can change or remove it. How I work, on every app now goes with every Code session, not only those in a
  folder (modules/r208.js), and with every request Build makes (modules/r190.js), so every app she builds follows it.
- The tour's Settings chapter gains the Workshop (where it is carried); the Guide gains a card for it; What is new gains 6.18.
- Found by the Workshop while testing: Chromium reported "ResizeObserver loop completed with undelivered notifications" once, as pages
  were opened. That message is what a layout that reacts to its own size gives, one possible cause of her "glitching back and forth";
  the Workshop now records it, with its time, on her own device.

    node rig/t_618_workshop.js <url> <mock url> <out>   # 19 checks, with a stand-in for Ingenium's own page and the stand-in Claude

Ingenium 6.17 (4 November 2026): effort wherever a model is chosen. Her words (3 November 2026): "I want to be able to select low to
Max effort and Ultracode inside of the chats and everywhere a model can be selected to run a task or do work inside of Ingenium."

- Measured on 6.16: Chat, Code and Blend had effort (6.11, 6.12). Lector, the Career Studio and Folders, which share one model (the
  model Lector uses), asked it through lxAsk with thinking always off and the chat's own effort; Build's Ask a model to change this page
  ran the working loop with a fixed number of steps and the chat's thinking. Fabrica chooses no model: it hands work to Chat and Code.
- Lector, the Career Studio and Folders now share one writing effort (modules/r225.js), shown beside their model on each page (Lector's
  Who reads and writes, the studio's How the studio works, a folder's Where we left off), one choice as their model is one: Auto, Low,
  Medium, High, Extra, Max or Ultra. Auto reads quickly (Low) and writes at High through a connection; on this device it stays quick, to
  keep long work moving. Through a connection, the request carries its level, its thinking and its room; on this device, its thinking
  and a thinking room by the model's size, added to the writing room. Ultra writes at Max and then has each piece checked against its
  own material (every name, date, number, title, place, claim and quotation) and corrected; a correction that loses the form asked for
  (its JSON, its headings) or most of its length is not taken, and reading is never checked twice. The effort is put on the request
  where lxAsk makes it (two edits in build_page.py), so the recipe (r126) and the guard against writing that repeats itself (r148)
  keep working around it.
- Build has an effort of its own beside How should it work (modules/r190.js; r215.js lends it the settings of a level): Auto, Low to
  Max, or Ultracode. Its requests carry it as Chat's do: the service's effort or reasoning, the number of steps, and with Ultracode the
  plan, the checks run in the page and up to three times sent back while something is unfinished. Auto says under the request what it
  chose and why.
- The Guide's card on effort says where effort is chosen beyond Chat and Code.

    node rig/t_617_effort.js <url> <mock url> <out>   # 15 checks: a stand-in connection and engine, and the stand-in Claude for Build

Ingenium 6.16 (4 November 2026): a Code session's environment, as in Claude's; and no scroll bar in sight. Her words: "When I click on
the Settings button for the Environment section on the Coding chat inside of Ingenium, it just opens up the Controls panel, it does not
open the settings for the editing the Environment unlike Claude's coding chat settings, please make the fix to bridge that gap as well.
I want full parity please"; and "Please add this rule to Ingenium, all scroll bars unless explicitly stated are to be hidden from view
while keeping the scrolling functionality intact. I don't like seeing them in view, they detract from the look of the app."

- The gear beside Environment, in the Code session's column, opens the environment (modules/r223.js), laid out as Claude's Edit cloud
  environment (her picture): its Name (the Default one cannot be renamed or removed), Network access, Network secrets, Setup script and
  Environment variables, each a raised row that opens its own page, and Save changes. Its last row, the model and its engine, opens
  Controls, which is what the gear opened before. One environment can serve many sessions; a session uses the Default until another is
  chosen; the column names the session's environment and what it holds.
- Ingenium's apps run in the preview beside the conversation, so the environment is where the app runs, and each setting works there:
  Network access (Full, as before; Listed sites only; None) is a content security policy put first in the app's page, so the browser
  itself refuses requests, scripts, styles, pictures, fonts and frames from sites not allowed, and the preview's console says what was
  refused and why (a window the app opens to another site is not stopped). A network secret is added as a header to the app's requests
  to its one site, so a key is never written into the code. The setup script runs before the app's own scripts at each load. The
  variables are read as window.ENV.NAME.
- The model is told the network rule, the variables' names, the secrets' sites and that a setup script runs, never a value. None of it
  is written into the app's files, its versions, a download or GitHub. Values are kept on this device (sealed with her data when the
  sign-in is on); a backup she exports carries them, as it carries her connections' keys.
- No scroll bar in sight (modules/r224.js): one rule for the whole of Ingenium's own page, the page's last word, so every part scrolls by
  wheel, trackpad, touch and keys with no bar to see, including parts that drew their own bars. A part she asks to see a bar on can be
  marked data-scrollbar="shown". Pages shown inside a frame keep their own look: the app being built, in the preview, and the apps on the
  Desk (Tabula, Abacus, Imago, Scriba, Fontes).
- The tour's Code chapter gains The environment; the Guide a card for it; Code's help its key.

    node rig/t_616_env.js <url> <out>       # 22 checks, with an invented app and two stand-in sites
    node rig/t_616_scroll.js <url> <out>    # 9 checks, in a browser that draws real scroll bars (Playwright hides them by default)

The working audit of 6.16 (4 November 2026). Her words: "I really want for every new feature and everything else inside of Ingenium
works and works well, that is really key to me. I need for the chat pages and all of their new features and sections work well in the
way that they are supposed to. I want the same for the Folders page and the Career Studio. I really want for Ingenium to not just be a
pretty shell or a pretty purple app". Every pass-or-fail test of those parts was run on the 6.16 release page, with stand-in models,
sites and services and invented people:
- Chat: t_open_chat 10/0, t_694_plus_switches 54/0, t_694_sources 14/0, t_695_memory 30/0, t_695_openin 16/0, t_696_cards 11/0,
  t_claude 27/0, t_6111_popups 17/0, t_694_cloud_limits 23/0, t_6811_connections 11/0, t_690_agent 44/0, t_614_connectors 24/0.
- Code: t_611_code 37/0, t_613_github 43/0, t_614_code_more 9/0, t_615_code_look 10/0, t_616_env 22/0, t_63_code_editor_app 9/0.
- Folders: t_610_folders 21/0. The sign-in: t_699_recovery 24/0, t_700_lock 58/0.
- The Career Studio: t_6812_career 25/0, t_683_career 48/0, t_685_career 25/0, t_696_profile_file 13/0, t_697_people 14/0,
  t_697_back_link 12/0, t_698_job_link 28/0, t_702_career_dates 15/0, _export 15/0, _interview 17/0, _lector 13/0, _linkedin 17/0,
  _minutes 11/0, _reading 18/0, _refs 12/0, _snapshot 11/0, t_6102_templates 12/0, t_6102_scroll 13/0, t_6102_ui 17/0,
  t_6103_more 12/0, t_6104_fixes 9/0.
- What was found: four tests (t_683_career, t_685_career, t_702_career_lector, t_6102_scroll) failed one check each while four
  browsers ran at once and passed alone, on 6.16 as on 6.14: their checks read the page before a colour's change or a step had
  finished under that load. Two tests had not followed the app: t_702_career_minutes read Today before its three steps were shown (Today
  has shown one step at a time since 6.9.7; the test now presses Show three at once, as she would), and t_claude stopped at a picture
  of a card folded in its room (the picture is now optional; every check of it passes). No fault of the app was found.
- Her "the chat inside of the panel keeps on glitching back and forth" (6.11.2's guards): rig/t_617_glitch.js sets up a Code session
  as in her pictures and the Chat page with a long conversation, and watches every size, place and layout class at 19 window widths
  and two heights while nothing happens, and the scroll while a reply is written: nothing changes back and forth, in Chromium. What it
  cannot see: the Mac app shows the page in Safari's engine (WebKit), which this machine does not have; her description of when it
  happens is still needed to find it there.

    node rig/t_617_glitch.js <url> <out>    # 6 checks

Ingenium 6.15 (4 November 2026): the guided tour, its demonstrations and the Guide, up to date in every edition. Her words: "Please
make sure that the guided tour and its demonstrations are also updated as well as the Guide page to reflect the latest pages and
sections as well as updates recently made to Ingenium, they should all be properly updated to reflect the latest version of Ingenium,
the same for all of the different editions of Ingeniums and its demos."

- Measured on 6.14: the tour had 56 cards in 13 chapters and none for Code, Folders or the Career Studio; Chat's chapter showed neither
  effort nor connectors; Models showed neither the newer models nor the engines; Making things had one card for Blend; Settings showed
  neither connectors nor the sign-in. Help had no page for Folders or the Career Studio, and Code's help toured the Chat chapter. The
  Guide had no card for Folders, the Career Studio or the models, and no list of what is new; its tour card guessed "About ten minutes",
  and the tour's last card named the rooms of an older tour.
- The tour (modules/r222.js): 16 chapters and 73 cards in the master and full editions. Chat gains Effort and Connectors, and its model
  and + key cards say what changed (the connected services' models in the menu; a document that opens beside the chat). A Code chapter
  of six cards: building an app, the plan, the Session column, Ultracode, GitHub, and pointing with @ and commands with /. The plan card
  is a demonstration: in a Code session of the tour's own, an example plan is ticked off in the column beside it, one task at a time;
  when the tour ends, that session is removed and hers is put back, with her column as she left it. A Folders chapter (two cards), a
  Career Studio chapter (three cards, where the edition carries it), Newer models in Models (and Two engines, only where the computer's
  app carries the newer engine), Ways to blend in Making things, and Connectors and Your data, sealed in Settings. The expert's shorter
  tour keeps effort, Ultracode, @ and /, Ways to blend, connectors and the sign-in. A ring stays on a part that draws itself again (the
  Plan and Session column). The chapters of pages made as the page starts (Folders) join once the page is there: the page can say it is
  ready a moment before its last parts are made, which first left Folders out.
- Help: Folders and the Career Studio have help of their own; Code's Tour this page opens the Code chapter.
- The Guide: What is new (each version from 6.9.1 to 6.14 in one line, newest first), Folders, the Career Studio, and Models (newer ones,
  and the two engines). The tour card no longer guesses a time; the tour's last card names the chapters this copy's tour has; the
  Models and Settings chapters' lines say what they now hold.
- Every edition: the Career Studio's chapter, help, Guide card and lines are left out where the page is not carried (the gift and demo
  editions), as Lector's are; no new text names Lector or the owner's other apps. Each text was checked against the notes of the version
  that made the feature (Blend has eight ways and Ingenium chooses; Ultracode is sent back up to three times, saying what is left).
- The gift and demo editions could not be built since 6.10.2, found while testing this: two notes in modules/r189.js quoted her words
  about the line of rights, tools/strip_comments.js keeps every comment that names a copyright, and one of them named Lector, so the
  check that no Lector is left stopped those editions' build. The notes now point to this README, where her words are.
  rig/t_62_editions.js expected what the page held before 6.8.10: it now counts the colophon's credit (drawn under the pages, and in
  its code), and the licence's plain words and the owner's keys among the owner's lines, as every edition carries them by design.
- Code (her words, 4 November 2026: "please hide the scroll bar from the Plan and session panel on the Coding chat page. I want the
  scrollability kept but I want the scroll bar hidden to match the rest of the app"; "The 'Find a repository' text box area inside of
  the panel is a little too small ... I also want the Repository option list to be a little bit more 3D animated to match the rest of
  the app"): the Plan and session column scrolls by wheel, touch and keys with no bar to see (modules/r215.js). In the GitHub
  repository picker (modules/r219.js), Find a repository is as wide as the list and as tall as the other fields; each repository is a
  raised key as the app's keys are, lifting under the pointer, pressing in when pressed, the chosen one held up with an amethyst rim;
  the rows rise in one after another when they arrive (not again at each letter typed), all still when motion is set to minimal.

    node rig/t_615_tour.js <url> <out> [master|full|gift|demo]   # 20 checks, with an invented app and session
    node rig/t_615_code_look.js <url> <out>                       # 10 checks, with a stand-in GitHub

Ingenium 6.14 (4 November 2026): connectors, in Chat and in Code. Her words (3 November 2026): "I want connectors added"; and (4
November) "I want full parity with Claude's Code chat ... and so much more".

- A connector is a server that speaks MCP (the Model Context Protocol) over HTTP, as Claude's connectors are (modules/r220.js). She adds
  one by its address, with a token when the server asks for one (kept on this device, sent only to that server; https is required for
  a server on the internet). Ingenium asks the server what it is and lists its tools, every page of them, each marked as one that only
  reads or one that changes something.
- In every conversation where a connector is on (all of them unless she turns it off there: the + menu, Connectors, and the Code
  session's column each have a switch), the model is offered its tools through the working loop, on a connected model or one on this
  device; a conversation with no files now uses the loop for them, with instructions of their own and no file tools (modules/r190.js).
  A tool that only reads runs when asked; one that changes something asks her first (Allow once, Always allow it, Not now), showing
  what it would send. Each use is a step under the reply.
- The transport is MCP's Streamable HTTP (JSON-RPC 2.0 over POST, answered as JSON or as server-sent events), with the protocol version
  agreed at the start and the session a server keeps (Mcp-Session-Id), started again once when the server has forgotten it. netFetch
  now gives its callers a response's headers (build_page.py, 6.14), and the Mac and Windows apps' relay passes those two headers back
  (desktop/app_mcp_614.py).
- Not yet, and said so in the Guide: a server that only takes its provider's own sign-in page (OAuth) needs a token instead; a server
  run as a program on the computer (stdio) is not started by Ingenium; in a plain browser, a server that refuses pages from elsewhere
  cannot be reached.

    node rig/t_614_connectors.js <url> <out>   # 24 checks, with two stand-in MCP servers and a stand-in Claude that uses a tool

- Code, closer still to Claude's sessions (modules/r221.js): @ in the message box lists the app's files as she types (arrows, Enter or
  Tab, Escape) and puts @path in the message; the model is told, for that message, to read the files she pointed at first (an e-mail
  address or a name that is no file is not taken as pointing). The list of an app's sessions says each one's state: working, waits for
  you (a change to review), and its pull request. The steps that pushed a commit or opened a pull request carry their links to GitHub.

    node rig/t_614_code_more.js <url> <out>     # 9 checks

Ingenium 6.13 (4 November 2026): Code on a GitHub repository. Her words: "I still want full parity with Claude's Code chat, right now
its close but not quite there ... I want to be able to connect my Github repositories in the Environment of the Ingenium's Coding chat
and so much more"; and (3 November) "I want to be able to connect my Github's repositories to the chats and track the changes made during
the sessions".

- The Session column's Environment (and Code's first choice, From GitHub) connects one of her repositories (modules/r219.js). She signs
  in once with a token made on GitHub, kept on this device as Fabrica keeps it and sent only to GitHub; her repositories are listed
  (those she cannot push to say so), then the branches of the one chosen.
- The branch is read as it is now, in a few requests (its ref, its commit, its tree, then its text files, eight at a time), not its
  whole history as Fabrica's sync reads it. Left out, each named with its reason: binary files, files over 1 MB, folders of installed
  packages, files that may hold secrets (.env, keys); what is left out is never fetched. At most 2,000 files or 60 MB a session.
- Ingenium knows, file by file, what differs from the branch it started from (by each file's git fingerprint, as GitHub counts it), and
  what waits to be pushed, including the model's edits in the middle of its work. Review and push shows each file with its lines added
  and removed and its unified difference; the push is one commit, to the session's own branch (ingenium/..., or a name she gives
  before the first push), never to the branch it started from, and never forced. Where she cannot push, Ingenium offers her own copy
  (a fork), brings it up to date when it lacks the commit, and pushes there.
- Create PR opens a pull request from that branch into the branch it started from; the Environment and the session's top row (Push, n
  / Create PR / PR #n) then follow it: open, merged or closed, and its checks (passed, failed, running). Update from GitHub (before the
  first push) brings newer work into the files she has not changed and names those she has. Disconnect keeps the files and sends
  nothing to GitHub.
- The model is told where it works, and has four tools (modules/r190.js now lends its loop tools from other parts of Ingenium):
  git_status and git_diff (which only read), commit_and_push (to the session's branch) and open_pull_request (which always waits for her
  yes). Commands typed after a slash: /status, /diff, /push, /pr, /review (the model reviews the changes without editing), /update.
- The Guide has a card for it; the Code page's help names it.

    node rig/t_613_github.js <url> <out>     # 42 checks, with a stand-in GitHub whose files carry their real git fingerprints

Ingenium 6.12 (4 November 2026): Blend, deepened. Her words: "Please deepen and expand the 'Blend' page so that it really enhances
the app and provide great and powerful blend of models with thorough and precise reasoning and outstanding performance ... I want for
Ingenium to work as an ecosystem"; and (3 November) "I want to be able to select low to Max effort and Ultracode inside of the chats and
everywhere a model can be selected to run a task or do work inside of Ingenium."

- Before 6.12, Blend used only the models on this device, one after another, with five ways and replies of at most 1,536 tokens (3,584
  with thinking); the final answer came with no account of how it was reached.
- Her connected models (every connection she keeps: Claude, OpenAI, Gemini, Kimi, OpenRouter, Ollama) join a blend beside the models on
  this device, each with a choice of its service's models and a weight. They answer at the same time; the models on this device answer
  one after another, the one already loaded first and the writer last, so fewer loads. A request from Blend names its own connection,
  reply room, thinking and effort on the request itself (`cloudChat`, build_page.py 6.12), so the chat's model is never switched, its key
  never used by a blend, and the limits Ingenium learned for the chat's model are not applied to another (modules/r206.js, r195.js).
  Her own details (Settings, Your Ingenium) reach a connected model only when she allows it, as in the chat.
- Effort as in the chat: Auto (Low to Extra, chosen from the question, never Max), Low, Medium, High, Extra, Max, and Ultra, Blend's
  Ultracode. Effort sets each model's thinking and room, and how many times the final answer is checked: Extra once, Max up to twice;
  Ultra writes a plan first (the checklist a complete answer must meet, shown and ticked off), has every answer written against it, then
  checks and corrects until the check passes (up to three times). Claude is sent its effort ("max" at Max and Ultra); OpenAI, Gemini and
  OpenRouter their reasoning effort where they take one. Each level is explained on hover, in one line beside the key, and in the Guide.
- Three new ways: Debate and settle (each model reads the others' answers and revises its own, saying what it changed and why), Check
  every claim (the writer answers, the others check it claim by claim, the writer accepts or rejects each finding and corrects), Divide
  the work (the writer divides the task, each part goes to the model named for it, the writer joins them). And Ingenium chooses: Check
  every claim for code, Debate and settle for a question that weighs options, Divide the work for a long task in parts (three models or
  more), Compare and combine otherwise; it says what it chose and why, before the run and under the answer.
- Who writes the final answer can be chosen (Ingenium chooses: the greatest weight; then a connected model of Claude, OpenAI, Gemini, Kimi
  or OpenRouter before one on this device; then the largest). Under the answer: How it was settled (agreed, differed and what was kept,
  left out, findings accepted or rejected, in the writing model's own words and marked as not checked against sources); Ingenium's own
  count of agreement when every answer is short (a name, a number); every check and correction; the time each step took.
- The answer goes to the chat (a new conversation; the Chat page is told which one, as it opened its last one before, an old fault of
  Open in the chat, now mended), into a folder (a conversation with the folder's way of working), Notes, Tabula, Word or the clipboard.
  Under any reply in the chat, Check with Blend sends it to be checked claim by claim by the models she chooses; the corrected answer can
  go back to that conversation. A blend kept as a house keeps its connected models, effort and writer, and answers in the chat whatever
  the chat's source.

    node rig/t_612_blend.js <url> <out>      # 44 checks, with stand-ins for Anthropic, OpenRouter, Ollama and the engine on the device

Ingenium 6.11.2 (4 November 2026): newer models, found online when she asks; two guards for the chat. Her words: "I want a path built
into Ingenium's models page that goes online when I click on the button to check and download and install newer models for Ingenium
instead of having to continuously do it myself or having you do it on this chat"; and "the chat inside of the panel keeps on glitching
back and forth".

- Models, Ingenium's models: "Check for newer models" (modules/r217.js) asks Hugging Face, when she presses it, for the newest GGUF
  repositories of twelve publishers (ggml-org, unsloth, bartowski, lmstudio-community, Qwen, LiquidAI, mistralai, google, ibm-granite,
  nvidia, openbmb, microsoft). For each it reads Hugging Face's own records: the model's kind and parameters, and each file's size and
  SHA-256. It offers only a kind this device's engine loads (the 153 kinds of llama.cpp b11321, read from its source; on a computer whose
  copy carries the newer engine, its 14 more) and a file that fits this device's memory, choosing Q4_K_M first; it says why it offers
  nothing else. Install uses the same checked download as Ingenium's own models; a found model gets a lineup entry of its own (kept
  across restarts), can be made a house's model, and says it is not part of the reviewed lineup. What it cannot know before she tries
  a model is how well it answers. The weekly look is a switch, off until she turns it on: Ingenium reaches the internet only when asked.
- Chat: one rule keeps her place while a reply is written (80 points from the end, for live and full redraws alike; a full redraw used
  240, so between the two the view could be pulled down and left, back and forth); and a chat height that swings between two values
  within a moment settles on the smaller (modules/r102.js). Not reproduced here: her description of the glitch is needed to confirm.

    node rig/t_6112_found.js <url> <out>      # 10 checks, with a stand-in Hugging Face and computer app

Ingenium 6.11.1 (4 November 2026): Ingenium's own pop-ups everywhere, and documents in a chat that open. Her words: "Ingenium's in app
popups look weird in this random basic dark gray format and completely detracts from the rest of the app, please redesign these popups
all over the app that are the same dark grey and match them to Ingenium's colour palette and animated popped out 3D look and animation";
and "The documents uploaded inside of the chats of Ingenium are not clickable or offer a preview when you hover over it".

- The grey box was the browser's own (alert, confirm, prompt). In the page, every one is now asked in Ingenium's own dialog (the raised
  amethyst card, with its spring): the Career Studio's removals and names, Fontes's collections, the Claude history, an earlier desk's
  restore, rename and delete in Chat and Code, and every notice (modules/r216.js; r115, r131, r188). A question asked from inside another
  dialog (Fontes, the earlier desks) opens over it and leaves it as it was. Training further from the Claude history is now a choice of
  three (closing it trains nothing); before, Cancel there trained a new model.
- Inside the five apps Ingenium carries (Tabula, Abacus, Imago, Scriba, Fontes; about 120 questions in their own code), a first layer
  answers in the same dialog without changing their code: a question stops the app where it asks, and once she answers, puts back the
  selection she had and repeats her press, so the app receives her answer there (a comment lands on the words she selected; a table that
  asks Rows, then Columns, is made once). Cancel repeats nothing. By night the dialog takes Ingenium's night colours.
- A document attached to a message (Word, PDF, text, code) is a key now, as a page was: it opens beside the chat, code as code in its
  language, and on hover shows its name, size, length and first lines.

    node rig/t_6111_popups.js <url> <out>     # 17 checks; it fails if the browser's own box ever opens

Ingenium 6.11 (4 November 2026): the Code session as in Claude's, and effort that means what it says. Her words (3 November 2026):
"I want Ingenium's Coding chat to have full parity with Claude's Coding chat. I want the same layout and behaviour during the sessions.
I want to see the plan laid out with the completed Tasks checked off the scrollable list"; "I want to be able to select low to Max
effort and Ultracode inside of the chats ... briefly explained accurately in a preview popup when I hover over it"; "I want Ultracode
to be at the highest effort, Code plans first, writes the app, runs its checks, reads the errors and fixes them, repeating until the
checks pass, showing each step"; "I want the 'Auto' function to be added and for the effort level and Token level to be better
regulated"; and (4 November) "I want the Environment, Context, Outputs, Changes and Background tasks sections added".

- Effort, beside the model's name under the message box (modules/r215.js): Auto, Low, Medium, High, Extra and Max, Ultracode and
  Thinking, each explained in a card on hover from the same numbers the app uses. Effort now means the same on every model: how much
  it thinks, how long it may write, how many steps it may take. Claude is sent Anthropic's own effort (low to max; before, Thinking off
  held it at Medium); OpenAI's and Gemini's reasoning models a reasoning effort, OpenRouter its reasoning object (a service that
  refuses it is asked again without it); Ollama thinks from Medium up; a model on this device thinks not at all at Low and up to four
  times its usual budget at Max. Effort no longer changes a local model's sampling: that stays at its maker's settings.
- Auto reads each message (a short question Low, an everyday one Medium, work or files or code High, a careful or long brief Extra;
  never Max) and says under the reply what it chose and why. The longest reply follows the effort unless she sets it by hand.
- Ultracode (Code, and a chat with files): Max effort, plan, build, check, fix. Two new tools in the working loop (modules/r190.js):
  update_plan (the plan as a checklist) and run_check (a check run inside the app as it runs, passing only when it returns true).
  When it stops with tasks open, errors at its last run, a change not run, or a failed check, Ingenium sends it back, up to three
  times, saying what is left.
- The plan in each reply (folded as Claude folds it) and in a column beside the conversation; the Session column: Environment, Context,
  Outputs, Changes (lines added and removed this session) and Background tasks (the reply being written, models being installed, the
  queue), each with its time and a stop key. The column floats over the preview when the window has no room for it.
- A clock above the message box while it works, with its latest step and Stop. Enter while a reply is written queues the message (it
  no longer stops the reply); it is sent when the reply ends.
- The Code page's left column: its two keys as long as their words; rename, delete and a new app's name asked in Ingenium's own dialog.
- The newer engine's self-test now records the binary that answered (its build and commit); a Mac build keeps the newer engine only
  when that proves it (desktop/app_engine3_6106.py). 6.10.5's report named the proven engine's version for both.
- A Guide card: effort, Auto and Ultracode in depth, with their honest limits.

    node rig/t_611_code.js <url> <out>               # 37 checks
    python3 -I rig/t_611_engine_proof.py             # 8 checks
    node rig/t_690_agent.js <url> <mock> <out>       # 44 checks (the working loop with every service's form; 7 tools now)

Ingenium 6.10.5 (4 November 2026): a newer engine beside the proven one, on a Mac. Her words: "I don't want to lose my reliable llama
cpp engine, I want the option of a newer engine where it tested and proven to work and work well but I still want the llama engine
kept optional or in some cases as a backup or default, depending on what works best. I want you to help me weight it out and decide".

- The decision, as put to her: the proven engine (llama.cpp b11321) stays the default; a newer llama.cpp (b12000, 29 October 2026,
  the first release that loads LFM3, DeepSeek V4.1 and Mistral Large 4) goes beside it, never instead of it.
- The Mac builds compile it as they compile the proven one (its commit checked), keep it in the app only when the app's own self-test
  answers with it, and set its speed beside the proven engine's in the build's summary. A failed compile or self-test leaves the app
  with the proven engine alone. Each engine carries the list of kinds of model it can load (ARCHS.txt, from its src/llama-arch.cpp).
- The computer app (desktop/app_engine2_6105.py) reads each model's kind from its file and chooses: automatic (the default) runs every
  model on the proven engine except a kind only the newer engine can load; "the newer engine where it can"; or "the proven engine
  only". If the newer engine cannot load a model, the proven engine loads it at once and keeps it for the session.
- The Models page's Engine room (modules/r214.js) shows both engines, what only the newer one can load, which engine runs the model
  now, and the three choices.
- Windows carries the same choice; its builds will carry the newer engine once its installer is made to take it out again when its
  self-test fails (next). The phone and tablet apps keep the proven engine.

    python3 -I rig/t_6105_engine.py             # 16 checks: the choice per kind, the fall back, the self-test, the patch
    node rig/t_6105_engine_page.js <url> <out>  # 8 checks: the Engine room's card, with a stand-in computer app

Ingenium 6.10.4 (3 November 2026): the Career Studio's scroll bars hidden; the Build page's code scrolls again. Her words: "I want
you to hide the scroll bar inside of the Learn panel of the Career studio page, it detracts from the rest of the app. I want
everything to remain consistent. I only want the scroll bar hidden from view, I want to keep the scrollability of the page intact. I
also want the scrolling ability of the Build page's 'Your code' panel restored, I don't want it to be stiff and unscrollable."

- The Career Studio's panels (Learn and every other) scroll with no bar showing, as Lector's and Fabrica's do (modules/r213.js);
  scrolling by wheel, trackpad and touch is as before.
- Build: the code panel and the preview had no height of their own, so the code grew to its full length (300 lines, wrapped, stood
  about 17,000 pixels tall) and only the page moved. Now both stand as tall as the window leaves them below the page's head (never
  less than 480 pixels), the code scrolls inside its panel, and at its end the page carries on to its foot and the colophon. On a
  phone the code panel stands at most about three quarters of the screen and scrolls inside.
- A correction: the notes of 6.10.2 gave 26 templates; the page holds 25, in 8 fields.

    node rig/t_6104_fixes.js <url> <out>        # 9 checks; on 6.10.3 the same test fails five of them

Ingenium 6.10.3 (3 November 2026): more models for every device, and quicker replies. Her words: "I want better, stronger and
faster models and more options for my fire tablet app and for the iphone and iPad apps. I want that for all of my devices, the Mac
mini, the MacBook Pro, and the windows laptops as well."

- Further choices under each house (modules/r212.js), read from Hugging Face on the day: every file's name, size and SHA-256 as its
  repository lists them, and each model's kind read from its own file (all kinds the engine of this release, llama.cpp b11321, lists).
  MiniCPM5 1B (OpenBMB, Apache 2.0) for phones and tablets from 3 GB; Ministral 3 3B Instruct (Mistral AI, Apache 2.0) for every
  device from 6 GB (phones) or 8 GB (computers); Nemotron 3.5 Bolt E4B (NVIDIA, October 2026, post-trained on Gemma 4 E4B; OpenMDW
  1.1) for computers and iPads from 12 GB; Ministral 3 14B Reasoning (Mistral AI, Apache 2.0) for computers with 16 GB. They sit on a
  list of their own (a device's "more"): each house's list is also the order in which it picks, so a model added there would quietly
  replace today's pick on some memory sizes. Today's picks stay as they were, for every device and band (t_698_lineup.js): each
  maker measures its model against different rivals, so none can be ranked above them on one scale. The Models page lists the
  further choices under each house (Velox now has a list too), with what each needs; one press installs it, one press makes it the
  house's model, and Back returns to Ingenium's own choice.
- Quicker replies on a computer with a graphics chip: speed-up files for MiniCPM5 2B (OpenBMB's DSpark), LFM2.5 8B-A1B and 24B-A2B
  (Liquid AI's DSpark), Qwen3.8 27B and its Best copy (DFlash, from llama.cpp's own publishers) and Nemotron 3.5 Bolt E4B (DFlash).
  The engine reads each file's kind itself. As before (R73), a speed-up file is used only on a graphics chip; how much quicker it
  makes a reply on her own computers was not measured here.
- Each new model runs on its card's settings: MiniCPM5 1B 0.9 and 0.95 when it thinks, 0.7 when it answers at once; Ministral 3 3B
  temperature 0.1; Ministral 3 14B Reasoning 1 and 0.95; Nemotron 3.5 Bolt E4B 1.0 and 0.95.

    node rig/t_6103_more.js <url> <out>         # 12 checks: the further choices, choosing one, the speed-up files, the settings

Ingenium 6.10.2 (3 November 2026): every page ends with the colophon; templates by field and role; the portfolio. Her words: "I want
the app to be more scrollable on the Lector, Career Studio, and Fabrica pages, they feel stiff. I want to be able to scroll and see the
Ingenium seal and copyrights declaration at the footer ... It's the same for both chat pages, I like how they look when I open their
pages and I don't want anything to change"; "I want for Ingenium and its pages to have resume templates and cover letter templates
for different industry and different roles within them ... to help any applicant"; "I want the Career Studio to genuinely help me build
and refine my portfolio for any job application ... phd application or fellowship application, grant, scholarship application".

- The colophon (modules/r189.js) now ends Chat, Code, Lector, the Career Studio and Fabrica too. Each opens exactly as before, at the
  top, and fits the window (her earlier request, that the Career Studio not be endlessly scrolled, still holds: only its panels scroll
  through its work); a short scroll past the room shows the seal, Local model studio and the copyright. A panel scrolled to its end
  carries the scroll on to the page, as the Build page scrolls, instead of stopping there.
- Templates (modules/r209.js; Learn, CV and letter templates): 25 roles in 8 fields (written as 26 when released; corrected in 6.10.4) (universities and research; education and learning
  design; technology, data and AI; digital humanities, libraries, archives and museums; public service, policy and charities; business,
  sales and operations; writing, publishing and communications; fellowships, grants and scholarships). Each says what its readers look
  for, the CV's sections in the order that serves it, the cover letter's moves, the length and form, what to avoid, and an example line
  with square brackets where her own facts go. They describe common practice in the UK and the US; a posting's own instructions come
  first. Used for an application (from the template, or from What you send, where one is suggested from the posting's words), it shapes
  the CV, the letter and the portfolio the studio writes; the model is told it gives the shape only, and that every fact comes from
  her profile.
- The portfolio, a document of its own in What you send (jobs, doctoral and other applications): two to four pieces of her own work as
  short case studies (what it is, her part, the problem, what she did, what came of it, what it shows for this application, where to see
  it), chosen and ordered for the application, drawn from her apps as Lector read them, her documents and her entries; no figure, user
  number or outcome her profile does not give. A lesson on portfolios joins Learn.

- No ceiling on memory (modules/r210.js; the computer apps' side in desktop/app_parts_6102.py). Her words: "I want Ingenium to be able
  to run stronger models and be strong enough to run on larger computers with far more RAM than 64GB. I don't want Ingenium to be
  capped at 64 GB RAM". Until now each house's list stopped at what 48 to 64 GB holds. Seventeen larger models join it, from 96 GB of
  memory to 3 TB: Qwen3-Next 80B-A3B Thinking, Qwen3-Coder-Next, Nemotron 3.5 Bolt 74B-A9B, Qwen3.5 122B-A10B (and a compact copy),
  gpt-oss-120b, Qwen3.8 Flash Next, GLM-5.3 Flash (and a compact copy), DeepSeek V4 Flash, Qwen3.5 397B-A17B, MiniMax M3.1 Flash,
  GLM-5.3, Qwen3.8 2.4T-A95B, DeepSeek V4 Pro and Kimi K3 (two copies). Every file's name, size and SHA-256 was read from Hugging
  Face (rounds 8 and 8b of the lineup workflow) and checked again file by file, 141 files in all; each model's kind was read from its
  own file and is one the engine of this release (llama.cpp b11321) lists. The memory rule is unchanged, so each house takes the
  largest model that fits: Magister the largest general model, Scriba the quickest, Faber the coders; a computer with no graphics chip
  gets only the mixture-of-experts models with at most 18B parameters at work on each word. Models over 50 GB come in parts (Hugging
  Face keeps no larger file): the computer apps now install, list, move and delete a model in parts, each part fetched, carried on where
  it stopped and checked by its fingerprint, kept under the names the engine reads; a file chosen on the computer is added by its first
  part. Each runs on its card's settings where the card gives them. Not run end to end: no machine within reach has the memory.
- Home's Scriba and Fontes stones wear their marks, as the side rail's do, 4 pixels from the name (modules/r211.js).
- Your models on a phone: the card is no longer one row whose three keys squeezed the details into a strip; the name and details take
  the card's width, and the keys sit beneath them in one row.
- Build: long lines wrap inside the code panel; the panel's head says so ("Long lines wrap") and one press keeps each line on one row
  instead; the choice is kept.
- The Fire and Android app without its models (57 MB): when it has neither its own models nor a built-in one, the Models page offers
  the same two, in one press, fetched inside the app and checked by fingerprint. The full app (about 1.5 GB) needs room on the
  tablet's own storage for the download and for the copy Android makes while installing it.
- The Mac build: the Touch ID helper of 6.10.1 is now built for macOS 13.3 and for the chip of the app itself (it had taken the build
  Mac's newer macOS, and the check that every part runs on 13.3 rightly stopped the release).

    node rig/t_6102_scroll.js <url> <out>       # 13 checks
    node rig/t_6102_templates.js <url> <out>    # 12 checks, with a stand-in model
    node rig/t_6102_large.js <url> <out>        # every band from 96 GB to 3 TB; the install the page sends, checked by the app's own check
    node rig/t_6102_ui.js <url> <out>           # Home's marks, the cards on an iPhone, Build's long lines, the small Fire app
    python3 -I rig/t_6102_parts.py              # models in parts: install, resume, fingerprints, move, delete, choose; the patch

Ingenium 6.10.1 (3 November 2026): the computer's own sign-in as a way back in. Her answer: "Yes, my computer's own sign in (Touch
ID or Windows Hello) also open Ingenium."

- Settings, Your data, Your ways back in: This computer's own sign-in, turned on with the password first, then the computer itself
  (Touch ID or the Mac's own password on a Mac; Windows Hello on Windows). It says plainly that anyone who can sign in to the
  computer as her could open Ingenium this way. Turned off, the computer's key is removed too.
- At the sign-in, the computer is asked at once (once a session), and Ingenium opens without the password; Open with Touch ID (or
  Windows Hello) stays under the form if it is cancelled. Opened so, the password can be changed without the old one. Can't sign
  in? lists it. A computer that does not hold the key says so.
- How: the data key is kept wrapped with a key of 256 bits that the computer holds in its own protection, never in the lock record.
  On a Mac, tools/IngeniumKey.swift (built into Contents/MacOS/IngeniumKey by tools/finish_mac_app.sh wherever Swift is present;
  without it the app works as before and says Touch ID cannot be asked) asks LocalAuthentication, then reads the login keychain. On
  Windows, desktop/app_device_6101.py asks Windows Hello through Windows PowerShell, then opens the key sealed with DPAPI in the
  app's own folder. The phone and tablet apps do not offer it yet.
- Not checked here: Touch ID's sheet and Windows Hello's window cannot be shown where this was built (no Mac, no Windows). The page's
  side, and the app's side against a stand-in helper, are tested; the Mac build says in its summary whether the helper was built.
  On a Mac, the keychain may ask once, after an update, whether the new helper may use the key.

    node rig/t_6101_device.js <url> <out>       # 14 checks, with a stand-in bridge
    python3 -I rig/t_6101_device.py             # 15 checks: the app's side, with a stand-in helper

Ingenium 6.10.0 (3 November 2026): Folders, a folder for each of her apps; and her work brought in from Claude and Ollama. Her
words: "I want a safe way to move my data from Claude and Ollama to Ingenium so that I don't lose all of my work ... I want folders
built in that classifies every app that I have been working on and will build in the future. I want the folders to document how I
like to work ... so that ... the models don't have to start over from 0 everytime and need to load up everything from memory or
reread all of the context again and drain tokens." Her answers: start from the apps in her profile; bring in all of it, mainly
Claude's chats, Claude Code on her Mac (run with Ollama's models) and Claude Code on the web.

- Folders (a page of its own, after Code; modules/r208.js). It starts from the apps her profile names (the Career Studio's entries of
  projects, and the apps Lector has read): she unticks, adds, and makes them; a folder for a new app can be made at any time.
- A folder is one of Ingenium's projects (kind "app"), so every conversation in it carries what it keeps: How I work on every app,
  How I work on it (her own words), Where we left off (a summary), the decisions so far and what is open next. That is a few
  thousand words at most, instead of every earlier conversation (a test checks that none of their text goes with a new one).
- Where we left off is brought up to date on her press, with the model Lector uses: only the conversations not read yet are read,
  each once (a conversation added later is read alone, with the summary so far). The model is told never to invent a version, a
  date, a decision, a file or a feature. What it sees of how she likes to work is offered for her to keep or drop.
- Conversations are sorted into the folders by the words that mark each (the app's name and its parts' names, which she can add);
  one that names no app clearly waits under Not sorted yet; any can be moved by hand.
- Bring in your work: Claude's .zip (its chats, and its projects as Ingenium projects); Claude Code's sessions on this computer, read
  on her press through the app's own bridge (desktop/app_claude_610.py: only the .jsonl files under .claude/projects, or under
  CLAUDE_CONFIG_DIR; nothing else is read; Claude Code's documentation says their format is its own and may change, so the reader
  is lenient); Claude Code on the web (no export exists yet: a conversation is pasted, or brought down to her Mac with claude
  --teleport); Ollama (a model's Modelfile, pasted, becomes a way of working; a conversation in Ollama's own app is pasted).
- Models are not retrained by any of this. What makes a model know her way of working is what it is given to read; a folder gives it
  that, short. The page ends with the colophon, as the pages that scroll do. The way back from a folder is a quiet path above its
  name (Folders, then its name), not a raised bar.

    node rig/t_610_folders.js <url> <out>            # 21 checks, with invented apps and a stand-in model and bridge
    python3 -I rig/t_610_claude_sessions.py          # 15 checks: the app's side, on a stand-in home folder

Ingenium 6.9.9 (3 November 2026): ways back in, the sign-in in the door's own place, and Claude's model names written as Anthropic
writes them. Her words: "Ingenium's sign in page looks slightly awkward floating over the app's introduction door ... find a better fit";
"I want a proper and strong and robust recovery system on Ingenium so that a user does not get locked out of their work ... I want a
path that protects me and ensures that I can always find a way back into my account"; "I want you to remove the dashes from the Claude
models name, they should be written normally."

- At the welcome door, the sign-in takes the door card's place, as wide as it, on the door's own ground, nothing dimmed behind it;
  Not now brings the door's card back. Elsewhere it is asked over the page, as before.
- Ways back in, each opening the same data key on its own: the password; the ten words; a recovery key file (new: a random 256-bit
  key she keeps on a stick or a drive; the lock keeps only the data key wrapped by it, and the file's id, so the newest file alone
  opens it; an older file, one from another lock, or a file that is no key file is refused in plain words); and a hint she writes
  (kept in plain words in the lock record, since it is shown at the sign-in; a hint that holds the password is refused). Turning the
  sign-in on now ends with Save it (the key file) and the hint. The sign-in's Can't sign in? lists every way back in; a wrong password
  shows the hint. Settings, Your data: Your ways back in, with Change the password, See or renew the words (new words replace the old
  once two are typed back), Save a new key file, and the hint. A short check after the sign-in, a day after it is turned on, then a
  week, a month, and every three months: are the words and the file where they were left?
- There is no maker's key and no back door: a copy opens only with what its owner keeps. If every way back in is lost, what is
  sealed cannot be opened by anyone; the ways are therefore several, kept in different places, and checked now and then.
- Claude's model names: Claude Fable 5.1, Claude Opus 5.5, Claude 3.5 Sonnet, in the chat's model key and menu, the chat's note,
  Settings, Lector, the Career Studio and the context and limit notes (window.ingModelLabel); the service is still asked for the model
  by its own name. Other services' names stay as they write them.

    node rig/t_699_recovery.js <url> <out>      # 24 checks, with an invented person
    node rig/t_700_lock.js <url> <out>          # 58 checks (Can't sign in?, Your ways back in)

Ingenium 6.9.8 (3 November 2026): a posting from its link, read against her profile at once; and the jobs she saved on LinkedIn.
Her words: "I want to be able to paste a link of a job that I am interested in applying to in the Career studio and have the analysis
be done and the match profile for me and the job be done from there ... Ingenium can go online to get the information. I want that
feature added and I want it to really work", and "I want to be able to link my LinkedIn account to Ingenium so that I can have Ingenium
fetch my saved jobs easier ... keep my data and information protected and safely stored on my device ... and always with my permission."

- A link pasted (in Applications, or in Bring a posting) is fetched once and read against her profile at once when a model is ready;
  pasting its text remains, and is read at once too. What is read first is what the site publishes for machines: on boards hosted by
  Greenhouse and by Lever, their public posting APIs as their documentation gives them (Greenhouse's Job Board API, GET
  boards-api.greenhouse.io/v1/boards/{board}/jobs/{id}, its content entity-encoded HTML, read from github.com/grnhse/greenhouse-api-docs;
  Lever's Postings API, GET api.lever.co/v0/postings/{site}/{id} or api.eu.lever.co, read from github.com/lever/postings-api); on other
  sites, the schema.org JobPosting that job sites put in their pages for search engines (JSON-LD, or microdata); failing both, the
  page's readable text with its lists kept as lists. The title, who offers it, the place, the hours, the pay and the closing date come
  from that data where it is given; a closing date written in a sentence is found too. LinkedIn and Indeed links are tidied to the job's
  own page; tracking is left out. A page behind a sign-in (LinkedIn), one that refuses, one built only by scripts, or one gone is said
  so plainly, the paste box made ready, with Look for it elsewhere (a search for the same post on the employer's own site, on her press).
  Not checked here: the schema.org and Google pages on JobPosting could not be opened from where this was built, so its property names
  are read leniently and anything missing is passed over; the job sites themselves could not be reached from here either, so the
  stand-ins in the test follow the documented shapes.
- The reading vetted: each piece of evidence it names is looked for in her profile itself; not found in its words, a "shown" counts as
  partly shown until she checks it, and the table says so. What to lead with: up to three entries of her profile that answer the
  posting best, kept only when they are entries of her profile.
- Saved on LinkedIn: LinkedIn's own copy of her data (the .zip she asks LinkedIn for) brings the jobs she saved and those she applied to
  into Applications, to be taken one at a time: Bring it in fetches that posting, only then, and reads it; Not this one sets it aside;
  brought in again later, only the new ones are added. Nothing signs in to LinkedIn and nothing is sent to it. Its columns are read
  loosely by name (LinkedIn does not document them). A direct link to her LinkedIn account was not built: as far as is known here,
  LinkedIn's sign-in for other apps gives only a name, an email and a picture, and reading her saved jobs while signed in as her would go
  against LinkedIn's terms; LinkedIn's developer pages could not be opened from here to check this again.

    node rig/t_698_job_link.js <url> <out>      # 28 checks, with stand-in sites and a stand-in model

Ingenium 6.9.7 (3 November 2026): the Career Studio for an intense season of applications. Her words: "I will be juggling many job
applications, phd applications prep and emailing potential supervisors, reference requests and hiring managers and recruiters. I need a
system built-in Ingenium that can help me streamline all of that and manage it all"; her answers: one step at a time; tracking it all;
Ingenium drafts, she reviews all and edits freely.

- People (a room beside Applications): potential supervisors, referees, recruiters and hiring managers in one list, each with a status
  (to write to, draft ready, sent, replied, follow up, done), a date to follow up (ten days for a supervisor or a referee, seven for a
  recruiter or a hiring manager, changeable), notes, and the application it serves. Draft an email for me writes a first draft from her
  profile and the notes alone, never inventing a name, a work, a date or a claim (what is missing is left in square brackets); she reads
  it, changes it and copies it into her own email: Ingenium sends nothing. The referees kept with each application are listed there too.
- Today, one step at a time: the single most urgent step across her applications and her people, the rest folded under What else is
  waiting; Show three at once on request.
- A profile file carries what she is looking for (looking, need, avoid, where, when), brought in where those are empty.
- The Scriba and Fontes keys of the dock: the mark 4 pixels from the name, as on Carpe Diem's keys (it was 14).

    node rig/t_697_people.js <url> <out>        # 14 checks, with invented people and a stand-in model
    node rig/t_697_stone_gap.js <url> <out>     # 3 checks

Ingenium 6.9.6 (3 November 2026): a profile in one file (her words: "I don't want to have to input my information for my profile
from scratch on my master version", and "I want that to be replicable for a second user profile and so forth"; her choice: her profile
reaches the app as a private file, never through GitHub). In the Career Studio, What the studio may use has Bring in a profile file and
Save this profile as a file, and an empty list of entries offers the first. A profile file (.json, kind "ingenium-profile", v 1) holds a
person's entries in the studio's sections, documents with their text, and CV; what it holds is said before anything changes; it fills
an empty profile, or is added to this one, or becomes a new profile of its own; nothing is doubled, and the CV becomes Lector's when none
is kept yet (`modules/r188.js`). `node rig/t_696_profile_file.js <url> <out> [a real profile file kept outside the repository]` (14
checks with invented people).

Ingenium 6.9.5 (3 November 2026):

- A connected model for Lector and the Career Studio (her words: "I also want to be able to load and run a connected Cloud model
  from Claude or GPT and etc, inside of the Career Studio and the Lector page and not just only have the local models as
  options"). The connection set in Settings, Connections (Claude, GPT, Gemini, OpenRouter, Ollama and the others) is offered in
  Lector's model box and in the Career Studio's "How the studio works", by name ("Use claude-fable-5-1 (Anthropic)"), and used
  only when chosen, since what Lector reads then goes to that service; both pages say so, and each has the way back. The Career
  Studio writes with the model Lector uses, so one choice serves both (`modules/r108.js`, `r188.js`; the lxAsk edit in
  `build_page.py`). Lector's parts follow the connected model's window, up to 262,144 tokens, and never more than the key may
  send in a minute once the service has said so (`r195.js`); a part refused as too long is never cut: it goes back to Lector as a
  context error and is read again in smaller parts (`r206.js`). `node rig/t_695_lx_cloud.js <url> <out>` (12 checks).
- The tour's example (her words again: "the current one kind of reads a little weird when it shows the "Thinking" box"): the
  thinking opened with nearly the reply's own first sentence, so it read as a first draft of the reply; it now weighs what the
  plan rests on and only then decides (`rig/t_692_keys.js`, 19 checks, with the raised keys of the Display panel).

Ingenium 6.9.4 (3 November 2026). Four repairs, each found first by a test that failed on 6.9.3:

- The switches in the chat's + menu (her words: "its really hard for the turn the "Research" and the "Web Search" toggles to enable
  them, they are so hard to select no matter how hard I click"). Each switch was a `<label>` holding a checkbox inside the row's
  button: a click on the switch reached the button twice, so the setting turned on and straight back off; only a click on the
  words worked. The switch is now a picture of a switch, so a click anywhere on the row turns it over once, in Chat and in Code;
  the row tells a screen reader it is a switch and whether it is on, and the keyboard's focus stays on it. The R206 edits in
  `build_page.py`; `node rig/t_694_plus_switches.js <url> <out>` (54 checks; 18 of them failed on 6.9.3).
- A connected model's limits (her words: "I tried to run Fable through the API key on Ingenium and the chat kept on crashing
  because it was exceeding Token limits"). The history of a connected model was fitted to its window less the slider's reply
  (about 1,000 tokens), but the request asked for the model's whole longest reply (up to 128,000), counted at 3 characters a
  token; a refusal for size or for the key's tokens a minute ended the reply. Now the history leaves room for the reply really
  asked for, at 2.5 characters a token (or the service's own count, once a refusal has said it); a refusal for size is answered by
  leaving out the oldest part and sending again, saying so under the reply; the key's tokens a minute (429) and a busy service
  are waited out on the reply's status line, twice at most; Stop ends a wait. `modules/r206.js`;
  `node rig/t_694_cloud_limits.js <url> <out>` (23 checks against a stand-in for the Messages API; 14 failed on 6.9.3).
- Sources only when they belong to the reply (her words: "The scholarly sources all nonsense and keep on showing up with every
  reply, I want that removed, I only want real and accurate sources and only when they pertain to the reply do I want them cited
  and provided"). Scholarly sources first is off until it is switched on; a scholarly record is kept only when half of the
  question's words are in it and one at least in its title; the list under a reply shows only the sources the reply cites, under
  its own numbers, and none when it cites none. `modules/r207.js` and the R207 edits;
  `node rig/t_694_sources.js <url> <out>` (14 checks).
- A notice is never a document: a reply that is only Ingenium's own notice in brackets ("(This reply was cut off before it began:
  …)") is no longer made a Word and PDF document when the message asked for one (`r1Notice` in `modules/r101.js`), and one made
  before is shown as the notice it is.

The welcome door's sign-in offer, moved on 1 November to a small lock key in the card's top-left corner (rig/t_700_lock.js, 58
checks), ships in this release. Run again on this build: t_cloud.js (12 connections through the app's relay), t_academic.js
(24), t_695_memory.js (30).

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

