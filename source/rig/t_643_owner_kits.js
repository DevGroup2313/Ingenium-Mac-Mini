// node rig/t_643_owner_kits.js <out dir> master=<url> full=<url> gift=<url> demo=<url>
// Ingenium 6.43 (6 November 2026): making Ingenium itself as an app is the master edition's alone (build/editions.py,
// _no_self_kit). Her words: "Please remove the option to download Ingenium as an app from the Build page and only leave it in the
// master edition and nowhere else, I should be only person with access to it, I don't want others to be able to ship and produce
// variations of my app without my expressed consent and permission." Pages and apps here are invented. Checks, in each edition:
//   - master: the Build page's kits offer Ingenium itself (chosen first) and the app in the editor
//   - full, gift and demo: no Ingenium itself in the kits at all (not hidden: not there), the kits make a new app only, and asking
//     for Ingenium's own kit is refused
//   - full, gift and demo: Ingenium's own page put in the editor is refused by the kits; an invented app of the person's own still
//     gets its kit
//   - full: Fabrica refuses to package a repository whose page is Ingenium's own, and still packages an invented app; master:
//     Fabrica packages both (the owner may)
//   - no page errors
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs');
const [OUT, ...pairs] = process.argv.slice(2); fs.mkdirSync(OUT, { recursive: true });
const URLS = Object.fromEntries(pairs.map(x => { const i = x.indexOf('='); return [x.slice(0, i), x.slice(i + 1)]; }));
let pass = 0, fail = 0; const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (c || d === undefined ? '' : '  ' + String(typeof d === 'string' ? d : JSON.stringify(d)).slice(0, 900))); c ? pass++ : fail++; };
const INVENTED_APP = '<!doctype html><html><head><meta charset="utf-8"><title>Invented Notes</title></head><body><h1>Invented Notes</h1><p>An invented app for the test.</p></body></html>';
// a small page with the marks every Ingenium page carries (its edition's variable and the parts' register), standing in for the
// 76 MB page itself
const OWN_LIKE = '<!doctype html><html><head><meta charset="utf-8"><title>Ingenium</title></head><body><script>var ING_EDITION="master";try{(window.__ingParts=window.__ingParts||{})["p1"]="running";}catch(_){}</script><p>Ingenium</p></body></html>';
(async () => {
  const b = await pw.chromium.launch();
  for (const ed of ['master', 'full', 'gift', 'demo']) {
    const url = URLS[ed]; if (!url) { ok(false, ed + ': an address was given'); continue; }
    const p = await (await b.newContext({ viewport: { width: 1440, height: 900 } })).newPage(); const errs = []; p.on('pageerror', e => errs.push(e.message.slice(0, 200)));
    await p.goto(url); await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 300000 }); await p.waitForTimeout(1500);
    await p.evaluate(() => { const k = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Enter' && x.offsetParent); if (k) k.click(); }); await p.waitForTimeout(600);
    const r = await p.evaluate(async ({ INVENTED_APP, OWN_LIKE }) => {
      window.__saved = []; window.saveFileNative = function (n, m, bytes) { window.__saved.push({ n, size: bytes && (bytes.length || bytes.byteLength) || 0 }); return Promise.resolve(); };
      go('build'); await new Promise(r => setTimeout(r, 600));
      const self = document.querySelector('input[name="kitWhat"][value="self"]'), editor = document.querySelector('input[name="kitWhat"][value="editor"]');
      const out = { ed: ING_EDITION, selfThere: !!self, selfChecked: !!(self && self.checked), editorThere: !!editor, what: kitWhat(), html: /Ingenium itself/.test((document.getElementById('page-build') || {}).innerHTML || '') };
      const err = async (fn) => { try { await fn(); return null; } catch (e) { return String(e && e.message || e); } };
      out.ownKit = await err(() => kitPageFor({ isNew: false }));
      // the editor: an invented app gets its web kit; Ingenium's own page does not
      if (editor) { editor.checked = true; editor.dispatchEvent(new Event('change', { bubbles: true })); }
      const nm = document.getElementById('kitName'), id = document.getElementById('kitId'); if (nm) nm.value = 'Invented Notes'; if (id) id.value = 'com.example.inventednotes';
      const ce = document.getElementById('codeEditor'); ce.value = INVENTED_APP;
      out.appKit = await err(() => kitPageFor(kitIdentity()));
      const s0 = window.__saved.length; out.appMade = await kitMake('web'); out.appSaved = window.__saved.slice(s0).map(x => x.n);
      ce.value = OWN_LIKE; out.ownEditor = await err(() => kitPageFor(kitIdentity()));
      const s1 = window.__saved.length; out.ownMade = await kitMake('web'); out.ownSaved = window.__saved.length - s1; out.note = (document.getElementById('shipNote') || {}).textContent || '';
      // Fabrica, where it is
      if (window.IngRepo && window.IngShip) {
        const mk = async (name, html) => { const rp = await IngRepo.create({ name }); await IngRepo.put(rp.id, 'index.html', html); await IngRepo.commit(rp.id, 'First'); return rp.id; };
        const a = await mk('Invented Notes', INVENTED_APP), o = await mk('Ingenium copy', OWN_LIKE);
        out.fbApp = await err(() => IngShip.onePage(a, { quiet: true })); out.fbOwn = await err(() => IngShip.onePage(o, { quiet: true }));
        out.fbOwnWeb = await err(() => IngShip.webApp ? IngShip.webApp(o, {}) : Promise.resolve());
      } else out.fabrica = false;
      return out; }, { INVENTED_APP, OWN_LIKE });
    if (ed === 'master') {
      ok(r.selfThere && r.selfChecked && r.editorThere && r.what === 'self' && r.ownKit === null, 'master: the kits offer Ingenium itself, chosen first, and the app in the editor', r);
      ok(r.appKit === null && r.appMade === true && r.appSaved.length === 1, 'master: an invented app in the editor gets its kit', r.appSaved);
      ok(r.fbApp === null && r.fbOwn === null, 'master: Fabrica packages an invented app and an Ingenium page alike (the owner may)', [r.fbApp, r.fbOwn]);
    } else {
      ok(!r.selfThere && !r.html && r.editorThere && r.what === 'editor', ed + ': no Ingenium itself in the kits at all (not hidden: not there); the kits make a new app only', r);
      ok(/Only the owner's edition makes Ingenium itself/.test(r.ownKit || ''), ed + ': asking for Ingenium\'s own kit is refused', r.ownKit);
      ok(r.appKit === null && r.appMade === true && r.appSaved.length === 1, ed + ': an invented app of the person\'s own still gets its kit', r.appSaved);
      ok(/Only its owner makes apps of Ingenium/.test(r.ownEditor || '') && r.ownMade === false && r.ownSaved === 0 && /Only its owner makes apps of Ingenium/.test(r.note), ed + ': Ingenium\'s own page put in the editor gets no kit, and the page says why', [r.ownEditor, r.ownMade, r.note]);
      if (r.fabrica !== false) ok(r.fbApp === null && /Only its owner makes apps of Ingenium/.test(r.fbOwn || '') && /Only its owner makes apps of Ingenium/.test(r.fbOwnWeb || ''), ed + ': Fabrica packages an invented app and refuses Ingenium\'s own page (its page and its web app)', [r.fbApp, r.fbOwn, r.fbOwnWeb]);
    }
    ok(errs.length === 0, ed + ': no page errors', errs.join(' | '));
    await p.close();
  }
  await b.close(); console.log(pass + ' passed, ' + fail + ' failed'); process.exit(fail ? 1 : 0);
})().catch(e => { console.log('FAIL the run stopped: ' + (e && e.stack || e)); console.log(pass + ' passed, ' + (fail + 1) + ' failed'); process.exit(1); });
