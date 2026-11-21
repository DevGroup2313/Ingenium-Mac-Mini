"""See the password (modules/r351.js): the pictures, one by one at full size, each with its violet number, title and one sentence.
    python3 previews/practice/compose_peek.py <folder of capture_peek.js pictures> <out folder>"""
import os, sys, importlib.util
spec = importlib.util.spec_from_file_location("cp", os.path.join(os.path.dirname(os.path.abspath(__file__)), "compose_practice.py"))
SRC, OUT = sys.argv[1], sys.argv[2]
STEPS = [
    ("1-hidden", "The sign-in: a key in the password field",
     "As in Lakay, an eye at the field's right edge; pressed, it shows what you typed."),
    ("2-shown", "Pressed: the password shows",
     "The key becomes an eye with a line across, Hide the password; the field keeps the focus and the caret its place."),
    ("3-shown-night", "By night",
     "The same key in the door's night colours; every password field in Ingenium has it."),
]
src = open(spec.origin, encoding="utf-8").read()
src = src.split("STEPS = [")[0] + "STEPS = " + repr(STEPS) + "\n" + src.split("\n]\n", 1)[1]
src = src.replace('"Practice_studio_%02d_%s.png"', '"Show_the_password_%02d_%s.png"')
sys.argv = [spec.origin, SRC, OUT]
exec(compile(src, spec.origin, "exec"))
