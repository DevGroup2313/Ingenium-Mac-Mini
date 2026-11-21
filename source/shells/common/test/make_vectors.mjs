// INGENIUM | Copyright (c) 2026 Yannie D. Forest. All rights reserved. NO LICENCE IS GRANTED.
// The cases every shell's check of its page is tested against (Ingenium 7.62, modules/r352.js): pages signed as Ingenium signs
// them (modules/r349.js, signPage: the tag in the head, the page hashed with the tag's content and the build number left out,
// ECDSA P-256 with SHA-256 over canon(release)), with two keys made here for the tests and thrown away (only their public halves
// are written; never an owner key), then changed in each way a copy can be changed. Each case says what the shells must answer
// (null: it opens; otherwise what the refused page says after "It "), and what r349's own check (checkPage, copied below as it
// is) says of the same page, so the shells and Ingenium agree.
//   node shells/common/test/make_vectors.mjs shells/common/test/vectors.json
import fs from 'node:fs';
const { subtle } = globalThis.crypto; const TE = new TextEncoder(), TD = new TextDecoder();
const OUT = process.argv[2];
const b64u = (u8) => Buffer.from(u8).toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
const unb64u = (s) => new Uint8Array(Buffer.from(String(s).replace(/-/g, '+').replace(/_/g, '/'), 'base64'));
const hex = (b) => Buffer.from(new Uint8Array(b)).toString('hex');
const sha = async (u8) => hex(await subtle.digest('SHA-256', u8));
// PermitCore's canon (build/thoughts/permit_core.html), as it is
function canon(v) { if (v === null || typeof v !== 'object') return JSON.stringify(v); if (Array.isArray(v)) return '[' + v.map(canon).join(',') + ']';
  return '{' + Object.keys(v).sort().filter((k) => v[k] !== undefined).map((k) => JSON.stringify(k) + ':' + canon(v[k])).join(',') + '}'; }
// r349's plain and checkPage, as they are (modules/r349.js)
const SIGTAG = /<meta name="ingenium-signature" content="([A-Za-z0-9_-]{0,8000})">/, BUILDTAG = /<meta name="ingenium-build" content="([0-9A-Za-z.\-]{0,40})">/;
function latin(u8) { return new TextDecoder('iso-8859-1').decode(u8); }
function plain(u8) { const s = latin(u8.subarray(0, Math.min(u8.length, 1 << 20))), cut = []; let sig = '', build = '';
  let m = SIGTAG.exec(s); if (m) { sig = m[1]; if (sig.length) { const a = m.index + m[0].indexOf('content="') + 9; cut.push([a, a + sig.length]); } }
  m = BUILDTAG.exec(s); if (m) { build = m[1]; if (build.length) { const b = m.index + m[0].indexOf('content="') + 9; cut.push([b, b + build.length]); } }
  if (!cut.length) return { bytes: u8, sig, build };
  cut.sort((x, y) => x[0] - y[0]); const parts = []; let last = 0; cut.forEach((c) => { parts.push(u8.subarray(last, c[0])); last = c[1]; }); parts.push(u8.subarray(last));
  let n = 0; parts.forEach((p) => { n += p.length; }); const out = new Uint8Array(n); let o = 0; parts.forEach((p) => { out.set(p, o); o += p.length; });
  return { bytes: out, sig, build }; }
function bodyOk(b) { try { if (!b || b.kind !== 'ingenium-app-release' || b.v !== 1 || typeof b.app !== 'string' || typeof b.name !== 'string' || typeof b.version !== 'string' || typeof b.made !== 'string' || !b.files || typeof b.files !== 'object') return false;
  return Object.keys(b.files).length > 0 && Object.keys(b.files).every((k) => { const x = b.files[k]; return x && /^[0-9a-f]{64}$/.test(x.sha256) && typeof x.size === 'number'; }); } catch (e) { return false; } }
