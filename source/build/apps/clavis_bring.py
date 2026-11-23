# 7.65 (21 November 2026): Clavis, her search engine, carried inside the master edition as her other apps are. Her words (21 November
# 2026): "I have a new app named Clavis. I have given you access to its repositories on GitHub. Please add it to Ingenium as one of my
# apps into all of its pages, Fabrica, Adamas, the chat pages, Lector, and Vocatio and most of all the Ingenia page and anywhere else. I
# want the app to be built into my master edition of Ingenium like the other apps."
# Usage:  python3 -I clavis_bring.py path/to/the/Clavis-Mac/repository
# Writes, beside this file, as Lakay's are (lakay_mark.py, 6.55):
#   builtin/clavis.html.gz      its page (clavis.html, the whole app in one file, as its own tools/build.py writes it), compressed;
#   builtin/builtin.json        its record: its pass as its version (app.json "pass", the number its builds and installers carry: 104 at 7.65),
#                               its build (the fingerprint its page names, "Build <fp>"), its date, its colour (its gold), size, SHA-256;
#   builtin/clavis_mark.json    its seal as Ingenium draws her apps' seals: the four layers Clavis stacks in depth (the plate with its name
#                               and date, the rays, the gold key, the star in the key's bow; art/seal/<layer>-<day|night>.webp), each at
#                               the depth Clavis gives it (src/clavis.css: 0, 6, 26 and 40 pixels on its 108-pixel seal, so a share of
#                               the width, as Ingenium's own layers are), and the whole seal laid flat at 256 pixels by day and by night
#                               (art/seal/1024/seal-<day|night>.png), for the places that show an app's seal still.
# build_page.py adds them to the master edition alone; every other edition carries none of it (editions.py, _no_clavis).
import base64, gzip, hashlib, io, json, os, re, subprocess, sys

from PIL import Image

HERE = os.path.dirname(os.path.abspath(__file__))
if len(sys.argv) != 2:
    sys.exit("usage: python3 -I clavis_bring.py path/to/the/Clavis-Mac/repository")
repo = sys.argv[1]
app = json.load(open(os.path.join(repo, "app.json"), encoding="utf-8"))
raw = open(os.path.join(repo, "clavis.html"), "rb").read()
head = raw[:4000].decode("utf-8", "replace")
if not re.search(r"<title>\s*Clavis\b", head) or "CLAVIS" not in head:
    sys.exit("this is not Clavis's page: it names no Clavis in its head")
m = re.search(r"Build ([0-9a-f]{6,16})\.", head)
if not m:
    sys.exit("Clavis's page names no build (Build <fingerprint>.) in its first lines")
build = m.group(1)
try:
    date = subprocess.run(["git", "-C", repo, "log", "-1", "--format=%ad", "--date=short"], capture_output=True, text=True, check=True).stdout.strip()
except Exception:
    date = ""
if not re.fullmatch(r"\d{4}-\d{2}-\d{2}", date or ""):
    sys.exit("the date of Clavis's last commit could not be read")

# its page, compressed the same way every time (no name, no time in the gzip header)
bi_dir = os.path.join(HERE, "builtin")
buf = io.BytesIO()
with gzip.GzipFile(filename="", mode="wb", fileobj=buf, compresslevel=9, mtime=0) as gz:
    gz.write(raw)
open(os.path.join(bi_dir, "clavis.html.gz"), "wb").write(buf.getvalue())
bi_path = os.path.join(bi_dir, "builtin.json")
bi = json.load(open(bi_path, encoding="utf-8"))
bi["clavis"] = {"key": "clavis", "title": "Clavis", "version": str(app["pass"]), "build": build, "date": date, "color": "#b8862f",
                "size": len(raw), "sha256": hashlib.sha256(raw).hexdigest(), "name": "clavis.html"}
with open(bi_path, "w", encoding="utf-8") as fh:
    fh.write(json.dumps(bi, indent=1) + "\n")

# its seal: the four layers at their depths, and the whole seal laid flat
# 7.71 (23 November 2026): from Clavis 110 its logo is the astrolabe (her words, 22 November 2026: "I choose the astrolabe 3D design for
# the logo of the Clavis app"), drawn in four layers that Clavis stands in depth (src/seal_options.js, the instrument: the throne and the
# dial at 0, the rete at 10, the key laid across as the rule at 20, the pin at 28 pixels, on the same 108-pixel seal as before, so a share
# of the width) and laid flat by tools/logo_art.js (art/logo/layers/<part>-<dress>.png, 512 pixels; art/logo/1024/astrolabe-<dress>.png).
# Each layer is carried as WebP at 320 pixels. A Clavis before 110 (no art/logo) keeps its seal of four layers, as 7.65 carried it.
logo = os.path.join(repo, "art", "logo")
ASTRO = os.path.isdir(os.path.join(logo, "layers"))
art = os.path.join(repo, "art", "seal")
DEPTH = {"plate": 0.0, "rays": round(6 / 108, 3), "key": round(26 / 108, 3), "star": round(40 / 108, 3)}
if ASTRO:
    DEPTH = {"plate": 0.0, "rete": round(10 / 108, 3), "rule": round(20 / 108, 3), "pin": round(28 / 108, 3)}


def webp(path, px=320):
    im = Image.open(path).convert("RGBA").resize((px, px), Image.LANCZOS)
    out = io.BytesIO()
    im.save(out, "WEBP", quality=92, method=6)
    return "data:image/webp;base64," + base64.b64encode(out.getvalue()).decode("ascii")


def uri(path, mime):
    return "data:%s;base64,%s" % (mime, base64.b64encode(open(path, "rb").read()).decode("ascii"))


def flat(path):
    im = Image.open(path).convert("RGBA").resize((256, 256), Image.LANCZOS)
    out = io.BytesIO()
    im.save(out, "PNG", optimize=True)
    return {"w": "256", "h": "256", "b64": base64.b64encode(out.getvalue()).decode("ascii")}


mark = {"layers": {}, "seal": {}}
for dress, key in (("day", "clavis"), ("night", "clavisN")):
    if ASTRO:
        mark["layers"][key] = [{"src": webp(os.path.join(logo, "layers", "%s-%s.png" % (part, dress))), "z": DEPTH[part]}
                               for part in ("plate", "rete", "rule", "pin")]
        mark["seal"][dress] = flat(os.path.join(logo, "1024", "astrolabe-%s.png" % dress))
        continue
    mark["layers"][key] = [{"src": uri(os.path.join(art, "%s-%s.webp" % (part, dress)), "image/webp"), "z": DEPTH[part]}
                           for part in ("plate", "rays", "key", "star")]
    mark["seal"][dress] = flat(os.path.join(art, "1024", "seal-%s.png" % dress))
with open(os.path.join(bi_dir, "clavis_mark.json"), "w", encoding="utf-8") as fh:
    fh.write(json.dumps(mark, separators=(",", ":")) + "\n")
print("Clavis %s (build %s, %s): its page %d bytes (%d compressed), its %s in %d layers by day and by night" % (
    bi["clavis"]["version"], build, date, len(raw), len(buf.getvalue()), "astrolabe" if ASTRO else "seal", len(mark["layers"]["clavis"])))
