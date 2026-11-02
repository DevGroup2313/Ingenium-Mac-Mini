"""Each release names its build and lists its fingerprint (SHA-256) in BUILD_INFO.txt (LICENCE.txt, version 2: "A copy
whose fingerprint differs is not the owner's release"). This writes the fingerprints of a release's files into the
BUILD_INFO.txt beside them, in a section of its own that a later release replaces; the rest of the file stays as it is.
release.py page calls it for Ingenium's four repositories, forge_repo_644.py for each copy of the Forge.

    python3 security/fingerprint.py <BUILD_INFO.txt> <file or folder> [...]     (paths relative to BUILD_INFO's folder)

To check a copy: on a Mac, shasum -a 256 <file>; on Windows, certutil -hashfile <file> SHA256."""
import hashlib, os, sys

HEAD = "Fingerprints (SHA-256). A copy whose fingerprint differs is not the owner's release (LICENCE.txt):"


def sha(p):
    h = hashlib.sha256()
    with open(p, "rb") as f:
        for b in iter(lambda: f.read(1 << 20), b""):
            h.update(b)
    return h.hexdigest()


def write(info, names):
    d = os.path.dirname(os.path.abspath(info))
    rows = []
    for n in names:
        p = os.path.join(d, n)
        files = [os.path.join(n, f) for f in sorted(os.listdir(p))] if os.path.isdir(p) else [n]
        for f in files:
            rows.append("  %s  %s (%d bytes)" % (sha(os.path.join(d, f)), f.replace(os.sep, "/"), os.path.getsize(os.path.join(d, f))))
    s = open(info, encoding="utf-8").read() if os.path.exists(info) else ""
    k = s.find(HEAD)
    if k >= 0:
        s = s[:k]
    s = s.rstrip("\n") + ("\n\n" if s.strip() else "") + HEAD + "\n" + "\n".join(rows) + "\n"
    open(info, "w", encoding="utf-8", newline="").write(s)
    return rows


if __name__ == "__main__":
    for r in write(sys.argv[1], sys.argv[2:]):
        print(r)
