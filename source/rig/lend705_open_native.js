// (rig/lend705_open_native.js: the emulation of the Fire app's net call written for the lending investigation of 31 October 2026,
// with the page's address given by the caller. Test infrastructure only; not shipped.)
// An emulation of the Fire tablet app's side of the conversation: window.IngeniumNative.call(json) as in
// ingenium_android_project/app/src/main/java/com/yannieforest/ingenium/Bridge.java. Only the "net" call is real (doNet is mirrored
// from Bridge.java:433-498: URL must be http or https; connect timeout 20 s; read timeout clamp(timeout||120, 5, 900) s; User-Agent
// replaced; Host/Content-Length/Connection headers dropped; a streamed reply is sent to the page as "net-chunk" events, a status >= 400
// keeps its body for the final reply; errors are worded as Bridge.netReason words them). The rest answers just enough to let the page boot
// as the Fire tablet's app (info.net === true, as Bridge.java:567 says). It is NOT the Android runtime: Java, HttpURLConnection and
// Android's resolver are not run here.
const pw = require('/opt/node-tools/node_modules/playwright'); const http = require('http'); const https = require('https'); const { StringDecoder } = require('string_decoder');
const NET_UA = 'Mozilla/5.0 (Linux; Android 10) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Mobile Safari/537.36';
const live = new Map(); const times = []; global.__nativeNetLog = times;
function reasonOf(e, port, host) {
  const code = e && e.code, m = String(e && e.message || e);
  if (code === 'ENOTFOUND' || code === 'EAI_AGAIN') return 'That name could not be found. Is this device online?';     // UnknownHostException
  if (e && e.__timeout) return 'That address did not answer in time.';                                                 // SocketTimeoutException
  if (code === 'ECONNREFUSED') return 'Nothing answered at that address (is the program there running?).';           // "...refused" in the message
  if (code === 'EHOSTUNREACH') return 'failed to connect to /' + host + ' (port ' + port + ') after 20000ms: isConnected failed: EHOSTUNREACH (No route to host)';
  if (code === 'ENETUNREACH') return 'failed to connect to /' + host + ' (port ' + port + '): isConnected failed: ENETUNREACH (Network is unreachable)';
  return m;
}
exports.open = async (url) => {
  const browser = await pw.chromium.launch({ headless: true, args: ['--no-sandbox'] });
  const UA = 'Mozilla/5.0 (Linux; Android 11; KFTRWI) AppleWebKit/537.36 (KHTML, like Gecko) Silk/126.3.1 like Chrome/126.0.6478.71 Safari/537.36';
  const ctx = await browser.newContext({ viewport: { width: 800, height: 1280 }, isMobile: true, hasTouch: true, deviceScaleFactor: 1.5, userAgent: UA });
  const page = await ctx.newPage();
  const emit = ev => page.evaluate(e => window.__ingNativeEvent && window.__ingNativeEvent(e), ev).catch(() => {});
  const reply = (callId, ok, v) => emit(ok ? { type: 'reply', callId, ok: true, result: v } : { type: 'reply', callId, ok: false, error: v });
  await page.exposeFunction('__nodeCall', async (json) => {
    let o; try { o = JSON.parse(json); } catch (e) { return; }
    const { method, args = {}, callId = '' } = o;
    if (method === 'info') return reply(callId, true, { engine: 'emulated', engineShort: 'emulated', available: false, platform: 'android', threads: 4, gpu: false, maxCtx: 16384, net: true,
      device: { ramGB: 3, cores: 8, model: 'KFTRWI', maker: 'Amazon', abi: 'arm64-v8a', os: 'Android 11' } });
    if (method === 'listModels') return reply(callId, true, { models: [{ id: 'builtin1', name: 'LFM2.5 1.2B Instruct', fileName: 'LFM2.5-1.2B-Instruct-Q4_K_M.gguf', size: 730000000, builtIn: true, lineup: 'lfm2.5-1.2b-instruct' }], builtin: { name: 'LFM2.5 1.2B Instruct', available: true, hidden: false } });
    if (method === 'netAbort') { const r = live.get(args.req); if (r) { r.__aborted = true; r.destroy(); live.delete(args.req); } return reply(callId, true, { ok: true }); }
    if (method === 'net') {
      const req = args.req || callId, url = String(args.url || ''), t0 = Date.now(), stream = !!args.stream, method2 = String(args.method || 'GET').toUpperCase();
      const rec = { url, method: method2, stream, timeoutArg: args.timeout, t0 }; times.push(rec);
      if (!/^https?:\/\//.test(url)) return reply(callId, false, 'Only web addresses (http and https) can be fetched.');
      const u = new URL(url), readMs = Math.max(5, Math.min(args.timeout || 120, 900)) * 1000;
      const hdr = { 'User-Agent': NET_UA };
      for (const [k, v] of Object.entries(args.headers || {})) { const low = k.toLowerCase(); if (low === 'host' || low === 'content-length' || low === 'connection') continue; hdr[k] = String(v); }
      let body = (args.body == null) ? null : String(args.body);
      if (body != null && method2 !== 'GET' && method2 !== 'HEAD') { hdr['Content-Length'] = Buffer.byteLength(body); if (!Object.keys(hdr).some(k => k.toLowerCase() === 'content-type')) hdr['Content-Type'] = 'application/json'; } else body = null;
      const lib = u.protocol === 'https:' ? https : http;
      await new Promise(resolve => {
        const r = lib.request({ hostname: u.hostname, port: u.port || (u.protocol === 'https:' ? 443 : 80), path: u.pathname + u.search, method: method2, headers: hdr, agent: false }, res => {
          const status = res.statusCode, dec = new StringDecoder('utf8'); let all = ''; rec.status = status; rec.tHeaders = Date.now() - t0;
          res.on('data', buf => { rec.tLast = Date.now() - t0; const s = dec.write(buf); if (!s) return; if (stream && status < 400) { for (let i = 0; i < s.length; i += 8192) emit({ type: 'net-chunk', req, text: s.slice(i, i + 8192) }); } else { all += s; } });
          res.on('end', () => { live.delete(req); rec.tEnd = Date.now() - t0; reply(callId, true, { status, contentType: res.headers['content-type'] || '', body: all.length > 8000000 ? all.slice(0, 8000000) : all }); resolve(); });
          res.on('error', e => { live.delete(req); rec.err = String(e.message); reply(callId, false, r.__aborted ? 'Stopped.' : (e.__timeout ? 'That address did not answer in time.' : reasonOf(e, u.port, u.hostname))); resolve(); });
          res.on('aborted', () => { /* the lender closed the connection in the middle of the reply: HttpURLConnection raises an IOException on the next read */ if (!res.complete) { live.delete(req); rec.err = 'aborted mid-reply'; reply(callId, false, r.__aborted ? 'Stopped.' : 'unexpected end of stream'); resolve(); } });
        });
        live.set(req, r);
        r.on('socket', s => { s.setTimeout(20000); s.once('connect', () => s.setTimeout(readMs)); s.on('timeout', () => { const e = new Error('timeout'); e.__timeout = true; r.destroy(e); }); });
        r.on('error', e => { live.delete(req); rec.err = String(e.code || e.message); reply(callId, false, r.__aborted ? 'Stopped.' : reasonOf(e, u.port, u.hostname)); resolve(); });
        if (body != null) r.write(body); r.end();
      });
      return;
    }
    reply(callId, false, 'not available in this emulation: ' + method);
  });
  await ctx.addInitScript(() => { window.IngeniumNative = { call: function (j) { window.__nodeCall(String(j)); }, saveFile: function () { return true; } }; });
  await page.goto(url || process.env.PAGE, { waitUntil: 'domcontentloaded', timeout: 120000 });
  return { page, browser, done: async () => { console.log(JSON.stringify({ step: 'native-net-log', calls: times.map(t => ({ url: t.url.replace(/^https?:\/\/[^/]+/, ''), method: t.method, stream: t.stream, timeoutArg: t.timeoutArg, status: t.status, headersMs: t.tHeaders, endMs: t.tEnd, err: t.err })) })); await browser.close(); } };
};
