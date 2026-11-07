<script>try{(window.__ingParts=window.__ingParts||{})["p253"]="started";}catch(_){}
/* ============ R253 · LECTOR PREPARES AN APP AWAY FROM THE PAGE (Ingenium 6.55, 7 November 2026) ============
   Her words (7 November 2026): "Clicking on any of the 4 apps inside of the "Your apps" section of the Lector page feels really heaving
   and slow, please fix that." Measured on the 6.55 test page in Chromium: choosing The Forge (a page of 14 MB) read it from the library,
   set its pictures aside, separated its code, styles and markup, gathered its words, notes and inventory (lxPrepare), all on the page's
   own thread: about 1.4 s of work at the computer's own speed, in pieces of up to half a second during which nothing on the page could
   answer (two pieces of 0.7 and 1.9 s with the computer slowed four times); Carpe Diem (31 MB) more. The same preparation now runs in
   a worker of its own, built from the page's own functions (so it is the same work, giving the same result), while the page goes on
   answering; the result comes back whole. Where a worker cannot be made, or anything in it fails, the page prepares it as before. */
(function r253(){
"use strict";
if(window.__r253)return;window.__r253=1;
var W=window,orig=W.lxPrepare;
if(typeof orig!=="function"||typeof Worker!=="function"||typeof Blob!=="function")return;
var worker=null,off=false,seq=0,wait={};
function lit(v){if(v instanceof RegExp)return v.toString();if(Array.isArray(v))return "["+v.map(lit).join(",")+"]";return JSON.stringify(v);}
function source(){var out=[],need=["ingIsPage","ingB64End","mediaKind","fmtBytes","lxCount","lxFrench","lxMinified","lxUnTag","lxUniq"];
  need.forEach(function(n){if(typeof W[n]!=="function")throw new Error("no "+n);out.push(String(W[n]));});
  out.push("var lxPrepare="+String(orig)+";");
  var M=W.IngStripMore;if(!M||typeof M.base!=="function")throw new Error("no strip");
  out.push("var ingStripMediaBase="+String(M.base)+";","var B64N="+M.b64n.toString()+";",M.src);
  out.push("var ingStripMedia=function(text){var r=ingStripMediaBase(text);try{var x=more(r.text);if(x)return {text:x.text,n:r.n+x.n,bytes:r.bytes+x.bytes};}catch(e){}return r;};");
  /* the tables those functions read: patterns and lists, written out as they are */
  ["ING_NOT_B64","LX_FR","LX_EN","LX_TECH"].forEach(function(n){var v=W[n];if(!(v instanceof RegExp)&&!Array.isArray(v))throw new Error("no "+n);out.push("var "+n+"="+lit(v)+";");});
  out.push("function lxYield(){return Promise.resolve();}");
  out.push('onmessage=function(e){var d=e.data;Promise.resolve().then(function(){var text=d.text!=null?d.text:new TextDecoder().decode(d.bytes);d.bytes=null;'
    +'return lxPrepare(d.name,text,function(s){postMessage({id:d.id,step:String(s)});});})'
    +'.then(function(P){postMessage({id:d.id,P:P});},function(err){postMessage({id:d.id,error:String(err&&err.message||err)});});};');
  return out.join("\n");}
function make(){if(worker||off)return worker;
  try{var u=URL.createObjectURL(new Blob([source()],{type:"text/javascript"}));worker=new Worker(u);
    worker.onmessage=function(e){var d=e.data||{},w=wait[d.id];if(!w)return;
      if(d.step!=null){try{if(w.onStep)w.onStep(d.step);}catch(x){}return;}
      delete wait[d.id];if(d.error)w.no(new Error(d.error));else w.yes(d.P);};
    worker.onerror=function(e){quit("the worker stopped: "+(e&&e.message||e));};}
  catch(e){quit(String(e&&e.message||e));}
  return worker;}
function quit(why){off=true;try{console.warn("Lector prepares on the page again:",why);}catch(_){}
  try{if(worker)worker.terminate();}catch(_){}worker=null;
  Object.keys(wait).forEach(function(id){var w=wait[id];delete wait[id];w.no(new Error(why));});}
function viaWorker(name,text,onStep){var w=make();if(!w)return Promise.reject(new Error("no worker"));
  return new Promise(function(yes,no){var id=++seq;wait[id]={yes:yes,no:no,onStep:onStep};w.postMessage({id:id,name:name,text:text});});}
/* an app kept in the library goes to the worker as the bytes it is kept in, handed over whole (not copied), and is read as text there:
   the page then neither decodes 30 MB of text nor copies it (Carpe Diem; Ingenium's own page is 78 MB) */
function bytesOf(k){try{var m=libState().apps[k];if(!m||!m.ref||typeof libTx!=="function")return Promise.resolve(null);var id=m.ref;
    return libTx("readonly",function(st){return st.get(id);}).catch(function(){return null;})
      .then(function(v){return v&&typeof libOpen==="function"?libOpen(v):v;})
      .then(function(b){if(!b)return null;var u=b instanceof Uint8Array?b:(b instanceof ArrayBuffer?new Uint8Array(b):null);if(!u)return null;
        return (u.byteOffset===0&&u.byteLength===u.buffer.byteLength)?u:u.slice();});}catch(e){return Promise.resolve(null);}}
function prepareKey(k,name){if(off)return Promise.resolve(null);
  return bytesOf(k).then(function(u){if(!u||u.length<300000)return null;var w=make();if(!w)return null;
    return new Promise(function(yes,no){var id=++seq;wait[id]={yes:yes,no:no,onStep:null};w.postMessage({id:id,name:name,bytes:u},[u.buffer]);});})
    .catch(function(e){if(!off)quit(String(e&&e.message||e));return null;});}
/* small pages are quick on the page itself; large ones (an app of hundreds of kilobytes and more) go to the worker */
var nx=function(name,text,onStep){var self=this,args=arguments;text=String(text||"");
  if(off||text.length<300000)return orig.apply(self,args);
  return viaWorker(name,text,onStep).catch(function(e){if(!off)quit(String(e&&e.message||e));return orig.apply(self,args);});};
nx.__r253=1;W.lxPrepare=nx;try{lxPrepare=nx;}catch(e){}
W.IngLectorWorker={on:function(){return !off&&!!worker;},off:function(){return off;},prepare:viaWorker,prepareKey:prepareKey,orig:orig};
})();
;try{window.__ingParts["p253"]="running";}catch(_){}
</script>
