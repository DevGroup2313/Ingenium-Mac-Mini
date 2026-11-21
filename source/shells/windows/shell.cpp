// INGENIUM  |  Copyright (c) 2026 Yannie D. Forest. All rights reserved.
// NO LICENCE IS GRANTED. See LICENCE.txt.
//
// INGENIUM 6.5 · THE WINDOWS SHELL THAT FABRICA FILLS.
// The Windows counterpart of the Mac, iPhone and iPad shells (../mac, ../ios): one window holding Microsoft's WebView2,
// which runs the app's own page. Fabrica (modules/r170.js) makes an app from a copy of this program, on the device: it
// writes the app's icon into the icon this program carries (each size has room kept for it), and adds the app's files
// after the program's own code, followed by a mark that says where they begin (TRAILER below). This code is compiled
// once, on GitHub's Windows machines (.github/workflows/build-shells.yml).
//
// What the page is given, as the other shells give it:
//  - its own address, https://desk.app.test/, served from the files Fabrica added; no network for the page itself;
//  - its storage kept on this PC, for this app alone (%LOCALAPPDATA%\<the app's id>);
//  - saving a file asks where (window.ShellNative.saveFile and the family's bridge names, from shell.txt);
//  - links to other sites open in the browser, never inside the app;
//  - the microphone, camera and clipboard for the app's own page only;
//  - one copy at a time: a second start brings the open window forward;
//  - safe graphics (drawn without the graphics chip's help) on AMD Radeon graphics and after a start that did not finish,
//    as Ingenium itself does on Windows (desktop/app_win_64.py).
//
// INGENIUM 7.24 · AND ITS OWN INSTALLER. The owner approved the live preview of Fabrica's Windows installer (16 November
// 2026: "I approve of the preview, please push it everywhere"). From 7.24 an app Fabrica makes is one file, "<App> Setup.exe",
// which carries the installer's page (__setup/index.html, written by Fabrica in Ingenium's look) beside the app's own files:
//  - opened, it shows that page in a window drawn by the page alone (its own title bar, its minimise and its close): For
//    everyone on this PC (the default: Program Files, after Windows' administrator question, answered by a copy of this
//    program that Windows starts with an administrator's rights) or Just for me (the person's own apps folder,
//    %LOCALAPPDATA%\Programs, no question), a shortcut on the desktop (ticked), or Open without installing;
//  - installed, the program is the same file under the app's own name with installed.txt beside it, which makes it open as
//    the app; a Start menu shortcut and a desktop one carry the app's name (never ".exe") and its taskbar identity; Settings,
//    Apps lists it (the Uninstall key, under HKLM for everyone, HKCU for one person) with its version, publisher and size;
//  - an update goes where the app already is, and asks for the app to be closed first if it is open;
//  - Settings' Uninstall opens the same page from a copy of the program in %TEMP% (a program cannot remove its own file):
//    the program, its shortcuts and its entry go; the saved work goes too only when ticked;
//  - a program without the installer's page (an app made before 7.24) opens as the app, as before.
// From the command line (the administrator's half of For everyone, scripts, and the cloud check):
//    "<App> Setup.exe" --install [--scope=all|me] [--desktop=1|0] [--progress=<file>]   exit code 0 when installed
//    "<App>.exe" --uninstall --silent [--remove-data] [--from=<folder>]                  exit code 0 when removed
//    "<App> Setup.exe" --run                                                             the app, without installing
#define NOMINMAX
#include <windows.h>
#include <objbase.h>
#include <shellapi.h>
#include <shlobj.h>
#include <shlwapi.h>
#include <shobjidl.h>
#include <propsys.h>
#include <dwmapi.h>
#include <wincrypt.h>
#include <wrl.h>
#include <cstdint>
#include <cstdlib>
#include <filesystem>
#include <string>
#include <vector>
#include <map>
#include <deque>
#include <fstream>
#include <algorithm>
#include <cctype>
#include <cwctype>
#include "WebView2.h"
#include "WebView2EnvironmentOptions.h"
#include "shell_common.h"      // 7.62: the owner's public keys, and the page shown in place of one not as its maker signed it
#include "signature_check.h"   // 7.62: the check of the page against its maker's signature

using Microsoft::WRL::ComPtr;
using Microsoft::WRL::Callback;
using Microsoft::WRL::Make;

static const wchar_t* HOST = L"desk.app.test";
static const wchar_t* ORIGIN = L"https://desk.app.test";
static const char TRAILER[8] = {'I', 'N', 'G', 'W', 'W', 'W', '0', '1'};

static HWND g_hwnd = nullptr;
static ComPtr<ICoreWebView2Environment> g_env;
static ComPtr<ICoreWebView2Controller> g_controller;
static ComPtr<ICoreWebView2> g_webview;
static std::vector<char> g_payload;                                 // the app's files, as Fabrica added them (a zip, stored)
static std::map<std::string, std::pair<size_t, size_t>> g_files;    // path -> (start, length) in g_payload
static std::map<std::string, std::wstring> g_conf;                   // shell.txt
static std::wstring g_dataDir;
static bool g_pageTest = false, g_pageTestSent = false, g_started = false;
static std::wstring g_testLog, g_testSaveDir;
struct Save { std::wstring name; std::vector<BYTE> data; };
static std::deque<Save> g_saves;
static bool g_saving = false;
#define WM_APP_SAVE (WM_APP + 1)

/* 7.24: the installer */
enum class Mode { App, Setup, Uninstall };
static Mode g_mode = Mode::App;
static std::vector<std::wstring> g_args;
static std::wstring g_self;                     // this program's own file
static std::wstring g_id, g_title, g_name, g_version, g_publisher;
static std::wstring g_tempDir;                  // the installer's own folder in %TEMP%: its WebView2 data, the uninstaller's copy
static std::wstring g_from;                     // uninstalling: the folder the app is installed in
static std::wstring g_openExe;                  // installed: the program that "Open it now" starts
static std::wstring g_removeAfter;              // uninstalled from its own folder: that folder, emptied once this program ends
static bool g_setupTest = false, g_setupTestSent = false, g_busy = false, g_fitted = false;
#define WM_APP_SETUP (WM_APP + 2)               // news for the page from the work: wp 1 progress, 2 finished, 4 Windows asks
#define WM_APP_DRAG (WM_APP + 3)
static const wchar_t* MARK = L"installed.txt";

/* ------------------------------------------------------------------ words */

static std::wstring widen(const std::string& s) {
    if (s.empty()) return L"";
    int n = MultiByteToWideChar(CP_UTF8, 0, s.data(), (int)s.size(), nullptr, 0);
    std::wstring w(n, L'\0'); MultiByteToWideChar(CP_UTF8, 0, s.data(), (int)s.size(), &w[0], n); return w;
}
static std::string narrow(const std::wstring& w) {
    if (w.empty()) return "";
    int n = WideCharToMultiByte(CP_UTF8, 0, w.data(), (int)w.size(), nullptr, 0, nullptr, nullptr);
    std::string s(n, '\0'); WideCharToMultiByte(CP_UTF8, 0, w.data(), (int)w.size(), &s[0], n, nullptr, nullptr); return s;
}
static std::wstring conf(const char* key, const wchar_t* fallback) {
    auto it = g_conf.find(key); return it != g_conf.end() && !it->second.empty() ? it->second : fallback;
}
static void testLog(const std::wstring& line) {
    if (!(g_pageTest || g_setupTest) || g_testLog.empty()) return;
    std::ofstream f(std::filesystem::path(g_testLog), std::ios::app | std::ios::binary); std::string s = narrow(line) + "\n"; f.write(s.data(), s.size());
}
static bool startsWith(const std::wstring& s, const wchar_t* p) { return s.rfind(p, 0) == 0; }
static std::wstring lower(std::wstring s) { std::transform(s.begin(), s.end(), s.begin(), ::towlower); return s; }

/* a string as JSON writes it, safe inside a script */
static std::wstring jsonStr(const std::wstring& s) {
    static const wchar_t* HX = L"0123456789abcdef";
    std::wstring o = L"\"";
    for (wchar_t c : s) {
        if (c == L'"') o += L"\\\"";
        else if (c == L'\\') o += L"\\\\";
        else if (c < 0x20 || c == L'<' || c == L'>' || c == L'&' || c == 0x2028 || c == 0x2029) {
            o += L"\\u"; for (int k = 12; k >= 0; k -= 4) o += HX[(c >> k) & 15];
        } else o += c;
    }
    return o + L"\"";
}

/* ------------------------------------------------------------------ files */

static bool exists(const std::wstring& p) { return GetFileAttributesW(p.c_str()) != INVALID_FILE_ATTRIBUTES; }
static bool isFile(const std::wstring& p) { DWORD a = GetFileAttributesW(p.c_str()); return a != INVALID_FILE_ATTRIBUTES && !(a & FILE_ATTRIBUTE_DIRECTORY); }
static std::wstring dirOf(const std::wstring& p) { size_t i = p.find_last_of(L"\\/"); return i == std::wstring::npos ? L"." : p.substr(0, i); }
static std::wstring trimSlash(std::wstring p) { while (p.size() > 3 && (p.back() == L'\\' || p.back() == L'/')) p.pop_back(); return p; }

static bool writeFile(const std::wstring& path, const std::vector<BYTE>& data) {
    HANDLE h = CreateFileW(path.c_str(), GENERIC_WRITE, 0, nullptr, CREATE_ALWAYS, FILE_ATTRIBUTE_NORMAL, nullptr);
    if (h == INVALID_HANDLE_VALUE) return false;
    size_t done = 0; bool ok = true;
    while (done < data.size()) {
        DWORD part = (DWORD)std::min<size_t>(data.size() - done, 1 << 26), w = 0;
        if (!WriteFile(h, data.data() + done, part, &w, nullptr) || w == 0) { ok = false; break; }
        done += w;
    }
    CloseHandle(h); return ok;
}
static bool writeText(const std::wstring& path, const std::string& s) { return writeFile(path, std::vector<BYTE>(s.begin(), s.end())); }
static std::string readText(const std::wstring& path) {
    std::string s; HANDLE h = CreateFileW(path.c_str(), GENERIC_READ, FILE_SHARE_READ | FILE_SHARE_WRITE | FILE_SHARE_DELETE, nullptr, OPEN_EXISTING, 0, nullptr);
    if (h == INVALID_HANDLE_VALUE) return s;
    char buf[4096]; DWORD n = 0;
    while (s.size() < (1 << 20) && ReadFile(h, buf, sizeof(buf), &n, nullptr) && n) s.append(buf, n);
    CloseHandle(h); return s;
}
/* key=value, a line each (shell.txt, installed.txt) */
static std::map<std::wstring, std::wstring> keyValues(const std::string& t) {
    std::map<std::wstring, std::wstring> m; size_t a = 0;
    while (a < t.size()) {
        size_t b = t.find('\n', a); if (b == std::string::npos) b = t.size();
        std::string line = t.substr(a, b - a); if (!line.empty() && line.back() == '\r') line.pop_back();
        size_t eq = line.find('='); if (eq != std::string::npos) m[widen(line.substr(0, eq))] = widen(line.substr(eq + 1));
        a = b + 1;
    }
    return m;
}
/* ------------------------------------------------- the app's own files */

static uint32_t rd32(const char* p) { return (uint8_t)p[0] | ((uint8_t)p[1] << 8) | ((uint8_t)p[2] << 16) | ((uint32_t)(uint8_t)p[3] << 24); }
static uint16_t rd16(const char* p) { return (uint16_t)((uint8_t)p[0] | ((uint8_t)p[1] << 8)); }

