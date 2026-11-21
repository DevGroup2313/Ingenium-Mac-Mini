// The Author Studio, raised: a live preview she can press (her rule: a live interactive preview for anything to be tried by hand).
// It is the running studio itself, from a test page carrying modules/r353.js: each room's markup as the studio drew it, with every
// style rule that applies to it (read from the page's own style sheets, by day and by night) and r353's own script, so what leans,
// lifts, sinks and slides is the module's own code. The rooms switch from the rail and from the Editor's kinds; a Day and Night switch
// sits at the foot. Nothing of hers is in it (a fresh copy, two invented rewrites).
//   node previews/author_raised/make_live.js <page url with r353> <r353.js> <out .html>
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs');
const [URL_, MOD, OUT] = process.argv.slice(2);
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
(async () => {
  const b = await pw.chromium.launch(); const p = await (await b.newContext({ viewport: { width: 1360, height: 900 } })).newPage();
  await p.goto(URL_, { waitUntil: 'domcontentloaded', timeout: 300000 }); await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 300000 });
  await p.evaluate(() => { const k = [...document.querySelectorAll('button')].find((x) => x.textContent.trim() === 'Enter' && x.offsetParent); if (k) k.click(); try { tourEnd(); } catch (e) {}
    IngAuthor.words.set('Break it down', 'Take it apart', 'all'); IngAuthor.words.set('Bring in your work', 'Bring your work in', 'all'); go('author'); });
  await sleep(2500);
  const names = await p.evaluate(() => [...document.querySelectorAll('#ingAuthor .au-room')].map((x) => x.textContent.trim().replace(/\d+$/, '').replace(/New$/, '').trim()));
  const rooms = {}; const used = new Set();
  // every rule whose selector matches something in the studio (or the page's root and body, for the colours), kept whole
  const collect = () => p.evaluate(() => {
    const out = []; const root = document.getElementById('ingAuthor'); const els = [document.documentElement, document.body, root, ...root.querySelectorAll('*')];
    const strip = (s) => s.replace(/::?(hover|active|focus-visible|focus|before|after|placeholder|first-of-type|last-child|first-child|empty|disabled|checked|focus-within)(\([^)]*\))?/g, '').trim();
    const hit = (sel) => sel.split(',').some((part) => { const q = strip(part); if (!q) return false; try { return els.some((e) => e.matches(q)); } catch (e) { return false; } });
    const walk = (rules, wrap) => { for (const r of rules) {
      if (r.type === 1) { if (hit(r.selectorText)) out.push(wrap(r.cssText)); }
      else if (r.type === 4) { walk(r.cssRules, (t) => wrap('@media ' + r.conditionText + '{' + t + '}')); }
      else if (r.type === 7) { out.push(r.cssText); }
      else if (r.type === 12) { walk(r.cssRules, (t) => wrap('@supports ' + r.conditionText + '{' + t + '}')); } } };
    for (const sh of document.styleSheets) { let rs; try { rs = sh.cssRules; } catch (e) { continue; } walk(rs, (t) => t); }
    return out; });
  for (const t of ['day', 'night']) {
    await p.evaluate((t) => { state.theme = t; applyTheme(); }, t); await sleep(600);
    for (const n of names) {
      await p.evaluate((n) => { const k = [...document.querySelectorAll('#ingAuthor .au-room')].find((x) => x.textContent.trim().indexOf(n) === 0); if (k) k.click(); }, n); await sleep(1200);
      if (t === 'day') rooms[n] = await p.evaluate(() => { const pane = document.querySelector('#ingAuthor .au-pane'); pane.querySelectorAll('[style]').forEach((e) => { e.style.removeProperty('--au-rx'); e.style.removeProperty('--au-ry'); }); return pane.innerHTML; });
      (await collect()).forEach((r) => used.add(r));
    }
  }
  await p.evaluate(() => { state.theme = 'day'; applyTheme(); }); await sleep(400);
  const shell = await p.evaluate(() => { const a = document.getElementById('ingAuthor').cloneNode(true); a.removeAttribute('hidden'); a.querySelector('.au-pane').innerHTML = ''; return a.outerHTML; });
  const vars = await p.evaluate(() => { const cs = getComputedStyle(document.body); const keep = {}; for (let i = 0; i < cs.length; i++) { const k = cs[i]; if (k.startsWith('--')) keep[k] = cs.getPropertyValue(k); } return keep; });
  await b.close();
  const keyframes = [...used].filter((r) => r.startsWith('@keyframes'));
  const rules = [...used].filter((r) => !r.startsWith('@keyframes'));
  const mod = fs.readFileSync(MOD, 'utf8'); const script = (mod.match(/<script>([\s\S]*?)<\/script>/) || [])[1] || '';
  const html = `<title>Author Studio, raised</title>
<style>
/* the live preview's own frame: the studio fills the window as it does in Ingenium; at the foot, Day and Night */
:root{--pv-bg:#f4f1f8;--pv-ink:#221a2e;--pv-key:#ffffff;--pv-acc:#6a3fb5}
@media (prefers-color-scheme: dark){:root:not([data-theme="light"]){--pv-bg:#16121d;--pv-ink:#eee8f7;--pv-key:#2a2239;--pv-acc:#b79ce6;color-scheme:dark}}
:root[data-theme="dark"]{--pv-bg:#16121d;--pv-ink:#eee8f7;--pv-key:#2a2239;--pv-acc:#b79ce6;color-scheme:dark}
body{background:var(--pv-bg);color:var(--pv-ink)}
#pvTheme{position:fixed;z-index:900;right:calc(14px + env(safe-area-inset-right,0px));bottom:calc(14px + env(safe-area-inset-bottom,0px));display:flex;gap:4px;padding:4px;border-radius:999px;background:var(--pv-key);box-shadow:0 2px 0 rgba(40,22,68,.25),0 6px 14px rgba(40,22,68,.2)}
#pvTheme button{border:0;border-radius:999px;padding:6px 12px;font:600 12px system-ui,sans-serif;background:transparent;color:var(--pv-ink);cursor:pointer}
#pvTheme button[aria-pressed="true"]{background:var(--pv-acc);color:#fff}
#pvTheme button:focus-visible{outline:2px solid var(--pv-acc);outline-offset:2px}
@media (max-width:820px){#ingAuthor .au-pane{padding-left:max(16px,env(safe-area-inset-left,0px)) !important;padding-right:max(16px,env(safe-area-inset-right,0px)) !important}}
</style>
<style>body{${Object.entries(vars).map(([k, v]) => k + ':' + v).join(';')}}</style>
<style>
${keyframes.join('\n')}
${rules.join('\n')}
</style>
${shell}
<div id="pvTheme" role="group" aria-label="Day or night"><button type="button" id="pvDay" aria-pressed="true">Day</button><button type="button" id="pvNight" aria-pressed="false">Night</button></div>
<script>
var ROOMS=${JSON.stringify(rooms)};
document.body.setAttribute("data-theme","day");
function show(n){var pane=document.querySelector("#ingAuthor .au-pane");pane.innerHTML=ROOMS[n]||"";
  document.querySelectorAll("#ingAuthor .au-room").forEach(function(r){var on=r.textContent.trim().indexOf(n)===0;r.setAttribute("aria-selected",on?"true":"false");});
  pane.querySelectorAll(".au-kind").forEach(function(k){k.addEventListener("click",function(){var m=/Open (\\w[\\w ]*)/.exec(k.textContent);if(m)show(m[1].trim());});});
  pane.querySelectorAll(".au-strip > button, [role=tablist] > button").forEach(function(b){b.addEventListener("click",function(){[].forEach.call(b.parentNode.children,function(c){c.setAttribute("aria-selected",c===b?"true":"false");});});});
  pane.scrollTop=0;}
document.querySelectorAll("#ingAuthor .au-room").forEach(function(r){r.addEventListener("click",function(){show(r.textContent.trim().replace(/\\d+$/,"").replace(/New$/,"").trim());});});
function theme(t){document.body.setAttribute("data-theme",t);document.getElementById("pvDay").setAttribute("aria-pressed",String(t==="day"));document.getElementById("pvNight").setAttribute("aria-pressed",String(t==="night"));}
document.getElementById("pvDay").onclick=function(){theme("day");};document.getElementById("pvNight").onclick=function(){theme("night");};
try{if(matchMedia("(prefers-color-scheme: dark)").matches)theme("night");}catch(e){}
show("The Editor");
</script>
<script>${script}</script>
`;
  fs.writeFileSync(OUT, html);
  console.log('wrote', OUT, html.length, 'bytes;', rules.length, 'rules,', keyframes.length, 'keyframes;', Object.keys(rooms).length, 'rooms');
})().catch((e) => { console.log('stopped: ' + (e && e.stack || e)); process.exit(1); });
