// Ingenium 6.2 · room for the Offline Project (modules/r158.js), in Chromium. The owner's words (22 and 23 October 2026): Ingenium must
// edit apps twice its own size, and the Offline Project and its demos, in Chat, Code and Build; "I want for Ingenium's capacity to
// be more than 120 MB. It needs to work smoothly, efficiently and fast with the models without crashing."
// For each app given (a page made by make_big.js: a small working app, its parts of code, and embedded data as Ingenium embeds
// its own, base64 in script blocks), in a fresh window:
//   Chat:  the app is attached as a person attaches it (the file key); the model is sent the app's code, not its data; a
//          change the model writes is made to the whole app; the changed app runs beside the chat and is saved whole;
//   Code:  the app is a project; it runs; a change is made to it and the app runs again with it; Undo puts it back;
//   Build: the app opens part by part; a part written in is part of the whole; the whole app runs (from a file of its own,
//          never as one giant attribute) and is saved whole;
//   all along: Ingenium answers (the page's own thread is never held for long), memory is let go (measured once the
//          browser has collected what nothing holds), no page errors.
//   node rig/t_62_capacity.js http://127.0.0.1:8150/ingenium.html <out folder> <app.html> [<app.html> ...]
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs'); const path = require('path');
const [URL_, OUT, ...APPS] = process.argv.slice(2); fs.mkdirSync(OUT, { recursive: true });
let pass = 0, fail = 0;
const LOG = path.join(OUT, 'results.log'); fs.writeFileSync(LOG, '');
const ok = (c, m, d) => { const line = (c ? 'PASS ' : 'FAIL ') + m + (d !== undefined ? '  ' + String(typeof d === 'string' ? d : JSON.stringify(d)).slice(0, 600) : ''); console.log(line); fs.appendFileSync(LOG, line + '\n'); c ? pass++ : fail++; };
const within = (pr, ms) => Promise.race([pr, new Promise(r => setTimeout(() => r(null), ms))]);
const MB = n => (n / 1048576).toFixed(1) + ' MB';
const sec = t => ((Date.now() - t) / 1000).toFixed(1) + ' s';

