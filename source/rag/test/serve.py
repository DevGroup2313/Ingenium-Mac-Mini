#!/usr/bin/env python3
# INGENIUM  |  Copyright (c) 2026 Yannie D. Forest. All rights reserved.
# NO LICENCE IS GRANTED. See LICENCE.txt.
"""A small static server for the folder search's browser tests (not shipped).
    python3 rag/test/serve.py [PORT] [--vendor DIR] [--root DIR]
It shows the page folder the desktop apps have:
    /rag/vendor/...  ->  --vendor (the unpacked third-party tree: sqlite/, transformers/, ort/, pdfjs/, mammoth/, models/)
    /rag/...         ->  this checkout's source/rag/   (so /rag/test/harness.html is the unit-test page)
    anything else    ->  --root (default: source/rag/test, so /harness.html works too)
Like the apps' loopback server it sends no COOP/COEP headers (no cross-origin isolation), gives .mjs/.js the type
text/javascript and .wasm the type application/wasm, and sends no-store. Each request is logged to stderr as
"METHOD PATH STATUS". Default port 8175; --vendor defaults to $RAG_VENDOR."""
import http.server, os, posixpath, sys, urllib.parse

HERE = os.path.dirname(os.path.abspath(__file__))
RAG = os.path.dirname(HERE)


def main(argv):
    port, vendor, root = 8175, os.environ.get("RAG_VENDOR", ""), HERE
    it = iter(argv)
    for a in it:
        if a == "--vendor":
            vendor = next(it)
        elif a == "--root":
            root = next(it)
        elif a.isdigit():
            port = int(a)
        else:
            raise SystemExit(__doc__)
    if not vendor or not os.path.isdir(vendor):
        raise SystemExit("--vendor DIR (or $RAG_VENDOR) must name the unpacked vendor tree")
    vendor, root = os.path.realpath(vendor), os.path.realpath(root)

    class H(http.server.SimpleHTTPRequestHandler):
        extensions_map = dict(http.server.SimpleHTTPRequestHandler.extensions_map, **{
            ".mjs": "text/javascript", ".js": "text/javascript", ".wasm": "application/wasm",
            ".json": "application/json", ".onnx": "application/octet-stream", ".html": "text/html; charset=utf-8",
            ".md": "text/plain; charset=utf-8"})

        def translate_path(self, path):
            p = posixpath.normpath(urllib.parse.unquote(urllib.parse.urlsplit(path).path))
            if not p.startswith("/"):
                p = "/" + p
            if p == "/rag/vendor" or p.startswith("/rag/vendor/"):
                base, rel = vendor, p[len("/rag/vendor"):]
            elif p == "/rag" or p.startswith("/rag/"):
                base, rel = RAG, p[len("/rag"):]
            else:
                base, rel = root, p
            full = os.path.realpath(os.path.join(base, rel.lstrip("/")))
            # symbolic links inside the trees are fine; leaving the tree by ".." is not (normpath removed those)
            return full

        def list_directory(self, path):
            self.send_error(404, "no listing")

        def end_headers(self):
            self.send_header("Cache-Control", "no-store")
            super().end_headers()

        def log_message(self, fmt, *args):
            sys.stderr.write("%s %s %s\n" % (self.command, self.path, args[1] if len(args) > 1 else ""))
            sys.stderr.flush()

    srv = http.server.ThreadingHTTPServer(("127.0.0.1", port), H)
    sys.stderr.write("serving on http://127.0.0.1:%d/  vendor=%s  rag=%s  root=%s\n" % (port, vendor, RAG, root))
    sys.stderr.flush()
    try:
        srv.serve_forever()
    except KeyboardInterrupt:
        pass


if __name__ == "__main__":
    main(sys.argv[1:])