/* the files after the program's code: [zip][8-byte length][TRAILER]; each file stored, as Fabrica writes them */
static bool readPayload() {
    wchar_t self[MAX_PATH * 4]; DWORD n = GetModuleFileNameW(nullptr, self, MAX_PATH * 4);
    if (!n) return false;
    HANDLE h = CreateFileW(self, GENERIC_READ, FILE_SHARE_READ, nullptr, OPEN_EXISTING, FILE_ATTRIBUTE_NORMAL, nullptr);
    if (h == INVALID_HANDLE_VALUE) return false;
    LARGE_INTEGER size; GetFileSizeEx(h, &size);
    bool ok = false;
    if (size.QuadPart > 16) {
        char tail[16]; LARGE_INTEGER at; at.QuadPart = size.QuadPart - 16; DWORD got = 0;
        SetFilePointerEx(h, at, nullptr, FILE_BEGIN);
        if (ReadFile(h, tail, 16, &got, nullptr) && got == 16 && memcmp(tail + 8, TRAILER, 8) == 0) {
            uint64_t len = (uint64_t)rd32(tail) | ((uint64_t)rd32(tail + 4) << 32);
            if (len > 0 && len < (uint64_t)size.QuadPart - 16) {
                g_payload.resize((size_t)len); at.QuadPart = size.QuadPart - 16 - (LONGLONG)len;
                SetFilePointerEx(h, at, nullptr, FILE_BEGIN);
                size_t done = 0; ok = true;
                while (done < g_payload.size()) {
                    DWORD part = (DWORD)std::min<size_t>(g_payload.size() - done, 1 << 26), r = 0;
                    if (!ReadFile(h, g_payload.data() + done, part, &r, nullptr) || r == 0) { ok = false; break; }
                    done += r;
                }
            }
        }
    }
    CloseHandle(h);
    if (!ok) { g_payload.clear(); return false; }
    // the zip's own directory, at its end
    const char* z = g_payload.data(); size_t zn = g_payload.size(); size_t eo = (size_t)-1;
    for (size_t i = zn >= 22 ? zn - 22 : 0; i + 1 > 0 && i + 65557 >= zn; i--) {
        if (rd32(z + i) == 0x06054b50) { eo = i; break; }
        if (i == 0) break;
    }
    if (eo == (size_t)-1) return false;
    uint16_t count = rd16(z + eo + 10); size_t p = rd32(z + eo + 16);
    for (uint16_t k = 0; k < count && p + 46 <= zn; k++) {
        if (rd32(z + p) != 0x02014b50) return false;
        uint16_t method = rd16(z + p + 10); uint32_t csize = rd32(z + p + 20);
        uint16_t nl = rd16(z + p + 28), xl = rd16(z + p + 30), cl = rd16(z + p + 32); uint32_t lo = rd32(z + p + 42);
        std::string name(z + p + 46, nl); p += 46 + nl + xl + cl;
        if (method != 0 || name.empty() || name.back() == '/' || lo + 30 > zn) continue;
        size_t start = lo + 30 + rd16(z + lo + 26) + rd16(z + lo + 28);
        if (start + csize <= zn) g_files[name] = {start, csize};
    }
    // shell.txt: page=, title=, id=, bridges= (one setting a line)
    auto it = g_files.find("shell.txt");
    if (it != g_files.end()) {
        std::string t(z + it->second.first, it->second.second); size_t a = 0;
        while (a < t.size()) {
            size_t b = t.find('\n', a); if (b == std::string::npos) b = t.size();
            std::string line = t.substr(a, b - a); if (!line.empty() && line.back() == '\r') line.pop_back();
            size_t eq = line.find('='); if (eq != std::string::npos) g_conf[line.substr(0, eq)] = widen(line.substr(eq + 1));
            a = b + 1;
        }
    }
    return true;
}

static const wchar_t* mimeFor(const std::string& path) {
    size_t d = path.find_last_of('.'); std::string e = d == std::string::npos ? "" : path.substr(d + 1);
    std::transform(e.begin(), e.end(), e.begin(), ::tolower);
    if (e == "html" || e == "htm") return L"text/html; charset=utf-8";
    if (e == "css") return L"text/css; charset=utf-8";
    if (e == "js" || e == "mjs") return L"text/javascript; charset=utf-8";
    if (e == "json" || e == "webmanifest" || e == "map") return L"application/json";
    if (e == "png") return L"image/png";
    if (e == "jpg" || e == "jpeg") return L"image/jpeg";
    if (e == "gif") return L"image/gif";
    if (e == "webp") return L"image/webp";
    if (e == "svg") return L"image/svg+xml";
    if (e == "ico") return L"image/x-icon";
    if (e == "woff") return L"font/woff";
    if (e == "woff2") return L"font/woff2";
    if (e == "ttf") return L"font/ttf";
    if (e == "otf") return L"font/otf";
    if (e == "wasm") return L"application/wasm";
    if (e == "mp3") return L"audio/mpeg";
    if (e == "m4a") return L"audio/mp4";
    if (e == "wav") return L"audio/wav";
    if (e == "mp4") return L"video/mp4";
    if (e == "webm") return L"video/webm";
    if (e == "txt" || e == "md") return L"text/plain; charset=utf-8";
    if (e == "pdf") return L"application/pdf";
    return L"application/octet-stream";
}

static std::string urlPath(const std::wstring& uri) {
    // https://desk.app.test/a/b.html?x#y -> a/b.html, with %XX read back into bytes
    std::wstring w = uri.substr(wcslen(ORIGIN));
    size_t q = w.find_first_of(L"?#"); if (q != std::wstring::npos) w = w.substr(0, q);
    std::string s = narrow(w), out;
    for (size_t i = 0; i < s.size(); i++) {
        if (s[i] == '%' && i + 2 < s.size() && isxdigit((unsigned char)s[i + 1]) && isxdigit((unsigned char)s[i + 2])) {
            out += (char)strtol(s.substr(i + 1, 2).c_str(), nullptr, 16); i += 2;
        } else out += s[i];
    }
    while (!out.empty() && out[0] == '/') out.erase(0, 1);
    return out;
}

static const char* STAND_IN =
    "<!doctype html><html lang=\"en\"><head><meta charset=\"utf-8\"><title>Ingenium shell</title>"
    "<style>body{margin:0;min-height:100vh;display:grid;place-items:center;font:17px/1.5 'Segoe UI',system-ui,sans-serif;"
    "background:#f5f3f7;color:#221a2e;text-align:center;padding:24px;box-sizing:border-box}</style></head><body><main>"
    "<h1>Ingenium shell</h1><p>Fabrica puts an app's own page here when it makes the app for Windows.<br>"
    "This page is only the stand-in the shell is built with.</p></main></body></html>";

/* ------------------------------------------------------------- the page */

static std::wstring bridgeScript() {
    std::wstring names = conf("bridges", L"CarpeNative"), lines = L"window.ShellNative = { saveFile: send };";
    size_t a = 0;
    while (a <= names.size()) {
        size_t b = names.find(L',', a); if (b == std::wstring::npos) b = names.size();
        std::wstring n = names.substr(a, b - a); a = b + 1;
        bool good = !n.empty() && (iswalpha(n[0]) || n[0] == L'_');
        for (wchar_t c : n) if (!(iswalnum(c) || c == L'_')) good = false;
        if (!good || n == L"ShellNative") continue;
        if (n == L"pywebview") lines += L"window.pywebview = window.pywebview || {}; window.pywebview.api = window.pywebview.api || {}; window.pywebview.api.save_file = send;";
        else lines += L"window." + n + L" = window." + n + L" || {}; window." + n + L".saveFile = send;";
    }
    return L"(function () { if (location.origin !== 'https://desk.app.test') return;"
           L" var send = function (name, mime, b64) { try { window.chrome.webview.postMessage('save\\n' + String(name || 'download').replace(/[\\r\\n]+/g, ' ') + '\\n' + String(mime || '') + '\\n' + String(b64 || '')); return true; } catch (e) { return false; } };"
           + lines + L" })();";
}

static const wchar_t* ERROR_CATCHER =
    L"window.__shellErrors = [];"
    L"window.addEventListener('error', function (e) { try { if (e && e.message) window.__shellErrors.push(String(e.message) + ' (line ' + (e.lineno || 0) + ')'); } catch (_) {} });"
    L"window.addEventListener('unhandledrejection', function (e) { try { window.__shellErrors.push('promise: ' + String(e && e.reason && (e.reason.message || e.reason))); } catch (_) {} });";

/* only in the cloud build's check: the page, its storage (what an earlier start kept, and IndexedDB), the clipboard
   written and read back, then a file saved */
static std::wstring pageTestScript() {
    std::wstring save = g_testSaveDir.empty() ? L"false" : L"true";
    return L"(function () { setTimeout(function () {"
           L" var log = function (line) { try { window.chrome.webview.postMessage('log\\n' + line); } catch (e) {} };"
           L" var b = document.body, errs = window.__shellErrors || [];"
           L" var kept = null; try { kept = localStorage.getItem('__shell_kept'); localStorage.setItem('__shell_kept', String(Date.now())); } catch (e) {}"
           L" var idb = new Promise(function (res) { try { var rq = indexedDB.open('__shell_check', 1);"
           L"  rq.onupgradeneeded = function () { rq.result.createObjectStore('s'); }; rq.onerror = function () { res(false); };"
           L"  rq.onsuccess = function () { var db = rq.result, tx = db.transaction('s', 'readwrite'); tx.objectStore('s').put('ok', 'k');"
           L"   tx.oncomplete = function () { var g = db.transaction('s').objectStore('s').get('k'); g.onsuccess = function () { res(g.result === 'ok'); }; g.onerror = function () { res(false); }; };"
           L"   tx.onerror = function () { res(false); }; }; } catch (e) { res(false); } });"
           L" idb.then(function (idbOk) {"
           L"  var r = { title: document.title, text: ((b && b.innerText) || '').length, errors: errs.length, first: errs.slice(0, 3),"
           L"   bridge: !!(window.ShellNative && window.ShellNative.saveFile),"
           L"   storage: (function () { try { localStorage.setItem('__shell_check', '1'); var ok = localStorage.getItem('__shell_check') === '1'; localStorage.removeItem('__shell_check'); return ok; } catch (e) { return false; } })(),"
           L"   kept: kept, idb: idbOk, origin: location.origin, href: location.href };"
           L"  log('SHELL_PAGETEST PAGE ' + JSON.stringify(r));"
           L"  var word = 'clip check 6.5';"
           L"  return navigator.clipboard.writeText(word).then(function () { return navigator.clipboard.readText(); }).then(function (v) {"
           L"   log('SHELL_PAGETEST CLIP ' + (v === word ? 'ok: written and read back' : 'unexpected ' + JSON.stringify(v).slice(0, 200))); })"
           L"  .catch(function (e) { log('SHELL_PAGETEST CLIP refused: ' + String((e && e.message) || e)); });"
           L" }).then(function () { if (" + save + L") window.ShellNative.saveFile('shell-check.txt', 'text/plain', btoa('saved by the page')); log('SHELL_PAGETEST DONE'); });"
           L"}, 6000); })();";
}

static bool ownUri(const std::wstring& uri) { return startsWith(lower(uri), L"https://desk.app.test/") || lower(uri) == L"https://desk.app.test"; }

