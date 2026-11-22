// The Offline Project with Clavis: the pictures she sees before anything is built. Her words (22 November 2026): "Yes Clavis should join the
// Offline Project's crest and bundle, please show me previews."
// The crest is drawn by Ingenium's own crest code (modules/r140.js: its shield, fields, gilt cross, open book, ribbon and seals), read from
// the module and given a set of five apps in a copy for the pictures only (window.IngSealX; the real IngSeal is untouched), inside the
// running page. Three ways for Clavis to stand in the master seal are shown, one picture each, then the first by night, then Fabrica's
// Bring an app in and the Offline Project's hall with Clavis's room.
//   node capture_op_clavis.js <master page url> <hall page url (site.html)> <out folder>
const pw = require('/opt/node-tools/node_modules/playwright'); const fs = require('fs'); const path = require('path');
const [URL_, HALL, OUT] = process.argv.slice(2); fs.rmSync(OUT, { recursive: true, force: true }); fs.mkdirSync(OUT, { recursive: true });
const VW = 1360, VH = 1000; const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

/* r140, as the master page carries it, given a set of five (the patch points must each be found once, or nothing is drawn) */
function crestX() {
  const s = fs.readFileSync(path.join(__dirname, '..', '..', 'build', 'modules', 'r140.js'), 'utf8');
  const i = s.indexOf('<script>try{(window.__ingParts=window.__ingParts||{})["p61"]'), j = s.indexOf('</script>', i);
  let js = s.slice(i + '<script>'.length, j);
  const R = (a, b, n) => { const c = js.split(a).length - 1; if (c !== (n || 1)) throw new Error('patch point found ' + c + ' times: ' + a.slice(0, 70)); js = js.split(a).join(b); };
  // the gilt cross with two arms across (one picture's shield of five fields), made from the frame's own drawing
  const fi = js.indexOf('function frame(P,L){'), fj = js.indexOf('\nfunction book(P)', fi);
  let f2 = js.slice(fi, fj);
  const F = (a, b) => { if (f2.split(a).length !== 2) throw new Error('frame point: ' + a); f2 = f2.replace(a, b); };
  F('function frame(P,L){var b=L.bar;', 'function frame2(P,L){var b=L.bar,h1=L.h1,h2=L.h2;');
  F('<rect x="25" y="174.6" width="250" height="6.8"/>', '<rect x="25" y="\'+(h1-3.4)+\'" width="250" height="6.8"/><rect x="58" y="\'+(h2-3.4)+\'" width="184" height="6.8"/>');  // the lower bar's gilt shading stays inside the shield, which narrows there
  F('<rect x="0" y="174.6" width="300" height="6.8" fill="url(#gv)"/>', '<rect x="0" y="\'+(h1-3.4)+\'" width="300" height="6.8" fill="url(#gv)"/><rect x="0" y="\'+(h2-3.4)+\'" width="300" height="6.8" fill="url(#gv)"/>');
  F(' M0,174.6 H300 M0,181.4 H300', ' M0,\'+(h1-3.4)+\' H300 M0,\'+(h1+3.4)+\' H300 M0,\'+(h2-3.4)+\' H300 M0,\'+(h2+3.4)+\' H300');
  F(' M0,175.3 H300', ' M0,\'+(h1-2.7)+\' H300 M0,\'+(h2-2.7)+\' H300');
  F(' M0,178 H300', ' M0,\'+h1+\' H300 M0,\'+h2+\' H300');
  R('var ORDER=["cd","forge","ingenium","inkwell"];', 'var ORDER=["cd","forge","ingenium","inkwell","clavis"];');
  R('var NAMES={cd:"Carpe Diem",forge:"The Forge",ingenium:"Ingenium",inkwell:"Inkwell"};', 'var NAMES={cd:"Carpe Diem",forge:"The Forge",ingenium:"Ingenium",inkwell:"Inkwell",clavis:"Clavis"};');
  R('iwB:"#143a4d",', 'iwB:"#143a4d",clA:"#faf5e9",clB:"#e6d9b8",');  // Clavis's ivory face
  R('iwB:"#0a2230",', 'iwB:"#0a2230",clA:"#2b2721",clB:"#15130f",');  // its onyx by night
  R('inkwell:["iwA","iwB","dmL"]};', 'inkwell:["iwA","iwB","dmL"],clavis:["clA","clB","dmD"]};');
  R('["","one","duo","trio","master"][n.length]', '["","one","duo","trio","master","master"][n.length]', 2);
  R('function layout(n){var K=', 'function layout(n){if(n.length===5)return L5(n);var K=');
  R('function blobUrl(text,key){if(URLC[key])', 'function blobUrl(text,key){key=(window.__X5||"")+"|"+key;if(URLC[key])');  // each option its own picture
  R('{z:.031,s:book(P)}]', '{z:.031,s:L.bookAt?\'<g transform="\'+L.bookAt+\'">\'+book(P)+\'</g>\':book(P)}].concat(L.extra?[{z:.034,s:L.extra(P,night)}]:[])');
  R('function frame(P,L){var b=L.bar;', 'function frame(P,L){if(L.frame2)return frame2(P,L);var b=L.bar;');
  R('return fallbackPic(k);}', 'return fallbackPic(night&&window.ING_SEALS&&ING_SEALS[k+"N"]?k+"N":k);}');
  R('if(n.length===4)return "The Offline Project";', 'if(n.length===5)return "The Offline Project";if(n.length===4&&n.indexOf("clavis")<0)return "The Offline Project without Clavis";if(n.length===4)return "The Offline Project without "+NAMES[ORDER.filter(function(k){return n.indexOf(k)<0;})[0]];');
  const L5 = `
/* the pictures' set of five: three ways for Clavis to stand in the master seal (window.__X5) */
function medX(P,m,night){var cx=m[1],cy=m[2],r=m[3];
  return '<defs>'+gold("mxg",P,"v")+'<clipPath id="mxc"><circle cx="'+cx+'" cy="'+cy+'" r="'+r+'"/></clipPath>'+
    '<filter id="mxs" x="-30%" y="-30%" width="160%" height="170%"><feDropShadow dx="0" dy="1.8" stdDeviation="1.6" flood-color="#1b0e2a" flood-opacity=".42"/></filter>'+
    '<linearGradient id="mxd" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="rgba(20,10,0,'+(night?.6:.45)+')"/><stop offset=".45" stop-color="rgba(20,10,0,0)"/><stop offset="1" stop-color="rgba(255,250,235,'+(night?.12:.25)+')"/></linearGradient></defs>'+
    '<g filter="url(#mxs)"><circle cx="'+cx+'" cy="'+cy+'" r="'+(r+4.6)+'" fill="url(#mxg)"/><circle cx="'+cx+'" cy="'+cy+'" r="'+(r+4.6)+'" fill="none" stroke="'+P.g4+'" stroke-width=".9"/>'+
    '<circle cx="'+cx+'" cy="'+cy+'" r="'+(r+2.7)+'" fill="none" stroke="'+P.g1+'" stroke-opacity=".6" stroke-width=".6"/></g>'+
    '<g clip-path="url(#mxc)">'+sealPic(m,0,night)+'<circle cx="'+cx+'" cy="'+cy+'" r="'+(r-1.2)+'" fill="none" stroke="url(#mxd)" stroke-width="3"/></g>'+
    '<circle cx="'+cx+'" cy="'+cy+'" r="'+(r+.15)+'" fill="none" stroke="rgba(30,18,4,.5)" stroke-width=".6"/>';}
function L5(n){var V=window.__X5||"heart";
  var four={K:"master",vb:[0,0,300,400],bar:400,ribbon:true,
    fields:[["cd",0,0,150,178,"l"],["forge",150,0,150,178,"r"],["ingenium",0,178,150,222,"l"],["inkwell",150,178,150,222,"r"]],
    med:[["cd",86,98,49],["forge",214,98,49],["ingenium",94.5,234,42],["inkwell",205.5,234,42]]};
  if(V==="field")return {K:"master",vb:[0,0,300,400],bar:270,ribbon:true,frame2:true,h1:150,h2:270,bookAt:"translate(0,-28)",
    fields:[["cd",0,0,150,150,"l"],["forge",150,0,150,150,"r"],["ingenium",0,150,150,120,"l"],["inkwell",150,150,150,120,"r"],["clavis",0,270,300,130,"l"]],
    med:[["cd",86,88,46],["forge",214,88,46],["ingenium",94.5,210,40],["inkwell",205.5,210,40],["clavis",150,300,28]]};
  if(V==="crown"){four.vb=[0,-60,300,460];four.extra=function(P,night){return medX(P,["clavis",150,-10,40],night);};return four;}
  four.bookAt="translate(0,-128)";four.extra=function(P,night){return medX(P,["clavis",150,178,30],night);};return four;}
`;
  R('window.IngSeal=', L5 + '\n' + f2 + '\nwindow.IngSealX=');
  return js;
}

