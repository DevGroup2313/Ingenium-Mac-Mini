// Ingenium 7.76 (24 November 2026): the list of conversations always has its key on Chat and Code (modules/r369.js).
// Her words: "I can't seem to find the conversations control button that allows the user to start a new conversation and also have the
// option to rename the conversation and also see the full list of previous conversations ... entirely missing from the both chat pages
// inside of the Full edition".
//   node rig/t_776_conv_key.js <Ingenium page url> [<another edition's url> ...]
const pw = require('/opt/node-tools/node_modules/playwright');
const URLS = process.argv.slice(2).filter(a => /^https?://.test(a));   // the release checks add an out folder: only the pages are taken
let pass = 0, fail = 0; const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (c || d === undefined ? '' : '  ' + JSON.stringify(d).slice(0, 600))); c ? pass++ : fail++; };
const sleep = ms => new Promise(r => setTimeout(r, ms));
(async () => {
  const b = await pw.chromium.launch();
  for (const url of URLS) { const tag = url.replace(/^.*\//, '');
    for (const [w, h, side] of [[1440, 900, null], [1440, 900, false], [700, 900, null]]) {
      const ctx = await b.newContext({ viewport: { width: w, height: h } }); const p = await ctx.newPage(); const errs = []; p.on('pageerror', e => errs.push(e.message.slice(0, 200)));
      await p.goto(url, { timeout: 600000 }); await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 600000 }); await sleep(1200);
      await p.evaluate(side => { const k = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Enter' && x.offsetParent); if (k) k.click(); try { tourEnd(); } catch (e) {}
        if (side === false) { state.cc = state.cc || {}; state.cc.side = false; saveState(); try { ccPaintSide(); } catch (e) {} } }, side);
      // a first run asks for the terms: agreed to, as she would
      await p.evaluate(async () => { const box = [...document.querySelectorAll('input[type=checkbox]')].find(c => c.offsetParent && /agree to the Terms/i.test((c.closest('label') || c.parentElement || {}).textContent || ''));
        if (box) { box.click(); await new Promise(r => setTimeout(r, 200)); const y = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'I agree' && x.offsetParent); if (y) y.click(); } }); await sleep(600);
      const where = tag + ' at ' + w + (side === false ? ' (list closed before)' : ' (a fresh desk)');
      for (const pg of ['chat', 'code']) {
        await p.evaluate(pg => go(pg), pg); await sleep(1200);
        const k = await p.evaluate(() => { const sb = document.getElementById('ccSideBtn'); return sb ? { shown: !!sb.offsetParent, w: Math.round(sb.getBoundingClientRect().width) } : null; });
        ok(k && k.shown && k.w > 10, pg + ': the list key is shown, ' + where, k);
        if (pg === 'chat' && k && k.shown) {
          // the key opens the list: a new conversation, the conversations, and the title that renames
          await p.evaluate(() => document.getElementById('ccSideBtn').scrollIntoView({ block: 'center' })); await p.click('#ccSideBtn', { timeout: 8000 }).catch(() => {}); await sleep(600);
          const l = await p.evaluate(() => { const s = document.getElementById('ccSide'); const r = s && s.getBoundingClientRect(); return { open: !!(s && getComputedStyle(s).display !== 'none' && r.width > 100 && r.height > 100), at: r && [Math.round(r.left), Math.round(r.top), Math.round(r.width), Math.round(r.height)], newKey: !!(s && s.querySelector('.cc-new')), title: !!document.getElementById('ccTitle') && !!document.getElementById('ccTitle').offsetParent }; });
          ok(l.open && l.newKey && l.title, pg + ': the key opens the list, with its new conversation key; the title (to rename) is shown, ' + where, l);
          await p.evaluate(() => { try { document.body.classList.remove('cc-side-open'); } catch (e) {} }); }
      }
      ok(errs.length === 0, 'no page errors, ' + where, errs); await ctx.close(); } }
  await b.close(); console.log(pass + ' passed, ' + fail + ' failed'); process.exit(fail ? 1 : 0);
})();
