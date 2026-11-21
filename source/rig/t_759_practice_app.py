"""Ingenium 7.59 · the computer app's side of the practice studio (modules/r350.js uses r331's profile calls of
build/desktop/app_profiles_744.py with the id "practice"): its folder made beside the owner's, its own desk read and written, the
owner's desk untouched, and profile_drop("practice") taking its folder away. On a copy of a patched ingenium_app.py, with a home
folder of its own (nothing of this computer's is read or written).
    python3 -I rig/t_759_practice_app.py <repo>/ingenium_app.py"""
import os, sys, tempfile, shutil, importlib.util
app = sys.argv[1]
tmp = tempfile.mkdtemp(prefix="t759app-"); home = os.path.join(tmp, "home"); os.makedirs(home)
cp = os.path.join(tmp, "ingenium_app.py"); shutil.copyfile(app, cp)
os.environ["HOME"] = home; os.environ["XDG_DATA_HOME"] = os.path.join(home, ".local", "share")
spec = importlib.util.spec_from_file_location("ing_t759app", cp); m = importlib.util.module_from_spec(spec); spec.loader.exec_module(m)
P = F = 0
def ok(c, msg, d=None):
    global P, F
    print(("PASS " if c else "FAIL ") + msg + ("" if c or d is None else "  " + str(d)[:300])); P += bool(c); F += (not c)
owner = str(m._desk_path()); m._save_state('{"who":"owner"}')
r = m._profile_use("practice")
ok(r.get("ok") and r.get("id") == "practice", "the app takes the practice studio as a profile of its own (its id fits the pattern)", r)
pd = str(m._desk_path())
ok(pd == os.path.join(os.path.dirname(owner), "profiles", "practice", "desk.json"), "its desk is in a folder of its own beside the owner's", pd)
m._save_state('{"who":"visitor"}')
ok(m._load_state() == '{"who":"visitor"}', "it reads and writes its own desk")
ok(m._profile_use("")["ok"] and str(m._desk_path()) == owner and '"owner"' in m._load_state(), "back to the owner's profile: her desk as it was")
d = m._profile_drop("practice")
ok(not os.path.exists(os.path.dirname(pd)), "profile_drop(\"practice\") takes its folder away", d)
ok(os.path.exists(owner) and '"owner"' in open(owner, encoding="utf-8").read(), "and nothing of the owner's is touched")
shutil.rmtree(tmp, ignore_errors=True)
print("\n%d passed, %d failed" % (P, F))
