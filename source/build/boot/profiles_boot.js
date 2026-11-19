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
for(var i=0;i<list.length;i++){var q=list[i];if(q&&q.id===cur&&/^p[a-z0-9]{1,24}$/.test(q.id))me=q;}
W.__ingProfile=me?{id:me.id,name:String(me.name||"").slice(0,40),t:+me.t||0,pw:me.pw==="own"?"own":"none",owner:false}:{id:"owner",owner:true};
W.__ingGuest=!!me;
var SUF=me?"@"+me.id:"";
/* what the device shares: the list of profiles, the models' record, the graphics measure (Adamas), the device's security settings */
var SHARED_LS=/^(ingenium_profiles|ingenium_models_shared|ing\.gpu\.diamond|ing\.diamond\.trying|ing\.security\.(v1|fails\.v1|asked\.v1))$/;
/* the models' files and the engine (ingenium_files and its older name), the device's sealed pairing, the training lab's models */
var SHARED_DB=/^(ingenium_files|the_foundry_files|ingenium_seal|tensorflowjs)$/;
var OTHER=/@p[a-z0-9]{1,24}$/;
function mapK(k){k=String(k);return (!SUF||SHARED_LS.test(k))?k:k+SUF;}
function mapD(n){n=String(n);return (!SUF||SHARED_DB.test(n))?n:n+SUF;}
function ours(s){return s===LS||s===SS;}
/* the names this profile sees, each with the name the store keeps it under */
function view(s){var out=[],n=0;try{n=lenD.get.call(s);}catch(e){return out;}
  for(var i=0;i<n;i++){var k=null;try{k=kI.call(s,i);}catch(e){}if(k==null)continue;
    if(SUF){if(k.length>SUF.length&&k.slice(-SUF.length)===SUF)out.push([k.slice(0,-SUF.length),k]);else if(s===LS&&SHARED_LS.test(k))out.push([k,k]);}
    else if(!OTHER.test(k))out.push([k,k]);}
  return out;}
if(SP&&LS&&lenD&&lenD.get){
  SP.getItem=function(k){return ours(this)?gI.call(this,this===LS?mapK(k):(SUF?String(k)+SUF:String(k))):gI.apply(this,arguments);};
  SP.setItem=function(k,v){return ours(this)?sI.call(this,this===LS?mapK(k):(SUF?String(k)+SUF:String(k)),v):sI.apply(this,arguments);};
  SP.removeItem=function(k){return ours(this)?rI.call(this,this===LS?mapK(k):(SUF?String(k)+SUF:String(k))):rI.apply(this,arguments);};
  SP.key=function(i){if(!ours(this))return kI.apply(this,arguments);var v=view(this);return v[i]?v[i][0]:null;};
  /* clear() empties this profile's names only; the list of profiles and the device's shared names stay */
  SP.clear=function(){if(!ours(this))return cL.apply(this,arguments);var s=this;view(s).forEach(function(p){if(p[0]===REG||(s===LS&&SHARED_LS.test(p[0])))return;try{rI.call(s,p[1]);}catch(e){}});};
  try{Object.defineProperty(SP,"length",{configurable:true,enumerable:true,get:function(){return ours(this)?view(this).length:lenD.get.call(this);}});}catch(e){}}
var IDB=null;try{IDB=W.indexedDB;}catch(e){}
var F=IDB&&Object.getPrototypeOf(IDB),oP=F&&F.open,dP=F&&F.deleteDatabase,bP=F&&F.databases;
if(F&&oP){
  F.open=function(n,v){return arguments.length>1&&v!==undefined?oP.call(this,mapD(n),v):oP.call(this,mapD(n));};
  F.deleteDatabase=function(n){return dP.call(this,mapD(n));};
  if(typeof bP==="function")F.databases=function(){return bP.call(this).then(function(L){return (L||[]).filter(function(d){var n=String(d.name||"");
      return SUF?(n.slice(-SUF.length)===SUF||SHARED_DB.test(n)):!OTHER.test(n);}).map(function(d){var n=String(d.name||"");
      return {name:SUF&&n.slice(-SUF.length)===SUF?n.slice(0,-SUF.length):n,version:d.version};});});};}
/* the computer apps (desktop/app_profiles_744.py): every call into the app waits, once, until the app holds this profile's files (a
   computer app restarted in another profile, a page opened again). The first listener of pywebviewready is this one, so no other part of
   the page reaches the app before it. In another person's profile, an app older than profiles is not used at all (its disk is the owner's). */
(function(){var done=null,want=SUF?SUF.slice(1):"";
  function api(){try{return (W.pywebview&&W.pywebview.api)||null;}catch(e){return null;}}
  function ensure(a){if(done)return done;done=Promise.resolve().then(function(){
      if(typeof a.profile_current!=="function"){if(want)throw new Error("This computer's app is older than profiles.");return true;}
      return Promise.resolve(a.profile_current()).then(function(c){c=(c&&typeof c.id==="string")?c.id:"";if(c===want)return true;
        return Promise.resolve(a.profile_use(want)).then(function(r){if(!(r&&r.ok))throw new Error("The computer's app could not open this profile's files.");return true;});});});
    return done;}
  function wrap(){var a=api();if(!a||a.__r331)return;var names=[];for(var k in a){try{if(typeof a[k]==="function"&&!/^profile_/.test(k))names.push(k);}catch(e){}}
    names.forEach(function(k){var f=a[k];a[k]=function(){var args=arguments,self=this;return ensure(a).then(function(){return f.apply(self,args);});};});
    try{Object.defineProperty(a,"__r331",{value:true});}catch(e){try{a.__r331=true;}catch(_){}}}
  if(api())wrap();try{W.addEventListener("pywebviewready",wrap);}catch(e){}})();
/* what modules/r331.js needs of the stores as they are: the list itself, and a profile's stores to take away when it is removed */
W.__ingProfiles={reg:function(){try{var t=rawGet(REG);return t?JSON.parse(t):null;}catch(e){return null;}},
  save:function(o){try{sI.call(LS,REG,JSON.stringify(o));return true;}catch(e){return false;}},
  shared:{ls:SHARED_LS,db:SHARED_DB},suffix:SUF,
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
