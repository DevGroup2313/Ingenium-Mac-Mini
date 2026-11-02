# Ingenium 6.9.x · the trainer's text as a file, and one pass at a time (build/desktop/app_data_692.py), on Linux with a home
# of its own and a stand-in llama-finetune (a shell script that copies its model and prints the trainer's progress lines):
#   - the patch applies to a COPY of ingenium_app.py and the result compiles; both API classes carry the new methods;
#   - train_text_put keeps the pieces as one file, in order; a text_path that is not that file is refused;
#   - train_start with text_path runs three passes as three runs of -epochs 1, the learning rate stepping down, the model
#     saved after each pass, the history one point a pass, the model moved into place with its passes counted;
#   - the app closing in the second pass keeps the first pass; train_status names it; train_resume finishes passes 2 and 3;
#   - Stop training by hand keeps nothing; train_discard lets a cut-short run go; one string still works as before;
#   - two trainings begun in the same second get names of their own (the stand-in trainer is that quick).
#   - perplexity, when llama-perplexity is beside the trainer (a stand-in program): train_available says so, a measurement reads the
#     program's "Final estimate: PPL", is refused with no text or no such model, and can be stopped;
#   python3 -I rig/t_692_app_data.py <repo>/ingenium_app.py <build/desktop/app_data_692.py>
import os, sys, time, importlib.util, tempfile, shutil, subprocess, json, stat
home = tempfile.mkdtemp(); os.environ["HOME"] = home; os.environ["XDG_DATA_HOME"] = os.path.join(home, "share")
src, patch = sys.argv[1], sys.argv[2]
copy = os.path.join(home, "ingenium_app.py"); shutil.copyfile(src, copy)
ok = lambda c, m: print(("PASS " if c else "FAIL ") + m) or (c or sys.exit(1))
r = subprocess.run([sys.executable, patch, copy], capture_output=True, text=True)
ok(r.returncode == 0 and "patched" in r.stdout, "the patch applies to a copy of ingenium_app.py (%s)" % (r.stdout.strip() or r.stderr.strip()[-200:]))
r2 = subprocess.run([sys.executable, patch, copy], capture_output=True, text=True)
ok(r2.returncode == 0 and "already" in r2.stdout, "applied again it does nothing")
ok(subprocess.run([sys.executable, "-m", "py_compile", copy], capture_output=True).returncode == 0, "the patched app compiles")
s = open(copy, encoding="utf-8").read()
ok(s.count("def train_text_put(self, chunk, first=False):") == 2 and s.count("def train_resume(self):") == 2 and s.count("return _train_status_692()") == 2, "both API classes carry train_text_put, train_resume, train_discard and the newer status")
spec = importlib.util.spec_from_file_location("ia", copy); ia = importlib.util.module_from_spec(spec); spec.loader.exec_module(ia)
ia.tell_user = lambda t, title=None: None; ia.log_problem = lambda m, *a: None
# the stand-in trainer: copies -m to -o, prints the progress lines llama-finetune prints; blocks in a pass when told to (in short
# sleeps, so that when it is stopped no sleeping child keeps its error output open, as the one real program would not)
log = os.path.join(home, "runs.log"); block = os.path.join(home, "block")
fake = os.path.join(home, "llama-finetune")
open(fake, "w").write("""#!/bin/sh
M=""; O=""; LR=""; EP=""
while [ $# -gt 0 ]; do case "$1" in -m) M="$2"; shift;; -o) O="$2"; shift;; -lr) LR="$2"; shift;; -epochs) EP="$2"; shift;; esac; shift; done
echo "$M|$O|$LR|$EP" >> "%s"
if [ -f "%s" ] && echo "$M" | grep -q pass_1.gguf; then i=0; while [ $i -lt 300 ] && [ -f "%s" ]; do sleep 0.1; i=$((i+1)); done; fi
echo "train: [====] data=0000010/0000010 loss=7.50777 acc=5.06%% t=00:00:01 ETA=00:00:00" >&2
echo "val: [====] data=0000003/0000003 loss=7.40000 acc=5.00%% t=00:00:01 ETA=00:00:00" >&2
cp "$M" "$O"
""" % (log, block, block))
os.chmod(fake, os.stat(fake).st_mode | stat.S_IEXEC)
ia._trainer_path = lambda: fake
md = ia._models_dir()
# the text, a piece at a time
text = ("The tide comes in twice a day, and the gulls know it before we do. " * 60)  # about 4,000 characters
a = ia._train_text_put(text[:2000], True); b = ia._train_text_put(text[2000:], False)
ok(a["ok"] and b["ok"] and a["path"] == b["path"] and open(a["path"], encoding="utf-8").read() == text, "train_text_put keeps the pieces as one file, in order (%d bytes)" % b["bytes"])
bad = ia._train_start({"name": "Bad", "size": "tiny", "passes": 1, "text_path": os.path.join(home, "elsewhere.txt")})
ok(not bad["ok"] and "not one this app wrote" in bad["error"], "a text_path that is not the app's own file is refused")
av = ia._train_available()
ok(av.get("file") is True and av.get("resume") is True and av.get("trainer"), "train_available says file: true and resume: true")