static void openOutside(const std::wstring& uri) {
    std::wstring l = lower(uri);
    if (startsWith(l, L"http://") || startsWith(l, L"https://") || startsWith(l, L"mailto:"))
        ShellExecuteW(nullptr, L"open", uri.c_str(), nullptr, nullptr, SW_SHOWNORMAL);
}

/* ------------------------------------------------------------- saving */

static std::wstring safeName(std::wstring n) {
    for (auto& c : n) if (wcschr(L"\\/:*?\"<>|", c) || c < 32) c = L'_';
    while (!n.empty() && (n.back() == L' ' || n.back() == L'.')) n.pop_back();
    if (n.size() > 120) n = n.substr(n.size() - 120);
    return n.empty() ? L"download" : n;
}

/* one save at a time, each asked where it goes (the window's own procedure runs it, never inside WebView2's event) */
static void nextSave() {
    if (g_saving || g_saves.empty()) return;
    g_saving = true;
    Save s = std::move(g_saves.front()); g_saves.pop_front();
    std::wstring name = safeName(s.name);
    if (!g_testSaveDir.empty()) {
        CreateDirectoryW(g_testSaveDir.c_str(), nullptr);
        bool ok = writeFile(g_testSaveDir + L"\\" + name, s.data);
        testLog(L"SHELL_PAGETEST SAVED " + s.name + (ok ? L" ok" : L" failed"));
    } else {
        ComPtr<IFileSaveDialog> dlg;
        if (SUCCEEDED(CoCreateInstance(CLSID_FileSaveDialog, nullptr, CLSCTX_INPROC_SERVER, IID_PPV_ARGS(&dlg)))) {
            dlg->SetFileName(name.c_str());
            DWORD opts = 0; dlg->GetOptions(&opts); dlg->SetOptions(opts | FOS_OVERWRITEPROMPT | FOS_FORCEFILESYSTEM);
            if (SUCCEEDED(dlg->Show(g_hwnd))) {
                ComPtr<IShellItem> item; PWSTR path = nullptr;
                if (SUCCEEDED(dlg->GetResult(&item)) && SUCCEEDED(item->GetDisplayName(SIGDN_FILESYSPATH, &path))) {
                    if (!writeFile(path, s.data))
                        MessageBoxW(g_hwnd, (L"The file could not be saved:\n" + std::wstring(path)).c_str(), conf("title", L"App").c_str(), MB_OK | MB_ICONWARNING);
                    CoTaskMemFree(path);
                }
            }
        }
    }
    g_saving = false;
    if (!g_saves.empty()) PostMessageW(g_hwnd, WM_APP_SAVE, 0, 0);
}

static void onSetupMessage(const std::vector<std::wstring>& a);

static void onMessage(const std::wstring& msg) {
    size_t a = msg.find(L'\n'); if (a == std::wstring::npos) return;
    std::wstring op = msg.substr(0, a);
    if (op == L"log") { testLog(msg.substr(a + 1)); return; }
    if (op == L"setup") {   // only the installer's own page, in the installer's window
        if (g_mode == Mode::App) return;
        std::vector<std::wstring> parts; size_t p = 0;
        while (true) { size_t q = msg.find(L'\n', p); parts.push_back(msg.substr(p, q == std::wstring::npos ? std::wstring::npos : q - p)); if (q == std::wstring::npos) break; p = q + 1; }
        onSetupMessage(parts); return;
    }
    if (op != L"save" || g_mode != Mode::App) return;
    size_t b = msg.find(L'\n', a + 1); if (b == std::wstring::npos) return;
    size_t c = msg.find(L'\n', b + 1); if (c == std::wstring::npos) return;
    Save s; s.name = msg.substr(a + 1, b - a - 1);
    std::wstring b64 = msg.substr(c + 1);
    DWORD n = 0;
    if (!CryptStringToBinaryW(b64.c_str(), (DWORD)b64.size(), CRYPT_STRING_BASE64, nullptr, &n, nullptr, nullptr)) return;
    s.data.resize(n);
    if (n && !CryptStringToBinaryW(b64.c_str(), (DWORD)b64.size(), CRYPT_STRING_BASE64, s.data.data(), &n, nullptr, nullptr)) return;
    s.data.resize(n);
    g_saves.push_back(std::move(s));
    PostMessageW(g_hwnd, WM_APP_SAVE, 0, 0);
}

/* ------------------------------------------------------- safe graphics */

static bool graphicsChipIsAmd() {
    HKEY k; bool amd = false;
    if (RegOpenKeyExW(HKEY_LOCAL_MACHINE, L"SYSTEM\\CurrentControlSet\\Control\\Class\\{4d36e968-e325-11ce-bfc1-08002be10318}", 0, KEY_READ, &k) != ERROR_SUCCESS) return false;
    for (DWORD i = 0; i < 16 && !amd; i++) {
        wchar_t sub[16]; DWORD sl = 16;
        if (RegEnumKeyExW(k, i, sub, &sl, nullptr, nullptr, nullptr, nullptr) != ERROR_SUCCESS) break;
        wchar_t desc[256] = {0}; DWORD dl = sizeof(desc);
        if (RegGetValueW(k, sub, L"DriverDesc", RRF_RT_REG_SZ, nullptr, desc, &dl) == ERROR_SUCCESS) {
            std::wstring d = lower(desc);
            if (d.find(L"amd") != std::wstring::npos || d.find(L"radeon") != std::wstring::npos || d.find(L"ati ") != std::wstring::npos) amd = true;
        }
    }
    RegCloseKey(k); return amd;
}

/* ------------------------------------------------------------- 7.24: installing */

