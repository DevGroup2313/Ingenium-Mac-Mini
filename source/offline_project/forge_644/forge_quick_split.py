"""The Forge 644 · the Mac app's quicker start: the full page, split into the page the app opens and the apps it carries, each
in a file beside it (blocks/forge_quick.html fetches one the first time it is wanted).

  python3 forge_quick_split.py THE_FORGE.html OUT_DIR

writes OUT_DIR/the_forge.html (the quick page) and OUT_DIR/the_forge_parts/<id>.txt for each carried app, and checks that
putting each part back in its place gives the full page again, byte for byte. The Mac app (pywebview) serves the folder
the page is in, so the parts are fetched from the same address as the page, and the store that holds her work is the same.
A page opened any other way (the repositories' own the_forge.html, a browser) is the full page and needs no parts."""
import hashlib, os, re, sys

src, out = sys.argv[1], sys.argv[2]
IDS = ("forge-bi-ingenium", "forge-bi-cd", "forge-bi-self", "forge-bi-inkwell")
full = open(src, "rb").read()
if b'id="forge-bi-meta"' not in full:
    sys.exit("give the full page (it carries its apps)")
if b'id="forge-644-quick-js"' not in full:
    sys.exit("this page has no quick start in it (blocks/forge_quick.html): build it with forge644.py first")
os.makedirs(os.path.join(out, "the_forge_parts"), exist_ok=True)
page, parts = full, {}
for ident in IDS:
    m = re.search(rb'(<script\b[^>]*\bid="' + ident.encode() + rb'"[^>]*)>([^<]*)</script>', page)
    if not m:
        sys.exit("the page does not carry " + ident)
    parts[ident] = m.group(2)
    tag = m.group(1) + b' data-defer="the_forge_parts/' + ident.encode() + b'.txt">'
    page = page[:m.start()] + tag + b"</script>" + page[m.end():]
# put back, it is the full page again
back = page
for ident, body in parts.items():
    back = back.replace(b' data-defer="the_forge_parts/' + ident.encode() + b'.txt"></script>', b">" + body + b"</script>", 1)
if back != full:
    sys.exit("the parts put back do not give the full page again")
open(os.path.join(out, "the_forge.html"), "wb").write(page)
for ident, body in parts.items():
    open(os.path.join(out, "the_forge_parts", ident + ".txt"), "wb").write(body)
print("quick page %.1f MB (full %.1f MB), %d parts: %s; full page sha256 %s" % (len(page) / 1e6, len(full) / 1e6, len(parts),
      ", ".join("%s %.1f MB" % (k, len(v) / 1e6) for k, v in parts.items()), hashlib.sha256(full).hexdigest()[:16]))
