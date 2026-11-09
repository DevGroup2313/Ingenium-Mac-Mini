"""Ingenium 6.19: the computer apps' side of Your page (build/desktop/app_page_619.py), on an ingenium_app.py it has patched.
A stand-in page and folders made for the test, in a folder of their own that is not the person's; every page here is invented.
    python3 -I rig/t_619_app_page.py <repo>/ingenium_app.py      (34 checks, and 38 with app_page_620.py; Mac and Windows alike)"""
import importlib.util, os, sys, tempfile, time, json, urllib.request, threading
app = sys.argv[1]
tmp = tempfile.mkdtemp(prefix="pg619-")
os.environ["HOME"] = tmp; os.environ["XDG_DATA_HOME"] = os.path.join(tmp, "data")
spec = importlib.util.spec_from_file_location("ingapp", app); m = importlib.util.module_from_spec(spec); spec.loader.exec_module(m)
m._PAGE_WAIT = 1.0
ok = bad = 0
def check(name, cond, extra=""):
    global ok, bad
    if cond: ok += 1; print("  ok  ", name)
    else: bad += 1; print("  FAIL", name, extra)
tail = '<script id="ing-tail:ing-eyes" type="ingenium/b64">' + "QUJD" * 600 + '</script>\n'
def page(word, tails=True):
    return ('<!doctype html>\n<html><head><title>Stand-in</title></head><body>\n<p id="w">%s</p>\n'
            '<script id="ing-eyes" type="ingenium/b64" data-defer="#ing-tail:ing-eyes"></script>\n'
            '<script>window.__INGENIUM_BOOTED=1;</script>\n%s</body>\n</html>\n') % (word, tail if tails else "")
bdir = os.path.join(tmp, "app"); os.makedirs(bdir)
built = os.path.join(bdir, "ingenium.html"); open(built, "w").write(page("built"))
m._APP_HTML_PATH = built
check("no choice: the built page", m._page_choose(built) == built and m._PAGE["running"] == "")
# a changed page in three pieces, without its carried block
txt = page("changed one", tails=False); n = len(txt) // 3
r1 = m._page_put(txt[:n], True, False); r2 = m._page_put(txt[n:2*n]); r3 = m._page_put(txt[2*n:], False, True, "my first change")
check("three pieces kept as a version", r3.get("ok") and r3.get("put_back") == 1 and not r3.get("missing"), r3)
v1 = r3["id"]; f1 = m._page_file(v1); body = open(f1).read()
check("its carried block put back before </body>", body.count('id="ing-tail:ing-eyes"') == 1 and body.index("ing-tail:ing-eyes\" type") < body.rindex("</body>") and "changed one" in body)
check("not a web page: refused", not m._page_put("hello", True, True).get("ok"))
check("not Ingenium's page: refused", not m._page_put("<!doctype html><html><body>x</body></html>", True, True).get("ok"))
q = page("from the window", tails=False).replace('data-defer="#ing-tail:ing-eyes"', 'data-defer="/_payload/ing-eyes" data-defer-bytes="2400"')
rq = m._page_put(q, True, True)
check("a page saved from the window: its address for the block named again and the block put back", rq.get("ok") and rq.get("put_back") == 1 and 'data-defer="#ing-tail:ing-eyes"' in open(m._page_file(rq["id"])).read(), rq)
time.sleep(1.1)
# choose v1 for the next start
check("use for the next start", m._page_use(v1).get("restart"))
check("the start serves it", m._page_choose(built) == f1 and m._PAGE["running"] == v1 and m._PAGE["serve"] == f1)
st = m._pages_read(); check("one try counted", st["tries"].get(v1) == 1)
# it never reported in: the next start goes back
check("did not start: back to the built page", m._page_choose(built) == built)
st = m._pages_read(); check("why is kept", st["back"] and st["back"]["from"] == v1 and st["back"]["to"] == "" and "did not start" in st["back"]["why"], st["back"])
# choose again, and it reports in
m._page_use(v1); m._page_choose(built); r = m._page_started()
st = m._pages_read(); check("reported in: it works", r["running"] == v1 and st["good"].get(v1) and st["tries"].get(v1) == 0)
check("a page that worked: kept at the first start that does not come up", m._page_choose(built) == f1)
check("and at the second", m._page_choose(built) == f1)
check("left at the third", m._page_choose(built) == built and m._pages_read()["back"]["why"].endswith("twice in a row"))
# a newer version that fails goes back to v1, the last that worked
m._page_use(v1); m._page_choose(built); m._page_started()
r4 = m._page_put(page("second change", tails=False), True, True); v2 = r4["id"]
m._page_use(v2); f2 = m._page_choose(built)
check("the newer version starts", f2 == m._page_file(v2))
check("it fails: back to the last that worked, not the built page", m._page_choose(built) == f1 and m._pages_read()["back"]["to"] == v1)
# the server: the chosen page at the built page's own address
m._set_app_page(f1); m._PAGE["serve"] = f1
port = m._start_local_server(bdir, "ingenium.html"); m._PAGE["port"] = port
def get(path, doc=False):
    req = urllib.request.Request("http://127.0.0.1:%d%s" % (port, path), headers={"Sec-Fetch-Dest": "document"} if doc else {})
    with urllib.request.urlopen(req, timeout=10) as res: return res.read().decode()
