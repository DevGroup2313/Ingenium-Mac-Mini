"""xvfb-run -a python3 rig/t_681_ribbon_wk.py <Ingenium page url, or a Tabula page url> [screenshot.png]

6.8.1: Tabula's ribbon in Safari's engine (WebKitGTK, through rig/wk.py), pressed as a person presses it: words chosen with a
double-click, keys and palettes pressed with the pointer, the font and size lists pressed (they take the focus, as in Safari)
and then chosen, words typed with the keys. Each thing the ribbon gives must land at the first press, on selected words and
on the words typed next, and still be there a few seconds later. apps/tabula_ribbon_patch.py."""
import json, os, sys, time
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from wk import Session

URL = sys.argv[1]
SHOT = sys.argv[2] if len(sys.argv) > 2 and not sys.argv[2].startswith("-") else None
TRACE = "--trace" in sys.argv
WORD = "var W=arguments[0],ed=document.getElementById('editor'),tw=document.createTreeWalker(ed,4),n,m;while((n=tw.nextNode())){m=new RegExp('\\\\b'+W+'\\\\b').exec(n.nodeValue);if(m)break;}"
FIND = WORD + "if(!m)return null;var g=document.createRange();g.setStart(n,m.index);g.setEnd(n,m.index+W.length);var b=g.getBoundingClientRect();return [b.left+b.width/2,b.top+b.height/2];"
STYLE = (WORD + "if(!m)return null;var e=n.parentElement,c=getComputedStyle(e),bg='';for(var x=e;x&&x!==ed;x=x.parentElement){var b=getComputedStyle(x).backgroundColor;"
         "if(b&&b!=='rgba(0, 0, 0, 0)'&&b!=='transparent'){bg=b;break;}}return {color:c.color,size:c.fontSize,weight:c.fontWeight,style:c.fontStyle,family:c.fontFamily.split(',')[0].replace(/\"/g,''),bg:bg};")
res = []


def ok(c, what, info=""):
    res.append(bool(c))
    print(("PASS " if c else "FAIL ") + what + ("" if c else "  " + str(info)), flush=True)


