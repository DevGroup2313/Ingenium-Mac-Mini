// node rig/t_656_ears.js <Ingenium page url> <out dir> <a 48 kHz mono WAV of English speech> [<the same in French>]
// Ingenium 6.56 (8 November 2026), in Chromium. Her words (8 November 2026): "I want for Scriba and its speech models to be wired
// into the Chats pages compose text box instead sending it outside of the app to another provider. I want everything kept in-house
// where possible."
// The page is served with the release "speech-vendor" unpacked beside it as speech/ (as the computer apps can carry it), and the
// browser's fake microphone plays the recording (Chromium's --use-file-for-fake-audio-capture, played again and again).
//   - the microphone key is shown, and its words say it writes on this device;
//   - pressed, it listens, and the recording's words appear in the message box, a phrase at a time; pressed again, it stops;
//   - the browser's speech service is never started, and no request leaves this computer while it listens and writes;
//   - the engine and the model came from beside the page; the English model is Moonshine base;
//   - Settings, Models and AI, Search, eyes and ears holds the Dictation card: its language, Get it ready now, and the browser's
//     service off unless she turns it on; only with it on does the note about the sound being sent away appear;
//   - with the French recording and French chosen, French words appear (Whisper base);
//   - no errors on the page.
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs');
const [URL_, OUT, CLIP_EN, CLIP_FR] = process.argv.slice(2);
fs.mkdirSync(OUT, { recursive: true });
let pass = 0, fail = 0; function ok(c, m, d) { if (c) { pass++; console.log('ok   ' + m); } else { fail++; console.log('FAIL ' + m + (d !== undefined ? ' :: ' + JSON.stringify(d).slice(0, 900) : '')); } }
const HOST = new URL(URL_).host;
async function launch(clip) {
  return pw.chromium.launch({ args: ['--use-fake-ui-for-media-stream', '--use-fake-device-for-media-stream', '--use-file-for-fake-audio-capture=' + clip, '--autoplay-policy=no-user-gesture-required'] }); }
