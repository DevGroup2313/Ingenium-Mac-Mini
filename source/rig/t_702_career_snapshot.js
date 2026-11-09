// node rig/t_702_career_snapshot.js <Ingenium page url> <out dir>
// 6.9.2: a posting fetched again and compared, and further particulars read with it (modules/r188.js), in Chromium, with a
// stand-in for the page fetch (nothing goes online; since 6.9.8 the fetch is netFetch's, as a posting's link is fetched). Her words (31 October 2026): "I want to be able to use it for PhD
// applications and for job applications." So a posting fetched from its address remembers the day; Check it again fetches it
// once more, only on her press, and shows each sentence that changed and a changed closing date, with the choice to keep the
// new text (her copy kept beside it); and a document added to the application (further particulars, a handbook) is read with
// the posting by the reading, the limits and the checklist.
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs');
const [URL_, OUT] = process.argv.slice(2); fs.mkdirSync(OUT, { recursive: true });
let pass = 0, fail = 0; const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (c || d === undefined ? '' : '  ' + String(typeof d === 'string' ? d : JSON.stringify(d)).slice(0, 700))); c ? pass++ : fail++; };
const V1 = 'Lecturer in Digital History\nUniversity of Oxbridge\nWe seek a lecturer in digital history.\nEssential:\n- A PhD in history or a related field\n- Experience of teaching undergraduates\nApply with a CV and a covering letter of no more than 500 words.\nThe closing date is 30 November 2026.\nInterviews will be held in January 2027.\n';
const V2 = 'Lecturer in Digital History\nUniversity of Oxbridge\nWe seek a lecturer in digital history.\nEssential:\n- A PhD in history or a related field\n- Experience of teaching undergraduates\nApply with a CV and a covering letter of no more than 500 words.\nThe closing date is 7 December 2026.\nInterviews will be held in February 2027.\n';
const V3 = V2.replace('Interviews will be held in February 2027.', 'Interviews will be held in March 2027.');
const FP = 'Further particulars for the post of Lecturer in Digital History.\nThe supporting statement should be no more than 1,500 words and address each essential criterion in turn.\nShortlisted candidates will give a short presentation.\n';
(async () => {
  const b = await pw.chromium.launch(); const p = await (await b.newContext({ viewport: { width: 1440, height: 950 } })).newPage();
  const errs = []; p.on('pageerror', e => errs.push(e.message.slice(0, 200)));
  const outside = []; p.on('request', r => { const u = r.url(); if (/^https?:/.test(u) && !/^https?:\/\/(127\.0\.0\.1|localhost)/.test(u)) outside.push(u); });
  await p.goto(URL_); await p.waitForFunction(() => window.__ingReady === true && window.IngCareer, null, { timeout: 300000 });
  await p.evaluate(() => { const k = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Enter' && x.offsetParent); if (k) k.click(); }); await p.waitForTimeout(900);
  const press = async (text, within) => { const hit = await p.evaluate(([text, within]) => { const root = document.querySelector(within || '#cs') || document;
      const k = [...root.querySelectorAll('button')].find(x => x.offsetParent && !x.disabled && (x.textContent.trim() === text || (x.querySelector('b') && x.querySelector('b').textContent.trim() === text)));
      if (!k) return false; k.click(); return true; }, [text, within || null]); if (!hit) throw new Error('no key: ' + text); await p.waitForTimeout(350); };
  await p.evaluate(([V1, V2]) => { window.__net = []; window.__pages = [V1, V2, V2]; window.netFetch = function (url, o) { window.__net.push(url); const t = window.__pages.shift(); return Promise.resolve({ ok: true, status: 200, contentType: 'text/plain; charset=utf-8', text: () => Promise.resolve(t), json: () => Promise.resolve(JSON.parse(t)) }); };
    const S = IngCareer.state(); S.ui.room = 'apps'; S.ui.open = 'new'; S.ui.show = 'work'; go('career'); IngCareer.render(); }, [V1, V2]);
  await p.waitForTimeout(500);
  // fetched from its address, on her press
  await p.fill('#cs .c-work input[type=url]', 'https://jobs.example.ac.uk/lecturer-digital-history'); await press('Fetch and read it', '#cs .c-work'); await p.waitForFunction(() => IngCareer.state().opps.length === 1 && !!IngCareer.state().opps[0].fetchedAt, null, { timeout: 20000 }); await p.waitForTimeout(400);
  const o1 = await p.evaluate(() => { const o = IngCareer.state().opps[0]; return o && { url: o.url, from: o.from, fetched: !!o.fetchedAt, due: o.due, closes: o.closes, meta: (document.querySelector('#cs .c-work .c-note') || {}).textContent, keys: [...document.querySelectorAll('#cs .c-work .c-pn-f .c-btn')].map(x => x.textContent), net: window.__net.length }; });
  ok(o1 && o1.url === 'https://jobs.example.ac.uk/lecturer-digital-history' && o1.fetched && o1.due === '2026-11-30' && /Fetched from its address on /.test(o1.meta) && o1.keys.join('|') === 'Add a document|Check it again|Look it up online|Read it against my profile' && o1.net === 1, 'a posting fetched from its address remembers the address and the day; The posting offers Check it again and Add a document', o1);
  // checked again: the sentences that changed, and the closing date
  await press('Check it again', '#cs .c-work .c-pn-f'); await p.waitForFunction(() => !!IngCareer.state().opps[0].recheck, null, { timeout: 20000 }); await p.waitForTimeout(300);
  const rc = await p.evaluate(() => { const o = IngCareer.state().opps[0], r = o.recheck; return { n: r && r.n, changes: r && r.changes.map(u => [u.old.join(' / '), u.nw.join(' / ')]), closes: r && r.closes, due: r && r.due, dueChanged: r && r.dueChanged, box: (document.querySelector('#cs .c-rc') || {}).innerText || '', net: window.__net.length, refs: IngCareer.oppRefs(o).includes(r && r.ref) }; });
  ok(rc.n === 2 && rc.changes.length === 1 && rc.changes[0][0] === 'The closing date is 30 November 2026. / Interviews will be held in January 2027.' && rc.changes[0][1] === 'The closing date is 7 December 2026. / Interviews will be held in February 2027.', 'Check it again fetches the posting once more and finds the two sentences that changed (neighbours, shown as one before and now)', rc.changes);
  ok(rc.closes === 'The closing date is 7 December 2026.' && rc.due === '2026-12-07' && rc.dueChanged && /The closing date now reads:.*7 December 2026.*\(it was 30 November 2026\)/.test(rc.box) && /2 sentences changed since it was fetched/.test(rc.box) && rc.net === 2 && rc.refs, 'the changed closing date is named, with the one before; the new text is kept among the application\'s references until she decides', rc.box.slice(0, 300));
  await p.screenshot({ path: OUT + '/recheck.png' });
  await press('Keep the new text', '#cs .c-rc'); await p.waitForFunction(() => !IngCareer.state().opps[0].recheck, null, { timeout: 20000 }); await p.waitForTimeout(300);
  const kept = await p.evaluate(() => { const o = IngCareer.state().opps[0]; return IngCareer.postOnly(o).then(t => ({ text: t.trim(), due: o.due, closes: o.closes, older: (o.older.post || []).length, recheck: !!o.recheck, refs: IngCareer.oppRefs(o).length, meta: (document.querySelector('#cs .c-work .c-note') || {}).textContent })); });
  ok(kept.text === V2.trim() && kept.due === '2026-12-07' && kept.closes === 'The closing date is 7 December 2026.' && kept.older === 1 && !kept.recheck && kept.refs === 2 && /checked again/.test(kept.meta), 'Keep the new text makes it the posting, with the new closing date; her copy of the old one stays kept beside it', kept);
  await press('Check it again', '#cs .c-work .c-pn-f'); await p.waitForTimeout(500);
  ok(await p.evaluate(() => !IngCareer.state().opps[0].recheck && /Unchanged: the posting reads as it did on/.test((document.getElementById('ingToast') || {}).textContent || '')), 'checked again with nothing changed, it says so');
  // a second new text kept: the copy kept before the last is let go, and one copy before stays
  const firstOld = await p.evaluate(() => IngCareer.state().opps[0].older.post[0].ref);
  await p.evaluate(V3 => { window.__pages.push(V3); }, V3);
  await press('Check it again', '#cs .c-work .c-pn-f'); await p.waitForFunction(() => !!IngCareer.state().opps[0].recheck, null, { timeout: 20000 }); await p.waitForTimeout(300);
  await press('Keep the new text', '#cs .c-rc'); await p.waitForFunction(() => !IngCareer.state().opps[0].recheck, null, { timeout: 20000 }); await p.waitForTimeout(300);
  const second = await p.evaluate(ref => { const o = IngCareer.state().opps[0]; return IngBig.load(ref).then(t => ({ gone: t == null, older: o.older.post.length, refs: IngCareer.oppRefs(o).length })); }, firstOld);
  ok(second.gone && second.older === 1 && second.refs === 2, 'a second new text kept lets the oldest copy go: one copy before stays', second);
  // further particulars, read with the posting
  await p.evaluate(FP => IngCareer.addMore(IngCareer.state().opps[0], 'Further particulars.pdf', FP), FP); await p.waitForTimeout(300);
  const more = await p.evaluate(() => { const o = IngCareer.state().opps[0]; return Promise.all([IngCareer.postText(o), IngCareer.postOnly(o)]).then(t => ({ n: o.more.length, joined: /FURTHER PARTICULARS \(Further particulars\.pdf\):\nFurther particulars for the post/.test(t[0]) && t[0].indexOf(t[1]) === 0, limit: IngCareer.limitFor(t[0], 'supporting'), coverLimit: IngCareer.limitFor(t[0], 'cover'), chips: [...document.querySelectorAll('#cs .c-more .c-chip')].map(x => x.textContent), refs: IngCareer.oppRefs(o).includes(o.more[0].ref) })); });
  ok(more.n === 1 && more.joined && JSON.stringify(more.limit) === '{"words":1500}' && JSON.stringify(more.coverLimit) === '{"words":500}' && /^Further particulars\.pdf · /.test(more.chips[0] || '') && more.refs, 'a document added to the application is read with the posting: its limit (1,500 words for the statement) joins the posting\'s own (500 for the letter)', more);
  await p.evaluate(() => { const o = IngCareer.state().opps[0]; o.way = 'auto'; o.read = { r: { crit: [], strengths: [], concerns: [], next: [], asks: [], wants: [] }, at: Date.now(), model: 'Test model' }; IngLector.plan = () => null; return IngCareer.makeCheck(o); }); await p.waitForTimeout(500);
  const ck = await p.evaluate(() => IngCareer.state().opps[0].check.items.map(x => x.text));
  ok(ck.includes('A supporting statement (no more than 1,500 words)') && ck.includes('A cover letter (no more than 500 words)') && ck.some(t => /^Send it before it closes: 7 December 2026/.test(t)), 'the checklist reads the particulars too, and sends it before the new closing date', ck);
  ok(outside.length === 0 && (await p.evaluate(() => window.__net.length)) === 4, 'nothing went online but the four fetches she pressed for (answered by the stand-in)', outside.slice(0, 3));
  ok(await p.evaluate(() => Object.keys(window.__ingParts).every(k => window.__ingParts[k] === 'running')), 'every part of the page ran to its end');
  ok(errs.length === 0, 'no script errors on the page', errs.slice(0, 4).join(' | '));
  console.log(pass + ' passed, ' + fail + ' failed'); await b.close(); process.exit(fail ? 1 : 0);
})().catch(e => { console.error(e); console.log(pass + ' passed, ' + (fail + 1) + ' failed'); process.exit(1); });
