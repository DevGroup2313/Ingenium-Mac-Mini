"""Ingenium 7.44: the computer app's side of local profiles (build/desktop/app_profiles_744.py), on a copy of ingenium_app.py.
    python3 -I rig/t_744_profiles_app.py <repo>/ingenium_app.py
A home folder of its own (nothing of this computer's is read or written). An invented profile, p1test."""
import os, sys, subprocess, tempfile, shutil, importlib.util, json
SRC = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
app = sys.argv[1]
tmp = tempfile.mkdtemp(prefix="t744-")
home = os.path.join(tmp, "home"); os.makedirs(home)
cp = os.path.join(tmp, "ingenium_app.py"); shutil.copyfile(app, cp)
r = subprocess.run([sys.executable, "-I", os.path.join(SRC, "build", "desktop", "app_profiles_744.py"), cp], capture_output=True, text=True)
passed = failed = 0
def ok(c, m, d=None):
    global passed, failed
    print(("PASS " if c else "FAIL ") + m + ("" if c or d is None else "  " + str(d)[:400])); passed += bool(c); failed += (not c)
ok(r.returncode == 0 and "patched" in r.stdout, "the patch applies", r.stdout + r.stderr)
r2 = subprocess.run([sys.executable, "-I", os.path.join(SRC, "build", "desktop", "app_profiles_744.py"), cp], capture_output=True, text=True)
ok("already patched" in r2.stdout, "and applies once")
os.environ["HOME"] = home; os.environ["XDG_DATA_HOME"] = os.path.join(home, ".local", "share")
def load():
    spec = importlib.util.spec_from_file_location("ing_t744_%d" % len(sys.modules), cp); m = importlib.util.module_from_spec(spec); spec.loader.exec_module(m); return m
m = load()
ok(all(hasattr(m.IngeniumApi, k) and hasattr(m.IngeniumApiSingle, k) for k in ("profile_current", "profile_use", "profile_drop")), "both bridges have profile_current, profile_use and profile_drop")
ok(m._profile_current() == {"ok": True, "id": ""}, "a fresh app holds the owner's profile")
owner_desk = str(m._desk_path()); m._save_state('{"who":"owner"}')
ok(os.path.basename(owner_desk) == "desk.json" and "profiles" not in owner_desk, "the owner's desk is where it has always been", owner_desk)
ok(m._profile_use("../etc")["ok"] is False and m._profile_use("P1")["ok"] is False and m._profile_current()["id"] == "", "a name that is not a profile's is refused")
ok(m._profile_use("p1test") == {"ok": True, "id": "p1test"}, "the app takes another person's profile")
g = str(m._desk_path())
ok(g == os.path.join(os.path.dirname(owner_desk), "profiles", "p1test", "desk.json"), "that profile's desk is in a folder of its own beside the owner's", g)
ok(m._load_state() == "", "it does not read the owner's desk")
m._save_state('{"who":"p1test"}')
big = str(m._big_dir()); runs = str(m._runs_dir()); out = str(m._apps_dir("outbox")); cloud = str(m._cloud_box_dir()); bk = str(m._desk_backup_dir())
ok(all(os.sep + os.path.join("profiles", "p1test") + os.sep in x + os.sep for x in (big, runs, out, cloud, bk)), "its long texts, runs, waiting apps, keys box and kept desks are its own", [big, runs, out, cloud, bk])
ok(m._claude_sessions().get("files") == [] and m._ollama_chats_find().get("found") is False and m._claude_session_read("x").get("ok") is False, "the computer's Claude Code sessions and Ollama chats are not read in it")
seen = []
m2_orig = m._device_key_get
ok(m._device_key_get.__code__.co_name == "w", "the app's own sign-in key is named for the profile")
# a restart keeps the profile
m3 = load()
ok(m3._profile_current()["id"] == "p1test" and m3._load_state() == '{"who":"p1test"}', "a restart opens the same profile's files")
ok(m3._profile_use("")["ok"] and m3._load_state() == '{"who":"owner"}', "back in the owner's profile, the owner's desk is as it was")
ok(m3._profile_drop("p1test")["ok"] and not os.path.exists(os.path.dirname(g)), "removing the profile removes its folders")
ok(os.path.isfile(owner_desk) and open(owner_desk).read() == '{"who":"owner"}', "and leaves the owner's desk untouched")
m3._profile_use("p2x"); ok(m3._profile_drop("p2x")["ok"] is False, "the profile in use cannot be removed"); m3._profile_use("")
shutil.rmtree(tmp, ignore_errors=True)
print("\n%d passed, %d failed" % (passed, failed)); sys.exit(1 if failed else 0)
