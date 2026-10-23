// The Forge 644 · your chats from other assistants, kept and read without AI (blocks/forge_chats.html with the shared
// thoughts/chat_import_core.html), in Chromium, with the sample exports of rig/import_fixtures.js. Checks:
//   - Files has the card; an export is brought in as a person does it (the file chosen), and kept: ChatGPT (two
//     conversations), Claude (two, and its project), Gemini, Grok; the same export again brings nothing twice;
//   - a conversation opens in place with its brief and its messages; its code is kept as the Forge's own files, named as the
//     conversation named them (garden.html); a project's documents too (STYLE.md); it is saved as Markdown, whole;
//   - found by its words, and by words inside its messages;
//   - kept after a reload;
//   - a large export (2,000 conversations) is kept while the Forge answers;
//   - no page errors.
//   node tests/t_644_chats.js <url of the Forge page> <out folder> <fixtures folder on disk>
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs'); const path = require('path');
const [URL_, OUT, FIX] = process.argv.slice(2); fs.mkdirSync(OUT, { recursive: true });
let pass = 0, fail = 0;
const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (d !== undefined ? '  ' + String(typeof d === 'string' ? d : JSON.stringify(d)).slice(0, 500) : '')); c ? pass++ : fail++; };
async function ready(p) { await p.waitForFunction(() => { const b = document.getElementById('forge-boot'); return !b || b.classList.contains('fb-gone'); }, null, { timeout: 120000 }); await p.waitForTimeout(1200);
  await p.evaluate(() => { const d = document.getElementById('cd-door'); const k = d && [...d.querySelectorAll('button')].find(x => /^Open the Editor/.test(x.textContent.trim())); if (k) k.click(); }); await p.waitForTimeout(600);
  await p.evaluate(() => FORGE.openRoom('files')); await p.waitForFunction(() => !!document.getElementById('fcCard'), null, { timeout: 30000 }).catch(() => { }); }
async function bring(p, file) { const n0 = await p.evaluate(() => window.forgeChats.meta().length);
  const [fc] = await Promise.all([p.waitForEvent('filechooser'), p.evaluate(() => [...document.querySelectorAll('#fcCard button')].find(b => /Bring your export/.test(b.textContent)).click())]);
  await fc.setFiles(path.join(FIX, file)); await p.waitForFunction(n => window.forgeChats.meta().length > n || /already here|Nothing/.test(document.getElementById('fcSay').textContent), n0, { timeout: 120000 }).catch(() => { });
  await p.waitForTimeout(300); return p.evaluate(() => document.getElementById('fcSay').textContent); }
const rows = p => p.evaluate(() => [...document.querySelectorAll('#fcList details.fc-c > summary')].map(s => s.textContent));
async function ping(p) { let w = 0; for (let i = 0; i < 5; i++) { const t = Date.now(); await p.evaluate(() => 1); w = Math.max(w, Date.now() - t); await p.waitForTimeout(100); } return w; }

