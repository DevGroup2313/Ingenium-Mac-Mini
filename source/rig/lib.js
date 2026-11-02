const { openApp } = require('./bridge.js');
async function start(opts={}) {
  const r = await openApp(opts);
  const { page } = r;
  await page.waitForFunction(() => window.__ingReady === true, null, { timeout: 120000 });
  await page.waitForTimeout(1500);
  // pass the door
  await page.evaluate(() => { const b = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Enter' && x.offsetParent); if (b) b.click(); });
  await page.waitForTimeout(800);
  // capture what goes to the engine
  await page.evaluate(() => {
    window.__sent = [];
    const g = Engine.generate.bind(Engine);
    Engine.generate = function (job) { try { window.__sent.push(JSON.parse(JSON.stringify({ messages: job.messages.map(m => ({ role: m.role, content: typeof m.content === 'string' ? m.content : '[parts]' })), params: job.params }))); } catch (e) {} return g(job); };
  });
  return r;
}
async function send(page, text, timeoutMs = 900000) {
  await page.evaluate(() => go('chat'));
  await page.waitForTimeout(400);
  const n0 = await page.evaluate(() => curMsgs().length);
  await page.fill('#chatInput', text);
  await page.evaluate(() => sendChat());
  const t0 = Date.now();
  await page.waitForFunction((n0) => { const ms = curMsgs(); const last = ms[ms.length - 1]; return ms.length > n0 + 1 && last.role === 'bot' && !last.live && !last.wake && !last.preview; }, n0, { timeout: timeoutMs, polling: 1000 });
  const secs = (Date.now() - t0) / 1000;
  const last = await page.evaluate(() => { const ms = curMsgs(); const m = ms[ms.length - 1]; return { text: m.text, think: (m.think || m.thinking || '').slice(0, 3000), edits: m.edits || null, keys: Object.keys(m) }; });
  return { secs, ...last };
}
module.exports = { start, send };
