"""6.82 (11 November 2026): an app page carried without the copy of itself that it carries.

Carpe Diem carries its own page, compressed (gzip, level 9) and written in base64, in its block cd-self-src-data. In Ingenium's
page at 6.81 that copy took 18.9 MB of Carpe Diem's 43.1 MB, and no compressor makes it smaller (it is compressed already); the
page had 0.85 MB left under the 100 MiB GitHub keeps in one file. So Ingenium carries Carpe Diem without that block's text, and
the page puts it back when Carpe Diem is wanted (modules/r275.js, build/self_copy.js), letter for letter:
  - the copy's page is a few runs of the page carried (demo_recipe.delta: three runs and one letter for Carpe Diem 1089);
  - compressed again as zlib's level 9 compresses (pako's deflate, a port of zlib, carried in the page: build/pako/), in the copy's
    own gzip head, with its CRC-32 and its length, and written in base64 where the block's text stood.
Before Ingenium carries an app so, this proves it with the page's own code (Node, self_copy_prove.js): the page given back must be
the app's own page byte for byte. When anything differs (another compressor made the copy, a gzip head with a name in it, base64
with line breaks, no Node here), the app is carried whole, as before, and the build says why.

  compact(raw, block_id) -> (page without the copy's text, meta) or (None, why)
  attr(meta)             -> the value of the block's data-self attribute (base64 of the meta's JSON)
  source()               -> the code the page carries for it (pako's deflate, then self_copy.js)
"""
import base64, gzip, hashlib, json, os, re, struct, subprocess, tempfile, zlib

import demo_recipe

HERE = os.path.dirname(os.path.abspath(__file__))
PAKO = os.path.join(HERE, "pako", "pako_deflate.min.js")
CORE = os.path.join(HERE, "self_copy.js")
PROVE = os.path.join(HERE, "self_copy_prove.js")
PAKO_NOTE = "/* pako 1.0.11, its deflate (MIT License; Copyright (C) 2014-2017 by Vitaly Puzrin and Andrei Tuputcyn): see THIRD_PARTY_NOTICES.txt */\n"


def source():
    s = PAKO_NOTE + open(PAKO, encoding="utf-8").read() + "\n" + open(CORE, encoding="utf-8").read()
    if re.search(r"</script|<!--|<script", s, re.I):
        raise SystemExit("self_copy: the code to carry holds a sequence a page cannot carry inside a script block")
    return s


def attr(meta):
    return base64.b64encode(json.dumps(meta, ensure_ascii=False, separators=(",", ":")).encode("utf-8")).decode("ascii")


def compact(raw, block_id):
    m = re.search(rb'<script\b[^>]*\bid="' + re.escape(block_id.encode()) + rb'"[^>]*>([^<]*)</script>', raw)
    if not m:
        return None, "it carries no block %s" % block_id
    body = m.group(1)
    try:
        gz = base64.b64decode(body, validate=True)
    except Exception:
        return None, "its copy is not plain base64"
    if base64.b64encode(gz) != body:
        return None, "its copy's base64 is not written in one plain run"
    if gz[:3] != b"\x1f\x8b\x08" or gz[3] != 0:
        return None, "its copy's gzip head carries a name, a comment or extras"
    try:
        src = gzip.decompress(gz)
    except Exception:
        return None, "its copy does not open"
    if gz[-8:] != struct.pack("<II", zlib.crc32(src) & 0xffffffff, len(src) & 0xffffffff):
        return None, "its copy's gzip end does not match"
    cdx = raw[:m.start(1)] + raw[m.end(1):]
    ops = demo_recipe.delta(cdx, src)
    if demo_recipe.patch(cdx, ops) != src:
        return None, "its copy's page is not made of the page itself"
    lit = sum(len(o.encode("utf-8")) for o in ops if isinstance(o, str))
    if lit > 65536:
        return None, "its copy's page differs from the page by %d bytes of its own" % lit
    meta = {"v": 1, "id": block_id, "at": m.start(1), "head": gz[:10].hex(), "ops": ops, "size": len(raw),
            "sha256": hashlib.sha256(raw).hexdigest()}
    ok, why = prove(cdx, meta, raw)
    if not ok:
        return None, why
    return cdx, meta


def prove(cdx, meta, raw):
    """the page's own code (pako and self_copy.js, run in Node) must give the app's page back byte for byte"""
    with tempfile.TemporaryDirectory() as d:
        open(os.path.join(d, "cdx"), "wb").write(cdx)
        open(os.path.join(d, "meta.json"), "w", encoding="utf-8").write(json.dumps(meta, ensure_ascii=False))
        try:
            r = subprocess.run(["node", PROVE, PAKO, CORE, os.path.join(d, "cdx"), os.path.join(d, "meta.json"), os.path.join(d, "out")],
                               capture_output=True, text=True, timeout=900)
        except FileNotFoundError:
            return False, "Node is not on this computer, so the page's own code could not be proved"
        except subprocess.TimeoutExpired:
            return False, "the proof took too long"
        if r.returncode != 0:
            said = [l.strip() for l in (r.stderr or r.stdout).splitlines() if re.match(r"\s*(\w*Error|Error)\b", l)]
            return False, "the page's own code did not give the page back byte for byte (" + (said[0] if said else "Node stopped") + ")"
        out = open(os.path.join(d, "out"), "rb").read()
        if out != raw:
            return False, "the page's own code did not give the page back byte for byte"
        return True, r.stdout.strip()
