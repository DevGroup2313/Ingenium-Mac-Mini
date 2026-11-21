"""What every shell carries for the check of its page (Ingenium 7.62, modules/r352.js): the owner's public keys and the page it
shows when its own page is not as its maker signed it. Both are written here, once, into each shell's own language, so the
shells compile them in and a changed copy of an app cannot change them:

    security/owner_keys.json      ->  the kid and the two halves (x, y) of each owner public key (never a name, never a private key)
    shells/common/refused.html    ->  the page, with {{NAME}}, {{FILE}} and {{WHY}} for the shell to fill (escaped)

written to
    shells/mac/Shell/ShellCommon.swift, shells/ios/Shell/ShellCommon.swift
    shells/windows/shell_common.h
    shells/android/src/studio/ingenium/shell/ShellCommon.java
and to shells/common/common.json (the kids and the page's fingerprint), which build_page.py reads to make sure the shells a
release carries were built with these keys (each carries the line MARKER, which names them).

    python3 shells/common/make_common.py           # writes them
    python3 shells/common/make_common.py --check   # says which would change, and fails if one would
"""
import hashlib, json, os, re, sys

HERE = os.path.dirname(os.path.abspath(__file__))
SHELLS = os.path.dirname(HERE)
SOURCE = os.path.dirname(SHELLS)
KEYS = json.load(open(os.path.join(SOURCE, "security", "owner_keys.json"), encoding="utf-8"))["keys"]
PAGE = open(os.path.join(HERE, "refused.html"), encoding="utf-8").read()
B64U = re.compile(r"^[A-Za-z0-9_-]+$")
keys = []
for k in KEYS:
    kid, x, y = k["kid"], k["jwk"]["x"], k["jwk"]["y"]
    assert k["jwk"]["kty"] == "EC" and k["jwk"]["crv"] == "P-256", kid
    assert B64U.match(kid) and B64U.match(x) and B64U.match(y) and len(x) == 43 and len(y) == 43, kid
    keys.append((kid, x, y))
keys.sort()
assert keys, "no owner key"
for t in ("{{NAME}}", "{{FILE}}", "{{WHY}}"):
    assert t in PAGE, t
assert "<script" not in PAGE.lower(), "the page a shell shows in place of a changed one runs no script"
MARKER = "ING-SHELL-CHECK-1 " + ",".join(k[0] for k in keys)
HEAD = "Written by shells/common/make_common.py from security/owner_keys.json and shells/common/refused.html (Ingenium 7.62): change those, then run it; never this file."


def swift():
    rows = ",\n".join('        (kid: "%s", x: "%s", y: "%s")' % k for k in keys)
    assert '"""#' not in PAGE
    return ("/* %s */\n\nenum ShellCommon {\n"
            "    /// named in each built shell, so a release can tell the shells it carries were built with these keys (build_page.py)\n"
            "    static let marker = \"%s\"\n"
            "    /// the owner's public keys: their kid, and the two halves of the P-256 point, base64url\n"
            "    static let ownerKeys: [SignatureCheck.Key] = [\n%s\n    ]\n"
            "    /// the page shown in place of one that is not as its maker signed it ({{NAME}}, {{FILE}} and {{WHY}} filled, escaped)\n"
            "    static let refusedPage = #\"\"\"\n%s\"\"\"#\n}\n") % (HEAD, MARKER, rows, PAGE)


def cpp():
    rows = ",\n".join('    {"%s", "%s", "%s"}' % k for k in keys)
    assert ")ING\"" not in PAGE
    return ("/* %s */\n#pragma once\n\n"
            "/* named in the built program, so a release can tell the shell it carries was built with these keys (build_page.py) */\n"
            "static const char SHELL_MARKER[] = \"%s\";\n"
            "/* the owner's public keys: their kid, and the two halves of the P-256 point, base64url */\n"
            "struct ShellOwnerKey { const char* kid; const char* x; const char* y; };\n"
            "static const ShellOwnerKey SHELL_OWNER_KEYS[] = {\n%s\n};\n"
            "static const size_t SHELL_OWNER_KEY_COUNT = sizeof(SHELL_OWNER_KEYS) / sizeof(SHELL_OWNER_KEYS[0]);\n"
            "/* the page shown in place of one that is not as its maker signed it ({{NAME}}, {{FILE}} and {{WHY}} filled, escaped) */\n"
            "static const char SHELL_REFUSED_PAGE[] = R\"ING(%s)ING\";\n") % (HEAD, MARKER, rows, PAGE)


def java():
    def lit(s):
        out = []
        for ch in s:
            o = ord(ch)
            if ch == '"': out.append('\\"')
            elif ch == "\\": out.append("\\\\")
            elif ch == "\n": out.append("\\n")
            elif 0x20 <= o < 0x7f: out.append(ch)
            else:
                u = ch.encode("utf-16-be").hex()
                for i in range(0, len(u), 4): out.append("\\u" + u[i:i + 4])
        return "".join(out)
    rows = ",\n".join('        {"%s", "%s", "%s"}' % k for k in keys)
    chunks = [PAGE[i:i + 200] for i in range(0, len(PAGE), 200)]
    page = "\n        + ".join('"%s"' % lit(c) for c in chunks)
    return ("/* %s */\npackage studio.ingenium.shell;\n\nfinal class ShellCommon {\n    private ShellCommon() { }\n"
            "    /** named in the built dex, so a release can tell the shell it carries was built with these keys (build_page.py) */\n"
            "    static final String MARKER = \"%s\";\n"
            "    /** the owner's public keys: their kid, and the two halves of the P-256 point, base64url */\n"
            "    static final String[][] OWNER_KEYS = {\n%s\n    };\n"
            "    /** the page shown in place of one that is not as its maker signed it ({{NAME}}, {{FILE}} and {{WHY}} filled, escaped) */\n"
            "    static final String REFUSED_PAGE =\n        %s;\n}\n") % (HEAD, MARKER, rows, page)


OUT = {
    os.path.join(SHELLS, "mac", "Shell", "ShellCommon.swift"): swift(),
    os.path.join(SHELLS, "ios", "Shell", "ShellCommon.swift"): swift(),
    os.path.join(SHELLS, "windows", "shell_common.h"): cpp(),
    os.path.join(SHELLS, "android", "src", "studio", "ingenium", "shell", "ShellCommon.java"): java(),
    os.path.join(HERE, "common.json"): json.dumps({"marker": MARKER, "kids": [k[0] for k in keys],
                                                   "refused_sha256": hashlib.sha256(PAGE.encode("utf-8")).hexdigest()}, indent=1) + "\n",
}
check = "--check" in sys.argv
stale = []
for p, text in OUT.items():
    now = open(p, encoding="utf-8").read() if os.path.exists(p) else None
    if now != text:
        stale.append(os.path.relpath(p, SOURCE))
        if not check:
            open(p, "w", encoding="utf-8", newline="\n").write(text)
if check:
    print("in step" if not stale else "would change: " + ", ".join(stale))
    sys.exit(1 if stale else 0)
print("written: " + (", ".join(stale) if stale else "nothing (all in step)"))
print(MARKER)
