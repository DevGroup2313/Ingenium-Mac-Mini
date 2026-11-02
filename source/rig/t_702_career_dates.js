// node rig/t_702_career_dates.js <Ingenium page url> <out dir>
// 6.9.2: the Career Studio's dates and reminders (modules/r188.js), in Chromium. Her words (31 October 2026): "I want to be
// able to use it for PhD applications and for job applications. I want to be able to automate where I want and also
// meticulously review and do on my own at my own pace." So each application has its dates (the closing date, the interview,
// a reference due, any other day), each with Remind me: a thought in the Inbox that comes back on its morning, or a line
// with the bell; inside Ingenium only, and the studio says so. Today's list opens on a This week strip.
//   - Track's Dates list shows the closing date with the days left and the three Remind me chips;
//   - 3 days before a date three days off puts one thought in the Inbox, due today, and Focus's "what today asks" lists it;
//   - pressed twice, no second thought; With the bell keeps one line, once;
//   - a date added by hand (a funding deadline) joins the list and Today's This week strip, and the nearest-date sentence;
//   - removing the application removes its thoughts; every part of the page ran; no page errors.
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs');
const [URL_, OUT] = process.argv.slice(2); fs.mkdirSync(OUT, { recursive: true });
let pass = 0, fail = 0; const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (c || d === undefined ? '' : '  ' + String(typeof d === 'string' ? d : JSON.stringify(d)).slice(0, 700))); c ? pass++ : fail++; };
const POST = 'DPhil in History of Science\nUniversity of Exampleton\nApplicants must submit a CV and a research proposal of no more than 2,000 words.\nTwo academic references are required.\nThe closing date is 30 November 2026.\n' + 'x'.repeat(40);
(async () => {
  const b = await pw.chromium.launch(); const p = await (await b.newContext({ viewport: { width: 1440, height: 950 } })).newPage();
  const errs = []; p.on('pageerror', e => errs.push(e.message.slice(0, 200)));
  const outside = []; p.on('request', r => { const u = r.url(); if (/^https?:/.test(u) && !/^https?:\/\/(127\.0\.0\.1|localhost)/.test(u)) outside.push(u); });
  await p.goto(URL_); await p.waitForFunction(() => window.__ingReady === true && window.IngCareer, null, { timeout: 300000 });
  await p.evaluate(() => { const k = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Enter' && x.offsetParent); if (k) k.click(); }); await p.waitForTimeout(900);
  const press = async (text, within) => { const hit = await p.evaluate(([text, within]) => { const root = document.querySelector(within || '#cs') || document;
      const k = [...root.querySelectorAll('button')].find(x => x.offsetParent && !x.disabled && (x.textContent.trim() === text || (x.querySelector('b') && x.querySelector('b').textContent.trim() === text)));
      if (!k) return false; k.click(); return true; }, [text, within || null]); if (!hit) throw new Error('no key: ' + text); await p.waitForTimeout(350); };
  // an application whose closing date is three days from the page's own today
  const made = await p.evaluate(post => { state.parked = []; state.reminders = []; const d = new Date(); d.setDate(d.getDate() + 3);
    const iso = d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
    return IngCareer.newOpp('phd', post, 'pasted').then(o => { o.due = iso; o.step = 'track'; saveState(); const S = IngCareer.state(); S.ui.room = 'apps'; S.ui.open = o.id; S.ui.show = 'work'; go('career'); IngCareer.render(); return { id: o.id, iso }; }); }, POST);
  await p.waitForTimeout(600);
  const dates = await p.evaluate(() => { const d = document.querySelector('#cs .c-dates'); return { text: d ? d.innerText.replace(/\s+/g, ' ') : '', chips: d ? [...d.querySelectorAll('.c-remind .c-btn')].map(x => x.textContent + (x.disabled ? '(off)' : '')) : [] }; });
  ok(/Dates/.test(dates.text) && /Closes/.test(dates.text) && /in 3 days/.test(dates.text) && dates.chips.join('|') === 'A week before(off)|3 days before|The day before|With the bell' && /no alarms outside the app/.test(dates.text),
    'Track lists the closing date with its days left and the Remind me chips (a week before is off: the day has passed); it says reminders stay inside Ingenium', dates);
  await p.screenshot({ path: OUT + '/dates.png' });
  // Remind me, 3 days before: one thought in the Inbox, due today
  await press('3 days before', '#cs .c-dates');
  const th = await p.evaluate(id => { const o = IngCareer.state().opps.find(x => x.id === id), ps = state.parked || []; const it = ps[0]; const d = it ? new Date(it.remindAt) : null, n = new Date();
    return { n: ps.length, text: it && it.t, sameDay: d && d.getFullYear() === n.getFullYear() && d.getMonth() === n.getMonth() && d.getDate() === n.getDate(), hour: d && d.getHours(), rem: (o.reminders || []).length, linked: it && o.reminders[0] && o.reminders[0].thoughtId === it.id, career: it && it.career && it.career.opp === id }; }, made.id);
  ok(th.n === 1 && /^DPhil in History of Science: closes on .* in 3 days\.$/.test(th.text || '') && th.sameDay && th.hour >= 9 && th.rem === 1 && th.linked && th.career, 'one thought in the Inbox, naming the application and the day, due this morning (or in five minutes when the morning has passed), tied to the application', th);
  const focus = await p.evaluate(() => { try { return IngSupport.todayRows().map(r => r.text); } catch (e) { return ['ERR ' + e.message]; } });
  ok(focus.some(t => /A thought asked to come back today: “DPhil in History of Science: closes on/.test(t)), "Focus's \"what today asks of you\" lists it", focus);
  const pressed = await p.evaluate(() => { const k = [...document.querySelectorAll('#cs .c-dates .c-remind .c-btn')].find(x => x.textContent === '3 days before'); return k && k.getAttribute('aria-pressed'); });
  ok(pressed === 'true', 'the chip shows the reminder is set');
  await press('3 days before', '#cs .c-dates');
  ok(await p.evaluate(() => state.parked.length === 1 && IngCareer.state().opps[0].reminders.length === 1), 'pressed again, no second thought');
  await press('With the bell', '#cs .c-dates'); await press('With the bell', '#cs .c-dates');
  const bell = await p.evaluate(() => ({ n: state.reminders.length, t: state.reminders[0] && state.reminders[0].text, badge: document.getElementById('bellBadge') && document.getElementById('bellBadge').textContent }));
  ok(bell.n === 1 && /^DPhil in History of Science: closes on /.test(bell.t || '') && bell.badge === '1', 'With the bell keeps one line among the bell\'s reminders, once', bell);
  // a date of her own
  const in10 = await p.evaluate(() => { const d = new Date(); d.setDate(d.getDate() + 6); return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0'); });
  await p.evaluate(iso => { const box = document.querySelector('#cs .c-adddate'); box.querySelector('select').value = 'funding'; const i = box.querySelector('input[type=date]'); i.value = iso; i.dispatchEvent(new Event('change')); box.querySelector('input[type=text]').value = 'Funding form'; }, in10);
  await press('Add the date', '#cs .c-adddate');
  const ds = await p.evaluate(id => IngCareer.datesOf(IngCareer.state().opps.find(x => x.id === id)).map(d => d.kind + ':' + d.label), made.id);
  ok(ds.join('|') === 'closes:Closes|funding:Funding form', 'a date added by hand joins the list, in order of day', ds);
  // Today: the week's strip and the nearest date
  await p.evaluate(() => { const S = IngCareer.state(); S.ui.room = 'today'; S.ui.today = null; IngCareer.render(); }); await p.waitForTimeout(300);
  const week = await p.evaluate(() => ({ strip: (document.querySelector('#cs .c-list .c-week') || {}).innerText || '', rows: [...document.querySelectorAll('#cs .c-list .c-week .c-wk')].map(x => x.innerText.replace(/\s+/g, ' ')), near: (document.querySelector('#cs .c-work .c-today p') || {}).textContent, items: document.querySelectorAll('#cs .c-list .c-item').length }));
  ok(/^This week/i.test(week.strip) && week.rows.length === 2 && /in 3 days Closes · DPhil in History of Science/.test(week.rows[0]) && /in 6 days Funding form · DPhil/.test(week.rows[1]) && week.items === 1, "Today opens on a This week strip with both dates, and still one step per application", week);
  ok(/^The nearest date is in 3 days, .*: DPhil in History of Science closes\.$/.test(week.near || ''), 'the nearest date is said in plain words', week.near);
  await p.screenshot({ path: OUT + '/today-week.png' });
  await p.click('#cs .c-list .c-week .c-wk'); await p.waitForTimeout(300);
  ok(await p.evaluate(id => { const S = IngCareer.state(); return S.ui.room === 'apps' && S.ui.open === id && S.opps[0].step === 'track'; }, made.id), 'a date in the strip opens its application at Track');
  // a date moved: the reminder set for the old day is free again; set again, it replaces the old thought
  await p.evaluate(id => { const o = IngCareer.state().opps.find(x => x.id === id); const d = new Date(); d.setDate(d.getDate() + 4); o.due = d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0'); o.step = 'track'; saveState(); IngCareer.render(); }, made.id); await p.waitForTimeout(300);
  const freed = await p.evaluate(() => { const k = [...document.querySelectorAll('#cs .c-dates .c-remind .c-btn')].find(x => x.textContent === '3 days before'); return k && k.getAttribute('aria-pressed'); });
  await press('3 days before', '#cs .c-dates');
  const moved = await p.evaluate(id => { const o = IngCareer.state().opps.find(x => x.id === id); return { n: state.parked.length, text: state.parked[0] && state.parked[0].t, rem: o.reminders.length, note: /When a date moves, set its reminder again/.test(document.querySelector('#cs .c-dates').innerText) }; }, made.id);
  ok(freed === 'false' && moved.n === 1 && /closes on .* in 4 days\.$/.test(moved.text || '') && moved.rem === 1 && moved.note, 'the closing date moved, its reminder is free to set again; set again, the old thought leaves the Inbox and the new one names the new day', { freed, moved });
  // removing the application takes its thoughts with it
  await p.evaluate(id => IngCareer.removeOpp(IngCareer.state().opps.find(x => x.id === id)), made.id); await p.waitForTimeout(200);
  ok(await p.evaluate(() => state.parked.length === 0 && IngCareer.state().opps.length === 0), 'the application removed, its thought leaves the Inbox too');
  ok(outside.length === 0, 'nothing was searched or fetched online', outside.slice(0, 3));
  ok(await p.evaluate(() => Object.keys(window.__ingParts).every(k => window.__ingParts[k] === 'running')), 'every part of the page ran to its end', await p.evaluate(() => Object.keys(window.__ingParts).filter(k => window.__ingParts[k] !== 'running')));
  ok(errs.length === 0, 'no script errors on the page', errs.slice(0, 4).join(' | '));
  console.log(pass + ' passed, ' + fail + ' failed'); await b.close(); process.exit(fail ? 1 : 0);
})().catch(e => { console.error(e); console.log(pass + ' passed, ' + (fail + 1) + ' failed'); process.exit(1); });