(async () => {
  const b = await pw.chromium.launch({ args: ['--no-sandbox'] }); const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, acceptDownloads: true });
  let p = await ctx.newPage(); const errs = []; p.on('pageerror', e => errs.push(e.message)); const downloads = []; p.on('download', d => downloads.push(d));
  try {
    await p.goto(URL_); await ready(p);
    ok(await p.evaluate(() => !!(document.getElementById('fcCard') && window.ChatImportCore && window.forgeChats)), 'Files has the card, and the shared reader is in the page');
    let said = await bring(p, 'chatgpt_export.zip');
    ok(/2 kept from ChatGPT/.test(said), 'ChatGPT: brought in as a person does it, two conversations kept', said);
    said = await bring(p, 'claude_export.zip');
    ok(/3 kept from Claude/.test(said), 'Claude: two conversations and its project kept', said);
    said = await bring(p, 'gemini_takeout.zip'); const s2 = await bring(p, 'grok_export.zip');
    ok(/2 kept from Gemini/.test(said) && /1 kept from Grok/.test(s2), 'Gemini and Grok kept', [said, s2]);
    said = await bring(p, 'chatgpt_export.zip');
    ok(/0 kept/.test(said) && /2 already here/.test(said), 'the same export again brings nothing twice', said);
    let r = await rows(p);
    ok(r.length === 8 && r.some(t => /ChatGPT.*Garden planner app/.test(t)) && r.some(t => /Claude.*Invoicing service.*1 documents/.test(t)), 'listed with their own dates and where they came from', r);
    // open a conversation, keep its code
    await p.evaluate(() => { const d = [...document.querySelectorAll('#fcList details.fc-c')].find(d => /Garden planner app/.test(d.textContent)); d.open = true; });
    await p.waitForFunction(() => { const d = [...document.querySelectorAll('#fcList details.fc-c')].find(d => /Garden planner app/.test(d.textContent)); return d && d.querySelectorAll('.fc-msg').length > 0; }, null, { timeout: 15000 }).catch(() => { });
    const op = await p.evaluate(() => { const d = [...document.querySelectorAll('#fcList details.fc-c')].find(d => /Garden planner app/.test(d.textContent)); return { brief: (d.querySelector('.fc-brief') || {}).textContent || '', msgs: d.querySelectorAll('.fc-msg').length, keys: [...d.querySelectorAll('button')].map(b => b.textContent) }; });
    ok(op.msgs === 4 && /It began/.test(op.brief) && /garden\.html/.test(op.brief), 'a conversation opens in place, with its brief and its messages', op);
    await p.evaluate(() => { const d = [...document.querySelectorAll('#fcList details.fc-c')].find(d => /Garden planner app/.test(d.textContent)); [...d.querySelectorAll('button')].find(b => /Keep its code as files/.test(b.textContent)).click(); });
    await p.waitForFunction(() => [...document.querySelectorAll('#filesList .dw-row')].some(r => /garden\.html/.test(r.textContent)), null, { timeout: 15000 }).catch(() => { });
    const files = await p.evaluate(() => [...document.querySelectorAll('#filesList .dw-row')].map(r => r.textContent.split('page')[0].split('code')[0].slice(0, 40)));
    ok(files.some(t => /garden\.html/.test(t)) && files.some(t => /\.py/.test(t)) && !files.some(t => /\.txt/.test(t)), 'its code is kept as the Forge\'s own files, named as the conversation named them (what a code run printed is left out)', files);
    await p.evaluate(() => { const d = [...document.querySelectorAll('#fcList details.fc-c')].find(d => /Invoicing service/.test(d.textContent)); d.open = true; });
    await p.waitForTimeout(800);
    await p.evaluate(() => { const d = [...document.querySelectorAll('#fcList details.fc-c')].find(d => /Invoicing service/.test(d.textContent)); [...d.querySelectorAll('button')].find(b => /Keep its documents/.test(b.textContent)).click(); });
    await p.waitForFunction(() => [...document.querySelectorAll('#filesList .dw-row')].some(r => /STYLE\.md/.test(r.textContent)), null, { timeout: 15000 }).catch(() => { });
    ok(await p.evaluate(() => [...document.querySelectorAll('#filesList .dw-row')].some(r => /STYLE\.md/.test(r.textContent))), 'a project\'s documents too (STYLE.md)');
    const n0 = downloads.length;
    await p.evaluate(() => { const d = [...document.querySelectorAll('#fcList details.fc-c')].find(d => /Garden planner app/.test(d.textContent)); [...d.querySelectorAll('button')].find(b => /Markdown/.test(b.textContent)).click(); });
    for (let i = 0; i < 50 && downloads.length <= n0; i++) await p.waitForTimeout(100);
    let mdText = ''; if (downloads[n0]) { const f = path.join(OUT, 'chat.md'); await downloads[n0].saveAs(f); mdText = fs.readFileSync(f, 'utf8'); }
    ok(/^# Garden planner app/.test(mdText) && /Tuesday at 7/.test(mdText) && /beds\.md/.test(mdText) && (mdText.match(/^## /gm) || []).length === 4, 'saved as Markdown, whole (its attached file with it)', mdText.slice(0, 160));
    // found
    await p.fill('#fcFind', 'lighthouse keeper'); await p.waitForTimeout(500); r = await rows(p);
    ok(r.length === 1 && /Novel chapter 3/.test(r[0]), 'found by its words', r);
    await p.fill('#fcFind', 'Tuesday at 7'); await p.waitForTimeout(400);
    await p.evaluate(() => [...document.querySelectorAll('#fcCard button')].find(b => /Look inside every message/.test(b.textContent)).click()); await p.waitForTimeout(1500); r = await rows(p);
    ok(r.length === 1 && /Garden planner app/.test(r[0]), 'and by words inside its messages', r);
    await p.fill('#fcFind', ''); await p.waitForTimeout(400);
    // kept after a reload
    await p.close(); p = await ctx.newPage(); p.on('pageerror', e => errs.push(e.message)); await p.goto(URL_); await ready(p); await p.waitForTimeout(800);
    r = await rows(p);
    ok(r.length === 8, 'kept after a reload', r.length);
    // a large export
    let worst = 0; const t0 = Date.now(); const big = bring(p, 'chatgpt_big.zip');
    while (true) { const done = await Promise.race([big.then(() => true), new Promise(x => setTimeout(() => x(false), 400))]); if (done) break; const t = Date.now(); await p.evaluate(() => 1); worst = Math.max(worst, Date.now() - t); }
    said = await big; r = await rows(p);
    ok(/2000 kept from ChatGPT/.test(said) && r.length === 400, 'a large export (2,000 conversations) kept in ' + ((Date.now() - t0) / 1000).toFixed(1) + ' s, the Forge answering within ' + worst + ' ms', [said, r.length]);
    const pg = await ping(p); ok(pg < 500, 'the Forge answering within ' + pg + ' ms after', pg);
    ok(!errs.length, 'no page errors', errs.slice(0, 4));
  } catch (e) { ok(false, 'the run crashed', e.stack); }
  await b.close();
  console.log(`\n${pass} passed, ${fail} failed`); process.exit(fail ? 1 : 0);
})();
