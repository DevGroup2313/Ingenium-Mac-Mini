// INGENIUM  |  Copyright (c) 2026 Yannie D. Forest. All rights reserved.
// NO LICENCE IS GRANTED. See LICENCE.txt.
//
// The Mac's own sign-in as a way back into Ingenium (6.10.1). Her words (3 November 2026): "Yes, my computer's own sign in (Touch
// ID or Windows Hello) also open Ingenium." A small helper, compiled by tools/finish_mac_app.sh into Contents/MacOS/IngeniumKey:
//   IngeniumKey info                      what this Mac can ask: Touch ID, its own password, or nothing
//   IngeniumKey make <name> <reason>      asks the Mac who it is first (Touch ID, or the Mac's password); then a new random key of
//                                         256 bits is kept in the login keychain under that name, and printed
//   IngeniumKey get <name> <reason>       asks the Mac who it is first; then the key kept under that name is printed
//   IngeniumKey drop <name>               the key kept under that name is removed
// It prints one line of JSON, {"ok":true,...} or {"ok":false,"error":"..."}, and nothing else. The page never sees the key unless
// the Mac has confirmed it is her; the key opens only the data key that the page keeps wrapped with it (modules/r197.js).
import Foundation
import LocalAuthentication
import Security

let service = "Ingenium device key"

func out(_ d: [String: Any]) -> Never {
    if let j = try? JSONSerialization.data(withJSONObject: d, options: []), let s = String(data: j, encoding: .utf8) {
        print(s)
    }
    exit((d["ok"] as? Bool) == true ? 0 : 1)
}

func validName(_ a: String) -> Bool {
    return a.range(of: "^[A-Za-z0-9_-]{4,64}$", options: .regularExpression) != nil
}

/* Touch ID where the Mac has it, else the Mac's own password: the Mac asks, and says whether it is her */
func verify(_ reason: String) -> (Bool, String, Bool) {
    let ctx = LAContext()
    var err: NSError?
    guard ctx.canEvaluatePolicy(.deviceOwnerAuthentication, error: &err) else {
        return (false, err?.localizedDescription ?? "This Mac cannot ask who you are.", false)
    }
    let sem = DispatchSemaphore(value: 0)
    var ok = false
    var why = ""
    var cancelled = false
    ctx.evaluatePolicy(.deviceOwnerAuthentication, localizedReason: reason) { success, e in
        ok = success
        if let e = e as NSError? {
            why = e.localizedDescription
            cancelled = (e.code == LAError.userCancel.rawValue || e.code == LAError.appCancel.rawValue || e.code == LAError.systemCancel.rawValue)
        }
        sem.signal()
    }
    sem.wait()
    return (ok, why, cancelled)
}

func query(_ name: String) -> [String: Any] {
    return [kSecClass as String: kSecClassGenericPassword, kSecAttrService as String: service, kSecAttrAccount as String: name]
}

let args = CommandLine.arguments
if args.count < 2 { out(["ok": false, "error": "No command was given."]) }

switch args[1] {
case "info":
    let ctx = LAContext()
    var e1: NSError?
    if ctx.canEvaluatePolicy(.deviceOwnerAuthenticationWithBiometrics, error: &e1) && ctx.biometryType == .touchID {
        out(["ok": true, "kind": "touchid", "label": "Touch ID"])
    }
    var e2: NSError?
    if LAContext().canEvaluatePolicy(.deviceOwnerAuthentication, error: &e2) {
        out(["ok": true, "kind": "password", "label": "your Mac's password"])
    }
    out(["ok": true, "kind": "none", "label": "", "why": e2?.localizedDescription ?? ""])

case "make", "get":
    if args.count < 3 || !validName(args[2]) { out(["ok": false, "error": "That is not the name of a key."]) }
    let name = args[2]
    let reason = args.count >= 4 && !args[3].isEmpty ? String(args[3].prefix(140)) : "open Ingenium"
    let (ok, why, cancelled) = verify(reason)
    if !ok { out(["ok": false, "error": why.isEmpty ? "The Mac did not confirm it is you." : why, "cancelled": cancelled]) }
    if args[1] == "make" {
        var bytes = [UInt8](repeating: 0, count: 32)
        if SecRandomCopyBytes(kSecRandomDefault, bytes.count, &bytes) != errSecSuccess { out(["ok": false, "error": "The Mac gave no random bytes."]) }
        let key = Data(bytes)
        SecItemDelete(query(name) as CFDictionary)
        var add = query(name)
        add[kSecValueData as String] = key
        add[kSecAttrLabel as String] = "Ingenium device key"
        add[kSecAttrDescription as String] = "Opens Ingenium on this Mac, after Touch ID or the Mac's password"
        let st = SecItemAdd(add as CFDictionary, nil)
        if st != errSecSuccess { out(["ok": false, "error": "The keychain did not keep the key (\(st))."]) }
        out(["ok": true, "key": key.base64EncodedString()])
    } else {
        var q = query(name)
        q[kSecReturnData as String] = true
        q[kSecMatchLimit as String] = kSecMatchLimitOne
        var item: CFTypeRef?
        let st = SecItemCopyMatching(q as CFDictionary, &item)
        if st == errSecItemNotFound { out(["ok": false, "error": "This Mac holds no key for this copy of Ingenium.", "missing": true]) }
        guard st == errSecSuccess, let d = item as? Data, d.count == 32 else { out(["ok": false, "error": "The keychain did not give the key (\(st))."]) }
        out(["ok": true, "key": d.base64EncodedString()])
    }

case "drop":
    if args.count < 3 || !validName(args[2]) { out(["ok": false, "error": "That is not the name of a key."]) }
    let st = SecItemDelete(query(args[2]) as CFDictionary)
    out(["ok": st == errSecSuccess || st == errSecItemNotFound])

default:
    out(["ok": false, "error": "That command is not known."])
}
