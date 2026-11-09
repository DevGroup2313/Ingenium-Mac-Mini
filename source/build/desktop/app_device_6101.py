"""Ingenium 6.10.1 (3 November 2026): the computer's own sign-in as a way back into Ingenium (patch for ingenium_app.py, Mac and
Windows; applied after app_claude_610.py).

Her answer (3 November 2026): "Yes, my computer's own sign in (Touch ID or Windows Hello) also open Ingenium." The page keeps the
data key wrapped with a device key (modules/r197.js, the "device" way back in); the device key itself never leaves this computer's
own protection, and is handed to the page only after the computer has confirmed it is her:
  on a Mac      tools/IngeniumKey.swift, built into Contents/MacOS/IngeniumKey: Touch ID, or the Mac's own password
                (LocalAuthentication), then the key from the login keychain;
  on Windows    Windows Hello (Windows.Security.Credentials.UI.UserConsentVerifier, through Windows PowerShell), then the key from
                a file in the app's own folder, sealed for this Windows account with DPAPI (CryptProtectData, with Ingenium's own
                entropy, no prompt).
Four calls for the page:
  device_unlock_info()                    what this computer can ask (Touch ID, the Mac's password, Windows Hello), or nothing
  device_key_make(name, reason)           confirmed first; then a new random key of 256 bits is kept, and returned
  device_key_get(name, reason)            confirmed first; then the key is returned
  device_key_drop(name)                   the key is removed
A name is 4 to 64 letters, digits, hyphens or underscores (the page makes it); nothing else is accepted.

    python3 build/desktop/app_device_6101.py <repo>/ingenium_app.py"""
import sys

MARK = "_device_unlock_info"

