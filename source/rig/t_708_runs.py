"""Ingenium 7.08 · Fabrica's runs on this computer (build/desktop/app_runs_708.py), the computer app's side, tested on Linux.
A copy of ingenium_app.py is patched and imported with a home of its own; an invented app (Tide Clock) is made a repository on the
drive with git, and its workflow run as the page asks for it:
  - a run of three jobs: build (a script, a tool put on PATH for the steps after it, an output, a summary, files kept), test (needs
    build; its own copy of the files, a folder named build among them), mac (not run here, said why); every state as GitHub gives it;
  - the files of the app at the version, taken from the repository on the drive itself;
  - the logs read from a byte on, as the page follows a run as it grows;
  - a step that runs too long is stopped with what it started; a second run waits while one goes;
  - a path outside the run's folder is refused; a run taken away leaves nothing behind;
  - the computer app's own calls (IngeniumApi.runs_*) are there, and the self-test passes.
    python3 rig/t_708_runs.py <ingenium_app.py> <scratch folder>"""
import base64
import importlib.util
import json
import os
import shutil
import subprocess
import sys
import time

APP, OUT = sys.argv[1], sys.argv[2]
shutil.rmtree(OUT, ignore_errors=True)
os.makedirs(OUT)
home = os.path.join(OUT, "home")
os.makedirs(home)
os.environ["HOME"] = home
os.environ.pop("XDG_DATA_HOME", None)
here = os.path.dirname(os.path.abspath(__file__))
shutil.copy(APP, os.path.join(OUT, "ingenium_app.py"))
subprocess.run([sys.executable, os.path.join(here, "..", "build", "desktop", "app_runs_708.py"), os.path.join(OUT, "ingenium_app.py")], check=True)
spec = importlib.util.spec_from_file_location("ia", os.path.join(OUT, "ingenium_app.py"))
ia = importlib.util.module_from_spec(spec)
sys.argv = ["x"]
spec.loader.exec_module(ia)
P = F = 0


def ok(c, m, d=None):
    global P, F
    print(("PASS " if c else "FAIL ") + m + ("" if c or d is None else "  " + json.dumps(d, default=str)[:700]))
    if c:
        P += 1
    else:
        F += 1


def wait(rid, secs=60):
    t = time.time() + secs
    while time.time() < t:
        g = ia._runs_get(rid)
        if g.get("ok") and g["run"]["state"] not in ("ready", "running"):
            return g["run"]
        time.sleep(0.2)
    return ia._runs_get(rid).get("run")


