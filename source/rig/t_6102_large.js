// Stronger models for larger computers (Ingenium 6.10.2, modules/r210.js; the computer app's side in desktop/app_parts_6102.py). Her words
// (3 November 2026): "I don't want Ingenium to be capped at 64 GB RAM in case I get better hardware that are far more capable in the future."
// Memory is stubbed as the page reads it (window.__INGENIUM_DEVICE.ramGB), the kind of device as lineupDevice() gives it, and a computer with
// no graphics chip as lineupCpuOnly() gives it. What the page sends to install a model in parts is then checked by the computer app's own
// check (its CODE, run in Python), so the two sides agree.
//   node rig/t_6102_large.js <Ingenium page url> <out folder>
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs'); const path = require('path'); const { execFileSync } = require('child_process');
const [URL_, OUT] = process.argv.slice(2); fs.mkdirSync(OUT, { recursive: true });
let pass = 0, fail = 0; const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (c || d === undefined ? '' : '  ' + String(typeof d === 'string' ? d : JSON.stringify(d)).slice(0, 700))); c ? pass++ : fail++; };
// what each memory band should pick on a computer with a graphics chip (Mac or Windows alike), from the lists and the rule need = file GiB x 1.12 + 0.7
const BANDS = {
  96: { scriba: 'qwen3-next-80b-a3b-thinking', magister: 'qwen3.5-122b-a10b-compact', faber: 'qwen3-coder-next' },
  128: { scriba: 'gpt-oss-120b', magister: 'qwen3.5-122b-a10b', faber: 'qwen3-coder-next' },
  192: { scriba: 'qwen3.8-flash-next', magister: 'qwen3.8-flash-next', faber: 'qwen3-coder-next' },
  256: { scriba: 'qwen3.8-flash-next', magister: 'deepseek-v4-flash', faber: 'glm-5.3-flash-compact' },
  384: { scriba: 'qwen3.8-flash-next', magister: 'minimax-m3.1-flash', faber: 'glm-5.3-flash' },
  512: { scriba: 'qwen3.8-flash-next', magister: 'minimax-m3.1-flash', faber: 'glm-5.3-flash' },
  768: { scriba: 'qwen3.8-flash-next', magister: 'glm-5.3', faber: 'glm-5.3' },
  1024: { scriba: 'qwen3.8-flash-next', magister: 'glm-5.3', faber: 'glm-5.3' },
  1536: { scriba: 'qwen3.8-flash-next', magister: 'deepseek-v4-pro', faber: 'glm-5.3' },
  2048: { scriba: 'qwen3.8-flash-next', magister: 'deepseek-v4-pro', faber: 'glm-5.3' },
  3072: { scriba: 'qwen3.8-flash-next', magister: 'kimi-k3-best', faber: 'glm-5.3' } };
const CPU = {
  96: { scriba: 'qwen3-next-80b-a3b-thinking', magister: 'qwen3.5-122b-a10b-compact', faber: 'qwen3-coder-next' },
  128: { scriba: 'gpt-oss-120b', magister: 'qwen3.5-122b-a10b', faber: 'qwen3-coder-next' },
  192: { scriba: 'qwen3.8-flash-next', magister: 'qwen3.8-flash-next', faber: 'qwen3-coder-next' },
  256: { scriba: 'qwen3.8-flash-next', magister: 'qwen3.8-flash-next', faber: 'glm-5.3-flash-compact' },
  512: { scriba: 'qwen3.8-flash-next', magister: 'qwen3.5-397b-a17b', faber: 'glm-5.3-flash' } };
