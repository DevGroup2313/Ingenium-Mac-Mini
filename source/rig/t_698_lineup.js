// The model lineup of Ingenium 6.9.2 (R203, modules/r203.js with two edits in build_page.py): the houses by device and memory, the new
// models and their qualities, the settings each card gives, the strong models offered with what they need, the plain line.
//   node rig/t_698_lineup.js http://127.0.0.1:8179/ingenium.html <out folder>
// Her words (31 October 2026): "I also want you to add better, faster and stronger models to Ingenium for all of the houses." Her devices: a
// MacBook Pro with 8 GB, a Mac mini with Apple silicon and 16 GB, two Windows laptops with 16 GB (one with weak graphics), a Fire tablet,
// an iPhone and an iPad, and a Mac with 64 GB she plans to buy. Memory is stubbed as the page reads it (window.__INGENIUM_DEVICE.ramGB, else
// navigator.deviceMemory), the kind of device as lineupDevice() gives it, and a computer with no graphics chip as lineupCpuOnly() gives it.
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs');
const [URL_, OUT] = process.argv.slice(2); fs.mkdirSync(OUT, { recursive: true });
let pass = 0, fail = 0;
const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (c || d === undefined ? '' : '  ' + JSON.stringify(d).slice(0, 700))); c ? pass++ : fail++; };
// what every kind of device and memory band should pick (written out from the lists and the memory rule: need = file GiB x 1.12 + 0.7 GB; spare =
// 68% of the memory on a computer, 55% on a phone or tablet), and the memory each model needs by that rule
const PICKS = {
  "android|2|gpu":{"velox":"lfm2.5-350m","scriba":"lfm2.5-1.2b-thinking","magister":"lfm2.5-1.2b-thinking","faber":"lfm2.5-1.2b-thinking"},
  "android|3|gpu":{"velox":"lfm2.5-1.2b-instruct","scriba":"lfm2.5-1.2b-thinking","magister":"lfm2.5-1.2b-thinking","faber":"lfm2.5-1.2b-thinking"},
  "android|4|gpu":{"velox":"lfm2.5-1.2b-instruct","scriba":"lfm2.5-1.2b-thinking","magister":"qwen3.5-2b","faber":"qwen3.5-2b"},
  "android|6|gpu":{"velox":"lfm2.5-1.2b-instruct","scriba":"minicpm5-2b","magister":"lfm2.5-2.6b","faber":"lfm2.5-2.6b"},
  "android|8|gpu":{"velox":"lfm2.5-1.2b-instruct","scriba":"minicpm5-2b","magister":"lfm2.5-2.6b","faber":"gemma-4-e2b"},
  "android|12|gpu":{"velox":"lfm2.5-1.2b-instruct","scriba":"minicpm5-2b","magister":"lfm2.5-2.6b","faber":"gemma-4-e4b"},
  "android|16|gpu":{"velox":"lfm2.5-1.2b-instruct","scriba":"minicpm5-2b","magister":"lfm2.5-2.6b","faber":"gemma-4-e4b"},
  "android|null|gpu":{"velox":"lfm2.5-350m","scriba":"lfm2.5-1.2b-thinking","magister":"lfm2.5-1.2b-thinking","faber":"lfm2.5-1.2b-thinking"},
  "ios|3|gpu":{"velox":"lfm2.5-1.2b-instruct","scriba":"qwen3.5-2b","magister":"lfm2.5-2.6b","faber":"qwen2.5-coder-1.5b"},
  "ios|4|gpu":{"velox":"lfm2.5-1.2b-instruct","scriba":"qwen3.5-2b","magister":"lfm2.5-2.6b","faber":"qwen2.5-coder-1.5b"},
  "ios|6|gpu":{"velox":"lfm2.5-1.2b-instruct","scriba":"minicpm5-2b","magister":"lfm2.5-2.6b","faber":"lfm2.5-2.6b"},
  "ios|8|gpu":{"velox":"lfm2.5-1.2b-instruct","scriba":"minicpm5-2b","magister":"qwen3.5-4b","faber":"gemma-4-e2b"},
  "ios|12|gpu":{"velox":"lfm2.5-1.2b-instruct","scriba":"minicpm5-2b","magister":"qwen3.5-4b","faber":"lfm2.5-8b-a1b"},
  "ios|16|gpu":{"velox":"lfm2.5-1.2b-instruct","scriba":"minicpm5-2b","magister":"qwen3.5-4b","faber":"gemma-4-12b"},
  "ios|null|gpu":{"velox":"lfm2.5-1.2b-instruct","scriba":"qwen3.5-2b","magister":"lfm2.5-2.6b","faber":"qwen2.5-coder-1.5b"},
  "mac-arm|4|gpu":{"velox":"lfm2.5-1.2b-instruct","scriba":"minicpm5-2b","magister":"qwen3.5-4b","faber":"lfm2.5-2.6b"},
  "mac-arm|6|gpu":{"velox":"lfm2.5-1.2b-instruct","scriba":"minicpm5-2b","magister":"qwen3.5-4b","faber":"granite-4.2-3b"},
  "mac-arm|8|gpu":{"velox":"lfm2.5-1.2b-instruct","scriba":"minicpm5-2b","magister":"qwen3.5-4b","faber":"granite-4.2-8b-compact"},
  "mac-arm|12|gpu":{"velox":"lfm2.5-1.2b-instruct","scriba":"gemma-4-e4b","magister":"qwen3.5-9b","faber":"gemma-4-12b"},
  "mac-arm|16|gpu":{"velox":"lfm2.5-1.2b-instruct","scriba":"gemma-4-e4b","magister":"qwen3.5-9b","faber":"mellum2.1-12b-thinking"},
  "mac-arm|24|gpu":{"velox":"lfm2.5-1.2b-instruct","scriba":"gemma-4-26b-a4b","magister":"gemma-4-26b-a4b","faber":"gemma-4-26b-a4b"},
  "mac-arm|32|gpu":{"velox":"lfm2.5-1.2b-instruct","scriba":"gemma-4-26b-a4b","magister":"qwen3.8-27b","faber":"qwen3.8-27b"},
  "mac-arm|36|gpu":{"velox":"lfm2.5-1.2b-instruct","scriba":"qwen3.6-35b-a3b","magister":"qwen3.8-27b","faber":"qwen3.6-35b-a3b"},
  "mac-arm|48|gpu":{"velox":"lfm2.5-1.2b-instruct","scriba":"qwen3.6-35b-a3b","magister":"qwen3.8-27b-best","faber":"qwen3.6-35b-a3b"},
  "mac-arm|64|gpu":{"velox":"lfm2.5-1.2b-instruct","scriba":"qwen3.6-35b-a3b","magister":"qwen3.8-27b-best","faber":"qwen3.6-35b-a3b"},
  /* 6.10.2 (modules/r210.js): no ceiling at 64 GB; from 96 GB each house moves up (t_6102_large.js checks every band to 3 TB) */
  "mac-arm|96|gpu":{"velox":"lfm2.5-1.2b-instruct","scriba":"qwen3-next-80b-a3b-thinking","magister":"qwen3.5-122b-a10b-compact","faber":"qwen3-coder-next"},
  "mac-arm|128|gpu":{"velox":"lfm2.5-1.2b-instruct","scriba":"gpt-oss-120b","magister":"qwen3.5-122b-a10b","faber":"qwen3-coder-next"},
  "mac-arm|null|gpu":{"velox":"lfm2.5-1.2b-instruct","scriba":"qwen3.5-2b","magister":"qwen3.5-4b","faber":"lfm2.5-2.6b"},
  "desktop|4|gpu":{"velox":"lfm2.5-1.2b-instruct","scriba":"minicpm5-2b","magister":"qwen3.5-4b","faber":"lfm2.5-2.6b"},
  "desktop|6|gpu":{"velox":"lfm2.5-1.2b-instruct","scriba":"minicpm5-2b","magister":"qwen3.5-4b","faber":"granite-4.2-3b"},
  "desktop|8|gpu":{"velox":"lfm2.5-1.2b-instruct","scriba":"minicpm5-2b","magister":"qwen3.5-4b","faber":"granite-4.2-8b-compact"},
  "desktop|12|gpu":{"velox":"lfm2.5-1.2b-instruct","scriba":"gemma-4-e4b","magister":"qwen3.5-9b","faber":"gemma-4-12b"},
  "desktop|16|gpu":{"velox":"lfm2.5-1.2b-instruct","scriba":"gemma-4-e4b","magister":"qwen3.5-9b","faber":"mellum2.1-12b-thinking"},
  "desktop|24|gpu":{"velox":"lfm2.5-1.2b-instruct","scriba":"gemma-4-26b-a4b","magister":"gemma-4-26b-a4b","faber":"gemma-4-26b-a4b"},
  "desktop|32|gpu":{"velox":"lfm2.5-1.2b-instruct","scriba":"gemma-4-26b-a4b","magister":"qwen3.8-27b","faber":"qwen3-coder-30b-a3b"},
  "desktop|36|gpu":{"velox":"lfm2.5-1.2b-instruct","scriba":"qwen3.6-35b-a3b","magister":"qwen3.8-27b","faber":"qwen3.6-35b-a3b"},
  "desktop|48|gpu":{"velox":"lfm2.5-1.2b-instruct","scriba":"qwen3.6-35b-a3b","magister":"qwen3.8-27b-best","faber":"qwen3.6-35b-a3b"},
  "desktop|64|gpu":{"velox":"lfm2.5-1.2b-instruct","scriba":"qwen3.6-35b-a3b","magister":"qwen3.8-27b-best","faber":"qwen3.6-35b-a3b"},
  "desktop|96|gpu":{"velox":"lfm2.5-1.2b-instruct","scriba":"qwen3-next-80b-a3b-thinking","magister":"qwen3.5-122b-a10b-compact","faber":"qwen3-coder-next"},
  "desktop|128|gpu":{"velox":"lfm2.5-1.2b-instruct","scriba":"gpt-oss-120b","magister":"qwen3.5-122b-a10b","faber":"qwen3-coder-next"},
  "desktop|null|gpu":{"velox":"lfm2.5-1.2b-instruct","scriba":"qwen3.5-2b","magister":"qwen3.5-4b","faber":"lfm2.5-2.6b"},
  "desktop|4|cpu":{"velox":"lfm2.5-1.2b-instruct","scriba":"minicpm5-2b","magister":"qwen3.5-4b","faber":"lfm2.5-2.6b"},
  "desktop|6|cpu":{"velox":"lfm2.5-1.2b-instruct","scriba":"minicpm5-2b","magister":"qwen3.5-4b","faber":"granite-4.2-3b"},
  "desktop|8|cpu":{"velox":"lfm2.5-1.2b-instruct","scriba":"minicpm5-2b","magister":"qwen3.5-4b","faber":"granite-4.2-3b"},
  "desktop|12|cpu":{"velox":"lfm2.5-1.2b-instruct","scriba":"minicpm5-2b","magister":"qwen3.5-4b","faber":"lfm2.5-8b-a1b"},
  "desktop|16|cpu":{"velox":"lfm2.5-1.2b-instruct","scriba":"minicpm5-2b","magister":"qwen3.5-4b","faber":"mellum2.1-12b-thinking"},
  "desktop|24|cpu":{"velox":"lfm2.5-1.2b-instruct","scriba":"gemma-4-26b-a4b","magister":"gemma-4-26b-a4b","faber":"gemma-4-26b-a4b"},
  "desktop|32|cpu":{"velox":"lfm2.5-1.2b-instruct","scriba":"gemma-4-26b-a4b","magister":"gemma-4-26b-a4b","faber":"qwen3-coder-30b-a3b"},
  "desktop|36|cpu":{"velox":"lfm2.5-1.2b-instruct","scriba":"qwen3.6-35b-a3b","magister":"qwen3.6-35b-a3b","faber":"qwen3.6-35b-a3b"},
  "desktop|48|cpu":{"velox":"lfm2.5-1.2b-instruct","scriba":"qwen3.6-35b-a3b","magister":"qwen3.6-35b-a3b","faber":"qwen3.6-35b-a3b"},
  "desktop|64|cpu":{"velox":"lfm2.5-1.2b-instruct","scriba":"qwen3.6-35b-a3b","magister":"qwen3.6-35b-a3b","faber":"qwen3.6-35b-a3b"},
  "desktop|96|cpu":{"velox":"lfm2.5-1.2b-instruct","scriba":"qwen3-next-80b-a3b-thinking","magister":"qwen3.5-122b-a10b-compact","faber":"qwen3-coder-next"},
  "desktop|128|cpu":{"velox":"lfm2.5-1.2b-instruct","scriba":"gpt-oss-120b","magister":"qwen3.5-122b-a10b","faber":"qwen3-coder-next"},
  "desktop|null|cpu":{"velox":"lfm2.5-1.2b-instruct","scriba":"qwen3.5-2b","magister":"qwen3.5-4b","faber":"lfm2.5-2.6b"}};
