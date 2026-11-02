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
#define NOMINMAX
#include <windows.h>
#include <objbase.h>
#include <shellapi.h>
#include <shlobj.h>
#include <shlwapi.h>
#include <shobjidl.h>
#include <wincrypt.h>
#include <wrl.h>
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
    if (!g_pageTest || g_testLog.empty()) return;
    std::ofstream f(g_testLog, std::ios::app | std::ios::binary); std::string s = narrow(line) + "\n"; f.write(s.data(), s.size());
}
static bool startsWith(const std::wstring& s, const wchar_t* p) { return s.rfind(p, 0) == 0; }
static std::wstring lower(std::wstring s) { std::transform(s.begin(), s.end(), s.begin(), ::towlower); return s; }

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

static void onMessage(const std::wstring& msg) {
    size_t a = msg.find(L'\n'); if (a == std::wstring::npos) return;
    std::wstring op = msg.substr(0, a);
    if (op == L"log") { testLog(msg.substr(a + 1)); return; }
    if (op != L"save") return;
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

/* ------------------------------------------------------------- the window */

static void placeWindow() {
    std::ifstream f(g_dataDir + L"\\window.txt"); int x, y, w, h, mx;
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
    std::ofstream f(g_dataDir + L"\\window.txt");
    f << r.left << " " << r.top << " " << (r.right - r.left) << " " << (r.bottom - r.top) << " " << (wp.showCmd == SW_SHOWMAXIMIZED ? 1 : 0);
}

static void startWebView() {
    std::wstring flag = g_dataDir + L"\\starting.flag", safe = g_dataDir + L"\\safe_graphics.txt";
    bool soft = GetFileAttributesW(safe.c_str()) != INVALID_FILE_ATTRIBUTES;
    if (!soft && (GetFileAttributesW(flag.c_str()) != INVALID_FILE_ATTRIBUTES || graphicsChipIsAmd())) {
        soft = true; std::ofstream(safe) << "safe graphics: the last start did not finish, or AMD Radeon graphics";
    }
    { std::ofstream(flag) << "starting"; }
    auto options = Make<CoreWebView2EnvironmentOptions>();
    options->put_AdditionalBrowserArguments(soft ? L"--disable-gpu-compositing --disable-features=CalculateNativeWinOcclusion"
                                                 : L"--disable-features=CalculateNativeWinOcclusion");
    std::wstring udf = g_dataDir + L"\\WebView2";
    HRESULT hr = CreateCoreWebView2EnvironmentWithOptions(nullptr, udf.c_str(), options.Get(),
        Callback<ICoreWebView2CreateCoreWebView2EnvironmentCompletedHandler>([flag](HRESULT result, ICoreWebView2Environment* env) -> HRESULT {
            if (FAILED(result) || !env) {
                MessageBoxW(g_hwnd, L"This app needs Microsoft Edge WebView2, which Windows 10 and 11 usually have.\n\n"
                                    L"It opens in your browser now: install the Evergreen Runtime, then open this app again.",
                            conf("title", L"App").c_str(), MB_OK | MB_ICONINFORMATION);
                ShellExecuteW(nullptr, L"open", L"https://go.microsoft.com/fwlink/p/?LinkId=2124703", nullptr, nullptr, SW_SHOWNORMAL);
                PostQuitMessage(1); return S_OK;
            }
            g_env = env;
            return env->CreateCoreWebView2Controller(g_hwnd, Callback<ICoreWebView2CreateCoreWebView2ControllerCompletedHandler>(
                [flag](HRESULT result, ICoreWebView2Controller* controller) -> HRESULT {
                    if (FAILED(result) || !controller) { PostQuitMessage(1); return S_OK; }
                    g_controller = controller;
                    controller->get_CoreWebView2(&g_webview);
                    RECT rc; GetClientRect(g_hwnd, &rc); controller->put_Bounds(rc);
                    ComPtr<ICoreWebView2Settings> st; g_webview->get_Settings(&st);
                    st->put_IsStatusBarEnabled(FALSE); st->put_AreDevToolsEnabled(TRUE); st->put_IsZoomControlEnabled(TRUE);
                    st->put_AreDefaultScriptDialogsEnabled(TRUE); st->put_IsWebMessageEnabled(TRUE);
                    std::wstring filter = std::wstring(ORIGIN) + L"/*";
                    g_webview->AddWebResourceRequestedFilter(filter.c_str(), COREWEBVIEW2_WEB_RESOURCE_CONTEXT_ALL);
                    EventRegistrationToken tok;
                    g_webview->add_WebResourceRequested(Callback<ICoreWebView2WebResourceRequestedEventHandler>(
                        [](ICoreWebView2*, ICoreWebView2WebResourceRequestedEventArgs* args) -> HRESULT {
                            ComPtr<ICoreWebView2WebResourceRequest> req; args->get_Request(&req);
                            LPWSTR u = nullptr; req->get_Uri(&u); std::wstring uri = u ? u : L""; CoTaskMemFree(u);
                            if (!ownUri(uri)) return S_OK;
                            std::string path = urlPath(uri);
                            if (path.empty()) path = narrow(conf("page", L"index.html"));
                            ComPtr<IStream> body; int status = 200; const wchar_t* mime = mimeFor(path);
                            auto it = g_files.find(path);
                            if (it != g_files.end()) {
                                body.Attach(SHCreateMemStream((const BYTE*)g_payload.data() + it->second.first, (UINT)it->second.second));
                            } else if (g_files.empty() && (path == "index.html")) {
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
                            if (g_pageTest && !g_pageTestSent) { g_pageTestSent = true; g_webview->ExecuteScript(pageTestScript().c_str(), nullptr); }
                            return S_OK;
                        }).Get(), &tok);
                    g_webview->add_ProcessFailed(Callback<ICoreWebView2ProcessFailedEventHandler>(
                        [](ICoreWebView2*, ICoreWebView2ProcessFailedEventArgs* args) -> HRESULT {
                            COREWEBVIEW2_PROCESS_FAILED_KIND k; args->get_ProcessFailedKind(&k);
                            if (k == COREWEBVIEW2_PROCESS_FAILED_KIND_RENDER_PROCESS_EXITED || k == COREWEBVIEW2_PROCESS_FAILED_KIND_RENDER_PROCESS_UNRESPONSIVE)
                                g_webview->Reload();   // the page comes back; the work is safe in storage
                            return S_OK;
                        }).Get(), &tok);
                    g_webview->AddScriptToExecuteOnDocumentCreated(bridgeScript().c_str(), nullptr);
                    if (g_pageTest) g_webview->AddScriptToExecuteOnDocumentCreated(ERROR_CATCHER, nullptr);
                    std::wstring entry = std::wstring(ORIGIN) + L"/" + conf("page", L"index.html");
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
        MINMAXINFO* mm = (MINMAXINFO*)lp; UINT dpi = GetDpiForWindow(hwnd); if (!dpi) dpi = 96;
        mm->ptMinTrackSize.x = MulDiv(480, dpi, 96); mm->ptMinTrackSize.y = MulDiv(360, dpi, 96); return 0;
    }
    case WM_APP_SAVE:
        nextSave(); return 0;
    case WM_CLOSE:
        keepPlace(); DestroyWindow(hwnd); return 0;
    case WM_DESTROY:
        if (g_controller) g_controller->Close();
        PostQuitMessage(0); return 0;
    }
    return DefWindowProcW(hwnd, msg, wp, lp);
}

int WINAPI wWinMain(HINSTANCE inst, HINSTANCE, PWSTR, int) {
    int argc = 0; LPWSTR* argv = CommandLineToArgvW(GetCommandLineW(), &argc);
    for (int i = 1; i < argc; i++) if (std::wstring(argv[i]) == L"-shell_pagetest") g_pageTest = true;
    LocalFree(argv);
    if (g_pageTest) {
        wchar_t v[MAX_PATH * 2];
        if (GetEnvironmentVariableW(L"SHELL_PAGETEST_LOG", v, MAX_PATH * 2)) g_testLog = v;
        if (GetEnvironmentVariableW(L"SHELL_PAGETEST_SAVE_DIR", v, MAX_PATH * 2)) g_testSaveDir = v;
    }
    readPayload();
    std::wstring id = conf("id", L"com.yannieforest.ingeniumshell.windows"), title = conf("title", L"Ingenium shell");
    for (auto& c : id) if (!(iswalnum(c) || c == L'.' || c == L'-' || c == L'_')) c = L'_';

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
