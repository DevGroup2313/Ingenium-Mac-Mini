/*
   INGENIUM  |  Copyright (c) 2026 Yannie D. Forest. All rights reserved.
   NO LICENCE IS GRANTED. See LICENCE.txt.

   THE PAGE AS ITS MAKER SIGNED IT (Ingenium 7.62, modules/r352.js: "your apps signed when shipped", part two).
   Before anything of the app's page runs, the shell reads it as Ingenium's own check reads a page (modules/r349.js,
   plain and checkPage): in its first MiB, the content of its first <meta name="ingenium-signature" content="...">
   and of its first <meta name="ingenium-build" content="..."> are left out, as those regular expressions find
   them; the rest is hashed with SHA-256 and compared with the release the signature carries. The signature itself,
   ECDSA P-256 with SHA-256 over the release's fields in PermitCore's fixed order (canon: keys sorted at every level,
   no spaces, strings as JSON.stringify writes them), is checked with the owner's public keys this shell carries
   (ShellCommon, written from security/owner_keys.json). A package Fabrica made signed says so in shell.json
   ("signature": {"kid", "app"}), so a page whose signature was taken away is refused too.
   The same steps, in the same order, are in the Mac and iPhone shells (SignatureCheck.swift) and the Windows shell
   (signature_check.h); shells/common/test holds the cases all of them are tested against.
   Plain Java only (no Android class), so it is also tested on a computer (shells/common/test/CheckTest.java).
*/
package studio.ingenium.shell;

import java.io.IOException;
import java.io.InputStream;
import java.math.BigDecimal;
import java.nio.charset.Charset;
import java.security.KeyFactory;
import java.security.MessageDigest;
import java.security.PublicKey;
import java.security.Signature;
import java.security.spec.X509EncodedKeySpec;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.TreeMap;

final class SignatureCheck {
    private SignatureCheck() { }

    /* what is wrong with a page, in the words the refused page says after "It " */
    static final String LOST = "has lost its signature";
    static final String UNREADABLE = "carries a signature that cannot be read";
    static final String UNKNOWN_KEY = "is signed with a key this app does not know";
    static final String OTHER_KEY = "is signed with another key than the one it was made with";
    static final String OTHER_APP = "is another app's page";
    static final String BAD_SIGNATURE = "does not match its own signature";
    static final String CHANGED = "changed since it was signed";
    static final String MISSING = "is missing";

    static final int WINDOW = 1 << 20;
    private static final Charset UTF8 = Charset.forName("UTF-8");
    private static final byte[] SIG_PREFIX = ascii("<meta name=\"ingenium-signature\" content=\"");
    private static final byte[] BUILD_PREFIX = ascii("<meta name=\"ingenium-build\" content=\"");
    /* a P-256 public key's SubjectPublicKeyInfo, up to the point's own bytes (04, x, y) */
    private static final byte[] SPKI_HEAD = {0x30, 0x59, 0x30, 0x13, 0x06, 0x07, 0x2a, (byte) 0x86, 0x48, (byte) 0xce, 0x3d, 0x02, 0x01,
        0x06, 0x08, 0x2a, (byte) 0x86, 0x48, (byte) 0xce, 0x3d, 0x03, 0x01, 0x07, 0x03, 0x42, 0x00};

