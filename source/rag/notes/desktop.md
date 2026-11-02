# Folder search, phase 1: the desktop side (the folder bridge, the local server's types, the test stand-in)

Written 1 November 2026. Files: `build/desktop/app_rag_692.py` (the patch), one line in `build/release.py`, a paragraph in
`build/desktop/README.md`, `rig/rag_bridge.py`, `rig/rag_bridge_shim.js`, `rig/t_rag1_bridge.py`. Nothing in the repositories'
`ingenium_app.py` was touched: the patch is applied by `release.py` at release time (as every `build/desktop/app_*.py`), and the
test applies it to COPIES (`scratchpad/rag0/desktop_try/{mini,intel,win}/ingenium_app.py`, patched twice, each compiled and imported).

## 1. Things the next parts must know first

1. **The bridge is the five methods of DESIGN section 6, with these exact shapes** (all JSON; a refusal is always
   `{ok: false, error: <plain words>, code}`; the codes are `NOT_CHOSEN, OUTSIDE, HIDDEN, TYPE, NO_FILE, BAD_ARGS, UNAVAILABLE,
   UNREADABLE, NOT_A_FOLDER, REFUSED, BUSY, DIALOG, NOT_SAVED, FAILED`):
   - `rag_choose_folder()` -> `{ok: true, path, name}` (`again: true` when that folder was chosen before) | `{ok: false, cancelled: true}`
   - `rag_folders()` -> `[{path, name, added, available}]` (`added`: milliseconds since 1970; `available: false` when the folder is not
     there now, an unplugged drive: it stays in the list)
   - `rag_forget_folder(path)` -> `{ok: true, forgot: true|false}` (forgetting a forgotten folder is harmless)
   - `rag_list(path)` -> `{ok: true, files: [{rel, size, mtime}], truncated}`; `rel` has `/` between names, sorted by `rel`;
     **`mtime` is whole milliseconds since 1970** (an integer; `indexer.js` floors it, which changes nothing); `truncated: true` when the
     app stopped at its limit (5,000 files, or 300,000 directory entries looked at): the list is then not the whole folder, and
     `folders.js` sets `files.truncated` and `indexer.js` takes nothing out of the index (tested, `rig/t_rag1_index.js`).
   - `rag_read(path, rel, offset, length)` -> `{ok: true, data (base64), size, eof}`. `length` over 1 MB is **cut to 1 MB** (the
     answer is shorter, `eof` false; DESIGN says only "at most 1 MB"). A read at or past the end is `{ok: true, data: "", eof: true}`.
     `size` is the file's size at that read. The harness's JS stand-in (`parse_harness.html`) refuses a length over 1 MB instead; the
     indexer never asks for more.
   DESIGN section 6 lists `rag_folders` as `[{path, name, added}]` and `rag_list` as `{ok, files}`: the extra keys (`available`,
   `again`, `forgot`, `truncated`, `code`) are additions that break nothing; I left DESIGN.md as it is.