w = get("/ingenium.html?b=x", doc=True)
check("the window's load: the chosen page, its block left for later", "changed one" in w and 'data-defer="/_payload/ing-eyes"' in w and "QUJD" not in w)
check("the block, when asked for", get("/_payload/ing-eyes").startswith("QUJD"))
whole = get("/ingenium.html")
check("the page read whole (the Workshop, the kits): the chosen one", "changed one" in whole and 'id="ing-tail:ing-eyes"' in whole)
m._PAGE["serve"] = None
check("no choice: the built page whole", "built" in get("/ingenium.html") and "changed one" not in get("/ingenium.html"))
# now, in the window
class Win:
    def __init__(s): s.urls = []
    def load_url(s, u): s.urls.append(u)
win = Win()
m._page_use(v1); m._PAGE["serve"] = None; m._PAGE["running"] = ""
rn = m._page_use(v2, True, win); time.sleep(0.3)
check("now: the window loads the chosen page at the same address", rn.get("now") and win.urls and win.urls[-1].startswith("http://127.0.0.1:%d/ingenium.html?b=" % port) and m._PAGE["running"] == v2, (rn, win.urls))
check("served", "second change" in get("/ingenium.html?b=y", doc=True))
time.sleep(1.6)
check("it did not report in: back to the last that worked, in the window", m._PAGE["running"] == v1 and len(win.urls) >= 2 and "changed one" in get("/ingenium.html?b=z", doc=True), (m._PAGE["running"], win.urls))
m._page_started()
r5 = m._page_put(page("third", tails=False), True, True); v3 = r5["id"]
m._page_use(v3); m._page_choose(built)
check("the watchdog: a new page not up is left at once", m._page_not_up(win) and m._PAGE["running"] == v1)
check("a version in use cannot be removed", not m._page_drop(v1).get("ok"))
check("another can", m._page_drop(v3).get("ok") and not os.path.exists(m._page_file(v3)))
# at most five kept
for i in range(7):
    time.sleep(1.05); m._page_put(page("v%d" % i, tails=False), True, True)
vs = m._page_versions(); ids = [v["id"] for v in vs]
check("at most five kept, the one in use among them", len(vs) <= 6 and v1 in ids, ids)
s_ = m._page_state()
check("the state for the Workshop", s_["ok"] and s_["use"] == v1 and s_["running"] == v1 and s_["now"] and s_["builtin"]["bytes"] > 0 and s_["versions"])
check("built page from the menu: use nothing", m._page_use("", True, win).get("now") and m._PAGE["running"] == "")
# reporting in never changes her choice
m._PAGE["running"] = v1; m._page_started()
check("reporting in leaves her choice of the built page as it is", m._pages_read()["use"] == "")
# Ingenium updated: a version made on the earlier build is not started in place of the new one
m._page_use(v1); check("before the update, her page starts", m._page_choose(built) == f1)
m._page_started(); open(built, "w").write(page("built, a newer build, longer than before"))
check("after the update: the new built page starts, and why is kept", m._page_choose(built) == built and "earlier build" in (m._pages_read()["back"] or {}).get("why", ""), m._pages_read()["back"])
m._page_use(v1)
check("chosen again on the new build, it starts as she asks", m._page_choose(built) == f1)
# 6.20 (app_page_620.py): downloads written by the app from the file itself
if hasattr(m, "_page_save"):
    os.makedirs(os.path.join(tmp, "Downloads"), exist_ok=True)
    m._set_app_page(f1)
    r6 = m._page_save("", "ingenium.html")
    check("6.20: the page running, saved from its own file", isinstance(r6, str) and os.path.isfile(r6) and open(r6, "rb").read() == open(f1, "rb").read(), r6)
    r7 = m._page_save("20990101-000000")
    check("6.20: a version not kept is refused", isinstance(r7, dict) and not r7.get("ok"), r7)
    lean_ = page("exported copy", tails=False); k = len(lean_) // 2
    m._page_export(lean_[:k], True, False); r8 = m._page_export(lean_[k:], False, True, "my copy.html")
    out = open(r8, "rb").read().decode() if isinstance(r8, str) and os.path.isfile(r8) else ""
    check("6.20: the lighter copy, in pieces, saved whole (what it carries put back)", "exported copy" in out and out.count('id="ing-tail:ing-eyes"') == 1, r8)
    check("6.20: an export keeps no version", not any("exported copy" in open(m._page_file(v["id"])).read() for v in m._page_versions()))
print("%d passed, %d failed" % (ok, bad))
