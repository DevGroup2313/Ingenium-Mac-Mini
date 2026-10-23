"""The shared modules every app carries whole (build/thoughts/support_core.html and thought_cloud.html, and those a pass
names): a page built before 21 October 2026 carries the 6.1 text of each (kept in shared_prev_61/), one built by 6.2 (The Forge
644) carries 6.2's (shared_prev_62/); swap() puts the current text in its place. An earlier text must be found exactly once,
or the pass stops."""
import os

HERE = os.path.dirname(os.path.abspath(__file__))
THOUGHTS = os.path.join(HERE, "..", "build", "thoughts")
PREV = os.path.join(HERE, "shared_prev_61")
NAMES = ("support_core.html", "thought_cloud.html")


PREVS = (PREV, os.path.join(HERE, "shared_prev_62"))   # 6.3: a page built by 6.2 (The Forge 644) carries 6.2's text


def swap(s, label="page", names=NAMES):
    for n in names:
        new = open(os.path.join(THOUGHTS, n), encoding="utf-8").read().strip()
        olds = [open(os.path.join(d, n), encoding="utf-8").read().strip() for d in PREVS if os.path.exists(os.path.join(d, n))]
        found = [o for o in olds if o != new and s.count(o) == 1]
        if not found:
            if new in s:
                continue
            raise SystemExit("%s: no earlier text of %s found once (6.1's or 6.2's), and not the current one" % (label, n))
        s = s.replace(found[-1], new)
        print("%s: %s brought up to date" % (label, n))
    return s


def include(name):
    """A shared module carried whole, such as quiet_screen.html."""
    return open(os.path.join(THOUGHTS, name), encoding="utf-8").read().strip()