async function r349(u8, KEYS) { const p = plain(u8); if (!p.sig) return 'unsigned'; let f; try { f = JSON.parse(TD.decode(unb64u(p.sig))); } catch (e) { return 'foreign'; }
  if (!f || f.kind !== 'ingenium-app-signature' || f.v !== 1 || !bodyOk(f.release) || typeof f.sig !== 'string') return 'foreign';
  const k = KEYS.find((x) => x.kid === f.kid); if (!k) return 'foreign';
  const key = await subtle.importKey('jwk', { kty: 'EC', crv: 'P-256', x: k.jwk.x, y: k.jwk.y, ext: true }, { name: 'ECDSA', namedCurve: 'P-256' }, false, ['verify']);
  if (!(await subtle.verify({ name: 'ECDSA', hash: 'SHA-256' }, key, unb64u(f.sig), TE.encode(canon(f.release))))) return 'foreign';
  const want = f.release.files.page; if (!want) return 'foreign';
  return (await sha(p.bytes)) === want.sha256 && p.bytes.length === want.size ? 'signed' : 'changed'; }

async function makeKey() { const kp = await subtle.generateKey({ name: 'ECDSA', namedCurve: 'P-256' }, true, ['sign', 'verify']); const jwk = await subtle.exportKey('jwk', kp.publicKey);
  const kid = b64u(new Uint8Array(await subtle.digest('SHA-256', TE.encode(canon({ crv: jwk.crv, kty: jwk.kty, x: jwk.x, y: jwk.y }))))).slice(0, 22);
  return { kid, jwk: { kty: 'EC', crv: 'P-256', x: jwk.x, y: jwk.y }, priv: kp.privateKey }; }
const signRaw = async (k, text) => b64u(new Uint8Array(await subtle.sign({ name: 'ECDSA', hash: 'SHA-256' }, k.priv, TE.encode(text))));
// signPage, as r349 does it (the tag put in the head, the page hashed with its content and the build number empty)
async function signPage(html, k, rel) { const head = html.slice(0, 1 << 20);
  if (!SIGTAG.test(head)) html = html.replace(/<head(\s[^>]*)?>/i, (m) => m + '\n<meta name="ingenium-signature" content="">'); else html = html.replace(SIGTAG, '<meta name="ingenium-signature" content="">');
  const p = plain(TE.encode(html)); const release = Object.assign({ kind: 'ingenium-app-release', v: 1, app: 'tide-clock', name: 'Tide Clock', version: '1.0', made: '2026-11-21T12:00:00.000Z' }, rel || {},
    { files: { page: { sha256: await sha(p.bytes), size: p.bytes.length } } });
  const file = { kind: 'ingenium-app-signature', v: 1, release, kid: k.kid, sig: await signRaw(k, canon(release)) };
  return { html: html.replace(SIGTAG, () => '<meta name="ingenium-signature" content="' + b64u(TE.encode(JSON.stringify(file))) + '">'), file }; }
const withFile = (html, file) => html.replace(SIGTAG, () => '<meta name="ingenium-signature" content="' + b64u(TE.encode(JSON.stringify(file))) + '">');

const LOST = 'has lost its signature', UNREADABLE = 'carries a signature that cannot be read', UNKNOWN_KEY = 'is signed with a key this app does not know',
  OTHER_KEY = 'is signed with another key than the one it was made with', OTHER_APP = "is another app's page", BAD_SIGNATURE = 'does not match its own signature',
  CHANGED = 'changed since it was signed';
const A = await makeKey(), B = await makeKey(), STRANGER = await makeKey();
const KEYS = [A, B];   // what the shells under test carry; STRANGER is one they do not
const PAGE = '<!doctype html>\n<html lang="en">\n<head>\n<meta charset="utf-8">\n<meta name="ingenium-build" content="">\n<title>Tide Clock</title>\n</head>\n<body>\n<h1>Tide Clock</h1>\n<p>Next high water at the harbour: 18:42.</p>\n</body>\n</html>\n';
const cases = [];
// a case's page, in parts: text (as base64), or a character written many times ({rep, count}), so a large page stays small here
const partBytes = (p) => typeof p === 'string' ? Buffer.from(p, 'utf8') : Buffer.from(p.rep.repeat(p.count), 'utf8');
const add = async (name, parts, marked, kid, app, want) => { const bytes = Buffer.concat(parts.map(partBytes));
  cases.push({ name, parts: parts.map((p) => typeof p === 'string' ? { b64: Buffer.from(p, 'utf8').toString('base64') } : { rep: p.rep, count: p.count }), marked, kid: kid || '', app: app || '', want, r349: await r349(new Uint8Array(bytes), KEYS) }); };

