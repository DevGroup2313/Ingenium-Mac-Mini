// Ingenium 6.7 · the security audit's fixes, in Chromium. Each check shows the attack failing on the built page while
// ordinary use still works.
//   page-injection 0: a hostile .html imported into Tabula (a carried app at Ingenium's own origin) runs no code; its
//     headings, bold, lists, tables, images and links still come through. A hostile paste into Scriba and Imago is cleaned.
//   page-injection 1: a link to another site does not navigate Ingenium's own window; it opens in a new window. A
//     javascript: link runs nothing. The app's own hash links are left alone.
//   page-injection 2 / secrets-crypto-data 1: a desk file brought in whose note carries markup is sanitised at restore; the
//     restore preview says plainly what is replaced.
//   secrets-crypto-data 0: a backup that changes a connection's address does not carry the device's key onto it; a backup
//     that keeps the address does carry it.
//   page-injection 4: stripTags reads search markup as words only (an image's onerror never runs).
//   page-injection 3: the stage keys each page's store by its own identity, so two files of the same name do not share.
//   secrets-crypto-data 3: a zip bomb is refused with a plain message; a large real export still imports.
//   node rig/t_67_security.js http://127.0.0.1:8166/ingenium.html <out folder> [fixtures url, for the large-export check]
//   The hostile .html and the zip bomb are made by the test itself, in <out folder>. The optional fixtures url points at a
//   folder served with rig/import_fixtures.js output (chatgpt_big.zip), for the "a large real export still imports" check.
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs'); const path = require('path');
const URL_ = process.argv[2], OUT = process.argv[3], FIXURL = process.argv[4] || null;
fs.mkdirSync(OUT, { recursive: true });
let pass = 0, fail = 0;
const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (d !== undefined ? '  ' + String(typeof d === 'string' ? d : JSON.stringify(d)).slice(0, 400) : '')); c ? pass++ : fail++; };
// the test makes its own fixtures: a Word-style .doc/.html with code hidden among ordinary formatting, and a zip bomb
const HOSTILE = path.join(OUT, 'hostile.html');
fs.writeFileSync(HOSTILE, [
  '<!DOCTYPE html><html xmlns:o="urn:schemas-microsoft-com:office:office"><head><meta charset="utf-8">',
  '<title>Quarterly report</title>',
  '<style>body{color:red} @import url("https://evil.example/x.css");</style>',
  '<script>window.parent && (window.parent.__pwned = "head-script");<\/script>',
  '</head><body>',
  '<h1>Quarterly report</h1>',
  '<p>An <b>important</b> and <i>urgent</i> update, with a <a href="https://example.org/page">link</a>.</p>',
  '<p><o:p></o:p>Word paragraph with <u>underline</u>.</p>',
  '<ul><li>First point</li><li>Second point</li></ul>',
  '<table border="1"><thead><tr><th>Name</th><th>Value</th></tr></thead><tbody><tr><td>Alpha</td><td>1</td></tr><tr><td>Beta</td><td>2</td></tr></tbody></table>',
  '<p><img src="https://example.org/pic.png" alt="a picture"></p>',
  '<p><img src="x" onerror="window.parent && (window.parent.__pwned=\'img-onerror\')"></p>',
  '<p onclick="window.parent && (window.parent.__pwned=\'onclick\')">click me</p>',
  '<a href="javascript:window.parent&&(window.parent.__pwned=\'js-url\')">bad link</a>',
  '<iframe src="https://evil.example/frame"></iframe>',
  '<svg><script>window.parent&&(window.parent.__pwned=\'svg-script\')<\/script></svg>',
  '<script>window.parent && (window.parent.__pwned = "body-script");<\/script>',
  '</body></html>'
].join('\n'));
const ZIPBOMB = path.join(OUT, 'zipbomb.zip');
(function makeZipBomb() { const u16 = v => { const b = Buffer.alloc(2); b.writeUInt16LE(v >>> 0, 0); return b; }, u32 = v => { const b = Buffer.alloc(4); b.writeUInt32LE(v >>> 0, 0); return b; };
  const name = Buffer.from('conversations.json'), comp = Buffer.from([0x78, 0x9c, 0x03, 0x00, 0x00, 0x00, 0x00, 0x01]); const csize = comp.length, usize = 2000000000; // a few bytes declaring 2 GB
  const lh = Buffer.concat([u32(0x04034b50), u16(20), u16(0), u16(8), u16(0), u16(0), u32(0), u32(csize), u32(usize), u16(name.length), u16(0), name, comp]);
  const cd = Buffer.concat([u32(0x02014b50), u16(20), u16(20), u16(0), u16(8), u16(0), u16(0), u32(0), u32(csize), u32(usize), u16(name.length), u16(0), u16(0), u16(0), u16(0), u32(0), u32(0), name]);
  const eocd = Buffer.concat([u32(0x06054b50), u16(0), u16(0), u16(1), u16(1), u32(cd.length), u32(lh.length), u16(0)]);
  fs.writeFileSync(ZIPBOMB, Buffer.concat([lh, cd, eocd])); })();

