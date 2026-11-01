#!/usr/bin/env python3
"""An HTTP stand-in for the desktop app's folder bridge, for the folder search's browser tests (not shipped).

    python3 rig/rag_bridge.py [PORT] [--state DIR]          (default port 8178; --state: where the chosen folders are kept)

It runs the PATCH'S OWN FUNCTIONS: the text of CODE in build/desktop/app_rag_692.py (the very text the patch adds to
ingenium_app.py) is executed here against a few stand-ins for the app's names (log_problem, APP_FOLDER, the modules the app has
already imported, and pywebview's folder dialog, which is replaced by a queue of answers). So the rules the tests exercise,
realpath checks, the seven types, hidden entries, the limits, are the app's real ones, and rig/t_rag1_bridge.py runs the same
checks against the patched ingenium_app.py itself to show the stand-in is faithful.

The protocol is that of rig/run_app.py:
    GET  /                       -> {names, port, state}
    POST /call/<name>            body: a JSON list of arguments -> {ok: true, v: <result>} | {ok: false, e: <message>}
                                 names: rag_choose_folder rag_folders rag_forget_folder rag_list rag_read
and, for the tests only:
    POST /admin/dialog           {"answers": [path | null, ...]}   the folder dialog's next answers, in order (null: closed);
                                 with none left the dialog is closed at once
    POST /admin/state            {"dir": path | null}              keep the chosen folders in this folder (null: a new empty one)
    POST /admin/set              {"name": "_RAG_SCAN_CAP", "value": 50}   change one of the patch's limits (names _RAG_* only)
    GET  /admin/problems         -> the problems the functions wrote to the app's log, and the dialogs asked for
Every answer carries Access-Control-Allow-Origin: *, so a page on another port (the test server's) can use it; rig/rag_bridge_shim.js
is the Playwright init script that defines window.pywebview.api.rag_* over this server."""
import base64, http.server, importlib.util, json, os, pathlib, re, socketserver, sys, tempfile, threading, time, traceback, types

HERE = os.path.dirname(os.path.abspath(__file__))
PATCH = os.path.normpath(os.path.join(HERE, "..", "build", "desktop", "app_rag_692.py"))
NAMES = ["rag_choose_folder", "rag_folders", "rag_forget_folder", "rag_list", "rag_read"]
DEFAULT_PORT = 8178


def load_patch():
    spec = importlib.util.spec_from_file_location("app_rag_692", PATCH)
    mod = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(mod)
    return mod


class FakeWindow(object):
    """Stands for the app's main window: create_file_dialog answers from a queue instead of opening a dialog."""

    def __init__(self):
        self.answers = []
        self.asked = []                  # the kind of dialog asked for, each time
        self.gate = None                 # an Event: when set, the dialog waits for it (to hold a dialog open)
        self.opened = threading.Event()  # set as soon as a dialog is open

    def create_file_dialog(self, kind=None, *a, **k):
        self.asked.append(kind)
        self.opened.set()
        if self.gate is not None:
            self.gate.wait(30)
        if not self.answers:
            return ()
        got = self.answers.pop(0)
        return () if got is None else (got,)


def install_fake_webview(style="new"):
    """A webview module for `import webview` inside the app's dialog function. style "new": webview.FileDialog.FOLDER (pywebview 5),
    "old": webview.FOLDER_DIALOG. Returns the module; windows is a list the function falls back on when it is given no window."""
    m = types.ModuleType("webview")
    m.windows = []
    if style == "new":
        class FileDialog(object):
            OPEN, FOLDER, SAVE = 10, 20, 30
        m.FileDialog = FileDialog
    else:
        m.FOLDER_DIALOG = 20
    sys.modules["webview"] = m
    return m


