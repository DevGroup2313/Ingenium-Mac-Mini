<script>try{(window.__ingParts=window.__ingParts||{})["p358"]="started";}catch(_){}
/* ============ R358 · EVERY APP OPENS IN THE PREVIEW (Ingenium 7.69, 22 November 2026) ============
   Her words (22 November 2026): "I have never been able to open and view the Lakay app in the Live Preview panel inside of Ingenium,
   it stays stuck on the Introduction door and does not even show the buttons to enter in the practice store or anywhere else. How can
   I make edits and continue working on Lakay inside of Ingenium when I can't even see the app on the Live Preview panel? Please make
   the fix because this is a real issue. ... please properly trace the cause of this issue and fix it at the root for all of the apps
   inside of Ingenium both present and future apps that I make and any other user makes so that every app actually open inside of the
   Live Preview panel and is interactive and easy to navigate and use".
   The cause (traced in stagekit/kit.js): a page in the preview runs in a sandboxed frame with no origin of its own, so it can never
   reach Ingenium's stores, and there the browser refuses it every store of its own. Ingenium stood in for its local storage (R82),
   not for its database (IndexedDB), where Lakay keeps its books; nor for its cookies, its cache of files, its service worker, its
   storage manager or its locks. And a link to a part of the page loaded Ingenium inside the frame, and a file it saved went nowhere.
   Now:
   - the stage kit (stagekit/stage_kit.min.js: kit.js with fake-indexeddb 6.2.8, Apache-2.0) goes first into every page Ingenium
     runs in a sandboxed frame: the preview beside Chat and Code (a large page too, given as a file of its own), Build's preview, a
     page opened in a window of its own, Fabrica's quiet windows for a test and a check, and the Workshop's pages of hers;
   - in the preview beside Chat and Code, what the page keeps in its database and its cookies is kept for it on this device, in the
     place r179 keys by where the page comes from (so every edit and new version of an app keeps it): its text sealed with the rest of
     her work (a long text, IngBig, named in state.stageKits), and the keys it made, which no page can read as bytes, kept as the
     browser keeps keys (IndexedDB ingenium_stage_keys, this profile's own); handed back each time the page runs, before it opens
     anything; asked for before the page runs again, so nothing it just wrote is lost;
   - a file the page saves (a backup, an export) is saved as Ingenium saves its own: the computer's save dialog, or a download.
   The page never reaches Ingenium's own stores: it hands over data, and gets back only what it handed over.
   Approved on its pictures (previews/stage_preview: Lakay before, and its door, its practice store, in the preview now): "I approve of
   the previews ... please commit and push them everywhere and continue working on my requests." */
