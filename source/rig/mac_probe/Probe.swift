// INGENIUM  |  Copyright (c) 2026 Yannie D. Forest. All rights reserved.
// NO LICENCE IS GRANTED. See LICENCE.txt.
//
// The look probe (Ingenium 6.80): opens a page in a Mac web view (WKWebView, the engine of the Mac apps), in a real window,
// so that GitHub's Mac can photograph what a Mac draws. A setup script (given as a file) prepares the page and answers
// window.__probe() with what it sees; this program writes that to a log once a second.
//   Probe <page.html> <setup.js> <log file>
import AppKit
import WebKit

let args = CommandLine.arguments
if args.count < 4 { print("usage: Probe <page.html> <setup.js> <log file>"); exit(2) }
let pageURL = URL(fileURLWithPath: args[1])
let setupJS = (try? String(contentsOfFile: args[2], encoding: .utf8)) ?? ""
let logPath = args[3]
FileManager.default.createFile(atPath: logPath, contents: nil)
func note(_ s: String) {
  if let h = FileHandle(forWritingAtPath: logPath) { h.seekToEndOfFile(); h.write((s + "\n").data(using: .utf8)!); h.closeFile() }
}

final class Delegate: NSObject, NSApplicationDelegate, WKNavigationDelegate {
  var window: NSWindow!
  var web: WKWebView!
  var timer: Timer?
  func applicationDidFinishLaunching(_ n: Notification) {
    let screen = NSScreen.main!.frame
    let w = min(1440, screen.width), h = min(900, screen.height - 60)
    let cfg = WKWebViewConfiguration()
    cfg.userContentController.addUserScript(WKUserScript(source: setupJS, injectionTime: .atDocumentEnd, forMainFrameOnly: true))
    web = WKWebView(frame: NSRect(x: 0, y: 0, width: w, height: h), configuration: cfg)
    web.navigationDelegate = self
    window = NSWindow(contentRect: NSRect(x: 0, y: screen.height - h - 40, width: w, height: h), styleMask: [.titled], backing: .buffered, defer: false)
    window.title = "Ingenium look probe"
    window.contentView = web
    window.makeKeyAndOrderFront(nil)
    NSApp.activate(ignoringOtherApps: true)
    let r = window.contentRect(forFrameRect: window.frame)
    note("SCREEN \(Int(screen.width)) \(Int(screen.height)) CONTENT \(Int(r.origin.x)) \(Int(screen.height - r.origin.y - r.height)) \(Int(r.width)) \(Int(r.height)) SCALE \(NSScreen.main!.backingScaleFactor)")
    note("OS \(ProcessInfo.processInfo.operatingSystemVersionString)")
    web.loadFileURL(pageURL, allowingReadAccessTo: pageURL.deletingLastPathComponent())
    timer = Timer.scheduledTimer(withTimeInterval: 1.0, repeats: true) { _ in
      self.web.evaluateJavaScript("(window.__probe ? JSON.stringify(window.__probe()) : 'waiting')") { v, e in
        note("STATE " + ((v as? String) ?? ("error " + String(describing: e))))
      }
    }
  }
  func webView(_ w: WKWebView, didFail nav: WKNavigation!, withError e: Error) { note("FAIL \(e.localizedDescription)") }
  func webView(_ w: WKWebView, didFailProvisionalNavigation nav: WKNavigation!, withError e: Error) { note("FAIL \(e.localizedDescription)") }
}

let app = NSApplication.shared
app.setActivationPolicy(.regular)
let delegate = Delegate()
app.delegate = delegate
app.run()
