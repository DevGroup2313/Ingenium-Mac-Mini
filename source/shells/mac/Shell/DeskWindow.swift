import AppKit
import WebKit

/* INGENIUM 6.5 · the app's window: its page, served from the app's own bundle
   (Resources/www) at the app scheme (ShellSchemeHandler.swift), a fixed address
   whose storage stays on this Mac from one start to the next. No network and no
   browser for the page itself, ever. Which page, which of the family's bridge
   names it is given, and the window's title come from www/shell.json, which
   Fabrica writes for each app, as for the iPhone and iPad shell (../ios).

   What the page needs from its window on a Mac:
   - alert, confirm and prompt (a web view shows none of them unless the app does);
   - a file chosen with the page's own Choose a file (an open panel);
   - saving a file asks where (a save panel), one save at a time;
   - links to other sites open in the browser, never inside the app;
   - the clipboard for the page's own menu (ShellClipboard, below);
   - the microphone and camera for the app's own page only;
   - Reload (Command-R), and zoom, from the View menu;
   - if the page's process ends, the page comes back. */

final class DeskWindowController: NSWindowController, NSWindowDelegate, WKNavigationDelegate, WKUIDelegate,
                                  WKScriptMessageHandler, WKDownloadDelegate {

    static let appScheme = "carpe-app"

    /// www/shell.json: {"page": "the_app.html", "bridges": ["CarpeNative", ...], "title": "The app"}
    static let config: [String: Any] = {
        guard let root = ShellSchemeHandler.www,
              let data = try? Data(contentsOf: root.appendingPathComponent("shell.json")),
              let o = try? JSONSerialization.jsonObject(with: data) as? [String: Any] else { return [:] }
        return o
    }()
    static let page: String = {
        let p = (config["page"] as? String) ?? "index.html"
        return p.addingPercentEncoding(withAllowedCharacters: .urlPathAllowed) ?? "index.html"
    }()
    static let entryURL = URL(string: "carpe-app://desk/" + page)!
    static let bridgeNames: [String] = {
        let all = (config["bridges"] as? [String]) ?? ["CarpeNative"]
        return all.filter { $0.range(of: "^[A-Za-z_][A-Za-z0-9_]*$", options: .regularExpression) != nil }
    }()
    static var title: String {
        if let t = config["title"] as? String, !t.isEmpty { return t }
        return ShellAppDelegate.appName
    }

    /// started by the cloud build with -shell_pagetest: the page reports back once
    static let pageTest = ProcessInfo.processInfo.arguments.contains("-shell_pagetest")
    /// in that check only: a save goes straight into this folder, with no panel to answer
    static let testSaveDir: URL? = {
        guard pageTest, let p = ProcessInfo.processInfo.environment["SHELL_PAGETEST_SAVE_DIR"], !p.isEmpty else { return nil }
        return URL(fileURLWithPath: p, isDirectory: true)
    }()

    private var webView: WKWebView!
    private var pageTestSent = false
    private var downloadTargets: [ObjectIdentifier: URL] = [:]
    /// saves wait their turn: one save panel at a time, each after the one before has closed
    private var saveQueue: [(Data?, URL?, String)] = []
    private var saveShowing = false

    /// the app's one window, with its page loading
    static func make() -> DeskWindowController {
        let window = NSWindow(contentRect: NSRect(x: 0, y: 0, width: 1280, height: 860),
                              styleMask: [.titled, .closable, .miniaturizable, .resizable],
                              backing: .buffered, defer: false)
        let desk = DeskWindowController(window: window)
        desk.setUp(window)
        return desk
    }

    private func setUp(_ window: NSWindow) {
        window.title = DeskWindowController.title
        window.minSize = NSSize(width: 480, height: 360)
        window.isReleasedWhenClosed = false
        window.tabbingMode = .disallowed
        window.collectionBehavior = [.fullScreenPrimary]
        window.delegate = self

        let cfg = WKWebViewConfiguration()
        cfg.setURLSchemeHandler(ShellSchemeHandler(), forURLScheme: DeskWindowController.appScheme)
        cfg.websiteDataStore = .default()
        cfg.mediaTypesRequiringUserActionForPlayback = []
        cfg.preferences.javaScriptCanOpenWindowsAutomatically = false
        if #available(macOS 12.3, *) { cfg.preferences.isElementFullscreenEnabled = true }
        let scripts = cfg.userContentController
        scripts.add(self, name: "pySaveFile")
        scripts.add(self, name: "shellLog")
        scripts.addScriptMessageHandler(ShellClipboard(), contentWorld: .page, name: "shellClipboard")
        scripts.addUserScript(WKUserScript(source: DeskWindowController.bridge,
                                           injectionTime: .atDocumentStart, forMainFrameOnly: false))
        if DeskWindowController.pageTest {
            scripts.addUserScript(WKUserScript(source: DeskWindowController.errorCatcher,
                                               injectionTime: .atDocumentStart, forMainFrameOnly: true))
        }

        webView = WKWebView(frame: NSRect(x: 0, y: 0, width: 1280, height: 860), configuration: cfg)
        webView.navigationDelegate = self
        webView.uiDelegate = self
        webView.allowsBackForwardNavigationGestures = false
        webView.allowsMagnification = true
        webView.autoresizingMask = [.width, .height]
        if #available(macOS 13.3, *) {
            webView.isInspectable = true   // Safari's Develop menu can inspect the page
        }
        window.contentView = webView
        window.center()
        _ = window.setFrameAutosaveName("ShellDesk")   // the window opens where it was last left
        webView.load(URLRequest(url: DeskWindowController.entryURL))
    }

    static func log(_ line: String) {
        if let d = (line + "\n").data(using: .utf8) { FileHandle.standardOutput.write(d) }
    }

    /* --------------------------------------------- what the page is given */

    /* the shell surfaces the app already knows to look for, as shell.json names them:
       window.ShellNative.saveFile(name, mime, b64)     - always (the shell's own name)
       window.CarpeNative.saveFile(name, mime, b64)     - the family bridge name
       window.IngeniumNative.saveFile(name, mime, b64)  - Ingenium's (saving only: no engine here)
       window.pywebview.api.save_file(name, mime, b64)  - the Mac/Windows bridge's signature (The Forge, Carpe Diem)
       Each asks where to save the bytes. */
    static var bridge: String {
        var lines = ["window.ShellNative = { saveFile: send };"]
        for n in bridgeNames where n != "ShellNative" {
            if n == "pywebview" {
                lines.append("window.pywebview = window.pywebview || {}; window.pywebview.api = window.pywebview.api || {}; window.pywebview.api.save_file = send;")
            } else {
                lines.append("window.\(n) = window.\(n) || {}; window.\(n).saveFile = send;")
            }
        }
        return """
        (function () {
          var send = function (name, mime, b64) {
            try {
              window.webkit.messageHandlers.pySaveFile.postMessage({ name: name, mime: mime, b64: b64 });
              return true;
            } catch (e) { return false; }
          };
          \(lines.joined(separator: "\n      "))
        })();
        """
    }

    /// only in the cloud build's check: the page's own errors are counted
    static let errorCatcher = """
    window.__shellErrors = [];
    window.addEventListener('error', function (e) {
      try { if (e && e.message) window.__shellErrors.push(String(e.message) + ' (line ' + (e.lineno || 0) + ')'); } catch (_) {}
    });
    window.addEventListener('unhandledrejection', function (e) {
      try { window.__shellErrors.push('promise: ' + String(e && e.reason && (e.reason.message || e.reason))); } catch (_) {}
    });
    """

    /* only in the cloud build's check: what the page looks like six seconds in, its
       storage (what an earlier start left, so a second start shows it was kept, and
       IndexedDB), then the clipboard written and read back, then a file saved */
    static var pageTestJS: String {
        let save = testSaveDir != nil ? "true" : "false"
        return """
        (function () { setTimeout(function () {
          var b = document.body, errs = window.__shellErrors || [];
          var hs = window.webkit && window.webkit.messageHandlers;
          var log = function (line) { try { hs.shellLog.postMessage(line); } catch (e) {} };
          var kept = null; try { kept = localStorage.getItem('__shell_kept'); localStorage.setItem('__shell_kept', String(Date.now())); } catch (e) {}
          var idb = new Promise(function (res) {
            try {
              var rq = indexedDB.open('__shell_check', 1);
              rq.onupgradeneeded = function () { rq.result.createObjectStore('s'); };
              rq.onerror = function () { res(false); };
              rq.onsuccess = function () {
                var db = rq.result, tx = db.transaction('s', 'readwrite');
                tx.objectStore('s').put('ok', 'k');
                tx.oncomplete = function () {
                  var g = db.transaction('s').objectStore('s').get('k');
                  g.onsuccess = function () { res(g.result === 'ok'); }; g.onerror = function () { res(false); };
                };
                tx.onerror = function () { res(false); };
              };
            } catch (e) { res(false); }
          });
          idb.then(function (idbOk) {
            var r = { title: document.title, text: ((b && b.innerText) || '').length, errors: errs.length, first: errs.slice(0, 3),
              bridge: !!(window.ShellNative && window.ShellNative.saveFile), clipHandler: !!(hs && hs.shellClipboard),
              storage: (function () { try { localStorage.setItem('__shell_check', '1'); var ok = localStorage.getItem('__shell_check') === '1';
                localStorage.removeItem('__shell_check'); return ok; } catch (e) { return false; } })(),
              kept: kept, idb: idbOk, origin: location.origin, href: location.href };
            log('SHELL_PAGETEST PAGE ' + JSON.stringify(r));
            var word = 'clip check 6.5';
            return hs.shellClipboard.postMessage({ op: 'write', text: word, html: '<b>' + word + '</b>' }).then(function (ok) {
              return hs.shellClipboard.postMessage({ op: 'read' }).then(function (v) {
                var good = ok === true && v && v.text === word && String(v.html || '').indexOf(word) >= 0;
                log('SHELL_PAGETEST CLIP ' + (good ? 'ok: written and read back, text and html' :
                  'unexpected ' + JSON.stringify({ wrote: ok, read: v }).slice(0, 200)));
              });
            }).catch(function (e) { log('SHELL_PAGETEST CLIP refused: ' + String((e && e.message) || e)); });
          }).then(function () {
            if (\(save)) window.ShellNative.saveFile('shell-check.txt', 'text/plain', btoa('saved by the page'));
            log('SHELL_PAGETEST DONE');
          });
        }, 6000); })();
        """
    }

    /* --------------------------------------------- what the page may call */

    func userContentController(_ userContentController: WKUserContentController, didReceive message: WKScriptMessage) {
        switch message.name {
        case "pySaveFile":
            guard message.frameInfo.securityOrigin.protocol == DeskWindowController.appScheme,
                  let body = message.body as? [String: Any],
                  let b64 = body["b64"] as? String,
                  let data = Data(base64Encoded: b64, options: .ignoreUnknownCharacters) else { return }
            let name = (body["name"] as? String) ?? "download"
            saveQueue.append((data, nil, name))
            nextSave()
        case "shellLog":
            if DeskWindowController.pageTest, let text = message.body as? String { DeskWindowController.log(text) }
        default:
            break
        }
    }

    static func safeFileName(_ name: String) -> String {
        var n = name.replacingOccurrences(of: "[\\\\/:*?\"<>|\\x00-\\x1f]", with: "_", options: .regularExpression)
            .trimmingCharacters(in: .whitespaces)
        if n.count > 120 { n = String(n.suffix(120)) }
        return n.isEmpty ? "download" : n
    }

    /// a fresh folder per file, so two downloads with one name never collide
    static func temporaryFile(named name: String) -> URL {
        let dir = FileManager.default.temporaryDirectory.appendingPathComponent(UUID().uuidString, isDirectory: true)
        try? FileManager.default.createDirectory(at: dir, withIntermediateDirectories: true)
        return dir.appendingPathComponent(safeFileName(name))
    }

    private func nextSave() {
        if saveShowing || saveQueue.isEmpty { return }
        saveShowing = true
        let item = saveQueue.removeFirst()
        let finish: () -> Void = { [weak self] in
            DispatchQueue.main.async { self?.saveShowing = false; self?.nextSave() }
        }
        let fm = FileManager.default
        func write(to dest: URL) throws {
            if fm.fileExists(atPath: dest.path) { try fm.removeItem(at: dest) }
            if let d = item.0 { try d.write(to: dest, options: .atomic) }
            else if let f = item.1 { try fm.moveItem(at: f, to: dest) }
        }
        if let dir = DeskWindowController.testSaveDir {
            try? fm.createDirectory(at: dir, withIntermediateDirectories: true)
            let ok = (try? write(to: dir.appendingPathComponent(DeskWindowController.safeFileName(item.2)))) != nil
            DeskWindowController.log("SHELL_PAGETEST SAVED \(item.2) \(ok ? "ok" : "failed")")
            finish()
            return
        }
        guard let w = window else { finish(); return }
        let panel = NSSavePanel()
        panel.nameFieldStringValue = DeskWindowController.safeFileName(item.2)
        panel.canCreateDirectories = true
        panel.isExtensionHidden = false
        panel.beginSheetModal(for: w) { [weak self] resp in
            var failed: Error?
            if resp == .OK, let dest = panel.url {
                do { try write(to: dest) } catch { failed = error }
            }
            if let f = item.1 { try? fm.removeItem(at: f.deletingLastPathComponent()) }
            DispatchQueue.main.async {
                if let e = failed { self?.showMessage("The file could not be saved: \(e.localizedDescription)") }
                finish()
            }
        }
    }

    private func showMessage(_ text: String) {
        let a = NSAlert()
        a.messageText = DeskWindowController.title
        a.informativeText = text
        a.addButton(withTitle: "OK")
        showAlert(a) { _ in }
    }

    /// on the window when it is free, or on its own when a sheet is already there
    private func showAlert(_ alert: NSAlert, done: @escaping (NSApplication.ModalResponse) -> Void) {
        if let w = window, w.attachedSheet == nil, w.isVisible {
            alert.beginSheetModal(for: w, completionHandler: done)
        } else {
            done(alert.runModal())
        }
    }

    /* --------------------------------------------- the View menu */

    @objc func reloadPage(_ sender: Any?) { webView.reload() }
    @objc func zoomActual(_ sender: Any?) { webView.pageZoom = 1 }
    @objc func zoomIn(_ sender: Any?) { webView.pageZoom = min(3, webView.pageZoom + 0.1) }
    @objc func zoomOut(_ sender: Any?) { webView.pageZoom = max(0.5, webView.pageZoom - 0.1) }

    /* ------------------------------------------------ links and downloads */

    func webView(_ webView: WKWebView, decidePolicyFor navigationAction: WKNavigationAction,
                 decisionHandler: @escaping (WKNavigationActionPolicy) -> Void) {
        if navigationAction.shouldPerformDownload {
            decisionHandler(.download)
            return
        }
        guard let url = navigationAction.request.url, let scheme = url.scheme?.lowercased() else {
            decisionHandler(.allow)
            return
        }
        let mainFrame = navigationAction.targetFrame?.isMainFrame ?? true
        if mainFrame && ["http", "https", "mailto", "tel"].contains(scheme) {
            NSWorkspace.shared.open(url)   // other sites open in the browser, never inside the app
            decisionHandler(.cancel)
            return
        }
        decisionHandler(.allow)
    }

    func webView(_ webView: WKWebView, decidePolicyFor navigationResponse: WKNavigationResponse,
                 decisionHandler: @escaping (WKNavigationResponsePolicy) -> Void) {
        decisionHandler(navigationResponse.canShowMIMEType ? .allow : .download)
    }

    func webView(_ webView: WKWebView, navigationAction: WKNavigationAction, didBecome download: WKDownload) {
        download.delegate = self
    }

    func webView(_ webView: WKWebView, navigationResponse: WKNavigationResponse, didBecome download: WKDownload) {
        download.delegate = self
    }

    func download(_ download: WKDownload, decideDestinationUsing response: URLResponse,
                  suggestedFilename: String, completionHandler: @escaping (URL?) -> Void) {
        let file = DeskWindowController.temporaryFile(named: suggestedFilename)
        downloadTargets[ObjectIdentifier(download)] = file
        completionHandler(file)
    }

    func downloadDidFinish(_ download: WKDownload) {
        if let file = downloadTargets.removeValue(forKey: ObjectIdentifier(download)) {
            saveQueue.append((nil, file, file.lastPathComponent))
            nextSave()
        }
    }

    func download(_ download: WKDownload, didFailWithError error: Error, resumeData: Data?) {
        downloadTargets.removeValue(forKey: ObjectIdentifier(download))
        showMessage("The file could not be saved: \(error.localizedDescription)")
    }

    /// A link that asks for a new window opens in the browser instead.
    func webView(_ webView: WKWebView, createWebViewWith configuration: WKWebViewConfiguration,
                 for navigationAction: WKNavigationAction, windowFeatures: WKWindowFeatures) -> WKWebView? {
        if let url = navigationAction.request.url, let scheme = url.scheme?.lowercased(), ["http", "https", "mailto"].contains(scheme) {
            NSWorkspace.shared.open(url)
        }
        return nil
    }

    func webView(_ webView: WKWebView, didFinish navigation: WKNavigation!) {
        if DeskWindowController.pageTest && !pageTestSent {
            pageTestSent = true
            webView.evaluateJavaScript(DeskWindowController.pageTestJS, completionHandler: nil)
        }
    }

    /// If the page's process ends, load the page again rather than leave a blank
    /// window. Your work is safe in storage.
    func webViewWebContentProcessDidTerminate(_ webView: WKWebView) {
        webView.load(URLRequest(url: DeskWindowController.entryURL))
    }

    /* ---------------------------------------------- files the page asks for */

    func webView(_ webView: WKWebView, runOpenPanelWith parameters: WKOpenPanelParameters,
                 initiatedByFrame frame: WKFrameInfo, completionHandler: @escaping ([URL]?) -> Void) {
        let panel = NSOpenPanel()
        panel.allowsMultipleSelection = parameters.allowsMultipleSelection
        panel.canChooseDirectories = parameters.allowsDirectories
        panel.canChooseFiles = true
        guard let w = window else { completionHandler(panel.runModal() == .OK ? panel.urls : nil); return }
        panel.beginSheetModal(for: w) { resp in completionHandler(resp == .OK ? panel.urls : nil) }
    }

    /* --------------------------------------------- microphone and camera */

    /// Dictation, recordings and pictures: granted to the app's own page only.
    /// macOS itself then asks once, with the words in Info.plist.
    func webView(_ webView: WKWebView, requestMediaCapturePermissionFor origin: WKSecurityOrigin,
                 initiatedByFrame frame: WKFrameInfo, type: WKMediaCaptureType,
                 decisionHandler: @escaping (WKPermissionDecision) -> Void) {
        decisionHandler(origin.protocol == DeskWindowController.appScheme ? .grant : .deny)
    }

    /* ------------------------------------- alert, confirm and prompt dialogs */

    func webView(_ webView: WKWebView, runJavaScriptAlertPanelWithMessage message: String,
                 initiatedByFrame frame: WKFrameInfo, completionHandler: @escaping () -> Void) {
        let a = NSAlert()
        a.messageText = DeskWindowController.title
        a.informativeText = message
        a.addButton(withTitle: "OK")
        showAlert(a) { _ in completionHandler() }
    }

    func webView(_ webView: WKWebView, runJavaScriptConfirmPanelWithMessage message: String,
                 initiatedByFrame frame: WKFrameInfo, completionHandler: @escaping (Bool) -> Void) {
        let a = NSAlert()
        a.messageText = DeskWindowController.title
        a.informativeText = message
        a.addButton(withTitle: "OK")
        a.addButton(withTitle: "Cancel")
        showAlert(a) { r in completionHandler(r == .alertFirstButtonReturn) }
    }

    func webView(_ webView: WKWebView, runJavaScriptTextInputPanelWithPrompt prompt: String,
                 defaultText: String?, initiatedByFrame frame: WKFrameInfo,
                 completionHandler: @escaping (String?) -> Void) {
        let a = NSAlert()
        a.messageText = DeskWindowController.title
        a.informativeText = prompt
        a.addButton(withTitle: "OK")
        a.addButton(withTitle: "Cancel")
        let field = NSTextField(frame: NSRect(x: 0, y: 0, width: 320, height: 24))
        field.stringValue = defaultText ?? ""
        a.accessoryView = field
        a.window.initialFirstResponder = field
        showAlert(a) { r in completionHandler(r == .alertFirstButtonReturn ? field.stringValue : nil) }
    }
}

