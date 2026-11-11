"""What the owner's own recipes give, for rig/t_677_demos_unit.js to compare with what the page gives (Ingenium 6.77, modules/r268.js).

Runs offline_project/forge_demo/forge_demo_656.py for the sets of four and of three apps with the pages the master edition carries
(the lean Forge, Carpe Diem's Public sample, Inkwell) and a demo edition of Ingenium, and writes OUT/expect.json: for each set, the
list the demonstration carries (each page's size and SHA-256 fingerprint, and the list's signature), and the demo edition's own
fingerprint. Also writes OUT/blocks.json: the blocks of a master page that the test's stand-in for the page serves (the demo
edition's recipe made against that master page, and every block the recipe names).

usage: python3 rig/t_677_demos_expect.py MASTER_PAGE.html INGENIUM_DEMO.html OUT_DIR"""
import base64, gzip, hashlib, json, os, re, subprocess, sys

HERE = os.path.dirname(os.path.abspath(__file__))
BUILD = os.path.normpath(os.path.join(HERE, "..", "build"))
sys.path.insert(0, BUILD)
import demo_recipe, tail  # noqa: E402

master_p, demo_p, out = sys.argv[1:4]
os.makedirs(out, exist_ok=True)
DD, BI = os.path.join(BUILD, "apps", "demos"), os.path.join(BUILD, "apps", "builtin")
cd_p, lean_p, ink_p = (os.path.join(out, n) for n in ("cd_sample.html", "lean.html", "inkwell.html"))
open(cd_p, "wb").write(gzip.open(os.path.join(DD, "cd_sample.html.gz")).read())
open(lean_p, "wb").write(gzip.open(os.path.join(BI, "forge.html.gz")).read())
open(ink_p, "wb").write(gzip.open(os.path.join(BI, "inkwell.html.gz")).read())
expect = {"ingenium": {"sha256": hashlib.sha256(open(demo_p, "rb").read()).hexdigest(), "size": os.path.getsize(demo_p)}, "sets": {}}
FD = os.path.normpath(os.path.join(HERE, "..", "offline_project", "forge_demo", "forge_demo_656.py"))
for name, extra in (("4", ["--ingenium", demo_p, "--inkwell", ink_p]), ("3", ["--ingenium", demo_p])):
    o = os.path.join(out, "py" + name)
    r = subprocess.run([sys.executable, "-I", FD, lean_p, cd_p, o] + extra, capture_output=True, text=True)
    if r.returncode != 0:
        sys.exit((r.stderr or r.stdout)[-600:])
    whole = open(os.path.join(o, "the_forge_demo.html"), encoding="utf-8").read()
    listed = json.loads(re.search(r'<script type="application/json" id="forge-bi-meta">(.*?)</script>', whole, re.S).group(1).replace("<\\/", "</"))
    note = re.search(r"\n<!-- THE FORGE'S DEMONSTRATION · the apps it carries \(([^)]*)\) -->\n", whole).group(1)
    # the page without the list and the carried pages: what both ways must agree on, letter for letter
    k = whole.find("\n<!-- THE FORGE'S DEMONSTRATION · the apps it carries (")
    k2 = whole.rfind("</body>")
    expect["sets"][name] = {"sig": listed["sig"], "stamp": listed["stamp"], "note": note,
                            "apps": [{x: a.get(x) for x in ("key", "title", "version", "build", "date", "name", "id", "size", "sha256", "self")} for a in listed["apps"]],
                            "outer_sha256": hashlib.sha256((whole[:k] + whole[k2:]).encode("utf-8")).hexdigest()}
    os.remove(os.path.join(o, "the_forge_demo.html"))
json.dump(expect, open(os.path.join(out, "expect.json"), "w"), indent=1)
# the blocks the page's stand-in serves
master = tail.untail(open(master_p, encoding="utf-8").read())
demo = open(demo_p, encoding="utf-8").read()
rec = demo_recipe.make(demo, master)
demo_recipe.apply(rec, master)
b64, n = demo_recipe.block(rec)
found = demo_recipe.find(rec, master)
blocks = {"ing-demo-ingenium": b64,
          # Carpe Diem's Public sample, as what differs from the Carpe Diem carried (apps/demos/make_cd_demo.py)
          "ing-demo-cd": base64.b64encode(open(os.path.join(DD, "cd_demo.json.gz"), "rb").read()).decode(),
          "ing-builtin-cd": base64.b64encode(open(os.path.join(BI, "cd.html.gz"), "rb").read()).decode(),
          "ing-demo-forge": base64.b64encode(open(os.path.join(DD, "forge_demo.json.gz"), "rb").read()).decode(),
          "ing-builtin-forge": base64.b64encode(open(os.path.join(BI, "forge.html.gz"), "rb").read()).decode(),
          "ing-builtin-inkwell": base64.b64encode(open(os.path.join(BI, "inkwell.html.gz"), "rb").read()).decode()}
# the parts of the page the recipe copies from: a block or a piece of code with an id, and the page's code without one (codes.json)
codes = []
for s, text in zip(rec["srcs"], found):
    if "id" in s:
        blocks[s["id"]] = text
    else:
        codes.append(text)
json.dump(blocks, open(os.path.join(out, "blocks.json"), "w"))
json.dump(codes, open(os.path.join(out, "codes.json"), "w"))
dm = json.load(open(os.path.join(DD, "demos.json")))
bi = json.load(open(os.path.join(BI, "builtin.json")))
dm["inkwell"] = bi["inkwell"]
json.dump(dm, open(os.path.join(out, "demos.json"), "w"))
print("expect.json, blocks.json (%d parts with an id, %d of them copied from by the recipe), codes.json (%d pieces of code) and demos.json written to %s"
      % (len(blocks), len(blocks) - 6, len(codes), out))
