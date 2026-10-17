// R119: the Inbox, Carpe Diem's 💭 in Ingenium's colours. Ctrl and the full stop (page and frames), the quill line
// (grows, drags and keeps its place, minimises into the 💭 and comes back), Keep with the letters drifting into the 💭,
// the Inbox and each place a thought can go, the suggestion by the model, the Focus page and the quiet screen.
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs');
const URL_ = process.argv[2], OUT = process.argv[3]; fs.mkdirSync(OUT, { recursive: true });
let pass = 0, fail = 0;
const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (d !== undefined ? '  ' + String(d).slice(0, 300) : '')); c ? pass++ : fail++; };
(async () => {
  const b = await pw.chromium.launch(); const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
  const errs = []; p.on('pageerror', e => errs.push(e.message.slice(0, 200)));
  await p.goto(URL_); await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 120000 }); await p.waitForTimeout(1200);
  await p.evaluate(() => { const b = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Enter' && x.offsetParent); if (b) b.click(); });
  await p.evaluate(() => { state.parked = [{ id: 'old1', t: 'An old parked thought', at: Date.now() - 3600e3 }]; state.reminders = []; try { localStorage.removeItem('ing_thought_pos_v1'); } catch (e) {} saveState(); go('home'); });
  const parts = await p.evaluate(() => window.__ingParts);
  ok(parts.p50 === 'running', 'the Inbox part (p50) runs', parts.p50);
  const fab = await p.evaluate(() => { const f = document.getElementById('fabPark'); return { title: f.title, glyph: f.textContent.trim() }; });
  ok(fab.glyph === '💭' && /^Catch a thought \(1 in the Inbox\)$/.test(fab.title), 'the 💭 in the side column catches a thought and names how many wait', JSON.stringify(fab));

  // 1. Ctrl and the full stop opens the quill line; it grows with the words
  await p.keyboard.press('Control+Period'); await p.waitForTimeout(700);
  const q = await p.evaluate(() => { const c = document.getElementById('ing-capture'); if (!c) return null; const r = c.getBoundingClientRect(); return { keys: [...c.querySelectorAll('button')].map(b => b.textContent), focus: document.activeElement && document.activeElement.id, top: Math.round(r.top), h: Math.round(r.height), bg: getComputedStyle(c).backgroundImage.slice(0, 60) }; });
  ok(q && q.keys.join('|') === 'Keep|Inbox · 1|−|✕' && q.focus === 'ing-capture-in', 'Ctrl and the full stop opens the quill line: Keep, Inbox · 1, minimise and close, the line ready to write', JSON.stringify(q));
  ok(q && /255, 254, 255|fffeff/i.test(q.bg), 'its paper is Ingenium\'s lavender-white', q && q.bg);
  await p.keyboard.type('Ask the supervisor about chapter two'); await p.keyboard.press('Enter'); await p.keyboard.type('and the reading list');
  const grew = await p.evaluate(() => { const c = document.getElementById('ing-capture'); return { h: Math.round(c.getBoundingClientRect().height), tall: c.classList.contains('ing-cap-tall'), ink: parseFloat(c.querySelector('.ing-cap-ink').style.width) }; });
  ok(grew.h > q.h && grew.tall && grew.ink > 50, 'Enter starts a new line and the line grows with its words, the gold rule growing under them', JSON.stringify(grew));
  await p.screenshot({ path: OUT + '/inbox-quill.png' });
  // 2. it is dragged and keeps its place
  const box = await p.evaluate(() => { const r = document.getElementById('ing-capture').getBoundingClientRect(); return { x: r.left, y: r.top }; });
  await p.mouse.move(box.x + 8, box.y + 8); await p.mouse.down(); await p.mouse.move(box.x + 8 - 200, box.y + 8 + 260, { steps: 6 }); await p.mouse.up(); await p.waitForTimeout(200);
  const moved = await p.evaluate(() => { const r = document.getElementById('ing-capture').getBoundingClientRect(); let saved = null; try { saved = JSON.parse(localStorage.getItem('ing_thought_pos_v1')); } catch (e) {} return { x: Math.round(r.left), y: Math.round(r.top), saved }; });
  ok(Math.abs(moved.x - (box.x - 200)) < 3 && Math.abs(moved.y - (box.y + 260)) < 3 && moved.saved && moved.saved.y === moved.y, 'dragged by its edge it moves, and its place is kept for next time', JSON.stringify(moved));
  // 3. minimised it folds into the 💭 with its words; the 💭 brings it back
  await p.evaluate(() => document.querySelector('#ing-capture .ing-cap-min').click()); await p.waitForTimeout(700);
  const tucked = await p.evaluate(() => ({ gone: document.getElementById('ing-capture').classList.contains('ing-cap-gone'), title: document.getElementById('fabPark').title }));
  ok(tucked.gone && /^Bring back your thought/.test(tucked.title), 'minimised, the line folds into the 💭, whose name becomes Bring back your thought', JSON.stringify(tucked));
  await p.evaluate(() => document.getElementById('fabPark').click()); await p.waitForTimeout(700);
  const back = await p.evaluate(() => ({ shown: !document.getElementById('ing-capture').classList.contains('ing-cap-gone'), words: document.getElementById('ing-capture-in').value }));
  ok(back.shown && back.words === 'Ask the supervisor about chapter two\nand the reading list', 'the 💭 brings it back with its words', JSON.stringify(back));
  // 4. Keep: the letters drift into the 💭, the 💭 counts, a word to say so
  await p.evaluate(() => document.querySelector('#ing-capture .ing-cap-keep').click()); await p.waitForTimeout(200);
  const motes = await p.evaluate(() => document.querySelectorAll('.ing-cap-mote').length);
  await p.screenshot({ path: OUT + '/inbox-drift.png' });
  await p.waitForTimeout(2600);
  const kept = await p.evaluate(() => ({ n: state.parked.length, first: state.parked[0].t, pane: !!document.getElementById('ing-capture'), motes: document.querySelectorAll('.ing-cap-mote').length, title: document.getElementById('fabPark').title, toast: (document.getElementById('ingToast') || {}).textContent }));
  ok(motes > 20, 'kept, the words drift letter by letter toward the 💭', 'letters in flight: ' + motes);
  ok(kept.n === 2 && /^Ask the supervisor/.test(kept.first) && !kept.pane && kept.motes === 0 && /\(2 in the Inbox\)/.test(kept.title) && /Kept in the Inbox/.test(kept.toast || ''), 'the thought is first in the Inbox, the line and the letters are gone, and the 💭 counts two', JSON.stringify(kept));
  // 5. Esc closes without keeping; Ctrl and Enter keeps
  await p.keyboard.press('Control+Period'); await p.waitForTimeout(400); await p.keyboard.type('a passing worry'); await p.keyboard.press('Escape'); await p.waitForTimeout(500);
  const esc = await p.evaluate(() => ({ pane: !!document.getElementById('ing-capture'), n: state.parked.length }));
  ok(!esc.pane && esc.n === 2, 'Esc closes the line and keeps nothing', JSON.stringify(esc));
  await p.evaluate(() => { document.body.setAttribute('data-motion', 'minimal'); }); // calm: it simply appears and goes
  await p.keyboard.press('Control+Period'); await p.waitForTimeout(200); await p.keyboard.type('Buy printer ink'); await p.keyboard.press('Control+Enter'); await p.waitForTimeout(300);
  const ce = await p.evaluate(() => ({ pane: !!document.getElementById('ing-capture'), n: state.parked.length, motes: document.querySelectorAll('.ing-cap-mote').length }));
  ok(!ce.pane && ce.n === 3 && ce.motes === 0, 'Ctrl and Enter keeps it; with less motion it simply goes, with no drift', JSON.stringify(ce));
  // 6. Ctrl and the full stop inside the whole Tabula's frame
  await p.evaluate(() => go('tabula')); await p.waitForSelector('#ingApp-tabula'); await p.waitForTimeout(3500);
  const inFrame = await p.evaluate(async () => { const f = document.getElementById('ingApp-tabula'); f.contentWindow.focus(); const ev = new f.contentWindow.KeyboardEvent('keydown', { key: '.', code: 'Period', ctrlKey: true, bubbles: true, cancelable: true }); f.contentDocument.body.dispatchEvent(ev); await new Promise(r => setTimeout(r, 300)); const open = !!document.getElementById('ing-capture'); const c = document.querySelector('#ing-capture .ing-cap-x'); if (c) c.click(); await new Promise(r => setTimeout(r, 200)); return { open, prevented: ev.defaultPrevented }; });
  ok(inFrame.open && inFrame.prevented, 'Ctrl and the full stop works inside Tabula\'s frame too', JSON.stringify(inFrame));
  await p.evaluate(() => document.body.setAttribute('data-motion', 'calm'));

  // 7. the Inbox and each place
  await p.evaluate(() => { go('home'); IngInbox.open(); }); await p.waitForTimeout(500);
  const ib = await p.evaluate(() => ({ title: document.querySelector('#modalBox h3').textContent, items: [...document.querySelectorAll('#ibList .ib-item .ib-t')].map(x => x.textContent), acts: [...document.querySelectorAll('#ibList .ib-item')][0] && [...[...document.querySelectorAll('#ibList .ib-item')][0].querySelectorAll('.ib-acts button')].map(b => b.textContent), foot: [...document.querySelectorAll('#ibFoot button')].map(b => b.textContent) }));
  ok(ib.title === '💭 The Inbox' && ib.items.length === 3 && ib.items[0] === 'Buy printer ink' && ib.items[2] === 'An old parked thought', 'the Inbox holds them newest first, with her old parked thought among them', JSON.stringify(ib.items));
  ok(ib.acts.join('|') === '🗒️ To a note|📝 To Tabula|🪜 Steps|💬 To the chat|🔔 A reminder|✓ Done' && ib.foot.includes('+ Catch another') && ib.foot.includes('✨ Suggest where each goes') && ib.foot.includes('Let them all go'), 'each thought can go to a note, Tabula, steps, the chat, a reminder, or be done; the foot catches another, suggests, lets all go', JSON.stringify({ acts: ib.acts, foot: ib.foot }));
  await p.screenshot({ path: OUT + '/inbox-sheet.png' });
  // a reminder
  await p.evaluate(() => { const row = [...document.querySelectorAll('#ibList .ib-item')].find(r => /printer ink/.test(r.textContent)); [...row.querySelectorAll('button')].find(b => /reminder/.test(b.textContent)).click(); }); await p.waitForTimeout(300);
  const rem = await p.evaluate(() => ({ rem: state.reminders.map(r => r.text), n: state.parked.length, rows: document.querySelectorAll('#ibList .ib-item').length, badge: (document.getElementById('bellBadge') || {}).textContent }));
  ok(rem.rem.includes('Buy printer ink') && rem.n === 2 && rem.rows === 2 && rem.badge === '1', 'A reminder sends it to the bell, and the Inbox redraws without it', JSON.stringify(rem));
  // a note
  const notesBefore = await p.evaluate(() => (state.notes || []).length);
  await p.evaluate(() => { const row = [...document.querySelectorAll('#ibList .ib-item')].find(r => /old parked/.test(r.textContent)); [...row.querySelectorAll('button')].find(b => /To a note/.test(b.textContent)).click(); }); await p.waitForTimeout(300);
  const note = await p.evaluate(() => ({ text: state.notes[0].text, pinned: state.notes[0].pinned, n: state.parked.length }));
  ok(note.text === 'An old parked thought' && note.pinned && note.n === 1, 'To a note pins it as a Schedae note', JSON.stringify(note));
  // to Tabula: it arrives in the whole Tabula
  await p.evaluate(() => { const row = document.querySelector('#ibList .ib-item'); [...row.querySelectorAll('button')].find(b => /To Tabula/.test(b.textContent)).click(); });
  await p.waitForFunction(() => { const f = document.getElementById('ingApp-tabula'); try { return /Ask the supervisor about chapter two/.test(f.contentDocument.getElementById('editor').innerText); } catch (e) { return false; } }, null, { timeout: 30000 }).then(() => ok(true, 'To Tabula sends it into the whole Tabula'), () => ok(false, 'To Tabula sends it into the whole Tabula'));
  const tab = await p.evaluate(() => ({ page: document.querySelector('.section.active').id, n: state.parked.length }));
  ok(tab.page === 'page-tabula' && tab.n === 0, 'Tabula\'s page opens and the Inbox is empty', JSON.stringify(tab));

  // 8. the model's suggestion: a stand-in model answers; nothing moves until Do it
  await p.evaluate(() => { state.parked = [{ id: 's1', t: 'Write the abstract for the conference', at: Date.now() }, { id: 's2', t: 'Is a mixed-methods design right for chapter three?', at: Date.now() - 1000 }, { id: 's3', t: 'The idea about seasons in the calm room', at: Date.now() - 2000 }]; saveState();
    window.__asked = null; supAsk = function (prompt) { window.__asked = prompt; return Promise.resolve('1: task, it has several parts\n2: chat, a question to think through\n3: note, worth keeping'); }; go('home'); IngInbox.open(); });
  await p.waitForTimeout(300);
  await p.evaluate(() => document.getElementById('ibSuggest').click()); await p.waitForTimeout(500);
  const sug = await p.evaluate(() => ({ asked: /one word/.test(window.__asked || '') && /1\. Write the abstract/.test(window.__asked || ''), chips: [...document.querySelectorAll('#ibList .ib-sug')].map(s => s.textContent), n: state.parked.length }));
  ok(sug.asked && sug.chips.length === 3 && /suggests a task with steps: it has several parts/.test(sug.chips[0]) && /suggests the chat/.test(sug.chips[1]) && /suggests a note/.test(sug.chips[2]) && sug.n === 3, 'the model on this device suggests a place for each, and nothing moves yet', JSON.stringify(sug.chips));
  await p.screenshot({ path: OUT + '/inbox-suggest.png' });
  await p.evaluate(() => { const row = [...document.querySelectorAll('#ibList .ib-item')].find(r => /seasons/.test(r.textContent)); row.querySelector('.ib-sug button').click(); }); await p.waitForTimeout(300);
  const did = await p.evaluate(() => ({ note: state.notes[0].text, n: state.parked.length, left: [...document.querySelectorAll('#ibList .ib-t')].map(x => x.textContent) }));
  ok(/seasons in the calm room/.test(did.note) && did.n === 2 && did.left.length === 2, 'Do it carries out the suggestion she agrees with', JSON.stringify(did));
  // let them all go
  await p.evaluate(() => { window.confirm = () => true; [...document.querySelectorAll('#ibFoot button')].find(b => /Let them all go/.test(b.textContent)).click(); }); await p.waitForTimeout(200);
  const empty = await p.evaluate(() => ({ n: state.parked.length, text: (document.querySelector('#ibList .ib-empty') || {}).textContent }));
  ok(empty.n === 0 && empty.text === 'The Inbox is empty. A clear head.', 'Let them all go clears the Inbox: a clear head', JSON.stringify(empty));
  await p.evaluate(() => closeModal());

  // 9. the Focus page and the quiet screen
  await p.evaluate(() => { state.parked = [{ id: 'f1', t: 'Email the librarian', at: Date.now() }]; saveState(); go('focus'); fxRenderPark(); }); await p.waitForTimeout(600);
  const fx = await p.evaluate(() => { const c = document.getElementById('fxParkCard'); return { head: c.querySelector('h2').textContent, keys: [...c.querySelectorAll('.ib-foot button')].map(b => b.textContent), item: (c.querySelector('.ib-item .ib-t') || {}).textContent, acts: c.querySelectorAll('.ib-item .ib-acts button').length }; });
  ok(fx.head === '💭 The Inbox' && fx.keys[0] === '💭 Catch a thought' && /Open the Inbox · 1/.test(fx.keys[1]) && fx.item === 'Email the librarian' && fx.acts === 6, 'the Focus page holds the Inbox, with the same places for each thought', JSON.stringify(fx));
  await p.evaluate(() => document.getElementById('fxParkCard').scrollIntoView({ block: 'center' })); await p.waitForTimeout(300);
  await p.screenshot({ path: OUT + '/inbox-focus.png' });
  await p.evaluate(() => quietOpen()); await p.waitForTimeout(300);
  const qs = await p.evaluate(async () => { const k = document.getElementById('qsCatch'); if (!k) return null; k.click(); await new Promise(r => setTimeout(r, 400)); const c = document.getElementById('ing-capture'); const z = c ? +getComputedStyle(c).zIndex : 0; const zq = +getComputedStyle(document.getElementById('quietScreen')).zIndex; return { key: k.textContent, open: !!c, above: z > zq }; });
  ok(qs && qs.key === '💭 A thought came in' && qs.open && qs.above, 'the quiet screen has "A thought came in", and the line opens above it', JSON.stringify(qs));
  // by night
  await p.evaluate(() => { document.body.setAttribute('data-theme', 'night'); document.getElementById('ing-capture-in').value = 'A thought by night'; document.getElementById('ing-capture-in').dispatchEvent(new Event('input')); quietClose(); }); await p.waitForTimeout(300);
  const night = await p.evaluate(() => getComputedStyle(document.getElementById('ing-capture')).backgroundImage.slice(0, 50));
  ok(/49, 40, 64|312840/i.test(night), 'by night the line wears Ingenium\'s plum', night);
  await p.screenshot({ path: OUT + '/inbox-night.png' });
  await p.evaluate(() => { document.querySelector('#ing-capture .ing-cap-x').click(); document.body.setAttribute('data-theme', 'day'); });
  // the tour's words
  const tour = await p.evaluate(() => { const s = ING_TOUR.find(x => x.sub === 'The Inbox'); return s && s.b; });
  ok(/Ctrl and the full stop/.test(tour || ''), 'the tour describes the Inbox', (tour || '').slice(0, 80));
  ok(errs.length === 0, 'no page errors', errs.join(' | '));
  console.log('\n' + pass + ' passed, ' + fail + ' failed'); await b.close(); process.exit(fail ? 1 : 0);
})().catch(e => { console.log('CRASH', e); process.exit(2); });