with Session() as s:
    s.go(URL)
    if "ingenium" in URL.lower():
        s.wait("return window.__ingReady===true", 400)
        s.js("var b=[...document.querySelectorAll('button')].find(x=>x.textContent.trim()==='Enter'&&x.offsetParent);if(b)b.click();")
        time.sleep(1)
        s.js("go('tabula')")
        s.wait("var f=document.querySelector('#ing-desk iframe[data-app=\"tabula\"]');try{return !!f.contentWindow.document.getElementById('editor')&&f.contentWindow.document.readyState==='complete';}catch(e){return false;}", 120)
        time.sleep(2)
        s.frame(s.find('#ing-desk iframe[data-app="tabula"]'))
    else:
        s.wait("return !!document.getElementById('editor')&&document.readyState==='complete'")
        time.sleep(1.5)
    s.js("window.__fe=[];window.addEventListener('error',function(e){window.__fe.push(String(e.message));});")
    if TRACE:  # what the selection and the focus did, shown when a check fails
        s.js("window.__trace=[];var T=function(x){window.__trace.push(Date.now()%100000+' '+x);};document.addEventListener('selectionchange',function(){T('sel '+JSON.stringify(String(getSelection()))+' '+((document.activeElement||{}).id||(document.activeElement||{}).tagName));});"
             "['mousedown','click','focusin','focusout','keydown','change','input'].forEach(function(t){document.addEventListener(t,function(e){T(t+' '+(e.target.id||e.target.className||e.target.tagName)+(e.inputType?' '+e.inputType:''));},true);});")
    ed = s.find("#editor")
    s.click(ed)
    s.keys(ed, "Alpha beta gamma delta epsilon zeta theta iota kappa lambda omicron sigma. ")
    time.sleep(.4)
    st = lambda w: s.js(STYLE, w)
    base = st("Alpha")

    def pick(w):
        r = s.js(FIND, w)
        s.click_at(r[0], r[1], count=2)
        time.sleep(.3)

    def press(css, i=0):
        r = s.js("var e=document.querySelectorAll(arguments[0])[arguments[1]];if(!e)return null;var b=e.getBoundingClientRect();return [b.left+b.width/2,b.top+b.height/2];", css, i)
        if not r:
            raise RuntimeError("not on the ribbon: " + css)
        s.click_at(r[0], r[1])
        time.sleep(.35)

    def choose(sel, value):
        press(sel)                       # the list takes the focus, as a press on it does
        s.press("")                # its menu closed again
        time.sleep(.2)
        s.js("var f=document.querySelector(arguments[0]);for(var i=0;i<f.options.length;i++)if(f.options[i].value===arguments[1]||f.options[i].text===arguments[1]){f.selectedIndex=i;break;}"
             "f.dispatchEvent(new Event('input',{bubbles:true}));f.dispatchEvent(new Event('change',{bubbles:true}));", sel, value)
        time.sleep(.35)

    def at_end():
        r = s.js(FIND, "sigma")
        s.click_at(r[0] + 40, r[1])     # past the last word: the caret at the end, nothing selected
        s.press("")
        time.sleep(.25)

    def typed(w):
        s.press(*list(w + " "))
        time.sleep(.35)
        return st(w)

    later = []

    def check(what, w, test):
        v = st(w)
        ok(v and test(v), what, json.dumps(v))
        if TRACE and not (v and test(v)):
            print("  trace:", json.dumps(s.js("return window.__trace")))
        s.js("window.__trace=[]")
        later.append((what, w, test))

    # words selected first
    pick("beta"); press("#foreGalBtn"); press("#cdForeGal .pal button", 3)
    check("the colour palette colours the selected word", "beta", lambda v: v["color"] != base["color"])
    pick("gamma"); press("#hiliteGalBtn"); press("#cdHilGal .pal button", 2)
    check("the highlight palette marks the selected word", "gamma", lambda v: bool(v["bg"]))
    pick("delta"); choose("#sizeSel", "18")
    check("18 from the size list makes the selected word 18 points (24 pixels)", "delta", lambda v: v["size"] == "24px")
    pick("epsilon"); choose("#fontSel", "Georgia, serif")
    check("the font list sets the selected word", "epsilon", lambda v: v["family"] == "Georgia")
    pick("zeta"); press('.ribbon [data-cmd="bold"]')
    check("bold bolds the selected word", "zeta", lambda v: int(v["weight"]) >= 600)
    pick("theta"); choose("#sizeSel", "14"); press("#foreGalBtn"); press("#cdForeGal .pal button", 4)
    check("a size and then a colour, without selecting again, both land", "theta", lambda v: abs(float(v["size"][:-2]) - 56 / 3) < .01 and v["color"] != base["color"])
    pick("iota"); g0 = float(st("iota")["size"][:-2]); press("#growFont"); press("#growFont")
    check("Grow Font, pressed twice, grows the word twice", "iota", lambda v: abs(float(v["size"][:-2]) - (g0 + 4)) < .1)
    pick("kappa"); press("#shrinkFont"); press("#shrinkFont")
    check("Shrink Font, pressed twice, shrinks the word twice", "kappa", lambda v: abs(float(v["size"][:-2]) - (float(base["size"][:-2]) - 4)) < .1)
    # nothing selected, then typing
    at_end(); press("#foreGalBtn"); press("#cdForeGal .pal button", 3); typed("crimson")
    check("a colour chosen with nothing selected reaches the words typed next", "crimson", lambda v: v["color"] != base["color"])
    press("#foreGalBtn"); press("#cdForeGal .gal-foot", 0); typed("plain")
    check("Automatic, then typing: the words are in the page's own ink", "plain", lambda v: v["color"] == base["color"])
    press("#hiliteGalBtn"); press("#cdHilGal .pal button", 2); typed("marked")
    check("a highlight chosen with nothing selected reaches the words typed next", "marked", lambda v: bool(v["bg"]))
    press("#hiliteGalBtn"); press("#cdHilGal .gal-foot", 0); typed("bare")
    check("No colour, then typing: the words have no highlight", "bare", lambda v: not v["bg"])
    press("#hiliteGalBtn"); press("#cdHilGal .pal button", 4); press('.ribbon [data-cmd="bold"]'); typed("boldmark")
    press("#hiliteGalBtn"); press("#cdHilGal .gal-foot", 0); typed("boldbare")
    check("bold in a highlight, then No colour: the next words are bold, without the highlight", "boldbare", lambda v: not v["bg"] and int(v["weight"]) >= 600)
    press("#foreGalBtn"); press("#cdForeGal .pal button", 6); typed("tinted")
    press("#foreGalBtn"); press("#cdForeGal .gal-foot", 0); typed("inked")
    check("bold in a colour, then Automatic: the next words are bold, in the page's own ink", "inked", lambda v: v["color"] == base["color"] and int(v["weight"]) >= 600)
    press('.ribbon [data-cmd="bold"]')
    choose("#sizeSel", "18"); typed("large"); typed("larger")
    check("18 chosen with nothing selected: the next word is 18 points", "large", lambda v: v["size"] == "24px")
    check("and so is the word after it", "larger", lambda v: v["size"] == "24px")
    choose("#sizeSel", "14"); press('.ribbon [data-cmd="italic"]'); typed("slanted")
    check("a size, then italic, then typing: the words take both", "slanted", lambda v: abs(float(v["size"][:-2]) - 56 / 3) < .01 and v["style"] == "italic")
    press('.ribbon [data-cmd="italic"]')
    choose("#sizeSel", "12"); typed("normal")
    check("12 chosen after it: the words go back to 12 points", "normal", lambda v: v["size"] == "16px")
    choose("#fontSel", "Georgia, serif"); typed("georgian")
    check("a font chosen with nothing selected reaches the words typed next", "georgian", lambda v: v["family"] == "Georgia")
    press('.ribbon [data-cmd="bold"]'); typed("heavy")
    check("bold pressed with nothing selected reaches the words typed next", "heavy", lambda v: int(v["weight"]) >= 600)
    time.sleep(4)
    for what, w, test in later:
        v = st(w)
        ok(v and test(v), what + ", and is still there 4 seconds later", json.dumps(v))
    v = st("lambda")
    ok(v and v["color"] == base["color"] and v["size"] == base["size"] and not v["bg"], "a word never chosen is as it was", json.dumps(v))
    fe = s.js("return window.__fe")
    ok(not fe, "no errors", fe)
    if SHOT:
        s.frame(None)
        s.shot(SHOT)
print("%d passed, %d failed" % (res.count(True), res.count(False)))
sys.exit(1 if res.count(False) else 0)
