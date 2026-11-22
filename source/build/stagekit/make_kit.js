// Ingenium's stage kit, made once by hand when kit.js or the library changes:  node make_kit.js <path to esbuild's package>
// (esbuild 0.28.2 was used; it is not carried in the repository). It bundles kit.js with fake-indexeddb 6.2.8 (fake-indexeddb/,
// the npm package's build/esm folder, unchanged, with its LICENSE) into one script for a page in a sandboxed frame, written
// for Chrome 83 and later (its class fields written out, for the older web views of Macs and iPads), shrunk; and records its size and fingerprint in stage_kit.json, which build_page.py checks.
// What is changed in the library, and only in the bundle (Apache-2.0, section 4b):
//   - lib/scheduling.js: where the browser has neither setImmediate nor scheduler.postTask, the next task is queued through a
//     MessageChannel rather than setTimeout(fn, 0), which a browser slows to 4 ms after a few in a row;
//   - FDBDatabase.js: transactions.findLast(...) (Chrome 97) is written as transactions.slice().reverse().find(...);
//   - structuredClone and AggregateError are taken from inject.js (esbuild's inject), and Object.hasOwn( is written as inject.js's
//     __ingHasOwn( (imported where it is used); each uses the browser's own where it has it.
const fs = require("fs"), path = require("path"), crypto = require("crypto");
const ESB = process.argv[2] || process.env.ESBUILD;
if (!ESB) { console.log("usage: node make_kit.js <path to node_modules/esbuild>"); process.exit(2); }
const esbuild = require(ESB);
const HERE = __dirname, LIB = path.join(HERE, "fake-indexeddb");
const PATCHES = {
  [path.join(LIB, "esm", "lib", "scheduling.js")]: [[
    "const doSetTimeout = fn => setTimeout(fn, 0);",
    "const doSetTimeout = (() => { if (typeof MessageChannel === \"undefined\") return fn => setTimeout(fn, 0); const q = [], ch = new MessageChannel(); ch.port1.onmessage = () => { const f = q.shift(); if (f) f(); }; return fn => { q.push(fn); ch.port2.postMessage(0); }; })();"
  ]],
  [path.join(LIB, "esm", "FDBDatabase.js")]: [[
    "database._rawDatabase.transactions.findLast(",
    "database._rawDatabase.transactions.slice().reverse().find("
  ]]
};
const patcher = {
  name: "ingenium-patches",
  setup(b) {
    b.onLoad({ filter: /\.js$/ }, (args) => {
      const file = path.normalize(args.path);
      if (!file.startsWith(LIB + path.sep)) return undefined;
      const list = PATCHES[file] || [];
      let src = fs.readFileSync(file, "utf8"), changed = false;
      for (const [from, to] of list) {
        if (src.split(from).length !== 2) throw new Error(path.relative(HERE, file) + ": the text to change is not there exactly once: " + from);
        src = src.replace(from, to); changed = true;
      }
      /* Object.hasOwn (Chrome 93) is inject.js's __ingHasOwn, imported where it is used */
      if (src.indexOf("Object.hasOwn(") >= 0) {
        src = "import { __ingHasOwn } from " + JSON.stringify(path.join(HERE, "inject.js")) + ";\n" + src.split("Object.hasOwn(").join("__ingHasOwn(");
        changed = true;
      }
      return changed ? { contents: src, loader: "js", resolveDir: path.dirname(file) } : undefined;
    });
  }
};
const pkg = JSON.parse(fs.readFileSync(path.join(LIB, "package.json"), "utf8"));
const banner = "/* Ingenium's stage kit (source/build/stagekit). Contains fake-indexeddb " + pkg.version
  + " by Jeremy Scheff and contributors, Apache License 2.0 (https://www.apache.org/licenses/LICENSE-2.0), changed by"
  + " Ingenium as make_kit.js says. */";
esbuild.build({
  entryPoints: [path.join(HERE, "kit.js")], bundle: true, format: "iife", target: ["chrome83"], supported: { "class-field": false, "class-static-field": false }, minify: true, keepNames: true,
  inject: [path.join(HERE, "inject.js")], plugins: [patcher],
  banner: { js: banner }, charset: "utf8", legalComments: "none", write: false, logLevel: "warning"
}).then((r) => {
  let out = r.outputFiles[0].text;
  if (/<\/script/i.test(out)) out = out.replace(/<\/script/gi, "<\\/script");
  const file = path.join(HERE, "stage_kit.min.js");
  fs.writeFileSync(file, out);
  const bytes = Buffer.byteLength(out), sha = crypto.createHash("sha256").update(out).digest("hex");
  const meta = {
    _about: "Ingenium's stage kit (7.69): kit.js and inject.js bundled with fake-indexeddb by make_kit.js. build_page.py checks it against the fingerprint below and carries it in the page, where modules/r358.js puts it first in every page Ingenium runs in a sandboxed frame.",
    name: "stage_kit", library: "fake-indexeddb", library_version: pkg.version, library_licence: "Apache-2.0",
    library_source: "https://registry.npmjs.org/fake-indexeddb/-/fake-indexeddb-" + pkg.version + ".tgz",
    library_tarball_sha1: "79593572cf4dc670128d439a937956716bfd546d", bundler: "esbuild " + require(path.join(ESB, "package.json")).version,
    file: "stage_kit.min.js", bytes: bytes, sha256: sha
  };
  fs.writeFileSync(path.join(HERE, "stage_kit.json"), JSON.stringify(meta, null, 1) + "\n");
  console.log("stage_kit.min.js: " + bytes + " bytes, sha256 " + sha.slice(0, 16));
}).catch((e) => { console.error(e && e.message || e); process.exit(1); });