static bool hasArg(const wchar_t* a) { for (auto& s : g_args) if (s == a) return true; return false; }
static std::wstring argVal(const wchar_t* key) {
    std::wstring k = std::wstring(key) + L"=";
    for (auto& s : g_args) if (startsWith(s, k.c_str())) return s.substr(k.size());
    return L"";
}
/* an id that names one folder: letters or digits in it, no "..", not begun by a dot (the saved work's folder is removed by it) */
static bool goodId(const std::wstring& id) {
    if (id.empty() || id.size() > 200 || id[0] == L'.' || id.find(L"..") != std::wstring::npos) return false;
    for (wchar_t c : id) if (iswalnum(c)) return true;
    return false;
}
/* the name Windows shows and keeps the program under, as Fabrica's winName makes it */
static std::wstring fileName(std::wstring n) {
    for (auto& c : n) if (wcschr(L"\\/:*?\"<>|", c) || c < 32 || c == 127) c = L' ';
    std::wstring o; for (wchar_t c : n) if (!(c == L' ' && (o.empty() || o.back() == L' '))) o += c;
    while (!o.empty() && (o.back() == L' ' || o.back() == L'.')) o.pop_back();
    if (o.size() > 60) o = o.substr(0, 60);
    while (!o.empty() && (o.back() == L' ' || o.back() == L'.')) o.pop_back();
    if (o.empty()) o = L"App";
    std::wstring l = lower(o), stem = l.substr(0, l.find(L'.'));
    static const wchar_t* RESERVED[] = {L"con", L"prn", L"aux", L"nul", L"com1", L"com2", L"com3", L"com4", L"com5", L"com6", L"com7", L"com8", L"com9",
                                        L"lpt1", L"lpt2", L"lpt3", L"lpt4", L"lpt5", L"lpt6", L"lpt7", L"lpt8", L"lpt9"};
    for (auto r : RESERVED) if (stem == r) { o += L" app"; break; }
    return o;
}
static std::wstring known(REFKNOWNFOLDERID f) {
    PWSTR p = nullptr; std::wstring r;
    if (SUCCEEDED(SHGetKnownFolderPath(f, KF_FLAG_CREATE, nullptr, &p)) && p) r = p;
    if (p) CoTaskMemFree(p);
    return r;
}
/* Program Files for everyone; for one person, their own apps folder (%LOCALAPPDATA%\Programs, where Windows itself puts one person's apps) */
static std::wstring programsBase(bool all) {
    std::wstring p = known(all ? FOLDERID_ProgramFiles : FOLDERID_UserProgramFiles);
    if (p.empty() && !all) { std::wstring l = known(FOLDERID_LocalAppData); if (!l.empty()) { p = l + L"\\Programs"; SHCreateDirectoryExW(nullptr, p.c_str(), nullptr); } }
    return p;
}
static std::wstring startFolder(bool all) { return known(all ? FOLDERID_CommonPrograms : FOLDERID_Programs); }
static std::wstring deskFolder(bool all) { return known(all ? FOLDERID_PublicDesktop : FOLDERID_Desktop); }
static std::wstring dataDirOf(const std::wstring& id) { std::wstring l = known(FOLDERID_LocalAppData); return l.empty() || !goodId(id) ? L"" : l + L"\\" + id; }
static std::wstring tempBase() { wchar_t t[MAX_PATH + 2] = {0}; DWORD n = GetTempPathW(MAX_PATH + 1, t); return n ? trimSlash(t) : L""; }
static std::wstring uninstallKey() { return L"Software\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\" + g_id; }
static std::wstring regText(HKEY root, const std::wstring& key, const wchar_t* name) {
    wchar_t buf[2048] = {0}; DWORD n = sizeof(buf);
    return RegGetValueW(root, key.c_str(), name, RRF_RT_REG_SZ, nullptr, buf, &n) == ERROR_SUCCESS ? std::wstring(buf) : L"";
}
static bool elevated() {
    HANDLE t = nullptr; TOKEN_ELEVATION e = {}; DWORD n = 0; bool r = false;
    if (OpenProcessToken(GetCurrentProcess(), TOKEN_QUERY, &t)) { if (GetTokenInformation(t, TokenElevation, &e, sizeof(e), &n)) r = e.TokenIsElevated != 0; CloseHandle(t); }
    return r;
}
/* the app itself open (its one-copy mark, as wWinMain makes it) */
static bool appOpen() {
    HANDLE m = OpenMutexW(SYNCHRONIZE, FALSE, (L"Local\\" + g_id + L".single").c_str());
    if (!m) return false;
    CloseHandle(m); return true;
}
static bool windowsDark() {
    DWORD v = 1, n = sizeof(v);
    return RegGetValueW(HKEY_CURRENT_USER, L"Software\\Microsoft\\Windows\\CurrentVersion\\Themes\\Personalize", L"AppsUseLightTheme",
                        RRF_RT_REG_DWORD, nullptr, &v, &n) == ERROR_SUCCESS && v == 0;
}

/* where an install is: installed.txt in its folder says what it made (its program's file, its shortcuts) */
struct Place { bool found = false, all = false, desktop = false; std::wstring dir, version, exe; };
static std::map<std::wstring, std::wstring> markOf(const std::wstring& dir) { return keyValues(readText(dir + L"\\" + MARK)); }
static Place placeAt(const std::wstring& dirIn) {
    Place p; std::wstring dir = trimSlash(dirIn); auto m = markOf(dir);
    if (dir.empty() || m[L"id"] != g_id) return p;
    p.found = true; p.all = m[L"scope"] == L"all"; p.dir = dir; p.version = m[L"version"];
    p.exe = dir + L"\\" + (m[L"file"].empty() ? g_name + L".exe" : m[L"file"]);
    p.desktop = !m[L"desktop"].empty() && isFile(m[L"desktop"]);
    return p;
}
/* this app installed on this PC: for this person first, then for everyone */
static Place installedPlace() {
    for (int pass = 0; pass < 2; pass++) {
        Place p = placeAt(regText(pass == 0 ? HKEY_CURRENT_USER : HKEY_LOCAL_MACHINE, uninstallKey(), L"InstallLocation"));
        if (p.found) { std::wstring v = regText(pass == 0 ? HKEY_CURRENT_USER : HKEY_LOCAL_MACHINE, uninstallKey(), L"DisplayVersion"); if (!v.empty()) p.version = v; return p; }
    }
    return Place();
}
static bool installedHere() { return placeAt(dirOf(g_self)).found; }
static std::wstring placeJson(const Place& p) {
    if (!p.found) return L"null";
    return L"{\"all\":" + std::wstring(p.all ? L"true" : L"false") + L",\"dir\":" + jsonStr(p.dir) + L",\"version\":" + jsonStr(p.version) +
           L",\"desktop\":" + (p.desktop ? L"true" : L"false") + L"}";
}

/* a shortcut named as the app, with its icon and the same taskbar identity as the app when it runs */
static bool makeLink(const std::wstring& lnk, const std::wstring& exe) {
    ComPtr<IShellLinkW> sl; ComPtr<IPersistFile> pf; ComPtr<IPropertyStore> ps;
    if (FAILED(CoCreateInstance(CLSID_ShellLink, nullptr, CLSCTX_INPROC_SERVER, IID_PPV_ARGS(&sl)))) return false;
    sl->SetPath(exe.c_str()); sl->SetWorkingDirectory(dirOf(exe).c_str()); sl->SetIconLocation(exe.c_str(), 0); sl->SetDescription(g_title.c_str());
    if (SUCCEEDED(sl.As(&ps))) {
        static const PROPERTYKEY AUMID = {{0x9F4C2855, 0x9F79, 0x4B39, {0xA8, 0xD0, 0xE1, 0xD4, 0x2D, 0xE1, 0xD5, 0xF3}}, 5};   // System.AppUserModel.ID
        PROPVARIANT v; PropVariantInit(&v);
        size_t bytes = (g_id.size() + 1) * sizeof(wchar_t);
        v.pwszVal = (LPWSTR)CoTaskMemAlloc(bytes);
        if (v.pwszVal) { v.vt = VT_LPWSTR; memcpy(v.pwszVal, g_id.c_str(), bytes); ps->SetValue(AUMID, v); ps->Commit(); }
        PropVariantClear(&v);
    }
    return SUCCEEDED(sl.As(&pf)) && SUCCEEDED(pf->Save(lnk.c_str(), TRUE));
}
static bool linkTo(const std::wstring& lnk, const std::wstring& exe) {
    if (!isFile(lnk)) return false;
    ComPtr<IShellLinkW> sl; ComPtr<IPersistFile> pf; wchar_t path[MAX_PATH * 4] = {0};
    if (FAILED(CoCreateInstance(CLSID_ShellLink, nullptr, CLSCTX_INPROC_SERVER, IID_PPV_ARGS(&sl))) || FAILED(sl.As(&pf)) || FAILED(pf->Load(lnk.c_str(), STGM_READ))) return false;
    if (FAILED(sl->GetPath(path, MAX_PATH * 4, nullptr, SLGP_RAWPATH))) return false;
    return lower(path) == lower(exe);
}
/* Settings, Apps: its name, version, publisher, icon, size and day, and how to uninstall it */
static bool writeEntry(bool all, const std::wstring& dir, const std::wstring& exe) {
    HKEY k = nullptr;
    if (RegCreateKeyExW(all ? HKEY_LOCAL_MACHINE : HKEY_CURRENT_USER, uninstallKey().c_str(), 0, nullptr, 0, KEY_SET_VALUE | KEY_QUERY_VALUE, nullptr, &k, nullptr) != ERROR_SUCCESS) return false;
    auto sz = [&](const wchar_t* n, const std::wstring& v) { return RegSetValueExW(k, n, 0, REG_SZ, (const BYTE*)v.c_str(), (DWORD)((v.size() + 1) * sizeof(wchar_t))) == ERROR_SUCCESS; };
    auto dw = [&](const wchar_t* n, DWORD v) { return RegSetValueExW(k, n, 0, REG_DWORD, (const BYTE*)&v, sizeof(v)) == ERROR_SUCCESS; };
    WIN32_FILE_ATTRIBUTE_DATA fa = {}; DWORD kb = 0;
    if (GetFileAttributesExW(exe.c_str(), GetFileExInfoStandard, &fa)) kb = (DWORD)(((((ULONGLONG)fa.nFileSizeHigh) << 32) | fa.nFileSizeLow) / 1024);
    SYSTEMTIME st; GetLocalTime(&st);
    auto two = [](int v) { return std::wstring(v < 10 ? L"0" : L"") + std::to_wstring(v); };
    bool ok = sz(L"DisplayName", g_title) && sz(L"DisplayVersion", g_version) && sz(L"DisplayIcon", exe + L",0") && sz(L"InstallLocation", dir) &&
              sz(L"UninstallString", L"\"" + exe + L"\" --uninstall") && sz(L"QuietUninstallString", L"\"" + exe + L"\" --uninstall --silent") &&
              sz(L"InstallDate", std::to_wstring(st.wYear) + two(st.wMonth) + two(st.wDay)) && dw(L"NoModify", 1) && dw(L"NoRepair", 1) && dw(L"EstimatedSize", kb);
    if (ok) { if (!g_publisher.empty()) ok = sz(L"Publisher", g_publisher); else RegDeleteValueW(k, L"Publisher"); }
    RegCloseKey(k); return ok;
}

/* how far the work is: to the window (in this program), or into a file the window's program reads (the administrator's copy) */
struct Progress { HWND hwnd = nullptr; std::wstring file; int last = -1, lastStep = -1; };
static void tell(Progress& p, int pct, int step) {
    if (pct == p.last && step == p.lastStep) return;
    p.last = pct; p.lastStep = step;
    if (p.hwnd) PostMessageW(p.hwnd, WM_APP_SETUP, 1, MAKELPARAM(pct, step));
    if (!p.file.empty()) writeText(p.file, std::to_string(pct) + " " + std::to_string(step));
}
static DWORD CALLBACK copied(LARGE_INTEGER total, LARGE_INTEGER done, LARGE_INTEGER, LARGE_INTEGER, DWORD, DWORD, HANDLE, HANDLE, LPVOID ctx) {
    if (total.QuadPart > 0) tell(*(Progress*)ctx, (int)(4 + 80 * done.QuadPart / total.QuadPart), 0);
    return PROGRESS_CONTINUE;
}

/* installs this program: 0 when done, else what stopped it (the page words each): 3 the app is open, 4 a file could not be
   written, 5 an administrator is needed, 6 the entry in Settings, 7 the shortcuts */
static int doInstall(bool all, bool desktop, Progress& pr) {
    if (appOpen()) return 3;
    if (all && !elevated()) return 5;
    tell(pr, 2, 0);
    Place was = installedPlace();
    std::wstring base = programsBase(all);
    if (base.empty()) return 4;
    std::wstring dir = was.found && was.all == all ? was.dir : base + L"\\" + g_name, file = g_name + L".exe", exe = dir + L"\\" + file;
    int made = SHCreateDirectoryExW(nullptr, dir.c_str(), nullptr);
    if (made != ERROR_SUCCESS && made != ERROR_ALREADY_EXISTS && made != ERROR_FILE_EXISTS) return made == ERROR_ACCESS_DENIED ? 5 : 4;
    auto old = markOf(dir);
    if (lower(g_self) != lower(exe)) {
        std::wstring tmp = exe + L".new";
        if (!CopyFileExW(g_self.c_str(), tmp.c_str(), copied, &pr, nullptr, 0)) { DWORD e = GetLastError(); DeleteFileW(tmp.c_str()); return e == ERROR_ACCESS_DENIED ? 5 : 4; }
        if (!MoveFileExW(tmp.c_str(), exe.c_str(), MOVEFILE_REPLACE_EXISTING | MOVEFILE_WRITE_THROUGH)) { DWORD e = GetLastError(); DeleteFileW(tmp.c_str()); return e == ERROR_ACCESS_DENIED ? 5 : 3; }
    }
    tell(pr, 86, 1);
    std::wstring start = startFolder(all), desk = deskFolder(all), startLnk = start + L"\\" + g_name + L".lnk", deskLnk = desk + L"\\" + g_name + L".lnk";
    std::wstring oldExe = old[L"file"].empty() ? L"" : dir + L"\\" + old[L"file"];
    if (!oldExe.empty() && lower(oldExe) != lower(exe)) {   // an earlier version under another name: its program and shortcuts go
        for (const wchar_t* k : {L"start", L"desktop"}) if (!old[k].empty() && linkTo(old[k], oldExe)) DeleteFileW(old[k].c_str());
        DeleteFileW(oldExe.c_str());
    }
    bool ok = !start.empty() && makeLink(startLnk, exe);
    if (desktop) ok = !desk.empty() && makeLink(deskLnk, exe) && ok;
    else if (linkTo(deskLnk, exe)) DeleteFileW(deskLnk.c_str());
    if (ok) { SHChangeNotify(SHCNE_CREATE, SHCNF_PATHW, startLnk.c_str(), nullptr); if (desktop) SHChangeNotify(SHCNE_CREATE, SHCNF_PATHW, deskLnk.c_str(), nullptr); }
    std::wstring mark = L"id=" + g_id + L"\r\nscope=" + (all ? L"all" : L"me") + L"\r\nversion=" + g_version + L"\r\nfile=" + file +
                        L"\r\nstart=" + startLnk + L"\r\n" + (desktop ? L"desktop=" + deskLnk + L"\r\n" : L"");
    if (!writeText(dir + L"\\" + MARK, narrow(mark))) return 4;
    if (!ok) return 7;
    tell(pr, 93, 2);
    if (!writeEntry(all, dir, exe)) return 6;
    tell(pr, 100, 3);
    return 0;
}

/* uninstalls the app in that folder: 0 when done, else 3 the app is open, 5 an administrator is needed, 6 the entry in Settings,
   8 the folder holds no install of this app, 9 its program could not be removed */
static int doUninstall(const std::wstring& dirIn, Progress& pr) {
    Place p = placeAt(dirIn);
    if (!p.found) return 8;
    if (appOpen()) return 3;
    if (p.all && !elevated()) return 5;
    tell(pr, 8, 0);
    auto m = markOf(p.dir);
    for (const wchar_t* k : {L"start", L"desktop"})
        if (!m[k].empty() && linkTo(m[k], p.exe)) { DeleteFileW(m[k].c_str()); SHChangeNotify(SHCNE_DELETE, SHCNF_PATHW, m[k].c_str(), nullptr); }
    tell(pr, 40, 1);
    HKEY root = p.all ? HKEY_LOCAL_MACHINE : HKEY_CURRENT_USER;
    if (lower(trimSlash(regText(root, uninstallKey(), L"InstallLocation"))) == lower(p.dir)) {
        LSTATUS s = RegDeleteTreeW(root, uninstallKey().c_str());
        if (s != ERROR_SUCCESS && s != ERROR_FILE_NOT_FOUND) return s == ERROR_ACCESS_DENIED ? 5 : 6;
        RegDeleteKeyExW(root, uninstallKey().c_str(), KEY_WOW64_64KEY, 0);
    }
    tell(pr, 70, 2);
    if (lower(p.exe) == lower(g_self)) g_removeAfter = p.dir;   // this very program: its folder goes once it ends
    else {
        if (isFile(p.exe) && !DeleteFileW(p.exe.c_str())) return GetLastError() == ERROR_ACCESS_DENIED ? 5 : 9;
        DeleteFileW((p.dir + L"\\" + MARK).c_str());
        RemoveDirectoryW(p.dir.c_str());   // only when nothing else is in it
    }
    tell(pr, 100, 3);
    return 0;
}

/* the saved work: the app's own folder in %LOCALAPPDATA%, its WebView2 storage with it */
static bool removeTree(const std::wstring& dir) {
    if (dir.size() < 8 || !exists(dir)) return true;
    std::wstring from = dir; from.push_back(L'\0');
    SHFILEOPSTRUCTW op = {}; op.wFunc = FO_DELETE; op.pFrom = from.c_str(); op.fFlags = FOF_NO_UI;
    return SHFileOperationW(&op) == 0 && !op.fAnyOperationsAborted && !exists(dir);
}

/* after this program ends: a hidden cmd that tries again for a while, as WebView2's own processes leave a moment later */
static void afterEnd(const std::wstring& test, const std::wstring& acts) {
    wchar_t sys[MAX_PATH] = {0}; if (!GetSystemDirectoryW(sys, MAX_PATH)) return;
    std::wstring cmd = std::wstring(sys) + L"\\cmd.exe";
    std::wstring line = L"\"" + cmd + L"\" /d /c \"for /l %i in (1,1,40) do @(ping -n 2 127.0.0.1 >nul & " + acts + L" & if not exist \"" + test + L"\" exit)\"";
    STARTUPINFOW si = {sizeof(si)}; si.dwFlags = STARTF_USESHOWWINDOW; si.wShowWindow = SW_HIDE; PROCESS_INFORMATION pi = {};
    if (CreateProcessW(cmd.c_str(), &line[0], nullptr, nullptr, FALSE, CREATE_NO_WINDOW, nullptr, sys, &si, &pi)) { CloseHandle(pi.hThread); CloseHandle(pi.hProcess); }
}

static bool launch(const std::wstring& exe, const std::wstring& args) {
    AllowSetForegroundWindow(ASFW_ANY);
    return (INT_PTR)ShellExecuteW(nullptr, L"open", exe.c_str(), args.empty() ? nullptr : args.c_str(), dirOf(exe).c_str(), SW_SHOWNORMAL) > 32;
}

/* Settings starts the installed program itself to uninstall it, and a running program cannot remove its own file: a copy of it in
   %TEMP% does the work, so the whole folder can go */
static bool uninstallFromTemp(const std::wstring& dir) {
    std::wstring t = tempBase(); if (t.empty() || !goodId(g_id)) return false;
    std::wstring home = t + L"\\" + g_id + L".uninstall", copy = home + L"\\" + g_name + L" Uninstall.exe";
    SHCreateDirectoryExW(nullptr, home.c_str(), nullptr);
    if (!CopyFileW(g_self.c_str(), copy.c_str(), FALSE)) return false;
    std::wstring line = L"\"" + copy + L"\" --uninstall --from=\"" + trimSlash(dir) + L"\"" + (g_setupTest ? L" -shell_setuptest" : L"");
    STARTUPINFOW si = {sizeof(si)}; PROCESS_INFORMATION pi = {};
    if (!CreateProcessW(copy.c_str(), &line[0], nullptr, nullptr, FALSE, 0, nullptr, home.c_str(), &si, &pi)) return false;
    AllowSetForegroundWindow(pi.dwProcessId); CloseHandle(pi.hThread); CloseHandle(pi.hProcess);
    return true;
}

/* the work, out of the window's thread; For everyone without an administrator's rights asks Windows to start a copy of this
   program with them (runas), which does the work and writes how far it is into a file */
struct Job { bool install = true, all = true, desktop = true, removeData = false; };
static DWORD WINAPI jobThread(LPVOID arg) {
    Job j = *(Job*)arg; delete (Job*)arg;
    CoInitializeEx(nullptr, COINIT_APARTMENTTHREADED);
    Progress pr; pr.hwnd = g_hwnd;
    int rc;
    if (!j.all || elevated()) rc = j.install ? doInstall(j.all, j.desktop, pr) : doUninstall(g_from, pr);
    else {
        std::wstring pf = g_tempDir + L"\\progress.txt"; DeleteFileW(pf.c_str());
        std::wstring args = j.install ? L"--install --scope=all --desktop=" + std::wstring(j.desktop ? L"1" : L"0") : L"--uninstall --silent --from=\"" + g_from + L"\"";
        args += L" --progress=\"" + pf + L"\"";
        SHELLEXECUTEINFOW sei = {sizeof(sei)};
        sei.fMask = SEE_MASK_NOCLOSEPROCESS | SEE_MASK_NOASYNC | SEE_MASK_FLAG_NO_UI; sei.hwnd = g_hwnd; sei.lpVerb = L"runas";
        sei.lpFile = g_self.c_str(); sei.lpParameters = args.c_str(); sei.nShow = SW_HIDE;
        PostMessageW(g_hwnd, WM_APP_SETUP, 4, 0);
        if (!ShellExecuteExW(&sei) || !sei.hProcess) rc = GetLastError() == ERROR_CANCELLED ? 10 : 11;
        else {
            while (WaitForSingleObject(sei.hProcess, 200) == WAIT_TIMEOUT) {
                std::string s = readText(pf); char* e = nullptr; long pct = strtol(s.c_str(), &e, 10), step = e ? strtol(e, nullptr, 10) : 0;
                if (!s.empty() && pct >= 0 && pct <= 100) tell(pr, (int)pct, (int)step);
            }
            DWORD code = 11; GetExitCodeProcess(sei.hProcess, &code); CloseHandle(sei.hProcess); rc = (int)code;
            DeleteFileW(pf.c_str());
        }
    }
    if (rc == 0 && !j.install && j.removeData) { tell(pr, 100, 4); if (!removeTree(dataDirOf(g_id))) rc = 12; }
    PostMessageW(g_hwnd, WM_APP_SETUP, 2, (LPARAM)rc);
    CoUninitialize();
    return 0;
}
static void startJob(Job* j) {
    g_busy = true;
    HANDLE t = CreateThread(nullptr, 0, jobThread, j, 0, nullptr);
    if (t) CloseHandle(t); else { delete j; PostMessageW(g_hwnd, WM_APP_SETUP, 2, 11); }
}

/* ------------------------------------------------------- 7.24: the installer's window */

static void toPage(const std::wstring& json) { if (g_webview) g_webview->PostWebMessageAsJson(json.c_str()); }

/* what the installer's page is told before it opens: the app, where it is installed (if it is), where it would go */
static std::wstring setupInfoScript() {
    Place p = g_mode == Mode::Uninstall ? placeAt(g_from) : installedPlace();
    WIN32_FILE_ATTRIBUTE_DATA fa = {}; ULONGLONG bytes = 0;
    if (GetFileAttributesExW(g_self.c_str(), GetFileExInfoStandard, &fa)) bytes = (((ULONGLONG)fa.nFileSizeHigh) << 32) | fa.nFileSizeLow;
    std::wstring all = programsBase(true), me = programsBase(false);
    std::wstring info = L"{\"mode\":" + jsonStr(g_mode == Mode::Uninstall ? L"uninstall" : L"install") + L",\"title\":" + jsonStr(g_title) +
        L",\"name\":" + jsonStr(g_name) + L",\"version\":" + jsonStr(g_version) + L",\"publisher\":" + jsonStr(g_publisher) +
        L",\"bytes\":" + std::to_wstring(bytes) + L",\"installed\":" + placeJson(p) +
        L",\"dirs\":{\"all\":" + jsonStr(all.empty() ? L"" : all + L"\\" + g_name) + L",\"me\":" + jsonStr(me.empty() ? L"" : me + L"\\" + g_name) + L"}" +
        L",\"data\":" + jsonStr(dataDirOf(g_id)) + L",\"admin\":" + (elevated() ? L"true" : L"false") + L",\"open\":" + (appOpen() ? L"true" : L"false") +
        L",\"test\":" + (g_setupTest ? L"true" : L"false") + L"}";
    return L"(function () { if (location.origin !== 'https://desk.app.test') return; var info = " + info + L";"
           L" window.SetupHost = { info: info, send: function () { var a = ['setup']; for (var i = 0; i < arguments.length; i++) a.push(String(arguments[i]).replace(/[\\r\\n]+/g, ' '));"
           L" try { window.chrome.webview.postMessage(a.join('\\n')); } catch (e) {} } }; })();";
}

/* only in the cloud build's check (-shell_setuptest): the page read and pressed through, as a person would, each screen held
   for a picture; SHELL_SETUPTEST_DO says what to do (look, install-me, install-all, uninstall-keep, uninstall-remove) */
static std::wstring setupTestScript() {
    wchar_t v[64] = {0}; GetEnvironmentVariableW(L"SHELL_SETUPTEST_DO", v, 64);
    return L"(function (what) {" LR"JS(
  var log = function (l) { try { window.chrome.webview.postMessage('log\n' + l); } catch (e) {} };
  var errs = window.__shellErrors || [];
  var q = function (s) { return document.querySelector(s); };
  var txt = function (s) { var e = q(s); return e ? e.textContent.replace(/\s+/g, ' ').trim() : ''; };
  var wait = function (ms) { return new Promise(function (r) { setTimeout(r, ms); }); };
  var until = function (f, ms) { var t0 = Date.now(); return new Promise(function (res) { (function poll() { var v = null; try { v = f(); } catch (e) {}
    if (v || Date.now() - t0 > ms) return res(v || null); setTimeout(poll, 250); })(); }); };
  var look = function () {
    var inst = q('#inst'), on = q('.opt.on'), d = q('[data-desk] .c'), k = q('[data-keep] .c'), o = q('[data-open] .c'), wide = 0;
    [].forEach.call(document.querySelectorAll('#inst *'), function (e) { var r = e.getBoundingClientRect(); if (r.width && r.right > innerWidth + 1) wide++; });
    var bars = innerWidth - document.documentElement.clientWidth > 0 ? 1 : 0;   // a scroll bar takes room: the page's, or any part's that scrolls
    [].forEach.call(document.querySelectorAll('*'), function (e) { var cs = getComputedStyle(e); if (!/(auto|scroll)/.test(cs.overflowY + cs.overflowX)) return;
      if (e.offsetWidth - e.clientWidth - parseFloat(cs.borderLeftWidth) - parseFloat(cs.borderRightWidth) > 0.5) bars++; });
    return { screen: inst ? inst.getAttribute('data-screen') : null, eye: txt('#eye'), title: txt('#ttl'), sub: txt('#sub'), err: q('#err:not([hidden])') ? txt('#err') : '',
      scope: on ? on.getAttribute('data-scope') : null, desk: d ? d.classList.contains('on') : null, removeData: k ? k.classList.contains('on') : null,
      open: o ? o.classList.contains('on') : null, tryit: !!q('#goTry'), bar: txt('.bar .bt'), w: innerWidth, h: innerHeight,
      sh: document.documentElement.scrollHeight, wide: wide, scrollbars: bars, font: getComputedStyle(q('#ttl') || document.body).fontFamily,
      errors: errs.length, first: errs.slice(0, 3) };
  };
  var screen = function (name) { log('SHELL_SETUPTEST SCREEN ' + name + ' ' + JSON.stringify(look())); return wait(3500); };
  var press = function (s) { var e = q(s); if (!e) throw new Error('nothing to press: ' + s); e.click(); return wait(500); };
  var done = function (s) { log('SHELL_SETUPTEST DONE ' + JSON.stringify(look())); return s ? press(s) : null; };
  var state = function () { var i = q('#inst'); return i ? i.getAttribute('data-screen') : ''; };
  var go = function () {
    if (what === 'install-me' || what === 'install-all') {
      var sc = what === 'install-me' ? 'me' : 'all';
      return screen('choose').then(function () { return q('.opt[data-scope="' + sc + '"]:not(.on)') ? press('.opt[data-scope="' + sc + '"]') : null; })
        .then(function () { return screen('chosen'); }).then(function () { return press('#goInstall'); })
        .then(function () { return until(function () { var s = state(); return s === 'installed' || s === 'failed' || q('#err:not([hidden])'); }, 240000); })
        .then(function () { return screen('after'); })
        .then(function () { return q('[data-open] .c.on') ? press('[data-open]') : null; })
        .then(function () { return done(q('#wFinish') ? '#wFinish' : '#wClose'); });
    }
    if (what === 'uninstall-keep' || what === 'uninstall-remove') {
      return screen('uninstall').then(function () { return what === 'uninstall-remove' ? press('[data-keep]') : null; })
        .then(function () { return press('#goUninstall'); })
        .then(function () { return until(function () { var s = state(); return s === 'uninstalled' || s === 'failed'; }, 240000); })
        .then(function () { return screen('after'); }).then(function () { return done(q('#wDone') ? '#wDone' : '#wClose'); });
    }
    return screen('first').then(function () { return done('#wClose'); });
  };
  setTimeout(function () { go().catch(function (e) { log('SHELL_SETUPTEST FAIL ' + String((e && e.message) || e)); }); }, 1500);
)JS" L"})(" + jsonStr(v) + L");";
}

