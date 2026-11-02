// Every connection, end to end through the app's own relay, against the stand-in server
const fs = require('fs');
const { start, send } = require('./lib.js');
const LOG = process.env.S + '/rig/mock_req.json', M = 'http://127.0.0.1:18777';
const cases = [
  { p: 'anthropic', base: M, model: 'claude-opus-5-5', think: true },
  { p: 'anthropic', base: M, model: 'claude-fable-5-1', think: true },
  { p: 'anthropic', base: M, model: 'claude-sonnet-5-5', think: false },
  { p: 'anthropic', base: M, model: 'claude-haiku-5-5', think: true },
  { p: 'anthropic', base: M, model: 'claude-haiku-4-5', think: true },
  { p: 'openai', base: M + '/v1', model: 'gpt-5.5', think: true },
  { p: 'moonshot', base: M + '/v1', model: 'kimi-k3', think: true },
  { p: 'openrouter', base: M + '/v1', model: 'anthropic/claude-opus-5-5', think: false },
  { p: 'gemini', base: M + '/v1beta/openai', model: 'gemini-3-pro', think: false },
  { p: 'lmstudio', base: M + '/v1', model: 'qwen3-8b', think: true },
  { p: 'ollama-local', base: M, model: 'llama3.2:3b', think: true },
  { p: 'openai-compat', base: M + '/v1', model: 'stand-in-a', think: false },
];
(async () => {
  const { page, browser } = await start();
  const out = [];
  for (const c of cases) {
    fs.writeFileSync(LOG, '[]');
    await page.evaluate((c) => {
      state.cloud = { on: true, provider: c.p, base: c.base, key: 'sk-test-123', model: c.model, models: [c.model] };
      state.chatSource = 'cloud'; state.thinking = c.think;
      try { if ($('ctlThink')) $('ctlThink').checked = c.think; } catch (e) {}
      saveState(); try { $('chatNew').click(); } catch (e) {}
    }, c);
    await page.waitForTimeout(300);
    const thinkNow = await page.evaluate(() => thinkOn());
    let r; try { r = await send(page, 'Say hello in five words.', 60000); } catch (e) { r = { text: 'TIMEOUT ' + e.message }; }
    let reqs = []; try { reqs = JSON.parse(fs.readFileSync(LOG, 'utf8')); } catch (e) {}
    const q = reqs.filter(x => x.method === 'POST').pop() || {};
    const b = q.body || {}, h = q.headers || {};
    out.push({ case: c.p + ' ' + c.model, thinkOn: thinkNow, reply: (r.text || '').slice(0, 80), think: (r.think || '').slice(0, 40), path: q.path,
      hdr: { auth: h['x-api-key'] ? 'x-api-key' : (h['authorization'] || '').slice(0, 12), ver: h['anthropic-version'], dda: h['anthropic-dangerous-direct-browser-access'], beta: h['anthropic-beta'], title: h['x-title'] },
      body: { stream: b.stream, max: b.max_tokens || b.max_completion_tokens || (b.options && b.options.num_predict), mct: !!b.max_completion_tokens, thinking: b.thinking, think: b.think, effort: b.output_config && b.output_config.effort,
        fb: b.fallbacks, cache: b.cache_control && b.cache_control.type, sampling: ['temperature', 'top_p', 'top_k'].filter(k => k in b), first: b.messages && b.messages[0] && b.messages[0].role, last: b.messages && b.messages[b.messages.length - 1].role, sys: typeof b.system === 'string' ? b.system.length : null, n: (b.messages || []).length },
      calls: reqs.length });
  }
  console.log(JSON.stringify(out, null, 1));
  await browser.close();
})();
