// Ingenium 6.1 · Ask Lector (modules/r108.js, r107.js), and Lector's documents with no closing line, in Chromium, with a
// stand-in model: a request that names a section rewrites that section only and keeps the version before; "Put back the
// version before" and "Use the rewrite again" swap them; a request kept for the writing shows as a chip, goes with every
// piece Lector writes, and can be taken away; "Just answer me" answers in the conversation with Copy; a request sent while
// Lector is at work is not lost; a document kept before 6.1 shows, copies and saves without its "Drafted by" line; the
// box works by night and on a phone.
//   node rig/t_61_ask.js http://127.0.0.1:8311/ingenium.html <out folder>
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs'); const path = require('path');
const URL_ = process.argv[2], OUT = process.argv[3]; fs.mkdirSync(OUT, { recursive: true });
let pass = 0, fail = 0;
const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (d !== undefined ? '  ' + String(typeof d === 'string' ? d : JSON.stringify(d)).slice(0, 400) : '')); c ? pass++ : fail++; };
const DOC = '# Ingenium · Dossier\n\n## Title and summary\n**Ingenium**\n\nA long summary that says the same thing twice and runs on for far too long about the studio.\n\n' +
  '## Where it goes next\nThe Forge. The Forge. The Forge. The Forge.\n\n## How it is built\nOne page of HTML, 43 MB, that runs offline.\n\n---\n' +
  "*Drafted by Test model in Ingenium's Lector on 20 October 2026, from full readings of Ingenium. The measures are exact; check every other statement before you use it.*";

