// The editions, as she set them out (Ingenium 6.27; build/editions.py, modules/r231.js). Her words (5 November 2026): "The Ingenium
// edition that will be made available to the public and participants and even friends and family will only have the Home, Chat, Code,
// Folders, Focus, Models, Blend, Build, No apps, and the Guide and Settings page without the Author Studio and its functions. The Lector,
// Career and Fabrica page as well as the Author Studio and the rename Ingenium and Author key function are only reserved for my master
// edition and the "Full" edition with some limitations such (no renaming Ingenium, and no Author Studio as well as no Author key
// generation. The Full edition will be a gift to my partner so it will contain the apps and the Lector page, the Career Studio and
// Fabrica but it will not have any of the apps from the Offline Project built in and it will not have their skills and information or
// any of my profile information".
//   node rig/t_627_editions.js <out folder> master=<url> full=<url> gift=<url> demo=<url>   (any of them)
//   SURVEY=1 lists what each edition shows without judging it
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs');
const [OUT, ...pairs] = process.argv.slice(2); fs.mkdirSync(OUT, { recursive: true });
const URLS = Object.fromEntries(pairs.map(s => s.split(/=(.*)/s).slice(0, 2)));
let pass = 0, fail = 0; const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (c || d === undefined ? '' : '  ' + String(typeof d === 'string' ? d : JSON.stringify(d)).slice(0, 1800))); c ? pass++ : fail++; };
const PUBLIC_PAGES = ['home', 'chat', 'code', 'folders', 'focus', 'models', 'blend', 'build', 'guide', 'settings'];
const FULL_PAGES = ['home', 'chat', 'code', 'folders', 'focus', 'models', 'blend', 'lector', 'career', 'build', 'fabrica', 'tabula', 'abacus', 'slides', 'scriba', 'fontes', 'guide', 'settings'];
// what an edition must not show or name. The copyright line and the licence, which every edition keeps, are taken out of the words first.
const OWNERS = /Designed and built by Yannie D\. Forest|© 2026 Yannie D\. Forest|Copyright \(c\) 2026 Yannie D\. Forest|Yannie D\. Forest\b(?=[^.]{0,80}(All rights reserved|licen[cs]e|Licen[cs]e|owner|Owner))/g;
const NOT = {
  // Scriba and Fontes are also Ingenium's own model house and its reference database (the chat's My sources), which every edition keeps:
  // they count here only in the words that mean the apps of those names
  public: /\b(Fabrica|Tabula|Abacus|Imago|Scriba for recordings|Scriba \(recordings|Scriba's speech model|Fontes \(sources\) are|Fontes for sources|Lector|Career Studio|Author Studio|Workshop|Carpe Diem|The Forge|Inkwell|Offline Project|Yannie)\b/,
  full: /\b(Author Studio|Workshop|Carpe Diem|The Forge|Inkwell|Offline Project|Yannie)\b/
};
async function survey(b, ed, url) {
  const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } }); const p = await ctx.newPage(); const errs = []; p.on('pageerror', e => errs.push(e.message.slice(0, 240)));
  await p.goto(url); await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 300000 }); await p.waitForTimeout(1500);
  await p.evaluate(() => { const k = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Enter' && x.offsetParent); if (k) k.click(); });
  await p.waitForTimeout(600);
  const r = await p.evaluate(async () => {
    const vis = e => !!(e && e.offsetParent !== null && getComputedStyle(e).display !== 'none' && getComputedStyle(e).visibility !== 'hidden');
    const nav = [...document.querySelectorAll('.nav-btn[data-page]')].filter(vis).map(x => x.getAttribute('data-page'));
    const groups = [...document.querySelectorAll('.grp-label')].filter(vis).map(x => x.textContent.trim());
    const text = root => { const w = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, { acceptNode: n => n.parentElement && n.parentElement.closest('script,style,template,noscript,textarea') ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT }); let s = '', n; while ((n = w.nextNode())) s += n.nodeValue + ' '; return s.replace(/\s+/g, ' '); };
    const words = {}; const pages = (window.PAGES || []).slice(); ['code', 'folders', 'career', 'fabrica'].forEach(x => { if (document.getElementById('page-' + x) && pages.indexOf(x) < 0) pages.push(x); });
    const own = root => { const c = root.cloneNode(true); c.querySelectorAll('#ingPermitCard,.ing-colophon,.colophon,[class*="colophon"],script,style,template').forEach(x => x.remove()); return c; };
    for (const pg of nav) { if (/^(tabula|abacus|slides|scriba|fontes)$/.test(pg)) continue; try { go(pg); } catch (e) {} await new Promise(r => setTimeout(r, 900)); const sec = document.getElementById('page-' + pg) || document.querySelector('.section.active') || document.querySelector('main'); words[pg] = text(own(sec)); }
    go('home'); await new Promise(r => setTimeout(r, 400));
    words.topbar = text(document.querySelector('.topbar') || document.body); words.rail = text(document.querySelector('nav') || document.body);
    words.tour = (window.ING_TOUR || []).map(s => (s.chap || '') + ': ' + (s.t || '') + ' ' + (s.b || '')).join(' | ');
    try { words.help = JSON.stringify(window.IngHelp && IngHelp.pages ? IngHelp.pages() : ''); } catch (e) { words.help = ''; }
    const stray = ['fabrica', 'tabula', 'abacus', 'slides', 'scriba', 'fontes', 'lector', 'career'].filter(x => { try { go(x); return document.querySelector('.section.active') && document.querySelector('.section.active').id === 'page-' + x; } catch (e) { return false; } });
    go('home');
    const nameCard = !!document.getElementById('setAppName'), ownerKey = !!(window.IngPermit && document.querySelector('#ingPermitCard') && [...document.querySelectorAll('#ingPermitCard button')].some(b => /owner'?s key|make (a|the) key|new key|key file/i.test(b.textContent)));
    const carried = (() => { try { return (window.IngApps && IngApps.list ? IngApps.list() : []).map(a => a.name || a.key); } catch (e) { return []; } })();
    const desk = ['tabula', 'abacus', 'slides', 'scriba', 'fontes'].filter(n => !!document.getElementById('ing-app-' + n));
    return { ed: typeof ING_EDITION === 'string' ? ING_EDITION : '?', nav, groups, words, stray, nameCard, ownerKey, carried, desk, workshop: !!window.IngWorkshop };
  });
  r.errs = errs; await ctx.close(); return r;
}
(async () => {
  const b = await pw.chromium.launch();
  for (const [ed, url] of Object.entries(URLS)) {
    const r = await survey(b, ed, url);
    const kind = ed === 'master' ? 'master' : ed === 'full' ? 'full' : 'public';
    const HOUSE = /Velox|Magister|Faber|balanced|house|thinks|Fast Balanced/;
    const mentions = []; if (NOT[kind]) for (const [k, v] of Object.entries(r.words)) { const t = String(v).replace(OWNERS, ''); const g = new RegExp(NOT[kind].source, 'g'); let m;
      while ((m = g.exec(t)) && mentions.length < 400) { if (m[1] === 'Scriba' && HOUSE.test(t.slice(Math.max(0, m.index - 45), m.index + 45))) continue; mentions.push(k + ': …' + t.slice(Math.max(0, m.index - 70), m.index + 60) + '…'); } }
    fs.writeFileSync(OUT + '/' + ed + '.json', JSON.stringify(Object.assign({}, r, { mentions }), null, 1));
    if (process.env.SURVEY) { console.log('==== ' + ed + ' (' + r.ed + ')\n nav: ' + r.nav.join(' ') + '\n groups: ' + r.groups.join(' ') + '\n stray routes: ' + r.stray.join(' ') + '\n name card: ' + r.nameCard + ', owner key: ' + r.ownerKey + ', workshop: ' + r.workshop + ', desk apps carried: ' + r.desk.join(' ') + '\n library: ' + r.carried.join(', ') + '\n errors: ' + JSON.stringify(r.errs.slice(0, 5)) + '\n mentions: ' + mentions.length); const by = {}; mentions.forEach(x => { const k = x.split(':')[0]; by[k] = (by[k] || 0) + 1; }); console.log(' by place: ' + JSON.stringify(by)); mentions.slice(0, 60).forEach(x => console.log('   ' + x)); continue; }
    if (kind === 'public') {
      ok(r.ed === ed && JSON.stringify(r.nav) === JSON.stringify(PUBLIC_PAGES), ed + ': the side bar holds only Home, Chat, Code, Folders, Focus, Models, Blend, Build, the Guide and Settings', r.nav);
      ok(!r.groups.some(g => /apps/i.test(g)) && r.desk.length === 0, ed + ': no Apps group, and none of the five apps carried in the page', { groups: r.groups, desk: r.desk });
      ok(r.stray.length === 0, ed + ': no route leads to a page this edition does not have', r.stray);
      ok(!r.nameCard && !r.ownerKey && !r.workshop, ed + ': no renaming, no author key, no Author Studio', r);
      ok(mentions.length === 0, ed + ': no page, the tour or the help names a page or an app this edition does not have, nor the owner', mentions.slice(0, 40));
    } else if (kind === 'full') {
      ok(r.ed === 'full' && JSON.stringify(r.nav) === JSON.stringify(FULL_PAGES), 'full: the side bar holds every page but the Author Studio, with Lector, the Career Studio, Fabrica and the five apps', r.nav);
      ok(r.desk.length === 5, 'full: the five apps are carried', r.desk);
      ok(!r.nameCard && !r.ownerKey && !r.workshop, 'full: no renaming Ingenium, no author key, no Author Studio', { nameCard: r.nameCard, ownerKey: r.ownerKey, workshop: r.workshop });
      ok(r.carried.every(n => !/Carpe Diem|Forge|Inkwell/i.test(n)), 'full: none of the Offline Project\'s apps is carried', r.carried);
      ok(mentions.length === 0, 'full: nothing names the Offline Project\'s apps, the Author Studio or the owner', mentions.slice(0, 40));
    } else {
      ok(r.nav.indexOf('lector') >= 0 && r.nav.indexOf('fabrica') >= 0 && r.workshop && r.nameCard, 'master: everything, with the Author Studio and the Name card', r.nav);
    }
    ok(r.errs.length === 0, ed + ': no error on any page', r.errs);
  }
  if (!process.env.SURVEY) console.log(`\n${pass} passed, ${fail} failed`);
  await b.close(); process.exit(fail ? 1 : 0);
})().catch(e => { console.error(e); process.exit(2); });
