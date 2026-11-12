// node rig/t_690_guard.js <Ingenium page url (master or full)> <out dir>
// Ingenium 6.90 (12 November 2026). Her answers to the questionnaire: what must never go to a connected model: "My contact details",
// "My referees", "Pay figures". With a stand-in connection that sends what it reads away (an invented person, an invented CV), what the
// studio sends holds none of them; with a model on this device, everything is there as before. Also: the counsellor's voice (frank by
// default), the paths asked as a recommendation and one alternative, an app's sentences copied as CV bullets, and the studio opening on Today.
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs');
const [URL_, OUT] = process.argv.slice(2); fs.mkdirSync(OUT, { recursive: true });
let pass = 0, fail = 0; function ok(c, m, d) { if (c) { pass++; console.log('ok   ' + m); } else { fail++; console.log('FAIL ' + m + (d !== undefined ? ' :: ' + JSON.stringify(d).slice(0, 700) : '')); } }
const CV = 'Rosalind Okafor\nrosalind.okafor@example.org · +44 7700 900123 · Leeds\n\nEducation\nMA in Education, Northgate University, 2019 to 2021.\n\nExperience\nLearning technologist, Westbrook College, 2021 to 2024, salary £31,500 a year. Designed three online modules used by 900 students.\n\nReferees\nDr Ada Hale, Westbrook College, ada.hale@example.org\nProf. Sam Ito, Northgate University\n\nSkills\nInstructional design.';
(async () => {
  const b = await pw.chromium.launch(); const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } }); const p = await ctx.newPage(); const errs = [];
  p.on('pageerror', e => errs.push(e.message.slice(0, 200)));
  await p.goto(URL_); await p.waitForFunction(() => window.__ingReady === true && window.IngCareer && IngCareer.ui, null, { timeout: 300000 }); await p.waitForTimeout(800);
  await p.evaluate(() => { const k = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Enter' && x.offsetParent); if (k) k.click(); try { tourEnd(); } catch (e) {} });
  const room = await p.evaluate(() => { delete state.career; return IngCareer.state().ui.room; });
  ok(room === 'today', 'a fresh studio opens on Today (her choice: the whole picture first)', room);
  await p.evaluate(async (CV) => { const S = IngCareer.state(); S.profile.name = 'Rosalind Okafor'; S.profile.contact = 'rosalind.okafor@example.org · +44 7700 900123';
    S.profile.items.push({ id: 'it1', sec: 'referee', title: 'Dr Ada Hale', place: 'Westbrook College', text: 'ada.hale@example.org', src: 'me' }, { id: 'it2', sec: 'post', title: 'Learning technologist', place: 'Westbrook College', text: 'Salary £31,500 a year; 900 students', src: 'me' });
    const me = IngLector.state().me, ref = IngBig.newId(); await IngBig.put(ref, CV); me.cv = { ref, name: 'CV.txt', chars: CV.length, at: Date.now() }; saveState(); }, CV);
  const block = (away) => p.evaluate(async (away) => { const L = IngLector.plan; window.__plan = window.__plan || L; IngLector.plan = () => (away ? { cloud: true, chosen: null } : (__plan() || { chosen: { id: 'x', customName: 'here' } })); window.lxCloudLeaves = () => !!away;
    const G = await IngCareer.ui.gatherProfile({}); const t = IngCareer.ui.profileBlock(G, 200000); IngLector.plan = __plan; return t; }, away);
  const here = await block(false), there = await block(true);
  ok(/rosalind\.okafor@example\.org/.test(here) && /Dr Ada Hale/.test(here) && /31,500/.test(here), 'a model on this device reads everything, as before', here.slice(0, 300));
  ok(!/@example\.org/.test(there) && !/7700 900123/.test(there), 'a connected model that sends it away gets no email and no telephone number', there.slice(0, 600));
  ok(!/Ada Hale/.test(there) && !/Sam Ito/.test(there) && /\[Referees: kept on this device\]/.test(there), 'and no referee: the section is left out of the profile and the CV', there.slice(0, 900));
  ok(!/31,500/.test(there) && /kept on this device/.test(there) && /900 students/.test(there), 'and no pay figure, while other figures stay', there.slice(0, 900));
  const sysT = await p.evaluate(() => IngCareer.ui.sys('You are now a careers adviser.'));
  ok(/Speak frankly, as a good recruiter would: say plainly when a plan, a document or an answer is weak/.test(sysT), 'the studio speaks frankly by default and says when a plan is weak (her choice)', sysT.slice(-400));
  const asked = await p.evaluate(async () => { const S = IngCareer.state(); S.profile.wants.looking = 'Learning design'; let u = '';
    const L = ING_LINEUP.models; state.models = (state.models || []).filter(m => !/^mfake/.test(m.id)); state.models.push({ id: 'mfake12', customName: 'Stand-in', fileState: 'ready', fileName: L['gemma-4-12b'].file, stored: true });
    IngLector.plan = () => ({ chosen: state.models.filter(m => m.id === 'mfake12')[0] });
    lxAsk = (run, msgs) => { u = msgs[msgs.length - 1].content; return Promise.resolve('PATH: A | b | c | d | e | f | g\nPATH: B | b | c | d | e | f | g'); };
    IngCareer.paths(); await new Promise(r => setTimeout(r, 800)); IngLector.plan = __plan; return { u: u.slice(0, 900), n: (S.paths && S.paths.list || []).length }; });
  ok(/Put first the path you recommend/.test(asked.u) && /the alternative you would weigh against it/.test(asked.u) && asked.n === 2, 'the paths are asked as a recommendation with its reason, and one alternative (her choice)', asked);
  const bullets = await p.evaluate(async () => { const E = IngCareer.state().edge = IngCareer.state().edge || {}; E.apps = { 'Quill Notes': { at: Date.now(), model: 'x', version: '1', list: [{ id: 'a', skill: 'Offline design', evidence: 'keeps data on the device', suits: 'Projects', line: 'Designed a notebook that keeps every note on the device.' }, { id: 'b', skill: 'Testing', evidence: 'a test rig', suits: 'Skills', line: 'Wrote 40 checks for it.' }] } };
    window.lxState = window.lxState || (() => ({ runs: [] })); const ls = lxState; window.__ls = ls; lxState = () => { const s = ls(); return Object.assign({}, s, { runs: (s.runs || []).concat([{ id: 'run1', kind: 'app', status: 'done', name: 'Quill Notes', version: '1', app: 'quill' }]) }); };
    const S = IngCareer.state(); S.ui.room = 'edge'; S.ui.esel = 'a:Quill Notes'; S.ui.show = 'work'; go('career'); IngCareer.render(); await new Promise(r => setTimeout(r, 300));
    let copied = ''; const cw = navigator.clipboard && navigator.clipboard.writeText; try { navigator.clipboard.writeText = t => { copied = t; return Promise.resolve(); }; } catch (e) {}
    const k = [...document.querySelectorAll('#csWork .c-btn')].find(x => x.textContent.trim() === 'Copy as CV bullets'); if (k) k.click(); lxState = window.__ls; return { key: !!k, copied }; });
  ok(bullets.key && bullets.copied === '- Designed a notebook that keeps every note on the device.\n- Wrote 40 checks for it.', 'an app\'s reading gives its sentences as CV bullets, ready to paste (her choice)', bullets);
  ok(errs.length === 0, 'no errors on the page', errs);
  await b.close(); console.log(`\n${pass} passed, ${fail} failed`); process.exit(fail ? 1 : 0);
})().catch(e => { console.error(e); process.exit(2); });
