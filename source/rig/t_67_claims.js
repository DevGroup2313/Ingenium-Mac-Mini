// Ingenium 6.7 · what Ingenium says about itself, made true (the claims audit of 25 October 2026), in Chromium:
//   1. the words: every sentence the audit found false or overstated is gone from the built page, and the corrected
//      sentence is there in its place (on the door, Home, Settings, the Guide, the tour, Help, the houses, Lector, the
//      recipe, Build, Storage, Fontes, chat import, the code editor);
//   2. the bugs behind claims stay fixed: the Forge's request record (r126 factsOf), a page that moves itself to another
//      address from the measuring frame (now refused by an outer frame, and written down), a retracted paper from Crossref
//      (now left out, not badged "Not retracted"), an editorial from Europe PMC (named as one, and not taken as a journal
//      article), Build reading a file larger than it can hold (now refused with a plain message), the health card's calm
//      line (now says only what was checked), Lector's figure check (whole figures only), Gemini's Takeout page (its line
//      breaks), the catalogue's 36 models and the two SmolLM2 files' known sizes;
//   3. Dictate says what it does before the first use, and nothing is heard until the person chooses.
//   4. found on review: Magister's tag is "deep", not "strongest"; an editorial or a letter that Crossref calls a journal article is
//      named as one by its title, and the switch says so; models brought from a known family get their makers' settings.
//   node rig/t_67_claims.js http://127.0.0.1:8167/ingenium.html <out folder>
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs'); const http = require('http');
const URL_ = process.argv[2], OUT = process.argv[3]; fs.mkdirSync(OUT, { recursive: true });
let pass = 0, fail = 0;
const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (d !== undefined ? '  ' + String(typeof d === 'string' ? d : JSON.stringify(d)).slice(0, 400) : '')); c ? pass++ : fail++; };

// words that were false or overstated, and must not be in the page any more
const GONE = [
  'Nothing here asks for a connection, and nothing leaves it', 'listens on this device only; nothing is sent away', 'The listening happens on this device',
  'Nothing here leaves this device', 'Nothing you write leaves this device', 'the app never requests anything', 'No connection, no services, no exceptions',
  'The app itself never requests anything', 'about 1 to 2 MB of compiled code', 'asks for nothing outside it', 'nothing else will be asked for',
  'set from its size when it arrives', 'no GPU offload in a standalone page', 'none of it is or can be on a GPU', 'The Fire tablet\'s comfortable home',
  'too heavy for the tablet', 'desktops only', 'It reasons through a problem before it writes', 'The most capable model this device can hold',
  'the strongest this device can hold', 'the strongest this device holds', 'one billion to twelve billion', 'beats Qwen3.6 35B-A3B on agentic work',
  'All is well: the models here fit this device', '"best first"', 'Back to the best that fits', 'Thirty-four strong',
  'Every model follows it, in every chat', 'every model follows them, here and connected', 'Every model starts with the answer',
  'is built around how attention, time and the senses', 'Focus is built for minds', 'Each model answers with the settings its own makers recommend',
  'the model on this device makes 3 to 8 small steps', 'Their tools and content are the same as before',
  'Blend asks several modes', 'Ask several modes at once', 'every mode in it answers', 'open in a window of their own', 'Checks that a model\'s file is whole', 'See that its file is whole',
  'Everything works on this device, with no connection', 'Nothing is lost: each app keeps its versions', 'every version kept, tested and shipped',
  'kept with every version, tested and shipped', 'An .html file of any size', 'Any size: a large page opens part by part', 'Nothing kept before is lost',
  'The pages of your apps, each version kept', 'What the code under the cursor means', 'Not retracted (', 'Retracted work has been left out',
  'Retracted work is left out, preprints', 'Peer-reviewed only', 'Peer-reviewed journal', 'no peer-reviewed source was found', 'each source is checked…',
  'vetted by Ingenium on', 'Every search vetted', 'Searches you can trust', 'frame from which nothing can leave', 'where none can leave the device',
  'what it tries is written down, and nothing leaves the device', 'about ten seconds an app', 'a keystroke is answered at once',
  'Lector never invents a fact about you', 'nothing about you is invented', 'doctoral standard', 'the counts are exact', 'A stronger model is ready',
  'Lector reads best with the strongest model', 'Nothing is sent anywhere: Lector', 'Lector suggests the best one this device holds',
  'Nothing leaves your home network', 'are stored in this browser only. Nothing leaves the device', 'the app stays fully offline until you turn a connection on',
  'Then only your question goes to the search service', 'Without that switch, nothing goes online', 'Everything you make stays on this device',
  'brings your desk back from a few minutes ago', 'three most recent moments', 'come back after a few minutes', 'the strongest of them writes one answer',
  'or the strongest) scores', 'the stronger judges both', 'the stronger counts for three', 'Train a small model from zero</h2>', 'It keeps what it already knew',
  'while keeping what it knew', 'a larger one only learns this text by heart', 'about "+TRAIN_PACE.large+" times', 'Nothing here leaves the device unless you connect something',
  'with None, nothing leaves the device', 'The engine is single-threaded: small models', 'Each was checked against its fingerprint.',
  'The model\'s own 16-bit numbers', 'training it needs about 7 GB', 'Gemini (Google Takeout), Grok, DeepSeek, Le Chat, Copilot, or any transcript',
  'every figure an update has changed', 'every figure the recipe knows matches', 'was found in the measures, the analysis, your CV or the posting',
  // found on review: Magister's tag, editorials and letters, Try it, brought models' settings, Lector's peer-reviewed mark
  'role:"strongest"', 'no preprints, no editorials or letters', 'a preprint, an editorial or a letter, named as such', 'so it still answers as before',
  'and every model you bring, use Ingenium', 'a source marked peer-reviewed may carry more weight', ' [peer-reviewed journal]'];
