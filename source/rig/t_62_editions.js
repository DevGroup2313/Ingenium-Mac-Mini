// Ingenium 6.2 · the four editions (build/editions.py, ING_EDITION), in Chromium. The owner's words (2026): "I want the demo
// version of Ingenium on the Offline Project to have the Lector page removed. It should never be on anything public facing and I
// want a master version of Ingenium and another full version that does not have all of my apps and my personal info built in.
// I want a gift version that does not feature Carpe Diem, The Forge, Ingenium's own app and Inkwell. I want it to be a blank
// slate for a new user being gifted the app."
// For each edition given, what the person sees and what the page holds:
//   - it opens and every page of it opens, with no page errors;
//   - its name; the apps carried inside (Carpe Diem, The Forge, Inkwell): the master edition only; the app library: the
//     master and full editions (the full one's starts empty);
//   - Ingenium of its own (in Code's and Build's list of apps, and as an install package): master and full only;
//   - the owner's name: in the owner's copyright line in every edition, and nowhere else but the master (Lector's author, a
//     commit's author, the signing certificate a device makes, which names the person's own name instead); the owner's app ids
//     and account: the master only; Lector's recipe: the master only; Lector writes "the author", not "her", outside the master;
//   - Home's plaque: the Offline Project's crest of four apps, or Ingenium's own seal in the gift and demo editions;
//   - Lector: its key, its page and its code in every edition but the demo; in the demo none of it, and its address goes Home;
//     no word of it left on any page the demo shows.
//   node rig/t_62_editions.js <out folder> master=<url> full=<url> gift=<url> demo=<url>
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs'); const path = require('path');
const [OUT, ...PAIRS] = process.argv.slice(2); fs.mkdirSync(OUT, { recursive: true });
const EDS = PAIRS.map(x => { const i = x.indexOf('='); return { ed: x.slice(0, i), url: x.slice(i + 1) }; });
let pass = 0, fail = 0;
const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (d !== undefined ? '  ' + String(typeof d === 'string' ? d : JSON.stringify(d)).slice(0, 500) : '')); c ? pass++ : fail++; };

