// The Forge 644 · ownership, licence and permissions (blocks/forge_permit.html with the shared build/thoughts/permit_core.html),
// in Chromium, on a Forge page built with a test owner key (ING_OWNER_KEYS). Checks:
//   - Settings, About holds the Forge's licence (version 2) whole, says whose work it is, and saves the licence;
//   - a permission for The Forge, signed with the owner's key, is valid and names its holder; one for Ingenium alone is for
//     another app; one changed by one letter is not the owner's; all allow nothing but the valid one; kept after a reload;
//   - no page errors.
//   node tests/t_644_permits.js <url of the Forge page> <out> <owner key backup (.ingkey)> <its password>
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs'); const path = require('path');
const [URL_, OUT, KEYFILE, PASS] = process.argv.slice(2); fs.mkdirSync(OUT, { recursive: true });
const LIC = fs.readFileSync(path.join(__dirname, '..', '..', '..', 'licence', 'LICENCE_forge.txt'), 'utf8');
let pass = 0, fail = 0;
const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (d !== undefined ? '  ' + String(typeof d === 'string' ? d : JSON.stringify(d)).slice(0, 500) : '')); c ? pass++ : fail++; };
async function ready(p) { await p.waitForFunction(() => { const b = document.getElementById('forge-boot'); return !b || b.classList.contains('fb-gone'); }, null, { timeout: 120000 }); await p.waitForTimeout(1200);
  await p.evaluate(() => { const d = document.getElementById('cd-door'); const k = d && [...d.querySelectorAll('button')].find(x => /^Open the Editor/.test(x.textContent.trim())); if (k) k.click(); }); await p.waitForTimeout(600);
  await p.evaluate(() => { FORGE.openRoom('settings'); const t = document.querySelector('#room-settings [data-tab="about"]'); if (t) t.click(); }); await p.waitForTimeout(900); }
const items = p => p.evaluate(() => { const l = document.querySelector('#forgePermitCard .pc-list'); return l ? [...l.querySelectorAll('.pc-item')].map(i => i.innerText.replace(/\n+/g, ' | ')) : []; });
async function bring(p, file) { const [fc] = await Promise.all([p.waitForEvent('filechooser'), p.evaluate(() => [...document.querySelectorAll('#forgePermitCard button')].find(b => /^Bring in a permission/.test(b.textContent)).click())]);
  await fc.setFiles(file); await p.waitForTimeout(1500); return p.evaluate(() => document.querySelector('#forgePermitCard .pc-say').textContent); }

(async () => {
  const b = await pw.chromium.launch({ args: ['--no-sandbox'] }); const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, acceptDownloads: true });
  let p = await ctx.newPage(); const errs = []; p.on('pageerror', e => errs.push(e.message)); const dl = []; p.on('download', d => dl.push(d));
  try {
    await p.goto(URL_); await ready(p);
    const c = await p.evaluate(() => { const c = document.getElementById('forgePermitCard'); return c ? { inAbout: !!c.closest('[data-page="about"]'), after: (c.previousElementSibling || {}).id, lic: c.querySelector('.pc-licence').textContent, line: c.querySelector('.pc-line').textContent, text: c.innerText } : null; });
    ok(c && c.inAbout && c.after === 'aboutForgeBody' && c.lic === LIC && /The Forge is the sole original work of Yannie D\. Forest/.test(c.line), 'Settings, About holds the Forge\'s licence (version 2) whole, after About The Forge, and says whose work it is', c && c.line);
    ok(c && /No permission is kept here yet/.test(c.text) && !/carries no key of the owner/.test(c.text) && !/Your owner key/.test(c.text), 'it carries the owner\'s key, keeps no permission yet, and makes no owner key of its own');
    const n0 = dl.length; await p.evaluate(() => [...document.querySelectorAll('#forgePermitCard button')].find(b => b.textContent === 'Save the licence').click());
    for (let i = 0; i < 50 && dl.length <= n0; i++) await p.waitForTimeout(100);
    let saved = ''; if (dl[n0]) { const f = path.join(OUT, 'LICENCE.txt'); await dl[n0].saveAs(f); saved = fs.readFileSync(f, 'utf8'); }
    ok(saved === LIC, 'Save the licence gives the same text');
    // permissions signed here with the owner's key (from its backup and password), as Ingenium's master edition signs them
    const sealed = JSON.parse(fs.readFileSync(KEYFILE, 'utf8'));
    const made = await p.evaluate(async ({ sealed, PASS }) => { const key = await PermitCore.openKey(sealed, PASS);
      const mk = async permit => ({ kind: PermitCore.KIND.permit, v: 1, permit, kid: sealed.kid, sig: await PermitCore.signWith(key, permit) });
      const day = d => d.toISOString().slice(0, 10), now = new Date(), later = new Date(Date.now() + 60 * 864e5);
      return { forge: await mk({ n: 'P-2026-0101', holder: 'Dee Maker', apps: ['forge'], allows: ['use', 'install'], from: day(now), until: day(later), issued: now.toISOString() }),
        ing: await mk({ n: 'P-2026-0102', holder: 'Eve Other', apps: ['ingenium'], allows: ['use'], from: day(now), until: day(later), issued: now.toISOString() }) }; }, { sealed, PASS });
    const fF = path.join(OUT, 'forge.ingperm'), fI = path.join(OUT, 'ingenium.ingperm'), fT = path.join(OUT, 'tampered.ingperm');
    fs.writeFileSync(fF, JSON.stringify(made.forge)); fs.writeFileSync(fI, JSON.stringify(made.ing));
    const tam = JSON.parse(JSON.stringify(made.forge)); tam.permit.allows.push('sell'); fs.writeFileSync(fT, JSON.stringify(tam));
    let s = await bring(p, fF); let it = await items(p);
    ok(/is the owner's and is valid: Dee Maker, number P-2026-0101/.test(s) && it.some(t => /Dee Maker · P-2026-0101 valid/.test(t) && /For The Forge/.test(t)) && await p.evaluate(() => forgePermit.allows('use') && !forgePermit.allows('sell')),
      'a permission for The Forge, signed with the owner\'s key, is valid, names its holder, and allows what it says and nothing more', { s, it });
    s = await bring(p, fI); it = await items(p);
    ok(it.some(t => /Eve Other/.test(t) && /for another app/.test(t) && /not for this app/.test(t)), 'one for Ingenium alone is for another app', it.find(t => /Eve Other/.test(t)));
    s = await bring(p, fT); it = await items(p);
    ok(it.filter(t => /Dee Maker/.test(t)).length === 2 && it.some(t => /Dee Maker/.test(t) && /not the owner's/.test(t)) && await p.evaluate(() => !forgePermit.allows('sell')), 'one changed to allow more is not the owner\'s, and allows nothing', it.filter(t => /Dee Maker/.test(t)));
    await p.reload(); await ready(p); await p.waitForTimeout(800); it = await items(p);
    ok(it.length === 3 && it.some(t => /Dee Maker · P-2026-0101 valid/.test(t)) && await p.evaluate(() => forgePermit.allows('use')), 'kept after a reload, each with its state', it.length);
    ok(!errs.length, 'no page errors', errs.slice(0, 4));
  } catch (e) { ok(false, 'the run crashed', e.stack); }
  await b.close();
  console.log(`\n${pass} passed, ${fail} failed`); process.exit(fail ? 1 : 0);
})();
