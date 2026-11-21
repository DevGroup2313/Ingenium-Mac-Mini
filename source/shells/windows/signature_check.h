/*
   INGENIUM  |  Copyright (c) 2026 Yannie D. Forest. All rights reserved.
   NO LICENCE IS GRANTED. See LICENCE.txt.

   THE PAGE AS ITS MAKER SIGNED IT (Ingenium 7.62, modules/r352.js: "your apps signed when shipped", part two).
   Before anything of the app's page runs, the shell reads it as Ingenium's own check reads a page (modules/r349.js,
   plain and checkPage): in its first MiB, the content of its first <meta name="ingenium-signature" content="...">
   and of its first <meta name="ingenium-build" content="..."> are left out, as those regular expressions find them;
   the rest is hashed with SHA-256 and compared with the release the signature carries. The signature itself, ECDSA
   P-256 with SHA-256 over the release's fields in PermitCore's fixed order (canon: keys sorted at every level, no
   spaces, strings as JSON.stringify writes them), is checked with the owner's public keys the shell carries
   (shell_common.h, written from security/owner_keys.json). A package Fabrica made signed says so in shell.txt
   (signature_kid=, signature_app=), so a page whose signature was taken away is refused too.
   The same steps, in the same order, are in the Mac and iPhone shells (SignatureCheck.swift) and the Android shell
   (SignatureCheck.java); shells/common/test holds the cases all of them are tested against (this file by
   check_test.cpp: with Windows' own cryptography, CNG, on GitHub's Windows, and with OpenSSL elsewhere).
   Portable C++17; the two cryptographic steps are given by the program (Crypto, below).
*/
#pragma once
#include <cmath>
#include <cstdint>
#include <cstdio>
#include <cstring>
#include <string>
#include <utility>
#include <vector>

