"""Ingenium 6.14 (4 November 2026): connectors that keep a session (patch for ingenium_app.py, Mac and Windows).

A connector speaks MCP over HTTP (the "Streamable HTTP" transport). A server that keeps a session names it in a response header,
Mcp-Session-Id, and expects it back on every later request. The app's relay (POST /_relay, which carries the page's requests past
the browser's rule against other sites) passed back only the upstream status and Content-Type, so the page never saw the session
and such a server refused the second request. The relay now passes the two MCP headers back as X-Upstream-Mcp-Session-Id and
X-Upstream-MCP-Protocol-Version; nothing else changes.

    python3 build/desktop/app_mcp_614.py <repo>/ingenium_app.py"""
import sys

MARK = "X-Upstream-Mcp-Session-Id"
OLD = '''        h.send_header("Content-Type", ct or "application/octet-stream")
        h.send_header("Cache-Control", "no-store")'''
NEW = '''        h.send_header("Content-Type", ct or "application/octet-stream")
        # 6.14 (app_mcp_614.py): an MCP server's session and protocol version travel back to the page (X-Upstream-Mcp-Session-Id)
        try:
            for _hn in ("Mcp-Session-Id", "MCP-Protocol-Version"):
                _hv = resp.headers.get(_hn) if getattr(resp, "headers", None) else None
                if _hv and "\\n" not in str(_hv) and "\\r" not in str(_hv):
                    h.send_header("X-Upstream-" + _hn, str(_hv)[:200])
        except Exception:
            pass
        h.send_header("Cache-Control", "no-store")'''

if __name__ == "__main__":
    p = sys.argv[1]
    s = open(p, encoding="utf-8").read()
    if MARK in s:
        print("already patched", p)
        sys.exit(0)
    if s.count(OLD) != 1:
        sys.exit("%s: the relay's response headers were not found once (app_relay_67.py must be applied first)" % p)
    s = s.replace(OLD, NEW)
    open(p, "w", encoding="utf-8").write(s)
    print("patched", p)