class Bridge(object):
    """The patch's functions in a namespace of their own. state_dir: where the chosen folders are kept (a new temporary folder when None)."""

    def __init__(self, state_dir=None, webview_style="new"):
        self.patch = load_patch()
        self.problems = []
        self.window = FakeWindow()
        self.webview = install_fake_webview(webview_style)
        self.webview.windows.append(self.window)
        self.state_dir = None
        self.ns = {"__name__": "app_rag_692_code", "os": os, "sys": sys, "json": json, "pathlib": pathlib, "re": re, "base64": base64,
                   "threading": threading, "time": time, "APP_FOLDER": "Ingenium",
                   "log_problem": lambda tag, exc_info=None: self.problems.append(str(tag))}
        exec(compile(self.patch.CODE, "<app_rag_692 CODE>", "exec"), self.ns)
        self.set_state(state_dir)

    def set_state(self, state_dir=None):
        self.state_dir = state_dir or tempfile.mkdtemp(prefix="rag_state_")
        self.ns["_RAG_STATE_DIR"] = self.state_dir
        return self.state_dir

    def set_var(self, name, value):
        if not str(name).startswith("_RAG_") or name not in self.ns:
            raise ValueError("not one of the patch's settings: %r" % (name,))
        self.ns[name] = value

    def call(self, name, *args):
        """What the API classes do: rag_choose_folder gets the main window, the rest their arguments."""
        if name == "rag_choose_folder":
            return self.ns["_rag_choose_folder"](self.window)
        if name == "rag_folders":
            return self.ns["_rag_folders"]()
        if name == "rag_forget_folder":
            return self.ns["_rag_forget_folder"](*args)
        if name == "rag_list":
            return self.ns["_rag_list"](*args)
        if name == "rag_read":
            return self.ns["_rag_read"](*args)
        raise KeyError(name)


class Server(socketserver.ThreadingMixIn, http.server.HTTPServer):
    daemon_threads = True
    allow_reuse_address = True


def make_handler(bridge):
    class H(http.server.BaseHTTPRequestHandler):
        protocol_version = "HTTP/1.1"

        def log_message(self, *a):
            pass

        def _send(self, obj, status=200):
            body = json.dumps(obj).encode("utf-8")
            self.send_response(status)
            self.send_header("Access-Control-Allow-Origin", "*")
            self.send_header("Access-Control-Allow-Headers", "*")
            self.send_header("Access-Control-Allow-Methods", "POST, GET, OPTIONS")
            self.send_header("Content-Type", "application/json")
            self.send_header("Content-Length", str(len(body)))
            self.end_headers()
            self.wfile.write(body)

        def do_OPTIONS(self):
            self.send_response(204)
            self.send_header("Access-Control-Allow-Origin", "*")
            self.send_header("Access-Control-Allow-Headers", "*")
            self.send_header("Access-Control-Allow-Methods", "POST, GET, OPTIONS")
            self.send_header("Content-Length", "0")
            self.end_headers()

        def do_GET(self):
            if self.path.startswith("/admin/problems"):
                return self._send({"problems": list(bridge.problems), "asked": [str(k) for k in bridge.window.asked]})
            self._send({"names": NAMES, "port": self.server.server_address[1], "state": bridge.state_dir})

        def do_POST(self):
            try:
                n = int(self.headers.get("Content-Length") or 0)
                raw = self.rfile.read(n) if n else b""
                body = json.loads(raw or b"null")
                if self.path.startswith("/call/"):
                    name = self.path.rsplit("/", 1)[-1]
                    if name not in NAMES:
                        return self._send({"ok": False, "e": "no such method: " + name})
                    args = body if isinstance(body, list) else []
                    return self._send({"ok": True, "v": bridge.call(name, *args)})
                if self.path == "/admin/dialog":
                    bridge.window.answers = list((body or {}).get("answers") or [])
                    return self._send({"ok": True})
                if self.path == "/admin/state":
                    return self._send({"ok": True, "state": bridge.set_state((body or {}).get("dir"))})
                if self.path == "/admin/set":
                    bridge.set_var(body["name"], body["value"])
                    return self._send({"ok": True})
                self._send({"ok": False, "e": "not found"}, 404)
            except Exception as e:
                traceback.print_exc()
                self._send({"ok": False, "e": str(e)})
    return H


def serve(port=DEFAULT_PORT, state_dir=None, bridge=None):
    """Starts the stand-in in a thread of this process. Returns (server, bridge); server.shutdown() stops it. port 0: any free port."""
    bridge = bridge or Bridge(state_dir)
    srv = Server(("127.0.0.1", port), make_handler(bridge))
    threading.Thread(target=srv.serve_forever, daemon=True).start()
    return srv, bridge


def main(argv):
    port, state = DEFAULT_PORT, None
    it = iter(argv)
    for a in it:
        if a == "--state":
            state = next(it)
        elif a.isdigit():
            port = int(a)
        else:
            raise SystemExit(__doc__)
    srv, bridge = serve(port, state)
    print(json.dumps({"port": srv.server_address[1], "state": bridge.state_dir, "names": NAMES}), flush=True)
    try:
        threading.Event().wait()
    except KeyboardInterrupt:
        pass


if __name__ == "__main__":
    main(sys.argv[1:])
