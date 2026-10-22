// Ingenium 6.2 · the accessibility tree half of the audit: what a screen reader is handed, read from Chromium's own
// accessibility tree (DevTools, Accessibility.getFullAXTree) on every page, by day and by night, on a desk and a phone.
// It finds what axe-core's rules can miss because they read the markup, not the tree the browser builds from it:
//   - a control (button, link, field, switch, tab, menu item, slider ...) the tree gives no name;
//   - something that takes the keyboard's focus but has no role a screen reader can announce (a bare focusable box);
//   - a picture with no words that is not marked as decoration;
//   - a page with no main region or no heading;
//   - two controls side by side in one region with the same name and nothing to tell them apart (soft: reported, not failed).
// It writes ax_tree.json and prints each problem with where it is.
//   node rig/a11y/ax_tree.js <page url> <out folder> [the_forge]
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs'); const path = require('path');
const URL_ = process.argv[2], OUT = process.argv[3], FORGE = process.argv[4] === 'the_forge';
fs.mkdirSync(OUT, { recursive: true });
const ING_PAGES = ['home', 'chat', 'code', 'focus', 'models', 'blend', 'lector', 'build', 'fabrica', 'guide', 'settings'];
const CONTROLS = new Set(['button', 'link', 'textbox', 'searchbox', 'checkbox', 'radio', 'combobox', 'listbox', 'tab', 'switch', 'slider', 'spinbutton', 'menuitem', 'menuitemcheckbox', 'menuitemradio', 'option', 'treeitem', 'PopUpButton', 'ToggleButton']);
const QUIET = new Set(['generic', 'none', 'presentation', 'InlineTextBox', 'StaticText', 'LineBreak', 'paragraph', 'Section', 'group', 'GenericContainer', 'Div']);

