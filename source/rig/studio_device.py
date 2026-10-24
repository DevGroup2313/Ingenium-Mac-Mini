"""INGENIUM | Copyright (c) 2026 Yannie D. Forest. All rights reserved. NO LICENCE IS GRANTED.
The model studio on the machines the apps run on (run by .github/workflows/studio-device.yml on GitHub's Apple silicon Mac,
Intel Mac and Windows PC): the desktop app's own code (ingenium_app.py, patched by desktop/app_train_65.py and
app_studio_65.py, as release.py patches it) with the engine and trainer the app carries for that machine. A model the
person has (SmolLM2 135M Instruct in 16 bits) is offered, widened to 32 bits, trained one pass on a short passage of a
novel at the app's own setting; then the app's engine loads the trained model, continues a passage and answers in chat.
How well it learns is studio_check.py's work; this one shows the whole path runs on each machine, and how long it takes.
    python3 studio_device.py <engine folder> <model.gguf> <novel.txt> <out folder>"""
import importlib, json, os, pathlib, re, shutil, subprocess, sys, time, urllib.request

ENGINE, MODEL, NOVEL, OUT = [os.path.abspath(x) for x in sys.argv[1:5]]
HERE = os.path.dirname(os.path.abspath(__file__))
REPO = os.path.normpath(os.path.join(HERE, "..", ".."))
os.makedirs(OUT, exist_ok=True)
lines = []


def say(s):
    print(s, flush=True)
    lines.append(s)


def done(ok, why):
    say(("PASS: " if ok else "FAIL: ") + why)
    open(os.path.join(OUT, "studio.txt"), "w", encoding="utf-8").write("\n".join(lines) + "\n")
    sys.exit(0 if ok else 1)


# the desktop app's own code, patched as release.py patches it
work = pathlib.Path(OUT) / "app"
work.mkdir(parents=True, exist_ok=True)
shutil.copyfile(os.path.join(REPO, "ingenium_app.py"), work / "ingenium_app.py")
for patch in ("app_train_65.py", "app_studio_65.py"):
    subprocess.run([sys.executable, os.path.join(REPO, "source", "build", "desktop", patch), str(work / "ingenium_app.py")], check=True)
sys.path.insert(0, str(work))
app = importlib.import_module("ingenium_app")
app._engine_dir = lambda: ENGINE
md = pathlib.Path(OUT) / "models"
md.mkdir(parents=True, exist_ok=True)
app._models_dir = lambda: md
app._save_models_index = lambda: None
app._MODEL_PATHS["smollm2-135m"] = os.path.abspath(MODEL)
app._MODEL_META["smollm2-135m"] = {"name": "SmolLM2 135M Instruct"}
say("The machine: %s, %d cores; the engine folder holds %s" % (sys.platform, os.cpu_count() or 1, ", ".join(sorted(
    n for n in os.listdir(ENGINE) if n.split(".")[0] in ("llama-server", "llama-finetune")))))
say("Trainer found by the app: %s" % ("yes" if app._train_available().get("trainer") else "NO"))

bases = app._train_bases()
say("The models it could start from: %s" % json.dumps(bases.get("models")))
if not any(m.get("id") == "smollm2-135m" and m.get("trainable") and m.get("fits") for m in bases.get("models") or []):
    done(False, "SmolLM2 135M was not offered as a model to start from")

# a short passage of the novel (the text between Project Gutenberg's own start and end lines, captions left out)
raw = open(NOVEL, encoding="utf-8", errors="replace").read()
m1 = re.search(r"\*\*\* ?START OF (THE|THIS) PROJECT GUTENBERG EBOOK[^\n]*\n", raw)
m2 = re.search(r"\*\*\* ?END OF (THE|THIS) PROJECT GUTENBERG EBOOK", raw)
book = raw[m1.end() if m1 else 0:m2.start() if m2 else len(raw)].strip()
book = re.sub(r"\[Illustration[^\[\]]*(?:\[[^\[\]]*\][^\[\]]*)*\]", "", book)
text = re.sub(r"\n{3,}", "\n\n", book)[:8000]

t0 = time.time()
r = app._train_start({"base": "smollm2-135m", "text": text, "name": "SmolLM2 135M, a passage of the novel"})
if not r.get("ok"):
    done(False, "training could not start: %s" % r.get("error"))
phases, stamps, st = [], {}, {}
while time.time() - t0 < 2400:
    st = app._train_status()
    if st.get("phase") and (not phases or phases[-1] != st["phase"]):
        phases.append(st["phase"])
        stamps[st["phase"]] = round(time.time() - t0)
    if st.get("state") in ("done", "error", "cancelled"):
        break
    time.sleep(1)
secs = round(time.time() - t0)
hist = st.get("history") or []
say("Training: %s in %d s on %d characters; phases (seconds from the start) %s; loss %s, held back %s" % (
    st.get("state"), secs, len(text), ", ".join("%s (%s)" % (p, stamps[p]) for p in phases),
    hist[-1].get("loss") if hist else None, hist[-1].get("val") if hist else None))
if st.get("state") != "done":
    done(False, "the trainer said: %s" % st.get("error"))
mid = (st.get("model") or {}).get("id")
say("Kept as: %s, %d bytes" % (json.dumps(app._MODEL_META.get(mid)), os.path.getsize(app._MODEL_PATHS[mid])))

# the app's engine loads the trained model, as the person's Models page would
res = app._engine_start(mid, 2048, None)
if not res or not res.get("ok"):
    done(False, "the engine could not load the trained model: %s" % (res or {}).get("error"))
es = {}
for _ in range(180):
    time.sleep(1)
    es = app._engine_status()
    if es.get("state") in ("ready", "error", "off"):
        break
if es.get("state") != "ready":
    app._engine_stop()
    done(False, "the engine did not get ready with the trained model: %s" % es.get("error"))


def post(path, body):
    req = urllib.request.Request("http://127.0.0.1:%s%s" % (es["port"], path), data=json.dumps(body).encode(),
                                 headers={"content-type": "application/json", "authorization": "Bearer " + (es.get("key") or "")})
    return json.load(app._NO_PROXY.open(req, timeout=300))


try:
    cont = post("/completion", {"prompt": "It was a fine morning at Longbourn, and Elizabeth", "n_predict": 50, "temperature": 0.7, "seed": 3})["content"].strip()
    chat = post("/v1/chat/completions", {"messages": [{"role": "user", "content": "In two sentences, what is a good way to spend a rainy afternoon?"}],
                                         "max_tokens": 80, "temperature": 0.7, "seed": 3})["choices"][0]["message"]["content"].strip()
finally:
    app._engine_stop()
say("The engine (%s) loaded it; the passage continued: %r" % (es.get("gpu") or es.get("device") or "processor", cont[:300]))
say("In chat: %r" % chat[:300])
done(bool(cont and chat), "a model the person has, widened and trained further on this machine, loads in the app's engine and answers"
     if cont and chat else "the trained model gave no answer")
