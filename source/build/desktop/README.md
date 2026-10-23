# The desktop apps' own side (ingenium_app.py), 6.2

`ingenium_app.py` (Mac and Windows) is changed by the patches here at release time, not before: a push that changes it
builds the Mac or Windows app and replaces what is on the Releases page, so it changes together with the page.

    python3 build/desktop/app_lite_62.py    <repo>/ingenium_app.py   # windows of their own: the window page, brought forward, a way home
    python3 build/desktop/app_refresh_62.py <repo>/ingenium_app.py   # Mac only: Refresh starts a page process that stopped answering afresh
    python3 build/desktop/app_ctx_62.py     <repo>/ingenium_app.py   # a long memory: 8-bit past 32K with flash attention, --cache-reuse, a retry without

The Mac mini and Mac (Intel) repositories share one ingenium_app.py; the Windows one has its own (it takes the first patch
only, with the long memory: Refresh on Windows is the page's own key). `release.py page` applies whichever has not been applied yet.
Test: `python3 -I rig/t_62_app_lite.py <repo>/ingenium_app.py <ingenium.html>` (16 checks on the Mac's, 13 on Windows').

Test the long memory: `python3 -I rig/t_62_app_ctx.py <repo>/ingenium_app.py` (7 checks, Mac and Windows alike).