    /** null when the page may open; otherwise what is wrong with it. The stream is read to its end when it is signed. */
    static String check(InputStream page, boolean marked, String markKid, String markApp, String[][] keys) throws IOException {
        byte[] win = new byte[WINDOW];
        int n = 0;
        while (n < WINDOW) { int r = page.read(win, n, WINDOW - n); if (r < 0) break; n += r; }
        int[] sig = find(win, n, SIG_PREFIX, 8000, true);
        int[] build = find(win, n, BUILD_PREFIX, 40, false);
        if (sig == null || sig[1] == sig[0]) return marked ? LOST : null;

        /* the signature: what it says, as r349 reads it (verify and bodyOk) */
        byte[] json = b64u(new String(win, sig[0], sig[1] - sig[0], UTF8));
        Object parsed;
        try { parsed = json == null ? null : new Json(new String(json, UTF8)).whole(); } catch (RuntimeException e) { parsed = null; }
        if (!(parsed instanceof TreeMap)) return UNREADABLE;
        Map<?, ?> f = (Map<?, ?>) parsed;
        if (!"ingenium-app-signature".equals(f.get("kind")) || !isOne(f.get("v")) || !(f.get("kid") instanceof String)
                || !(f.get("sig") instanceof String) || !(f.get("release") instanceof TreeMap)) return UNREADABLE;
        Map<?, ?> rel = (Map<?, ?>) f.get("release");
        if (!"ingenium-app-release".equals(rel.get("kind")) || !isOne(rel.get("v")) || !(rel.get("app") instanceof String)
                || !(rel.get("name") instanceof String) || !(rel.get("version") instanceof String) || !(rel.get("made") instanceof String)
                || !(rel.get("files") instanceof TreeMap)) return UNREADABLE;
        Map<?, ?> files = (Map<?, ?>) rel.get("files");
        if (files.isEmpty()) return UNREADABLE;
        for (Object v : files.values()) {
            if (!(v instanceof TreeMap)) return UNREADABLE;
            Object h = ((Map<?, ?>) v).get("sha256"), z = ((Map<?, ?>) v).get("size");
            if (!(h instanceof String) || !((String) h).matches("[0-9a-f]{64}") || !(z instanceof Double)) return UNREADABLE;
        }
        Object want = files.get("page");
        if (!(want instanceof TreeMap)) return UNREADABLE;
        String kid = (String) f.get("kid");
        if (marked && markKid != null && markKid.length() > 0 && !markKid.equals(kid)) return OTHER_KEY;
        if (marked && markApp != null && markApp.length() > 0 && !markApp.equals(rel.get("app"))) return OTHER_APP;
        String[] key = null;
        for (String[] k : keys) if (k[0].equals(kid)) key = k;
        if (key == null) return UNKNOWN_KEY;
        byte[] x = b64u(key[1]), y = b64u(key[2]), rs = b64u((String) f.get("sig"));
        if (x == null || y == null || x.length != 32 || y.length != 32) return UNKNOWN_KEY;
        String canon;
        try { StringBuilder b = new StringBuilder(); canon(rel, b); canon = b.toString(); } catch (RuntimeException e) { return UNREADABLE; }
        if (rs == null || rs.length != 64 || !verify(x, y, rs, canon.getBytes(UTF8))) return BAD_SIGNATURE;

        /* the page, its signature's content and its build number left out, hashed and measured */
        MessageDigest md;
        try { md = MessageDigest.getInstance("SHA-256"); } catch (Exception e) { return UNREADABLE; }
        List<int[]> cuts = new ArrayList<int[]>();
        cuts.add(sig);
        if (build != null && build[1] > build[0]) { if (build[0] < sig[0]) cuts.add(0, build); else cuts.add(build); }
        long size = 0;
        int at = 0;
        for (int[] c : cuts) { md.update(win, at, c[0] - at); size += c[0] - at; at = c[1]; }
        md.update(win, at, n - at);
        size += n - at;
        byte[] buf = new byte[1 << 16];
        int r;
        while ((r = page.read(buf)) > 0) { md.update(buf, 0, r); size += r; }
        Map<?, ?> w = (Map<?, ?>) want;
        if (!hex(md.digest()).equals(w.get("sha256")) || (double) size != (Double) w.get("size")) return CHANGED;
        return null;
    }

    /** the page shown in place of the app's own: the template's three places filled, each escaped */
    static String fill(String template, String name, String file, String why) {
        return template.replace("{{NAME}}", esc(name)).replace("{{FILE}}", esc(file)).replace("{{WHY}}", esc(why));
    }

