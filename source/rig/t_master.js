// the master seal on a Word file about all four apps; one app's seal on a single app's file; none on a CV
const { start } = require('./lib.js');
const fs = require('fs');
(async () => {
  const { browser, page, logs } = await start();
  const r = await page.evaluate(async () => {
    const md = '# The Offline Project · Master project dossier\n\n## Overview\n\nFour apps.\n\n---\n*Drafted.*';
    function media(u8) { const s = new TextDecoder('latin1').decode(u8); return (s.match(/word\/media\/[\w.-]+\.png/g) || []).filter((v, i, a) => a.indexOf(v) === i); }
    async function bytes(x) { if (x instanceof Uint8Array) return x; if (x && x.arrayBuffer) return new Uint8Array(await x.arrayBuffer()); return x; }
    const all = await bytes(IngHouseDocs.docx('The Offline Project · Master project dossier', md, { kind: 'dossier', apps: ['cd', 'forge', 'ingenium', 'inkwell'], name: 'The Offline Project' }));
    const one = await bytes(IngHouseDocs.docx('Carpe Diem · Project dossier', md.replace('The Offline Project', 'Carpe Diem'), { kind: 'dossier', apps: ['cd'] }));
    const cv = await bytes(IngHouseDocs.docx('CV entry', '## Projects\n\nx', { kind: 'cv', apps: ['cd', 'forge', 'ingenium', 'inkwell'] }));
    const s = JSON.parse(document.getElementById('ing-seals-data').textContent);
    return { all: media(all), one: media(one), cv: media(cv), master: [s.master.w, s.master.h], allLen: all.length, hasName: new TextDecoder('latin1').decode(all).indexOf('The Offline Project') >= 0 };
  });
  console.log(JSON.stringify(r));
  console.log(logs.filter(l => /error/i.test(l)).slice(0, 8).join('\n'));
  await browser.close();
})().catch(e => { console.error('FAIL', e); process.exit(1); });
