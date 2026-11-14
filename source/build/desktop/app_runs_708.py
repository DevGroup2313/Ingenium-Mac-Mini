"""Ingenium 7.08 (14 November 2026): Fabrica, phase 3, its first stage. The owner approved the live preview ("I approve of the Fabrica on
Every Device preview, please commit and push it everywhere", https://claude.ai/artifact/GKVKb3isARMrB1NtBytnTp). This is the computer
app's side of it: an app's workflows run on this computer (Runs), what this computer can build with (Machines), and what Fabrica made put
in place on this computer (Install on this Mac, Install on this PC).

  runs_tools(fresh)              what this computer has for building and testing: Python and PyInstaller, Java, the Android tools, Xcode,
                                 Inno Setup, git, Node; each found where it lives, without running a stand-in that would ask to install
                                 something (macOS's /usr/bin/python3, git and java ask for Apple's tools or a JDK when they are absent)
  runs_new(spec)                 a run made ready: its folder, its record, an empty work folder; the page then puts the app's files in
  runs_put(rid, path, b64)       one file of the app at the version, into the run's work folder (the page sends them, for an app kept in
                                 Ingenium; for a repository on the drive the run takes them from the drive itself, runs_new's "disk")
  runs_go(rid)                   the run starts: each job, each step, in a thread of its own, one run at a time on this computer
  runs_stop(rid)                 stops it after killing the step that runs (and what it started)
  runs_list() / runs_get(rid)    every run kept, newest first / one run's whole record
  runs_log(rid, job, offset)     a job's log from a byte on (its newest part as it grows)
  runs_reveal(rid, what)         its folder, or what it made, shown in Finder or Explorer
  runs_forget(rid)               a run taken away, with its log and what it made (nothing else is ever removed by itself)
  runs_install_begin/put/go      what Fabrica made, put in place: a Mac app into Applications (or the person's own Applications folder
                                 when the first cannot be written), a Windows app into the person's own programs folder with its Start
                                 menu and desktop shortcuts and an entry in Settings, Apps that uninstalls it; then opened
A step is what the page made of a workflow's own step: run (a script, in bash, sh, pwsh, powershell, cmd or python, with its env and
folder), artifact (files kept with the run, by their paths and patterns), or note (a step that runs only on GitHub, said in the log). As
on GitHub, GITHUB_WORKSPACE, RUNNER_TEMP, RUNNER_OS, GITHUB_ENV, GITHUB_PATH, GITHUB_OUTPUT and GITHUB_STEP_SUMMARY are given, and what a
step writes into GITHUB_ENV and GITHUB_PATH reaches the steps after it. Every run is kept, its logs and what it made, until the person
takes it away: no expiry and no size limit but the drive's. The runs live in the app's own folder, runs/<id>/ (run.json, logs/, files/).

    python3 build/desktop/app_runs_708.py <repo>/ingenium_app.py"""
import sys

p = sys.argv[1]
s = open(p, encoding="utf-8").read()


def rep(old, new, n=1):
    global s
    c = s.count(old)
    if c != n:
        sys.exit("%s: expected %d, found %d: %r" % (p, n, c, old[:90]))
    s = s.replace(old, new)


if "_runs_new" in s:
    print("already patched", p)
    sys.exit(0)
if "_disk_open" not in s:
    sys.exit("%s: Fabrica's drive part (app_disk_686.py) must be applied first" % p)

