/* R331 (Ingenium 7.44): local profiles, the first thing in the page. Her words (14 to 19 November 2026), on her recommendation approved:
   a profile key beside the seal; the owner decides for each profile whether it needs a password (hers always, while the sign-in is on);
   kept apart for each person: conversations and memory, folders and the folder search, Lector and Vocatio records and Folders' notes,
   Display and sounds, connections and their keys; shared: the models. And: "I approve of the preview ... Just add it to the damn app".
   The owner's profile keeps every name the page has always used, so nothing of hers moves. Every other profile reads and writes its own
   copy of each store: its localStorage keys and its IndexedDB databases carry "@" and its id (ingenium_v4@p1abc), so its desk, its
   sign-in (r197's lock record and data key), its long texts, its keys, its apps and its Fabrica are its own from the first read. What
   the device shares is named here: the profiles' own list, the models' files and the engine, the device's pairing, the graphics
   measure and the device's security settings. In the owner's profile the stores of the other profiles are not listed (a backup or
   Storage page there never sweeps them up). Set before any other script reads storage. */
(function(){"use strict";
var W=window,REG="ingenium_profiles";
var LS=null,SS=null;try{LS=W.localStorage;}catch(e){}try{SS=W.sessionStorage;}catch(e){}
var SP=W.Storage&&W.Storage.prototype,gI=SP&&SP.getItem,sI=SP&&SP.setItem,rI=SP&&SP.removeItem,kI=SP&&SP.key,cL=SP&&SP.clear;
var lenD=SP&&Object.getOwnPropertyDescriptor(SP,"length");
function rawGet(k){try{return LS?gI.call(LS,k):null;}catch(e){return null;}}
var R=null;try{var t=rawGet(REG);R=t?JSON.parse(t):null;}catch(e){R=null;}
var list=(R&&Object.prototype.toString.call(R.list)==="[object Array]")?R.list:[];
var cur=(R&&typeof R.cur==="string")?R.cur:"owner",me=null;
/* 7.59 (R350): the practice studio, opened from a door while no one is signed in: its own stores ("@practice"), sample work, nothing of
   anyone's, and nothing of the device's to change. It lasts while this window's session lasts: a start with no mark of this session (the
   window was closed while it was open) ends it, and opens at the door it was entered from; its stores are taken away (practiceDrop). */
var PRACTICE="practice",PMARK="ing.practice.session@"+PRACTICE,PR=false;
function ssRaw(k){try{return SS?gI.call(SS,k):null;}catch(e){return null;}}
function backTo(r){var b=(r&&typeof r.back==="string")?r.back:"owner";if(b!=="owner"&&!list.some(function(p){return p&&p.id===b;}))b="owner";
  r.cur=b;if(r.backOut)r.out=r.backOut;delete r.back;delete r.backOut;delete r.practiceFresh;r.practiceDrop=1;return r;}
if(cur===PRACTICE&&R){if(ssRaw(PMARK)==="1")PR=true;else{R=backTo(R);try{sI.call(LS,REG,JSON.stringify(R));}catch(e){}cur=R.cur;}}
for(var i=0;i<list.length;i++){var q=list[i];if(q&&q.id===cur&&/^p[a-z0-9]{1,24}$/.test(q.id))me=q;}
if(PR)me={id:PRACTICE,name:"Guest",t:5,pw:"none"};
W.__ingProfile=me?{id:me.id,name:String(me.name||"").slice(0,40),t:+me.t||0,pw:me.pw==="own"?"own":"none",owner:false,practice:PR}:{id:"owner",owner:true};
W.__ingGuest=!!me;W.__ingPractice=PR;
var SUF=me?"@"+me.id:"";
/* what the device shares: the list of profiles, the models' record, the graphics measure (Adamas), the device's security settings */
var SHARED_LS=/^(ingenium_profiles|ingenium_models_shared|ing\.gpu\.diamond|ing\.diamond\.trying|ing\.security\.(v1|fails\.v1|asked\.v1))$/;
/* the models' files and the engine (ingenium_files and its older name), the device's sealed pairing, the training lab's models */
var SHARED_DB=/^(ingenium_files|the_foundry_files|ingenium_seal|tensorflowjs)$/;
var OTHER=/@p[a-z0-9]{1,24}$/;
function mapK(k){k=String(k);return (!SUF||SHARED_LS.test(k))?k:k+SUF;}
function mapD(n){n=String(n);return (!SUF||SHARED_DB.test(n))?n:n+SUF;}
function ours(s){return s===LS||s===SS;}
function held(s,k){return PR&&s===LS&&SHARED_LS.test(String(k));}   /* R350: the practice studio never changes what the device shares */
/* the names this profile sees, each with the name the store keeps it under */
function view(s){var out=[],n=0;try{n=lenD.get.call(s);}catch(e){return out;}
  for(var i=0;i<n;i++){var k=null;try{k=kI.call(s,i);}catch(e){}if(k==null)continue;
    if(SUF){if(k.length>SUF.length&&k.slice(-SUF.length)===SUF)out.push([k.slice(0,-SUF.length),k]);else if(s===LS&&SHARED_LS.test(k))out.push([k,k]);}
    else if(!OTHER.test(k))out.push([k,k]);}
  return out;}
if(SP&&LS&&lenD&&lenD.get){
  SP.getItem=function(k){return ours(this)?gI.call(this,this===LS?mapK(k):(SUF?String(k)+SUF:String(k))):gI.apply(this,arguments);};
  SP.setItem=function(k,v){if(held(this,k))return;return ours(this)?sI.call(this,this===LS?mapK(k):(SUF?String(k)+SUF:String(k)),v):sI.apply(this,arguments);};
  SP.removeItem=function(k){if(held(this,k))return;return ours(this)?rI.call(this,this===LS?mapK(k):(SUF?String(k)+SUF:String(k))):rI.apply(this,arguments);};
  SP.key=function(i){if(!ours(this))return kI.apply(this,arguments);var v=view(this);return v[i]?v[i][0]:null;};
  /* clear() empties this profile's names only; the list of profiles and the device's shared names stay */
  SP.clear=function(){if(!ours(this))return cL.apply(this,arguments);var s=this;view(s).forEach(function(p){if(p[0]===REG||(s===LS&&SHARED_LS.test(p[0])))return;try{rI.call(s,p[1]);}catch(e){}});};
  try{Object.defineProperty(SP,"length",{configurable:true,enumerable:true,get:function(){return ours(this)?view(this).length:lenD.get.call(this);}});}catch(e){}}
var IDB=null;try{IDB=W.indexedDB;}catch(e){}
var F=IDB&&Object.getPrototypeOf(IDB),oP=F&&F.open,dP=F&&F.deleteDatabase,bP=F&&F.databases;
if(F&&oP){
  F.open=function(n,v){return arguments.length>1&&v!==undefined?oP.call(this,mapD(n),v):oP.call(this,mapD(n));};
  F.deleteDatabase=function(n){return dP.call(this,PR&&SHARED_DB.test(String(n))?String(n)+SUF:mapD(n));};   /* R350: never the device's own */
  /* R350: in the practice studio the device's shared databases are read and never written (by their names as the page gives them; the
     full, gift and demo editions keep theirs under their own prefix, "ing-gift:", which is set aside to know them): the models' files and the engine, the
     device's pairing, the training lab's models (a write there fails as a read-only store refuses it, and its part says so) */
  var DBP=W.IDBDatabase&&W.IDBDatabase.prototype,oT=DBP&&DBP.transaction;
  if(PR&&oT)DBP.transaction=function(st,mode){if(mode&&mode!=="readonly"&&SHARED_DB.test(String(this.name||"").replace(/^ing-[a-z]+:/,""))){var a=[].slice.call(arguments);a[1]="readonly";return oT.apply(this,a);}return oT.apply(this,arguments);};
  if(typeof bP==="function")F.databases=function(){return bP.call(this).then(function(L){return (L||[]).filter(function(d){var n=String(d.name||"");
      return SUF?(n.slice(-SUF.length)===SUF||SHARED_DB.test(n)):!OTHER.test(n);}).map(function(d){var n=String(d.name||"");
      return {name:SUF&&n.slice(-SUF.length)===SUF?n.slice(0,-SUF.length):n,version:d.version};});});};}
/* the computer apps (desktop/app_profiles_744.py): every call into the app waits, once, until the app holds this profile's files (a
   computer app restarted in another profile, a page opened again). The first listener of pywebviewready is this one, so no other part of
   the page reaches the app before it. In another person's profile, an app older than profiles is not used at all (its disk is the owner's). */
/* R350: what the practice studio may not ask of the computer app, since it opens without a password: the device's models and engine
     (removed, moved, installed or downloaded), its sharing and pairing, its drives and repositories on disk, its runs and tools, its
     training, the folders the folder search reads, the page the app opens, its own sign-in key, its signatures, the Cloud, the clipboard */
var NOPR=/^(disk_.*|share_(set|option_set|renew_code|device_remove|callins_set|callout_add|callout_remove|firewall_allow|runs_set)|seal_answer|install_(model|projector|cancel)|delete_model_file|move_model|(set|reset|choose)_model_place|register_model_file|put_model_part|put_engine_part|model_later|pick_model_files|reveal_model|engine_choice_set|copy_(now|choose|forget|cancel|plan|model_out)|runs_(new|go|install_begin|install_go|install_put|keep_copy|keep_file|keep_log|put|stop|forget|tools|reveal)|train_(start|resume|discard|cancel|text_put|perplexity|perplexity_cancel)|hub_(choose_place|set_place|bring|stop|pause|scan)|apps_(send|serve|unsend|unserve)|page_(use|drop|put|save|export)|self_(signature_put|quit|reveal)|device_key_(make|drop)|cloud_box_set|rag_(choose_folder|forget_folder)|read_clipboard)$/;
(function(){var done=null,want=SUF?SUF.slice(1):"";
  function api(){try{return (W.pywebview&&W.pywebview.api)||null;}catch(e){return null;}}
  function ensure(a){if(done)return done;done=Promise.resolve().then(function(){
      if(typeof a.profile_current!=="function"){if(want)throw new Error("This computer's app is older than profiles.");return true;}
      return Promise.resolve(a.profile_current()).then(function(c){c=(c&&typeof c.id==="string")?c.id:"";if(c===want)return true;
        return Promise.resolve(a.profile_use(want)).then(function(r){if(!(r&&r.ok))throw new Error("The computer's app could not open this profile's files.");return true;});});});
    return done;}
  function wrap(){var a=api();if(!a||a.__r331)return;var names=[];for(var k in a){try{if(typeof a[k]==="function"&&!/^profile_/.test(k))names.push(k);}catch(e){}}
    names.forEach(function(k){var f=a[k];a[k]=function(){var args=arguments,self=this;
      if(PR&&NOPR.test(k))return Promise.reject(new Error("The practice studio cannot do this on this computer."));
      return ensure(a).then(function(){return f.apply(self,args);});};});
    try{Object.defineProperty(a,"__r331",{value:true});}catch(e){try{a.__r331=true;}catch(_){}}}
  if(api())wrap();try{W.addEventListener("pywebviewready",wrap);}catch(e){}})();
/* what modules/r331.js needs of the stores as they are: the list itself, and a profile's stores to take away when it is removed */
/* R350: the practice studio's stores taken away: its names in both stores, and its databases (each deleted before anything opens it) */
var PDBS=["ingenium_v4","ingenium_big","ingenium_apps","ingenium_keys","ingenium_repos","fabrica_made","ingenium_hub","ingenium_desk","ingenium_claude","ingenium_meaning","ingenium-buildlib","ingenium_cloudkey","scriba_db","cd_scriba_store"];
function practiceDbs(){var suf="@"+PRACTICE;PDBS.forEach(function(b){try{dP.call(IDB,b+suf);}catch(e){}});
  if(typeof bP==="function"&&IDB)bP.call(IDB).then(function(L){(L||[]).forEach(function(d){var n=String(d.name||"");if(n.slice(-suf.length)===suf&&PDBS.indexOf(n.slice(0,-suf.length))<0)try{dP.call(IDB,n);}catch(e){}});},function(){});}
function practiceNames(keep){var suf="@"+PRACTICE;[LS,SS].forEach(function(s){if(!s)return;var all=[],c=0;try{c=lenD.get.call(s);}catch(e){}
    for(var i=0;i<c;i++){var k=null;try{k=kI.call(s,i);}catch(e){}if(k&&k.slice(-suf.length)===suf&&!(keep&&k===PMARK))all.push(k);}
    all.forEach(function(k){try{rI.call(s,k);}catch(e){}});});}
if(R&&R.practiceDrop&&!PR&&IDB&&dP){practiceNames(false);practiceDbs();try{delete R.practiceDrop;R.practiceDropApp=1;sI.call(LS,REG,JSON.stringify(R));}catch(e){}}
if(R&&R.practiceFresh&&PR&&IDB&&dP){practiceDbs();try{delete R.practiceFresh;sI.call(LS,REG,JSON.stringify(R));}catch(e){}}
W.__ingProfiles={reg:function(){try{var t=rawGet(REG);return t?JSON.parse(t):null;}catch(e){return null;}},
  save:function(o){try{sI.call(LS,REG,JSON.stringify(o));return true;}catch(e){return false;}},
  shared:{ls:SHARED_LS,db:SHARED_DB},suffix:SUF,practiceRefuses:function(k){return NOPR.test(String(k));},
  /* R350: the practice studio. on: this page is it. put: one of its names written, from any profile. enter: the door it is entered from kept
     (back, and the signed out mark), this window's session marked. leave: back to that door, its stores to be taken away at the next start.
     fresh: its sample work laid down again (its names cleared now, its databases at the next start, before anything opens them) */
  practice:{on:PR,
    put:function(k,v){try{sI.call(LS,String(k)+"@"+PRACTICE,String(v));return true;}catch(e){return false;}},
    clear:function(){practiceNames(true);},
    enter:function(){var r=null;try{var t=rawGet(REG);r=t?JSON.parse(t):null;}catch(e){}if(!r||typeof r!=="object")r={v:1,cur:"owner",list:[]};if(!Array.isArray(r.list))r.list=[];
      if(r.cur!==PRACTICE){r.back=typeof r.cur==="string"?r.cur:"owner";if(r.out){r.backOut=r.out;delete r.out;}}
      r.cur=PRACTICE;delete r.practiceDrop;r.practiceFresh=1;   /* whatever an earlier visit left is taken away before anything opens it */
      try{sI.call(LS,REG,JSON.stringify(r));sI.call(SS,PMARK,"1");return true;}catch(e){return false;}},
    leave:function(){var r=null;try{var t=rawGet(REG);r=t?JSON.parse(t):null;}catch(e){}if(!r||typeof r!=="object")return "owner";
      if(r.cur===PRACTICE)r=backTo(r);try{sI.call(LS,REG,JSON.stringify(r));rI.call(SS,PMARK);}catch(e){}return r.cur;},
    fresh:function(){var r=null;try{var t=rawGet(REG);r=t?JSON.parse(t):null;}catch(e){}if(!r||r.cur!==PRACTICE)return false;
      r.practiceFresh=1;try{sI.call(LS,REG,JSON.stringify(r));return true;}catch(e){return false;}},
    appDone:function(){var r=null;try{var t=rawGet(REG);r=t?JSON.parse(t):null;}catch(e){}if(r&&r.practiceDropApp){delete r.practiceDropApp;try{sI.call(LS,REG,JSON.stringify(r));}catch(e){}}},
    appDue:function(){try{var t=rawGet(REG),r=t?JSON.parse(t):null;return !!(r&&r.practiceDropApp);}catch(e){return false;}}},
  /* the names in this device's store as they are kept (names only, for the tests and the Storage page) */
  rawKeys:function(){var o=[],c=0;try{c=lenD.get.call(LS);}catch(e){}for(var i=0;i<c;i++){try{o.push(kI.call(LS,i));}catch(e){}}return o;},
  drop:function(id){if(!/^p[a-z0-9]{1,24}$/.test(id))return Promise.resolve(0);var suf="@"+id,n=0;
    [LS,SS].forEach(function(s){if(!s)return;var all=[],c=0;try{c=lenD.get.call(s);}catch(e){}for(var i=0;i<c;i++){var k=kI.call(s,i);if(k&&k.slice(-suf.length)===suf)all.push(k);}
      all.forEach(function(k){try{rI.call(s,k);n++;}catch(e){}});});
    var dbs=(typeof bP==="function"&&IDB)?bP.call(IDB).catch(function(){return [];}):Promise.resolve([]);
    return dbs.then(function(L){var names=(L||[]).map(function(d){return String(d.name||"");}).filter(function(x){return x.slice(-suf.length)===suf;});
      ["ingenium_v4","ingenium_big","ingenium_apps","ingenium_keys","ingenium_repos","fabrica_made","ingenium_hub","ingenium_desk","ingenium_claude","ingenium_meaning","ingenium-buildlib"].forEach(function(b){if(names.indexOf(b+suf)<0)names.push(b+suf);});
      return Promise.all(names.map(function(x){return new Promise(function(res){try{var rq=dP.call(IDB,x);rq.onsuccess=rq.onerror=rq.onblocked=function(){res();};}catch(e){res();}});}));}).then(function(){return n;});}};
})();
