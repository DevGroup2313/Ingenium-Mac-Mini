"""6.77 (10 November 2026): the demonstrations the master edition carries, so that The Offline Project made in Fabrica holds only
demonstrations (modules/r268.js, modules/r246.js).

The owner's words (10 November 2026): "I want the Offline Project apps to only contain the apps demos and never the full version,
I just installed the mac app after shipping it inside of Ingenium's Fabrica and it had the full versions of all 4 apps and not the
demos, please make the fix." And: "I also want the different demos of all of my apps built into Ingenium and made available to me
on there."

What each room of The Offline Project holds, as her own site of 1 November 2026 holds it (measured there): Carpe Diem's Public
sample, The Forge's demonstration (which carries the same demonstrations in its Editor), Ingenium's demo edition, and Inkwell's
own page (its one edition). This script writes, beside itself:

  cd_sample.html.gz    Carpe Diem's Public sample, exactly as it stands in her public repository (carpe-diem-demo, index.html)
  forge_demo.json.gz   The Forge's demonstration, as what differs from the lean Forge the master edition already carries
                       (apps/builtin/forge.html.gz): its page for each set of apps it carries (all four; without Inkwell; Carpe
                       Diem and itself alone), the storage shim each carried page is given, and the line that names them.
                       Made by the owner's own recipe for it (offline_project/forge_demo/forge_demo_656.py), run here.
  demos.json           each one's version, build, size and SHA-256 fingerprint, and where it was taken from

Ingenium's own demo edition is not kept here: every release builds it and carries it as a recipe (../../demo_recipe.py).

usage: python3 -I make_demos.py CARPE_DIEM_PUBLIC_SAMPLE.html INGENIUM_DEMO.html [--from "where the sample was taken from"]
       (INGENIUM_DEMO.html is any demo edition of Ingenium: the Forge's recipe checks one before it writes the pages that carry
       one; nothing of it is kept here)
"""
import base64, gzip, hashlib, json, os, re, subprocess, sys, tempfile

HERE = os.path.dirname(os.path.abspath(__file__))
BUILD = os.path.normpath(os.path.join(HERE, "..", ".."))
sys.path.insert(0, BUILD)
import demo_recipe, storage_shim  # noqa: E402

FORGE_DEMO = os.path.normpath(os.path.join(BUILD, "..", "offline_project", "forge_demo", "forge_demo_656.py"))
STAMP, PASS, DATE = "9s88", "656", "2026-10-28"


def sha(b):
    return hashlib.sha256(b).hexdigest()