/* ------------------------------------------------------------- clipboard */

/* the clipboard, for the page's own menu (Paste, Paste as plain text, Copy, Cut),
   as in the iPhone and iPad shell:
     window.webkit.messageHandlers.shellClipboard.postMessage({op: "read"})
       -> a Promise of {text, html}
     window.webkit.messageHandlers.shellClipboard.postMessage({op: "write", text, html})
       -> a Promise of true or false
   Only the app's own page (the carpe-app origin, in any of its frames) is answered. */
final class ShellClipboard: NSObject, WKScriptMessageHandlerWithReply {

    func userContentController(_ userContentController: WKUserContentController,
                               didReceive message: WKScriptMessage,
                               replyHandler: @escaping (Any?, String?) -> Void) {
        guard message.frameInfo.securityOrigin.protocol == DeskWindowController.appScheme,
              let body = message.body as? [String: Any],
              let op = body["op"] as? String else {
            replyHandler(nil, "not available here")
            return
        }
        let board = NSPasteboard.general
        switch op {
        case "read":
            replyHandler(["text": board.string(forType: .string) ?? "", "html": board.string(forType: .html) ?? ""], nil)
        case "write":
            let text = body["text"] as? String ?? ""
            let html = body["html"] as? String ?? ""
            board.clearContents()
            var ok = board.setString(text, forType: .string)
            if !html.isEmpty { ok = board.setString(html, forType: .html) && ok }
            replyHandler(ok, nil)
        default:
            replyHandler(nil, "unknown request")
        }
    }
}