2. **Only a folder chosen in the dialog can be listed or read.** The folders are kept in `<app data folder>/rag/folders.json`
   (`~/Library/Application Support/Ingenium/rag/` on the Mac, `%APPDATA%\Ingenium\rag\` on Windows, `~/.local/share/ingenium/rag/`
   elsewhere; the folder that holds `models/`), written whole to a temporary file and moved over the old one, each record
   `{path, real, name, added}`. A path the page passes is matched by its REAL path against the stored `real`, so another spelling
   of the folder works (closing slash, `..`, a link to it) and a symbolic link re-pointed elsewhere after the choice is refused. A
   subfolder or the folder around a chosen folder is not chosen. A damaged file reads as no folders and is set aside as
   `folders.json.bad` (the app's log says so).
3. **Refused as a choice:** a file, a folder that is not there, a folder that is or lies inside the app's data folder, and any folder
   that CONTAINS it, which means the whole user folder (`~`, `C:\Users\name`) and a system root. A drive other than the system's
   (an external drive's top folder, `E:\`) is fine. Message: "That folder holds Ingenium's own settings (or is the whole user folder).
   Choose the folder with your papers in it." This is my addition to "realpath checks": the page could otherwise read the app's own
   `.json` files. Say so in the UI.
4. **What a read refuses, in this order:** the folder not chosen (`NOT_CHOSEN`); `offset` and `length` not whole numbers, `offset` < 0,
   `length` < 1 (`BAD_ARGS`; `5.0` is accepted, `"5"` and `true` are not); a `rel` that is not a plain relative path of the listing's
   kind: absolute, a drive, starting with `/` or `\`, any `..`, empty, a NUL, not a string, over 4,096 characters, a `:` on Windows
   (`OUTSIDE`; even a `..` that would stay inside is refused, a listing never has one); the drive of the folder not there
   (`UNAVAILABLE`); a hidden name at any step (`HIDDEN`); a type that is not one of the seven (`TYPE`); a real path that leaves the
   folder (`OUTSIDE`: a link out, a link through a folder link out, a link to a sibling whose name starts like the folder's, tested with
   the path-prefix trap `papers-evil`); not a regular file (`NO_FILE`: a folder named like a file, a broken link, a named pipe, which is
   never opened).
5. **What a listing skips:** the seven types only (`.txt .md .html .htm .json .csv .pdf .docx`, any case); hidden = a name starting
   with `.` (also a Mac's `._` copies), an editor's `~$` lock file, and what the system marks hidden (Windows
   `FILE_ATTRIBUTE_HIDDEN`, the Mac's `UF_HIDDEN` flag); a symbolic link or junction only when its real path is inside the folder,
   and never into a folder it is already inside (a `loop -> .` or `sub/back -> ..` is not entered); a broken link; anything that is
   not a regular file. A link that stays inside IS followed and listed under its own name (a folder link inside therefore lists the
   same files twice, under two names: the owner's own doing).
6. **The local server** (`_start_local_server`, class `_Quiet`) now has `extensions_map` with `.mjs` and `.js` `text/javascript`, `.wasm`
   `application/wasm`, `.onnx` `application/octet-stream`, `.json` `application/json`, on top of Python's table. Why it matters: on
   Python up to 3.12 the handler's table is a copy of the system's (on Windows it comes from the registry, where `.js` can be
   `text/plain`), and a module worker or module script with that type is refused. Checked: with the handler's table AND `mimetypes`
   set to the wrong types, the patched server answers all five (also `.MJS`) correctly and a plain `SimpleHTTPRequestHandler`, as the
   control, answers `.mjs`, `.js` and `.wasm` wrongly. The server still sends no COOP/COEP (no cross-origin isolation, so one ONNX
   thread, as `embedder.worker.js` assumes), `Cache-Control: no-store` on everything, and does not answer Range requests for files
   under the page's folder (only `/_models/` does); that is fine: the core tests load the model and ONNX Runtime from `rag/test/serve.py`,
   which is the same `SimpleHTTPRequestHandler` without ranges.
   The release must put `rag/` beside the page for `/rag/...` to be served: not done here (the build is not this part).

## 2. What the patch does to `ingenium_app.py` (checked on all three files)

- `CODE` (the functions, text in the patch) goes in front of `class IngeniumApi(_LiteWindows):` (found once). Everything is plain
  module-level functions `_rag_*` (`_rag_choose_folder(win)`, `_rag_remember`, `_rag_folders`, `_rag_forget_folder`, `_rag_list`,
  `_rag_walk`, `_rag_read`, `_rag_find`, `_rag_hidden`, `_rag_parts`, `_rag_extensions_map`, ...); the API classes only call them.
  They use what the app has already imported (`os sys json base64 pathlib re threading time`), `APP_FOLDER` and `log_problem`; the
  one new import is `stat`. `_rag_choose_folder` is `_choose_model_place` for a folder to read: `webview.FileDialog.FOLDER`, or
  `FOLDER_DIALOG` on an older pywebview, a result that is a string or a tuple, `win` or `webview.windows[0]`; one dialog at a time
  (`BUSY` for a second).
- The five methods go into BOTH API classes (`IngeniumApi` and `IngeniumApiSingle`) after `take_screenshot` (found twice). The
  default `offset=0, length=1048576` are on `rag_read`.
- `class _Quiet(http.server.SimpleHTTPRequestHandler)` gets `extensions_map = _rag_extensions_map(...)` (found once).
- Every anchor is counted first; a file that does not have them is refused (exit code 1, the reason on stderr) and not written; the
  new text is compiled before it is written. A second run prints `rag: already in <file>` and changes nothing. The mark that
  `release.py` looks for is `_rag_choose_folder`; `("app_rag_692", "_rag_choose_folder", ("mini", "intel", "win"))` is the last entry of
  `DESKTOP`, after `app_open_691` (whose `_open_url` is already in all three files).
- Taking the additions out gives each repository file back byte for byte (tested), so nothing else moved. The Mac mini and the Mac
  (Intel) files are the same text (same MD5 before and after: b54620d3...); the Windows file differs elsewhere and takes the same patch.

## 3. The stand-in and the shim (for the browser tests of the next phases)

- `python3 rig/rag_bridge.py [PORT] [--state DIR]` (default port 8178) serves what `rig/run_app.py` serves, for the five methods only:
  `GET /` -> `{names, port, state}`, `POST /call/<name>` with a JSON list of arguments -> `{ok: true, v}` | `{ok: false, e}`. It RUNS THE
  PATCH'S OWN TEXT (`CODE` is executed in a namespace with `log_problem`, `APP_FOLDER` and the app's modules), so the Python rules are
  the app's. The folder dialog is a queue of answers: `POST /admin/dialog {"answers": [path, null, ...]}` (null: closed; none left:
  closed), `POST /admin/state {"dir": path|null}` (where the chosen folders are kept; null: a new empty one),
  `POST /admin/set {"name": "_RAG_SCAN_CAP", "value": 300}`, `GET /admin/problems`. Used in a test process: `rag_bridge.serve(0)`
  returns `(server, bridge)`; `bridge.call(name, ...)`, `bridge.window.answers`, `bridge.problems`.
- `rig/rag_bridge_shim.js` is the Playwright init script: `await context.addInitScript({path: 'rig/rag_bridge_shim.js'})` defines
  `window.pywebview.api.rag_*` (Promises of the values above) over `http://127.0.0.1:8178` (or `window.__RAG_BRIDGE__`, set by an
  init script before it) and fires `pywebviewready` 50 ms after DOMContentLoaded. **The page must really be served from 127.0.0.1**
  (`rag/test/serve.py` is): Chromium refuses a fetch from a page on another name, or one answered by `page.route()`, to a loopback
  address ("Permission was denied ... the `loopback` address space"). A test that refuses every request to another origin must let
  the bridge's origin through (`t_rag1_index.js` and `t_rag1_parse.js` do not use the shim; they have their own JS stand-in).
