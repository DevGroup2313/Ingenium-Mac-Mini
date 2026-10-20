// R148: Lector writes cleanly. Run with: node rig/t_61_write.js (no page needed: a stand-in model loops on purpose)
const fs = require('fs');
const src = fs.readFileSync('/home/user/Ingenium-Mac-Mini/source/build/modules/r148.js', 'utf8').replace(/^<script>/, '').replace(/<\/script>\s*$/, '');
let calls = [];
global.window = global;
global.__ingParts = {};
global.LX = {};
// a stand-in engine: loops on the first two tries, writes well on the third, or always loops, or never
let mode = 'loop2';
global.Engine = { aborted: false, abort() { this.aborted = true; }, generate(job) {
  calls.push(job.params); const n = calls.length; this.aborted = false; const self = this;
  const good = 'The Forge will next carry its packages to each device without a computer. I plan to test it on the Fire tablet first, then on the iPhone.';
  const loopText = 'Where it goes next is clear. The Forge will grow. ' + 'The Forge\n'.repeat(400);
  const text = mode === 'never' ? good : (mode === 'loop2' && n >= 3) ? good : loopText;
  return new Promise((res, rej) => { let i = 0, out = ''; (function step() { if (self.aborted) { rej(new Error('aborted')); return; } if (i >= text.length) { res({ text: out }); return; } out += text.slice(i, i + 20); i += 20; job.onToken(text.slice(i - 20, i)); setImmediate(step); })(); });
} };
// the page's own lxAsk, reduced to its call to the engine
global.lxAsk = function (run, msgs, maxTok, temp, onPiece) { let out = ''; global.lastMsgs = msgs; return Engine.generate({ messages: msgs, params: { max_tokens: maxTok, temperature: temp, repeat_penalty: 1 }, onToken(t) { out += t; if (onPiece) onPiece(out); } }).then(r => out); };
eval(src);
(async () => {
  let pass = 0, fail = 0; const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (d !== undefined ? '  ' + JSON.stringify(d).slice(0, 300) : '')); c ? pass++ : fail++; };
  // 1. a loop, then a good piece on the third asking
  calls = []; mode = 'loop2'; let r = await lxAsk({}, [{ role: 'system', content: 'You are Lector.' }, { role: 'user', content: 'Write Where it goes next' }], 600, 0.3, null);
  ok(calls.length === 3 && /Fire tablet/.test(r) && !/The Forge\nThe Forge/.test(r), 'a loop is stopped and asked for again, and the good piece is kept', { calls: calls.length, r });
  ok(calls[1].repeat_penalty > 1.1 && calls[2].repeat_penalty > calls[1].repeat_penalty && calls[2].presence_penalty > 0, 'each asking again has a firmer hand against repetition', calls.map(c => [c.repeat_penalty, c.presence_penalty, c.temperature]));
  ok(/THE OWNER'S MANNER/.test(lastMsgs[0].content) && /dash/.test(lastMsgs[0].content), 'the owner\'s manner goes with every piece');
  // 2. it always loops: what came before the loop is kept, cut at a whole sentence
  calls = []; mode = 'always'; r = await lxAsk({}, [{ role: 'user', content: 'x' }], 600, 0.3, null);
  ok(calls.length === 3 && r === 'Where it goes next is clear. The Forge will grow.', 'when it always loops, the text before the loop is kept and nothing of the loop', r);
  // 3. a good piece is untouched (apart from tidying)
  calls = []; mode = 'never'; r = await lxAsk({}, [{ role: 'user', content: 'x' }], 600, 0.3, null);
  ok(calls.length === 1 && /Fire tablet first, then on the iPhone\.$/.test(r), 'a good piece is asked for once and kept whole', r);
  // 4. tidy: dashes, tells, repeats
  const t = IngWrite.tidy('It is important to note that the app works offline — always. Overall, it is fast. In conclusion, the work stands.\nThe same line.\nThe same line.\nIt is a testament to care. The page loads quickly. The page loads quickly.');
  ok(!/—/.test(t) && !/important to note|Overall,|In conclusion/.test(t) && t.split('The same line.').length === 2 && /evidence of care/.test(t) && t.split('The page loads quickly.').length === 2, 'tidy takes out dashes, the machine\'s tells, and repeats', t);
  ok(IngWrite.tidy('A well-made app, ten-year plan, CSS --l-acc and 3-5 items.') === 'A well-made app, ten-year plan, CSS --l-acc and 3-5 items.', 'hyphens inside words and code are left alone');
  // 5. loopAt does not fire on ordinary prose that names an app often
  const prose = 'The Forge edits apps. The Forge ships them to devices. In the Forge, every change is kept. The Forge runs offline. Each version of the Forge is tested before it ships, and the Forge keeps its history.';
  ok(IngWrite.loopAt(prose) < 0, 'ordinary prose that names an app often is not taken for a loop');
  ok(IngWrite.loopAt('Text. ' + 'The Forge, '.repeat(30)) >= 0 && IngWrite.loopAt('Intro.\n' + '- The Forge\n'.repeat(8)) >= 0, 'a list of the same name is taken for a loop, inline or line by line');
  console.log(pass + ' passed, ' + fail + ' failed'); process.exit(fail ? 1 : 0);
})();
