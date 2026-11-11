<script>try{(window.__ingParts=window.__ingParts||{})["p275"]="started";}catch(_){}
/* ============ R275 · CARPE DIEM CARRIED WITHOUT ITS OWN COPY OF ITSELF (Ingenium 6.82, 11 November 2026) ============
   The page must stay under 100 MiB, the most GitHub keeps in one file, and at 6.81 it had 0.85 MB left. Carpe Diem carries its own
   page, compressed and written in base64 (its block cd-self-src-data): 18.9 MB of the 43.1 MB Carpe Diem took here, and a part no
   compressor makes smaller. From 6.82 Ingenium carries Carpe Diem without that block's text (build/self_copy.py proves, with this
   page's own code, that it comes back whole), and puts it back here when Carpe Diem is wanted: by the app library, which keeps it
   on the device once per version (modules/r120.js), and by Fabrica's demonstrations (modules/r268.js). Both check the whole against
   Carpe Diem's own fingerprint, as before.
   The work (about three seconds on a computer; longer on a tablet) runs in a worker, so the page goes on answering; where a worker
   cannot be made, it runs in the page itself. Nothing here runs until Carpe Diem is wanted. The code it runs (pako's deflate, MIT
   licence, and build/self_copy.js) is carried in the block ing-self-copy-src.
   window.ingBuiltinWhole(id, bytes) -> Promise of the app's whole page: bytes as they are when the block names no copy. */
(function r275(){
"use strict";
var W=window,D=document;
if(typeof W.ingBuiltinWhole==="function")return;
function src(){var e=D.getElementById("ing-self-copy-src");var t=e?e.textContent:"";if(!t)throw new Error("this page does not carry the code that puts an app's copy of itself back");return t;}
/* the same wrapper as build/self_copy_prove.js: pako fills the module it finds, and the rest stays out of it */
var HEAD="var module={exports:{}},exports=module.exports,require=undefined;\n";
var TAIL="\n;self.onmessage=function(ev){try{var out=ingSelfRebuild(module.exports,new Uint8Array(ev.data.cdx),ev.data.meta);"+
  "self.postMessage({ok:true,out:out.buffer},[out.buffer]);}catch(e){self.postMessage({ok:false,inWork:true,err:String(e&&e.message||e)});}};";
var STATS={worker:0,page:0,ms:0,last:""};
function inWorker(cdx,meta){return new Promise(function(res,rej){var url=null,w=null;
  try{url=URL.createObjectURL(new Blob([HEAD+src()+TAIL],{type:"text/javascript"}));w=new Worker(url);}
  catch(e){if(url)URL.revokeObjectURL(url);rej(e);return;}
  function end(){try{w.terminate();}catch(e){}try{URL.revokeObjectURL(url);}catch(e){}}
  /* a mismatch found by the work itself is final; a worker that could not run sends the work to the page */
  w.onmessage=function(ev){end();var d=ev.data||{};if(d.ok&&d.out){res(new Uint8Array(d.out));return;}var x=new Error(d.err||"the copy could not be put back");x.inWork=!!d.inWork;rej(x);};
  w.onerror=function(ev){end();try{ev.preventDefault();}catch(e){}rej(new Error(ev&&ev.message||"the worker stopped"));};
  var buf=cdx.slice().buffer;w.postMessage({cdx:buf,meta:meta},[buf]);});}
function onPage(cdx,meta){return new Promise(function(res){setTimeout(res,30);}).then(function(){
  var made=new Function(HEAD+src()+"\n;return {pako:module.exports,rebuild:ingSelfRebuild};")();
  return made.rebuild(made.pako,cdx,meta);});}
function metaOf(e){var a=e&&e.getAttribute("data-self");if(!a)return null;
  var m;try{m=JSON.parse(new TextDecoder().decode(Uint8Array.from(atob(a),function(c){return c.charCodeAt(0);})));}catch(x){throw new Error("the block's note of its copy could not be read");}
  if(!m||m.v!==1||!m.ops||typeof m.at!=="number"||!m.head)throw new Error("the block's note of its copy is not one this page knows");return m;}
function sha(u8){if(typeof W.libSha==="function")return W.libSha(u8);if(!(W.crypto&&crypto.subtle))return Promise.resolve(null);
  return crypto.subtle.digest("SHA-256",u8).then(function(b){var x=new Uint8Array(b),s="";for(var i=0;i<x.length;i++)s+=(x[i]<16?"0":"")+x[i].toString(16);return s;});}
W.ingBuiltinWhole=function(id,u8){var e=D.getElementById(id),meta;
  try{meta=metaOf(e);}catch(x){return Promise.reject(x);}
  if(!meta)return Promise.resolve(u8);
  var t0=Date.now(),how="worker";
  return inWorker(u8,meta).catch(function(err){if(err&&err.inWork)throw err;how="page";STATS.last=String(err&&err.message||err);return onPage(u8,meta);}).then(function(out){
    if(meta.size&&out.length!==meta.size)throw new Error("the app did not come back whole (its size differs)");
    /* checked here too, so a page that is not the app never leaves this part, whatever its size */
    return sha(out).then(function(h){if(h&&meta.sha256&&h!==meta.sha256)throw new Error("the app did not come back whole (its fingerprint differs)");
      STATS[how]++;STATS.ms=Date.now()-t0;return out;});});};
W.ingBuiltinWhole.stats=function(){return {worker:STATS.worker,page:STATS.page,ms:STATS.ms,last:STATS.last};};
W.ingBuiltinWhole.carriesCopy=function(id){try{return !!metaOf(D.getElementById(id));}catch(e){return false;}};
try{window.__ingParts["p275"]="running";}catch(_){}
})();
</script>