(async () => {
  const b = await pw.chromium.launch({ headless: true, args: ['--no-sandbox'] });
  const ctx = await b.newContext({ viewport: { width: 1600, height: 1000 }, acceptDownloads: true });
  const p = await ctx.newPage(); const errs = [];
  p.on('pageerror', e => errs.push(e.message + ' ' + (e.stack || '').split('\n')[1]));
  await p.goto(URL_); await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 120000 }); await p.waitForTimeout(800);
  await p.evaluate(() => { const k = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Enter' && x.offsetParent); if (k) k.click(); });
  // a model that answers, a set, and a dossier kept before 6.1 (with its old closing line)
  await p.evaluate(async (DOC) => {
    state.models = (state.models || []).concat([{ id: 'm-test', name: 'Test model', fileState: 'ready', size: 2e9, sizeBytes: 2e9, ctx: 16384 }]);
    const L = lxState(); L.brief = { apps: ['ingenium'], purpose: 'portfolio', docs: { dossier: true }, depth: 'overview', fmt: 'docx', modelId: 'm-test' };
    L.job = null; const key = 'ingenium|portfolio'; const ref = IngBig.newId(); await IngBig.put(ref, DOC);
    L.sets = L.sets || {}; L.sets[key] = { apps: ['ingenium'], purpose: 'portfolio', docs: { dossier: { ref, made: Date.now(), model: 'Test model', title: 'Ingenium · Dossier', chk: { figures: 0, unmatched: [] } } }, older: {} };
    window.__asked = [];
    window.lxAsk = function (run, msgs, max, temp, onPiece) {
      window.__asked.push({ run, msgs, max });
      const u = msgs[msgs.length - 1].content;
      let out = 'An answer.';
      if (/Rewrite it as I ask/.test(u) && /THE SECTION AS IT STANDS/.test(u)) out = 'Next, the Forge carries Ingenium, and Ingenium carries the Forge; [the year] is left for you.';
      else if (/Answer it directly/.test(u)) out = 'Ingenium is a private studio for notes, documents and local models.';
      if (onPiece) onPiece(out.slice(0, 20));
      return new Promise(r => setTimeout(() => r(out), 300));
    };
    saveState(); go('lector');
  }, DOC);
  await p.waitForTimeout(1500);
  const box = await p.evaluate(() => { const a = document.getElementById('l7Ask'); if (!a) return null; const s = a.querySelector('select');
    return { vis: !!a.offsetParent, ta: !!a.querySelector('textarea[aria-label="Your request to Lector"]'), opts: [...s.options].map(o => o.textContent), val: s.value, inDoc: !!a.closest('#l7Doc') }; });
  ok(box && box.vis && box.ta && box.inDoc, 'the request box stands at the foot of the document panel, labelled', box);
  ok(box && box.opts.includes('Only “Where it goes next”') && box.val === 'auto', 'it can be for the document, one of its sections, the whole set, or an answer', box && box.opts);
  const shown = await p.evaluate(() => document.getElementById('l7Desk').innerText);
  ok(!/Drafted by/.test(shown) && /Where it goes next/.test(shown), "a document kept before 6.1 shows without its 'Drafted by' line");
  await p.screenshot({ path: path.join(OUT, 'ask-day.png') });

  // 1 · a request that names a section rewrites that section only
  await p.fill('#l7Ask textarea', 'In where it goes next, stop repeating the Forge and say what comes next in one sentence.');
  await p.press('#l7Ask textarea', 'Enter');
  await p.waitForFunction(() => { const t = document.querySelector('#l7Ask .l-cmp-th'); return t && /Rewrote “Where it goes next”/.test(t.innerText); }, null, { timeout: 15000 }).catch(() => { });
  const r1 = await p.evaluate(async () => { const L = lxState(), s = L.sets['ingenium|portfolio']; const md = await IngBig.load(s.docs.dossier.ref);
    const u = window.__asked[0] && window.__asked[0].msgs[1].content; return { md, older: (s.older.dossier || []).length, reply: document.querySelector('#l7Ask .l-cmp-th').innerText, prompt: u ? u.slice(0, 400) : '', model: window.__asked[0] && window.__asked[0].run.modelId }; });
  ok(/Next, the Forge carries Ingenium/.test(r1.md) && !/The Forge\. The Forge\./.test(r1.md), 'the named section is rewritten', r1.md.slice(0, 300));
  ok(/A long summary that says the same thing twice/.test(r1.md) && /One page of HTML, 43 MB/.test(r1.md), 'every other section is left exactly as it was');
  ok(!/Drafted by/.test(r1.md), "the new version carries no 'Drafted by' line");
  ok(r1.older === 1, 'the version before is kept', r1.older);
  ok(/Where it goes next/.test(r1.prompt) && /MY REQUEST/.test(r1.prompt) && r1.model === 'm-test', 'the model is given the section, the request and the rules, on the chosen model', r1.prompt.slice(0, 200));
  await p.waitForTimeout(400);
  const shown2 = await p.evaluate(() => document.getElementById('l7Desk').innerText);
  ok(/Next, the Forge carries Ingenium/.test(shown2), 'the document on screen shows the rewrite');
  await p.screenshot({ path: path.join(OUT, 'ask-done.png') });

  // 2 · put back, and use again
  await p.evaluate(() => { const k = [...document.querySelectorAll('#l7Ask button')].find(x => x.textContent === 'Put back the version before'); k.click(); });
  await p.waitForTimeout(600);
  const back = await p.evaluate(async () => { const s = lxState().sets['ingenium|portfolio']; return await IngBig.load(s.docs.dossier.ref); });
  ok(/The Forge\. The Forge\./.test(back), '"Put back the version before" brings the earlier version back');
  await p.evaluate(() => { const k = [...document.querySelectorAll('#l7Ask button')].find(x => x.textContent === 'Use the rewrite again'); k.click(); });
  await p.waitForTimeout(600);
  const again = await p.evaluate(async () => { const s = lxState().sets['ingenium|portfolio']; return await IngBig.load(s.docs.dossier.ref); });
  ok(/Next, the Forge carries Ingenium/.test(again), '"Use the rewrite again" brings the rewrite back');

  // 3 · a request kept for the writing
  await p.selectOption('#l7Ask select', 'all');
  await p.fill('#l7Ask textarea', 'Never call Ingenium a platform.');
  await p.click('#l7Ask .l-cmp-send'); await p.waitForTimeout(400);
  const kept = await p.evaluate(() => ({ chips: [...document.querySelectorAll('#l7Ask .l-cmp-req span')].map(x => x.textContent), reply: document.querySelector('#l7Ask .l-cmp-th').innerText }));
  ok(kept.chips.includes('Never call Ingenium a platform.') && /Kept\. Lector follows it/.test(kept.reply), 'a request kept for the writing shows above the box', kept.chips);
  // it goes with the next piece written
  await p.selectOption('#l7Ask select', 'answer');
  await p.fill('#l7Ask textarea', 'Give me one line about Ingenium for a profile.');
  await p.click('#l7Ask .l-cmp-send');
  await p.waitForFunction(() => /private studio/.test(document.querySelector('#l7Ask .l-cmp-th').innerText), null, { timeout: 15000 }).catch(() => { });
  const ans = await p.evaluate(() => { const last = window.__asked[window.__asked.length - 1]; return { sys: last.msgs[0].content, th: document.querySelector('#l7Ask .l-cmp-th').innerText, copy: [...document.querySelectorAll('#l7Ask button')].some(x => x.textContent === 'Copy') }; });
  ok(/THE OWNER'S OWN REQUESTS FOR THIS SET[\s\S]*Never call Ingenium a platform/.test(ans.sys), 'the kept request goes with the next piece Lector writes');
  ok(/private studio/.test(ans.th) && ans.copy, '"Just answer me" answers in the conversation, with Copy');
  await p.evaluate(() => { const x = document.querySelector('#l7Ask .l-cmp-req button'); x.click(); }); await p.waitForTimeout(300);
  ok(await p.evaluate(() => !document.querySelector('#l7Ask .l-cmp-req')), 'a kept request can be taken away');

  // 4 · while Lector is at work, a request is not lost
  await p.evaluate(() => { LX.busy = true; });
  await p.selectOption('#l7Ask select', 'auto');
  await p.fill('#l7Ask textarea', 'Make the summary shorter.');
  await p.click('#l7Ask .l-cmp-send'); await p.waitForTimeout(300);
  const busy = await p.evaluate(() => ({ th: document.querySelector('#l7Ask .l-cmp-th').innerText, keep: [...document.querySelectorAll('#l7Ask button')].some(x => x.textContent === 'Keep it for the writing') }));
  ok(/Lector is at work on this set now/.test(busy.th) && busy.keep, 'sent while Lector is at work, the request is kept in the conversation with a way to keep it for the writing');
  await p.evaluate(() => { LX.busy = false; });

  // 5 · copy and save carry no closing line (the old one is left out of what is copied)
  const copied = await p.evaluate(async () => { const L = lxState(), s = L.sets['ingenium|portfolio']; const r = IngBig.newId();
    await IngBig.put(r, "# X\n\n## A\nText.\n\n---\n*Drafted by Test model in Ingenium's Lector on 20 October 2026, from full readings of Ingenium.*"); s.docs.dossier.ref = r; saveState(); lxRender();
    await new Promise(z => setTimeout(z, 600)); return document.getElementById('l7Desk').innerText; });
  ok(!/Drafted by/.test(copied), "an older document's closing line is left out of the page and of what is copied or saved");

  // 6 · by night, and on a phone
  await p.evaluate(() => { document.body.setAttribute('data-theme', 'night'); try { lxRender(); } catch (e) { } }); await p.waitForTimeout(500);
  await p.screenshot({ path: path.join(OUT, 'ask-night.png') });
  const nightBg = await p.evaluate(() => getComputedStyle(document.querySelector('#l7Ask .l-cmp-in')).backgroundColor + ' / ' + getComputedStyle(document.querySelector('#l7Ask textarea')).color);
  ok(!/255, 255, 255\)$/.test(nightBg.split(' / ')[0]), 'by night the box is dark, its words light', nightBg);
  await p.evaluate(() => { document.body.setAttribute('data-theme', 'day'); });
  await p.setViewportSize({ width: 390, height: 844 }); await p.evaluate(() => { try { lxRender(); } catch (e) { } }); await p.waitForTimeout(700);
  await p.evaluate(() => { const t = [...document.querySelectorAll('#lx7 [role=tab]')].find(x => /document/i.test(x.textContent)); if (t) t.click(); }); await p.waitForTimeout(500);
  const ph = await p.evaluate(() => { const a = document.getElementById('l7Ask'); const r = a.getBoundingClientRect(); return { w: Math.round(r.width), vis: !!a.offsetParent, over: document.documentElement.scrollWidth - innerWidth }; });
  await p.screenshot({ path: path.join(OUT, 'ask-phone.png') });
  ok(ph.vis && ph.w <= 390 && ph.over <= 0, 'on a phone the box fits the width', ph);

  const mine = errs.filter(e => /ask|Ask|paintAsk|l-ask|unmark/.test(e));
  ok(!mine.length, 'no errors from Ask Lector', mine.slice(0, 3));
  console.log(pass + ' passed, ' + fail + ' failed');
  await b.close(); process.exit(fail ? 1 : 0);
})().catch(e => { console.log('FAIL crashed ' + e.stack); console.log(pass + ' passed, ' + (fail + 1) + ' failed'); process.exit(1); });
