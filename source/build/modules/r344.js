<style id="r344-css">
/* ============ R344 · SIGN OUT (Ingenium 7.54, 20 November 2026) ============
   Approved on its eight pictures (source/previews/sign_out), the same day: "I do approve of the other screenshots of the previews, please
   commit and push it everywhere and continue working on my requests", the fourth fixed first at her word ("There is something wrong with
   this screenshot, please fix it"): the sign-in's card no longer shows behind Who is using Ingenium, and the Signed out line is in ink.
   Her words (20 November 2026): "I want to be able to log out of Ingenium and not only be able to login. I want to be able to sign out of
   my profile and out of the app and have my data and chats and evrything else sealed until I login again into Igenium. Please make the
   fix and continue working on my requests."
   - Sign out: in the Status panel, after Lock Ingenium (a row of the panel's own kind); in Settings, Security, Sealed on this device, and in
     the sign-in's own card (Settings, Your data), beside Lock now (a key of each card's own kind). It saves, seals and drops the keys as
     Lock now does (modules/r197.js), and also leaves the profile: Ingenium starts again at Who is using Ingenium (r331's door), headed
     Signed out. Choosing her own profile there shows her sign-in; choosing another opens that one as it opens.
   - Without a sign-in nothing can be sealed, so Sign out says so and offers to turn the sign-in on first; it never pretends.
   - Everything else sealed, as she asked: the lock already sealed the desk, the long texts, the conversations brought in, the keys, the app
     library, Fabrica and its packages; it left plain the documents of the apps carried on the Desk (Tabula, Abacus, Imago, Scriba,
     Fontes: their own keys in this page's store, such as tabula_docs, abacus_book_v1, scriba_words_v1, fontes_sources, cd_signatures_v1)
     and Scriba's recordings (its database scriba_db). Now, when Ingenium locks or she signs out, they are sealed with the same key
     (AES-GCM, as the desk), and opened again when she signs in, before the door opens, so no app ever reads them sealed. The documents'
     keys are sealed too when the page closes; a recording only when Ingenium locks or she signs out (its database cannot be written
     while a page closes). In her own profile only (the Desk's apps are hers alone, 7.52). A key that cannot be opened is kept aside under
     ing_carried_sealed:<its name>, never lost, and the app starts without it.
   window.IngSignOut: go(), signedOut(), _seal(), _open() */
