"""6.77 (11 November 2026): Carpe Diem's Public sample, carried as what differs from the Carpe Diem the master edition carries whole.

The sample itself (cd_sample.html.gz, from DevGroup2313/Carpe-DIem-Demo, written by make_demos.py) stays here as the source. The
master edition carries the recipe this writes, cd_demo.json.gz: runs copied from its own Carpe Diem (apps/builtin/cd.html.gz) and
the text between them. It is checked here, byte for byte, before it is written, and again by build_page.py; modules/r268.js puts
the sample together from the two and checks it against its fingerprint before The Offline Project is made from it.

Why: carried whole, the sample took 7.6 MB of the page, and the page came to more than GitHub keeps in one file (100 MiB).

Run it again whenever the Carpe Diem the master edition carries changes (build_page.py says so).
  python3 apps/demos/make_cd_demo.py
"""
import gzip, hashlib, json, os, sys

HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, os.path.normpath(os.path.join(HERE, "..", "..")))
import demo_recipe  # noqa: E402


def sha(b):
    return hashlib.sha256(b).hexdigest()


def main():
    bi = json.load(open(os.path.join(HERE, "..", "builtin", "builtin.json"), encoding="utf-8"))
    meta = json.load(open(os.path.join(HERE, "demos.json"), encoding="utf-8"))
    full = gzip.open(os.path.join(HERE, "..", "builtin", "cd.html.gz")).read()
    if len(full) != bi["cd"]["size"] or sha(full) != bi["cd"]["sha256"]:
        sys.exit("apps/builtin/cd.html.gz does not match builtin.json")
    sample = gzip.open(os.path.join(HERE, "cd_sample.html.gz")).read()
    if len(sample) != meta["cd"]["size"] or sha(sample) != meta["cd"]["sha256"]:
        sys.exit("cd_sample.html.gz does not match demos.json")
    ops = demo_recipe.delta(full, sample)
    if demo_recipe.patch(full, ops) != sample:
        sys.exit("the differences did not give the Public sample back")
    rec = {"v": 1, "base": {"size": len(full), "sha256": sha(full), "version": bi["cd"]["version"]}, "ops": ops}
    raw = json.dumps(rec, ensure_ascii=False, separators=(",", ":")).encode("utf-8")
    z = gzip.compress(raw, 9, mtime=0)
    open(os.path.join(HERE, "cd_demo.json.gz"), "wb").write(z)
    meta["cd"]["base"] = rec["base"]
    meta["cd"]["recipe"] = {"size": len(raw), "sha256": sha(raw)}
    json.dump(meta, open(os.path.join(HERE, "demos.json"), "w", encoding="utf-8"), indent=1)
    own = sum(len(o.encode("utf-8")) for o in ops if isinstance(o, str))
    print("cd_demo.json.gz %d bytes: Carpe Diem %s's Public sample (%d bytes) as %d runs of Carpe Diem %s and %d bytes of its own text"
          % (len(z), meta["cd"]["version"], len(sample), sum(1 for o in ops if not isinstance(o, str)), bi["cd"]["version"], own))


if __name__ == "__main__":
    main()