// the corrected words, which must be there
const THERE = [
  'It goes online only when you ask for something that needs it: a cloud model, a search, a download, GitHub or Dictate.',
  'Your work stays here, and goes online only when you ask for something that needs it.',
  'No cloud model is set up, so Chat\'s answers are written on this device.',
  '<b>How offline works here.</b> The engine that runs your models is kept on this device',
  'in Chrome, Edge and Safari it may send the sound to Google, Microsoft or Apple',
  'It uses your browser\'s own speech service: in Chrome, Edge and Safari the sound may be sent to Google, Microsoft or Apple to be written down.',
  'Ingenium\'s own models come in four houses: Velox answers at once, Scriba thinks first, Magister is a larger model for hard questions, and Faber writes code.',
  'Ingenium\'s larger general model for this device, chosen to suit its memory and speed.',
  'line:"Made for writing, reading and fixing code."}',
  'from about 350 million to about 30 billion', 'its maker calls it competitive with Qwen3.6 35B-A3B on agent and tool tasks',
  'well behind on SWE-bench Verified, a coding test (51 against 66)', 'in the order Ingenium suggests',
  'No model is here yet, so there is nothing to check.', 'about 2.5 times slower than Tiny', 'about 14 to 15 times slower than Tiny',
  'In Ingenium\'s own test, one pass was enough: SmolLM2 135M', 'given to every model in a chat, here and connected',
  'They tell a model how to behave; a small model does not always keep to them.', 'designed with autistic people and people with ADHD in mind',
  'They have not been tested with a group of users', 'If no model is ready, or it gives no list, the steps are made from the words of your task',
  'at least 45 seconds apart', 'Up to about 220 characters'.replace('Up', 'up'), 'Research then opens up to three of the pages found',
  'They are not encrypted, so share only on a network you trust', 'Work that OpenAlex, Crossref or Europe PMC marks as retracted is left out',
  'Journal articles and scholarly books only', 'Peer review is confirmed only for a journal listed in DOAJ',
  'gathered by Ingenium on', 'Withdrawal not checked (arXiv)', 'No retraction listed (', 'Every source labelled',
  'refuses every request the page makes to another address', 'between ten and twenty seconds an app',
  'under 150 milliseconds (the median)', 'Lector is told to take facts about you only from your CV',
  'matches a figure in the measures, your CV or the posting', 'Methods written inside objects and classes are not counted',
  'Blend asks two or more of your models the same question, one after another', 'Everything but GitHub works on this device, with no connection.',
  'Each app keeps its recent versions', 'every version you keep, the checks you run on it, and the packages you make from it',
  'Compares each listed model\'s file size with its listing', 'open on the Desk inside Ingenium. Each can also open in a window of its own.',
  'Build opens a page of up to', 'Your own work stays. Try once more.', 'older ones may be freed when room runs short',
  'What the HTML, CSS or JavaScript under the cursor means', 'Each layout was tested on sample files made in that layout, not on real exports.',
  'A model released in BF16, as SmolLM2 is, is converted to F16 for this file.', 'about 6.5 GB of memory', 'Journal article', 'the larger judges both',
  'or else the largest) rates each answer', 'not checked against sources',
  'Models from the families Ingenium knows (LFM2.5, Qwen3.5, Gemma 4, Mellum and Qwen3-Coder) answer with the settings their makers recommend, whether they are Ingenium\'s own or ones you bring',
  'role:"deep",line:"Ingenium', 'Editorials and letters are left out when the index names them or the title begins with Editorial or Letter, so a few may still come through.',
  'an editorial or a letter, named as such when the index says so or its title begins that way', 'so it should still answer much as before',
  'More passes have not been measured.":TRAIN_STEPS', '" [journal article]"', 'whether it was peer-reviewed was not checked',
  'Before you dictate', 'Train a small model</h2>', 'A model you train further starts from what it already knew.',
  'Each app it carries was checked against its fingerprint.', 'This copy of Ingenium was checked for the version it names.',
  'step 4 of 4 · everything is running, and its answers are written on this device.'.replace('step', 'Step')];

