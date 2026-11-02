// node rig/t_695_openin.js <Ingenium page url> <out dir>
// Ingenium 6.9.1 (30 October 2026), in Chromium. The owner's words: "I want the Word documents created on the Chats page, Lector
// Page or Career studio to be able to be sent and opened in Tabula or the Excel spreadsheets to be able to be opened in
// Abacus, and the powerpoint slides in Imago and so forth. [...] I want every page and feature to be aware of each other."
// modules/r194.js (IngOpenIn), with r108 and r188:
//   - a document written in the chat opens in Tabula as the Word file its key saves (headings, words), on the Desk;
//   - a spreadsheet opens in Abacus as the workbook, its numbers in the cells; slides open in Imago, every slide there;
//   - Tabula holding words: the next document opens in a second Tabula window, the first left as it was;
//   - inside Tabula's File menu, From Ingenium lists what the chat made and opens one; Abacus and Imago have the key too;
//   - the Career Studio's document has Open in Tabula, and its documents are in the list; the reading page's key is there;
//   - a file Imago asks the host to download is saved; no errors on the page.
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs');
const URL_ = process.argv[2], OUT = process.argv[3]; fs.mkdirSync(OUT, { recursive: true });
let pass = 0, fail = 0; const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (c || d === undefined ? '' : '  ' + String(typeof d === 'string' ? d : JSON.stringify(d)).slice(0, 700))); c ? pass++ : fail++; };
const DOC = '<document title="Notes on the Tudor letter">\n# Notes on the Tudor letter\n\nThe letter of 1536 survives in two copies.\n\n## The hand\n\nA secretary hand, with the signature in italic.\n</document>';
const SHEET = 'Reading plan for the term\n```csv\nWeek,Book,Pages\n1,Letters of Henry VIII,120\n2,Lisle Letters,95\n3,Paston Letters,140\n```';
const DECK = '<slides title="Letters as evidence">\n# Letters as evidence\nWhat a letter shows, and what it hides\nNotes: start with the 1536 letter\n---\n# Two copies\n- the draft\n- the fair copy\n---\n# What we can say\n- the hand\n- the date\n</slides>';
(async () => {
  const b = await pw.chromium.launch(); const ctx = await b.newContext({ viewport: { width: 1440, height: 950 } }); const p = await ctx.newPage();
  const errs = []; p.on('pageerror', e => errs.push(e.message.slice(0, 200)));
  const saved = []; await p.exposeFunction('__tSaved', (n, m, len) => saved.push({ n, m, len }));
  await p.goto(URL_); await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 300000 });
  await p.evaluate(() => { const k = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Enter' && x.offsetParent); if (k) k.click(); }); await p.waitForTimeout(1200);
  await p.evaluate(() => { window.saveFileNative = function (n, m, d) { window.__tSaved(n, m, d && d.length || 0); return true; }; });
  // a conversation with a document, a spreadsheet and slides in one reply
  await p.evaluate(({ DOC, SHEET, DECK }) => { const c = { id: 'c-openin', title: 'The Tudor letter', messages: [{ role: 'me', text: 'Write me notes, a reading plan and slides.', at: Date.now() - 5000 }, { role: 'bot', text: 'Here they are.\n\n' + DOC + '\n\n' + SHEET + '\n\n' + DECK, at: Date.now() - 4000, done: Date.now() - 3000 }], made: Date.now() - 6000, updated: Date.now() - 3000 };
    state.chats = state.chats || []; state.chats.unshift(c); state.activeChat = c.id; go('chat'); renderChat(); }, { DOC, SHEET, DECK }); await p.waitForTimeout(1500);
  const keys = await p.evaluate(() => [...document.querySelectorAll('#chatScroll .mk-card')].map(w => ({ cls: w.className.replace(/\s*live\s*/, ''), keys: [...w.querySelectorAll('.mk-card-acts button')].map(b => b.textContent.trim()) })));
  ok(keys.length === 3 && keys.some(k => /mk-doc/.test(k.cls) && k.keys.includes('Tabula')) && keys.some(k => /mk-sheet/.test(k.cls) && k.keys.includes('Abacus')) && keys.some(k => /mk-deck/.test(k.cls) && k.keys.includes('Imago')), 'the three cards: Tabula on the document, Abacus on the sheet, and now Imago on the slides', keys);
  const frameOf = (app) => p.frames().find(f => f.parentFrame() && f.name() === '' && f.url() === 'about:srcdoc' && f !== p.mainFrame() && f.evaluate ? f : null);
  const liveFrame = async (app) => { const h = await p.waitForSelector('#ing-desk iframe[data-app="' + app + '"], .ing-fw iframe[data-app="' + app + '"]', { timeout: 30000 }); return h; };
  // 1. the document, to Tabula
  await p.evaluate(() => [...document.querySelectorAll('#chatScroll .mk-card.mk-doc .mk-card-acts button')].find(b => b.textContent.trim() === 'Tabula').click());
  await p.waitForFunction(() => { const f = document.querySelector('#ing-desk iframe[data-app="tabula"]'); try { const d = f && f.contentWindow.document; return !!(d && d.getElementById('editor') && /secretary hand/.test(d.getElementById('editor').textContent)); } catch (e) { return false; } }, null, { timeout: 60000 }).catch(() => {});
  const tab = await p.evaluate(() => { const f = document.querySelector('#ing-desk iframe[data-app="tabula"]'); try { const d = f.contentWindow.document; const ed = d.getElementById('editor'); return { on: document.body.classList.contains('ing-desk-on'), heading: (ed.querySelector('h1,h2,h3,p') || {}).textContent, words: /secretary hand/.test(ed.textContent), title: (d.getElementById('docTitle') || {}).value, lit: [...document.querySelectorAll('.dock .nav-btn.active')].map(b => b.getAttribute('data-page')) }; } catch (e) { return { err: String(e) }; } });
  ok(tab.on && tab.words && /Notes on the Tudor letter/.test(tab.heading || '') && /Notes on the Tudor letter/.test(tab.title || ''), 'the document is in Tabula on the Desk, as a Word file: its heading, its words and its name', tab);
  await p.screenshot({ path: OUT + '/tabula.png' });
  // 2. the sheet, to Abacus
  await p.evaluate(() => go('chat')); await p.waitForTimeout(600);
  await p.evaluate(() => [...document.querySelectorAll('#chatScroll .mk-card.mk-sheet .mk-card-acts button')].find(b => b.textContent.trim() === 'Abacus').click());
  await p.waitForFunction(() => { const f = document.querySelector('#ing-desk iframe[data-app="abacus"]'); try { const w = f && f.contentWindow; const b = w && w.__ingBook && w.__ingBook(); return !!(b && JSON.stringify(b.data).indexOf('Paston') >= 0 && /Reading plan/.test((w.document.getElementById('docTitle') || {}).value || '')); } catch (e) { return false; } }, null, { timeout: 60000 }).catch(() => {});
  const ab = await p.evaluate(() => { const f = document.querySelector('#ing-desk iframe[data-app="abacus"]'); try { const w = f.contentWindow; const b = w.__ingBook(); const s = JSON.stringify(b.data); return { on: document.body.classList.contains('ing-desk-on'), has: /Paston/.test(s) && /140/.test(s) && /Week/.test(s), title: (w.document.getElementById('docTitle') || {}).value }; } catch (e) { return { err: String(e) }; } });
  ok(ab.on && ab.has && /Reading plan/.test(ab.title || ''), 'the spreadsheet is in Abacus as a workbook: its headings and numbers in the cells, its name', ab);
  // 3. the slides, to Imago
  await p.evaluate(() => go('chat')); await p.waitForTimeout(600);
  await p.evaluate(() => [...document.querySelectorAll('#chatScroll .mk-card.mk-deck .mk-card-acts button')].find(b => b.textContent.trim() === 'Imago').click());
  await p.waitForFunction(() => { const f = document.querySelector('#ing-desk iframe[data-app="slides"]'); try { const d = f && f.contentWindow.document; return !!(d && /Two copies/.test(d.body.textContent) && /What we can say/.test(d.body.textContent)); } catch (e) { return false; } }, null, { timeout: 60000 }).catch(() => {});
  const im = await p.evaluate(() => { const f = document.querySelector('#ing-desk iframe[data-app="slides"]'); try { const d = f.contentWindow.document; const t = d.body.textContent; return { on: document.body.classList.contains('ing-desk-on'), all: /Letters as evidence/.test(t) && /Two copies/.test(t) && /What we can say/.test(t), notes: /1536 letter/.test(t) }; } catch (e) { return { err: String(e) }; } });
  ok(im.on && im.all, 'the slides are in Imago: every slide of the deck is there', im);
  await p.screenshot({ path: OUT + '/imago.png' });
  // 4. Tabula holding words: the next document opens in a second window
  await p.evaluate(() => go('chat')); await p.waitForTimeout(600);
  await p.evaluate(() => { const c = state.chats.find(x => x.id === 'c-openin'); c.messages.push({ role: 'bot', text: '<document title="A second note">\n# A second note\n\nAnother document, while the first is open.\n</document>', at: Date.now(), done: Date.now() }); renderChat(); }); await p.waitForTimeout(800);
  await p.evaluate(() => { window.__askSeen = null; const o = window.ingAsk; window.ingAsk = function (q) { window.__askSeen = q; return Promise.resolve(false); }; });
  await p.evaluate(() => { const cards = [...document.querySelectorAll('#chatScroll .mk-card.mk-doc')]; [...cards[cards.length - 1].querySelectorAll('.mk-card-acts button')].find(b => b.textContent.trim() === 'Tabula').click(); });
  await p.waitForFunction(() => { const f = document.querySelector('.ing-fw iframe[data-app="tabula"]'); try { const d = f && f.contentWindow.document; return !!(d && /Another document/.test(d.getElementById('editor').textContent)); } catch (e) { return false; } }, null, { timeout: 60000 }).catch(() => {});
  const second = await p.evaluate(() => { const ask = window.__askSeen; const f = document.querySelector('.ing-fw iframe[data-app="tabula"]'); const f0 = document.querySelector('#ing-desk iframe[data-app="tabula"]'); try { return { asked: !!(ask && /holding work/.test(ask.title)), win: !!f, second: /Another document/.test(f.contentWindow.document.getElementById('editor').textContent), firstKept: /secretary hand/.test(f0.contentWindow.document.getElementById('editor').textContent), tabs: [...document.querySelectorAll('#ing-deskbar [data-tab]')].map(t => t.getAttribute('data-tab')) }; } catch (e) { return { err: String(e), asked: !!ask }; } });
  ok(second.asked && second.win && second.second && second.firstKept, 'Tabula was holding words: asked, the second document opens in a second Tabula window and the first stays as it was', second);
  // 5. From Ingenium, inside Tabula's File menu
  const fromKey = await p.evaluate(() => { const f = document.querySelector('#ing-desk iframe[data-app="tabula"]'); const d = f.contentWindow.document; const k = d.querySelector('#fileMenu [data-fm="ing"]'); return k ? k.textContent.trim() : null; });
  ok(fromKey && /^From Ingenium/.test(fromKey), "Tabula's File menu has From Ingenium", fromKey);
  const listed = await p.evaluate(() => IngOpenIn.list().map(it => [it.kind, it.title, it.from]));
  ok(listed.some(x => x[0] === 'doc' && /Tudor letter/.test(x[1]) && /^Chat/.test(x[2])) && listed.some(x => x[0] === 'sheet') && listed.some(x => x[0] === 'deck'), 'the list knows the document, the sheet and the slides the chat made', listed);
  await p.evaluate(() => { const f = document.querySelector('#ing-desk iframe[data-app="tabula"]'); f.contentWindow.document.querySelector('#fileMenu [data-fm="ing"]').click(); }); await p.waitForTimeout(800);
  const panel = await p.evaluate(() => { const f = document.querySelector('#ing-desk iframe[data-app="tabula"]'); const d = f.contentWindow.document; const pn = d.getElementById('ingFromPanel'); return pn ? [...pn.querySelectorAll('.ing-from-item')].map(x => x.textContent.trim()) : null; });
  ok(panel && panel.length >= 2 && panel.every(t => /Chat/.test(t)) && !panel.some(t => /Reading plan|Letters as evidence/.test(t)), 'From Ingenium in Tabula lists the chat\'s documents, and only documents', panel);
  await p.evaluate(() => { const f = document.querySelector('#ing-desk iframe[data-app="tabula"]'); const d = f.contentWindow.document; [...d.querySelectorAll('#ingFromPanel .ing-from-item')].find(x => /second note/.test(x.textContent)).click(); });
  await p.waitForFunction(() => { const f = document.querySelector('#ing-desk iframe[data-app="tabula"]'); try { return /Another document/.test(f.contentWindow.document.getElementById('editor').textContent); } catch (e) { return false; } }, null, { timeout: 60000 }).catch(() => {});
  const chosen = await p.evaluate(() => { const f = document.querySelector('#ing-desk iframe[data-app="tabula"]'); const d = f.contentWindow.document; return { words: /Another document/.test(d.getElementById('editor').textContent), panelGone: !d.getElementById('ingFromPanel') }; });
  ok(chosen.words && chosen.panelGone, 'a document chosen there opens in that very Tabula', chosen);
  const otherKeys = await p.evaluate(() => { const a = document.querySelector('#ing-desk iframe[data-app="abacus"]'), s = document.querySelector('#ing-desk iframe[data-app="slides"]'); return { abacus: !!(a && a.contentWindow.document.getElementById('abFromIng')), imago: !!(s && s.contentWindow.document.getElementById('imFromIng')) }; });
  ok(otherKeys.abacus && otherKeys.imago, 'Abacus and Imago have From Ingenium beside Open .xlsx and Open .pptx', otherKeys);
  // 6. the Career Studio's document: Open in Tabula, and the studio's documents in the list
  await p.evaluate(() => go('career')); await p.waitForTimeout(1000);
  const career = await p.evaluate(async () => { await IngCareer.newOpp('phd', 'DPhil in History\nUniversity of Oxford\nWe invite applications. Closing date: 1 December 2026. Applicants should send a cover letter and a CV.', 'pasted');
    const o = IngCareer.state().opps[0]; const ref = IngBig.newId(); await IngBig.put(ref, 'Dear Professor Smith,\n\nI am writing to apply for the DPhil in History.\n\nYours sincerely');
    o.docs.cover = { ref, made: Date.now(), model: 'you', mine: true, chk: { figures: [], fills: 0 } }; o.step = 'send'; o.sv = { kind: 'cover' }; IngCareer.render(); await new Promise(r => setTimeout(r, 900));
    return { keys: [...document.querySelectorAll('#cs .c-work .c-pn-f .c-btn')].map(x => x.textContent), listed: IngOpenIn.list().filter(it => /Career Studio/.test(it.from)).map(it => it.title) }; });
  ok(career.keys.includes('Open in Tabula') && career.keys.includes('Save as Word'), "the studio's document has Open in Tabula beside Save as Word", career.keys);
  ok(career.listed.some(t => /Cover letter|cover/i.test(t) && /DPhil in History/.test(t)), "the studio's documents are in the list for Tabula's From Ingenium", career.listed);
  await p.evaluate(() => [...document.querySelectorAll('#cs .c-work .c-pn-f .c-btn')].find(x => x.textContent === 'Open in Tabula').click());
  await p.waitForFunction(() => { const fs = [...document.querySelectorAll('iframe[data-app="tabula"]')]; return fs.some(f => { try { return /Professor Smith/.test(f.contentWindow.document.getElementById('editor').textContent); } catch (e) { return false; } }); }, null, { timeout: 60000 }).catch(() => {});
  const inTab = await p.evaluate(() => [...document.querySelectorAll('iframe[data-app="tabula"]')].some(f => { try { return /Professor Smith/.test(f.contentWindow.document.getElementById('editor').textContent); } catch (e) { return false; } }));
  ok(inTab, "the studio's letter is in Tabula, as its Word file", inTab);
  // 7. the reading page's key is there
  await p.evaluate(() => go('lector')); await p.waitForTimeout(1500);
  const lk = await p.evaluate(() => { const k = document.getElementById('l7Open'); return k ? { text: k.textContent.trim(), shown: !!k.offsetParent } : null; });
  ok(lk && lk.text === 'Open in Tabula', "the reading page's document panel has Open in Tabula beside Save", lk);
  // 8. a file Imago asks the host to download is saved
  const imFrame = await (await p.$('#ing-desk iframe[data-app="slides"]')).contentFrame();
  await imFrame.evaluate(() => { parent.postMessage({ kind: 'carpe-download', filename: 'deck.json', mime: 'application/json', data: '{"a":1}' }, '*'); });
  await p.waitForTimeout(600);
  ok(saved.some(x => x.n === 'deck.json' && x.len === 7), "Imago's download reaches the host and is saved", saved);
  ok(errs.length === 0, 'no errors on the page', errs.join(' | '));
  await b.close();
  console.log(pass + ' passed, ' + fail + ' failed'); process.exit(fail ? 1 : 0);
})().catch(e => { console.error('ERR', e); process.exit(2); });
