// Ingenium's library tests on Chromium's own IndexedDB (Playwright's Chromium).
//   node rig/idb/run_chromium.js <page url> [result.json]
// IDB_ONLY=<regular expression> runs only the tests of one tab whose names match it; IDB_SKIP=main,tabs,quota leaves phases out.
const { run } = require('./run_node.js');
const [url, out] = process.argv.slice(2);
if (!url) { console.error('usage: node rig/idb/run_chromium.js <page url> [result.json]'); process.exit(2); }
const skip = (process.env.IDB_SKIP || '').split(',');
run('chromium', url, out || 'idb-chromium.json', { only: process.env.IDB_ONLY || null, skipMain: skip.includes('main'), skipTabs: skip.includes('tabs'), skipQuota: skip.includes('quota') })
  .then(r => process.exit(r.failed || !r.results.length ? 1 : 0), e => { console.log('FAIL the runner crashed: ' + (e && e.stack || e)); process.exit(2); });
