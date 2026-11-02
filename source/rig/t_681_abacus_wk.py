"""xvfb-run -a python3 rig/t_681_abacus_wk.py <Ingenium page url>

6.8.1: Abacus inside Ingenium in Safari's engine (WebKitGTK, through rig/wk.py), pressed as a person presses it: ranges chosen
by dragging with the pointer, keys pressed, the confirmation of a deleted row answered. The cases rig/t_681_abacus.js runs in
Chromium that matter most: every cell of a range reached, the decimal places, the borders, a change kept at once.
apps/abacus_ribbon_patch.py."""
import json, os, sys, time
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from wk import Session

URL = sys.argv[1]
res = []


def ok(c, what, info=""):
    res.append(bool(c))
    print(("PASS " if c else "FAIL ") + what + ("" if c else "  " + str(info)), flush=True)


LOOK = """return arguments[0].map(function(r){var td=document.querySelector('#grid td[data-ref="'+r+'"]'),c=getComputedStyle(td),st=(window.__abx.sty()[r]||{});
  return {r:r,text:td.textContent,w:c.fontWeight,i:c.fontStyle,a:c.textAlign,fg:c.color,bg:c.backgroundColor,ws:c.whiteSpace,b:[st.bt,st.bb,st.bl,st.br].map(function(x){return x?1:0;}).join('')};});"""