async function open(b) { const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, permissions: ['microphone'] }); const p = await ctx.newPage(); const errs = [], away = [];
  p.on('pageerror', e => errs.push(e.message.slice(0, 200)));
  p.on('request', r => { try { const u = new URL(r.url()); if (/^https?:$/.test(u.protocol) && u.host !== HOST) away.push(r.url().slice(0, 160)); } catch (e) {} });
  await p.goto(URL_); await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 300000 }); await p.waitForTimeout(1000);
  await p.evaluate(() => { const k = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Enter' && x.offsetParent); if (k) k.click(); }); await p.waitForTimeout(800);
  await p.evaluate(() => { try { const k = [...document.querySelectorAll('button')].find(x => /^Not now$/.test(x.textContent.trim()) && x.offsetParent); if (k) k.click(); } catch (e) {} });
  await p.evaluate(() => { try { tourEnd && tourEnd(); } catch (e) {} try { go('chat'); newChat(); } catch (e) {} });
  /* the browser's own service is counted if anything starts it */
  await p.evaluate(() => { window.__srMade = 0; ['SpeechRecognition', 'webkitSpeechRecognition'].forEach(n => { const O = window[n]; if (!O) return; window[n] = function () { window.__srMade++; return new O(); }; }); });
  await p.waitForTimeout(600); return { ctx, p, errs, away }; }
async function dictate(p, want, ms) {
  await p.evaluate(() => { const i = document.getElementById('chatInput'); i.value = ''; i.dispatchEvent(new Event('input', { bubbles: true })); });
  await p.click('#chatMicBtn'); const t0 = Date.now();
  let txt = ''; while (Date.now() - t0 < ms) { await p.waitForTimeout(1000); txt = await p.evaluate(() => document.getElementById('chatInput').value); if (want.test(txt)) break; }
  const during = await p.evaluate(() => ({ rec: document.getElementById('chatMicBtn').classList.contains('rec'), line: (document.getElementById('ingEarsLine') || {}).textContent || '' }));
  await p.click('#chatMicBtn'); await p.waitForTimeout(2500);
  const after = await p.evaluate(() => ({ rec: document.getElementById('chatMicBtn').classList.contains('rec'), listening: IngEars.listening(), text: document.getElementById('chatInput').value, from: IngEars.from(), sr: window.__srMade }));
  return { txt, during, after, secs: Math.round((Date.now() - t0) / 1000) }; }
(async () => {
  let b = await launch(CLIP_EN), A = await open(b), p = A.p;
  // 1. the key
  const k = await p.evaluate(() => { const m = document.getElementById('chatMicBtn'); return { shown: !!(m && !m.hidden && m.getClientRects().length), title: m && m.title, device: IngEars.deviceOk(), browser: IngEars.browserChosen() }; });
  ok(k.shown, 'the microphone key is shown in the message box', k);
  ok(/on this device/.test(k.title || '') && /never sent away/.test(k.title || ''), 'its words say it writes on this device and the voice is never sent away', k.title);
  ok(k.device && !k.browser, 'this device can run the speech model, and the browser\'s service is not chosen', k);
  // 2. English
  const awayBefore = A.away.length;
  const en = await dictate(p, /thesis.*open|open.*thesis/i, 150000);
  ok(en.during.rec && /Listening on this device/.test(en.during.line + '') || /Writing|ready/.test(en.during.line + ''), 'while it listens the key shows it and the line under the box says so', en.during);
  ok(/summari[sz]e/i.test(en.after.text) && /thesis/i.test(en.after.text) && /questions/i.test(en.after.text) && /still open/i.test(en.after.text), 'the recording\'s words appear in the message box (' + en.secs + ' s): ' + en.after.text.slice(0, 120), en.after.text.slice(0, 300));
  ok(!en.after.rec && !en.after.listening, 'pressed again, it stops listening', en.after);
  ok(en.after.sr === 0, 'the browser\'s speech service was never started', en.after.sr);
  ok(A.away.length === awayBefore, 'no request left this computer while it listened and wrote', A.away.slice(awayBefore, awayBefore + 8));
  ok(en.after.from.runtime === 'beside' && en.after.from.models === 'beside', 'the engine and the model came from beside the page', en.after.from);
  ok(/moonshine-base/.test(en.after.from.model || ''), 'English is written by Moonshine base, as in Scriba', en.after.from.model);
  await p.screenshot({ path: OUT + '/ears_chat.png' });
  // 3. Settings
  const st = await p.evaluate(async () => { go('settings'); await new Promise(r => setTimeout(r, 900));
    const tabs = [...document.querySelectorAll('#page-settings .dx-tab, #page-settings [role="tab"]')].filter(x => x.getClientRects().length).map(x => x.textContent.trim());
    const ai = [...document.querySelectorAll('#page-settings [role="tab"], #page-settings button')].find(x => /^Models and AI/.test(x.textContent.trim()) && x.getClientRects().length); if (ai) ai.click(); await new Promise(r => setTimeout(r, 500));
    const se = [...document.querySelectorAll('#page-settings .dx-tab')].find(x => /Search, eyes and ears/.test(x.textContent) && x.getClientRects().length); if (se) se.click(); await new Promise(r => setTimeout(r, 600));
    const c = document.getElementById('ingEarsCard'); if (!c) return { card: false, tabs };
    return { card: true, shown: !!c.getClientRects().length, section: !!se, lang: !!c.querySelector('#earsLang'), ready: [...c.querySelectorAll('button')].some(x => /Get it ready now/.test(x.textContent)),
      browser: c.querySelector('#earsBrowser') ? c.querySelector('#earsBrowser').checked : null, state: (c.querySelector('.ears-state') || {}).textContent || '', text: c.textContent.slice(0, 400) }; });
  ok(st.card && st.shown && st.section, 'Settings, Models and AI, Search, eyes and ears shows the Dictation card', st);
  ok(st.lang && st.ready, 'it holds the language and Get it ready now', st);
  ok(st.browser === false || st.browser === null, 'the browser\'s speech service is off unless she turns it on', st.browser);
  await p.screenshot({ path: OUT + '/ears_settings.png' });
  // 4. the note about the sound being sent away appears only with the browser's service chosen
  const note = await p.evaluate(async () => { const r = {}; go('chat'); await new Promise(x => setTimeout(x, 400)); state.dictateToldAt = 0;
    r.deviceNote = !!document.getElementById('r180Said');
    state.dictate.engine = 'browser'; document.getElementById('chatMicBtn').click(); await new Promise(x => setTimeout(x, 500));
    r.browserNote = !!document.getElementById('r180Said'); try { document.getElementById('r180Not').click(); } catch (e) {} state.dictate.engine = 'device'; return r; });
  ok(!note.deviceNote && note.browserNote, 'the note about the sound being sent away appears only when the browser\'s service is chosen', note);
  ok(A.errs.length === 0, 'no errors on the page', A.errs);
  await b.close();
  // 5. French
  if (CLIP_FR) { b = await launch(CLIP_FR); A = await open(b); p = A.p;
    await p.evaluate(() => { state.dictate = { lang: 'fr' }; });
    const awayB = A.away.length;
    const fr = await dictate(p, /motivation/i, 150000);
    /* Whisper base is weaker on French than Moonshine on English, and the test's voice is a synthetic one (espeak-ng): the check is that
       French words come, by the French model, with nothing sent away; the words written are printed for the record */
    ok(/motivation/i.test(fr.after.text) && /poste/i.test(fr.after.text) && /\b(je|une|pour|un)\b/i.test(fr.after.text), 'with French chosen, the French recording\'s words appear (' + fr.secs + ' s): ' + fr.after.text.slice(0, 120), fr.after.text.slice(0, 300));
    ok(/whisper-base/.test(fr.after.from.model || ''), 'French is written by Whisper base', fr.after.from.model);
    ok(A.away.length === awayB && fr.after.sr === 0, 'and nothing left this computer for it', A.away.slice(awayB, awayB + 6));
    ok(A.errs.length === 0, 'no errors on the page (French)', A.errs);
    await b.close(); }
  console.log(`\n${pass} passed, ${fail} failed`); process.exit(fail ? 1 : 0);
})().catch(e => { console.error(e); process.exit(2); });
