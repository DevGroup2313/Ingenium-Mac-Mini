#!/usr/bin/python3.12
"""The Forge 644 · the Editor's live preview in WebKit (WebKitGTK, the engine family of the Mac apps), driven by real X
input (xdotool) and filmed at 60 frames a second (ffmpeg x11grab), so what is measured is what the screen showed.
   xvfb-run -a -s "-screen 0 2600x1500x24" /usr/bin/python3.12 wk_644_drive.py URL WxH day|night OUT [methods] [app]
methods: wheel, wheel_fast, keys, in_preview (comma separated; default wheel,keys)
app: a page the Editor opens; by default a small app written here (forty cards under a sticky title).
For each method it writes OUT/METHOD.mkv (the film), OUT/METHOD.geo.json (where things were before it began) and
OUT/METHOD.json (the page's own record of every animation frame). wk_644_frames.py reads the films."""
import gi, sys, json, time, subprocess, os
gi.require_version("Gtk", "3.0")
gi.require_version("WebKit2", "4.1")
from gi.repository import Gtk, WebKit2, GLib

url, vp, theme, out = sys.argv[1:5]
methods = (sys.argv[5] if len(sys.argv) > 5 and sys.argv[5] else "wheel,keys").split(",")
app = sys.argv[6] if len(sys.argv) > 6 else ""
W, H = map(int, vp.split("x"))
os.makedirs(out, exist_ok=True)
HERE = os.path.dirname(os.path.abspath(__file__))
INSTALL = open(os.path.join(HERE, "wk_644_install.js")).read()
SMALL = ('<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">'
         '<title>Small app</title><style>body{font-family:sans-serif;margin:0;padding:16px;background:#fdf6e3;color:#222}'
         'header{position:sticky;top:0;background:#fff;padding:8px}.card{margin:12px 0;padding:12px;border:1px solid #ccc;'
         'border-radius:8px}</style></head><body><header><h1>Small app</h1></header><main id="m"></main><script>(function(){'
         'var m=document.getElementById("m");for(var i=0;i<40;i++){var d=document.createElement("div");d.className="card";'
         'd.textContent="Card "+(i+1)+": "+new Array(17).join("words ");m.appendChild(d);}})();</script></body></html>')

win = Gtk.Window(title="wk644")
win.set_default_size(W, H)
win.set_size_request(W, H)
win.set_resizable(False)
win.set_decorated(False)
wv = WebKit2.WebView()
st = wv.get_settings()
st.set_enable_javascript(True)
st.set_enable_smooth_scrolling(True)
st.set_hardware_acceleration_policy(WebKit2.HardwareAccelerationPolicy.ALWAYS)
win.add(wv)
win.move(0, 0)
win.show_all()
ctx = GLib.MainContext.default()
errors = []


def pump(ms):
    end = time.time() + ms / 1000.0
    while time.time() < end:
        while ctx.pending():
            ctx.iteration(False)
        time.sleep(0.002)


def call(body, timeout=120):
    """runs the body of an async function in the page and returns its result"""
    res = {}

    def cb(src, r, d=None):
        try:
            v = wv.call_async_javascript_function_finish(r)
            res["v"] = json.loads(v.to_json(0)) if v is not None and not v.is_undefined() else None
        except Exception as e:
            res["e"] = str(e)
    wv.call_async_javascript_function(body, -1, None, None, None, None, cb, None)
    end = time.time() + timeout
    while not res and time.time() < end:
        while ctx.pending():
            ctx.iteration(False)
        time.sleep(0.002)
    if "e" in res:
        errors.append(res["e"][:300])
        return None
    return res.get("v")


def xdo(*a):
    subprocess.run(["xdotool"] + [str(x) for x in a], check=False)


def wheel(x, y, notches, delay_ms, up=False):
    xdo("mousemove", int(x), int(y))
    pump(30)
    for _ in range(notches):
        xdo("click", 5 if not up else 4)
        pump(delay_ms)


wv.load_uri(url)
t0 = time.time()
booted = False
while time.time() - t0 < 240:
    pump(250)
    if call("const b=document.getElementById('forge-boot'); return !!(b && b.classList.contains('fb-gone') && document.readyState==='complete');", 10):
        booted = True
        break
print("booted", booted, round(time.time() - t0, 1), "s", flush=True)
call("const d=document.getElementById('cd-door'); const k=d&&[...d.querySelectorAll('button')].find(x=>/^Open the Editor/.test(x.textContent.trim())); if(k) k.click(); return 1;")
pump(1200)
call("if(window.FORGE&&FORGE.openRoom&&document.body.getAttribute('data-froom')!=='editor') FORGE.openRoom('editor'); return 1;")
pump(800)
if theme == "night":
    call("try{ state.theme='night'; applyTheme(); }catch(e){ document.body.setAttribute('data-theme','night'); } return 1;")
    pump(600)
if app:
    load = "const r=await fetch(%s); const b=await r.blob(); const f=new File([b], %s, {type:'text/html'});" % (json.dumps(app), json.dumps(app.split("/")[-1]))
else:
    load = "const f=new File([%s], 'small_app.html', {type:'text/html'});" % json.dumps(SMALL)