try:
    # an invented app, Tide Clock, as a repository on the drive
    repo = os.path.join(OUT, "Tide Clock")
    os.makedirs(os.path.join(repo, "build"))
    os.makedirs(os.path.join(repo, "src"))
    open(os.path.join(repo, "build", "keep.txt"), "w").write("a folder named build, as many apps have\n")
    open(os.path.join(repo, "src", "tide.txt"), "w").write("high water at 6:12\n")
    open(os.path.join(repo, "make.sh"), "w").write("#!/bin/bash\nset -e\nmkdir -p out\ncp src/tide.txt out/app.txt\necho made out/app.txt\n")
    os.chmod(os.path.join(repo, "make.sh"), 0o755)
    g = lambda *a: subprocess.run(["git", "-C", repo] + list(a), check=True, capture_output=True, text=True).stdout.strip()
    g("init", "-q", "-b", "main")
    g("-c", "user.name=Test", "-c", "user.email=test@example.invalid", "add", "-A")
    g("-c", "user.name=Test", "-c", "user.email=test@example.invalid", "commit", "-q", "-m", "first")
    sha = g("rev-parse", "HEAD")
    add = ia._disk_add(repo)
    rid_disk = (add.get("repo") or add).get("id") if isinstance(add, dict) else None
    ok(bool(rid_disk), "Tide Clock is a repository on the drive", add)

    api = ia.IngeniumApi("http://127.0.0.1/")
    names = ["runs_tools", "runs_new", "runs_put", "runs_go", "runs_stop", "runs_list", "runs_get", "runs_log", "runs_reveal", "runs_forget",
             "runs_file", "runs_install_begin", "runs_install_put", "runs_install_go"]
    ok(all(callable(getattr(api, n, None)) for n in names), "the computer app's calls are there: " + ", ".join(names))

    tools = api.runs_tools(True)
    keys = [t["key"] for t in tools["tools"]]
    ok(tools["ok"] and tools["os"] == "Linux" and "python" in keys and "git" in keys and all("need" in t and "for" in t for t in tools["tools"]),
       "this computer's tools are checked, each with what it is for and where to get it", tools)

    spec = {"app": "Tide Clock", "repo": "tide-clock", "version": sha, "workflow": "Build", "file": ".github/workflows/build.yml", "why": "pressed Run", "disk": rid_disk, "n": 7,
            "jobs": [{"key": "build", "name": "Build", "steps": [
                {"name": "Check out", "kind": "note", "done": True, "text": "The files of the version are in the folder already."},
                {"name": "Its version", "sid": "ver", "run": "echo version=3.2 >> \"$GITHUB_OUTPUT\""},
                {"name": "Say its version", "run": "echo \"version is \x01so:ver:version\x01\"", "env": {"V": "\x01so:ver:version\x01"}},
                {"name": "Make it", "run": "./make.sh\nmkdir -p \"$RUNNER_TEMP/tools\"\nprintf '#!/bin/sh\\necho tool says hi\\n' > \"$RUNNER_TEMP/tools/tidetool\"\nchmod +x \"$RUNNER_TEMP/tools/tidetool\"\n"
                 "echo \"$RUNNER_TEMP/tools\" >> \"$GITHUB_PATH\"\necho \"WHO=tide\" >> \"$GITHUB_ENV\"\necho \"size=12\" >> \"$GITHUB_OUTPUT\"\necho '### Made' >> \"$GITHUB_STEP_SUMMARY\""},
                {"name": "Use the tool", "run": "tidetool\n[ \"$WHO\" = tide ]\n[ \"$CI\" = true ]\n[ \"$GITHUB_SHA\" = \"" + sha + "\" ]\n[ \"$RUNNER_OS\" = Linux ]"},
                {"name": "Read env as the run goes", "run": "echo \"who is \x01env:WHO\x01\"\npwd", "cwd": "\x01env:GITHUB_WORKSPACE\x01/src"},
                {"name": "Keep it", "kind": "artifact", "art": "tide-clock", "paths": ["out/**"]}]},
                {"key": "test", "name": "Test", "needs": ["build"], "steps": [{"name": "Its own copy", "run": "test -f build/keep.txt\ntest ! -e out\necho tested"},
                    {"name": "Bring what build made", "kind": "fetch", "art": "tide-clock", "into": "got"}, {"name": "Read it", "run": "cat got/out/app.txt"}]},
                {"key": "care", "name": "Care", "steps": [{"name": "Needs Xcode", "kind": "fail", "text": "Xcode is not on this computer: from the App Store"},
                    {"name": "Only after success", "run": "echo never"}, {"name": "Clean up after a failure", "when": "failure", "run": "echo cleaned"},
                    {"name": "Always", "when": "always", "run": "echo always"}]},
                {"key": "mac", "name": "Mac", "skip": "it runs on macOS (runs-on: macos-15); this computer is Linux", "steps": [{"name": "Never", "run": "exit 1"}]}]}
    r = api.runs_new(spec)
    ok(r.get("ok") and r.get("id"), "a run is made ready", r)
    rid = r["id"]
    ok(api.runs_go(rid).get("ok"), "the run starts")
    second = api.runs_new({"jobs": [{"key": "x", "steps": [{"run": "true"}]}]})
    run = wait(rid)
    ok(not second.get("ok") and "one at a time" in (second.get("error") or ""), "a second run waits while one goes, as on one machine", second)
    ok(run["state"] == "bad" and [j["state"] for j in run["jobs"]] == ["ok", "ok", "bad", "skipped"] and run["n"] == 7,
       "build and test pass, care fails as it should, mac is not run here; the run keeps its number", [(j["key"], j["state"], [s["state"] for s in j["steps"]]) for j in run["jobs"]])
    lc = api.runs_log(rid, "care")["text"]
    ok([s["state"] for s in run["jobs"][2]["steps"]] == ["bad", "skipped", "ok", "ok"] and "cleaned" in lc and "always" in lc and "never" not in lc,
       "a step that needs what is missing fails and says so; after it, a failure() step and an always() step run, a success() step does not", lc[-500:])
    ok(run["jobs"][0]["steps"][0]["state"] == "ok", "checking out counts as done: the files are there")
    lb = api.runs_log(rid, "build")
    ok("version is 3.2" in lb["text"], "what one step said (steps.ver.outputs.version) reaches the step after it", lb["text"][:600])
    ok("who is tide" in lb["text"] and "/work/build/src" in lb["text"], "${{ env.WHO }} is read as the run goes (set by GITHUB_ENV); a working folder named by ${{ github.workspace }} is the run's own", lb["text"][-900:])
    ok("made out/app.txt" in lb["text"] and "tool says hi" in lb["text"] and "files of tide-clock" in lb["text"], "the build log says what each step did, the files taken from the drive",
       lb["text"][-900:])
    lt = api.runs_log(rid, "test")["text"]
    lm = api.runs_log(rid, "mac")["text"]
    ok("high water at 6:12" in lt, "the test job brings in what the build job kept (download-artifact)", lt[-300:])
    ok("tested" in lt and "Not run here: it runs on macOS" in lm, "the test job had its own copy (with its folder named build); the mac job says why it did not run", [lt[-300:], lm])
    part = api.runs_log(rid, "build", 20)
    ok(part["offset"] == lb["size"] and part["text"] == lb["text"][20:] if lb["text"].isascii() else part["offset"] == lb["size"], "a log is read from a byte on, to follow it as it grows")
    art = run["artifacts"]
    ok(len(art) == 1 and art[0]["name"] == "tide-clock" and [f["path"] for f in art[0]["files"]] == ["out/app.txt"] and
       os.path.isfile(os.path.join(ia._runs_dir(), rid, "files", "tide-clock", "out", "app.txt")), "what it made is kept with the run", art)
    ok((run.get("summary") or [{}])[0].get("text", "").startswith("### Made"), "the step's summary is kept", run.get("summary"))
    rf = api.runs_file(rid, "tide-clock", "out/app.txt")
    ok(rf.get("ok") and base64.b64decode(rf["b64"]) == b"high water at 6:12\n" and rf["size"] == 19, "a kept file is read back, to save it or add it to a release", rf)
    ok(not api.runs_file(rid, "tide-clock", "../../run.json").get("ok"), "and nothing outside what the run kept")
    d = os.path.join(ia._runs_dir(), rid)
    ok(sorted(os.listdir(d)) == ["files", "logs", "run.json"], "the run keeps its record, its logs and its files; its work folders are cleared", os.listdir(d))

    # stopping: a step that would sleep a minute, and a child of it
    r2 = api.runs_new({"app": "Tide Clock", "workflow": "Long", "jobs": [{"key": "long", "name": "Long", "steps": [{"name": "Sleep", "run": "sleep 60 &\nsleep 60"}]}]})
    api.runs_go(r2["id"])
    time.sleep(1.5)
    t0 = time.time()
    ok(api.runs_stop(r2["id"]).get("ok"), "a run is stopped when asked")
    run2 = wait(r2["id"], 20)
    ok(run2["state"] == "stopped" and time.time() - t0 < 10, "it stops within seconds", {"state": run2["state"], "secs": time.time() - t0})
    left = subprocess.run(["pgrep", "-f", "sleep 60"], capture_output=True, text=True).stdout.strip()
    ok(not left, "what it started is stopped too", left)

    # a step that runs past its own time
    r3 = api.runs_new({"jobs": [{"key": "t", "steps": [{"name": "Too long", "run": "sleep 30", "timeout": 0.03, "continue": True}, {"name": "After", "run": "true"}]}]})
    api.runs_go(r3["id"])
    run3 = wait(r3["id"], 30)
    ok(run3["jobs"][0]["steps"][0]["state"] == "bad" and run3["jobs"][0]["steps"][1]["state"] == "ok" and run3["jobs"][0]["state"] == "ok" and "ran past its time" in api.runs_log(r3["id"], "t")["text"],
       "a step past its time is stopped; marked continue-on-error, the steps after it still run and the job passes", [s["state"] for s in run3["jobs"][0]["steps"]])

    # files put by the page (an app kept in Ingenium), and a path outside refused
    r4 = api.runs_new({"jobs": [{"key": "p", "steps": [{"name": "Read", "run": "cat notes/a.txt\n./go.sh"}]}]})
    ok(api.runs_put(r4["id"], "notes/a.txt", base64.b64encode(b"from the ").decode()).get("ok") and
       api.runs_put(r4["id"], "notes/a.txt", base64.b64encode(b"page").decode(), None, True).get("ok") and
       api.runs_put(r4["id"], "go.sh", base64.b64encode(b"#!/bin/sh\necho went\n").decode(), 0o100755).get("ok"), "the page puts the app's files in, with their modes")
    bad = [api.runs_put(r4["id"], x, "") for x in ("../escape.txt", "/etc/x", "a/../../b", "C:/x")]
    ok(all(not b.get("ok") for b in bad) and not os.path.exists(os.path.join(ia._runs_dir(), "escape.txt")), "a path outside the run's folder is refused", bad)
    api.runs_go(r4["id"])
    run4 = wait(r4["id"])
    ok(run4["state"] == "ok" and "from the page" in api.runs_log(r4["id"], "p")["text"] and "went" in api.runs_log(r4["id"], "p")["text"], "a run of files the page put in passes",
       api.runs_log(r4["id"], "p")["text"][-300:])

    lst = api.runs_list()
    ok(lst["ok"] and [x["id"] for x in lst["runs"]][:1] == [r4["id"]] and lst["here"] == "Linux" and lst["runs"][-1]["files"] == 1 and lst["runs"][-1]["n"] == 7, "every run is listed, newest first",
       [(x["id"], x["state"]) for x in lst["runs"]])
    ok(api.runs_forget(rid).get("ok") and not os.path.exists(d), "a run taken away leaves nothing behind")
    ok(not api.runs_forget("../../x").get("ok") or not os.path.exists(os.path.join(OUT, "x")), "taking away stays inside the runs")
    inst = api.runs_install_begin("app.zip", 3)
    api.runs_install_put(inst["token"], base64.b64encode(b"abc").decode())
    gi = api.runs_install_go(inst["token"], {"title": "Tide Clock"})
    ok(not gi.get("ok") and "Mac or a Windows PC" in (gi.get("error") or ""), "installing is for a Mac or a Windows PC, said plainly elsewhere", gi)
    st = ia._selftest_runs()
    ok(st.get("ok"), "the self-test the Mac and Windows builds run passes here", st)
except Exception as e:
    import traceback
    traceback.print_exc()
    ok(False, "the test went through", str(e))
print("%d passed, %d failed" % (P, F))
sys.exit(1 if F else 0)
