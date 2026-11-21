import Foundation
import CryptoKit

/* INGENIUM 7.62 · THE PAGE AS ITS MAKER SIGNED IT (modules/r352.js: "your apps signed when shipped", part two).
   Before anything of the app's page runs, the shell reads it as Ingenium's own check reads a page (modules/r349.js,
   plain and checkPage): in its first MiB, the content of its first <meta name="ingenium-signature" content="...">
   and of its first <meta name="ingenium-build" content="..."> are left out, as those regular expressions find them;
   the rest is hashed with SHA-256 and compared with the release the signature carries. The signature itself, ECDSA
   P-256 with SHA-256 over the release's fields in PermitCore's fixed order (canon: keys sorted at every level, no
   spaces, strings as JSON.stringify writes them), is checked with the owner's public keys the shell carries
   (ShellCommon.swift, written from security/owner_keys.json). A package Fabrica made signed says so in shell.json
   ("signature": {"kid", "app"}), so a page whose signature was taken away is refused too.
   The same file is in the Mac shell and the iPhone and iPad shell; the Android shell (SignatureCheck.java) and the
   Windows shell (signature_check.h) take the same steps in the same order, and shells/common/test holds the cases all
   of them are tested against (this file by check_test.swift, on GitHub's Macs). */
enum SignatureCheck {
    typealias Key = (kid: String, x: String, y: String)

    /* what is wrong with a page, in the words the refused page says after "It " */
    static let lost = "has lost its signature"
    static let unreadable = "carries a signature that cannot be read"
    static let unknownKey = "is signed with a key this app does not know"
    static let otherKey = "is signed with another key than the one it was made with"
    static let otherApp = "is another app's page"
    static let badSignature = "does not match its own signature"
    static let changed = "changed since it was signed"
    static let missing = "is missing"

    static let window = 1 << 20
    static let sigPrefix: [UInt8] = Array("<meta name=\"ingenium-signature\" content=\"".utf8)
    static let buildPrefix: [UInt8] = Array("<meta name=\"ingenium-build\" content=\"".utf8)

    /// the page in the app's own folder: nil when it may open; otherwise what is wrong with it
    static func check(pageAt url: URL, marked: Bool, kid: String, app: String, keys: [Key]) -> String? {
        guard let data = try? Data(contentsOf: url, options: .alwaysMapped) else { return marked ? missing : nil }
        return check(page: data, marked: marked, kid: kid, app: app, keys: keys)
    }

    /// nil when the page may open; otherwise what is wrong with it
    static func check(page given: Data, marked: Bool, kid markKid: String, app markApp: String, keys: [Key]) -> String? {
        let page = given.startIndex == 0 ? given : Data(given)
        let win = [UInt8](page.prefix(window))
        guard let sig = find(win, sigPrefix, 8000, sigChars: true), sig.upperBound > sig.lowerBound else { return marked ? lost : nil }
        let build = find(win, buildPrefix, 40, sigChars: false)

        /* the signature: what it says, as r349 reads it (verify and bodyOk) */
        guard let json = b64u(String(decoding: win[sig], as: UTF8.self)) else { return unreadable }
        var reader = Json(Array(String(decoding: json, as: UTF8.self).utf16))
        guard let parsed = reader.whole(), case .obj(let f) = parsed,
              str(field(f, "kind")) == "ingenium-app-signature", isOne(field(f, "v")),
              let kid = str(field(f, "kid")), let sigText = str(field(f, "sig")),
              case .obj(let rel)? = field(f, "release") else { return unreadable }
        guard str(field(rel, "kind")) == "ingenium-app-release", isOne(field(rel, "v")),
              let app = str(field(rel, "app")), str(field(rel, "name")) != nil, str(field(rel, "version")) != nil,
              str(field(rel, "made")) != nil, case .obj(let fileList)? = field(rel, "files") else { return unreadable }
        var files: [[UInt16]: J] = [:]
        for (k, v) in fileList { files[k] = v }   /* a name given twice: the last one stands, as in JSON.parse */
        if files.isEmpty { return unreadable }
        for v in files.values {
            guard case .obj(let o) = v, let h = str(field(o, "sha256")), isHex64(h), case .num(_)? = field(o, "size") else { return unreadable }
        }
        guard case .obj(let want)? = files[Array("page".utf16)], let wantHash = str(field(want, "sha256")),
              case .num(let wantSize)? = field(want, "size") else { return unreadable }
        if marked && !markKid.isEmpty && markKid != kid { return otherKey }
        if marked && !markApp.isEmpty && markApp != app { return otherApp }
        guard let key = keys.first(where: { $0.kid == kid }) else { return unknownKey }
        guard let x = b64u(key.x), let y = b64u(key.y), x.count == 32, y.count == 32,
              let pub = try? P256.Signing.PublicKey(rawRepresentation: x + y) else { return unknownKey }
        var units: [UInt16] = []
        guard canon(.obj(rel), &units) else { return unreadable }
        let message = Data(String(decoding: units, as: UTF16.self).utf8)
        guard let rs = b64u(sigText), rs.count == 64, let signature = try? P256.Signing.ECDSASignature(rawRepresentation: rs),
              pub.isValidSignature(signature, for: message) else { return badSignature }

        /* the page, its signature's content and its build number left out, hashed and measured */
        var cuts: [Range<Int>] = [sig]
        if let b = build, b.upperBound > b.lowerBound {
            if b.lowerBound < sig.lowerBound { cuts.insert(b, at: 0) } else { cuts.append(b) }
        }
        var hasher = SHA256()
        var size = 0
        page.withUnsafeBytes { (raw: UnsafeRawBufferPointer) in
            var at = 0
            for c in cuts {
                hasher.update(bufferPointer: UnsafeRawBufferPointer(rebasing: raw[at..<c.lowerBound]))
                size += c.lowerBound - at
                at = c.upperBound
            }
            hasher.update(bufferPointer: UnsafeRawBufferPointer(rebasing: raw[at..<raw.count]))
            size += raw.count - at
        }
        let hex = hasher.finalize().map { String(format: "%02x", $0) }.joined()
        if hex != wantHash || Double(size) != wantSize { return changed }
        return nil
    }

