/* INGENIUM | Copyright (c) 2026 Yannie D. Forest. All rights reserved. NO LICENCE IS GRANTED.
   The Mac and iPhone shells' check of their page (shells/mac/Shell/SignatureCheck.swift, the same file in both), run on a
   Mac against the cases of vectors.json (make_vectors.mjs) with the two test keys they were made with: each answer must be
   the one the case names. By build-shells.yml, on GitHub's Mac:
     xcrun swiftc -O -parse-as-library source/shells/mac/Shell/SignatureCheck.swift source/shells/common/test/check_test.swift -o check_test
     ./check_test source/shells/common/test/vectors.json */
import Foundation

@main
struct CheckTest {
    static func main() {
        let path = CommandLine.arguments.count > 1 ? CommandLine.arguments[1] : "vectors.json"
        guard let data = FileManager.default.contents(atPath: path),
              let v = try? JSONSerialization.jsonObject(with: data) as? [String: Any],
              let ks = v["keys"] as? [[String]], let cases = v["cases"] as? [[String: Any]] else { print("FAIL the cases could not be read"); exit(1) }
        let keys: [SignatureCheck.Key] = ks.map { (kid: $0[0], x: $0[1], y: $0[2]) }
        var pass = 0, fail = 0
        for c in cases {
            var page = Data()
            for p in (c["parts"] as? [[String: Any]]) ?? [] {
                if let b = p["b64"] as? String, let d = Data(base64Encoded: b) { page.append(d) }
                else if let r = p["rep"] as? String, let n = p["count"] as? Int { page.append(Data(String(repeating: r, count: n).utf8)) }
            }
            let want = c["want"] as? String
            let got = SignatureCheck.check(page: page, marked: (c["marked"] as? Bool) ?? false, kid: (c["kid"] as? String) ?? "", app: (c["app"] as? String) ?? "", keys: keys)
            let ok = got == want
            if ok { pass += 1 } else { fail += 1 }
            print((ok ? "PASS " : "FAIL ") + ((c["name"] as? String) ?? "?") + ": " + (got.map { "It " + $0 + "." } ?? "opens")
                  + (ok ? "" : "  (wanted: " + (want.map { "It " + $0 + "." } ?? "opens") + ")"))
        }
        print("\(pass) passed, \(fail) failed, of \(pass + fail)")
        exit(fail == 0 && pass > 0 ? 0 : 1)
    }
}
