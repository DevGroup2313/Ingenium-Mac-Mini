# Ingenium 4.0: how the page is made

`ingenium.html` in the four Ingenium repositories is built, not written by hand. These are its sources.

## Ingenium's own rules (keep every one)

Every change to Ingenium keeps these. The owner gave each one; the master edition also carries them in Ingenium's folder on the Folders
page (`build/modules/r297.js`), so every conversation about Ingenium there carries them to the model.

- **Pages may grow** (her words, 14 November 2026: "I don't want Fabrica or any other page inside of Ingenium to be limited to only tabs
  and just one page, Fabrica can have other pages apart from the main page to further develop it and achieve full parity with Github if
  necessary, please add that rule to the app and its folders. You don't have to squish everything into one page, we can create more
  space, pages, tabs and sections as needed as long as it does not ruin the design and template of the app and can be done tastefully to
  further enhance the app and its capabilities."). Fabrica, and every other page, is never limited to one page and its tabs: a page may
  have pages of its own beyond its main one, and more tabs and sections, wherever the work needs the room. Nothing is squeezed onto one
  page. Each new page, tab or section keeps the app's design and template, and is made tastefully.
- **No flat or plain surfaces** (her words, 14 November 2026: "Please make sure that there aren't any flat and plain surfaces on Ingenium
  as you continue working."). Every card, note, sheet, key and field has its depth, by day and by night; raised never means heavier or
  thicker. Built into Ingenium's own rules too (`build/modules/r297.js`).
- A live interactive preview before any new look or anything new, drawn from the app's own measured surfaces; built only on her word.
- Every key lifts, sinks and sounds (Home's click); every surface raised, never flat; nothing on a page is rewritten while it is left
  alone; every motion gentle and smooth, never brusque.
- Nothing Chrome 83 lacks (no `Element.replaceChildren`, no `:has()`): the Fire tablet's web view (`rig/t_680_old_webview.js`).
- The four repositories are public: no profile, document, plan or private note of hers in any of them; tests use invented people.
- Never release a version number another branch has used, even without a build.

## The sources

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

Ingenium 8.14 (28 November 2026): the Engine's Stop writing; Ingenia asks before the model writes; Fabrica's seal, title and panels; the crest; no rings.

Her words (28 November 2026): "I want to be able to stop the model from writing straight from the Engine panel in the same location where I
can load and unload the models. I also want you to have Ingenium ask me if I want to have the models start writing and updating Ingenia's
apps' folders instead of automatically having the model start writing without me knowing. I want to be able to pick and choose." With it,
on Fabrica, Ingenia and the logos (all of it kept in `r421.js`'s note).
- The Engine panel (`r374.js`): Stop writing stands in the row with Load and Unload, right after them (they stay first, as 7.97 put
  them). It wakes when the model writes for any page
  (r397's ingModelInUse names whom: Lector, Vocatio, Ingenia, Memory or a reply) and says so; pressed, each page that writes is stopped as
  its own Stop key would (Lector pauses, Vocatio and Concordia stop, the reply ends), then the engine and a lent or cloud model. What was
  written so far is kept. The state card says "Writing for Lector" (or whom) while it writes.
- Ingenia asks first (`r390.js`, `r421.js`): after three quiet minutes, the folders with conversations not read yet are offered in a card
  (each with its logo and how many wait); she ticks the ones the model may read and write into, presses Bring them up to date, or Not now,
  or Don't offer again. Nothing is read or written before she chooses; a folder she leaves is not offered again until more of its
  conversations wait (or half a day has passed). Those she chose are brought up to date one at a time, each with Undo, with a Stop key while
  it reads. The switch in Memoria now says what it does: "When I am away from the keyboard, offer to bring my folders up to date; I choose
  which, and nothing is written before I do".
- No rings (`r421.js`): r378's four copies of each logo's face behind it (its "rim") were each a little larger than the face; as the logo
  sprang back after a press (r402) they showed all round it as a ring, blue for Carpe Diem and The Forge, violet for Ingenium. They are
  no longer drawn; everything else of the logos and their presses is as it was.
- The Offline Project's crest (`r378.js`, `r421.js`): a logo like the others now, at its own proportions: it sways, leans under the
  pointer and, on its folder's page, is a key (role button, Enter and Space) that sinks, springs back, sounds and plays r402's flourishes,
  with a light that passes over its enamel at each press.
- Fabrica (`r421.js`): the work panel's title had a 15 px line under 15 px letters with its overflow hidden, which cut the g of Ingenium;
  its line is 1.3 times its size now. The seal beside it is a key with the seal key's press, spring and flourishes and Ingenium's key sound.
  The three panels have their full height again: since 7.33 the path bar and the Next card (r315) stood inside the frame of fixed height
  and took about 200 px from the panels (612 px in a 900 px window); the frame now grows by exactly what they take (815 px again).
- Fabrica's run rows (Care, its actions), stiff since they were made (rig/t_733 found them so on 8.13 too) and on show now that the
  panels are tall again, lift under the pointer as r315's cards do.
- Checked on the page: rig/t_814_requests.js, 17 checks (the Stop key's place, its waking and its stop; the offer, her choice and
  nothing written otherwise; no rim; the crest a key that sinks, springs and shines; the title whole; the seal a key; the panels'
  height). Run again on the 8.14 page: t_797_engine 5, t_777_engine 14 (brought up to date: since 7.97 Load and Unload name the model),
  t_788_know 10, t_797_logo_press 11, t_779_ingenia_logos 8, t_804_ingenia_weight 44, t_696_fabrica_head 19 (brought up to date: the
  panels' own height, and r302's eyebrow), t_733_fabrica_way 15 (its runs now lift), t_743_fabrica 10, t_fabrica_narrow 4, t_794_memoria 9, t_799_atlas 41.

Ingenium 8.13 (28 November 2026): a second orb on the welcome orbit; Phaistos's builder.

- The Sign-in Orbit (`r410.js`). Her words, of the 8.12 welcome: "I want a second orb added to the new sign-in for another profile or
  user login into my master edition of Ingenium". Every other profile on this device now stands on the welcome orbit as its own orb (its
  initial, its name and how it opens), as in the approved preview's Test Person and Guest; pressing it opens Ingenium in that profile, as
  its button on Who is using Ingenium does (its password asked as it opens, where it has one). With no other profile yet, the second orb
  is Someone else (a plus, "Add their profile"): pressing it opens the desk on Settings, Security, Profiles on this device, where a
  profile is added (the master edition, where its owner keeps the profiles; and an app made from Ingenium that asks for it with
  window.ING_ORBIT_ADD, as Phaistos does for the two people it is made for).
- Phaistos's builder (`build/phaistos`, new): her app for her parents, made from the Gift edition (so nothing of hers in it): its colours,
  name, icons, layered 3D logo (logos3.py, phl.js), wordmark, pages and Guide, and its own sign-in, the Courtyard (court.css): Ingenium's
  sign-in, sign-out, profiles, guest, record and second person, drawn as Phaistos's own. `python3 build/phaistos/make_phaistos.py <gift>
  <out> [logo]`; `node build/phaistos/make_icons.js <logo> <folder>` draws its icons.
- Tests: rig/t_813_second_orb.js (8 checks).

Ingenium 8.12 (28 November 2026): the welcome on the Sign-in Orbit; the other editions free of Lakay's name.

- The Sign-in Orbit (`r410.js`). Her words, with a picture of the welcome card: "Ingenium still does not have the sphere sign-in Orbit
  page and I have been waiting all night for it from the other session. Please push it through!" Since 8.08 the orbit stood behind the
  sign-in alone (a password set up, then the desk locked or signed out), so a copy without a sign-in, hers among them, still opened on
  the welcome card and never showed it. Now the welcome itself stands on the orbit, in the approved design: the soft violet ground with
  its stars and two rings, the date in Latin and the greeting at the head with the welcome's own words, Ingenium's seal at the heart as
  the same key with Home's flourishes, her orb on the orbit (her name and "Opens straight away", or "Signed in"), and the welcome card
  as the plate at the foot: its name, the tour, Enter, Open straight to the app, the lock key that turns a sign-in on and the theme
  keys. Pressing her orb enters with one of the seal's flourishes, as Enter does; the orbit then gives way to the desk as it does after
  a sign-in. The orbit takes the welcome's own layer, so whatever opens over the welcome opens over it as before (a sign-in being set
  up keeps its own card). The logo in the top bar opens it again. "Open straight to the app" still goes straight to the desk.
- The other editions no longer name Lakay anywhere in their code: the last nine lines that did (Lector's PDF, Fabrica's build reading
  and order, the first start, Home's Fabrica, the library's list, the apps' order and, where there is a Fabrica, GitHub's logos) are
  taken back to what they do without it (`editions.py`, _no_lakay_code).
- Her approved Winter sounds: the 8.11 page already carries them, exactly as the last Winter Sounds preview plays them (Snowy pines,
  Winter cabin and Night woods as approved for 8.09; Lake shore as proper waves and the softer Rain on a tent, approved for 8.10, which
  had no page of its own, so 8.11 was their first release).
- Tests: rig/t_812_welcome_orbit.js (15 checks); rig/t_808_signin_orbit.js for the sign-in's own orbit.

Ingenium 8.11 (28 November 2026): every edition of her apps, for every device, made from the master edition.

- Her words (28 November 2026): "I want all of the editions of all of my apps built into the master edition for all of my devices, not
  just the master edition. I want full authorship and agency over all of the editions. ... I tried to make the Full edition Windows app
  from my master edition on my macbook pro and it only showed me one edition and downloaded the master edition only. ... I want to be
  able to choose between the different editions of all of my apps and devices in Ingenium, not just the master edition."
- The cause: Fabrica made every package from the version kept, so Ingenium's packages were always the master edition; the master page
  carried only the Demo edition (as a recipe, for The Offline Project).
- The master page now carries the Full and Gift editions as recipes too, each in its own slot (`build/demo_recipe.py` SLOTS,
  `ing-edition-full` and `ing-edition-gift`; `build/tail.py`). `release.py page` builds the Demo, Full and Gift editions first, from the
  same commits, then the master page with all three recipes (about 0.2 MB for the Gift, 1 MB for the Full), and stops before anything is
  committed if the page would pass GitHub's 100 MiB; `release.py editions` publishes those very pages, each checked against the
  fingerprint its slot carries.
- `r268.js` puts any of the three together and checks it (its fingerprint, its edition's name, no app library, no owner's hand):
  IngDemos.edition(k), IngDemos.editions().
- New `r420.js` (the master edition alone): IngEditions. In Fabrica's Ship, under the package line, the app's editions as Fabrica's own
  keys (Ingenium: Master, Full, Gift, Demo; Carpe Diem: its full edition and its Public sample; The Forge: itself and its demonstration);
  in Download as an app, the same as the panel's own list. The edition chosen is the page every package carries, for every device (Mac,
  Windows, iPhone and iPad, Fire and Android, web, one page, kits): `r111.js` (IngShip.onePage) asks before the page is scrambled or
  signed, and `r349.js` gives an edition made for others no owner's door. The package is named for its edition (Ingenium Full, Ingenium
  Gift, Ingenium Demo); the Full edition keeps the master's id, so it installs over the master in place and keeps the work on that
  device; the Gift and Demo editions take ids of their own and never open her work.
- Windows on GitHub: the Demo edition's installer (Ingenium-Demo-Setup.exe) beside the Full and Gift ones (build-windows.yml,
  tools/get_editions.py).
- The other editions no longer name Lakay even in their code: Fabrica's and Home's two lines that added it where the library names it
  are taken out (`editions.py`, _no_lakay).
- Built on the other session's 8.08 to 8.10 (the Sign-in Orbit, its r410; the Cloud's waves; the nature sounds), merged; this
  module is r420, so the two never share a name.
- Tests: rig/t_811_editions.js (the three editions given back whole and byte for byte as published; each app's choices; Fabrica's keys,
  the package's name and id, the page every package carries; the panel's list). rig/t_807_cloud_room.js reads the drawing's spheres
  by their class as r409 names them (clx-oball).

Ingenium 8.10 (28 November 2026): Lake shore and Rain on a tent made again.

- Nature sounds (`r411.js`). Her words on the 8.09 pair: "The Lake shore splash sounds horrible"; "the Rain on a tent sound too harsh and
  fake, it sounds like popcorn or kringling sound"; on the next samples (source/previews/winter_sounds): "please reduce the crackling effect
  on it a little bit because it sounds like static"; "please make it sound more like proper waves on a shore"; then "It sounds much better
  now, please add it to the app and push it everywhere!" Lake shore: long, slow waves (a low swell, a rolling wash, a long backwash hiss),
  overlapping, in the smooth delay network; Rain on a tent: about 140 soft, rounded taps a second (each rises over 2 to 5 ms instead of
  clicking on), duller and gentler, the hiss outside lower, the heavier drops as soft thumps. No pitched note and no click in either.
- Tests: rig/t_809_nature_sounds.js (Lake shore now 46 s long).

Ingenium 8.09 (28 November 2026): the Cloud room's links carry waves of signal; nature sounds: Winter made again, Night woods, Rain on a
tent, Lake shore.

- Memoria, Ingenium Cloud (`r409.js`). Her words: "I just wanted to show the animated connection wireless connection signal links going from
  the mac mini's orb to the other two orbs" (the 8.07 shooting stars, and a later trial of stars passing through the small spheres, were not
  what she meant: "This looks bad, like really bad, I hate it"). From the keeper a link runs to each small sphere, from just outside one rim to
  just outside the other, drawn from where the spheres appear, so it stays attached as the scene leans; the preview offered three ways of
  drawing the signal; her choice: "I choose the waves look for the Ingenium Cloud preview". So waves of signal leave the keeper along each
  link, fanning away from its name, and each small sphere answers with a ring; before the Cloud is set up the links stand faint and still;
  nothing runs under Minimal motion or reduced motion.
- Nature sounds (`r411.js`). Her words on the 8.08 pair: "All of the Winter Sounds sound primitive and a bit worse please redo it." Snowy
  pines and Winter cabin are made again: wind through a state-variable filter whose middle rises with the gusts (and, in the pines, drifts
  across the trees); snow that lets go of a branch, falls without a sound, lands with a muffled thump and sifts; flames that flicker, sap
  that hisses, a soft howl outside; both in a smooth eight-line delay network in place of the small echo's metallic ring; slow curves worked
  out every 16 samples so each is made in about two seconds. Night woods ("I like the Night woods sound from the preview, please add it to
  the app"), Rain on a tent made again without the low falling notes that made it sound like drowning, and Lake shore join Night, Rain and
  Water. Her word on the last samples (source/previews/winter_sounds): "I approve of the previews, please commit and push it everywhere".
- Tests: rig/t_807_cloud_room.js (the waves, the links attached, faint and still before set up, nothing under Minimal motion);
  rig/t_809_nature_sounds.js (11 checks, formerly t_808_winter_sounds.js).

Ingenium 8.08 (28 November 2026): the Sign-in Orbit; Winter: Snowy pines and Winter cabin.

- The Sign-in Orbit (new `r410.js`; the seal key lent by `r290.js` as `IngSealKey`). Of the live preview (source/previews/sign_in_orbit):
  "This looks much better."; "I want the logo button to be clickable on the Sign-in Orbit"; "I approve of the previews, please commit and
  push it everywhere". The sign-in's door (r197) and Who is using Ingenium (r331, with r344's Signed out and r350's practice studio) stand
  on the orbit: a soft violet ground with its stars, two fine rings, the date in Latin; Ingenium's seal at the heart as the pressable key
  it is on Home; each profile an orb (Home's sphere, r261), its initial on it, its name and how it opens beneath. The sign-in's own card
  is the plate at the foot, greeting by the user name the sign-in was set up with and saying when the desk was locked; its fields, keys
  and ways back in are the very ones r197 draws and handles, so nothing about signing in changes. On Who is using Ingenium the profile
  door's own buttons are dressed as the orbs. Asked over the open page (turning the sign-in on, a new password) the door keeps its card.
  The plate adds a short record: when this device last signed in and any wrong password since, and the record of sign-ins (times only,
  kept on this device outside the seal, localStorage "ingenium_signin_log", so that it can show before signing in).
- Winter (new `r411.js`). Her words (28 November 2026): "I want more winter sounds added to the nature sounds of Ingenium, I want to hear
  some snow sounds as well. I want more nature sounds added to the app in general". Six samples were made with r295's kit to the measure
  of the places she loves (source/previews/winter_sounds); her word: "For the Winter Sounds, I like Snowy pines and Winter cabin, I hate
  the Fresh snow one." So Snowy pines (a soft wind in snowy pines, falling nearly still between its gusts; snow slipping from a branch,
  landing below, powder sifting after; crows far off once) and Winter cabin (a fire in the hearth, softer than Campfire and in a room; the
  wind outside, through the walls; fine snow brushing the window as it rises) join Noel in Winter. Rain on a tent is being made again;
  Lake shore and Night woods wait for her word.
- Tests: rig/t_808_signin_orbit.js (14 checks: protected, locked, the orbit, the seal key, her orb, the plate, nothing covered, a wrong
  password and the record, by night, on a phone, signed in again); rig/t_808_winter_sounds.js (7 checks); rig/t_754_sign_out.js 25/25
  (its night checks read the orbit's night ground where there is no card); rig/t_807_cloud_room.js 22/22 (the room as in 8.07).

Ingenium 8.07 (28 November 2026): Custodia's seal struck into its dial; Memoria's Ingenium Cloud room raised, its drawing refined.

- Custodia (`r408.js`). Her words (28 November 2026): "I also want you to sink in the logo button in the middle of the dial, I want it to
  look more built-in and not as a last minute addition." A live preview offered four settings (Inlaid, Bezel, Countersunk, Struck) beside
  the seal as it stood; her choice: "I prefer the Struck look for the Custodia dial, please add it to the app and push it everywhere." The
  seal's own disc gives way to the dial's face (opacity 0), so its ring, star and heart rise out of the dial itself; its cast shadow, its
  coin edge and the seat drawn round it are gone; the fine engraved ring stays, and the whole seal is still the key that plays Home's
  flourishes.
- Memoria, Ingenium Cloud (new `r409.js`). Her words: "All of the pages are flat on the Ingenium Cloud tab page in Memoria, please fix this
  and slightly redesign the page, it looks so plain and motionless and doesn't fit with the other tab pages on the Memoria page"; of the
  live preview (source/previews/cloud_room): "I approve of the previews for the Cloud room, please commit and push it everywhere".
  - The room speaks the From your chats room's raised language (r271's tokens, raised cards and keys, counters, wells, toggles and orbs,
    and the lean that r271 gives every .mr-pop): the room a slab; its head an eyebrow, a title, the Cloud's own words and its state in
    raised counters (on or off and who keeps it, when work was last sent and brought in, how many choices wait); two columns, the three
    steps as raised cards on the left, the devices in her Cloud as raised rows, what two devices both changed and the sync file on the
    right; the times in a well at the foot. r255 and r394 still draw every part and do all the work: r409 dresses and places what they
    draw, each time they draw it, and reads the Cloud's settings only to show them (IngCloud.settings()).
  - Its drawing, at her words: "make the little drawing more 3D and animated, I want it to be clickable and interactive like the rest of
    the app is"; then, of a first attempt that redrew it as an orrery: "I didn't want you to change the design of the drawing, I just
    wanted it refined and improved, please only do that"; and "I don't want the lines to stay solid and attached to the bigger orb. I want
    it to be like rays going in and out of the orbs." The same three spheres in the same places and the same line beneath; the spheres
    are Home's own (IngOrrery), each at its own depth over a soft shadow, bobbing gently; the scene leans toward the pointer; no line
    stays: while the Cloud is on, rays run from each device into the keeper and back out along the drawing's arcs, and each sphere glows
    as a ray reaches it. Each sphere answers a press (a hop, a pulse or a wobble, and a ray of its own), says what it is, and before the
    Cloud is set up opens the step it belongs to. The rays run only while the room is seen, never under Minimal motion or the system's
    reduced motion.
- Tests: rig/t_807_cloud_room.js (19 checks: not set up, in step from a Cloud seeded in the browser's own store with invented devices, a
  choice waiting from an invented conversation in r394's store, Minimal motion); rig/t_807_custodia_struck.js (9 checks);
  rig/t_802_custodia_dial.js 29/29 (its ring measured on the seal's face, since the coin edge is hidden); rig/t_794_memoria.js 9/9;
  rig/t_792_conflicts.js 4/4.

Ingenium 8.06 (28 November 2026): three fixes at her word: Vocatio's meanings say what each room does; no shadow over Clavis's
astrolabe; no light following the pointer on Custodia's dial.

- Vocatio (`r188.js`, `r283.js`, `r222.js`). Her words (28 November 2026): "For the Petitiones pointer english definition mentions Rome, I
  want that reworded and please remove the Rome mention. I want all of them to be reworded to actually reflect the Vocatio page and its
  functions, I don't just want literal definitions for the Latin names on the page."
  - Each room's meaning, under the pointer and in its spoken name, now says what the room does: Diurna, today's next step across the
    applications and the people written to; Dux, the guide through five stages; Petitiones, each application with its posting read
    against the profile, its drafts and dates; Socii, the people written to, each with a status and a date to follow up; Vita, the CV,
    the entries and what is wanted, the facts every draft is written from; Dotes, what transfers, the blind spots and what sets one
    apart; Cursus, the goals with their dated steps and the paths and roles that suit; Gradus, how each document is built, lesson by
    lesson, with templates for 25 roles. No literal gloss of the Latin is left, in the tabs or in the guided tour.
  - The label wraps onto two balanced lines when it is long (at most 400 points wide) and is kept inside the head at either end of the row.
- Ingenia (`r378.js`). Her words: "There is a heavy blurry shadow over the Clavis logo on the Ingenia folder page, please remove it but keep
  the look and animation of the Clavis logo button intact." Found: as the astrolabe swayed, the shadows of its raised parts (and the two
  shadows 8.04 gave its outline) fell across its pale face and greyed it by day, and haloed it by night. Now none of its layers casts a
  shadow; its depth, sway, lean and presses are untouched.
- Custodia (`r408.js`). Her words: "I like the dial from the Custodia page but I don't like the highlight that follows the mouse hover it
  looks really weird, please fix it." The light that followed the pointer across the dial (its sheen) is gone; the dial still leans toward
  the pointer and lifts a little.
- Test: rig/t_806_fixes.js (11 checks); rig/t_805_vocatio_names.js 9/9, rig/t_802_custodia_dial.js 29/29 and rig/t_804_ingenia_weight.js
  44/44, each updated for these changes.

Ingenium 8.05 (27 November 2026): Vocatio's rooms named in Latin, each with its meaning under the pointer.

- Her choices in the questionnaire (27 November 2026), then her approval of the live preview: Latin names for Vocatio's rooms, as
  Ingenium's pages have; the Latin name alone on each tab, its English meaning shown only on hover; "Career Studio" kept, in the
  head's eyebrow. `r188.js`, `r283.js`, `r290.js`:
  - The rooms: Diurna (Today, the daily record), Dux (once Your mentor: the guide, dux itineris, the guide of a journey), Petitiones
    (Applications: candidacies, as for an office in Rome), Socii (People: companions and allies), Vita (Your profile: a life), Dotes
    (Your edge: gifts, talents), Cursus (Goals and plan: the course, cursus honorum) and Gradus (Learn: steps, as in Gradus ad
    Parnassum). Each room's panel opens under the same name.
  - The meaning shows in a small label beneath the tab while the pointer rests on it or the keyboard reaches it, and goes when the
    pointer leaves; the tabs carry no other tooltip. Each tab's spoken name gives the Latin name and its meaning.
  - The head: its eyebrow reads "The Career Studio · The compass of your path", its key reads Dux, and its line says Dux leads you
    through the stages, one after another.
  - Every sentence that sends you to a room names it by its new name (`r188.js`, `r222.js`, `r283.js`, `r290.js`, `r323.js`,
    `r377.js`): the back keys, How it works, the messages ("It is in Vocatio, under Petitiones"), the cards in Dux, the DPhil plan, the
    Guide's card and the guided tour, where each Latin name comes with its meaning. Dux speaks as Dux where it said Your mentor or
    Your counsellor. What is new keeps the old names in the lines of the releases that used them.
  - Test: rig/t_805_vocatio_names.js (9 checks: the eight names, the meanings by hover only, the head, each room's panel, no old
    name left in any room, the Guide's card).

Ingenium 8.04 (27 November 2026): Ingenia's app logos, weighted 3D buttons as their own doors draw them; Clavis's astrolabe on its own.

- Her words (27 November 2026): "All of the apps logos look flat and one dimensional on the Ingenia folder pages, especially Clavis which
  even folds and bends while animated. I HATE THAT. There is also this small and light purple shadow that moves with the apps' logos which
  adds to enhanced flat and 1D look of the logo animated buttons. I want that all to be fixed and for all of the apps logos especially
  Clavis' look proper and like truly 3D weighted animated buttons like they all do on their introduction doors." Then, shown a first
  picture: "Please remove the rounded 3D purple thing behind Clavis' logo, also the logo is distorted and looks really weird."
  `r378.js`, `r402.js`:
  - Found, against Clavis's own door (its seal3d: a sway of 7 degrees each way over 11 seconds, a lean of 12 at most, layers at real
    depths each with its own drop shadow, an astrolabe drawn as an object with no round shadow): each logo swayed 18 degrees each way
    under a perspective of four times its size and leant up to 24; Clavis, The Forge, Carpe Diem and Ingenium had no rim, so their faces
    were paper thin; two presses (twirl, flip) turned the logo a full round sideways and showed its flat layers edge on; and a blurred
    violet oval swam beneath it.
  - Now: the door's sway and lean; a perspective of seven times its size, each raised layer's size correction matched to it (1 - z/7;
    a first attempt kept the old 1 - z/4 and drew the raised layers small: "distorted"), so every layer is drawn the size of the face;
    a rim of four layers behind the face of a round logo that has fewer than three (Inkwell's thin edge included); each raised layer
    casting its own small shadow; beneath a round logo the soft shadow of its plate, neutral, never violet; no press turns it
    sideways: the door's knock and a lift of its layers take the places of twirl and flip.
  - Clavis's astrolabe is an object, not a plate (its face fills a quarter of its disc; every other logo's fills it): no rim and no round
    shadow (the first attempt's plate shadow drew the outline of a plate it does not have: "the rounded 3D purple thing"), the shadow of
    its own outline instead, and its parts closer together so they stay in register as it sways.
  - Test: rig/t_804_ingenia_weight.js (44 checks on the six apps' folder pages); rig/t_779_ingenia_logos.js 8/8 and
    rig/t_797_logo_press.js 11/11 still.

Ingenium 8.03 (27 November 2026): Adamas, the diamond's holder drawn sharp at the screen's true pixel ratio, its outline smoothed.

- Her words (27 November 2026): "The diamon holder of the Adamas page looks blurry and unrefined. I have been asking for this to be fixed
  for ages! I want it to look detailed, defined, sharpened and refined and not look like a blurry, poorly generated blob. I need you to
  fix it for good please." `r292.js`:
  - Found: since 7.89 every scene reads a pixel ratio of at most 1.25 (r391, cool running: "a Retina screen's 2 drew 2.56 times the
    pixels"), so on a Retina screen the Adamas scene was drawn at 1.25 and stretched 1.6 times to fit its card. The stretch smeared the
    holder's engraving, its turned lines, its knurled foot and every edge (measured on the same frame, its edges' strength 18, against 33
    drawn at the true ratio). The page's text and pictures were never touched; only the scenes.
  - The Adamas scene now reads the screen's true ratio (window.__ingRealRatio, at most 2 as before 7.89); every other scene keeps r391's
    ceiling. The soft sky behind the stone keeps its old size.
  - Cool running kept by frames, not pixels: 15 frames a second at rest (was 20); the graphics measurement (7.40) now measures at the true
    ratio and keeps its tiers in what the same frame costs at the old ratio, so a chip draws the true ratio when it affords it, as many
    pixels as its budget allows when it nearly does, and never fewer than before 8.03; a chip that only just affords the true ratio
    draws fewer frames at rest (its graphics chip busy half the time at most).
  - The outline smoothed: a ray that passes the case within a pixel covers the rest of that pixel (its nearest approach, measured as the
    walk goes), so the outline is a fine edge, not steps.
  - Kept as light to open as before: the speed test is drawn at the size it had (its result scaled to the true ratio), and the holder is
    coloured from one place in the shader (a second call, tried on the way, doubled what the browser compiles: 5 s instead of 2 on a
    processor four times slower). A browser that draws in software (SwiftShader, llvmpipe, Windows' Basic Render Driver) ends on the
    still stone whatever its speed test says, as it would draw with the processor itself.
  - Tests: rig/t_803_adamas_sharp.js (13 checks; on 8.02 it fails 6 of 10 of its first checks: a 650 by 530 drawing stretched into
    1040 by 848, edges 16.6 against 42.1). rig/t_740_adamas.js 9/9 (8.02 here: 8/9, the page held 4.9 s against 4.5). rig/t_722_adamas_pace.js
    expects 15 a second at rest, worked out from the page's own frames, and chooses the scene by hand; its check of 10 a second while
    Ingenium is not the window in use fails on this machine for 8.02 as well (5.7), its timers being slow here.

Ingenium 8.02 (27 November 2026): Custodia's dial with Ingenium's own seal, cool at rest, deep by night, moving under the pointer, refined in its own look.

- Her words (27 November 2026), with pictures of Custodia by day and by night on her Mac: "Custodia has the wrong logo on the inside of the
  3D drawing and also is overheating my devices again, please fix it. Also, the design looks entirely too bright on Night mode ... I want
  Custodia to have the same animated and clickable feel and look as the other pages inside of Ingenium"; then "deepen and enhance the
  Custodia 3D header in both Day and Night mode"; and, shown a vault painted in the compass's manner (never released): "i preferred this
  original look, I just wanted it to look more defined, refined, elegant and elevated without you copying the compass' literal design".
  `r408.js`:
  - What heated: the dial's ring turned without end (a 16 second round) and the amber lamps pulsed their glow without end (a changing glow
    is painted again on every frame). Both are gone; nothing on the page moves by itself but the seal's own breath, as on every page.
  - The logo: Ingenium's own seal (Home's, in its layers, from IngStudios.kit.sealKey where the compass's part is carried, else the
    welcome door's seal with a press of its own) sits in the dial's face within a fine engraved ring, upright while the ring turns.
  - The approved pewter dial, refined in its own terms: the bezel finely brushed, its polished rim catching the light from the upper left,
    a crisper lip around the face, finer ticks with a middle tick between the numbers, the numbers a little larger, no knob (her words on the
    knob: "I don't like how ugly and bulky the engine button and the inside dial looks, it looks weird and plastic with the white turn
    thing"; the seal, smaller, sits in the face), the pointer cut in two facets, the lamps small polished beads ringed with a hairline of light. By night the bezel and the
    empty lamps are dark metal and the light is low.
  - It answers: the dial tilts toward the pointer and a light follows it; the ring turns under the hand, glides a little, and settles on a
    mark with a click; a lamp names its key under the pointer and, pressed, flares once while the dial turns its number under the pointer
    and the key opens below (the head is kept while the parts below are drawn again, so a turn is never cut short); the seal plays a
    flourish; as the page opens the ring turns home once and a key with no way back yet calls twice. Minimal motion keeps it flat and still.
  - Her words (27 November 2026): "I also want it to be clickable and animated like the rest of the other pages 3D headers." So the dial
    lifts a little under the pointer and a gleam runs once round its rim as the pointer comes (at most once in four seconds) and as the
    page opens; a press on the face, right or left of the seal, steps the ring one number that way; a press on the rim makes the dial give
    and spring back with a gleam. Each moves for a moment and stops: nothing runs at rest.
  - Her words (27 November 2026): "I also want the faint little purple circle from the engine button to be fixed." The cause was the
    compass's (r290, 13 and 14 November 2026): the seal swayed in 3D on a clock of its own inside a dial that leans on its own, and its ring
    lay lower than its star, so the ring slid about (measured: up to 2.2 pixels off the seal's centre). It is held as the compass's and
    Blend's are: no sway and no tilt of its own, its ring, star and heart at Blend's heights; measured after, 0.02 pixels at most.
  - The centre: her choice on the live preview (27 November 2026), "Build the current Custodia's dial into the app with the \"As before\"
    look, we can come back to it later": the plain pearl face, the seal within its fine engraved ring. (A sunken well and a collar round
    the seal were tried on the way and taken out at her word, never released.)
  - Test: rig/t_802_custodia_dial.js (29 checks: the seal and its layers, nothing running at rest and no frames asked for, the dial's metal
    by day and by night, the tilt, the lift and the light, a lamp's name, its press and its key, the turn by hand and its settling, the press
    on the face and on the rim, the gleam, the seal's press, its purple ring held in step, Minimal motion); rig/t_800_custodia.js still 26/26.

Ingenium 8.01 (27 November 2026): the Guides of the Gift and Demo editions name only the pages those editions have.

- The editions tests on 8.00 (run after its push) found the Guide's What is new naming Fabrica (7.97's line of the little hand, 7.89's
  cool running) and Vocatio (7.94) in the Gift and Demo editions, which have neither. `r222.js`: those lines are marked "fabrica" and
  "career", as such lines are, and 7.89's has a "nofabrica" twin without Fabrica's tree. rig/t_627_editions.js, run on a Gift edition
  built from these sources, finds no such line. editions/README.txt lists Memoria and Custodia among each edition's pages.

Ingenium 8.00 (27 November 2026): Custodia, every key and its ways back; sort keys beside Your apps and Your models.

- Her words (26 November 2026): "I want Ingenium to have a recovery system for the passwords and key terms and keys, so that I am not
  locked out ... for every user on all devices"; shown it drawn in the real page, her word (27 November 2026): "I approve of the
  previews, please commit and push it everywhere". `r408.js`: Custodia, a page of its own before Settings, in every edition. Found
  first, by reading every part: only the sign-in had ways back (r197); the Cloud passphrase (r255), a backup's password (r143), the owner
  key's password (PermitCore) and the reading key's password (r357) had none. Now each key is listed with its ways back, read from the
  part that holds it, and each can have one: a sealed copy inside the sign-in (IngLock.sealText; the Cloud passphrase, the owner key's
  and the reading key's passwords, each checked first against the key it opens; every backup password, kept as each backup is made, the
  last ten), shown again only after the sign-in's password; the owner key's own ten words, apart from the sign-in (PBKDF2-SHA-256,
  600,000 rounds, AES-GCM, in the owner key's own store); and a recovery sheet (the ten words after the sign-in's password, and where each
  way back is; no password on it), to print or save. Test: rig/t_800_custodia.js (26 checks; the Cloud stood in for, made its own way).
- Her words (26 November 2026): "I also want to be able to filter through the "Your apps" section ... and reorganise them by dates and
  alphabetical order"; shown both lists with their keys: approved the same day. `r407.js`: Used last, Newest, Oldest and A to Z beside
  Ingenia's Your apps (the very choice of the head's right pull, r279; the cards below now follow it; Newest and Oldest by the day each
  folder was made) and Newest, Oldest and A to Z beside Mentes's Your models (in the order they were added: a model keeps no date).
  Test: rig/t_800_sort.js (17 checks).
- `r390.js`: the switch Learn from my folders names Fabrica only where the copy has Fabrica. The editions tests found the Gift and Demo
  editions naming it, present since before 7.98 and unseen because the editions tests had not run since 7.95. rig/t_627_editions.js
  knows Custodia is in every edition's side bar.

Ingenium 7.99 (26 November 2026): Memoria's What it knows becomes an atlas of plates, chosen from two directions drawn in the real page.

- Her words (26 November 2026): "the Memoria page looks super plain and basic"; of the first redesign (r405, never released):
  "lackluster", "a clustered mess. It does not look tidy and organised"; then, shown a card cabinet and a star atlas drawn under the real
  head: "I choose direction B- the atlas." `r406.js`: a medallion for each plate (Waiting, You, and each app in the colour of its star in
  the head), Find a fact on every plate, and one plate at a time: a round chart where each fact is a star (her words near the middle, what
  was learned further out, what waits as a hollow star), the chosen star read large with its source, its date and how many chats used it
  this week, and the key of every star. Keys where they act: Keep and Not this; Keep mine, Keep the new one and Keep both beside a fact
  that disagrees with hers; Edit, Leave out and Use it again; Add a fact; Keep all that agree on the Waiting plate. How it is kept turns
  the plate over: how it learns, what is never kept, which models may read it. The head's stars and its two keys open the plates.
  Test: rig/t_799_atlas.js (41 checks).
- `r390.js`: a fact she leaves out stays kept and shown, but is given to no model (the chat's facts, a folder's facts, an app's own words).
- The use counts are read from the replies themselves: each reply keeps the facts it was given (r390), and from 7.99 a chat in an app's
  folder keeps the folder's facts it was given too.
- `r405.js`, refused and never released, is taken out of the sources; its never-kept guard and its model readers live on in r406.
- rig/t_794_memoria.js expects the atlas in What it knows, and a star pressed in the head to open that app's plate (9/9).
  rig/t_791_head.js is out of date since 7.94 (it looks for Memory inside Settings): it fails the same four checks on 7.98 as on 7.99.

Ingenium 7.98 (26 November 2026): Autumn wind joins the nature sounds; Adamas's Bring back the panels on the page itself; no circle around the
logos; the Engine panel never reads For undefined.

- Her words (26 November 2026): "I don't want the "bring back every panel" button for the Adamas page to be hidden inside of the Display
  panel. Why would you even put it there? It makes no sense!" `r400.js`: the key, Bring back the panels, stands in Adamas's own row of keys,
  beside Save this page, whenever a panel there is closed, hidden, folded or floated; Display no longer carries it. Test: rig/t_797_panels.js.
- A mistake of mine found and mended: 7.97's held list named its part "r403", and build_page.py, looking for "r403.js", held nothing,
  so the first samples of Noel, Snowfall and Summer night (all refused) and Autumn wind reached 7.97. 7.98 takes the three out (r403
  carries Autumn wind alone), and build_page.py now holds a name with or without .js. `r404.js` (Noel, a fourth time: the water and one
  far robin, about 6 dB quieter than Forest) rides in 7.98 too, approved on its sample: "I approve of the Noel sound, please commit and
  push it everywhere".
- Her words on the large app in Adamas: "This is too clusttered. Why squeeze the button there??" `r400.js`: its Close key stands in
  Adamas's main row of keys, beside Open an app, and the narrow panel carries no added key or line (what the panels are is the key's
  tooltip).
- Her words: "I don't want a dented circle around the apps logos." `r402.js`: the recess shown around a held logo and the violet ring that
  spread out in some flourishes are removed; the logo sinks, springs back and plays its flourish. Test: rig/t_797_logo_press.js.

- Her word on the four samples (26 November 2026): "All of these sounds sound absolutely crappy except for the Autumn wind, I like that
  one you can add it to the list and redo the others." `r403.js` now carries Autumn wind alone (Wind and fire), the very sample she heard.
  `r404.js` (Noel, made a third time from Brook's water and Morning birds' singers, with no wind or hiss and quieter than the others) is
  held for her word; Snowfall and Summer night, refused twice, are withdrawn.
- `r374.js`: the Engine panel's lower section named the model by its own name only, and read "For undefined" for a model without one;
  it now falls back to the model's name, then its file.
- rig/t_797_panels.js writes its pictures to the system's temporary folder, never into the sources.

Ingenium 7.97 (26 November 2026): Health's cards flat at rest; every closed panel comes back; Unload first; the logos press; the hand on Fabrica's tree; the app always quits; a model's file found again.

- Her words (26 November 2026, on 7.95): "I want the models cards to stay flat and just have the lifted 3D popped out effect when I hover
  the mouse on it, not just have it look poppped out and 3D at rest all the time ... I want the same effect that the "Your models" and
  "Where your models are kept" sections have to be applied to the Health section." `r398.js`, corrected: each model's card and each
  reading rest as Your models' cards rest (the pale card ground and a hairline), and under the pointer the white face fades in, the raised
  shadow comes up and the card rises 3 pixels. Test: rig/t_797_health.js (by day and by night; part (1) of rig/t_795_lift_awake.js expected the raised look she refused).
- Adamas (her words: "I have no way of bringing the Live Preview panel back when I close it ... When I close either side of the panels on
  the Adamas page, I have no way of bringing either one of them back"). The cause: the base page's Show preview and Show keys were hidden by
  an inline style that outweighed the rule meant to show them. `r400.js`: they show (Show the preview, Show the code), raised; closing the
  preview gives the code its width back; a page opened part by part says so and its Close key names it, and once closed the sample comes
  back; Display, App, Panels: Bring back every panel (window.IngPanels.restore). A search of every element the page hides inline found no
  other key of the kind. Test: rig/t_797_panels.js (12 checks).
- The Engine panel (her words: "The unload button is far too low on the Engine panel, it needs to be one of the first option I see next
  to the model"). `r374.js`: Load and Unload (naming the model) stand right under the card that names the model in use.
- Ingenia's logos (her words: "I want the apps logos to sink and actually look pressed and clicked on ... I want them to feel like real 3D
  app buttons"). `r402.js` (window.IngAppKeyPress): held, the open folder's logo goes down into a socket that shows only then; let go, it
  springs back and plays a flourish, a different one each time (hop, twirl, spin, wobble, pulse, flip; held over half a second, a full spin
  with a glow); Ingenium's seal plays the seal key's set on its own layers (star, ring, heart stone); each app's own press (r388) still
  plays inside. Test: rig/t_797_logo_press.js (11 checks).
- Fabrica's tree (her words: "I want the little hand clicker reinstated ... made slightly smaller"). `r401.js`: the pointing hand, about
  four fifths of the system's, over the diamond, a glass bulb or a part, by day and by night; it still steps aside while the diamond
  spins. Test: rig/t_797_hand.js (6 checks).
- The computer apps (her words: "I am also having issues with simply closing the app, it never does and I keep on seeing the little
  spinning rainbow wheel"; and the Windows Full edition: "the built-in models do not work ... the Mellum model also refused to load").
  `desktop/app_quit_models_797.py`: when the window closes, the engine, the trainer and lending are stopped and the app ends at once; a
  watch started at the close ends it at most 8 seconds later whatever is left running, writing to the crash log which threads were still
  running. A model's file is found again before the app says it is gone: the list read again, the built-in models asked for, then every
  name the file can have, in every place Ingenium keeps models. The Windows build now has the Full and Gift apps load a built-in model in
  their self-test too (a warning, never fatal). Neither fault could be watched on her own computers, so their causes are not proven; the
  crash log will say more if either comes back. Test: python3 -I rig/t_797_app.py (models, quit, closed).
- Held: `r403.js` (the nature sound Noel, made for the name: Noël, Christmas, a robin in the frost, wind in the pines, bells far off; and
  Snowfall, Summer night, Autumn wind) waits for her answer to the four samples.

Ingenium 7.96 (26 November 2026): the chat's memory list has a Close key; Memoria names only the pages a copy has; the words under lending.

- Her words (26 November 2026, in her answers): "the memory card does not have a "Close" option inside of the chat panel, once opened inside
  of the chat is hovers over the conversation or session and I can't remove, please fix this issues as well." `r271.js`: the tray (the list
  of what Ingenium remembered for a chat, above the conversation) gains a raised Close key beside its head; Close puts it away for that
  chat (kept by chat in the memory's own state, trayShut), and it comes back only when a later answer brings a memory it has not shown.
  Test: rig/t_796_tray.js.
- The editions' test (t_627_editions, run on the 7.95 editions) found that Memoria (7.94, r396) told the gift and demo editions it learns
  from "Fabrica", a page they do not have: `r396.js` names Fabrica only where the copy has it. The test now expects Memoria in every
  edition's side bar (it came in 7.94).
- `r274.js` and `r255.js`: the words under Lend my models and the Cloud no longer say the screen may turn off: since 7.95 it stays on
  while she keeps Keep the screen on while Ingenium works.

Ingenium 7.95 (26 November 2026): Health's cards lift; the screen and the computer stay awake while Ingenium works or lends; Windows builds publish again.

- Her words (26 November 2026): "I just want you to make the models name cards on the Health section of the Mentes page lift on hover in
  Ingenium's signature popped out 2D lift from the sticky notes and the Live Preview panel, please make the fix"; and "It should be set as
  a rule for my preference for that style on my display for all of my apps, not just Ingenium."
  Measured on 7.94, with the page drawn holding two models: under Health, Each model, every model's card (.hm-row, r116) lay flat. Health's
  four readings were flat too, though 7.72 (r364) had made them raised: the Turret's rule (r267, #page-models.tu-on #healthBox .hl-row,
  two ids and two classes) outweighed r364's (one id, two classes), so only their 3 pixel rise showed, never their raised shadow.
  `r398.js`, new, styles only: both take the lift r364 meant (--pop at rest, --pop-hi and 3 pixels up with a spring under the pointer, a
  sink when pressed, still under Minimal or reduced motion), stated with the weight to hold on the Turret. Her rule joins How I work once,
  in her master copy (r327's LATER, u795): "No flat, motionless cards: every card and tile lifts under the pointer with the signature
  popped-out lift of the sticky notes and the Live Preview panel, in every app".
- Her words (26 November 2026): "I want Ingenium to keep my device screen awake when it is running a task or a model is writing and working
  on something and when the device is lending a model"; and, again: "everytime I start the reading on Lector it gets stopped and it never
  goes through". Measured on 7.94: a lending computer held only the system awake (caffeinate -i; ES_SYSTEM_REQUIRED), letting its screen
  sleep; the Mac app never asked to be left out of App Nap, which slows an app whose window is out of sight, its lending server included;
  and a computer or tablet reading with another computer's model held nothing, because the page's wake lock (r256) is not offered in the
  Mac app's window (its switch stood disabled there) and the Fire and iPhone apps had no way to hold the screen.
  `build/desktop/app_awake_795.py`, new (in release.py's list): one hold for the whole app while anything lends or works: caffeinate -d -i
  -m and an NSProcessInfo activity (user initiated, latency critical) on the Mac, ES_CONTINUOUS | ES_SYSTEM_REQUIRED | ES_DISPLAY_REQUIRED
  on Windows; the screen only while her switch is on; keep_awake(on, screen) for the page, renewed each minute, let go three minutes after
  a page stops renewing. `ingenium.spec` (Mac mini and MacBook Pro): NSAppSleepDisabled. `r256.js`: the page asks the app it runs in as
  well as the browser (the computer apps' keep_awake; the Fire app's and the iPhone app's keepAwake), so its switch works wherever either
  way exists. The Fire repository: Bridge.java keepAwake (FLAG_KEEP_SCREEN_ON) and EngineBridge.swift keepAwake (the idle timer off).
  Not tested here: App Nap, caffeinate and SetThreadExecutionState need a Mac or a Windows computer, and the native holds a device; the
  hold's own logic was checked on a copy of the computer app (six checks).
- The Windows builds (Ingenium-HPWindows, .github/workflows/build-windows.yml): from 7.87 to 7.94 every Windows build failed, because it
  waited for the Mac mini repository's Full and Gift editions of the same version and none were made after 7.86, so Ingenium for Windows
  was not published at all. The 7.94 editions are made, and the editions no longer hold Ingenium's own installer back: a missing edition is
  said in a warning and the build's summary, and the Full and Gift installers already in the release stay until editions of the same
  version come.

Ingenium 7.94 (25 November 2026): Memoria, a page of its own; Vocatio waits for a busy model.

- Her words (25 November 2026): "I think that the Memory section and Ingneum's Cloud should not be buried inside of the Settings page.
  Please put them together in their own page under a new page name that better fits them and the rest of the app"; on the preview
  (https://claude.ai/artifact/X2RfPYe2XfMb4twrkiUAVs): "I approve of the previews ... please build it into Ingenium".
  `r396.js`, new: Memoria (Latin: memory, remembrance), in the side bar under Studio after Ingenia. Made as Vesta is made (r235, r290):
  the constellation mind (r392) as its head, 470 pixels tall, with the page's words, raised keys and italic hint; Vesta's raised room
  cards below, one room at a time: What it knows (r390), From your chats (r271), Ingenium Cloud (r255, r394), each card moved whole.
  Settings keeps a card under Your data, Memory and Ingenium Cloud, that opens Memoria; what opened those sections opens Memoria.
  Her next words (25 November 2026): "Backup and move should also move into Memoria as a fourth room beside Ingenium Cloud": the fourth
  room holds the backup (r143's card, made through IngBackup.show), its restore points (r393) and scheduled backups (r395).
  `r392.js` takes Memoria's head slot when there is one; `r234.js` sorts the three cards Settings keeps.
  Test: rig/t_794_memoria.js (9 checks).
- Vocatio's notices. Her words (25 November 2026): they "keep saying the model is busy and can't finish when I can clearly see the model
  working and writing still". Found: 7.88's background step that brings an app's folder up to date after three quiet minutes (`r390.js`)
  asked only whether Ingenia was busy, so it took the model between two parts of a long Vocatio reading; Vocatio waited five minutes at
  most and then said "It could not be finished: busy". And a reply from a lent model longer than its ten minutes was asked for again while
  the lending computer still wrote the first. `r397.js`, new: who is using the model (window.ingModelInUse); the background steps wait
  until nothing has used it for a while (`r390.js` three minutes, `r271.js` one); Vocatio (`r188.js`) waits as long as the model works,
  saying for whom, and goes on by itself; a reply from a lent model may take 30 minutes. Test: rig/t_794_model.js (6 checks).

Ingenium 7.93 (25 November 2026): scheduled backups into a folder she chooses.

- Stage 2 of the approved recommendations: "Automatic backups on a schedule, daily or weekly, keeping the last few". `r395.js` (new),
  under the backup's card on a computer: the folder she chooses, every day, every Sunday or by hand, keep the last 3, 7 or 14, and Back up
  now; the backup is the whole file Back up makes, made while she is not typing, written in pieces. `desktop/app_backup_793.py` (new, in
  release.py's list): backup_choose_place, backup_write (a piece to <name>.part, renamed once whole), backup_files and backup_remove,
  each touching only files named "Ingenium backup <date>.zip" (or .ingenium) in her folder. Tests: rig/t_793_schedule.js (5 checks),
  rig/t_793_backup_place.py (9 checks, on the Mac mini's, Mac Intel's and Windows' ingenium_app.py).

Ingenium 7.92 (25 November 2026): Ingenium Cloud keeps what two devices both changed, for her to choose.

- Stage 2 of the approved recommendations. Found: what Cloud brings in merges as a backup's Merge does (r143 mergeVal: the newer copy
  wins), so a conversation or an app's notes changed here since work last came in, then changed elsewhere later, was replaced without a
  word. Now (`r394.js`, new): before any merge, the conversations and the apps' folders are looked at; after it, any she had changed here
  since the last sync (or, with none, in the last seven days) and that the merge replaced is kept aside on this device; the Cloud card
  shows each side by side (hers and the one brought in) with Keep mine and Keep the one brought in, and says when this device last sent
  and brought in work. A copy she changed here that the merge kept, while the other device's changes were left out, is not yet shown:
  the incoming copy is not kept by the merge. Test: rig/t_792_conflicts.js (4 checks).

Ingenium 7.91 (25 November 2026): restore points, one thing brought back, a backup checked.

- Stage 2 of the recommendations she approved (25 November 2026: "proceed with stage 2: backups, restore points and Cloud").
  `r393.js`, new, in Settings, Your data, Back up and move, under the backup: restore points of the whole desk in the device's larger
  store (IndexedDB), sealed with her lock when it is on (IngLock.sealText): once a day, before a new version first opens, before a
  backup is restored or merged (which covers what Ingenium Cloud brings in) and at her press; the last 30 kept, each with when, why and
  what it held. Bring all of it back (the desk of now kept first), or one thing: a conversation, an app's folder notes, the facts
  Ingenium knew. Check a backup: the file opened and every part's fingerprint checked, what it holds said, nothing changed.
  Test: rig/t_791_points.js (9 checks).
- Memory's head is Memory's header. Her words (25 November 2026): "The memory brain 3D header looks odd placed at the bottom of the
  page like that, its a header for a reason and should be appropriately placed instead of looking like a last minute add-on. It is the
  literal brain of Ingenium and as such it needs to be properly showcased". Found: Settings (`r234.js`) showed only the cards it knew
  under each key of Your data; it did not know the head, so the head stood under every key, after whatever was there; What Ingenium
  knows, restore points and scheduled backups all fell under Sign-in and reset. Now `r392.js` puts the head first in Memory, above
  Memory's own card, as tall as the heads of Ingenium's pages (growing with a taller screen), its words beside the mind; Memory's own card
  no longer repeats a header under it. `r234.js` sorts the head, Memory's card and What Ingenium knows under Memory, and the backup,
  restore points and scheduled backups under Back up and move. Tests: rig/t_791_head.js (7 checks); rig/t_790_head.js follows the head.

Ingenium 7.90 (25 November 2026): Memory's head, the constellation mind.

- Her choice (25 November 2026): "I choose Design B - The Constellation mind design and animation, please refine and elevate the design"
  (preview https://claude.ai/artifact/Kj1C1N9NmDhu3NJ3RtTLp7, its drawing reused as it stands). `r392.js`, new: above What Ingenium knows
  (r390), a head with the mind as a constellation under a dawn sky by day and Vesta's northern lights by night; her apps its brightest
  stars, soft and twinkling in their own colours (no logo, no card, no ray, no flash), named in plain words, a faint second glow where
  facts wait; real links (Ingenium to every app, an app to another its facts name); a star pressed opens its facts. Refined: names never
  sit on one another. Light on the device: drawn only on screen and while Ingenium is in use, at most 30 frames a second at a lighter
  resolution, still 30 seconds after the last touch. Test: rig/t_790_head.js (4 checks).

Ingenium 7.89 (25 November 2026): cool running.

- Her words (25 November 2026): "I don't want it to drain my devices and overheat them and have the fan running high ... I had the same
  issue with Adamas' 3D diamond and the rest of the headers' animations ... I want this to be made standard and added as a rule for all
  of my apps." Found: r310 and r324 already rest every scene after 30 seconds untouched; while she works, each scene still asked for a
  frame at every refresh of the screen (120 a second on a MacBook's screen) and drew at full Retina sharpness. Now (`r391.js`, new):
  requestAnimationFrame is answered at most 30 times a second for every scene (each callback given the true time), and scenes size their
  canvases at a pixel ratio of 1.25 at most (2.56 times fewer pixels than a Retina screen's 2); text, pictures and keys keep full
  sharpness. IngCool is the switch for future scenes. Test: rig/t_789_cool.js (6 checks).

Ingenium 7.88 (25 November 2026): what Ingenium knows, stage 1.

- Her words (25 November 2026): "I approve of all your recommendations, please build them into the app". Stage 1 (`r390.js`, new): one
  store of what Ingenium knows (state.know, so it goes with backups and Ingenium Cloud): facts about each app and about her (her memories,
  read where they are kept), each with where it came from, when and who gave it; her facts first and never overwritten (r386's facts of
  what an app is now live here); a fact naming a system hers do not is shown as disagreeing with hers. It learns, asking first: a new
  decision in a folder's notes and a version Fabrica keeps wait for her (Keep, Change, Not this; what she leaves out is not suggested
  again). Folders bring themselves up to date when she has been away from the keyboard three minutes, one at a time, with Undo. A chat
  draws the facts that fit (hers first), a chat in an app's folder all of that app's, and the reply says Used N facts. Seen in each
  app's folder (What Ingenium knows: its facts, its links, its timeline) and in Settings, Your data, Memory (Waiting for you, Find a
  fact, each app, three switches). The map's 3D head waits for her choice among the designs.
  Test: rig/t_788_know.js (10 checks).

Ingenium 7.87 (25 November 2026): an app in a reply shows as the app; each app's logo with a press of its own.

- Her words (25 November 2026): "I don't want to see the entire code of the HTML all laid out, it makes it really hard to navigate the
  chats ... I prefer to see the app instead of the raw code, please fix this issue in both chat pages." Found (rig/t_787_presses.js on
  7.86): r101 already marked an app's code as folded, but the chat's rule for code in a message (.msg .md pre code) is more specific than
  the fold's, so the whole code stayed laid out (3,893 pixels for 205 lines), in Chat and Code alike; a reply cut off before its fence
  closed had no card and no fold; and an app being written grew in the chat. Now (`r389.js`, new): the fold wins; a cut-off reply is
  still read as its app (its card, the stage, the fold); and an app being written waits folded under one line that counts it, the stage
  beside the chat drawing it.
- Ingenia (approved with the live preview, 25 November 2026: "I approve of the previews"; `r388.js`, new): each app's logo has a press of
  its own, made from its seal's own layers: Carpe Diem, Sunrise; The Forge, Strike (sparks); Inkwell, Dip (the ink ripples); Clavis,
  Unlock (the key turns in the astrolabe); Lakay, Spiral; Ingenium keeps its knock. A press she makes plays even where the system asks
  for reduced motion; Ingenium's own Minimal motion stills it. rig/t_782_press.js now checks the knock on Ingenium's folder.
  Test: rig/t_787_presses.js (11 checks).

Ingenium 7.86 (25 November 2026): Inkling 2, the Oracle house and Find models; her fixes of 25 November.

- The models (approved with the live preview, 25 November 2026: "I approve of the previews, please commit and push it everywhere"):
  `r385.js`, new. Inkling 2 Mini (ggml-org's IQ4_NL, 17.6 GB, with its eyes) and Inkling 2 Small (unsloth's UD-IQ1_S, five parts, 171.7
  GB), sizes and SHA-256 from Hugging Face's records, each repository's commit pinned. Offered to install only where the computer app's
  newer engine reports their kinds (inkling2_loop from llama.cpp b12600, inkling2 from b12599; the Macs' newer engine is now b12723) and
  her engine choice is not the proven engine only; elsewhere they wait under Oracle, saying why. Inkling 2 Mini joins Magister and Faber
  on a computer after the larger models (32 GB or more). Each Inkling 2 reply stops at 8,192 tokens, as its makers advise. Oracle, a fifth
  house on the Models page: the strongest open models there are (twelve, smallest first, from Qwen3.8 Flash Next to Kimi K3), on every
  device, each with the memory it needs; one that fits installs from its row. The first Inkling is left out: no llama.cpp build reads its
  kind. Find models, a room of its own: a search of Hugging Face with four checks shown before anything downloads (kind, size, licence,
  fingerprint); Hugging Face, Ollama, LM Studio, ModelScope and Kaggle Models each as a card with its own keys, Open and (where its
  sign-in page was confirmed) Sign in; any other site by its link, kept among her own. Newer models, found online, reads the newer
  engine's kinds from the computer app (`r217.js`).
- Her fixes (her message of 25 November 2026): Fabrica's tree keeps one diamond, on top, and the pointer over the tree is the plain arrow,
  the ring and every hand gone (`r294.js`); Vesta's header always shows its five stones (`r291.js`; fewer stood above the water when the
  task in hand had fewer steps), and on a wide screen its view comes closer so the stones grow with the landscape; Ingenia's head and rooms start at the left under its tabs on a wide screen, its drawer growing with its
  head (`r386.js`); what an app is,
  as she says it, is kept with its folder and comes first when its notes are brought up to date (`r386.js`, `r208.js`), and Carpe Diem's
  fact, "an app for all devices", corrects the summary that called it a Windows app (`r387.js`, her master copy's alone); the small chips
  on the Models page, Vocatio and the engine panel stand raised and lift under the pointer (`r385.js`).
  Test: rig/t_786_models.js.

Ingenium 7.85 (25 November 2026): Vocatio reads her profile once.

- Recommendation 1 of 24 November, before her Cambridge deadline of 8 December, approved with the live preview (25 November 2026: "I
  approve of the previews").
- Found (`r188.js`): a reading either cut the profile to fit, the parts that bear on the task first, or, Step by step, everything, read the
  whole of it in parts afresh for every task (partByPart).
- Now (`r384.js`, new; its hooks in `r188.js`): Vocatio reads the profile once, part by part (each entry, the CV in sections, the LinkedIn
  summary, each document, each app as Lector read it), with partByPart's own instruction less the task, and keeps the facts each part
  gives, each naming the part it came from. A fact whose numbers or names are not in its part is left out, and the panel says how many.
  A part already read is not read again: when an entry changes, only that entry is. While the digest covers the whole profile, a reading
  starts from it, the facts most relevant to the task first, much shorter than the profile itself; Step by step, everything stays as it
  was. In Your profile, a part of its own, Read once: where it stands, the facts with where each comes from (each lifting under the
  pointer), and Read it now, or Read the changed parts again.
  Test: rig/t_785_digest.js (10 checks; a stand-in model that adds a prize never won, which is left out).

Also in Ingenium 7.85 (built together at her word, 25 November 2026: "I don't want to wait forever"; no 7.84 was built): Vocatio's Practise, deepened: her voice, a clock, the criteria, her best answers.

- Recommendation 10 of 24 November, before her Cambridge deadline of 8 December, approved with the live preview (25 November 2026): "I
  approve of the previews but I want the "Your submission pack" cards to also have the animated effect and lift of hover and I want the
  same effect for the "Against the posting's criteria" section as well".
- Found (`r188.js`, stepPractise): Interview questions had the question, a two-minute mock run on the Clepsydra, a written answer and Look at
  it with me (the model's Meets it, What works, What is missing); no voice, no clock beside the answer, no reading against each criterion,
  and nothing kept beyond the last answer.
- Now (`r383.js`, new; its hook in `r188.js`): Answer aloud, through Scriba's own ears (r254's capture copied as it stands, the sound kept on
  this device and written down by Scriba's in-house model), with a level that moves as she speaks, what she said added to her answer; an
  analogue clock of one, two or three minutes that starts as she speaks; Read it against the criteria, one model reading that gives each
  criterion of the posting's reading as met, partly or not yet, with the sentence of her answer it rests on, quoted, and one thing to add,
  each line lifting under the pointer as she asked (a sentence the model quotes that is not in her answer is dropped, and cannot count as
  met); and Keep as a best answer, three for each question, with the time taken and how many criteria they meet.
  Test: rig/t_784_practise.js (10 checks; Chromium's stand-in microphone, a stand-in for Scriba's model and a stand-in model).

Ingenium 7.83 (25 November 2026): Troubleshoot in the full edition; Vocatio's submission pack, and its dates in Vesta.

- Her words (24 November 2026): "I want the Full edition of Ingenium to have the Author Studio with limited access or functions that will
  only be reserved for the owner's master edition. I want the Full edition app to at least have the Troubleshoot page from the Author
  Studio". Before that, her authorship "limited to my master edition only" (17 November 2026), and the full edition "without my Author
  access and owner administrative functions" (19 November 2026).
- Found: Troubleshoot (`r329.js`) read its check and its errors from the workshop (`r226.js`), which also holds her layers, her scripts and
  Ingenium's own page in Code, and it lived inside the Author Studio (`r236.js`); all three were the master's alone (build/editions.py).
- Now: the full edition has Troubleshoot as a room of Settings (`r173.js`), the room she approved: Check everything with its gauge, the
  checks in their groups, each unfolding to say why and what to do, what went wrong since Ingenium started, Copy the report, and what
  happened in the person's own words, copied with what they tick, ready to send to Ingenium's author. Its check and error list come from
  `r381.js` (new), copied from r226's own code less the line on her layers; the full edition carries neither the workshop nor the Author
  Studio. The keys that hand Ingenium's own page to a model (Ask a model about this, Ask a model to fix, Hand to a model in Code) and the
  note on fixing with one stay the master's alone (`r329.js` asks ING_HAS("author")). In the full edition its tips name no device of
  hers (editions.py, _trouble_words). The master is as before; its example sentence now reads "on my laptop".
- The other parts of the Author Studio she may want in the full edition (Look, Side bar, Change log; my recommendation of 24 November,
  section 7) wait for her answer.
  Test: rig/t_783_full_trouble.js (on the full edition and the master). rig/t_745_owner_free.js now allows Troubleshoot (p329) in the full
  edition; every other part of the master's stays refused there.
- Vocatio's submission pack, and its dates in Vesta (`r382.js`, new; hooks in `r188.js` and `r121.js`). Recommendations 2 and 3 of 24
  November, for her Cambridge deadline of 8 December. Her approval of the live preview (25 November 2026): "I approve of the previews but
  I want the "Your submission pack" cards to also have the animated effect and lift of hover and I want the same effect for the "Against
  the posting's criteria" section as well". Now, first in an application's What you send, folded under one raised bar that counts what is
  final: one card for each thing the posting asks to send (the checklist's own items, in the posting's words), with its limit and a gauge
  of the words written (and by how much a document is over), the file name the portal expects (from her profile's name; hers to change),
  and a lever of four notches, To write, Drafted, Checked, Final (Final ticks the checklist item; an examined document starts at Checked).
  The cards lift under the pointer, as she asked. A final check: her name the same everywhere, the dates against her CV, the referees
  told, the files the portal takes, and no square brackets left (read by Vocatio itself, naming what is still to fill). Export the pack,
  once all is final and ticked: each document as the PDF the portal will receive, named as it expects, made as Save as PDF makes it, with
  its Word file in Word/. In Vesta's Today asks of you: each application closing within a fortnight, with its date, each referee asked ten
  days ago or more, and each person's follow-up due; a week, three days and a day before a closing date, a reminder rings once.
  Test: rig/t_783_pack.js (18 checks).

Ingenium 7.82 (25 November 2026): Lector writes each document for its reader, cleanly, from her approved drafts; Ingenia's logos are
buttons; Fabrica's little diamond stays in view when pressed.

- Her words (24 November 2026): "they are all written the exact same way and with the same overwhelming information, with no clarity
  for their audience"; "I want the documents to be written in the first person but still keep the formal register and be adjusted for
  each audience instead of sending the same document under different titles"; "The model even leaves its own reasoning within the
  documents; it is unacceptable"; "only the build numbers and dated information are rewritten and updated on the new documents, and new
  features and functions are added, but the documents don't have to be rewritten from scratch unless it is needed"; "no grammatical
  errors or false or invented citations and sources".
- Found (`r108.js`, and her 7.71 samples): every document was held to one voice, a doctoral application's, and the examiner's pass was a
  doctoral examiner's for a job too; the clean-up took out only a complete thinking block, so a model's working written as plain prose
  stayed (her Notes and analysis, "How it was made", and her Appendix, "Development history", both began "The notes contain information
  about how Ingenium was made. I need to extract evidence of the process"); nothing removed a citation that was none of her sources; and
  Lector wrote each document afresh, never from the drafts she keeps in the recipe.
- Now (`r108.js`):
  - The reader: a programme keeps the doctoral standard; a post is written for the person hiring (plain, professional, the result before
    the method) and examined as that reader would; her portfolio is written for a reader with no training in software. Every document:
    the first person, the formal register, plain words with any technical term explained, short paragraphs and sentences.
  - No leaked reasoning: a thinking block whole, cut off or without its opening tag; a preamble ("Here is the revised section:"); a code
    fence; notes after the text ("Note:", "Changes made:", a word count); and any paragraph that is the model's working ("I need to
    extract...", "The facts mention...", "the user wants...") are taken out, while her own first-person sentences stay. A section that
    comes back as nothing but working is asked for once more; if it fails again it is marked for her in square brackets. The reading's
    own analysis is cleaned the same way when Lector reads it back, so its working cannot reach any document.
  - No invented citations: a numbered citation that is not one of her sources, or an author and year that are none of hers, is taken
    out, and the thinking panel says how many; plain dates and the apps' own names are left alone.
  - Her approved drafts: the latest draft of the same kind that she keeps in the recipe and that names every app being written about is
    given to the writer and the examiner, section by section, with the instruction to keep her words, order and paragraphs wherever they
    are still true and to change only what the measured facts make untrue (builds, versions, dates, figures), adding what is new briefly
    in her voice. The thinking panel names the draft it started from.
  Test: rig/t_782_lector_recipe.js (a stand-in model with a small model's faults, her 7.71 sample among them).
  Also found while testing: two functions in r108 bore one name (lineAt), so the code view of a reading never drew the app's own line
  numbers and stopped with an error ("createTreeWalker: parameter 1 is not of type 'Node'"); the code view's is now srcLine.
- Ingenia's app logos are buttons, pressed as Ingenium's own logo is (`r378.js`). Her words (25 November 2026): "The apps logos on the
  Ingenia folders page are animated but are still not clickable. I was very clear about wanting them to be made into clickable buttons the
  same way Ingenium's engine logo button is." Found: pressed, a logo only shrank by three in a hundred, with no knock, no sound and no
  release, and the open folder's logo was marked as a picture. Now, as the top bar's logo (r104): pressed, it sinks and its cast spreads;
  let go, it knocks back up and its layers draw together and part again to their depths; the open folder's logo is a button (the pointer's
  hand, the keyboard's Enter and Space, a name for a screen reader) with Ingenium's key sound.
- Fabrica's little diamond stays in view when pressed (`r294.js`). Her words (25 November 2026): "I can't see the animation of the diamond
  after clicking on it because the mouse tip is in the shape of a little white hand and entirely covers the little diamond and obscures it
  from view". Found: over the stone the pointer became the pointing hand, and pressed it became the grabbing hand (for turning the tree),
  both over the stone. Now over the stone the pointer is a small open ring with the stone in its centre (lavender by night); pressing it
  shows no grabbing hand unless the tree is dragged; and while it spins the pointer steps aside, coming back when the spin ends.
  Test: rig/t_782_press.js (14 checks).

Ingenium 7.81 (25 November 2026): one colour for each model, everywhere, and hers to change.

- Her words (25 November 2026): "I want the models colour bubbles to remain consistent throughout the app and actually have a system and
  still keep the full option to customise and change them as I please within the app"; on the preview: "I approve of the previews ... For
  the models colours, I agree with your recommendations." Found: the top bar, the side list and Mentes's list coloured a model by whether
  it fits this device (green, amber, red), while Chat's menu, Concordia and Mentes's lenses used its own colour (given in the order the
  models were added), and the Engine panel coloured its orbs by fit. Now (`r380.js`, new; `r374.js`): a model's bubble is its own colour in
  every place, by day and by night: its family's colour (Qwen sapphire, LFM aquamarine, Gemma garnet, Llama antique gold, Phi jade, Mistral
  amber, DeepSeek indigo, SmolLM olive, Granite slate, a model trained in Mentes amethyst, any other rose quartz), shaded by its size and a
  step apart for a thinking model, a little brighter by night. Its fit is a plate beside it on Mentes and words in the Engine panel; the
  model running wears a soft halo in its own colour. Pressing a bubble on Mentes or in the Engine panel opens a chooser: sixteen jewel
  colours, any colour, or its family's colour again; her choice is kept for that model everywhere, over restarts and updates, and a colour
  picked in a model's Edit sheet counts as hers too. Her answer to the present colours: every model took its family's colour once.
  Test: rig/t_781_model_colours.js (14 checks).

Ingenium 7.80 (25 November 2026): the guided tour shows an AI of her own built on the models page; every page of the tour now shows a
task done, and the whole tour is checked from its first card to its last.

- The models page's demonstration (`r379.js`, new). Her request (24 November 2026): "I want live demonstrations added to the Guided Tour
  to showcase all of Ingenium's pages ... specifically curated to showcase each page being used to complete a specific task". After Build
  your own AI, the page's own builder makes an example garden helper for houseplants, step by step: its name, symbol, colour (Jade) and
  purpose; the base model the builder suggests; how it works; an example that teaches it; its knowledge and settings as they are; then
  Try it and save, which shows what the model will be told, and the builder's own Save keeps it in Your own AIs. Only the conversation
  the builder would open next is held, so the tour stays on the page. It is removed when the tour ends. Test: rig/t_780_tour_mentes.js.
- The whole tour, checked (`rig/t_780_tour_whole.js`): every card from the first to the last, with every demonstration (Chat, Code,
  Adamas, Concordia, Lector, Ingenia, Vocatio, Fabrica, the models page, the Engine panel, Vesta): none throws, each shows its words, and
  when the tour ends everything of hers is as it was (conversations, folders and the folder open, her own AIs, repositories, applications,
  her page in Adamas, her question in Concordia, tasks and parked thoughts).

Ingenium 7.79 (25 November 2026): Ingenia's app logos are Lector's and Fabrica's 3D logos; Clavis's face is see-through; the guided
tour shows a task done on Ingenia, Fabrica and Vocatio.

Her messages of 25 November 2026.
- Ingenia's app logos (`r378.js`, new). Her words: "I want you to make the apps' logos animated and 3D on their folder pages inside of
  the Ingenia page. I want their logo icons to not be a still image"; then, of the previews that missed it: "I just want the apps logos
  to be animated buttons and have the same 3D look and effect on the Ingenia page that they have on the Fabrica and Lector page." So
  nothing new is drawn: every app logo on Ingenia (the open folder's head, the folders in the drawer, their tabs, the index cards) is made
  as Fabrica makes its logos (r112's sealEl and its styles), from the seals in layers Lector carries (LX7_LAYERS): each layer at its own
  depth, the seal's edge and its cast shadow; it sways at rest, tilts to follow the pointer and lifts, and sinks when pressed; by night,
  the night layers. A logo she gave an app herself stays hers and moves the same way. Test: rig/t_779_ingenia_logos.js.
- Clavis's face, see-through (`apps/clavis_clear_face.py`, run once on `apps/builtin/clavis_mark.json`). Her words: "The Clavis logo is
  transluscent on the inside, it does not have any coloured fillins"; "I want this logo made see through inside of Ingenium, do not
  overcomplicate it." Ingenium's copy filled the face inside the gold ring (ivory by day, near-black by night). Inside the ring the face's
  own colour is now taken out, by day and by night, in the seal's plate layer and in its flat picture; the gold ring and its numbers, the
  engraved circles, the rays, the key and the star stay. So Clavis is see-through wherever Ingenium shows it: Ingenia, Lector, Fabrica.
- The guided tour, stage 3 (`r377.js`, new): following the small breathing app from one page to the next. Ingenia gives it a folder with
  its conversation and brings it up to date (played, with no model asked); Fabrica keeps it as a real repository in two versions, each
  with its build number and a self-test, and runs its own Test, every check passing; Vocatio keeps an example posting, its title, who
  offers it and its closing date read from the text, with no model asked to read it. Everything of the tour's is removed when it ends,
  and what was hers (the folder she had open, the app chosen in Fabrica, the room open in Vocatio) is put back. Test:
  rig/t_779_tour_more.js.

Ingenium 7.78 (24 November 2026): the guided tour shows a task done on Adamas, Concordia and Lector, and opens the Engine panel.

Her request (24 November 2026): "I want live demonstrations added to the Guided Tour to showcase all of Ingenium's pages ... specifically
curated to showcase each page being used to complete a specific task". 7.77 gave Chat and Code theirs; this release gives the next pages
theirs (`r376.js`, new). Each is played through the page's own drawing, and each leaves nothing behind when the tour ends.
- Adamas: a small page that splits a bill is written into the editor line by line, and the preview runs it as it grows (three people,
  a bill of 64.80 and a tip of 12.5 per cent: 24.30 each). Then a request in plain words, a switch that rounds each share up, is answered
  as a model's request is: its steps (read, changed at the lines named, ran) and its reply, and the page and its preview change (25.00
  each). Her own page comes back when the tour ends; while the tour types, Run as I type is held off so a half-written script never runs.
  Where Adamas holds a large app or one opened from Fabrica, the tour leaves it alone.
- Concordia: Pass and refine, watched. The question is written once; the first model drafts a notice for a shared building's hallway,
  the second improves the draft, and the refined answer comes last with what was changed. Drawn by Concordia's own answer view, labelled
  as the tour's example, and never kept among her blends; her own question comes back.
- Lector: a small breathing app is read in two parts, a note kept on each, and a guide for its users is written onto Lector's paper
  section by section, every fact read from the code, then measured into sheets. No byline of hers is put on it.
- The Engine panel: the top bar's card said the Engine key opens Mentes; since 7.77 it opens the panel, and the card now says so. A card
  of its own opens the panel and points in turn to its state, its models, and Load and Unload; the tour changes nothing there. The
  hover help says the same (`r144.js`). Pressing or moving the tour's card leaves the panel open (`r374.js`).
- On these cards the tour's card stands at the lower left where the page's middle is what is shown; a card she moves stays where she
  puts it. Test: rig/t_778_tour_pages.js (24 checks). The other pages (Ingenia, Vocatio, Fabrica) come next.

Ingenium 7.77 (24 November 2026): the Engine panel, one model for all of Ingenium; the guided tour builds a real app in Code and a
real meal plan in Chat; Lector's pages keep every line on a sheet.

Her message of 24 November 2026 (the evening), its second stage.
- The Engine panel (`r374.js`, new). Her words: "I should be able to click on the "Engine" button from the top bar and be able to select
  to unload the model and other options for the models inside of the app ... this does not feel like a true ecosystem"; then "Instead of
  each page getting its own models controls, I think it should all be folded into and added to the Engine button and give it its own
  panel when you click on it and it operates for the entire app". Shown first as a live preview, rebuilt at her word ("The Engine panel
  looks basic and does not match Ingenium's display design"), then approved with three changes (the page names flat, lifting as a sticky
  note does; the Running card answering the pointer, its plate raised; the title fixed while only the body scrolls): "I approve of the
  previews, please commit and push it everywhere". The Engine key in the top bar opens it (until 7.76 it opened Mentes). In it: the
  engine's state, with an analogue gauge of the model's file against this device's memory; the pages that write with the model; the
  models ready on this device and those her computers lend; Load and Unload; and Reply, Memory and Effort for the model, through the one
  record (r249, r321). Choosing a model makes it the model of the whole app: Lector, Vocatio, Ingenia and Fabrica, which took Lector's own
  choice (IngLector.plan), now take it, and Lector's Read and written by gives way to one line that names the model and opens the panel.
  Mentes keeps adding, removing and checking models. Test: rig/t_777_engine.js (14 checks, with a stand-in engine).
- The guided tour's Chat and Code (`build_page.py` R192, `r222.js`). Her words: "it asks for guidance with planning for PhD applications
  which feels way too close to home ... I want the demonstration prompt to be replaced with another live demonstration prompt that
  actually demonstrates using Ingenium's chat pages to actually build an app or something else". Chat's example is now a week's meal
  plan on a small budget, as a table, with its shopping list, the thinking weighing what the meals share. Code's demonstration types a
  request for a small breathing app, then plays the reply through Code's own way: its plan ticked as it is written, the page written into
  an app of the tour's own by the reply's edit (edProcess, as a model's reply is), kept as a version, and run beside the conversation:
  a circle that grows as one breathes in for four seconds and shrinks for six. The app and its session are removed when the tour ends;
  a tour ending on Code goes back to her own session, or Home (until 7.76 Code opened an empty New session of its own). Test:
  rig/t_777_tour_code.js. The other pages' demonstrations come next, in her order.
- Code's list is of sessions, Chat's of conversations (`r375.js`, new). Her question: "rename the "Conversations" inside of the app to
  "Sessions" instead, or perhaps you could offer me some recommendations"; my recommendation, Conversations for Chat and Sessions for
  Code (Code already names a new one "New session" and has a Session column); her answer: "I approve of your recommendations for the
  naming question". On Code the list, its search, its hide key, the ☰ key's hint, the menu's heading and the name asked when renaming
  say sessions; Chat is unchanged. Test: rig/t_777_sessions.js (5 checks).
- Lector's pages keep every line on a sheet (`r108.js`). The 7.76 checks found, now and then on a busy machine, three lines at each page's
  end standing in the gap (rig/t_775_lector_sheets.js): the paper shifted a little after it was measured without its height changing
  enough to be measured again. Now the measure is checked a few times in the seconds after it and whenever a font finishes loading (the
  line before each gap must end on its sheet, the block after it begin on the next), and any change of height is measured again.

Ingenium 7.76 (24 November 2026): the list of conversations always has its key; your chosen model stays yours; Fabrica's little
diamond seen as it spins; sticky notes keep room below the line; What's new answers the pointer, under Ingenium's own logo.

Her message of 24 November 2026 (the evening), its first stage, in her order. Each was read in the code first.
- The list of conversations always has its key (`r369.js`, new). Her words: "I can't seem to find the conversations control button that
  allows the user to start a new conversation and also have the option to rename the conversation and also see the full list of
  previous conversations ... entirely missing from the both chat pages inside of the Full edition". The key (☰, at the top left of Chat
  and Code) was hidden whenever the list was set to stand open beside the chat (state.cc.side, true unless the list was once closed) on
  a window wider than 820 points; since 6.69 (r102) the list on Chat and Code always opens over the chat, from that key, closed until
  then. So on a fresh desk (her full edition, any new profile) the list was closed and its key hidden. Her master copy showed it only
  because she had once closed the list there; it was the same in every edition. Now the key always shows where the list opens over the
  chat. Test: rig/t_776_conv_key.js (Chat and Code, a fresh desk and a list closed before, 1,440 and 700 points; 7.75 fails 2).
- Your chosen model stays yours (`r373.js`, new). Her words: "the chosen model there always takes precedence and replaces any new model
  that I load from the Home page, the chat pages and the Mentes page, it always reverts to the chosen model from the Lector page". Lector,
  Vocatio, Ingenia and Fabrica write with the model chosen in Lector's Read and written by; the one helper that loads a model for them
  (ingEnsureLoaded) first made it the whole app's choice (setActive), before every part of a reading. Now it loads the model a page needs
  without touching her choice: the top bar, Home and the chat keep hers, and the chat loads it again when she next writes. Her next words
  ("Instead of each page getting its own models controls, I think it should all be folded into and added to the Engine button and give it
  its own panel ... and it operates for the entire app") are the next stage, shown first as a live preview. Test:
  rig/t_776_keep_choice.js (with a stand-in engine; 7.75 fails 2 of 6).
- Fabrica's little diamond, pressed (`r294.js`). Her words: "remove the white shadow that covers the little diamond on top of Fabrica's tree
  on Night mode whenever I click on the little diamond. I can't even see any animation, its just covered in a white smoke-like haze". A
  soft white glow, three quarters opaque and wider than the stone, lay over it for the whole spin. Now a small crisp glint crosses its
  facets as it spins, pale lavender by night; the stone stays in view. Seen in frames of the spin at night, before and after.
- A sticky note keeps room below the line (`r370.js`, new). Her words: "Right now it only goes down by one line and leaves barely enough
  room ... I want it to auto-scroll slightly and leave the page at half a page or something". In a note that keeps its size (resized by
  her, or grown long), the line being written sat at the very foot, a pixel or two cut off. Now, when it comes within about three lines
  of the foot, the note scrolls gently so it stands a little above the middle, with room kept under the last line; the note keeps its
  size; a new note that still grows line by line grows as before; the scroll bar stays hidden. Test: rig/t_776_note_room.js (7.75 fails
  2 of 8).
- The two import keys under the list of conversations (`r371.js`, new). Her words: "Please format the "Bring chats from another
  assistant" and the "Paste a conversation" buttons from the Conversations panel to match the rest of the app." They were bare words
  across the panel with a purple tint under the pointer; now each is a raised key sized to its words, lifting with a spring, no purple
  shading, by day and by night.
- What's new (`r372.js`, new). Her words: "The cards on the "What's new" card ... are currently rigid and motionless on hover ... I also
  want the right logo design to be added to the "What's new" panel instead of the stand-in design". Each version's card lifts under the
  pointer, its chip and words answering; the panel's head shows Ingenium's own seal (the top bar's) in place of the gold sparkle.
- The round model keys taken off the pages (`r325.js`). Her words: "Please also remove the little controls buttons that was added all over
  the app for the models on the Lector, Vocatio, Ingenia, Fabrica, Adamas and etc ... only keep the ones that truly belongs on the page".
  The round key (Reply, Memory and Effort for the page's model, 7.41) is no longer put beside Vocatio's Learn, Fabrica's Bring one in,
  Lector's Add your apps or Ingenia's Bring in your work (Adamas had none). Those settings stay in Chat's own Controls and in Settings,
  Models and AI, until the Engine panel holds them for the whole app.
- Her question on names, Conversations or Sessions, is answered in the chat with a recommendation; nothing is renamed until she chooses.

Ingenium 7.75 (24 November 2026): Vocatio reads quickly and visibly; no model left thinking until Stop; Adamas keeps its holder
through the tour; Lector's documents on real pages; Ingenium fills a large screen.

Her message of 24 November 2026 (the second one), its first stage, in her order.
- Vocatio, fast and visible (`build/modules/r188.js`; `build/build_page.py` 7.75). Her words: "Last night I spent over 64 minutes
  waiting for a reading on Vocatio ... I spent that time looking at a blank screen ... I have no way of knowing if any models are
  working at all". Read in the code first: since 6.44 ("I don't want any caps inside of Ingenium's pages") a reading sent as much as
  the model's memory holds (three characters a token: about 387,000 characters for Granite 4.2 8B), so her whole profile went every
  time, and a model on the Mac mini read it all before its first word, the panel showing only the seconds. Asked how it should read,
  she answered: "I want a combination of Options A and B, depending on the task at hand but I always want the option." Now:
  - Relevant first: the profile's entries, documents, apps' readings and reading notes are ordered by the words they share with the
    task (the posting, the plan, the goal), and as much is sent as this device reads in about a minute; the speed is measured on each
    reading (the characters sent against the time to the first word) and kept for each model and computer (state.vcRates).
  - Step by step, everything: the whole profile is read in parts of a minute's reading each, the model listing from each part the facts
    that bear on the task, copied exactly; the answer is written from those notes. Each part shows as it is read, with its notes.
  - A posting read against the profile is step by step by default; every other task relevant first. The choice is in the working
    panel (How it reads), remembered for each task; changing it while a run works starts that run again the new way.
  - Before the first word: the computer app's engine is asked for its progress through the prompt (return_progress, as the lending
    code has asked since 6.93), and each report reaches the panel through lxAsk (LX.onRead): how much it has read and the time left,
    with a meter; your Mac mini's own reports, when it lends its model, reach it too (lkStatus); where no report comes, the time left
    is estimated from the measured speed, and the meter says it is an estimate.
- No model left thinking until Stop (`r241.js`; `r188.js`; `r365.js`). Her words: "Vocatio has to contantly stop the model from its own
  loop when it is finally thinking and force it to finally write its response ... I want that fixed properly this time". Read in the
  code first: the watcher that stops a model's thinking at a length, or when it goes round in circles (6.46), watched only requests that
  asked to think; Lector's, Vocatio's and Ingenia's ask not to, so a model that thinks anyway (some do, whatever the request says) was
  never watched. Now those are watched too: thinking is held to about 1,200 tokens, or stopped at once when it circles, and the model
  answers from its notes; if it thinks again there past about 300 tokens it is stopped and its answer kept, or Ingenium says plainly that
  the model would not answer and what to do. A model on another computer or behind a connection is held the same way in Vocatio, and
  r365 does not wait for a reply ended so.
- Adamas through the guided tour (`r292.js`; `r367.js`, new). Her words: "The diamond is blurred in the background, and the holder is
  missing from view in the Guided Tour section of the Adamas page. The tour card is also placed directly on the diamond". Read in the
  code first: the still stone is drawn from its colours' pictures (softer than the scene) with no holder and no sky; it was chosen for
  good when a mark (ing.diamond.trying, meant for an app that stopped while the scene was tried) was left on the device, and the tour
  shows Adamas only for a moment, so a page left before three frames were drawn left the mark, and the still stone, drawing no frames,
  never cleared it. Now the mark stands only while the scene is being tried on screen; a device that has drawn the moving stone before
  gets one fresh try after an old mark; a first measurement too slow for the scene is taken again before the still stone. The tour's
  card, where it would cover the stone, stands beside it, narrowed to the room there, or above or below it on a narrow window; a card
  she has dragged stays where she put it. I could not see her Mac's screen: this is the cause found in the code that fits all three
  things she described.
- Tests: rig/t_775_vocatio_speed.js (400 invented entries and a 131,072-token memory: part by part, progress before the first word,
  the speed kept, Relevant first sized to a minute and ordered, the switch restarting the run, the watcher on unasked thinking);
  rig/t_775_adamas_tour.js (the mark after a short visit, the fresh try, a device that really stops, the card beside the stone; the 7.74
  page fails three of its seven). The older Vocatio tests give the same results before and after (t_624_stop, t_629_limits, t_646_think,
  t_658_mentor, t_61_ask; t_644_edge's two failures were there in 7.74 too).
- Lector's documents on real pages (`r108.js`). Her words: "I want the documents area to have Tabula's 3D paper UI design ... I want to
  see the proper pages and separation like in Tabula". Shown first in a live preview, which she approved with four changes: the night
  sheets "too pale and gray", then "I choose Ingenium's plum look as the approved look for Night mode but I want Tabula's original
  colour for Night added as a second option", that slate "darker and a cooler shade", the dark band between the pages removed ("give me
  true 3D pages on both Day and Night mode"), and "Please remove the frame". Now:
  - The document breaks where its PDF breaks (IngDoc, r183): at each page's end the page closes and a gap of 80 pixels opens to the
    next sheet; a paragraph, an item or a table is split at the exact line where its page ends, and joined again before each new
    measure, so it is saved, copied and written whole (a paragraph rewritten while it is written live is never doubled). Saving reads
    the document's own text, as before, never the sheets.
  - Each sheet stands alone: lit along its top edge, the paper's thickness at its foot, its shadow cast downwards only; the paper's own
    shadow and fine inset frame are not drawn on the sheets, so nothing joins the pages and no outline runs round them. By day the
    sheets are each paper's own, on a desk a shade deeper; by night every document is on Ingenium's plum, or on a cool slate (Tabula's,
    darker and cooler) chosen with Plum and Slate beside the document's size, shown by night only and kept on this device.
  - The band had two causes: the paper's frame drawn down the whole document behind the gaps (its "no shadow" rule lost to the night
    rule), and shadows spreading up and sideways from each sheet that met in the gap.
  - The saving bar folds away, as Tabula's counter bar does: Hide bar at its right end, in Ingenium's own colours; folded, Show bar
    stands at the panel's lower right corner and brings it back; kept on this device.
- Ingenium fills a large screen (`r368.js`, new; `desktop/app_zoom_775.py`, new; `release.py`). Her words: "I have a 34-inch Dell Desktop
  screen for the Mac mini, so it looks really tiny and weird on the screen, shrunken like that. I want you to fix that and compensate
  for the larger desk screen". Measured on 7.74 at 3,440 by 1,440: the page stretched to the whole width at a laptop's sizes. A zoom
  in the page's own styles cannot be used (it enlarges what is measured in the window's units too: a box of 100vw by 100vh measured
  5,160 by 2,160 at 1.5, so the panes that fill the window would spill past it). The Mac app now zooms its window as a browser does
  (WKWebView's pageZoom, macOS 11 and later, asked on the app's main thread): the page is laid out for a narrower window and drawn
  larger, so everything keeps its proportions. Display has a Size row beside Width: Auto, 100%, 110%, 125%, 150%. Auto keeps 100% up
  to a window about 1,700 pixels wide and grows with a wider one, to 150% at most (150% for the whole of her 34-inch screen); it
  follows the window as it is resized. Kept on each device. On Windows and in a browser the row is not shown (their own zoom is
  Control and plus). The window's zoom cannot run here; it is checked with a stand-in for the Mac's bridge, and I have not seen it on
  her Mac.
- Tests: rig/t_775_lector_sheets.js (pages by day and by night, every line on a sheet, no band, no frame or outline, the plum and the
  slate kept, Hide bar, a paragraph written live never doubled); rig/t_775_size.js (Auto at 3,440 pixels, the row, a chosen size kept,
  a laptop's window left alone, Windows and a browser without the row).
- The 7.75 edition check found a new message naming her Mac mini (r241, a model that will not stop thinking); it now says "one lent by
  another of your computers".

Ingenium 7.74 (24 November 2026): the Desk's five mini apps back in the full edition.

Her message of 24 November 2026, its third stage. Asked whether the mini apps should come back to the full edition, she answered
"Back in the Full edition".
- The full edition carries Tabula, Abacus, Imago, Scriba and Fontes again, whole, as it did from 6.27 to 7.48: their keys under the
  side bar's Apps group, their pages, their tiles on Home under Your apps, Lector's and Vocatio's Open in Tabula, and the words about
  them (`build/editions.py`: carries_desk is true for "full", so _no_desk no longer applies to it; `build/build_page.py`: ING_HAS("desk")
  answers yes in the master and full editions). Clepsydra and Schedae, the instruments, were in every edition throughout. The full
  page grows by about 2.6 MB.
- Another person's profile on her master copy runs as the full edition, so it has them too: r336 says the Desk's sentences as the
  editions without the Desk say them only where ING_HAS("desk") says no (DESKSAY), and r147, r108, r188 and r231 ask ING_HAS("desk").
- The gift and demo editions still carry none of them, and her own apps stay the master's alone.
- What is new: a line for the full edition (shown where the Desk is), and, for the gift and demo editions, "Nothing changes in this
  edition", so their What is new key names the version they are (in 7.73 it named 7.72, every 7.73 line being Lector's).
- Tests: rig/t_627_editions.js (the full edition's side bar with the five apps, under an Apps group, their routes to their pages; its
  words may name them), rig/t_746_no_apps.js section 4 (the full edition and another person's profile on her master have the Desk;
  the gift and demo editions none).

Ingenium 7.73 (24 November 2026): Lector reads with your computer's model and keeps reading; text copied from Lector's PDFs keeps its
spaces.

Her message of 24 November 2026, its second stage.
- Read and written by (`build/modules/r365.js`, new). Her words: "The "Read and written by" section is really confusing when I am
  sharing a model, it only insists on showing me a limited list of models on my device and does not let me choose the stronger model
  from the Mac mini ... I have no way of knowing which model is being used to do the reading". Read in the code first: Lector reads with
  this device's models, or, when the chat is connected to one of her computers, with that computer's model (the base page's lxAsk and
  supUsesLink); r108's list named only this device's models. Now the list keeps this device's models under On this device and adds each
  paired computer's under its name (On Mac mini); choosing one connects to it as Your devices does (IngLend.use, sealed as always), and
  Lector and the chat use it from then on; choosing a model on this device leaves the computer (IngLend.useDevice). One line above the
  list says which model reads and writes, and where (a green dot when the computer answers, amber when it is away).
- Lending refined, for readings (`r365.js`). Her words: "everytime I start the reading on Lector it gets stopped and it never goes
  through. I want the connections to be stable and consistent". Read in the code first: r108's ask tried a failed request twice more, two
  seconds apart, so a computer that paused for a few seconds ended the reading. Now, while Lector reads through a computer, a request
  that finds no answer, a dropped connection, or a busy or failing server (5xx, 408, 429) is tried again after 2 seconds, then a little
  longer each time up to 30, for up to 15 minutes; before each try Lector looks for the computer again (IngLend.check with find); after
  three tries, when her order of computers lets the first that answers serve (r328, IngServe.auto), another of her computers that answers
  takes over, and she is told. The reading panel says what it waits for. A refusal (a wrong code, 401 or 403; a model the computer does
  not have, 404; a request too large, 413) still stops at once with its words, and Stop stops at once.
- Lector's PDFs, their text (`r183.js`). Her pasted text (Limits and next steps) showed words joined where a line ended and a stray page
  number. Read in the code first: each word is drawn on its own, at its own place, with no space in the file, so a reader copying the
  text had to guess every space from the gaps, and some joined a line's last word to the next line's first. Now a real space follows
  each word that a gap, a line's end or the page's end follows, inside the word's own text after its letters, so nothing is seen or
  moves (the pages render pixel for pixel as in 7.72; a file grows by about one part in a hundred); a word split by a change of style
  gets none. The page number is marked as the page's furniture (an Artifact of the Pagination type), which readers that honour the mark
  leave out of copied text, with a space after it. Whether a given reader honours the mark is that reader's choice; Preview on her Mac
  was not tested here.
- Tests: rig/t_773_lector_lend.js (two stand-in computers, rig/lend681_mock.py: the list, the line, a request through the Mac mini, the
  Mac mini away for five seconds and the request finishing, a refusal stopping, back to this device); rig/t_773_pdf_text.js with
  rig/pdf_plain.py (the words a plain copy finds are the words pdftotext lays out, one for one; no line end joined; each page number
  marked; the 7.72 writer fails all three). rig/release_checks.sh: t_626_guide and t_763_owner_door now name the edition they check.

Ingenium 7.72 (24 November 2026): Fabrica's diamonds in Adamas's colour; no more blank pages; your ways of working inside How I work;
the Ollama row; Mentes' Engine, Health, storage and Train overview raised and steady.

Her message of 24 November 2026 (the first of its stages; the rest follow in later releases).
- Fabrica's small diamonds (`build/modules/r294.js`). Her words: "I want the diamond spinning on top of Fabrica's tree to match Adamas'
  diamond in colour and animation ... go by the hour and change with the time of day and day and night themes ... animated and clickable
  like the rest of the tree". Each small diamond (at a branch's end, an arch, a release's collar) now draws Adamas's own stone from its
  colours (r314's IngDiamondColours.drawn: the main diamond's 24 frames through 45 degrees, in her family), its shade chosen as Adamas
  chooses it (r292's stillDraw: by night the night shade; by day By the hour, morning 5 to 11, midday 11 to 14, afternoon 14 to 18, then
  evening, or the shade she set). It turns with the tree; under the pointer it lifts, grows a little and says its colour and shade; pressed,
  it spins three turns with a glint (not when motion is set to still); the tree looks again each minute for a new hour's shade. The clear
  crystal of before stays for a copy without Adamas's colours. Found on the way: the diamonds' positions were kept in a second list the
  pointer never read, so they could not be pressed; a list of their own (GH) is read now. IngTree.gems() for the tests.
- No more blank pages (`build/modules/r324.js`). Her words: "Sometimes the pages all blank out of view and leave an empty background ...
  when the screen is left inactive for a while and my mouse movement always bring the page back ... find the issue and fix it at the
  root". Rest (7.40) paused every animation with one rule, the finished ones too, and comes 30 seconds after the last touch or 1.5 seconds
  after the window loses focus; each page comes in with an animation from nothing (.section.active, ingPageIn, from opacity 0). Safari's
  engine, which runs the Mac app, can start a finished animation again when its play state changes, held at its first frame: the page at
  opacity 0 until a movement ends the rest. Chromium does not, so the fault could not be seen in the tests, and the fix is checked on her
  Mac. Now an element whose animation has ended is marked (.ing-done, and .ing-done-b, .ing-done-a for its ::before and ::after; the
  mark goes when an animation starts on it again; the animations already finished are marked as rest begins) and rest never pauses it;
  and when the window comes back into view, the page is painted once more (html.ing-repaint, one frame).
- Your ways of working inside How I work (`build/modules/r327.js`). Her words: "I want the "Your ways of working" section to be folded
  into or added into the "How I work" section and not be two separate areas". It stands inside How I work, on every app (r208's card,
  Ingenia's How I work tab), above her own words, which have their heading now, In your own words; Ingenia draws that card again whenever
  it paints, and a watcher of its parent's children puts the rules back each time. Found on the way: the card's raised look was written for
  a direct child of the page; the same look is given to it inside How I work.
- The Ollama row (`build/modules/r263.js`). Her words: "the paragraph is compacted into one single column and makes the panel really
  long to scroll". In the Bring in your work sheet each source is a row of its symbol, its words and its keys; on her Mac Ollama has three
  keys, and the keys' column took the row. A row with more than one key (.fd-many) now puts its keys on a line of their own beneath its
  words.
- Mentes (`build/modules/r364.js`, new; `build/modules/r214.js`). Her words: the Engine tab's "The engines on this computer" section "is
  really flat, stiff and rigid ... I want that section to match the rest of Ingenium's look and animation ... a slight redesign to match
  the rest of the tabs on the Mentes page"; the Train tab's overview cards "look compressed in and cramped in and they also keep on
  popping up and down"; "the "Health" and "Where your models are kept" sections are all flat ... give them the signature lift and 3D
  popped out animation and refined look of the sticky notes side menu panel". The two engines are raised plates (each with its cog, which
  turns a little under the pointer; the one running marked Runs now), the three choices raised cards with a dot that fills when chosen,
  the kinds only the newer engine loads as chips; what the choices do is unchanged. The Train overview's labels (Here, On a computer, Not
  yet, Not at home) had been laid over their titles by the turret's rule for its own labels (r269 and r199 share the class .tr-tag); they
  are pills above the titles again, the cards have more room, and each card keeps a strip beneath it while lifted, so a pointer near its
  foot no longer drops it and lifts it again (the popping). Health's four readings and the places where models are kept are raised tiles
  (--pop at rest, --pop-hi and a 3-pixel lift under the pointer, a press), their cards lifting a little.
- rig/t_772_fixes.js (new): 16 checks.

Ingenium 7.71 (23 November 2026): ten more nature sounds; Lending now as a key; Clavis in Ingenia; Clavis 111 and Lakay 26 carried.
Approved on its pictures and on hearing the sounds (source/previews/sounds_clavis, lending_card and nature_sounds; the pictures and the
sound files stay out of the repository): "I approve of the previews and I choose Design B for the Lending now design, please commit and
push it everywhere and continue working on my requests. I love all of the nature sounds and Clavis Folders addons but I want the latest
Clavis app added to Ingenium, the same for the Lakay app."
- Ten more nature sounds (`build/modules/r363.js`; r295 gains `IngNature.extend`, its kit and its groups, and does nothing more without
  r363; r313 leaves the groups' keys raised in Settings). Her words: "I want more day sounds like morning birds chirping, waterfalls, also
  light rain, heavy rain with thunder, and so much more". Brook, Cascade, Light rain, Rainy window, Thunderstorm, Morning birds, Forest,
  Meadow, Pond at dusk and Campfire, each made on the device the first time it is chosen with r295's own kit (its filters, noises, tones,
  bursts, echo, seamless loop and even loudness), nothing fetched or stored, at the same calm level as the stream (made in 0.5 to 2.5
  seconds each in Chromium here). In the Display panel and Settings, Sound, the places stand in five groups: Water, Rain, Day, Night,
  Wind and fire. Rendered for her to hear by previews/nature_sounds/render_sounds.js (each loop twice).
- Lending now, her Design B (`build/modules/r361.js`). Her words: "I think that the "Lending Now" card is too bulky and completly
  detracts from the look of the Mentes page, I want it to be foldable and redesigned". The card across the page is gone: a small key at
  the end of Mentes' tabs, its little level moving with the memory in use; pressed, a small panel with the meter and each device's use;
  pressing elsewhere, or Escape, folds it. IngLendMeter.show() (Go to the Mentes page, in the lending pop-ups) opens it.
- Clavis in Ingenia (`build/modules/r362.js`). Her report: Clavis was missing from the Ingenia page, its Your apps section and the rest
  of the app. The cause, traced: Ingenia makes a folder for an app only at its set-up (the apps her profile names), when a build library
  is brought in (r258, one for each app it holds notes for) and by hand; her folders were made before 7.65, so Clavis, carried from 7.65,
  never had one, and its conversations waited under Not sorted yet. Now, in the master edition and her own profile only, each app
  Ingenium carries for her has its folder, made once (state.folders.carried, so a folder she lets go is not made again), and the
  conversations that clearly name it move into it, as when she makes a folder by hand. The app library, Lector, Fabrica, Adamas, Code
  and Home had it already.
- Clavis 111 carried (Build f25065515e, its page feb5e05feeab3438, 5,458,514 bytes; from Clavis-Mac's claude/tender-fermat-3f415n at
  8741e52, approved in its own session: "I approve of the previews, please commit and push it everywhere"), in place of 109, wearing its
  astrolabe as its logo in Ingenium too: `build/apps/clavis_bring.py` now reads the astrolabe's four layers (the throne and dial, the
  rete, the rule, the pin; art/logo/layers, at Clavis's own depths: 0, 10, 20 and 28 pixels on its 108-pixel seal) and lays it flat
  from art/logo/1024. Lakay 26 carried (its page e8936a37a768e485, 2,290,756 bytes; from Lakay-Windows at 4dc9267, the newest of its
  three repositories; Lakay-Mac and Lakay-Apps hold 25) in place of 17, by `build/apps/update_builtin.py`; its mark is unchanged. Record
  08 section 7 checked again against both: no sign-in or sealing in Clavis 111; Lakay 26 keeps its books, Master Key, people, Sign out
  and practice store.
- Tests on the test page: t_770_ask 29/29 (Design B: the key at the end of the tabs, folded; pressed, its panel; pressing elsewhere
  folds it), t_771_carried_folders 10/10 (new), t_769_stage_kit 22/22 (with Lakay 26 opening to its door and practice store in the
  preview). On the release page, the server's copy checked first against its SHA-256 (f43e2b315505505b, 95,404,088 bytes): t_770_ask
  29/29 (its computer app the Mac mini repository's ingenium_app.py), t_771_carried_folders 10/10, t_769_stage_kit 22/22, t_768_readable
  15/15, t_767_scramble 33/33 (--apps, --cd), t_760_app_sign 24/24, t_762_sign_check 25/25, t_763_owner_door 24/24, t_626_guide 27/27,
  t_755_record 10/10, t_680_old_webview 12/12, t_765_clavis 27/27 (with Clavis 111); t_736_security 14/14, alone.
  The editions (full 26b445c2ab7ac6b7, 43,807,918 bytes; gift d7f98c5241e69ae5 and demo 794b22136fcfbc70, 42,115,586 bytes each; each
  carries r361 to r363, none names an app of hers): t_627_editions 29/29, t_745_owner_free 21/21, t_745_to_full 15/15, t_746_no_apps
  full 22/22, gift 19/19, demo 19/19 and the master page as a guest 22/22, t_763_owner_door full 2/2 and gift 2/2, t_767_scramble full
  4/4, gift 3/3, demo 3/3, t_768_readable gift 2/2, t_769_stage_kit gift 22/22, t_770_ask gift 29/29, t_771_carried_folders with the
  gift edition 12/12 (it makes no folder and carries none), t_626_guide gift 27/27.

Ingenium 7.70 (22 November 2026): asking and offering with Accept; whose models answer, in colour; Lending now in Mentes.
Approved on its sixteen pictures (source/previews/lend_ask; the pictures stay out of the repository), sent to her one by one after the
7.69 release: "I approve of the previews, please commit and push it everywhere and continue working on my requests."
- Asking and offering with Accept (`build/modules/r360.js`, `build/desktop/app_ask_770.py`, hooks in r319 and r274). Her words (22
  November 2026): "Pop-up notifications must appear for each step", with the text for each step, and her answers that day: Accept
  replaces the code and the code stays as an option ("in case it fails ... nice to have as a bonus option"); B's pop-up after an offer
  names A; A is told when B accepts, too. A device asks a computer that lends to use its models, with no code typed (POST /ingenium/ask:
  only while the computer lends, only from a device that seals, at most six asks a minute, one waiting ask for each device); both screens
  show the same four words; on the computer, who asks and what for, with Accept and Decline; each side is then told the answer in her
  words. A computer offers its models (Offer my models, beside a device in Your devices; Offer my models to a device nearby): the device
  shows the offer with Accept and Decline; Accept pairs at once, sealed, since she offered. Found before release, on reading the patch
  again: an offer to a device nearby stood for ten minutes after the first device took it, so every device nearby that accepted in that
  time would have paired without her; it is now taken by the first device that accepts it, and by no other (rig/t_770_ask.js checks it).
  The code stays as the second way. Record 06 section 17, records 00, 01, 05, 09 and 10.
- Whose models answer, and the memory they take (`build/modules/r361.js`). Her words: the who-answers widget pulses "with a faint colour
  glow based on which Ingenium's models are being used. If A Lends to B - A's model widget should pulse outward B's model widget should
  pulse in reverse with the same dimensions"; and her answer: each computer its own colour, chosen by itself, and she can change it. The
  who-answers keys (beside the message box and in the top bar) glow in the colour of the computer whose models answer: outward on the
  computer that lends while a device uses it, the same pulse reversed on the device. Eight colours, one for each computer by its id;
  Colour, under each computer's name in Your devices and on the lender's column, opens them (the desk's state.lendColors). In Mentes,
  only while the computer lends, Lending now: the memory in use, measured about four times a second while it is in view (share_memory), in 32
  segments like a microphone's level meter (green, then amber, then rose near the top), its highest mark lit a moment when it falls; and
  each device's use (share_usage: today, in all, its last use and model).
- Tests: rig/t_770_ask.js 27/27 on the test page (a real computer app, rig/run_app.py, and two devices in plain browsers; invented names).
  On the release page, the server's copy checked first against its SHA-256 (4f7bd5f7f033a7f9, 95,202,924 bytes): t_770_ask 27/27 (its
  computer app the Mac mini repository's ingenium_app.py as release.py patched it), t_769_stage_kit 22/22, t_768_readable 15/15,
  t_767_scramble 33/33 (--apps, --cd), t_760_app_sign 24/24, t_762_sign_check 25/25, t_763_owner_door 24/24, t_626_guide 27/27,
  t_755_record 10/10, t_680_old_webview 12/12, t_765_clavis 27/27; t_736_security 14/14, alone.
  The editions (full 87480459e93ab659, 43,781,318 bytes; gift c0595bbb4a76c8c3 and demo 293abfcdd30b173b, 42,088,986 bytes each; each
  carries r360 and r361, none names an app of hers): t_627_editions 29/29, t_745_owner_free 21/21, t_745_to_full 15/15, t_746_no_apps
  full 22/22, gift 19/19, demo 19/19 and the master page as a guest 22/22, t_763_owner_door full 2/2 and gift 2/2, t_767_scramble full
  4/4, gift 3/3, demo 3/3, t_768_readable gift 2/2, t_769_stage_kit gift 22/22, t_770_ask gift 27/27, t_626_guide gift 27/27.
  rig/t_769_stage_kit.js and rig/t_770_ask.js agree to the editions' terms with I agree (the first key in the terms is their In short tab).

Ingenium 7.69 (22 November 2026): every app opens in the preview; Clear the preview; her standard for side menus.
Approved on its pictures (source/previews/stage_preview) with her choice of Design A for More: "I approve of the previews and I choose this
look for the light redesign of the Live Preview panel's more menu, please commit and push them everywhere and continue working on my
requests"; then "I want you to give the sticky notes' side menu panel the same redesign look as the Live Preview panel, it should be made
standard and added to my Ingenia files."
- Every app opens in the preview (`build/modules/r358.js`, `build/stagekit/`). Her report: Lakay never opened in the Live Preview, stopping
  at its door ("IDBFactory.open() called in an invalid security context"), while Clavis did. The cause, traced: the preview runs a page in
  a sandboxed frame with no origin of its own (so it never reaches Ingenium's stores), where the browser refuses it IndexedDB, cookies,
  Cache Storage, the service worker, the storage manager and locks; Ingenium stood in for local storage alone (R82). Lakay keeps its books
  in IndexedDB; Clavis in local storage. Also found: a link to a part of the page (href="#...") resolved against Ingenium's own address
  and loaded Ingenium inside the frame, history entries for one were refused, a form naming nowhere loaded Ingenium too, and a file the
  page saved never downloaded. The stage kit (kit.js and inject.js, bundled by make_kit.js with fake-indexeddb 6.2.8, Apache-2.0, its
  licence beside it and in THIRD_PARTY_NOTICES.txt as entry 16; esbuild 0.28.2 bundles it, by hand, and is not carried) runs first in every
  page Ingenium runs in a sandboxed frame (the preview, its large pages, Build's preview, a window of its own, Fabrica's quiet windows,
  the Workshop's pages) and stands in for each store; links, history and forms stay in the page; a saved file goes through saveFileNative.
  In the preview beside Chat and Code, what a page keeps in its database and cookies is kept for it: its text as a sealed long text named
  in state.stageKits (by r179's key), the keys it made (CryptoKey, which cannot be written as text: Lakay's practice store has one) in
  IndexedDB ingenium_stage_keys; handed back before the page opens anything, each time it runs; asked for before it runs again. The page's
  charset now comes first after its doctype, so a page given as a file of its own reads as UTF-8. The Storage page names the new store.
  The record: record 06 section 16, records 05, 01, 00, 09 and 10.
- Clear the preview (`build/modules/r359.js`), in More just above Close: the page leaves the preview and stops running (what it kept stays
  kept), the panel says it is clear, and it stays clear in that conversation, across a return and a new start, until she opens a page or a
  reply writes a new one. More's rows in her Design A (quiet rows in one raised card, rising under the pointer), every row in view (the
  chat menus' 340-pixel limit had hidden Close behind a scroll once the new row came). Her standard for a panel's side menu from now on:
  a sticky note's menu wears it too, and any new menu takes it with .ing-side-menu; record 07 section 6 says it.
- A note's paper swatches by night, raised as by day (her words: "I don't want the colour swatches to be flat on dark mode, I want them
  to have the same 3d popped out look and animation on dark mode that they do on light mode"). The cause: the night dress (tintDots, in
  the base page) wrote each swatch's night paper and a flat rim inline, as important, which no style could raise and no pointer could
  lift. build_page.py's edit now has it write the paper under a light falling from above and leave the shadows, the lift and the press
  to the styles (r359's night rules, and the base's).
- Tests on the test page: t_769_stage_kit 22/22. On the release page, each time the server's copy checked first against the page's
  SHA-256: first on 02ed8de3fea41ddd (95,161,998 bytes): t_769_stage_kit 22/22, t_768_readable 15/15 (run again here), t_767_scramble
  33/33 (--apps, --cd), t_760_app_sign 24/24, t_762_sign_check 25/25, t_763_owner_door 24/24, t_626_guide 27/27, t_755_record 10/10,
  t_680_old_webview 12/12, t_765_clavis 27/27; t_736_security 14/14, alone (rig/t_736_security.js brought up to date: its check of
  Your apps' code scrambled said Not yet, which it has not been since 7.67, when it was built and on from the start). t_627_editions
  then caught What is new naming Lakay in the editions that carry nothing of hers; its line was reworded, and the page built again:
  42fb968d714d041f, 95,162,239 bytes, the release page, differing from the first by that line alone. On it: t_769_stage_kit 22/22
  (twice: the second time with the test's corrected terms step, below), t_626_guide 27/27, t_755_record 10/10, t_763_owner_door 24/24.
  The editions (full 276d17573015193b, 43,746,529 bytes; gift 865c264c0b36ccc8 and demo 8feb4cf765e44569, 42,054,197 bytes each; none
  names Lakay): t_627_editions 29/29, t_745_owner_free 21/21, t_745_to_full 15/15, t_746_no_apps full 22/22, gift 19/19, demo 19/19
  and the master page as a guest 22/22, t_763_owner_door full 2/2 and gift 2/2, t_767_scramble full 4/4, gift 3/3, demo 3/3,
  t_768_readable gift 2/2, t_626_guide gift 27/27, t_769_stage_kit gift 22/22. The last needed a fix in the test, not the page: the
  editions open with their terms, and the test pressed the first key in them (the In short tab) instead of I agree.

Ingenium 7.68 (22 November 2026): read it as written, part one; Clavis 109 carried.
Two parts, each approved on its pictures with the same words, "I approve of the previews, please commit and push it everywhere and
continue working on my requests".
- Read it as written, part one (built in session 016zEHoDq4VN5kppHeMu331S, which committed the version numbers, the computer app's
  release and the sources at 15:25 and was interrupted before the page was built): `build/modules/r357.js`, out of held.json. Settings,
  Security, Ingenium itself: Your reading key (an ECDH P-256 key made on her device and kept only under its own password, as her owner key
  is; its public half saved as a file, a sealed backup, bringing it back from the backup); a scrambled copy of one of her apps that comes
  back to her opens as written (Fabrica's Bring one in opens the app at the version it was made from; Lector's app library keeps it as
  written). Each scrambled page names the version it was made from. What is new (r222) describes Ingenium in its own words, at her rule of
  5 November 2026. The record: record 06 section 15, sections 7 and 8; records 00, 01, 09 and 10. Its own test, `rig/t_768_readable.js`,
  passed 15/15 on that session's 7.68 test page; it was not run again here.
- Clavis 109 carried in place of 106 (Build daaa40add2, 5,421,623 bytes; its page 01d092c4ea91b467; Clavis-Mac 15940c0, Clavis-Window
  33ef6bc, Clavis-IOS-Android 1efda1b): its keys are real keys standing on their own edge, its day paper is Ivory, its Home is its own (the
  search set in a card catalogue's drawer, with no great logo over it), its About is short, its seal is a silent fidget button with the
  same slim key everywhere, and pressing it in the bar brings the welcome door back. `apps/clavis_bring.py` brought it in; What is new
  (r222, the master edition only) and record 08 follow. Its own tests on that page: t_smoke 119/119, t_lang all passed.
- Tests on the release page (the server's copy checked first against the page's SHA-256):
  t_765_clavis 27/27 (Fabrica's test of Clavis reads cleanly: build 109, every file it names, no error when it opens), t_655_fixes
  23/23, t_683_logos 12/12, t_685_folders 37/37, t_677_offline 20/20, t_763_owner_door 24/24, t_755_record 10/10, t_626_guide 27/27,
  t_762_sign_check 25/25. The master page is 95,036,627 bytes (fingerprint a1f88ddc44430bbc).

Ingenium 7.67 (22 November 2026): your apps' code scrambled.
The Security room's promise (modules/r318.js, approved on the live preview of 18 November 2026): "The shipped code shrunk and its names
scrambled: much slower to read or copy, never impossible. Your sources stay as you wrote them." Her choice (21 November 2026), of the three
protections approved and not yet built (record 06, section 7): "Scrambled code", then "Keep going with the scramble code please." Shown to
her as eight pictures one by one at full size (`previews/scramble`: the scripts; the pictures stay out of the repository), and her word
(22 November 2026): "I approve of the previews, please commit and push it everywhere and continue working on my requests." Her approval
came before the pictures reached her, so she was asked again once she had them, and answered "Yes, release 7.67". Built in session
016zEHoDq4VN5kppHeMu331S as 7.65 at first; another session released 7.65 and 7.66 (Clavis) on this branch meanwhile, merged here, so it
is 7.67.
- `build/modules/r356.js` (out of held.json): every package Fabrica makes carries the app's code shrunk and the names inside it scrambled
  (window.IngScramble). What leaves Ingenium only: `IngShip.onePage` with a target (the one page, the download, the APK, the IPA, the Mac
  and Windows apps, the build kits) or a `ship` mark (r114's release attachments, r178's web app page, r316's app sent to her devices);
  Run, a version opened apart and Fabrica's measures stay as written. Each script of the page (no src, of no other type) goes through
  Terser in a worker (the page itself if a worker cannot be made): no compression of its logic, the names inside each function and a
  module's own names scrambled, comments gone but a licence or copyright note and a build marker (one word in capitals) kept, strings in
  their own quotes (`quote_style: 3`), so a version written in the code (Carpe Diem's CD_BUILD, Inkwell's BUILD) reads as before. The
  names the parts of a page share, and those its markup calls, stay as written. The pages an app carries packed inside (base64, gzipped or
  not: Carpe Diem its own copy and The Forge's, The Forge the Desk's five apps) are opened, scrambled the same way and packed again as
  they were, three levels deep; data of any other kind stays as it is.
- The safety net: before anything is made, the scrambled copy runs in Fabrica's quiet window beside hers, and so does each page it
  carries; an error hers does not show, or a version read differently, and the package carries her code as written, and Ingenium says so
  in the app's own words of the error. A script Terser cannot read is left as written, and said. A copy made once serves the next packages
  of the same version.
- `build/modules/r349.js`: asks r356 before the door (r354) and the signature, and on the paths that make a package unsigned, so the
  signature is over the code as shipped. `r112.js`: Package details' Scrambled code (on unless she turns it off; Ingenium's own row fixed
  off), the Ship tile's Scrambled chip and the package line. `r114.js`, `r178.js`, `r316.js`: their ship marks. `r318.js`: the room's
  state and well (On; Off in a copy without Fabrica, naming nothing it does not have).
- `build/terser/`: Terser 5.51.2 (published 27 August 2026), the npm package's own `dist/bundle.min.js` unchanged (tarball sha1
  555912425a7f2ff7737425c3718fa76c7069f6ef), its licence (BSD-2-Clause) and `terser.json` (its SHA-256 and size). `build_page.py` checks it
  and writes it deflated in base64 after r356, only where there is a Fabrica (master and full); it parses as ES2020 and uses nothing
  Chrome 83 lacks, so the Fire tablet runs it. THIRD_PARTY_NOTICES.txt in the four repositories: 15, Terser.
- What is new (r222): two lines where there is a Fabrica, one where there is none.
- The record in Ingenium's folder: record 06 section 14 (new), sections 7 and 8; records 00, 01 (its two lines that still said the phones
  and tablets did not check Ingenium itself, true since 7.64), 09 and 10.
- rig: `t_767_scramble.js` (33 checks on the 7.67 release page with `--apps --cd`; 4 on the full edition, 3 on the gift and demo): Package details' switch, off and on again; the room; a package unsigned and signed (the
  signature over the scrambled page), and with the door of an app for its owner alone (the door as r354 wrote it); names scrambled and the
  shared ones kept; licence and marker comments kept; quotes kept, the version read the same; a module script; a data block untouched;
  the scrambled page showing what hers shows; Run and a version opened apart as written; the Ship card's chip; two pages packed inside
  (base64, gzipped) scrambled and packed again; a copy that shows an error hers does not, made as written and said; a script Terser cannot
  read, left as written and said; Ingenium itself never scrambled; the release, send and web marks; the web app's page; and with
  `--apps` her five built-in apps scrambled in the page and opened beside hers. With `gift`: no scrambler, no switch, Off, no Fabrica named.

    node rig/t_767_scramble.js <ingenium page file> [--apps <builtin folder>] [--cd]

- Measured (the 7.67 test page, this computer, a worker): Lakay 1 script in 1 s; Clavis 10 scripts and 1 page it carries in 1 s; Inkwell
  12 scripts in 2 s; The Forge 213 scripts and the five Desk apps it carries in 6 s (code 9,880 KB to 8,859 KB); Carpe Diem 443 scripts and
  the two pages it carries (its own copy and The Forge's) in 13 s (27,472 KB to 25,103 KB). Each opened beside her copy: no error hers does
  not show, the same title. Carpe Diem's packed Forge carries the Desk apps as notes with no code (it keeps them itself), so they stay.
- The master page: 94,996,938 bytes (about 90.6 MiB), 313,061 bytes more than 7.66's (Terser deflated, and r356). On the release page
  (40edb53baa789a95): t_767_scramble 33/33 (with `--apps --cd`), t_760_app_sign 24/24, t_762_sign_check 25/25, t_763_owner_door 24/24
  (its Package details check now takes Scrambled code as a third row), t_626_guide 27/27, t_755_record 10/10, t_680_old_webview 12/12,
  t_765_clavis 27/27.

Ingenium 7.66 (22 November 2026): Clavis 106 carried; its page names its build number, and Fabrica's test of Clavis passes.
Her words (22 November 2026): "I want you to add the build number to Clavis so that there are no issues with Fabrica's tests."
- Clavis 105 (Clavis-Mac, Clavis-Window and Clavis-IOS-Android, branch claude/tender-fermat-3f415n, on top of build 104): its
  tools/build.py writes `<meta name="version" content="105">` (its app.json's pass) into the page's head, where Fabrica already reads
  an app's number (modules/r111.js, numberOf). Fabrica's test of it then found its number, but failed "every file it names is here"
  (manifest.webmanifest and icons/apple-touch-icon.png, which live beside it only on the website) and noted an error in its test
  window (navigator.storage.persisted() refused there, uncaught). Clavis 106: the page links those two when served from the web, and
  the storage questions catch a refusal; Fabrica's test of the page alone: every file named is here, it opened and ran with no errors,
  build 106. Its tests: t_smoke 105/105, t_lang all passed.
- `apps/clavis_bring.py` brought Clavis 106 in (Build bbf59d1544). `build_page.py`: the app library reads Clavis's number from the
  same line (libVersionOf), as Lakay's from its lakay-build line; `editions.py` takes that line out of every other edition.
- rig/t_765_clavis.js: the carried page names its number, the app library and Fabrica's rule read it, and Fabrica's own test of the
  brought-in Clavis reads cleanly: its build, every file it names, and no error when it opens.
- The master page: 94,683,877 bytes (about 90.3 MiB), 555 bytes more than 7.65's. `release.py` now gives each page's size in bytes; it
  gave the length of the page's text before, which is a little shorter than its bytes (the size written under 7.65 is corrected there).

Ingenium 7.65 (21 November 2026): Clavis, her search engine, built into the master edition as her other apps are.
Her words (21 November 2026): "I have a new app named Clavis. I have given you access to its repositories on GitHub. Please add it to
Ingenium as one of my apps into all of its pages, Fabrica, Adamas, the chat pages, Lector, and Vocatio and most of all the Ingenia page
and anywhere else. I want the app to be built into my master edition of Ingenium like the other apps." Done as Lakay was in 6.55.
- `build/apps/clavis_bring.py` (run on the Clavis-Mac repository): `builtin/clavis.html.gz` (its page, `clavis.html`, the whole app in one
  file), its record in `builtin/builtin.json` (its pass as its version, 104 at 7.65, Build d6eef19730, its date, its gold `#b8862f`, size and SHA-256)
  and `builtin/clavis_mark.json` (its seal's four layers, plate, rays, key and star, at Clavis's own depths as a share of the width, and the
  seal laid flat at 256 pixels by day and by night). `build_page.py` carries them in the master edition alone (not the lean copy The Forge
  carries): the page as `ing-builtin-clavis`, the seal as `ING_SEALS.clavis` and `clavisN`, the layers in `LX7_LAYERS`.
- The app library knows it by name (`LIB_KEYS`, `LIB_NAMES`) and by its page (its title with its copyright line), in both of the page's
  readings; the later one (the base page's second `libDetect`) knew neither Lakay nor Clavis before, so a newer page of either added by
  hand was kept as some other app. `r120` keeps the carried copy on first start (Clavis 104, built in); `r240` lists it once kept (as
  Lakay); Lector (`r108` through the library, `r109` for its PDFs), Adamas's Open an app and Code's Your apps (`IngApps`), Fabrica (`r112`:
  Bring one in from the app library, then one of her own apps in its gold, with its layered seal), Home (`r147`), the folders a chat import
  makes (`r258`), a repository brought from GitHub named Clavis (`r276`) and the one place an app's logo is found (`r277`: its own picture
  by day and by night, so Ingenia's folder, card and opened folder wear it). Vocatio draws on Lector's reading of an app, as for every app.
  In another person's profile What is new hides a line that names Clavis (`r336`).
- Code's Your apps card spoke of "your four apps"; it now speaks of the apps kept in the app library.
- `r147`: a set of four apps is called the Offline Project only when it is the four (with Lakay and Clavis, four may be another four).
- Inside Ingenium, Clavis opens as her other apps do: in a window of its own that keeps to itself (`thoughts/open_apart.html`, a sandboxed
  frame with no origin). Its searches reach the services it asks, but its library cannot be kept there (IndexedDB refuses a frame with
  no origin) and its settings last only while that window is open. The installed Clavis apps keep their library on the device.
- No other edition carries any of it, nor its name, even in the code (`editions.py`, `_no_clavis`, run before `_no_lakay`); none in
  another person's profile on the master copy (r120 and r336, as for every app of hers).
- The master page grows by about 5.5 MB, to 94,683,322 bytes (about 90.3 MiB; GitHub refuses a file over 100 MiB). (First written
  here as 94,676,199, the length of its text, not its bytes; corrected in 7.66.)
- rig: `t_765_clavis.js` (the library keeps it, every page that lists her apps names it, Fabrica brings it in and it wears its layered seal,
  Ingenia day and night, opened from Ingenium in a frame with no origin); `t_627_editions` and `t_746_no_apps` also look for Clavis.

    node rig/t_765_clavis.js <master page url> <out folder>

Ingenium 7.64 (21 November 2026): Ingenium itself, signed and checked, part two: the iPhone, iPad and Fire apps, and the copies she gives.
The Security room's promise (modules/r318.js, approved on the live preview of 18 November 2026): "each release signed with your owner
key, and checked by the computer apps and the iPhone, iPad and Fire apps before Ingenium opens". Part one (7.58) was the Mac and Windows
apps. Shown to her as eight pictures one by one at full size (`previews/self_sign2`: the scripts; the pictures stay out of the repository;
first made by session 01E1RQBJcMzrWTBAb5ip2Gr8, taken again by session 01QVxDzBf9j53xYyRwyin6eP after what they showed was put right,
5e88638), and her word: "I approve of the previews, please commit and push it everywhere and continue working on my requests."
- `build/modules/r355.js` (out of held.json) with its hooks in `r348.js`: on a phone or tablet the room asks the app's own bridge (INB:
  selfCheck, selfSignaturePut, selfSignatureGet) and speaks of this iPhone, iPad or Fire tablet; in her master copy on a computer, Sign
  this release signs the copy her computers run and the copy her phones and tablets carry with the same key while it is open, and Save
  the signature saves one file that each of her devices takes; a release signed before has Sign it for your phones and tablets; Sign a
  copy you give signs a full or gift edition's page and its copy for phones and tablets, saved as a file to give with that copy.
- `build/desktop/app_self2_764.py` (the Mac and Windows apps): the copy for phones and tablets made from the app's own page, in memory, by
  `tools/app_page.py`'s own steps in its order (the build number empty), and read as phones read theirs (self_mobile_fields); its
  signature kept beside hers when it is hers and names those very files (self_mobile_signature_put); self_check says mobile_signed;
  self_signature_get gives one file with both signatures; self_signature_put takes that file and keeps both; self_give_pick reads a full
  or gift edition's page chosen in the system's dialog (the master edition's is refused). The 7.58 check reads only signatures of the app
  "ingenium", so the new files change nothing in it.
- The Fire and iPhone repository: `SelfCore.java` and `SelfCheck.java` (Fire and Android: the check before the page, in `MainActivity`,
  the three calls in `Bridge`, the refusal page `assets/self_refused.html` with Check again), `SelfCore.swift` and `SelfStore.swift`
  (iPhone and iPad: the same, in `WebViewController` and `EngineBridge`). Each file of the copy is read whole and hashed with SHA-256,
  the stamped build number left out of the page; a signature of hers is checked with the owner's public keys in `self.json`, written in by
  `release.py` (`self_stamp`) at each release, as the computer apps' are. Only a device with a signature kept checks at start; one with
  none opens at once and says Not signed yet. Both cores are built from the shells' own check of 7.62, and both are run at each build on
  GitHub against the same cases (`tools/selftest`: the cases, made by `rig/t_764_self_core.py` with `KEEP_VECTORS` and a throwaway test key; `SelfCoreTest.java` at each
  Fire build, `main.swift` at each iPhone build). The other session's native files did not reach GitHub before it ended; session
  01E1RQBJcMzrWTBAb5ip2Gr8 wrote them again from this description and from `rig/selfcore/SelfCoreTest.java`, which did.
- What is new (r222): one line for every edition, two for the master's.
- The record in Ingenium's folder: record 06 section 13 (new), section 7 and section 9's limits, records 00, 01, 09 and 10.
- rig: `t_764_self2.py` (24 checks: the copy made here is app_page.py's own, on a test page and on the 7.63 release page; one with a build
  number stamped in reads the same; the signature kept or refused; one file for every device; Sign a copy you give; both bridges) and
  `t_764_self_core.py` with `selfcore/SelfCoreTest.java` (21 checks of `SelfCore.java` on this computer, a real release's phone copy
  among them).

    python3 -I rig/t_764_self2.py <ingenium_app.py> <Fire and iPhone repository>/tools/app_page.py [<release page>]
    python3 -I rig/t_764_self_core.py <ingenium_app.py> <app_page.py> <SelfCore.java> <self_refused.html> [<release page>]

Ingenium 7.63 (21 November 2026): opens only with your owner key.
The Security room's promise (modules/r318.js, approved on the live preview of 18 November 2026): "For an app meant for you alone: it
opens fully only on a device that holds your owner key, as the master edition does." Shown to her as nine pictures one by one at full
size (`previews/owner_key`: the scripts; the pictures stay out of the repository), and her word: "I approve of the previews, please
commit and push it everywhere and continue working on my requests."
- `build/modules/r354.js` (new): Package details (Fabrica, Ship) gains Opens only with your owner key, under Signed with your owner key,
  off for every app until she turns it on; turned on, it keeps the signature on, since the signature carries the door. Every package made
  from such an app's page then carries a door, the page's first script, written in before r349 signs the page. Where the app was opened
  by its owner (the owner key's file and its password, once per device) or with a permission the owner signed (PermitCore's own: it
  allows use, it is in its dates, not withdrawn, and for this app), the app starts as it is; anywhere else the door stops the page before
  anything of the app is read, and draws itself in its place. The opening is kept in the app's own storage, signed by the owner key, and
  checked again at every start; the key is used once and not kept; nothing leaves the device. On a device without her owner key nothing
  is made for such an app, and a page whose own security policy runs only its own scripts cannot carry the door: nothing is made, and
  Fabrica says why.
- The Security room (r318) says how many apps are hers alone, and what the door keeps out and what it cannot: a page opened straight from
  its file in a browser is not checked, and someone who takes the app apart on a device where it is open can always read it. A permission
  she withdraws closes only the copies made after it, which carry her newer list (record 06, section 12).
- The permission form (Settings, Licence and permissions; r162 and thoughts/permit_core.html) lists the apps she keeps for herself alone
  beside her four, and a permission names such an app as its door reads it (its name in small letters, or PermitCore's short name).
- The other editions: no switch and nothing made for its owner alone; the room says that the owner's own copy of Ingenium makes such an app.
- The shells: what the door needs from each device's app (Web Crypto in a secure context, and a page that stops where its first script
  stops it) is checked on GitHub's machines (shells/test/door_check.html, in build-shells.yml, run 44931986250). On Apple silicon and
  Intel Macs and the iPhone simulator (carpe-app://desk, a secure context), on Windows (https://desk.app.test) and on the Android 9 and 11
  emulators, Web Crypto was there and nothing after the stop ran. On the iPhone simulator the first app opened after it starts took
  about three and a half minutes, longer than its check's first case waited (three minutes): that case now waits up to six, as the step
  before it does (shells/test/ci_ios.sh). Android 14's emulator stopped answering at The Forge's 13 MB page before it reached the check, as
  it has done since 6.1. Two faults in the check itself, found on its first run and fixed: the Mac and iPhone shells report a page when it
  finishes loading, and a stopped page never finishes, so the check page reports itself through their log; and the Windows case named its
  files through $T, which holds a time at that point of the script.
- What is new (r222): two lines for the master, one where there is a Fabrica, one where there is none.
- The record in Ingenium's folder: record 06 section 12 (new), records 00, 01, 09 and 10.
- rig: `t_763_owner_door.js` (24 checks on the test page: the switch and its signature; the room; the permission form's list; the package,
  its door the page's first script and the page signed; a page that runs only its own scripts, and a device without her key, making
  nothing; the door: a wrong password, the owner key, the next start, an opening changed by one field, an opening from another device;
  permissions valid, ended, withdrawn, another app's, not for use, and not the owner's; a kept permission that has since ended; and, in
  another edition, no switch).

    node rig/t_763_owner_door.js <page url> [master|gift]

Ingenium 7.62 (21 November 2026): your apps signed when shipped, part two: every app Fabrica makes checks its signature at each start,
and an app is checked as it comes into her library.
The Security room's promise (modules/r318.js, approved on the live preview of 18 November 2026): "a changed file is caught, and the app
refuses to open and says so." Her words on starting it (21 November 2026): "Yes, please start on the signing card and continue working on my
requests." Shown to her as ten pictures one by one at full size (`previews/app_sign2`: the scripts; the pictures stay out of the
repository), first by session 01E1RQBJcMzrWTBAb5ip2Gr8, then taken again from the same scripts by session 01QVxDzBf9j53xYyRwyin6eP, and her
word: "I approved of the previews from the other session and this one, please commit and push it everywhere and continue working on my
requests."
- The shells (source/shells): each app Fabrica makes for a device checks its page against its maker's signature at every start, before
  anything of it runs: the Mac and iPhone shells (SignatureCheck.swift), the Windows shell (signature_check.h), the Android shell
  (SignatureCheck.java), the same steps as r349's own check. The owner's public keys and the refusal page (shells/common/refused.html,
  r349's approved refusal) are compiled into each (shells/common/make_common.py, from security/owner_keys.json), so a changed copy cannot
  change them. A page not as it was signed gets the shell's own page in its place, saying which file and why, and nothing else of it runs.
  r136 and r170 write into each package made from a signed page that it was signed (shell.json's signature; shell.txt's signature_kid and
  signature_app on Windows), so a page whose signature was taken away is refused too. build_page.py refuses a release whose shells were not
  built with the check and the owner's keys of now (each must carry the line common.json names).
- 32 cases every shell's check is tested against (shells/common/test, made with throwaway test keys). On GitHub's machines
  (build-shells.yml, run 44916687413): the Mac shell's check (Swift) and the Windows shell's (with Windows' own cryptography) against the
  cases; each shell filled as Fabrica fills it and opened, on Apple silicon and Intel Macs, Windows, the iPhone simulator, and the Android
  9 and 11 emulators, with a page signed with a key the shell does not carry: refused before it ran, the shell's own page in its place (the
  pictures in shells/out/checks). Android 14's emulator stopped answering while it opened The Forge's 13 MB page, before the refused case,
  as it has done before (6.1), so that case is not yet seen on Android 14.
- Two faults in the checks themselves, found on GitHub's first run of 7.62 and fixed: the Android check could not make its signing key in
  Node since 7.44 (r136 asks window.__ingGuest; rig's shells/test/load.mjs now gives Node the page's window, as a page has it), so the
  emulator checks had not run since; and the Windows check's new case looked for its maker in a folder named after a time
  (PowerShell's names ignore case: the uninstall check had set $t, which the new line read as the test folder $T).
- `build/modules/r352.js` (new): an app brought into her library is checked as it comes in: Lector's app library (Add your apps, the app
  library file, one app's page) and Fabrica's Bring one in (a page or a zip; r112). Signed and as it was signed: kept, marked Signed by
  you (Signed, outside the master). Not signed: kept as before, marked Not signed. Changed, or signed with a key that is not the owner's:
  a card of r349's own kind says so and asks; Leave it out is the key it opens on, and Escape leaves it out; Keep it anyway keeps it
  marked Changed (or Not the owner's). What she left out is said as such in the library's note, never as a page that could not be read.
  Copies kept before 7.62 are checked once, quietly. The marks are small raised chips under each app's name on Lector's tiles (r108 for
  the older card). window.IngAppSign gains cameIn(u8, name), brief(r), libChip(s).
- r349 and r112: the Security room and Package details say that every app made checks its signature at each start; what is still not yet,
  said in the room: an app built from its build kit, on GitHub or in the terminal, carries the signature but does not check it at start.
- The Author Studio, raised (`build/modules/r353.js`, new; the master's alone, as the studio is: editions.py). Her words (21 November
  2026): "The Editor page and other pages inside of Ingenium's Author Studio look flat, stiff and rigid, they lack the popped out animated
  3D look and effect of the rest of the app, please fix it and give them the animation and 3D look and effect that they are missing to
  match the rest of the app." Shown to her as ten pictures one by one at full size and a live preview made from the running studio
  (`previews/author_raised`: the scripts; https://claude.ai/artifact/HpxY87hApV7UCBZ8aWNAdD, private), and her word: "I approve of the
  preview, please commit and push it everywhere and continue working on my requests." 6.38 had made the studio flat at her word then
  ("Everything inside the Author Studio looks big and chunky"), so its measures stay those of 6.38; only depth and movement are added, the
  rest of the app's own, those of Settings, raised (r313, 7.28): the cards are raised slabs that rise in one after another; the Editor's
  kinds are raised tiles, each with its room's mark on a violet disc, that lean toward the pointer (at most 4 degrees), lift and sink when
  pressed; the Names cards and the ready looks are raised tiles and keys; the rows of Words, Names and the Change log are raised plates that
  lift; the fields are lit wells; the layers' strip is a well whose chosen part is a raised key sliding under the choice; the top bar's keys
  lift and sink. The rail stays as she approved it in 7.42. Minimal motion, the calm look and the system's reduced motion keep it still.
- What is new (r222): one line for the master, one where there is a Fabrica, one where there is none, and one for the master's Author Studio.
- The record in Ingenium's folder: record 06 section 11 (new), records 01, 09 and 10, and record 07 (the Author Studio raised).
- rig: `t_762_app_sign2.js` (20 checks: the room's and Package details' words; a page signed with a test owner key as Ship makes it;
  cameIn signed, unsigned, changed (the card, Leave it out, Escape, Keep it anyway), and signed with a key no copy carries; Lector's
  library: each copy's check kept and marked, a changed copy left out and said so, one kept anyway, a copy from before 7.62 checked again;
  Fabrica's Bring one in, a changed page left out and a signed one brought in).

Ingenium 7.61 (21 November 2026): the practice studio; see the password as it is typed; the record brought up to this release.
- The practice studio (`build/modules/r350.js`, with its part in `build/boot/profiles_boot.js`). Her words (20 November 2026): "I want a
  practice page built into Ingenium or a Guest page built into the app that users are able to view when they are signed out of their
  account and want to show the app. Basically, I want the similar option as the Lakay app's "Practice Store" or some variation of that."
  Approved on twelve pictures (`previews/practice`: the scripts; the pictures stay out of the repository): "I approve of the previews,
  please commit and push it everywhere and continue working on my requests." Only where no one is signed in: Open the practice studio on
  the sign-in's card (after its note) and on Who is using Ingenium. Entered, the page starts again as a profile of its own kind (id
  `practice`, stores `@practice`, never in the list, no password, another person's profile so the full edition on her master copy and
  none of her parts), with invented sample work (three conversations, each reply marked a sample; Tide Clock's folder on Ingenia), the
  welcome door with its mark in place of the little lock, a strip on Home, a Practice studio key in the top bar, Start again and Leave in
  the Status panel. It ends when it is left or its window closes (sessionStorage `ing.practice.session`): its stores are taken away at
  the next start before anything opens them, and the computer app drops its files (`profile_drop("practice")`). Three guards, in the
  practice studio only, since it opens without a password: the device's shared names are never written (`SHARED_LS`), its shared
  databases are read-only and never deleted (`SHARED_DB`: a `readwrite` transaction opens `readonly`), and the computer app's calls that
  would change the device are refused before they reach it (`NOPR`: drives, models and engine, sharing and pairing, runs, training, the
  folder search's folders, the app's page, its sign-in key, signatures, the Cloud, the clipboard). Said plainly in the record: it is kept
  apart by the app, not by the browser; what keeps the owner's work closed is the seal, which it never opens.
- See the password as it is typed (`build/modules/r351.js`). Her words (20 November 2026): "I also want to be able to see the text of my
  password when I am typing it on the sign-in page the same way it is done on the Lakay app, please make the fix." As Lakay's "See the
  password": every password field carries a key at its right edge that shows and hides what is typed; the field keeps the focus and the
  caret stays at the end. In Ingenium's look: an eye in the field's quiet ink, no purple shading, never moving on the sign-in's door.
  While shown: marked secret (r318's Clear a copied secret still applies), never spell-checked, a password field again the moment its
  form is sent.
- Found by the practice studio's test on the gift edition, both older than this release: Sign out did nothing on a copy whose list of
  profiles had never been written (a full or gift copy with one profile; the master writes it at once with the owner's name): r344's
  reg() now starts one as r331 does, so the mark is kept and the copy is sealed and signed out. And in the full, gift and demo editions,
  after Lock now or Sign out, the Terms sheet (r326) waited behind the sign-in door and asked again once the desk opened: need() asks
  nothing while the desk is sealed. In those editions the databases' names carry the edition's prefix ("ing-gift:"), which the practice
  studio's read-only guard now sets aside to know the shared ones.
- The record of Ingenium's security, profiles and design (`docs/ingenium_record`, r345, the master's alone) brought up to 7.61: 7.56's
  underline rule, 7.57's disk seal names, 7.58's Ingenium itself signed and checked, the practice studio and its guards, the password
  key, what Carpe Diem (its own sign-in since its build 1086), Lakay (its own sign-in and practice store), Inkwell and The Forge (none)
  already have, a section on pages and sections, and each test's count.
- What is new (r222): three lines for every edition, one for the master's record.
- rig: `t_759_practice.js` (27 checks, with a stand-in computer app that records each call), `t_759_practice_app.py` (6 checks: the
  computer app's own side, its practice folder made, used and dropped, the owner's desk untouched), `t_759_peek.js` (15 checks).

Ingenium 7.60 (21 November 2026): your apps signed when shipped, part one.
The Security room's promise (modules/r318.js): "your owner key's signature on every package, the computer ones too, so a changed file is
caught and the app refuses to open and says so." Shown to her as eight pictures one by one at full size (`previews/app_sign`: the
script; the pictures stay out of the repository), and her word: "I approve of your preview, please commit and push it everywhere and
continue working on my requests."
- `build/modules/r349.js` (new; IngAppSign), in the master edition with her owner key on the device (PermitCore's own): every package
  Fabrica makes from an app's page carries her owner key's signature inside that page (`<meta name="ingenium-signature">`, over the page
  with that tag's content and the build tag `<meta name="ingenium-build">` left empty, as app_self_758.py reads Ingenium's page), so the
  one page, the APK, the IPA, the Mac and Windows apps and the kits all carry it. Her owner key's password is asked once, in a card of
  the room's own kind; the key is held two minutes after the last package, then dropped; Not now makes nothing. On a device without her
  owner key, or with one Ingenium does not carry, what she makes is made unsigned, and Ingenium says so. The web app, however it was
  made (r111's, or r178's from the app's templates or Ingenium's family, with r330's additions), also carries signature.ingsig (every
  file in it, signed together) and a check at the head of its service worker: when the worker is installed it compares every file with
  the signature; a changed or missing one, and the app is answered with a page that says which file, instead of opening (what it found is
  kept in the app's own IndexedDB, apart from its caches). The first visit, before the worker is installed, opens as the browser fetched
  it. Check a package reads a page or a web app's zip with the owner's public keys every copy carries (IngPermit.keys).
- `build/modules/r112.js`: the package's line says "and with your owner key" (or "not"), Check a package beside Package details, a
  Signed chip on each package made signed, the switch Signed with your owner key in Package details (kept with Keep these), and each page
  made says which package it is for (target), so the Ship card can mark it.
- `build/modules/r318.js`: Your apps signed when shipped asks IngAppSign for its state (On where her owner key is on the device, Off
  where it is not; Not yet outside the master) and for its words in Your code and apps. Not yet, said there: the Mac, Windows, Android
  and iPhone apps check the signature at every start (their shells are built on GitHub's machines), and an app brought into Ingenium's
  library is checked as it comes in.
- What is new (r222): two lines for the master, one where there is a Fabrica, one where there is none.
- rig: `t_760_app_sign.js` (a test key made by the page's own PermitCore: the card, a wrong password, the session, Not now, the Ship
  card's Signed, the signature checked apart from the page, a stamped build number, a changed word, off, no key on the device, the web
  app made, checked, served over http and opened through its service worker, and refused with one file changed, Check a package);
  `t_736_security.js`: Your apps signed when shipped is Off on a fresh copy, which holds no owner key.

Ingenium 7.59 (21 November 2026): the folder search's index sealed with the sign-in, one index per profile, in the Mac and Windows apps.
Approved on 20 November 2026 at the cost measured on a prototype (building about three times as long; the first vector search of a
session about 3.5 s, later ones 37 to 74 ms). Sealing it with the owner's key would have locked the other profiles out of their own
folder search; her choice between the ways (21 November 2026): "One index per profile".
- `rag/seal.js` (new): in the store worker only, it takes over the read, write, getSize and truncate of each OPFS access handle under
  SQLite's opfs-sahpool file system, so each file's data past the pool's 4,096-byte header is kept as a 64-byte head (INGRAGS1, the key's
  id, the plain size, a salt) and sectors of 4,096 plain bytes sealed with XChaCha20-Poly1305 (`@noble/ciphers` 2.4.0, `rag/vendor/noble`),
  the file's salt and the sector's number bound in. A plain file is sealed in place from its last sector to its first, a sealed one
  opened in place from its first; opened sectors are kept in the worker's memory (at most 192 MiB). Its errors (LOCKED, OTHER_KEY,
  SEAL_BROKEN) are kept for the worker to report, since the pool turns them into a bare I/O failure.
- `rag/store.worker.js`: the sealing is always loaded for OPFS, so a sealed index read without its key is refused as sealed and never
  taken for a damaged one (which the card would offer to start again); without the cipher a plain index still opens. `splitShared()`:
  the first open moves each other profile's folders, files, passages, FTS5 rows, vectors and cached vectors from `rag.sqlite3` into
  `rag-<id>.sqlite3`, with no key held, keeps a folder the owner shares, takes the rest out, then merges the word index and rebuilds the
  shared file (VACUUM), so no freed page keeps a moved passage (found by the test: deleted rows had stayed readable in free pages). New
  operations seal.key, seal.openAll, seal.state, profile.drop; info() says sealed and what the split did. The pool holds 32 files (was 12).
- `rag/main.js`: the index's name per profile; it opens with the profile's key when it has a sign-in (after the sign-in), seals the
  open index when the sign-in is turned on, and opens it again in place when it is turned off; IngRag.sealState() and dropProfile(id).
- `build/modules/r197.js`: IngLock.ragKey() (HKDF-SHA-256 from the data key, info "ingenium-rag 1", id the first 8 bytes of its SHA-256);
  turning the sign-in off waits for window.__ingBeforeOff before the lock record goes, and a refusal keeps protection on.
- `r340.js`: Settings, Security, The computer's disk says the index's true state, asked of the folder search; `r318.js` no longer lists
  it as planned. `r331.js`: removing a profile deletes its own index. What is new (r222): one line for every edition.
- `build/release.py`: seal.js among the folder search's files; RAG_VENDOR_SHA256 for the rebuilt rag-vendor.zip, which carries noble/.
- The record in Ingenium's folder: records 00, 01, 02, 04, 05, 06 (section 10, new), 09 and 10.
- rig: `t_759_rag_seal.js` (the store: the move, each profile's own, the seal read raw, no key, another key, a changed byte, opened and
  sealed again in place, a sealed shared index left alone, a removed profile's index) and `t_759_rag_page.js` (the page, with the folder
  bridge standing in: plain, sealed when the sign-in is turned on, after Lock now, opened again when it is turned off, and the room).
  `t_750_disk_page.js` brought up to the room's 7.59 words: the index is no longer named among what is still to come.

Ingenium 7.58 (20 November 2026): Ingenium itself, signed and checked, part one, in the Mac and Windows apps.
The Security room's promise (modules/r318.js, approved on the live preview of 18 November 2026): "each release signed with your owner
key, and checked by the computer apps ... before Ingenium opens: a copy changed by anyone else refuses to open, and says which file
changed." Where her owner key signs, her choice (20 November 2026): on her device, a "Sign this release" key in her master copy, so the
key never leaves it. Shown to her as six pictures one by one at full size (`previews/self_sign`: the script; the pictures stay out of
the repository), and her word: "I approve of your preview, please commit and push it everywhere and continue working on my requests."
- `build/desktop/app_self_758.py` (the Mac and Windows apps): at every start, before the window is made, the built page is read once:
  its SHA-256 and size, and the version and edition it names. The build number a device build stamps into its first
  `<meta name="ingenium-build">` (tools/stamp_build.py) is left out, as the release's own page has it empty, so the fingerprint is the one
  BUILD_INFO.txt lists and one signature serves every device build of the release; anything else in that tag is read as it is. The same
  reading gives the page's mark. Her signatures (`<the app's folder>/signatures/*.ingsig`) are checked with the owner's public keys the
  app carries (`_SELF_KEYS`) and its release (`_SELF_RELEASE`), both written in by release.py at every release: ECDSA P-256 with SHA-256
  over PermitCore's fixed order, the page's raw signature turned into DER for Python's cryptography. Signed: the page opens. Changed (a
  signature of hers names this app's release, and the page is not the one signed: a file differs, or it names another version or
  edition): the window opens on the app's own page, which says which file changed, what was signed and what is there now, with Show the
  file and Quit; nothing of the changed page runs, and the app's own address gives none of it (a reload, its parts, the window's page).
  Not signed: it opens, and Security says so. Her own page (6.19) is never refused. A fault in the check never keeps Ingenium closed. A
  refusal is kept (the last ten) for the room. Bridge: self_check, self_signature_put (kept only when it is hers and names this very
  copy), self_signature_get, self_reveal, self_quit.
- `build/modules/r348.js` (new) and `r318.js`: Settings, Security, Ingenium itself shows this copy (its version and edition, its build,
  its page's size and fingerprint) and its state; Sign this release (the master edition, with the owner's key on this device: her owner
  key's password asked in a card of the room's own kind; the release's fields signed with PermitCore's signWith and handed to the computer
  app, which checks and keeps them); Save the signature; Bring a signature in; Check it now; a refusal at an earlier start. Without a
  computer app (a browser, the iPhone, iPad and Fire apps) the room says Not yet. Its limits, said in the room: someone who can change the
  computer app itself, or take its signatures away, can stop the check (it then says Not signed yet); the iPhone, iPad and Fire apps
  check from a later release, and so does each release carrying her signature to the copies she gives.
- `build/release.py`: app_self_758 among the desktop patches; `self_stamp()` writes each computer app's release and keys at every release.
- What is new (r222): one line for every edition, one for the master's Sign this release.
- rig: `t_758_self_check.py` (the app's side with a test key: signed, changed, a stamped build, another version or edition, other keys
  and changed signatures refused, her own page never refused, the app's own address, the bridge, and each release app's own release and
  keys), `t_758_self_page.js` with `t_758_run_self.py` (the page signs in the browser with a key PermitCore made, the app checks it in
  Python, Node checks it again apart from both; saved, brought in, and a changed page refused by the app's own address).

Ingenium 7.57 (20 November 2026): repositories on a drive work again; Fabrica's plan, stage 3, part two, on a drive; submodules kept
in every version Fabrica makes, and shown in Files.
- Repositories on a drive, broken since 7.49, work again (`build/desktop/app_disk_fix_757.py`, applied after app_disk_750.py). 7.49's seal
  on the computer's disk (app_disk_749.py, then app_disk_750.py) took three names the drive's repositories had used since 6.86 and 6.87,
  each set later when the app starts, so the seal's won: `_DISK` (its table {key, kid, at} in place of the drive's {lock, open, work,
  size, sz, last}: every call on a drive repository failed with KeyError: 'lock'), `_disk_status()` (in place of the drive's
  `_disk_status(rid, repo)`) and `_disk_write(path, data, seal)` (in place of the drive's `_disk_write(rid, payload)`, which the bridge's
  disk_write calls). The seal's are named `_DISK_SEAL`, `_disk_seal_status()` and `_disk_seal_write()`, with every use; the drive's are
  as they were; app_disk_749.py and app_disk_750.py write the new names themselves. Found by the first drive test run on a 7.49 or later
  app; a scan of every function the app defines twice found no other pair whose arguments differ.
- Fabrica's plan, stage 3, part two, on a drive (`build/desktop/app_pick_757.py`; `modules/r280.js`, `r110.js`, `r342.js`). As git 2.43
  makes them, checked in the session against git itself:
  - a version brought in from another idea (git cherry-pick -x): the page makes the three-way merge (r110's, now shared through
    `IngRepo.core`: mergeTrees, treeFiles, commitOf, changesBetween, headOid) and r280 sends it (disk_pick); with no line changed both
    ways the computer app makes the version at once, the picked version's author and the author's time kept, git's own last line
    "(cherry picked from commit <id>)", one parent; with lines changed both ways it leaves the pick as git does (CHERRY_PICK_HEAD,
    MERGE_MSG with "# Conflicts:", git's marks, the index marked; no ORIG_HEAD, as git 2.43), which Keep this version ends as git
    cherry-pick --continue (one parent, the picked author and time) and Stop the merge stops as git cherry-pick --abort; a pick git itself
    left is read from MERGE_MSG;
  - changes put aside (git stash push --include-untracked): W, I and U in git's own words, refs/stash and its log as git writes them, the
    files and the index back to the version out, the new files git did not know taken away (in U); the list from refs/stash's log; back
    (apply and pop) merged in the page from W's and U's files onto the version out, written as git stash apply leaves it (not staged; a
    file changed both ways marked, the entry kept); drop by number (refs/stash and its log go with the last). dulwich 0.22.8's own
    stash_push is not git's ("A stash on <id>", its log line "commit:", the files left as they were), so it is not used.
  - r342 offers both on a drive repository with a folder of files (a bare one has no Changes); after a pick that stopped on lines
    changed both ways, the words box holds the version's words with git's line, as git offers them (here and in Ingenium's own
    repositories). Fabrica sends a chosen idea's branch to GitHub, never refs/stash.
- Submodules, stage 3, part two's last piece (the audit's recommendation 11, "Cherry-pick, stash and submodules", approved in full on 19
  November 2026). `build/modules/r110.js`: a repository's submodules (git's tree entries of mode 160000) were never files of the work, and
  every new version was written from the work alone, so a version kept in Ingenium on a repository with submodules dropped them (shown by
  rig/t_757_submodules.js on the first 7.57 page: after Fabrica's merge, kept version, branch of its own and rebase, git found lib gone from
  each). Now flatten() gathers them when asked, linksOf() reads a version's ({path: the version it stands at}, the last 64 trees kept),
  writeTrees() puts each back where no file or folder of files stands, and every version made keeps them: Keep this version (the
  parent's, or the merge's), a version kept on a branch of its own (the branch's), Put aside (the version out's, as git's W holds the
  index's); a merge, a squash, a version brought in, an undo and a rebase choose three ways (mergeLinks: the other side's where it changed
  one, else this side's), so a pick or an undo that changes only a submodule is a change. IngRepo.links(id, ref) reads them. A repository
  on a drive keeps its own through git's index, as before. `build/modules/r347.js` (new): in Files, each submodule in the folder shown is a
  row of the tree's own kind (.f-node): its name, then "another repository" and the short name of its version; pressed, the line under the
  tree says what it is, its address in .gitmodules and that every version Fabrica makes keeps it at that version. Shown to her as four
  pictures one by one at full size (`previews/submodules`: the scripts; the pictures stay out of the repository), and her word: "I approve
  of your preview, please continue working on my requests."
- What is new (r222): four lines where there is a Fabrica, and one where there is none (the disk seal's own names): t_626_guide with the
  gift edition found the first 7.57 page's newest line there was 7.56's, every line of 7.57 being Fabrica's.
- rig: `t_757_submodules.js` (a repository with a submodule made by git; brought in from git's bundle; kept, merged, undone, picked, kept on
  a branch of its own, put aside and rebased with Fabrica's engine; sent out as a bundle, cloned and read by git: every version keeps lib,
  at the version each step should leave it at; git fsck content), `t_757_drive_pick.py` (58 checks: the computer app, patched copies of the Mac and Windows apps, against git) and
  `t_757_drive_page.js` (the page bridged to the computer app by rig/run_app.py, each result read back with git).

Ingenium 7.56 (20 November 2026): purple words that can be pressed, the rest of them underlined.
Her rule (20 November 2026, kept in her ways of working since 7.54): "Purple words that can be pressed are underlined." 7.53's list in
`build/modules/r343.js` names the keys found then; a scan of 7.55's release page, every page by day and by night (elements one can press,
drawn as purple words with no fill, border or shadow, and no line), still found some without it: "Take the guided tour", the model names
on the Models page, and disclosures such as "About this model".
- `build/modules/r343.js`: the list stays; a finder gives the same line (.ing-ul: 1px, 3px under the words, their own colour) to any key
  or link drawn as bare purple words that no rule has lined, as it is drawn (a MutationObserver, before the page is painted) and again
  when the theme changes, so a key added later has it too. Nothing else changes: no colour, size, weight or motion. Left as the list
  leaves them: keys with a face, the strips' choices and tabs (aria-pressed, role tab), menus and their rows, chips, the left menu. Its
  cost, measured on 7.53's test build: about 0.3 ms for each update of a reply being written, nothing measurable when moving between pages.
- What is new (r222): one line, for every edition.
- rig: `t_756_underline.js` (22 checks: 7.53's keys and the ones it missed, by day and by night; the line's look and that nothing moves
  with it; a key drawn later; what is left as it is; every page by day and by night with no purple word key left bare).
- `previews/fabrica_stage3b/compose_cards.py`: one picture for each step of a preview, her rule (one by one, at full size, never one
  tall sheet).

Ingenium 7.55 (20 November 2026): the record of Ingenium's security, profiles and design, in Ingenium's folder.
- Her words (20 November 2026): "I want you to document the sign-in and sign-out functions of Ingenium and its entire security system and
  structure, as well as the different profiles and and data storage per profiles and everything associated with it into Ingenia's folders
  for Ingenium ... so that I can replicated them again later and add them to my other apps ... I want any local model or even frontier
  models that I am using to have that information available to them in the Folders from the Ingenia".
- `docs/ingenium_record/` (new): eleven Markdown files, written from 7.54's sources, each statement checked against the module it names:
  00 Read me first; 01 the security system at a glance; 02 the sign-in and the sealed desk; 03 Sign out; 04 profiles, and what each keeps
  apart; 05 where every piece of data lives; 06 the other protections; 07 how she likes to work, and how Ingenium looks; 08 carrying the
  sign-in, Sign out and profiles into another app (the order of the parts, the contract the app must keep, the names to choose, the steps,
  what went wrong in Ingenium, notes on Carpe Diem, Lakay, Inkwell and The Forge); 09 tests and checks; 10 words and functions. Each file's
  first line is its title, "# Ingenium record NN · …".
- `build/modules/r345.js` (new, the master's alone: `build/editions.py` leaves it out of every other edition, and `_OWNER_ONLY` keeps it
  out of another person's profile): in her master copy, in her own profile, once her desk is open, the record's files are put into
  Ingenium's folder on the Ingenia page (the folder r297 knows; made if there is none) as that folder's files (`ccPut`, in the larger
  store, sealed there while her sign-in is on), so every conversation in that folder carries them as a folder's files go. A file is
  replaced when the record changes, unless she changed her copy (hers stays; the new text goes beside it, dated); a file she removed comes
  back only when the record changes. No new part is drawn. `build/build_page.py` writes the files in (`/*R345_RECORD*/`), and stops the build
  if a file lacks its title or the record has fewer than eleven files; `rig/inject_modules.js` writes them into a test page the same way.
- What is new (r222): the record, for the master edition; the Project panel's close key, for every edition.
- The Project panel (the base page's own, which lists a folder's files): her words on its picture: "I don't see any way to
  close the Project panel", then "Leave the Project panel's Close and Save buttons below and add the scrolling function and scroll bar to
  the panel but hide the scroll bar from view", then "I did not see the Close and Save buttons since I only saw a picture and not a live
  interactive preview", and "On second thought, please still add the "x" button at the top of the panel so I don't always have to scroll
  all the way down in order to close the Project panel." The panel already scrolls (`#modalBox`, overflow-y auto) with its scroll bar
  hidden, to its own Cancel and Save, which stay at its foot. `build/modules/r346.js` (new) adds a close key at its top-right corner. Her
  word on its first picture, where the key floated over the panel's fields once scrolled: "It looks like the x button scrolls down on the
  panel and is not placed properly, please fix that and have it placed properly at the top of the page." So the panel's title and the
  key share a top that never scrolls (`.r346-head`), and the rest of the panel scrolls beneath it (`.r346-body`, its scroll bar hidden).
  The key is raised and round in the app's own key look (`--pop`, `--pop-hi`), lifting 2 pixels under the pointer, never tinted, with
  the key sound; it does what Cancel does. Only the Project panel is dressed so (found by its name field `#pjName`); any other panel
  drawn in the same box takes it as it always was.
- Tests on the release page (3646272cf3ac08a0, served on its own port and checked by its SHA-256): t_755_record 10/10, t_755_project_panel
  10/10, t_626_guide 27/27, t_736_security 14/14 (alone); on the same page before What is new's last line (only r222 differs): t_754_sign_out
  25/25, t_744_profiles 17/17, t_746_no_apps 4/4 and 22/22, t_754_ways_rule 7/7, and t_700_lock 58/58 (it now leaves the record's texts out
  of its own counts); the editions: t_627_editions 26/26, t_745_owner_free 21/21, t_745_to_full 15/15, t_746_no_apps 22/22, 19/19, 19/19,
  t_750_disk_page 12/12 and t_626_guide 27/27 with the gift edition. Earlier, on a test build (7.54's release page with r345 and r346 put in):
  `rig/t_755_record.js` 10/10 and `rig/t_755_project_panel.js` 10/10;
  `rig/t_745_owner_free.js` refuses the record and r345 in the other editions. Pictures of the folder: `previews/record` (the scripts;
  the pictures stay out of the repository).

Ingenium 7.54 (20 November 2026): Sign out; her rule on underlined purple words added to her ways of working.
- Sign out. Her words (20 November 2026): "I want to be able to log out of Ingenium and not only be able to login. I want to be able to
  sign out of my profile and out of the app and have my data and chats and evrything else sealed until I login again into Igenium."
  `build/modules/r344.js` (new): Sign out in the Status panel after Lock Ingenium, and beside Lock now in Settings (Security, and the
  sign-in's own card). It saves, seals and drops the keys as Lock now does (r197's two hooks, `__ingBeforeLock` and `__ingAfterOpen`,
  inert without it), and Ingenium starts again at Who is using Ingenium (r331's door), headed Signed out, until a profile signs in. Without
  a sign-in it says that nothing can be sealed yet and offers to turn the sign-in on. The documents of the apps carried on the Desk (their
  keys in this page's store) and Scriba's recordings (scriba_db) are now sealed with the desk's key when Ingenium locks or she signs out,
  and opened again at her sign-in before the door opens; the documents also when the page closes; in her own profile only. Shown to her as
  eight pictures one by one at full size (previews/sign_out), and her words: "There is something wrong with this screenshot, please fix
  it" (the fourth: the sign-in's card showed behind the profiles, and the Signed out line was violet though it cannot be pressed), then
  "I do approve of the other screenshots of the previews, please commit and push it everywhere and continue working on my requests."
  Fixed: the card waits out of sight while the profiles stand over it, and the line is in ink. The eighth picture, taken again as she
  would come to it (signed in, Night chosen, signed out), showed a day card on the night door: the page's own look is sealed with the
  desk, and only the sign-in door knows it is night. The profiles door over it, and its "Someone else? Choose a profile" key, now take
  r331's night colours (the same values) while that door stands by night. Found on the release page under load: the sign-in door is
  painted as r197 loads, Who is using Ingenium only once r344's part of the page has loaded, seconds later on a slow device, so the
  sign-in's card showed for a moment first. r197 now holds the card out of sight while the profiles' list says signed out (r344 takes
  over; should nothing take over within 12 s, the card shows). Out of build/held.json ("released_754").
- Her ways of working on the Ingenia page take a tenth rule (`build/modules/r327.js`): "Purple words that can be pressed are underlined",
  at her words (20 November 2026): "I want you to add the purple pressable words underlined to my rules in my way of working in the
  Ingenia page." Added once, at the end of her list, in her master copy and her own profile; not added twice, not added back if she
  removes it. `build/editions.py` leaves it out of every other edition (`var LATER=[];`).
- What is new (r222): Sign out for every edition; the Desk's documents sealed, and the rule, for the master edition.
- Tests on a test build (7.53's release page with r197, r327 and r344 put in): rig/t_754_sign_out.js 25/25 (with four checks by night, and one watching each frame for a flash of the sign-in card),
  rig/t_754_ways_rule.js 7/7, t_700_lock 58/58, t_744_profiles 17/17.

Ingenium 7.53 (20 November 2026): Fabrica's plan, stage 3, part two (cherry-pick, changes put aside); purple words that can be pressed,
underlined.
- Fabrica's plan, stage 3, part two (the audit's recommendation 11), built in the other session (Mini 41e10ea: modules/r342.js; the engine
  in r110.js: cherryPick, stashPush, stashList, stashApply, stashDrop; Rules before main in r285.js holding a picked version), shown to her
  as ten pictures one by one at full size (previews/fabrica_stage3b), and her word (20 November 2026): "I approve of your previews and
  recommendations, please commit and push them everywhere and continue working on the rest of my requests." Out of build/held.json now
  ("released_753"). On repositories kept in Ingenium; a repository on a drive and submodules come next.
- Purple words that can be pressed, underlined. Her words (20 November 2026): "On thing that annoys me is the purple clickable word
  buttons on Ingenium that do not have an underline, they look naked without being underlined when they are in purple and are clearly
  supposed to be clickable especially from your last preview and the rest of the app." `build/modules/r343.js` (new, a stylesheet only):
  a thin underline in the word's own colour, three pixels below it, on Lector's quiet keys, its compare toggle and Why this model;
  Fabrica's quiet keys, crumbs, the "more" under Needs you and its GitHub "more"; Home's quiet keys (See all); Vocatio's quiet keys;
  Folders' crumb key; the composer's lines under a chat; Show the whole message; the folder search's citations; Adamas's Hide and Show;
  the disclosures Thinking and the preview's own; the Security question's quiet key. Found by a scan of every page and each of its rooms,
  by day and by night, on 7.52's release page (pressable elements drawn as purple words with no fill, border or shadow, and no
  underline), by walking the guided tour, and by the rules that paint such keys violet over no fill. Left as they were, on purpose:
  keys with a fill, a border or a shadow; a strip's choices (Lector's "A job", Fabrica's "Ship"); the left menu's active row; the
  tour's chapter rows (only their number is violet). After it the scan finds only those. Nothing else of any part changes.
- What is new (r222): two lines (the underline everywhere; stage 3, part two where Fabrica is).
- Tests on a test build (7.52's release page with r110, r285, r222, r342 and r343 put in): rig/t_753_pick_aside.js 23/23, t_691_rules
  37/37, t_746_repo_work 18/18 (alone; one hover check missed under three tests at once), t_749_reviews 32/32, t_626_guide 27/27.

Ingenium 7.52 (20 November 2026): the Desk's five apps, the master's alone.
Her words (19 November 2026): "I do not want any of my apps built-in any editions outside of the master edition. Ingenium itself is not
exempt from that, I want it removed plus any other functions inside of it that give ownership accesss and capabilities for any of my apps
and mini app." Asked whether the mini apps were the Desk's five apps (Tabula, Abacus, Imago, Scriba, Fontes), which the full edition still
carried as she asked on 5 November, and whether they should stay or go, she answered (20 November 2026): "Yes for the mini app question."
- `build/editions.py`: carries_desk() is the master's alone. The five apps' own edits (their keys, routes, words; Home's instruments alone;
  nothing sent to an app the edition lacks) leave _public() for _no_desk(), which every edition but the master takes, the full edition
  now too; with three lines of What is new said without them (6.74, 6.49 and 6.56, which the full edition shows with Vocatio). Their
  modules r118, r123, r193 and r194 are left out of the full edition as of the gift and demo editions, and in the master page they are its
  owner's alone (build_page.py's _OWNER_ONLY), so another person's profile there never runs them. r231 rides in the master page too: it
  acts only where the Desk (or Fabrica) is missing, so in another person's profile there, never in hers.
- `build/build_page.py`: ING_HAS("desk") is true in the master alone; another person's profile on her master copy runs as the full edition.
- `build/modules/r147.js`: Home draws the five apps only where ING_HAS("desk"), else the instruments alone, under Your instruments (the
  editions' pages already said so; another person's profile now does too). `r108.js` and `r188.js`: Lector's and Vocatio's Open in Tabula
  only where ING_HAS("desk"). `r336.js` (another person's profile only): the Desk's sentences said as the other editions say them, and the
  keys that send something to the Desk's apps (Send to Tabula, To Tabula, My Tabula page, Blend's Tabula) and the Guide's tip on them
  taken away. Ingenium's own reference database (Fontes, the chat's My sources) and its model house (Scriba) stay in every edition.
- What is new (r222): one line, for the master edition.
- rig: `t_627_editions.js` expects the full edition without the five apps (its pages, its words: the same names the gift and demo
  editions may not show); `t_746_no_apps.js` has a fourth part, the Desk: in each edition and in another person's profile no key, tile,
  route, sending key or word of the five apps, and in her own profile all of them (the control).

Ingenium 7.51 (20 November 2026): Ask before each export.
Her security request (18 November 2026, 7.36) and the approved live preview (https://claude.ai/artifact/H4ieskf4TqQR7DXc6YSeAQ,
source/previews/security), More protection: "Ask before each export. A plain copy (a backup without its seal, a plain export of an app)
asks for your password first." (a switch, off in the preview). Her word (20 November 2026): "I approve of everything, please commit and
push it everywhere and continue working on my requests."
- `build/modules/r341.js` (new, window.IngExportAsk): every file Ingenium saves out of itself goes through window.saveFileNative (the
  base's own, queued by r137); this part stands in front of it. With the switch on and her sign-in on, a file that would leave unsealed
  waits for her password: the right one lets it go; a wrong one is refused; Cancel, Escape, or the page locking meanwhile keeps it,
  and the save answers that nothing was saved. A backup sealed whole (it begins "INGENIUM SEALED BACKUP 1", r143) and the recovery key
  file (r197 saves it only after asking her password) leave without the question. Files asked for while the question is open share
  its one answer; the next export asks again.
- `build/modules/r197.js`: IngLock.confirm(title, text, key), the lock's own password question over the open page, for a part that
  guards an action with it; true once the password is right, false when cancelled or when the question goes away.
- `build/modules/r318.js`: Settings, Security, More protection: Ask before each export is a switch, off until she turns it on; it needs
  her sign-in; turning it off asks for the password too, or anyone at the open page could undo it. It counts among the protections.
- What is new (r222): one line, in every edition.
- rig: `t_751_export_ask.js` (new, 19 checks: no sign-in, switch off and on, a wrong password, Cancel, Escape, the right password, two
  files at once, a sealed backup and the recovery key file, turning it off). `t_626_guide.js` ticks the terms gate's own box and agrees,
  as a person does, in the editions other than the master (it had stopped at the gate there since 7.41; 27/27 on the gift edition now).

Ingenium 7.50 (20 November 2026): sealed on the computer's disk, the second stage's first part: the records too, and texts for training.
Her answer for the computer's disk (18 November 2026): "All of them" sealed; her word (20 November 2026): "I approve of everything, please
commit and push it everywhere and continue working on my requests."
- Found on 7.49 by `rig/t_736_leak_hunt.js` (a real computer app, protection on, a mark written into everything, every file read raw): an
  app waiting for her devices was sealed, but the small record beside it (Ingenium/apps/outbox/<id>.json: its name, version, size and
  devices) was plain, and its file name began with the app's short name; a run's record (its name, its steps' commands, the values each
  step was given) stayed plain after the run ended; a run the app's closing cut short kept "running" in its record, so nothing of it was
  ever sealed. The 7.49 entry below says the apps waiting for her devices are sealed: their pages were, their names were not.
- `build/desktop/app_disk_750.py` (new, in release.py's list after app_disk_749): an app sent to her devices is kept under a name that says
  nothing (a, ten random hexadecimal digits, a dash, the time), its record sealed with its page; one kept before under its short name takes
  such a name when the sweep seals it; a newer version still replaces the one waiting, found by its sealed record. A device asking while the
  computer is locked is told so (423), when it lists, gets or says it got an app, never that nothing waits. A run's record is sealed when
  the run ends (the run's own thread seals it as it finishes); while it runs it stays plain (the run writes it at every step, and a run goes
  on when Ingenium locks); a run the app's closing cut short counts as ended. Locked, Fabrica's list says how many it could not read, and
  a paired device asking about its runs is told the computer is locked (423). Texts for training: a text handed over and left for a
  quarter of an hour (models/training-in/incoming.txt) is sealed, and so are the text and the plan of a training cut short
  (models/training/<id>/text.txt, plan.json); a training and a measurement open their text first and read it plain while they run; a
  piece added to a sealed text opens it first; nothing in use is ever sealed, and Open everything again opens a sealed text even while a
  training runs. The trained models and their checkpoints are model files, kept readable on purpose.
- Found while testing it, before any release: Open everything again (her sign-in turned off) left a training's sealed text sealed if a
  training was running at that moment, so it could never be opened again; a sealed text is now always opened.
- `build/modules/r340.js`: Settings, Security, The computer's disk names what the computer app itself reports it seals (disk_status's
  kinds), so a computer app of 7.49 is never said to seal more than it does; a copy without a computer app names what this release's
  apps seal. An edition without Fabrica (gift, demo) sends no app to the devices (r316 is Fabrica's), so it names texts for training only,
  and only the model files as kept readable. Found: 7.49's room wrote "fabrica's runs" in the middle of a sentence; only the first letter
  of a phrase that is not a name is lowered now.
- What is new (r222): a line where Fabrica is, and one where it is not (a new tag, "nofabrica", as "nocareer").
- rig: `t_750_disk_more.py` (new, 35 checks, on a copy of the real computer app, Mac and Windows alike), `t_750_disk_page.js` (new, 12
  checks: no computer app, a computer app of 7.50 and of 7.49, an edition without Fabrica).

Ingenium 7.49 (20 November 2026): Fabrica's plan, stage 3, part one (reviewers, code owners, suggested changes); sealed on the computer's
disk, first stage.
Fabrica's plan, stage 3, part one: the audit's recommendations 9 and 10 (approved in full, 19 November 2026: "I want them all implemented
into Ingenium in the proposed order"), built in the other session as `build/modules/r339.js` and held for her preview; shown to her as
pictures of the running app (14 steps, source/previews/fabrica_stage3; their rings drawn in Ingenium's violet, not gold, at her rule), and
her word (20 November 2026): "I approve of everything, please commit and push it everywhere and continue working on my requests."
- Reviewers: a third chip beside People and Milestone asks a person known in the repository, someone else, or her own model for a review;
  each one asked has a pill with what they did since (waiting, approved, asked for changes, commented), which asks again or no longer.
  Her model's review is written by it and kept as a comment: a model never approves.
- Code owners: the CODEOWNERS file of the pull request's base is read as GitHub reads it (GitHub's own documentation read at its source,
  github/docs at 16d03dd): .github/CODEOWNERS, then CODEOWNERS, then docs/CODEOWNERS; the last matching line names the owners. The owners
  of the files a pull request changes are asked for a review, each with the line that named them; the merge box says who owns what and
  whether one has approved. Nothing is held back by it, as on GitHub without its own rule.
- Suggested changes: a comment on a line offers Suggest a change; Commit suggestion, or Add suggestion to batch and Commit suggestions as
  one version naming who suggested each; a suggestion whose line has changed since is out of date and never applied. A suggestion made on
  GitHub's site arrives as an ordinary comment (GitHub's exact text for one was not in the pages read).
- What is new (r222): three lines, where Fabrica is. held.json: released_749.
- rig: `t_749_reviews.js` (32 checks).
Her security request (18 November 2026, in source/README.md, 7.36) and her answer for the computer's disk: "All of them" sealed; the
approved live preview (https://claude.ai/artifact/H4ieskf4TqQR7DXc6YSeAQ, source/previews/security): "While you are signed in, the computer
app holds the key in its memory only, and drops it when Ingenium locks. A run still runs on plain files while it runs; its files are sealed
when it ends." Kept readable on purpose: an app served for the Home Screen and the model files. The Security room still said "Planned for
7.40: the computer apps need an encryption library they do not carry yet"; they have carried it (cryptography) since 7.37.
- `build/desktop/app_disk_749.py` (new, in release.py's list for the Mac and Windows apps): the key held in memory only (disk_key_hold,
  disk_key_drop); a sealed file is "INGSEAL1", the key's id, a nonce prefix, then the plain bytes in chunks of 1 MiB, each sealed with
  AES-256-GCM (its number and whether it is the last bound in, so a file cut short, reordered or changed by a byte is refused), so a part
  is read without opening the rest. Sealed: the apps waiting for her devices (as they are written; a device asking while the computer is
  locked is told so, 423), Fabrica's runs (each job's log and every file a run kept, when the run ends; its record, its name, state and
  times, stays readable so the list shows) and the copies of runs made on her other computers (a copy still arriving waits a quarter of an
  hour, unless she asks). disk_status, disk_seal_now (Seal them now), disk_unseal_all (her sign-in turned off).
- `build/modules/r197.js`: IngLock.diskKey (HKDF-SHA-256 from the data key, info "ingenium-disk 1"; never the password or the data key
  itself), with the key's id; an "ing-keys" event when the keys are held and dropped, and before Lock now sends the page to its door.
- `build/modules/r340.js` (new, IngDiskSeal): hands the key to the computer app while she is signed in and drops it when Ingenium locks
  (a page opened locked drops any key left behind); when she turns her sign-in off, everything sealed is opened again first.
- `build/modules/r318.js`: Security, The computer's disk shows its true state (On, Off, or a copy without a computer app), what is sealed,
  how many files, Seal them now, and what is not sealed yet: Fabrica apps kept on a drive, the folder search's index and texts for
  training (the next stage). Its overview no longer names a release that has passed.
- Found on the test build, before any release: with no computer app (a browser, the Fire tablet, the iPhone), the room asked r340 for
  its words as it painted, r340 asked the absent app for its count, and the answer painted the room again, a loop of promises that
  never let the page finish loading. r340 asks only where there is a computer app, at most every four seconds, and paints the room again
  only when the answer changed.
- What is new (r222): one line, where Fabrica is.
- rig: `t_749_disk_app.py` (new, 19 checks, a copy of the real computer app: a waiting app sealed and opened for a device, a run sealed
  when it ends and read in parts across chunks, locked, a changed byte and another key refused, a copy added to after sealing, everything
  opened again); `t_749_disk_page.js` (new, 15 checks: first a page with no computer app at all, which starts and says so; then a stand-in computer app recording each call: no key without a sign-in, the key
  handed over when protected and not the password, dropped on Lock now before the page goes to its door, the same key back after signing
  in, dropped by a page opened locked, Seal them now, and everything opened again before the key is dropped when protection is turned off).

Ingenium 7.48 (20 November 2026): Fabrica's plan, stage 2, one ecosystem; the profile key inside the Status panel.

Her word on its pictures (19 November 2026): "I approve of the preview, please commit and push it everywhere" (the audit's recommendations
5 to 7, approved in full the same day). Its first preview, a live page made of whole captured pages, "is glitching and makes no sense to me":
the new parts were off screen and live parts came out blank; it was replaced by pictures of the real app, the new part ringed, one sentence
each (`previews/fabrica_stage2`: capture_pics.js, compose_pics.py).

- `build/modules/r337.js`: a Code session on an app works with that app's folder (the folder of the same name): its notes go with every turn
  (r208's chatSystemPrompt asks `IngCodeFolder`), and Its folder stands in Code's top row (#ccCodeBar), or Make its folder where there is
  none. The folder shows its repository in Fabrica (the branch it is on, its newest version, the open pull requests, the last run of the
  checks) with All in one place, Open in Fabrica and Open in Code (r208 asks `IngFolderFab.card`); Fabrica writes a dated line under the
  folder's Where we left off when a pull request is merged or closed, a release is made (a tag) or the checks fail, and the lines go to the
  model with the folder's notes (`IngFolderFab.lines`, `.left`). All in one place, on Fabrica's own sheet (r333's, now shared as
  `IngRepoWork.ui`): where we left off, its repository, its releases, its conversations, and Open the folder, Open in Fabrica, Open in
  Adamas (r138's `bdOpenRepo`), Open in Code; reached from the folder's head, Fabrica's app page, Code, Chat (its top row, beside Controls)
  and Adamas. In the gift and demo editions, which have no Fabrica, only the folder in Code is kept.
  `rig/t_748_ecosystem.js` 15/15.
- The profile key inside the Status panel. Her words (20 November 2026): "please remove the profile toggle from the side navigation bar,
  instead put it inside of the Status panel on the top bar since it makes the most sense and cleanly removes it from messing with the
  design and template of the app"; on its pictures: "I approve of the preview, please commit and push it everywhere". `build/modules/r338.js`:
  the left menu shows no profile key (r331's #profKey stays in the page, out of sight); the Status panel (openPresenceMenu) ends with Who
  is using Ingenium, each profile a row of the panel's own kind (data-who) with r331's round tile, then Lock Ingenium (#r338Lock) and, in
  her own profile, Manage profiles (#r338Manage); each row is pressed in r331's own menu, so it does what that row does. `rig/t_744_profiles.js`
  and `rig/t_746_film_key.js` reach the profiles through the Status panel now.

Ingenium 7.47 (19 November 2026): Code's start window in Vocatio's drop zone, flat until the pointer is on it.
Her words (19 November 2026), with a picture of Vocatio's "Drop your files here" and one of Code's start window: "I want you to give the
new Code panel for Fabrica the same raised 3D effect as the "Drop your files" section of the Vocatio page, it looks that much better than
the 3d button cards." On its live preview (https://claude.ai/artifact/KqvAsVp9Q87ZtDvYhbKCZz, source/previews/code_raised: the start window
and the drop zone taken out of the running 7.46 page): "I approve of the preview but I only want the area to be raised when I hover over
it, it can be flat on rest mode. Please commit and push it everywhere."
- `build/modules/r335.js` (held in 7.46, out of build/held.json now): each card of Code's start window (New app, From GitHub, From Fabrica,
  Open an app file, Open a folder, Your apps) takes the drop zone's own values (modules/r283.js #cs .cn-drop, modules/r188.js's tokens): the
  dashed lilac edge, the lilac light falling from the top, the rounder corners; flat at rest, as the drop zone is (the preview had them
  raised at rest; changed at her word); under the pointer it lifts two pixels with the drop zone's shadow and spring, and pressed it
  sinks. By night the drop zone's night edge and light, with dark shadows. Each card keeps its words, their type and their order.
  Minimal or reduced motion keeps them still.
- What is new (r222): one line where Vocatio is (tag career), and one without its name in the editions without it (nocareer).
- rig: `t_747_code_raised.js` (new, 12 checks).

Ingenium 7.46 (19 November 2026): no film behind a panel or a popup, the profile key in the left menu, Fabrica's stage 1, and none of her apps
outside her own profile of the master edition.

Her words (19 November 2026): "Please remove the weird film that covers the background when a panel or popup is opened, I don't like how
it looks. I have made similar requests in the past regarding Fabrica, please make the fix. I also want the profile toggle entirely removed
from Ingenium's top header area, it looks hideous and I hate how it is destroying the look of the app, put it somewhere else more
appropriate." And: "Do not change anything that I haven't asked you to change, only do as you are told."

- `build/modules/r334.js`: every layer laid over the whole window behind a panel or a popup with a tint or a blur (found in the running
  page: #modalRoot, #secAsk, .ing-dlg-root, .r172-scrim, .chat-drawer-scrim, .r2-scrim, .schedae-back, .cust-back, .tour-menu-back,
  Fabrica's .f-sheet-wrap and .hb-wrap, Folders' .fd-bwrap, .r315-veil, .sl-veil, .dp-veil, .tg-veil, #lxRx, #ingSoundChoices, #profDoor)
  keeps its place, so a press outside still closes the sheet, and loses its tint and blur. The panels themselves keep their own look; the
  welcome door's glass and the sign-in door are doors and stay as they were.
- `build/modules/r331.js`: the profile key is the last row of the left menu (nav.dock, one of its own nav-btn rows: the profile's tile
  where a row's icon sits, its name, a small chevron), pinned to its foot; under the pointer it lifts, with no violet wash (her rule); its
  menu (version 3's) opens above it. Nothing of it is left in the top bar. `rig/t_744_profiles.js` checks it there; `rig/t_746_film_key.js`.
- Fabrica's plan, stage 1 (recommendations 1 to 4 of the audit), approved on its preview drawn with Fabrica's own parts ("I approve of the
  new previews from your pictures, please commit and push it everywhere"): `build/modules/r333.js` (window.IngRepoWork). A repository, in
  Code's start window and Chat's + menu (Fabrica's apps, and GitHub when signed in); Code on a Fabrica app from the branch she chooses, its
  work kept on a branch of its own (`IngRepo.commitTo` in r110; for a repository on a drive, r280's ROUTE.commitTo and
  `desktop/app_session_746.py`, the folder never touched); Review and keep in Fabrica's own sheet and Changes view (Fabrica's rules taken
  for a frame of the same kind, .fbx); Create pull request in Fabrica (`fbHub.newPull` in r141), waiting for her yes; Update from
  Fabrica; the model's tools fabrica_status, fabrica_diff, keep_version, fabrica_pull_request; Chat reads a repository (repo_files,
  repo_read) and Continue in Code changes it. Code's start cards and Chat's + menu rows raised and lifting, no violet wash.
  Found before release: the sheet's copy of Fabrica's rules split each selector at every comma, so Fabrica's "#fb :is(li,div):has(> .m)"
  (r315) came out with an open bracket that swallowed 150 of the 1,377 copied rules, the sheet's own frame among them, and the sheet lay
  at the foot of the page instead of over it; the tests passed because a test browser scrolls to what it presses. Now selectors are
  split only at their own commas, the frame has a style of its own, and `rig/t_746_repo_work.js` checks the sheet lies over the window.
  `rig/t_746_repo_work.js` 18/18, `rig/t_746_session_app.py` 15/15.
- None of her apps outside her own profile of the master edition. Her words (19 November 2026): "Ingenium is still built into the app library
  for the full edition, this is unacceptable. I do not want any of my apps built-in any editions outside of the master edition. Ingenium
  itself is not exempt from that ... They should be starting the app fresh as a new user and none of my apps (Ingenium included) should be
  coming up on there unless I upload them on there. If they aren't me then Ingenium or any of them should [not] show up on the "Your apps"
  section in Fabrica. For some reason Carpe Diem and Inkwell are showing up on the Folders page in the "Your apps" section, the same for the
  chat pages and any other pages with that issue on Ingenium."
  Found, in the running pages: the full edition kept a copy of its own page in the app library on first start (r120's keepSelf, "Lector and
  the app library know Ingenium alone" since 6.27), so Ingenium was listed on Home, in Fabrica, Lector and the chat's + menu; that menu's
  One of your apps named "Carpe Diem, the Forge, Inkwell, Ingenium" while the library was empty; Folders' Your apps offered the projects a
  CV names and the apps Lector read, which, for work brought in from the master (7.45), are hers; and another person's profile on her
  master copy (R331, meant to be the full edition) showed her four apps on Home's plaque, in Lector, Code's start window and the + menu.
  Now: `modules/r120.js` keeps nothing outside the master, itself included; `editions.py` `_full_apps`: LIB_KEYS and Lector's ORDER empty;
  `modules/r240.js`: Lakay listed by name in the master only; `modules/r208.js`: outside the master, Folders offers only the apps added in
  that copy (its library and Fabrica), with words for each edition; `build_page.py`: the + menu names her apps in her own profile only
  (and `editions.py` takes those words out of the other editions); `modules/r108.js` (Lector's list), `modules/r147.js` (Home's plaque:
  Ingenium's seal and name) and `modules/r222.js` (What is new: no line naming her apps) in another person's profile; `modules/r336.js`
  (`editions.GUEST_ONLY`, left out of the other editions, never owner-only): in another person's profile, the library knows no app by
  name and every sentence that names her apps is said as the full edition says it, never in what the person writes. A page the person adds
  is listed, whatever app it is (modules/r240.js). Her own work brought into the full edition stays hers (7.45); only her apps' lists go.
  `rig/t_746_no_apps.js`: a fresh start, work brought in from the master, and a page added, on each edition and in another person's profile,
  with her own profile as the control.
- Held for her preview: `build/modules/r335.js`, Code's start window in Vocatio's raised drop zone (her words: "give the new Code panel for
  Fabrica the same raised 3D effect as the "Drop your files" section of the Vocatio page"): the drop zone's own values (r283, r188's tokens)
  on each card, by day and by night (held.json "held_747").

Ingenium 7.45 (19 November 2026): the full edition without the owner's material, bringing in the master's work, and the editions' Windows installers.

Her words (19 November 2026): "I want to be able to download and install the Gift and Full editions of Ingenium on my HP Windows computer";
"I will only have one edition per device"; "I don't want my data and my past chats to be lost when I replace my master edition of
Ingenium with the new Full edition on my HP laptop ... Please allow for my data to be transferred to this new one and then you can seal
everything and keep everything after"; and "I also really want the Full edition to be rid of my information and all of my apps and be a
real full version of Ingenium but without my Author access and owner administrative functions".

- Found: the full, gift and demo editions of 7.44 and before carried, in their text, her DPhil plan (modules/r323.js, from 7.40), her own
  list of ways of working (r327's HERS, seeded in the master alone but carried) and her own devices named in Fabrica's, the Cloud's and the
  lending's words. rig/t_627_editions reads what the pages show, so it did not see them. Now `editions.py`: r323 is the master's alone
  (`skip_modules`), and `_no_owner_material` empties HERS and says her devices as anyone's in every edition but the master; the 7.40 news
  line of the DPhil plan is marked "master". `rig/t_745_owner_free.js` reads each edition's whole text and refuses her plan, her ways, her
  devices, the master's own parts, and her name outside authorship, copyright and the licence; it reports her other apps' names left in
  code that cannot run in that edition (95 in the full edition), for the next pass.
- Bringing in the master's work (`modules/r332.js`, window.IngCarry; `storage_shim.py`): the full edition keeps its stores under "ing-full:"
  (6.8.1), so on a device where the master kept her work at the same address (the computer apps serve every edition from one address) it
  opened empty beside it. Now it asks once, on the Security room's own first-start sheet (r318's look): Bring it in, or Start empty. Bring it
  in sets "ing.carry.v1" to "adopt" and opens again; from then on the full edition's store script passes the master's names through as the
  master does, so nothing is copied and nothing can be half copied, and sealed work stays sealed with the same sign-in. Where it was not
  sealed, the Security room's Protect your work first asks at the next start. Not asked in another person's profile, in a fresh copy, or
  where this copy has work of its own. `rig/t_745_to_full.js`.
- The Windows build (Ingenium-HPWindows, `.github/workflows/build-windows.yml`, `tools/get_editions.py`) also makes Ingenium-Full-Setup.exe
  (Ingenium itself: the same name, program folder, data folder and id, so it replaces the master edition in place) and
  Ingenium-Gift-Setup.exe (its own data folder and id, IngeniumGift, so it never opens an owner's work). The pages come from this
  repository's editions/ at the same branch, each checked against the fingerprint editions/README.txt lists. Push the page commit and the
  editions commit separately: a push whose last commit says [skip ci] starts no build (7.44's Mac mini build was started by hand for this).

Ingenium 7.44 (19 November 2026): local profiles.

Her words (14 November 2026), on my recommendations: "I am saying yes to your recommendations, please proceed": a profile key in the top bar
beside the seal, managed in Settings; the owner decides for each profile whether it needs a password (hers always, while the sign-in is on);
kept apart for each person: conversations and memory, folders and the folder search, Lector and Vocatio records and Folders' notes, Display
and sounds, connections and their keys; shared: the models. On the live preview (https://claude.ai/artifact/B3SYtEftUUgisz6kAuSNAE,
previews/profiles): "I approve of the preview ... Just add it to the damn app and let's move on. Put the drop down menu of version 3 of the
preview and let's move on!"

- `build/boot/profiles_boot.js`, the first script of the page (`build_page.py`, before any script reads a store). The owner's profile keeps
  every name the page has always used, so nothing of hers moves. In another person's profile every localStorage key and sessionStorage key
  and every IndexedDB database the page names carries "@" and its id (`ingenium_v4@p1abc`), so its desk, its sign-in (r197's lock record and
  data key), its long texts, keys, apps, Fabrica and build library are its own from the first read. Shared by the device: the list of
  profiles (`ingenium_profiles`), the models' record (`ingenium_models_shared`), the models' files and the engine (`ingenium_files`), the
  pairing (`ingenium_seal`), the training lab's models, the graphics measure and the device's security settings. In the owner's profile the
  other profiles' stores are not listed (a backup or the Storage page never sweeps them up). Every call into the computer app waits, once,
  until the app holds this profile (`profile_current`, `profile_use`); in another person's profile an app older than profiles is not used.
- In another person's profile the master copy is the full edition, as she defined it for another person: Lector, Vocatio and Fabrica, but
  not the Author Studio, her owner key, her rules, her terms or her built-in apps (`ING_EDITION` is "full" there). The ten modules the full
  edition leaves out (`editions.skip_modules`) are kept as text in the master page and run in her own profile only (`build_page.py`
  `_owner_only`: each script is run by the small script after it, in its place, so the page reads in the same order as before for her).
  `r120.js`: none of her built-in apps; `r110.js`: a repository has no author until one is set; `r136.js` (and `editions.py`'s match): a
  signing key names that person, never her.
- `build/modules/r331.js` (window.IngProfiles): the key beside the seal (version 3's: a raised pill, the profile's pastel tile, its name, a
  chevron) and its menu (Who is using Ingenium, each profile with its tile, how it opens and In use; Lock Ingenium and Manage profiles), with
  Ingenium's own sounds (r176's keys widened to these, a card lifting as the menu opens, keeping when a profile is added). Profiles on this
  device in Settings, Security (with Everything and This device; `r173.js` names `profCard`): the profiles, how each opens, Remove; Add a
  profile, only with the owner's sign-in on; What each profile keeps apart; Said plainly. Moving to another profile saves everything, tells
  the computer app, and opens Ingenium again in that profile, so nothing of one session is left for the next. A profile with its own
  password asks that person to choose it the first time it opens (r197's own door, `IngLock.setup(o)` now takes a way back), and shows them
  its ten words, so nobody else can open it, the owner included; it is then marked sealed. Lock Ingenium: a profile with a sign-in locks as
  the sign-in does, and the sign-in's door offers Someone else? Choose a profile; one without opens the door Who is using Ingenium. Removing
  a profile takes its stores, its folders on the computer's disk and its folders in the folder search. The models' record is kept once
  for the device and read into each profile's desk. One change from the preview, said to her: the person, not the owner, chooses a
  profile's password, so the profile is sealed even from the owner.
- The folder search (`rag/main.js`, `r257.js`): each profile is its own reader, "p:" and its id; hers stays "me". The search applies who may
  read each folder inside both searches (rag/retriever.js), so another profile's passages never reach an answer.
- `build/desktop/app_profiles_744.py` (registered in `release.py`; Mini, Intel, Windows): `profile_current`, `profile_use`, `profile_drop` on
  both bridges; in another person's profile the desk (with its kept copies and long texts beside it), the keys box, Fabrica's hub, drives,
  second copy and runs, the apps waiting for devices, the pages and the training texts each live in `profiles/<id>/` beside the owner's;
  `profile_current.json` beside the models keeps the profile across restarts; Claude Code's sessions and Ollama's chats on the computer are
  found empty; the app's own sign-in key is named for the profile. The models, the engine, the speech models, the pairing, the window and
  the folder search's list of chosen folders stay shared.
- Not yet: the files Ingenium keeps in the browser's private file system (the folder search's index, model caches) are shared, as before,
  and the folder search's passages are read only through each profile's own permissions; the model files' store (`ingenium_files`) also
  holds files added to chats, reachable only from the profile that added them. Sealing those apart is Security's next stage.
- Tests: `rig/t_744_profiles.js` (18 checks, Chromium, invented people: the key and its menu, the owner's sign-in before Add, a profile without
  a password kept apart and in the full edition, back to the owner, a profile choosing its own password, Lock Ingenium and Someone else, a
  profile removed with its stores); `rig/t_744_profiles_app.py` (17 checks, the computer app's side on a copy of `ingenium_app.py`).

Ingenium 7.43 (18 November 2026): Fabrica's next pass.

Her approval of the live preview (https://claude.ai/artifact/2aHjSvn6yc7JSusyQn3aqo, previews/fabrica_next): "I approve of the Fabrica Next
Pass preview, please commit and push it everywhere." Measured before building: reviews that ask for changes (r141) and Rules before main
(r285) were there already, off until turned on; the preview showed them as new, and this was said to her.

- build/modules/r330.js (window.IngFabNext; window.IngShipExtra):
  - her apps (master copy): the checks on every version kept, and main waits for the checks and her approval, from the start, where she
    has never set them (r141's record, as it is first read);
  - Offline and in-house, beside Safety in Care, Checks: what the version would load or call from outside itself, by file and line;
    plain links and the device's own addresses are not counted; kept as a note on the version;
  - Your ways of working, measured (master copy): the version runs in a sandboxed quiet window and a probe reads its own styles and
    layout: keys and cards that answer the pointer, scroll bars in view, long wide buttons (over 320 px and six times as wide as tall),
    a purple shade under the pointer, a night look, motion reduced, a focus ring. It does not move a pointer: hover is read from the
    styles. Refined and understated are not measured;
  - Release notes kept with each release (a note on the version), in Releases;
  - this app's terms (master copy, Care, Settings): its name, owner, contact and what it keeps; the Terms of use (7 sections) and the
    Privacy notice (5), each to rewrite; Ask on first open. A starting point, not legal advice.
- Every web app package (r111's own, or r178's from her apps' family, which replaces r111's when her templates are here): r330 wraps
  IngShip.webApp, opens the finished zip, adds NOTES.txt, TERMS.txt and PRIVACY.txt, puts the sheet in the main page when asked, and
  zips it again; her app's own terms also stand in a kit's TERMS.md. The one-page package and the device packages do not carry them yet.
- r141: the defaults (once for each app, marked rec.r330, because the record is normalised with auto false), the two checks and the
  terms, by their hooks. r298: the notes on each release card.
- rig/t_743_fabrica.js.

Ingenium 7.42 (18 November 2026): who serves your models, your computers in your order.

Her answer (18 November 2026): "I want the Mac mini as the default with the 2 TB drive but also if its not available or near, I want to use
the HP 16GB laptops." Her approval of the live preview (https://claude.ai/artifact/9YgFwK1uKce3NXHgD4xRzt, previews/model_server): "I approve
of the preview, please commit and push it everywhere and continue working on my requests."

- build/modules/r328.js (window.IngServe), in Settings, Models and AI, Your devices, after the pairing card (#srvCard; r234 and r173 name
  it): her paired computers in her order (state.lend.order; one not in it yet comes after, a computer without a screen, such as the Mac mini,
  first among them), each with its state (On, Looking, Away), its models, Your default on the first and Serves your models now on the one in
  use; Move up and Move down; a switch, The first that answers serves your models (state.lend.autoServe, on); Ask them now; Use the first
  that answers; and, folded, Drives, flash drives and memory (a drive adds room for models, not memory).
- Before a message, with the switch on and two or more computers paired: every computer is asked at once (r274's check, at the addresses
  it gave); the first in her order that answers serves, keeping the model she chose (IngLend.use); when none answers there, they are looked
  for on the Wi-Fi, one by one, by the apps that can. The answer then carries a line, "Answered by Mac mini." or "Answered by HP laptop:
  Mac mini was away." (msgNode wrapped; the message keeps it as srv). Off: as before (r274), the chosen computer answers.
- Not measured: how long a computer that is switched off or out of reach takes to count as away on her own network (each address waits up
  to 4 s, as in r274; a computer that refuses the connection counts at once).
- rig/t_742_serve.js: two stand-in computers (rig/lend681_mock.py); 16 checks.

Troubleshoot, the Author Studio's first room (the master edition only). Her approval of the live preview
(https://claude.ai/artifact/Fw3N7GZMX2JE1ShEjWi7Cn, previews/troubleshoot): "I approve of everything from the Author Studio except for the
the white acrylic button look of the navigation bar, please fix it and then commit and push it everywhere."

- build/modules/r329.js (window.IngTrouble; editions.py keeps it to the master): Check everything (r226's own check, as before, and the
  checks added: the graphics mode Adamas chose, with its crash mark as it stood at the start; at rest; this device's memory as the browser
  rounds it; who serves your models; sealed between your devices; the model settings record, any value refused in the last seven days),
  in four groups with an analogue gauge; each line unfolds to say why and what to do, with Ask a model about this (r226's fix); what went
  wrong (r226's error list, newest first); say it in your own words, with what she ticks. Keys click with IngSound "keys".
- r236: Troubleshoot first in the rail (marked New); Checks and additions becomes Additions (your layers and your page; the check and the
  errors are hidden there, shown in Troubleshoot). The rail: the chosen room pressed into the rail, no white key; under the pointer a room
  glides and its icon tilts, with no purple shade (the rule she gave earlier, which the old hover broke).
- rig/t_742_trouble.js: 13 checks.

Her two changes (18 November 2026): "I want you to remove the controls button from next to the Lector and Ingenia page titles and place them
in their appropriate places" and "move the second stone from the Vesta page on Day mode to the last position and move the third stone and
the others up a stone that way it looks from darkest to lightest".

- r325: Lector's key after Add your apps, Ingenia's after Bring in your work, in the row of each page's own keys, as Fabrica's after Bring
  one in (rig/t_741.js checks it).
- r291: by day the darker purple stone first, the lilac stones next, the pearl stone last.

Ingenium 7.41 (18 November 2026): the controls key; agreeing to the terms, in full; your ways of working.

Her approval of the live preview (https://claude.ai/artifact/S7Rwqc72usWw7Ly138jeSz, previews/v741), with her changes: "I approve of the
preview, please commit and push it everywhere. I also want the full version of the Terms and Conditions to be shown when I click the button
to see it and not only see the short version. It is very important that every user is able to read the full Terms and Conditions to
properly agree or decline. The 'Where They Apply' section is flat and stiff, please fix that. Please put the controls button next to the
Learn button on the Vocatio page. You can put it next to the 'Bring one in' button on the Fabrica page."
- `build/modules/r325.js` (new, window.IngModelKey): one small round key (a slider's mark) for Reply, Memory and Effort: beside Vocatio's
  Learn tab, beside Fabrica's Bring one in, beside Lector's and Ingenia's titles; it opens r321's sheet for that page's model (a page with no
  model of its own: Chat's). Chat keeps its own Controls key. `r321.js`: a round key keeps its mark; its title says the numbers.
- `build/modules/r326.js` (new, window.IngTermsGate): a copy that is not her master copy and has not agreed to this version of the terms
  is asked once the welcome door has opened (or at start where it is skipped): In short, the full Terms of use (all ten sections) and the
  full Privacy notice (all eight), a tick and I agree, or Decline (Ingenium stays closed; nothing changed or sent; the terms can be read
  again). Nothing behind the sheet can be reached; Escape does not close it; Tab stays in it. The version, date and time and copy are kept
  in the device's data only and shown in Settings, Ownership; a new version asks again. `r320.js`: IngTerms.docs() gives the full texts.
  Not legal advice: a lawyer in the US and in the UK should read the final wording.
- `build/modules/r327.js` (new, window.IngWays): her ways of working, seeded with her nine rules in her master copy only (other copies
  start empty and their owners write their own): in Ingenia (folded under the page's keys, its count on its key) and in Settings, Your
  Ingenium (r173, r234 place it); add, move up and down, remove; where they apply (every model; a model working on her apps, a Code session,
  Fabrica and Build, even when the first is off; shown in Settings), every row and switch raised and lifting under the pointer. Given to
  models after Ingenium's instructions and hers (ingPersonLayer). Fabrica's measured checks of the rules come later.
- rig: `t_741.js` (new, 22 checks).
- `r222.js`: the 7.40 line naming Fabrica shows only in copies that have it (rig/t_627_editions found it in the gift and demo editions; 7.40's
  editions were not committed). From 7.41 the editions are made and checked before the page is pushed.

Ingenium 7.40 (18 November 2026): your DPhil plan in Vocatio; the 7.39 texts right in every edition; Adamas no longer freezes or
closes the app; at rest, still (cooler phones, quicker laptops); the terms off the welcome door; Vesta's darker stone first by day;
Fabrica's logos in depth; the model keys off the pages.

Her message (18 November 2026, with four screenshots): the terms line "is sort of behind the introduction door and skews the introduction
door to the left side"; "Ingenium is running really slow on my HP laptops and the Adamas page has consistently crashed the app everytime
that I have tried to go on the page"; the Tokens and Effort levels "cluttering the pages designs and layout, especially the Vocatio and
Fabrica page, please remove these buttons from where they are currently placed"; "Ingenium still heats up my phone"; "I want the darker
purple stone to be the first stone on Day mode on the Vesta page"; Fabrica's app logos "flat and shallow" with "a completely different
animations" from Lector's.
- The welcome door (`r320`): the line sat after the door's card, a second item in the door's centring box, which pushed the card left.
  She then wrote: "I am not sure that the Terms and Conditions should be added to the introduction door"; asked, she chose a sheet after
  Enter, once, with I agree and Decline (a live preview first). 7.40 takes the line off the door; the terms stay in Settings, Ownership.
- Adamas (`r292`), measured with a processor slowed four times (rig/t_740_adamas.js): opening it held the page 11.7 s in all (3 s at
  once), then about 2 frames a second; nearly all of it the graphics card reading every frame back (WebGL ReadPixels). The scene is one
  ray-traced picture at full sharpness; on a weak graphics chip one frame can outlast the two seconds Windows allows before it resets the
  graphics driver, which ends the app's display. Now the first three frames are drawn at a third of the sharpness and timed on the
  graphics card (one pixel read back); from them: full sharpness (a full frame up to 55 ms), fewer pixels and frames (up to 220 ms), half
  sharpness at 15 frames a second (up to 900 ms), else the stone still, its own 24-frame strip stepping (no WebGL drawing; the sky behind
  is not drawn). A lost graphics card, or an app that stopped while the scene was being tried (a mark kept until three frames are drawn),
  shows the still stone. The shader compiles while the page goes on where the browser offers parallel compiling (not this test's
  browser, where one stretch of about 2 s remains). localStorage "ing.gpu.diamond" ("full" or "still") chooses by hand. Measured after:
  2.8 s in all, 2.0 s at most.
- At rest, still (`r324`, window.IngStill): measured on 7.39, a phone's screen, nothing touched for 8 s, the share of one processor core
  in use: Adamas 138 per cent, Vesta 98, Home 35 (121 animations running for ever), Fabrica 22, Vocatio 15. Now, after 12 s untouched on
  a phone or tablet (30 s on a computer), or at once when Ingenium is not the window in use, every animation holds where it is and the
  scenes (r290 the compass, r291 the stones, r292 the diamond, r294 the tree) stop drawing; the first touch, key, scroll or pointer
  movement brings them back. Not while a model writes or loads. After: every page under 2 per cent (rig/t_740_rest.js).
- Vesta (`r291`): by day the stones' colours followed the steps, so with nothing planned the first stone was pearl; now by day, as by
  night, they keep their places: the darker purple stone first, pearl second, lilac beyond.
- Fabrica (`r315`): a 7.33 rule turned the whole logo and every picture in it flat by a few degrees under the pointer, which took each
  layer's depth; the logos now turn toward the pointer in layers, lift and sink as Lector's do.
- The model keys (`r321`): gone from Vocatio (its Effort row and key), Lector, Folders, Fabrica's head and the chat box; they stay in the
  model's name in the top bar and in Settings, Models and AI until she chooses the discreet button's place on its live preview.
- `tools/publish_release.sh` (all four repositories): GitHub's network dropped during 7.39's Intel job ("Could not resolve host"), after
  both files were uploaded; the tag and the release notes are now tried again, and notes that cannot be written are a warning.
- rig: `t_740_adamas.js` (new, 9 checks), `t_740_rest.js` (new, 4); `t_739_limits.js` opens the sheet from Settings (20);
  `t_700_heads.js` asks for the full scene (this test's browser draws in software).

Your DPhil plan. Her answers (18 November 2026): the DPhil in Information, Communication and the Social Sciences at the Oxford Internet
Institute; "Funded DPhil + full time remote work alongside it"; October 2027 (apply by 7 January); fee status International; "Show me both
side by side". Her word on the live preview (https://claude.ai/artifact/V3xHzY7HeVJ5j6s5unwqiY, previews/dphil_plan): "I approve of the
preview but the page is too long and needs to be restructured ... the lists are very long and should be foldable or have a 'click here
to see more' button"; on the restructured preview: "I approve of the preview".
- `build/modules/r323.js` (new, window.IngDPhil): in Your counsellor, 4. Where you could go, her own profile only, a card (the days to
  7 January, her lean, the next step) and Open the plan: a sheet with the deadline counting down and three tabs. Two ways: three
  deciding rows, the other four behind 4 more rows; her lean kept (state.career, the profile's dphil). The weeks: the next three of
  seven steps, all behind All 7 steps; the steps are one goal in Goals and plan (ticked in either, the same tick). What was checked: each
  source folded. Facts: read on the OII's page on 18 November 2026; from summaries (to check); not read (fees, documents, their lengths:
  Oxford's admissions pages refuse automated reading). Nothing about her nationality is assumed.
- rig: `t_740_dphil.js` (new, 14 checks).

The 7.39 texts in every edition. rig/t_627_editions found the gift and demo editions naming Vocatio and Fabrica, which they do not have,
in the new model settings card and in What is new (24/26). 7.39's editions were not committed; its device builds went ahead (the page
for her devices is the master's).
- `build/modules/r321.js`: the card names only the places the copy has. `build/modules/r222.js`: the 7.39 line in two forms, one for
  copies with Vocatio and Fabrica, one for those without.

Ingenium 7.39 (18 November 2026): one setting for each model, in every place; raised sliders; dictation in-house on every device; a
Mac app's logs outside the app.

Raised sliders. Her words (18 November 2026): "I want the sliders to be 3D and not look so flat." Her approval of the live preview
(https://claude.ai/artifact/Le3ujQHWeH9srAcrJ9T3kr, previews/sliders_3d): "I approve of the preview".
- Found: every slider was the browser's own (input type=range) in Ingenium's violet; no module styled one.
- `build/modules/r322.js` (new, window.IngSliders): every slider is a groove shaded inside, a violet fill lit along its top edge, and a
  pearl with a small violet jewel that rises under the pointer and presses in when held; day and night (body[data-theme=night]). The
  fill follows the value when she moves it, when the page sets it (the value, min and max setters, kept as they were, then the fill),
  when a slider appears, and in a slow sweep. The Models page's settings: Effort's five stops under its slider, and its level named
  Low to Max as everywhere else (it said "Very light" to "Very careful").
- rig: `t_739_sliders.js` (new, 10 checks).

One setting for each model. Her words: the Tokens and Context controls reset to zero, are "out whack all over the app", and can be set
only on the chat pages, with no effort level elsewhere. Asked what to do (18 November 2026): "Both" (one setting everywhere, and a
record of changes). Her approval of the live preview (https://claude.ai/artifact/1Pi8wWFGkSGt71bAekYcUP, previews/model_limits): "I
approve of the preview".
- Measured on 7.38: three stores disagreed. Chat's Controls kept a record per model (r249, state.gen.by); Lector, Vocatio and Folders
  wrote Reply and Memory on the model only (r233, setLimit), so the next change of who answers put the older record back (Reply 2,048
  set in Lector came back as 8,192); their Effort was one value for the three pages (r225, state.wEff).
- `build/modules/r249.js`: IngGen.note(key, field, value, place) is the one way a value is set: the record, the model's own numbers and
  Chat's Controls (when it is Chat's model) at once. A zero or broken value is never taken; the last good one is kept and a reset
  caught is recorded with the place that asked. A lost value found at a change of model is mended to its last good one, and recorded.
  Every change is recorded (state.gen.log, the newest 200) with the model and the place. Chat's Controls record only the control
  moved, so a level Auto chose for one message is not kept as hers.
- `build/modules/r233.js`: setLimit writes through IngGen.note; mend() takes the record's last good value before the defaults, and
  records it; IngLimits.pageKey() names the model a page writes with. Lector, Vocatio and Folders show the key in place of their two
  menus.
- `build/modules/r225.js`: a level (Low to Max) set in Lector, Vocatio or Folders is the model's own; Auto and Ultra stay one choice
  for the three pages.
- `build/modules/r321.js` (new): the key beside the model (Reply, Memory, Effort) in Chat and Code, Lector, Vocatio, Folders and Fabrica;
  pressed, a small sheet with Reply and Memory sliders and Low to Max; Escape, a press outside or a change of page closes it. In
  Settings, Models and AI, Your Ingenium: each model with its key, and every change and any reset, newest first (r173, r234 place it).
- rig: `t_739_limits.js` (new, 20 checks); `t_629_limits.js` reads the key instead of the two menus (12/12).

A Mac app's logs outside the app. The 7.38 build for the Intel Mac repository (its Apple silicon copy) stopped at signing: during
its self-tests the app had noted a problem and wrote ingenium_crash.log beside its program, inside the app, which breaks the app's
signature (on her Mac too, where /Applications is writable for an administrator).
- `build/desktop/app_logs_739.py` (new, the three computer apps): on a Mac, a built app writes ingenium_crash.log and ingenium_diag.txt to
  ~/Library/Logs/Ingenium; elsewhere nothing changes.
- `.github/workflows/build-mac.yml` (Mac mini and Intel repositories): before signing, a log left inside the app is shown in the build's
  log and taken out, and a log in ~/Library/Logs/Ingenium is shown.

Dictation in-house on every device.
Her words (18 November 2026): "I want for Scriba and its speech models to be wired into the Chats pages compose text box instead sending
it outside of the app to another provider. I want everything kept in-house where possible."
- Measured: dictation already writes in the message box with Scriba's own models, on the device (6.56, r254). The Mac and Windows apps
  carry the speech engine and models beside the page; the Fire, Android, iPhone and iPad apps did not (their workflows have no speech
  step), so a first use there fetched them once from the internet (cdn.jsdelivr.net, huggingface.co).
- `build/desktop/app_speech_739.py` (new, the three computer apps): the lending server offers the speech files to her paired devices
  (GET /ingenium/speech, GET /ingenium/speech/part, base64 pieces of up to 8 MB, only under speech/runtime and speech/models); hello says
  speech: 1.
- `build/modules/r254.js`: before the internet, a device without the files takes them from its paired computer (through IngLend.request,
  so sealed since 7.37): the engine into Scriba's store, the model into transformers.js's own cache under the address it asks for
  (https://huggingface.co/<model>/resolve/main/<file>, read in transformers.js 3.8.1's own code: caches "transformers-cache"). The line
  under the message box says so: "The speech model came from <computer>, over your home network, and is kept here". IngEars.from()
  names the computer.
- `build/modules/r274.js`: her answer (18 November 2026), asked when the computer's list of devices should show: "Whenever sharing runs".
  The code and the devices (each Sealed end to end or Pair once more) show whenever the server runs (lending, Fabrica's runs, apps,
  the Cloud), as "Devices that reach this computer" when it does not lend; the models plate only while it lends. rig/t_737_seal checks
  it with only Fabrica's runs on (26/26).
- rig: `t_739_speech.js` (new, 9 checks: a real computer app with the speech files; a device page with none, the internet closed to it;
  the engine and the English model came in 30 sealed requests and loaded in about 6 seconds; reopened with the computer away, it
  loaded from what it kept).

Ingenium 7.38 (18 November 2026): your chats in Ollama's own app, brought in; the Terms card's wording in the other editions.
Her request (9 November 2026, with the folders): "I want a safe way to move my data from Claude and Ollama to Ingenium so that I don't
lose all of my work". Her answer (18 November 2026), asked whether she chats in Ollama's own app: "Yes, on Mac and Windows".
- Where Ollama's app keeps them, read in Ollama's own source (github.com/ollama/ollama, main, 18 November 2026; not from memory):
  internal/onboarding/app_state.go, AppDatabasePath: on a Mac ~/Library/Application Support/Ollama/db.sqlite, on Windows
  %LOCALAPPDATA%\Ollama\db.sqlite, elsewhere none; app/store/database.go: SQLite in write-ahead mode, with the tables chats (id, title,
  created_at) and messages (chat_id, role, content, thinking, model_name, created_at, ...) and attachments (message_id, filename, data).
- `build/desktop/app_ollama_738.py` (new, the three computer apps): ollama_chats_find() and ollama_chats_json(offset, length). The
  database and its write-ahead log are copied into a private temporary folder (0700); the copy is read and deleted; Ollama's own files
  are never opened. %APPDATA% is looked at second on Windows (an older place, named by a third-party cleaner); ~/.ollama/db.sqlite
  elsewhere (Ollama's app keeps none there; it serves the test). Each chat comes with its title, its own dates and its model; a
  message's attachments are named in it ("[Attached in Ollama: ...]"); the model's thinking is left out.
- `build/modules/r208.js`: Folders, Bring in your work, Ollama: Read Ollama's chats on this computer (in the computer apps); the chats go
  to the shared import (r160), which shows them before anything comes in (Bring all, Bring the ones ticked, Cancel).
  `build/thoughts/chat_import_core.html`: a file named for Ollama is from Ollama.
- `build/modules/r320.js`: the gift, demo and full editions named her outside the authorship and licence (In short: "No account with
  Yannie D. Forest"; rig/t_627_editions): now "No account with its maker", and the notice names her as "its owner under its licence".
  TERMS.txt and PRIVACY.txt made again from the card. (7.37's editions were not committed for this reason; 7.38's are.)
- Claude Code sessions on the web, "From Claude's data export": no source confirms that Claude's export holds them (third-party sources
  say it holds the chats and projects); Folders keeps saying so, and she is asked to look in one of her exports.
- `build/desktop/app_seal2_738.py` (new, the three computer apps): the 7.37 builds for Windows and the Intel Mac stopped at the app's own
  self-test of lending ("sharing with other devices: HTTP Error 401"): it asked with the code alone, naming no device, which 7.37 refuses.
  The self-test now names itself as a device paired before 7.37, and then pairs sealed as a phone would (its key pair, the code, the
  four words confirmed, the model list through /ingenium/sealed, opened and compared with the plain one, and the code alone refused for
  it). A build without the encryption library now fails its self-test, so every published app is proved to carry it. Tried here against
  a real gateway: 3 sealed frames, status 200, the code alone refused.
- rig: `t_738_ollama.js` (new, 10 checks: a stand-in of Ollama's database made with the tables of its source, kept open in write-ahead
  mode as while Ollama runs; Ollama's files the same byte for byte afterwards, and no copy left behind).

Ingenium 7.37 (18 November 2026): sealed between your devices; Terms and privacy.
Her answer (18 November 2026), asked whether messages between her devices should be encrypted end to end: "Yes, encrypt them". Her word
on the live preview (https://claude.ai/artifact/KRuQqSihghbSgFcHswJCEU, source/previews/pairing): "Approve, build it", and "I approve of
the preview, please commit and push it everywhere and continue working on my requests."
- Found first (7.36, read in the code): her devices talked to the lending computer in plain HTTP on the home network, every request
  carrying the pairing code in clear ("Authorization: Bearer <code>"). The code has 40 bits (8 of 32 letters): enough against guessing
  over the network (wrong tries are slowed), too little to be the only secret behind encryption, since a recorded pairing could be tried
  offline. So the two devices agree on a key of their own, and four words on both screens show that no one in between swapped the keys.
- `build/desktop/app_seal_737.py` (new, the three computer apps): this computer's key pair (ECDH P-256, seal_key.pem, 0600) and its
  sealed devices (seal.json, 0600) beside share.json. POST /ingenium/pair2 (with the code): a device's public key; the answer carries
  this computer's, a request id and the four words (32 bits from SHA-256 of both public keys, from a list of 256 words). She confirms
  them on the computer (seal_pending, seal_answer); GET /ingenium/pair2/state then gives the device what /ingenium/pair gave. The key:
  ECDH, then HKDF-SHA-256 (salt from both public keys), AES-GCM 256-bit. POST /ingenium/sealed: the device's id, an IV and the sealed
  request (method, path, headers, body, its time and a random id); it is opened, checked (ten minutes either way; never twice), and run
  through the server's own routes as that device's request; every byte of the answer (status line, headers, body, streams included)
  comes back sealed, one base64 line per frame, each frame's number bound in, an end frame last. With the code alone, 7.37 allows only a
  device paired before 7.37 (seal.json "legacy", taken from share.json at the first start), a computer calling in, or the sealed pairing
  itself; a sealed device or a new one is refused. A device that cannot seal sends no key, and she is asked on the computer whether to
  allow it with the code alone (it is then an older device). hello says seal: 1; share_status carries seal; each device says sealed or
  legacy; Remove forgets its key. Needs the Python package cryptography: the Mac and Windows builds install cryptography==48.0.1 (its
  last release with wheels for Intel Macs: from 49.0.0, macOS wheels are for Apple silicon only), and the specs collect it whole.
  Without it the computer seals nothing and pairing works as before.
- `build/modules/r319.js` (new): window.IngSealing. On a device: its key pair (the private half not exportable) and one AES-GCM key per
  computer (not exportable), in IndexedDB "ingenium_seal" (cleared by Reset everything). netFetch is wrapped: pairing with a computer
  that seals becomes the sealed pairing (the device's sheet: the four words, Waiting for the computer, Stop pairing; then Paired with …,
  Sealed end to end, or Not paired, and why); every later request to that computer, at any of its addresses, goes sealed, without the
  code. On a computer: a sheet when a device asks ("… asks to pair": the four words, They match, They do not match; for a device that
  cannot seal: Allow it with the code alone, Refuse). Marks: on the computer, each device Sealed end to end or Pair once more; on a
  device, each computer. Every sheet, word and key lifts under the pointer; Minimal or reduced motion keeps them still.
- `build/modules/r274.js`: the hooks for the marks; a refused, unanswered or stopped pairing is said as it is (not "Could not reach").
- `build/modules/r318.js`: Sealed between your devices shows its true state (On or Off, and why: how many devices are sealed, how many
  still use the code alone); the disk's sealing is planned for 7.38.
- Not sealed yet, said so in the room: a computer calling in to another (call-ins), Python to Python, still uses the code.
- Not verified on her devices: whether the iPhone and iPad app (its page at ingenium://app/, a custom scheme) is a secure context, so
  whether it can seal; if not, it pairs only if she allows it with the code alone, and the room says so.
- Third-party notices (all four repositories): 13. QR Code Generator 1.4.4 (MIT; carried since 7.35 and missing from the list until
  now); 14. cryptography 48.0.1 (Apache-2.0 or BSD-3-Clause; its wheels carry OpenSSL, Apache-2.0); licences/cryptography-LICENSE.*.txt;
  the licences folder now travels inside the computer apps.
- rig: `t_737_seal.js` (new, 26 checks: a real computer app as the Mac, browsers as her devices). Brought up to 7.37: t_735, t_732
  (the four words confirmed), t_681_lend.js (a device that cannot seal, allowed on the computer), t_736_security (Sealed between your
  devices On); t_681_lend_gateway, t_705_lend_gateway, t_728_runs_devices, t_67_app_sec run the computer as a build without the library.

Terms and privacy (her request of 18 November 2026: "I want Ingenium to have a Terms and Conditions and a Privacydiclosure or something of
that nature to protect me and my app and future company and anything else that it might be needing."; her answers: her own name, "Both the
US and the UK.", the contact filled in later inside the app; her word on the live preview, https://claude.ai/artifact/1kH45upUM246ucJN89phJm,
source/previews/terms: "I approve of the preview, please commit and push it everywhere.")
- `build/modules/r320.js` (new): Settings, Ownership (listed by r173), after the licence: Terms and privacy, Version 1, 18 November 2026,
  in parts: In short (six tiles), the Privacy notice (8 parts), the Terms of use (10), and in the master edition Your contact (kept in the
  desk, shown in both; the other editions carry it from the release made after she gives it). Every statement in the notice was checked
  against the code (what is kept and where, when it goes online and to whom, the sealing). The master edition says Draft: it is not legal
  advice, and a lawyer in the US and the UK reads it before it is final (the law and courts of the licence's clause 18, one US state, the
  minimum age, which stays a blank). The welcome: "By using Ingenium you accept its terms. Read them". Settings, Security: Read the
  Privacy notice (r318). window.IngTerms.
- TERMS.txt and PRIVACY.txt (made from r320's own text) beside LICENCE.txt in the four repositories, and inside the computer apps.
- rig: `t_737_terms.js` (new, 10 checks).

Ingenium 7.36 (18 November 2026): Security, a room in Settings; Mentes, Studio and Train in one window; Vocatio's Effort row back.
Her security request (18 November 2026): "I want you to upgrade and enhance Ingenium's security system and embedded software protection.
I really want everything to be encrypted and protected ... my data is protected and also my code is protected and anything that I build
inside of Ingenium with my local models and all of my current apps." Her answers: the lock "Ask at first start"; the computer's disk,
"All of them" sealed; between her devices, "Yes, encrypt them"; her code, "All of the above and any additional features that will further
protect me and encrypt Ingenium and all of its content". Her word on both live previews (18 November 2026; Security,
https://claude.ai/artifact/H4ieskf4TqQR7DXc6YSeAQ, source/previews/security; the Train room, https://claude.ai/artifact/37W6KrMVaDst5bRBxqmEAw,
source/previews/train_room): "I approve of the preview, please commit and push it everywhere and continue working on my requests", and,
asked which, "Both".
The security work comes in stages. This release builds what the page alone can do, and says plainly what is not built yet.
- First, a survey (rig/t_736_leak_hunt.js, on 7.35, a real computer app with the sign-in on and a mark written into every kind of thing
  she makes): where her data can still be read without her password. Every store of the page held the mark only sealed (21 stores read),
  and so did the desk and the long texts on the computer's disk. Open on the disk: the apps waiting for her devices (Ingenium/apps/outbox)
  and the apps served for the Home Screen (Ingenium/apps/served), plain. These, and what passes between her devices, are the next stage.
- Found while checking rig/t_700c_lock_stores (3 of its checks missed on 7.35 as on this release's first copy): her Android signing keys'
  copies on a computer app's disk have been named "big_sgn<id>" since 6.39 (r136), but `build/modules/r197.js` sealed in place, when
  protection is turned on, only the name of before, "signing_<id>", which the app never kept. So a key copied to the disk before she
  turned protection on stayed readable there (written after, it was sealed, as every write is). Now both names and the keys' index are
  sealed in place, and opened again when protection is turned off. `build/modules/r143.js` (Backup and moving) used the old name too:
  a key found only on the disk is read by its own name now, and a restored key's copy is written there under it, with the index. The
  test read the old name as well (fixed), and rig/t_736_leak_hunt now makes her signing key before protection and fails if any private
  key stays readable on the disk.
- `build/modules/r318.js` (new): Settings, Security (listed by `build/modules/r173.js`, between Your data and Ownership, with its shield
  and the words "security", "protect", "encrypt", "seal", "lock", "offline", "privacy" for the search). How many protections are on, then
  each with its true state: On, Off, or Not yet (with the release planned). The count is of those built ("2 of 8 protections on" on a
  fresh copy). Seven parts: Everything, This device, The computer's disk, Between your devices, Your code and apps, Ingenium itself, More
  protection.
  - Sealed on this device: the sign-in of 6.9.x (r197), read from its own record; its ways back in; Lock now. Backups sealed whole while
    it is on (r197).
  - At first start: a copy with no sign-in asks once ("Protect your work first": Protect it opens r197's own steps; Not now), after the
    welcome and the tour. Not in the demonstration edition.
  - More protection, new in this release: Offline only (off until she turns it on; a request from the page to anything but this device
    and her home network is held back, with a note: Allow for an hour, Allow once, Keep it offline; Ingenium's own way out, netFetch,
    follows it too); Lock when the computer sleeps (a pause in time longer than 90 seconds locks it); Slow down wrong passwords (after
    three, each try waits longer, up to five minutes; nothing is wiped); Clear a copied secret (a password, recovery word or pairing code
    copied from Ingenium is cleared from the clipboard after a minute, where the browser lets a page do so); A record of every opening
    (when Ingenium opened, every wrong password and every sign-in, kept in the desk, so sealed with it).
  - Not yet, said so: sealing on the computer's disk and between her devices (planned for 7.37); her apps signed when shipped, their code
    scrambled, an owner key on her apps, Ingenium itself signed and checked, asking before each export (planned after). What is
    already signed is said beside them: her Android and Fire packages, with her Android key (Fabrica, Ship), and Ingenium's own Fire
    app; an iPhone or iPad app with her Apple ID, through Sideloadly. The owner key that exists today (security/owner_keys.json)
    signs permissions (r162); it does not yet sign or check a release.
  - The room says only what the copy has (found by rig/t_627_editions on the first 7.36 build: the gift and demo editions' room named
    Fabrica, which they do not carry): without Fabrica, its items, tags and the claims that depend on it are left out ("What you make
    and ship"); outside the master edition, Ingenium itself is "the one its maker released", signed with its maker's key.
  - Not verified on her devices: the clipboard clearing in the computer apps' own window (it follows the browser's rules there); the
    computer apps' own downloads do not follow Offline only yet (a later release).
- `build/modules/r317.js` (new): Mentes, Studio and Train in one window, as the preview drew it. While a room of the Studio is open: a
  slimmer band (the turret as a coin, the engine's state as a chip, Show the turret to bring the whole head back, kept on this device);
  the rooms' lines said in the keys' titles; the Studio's rooms in one row; Train's three parts as a rail beside its card; the workbench's
  four tools as raised cards with an icon and a line each, beside its steps; what it is and its engine folded into About it. Every id and
  handler stays.
- `build/modules/r232.js`: the Train room's cards, the workbench's tool keys and its engine panel lift under the pointer (their look at
  rest unchanged; Minimal or reduced motion keeps them still).
- `build/modules/r225.js`: Vocatio's Effort, Reply and Memory are back, in a row of their own under its room keys (lost in 6.93 when its
  rooms were remade: r225 placed Effort beside a note that was no longer there, so r233's Reply and Memory had nothing to follow). Their
  explanations are in their titles.
- rig: `t_736_security.js` (new, 14 checks): the room's true states; the first start's ask; Offline only (held back, the note, Allow
  once, this device still answers); protection on; a pause of two minutes locks it; three wrong passwords, then a wait; the record; a
  copied secret cleared; every row, way and key lifts; no page errors. `t_628_train.js` brings the tile into view before pointing at it.

Ingenium 7.35 (18 November 2026): your app on the iPhone and iPad, four ways.
Her request (16 November 2026): iPhone and iPad "all four ways" (inside Ingenium; a Home Screen web app; an IPA signed with a free Apple
ID through Sideloadly or AltStore; an IPA signed with a paid developer account). Her answers (17 November 2026): a paid account "Not yet,
but plan to"; the Home Screen app "Mac first, GitHub backup"; inside Ingenium "Both" (paired devices, and a file). Her word on the live
preview (18 November 2026, https://claude.ai/artifact/HMXfpBF7MfUwg9Q8Z2yNRP, source/previews/iphone_ways): "I approve of the preview,
please just add some colours to the buttons because they all look very plain all in white. Please commit and push it everywhere and
continue working on my requests."
- `build/modules/r112.js`: the Ship part's iPhone card reads "iPhone and iPad" and its four ways; its key is Choose a way (the card
  stays chosen for Make the chosen, which still makes the IPA). It stands even where the page carries no iPhone shell, as two of the
  ways need none.
- `build/modules/r316.js` (new): the sheet, as the preview drew it. Inside Ingenium: Send to my devices (on a computer app: her devices
  paired with it, as for lending models, each with Send, then Waiting for it and Kept there), or Make the file (the one page; on the
  device, Fabrica, Your apps, Bring one in). On the device, what waits on its paired computer is offered above Your apps (Keep it here,
  Not now): a new app, or a new version of the app of that name; Run it opens it. (The preview said "Ingenium's app library"; the app
  is kept in Fabrica's Your apps, where Ingenium runs an app of hers.) On the Home Screen: From my Mac (Serve it now: the web app served
  on the home Wi-Fi at http://<computer>.local:<port>/apps/<name>/, with a code for the camera, Copy the address, Serve this version,
  Stop serving) or On GitHub Pages (the web app's files on the linked repository's branch gh-pages, with .nojekyll, through GitHub's
  own interface: blobs, a tree, a commit, the branch made or moved; Pages switched on for it; its address shown). With your Apple ID
  (free): Make the IPA (R136) and the steps in Sideloadly; Lasts 7 days, Up to 3 such apps. With a developer account (paid): about
  US$99 a year; Make the IPA (Sideloadly, a year); Make the kit (the iPhone and iPad build kit for Xcode). The keys wear Ingenium's
  own colours in the recipe of its coloured keys (lavender, Carpe Diem's sky blue, amber, emerald; Make the IPA Ingenium's violet), by
  day and by night; every way, well, row and key lifts under the pointer, with no wash; Minimal or reduced motion keeps them still.
  The codes for the camera are drawn by qrcode-generator 1.4.4 (Kazuhiko Arase, MIT licence, its notice kept; build/vendor), carried
  in the page. Only where Fabrica is (editions.py).
- `build/desktop/app_apps_735.py` (new, the three computer apps): Ingenium/apps/served and Ingenium/apps/outbox beside Ingenium/runs;
  apps_serve, apps_unserve, apps_served, apps_send, apps_outbox, apps_unsend; GET /apps/<name>/<path> to any browser on the home
  network without the code (only what she chose to serve; a path that leaves its folder is refused); GET /ingenium/apps/outbox,
  /ingenium/apps/get and POST /ingenium/apps/got for her paired devices (the code, and a device that names itself). The lending server
  runs while anything is served or waiting, and stops when nothing is lent, served or waiting.
- Not verified on her devices: Safari's Add to Home Screen from the Mac's address (an http address on the home network: from what I
  found, an iPhone keeps an app offline only from a secure, https, address, so it opens while the Mac is on and the iPhone is home);
  GitHub Pages on her real account (a private repository on a free plan cannot have Pages: GitHub's own answer is shown).
- rig: `t_735_iphone_ways.js` (new, 24 checks): a real computer app (rig/run_app.py) as the Mac, a browser paired with it as the iPhone,
  a stand-in GitHub in the browser.
- rig: `t_641_logos.js` 11/11 again (10/11 since 7.22). Its check that the pointer turns an app's logo moved the pointer to the Ledger
  Lamp row at 1,152 points in a window 900 high: the parts above Your apps grew after 7.22, and the row lay below the window, where no
  pointer reaches. The row is now brought into view first. The logos' tilt itself was never at fault (r112's pointermove).

Ingenium 7.34 (17 November 2026): the workshop's two open ends. Code reads only an app's changed files; a GitHub session keeps a
linked copy in Fabrica, with its history.
The two open ends of 7.27: "opening an app in Code still reads all its files" and "a GitHub session in Code keeping a copy in Fabrica".
- Found (read in the code): r112's openInCode read every file of the app from Fabrica each time it opened the app in Code (IngRepo.read,
  one file after another), though IngRepo.files already gives each file's fingerprint (its git object id). Its syncFromCode, which runs
  each time Fabrica is opened on the app, read every file again from Fabrica to compare with Code's. And it took Code's copy back over a
  newer one in Fabrica even when Code had not changed it: a change made in Fabrica (a version kept from Chat, Fabrica's own editor) was
  undone the next time Fabrica was opened, if the app had been opened in Code before (shown by rig/t_734 on the 7.33 page: the style
  changed in Fabrica to teal came back as Code's navy).
- `build/modules/r112.js`: the fingerprints last given to Code are kept (state.fabrica.codeOids, per app). Opening the app again reads
  only the files whose fingerprint changed, or that Code no longer has; a file Code cannot take (a picture, a file too large) is
  remembered and not read again until it changes. syncFromCode compares Code's files by fingerprint, reading from Fabrica only a file
  that differs (then word for word, as before); a file Code has not changed since it was given it no longer comes back over Fabrica's.
  The first opening reads every file, as before.
- rig: `t_734_code_reads_changed.js` (new, 15 checks, an invented app of three text files and a picture; Fabrica's reads counted by
  wrapping IngRepo.read and IngRepo.readText). On the 7.33 page it fails 11 of them, as it should.
- A GitHub session keeping a copy. Asked what Keep in Fabrica should make of a Code session opened From GitHub (a plain copy, as it
  was: an app of its own with no link and none of GitHub's history; a linked copy of the files only; or a linked copy with its
  history), she answered: "Linked, with history". `build/modules/r312.js` (ghKeep): Fabrica makes the app on the session's branch,
  links it to the repository (r114 link), brings the branch's versions from GitHub (r114 bring, with her GitHub sign-in: reading only),
  then keeps what the session changed since it began (r219 changes: added, changed, removed) as a new version on top. GitHub's versions
  keep their own git ids, so Fabrica's GitHub part sees the app one version ahead and Send works at once; files the session never read
  (pictures, files left out) are kept as GitHub has them. The sheet says so before ("With its versions from GitHub (owner/repo,
  branch), linked to it") and after (how many versions came, how many files changed on top). An app already linked to the same
  repository is chosen first, and only what the session changed goes there. Without a GitHub sign-in the copy is the plain one, as
  before, and the sheet says to sign in; if GitHub does not answer, the files are kept as a copy of their own, linked, and the sheet
  says why and that Bring from GitHub can try again.
- rig: `t_734_github_keep.js` (new, 17 checks). GitHub is stood in for inside the test's browser (an invented repository of two
  versions with real git ids, computed as git does); nothing reaches the real GitHub. The session is opened as Code opens one.
- rig: `inject_modules.js` now replaces a module that has a style block but no part marks (r312) instead of adding it a second time
  (the page's own copy, first behind the same guard, went on running; a test copy of a changed r312 tested the old one).

Ingenium 7.33 (17 November 2026): Fabrica, easier to find your way, and nothing stiff.
Her words (17 November 2026), on the live preview (https://claude.ai/artifact/NdgRNGS3yvtan8RH3rmBSE, source/previews/fabrica_nav): "I
approve of your preview, please commit and push it everywhere continue working on my requests. The "4 kept here" button from Fabrica's
"Your apps" section, the "Kept" button little button and the "Waiting" and "Not tested yet" buttons should all be animated and clickable
and be responsive and move when I hover my mouse on them. I dislike how the collapsible button on the panels on the Fabrica page get a
purple shading when I hover over it, I want that removed and I want it to get Ingenium's signature 3D look and animation instead. There
area lot of sections and buttons inside of the Fabrica page that are stiff and rigid upon hover and do not animate, please make the
necessary fixes to them as well." Then: "I only want the collapsible buttons of Fabrica's panel to pop out when I hover it with my mouse
and not while they are at rest", and "I also didn't want the Kept and Waiting buttons and the other buttons to have a different look and
design, I just wanted them to animate when I hover over it, please revert them to their original look". And, on the preview, said many
times: "no new section, page or tab inside of Ingenium should be flat, stiff and unresponsive when I hover over it."
- `build/modules/r315.js` (new):
  - nothing stiff: 70 kinds of chip, card, tile, row, column, input and key in Fabrica's rooms were hovered one by one on the 7.32 page,
    and 41 did not answer the pointer; each keeps its own look at rest and now lifts, slides or leans under the pointer and sinks when
    pressed (the version rows of History had their lift held by a broader rule, now overridden); the panels lean toward the pointer; the
    fold keys keep their look at rest and pop out under the pointer as Ingenium's raised key, with no violet wash; the chips "kept here",
    "Kept" or "not kept", "Waiting" and "Not tested yet" do something when pressed (the app's chip opens Changes; the test's opens Test and
    lights Test this version);
  - as the approved preview: Where you are (Fabrica › the app › the room › the part, with GitHub's name for the part); the next step read
    from the app (keep a change, test, look at a failed test, ship); counts on the rooms (a change not kept, open issues and pull
    requests, a failed run, a test to look at) with GitHub's name on each room; Go to anything (/ or Ctrl K): rooms and parts, things to
    do, the app's issues and pull requests by title, your apps; the map (M) of every room and its parts; Teach me as I go (T): a lesson
    over each part, in the words of Fabrica's own lessons (modules/r298.js: what it is, GitHub's name, the git command, why), Show me where,
    Got it, the parts learned counted (kept on this device); G then N, S, P, R or C for the rooms; ? for the keys.
- `build/modules/r298.js` shares its lessons and its way to open a view (IngRuns.learn, caps, roomOf, nav).
- What is new (r222, in the editions with Fabrica). rig: `t_733_fabrica_way.js` (new).
Schedae's keys, as they were in 7.14. Her words (17 November 2026): "I want you to restore the colours of the buttons on the Schedae panel,
I only asked for the texture to be fixed not to strip the buttons of all colours and leave the panel flat and looking plain." Two tries
followed (the lavender on Ingenium's white key; then the keys matte with a solid edge), and of each: "The colours still look off and
really different"; "They still do not look like the original buttons." Shown 7.14's panel beside the test copy, and asked which keys,
she answered: "Bring the old look back with the gold jewelled new note button and the glossy look. They looked better that way."
`build/modules/r303.js` no longer changes Pin, Send to Tabula, Delete, a note's menu rows or New note: they are the base page's own keys
again (.sch-btn and .menu-btn, glossy, lavender and red; New note the amethyst stone with its gold rim), as in 7.14, by day and by night
(compared side by side). Shown that, she asked: "Revert the Tabula and Abacus buttons too, they look entirely too big and hideous
this way." So Tabula and Abacus became again the small "→ Tabula" and "→ Abacus" keys of 7.14. Then: "Please remove the arrows to
Tabula and Abacus buttons that are directly under the Schedae title on the panel"; asked whether she meant the arrows or both keys, she
chose to remove both keys. They are gone (r303 hides .sch-go before it is painted and takes it away); Tabula and Abacus are still in
the side list, and Send to Tabula is still on every note. Its 7.33 line in What is new is marked for the desk, as Tabula and Abacus are
only in the master and full editions (t_627_editions caught it naming them in the gift and demo). One thing is mended: the keys'
rising-in (animation fill both) held them still afterwards, so their own hover lift (three points) never showed; it shows now.

Ingenium 7.32 (17 November 2026): the day's clear crystal at night.
Her words (17 November 2026): "I also want a clear or silver diamond crytsal look option in Night mode too. Basically, I want to see the
day mode clear crystal made also available on night mode."
- `build/modules/r292.js`: a night look may be the day's clear crystal (family() n.cd): by night the stone alone is lit by the day's room
  and drawn with the day's tone curve as the clear crystal is by day, while the room around it stays the night's, under northern lights in
  every colour.
- `build/modules/r314.js`: At night has a fourth choice, Clear crystal (its picture the day's clear crystal stone), whatever the stone by
  day; the note and Settings' tile say so.
- What is new (r222). rig: `t_731_diamond_families.js` checks it (Ruby by day, the clear crystal by night, the brightest of the night
  looks).

Ingenium 7.31 (17 November 2026): the diamond's colours in families of gemstones, each with a night of its own; the northern lights in
the stone's colour.
Her words (17 November 2026): "I want the light blue pastel shade that I love from Carpe Diem's sticky notes to be among the diamond colour
choices. The current aqua colour loosk still too greenish. I want that other colour added. I like want them to look like true gemstones
and have their light pastel colours, their medium colours and their dark, and night mode dressing that is a variation of the current dark
deep purple colour of that the current crystal has for Night mode. I want for every colour shade to come with their 4 variations so that
the diamond has a proper night mode look to match and accompany it if I choose to change the colour from purple to another colour. I want
you to give the diamond, the same treatment as the sticky notes in that regard. Please make the necessary changes and continue working on
my requests." And, while it was being made: "I also want the northern lights to change colours to better complement the new diamond
colours when they are selected on the page, instead of only using the purple hues for every shade." And: "I also want the option to
keep the clear crystal and have its own Night mode look. It should have the full colour spectrum for the Northern lights since that
makes the most sense." Then: "No I prefer the stone as a black diamond on Night mode, it is the best look for it and its natural
opposite." And, shown that night look first lifted and then not: "I like the silver diamond look on dark mode too from your previous
clear Night mode look, please also add it as an option for Night mode look for the diamond."
Carpe Diem's sticky notes (build/apps/builtin/cd.html.gz: STICKY_COLORS and the script cd-sn-night-paper) have six papers, each with a day
colour and a night one of its own; her light blue is Inkwell, sky blue by day (#dcefff to #b6e0ff) and midnight blue by night.
- `build/modules/r292.js`: IngDiamond.family(). A family is Ingenium's purple stone dressed in another colour: its four looks (lavender,
  the day purple, the night stone by day, the night stone of the night theme) are drawn exactly as before, then, in the display's own
  colours after the tone curve, each facet's hue is gathered toward the family's (it keeps a quarter of its own play of colour, so white
  light stays white and the fire still flickers), its chroma scaled and its brightness curved, one setting per shade; a plain turn of the
  colour wheel was tried first and turned the stone's bluish facets green (the cast she disliked in Aqua). The northern lights (the sky's
  own canvas, the sky drawn in the stone's canvas where that canvas is missing, and the lights mirrored in the holder's silver by night)
  are gathered the same way toward the family's hue, their brightness kept. The clear crystal has a night of its own: by night a black
  diamond (the night room without its violet, no violet laid over the stone, its body deepened a little, its fire kept) under northern
  lights in every colour, the sky's own lights turned through the spectrum across its width and drifting slowly; by day its glows are the spectrum's too.
  (In 7.29 and 7.30 the clear crystal turned into the purple night stone at night.) With no family set, none of it runs.
- `build/modules/r314.js`: the stone is chosen as a family (Ingenium's purple, Sky blue, Sapphire, Aqua, Emerald, Citrine, Amber, Rose,
  Ruby, Clear crystal, Your own colour) and a shade (By the hour: from 5:00 the clear crystal, then pastel, medium and deep; Pastel;
  Medium; Deep); the night theme shows the family's night shade by itself, shown beside the four as At night. The Clear crystal keeps
  the clear crystal (its pastel, and By the hour's morning), then silver smoke and graphite, and by night a black diamond. At night (a
  row of its own under the shades): Its own (the family's night shade), Black diamond or Silver diamond, whatever the stone by day; the
  silver diamond is the clear crystal's night lifted as on the picture she chose (a brightness curve of 0.72, where the black is 1.15),
  and both stand under northern lights in every colour. Each family's settings were
  tuned on the renderer's own frames (source/build/aside/diamond_families: famsheet.py, palette.json). The panel's stones are the purple
  stone's frames (24 of each look, from the renderer: cap_purple.js, cut.py) recoloured in the page by the same sums, so each matches the
  diamond; a colour of her own gets its four shades and its night from its own hue, chroma and brightness. Choosing a family glides the
  panel down to its shades; beside the diamond its lower edge fades to show there is more. The settings kept by 7.29 and 7.30 are read as
  families and shades (a look as Ingenium's purple at that shade; one of the eight jewels as its family; any other colour as her own).
  Carpe Diem and Inkwell are named only in the master edition.
- What is this? (r144), the Guide's diamond entry (r250) and What is new (r222) say so.
- rig: `t_731_diamond_families.js` (new) supersedes `t_730_diamond_colours.js`.
Fabrica's runs on her other computers, stage 2, the page's side (the approved phase 3 preview, source/previews/fabrica_p3: MACHINES,
machines(), runSheet(); stage 1, the computer's side, came in 7.28), from source/build/aside/runs_stage2:
- `build/modules/r274.js` (sharing with her devices): a computer that runs Fabrica's jobs but lends no models pairs too, and is kept as
  one that runs jobs; IngLend.request() sends a request to a paired computer with its code and this device's name, at each address it
  gave until one answers; the lending computer's card in Settings, Your devices, has the switch Run Fabrica's jobs for my devices
  (share_runs_set), off until she turns it on, shown even while it lends nothing.
- `build/modules/r298.js` (Fabrica's Runs, Workflows and Machines): her paired computers that run jobs are machines (their tools, Ready,
  Asleep, Runs off there or Type its code again; Check it again; How to add what is missing; Add a machine says how to pair one). The run
  sheet: As the workflow says (each job on a computer of the system it names, this one first, a job's needs kept with it; a job no
  computer of hers runs now is said), Only on this computer, Only on one of her computers, and Only on GitHub's machines (not yet, shown
  but not pressable). A run on another computer goes through the same calls as a run here, sent to that computer; it is known here as
  m:<computer>:<run>, so every view follows it there, and says where it ran. A device with no computer app (the Fire tablet, the iPhone,
  the iPad, a browser) sends its runs to her computers. Once a run there ends, the computer apps keep a copy here (its record, every log
  and every file), and the copy stands for it in the list.
- rig: `t_732_runs_machines.js` (new, 18 checks): two computer apps in this container (the second running jobs for her devices), a page
  pairing with it and running a workflow there, following its log and file, keeping a copy; As the workflow says; a browser with no
  computer app sending a run; the runs switched off there. Two first failures were the test's own (a run just started opens its own page;
  both computers are named vm here, so the test found this computer's card), and were fixed in the test.
- What is this? (r144) explains the switch; What is new (r222) says so (in the editions with Fabrica).

Ingenium 7.30 (17 November 2026): the diamond's colours, refined, as her approved live preview has them.
Her words on 7.29's panel and on the live preview (https://claude.ai/artifact/55kQPJwfrgahiHc6GkrbJG, source/previews/diamond_colours_v2),
in order: "I want the panel to open beside the diamond and for the controls button to be a little button on the top right side of the
3D header of the Adamas page in the same format as Ingenium's introduction door ... I also want the diamonds emojis to actually look like
real diamond emojis and look more refined and actually match the 3D diamond from the Adamas page ... I want the graphics and 3D design of
the panel to be refined and elevated"; "I want the diamond button to match the sign-in button from the introduction door and be in the
same sleek and understated design and implementation. I don't want it to be sticking out"; "I want the crystals diamonds to be animated
and be 3D alone without the acrylic button and the names written together on the same button. I also want the check mark to be
Ingenium's colour instead of blue and I really hate seeing scroll bars in view ... no scroll bar should ever be in view unless stated
otherwise. Also, I hate long wide buttons, please fix the The Holder's Band buttons"; "I don't want any purple shading over the button
when I hover over it"; "The diamonds and everything inside of the panel still look very flat and 2D and not very animated and popped out
3D like the main diamond for Adamas"; and "I approve of everything except I want you to remove the white circle that is around the
diamond at the top of the panel, everything else looks great, please commit and push it everywhere and continue working on my requests."
- `build/modules/r314.js`, refined (what each choice does, state.diamond and Settings' card are as in 7.29):
  - the key: in the head's top-right corner, the welcome door's sign-in key value for value (modules/r197.js #introProtect as Chrome
    draws it on the 7.29 page: a well 37 by 32 points, 15 from the top, a key 29 by 24, its icon 12.6 points in a 1.5 stroke, the app's
    quiet grey); a cut diamond in line in place of the lock; under the pointer and while open only its icon deepens a shade, no tint;
    the head's row of keys is Run your page and Load a sample again;
  - the panel opens beside the diamond: the head's words step aside, the diamond glides toward the middle of the room left to it (the CSS
    translate property, measured as it opens), the panel unfolds from the key down the head's right side; on a narrow head it stands in
    the head's flow; Escape and the cross close it;
  - each stone is Adamas's diamond itself: drawn by r292 on a transparent ground in each look and each jewel, 24 frames through 45 degrees
    (the cut's own symmetry, so the turn loops), cut into strips of the stone alone (source/previews/diamond_colours_v2/tools: cap_all.js,
    cut.py; stones.json, 640 KB, written into the module); By the hour and Any colour change stone at the end of each turn; a colour of
    her own outside the eight is the clear stone tinted on a canvas; they stand on a glass shelf with their reflection, their names
    beneath, no key behind them; the chosen one floats higher in a soft light, its name in Ingenium's violet over a dot;
  - the band: the real holder with each band, two small choices; the light: Ingenium's own switch (.dmc-sw); the panel leans toward the
    pointer; no scroll bar in view (scrollbar-width none and ::-webkit-scrollbar), the scrolling kept; the stone at the top stands alone,
    without the silver setting she asked to remove; the panel's title in Ingenium's own head serif (--sk-serif, Home Cormorant).
  - the little diamond at the top is a toy (her words: "The little diamond on the top left of the diamond's colours panel need to be
    animated and clickable, it does not need to do anything, just be a fun animated clickable toy like the main diamond"): it floats and
    turns; pressed, it sinks with the main diamond's own sound, and let go it springs back, whirls and throws a burst of Ingenium's
    four-pointed sparkles; it changes nothing; Minimal motion keeps only the sound and the press.
- What is this? (r144), the Guide's diamond entry (r250) and What is new (r222) say where the key is now.
- rig: `t_730_diamond_colours.js` (new, 21 checks, the toy among them) supersedes `t_729_diamond_colours.js`; `t_700_heads.js` expects Adamas's row of two
  keys and the key in the corner.

Ingenium 7.29 (17 November 2026): the diamond's colours within reach; her apps' packages without a word of Ingenium; Adamas's chosen
tab readable; Open Storage reaching Storage.
Her words (17 November 2026), in this session: "I don't want to keep seeing Ingenium's own app files and logo when I try to ship a new
version of the Forge or Carpe Diem or Inkwell or any future app that I choose to make. I want Ingenium to actually build and create
ready-made apps and build kits for all of my devices accurately and without errors, bugs, or missing files or documents" (asked where she
last saw them: "An older build"; asked where Windows showed ".exe": "Not checked lately"); "The selected tab on the Adamas page is
translucent and white and ineligible, please fix that as well" (with a picture); "I want a clear way to edit Adamas' diamond and change
the colours as I please, I can't locate the settings for it. Please make it accessible and visible for me"; "You changed the strip
around the diamond holder on Adamas, please revert it back" (it had not changed: see below); and on the live preview
(https://claude.ai/artifact/TXUHDygwqMQWmnFCkLvb9v, source/previews/diamond_colours): "I approve of the preview, please commit and push
it everywhere and continue working on my requests."
- Her apps' packages, read apart from the page that made them (`rig/t_729_family_real.js`, new): Carpe Diem, Inkwell and Lakay brought
  in from the app library as she would, each one's five build kits (Fabrica's Build kits, all six devices) and five ready-made apps
  (Android, iPhone and iPad, Mac, Windows, web). On 7.28: 120 checks passed and 14 failed. Their icons, names, guides and pages were their
  own, the Windows apps their own installers ("Carpe Diem Setup.exe": the program "Carpe Diem.exe", Windows' names and Settings, Apps
  without ".exe", the owner as publisher), the Mac apps sealed; but six small files still said "Ingenium Fabrica": an APK's signature
  (META-INF/MANIFEST.MF and CERT.SF, Created-By) and the shell.json (and on Windows shell.txt) each Android, iPhone, iPad, Mac and Windows
  app keeps about itself. No shell reads it. `build/modules/r136.js` and `build/modules/r170.js` write "Fabrica" now. The other failures
  were the test's own (an APK's name is in its manifest, where Android reads it; a web app's page is the app's page with its manifest,
  icons and offline helper linked in, nothing taken out). On the corrected copy: 137 passed, 0 failed. The Forge (its own templates):
  `rig/t_67_kits.js` 147 passed on 7.28. Left as they are, never shown: names inside the compiled shells (the Android shell's Java classes,
  the Windows shell's window classes, manifest identity and a stand-in page used only if an app's own files were missing, the iPhone
  program's build paths); the Windows shell's placeholder company, "Made with Ingenium Fabrica", is overwritten with the publishing
  name, or blanked when there is none, as since 7.23.
- Adamas's chosen tab: Adamas has had tabs since 7.27 (`build/modules/r311.js`, r173's CONF.build), but `build/modules/r173.js` gave its
  tab colours (--rm-pa and the rest) only to Settings, Mentes, Concordia and the Guide, so the chosen tab drew white words on no colour;
  the same list kept where() from opening Adamas's other tab for a part in it. Adamas is named in both now, and in the accent colour of
  her own (`build/modules/r236.js`, with Career Studio, missing there too). `rig/t_729_adamas_tabs.js` (new): 5 of 11 failed on 7.28;
  11 passed.
- The diamond's colours (`build/modules/r314.js`, new; `build/modules/r292.js`): there was no setting to find (the diamond's looks
  followed the hour; IngDiamond.variant existed but nothing called it). A Diamond colours key on Adamas's head opens a raised panel over
  the head's words, the diamond in full view beside it (under the keys on a narrow screen): the stone By the hour (as before), Clear
  crystal, Lavender, Purple, Night stone, or a colour of her own (Ruby, Rose, Amber, Citrine, Emerald, Aqua, Sapphire, Amethyst, or any
  colour, Faint to Deep); the holder's band in Ingenium's violet or her own colour; the light through it on or off; Back to Ingenium's
  own. The same panel in Settings, Everyday ("The diamond on Adamas", a tile with a gem and a line such as "By the hour · band: Ingenium's
  violet · light on"; `build/modules/r313.js`, `build/modules/r173.js`), found by Find a setting, with Show me on Adamas; What is this?
  names both (`build/modules/r144.js`), and the Guide's diamond entry (`build/modules/r250.js`). Kept in state.diamond, so backups and
  Ingenium Cloud carry it. In the shader: her colour filters the light through the stone as a coloured gem does (a blend over white read
  as dusty in the first pictures), the colours it splits into lean to it, the night stone's lights and room take it (neutral, not violet),
  the band's enamel takes hers; with nothing chosen, every value is as before. The strip around the holder: she saw a test picture with an
  Amber band; the default diamond held still (Minimal motion, the same instant, random sparkles seeded) is identical, pixel for pixel, by
  night and by day, from 7.28's sources and 7.29's. `rig/t_729_diamond_colours.js` (new): 15 passed (in software WebGL).
- Open Storage from the full-storage notice: the first time in a session the Storage card is made just then, and the reveal came before
  Your data's sections (`build/modules/r234.js`) had filed it, so a moment later they showed the section kept before (Bring in), hid the
  card and its heading lost the focus (`rig/t_61_storage.js`, failing since 7.27). `build/modules/r142.js` asks for the Storage section by
  name and opens its tile before scrolling and focusing, and once more when the rooms settle. t_61_storage: 75 passed, the 2 left the
  test machine's own (the quota it asks for is not emulated in this Chromium; libFromZip, as on 7.27).
- What is new (`build/modules/r222.js`): four lines for 7.29, the kits' one marked fabrica.

Ingenium 7.28 (17 November 2026): Settings, raised: its long sections as tiles that open, its controls raised and moving, the chosen
level lifted.
Her words (17 November 2026): "The Settings page needs to be redesigned, a lot of its tab page are poorly organised and have a very long
page and I have to scroll down endlessly ... I don't like the way that the "Help and the guided tour" section's selected button look so
flat, please fix that, the same for the "Your level" section on the Guide page ... a lot of sections and tab pages on the Settings page
that are entirely out of format are flat and stiff, nothing moves and the popped out animated 3D look and effect is entirely missing".
A live preview with switches and recommendations (https://claude.ai/artifact/RaBy13C9zefPiaVkj9bfv2), and her word on it: "I approve of
the raised Settings preview, please continue working on my requests."
- Measured on 7.27 in Chrome at 1280 by 800, in a copy holding little (the height of the Settings page, in points, before and after):
  Everyday 1,058 and 651; Calm and focus 895 and 892; Your Ingenium 1,142 and 830; Connections 691 and 600; Search, eyes and ears 1,297
  and 759; Your devices 1,028 and 953; Memory 1,515 and 809; Storage 1,736 and 849; Sign-in and reset 698 and 550. Bring in (528), Ingenium
  Cloud (936), Ownership (778) and the Author Studio (398) are unchanged; Back up and move is 9 points taller (975, now 984), its three
  choices now raised plates. A copy holding more runs longer, before as after.
- `build/modules/r313.js` (new): in a section of two cards or more, each card is a raised tile: its mark, its name and its state in one
  line (Day · motion calm; Describing pictures on · reading their words on; Sign-in off), a chip and a chevron. Pressed, a tile opens
  across the section and the one open before folds; the folded ones stand two to a row. Storage opens by five groups (Room used, What takes
  the room, Your limit, Old copies, Your app library) and Your Ingenium by four (Who you are, How you want answers, Your own instructions,
  Ingenium's own instructions, its switch now beside its ten rules); every part keeps its id. Memory's four switches fold under one head
  whose line says all four, and How it works folds; the groups of Calm and focus are raised tiles, two to a row when folded. The tile left
  open is kept for each section on this device (ing.settings.tiles.v1). A head is a key (Enter or Space opens it) and sounds as one
  (`build/modules/r176.js`); What is this? explains it (`build/modules/r144.js`).
- Find a setting finds a setting in a folded tile and opens it (a folded tile is marked rm-shut, which modules/r173.js already looks
  inside); the tour, Help and any focus or scroll to a part of Settings open its tile the same way, through r173's reveal hook. Show every
  setting at once shows every setting open, as before. What takes the room is measured when its tile opens (it was measured when it came
  into sight, and stays so).
- Raised and moving controls, in Settings: a switch off is a well, on a lit violet key, its knob springing across and glowing; a strip
  (Theme, Motion, Nature sounds, the supports' choices) is a well whose chosen part is a raised key sliding under the choice (drawn as the
  strip's own ::before, so the strips' scripts, which walk their keys, never meet it; when the app pauses every transition to apply a new
  theme or motion, the key slides again once that moment ends); fields are lit wells; each setting's row with a switch is a raised plate
  that lifts under the pointer; the tiles rise in one after another. Minimal motion, the calm look and the system's reduced motion keep
  them still.
- The chosen level (New to this, Some experience, Expert) is lifted, ringed and glowing, its own mark lit as a jewel, wherever the levels
  are: Settings, the Guide's Your level and the tour. Measured at rest, the three stay one size.
- rig: `t_728_settings.js` (new, 37 checks). Brought up to the tiles, each opening a tile as she would before using what is inside:
  `t_633_settings.js` (17 passed), `t_684_settings.js` (20), `t_650_levels.js` (18; two of its checks, a single column of levels at most 260
  points wide, had failed since 6.84 set them side by side, and now check 6.84's layout), `t_61_storage.js` (74, the same three failures as
  on 7.27), `t_682_sounds.js` (111), `t_61_refresh.js` (21, the same crash as on 7.27), `t_62_tour.js` (34), `t_700_heads.js` (32).
  Unchanged and passed: `t_614_connectors.js`, `t_626_guide.js`, `t_633_reset.js`, `t_638_reset.js`, `t_639_keys_disk.js`, `t_679_memory.js`,
  `t_690_counsel.js`, `t_690_press.js`, `t_700_lock.js`, `t_700d_lock_backup.js`. Failing as on 7.27, not by this change: `t_63_look.js`
  (three, outside Settings), `t_643_side.js`, `t_656_ears.js`, `t_67_rooms.js`, `t_67_select.js`, `t_67_sound.js`. WebKit, the Mac app's
  engine, is not in this container; nothing here was measured in it.
Fabrica's runs on her other computers, the computer app's side (stage 1 of the approved phase 3): `build/desktop/app_runs_728.py` lets a
computer run Fabrica's jobs for her paired devices while its switch is on (off until she turns it on), each device seeing only the runs it
sent, and keeps a copy of a run made elsewhere with where it ran (rig/t_728_runs_devices.py, 21 checks). The page's side (the switch in
Settings, the computers in Fabrica's Machines) is the next stage; nothing of it shows yet.

Ingenium 7.27 (17 November 2026): the scenes rest when nobody watches them; Adamas in two tabs, its code and its page given the window's height;
Chat and Code send their apps to Fabrica and Adamas, and Code opens Fabrica's apps.
Her words (17 November 2026): "The diamond on Adamas' page is still overheats my computer and my fan is still loud, not as much as before
but it is loud, the same for the Vesta page and Lector and Fabrica."
Measured in Chrome at 1440 by 900, Retina sharpness, the WebGL drawing skipped and counted (rig/t_727_rest.js, rig/t_727_paint.js); WebKit,
the engine of the Mac app, was not available in this container, so nothing here was measured in it:
- Adamas's scene, Vesta's stones and Fabrica's tree each asked for a frame at every refresh of the screen (about 60 a second) and drew in
  one of two or three; on Vesta each of those wakes made the page restyle and repaint its moving seals (60 times a second, 8 on Chat).
- Each kept drawing while any part of it showed: Adamas scrolled to its code (the code panel 210 points from the top, as in her picture),
  the lowest 114 points of the scene still showed, 40 of them under the top bar, and it drew 14 times a second; Fabrica scrolled down,
  the tree drew 30 times a second (it followed the whole Fabrica page, not its head).
- Vesta and the tree drew 30 frames a second at rest; Adamas 20 since 7.22.
- Lector's two swaying documents never rested with its head: the rule that pauses them (".skh.is-away .lf-sway") lost to the rule that
  starts them ("#page-lector .lf-sway").
- `build/modules/r310.js` (new, IngPace): idle() (Ingenium not the window in use, or two minutes with no touch, click or key) and typing()
  (a key pressed in a field or the code editor in the last five seconds).
- `build/modules/r291.js`, `r292.js`, `r294.js`: each sleeps until its next frame is due (a timer, then one frame; the frame its timer asks
  for is drawn); each draws only while three tenths of it show below the top bar; Vesta and the tree draw 20 a second at rest, and all
  three 10 while idle() or typing(). Under the pointer, in a press, a drag or a flourish, each runs as before. The tree's own watcher now
  hears each tenth of its head, so it starts again when the head comes back from a strip.
- `build/modules/r290.js`: a head counts as away with less than three tenths of it in view below the top bar (it took the whole head
  leaving before); Lector's rule names its page, so its documents rest with the head.
- Results, the same probe before and after: Adamas at rest 16 wakes a second (60), scrolled to its code no drawing and 2 wakes (14 draws,
  58 wakes, 302 ms of the main thread a second; now 43 ms); while she types, 10 draws a second; Vesta 20 draws and 22 wakes (30 and 62),
  main thread 79 ms a second (224); Fabrica 20 draws and 22 wakes (30 and 60), 302 ms (576), scrolled down nothing (504 ms before, 38 now).
  At the top, watched, the Adamas scene still draws 20 frames a second at a Retina screen's full sharpness, as since 7.22: its look is
  unchanged, so its cost while she watches it is unchanged.
- rig: `t_727_pace.js` (new, 15 checks), `t_727_rest.js` and `t_727_paint.js` (new probes); `t_722_adamas_pace.js` 5 passed.
Her words on Adamas (17 November 2026): "Why is everything so squished together on the Adamas page in Ingenium, the code panel and the
live preview panel look compacted in and it looks ugly, please fix it"; of a live preview that stacked the two panels on a narrow window:
"I just want Adamas code panel and its live preview panel to be restored to their original sides and not be compacted and squished in. I
am not interested in changing its look for a new design ... I want it done right"; then "I want you to split the Adamas
page into tabs and have the download as an app feature be in a different tab or apply the same fix as the Forge and make that section
collapsible from view instead of being a really long list."
- Measured (Chrome, the released pages of 3.4, 7.04, 7.08, 7.10, 7.12, 7.13, 7.15, 7.17, 7.19 and 7.26 at 1280 by 800 and 1000 by 625):
  the two panels have had the same widths since 3.4 (at 1280 the code 395 points and its page 536; at 1000, 280 and 376), side by side
  above a window 920 points wide, the code 42 per cent of the row as the base page set it. What filled them since is height: line
  numbers, the code's two rows of keys and Glossa's box, the preview's second row of keys and its console, in the same row of at least
  480 points. Nothing in a release narrowed them.
- `build/modules/r311.js` (new): their sides and widths stay as they were; the row they share reaches the foot of the window (at least
  480 points, as before; at 1280 by 800, 650), so the code shows more lines and its page runs in a taller frame. Each kit's name no longer
  runs into its file's name ("Fire tabletIngenium-Fire-Tablet-Kit.zip"). The kits' choice "The app in the editor above" says "The app in
  Your page"; picking it from elsewhere (Chat's Make it an app does) opens Adamas on the kits' tab.
- `build/modules/r173.js` (CONF.build): Adamas in two tabs, as Settings, Mentes and the Guide have them: "Your page" (the code, the
  preview and Ask a model) and "Download as an app" (the build kits), the tab chosen kept. A room's card may be named by a test of the card
  (the work card has no heading); a page's head (.skh) is never filed in a room, and the tabs stand under it. `build/modules/r292.js`:
  Adamas's head goes above the tabs when they are there first.
- rig: `t_727_adamas.js` (new, 19 checks: the tabs under the head, each card in its tab, the widths of 3.4, the row's height, the kits'
  tab, the parted names, the tab kept, the kits' choice from elsewhere, the diamond in its head, no page error).
Her words (16 November 2026): "I want to be able to send the apps that I am working on straight from Ingeniun's chat or coding to Fabrica
or Adamas so that I can commit and ship it as an app. I want the option to connect a repository from GitHub the same way that I do on Claude
but I also want to be able to connect to Fabrica's repositories as well and have it built into Ingenium. I want Ingenium to wort as one
ecosystem and have it all be integrated seamlessly to facilitate working on the app and further enhance its overall performance."
- Found (read in the code): Chat's app card had Run, Save page and Make it an app (to Adamas), nothing to Fabrica; Code's start window
  offered a new app, a file, a folder, the app library and From GitHub (r219, 6.13), not Fabrica's own repositories; Fabrica opened an
  app in Code (r112 openInCode, linked both ways), but what Code changed went back only when Fabrica was opened on that app again, and Code
  had no key to send it; Adamas kept a Fabrica page with its Keep in Fabrica.
- `build/modules/r312.js` (new), with Ingenium's own parts only (her word of 17 November: no new design): Chat's app card has Keep in
  Fabrica after Make it an app, with Fabrica's mark; a sheet asks where (a new app, named from the page's title, or a new version of an
  app there; an app of the same name, or the app the work is linked to, chosen first) and in a few words what the version is; Keep it
  makes the version (a commit) and offers Ship it (Fabrica, that app, its Ship part), Open in Fabrica and Make it an app (Adamas, linked
  back). Code's start window has From Fabrica after From GitHub: an app in Fabrica opened as Fabrica's Open it in Code does. A Code
  session on an app has Keep in Fabrica and Make it an app among its keys: Keep in Fabrica sends the files that changed to the app it is
  linked to (or makes a new app and links it); Make it an app opens its page in Adamas, or, for an app of several files, keeps it in
  Fabrica to ship from there. Chat's + menu has One of your apps in Fabrica: an app's page goes with the next message. Only where
  Fabrica is; nothing leaves the device. `build/modules/r112.js` lends Fabrica's openInCode (window.fbOpenInCode).
- Not done: a GitHub session in Code keeping a copy in Fabrica too; opening an app in Code still reads all its files.
- rig: `t_727_workshop.js` (new, 15 checks, an invented app).

Ingenium 7.26 (16 November 2026): Fabrica asks under what name, every time, in every edition.
Her words (16 November 2026): "I want for Fabrica to still ask me for the copyrights and publishing name even on my master edition, I want the
option to change the default name just in case I want to change it, that way I don't have to search through my settings to make the change.
I want it to ask everytime and to never assume but I want the option built for me to select for it to not ask me again."
Then, of the first question (16 November 2026): "I don't liek the way this is worded or presented, please redo it." A live preview
(https://claude.ai/artifact/BPunHpyUHFr3uJMJoyYqmq), and her word on it: "I approve of this preview, release it everywhere but I want the
"Publish with a new name" added to it and please make the "Published As" card on the "Download as an app" page." She chose the wording
"Publish it as..." and the name plate. Then (16 November 2026): "I approve of the preview, publish it everywhere. I also want the published
card that has my name on the Ship room and the Download as an app room."
- `build/modules/r309.js`: before anything that carries the name is made (a Mac, Windows or web app, build kits), Fabrica asks, in the
  approved look: "Before <app> is made", "Publish <app> as...", the app's seal, the name kept so far on a raised plate that tilts toward
  the pointer (Change turns it into a field), three tiles for where it shows (a Mac's rights line, Windows' publisher, the build kits),
  three choices (Publish as the name, Publish with a new name, Publish with no name), "Don't ask me again" (a raised box, empty until
  ticked) and the keys Cancel and "Make <app>". Cancel or the cross makes nothing. The Ship room's Ship part shows the same
  "Published as" plate (the name, or "No name" / "No name yet", with "Fabrica asks each time an app is made." or "Used each time, without
  asking."), and its Change opens the same sheet to edit the name and that choice. Nothing is asked on opening Fabrica any more (7.25 asked there in the other editions).
- `build/modules/r112.js` makeOne asks first (opt.named skips it); Make the chosen asks once for all; `build/modules/r298.js` Make the
  missing ones asks once; `build/modules/r139.js` Download as an app shows the same "Published as" plate below its fields, with Change;
  its Mac, Windows, web and kit rows keep what is on it before they make; its Windows row now names the file it saves, "<app> Setup.exe"
  (it still said a zip after 7.24).
- `rig/t_725_publisher.js` rewritten for it; `rig/t_723_ready_made.js`, `rig/t_67_kits.js` and `rig/t_v6.js` choose a name and not to be
  asked, so their makes do not wait on the question.

Ingenium 7.25 (16 November 2026): the publishing name, built in only in the master edition, asked for in the others.
Her words (16 November 2026): "As far as Fabrica, only keep the built by "Yannie D. Forest" line built-in only on my master edition as the
owner since that make things easier for me but also build into the app the option for me to edit the name in case I choose to publish
another name in the future. For the other editions, I want you to strip theirs of that since my apps are not built into their editions and
I want it to be a blank slate for them and and have Ingenium and its pages ask them how they would like to proceed and under what copyrights
name if any and have them type it in and save it. They should aslo have the option to go back and edit the name and change it if they
chooose."
- `build/modules/r309.js` (new, IngPublisher): one publishing name kept with Ingenium's settings (state.publisher, saved with saveState).
  The master edition starts with the owner's name until it is changed; the other editions start with none (`build/editions.py` takes the
  built-in name out of the module) and Fabrica asks, the first time it opens there, under what name its apps are published, or none
  ("Under what name do you publish?": the name and Save, or No name), and asks again next time if the sheet is closed unanswered. Fabrica's
  Ship room shows "Published as ..." (or "Published with no name", or "No publishing name chosen yet") with Change. It uses Fabrica's own
  sheet, field and keys. Its notes avoid the word the editions' comment stripper keeps in every edition.
- `build/modules/r170.js` ownerLine and `build/modules/r178.js` ownerName read it: a Mac app's rights line (NSHumanReadableCopyright), a
  Windows program's company and its installer's publisher, the build kits' owner. With no name, the Mac line, the company and the publisher
  are empty (the company never keeps the shell's own words); a kit's licence, which needs a name, takes the app's. Before a name is chosen
  in an edition that asks, they do as before 7.25.
- `build/modules/r250.js`: Fabrica's Guide topic has a row for it; `build/modules/r222.js`: the news.
- `rig/t_725_publisher.js` (new): the master edition (the owner's name, nothing asked, Change, another name kept and carried by a Mac app
  and a Windows app, No name carried as none), another edition emulated (ING_EDITION "full", nothing kept: asked, asked again after a
  close, the answer kept); `rig/t_723_ready_made.js` sets the publishing name.

Ingenium 7.24 (16 November 2026): every Windows app Fabrica makes is its own installer.
Her approved preview (https://claude.ai/artifact/Jp4R4qFP3HXXJG5P1MCbHc, version 6) and her words (16 November 2026): "I approve of the
preview, please push it everywhere and continue working on my requests." Before, Fabrica's Windows app was a portable program in a zip.
- `shells/windows/shell.cpp`: opened as "<App> Setup.exe", the program shows the installer's page Fabrica put in it (__setup/index.html) in
  a window drawn by the page alone (its bar, minimise and close; rounded by Windows 11, its shadow cast). For everyone on this PC (the
  default: Program Files; without an administrator's rights a copy of the program is started through Windows' administrator question) or
  Just for me (%LOCALAPPDATA%\Programs); a desktop shortcut, ticked; Open without installing (--run). Installed: the program under the
  app's own name with installed.txt beside it (which makes it open as the app), Start menu and desktop shortcuts named as the app with its
  taskbar identity, and the Uninstall key (HKLM or HKCU) with its name, version, publisher, icon, folder, size and day. An update goes where
  the app is. Settings' Uninstall opens the same page from a copy of the program in %TEMP%; the saved work stays unless ticked. From the
  command line: --install [--scope=all|me] [--desktop=1|0], --uninstall --silent [--remove-data] [--from=<folder>]. A program without the
  installer's page (made before 7.24) opens as the app, as before.
- `build/modules/r170.js`: setupPage writes the installer's page in the approved look (the preview's own colours by day and by night, raised
  tiles, the chosen one lifted, ringed and glowing, live keys and ticks, the seal swaying and leaning to the pointer, a progress well, no
  scroll bar); makeWin makes "<App> Setup.exe" (o.setup false still makes the zip); shell.txt gains name and publisher; the publisher, when
  there is one, is the program's company.
- `build/modules/r112.js`, `r139.js`: the Windows app is saved as "<App> Setup.exe" and called an installer; `r298.js`: Install on this PC
  opens the installer (`build/desktop/app_setup_724.py`, applied by release.py, puts it in %TEMP% and opens it).
- `shells/test/ci_windows.ps1` (GitHub's Windows machine, build-shells.yml, which can now build the Windows shell alone when started by
  hand): the page pressed through as a person would (installed just for me and for everyone, updated, uninstalled with the saved work kept
  and removed), each screen pictured and its window checked as drawn, and everything read back. `rig/verify_desktop_app.py` reads a Setup
  file; `rig/t_723_ready_made.js` expects one.

Ingenium 7.23 (16 November 2026): the ready-made apps name their own version and their owner, and a family app is known by its name.
Her words (16 November 2026): "I don't want to keep seeing Ingenium's own app files and logo when I try to ship a new version of the Forge or
Carpe Diem or Inkwell or any future app that I choose to make. I want Ingenium to actually build and create ready-made apps and build kits for
all of my devices accurately and without errors, bugs, or missing files or documents. I want the apps produced with their icons and logos as
proper apps with no issues." Fabrica's audit on 7.22 (every package of an invented app and of The Forge 656, Inkwell 7.52 and Carpe Diem 1091,
through fbHubHost.makeOne, opened file by file in a scratch folder): no file of Ingenium's and no picture but the app's own in any package or kit;
each ready-made app numbered 1.0; Ingenium named in a Mac app's copyright and a Windows program's company; a repository not known as its family
app unless its record said so.
- `build/modules/r111.js`: numberOf reads the family's marks, as apps/update_builtin.py does: window.CD_BUILD's pass (The Forge, Carpe Diem),
  Inkwell's BUILD constant, Lakay's lakay-build meta (after ingenium-build, a recipe's version and a version or app-version meta).
- `build/modules/r170.js`: ownerLine (Lector's author, else the name in Settings, else the app's title) is the Mac app's copyright
  (NSHumanReadableCopyright, set before the seal) and the Windows program's CompanyName (written in place of the shell's own words, which an
  other shell need not keep); the notes on how to open the app begin "For a Mac" or "For Windows", without the credit.
- `build/modules/r112.js`: appOf knows a repository by its record, else by its name (famOf: Carpe Diem, The Forge, Ingenium, Inkwell, as whole
  words); `build/modules/r276.js`'s famKey (GitHub) takes whole words too (a repository named forget-me-not is not The Forge).
- rig: `t_723_ready_made.js` (new; invented apps, an invented owner): the marks read, the names known, a Mac app and a Windows program made with
  version 2.3.1 and the owner's lines, read by rig/verify_desktop_app.py. On the family's real apps (scratch, not committed): The-Forge-656,
  Inkwell-7.52, Carpe-Diem-1091 for every device, each Mac seal and Windows program without a fault, Inkwell's seal where a gold I would have been.
- Left as they are: shell.json's "made", the shells' own code names; the Android signing key's name ("Ingenium, on this device"), since a new
  name is a new key and Android installs an update only with the same key; an app's id begins com.yannieforest (slugId) whoever owns the copy.

Ingenium 7.22 (16 November 2026): Adamas cooler, Home still, the stacked heads centred, the theme at once, the turret's names readable.
Her words (16 November 2026): "Adamas does make my mac warm, the fan of the computer gets really loud as well, like it is suddenly working
overtime or something. The home page's 3D header card and its "Your next step" card keep on resizing and lifitng slight higher on the page,
please fix that. Lector's 3D documents looks weird on the Fire Tablet screen, its skewed to the left and placed directly unde the Lector
header title and its two buttons and looks significantly smaller on the card ... It is the same for Vocatio's compass ... I have the same
complaint for Adamas' diamond and Fabrica's tree on the Fire Tablet. Also, the app is moving really slow on the Fire Tablet as well, it does
not always register my click ... it just selects the page's title instead with a blue fade ... Its the same with changing the app from Day
mode to Night mode ... it does not happen all at once like it is supposed to"; then "The models names are hard to read on the turret on Day
mode, the colour of the text blends in with the turret."
- Adamas (`build/modules/r292.js`): measured in software drawing (rig, a frame read back): a frame of the scene at a Retina screen's full
  sharpness about 2.2 s here, the holder a third of it, the stone most of the rest, the stone's second sample a ninth (kept: one sample
  showed speckle on the facets). The scene now draws 20 times a second at rest (30 in 7.21), 30 while the light runs or a press plays, 60
  under the pointer, and 10 while Ingenium is not the window in use or after two minutes with no touch, click or key; each gap with 15 per
  cent of slack, so a frame a hair early is not put off a whole frame. rig/t_722_adamas_pace.js (the drawing skipped, the draws counted).
- Home (`build/modules/r261.js`): the Orrery's check every 2 s laid Home out for a width of 0 while another page showed, so back on Home its
  header showed 408 px tall, then 700. A hidden Home is left alone. `build/modules/r308.js` (new): every page came in sliding up 6 px (the
  base's fadeIn); a page now only fades in.
- The stacked heads (`build/modules/r296.js`): a head stacked by r307 (narrower than 640 px, the window wider than 760 px: the Fire tablet
  upright with the menu open) was not fitted, so its object kept r290's 0.66 from its left edge over a box 424 px tall (144 px empty). It is
  now fitted as a phone's: as wide as the head's inside, in the middle, no band. Heads at the Fire tablet's size: Lector 712 px, Vocatio 735,
  Fabrica 734 (7.19: 760, 783, 782). rig/t_719_narrow.js now asks for the object in the middle, filling the head, at most 40 px to the hint.
- The theme (`build/modules/r308.js`): 860 parts eased their colours on a change, each in turn on a slow device; transitions are held for two
  frames while the theme turns (applyTheme wrapped; a MutationObserver for any other setter). rig/t_722_home_theme.js.
- The Fire tablet's touches (`build/modules/r308.js`): the side list's keys and the pages' titles cannot be selected by a resting finger, no
  tap flash, touch-action: manipulation on keys. `build/modules/r290.js`: Lector's seal and sheets are made after the page is drawn, one at
  a time (with Chrome slowed four times at the Fire tablet's size, Lector first drawn after 0.8 s, 6.9 s in 7.21). Not changed: the theme's
  own restyling of the whole page (about 1.5 s to the first frame in that slowed Chrome), and Vesta's first opening (about 1 s there).
- The turret's names (`build/modules/r304.js`): by day each letter stands in a soft white glow (dark violet on the lavender bezel before); a
  name at the foot stands at the rim's outer edge, clear of the memory line engraved there; a long name stays inside its card, 12 px from
  each side (checked at 1440, 1000 and 800 px wide with invented models).

Ingenium 7.21 (16 November 2026): Adamas's holder kept sharp, and the Guide and the tour brought up to every page.
- Her words (16 November 2026), with a picture of 7.20 on her Mac: "The holder of Adamas' diamond still look really blurry on build
  7.20, it does not look more defined or refined. It looks like a generated drawingn that does not look crisp. It still looks crappy
  even though you made me spend ages waiting for you to do what I asked and claim to have done it." Found: r292 drew the scene at a
  fraction of the screen's sharpness once frames came late (more than 1.3 times their 33 ms), down to 0.45 on a Retina screen
  (max(0.45, 0.9/dpr)), stretched to fit; the 7.20 preview's pictures were taken with that drop held off (window.__keepQ), so they
  showed what her Mac did not draw. Drawn here at 0.45, the turned lines and the knurled foot vanish and the face smears, as in her
  picture; with every animation frame delayed to 60 ms the 7.21 page first built fell from 1040 by 848 pixels to 884 by 721. Not
  measured on her Mac: which sharpness it reached there is inferred from the code and the likeness of the pictures.
- `build/modules/r292.js`: the scene is always drawn at the screen's full sharpness; a computer that falls behind draws fewer frames a
  second instead (the frame gap at rest from 33 ms up to 66 ms, and back as it keeps up). The cost of a frame at full sharpness is
  higher, so a slow graphics chip works harder per frame than before (her heat request, item 11, applies).
- rig: `t_721_holder_sharp.js` (new): with frames 60 ms apart for 40 s the holder keeps every pixel.

The Guide and the tour, for 7.21: brought up to every page, in every edition (her request of 15 November:
"The guided tour, its demonstrations and the Guide brought up to date with every page (Ingenia, Vesta, Concordia, Adamas, Mentes,
Fabrica ...), in every edition and demo"). Surveyed on 7.19 and 7.20: the tour's chapters reached every main page already; the Guide
had no topic for Home, Adamas, Lector, Fabrica's own workshop or the apps; the tour's step on Home's keys named the keys of an earlier
Home; and the public editions named pages they do not have in two places the editions test did not read.
- `build/modules/r250.js`: five topics, their words taken from the tour's own steps and the pages' own hints: Home (in Start here),
  Adamas (in every edition), and, only where the page exists, Lector, Fabrica and the apps (Tabula, Abacus, Imago, Scriba, Fontes).
  Lector's topic names the apps this copy carries from the copy itself (r120's list, empty in every edition but the master) and its
  recipe only where the recipe is (r126, the master's alone).
- Home's keys: `build/modules/r147.js` gives `IngHome.keys()`, the keys as Home shows them; the tour's step "The doors from Home" and
  the Guide's Home topic name them from it (Chat, Code, Adamas, Fabrica, Lector and Vesta in the master and full editions; Chat, Code,
  Adamas and Vesta in the gift and demo), where the step said "bring in a model, chat, Vesta and Adamas".
- `build/modules/r120.js`: the tour's step on the apps carried inside names them from the copy itself, so Lakay is named beside The
  Forge, Inkwell and Carpe Diem (carried since 6.55, at Build 17 since 7.09), and no edition's page holds a name it does not carry.
- `build/modules/r173.js`: each topic filed in its room by its id (Home in Start here, the others in Making and study), and its search
  words; `build/modules/r230.js`: three marks in the same thin line, a house, a cut stone and four tiles (Lector keeps the book,
  Fabrica takes the branch).
- What is new (`build/modules/r222.js`): a line marked "lector" is now shown only where Lector is (newNow knew "career", "fabrica",
  "desk" and "master", not "lector": the gift and demo editions listed 7.16's line on Reader's sheets). The 7.21 lines are marked for
  the editions they concern.
- `build/editions.py`: in the gift and demo editions, the tour's tip on who answers and the note in its menu (r250, r249) name
  Concordia, Adamas and Code only (they named Lector and Vocatio, which those editions do not have); in the full, gift and demo
  editions the Guide's topic of the apps is called "The apps", as the tour's step is there.
- rig: `t_627_editions.js` reads the tour's tips too; `t_626_guide.js`'s room lists with the new topics, by edition;
  `inject_modules.js` replaces a module that has no style block (it appended a second copy, which stood aside for the first).
- Checked and left as they are: Concordia's eight ways and Ingenium chooses (eight and one, as the tour says); twelve publishers for
  newer models (r217's list); the hourglass's ring, gold (#c8951f) as the tour says (a change of colour is a change of look).

Ingenium 7.20 (16 November 2026): Adamas's holder refined (her approved preview). Her words of 15 November: "I want you to refine and
sharp, crisps edges for the holder of the diamons on the Adamas page, it still looks fake on the side and generated and not refined enough
with the proper 3D look and definition"; on the live preview https://claude.ai/artifact/AwAEqd9S2QbZKtDbmZ8sFJ (Adamas Holder Finish,
version 1), 16 November 2026: "I approve ofthe preview, please push it everywhere and continue working on my requests."
- `build/modules/r292.js`, found: the holder is one turned outline traced in the shader, every corner rounded by the same radius (sdCase
  took 0.010 off), so no edge caught a crisp line of light; its rim, flare and foot were plain mirrors; by day each reflection was three
  tilted ones blended (a deliberate blur); by night the violet room's three strip lights had hard edges, and they reflected round the ring
  bevels as evenly spaced bright blocks (found by test: without the northern lights band the blocks stayed, with a plain room they went);
  and on a touch screen the scene was drawn at three quarters of the screen's sharpness.
- Changed, as the preview recommended: the rounding 0.0025; fine turned lines on the flared rim and its edge (520 to a unit along the
  outline) and a knurled foot (300 round), each fading where a pixel spans a line; by day one sharp reflection; by night the strip lights
  and the floor light with soft edges and less strength, the northern lights' thirty stripes calmed (0.86+0.14 from 0.55+0.45), the
  holder dark purple still (the compass's own night studio, tried, turned it grey: against her rule); a touch screen starts at full
  sharpness (q 1, not 0.75), a device that falls behind lowering it as before. The module equals the approved variant (scratchpad
  holder/var/BR) apart from its notes and the touch line (compared with the notes set aside).
- Checked (rig/t_720_holder.js, Chrome and Safari's engine, a computer and a touch screen): the scene compiles and draws, and is drawn
  at full sharpness, with no page or shader error.
- r222: the 7.20 news.

Ingenium 7.19 (16 November 2026): a narrow head stacked as on a phone (her approved preview). Her words that day, on the live preview
https://claude.ai/artifact/JjCSYt2uj824FQjzXpW16g (Ingenium Tablet Headers, version 1): "I approve of the preview and your
recommendations, please commit and push it everywhere and continue working on my requests."
- `build/modules/r307.js` (new, every edition): a head (.skh) narrower than 640 px takes the class skh-narrow, watched by a ResizeObserver
  (a window resize where there is none), and the rules the preview used, word for word: a phone's arrangement (r290, r296, r291's rules
  for a screen up to 760 px) for that head alone. On an iPad (heads 531 px) and on the Fire tablet upright with the menu open (497 px),
  the objects of Adamas, Lector, Vocatio, Fabrica and Vesta stood partly under their words (found on 7.16 to 7.18); they stand whole
  beneath them now. A wider head (a computer, a tablet held sideways, the menu closed) keeps its words and its object side by side.
  When a head changes, the window is told once (a resize event), as the heads that frame their pictures listen for it. The class is set
  on the next frame, not inside the observer's own call (Safari reported "ResizeObserver loop completed with undelivered notifications"
  on the first 7.19 page), and a head made later (Lector makes its own when its page first opens) is found as it is added.
- `build/modules/r291.js`: Vesta's pool is framed as on a phone when its head is stacked (it read only the window's width).
- Checked (rig/t_719_narrow.js; Safari's engine at an iPad's size, Chrome at the Fire tablet's and a computer's): each head stacked by
  itself with the preview's own height, to the pixel (Adamas 782 and 805, Lector 760, Vocatio 783, Fabrica 782, Vesta 630), its object
  beneath its words; at 1440 px each side by side as before; the pictures against the preview's, pair by pair.
- r222: the 7.19 news.

Ingenium 7.18 (16 November 2026): every seal and Home's orbs turned by the graphics chip in Safari's engine. Her words that day, on
7.17: "Yes, fix the larger seals the same way next and continue working on my requests."
- `build/modules/r306.js`: every seal of r104's kind (`.isl`), not the top bar's alone: Home's (132 px), Concordia's (70) and Vocatio's
  (53), and any other. Each seal's shadows are read from its own style (the drop shadows its head sets, in px of the drawing's own box)
  and its own light filter (the cast's blur and offset), and drawn again when the theme changes. A press on those seals plays a flourish
  that turns or beats the same layers through their rotate and scale (r175, r262, r290's SFL): each layer's animate is watched, and for
  as long as a flourish plays the part is handed back to its own drawing, exactly as before, and taken up again when it ends. A part's
  own animation starting or stopping (a head turned on or off, a page shown or hidden) is answered at once (animationstart,
  animationcancel). Home's six orbs: the bands slide behind a round cut and a soft round mask inside each drawing (oxsTurn, 600 steps a
  minute); the cut and the mask go to a wrapper (CSS clip-path and mask-image, read from the drawing: the circle, the mask's gradient as
  alpha from its luminance, in percentages), the bands to a drawing of their own slid by the graphics chip with the same steps; only that
  plain case is taken. Measured in WebKit (rig/t_717_wk_heat.js with PACEAB=1, everything as it was against rebuilt, two readings):
  Home 620 to 196 and 182, Concordia 512 to 150 and 178, Vocatio 413 to 221 and 250, chat 440 to 303 and 251, Settings 378 to 134 and
  183, the Guide 387 to 138 and 135. No endless animation inside a drawing is left on any page (tools listing them per page). Compared
  frame by frame (rig/t_718_seal_cmp.js): Home's seal a mean difference under 0.3 per cent of the range, the engine a little crisper;
  Home's whole head 0.02 to 0.07 of 255; one orb's face drawn flat and large (rig/t_718_orb_flat.js) at most 4 of 255, by day and by
  night. Found while testing the first 7.18 page, and fixed before release: a seal taken in hand on a hidden page (no size) had only its
  light's cast as a shadow until a press (Vocatio's), and a seal copied from one already taken in hand (r175, r262 and r290 copy the
  door's seal) carried that seal's layers (Concordia's had six shadows of three): r306 reads a seal's shadows again once it is shown,
  and cleans a copied seal (its layers taken off, its light filter's cast put back) before taking it in hand. Compared again with the
  whole page held at each moment: Concordia's seal 0.46 to 0.64 of 255, Vocatio's like it (the compass rose round it is turned by its
  own script between the two pictures). rig/t_718_seal_heads.js 22 of 22 (it now counts each seal's shadows against what its style
  and light ask, before any press, and sets aside two page errors 7.17 raises as well for the same presses: no speaker on this machine,
  a ResizeObserver note), rig/t_718_orbs.js 7 of 7, rig/t_717_seal_gc.js 13 of 13 (its theme check
  now reads the shadows' colours; its turning check two seconds apart, as the engine rests at each full turn). Chrome's web views keep
  every seal and orb as they were.
- r222: the 7.18 news (its Vocatio part a line of its own, flagged career, as the gift and demo editions have no Vocatio: rig/t_627_editions
  found it on the first 7.18 page, and the page was built again).

Ingenium 7.17 (16 November 2026): no cartridge blinks in Safari's engine, the empty cups deep, the top bar's seal on the graphics chip.
Her words that day, on 7.16: "Ingenium is still overheating and lagging and still move a bit too slowly on my devices, please fix this
issue. The purple catridge disappears or rather seems to glitch in and out of view from the turret when I click to spin it ... Right
now, the third purple cartridge is not very consistent on the turret."; "The empty cartridges look flat and their rims are very
different from the filled ones that are deep and hold the coloured balls, please fix this discrepancy in the 3D turret please."; "The
inside of the empty catridge cup should be lighter on Day mode and darker on Night mode, right now it looks a little off and unatural.";
and, on the first try: "You've made the inside of the cup too light on Day mode now, please fix that."
Safari's engine was run for the first time (Playwright's WebKit 26.6 build, its own libraries, outside the repository): the rig's
t_717_* checks below use it.
- `build/modules/r304.js`: the blink, found in WebKit. WebKit sorts the layers of a 3D scene by the depth of their middles; as the turret
  swayed, a cartridge toward one side sank below the plate's light (.tq-light, the plate's size), which then covered its ball for a frame
  or several. 7.16's flat cartridges did not reach it. The turret is now one 3D plane (.tq-tilt) and everything inside it is flat, drawn
  in the page's order; each part's height is a small shift that follows the tilt (sin of the lean, written on that part's own translate
  property), so the depth still shows. Spun in WebKit (rig/t_717_wk_spin.js, 18 frames): every ball whole in every frame (three readings
  under the check's line were its point on the rim; the frames were looked at); rig/t_716_turret_toy.js 28 of 28 in Chrome. Where the
  translate property is unknown (Chrome before 104) the parts keep no shift and nothing blinks.
  The empty cups: an empty cartridge has a full one's ring, seat and lip, and inside them a concave cup shaded as a bowl is; its metal by
  day halfway between the dark well (as before) and the plate, by night between the plate and the dark well (0.45 of the way), in a
  satin finish so it neither flares white by day nor falls to black by night. Each change was shown to her in pictures first.
  Heat: the loop no longer writes four values on the turret's root each frame (that restyled all its hundred parts); each layer's shift
  is written on it alone, only when it has moved. Measured in Chrome at rest after the first start's work (below): Mentes 131 to 124 ms of
  the main thread a second, its layouts 60 to 33 a second, its restyles 90 to 61.
- `build/modules/r306.js` (new, every edition; at work only in Safari's engine): the top bar's seal turned by the graphics chip. Measured on
  7.16 in WebKit (rig/t_717_wk_heat.js: the share of each second the page's main thread is taken, against an empty page), the seal's four
  parts that move inside its drawings (engine, ring, heart, glow) were drawn again by the processor every frame on every page, with their
  blurred light and shadows; holding them took a plain page to about half (chat 491 to 279), taking off only their light and shadows
  349 to 241, and holding every other animation changed almost nothing. Each part is now moved whole by the graphics chip (the rotate,
  scale and opacity of its drawing, by the browser's own Web Animations, with the keyframes read from the page's style sheet and the
  timing and easing from the browser); the engine's three shadows are layers of their own, each turned about its own offset, so they
  fall as before while the light stands still. After, in WebKit: chat 431 to 160 and 210, Settings 334 to 186 and 260, the Guide 437 to
  219 and 254, Ingenia 415 to 220 and 304 (two readings each). Frame by frame against the seal as it was (rig/t_717_seal_cmp.js, eight
  moments by day and by night, twice the pixels): a mean difference under half a per cent; the engine is a little crisper, as the chip
  turns it whole where WebKit drew its light softly. Minimal motion and reduced motion still it, and let it go again
  (rig/t_717_seal_gc.js, 13 of 13 in WebKit). In Chrome without a graphics chip the same change cost more (all processes 0.33 to 2.1 s of
  processor a second; with Chrome's software graphics chip both 3.6), so Chrome's web views (the Windows laptop, the Fire tablet) keep
  the seal as it was (3 of 3), as does Safari before 14.1.
- `build/modules/r290.js`: a head's facets are given a new colour only when it changed; whether a head is on screen is kept by an
  IntersectionObserver, not read from the layout every frame. `build/modules/r294.js`: the same for Fabrica's tree. Measured in Chrome:
  Vocatio 181 to 177, Fabrica 264 to 265, that is no change; Fabrica's 60 layouts a second come from the seal's parts, not the tree.
- Tried and taken out: moving the seal's parts by script thirty times a second (Chrome then restyled 150 times a second: chat 23 to 94,
  Home 55 to 252; no gain in WebKit); drawing Fabrica's tree off the page (Chrome then drew it on the main thread: its script 51 to 140).
- Found, not changed: the first start of a new version reads Ingenium's own page back (about 87 MB), fingerprints it and keeps it, and
  keeps the apps it carries (Carpe Diem, The Forge, Inkwell, Lakay): about a minute of work once (r120's seed; later starts only count
  what is kept). The heads' own seals (Home 132 px, Concordia 71, Vocatio 53) and Home's six orbs still move inside their drawings; the
  WebGL heads (Adamas, Vesta) cannot be measured here (no graphics chip).
- `build/modules/r290.js`, a finger on the Fire tablet (rig/t_716_touch_heads.js found it on 7.16 as well as here): on its screen in
  portrait with the menu open a head is about 500 px wide and its words lie over its object; Adamas's diamond answered a finger in 1
  place of 5. On a touch screen (hover: none) the words let a finger through to the head beneath, except on their keys and links: 5 of
  5, the test 26 of 26. Nothing is drawn differently. Found, not changed: at that width (and on an iPad, 531 px) the objects of Adamas,
  Lector, Vocatio and Fabrica stand partly under their words; a narrow arrangement is a new look, for a preview first.
- The 3D heads on an iPhone's and an iPad's screen, in Safari's engine (Playwright's iPhone 15 Pro and iPad Pro 11): all nine are drawn
  and stand within the screen's width (Adamas's diamond needs a few seconds to appear on this machine's software graphics).
- rig: t_717_wk_spin.js and .py, t_717_seal_cmp.js and .py, t_717_seal_gc.js, t_717_wk_heat.js; t_626_guide.js's room lists brought up
  to the Guide as it is (r250's four cards, Vesta's name), its check unchanged (it failed on 7.16 for the old lists alone). r222: the
  7.17 news.

Ingenium 7.16 (15 November 2026): the turret as a toy and the compact Models page (her approved design), Mentes, a finger in the
heads, lighter at rest. Her words that day, sending version 15 of the turret's live preview as "the approved turret redesign": "remove
the white outline that is around the big circle of the turret's surface, it is detracting from the overall look of the 3D design
especially on Night mode", then "Please make the edits that I requested and commit and push the approved design."; "The Models page has
been renamed to Mentes"; "The diamon and the overall 3D display of the Adamas page is not clickable on my iphone ... All of the 3D headers
of Ingenium's pages need to be clickable and animated when I press on them on my phone or Fire tablet"; and "Ingenium is possibly
overheating my phone ... I want my 3D graphics and animations to be preserved and run smoothly as well".
- `build/modules/r304.js` (new, every edition): IngTurretToy, version 15 of the preview without the pale ring the plate's face drew at its
  edge (read from its pixels: by day 1.33 times as bright as the face inside it, by night 2.29; now 1.03, the grain), standing in r269's
  head in place of the turret's drawing; it loads nothing. The compact layer of the same preview on the page's own markup (a room opened
  folds the head to a band; the four houses in a row, a house's models on one shelf, its keys passing each press to the row the page drew;
  More models in divider tabs; Downloads in a drawer; sheets in the window), put back after every redrawing of the lists; margins in place
  of gap in flex rows (Chrome 83). The toy draws only on screen, at thirty frames a second while only its sway moves; on a touch screen a
  finger moving up or down scrolls past it (touch-action pan-y).
  Her words the same evening: "the purple catridge disappears or rather seems to glitch in and out of view from the turret when I click
  to spin it": each cartridge's floor, ball and ring stood 0.4 and 0.6 px apart in 3D inside the turning plate, which Safari's engine sorts
  by depth at every frame; each cartridge is drawn flat now (transform-style flat on .tq-lens), in the page's order, the same picture
  (still, by night no pixel differs by more than 22 of 255, by day 28 of 846,400 by up to 34); Chrome showed every ball in every frame of
  310 recorded while spinning, before and after. Safari's engine is not on this machine.
- `build/modules/r269.js`: with the toy in place it draws nothing of its own turret, draws the rooms' cartridges as the toy's lenses (once
  for their colour, size and theme), makes them load nothing, says so to a screen reader, tells the toy after each paint
  (IngModelsTurret.onPaint, IngModelsTurret.chosen), and its card says a model loads from Your models.
- `build/names.py`: the Models page becomes Mentes (her choice): 33 exact phrases, the tour's chapter, the tables keyed by it
  (XLINE, the teasers, insertAfterChap, lastOf) and the help's name included; ordinary uses stay (Models and AI, Models and devices, Models
  kept for a stronger computer, the catalogue's group label, Who answers' list, Models on this device, the papers' titles).
- A finger in the heads (rig/t_716_touch_heads.js, a phone's screen, a finger's taps against a mouse's presses on 7.15): Adamas answered a
  finger in 1 of 5 places against a mouse's 5 (r292: whether a press was on the stone was read from the hover a mouse leaves; a finger's
  press is placed where it lands now: 5 of 5); Lector's sheets 1 of 5 against 3 (r290: the stack's 3D holders, flat boxes at its depth,
  covered sheets set behind it until a hover lifted them; they let a press through now: 4 of 5). The other heads answer a finger as they
  answer a mouse. Safari's engine (the iPhone's) is not on this machine.
- Lighter at rest (rig/t_716_rest.js: a phone's screen at three pixels to the point, the processor slowed four times):
  `build/modules/r305.js` (new) holds a head's endless animations while it is out of sight and lets them go on where they stood (Home
  scrolled to its foot: 121 running animations, now 20; Concordia 22, now 12; Vocatio 22, now 12); r290: Vocatio's compass draws thirty
  frames a second while only its sway and rings move (32 frames a second asked for at rest, now 19 under the slowed processor), and
  Minimal motion stills it at rest (it stayed tilted, also on 7.15). Found, not changed: the seal's turning parts and Home's orbs are
  animated on SVG shapes, which keeps the main thread drawing every frame (on Home 30 ms a second of style and 19 of layers at its foot).
- r144: the help's Models topic says where a model loads; r222: the 7.16 news.

Ingenium 7.15 (15 November 2026): the top bar as before 7.14, the headers said once, Ingenia and Vesta, Ingenia in divider tabs,
Schedae's keys. Her words that day, on 7.14: "I hate the conneted raised bar that holds Ingenium's engine button logo and the Ingenium
title ... I dislike it and want it removed and the old separated look of the engine button logo and the title. As far as the top bar
itself, you made all of the buttons flat which I hate and made then wider and longer ... I only wanted the top bad tidied up and be more
organised ... restore the animated popped out 3D look of the top bar's buttons." (Rule kept: tidying is organising, never larger, wider,
longer or flatter.)
- `build/modules/r301.js` (rewritten): every key back to its 7.13 size, face, depth and motion; no capsule (the readings' shadows had been
  clipped), no plate behind the seal; organised only: 3 px between keys, 9 px before the actions (8 on a phone), spaced by margins
  (Chrome 83), the hide key round, 21 px (28 at 760 px and less, with the keys). Kept from 7.14: the seal never squeezed, r174's steps.
- The headers (her words: "Ingenium's pages headers always repeats both the app's title and the pages' titles on their 3D header cards
  which isn't always necessary and can read as superfluous, please tidy that up and make it read better"): the line above each title
  says only what the page is for. r262 (Concordia), r263 (Ingenia), r269 (Models), r290's hero (Vocatio, Lector, Vesta, Adamas,
  Fabrica: the page's name taken off the front); `build/modules/r302.js` (new) keeps Home's h1 (Ingenium) for screen readers only.
- `build/names.py`: Folders becomes Ingenia (her choice) and Focus becomes Vesta (her choice; Ancora the backup): 28 and 39 exact
  phrases, the tour's chapter names and the tables keyed by them included; the page ids, data and code keep folders and focus; the
  ordinary words stay (Folders for the chat, the Focus room, the timer's Focus phase, Focus and time, Calm and focus).
- `build/modules/r300.js`: the Ingenia page in divider tabs (her choice of the 7.10 preview's other design), one of its four parts at a
  time at its full size, with a View switch (Divider tabs, Compact) kept on this device (localStorage ing:r300:homeView).
- `build/modules/r303.js` (new): Schedae's keys made Ingenium's own (her words: "The purple keys inside of Schedae's panels look really
  glossy and buttery and have a different texture and animation"): .btn, .btn.danger and .btn.primary in place of the Forge's recipe;
  Tabula and Abacus as their own cut stones (.gem-go.tabula, .gem-go.abacus), as she asked.
- Tests: `rig/t_714_topbar.js` follows 7.15 (21 px keys, nothing joined, no plate, 3 and 9 px).

Ingenium 7.14 (15 November 2026): the top bar, tidied. Her words that day: "I need you to neaten and tidy up the top bar and its
buttons, it might slightly" (the message ended there). On the live preview (https://claude.ai/artifact/Ewwa5ypsZWVGAkYDm5mYd4,
version 1), which recommended one capsule for the readings, 28 pixel keys and the INGENIUM plate raised: "I approve of your
recommendations, please push it everywhere and continue working on my requests."
- Measured on 7.13 in a browser: at 1440 and 1280 pixels one bar held three heights (30, 20, 21 px), three corners (9 px, 5 px, round)
  and three type sizes (13.3, 13, 11 px), 2 to 4 px apart; when the bar was short of room the seal was squeezed under the first key
  (with a model's name filling its key, on a 390 pixel phone 7 px off the left edge and 9 px under the key; with no model, at 360 px;
  in a 720 px window 4.5 px off the edge), because r174's fitting only saw a bar wider than the window, and the shrinking seal kept it
  from ever being wider. On a 320 pixel touch phone the keys wrapped to two rows.
- `build/modules/r301.js` (new, every edition): every key 28 px tall, round (the hide key too), 12 px type (11.5 at 1100 px and less),
  6 px apart (4 at 1100 and less), spaced by margins (Chrome 83 has no gap in a flex row); the four readings joined in one raised capsule
  (its first and last shown reading marked by the script, so the capsule closes on whichever is hidden); 16 px between the readings and
  the actions; the seal never shrinks; on a phone Studio shows its pencil alone (its word stays for screen readers); a long model's
  name shortens with an ellipsis before r174 shows its dot alone; the INGENIUM plate raised, lifting and sinking.
- `build/modules/r174.js`: a new step between the seal and the signs, the engine's words first (ing-tb-eng); the bar's right margin
  counts as the edge; a bar whose keys wrap counts as short of room (so a 320 px touch phone keeps one row, 43 px instead of 75); and
  Who answers (r244), the model key's menu, is fitted inside the window and its safe areas like the other panels (on 7.13 it ran past
  the foot of a 320 px phone and into the notch of a phone held sideways: 8 failures in the test below, none now).
- Tests: `rig/t_714_topbar.js` (new, 280 checks: nineteen widths from 1440 to 360, with no model and with a long invented model name,
  nothing past the edge or the bar's margin, no key over another, the seal whole and clear, every key 28 px, a model's name readable or
  its dot, the capsule closed; the spaces, the round hide key, the plate, night, a reading rising, Studio's name, the clock; 320 px
  touch in one row). `rig/t_68_phone.js`: the model's key opens Who answers since 6.46 (the test still waited for Models and left the
  menu open over the next key, so it stopped at 320 px); it now checks that menu inside the window and closes it. Its 4 failures in
  Guide and Settings at 375 px (an icon 1 or 2 px past the left edge) are the same on 7.13.
Ingenium 7.13 (15 November 2026): Blend becomes Concordia, Build becomes Adamas (7.12 was taken by the other session the same
night, for every app's kits). Her words that day: "I am thinking of renaming the
Focus, Folders, Blend and Build pages since their names seem so basic and without an identity." Her choices: "Concordia (Recommended)"
for Blend; for Build, "I'll try Adamas for now and the Build name as backup" (her vision: "the diamond is there to signify a diamond in
the rough beign chiseled away in code by the artist and being refined into brillance"); Focus and Folders keep their names.
- `build/names.py` (new): the pages' names on screen in one place, 71 exact phrases (35 for Blend, 33 for Build, 3 holding both), each
  required in the master edition (the build stops otherwise); `build_page.py` applies it to every edition after `editions.apply` and
  `editions.strip`, so the editions' own exact edits still meet their words. The page ids, data and code keep blend and build. What is
  new keeps its history as written. To go back to Build (her backup), take its phrases out of names.py.
- Found by reading every on-screen text, tooltip, label and tour, help and Guide line of the 7.11 page in a browser, then every
  occurrence in the built page (153 places; comments are already out of a release page). Left as they are, the ordinary word: Build
  your own AI, Build kits for your devices, Build an app with the model (Code), build numbers, Build my record, Build Mac App.command.
- Tests: `rig/t_700_heads.js` and `rig/t_62_apart.js` accept the new names; `rig/t_626_guide.js`'s version check no longer expects a
  version beginning with 6 (it had failed on every 7.x page; the Guide's foot says "You are running Version 7.11" correctly).
Ingenium 7.12 (15 November 2026): every app's kits are its own. Her list for Fabrica (7.05) asked that another app's kits never
carry Ingenium's own files or logo, that each app have its own icons and no errors, and that each device's kit build in the terminal as
well as on GitHub. Fabrica's audit of 14 November 2026 found that an app whose page carries no packaging templates of its own (every app
but The Forge: Carpe Diem, Inkwell, the apps made in Build) was shipped from Ingenium's own repositories, renamed (modules/r178.js,
ownKit): its Fire tablet kit held Ingenium's model engine (Bridge.java, NativeEngine.java, ModelLibrary.java, the JNI glue and the
native engine), its iPhone and iPad kit Ingenium's Swift engine and bridge, its Mac kit Ingenium's key tool.
- `build/kits/family_templates.py` (new) reads The Forge's own templates (`apps/builtin/forge.html.gz`, its `<script id="cd-pkg-src">`)
  and makes them the family's: the owner becomes `__APP_OWNER__` and the year `__APP_YEAR__`; the Fire project's Java package
  `__APP_NS__` (its folder `__APP_NS_PATH__`); The Forge's seal and Carpe Diem's licence and terms are dropped; the guides speak of the
  app itself and say "Made by Fabrica" (each change must find its text exactly as many times as it says, or the script stops; the
  Windows guide's CRLF line endings are kept); it refuses to write a template that names the owner or Ingenium anywhere. It adds Gradle's
  own wrapper (`kits/gradle`: gradlew, gradlew.bat and gradle-wrapper.jar, as Gradle made them, Apache 2.0), a terminal build of the APK
  for a Mac and for Windows (`kits/family/fire`: "Build the APK.command", "Build the APK (Windows).bat" with `build_apk.ps1`: Java 17
  to 21, Android Studio's own when no other fits; the Android tools; the permanent key made in the folder "signing" as GitHub's first
  build makes it; `gradlew :app:assembleRelease`; the APK beside READ ME FIRST.txt), a terminal build of the Windows program and its
  installer (`kits/family/windows`: "Build __APP_TITLE__ (Windows).bat" with `build_windows.ps1`: Python 3.12, the build tools pinned
  as GitHub's recipe pins them, PyInstaller, then Inno Setup 6 with the same defines as the recipe; without Inno Setup the program
  folder alone), a part in each guide on building on her own computer, and a .gitignore for the Windows project. The .bat and .ps1
  files have Windows line endings, the .ps1 a byte order mark (Windows PowerShell 5.1 then reads an accented name as written). It
  writes `modules/r299.js` (new, every edition): the templates compressed (670,445 bytes, 213,675 compressed), unpacked once with
  Fabrica's own inflater (IngRepo.core.inflateZ, in every edition), else the browser's DecompressionStream; `IngFamilyKit`.
- `modules/r178.js`: an app with no templates of its own, other than Ingenium, is shipped from the family's packaging exactly as an
  app is shipped from its own (`templated`): its name, file stem and id, its icons drawn from its own picture (`ownPicture`: its page's
  icon, else its seal, else its initials on its colour), its owner (`ownerName`: Lector's author, so the profile's name, and in the
  master edition its author; else the app's own name; letters, digits, spaces, full stops and hyphens only) and the year; the Fire
  project's Java package (`nsFor`: the activity name an earlier package of the app kept, from Fabrica's table of the family's apps,
  so a home screen icon still points to it; else the app's id; a word Java keeps for itself is given an underscore). Ingenium's own
  page (or Fabrica's repository of it) keeps Ingenium's own projects, which alone carry the model engine; another app is never given
  them, and a kit that cannot be made from the family's packaging is refused with the reason. The web kit (the Build page's,
  Download as an app's and Fabrica's web app card) comes from the family's packaging too; the old Build page's rows name the packages
  it makes; gradlew and every .command or .sh file is kept as a program in the zip; a kit kept before 7.12 is let go once
  (`ing:r178:since712`).
- Proved here: the Fire kit of an invented app ("Tide Clock", com.example.tideclock, by an invented "Ada Example"), unzipped, built
  by its own "Build the APK.command" on Linux with Java 21 and Google's command-line tools (16111833): exit 0 in about a minute,
  tide-clock.apk, package com.example.tideclock, label Tide Clock, launchable activity com.example.tideclock.MainActivity, minimum
  Android 22 and target 34, signed "CN=Tide Clock, O=Ada Example", its launcher icon its own initials on its own colour, no file
  naming Ingenium. `.github/workflows/kits-proof.yml` (new) builds the six kits of that app (`rig/kits_proof`) on GitHub's machines,
  each by the build its kit gives: the APK on Linux and Windows, the Mac app on Apple silicon (the Mac mini kit) and Intel (the
  MacBook kit), the iPhone and iPad app by its Xcode project, and the Windows program and installer, then installed and removed
  silently (the program, its Start menu entry and its entry in Settings, Apps, then none of them).
- Tests: `rig/t_712_kits.js` 52/52 (new): every device's kit of the invented app from the family's packaging, with no file of
  Ingenium's and no text naming it, no placeholder left, the owner and the year in its licence; its icons its own (its initials on
  #3a7bd5; a page's own icon when it names one); the Fire project's own Java package, Gradle's wrapper byte for byte with gradlew a
  program, both terminal builds making the key in the app's and the owner's names; the Windows terminal build with the pinned tools;
  a family app's earlier Java package kept; an app's own templates still first; Ingenium's own page still its own projects; the web
  kits; the app's own name as owner when the profile has none (as in a public edition); a refusal when the family's packaging cannot
  be read; the six packages saved.

Ingenium 7.11 (15 November 2026): Fabrica's runs on Windows no longer fail at random.
- Found by GitHub's Windows build of 7.10 (run 43665002267), which failed its own self-test: the self-test's run ended "bad" with its
  second job's second step still "queued" (it should be "skipped"). The engine itself answered. Cause: a run's record
  (runs/<id>/run.json) is put in place with os.replace while the page, and the self-test, read it every 0.3 s from other threads; on
  Windows a file another handle holds open cannot be replaced (PermissionError, "Access is denied"); the exception left the job's step
  loop at once, its later steps unmarked, and the job ended bad. A good run on the HP laptop could fail so at random; 7.08 and 7.09's
  Windows builds passed by timing alone.
- `desktop/app_runs_710.py` (new; release.py's DESKTOP list, after app_runs_708.py; mark `_runs_io`): one lock around every read and
  write of a run's record in the computer app, and a replace or a read that meets PermissionError tries again for up to two seconds
  (a scanner such as Windows Defender can hold a new file for a moment), then raises, so a lasting fault is not hidden.
- Tests: `rig/t_711_runs_io.py` 5/5 on the Mac and the Windows app (Windows' rule imitated on Linux: 7.10's code refused 399 and 400
  times in 2,000 calls of a writer and four readers; with the fix none, every read whole; refused twice then put in place; refused
  for good it raises after 2.0 s); `rig/t_708_runs.py` 32/32 on both (dulwich 0.22.8 installed for it).

Ingenium 7.10 (15 November 2026): Folders without endless scrolling. Her words that day: "The Folders page and the apps pages inside of
the Folders page are really long and I have to scroll endlessly, please fix that as you continue working on my requests"; then "I
approve of the compact page design for the Folders page, I want you to give any other long pages inside of Ingenium the same treament
that would significantly improve the app's visuals and accessibility design"; and on the live preview
(https://claude.ai/artifact/4m4wnK9mduJpf7XazDLVH7, version 1, drawn from the 7.09 page's own markup and styles): "I approve of your
recommendation for rge Folders Without Scrolling preview, please push it everywhere."
- `modules/r300.js` (new, every edition): on the Folders page (fw-home), Your apps in one row without the "+ A folder for another app"
  card (the head holds that key), the build library and How I work side by side, the six envelopes in one row, each one's instructions
  in a raised sheet in the window when pressed (no film; the sheet's keys press the envelope's own keys, so Bring in the .zip opens the
  file window); with a folder open (fw-open), the drawer of apps folded to its front (pressing it unfolds), divider tabs on the
  folder's papers with one paper at a time (role tab and tabpanel, the arrow keys move between them), and in How it was built one drawer
  open at a time, an open drawer capped at 372 px and flipped through with the wheel, its scroll bar hidden. The paper and drawer chosen
  are kept for the session when r208 draws the folder again. Its marks go inside the papers, never among #fldBody's own children, which
  r263 watches; it watches #fldBody for nodes added or taken away (r258 builds the drawers a moment after a folder is drawn), gathers one
  moment's changes into one dressing and drops the records of its own marks; every class and attribute is written only when it changes,
  so nothing is rewritten while the page is left alone. On a phone (r263's fd-phone, since 6.71) the envelopes stand two to a row.
- Measured at 1440 by 900 with an invented library (six apps, 144 notes): the Folders page 2.04 screens (2.9 on 7.09); a folder of 24
  notes, open, under two (4.8 on 7.09); the head 159 px with a folder open (480).
- Tests: `rig/t_710_folders.js` 21/21 (new); `rig/t_708_drawer.js` 11/11 (its pull check now accepts a drawer that begins shut, as one
  drawer stands open at a time); t_669_folders 32/32, t_665_buildlib 38/38, t_685_folders 37/37, t_680_old_webview 12/12 on a 7.09 page
  with r300 put in (`rig/inject_modules.js`).
- Other long pages measured on 7.09 (fresh profile, 1440 by 900), for the same treatment, each with a live preview first: the Models
  page's rooms Ingenium's models 4.8 screens, More models 4.4, Downloads 2.9; Build 3.0; Settings and the studios' rooms to be measured
  one at a time with invented data.

Ingenium 7.09 (15 November 2026): Carpe Diem 1091 with its needle points, Lakay brought up to date again, and no edition but the master
carries the master's own news. Her words, sent again that day: "the Lakay app has been updated to a later build, please update
Ingenium's copy to bring it up to date"; and, asked how to go ahead with the needle fix, "New Carpe Diem build".
- Carpe Diem 1091 (14 November 2026, 528171091; DevGroup2313/Carpe-Diem-Gift, branch claude/carpe-diem-security-build-fixes-cdaoxj,
  commit 29ad064, `Mac project/carpe_diem.html`, 49,370,671 bytes, SHA-256 943d91f1...) replaces 1089 in `build/apps/builtin`
  (`apps/update_builtin.py`). It was made by the session that wrote the 7.08 handoff, after it, and never carried until now: its one
  change is the Library's Thread showing its needle points again (her words, 14 November 2026: "The needle or thread, should be the
  visuals on the Thread tab inside of the library, its the golden thread with the needle points on the left side of the page next to
  the books' spines."). Pass 1070's resting step judged an element drawn at no size as unseen, so a knot that grows from nothing was
  held still at nothing; 1091 judges such an element by the place of the nearest element around it that has a size. Carpe Diem's own
  test, `source/carpe_diem_1091/tests/t_needle.js`, run here on 15 November: 4/4 on 1091 (3 of 3 knots in view grown and moving, 6 of
  6 twinkles shown, what cannot be seen held still, no page error), and with `--expect-bug` 2/2 on the 1089 Ingenium carried (3 knots
  held at nothing). Pictures of the Thread by day and by night were sent to her, never committed.
- The Offline Project's Public sample is Carpe Diem 1091's (DevGroup2313/Carpe-DIem-Demo, `index.html` at e77bbea, 12,212,116 bytes,
  SHA-256 04221fde...), in place of 1081's (`apps/demos/make_demos.py`, then `make_cd_demo.py`: 12,171 runs of 1091 and 8,359,987
  bytes of its own text; The Forge's demonstration came out byte for byte as before). Lector's measured record (`recipe/recipe.json`):
  49.4 MB and 73,140 lines (1091), counted as the page counts them (`text.split("\n").length`). `rig/t_709_cd1091.js` (t_681_cd1089
  checks 1089 and no longer applies).
- Not done: the committee demonstration (Carpe-Diem-Offline) stays at 1090 until it is sealed again with its access code, which no
  repository holds; Carpe Diem's iPhone and iPad repository (Offline-ios, `iphone-ipad/`) holds a build of 19 October 2026 by its
  BUILD_INFO, and stays so until she says to bring it to 1091 (Carpe Diem's `release.py notes.json ios REPO FULL_PAGE.html`).
- Lakay Build 17 (14 November 2026, "Learning, with a lesson for each part of the work, a guided tour that does the work in front of the
  person, two questions to finish each lesson, and a tip in every room"; the same page in Lakay-Windows, Lakay-Mac and Lakay-Apps,
  1,557,498 bytes, SHA-256 c4e2305704ea8f50...) replaces Build 14 in `build/apps/builtin` (`apps/update_builtin.py`). Its mark is
  unchanged: `apps/lakay_mark.py` on Lakay-Windows' sources writes `builtin/lakay_mark.json` byte for byte as before (sixteen planes by
  day and by night, ten on the still seal). Its own colour is still #5f67cc.
- A fault found on the way: 7.07's master-only line of What is new ("Lakay is up to date ... Lakay Build 14") was never added to
  `editions.py`'s list of lines taken out, so the full, gift and demo editions of 7.07 and 7.08 carried it in their pages, unseen (no
  edition but the master shows a line marked "master"), and so did eleven older master lines naming her other apps (Carpe Diem, The
  Forge, Inkwell, the Offline Project). `editions.py` now takes every line marked "master" out of every other edition (`_no_master_news`,
  entry by entry, the rest of the list kept in its order; the build stops if the list holds anything but news lines). On the 7.08 gift
  edition: 26 lines out, 151 kept, "Lakay" twice before and nowhere after, nothing else in the page changed.
- `rig/t_627_editions.js`: two checks for each edition but the master, on the page's own text: no What is new line marked "master",
  and the word Lakay nowhere.

Ingenium 7.08 (14 November 2026): the folder search's detail check and who answers; Folders' card drawer. Her words that day, on the two
live previews: "I approve of your recommendations for both of the Folders previews and choose the "card drawer" preview design";
"For the Folder search, I agree with your recommendation"; and "Please make sure that there aren't any flat and plain surfaces on
Ingenium as you continue working."
- The folder search, phase 6 (`rag/prompt.js` guard; `build/modules/r257.js`): every answer from her folders is checked against the
  passages it was given, after the second pass. A sentence must cite a passage that holds its exact details (numbers, dates, weekdays,
  months, names, codes), standing together where they must; what the question states is given; a passage is its label too; a missing or
  wrong citation is mended where it stands; what no passage supports is taken out and listed under the answer, open, with the reason
  and the answer before the check beside it (Settings can make it only mark them); nothing left gives NOT_FOUND. With Your folders on,
  sending first asks who answers (`#ragWho`): this computer's model, its larger one when ready (Magister), and each connection she keeps
  (`state.cxKept`), the strongest recommended, what leaves the computer named beside a connection; Not now sends nothing and says so;
  Ask me each time can be turned off in the sheet or in Settings. The reply says who answered. `build/modules/r202.js`: the two switches
  in Folders for the chat. Measured (`rag/eval/RESULTS.md`, runs 4 and 5): with the 2B, every sentence cited in 15 of 20 answers as
  given and 20 of 20 after the check; with the 9B, 20 of 20 as given; no right answer lost to the check. What it cannot see, kept on
  record: a true detail in a false relation, and a name carried into the wrong sentence.
- Folders, How it was built as a card drawer (`build/modules/r258.js`, the master edition's): each part of an app's notes is a drawer
  of index cards, its name and count on a label in a silver frame, a silver pull to open and shut it; a card rises out of the drawer
  under the pointer and shows its first lines, sinks with Ingenium's key sound when pressed, and is drawn out as its note opens; the
  front card shows its first lines; the finder sunk, its finds raised. Written for the Fire tablet's web view (no inset, no flex gap;
  hover and keyboard focus in rules of their own).
- Ingenium's own rules (`build/modules/r297.js`): No flat or plain surfaces, with her words.
- Tests: `rig/t_708_rag6.js` (the check and the chooser in the chat, with a stand-in model and a stand-in connection), `rig/t_708_drawer.js`
  (the drawer, with an invented library), `rig/t_rag6_guard.mjs` (47), and `rig/t_rag3_chat.js`, `rig/t_665_buildlib.js`, `rig/t_707_rules.js`
  brought up to date.
- Fabrica, phase 3, its first stage (`build/modules/r298.js`, `build/desktop/app_runs_708.py`), built from the live preview she approved
  (`previews/fabrica_p3`; her words, 14 November 2026: "I approve of the Fabrica on Every Device preview, please commit and push it
  everywhere"). Runs, a fifth room between Plans and Care (GitHub's Actions), with its tabs Runs, Workflows and Machines. Workflows reads
  the app's own `.github/workflows` files as GitHub reads them (a YAML reader that gives what a standard one gives on Ingenium's own 23
  workflow files; GitHub's expressions, matrices, needs, inputs, `if:`, env and defaults), with when each runs and its jobs. Run it now
  asks where each job runs (each on the system it names; on a Mac, Linux jobs here too; every job here) and the workflow's own inputs.
  In the Mac and Windows apps the run happens on this computer: each job in a folder of its own, the app's files at the version kept
  (from the drive itself for a repository on the drive, sent by the page for an app kept in Ingenium), every step and its whole log as
  it grows, Find in the log, `GITHUB_ENV`, `GITHUB_PATH`, `GITHUB_OUTPUT` and the step summary as GitHub gives them, checkout, the setup
  actions (this computer's own Python, Java and Node), upload-artifact and download-artifact; a job for another system says why it did
  not run; Stop, Run it again, Re-run the failed jobs, Remove this run; the files a run made kept with it (Save, Add to its release, Show
  in Finder or Explorer); Explain this error by her own model, on this computer; every run kept, numbered for each app, with no expiry.
  Recipes write a workflow file as a change to keep. Machines: this computer and its tools, checked (Python, PyInstaller, Java, the
  Android tools, Xcode, Inno Setup, WebView2, git, Node), what each builds and where to get what is missing; her Mac mini and HP laptop,
  and GitHub's machines, said to come next. Story, Releases: every device on its own row, Install on this Mac (into Applications, or her
  own Applications folder) and Install on this PC (her programs folder, the Start menu and the desktop, and Settings, Apps to uninstall
  it), Make it for a device not made yet, Make the missing ones. Needs you, at the top of Your apps: failed runs not yet seen, runs
  going, milestones due within a week, pull requests waiting, versions ready to ship. Learn in every room (what it is, its names on
  GitHub and in git, why it matters, Show me), Every word side by side, and Learning mode (a key's names beside it). Ship says where each
  package is made. Every new surface has its depth, as her second rule asks. Learning mode's caption is Ingenium's purple, raised as its
  pressed keys are, and a pale violet card by night (her words, 14 November 2026: "Please make that black little popup card card purple
  or white or a different colour in Ingenium's colour palette, the black colour detracts from the page, please make that fix for any
  black card popups inside of the app in Day mode that has the same issue"). The app's other popups by day were measured on the page:
  its tooltip takes the paper of the surface under it (white), and its notices are white; none is dark.
- Vocatio's compass (`build/modules/r290.js`). Her words (14 November 2026): "The little thin purple inner circle inside of the engine
  button is smaller inside of Vocatio's 3D compass and keeps on moving out of sync with the compass ... the Blend page's engine button
  had the same issue but its fixed now". Measured on 7.07: the button swayed in 3D on a clock of its own inside the compass, and its ring
  lay lower than its star, so the ring slid up to 2.4 pixels about the star. It is now held as Blend's is in its wheel (`r262.js`): no
  sway or tilt of its own, its ring, star and heart at Blend's heights, the ring turned as the base page turns it. The ring now keeps
  within 0.11 pixels of the centre (Blend's within 0.16), at Blend's proportions.
- Build's diamond (`build/modules/r292.js`), its press only. Her words (14 November 2026): "The animation of the diamond on the Build page
  is way too fast, please slow it down and give it a more natural speed, please match it to the rest of the app's animations"; then "I
  meant the animation of the diamond when I click on it ... please don't change anything there [at rest]". The flourishes were the engine
  button's, made for a seal a few centimetres wide; on the stone a spin turned it at up to 1,126 degrees a second. Each now takes the
  time a stone of its size would, on the engine's own clock: a spin in 3 s (334 degrees a second at most), a twirl in 3 s, a pulse in
  2 s, a hop in 1.9 s, a beat in 2.25 s, with lighter swells (8 to 10 percent, from 23 to 26) and a softer press and spring; Calm
  stretches them as it stretches the engine (13 to 9); Minimal keeps the stone still. Its resting motion is unchanged.
- The nature sounds (`build/modules/r295.js`, `r176.js`). Her words (14 November 2026): "The new "Sounds" button on the top bar should
  be added to the Settings page as well as to the display panel and should be removed from the top bar, however there is already another
  "Sounds" button inside of the Display panel, please fix this as well." The top bar keeps no Sounds key. The Display panel and Settings
  hold one Sound section with its two kinds named apart: Ingenium's sounds (the keys, cards and reminders, as before) and Nature sounds
  (Quiet, Stream, Rain, Waterfall, Waves, Birds, Night and Wind, their volume, and a note of what plays); both places show the same
  choice. Nothing else is called Sounds.
- Tests: `rig/t_708_core.js` (the workflow reader, GitHub's expressions and the run's plan, in Node), `rig/t_708_runs.py` (the computer
  app's runs on Linux), `rig/t_708_fabrica_runs.js` (the Runs room with the computer app's own back end); `rig/t_700_heads.js` and
  `rig/t_67_sound.js` brought up to date.

Ingenium 7.07 (14 November 2026): Lakay brought up to date, and Ingenium's own rules built in. Her words that day: "the Lakay app has
been updated to a later build, please update Ingenium's copy to bring it up to date."
- Lakay Build 14 (14 November 2026, the same page in Lakay-Windows, Lakay-Mac and Lakay-Apps, SHA-256 cbc77d33...) replaces Build 6 in
  `build/apps/builtin` (`apps/update_builtin.py`). Its mark is unchanged: `apps/lakay_mark.py` on Lakay-Windows' sources (the one
  repository that carries `src/`) gives the same sixteen planes by day and by night and the same seal. Its own colour is now #5f67cc
  (#6f78d8 in Build 6), read from the page as before; `rig/t_655_fixes.js` now reads the colour from `builtin.json` instead of naming it.
- Ingenium's own rules in Ingenium's folder (`modules/r297.js`, the master edition's alone), from the other session's sources:
  `rig/t_707_rules.js`.

Ingenium 7.06 (14 November 2026): two faults found on 7.05, mended. Her request that day: "Please continue working on expanding the
Fabrica page and continue with the rest of my requests"; checking Fabrica's shipping and the Offline Project before building on them
found both.
- Fabrica's header did not follow an app opened by pressing its card in Your apps: it kept saying "No app chosen yet" and showed the
  example tree. The header (`modules/r294.js`) wrapped only `window.fbHubHost.paint`, and a press inside Fabrica calls Fabrica's own
  paint, never the exported one. `modules/r112.js` now tells the listeners in `window.fbAfterPaint` after every paint, however it is
  asked for, and r294 listens there. `rig/t_696_fabrica_head.js` presses the card itself (7.05's test set the choice and called the
  exported paint, so it passed).
- The Offline Project could not be made from 7.00 to 7.05 ("A part of Ingenium (r158-css) is not in this copy's page"): the demo
  edition's recipe names r158-css, a style block whose rules were all comments and which now holds only a line break, and
  `modules/r268.js` refused any part whose text was blank. A part is now taken as it is and checked by its length, as the recipe
  records it. Checked on a copy of the 7.05 page with only this change: the Offline Project is made whole.
- `rig/t_67_kits.js` finds the app library's apps as tiles in the Bring an app in sheet (6.61 on), and as a list before.

Ingenium 7.05 (14 November 2026): Build's starry night. Her words that day: "I want it to be a starry night in the landscape with the
northern lights"; "I want sparkles and shimmering lights throughout the landscape not just concentrated on the diamond. Use the fictional
city of Velaris from the Court of Thorns and Roses as inspiration for this"; "I want the sparkles added to the atmosphere in a light and
enchanting manner and I want a beautiful starry night"; on the first version: "The sparkles and stars look a bit too much here, please
reduce it a little to give it a more natural and fairytale-like vibe instead"; then "I approve of everything from this preview, please
commit and push it everywhere!". In `modules/r292.js`, on the sky's own canvas only (its shader, BGFS; the diamond's drawing unchanged):
- by night, stars over the card above the horizon: about one in four of the 20 pixel cells holds one, mostly faint (brightness cubed),
  each with its own size and a white, lilac, ice blue or pale rose tint, twinkling slowly on its own clock; only the very brightest have
  a small four-pointed glint; fainter behind the words and toward the horizon;
- a star falling slowly now and then on two paths (every 21 and 30 seconds, each fall 2.8 seconds), with a soft tail;
- a few fine sparkles drifting through the air, each twinkling briefly with a small glint (by night white; by day white over a soft violet
  glow, fewer);
- Velaris lent the mood only (a city of starlight, stars falling slowly); the colours stay Ingenium's, with no gold.

Ingenium 7.04 (14 November 2026): the engine logo on Build's holder, by night, in deep indigo. Her words that day: "Please also remove
the charcoal inside of the engine logo on the diamond's holder and make it a different colour that complements the design better without
removing the logo engine symbol from the Holder. I want to see it before I fully approve of it. I only want this done to the dark mode look
only"; then "I approve of the deep indigo face". In `modules/r292.js`: by night the logo's face is a deep indigo enamel (#3e2f86 to
#17113a) instead of the charcoal (#372d4d to #1a1524). Four violets and a plum were rendered against the night Orrery; the deep indigo
sits with the Orrery's enamel and keeps the star about as clear as the charcoal did (screen contrast between the star's lit side and the
face about 5 to 1, the charcoal about 5.5 to 1). The symbol (rim, ring, star, heart) and the day look are unchanged.

Everything else about the diamond is exactly as in 7.03. The same afternoon, on the live preview only, the diamond was given more and
larger sparkles, glittering points, starburst rays and a shimmer on its facets, and its sky the full spectrum and then a starry night;
at her words ("The sparkles and shimmers on the diamond is too much, I already told you to reduce and remove them"; "The whole thing
looks horrible, revert it back") all of it was reverted, and none of it was released.

Ingenium 7.03 (14 November 2026): the build library adds what is brought in. Her words that day: "I want you to make the app be able
to receive new nopes or recipes without wiping all stored notes please". Until 7.02 a zip brought into the build library
(`modules/r258.js`) took the place of the whole library: save() cleared the store before keeping the zip's notes, so a zip of a few
notes, such as a recipe, would have taken away every other note. Now the zip's notes are added to those kept: a note at the same place
(its app, its folder and its name) is replaced by the newer one, and every other note stays; the line said afterwards gives how many were
added and updated. The library's card says so, and its key reads "Bring in more notes"; Remove it from this device still takes the whole
library away. `rig/t_665_buildlib.js` brings in a second, smaller zip and checks that the two new notes join the nine, the shared note
is updated and every other note stays.

Ingenium 7.03 (14 November 2026): Build's diamond keeps its press, without the circle. Her words that day: "I like that the diamond
is a pressable button now but I want the effect where a circle is shown when I click on the diamond to be removed but the clicking
effect should be preserved". In `modules/r292.js`: the ring that spread round the stone after a press is gone, and so is the soft
violet glow behind it (its shader term and its uniform, uGW, with them). The press itself is as in 7.02: Home's click, the sink while
held, the spring back when let go, and one of the engine button's flourishes (spin, pulse, hop, twirl, heartbeat; every seventh press
the grand one). Seen on the live preview first (frames of a press: no ring at any moment).
- The holder without its ripple (her words: "I want that ripple effect like I am touching glass or liquid to be removed but the clickable
  effect and the orrerry spinning effect to be preserved on the Holder of the diamond as well"): a press on the Orrery no longer sends
  a ring of light across its face (HO.rip and its shader term are gone); it still spins on, the holder still lifts its face, and Home's
  click sounds. A press on the engine logo at its heart plays its flourish and glow without the two rings that spread across the
  Orrery. Vocatio's compass is unchanged (she asked that it be left alone).
- The sparkles restored (her words: "I need you to add the sparkles back to the diamond, I am not sure when or why you removed them. I
  want the sparkles restored!", and "more sparkles on both day mode and night mode especially when I click on it or hover over it, it
  needs to shine more, right now it is missing it on day mode especially"). 7.01 had made the specks fewer and slower (3 a second, up
  to 10, each fading over half a second to a second) and dimmed the light's own stars; 7.02 took away a press's burst and its light.
  Now the specks twinkle as in her design (a fifth to half a second each): 8 a second at rest, 18 while the light crosses, 16 under
  the pointer, 28 for a moment after a press, up to 18 at once (24 in a press), a quarter larger under the pointer and in a press,
  some with a faint rose, ice blue or lilac fire; the glints come from a wider angle under the pointer and in a press; the light's own
  stars are as in her design; a press sends the light again when it has not just crossed; the light comes every 16 to 28 seconds; by
  day each sparkle has a small violet glow under its white star, so it shows against the light sky. Measured with the page's clock
  slowed tenfold (the test browser draws about three frames a second): lit sparkle pixels under the pointer 161 to 269 by day and 3
  to 55 by night; after a press 117 to 437 by day and 18 to 468 by night.

Ingenium 7.02 (14 November 2026): Build's diamond presses as Fabrica's balls do. Her words that day: "I want the same sound and
effect of the balls from Fabrica's tree to be applied to the diamond button, right now it sounds too brusque". In `modules/r292.js`:
a press plays Home's own click (the weighted click of 7.01 is gone); the diamond sinks while held (to 90 per cent in 80 milliseconds)
and springs back when let go (1.10, 0.96, 1.03, 1.00 over 0.6 seconds), then plays one of Home's engine button's flourishes at the
button's own pace (a spin, here a whole turn about its own axis; a pulse with two ripples; a hop; a twirl; a heartbeat; every seventh
press the grand one), with the button's violet glow behind it and its ripple round it. The stone is scaled about its centre in its
own shader (its sparkles ride with it). The press no longer sends the light or a burst of sparkles; the light still comes now and
then on its own.

    node rig/t_700_heads.js http://127.0.0.1:8150/ingenium.html <out>      # the diamond's press plays Home's click

Ingenium 7.01 (14 November 2026): Build's diamond on its silver holder, gentle and light to run; Build's and Focus's landscapes
over their whole header cards; Fabrica's tree for every app, every part of it answering a press.

Her words (14 November 2026): "This is the design that I want for the Build page, this is the one"; "I approve of this design,
please push it everywhere"; "please refine the light animations and the other animations of the page, they are too brusque and
intense"; "The entire page is runnign slow and lagging"; "I need the diamond and the holder to be clickable and animated"; "The
lighter stone should be first on the Focus page on Night mode and the purple stone should be second"; "The tree from Fabrica is
missing and its surface are not clickable, especially the seal button"; "I want the whole card to be filled with the purple
landscape design and animation"; "I also want the landscape of the Build page diamond to fill the card on both day and night mode
instead of being limited to a square".

- Build (`modules/r292.js`, out of build/held.json): her design (the file she sent that day) with the holder's silver deeper by
  day; no glass, Vocatio's own Orrery in its seat, handed over by the compass (`IngStudios.kit.dial`, r290) and turning as the
  compass's dial does; Ingenium's engine logo at its heart, drawn from the base page's own seal in its four layers, each at its own
  height, moving as the logo moves and playing Home's flourishes when pressed; every part of the holder glowing softly under the
  pointer and answering a press; a press on the diamond turns it, with a burst of sparkles. The sky (the northern lights, the
  day's glows, the motes) is drawn on a canvas of its own across the whole card, at half sharpness and half the frames.
- Gentler: the light crosses the stone more slowly and softly; the holder's lights travel slowly, rising and fading; presses turn
  its parts gently and they settle over two or three seconds; the springs are softer.
- Lighter: the stone traced twice a pixel on a sharp screen instead of four times; thirty frames a second at rest and sixty only
  while the stone answers on a machine that keeps up; the drawing coarser only while frames fall behind; the holder's seat found
  by one sum, its surface read from its profile, the old glass case's code gone. In the test browser a frame costs about 2.5
  times less work than before.
- Focus (`modules/r291.js`): the pool fills the whole card behind the words with no fade at its side; the view moved so the
  stones stand where they stood; by night the stones' colours go by their place: the lighter stone first, the purple second.
  It draws within the same budget of pixels as before, so filling the card costs no more; by night the water's reflection
  is softened under the words.
- Fabrica (`modules/r294.js`): the tree from the other chat's 7.01 sources (claude/relaxed-hopper-nz4ert, 46f4769): it stands for
  an app of one or two versions (their newest bead had sat on the plinth), at its true size, its silver's shading never flipping;
  its beads, trunk and plinth answer a press; and here the engine star at the top of the trunk turns as the engine logo does and
  spins when pressed.
- Fabrica's glitch (her words: "remove the glitch from Fabrica's tree, I think its a bug"): the plinth and the trunk's rings
  were drawn as seen from a little above, but a point off the trunk rose as it came toward the eye and sank as it went away, as
  if seen from below, so the branches swung up and down across the frame as the tree turned (its highest point travelled 112
  pixels; now 11). A point now rises as it goes away and sinks as it comes near; the trunk and every size are unchanged.
- Measured on every page (rig-free, with Chrome's own counters): no head keeps drawing once its page is left, and a plain page
  rests at about two per cent of the main thread; the work is in the heads while they are shown, where 7.01 lightens Build.
- Fabrica's balls (her words: "I want the balls on Fabrica's tree to be animated and clickable and have the same effect as the
  engine button from the Home page"): at rest each beats softly with the engine button's heartbeat, out of step with the others;
  pressed, one of the button's flourishes (r175, r290's SFL: spin, pulse, hop, twirl, beat; every seventh press the grand one),
  with its glow and its ripple, at the button's own pace; under the pointer it lifts with a soft glow.
- Focus's stones' sounds: as they were in 7.00 (the stone-in-water sounds she approved on Focus), at her word on 14 November 2026
  ("revert it back to the previous water sounds"); the two remakes made that day are not kept.
- Focus's northern lights (her words: "I want the full colour spectrum northern lights on the landscape and horizon of the Focus
  page 3D header instead of the purple shade of the lights only"), `modules/r291.js`: each curtain runs from a rose fringe through
  green, teal and blue to violet at its top, its hue drifting along the horizon; the water mirrors them.
- Build's diamond click (her words: "give the diamond a sound effect for when I press it, I want it to have that weighted click
  like a real button"), `modules/r292.js`: pressed, a dry tick over a low, weighted body falling in pitch; let go, a lighter tick.
- Fabrica's balls press as a button does (her words: "they have no bounce back when I click on them"), `modules/r294.js`: a ball
  sinks while held and springs back when let go, before its flourish.
- The Guide (`modules/r222.js`): the news for 7.01, and the other chat's 7.00 fix (bede809): the Folders line no longer names
  Fabrica, which the gift and demo editions do not have.
- The numbering: another chat released 7.00 on claude/relaxed-hopper-nz4ert (ec0ab68, 53fb60b); this line's page commit
  87b9d42 of the same day says 7.00 too, with different content. 7.01 on claude/tender-fermat-3f415n follows both, at her word.

    node rig/t_700_heads.js http://127.0.0.1:8150/ingenium.html <out>      # the heads, the holder's logo, the full-card skies
    node rig/t_696_fabrica_head.js http://127.0.0.1:8150/ingenium.html <out>

Ingenium 7.00 (14 November 2026), on this line (the page 87b9d42, 07:06 UTC): Build's diamond on its holder as she approved it
(e2978ed; 7.01 above carries it further), on the 7.00 sources both lines share (8667f6e, 4d0f150, 6d346d4). The other chat's notes for
those sources (claude/relaxed-hopper-nz4ert): Focus opens on stepping stones across still water (modules/r291.js), a stone pressed
sounds like a stone meeting water; nature sounds in the top bar on every page (r295); Fabrica's tree in silver and glass (r294); the
studios' instruments under the words on a phone (r296); Lector's seal in a stack of its own, drawn above the sheets (r290); Bring in
your work in a panel over the Folders page (r263). Released first here too: Home's spheres without their white line, and the compass
button's thin ring in step with the engine (94a2861). The other chat's own 7.00 (ec0ab68, 53fb60b) held Build's diamond; this one
released it. Every build of it succeeded. Tests: `node rig/t_700_heads.js <page url> <out>`.

Ingenium 6.99 (13 November 2026): Lector's seal stays on the paper, its shadows drawn without a blur; Fabrica's empty chips hidden.
- Her words (13 November 2026): "there is a clear bug that keeps on disappearing the wax seal. I hate that." Pressing the sheet in front of
  Lector's fan sent the seal to its resting depth (-1 px, modules/r290.js .lf-seal.lf-dn) while the sheet's lift under the pointer (26 px)
  outweighed its own press (.lf-down lost to :hover on specificity): the seal stood 27 px behind the paper for as long as the press lasted.
  A press now sinks the sheet from where it stands (18 px when lifted, -4 px at rest) and the seal with it; the seal stands 6 px off the
  paper in every state, so its lean toward the pointer never meets the paper.
- With her Lector_Sealed_Dossier.html once more (the same file as for 6.96): "I want you to use this design for Lector just please remove
  the weird dark shadow that is showing on the left top corner of the seal and documents for the Lector drawing, it detracts from the
  page." The design is that file's; the shadows under the five sheets were dark sheets blurred by a filter inside the stack's 3D frame, and
  the star in the wax cast one by a filter too. The Mac's web view (Safari's engine) draws a filter inside a 3D frame in a layer of its own
  and can set it down out of place, a dark patch at the top left. They are now painted soft by box-shadow, as part of their own sheet (a
  sheet 20 px smaller each way, spread back by 20 px, softened by 20 px: the same blur of 10 px), and the star casts none. Seen here in
  Chromium only: this environment has no WebKit, so the Mac's own drawing could not be watched; what could be checked is that no filter is
  left inside the frame.
- Fabrica, her words: "there is bug on the page". With no app chosen, its work, test and ship chips stood as three empty grey capsules (their
  padding, fill and border with no words): a chip with nothing to say is no longer drawn (modules/r112.js). Her verdict on the design ("The
  Fabrica page looks ridiculous and needs to be redone, the design looks ulgy") waits for a new design on a live preview.
Tests: `node rig/t_694_lector.js <page url> <out>` (27: the seal in front at rest, lifted and pressed; no filter inside the frame; both fail on 6.98).

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