async function ready(p) {
  if (FORGE) { await p.waitForFunction(() => { const b = document.getElementById('forge-boot'); return !b || b.classList.contains('fb-gone'); }, null, { timeout: 90000 }); await p.waitForTimeout(1200); return; }
  await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 120000 }); await p.waitForTimeout(1200);
  await p.evaluate(() => { const b = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Enter' && x.offsetParent); if (b) b.click(); });
  await p.waitForTimeout(600);
}
async function tree(p) {
  const cdp = await p.context().newCDPSession(p);
  await cdp.send('Accessibility.enable'); await cdp.send('DOM.enable');
  const { nodes } = await cdp.send('Accessibility.getFullAXTree');
  const byId = new Map(nodes.map(n => [n.nodeId, n]));
  const val = v => (v && v.value != null ? String(v.value) : '');
  const prop = (n, k) => { const x = (n.properties || []).find(q => q.name === k); return x ? x.value && x.value.value : undefined; };
  // where each node is: the nearest landmark or heading-bearing region above it, for the report
  const parentOf = new Map(); nodes.forEach(n => (n.childIds || []).forEach(c => parentOf.set(c, n.nodeId)));
  const region = n => { let q = n; for (let i = 0; i < 40 && q; i++) { const r = val(q.role); if (/^(main|navigation|banner|complementary|contentinfo|region|dialog|form|search|toolbar|tablist|menu|alertdialog)$/.test(r)) return r + (val(q.name) ? ' “' + val(q.name).slice(0, 40) + '”' : ''); q = byId.get(parentOf.get(q.nodeId)); } return 'page'; };
  const out = { controls: 0, problems: [], soft: [], hasMain: false, headings: 0 };
  const seen = new Map();
  for (const n of nodes) {
    if (n.ignored) continue;
    const role = val(n.role), name = val(n.name).trim();
    if (role === 'main') out.hasMain = true;
    if (role === 'heading') out.headings++;
    if (prop(n, 'hidden')) continue;
    const focusable = prop(n, 'focusable');
    if (CONTROLS.has(role)) {
      out.controls++;
      if (!name && !prop(n, 'disabled')) {
        let html = '';
        try { if (n.backendDOMNodeId) { const r = await cdp.send('DOM.resolveNode', { backendNodeId: n.backendDOMNodeId }); const o = await cdp.send('Runtime.callFunctionOn', { objectId: r.object.objectId, functionDeclaration: 'function(){return this.outerHTML?this.outerHTML.slice(0,200):""}', returnByValue: true }); html = o.result.value || ''; } } catch (e) {}
        out.problems.push({ kind: 'control with no name', role, where: region(n), html });
      }
      const k = region(n) + '|' + role + '|' + name;
      if (name) { seen.set(k, (seen.get(k) || 0) + 1); }
    } else if (focusable && QUIET.has(role) && !prop(n, 'disabled')) {
      let html = '';
      try { if (n.backendDOMNodeId) { const r = await cdp.send('DOM.resolveNode', { backendNodeId: n.backendDOMNodeId }); const o = await cdp.send('Runtime.callFunctionOn', { objectId: r.object.objectId, functionDeclaration: 'function(){var s=getComputedStyle(this);return (s.visibility==="hidden"||s.display==="none"||this.closest("[inert]")||this.tagName==="IFRAME"||this.tagName==="BODY"||this.tagName==="HTML")?"":(this.outerHTML||"").slice(0,200)}', returnByValue: true }); html = o.result.value || ''; } } catch (e) {}
      if (html && !/^<(iframe|body|html)\b/i.test(html)) out.problems.push({ kind: 'takes the focus but has no role', role, where: region(n), html });
    } else if ((role === 'image' || role === 'img') && !name) {
      let html = '';
      try { if (n.backendDOMNodeId) { const r = await cdp.send('DOM.resolveNode', { backendNodeId: n.backendDOMNodeId }); const o = await cdp.send('Runtime.callFunctionOn', { objectId: r.object.objectId, functionDeclaration: 'function(){var p=this.parentElement;return (this.outerHTML||"").slice(0,160)+"  IN  "+(p?p.outerHTML.slice(0,140):"")}', returnByValue: true }); html = o.result.value || ''; } } catch (e) {}
      out.problems.push({ kind: 'picture with no words', role, where: region(n), html });
    }
  }
  seen.forEach((c, k) => { if (c > 1 && !/\|(tab|option|radio|menuitem|link)\|/.test(k)) out.soft.push({ kind: 'same name twice in one region', what: k, count: c }); });
  if (!out.hasMain) out.problems.push({ kind: 'no main region' });
  if (!out.headings) out.problems.push({ kind: 'no heading' });
  await cdp.detach();
  return out;
}
(async () => {
  const b = await pw.chromium.launch({ headless: true, args: ['--no-sandbox', '--force-renderer-accessibility'] });
  const all = []; let bad = 0;
  for (const vp of [{ name: 'desk', w: 1440, h: 900 }, { name: 'phone', w: 390, h: 844 }]) {
    for (const theme of ['day', 'night']) {
      const p = await b.newPage({ viewport: { width: vp.w, height: vp.h } });
      const errs = []; p.on('pageerror', e => errs.push(e.message));
      await p.goto(URL_); await ready(p);
      if (theme === 'night') await p.evaluate(() => { try { setTheme('night'); } catch (e) { document.body.setAttribute('data-theme', 'night'); } });
      const pages = FORGE ? ['the_forge'] : ING_PAGES;
      for (const pg of pages) {
        if (!FORGE) { await p.evaluate(pg => { try { go(pg); } catch (e) {} }, pg); await p.waitForTimeout(700); }
        const r = await tree(p); r.page = pg; r.vp = vp.name; r.theme = theme; all.push(r);
        bad += r.problems.length;
        console.log((r.problems.length ? 'FAIL ' : 'PASS ') + vp.name + ' ' + theme + ' ' + pg + ': ' + r.controls + ' controls, ' + r.headings + ' headings, ' + r.problems.length + ' problems' + (r.soft.length ? ', ' + r.soft.length + ' soft notes' : ''));
        r.problems.slice(0, 6).forEach(x => console.log('    ' + x.kind + ' · ' + (x.role || '') + ' · ' + (x.where || '') + ' · ' + (x.html || '').replace(/\s+/g, ' ').slice(0, 180)));
      }
      if (errs.length) { console.log('FAIL page errors: ' + errs.slice(0, 3).join(' | ')); bad++; }
      await p.close();
    }
  }
  fs.writeFileSync(path.join(OUT, 'ax_tree.json'), JSON.stringify(all, null, 1));
  await b.close();
  console.log('\n' + (bad ? bad + ' problems' : 'no problems') + ' in ' + all.length + ' page views');
  process.exit(bad ? 1 : 0);
})();
