// A Playwright init script that gives a page the desktop app's folder bridge, window.pywebview.api.rag_*, over rig/rag_bridge.py
// (an HTTP stand-in that runs the patch's own functions, build/desktop/app_rag_692.py). Not shipped.
//
//   python3 rig/rag_bridge.py 8178                                           (the stand-in)
//   await context.addInitScript({ path: 'rig/rag_bridge_shim.js' });          (before the page is opened)
//
// The stand-in is expected at http://127.0.0.1:8178; for another address define it first, in an init script of its own:
//   await context.addInitScript('window.__RAG_BRIDGE__ = "http://127.0.0.1:9000"');
// The five methods answer as pywebview's do: a Promise of the value the app returns ({ok, ...} objects and the folders list are values;
// only a failure of the stand-in itself rejects). The app announces itself with a 'pywebviewready' event once the page has loaded; so
// does this. If window.pywebview.api exists already (another stand-in), the five methods are added to it.
// Notes for a test: the stand-in is another origin than the test server's, so a test that refuses every request to another address
// must let this one through, and a page with a Content-Security-Policy needs `bypassCSP: true` on its context (or a connect-src for it).
// The page must really be served from 127.0.0.1 (the test server's is): Chromium refuses a request from a page on a public name, or one
// fulfilled by page.route() (which has no address), to a loopback address ("Permission was denied ... the `loopback` address space").
(() => {
  const base = String(window.__RAG_BRIDGE__ || 'http://127.0.0.1:8178').replace(/\/+$/, '');
  const names = ['rag_choose_folder', 'rag_folders', 'rag_forget_folder', 'rag_list', 'rag_read'];
  const api = (window.pywebview && window.pywebview.api) || {};
  for (const n of names) {
    api[n] = (...args) => fetch(base + '/call/' + n, { method: 'POST', body: JSON.stringify(args) })
      .then((r) => r.json())
      .then((j) => { if (!j.ok) throw new Error(j.e || (n + ' failed')); return j.v; });
  }
  window.pywebview = Object.assign(window.pywebview || {}, { api });
  window.__ragBridgeShim = { base, names };
  const ready = () => setTimeout(() => window.dispatchEvent(new Event('pywebviewready')), 50);
  if (document.readyState === 'loading') window.addEventListener('DOMContentLoaded', ready); else ready();
})();