CODE = r'''

# ---- 6.10.1: the computer's own sign-in as a way back into Ingenium (app_device_6101.py) ----
_DEV_ENTROPY = b"Ingenium device key v1"
_HELLO_PS = r"""
$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.Runtime.WindowsRuntime
$null = [Windows.Security.Credentials.UI.UserConsentVerifier,Windows.Security.Credentials.UI,ContentType=WindowsRuntime]
$null = [Windows.Security.Credentials.UI.UserConsentVerificationResult,Windows.Security.Credentials.UI,ContentType=WindowsRuntime]
$null = [Windows.Security.Credentials.UI.UserConsentVerifierAvailability,Windows.Security.Credentials.UI,ContentType=WindowsRuntime]
$asTask = ([System.WindowsRuntimeSystemExtensions].GetMethods() | Where-Object { $_.Name -eq 'AsTask' -and $_.GetParameters().Count -eq 1 -and $_.GetParameters()[0].ParameterType.Name -eq 'IAsyncOperation`1' })[0]
function Await($op, [Type]$t) { $task = $asTask.MakeGenericMethod($t).Invoke($null, @($op)); $task.Wait(-1) | Out-Null; $task.Result }
if ('__MODE__' -eq 'check') {
  $a = Await ([Windows.Security.Credentials.UI.UserConsentVerifier]::CheckAvailabilityAsync()) ([Windows.Security.Credentials.UI.UserConsentVerifierAvailability])
  Write-Output ('AVAIL:' + $a)
} else {
  $r = Await ([Windows.Security.Credentials.UI.UserConsentVerifier]::RequestVerificationAsync('__REASON__')) ([Windows.Security.Credentials.UI.UserConsentVerificationResult])
  Write-Output ('RESULT:' + $r)
}
"""


def _dev_name(name):
    name = str(name or "")
    return name if re.match(r"^[A-Za-z0-9_-]{4,64}$", name) else None


def _dev_reason(reason):
    r = re.sub(r"[^A-Za-z0-9 ,.:;()?!’-]", " ", str(reason or "open Ingenium"))
    return re.sub(r"\s+", " ", r).strip()[:140] or "open Ingenium"


# -- on a Mac: the helper built from tools/IngeniumKey.swift, beside the app's own program --
def _dev_mac_helper():
    exe_dir = os.path.dirname(os.path.abspath(sys.executable))
    for base in (exe_dir, getattr(sys, "_MEIPASS", None)):
        if base:
            p = os.path.join(base, "IngeniumKey")
            if os.path.isfile(p) and os.access(p, os.X_OK):
                return p
    return None


def _dev_mac(args, timeout=180):
    h = _dev_mac_helper()
    if not h:
        return {"ok": False, "error": "This copy of the app was built without the Touch ID helper.", "nohelper": True}
    try:
        r = subprocess.run([h] + list(args), capture_output=True, text=True, timeout=timeout)
        lines = [x for x in (r.stdout or "").strip().splitlines() if x.strip().startswith("{")]
        if not lines:
            return {"ok": False, "error": ((r.stderr or "").strip() or "The Touch ID helper gave no answer.")[:240]}
        return json.loads(lines[-1])
    except subprocess.TimeoutExpired:
        return {"ok": False, "error": "The Mac did not answer in time.", "cancelled": True}
    except Exception as e:
        return {"ok": False, "error": str(e)[:240]}


# -- on Windows: Windows Hello through Windows PowerShell, and the key sealed with DPAPI in the app's own folder --
def _dev_win_hello(mode, reason=""):
    script = _HELLO_PS.replace("__MODE__", "check" if mode == "check" else "verify").replace("__REASON__", _dev_reason(reason).replace("'", "’"))
    r = subprocess.run(["powershell", "-NoProfile", "-STA", "-ExecutionPolicy", "Bypass", "-Command", script],
                       capture_output=True, text=True, timeout=180, creationflags=0x08000000)
    return (r.stdout or "") + "\n" + (r.stderr or "")


def _dev_dpapi(data, protect):
    import ctypes
    from ctypes import wintypes

    class _BLOB(ctypes.Structure):
        _fields_ = [("cbData", wintypes.DWORD), ("pbData", ctypes.POINTER(ctypes.c_char))]

    def blob(b):
        buf = ctypes.create_string_buffer(b, len(b))
        return _BLOB(len(b), ctypes.cast(buf, ctypes.POINTER(ctypes.c_char))), buf

    crypt32, kernel32 = ctypes.windll.crypt32, ctypes.windll.kernel32
    inp, _k1 = blob(data)
    ent, _k2 = blob(_DEV_ENTROPY)
    out = _BLOB()
    if protect:
        crypt32.CryptProtectData.argtypes = [ctypes.POINTER(_BLOB), wintypes.LPCWSTR, ctypes.POINTER(_BLOB), ctypes.c_void_p, ctypes.c_void_p, wintypes.DWORD, ctypes.POINTER(_BLOB)]
        ok = crypt32.CryptProtectData(ctypes.byref(inp), "Ingenium device key", ctypes.byref(ent), None, None, 0x01, ctypes.byref(out))
    else:
        crypt32.CryptUnprotectData.argtypes = [ctypes.POINTER(_BLOB), ctypes.c_void_p, ctypes.POINTER(_BLOB), ctypes.c_void_p, ctypes.c_void_p, wintypes.DWORD, ctypes.POINTER(_BLOB)]
        ok = crypt32.CryptUnprotectData(ctypes.byref(inp), None, ctypes.byref(ent), None, None, 0x01, ctypes.byref(out))
    if not ok:
        raise OSError("Windows could not seal or open the key.")
    try:
        return ctypes.string_at(out.pbData, out.cbData)
    finally:
        kernel32.LocalFree(out.pbData)


def _dev_win_file(name):
    return os.path.join(str(_rag_app_dir()), "device-keys", name + ".key")


def _dev_win_verify(reason):
    out = _dev_win_hello("verify", reason)
    if "RESULT:Verified" in out:
        return None
    if "RESULT:Canceled" in out:
        return {"ok": False, "error": "Windows Hello was cancelled.", "cancelled": True}
    if "RESULT:" in out:
        return {"ok": False, "error": "Windows Hello did not confirm it is you (" + out.split("RESULT:", 1)[1].split()[0] + ")."}
    return {"ok": False, "error": "Windows Hello could not be asked on this computer."}


def _device_unlock_info():
    try:
        if sys.platform == "darwin":
            r = _dev_mac(["info"], 30)
            return r if r.get("ok") else {"ok": True, "kind": "none", "label": "", "why": r.get("error", "")}
        if sys.platform.startswith("win"):
            out = _dev_win_hello("check")
            if "AVAIL:Available" in out:
                return {"ok": True, "kind": "hello", "label": "Windows Hello"}
            return {"ok": True, "kind": "none", "label": "", "why": "Windows Hello is not set up on this computer (Settings, Accounts, Sign-in options)."}
        return {"ok": True, "kind": "none", "label": "", "why": "Not on this kind of computer."}
    except Exception:
        log_problem("device_unlock_info failed", sys.exc_info())
        return {"ok": True, "kind": "none", "label": "", "why": "This computer could not be asked."}


def _device_key_make(name, reason=""):
    name = _dev_name(name)
    if not name:
        return {"ok": False, "error": "That is not the name of a key."}
    try:
        if sys.platform == "darwin":
            return _dev_mac(["make", name, _dev_reason(reason)])
        if sys.platform.startswith("win"):
            no = _dev_win_verify(reason)
            if no:
                return no
            key = os.urandom(32)
            sealed = _dev_dpapi(key, True)
            path = _dev_win_file(name)
            os.makedirs(os.path.dirname(path), exist_ok=True)
            tmp = path + ".part"
            with open(tmp, "wb") as fh:
                fh.write(sealed)
            os.replace(tmp, path)
            return {"ok": True, "key": base64.b64encode(key).decode("ascii")}
        return {"ok": False, "error": "Not on this kind of computer."}
    except Exception:
        log_problem("device_key_make failed", sys.exc_info())
        return {"ok": False, "error": "The key could not be kept on this computer."}


def _device_key_get(name, reason=""):
    name = _dev_name(name)
    if not name:
        return {"ok": False, "error": "That is not the name of a key."}
    try:
        if sys.platform == "darwin":
            return _dev_mac(["get", name, _dev_reason(reason)])
        if sys.platform.startswith("win"):
            path = _dev_win_file(name)
            if not os.path.isfile(path):
                return {"ok": False, "error": "This computer holds no key for this copy of Ingenium.", "missing": True}
            no = _dev_win_verify(reason)
            if no:
                return no
            with open(path, "rb") as fh:
                key = _dev_dpapi(fh.read(), False)
            if len(key) != 32:
                return {"ok": False, "error": "The key kept on this computer is not whole."}
            return {"ok": True, "key": base64.b64encode(key).decode("ascii")}
        return {"ok": False, "error": "Not on this kind of computer."}
    except Exception:
        log_problem("device_key_get failed", sys.exc_info())
        return {"ok": False, "error": "The key could not be read on this computer."}


def _device_key_drop(name):
    name = _dev_name(name)
    if not name:
        return {"ok": False, "error": "That is not the name of a key."}
    try:
        if sys.platform == "darwin":
            return _dev_mac(["drop", name], 30)
        if sys.platform.startswith("win"):
            path = _dev_win_file(name)
            if os.path.isfile(path):
                os.remove(path)
            return {"ok": True}
        return {"ok": True}
    except Exception:
        log_problem("device_key_drop failed", sys.exc_info())
        return {"ok": False, "error": "The key could not be removed."}
'''

METHODS = '''
    # 6.10.1: the computer's own sign-in as a way back into Ingenium (app_device_6101.py)
    def device_unlock_info(self):
        return _device_unlock_info()

    def device_key_make(self, name, reason=""):
        return _device_key_make(name, reason)

    def device_key_get(self, name, reason=""):
        return _device_key_get(name, reason)

    def device_key_drop(self, name):
        return _device_key_drop(name)
'''

if __name__ == "__main__":
    p = sys.argv[1]
    s = open(p, encoding="utf-8").read()
    if MARK in s:
        print("already patched", p)
        sys.exit(0)

    def rep(old, new, n=1):
        global s
        c = s.count(old)
        if c != n:
            sys.exit("%s: expected %d, found %d: %r" % (p, n, c, old[:90]))
        s = s.replace(old, new)

    rep("\n\nclass IngeniumApi(_LiteWindows):", CODE + "\n\nclass IngeniumApi(_LiteWindows):")
    anchor = "        return _claude_session_read(rel, offset, length)\n"
    rep(anchor, anchor + METHODS, 2)
    open(p, "w", encoding="utf-8").write(s)
    print("patched", p)