/* the page measures itself and the window takes its size: kept in the middle of the screen the first time, then where it is.
   The window is shown from the start (GitHub's Windows check of 7.24 found a window kept hidden until then left blank by WebView2) */
static void fitSetup(int cssW, int cssH) {
    if (cssW < 320 || cssW > 1200 || cssH < 240 || cssH > 1600) return;
    UINT dpi = GetDpiForWindow(g_hwnd); if (!dpi) dpi = 96;
    MONITORINFO mi = {sizeof(mi)}; GetMonitorInfoW(MonitorFromWindow(g_hwnd, MONITOR_DEFAULTTONEAREST), &mi);
    RECT wa = mi.rcWork, r = {}; GetWindowRect(g_hwnd, &r);
    int w = std::min<int>(MulDiv(cssW, dpi, 96), wa.right - wa.left - 16), h = std::min<int>(MulDiv(cssH, dpi, 96), wa.bottom - wa.top - 16);
    int x = r.left, y = r.top;
    if (!g_fitted) { x = wa.left + (wa.right - wa.left - w) / 2; y = wa.top + (wa.bottom - wa.top - h) / 2; }
    else if (y + h > wa.bottom) y = std::max<int>(wa.top, wa.bottom - h);
    g_fitted = true;
    SetWindowPos(g_hwnd, nullptr, x, y, w, h, SWP_NOZORDER | SWP_NOACTIVATE);
    if (g_controller) g_controller->NotifyParentWindowPositionChanged();
}

