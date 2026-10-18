"""R132 (18 October 2026): room to grow for Tabula, in every host (Carpe Diem, Ingenium, the Forge).

The owner's words: "I want for the local storage limits for all of my apps to be expanded please."

Tabula keeps its documents in two stores: the small one (localStorage, about 5 MB for a whole site, shared with the app
around it) and, since R127, the larger one (IndexedDB, 'tabula-big'), with a marker in the small store. Three changes:

  1. Autosave keeps a document of up to 256 MB in the larger store (it stopped at 80 MB). Without the larger store the
     limit stays at 4 MB, since the small store cannot hold more.
  2. A document longer than 64,000 characters goes to the larger store (it was 300,000), so Tabula leaves the small
     store to the app around it (Carpe Diem's and Ingenium's desks live there).
  3. The browser is asked to keep these stores (persistent storage), so it does not clear them when the disk runs
     short. Chromium and Safari decide without asking; Firefox would ask the person, so there it is not asked here.

patch(text) returns the patched Tabula page; apply it after tabula_notes_patch.py (R130). Usage on its own:
  python3 -I tabula_room_patch.py tabula.html OUT.html
"""
import sys

MARK = "R132-TABULA-ROOM"
REPS = [
    ("if(h.length+axs.length>(TS.idb?80000000:4000000))", "if(h.length+axs.length>(TS.idb?268435456:4000000))"),
    ("var TS=(function(){var SMALL=300000,", "var TS=(function(){var SMALL=64000,"),
]
ADD = ("<script id=\"tab-room\">/* " + MARK + " · the browser is asked to keep Tabula's stores */\n"
       "(function(){try{var T=window.__tabStore;if(!T||!T.idb||!navigator.storage||!navigator.storage.persist||/Firefox\\//.test(navigator.userAgent))return;\n"
       "  navigator.storage.persisted().then(function(p){if(!p)return navigator.storage.persist();}).catch(function(){});}catch(e){}})();\n"
       "</script>\n")


def patch(s):
    if MARK in s:
        return s
    if "R130-TABULA-FOOTNOTES" not in s:
        raise SystemExit("apply tabula_notes_patch.py (R130) first")
    for old, new in REPS:
        if s.count(old) != 1:
            raise SystemExit("tabula_room_patch: %r found %d times" % (old[:50], s.count(old)))
        s = s.replace(old, new)
    # the page's own </body> is its last; the earlier ones are inside the Word and web exports' strings
    i = s.rfind("</body>")
    if i < 0 or s.count("</body>\n</html>") != 1 or s.find("</body>\n</html>") != i:
        raise SystemExit("tabula_room_patch: the page's own </body> was not found")
    return s[:i] + ADD + s[i:]


if __name__ == "__main__":
    src, out = sys.argv[1], sys.argv[2]
    open(out, "w", encoding="utf-8").write(patch(open(src, encoding="utf-8").read()))
    print("written", out)