async function boot(b) {
  const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, acceptDownloads: true });
  const p = await ctx.newPage(); p.__errs = []; p.on('pageerror', e => p.__errs.push(e.message)); p.__downloads = []; p.on('download', d => p.__downloads.push(d));
  await p.goto(URL_); await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 180000 }); await p.waitForTimeout(700);
  await p.evaluate(() => { const b = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Enter' && x.offsetParent); if (b) b.click(); });
  await p.waitForTimeout(500);
  // a model that reads text: what it is sent is measured, and it answers with a change to the app's heading
  await p.evaluate(() => {
    state.models = state.models || []; if (!state.models.some(m => m.id === 'cap-test')) state.models.push({ id: 'cap-test', customName: 'Faber (test)', fileState: 'ready', sizeBytes: 1 });
    state.activeModelId = 'cap-test'; Engine.modelId = 'cap-test'; Engine.status = 'ready'; Engine.adapter = { hasImageInput: false };
    window.__sent = []; window.__reply = '';
    Engine.generate = function (o) { const u = [...o.messages].reverse().find(m => m.role === 'user'); const all = o.messages.reduce((a, m) => a + (typeof m.content === 'string' ? m.content.length : 0), 0);
      const every = o.messages.map(m => typeof m.content === 'string' ? m.content : '').join('\n');
      window.__sent.push({ at: Date.now(), userChars: u && typeof u.content === 'string' ? u.content.length : -1, allChars: all, sawHead: /id="capHead"/.test(every), sawData: /[A-Za-z0-9+\/]{20000}/.test(every) });
      try { o.onToken && o.onToken(window.__reply); } catch (e) { } return Promise.resolve(); };
  });
  return p;
}
// the page's own thread: the longest wait for an answer over a few tries
async function ping(p, n = 6) { let worst = 0; for (let i = 0; i < n; i++) { const t = Date.now(); await p.evaluate(() => 1); worst = Math.max(worst, Date.now() - t); await p.waitForTimeout(120); } return worst; }
// memory in use once the browser has let go of what nothing holds (it collects when it likes, so a reading taken without
// asking counts copies already dropped: 1.3 GB before and 0.3 GB after, at 130 MB, 25 October 2026); both are written down
const heap = async p => { const m = () => p.evaluate(() => (performance.memory ? performance.memory.usedJSHeapSize : 0)); const a = await m();
  const c = await p.context().newCDPSession(p); for (let i = 0; i < 2; i++) { await c.send('HeapProfiler.collectGarbage'); await p.waitForTimeout(800); }
  const z = await m(); console.log('NOTE memory before collecting ' + MB(a) + ', after ' + MB(z)); return z; };
const edit = (file, from, to) => `<edit file="${file}">\n<<<<<<< FIND\n<h1 id="capHead">${from}</h1>\n=======\n<h1 id="capHead">${to}</h1>\n>>>>>>> REPLACE\n</edit>\n\nThe heading now says "${to}".`;
async function frameReady(p, sel, ms = 120000, want) {
  // the frames are sandboxed (their own opaque origin): the page cannot look inside them, so the test looks through the browser
  const t0 = Date.now(); let last = null;
  while (Date.now() - t0 < ms) {
    const attr = await p.evaluate(sel => { const f = document.querySelector(sel); return f ? { src: (f.getAttribute('src') || '').slice(0, 5), srcdoc: f.hasAttribute('srcdoc') ? f.getAttribute('srcdoc').length : 0 } : null; }, sel);
    const el = await within(p.$(sel), 5000); const fr = el && await within(el.contentFrame(), 5000);
    let inner = null; try { inner = fr && await within(fr.evaluate(() => ({ ready: !!window.__capReady, head: document.getElementById('capHead') ? document.getElementById('capHead').textContent : '' })), 5000); } catch (e) { }
    last = Object.assign({ ready: false, head: '' }, attr || {}, inner || {});
    if (last.ready && (!want || last.head === want)) return last; await p.waitForTimeout(300);
  }
  return last;
}
async function saved(p, n0, ms = 180000) { const t0 = Date.now(); while (p.__downloads.length <= n0 && Date.now() - t0 < ms) await p.waitForTimeout(250);
  const d = p.__downloads[n0]; if (!d) return null; const f = path.join(OUT, 'saved-' + Date.now() + '-' + d.suggestedFilename()); await d.saveAs(f); return f; }
const has = (f, s) => { const fd = fs.openSync(f, 'r'), st = fs.statSync(f).size, n = Math.min(st, 4096); const b = Buffer.alloc(n); fs.readSync(fd, b, 0, n, 0); fs.closeSync(fd); return b.toString('utf8').includes(s); };

(async () => {
  const b = await pw.chromium.launch({ args: ['--no-sandbox', '--enable-precise-memory-info', '--js-flags=--max-old-space-size=8192'] });
  for (const APP of APPS) {
    const name = path.basename(APP), size = fs.statSync(APP).size, rel = '/' + path.relative(path.join(path.dirname(APP), '..'), APP).split(path.sep).join('/');
    const tag = name + ' (' + MB(size) + ')';
    // ---------------- Chat ----------------
    let p = await boot(b);
    try {
      ok(await p.evaluate(s => CHAT_FILE_MAX_MB * 1048576 >= s * 1.5, size), tag + ': Chat takes a file this size and half again', await p.evaluate(() => CHAT_FILE_MAX_MB + ' MB'));
      await p.evaluate(() => go('chat')); await p.waitForTimeout(300);
      let t0 = Date.now();
      await p.setInputFiles('#chatAnyFile', APP);
      await p.waitForFunction(() => (window.stagedFiles || []).length > 0, null, { timeout: 300000 }).catch(() => { });
      const st = await p.evaluate(() => { const f = stagedFiles[0]; return f ? { name: f.name, page: !!f.page, pageChars: f.pageChars, chars: f.chars, media: f.media || null, cut: f.cut } : null; });
      const attachT = sec(t0), pg1 = await ping(p);
      ok(st && st.page && st.pageChars === size && !st.cut, tag + ': attached whole in ' + attachT + ', Ingenium answering within ' + pg1 + ' ms', st);
      ok(st && st.chars < 2 * 1048576 && st.media && st.media.n >= 10, tag + ': what the model reads is the app\'s code (' + (st ? MB(st.chars) : '?') + '), its embedded data named and left out', st && st.media);
      await p.evaluate(r => { window.__reply = r; }, edit(name, 'The Offline Project, master', 'Hello from Ingenium'));
      t0 = Date.now();
      await p.fill('#chatInput', 'Change the heading to say Hello from Ingenium'); await p.evaluate(() => sendChat());
      await p.waitForFunction(() => window.__sent.length > 0, null, { timeout: 300000 }).catch(() => { });
      const sent = await p.evaluate(() => window.__sent[0] || null); const prepT = sec(t0);
      ok(sent && sent.sawHead && !sent.sawData && sent.allChars < 3 * 1048576, tag + ': the model is sent the app\'s code in ' + prepT + ' (' + (sent ? MB(sent.allChars) : '?') + ' in all), never its data', sent);
      await p.waitForFunction(() => { const ms = curMsgs(), m = ms[ms.length - 1]; return m && m.role === 'bot' && m.edits && m.edits.length; }, null, { timeout: 300000 }).catch(() => { });
      const ed = await p.evaluate(() => { const ms = curMsgs(), m = ms[ms.length - 1]; const e = m.edits && m.edits[0]; return e ? { ok: e.ok, bad: e.bad.length, chars: e.chars, ref: !!e.ref } : null; });
      ok(ed && ed.ok === 1 && !ed.bad && ed.ref && Math.abs(ed.chars - size) < 100, tag + ': the change is made to the whole app in ' + sec(t0), ed);
      t0 = Date.now();
      await p.evaluate(() => { const ms = curMsgs(), m = ms[ms.length - 1]; edOpen(m.edits[0]); }); await p.waitForTimeout(800);
      await p.evaluate(() => { const y = [...document.querySelectorAll('#modalBox .btn')].find(b => /Run it here/.test(b.textContent)); if (y) y.click(); });
      const fr = await frameReady(p, '#csFrame', 120000, 'Hello from Ingenium');
      const pg2 = await ping(p);
      ok(fr && fr.ready && fr.head === 'Hello from Ingenium' && fr.src === 'blob:' && !fr.srcdoc, tag + ': the changed app runs beside the chat in ' + sec(t0) + ', from a file of its own; Ingenium answering within ' + pg2 + ' ms', fr);
      const n0 = p.__downloads.length; t0 = Date.now();
      await p.evaluate(() => { const ms = curMsgs(), m = ms[ms.length - 1]; edSave(m.edits[0]); });
      await p.waitForTimeout(600); await p.evaluate(() => { const k = [...document.querySelectorAll('.dl-menu button, #modalBox button, .ing-dl button')].find(b => /HTML|\.html|Save/i.test(b.textContent)); if (k) k.click(); });
      const sv = await saved(p, n0);
      ok(sv && Math.abs(fs.statSync(sv).size - size) < 100 && has(sv, 'Hello from Ingenium'), tag + ': saved whole with the change in ' + sec(t0), sv ? MB(fs.statSync(sv).size) : 'nothing saved');
      if (sv) fs.unlinkSync(sv);
      const hp = await heap(p);
      ok(hp < size * 4 + 400 * 1048576, tag + ': memory in use after all that: ' + MB(hp) + ' (the app is ' + MB(size) + ')', MB(hp));
      ok(!p.__errs.length, tag + ': Chat, no page errors', p.__errs.slice(0, 4));
    } catch (e) { ok(false, tag + ': Chat crashed', e.stack); }
    await p.context().close();

    // ---------------- Code ----------------
    p = await boot(b);
    try {
      let t0 = Date.now();
      const made = await p.evaluate(async ({ rel, name }) => { const t = await (await fetch(rel)).text(); const pr = await ccMakeProject('Offline Master', [{ name, text: t }], name); go('code'); ccNewSession(pr); return { id: pr.id, n: t.length }; }, { rel, name });
      const fr = await frameReady(p, '#csFrame');
      ok(made.n === size && fr && fr.ready && fr.src === 'blob:' && !fr.srcdoc, tag + ': Code: the app is a project and runs in ' + sec(t0) + ', from a file of its own', fr);
      await p.evaluate(r => { window.__reply = r; window.__sent = []; }, edit(name, 'The Offline Project, master', 'Changed in Code'));
      t0 = Date.now();
      await p.fill('#chatInput', 'Change the heading to say Changed in Code'); await p.evaluate(() => sendChat());
      await p.waitForFunction(() => { const pr = ccProj(); return pr && (pr.versions || []).length > 0; }, null, { timeout: 300000 }).catch(() => { });
      const sent = await p.evaluate(() => window.__sent[0] || null);
      ok(sent && sent.sawHead && !sent.sawData && sent.allChars < 3 * 1048576, tag + ': Code: the model is sent the app\'s code (' + (sent ? MB(sent.allChars) : '?') + '), never its data', sent);
      await p.waitForTimeout(1500);
      const fr2 = await frameReady(p, '#csFrame', 120000, 'Changed in Code');
      const v = await p.evaluate(() => { const pr = ccProj(), f = ccMain(pr); return { versions: pr.versions.length, size: f.size }; });
      ok(v.versions === 1 && Math.abs(v.size - size) < 100 && fr2 && fr2.ready && fr2.head === 'Changed in Code', tag + ': Code: the change is made and the app runs again with it, in ' + sec(t0), [v, fr2]);
      t0 = Date.now(); await p.evaluate(() => ccUndo()); await p.waitForTimeout(1500);
      const fr3 = await frameReady(p, '#csFrame', 120000, 'The Offline Project, master');
      ok(fr3 && fr3.ready && fr3.head === 'The Offline Project, master', tag + ': Code: Undo puts it back in ' + sec(t0), fr3);
      const pg = await ping(p), hp = await heap(p);
      ok(pg < 1500, tag + ': Code: Ingenium answering within ' + pg + ' ms; memory ' + MB(hp), pg);
      ok(!p.__errs.length, tag + ': Code, no page errors', p.__errs.slice(0, 4));
    } catch (e) { ok(false, tag + ': Code crashed', e.stack); }
    await p.context().close();

    // ---------------- Build ----------------
    p = await boot(b);
    try {
      let t0 = Date.now();
      await p.evaluate(async ({ rel, name }) => { const t = await (await fetch(rel)).text(); go('build'); IngBuild.open({ name, text: t, title: 'The Offline Project, master' }); }, { rel, name });
      await p.waitForTimeout(1500);
      const bd = await p.evaluate(() => ({ large: IngBuild.large(), parts: (IngBuild.parts() || []).length, data: (IngBuild.parts() || []).filter(x => x.kind === 'data').length, whole: IngBuild.text().length }));
      ok(bd.large && bd.parts >= 5 && bd.data >= 10 && bd.whole === size, tag + ': Build: open part by part in ' + sec(t0), bd);
      await p.evaluate(() => { const i = IngBuild.parts().findIndex(x => /capHead/.test(x.text) && x.kind !== 'data'); const b = document.querySelectorAll('#bdParts .bd-part')[i]; if (b) b.click(); });
      await p.waitForTimeout(400);
      await p.evaluate(() => { const ta = document.getElementById('bdText'); ta.value = ta.value.replace('The Offline Project, master', 'Changed in Build'); ta.dispatchEvent(new Event('input')); });
      await p.waitForTimeout(400);
      t0 = Date.now();
      await p.evaluate(() => [...document.querySelectorAll('#bdBox .btn')].find(b => b.textContent === 'Run the whole app').click());
      const fr = await frameReady(p, '#previewFrame', 120000, 'Changed in Build');
      const pg = await ping(p);
      ok(fr && fr.ready && fr.head === 'Changed in Build' && fr.src === 'blob:' && !fr.srcdoc, tag + ': Build: the whole app runs with the change in ' + sec(t0) + ', from a file of its own; Ingenium answering within ' + pg + ' ms', fr);
      const n0 = p.__downloads.length; t0 = Date.now();
      await p.evaluate(() => [...document.querySelectorAll('#bdBox .btn')].find(b => b.textContent === 'Save the page').click());
      const sv = await saved(p, n0);
      ok(sv && Math.abs(fs.statSync(sv).size - size) < 100 && has(sv, 'Changed in Build'), tag + ': Build: saved whole with the change in ' + sec(t0), sv ? MB(fs.statSync(sv).size) : 'nothing saved');
      if (sv) fs.unlinkSync(sv);
      ok(!p.__errs.length, tag + ': Build, no page errors', p.__errs.slice(0, 4));
    } catch (e) { ok(false, tag + ': Build crashed', e.stack); }
    await p.context().close();
  }
  await b.close();
  console.log(`\n${pass} passed, ${fail} failed`); process.exit(fail ? 1 : 0);
})();
