"""Ingenium 6.3: a model trained for a longer memory may be given it, up to 1,048,576 tokens (patch for ingenium_app.py, Mac
and Windows; applied after app_ctx_62.py).

The owner's words (23 October 2026): "I want their parameters to be expanded", and that the apps' capacities and limits be
"massively increased". The page gives a model on this computer as much memory as it was trained for, up to 1,048,576 tokens
(modules/r159.js; it stopped at 262,144); the engine's start held it to 262,144 as well. Past 32,768 the memory is kept in
eight bits (app_ctx_62.py), so a long memory costs half the room it did.

    python3 build/desktop/app_ctx_63.py <repo>/ingenium_app.py"""
import sys

p = sys.argv[1]
s = open(p, encoding="utf-8").read()
if "_ING_CTX_MAX" in s:
    print("already patched", p)
    sys.exit(0)


def rep(old, new, n=1):
    global s
    c = s.count(old)
    if c != n:
        sys.exit("%s: expected %d, found %d: %r" % (p, n, c, old[:90]))
    s = s.replace(old, new)


rep("        n_ctx = max(512, min(int(n_ctx or 8192), 262144))", "        n_ctx = max(512, min(int(n_ctx or 8192), _ING_CTX_MAX))")
rep("\ndef _engine_start(", "\n# 6.3 (app_ctx_63.py): the longest memory a model may be given, when it was trained for it\n_ING_CTX_MAX = 1048576\n\n\ndef _engine_start(")
open(p, "w", encoding="utf-8", newline="").write(s)
print("patched", p)
