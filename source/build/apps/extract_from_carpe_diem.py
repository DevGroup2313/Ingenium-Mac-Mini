# R118: takes the whole Tabula and Abacus out of Carpe Diem, with everything Carpe Diem does to them before it shows them,
# so Ingenium shows the very same apps. Usage:  python3 -I extract_from_carpe_diem.py path/to/carpe_diem.html
# Writes, beside this file: tabula.html and abacus.html (the apps as Carpe Diem carries them, base64-decoded),
# dark.json (Carpe Diem's night dress for each) and cd_prep.js (Carpe Diem's preparation of the two, as a function
# ingCdPrep(which, html) that build_page.py writes into modules/r118.js).
import base64, json, os, re, sys

HERE = os.path.dirname(os.path.abspath(__file__))
src = open(sys.argv[1], encoding="utf-8", errors="replace").read()


def js_literals(expr):
    """The value of a JS expression made only of string literals joined by +."""
    out, i, n = [], 0, len(expr)
    while i < n:
        c = expr[i]
        if c in " \t\r\n+":
            i += 1
            continue
        if c not in "'\"":
            raise ValueError("not a string literal at %d: %r" % (i, expr[i:i + 40]))
        q, i, buf = c, i + 1, []
        while expr[i] != q:
            ch = expr[i]
            if ch == "\\":
                e = expr[i + 1]
                if e == "u":
                    buf.append(chr(int(expr[i + 2:i + 6], 16))); i += 6; continue
                if e == "x":
                    buf.append(chr(int(expr[i + 2:i + 4], 16))); i += 4; continue
                buf.append({"n": "\n", "t": "\t", "r": "\r", "b": "\b", "f": "\f", "v": "\v", "0": "\0"}.get(e, e)); i += 2; continue
            buf.append(ch); i += 1
        out.append("".join(buf)); i += 1
    return "".join(out)


def expr_after(marker):
    """The text of a JS expression from after marker up to its first ; outside a string."""
    i = src.index(marker) + len(marker); j, q, esc = i, None, False
    while True:
        c = src[j]
        if q:
            if esc: esc = False
            elif c == "\\": esc = True
            elif c == q: q = None
        elif c in "'\"": q = c
        elif c == ";": return src[i:j]
        j += 1


def function_text(head):
    i = src.index(head); k = src.index("{", i); depth, q, esc = 0, None, False
    for j in range(k, len(src)):
        c = src[j]
        if q:
            if esc: esc = False
            elif c == "\\": esc = True
            elif c == q: q = None
            continue
        if c in "'\"": q = c; continue
        if c == "{": depth += 1
        elif c == "}":
            depth -= 1
            if depth == 0: return src[i:j + 1]


# 1. the apps
for name in ("tabula", "abacus"):
    m = re.search(r'var ' + name.upper() + r'_SRC = "([^"]+)"', src)
    html = base64.b64decode(m.group(1)).decode("utf-8")
    open(os.path.join(HERE, name + ".html"), "w", encoding="utf-8").write(html)
    print(name, len(html), "characters")

# 2. the night dress
block = src[src.index("var DARK={"):]
block = block[:block.index("};") + 2]
dark = {}
for key in ("tabula", "abacus"):
    m = re.search(key + r':"((?:[^"\\]|\\.)*)"', block)
    dark[key] = json.loads('"' + m.group(1) + '"')
open(os.path.join(HERE, "dark.json"), "w").write(json.dumps(dark, indent=0))

# 3. the preparation: the Tabula and Abacus branches of __cdPrepSrc, with the two scripts it adds to Tabula
prep = function_text("function __cdPrepSrc(which,__wl){")
t0, t1 = prep.index("if(which==='tabula')"), prep.index("if(which==='scriba')")
a0, a1 = prep.index("if(which==='abacus')"), prep.index("if(which==='slides')")
branches = (prep[t0:t1] + prep[a0:a1]).replace("window.__cdRealPagesJs", "__cdRealPagesJs")
fold = js_literals(expr_after("var __cdFoldBarJs = "))
pages = js_literals(expr_after("window.__cdRealPagesJs="))
js = ("function ingCdPrep(which,__h){var __cdFoldBarJs=" + json.dumps(fold) + ";var __cdRealPagesJs=" + json.dumps(pages) + ";\n"
      + branches + "\nreturn __h;}")
js = js.replace("</script", "<\\/script")
open(os.path.join(HERE, "cd_prep.js"), "w", encoding="utf-8").write(js)
print("cd_prep.js", len(js), "characters; fold bar", len(fold), "; real pages", len(pages))