FN = r'''# ---- 7.08 (Fabrica, phase 3): runs on this computer, its tools, installing what Fabrica made (app_runs_708.py) ----
_RUNS = {"lock": threading.RLock(), "live": {}, "tools": None, "tools_at": 0.0, "inst": {}}
_RUNS_SHELLS = ("bash", "sh", "pwsh", "powershell", "cmd", "python")


def _runs_dir():
    d = storage_dir()
    if not d:
        raise RuntimeError("this computer gives Ingenium no folder of its own to keep the runs in")
    r = os.path.join(os.path.dirname(d), "runs")   # beside the window's own storage, in Ingenium's folder: Ingenium/runs
    os.makedirs(r, exist_ok=True)
    return r


def _runs_safe(x, n=80):
    return (re.sub(r"[^A-Za-z0-9._-]+", "_", str(x or "")).strip("._") or "x")[:n]


def _runs_os():
    return "macOS" if sys.platform == "darwin" else ("Windows" if sys.platform.startswith("win") else "Linux")


def _runs_quiet():
    """a program started for a run or a check opens no window of its own on Windows"""
    return {"creationflags": 0x08000000} if sys.platform.startswith("win") else {}


def _runs_paths():
    """the folders a terminal would look in: an app opened from the Dock or the Start menu is given a short PATH, so the usual homes of
    Homebrew, python.org's Python, Java, Node and git are added after the ones it has"""
    home = os.path.expanduser("~")
    have = [x for x in (os.environ.get("PATH") or "").split(os.pathsep) if x]
    more = []
    if sys.platform == "darwin":
        more = ["/opt/homebrew/bin", "/opt/homebrew/sbin", "/usr/local/bin", "/Library/Frameworks/Python.framework/Versions/Current/bin",
                os.path.join(home, ".pyenv", "shims"), os.path.join(home, ".local", "bin"), "/usr/bin", "/bin", "/usr/sbin", "/sbin"]
        try:
            for v in sorted(os.listdir("/Library/Frameworks/Python.framework/Versions"), reverse=True):
                more.append("/Library/Frameworks/Python.framework/Versions/%s/bin" % v)
        except OSError:
            pass
    elif sys.platform.startswith("win"):
        la = os.environ.get("LOCALAPPDATA") or ""
        pf = os.environ.get("ProgramFiles") or r"C:\Program Files"
        pf86 = os.environ.get("ProgramFiles(x86)") or r"C:\Program Files (x86)"
        more = [os.path.join(pf, "Git", "cmd"), os.path.join(pf, "Git", "bin"), os.path.join(pf, "nodejs"), os.path.join(pf86, "Inno Setup 6"),
                os.path.join(pf, "Inno Setup 6"), os.path.join(la, "Programs", "Inno Setup 6")]
        try:
            pyroot = os.path.join(la, "Programs", "Python")
            for v in sorted(os.listdir(pyroot), reverse=True):
                more += [os.path.join(pyroot, v), os.path.join(pyroot, v, "Scripts")]
        except OSError:
            pass
    else:
        more = ["/usr/local/bin", "/usr/bin", "/bin", os.path.join(home, ".local", "bin")]
    out = []
    for x in have + more:
        if x and x not in out and os.path.isdir(x):
            out.append(x)
    return os.pathsep.join(out)


def _runs_which(name, path=None):
    return shutil.which(name, path=path or _runs_paths())


def _runs_cmd(args, timeout=25, path=None):
    try:
        env = dict(os.environ)
        env["PATH"] = path or _runs_paths()
        r = subprocess.run(args, capture_output=True, text=True, timeout=timeout, env=env, **_runs_quiet())
        return r.returncode, ((r.stdout or "") + (r.stderr or "")).strip()
    except Exception as e:
        return None, str(e)


def _runs_mac_dev_tools():
    """True when Apple's command-line tools or Xcode are installed: only then may /usr/bin/python3, git and the like be run"""
    if sys.platform != "darwin":
        return True
    code, out = _runs_cmd(["/usr/bin/xcode-select", "-p"], 10)
    return code == 0 and bool(out) and os.path.isdir(out.splitlines()[-1].strip())


def _runs_real(exe):
    """not one of macOS's stand-ins in /usr/bin when Apple's tools are absent"""
    if not exe:
        return None
    if sys.platform == "darwin" and os.path.realpath(exe).startswith("/usr/bin/") and not _runs_mac_dev_tools():
        return None
    if sys.platform.startswith("win") and "WindowsApps" in exe:
        return None   # the Store's own name for Python opens the Store; it is not Python
    return exe


def _runs_python():
    if sys.platform.startswith("win"):
        py = _runs_which("py")
        if py:
            code, out = _runs_cmd([py, "-3", "--version"])
            if code == 0:
                return [py, "-3"], out.replace("Python ", "")
    for n in ("python3", "python"):
        exe = _runs_real(_runs_which(n))
        if exe:
            code, out = _runs_cmd([exe, "--version"])
            if code == 0 and out.startswith("Python 3"):
                return [exe], out.replace("Python ", "")
    return None, ""


def _runs_tools(fresh=False):
    with _RUNS["lock"]:
        if not fresh and _RUNS["tools"] and time.time() - _RUNS["tools_at"] < 120:
            return _RUNS["tools"]
    win, mac = sys.platform.startswith("win"), sys.platform == "darwin"
    tools = []

    def add(key, name, ok, version="", need="", builds=""):
        tools.append({"key": key, "name": name, "ok": bool(ok), "version": version, "need": "" if ok else need, "for": builds})
    py, pyv = _runs_python()
    add("python", "Python 3", bool(py), pyv, "from python.org (version 3.12 or 3.13), or Homebrew on a Mac" if mac else "from python.org (version 3.12 or 3.13)",
        "the Mac and Windows apps")
    pi = ""
    if py:
        code, out = _runs_cmd(py + ["-m", "PyInstaller", "--version"], 40)
        pi = out.splitlines()[-1].strip() if code == 0 and out else ""
    add("pyinstaller", "PyInstaller", bool(pi), pi, "in Terminal: python3 -m pip install pyinstaller pywebview" if not win else "in PowerShell: py -m pip install pyinstaller pywebview",
        "the Mac and Windows apps")
    jv, jhome = "", ""
    if mac:
        code, out = _runs_cmd(["/usr/libexec/java_home"], 10)
        if code == 0 and out:
            jhome = out.splitlines()[-1].strip()
            code, out = _runs_cmd([os.path.join(jhome, "bin", "java"), "-version"])
            jv = (out.splitlines() or [""])[0]
    else:
        je = None
        if os.environ.get("JAVA_HOME") and os.path.isfile(os.path.join(os.environ["JAVA_HOME"], "bin", "java.exe" if win else "java")):
            je = os.path.join(os.environ["JAVA_HOME"], "bin", "java.exe" if win else "java")
        je = je or _runs_which("java")
        if je:
            code, out = _runs_cmd([je, "-version"])
            jv = (out.splitlines() or [""])[0] if code == 0 else ""
    m = re.search(r'"(\d+)(?:\.(\d+))?', jv)
    jmajor = int(m.group(1)) if m else 0
    add("java", "Java 17 or newer", jmajor >= 17, jv.replace('"', ""), "a JDK, version 17 or newer (Temurin, from adoptium.net), or Android Studio's own",
        "the Fire tablet's APK")
    sdk = os.environ.get("ANDROID_HOME") or os.environ.get("ANDROID_SDK_ROOT") or ""
    if not sdk:
        for c in ([os.path.expanduser("~/Library/Android/sdk")] if mac else [os.path.join(os.environ.get("LOCALAPPDATA") or "", "Android", "Sdk")] if win
                  else [os.path.expanduser("~/Android/Sdk")]):
            if c and os.path.isdir(c):
                sdk = c
                break
    plats = []
    try:
        plats = sorted(x for x in os.listdir(os.path.join(sdk, "platforms")) if x.startswith("android-")) if sdk else []
    except OSError:
        plats = []
    add("android", "The Android tools", bool(sdk and plats), (", ".join(plats[-2:]) if plats else ""), "Android Studio, or its command-line tools, with an Android platform",
        "the Fire tablet's APK, and its emulator")
    if mac:
        code, out = _runs_cmd(["/usr/bin/xcrun", "--find", "xcodebuild"], 15) if _runs_mac_dev_tools() else (None, "")
        xv = ""
        if code == 0 and out:
            c2, o2 = _runs_cmd(["/usr/bin/xcodebuild", "-version"], 20)
            xv = (o2.splitlines() or [""])[0] if c2 == 0 else ""
        add("xcode", "Xcode", bool(xv), xv, "from the App Store (about 12 GB), opened once to finish installing", "the iPhone and iPad's IPA, and their simulators")
    if win:
        iscc = _runs_which("ISCC.exe") or _runs_which("iscc")
        add("inno", "Inno Setup 6", bool(iscc), "6" if iscc else "", "from jrsoftware.org (free)", "the Windows installer")
        wv = ""
        try:
            import winreg
            for root, key in ((winreg.HKEY_LOCAL_MACHINE, r"SOFTWARE\WOW6432Node\Microsoft\EdgeUpdate\Clients\{F3017226-FE2A-4295-8BDF-00C3A9A7E4C5}"),
                              (winreg.HKEY_CURRENT_USER, r"Software\Microsoft\EdgeUpdate\Clients\{F3017226-FE2A-4295-8BDF-00C3A9A7E4C5}")):
                try:
                    with winreg.OpenKey(root, key) as k:
                        wv = winreg.QueryValueEx(k, "pv")[0]
                        break
                except OSError:
                    continue
        except Exception:
            wv = ""
        add("webview2", "Microsoft Edge WebView2", bool(wv), wv, "Windows 10 and 11 carry it; else from Microsoft", "the Windows apps")
    ge = _runs_real(_runs_which("git"))
    gv = ""
    if ge:
        code, out = _runs_cmd([ge, "--version"])
        gv = out.replace("git version ", "") if code == 0 else ""
    add("git", "git", bool(gv), gv, "from git-scm.com (Apple's tools carry it on a Mac)", "workflows that call git")
    ne = _runs_which("node")
    nv = ""
    if ne:
        code, out = _runs_cmd([ne, "--version"])
        nv = out if code == 0 else ""
    add("node", "Node.js", bool(nv), nv, "from nodejs.org", "workflows that call node")
    import platform as _pl
    info = {"ok": True, "os": _runs_os(), "release": (_pl.mac_ver()[0] if mac else _pl.release()), "arch": _pl.machine() or "",
            "name": _pl.node() or "", "tools": tools, "checked": time.time(), "java_home": jhome,
            "android_home": sdk}
    with _RUNS["lock"]:
        _RUNS["tools"], _RUNS["tools_at"] = info, time.time()
    return info


def _runs_rec_path(rid):
    return os.path.join(_runs_dir(), _runs_safe(rid), "run.json")


def _runs_read(rid):
    with open(_runs_rec_path(rid), encoding="utf-8") as fh:
        return json.load(fh)


def _runs_write(rec):
    f = _runs_rec_path(rec["id"])
    tmp = f + ".tmp"
    with open(tmp, "w", encoding="utf-8") as fh:
        json.dump(rec, fh, ensure_ascii=False, indent=1)
    os.replace(tmp, f)


def _runs_new(spec):
    if not isinstance(spec, dict) or not isinstance(spec.get("jobs"), list) or not spec["jobs"]:
        return {"ok": False, "error": "a run needs at least one job"}
    with _RUNS["lock"]:
        if any(x.get("thread") and x["thread"].is_alive() for x in _RUNS["live"].values()):
            return {"ok": False, "error": "a run is going on this computer: it runs one at a time, as one machine does"}
        rid = time.strftime("%Y%m%d-%H%M%S") + "-" + hashlib.sha1(os.urandom(8)).hexdigest()[:6]
        d = os.path.join(_runs_dir(), rid)
        for sub in ("logs", "files", "src", "work", "temp"):
            os.makedirs(os.path.join(d, sub), exist_ok=True)
        jobs = []
        for i, j in enumerate(spec["jobs"]):
            key = _runs_safe(j.get("key") or ("job%d" % i), 60)
            steps = []
            for st in j.get("steps") or []:
                kind = st.get("kind") or "run"
                if kind not in ("run", "artifact", "note", "fetch", "fail"):
                    kind = "note"
                when = str(st.get("when") or "success")
                sh = str(st.get("shell") or "").lower()
                steps.append({"name": str(st.get("name") or ("Step %d" % (len(steps) + 1)))[:200], "kind": kind,
                              "run": str(st.get("run") or ""), "shell": sh if sh in _RUNS_SHELLS else "", "env": {str(k): str(v) for k, v in (st.get("env") or {}).items()},
                              "cwd": str(st.get("cwd") or ""), "timeout": float(st.get("timeout") or 0), "continue": bool(st.get("continue")),
                              "paths": [str(x) for x in (st.get("paths") or [])][:200], "art": str(st.get("art") or "")[:120], "text": str(st.get("text") or "")[:2000],
                              "when": when if when in ("success", "always", "failure") else "success", "sid": _runs_safe(st.get("sid"), 80) if st.get("sid") else "",
                              "done": bool(st.get("done")), "into": str(st.get("into") or "")[:300], "need": str(st.get("need") or "")[:20],
                              "state": "queued", "code": None, "started": None, "ended": None})
            jobs.append({"key": key, "name": str(j.get("name") or key)[:200], "needs": [str(x) for x in (j.get("needs") or [])], "skip": str(j.get("skip") or "")[:400],
                         "env": {str(k): str(v) for k, v in (j.get("env") or {}).items()}, "timeout": float(j.get("timeout") or 360),
                         "state": "skipped" if j.get("skip") else "queued", "steps": steps, "started": None, "ended": None})
        rec = {"id": rid, "at": time.time(), "state": "ready", "app": str(spec.get("app") or "")[:200], "repo": str(spec.get("repo") or "")[:200],
               "version": str(spec.get("version") or "")[:80], "label": str(spec.get("label") or "")[:200], "workflow": str(spec.get("workflow") or "")[:200],
               "file": str(spec.get("file") or "")[:300], "why": str(spec.get("why") or "")[:300], "machine": {"os": _runs_os(), "name": ""},
               "jobs": jobs, "artifacts": [], "ended": None, "disk": str(spec.get("disk") or ""), "n": int(spec.get("n") or 0),
               "event": str(spec.get("event") or "")[:60]}
        try:
            import platform as _pl
            rec["machine"]["name"] = _pl.node() or ""
        except Exception:
            pass
        _runs_write(rec)
        return {"ok": True, "id": rid, "src": os.path.join(d, "src")}


def _runs_inside(base, rel):
    rel = str(rel or "").replace("\\", "/")
    if not rel or rel.startswith("/") or any(part in ("..", "") for part in rel.split("/")) or re.match(r"^[A-Za-z]:", rel):
        raise ValueError("a path outside the run's folder: %r" % rel)
    full = os.path.abspath(os.path.join(base, *rel.split("/")))
    if not (full + os.sep).startswith(os.path.abspath(base) + os.sep):
        raise ValueError("a path outside the run's folder: %r" % rel)
    return full


def _runs_put(rid, path, b64, mode=None, append=False):
    try:
        d = os.path.join(_runs_dir(), _runs_safe(rid))
        f = _runs_inside(os.path.join(d, "src"), path)
        os.makedirs(os.path.dirname(f), exist_ok=True)
        with open(f, "ab" if append else "wb") as fh:
            fh.write(base64.b64decode(b64 or ""))
        if mode and int(mode) & 0o111 and not sys.platform.startswith("win"):
            os.chmod(f, 0o755)
        return {"ok": True}
    except Exception as e:
        return {"ok": False, "error": str(e)}


def _runs_checkout_disk(rec, work, log):
    """the app's files at the version, straight from its repository on the drive (dulwich), as git would check them out"""
    from dulwich.object_store import iter_tree_contents
    rid = rec.get("disk") or ""
    if not rid:
        return True
    repo = _disk_open(rid)[0]
    ver = rec.get("version") or ""
    try:
        commit = repo[ver.encode("ascii")]
    except Exception:
        commit = repo[repo.head()]
        rec["version"] = commit.id.decode("ascii")
    n = 0
    for entry in iter_tree_contents(repo.object_store, commit.tree):
        path = entry.path.decode("utf-8", "replace")
        mode = entry.mode
        if mode == 0o160000:
            log("  " + path + ": a submodule, not taken (it lives in its own repository)")
            continue
        f = _runs_inside(work, path)
        os.makedirs(os.path.dirname(f), exist_ok=True)
        data = repo.object_store[entry.sha].data
        if mode == 0o120000 and not sys.platform.startswith("win"):
            try:
                os.symlink(data.decode("utf-8"), f)
                continue
            except OSError:
                pass
        with open(f, "wb") as fh:
            fh.write(data)
        if mode & 0o111 and not sys.platform.startswith("win"):
            os.chmod(f, 0o755)
        n += 1
    log("  %d files of %s, at %s, from the repository on the drive" % (n, rec.get("repo") or "the app", (rec.get("version") or "")[:7]))
    return True


def _runs_kill(proc):
    if proc is None or proc.poll() is not None:
        return
    try:
        if sys.platform.startswith("win"):
            subprocess.run(["taskkill", "/T", "/F", "/PID", str(proc.pid)], capture_output=True, timeout=20, **_runs_quiet())
        else:
            import signal
            os.killpg(proc.pid, signal.SIGTERM)
            try:
                proc.wait(5)
            except Exception:
                os.killpg(proc.pid, signal.SIGKILL)
    except Exception:
        try:
            proc.kill()
        except Exception:
            pass


def _runs_git_tool(name, path):
    """bash or sh: on Windows, Git's own (as GitHub's Windows machines use), never the bash in System32, which opens Linux (WSL)"""
    if not sys.platform.startswith("win"):
        return _runs_which(name, path)
    for root in (os.environ.get("ProgramFiles") or r"C:\Program Files", os.environ.get("ProgramW6432") or "", os.path.join(os.environ.get("LOCALAPPDATA") or "", "Programs")):
        if root:
            f = os.path.join(root, "Git", "bin", name + ".exe")
            if os.path.isfile(f):
                return f
    exe = _runs_which(name, path)
    if exe and "system32" not in exe.lower() and "windowsapps" not in exe.lower():
        return exe
    return None


def _runs_shell_args(shell, file, path):
    win = sys.platform.startswith("win")
    if shell in ("pwsh", "powershell"):
        exe = _runs_which("pwsh", path) or (_runs_which("powershell", path) if win else None)
        if not exe:
            raise RuntimeError("PowerShell (pwsh) is not on this computer")
        return [exe, "-NoLogo", "-NoProfile", "-NonInteractive", "-ExecutionPolicy", "Bypass", "-File", file]
    if shell == "cmd":
        if not win:
            raise RuntimeError("cmd runs on Windows only")
        return ["cmd.exe", "/D", "/E:ON", "/V:OFF", "/S", "/C", "CALL \"%s\"" % file]
    if shell == "python":
        py, _ = _runs_python()
        if not py:
            raise RuntimeError("Python 3 is not on this computer")
        return py + [file]
    if shell == "sh":
        exe = _runs_git_tool("sh", path)
        if not exe:
            raise RuntimeError("sh is not on this computer" + (" (Git for Windows brings it)" if win else ""))
        return [exe, "-e", file]
    exe = _runs_git_tool("bash", path)
    if not exe:
        raise RuntimeError("bash is not on this computer" + (" (Git for Windows brings it)" if win else ""))
    return [exe, "--noprofile", "--norc", "-eo", "pipefail", file]


def _runs_envfile(f, env):
    """KEY=VALUE and KEY<<DELIM ... DELIM lines, as GitHub reads them"""
    try:
        with open(f, encoding="utf-8-sig", errors="replace") as fh:
            lines = fh.read().splitlines()
    except OSError:
        return
    i = 0
    while i < len(lines):
        ln = lines[i]
        m = re.match(r"^([A-Za-z_][A-Za-z0-9_]*)<<(.+)$", ln)
        if m:
            key, delim, buf = m.group(1), m.group(2), []
            i += 1
            while i < len(lines) and lines[i] != delim:
                buf.append(lines[i])
                i += 1
            env[key] = "\n".join(buf)
        elif "=" in ln:
            k, v = ln.split("=", 1)
            if re.match(r"^[A-Za-z_][A-Za-z0-9_]*$", k):
                env[k] = v
        i += 1


def _runs_worker(rid):
    live = _RUNS["live"][rid]
    stop = live["stop"]
    rec = _runs_read(rid)
    d = os.path.join(_runs_dir(), rid)
    src, work, temp = os.path.join(d, "src"), os.path.join(d, "work"), os.path.join(d, "temp")
    rec["state"] = "running"
    rec["started"] = time.time()
    _runs_write(rec)
    path = _runs_paths()
    base_env = dict(os.environ)
    base_env["PATH"] = path
    tools = {}
    try:
        tools = _runs_tools()
    except Exception:
        tools = {}
    if tools.get("java_home"):
        base_env.setdefault("JAVA_HOME", tools["java_home"])
    if tools.get("android_home"):
        base_env.setdefault("ANDROID_HOME", tools["android_home"])
        base_env.setdefault("ANDROID_SDK_ROOT", tools["android_home"])
    base_env.update({"CI": "true", "INGENIUM_FABRICA": "1", "GITHUB_WORKSPACE": work, "RUNNER_TEMP": temp, "RUNNER_OS": _runs_os(),
                     "RUNNER_ARCH": _runs_arch(),
                     "GITHUB_RUN_ID": rid, "GITHUB_SHA": rec.get("version") or "", "GITHUB_REPOSITORY": rec.get("repo") or ""})
    failed = set()
    runnable = [j for j in rec["jobs"] if not j.get("skip")]
    have_src = [not rec.get("disk")]
    for job in rec["jobs"]:
        logf = os.path.join(d, "logs", job["key"] + ".log")
        lf = open(logf, "a", encoding="utf-8", errors="replace")

        def log(line, lf=lf):
            lf.write(line.rstrip("\n") + "\n")
            lf.flush()
        try:
            if job.get("skip"):
                log("Not run here: " + job["skip"])
                job["state"] = "skipped"
                _runs_write(rec)
                continue
            if stop.is_set():
                job["state"] = "stopped"
                _runs_write(rec)
                continue
            blocked = [n for n in job.get("needs") or [] if n in failed]
            if blocked:
                log("Not run: it needs %s, which did not pass." % ", ".join(blocked))
                job["state"] = "skipped"
                failed.add(job["key"])
                _runs_write(rec)
                continue
            job["state"], job["started"] = "running", time.time()
            _runs_write(rec)
            log("Run %s · %s · %s" % (rid, rec.get("workflow") or "a workflow", job["name"]))
            log("Machine: this computer (%s, %s)" % (_runs_os(), _runs_arch().lower()))
            if not have_src[0]:
                _runs_checkout_disk(rec, src, log)
                have_src[0] = True
            # each job its own copy of the app's files, as each job on GitHub has a machine of its own; the last one takes them as they are
            jw = os.path.join(work, job["key"])
            shutil.rmtree(jw, ignore_errors=True)
            if job is runnable[-1]:
                os.replace(src, jw)
            else:
                shutil.copytree(src, jw, symlinks=True)
            log("Folder: %s" % jw)
            env = dict(base_env)
            env["GITHUB_SHA"] = rec.get("version") or ""
            env["GITHUB_WORKSPACE"] = jw
            env["GITHUB_JOB"] = job["key"]
            env.update(job.get("env") or {})
            ok_job = True
            t_end = time.time() + 60 * max(1.0, job.get("timeout") or 360)
            outs = {}
            for k, st in enumerate(job["steps"]):
                if stop.is_set():
                    st["state"] = "stopped"
                    continue
                w = st.get("when") or "success"
                if (w == "success" and not ok_job) or (w == "failure" and ok_job):
                    st["state"] = "skipped"
                    continue
                st["state"], st["started"] = "running", time.time()
                _runs_write(rec)
                log("")
                log("\u25b8 " + st["name"])
                if st["kind"] == "note":
                    log("  " + (st.get("text") or "Not run on this computer."))
                    st["state"], st["ended"] = ("ok" if st.get("done") else "skipped"), time.time()
                    _runs_write(rec)
                    continue
                if st["kind"] == "fail":
                    log("  " + (st.get("text") or "This step cannot run on this computer."))
                    st["state"], st["ended"] = "bad", time.time()
                    if not st.get("continue"):
                        ok_job = False
                    _runs_write(rec)
                    continue
                if st["kind"] == "artifact":
                    st2 = dict(st)
                    st2["paths"] = [_runs_said(x, outs, env) for x in st.get("paths") or []]
                    st2["art"] = _runs_said(st.get("art") or "", outs, env)
                    got = _runs_keep(d, jw, st2, log)
                    rec["artifacts"] = [a for a in rec["artifacts"] if a["name"] != got["name"]] + [got]
                    st["state"] = "ok" if got["files"] else ("bad" if st.get("need") == "error" else "warn")
                    if st["state"] == "bad" and not st.get("continue"):
                        ok_job = False
                    st["ended"] = time.time()
                    _runs_write(rec)
                    continue
                if st["kind"] == "fetch":
                    n_got = _runs_fetch(d, jw, st, log)
                    st["state"] = "ok" if n_got else "bad"
                    if not n_got and not st.get("continue"):
                        ok_job = False
                    st["ended"] = time.time()
                    _runs_write(rec)
                    continue
                files = {n: os.path.join(temp, "%s_%d_%s" % (job["key"], k, n)) for n in ("env", "path", "output", "summary")}
                for f in files.values():
                    open(f, "w").close()
                senv = dict(env)
                senv.update({k2: _runs_said(v2, outs, env) for k2, v2 in (st.get("env") or {}).items()})
                senv.update({"GITHUB_ENV": files["env"], "GITHUB_PATH": files["path"], "GITHUB_OUTPUT": files["output"], "GITHUB_STEP_SUMMARY": files["summary"]})
                shell = st.get("shell") or ("pwsh" if sys.platform.startswith("win") else "bash")
                ext = {"pwsh": ".ps1", "powershell": ".ps1", "cmd": ".cmd", "python": ".py"}.get(shell, ".sh")
                script = os.path.join(temp, "%s_%d%s" % (job["key"], k, ext))
                body = _runs_said(st.get("run") or "", outs, senv)
                if shell in ("pwsh", "powershell"):
                    body = "$ErrorActionPreference = 'stop'\n" + body + "\nif ((Test-Path -LiteralPath variable:/LASTEXITCODE)) { exit $LASTEXITCODE }\n"
                with open(script, "w", encoding="utf-8-sig" if ext == ".ps1" else "utf-8", newline="\r\n" if ext in (".cmd", ".ps1") else "\n") as fh:
                    fh.write(body)
                cwd = jw
                if st.get("cwd"):
                    cv = _runs_said(st["cwd"], outs, senv)
                    if os.path.isabs(cv):
                        if os.path.abspath(cv) != os.path.abspath(jw) and not (os.path.abspath(cv) + os.sep).startswith(os.path.abspath(jw) + os.sep):
                            raise ValueError("a working folder outside the run's folder: %s" % cv)
                        cwd = os.path.abspath(cv)
                    else:
                        rel = cv.replace(chr(92), "/").strip("/")
                        cwd = _runs_inside(jw, rel) if rel and rel != "." else jw
                    os.makedirs(cwd, exist_ok=True)
                t0 = time.time()
                code = None
                try:
                    args = _runs_shell_args(shell, script, senv["PATH"])
                    kw = dict(_runs_quiet())
                    if not sys.platform.startswith("win"):
                        kw["start_new_session"] = True
                    proc = subprocess.Popen(args, cwd=cwd, env=senv, stdout=subprocess.PIPE, stderr=subprocess.STDOUT, stdin=subprocess.DEVNULL, **kw)
                    live["proc"] = proc
                    limit = min(t_end, t0 + 60 * st["timeout"]) if st.get("timeout") else t_end
                    reader = threading.Thread(target=_runs_pump, args=(proc, log), daemon=True)
                    reader.start()
                    while proc.poll() is None:
                        if stop.is_set() or time.time() > limit:
                            _runs_kill(proc)
                            log("  (stopped: %s)" % ("you stopped the run" if stop.is_set() else "it ran past its time"))
                            break
                        time.sleep(0.2)
                    reader.join(10)
                    code = proc.poll()
                except Exception as e:
                    log("  " + str(e))
                    code = -1
                finally:
                    live["proc"] = None
                _runs_envfile(files["env"], env)
                if st.get("sid"):
                    said = {}
                    _runs_envfile(files["output"], said)
                    outs[st["sid"]] = said
                try:
                    with open(files["path"], encoding="utf-8-sig", errors="replace") as fh:
                        for ln in fh.read().splitlines():
                            if ln.strip():
                                env["PATH"] = ln.strip() + os.pathsep + env["PATH"]
                except OSError:
                    pass
                try:
                    if os.path.getsize(files["summary"]):
                        with open(files["summary"], encoding="utf-8", errors="replace") as fh:
                            rec.setdefault("summary", []).append({"job": job["key"], "step": st["name"], "text": fh.read()[:20000]})
                except OSError:
                    pass
                st["code"], st["ended"] = code, time.time()
                if stop.is_set():
                    st["state"] = "stopped"
                elif code == 0:
                    st["state"] = "ok"
                    log("\u2713 %s, in %s" % (st["name"], _runs_took(time.time() - t0)))
                else:
                    st["state"] = "bad"
                    log("\u2717 %s: it ended with code %s after %s" % (st["name"], code, _runs_took(time.time() - t0)))
                    if not st.get("continue"):
                        ok_job = False
                _runs_write(rec)
            job["ended"] = time.time()
            job["state"] = "stopped" if stop.is_set() else ("ok" if ok_job else "bad")
            if not ok_job:
                failed.add(job["key"])
            log("")
            log({"ok": "\u2713 Done in ", "bad": "\u2717 Failed after ", "stopped": "Stopped after "}[job["state"]] + _runs_took(job["ended"] - job["started"]))
            _runs_write(rec)
        except Exception as e:
            log("This job could not run: %s" % e)
            job["state"] = "bad"
            failed.add(job["key"])
            _runs_write(rec)
        finally:
            lf.close()
    rec["ended"] = time.time()
    states = [j["state"] for j in rec["jobs"]]
    rec["state"] = "stopped" if stop.is_set() else ("bad" if "bad" in states else ("ok" if "ok" in states else "skipped"))
    _runs_write(rec)
    for x in (src, work, temp):
        shutil.rmtree(x, ignore_errors=True)


def _runs_said(text, outs, env=None):
    """the marks the page left where a value is known only as the run goes: \x01so:<step id>:<name>\x01 for
    ${{ steps.<step id>.outputs.<name> }} (what that step wrote to GITHUB_OUTPUT), and \x01env:<NAME>\x01 for ${{ env.<NAME> }},
    ${{ github.workspace }} and ${{ runner.temp }} (as the step's environment holds them, GITHUB_ENV's values included)"""
    text = str(text or "")
    if "\x01" not in text:
        return text
    text = re.sub("\x01so:([^:\x01]*):([^\x01]*)\x01", lambda m: str((outs.get(m.group(1)) or {}).get(m.group(2), "")), text)
    return re.sub("\x01env:([^\x01]*)\x01", lambda m: str((env or {}).get(m.group(1), "")), text)


def _runs_fetch(d, work, st, log):
    """files an earlier job kept (actions/download-artifact): copied into the folder, as they were kept"""
    name = _runs_safe(st.get("art") or "", 120)
    names = [name] if st.get("art") else sorted(os.listdir(os.path.join(d, "files"))) if os.path.isdir(os.path.join(d, "files")) else []
    n = 0
    for nm in names:
        src = os.path.join(d, "files", nm)
        if not os.path.isdir(src):
            log("  nothing kept as %s in this run" % nm)
            continue
        into = _runs_inside(work, st["into"]) if st.get("into") else work
        if not st.get("art") and len(names) > 1:
            into = os.path.join(into, nm)
        for r0, _, fs in os.walk(src):
            for f0 in fs:
                f = os.path.join(r0, f0)
                to = os.path.join(into, os.path.relpath(f, src))
                os.makedirs(os.path.dirname(to), exist_ok=True)
                shutil.copy2(f, to)
                n += 1
        log("  %s: its files put in %s" % (nm, os.path.relpath(into, work) if into != work else "the folder"))
    return n


def _runs_arch():
    import platform as _pl
    return "ARM64" if (_pl.machine() or "").lower() in ("arm64", "aarch64") else "X64"


def _runs_took(sec):
    sec = max(0, int(round(sec)))
    return ("%d min %02d s" % (sec // 60, sec % 60)) if sec >= 60 else ("%d s" % sec)


def _runs_pump(proc, log):
    try:
        for raw in iter(proc.stdout.readline, b""):
            log(raw.decode("utf-8", "replace").rstrip("\r\n"))
    except Exception:
        pass


def _runs_keep(d, work, st, log):
    """files a step names (paths, globs with **), kept with the run under files/<name>/, as they were in the work folder"""
    import glob as _glob
    name = _runs_safe(st.get("art") or "files", 120)
    dest = os.path.join(d, "files", name)
    got, total, seen = [], 0, set()
    for pat in st.get("paths") or []:
        pat = pat.strip().replace("\\", "/")
        if not pat or pat.startswith("!"):
            continue
        full = os.path.join(work, pat) if not os.path.isabs(pat) else pat
        hits = _glob.glob(full, recursive=True)
        for h in hits:
            hs = [h] if os.path.isfile(h) else [os.path.join(r0, f0) for r0, _, fs in os.walk(h) for f0 in fs]
            for f in hs:
                if os.path.abspath(f) in seen:
                    continue
                seen.add(os.path.abspath(f))
                rel = os.path.relpath(f, work if os.path.abspath(f).startswith(os.path.abspath(work)) else os.path.dirname(f))
                to = os.path.join(dest, rel)
                os.makedirs(os.path.dirname(to), exist_ok=True)
                shutil.copy2(f, to)
                sz = os.path.getsize(to)
                got.append({"path": rel.replace("\\", "/"), "size": sz})
                total += sz
    log("  %d file%s kept with this run as %s (%s)" % (len(got), "" if len(got) == 1 else "s", name, _runs_size(total)) if got else "  nothing matched " + ", ".join(st.get("paths") or []))
    return {"name": name, "files": got[:2000], "size": total}


def _runs_size(n):
    for u in ("bytes", "KB", "MB", "GB"):
        if n < 1024 or u == "GB":
            return ("%d %s" % (n, u)) if u == "bytes" else ("%.1f %s" % (n, u))
        n /= 1024.0


def _runs_go(rid):
    rid = _runs_safe(rid)
    with _RUNS["lock"]:
        if any(x.get("thread") and x["thread"].is_alive() for x in _RUNS["live"].values()):
            return {"ok": False, "error": "a run is going on this computer: it runs one at a time"}
        live = {"stop": threading.Event(), "proc": None}
        t = threading.Thread(target=_runs_guard, args=(rid,), daemon=True)
        live["thread"] = t
        _RUNS["live"][rid] = live
        t.start()
    return {"ok": True, "id": rid}


def _runs_guard(rid):
    try:
        _runs_worker(rid)
    except Exception:
        log_problem("runs: a run stopped", sys.exc_info())
        try:
            rec = _runs_read(rid)
            rec["state"], rec["ended"] = "bad", time.time()
            _runs_write(rec)
        except Exception:
            pass


def _runs_stop(rid):
    live = _RUNS["live"].get(_runs_safe(rid))
    if not live:
        return {"ok": False, "error": "this run is not going"}
    live["stop"].set()
    _runs_kill(live.get("proc"))
    return {"ok": True}


def _runs_list():
    out = []
    try:
        base = _runs_dir()
        for n in sorted(os.listdir(base), reverse=True)[:400]:
            f = os.path.join(base, n, "run.json")
            if not os.path.isfile(f):
                continue
            try:
                with open(f, encoding="utf-8") as fh:
                    r = json.load(fh)
            except Exception:
                continue
            if r.get("state") == "running" and n not in _RUNS["live"]:
                r["state"] = "stopped"   # the app closed while it ran
            row = {k: r.get(k) for k in ("id", "at", "state", "app", "repo", "version", "label", "workflow", "file", "why", "machine", "ended", "started", "n", "event")}
            row["jobs"] = [{"key": j["key"], "name": j["name"], "state": j["state"], "started": j.get("started"), "ended": j.get("ended")} for j in r.get("jobs") or []]
            row["files"] = sum(len(a.get("files") or []) for a in r.get("artifacts") or [])
            out.append(row)
    except Exception as e:
        return {"ok": False, "error": str(e), "runs": out}
    return {"ok": True, "runs": out, "here": _runs_os()}


def _runs_get(rid):
    try:
        r = _runs_read(_runs_safe(rid))
        if r.get("state") == "running" and _runs_safe(rid) not in _RUNS["live"]:
            r["state"] = "stopped"
        return {"ok": True, "run": r}
    except Exception as e:
        return {"ok": False, "error": str(e)}


def _runs_log(rid, job, offset=0):
    try:
        f = os.path.join(_runs_dir(), _runs_safe(rid), "logs", _runs_safe(job, 60) + ".log")
        if not os.path.isfile(f):
            return {"ok": True, "text": "", "offset": 0, "size": 0}
        size = os.path.getsize(f)
        offset = max(0, min(int(offset or 0), size))
        with open(f, "rb") as fh:
            fh.seek(offset)
            b = fh.read(262144)
        return {"ok": True, "text": b.decode("utf-8", "replace"), "offset": offset + len(b), "size": size}
    except Exception as e:
        return {"ok": False, "error": str(e)}


def _runs_file(rid, art, path, offset=0, size=4194304):
    """a part of a file a run kept, to save it or to add it to a release"""
    try:
        base = os.path.join(_runs_dir(), _runs_safe(rid), "files", _runs_safe(art, 120))
        f = _runs_inside(base, path)
        total = os.path.getsize(f)
        offset = max(0, min(int(offset or 0), total))
        with open(f, "rb") as fh:
            fh.seek(offset)
            b = fh.read(max(1, min(int(size or 4194304), 16777216)))
        return {"ok": True, "b64": base64.b64encode(b).decode("ascii"), "offset": offset + len(b), "size": total}
    except Exception as e:
        return {"ok": False, "error": str(e)}


def _runs_open_folder(path):
    if sys.platform == "darwin":
        subprocess.Popen(["/usr/bin/open", path])
    elif sys.platform.startswith("win"):
        subprocess.Popen(["explorer", os.path.normpath(path)])
    else:
        subprocess.Popen(["xdg-open", path])


def _runs_reveal(rid, what=""):
    try:
        d = os.path.join(_runs_dir(), _runs_safe(rid))
        target = os.path.join(d, "files", _runs_safe(what, 120)) if what else d
        if not os.path.isdir(target):
            target = d
        _runs_open_folder(target)
        return {"ok": True, "path": target}
    except Exception as e:
        return {"ok": False, "error": str(e)}


def _runs_forget(rid):
    rid = _runs_safe(rid)
    live = _RUNS["live"].get(rid)
    if live and live.get("thread") and live["thread"].is_alive():
        return {"ok": False, "error": "it is still going: stop it first"}
    try:
        shutil.rmtree(os.path.join(_runs_dir(), rid))
        _RUNS["live"].pop(rid, None)
        return {"ok": True}
    except Exception as e:
        return {"ok": False, "error": str(e)}


# ---- installing what Fabrica made, on this computer ----
def _runs_install_begin(name, size=0):
    tok = hashlib.sha1(os.urandom(12)).hexdigest()[:16]
    d = os.path.join(_runs_dir(), "_install", tok)
    os.makedirs(d, exist_ok=True)
    f = os.path.join(d, _runs_safe(name, 120) or "package.zip")
    open(f, "wb").close()
    _RUNS["inst"][tok] = {"file": f, "dir": d, "size": int(size or 0)}
    return {"ok": True, "token": tok}


def _runs_install_put(tok, b64):
    x = _RUNS["inst"].get(str(tok))
    if not x:
        return {"ok": False, "error": "this install was not begun"}
    with open(x["file"], "ab") as fh:
        fh.write(base64.b64decode(b64 or ""))
    return {"ok": True, "have": os.path.getsize(x["file"])}


def _runs_install_go(tok, info):
    x = _RUNS["inst"].pop(str(tok), None)
    if not x:
        return {"ok": False, "error": "this install was not begun"}
    info = info or {}
    try:
        if x["size"] and os.path.getsize(x["file"]) != x["size"]:
            return {"ok": False, "error": "the package came through incomplete (%d of %d bytes)" % (os.path.getsize(x["file"]), x["size"])}
        if sys.platform == "darwin":
            return _runs_install_mac(x, info)
        if sys.platform.startswith("win"):
            return _runs_install_win(x, info)
        return {"ok": False, "error": "installing an app is for a Mac or a Windows PC"}
    except Exception as e:
        log_problem("runs: an install did not finish", sys.exc_info())
        return {"ok": False, "error": str(e)}
    finally:
        shutil.rmtree(x["dir"], ignore_errors=True)


def _runs_unzip(zf, dest):
    if sys.platform == "darwin" and os.path.isfile("/usr/bin/ditto"):
        r = subprocess.run(["/usr/bin/ditto", "-x", "-k", zf, dest], capture_output=True, text=True, timeout=600)
        if r.returncode != 0:
            raise RuntimeError("the package could not be opened: " + (r.stderr or r.stdout).strip()[:300])
        return
    import zipfile
    with zipfile.ZipFile(zf) as z:
        for m in z.infolist():
            to = _runs_inside(dest, m.filename.rstrip("/")) if m.filename.rstrip("/") else dest
            if m.is_dir():
                os.makedirs(to, exist_ok=True)
                continue
            os.makedirs(os.path.dirname(to), exist_ok=True)
            with z.open(m) as src, open(to, "wb") as out:
                shutil.copyfileobj(src, out)
            mode = (m.external_attr >> 16) & 0o777
            if mode and not sys.platform.startswith("win"):
                os.chmod(to, mode)


def _runs_install_mac(x, info):
    """a Mac app Fabrica made (a zip holding Name.app), into Applications, or the person's own Applications folder when that cannot be
    written; a copy there already is replaced; then it is opened. Made on this Mac, it carries no quarantine, so it opens as it is."""
    out = os.path.join(x["dir"], "out")
    os.makedirs(out, exist_ok=True)
    _runs_unzip(x["file"], out)
    apps = [n for n in os.listdir(out) if n.endswith(".app") and os.path.isdir(os.path.join(out, n))]
    if not apps:
        return {"ok": False, "error": "there is no Mac app in this package"}
    name = apps[0]
    where = str(info.get("where") or "")
    places = [os.path.expanduser("~/Applications")] if where == "mine" else ["/Applications", os.path.expanduser("~/Applications")]
    last = None
    for base in places:
        try:
            os.makedirs(base, exist_ok=True)
            to = os.path.join(base, name)
            if os.path.exists(to):
                old = to + ".ingenium-old"
                shutil.rmtree(old, ignore_errors=True)
                os.rename(to, old)
                shutil.move(os.path.join(out, name), to)
                shutil.rmtree(old, ignore_errors=True)
            else:
                shutil.move(os.path.join(out, name), to)
            if info.get("open", True) and not info.get("test"):
                subprocess.Popen(["/usr/bin/open", to])
            return {"ok": True, "path": to, "where": "Applications" if base == "/Applications" else "your own Applications folder"}
        except OSError as e:
            last = e
            continue
    return {"ok": False, "error": "it could not be put in Applications: %s" % last}


def _runs_ps(cmd, timeout=60):
    exe = shutil.which("powershell") or "powershell"
    r = subprocess.run([exe, "-NoProfile", "-NonInteractive", "-ExecutionPolicy", "Bypass", "-Command", cmd], capture_output=True, text=True, timeout=timeout, **_runs_quiet())
    return r.returncode, (r.stdout or "").strip(), (r.stderr or "").strip()


def _runs_install_win(x, info):
    """a Windows app Fabrica made (a zip holding Name.exe), installed for the person alone, with no administrator password: the program in
    %LOCALAPPDATA%\\Programs\\Name, a shortcut in the Start menu and one on the desktop, and an entry in Settings, Apps (HKCU) whose
    Uninstall takes it all away again (uninstall.cmd beside the program). Its work, kept by the app under its own id, stays."""
    import winreg
    out = os.path.join(x["dir"], "out")
    os.makedirs(out, exist_ok=True)
    _runs_unzip(x["file"], out)
    exes = [n for n in os.listdir(out) if n.lower().endswith(".exe")]
    if not exes:
        return {"ok": False, "error": "there is no Windows program in this package"}
    exe = exes[0]
    title = (str(info.get("title") or "") or exe[:-4]).strip()[:60]
    safe = re.sub(r'[<>:"/\\|?*\x00-\x1f]+', " ", title).strip(" .") or exe[:-4]
    appid = re.sub(r"[^A-Za-z0-9._-]+", "_", str(info.get("id") or safe))[:100]
    la = os.environ.get("LOCALAPPDATA") or os.path.expanduser(r"~\AppData\Local")
    home = os.path.join(la, "Programs", safe)
    os.makedirs(home, exist_ok=True)
    target = os.path.join(home, exe)
    subprocess.run(["taskkill", "/im", os.path.basename(target), "/f"], capture_output=True, **_runs_quiet())
    shutil.copy2(os.path.join(out, exe), target)
    code, desk, err = _runs_ps("[Environment]::GetFolderPath('Desktop')")
    code2, progs, err2 = _runs_ps("[Environment]::GetFolderPath('Programs')")
    links = []
    for folder in (progs, desk):
        if not folder:
            continue
        lnk = os.path.join(folder, safe + ".lnk")
        q = lambda v: v.replace("'", "''")
        c, o, e = _runs_ps("$s=(New-Object -ComObject WScript.Shell).CreateShortcut('%s');$s.TargetPath='%s';$s.WorkingDirectory='%s';$s.IconLocation='%s,0';$s.Description='%s';$s.Save()"
                           % (q(lnk), q(target), q(home), q(target), q(title)))
        if c == 0 and os.path.isfile(lnk):
            links.append(lnk)
    key = r"Software\Microsoft\Windows\CurrentVersion\Uninstall\%s" % appid
    un = os.path.join(home, "uninstall.cmd")
    lines = ["@echo off", "rem Takes away %s, which Ingenium's Fabrica installed" % title,
             'if not "%~1"=="--from-temp" (copy /y "%~f0" "%TEMP%\\' + appid + '-uninstall.cmd" >nul & start "" /min cmd /c ""%TEMP%\\' + appid + '-uninstall.cmd" --from-temp" & exit /b)',
             "ping -n 2 127.0.0.1 >nul", 'taskkill /im "%s" /f >nul 2>&1' % os.path.basename(target)]
    lines += ['del /q "%s" >nul 2>&1' % l for l in links]
    lines += ['reg delete "HKCU\\%s" /f >nul 2>&1' % key, 'rmdir /s /q "%s"' % home, '(goto) 2>nul & del "%~f0"']
    with open(un, "w", encoding="utf-8", newline="\r\n") as fh:
        fh.write("\n".join(lines) + "\n")
    size_kb = 0
    for r0, _, fs in os.walk(home):
        for f0 in fs:
            try:
                size_kb += os.path.getsize(os.path.join(r0, f0)) // 1024
            except OSError:
                pass
    with winreg.CreateKey(winreg.HKEY_CURRENT_USER, key) as k:
        for name, val in (("DisplayName", title), ("DisplayVersion", str(info.get("version") or "")), ("Publisher", str(info.get("publisher") or "")),
                          ("DisplayIcon", target + ",0"), ("InstallLocation", home), ("UninstallString", 'cmd.exe /c "%s"' % un),
                          ("QuietUninstallString", 'cmd.exe /c "%s"' % un), ("InstallDate", time.strftime("%Y%m%d"))):
            if val:
                winreg.SetValueEx(k, name, 0, winreg.REG_SZ, val)
        for name, val in (("NoModify", 1), ("NoRepair", 1), ("EstimatedSize", int(size_kb))):
            winreg.SetValueEx(k, name, 0, winreg.REG_DWORD, val)
    if info.get("open", True) and not info.get("test"):
        subprocess.Popen([target], cwd=home)
    return {"ok": True, "path": target, "where": "your programs folder, the Start menu and the desktop", "links": links, "key": key, "uninstall": un}


def _selftest_runs():
    """a run of two jobs on this computer (a step that writes, a step that keeps a file, a step that fails on purpose and one after it
    that is skipped), read back as the page reads it; then, on a Mac or a Windows PC, a tiny app installed and taken away again"""
    try:
        win = sys.platform.startswith("win")
        say = "Write-Output 'hello from the run'; Set-Content -Path made.txt -Value 'made'; Add-Content -Path $env:GITHUB_ENV -Value 'FROM_STEP=yes'" if win else \
              "echo hello from the run; echo made > made.txt; echo FROM_STEP=yes >> \"$GITHUB_ENV\""
        check = "if ($env:FROM_STEP -ne 'yes') { exit 3 }" if win else '[ "$FROM_STEP" = "yes" ]'
        spec = {"app": "Selftest", "workflow": "Selftest", "jobs": [
            {"key": "one", "name": "One", "steps": [{"name": "Say and make", "kind": "run", "run": say}, {"name": "Read what the step before set", "kind": "run", "run": check},
                                                     {"name": "Keep it", "kind": "artifact", "art": "made", "paths": ["made.txt"]}]},
            {"key": "two", "name": "Two", "steps": [{"name": "Fail on purpose", "kind": "run", "run": "exit 5"}, {"name": "Never reached", "kind": "run", "run": "exit 0"}]}]}
        r = _runs_new(spec)
        if not r.get("ok"):
            return {"ok": False, "error": "runs_new: %s" % r.get("error")}
        rid = r["id"]
        _runs_go(rid)
        t = time.time() + 90
        while time.time() < t:
            g = _runs_get(rid)
            if g.get("ok") and g["run"]["state"] not in ("ready", "running"):
                break
            time.sleep(0.3)
        run = _runs_get(rid)["run"]
        j1, j2 = run["jobs"]
        lg = _runs_log(rid, "one")["text"]
        res = {"state": run["state"], "one": j1["state"], "two": j2["state"], "steps2": [s0["state"] for s0 in j2["steps"]],
               "kept": [a["name"] for a in run["artifacts"]], "said": "hello from the run" in lg}
        good = run["state"] == "bad" and j1["state"] == "ok" and j2["state"] == "bad" and res["steps2"] == ["bad", "skipped"] and res["kept"] == ["made"] and res["said"]
        _runs_forget(rid)
        tools = _runs_tools(True)
        res["tools"] = {t0["key"]: t0["ok"] for t0 in tools.get("tools") or []}
        if good and (win or sys.platform == "darwin"):
            # recorded with the result, not yet required: 7.08 is the first release that installs an app on this computer, and the
            # build's summary says what it did on GitHub's own Mac and Windows machines
            res["install"] = _selftest_install()
        return {"ok": bool(good), "runs": res}
    except Exception as e:
        return {"ok": False, "error": str(e)}


def _selftest_install():
    import zipfile
    tmp = os.path.join(_runs_dir(), "_selftest")
    shutil.rmtree(tmp, ignore_errors=True)
    os.makedirs(tmp, exist_ok=True)
    zf = os.path.join(tmp, "pkg.zip")
    try:
        with zipfile.ZipFile(zf, "w") as z:
            if sys.platform.startswith("win"):
                src = os.path.join(os.environ.get("SystemRoot") or r"C:\Windows", "System32", "where.exe")
                z.write(src, "Ingenium Selftest App.exe")
            else:
                z.writestr("Ingenium Selftest App.app/Contents/Info.plist", "<?xml version=\"1.0\"?><plist version=\"1.0\"><dict><key>CFBundleName</key><string>Ingenium Selftest App</string></dict></plist>")
                z.writestr("Ingenium Selftest App.app/Contents/MacOS/run", "#!/bin/sh\nexit 0\n")
        size = os.path.getsize(zf)
        b = _runs_install_begin("pkg.zip", size)
        with open(zf, "rb") as fh:
            _runs_install_put(b["token"], base64.b64encode(fh.read()).decode())
        info = {"title": "Ingenium Selftest App", "id": "com.ingenium.selftest.app", "version": "1.0", "where": "mine", "test": True}
        r = _runs_install_go(b["token"], info)
        if not r.get("ok"):
            return {"ok": False, "error": r.get("error")}
        if sys.platform == "darwin":
            ok = os.path.isfile(os.path.join(r["path"], "Contents", "Info.plist"))
            shutil.rmtree(r["path"], ignore_errors=True)
            return {"ok": ok, "path": r["path"]}
        import winreg
        found = {"exe": os.path.isfile(r["path"]), "links": [os.path.isfile(l) for l in r.get("links") or []], "key": False}
        try:
            with winreg.OpenKey(winreg.HKEY_CURRENT_USER, r["key"]) as k:
                found["key"] = winreg.QueryValueEx(k, "DisplayName")[0] == "Ingenium Selftest App"
        except OSError:
            pass
        subprocess.run(["cmd.exe", "/c", r["uninstall"]], capture_output=True, timeout=60, **_runs_quiet())
        t = time.time() + 30
        while time.time() < t and os.path.exists(os.path.dirname(r["path"])):
            time.sleep(0.5)
        gone = {"dir": not os.path.exists(os.path.dirname(r["path"])), "links": [not os.path.exists(l) for l in r.get("links") or []], "key": True}
        try:
            winreg.OpenKey(winreg.HKEY_CURRENT_USER, r["key"]).Close()
            gone["key"] = False
        except OSError:
            pass
        ok = found["exe"] and found["key"] and all(found["links"]) and gone["dir"] and gone["key"] and all(gone["links"])
        return {"ok": ok, "found": found, "gone": gone}
    finally:
        shutil.rmtree(tmp, ignore_errors=True)


'''