    /// the page shown in place of the app's own: the template's three places filled, each escaped
    static func fill(_ template: String, name: String, file: String, why: String) -> String {
        return template.replacingOccurrences(of: "{{NAME}}", with: esc(name))
            .replacingOccurrences(of: "{{FILE}}", with: esc(file))
            .replacingOccurrences(of: "{{WHY}}", with: esc(why))
    }

    static func esc(_ s: String) -> String {
        var o = ""
        for ch in s {
            switch ch {
            case "&": o += "&amp;"
            case "<": o += "&lt;"
            case ">": o += "&gt;"
            case "\"": o += "&quot;"
            case "'": o += "&#39;"
            default: o.append(ch)
            }
        }
        return o
    }

    /* ------------------------------------------------ the two tags, found as r349's regular expressions find them */

    /// the content of the first tag that matches entirely within the bytes given, or nil
    static func find(_ w: [UInt8], _ prefix: [UInt8], _ limit: Int, sigChars: Bool) -> Range<Int>? {
        let m = prefix.count, n = w.count
        var i = 0
        while i + m + 2 <= n {
            if w[i] == prefix[0] {
                var j = 1
                while j < m && w[i + j] == prefix[j] { j += 1 }
                if j == m {
                    let s = i + m
                    var e = s
                    while e < n && e - s <= limit && allowed(w[e], sigChars) { e += 1 }
                    if e - s <= limit && e + 1 < n && w[e] == 0x22 && w[e + 1] == 0x3E { return s..<e }
                }
            }
            i += 1
        }
        return nil
    }

    static func allowed(_ c: UInt8, _ sigChars: Bool) -> Bool {
        if (c >= 0x41 && c <= 0x5A) || (c >= 0x61 && c <= 0x7A) || (c >= 0x30 && c <= 0x39) || c == 0x2D { return true }
        return sigChars ? c == 0x5F : c == 0x2E
    }

    /* ------------------------------------------------ JSON, read strictly (JSON.parse's grammar), as UTF-16 code units */

    indirect enum J {
        case null
        case bool(Bool)
        case num(Double)
        case str([UInt16])
        case arr([J])
        case obj([([UInt16], J)])
    }

    struct Json {
        let s: [UInt16]
        var i = 0
        init(_ s: [UInt16]) { self.s = s }

        mutating func whole() -> J? {
            guard let v = value() else { return nil }
            ws()
            return i == s.count ? v : nil
        }

        mutating func ws() {
            while i < s.count && (s[i] == 0x20 || s[i] == 0x09 || s[i] == 0x0A || s[i] == 0x0D) { i += 1 }
        }