def main():
    args = [a for a in sys.argv[1:]]
    src = ""
    if "--from" in args:
        i = args.index("--from")
        src = args[i + 1]
        del args[i:i + 2]
    if len(args) != 2:
        sys.exit(__doc__)
    cd_p, ing_p = args
    bi = json.load(open(os.path.join(HERE, "..", "builtin", "builtin.json")))
    if bi["forge"]["version"] != PASS or "lean" not in bi["forge"]["name"]:
        sys.exit("the master edition does not carry the lean Forge %s: this recipe is for it" % PASS)
    lean = gzip.open(os.path.join(HERE, "..", "builtin", "forge.html.gz")).read()
    if sha(lean) != bi["forge"]["sha256"]:
        sys.exit("apps/builtin/forge.html.gz does not match builtin.json")
    ink = gzip.open(os.path.join(HERE, "..", "builtin", "inkwell.html.gz")).read()

    # ---- Carpe Diem's Public sample, as it stands ----
    cd = open(cd_p, "rb").read()
    t = cd.decode("utf-8")
    m = re.search(r'window\.CD_BUILD=\{date:"([^"]*)",pass:"(\d+)",stamp:"([^"]*)",edition:"(Public sample|Committee demo)"', t)
    if not m or 'id="section-forge"' in t or 'id="cd-owner-sign"' in t:
        sys.exit("Carpe Diem: not one of its demonstrations (a demonstration names its edition and carries nothing personal)")
    if m.group(4) != "Public sample":
        sys.exit("Carpe Diem: give the Public sample (it opens without an access code)")
    open(os.path.join(HERE, "cd_sample.html.gz"), "wb").write(gzip.compress(cd, 9, mtime=0))
    meta = {"cd": {"key": "cd", "title": "Carpe Diem", "version": m.group(2), "build": m.group(3), "date": m.group(1), "edition": m.group(4),
                   "size": len(cd), "sha256": sha(cd), "name": "carpe_diem_public_sample.html", "from": src}}

    # ---- The Forge's demonstration: its own page for each set of apps, by the owner's recipe, as what differs from the lean page ----
    tmp = tempfile.mkdtemp(prefix="forge-demo-")
    ink_p, lean_p = os.path.join(tmp, "inkwell.html"), os.path.join(tmp, "lean.html")
    open(ink_p, "wb").write(ink)
    open(lean_p, "wb").write(lean)
    shim = storage_shim.shim("demo").replace('"ing-demo:"', '"forge-demo:"').replace('id="ing-own-store"', 'id="forge-own-store"')
    if shim.count('"forge-demo:"') != 1:
        sys.exit("the storage shim: its prefix was not found once")
    variants, pool, where = {}, [], {}
    for name, extra, carry in (("4", ["--ingenium", ing_p, "--inkwell", ink_p], ["ingenium", "cd", "inkwell", "forge"]),
                               ("3", ["--ingenium", ing_p], ["ingenium", "cd", "forge"]),
                               ("2", [], ["cd", "forge"])):
        out = os.path.join(tmp, "out" + name)
        r = subprocess.run([sys.executable, "-I", FORGE_DEMO, lean_p, cd_p, out] + extra, capture_output=True, text=True)
        if r.returncode != 0:
            sys.exit("the Forge's recipe stopped for the set %s: %s" % (name, (r.stderr or r.stdout).strip()[-600:]))
        whole = open(os.path.join(out, "the_forge_demo.html"), encoding="utf-8").read()
        mb = re.search(r'<script type="forge/b64" id="forge-bi-self">([^<]*)</script>', whole)
        mm = re.search(r'<script type="application/json" id="forge-bi-meta">(.*?)</script>', whole, re.S)
        note = re.search(r"\n<!-- THE FORGE'S DEMONSTRATION · the apps it carries \(([^)]*)\) -->\n", whole)
        if not mb or not mm or not note:
            sys.exit("the Forge's demonstration for the set %s: its own page, its list or its line was not found" % name)
        own = gzip.decompress(base64.b64decode(mb.group(1)))
        listed = json.loads(mm.group(1).replace("<\\/", "</"))
        mine = [a for a in listed["apps"] if a.get("self")][0]
        if [a["key"] for a in listed["apps"]] != carry or mine["sha256"] != sha(own) or mine["size"] != len(own):
            sys.exit("the Forge's demonstration for the set %s does not carry what was expected" % name)
        ops = demo_recipe.delta(lean, own)
        if demo_recipe.patch(lean, ops) != own:
            sys.exit("the differences for the set %s did not give the page back" % name)
        packed = []
        for op in ops:
            if isinstance(op, str):
                if op not in where:
                    where[op] = len(pool)
                    pool.append(op)
                packed.append(where[op])
            else:
                packed.append(op)
        variants[name] = {"carry": carry, "apps": note.group(1), "size": len(own), "sha256": sha(own), "ops": packed}
        print("the Forge's demonstration, set %s (%s): its own page %d bytes; %d runs of the lean page, %d bytes of its own text"
              % (name, ", ".join(carry), len(own), sum(1 for o in ops if not isinstance(o, str)), sum(len(o.encode("utf-8")) for o in ops if isinstance(o, str))))
    rec = {"v": 1, "forge": {"key": "forge", "title": "The Forge", "version": PASS, "build": STAMP, "date": DATE, "name": "the_forge.html"},
           "base": {"size": len(lean), "sha256": sha(lean)}, "shim": shim,
           "inkwell": {"key": "inkwell", "title": "Inkwell", "version": bi["inkwell"]["version"], "build": "", "date": DATE, "name": "Inkwell.html"},
           "pool": pool, "variants": variants}
    raw = json.dumps(rec, ensure_ascii=False, separators=(",", ":")).encode("utf-8")
    z = gzip.compress(raw, 9, mtime=0)
    open(os.path.join(HERE, "forge_demo.json.gz"), "wb").write(z)
    meta["forge"] = {"key": "forge", "title": "The Forge", "version": PASS, "build": STAMP, "date": DATE, "edition": "Demo",
                     "base": rec["base"], "size": len(raw), "sha256": sha(raw),
                     "pages": {n: {"size": v["size"], "sha256": v["sha256"], "carry": v["carry"]} for n, v in variants.items()}}
    json.dump(meta, open(os.path.join(HERE, "demos.json"), "w", encoding="utf-8"), indent=1)
    print("cd_sample.html.gz %d bytes (Carpe Diem %s, %s); forge_demo.json.gz %d bytes (%d of text shared by its three pages)"
          % (os.path.getsize(os.path.join(HERE, "cd_sample.html.gz")), meta["cd"]["version"], meta["cd"]["edition"], len(z), sum(len(p) for p in pool)))


if __name__ == "__main__":
    main()