(async () => {
  const b = await pw.chromium.launch(); const p = await (await b.newContext({ viewport: { width: 1400, height: 1000 } })).newPage();
  const errs = []; p.on('pageerror', e => errs.push(e.message.slice(0, 200)));
  await p.goto(URL_); await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 300000 }); await p.waitForTimeout(700);
  await p.evaluate(() => { const k = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Enter' && x.offsetParent); if (k) k.click(); });
  await p.waitForTimeout(500);
  const setDev = (kind, ram, cpu) => p.evaluate(([kind, ram, cpu]) => { window.lineupDevice = () => kind; window.lineupCpuOnly = () => cpu; try { Object.defineProperty(navigator, 'deviceMemory', { configurable: true, get: () => undefined }); } catch (e) {}
    window.__INGENIUM_DEVICE = ram == null ? null : { ramGB: ram }; state.tierPick = {}; return lineupUsableGB(); }, [kind, ram, cpu]);
  const picks = () => p.evaluate(() => { const o = {}; ['scriba', 'magister', 'faber'].forEach(t => { o[t] = lineupKeyFor(t); }); return o; });

  // 1. every band from 96 GB to 3 TB moves each house up, on a Mac and on Windows alike
  const bad = [];
  for (const kind of ['mac-arm', 'desktop']) for (const ram of Object.keys(BANDS)) { await setDev(kind, +ram, false); const g = await picks(); if (JSON.stringify(g) !== JSON.stringify(BANDS[ram])) bad.push([kind, ram, g]); }
  ok(bad.length === 0, 'from 96 GB to 3 TB each house moves up to the largest model that fits (22 bands, Mac and Windows): 96 GB Qwen3.5 122B-A10B compact, 128 GB its usual copy, 192 GB Qwen3.8 Flash Next, 256 GB DeepSeek V4 Flash, 384 and 512 GB MiniMax M3.1 Flash, 768 GB and 1 TB GLM-5.3, 1.5 and 2 TB DeepSeek V4 Pro, 3 TB Kimi K3', bad.slice(0, 3));
  const cbad = [];
  for (const ram of Object.keys(CPU)) { await setDev('desktop', +ram, true); const g = await picks(); if (JSON.stringify(g) !== JSON.stringify(CPU[ram])) cbad.push([ram, g]); }
  ok(cbad.length === 0, 'a large computer with no graphics chip the engine can use gets only the models with few parameters at work on each word (at most 18B)', cbad.slice(0, 3));
  const LK = await p.evaluate(() => window.IngR210.keys);
  const small = []; for (const [kind, ram] of [['mac-arm', 8], ['mac-arm', 16], ['desktop', 16], ['mac-arm', 32], ['mac-arm', 64], ['desktop', 64]]) { await setDev(kind, ram, false); const g = await picks(); if (Object.values(g).some(k => LK.includes(k))) small.push([kind, ram, g]); }
  ok(small.length === 0, 'computers of 8 to 64 GB keep the houses they had: none is handed a large model', small);

  // 2. the models: files, parts, fingerprints, licences, and what each needs, as listed
  const data = await p.evaluate(() => { const L = window.IngR210, M = ING_LINEUP.models, probs = [], hex = /^[0-9a-f]{64}$/, out = {};
    L.keys.forEach(k => { const s = M[k]; if (!s) { probs.push([k, 'missing']); return; }
      ['name', 'maker', 'page', 'licence', 'licenceUrl', 'why'].forEach(f => { if (!s[f]) probs.push([k, f]); });
      if (!/^https:\/\/huggingface\.co\//.test(s.page)) probs.push([k, 'page']);
      const a = lineupArgs(k), parts = s.parts || null;
      if (parts) { const n = parts.length, sum = parts.reduce((t, q) => t + q.size, 0);
        if (sum !== s.size || parts[0].file !== s.file || parts[0].sha256 !== s.sha256 || parts[0].url !== s.url) probs.push([k, 'first part or sum']);
        parts.forEach((q, i) => { const m = /^(.+)-(\d{5})-of-(\d{5})\.gguf$/.exec(q.file); if (!m || +m[2] !== i + 1 || +m[3] !== n || !hex.test(q.sha256) || !q.url.endsWith('/' + q.file) || !(q.size > 0)) probs.push([k, 'part ' + (i + 1)]); });
        if (!a.parts || a.parts.length !== n || JSON.stringify(a.parts) !== JSON.stringify(parts.map(q => ({ file: q.file, size: q.size, sha256: q.sha256, url: q.url })))) probs.push([k, 'lineupArgs parts']); }
      else if (a.parts) probs.push([k, 'parts for one file']);
      const need = lineupNeedGB(s); if (!new RegExp('needing about ' + need.toFixed(1).replace('.', '\\.') + ' GB of memory').test(s.why)) probs.push([k, 'why says another need', need.toFixed(1)]);
      out[k] = { n: parts ? parts.length : 1, gb: +(s.size / 1e9).toFixed(1), need: +need.toFixed(1) }; });
    return { probs, out, n: L.keys.length }; });
  ok(data.n === 17 && data.probs.length === 0, '17 larger models: each with its page, licence and note; every part in order, named as the engine reads them, adding up to the model, its first part standing for it, and sent with the install; each note says what it needs by the app\'s rule', data.probs.slice(0, 5));
  ok(data.out['kimi-k3-best'].n === 32 && data.out['deepseek-v4-pro'].n === 20 && data.out['qwen3-coder-next'].n === 1 && data.out['gpt-oss-120b'].n === 1, 'from one file (Qwen3-Coder-Next, gpt-oss-120b) to 32 parts (Kimi K3)', data.out);
  fs.writeFileSync(path.join(OUT, 'large.json'), JSON.stringify(data.out, null, 1));

  // 3. what the page sends passes the computer app's own check (app_parts_6102.py's _install_check over the app's own R70 check)
  const args = await p.evaluate(() => window.IngR210.keys.map(k => lineupArgs(k)));
  fs.writeFileSync(path.join(OUT, 'args.json'), JSON.stringify(args));
  const py = `
import json, re, sys, importlib.util
spec = importlib.util.spec_from_file_location("p", sys.argv[1]); mod = importlib.util.module_from_spec(spec); spec.loader.exec_module(mod)
def _install_check(spec):
    try:
        key = str(spec.get("key") or ""); url = str(spec.get("url") or ""); sha = str(spec.get("sha256") or "").lower(); fname = str(spec.get("file") or ""); size = int(spec.get("size") or 0)
    except Exception:
        return None
    if not (key and url.startswith("https://huggingface.co/") and re.match(r"^[0-9a-f]{64}$", sha) and re.match(r"^[A-Za-z0-9._-]{1,200}\\.gguf$", fname) and size > 0):
        return None
    tiers = spec.get("tiers") if isinstance(spec.get("tiers"), list) else []
    return {"key": key, "url": url, "sha256": sha, "file": fname, "size": size, "name": str(spec.get("name") or fname), "tiers": [str(t) for t in tiers][:8]}
ns = {"re": re, "os": __import__("os"), "_install_check": _install_check, "_install_worker": None, "_pick_model_files": None}
exec(mod.CODE, ns)
res = []
for a in json.load(open(sys.argv[2])):
    sp = ns["_install_check"](a)
    res.append([a["key"], bool(sp), len(sp["parts"]) if sp and sp.get("parts") else (1 if sp else 0)])
print(json.dumps(res))
`;
  let res = null; try { res = JSON.parse(execFileSync('python3', ['-I', '-c', py, path.join(__dirname, '..', 'build', 'desktop', 'app_parts_6102.py'), path.join(OUT, 'args.json')]).toString()); } catch (e) { res = String(e).slice(0, 300); }
  ok(Array.isArray(res) && res.length === 17 && res.every(r => r[1] && r[2] === data.out[r[0]].n), 'what the page sends for each of the 17 is accepted by the computer app\'s own check, with the same number of parts', res);

  // 4. the settings each card gives
  const S = await p.evaluate(() => { const keep = window.activeTierFor; window.activeTierFor = () => 'magister'; const fam = f => { const m = modelSampling({ fileName: f }, 3, true); return m && m.family; };
    const o = { coder: fam('Qwen3-Coder-Next-Q4_K_M.gguf'), q397: fam('Qwen3.5-397B-A17B-UD-Q4_K_XL-00001-of-00006.gguf'), q122: fam('Qwen3.5-122B-A10B-Q4_K_M-00001-of-00003.gguf'), glm: fam('GLM-5.3-Flash-UD-Q4_K_XL-00001-of-00006.gguf'),
      mm: fam('MiniMax-M3.1-Flash-UD-Q4_K_XL-00001-of-00007.gguf'), ds: fam('DeepSeek-V4-Pro-0813-UD-Q4_K_XL-00001-of-00020.gguf'), bolt: fam('NVIDIA-Nemotron-3.5-Bolt-74B-A9B-UD-Q4_K_XL-00001-of-00003.gguf'),
      flash: fam('Qwen3.8-Flash-Next-UD-Q4_K_XL-00001-of-00004.gguf'), oss: fam('gpt-oss-120b-MXFP4.gguf'), kimi: fam('Kimi-K3-UD-Q2_K_XL-00001-of-00019.gguf') };
    o.q397set = modelSampling({ fileName: 'Qwen3.5-397B-A17B-UD-Q4_K_XL-00001-of-00006.gguf' }, 3, true); o.coderset = modelSampling({ fileName: 'Qwen3-Coder-Next-Q4_K_M.gguf' }, 3, false);
    window.activeTierFor = keep; return o; });
  ok(S.coder === 'qwen3-coder-next' && S.q397 === 'qwen3.5-397b' && S.q122 === 'qwen3.5' && S.glm === 'glm-5' && S.mm === 'minimax-m3' && S.ds === 'deepseek-v4' && S.bolt === 'nemotron-3.5-bolt' && S.flash === 'qwen3.8' && S.oss === null && S.kimi === null,
    'each runs on the settings its card gives (Qwen3-Coder-Next, Qwen3.5 397B and 122B, GLM-5.3, MiniMax M3.1, DeepSeek V4, Nemotron 3.5 Bolt, Qwen3.8); where the card gave none (gpt-oss, Kimi K3), Ingenium\'s own', S);
  ok(S.q397set.temperature === 0.6 && S.q397set.top_k === 20 && S.coderset.temperature === 1 && S.coderset.top_k === 40, 'Qwen3.5 397B thinks at temperature 0.6 (its card), Qwen3-Coder-Next answers at 1.0 with top-k 40 (its card)', [S.q397set, S.coderset]);

  // 5. the Models page: no ceiling, said once on a computer; the larger models listed with what each needs
  await setDev('mac-arm', 16, false); await p.evaluate(() => { go('models'); renderLineup(); }); await p.waitForTimeout(600);
  const pg = await p.evaluate(() => { const n = document.querySelector('#lineupCard .lu-large'), box = document.querySelector('#lineupGrid .lu-tile[data-tier="magister"] .lu-coders'), big = box && box.querySelector('details.lu-big');
    const kimi = box && box.querySelector('.lu-cd[data-od="magister:kimi-k3-best"] .lu-cd-fit');
    return { note: n && n.textContent, count: document.querySelectorAll('#lineupCard .lu-large').length, big: big && big.querySelector('summary').textContent, kimi: kimi && kimi.textContent }; });
  ok(/^No ceiling on memory\./.test(pg.note || '') && pg.count === 1 && /\d+ larger models, for computers with more memory/.test(pg.big || '') && /^Needs about 1574\.4 GB: more than this computer has to spare/.test(pg.kimi || ''),
    'a 16 GB Mac: the Models page says there is no ceiling, and Magister\'s list folds the larger models under one line, each with what it needs (Kimi K3: about 1574.4 GB)', pg);
  await p.screenshot({ path: OUT + '/models-16gb.png' });
  await setDev('mac-arm', 512, false); await p.evaluate(() => { renderLineup(); }); await p.waitForTimeout(500);
  const t512 = await p.evaluate(() => { const r = document.querySelector('#lineupGrid .lu-tile[data-tier="magister"] .lu-cd.on'); return { key: r && r.getAttribute('data-od'), fit: r && r.querySelector('.lu-cd-fit').textContent, why: r && (r.querySelector('.lu-cd-why') || {}).textContent }; });
  ok(t512.key === 'magister:minimax-m3.1-flash' && /fits here/.test(t512.fit || '') && /7 parts/.test(t512.why || ''), 'a Mac with 512 GB: Magister\'s choice is MiniMax M3.1 Flash, which fits, in 7 parts', t512);
  await p.screenshot({ path: OUT + '/models-512gb.png' });
  await setDev('ios', 8, false); await p.evaluate(() => { const n = document.querySelector('#lineupCard .lu-large'); if (n) n.remove(); renderLineup(); }); await p.waitForTimeout(400);
  ok(await p.evaluate(() => !document.querySelector('#lineupCard .lu-large') && !Object.values(ING_LINEUP.devices.ios.tiers).some(v => [].concat(v).some(k => window.IngR210.keys.includes(k)))), 'a phone or tablet: no such note, and no large model in its lists');
  ok(await p.evaluate(() => window.__ingParts.p210 === 'running'), 'the module ran to its end');
  ok(errs.length === 0, 'no script errors on the page', errs);
  console.log(pass + ' passed, ' + fail + ' failed'); await b.close(); process.exit(fail ? 1 : 0);
})().catch(e => { console.log('FAIL the test itself: ' + e.message); console.log(pass + ' passed, ' + (fail + 1) + ' failed'); process.exit(1); });
