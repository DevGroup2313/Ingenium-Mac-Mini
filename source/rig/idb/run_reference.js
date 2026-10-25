// Ingenium's library tests on the reference implementation of the IndexedDB standard: fake-indexeddb, bundled by
// build_reference.js under /tmp and put in place of Chromium's own indexedDB (and every other IDB global) before any page script.
//   node rig/idb/run_reference.js <page url> [result.json]
// IDB_ONLY=<regular expression> runs only the tests of one tab whose names match it; IDB_SKIP=main,tabs,quota leaves phases out.
const { run } = require('./run_node.js');
const [url, out] = process.argv.slice(2);
if (!url) { console.error('usage: node rig/idb/run_reference.js <page url> [result.json]'); process.exit(2); }
const skip = (process.env.IDB_SKIP || '').split(',');
run('reference', url, out || 'idb-reference.json', { only: process.env.IDB_ONLY || null, skipMain: skip.includes('main'), skipTabs: skip.includes('tabs'), skipQuota: skip.includes('quota') })
  .then(r => process.exit(r.failed || !r.results.length ? 1 : 0), e => { console.log('FAIL the runner crashed: ' + (e && e.stack || e)); process.exit(2); });