        mutating func lit(_ word: String) -> Bool {
            let u = Array(word.utf16)
            guard i + u.count <= s.count, Array(s[i..<(i + u.count)]) == u else { return false }
            i += u.count
            return true
        }

        mutating func value() -> J? {
            ws()
            guard i < s.count else { return nil }
            switch s[i] {
            case 0x7B: return object()
            case 0x5B: return array()
            case 0x22: if let t = string() { return .str(t) } else { return nil }
            default:
                if lit("true") { return .bool(true) }
                if lit("false") { return .bool(false) }
                if lit("null") { return .null }
                return number()
            }
        }

        mutating func object() -> J? {
            var o: [([UInt16], J)] = []
            i += 1
            ws()
            if i < s.count && s[i] == 0x7D { i += 1; return .obj(o) }
            while true {
                ws()
                guard i < s.count, s[i] == 0x22, let k = string() else { return nil }
                ws()
                guard i < s.count, s[i] == 0x3A else { return nil }
                i += 1
                guard let v = value() else { return nil }
                o.append((k, v))
                ws()
                guard i < s.count else { return nil }
                let c = s[i]
                i += 1
                if c == 0x7D { return .obj(o) }
                if c != 0x2C { return nil }
            }
        }

        mutating func array() -> J? {
            var a: [J] = []
            i += 1
            ws()
            if i < s.count && s[i] == 0x5D { i += 1; return .arr(a) }
            while true {
                guard let v = value() else { return nil }
                a.append(v)
                ws()
                guard i < s.count else { return nil }
                let c = s[i]
                i += 1
                if c == 0x5D { return .arr(a) }
                if c != 0x2C { return nil }
            }
        }

        mutating func string() -> [UInt16]? {
            var b: [UInt16] = []
            i += 1
            while true {
                guard i < s.count else { return nil }
                let c = s[i]
                i += 1
                if c == 0x22 { return b }
                if c < 0x20 { return nil }
                if c != 0x5C { b.append(c); continue }
                guard i < s.count else { return nil }
                let e = s[i]
                i += 1
                switch e {
                case 0x22: b.append(0x22)
                case 0x5C: b.append(0x5C)
                case 0x2F: b.append(0x2F)
                case 0x62: b.append(0x08)
                case 0x66: b.append(0x0C)
                case 0x6E: b.append(0x0A)
                case 0x72: b.append(0x0D)
                case 0x74: b.append(0x09)
                case 0x75:
                    guard i + 4 <= s.count else { return nil }
                    var v: UInt16 = 0
                    for k in 0..<4 {
                        let d = s[i + k]
                        var x: UInt16 = 0
                        if d >= 0x30 && d <= 0x39 { x = d - 0x30 }
                        else if d >= 0x61 && d <= 0x66 { x = d - 0x61 + 10 }
                        else if d >= 0x41 && d <= 0x46 { x = d - 0x41 + 10 }
                        else { return nil }
                        v = v * 16 + x
                    }
                    i += 4
                    b.append(v)
                default: return nil
                }
            }
        }

        mutating func number() -> J? {
            let st = i
            if i < s.count && s[i] == 0x2D { i += 1 }
            guard i < s.count else { return nil }
            if s[i] == 0x30 { i += 1 }
            else if s[i] >= 0x31 && s[i] <= 0x39 { while i < s.count && s[i] >= 0x30 && s[i] <= 0x39 { i += 1 } }
            else { return nil }
            if i < s.count && s[i] == 0x2E {
                i += 1
                let d = i
                while i < s.count && s[i] >= 0x30 && s[i] <= 0x39 { i += 1 }
                if i == d { return nil }
            }
            if i < s.count && (s[i] == 0x65 || s[i] == 0x45) {
                i += 1
                if i < s.count && (s[i] == 0x2B || s[i] == 0x2D) { i += 1 }
                let d = i
                while i < s.count && s[i] >= 0x30 && s[i] <= 0x39 { i += 1 }
                if i == d { return nil }
            }
            guard let d = Double(String(decoding: s[st..<i], as: UTF16.self)) else { return nil }
            return .num(d)
        }
    }

    static func field(_ o: [([UInt16], J)], _ name: String) -> J? {
        let k = Array(name.utf16)
        return o.last(where: { $0.0 == k })?.1
    }

    static func str(_ v: J?) -> String? {
        if case .str(let u)? = v { return String(decoding: u, as: UTF16.self) }
        return nil
    }

