/* INGENIUM  |  Copyright (c) 2026 Yannie D. Forest. All rights reserved.
   NO LICENCE IS GRANTED. See LICENCE.txt.

   6.82 (11 November 2026): an app page carried without the copy of itself that it carries (build/self_copy.py, modules/r275.js).
   Carpe Diem carries its own page, compressed (gzip) and written in base64, in its block cd-self-src-data: 18.9 MB of the 43.1 MB
   that Carpe Diem took in Ingenium's page at 6.81, and a part that no compressor makes smaller. Ingenium carries Carpe Diem without
   that block's text, and this puts it back, letter for letter, from Carpe Diem's own page:
     1. the copy's page, from runs of the page carried (meta.ops: [start, length] or text, as demo_recipe.py writes them);
     2. compressed as zlib does at its level 9 (pako's deflate, a port of zlib; build/pako/), with the copy's own gzip head, its
        CRC-32 and its length;
     3. written in base64 and put back where the block's text stood (meta.at).
   build/self_copy.py proves, with this very code and this very pako, that the page comes back whole before Ingenium carries it so;
   the page then checks the whole against Carpe Diem's own fingerprint (modules/r120.js, modules/r268.js).
   The same text runs in Node (the proof), in a worker of the page and, when a worker cannot be made, in the page itself. */
function ingSelfRebuild(pako, cdx, meta) {
  "use strict";
  var enc = new TextEncoder();
  /* 1. the copy's page */
  var parts = [], n = 0, i;
  for (i = 0; i < meta.ops.length; i++) {
    var op = meta.ops[i], b;
    if (typeof op === "string") b = enc.encode(op);
    else {
      if (op[0] < 0 || op[1] < 0 || op[0] + op[1] > cdx.length) throw new Error("the copy's recipe reaches outside the page");
      b = cdx.subarray(op[0], op[0] + op[1]);
    }
    parts.push(b); n += b.length;
  }
  var src = new Uint8Array(n), at = 0;
  for (i = 0; i < parts.length; i++) { src.set(parts[i], at); at += parts[i].length; }
  parts = null;
  /* 2. compressed as zlib's level 9 compresses, in gzip's frame */
  var body = pako.deflateRaw(src, { level: 9, windowBits: 15, memLevel: 8, strategy: 0 });
  var head = new Uint8Array(meta.head.length / 2);
  for (i = 0; i < head.length; i++) head[i] = parseInt(meta.head.substr(i * 2, 2), 16);
  var crc = ingSelfCrc32(src), size = src.length >>> 0;
  src = null;
  var gz = new Uint8Array(head.length + body.length + 8);
  gz.set(head, 0); gz.set(body, head.length);
  var t = head.length + body.length;
  gz[t] = crc & 255; gz[t + 1] = (crc >>> 8) & 255; gz[t + 2] = (crc >>> 16) & 255; gz[t + 3] = (crc >>> 24) & 255;
  gz[t + 4] = size & 255; gz[t + 5] = (size >>> 8) & 255; gz[t + 6] = (size >>> 16) & 255; gz[t + 7] = (size >>> 24) & 255;
  body = null;
  /* 3. in base64, back in its place */
  var b64 = ingSelfBase64(gz);
  gz = null;
  if (meta.at < 0 || meta.at > cdx.length) throw new Error("the copy's place is outside the page");
  var out = new Uint8Array(cdx.length + b64.length);
  out.set(cdx.subarray(0, meta.at), 0);
  out.set(b64, meta.at);
  out.set(cdx.subarray(meta.at), meta.at + b64.length);
  if (meta.size && out.length !== meta.size) throw new Error("the page did not come back whole (its size differs)");
  return out;
}
var ING_SELF_CRC = null;
function ingSelfCrc32(u8) {
  "use strict";
  var T = ING_SELF_CRC, i, k, c;
  if (!T) {
    T = new Int32Array(256);
    for (i = 0; i < 256; i++) { c = i; for (k = 0; k < 8; k++) c = (c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1); T[i] = c; }
    ING_SELF_CRC = T;
  }
  c = -1;
  for (i = 0; i < u8.length; i++) c = T[(c ^ u8[i]) & 255] ^ (c >>> 8);
  return (c ^ -1) >>> 0;
}
function ingSelfBase64(u8) {
  "use strict";
  var A = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", E = new Uint8Array(64), i;
  for (i = 0; i < 64; i++) E[i] = A.charCodeAt(i);
  var n = u8.length, full = n - n % 3, out = new Uint8Array(Math.ceil(n / 3) * 4), o = 0, v;
  for (i = 0; i < full; i += 3) {
    v = (u8[i] << 16) | (u8[i + 1] << 8) | u8[i + 2];
    out[o++] = E[v >>> 18]; out[o++] = E[(v >>> 12) & 63]; out[o++] = E[(v >>> 6) & 63]; out[o++] = E[v & 63];
  }
  if (n - full === 1) {
    v = u8[full] << 16;
    out[o++] = E[v >>> 18]; out[o++] = E[(v >>> 12) & 63]; out[o++] = 61; out[o++] = 61;
  } else if (n - full === 2) {
    v = (u8[full] << 16) | (u8[full + 1] << 8);
    out[o++] = E[v >>> 18]; out[o++] = E[(v >>> 12) & 63]; out[o++] = E[(v >>> 6) & 63]; out[o++] = 61;
  }
  return out;
}
if (typeof module === "object" && module && typeof require === "function") module.exports = { ingSelfRebuild: ingSelfRebuild, ingSelfCrc32: ingSelfCrc32, ingSelfBase64: ingSelfBase64 };
