"""INGENIUM | Copyright (c) 2026 Yannie D. Forest. All rights reserved. NO LICENCE IS GRANTED.
The Forge 647's makers in the window the Forge's Mac and Windows apps open (pywebview 6.2.1: WebKit on a Mac, WebView2 on
Windows), loaded as the Forge loads its page, from a file:// address, with its storage kept (private_mode off, a storage
folder): the page made by maker_page.py makes the four apps and saves each through the window's save_file, as the Forge's
own save does; what it made, and whether the window had Web Crypto, is written to forge-check.json beside them.
    python3 pywebview_run.py <forge_makers_check.html> <out folder>"""
import base64, json, os, pathlib, sys, tempfile, time

import webview

PAGE, OUT = sys.argv[1:3]
os.makedirs(OUT, exist_ok=True)
state = {"done": None}


class Api:
    def save_file(self, name, mime, data_b64):
        p = os.path.join(OUT, os.path.basename(str(name)))
        with open(p, "wb") as f:
            f.write(base64.b64decode(data_b64))
        print("saved", os.path.basename(p), os.path.getsize(p), "bytes", flush=True)
        return True

    def log(self, line):
        print(str(line)[:400], flush=True)

    def done(self, j):
        state["done"] = j


def drive(w):
    for _ in range(90):
        try:
            if w.evaluate_js("!!(window.__mkRun&&window.pywebview&&window.pywebview.api&&window.pywebview.api.save_file)"):
                break
        except Exception:
            pass
        time.sleep(1)
    w.evaluate_js("window.__mkRun();1")
    t0 = time.time()
    while state["done"] is None and time.time() - t0 < 300:
        time.sleep(1)
    with open(os.path.join(OUT, "forge-check.json"), "w", encoding="utf-8") as f:
        f.write(state["done"] or json.dumps({"ok": False, "error": "the page did not finish in five minutes"}))
    w.destroy()


url = pathlib.Path(PAGE).resolve().as_uri() + "?manual=1"
win = webview.create_window("Forge Makers Check", url=url, js_api=Api(), width=900, height=700)
webview.start(drive, win, private_mode=False, storage_path=tempfile.mkdtemp(prefix="forge-store-"))
r = json.load(open(os.path.join(OUT, "forge-check.json"), encoding="utf-8"))
print("FORGE_MAKERS DONE " + json.dumps(r), flush=True)
sys.exit(0 if r.get("ok") else 1)