(function(){"use strict";
var W=window,KIT=/*ING_STAGE_KIT*/"";
if(!KIT)return;
function esc(o){return JSON.stringify(o).replace(/</g,"\\u003c").replace(/\u2028/g,"\\u2028").replace(/\u2029/g,"\\u2029");}
/* the kit as a page receives it: what it may do, the cookies it kept, then the kit; and, first after the doctype, the page's charset
   (a page given as a file of its own is read as UTF-8 only if that is said within its first kilobyte) */
var META='<meta charset="utf-8">';
function tag(opts,cookie){opts=opts||{};
  return '<scr'+'ipt>window.__ING_KIT_OPTS='+esc({persist:opts.persist?1:0,relay:opts.relay?1:0})
    +';window.__ING_STAGE_KIT_SEED='+esc({cookie:typeof cookie==="string"?cookie:""})+';<\/scr'+'ipt><scr'+'ipt>'+KIT+'<\/scr'+'ipt>';}
function first(doc,t){var m=/^(\ufeff?\s*<!doctype[^>]*>)/i.exec(doc);return m?m[1]+t+doc.slice(m[1].length):t+doc;}
function wrap(html,opts,cookie){return first(String(html==null?"":html),META+tag(opts,cookie));}

/* ---------- 1. what a page in the stage keeps: kept for it, sealed, and handed back ---------- */
var KEYDB="ingenium_stage_keys",kdbp=null;
function keyDb(){if(kdbp)return kdbp;
  kdbp=new Promise(function(res,rej){try{var rq=indexedDB.open(KEYDB,1);rq.onupgradeneeded=function(){try{rq.result.createObjectStore("k");}catch(e){}};
    rq.onsuccess=function(){res(rq.result);};rq.onerror=function(){rej(rq.error);};}catch(e){rej(e);}});
  kdbp.catch(function(){});return kdbp;}
function keyTx(mode,fn){return keyDb().then(function(d){return new Promise(function(res,rej){var t=d.transaction("k",mode),r=fn(t.objectStore("k"));
    t.oncomplete=function(){res(r?r.result:undefined);};t.onerror=function(){rej(t.error);};t.onabort=function(){rej(t.error);};});});}
var KITS={},CAP=64*1024*1024;   /* each page's kept things, by its store key: {idb:{name:text}, keys:{name:{n:CryptoKey}}, cookie, t, ...} */
function stores(){state.stageKits=state.stageKits||{};return state.stageKits;}
var LOADP={};   /* a store being read: every message for it waits on the same read, so they are taken in the order they came */
function load(key){if(KITS[key])return Promise.resolve(KITS[key]);if(LOADP[key])return LOADP[key];
  var k={idb:{},keys:{},cookie:"",t:0,said:0},id=stores()[key];
  var p1=id?IngBig.load(id).then(function(t){try{var o=JSON.parse(t||"{}");if(o&&typeof o==="object"){
      if(o.idb&&typeof o.idb==="object")Object.keys(o.idb).forEach(function(n){if(typeof o.idb[n]==="string")k.idb[n]=o.idb[n];});
      if(typeof o.cookie==="string")k.cookie=o.cookie;}}catch(e){}},function(){}):Promise.resolve();
  var p2=keyTx("readonly",function(s){return s.get(key);}).then(function(v){if(v&&typeof v==="object")k.keys=v;},function(){});
  LOADP[key]=Promise.all([p1,p2]).then(function(){if(!KITS[key])KITS[key]=k;delete LOADP[key];return KITS[key];});return LOADP[key];}
function withKit(key,fn){if(KITS[key])fn(KITS[key]);else load(key).then(fn);}
function save(key){var k=KITS[key];if(!k)return;clearTimeout(k.t);
  k.t=setTimeout(function(){var txt;try{txt=JSON.stringify({v:1,idb:k.idb,cookie:k.cookie});}catch(e){return;}
    if(txt.length>CAP){if(!k.said){k.said=1;say("Ingenium keeps up to 64 MB of what a page stores in its database; this page has stored more, so its newest changes are kept only while it is open.");}return;}
    var S=stores(),id=S[key];if(!id){id=IngBig.newId();S[key]=id;try{saveState();}catch(e){}}
    IngBig.put(id,txt);
    var ks={};Object.keys(k.idb).forEach(function(n){if(k.keys[n]&&Object.keys(k.keys[n]).length)ks[n]=k.keys[n];});
    keyTx("readwrite",function(s){return Object.keys(ks).length?s.put(ks,key):s.delete(key);}).catch(function(){});},700);}
function say(t){try{if(typeof csPush==="function")csPush("warn",t);}catch(e){}}
/* the frame now in the stage, and what it has not yet handed over */
function stageWin(){var f=document.getElementById("csFrame");return f?f.contentWindow:null;}
var PEND={win:null,dirty:false,wait:[]};
function settled(){var w=PEND.wait;PEND.wait=[];PEND.dirty=false;w.forEach(function(f){try{f();}catch(e){}});}
/* before the stage runs a page again, the page there hands over what it has not yet (at most a second's wait) */
function drained(){var w=stageWin();if(!w||PEND.win!==w||!PEND.dirty)return Promise.resolve();
  return new Promise(function(res){var done=false,fin=function(){if(!done){done=true;res();}};PEND.wait.push(fin);setTimeout(fin,1000);
    try{w.postMessage({__ingKit:1,op:"flush"},"*");}catch(e){fin();}});}
if(typeof W.csStoreLoad==="function"){var oLoad=W.csStoreLoad;
  W.csStoreLoad=csStoreLoad=function(key){var p0=oLoad.apply(this,arguments);   /* r179 pairs this call with the key just asked for */
    return Promise.all([p0,drained().then(function(){return load(key);})]).then(function(r){
      var seed=r[0]&&typeof r[0]==="object"?r[0]:{};
      try{Object.defineProperty(seed,"__kit",{value:{key:key,cookie:r[1].cookie},enumerable:false,configurable:true});}catch(e){}
      return seed;});};}
if(typeof W.ingStageDoc==="function"){var oDoc=W.ingStageDoc;
  W.ingStageDoc=ingStageDoc=function(html,seed){var doc=oDoc.apply(this,arguments),kit=seed&&seed.__kit;
    var t=tag({persist:!!kit,relay:1},kit?kit.cookie:""),shim=typeof W.ING_STAGE_SHIM==="string"?W.ING_STAGE_SHIM:"",i=shim?doc.indexOf(shim):-1;
    if(i>=0&&i<4000000)return first(doc.slice(0,i+shim.length)+t+doc.slice(i+shim.length),META);
    return first(doc,META+t);};}

/* ---------- 2. what the kit says: only from the frame in the stage, and only for the page Ingenium put there ---------- */
var SAVED=0,FKEY=null;   /* the store of the page now in the stage's frame, fixed when it says hello: what it hands over as it is
   taken away (the preview cleared, another page shown) still reaches its own store */
function ours(src){if(!src)return null;var ids=["csFrame","previewFrame"];for(var i=0;i<ids.length;i++){var f=document.getElementById(ids[i]);if(f&&f.contentWindow===src)return ids[i];}return null;}
W.addEventListener("message",function(e){var d=e.data;if(!d||typeof d!=="object")return;
  if(d.__ingSave===1){var who=ours(e.source);if(!who)return;
    var now=Date.now();if(now-SAVED<1200)return;SAVED=now;
    var name=String(d.name||"download").replace(/[\\\/:*?"<>|\u0000-\u001f]+/g,"-").slice(0,120)||"download",type=String(d.type||"application/octet-stream").slice(0,120);
    if(!(d.bytes instanceof ArrayBuffer)||d.bytes.byteLength>512*1024*1024)return;
    try{saveFileNative(name,type,new Blob([d.bytes],{type:type}));}catch(x){}
    return;}
  if(d.__ingKit!==1||ours(e.source)!=="csFrame")return;
  var src=e.source;
  if(d.op==="hello"){var cur=W.csStoreCur,hk=cur&&cur.data&&cur.data.__kit?cur.data.__kit.key:(cur?cur.key:null);FKEY=hk||null;
    if(!hk){try{src.postMessage({__ingKit:1,op:"seed",none:1},"*");}catch(x){}return;}   /* nowhere to keep it: the page keeps its things while it is open */
    PEND.win=src;PEND.dirty=false;
    load(hk).then(function(k){if(stageWin()!==src||FKEY!==hk)return;try{src.postMessage({__ingKit:1,op:"seed",idb:k.idb,keys:k.keys},"*");}catch(x){}});return;}
  var key=FKEY;if(!key)return;
  if(d.op==="dirty"){PEND.win=src;PEND.dirty=true;return;}
  if(d.op==="clean"){if(PEND.win===src)settled();return;}
  if(d.op==="big"){say("A database this page keeps (“"+String(d.name).slice(0,60)+"”) has grown past 64 MB, so its newest changes are kept only while it is open.");return;}
  withKit(key,function(k){var n=typeof d.name==="string"?d.name.slice(0,200):"";
    if(d.op==="db"&&n&&typeof d.text==="string"&&d.text.length<=CAP){k.idb[n]=d.text;
      var ks={};if(d.keys&&typeof d.keys==="object")Object.keys(d.keys).forEach(function(i){var v=d.keys[i];if(v&&Object.prototype.toString.call(v)==="[object CryptoKey]")ks[i]=v;});
      k.keys[n]=ks;save(key);}
    else if(d.op==="drop"&&n){delete k.idb[n];delete k.keys[n];save(key);}
    else if(d.op==="cookie"&&typeof d.text==="string"&&d.text.length<=1024*1024){k.cookie=d.text;save(key);}});});

/* ---------- 3. the other frames where Ingenium runs a page: the kit, with nothing kept beyond the window ---------- */
/* a page opened in a window of its own (the shared opener, thoughts/open_apart.html, whose frame may download as it is) */
if(typeof W.ingOpenApart==="function"&&!W.ingOpenApart.__kit){var oApart=W.ingOpenApart;
  W.ingOpenApart=function(html,title){return oApart.call(this,wrap(html,{},""),title);};W.ingOpenApart.__kit=1;}
W.IngStageKit={wrap:function(html,opts){return wrap(html,opts||{},"");},tag:function(opts){return tag(opts||{},"");},size:KIT.length,
  kept:function(key){return KITS[key]?{dbs:Object.keys(KITS[key].idb),cookie:!!KITS[key].cookie}:null;}};
})();
;try{window.__ingParts["p358"]="running";}catch(_){}
</script>
