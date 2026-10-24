"""INGENIUM | Copyright (c) 2026 Yannie D. Forest. All rights reserved. NO LICENCE IS GRANTED.
The model studio's check on a real open model (run by .github/workflows/studio-check.yml, where Hugging Face and Project
Gutenberg can be reached): SmolLM2 135M Instruct (16-bit, checked by its fingerprint), trained further on a novel in the
public domain with the desktop app's own code (ingenium_app.py, patched by desktop/app_train_65.py and app_studio_65.py),
by llama.cpp b11321's own trainer, at each learning rate given. For each: the time a pass takes, perplexity on part of the
novel it never trains on (before and after), a passage begun in the novel's words and continued, and a question asked in
chat, to see that it keeps what it knew.
    python3 studio_check.py <llama bin folder> <model.gguf> <novel.txt> <out folder> <learning rate> [<learning rate> ...]"""
import importlib, json, os, pathlib, re, shutil, subprocess, sys, time, urllib.request

BIN, MODEL, NOVEL, OUT = [os.path.abspath(x) for x in sys.argv[1:5]]
# each "learning rate[:batches gathered before each step]", such as 1e-5:8
RUNS = [(float(x.split(":")[0]), int(x.split(":")[1]) if ":" in x else 1) for x in sys.argv[5:]] or [(1e-5, 1)]
HERE = os.path.dirname(os.path.abspath(__file__))
REPO = os.path.normpath(os.path.join(HERE, "..", ".."))
os.makedirs(OUT, exist_ok=True)
lines = []


def say(s):
    print(s, flush=True)
    lines.append(s)


# the desktop app's own code, patched as release.py patches it
work = pathlib.Path(OUT) / "app"
work.mkdir(parents=True, exist_ok=True)
shutil.copyfile(os.path.join(REPO, "ingenium_app.py"), work / "ingenium_app.py")
for patch in ("app_train_65.py", "app_studio_65.py"):
    subprocess.run([sys.executable, os.path.join(REPO, "source", "build", "desktop", patch), str(work / "ingenium_app.py")], check=True)
sys.path.insert(0, str(work))
app = importlib.import_module("ingenium_app")
app._trainer_path = lambda: os.path.join(BIN, "llama-finetune")
md = pathlib.Path(OUT) / "models"
md.mkdir(parents=True, exist_ok=True)
app._models_dir = lambda: md
app._save_models_index = lambda: None
app._MODEL_PATHS["smollm2-135m"] = os.path.abspath(MODEL)
app._MODEL_META["smollm2-135m"] = {"name": "SmolLM2 135M Instruct"}

# the novel: the text between Project Gutenberg's own start and end lines; trained on its first part, measured on its last
raw = open(NOVEL, encoding="utf-8", errors="replace").read()
m1 = re.search(r"\*\*\* ?START OF (THE|THIS) PROJECT GUTENBERG EBOOK[^\n]*\n", raw)
m2 = re.search(r"\*\*\* ?END OF (THE|THIS) PROJECT GUTENBERG EBOOK", raw)
book = raw[m1.end() if m1 else 0:m2.start() if m2 else len(raw)].strip()
# the illustrated edition's captions and their copyright lines are not the novel's prose: left out, as a person's own text has none
book = re.sub(r"\[Illustration[^\[\]]*(?:\[[^\[\]]*\][^\[\]]*)*\]", "", book)
book = re.sub(r"\n{3,}", "\n\n", book)
train_text = book[:120000]
held = book[-30000:]
open(os.path.join(OUT, "held.txt"), "w", encoding="utf-8").write(held)
say("SmolLM2 135M Instruct; the novel: %d characters, trained on the first %d, measured on the last %d" % (len(book), len(train_text), len(held)))
say("the models it could start from: %s" % json.dumps(app._train_bases()["models"]))

env = dict(os.environ, LD_LIBRARY_PATH=BIN)