call(load + " const dt=new DataTransfer(); dt.items.add(f); const i=document.getElementById('edShell'); i.files=dt.files; i.dispatchEvent(new Event('change',{bubbles:true})); return f.size;", 180)
t1 = time.time()
while time.time() - t1 < 120:
    pump(300)
    if call("return /live/i.test(document.getElementById('curName').textContent);", 10):
        break
pump(3000)
if os.environ.get("WK_CSS"):   # for experiments only: a style laid over the page before the runs
    call("const s=document.createElement('style'); s.textContent=%s; document.head.appendChild(s); return 1;" % json.dumps(os.environ["WK_CSS"]))
    pump(800)
# the box that scrolls the Editor's column: the nearest one above the room that really scrolls (the page's own, #cd-scroll)
SCROLLER = "(function(){for(var n=document.getElementById('room-editor').parentElement;n;n=n.parentElement){var c=getComputedStyle(n);if(/auto|scroll/.test(c.overflowY)&&n.scrollHeight>n.clientHeight+2)return n;}return document.getElementById('cd-scroll');})()"
GEO = """const sc=document.getElementById('cd-scroll'), st=document.getElementById('stage'), th=document.getElementById('thread'), fr=document.getElementById('frame');
const r=o=>{const q=o.getBoundingClientRect(); return {x:q.left,y:q.top,w:q.width,h:q.height};};
return {sc:r(sc), max:sc.scrollHeight-sc.clientHeight, st:r(st), th:th?r(th):null, fr:r(fr), view:document.body.getAttribute('data-stageview'),
  theme:document.body.getAttribute('data-theme'), cur:document.getElementById('curName').textContent, vw:innerWidth, vh:innerHeight,
  build:(window.CD_BUILD||{}).pass, steady:!!window.__forgePreviewSteady, ua:navigator.userAgent};"""
geo = call(GEO)
print("geo", json.dumps(geo), flush=True)


def pts():
    th, s, f = geo["th"], geo["st"], geo["fr"]
    left = (th["x"] + min(200, th["w"] / 2), max(th["y"] + 40, min(H - 60, th["y"] + 300)))
    inprev = (s["x"] + s["w"] / 2, max(f["y"] + 40, min(H - 60, f["y"] + 200)))
    return left, inprev


def keys(l, p):
    # focus the box that scrolls (as a click on the page would), then the keys; never as far as the end, where the
    # preview rightly leaves with the end of the Editor
    call("const a=document.activeElement; if(a&&a.blur&&a!==document.body) a.blur(); const s=" + SCROLLER + "; s.tabIndex=-1; s.focus({preventScroll:true}); return 1;")
    for k, n, gap in (("Down", 12, 40), ("Page_Down", 2, 300), ("Page_Up", 2, 300), ("Up", 12, 40)):
        for _ in range(n):
            xdo("key", k)
            pump(gap)


RUN = {
    "wheel": lambda l, p: (wheel(l[0], l[1], 28, 30), wheel(l[0], l[1], 28, 30, True)),
    "wheel_fast": lambda l, p: (wheel(l[0], l[1], 36, 8), pump(200), wheel(l[0], l[1], 36, 8, True)),
    "keys": keys,
    "in_preview": lambda l, p: (wheel(p[0], p[1], 40, 20), wheel(p[0], p[1], 40, 20, True)),
}
results = {}
for name in methods:
    if name not in RUN:
        continue
    call("const e=" + SCROLLER + "; e.scrollTop=0; document.getElementById('cd-scroll').scrollTop=0; try{document.getElementById('frame').contentWindow.scrollTo(0,0);}catch(e){} return 1;")
    pump(1700)
    geo = call(GEO)
    json.dump(geo, open(os.path.join(out, name + ".geo.json"), "w"))
    # WK_NOREC=1 films without the page's own record, which reads the layout in every frame (to see that the record
    # itself does not cause what is filmed)
    call("window.__scroller644=" + SCROLLER + "; " + (INSTALL if not os.environ.get("WK_NOREC") else "") + " return 1;")
    ff = subprocess.Popen(["ffmpeg", "-loglevel", "error", "-y", "-f", "x11grab", "-framerate", "60", "-video_size", "%dx%d" % (W, H),
                           "-i", os.environ.get("DISPLAY", ":99") + "+0,0", "-c:v", "ffv1", os.path.join(out, name + ".mkv")], stdin=subprocess.PIPE)
    pump(500)
    RUN[name](*pts())
    pump(1500)
    try:
        ff.communicate(b"q", timeout=30)
    except Exception:
        ff.kill()
    rec = call("if(!window.__rec644) return null; window.__rec644.on=false; return window.__rec644;")
    if rec:
        json.dump(rec, open(os.path.join(out, name + ".json"), "w"))
    fr = rec["frames"] if rec else []
    sc = [f["sc"] for f in fr]
    print(name, "page frames", len(fr), "scrolled", [min(sc), max(sc)] if sc else None, "held", rec and rec.get("heldMax"), flush=True)
json.dump({"geo": geo, "errors": errors}, open(os.path.join(out, "drive.json"), "w"), indent=1)
print("errors", errors[:4], flush=True)
