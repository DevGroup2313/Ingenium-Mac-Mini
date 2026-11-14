// Ingenium 7.08 · Fabrica's runs: the core of modules/r298.js in Node (no page): GitHub's workflow files read as GitHub reads them, its
// expressions, and a workflow made into a run for this computer. Invented apps and workflows only.
//   node rig/t_708_core.js [<module file>]
const fs = require('fs'); const path = require('path');
const MOD = process.argv[2] || path.join(__dirname, '..', 'build', 'modules', 'r298.js');
const src = fs.readFileSync(MOD, 'utf8'); const a = src.indexOf('/*CORE-BEGIN*/'), b = src.indexOf('/*CORE-END*/');
const CORE = new Function(src.slice(a + 14, b) + ';return CORE;')();
let pass = 0, fail = 0; const ok = (c, m, d) => { console.log((c ? 'PASS ' : 'FAIL ') + m + (c || d === undefined ? '' : '  ' + JSON.stringify(d).slice(0, 600))); c ? pass++ : fail++; };
const E = (s, ctx, st) => { try { return CORE.expr(s, ctx || {}, st); } catch (e) { return { err: e.message, later: e.later }; } };
const ctx = { github: { event_name: 'workflow_dispatch', ref: 'refs/heads/main', sha: 'abc123', event: { inputs: { level: 'all' } } }, runner: { os: 'macOS' }, matrix: { os: 'macos-14', py: 3.12 }, env: { APP: 'Tide Clock' }, inputs: { level: 'all' } };
// ----- expressions, as GitHub defines them -----
ok(E("github.event_name == 'workflow_dispatch'", ctx) === true, "== with a string");
ok(E("'A' == 'a'", ctx) === true && E("1 == '1'", ctx) === true && E("null == 0", ctx) === true && E("'' == 0", ctx) === true, "== is loose and ignores case, as on GitHub");
ok(E("'x' || 'y'", ctx) === 'x' && E("'' && 'y'", ctx) === '' && E("!''", ctx) === true, "|| and && give a value, not only true or false");
ok(E("startsWith(github.ref, 'refs/heads/')", ctx) === true && E("endsWith('v1.2', '.2')", ctx) === true, "startsWith and endsWith");
ok(E("contains(fromJSON('[\"a\",\"b\"]'), 'b')", ctx) === true && E("contains('Hello', 'ell')", ctx) === true, "contains on a list and on text; fromJSON");
ok(E("format('{0}-{1} {{x}}', 'a', 1)", ctx) === 'a-1 {x}', "format with its braces");
ok(E("join(fromJSON('[1,2,3]'), '+')", ctx) === '1+2+3', "join");
ok(E("GITHUB.SHA", ctx) === 'abc123' && E("github.event.inputs.level", ctx) === 'all' && E("inputs.level", ctx) === 'all', "contexts read without regard to case; inputs");
ok(E("matrix.os == 'macos-14' && runner.os == 'macOS'", ctx) === true, "matrix and runner");
ok(E("github.nothing.here", ctx) === null, "a name that is not there is null");
const later = E("steps.build.outputs.size == '3'", ctx); ok(later && later.later === 'steps', "steps.* is known only as the run goes", later);
ok(E("success()", ctx, { ok: true }) === true && E("failure()", ctx, { ok: false }) === true && E("always()", ctx, { ok: false }) === true, "success, failure and always follow the job");
ok(E("4 < 10", ctx) === true && E("'b' > 'a'", ctx) === true, "comparisons");
// ----- if: and when a step runs -----
ok(CORE.cond("", ctx).when === 'success', "no condition: after success");
ok(CORE.cond("always()", ctx).when === 'always' && CORE.cond("${{ failure() }}", ctx).when === 'failure' && CORE.cond("success() || failure()", ctx).when === 'always', "always, failure, either");
ok(CORE.cond("runner.os == 'Windows'", ctx).when === 'never', "a condition false here: never");
ok(CORE.cond("github.event_name == 'workflow_dispatch'", ctx).when === 'success', "a true condition runs after success, as GitHub adds success()");
ok(CORE.cond("steps.x.outputs.y == 'z'", ctx).when === 'unknown', "a condition on a step's output is said to be unknown here");
// ----- ${{ }} in text -----
ok(CORE.fill("echo ${{ env.APP }} ${{ matrix.os }}", ctx) === "echo \x01env:APP\x01 macos-14", "env.X is filled as the run goes; matrix now");
ok(CORE.fill("${{ steps.v.outputs.ver }}", ctx) === "\x01so:v:ver\x01" && CORE.fill("${{ github.workspace }}/out", ctx) === "\x01env:GITHUB_WORKSPACE\x01/out", "a step's output and the workspace are filled by the computer app");
// ----- when it runs, in plain words -----
const tr = CORE.triggers({ push: { branches: ['main'], tags: ['v*'] }, workflow_dispatch: null, schedule: [{ cron: '0 2 * * *' }], pull_request: null });
ok(JSON.stringify(tr) === JSON.stringify(["a release tag (v*)", "a new version on main", "by hand", "every day at 02:00 (UTC)", "a pull request"]), "triggers in plain words", tr);
ok(JSON.stringify(CORE.triggers('push')) === '["a new version"]' && JSON.stringify(CORE.triggers(['push', 'workflow_dispatch'])) === '["a new version","by hand"]', "on: as a word or a list");
// ----- a workflow made into a run -----
const wf = CORE.yaml(`name: Build every device
on:
  workflow_dispatch:
    inputs:
      level: {description: 'How much', default: all, type: choice, options: [all, mac]}
env:
  APP: Tide Clock
jobs:
  mac:
    runs-on: \${{ matrix.os }}
    strategy:
      matrix:
        os: [macos-14, macos-15]
        include:
          - os: macos-15
            extra: yes-please
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-python@v5
        with: {python-version: '3.12'}
      - id: v
        run: echo "ver=3.2" >> "$GITHUB_OUTPUT"
      - name: Build \${{ env.APP }}
        run: echo "building on \${{ matrix.os }} \${{ matrix.extra }} \${{ steps.v.outputs.ver }}"
        working-directory: ./app
      - uses: actions/upload-artifact@v4
        with:
          name: mac-app
          path: |
            out/*.zip
            !out/tmp
          if-no-files-found: error
      - if: failure()
        run: echo cleaning
      - uses: softprops/action-gh-release@v2
  win:
    runs-on: windows-latest
    needs: mac
    steps:
      - run: echo hi
  linux:
    runs-on: ubuntu-24.04
    needs: [mac]
    if: \${{ inputs.level == 'all' }}
    defaults: {run: {shell: bash}}
    steps:
      - uses: actions/download-artifact@v4
        with: {name: mac-app, path: ./got}
      - run: ls got
`);
const p1 = CORE.plan(wf, { os: 'macOS', sha: 'abc', tools: { python: '3.12.7' }, file: '.github/workflows/build.yml' });
ok(p1.name === 'Build every device' && p1.jobs.map(j => j.key).join(',') === 'mac_1,mac_2,win,linux', "a matrix makes a job for each combination", p1.jobs.map(j => j.key));
ok(p1.jobs[0].name === 'mac (macos-14)' && p1.jobs[1].name === 'mac (macos-15, yes-please)', "each named by its combination; include adds its key", p1.jobs.map(j => j.name));
const s1 = p1.jobs[1].steps;
ok(s1[0].kind === 'note' && s1[0].done && s1[1].kind === 'note' && s1[1].done && /3\.12\.7/.test(s1[1].text) && /3\.12/.test(s1[1].text), "checkout is done; setup-python uses this computer's Python, saying what the workflow asked for", s1.slice(0, 2));
ok(s1[2].sid === 'v' && s1[3].name === 'Build \x01env:APP\x01' || s1[3].name === 'Build Tide Clock', "a step keeps its id; its name is filled", [s1[2].sid, s1[3].name]);
ok(s1[3].run === 'echo "building on macos-15 yes-please \x01so:v:ver\x01"' && s1[3].cwd === 'app', "its command is filled; its folder kept", s1[3]);
ok(s1[4].kind === 'artifact' && s1[4].art === 'mac-app' && JSON.stringify(s1[4].paths) === '["out/*.zip","!out/tmp"]' && s1[4].need === 'error', "upload-artifact keeps the files, its paths, and what to do when none match", s1[4]);
ok(s1[5].when === 'failure' && s1[6].kind === 'note' && /marketplace/.test(s1[6].text), "if: failure() runs after a failure; an action of the marketplace is said to run on GitHub only", [s1[5], s1[6]]);
ok(/it runs on Windows/.test(p1.jobs[2].skip) && /it runs on Linux/.test(p1.jobs[3].skip), "jobs for other systems are not run here, and say why", [p1.jobs[2].skip, p1.jobs[3].skip]);
ok(JSON.stringify(p1.jobs[2].needs) === '["mac_1","mac_2"]', "needs names every job its matrix made", p1.jobs[2].needs);
const p2 = CORE.plan(wf, { os: 'macOS', anyway: 'all', tools: {}, need: { python: 'from python.org' } });
ok(!p2.jobs[3].skip && p2.jobs[3].steps[0].kind === 'fetch' && p2.jobs[3].steps[0].art === 'mac-app' && p2.jobs[3].steps[0].into === 'got' && p2.jobs[3].steps[1].shell === 'bash', "every job here when asked; download-artifact brings the files in; defaults.run.shell", p2.jobs[3].steps);
ok(p2.jobs[0].steps[1].kind === 'fail' && /from python\.org/.test(p2.jobs[0].steps[1].text), "Python missing: the step fails, saying where to get it", p2.jobs[0].steps[1]);
const p3 = CORE.plan(wf, { os: 'macOS', anyway: 'all', inputs: { level: 'mac' } });
ok(/condition is false/.test(p3.jobs[3].skip), "an input chosen in the run sheet reaches the jobs' conditions", p3.jobs[3].skip);
ok(p1.inputs && p1.inputs.level && JSON.stringify(p1.inputs.level.options) === '["all","mac"]', "the workflow's inputs are given to the run sheet", p1.inputs);
// ----- the real workflows of Ingenium's own repositories: each read and made into a run without a fault -----
const roots = ['Ingenium-Mac-Mini', 'Ingenium-Mac-Intel', 'Ingenium-HPWindows', 'Ingenium-Android-fire'].map(r => path.join(__dirname, '..', '..', '..', r, '.github', 'workflows'));
let n = 0, bad = [];
for (const d of roots) { if (!fs.existsSync(d)) continue; for (const f of fs.readdirSync(d).filter(x => /\.ya?ml$/.test(x))) { n++;
  try { const w = CORE.yaml(fs.readFileSync(path.join(d, f), 'utf8')); const pl = CORE.plan(w, { os: 'macOS', file: f }); if (!pl.jobs.length) bad.push(f + ': no jobs'); } catch (e) { bad.push(f + ': ' + e.message); } } }
ok(n >= 20 && !bad.length, n + " real workflow files read and planned", bad);
// ----- the recipes Fabrica writes are workflows it can read -----
console.log(pass + ' passed, ' + fail + ' failed'); process.exit(fail ? 1 : 0);