def perplexity(model):
    r = subprocess.run([os.path.join(BIN, "llama-perplexity"), "-m", model, "-f", os.path.join(OUT, "held.txt"), "-c", "256", "-b", "256", "-t", str(os.cpu_count() or 2)],
                       capture_output=True, text=True, env=env)
    m = re.search(r"Final estimate: PPL = ([0-9.]+)", r.stdout + r.stderr)
    return float(m.group(1)) if m else None


def speak(model):
    """a passage begun in the novel's words, and a question in chat"""
    port = 8341
    p = subprocess.Popen([os.path.join(BIN, "llama-server"), "-m", model, "--port", str(port), "--host", "127.0.0.1", "-c", "1024", "-t", str(os.cpu_count() or 2)],
                         stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL, env=env)
    try:
        for _ in range(120):
            try:
                if b"ok" in urllib.request.urlopen("http://127.0.0.1:%d/health" % port, timeout=2).read():
                    break
            except Exception:
                time.sleep(1)

        def post(path, body):
            req = urllib.request.Request("http://127.0.0.1:%d%s" % (port, path), data=json.dumps(body).encode(), headers={"Content-Type": "application/json"})
            return json.load(urllib.request.urlopen(req, timeout=300))
        cont = post("/completion", {"prompt": "It was a fine morning at Longbourn, and Elizabeth", "n_predict": 60, "temperature": 0.7, "seed": 3})["content"]
        chat = post("/v1/chat/completions", {"messages": [{"role": "user", "content": "In two sentences, what is a good way to spend a rainy afternoon?"}],
                                             "max_tokens": 80, "temperature": 0.7, "seed": 3})["choices"][0]["message"]["content"]
        return cont.strip(), chat.strip()
    finally:
        p.terminate()
        p.wait()


before = perplexity(MODEL)
c0, q0 = speak(MODEL)
say("BEFORE: perplexity on the part it never trains on %s" % before)
say("BEFORE, the passage continued: %r" % c0[:400])
say("BEFORE, in chat: %r" % q0[:400])
results = []
for lr, period in RUNS:
    app.TRAIN_LR["base"] = (lr, lr / 10)
    app.TRAIN_PERIOD["base"] = period
    t0 = time.time()
    r = app._train_start({"base": "smollm2-135m", "text": train_text, "passes": 1, "name": "SmolLM2 135M, the novel, %g, %d" % (lr, period)})
    if not r.get("ok"):
        say("FAIL at %g:%d: %s" % (lr, period, r))
        continue
    phases, peak = [], 0
    while True:
        st = app._train_status()
        if st.get("phase") and (not phases or phases[-1] != st["phase"]):
            phases.append(st["phase"])
        if st.get("state") in ("done", "error", "cancelled"):
            break
        time.sleep(2)
    secs = round(time.time() - t0)
    if st.get("state") != "done":
        say("FAIL at %g:%d: %s" % (lr, period, st.get("error")))
        continue
    out = app._MODEL_PATHS[st["model"]["id"]]
    after = perplexity(out)
    c1, q1 = speak(out)
    results.append(((lr, period), after))
    say("AFTER (learning rate %g, %d batches a step, one pass, %d s, phases %s): loss %s, held back %s; perplexity on the part it never trains on %s (before %s)"
        % (lr, period, secs, " > ".join(phases), st["history"][-1]["loss"] if st.get("history") else None, st["history"][-1]["val"] if st.get("history") else None, after, before))
    say("AFTER %g:%d, the passage continued: %r" % (lr, period, c1[:400]))
    say("AFTER %g:%d, in chat: %r" % (lr, period, q1[:400]))
    say("AFTER %g:%d, kept as: %s" % (lr, period, json.dumps(app._MODEL_META.get(st["model"]["id"]))))
open(os.path.join(OUT, "studio.txt"), "w", encoding="utf-8").write("\n".join(lines) + "\n")
ok = results and before and min(a for _, a in results if a) < before
say("PASS: trained further, it reads the novel's own words better than before" if ok else "FAIL: no training read the novel better than before")
sys.exit(0 if ok else 1)