    static func isOne(_ v: J?) -> Bool {
        if case .num(let d)? = v { return d == 1 }
        return false
    }

    static func isHex64(_ h: String) -> Bool {
        let u = Array(h.utf8)
        return u.count == 64 && u.allSatisfy { ($0 >= 0x30 && $0 <= 0x39) || ($0 >= 0x61 && $0 <= 0x66) }
    }

    /* ------------------------------------------------ canon: PermitCore's fixed order, as JSON.stringify writes each value */

    static func canon(_ v: J, _ out: inout [UInt16]) -> Bool {
        switch v {
        case .null: out += Array("null".utf16)
        case .bool(let b): out += Array((b ? "true" : "false").utf16)
        case .num(let d):
            guard let t = number(d) else { return false }
            out += Array(t.utf16)
        case .str(let t): quote(t, &out)
        case .arr(let a):
            out.append(0x5B)
            for (k, x) in a.enumerated() {
                if k > 0 { out.append(0x2C) }
                if !canon(x, &out) { return false }
            }
            out.append(0x5D)
        case .obj(let o):
            var last: [[UInt16]: J] = [:]
            for (k, x) in o { last[k] = x }
            let keys = last.keys.sorted { $0.lexicographicallyPrecedes($1) }   /* by UTF-16 code units, as sort() does */
            out.append(0x7B)
            for (k, name) in keys.enumerated() {
                if k > 0 { out.append(0x2C) }
                quote(name, &out)
                out.append(0x3A)
                if !canon(last[name]!, &out) { return false }
            }
            out.append(0x7D)
        }
        return true
    }

    /// a whole number as JavaScript writes it; any other number is not one a release carries
    static func number(_ d: Double) -> String? {
        guard d.isFinite, d == d.rounded(), abs(d) < 1e21 else { return nil }
        if d == 0 { return "0" }
        if abs(d) < 9.0e15 { return String(Int64(d)) }
        return String(format: "%.0f", d)
    }

    static func quote(_ s: [UInt16], _ out: inout [UInt16]) {
        out.append(0x22)
        var i = 0
        while i < s.count {
            let c = s[i]
            switch c {
            case 0x22: out += [0x5C, 0x22]
            case 0x5C: out += [0x5C, 0x5C]
            case 0x08: out += [0x5C, 0x62]
            case 0x0C: out += [0x5C, 0x66]
            case 0x0A: out += [0x5C, 0x6E]
            case 0x0D: out += [0x5C, 0x72]
            case 0x09: out += [0x5C, 0x74]
            default:
                if c < 0x20 { u4(c, &out) }
                else if c >= 0xD800 && c <= 0xDBFF {
                    if i + 1 < s.count && s[i + 1] >= 0xDC00 && s[i + 1] <= 0xDFFF { out.append(c); out.append(s[i + 1]); i += 1 }
                    else { u4(c, &out) }
                } else if c >= 0xDC00 && c <= 0xDFFF { u4(c, &out) }
                else { out.append(c) }
            }
            i += 1
        }
        out.append(0x22)
    }

    static func u4(_ c: UInt16, _ out: inout [UInt16]) {
        let h = Array(String(c, radix: 16).utf16)
        out += [0x5C, 0x75]
        if h.count < 4 { for _ in h.count..<4 { out.append(0x30) } }
        out += h
    }

    /* ------------------------------------------------ the rest */

    /// base64url without padding, as the page writes it; nil when it is not
    static func b64u(_ s: String) -> Data? {
        let u = Array(s.utf8)
        if u.count % 4 == 1 { return nil }
        var out = Data(capacity: u.count * 6 / 8)
        var acc: UInt32 = 0
        var bits: UInt32 = 0
        for c in u {
            var v: UInt32 = 0
            if c >= 0x41 && c <= 0x5A { v = UInt32(c) - 0x41 }
            else if c >= 0x61 && c <= 0x7A { v = UInt32(c) - 0x61 + 26 }
            else if c >= 0x30 && c <= 0x39 { v = UInt32(c) - 0x30 + 52 }
            else if c == 0x2D { v = 62 }
            else if c == 0x5F { v = 63 }
            else { return nil }
            acc = (acc << 6) | v
            bits += 6
            if bits >= 8 {
                bits -= 8
                out.append(UInt8((acc >> bits) & 0xFF))
                acc &= (1 << bits) - 1
            }
        }
        return out
    }
}
