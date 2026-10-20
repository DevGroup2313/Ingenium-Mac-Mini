// INGENIUM 6.1 · what Orca, a real screen reader, says on each page, key by key (run inside orca_env.sh).
// node orca_walk.js <url> <outdir> [page,page,...] [--tabs N] [--forge]
// For each page: the page is opened in a visible Chromium (accessibility on), Orca starts, and the keys a person uses are
// pressed through the X server (xdotool), so Orca hears them as a person's: Tab through the controls, then H through the
// headings. Each step's speech is taken from Orca's own record (its debug file), and kept as JSON with the problems found:
// a control read with no name ("push button" alone), a picture with no words, a step where nothing was said.
const { chromium } = require('/opt/node-tools/node_modules/playwright');
const fs = require('fs'), path = require('path'), cp = require('child_process');
const URL_ = process.argv[2], OUT = process.argv[3]; fs.mkdirSync(OUT, { recursive: true });
const argv = process.argv.slice(4); const forge = argv.includes('--forge');
const tabsAt = argv.indexOf('--tabs'); const TABS = tabsAt >= 0 ? +argv[tabsAt + 1] : 30;
const PAGES = (argv.find(a => !a.startsWith('--') && !/^\d+$/.test(a)) || (forge ? 'editor,library,fabrica,settings,guidebook' : 'home,chat,code,lector,build,fabrica,settings')).split(',');
const sleep = ms => new Promise(r => setTimeout(r, ms));
const key = k => cp.execFileSync('xdotool', ['key', '--delay', '60', k]);
const ROLES = 'push button|toggle button|link|entry|check box|radio button|combo box|menu item|tab|slider|spin button|image|heading level \\d|list item|menu button|split button';
function problems(said) {
  const out = [];
  said.forEach((s, i) => {
    const t = s.text.trim();
    if (!t) out.push({ step: i, kind: 'silent', text: t });
    else if (new RegExp('^(?:' + ROLES + ')\\.?$', 'i').test(t.replace(/^tab\s+/i, ''))) out.push({ step: i, kind: 'no name', text: t });
    else if (/\bimage\.?$/i.test(t) && t.split(/\s+/).length <= 2) out.push({ step: i, kind: 'picture with no words', text: t });
    else if (/\b(?:unlabel+ed|blank)\b/i.test(t)) out.push({ step: i, kind: 'blank', text: t });
  });
  return out;
}
(async () => {
  const b = await chromium.launch({ headless: false, args: ['--no-sandbox', '--force-renderer-accessibility', '--window-size=1440,900', '--disable-gpu'] });
  const ctx = await b.newContext({ viewport: null });
  const p = await ctx.newPage();
  const errs = []; p.on('pageerror', e => errs.push(e.message));
  await p.goto(URL_, { waitUntil: 'domcontentloaded', timeout: 180000 });
  if (!forge) { await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 180000 }); await sleep(1500);
    await p.evaluate(() => { const x = [...document.querySelectorAll('button')].find(b => b.textContent.trim() === 'Enter' && b.offsetParent); if (x) x.click(); }); }
  else { await sleep(9000); await p.evaluate(() => { try { const d = document.querySelector('.door,#door,[data-door]'); const e = [...document.querySelectorAll('button,a')].find(x => /^(Enter|Open the Editor)$/i.test(x.textContent.trim()) && x.offsetParent); if (e) e.click(); } catch (e) {} }); }
  await sleep(1500);
  const log = path.join(OUT, 'orca.log'); try { fs.unlinkSync(log); } catch (e) {}
  const orca = cp.spawn('python3.12', ['/usr/bin/orca', '--replace', '--debug-file=' + log], { stdio: 'ignore' });
  await sleep(7000);
  let read = 0;
  function heard() { let t = ''; try { t = fs.readFileSync(log, 'utf8'); } catch (e) {} const fresh = t.slice(read); read = t.length; return (fresh.match(/SPEECH OUTPUT: '[^']*'/g) || []).map(x => x.slice(15, -1)).filter(x => x !== 'tab' && x !== 'h').join(' · '); }
  const report = {};
  for (const pg of PAGES) {
    await p.bringToFront();
    await p.evaluate((pg) => { try { if (window.FORGE && FORGE.openRoom) FORGE.openRoom(pg); else if (typeof openRoom === 'function') openRoom(pg); else go(pg); } catch (e) {} window.scrollTo(0, 0); }, pg);
    await sleep(2500); heard();
    await p.evaluate(() => { document.activeElement && document.activeElement.blur && document.activeElement.blur(); });
    const said = [];
    for (let i = 0; i < TABS; i++) { key('Tab'); await sleep(900); const name = await p.evaluate(() => { const a = document.activeElement; if (!a || a === document.body) return ''; return (a.tagName.toLowerCase() + (a.id ? '#' + a.id : '') + (a.className && typeof a.className === 'string' ? '.' + a.className.trim().split(/\s+/).slice(0, 2).join('.') : '')).slice(0, 80); });
      said.push({ key: 'Tab', el: name, text: heard() }); }
    key('Escape'); await sleep(400); heard();
    const heads = [];
    for (let i = 0; i < 12; i++) { key('h'); await sleep(800); heads.push({ key: 'h', text: heard() }); }
    report[pg] = { tabs: said, headings: heads, problems: problems(said) };
    fs.writeFileSync(path.join(OUT, 'orca_' + pg + '.json'), JSON.stringify(report[pg], null, 1));
    console.log(pg + ': ' + said.filter(s => s.text).length + '/' + said.length + ' steps spoken, ' + report[pg].problems.length + ' problems, headings: ' + heads.map(h => h.text).filter(Boolean).slice(0, 4).join(' | ').slice(0, 160));
  }
  fs.writeFileSync(path.join(OUT, 'orca_all.json'), JSON.stringify({ url: URL_, pages: report, errors: errs }, null, 1));
  orca.kill(); await b.close();
})();
