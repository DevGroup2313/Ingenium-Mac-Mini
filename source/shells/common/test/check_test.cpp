/* INGENIUM | Copyright (c) 2026 Yannie D. Forest. All rights reserved. NO LICENCE IS GRANTED.
   The Windows shell's check of its page (shells/windows/signature_check.h), run against the cases of vectors.json
   (make_vectors.mjs) with the two test keys they were made with: each answer must be the one the case names.
   On Windows (GitHub's, by build-shells.yml) with Windows' own cryptography, as the shell itself does:
     cl /nologo /EHsc /std:c++17 /utf-8 /I source\shells\windows source\shells\common\test\check_test.cpp /Fe:check_test.exe
   Elsewhere with OpenSSL:
     g++ -std=c++17 -O2 -I source/shells/windows source/shells/common/test/check_test.cpp -lcrypto -o check_test
   then: check_test source/shells/common/test/vectors.json */
#include "signature_check.h"
#include <fstream>
#include <iostream>
#include <sstream>
#ifndef _WIN32
#include <openssl/evp.h>
#include <openssl/x509.h>
struct SslCrypto : ingsig::Crypto {
    bool sha256(const std::vector<std::pair<const uint8_t*, size_t>>& parts, uint8_t out[32]) override {
        EVP_MD_CTX* c = EVP_MD_CTX_new(); unsigned int n = 0; bool ok = EVP_DigestInit_ex(c, EVP_sha256(), nullptr) == 1;
        for (auto& p : parts) if (ok && p.second) ok = EVP_DigestUpdate(c, p.first, p.second) == 1;
        if (ok) ok = EVP_DigestFinal_ex(c, out, &n) == 1 && n == 32;
        EVP_MD_CTX_free(c); return ok;
    }
    bool verifyP256(const uint8_t x[32], const uint8_t y[32], const uint8_t rs[64], const uint8_t* msg, size_t n) override {
        static const uint8_t head[26] = {0x30,0x59,0x30,0x13,0x06,0x07,0x2a,0x86,0x48,0xce,0x3d,0x02,0x01,0x06,0x08,0x2a,0x86,0x48,0xce,0x3d,0x03,0x01,0x07,0x03,0x42,0x00};
        uint8_t spki[91]; memcpy(spki, head, 26); spki[26] = 4; memcpy(spki + 27, x, 32); memcpy(spki + 59, y, 32);
        const uint8_t* p = spki; EVP_PKEY* key = d2i_PUBKEY(nullptr, &p, sizeof spki); if (!key) return false;
        auto whole = [](const uint8_t* v, std::vector<uint8_t>& o) { int k = 0; while (k < 31 && v[k] == 0) k++; if (v[k] & 0x80) o.push_back(0); o.insert(o.end(), v + k, v + 32); };
        std::vector<uint8_t> r, s; whole(rs, r); whole(rs + 32, s);
        std::vector<uint8_t> der = {0x30, (uint8_t)(4 + r.size() + s.size()), 0x02, (uint8_t)r.size()}; der.insert(der.end(), r.begin(), r.end());
        der.push_back(0x02); der.push_back((uint8_t)s.size()); der.insert(der.end(), s.begin(), s.end());
        EVP_MD_CTX* c = EVP_MD_CTX_new();
        bool ok = EVP_DigestVerifyInit(c, nullptr, EVP_sha256(), nullptr, key) == 1 && EVP_DigestVerify(c, der.data(), der.size(), msg, n) == 1;
        EVP_MD_CTX_free(c); EVP_PKEY_free(key); return ok;
    }
};
#endif
static std::vector<uint8_t> b64(const std::string& s) {   /* standard base64, with padding */
    std::vector<uint8_t> o; uint32_t acc = 0; int bits = 0;
    for (char ch : s) {
        int v = (ch >= 'A' && ch <= 'Z') ? ch - 'A' : (ch >= 'a' && ch <= 'z') ? ch - 'a' + 26 : (ch >= '0' && ch <= '9') ? ch - '0' + 52 : ch == '+' ? 62 : ch == '/' ? 63 : -1;
        if (v < 0) continue;
        acc = (acc << 6) | (uint32_t)v; bits += 6; if (bits >= 8) { bits -= 8; o.push_back((uint8_t)((acc >> bits) & 0xFF)); acc &= (1u << bits) - 1; }
    }
    return o;
}
int main(int argc, char** argv) {
    std::ifstream in(argc > 1 ? argv[1] : "vectors.json", std::ios::binary); std::stringstream ss; ss << in.rdbuf();
    std::u16string text = ingsig::utf16(ss.str()); ingsig::Reader rd(text); ingsig::J v;
    if (!rd.whole(v) || v.t != ingsig::J::OBJ) { std::cout << "FAIL the cases could not be read\n"; return 1; }
    std::vector<ingsig::Key> keys;
    for (auto& k : v.get("keys")->a) keys.push_back({ingsig::utf8(k.a[0].s), ingsig::utf8(k.a[1].s), ingsig::utf8(k.a[2].s)});
#ifdef _WIN32
    ingsig::WinCrypto cr;
#else
    SslCrypto cr;
#endif
    int pass = 0, fail = 0;
    for (auto& c : v.get("cases")->a) {
        std::vector<uint8_t> page;
        for (auto& part : c.get("parts")->a) {
            if (part.get("b64")) { auto b = b64(ingsig::utf8(part.get("b64")->s)); page.insert(page.end(), b.begin(), b.end()); }
            else { std::string r = ingsig::utf8(part.get("rep")->s); for (long k = 0; k < (long)part.get("count")->n; k++) page.insert(page.end(), r.begin(), r.end()); }
        }
        const ingsig::J* want = c.get("want");
        const char* got = ingsig::check(page.data(), page.size(), c.get("marked")->t == ingsig::J::BOOL && c.get("marked")->b,
                                        ingsig::utf8(c.get("kid")->s), ingsig::utf8(c.get("app")->s), keys, cr);
        bool ok = want->t == ingsig::J::NUL ? got == nullptr : (got && ingsig::utf8(want->s) == got);
        (ok ? pass : fail)++;
        std::cout << (ok ? "PASS " : "FAIL ") << ingsig::utf8(c.get("name")->s) << ": " << (got ? std::string("It ") + got + "." : std::string("opens"));
        if (!ok) std::cout << "  (wanted: " << (want->t == ingsig::J::NUL ? std::string("opens") : "It " + ingsig::utf8(want->s) + ".") << ")";
        std::cout << "\n";
    }
    std::cout << pass << " passed, " << fail << " failed, of " << (pass + fail) << "\n";
    return fail == 0 && pass > 0 ? 0 : 1;
}