/* the installer's page speaks: setup\n<what>\n<its words> */
static void onSetupMessage(const std::vector<std::wstring>& a) {
    auto arg = [&](size_t i) { return a.size() > i ? a[i] : std::wstring(); };
    std::wstring op = arg(1);
    if (op == L"drag") { PostMessageW(g_hwnd, WM_APP_DRAG, 0, 0); return; }
    if (op == L"min") { ShowWindow(g_hwnd, SW_MINIMIZE); return; }
    if (op == L"close") { if (!g_busy) PostMessageW(g_hwnd, WM_CLOSE, 0, 0); return; }
    if (op == L"fit") { fitSetup(_wtoi(arg(2).c_str()), _wtoi(arg(3).c_str())); return; }
    if (g_busy) return;
    if (op == L"run" && g_mode == Mode::Setup) { launch(g_self, L"--run"); PostMessageW(g_hwnd, WM_CLOSE, 0, 0); return; }
    if (op == L"open") { if (!g_openExe.empty()) launch(g_openExe, L""); PostMessageW(g_hwnd, WM_CLOSE, 0, 0); return; }
    if (op == L"install" && g_mode == Mode::Setup) {
        Job* j = new Job(); j->install = true; j->all = arg(2) != L"me"; j->desktop = arg(3) != L"0";
        Place was = installedPlace(); if (was.found) j->all = was.all;   // an update goes where the app already is
        startJob(j); return;
    }
    if (op == L"uninstall" && g_mode == Mode::Uninstall) {
        Place p = placeAt(g_from);
        if (!p.found) { PostMessageW(g_hwnd, WM_APP_SETUP, 2, 8); return; }
        Job* j = new Job(); j->install = false; j->all = p.all; j->removeData = arg(2) == L"1";
        startJob(j); return;
    }
}

/* ------------------------------------------------------------- the window */

static void placeWindow() {
    std::ifstream f(std::filesystem::path(g_dataDir + L"\\window.txt")); int x, y, w, h, mx;
    if (f >> x >> y >> w >> h >> mx) {
        RECT r = {x, y, x + w, y + h};
        if (w >= 480 && h >= 360 && MonitorFromRect(&r, MONITOR_DEFAULTTONULL)) {
            WINDOWPLACEMENT wp = {sizeof(wp)}; wp.rcNormalPosition = r; wp.showCmd = mx ? SW_SHOWMAXIMIZED : SW_SHOWNORMAL;
            SetWindowPlacement(g_hwnd, &wp); return;
        }
    }
    ShowWindow(g_hwnd, SW_SHOWNORMAL);
}

static void keepPlace() {
    WINDOWPLACEMENT wp = {sizeof(wp)};
    if (!GetWindowPlacement(g_hwnd, &wp)) return;
    RECT r = wp.rcNormalPosition;
    std::ofstream f(std::filesystem::path(g_dataDir + L"\\window.txt"));
    f << r.left << " " << r.top << " " << (r.right - r.left) << " " << (r.bottom - r.top) << " " << (wp.showCmd == SW_SHOWMAXIMIZED ? 1 : 0);
}
/* 7.62: the page as its maker signed it (signature_check.h): checked before anything of it runs. shell.txt's signature_kid
   says the package was made signed, so a page whose signature was taken away is refused too. When the page is not as its
   maker signed it, g_refused is the shell's own page, shown in its place, and the app's page is given nothing. */
static std::string g_refused;
static void checkPage() {
    std::string page = narrow(conf("page", L"index.html"));
    bool marked = g_conf.count("signature_kid") > 0;
    std::string kid = marked ? narrow(g_conf["signature_kid"]) : "", app = g_conf.count("signature_app") ? narrow(g_conf["signature_app"]) : "";
    const char* why = nullptr;
    auto it = g_files.find(page);
    if (it == g_files.end()) why = marked ? ingsig::MISSING : nullptr;
    else {
        std::vector<ingsig::Key> keys;
        for (size_t i = 0; i < SHELL_OWNER_KEY_COUNT; i++) keys.push_back({SHELL_OWNER_KEYS[i].kid, SHELL_OWNER_KEYS[i].x, SHELL_OWNER_KEYS[i].y});
        ingsig::WinCrypto cr;
        why = ingsig::check((const uint8_t*)g_payload.data() + it->second.first, it->second.second, marked, kid, app, keys, cr);
    }
    if (!why) return;
    size_t slash = page.find_last_of('/');
    g_refused = ingsig::fill(SHELL_REFUSED_PAGE, narrow(conf("title", L"This app")), slash == std::string::npos ? page : page.substr(slash + 1), why);
    testLog(L"SHELL_PAGETEST REFUSED {\"file\":" + jsonStr(widen(page)) + L",\"why\":" + jsonStr(widen(why)) + L",\"check\":" + jsonStr(widen(SHELL_MARKER)) + L"}");
}

