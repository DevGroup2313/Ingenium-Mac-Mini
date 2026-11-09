"""Ingenium 6.55 (7 November 2026): a second copy never opens on an empty store.

The page keeps her work (models, conversations, settings, the app library) at its own address, http://127.0.0.1:17953 (R58: one fixed
address, so the web view's storage is the same at every launch). When another Ingenium still held that address, an earlier version left
open, or a copy still closing, this copy took the next port, a different address with a store of its own, and opened with none of her
work, which was safe all along at the first address. Her screenshots of 7 November 2026 show such a start: no models, an empty chat.
Now, when the address is held by an Ingenium, this copy says so in a dialog and ends; once the other one is quit, it opens on her work.
Only when the port is held by something that is not Ingenium does it move to the next one, as before. (On Windows a second copy is
already stopped at start and its window brought forward: app_win_64.py.)
And the address is taken again at once after a copy is quit: the connections of the copy just closed linger on the port for up to a
minute (TIME_WAIT), and the server did not ask to reuse the address, so a copy opened again within that minute (as after an update)
found 17953 taken by nothing at all, took 17954, and opened empty. On the Mac and Linux it now reuses the address (SO_REUSEADDR, which
still refuses a port another program is listening on); on Windows that option would let two programs share a port, so it stays off.
    python3 desktop/app_port_655.py <repo>/ingenium_app.py
"""
import sys

p = sys.argv[1]
s = open(p, encoding="utf-8").read()
if "_ingenium_holds_port" in s:
    sys.exit(0)


def put(old, new, times=1, label=""):
    global s
    n = s.count(old)
    if n != times:
        sys.exit("app_port_655: %s found %d times, not %d" % (label or old[:60], n, times))
    s = s.replace(old, new)


FN = r'''def _ingenium_holds_port(port):
    """True when an Ingenium answers at 127.0.0.1:port (its page, or its guard's refusal, both name it). Anything else, or no
    answer within a second and a half, is False."""
    try:
        import http.client
        c = http.client.HTTPConnection("127.0.0.1", port, timeout=1.5)
        c.request("GET", "/", headers={"Host": "127.0.0.1:%d" % port})
        r = c.getresponse()
        body = r.read(200000)
        c.close()
        return b"Ingenium" in body or b"INGENIUM" in body
    except Exception:
        return False


def _another_copy_holds_the_work(port):
    """Her work lives at port 17953: when another Ingenium holds it, this copy would open on an empty store at another address.
    It says so and ends instead."""
    if port != 17953 or not _ingenium_holds_port(port):
        return
    log_problem("start: another Ingenium holds 127.0.0.1:17953 (her work's address); this copy ends rather than open empty")
    tell_user(
        "Ingenium is already open in another window, perhaps an earlier version that is still running.\n\n"
        "Your models, conversations and settings are with the copy that opened first, so this one would open without them. "
        "Quit the other Ingenium (in its menu bar, Ingenium, then Quit Ingenium; or right-click its icon in the Dock and choose Quit), "
        "then open this one again: it will open on all your work.")
    os._exit(0)


class _IngLocalServer(socketserver.ThreadingTCPServer):
    """The page's own server: on the Mac and Linux it takes its address again at once after a copy is quit (SO_REUSEADDR, which still
    refuses a port another program listens on); on Windows that option would let two programs share a port, so it stays off there."""
    allow_reuse_address = not sys.platform.startswith("win")


def _start_local_server(directory, html_name=None):'''
put("def _start_local_server(directory, html_name=None):", FN, 1, "the local server's start")
put('''        try:
            box = socketserver.ThreadingTCPServer(("127.0.0.1", port), handler)
            httpd = box
            break
        except OSError:
            continue''', '''        try:
            box = _IngLocalServer(("127.0.0.1", port), handler)
            httpd = box
            break
        except OSError:
            _another_copy_holds_the_work(port)
            continue''', 1, "the port loop")
open(p, "w", encoding="utf-8").write(s)
