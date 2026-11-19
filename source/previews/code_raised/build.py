"""r335's live preview: Code's start window as it is in 7.46 and with r335, beside Vocatio's own drop zone, by day and by night.
Each scene is the page's own markup and the style rules that draw it (capture.js), shown in a frame of its own.
    python3 -I build.py <capture folder> <out.html>"""
import json, sys
cap, out = sys.argv[1], sys.argv[2]
P = json.load(open(cap + "/parts.json", encoding="utf-8"))
css = "\n".join(P["rules"]) + "\n" + "\n".join(P["frames"])
# her rule for Ingenium and every app: no scroll bar shows, and everything still scrolls
css += "\nhtml,body,*{scrollbar-width:none;-ms-overflow-style:none}html::-webkit-scrollbar,body::-webkit-scrollbar,*::-webkit-scrollbar{display:none;width:0;height:0}"
css += "\nhtml,body{margin:0;background:transparent !important}body{padding:14px 10px 24px}#modalRoot{position:static !important;inset:auto !important;display:flex !important;justify-content:center;align-items:flex-start;padding:0 !important;background:none !important;backdrop-filter:none !important}"
data = {"css": css, "r335": P["r335"], "scenes": P["scenes"]}
tpl = open("page.html", encoding="utf-8").read()
open(out, "w", encoding="utf-8").write(tpl.replace("/*__DATA__*/null", json.dumps(data).replace("</", "<\\/")))
print(out, len(open(out, encoding="utf-8").read()))