    static String esc(String s) {
        StringBuilder b = new StringBuilder();
        for (int i = 0; i < s.length(); i++) {
            char c = s.charAt(i);
            if (c == '&') b.append("&amp;"); else if (c == '<') b.append("&lt;"); else if (c == '>') b.append("&gt;");
            else if (c == '"') b.append("&quot;"); else if (c == '\'') b.append("&#39;"); else b.append(c);
        }
        return b.toString();
    }

    /* ------------------------------------------------ the two tags, found as r349's regular expressions find them */

    /** {start, end} of the content of the first tag that matches entirely within the first n bytes, or null */
    static int[] find(byte[] w, int n, byte[] prefix, int limit, boolean sigChars) {
        int m = prefix.length;
        for (int i = 0; i + m + 2 <= n; i++) {
            if (w[i] != prefix[0]) continue;
            int j = 1;
            while (j < m && w[i + j] == prefix[j]) j++;
            if (j < m) continue;
            int s = i + m, e = s;
            while (e < n && e - s <= limit && allowed(w[e], sigChars)) e++;
            if (e - s <= limit && e + 1 < n && w[e] == '"' && w[e + 1] == '>') return new int[]{s, e};
        }
        return null;
    }

    private static boolean allowed(byte b, boolean sigChars) {
        int c = b & 0xff;
        if ((c >= 'A' && c <= 'Z') || (c >= 'a' && c <= 'z') || (c >= '0' && c <= '9') || c == '-') return true;
        return sigChars ? c == '_' : c == '.';
    }

    /* ------------------------------------------------ canon: PermitCore's fixed order, as JSON.stringify writes each value */

    static void canon(Object v, StringBuilder b) {
        if (v == Json.NULL) b.append("null");
        else if (v instanceof Boolean) b.append(((Boolean) v) ? "true" : "false");
        else if (v instanceof Double) b.append(number((Double) v));
        else if (v instanceof String) quote((String) v, b);
        else if (v instanceof List) {
            b.append('[');
            List<?> l = (List<?>) v;
            for (int i = 0; i < l.size(); i++) { if (i > 0) b.append(','); canon(l.get(i), b); }
            b.append(']');
        } else if (v instanceof TreeMap) {
            b.append('{');
            boolean first = true;
            for (Map.Entry<?, ?> e : ((TreeMap<?, ?>) v).entrySet()) {   /* a TreeMap of String keys: sorted by UTF-16 code units, as sort() does */
                if (!first) b.append(',');
                first = false;
                quote((String) e.getKey(), b);
                b.append(':');
                canon(e.getValue(), b);
            }
            b.append('}');
        } else throw new IllegalArgumentException("a value canon does not write");
    }

    /** a whole number as JavaScript writes it; any other number is not one a release carries */
    static String number(double d) {
        if (Double.isNaN(d) || Double.isInfinite(d) || d != Math.rint(d) || Math.abs(d) >= 1e21) throw new IllegalArgumentException("not a whole number");
        if (d == 0) return "0";
        return new BigDecimal(d).toBigInteger().toString();
    }

    static void quote(String s, StringBuilder b) {
        b.append('"');
        for (int i = 0; i < s.length(); i++) {
            char c = s.charAt(i);
            switch (c) {
                case '"': b.append("\\\""); break;
                case '\\': b.append("\\\\"); break;
                case '\b': b.append("\\b"); break;
                case '\f': b.append("\\f"); break;
                case '\n': b.append("\\n"); break;
                case '\r': b.append("\\r"); break;
                case '\t': b.append("\\t"); break;
                default:
                    if (c < 0x20) u4(c, b);
                    else if (Character.isHighSurrogate(c)) {
                        if (i + 1 < s.length() && Character.isLowSurrogate(s.charAt(i + 1))) { b.append(c).append(s.charAt(i + 1)); i++; }
                        else u4(c, b);
                    } else if (Character.isLowSurrogate(c)) u4(c, b);
                    else b.append(c);
            }
        }
        b.append('"');
    }

