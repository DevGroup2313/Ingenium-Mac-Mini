// Ingenium 6.2 · Ingenium's eyes (modules/r157.js), in Chromium. The owner asked (22 October 2026) that basic picture recognition
// work offline, with no projector and no model that can see. Checks:
//   - the picture reader rides in the page and starts with nothing fetched (every request off this computer is refused and
//     counted: none may be made);
//   - a photo: what it may show (the beach: seashore; the beagles: beagle), that it is a photo, the camera and the day the
//     camera wrote in it, its colours; no words made up from waves and fur;
//   - a screenshot of words: the words read, at the picture's own size and from the chat's smaller copy alone;
//   - the chat, with a model that reads text only: the picture is looked at, the model is sent what Ingenium saw before the
//     message, the message shows "What Ingenium saw", and nothing says the picture cannot be seen; after a reload (the
//     picture itself no longer kept) the description still goes with the message;
//   - with the switch off, the chat answers as before (the model reads text only, and how to get one that sees);
//   - with no model loaded, Ingenium answers with what it saw, and only adds the practice note when words were sent too;
//   - Settings: the card, its switches, and "Try it on a picture";
//   - the reader lets go of its memory and starts again; no page errors; axe finds nothing on the cards.
//   node rig/t_62_eyes.js http://127.0.0.1:8150/ingenium.html <out folder> <photos folder>
// The photos folder holds image1.jpg (the beach) and image2.jpg (the beagles), the demo pictures of TensorFlow.js's
// coco-ssd model: https://raw.githubusercontent.com/tensorflow/tfjs-models/master/coco-ssd/demo/image1.jpg (and image2.jpg).
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs'); const path = require('path');
const [URL_, OUT, PHOTOS] = process.argv.slice(2); fs.mkdirSync(OUT, { recursive: true });
const AXE = process.env.AXE_JS;
let pass = 0, fail = 0;
const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (d !== undefined ? '  ' + String(typeof d === 'string' ? d : JSON.stringify(d)).slice(0, 600) : '')); c ? pass++ : fail++; };
const shot = (p, n) => p.screenshot({ path: path.join(OUT, n + '.png') });
const b64 = f => fs.readFileSync(f).toString('base64');

