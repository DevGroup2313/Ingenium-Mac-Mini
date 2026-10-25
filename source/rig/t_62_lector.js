// Ingenium 6.2 · Lector (modules/r108.js), in Chromium, with a stand-in model. The owner's words (22 October 2026): the
// choice "between a quick reading and a more deeper and thorough analysis alongside the models that would be doing the
// reading" restored; the compose text "to actually be read by Lector and actually adjust the documents"; Ask Lector "moved
// to another section on the page and be better intergrated"; "a deep and thorough analysis of every app and alll of their
// functions". It checks:
//   - How Lector reads stands at the top of the brief: Quick reading and Deep, thorough analysis, each with its parts, and
//     the model that reads and writes; choosing them changes the brief (Deep turns Every function on); the fold keeps only
//     the reasons, no second set of controls;
//   - Ask Lector is a tab beside the thinking (its own panel, the arrow keys move between the tabs), and the document panel
//     opens it; with documents written, "Every document written, and all writing from now on" is offered and chosen when no
//     single document is shown; sent, it is kept for the writing AND followed in every document already written, a section
//     at a time (a section it does not bear on stays as it was), each document's version before kept and put back in one
//     press; the words show in the conversation as they are written; with nothing written it is kept and said so;
//   - Every function: measured from an app's own code with no model: its screens, its keys and every named function, part
//     by part, with lines and the notes above them; a minified library counted, not listed; written as a document Lector
//     keeps, saves and shows, and not run through the figure check;
//   - no page errors; axe-core finds nothing in the new parts, by day and by night.
//   node rig/t_62_lector.js http://127.0.0.1:8150/ingenium.html <out folder> [axe.min.js]
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs'); const path = require('path');
const URL_ = process.argv[2], OUT = process.argv[3]; fs.mkdirSync(OUT, { recursive: true });
const AXE = [process.argv[4], process.env.AXE_JS, path.join(__dirname, 'a11y', 'axe.min.js')].find(f => f && fs.existsSync(f)) || null;
let pass = 0, fail = 0;
const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (d !== undefined ? '  ' + String(typeof d === 'string' ? d : JSON.stringify(d)).slice(0, 500) : '')); c ? pass++ : fail++; };
const shot = (p, n) => p.screenshot({ path: path.join(OUT, n + '.png') });
const DOSSIER = '# Ingenium · Project dossier\n\n## Title and summary\n**Ingenium**\n\nIngenium is a platform for writing with local models.\n\n## What it does\nIt keeps notes and drafts documents.\n\n## How it is built\nOne page of HTML that runs offline.';
const APPENDIX = '# Ingenium · Appendix\n\n## Introduction\nThe tables below are measured from the files.\n\n## A. Measures\n| Measure | Value |\n|---|---|\n| Size | 43 MB |';
// a small app of its own, for Every function: two parts of its own code, a minified library, screens and keys
const APP = '<!doctype html><html><head><title>Lumen</title></head><body>\n<section id="page-home"><h2>Home</h2><button id="goBtn" aria-label="Go somewhere">Go</button></section>\n' +
  '<section id="page-notes"><h2>Your notes</h2><button>Add a note</button></section>\n<script>\n/* LUMEN · the notes, kept and drawn */\n/* the list of notes, newest first */\nfunction noteList(){return [];}\n' +
  '// draws one note\nfunction drawNote(n){return n;}\nvar keepNote=function(n){return n;};\nconst sortNotes=(a)=>a;\nwindow.lumenOpen=function(){};\n</script>\n<script>/* LUMEN · the clock */\nfunction tick(){}\n</script>\n' +
  '<script>' + 'function aa(){}function bb(){}function libAlpha(){return 1}function libBeta(){return 2}'.repeat(40) + '</script>\n<script type="application/json" id="data">{"a":1}</script></body></html>';

