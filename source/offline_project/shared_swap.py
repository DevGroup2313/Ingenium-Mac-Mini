"""The shared modules every app carries whole (build/thoughts/support_core.html and thought_cloud.html, and those a pass
names): a page built before 21 October 2026 carries the 6.1 text of each (kept in shared_prev_61/), one built by 6.2 (The Forge
644) carries 6.2's (shared_prev_62/); swap() puts the current text in its place. An earlier text must be found exactly once,
or the pass stops."""
import json, os, subprocess, tempfile

HERE = os.path.dirname(os.path.abspath(__file__))
THOUGHTS = os.path.join(HERE, "..", "build", "thoughts")
PREV = os.path.join(HERE, "shared_prev_61")
NAMES = ("support_core.html", "thought_cloud.html")


PREVS = (PREV, os.path.join(HERE, "shared_prev_62"), os.path.join(HERE, "shared_prev_63"))   # a page built by 6.2 (The Forge 644)
# carries 6.2's text, one built by 6.3 (The Forge 645) 6.3's, without its comments


def swap(s, label="page", names=NAMES):
    for n in names:
        new = open(os.path.join(THOUGHTS, n), encoding="utf-8").read().strip()
        olds = [open(os.path.join(d, n), encoding="utf-8").read().strip() for d in PREVS if os.path.exists(os.path.join(d, n))]
        cur = (new, strip_text(new))   # 6.3: a page built from The Forge 645 on carries them without comments
        olds = [x for o in olds for x in (o, strip_text(o))]
        found = [o for o in olds if o not in cur and s.count(o) == 1]
        if not found:
            if any(c in s for c in cur):
                continue
            raise SystemExit("%s: no earlier text of %s found once (6.1's or 6.2's), and not the current one" % (label, n))
        s = s.replace(found[-1], new)
        print("%s: %s brought up to date" % (label, n))
    return s


def include(name):
    """A shared module carried whole, such as quiet_screen.html."""
    return open(os.path.join(THOUGHTS, name), encoding="utf-8").read().strip()


TOOLS = os.path.join(HERE, "..", "build", "tools")


def _node(args):
    r = subprocess.run(["node"] + args, capture_output=True, text=True)
    if r.returncode:
        raise SystemExit((r.stderr or r.stdout).strip())
    return r.stdout.strip()


def strip_text(t, check=False):
    """t without its code's comments or its markup's (build/tools/strip_comments.js; licence notices and markers kept), as
    each edition of Ingenium is built; with check, tools/same_code.js proves the code the same. Gives (text, report)."""
    with tempfile.TemporaryDirectory() as d:
        a, b = os.path.join(d, "in.html"), os.path.join(d, "out.html")
        open(a, "w", encoding="utf-8").write(t)
        rep = json.loads(_node([os.path.join(TOOLS, "strip_comments.js"), a, b, "--html"]))
        if check:
            _node([os.path.join(TOOLS, "same_code.js"), a, b])
        out = open(b, encoding="utf-8").read()
    return (out, rep) if check else out.strip()


def tidy(s, label="page"):
    """The Forge's own page without the comments in its code (from pass 645). The owner's words (23 October 2026): "I want you
    to remove those unecessary stales codes or comments from the code of the app please."
    """
    out, rep = strip_text(s, True)
    print("%s: %d comments out (%d whole lines, %d in the markup; %d kept), %d bytes fewer, the code proved the same" % (
        label, rep["cut"], rep["lines"], rep["html"], rep["kept"], rep["before"] - rep["after"]))
    return out
