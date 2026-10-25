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