static void startWebView() {
    bool setup = g_mode != Mode::App;
    if (!setup) checkPage();
    std::wstring flag = g_dataDir + L"\\starting.flag", safe = g_dataDir + L"\\safe_graphics.txt";
    bool soft = GetFileAttributesW(safe.c_str()) != INVALID_FILE_ATTRIBUTES;
    if (!soft && (GetFileAttributesW(flag.c_str()) != INVALID_FILE_ATTRIBUTES || graphicsChipIsAmd())) {
        soft = true; std::ofstream(std::filesystem::path(safe)) << "safe graphics: the last start did not finish, or AMD Radeon graphics";
    }
    { std::ofstream(std::filesystem::path(flag)) << "starting"; }
    auto options = Make<CoreWebView2EnvironmentOptions>();
    options->put_AdditionalBrowserArguments(soft ? L"--disable-gpu-compositing --disable-features=CalculateNativeWinOcclusion"
                                                 : L"--disable-features=CalculateNativeWinOcclusion");
    std::wstring udf = g_dataDir + L"\\WebView2";
    HRESULT hr = CreateCoreWebView2EnvironmentWithOptions(nullptr, udf.c_str(), options.Get(),
        Callback<ICoreWebView2CreateCoreWebView2EnvironmentCompletedHandler>([flag, setup](HRESULT result, ICoreWebView2Environment* env) -> HRESULT {
            if (FAILED(result) || !env) {
                MessageBoxW(g_hwnd, L"This app needs Microsoft Edge WebView2, which Windows 10 and 11 usually have.\n\n"
                                    L"It opens in your browser now: install the Evergreen Runtime, then open this app again.",
                            conf("title", L"App").c_str(), MB_OK | MB_ICONINFORMATION);
                ShellExecuteW(nullptr, L"open", L"https://go.microsoft.com/fwlink/p/?LinkId=2124703", nullptr, nullptr, SW_SHOWNORMAL);
                PostQuitMessage(1); return S_OK;
            }
            g_env = env;
            return env->CreateCoreWebView2Controller(g_hwnd, Callback<ICoreWebView2CreateCoreWebView2ControllerCompletedHandler>(
                [flag, setup](HRESULT result, ICoreWebView2Controller* controller) -> HRESULT {
                    if (FAILED(result) || !controller) { PostQuitMessage(1); return S_OK; }
                    g_controller = controller;
                    controller->get_CoreWebView2(&g_webview);
                    if (setup) {   // the installer's window shows its own colour, never a white flash, until the page is drawn
                        ComPtr<ICoreWebView2Controller2> c2; bool dark = windowsDark();
                        COREWEBVIEW2_COLOR col = {255, (BYTE)(dark ? 28 : 250), (BYTE)(dark ? 22 : 248), (BYTE)(dark ? 38 : 252)};
                        if (SUCCEEDED(controller->QueryInterface(IID_PPV_ARGS(&c2)))) c2->put_DefaultBackgroundColor(col);
                    }
                    RECT rc; GetClientRect(g_hwnd, &rc); controller->put_Bounds(rc);
                    ComPtr<ICoreWebView2Settings> st; g_webview->get_Settings(&st);
                    st->put_IsStatusBarEnabled(FALSE); st->put_AreDevToolsEnabled(TRUE); st->put_IsZoomControlEnabled(TRUE);
                    st->put_AreDefaultScriptDialogsEnabled(TRUE); st->put_IsWebMessageEnabled(TRUE);
                    if (setup) {   // an installer: no browser menu, no zoom, no reload keys
                        st->put_AreDefaultContextMenusEnabled(FALSE); st->put_IsZoomControlEnabled(FALSE);
                        ComPtr<ICoreWebView2Settings3> s3; if (SUCCEEDED(st->QueryInterface(IID_PPV_ARGS(&s3)))) s3->put_AreBrowserAcceleratorKeysEnabled(FALSE);
                    }
                    std::wstring filter = std::wstring(ORIGIN) + L"/*";
                    g_webview->AddWebResourceRequestedFilter(filter.c_str(), COREWEBVIEW2_WEB_RESOURCE_CONTEXT_ALL);
                    EventRegistrationToken tok;
                    g_webview->add_WebResourceRequested(Callback<ICoreWebView2WebResourceRequestedEventHandler>(
                        [](ICoreWebView2*, ICoreWebView2WebResourceRequestedEventArgs* args) -> HRESULT {
                            ComPtr<ICoreWebView2WebResourceRequest> req; args->get_Request(&req);
                            LPWSTR u = nullptr; req->get_Uri(&u); std::wstring uri = u ? u : L""; CoTaskMemFree(u);
                            if (!ownUri(uri)) return S_OK;
                            std::string path = urlPath(uri);
                            bool inSetup = g_mode != Mode::App;
                            if (path.empty()) path = inSetup ? "__setup/index.html" : narrow(conf("page", L"index.html"));
                            ComPtr<IStream> body; int status = 200; const wchar_t* mime = mimeFor(path);
                            if (!inSetup && !g_refused.empty()) {   // 7.62: the shell's own page alone, in place of the app's
                                bool own = path == narrow(conf("page", L"index.html"));
                                if (own) body.Attach(SHCreateMemStream((const BYTE*)g_refused.data(), (UINT)g_refused.size()));
                                else body.Attach(SHCreateMemStream((const BYTE*)"", 0));
                                ComPtr<ICoreWebView2WebResourceResponse> resp;
                                g_env->CreateWebResourceResponse(body.Get(), own ? 200 : 404, own ? L"OK" : L"Not Found",
                                    own ? L"Content-Type: text/html; charset=utf-8\r\nContent-Security-Policy: default-src 'none'; style-src 'unsafe-inline'; img-src data:\r\nCache-Control: no-store"
                                        : L"Content-Type: text/plain\r\nCache-Control: no-store", &resp);
                                args->put_Response(resp.Get());
                                return S_OK;
                            }
                            // the installer's window serves the installer's page alone, and the app never serves it
                            auto it = inSetup == (path.rfind("__setup/", 0) == 0) ? g_files.find(path) : g_files.end();
                            if (it != g_files.end()) {
                                body.Attach(SHCreateMemStream((const BYTE*)g_payload.data() + it->second.first, (UINT)it->second.second));
                            } else if (g_files.empty() && (path == "index.html") && !inSetup) {
                                body.Attach(SHCreateMemStream((const BYTE*)STAND_IN, (UINT)strlen(STAND_IN)));
                            } else {
                                status = 404; mime = L"text/plain"; body.Attach(SHCreateMemStream((const BYTE*)"", 0));
                            }
                            std::wstring headers = std::wstring(L"Content-Type: ") + mime + L"\r\nCache-Control: no-cache";
                            ComPtr<ICoreWebView2WebResourceResponse> resp;
                            g_env->CreateWebResourceResponse(body.Get(), status, status == 200 ? L"OK" : L"Not Found", headers.c_str(), &resp);
                            args->put_Response(resp.Get());
                            return S_OK;
                        }).Get(), &tok);
                    g_webview->add_WebMessageReceived(Callback<ICoreWebView2WebMessageReceivedEventHandler>(
                        [](ICoreWebView2*, ICoreWebView2WebMessageReceivedEventArgs* args) -> HRESULT {
                            if (g_mode == Mode::App && !g_refused.empty()) return S_OK;   // 7.62: nothing is taken from a page not as its maker signed it
                            LPWSTR src = nullptr; args->get_Source(&src); bool own = src && ownUri(src); CoTaskMemFree(src);
                            if (!own) return S_OK;
                            LPWSTR m = nullptr;
                            if (SUCCEEDED(args->TryGetWebMessageAsString(&m)) && m) { onMessage(m); CoTaskMemFree(m); }
                            return S_OK;
                        }).Get(), &tok);
                    g_webview->add_NavigationStarting(Callback<ICoreWebView2NavigationStartingEventHandler>(
                        [](ICoreWebView2*, ICoreWebView2NavigationStartingEventArgs* args) -> HRESULT {
                            LPWSTR u = nullptr; args->get_Uri(&u); std::wstring uri = u ? u : L""; CoTaskMemFree(u);
                            if (!ownUri(uri) && !startsWith(lower(uri), L"about:") && !startsWith(lower(uri), L"data:") && !startsWith(lower(uri), L"blob:")) {
                                args->put_Cancel(TRUE); openOutside(uri);   // other sites open in the browser, never inside the app
                            }
                            return S_OK;
                        }).Get(), &tok);
                    g_webview->add_NewWindowRequested(Callback<ICoreWebView2NewWindowRequestedEventHandler>(
                        [](ICoreWebView2*, ICoreWebView2NewWindowRequestedEventArgs* args) -> HRESULT {
                            LPWSTR u = nullptr; args->get_Uri(&u); std::wstring uri = u ? u : L""; CoTaskMemFree(u);
                            args->put_Handled(TRUE); openOutside(uri);
                            return S_OK;
                        }).Get(), &tok);
                    g_webview->add_PermissionRequested(Callback<ICoreWebView2PermissionRequestedEventHandler>(
                        [](ICoreWebView2*, ICoreWebView2PermissionRequestedEventArgs* args) -> HRESULT {
                            LPWSTR u = nullptr; args->get_Uri(&u); bool own = u && ownUri(u); CoTaskMemFree(u);
                            COREWEBVIEW2_PERMISSION_KIND kind; args->get_PermissionKind(&kind);
                            bool wanted = kind == COREWEBVIEW2_PERMISSION_KIND_MICROPHONE || kind == COREWEBVIEW2_PERMISSION_KIND_CAMERA ||
                                          kind == COREWEBVIEW2_PERMISSION_KIND_CLIPBOARD_READ;
                            args->put_State(own && wanted ? COREWEBVIEW2_PERMISSION_STATE_ALLOW : COREWEBVIEW2_PERMISSION_STATE_DENY);
                            return S_OK;
                        }).Get(), &tok);
                    g_webview->add_NavigationCompleted(Callback<ICoreWebView2NavigationCompletedEventHandler>(
                        [flag](ICoreWebView2*, ICoreWebView2NavigationCompletedEventArgs*) -> HRESULT {
                            if (!g_started) {
                                g_started = true; DeleteFileW(flag.c_str());
                                g_controller->MoveFocus(COREWEBVIEW2_MOVE_FOCUS_REASON_PROGRAMMATIC);   // the keys go to the page
                            }
                            if (g_pageTest && !g_pageTestSent) {
                                g_pageTestSent = true;
                                if (!g_refused.empty()) testLog(L"SHELL_PAGETEST DONE");   // 7.62: the shell's own page asks nothing
                                else g_webview->ExecuteScript(pageTestScript().c_str(), nullptr);
                            }
                            if (g_setupTest && !g_setupTestSent) { g_setupTestSent = true; g_webview->ExecuteScript(setupTestScript().c_str(), nullptr); }
                            return S_OK;
                        }).Get(), &tok);
                    g_webview->add_ProcessFailed(Callback<ICoreWebView2ProcessFailedEventHandler>(
                        [](ICoreWebView2*, ICoreWebView2ProcessFailedEventArgs* args) -> HRESULT {
                            COREWEBVIEW2_PROCESS_FAILED_KIND k; args->get_ProcessFailedKind(&k);
                            if (k == COREWEBVIEW2_PROCESS_FAILED_KIND_RENDER_PROCESS_EXITED || k == COREWEBVIEW2_PROCESS_FAILED_KIND_RENDER_PROCESS_UNRESPONSIVE)
                                g_webview->Reload();   // the page comes back; the work is safe in storage
                            return S_OK;
                        }).Get(), &tok);
                    if (setup || g_refused.empty()) {   // 7.62: a page not as its maker signed it is given nothing
                        g_webview->AddScriptToExecuteOnDocumentCreated((setup ? setupInfoScript() : bridgeScript()).c_str(), nullptr);
                        if (g_pageTest || g_setupTest) g_webview->AddScriptToExecuteOnDocumentCreated(ERROR_CATCHER, nullptr);
                    }
                    std::wstring entry = std::wstring(ORIGIN) + L"/" + (setup ? std::wstring(L"__setup/index.html") : conf("page", L"index.html"));
                    g_webview->Navigate(entry.c_str());
                    return S_OK;
                }).Get());
        }).Get());
    if (FAILED(hr)) {
        MessageBoxW(g_hwnd, L"This app needs Microsoft Edge WebView2, which Windows 10 and 11 usually have.\n\n"
                            L"It opens in your browser now: install the Evergreen Runtime, then open this app again.",
                    conf("title", L"App").c_str(), MB_OK | MB_ICONINFORMATION);
        ShellExecuteW(nullptr, L"open", L"https://go.microsoft.com/fwlink/p/?LinkId=2124703", nullptr, nullptr, SW_SHOWNORMAL);
        PostQuitMessage(1);
    }
}

static LRESULT CALLBACK WndProc(HWND hwnd, UINT msg, WPARAM wp, LPARAM lp) {
    switch (msg) {
    case WM_SIZE:
        if (g_controller) { RECT rc; GetClientRect(hwnd, &rc); g_controller->put_Bounds(rc); }
        return 0;
    case WM_MOVE: case WM_MOVING:
        if (g_controller) g_controller->NotifyParentWindowPositionChanged();
        break;
    case WM_GETMINMAXINFO: {
        if (g_mode != Mode::App) break;
        MINMAXINFO* mm = (MINMAXINFO*)lp; UINT dpi = GetDpiForWindow(hwnd); if (!dpi) dpi = 96;
        mm->ptMinTrackSize.x = MulDiv(480, dpi, 96); mm->ptMinTrackSize.y = MulDiv(360, dpi, 96); return 0;
    }
    case WM_DPICHANGED:
        if (g_mode == Mode::App) break;
        { RECT* r = (RECT*)lp; SetWindowPos(hwnd, nullptr, r->left, r->top, r->right - r->left, r->bottom - r->top, SWP_NOZORDER | SWP_NOACTIVATE); }
        return 0;
    case WM_APP_SAVE:
        nextSave(); return 0;
    case WM_APP_DRAG: {   // the page's title bar pressed: the window follows the pointer, as a title bar's does
        POINT pt; GetCursorPos(&pt); ReleaseCapture();
        SendMessageW(hwnd, WM_NCLBUTTONDOWN, HTCAPTION, MAKELPARAM(pt.x, pt.y)); return 0;
    }
    case WM_APP_SETUP:
        if (wp == 1) toPage(L"{\"type\":\"progress\",\"pct\":" + std::to_wstring(LOWORD(lp)) + L",\"step\":" + std::to_wstring(HIWORD(lp)) + L"}");
        else if (wp == 4) toPage(L"{\"type\":\"asking\"}");
        else if (wp == 2) {
            g_busy = false; int code = (int)lp;
            Place p = g_mode == Mode::Setup ? installedPlace() : placeAt(g_from);
            if (code == 0 && g_mode == Mode::Setup && p.found) g_openExe = p.exe;
            toPage(L"{\"type\":\"finished\",\"code\":" + std::to_wstring(code) + L",\"installed\":" + placeJson(p) + L"}");
            testLog(L"SHELL_SETUPTEST FINISHED " + std::to_wstring(code));
        }
        return 0;
    case WM_CLOSE:
        if (g_mode != Mode::App) { if (!g_busy) DestroyWindow(hwnd); return 0; }   // never while it installs or uninstalls
        keepPlace(); DestroyWindow(hwnd); return 0;
    case WM_DESTROY:
        if (g_controller) g_controller->Close();
        PostQuitMessage(0); return 0;
    }
    return DefWindowProcW(hwnd, msg, wp, lp);
}

