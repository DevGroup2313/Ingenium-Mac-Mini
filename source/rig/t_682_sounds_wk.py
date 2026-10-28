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
REL = {"firstLight": 0.0486, "studyLamp": 0.0459, "evensong": 0.0478, "studyChime": 0.061, "handBell": 0.0696, "inkDrop": 0.0357, "sealMark": 0.0255, "pressClick": 0.0052, "feltSeal": 0.0181,
       "pageSet": 0.0324, "bookShut": 0.0359, "lecternLift": 0.0286, "stacksPass": 0.0164, "keyPress": 0.0236, "softKey": 0.0236 * 0.72, "cardLift": 0.0286 * 0.82, "cardChime": 0.0255 * 0.65,
       "keyTouch": 0.0046, "lightTouch": 0.0046 * 0.72}   # each relative in Carpe Diem, as loud there (6.8.5: its hover tick)
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
      for(var role of S.roles)for(var v of role.voices){if(v==='byRoom'||/Off$/.test(v))continue;var L=C.vol*(C.trim[role.id]==null?1:C.trim[role.id]),lg=role.id==='room';
        var a=await S.render(v,{level:L,seconds:3.2,tailFrom:lg?1.6:2.4}),m=await S.render(v,{level:1.5,seconds:3.2,tailFrom:lg?1.6:2.4});
        out[v]=a&&m?{role:role.id,loud:a.loud,max:m.peak,tail:a.tail,bal:10*Math.log10(a.energyL/a.energyR)}:null;}
      window.__snd=out;}catch(e){window.__snd={error:String(e)};}})();""")
    s.wait("return window.__snd!==null", 300)
    out = s.js("return window.__snd")
    ok("error" not in out and len(out) == 19, "every voice renders in Safari's engine", json.dumps(out)[:300])
    for v, x in out.items():
        if not isinstance(x, dict):
            ok(False, v + " renders", x)
            continue
        k = REL[v]
        ok(k * 0.6 < x["loud"] < k * 1.4 and x["max"] < 0.95 and x["tail"] < 0.002 and abs(x["bal"]) < 0.5,
           "%s: as loud as its relative in Carpe Diem (%.4f, there %.4f), below 0.95 at the loudest (%.3f), over in time, in the middle" % (v, x["loud"], k, x["max"]), json.dumps(x))
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
