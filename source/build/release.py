"""Ingenium release helper (kept outside the repositories).
  python3 release.py bump 4.0 "15 October 2026"   -> version strings in every repo's build files
  python3 release.py page                          -> build the page, embed the kit store from the repos' HEADs, copy to all four repos
"""
import sys, os, re, json, gzip, base64, subprocess, datetime
H = os.path.dirname(os.path.abspath(__file__))
R = {"mini": "/home/user/Ingenium-Mac-Mini", "intel": "/home/user/Ingenium-Mac-Intel",
     "win": "/home/user/Ingenium-Windows", "fire": "/home/user/Ingenium-Android-fire"}
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

def wanted(path, kits, source, shared, generated):
    if path == "ingenium.html" or path in generated:
        return False
    # the page's own sources and tests (source/) and the read-only lineup workflow's inputs stay out of every kit
    # and the images of The Offline Project (brand/), kept in the repositories for her, not installed with the app
    if path.startswith("source/") or path.startswith("brand/") or path.startswith(".github/lineup/") or path == ".github/workflows/lineup-sources.yml":
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

def page():
    vj = json.load(open(os.path.join(H, "version.json")))
    subprocess.run([sys.executable, os.path.join(H, "build_page.py"), os.path.join(H, "ingenium.html")], check=True)
    pg = open(os.path.join(H, "ingenium.html"), encoding="utf-8").read()
    pg, n = re.subn(r'var ING_VERSION="[0-9.]+",ING_PAGE_DATE="[^"]*";', 'var ING_VERSION="%s",ING_PAGE_DATE="%s";' % (vj["v"], vj["date"]), pg)
    assert n == 1, "ING_VERSION"
    ob = old_bundle(pg)
    kitdef = ob["kits"]
    sources = {"fire": R["fire"], "mac": R["mini"], "windows": R["win"]}
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
    made = datetime.date.today()
    bundle = {"v": 1, "made": "%d %s %d" % (made.day, made.strftime("%B"), made.year), "commits": commits,
              "kits": kitdef, "guides": ob["guides"], "tested": tested, "files": files}
    raw = json.dumps(bundle, ensure_ascii=False, separators=(",", ":")).encode("utf-8")
    b64 = base64.b64encode(gzip.compress(raw, compresslevel=9, mtime=0)).decode("ascii")
    block = '<script id="%s" type="ingenium/kit-bundle-gz" data-bytes="%d">%s</script>' % (SLOT, len(raw), b64)
    pg, n = re.subn(r'<script id="%s"[^>]*>[^<]*</script>' % SLOT, lambda m: block, pg, count=1)
    assert n == 1 and pg.rstrip().endswith("</html>")
    for k, repo in R.items():
        open(os.path.join(repo, "ingenium.html"), "w", encoding="utf-8").write(pg)
    open(os.path.join(H, "ingenium.html"), "w", encoding="utf-8").write(pg)
    print("page %d bytes; kit store %d files (%.0f KB) from %s" % (len(pg), len(files), total / 1024, commits))
    sync_sources()

def sync_sources():
    """The page's sources travel with it: the Mac mini repository keeps them under source/ (no build starts from it)."""
    import shutil, glob as _g
    dst = os.path.join(R["mini"], "source", "build")
    if not os.path.isdir(dst) or os.path.realpath(dst) == os.path.realpath(H):
        return
    for f in ("build_page.py", "release.py", "version.json", "master_seal.json", "lx_layers.json", "pdf_widths.json", "lx_fonts.json"):
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
    elif sys.argv[1] == "page":
        page()
