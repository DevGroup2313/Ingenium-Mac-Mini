import Foundation
import WebKit

/* serves the bundled www folder (Contents/Resources/www) at the app scheme,
   carpe-app, as the iPhone and iPad shell does (../ios, the same file): one fixed
   address for the app's page, so its storage stays where it was from one start
   to the next. A file in a folder of www (css/room.css) is served from that folder. */
final class ShellSchemeHandler: NSObject, WKURLSchemeHandler {

    static let www: URL? = Bundle.main.resourceURL?.appendingPathComponent("www", isDirectory: true)

    func webView(_ webView: WKWebView, start urlSchemeTask: WKURLSchemeTask) {
        guard let url = urlSchemeTask.request.url, let root = ShellSchemeHandler.www else {
            urlSchemeTask.didFailWithError(URLError(.badURL))
            return
        }
        let parts = url.path.split(separator: "/").map { String($0).removingPercentEncoding ?? String($0) }
        if parts.isEmpty || parts.contains("..") {
            urlSchemeTask.didFailWithError(URLError(.fileDoesNotExist))
            return
        }
        var fileURL = root
        for p in parts { fileURL.appendPathComponent(p) }
        guard let data = try? Data(contentsOf: fileURL) else {
            let missing = HTTPURLResponse(url: url, statusCode: 404, httpVersion: "HTTP/1.1", headerFields: ["Content-Type": "text/plain"])!
            urlSchemeTask.didReceive(missing)
            urlSchemeTask.didReceive(Data())
            urlSchemeTask.didFinish()
            return
        }
        let ext = fileURL.pathExtension
        let response = HTTPURLResponse(url: url, statusCode: 200, httpVersion: "HTTP/1.1",
                                       headerFields: ["Content-Type": Self.mimeType(for: ext),
                                                      "Content-Length": String(data.count),
                                                      "Cache-Control": "no-cache"])!
        urlSchemeTask.didReceive(response)
        urlSchemeTask.didReceive(data)
        urlSchemeTask.didFinish()
    }

    func webView(_ webView: WKWebView, stop urlSchemeTask: WKURLSchemeTask) {}

    static func mimeType(for ext: String) -> String {
        switch ext.lowercased() {
        case "html", "htm": return "text/html; charset=utf-8"
        case "css":         return "text/css; charset=utf-8"
        case "js", "mjs":   return "text/javascript; charset=utf-8"
        case "json", "webmanifest", "map": return "application/json"
        case "png":         return "image/png"
        case "jpg", "jpeg": return "image/jpeg"
        case "gif":         return "image/gif"
        case "webp":        return "image/webp"
        case "svg":         return "image/svg+xml"
        case "ico":         return "image/x-icon"
        case "woff":        return "font/woff"
        case "woff2":       return "font/woff2"
        case "ttf":         return "font/ttf"
        case "otf":         return "font/otf"
        case "wasm":        return "application/wasm"
        case "mp3":         return "audio/mpeg"
        case "m4a":         return "audio/mp4"
        case "wav":         return "audio/wav"
        case "mp4":         return "video/mp4"
        case "webm":        return "video/webm"
        case "txt", "md":   return "text/plain; charset=utf-8"
        case "pdf":         return "application/pdf"
        default:            return "application/octet-stream"
        }
    }
}
