"""Ingenium release helper (kept outside the repositories).
  python3 release.py bump 4.0 "15 October 2026"   -> version strings in every repo's build files
  python3 release.py desktop                       -> the desktop patches (desktop/) not applied yet, in the Mac and Windows repos
  python3 release.py page                          -> build the page, embed the kit store from the repos' HEADs, copy to all four repos,
                                                      after applying the desktop patches (desktop/) not applied yet (commit them first, then run it again),
                                                      and write each repo's BUILD_INFO.txt with the page's fingerprint
  python3 release.py info                          -> BUILD_INFO.txt alone, from the pages in the repos
  python3 release.py edition full|gift|demo OUT    -> that edition's release page (stamped, with the kit store), into OUT only
"""
import sys, os, re, json, gzip, base64, subprocess, datetime
H = os.path.dirname(os.path.abspath(__file__))
R = {"mini": "/home/user/Ingenium-Mac-Mini", "intel": "/home/user/Ingenium-Mac-Intel",
     "win": "/home/user/Ingenium-HPWindows", "fire": "/home/user/Ingenium-Android-fire"}
VER_FILES = [
    ("mini", "Build Mac App.command", r'BUILD_NO="\d+\.\d+\.', 'BUILD_NO="{v}.'),
    ("mini", ".github/workflows/build-mac.yml", r'V="\d+\.\d+\.\$', 'V="{v}.$'),
    ("mini", "ingenium.spec", r"'INGENIUM_VERSION', '\d+\.\d+'", "'INGENIUM_VERSION', '{v}'"),
    ("intel", "Build Mac App.command", r'BUILD_NO="\d+\.\d+\.', 'BUILD_NO="{v}.'),
    ("intel", ".github/workflows/build-mac.yml", r'V="\d+\.\d+\.\$', 'V="{v}.$'),
    ("intel", "ingenium.spec", r"'INGENIUM_VERSION', '\d+\.\d+'", "'INGENIUM_VERSION', '{v}'"),
    ("win", ".github/workflows/build-windows.yml", r'INGENIUM_VERSION=\d+\.\d+\.\$', 'INGENIUM_VERSION={v}.$'),
    ("win", "installer/Ingenium.iss", r'#define AppVersion "\d+\.\d+"', '#define AppVersion "{v}"'),
    ("win", "Build Ingenium (Windows).bat", r'set "BUILD_NO=\d+\.\d+\.', 'set "BUILD_NO={v}.'),
    ("fire", ".github/workflows/build-ios.yml", r'INGENIUM_BUILD=\d+\.\d+\.\$', 'INGENIUM_BUILD={v}.$'),
    ("fire", ".github/workflows/build-android.yml", r'INGENIUM_BUILD=\d+\.\d+\.\$', 'INGENIUM_BUILD={v}.$'),
    ("fire", "ingenium_android_project/app/build.gradle", r'\?: "\d+\.\d+\.\$\{buildDay\}', '?: "{v}.${{buildDay}}'),
]
def bump(v, date):
    for repo, path, pat, rep in VER_FILES:
        p = os.path.join(R[repo], path)
        s = open(p, encoding="utf-8", newline="").read()
        n = len(re.findall(pat, s))
        if n < 1:
            sys.exit("no version in %s:%s" % (repo, path))
        s = re.sub(pat, rep.format(v=v), s)
        open(p, "w", encoding="utf-8", newline="").write(s)
        print("bumped", repo, path, n)
    open(os.path.join(H, "version.json"), "w").write(json.dumps({"v": v, "date": date}))

def git(repo, *a):
    return subprocess.run(["git", "-C", repo] + list(a), check=True, capture_output=True).stdout

def committed(repo):
    out = {}
    for line in git(repo, "ls-tree", "-r", "HEAD").decode().splitlines():
        meta, path = line.split("\t", 1)
        mode, kind = meta.split()[0], meta.split()[1]
        if kind == "blob":
            out[path] = 0o755 if mode == "100755" else 0o644
    return out

KEYLIKE = re.compile(r"(^|/)signing/|\.(keystore|jks|p12|pfx|pem|key|mobileprovision)$|(^|/)(signing\.properties|SIGNING\.txt)$", re.I)


def wanted(path, kits, source, shared, generated):
    if path in ("ingenium.html", "BUILD_INFO.txt") or path in generated:  # 6.2: BUILD_INFO.txt holds the page's fingerprint
        return False
    # 6.2: no signing key, and no note of one, ever goes into the page (build_page.py takes out any that is there too)
    if KEYLIKE.search(path):
        return False
    # the page's own sources and tests (source/) and the read-only lineup workflow's inputs stay out of every kit
    # and the images of The Offline Project (brand/), kept in the repositories for her, not installed with the app
    # and the workflow that builds the shells Fabrica fills (6.0), which builds from source/ only
    if path.startswith("source/") or path.startswith("brand/") or path.startswith(".github/lineup/") or path in (".github/workflows/lineup-sources.yml", ".github/workflows/build-shells.yml"):
        return False
    for kit in kits:
        if kit["source"] != source:
            continue
        if kit["paths"] is None:
            return True
        for p in kit["paths"] + (shared if kit.get("shared") else []):
            if path == p or (p.endswith("/") and path.startswith(p)):
                return True
    return False