(async () => {
  const b = await pw.chromium.launch({ args: ['--no-sandbox'] });
  try {
    const ctx = await b.newContext({ viewport: { width: 1600, height: 1000 } }); const p = await ctx.newPage(); const errs = [];
    p.on('pageerror', e => errs.push(e.message + ' ' + (e.stack || '').split('\n')[1]));
    await p.goto(URL_); await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 120000 }); await p.waitForTimeout(800);
    await p.evaluate(() => { const k = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Enter' && x.offsetParent); if (k) k.click(); });
    await p.evaluate(async ({ DOSSIER, APPENDIX }) => {
      state.models = (state.models || []).concat([{ id: 'm-small', name: 'Small model', customName: 'Small model', fileState: 'ready', size: 1e9, sizeBytes: 1e9, ctx: 16384 },
        { id: 'm-big', name: 'Big model', customName: 'Big model', fileState: 'ready', size: 5e9, sizeBytes: 5e9, ctx: 32768 }]);
      const L = lxState(); L.brief = { apps: ['ingenium'], purpose: 'portfolio', docs: { dossier: true, appendix: true }, depth: 'overview', fmt: 'docx', modelId: null };
      L.job = null; const key = 'ingenium|portfolio'; L.sets = L.sets || {}; L.asks = {}; L.reqs = {};
      const r1 = IngBig.newId(), r2 = IngBig.newId(); await IngBig.put(r1, DOSSIER); await IngBig.put(r2, APPENDIX);
      L.sets[key] = { apps: ['ingenium'], purpose: 'portfolio', docs: { dossier: { ref: r1, made: Date.now(), model: 'Small model', title: 'Ingenium · Project dossier', chk: { figures: 0, unmatched: [] } },
        appendix: { ref: r2, made: Date.now(), model: 'Small model', title: 'Ingenium · Appendix', chk: { figures: 0, unmatched: [] } } }, older: {} };
      window.__asked = [];
      window.lxAsk = function (run, msgs, max, temp, onPiece) {
        window.__asked.push({ run, msgs });
        const u = msgs[msgs.length - 1].content; let out = 'An answer.';
        if (/reply with the single word UNCHANGED/.test(u)) {
          // the request is about calling Ingenium a platform: only the section that says it changes
          out = /platform/.test(u.split('THE SECTION AS IT STANDS:')[1] || u.split('THE TEXT AS IT STANDS:')[1] || '') ? 'Ingenium is a private studio for writing with local models.' : 'UNCHANGED';
        }
        let i = 0; const step = () => { if (onPiece) onPiece(out.slice(0, i += 12)); };
        return new Promise(r => { const t = setInterval(step, 60); setTimeout(() => { clearInterval(t); r(out); }, 700); });
      };
      saveState(); go('lector');
    }, { DOSSIER, APPENDIX });
    await p.waitForTimeout(1800);

    // ---------------- 1 · How Lector reads ----------------
    const how = await p.evaluate(() => { const s = document.getElementById('l7How'); if (!s) return null; const bf = document.getElementById('l7Bf');
      const secs = [...bf.querySelectorAll('.l-sec > h3')].map(x => x.textContent);
      return { at: secs.indexOf('How Lector reads'), secs, radios: [...s.querySelectorAll('input[type=radio]')].map(r => r.value + ':' + r.checked), words: s.innerText,
        models: [...s.querySelectorAll('select option')].map(o => o.textContent), fold: (document.querySelector('#l7Model details') || {}).innerText || '',
        foldSel: !!document.querySelector('#l7Model details select'), foldSeg: !!document.querySelector('#l7Model details .l-seg') }; });
    ok(how && how.at === 1 && how.radios.join() === 'overview:true,thorough:false' && /Quick reading/.test(how.words) && /Deep, thorough analysis/.test(how.words),
      'How Lector reads stands right under Your apps: Quick reading (chosen) and Deep, thorough analysis', how && { at: how.at, radios: how.radios });
    ok(how && how.models.some(m => /Ingenium's choice/.test(m)) && how.models.some(m => /Small model/.test(m)) && how.models.some(m => /Big model/.test(m)), 'and the model that reads and writes, every model on this device offered', how && how.models);
    ok(how && !how.foldSel && !how.foldSeg && /Why this model|quick reading/i.test(how.fold), 'the fold keeps only the reasons: no second set of controls', how && { sel: how.foldSel, seg: how.foldSeg });
    await shot(p, 'l62-how');
    await p.check('#l7How input[value="thorough"]'); await p.waitForTimeout(500);
    await p.selectOption('#l7HowModel', 'm-big'); await p.waitForTimeout(400);
    const B = await p.evaluate(() => { const B = lxState().brief; return { depth: B.depth, model: B.modelId, functions: B.docs.functions, checked: !!document.querySelector('#l7How input[value="thorough"]:checked'), sel: document.getElementById('l7HowModel').value,
      fnRow: [...document.querySelectorAll('#l7Bf .l-doc')].some(r => /Every function/.test(r.textContent) && r.querySelector('input[type=checkbox]:checked')) }; });
    ok(B.depth === 'thorough' && B.model === 'm-big' && B.checked && B.sel === 'm-big', 'choosing Deep and the Big model changes the brief, and the brief shows them chosen', B);
    ok(B.functions === true && B.fnRow, 'and Deep turns Every function on among the documents', B);
    await p.check('#l7How input[value="overview"]'); await p.waitForTimeout(300);

    // ---------------- 2 · Ask Lector, its own tab ----------------
    const t0 = await p.evaluate(() => ({ rd: !document.getElementById('l7Rd').hidden, ask: document.getElementById('l7Ask').hidden, tabs: [...document.querySelectorAll('#l7Mid [role=tab]')].map(t => t.textContent.trim() + ':' + t.getAttribute('aria-selected')) }));
    ok(t0.rd && t0.ask && t0.tabs.length === 2 && /Thinking:true/.test(t0.tabs[0]), 'the middle panel has two tabs, Thinking (shown) and Ask Lector', t0);
    await p.focus('#l7MidRd'); await p.keyboard.press('ArrowRight'); await p.waitForTimeout(300);
    const t1 = await p.evaluate(() => ({ ask: !document.getElementById('l7Ask').hidden, rd: document.getElementById('l7Rd').hidden, focus: document.activeElement.id, intro: (document.querySelector('#l7Ask .l-cmp-intro') || {}).textContent || '' }));
    ok(t1.ask && t1.rd && t1.focus === 'l7MidAsk' && /recipe/.test(t1.intro), 'the arrow keys move to Ask Lector, which fills the panel and says what it can do', t1);
    await p.evaluate(() => { IngLector.R7.doc = 'analysis'; }); await p.evaluate(() => { try { IngLector.render(); } catch (e) {} IngLector.midTab('ask'); }); await p.waitForTimeout(600);
    const opts = await p.evaluate(() => { const s = document.querySelector('#l7Ask select'); return { o: [...s.options].map(x => x.value + ':' + x.textContent), v: s.value }; });
    ok(opts.v === 'every' && opts.o.some(x => /^every:Every document written \(2\), and all writing from now on$/.test(x)) && opts.o.some(x => /^all:Only the writing from now on$/.test(x)),
      'with documents written and none shown, it offers and chooses "Every document written, and all writing from now on"', opts);
    await shot(p, 'l62-ask-tab');
    if (AXE) { await p.addScriptTag({ path: AXE }); const v = await p.evaluate(async () => (await axe.run(document.getElementById('lx7'), { runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'] } })).violations.map(x => x.id + ':' + x.nodes.length + ' ' + x.nodes[0].target.join(' ')));
      ok(v.length === 0, 'axe-core finds nothing in Lector with the new parts, by day', v); }

    // ---------------- 3 · a request followed in every document already written ----------------
    await p.fill('#l7Ask textarea', 'Never call Ingenium a platform.');
    await p.press('#l7Ask textarea', 'Enter');
    const sawLive = await p.waitForFunction(() => { const l = document.querySelector('#l7Ask .l-cmp-m.lx.wait [data-live]'); return l && l.textContent.length > 5; }, null, { timeout: 15000 }).then(() => true, () => false);
    ok(sawLive, 'while it works, the words show in the conversation as they are written');
    await p.waitForFunction(() => /followed in the documents already written/.test((document.querySelector('#l7Ask .l-cmp-th') || {}).innerText || ''), null, { timeout: 60000 }).catch(() => {});
    const ev = await p.evaluate(async () => { const L = lxState(), S = L.sets['ingenium|portfolio'], d = await IngBig.load(S.docs.dossier.ref), a = await IngBig.load(S.docs.appendix.ref);
      const asks = window.__asked.filter(x => /UNCHANGED/.test(x.msgs[1].content));
      return { reply: document.querySelector('#l7Ask .l-cmp-th').innerText.split('\n').slice(-3).join(' | '), dossier: d, appendix: a, olderD: (S.older.dossier || []).length, olderA: (S.older.appendix || []).length,
        reqs: (L.reqs['ingenium|portfolio'] || []).map(r => r.text), sections: asks.length, sys: asks[0] && asks[0].msgs[0].content }; });
    ok(/a private studio for writing with local models/.test(ev.dossier) && !/a platform/.test(ev.dossier) && /It keeps notes and drafts documents/.test(ev.dossier),
      'the dossier is rewritten where the request bears on it, and only there', ev.dossier.slice(0, 260));
    ok(ev.appendix.indexOf('The tables below are measured') >= 0 && ev.olderA === 0 && ev.olderD === 1, 'the appendix, which the request does not touch, stays as it was; the dossier\'s version before is kept', { olderD: ev.olderD, olderA: ev.olderA });
    ok(ev.sections >= 4 && /Never call Ingenium a platform/.test(ev.sys || ''), 'each section was read with the request, and the request rides in Lector\'s instructions (kept for the writing)', { sections: ev.sections });
    ok(ev.reqs.indexOf('Never call Ingenium a platform.') >= 0 && /Kept for everything Lector writes/.test(ev.reply) && /Project dossier \(1 section changed\)/.test(ev.reply) && /Appendix \(it already followed it\)/.test(ev.reply),
      'the answer says it is kept for the writing and what changed in each document', ev.reply);
    await shot(p, 'l62-every-done');
    await p.evaluate(() => { const k = [...document.querySelectorAll('#l7Ask button')].find(x => x.textContent === 'Put back the versions before'); k.click(); }); await p.waitForTimeout(600);
    const back = await p.evaluate(async () => { const S = lxState().sets['ingenium|portfolio']; return await IngBig.load(S.docs.dossier.ref); });
    ok(/a platform for writing/.test(back), '"Put back the versions before" puts every document back in one press', back.slice(0, 160));
    // nothing written yet: kept, and said so
    await p.evaluate(async () => { const L = lxState(); L.brief.apps = ['forge']; saveState(); IngLector.render(); IngLector.midTab('ask'); }); await p.waitForTimeout(500);
    const none = await p.evaluate(() => { const s = document.querySelector('#l7Ask select'); return { o: [...s.options].map(x => x.value), v: s.value }; });
    ok(none.v === 'all' && none.o.indexOf('every') < 0, 'with nothing written for the set, a request is kept for the writing (no "every" offered)', none);
    await p.evaluate(async () => { const L = lxState(); L.brief.apps = ['ingenium']; saveState(); IngLector.render(); }); await p.waitForTimeout(300);

    // ---------------- 4 · Every function ----------------
    const at = await p.evaluate((APP) => { const A = IngLector.atlasOf('Lumen', APP); return { fns: A.fns, parts: A.parts.map(x => x.title + (x.lib ? ':lib' + x.count : ':' + x.fns.length)), screens: A.screens.map(x => x.id + '=' + x.title), keys: A.keys.map(x => x.label + (x.id ? '#' + x.id : '')),
      names: A.parts.filter(x => !x.lib).flatMap(x => x.fns.map(f => f.name + '@' + f.line + ':' + f.note)), md: IngLector.atlasMd({ apps: ['ingenium'] }, [A]) }; }, APP);
    ok(at.fns === 6 && at.names.some(x => /^noteList@\d+:the list of notes, newest first$/.test(x)) && at.names.some(x => /^drawNote@\d+:draws one note$/.test(x)) && at.names.some(x => /^keepNote@/.test(x)) && at.names.some(x => /^sortNotes@/.test(x)) && at.names.some(x => /^window\.lumenOpen@/.test(x)),
      'every named function in its own code is found, with its line and the note above it', at.names);
    ok(at.parts[0] === 'LUMEN · the notes, kept and drawn:5' && at.parts[1] === 'LUMEN · the clock:1' && /:lib\d+$/.test(at.parts[2]), 'part by part, each named by the note at its head; a minified library counted, not listed', at.parts);
    ok(at.screens.join() === 'page-home=Home,page-notes=Your notes' && at.keys.join() === 'Go somewhere#goBtn,Add a note', 'its screens with their headings, and its keys with their names', { s: at.screens, k: at.keys });
    ok(/\| `noteList` \| \d+ \| the list of notes, newest first \|/.test(at.md) && /with no model:/.test(at.md) && /Methods written inside objects and classes are not counted/.test(at.md), 'written as tables a reader can follow, saying it was measured with no model and what the count leaves out (6.7)', at.md.slice(0, 300));
    // the whole document for a set, through the page's own writing, kept and shown
    // an app the library keeps (the apps Ingenium carries are kept on first start): the real thing, measured whole
    // 6.2: the full edition carries no app; its library keeps what the person adds: Inkwell's own page is added as a person adds it
    if (!(await p.evaluate(() => !!document.getElementById('ing-builtin-inkwell')))) {
      const INK = process.env.INKWELL_HTML || '/tmp/claude-0/-home-user/61388abb-8c01-57dc-aeb9-f70a19a79e0d/scratchpad/ref/inkwell.html';
      const [fc] = await Promise.all([p.waitForEvent('filechooser'), p.evaluate(() => libPickFiles())]); await fc.setFiles(INK);
      console.log('NOTE this edition carries no app: Inkwell is added from ' + path.basename(INK) + ', as a person adds it');
    }
    await p.waitForFunction(() => { try { const a = libState().apps; return !!(a.inkwell && a.inkwell.ref); } catch (e) { return false; } }, null, { timeout: 60000 }).catch(() => {});
    const doc = await p.evaluate(async () => { const md = await IngLector.atlasDoc({ apps: ['inkwell'], runs: [], purpose: 'portfolio' }); return { len: md.length, head: md.slice(0, 120), fns: (md.match(/^\| `[^`]+` \| \d+ \|/gm) || []).length }; });
    ok(doc.len > 50000 && doc.fns > 800 && /Every function/.test(doc.head), 'for Inkwell, measured whole: ' + doc.fns + ' functions from its own page', doc);
    ok(errs.length === 0, 'no page errors along the way', errs.slice(0, 4));
    // night
    await p.evaluate(() => { document.body.setAttribute('data-theme', 'night'); try { IngLector.render(); } catch (e) {} IngLector.midTab('ask'); }); await p.waitForTimeout(500);
    await shot(p, 'l62-night');
    if (AXE) { const v = await p.evaluate(async () => (await axe.run(document.getElementById('lx7'), { runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'] } })).violations.map(x => x.id + ':' + x.nodes.length + ' ' + x.nodes[0].target.join(' ')));
      ok(v.length === 0, 'and by night', v); }
  } catch (e) { ok(false, 'crashed: ' + (e && e.stack || e)); }
  await b.close();
  console.log('\n' + pass + ' passed, ' + fail + ' failed'); process.exit(fail ? 1 : 0);
})();
