"""The shared modules every app carries whole (build/thoughts/support_core.html and thought_cloud.html): a page built
before 21 October 2026 carries the 6.1 text of each (kept in shared_prev_61/); swap() puts the current text in its place.
Each old text must be found exactly once, or the pass stops."""
import os

HERE = os.path.dirname(os.path.abspath(__file__))
THOUGHTS = os.path.join(HERE, "..", "build", "thoughts")
PREV = os.path.join(HERE, "shared_prev_61")
NAMES = ("support_core.html", "thought_cloud.html")


def swap(s, label="page"):
    for n in NAMES:
        old = open(os.path.join(PREV, n), encoding="utf-8").read().strip()
        new = open(os.path.join(THOUGHTS, n), encoding="utf-8").read().strip()
        if old == new:
            continue
        if new in s and old not in s:
            continue
        c = s.count(old)
        if c != 1:
            raise SystemExit("%s: the 6.1 text of %s found %d times" % (label, n, c))
        s = s.replace(old, new)
        print("%s: %s brought up to date" % (label, n))
    return s


def include(name):
    """A shared module carried whole, such as quiet_screen.html."""
    return open(os.path.join(THOUGHTS, name), encoding="utf-8").read().strip()
