// Ingenium 7.45: the editions other than the master carry none of the owner's own material, read in the whole text of each file, not
// only in what its pages show (rig/t_627_editions reads the pages). Her words (19 November 2026): "I also really want the Full edition
// to be rid of my information and all of my apps and be a real full version of Ingenium but without my Author access and owner
// administrative functions like I have made clear many times."
//   Refused anywhere in the file: her DPhil plan (modules/r323.js) and its facts, her own list of ways of working (r327's HERS), her own
//   devices named as hers, the parts that run in the master alone (Lector's recipe, the Workshop, the Author Studio, Troubleshoot, the
//   Offline Project, her apps' demonstrations and copies, the build library, Ingenium's own rules).
//   Her name: only where authorship, copyright and the licence stand (and the licence's owner keys, which every copy checks against).
//   Reported, not refused: her other apps' names in code that cannot run here (the app library and its seals), for the next pass.
//   node rig/t_745_owner_free.js full=<file> gift=<file> demo=<file>
const fs = require('fs');
let pass = 0, fail = 0; const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (c || d === undefined ? '' : '  ' + JSON.stringify(d).slice(0, 900))); c ? pass++ : fail++; return !!c; };
const REFUSED = [
  ['her DPhil plan', /IngDPhil|Your DPhil plan|Internet Institute|Shirley Scholarships|Funded DPhil|Grand Union DTP|apply by 12 noon/],
  ['her ways of working', /Software that looks and feels alive|From Fabrica, 18 November 2026|The animated, popped-out 3D look and effect/],
  ['her devices', /\b[Yy]our (Mac mini|MacBook|HP laptop|Fire tablet)\b|on the HP laptop/],
  ['the master\'s own parts', /\["p(126|226|227|236|329|246|268|275|258|297|323)"\]/],
];
const AUTHORSHIP = /Copyright \(c\) 2026 Yannie D\. Forest|Designed and built by Yannie D\. Forest|© 2026 Yannie D\. Forest|&copy; 2026 Yannie D\. Forest|"name": "Yannie D\. Forest"|OWNER="Yannie D\. Forest"|Ingenium belongs to Yannie D\. Forest|\\?"The owner\\?" means Yannie D\. Forest|made by Yannie D\. Forest, its owner under its licence|carries it\. Yannie D\. Forest\./g;
const APPS = /Carpe Diem|The Forge|Inkwell|Offline Project|Lakay/g;
for (const pair of process.argv.slice(2)) {
  const [ed, file] = pair.split('='); const s = fs.readFileSync(file, 'utf8');
  const edv = (/var ING_EDITION="([a-z]+)"/.exec(s) || [])[1];
  ok(edv === ed, ed + ': the file is the ' + ed + ' edition', edv);
  for (const [what, re] of REFUSED) {
    const g = new RegExp(re.source, 'g'); const hits = []; let m;
    while ((m = g.exec(s)) && hits.length < 6) hits.push(s.slice(Math.max(0, m.index - 60), m.index + 60).replace(/\s+/g, ' '));
    ok(hits.length === 0, ed + ': none of ' + what, hits);
  }
  const rest = s.replace(AUTHORSHIP, ''); const names = []; const g = /Yannie|D\. Forest/g; let m;
  while ((m = g.exec(rest)) && names.length < 6) names.push(rest.slice(Math.max(0, m.index - 70), m.index + 50).replace(/\s+/g, ' '));
  ok(names.length === 0, ed + ': her name only where authorship, copyright and the licence stand', names);
  const apps = (s.match(APPS) || []).length;
  console.log('NOTE ' + ed + ': her other apps\' names in code that cannot run in this edition: ' + apps);
}
console.log(pass + ' passed, ' + fail + ' failed'); process.exit(fail ? 1 : 0);
