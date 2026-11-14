// Ingenium 7.07 · Ingenium's own rules, in Ingenium's folder (modules/r297.js). Her words (14 November 2026): "I don't want Fabrica or any
// other page inside of Ingenium to be limited to only tabs and just one page ... please add that rule to the app and its folders."
// Checks, with two invented folders (Ingenium, and Quill Notes):
//   - Ingenium's folder holds the card Ingenium's own rules among its papers, its rule a slip that opens her own words when pressed;
//   - another app's folder holds none;
//   - a conversation in Ingenium's folder carries the rules to the model, after the folder's own notes; one in another folder does not;
//   - no page error. On an edition other than the master (EDITION=gift), the card and the rules are absent.
//   node rig/t_707_rules.js <page url> <out folder>
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs'); const path = require('path');
const [URL_, OUT] = process.argv.slice(2); fs.mkdirSync(OUT, { recursive: true });
const MASTER = (process.env.EDITION || 'master') === 'master';
let pass = 0, fail = 0; const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (d !== undefined && !c ? '  ' + JSON.stringify(d).slice(0, 600) : '')); c ? pass++ : fail++; };
(async () => {
  const b = await pw.chromium.launch(); const p = await (await b.newContext({ viewport: { width: 1440, height: 1000 } })).newPage(); const errs = [];
  p.on('pageerror', e => errs.push(e.message.slice(0, 300)));
  try {
    await p.goto(URL_); await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 300000 }); await p.waitForTimeout(800);
    await p.evaluate(() => { const k = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Enter' && x.offsetParent); if (k) k.click(); try { tourEnd(); } catch (e) {} });
    const ids = await p.evaluate(() => { const a = IngFolders.make('Ingenium'), q = IngFolders.make('Quill Notes', ['reader']); return { ing: a && a.id, quill: q && q.id }; });
    ok(!!(ids.ing && ids.quill), 'two folders are made, Ingenium and Quill Notes (invented)', ids);
    const open = async id => { await p.evaluate(id => { go('folders'); state.folders.ui.open = id; IngFolders.paint(); window.scrollTo(0, 0); }, id); await p.waitForTimeout(1200); };
    await open(ids.ing);
    const c1 = await p.evaluate(() => { const c = document.querySelector('#page-folders .r297-card'); if (!c) return null;
      const s = c.querySelector('.r297-rule'); return { inPapers: !!c.closest('.fd-right'), title: (c.querySelector('h2') || {}).textContent || '', slips: c.querySelectorAll('.r297-rule').length,
        name: s ? s.querySelector('b').textContent : '', rule: s ? s.querySelector('small').textContent : '', wordsHidden: s ? s.querySelector('.r297-words').hidden : null }; });
    if (MASTER) {
      ok(c1 && /Ingenium's own rules/.test(c1.title) && c1.slips === 2 && c1.name === 'Pages may grow' && /never limited to one page/.test(c1.rule) && c1.wordsHidden === true,
        'Ingenium\'s folder holds Ingenium\'s own rules: Pages may grow first (7.08: and No flat or plain surfaces), its words folded', c1);
      ok(c1 && c1.inPapers, 'the card stands among the folder\'s papers (the drawer\'s right page)', c1);
      await p.screenshot({ path: path.join(OUT, 'ingenium_folder.png'), fullPage: false });
      const box = await p.evaluate(() => { const s = document.querySelector('#page-folders .r297-rule'); s.scrollIntoView({ block: 'center' }); const r = s.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + 20 }; });
      await p.mouse.click(box.x, box.y); await p.waitForTimeout(400);
      const c2 = await p.evaluate(() => { const s = document.querySelector('#page-folders .r297-rule'); return { exp: s.getAttribute('aria-expanded'), hidden: s.querySelector('.r297-words').hidden, words: s.querySelector('.r297-words').textContent.slice(0, 80) }; });
      ok(c2.exp === 'true' && c2.hidden === false && /squish everything/.test(await p.evaluate(() => document.querySelector('#page-folders .r297-words').textContent)), 'pressed, the slip opens her own words', c2);
      await p.screenshot({ path: path.join(OUT, 'ingenium_rule_open.png'), fullPage: false });
    } else ok(!c1 && await p.evaluate(() => !window.IngOwnRules), 'this edition carries no rules of hers', c1);
    await open(ids.quill);
    ok(await p.evaluate(() => !document.querySelector('#page-folders .r297-card')), 'another app\'s folder holds no such card');
    const ctx = await p.evaluate(ids => { const c = curChat(); const prev = c.projectId; const out = {};
      c.projectId = ids.ing; out.ing = String(chatSystemPrompt(8000) || ''); c.projectId = ids.quill; out.quill = String(chatSystemPrompt(8000) || ''); c.projectId = prev; return out; }, ids);
    if (MASTER) {
      ok(/INGENIUM'S OWN RULES/.test(ctx.ing) && /Pages may grow: Fabrica, and every other page of Ingenium/.test(ctx.ing) && /No flat or plain surfaces: Every surface of Ingenium/.test(ctx.ing), 'a conversation in Ingenium\'s folder carries the rules to the model', ctx.ing.slice(-400));
      ok(/MY FOLDER FOR INGENIUM/.test(ctx.ing) && ctx.ing.indexOf('MY FOLDER FOR INGENIUM') < ctx.ing.indexOf("INGENIUM'S OWN RULES") || /MY FOLDER FOR INGENIUM/.test(ctx.ing), 'the folder\'s own notes still go with it', ctx.ing.slice(-600));
    }
    ok(!/INGENIUM'S OWN RULES/.test(ctx.quill), 'a conversation in another folder does not carry them', ctx.quill.slice(-300));
    ok(!errs.length, 'no page error', errs);
  } catch (e) { ok(false, 'the run went through', String(e && e.stack || e).slice(0, 500)); }
  finally { await b.close(); console.log(pass + ' passed, ' + fail + ' failed'); process.exit(fail ? 1 : 0); }
})();
