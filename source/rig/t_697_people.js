// People, and Today one step at a time (Ingenium 6.9.7, modules/r188.js). Her words (3 November 2026): "emailing potential supervisors,
// reference requests and hiring managers and recruiters. I need a system built-in Ingenium that can help me streamline all of that and
// manage it all"; her choices: one step at a time; Ingenium drafts, she reviews all and edits freely. People here are invented.
// A stand-in for Anthropic's Messages API (page.route) writes the draft; no real key is used.
//   node rig/t_697_people.js <Ingenium page url> <out folder>
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs');
const [URL_, OUT] = process.argv.slice(2); fs.mkdirSync(OUT, { recursive: true });
let pass = 0, fail = 0;
const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (d !== undefined ? '  ' + JSON.stringify(d).slice(0, 600) : '')); c ? pass++ : fail++; };
const BASE = new URL(URL_).origin + '/mockanthropic';
const ev = (o) => 'event: ' + o.type + '\ndata: ' + JSON.stringify(o) + '\n\n';
const DRAFT = 'Subject: A possible doctoral project on digital archives\n\nDear Dr Example,\n\nI am writing to ask whether you would consider supervising a doctoral project. [one sentence on your proposed question]\n\nWith thanks,\nAda Applicant';
let sent = [];
(async () => {
  const b = await pw.chromium.launch(); const p = await (await b.newContext({ viewport: { width: 1440, height: 1000 } })).newPage();
  const errs = []; p.on('pageerror', e => errs.push(e.message));
  await p.route('**/mockanthropic/**', (route) => { const bd = JSON.parse(route.request().postData() || '{}'); sent.push(bd);
    route.fulfill({ status: 200, contentType: 'text/event-stream', body: ev({ type: 'message_start', message: { model: 'claude-fable-5-1', usage: { input_tokens: 1 } } }) + ev({ type: 'content_block_start', index: 0, content_block: { type: 'text', text: '' } })
      + ev({ type: 'content_block_delta', index: 0, delta: { type: 'text_delta', text: DRAFT } }) + ev({ type: 'message_delta', delta: { stop_reason: 'end_turn' }, usage: { output_tokens: 5 } }) + ev({ type: 'message_stop' }) }); });
  await p.goto(URL_); await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 180000 }); await p.waitForTimeout(700);
  await p.evaluate(() => { const b = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Enter' && x.offsetParent); if (b) b.click(); });
  await p.waitForTimeout(500);
  await p.evaluate((BASE) => { window.__toasts = []; const o = window.ingToast; window.ingToast = function (t) { window.__toasts.push(String(t)); return o.apply(this, arguments); };
    state.cloud = { on: false, provider: 'anthropic', base: BASE, key: 'sk-test-not-real', model: 'claude-fable-5-1', models: ['claude-fable-5-1'], info: { 'claude-fable-5-1': { ctx: 1000000, out: 128000 } } }; saveState(); lxSetCloud(true); go('career'); }, BASE);
  await p.waitForTimeout(700);
  const click = (re, scope) => p.evaluate(({ src, scope }) => { const r = new RegExp(src); const k = [...document.querySelectorAll((scope || '#page-career') + ' button, ' + (scope || '#page-career') + ' [role=tab]')].find((x) => x.offsetParent && r.test(x.textContent.trim())); if (k) { k.click(); return true; } return false; }, { src: re.source, scope });
  const text = () => p.evaluate(() => (document.getElementById('page-career') || {}).innerText || '');
  const C = () => p.evaluate(() => { const r = state.career, s = r.people.filter((x) => x.id === r.cur)[0]; return (s.contacts || []).map((c) => ({ name: c.name, role: c.role, status: c.status, follow: c.follow, draft: (c.draft || '').slice(0, 60) })); });
  const todayRows = () => p.evaluate(() => { const L = document.querySelector('#page-career .c-list'); if (!L) return null; const top = [...L.querySelectorAll('.c-pn-b > .c-item')].map((x) => x.querySelector('b').textContent); const folded = [...L.querySelectorAll('details.cs-fold')].map((d) => d.querySelector('summary').textContent); return { top, folded }; });
  const iso = (n) => { const d = new Date(); d.setDate(d.getDate() + n); return d.toISOString().slice(0, 10); };
  // 1. the room
  const tabs = await p.evaluate(() => [...document.querySelectorAll('#page-career .rm-tabs [role=tab]')].map((t) => t.textContent.trim()));
  ok(JSON.stringify(tabs) === JSON.stringify(['Today', 'Applications', 'People', 'Your profile', 'Goals and plan', 'Learn']), '1. a People room sits beside Applications', tabs);
  await click(/^People$/); await p.waitForTimeout(400);
  let t = await text();
  ok(/No one yet/.test(t) && /How People works/.test(t) && /Ingenium drafts the email .* it sends nothing/i.test(t.replace(/\n/g, ' ')), '1. empty, it says what it is for, and that Ingenium drafts but sends nothing', t.slice(0, 200));
  // 2. a potential supervisor
  await click(/^\+ A person$/); await p.waitForTimeout(400);
  await p.fill('#pcName', 'Dr Ada Example'); await p.dispatchEvent('#pcName', 'change');
  await p.fill('#pcOrg', 'Faculty of History, University of Somewhere'); await p.dispatchEvent('#pcOrg', 'change');
  await p.fill('#pcNotes', 'Works on the history of computing and on digital archives.'); await p.dispatchEvent('#pcNotes', 'change');
  await p.waitForTimeout(300);
  let c = await C();
  ok(c.length === 1 && c[0].name === 'Dr Ada Example' && c[0].role === 'supervisor' && c[0].status === 'write', '2. a potential supervisor is added, to write to', c);
  await click(/^Today$/); await p.waitForTimeout(400);
  let tr = await todayRows();
  ok(tr && tr.top.length === 1 && tr.top[0] === 'Write to Dr Ada Example', '2. Today shows it as the one step', tr);
  // 3. the draft: written from her notes and profile, for her to read
  await click(/^People$/); await p.waitForTimeout(300);
  await p.evaluate(() => { const r = state.career, s = r.people.filter((x) => x.id === r.cur)[0]; s.ui.person = s.contacts[0].id; saveState(); });
  await click(/^Dr Ada Example/); await p.waitForTimeout(300);
  sent = [];
  await click(/^Draft an email for me$/);
  for (let i = 0; i < 60; i++) { c = await C(); if (c[0].draft) break; await p.waitForTimeout(250); }
  const req = sent[0] || {}, sys0 = String(req.system || ''), user0 = JSON.stringify(req.messages || []);
  ok(c[0].status === 'draft' && /^Subject: A possible doctoral project/.test(c[0].draft), '3. the draft comes back into the email box, and the status is Draft ready', c[0]);
  ok(/never invent a name, a publication, a project, a date, a figure or a claim/.test(sys0) && /square brackets/.test(sys0) && /history of computing/.test(user0) && /supervising her doctoral project/.test(user0), '3. the request forbids invented facts and carries her notes and purpose', { sys: sys0.slice(0, 120) });
  t = await p.evaluate(() => window.__toasts.join(' | '));
  ok(/read every line, change what you like, then copy it into your own email/.test(t), '3. it says she reads and changes it, and sends it herself', t.slice(-160));
  // 4. sent: a date to follow up, and nothing on Today until then
  await click(/^I sent it$/); await p.waitForTimeout(400);
  c = await C();
  ok(c[0].status === 'sent' && c[0].follow === iso(10), '4. marked as sent, a follow-up is set ten days on for a supervisor', c[0]);
  await click(/^Today$/); await p.waitForTimeout(400); tr = await todayRows();
  ok(!tr.top.some((x) => /Ada/.test(x)), '4. while she waits, Today does not show her', tr);
  // 5. one step at a time: the most urgent leads, the rest folded; three on request
  await p.evaluate((d) => { const r = state.career, s = r.people.filter((x) => x.id === r.cur)[0]; s.contacts[0].follow = d;
    s.contacts.push({ id: 'pc2', name: 'Ben Recruiter', role: 'recruiter', org: 'An EdTech company', status: 'write', by: '', follow: '', notes: '', draft: '', at: Date.now() });
    s.contacts.push({ id: 'pc3', name: 'Cara Manager', role: 'manager', org: 'A museum', status: 'write', by: '', follow: '', notes: '', draft: '', at: Date.now() });
    s.contacts[2].by = new Date(Date.now() + 3 * 864e5).toISOString().slice(0, 10); saveState(); }, iso(-1));
  await click(/^People$/); await click(/^Today$/); await p.waitForTimeout(400); tr = await todayRows();
  ok(tr.top.length === 1 && tr.top[0] === 'Follow up with Dr Ada Example' && tr.folded.some((x) => /^What else is waiting \(2\)$/.test(x)), '5. one step at a time: the overdue follow-up leads, the other two wait folded', tr);
  await click(/^Show three at once$/); await p.waitForTimeout(400); tr = await todayRows();
  ok(tr.top.length === 3 && tr.top[0] === 'Follow up with Dr Ada Example' && tr.top[2] === 'Write to Cara Manager', '5. on request, three at once, in the order of their dates', tr);
  await click(/^Show one at a time$/); await p.waitForTimeout(300);
  // 6. the referees kept with each application are in People too
  await p.evaluate(() => { const r = state.career, s = r.people.filter((x) => x.id === r.cur)[0]; s.opps.push({ id: 'op-t', kind: 'programme', title: 'PhD in Digital Humanities', org: 'University of Somewhere', closes: '', due: '', stage: 'considering', at: Date.now(), docs: {}, older: {}, emails: [], practice: { crit: {}, qs: [] }, notes: '', refs: [{ id: 'r1', name: 'Prof Dan Referee', status: 'asked', asked: Date.now() }] }); saveState(); });
  await click(/^People$/); await p.waitForTimeout(400); t = await text();
  ok(/Referees in your applications \(1\)/.test(t), '6. the referees kept with each application are listed in People', (t.match(/Referees in your applications[^\n]*/) || [''])[0]);
  // 7. the profile file carries what she is looking for
  const w = await p.evaluate(async () => { const r = state.career, s = r.people.filter((x) => x.id === r.cur)[0]; s.profile.wants = { looking: '', need: '', avoid: '', where: '', when: '' };
    await IngProfileFile.apply(IngProfileFile.read(JSON.stringify({ kind: 'ingenium-profile', v: 1, person: { name: 'Ada Applicant' }, wants: { looking: 'PhD first; jobs alongside.', where: 'United Kingdom, United States, remote.', when: 'Within a month.' }, items: [], files: [] })));
    const out = await IngProfileFile.make(); return { wants: s.profile.wants, saved: out.wants }; });
  ok(w.wants.looking === 'PhD first; jobs alongside.' && w.wants.where === 'United Kingdom, United States, remote.' && w.saved && w.saved.when === 'Within a month.', '7. a profile file fills what she is looking for, and a saved file keeps it', w);
  await p.screenshot({ path: OUT + '/people.png' }).catch(() => {});
  ok(errs.length === 0, 'no script errors on the page', errs);
  console.log(pass + ' passed, ' + fail + ' failed'); await b.close(); process.exit(fail ? 1 : 0);
})().catch((e) => { console.error(e); process.exit(2); });