namespace ingsig {

/* what is wrong with a page, in the words the refused page says after "It " */
static const char* const LOST = "has lost its signature";
static const char* const UNREADABLE = "carries a signature that cannot be read";
static const char* const UNKNOWN_KEY = "is signed with a key this app does not know";
static const char* const OTHER_KEY = "is signed with another key than the one it was made with";
static const char* const OTHER_APP = "is another app's page";
static const char* const BAD_SIGNATURE = "does not match its own signature";
static const char* const CHANGED = "changed since it was signed";
static const char* const MISSING = "is missing";

struct Key { std::string kid, x, y; };

/* SHA-256 over several parts, and ECDSA P-256 with SHA-256 over a message, given by the program */
struct Crypto {
    virtual ~Crypto() {}
    virtual bool sha256(const std::vector<std::pair<const uint8_t*, size_t>>& parts, uint8_t out[32]) = 0;
    virtual bool verifyP256(const uint8_t x[32], const uint8_t y[32], const uint8_t rs[64], const uint8_t* msg, size_t n) = 0;
};

/* ------------------------------------------------ the two tags, found as r349's regular expressions find them */

inline bool allowed(uint8_t c, bool sigChars) {
    if ((c >= 'A' && c <= 'Z') || (c >= 'a' && c <= 'z') || (c >= '0' && c <= '9') || c == '-') return true;
    return sigChars ? c == '_' : c == '.';
}

/* the content [start, end) of the first tag that matches entirely within the first n bytes; false when none does */
inline bool find(const uint8_t* w, size_t n, const char* prefix, size_t limit, bool sigChars, size_t& start, size_t& end) {
    size_t m = strlen(prefix);
    for (size_t i = 0; i + m + 2 <= n; i++) {
        if (w[i] != (uint8_t)prefix[0]) continue;
        size_t j = 1;
        while (j < m && w[i + j] == (uint8_t)prefix[j]) j++;
        if (j < m) continue;
        size_t s = i + m, e = s;
        while (e < n && e - s <= limit && allowed(w[e], sigChars)) e++;
        if (e - s <= limit && e + 1 < n && w[e] == '"' && w[e + 1] == '>') { start = s; end = e; return true; }
    }
    return false;
}

/* ------------------------------------------------ text: UTF-8 to UTF-16 code units and back, as the page's own decoder does */

inline std::u16string utf16(const std::string& s) {
    std::u16string o;
    size_t i = 0, n = s.size();
    while (i < n) {
        uint8_t c = (uint8_t)s[i];
        uint32_t cp = 0xFFFD; size_t len = 1;
        if (c < 0x80) { cp = c; }
        else if (c >= 0xC2 && c <= 0xDF && i + 1 < n && ((uint8_t)s[i + 1] & 0xC0) == 0x80) { cp = ((c & 0x1F) << 6) | ((uint8_t)s[i + 1] & 0x3F); len = 2; }
        else if (c >= 0xE0 && c <= 0xEF && i + 2 < n && ((uint8_t)s[i + 1] & 0xC0) == 0x80 && ((uint8_t)s[i + 2] & 0xC0) == 0x80) {
            uint32_t v = ((c & 0x0F) << 12) | (((uint8_t)s[i + 1] & 0x3F) << 6) | ((uint8_t)s[i + 2] & 0x3F);
            if (v >= 0x800 && (v < 0xD800 || v > 0xDFFF)) { cp = v; len = 3; }
        } else if (c >= 0xF0 && c <= 0xF4 && i + 3 < n && ((uint8_t)s[i + 1] & 0xC0) == 0x80 && ((uint8_t)s[i + 2] & 0xC0) == 0x80 && ((uint8_t)s[i + 3] & 0xC0) == 0x80) {
            uint32_t v = ((c & 0x07) << 18) | (((uint8_t)s[i + 1] & 0x3F) << 12) | (((uint8_t)s[i + 2] & 0x3F) << 6) | ((uint8_t)s[i + 3] & 0x3F);
            if (v >= 0x10000 && v <= 0x10FFFF) { cp = v; len = 4; }
        }
        if (cp >= 0x10000) { cp -= 0x10000; o.push_back((char16_t)(0xD800 + (cp >> 10))); o.push_back((char16_t)(0xDC00 + (cp & 0x3FF))); }
        else o.push_back((char16_t)cp);
        i += len;
    }
    return o;
}

inline std::string utf8(const std::u16string& s) {
    std::string o;
    for (size_t i = 0; i < s.size(); i++) {
        uint32_t c = s[i];
        if (c >= 0xD800 && c <= 0xDBFF && i + 1 < s.size() && s[i + 1] >= 0xDC00 && s[i + 1] <= 0xDFFF) { c = 0x10000 + ((c - 0xD800) << 10) + (s[i + 1] - 0xDC00); i++; }
        else if (c >= 0xD800 && c <= 0xDFFF) c = 0xFFFD;
        if (c < 0x80) o.push_back((char)c);
        else if (c < 0x800) { o.push_back((char)(0xC0 | (c >> 6))); o.push_back((char)(0x80 | (c & 0x3F))); }
        else if (c < 0x10000) { o.push_back((char)(0xE0 | (c >> 12))); o.push_back((char)(0x80 | ((c >> 6) & 0x3F))); o.push_back((char)(0x80 | (c & 0x3F))); }
        else { o.push_back((char)(0xF0 | (c >> 18))); o.push_back((char)(0x80 | ((c >> 12) & 0x3F))); o.push_back((char)(0x80 | ((c >> 6) & 0x3F))); o.push_back((char)(0x80 | (c & 0x3F))); }
    }
    return o;
}

/* ------------------------------------------------ JSON, read strictly (JSON.parse's grammar), as UTF-16 code units */

struct J {
    enum T { NUL, BOOL, NUM, STR, ARR, OBJ } t = NUL;
    bool b = false;
    double n = 0;
    std::u16string s;
    std::vector<J> a;                 /* an array's values; an object's values, beside keys */
    std::vector<std::u16string> keys; /* an object's names, in the order they were written */
    const J* get(const char* name) const {   /* a name given twice: the last one stands, as in JSON.parse */
        std::u16string k; for (const char* p = name; *p; p++) k.push_back((char16_t)(uint8_t)*p);
        for (size_t i = keys.size(); i-- > 0;) if (keys[i] == k) return &a[i];
        return nullptr;
    }
};

struct Reader {
    const std::u16string& s;
    size_t i = 0;
    explicit Reader(const std::u16string& text) : s(text) {}
    void ws() { while (i < s.size() && (s[i] == ' ' || s[i] == '\t' || s[i] == '\n' || s[i] == '\r')) i++; }
    bool lit(const char* w) {
        size_t m = strlen(w);
        if (i + m > s.size()) return false;
        for (size_t k = 0; k < m; k++) if (s[i + k] != (char16_t)w[k]) return false;
        i += m;
        return true;
    }
    bool whole(J& v) { if (!value(v)) return false; ws(); return i == s.size(); }
    bool value(J& v) {
        ws();
        if (i >= s.size()) return false;
        char16_t c = s[i];
        if (c == '{') return object(v);
        if (c == '[') return array(v);
        if (c == '"') { v.t = J::STR; return string(v.s); }
        if (lit("true")) { v.t = J::BOOL; v.b = true; return true; }
        if (lit("false")) { v.t = J::BOOL; v.b = false; return true; }
        if (lit("null")) { v.t = J::NUL; return true; }
        return number(v);
    }
    bool object(J& v) {
        v.t = J::OBJ;
        i++;
        ws();
        if (i < s.size() && s[i] == '}') { i++; return true; }
        while (true) {
            ws();
            if (i >= s.size() || s[i] != '"') return false;
            std::u16string k;
            if (!string(k)) return false;
            ws();
            if (i >= s.size() || s[i] != ':') return false;
            i++;
            J x;
            if (!value(x)) return false;
            v.keys.push_back(k);
            v.a.push_back(x);
            ws();
            if (i >= s.size()) return false;
            char16_t c = s[i++];
            if (c == '}') return true;
            if (c != ',') return false;
        }
    }
    bool array(J& v) {
        v.t = J::ARR;
        i++;
        ws();
        if (i < s.size() && s[i] == ']') { i++; return true; }
        while (true) {
            J x;
            if (!value(x)) return false;
            v.a.push_back(x);
            ws();
            if (i >= s.size()) return false;
            char16_t c = s[i++];
            if (c == ']') return true;
            if (c != ',') return false;
        }
    }
    bool string(std::u16string& out) {
        i++;
        while (true) {
            if (i >= s.size()) return false;
            char16_t c = s[i++];
            if (c == '"') return true;
            if (c < 0x20) return false;
            if (c != '\\') { out.push_back(c); continue; }
            if (i >= s.size()) return false;
            char16_t e = s[i++];
            switch (e) {
                case '"': out.push_back('"'); break;
                case '\\': out.push_back('\\'); break;
                case '/': out.push_back('/'); break;
                case 'b': out.push_back(0x08); break;
                case 'f': out.push_back(0x0C); break;
                case 'n': out.push_back(0x0A); break;
                case 'r': out.push_back(0x0D); break;
                case 't': out.push_back(0x09); break;
                case 'u': {
                    if (i + 4 > s.size()) return false;
                    uint32_t v = 0;
                    for (int k = 0; k < 4; k++) {
                        char16_t d = s[i + k];
                        uint32_t x;
                        if (d >= '0' && d <= '9') x = d - '0'; else if (d >= 'a' && d <= 'f') x = d - 'a' + 10; else if (d >= 'A' && d <= 'F') x = d - 'A' + 10; else return false;
                        v = v * 16 + x;
                    }
                    i += 4;
                    out.push_back((char16_t)v);
                    break;
                }
                default: return false;
            }
        }
    }
    bool number(J& v) {
        size_t st = i;
        if (i < s.size() && s[i] == '-') i++;
        if (i >= s.size()) return false;
        if (s[i] == '0') i++;
        else if (s[i] >= '1' && s[i] <= '9') { while (i < s.size() && s[i] >= '0' && s[i] <= '9') i++; }
        else return false;
        if (i < s.size() && s[i] == '.') { i++; size_t d = i; while (i < s.size() && s[i] >= '0' && s[i] <= '9') i++; if (i == d) return false; }
        if (i < s.size() && (s[i] == 'e' || s[i] == 'E')) {
            i++;
            if (i < s.size() && (s[i] == '+' || s[i] == '-')) i++;
            size_t d = i; while (i < s.size() && s[i] >= '0' && s[i] <= '9') i++; if (i == d) return false;
        }
        std::string t;
        for (size_t k = st; k < i; k++) t.push_back((char)s[k]);
        v.t = J::NUM;
        v.n = strtod(t.c_str(), nullptr);
        return true;
    }
};

/* ------------------------------------------------ canon: PermitCore's fixed order, as JSON.stringify writes each value */

inline void u4(char16_t c, std::u16string& out) {
    static const char* hx = "0123456789abcdef";
    out += u"\\u";
    out.push_back((char16_t)hx[(c >> 12) & 15]); out.push_back((char16_t)hx[(c >> 8) & 15]);
    out.push_back((char16_t)hx[(c >> 4) & 15]); out.push_back((char16_t)hx[c & 15]);
}

inline void quote(const std::u16string& s, std::u16string& out) {
    out.push_back('"');
    for (size_t i = 0; i < s.size(); i++) {
        char16_t c = s[i];
        switch (c) {
            case '"': out += u"\\\""; break;
            case '\\': out += u"\\\\"; break;
            case 0x08: out += u"\\b"; break;
            case 0x0C: out += u"\\f"; break;
            case 0x0A: out += u"\\n"; break;
            case 0x0D: out += u"\\r"; break;
            case 0x09: out += u"\\t"; break;
            default:
                if (c < 0x20) u4(c, out);
                else if (c >= 0xD800 && c <= 0xDBFF) {
                    if (i + 1 < s.size() && s[i + 1] >= 0xDC00 && s[i + 1] <= 0xDFFF) { out.push_back(c); out.push_back(s[i + 1]); i++; }
                    else u4(c, out);
                } else if (c >= 0xDC00 && c <= 0xDFFF) u4(c, out);
                else out.push_back(c);
        }
    }
    out.push_back('"');
}

/* a whole number as JavaScript writes it; any other number is not one a release carries */
inline bool number(double d, std::u16string& out) {
    if (!std::isfinite(d) || d != std::floor(d) || std::fabs(d) >= 1e21) return false;
    char buf[64];
    if (d == 0) snprintf(buf, sizeof buf, "0"); else snprintf(buf, sizeof buf, "%.0f", d);
    for (const char* p = buf; *p; p++) out.push_back((char16_t)*p);
    return true;
}

inline bool canon(const J& v, std::u16string& out) {
    switch (v.t) {
        case J::NUL: out += u"null"; return true;
        case J::BOOL: out += v.b ? u"true" : u"false"; return true;
        case J::NUM: return number(v.n, out);
        case J::STR: quote(v.s, out); return true;
        case J::ARR:
            out.push_back('[');
            for (size_t k = 0; k < v.a.size(); k++) { if (k) out.push_back(','); if (!canon(v.a[k], out)) return false; }
            out.push_back(']');
            return true;
        case J::OBJ: {
            std::vector<size_t> idx;   /* each name once, its last value; names sorted by UTF-16 code units, as sort() does */
            for (size_t k = 0; k < v.keys.size(); k++) {
                bool later = false;
                for (size_t m = k + 1; m < v.keys.size(); m++) if (v.keys[m] == v.keys[k]) { later = true; break; }
                if (!later) idx.push_back(k);
            }
            for (size_t p = 1; p < idx.size(); p++) {
                size_t x = idx[p], q = p;
                while (q > 0 && v.keys[x] < v.keys[idx[q - 1]]) { idx[q] = idx[q - 1]; q--; }
                idx[q] = x;
            }
            out.push_back('{');
            for (size_t p = 0; p < idx.size(); p++) {
                if (p) out.push_back(',');
                quote(v.keys[idx[p]], out);
                out.push_back(':');
                if (!canon(v.a[idx[p]], out)) return false;
            }
            out.push_back('}');
            return true;
        }
    }
    return false;
}

/* ------------------------------------------------ the rest */

/* base64url without padding, as the page writes it; false when it is not */
inline bool b64u(const std::string& s, std::vector<uint8_t>& out) {
    if (s.size() % 4 == 1) return false;
    uint32_t acc = 0; int bits = 0;
    for (char ch : s) {
        int v = (ch >= 'A' && ch <= 'Z') ? ch - 'A' : (ch >= 'a' && ch <= 'z') ? ch - 'a' + 26 : (ch >= '0' && ch <= '9') ? ch - '0' + 52 : ch == '-' ? 62 : ch == '_' ? 63 : -1;
        if (v < 0) return false;
        acc = (acc << 6) | (uint32_t)v;
        bits += 6;
        if (bits >= 8) { bits -= 8; out.push_back((uint8_t)((acc >> bits) & 0xFF)); acc &= (1u << bits) - 1; }
    }
    return true;
}

inline const J* str(const J* v) { return v && v->t == J::STR ? v : nullptr; }
inline bool strIs(const J* v, const char* w) { std::u16string k; for (const char* p = w; *p; p++) k.push_back((char16_t)(uint8_t)*p); return v && v->t == J::STR && v->s == k; }
inline bool isOne(const J* v) { return v && v->t == J::NUM && v->n == 1; }
inline bool isHex64(const J* v) {
    if (!v || v->t != J::STR || v->s.size() != 64) return false;
    for (char16_t c : v->s) if (!((c >= '0' && c <= '9') || (c >= 'a' && c <= 'f'))) return false;
    return true;
}

/* nullptr when the page may open; otherwise what is wrong with it */
inline const char* check(const uint8_t* page, size_t len, bool marked, const std::string& markKid, const std::string& markApp,
                         const std::vector<Key>& keys, Crypto& cr) {
    size_t n = len < ((size_t)1 << 20) ? len : ((size_t)1 << 20);
    size_t s0 = 0, s1 = 0, b0 = 0, b1 = 0;
    bool hasSig = find(page, n, "<meta name=\"ingenium-signature\" content=\"", 8000, true, s0, s1);
    bool hasBuild = find(page, n, "<meta name=\"ingenium-build\" content=\"", 40, false, b0, b1);
    if (!hasSig || s1 == s0) return marked ? LOST : nullptr;

    /* the signature: what it says, as r349 reads it (verify and bodyOk) */
    std::vector<uint8_t> json;
    if (!b64u(std::string((const char*)page + s0, s1 - s0), json)) return UNREADABLE;
    std::u16string text = utf16(std::string(json.begin(), json.end()));
    Reader rd(text);
    J f;
    if (!rd.whole(f) || f.t != J::OBJ) return UNREADABLE;
    const J* rel = f.get("release");
    if (!strIs(f.get("kind"), "ingenium-app-signature") || !isOne(f.get("v")) || !str(f.get("kid")) || !str(f.get("sig")) || !rel || rel->t != J::OBJ) return UNREADABLE;
    const J* files = rel->get("files");
    if (!strIs(rel->get("kind"), "ingenium-app-release") || !isOne(rel->get("v")) || !str(rel->get("app")) || !str(rel->get("name"))
        || !str(rel->get("version")) || !str(rel->get("made")) || !files || files->t != J::OBJ || files->keys.empty()) return UNREADABLE;
    for (size_t k = 0; k < files->keys.size(); k++) {
        const J* last = nullptr;   /* each name's last value */
        for (size_t m = files->keys.size(); m-- > 0;) if (files->keys[m] == files->keys[k]) { last = &files->a[m]; break; }
        if (!last || last->t != J::OBJ || !isHex64(last->get("sha256"))) return UNREADABLE;
        const J* z = last->get("size");
        if (!z || z->t != J::NUM) return UNREADABLE;
    }
    const J* want = files->get("page");
    if (!want || want->t != J::OBJ) return UNREADABLE;
    std::string kid = utf8(f.get("kid")->s), app = utf8(rel->get("app")->s);
    if (marked && !markKid.empty() && markKid != kid) return OTHER_KEY;
    if (marked && !markApp.empty() && markApp != app) return OTHER_APP;
    const Key* key = nullptr;
    for (const Key& k : keys) if (k.kid == kid) { key = &k; break; }
    if (!key) return UNKNOWN_KEY;
    std::vector<uint8_t> x, y, rs;
    if (!b64u(key->x, x) || !b64u(key->y, y) || x.size() != 32 || y.size() != 32) return UNKNOWN_KEY;
    std::u16string units;
    if (!canon(*rel, units)) return UNREADABLE;
    std::string message = utf8(units);
    if (!b64u(utf8(f.get("sig")->s), rs) || rs.size() != 64 || !cr.verifyP256(x.data(), y.data(), rs.data(), (const uint8_t*)message.data(), message.size())) return BAD_SIGNATURE;

    /* the page, its signature's content and its build number left out, hashed and measured */
    std::vector<std::pair<size_t, size_t>> cuts;
    cuts.push_back({s0, s1});
    if (hasBuild && b1 > b0) { if (b0 < s0) cuts.insert(cuts.begin(), {b0, b1}); else cuts.push_back({b0, b1}); }
    std::vector<std::pair<const uint8_t*, size_t>> parts;
    size_t at = 0, size = 0;
    for (auto& c : cuts) { parts.push_back({page + at, c.first - at}); size += c.first - at; at = c.second; }
    parts.push_back({page + at, len - at});
    size += len - at;
    uint8_t h[32];
    if (!cr.sha256(parts, h)) return UNREADABLE;
    static const char* hx = "0123456789abcdef";
    std::u16string hex;
    for (uint8_t b : h) { hex.push_back((char16_t)hx[b >> 4]); hex.push_back((char16_t)hx[b & 15]); }
    if (hex != want->get("sha256")->s || (double)size != want->get("size")->n) return CHANGED;
    return nullptr;
}

/* the page shown in place of the app's own: the template's three places filled, each escaped */
inline std::string esc(const std::string& s) {
    std::string o;
    for (char c : s) {
        if (c == '&') o += "&amp;"; else if (c == '<') o += "&lt;"; else if (c == '>') o += "&gt;"; else if (c == '"') o += "&quot;"; else if (c == '\'') o += "&#39;"; else o.push_back(c);
    }
    return o;
}

inline std::string fill(const std::string& tpl, const std::string& name, const std::string& file, const std::string& why) {
    std::string o = tpl;
    const std::pair<const char*, std::string> slots[] = {{"{{NAME}}", esc(name)}, {"{{FILE}}", esc(file)}, {"{{WHY}}", esc(why)}};
    for (auto& sl : slots) {
        size_t p = 0, m = strlen(sl.first);
        while ((p = o.find(sl.first, p)) != std::string::npos) { o.replace(p, m, sl.second); p += sl.second.size(); }
    }
    return o;
}

}  // namespace ingsig