rep('''def _start_local_server(directory, html_name=None):''', FN + '''def _start_local_server(directory, html_name=None):''')
rep('''    def disk_sizes(self, rid, oids):
''', '''    # 7.08: Fabrica's runs on this computer, its tools, and installing what Fabrica made (app_runs_708.py)
    def runs_tools(self, fresh=False):
        return _runs_tools(bool(fresh))

    def runs_new(self, spec):
        return _runs_new(spec)

    def runs_put(self, rid, path, b64, mode=None, append=False):
        return _runs_put(rid, path, b64, mode, bool(append))

    def runs_file(self, rid, art, path, offset=0, size=4194304):
        return _runs_file(rid, art, path, offset, size)

    def runs_go(self, rid):
        return _runs_go(rid)

    def runs_stop(self, rid):
        return _runs_stop(rid)

    def runs_list(self):
        return _runs_list()

    def runs_get(self, rid):
        return _runs_get(rid)

    def runs_log(self, rid, job, offset=0):
        return _runs_log(rid, job, offset)

    def runs_reveal(self, rid, what=""):
        return _runs_reveal(rid, what)

    def runs_forget(self, rid):
        return _runs_forget(rid)

    def runs_install_begin(self, name, size=0):
        return _runs_install_begin(name, size)

    def runs_install_put(self, tok, b64):
        return _runs_install_put(tok, b64)

    def runs_install_go(self, tok, info=None):
        return _runs_install_go(tok, info or {})

    def disk_sizes(self, rid, oids):
''', 2)
rep('''        # 6.88: Fabrica's second copy: the objects of a repository found to copy (app_copy_688.py)
        if res["ok"] and "--selftest-hub" in argv:''', '''        # 7.08: Fabrica's runs on this computer, and installing what it made (app_runs_708.py)
        if res["ok"] and "--selftest-hub" in argv:
            res["runs"] = _selftest_runs()
            if not res["runs"].get("ok"):
                res["ok"] = False
                res["error"] = "Fabrica's runs: %s" % (res["runs"].get("error") or json.dumps(res["runs"].get("runs"))[:600])
        # 6.88: Fabrica's second copy: the objects of a repository found to copy (app_copy_688.py)
        if res["ok"] and "--selftest-hub" in argv:''')
open(p, "w", encoding="utf-8").write(s)
print("patched", p)
