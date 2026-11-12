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
  const src = fs.readFileSync(mp, 'utf8'); const name = path.basename(mp, '.js'); const p = partOf(src, name);
  const endMark = 'try{window.__ingParts["p' + p + '"]="running";}catch(_){}';
  const styleMark = '<style id="' + name + '-css">';
  let start = page.indexOf(styleMark);
  const endAt = page.indexOf(endMark);
  if (start >= 0 && endAt > start) {
    let end = page.indexOf('</script>', endAt); end += '</script>'.length;
    page = page.slice(0, start) + src.trim() + page.slice(end); console.log('replaced', name, 'part', p);
  } else {
    // new: after the last module block (the last "running" line's </script>)
    const re = /try\{window\.__ingParts\["p\d+"\]="running";\}catch\(_\)\{\}[\s\S]*?<\/script>/g; let m, last = null; while ((m = re.exec(page))) last = m;
    if (!last) throw new Error('no module block found');
    const at = last.index + last[0].length; page = page.slice(0, at) + '\n' + src.trim() + page.slice(at); console.log('added', name, 'part', p);
  }
}
const tmp = OUT + '.tmp'; fs.writeFileSync(tmp, page); fs.renameSync(tmp, OUT); console.log('wrote', OUT, page.length, 'bytes');
