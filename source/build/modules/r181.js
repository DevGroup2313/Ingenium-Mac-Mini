<script>try{(window.__ingParts=window.__ingParts||{})["p102"]="started";}catch(_){}
/* ============ R181 · EVERY STORE LETS ANOTHER TAB IN, AND COMES BACK (Ingenium 6.7, 25 October 2026) ============
   The library tests across IndexedDB implementations (rig/idb: Chromium's own, WebKit's own, and the reference implementation
   of the standard) found that a store Ingenium holds open never let another tab of the same page delete or upgrade it.
   Reset everything in one tab deletes the model store (ingenium_files); every other tab held its connection open with no
   versionchange handler, so the delete waited for ever, and the tab that pressed Reset, once started again, waited behind it:
   its models never loaded. The same holds for every store a part of Ingenium keeps open (the long texts, the app library,
   Fabrica's history and packages, the signing keys, the conversations brought in, the desk's copy): only Fabrica's issues
   (ingenium_hub) and the backup's and storage's own short connections closed when asked.
   Now every connection closes when another tab asks for its store, as the standard expects, and the part that held it keeps
   working: for Ingenium's own stores a fresh connection is opened at once (it waits, as the standard queues it, until the
   other tab's delete or upgrade is done), with the same stores as before, and a transaction asked of the closed connection
   is taken by the fresh one. Nothing written afterwards is lost. A store whose code closes it itself is left to that code.
   The same tests found a second difference. When a write is refused (WebKit refuses the request itself when the quota is
   reached; any engine refuses a key already taken), the error event reaches the transaction before the transaction is
   aborted, and the standard leaves transaction.error empty until then: every part of Ingenium that answered onerror with
   transaction.error rejected with nothing (Fabrica's history, the owner key), so a full store was never named as full.
   Chromium, when the quota is reached as it commits, aborts with the error set, so it never showed. Now, while a refused
   request's error event is on its way, transaction.error is that request's error; once the event has gone by, it is the
   engine's own again. */
