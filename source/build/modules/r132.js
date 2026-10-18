<script>try{(window.__ingParts=window.__ingParts||{})["p56"]="started";}catch(_){}
/* R132 · ROOM TO GROW
   The owner's words (18 October 2026): "I want for the local storage limits for all of my apps to be expanded please."
   What held Ingenium back on a device: the desk (chats, notes, projects, settings) is one record in this view's small
   store, localStorage, which browsers keep to about 5 MB for a whole site, and the apps Ingenium opens in its own frames
   share that room. Texts over 64 KB already went to the larger store (R81, IngBig), and the computer, Fire and iPhone
   apps keep the desk on disk as well (R61); a plain browser had nothing past the 5 MB.
   1. A desk the small store refuses is kept in this device's larger store (IndexedDB), whose room the browser sets as a
      share of the device's free disk, not a fixed 5 MB. On the next start, a desk kept there that the small store does
      not hold is the one that opens. When the small store takes the desk again, the copy in the larger store goes.
   2. The browser is asked to keep Ingenium's stores (persistent storage), so it does not clear them when the disk runs
      short. Chromium and Safari decide without asking anyone; Firefox asks the person, so there it is asked only from
      Settings.
   3. Settings, Data on this device, says how much room Ingenium uses, how much the browser offers it, where the desk is
      kept, and whether the browser has agreed to keep it.
   4. Larger caps (with the edits in build_page.py): a page's own store 256 MB (was 16 MB); the steps back the code keeps
      600 MB a file and up to 200 steps (were 150 MB and 80); a project's or a personal AI's file 1,000,000 characters
      (was 200,000). */
