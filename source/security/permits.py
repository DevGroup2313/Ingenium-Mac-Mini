"""Ingenium 6.2 and The Forge 644 · what their builds write into the shared PermitCore (build/thoughts/permit_core.html): the
owner's public keys, the owner's latest list of withdrawn permissions, and, for a copy made for one person, the permission it is
given with. build/build_page.py (modules/r162.js) and offline_project/forge_644/forge644.py (blocks/forge_permit.html) both use it.

  security/owner_keys.json        the public halves of the owner's keys, as Settings saves them ("Save the public key"); or
                                  ING_OWNER_KEYS=<file>
  security/withdrawn.ingwithdraw  the owner's signed list of withdrawn permissions ("Save the list of withdrawn permissions"); or
                                  ING_WITHDRAWN=<file>
  ING_PERMIT=<file>               the permission a copy made for one person carries from the start

A key file that holds a private part, or a key whose number (kid) is not its own fingerprint, stops the build: only public
halves ever go into a page."""
import base64, hashlib, json, os, sys

HERE = os.path.dirname(os.path.abspath(__file__))
OWNER = "Yannie D. Forest"


def _kid(jwk):
    canon = json.dumps({"crv": jwk["crv"], "kty": jwk["kty"], "x": jwk["x"], "y": jwk["y"]}, sort_keys=True, separators=(",", ":"))
    return base64.urlsafe_b64encode(hashlib.sha256(canon.encode("utf-8")).digest()).decode("ascii").rstrip("=")[:22]


def keys():
    p = os.environ.get("ING_OWNER_KEYS") or os.path.join(HERE, "owner_keys.json")
    if not os.path.exists(p):
        return []
    out = []
    for k in json.load(open(p, encoding="utf-8")).get("keys", []):
        j = k.get("jwk") or {}
        if "d" in j or j.get("kty") != "EC" or j.get("crv") != "P-256" or not j.get("x") or not j.get("y"):
            sys.exit(p + ": each key must be the public half of a P-256 key (and never its private part)")
        if k.get("kid") != _kid(j):
            sys.exit(p + ": the key numbered %r is not that key's own fingerprint" % k.get("kid"))
        out.append({"kid": k["kid"], "jwk": {"kty": "EC", "crv": "P-256", "x": j["x"], "y": j["y"]}, "name": k.get("name", ""), "made": k.get("made", "")})
    return out


def withdrawn():
    p = os.environ.get("ING_WITHDRAWN") or os.path.join(HERE, "withdrawn.ingwithdraw")
    return json.load(open(p, encoding="utf-8")) if os.path.exists(p) else None


def given():
    p = os.environ.get("ING_PERMIT")
    return json.load(open(p, encoding="utf-8")) if p else None


def js(v):
    """As a script literal: "</" cannot end the script early."""
    return json.dumps(v, ensure_ascii=False).replace("</", "<\\/").replace("<!--", "<\\u0021--")


def fill(text, licence_path):
    """Writes the licence, the keys, the withdrawn list, the given permission and the owner's name into a page's PermitCore
    part, each placeholder found once. Returns (text, a line saying what went in)."""
    ks, wd, gv = keys(), withdrawn(), given()
    lic = open(licence_path, encoding="utf-8").read()
    for a, b in (('/*PERMIT_LICENCE*/""', js(lic)), ("/*PERMIT_KEYS*/[]", js(ks)), ("/*PERMIT_WITHDRAWN*/null", js(wd)),
                 ("/*PERMIT_GIVEN*/null", js(gv)), ('/*OWNER_NAME*/""', js(OWNER))):
        if text.count(a) != 1:
            sys.exit("the permissions part: %r found %d times, not once" % (a, text.count(a)))
        text = text.replace(a, b)
    return text, "licence and permissions: %d owner key%s%s%s" % (len(ks), "" if len(ks) == 1 else "s",
                                                                    ", a list of withdrawn permissions" if wd else "", ", a permission given" if gv else "")