const s1 = await signPage(PAGE, A);
await add('signed, as Fabrica made it', [s1.html], false, '', '', null);
await add('signed, and its package says so', [s1.html], true, A.kid, 'tide-clock', null);
await add('signed with the second key', [(await signPage(PAGE, B)).html], true, B.kid, 'tide-clock', null);
await add('one word changed', [s1.html.replace('high water', 'low water')], false, '', '', CHANGED);
await add('one word changed, its package says it was signed', [s1.html.replace('high water', 'low water')], true, A.kid, 'tide-clock', CHANGED);
await add('a byte added at its end', [s1.html + ' '], true, A.kid, 'tide-clock', CHANGED);
await add('not signed, as an app made unsigned', [PAGE], false, '', '', null);
await add('not signed, but its package says it was', [PAGE], true, A.kid, 'tide-clock', LOST);
await add('its signature emptied', [s1.html.replace(SIGTAG, '<meta name="ingenium-signature" content="">')], true, A.kid, 'tide-clock', LOST);
await add('its signature taken out, the package not told', [s1.html.replace(SIGTAG, '')], false, '', '', null);
await add('signed with a key the shell does not carry', [(await signPage(PAGE, STRANGER)).html], false, '', '', UNKNOWN_KEY);
await add('signed with a key the shell does not carry, the package naming it', [(await signPage(PAGE, STRANGER)).html], true, STRANGER.kid, 'tide-clock', UNKNOWN_KEY);
await add('signed with another of the owner keys than the package names', [(await signPage(PAGE, B)).html], true, A.kid, 'tide-clock', OTHER_KEY);
await add("another app's page, signed", [(await signPage(PAGE, A, { app: 'harbour-notes', name: 'Harbour Notes' })).html], true, A.kid, 'tide-clock', OTHER_APP);
await add("another app's page, the package naming no app", [(await signPage(PAGE, A, { app: 'harbour-notes', name: 'Harbour Notes' })).html], true, A.kid, '', null);
{ const f = JSON.parse(JSON.stringify(s1.file)); f.release.version = '2.0'; await add('its release changed, its signature kept', [withFile(s1.html, f)], true, A.kid, 'tide-clock', BAD_SIGNATURE); }
{ const f = JSON.parse(JSON.stringify(s1.file)); f.sig = f.sig.slice(0, -4) + (f.sig.slice(-4) === 'AAAA' ? 'BBBB' : 'AAAA'); await add('its signature altered', [withFile(s1.html, f)], false, '', '', BAD_SIGNATURE); }
{ const f = JSON.parse(JSON.stringify(s1.file)); f.sig = f.sig.slice(0, 40); await add('its signature cut short', [withFile(s1.html, f)], false, '', '', BAD_SIGNATURE); }
await add('a tag whose content is not a signature', [PAGE.replace('<head>', '<head>\n<meta name="ingenium-signature" content="bm90IGEgc2lnbmF0dXJl">')], false, '', '', UNREADABLE);
{ const f = JSON.parse(JSON.stringify(s1.file)); f.kind = 'something-else'; await add('a signature of another kind', [withFile(s1.html, f)], false, '', '', UNREADABLE); }
{ const f = JSON.parse(JSON.stringify(s1.file)); f.v = 2; await add('a signature of another version', [withFile(s1.html, f)], false, '', '', UNREADABLE); }
{ const s = await signPage(PAGE, A, { version: 5 }); await add('a release whose version is a number', [s.html], false, '', '', UNREADABLE); }
await add('its build number written in after it was signed', [s1.html.replace('<meta name="ingenium-build" content="">', '<meta name="ingenium-build" content="7.62.1043">')], true, A.kid, 'tide-clock', null);
await add('a build number the page does not read as one', [s1.html.replace('<meta name="ingenium-build" content="">', '<meta name="ingenium-build" content="7.62+1043">')], true, A.kid, 'tide-clock', CHANGED);
{ const s = await signPage(PAGE, A, { name: 'Tide "Clock" \\ \n\t\u0001   </script> é 🌊 \ud800 end', version: '1.0 β' });
  await add('a name with every kind of character', [s.html], true, A.kid, 'tide-clock', null); }
{ const s = await signPage(PAGE.replace('<p>', '<p>' + 'ü€🌊'.repeat(3000)), A); await add('a page with letters of every width', [s.html], true, A.kid, 'tide-clock', null); }
{ const s = await signPage(PAGE, A); const at = s.html.indexOf('<meta name="ingenium-signature"');
  const html2 = s.html.slice(0, at) + '<meta name="ingenium-signature" content="+not+one+">\n' + s.html.slice(at);
  await add('a first tag the page cannot read, then its own', [html2], true, A.kid, 'tide-clock', CHANGED); }
{ // signed with a first, unreadable tag already in the page: the page's own check reads the second, and the shells must too
  const pre = PAGE.replace('<head>', '<head>\n<meta name="ingenium-signature" content="+">');
  const html = pre.replace('</title>', '</title>\n<meta name="ingenium-signature" content="">');
  const p = plain(TE.encode(html)); const release = { kind: 'ingenium-app-release', v: 1, app: 'tide-clock', name: 'Tide Clock', version: '1.0', made: '2026-11-21T12:00:00.000Z', files: { page: { sha256: await sha(p.bytes), size: p.bytes.length } } };
  const file = { kind: 'ingenium-app-signature', v: 1, release, kid: A.kid, sig: await signRaw(A, canon(release)) };
  await add('its signature in the second tag, the first unreadable', [withFile(html, file)], true, A.kid, 'tide-clock', null); }
{ // a page larger than the window, signed: the tags are in its first MiB, the rest is hashed as it streams
  const N = 2400000, big = PAGE.replace('</body>', '<!--' + 'x'.repeat(N) + '-->\n</body>'); const s = await signPage(big, A);
  const at = s.html.indexOf('<!--') + 4, a = s.html.slice(0, at), b = s.html.slice(at + N);
  await add('a page of 2.4 MB, signed', [a, { rep: 'x', count: N }, b], true, A.kid, 'tide-clock', null);
  await add('a page of 2.4 MB, changed past its first MiB', [a, { rep: 'x', count: N - 1 }, 'y' + b], true, A.kid, 'tide-clock', CHANGED); }
{ // the tag past the first MiB: the page's own check does not find it, so neither may a shell
  const at = s1.html.indexOf('<meta name="ingenium-signature"'), tagEnd = s1.html.indexOf('>', at) + 1;
  const tag = s1.html.slice(at, tagEnd), rest = s1.html.slice(0, at) + s1.html.slice(tagEnd);
  const head = rest.indexOf('</head>');
  await add('its signature past the first MiB', [rest.slice(0, head), { rep: ' ', count: 1 << 20 }, tag + rest.slice(head)], false, '', '', null);
  await add('its signature past the first MiB, the package saying it was signed', [rest.slice(0, head), { rep: ' ', count: 1 << 20 }, tag + rest.slice(head)], true, A.kid, 'tide-clock', LOST); }

// the shells' answer and r349's must agree on every case
const agree = { signed: [null], changed: [CHANGED], unsigned: [null, LOST], foreign: [UNREADABLE, UNKNOWN_KEY, BAD_SIGNATURE] };
for (const c of cases) {
  const ok = c.want === OTHER_KEY || c.want === OTHER_APP || c.want === LOST ? true : agree[c.r349].includes(c.want);
  if (!ok) { console.error('the shells and r349 would not agree on', c.name, c.want, c.r349); process.exit(1); }
}
fs.writeFileSync(OUT, JSON.stringify({ made: 'shells/common/test/make_vectors.mjs (Ingenium 7.62): two keys made for the tests and thrown away; never an owner key',
  keys: KEYS.map((k) => [k.kid, k.jwk.x, k.jwk.y]), cases }, null, 1) + '\n');
console.log(cases.length, 'cases,', fs.statSync(OUT).size, 'bytes:', cases.map((c) => c.r349[0]).join(''));
