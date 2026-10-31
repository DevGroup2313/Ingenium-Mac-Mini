#!/usr/bin/env python3
# INGENIUM  |  Copyright (c) 2026 Yannie D. Forest. All rights reserved.
# NO LICENCE IS GRANTED. See LICENCE.txt.
"""The folder search's third-party files (rag/vendor.json), fetched and checked.
    python3 rag/tools/fetch_vendor.py OUT_DIR [--list-hf]
Each npm package is downloaded from the registry and checked against its sha512 integrity before its listed files are
taken out; each Hugging Face file is downloaded and checked against the SHA-256 in vendor.json (a file with no SHA-256
yet is printed as PIN, to be written into vendor.json). OUT_DIR/VENDOR.txt lists every file with its size and SHA-256.
--list-hf also prints, for each repository in "hf_list", every file with its size and (for large files) its SHA-256, as
Hugging Face reports them, so a model's ONNX export can be confirmed before it is chosen."""
import base64, hashlib, io, json, os, sys, tarfile, urllib.request

HERE = os.path.dirname(os.path.abspath(__file__))
MANIFEST = os.path.join(HERE, "..", "vendor.json")
UA = {"User-Agent": "ingenium-rag-vendor/1"}


def get(url, tries=4):
    last = None
    for i in range(tries):
        try:
            with urllib.request.urlopen(urllib.request.Request(url, headers=UA), timeout=300) as r:
                return r.read()
        except Exception as e:  # a dropped connection is tried again
            last = e
    raise SystemExit("could not fetch %s: %s" % (url, last))


def put(out, rel, data):
    path = os.path.join(out, rel)
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, "wb") as f:
        f.write(data)
    return hashlib.sha256(data).hexdigest(), len(data)


def npm(pkg, out, rows):
    name, ver = pkg["name"], pkg["version"]
    base = name.split("/")[-1]
    url = "https://registry.npmjs.org/%s/-/%s-%s.tgz" % (name, base, ver)
    data = get(url)
    algo, want = pkg["integrity"].split("-", 1)
    got = base64.b64encode(hashlib.new(algo, data).digest()).decode()
    if got != want:
        raise SystemExit("%s@%s: the download does not match the registry's integrity" % (name, ver))
    with tarfile.open(fileobj=io.BytesIO(data), mode="r:gz") as t:
        for member, dest in pkg["files"].items():
            f = t.extractfile(member)
            if f is None:
                raise SystemExit("%s@%s: no %s inside" % (name, ver, member))
            sha, size = put(out, dest, f.read())
            rows.append((dest, size, sha, "%s@%s %s" % (name, ver, member)))


def hf(entry, out, rows, pins):
    for path, want in entry["files"].items():
        url = "https://huggingface.co/%s/resolve/%s/%s" % (entry["repo"], entry.get("revision", "main"), path)
        data = get(url)
        sha = hashlib.sha256(data).hexdigest()
        if want and sha != want:
            raise SystemExit("%s %s: SHA-256 %s, expected %s" % (entry["repo"], path, sha, want))
        if not want:
            pins.append((entry["repo"], path, sha, len(data)))
        dest = entry["dest"] + "/" + path
        put(out, dest, data)
        rows.append((dest, len(data), sha, "%s@%s %s" % (entry["repo"], entry.get("revision", "main"), path)))


def list_hf(repo):
    try:
        info = json.loads(get("https://huggingface.co/api/models/%s" % repo))
        files = json.loads(get("https://huggingface.co/api/models/%s/tree/main?recursive=true" % repo))
    except SystemExit as e:
        print("H %s ERROR %s" % (repo, e)); return
    card = info.get("cardData") or {}
    print("H %s sha=%s licence=%s pipeline=%s library=%s lastModified=%s" % (repo, info.get("sha"), card.get("license"), info.get("pipeline_tag"), info.get("library_name"), info.get("lastModified")))
    for f in files:
        if f.get("type") != "file":
            continue
        lfs = f.get("lfs") or {}
        print("  %s %s %s" % (f.get("path"), lfs.get("size", f.get("size")), lfs.get("oid", "")))


def main():
    if len(sys.argv) < 2:
        sys.exit(__doc__)
    out = sys.argv[1]
    man = json.load(open(MANIFEST, encoding="utf-8"))
    rows, pins = [], []
    for pkg in man["npm"]:
        npm(pkg, out, rows)
    for entry in man["hf"]:
        hf(entry, out, rows, pins)
    with open(os.path.join(out, "VENDOR.txt"), "w", encoding="utf-8") as f:
        f.write("Ingenium's folder search: third-party files (rag/vendor.json version %d)\n" % man["version"])
        for dest, size, sha, src in rows:
            f.write("%s  %10d  %s  (%s)\n" % (sha, size, dest, src))
    for dest, size, sha, src in rows:
        print("%s %10d %s" % (sha, size, dest))
    for repo, path, sha, size in pins:
        print("PIN %s %s %s %d" % (repo, path, sha, size))
    if "--list-hf" in sys.argv:
        for repo in man.get("hf_list", []):
            list_hf(repo)
    print("total %.1f MB in %d files" % (sum(r[1] for r in rows) / 1e6, len(rows)))


if __name__ == "__main__":
    main()
