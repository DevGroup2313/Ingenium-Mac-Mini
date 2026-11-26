"""Ingenium 7.95: the computer and its screen stay awake while Ingenium works or lends (the page's side is modules/r256.js).

Her words (26 November 2026): "I want Ingenium to keep my device screen awake when it is running a task or a model is writing and
working on something and when the device is lending a model. I don't want the device's screen going to sleep and turning off to stop
the task and interrupt what was happening inside of Ingenium." And: "I have connected to the Mac mini many times and everytime I start
the reading on Lector it gets stopped and it never goes through."

Measured on 7.94: a computer that lent kept itself from idle sleep (caffeinate -i on the Mac, ES_SYSTEM_REQUIRED on Windows), on purpose
letting its screen turn off; the Mac app did not ask macOS to leave it out of App Nap, which slows an app whose window is out of sight,
its lending server included; and a computer that asked for work held nothing at all, because the page's own wake lock (r256) is not
offered in the Mac app's window, where its switch stood disabled.

Now one hold, for as long as any reason for it lasts: "lend" (the computer lends or keeps the Cloud: _share_keep_awake) and "work" (the
page says it is working: a reply being written, Lector, Vocatio, Blend, dictation, the Cloud, a conversion). On the Mac: caffeinate -d -i
-m (display, system and disk awake, ended with the app), and an NSProcessInfo activity (user initiated, latency critical, display kept
on) so App Nap leaves Ingenium alone while it lasts; on Windows: ES_CONTINUOUS | ES_SYSTEM_REQUIRED | ES_DISPLAY_REQUIRED. When her
switch (Keep the screen on while Ingenium works) is off, the screen may sleep but the computer does not. The page renews "work" every
minute while it works; a page that stops renewing (closed, or stuck) lets it go after three minutes. A screen she locks by hand is
never kept on: these are idle holds only.

  keep_awake(on, screen=True)   the page's side: {"ok": true, "held": bool, "reasons": [...]}
  _awake_set_795(reason, on)    the app's side; _share_keep_awake(on) now calls _awake_set_795("lend", on)

    python3 build/desktop/app_awake_795.py <repo>/ingenium_app.py"""
import sys

p = sys.argv[1]
s = open(p, encoding="utf-8").read()


def rep(old, new, n=1):
    global s
    c = s.count(old)
    if c != n:
        sys.exit("%s: expected %d, found %d: %r" % (p, n, c, old[:90]))
    s = s.replace(old, new)


if "_awake_set_795" in s:
    print("already patched", p)
    sys.exit(0)

rep('''    def load_state(self):
        return _load_state()
''', '''    def load_state(self):
        return _load_state()

    # 7.95: the computer and its screen stay awake while the page works (app_awake_795.py)
    def keep_awake(self, on, screen=True):
        return _awake_page_795(on, screen)
''', 2)

i = s.index("def _share_keep_awake(on):")
j = s.index("\ndef _share_wait_ready(", i)
rep(s[i:j], r'''_AWAKE_795 = {"lock": threading.Lock(), "reasons": {}, "screen": True, "held": None, "activity": None, "watch": None}


def _awake_hold_795(on, screen):
    """One idle hold for the whole app: the system awake, and the display too when she keeps the screen on."""
    old = _AWAKE_795["held"]
    if old is not None:
        _AWAKE_795["held"] = None
        try:
            if hasattr(old, "terminate"):
                old.terminate()
            else:
                old.set()
        except Exception:
            pass
    act = _AWAKE_795["activity"]
    if act is not None:
        _AWAKE_795["activity"] = None
        try:
            from Foundation import NSProcessInfo
            NSProcessInfo.processInfo().endActivity_(act)
        except Exception:
            pass
    if not on:
        return
    if sys.platform == "darwin":
        try:
            _AWAKE_795["held"] = subprocess.Popen(["caffeinate"] + (["-d"] if screen else []) + ["-i", "-m", "-w", str(os.getpid())],
                                                  stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
        except Exception:
            log_problem("awake: caffeinate could not start", sys.exc_info())
        try:
            # App Nap would slow an app whose window is out of sight, its lending server too: an activity keeps it out while it lasts
            from Foundation import NSProcessInfo
            opts = 0x00FFFFFF | (1 << 20) | 0xFF00000000 | ((1 << 40) if screen else 0)
            _AWAKE_795["activity"] = NSProcessInfo.processInfo().beginActivityWithOptions_reason_(
                opts, "Ingenium is working or lending its models")
        except Exception:
            log_problem("awake: the App Nap activity could not start", sys.exc_info())
    elif sys.platform.startswith("win"):
        stop = threading.Event()

        def hold():
            try:
                import ctypes
                flags = 0x80000000 | 0x00000001 | (0x00000002 if screen else 0)
                ctypes.windll.kernel32.SetThreadExecutionState(flags)
                stop.wait()
                ctypes.windll.kernel32.SetThreadExecutionState(0x80000000)
            except Exception:
                log_problem("awake: could not keep Windows awake", sys.exc_info())
        threading.Thread(target=hold, daemon=True).start()
        _AWAKE_795["held"] = stop


def _awake_set_795(reason, on, screen=None):
    with _AWAKE_795["lock"]:
        before = (bool(_AWAKE_795["reasons"]), _AWAKE_795["screen"])
        if screen is not None:
            _AWAKE_795["screen"] = bool(screen)
        if on:
            _AWAKE_795["reasons"][reason] = time.time()
        else:
            _AWAKE_795["reasons"].pop(reason, None)
        after = (bool(_AWAKE_795["reasons"]), _AWAKE_795["screen"])
        if after != before or (after[0] and _AWAKE_795["held"] is None):
            _awake_hold_795(after[0], after[1])
        if _AWAKE_795["watch"] is None:
            _AWAKE_795["watch"] = threading.Thread(target=_awake_watch_795, daemon=True)
            _AWAKE_795["watch"].start()
        return sorted(_AWAKE_795["reasons"])


def _awake_watch_795():
    """A page that stops renewing its work (closed, or stuck) lets the hold go after three minutes."""
    while True:
        time.sleep(30)
        try:
            with _AWAKE_795["lock"]:
                t = _AWAKE_795["reasons"].get("work")
            if t is not None and time.time() - t > 180:
                _awake_set_795("work", False)
        except Exception:
            pass


def _awake_page_795(on, screen=True):
    try:
        reasons = _awake_set_795("work", bool(on), bool(screen))
        return {"ok": True, "held": bool(reasons), "reasons": reasons}
    except Exception as e:
        return {"ok": False, "error": str(e)}


def _share_keep_awake(on):
    """While sharing (lending, or keeping the Cloud), the computer stays awake, and its screen too when she keeps it on (7.95)."""
    _awake_set_795("lend", bool(on))
    _SHARE["awake"] = True if on else None

''')

open(p, "w", encoding="utf-8").write(s)
print("patched", p)
