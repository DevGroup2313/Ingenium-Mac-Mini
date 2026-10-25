"""Ingenium 6.7 · the whole regression, one command: serves a built page, prepares every fixture, runs each test with its
own arguments, and writes a summary (a table of passed and failed checks per test).

    python3 rig/regress_67.py <folder holding ingenium.html> <out folder> [port] [test,test,...]

Fixtures it makes in the served folder: imp/ (chat exports of other assistants, rig/import_fixtures.js), apps/ (small, large
and very large pages for the stage), forge.html (The Forge's lean page Ingenium carries, from build/apps/builtin). axe-core
comes from AXE or rig/a11y/axe.min.js. Tests that need tools this machine may not have (apksig for t_v6, the desktop back end
for t_62_quick) are skipped and named in the summary."""
import os, sys, json, gzip, time, subprocess, shutil, signal

HERE = os.path.dirname(os.path.abspath(__file__))
SRC = os.path.dirname(HERE)
SERVE, OUT = os.path.abspath(sys.argv[1]), os.path.abspath(sys.argv[2])
PORT = int(sys.argv[3]) if len(sys.argv) > 3 else 8190
ONLY = sys.argv[4].split(",") if len(sys.argv) > 4 else None
os.makedirs(OUT, exist_ok=True)
AXE = next((p for p in [os.environ.get("AXE"), os.path.join(HERE, "a11y", "axe.min.js")] if p and os.path.exists(p)), None)
U = "http://127.0.0.1:%d" % PORT
PAGE = U + "/ingenium.html"


def prep():
    imp = os.path.join(SERVE, "imp")
    if not os.path.exists(os.path.join(imp, "chatgpt_export.zip")):
        subprocess.run(["node", os.path.join(HERE, "import_fixtures.js"), imp], check=True, capture_output=True)
    apps = os.path.join(SERVE, "apps"); os.makedirs(apps, exist_ok=True)
    body = "<p>" + ("Ingenium stage test. " * 50) + "</p>\n"
    for n, kb in (("small", 8), ("large", 3 * 1024), ("huge", 20 * 1024)):
        p = os.path.join(apps, n + ".html")
        if not os.path.exists(p):
            open(p, "w").write('<!doctype html><html><head><meta charset="utf-8"><title>%s</title></head><body><h1>%s</h1>'
                               '<script>try{localStorage.setItem("k","v")}catch(e){}</script>%s</body></html>' % (n, n, body * max(1, kb * 1024 // len(body))))
    fg = os.path.join(SERVE, "forge.html")
    if not os.path.exists(fg):
        open(fg, "wb").write(gzip.open(os.path.join(SRC, "build", "apps", "builtin", "forge.html.gz")).read())


A = lambda name: os.path.join(SERVE, "apps", name + ".html")
CORE = os.path.join(SRC, "build", "thoughts", "code_editor_core.html")
TESTS = [  # name, extra arguments after <page url> <out>, or a function giving the whole argument list
    ("t_67_select", [AXE]), ("t_67_phone", ["all"]), ("t_67_seal", [AXE]), ("t_67_sound", [AXE]), ("t_67_rooms", [AXE]),
    ("t_67_kits", []), ("t_67_security", []), ("t_67_claims", []),
    ("t_61_home", []), ("t_61_ask", []), ("t_61_backup", []), ("t_61_hub", ["forge=" + U + "/forge.html"]), ("t_61_refresh", []),
    ("t_61_seals", []), ("t_61_storage", []),
    ("t_62_apart", []), ("t_62_desk", []), ("t_62_eyes", []), ("t_62_import", [U + "/imp"]), ("t_62_lector", []), ("t_62_tour", []),
    ("t_62_stage", [A("small"), A("large"), A("huge")]), ("t_62_capacity", [A("large"), A("huge")]),
    ("t_63_capacity", []), ("t_63_code_editor_app", []), ("t_63_look", []),
    ("t_62_code_editor", lambda o: [CORE, o]), ("t_63_learn", lambda o: [CORE, o]),
    ("t_63_offline", lambda o: ["ingenium=" + PAGE, "forge=" + U + "/forge.html", o]),
    ("t_64_parts", []), ("t_64_replace", []), ("t_64_steps", []), ("t_65_desktop", []), ("t_65_train", []),
    ("t_academic", []), ("t_apps_whole", []), ("t_builtin", []), ("t_desk", []), ("t_fabrica", []), ("t_fabrica_narrow", []),
    ("t_lector_doctoral", []), ("t_models_care", []), ("t_recipe", []), ("t_studio_care", []), ("t_support", []),
    ("t_thoughts", []), ("t_tour_walk", []), ("t_reminder_cards", ["ingenium", AXE]), ("t_quiet_apps", ["ingenium"]),
]


def run_one(name, extra):
    o = os.path.join(OUT, name)
    os.makedirs(o, exist_ok=True)
    args = extra(o) if callable(extra) else [PAGE, o] + [x for x in extra if x]
    env = dict(os.environ, T67_AXE=AXE or "", AXE=AXE or "")
    t0 = time.time()
    with open(os.path.join(OUT, name + ".log"), "w") as log:
        try:
            r = subprocess.run(["node", os.path.join(HERE, name + ".js")] + args, stdout=log, stderr=subprocess.STDOUT, env=env, timeout=2400, cwd=SRC)
            code = r.returncode
        except subprocess.TimeoutExpired:
            code = "timeout"
    text = open(os.path.join(OUT, name + ".log"), errors="replace").read()
    p, f = text.count("\nPASS "), text.count("\nFAIL ")
    if text.startswith("PASS "): p += 1
    if text.startswith("FAIL "): f += 1
    fails = [l[5:200] for l in text.split("\n") if l.startswith("FAIL ")]
    return {"test": name, "passed": p, "failed": f, "exit": code, "s": round(time.time() - t0), "fails": fails[:8]}


def main():
    prep()
    srv = subprocess.Popen([sys.executable, "-m", "http.server", str(PORT), "--directory", SERVE], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    time.sleep(1.5)
    res = []
    try:
        for name, extra in TESTS:
            if ONLY and name not in ONLY:
                continue
            if not os.path.exists(os.path.join(HERE, name + ".js")):
                res.append({"test": name, "passed": 0, "failed": 0, "exit": "missing", "s": 0, "fails": []}); continue
            r = run_one(name, extra); res.append(r)
            print("%-24s %4d passed %3d failed  exit %-7s %5ds" % (name, r["passed"], r["failed"], r["exit"], r["s"]), flush=True)
            json.dump(res, open(os.path.join(OUT, "summary.json"), "w"), indent=1)
    finally:
        srv.send_signal(signal.SIGTERM)
    tp, tf = sum(r["passed"] for r in res), sum(r["failed"] for r in res)
    lines = ["%-24s %4d passed %3d failed  exit %s" % (r["test"], r["passed"], r["failed"], r["exit"]) for r in res]
    open(os.path.join(OUT, "summary.txt"), "w").write("\n".join(lines) + "\n\nTotal: %d passed, %d failed, in %d tests\n" % (tp, tf, len(res))
                                                     + "Skipped here: t_v6 (needs apksig.jar), t_62_quick (needs the desktop back end)\n")
    print("Total: %d passed, %d failed, in %d tests" % (tp, tf, len(res)))


main()
