"""Takes the apps a full Forge page carries out of it, exactly as they went in.
usage: carried.py THE_FORGE.html OUT_DIR   (writes carpe_diem.html, Inkwell.html, ingenium.html, the_forge_lean.html)"""
import base64, gzip, hashlib, json, os, re, sys

page, out = sys.argv[1], sys.argv[2]
s = open(page, encoding="utf-8").read()
meta = json.loads(re.search(r'<script type="application/json" id="forge-bi-meta">(.*?)</script>', s, re.S).group(1).replace("<\\/", "</"))
names = {"cd": "carpe_diem.html", "inkwell": "Inkwell.html", "ingenium": "ingenium.html", "forge": "the_forge_lean.html"}
os.makedirs(out, exist_ok=True)
for a in meta["apps"]:
    m = re.search(r'<script type="forge/b64" id="%s">([^<]*)</script>' % re.escape(a["id"]), s)
    b = gzip.decompress(base64.b64decode(m.group(1)))
    if hashlib.sha256(b).hexdigest() != a["sha256"]:
        raise SystemExit(a["title"] + ": its fingerprint does not match")
    open(os.path.join(out, names[a["key"]]), "wb").write(b)
    print(a["title"], a["version"], len(b), "bytes")
