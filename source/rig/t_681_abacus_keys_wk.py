"""xvfb-run -a python3 rig/t_681_abacus_keys_wk.py <Ingenium page url>

6.8.1: Abacus's grid in Safari's engine (WebKitGTK, through rig/wk.py), pressed as a person presses it: the cases of
rig/t_681_abacus_keys.js that matter most. A cell chosen is replaced by what is typed; F2 and a double press edit it in
place; Escape gives back what was there; the arrows go from cell to cell and, with Shift, widen the selection; Copy and
Paste with the keys take a range, its formula following it. apps/abacus_ribbon_patch.py."""
import os, sys, time
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from wk import Session

URL = sys.argv[1]
res = []
ENTER, ESC, UP, DOWN, LEFT, RIGHT, SHIFT, CTRL, F2, END, DEL = ("", "", "", "", "", "",
                                                               "", "", "", "", "")


def ok(c, what, info=""):
    res.append(bool(c))
    print(("PASS " if c else "FAIL ") + what + ("" if c else "  " + str(info)), flush=True)


with Session() as s:
    def enter():
        s.frame(None)
        s.go(URL)
        s.wait("return window.__ingReady===true", 400)
        s.js("var b=[...document.querySelectorAll('button')].find(x=>x.textContent.trim()==='Enter'&&x.offsetParent);if(b)b.click();")
        time.sleep(1)
        s.js("go('abacus')")
        s.wait("var f=document.querySelector('#ing-desk iframe[data-app=\"abacus\"]');try{return !!f.contentWindow.document.querySelector('#grid td[data-ref]');}catch(e){return false;}", 120)
        time.sleep(2)
        s.frame(s.find('#ing-desk iframe[data-app="abacus"]'))
    enter()
    pt = lambda r: s.js("var e=document.querySelector('#grid td[data-ref=\"'+arguments[0]+'\"]');e.scrollIntoView({block:'nearest'});var b=e.getBoundingClientRect();return [b.left+b.width/2,b.top+b.height/2];", r)
    raw = lambda r: s.js("var v=window.__abx.data()[arguments[0]];return v==null?'':String(v);", r)
    shown = lambda r: s.js("return document.querySelector('#grid td[data-ref=\"'+arguments[0]+'\"]').textContent;", r)
    here = lambda: s.js("var a=document.activeElement;return a&&a.getAttribute?a.getAttribute('data-ref'):null;")
    chosen = lambda: ",".join(sorted(s.js("return window.__abGetSelRefs()||[];")))

    def click(r, n=1):
        p = pt(r)
        s.click_at(p[0], p[1], count=n)
        time.sleep(.25)

    def key(*k):
        s.press(*k)
        time.sleep(.2)

    def typed(t):
        s.press(*list(t))
        time.sleep(.2)

    click("A10"); typed("5"); key(ENTER); typed("7"); key(RIGHT)
    ok(raw("A10") == "5" and raw("A11") == "7" and here() == "B11", "Enter goes down; an arrow ends the typing, keeps it and goes on", [raw("A10"), raw("A11"), here()])
    typed("=A10+A11"); key(ENTER)
    click("A10"); typed("9"); key(ENTER)
    ok(raw("A10") == "9" and shown("B11") == "16", "typing in a chosen cell replaces what was there, and the formula follows", [raw("A10"), shown("B11")])
    click("A10"); key(F2); typed("1"); key(ENTER)
    ok(raw("A10") == "91", "F2 edits the cell in place", raw("A10"))
    click("A10", 2); key(END); typed("2"); key(ENTER)
    ok(raw("A10") == "912", "a double press edits it in place", raw("A10"))
    click("A10"); typed("abc"); key(ESC)
    ok(shown("A10") == "912", "Escape gives back what was in the cell", shown("A10"))
    key(ENTER)
    click("C10"); key(DOWN); key(DOWN); key(RIGHT); key(UP)
    ok(here() == "D11", "the arrows go from cell to cell", here())
    key((SHIFT, ENTER))
    ok(here() == "D10", "Shift+Enter goes up a row", here())
    click("A10"); key((SHIFT, DOWN)); key((SHIFT, RIGHT))
    ok(chosen() == "A10,A11,B10,B11", "Shift and the arrows widen the selection", chosen())
    key((CTRL, "c")); click("D14"); key((CTRL, "v")); time.sleep(.3)
    got = [raw("D14"), raw("D15"), raw("E15")]
    ok(got == ["912", "7", "=D14+D15"], "Ctrl+C and Ctrl+V take the range, its formula following it", got)
    time.sleep(1)   # two presses close together are a double press, which edits the cell in place
    click("D14"); key(DEL); key(ENTER)
    ok(raw("D14") == "", "Delete empties the chosen cell", raw("D14"))
    ok(not s.js("return (window.__fe||[]).length"), "no errors")
print("%d passed, %d failed" % (res.count(True), res.count(False)))
sys.exit(1 if res.count(False) else 0)