def wait_done(limit=120):
    t0 = time.time()
    while time.time() - t0 < limit:
        st = ia._train_status_692()
        if st["state"] in ("done", "error", "cancelled"):
            return st
        time.sleep(0.2)
    return ia._train_status_692()


r = ia._train_start({"name": "Tide model", "size": "tiny", "passes": 3, "text_path": a["path"]})
ok(r["ok"], "train_start takes the file (%s)" % r)
st = wait_done()
runs = [l.split("|") for l in open(log).read().strip().splitlines()]
ok(st["state"] == "done" and len(runs) == 3 and all(x[3] == "1" for x in runs), "three passes are three runs of -epochs 1 (state %s, %d runs)" % (st["state"], len(runs)))
lrs = [float(x[2]) for x in runs]
ok(lrs[0] > lrs[1] > lrs[2] and abs(lrs[0] - 1e-4) < 1e-9 and abs(lrs[2] - 1e-5) < 1e-9, "the learning rate steps down pass by pass from the size's start (1e-4) to its end (1e-5): %s" % lrs)
ok(runs[0][0].endswith("start.gguf") and runs[1][0].endswith("pass_1.gguf") and runs[2][0].endswith("pass_2.gguf"), "each pass starts from the model the pass before saved")
ok(len(st["history"]) == 3 and st["history"][2]["pass"] == 3 and st["history"][0]["val"] == 7.4 and st["chars"] == len(text), "the history has one point a pass, with the held-back loss; the characters are counted from the file")
mid = st["model"]["id"]
ok(os.path.isfile(os.path.join(str(md), mid + ".gguf")) and ia._MODEL_META[mid]["passes"] == 3 and not (md / "training" / st["id"]).exists(), "the model is in its place with three passes counted, and the work folder is cleared")
ok(not os.path.exists(a["path"]), "the incoming file was moved into the work, not left behind")
# the app closes in the second pass: the first pass stays, and the run goes on later
open(log, "w").close(); open(block, "w").close()
a2 = ia._train_text_put(text, True)
r = ia._train_start({"name": "Cut short", "size": "tiny", "passes": 3, "text_path": a2["path"]})
t0 = time.time()
while time.time() - t0 < 60 and not (ia._TRAIN.get("pass") == 1 and ia._TRAIN_PROC[0] is not None and len(open(log).read().strip().splitlines()) == 2):
    time.sleep(0.1)
time.sleep(0.3)
ia._train_stop_at_exit()
st = wait_done(30)
work = md / "training" / st["id"]
ok(st["state"] == "cancelled" and work.is_dir() and (work / "pass_1.gguf").is_file() and (work / "plan.json").is_file(), "the app closing in pass 2 keeps pass 1 and the plan")
idle = ia._train_status_692()
rs = idle.get("resumable") or {}
ok(idle["state"] == "cancelled" and rs.get("done") == 1 and rs.get("passes") == 3 and rs.get("name") == "Cut short", "train_status names the run that can go on: 1 of 3 passes done")
os.remove(block); open(log, "w").close()
r = ia._train_resume()
ok(r["ok"] and r["done"] == 1, "train_resume takes it up (%s)" % r)
st = wait_done()
runs = [l.split("|") for l in open(log).read().strip().splitlines()]
ok(st["state"] == "done" and len(runs) == 2 and runs[0][0].endswith("pass_1.gguf") and runs[1][0].endswith("pass_2.gguf") and len(st["history"]) == 3 and st["model"]["passes"] == 3,
   "it finishes passes 2 and 3 from the saved model, with the full history (%d runs, %d points)" % (len(runs), len(st.get("history") or [])))
ok(ia._train_status_692().get("resumable") is None, "nothing is left to resume")
ok(st["model"]["id"] != mid and ia._MODEL_META[mid]["passes"] == 3, "a training begun in the same second as the one before gets a name of its own (%s, %s)" % (mid, st["model"]["id"]))
# stopped by hand: nothing kept; a cut-short run let go
open(block, "w").close(); open(log, "w").close()
a3 = ia._train_text_put(text, True)
r = ia._train_start({"name": "By hand", "size": "tiny", "passes": 3, "text_path": a3["path"]})
t0 = time.time()
while time.time() - t0 < 60 and not (ia._TRAIN.get("pass") == 1 and ia._TRAIN_PROC[0] is not None and len(open(log).read().strip().splitlines()) == 2):
    time.sleep(0.1)
time.sleep(0.3)
ia._train_cancel()
st = wait_done(30)
ok(st["state"] == "cancelled" and not (md / "training" / st["id"]).exists() and ia._train_status_692().get("resumable") is None, "Stop training by hand keeps nothing, as before")
open(log, "w").close()
a4 = ia._train_text_put(text, True)
r = ia._train_start({"name": "Let go", "size": "tiny", "passes": 2, "text_path": a4["path"]})
t0 = time.time()
while time.time() - t0 < 60 and not (ia._TRAIN.get("pass") == 1 and ia._TRAIN_PROC[0] is not None and len(open(log).read().strip().splitlines()) == 2):
    time.sleep(0.1)
