// Ingenium 7.38: the chats of Ollama's own app, read on this computer (build/desktop/app_ollama_738.py; modules/r208.js, Folders, Bring in
// your work, Ollama; the shared import, r160 and thoughts/chat_import_core.html).
//   node rig/t_738_ollama.js <folder holding ingenium_app.py (patched) and ingenium.html> <out folder>
// A stand-in of Ollama's database is made with the tables of Ollama's own source (app/store/database.go, main, 18 November 2026), in
// write-ahead mode, and a process keeps it open while the test runs, so its latest chat sits in the write-ahead log, as while Ollama runs.
// (On Linux Ingenium looks in ~/.ollama/db.sqlite; Ollama's app keeps it in ~/Library/Application Support/Ollama on a Mac and in
// %LOCALAPPDATA%\Ollama on Windows.) Checks: the way in Folders, with its key; it finds 3 chats and 7 messages; the import shows them before
// anything comes in, as from Ollama; Bring all brings them, with their titles, dates and words (an attachment named); Ollama's files are
// the same, byte for byte, and no copy is left behind; with no database, it says where it looked; no page errors.
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs'); const path = require('path'); const cp = require('child_process'); const crypto = require('crypto'); const os = require('os');
const [APP, OUT] = process.argv.slice(2); fs.rmSync(OUT, { recursive: true, force: true }); fs.mkdirSync(OUT, { recursive: true });
let pass = 0, fail = 0; const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (d === undefined ? '' : '  ' + JSON.stringify(d).slice(0, 600))); c ? pass++ : fail++; };
const home = path.join(OUT, 'home'), dir = path.join(OUT, 'app'), odir = path.join(home, '.ollama'); [home, dir, odir].forEach(d => fs.mkdirSync(d, { recursive: true }));
for (const f of ['ingenium_app.py', 'ingenium.html']) fs.copyFileSync(path.join(APP, f), path.join(dir, f));
const DB = path.join(odir, 'db.sqlite');
const MAKE = `
import sqlite3, sys, time
db = sqlite3.connect(sys.argv[1]); db.execute("PRAGMA journal_mode=WAL"); db.execute("PRAGMA wal_autocheckpoint=0")
db.executescript('''
CREATE TABLE IF NOT EXISTS settings (id INTEGER PRIMARY KEY CHECK (id = 1), device_id TEXT NOT NULL DEFAULT '');
CREATE TABLE IF NOT EXISTS chats (id TEXT PRIMARY KEY, title TEXT NOT NULL DEFAULT '', created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, browser_state TEXT);
CREATE TABLE IF NOT EXISTS messages (id INTEGER PRIMARY KEY AUTOINCREMENT, chat_id TEXT NOT NULL, role TEXT NOT NULL, content TEXT NOT NULL DEFAULT '', thinking TEXT NOT NULL DEFAULT '',
  stream BOOLEAN NOT NULL DEFAULT 0, model_name TEXT, model_cloud BOOLEAN, model_ollama_host BOOLEAN, created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, thinking_time_start TIMESTAMP, thinking_time_end TIMESTAMP, tool_result TEXT, FOREIGN KEY (chat_id) REFERENCES chats(id) ON DELETE CASCADE);
CREATE TABLE IF NOT EXISTS attachments (id INTEGER PRIMARY KEY AUTOINCREMENT, message_id INTEGER NOT NULL, filename TEXT NOT NULL, data BLOB NOT NULL);
''')
def chat(cid, title, when, msgs):
    db.execute("INSERT INTO chats (id, title, created_at) VALUES (?, ?, ?)", (cid, title, when))
    for role, text, t in msgs:
        db.execute("INSERT INTO messages (chat_id, role, content, thinking, model_name, created_at, updated_at) VALUES (?, ?, ?, 'a thought', 'gemma3:4b', ?, ?)", (cid, role, text, t, t))
chat("c-a1", "Tide Clock ideas", "2026-10-02 09:15:00.123+00:00", [("user", "OLLAMA-MARK-1 What should Tide Clock show first?", "2026-10-02 09:15:00+00:00"), ("assistant", "The next high tide, in large type.", "2026-10-02 09:15:20+00:00")])
chat("c-b2", "Reading list for the DPhil", "2026-10-20T14:00:00Z", [("user", "OLLAMA-MARK-2 Three books on digital learning?", "2026-10-20T14:00:00Z"), ("assistant", "Here are three to start with.", "2026-10-20T14:00:30Z"), ("user", "Thank you.", "2026-10-20T14:01:00Z")])
db.commit()
chat("c-c3", "A picture of the harbour", "2026-11-17 18:30:00+00:00", [("user", "OLLAMA-MARK-3 What is in this picture?", "2026-11-17 18:30:00+00:00"), ("assistant", "A harbour at dusk.", "2026-11-17 18:30:10+00:00")])
db.execute("INSERT INTO attachments (message_id, filename, data) VALUES ((SELECT MIN(id) FROM messages WHERE chat_id = 'c-c3'), 'harbour.jpg', x'FFD8FF')")
db.commit()
print("ready", flush=True); time.sleep(900)
`;
const sha = (f) => fs.existsSync(f) ? crypto.createHash('sha256').update(fs.readFileSync(f)).digest('hex').slice(0, 16) : null;
(async () => {
  const holder = cp.spawn('python3', ['-c', MAKE, DB], { stdio: ['ignore', 'pipe', 'inherit'] });
  await new Promise((res, rej) => { holder.stdout.on('data', d => { if (/ready/.test(String(d))) res(); }); setTimeout(() => rej(new Error('the stand-in database was not made')), 20000); });
  const before = { db: sha(DB), wal: sha(DB + '-wal'), walSize: fs.existsSync(DB + '-wal') ? fs.statSync(DB + '-wal').size : 0 };
  ok(before.walSize > 0, 'the stand-in of Ollama\'s database holds its latest chat in the write-ahead log, as while Ollama runs', before);
  const tmp0 = fs.readdirSync(os.tmpdir()).filter(n => n.startsWith('ingenium-ollama-')).length;
  const pr = cp.spawn('python3', ['-I', path.join(__dirname, 'run_app.py'), dir, '18993'], { env: Object.assign({}, process.env, { HOME: home, XDG_DATA_HOME: '' }), stdio: ['ignore', 'pipe', 'pipe'] });
  let out = ''; pr.stdout.on('data', d => out += d); pr.stderr.on('data', d => out += d);
  let ia = null; for (let i = 0; i < 240 && !ia; i++) { const m = /\{"page_port".*\}/.exec(out); if (m) ia = JSON.parse(m[0]); else await new Promise(r => setTimeout(r, 250)); }
  if (!ia) { ok(false, 'the computer app starts', out.slice(-500)); process.exit(2); }
  ok(['ollama_chats_find', 'ollama_chats_json'].every(n => ia.names.includes(n)), 'the computer app runs, with ollama_chats_find and ollama_chats_json');
  const b = await pw.chromium.launch(); const errs = [];
  const ctx = await b.newContext({ viewport: { width: 1440, height: 1000 } });
  await ctx.addInitScript(({ names, port }) => { const a = {}; for (const n of names) a[n] = (...args) => fetch('http://127.0.0.1:' + port + '/call/' + n, { method: 'POST', body: JSON.stringify(args) }).then(r => r.json()).then(j => { if (!j.ok) throw new Error(j.e); return j.v; });
    window.pywebview = { api: a }; window.addEventListener('DOMContentLoaded', () => setTimeout(() => window.dispatchEvent(new Event('pywebviewready')), 50)); }, { names: ia.names, port: 18993 });
  const p = await ctx.newPage(); p.setDefaultTimeout(180000); p.on('pageerror', e => errs.push(e.message.slice(0, 200)));
  await p.goto('http://127.0.0.1:' + ia.page_port + '/ingenium.html', { timeout: 600000 }); await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 600000, polling: 1000 }); await p.waitForTimeout(1200);
  await p.evaluate(() => { const k = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Enter' && x.offsetParent); if (k) k.click(); try { tourEnd(); } catch (e) {} }); await p.waitForTimeout(800);
  await p.evaluate(() => go('folders')); await p.waitForTimeout(2000);
  const way = await p.evaluate(() => { const w = [...document.querySelectorAll('#page-folders .fld-way')].find(x => (x.querySelector('b') || {}).textContent === 'Ollama'); return w ? { text: w.querySelector('p').textContent, keys: [...w.querySelectorAll('button')].map(x => x.textContent) } : null; });
  ok(way && way.keys[0] === "Read Ollama's chats on this computer" && /never changed/.test(way.text), "Folders, Bring in your work, Ollama: Read Ollama's chats on this computer, and Ollama's file is never changed", way);
  const f = await p.evaluate(() => window.pywebview.api.ollama_chats_find());
  ok(f.found && f.count === 3 && f.messages === 7 && f.chats.map(c => c.title).join('|') === 'Tide Clock ideas|Reading list for the DPhil|A picture of the harbour', 'it finds 3 chats and 7 messages, the latest one from the write-ahead log too', { count: f.count, messages: f.messages, titles: f.chats.map(c => c.title) });
  await p.evaluate(() => [...document.querySelectorAll('#page-folders .fld-way button')].find(x => x.textContent === "Read Ollama's chats on this computer").click());
  await p.waitForFunction(() => { const d = document.querySelector('.imp-dlg'); return d && /Bring your chats from/.test(d.querySelector('h3').textContent) && d.querySelector('.imp-convs'); }, null, { timeout: 60000 });
  const shown = await p.evaluate(() => { const d = document.querySelector('.imp-dlg'); return { h: d.querySelector('h3').textContent, n: d.querySelectorAll('.imp-c').length, titles: [...d.querySelectorAll('.imp-c')].map(x => x.textContent.replace(/\s+/g, ' ').trim().slice(0, 60)) }; });
  ok(shown.h === 'Bring your chats from Ollama' && shown.n === 3, 'before anything comes in, the import shows the three chats, from Ollama', shown);
  await p.screenshot({ path: OUT + '/ollama_found.png' });
  await p.evaluate(() => [...document.querySelectorAll('.imp-dlg .imp-acts button')].find(x => x.textContent === 'Bring all').click());
  await p.waitForTimeout(4000);
  const conv = await p.evaluate(() => state.chats.filter(c => c.imported && c.imported.from === 'Ollama').map(c => ({ t: c.title, n: c.imported.count, created: new Date(c.imported.created).toISOString().slice(0, 16), model: c.imported.model })));
  const text = await p.evaluate(() => document.body.innerText);
  const byT = Object.fromEntries(conv.map(c => [c.t, c]));
  ok(conv.length === 3 && byT['Tide Clock ideas'] && byT['Tide Clock ideas'].n === 2 && byT['Reading list for the DPhil'].n === 3 && byT['Tide Clock ideas'].created === '2026-10-02T09:15' && byT['Reading list for the DPhil'].created === '2026-10-20T14:00' && byT['Tide Clock ideas'].model === 'gemma3:4b',
    'Bring all: the three come in from Ollama, with their messages, their own dates and their model', conv);
  const words = await p.evaluate(async () => { const c = state.chats.find(x => x.imported && x.title === 'A picture of the harbour'); if (!c) return null; try { const t = await IngBig.load(c.imported.ref); return typeof t === 'string' ? t : JSON.stringify(t); } catch (e) { return 'error ' + e.message; } });
  ok(words && /OLLAMA-MARK-3/.test(words) && /harbour\.jpg/.test(words) && !/a thought/.test(words), "its words come with it, the attachment named (the model's thinking is left out)", (words || '').slice(0, 240));
  const after = { db: sha(DB), wal: sha(DB + '-wal') }; const tmp1 = fs.readdirSync(os.tmpdir()).filter(n => n.startsWith('ingenium-ollama-')).length;
  ok(after.db === before.db && after.wal === before.wal && tmp1 === tmp0, "Ollama's files are the same, byte for byte, and no copy is left behind", { before, after, copiesLeft: tmp1 - tmp0 });
  holder.kill(); await new Promise(r => setTimeout(r, 500)); for (const x of ['', '-wal', '-shm']) try { fs.renameSync(DB + x, DB + x + '.away'); } catch (e) {}
  const none = await p.evaluate(() => window.pywebview.api.ollama_chats_find());
  ok(none.ok && none.found === false && /\.ollama[\\/]db\.sqlite$/.test((none.looked || [])[0] || ''), 'with no database, it says where it looked', none);
  ok(errs.length === 0, 'no page errors', errs);
  console.log('\n' + pass + ' passed, ' + fail + ' failed'); await b.close(); pr.kill(); process.exit(fail ? 1 : 0);
})().catch(e => { console.error(String(e && e.stack || e).slice(0, 1500)); process.exit(2); });
