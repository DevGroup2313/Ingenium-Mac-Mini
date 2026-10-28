"""xvfb-run -a python3 rig/t_682_sounds_wk.py <Ingenium page url>

6.8.2: Ingenium's sounds, alive (modules/r176.js), in Safari's engine (WebKitGTK, through rig/wk.py), the engine of the
iPhone and iPad apps: the cases of rig/t_682_sounds.js that matter most. Every voice is rendered away from the speakers:
it has its kind's presence at the default level, it never reaches the speakers' limit at the loudest, it is over within
2.4 seconds, a sound in the middle stays there. Then the title bar's Display key, pressed: it sounds as a key, and the
panel rising sounds as a card (when this machine's WebKit has a sound device to play on; rendering needs none)."""
import json, os, sys, time
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from wk import Session

URL = sys.argv[1]
MARK = {"notify": 0.13, "room": 0.15, "confirm": 0.10, "paper": 0.08, "keys": 0.03, "cards": 0.05}
res = []


def ok(c, what, info=""):
    res.append(bool(c))
    print(("PASS " if c else "FAIL ") + what + ("" if c else "  " + str(info)), flush=True)


with Session() as s:
    s.go(URL)
    s.wait("return window.__ingReady===true&&!!window.IngSound", 400)
    s.js("window.__e=[];addEventListener('error',function(e){window.__e.push(String(e.message));});addEventListener('unhandledrejection',function(e){window.__e.push(String(e.reason));});")
    s.js("var b=[...document.querySelectorAll('button')].find(x=>x.textContent.trim()==='Enter'&&x.offsetParent);if(b)b.click();")
    time.sleep(1)
    s.js("""window.__snd=null;(async function(){var S=window.IngSound,C=S.config(),out={};try{
      for(var role of S.roles)for(var v of role.voices){if(v==='byRoom')continue;var L=C.vol*(C.trim[role.id]==null?1:C.trim[role.id]);
        var a=await S.render(v,{level:L,seconds:3.2,tailFrom:2.4}),m=await S.render(v,{level:1.5,seconds:3.2,tailFrom:2.4});
        out[v]=a&&m?{role:role.id,loud:a.loud,max:m.peak,tail:a.tail,bal:10*Math.log10(a.energyL/a.energyR)}:null;}
      window.__snd=out;}catch(e){window.__snd={error:String(e)};}})();""")
    s.wait("return window.__snd!==null", 300)
    out = s.js("return window.__snd")
    ok("error" not in out and len(out) == 21, "every voice renders in Safari's engine", json.dumps(out)[:300])
    for v, x in out.items():
        if not isinstance(x, dict):
            ok(False, v + " renders", x)
            continue
        k = MARK[x["role"]]
        ok(k * 0.6 < x["loud"] < k * 1.6 and x["max"] < 0.95 and x["tail"] < 0.002 and abs(x["bal"]) < 0.5,
           "%s: its kind's presence (%.3f, the mark %s), below 0.95 at the loudest (%.3f), over in 2.4 s, in the middle" % (v, x["loud"], k, x["max"]), json.dumps(x))
    live = s.js("try{var C=window.AudioContext||window.webkitAudioContext;var c=new C();var r=c.state;c.close();return r;}catch(e){return 'none: '+e;}")
    s.js("go('chat')")
    time.sleep(1.6)
    n0 = s.js("return IngSound.count()")
    s.click(s.find("#displayBtn"))
    time.sleep(0.8)
    h = s.js("return IngSound.history().slice(-3).map(function(x){return x.role;})")
    if str(live).startswith("none"):
        print("NOTE no sound device for WebKit on this machine (%s): the presses are not heard here" % live)
    else:
        ok("keys" in h and "cards" in h, "the Display key sounds as a key, its panel rising as a card", json.dumps(h))
    errs = s.js("return window.__e")
    ok(not errs, "no errors on the page after it was ready", json.dumps(errs)[:300])

print("%d passed, %d failed" % (sum(res), len(res) - sum(res)))
sys.exit(0 if all(res) else 1)