const NEED = {"lfm2.5-1.2b-instruct":1.462,"lfm2.5-350m":0.939,"lfm2.5-1.2b-thinking":1.462,"lfm2.5-2.6b":2.447,"qwen3.5-2b":2.036,"qwen3.5-4b":3.559,"qwen3.5-9b":6.625,"mellum2-12b-thinking":9.119,"mellum2.1-12b-thinking":9.119,"gemma-4-12b":7.976,"gemma-4-26b-a4b":15.761,"gemma-4-e4b":6.077,"gemma-4-e2b":4.194,"lfm2.5-8b-a1b":6.078,"lfm2.5-24b-a2b":15.852,"granite-4.2-3b":3.041,"qwen3-coder-30b-a3b":20.056,"qwen2.5-coder-1.5b":1.865,"minicpm5-2b":2.329,"qwen3.8-27b":20.491,"qwen3.6-35b-a3b":23.788,"granite-4.2-8b":6.278,"gemma-4-31b":19.111,"granite-4.2-8b-compact":5.234,"qwen3.5-9b-compact":5.575,"qwen3.8-27b-best":30.528};
// the repositories round 7 of the lineup workflow listed (R lines of round7.log), and the file of each quality that More models will take (F lines)
const REPOS = ["HuggingFaceTB/SmolLM2-360M-Instruct-GGUF","LiquidAI/LFM2.5-1.2B-Instruct-GGUF","LiquidAI/LFM2.5-1.2B-Thinking-GGUF","LiquidAI/LFM3-1.7B-GGUF","LiquidAI/LFM3-VL-2B-GGUF","bartowski/SmolLM2-135M-Instruct-GGUF","bartowski/SmolLM2-360M-Instruct-GGUF","ggml-org/NVIDIA-Nemotron-3.5-Lightning-30B-A3B-GGUF","ggml-org/Qwen3.8-27B-GGUF","ggml-org/gemma-4-31B-it-GGUF","google/gemma-4-31B-it-qat-q4_0-gguf","ibm-granite/granite-4.2-30b-GGUF","ibm-granite/granite-4.2-3b-GGUF","ibm-granite/granite-4.2-8b-GGUF","lmstudio-community/Bonsai-27B-GGUF","lmstudio-community/Muse-Glimmer-30B-GGUF","lmstudio-community/Qwen3.8-27B-GGUF","meta-models/Muse-Glimmer-30B-GGUF","openbmb/MiniCPM5-2B-GGUF","unsloth/NVIDIA-Nemotron-3.5-Lightning-30B-A3B-GGUF","unsloth/Qwen3.5-2B-GGUF","unsloth/Qwen3.5-4B-GGUF","unsloth/Qwen3.5-9B-GGUF","unsloth/Qwen3.6-35B-A3B-GGUF","unsloth/Qwen3.8-27B-GGUF","unsloth/gemma-4-31B-it-qat-GGUF"];
const KNOWN = {"qwen3.8-27b":{"Q4_K_M":18973870528,"Q5_K_M":19771509664,"Q8_0":28595763648},"qwen3.6-35b-a3b":{"Q4_K_M":22134528992,"Q5_K_M":26456194016,"Q8_0":36903140320},"granite-4.2-8b":{"Q3_K_M":4347052160,"Q4_K_M":5347917952,"Q5_K_M":6253887616,"Q8_0":9345613952},"granite-4.2-30b":{"Q4_K_M":17721455328,"Q5_K_M":20775957216,"Q8_0":31111705312},"nemotron-3.5-lightning-30b-a3b":{"Q4_K_M":25266255936,"Q5_K_M":30215272512,"Q8_0":33585495616},"muse-glimmer-30b":{"Q4_K_M":16756683904},"gemma-4-31b":{"Q4_0":17651001568}};
(async () => {
  const b = await pw.chromium.launch(); const p = await (await b.newContext({ viewport: { width: 1400, height: 1000 } })).newPage();
  const errs = []; p.on('pageerror', e => errs.push(e.message.slice(0, 200)));
  await p.goto(URL_); await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 300000 }); await p.waitForTimeout(700);
  await p.evaluate(() => { const k = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Enter' && x.offsetParent); if (k) k.click(); });
  await p.waitForTimeout(500);
  // the page reads the memory from window.__INGENIUM_DEVICE or navigator.deviceMemory: the second is made unknown, the first is set per band
  await p.evaluate(() => { try { Object.defineProperty(navigator, 'deviceMemory', { value: undefined, configurable: true }); } catch (e) {} });
  const setDev = (kind, ram, cpu) => p.evaluate(([kind, ram, cpu]) => { window.lineupDevice = () => kind; window.lineupCpuOnly = () => !!cpu;
    window.__INGENIUM_DEVICE = ram == null ? null : { ramGB: ram }; state.tierPick = {}; return [deviceMemGB(), lineupUsableGB()]; }, [kind, ram, cpu]);
  const picks = () => p.evaluate(() => { const o = {}; ING_LINEUP.tiers.forEach(t => { o[t.id] = lineupKeyFor(t.id); }); return o; });
  const same = (a, b) => ['velox', 'scriba', 'magister', 'faber'].every(t => a[t] === b[t]);

  // ---- 1. every kind of device and band picks the house the lists mean (the page's rule, against the written-out table) ----
  const bad = []; let n = 0;
  for (const key of Object.keys(PICKS)) { const [kind, ram, mode] = key.split('|'); const r = ram === 'null' ? null : +ram;
    const mem = await setDev(kind, r, mode === 'cpu'); const got = await picks(); n++;
    if (r != null && (mem[0] !== r || Math.abs(mem[1] - r * (kind === 'android' || kind === 'ios' ? 0.55 : 0.68)) > 1e-9)) bad.push([key, 'memory read', mem]);
    if (r == null && (mem[0] !== null || mem[1] !== null)) bad.push([key, 'memory should be unknown', mem]);
    if (!same(got, PICKS[key])) bad.push([key, got, PICKS[key]]); }
  ok(n >= 50 && bad.length === 0, 'every device kind and memory band picks its houses as the lists mean (' + n + ' rows: phones, Macs with Apple silicon, Windows and Intel, the processor alone, memory unknown)', bad.slice(0, 4));

  // ---- 2. her devices, one by one, in words ----
  const NAMES = await p.evaluate(() => { const o = {}; for (const k in ING_LINEUP.models) o[k] = ING_LINEUP.models[k].name; return o; });
  const say = async (kind, ram, cpu) => { await setDev(kind, ram, cpu); const g = await picks(); return Object.fromEntries(Object.entries(g).map(([t, k]) => [t, NAMES[k]])); };
  const mbp = await say('mac-arm', 8, false);
  ok(mbp.velox === 'LFM2.5 1.2B Instruct' && mbp.scriba === 'MiniCPM5 2B' && mbp.magister === 'Qwen3.5 4B' && mbp.faber === 'Granite 4.2 8B · Compact', 'MacBook Pro, 8 GB (5.4 GB to spare): Velox LFM2.5 1.2B, Scriba MiniCPM5 2B, Magister Qwen3.5 4B, Faber Granite 4.2 8B in its compact copy', mbp);
  const mini = await say('mac-arm', 16, false), hp = await say('desktop', 16, false), hpCpu = await say('desktop', 16, true);
  ok(mini.scriba === 'Gemma 4 E4B' && mini.magister === 'Qwen3.5 9B' && mini.faber === 'Mellum2.1 12B Thinking' && mini.velox === 'LFM2.5 1.2B Instruct', 'Mac mini, 16 GB: Scriba Gemma 4 E4B, Magister Qwen3.5 9B, Faber Mellum2.1 12B Thinking', mini);
  ok(JSON.stringify(hp) === JSON.stringify(mini), 'a Windows laptop with 16 GB and a graphics chip has the same houses as the Mac mini', hp);
  ok(hpCpu.scriba === 'MiniCPM5 2B' && hpCpu.magister === 'Qwen3.5 4B' && hpCpu.faber === 'Mellum2.1 12B Thinking', 'a Windows laptop with 16 GB and no graphics chip the engine can use: Scriba MiniCPM5 2B, Magister Qwen3.5 4B (twice as quick on a processor), Faber Mellum2.1 (about 2.5B at work)', hpCpu);
  const mac64 = await say('mac-arm', 64, false), mac32 = await say('mac-arm', 32, false), mac24 = await say('mac-arm', 24, false);
  ok(mac64.scriba === 'Qwen3.6 35B-A3B' && mac64.magister === 'Qwen3.8 27B · Best' && mac64.faber === 'Qwen3.6 35B-A3B', 'a Mac with 64 GB: Scriba and Faber Qwen3.6 35B-A3B (quick), Magister Qwen3.8 27B in its Best quality', mac64);
  ok(mac32.scriba === 'Gemma 4 26B A4B' && mac32.magister === 'Qwen3.8 27B' && mac32.faber === 'Qwen3.8 27B' && mac24.magister === 'Gemma 4 26B A4B', 'a Mac with 32 GB: Magister Qwen3.8 27B, Scriba Gemma 4 26B-A4B; with 24 GB Gemma 4 26B-A4B', [mac32, mac24]);
  const w32 = await say('desktop', 32, false), w48 = await say('desktop', 48, false);
  ok(w32.faber === 'Qwen3-Coder 30B-A3B' && w32.magister === 'Qwen3.8 27B' && w48.faber === 'Qwen3.6 35B-A3B', 'on Windows and Intel the quick mixture-of-experts coder comes before the dense 27B (32 GB: Qwen3-Coder 30B-A3B; 48 GB: Qwen3.6 35B-A3B)', [w32, w48]);
  const fire4 = await say('android', 4, false), fire6 = await say('android', 6, false), ph8 = await say('ios', 8, false), ph3 = await say('ios', 3, false);
  ok(fire4.scriba === 'LFM2.5 1.2B Thinking' && fire6.scriba === 'MiniCPM5 2B' && ph8.scriba === 'MiniCPM5 2B' && ph3.scriba === 'Qwen3.5 2B', 'phones and tablets: Scriba is MiniCPM5 2B with about 4.5 GB or more (a 4 GB Fire tablet keeps LFM2.5 1.2B Thinking; an iPhone with 3 GB keeps Qwen3.5 2B)', [fire4, fire6, ph8, ph3]);

  // ---- 3. Compact (and Best) only where intended ----
  const cp = await p.evaluate(() => { const hits = [], kinds = ['android', 'ios', 'mac-arm', 'desktop'];
    for (const kind of kinds) for (const cpu of [false, true]) for (let ram = 2; ram <= 160; ram += 0.25) { if (cpu && kind !== 'desktop') continue;   // only a Windows or Intel computer can be on its processor alone
      window.lineupDevice = () => kind; window.lineupCpuOnly = () => cpu; window.__INGENIUM_DEVICE = { ramGB: ram }; state.tierPick = {};
      ING_LINEUP.tiers.forEach(t => { const k = lineupKeyFor(t.id); if (ING_LINEUP.models[k] && ING_LINEUP.models[k].variantOf) hits.push([kind, cpu, ram, t.id, k]); }); }
    return hits; });
  const where = {}; cp.forEach(([kind, cpu, ram, tier, k]) => { const w = where[k] = where[k] || { kinds: new Set(), cpu: false, tiers: new Set(), lo: 1e9, hi: 0 }; w.kinds.add(kind); w.cpu = w.cpu || cpu; w.tiers.add(tier); w.lo = Math.min(w.lo, ram); w.hi = Math.max(w.hi, ram); });
  const wh = Object.fromEntries(Object.entries(where).map(([k, w]) => [k, { kinds: [...w.kinds], cpu: w.cpu, tiers: [...w.tiers], lo: w.lo, hi: w.hi }]));
  const gc = wh['granite-4.2-8b-compact'] || {}, qc = wh['qwen3.5-9b-compact'] || {}, qb = wh['qwen3.8-27b-best'] || {};
  ok(gc.tiers && gc.tiers.join() === 'faber' && !gc.cpu && gc.kinds.sort().join() === 'desktop,mac-arm' && gc.lo >= 7.5 && gc.hi <= 9, 'the compact Granite 4.2 8B is Faber\'s only on a computer with 8 GB (never on a phone, never on a processor alone)', gc);
  ok(qc.tiers && qc.tiers.join() === 'magister' && !qc.cpu && qc.lo >= 8.2 && qc.hi <= 9.8, 'the compact Qwen3.5 9B is Magister\'s only between 8.2 and 9.7 GB: on an 8 GB computer it needs ' + NEED['qwen3.5-9b-compact'] + ' GB against 5.44 to spare, so Magister stays Qwen3.5 4B there', qc);
  ok(qb.tiers && qb.tiers.join() === 'magister' && !qb.cpu && qb.lo >= 44 && qb.kinds.sort().join() === 'desktop,mac-arm', 'Qwen3.8 27B in its Best quality is Magister\'s only on a computer with 45 GB or more (never on a processor alone)', qb);
  ok(Object.keys(wh).length === 3, 'no other copy is ever chosen', Object.keys(wh));

  // ---- 4. a processor alone never gets a dense model that is slow there; a cpuOnly entry may still be one model ----
  const cpuBad = await p.evaluate(() => { const dense = ['qwen3.8-27b', 'qwen3.8-27b-best', 'gemma-4-31b', 'gemma-4-12b', 'qwen3.5-9b', 'qwen3.5-9b-compact', 'granite-4.2-8b', 'granite-4.2-8b-compact', 'mellum2-12b-thinking'], bad = [];
    for (const ram of [4, 6, 8, 12, 16, 24, 32, 36, 48, 64, 96, 128]) { window.lineupDevice = () => 'desktop'; window.lineupCpuOnly = () => true; window.__INGENIUM_DEVICE = { ramGB: ram }; state.tierPick = {};
      ING_LINEUP.tiers.forEach(t => { const k = lineupKeyFor(t.id); if (dense.indexOf(k) >= 0) bad.push([ram, t.id, k]); }); }
    const d = ING_LINEUP.devices.desktop, keep = d.cpuOnly.magister; d.cpuOnly.magister = 'qwen3.5-4b'; window.__INGENIUM_DEVICE = { ramGB: 64 }; const one = lineupKeyFor('magister'); d.cpuOnly.magister = keep;
    const lists = ['scriba', 'magister', 'faber'].every(t => Array.isArray(d.cpuOnly[t]) && d.cpuOnly[t].every(k => ING_LINEUP.models[k]));
    return { bad, one, lists }; });
  ok(cpuBad.bad.length === 0 && cpuBad.lists, 'a computer that runs on its processor alone is never given a dense 12B, 27B or 31B model, at any memory', cpuBad);
  ok(cpuBad.one === 'qwen3.5-4b', 'a cpuOnly entry that is one model (as before) still works', cpuBad.one);

  // ---- 5. memory unknown: the smallest model of each list (the last), not the first ----
  const unk = await p.evaluate(() => { const o = {}; for (const kind of ['android', 'ios', 'mac-arm', 'desktop']) for (const cpu of [false, true]) { if (cpu && kind !== 'desktop') continue;
      window.lineupDevice = () => kind; window.lineupCpuOnly = () => cpu; window.__INGENIUM_DEVICE = null; state.tierPick = {};
      const d = ING_LINEUP.devices[kind]; ING_LINEUP.tiers.forEach(t => { const v = [].concat(d.tiers[t.id]), l = cpu && d.cpuOnly && d.cpuOnly[t.id] ? [].concat(d.cpuOnly[t.id]) : v;
        o[kind + (cpu ? '|cpu|' : '|') + t.id] = [lineupKeyFor(t.id), l[l.length - 1]]; }); }
    return o; });
  ok(Object.values(unk).every(([g, w]) => g === w), 'with the memory unknown (Safari, Firefox) every house takes the smallest model of its list', Object.entries(unk).filter(([k, [g, w]]) => g !== w));
  const web = await p.evaluate(() => { window.lineupDevice = () => 'web'; window.__INGENIUM_DEVICE = null; state.tierPick = {}; const o = {}; ING_LINEUP.tiers.forEach(t => { o[t.id] = lineupKeyFor(t.id, 'desktop'); }); return o; });
  ok(web.scriba === 'qwen3.5-2b' && web.magister === 'qwen3.5-4b' && web.faber === 'lfm2.5-2.6b', 'the Models tiles of a web browser (memory unknown) show the smallest, not Qwen3.6 35B-A3B or Qwen3.8 27B', web);

  // ---- 6. every model has size, SHA-256 and address; every list names models that exist; the table of qualities agrees ----
  const data = await p.evaluate(() => { const probs = [], M = ING_LINEUP.models, T = IngQuality.table, hex = /^[0-9a-f]{64}$/, n = Object.keys(M).length;
    const chk = (k, s, what) => { if (!s || typeof s.file !== 'string' || !/^[A-Za-z0-9._-]+\.gguf$/.test(s.file)) probs.push([what, k, 'file']); if (!(Number.isInteger(s.size) && s.size > 1e8)) probs.push([what, k, 'size']);
      if (!hex.test(s.sha256 || '')) probs.push([what, k, 'sha256']); if (!/^https:\/\/huggingface\.co\/[^/]+\/[^/]+\/resolve\/main\/([^/]+\/)?[^/]+\.gguf$/.test(s.url || '') || !String(s.url).endsWith('/' + s.file)) probs.push([what, k, 'url']); };
    for (const k in M) { const s = M[k]; chk(k, s, 'model'); ['name', 'maker', 'page', 'licence', 'licenceUrl'].forEach(f => { if (!s[f] || typeof s[f] !== 'string') probs.push(['model', k, f]); });
      if (!(s.params > 0)) probs.push(['model', k, 'params']); if (typeof s.thinks !== 'boolean') probs.push(['model', k, 'thinks']); if (!s.why || s.why.length < 60) probs.push(['model', k, 'why']);
      const a = lineupArgs(k); if (a.url !== s.url || a.sha256 !== s.sha256 || a.size !== s.size || a.file !== s.file) probs.push(['model', k, 'lineupArgs']); }
    for (const k in T) { if (!M[k]) probs.push(['table', k, 'no such model']); for (const q in T[k]) { chk(k + ' ' + q, T[k][q], 'quality'); }
      if (M[k] && T[k].Q4_K_M && !M[k].variantOf && (T[k].Q4_K_M.file !== M[k].file || T[k].Q4_K_M.sha256 !== M[k].sha256 || T[k].Q4_K_M.size !== M[k].size)) probs.push(['table', k, 'Q4_K_M differs from the lineup entry']); }
    for (const k in M) { const v = M[k].variantOf; if (v) { const t = T[v] && T[v][M[k].variantQuality]; if (!t || t.file !== M[k].file || t.sha256 !== M[k].sha256 || t.size !== M[k].size) probs.push(['variant', k, 'differs from its table entry']); } }
    for (const dv in ING_LINEUP.devices) { const d = ING_LINEUP.devices[dv]; for (const t in d.tiers) [].concat(d.tiers[t]).forEach(k => { if (!M[k]) probs.push(['list', dv + ' ' + t, k]); });
      for (const t in (d.cpuOnly || {})) [].concat(d.cpuOnly[t]).forEach(k => { if (!M[k]) probs.push(['cpuOnly', dv + ' ' + t, k]); }); }
    return { n, nq: Object.keys(T).length, probs, keys: Object.keys(M) }; });
  ok(data.n === 43 && data.probs.length === 0, data.n + ' models in the lineup (18 before, 5 new, 3 copies; since 6.10.2 seventeen more for larger computers, whose files may sit in a folder of their repository) and ' + data.nq + ' with a table of qualities: each has a file, a size, a SHA-256 and a Hugging Face address that ends in its file; every house list names a model that exists', data.probs.slice(0, 5));
  ok(['minicpm5-2b', 'qwen3.8-27b', 'qwen3.6-35b-a3b', 'gemma-4-31b', 'granite-4.2-8b', 'granite-4.2-8b-compact', 'qwen3.5-9b-compact', 'qwen3.8-27b-best'].every(k => data.keys.includes(k)), 'the new models and their copies are there', data.keys);
  const flags = await p.evaluate(() => { const M = ING_LINEUP.models, T = IngQuality.table; return { think: ['minicpm5-2b', 'qwen3.8-27b', 'qwen3.6-35b-a3b', 'gemma-4-31b', 'granite-4.2-8b', 'granite-4.2-3b'].map(k => M[k].thinks),
      compact: ['qwen3.5-9b', 'granite-4.2-8b'].map(k => !!(T[k] && T[k].Q3_K_M)), best: !!T['qwen3.8-27b'].Q8_0, noLector: !JSON.stringify(M).includes('Lector') }; });
  ok(flags.think.every(Boolean), 'the models whose cards give a thinking switch think first (Granite 4.2 3B now too, as IBM\'s card says)', flags);
  ok(flags.compact.every(Boolean) && flags.best && flags.noLector, 'the table of qualities has a Compact (Q3_K_M) for Qwen3.5 9B and Granite 4.2 8B, and Best (Q8_0) for Qwen3.8 27B', flags);

  const sayCopy = await p.evaluate(() => { const M = ING_LINEUP.models; return { c: ['granite-4.2-8b-compact', 'qwen3.5-9b-compact'].map(k => /compact copy/.test(M[k].why) && /Compact$/.test(M[k].name)), b: /Best quality/.test(M['qwen3.8-27b-best'].why) && /Best$/.test(M['qwen3.8-27b-best'].name) }; });
  ok(sayCopy.c.every(Boolean) && sayCopy.b, 'a compact copy says that it is a compact copy (and the Best copy that it is its Best quality), in its name and in its note', sayCopy);

  // ---- 7. the settings each card gives, thinking and plain apart ----
  const S = await p.evaluate(() => { const rec = f => ({ fileName: f }), o = {}, keep = window.activeTierFor;
    const get = (name, f, effort, think, tier) => { window.activeTierFor = () => tier || 'scriba'; const m = modelSampling(rec(f), effort, think); return m; };
    o.mini = [get('mini', 'MiniCPM5-2B-Q4_K_M.gguf', 3, true), get('mini', 'MiniCPM5-2B-Q4_K_M.gguf', 3, false)];
    o.gr3 = get('gr3', 'granite-4.2-3b-Q4_K_M.gguf', 3, true); o.gr8 = get('gr8', 'granite-4.2-8b-Q3_K_M.gguf', 3, false);
    o.q36 = [get('q36', 'Qwen3.6-35B-A3B-UD-Q4_K_M.gguf', 3, true), get('q36', 'Qwen3.6-35B-A3B-UD-Q4_K_M.gguf', 3, false), get('q36', 'Qwen3.6-35B-A3B-UD-Q4_K_M.gguf', 3, true, 'faber'), get('q36', 'Qwen3.6-35B-A3B-UD-Q4_K_M.gguf', 3, false, 'faber')];
    o.q38 = [get('q38', 'Qwen3.8-27B-Q4_K_M.gguf', 3, true), get('q38', 'Qwen3.8-27B-Q8_0.gguf', 3, false), get('q38', 'Qwen3.8-27B-Q4_K_M.gguf', 3, true, 'faber')];
    o.g31 = get('g31', 'gemma-4-31B_q4_0-it.gguf', 3, true); o.q35 = get('q35', 'Qwen3.5-9B-Q4_K_M.gguf', 3, true); o.cold = get('mini', 'MiniCPM5-2B-Q4_K_M.gguf', 5, true); o.hot = get('mini', 'MiniCPM5-2B-Q4_K_M.gguf', 1, true);
    window.activeTierFor = keep; return o; });
  const pick = (o, ks) => Object.fromEntries(ks.map(k => [k, o[k]]));
  const eq = (o, w) => Object.keys(w).every(k => o[k] === w[k]);
  ok(S.mini.every(o => o.family === 'minicpm5' && eq(o, { temperature: 1, top_p: 0.95, min_p: 0, repeat_penalty: 1 })), 'MiniCPM5 2B runs on its card\'s settings: temperature 1.0, top-p 0.95, min-p 0.0 (llama.cpp\'s 0.05 can make it repeat)', S.mini);
  ok(S.gr3.family === 'granite-4.2' && S.gr8.family === 'granite-4.2' && eq(S.gr3, { temperature: 1, top_p: 0.95, min_p: 0 }) && eq(S.gr8, { temperature: 1, top_p: 0.95 }), 'Granite 4.2 (3B and the 8B file) runs on IBM\'s settings for every task: temperature 1.0, top-p 0.95', [S.gr3, S.gr8]);
  ok(S.q36[0].family === 'qwen3.6' && eq(S.q36[0], { temperature: 1, top_p: 0.95, top_k: 20, min_p: 0, presence_penalty: 1.5 }) && eq(S.q36[1], { temperature: 0.7, top_p: 0.8, top_k: 20, min_p: 0, presence_penalty: 1.5 }), 'Qwen3.6 35B-A3B: its card\'s thinking set (1.0, 0.95, top-k 20, presence 1.5) and its plain set (0.7, 0.8, top-k 20, presence 1.5), by the Thinking key', S.q36.slice(0, 2));
  ok(S.q36[2].family === 'qwen3.6-code' && eq(S.q36[2], { temperature: 0.6, top_p: 0.95, top_k: 20, min_p: 0, presence_penalty: 0 }) && eq(S.q36[3], { temperature: 0.7, top_p: 0.8, presence_penalty: 0 }), 'under Faber Qwen3.6 thinks with the card\'s set for precise coding (temperature 0.6, no presence penalty); with thinking off, the plain set', S.q36.slice(2));
  ok(S.q38[0].family === 'qwen3.8' && eq(S.q38[0], { temperature: 1, top_p: 0.95, top_k: 20, min_p: 0, presence_penalty: 0 }) && S.q38[1].family === 'qwen3.8' && eq(S.q38[1], { temperature: 0.7, top_p: 0.8, top_k: 20, min_p: 0, presence_penalty: 1.5 }) && eq(S.q38[2], { temperature: 1, top_p: 0.95, presence_penalty: 0 }), 'Qwen3.8 27B (the Best file too): the card\'s thinking set (1.0, 0.95, top-k 20, presence 0) and plain set (0.7, 0.8, top-k 20, presence 1.5)', S.q38);
  ok(S.g31.family === 'gemma4' && eq(S.g31, { temperature: 1, top_k: 64, top_p: 0.95 }) && S.q35.family === 'qwen3.5', 'Gemma 4 31B uses the Gemma 4 settings of its card (1.0, top-k 64, 0.95); the families that were there are as they were', [S.g31, S.q35]);
  ok(S.cold.temperature === 0.45 && S.hot.temperature === 1.2, 'the effort setting still moves the temperature (a new family follows it too)', [S.cold.temperature, S.hot.temperature]);
  const plumbing = await p.evaluate(() => { const t = [...document.scripts].map(s => s.textContent || ''); return { sends: t.some(x => x.includes('if(p.thinking!=null)body.chat_template_kwargs={enable_thinking:!!p.thinking};')), key: (() => { state.thinking = false; const off = thinkOn(); state.thinking = true; const on = thinkOn(); return [off, on]; })() }; });
  ok(plumbing.sends && plumbing.key[0] === false && plumbing.key[1] === true, 'the Thinking key reaches every model\'s chat template as enable_thinking (Qwen3.8, Qwen3.6, Granite 4.2 and Gemma 4 take it, their cards say), and switches the sampling set with it', plumbing);

  // ---- 8. the strong models are offered, each with what it needs and what this device has to spare ----
  await setDev('mac-arm', 16, false); await p.evaluate(() => { go('models'); renderLineup(); }); await p.waitForTimeout(600);
  const o16 = await p.evaluate(() => { const o = {}; for (const t of ['scriba', 'magister', 'faber']) { const box = document.querySelector('#lineupGrid .lu-tile[data-tier="' + t + '"] .lu-coders');
      const rows = box ? [...box.querySelectorAll('.lu-cd')].map(r => ({ k: r.getAttribute('data-od') || r.getAttribute('data-cd'), fit: (r.querySelector('.lu-cd-fit') || {}).textContent, act: (r.querySelector('.lu-cd-acts') || {}).textContent })) : [];
      o[t] = { head: box ? box.querySelector('.lu-coders-h').textContent : null, rows, big: box ? (box.querySelector('details.lu-big > summary') || {}).textContent : null }; } return o; });
  const row = (t, k) => o16[t].rows.find(r => r.k === t + ':' + k || r.k === k);
  ok(o16.magister.head && /about 10\.9 GB of memory to spare/.test(o16.magister.head) && row('magister', 'qwen3.8-27b') && row('magister', 'qwen3.8-27b').fit.includes('Needs about ' + NEED['qwen3.8-27b'].toFixed(1) + ' GB: more than this computer has to spare') && /Install/.test(row('magister', 'qwen3.8-27b').act),
    'Magister on a 16 GB computer lists Qwen3.8 27B with "Needs about ' + NEED['qwen3.8-27b'].toFixed(1) + ' GB: more than this computer has to spare" and an Install key, under "about 10.9 GB of memory to spare"', o16.magister);
  ok(row('scriba', 'qwen3.6-35b-a3b') && row('scriba', 'qwen3.6-35b-a3b').fit.includes('Needs about ' + NEED['qwen3.6-35b-a3b'].toFixed(1) + ' GB') && row('scriba', 'gemma-4-e4b').fit.includes('fits here') && /larger models?, for computers with more memory/.test(o16.scriba.big || ''), 'Scriba lists Qwen3.6 35B-A3B (needs ' + NEED['qwen3.6-35b-a3b'].toFixed(1) + ' GB) among the larger models, and Gemma 4 E4B as fitting', o16.scriba);
  ok(['qwen3.6-35b-a3b', 'qwen3.8-27b', 'gemma-4-31b', 'qwen3-coder-30b-a3b'].every(k => row('faber', k) && /Needs about/.test(row('faber', k).fit)) && row('magister', 'gemma-4-31b'), 'Faber\'s list (and Magister\'s) offer the strong models too: Qwen3.6 35B-A3B, Qwen3.8 27B, Gemma 4 31B, Qwen3-Coder 30B-A3B', o16.faber.rows.map(r => r.k));
  await setDev('mac-arm', 64, false); await p.evaluate(() => { renderLineup(); }); await p.waitForTimeout(500);
  const o64 = await p.evaluate(() => { const box = document.querySelector('#lineupGrid .lu-tile[data-tier="magister"] .lu-coders'); const r = box && [...box.querySelectorAll('.lu-cd')].find(x => x.getAttribute('data-od') === 'magister:qwen3.8-27b-best');
    return { on: !!(r && r.classList.contains('on')), fit: r && r.querySelector('.lu-cd-fit').textContent, tile: document.querySelector('#lineupGrid .lu-tile[data-tier="magister"]').getAttribute('data-key') }; });
  ok(o64.on && /fits here/.test(o64.fit) && o64.tile === 'qwen3.8-27b-best', 'on a Mac with 64 GB Magister\'s tile shows Qwen3.8 27B in its Best quality, which fits', o64);
  // More models: the strong ones are in, with the files the log lists and the repositories round 7 read
  const cat = await p.evaluate(() => { const want = ['qwen3.8-27b', 'qwen3.6-35b-a3b', 'gemma-4-31b', 'granite-4.2-8b', 'granite-4.2-30b', 'nemotron-3.5-lightning-30b-a3b', 'muse-glimmer-30b'], by = {}; ING_CATALOG.forEach(e => { by[e.key] = e; });
    return { want: want.map(k => by[k] ? { k, repos: by[k].repos, known: by[k].known || null, strong: !!by[k].strong, quants: by[k].quants || null, n: (by[k].why || '').length } : { k, missing: true }), compact: CAT_Q.some(q => q.id === 'Q3_K_M' && q.label === 'Compact'), q40: CAT_Q.some(q => q.id === 'Q4_0'), n: ING_CATALOG.length, dup: ING_CATALOG.length !== new Set(ING_CATALOG.map(e => e.key)).size }; });
  const catBad = []; cat.want.forEach(e => { if (e.missing) { catBad.push([e.k, 'missing']); return; } if (!e.repos.every(r => REPOS.includes(r))) catBad.push([e.k, 'a repository the log does not show', e.repos]); const kn = KNOWN[e.k] || {};
    if (JSON.stringify(e.known) !== JSON.stringify(kn)) catBad.push([e.k, 'known sizes', e.known, kn]); if (!e.strong || e.n < 60) catBad.push([e.k, 'strong or why']); });
  ok(catBad.length === 0 && !cat.dup && cat.compact && cat.q40, 'More models has Qwen3.8 27B, Qwen3.6 35B-A3B, Gemma 4 31B, Granite 4.2 8B and 30B, Nemotron 3.5 Lightning and Muse Glimmer: repositories as the log shows them, sizes as the log lists them, a Compact and an As-released quality', { catBad, cat: cat.n });
  const pk = await p.evaluate(() => { const L = (n) => ({ type: 'file', path: n }); const a = catPick([L('mtp-gemma-4-31B-it-Q4_0.gguf'), L('gemma-4-31B-it-Q4_0.gguf')], 'Q4_0'), b = catPick([L('gemma-4-31B-it-mmproj.gguf'), L('gemma-4-31B_q4_0-it.gguf')], 'Q4_0'),
      c = catPick([L('MTP/mtp-Qwen3.8-27B-Q4_0.gguf'), L('Qwen3.8-27B-Q4_0.gguf')], 'Q4_0'), d = catPick([L('Qwen3.8-27B-Q8_0.gguf'), L('mtp-Qwen3.8-27B-Q8_0.gguf')], 'Q8_0'), e = catPick([L('Qwen3.6-35B-A3B-UD-Q4_K_M.gguf')], 'Q4_K_M');
    return [a && a.path, b && b.path, c && c.path, d && d.path, e && e.path]; });
  ok(pk[0] === 'gemma-4-31B-it-Q4_0.gguf' && pk[1] === 'gemma-4-31B_q4_0-it.gguf' && pk[2] === 'Qwen3.8-27B-Q4_0.gguf' && pk[3] === 'Qwen3.8-27B-Q8_0.gguf' && pk[4] === 'Qwen3.6-35B-A3B-UD-Q4_K_M.gguf', 'More models never takes a speed-up file (mtp-, dflash-) for the model, and takes Google\'s file named _q4_0-it.gguf for Q4_0', pk);
  await setDev('mac-arm', 16, false); const need16 = await p.evaluate(() => { go('models'); CAT_UI.showBig = true; renderLineup(); renderCatalog(); const rows = [...document.querySelectorAll('#catBox .cat-row')]; const r = rows.find(x => (x.querySelector('.cat-t b') || {}).textContent === 'Qwen3.8 27B');
    return { row: !!r, need: r && (r.querySelector('.cat-need') || {}).textContent, others: rows.filter(x => x.querySelector('.cat-need')).map(x => x.querySelector('.cat-t b').textContent).length }; }); await p.waitForTimeout(400);
  ok(need16.row && need16.need && new RegExp('^Needs about ' + NEED['qwen3.8-27b'].toFixed(1) + ' GB of memory; this device has about 10\\.9 GB to spare\\.$').test(need16.need), 'in More models Qwen3.8 27B says what it needs and what this 16 GB computer has to spare', need16);

  await setDev('mac-arm', 64, false); const need64 = await p.evaluate(() => { CAT_UI.showBig = false; renderLineup(); renderCatalog(); const rows = [...document.querySelectorAll('#catBox .cat-row')], names = rows.map(x => (x.querySelector('.cat-t b') || {}).textContent);
    const q = rows.find(x => (x.querySelector('.cat-t b') || {}).textContent === 'Qwen3.8 27B'), g = [...document.querySelectorAll('#catBox .cat-group')].map(x => x.textContent);
    return { names: ['Qwen3.8 27B', 'Qwen3.6 35B-A3B', 'Gemma 4 31B', 'Granite 4.2 30B'].map(n => names.includes(n)), need: q && (q.querySelector('.cat-need') || {}).textContent, fit: q && (q.querySelector('.cat-fit') || {}).textContent, groups: g }; });
  ok(need64.names.every(Boolean) && /^Needs about \d+\.\d GB of memory; this device has about 43\.5 GB to spare\.$/.test(need64.need || '') && /fits this device/.test(need64.fit || ''), 'on a Mac with 64 GB the strong models are in More models among those that fit, each with what it needs and the 43.5 GB to spare', need64);

  // ---- 9. one plain line where a house cannot get stronger for lack of memory, pointing to lending ----
  const lend = async (kind, ram) => { await setDev(kind, ram, false); return p.evaluate(() => { renderLineup(); const o = {}; for (const t of ['velox', 'scriba', 'magister', 'faber']) { const e = document.querySelector('#lineupGrid .lu-tile[data-tier="' + t + '"] .lu-lend'); o[t] = e ? e.textContent : null; } return o; }); };
  const l16 = await lend('mac-arm', 16), l16w = await lend('desktop', 16), l64 = await lend('mac-arm', 64), l8 = await lend('mac-arm', 8), lph = await lend('ios', 8);
  const plain = s => s && /^(Scriba|Magister|Faber) cannot get stronger on this computer: its memory is the limit\. A computer with more memory can lend a stronger model over your home Wi-Fi: Settings, Your models on every device\.$/.test(s);
  ok(['scriba', 'magister', 'faber'].every(t => plain(l16[t]) && plain(l16w[t])) && l16.velox === null, 'a 16 GB Mac and a 16 GB Windows laptop: Scriba, Magister and Faber each say in one plain line that they cannot get stronger for lack of memory, and where a larger computer\'s models can be borrowed', [l16, l16w]);
  ok(['scriba', 'magister', 'faber'].every(t => plain(l64[t])) && ['scriba', 'magister', 'faber'].every(t => plain(l8[t])) && Object.values(lph).every(v => v === null), 'since 6.10.2 a Mac with 64 GB is no longer the top: each house says a computer with more memory has a stronger model (as on an 8 GB computer); none on a phone (its note speaks of lending already)', [l64, l8, lph]);
  await p.screenshot({ path: OUT + '/lineup_16gb.png' }).catch(() => {});
  ok(await p.evaluate(() => Object.values(window.__ingParts || {}).every(v => v === 'running') && window.__ingParts.p203 === 'running'), 'every part of the page ran to its end, r203 too');
  ok(errs.length === 0, 'no script errors on the page', errs);
  console.log(pass + ' passed, ' + fail + ' failed'); await b.close(); process.exit(fail ? 1 : 0);
})().catch(e => { console.log('FAIL the test itself: ' + e.message); process.exit(1); });
