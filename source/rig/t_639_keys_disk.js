// node rig/t_639_keys_disk.js <Ingenium page url> <out dir>
// Ingenium 6.39 (6 November 2026): the signing keys' copies on a computer app's disk (modules/r136.js, build_page.py). Found in this
// session: the copies were written as "signing_<id>", a name the computer app refuses (ingenium_app.py keeps only
// ^big_[a-z0-9]{7,40}$), so no copy was ever kept and a web view that forgot its store took the keys with it. The bridge here is a
// stand-in with the app's own name rule, and a sweep stricter than the app's (it lets go of every big_ file the page does not name at
// once, where the app waits ten minutes). Its disk is kept in sessionStorage, so it outlives the page's reloads. Checks:
//   - the device's key is copied to the disk under an accepted name, with an index of the keys copied; nothing is refused
//   - the long texts' sweep keeps the key's copy and the index, and still lets go of a stray file
//   - the web view forgets its stores: the key comes back from the disk, the same key (the same fingerprint)
//   - keys.diskIds() names the copies; Reset everything deletes them, so the next key is a new one
//   - no page errors
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs');
const URL_ = process.argv[2], OUT = process.argv[3]; fs.mkdirSync(OUT, { recursive: true });
let pass = 0, fail = 0; const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (c || d === undefined ? '' : '  ' + String(typeof d === 'string' ? d : JSON.stringify(d)).slice(0, 900))); c ? pass++ : fail++; };
const SHELL = `(function(){var D={};try{D=JSON.parse(sessionStorage.getItem("__t639disk")||"{}");}catch(e){}
  var RULE=/^big_[a-z0-9]{7,40}$/;D.__refused=D.__refused||[];
  function keep(){try{sessionStorage.setItem("__t639disk",JSON.stringify(D));}catch(e){}}
  window.pywebview={api:{
    load_state:function(){return Promise.resolve(D.desk||null);},
    save_state:function(raw){D.desk=String(raw);keep();return Promise.resolve({ok:true});},
    big_put:function(id,text){if(!RULE.test(String(id))){D.__refused.push(String(id));keep();return Promise.resolve({ok:false,error:"refused"});}D["big:"+id]=String(text);keep();return Promise.resolve({ok:true});},
    big_get:function(id){if(!RULE.test(String(id)))return Promise.resolve({ok:false});var t=D["big:"+id];return Promise.resolve(t==null?{ok:false}:{ok:true,text:t});},
    big_del:function(id){delete D["big:"+id];keep();return Promise.resolve({ok:true});},
    big_gc:function(live){var k=(live||[]).map(String),n=0;Object.keys(D).forEach(function(x){if(x.indexOf("big:")===0&&k.indexOf(x.slice(4))<0){delete D[x];n++;}});keep();return Promise.resolve(n);},
    desk_keep_text:function(){return Promise.resolve({ok:true});},
    device_info:function(){return Promise.resolve({});}}};
  window.__t639disk=function(){return D;};
  setTimeout(function(){try{window.dispatchEvent(new Event("pywebviewready"));}catch(e){}},0);})();`;
async function boot(p) { await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 300000 }); await p.waitForTimeout(1500);
  await p.evaluate(() => { const k = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === 'Enter' && x.offsetParent); if (k) k.click(); }); await p.waitForTimeout(500); }
