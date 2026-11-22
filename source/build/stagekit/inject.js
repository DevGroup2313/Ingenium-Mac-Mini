/* Ingenium's stage kit (stagekit/kit.js): what fake-indexeddb asks of the browser and older browsers lack (Chrome 83 on a
   Fire tablet has none of them), handed to the library alone by make_kit.js (esbuild's inject and define), so the page in
   the frame keeps its own globals as they are. Each one uses the browser's own where it has it. */

/* structuredClone (Chrome 98, Safari 15.4): the copy IndexedDB keeps of every value. Where the browser has none, the same
   copy made here, to the same rules: the kinds of value a structured clone carries, objects shared or in a cycle kept so,
   and a DataCloneError for anything it cannot carry (a function, a symbol, a part of the page). */
function cloneError(what) {
  var m = what + " could not be cloned.";
  try { return new DOMException(m, "DataCloneError"); } catch (e) { var x = new Error(m); x.name = "DataCloneError"; return x; }
}
var TAG = Object.prototype.toString;
var VIEWS = ["Int8Array", "Uint8Array", "Uint8ClampedArray", "Int16Array", "Uint16Array", "Int32Array", "Uint32Array",
  "Float32Array", "Float64Array", "BigInt64Array", "BigUint64Array"];
function copyOf(v, seen) {
  var t = typeof v;
  if (v === null || t === "undefined" || t === "boolean" || t === "number" || t === "string" || t === "bigint") return v;
  if (t === "symbol") throw cloneError("A symbol");
  if (t === "function") throw cloneError("A function");
  if (seen.has(v)) return seen.get(v);
  var k = TAG.call(v).slice(8, -1), out, i;
  if (k === "Date") { out = new Date(v.getTime()); seen.set(v, out); return out; }
  if (k === "RegExp") { out = new RegExp(v.source, v.flags); seen.set(v, out); return out; }
  if (k === "Boolean") { out = Object(Boolean.prototype.valueOf.call(v)); seen.set(v, out); return out; }
  if (k === "Number") { out = Object(Number.prototype.valueOf.call(v)); seen.set(v, out); return out; }
  if (k === "String") { out = Object(String.prototype.valueOf.call(v)); seen.set(v, out); return out; }
  if (k === "BigInt") { out = Object(BigInt.prototype.valueOf.call(v)); seen.set(v, out); return out; }
  if (k === "ArrayBuffer") { out = v.slice(0); seen.set(v, out); return out; }
  if (k === "SharedArrayBuffer") throw cloneError("A SharedArrayBuffer");
  if (k === "DataView") { out = new DataView(copyOf(v.buffer, seen), v.byteOffset, v.byteLength); seen.set(v, out); return out; }
  if (VIEWS.indexOf(k) >= 0) { out = new v.constructor(copyOf(v.buffer, seen), v.byteOffset, v.length); seen.set(v, out); return out; }
  if (k === "Blob" || k === "File" || k === "FileList") { seen.set(v, v); return v; }   /* never changed once made: the same one serves */
  if (k === "ImageData") { out = new ImageData(new Uint8ClampedArray(v.data), v.width, v.height); seen.set(v, out); return out; }
  if (k === "Map") { out = new Map(); seen.set(v, out); v.forEach(function (val, key) { out.set(copyOf(key, seen), copyOf(val, seen)); }); return out; }
  if (k === "Set") { out = new Set(); seen.set(v, out); v.forEach(function (val) { out.add(copyOf(val, seen)); }); return out; }
  if (k === "Error") {
    var C = { EvalError: EvalError, RangeError: RangeError, ReferenceError: ReferenceError, SyntaxError: SyntaxError, TypeError: TypeError, URIError: URIError }[v.name] || Error;
    out = new C(v.message); seen.set(v, out); try { if (v.stack) out.stack = String(v.stack); } catch (e) { } return out;
  }
  if (Array.isArray(v)) {
    out = new Array(v.length); seen.set(v, out);
    var ks = Object.keys(v); for (i = 0; i < ks.length; i++) out[ks[i]] = copyOf(v[ks[i]], seen);
    return out;
  }
  if (k === "Object" || k === "Arguments") {
    if (typeof Node !== "undefined" && v instanceof Node) throw cloneError("A part of the page");
    out = {}; seen.set(v, out);
    var keys = Object.keys(v); for (i = 0; i < keys.length; i++) out[keys[i]] = copyOf(v[keys[i]], seen);
    return out;
  }
  throw cloneError("A " + k);
}
function ingClone(v) {
  if (typeof globalThis.structuredClone === "function") return globalThis.structuredClone(v);
  return copyOf(v, new Map());
}

/* AggregateError (Chrome 85): thrown when more than one listener of an event threw; the first error stands for them. */
var ingAggregateError = typeof globalThis.AggregateError === "function" ? globalThis.AggregateError
  : function (errors) { return errors && errors.length ? errors[0] : new Error("Errors in event listeners"); };

/* Object.hasOwn (Chrome 93) */
var ingHasOwn = typeof Object.hasOwn === "function" ? Object.hasOwn
  : function (o, k) { return Object.prototype.hasOwnProperty.call(o, k); };

export { ingClone as structuredClone, ingAggregateError as AggregateError, ingHasOwn as __ingHasOwn };
