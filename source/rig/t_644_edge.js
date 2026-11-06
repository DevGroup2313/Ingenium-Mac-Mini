// node rig/t_644_edge.js <Ingenium page url> <out dir> [<full edition url>]
// Your edge and Your direction (Ingenium 6.44; modules/r188.js, r108.js). Her request (6 November 2026), in short: suggestions and
// recommendations for her CV, portfolio documents and cover letters, from Lector and the Career Studio; the skills and experience she
// has and how each transfers to her documents where it suits; her blind spots; what gives her an edge; and direction in choosing a
// career. The person, her record and her app are invented here; the model is a stand-in that answers each kind of request and records
// what it was asked.
// Checks: the room Your edge, after Your profile; What transfers (each with its evidence, where it counts and a sentence; a line with
// no evidence is left out; Add to your profile adds it once, under Skills, with its evidence; the ask carries her entries, her wants,
// her targets and the rules); Blind spots (their kinds, why and the fix; seen to and dropped); What sets you apart, with her
// positioning in three lines; Your documents (her CV, a document in her profile, a letter written in Applications), each looked at
// with suggestions, never rewritten (the ask says so and carries the document); Your direction in Goals and plan (paths with why,
// evidence, what is missing, this week, three months and beside her other goals; Make it a goal makes a goal with its steps; what to
// find out, ticked); all of it kept after a reload; when Lector has read an app, and again a newer copy of it, the studio spots by
// itself what the reading shows that her CV and profile do not, the new marked; Lector's Suggestions key hands its document to the
// studio, which looks at it; the
// chat's + menu attaches her career profile; Learn teaches it; nothing is fetched from the internet; the full edition has the room;
// no page errors.
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs');
const [URL_, OUT, FULL] = process.argv.slice(2); fs.mkdirSync(OUT, { recursive: true });
let pass = 0, fail = 0; const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (c || d === undefined ? '' : '  ' + String(typeof d === 'string' ? d : JSON.stringify(d)).slice(0, 900))); c ? pass++ : fail++; };
const CV = 'Tom Rennet\nBicycle mechanic, Exampleton Cycles, 2019 to 2024. Wrote the repair guides of the shop and ran thirty evening repair classes.\nBA in Geography, University of Exampleton, 2018.\nProjects: Tide Clock, an app I designed and built alone.';
const PORT = 'My repair portfolio. The classes: I planned thirty evening repair classes, wrote their guides and asked each group what they could now fix. Tide Clock: an app that shows the next tide for a harbour, which I designed, built and released alone.';
const LETTER = 'Dear panel, I am applying for the post of Technical Writer. I was responsible for classes at Exampleton Cycles, where I ran thirty evening repair classes. I also built an app. I would bring care and patience to the role. Yours faithfully, Tom Rennet';
const POST = 'Technical Writer, Example Gear Ltd.\nWe write manuals for outdoor gear. Essential: experience explaining how things work; clear writing. Desirable: building digital tools. Closing date 30 November 2026.';
const TIDE = '<!doctype html><html><head><meta charset="utf-8"><title>Tide Clock 2.1</title></head><body><h1>Tide Clock</h1><p>Shows the next high and low tide for a harbour.</p><script>var TABLE=[["06:12","high"]];function nextTide(){return TABLE[0];}<\/script></body></html>';
const TIDE2 = '<!doctype html><html><head><meta charset="utf-8"><title>Tide Clock 2.2</title></head><body><h1>Tide Clock</h1><p>Shows the next high and low tide for a harbour, and a week of tides.</p><script>var TABLE=[["06:12","high"],["12:30","low"]];function nextTide(){return TABLE[0];}function weekTides(){return TABLE.slice(0,14);}<\/script></body></html>';
const OUTS = {
  tr: ['TRANSFER: Explaining how things work | Bicycle mechanic, Exampleton Cycles (Posts and work): wrote the repair guides and ran thirty evening repair classes | A CV, a cover letter; technical writing posts | I wrote the repair guides of the shop and ran thirty evening repair classes at Exampleton Cycles.',
    'Here is what I found.',
    'TRANSFER: Building an app from start to finish | Tide Clock (as Lector read it): designed, built and released alone | A portfolio; posts that build tools | I designed, built and released Tide Clock on my own.',
    'TRANSFER: Public speaking |  | A CV | I am a gifted speaker.'].join('\n'),
  bl: ['BLIND: UNDERSOLD | Your app is missing from the top of your CV | Readers for writing posts that build tools look for built things | Put Tide Clock under Projects, with what it does.',
    'BLIND: MISSING | No measure of how well the guides worked | Technical writing posts often ask for it | Say how you asked each group what they could now fix, or plan a small check.',
    'BLIND: HABIT | Duties listed without results | A reader cannot tell what came of the work | Give each entry one result from your record.',
    'BLIND: QUESTION | Why the move from the workshop to writing | A panel will ask it | Answer it in one sentence in your letter.'].join('\n'),
  ed: ['EDGE: A mechanic who writes and builds his own tools | Bicycle mechanic (guides and classes); Tide Clock | I fix things, explain them, and build the tools that help.',
    'POSITION: PROFESSIONAL | A technical writer who builds what he explains.',
    'POSITION: ACADEMIC | A student of how people use the objects they repair.',
    'POSITION: BRIDGE | Repairing and writing give my study its questions, and my study tells me what to build.'].join('\n'),
  doc: ['STRENGTHEN: The opening paragraph | Name one result from the classes in it.',
    'ADD: Tide Clock, from your apps as Lector read them | Under the second paragraph.',
    'CUT: "I would bring care and patience" | It claims what the letter does not show.',
    'WORDING: "responsible for classes" | It hides what you did yourself.',
    'BLIND: Why writing now | One sentence near the start.',
    'NEXT: Add one result to the second paragraph.'].join('\n'),
  pa: ['PATH: Technical writer for outdoor gear | You want to write guides and manuals, with long projects | Bicycle mechanic (guides and classes); Tide Clock | No published manual yet | Write to two technical writers and ask how they work | Write one full manual for a tool you know; write a case study of the classes; apply to three posts | A part-time post leaves room for your study goal',
    'PATH: Content designer for repair apps | You want to write and to build | Your writing; Tide Clock | No product team experience | Read three descriptions of the work closely | Turn one class into a step-by-step guide | It sits beside your study goal',
    'FIND: Which makers hire technical writers | Ask two people in the field',
    'FIND: Do I prefer building or writing | Try a two-week project of each'].join('\n'),
  sa1: ['SKILLFROMAPP: Designing a display driven by data | Tide Clock shows the next tide from a table kept on the device (nextTide) | Projects in a CV; a portfolio | I designed Tide Clock to show the next tide from a table kept on the device.',
    'SKILLFROMAPP: Shipping alone |  | A CV | I shipped it.'].join('\n'),
  sa2: ['SKILLFROMAPP: Planning ahead for users | Tide Clock 2.2 adds a week of tides (weekTides) | NEW | Projects in a CV; a cover letter | I added a week of tides to Tide Clock, so its users can plan ahead.',
    'SKILLFROMAPP: Designing a display driven by data | the table kept on the device | KNOWN | Projects in a CV | I designed Tide Clock to show the next tide from a table kept on the device.'].join('\n')
};
const boot = async (ctx, url) => { const p = await ctx.newPage(); p.__errs = []; p.__web = []; p.on('pageerror', e => p.__errs.push(e.message.slice(0, 200)));
  p.on('request', q => { const u = q.url(); if (/^https?:/.test(u) && !/^https?:\/\/(127\.0\.0\.1|localhost)/.test(u)) p.__web.push(u); });
  await p.goto(url); await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 300000 }); await p.waitForTimeout(800);
  await p.evaluate(() => { const k = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Enter' && x.offsetParent); if (k) k.click(); }); await p.waitForTimeout(600); return p; };
// the stand-in model: the studio's asks by their own words; Lector's asks get plain prose (its examiner gets the draft back)
const stand = (p) => p.evaluate((OUTS) => { window.__asked = []; IngLector.plan = () => ({ chosen: { id: 'mfake4', customName: 'Stand-in 4B' } });
  const L = ING_LINEUP.models; state.models = (state.models || []).filter(m => !/^mfake/.test(m.id));
  state.models.push({ id: 'mfake4', customName: 'Stand-in 4B', fileState: 'ready', fileName: L['qwen3.5-4b'].file, stored: true }); saveState();
  window.lxAsk = function (run, msgs, max, temp, onPiece) { const sys = String(msgs[0].content || ''), u = String(msgs[msgs.length - 1].content || ''); window.__asked.push({ sys: sys.slice(0, 3000), u: u.slice(0, 12000) }); let out;
    if (/TRANSFER: the skill or experience/.test(u)) out = OUTS.tr; else if (/BLIND: UNDERSOLD or MISSING/.test(u)) out = OUTS.bl; else if (/EDGE: what sets me apart/.test(u)) out = OUTS.ed;
    else if (/STRENGTHEN: a part that works/.test(u)) out = OUTS.doc; else if (/PATH: the path/.test(u)) out = OUTS.pa;
    else if (/SKILLFROMAPP: the skill or experience/.test(u)) out = /THE EARLIER READING/.test(u) ? OUTS.sa2 : OUTS.sa1;
    else if (/examiner of a draft/.test(sys)) out = (u.split('THE DRAFT:\n')[1] || 'Tide Clock shows the next tide for a harbour.');
    else out = 'Tide Clock shows the next high and low tide for a harbour, from a table kept on the device. Its function nextTide reads the table.';
    if (onPiece) onPiece(out); return Promise.resolve(out); }; }, OUTS);
const readWithLector = async (p) => { await p.evaluate(() => { go('lector'); }); await p.waitForTimeout(1200);
  await p.evaluate(() => { IngLector.state().job = null; const B = IngLector.state().brief; B.apps = ['app-tide-clock']; B.depth = 'overview'; B.modelId = 'mfake4'; B.docs = { dossier: true, appendix: false, portfolio: false, cover: false, cv: false }; saveState(); lxRender(); });
  await p.waitForTimeout(600);
  await p.evaluate(() => { const k = [...document.querySelectorAll('#l7BriefF button')].find(x => /Start reading|Write the documents/.test(x.textContent)); if (k) k.click(); });
  await p.waitForFunction(() => { const j = IngLector.state().job; return j && (j.status === 'done' || j.status === 'error'); }, null, { timeout: 180000 }).catch(() => {}); await p.waitForTimeout(500); };
const room = (p, r, extra) => p.evaluate(([r, extra]) => { const S = IngCareer.state(); S.ui.room = r; Object.assign(S.ui, extra || {}); S.ui.show = 'work'; saveState(); go('career'); IngCareer.render(); }, [r, extra]);
const idle = (p) => p.waitForFunction(() => !IngCareer.run.busy, null, { timeout: 60000 }).catch(() => {});
const press = (p, label) => p.evaluate((label) => { const b = [...document.querySelectorAll('#cs .c-work button')].find(x => x.textContent.trim() === label); if (b) { b.click(); return true; } return false; }, label);
(async () => {
  const b = await pw.chromium.launch({ args: ['--no-sandbox'] });
  const ctx = await b.newContext({ viewport: { width: 1440, height: 950 } }); const p = await boot(ctx, URL_);
  await stand(p);
  // her invented record: entries, wants, a goal, an application with a letter, her CV in Lector, a document in her profile
  await p.evaluate(async ([CV, PORT, LETTER, POST]) => { const S = IngCareer.state(), P = S.profile; P.name = 'Tom Rennet';
    P.items.push({ id: 'i1', sec: 'post', title: 'Bicycle mechanic', place: 'Exampleton Cycles', from: '2019', to: '2024', text: 'Wrote the shop\'s repair guides and ran thirty evening repair classes.' });
    P.items.push({ id: 'i2', sec: 'education', title: 'BA in Geography', place: 'University of Exampleton', from: '2015', to: '2018', text: '' });
    Object.assign(P.wants, { looking: 'Writing guides and manuals, with long projects and building small tools', need: 'Steady hours', avoid: 'Night shifts', where: 'Near home', when: 'Within a year' });
    S.goals.push({ id: 'g1', text: 'A part-time master\'s in industrial design', kind: 'academic', by: '', at: Date.now(), steps: [] });
    const cvRef = IngBig.newId(); await IngBig.put(cvRef, CV); IngLector.state().me.cv = { ref: cvRef, name: 'Tom Rennet CV.txt' };
    const fRef = IngBig.newId(); await IngBig.put(fRef, PORT); P.files.push({ id: 'f1', name: 'Teaching portfolio.txt', ref: fRef, chars: PORT.length, at: Date.now(), use: true });
    const o = await IngCareer.newOpp('job', POST); o.title = 'Technical Writer'; o.org = 'Example Gear Ltd';
    const lRef = IngBig.newId(); await IngBig.put(lRef, LETTER); o.docs.cover = { ref: lRef, made: Date.now(), model: 'you', mine: true, chk: { figures: [], fills: 0 } }; saveState(); }, [CV, PORT, LETTER, POST]);
  // 1. the room
  await room(p, 'edge', { esel: 'tr' }); await p.waitForTimeout(500);
  const tabs = await p.evaluate(() => [...document.querySelectorAll('#cs .rm-tabs [data-room]')].map(x => x.textContent.trim()));
  ok(JSON.stringify(tabs) === '["Today","Applications","People","Your profile","Your edge","Goals and plan","Learn"]', 'Your edge is a room of its own, after Your profile', tabs);
  const list = await p.evaluate(() => [...document.querySelectorAll('#cs .c-list .c-item b')].map(x => x.textContent));
  ok(['What transfers', 'Blind spots', 'What sets you apart', 'Your CV', 'Teaching portfolio.txt', 'Cover letter: Technical Writer'].every(x => list.indexOf(x) >= 0), 'its list: what transfers, blind spots, what sets you apart, and her documents (her CV, a document in her profile, a letter written in Applications)', list);
  // 2. what transfers
  await press(p, 'Find what transfers'); await idle(p); await p.waitForTimeout(300);
  const tr = await p.evaluate(() => { const E = IngCareer.state().edge, a = window.__asked[window.__asked.length - 1]; return { list: E.tr ? E.tr.list.map(x => [x.skill, !!x.evidence, !!x.suits, !!x.line]) : null, cards: document.querySelectorAll('#cs .c-work .c-entry.c-edge').length,
    ask: { entries: /Bicycle mechanic/.test(a.u) && /thirty evening repair classes/.test(a.u), wants: /Writing guides and manuals/.test(a.u), targets: /MY TARGETS/.test(a.u) && /A part-time master's in industrial design/.test(a.u) && /Technical Writer/.test(a.u), cv: /MY CV/.test(a.u), rules: /Never invent/.test(a.sys) && /never round one up/.test(a.u) } }; });
  ok(tr.list && tr.list.length === 2 && tr.list.every(x => x[1] && x[2] && x[3]) && tr.cards === 2, 'what transfers: each skill with its evidence, where it counts and a sentence; the one with no evidence is left out', tr.list);
  ok(Object.values(tr.ask).every(Boolean), 'the ask carries her entries, her CV, her wants, her targets (her goal and the post she weighs) and the rules: never invent, never round a skill up', tr.ask);
  await p.screenshot({ path: OUT + '/what-transfers.png' });
  await press(p, 'Add to your profile'); await p.waitForTimeout(200); await press(p, 'In your profile'); await p.waitForTimeout(200);
  const added = await p.evaluate(() => IngCareer.state().profile.items.filter(x => x.sec === 'skill').map(x => [x.title, /^Evidence: /.test(x.text)]));
  ok(added.length === 1 && added[0][0] === 'Explaining how things work' && added[0][1], 'Add to your profile adds it once, under Skills, with its evidence', added);
  // 3. blind spots
  await room(p, 'edge', { esel: 'bl' }); await press(p, 'Find my blind spots'); await idle(p); await p.waitForTimeout(300);
  const bl = await p.evaluate(() => { const E = IngCareer.state().edge; return { kinds: E.bl ? E.bl.list.map(x => x.kind) : [], full: E.bl ? E.bl.list.every(x => x.what && x.why && x.fix) : false, shown: [...document.querySelectorAll('#cs .c-work .c-blind .c-bk')].map(x => x.textContent) }; });
  ok(JSON.stringify(bl.kinds) === '["undersold","missing","habit","question"]' && bl.full && bl.shown.join() === 'Undersold,Not shown yet,A habit,A reader will ask', 'blind spots: what she undersells, what is not shown yet, a habit, a reader\'s question; each with why it matters and the fix', bl);
  await p.evaluate(() => { const c = document.querySelector('#cs .c-work .c-blind input[type=checkbox]'); c.click(); }); await p.waitForTimeout(200);
  await p.evaluate(() => { const r = [...document.querySelectorAll('#cs .c-work .c-blind')][3]; [...r.querySelectorAll('button')].find(x => x.textContent === 'Drop').click(); }); await p.waitForTimeout(200);
  const bl2 = await p.evaluate(() => { const L = IngCareer.state().edge.bl.list; return { n: L.length, done: L.filter(x => x.done).length, chip: (document.querySelector('#cs .c-work .c-pn-h .c-chip') || {}).textContent }; });
  ok(bl2.n === 3 && bl2.done === 1 && /1 of 3 seen to/.test(bl2.chip), 'a blind spot is ticked when seen to, and one can be dropped', bl2);
  await p.screenshot({ path: OUT + '/blind-spots.png' });
  // 4. what sets her apart
  await room(p, 'edge', { esel: 'ed' }); await press(p, 'Find what sets me apart'); await idle(p); await p.waitForTimeout(300);
  const ed = await p.evaluate(() => { const E = IngCareer.state().edge.ed; return { n: E ? E.list.length : 0, pos: E ? Object.keys(E.pos).sort().join() : '', lines: document.querySelectorAll('#cs .c-work .c-entry.c-pos').length, edges: document.querySelectorAll('#cs .c-work .c-entry.c-edge').length }; });
  ok(ed.n === 1 && ed.pos === 'acad,bridge,pro' && ed.lines === 3 && ed.edges === 1, 'what sets her apart, with her positioning in three lines: as a professional, as an academic, and the bridge', ed);
  await p.screenshot({ path: OUT + '/what-sets-you-apart.png' });
  // 5. her documents, each looked at, never rewritten
  const docs = await p.evaluate(() => IngCareer.edgeDocs().map(d => d.id + '|' + d.name));
  const letterId = (docs.find(x => /^o:/.test(x)) || '').split('|')[0];
  await room(p, 'edge', { esel: 'd:' + letterId }); await press(p, 'Suggestions for this document'); await idle(p); await p.waitForTimeout(300);
  const dv = await p.evaluate((id) => { const a = IngCareer.state().edge.docs[id], q = window.__asked[window.__asked.length - 1]; return { tags: a ? Object.keys(a.fb).sort().join() : '', labels: [...document.querySelectorAll('#cs .c-work .c-label')].map(x => x.textContent),
    ask: { doc: /responsible for classes/.test(q.u), post: /THE POSTING/.test(q.u) && /We write manuals for outdoor gear/.test(q.u), never: /never rewrite the document/.test(q.sys) }, letterSame: null }; }, letterId);
  const letterNow = await p.evaluate(async () => { const o = IngCareer.state().opps[0]; return String(await IngBig.load(o.docs.cover.ref)); });
  ok(dv.tags === 'ADD,BLIND,CUT,NEXT,STRENGTHEN,WORDING' && dv.labels.length === 6, 'a document looked at: what could do more, what her record adds, what could go, wording, what a reader will ask, the first thing to do', dv);
  ok(dv.ask.doc && dv.ask.post && dv.ask.never && letterNow === LETTER, 'the ask carries the document and the post it is for, and says never to rewrite it; the letter is unchanged', dv.ask);
  await p.screenshot({ path: OUT + '/a-document.png' });
  const cvId = 'cv'; await room(p, 'edge', { esel: 'd:' + cvId }); await press(p, 'Suggestions for this document'); await idle(p);
  ok(await p.evaluate(() => !!IngCareer.state().edge.docs.cv && /ran thirty evening repair classes/.test(window.__asked[window.__asked.length - 1].u)), 'her CV, as Lector keeps it, is looked at the same way');
  // 6. her direction
  await room(p, 'goals', { gsel: 'paths' }); await p.waitForTimeout(300);
  const gl = await p.evaluate(() => [...document.querySelectorAll('#cs .c-list .c-item b')].map(x => x.textContent));
  ok(gl[0] === 'Your direction' && gl[1] === 'Roles and programmes that suit you', 'Goals and plan opens with Your direction, above the roles that suit her', gl);
  await press(p, 'Show me paths that fit'); await idle(p); await p.waitForTimeout(300);
  const pa = await p.evaluate(() => { const P = IngCareer.state().paths, q = window.__asked[window.__asked.length - 1]; return { n: P ? P.list.length : 0, full: P ? P.list.every(x => x.fits && x.evidence && x.gap && x.first && x.months && x.beside) : false, find: P ? P.find.length : 0,
    noFig: /give no salary or market figure/.test(q.u), wants: /Writing guides and manuals/.test(q.u), cards: document.querySelectorAll('#cs .c-work .c-entry.c-path').length }; });
  ok(pa.n === 2 && pa.full && pa.find === 2 && pa.cards === 2, 'paths that fit: why, the evidence, what is missing, this week, the next three months, beside her other goals; and what to find out before choosing', pa);
  ok(pa.noFig && pa.wants, 'the ask starts from what she is looking for, and gives no salary or market figure', pa);
  await p.screenshot({ path: OUT + '/your-direction.png' });
  await press(p, 'Make it a goal'); await p.waitForTimeout(300);
  const g = await p.evaluate(() => { const S = IngCareer.state(), g = S.goals[0]; return { text: g.text, steps: g.steps.map(s => s.text), kept: S.paths.list[0].kept }; });
  ok(/Technical writer for outdoor gear/.test(g.text) && g.steps.length === 4 && /Write to two technical writers/.test(g.steps[0]) && g.kept, 'Make it a goal makes a goal of the path, with this week\'s step and the three months\' steps', g);
  await p.evaluate(() => { const c = [...document.querySelectorAll('#cs .c-work .c-steplist input[type=checkbox]')][0]; if (c) c.click(); }); await p.waitForTimeout(200);
  ok(await p.evaluate(() => IngCareer.state().paths.find[0].done === true), 'what to find out is ticked as she finds it out');
  // 7. kept after a reload
  await p.evaluate(() => saveState()); await p.waitForTimeout(600); await p.reload(); await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 300000 }); await p.waitForTimeout(800);
  await p.evaluate(() => { const k = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Enter' && x.offsetParent); if (k) k.click(); }); await p.waitForTimeout(500);
  const kept = await p.evaluate(() => { const S = IngCareer.state(), E = S.edge || {}; return { tr: E.tr && E.tr.list.length, bl: E.bl && E.bl.list.length, ed: E.ed && Object.keys(E.ed.pos).length, docs: Object.keys(E.docs || {}).length, paths: S.paths && S.paths.list.length }; });
  ok(kept.tr === 2 && kept.bl === 3 && kept.ed === 3 && kept.docs === 2 && kept.paths === 2, 'all of it is kept after a reload', kept);
  await stand(p);
  // 8. Lector's Suggestions key: a document read and written there, handed to the studio
  await p.evaluate(async (TIDE) => { await libAddFiles([new File([TIDE], 'tide-clock.html', { type: 'text/html' })]); }, TIDE);
  await readWithLector(p);
  // built into the reading: what the app adds to her record, spotted by itself once Lector has finished
  await p.waitForFunction(() => { const E = IngCareer.state().edge || {}; return E.apps && E.apps['Tide Clock'] && !IngCareer.run.busy; }, null, { timeout: 60000 }).catch(() => {});
  const sp1 = await p.evaluate(() => { const a = (IngCareer.state().edge.apps || {})['Tide Clock'], ev = IngLector.R7.ev.filter(e => e.label === 'Skills spotted').map(e => e.text), q = window.__asked.filter(x => /SKILLFROMAPP/.test(x.u)).pop();
    return { a: a ? { version: a.version, earlier: a.earlier, list: a.list.map(x => [x.skill, !!x.evidence, !!x.suits, !!x.line, x.fresh]) } : null, ev, ask: q ? { reading: /THE READING \(of Tide Clock 2\.1\)/.test(q.u), cv: /MY CV/.test(q.u), noEarlier: !/THE EARLIER READING/.test(q.u) } : null }; });
  ok(sp1.a && sp1.a.version === '2.1' && sp1.a.list.length === 1 && sp1.a.list[0][1] && sp1.a.list[0][2] && sp1.a.list[0][3], 'when Lector has read the app, it spots by itself what the app shows that her CV and profile do not yet show: evidence, where it fits, a sentence (one with no evidence left out)', sp1);
  ok(sp1.ask && sp1.ask.reading && sp1.ask.cv && sp1.ask.noEarlier && sp1.ev.length === 1 && /Your edge/.test(sp1.ev[0]), 'the ask carries the reading and her CV; Lector says in its stream what was spotted and where it is kept', sp1);
  const key = await p.evaluate(() => { const k = document.getElementById('l7Advise'); return { here: !!k, text: k ? k.textContent : '', shown: !!(k && k.offsetParent) }; });
  ok(key.here && key.shown && key.text === 'Suggestions', 'Lector\'s document panel has a Suggestions key beside Copy', key);
  await p.evaluate(() => { const t = [...document.querySelectorAll('#l7Desk .l-dtab, #l7Tabs button, [data-doc]')].find(x => /Project dossier/.test(x.textContent)); if (t) t.click(); }); await p.waitForTimeout(500);
  await p.click('#l7Advise'); await p.waitForTimeout(500); await idle(p); await p.waitForTimeout(400);
  const lx = await p.evaluate(() => { const S = IngCareer.state(), E = S.edge, it = E.inbox[0], q = window.__asked[window.__asked.length - 1]; return { page: (document.querySelector('.section.active') || {}).id, room: S.ui.room, inbox: it ? [it.name, it.from] : null, looked: it ? !!E.docs['i:' + it.id] : false, ask: /STRENGTHEN: a part that works/.test(q.u) && /Tide Clock/.test(q.u) }; });
  ok(lx.page === 'page-career' && lx.room === 'edge' && lx.inbox && lx.inbox[1] === 'lector' && /Tide Clock/.test(lx.inbox[0]) && lx.looked && lx.ask, 'Suggestions hands the document to the Career Studio, which opens Your edge and looks at it', lx);
  await p.screenshot({ path: OUT + '/from-lector.png' });
  // an updated app: a newer copy kept and read; what is new since the earlier copy is marked
  await p.evaluate(async (TIDE2) => { await libAddFiles([new File([TIDE2], 'tide-clock.html', { type: 'text/html' })]); }, TIDE2);
  await readWithLector(p);
  await p.waitForFunction(() => { const a = ((IngCareer.state().edge || {}).apps || {})['Tide Clock']; return a && a.version === '2.2' && !IngCareer.run.busy; }, null, { timeout: 60000 }).catch(() => {});
  const sp2 = await p.evaluate(() => { const a = IngCareer.state().edge.apps['Tide Clock'], ev = IngLector.R7.ev.filter(e => e.label === 'Skills spotted').map(e => e.text), q = window.__asked.filter(x => /SKILLFROMAPP/.test(x.u)).pop();
    return { version: a.version, earlier: a.earlier, list: a.list.map(x => [x.skill, x.fresh, x.known]), ev: ev.pop() || '', ask: /THE EARLIER READING/.test(q.u) && /THE READING \(of Tide Clock 2\.2\)/.test(q.u) }; });
  ok(sp2.version === '2.2' && sp2.earlier === '2.1' && JSON.stringify(sp2.list.map(x => x[1])) === '[true,false]' && sp2.ask && /1 new since the earlier copy, 2\.1/.test(sp2.ev), 'an updated app read again: its reading is weighed beside the earlier copy\'s, and what is new since then is marked and told', sp2);
  await room(p, 'edge', { esel: 'a:Tide Clock' }); await p.waitForTimeout(400);
  const fa = await p.evaluate(() => ({ item: [...document.querySelectorAll('#cs .c-list .c-item')].map(x => x.innerText).find(x => /Tide Clock 2\.2/.test(x)) || '', newChip: [...document.querySelectorAll('#cs .c-work .c-entry .c-chip')].map(x => x.textContent) }));
  ok(/2 to add, 1 new/.test(fa.item) && fa.newChip.indexOf('New since the earlier copy') >= 0, 'Your edge lists it under From your apps, the new marked', fa);
  await p.screenshot({ path: OUT + '/from-your-apps.png' });
  // 9. the chat's + menu: her career profile with a message
  const plus = await p.evaluate(() => { go('chat'); paintPlus(); const it = document.querySelector('#chatPlusMenu .pm-career'); return { here: !!it, text: it ? it.innerText : '' }; });
  ok(plus.here && /Your career profile/.test(plus.text), 'the chat\'s + menu offers her career profile', plus);
  await p.evaluate(() => document.querySelector('#chatPlusMenu .pm-career').click()); await p.waitForTimeout(800);
  const staged = await p.evaluate(() => { const f = (window.stagedFiles || []).find(x => x.name === 'Career profile.md'); const t = f ? stagedText(f) : ''; return { here: !!f, entries: /Bicycle mechanic/.test(t), wants: /Writing guides and manuals/.test(t), goal: /A part-time master's in industrial design/.test(t), rule: /never invent/.test(t) }; });
  ok(Object.values(staged).every(Boolean), 'pressed, her profile goes with her next message: her entries, her wants, her goals and the rule never to invent', staged);
  // 10. Learn teaches it
  const lesson = await p.evaluate(() => { const L = IngCareer.lessons.find(x => x[0] === 'Finding your edge'); return L ? L[1].length : 0; });
  ok(lesson >= 6, 'Learn teaches her to find her own edge, step by step', lesson);
  ok(p.__web.length === 0, 'nothing is fetched from the internet', p.__web.slice(0, 5));
  // 11. the full edition has the room
  if (FULL) { const ctxF = await b.newContext({ viewport: { width: 1440, height: 950 } }); const f = await boot(ctxF, FULL);
    const ft = await f.evaluate(() => { go('career'); return [...document.querySelectorAll('#cs .rm-tabs [data-room]')].map(x => x.textContent.trim()); });
    ok(ft.indexOf('Your edge') === 4, 'the full edition has Your edge too', ft);
    ok(f.__errs.length === 0, 'no script errors in the full edition', f.__errs); }
  ok(p.__errs.length === 0, 'no script errors on the page', p.__errs);
  await b.close(); console.log(pass + ' passed, ' + fail + ' failed'); process.exit(fail ? 1 : 0);
})().catch(e => { console.log('FAIL the test itself: ' + e.message); console.log(pass + ' passed, ' + (fail + 1) + ' failed'); process.exit(1); });