SLOT = "ingenium-kit-bundle"
def old_bundle(page):
    m = re.search(r'<script id="%s" type="ingenium/kit-bundle-gz" data-bytes="\d+">([^<]*)</script>' % SLOT, page)
    return json.loads(gzip.decompress(base64.b64decode(m.group(1))))

# 6.2: the desktop apps' own side (ingenium_app.py) changes together with the page (desktop/README.md): each patch once, in
# this order, where it has not been applied yet (the mark is a function it adds). Refresh is the Mac's alone.
DESKTOP = [("app_lite_62", "_window_page", ("mini", "intel", "win")), ("app_refresh_62", "_restart_page_process", ("mini", "intel")),
           ("app_ctx_62", "_engine_kvq", ("mini", "intel", "win")), ("app_quick_62", "_quick_page", ("mini", "intel", "win")),
           ("app_guard_62", "_ing_host_ok", ("mini", "intel", "win")), ("app_ctx_63", "_ING_CTX_MAX", ("mini", "intel", "win")),
           ("app_win_64", "_another_copy_is_open", ("mini", "intel", "win")), ("app_train_65", "TRAIN_LR_MORE", ("mini", "intel", "win"))]


def desktop():
    for name, mark, repos in DESKTOP:
        for k in repos:
            p = os.path.join(R[k], "ingenium_app.py")
            if mark in open(p, encoding="utf-8").read():
                continue
            subprocess.run([sys.executable, os.path.join(H, "desktop", name + ".py"), p], check=True)


def build(out, edition="master"):
    """The release page of one edition (editions.py: master, full, gift, demo) into out: built, stamped with the version,
    and given the kit store read from the repositories' last commits. Returns the page."""
    vj = json.load(open(os.path.join(H, "version.json")))
    desktop()
    subprocess.run([sys.executable, os.path.join(H, "build_page.py"), out], check=True,
                   env=dict(os.environ, ING_RELEASE="1", ING_EDITION=edition))  # 6.1: modules held.json names stay out of a release
    pg = open(out, encoding="utf-8").read()
    pg, n = re.subn(r'var ING_VERSION="[0-9.]+",ING_PAGE_DATE="[^"]*";', 'var ING_VERSION="%s",ING_PAGE_DATE="%s";' % (vj["v"], vj["date"]), pg)
    assert n == 1, "ING_VERSION"
    ob = old_bundle(pg)
    kitdef = ob["kits"]
    if os.path.exists(os.path.join(H, "kits", "kits.json")):  # 6.2: kept in the sources (kits/)
        kitdef = json.load(open(os.path.join(H, "kits", "kits.json"), encoding="utf-8"))
    sources = {"fire": R["fire"], "mac": R["mini"], "windows": R["win"]}
    # 6.2: the kit store is read from each repository's last commit, so a change not committed yet (a version bumped, a
    # desktop patch just applied) would be missing from the kits: commit it first
    for source, repo in sources.items():
        loose = [l[3:] for l in git(repo, "status", "--porcelain").decode().splitlines()
                 if wanted(l[3:].strip('"'), kitdef["kits"], source, kitdef["shared_mobile"], kitdef["generated"])]
        if loose:
            sys.exit("%s: commit these first, or the kits would not carry them: %s" % (repo, ", ".join(loose)))
    files, commits, total = [], {}, 0
    for source, repo in sources.items():
        commits[source] = git(repo, "rev-parse", "--short=7", "HEAD").decode().strip()
        for path, mode in sorted(committed(repo).items()):
            if not wanted(path, kitdef["kits"], source, kitdef["shared_mobile"], kitdef["generated"]):
                continue
            data = git(repo, "show", "HEAD:" + path)
            total += len(data)
            e = {"s": source, "p": path, "m": mode}
            try:
                t = data.decode("utf-8")
                if "\x00" in t:
                    raise UnicodeDecodeError("utf-8", data, 0, 1, "binary")
                e["t"] = t
            except UnicodeDecodeError:
                e["b"] = base64.b64encode(data).decode("ascii")
            files.append(e)
    tested = ob["tested"]
    tj = os.path.join(H, "tested.json")
    if os.path.exists(tj):
        tested = json.load(open(tj))
    # 6.2: the kits' guides and definitions are kept in the sources (kits/), where they are read and changed
    guides = ob["guides"]
    kd = os.path.join(H, "kits")
    if os.path.isdir(os.path.join(kd, "guides")):
        guides = {g: open(os.path.join(kd, "guides", g), encoding="utf-8").read() for g in sorted(os.listdir(os.path.join(kd, "guides"))) if g.endswith(".md")}
    if os.path.exists(os.path.join(kd, "tested.json")) and not os.path.exists(tj):
        tested = json.load(open(os.path.join(kd, "tested.json"), encoding="utf-8"))
    made = datetime.date.today()
    bundle = {"v": 1, "made": "%d %s %d" % (made.day, made.strftime("%B"), made.year), "commits": commits,
              "kits": kitdef, "guides": guides, "tested": tested, "files": files}
    raw = json.dumps(bundle, ensure_ascii=False, separators=(",", ":")).encode("utf-8")
    b64 = base64.b64encode(gzip.compress(raw, compresslevel=9, mtime=0)).decode("ascii")
    block = '<script id="%s" type="ingenium/kit-bundle-gz" data-bytes="%d">%s</script>' % (SLOT, len(raw), b64)
    pg, n = re.subn(r'<script id="%s"[^>]*>[^<]*</script>' % SLOT, lambda m: block, pg, count=1)
    assert n == 1 and pg.rstrip().endswith("</html>")
    open(out, "w", encoding="utf-8").write(pg)
    print("%s edition: page %d bytes; kit store %d files (%.0f KB) from %s" % (edition, len(pg), len(files), total / 1024, commits))
    return pg