(async () => {
  const b = await pw.chromium.launch({ args: ['--no-sandbox'] });
  for (const { ed, url } of EDS) {
    // Ingenium of its own: the master's; in the full edition only by a permission that allows it (rig/t_62_permits.js)
    const master = ed === 'master', ownSelf = master, libHere = ed === 'master' || ed === 'full', lector = libHere, blank = ed === 'gift';
    const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } }); const p = await ctx.newPage(); const errs = [];
    p.on('pageerror', e => errs.push(e.message)); p.on('console', m => { if (m.type() === 'error' && !/favicon|net::ERR|Failed to load resource/.test(m.text())) errs.push('console: ' + m.text()); });
    try {
      await p.goto(url); await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 180000 }); await p.waitForTimeout(1500);
      await p.evaluate(() => { const k = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Enter' && x.offsetParent); if (k) k.click(); }); await p.waitForTimeout(800);
      const src = await p.evaluate(() => document.documentElement.outerHTML);
      const f = await p.evaluate(() => ({
        edition: ING_EDITION, lib: libOn(), carried: ['cd', 'forge', 'inkwell'].filter(k => document.getElementById('ing-builtin-' + k)),
        apps: (window.IngApps ? IngApps.list() : []).map(a => a.key), kitSelf: (k => !!(k && !k.closest('label').hidden))(document.querySelector('input[name="kitWhat"][value="self"]')), kitWhat: kitWhat(),
        kitPh: (document.getElementById('kitId') || {}).placeholder || '', recipe: typeof window.IngRecipe, author: IngRepo.author().name,
        lectorKey: !!document.querySelector('.nav-btn[data-page="lector"]'), lectorPage: !!document.getElementById('page-lector'), lectorCode: typeof window.lxRender,
        pages: PAGES.slice()
      }));
      ok(f.edition === ed, ed + ': it opens, and names its edition', f.edition);
      ok(f.lib === libHere && (master ? f.carried.length === 3 : f.carried.length === 0), ed + ': the app library ' + (libHere ? 'here' : 'none') + '; the apps carried inside: ' + (master ? 'here' : 'none'), [f.lib, f.carried]);
      ok(f.apps.includes('ingenium-self') === ownSelf && !f.apps.includes('ingenium') && f.kitSelf === ownSelf && (ownSelf || f.kitWhat === 'editor'), ed + ': Ingenium of its own to open and to package: ' + (ownSelf ? 'yes' : ed === 'full' ? 'only by a permission (none here)' : 'no, a new app only'), f);
      // the owner's name, account and app ids
      // the owner's name in the credit lines (the page's head, the door, the foot) and, in the master and full editions, in a note in the code
      const names = (src.match(/Yannie D\. Forest/g) || []).length, credit = (src.match(/Designed and built by Yannie D\. Forest/g) || []).length;
      // (and, since R162, in the licence the page carries whole and in its card: "original work of", the owner's name for the card)
      const lines = (src.match(/(?:(?:Copyright \(c\) 2026|Designed and built by|(?:&copy;|©) 2026|original work of) |OWNER=")Yannie D\. Forest/g) || []).length, other = names - lines;
      const ids = (src.match(/com\.yannie/g) || []).length, acct = (src.match(/DevGroup2313/g) || []).length;
      ok(credit === 2 && lines >= 8 && (master ? other >= 4 : lector ? other === 1 : other === 0) && (master ? ids > 0 && acct > 0 : ids === 0 && acct === 0) && (master ? /^com\.yannieforest\./.test(f.kitPh) : /^app\.ingenium\./.test(f.kitPh)),
        ed + ': the owner\'s copyright line kept; the owner\'s name ' + (master ? 'where the master has it' : 'nowhere else') + ', the owner\'s app ids and account ' + (master ? 'kept' : 'gone'), { names, lines, other, ids, acct, ph: f.kitPh });
      ok((f.recipe === 'object') === master && (master ? f.author === 'Yannie D. Forest' : f.author === ''), ed + ': Lector\'s recipe ' + (master ? 'kept' : 'not in the page') + '; a commit\'s author ' + (master ? 'the owner' : 'unset until the person sets one'), [f.recipe, f.author]);
      // the signing certificate a device makes
      await p.evaluate(() => { state.persona = Object.assign({}, state.persona || {}, { name: 'Ada Example' }); });
      const cert = await p.evaluate(async () => { const k = await IngApk.core.makeKeyPair('Test'); const parts = IngApk.core.certParts(k.cert); return new TextDecoder('latin1').decode(parts.issuer); });
      ok(master ? /Yannie D\. Forest/.test(cert) : (/Ada Example/.test(cert) && !/Yannie/.test(cert)), ed + ': a signing key made on the device names ' + (master ? 'the owner' : 'the person\'s own name'), cert.replace(/[^\x20-\x7e]/g, '.'));
      ok(lector ? (master ? /HER CV/.test(src) : !/HER CV|first person as her|her résumé/.test(src) && /THE AUTHOR'S CV/.test(src)) : !/HER CV|THE AUTHOR'S CV|You are Lector/.test(src),
        ed + ': Lector writes for ' + (master ? 'the owner' : lector ? '"the author"' : 'no one: none of its instructions are in the page'));
      // Home's plaque
      await p.evaluate(() => go('home')); await p.waitForTimeout(600); await p.evaluate(() => { try { IngHome.drawCrest(); } catch (e) { } }); await p.waitForTimeout(800);
      const crest = await p.evaluate(() => { const e = document.querySelector('#hxCrest .ing-crest'); return e ? (e.getAttribute('data-ic-auto') || '') + ' | ' + (e.getAttribute('aria-label') || '') : null; });
      ok(crest && (blank ? /^ingenium \|/.test(crest) && !/Carpe Diem|Forge|Inkwell/.test(crest) : /^cd\+forge\+ingenium\+inkwell \|/.test(crest)), ed + ': Home\'s plaque shows ' + (blank ? 'Ingenium\'s own seal' : 'the Offline Project\'s crest'), crest);
      // Lector
      ok(f.lectorKey === lector && f.lectorPage === lector && (f.lectorCode === 'function') === lector && f.pages.includes('lector') === lector, ed + ': Lector\'s key, page and code: ' + (lector ? 'here' : 'none of them'), f);
      if (!lector) {
        const to = await p.evaluate(() => { go('lector'); const s = document.querySelector('section.section.active'); return s && s.id; });
        ok(to === 'page-home', ed + ': Lector\'s address goes Home', to);
      }
      // every page opens; what each shows
      const seen = {};
      for (const pg of f.pages) {
        await p.evaluate(pg => go(pg), pg); await p.waitForTimeout(pg === 'tabula' || pg === 'abacus' ? 2500 : 700);
        // Tabula and Abacus open on the Desk, in a frame of their own
        const r = await p.evaluate(pg => { const s = document.getElementById('page-' + pg); const desk = [...document.querySelectorAll('iframe')].some(f => f.offsetWidth > 300 && f.title.toLowerCase() === pg);
          return { on: !!(s && s.classList.contains('active')) || desk, text: document.body.innerText }; }, pg);
        seen[pg] = r;
      }
      const shut = Object.entries(seen).filter(([k, v]) => !v.on && k !== 'fabrica').map(([k]) => k);
      ok(!shut.length, ed + ': every page opens (' + f.pages.length + ')', shut);
      if (!lector) {
        const said = Object.entries(seen).filter(([k, v]) => /Lector/.test(v.text)).map(([k, v]) => k + ': ' + v.text.split('\n').filter(l => /Lector/.test(l)).slice(0, 3).join(' | '));
        ok(!said.length, ed + ': no word of Lector on any page it shows', said);
      }
      const apps = Object.entries(seen).map(([k, v]) => [k, v.text.split('\n').filter(l => /Carpe Diem|The Forge|Inkwell/.test(l)).slice(0, 4)]).filter(x => x[1].length);
      fs.writeFileSync(path.join(OUT, ed + '-apps-named.json'), JSON.stringify(apps, null, 1));
      if (blank) ok(!apps.length, ed + ': Carpe Diem, The Forge and Inkwell named on no page it shows', apps);
      // the tour's cards and the help beside each page, as the page holds them once every part has run
      const tourText = await p.evaluate(() => JSON.stringify([window.ING_TOUR || [], window.ING_TOUR_TEASERS || {}, window.ING_TOUR_CLOSERS || {}].map(x => Array.isArray(x) ? x.map(c => [c.chap, c.sub, c.t, c.b, c.tip]) : x)));
      const tourBad = (tourText.match(lector ? /$^/g : /Lector/g) || []).length + (blank ? (tourText.match(/Carpe Diem|The Forge|Inkwell/g) || []).length : 0);
      ok(tourText.length > 2000 && tourBad === 0, ed + ': the tour ' + (lector ? 'is whole' : 'names no Lector') + (blank ? ', and none of the owner\'s other apps' : ''), { chars: tourText.length, bad: tourBad, at: (tourText.match(/.{60}(Lector|Carpe Diem|The Forge|Inkwell).{40}/) || [''])[0] });
      // Storage cleans what nothing names, in every edition, and keeps what something does (a chat's file; Lector's records
      // read back from a master backup, in an edition without Lector)
      const cl = await p.evaluate(async () => {
        const oldId = (d, tag) => 'big_' + (Date.now() - d * 86400000).toString(36) + (tag + 'zzzzzz').slice(0, 6);
        const keep = oldId(2, 'ekeep'), lxk = oldId(2, 'elxdoc'), orph = [oldId(3, 'eorph1'), oldId(4, 'eorph2')], young = IngBig.newId();
        await IngBig.put(keep, 'named by a chat ' + 'x'.repeat(2000)); await IngBig.put(lxk, 'named by a Lector record ' + 'z'.repeat(2000));
        for (const id of orph) await IngBig.put(id, 'nothing names this ' + 'y'.repeat(3000)); await IngBig.put(young, 'made a moment ago');
        state.chats = state.chats || []; state.chats.push({ id: 'chat_ed', title: 'Editions cleaning', created: Date.now(), updated: Date.now(), messages: [{ role: 'me', text: 'See the file', attachRef: keep, attachChars: 2000 }] });
        state.lector = state.lector || {}; state.lector.sets = Object.assign(state.lector.sets || {}, { ed: { docs: { brief: { ref: lxk } } } }); saveState();
        const pl = await IngStore.plan(), ids = pl.items.map(x => x.ref || x.key || x.id);
        await IngStore.clean(pl, 'editions test');
        const left = await Promise.all([keep, lxk, young].concat(orph).map(async id => (await IngBig.load(id)) != null));
        return { planned: orph.every(x => ids.includes(x)) && ![keep, lxk, young].some(x => ids.includes(x)), kept: left.slice(0, 3).every(Boolean), gone: left.slice(3).every(x => !x), items: pl.items.length };
      });
      ok(cl.planned && cl.kept && cl.gone, ed + ': Storage cleans the stored texts nothing names, and keeps those a chat or a record names and a new one', cl);
      // the chat's documents are still made in every edition: Word, Markdown, a web page (the part of Lector's code that stays)
      const doc = await p.evaluate(async () => {
        const got = []; const o = window.saveFileNative; window.saveFileNative = function (name, mime, data) { got.push({ name, mime, data }); return Promise.resolve(); };
        const d = { title: 'Garden notes', md: '# Garden notes\n\nTomatoes on **Tuesday** at 7.\n\n- the beds\n- the paths\n\n| Bed | Crop |\n|---|---|\n| 1 | Beans |' };
        try { await mkSaveWord(d); await mkSaveMd(d); } catch (e) { got.push({ err: String(e) }); } finally { window.saveFileNative = o; }
        const out = got.map(g => { if (g.err) return g; let u8 = g.data instanceof Uint8Array ? g.data : null; const txt = typeof g.data === 'string' ? g.data : '';
          return { name: g.name, mime: g.mime, pk: !!(u8 && u8[0] === 0x50 && u8[1] === 0x4b), bytes: u8 ? u8.length : txt.length, tuesday: u8 ? new TextDecoder('latin1').decode(u8).includes('Tuesday') : txt.includes('Tuesday') }; });
        const html = typeof lxHtml === 'function' ? lxHtml(d.md) : '';
        return { out, html: /<h[12][^>]*>Garden notes<\/h[12]>/.test(html) && /<strong>Tuesday<\/strong>|<b>Tuesday<\/b>/.test(html) && /<table/.test(html) };
      });
      ok(doc.out.length === 2 && doc.out[0].name === 'Garden notes.docx' && doc.out[0].pk && doc.out[0].bytes > 2000 && doc.out[1].name === 'Garden notes.md' && doc.out[1].tuesday && doc.html,
        ed + ': the chat\'s documents are made: a Word file, Markdown and a web page', doc);
      ok(!errs.length, ed + ': no page errors', errs.slice(0, 5));
    } catch (e) { ok(false, ed + ': the run crashed', e.stack); }
    await ctx.close();
  }
  await b.close();
  console.log(`\n${pass} passed, ${fail} failed`); process.exit(fail ? 1 : 0);
})();
