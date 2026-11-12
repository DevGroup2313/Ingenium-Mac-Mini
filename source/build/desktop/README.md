# The desktop apps' own side (ingenium_app.py), 6.2

`ingenium_app.py` (Mac and Windows) is changed by the patches here at release time, not before: a push that changes it
builds the Mac or Windows app and replaces what is on the Releases page, so it changes together with the page.

    python3 build/desktop/app_lite_62.py    <repo>/ingenium_app.py   # windows of their own: the window page, brought forward, a way home
    python3 build/desktop/app_refresh_62.py <repo>/ingenium_app.py   # Mac only: Refresh starts a page process that stopped answering afresh
    python3 build/desktop/app_ctx_62.py     <repo>/ingenium_app.py   # a long memory: 8-bit past 32K with flash attention, --cache-reuse, a retry without
    python3 build/desktop/app_quick_62.py   <repo>/ingenium_app.py   # a quicker start: what is carried for later stays with the app until it is used
    python3 build/desktop/app_guard_62.py   <repo>/ingenium_app.py   # the app's own address answers its own window only (no DNS rebinding)

The Mac mini and Mac (Intel) repositories share one ingenium_app.py; the Windows one has its own (it takes the first patch
only, with the long memory: Refresh on Windows is the page's own key). `release.py page` applies whichever has not been applied yet.
Test: `python3 -I rig/t_62_app_lite.py <repo>/ingenium_app.py <ingenium.html>` (16 checks on the Mac's, 13 on Windows').

Test the long memory: `python3 -I rig/t_62_app_ctx.py <repo>/ingenium_app.py` (7 checks, Mac and Windows alike).

Test the quicker start: `node rig/t_62_quick.js <repo>/ingenium_app.py <ingenium.html> <out>` (10 checks, 11 with a picture).
Test the guard: `python3 -I rig/t_62_app_guard.py <repo>/ingenium_app.py` (13 checks, Mac and Windows alike): a request that
names the app's own address (127.0.0.1 or localhost at its port) is answered; one that names anything else, as a page that has
pointed its own name at 127.0.0.1 would, is refused (421) before any file, model or relay is touched.

6.7.1, `app_care_671.py` (Mac and Windows): the stored work is moved aside only when the page did not come up at two starts in
a row, under a name of its own, never deleted, and the person is told; on Windows a page whose process stops is loaded again
by itself, and Windows ending the session counts as a run that finished.
Test: `python3 -I rig/t_671_app_care.py <repo>/ingenium_app.py` (8 checks, Mac and Windows alike; the Windows web view's
side is checked on Windows by Ingenium-HPWindows .github/workflows/windows-home-check.yml).

6.9.2, `app_rag_692.py` (Mac and Windows): the folder search's side of the app. `rag_choose_folder` (the computer's own folder
dialog; the folders chosen are remembered in the app's data folder, `rag/folders.json`), `rag_folders`, `rag_forget_folder`,
`rag_list` (the seven types, hidden entries skipped, links followed only inside the folder, at most 5,000 files) and `rag_read`
(pieces of at most 1 MB, the real path inside the folder) on both API classes; explicit types for .mjs/.js, .wasm, .onnx and
.json on the local server. The logic is the plain functions `_rag_*` (text `CODE` in the patch).
Test: `python3 -I rig/t_rag1_bridge.py [folder for the copies]` (copies the three repositories' ingenium_app.py, patches each twice,
runs the rules against the stand-in `rig/rag_bridge.py` and against the patched copies' own API classes, the server's types, and
`rig/rag_bridge_shim.js` in headless Chromium).

6.9.3, `app_lend_693.py` (Mac and Windows): lending that tells the truth and never goes silent. The window a lent model is given follows
the computer's memory (`_share_fit_ctx`: the largest of 32,768, 16,384 and 8,192 tokens that the page's own sum keeps within 70% of it) or the
lender's choice (Memory for lent models), and is told to the other device (`context_length`, `max_tokens`, `advice`, `tps` in the model list;
`ctx`, `ram_gb`, `cpu_only`, `gpu_used`, `busy`, `queued` in /ingenium/info). One device is answered at a time, first come first served (four
may wait, thirty minutes at most); a request for another model no longer ends the reply being written; the answer's head goes out at once,
a quiet stream gets a ": waiting" line, and a device that sends `ingenium_status` gets plain status lines (queued, loading, reading with a
percent, answering); an error after the head, or an engine that stops while answering, ends the stream with an error line and [DONE]. A
request with no code at all no longer counts toward the ten-minute lock. Graphics: Automatic (a real graphics card only), Processor only
(`--device none -ngl 0 -b 512`) or Graphics chip; an engine that stops after it was ready is started again once, on the processor if it had
been using the chip, and the chip is left alone for the run. New shell calls on both API classes: `share_option_set(key, value)` and
`share_advise(models)`; `share_status()` gains `queued` and `options`. The speed of every whole reply is kept per model
(`share_speed.json`).
Test: `python3 -I rig/t_705_lend_gateway.py <repo>/ingenium_app.py [<unpatched ingenium_app.py>]` (110 checks; the stand-in engine is
`rig/lend705_stub_llama.py`).