def page():
    """The master edition into the four repositories (the owner's own apps are built from it)."""
    pg = build(os.path.join(H, "ingenium.html"))
    for k, repo in R.items():
        open(os.path.join(repo, "ingenium.html"), "w", encoding="utf-8").write(pg)
    info()
    sync_sources()


def info():
    """6.2: each release names its build and lists its fingerprint (SHA-256) in BUILD_INFO.txt, as the licence says
    (LICENCE.txt, version 2), in each of the four repositories (../security/fingerprint.py)."""
    sys.path.insert(0, os.path.join(H, "..", "security"))
    import fingerprint
    vj = json.load(open(os.path.join(H, "version.json")))
    ed = os.environ.get("ING_EDITION", "master")
    for k, repo in R.items():
        pg = os.path.join(repo, "ingenium.html")
        t = open(pg, encoding="utf-8").read()
        m = re.search(r'var ING_VERSION="([0-9.]+)",ING_PAGE_DATE="([^"]*)";', t)
        if not m or m.group(1) != vj["v"]:
            sys.exit("%s: the page is not version %s" % (pg, vj["v"]))
        head = ["Ingenium", "Version: %s (%s)" % (vj["v"], vj["date"]), "Edition: %s" % ed,
                "Copyright (c) 2026 Yannie D. Forest. All rights reserved. See LICENCE.txt.",
                "The page below is the app itself. The %s apps built from this repository carry it with their build number"
                " stamped in%s, so each build's summary on GitHub lists the fingerprint of the copy inside it too."
                % ({"fire": "Fire, Android, iPhone and iPad", "win": "Windows"}.get(k, "Mac"),
                   " and without its WebAssembly engine (tools/app_page.py)" if k == "fire" else " (tools/stamp_build.py)")]
        p = os.path.join(repo, "BUILD_INFO.txt")
        open(p, "w", encoding="utf-8", newline="").write("\n".join(head) + "\n")
        fingerprint.write(p, ["ingenium.html"])
        print("BUILD_INFO.txt:", repo, fingerprint.sha(pg)[:16])

def sync_sources():
    """The page's sources travel with it: the Mac mini repository keeps them under source/ (no build starts from it)."""
    import shutil, glob as _g
    dst = os.path.join(R["mini"], "source", "build")
    if not os.path.isdir(dst) or os.path.realpath(dst) == os.path.realpath(H):
        return
    for f in ("build_page.py", "release.py", "version.json", "held.json", "master_seal.json", "lx_layers.json", "pdf_widths.json", "lx_fonts.json"):
        shutil.copy2(os.path.join(H, f), os.path.join(dst, f))
    md = os.path.join(dst, "modules")
    os.makedirs(md, exist_ok=True)
    have = set(os.path.basename(m) for m in _g.glob(os.path.join(H, "modules", "*.js")))
    for m in _g.glob(os.path.join(md, "*.js")):
        if os.path.basename(m) not in have:
            os.remove(m)
    for m in have:
        shutil.copy2(os.path.join(H, "modules", m), os.path.join(md, m))
    # R126: Lector's recipe (her rules, the verified sources, her kinds of document), which build_page.py writes in
    os.makedirs(os.path.join(dst, "recipe"), exist_ok=True)
    shutil.copy2(os.path.join(H, "recipe", "recipe.json"), os.path.join(dst, "recipe", "recipe.json"))
    print("sources copied to", os.path.dirname(dst))

if __name__ == "__main__":
    if sys.argv[1] == "bump":
        bump(sys.argv[2], sys.argv[3])
    elif sys.argv[1] == "desktop":
        desktop()
    elif sys.argv[1] == "page":
        page()
    elif sys.argv[1] == "info":
        info()
    elif sys.argv[1] == "edition":
        build(sys.argv[3], sys.argv[2])
