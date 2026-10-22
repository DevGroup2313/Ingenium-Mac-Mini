"""Ingenium 6.2: Command+R and Refresh Ingenium reach a page that has stopped answering (patch for ingenium_app.py)."""
import sys
p = sys.argv[1]
s = open(p, encoding="utf-8").read()


def rep(old, new, n=1):
    global s
    c = s.count(old)
    if c != n:
        sys.exit("%s: expected %d, found %d: %r" % (p, n, c, old[:90]))
    s = s.replace(old, new)


rep('''        url = url or _REFRESH_URL["url"]
        if url:
            window.load_url(url)
    except BaseException:
        log_problem("refresh failed", sys.exc_info())
    finally:
        _REFRESH_LOCK.release()''', '''        url = url or _REFRESH_URL["url"]
        if url:
            window.load_url(url)
            # 6.2: a page that has stopped answering cannot start loading again either (the owner's words, 22 October
            # 2026: "even the Command+R refresh shortcut does nothing for the app. I have to Force Quit it"). WebKit runs
            # the page in a process of its own, and a reload waits behind whatever holds that process. So the page is
            # asked once more after the reload; still silent after six seconds, its process is ended and the page loads
            # in a new one, as Safari does with a page that has stopped answering.
            if not _page_answers(window, 6.0):
                log_problem("refresh: the page still gives no answer after loading again; its process is started afresh")
                _restart_page_process(window, url)
    except BaseException:
        log_problem("refresh failed", sys.exc_info())
    finally:
        _REFRESH_LOCK.release()


def _page_answers(window, wait):
    """True when the page runs a line of script within `wait` seconds."""
    got = {}

    def _ask():
        try:
            got["v"] = window.evaluate_js("1+1")
        except BaseException:
            got["v"] = None

    t = threading.Thread(target=_ask, daemon=True)
    t.start()
    t.join(wait)
    return got.get("v") == 2


def _restart_page_process(window, url):
    """macOS: end the web view's page process (WebKit's own call for it) and load the page again in a new one."""
    if sys.platform != "darwin":
        return False
    try:
        import Foundation
        from PyObjCTools import AppHelper
        from webview.platforms import cocoa
        bv = cocoa.BrowserView.instances.get(getattr(window, "uid", None))
        wk = getattr(bv, "webview", None)
        if wk is None:
            log_problem("refresh: no web view to start afresh")
            return False

        def _go():
            ended = False
            for sel in ("_killWebContentProcessAndResetState", "_killWebContentProcess"):
                try:
                    if wk.respondsToSelector_(sel):
                        wk.performSelector_(sel)
                        ended = True
                        break
                except Exception:
                    log_problem("refresh: " + sel, sys.exc_info())
            try:
                req = Foundation.NSURLRequest.requestWithURL_(Foundation.NSURL.URLWithString_(url))
                wk.loadRequest_(req)
            except Exception:
                log_problem("refresh: loading afresh", sys.exc_info())
            log_problem("refresh: page process %s; the page loads again" % ("ended" if ended else "could not be ended"))

        AppHelper.callAfter(_go)
        return True
    except Exception:
        log_problem("refresh: starting the page afresh", sys.exc_info())
        return False''')
open(p, "w", encoding="utf-8").write(s)
print("patched", p)
