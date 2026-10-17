# R120: the copies of The Forge and Inkwell that Ingenium carries inside it.
# Usage:  python3 -I update_builtin.py path/to/the_forge.html path/to/Inkwell.html
# Writes, beside this file: builtin/forge.html.gz and builtin/inkwell.html.gz (each page exactly as given, compressed),
# and builtin/builtin.json (for each: its version, build, date, size, SHA-256 fingerprint and file name).
# build_page.py embeds them; modules/r120.js keeps them in the app library on first start, checked against the
# fingerprint, and never puts them over a newer copy she added herself.
import gzip, hashlib, json, os, re, sys

HERE = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(HERE, "builtin")
os.makedirs(OUT, exist_ok=True)
ROMAN = {"I": 1, "V": 5, "X": 10, "L": 50, "C": 100, "D": 500, "M": 1000}
MONTHS = ["IANUARII", "FEBRUARII", "MARTII", "APRILIS", "MAII", "IUNII", "IULII", "AUGUSTI", "SEPTEMBRIS", "OCTOBRIS", "NOVEMBRIS", "DECEMBRIS"]


def roman(s):
    n = 0
    for a, b in zip(s, s[1:] + " "):
        v = ROMAN[a]
        n += -v if b != " " and ROMAN.get(b, 0) > v else v
    return n


def forge(text):
    m = re.search(r'window\.CD_BUILD=\{date:"([^"]*)",pass:"(\d+)",stamp:"([^"]*)"', text)
    if not m or 'id="section-forge"' not in text:
        sys.exit("this does not look like The Forge's page (no build stamp, or no Forge section)")
    return {"key": "forge", "title": "The Forge", "version": m.group(2), "build": m.group(3), "date": m.group(1)}


def inkwell(text):
    m = re.search(r"const BUILD='\s*([\d.]+)((?:\s*·\s*[A-Z]+){3})?", text)
    if not m or not re.search(r"<title>Inkwell\b", text[:20000]):
        sys.exit("this does not look like Inkwell's page (no BUILD line, or no Inkwell title)")
    date = ""
    if m.group(2):
        d, mo, y = [p.strip() for p in m.group(2).split("·")[1:]]
        if mo in MONTHS:
            date = "%04d-%02d-%02d" % (roman(y), MONTHS.index(mo) + 1, roman(d))
    return {"key": "inkwell", "title": "Inkwell", "version": m.group(1), "build": "", "date": date}


meta = {}
for path, read in ((sys.argv[1], forge), (sys.argv[2], inkwell)):
    raw = open(path, "rb").read()
    info = read(raw.decode("utf-8", errors="replace"))
    info.update(size=len(raw), sha256=hashlib.sha256(raw).hexdigest(), name=os.path.basename(path))
    gz = gzip.compress(raw, compresslevel=9, mtime=0)
    open(os.path.join(OUT, info["key"] + ".html.gz"), "wb").write(gz)
    meta[info["key"]] = info
    print("%s %s (%s) %s: %d bytes, %d compressed" % (info["title"], info["version"], info["build"] or "-", info["date"] or "no date", len(raw), len(gz)))
open(os.path.join(OUT, "builtin.json"), "w").write(json.dumps(meta, indent=1) + "\n")
