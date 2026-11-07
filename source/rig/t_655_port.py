# python3 rig/t_655_port.py <a desktop repository's ingenium_app.py>
# Ingenium 6.55 (7 November 2026): a second copy never opens on an empty store (build/desktop/app_port_655.py). Her screenshots of
# 7 November 2026 showed a start with no models and an empty chat: a copy that took the port after 17953 has a store of its own.
#   - with port 17953 held by something that is not Ingenium, the app moves to the next port, as before, and says nothing;
#   - with it held by an Ingenium, the app says so (that her work is with the copy that opened first, and how to quit it) and ends;
#   - with it free, the app opens on it.
import http.server, importlib.util, os, socket, socketserver, sys, threading, time

path = os.path.abspath(sys.argv[1])
spec = importlib.util.spec_from_file_location("ia", path)
ia = importlib.util.module_from_spec(spec)
spec.loader.exec_module(ia)
passed = failed = 0


def ok(c, m, d=None):
    global passed, failed
    if c:
        passed += 1
        print("ok   " + m)
    else:
        failed += 1
        print("FAIL " + m + ("" if d is None else " :: " + repr(d)[:600]))


said = []
ia.tell_user = lambda t, title=None: said.append(t)


def fake_exit(code):
    raise SystemExit(code)


ia.os._exit = fake_exit


class Reuse(socketserver.TCPServer):
    allow_reuse_address = True


def stand_in(body):
    class H(http.server.BaseHTTPRequestHandler):
        def do_GET(self):
            self.send_response(200)
            self.end_headers()
            self.wfile.write(body)

        def log_message(self, *a):
            pass
    srv = Reuse(("127.0.0.1", 17953), H)
    threading.Thread(target=srv.serve_forever, daemon=True).start()
    return srv


def wait_free(port=17953, secs=120):
    t0 = time.time()
    while time.time() - t0 < secs:
        s = socket.socket()
        s.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
        try:
            s.bind(("127.0.0.1", port))
            s.close()
            return True
        except OSError:
            s.close()
            time.sleep(2)
    return False


def stop_app_server():
    if ia._LOCAL_SERVER is not None:
        ia._LOCAL_SERVER.shutdown()
        ia._LOCAL_SERVER.server_close()
        ia._LOCAL_SERVER = None


here = os.path.dirname(path)
name = os.path.basename(path)
ok(wait_free(), "port 17953 is free to begin with")
other = stand_in(b"<html><title>Something else</title></html>")
port = ia._start_local_server(here, name)
ok(port != 17953 and not said, "held by something that is not Ingenium, the app moves to the next port and says nothing", (port, said))
stop_app_server()
other.shutdown()
other.server_close()
ok(wait_free(), "port 17953 is free again")
held = stand_in(b"<html><title>Ingenium</title></html>")
try:
    ia._start_local_server(here, name)
    ok(False, "held by an Ingenium, the app ends rather than open on an empty store", "it opened")
except SystemExit:
    ok(said and "already open" in said[-1] and "Quit" in said[-1], "held by an Ingenium, the app says so and ends rather than open on an empty store", said[-1:])
held.shutdown()
held.server_close()
ok(wait_free(), "port 17953 is free once more")
port = ia._start_local_server(here, name)
ok(port == 17953, "free, the app opens on it (where her work is kept)", port)
stop_app_server()
print("\n%d passed, %d failed" % (passed, failed))
sys.exit(1 if failed else 0)