- Faithful? The same 143 checks run against the stand-in over HTTP AND against the patched copies' own API classes (Mac and Windows
  files, both classes each): all equal.

## 4. Tests (`python3 -I rig/t_rag1_bridge.py [folder for the copies]`, 8 to 16 s)

**771 passed, 0 failed** (two runs after the last change to the test; the first run had the shim check failing for the reason in 3).
In groups (30 + 715 + 2 + 14 + 3 + 7): the patch (per file: applies once, second run changes nothing, compiles, only additions, five methods once in each class, the
functions once each, the handler line once; a file without the anchors and one with only one `take_screenshot` are refused and left
alone; `release.py` lists it last, after `app_open_691`, with the mark, no mark listed twice); the rules x 5 adapters (stand-in over
HTTP, Mac `IngeniumApi` and `IngeniumApiSingle`, Windows `IngeniumApi` and `IngeniumApiSingle`; 143 checks each, 715 in all): choosing (cancel, a
closed dialog, again, a file, a missing folder, the app's data folder, inside it, the user folder, a folder of papers under the user
folder, accents and spaces), listing (exactly the 18 expected files, hidden, `._`, `~$`, other types, links in and out, loops, the
named pipe, a folder named like a file, sorted, sizes, millisecond mtimes, other spellings of the folder, a subfolder and the folder
around it not chosen, bad arguments), reading (whole, windows, past the end at five offsets, an empty file, 2.5 MB in 1 MB pieces
rejoining by SHA-256, more than 1 MB cut, a piece at an odd offset, 10 bad number pairs, ~35 refusals with their codes, the log of
the test corpus: 4,265,806 bytes in 5 pieces with the manifest's SHA-256, and the listing of `historian_archive` equal to the
manifest's 28 files and sizes), the limit (5,100 files list 5,000 and say `truncated`; exactly 5,000 do not; 5,001 do; the scan
limit), forgetting (not listed, not read, the file updated, forgetting twice, bad arguments, choosing it again), a drive that is not
there (and back), a damaged list (set aside, logged), no temporary file left; the functions alone (the system's hidden marks on
fake `stat` results, 24 folders chosen at once keep the file whole, a restarted app has them, a second dialog while one is open,
the old pywebview dialog, a dialog that answers a string, one that breaks, the type table); the local server with wrong system
tables and its control; the shim in headless Chromium from another origin (names, `pywebviewready`, choose, list the 20 files of
`household_papers`, read, a refusal as a value, forget).

## 5. Left

- **Not run on a Mac or on Windows.** Everything is Linux. Not exercised for real: `win.create_file_dialog` (pywebview's own dialog),
  Windows' hidden attribute, junctions and `\\?\` paths, the `:` rule, case-insensitive comparison (`normcase` is there), macOS
  `UF_HIDDEN`, the Mac's privacy prompts for Documents and external drives (the first listing of such a folder may wait for the
  person to answer). The code takes these from the standard library's documented behaviour; the first run on each computer is the check.
- **Speed through the real pywebview bridge is unmeasured**: each piece is 1 MB read from disk and 1.33 MB of base64 returned
  through the web view's script bridge; the 4 MB log is 5 calls. If a computer is slow there, `length` can be 256 kB (the indexer's
  `readPieces` takes `pieceSize`); the contract stays.
- A folder on a drive whose name changes when it is plugged in again is a different folder (its path is the key); there is no
  re-link. Paths of non-UTF-8 names on Linux are not handled (the apps are Mac and Windows).
- The listing is walked in one call (up to 5,000 files, 300,000 entries); a folder of that size takes seconds and holds the bridge's
  thread meanwhile. No progress, no cancel.
- `rag_read` opens a file by its real path after checking it; a person who swaps a link in that instant could read a file outside the
  folder. That needs a program running as the same person, which can read the file anyway.
