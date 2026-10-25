// The Forge 647 · the owner's own apps in the lean page (the Forge Ingenium carries, which carries no apps), in Chromium:
//   - the lean page names the apps its build was made with by their fingerprints (forge-trust-shas);
//   - the full Carpe Diem 1058, brought in as a file, is shown in the Editor as the owner's own (the Forge's origin), with no
//     note;
//   - a newer version of it (any change at all) is shown apart, with the note "Shown apart" and its key "This is my own app";
//     one press asks for a second; the second makes it the owner's own (shown with the Forge's origin, its fingerprint kept
//     on this device), and opened again it is the owner's own at once;
//   - a page from outside is shown apart with the note; the note is gone for the Studio's stage;
//   - no page errors.
//   node tests/t_647_trust.js <url of the lean Forge page> <url of carpe_diem_full_1058.html> <out folder>
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs');
const [URL_, CD, OUT] = process.argv.slice(2); fs.mkdirSync(OUT, { recursive: true });
let pass = 0, fail = 0;
const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (d !== undefined && !c ? '  ' + String(typeof d === 'string' ? d : JSON.stringify(d)).slice(0, 600) : '')); c ? pass++ : fail++; };
async function ready(p) { await p.waitForFunction(() => { const b = document.getElementById('forge-boot'); return !b || b.classList.contains('fb-gone'); }, null, { timeout: 180000 }); await p.waitForTimeout(1500); }
const st = p => p.evaluate(() => { const f = document.getElementById('frame'), n = document.getElementById('fg-apart-note'), b = n && n.querySelector('.fg-an-b');
  return { apart: f.getAttribute('data-forge-apart'), sandbox: f.getAttribute('sandbox') || '', note: !!(n && !n.hidden && n.getBoundingClientRect().width > 0), key: b ? b.textContent : '' }; });
async function settle(p, want) { let s = null; for (let i = 0; i < 80; i++) { s = await st(p); if (s.apart === want) return s; await p.waitForTimeout(250); } return s; }
(async () => {
  const b = await pw.chromium.launch({ args: ['--js-flags=--max-old-space-size=8192'] }); const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } });
  const p = await ctx.newPage(); const errs = []; p.on('pageerror', e => errs.push(e.message));
  try {
    await p.goto(URL_); await ready(p);
    const list = await p.evaluate(() => { const t = document.getElementById('forge-trust-shas'); return t ? JSON.parse(t.textContent) : null; });
    ok(Array.isArray(list) && list.length === 3 && list.every(h => /^[0-9a-f]{64}$/.test(h)), 'the lean page names the three apps its build was made with by their fingerprints', list);
    await p.evaluate(() => { const d = document.getElementById('cd-door'); const k = d && [...d.querySelectorAll('button')].find(x => /^Open the Editor/.test(x.textContent.trim())); if (k) k.click(); }); await p.waitForTimeout(600);
    const n = await p.evaluate(async u => { const r = await fetch(u); window.__cd = await r.text(); return window.__cd.length; }, CD);
    ok(n > 1e7, 'the full Carpe Diem 1058 is read as a file', n);
    await p.evaluate(() => window.__forgeEd.open(window.__cd, 'carpe_diem.html', 'cd'));
    const s1 = await settle(p, '0');
    ok(s1.apart === '0' && /allow-same-origin/.test(s1.sandbox) && !s1.note, 'it is shown in the Editor as the owner\'s own (the Forge\'s origin), with no note', s1);
    await p.evaluate(() => { window.__cd2 = window.__cd.replace('</body>', '<!-- a newer version, changed by the owner --></body>'); window.__forgeEd.open(window.__cd2, 'carpe_diem_1059.html', 'cd'); });
    const s2 = await settle(p, '1');
    ok(s2.apart === '1' && !/allow-same-origin/.test(s2.sandbox) && s2.note && s2.key === 'This is my own app', 'a newer version of it is shown apart, with the note and its key', s2);
    await p.click('#fg-apart-note .fg-an-b'); const s3 = await st(p);
    ok(s3.apart === '1' && /Press again/.test(s3.key), 'one press asks for a second, and changes nothing yet', s3);
    await p.click('#fg-apart-note .fg-an-b');
    const s4 = await settle(p, '0');
    const keptN = await p.evaluate(() => { try { return JSON.parse(localStorage.getItem('fgtrust:shas') || '[]').length; } catch (e) { return -1; } });
    ok(s4.apart === '0' && /allow-same-origin/.test(s4.sandbox) && !s4.note && keptN === 1, 'the second makes it the owner\'s own: shown with the Forge\'s origin, its fingerprint kept on this device', { s4, keptN });
    await p.evaluate(() => window.__forgeEd.open('<!doctype html><title>x</title><p>x', 'x.html')); await settle(p, '1');
    await p.evaluate(() => window.__forgeEd.open(window.__cd2, 'carpe_diem_1059.html', 'cd'));
    const s5 = await settle(p, '0');
    ok(s5.apart === '0' && !s5.note, 'opened again, it is the owner\'s own at once', s5);
    await p.evaluate(() => window.__forgeEd.open('<!doctype html><title>Outside</title><p>from outside', 'outside.html'));
    const s6 = await settle(p, '1');
    ok(s6.apart === '1' && s6.note, 'a page from outside is shown apart, with the note', s6);
    await p.evaluate(() => window.FORGE.showDoc('<!doctype html><p>a view of a file', 'file.html', '<p>a view of a file', 'html'));
    await p.waitForTimeout(500); const s7 = await st(p);
    ok(s7.apart === '1' && !s7.note, 'a view of a file (not an app in the Editor) is apart with no note', s7);
    await p.screenshot({ path: OUT + '/trust-end.png' });
    ok(!errs.length, 'no page errors', errs.slice(0, 4));
  } catch (e) { ok(false, 'the run crashed', e.stack); }
  console.log('\n' + pass + ' passed, ' + fail + ' failed'); await b.close(); process.exit(fail ? 1 : 0);
})();