6.9.x, `app_data_692.py` (Mac and Windows): the trainer takes its text as a file, handed over by the page a megabyte at a time
(`train_text_put`; `train_start` then takes `text_path`), which lifts the 8 MB cap of one string over the bridge to 256 MB; and a
run of several passes goes one pass at a time (llama-finetune is run with `-epochs 1` once a pass, the learning rate stepping down
from the size's usual start to its usual end), the model saved after every pass, so a run the app's closing cut short keeps the
passes it did (`train_status` names it as `resumable`, `train_resume` goes on, `train_discard` lets it go). Stop training by hand
still keeps nothing. The page (modules/r200.js) feature-detects every method, so it works as before with an app that lacks them.
Test: `python3 -I rig/t_692_app_data.py <repo>/ingenium_app.py build/desktop/app_data_692.py` (34 checks, on a copy, with a
stand-in llama-finetune and llama-perplexity; Mac and Windows copies alike).

Perplexity (also `app_data_692.py`): `train_perplexity(model_id)` measures a stored model on the text handed over with `train_text_put`
(the held-back part of a dataset) by running llama.cpp's `llama-perplexity` as the build's own check does (`-c 256 -b 256`,
"Final estimate: PPL ="), `train_perplexity_status()` polls it, `train_perplexity_cancel()` stops it; `train_available` says
`perplexity: true` only when the program sits beside `llama-server` and `llama-finetune` in the engine folder. No build carries it
yet, so the Studio's Measure room says the app does not carry it. The lines that must carry the program (llama.cpp b11321 builds
it from the same tree as the trainer; the workflows are not changed by this patch):
- Mac mini and Mac Intel (the same files): `tools/build_engine_mac.sh` line 85 (`--target llama-finetune` gains `--target llama-perplexity`),
  lines 87-89 (the `cp`, `chmod` and `echo` of the second program), line 99 (its `--version`); `tools/finish_mac_app.sh` line 21
  (`for f in llama-server llama-finetune` gains `llama-perplexity`: it is copied into the app and signed);
  `.github/workflows/build-mac.yml` lines 110-111 (the `cp` and `chmod` of the trainer into `engine/<plat>`) and the cache key on
  line 100 (`trainer-${{ matrix.plat }}-b11321-v1` becomes `-v2`, so the cache is rebuilt with the second program).
- Windows: `.github/workflows/build-windows.yml` line 91 (`--target llama-finetune` gains `--target llama-perplexity`), line 94 (the
  `cp` of the `.exe` into `engine-trainer/windows-x64/`), lines 102-103 (the `z.write(...)` into the engine pack) and the cache key
  on line 78 (`-v1` becomes `-v2`). The app unpacks the pack by a tag of its size and first megabyte, so a pack with one more
  program is unpacked afresh.

