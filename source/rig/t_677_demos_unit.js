// The demonstrations the master edition carries, checked outside the browser (Ingenium 6.77, modules/r268.js). Her words (10 November
// 2026): "I want the Offline Project apps to only contain the apps demos and never the full version."
// What the page's code gives must be, byte for byte, what her own recipes give (rig/t_677_demos_expect.py runs them first):
//   - Carpe Diem's Public sample (carried as what differs from the Carpe Diem the page carries) and Inkwell's page come back whole,
//     each with its fingerprint;
//   - Ingenium's demo edition comes back from its recipe with the fingerprint of the demo edition itself;
//   - The Forge's own page, for the set of four and of three, has the fingerprint her recipe's page has;
//   - the demonstration made from it carries the same pages her recipe's carries (the same sizes and fingerprints, the same
//     signature of the list), each unpacking whole from its block, and the page around them is the same letter for letter;
//   - every page passes the check for a demonstration; a full app, the master edition and a page of hers are refused;
//   - a missing part is said in plain words.
//   python3 rig/t_677_demos_expect.py <master page> <demo edition> <dir>;  node rig/t_677_demos_unit.js <dir>
const fs = require('fs'), path = require('path'), zlib = require('zlib'), crypto = require('crypto');
const DIR = process.argv[2];
if (!DIR) { console.log('usage: node rig/t_677_demos_unit.js <dir written by t_677_demos_expect.py>'); process.exit(2); }
let pass = 0, fail = 0; const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (c || d === undefined ? '' : '  ' + String(typeof d === 'string' ? d : JSON.stringify(d)).slice(0, 700))); c ? pass++ : fail++; };
const sha = b => crypto.createHash('sha256').update(b).digest('hex');
(async () => {
  const expect = JSON.parse(fs.readFileSync(path.join(DIR, 'expect.json'), 'utf8')), DM = JSON.parse(fs.readFileSync(path.join(DIR, 'demos.json'), 'utf8'));
  let blocks = JSON.parse(fs.readFileSync(path.join(DIR, 'blocks.json'), 'utf8')); const codes = JSON.parse(fs.readFileSync(path.join(DIR, 'codes.json'), 'utf8'));
  const src = fs.readFileSync(path.join(__dirname, '..', 'build', 'modules', 'r268.js'), 'utf8');
  const body = /<script>([\s\S]*)<\/script>\s*$/.exec(src)[1].replace('/*R268_DEMOS*/null', JSON.stringify(DM));
  // a stand-in for the page: its blocks by id, none carried for later
  const mkWin = (bl) => { const win = { __ingParts: {}, libSha: u8 => Promise.resolve(sha(Buffer.from(u8.buffer, u8.byteOffset, u8.byteLength))) };
    const doc = { getElementById: id => (id in bl) ? { id, textContent: bl[id], getAttribute: () => null } : null,
      /* the page's own code without an id, which the recipe finds by its length and fingerprint */
      querySelectorAll: sel => sel === 'script,style' ? codes.map(t => ({ id: '', textContent: t })).concat(Object.keys(bl).map(id => ({ id, textContent: bl[id] }))) : [] };
    new Function('window', 'document', 'ING_VERSION', body)(win, doc, '6.77'); return win; };
  const W = mkWin(blocks), D = W.IngDemos;
  ok(!!D && W.__ingParts.p268 === 'running', 'the part runs and gives IngDemos');
  ok(D.why(true) === '' && D.why(false) === '', 'with everything carried, nothing stands in the way', [D.why(true), D.why(false)]);

  // 1. the two pages carried whole
  const cd = await D.page('cd', true), ink = await D.page('inkwell', true);
  ok(sha(cd.u8) === DM.cd.sha256 && cd.u8.length === DM.cd.size && cd.edition === 'Public sample', "Carpe Diem's Public sample comes back whole from what differs from the Carpe Diem carried, with its fingerprint", cd.what);
  ok(sha(ink.u8) === DM.inkwell.sha256 && ink.u8.length === DM.inkwell.size, "Inkwell's page unpacks whole, with its fingerprint", ink.what);

  // 2. Ingenium's demo edition, from its recipe
  const ing = await D.page('ingenium', true);
  ok(sha(ing.u8) === expect.ingenium.sha256 && ing.u8.length === expect.ingenium.size, "Ingenium's demo edition comes back from its recipe with the demo edition's own fingerprint", [ing.what, ing.u8.length]);

  // 3. The Forge's demonstration, for four apps and for three
  for (const set of ['4', '3']) {
    const E = expect.sets[set], own = await D.ownPage(set);
    const mine = E.apps.filter(a => a.self)[0];
    ok(sha(own.own) === mine.sha256 && own.own.length === mine.size, 'set of ' + set + ": The Forge's own page has the fingerprint her recipe's page has");
    const f = await D.forge(set), t = Buffer.from(f.u8.buffer, f.u8.byteOffset, f.u8.byteLength).toString('utf8');
    const listed = JSON.parse(/<script type="application\/json" id="forge-bi-meta">(.*?)<\/script>/s.exec(t)[1].replace(/<\\\//g, '</'));
    const same = listed.apps.length === E.apps.length && listed.apps.every((a, i) => ['key', 'title', 'version', 'build', 'date', 'name', 'id', 'size', 'sha256'].every(k => String(a[k]) === String(E.apps[i][k])) && !!a.self === !!E.apps[i].self);
    ok(same, 'set of ' + set + ': it carries the same pages her recipe carries (' + listed.apps.map(a => a.key).join(', ') + '), each with the same size and fingerprint', listed.apps.map(a => [a.key, a.size, a.sha256.slice(0, 10)]));
    ok(listed.sig === E.sig && listed.stamp === E.stamp && listed.format === 'forge-builtin', "set of " + set + ": the list's signature is the same", [listed.sig, E.sig]);
    let whole = true; for (const a of listed.apps) { const m = new RegExp('<script type="forge/b64" id="' + a.id + '">([^<]*)</script>').exec(t); const b = m && zlib.gunzipSync(Buffer.from(m[1], 'base64'));
      if (!b || b.length !== a.size || sha(b) !== a.sha256) whole = false; }
    ok(whole, 'set of ' + set + ': each carried page unpacks whole from its block, as the Forge will check it on its first start');
    const k = t.indexOf("\n<!-- THE FORGE'S DEMONSTRATION · the apps it carries ("), k2 = t.lastIndexOf('</body>');
    ok(sha(Buffer.from(t.slice(0, k) + t.slice(k2), 'utf8')) === E.outer_sha256 && t.slice(k).startsWith("\n<!-- THE FORGE'S DEMONSTRATION · the apps it carries (" + E.note + ') -->\n'), 'set of ' + set + ': the page around them is the same, letter for letter, with the line that names them');
    ok(D.check('forge', f.u8) === '' && f.edition === 'Demo', 'set of ' + set + ': it passes as a demonstration');
  }
  D.release();

  // 4. what is refused
  const lean = fs.readFileSync(path.join(DIR, 'lean.html'));
  ok(/not its demonstration/.test(D.check('forge', new Uint8Array(lean))), 'the full Forge is refused as a room', D.check('forge', new Uint8Array(lean)));
  ok(/not its demo edition/.test(D.check('ingenium', 'x var ING_EDITION="master"; y')) && /not its demo edition/.test(D.check('ingenium', 'var ING_EDITION="demo" <script id="ing-builtin-cd">')) && /not its demo edition/.test(D.check('ingenium', 'var ING_EDITION="demo" sg-owner-hand')),
    'the master edition, a copy that carries her apps, and a copy with her signature are refused as Ingenium\'s room');
  ok(/not one of its demonstrations/.test(D.check('cd', 'window.CD_BUILD={date:"2026-11-01",pass:"1081",stamp:"528171081"}; id="section-forge"')) && /not one of its demonstrations/.test(D.check('cd', 'window.CD_BUILD={date:"d",pass:"1081",stamp:"s",edition:"Public sample"}; <style id="cd-owner-sign">')),
    'the full Carpe Diem, and a sample that carries her signature, are refused');
  ok(D.check('cd', cd.u8) === '' && D.check('inkwell', ink.u8) === '' && D.check('ingenium', ing.u8) === '', 'the three carried pages pass');

  // 5. a missing part is said in plain words
  const noDemo = Object.assign({}, blocks); noDemo['ing-demo-ingenium'] = '';
  const W2 = mkWin(noDemo); let said = ''; try { await W2.IngDemos.page('ingenium', true); } catch (e) { said = e.message; }
  ok(/carries no demo edition of Ingenium/.test(said) && /carries no demo edition/.test(W2.IngDemos.why(true)), 'a test build with no demo edition says so', said);
  const noEngine = Object.assign({}, blocks); delete noEngine['ingenium-engine-wasm'];
  const W3 = mkWin(noEngine); said = ''; try { await W3.IngDemos.page('ingenium', true); } catch (e) { said = e.message; }
  ok(/does not hold \(ingenium-engine-wasm\)/.test(said) && /phone and tablet apps/.test(W3.IngDemos.why(true)), 'where the engine is left out of the page (the phone and tablet apps), it says where to make it instead', said);
  const bent = Object.assign({}, blocks); bent['r140-flat'] = bent['r140-flat'].slice(0, -1) + (bent['r140-flat'].slice(-1) === 'x' ? 'y' : 'x');
  const W4 = mkWin(bent); said = ''; try { await W4.IngDemos.page('ingenium', true); } catch (e) { said = e.message; }
  ok(/did not come back whole \(its fingerprint differs\)/.test(said), 'a part that is not as it was built is caught by the fingerprint, and nothing is made from it', said);
  console.log(pass + ' passed, ' + fail + ' failed'); process.exit(fail ? 1 : 0);
})().catch(e => { console.log('FAIL the test itself: ' + (e && e.stack || e)); process.exit(1); });