    private static void u4(char c, StringBuilder b) {
        String h = Integer.toHexString(c);
        b.append("\\u");
        for (int k = h.length(); k < 4; k++) b.append('0');
        b.append(h);
    }

    /* ------------------------------------------------ JSON, read strictly (JSON.parse's grammar), into what canon writes */

    static final class Json {
        static final Object NULL = new Object();
        private final String s;
        private int i;

        Json(String s) { this.s = s; }

        Object whole() { Object v = value(); ws(); if (i != s.length()) throw bad(); return v; }

        private RuntimeException bad() { return new IllegalArgumentException("not JSON at " + i); }

        private void ws() { while (i < s.length()) { char c = s.charAt(i); if (c == ' ' || c == '\t' || c == '\n' || c == '\r') i++; else break; } }

        private Object value() {
            ws();
            if (i >= s.length()) throw bad();
            char c = s.charAt(i);
            if (c == '{') return object();
            if (c == '[') return array();
            if (c == '"') return string();
            if (s.startsWith("true", i)) { i += 4; return Boolean.TRUE; }
            if (s.startsWith("false", i)) { i += 5; return Boolean.FALSE; }
            if (s.startsWith("null", i)) { i += 4; return NULL; }
            return number();
        }

        private Object object() {
            TreeMap<String, Object> m = new TreeMap<String, Object>();
            i++;
            ws();
            if (i < s.length() && s.charAt(i) == '}') { i++; return m; }
            while (true) {
                ws();
                if (i >= s.length() || s.charAt(i) != '"') throw bad();
                String k = string();
                ws();
                if (i >= s.length() || s.charAt(i) != ':') throw bad();
                i++;
                m.put(k, value());   /* a name given twice: the last one stands, as in JSON.parse */
                ws();
                if (i >= s.length()) throw bad();
                char c = s.charAt(i++);
                if (c == '}') return m;
                if (c != ',') throw bad();
            }
        }

        private Object array() {
            List<Object> l = new ArrayList<Object>();
            i++;
            ws();
            if (i < s.length() && s.charAt(i) == ']') { i++; return l; }
            while (true) {
                l.add(value());
                ws();
                if (i >= s.length()) throw bad();
                char c = s.charAt(i++);
                if (c == ']') return l;
                if (c != ',') throw bad();
            }
        }

        private String string() {
            StringBuilder b = new StringBuilder();
            i++;
            while (true) {
                if (i >= s.length()) throw bad();
                char c = s.charAt(i++);
                if (c == '"') return b.toString();
                if (c < 0x20) throw bad();
                if (c != '\\') { b.append(c); continue; }
                if (i >= s.length()) throw bad();
                char e = s.charAt(i++);
                switch (e) {
                    case '"': b.append('"'); break;
                    case '\\': b.append('\\'); break;
                    case '/': b.append('/'); break;
                    case 'b': b.append('\b'); break;
                    case 'f': b.append('\f'); break;
                    case 'n': b.append('\n'); break;
                    case 'r': b.append('\r'); break;
                    case 't': b.append('\t'); break;
                    case 'u':
                        if (i + 4 > s.length()) throw bad();
                        int v = 0;
                        for (int k = 0; k < 4; k++) {
                            int d = Character.digit(s.charAt(i + k), 16);
                            if (d < 0) throw bad();
                            v = v * 16 + d;
                        }
                        i += 4;
                        b.append((char) v);
                        break;
                    default: throw bad();
                }
            }
        }

