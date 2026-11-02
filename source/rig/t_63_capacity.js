// Ingenium 6.3 · room for more (modules/r165.js and the parts it names), in Chromium. Checks, each at the new size:
//   - the limits as set: Fabrica's (480 MB in place; 96, 64, 48, 32, 64 MB and 20,000 files), Chat's (480 MB a file, 8 million
//     characters a project's file), a personal AI's (48 examples, 30 files, 600 lessons, 8 a conversation);
//   - writing: a remembered item of 3,000 characters is kept whole, typed or added; a parked thought of 3,000 characters too;
//     About you and the rules every answer follows hold ten times as much; a name keeps its own limit;
//   - the memory: a model on the computer trained for 1,048,576 tokens may be given all of it; one trained for 262,144, that;
//     a reply may run to 131,072;
//   - the stage beside the chat: Edit in Build takes a page of 4 MB (it refused anything over 3 MB), part by part;
//   - Fabrica: a change to a 40 MB file is shown line by line (8 MB was the limit);
//   - no page errors.
//   node rig/t_63_capacity.js <url of Ingenium> <out folder>
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs'); const path = require('path');
const [URL_, OUT] = process.argv.slice(2); fs.mkdirSync(OUT, { recursive: true });
let pass = 0, fail = 0;
const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (d !== undefined ? '  ' + String(typeof d === 'string' ? d : JSON.stringify(d)).slice(0, 600) : '')); c ? pass++ : fail++; };

(async () => {
  const b = await pw.chromium.launch({ args: ['--no-sandbox'] }); const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } });
  const p = await ctx.newPage(); const errs = []; p.on('pageerror', e => errs.push(e.message));
  try {
    await p.goto(URL_); await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 180000 }); await p.waitForTimeout(800);
    await p.evaluate(() => { const k = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Enter' && x.offsetParent); if (k) k.click(); });
    const L = await p.evaluate(() => ({ fab: window.ingFabMB, edit: window.ingEditMaxMB, chat: CHAT_FILE_MAX_MB, fileChars: FILE_MAX_CHARS, ai: [AI_MAX_EXAMPLES, AI_MAX_FILES, AI_MAX_LESSONS, AI_LESSONS_PER_CHAT] }));
    ok(L.edit === 480 && L.fab.diff === 96 && L.fab.compare === 64 && L.fab.history === 48 && L.fab.blame === 32 && L.fab.search === 64 && L.fab.files === 20000 && L.fab.inline === 128 && L.fab.text === 480,
      'Fabrica\'s limits: 480 MB in place; 96, 64, 48, 32 and 64 MB line by line, history, Blame and search; 20,000 files', L.fab);
    ok(L.chat === 480 && L.fileChars === 8000000 && L.ai.join() === '48,30,600,8', 'Chat: 480 MB a file, 8 million characters a project\'s file; a personal AI: 48 examples, 30 files, 600 lessons, 8 a conversation', L);
    // writing
    const W = await p.evaluate(() => {
      const long = n => ('The archive of the abbey holds letters in Latin and French, and each one says more. ').repeat(Math.ceil(n / 84)).slice(0, n);
      const t1 = long(2999) + 'x'; const a = memAdd(t1, 'typed'); const typedOk = a && a.text.length === 3000;
      const t2 = long(3000) + ' parked'; parkAdd(t2); const parkedOk = state.parked[0].t === t2;
      return { typedOk, parkedOk };
    });
    await p.evaluate(() => go('settings')); await p.waitForTimeout(600);
    const F = await p.evaluate(() => { const g = id => { const e = document.getElementById(id); return e ? e.maxLength : null; }; return { about: g('psAbout'), custom: g('psCustom'), name: g('psName'), park: g('fxParkIn'), mem: g('memNew') }; });
    ok(W.typedOk && W.parkedOk && F.about === 12000 && F.custom === 15000 && F.name === 60, 'writing: a remembered item and a parked thought of 3,000 characters kept whole; About you and the rules hold ten times as much; a name keeps its own limit', { W, F });
    // the memory and the replies
    const M = await p.evaluate(() => { const mk = (c) => ({ id: 'x' + c, ctxLen: c, shellStored: true }); return { big: ingCtxMax(mk(1048576)), mid: ingCtxMax(mk(262144)), none: ingCtxMax({ id: 'y', shellStored: true }), reply: ingReplyMax(mk(1048576)) }; });
    ok(M.big === 1048576 && M.mid === 262144 && M.none === 262144 && M.reply === 131072, 'the memory: a model trained for 1,048,576 tokens may be given all of it; one for 262,144, that; a reply up to 131,072', M);
    // the stage: Edit in Build, 4 MB
    await p.evaluate(() => go('chat')); await p.waitForTimeout(400);
    const st = await p.evaluate(async () => { const big = '<!doctype html><title>Four</title><h1>Four</h1><script>\n' + 'var x = 1;\n'.repeat(Math.ceil(4 * 1048576 / 11)) + '</script>';
      csShow({ kind: 'file', html: big, name: 'four.html' }, { user: true }); await new Promise(r => setTimeout(r, 800));
      const it = document.getElementById('csEdit'); if (it) it.click(); else return { noKey: true };
      await new Promise(r => setTimeout(r, 1500)); return { large: document.getElementById('buildGrid').classList.contains('bd-large'), parts: document.querySelectorAll('#bdParts > *').length, len: IngBuild.text().length === big.length }; });
    ok(st.large && st.parts >= 2 && st.len, 'the stage\'s Edit in Build takes a page of 4 MB (it refused anything over 3 MB), part by part', st);
    // Fabrica at the new sizes
    const fab = await p.evaluate(async () => {
      const r = await IngRepo.create({ name: 'Room' }); const line = 'let value = 1; // a line\n';
      const forty = 'const head = 1;\n' + line.repeat(Math.ceil(40 * 1048576 / line.length));
      await IngRepo.put(r.id, 'big.js', forty); await IngRepo.commit(r.id, 'First');
      await IngRepo.put(r.id, 'big.js', forty.replace('const head = 1;', 'const head = 2;\nconst needle = "found it";'));
      const d = await IngRepo.diff(r.id, { from: 'HEAD', to: 'work', context: 3, limit: 2 * ingFabMB.compare * 1048576 });
      const f = d.filter(x => x.path === 'big.js')[0];
      return { id: r.id, hunks: f ? f.hunks.length : -1, adds: f ? f.adds : -1 }; });
    ok(fab.hunks >= 1 && fab.adds === 2, 'Fabrica: a change to a 40 MB file is shown line by line (8 MB was the limit): one line changed, one added', fab);
    ok(!errs.length, 'no page errors', errs.slice(0, 4));
  } catch (e) { ok(false, 'the run crashed', e.stack); }
  await b.close();
  console.log(`\n${pass} passed, ${fail} failed`); process.exit(fail ? 1 : 0);
})();