/* the installer's window: no frame but the page's own, rounded by Windows 11, its shadow cast; it takes the page's height once drawn */
static int runSetupWindow(HINSTANCE inst) {
    if (!goodId(g_id)) { MessageBoxW(nullptr, L"This installer's app id cannot name a folder, so it cannot install.", g_title.c_str(), MB_OK | MB_ICONWARNING); return 2; }
    std::wstring cls = L"IngeniumSetup:" + g_id;
    HANDLE one = CreateMutexW(nullptr, TRUE, (L"Local\\" + g_id + L".setup").c_str());
    if (one && GetLastError() == ERROR_ALREADY_EXISTS) {   // one installer at a time: the open one comes forward
        HWND other = FindWindowW(cls.c_str(), nullptr);
        if (other) { if (IsIconic(other)) ShowWindow(other, SW_RESTORE); SetForegroundWindow(other); }
        return 0;
    }
    SetCurrentProcessExplicitAppUserModelID((g_id + L".setup").c_str());   // its own taskbar button, apart from the app's
    std::wstring t = tempBase(), mine = t + L"\\" + g_id + L".uninstall";
    g_tempDir = g_mode == Mode::Uninstall && lower(dirOf(g_self)) == lower(mine) ? mine : t + L"\\" + g_id + L".setup";
    SHCreateDirectoryExW(nullptr, g_tempDir.c_str(), nullptr);
    g_dataDir = g_tempDir;
    CoInitializeEx(nullptr, COINIT_APARTMENTTHREADED);
    bool dark = windowsDark();
    WNDCLASSEXW wc = {sizeof(wc)};
    wc.style = CS_DROPSHADOW; wc.lpfnWndProc = WndProc; wc.hInstance = inst; wc.lpszClassName = cls.c_str();
    wc.hCursor = LoadCursor(nullptr, IDC_ARROW); wc.hbrBackground = CreateSolidBrush(dark ? RGB(28, 22, 38) : RGB(250, 248, 252));
    wc.hIcon = (HICON)LoadImageW(inst, MAKEINTRESOURCEW(1), IMAGE_ICON, GetSystemMetrics(SM_CXICON), GetSystemMetrics(SM_CYICON), 0);
    wc.hIconSm = (HICON)LoadImageW(inst, MAKEINTRESOURCEW(1), IMAGE_ICON, GetSystemMetrics(SM_CXSMICON), GetSystemMetrics(SM_CYSMICON), 0);
    RegisterClassExW(&wc);
    POINT pt = {}; GetCursorPos(&pt);
    MONITORINFO mi = {sizeof(mi)}; GetMonitorInfoW(MonitorFromPoint(pt, MONITOR_DEFAULTTOPRIMARY), &mi);
    UINT dpi = GetDpiForSystem(); if (!dpi) dpi = 96;
    int w = MulDiv(540, dpi, 96), h = MulDiv(g_mode == Mode::Uninstall ? 320 : 450, dpi, 96);   // about the page's own height
    int x = mi.rcWork.left + (mi.rcWork.right - mi.rcWork.left - w) / 2, y = mi.rcWork.top + (mi.rcWork.bottom - mi.rcWork.top - h) / 2;
    g_hwnd = CreateWindowExW(WS_EX_APPWINDOW, cls.c_str(), (g_title + L" Setup").c_str(), WS_POPUP | WS_SYSMENU | WS_MINIMIZEBOX, x, y, w, h, nullptr, nullptr, inst, nullptr);
    if (!g_hwnd) return 1;
    DWORD round = 2; DwmSetWindowAttribute(g_hwnd, 33, &round, sizeof(round));   // DWMWA_WINDOW_CORNER_PREFERENCE, DWMWCP_ROUND (Windows 11)
    ShowWindow(g_hwnd, SW_SHOWNORMAL); UpdateWindow(g_hwnd); SetForegroundWindow(g_hwnd);
    startWebView();
    MSG m;
    while (GetMessageW(&m, nullptr, 0, 0)) { TranslateMessage(&m); DispatchMessageW(&m); }
    if (one) { ReleaseMutex(one); CloseHandle(one); }
    CoUninitialize();
    // what this program leaves: its WebView2 data (and, as the uninstaller's copy, itself), then an install it removed from within
    if (!t.empty() && startsWith(lower(g_tempDir), lower(t + L"\\").c_str())) afterEnd(g_tempDir, L"rd /s /q \"" + g_tempDir + L"\" 2>nul");
    if (!g_removeAfter.empty()) {
        std::wstring exe = g_self, mark = g_removeAfter + L"\\" + MARK;
        afterEnd(exe, L"del /f /q \"" + exe + L"\" 2>nul & del /f /q \"" + mark + L"\" 2>nul & rd \"" + g_removeAfter + L"\" 2>nul");
    }
    return (int)m.wParam;
}

int WINAPI wWinMain(HINSTANCE inst, HINSTANCE, PWSTR, int) {
    int argc = 0; LPWSTR* argv = CommandLineToArgvW(GetCommandLineW(), &argc);
    for (int i = 1; i < argc; i++) g_args.push_back(argv[i]);
    LocalFree(argv);
    g_pageTest = hasArg(L"-shell_pagetest"); g_setupTest = hasArg(L"-shell_setuptest");
    if (g_pageTest || g_setupTest) {
        wchar_t v[MAX_PATH * 2];
        if (GetEnvironmentVariableW(g_setupTest ? L"SHELL_SETUPTEST_LOG" : L"SHELL_PAGETEST_LOG", v, MAX_PATH * 2)) g_testLog = v;
        if (g_pageTest && GetEnvironmentVariableW(L"SHELL_PAGETEST_SAVE_DIR", v, MAX_PATH * 2)) g_testSaveDir = v;
    }
    { wchar_t self[MAX_PATH * 4] = {0}; GetModuleFileNameW(nullptr, self, MAX_PATH * 4); g_self = self; }
    readPayload();
    std::wstring id = conf("id", L"com.yannieforest.ingeniumshell.windows"), title = conf("title", L"Ingenium shell");
    for (auto& c : id) if (!(iswalnum(c) || c == L'.' || c == L'-' || c == L'_')) c = L'_';
    g_id = id; g_title = title; g_name = fileName(conf("name", title.c_str())); g_version = conf("version", L"1.0"); g_publisher = conf("publisher", L"");

    // 7.24: an app made with the installer's page installs, uninstalls, or opens as the app once installed
    bool hasSetup = g_files.count("__setup/index.html") > 0;
    if (hasArg(L"--install")) {
        if (!hasSetup || !goodId(g_id)) return 2;
        CoInitializeEx(nullptr, COINIT_APARTMENTTHREADED);
        Progress pr; pr.file = argVal(L"--progress");
        int rc = doInstall(argVal(L"--scope") != L"me", argVal(L"--desktop") != L"0", pr);
        CoUninitialize();
        return rc;
    }
    if (hasArg(L"--uninstall")) {
        if (!hasSetup || !goodId(g_id)) return 2;
        std::wstring from = argVal(L"--from");
        g_from = trimSlash(from.empty() ? dirOf(g_self) : from);
        if (hasArg(L"--silent")) {
            CoInitializeEx(nullptr, COINIT_APARTMENTTHREADED);
            Progress pr; pr.file = argVal(L"--progress");
            int rc = doUninstall(g_from, pr);
            if (rc == 0 && hasArg(L"--remove-data") && !removeTree(dataDirOf(g_id))) rc = 12;
            CoUninitialize();
            if (!g_removeAfter.empty()) {
                std::wstring mark = g_removeAfter + L"\\" + MARK;
                afterEnd(g_self, L"del /f /q \"" + g_self + L"\" 2>nul & del /f /q \"" + mark + L"\" 2>nul & rd \"" + g_removeAfter + L"\" 2>nul");
            }
            return rc;
        }
        if (from.empty() && installedHere() && uninstallFromTemp(g_from)) return 0;
        g_mode = Mode::Uninstall;
        return runSetupWindow(inst);
    }
    if (hasSetup && !g_pageTest && !hasArg(L"--run") && !installedHere()) { g_mode = Mode::Setup; return runSetupWindow(inst); }

    // one copy at a time: a second start brings the open window forward
    std::wstring cls = L"IngeniumShell:" + id;
    HANDLE one = CreateMutexW(nullptr, TRUE, (L"Local\\" + id + L".single").c_str());
    if (one && GetLastError() == ERROR_ALREADY_EXISTS) {
        HWND other = FindWindowW(cls.c_str(), nullptr);
        if (other) { if (IsIconic(other)) ShowWindow(other, SW_RESTORE); SetForegroundWindow(other); }
        return 0;
    }
    SetCurrentProcessExplicitAppUserModelID(id.c_str());   // its own button on the taskbar, pinned as itself

    PWSTR local = nullptr;
    if (SUCCEEDED(SHGetKnownFolderPath(FOLDERID_LocalAppData, 0, nullptr, &local))) { g_dataDir = std::wstring(local) + L"\\" + id; CoTaskMemFree(local); }
    else g_dataDir = L".";
    SHCreateDirectoryExW(nullptr, g_dataDir.c_str(), nullptr);

    CoInitializeEx(nullptr, COINIT_APARTMENTTHREADED);
    WNDCLASSEXW wc = {sizeof(wc)};
    wc.lpfnWndProc = WndProc; wc.hInstance = inst; wc.lpszClassName = cls.c_str();
    wc.hCursor = LoadCursor(nullptr, IDC_ARROW); wc.hbrBackground = (HBRUSH)(COLOR_WINDOW + 1);
    wc.hIcon = (HICON)LoadImageW(inst, MAKEINTRESOURCEW(1), IMAGE_ICON, GetSystemMetrics(SM_CXICON), GetSystemMetrics(SM_CYICON), 0);
    wc.hIconSm = (HICON)LoadImageW(inst, MAKEINTRESOURCEW(1), IMAGE_ICON, GetSystemMetrics(SM_CXSMICON), GetSystemMetrics(SM_CYSMICON), 0);
    RegisterClassExW(&wc);
    UINT dpi = GetDpiForSystem(); if (!dpi) dpi = 96;
    g_hwnd = CreateWindowExW(0, cls.c_str(), title.c_str(), WS_OVERLAPPEDWINDOW, CW_USEDEFAULT, CW_USEDEFAULT,
                             MulDiv(1280, dpi, 96), MulDiv(860, dpi, 96), nullptr, nullptr, inst, nullptr);
    if (!g_hwnd) return 1;
    placeWindow();
    UpdateWindow(g_hwnd);
    startWebView();
    MSG m;
    while (GetMessageW(&m, nullptr, 0, 0)) { TranslateMessage(&m); DispatchMessageW(&m); }
    if (one) { ReleaseMutex(one); CloseHandle(one); }
    CoUninitialize();
    return (int)m.wParam;
}