time.sleep(0.3)
ia._train_stop_at_exit(); wait_done(30)
ok(ia._train_status_692().get("resumable") and ia._train_discard()["gone"] and ia._train_status_692().get("resumable") is None, "train_discard lets a cut-short run go")
os.remove(block); open(log, "w").close()
# one string over the bridge still works, as before
r = ia._train_start({"name": "As before", "size": "tiny", "passes": 1, "text": text})
st = wait_done()
ok(r["ok"] and st["state"] == "done" and st["chars"] == len(text) and len(open(log).read().strip().splitlines()) == 1, "one string over the bridge still trains, in one pass")
short = ia._train_start({"name": "Short", "size": "tiny", "passes": 1, "text": "too short"})
ok(not short["ok"] and "2,000 characters" in short["error"], "too little text is still refused with the same words")
# perplexity, when the app carries llama-perplexity: a stand-in that prints what the real one prints
ppl_log = os.path.join(home, "ppl.log"); ppl_block = os.path.join(home, "ppl_block")
fakeppl = os.path.join(home, "llama-perplexity")
open(fakeppl, "w").write("""#!/bin/sh
M=""; F=""; C=""
while [ $# -gt 0 ]; do case "$1" in -m) M="$2"; shift;; -f) F="$2"; shift;; -c) C="$2"; shift;; esac; shift; done
echo "$M|$F|$C|$(wc -c < "$F")" >> "%s"
echo "perplexity: calculating perplexity over 3 chunks, n_ctx=256, batch_size=256" >&2
if [ -f "%s" ]; then i=0; while [ $i -lt 300 ] && [ -f "%s" ]; do sleep 0.1; i=$((i+1)); done; fi
echo "[1]24.1000,[2]22.9000,[3]21.7000," >&2
echo "Final estimate: PPL = 21.6804 +/- 1.01234" >&2
""" % (ppl_log, ppl_block, ppl_block))
os.chmod(fakeppl, os.stat(fakeppl).st_mode | stat.S_IEXEC)
ia._perplexity_path = lambda: None
no = ia._perplexity_start("m1")
ok(not ia._train_available().get("perplexity") and not no["ok"] and "does not carry llama.cpp's llama-perplexity" in no["error"], "without llama-perplexity, train_available says perplexity: false and a measurement is refused in plain words")
ia._perplexity_path = lambda: fakeppl
ok(ia._train_available().get("perplexity") is True, "with llama-perplexity beside the trainer, train_available says perplexity: true")
model = os.path.join(home, "m1.gguf"); open(model, "wb").write(b"GGUF" + b"\0" * 64); ia._MODEL_PATHS["m1"] = model
ok(not ia._perplexity_start("m1")["ok"] and "Hand the text over first" in ia._perplexity_start("m1")["error"], "a measurement with no text handed over is refused")
held = ("It is a truth universally acknowledged, that a single man in possession of a good fortune, must be in want of a wife. " * 20)  # 2,400 characters
ia._train_text_put(held, True)
bad = ia._perplexity_start("nope")
ok(not bad["ok"] and "not stored by this app" in bad["error"], "a model the app does not store is refused")
ia._train_text_put("too short", True)
short = ia._perplexity_start("m1")
ok(not short["ok"] and "too short" in short["error"], "a text too short to measure on is refused, and said so")
ia._train_text_put(held, True)
r = ia._perplexity_start("m1")
ok(r["ok"] and r["chars"] == len(held), "train_perplexity takes the text handed over and starts (%s)" % r)
t0 = time.time()
while time.time() - t0 < 30 and ia._perplexity_status().get("state") == "running":
    time.sleep(0.1)
st = ia._perplexity_status()
runs = [l.split("|") for l in open(ppl_log).read().strip().splitlines()]
ok(st["state"] == "done" and st["ppl"] == 21.6804 and abs(st["err"] - 1.01234) < 1e-9 and st["chars"] == len(held), "it reads the program's 'Final estimate: PPL = 21.6804 +/- 1.01234' (%s)" % {k: st.get(k) for k in ("state", "ppl", "err", "chars")})
ok(len(runs) == 1 and runs[0][0] == model and runs[0][2] == "256" and int(runs[0][3]) == len(held.encode("utf-8")), "llama-perplexity was run on that model and that text, with -c 256, as the build's own check runs it")
ok(not os.path.exists(os.path.join(str(md), "training-in", "measure.txt")) and not os.path.exists(os.path.join(str(md), "training-in", "incoming.txt")), "the text handed over is let go when the measurement is done")
open(ppl_block, "w").close(); open(ppl_log, "w").close()
ia._train_text_put(held, True)
r = ia._perplexity_start("m1")
t0 = time.time()
while time.time() - t0 < 30 and not open(ppl_log).read().strip():
    time.sleep(0.1)
again = ia._perplexity_start("m1")
c = ia._perplexity_cancel()
time.sleep(0.5)
st = ia._perplexity_status()
ok(r["ok"] and not again["ok"] and c["was_running"] and st["state"] == "cancelled" and ia._PPL_PROC[0] is None, "a measurement can be stopped; a second one is not started while one runs")
os.remove(ppl_block)
print("all passed")