6.19, `app_page_619.py` (Mac and Windows): Ingenium's own page, changed by its author, in place of the built one (the Workshop's
Your page, modules/r227.js, the master edition). Five calls: `page_state`, `page_put` (a changed page in pieces of text, kept as
`<the app's folder>/pages/<date-time>/ingenium.html`, beside storage, with what the page carries at its end put back from the
running page where it names it but lacks it), `page_use` (a version, or "" for the built page; now, in the window, or at the next
start), `page_drop` and `page_started` (the page's Workshop reports in: that version works). The app's own server serves the chosen
page at the built page's address, so the stored work and the origin are the same. A changed page that never worked is left when it
has not reported in within half a minute, when the load watchdog finds it not started, or at the next start after one that did not
come up; one that worked is left after two such starts in a row. Ingenium then goes back to the last version that worked, or to the
built page, and keeps why (`pages.json`), for the Workshop to say. At most five versions are kept (the one in use, the one running and
the last that worked always stay). On a Mac, the app menu gains "Use the built page", which needs nothing from the page.
Test: `python3 -I rig/t_619_app_page.py <repo>/ingenium_app.py` (34 checks, Mac and Windows alike).

6.20, `app_page_620.py` (Mac and Windows; after `app_page_619.py`): Your page's downloads, written by the app from the file itself.
A whole page is about 76 MB, and the page's own save call carried it as base64 (about 100 MB) across the bridge in one piece. Now
`page_save(pid, name)` copies the page running ("") or a version kept where she chooses, in the computer's own save dialog, and
`page_export(piece, first, last, name)` takes the Workshop's lighter copy in pieces (about 15 MB), puts back what the page carries
from the running page, and writes it whole where she chooses, keeping no version. Both answer the path written, "cancelled", or an
error. Test: `python3 -I rig/t_619_app_page.py <repo>/ingenium_app.py` (38 checks with this patch).

6.57, `app_cloud_657.py` (Mac and Windows): Ingenium Cloud's box on the gateway that lends models, behind its pairing code: sealed parts
and each device's latest snapshots in the app's data folder (cloud/), and `cloud_box_set` (the gateway runs and the computer stays awake
for the Cloud, lending or not). Test: `node rig/t_657_cloud.js` against `rig/run_app.py` (see source/README.md).

6.81, `app_lend_681.py` (Mac and Windows): sharing models made simple. `/ingenium/hello` also says the computer's id (kept in
share.json), its kind (laptop, desktop, or "box" for a computer without its own screen, such as a Mac mini) and every address it can be
reached at; the search (`_share_find`) carries them. A device names itself (`X-Ingenium-Device: id=...;kind=...;name=...`) and pairs once
with the code (`POST /ingenium/pair`); `share_status` lists the devices by name and kind and the names of the models lent;
`share_device_remove(id)` refuses a device (401, removed) until it pairs again with the code.
Test: `python3 -I rig/t_681_lend_gateway.py <Mac ingenium_app.py> <Windows ingenium_app.py>` (19 checks).

6.91, `app_refs_691.py` (Mac and Windows; after `app_copy_688.py`): `_disk_refs` gives a repository's branches and tags sorted (dulwich
0.22.8 joins the loose refs and packed-refs in a set, so their order could change from one start of the app to the next).

6.88, `app_copy_688.py` (Mac and Windows; after `app_disk2_687.py`): Fabrica's second copy of a repository on another drive, kept whole and
checked by fingerprint every day, every Sunday or by hand. Calls: `copy_places`, `copy_choose`, `copy_list`, `copy_plan(rid, folder, when)`,
`copy_now`, `copy_check`, `copy_forget`. The copy is a bare repository, `<folder>/Ingenium copies/<name>.git`: every pack (its index last)
and loose object copied as it is, each under a temporary name and renamed when whole; the branches and tags read first and set after; a
branch taken away from the repository kept in the copy under `refs/ingenium-kept/<time>/`; objects borrowed through git's alternates
copied too. The check: refs, every object, each pack's own SHA-1 and its index's, each loose object's name; what it finds faulty is copied
again next time. A scheduler thread looks a minute after the first call and every half hour. Also a fix for 6.86 and 6.87: a repository
held open has its packed-refs read again when the file changes (dulwich 0.22.8 reads it once). Test: `python3 -I rig/t_688_copy.py
<Mac ingenium_app.py> <Windows ingenium_app.py>` (29 checks); with it applied, t_686_disk_engine.py 33/33 and t_687_disk_write.py 41/41.
