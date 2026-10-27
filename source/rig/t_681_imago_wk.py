"""xvfb-run -a python3 rig/t_681_imago_wk.py <Ingenium page url>

6.8.1: Imago inside Ingenium in Safari's engine (WebKitGTK, through rig/wk.py), pressed as a person presses it: words chosen
with a double-click in a slide's text, keys pressed with the pointer, the lists pressed (they take the focus) and then chosen,
words typed with the keys. The cases of rig/t_681_imago.js that matter most, and all still there when Imago is opened again.
apps/imago_ribbon_patch.py."""
import json, os, sys, time
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from wk import Session

URL = sys.argv[1]
res = []


def ok(c, what, info=""):
    res.append(bool(c))
    print(("PASS " if c else "FAIL ") + what + ("" if c else "  " + str(info)), flush=True)


WORD = "var W=arguments[0],f=document.querySelector('#slide .s-sub'),tw=document.createTreeWalker(f,4),n,m;while((n=tw.nextNode())){m=new RegExp('\\\\b'+W+'\\\\b').exec(n.nodeValue);if(m)break;}"
FIND = WORD + "if(!m)return null;var g=document.createRange();g.setStart(n,m.index);g.setEnd(n,m.index+W.length);var b=g.getBoundingClientRect();return [b.left+b.width/2,b.top+b.height/2];"
STYLE = (WORD + "if(!m)return null;var e=n.parentElement,c=getComputedStyle(e),bg='';for(var x=e;x;x=x.parentElement){var v=getComputedStyle(x).backgroundColor;if(v&&v!=='rgba(0, 0, 0, 0)'&&v!=='transparent'){bg=v;break;}if(x===f)break;}"
         "return {color:c.color,size:parseFloat(c.fontSize),weight:+c.fontWeight,family:c.fontFamily.split(',')[0].replace(/[\"']/g,''),bg:bg};")

with Session() as s:
    def enter():
        s.frame(None)
        s.go(URL)
        s.wait("return window.__ingReady===true", 400)
        s.js("var b=[...document.querySelectorAll('button')].find(x=>x.textContent.trim()==='Enter'&&x.offsetParent);if(b)b.click();")
        time.sleep(1)
        s.js("go('slides')")
        s.wait("var f=document.querySelector('#ing-desk iframe[data-app=\"slides\"]');try{return !!f.contentWindow.document.querySelector('#slide .s-sub');}catch(e){return false;}", 120)
        time.sleep(2)
        s.frame(s.find('#ing-desk iframe[data-app="slides"]'))
    enter()
    st = lambda w: s.js(STYLE, w)

    def pick(w):
        p = s.js(FIND, w)
        s.click_at(p[0], p[1], count=2)
        time.sleep(.3)

    def key(title):
        p = s.js("var t=arguments[0],e=[...document.querySelectorAll('#ribHome button')].find(function(e){return e.offsetParent&&(e.title===t||e.title.indexOf(t)===0);});if(!e)return null;var b=e.getBoundingClientRect();return [b.left+b.width/2,b.top+b.height/2];", title)
        if not p:
            raise RuntimeError("no key " + title)
        s.click_at(p[0], p[1])
        time.sleep(.3)

    def choose(first, label):
        p = s.js("var f=arguments[0],e=[...document.querySelectorAll('#ribHome select')].find(function(x){return x.options[0]&&x.options[0].text===f;});var b=e.getBoundingClientRect();return [b.left+b.width/2,b.top+b.height/2];", first)
        s.click_at(p[0], p[1])          # the list takes the focus, as a press on it does
        s.press("")
        time.sleep(.2)
        s.js("var f=arguments[0],l=arguments[1],e=[...document.querySelectorAll('#ribHome select')].find(function(x){return x.options[0]&&x.options[0].text===f;});"
             "for(var i=0;i<e.options.length;i++)if(e.options[i].text===l){e.selectedIndex=i;break;}e.dispatchEvent(new Event('input',{bubbles:true}));e.dispatchEvent(new Event('change',{bubbles:true}));", first, label)
        time.sleep(.35)

    def typed(w):
        s.press(*list(w + " "))
        time.sleep(.3)

    box = s.js("var r=document.querySelector('#slide .s-sub').getBoundingClientRect();return [r.left+20,r.top+r.height/2];")
    s.click_at(box[0], box[1])
    time.sleep(.2)
    typed("Alpha beta gamma delta epsilon zeta theta iota")
    base = st("Alpha")
    later = []

    def check(what, w, test):
        v = st(w)
        ok(v and test(v), what, json.dumps(v))
        later.append((what, w, test))

    pick("beta"); key("Bold"); check("Bold bolds the selected word", "beta", lambda v: v["weight"] >= 600)
    pick("gamma"); key("#6E1F2E"); check("a text colour colours the selected word", "gamma", lambda v: v["color"] == "rgb(110, 31, 46)")
    pick("delta"); key("#F4E3B2"); check("a highlight marks the selected word", "delta", lambda v: v["bg"] == "rgb(244, 227, 178)")
    pick("epsilon"); choose("Size", "24 pt"); check("24 pt makes the selected word half again its size", "epsilon", lambda v: abs(v["size"] - base["size"] * 1.5) < 1)
    pick("zeta"); choose("Default", "Serif (Georgia)"); check("the font list sets the selected word", "zeta", lambda v: v["family"] == "Georgia")
    pick("theta"); key("Grow the selected text"); key("Grow the selected text")
    check("Grow, pressed twice, grows the word twice", "theta", lambda v: v["size"] > base["size"] * 1.3)
    s.press("")
    key("#2F4F3A"); typed("green"); check("a colour chosen with nothing selected reaches the words typed next", "green", lambda v: v["color"] == "rgb(47, 79, 58)")
    choose("Size", "24 pt"); typed("large"); typed("larger")
    check("24 pt chosen with nothing selected: the next word is half again its size", "large", lambda v: abs(v["size"] - base["size"] * 1.5) < 1)
    check("and so is the word after it", "larger", lambda v: abs(v["size"] - base["size"] * 1.5) < 1)
    choose("Size", "16 pt"); key("Bold"); typed("heavy"); check("bold pressed with nothing selected reaches the words typed next", "heavy", lambda v: v["weight"] >= 600)
    time.sleep(1.5)
    enter()
    for what, w, test in later:
        v = st(w)
        ok(v and test(v), what + ", and is still there when Imago is opened again", json.dumps(v))
print("%d passed, %d failed" % (res.count(True), res.count(False)))
sys.exit(1 if res.count(False) else 0)