async function boot(ctx) {
  const p = await ctx.newPage(); p.__errs = []; p.on('pageerror', e => p.__errs.push(e.message));
  await p.route('**://evil.example/**', r => r.abort());
  await p.goto(URL_); await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 180000 }); await p.waitForTimeout(800);
  await p.evaluate(() => { const b = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Enter' && x.offsetParent); if (b) b.click(); });
  await p.waitForTimeout(400); return p;
}

(async () => {
  const b = await pw.chromium.launch({ args: ['--no-sandbox'] });
  const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, acceptDownloads: true });
  try {
    const p = await boot(ctx);

    // ---------------- page-injection 0: a hostile .html imported into Tabula ----------------
    await p.evaluate(() => { try { delete window.__pwned; } catch (e) {} window.__pwned = undefined; go('tabula'); });
    await p.waitForSelector('#ing-desk iframe[data-app="tabula"]', { timeout: 30000 });
    await p.waitForFunction(() => { const f = document.querySelector('#ing-desk iframe[data-app="tabula"]'); try { return !!(f.contentWindow && f.contentWindow.document.getElementById('openFile')); } catch (e) { return false; } }, null, { timeout: 30000 });
    await p.waitForTimeout(600);
    const fr = p.frameLocator('#ing-desk iframe[data-app="tabula"]');
    await fr.locator('#openFile').setInputFiles(HOSTILE);
    await p.waitForTimeout(1500);
    const r0 = await p.evaluate(() => { const f = document.querySelector('#ing-desk iframe[data-app="tabula"]'); const d = f.contentWindow.document; const ed = d.getElementById('editor');
      const html = ed.innerHTML; const imgs = [...ed.querySelectorAll('img')].map(i => i.getAttribute('src'));
      return { pwned: window.__pwned, framePwned: f.contentWindow.__pwned,
        h1: !!ed.querySelector('h1'), b: !!ed.querySelector('b'), i: !!ed.querySelector('i'), u: !!ed.querySelector('u'),
        li: ed.querySelectorAll('li').length, td: ed.querySelectorAll('td').length, safeImg: imgs.filter(s => /^https:/.test(s)).length,
        link: !!ed.querySelector('a[href^="https:"]'), badLink: !!ed.querySelector('a[href^="javascript:"]'),
        script: ed.querySelectorAll('script').length, iframe: ed.querySelectorAll('iframe').length,
        onAttr: /\son[a-z]+=/i.test(html) }; });
    ok(r0.pwned === undefined && r0.framePwned === undefined, 'page-injection 0: the imported document ran no code (no onerror, script, onclick, svg or javascript: fired)', r0);
    ok(r0.h1 && r0.b && r0.i && r0.u && r0.li === 2 && r0.td === 4 && r0.safeImg === 1 && r0.link, 'page-injection 0: its headings, bold, lists, table, image and safe link still came through', r0);
    ok(r0.script === 0 && r0.iframe === 0 && !r0.badLink && !r0.onAttr, 'page-injection 0: the script, iframe, javascript: link and every event attribute were dropped', r0);
    await p.evaluate(() => { const f = document.querySelector('#ing-desk iframe[data-app="tabula"]'); f.contentWindow.document.getElementById('editor').innerHTML = ''; });

    // inside a carried app's frame: HTML read from the clipboard is cleaned, and turning text into markup cannot run code
    const r0b = await p.evaluate(async () => {
      const f = document.querySelector('#ing-desk iframe[data-app="tabula"]'); const w = f.contentWindow, d = w.document;
      window.__pwned2 = undefined;
      const dt = new w.DataTransfer(); dt.setData('text/html', '<b>ok</b><img src=x onerror="window.top.__pwned2=1">');
      const got = dt.getData('text/html');
      const box = d.body.appendChild(d.createElement('div')); box.setAttribute('contenteditable', 'true'); box.focus();
      try { d.execCommand('insertHTML', false, '<i>in</i><img src=y onerror="window.top.__pwned2=2">'); } catch (e) {}
      const plain = d.body.appendChild(d.createElement('div')); plain.innerHTML = '<img src=z onerror="window.top.__pwned2=3"><b>b</b>';
      await new Promise(r => setTimeout(r, 400));
      const out = { pwned: window.__pwned2, got, boxHtml: box.innerHTML, plainHtml: plain.innerHTML };
      box.remove(); plain.remove(); return out;
    });
    ok(r0b.pwned === undefined && !/onerror/i.test(r0b.got) && !/onerror/i.test(r0b.boxHtml) && !/onerror/i.test(r0b.plainHtml) && /<b>/.test(r0b.got), 'page-injection 0: inside a carried app, clipboard HTML is cleaned and no text-to-markup path runs code', r0b);

    // ---------------- page-injection 1: a link to another site opens in a new window, not Ingenium's own ----------------
    const r1 = await p.evaluate(() => { window.__pwned1 = undefined;
      const host = document.createElement('div'); host.id = '__lk'; host.style.position = 'fixed'; host.style.left = '0'; host.style.top = '0'; host.style.zIndex = 99999;
      host.innerHTML = '<a id="__ext" href="https://evil.example/go">out</a> <a id="__js" href="javascript:window.__pwned1=1">js</a> <a id="__hash" href="#models">here</a>';
      document.body.appendChild(host); return location.href; });
    const url0 = p.url();
    const [popup] = await Promise.all([ p.waitForEvent('popup', { timeout: 3000 }).catch(() => null), p.click('#__ext') ]);
    await p.waitForTimeout(300);
    ok(!!popup && p.url() === url0, 'page-injection 1: a link to another site opens a new window and leaves Ingenium where it was', { popup: !!popup, moved: p.url() !== url0 });
    if (popup) { const op = await popup.evaluate(() => { try { return window.opener === null; } catch (e) { return 'x-origin'; } }).catch(() => 'x-origin'); await popup.close(); ok(op === true || op === 'x-origin', 'page-injection 1: the new window cannot reach Ingenium (noopener)', op); }
    else ok(false, 'page-injection 1: the new window cannot reach Ingenium (noopener)', 'no popup');
    await p.click('#__js'); await p.waitForTimeout(200);
    ok(await p.evaluate(() => window.__pwned1 === undefined), 'page-injection 1: a javascript: link runs nothing');
    const hashMoved = await p.evaluate(() => { const u0 = location.href; document.getElementById('__hash').click(); return location.href !== u0 || location.hash === '#models'; });
    ok(hashMoved, 'page-injection 1: the app\'s own hash links are left alone');
    await p.evaluate(() => { const h = document.getElementById('__lk'); if (h) h.remove(); });

    // ---------------- page-injection 2 / secrets-crypto-data 0 and 1: a desk file brought in ----------------
    const deskBad = { chats: [{ id: 'c1', title: 'Brought in', messages: [] }], appName: 'Ingenium', notes: [{ id: 'n1', text: '<b>note</b><img src=x onerror="window.__pwnedN=1">', color: 'violet', x: 40, y: 40, pinned: true }],
      models: [], theme: 'day', reminders: [], parked: [], build: 1, cloud: { provider: 'anthropic', base: 'https://evil.example/v1', on: true }, github: {} };
    fs.writeFileSync(path.join(OUT, 'bad-desk.json'), JSON.stringify(deskBad));
    const r2 = await p.evaluate(async (txt) => {
      window.__pwnedN = undefined;
      state.cloud = { provider: 'anthropic', base: 'https://api.anthropic.com/v1', key: 'SK-DEVICE-SECRET', on: true };
      state.github = { api: 'https://api.github.com', token: 'GH-DEVICE-SECRET' }; saveState();
      const file = new File([txt], 'bad-desk.json', { type: 'application/json' });
      const b = await IngBackup.open(file); const d = await IngBackup.describe(b, 'replace', false);
      const saysReplace = d.lines.some(l => /replaced by what the backup holds/i.test(l));
      const saysKey = d.lines.some(l => /left empty|not moved|connect again/i.test(l));
      await IngBackup.apply(b, { mode: 'replace', reload: false });
      return { pwnedN: window.__pwnedN, noteHtml: (state.notes[0] || {}).text, cloudKey: state.cloud && state.cloud.key, cloudBase: state.cloud && state.cloud.base, ghToken: state.github && state.github.token, saysReplace, saysKey };
    }, JSON.stringify(deskBad));
    await p.waitForTimeout(300);
    ok(r2.pwnedN === undefined && !/onerror/i.test(String(r2.noteHtml || '')) && /<b>/.test(String(r2.noteHtml || '')), 'page-injection 2: a restored note is cleaned (its onerror gone, its bold kept)', r2);
    ok(r2.saysReplace, 'secrets-crypto-data 1: the restore preview says plainly what is replaced', r2.saysReplace);
    ok(!r2.cloudKey && r2.cloudBase === 'https://evil.example/v1', 'secrets-crypto-data 0: the backup changed the address, so the device key was not carried onto it', { cloudKey: r2.cloudKey, cloudBase: r2.cloudBase });
    ok(r2.saysKey, 'secrets-crypto-data 0: and the preview says the key was left empty', r2.saysKey);

    // a backup that keeps the address does carry the device key (normal use)
    const r2b = await p.evaluate(async () => {
      state.cloud = { provider: 'anthropic', base: 'https://api.anthropic.com/v1', key: 'SK-DEVICE-SECRET', on: true }; saveState();
      const good = { chats: [{ id: 'c2', title: 'same host', messages: [] }], appName: 'Ingenium', notes: [], models: [], theme: 'day', reminders: [], parked: [], build: 1, cloud: { provider: 'anthropic', base: 'https://api.anthropic.com/v1', on: true }, github: {} };
      const file = new File([JSON.stringify(good)], 'good.json', { type: 'application/json' });
      const b = await IngBackup.open(file); await IngBackup.apply(b, { mode: 'replace', reload: false });
      return { cloudKey: state.cloud && state.cloud.key };
    });
    ok(r2b.cloudKey === 'SK-DEVICE-SECRET', 'secrets-crypto-data 0: a backup that keeps the same address does carry the device key (normal use)', r2b);

    // ---------------- page-injection 4: stripTags reads markup as words ----------------
    const r4 = await p.evaluate(() => { window.__pwned4 = undefined; const out = stripTags('<img src=x onerror="window.__pwned4=1">Result <b>snippet</b> text'); return { out, pwned: window.__pwned4 }; });
    await p.waitForTimeout(100);
    ok(r4.pwned === undefined && /Result/.test(r4.out) && !/</.test(r4.out), 'page-injection 4: stripTags reads search markup as words only (no onerror runs)', r4);

    // ---------------- page-injection 3: the stage keys each page's store by its own identity ----------------
    const r3 = await p.evaluate(() => {
      const a = csStoreKey({ kind: 'file', name: 'index.html', html: '<h1>App A</h1>' });
      const b = csStoreKey({ kind: 'file', name: 'index.html', html: '<h1>App B</h1>' });
      const same = csStoreKey({ kind: 'file', name: 'index.html', html: '<h1>App A</h1>' });
      const ref1 = csStoreKey({ kind: 'file', name: 'index.html', ref: 'big_abc1234', html: 'x' });
      const ref2 = csStoreKey({ kind: 'file', name: 'index.html', ref: 'big_zzz9999', html: 'x' });
      const rep = csStoreKey({ kind: 'reply', name: 'page', msg: { id: 'm42' }, html: 'x' });
      return { a, b, same, differ: a !== b, stable: a === same, refDiffer: ref1 !== ref2, reply: rep };
    });
    ok(r3.differ && r3.stable && r3.refDiffer && /^msg:m42/.test(r3.reply), 'page-injection 3: two files of the same name get different stores; the same page keeps its store; stored pages and replies key by their own id', r3);

    // ---------------- secrets-crypto-data 3: a zip bomb is refused; a real export imports ----------------
    const zipBomb = fs.readFileSync(ZIPBOMB);
    const r5 = await p.evaluate(async (bytes) => {
      const u8 = new Uint8Array(bytes); const file = new File([u8], 'export.zip', { type: 'application/zip' });
      try { await ChatImportCore.read([file]); return { ok: false, msg: 'it was read' }; }
      catch (e) { return { refused: true, msg: String(e && e.message || e) }; }
    }, [...zipBomb]);
    ok(r5.refused && /unpack|memory|larger/i.test(r5.msg), 'secrets-crypto-data 3: a zip bomb is refused with a plain message', r5);
    // a large real export (many conversations) still imports
    if (FIXURL) {
      const r5b = await p.evaluate(async (url) => { const resp = await fetch(url); const buf = await resp.arrayBuffer(); const file = new File([buf], 'chatgpt_big.zip', { type: 'application/zip' });
        const found = await ChatImportCore.read([file]); return { n: found.conversations.length }; }, FIXURL + '/chatgpt_big.zip');
      ok(r5b.n > 100, 'secrets-crypto-data 3: a large real export (' + r5b.n + ' conversations) still imports', r5b);
    }

    // ---------------- secrets-crypto-data 4: the one-press export leaves connection keys out ----------------
    const r6 = await p.evaluate(() => {
      state.cloud = { provider: 'anthropic', base: 'https://api.anthropic.com/v1', key: 'SK-DEVICE-SECRET', on: true };
      state.github = { api: 'https://api.github.com', token: 'GH-DEVICE-SECRET' }; state.search = { braveKey: 'BRAVE-SECRET' }; saveState();
      var cap = null, orig = window.saveFileNative;
      window.saveFileNative = function (n, m, b) { try { cap = { n: n, text: (b instanceof Uint8Array ? new TextDecoder().decode(b) : String(b)) }; } catch (e) { cap = { n: n, text: '' }; } };
      var urlOrig = URL.createObjectURL, blobText = null; URL.createObjectURL = function (b) { try { blobText = b; } catch (e) {} return 'blob:x'; };
      try { exportApp(); } catch (e) {}
      window.saveFileNative = orig; URL.createObjectURL = urlOrig;
      var txt = cap ? cap.text : '';
      var btn = document.getElementById('exportApp');
      return { got: !!cap, hasDeviceSecret: /SK-DEVICE-SECRET|GH-DEVICE-SECRET|BRAVE-SECRET/.test(txt), hasChats: /"chats"/.test(txt), len: txt.length, btnBound: !!btn && btn.onclick === window.exportApp };
    });
    ok(r6.btnBound, 'secrets-crypto-data 4: the Settings "Export a backup" button runs the key-free export', r6.btnBound);
    ok(r6.got && r6.hasChats && !r6.hasDeviceSecret, 'secrets-crypto-data 4: the one-press export carries the desk but leaves connection keys and tokens out', r6);

    ok(p.__errs.filter(e => !/evil\.example|ERR_ABORTED|Failed to load/i.test(e)).length === 0, 'no unexpected page errors', p.__errs.slice(0, 4));
  } catch (e) { ok(false, 'crashed', e.stack); }
  console.log(pass + ' passed, ' + fail + ' failed');
  await b.close(); process.exit(fail ? 1 : 0);
})();
