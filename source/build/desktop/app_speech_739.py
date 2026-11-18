"""Ingenium 7.39: dictation in-house on every device. A device without the speech files takes them from its paired computer.

Her words (18 November 2026): "I want for Scriba and its speech models to be wired into the Chats pages compose text box instead sending it
outside of the app to another provider. I want everything kept in-house where possible."
Measured: the Mac and Windows apps carry the speech engine and models beside the page (speech/, from the release speech-vendor); the
Fire, Android, iPhone and iPad apps do not, so on a first use they fetched them once from the internet (cdn.jsdelivr.net, huggingface.co).
Now the computer's lending server offers them to her paired devices (with the code, or sealed since 7.37), and the device keeps them where
the speech engine already looks (modules/r254.js), so the internet is only the last resort.

  GET /ingenium/speech                              speech.json (what is there), or {"have": false}
  GET /ingenium/speech/part?f=<rel>&off=<n>&len=<n> a piece of one file under speech/ (runtime/... or models/...), as base64
hello says speech: 1 when the folder is there.

    python3 build/desktop/app_speech_739.py <repo>/ingenium_app.py"""
import sys

p = sys.argv[1]
s = open(p, encoding="utf-8").read()


def rep(old, new, n=1):
    global s
    c = s.count(old)
    if c != n:
        sys.exit("%s: expected %d, found %d: %r" % (p, n, c, old[:90]))
    s = s.replace(old, new)


if "_speech_dev_get" in s:
    print("already patched", p)
    sys.exit(0)
if "_seal_serve" not in s:
    sys.exit("%s: app_seal_737.py must be applied first" % p)

FN = r'''# ---- 7.39: the speech files beside the page, for her paired devices (app_speech_739.py) ----
def _speech_dir():
    try:
        page = find_app_html()
        d = os.path.join(os.path.dirname(page), "speech") if page else None
        return d if d and os.path.isfile(os.path.join(d, "speech.json")) else None
    except Exception:
        return None


def _speech_dev_get(h, path):
    from urllib.parse import urlparse, parse_qs
    d = _speech_dir()
    if path == "/ingenium/speech":
        if not d:
            return h._json(200, {"have": False})
        with open(os.path.join(d, "speech.json"), encoding="utf-8") as fh:
            j = json.load(fh)
        j["have"] = True
        return h._json(200, j)
    if path == "/ingenium/speech/part":
        if not d:
            return h._err(404, "This computer carries no speech files.")
        q = parse_qs(urlparse(h.path).query)
        rel = (q.get("f") or [""])[0].replace("\\", "/")
        if not rel or rel.startswith("/") or ".." in rel.split("/") or not (rel.startswith("runtime/") or rel.startswith("models/")):
            return h._err(400, "not a speech file")
        f = os.path.realpath(os.path.join(d, rel))
        if not f.startswith(os.path.realpath(d) + os.sep) or not os.path.isfile(f):
            return h._err(404, "not here")
        try:
            off = max(0, int((q.get("off") or ["0"])[0]))
            ln = max(1, min(int((q.get("len") or [str(4 << 20)])[0]), 8 << 20))
        except Exception:
            return h._err(400, "not readable")
        size = os.path.getsize(f)
        with open(f, "rb") as fh:
            fh.seek(off)
            data = fh.read(ln)
        return h._json(200, {"ok": True, "size": size, "off": off, "length": len(data), "more": off + len(data) < size,
                             "b64": base64.b64encode(data).decode("ascii")})
    return h._err(404, "not found")


'''
rep("\ndef _share_handler():\n", "\n" + FN + "def _share_handler():\n")
rep('"kind": _share_kind(), "pair": 1, "seal": 1 if _seal_lib() else 0,',
    '"kind": _share_kind(), "pair": 1, "seal": 1 if _seal_lib() else 0, "speech": 1 if _speech_dir() else 0,')
rep('''            # 7.37 (app_seal_737.py): a device waits for her to compare the words on this computer
            if path == "/ingenium/pair2/state":
                return _seal_pair_state(self)
''', '''            # 7.37 (app_seal_737.py): a device waits for her to compare the words on this computer
            if path == "/ingenium/pair2/state":
                return _seal_pair_state(self)
            # 7.39 (app_speech_739.py): the speech files, for a device that has none
            if path == "/ingenium/speech" or path.startswith("/ingenium/speech/"):
                return _speech_dev_get(self, path)
''')

open(p, "w", encoding="utf-8").write(s)
print("patched", p)
