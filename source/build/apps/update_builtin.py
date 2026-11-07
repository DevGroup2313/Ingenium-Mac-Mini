# R120: the copies of The Forge and Inkwell that Ingenium carries inside it; R122 (18 October 2026) adds Carpe Diem; 6.55 (7 November
# 2026) adds Lakay, her store's app, at her word: "I want its latest build embedded into Ingenium just like my other apps so that I can
# continue working on it and developing it further."
# Usage:  python3 -I update_builtin.py path/to/a_page.html [more pages ...]
# Each page is recognised as The Forge, Inkwell, Carpe Diem or Lakay (in any order, any of them); for each one given, writes beside this
# file builtin/<key>.html.gz (the page exactly as given, compressed) and its line in builtin/builtin.json (its version, build, date, size,
# SHA-256 fingerprint and file name). The copies not given stay as they are. Lakay's latest page is app/Lakay.html in its repositories
# (Lakay-Windows, Lakay-Mac, Lakay-Apps); its mark's layers come from apps/lakay_mark.py.
# build_page.py embeds them (the master edition alone); modules/r120.js keeps them in the app library on first start, checked against
# the fingerprint, and never puts them over a newer copy she added herself.
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


def carpediem(text):
    m = re.search(r'window\.CD_BUILD=\{date:"([^"]*)",pass:"(\d+)",stamp:"([^"]*)"', text)
    if not m or not re.search(r"<title>[^<]*Carpe Diem", text[:400000]) or 'id="section-forge"' in text:
        sys.exit("this does not look like Carpe Diem's page (no build stamp, or no Carpe Diem title)")
    return {"key": "cd", "title": "Carpe Diem", "version": m.group(2), "build": m.group(3), "date": m.group(1)}


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


def lakay(text):
    m = re.search(r'<meta name="lakay-build" content="(\d+)"', text[:40000])
    if not m or not re.search(r"<title>Lakay\b", text[:40000]):
        sys.exit("this does not look like Lakay's page (no lakay-build line, or no Lakay title)")
    d = re.search(r"Build \d+ \((\d{4}-\d{2}-\d{2})\)", text[:40000])
    c = re.search(r"--pri:\s*(#[0-9a-fA-F]{6})", text)
    return {"key": "lakay", "title": "Lakay", "version": m.group(1), "build": "", "date": d.group(1) if d else "", "color": c.group(1).lower() if c else ""}


def which(text):
    head = text[:400000]
    if re.search(r'<meta name="lakay-build"', head[:40000]):
        return lakay
    if 'id="section-forge"' in text and "window.CD_BUILD" in head:
        return forge
    if re.search(r"<title>Inkwell\b", head[:20000]):
        return inkwell
    if "window.CD_BUILD" in head:
        return carpediem
    sys.exit("this page is none of The Forge, Inkwell, Carpe Diem or Lakay")


meta = {}
try:
    meta = json.load(open(os.path.join(OUT, "builtin.json")))
except (OSError, ValueError):
    pass
if len(sys.argv) < 2:
    sys.exit("usage: python3 -I update_builtin.py path/to/a_page.html [more pages ...]")
for path in sys.argv[1:]:
    raw = open(path, "rb").read()
    text = raw.decode("utf-8", errors="replace")
    info = which(text)(text)
    info.update(size=len(raw), sha256=hashlib.sha256(raw).hexdigest(), name=os.path.basename(path))
    gz = gzip.compress(raw, compresslevel=9, mtime=0)
    open(os.path.join(OUT, info["key"] + ".html.gz"), "wb").write(gz)
    meta[info["key"]] = info
    print("%s %s (%s) %s: %d bytes, %d compressed" % (info["title"], info["version"], info["build"] or "-", info["date"] or "no date", len(raw), len(gz)))
open(os.path.join(OUT, "builtin.json"), "w").write(json.dumps(meta, indent=1) + "\n")