#secCard .sc-key.r344-out,#ingLockCard .r344-out{margin-left:8px}
.r344-door-out{margin:0 0 4px;font:600 13px/1.4 inherit;letter-spacing:.02em;color:var(--p3-ink2,#4a4358);text-align:center}   /* words, not a key: in ink, never violet */
/* while Who is using Ingenium stands over it, the sign-in's own card waits out of sight (it shows again when her own profile is chosen) */
#ingLockDoor.r344-under .ild-card{visibility:hidden}
/* by night: while Ingenium is sealed, the page's own look is sealed with it, and only the sign-in door knows it is night (modules/r197.js
   reads it from the desk's plain header). Who is using Ingenium over that door, and its "Someone else? Choose a profile" key on the
   sign-in's card, take the night colours the profiles part (r331) gives the page by night, the same values, so a night door never holds
   a day card. Found on the preview's eighth picture, taken as she would come to it: signed in, Night chosen, signed out. */
#ingLockDoor.ild-night,#profDoor.r344-night{--p3-card:#201a2b;--p3-ink1:#f6f1fd;--p3-ink2:#d3c9e3;--p3-ink3:#a99cc1;--p3-acc:#b79ce6;--p3-line:rgba(205,184,240,.11);--p3-well:#1c1626;--p3-rail:#171221;
  --p3-slot:rgba(0,0,0,.28);--p3-slot-sh:inset 0 2px 3px rgba(0,0,0,.55),inset 0 0 0 1px rgba(0,0,0,.25),0 1px 0 rgba(255,255,255,.05);
  --p3-card-sh:0 1px 0 rgba(0,0,0,.4),0 2px 6px rgba(0,0,0,.3),0 12px 30px rgba(0,0,0,.34);--p3-card-hi:0 2px 0 rgba(0,0,0,.45),0 10px 20px rgba(0,0,0,.42),0 20px 40px rgba(0,0,0,.4);
  --p3-key-bg:linear-gradient(#2a2239,#251e33);--p3-key-sh:inset 0 1px 0 rgba(255,255,255,.07),inset 0 -2px 0 rgba(0,0,0,.45),0 2px 0 rgba(0,0,0,.75),0 4px 5px rgba(0,0,0,.5);
  --p3-key-hi:inset 0 1px 0 rgba(255,255,255,.1),inset 0 -2px 0 rgba(0,0,0,.4),0 3px 0 rgba(0,0,0,.7),0 7px 10px rgba(0,0,0,.5);
  --p3-pri-bg:linear-gradient(#7a56c8,#5b3aa1);--p3-pri-line:#2c1956;--p3-pri-sh:inset 0 1px 0 rgba(255,255,255,.14),0 1px 0 #170b30,0 3px 6px rgba(0,0,0,.45);
  --p3-lav-t:rgba(183,156,230,.15);--p3-lav-c:#b79ce6;--p3-emr-t:rgba(64,192,128,.15);--p3-emr-c:#6fd8a2;--p3-red-c:#f0939c;--p3-dim:.8}
</style>
<script>try{(window.__ingParts=window.__ingParts||{})["p344"]="started";}catch(_){}
(function r344(){"use strict";
var W=window,D=document;if(W.IngSignOut)return;
function L(){return W.IngLock||null;}
function warn(e){try{console.warn("r344",e&&e.message||e);}catch(_){}}
function toast(m){try{if(typeof W.ingToast==="function")W.ingToast(m);}catch(e){}}
function active(){try{return !!(L()&&L().active());}catch(e){return false;}}
function held(){try{return !!(L()&&L().active()&&!L().locked());}catch(e){return false;}}
function mine(){return !W.__ingGuest;}
function X(){return W.__ingProfiles||null;}
function reg(){try{var r=X()&&X().reg();return r&&typeof r==="object"?r:null;}catch(e){return null;}}
function setOut(v){var x=X(),r=reg();if(!x||!r)return false;if(v)r.out=Date.now();else delete r.out;return x.save(r);}
function signedOut(){var r=reg();return !!(r&&r.out);}

/* ---------- the carried apps' documents: their own keys in this page's store ---------- */
var CARRIED=/^(tabula_|abacus_|scriba_|fontes_|carpe_|cd_)/,ENV=/^ING1\./;
function lsKeys(){var out=[];try{for(var i=0;i<localStorage.length;i++){var k=localStorage.key(i);if(k&&CARRIED.test(k))out.push(k);}}catch(e){}return out;}
function sealKeysSync(){if(!mine()||!held())return 0;var n=0;
  lsKeys().forEach(function(k){try{var v=localStorage.getItem(k);if(v==null||ENV.test(v))return;localStorage.setItem(k,L().sealTextSync(v,"carried "+k));n++;}catch(e){warn(e);}});return n;}
function openKeys(){if(!mine()||!held())return Promise.resolve(0);var n=0;
  return Promise.all(lsKeys().map(function(k){var v=null;try{v=localStorage.getItem(k);}catch(e){}if(!v||!ENV.test(v))return null;
    return L().openText(v,"carried "+k).then(function(p){localStorage.setItem(k,p);n++;},function(e){warn(e);
      try{localStorage.setItem("ing_carried_sealed:"+k,v);localStorage.removeItem(k);}catch(x){}});})).then(function(){return n;});}

/* ---------- Scriba's recordings (its database scriba_db, store recordings): sealed whole, each record one envelope ---------- */
function dbThere(name){try{if(indexedDB&&typeof indexedDB.databases==="function")return indexedDB.databases().then(function(l){return (l||[]).some(function(d){return d&&d.name===name;});},function(){return false;});}catch(e){}
  return Promise.resolve(false);}   /* never opened by name otherwise: opening a database that is not there would make an empty one */
function idbOpen(name){return new Promise(function(res,rej){var rq=indexedDB.open(name);rq.onsuccess=function(){res(rq.result);};rq.onerror=function(){rej(rq.error);};});}
function idbAll(db,sn){return new Promise(function(res,rej){var t=db.transaction(sn,"readonly"),rq=t.objectStore(sn).getAll();rq.onsuccess=function(){res(rq.result||[]);};rq.onerror=function(){rej(rq.error);};});}
function idbPut(db,sn,v){return new Promise(function(res,rej){var t=db.transaction(sn,"readwrite");t.objectStore(sn).put(v);t.oncomplete=function(){res();};t.onerror=function(){rej(t.error);};});}
function b64(u8){var s="",i;for(i=0;i<u8.length;i+=32768)s+=String.fromCharCode.apply(null,u8.subarray(i,i+32768));return btoa(s);}
function unb64(t){var s=atob(t),u=new Uint8Array(s.length);for(var i=0;i<s.length;i++)u[i]=s.charCodeAt(i);return u;}
function blobBytes(b){return b&&typeof b.arrayBuffer==="function"?b.arrayBuffer().then(function(a){return new Uint8Array(a);}):Promise.resolve(null);}
function recs(fn){if(!mine()||!held())return Promise.resolve(0);
  return dbThere("scriba_db").then(function(there){if(!there)return 0;return idbOpen("scriba_db").then(function(db){
    if(!db.objectStoreNames.contains("recordings")){db.close();return 0;}
    return idbAll(db,"recordings").then(function(all){var n=0;return all.reduce(function(p,r){return p.then(function(){return fn(db,r).then(function(ch){if(ch)n++;});});},Promise.resolve())
      .then(function(){db.close();return n;},function(e){db.close();throw e;});});});});}
function sealRecs(){return recs(function(db,r){if(!r||r.__ing==="sealed"||r.id==null)return Promise.resolve(false);
  var meta={},k;for(k in r)if(k!=="blob")meta[k]=r[k];
  return blobBytes(r.blob).then(function(bytes){var body=JSON.stringify({meta:meta,type:r.blob&&r.blob.type||"",bytes:bytes?b64(bytes):null});
    return L().sealText(body,"scriba recording "+r.id).then(function(env){return idbPut(db,"recordings",{id:r.id,__ing:"sealed",env:env}).then(function(){return true;});});});});}
function openRecs(){return recs(function(db,r){if(!r||r.__ing!=="sealed")return Promise.resolve(false);
  return L().openText(r.env,"scriba recording "+r.id).then(function(t){var o=JSON.parse(t),v=o.meta||{};v.id=r.id;
    if(o.bytes!=null)v.blob=new Blob([unb64(o.bytes)],{type:o.type||""});return idbPut(db,"recordings",v).then(function(){return true;});},function(e){warn(e);return false;});});}

/* ---------- what the lock calls (modules/r197.js, 7.54): before the keys go, and after a sign-in before the door opens ---------- */
W.__ingBeforeLock=function(){var n=sealKeysSync();return sealRecs().then(function(m){return n+m;},function(e){warn(e);return n;});};
W.__ingAfterOpen=function(){return openKeys().then(function(){return openRecs();}).then(null,warn).then(function(){if(signedOut())setOut(false);});};
W.addEventListener("pagehide",function(){try{sealKeysSync();}catch(e){}});

/* ---------- Sign out ---------- */
function ask(o){try{if(typeof W.ingAsk==="function")return Promise.resolve(W.ingAsk(o));}catch(e){}return Promise.resolve(W.confirm(o.text));}
function go(){
  if(!active()){
    return ask({title:"Sign out needs your sign-in",text:"Signing out seals everything of yours with your password, so that nothing can be read until you sign in again. Your sign-in is off, so nothing can be sealed yet. Turn it on first: a name and a password, and ten recovery words.",yes:"Turn on my sign-in",no:"Not now"})
      .then(function(ok){if(ok)try{L()&&L().setup({});}catch(e){warn(e);}return false;});}
  if(!setOut(true)){toast("This browser's store refused the change, so Ingenium could not sign out.");return Promise.resolve(false);}
  return Promise.resolve(L().lockNow("signout")).then(function(done){if(!done)setOut(false);return done;},function(e){setOut(false);warn(e);return false;});}

/* the Status panel: Sign out after Lock Ingenium, a row of the panel's own kind (as r338's) */
function dress(menu){if(!menu||menu.querySelector("#r344Out"))return;var lk=menu.querySelector("#r338Lock");if(!lk)return;
  var b=D.createElement("button");b.type="button";b.id="r344Out";b.className=lk.className;var nm=D.createElement("span");nm.className="pres-name";nm.textContent="Sign out";b.appendChild(nm);
  b.onclick=function(){try{W.closePresenceMenu();}catch(e){}go();};lk.parentNode.insertBefore(b,lk.nextSibling);}
var o=W.openPresenceMenu;
if(typeof o==="function"&&!o.__r344){W.openPresenceMenu=function(){var r=o.apply(this,arguments);try{dress(D.querySelector(".pres-menu"));}catch(e){}return r;};W.openPresenceMenu.__r344=1;}

/* Settings: beside Lock now, in Security's room and in the sign-in's own card, a key of the card's own kind */
function keys(){
  [].forEach.call(D.querySelectorAll('#secCard [data-a="lock"]'),function(k){if(k.parentNode.querySelector(".r344-out"))return;
    var b=D.createElement("button");b.type="button";b.className=k.className.replace(/\bpri\b/,"").trim()+" r344-out";b.textContent="Sign out";
    b.addEventListener("click",function(e){e.preventDefault();e.stopPropagation();go();});k.parentNode.insertBefore(b,k.nextSibling);});
  var lc=D.getElementById("ingLockCard");if(lc&&!lc.querySelector(".r344-out")){var ln=[].filter.call(lc.querySelectorAll("button"),function(x){return x.textContent.trim()==="Lock now";})[0];
    if(ln){var c=D.createElement("button");c.type="button";c.className=ln.className.replace(/\bpri\b/,"").trim()+" r344-out";c.textContent="Sign out";
      c.addEventListener("click",function(e){e.preventDefault();go();});ln.parentNode.insertBefore(c,ln.nextSibling);}}}
var KT=0;   /* at most twice a second, whatever the page changes */
try{new MutationObserver(function(){if(KT)return;KT=setTimeout(function(){KT=0;try{keys();}catch(e){warn(e);}},500);}).observe(D.body,{childList:true,subtree:true});}catch(e){}

/* after Sign out: the page starts at Who is using Ingenium, headed Signed out */
function door(){if(!signedOut()||!W.IngProfiles||typeof IngProfiles.door!=="function")return;
  IngProfiles.door();var d=D.getElementById("profDoor");if(!d)return;var box=d.querySelector(".r331-door");under(true);dark();
  if(box&&!box.querySelector(".r344-door-out")){var p=D.createElement("p");p.className="r344-door-out";p.textContent="Signed out. Everything is sealed until its profile signs in again.";box.insertBefore(p,box.firstChild);}
  if(!d.__r344){d.__r344=1;d.addEventListener("click",function(e){var b=e.target.closest&&e.target.closest("button[data-door]");if(!b)return;
    var me=(W.__ingProfile&&W.__ingProfile.owner===false)?W.__ingProfile.id:"owner";setOut(false);
    if(b.getAttribute("data-door")===me){e.stopPropagation();e.preventDefault();d.hidden=true;}under(false);},true);}}
function under(on){var l=D.getElementById("ingLockDoor");if(l){l.classList.toggle("r344-under",!!on);l.classList.remove("ild-wait");}}   /* r197's wait ends here */
/* the profiles door takes the sign-in door's night look while that door stands (after Sign out, or from "Someone else? Choose a profile") */
function dark(){var l=D.getElementById("ingLockDoor"),d=D.getElementById("profDoor");
  if(l&&!l.__r344w){l.__r344w=1;try{new MutationObserver(dark).observe(l,{attributes:true,attributeFilter:["class","hidden"]});}catch(e){}}   /* the door may learn it is night after */
  if(d)d.classList.toggle("r344-night",!!(l&&!l.hidden&&l.classList.contains("ild-night")));}
D.addEventListener("click",function(){try{dark();}catch(e){}});
W.addEventListener("ing-keys",function(e){if(e&&e.detail&&e.detail.held&&signedOut())setOut(false);});
(function wait(){var n=0;(function t(){if(W.IngProfiles&&D.body){setTimeout(door,300);return;}if(++n<200)setTimeout(t,100);})();})();
W.IngSignOut={go:go,signedOut:signedOut,_seal:function(){return W.__ingBeforeLock();},_open:function(){return W.__ingAfterOpen();}};
})();
;try{window.__ingParts["p344"]="running";}catch(_){}
</script>