async function boot(b, external) {
  const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } });
  await ctx.route('**/*', r => { const u = r.request().url();
    if (/^https?:\/\/(127\.0\.0\.1|localhost)[:/]/.test(u) || /^(blob|data):/.test(u)) return r.continue();
    external.push(u); return r.abort(); });
  const p = await ctx.newPage(); p.__errs = []; p.on('pageerror', e => p.__errs.push(e.message));
  await p.goto(URL_); await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 180000 }); await p.waitForTimeout(700);
  await p.evaluate(() => { const b = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Enter' && x.offsetParent); if (b) b.click(); });
  await p.waitForTimeout(500); await p.evaluate(() => go('chat')); await p.waitForTimeout(400); return p;
}
// a picture as a person would choose it: a File in the page, with the chat's smaller copy beside it
const asSrc = (p, name, mime, data) => p.evaluate(async ({ name, mime, data }) => {
  const bin = atob(data), u = new Uint8Array(bin.length); for (let i = 0; i < bin.length; i++) u[i] = bin.charCodeAt(i);
  const file = new File([u], name, { type: mime });
  const dataUrl = await new Promise(res => { const fr = new FileReader(); fr.onload = () => res(fr.result); fr.readAsDataURL(file); });
  window.__src = window.__src || {}; window.__src[name] = { name, dataUrl, file }; return true;
}, { name, mime, data });
// a screenshot of words, drawn in the page
const wordsShot = p => p.evaluate(async () => {
  const c = document.createElement('canvas'); c.width = 1000; c.height = 320; const x = c.getContext('2d');
  x.fillStyle = '#ffffff'; x.fillRect(0, 0, 1000, 320); x.fillStyle = '#1b1b1f'; x.font = '600 34px Arial, Helvetica, sans-serif';
  x.fillText('Quarterly report 2026', 40, 70); x.font = '28px Arial, Helvetica, sans-serif';
  x.fillText('Total revenue: 48,250 euros', 40, 140); x.fillText('Prepared by the finance team', 40, 200); x.fillText('Meeting on Friday at 10:30', 40, 260);
  const blob = await new Promise(res => c.toBlob(res, 'image/png')); const file = new File([blob], 'report.png', { type: 'image/png' });
  window.__src = window.__src || {}; window.__src['report.png'] = { name: 'report.png', dataUrl: c.toDataURL('image/png'), file };
  const small = document.createElement('canvas'); small.width = 768; small.height = Math.round(320 * 768 / 1000); small.getContext('2d').drawImage(c, 0, 0, small.width, small.height);
  window.__src['report-small'] = { name: 'report.jpg', dataUrl: small.toDataURL('image/jpeg', 0.85) }; return true;
});
const look = (p, name) => p.evaluate(n => IngEyes.look(window.__src[n]).then(s => s, e => ({ err: String(e && e.message || e) })), name);
const norm = t => String(t || '').toLowerCase().replace(/[^a-z0-9,:.]+/g, ' ');

// a model that reads text only, as the engine would hold it, its replies caught
const fakeModel = p => p.evaluate(() => {
  state.models = state.models || []; if (!state.models.some(m => m.id === 'eyes-test')) state.models.push({ id: 'eyes-test', customName: 'Velox (test)', fileState: 'ready', sizeBytes: 1 });
  state.activeModelId = 'eyes-test'; Engine.modelId = 'eyes-test'; Engine.status = 'ready'; Engine.adapter = { hasImageInput: false };
  window.__sent = []; Engine.generate = function (o) { window.__sent.push(o.messages); try { o.onToken && o.onToken('A reply from the test model.'); } catch (e) { } return Promise.resolve(); };
  try { chatNew && chatNew(); } catch (e) { } return true;
});
// a picture chosen in the chat, as the picture key hands it over, then sent
const sendPicture = (p, name, text) => p.evaluate(async ({ name, text }) => {
  const s = window.__src[name]; stageChatImage(s.file);
  for (let i = 0; i < 100 && !stagedImage; i++) await new Promise(r => setTimeout(r, 50));
  if (!stagedImage) return 'not staged';
  document.getElementById('chatInput').value = text || ''; sendChat(); return 'sent';
}, { name, text });
const msgs = p => p.evaluate(() => curMsgs().map(m => ({ role: m.role, text: String(m.text || '').slice(0, 300), seen: !!(m.seen && m.seen.v), card: !!m.seenCard, preview: !!m.preview })));

(async () => {
  const b = await pw.chromium.launch({ args: ['--no-sandbox', '--enable-unsafe-swiftshader', '--use-angle=swiftshader'] });
  const external = [];
  try {
    const p = await boot(b, external);
    ok(await p.evaluate(() => !!(window.IngEyes && IngEyes.available())), 'the picture reader rides in the page');
    let t0 = Date.now(); const w = await p.evaluate(() => IngEyes.warm().then(() => IngEyes.status(), e => ({ err: String(e && e.message || e) })));
    ok(w && w.classifier && w.reader, 'it starts: the classifier and the text recogniser (%s s, %s)'.replace('%s', ((Date.now() - t0) / 1000).toFixed(1)).replace('%s', w && w.backend), w);

    // ---- photos ----
    await asSrc(p, 'image1.jpg', 'image/jpeg', b64(path.join(PHOTOS, 'image1.jpg')));
    await asSrc(p, 'image2.jpg', 'image/jpeg', b64(path.join(PHOTOS, 'image2.jpg')));
    t0 = Date.now(); const beach = await look(p, 'image1.jpg'); const tb = (Date.now() - t0) / 1000;
    ok(beach.labels && ['seashore', 'sandbar', 'lakeside'].includes((beach.labels[0] || {}).name), 'the beach: it may show a seashore (%s s)'.replace('%s', tb.toFixed(1)), beach.labels);
    ok(beach.kind === 'photo' && /Canon/.test(beach.camera || '') && /\d{4}$/.test(beach.taken || ''), 'the beach: a photo, its camera and its day from what the camera wrote', [beach.kind, beach.camera, beach.taken]);
    ok(beach.colours && beach.colours.length >= 2 && beach.colours.every(c => c.name && c.share > 0 && /^#[0-9a-f]{6}$/.test(c.hex)), 'the beach: its colours, named', beach.colours);
    ok(beach.words !== null && beach.words.length < 30, 'the beach: no words made up from the waves', JSON.stringify(beach.words));
    ok(beach.w === 600 && beach.h === 399 && beach.bytes > 200000 && !beach.problems.length, 'the beach: its own size, read from the picture as chosen', [beach.w, beach.h, beach.bytes, beach.problems]);
    const dogs = await look(p, 'image2.jpg');
    ok(dogs.labels && (dogs.labels[0] || {}).name === 'beagle', 'the beagles: it may show a beagle', dogs.labels);

    // ---- a screenshot of words ----
    await wordsShot(p);
    t0 = Date.now(); const rep = await look(p, 'report.png'); const tr = (Date.now() - t0) / 1000;
    const rw = norm(rep.words);
    ok(/quarterly report 2026/.test(rw) && /48,250/.test(rw) && /finance team/.test(rw) && /friday/.test(rw), 'a screenshot of words: the words read (%s s)'.replace('%s', tr.toFixed(1)), rep.words);
    ok(['screenshot', 'document', 'drawing'].includes(rep.kind) && rep.kind !== 'photo', 'and it is not taken for a photo', rep.kind);
    const rs = await look(p, 'report-small');
    ok(/quarterly report/.test(norm(rs.words)) && /48,250/.test(norm(rs.words)), 'the words read from the chat\'s smaller copy alone', rs.words);

    // ---- the chat, a model that reads text only ----
    await fakeModel(p);
    ok(await sendPicture(p, 'image2.jpg', 'What breed are these dogs?') === 'sent', 'a picture and a question sent in the chat');
    await p.waitForFunction(() => window.__sent.length > 0, null, { timeout: 120000 }).catch(() => { });
    const sent = await p.evaluate(() => window.__sent[0] || null);
    const user = sent && [...sent].reverse().find(m => m.role === 'user');
    const uc = user ? (typeof user.content === 'string' ? user.content : JSON.stringify(user.content)) : '';
    ok(/Ingenium's own picture reader/.test(uc) && /beagle/.test(uc) && /What breed are these dogs\?$/.test(uc.trim()), 'the model is sent what Ingenium saw, before the message', uc.slice(0, 500));
    let ms = await msgs(p);
    ok(!ms.some(m => /does not report image input|reads text only|cannot see the picture/.test(m.text)), 'nothing says the picture cannot be seen', ms.map(m => m.text.slice(0, 80)));
    ok(ms.some(m => m.role === 'me' && m.seen) && ms.some(m => m.role === 'bot' && /reply from the test model/.test(m.text)) && !ms.some(m => /looking at the picture/.test(m.text)),
      'the message keeps what was seen, the model answers, the "looking" note is gone', ms);
    const cardInfo = await p.evaluate(() => { const c = document.querySelector('#chatScroll .eyes-card, .msg .eyes-card, .eyes-card'); return c ? { open: c.open, sum: c.querySelector('summary').textContent, rows: c.querySelectorAll('dt').length } : null; });
    ok(cardInfo && /What Ingenium saw/.test(cardInfo.sum) && /beagle/.test(cardInfo.sum) && !cardInfo.open && cardInfo.rows >= 4, 'the message shows "What Ingenium saw", folded', cardInfo);
    await p.evaluate(() => { const c = document.querySelector('.eyes-card'); if (c) c.open = true; c && c.scrollIntoView({ block: 'center' }); }); await p.waitForTimeout(300); await shot(p, 'chat-card');
    // after a reload the picture is gone; what was seen still goes with the message
    const after = await p.evaluate(() => { Object.keys(chatImages).forEach(k => delete chatImages[k]); const h = chatHistory(false); const u = h.filter(m => m.role === 'user').map(m => typeof m.content === 'string' ? m.content : '');
      return u.some(t => /Ingenium's own picture reader/.test(t) && /beagle/.test(t)); });
    ok(after, 'after a reload (the picture no longer kept) the description still goes with the message');

    // ---- the switch off: as before ----
    await p.evaluate(() => { state.eyes = false; window.__sent = []; });
    await sendPicture(p, 'image1.jpg', 'And this one?'); await p.waitForTimeout(1500);
    ms = await msgs(p); const last = ms[ms.length - 1];
    ok(/reads text only|does not report image input/.test(last.text) && !(await p.evaluate(() => window.__sent.length)), 'with the switch off, the chat answers as before', last.text);
    await p.evaluate(() => { state.eyes = true; });

    // ---- no model loaded ----
    await p.evaluate(() => { state.activeModelId = null; Engine.modelId = null; Engine.status = 'disconnected'; Engine.adapter = null; try { chatNew && chatNew(); } catch (e) { } });
    await sendPicture(p, 'image1.jpg', '');
    await p.waitForFunction(() => curMsgs().some(m => m.seenCard), null, { timeout: 120000 }).catch(() => { });
    ms = await msgs(p);
    ok(ms.some(m => m.card && /No model is loaded/.test(m.text)) && !ms.some(m => /practice text/.test(m.text)), 'with no model, Ingenium answers with what it saw (and no practice note for a picture alone)', ms);
    const open = await p.evaluate(() => { const c = [...document.querySelectorAll('.eyes-card')].pop(); return c ? c.open : null; });
    ok(open === true, 'its card is open');
    await shot(p, 'no-model');
    await sendPicture(p, 'report.png', 'Read this to me'); await p.waitForFunction(() => curMsgs().filter(m => m.seenCard).length >= 2, null, { timeout: 120000 }).catch(() => { }); await p.waitForTimeout(500);
    ms = await msgs(p);
    ok(ms.filter(m => m.card).length >= 2 && /practice text/.test(ms[ms.length - 1].text), 'with words sent too, the practice note follows what it saw', ms.slice(-3));

    // ---- Settings ----
    await p.evaluate(() => go('settings')); await p.waitForTimeout(600);
    const st = await p.evaluate(() => { const c = document.getElementById('ingEyesCard'); return c ? { on: document.getElementById('eyesOn').checked, words: document.getElementById('eyesWords').checked, after: c.previousElementSibling && c.previousElementSibling.id } : null; });
    ok(st && st.on && st.words, 'Settings: Ingenium\'s eyes, its two switches on', st);
    const nt = await p.evaluate(() => { const d = document.querySelector('#ingEyesCard .ey-notice pre'); return d ? d.textContent : ''; });
    ok(/TensorFlow\.js 4\.22\.0/.test(nt) && /Tesseract\.js 5\.1\.1/.test(nt) && /Apache License, Version 2\.0/.test(nt) && /regenerator-runtime/.test(nt), 'and its parts\' authors and their notices', nt.slice(0, 120));
    await p.click('#ingEyesCard label.eswitch:has(#eyesWords)'); const wOff = await p.evaluate(() => state.eyesWords === false);
    await p.click('#ingEyesCard label.eswitch:has(#eyesWords)'); const wOn = await p.evaluate(() => state.eyesWords !== false);
    ok(wOff && wOn, 'a switch changes the setting and back');
    await p.setInputFiles('#ingEyesCard input[type=file]', path.join(PHOTOS, 'image2.jpg'));
    await p.waitForSelector('#ingEyesCard .ey-out .eyes-card', { timeout: 120000 }).catch(() => { });
    const tryIt = await p.evaluate(() => { const c = document.querySelector('#ingEyesCard .ey-out .eyes-card'); return c ? c.querySelector('summary').textContent : null; });
    ok(tryIt && /beagle/.test(tryIt), '"Try it on a picture" shows what it saw', tryIt);
    await p.evaluate(() => document.getElementById('ingEyesCard').scrollIntoView({ block: 'start' })); await p.waitForTimeout(300); await shot(p, 'settings');
    if (AXE) {
      await p.addScriptTag({ path: AXE });
      const v = await p.evaluate(async () => { const r = await axe.run({ include: [['#ingEyesCard']] }, { runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'] } }); return r.violations.map(x => x.id + ': ' + x.nodes.map(n => n.target.join(' ')).join(', ')); });
      ok(!v.length, 'axe: nothing on the Settings card or the card it shows', v);
      await p.evaluate(() => go('chat')); await p.waitForTimeout(500);
      const v2 = await p.evaluate(async () => { const r = await axe.run({ include: [['.eyes-card']] }, { runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'] } }); return r.violations.map(x => x.id + ': ' + x.nodes.map(n => n.target.join(' ')).join(', ')); });
      ok(!v2.length, 'axe: nothing on the cards in the chat', v2);
    }

    // ---- it lets go, and starts again ----
    await p.evaluate(() => IngEyes.sleep());
    const slept = await p.evaluate(() => IngEyes.status());
    const again = await look(p, 'image2.jpg');
    ok(!slept.classifier && !slept.reader && again.labels && again.labels[0].name === 'beagle', 'it lets go of its memory, and starts again when asked', [slept, again.labels && again.labels[0]]);
    // night
    await p.evaluate(() => { document.body.setAttribute('data-theme', 'night'); go('chat'); }); await p.waitForTimeout(500);
    await p.evaluate(() => { const c = document.querySelector('.eyes-card'); if (c) { c.open = true; c.scrollIntoView({ block: 'center' }); } }); await p.waitForTimeout(300); await shot(p, 'chat-card-night');

    ok(!external.length, 'nothing was fetched from off this computer', external.slice(0, 5));
    ok(!p.__errs.length, 'no page errors', p.__errs.slice(0, 5));
  } catch (e) { ok(false, 'the run crashed', e.stack); }
  await b.close();
  console.log(`\n${pass} passed, ${fail} failed`); process.exit(fail ? 1 : 0);
})();