#ifdef _WIN32
/* Windows' own cryptography (CNG): SHA-256, and ECDSA P-256 with the signature as r and s, as Web Crypto gives it */
#include <windows.h>
#include <bcrypt.h>
#pragma comment(lib, "bcrypt.lib")
namespace ingsig {
struct WinCrypto : Crypto {
    bool sha256(const std::vector<std::pair<const uint8_t*, size_t>>& parts, uint8_t out[32]) override {
        BCRYPT_ALG_HANDLE alg = nullptr; BCRYPT_HASH_HANDLE hh = nullptr; bool ok = false;
        if (!BCRYPT_SUCCESS(BCryptOpenAlgorithmProvider(&alg, BCRYPT_SHA256_ALGORITHM, nullptr, 0))) return false;
        if (BCRYPT_SUCCESS(BCryptCreateHash(alg, &hh, nullptr, 0, nullptr, 0, 0))) {
            ok = true;
            for (auto& p : parts) {
                size_t off = 0;
                while (ok && off < p.second) {
                    ULONG n = (ULONG)((p.second - off) > (1u << 30) ? (1u << 30) : (p.second - off));
                    ok = BCRYPT_SUCCESS(BCryptHashData(hh, (PUCHAR)(p.first + off), n, 0));
                    off += n;
                }
            }
            if (ok) ok = BCRYPT_SUCCESS(BCryptFinishHash(hh, out, 32, 0));
            BCryptDestroyHash(hh);
        }
        BCryptCloseAlgorithmProvider(alg, 0);
        return ok;
    }
    bool verifyP256(const uint8_t x[32], const uint8_t y[32], const uint8_t rs[64], const uint8_t* msg, size_t n) override {
        uint8_t digest[32];
        if (!sha256({{msg, n}}, digest)) return false;
        BCRYPT_ALG_HANDLE alg = nullptr; BCRYPT_KEY_HANDLE key = nullptr; bool ok = false;
        if (!BCRYPT_SUCCESS(BCryptOpenAlgorithmProvider(&alg, BCRYPT_ECDSA_P256_ALGORITHM, nullptr, 0))) return false;
        uint8_t blob[sizeof(BCRYPT_ECCKEY_BLOB) + 64];
        BCRYPT_ECCKEY_BLOB* head = (BCRYPT_ECCKEY_BLOB*)blob;
        head->dwMagic = BCRYPT_ECDSA_PUBLIC_P256_MAGIC;
        head->cbKey = 32;
        memcpy(blob + sizeof(BCRYPT_ECCKEY_BLOB), x, 32);
        memcpy(blob + sizeof(BCRYPT_ECCKEY_BLOB) + 32, y, 32);
        if (BCRYPT_SUCCESS(BCryptImportKeyPair(alg, nullptr, BCRYPT_ECCPUBLIC_BLOB, &key, blob, (ULONG)sizeof blob, 0))) {
            ok = BCryptVerifySignature(key, nullptr, digest, 32, (PUCHAR)rs, 64, 0) == 0;
            BCryptDestroyKey(key);
        }
        BCryptCloseAlgorithmProvider(alg, 0);
        return ok;
    }
};
}  // namespace ingsig
#endif