        private Object number() {
            int st = i;
            if (i < s.length() && s.charAt(i) == '-') i++;
            if (i >= s.length()) throw bad();
            if (s.charAt(i) == '0') i++;
            else if (s.charAt(i) >= '1' && s.charAt(i) <= '9') { while (i < s.length() && Character.isDigit(s.charAt(i)) && s.charAt(i) < 128) i++; }
            else throw bad();
            if (i < s.length() && s.charAt(i) == '.') {
                i++;
                int d = i;
                while (i < s.length() && s.charAt(i) >= '0' && s.charAt(i) <= '9') i++;
                if (i == d) throw bad();
            }
            if (i < s.length() && (s.charAt(i) == 'e' || s.charAt(i) == 'E')) {
                i++;
                if (i < s.length() && (s.charAt(i) == '+' || s.charAt(i) == '-')) i++;
                int d = i;
                while (i < s.length() && s.charAt(i) >= '0' && s.charAt(i) <= '9') i++;
                if (i == d) throw bad();
            }
            return Double.valueOf(s.substring(st, i));
        }
    }

    /* ------------------------------------------------ the rest */

    private static boolean isOne(Object v) { return v instanceof Double && (Double) v == 1.0; }

    static boolean verify(byte[] x, byte[] y, byte[] rs, byte[] message) {
        try {
            byte[] spki = new byte[SPKI_HEAD.length + 65];
            System.arraycopy(SPKI_HEAD, 0, spki, 0, SPKI_HEAD.length);
            spki[SPKI_HEAD.length] = 4;
            System.arraycopy(x, 0, spki, SPKI_HEAD.length + 1, 32);
            System.arraycopy(y, 0, spki, SPKI_HEAD.length + 33, 32);
            PublicKey pk = KeyFactory.getInstance("EC").generatePublic(new X509EncodedKeySpec(spki));
            Signature v = Signature.getInstance("SHA256withECDSA");
            v.initVerify(pk);
            v.update(message);
            return v.verify(der(rs));
        } catch (Exception e) {
            return false;
        }
    }

    /** r and s (32 bytes each, as Web Crypto gives them) as the DER sequence Java reads */
    private static byte[] der(byte[] rs) {
        byte[] r = whole(rs, 0), s = whole(rs, 32);
        byte[] out = new byte[6 + r.length + s.length];
        out[0] = 0x30;
        out[1] = (byte) (4 + r.length + s.length);
        out[2] = 0x02;
        out[3] = (byte) r.length;
        System.arraycopy(r, 0, out, 4, r.length);
        out[4 + r.length] = 0x02;
        out[5 + r.length] = (byte) s.length;
        System.arraycopy(s, 0, out, 6 + r.length, s.length);
        return out;
    }

    private static byte[] whole(byte[] src, int off) {
        int k = off;
        while (k < off + 31 && src[k] == 0) k++;
        boolean pad = (src[k] & 0x80) != 0;
        byte[] out = new byte[off + 32 - k + (pad ? 1 : 0)];
        System.arraycopy(src, k, out, pad ? 1 : 0, off + 32 - k);
        return out;
    }

    /** base64url without padding, as the page writes it; null when it is not */
    static byte[] b64u(String s) {
        int n = s.length();
        if (n % 4 == 1) return null;
        byte[] out = new byte[n * 6 / 8];
        int o = 0, acc = 0, bits = 0;
        for (int k = 0; k < n; k++) {
            char c = s.charAt(k);
            int v = c >= 'A' && c <= 'Z' ? c - 'A' : c >= 'a' && c <= 'z' ? c - 'a' + 26 : c >= '0' && c <= '9' ? c - '0' + 52 : c == '-' ? 62 : c == '_' ? 63 : -1;
            if (v < 0) return null;
            acc = (acc << 6) | v;
            bits += 6;
            if (bits >= 8) { bits -= 8; out[o++] = (byte) (acc >> bits); acc &= (1 << bits) - 1; }
        }
        return out;
    }

    static String hex(byte[] b) {
        StringBuilder s = new StringBuilder();
        for (byte x : b) { s.append(Character.forDigit((x >> 4) & 15, 16)).append(Character.forDigit(x & 15, 16)); }
        return s.toString();
    }

    private static byte[] ascii(String s) {
        byte[] b = new byte[s.length()];
        for (int k = 0; k < s.length(); k++) b[k] = (byte) s.charAt(k);
        return b;
    }
}
