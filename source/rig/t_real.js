const { start, send } = require('./lib.js');
const fs = require('fs');
(async () => {
  const S = process.env.S, T = process.env.T, TAG = process.env.TAG || T;
  const { browser, page, logs } = await start({ viewport: { width: 1440, height: 900 } });
  await page.evaluate(() => { go('chat'); const b = document.getElementById('chatNew'); if (b) b.click(); });
  await page.waitForTimeout(600);
  if (process.env.MODEL) await page.evaluate((id) => { setActive(id, { fromUser: true }); }, process.env.MODEL);
  if (process.env.FILE) { await page.evaluate(() => go('chat')); await page.setInputFiles('#chatAnyFile', process.env.FILE); await page.waitForTimeout(2500); }
  const r = await send(page, process.env.Q, 1500000);
  await page.waitForTimeout(4000);
  await page.screenshot({ path: S + '/shots/' + TAG + '.png' });
  const sent = await page.evaluate(() => window.__sent);
  const s0 = sent[sent.length - 1] || { messages: [], params: {} };
  console.log('SECS', r.secs, 'PARAMS', JSON.stringify(s0.params));
  s0.messages.forEach((m, i) => console.log('MSG', i, m.role, m.content.length, JSON.stringify(m.role === 'system' ? m.content.slice(0, 160) : m.content.slice(-700))));
  const info = await page.evaluate(async () => {
    const ms = curMsgs(), m = ms[ms.length - 1], u = mkPrevMe(m);
    const o = { want: u && u.want, note: m.note, doc: m.doc ? { title: m.doc.title, words: mkWords(m.doc.md), fmt: m.doc.fmt } : null, edits: m.edits ? m.edits.map(e => ({ file: e.file, kind: e.kind, ok: e.ok, kept: e.kept, pairs: e.pairs, hasDocx: !!e.docx })) : null, stage: csCur ? { kind: csCur.kind, name: csCur.name } : null, thinkLen: (m.think || '').length, ctxLoaded: DeskAdapter.loaded && DeskAdapter.loaded.ctx };
    if (m.edits && m.edits[0] && m.edits[0].docx) o.docxB64 = await IngBig.load(m.edits[0].docx);
    o.cards = [...document.querySelectorAll('#chatScroll .msg:last-child .mk-card')].map(c => c.innerText.replace(/\s+/g, ' ').slice(0, 220));
    return o;
  });
  if (info.docxB64) { fs.writeFileSync(S + '/fixtures/' + TAG + '.docx', Buffer.from(info.docxB64, 'base64')); delete info.docxB64; }
  console.log('INFO', JSON.stringify(info, null, 1));
  console.log('=== REPLY ===\n' + r.text.slice(0, 2500));
  console.log(logs.filter(l => /error|R101/i.test(l)).slice(0, 15).join('\n'));
  await browser.close();
})().catch(e => { console.error('FAIL', e); process.exit(1); });