function sink() { return new Promise(res => { const got = []; const s = http.createServer((q, r) => { got.push(q.url); r.writeHead(200, { 'Access-Control-Allow-Origin': '*' }); r.end('x'); });
  s.listen(0, '127.0.0.1', () => res({ port: s.address().port, got, close: () => s.close() })); }); }

(async () => {
  // 1. the words, in the page as it is served
  const html = await (await fetch(URL_)).text();
  const left = GONE.filter(w => html.includes(w));
  ok(left.length === 0, 'none of the ' + GONE.length + ' false or overstated sentences is left in the page', left);
  const missing = THERE.filter(w => !html.includes(w));
  ok(missing.length === 0, 'all ' + THERE.length + ' corrected sentences are in the page', missing);

  const b = await pw.chromium.launch();
  const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } });
  await ctx.grantPermissions([], { origin: new URL(URL_).origin });
  const p = await ctx.newPage(); const errs = []; p.on('pageerror', e => errs.push(e.message.slice(0, 200)));
  const outside = []; p.on('request', r => { const u = r.url(); if (/^https?:/.test(u) && !u.startsWith(new URL(URL_).origin) && !/127\.0\.0\.1/.test(u) && !/^https:\/\/(api\.crossref\.org|www\.ebi\.ac\.uk\/europepmc)\//.test(u)) outside.push(u); });  // the two indexes are answered by the routes below
  // the scholarly indexes, answered here: a retracted paper, its notice and a sound paper (Crossref); an editorial and an article (Europe PMC)
  let crossrefUrl = '';
  const EDQ = [
    { DOI: '10.1136/bmj.ed.1', title: ['Editorial'], type: 'journal-article', 'container-title': ['BMJ'], issued: { 'date-parts': [[2024]] } },
    { DOI: '10.1136/bmj.le.1', title: ['Letter: Calm rooms in the clinic'], type: 'journal-article', 'container-title': ['BMJ'], issued: { 'date-parts': [[2024]] } },
    { DOI: '10.1136/bmj.ar.1', title: ['Editorial practices in calm open journals'], type: 'journal-article', 'container-title': ['BMJ'], issued: { 'date-parts': [[2023]] } },
    { DOI: '10.1136/bmj.ar.2', title: ['Letters of Seneca read for calm'], type: 'journal-article', 'container-title': ['BMJ'], issued: { 'date-parts': [[2022]] } }];
  await p.route('https://api.crossref.org/**', r => { if (/calmeditorials/.test(r.request().url())) return r.fulfill({ status: 200, headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' }, body: JSON.stringify({ status: 'ok', message: { items: EDQ } }) });
    crossrefUrl = r.request().url(); r.fulfill({ status: 200, headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' }, body: JSON.stringify({ status: 'ok', message: { items: [
    { DOI: '10.1016/S0140-6736(97)11096-0', title: ['RETRACTED: Ileal-lymphoid-nodular hyperplasia, non-specific colitis, and pervasive developmental disorder in children'], type: 'journal-article', 'container-title': ['The Lancet'], issued: { 'date-parts': [[1998]] }, author: [{ given: 'A', family: 'Wakefield' }], 'updated-by': [{ DOI: '10.1016/s0140-6736(10)60175-4', type: 'retraction', source: 'retraction-watch' }] },
    { DOI: '10.1016/s0140-6736(10)60175-4', title: ['Retraction—Ileal-lymphoid-nodular hyperplasia'], type: 'journal-article', 'container-title': ['The Lancet'], issued: { 'date-parts': [[2010]] }, 'update-to': [{ DOI: '10.1016/S0140-6736(97)11096-0', type: 'retraction' }] },
    { DOI: '10.1000/sound.2021.1', title: ['Hyperplasia in the gut, a sound paper'], type: 'journal-article', 'container-title': ['Journal of Calm Computing'], issued: { 'date-parts': [[2021]] }, author: [{ given: 'Ada', family: 'Lovelace' }] }] } }) }); });
  await p.route('https://www.ebi.ac.uk/europepmc/**', r => r.fulfill({ status: 200, headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' }, body: JSON.stringify({ resultList: { result: [
    { id: '1', source: 'MED', title: 'Why calm matters: an editorial.', pubYear: '2024', authorString: 'Smith JA.', journalInfo: { journal: { title: 'CJEM' } }, pubTypeList: { pubType: ['Editorial'] } },
    { id: '2', source: 'MED', title: 'Calm interfaces in a trial.', pubYear: '2023', authorString: 'Jones B.', journalInfo: { journal: { title: 'JMLA' } }, pubTypeList: { pubType: ['Journal Article', 'research-article'] } }] } }) }));
  await p.goto(URL_); await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 240000 });
  await p.evaluate(() => { const b = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Enter' && x.offsetParent); if (b) b.click(); });
  await p.waitForTimeout(800);
  ok(await p.evaluate(() => (window.__ingParts || {}).p101 === 'running'), 'the claims part (r180, p101) runs');

  // 2a. Crossref: the retracted paper and its notice are left out; the sound paper says what Crossref lists
  const cr = await p.evaluate(async () => { const r = await schCrossref('hyperplasia', 5); return r.map(x => ({ t: x.title, checks: schVet(x).vet.checks })); });
  ok(cr.length === 1 && /sound paper/.test(cr[0].t), 'Crossref: the retracted paper (updated-by a retraction, titled RETRACTED) and its notice are both left out', cr.map(x => x.t));
  ok(/updated-by/.test(decodeURIComponent(crossrefUrl)), 'Crossref is asked for updated-by, where a retraction is recorded on the paper itself', crossrefUrl.slice(0, 200));
  ok(cr[0] && cr[0].checks.includes('No retraction listed (Crossref)') && !cr[0].checks.some(c => /^Not retracted/.test(c)), 'the sound paper says Crossref lists no retraction, not that it is "Not retracted"', cr[0] && cr[0].checks);
  const ax = await p.evaluate(() => schVet({ kind: 'scholarly', index: 'arXiv', title: 'A preprint', preprint: true, type: 'preprint', venue: 'arXiv', doi: '' }).vet.checks);
  ok(ax.includes('Withdrawal not checked (arXiv)'), 'an arXiv record says its withdrawal was not checked', ax);
  // 2b. Europe PMC: the editorial is named as one and is not a journal article for the switch
  const ep = await p.evaluate(async () => { const r = await schEuropePMC('calm', 5); return r.map(x => ({ t: x.title, type: x.type, peer: schIsPeer(x), checks: schVet(x).vet.checks })); });
  const ed = ep.find(x => /editorial/i.test(x.t)), art = ep.find(x => /trial/.test(x.t));
  ok(ed && ed.type === 'editorial' && ed.peer === false && /Editorial in CJEM: not a research article/.test(ed.checks[0]), 'Europe PMC: an editorial is named as one and is kept out of Journal articles and scholarly books only', ed);
  ok(art && art.type === 'article' && art.peer === true, 'and a research article is still a journal article', art);
  // 2b'. Crossref calls an editorial or a letter a journal article: one whose title begins "Editorial" or "Letter" is named as one and kept out
  //       of the switch; a research article whose title only starts with those words is not
  const eq = await p.evaluate(async () => { const r = await schCrossref('calmeditorials', 5); return r.map(x => ({ t: x.title, type: x.type, peer: schIsPeer(x), check: schVet(x).vet.checks[0] })); });
  const byT = t => eq.find(x => x.t.indexOf(t) === 0) || {};
  ok(eq.length === 4 && byT('Editorial').type === 'editorial' && byT('Editorial').peer === false && /^Editorial in BMJ: not a research article/.test(byT('Editorial').check)
    && byT('Letter:').type === 'letter' && byT('Letter:').peer === false && /^Letter in BMJ: not a research article/.test(byT('Letter:').check),
    'Crossref: a record titled "Editorial" or "Letter: ..." is named as such and kept out of Journal articles and scholarly books only', eq);
  ok(byT('Editorial practices').peer === true && byT('Letters of Seneca').peer === true && /^Journal article in BMJ/.test(byT('Letters of Seneca').check),
    'and research articles whose titles only begin with those words stay journal articles', eq);
  const tk = await p.evaluate(() => ['Guest editorial: why calm', 'Letter to the editor regarding calm', 'Corrigendum to "Calm rooms"', 'Correction of hallux valgus', 'A calm editorial'].map(schTitleKind));
  ok(JSON.stringify(tk) === JSON.stringify(['editorial', 'letter', 'erratum', '', '']), 'the title check reads only the opening words, and only these kinds', tk);
  const sw = await p.evaluate(() => { const c = document.getElementById('srchPeer'); return c ? (c.closest('.sch-set') || c.parentNode.parentNode).textContent.replace(/\s+/g, ' ').slice(0, 160) : ''; });
  ok(/^ ?Journal articles and scholarly books only/.test(sw), 'the switch in Settings is named for what it keeps', sw);
  const swAll = await p.evaluate(() => { const c = document.getElementById('srchPeer'); return c ? (c.closest('.sch-set') || c.parentNode.parentNode).textContent.replace(/\s+/g, ' ') : ''; });
  ok(/Editorials and letters are left out when the index names them or the title begins with Editorial or Letter, so a few may still come through/.test(swAll) && !/no editorials or letters/.test(swAll), 'and it says how editorials and letters are found, and that a few may come through', swAll.slice(80, 400));

  // 2c. the measuring frame: a page that moves itself to another address is refused, and written down
  const S = await sink();
  const probe = '<!doctype html><html><head></head><body>app<script>try{fetch("http://127.0.0.1:' + S.port + '/fetch?x=1").catch(function(){});}catch(e){}var i=new Image();i.src="http://127.0.0.1:' + S.port + '/img?x=2";setTimeout(function(){location.href="http://127.0.0.1:' + S.port + '/nav?secret=3";},400);<\/script></body></html>';
  const t0 = Date.now();
  const fm = await p.evaluate((t) => IngRecipe.frameMeasure(t).then(r => r ? { moved: !!r.moved, req: (r.req || []).map(x => x.u + ' ' + x.how) } : null), probe);
  await p.waitForTimeout(1500);
  ok(S.got.length === 0, 'nothing reached the address: not the fetch, not the picture, not the page moving there with data in its address', S.got);
  ok(fm && fm.moved && fm.req.some(x => x.indexOf('127.0.0.1:' + S.port) >= 0 && /moving the page/.test(x)), 'the move is refused and written down with the requests', fm);
  ok(Date.now() - t0 < 20000, 'and the measurement ends soon after, rather than waiting out its 45 seconds', (Date.now() - t0) + ' ms');
  S.close();

  // 2d. The Forge, measured: its build record no longer wipes the frame's result
  const forge = await p.evaluate(async () => { try { await (window.IngBuiltin && IngBuiltin.seed ? IngBuiltin.seed() : null); } catch (e) {}
    try { const r = await IngRecipe.measureOne('forge'); const v = r.v || {}; return { read: v.read, req: v.requests, pass: v.pass, tour: v.tour }; } catch (e) { return { error: String(e.message || e) }; } });
  ok(forge.read === true && forge.req && Array.isArray(forge.req.outside) && /^\d{3}$/.test(forge.pass || ''), 'The Forge is measured: its figures read and its requests written down, beside its own build record', forge);

  // 2e. Lector's figure check: a figure is matched whole, and one found only in Lector's notes is marked
  const chk = await p.evaluate(() => { try { const G = { runs: [{ key: 'cd', name: 'Carpe Diem', version: '1058', facts: { pass: '1058', tour: 201 } }], an: [{ note: 'it has 333 parts' }], cv: '', post: null };
    return IngLector.check('Build 1058 holds a tour of 201 cards, 58 screens and 333 parts.', G); } catch (e) { return { error: String(e.message || e) }; } });
  ok(chk.unmatched && chk.unmatched.includes('58') && !chk.unmatched.includes('1058') && !chk.unmatched.includes('201'), 'Lector\'s figure check: "58" is not found inside "1058"; whole figures in the material match', chk);
  ok(chk.fromNotes && chk.fromNotes.includes('333'), 'a figure found only in Lector\'s own reading notes is marked for checking too', chk);

  // 2f. the health card's calm line says only what was checked
  const hl = await p.evaluate(() => { const keep = state.models; state.models = []; const a = healthAdvice(); state.models = keep; return a; });
  ok(hl.length === 1 && hl[0][0] === 'ok' && hl[0][1] === 'No model is here yet, so there is nothing to check.', 'with no model, the health card says there is nothing to check, not that all is well', hl);

  // 2g. the catalogue: 36 models, and the two files to train show their known sizes
  const cat = await p.evaluate(() => ({ n: ING_CATALOG.length, s135: catEstimate(ING_CATALOG.find(e => e.key === 'smollm2-135m-instruct'), 'F16'), s360: catEstimate(ING_CATALOG.find(e => e.key === 'smollm2-360m-instruct'), 'F16'), q8: catEstimate(ING_CATALOG.find(e => e.key === 'smollm2-135m-instruct'), 'Q8_0') }));
  ok(cat.n === 36 && cat.s135 === 270885952 && cat.s360 === 725553792 && cat.q8 > 0, 'the catalogue holds 36 models; SmolLM2 135M and 360M show their files\' known sizes (271 MB, 726 MB)', cat);

  // 2h. Gemini's Takeout page: entries whose lines are broken by <br> are read
  const gem = await p.evaluate(() => { const h = '<html><body><div class="outer-cell"><div class="content-cell">Prompted&nbsp;Explain recursion simply<br>Oct 3, 2026, 10:00:00 AM PDT<br>Recursion is a function calling itself.</div></div>'
    + '<div class="outer-cell"><div class="content-cell">Prompted&nbsp;And an example?<br>Oct 3, 2026, 10:01:00 AM PDT<br>Factorial is the classic one.</div></div></body></html>';
    try { const r = ChatImportCore.parsers.geminiHtml(h); return { n: r.length, msgs: r[0] && (r[0].messages || r[0].msgs || []).length }; } catch (e) { return { error: String(e.message || e) }; } });
  ok(gem.n >= 1 && gem.msgs >= 2, 'Gemini\'s Takeout page: entries broken by <br> are read into a conversation', gem);

  // 2i. Build refuses a file larger than it can hold, with a plain message, before reading it
  await p.evaluate(() => { window.__maxKeep = window.ingEditMaxMB; window.ingEditMaxMB = 1; go('build'); }); await p.waitForTimeout(800);
  await p.evaluate(() => document.getElementById('bdOpenBtn').click()); await p.waitForTimeout(800);
  const pick = await p.evaluate(() => [...document.querySelectorAll('#bdOpenList .cc-prow')].map(x => x.textContent));
  ok(pick.some(t => /A page from this device.*An \.html file of up to 1 MB/.test(t)), 'Build names the size it opens', pick);
  const big = OUT + '/big.html'; fs.writeFileSync(big, '<!doctype html><title>big</title>' + 'x'.repeat(2 * 1048576));
  const [chooser] = await Promise.all([p.waitForEvent('filechooser', { timeout: 10000 }), p.evaluate(() => [...document.querySelectorAll('#bdOpenList .cc-prow')].find(x => /A page from this device/.test(x.textContent)).click())]);
  await chooser.setFiles(big); await p.waitForTimeout(1200);
  const tt = await p.evaluate(() => { const t = document.getElementById('ingToast'); return t ? t.textContent : ''; });
  ok(/it is 2 MB; Build opens a page of up to 1 MB on this device/.test(tt), 'a file larger than that is refused, with a plain message, and not read', tt);
  await p.evaluate(() => { window.ingEditMaxMB = window.__maxKeep; try { closeModal(); } catch (e) {} });

  // 3. Dictate: the first press says what happens to the sound, and nothing is heard until the person chooses
  await p.evaluate(() => { go('chat'); try { delete state.dictateToldAt; } catch (e) {} }); await p.waitForTimeout(800);
  const mic = await p.evaluate(() => { const m = document.getElementById('chatMicBtn'); return m ? { hidden: m.hidden, title: m.title } : null; });
  ok(mic && /in Chrome, Edge and Safari it may send the sound to Google, Microsoft or Apple/.test(mic.title), 'the Dictate key\'s own words say where the sound may go', mic);
  if (mic && !mic.hidden) {
    await p.evaluate(() => document.getElementById('chatMicBtn').click()); await p.waitForTimeout(500);
    const note = await p.evaluate(() => { const b = document.getElementById('modalBox'), r = document.getElementById('modalRoot'); return { open: !!(r && r.classList.contains('open')), text: b ? b.textContent : '', rec: document.getElementById('chatMicBtn').classList.contains('rec') }; });
    ok(note.open && /Before you dictate/.test(note.text) && /may be sent to Google, Microsoft or Apple/.test(note.text) && !note.rec, 'the first press opens a plain note before anything is heard', note);
    await p.screenshot({ path: OUT + '/dictate-note.png' });
    const AXE = process.env.AXE || '/tmp/claude-0/-home-user/54d2e30d-dcf0-5920-9a6c-647f62f6cd8d/scratchpad/tools/package/axe.min.js';
    if (fs.existsSync(AXE)) { await p.addScriptTag({ content: fs.readFileSync(AXE, 'utf8') });
      const ax = await p.evaluate(async () => { const r = await axe.run(document.getElementById('modalBox'), { runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'] } }); return r.violations.map(v => v.id + ' ' + v.nodes.length); });
      ok(ax.length === 0, 'axe-core finds no WCAG 2.1 A or AA rule broken in the note', ax); }
    await p.evaluate(() => document.getElementById('r180Not').click()); await p.waitForTimeout(300);
    const after = await p.evaluate(() => ({ told: !!state.dictateToldAt, open: document.getElementById('modalRoot').classList.contains('open'), rec: document.getElementById('chatMicBtn').classList.contains('rec') }));
    ok(!after.told && !after.open && !after.rec, '"Not now" closes the note, and nothing is listened to', after);
  } else ok(true, 'this browser offers no speech recognition, so the Dictate key is hidden (its words were checked above)');

  // 4. the houses card and the lineup's own lines
  const lu = await p.evaluate(() => ({ faber: ING_LINEUP.tiers.find(t => t.id === 'faber').line, mag: ING_LINEUP.tiers.find(t => t.id === 'magister').line, note: (document.getElementById('housesNote') || {}).textContent || '' }));
  ok(lu.faber === 'Made for writing, reading and fixing code.' && /chosen to suit its memory and speed/.test(lu.mag) && /Faber is a house by purpose, not size/.test(lu.note), 'the houses: Faber claims no reasoning its model may not do, and Magister is the larger of a short list, not the strongest the device can hold', lu);
  await p.evaluate(() => { go('models'); try { renderLineup(); } catch (e) {} }); await p.waitForTimeout(800);
  const tags = await p.evaluate(() => ({ role: ING_LINEUP.tiers.find(t => t.id === 'magister').role,
    tile: ((document.querySelector('[data-tier="magister"] .lu-role') || {}).textContent || ''),
    any: [...document.querySelectorAll('.lu-role, .tier-tag')].map(x => x.textContent).filter(t => /strongest/i.test(t)) }));
  ok(tags.role === 'deep' && tags.tile === 'deep' && tags.any.length === 0, 'Magister\'s tag on its tile (and so in the chat\'s chooser) is "deep", the houses card\'s word, not "strongest"', tags);
  const fam = await p.evaluate(() => [{ fileName: 'Qwen3.5-9B-Instruct-Q4_K_M.gguf', customName: 'My own Qwen' }, { fileName: 'gemma-4-E2B-it-Q4_K_M.gguf', customName: 'x' }, { fileName: 'Mistral-7B-Instruct-v0.3.Q4_K_M.gguf', customName: 'Mistral' }].map(samplingFamily));
  ok(fam[0] === 'qwen3.5' && fam[1] === 'gemma4' && fam[2] === null, 'as the Guide now says: a model you bring from a family Ingenium knows gets its makers\' settings, by its file\'s name; another does not', fam);
  ok(outside.length === 0, 'no request left for another address while all this ran (the indexes were answered here)', outside.slice(0, 5));
  ok(errs.length === 0, 'no page errors', errs.slice(0, 5));
  await b.close();
  console.log(pass + ' passed, ' + fail + ' failed');
  process.exit(fail ? 1 : 0);
})().catch(e => { console.log('FAIL the test itself stopped: ' + (e && e.stack || e)); console.log(pass + ' passed, ' + (fail + 1) + ' failed'); process.exit(1); });