(function r181(){
"use strict";
var W=window;
if(!W.indexedDB||!W.IDBFactory||!W.IDBDatabase||W.__r181)return;W.__r181=true;
/* the stores Ingenium's own parts keep open; another store (an app carried inside keeps its own) is only closed */
/* (the owner key opens and closes its store for each read or write, and Fabrica's issues close theirs themselves) */
var OWN={ingenium_files:1,ingenium_big:1,ingenium_apps:1,ingenium_repos:1,fabrica_made:1,ingenium_keys:1,ingenium_claude:1,ingenium_desk:1};
var WATCHED=typeof WeakSet==="function"?new WeakSet():null,CLOSED=typeof WeakMap==="function"?new WeakMap():null;
if(!WATCHED||!CLOSED)return;
var FP=W.IDBFactory.prototype,DP=W.IDBDatabase.prototype,open0=FP.open,tx0=DP.transaction,DONE=new WeakSet(),CLEAR=new WeakMap();
/* transaction.error: an accessor of the engine's (Chromium, WebKit), or a field each transaction keeps (the reference implementation) */
var ERRGET=(function(){try{var d=Object.getOwnPropertyDescriptor(W.IDBTransaction.prototype,"error");return d&&typeof d.get==="function"?d.get:null;}catch(e){return null;}})();
if(typeof open0!=="function"||typeof tx0!=="function")return;
function schema(d){var out=[];try{var names=[].slice.call(d.objectStoreNames);if(!names.length)return out;var t=tx0.call(d,names,"readonly");
    names.forEach(function(n){var s=t.objectStore(n),ix=[];[].forEach.call(s.indexNames,function(i){var x=s.index(i);ix.push({name:x.name,keyPath:x.keyPath,unique:!!x.unique,multiEntry:!!x.multiEntry});});
      out.push({name:n,keyPath:s.keyPath,autoIncrement:!!s.autoIncrement,indexes:ix});});}catch(e){}return out;}
function live(d){var e=CLOSED.get(d),n=0;while(e&&e.fresh&&n++<20){d=e.fresh;e=CLOSED.get(d);}return d;}
/* a fresh connection to a store another tab deleted (at its version, with its stores) or upgraded (at the new version, when it
   still holds every store this tab's code uses) */
function reopen(old,ev,stores){var name=old.name,deleted=ev.newVersion==null,rq,entry=CLOSED.get(old);
  try{rq=deleted?open0.call(W.indexedDB,name,old.version):open0.call(W.indexedDB,name);}catch(e){return;}
  rq.onupgradeneeded=function(){var d=rq.result;stores.forEach(function(s){if(d.objectStoreNames.contains(s.name))return;try{var o={};if(s.keyPath!=null)o.keyPath=s.keyPath;if(s.autoIncrement)o.autoIncrement=true;
      var st=d.createObjectStore(s.name,o);s.indexes.forEach(function(i){try{st.createIndex(i.name,i.keyPath,{unique:i.unique,multiEntry:i.multiEntry});}catch(x){}});}catch(x){}});};
  rq.onsuccess=function(){var d=rq.result;watch(d);
    if(stores.some(function(s){return !d.objectStoreNames.contains(s.name);})){try{d.close();}catch(e){}return;}
    entry.fresh=d;};
  rq.onerror=function(e){try{e.preventDefault();}catch(x){}};}
function watch(d){if(!d||WATCHED.has(d))return;WATCHED.add(d);
  d.addEventListener("versionchange",function(ev){
    if(typeof d.onversionchange==="function"||CLOSED.has(d))return;/* its own code answers it */
    var stores=schema(d);CLOSED.set(d,{fresh:null,at:Date.now()});try{d.close();}catch(e){}
    if(OWN[d.name])reopen(d,ev,stores);});}
FP.open=function(){var rq=open0.apply(this,arguments);try{rq.addEventListener("success",function(){try{watch(rq.result);}catch(e){}});}catch(e){}return rq;};
/* while a refused request's error event goes through its transaction, transaction.error is the request's error; the
   connection is the last on the event's way, and there it is the engine's own again */
function cause(t,d){try{var seen=null,v=ERRGET?null:t.error;
    t.addEventListener("error",function(ev){var x=ev&&ev.target;if(x&&x!==t&&x.error)seen=x.error;},true);
    CLEAR.set(t,function(){seen=null;});
    if(!DONE.has(d)){DONE.add(d);d.addEventListener("error",function(ev){var x=ev&&ev.target,tt=x&&(x.transaction||(x.objectStore?null:x)),f=tt&&CLEAR.get(tt);if(f)f();});}
    Object.defineProperty(t,"error",{configurable:true,enumerable:true,get:function(){var e=ERRGET?ERRGET.call(t):v;return e||seen||null;},set:function(x){if(!ERRGET)v=x;}});}catch(e){}}
DP.transaction=function(){if(CLOSED.has(this)){var f=live(this);if(f!==this&&!CLOSED.has(f))return f.transaction.apply(f,arguments);}
  else if(!WATCHED.has(this))watch(this);
  var t=tx0.apply(this,arguments);cause(t,this);return t;};
/* what the wrappers before these said of themselves (modules/r142.js marks its own) is said of these too */
[[FP.open,open0],[DP.transaction,tx0]].forEach(function(x){Object.keys(x[1]).forEach(function(k){try{x[0][k]=x[1][k];}catch(e){}});});
/* the model store was opened before this part ran */
try{if(W.idbReady&&typeof W.idbReady.then==="function")W.idbReady.then(function(d){if(d)watch(d);},function(){});}catch(e){}
W.IngStoresShared={watch:watch,closed:function(d){return CLOSED.has(d);},live:live};
})();
;try{window.__ingParts["p102"]="running";}catch(_){}
</script>
