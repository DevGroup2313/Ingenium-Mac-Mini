// node rig/inject_modules.js <built page> <out page> <module file> [<module file> ...]
// Puts changed or new modules into a built test page (the handoff's way): a module already in the page is replaced between its
// <style id="rNNN-css"> (or its first <script>) and its closing try{window.__ingParts["pNN"]="running";}catch(_){} line; a new one is
// put after the last module's block. The page is written whole at once (a temporary file, then a rename).
const fs = require('fs'); const path = require('path');
const [IN, OUT] = process.argv.slice(2, 4); const mods = process.argv.slice(4);
let page = fs.readFileSync(IN, 'utf8');
function partOf(src, name) { const m = /__ingParts\)\["p(\d+)"\]="started"|__ingParts\[\"p(\d+)\"\]="running"/.exec(src); return m ? (m[1] || m[2]) : name.replace(/^r/, ''); }
let lastEnd = -1;
for (const mp of mods) {
  let src = fs.readFileSync(mp, 'utf8'); const name = path.basename(mp, '.js'); const p = partOf(src, name);
  // 7.55: the record r345 carries, written in as build_page.py writes it (source/docs/ingenium_record/*.md, each named by its first heading)
  if (src.indexOf('/*R345_RECORD*/null') >= 0) {
    const dir = path.join(__dirname, '..', 'docs', 'ingenium_record');
    const rec = fs.readdirSync(dir).filter((f) => f.endsWith('.md')).sort().map((f) => { const t = fs.readFileSync(path.join(dir, f), 'utf8'); return { name: t.split('\n', 1)[0].replace(/^#+/, '').trim() + '.md', text: t }; });
    src = src.replace('/*R345_RECORD*/null', () => JSON.stringify(rec).replace(/<\//g, '<\\/').replace(/<!--/g, '<\\u0021--'));
  }
  const endMark = 'try{window.__ingParts["p' + p + '"]="running";}catch(_){}';
  const styleMark = '<style id="' + name + '-css">';
  let start = page.indexOf(styleMark);
  if (start < 0) { // a module with no style block: its own first script, found by its start mark (the comment above promised this; 7.21)
    const sm = '__ingParts=window.__ingParts||{})["p' + p + '"]="started"'; const at = page.indexOf(sm); if (at >= 0) start = page.lastIndexOf('<script', at); }
  const endAt = page.indexOf(endMark);
  if (start >= 0 && endAt > start) {
    let end = page.indexOf('</script>', endAt); end += '</script>'.length;
    page = page.slice(0, start) + src.trim() + page.slice(end); console.log('replaced', name, 'part', p);
  } else if (start >= 0 && page.indexOf(styleMark) === start && endAt < 0) {
    // 7.34: a module with a style block but no part marks (r312): replaced through as many script blocks as it has itself. Before, it
    // was added a second time, and the page's own copy (first, behind the same guard) went on running.
    const n = (src.match(/<script\b/g) || []).length; let end = start;
    for (let i = 0; i < n; i++) { const so = page.indexOf('<script', end); if (so < 0) throw new Error(name + ': its scripts were not found in the page'); end = page.indexOf('</script>', so) + '</script>'.length; }
    page = page.slice(0, start) + src.trim() + page.slice(end); console.log('replaced', name, '(by its style block and ' + n + ' script' + (n === 1 ? '' : 's') + ')');
  } else {
    // new: after the last module block (the last "running" line's </script>)
    const re = /try\{window\.__ingParts\["p\d+"\]="running";\}catch\(_\)\{\}[\s\S]*?<\/script>/g; let m, last = null; while ((m = re.exec(page))) last = m;
    if (!last) throw new Error('no module block found');
    const at = last.index + last[0].length; page = page.slice(0, at) + '\n' + src.trim() + page.slice(at); console.log('added', name, 'part', p);
  }
}
const tmp = OUT + '.tmp'; fs.writeFileSync(tmp, page); fs.renameSync(tmp, OUT); console.log('wrote', OUT, page.length, 'bytes');
