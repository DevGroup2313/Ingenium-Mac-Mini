// Ingenium 6.7.2 · the master edition carries the full Carpe Diem (the owner's words: "only the demo version of the Forge should
// have the Demo edition of Carpe Diem loaded on it. I need to be able to edit the latest versions of all of my apps on my master
// version"). In Chromium, one browser and one address:
//   - Ingenium 6.7.1 is opened first and keeps what it carries (Carpe Diem 1058's committee demo, The Forge 646, Inkwell 7.51);
//   - then 6.7.2: it carries The Forge 647, the full Carpe Diem 1058 and Inkwell 7.52, and on its own, soon after it opens, keeps
//     each in the library, the full Carpe Diem in place of the demo Ingenium had kept (same number, 1058), the demo one step
//     back; each copy reads back as the very bytes it carries, and the Carpe Diem names no demo edition;
//   - a Carpe Diem 1058 she added herself is never replaced by the built-in one (it stays, and the built-in one is offered);
//   - no page errors.
//   node rig/t_672_upgrade.js <url of Ingenium 6.7.1> <url of Ingenium 6.7.2, same address> <out folder>
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs');
const [U671, U672, OUT] = process.argv.slice(2); fs.mkdirSync(OUT, { recursive: true });
let pass = 0, fail = 0;
const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (d !== undefined && !c ? '  ' + JSON.stringify(d).slice(0, 700) : '')); c ? pass++ : fail++; };
async function open(ctx, url, errs) { const p = await ctx.newPage(); p.on('pageerror', e => errs.push(e.message.slice(0, 200)));
  await p.goto(url); await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 240000 });
  await p.evaluate(() => { const b = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Enter' && x.offsetParent); if (b) b.click(); });
  await p.waitForFunction(() => window.__ingBuiltin && window.__ingBuiltin.states, null, { timeout: 240000 }); return p; }
const lib = p => p.evaluate(() => { const A = libState().apps, o = {}; ['cd', 'forge', 'inkwell'].forEach(k => { const m = A[k]; if (m) o[k] = { v: m.version, sha: String(m.sha256).slice(0, 12), src: m.source, earlier: m.earlier ? { v: m.earlier.version, sha: String(m.earlier.sha256).slice(0, 12) } : null }; }); return o; });
(async () => {
  const b = await pw.chromium.launch({ args: ['--js-flags=--max-old-space-size=8192'] }); const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } });
  const errs = [];
  try {
    let p = await open(ctx, U671, errs);
    const L0 = await lib(p);
    ok(L0.cd && L0.cd.v === '1058' && L0.cd.sha === 'ce03f0bf8415' && L0.forge && L0.forge.v === '646', 'Ingenium 6.7.1 keeps what it carries (Carpe Diem 1058, the committee demo; The Forge 646)', L0);
    await p.close();
    p = await open(ctx, U672, errs);
    const meta = await p.evaluate(() => { const m = IngBuiltin.meta; return { cd: [m.cd.version, m.cd.sha256.slice(0, 12)], forge: [m.forge.version, m.forge.build], inkwell: m.inkwell.version, v: ING_VERSION, ed: ING_EDITION }; });
    ok(meta.v === '6.7.2' && meta.ed === 'master' && meta.cd[0] === '1058' && meta.cd[1] === 'e37c1b85cd6b' && meta.forge[0] === '647' && meta.inkwell === '7.52',
      'Ingenium 6.7.2 (the master edition) carries The Forge 647, the full Carpe Diem 1058 and Inkwell 7.52', meta);
    const st = await p.evaluate(() => window.__ingBuiltin.states); const L1 = await lib(p);
    ok(st.cd === 'kept' && L1.cd.sha === 'e37c1b85cd6b' && L1.cd.src === 'built in' && L1.cd.earlier && L1.cd.earlier.sha === 'ce03f0bf8415',
      'on its own, soon after it opens, the full Carpe Diem takes the place of the demo Ingenium had kept (both 1058); the demo stays one step back', { st, cd: L1.cd });
    ok(st.forge === 'kept' && L1.forge.v === '647' && st.inkwell === 'kept' && L1.inkwell.v === '7.52', 'The Forge 647 and Inkwell 7.52 are kept in place of 646 and 7.51', { st, L1 });
    const back = await p.evaluate(() => Promise.all(['cd', 'forge', 'inkwell'].map(k => libText(k))).then(([c, f, i]) => ({ cd: /window\.CD_BUILD=\{date:"2026-10-19",pass:"1058",stamp:"528171058"\}/.test(c), cdDemo: /edition:"(Committee demo|Public sample)"/.test(c), cdLen: c.length,
      forge: /pass:"647"/.test(f) && /id="forge-trust-shas"/.test(f), ink: /BUILD='7\.52'/.test(i.slice(0, 4000)) })));
    ok(back.cd && !back.cdDemo && back.forge && back.ink, 'each reads back whole: the Carpe Diem names no demo edition, The Forge is 647, Inkwell 7.52', back);
    // a copy of the same number that she added herself is never replaced
    const own = await p.evaluate(async () => { const A = libState().apps; A.cd = Object.assign({}, A.cd, { source: 'added', sha256: 'ab'.repeat(32) }); saveState();
      const s = await IngBuiltin.seed(); return { s: s.cd, kept: libState().apps.cd.sha256.slice(0, 4), src: libState().apps.cd.source }; });
    ok(own.s === 'other' && own.kept === 'abab' && own.src === 'added', 'a Carpe Diem 1058 she added herself is never replaced by the built-in one', own);
    ok(!errs.length, 'no page errors', errs.slice(0, 4));
  } catch (e) { ok(false, 'the run crashed', e.stack); }
  console.log('\n' + pass + ' passed, ' + fail + ' failed'); await b.close(); process.exit(fail ? 1 : 0);
})();
