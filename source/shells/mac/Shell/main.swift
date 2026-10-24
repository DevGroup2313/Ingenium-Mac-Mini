import AppKit

/* INGENIUM 6.5 · THE MAC SHELL THAT FABRICA FILLS (main.swift: the app, its menus).
   The Mac's counterpart of the iPhone and iPad shell (../ios): one window holding
   the web view that runs the app's own page (DeskWindow.swift). Fabrica writes the
   app's page into Resources/www/, names it in www/shell.json, writes the app's name,
   id and version into Info.plist and its icon into Resources/AppIcon.icns, and seals
   the bundle again, on the device. This code is compiled once, on GitHub's Macs, for
   Apple silicon and Intel in one file (.github/workflows/build-shells.yml).
   A plain AppKit app: no storyboard and no asset catalog, so nothing in the bundle
   needs Xcode to change. */

let app = NSApplication.shared
let shellDelegate = ShellAppDelegate()
app.delegate = shellDelegate
app.setActivationPolicy(.regular)
app.run()

final class ShellAppDelegate: NSObject, NSApplicationDelegate {

    private var desk: DeskWindowController?

    /// the app's name, as Fabrica wrote it into Info.plist
    static var appName: String {
        let info = Bundle.main.infoDictionary ?? [:]
        return (info["CFBundleDisplayName"] as? String) ?? (info["CFBundleName"] as? String) ?? "App"
    }

    func applicationDidFinishLaunching(_ notification: Notification) {
        NSApp.mainMenu = ShellAppDelegate.makeMenu()
        let d = DeskWindowController.make()
        desk = d
        d.showWindow(nil)
        d.window?.makeKeyAndOrderFront(nil)
        NSApp.activate(ignoringOtherApps: true)
    }

    func applicationShouldTerminateAfterLastWindowClosed(_ sender: NSApplication) -> Bool {
        return true
    }

    /// the app comes back to its window when its Dock icon is clicked
    func applicationShouldHandleReopen(_ sender: NSApplication, hasVisibleWindows flag: Bool) -> Bool {
        if !flag { desk?.window?.makeKeyAndOrderFront(nil) }
        return true
    }

    /* the menus a Mac app has: without the Edit menu, Command-C, Command-V and
       Command-Z would do nothing in the page */
    static func makeMenu() -> NSMenu {
        let name = appName
        let bar = NSMenu()

        let appMenu = NSMenu(title: name)
        appMenu.addItem(withTitle: "About \(name)", action: #selector(NSApplication.orderFrontStandardAboutPanel(_:)), keyEquivalent: "")
        appMenu.addItem(.separator())
        appMenu.addItem(withTitle: "Hide \(name)", action: #selector(NSApplication.hide(_:)), keyEquivalent: "h")
        let others = appMenu.addItem(withTitle: "Hide Others", action: #selector(NSApplication.hideOtherApplications(_:)), keyEquivalent: "h")
        others.keyEquivalentModifierMask = [.command, .option]
        appMenu.addItem(withTitle: "Show All", action: #selector(NSApplication.unhideAllApplications(_:)), keyEquivalent: "")
        appMenu.addItem(.separator())
        appMenu.addItem(withTitle: "Quit \(name)", action: #selector(NSApplication.terminate(_:)), keyEquivalent: "q")
        bar.addItem(holding: appMenu)

        let edit = NSMenu(title: "Edit")
        edit.addItem(withTitle: "Undo", action: Selector(("undo:")), keyEquivalent: "z")
        let redo = edit.addItem(withTitle: "Redo", action: Selector(("redo:")), keyEquivalent: "z")
        redo.keyEquivalentModifierMask = [.command, .shift]
        edit.addItem(.separator())
        edit.addItem(withTitle: "Cut", action: #selector(NSText.cut(_:)), keyEquivalent: "x")
        edit.addItem(withTitle: "Copy", action: #selector(NSText.copy(_:)), keyEquivalent: "c")
        edit.addItem(withTitle: "Paste", action: #selector(NSText.paste(_:)), keyEquivalent: "v")
        let plain = edit.addItem(withTitle: "Paste and Match Style", action: #selector(NSTextView.pasteAsPlainText(_:)), keyEquivalent: "v")
        plain.keyEquivalentModifierMask = [.command, .option, .shift]
        edit.addItem(withTitle: "Delete", action: #selector(NSText.delete(_:)), keyEquivalent: "")
        edit.addItem(withTitle: "Select All", action: #selector(NSText.selectAll(_:)), keyEquivalent: "a")
        bar.addItem(holding: edit)

        let view = NSMenu(title: "View")
        view.addItem(withTitle: "Reload", action: #selector(DeskWindowController.reloadPage(_:)), keyEquivalent: "r")
        view.addItem(.separator())
        view.addItem(withTitle: "Actual Size", action: #selector(DeskWindowController.zoomActual(_:)), keyEquivalent: "0")
        view.addItem(withTitle: "Zoom In", action: #selector(DeskWindowController.zoomIn(_:)), keyEquivalent: "=")
        view.addItem(withTitle: "Zoom Out", action: #selector(DeskWindowController.zoomOut(_:)), keyEquivalent: "-")
        view.addItem(.separator())
        let full = view.addItem(withTitle: "Enter Full Screen", action: #selector(NSWindow.toggleFullScreen(_:)), keyEquivalent: "f")
        full.keyEquivalentModifierMask = [.command, .control]
        bar.addItem(holding: view)

        let window = NSMenu(title: "Window")
        window.addItem(withTitle: "Minimize", action: #selector(NSWindow.performMiniaturize(_:)), keyEquivalent: "m")
        window.addItem(withTitle: "Zoom", action: #selector(NSWindow.performZoom(_:)), keyEquivalent: "")
        window.addItem(withTitle: "Close", action: #selector(NSWindow.performClose(_:)), keyEquivalent: "w")
        bar.addItem(holding: window)
        NSApp.windowsMenu = window
        return bar
    }
}

private extension NSMenu {
    func addItem(holding submenu: NSMenu) {
        let item = NSMenuItem(title: submenu.title, action: nil, keyEquivalent: "")
        item.submenu = submenu
        addItem(item)
    }
}
