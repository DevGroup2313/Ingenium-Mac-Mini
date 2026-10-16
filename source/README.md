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