const CAPS = {};
(async () => {
  const b = await pw.chromium.launch(); const ctx = await b.newContext({ viewport: { width: VW, height: VH }, deviceScaleFactor: 2 });
  const errs = []; let p = null;
  // each picture on a fresh page: the master page is large, and a page that draws many crests at double size runs out of room
  const open = async () => { if (p) await p.close().catch(() => {}); p = await ctx.newPage(); p.on('pageerror', (e) => errs.push(e.message.slice(0, 200)));
  await p.goto(URL_, { waitUntil: 'domcontentloaded', timeout: 300000 }); await p.waitForFunction(() => window.__ingReady === true, null, { timeout: 300000 });
  await p.evaluate(() => { const k = [...document.querySelectorAll('button')].find((x) => x.textContent.trim() === 'Enter' && x.offsetParent); if (k) k.click(); try { tourEnd(); } catch (e) {}
    const st = document.createElement('style'); st.textContent = '#ingToast{display:none!important}'; document.head.appendChild(st); });
  await p.waitForFunction(() => window.__ingBuiltin && window.__ingBuiltin.states && window.__ingBuiltin.states.clavis, null, { timeout: 240000 }).catch(() => {});
  await p.evaluate((code) => { (0, eval)(code); }, crestX());
  const ok = await p.evaluate(() => !!(window.IngSealX && IngSealX.kind(['cd', 'forge', 'ingenium', 'inkwell', 'clavis']) === 'master'));
  if (!ok) throw new Error('the crest of five could not be drawn');
  await p.evaluate(() => { go('home'); window.scrollTo(0, 0); }); };

  // a stage in the page: a raised card on the page's own ground, the live crest at the size the hall shows it, its name and its five apps
  const stage = async (variant, night, key, sub) => {
    await p.evaluate(async ({ variant, night, sub }) => {
      state.theme = night ? 'night' : 'day'; try { applyTheme(); } catch (e) { document.body.setAttribute('data-theme', night ? 'night' : 'day'); }
      window.__X5 = variant; document.getElementById('pvStage') && document.getElementById('pvStage').remove();
      if (!document.getElementById('pvStageCss')) { const st = document.createElement('style'); st.id = 'pvStageCss';
        st.textContent = '#pvStage{position:fixed;left:50%;top:96px;transform:translateX(-50%);z-index:9000;width:720px;padding:44px 40px 40px;border-radius:26px;text-align:center;' +
          'background:linear-gradient(180deg,#fffefe,#f7f3fb);border:1px solid rgba(106,63,181,.14);box-shadow:inset 0 1px 0 #fff,0 2px 6px rgba(40,22,68,.10),0 22px 48px rgba(40,22,68,.16)}' +
          'body[data-theme="night"] #pvStage{background:linear-gradient(180deg,#221b31,#18131f);border-color:rgba(205,184,240,.16);box-shadow:inset 0 1px 0 rgba(255,255,255,.06),0 2px 8px rgba(0,0,0,.5),0 22px 48px rgba(0,0,0,.55)}' +
          '#pvVeil{position:fixed;inset:0;z-index:8999;background:rgba(244,241,248,.96)}body[data-theme="night"] #pvVeil{background:rgba(17,13,24,.96)}' +
          '#pvStage .pv-name{margin:26px 0 6px;font:600 30px/1.2 "Iowan Old Style",Palatino,Georgia,serif;letter-spacing:.02em;color:#2a1f3d}body[data-theme="night"] #pvStage .pv-name{color:#efe8fa}' +
          '#pvStage .pv-apps{font:500 15px/1.5 -apple-system,BlinkMacSystemFont,"Segoe UI",Inter,sans-serif;color:#5a5268;letter-spacing:.02em}body[data-theme="night"] #pvStage .pv-apps{color:#bdb3cf}' +
          '#pvStage .pv-sub{margin-top:8px;font:italic 15px/1.5 "Iowan Old Style",Palatino,Georgia,serif;color:#6b6280}body[data-theme="night"] #pvStage .pv-sub{color:#a99fc0}';
        document.head.appendChild(st); }
      if (!document.getElementById('pvVeil')) { const v = document.createElement('div'); v.id = 'pvVeil'; document.body.appendChild(v); }
      const s = document.createElement('div'); s.id = 'pvStage';
      const set = ['cd', 'forge', 'ingenium', 'inkwell', 'clavis'];
      const c = IngSealX.el(set, { live: false, size: variant === 'crown' ? 300 : 330, alt: '' });  // still: the same drawing, not swaying (a live crest's filtered 3D layers crashed the headless renderer at double size)
      s.appendChild(c);
      const n = document.createElement('div'); n.className = 'pv-name'; n.textContent = IngSealX.title(set); s.appendChild(n);
      const a = document.createElement('div'); a.className = 'pv-apps'; a.textContent = 'Carpe Diem · The Forge · Ingenium · Inkwell · Clavis'; s.appendChild(a);
      if (sub) { const u = document.createElement('div'); u.className = 'pv-sub'; u.textContent = sub; s.appendChild(u); }
      document.body.appendChild(s);
    }, { variant, night, sub });
    await sleep(4200);
    const r = await p.evaluate(() => { const e = document.getElementById('pvStage').getBoundingClientRect(); return { x: e.left, y: e.top, w: e.width, h: e.height }; });
    await p.screenshot({ path: path.join(OUT, key + '.png'), clip: { x: Math.max(0, r.x - 28), y: Math.max(0, r.y - 28), width: r.w + 56, height: Math.min(VH - Math.max(0, r.y - 28), r.h + 56) } });
    console.log(key, 'taken');
  };
  const ONLY = (process.env.ONLY || '').split(',').filter(Boolean), want = (k) => !ONLY.length || ONLY.indexOf(k) >= 0;
  if (want('1-heart')) { await open(); await stage('heart', false, '1-heart', 'Clavis at the heart of the cross; the open book rises up the cross'); }
  if (want('2-field')) { await open(); await stage('field', false, '2-field', 'Clavis in a field of its own, in the point of the shield'); }
  if (want('3-crown')) { await open(); await stage('crown', false, '3-crown', 'Clavis above the shield, as its crest'); }
  if (want('4-heart-night')) { await open(); await stage('heart', true, '4-heart-night', 'By night'); }

  // 5. Fabrica, Bring an app in: The Offline Project with Clavis (all five apps, and the variation without Inkwell), in the real sheet
  if (want('5-fabrica')) { await open();
    await p.evaluate(() => { window.__X5 = 'heart'; go('fabrica'); }); await sleep(2500);
    await p.evaluate(() => { const b = [...document.querySelectorAll('#fb button')].find((x) => /^Bring one in$/.test(x.textContent.trim()) && x.offsetParent); if (b) b.click(); }); await sleep(1500);
    const done = await p.evaluate(() => { const out = [];
      const cardOf = (re) => { const t = [...document.querySelectorAll('b, strong, h3, h4, div, span')].find((x) => x.children.length === 0 && re.test(x.textContent.trim()) && x.offsetParent);
        if (!t) return null; let c = t; for (let i = 0; i < 6 && c && !(c.tagName === 'BUTTON' || c.getAttribute('role') === 'button'); i++) c = c.parentElement; return c ? { card: c, title: t } : null; };
      const swap = (o, set, title, sub) => { if (!o) return; o.title.textContent = title; const pics = o.card.querySelectorAll('.ing-crest, img, svg'); const old = pics[0];
        const w = old ? Math.round(old.getBoundingClientRect().width) : 70; const c = IngSealX.el(set, { live: false, size: w, alt: '' }); c.classList.add('pv-new');
        if (old) old.replaceWith(c); else o.card.prepend(c);
        const subEl = [...o.card.querySelectorAll('span, div, small, p')].find((x) => x.children.length === 0 && x !== o.title && x.textContent.trim().length > 12); if (subEl && sub) subEl.textContent = sub; out.push(title); };
      swap(cardOf(/^All four apps$/), ['cd', 'forge', 'ingenium', 'inkwell', 'clavis'], 'All five apps', 'Their demonstrations, never their full versions');
      swap(cardOf(/^Without Inkwell$/), ['cd', 'forge', 'ingenium', 'clavis'], 'Without Inkwell', 'The demonstrations of Carpe Diem, The Forge, Ingenium and Clavis');
      if (!document.getElementById('pvRingCss')) { const st = document.createElement('style'); st.id = 'pvRingCss'; st.textContent = '.pv-ring{outline:3px solid #6a3fb5!important;outline-offset:5px!important;border-radius:16px}'; document.head.appendChild(st); }
      document.querySelectorAll('.pv-new').forEach((c) => { let k = c; for (let i = 0; i < 6 && k && !(k.tagName === 'BUTTON' || k.getAttribute('role') === 'button'); i++) k = k.parentElement; if (k) k.classList.add('pv-ring'); });
      return out; });
    await sleep(1500);
    const r = await p.evaluate(() => { const t = [...document.querySelectorAll('div,section')].filter((x) => /^Bring an app in/.test((x.textContent || '').trim()) && x.offsetParent).sort((a, b) => a.getBoundingClientRect().width * a.getBoundingClientRect().height - b.getBoundingClientRect().width * b.getBoundingClientRect().height)[0];
      const e = (t || document.body).getBoundingClientRect(); return { x: e.left, y: e.top, w: e.width, h: e.height }; });
    await p.screenshot({ path: path.join(OUT, '5-fabrica.png'), clip: { x: Math.max(0, r.x - 20), y: Math.max(0, r.y - 20), width: Math.min(VW, r.w + 40), height: Math.min(VH - Math.max(0, r.y - 20), r.h + 40) } });
    console.log('5-fabrica taken', JSON.stringify(done)); }

  // 6. The Offline Project's hall with Clavis's room: the hall's own page (source/offline_project/master_demo/site.html), its seals given as
  // Fabrica gives them (from the page's ING_SEALS, modules/r246.js), Clavis's room added beside the four, the crest of five at its head
  if (want('6-hall') && HALL && HALL !== 'none') { await open();
    const got = await p.evaluate(() => { window.__X5 = 'heart'; const S = window.ING_SEALS || {}, o = {};
      ['cd', 'forge', 'ingenium', 'inkwell', 'clavis'].forEach((k) => { const x = S[k]; if (x && x.b64) { const u = 'data:image/png;base64,' + x.b64; o[k] = u; o[k + 'N'] = u; } });
      if (S.clavisN && S.clavisN.b64) o.clavisN = 'data:image/png;base64,' + S.clavisN.b64;
      return { seals: o, crest: IngSealX.dataUrl(['cd', 'forge', 'ingenium', 'inkwell', 'clavis'], { night: false }) }; });
    const op = JSON.parse(fs.readFileSync(path.join(__dirname, '..', '..', 'build', 'op_make.json'), 'utf8'));
    let h = fs.readFileSync(HALL, 'utf8');
    const H = (a, b) => { if (h.split(a).length !== 2) throw new Error('hall point: ' + a.slice(0, 60)); h = h.replace(a, b); };
    H('var BUILD = /*@@BUILD@@*/{};', 'var BUILD = ' + JSON.stringify({ img: { seals: got.seals, devices: op.devices } }) + ';');
    H('\n];\n/* a build may leave an app out', ',\n  { slug: "clavis", k: "clavis", name: { en: "Clavis", fr: "Clavis" }, date: "XIX · NOVEMBRIS · MMXXVI", tour: "",\n' +
      '    line: { en: "A search engine for the open web and the scholarly record, and for everything you keep, offline.", fr: "Un moteur de recherche pour le web ouvert et les travaux savants, et pour tout ce que vous gardez, hors ligne." },\n' +
      '    about: { en: "", fr: "" }, tries: { en: [], fr: [] },\n' +
      '    runs: { en: "Mac (Apple silicon and Intel) · Windows · iPhone and iPad · Fire tablet · any browser", fr: "Mac (Apple silicon et Intel) · Windows · iPhone et iPad · tablette Fire · tout navigateur" } }\n];\n/* a build may leave an app out');
    H('inkwell: [806, 800, 772] };', 'inkwell: [806, 800, 772], clavis: [800, 800, 800] };');
    H('var MEDK = {}; MED.forEach(function (m) { MEDK[m.k] = m; });', 'var MEDK = {}; MED.forEach(function (m) { MEDK[m.k] = m; }); MEDK.clavis = { k: "clavis", cx: 150, cy: 178, r: 42, qx: 0, qy: 178, qw: 150, qh: 222 };');  // its card's own seal
    H('lede: "Four apps that', 'lede: "Five apps that');
    H('fourTitle: "The four apps", fourSub: "Each sits in its quarter of the crest. Each opens here as it is, with its own guided tour."',
      'fourTitle: "The five apps", fourSub: "Each has its place in the crest. Each opens here as it is, with its own guided tour."');
    H('all: "Carpe Diem · The Forge · Ingenium · Inkwell", open:', 'all: "Carpe Diem · The Forge · Ingenium · Inkwell · Clavis", open:');
    { const hi = h.indexOf('</head>'); h = h.slice(0, hi) + '<style>:root{--q-cl-a:#faf5e9;--q-cl-b:#e6d9b8;--q-cl-ink:#2a2520}' +
      '@media (prefers-color-scheme:dark){:root{--q-cl-a:#2b2721;--q-cl-b:#15130f;--q-cl-ink:#f3e9cf}}' +
      '.rc-clavis{background:linear-gradient(135deg,var(--q-cl-a),var(--q-cl-b));color:var(--q-cl-ink);grid-column:1/-1;border-radius:0 0 19px 19px}' +
      '.four .rc-ingenium,.four .rc-inkwell{border-radius:0}.pv-ring{outline:3px solid #6a3fb5!important;outline-offset:6px!important}</style>' + h.slice(hi); }  // before the first </head> (the page writes others inside its strings)
    const dir = path.join(OUT, 'hall'); fs.mkdirSync(dir, { recursive: true }); fs.writeFileSync(path.join(dir, 'index.html'), h);
    // a tall window, so the rooms are taken where they stand (the hall scrolls smoothly, and a scroll can be cut short)
    const hctx = await b.newContext({ viewport: { width: VW, height: 2600 }, deviceScaleFactor: 2 }); const hp = await hctx.newPage(); hp.on('pageerror', (e) => errs.push('hall: ' + e.message.slice(0, 200)));
    await hp.goto('file://' + path.join(dir, 'index.html')); await sleep(5000);
    await hp.evaluate((crest) => { document.querySelectorAll('.ms').forEach((m) => { const r = m.getBoundingClientRect(); const i = new Image(); i.src = crest; i.alt = '';
        i.style.width = (r.width || 300) + 'px'; i.style.height = 'auto'; i.style.display = 'block'; m.replaceWith(i); });
      const c = document.querySelector('.rc-clavis'); if (c) c.classList.add('pv-ring'); }, got.crest);
    await sleep(2000);
    const r = await hp.evaluate(() => { const e = document.getElementById('four').getBoundingClientRect(); return { x: e.left, y: e.top, w: e.width, h: e.height }; });
    await hp.screenshot({ path: path.join(OUT, '6-hall.png'), clip: { x: Math.max(0, r.x), y: Math.max(0, r.y - 10), width: Math.min(VW, r.w), height: r.h + 30 } });
    await hp.screenshot({ path: path.join(OUT, '7-hall-top.png'), clip: { x: 0, y: 0, width: VW, height: 1000 } });
    console.log('6-hall taken'); await hctx.close(); }
  fs.writeFileSync(path.join(OUT, 'errors.json'), JSON.stringify(errs, null, 1));
  console.log('errors', JSON.stringify(errs).slice(0, 400));
  await b.close();
})().catch((e) => { console.log('FAIL', e && e.stack || e); process.exit(1); });