const disk = (p) => p.evaluate(() => { const D = window.__t639disk(); return { keys: Object.keys(D).filter(k => k.indexOf('big:') === 0).map(k => k.slice(4)), refused: D.__refused.slice(), index: D['big:big_sgnindex'] || null, device: D['big:big_sgndevice'] || null }; });
(async () => {
  const b = await pw.chromium.launch(); const ctx = await b.newContext({ viewport: { width: 1280, height: 900 } }); await ctx.addInitScript(SHELL);
  const p = await ctx.newPage(); const errs = []; p.on('pageerror', e => errs.push(e.message.slice(0, 300)));
  await p.goto(URL_); await boot(p);
  // 1. the device's key, copied to the disk
  const fp1 = await p.evaluate(async () => { await IngApk.keys.device(); await new Promise(r => setTimeout(r, 600)); return (await IngApk.keys.describe('device')).fingerprint; });
  const d1 = await disk(p);
  let copy = null; try { copy = JSON.parse(d1.device); } catch (e) {}
  ok(copy && copy.id === 'device' && copy.pkcs8 && copy.cert && d1.index === '["device"]', 'the device\'s key is copied to the disk as big_sgndevice, with the index big_sgnindex naming it', { keys: d1.keys, index: d1.index });
  ok(d1.refused.length === 0, 'the app refuses nothing the page writes (until 6.38 every copy, named "signing_<id>", was refused)', d1.refused);
  // 2. the sweep keeps them, and still lets go of a stray file
  await p.evaluate(async () => { await window.pywebview.api.big_put('big_strayfile01', 'a file nothing names'); await IngBig.gc(ingBigLive()); await new Promise(r => setTimeout(r, 300)); });
  const d2 = await disk(p);
  ok(d2.keys.includes('big_sgndevice') && d2.keys.includes('big_sgnindex') && !d2.keys.includes('big_strayfile01'), 'the long texts\' sweep keeps the key\'s copy and the index, and lets go of a stray file', d2.keys);
  // 3. the web view forgets its stores: the key comes back from the disk, the same one
  await p.evaluate(() => new Promise((res) => { const rq = indexedDB.deleteDatabase('ingenium_keys'); rq.onsuccess = rq.onerror = rq.onblocked = () => setTimeout(res, 300); }));
  await p.reload(); await boot(p);
  const back = await p.evaluate(async () => { const known = indexedDB.databases ? (await indexedDB.databases()).some(d => d.name === 'ingenium_keys') : null;
    const fp = (await IngApk.keys.describe('device')).fingerprint; return { fp, known }; });
  ok(back.fp === fp1, 'after the web view forgot its stores the device\'s key comes back from the disk, the same key (fingerprint ' + String(fp1).slice(0, 16) + '...)', { fp1, back });
  const ids = await p.evaluate(() => IngApk.keys.diskIds());
  ok(ids.includes('big_sgndevice') && ids.includes('big_sgnindex') && ids.every(x => /^big_[a-z0-9]{7,40}$/.test(x)), 'keys.diskIds() names the copies, each a name the app accepts', ids);
  // 4. Reset everything deletes them: the next key is a new one
  await p.evaluate(() => { go('settings'); document.getElementById('resetAll').click(); }); await p.waitForTimeout(400);
  await Promise.all([p.waitForNavigation({ timeout: 60000 }).catch(() => {}), p.click('#rGo')]);
  await boot(p); await p.waitForTimeout(1500);
  const d3 = await disk(p);
  let after = null; try { after = d3.device ? JSON.parse(d3.device) : null; } catch (e) {}
  // (something may make a new device key as the fresh copy starts: then the copy on the disk must be that new key's, not the old one)
  ok(!after || after.cert !== copy.cert, 'Reset everything deletes the old key\'s copy from the disk (' + (after ? 'a new key\'s copy is there now' : 'no copy left') + ')', d3.keys);
  const fp2 = await p.evaluate(async () => (await IngApk.keys.describe('device')).fingerprint);
  ok(fp2 && fp2 !== fp1, 'so after the reset the device\'s key is a new one (the cleared key does not come back from the disk)', { fp1, fp2 });
  ok(errs.length === 0, 'no page errors', errs.join(' | '));
  await b.close(); console.log(pass + ' passed, ' + fail + ' failed'); process.exit(fail ? 1 : 0);
})().catch(e => { console.log('FAIL the run stopped: ' + (e && e.stack || e)); console.log(pass + ' passed, ' + (fail + 1) + ' failed'); process.exit(1); });