R = ["A2", "A3", "A4", "B2", "B3", "B4"]

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
    look = lambda refs: s.js(LOOK, refs)
    pt = lambda r: s.js("var b=document.querySelector('#grid td[data-ref=\"'+arguments[0]+'\"]').getBoundingClientRect();return [b.left+b.width/2,b.top+b.height/2];", r)

    def drag(a, z):
        A, Z = pt(a), pt(z)
        acts = [{"type": "pointerMove", "origin": "viewport", "x": int(A[0]), "y": int(A[1]), "duration": 0}, {"type": "pointerDown", "button": 0}]
        for k in range(1, 7):
            acts.append({"type": "pointerMove", "origin": "viewport", "x": int(A[0] + (Z[0] - A[0]) * k / 6), "y": int(A[1] + (Z[1] - A[1]) * k / 6), "duration": 40})
        acts.append({"type": "pointerUp", "button": 0})
        s._pointer(acts)
        time.sleep(.3)

    def cell(r):
        p = pt(r)
        s.click_at(p[0], p[1])
        time.sleep(.25)

    def press(css):
        p = s.js("var e=document.querySelector(arguments[0]);if(!e)return null;var b=e.getBoundingClientRect();return [b.left+b.width/2,b.top+b.height/2];", css)
        if not p:
            raise RuntimeError("not on the ribbon: " + css)
        if p[0] < 0 or p[0] > s.js("return innerWidth") or p[1] < 0:  # past the ribbon's edge: brought into view, as its arrow does
            s.js("document.querySelector(arguments[0]).scrollIntoView({block:'nearest',inline:'center'})", css)
            time.sleep(.3)
            p = s.js("var b=document.querySelector(arguments[0]).getBoundingClientRect();return [b.left+b.width/2,b.top+b.height/2];", css)
        s.click_at(p[0], p[1])
        time.sleep(.3)

    def tile(pop, name):
        p = s.js("var P=arguments[0],N=arguments[1],e=[...document.querySelectorAll(P+' .xg-tile')].find(function(e){return e.title===N||e.textContent.trim().indexOf(N)===0;});if(!e)return null;var b=e.getBoundingClientRect();return [b.left+b.width/2,b.top+b.height/2];", pop, name)
        if p:
            s.click_at(p[0], p[1])
            time.sleep(.3)
        return bool(p)

    drag("A2", "B4")
    ok(s.js("return window.__abGetSelRefs().length") == 6, "a drag with the pointer selects the range")
    press("#bBold"); press("#bItalic")
    v = look(R); ok(all(int(x["w"]) >= 600 and x["i"] == "italic" for x in v), "Bold and Italic reach every cell of the range", json.dumps([x["w"] + x["i"] for x in v]))
    s.js("var i=document.getElementById('abFg');i.value='#c0392b';i.dispatchEvent(new Event('input',{bubbles:true}));i.dispatchEvent(new Event('change',{bubbles:true}));")
    time.sleep(.3)
    v = look(R); ok(all(x["fg"] == "rgb(192, 57, 43)" for x in v), "the font colour reaches every cell of the range", json.dumps([x["fg"] for x in v]))
    press("#abWrap"); v = look(R); ok(all(x["ws"] == "normal" for x in v), "Wrap reaches every cell of the range", json.dumps([x["ws"] for x in v]))
    press("#abWrap")
    drag("A2", "B4"); press("#borderBtn"); tile("#xgBorders", "All")
    v = look(R); ok(all(x["b"] == "1111" for x in v), "All borders reaches every cell of the range", json.dumps([x["b"] for x in v]))
    drag("A2", "B4"); press("#borderBtn"); tile("#xgBorders", "None")
    drag("A2", "B4"); press("#borderBtn"); tile("#xgBorders", "Thick")
    v = look(R); ok([x["r"] + ":" + x["b"] for x in v] == ["A2:1010", "A3:0010", "A4:0110", "B2:1001", "B3:0001", "B4:0101"], "Thick draws round the outline of the range", json.dumps([x["r"] + ":" + x["b"] for x in v]))
    drag("A2", "B4"); ok(s.js("return window.__abGetSelRefs().length") == 6, "a drag across the same cells again selects them again")
    drag("C2", "C4"); press("#abCur"); press("#abDec")
    v = look(["C2", "C3", "C4"]); ok([x["text"] for x in v] == ["$12.000", "$1.500", "$4.000"], "a decimal place added to every number of the range, still in currency", json.dumps([x["text"] for x in v]))
    press("#abInc"); press("#abInc"); press("#abInc"); press("#abInc")
    v = look(["C2", "C3", "C4"]); ok([x["text"] for x in v] == ["$12", "$2", "$4"], "decimal places taken away one at a time, down to none, still in currency", json.dumps([x["text"] for x in v]))
    s.js("var f=document.getElementById('numFmt');f.value='';f.dispatchEvent(new Event('change',{bubbles:true}));")
    time.sleep(.3)
    v = look(["C2", "C3", "C4"]); ok([x["text"] for x in v] == ["12", "1.5", "4"], "General from the list reaches every number of the range", json.dumps([x["text"] for x in v]))
    drag("E2", "F3"); press("#cellStyleBtn"); tile("#xgStyles", "Good")
    v = look(["E2", "E3", "F2", "F3"]); ok(all(x["bg"] == "rgb(198, 239, 206)" for x in v), "a cell style reaches every cell of the range", json.dumps([x["bg"] for x in v]))
    cell("A3"); press("#abInsertRow")
    v = look(["A3", "A4"]); ok(v[0]["text"] == "" and v[1]["text"] == "Pens" and int(v[1]["w"]) >= 600, "a row inserted moves the cells below down, with their formatting", json.dumps(v))
    cell("A3"); press("#abDeleteRow")
    try:
        s.req("POST", "/alert/accept", {})
    except Exception:
        pass
    time.sleep(.4)
    v = look(["A3"]); ok(v[0]["text"] == "Pens" and int(v[0]["w"]) >= 600, "the row deleted, once asked, brings them back", json.dumps(v))
    cell("E9"); press("#bBold")
    enter()
    v = look(["E9"] + R)
    ok(int(v[0]["w"]) >= 600, "a change made just before Abacus is closed is there when it is opened again", json.dumps(v[0]))
    ok(all(int(x["w"]) >= 600 and x["fg"] == "rgb(192, 57, 43)" for x in v[1:]), "the range keeps its formatting when Abacus is opened again", json.dumps([x["w"] + x["fg"] for x in v[1:]]))
print("%d passed, %d failed" % (res.count(True), res.count(False)))
sys.exit(1 if res.count(False) else 0)