FILE_MAX_CHARS=1000000;
(function(){
  var DBN="ingenium_desk",ST="d",REC="desk",dbp=null;
  function db(){if(dbp)return dbp;
    dbp=new Promise(function(res,rej){try{var rq=indexedDB.open(DBN,1);
      rq.onupgradeneeded=function(){try{rq.result.createObjectStore(ST);}catch(e){}};
      rq.onsuccess=function(){res(rq.result);};rq.onerror=function(){rej(rq.error);};rq.onblocked=function(){rej(new Error("blocked"));};}catch(e){rej(e);}});
    dbp.catch(function(){dbp=null;});return dbp;}
  function put(v){return db().then(function(d){return new Promise(function(res,rej){var t=d.transaction(ST,"readwrite");t.objectStore(ST).put(v,REC);
    t.oncomplete=function(){res(true);};t.onerror=t.onabort=function(){rej(t.error||new Error("refused"));};});});}
  function get(){return db().then(function(d){return new Promise(function(res){var t=d.transaction(ST,"readonly"),r=t.objectStore(ST).get(REC);
    r.onsuccess=function(){res(r.result||null);};r.onerror=function(){res(null);};});}).catch(function(){return null;});}
  function onDisk(){var a=(typeof shellApi==="function")?shellApi():null;return !!(a&&typeof a.save_state==="function");}
  function appShell(){try{return !!window.pywebview;}catch(e){return false;}}
  function firefox(){return /Firefox\//.test(navigator.userAgent||"");}

  /* ---------- 1. the desk the small store refuses ---------- */
  var checked=false,early=null,pend=null,timer=null,recOk=null,inBig=false,said=false,origFull=ingStoreFull;
  /* the old notice ("may not be kept after a reload") is given only if the larger store refuses as well */
  ingStoreFull=function(){if(!window.indexedDB)origFull();};
  function write(raw,ok){var v=ok?{lsOk:true,raw:null,at:Date.now()}:{lsOk:false,raw:raw,at:Date.now(),n:raw.length};
    return put(v).then(function(){recOk=ok;inBig=!ok;
        if(!ok&&!said){said=true;persist(false);
          setTimeout(function(){try{ingToast("This browser's small store (about 5 MB) is full, so your desk is now kept in this device's larger store"+(onDisk()?", and in the app's copy on disk":"")+". Nothing is lost.");}catch(e){}},0);}
        paintSoon();},
      function(){if(!ok)origFull();});}
  function flush(){if(timer){clearTimeout(timer);timer=null;}if(!pend)return;var p=pend;pend=null;write(p.raw,p.ok);}
  window.__deskOverflow=function(raw,ok){
    if(!checked){early={raw:raw,ok:ok};return;}
    if(ok&&recOk!==false)return;           /* the small store holds it, as before: nothing to do */
    pend={raw:raw,ok:ok};if(timer)clearTimeout(timer);timer=setTimeout(flush,ok?0:250);};
  window.addEventListener("pagehide",flush);
  document.addEventListener("visibilitychange",function(){if(document.hidden)flush();});
  function adopt(raw){var incoming;try{incoming=JSON.parse(raw);}catch(e){return false;}
    var migrated=migrateFrom(incoming);
    for(var k in state)delete state[k];
    for(var k2 in migrated)state[k2]=migrated[k2];
    try{repaintDesk();}catch(e){try{saveState();}catch(_){}}
    setTimeout(function(){try{ingToast("Your newest desk came back from this device's larger store.");}catch(e){}},0);
    return true;}
  function boot(){get().then(function(rec){
      var lsRaw=null;try{lsRaw=HAS_LS?localStorage.getItem(KEY):null;}catch(e){}
      recOk=rec?rec.lsOk!==false:null;inBig=!!(rec&&rec.lsOk===false);
      var take=!!(rec&&rec.lsOk===false&&typeof rec.raw==="string"&&rec.raw.length>60&&rec.raw!==lsRaw&&!/[#&]ingapp=/.test(location.hash||""));
      /* the computer, Fire and iPhone apps keep the desk on disk without a cap, and that copy is the one they open (R61, R96) */
      if(take&&appShell())take=false;
      checked=true;
      if(take){early=null;adopt(rec.raw);}
      else if(early){var e=early;early=null;window.__deskOverflow(e.raw,e.ok);}
      paintSoon();});}
  if(window.indexedDB)boot();else checked=true;

  /* ---------- 2. asking the browser to keep Ingenium's stores ---------- */
  var kept=null;
  function persisted(){try{if(navigator.storage&&navigator.storage.persisted)return navigator.storage.persisted().then(function(p){kept=!!p;return kept;},function(){return null;});}catch(e){}return Promise.resolve(null);}
  function persist(asked){try{if(!navigator.storage||!navigator.storage.persist)return Promise.resolve(null);
      if(!asked&&firefox())return persisted();
      return persisted().then(function(p){return p?true:navigator.storage.persist();}).then(function(p){kept=!!p;paintSoon();return kept;},function(){return null;});}catch(e){return Promise.resolve(null);}}
  setTimeout(function(){persist(false);},1500);

  /* ---------- 3. Settings: the room on this device ---------- */
  function MB(n){return (typeof fmtBytes==="function")?fmtBytes(n):(Math.round(n/1048576)+" MB");}
  function card(){var ex=document.getElementById("exportApp");if(!ex)return null;var row=ex.parentNode,box=document.getElementById("r132Room");
    if(box)return box;box=document.createElement("div");box.id="r132Room";
    box.innerHTML='<div class="r132-bar" aria-hidden="true"><i id="r132Fill"></i></div><p class="small" id="r132Sum">Measuring the room on this device…</p>'
      +'<button type="button" class="btn small ghost" id="r132Keep">Ask the browser to keep Ingenium\'s data</button>';
    row.parentNode.insertBefore(box,row);
    document.getElementById("r132Keep").onclick=function(){persist(true).then(function(p){
      ingToast(p?"The browser has agreed to keep Ingenium's data on this device.":(p===false?"The browser did not agree this time. Chromium browsers agree more readily for a page that is installed or often used. Your data is still kept; only when the disk runs very short may the browser clear it.":"This browser does not take that request."));});};
    return box;}
  var paintT=null;function paintSoon(){clearTimeout(paintT);paintT=setTimeout(paint,120);}
  function paint(){var box=card();if(!box)return;
    var est=(navigator.storage&&navigator.storage.estimate)?navigator.storage.estimate().catch(function(){return {};}):Promise.resolve({});
    Promise.all([est,persisted()]).then(function(r){var e=r[0]||{},u=e.usage||0,q=e.quota||0;
      var t=q?("Ingenium uses "+MB(u)+" here; the browser offers it about "+MB(q)+" on this device."):"This browser does not say how much room it offers.";
      t+=inBig?" Your desk is kept in the larger store, because the small store (about 5 MB) is full.":" Your desk is in the small store, with its long texts in the larger one.";
      if(onDisk())t+=" This app keeps a copy of the desk on disk as well.";
      t+=kept?" The browser has agreed to keep it all: it will not clear Ingenium's data to make room.":(kept===false?" The browser may clear it if the disk runs short; the key below asks it not to.":"");
      var s=document.getElementById("r132Sum");if(s)s.textContent=t;
      var f=document.getElementById("r132Fill");if(f)f.style.width=(q?Math.max(1,Math.min(100,Math.round(u/q*100))):0)+"%";
      var k=document.getElementById("r132Keep");if(k)k.hidden=!!kept;});}
  try{var og=go;go=function(p){var r=og.apply(this,arguments);if(p==="settings")paintSoon();return r;};window.go=go;}catch(e){}
  setTimeout(paintSoon,800);
  window.__r132={get:get,recOk:function(){return recOk;},checked:function(){return checked;},inBig:function(){return inBig;},paint:paint};
  /* the tour: the data card says the desk has room to grow (5.5, R132) */
  try{if(typeof ING_TOUR!=="undefined"&&Array.isArray(ING_TOUR))ING_TOUR.forEach(function(c){if(c&&c.chap==="Settings"&&c.sub==="Your data"&&typeof c.b==="string"&&c.b.indexOf("larger store")<0)
    c.b+=" When the browser's small store is full, your desk is kept in its larger store, and Data on this device shows how much room Ingenium uses and has.";});}catch(e){}
})();
;try{window.__ingParts["p56"]="running";}catch(_){}
</script>
<style id="r132-css">
#r132Room{margin:2px 0 12px}
#r132Room .r132-bar{height:8px;border-radius:6px;background:var(--hairline-soft,rgba(0,0,0,.07));box-shadow:inset 0 1px 2px rgba(40,20,70,.14);overflow:hidden;margin:2px 0 8px}
#r132Room .r132-bar i{display:block;height:100%;width:0;border-radius:6px;background:var(--accent,#6d4bc3);transition:width .6s ease}
#r132Room p{margin:0 0 8px;line-height:1.5}
@media (prefers-reduced-motion:reduce){#r132Room .r132-bar i{transition:none}}
</style>
