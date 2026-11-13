<style id="r255-css">
/* ============ R255 · INGENIUM CLOUD: HER WORK ON EVERY DEVICE, SEALED (Ingenium 6.57, 8 November 2026) ============
   The card in Settings, Your data, Ingenium Cloud (three numbered steps, one open at a time), and a small note at the foot of the
   window when work from another device is ready. Keys are Ingenium's own (.btn, .btn.primary); nothing here restyles them. */
#cloudCard .cl-lede{margin:4px 0 12px;max-width:78ch;line-height:1.55}
#cloudCard .cl-status{display:flex;flex-wrap:wrap;align-items:center;gap:8px 12px;margin:0 0 12px;font-size:13px;color:var(--ink-2,#555)}
#cloudCard .cl-dot{display:inline-block;width:9px;height:9px;border-radius:50%;background:var(--ink-3,#999);margin-right:6px;vertical-align:1px}
#cloudCard .cl-dot.on{background:var(--ok,#2f7a55)}
#cloudCard .cl-dot.warn{background:var(--warn,#b8742e)}
#cloudCard .cl-step{border:1px solid var(--hairline,#ddd);border-radius:12px;padding:12px 14px;margin:0 0 10px;background:var(--card,#fff)}
#cloudCard .cl-step > h3{display:flex;align-items:center;gap:10px;margin:0;font-size:14px;font-weight:650;color:var(--ink-1,#222)}
#cloudCard .cl-num{display:inline-grid;place-items:center;width:24px;height:24px;border-radius:50%;font-size:12px;font-weight:700;color:#fff;background:var(--accent,#6a3fb5);flex:0 0 auto}
#cloudCard .cl-step.done .cl-num{background:var(--ok,#2f7a55)}
#cloudCard .cl-body{margin:10px 0 0 34px}
#cloudCard .cl-step:not(.open) .cl-body{display:none}
#cloudCard .cl-step > h3 .cl-sum{font-weight:500;font-size:12.5px;color:var(--ink-2,#555);margin-left:auto}
#cloudCard .cl-row{display:flex;flex-wrap:wrap;align-items:center;gap:8px 10px;margin:8px 0}
#cloudCard label.cl-l{font-size:13px;font-weight:600;color:var(--ink-1,#222);min-width:9.5em}
#cloudCard input[type=text],#cloudCard input[type=password]{font:inherit;font-size:13px;padding:6px 9px;border-radius:8px;border:1px solid var(--hairline,#ccc);background:var(--card,#fff);color:var(--ink-1,#222);min-width:16em}
#cloudCard select{font:inherit;font-size:13px;padding:5px 8px;border-radius:8px;border:1px solid var(--hairline,#ccc);background:var(--card,#fff);color:var(--ink-1,#222)}
#cloudCard .cl-choice{display:flex;align-items:flex-start;gap:8px;margin:6px 0;font-size:13px;line-height:1.45;color:var(--ink-1,#222)}
#cloudCard .cl-choice span{color:var(--ink-2,#555)}
#cloudCard .cl-say{font-size:12.5px;color:var(--ink-2,#555);line-height:1.5;margin:6px 0 0;max-width:72ch}
#cloudCard .cl-say.bad{color:var(--bad,#9a3232)}
#cloudCard .cl-devs{margin:6px 0 0;padding:0;list-style:none;font-size:13px}
#cloudCard .cl-devs li{padding:3px 0;color:var(--ink-1,#222)}
#cloudCard .cl-devs li span{color:var(--ink-2,#555)}
#cloudCard details.cl-more{margin-top:10px}
#cloudCard details.cl-more > summary{cursor:pointer;font-weight:600;font-size:13px;color:var(--ink-1,#222)}
#ingCloudNote{position:fixed;right:18px;bottom:18px;z-index:9000;max-width:420px;padding:12px 14px;border-radius:12px;background:var(--card,#fff);border:1px solid var(--hairline,#ddd);
  box-shadow:0 10px 30px rgba(40,22,68,.18);font-size:13px;line-height:1.45;color:var(--ink-1,#222)}
#ingCloudNote .cn-keys{display:flex;gap:8px;justify-content:flex-end;margin-top:10px}
#ingCloudNote[hidden]{display:none}
</style>
<script>try{(window.__ingParts=window.__ingParts||{})["p255"]="started";}catch(_){}
/* ============ R255 · INGENIUM CLOUD: HER WORK ON EVERY DEVICE, SEALED (Ingenium 6.57, 8 November 2026) ============
   Her words (8 November 2026): "I want you to build Ingenium its own local Cloud or local network that can store my data and facilitate
   the transfer of my data across wirelessly across my devices ... I want all of my devices to have the same content in real time or be
   able to be updated over Ingenium's Cloud that way I am able to move across all of my devices smoothly and continue working on any app,
   project, assignment, or chat or anything else inside of Ingenium with great ease as long as I login and connect to the Ingenium's
   cloud". Asked how, she chose both ways: her Mac mini as the home hub, and any two devices directly.
   How it works:
   - Where: any Mac or Windows app keeps the Cloud, on the gateway that lends models, behind its pairing code (desktop/app_cloud_657.py).
     Her Mac mini at home is the hub; two computers can sync directly the same way, one keeping it for both. The Fire tablet, the
     iPhone, the iPad and a browser connect to a computer that keeps it (a page cannot listen on the network itself). Over Wi-Fi,
     including a phone's hotspot. Bluetooth is not used: a web page cannot exchange data with another computer over Bluetooth.
   - What: everything a backup holds (modules/r143.js): the desk (conversations, notes, projects, Focus, Lector, Blend, the Career
     Studio, settings), the small store, the large stores (long texts, Fabrica's apps with their history, issues and pages,
     conversations brought in), except what belongs to one device: its models and how they run, the computer it borrows models from
     and its online connection, its window and side bars, its dictation, its app library (every Ingenium carries her apps' builds;
     a library's entries name pieces kept on that device only), and its keys (they stay on each device, as in a backup without them).
   - Sealed: each part a backup is made of is sealed on the device with AES-GCM-256 under a key drawn from her Cloud passphrase
     (PBKDF2-SHA-256, 600,000 rounds; the salt travels with each snapshot, so a joining device draws the same key), and named by a
     keyed fingerprint of what is inside (HMAC-SHA-256). The same part always seals the same way, so only parts that changed travel,
     and the computer that keeps the Cloud holds only sealed parts it cannot read. The key is kept on the device in its own store
     (ingenium_cloudkey), as a key the page itself cannot read out; it never goes into a backup.
   - Bringing work in: a snapshot from another device is merged as Backup's Merge does (each conversation, note or record by its own
     date; the newer wins), the desk as it was is kept on the recovery shelf first, and what was deleted on one device is deleted on
     the others (the ids each device held at its last sync show what went; an item changed after it was deleted elsewhere stays).
     New work is announced at the foot of the window and brought in when she says, or by itself when she is not typing, if she
     chose that; then the page opens again on the work, at the conversation she was in.
   - Away from home: a sync file, sealed with the same passphrase, saved anywhere (a folder she syncs, a USB stick) and brought in
     on another device. */
(function r255(){
"use strict";
if(window.__r255)return;window.__r255=1;
var W=window,D=document,TE=new TextEncoder(),TD=new TextDecoder();
var LS="ingenium_cloud",KDB="ingenium_cloudkey",ITER=600000,LEAVE=["ingenium_apps"];
/* what belongs to this device and stays as it is here when work comes in */
var HERE_KEYS=["models","activeModelId","perf","cloud","cloudPrev","chatSource","rag","presence","presenceLog","presenceSince","presenceSync","winPos",
  "navCollapsed","railCollapsed","topCollapsed","dictate","appLib","__deskAt"];
var NOTE_KEY="ingenium_cloud_note";
function $(id){return D.getElementById(id);}
function el(t,c,x){var e=D.createElement(t);if(c)e.className=c;if(x!=null)e.textContent=x;return e;}
function hex(u){var s="";for(var i=0;i<u.length;i++)s+=(u[i]<16?"0":"")+u[i].toString(16);return s;}
function b64e(u){var s="";for(var i=0;i<u.length;i+=32768)s+=String.fromCharCode.apply(null,u.subarray(i,i+32768));return btoa(s);}
function b64d(t){var s=atob(String(t||"")),u=new Uint8Array(s.length);for(var i=0;i<s.length;i++)u[i]=s.charCodeAt(i);return u;}
function rnd(n){var u=new Uint8Array(n);crypto.getRandomValues(u);return u;}
function sub(){try{return (W.crypto&&W.crypto.subtle)||null;}catch(e){return null;}}
function seq(list,fn){var i=0;function next(){if(i>=list.length)return Promise.resolve();var k=i++;return Promise.resolve(fn(list[k],k)).then(next);}return next();}
function ago(t){if(!t)return "never";var s=Math.round((Date.now()-t)/1000);if(s<60)return "just now";var m=Math.round(s/60);if(m<60)return m+(m===1?" minute ago":" minutes ago");
  var h=Math.round(m/60);if(h<48)return h+(h===1?" hour ago":" hours ago");return Math.round(h/24)+" days ago";}
function mb(n){return n>=1048576?(n/1048576).toFixed(1)+" MB":Math.max(1,Math.round(n/1024))+" KB";}

/* ---------- this device's own settings (never in a backup: r143's protectedKey) ---------- */
function load(){var c=null;try{c=JSON.parse(localStorage.getItem(LS)||"null");}catch(e){}if(!c||typeof c!=="object")c={};
  if(!/^[0-9a-f]{24}$/.test(c.device||""))c.device=hex(rnd(12));if(!c.name)c.name=defaultName();if(!c.seen||typeof c.seen!=="object")c.seen={};
  if(!c.ids||typeof c.ids!=="object")c.ids={};if(c.auto===undefined)c.auto=true;if(!c.bring)c.bring="ask";return c;}
var CFG=load();
function keep(){try{localStorage.setItem(LS,JSON.stringify(CFG));}catch(e){}}
function defaultName(){var l="";try{l=(W.IngBackup&&IngBackup.here&&IngBackup.here().label)||"";}catch(e){}
  if(!l){var u=navigator.userAgent||"";l=/Silk|KF[A-Z]{2,}/.test(u)?"Fire tablet":/iPad/.test(u)?"iPad":/iPhone/.test(u)?"iPhone":/Android/.test(u)?"Android":/Mac/.test(u)?"Mac":/Windows/.test(u)?"Windows computer":"This device";}
  return l;}
function ready(){return !!(CFG.box&&CFG.box.addr&&CFG.box.code&&CFG.kdf&&CFG.keyOk);}

/* ---------- the key: drawn from her passphrase, kept on this device as a key the page cannot read out ---------- */
function kdb(){return new Promise(function(res,rej){var rq;try{rq=indexedDB.open(KDB,1);}catch(e){rej(e);return;}
  rq.onupgradeneeded=function(){try{rq.result.createObjectStore("k");}catch(e){}try{rq.result.createObjectStore("p");}catch(e){}};
  rq.onerror=function(){rej(rq.error||new Error("this device's store refused"));};rq.onsuccess=function(){res(rq.result);};});}
function kget(store,k){return kdb().then(function(d){return new Promise(function(res){var t=d.transaction(store,"readonly"),g=t.objectStore(store).get(k);
  g.onsuccess=function(){res(g.result);};g.onerror=function(){res(undefined);};t.oncomplete=function(){d.close();};});},function(){return undefined;});}
function kput(store,k,v){return kdb().then(function(d){return new Promise(function(res){var t=d.transaction(store,"readwrite");t.objectStore(store).put(v,k);
  t.oncomplete=function(){d.close();res(true);};t.onerror=t.onabort=function(){d.close();res(false);};});},function(){return false;});}
function kdel(){return new Promise(function(res){try{var rq=indexedDB.deleteDatabase(KDB);rq.onsuccess=rq.onerror=rq.onblocked=function(){res();};}catch(e){res();}});}
var KEY=null;
function derive(pass,salt,iter){var s=sub();if(!s)return Promise.reject(new Error("This browser offers no encryption here, so Ingenium Cloud cannot seal your work."));
  return s.importKey("raw",TE.encode(String(pass).normalize("NFC")),"PBKDF2",false,["deriveBits"])
    .then(function(k){return s.deriveBits({name:"PBKDF2",hash:"SHA-256",salt:b64d(salt),iterations:iter},k,512);})
    .then(function(bits){var u=new Uint8Array(bits);
      return Promise.all([s.importKey("raw",u.slice(0,32),{name:"AES-GCM"},false,["encrypt","decrypt"]),s.importKey("raw",u.slice(32),{name:"HMAC",hash:"SHA-256"},false,["sign"])]);})
    .then(function(ks){return {enc:ks[0],mac:ks[1]};});}
function theKey(){if(KEY)return Promise.resolve(KEY);return kget("k","key").then(function(k){if(k&&k.enc&&k.mac){KEY=k;return k;}throw new Error("locked");});}

/* ---------- a part: named by a keyed fingerprint of what is inside, sealed the same way each time ---------- */
function mac(K,label,u8){var a=TE.encode(label),x=new Uint8Array(a.length+u8.length);x.set(a,0);x.set(u8,a.length);return sub().sign("HMAC",K.mac,x).then(function(v){return new Uint8Array(v);});}
function seal(K,u8){return Promise.all([mac(K,"ingenium-cloud part 1\n",u8),mac(K,"ingenium-cloud nonce 1\n",u8)]).then(function(h){var id=hex(h[0]),iv=h[1].slice(0,12);
  return sub().encrypt({name:"AES-GCM",iv:iv,additionalData:TE.encode("ingenium-cloud 1 "+id)},K.enc,u8).then(function(ct){var out=new Uint8Array(12+ct.byteLength);out.set(iv,0);out.set(new Uint8Array(ct),12);return {id:id,sealed:out};});});}
function unseal(K,id,sealed){if(!sealed||sealed.length<29)return Promise.reject(new Error("a part of your Cloud is damaged"));
  return sub().decrypt({name:"AES-GCM",iv:sealed.slice(0,12),additionalData:TE.encode("ingenium-cloud 1 "+id)},K.enc,sealed.slice(12)).then(function(p){return new Uint8Array(p);},
    function(){var e=new Error("That passphrase does not open this Cloud.");e.code="key";throw e;});}
function sha(u8){return sub().digest("SHA-256",u8).then(function(h){return hex(new Uint8Array(h));});}

/* ---------- the computer that keeps the Cloud ---------- */
function base(b){b=b||CFG.box||{};return "http://"+String(b.addr||"").trim().replace(/^https?:\/\//i,"").replace(/\/+$/,"");}
function ask(method,path,body,b){b=b||CFG.box;if(!b||!b.addr)return Promise.reject(new Error("No computer keeps your Cloud yet. Choose one in step 2."));
  if(typeof netFetch!=="function")return Promise.reject(new Error("This copy of Ingenium cannot reach the network."));
  var o={method:method,headers:{"Authorization":"Bearer "+String(b.code||"").trim(),"Content-Type":"application/json"},timeout:600};if(body!==undefined)o.body=JSON.stringify(body);
  return netFetch(base(b)+path,o).then(function(r){return r.text().then(function(t){var j=null;try{j=t?JSON.parse(t):{};}catch(e){}
    if(r.ok&&j)return j;var msg=(j&&j.error&&j.error.message)||("the computer answered "+r.status);var e=new Error(msg);e.status=r.status;e.body=j;throw e;});});}
function hello(b){return netFetch(base(b)+"/ingenium/hello",{method:"GET",timeout:20}).then(function(r){return r.json();});}
function getPart(K,id,cache){if(cache&&cache[id])return Promise.resolve(cache[id]);
  return ask("GET","/ingenium/cloud/part/"+id).then(function(j){var u=b64d(j.b64);return sha(u).then(function(h){if(h!==j.sha)throw new Error("a part arrived damaged; try again");return unseal(K,id,u);})
    .then(function(p){if(cache)cache[id]=p;return p;});});}
function putPart(id,sealed){return sha(sealed).then(function(h){return ask("POST","/ingenium/cloud/part/"+id,{b64:b64e(sealed),sha:h});});}

/* ---------- what was deleted here: the ids each list held at the last sync, against the ids it holds now ---------- */
function idOf(x){return x&&typeof x==="object"&&(typeof x.id==="string"||typeof x.id==="number")?String(x.id):null;}
function stamp(x){if(!x||typeof x!=="object")return 0;var ks=["changed","updated","updatedAt","modified","lastModified","at","made","created","ts","time"],s=0;
  ks.forEach(function(k){var v=x[k];if(typeof v==="string")v=Date.parse(v);if(typeof v==="number"&&isFinite(v)&&v>s)s=v;});
  try{if(Array.isArray(x.messages)&&x.messages.length){var m=x.messages[x.messages.length-1];s=Math.max(s,stamp(m),(m&&m.done)||0);}}catch(e){}return s;}
function lists(st){var out={};
  function walk(o,path,depth){if(depth>3||!o||typeof o!=="object")return;
    if(Array.isArray(o)){if(o.length&&o.every(function(x){return idOf(x)!==null;}))out[path]=o.map(idOf);else if(!o.length)out[path]=[];return;}
    Object.keys(o).forEach(function(k){if(!path&&(HERE_KEYS.indexOf(k)>=0||k==="cloudGone"||k==="v61"))return;walk(o[k],path?path+"."+k:k,depth+1);});}
  walk(st,"",0);return out;}
function at(st,path){var o=st,ps=path.split(".");for(var i=0;i<ps.length;i++){if(!o||typeof o!=="object")return undefined;o=o[ps[i]];}return o;}
function goneNow(){var now=lists(state),last=CFG.ids||{},t=Date.now(),g=Array.isArray(state.cloudGone)?state.cloudGone:[],have={},added=0;
  g.forEach(function(x){have[x.id]=1;});
  Object.keys(last).forEach(function(p){var cur=now[p];if(!cur){var a=at(state,p);if(!Array.isArray(a))return;cur=[];}var set={};cur.forEach(function(i){set[i]=1;});
    (last[p]||[]).forEach(function(i){if(set[i])return;var id=p+"|"+i;if(have[id])return;g.push({id:id,p:p,i:i,at:t});have[id]=1;added++;});});
  /* a deletion is remembered for half a year: long enough for every device to hear of it */
  g=g.filter(function(x){return x&&x.at&&t-x.at<183*86400000;});if(g.length>5000)g=g.slice(g.length-5000);state.cloudGone=g;return added;}
function applyGone(){var g=Array.isArray(state.cloudGone)?state.cloudGone:[],n=0;
  g.forEach(function(x){var a=at(state,x.p);if(!Array.isArray(a))return;for(var i=a.length-1;i>=0;i--){if(idOf(a[i])===x.i&&stamp(a[i])<=x.at){a.splice(i,1);n++;}}});return n;}

/* ---------- a cheap mark of what is here, so an unchanged desk is not sent again ---------- */
function mark(){var st={};try{st=JSON.parse(JSON.stringify(state));}catch(e){}HERE_KEYS.forEach(function(k){delete st[k];});try{delete st.v61.backup;}catch(e){}
  var s="";try{s=JSON.stringify(st);}catch(e){}return sub().digest("SHA-256",TE.encode(s)).then(function(h){return hex(new Uint8Array(h)).slice(0,24);});}

/* ---------- sending: a snapshot of everything, only the parts that changed travel ---------- */
var BUSY=null,LAST="",SAY=function(){};
function say(t,bad){LAST=t||"";try{SAY(LAST,!!bad);}catch(e){}}
function pidMemo(shaHex){return kget("p",shaHex);}
function send(o){o=o||{};if(BUSY)return BUSY;if(!ready())return Promise.reject(new Error("Ingenium Cloud is not set up on this device yet."));
  var K,made,b,cm,ids={},sent=0,sentB=0,totalB=0;
  BUSY=theKey().then(function(k){K=k;var added=goneNow();try{saveState();}catch(e){}say("Gathering your work…");
      return IngBackup.make({leave:LEAVE,onProgress:function(p){if(p&&p.what)say("Gathering your work: "+p.what+"…");}});})
    .then(function(r){made=r;return IngBackup.open(r.blob);})
    .then(function(x){b=x;var m=b.manifest,paths=Object.keys(m.files||{});
      cm={kind:"ingenium-cloud",v:1,device:CFG.device,name:CFG.name,at:Date.now(),version:String(m.version||""),platform:(m.platform&&m.platform.label)||"",backup:m,parts:{}};
      /* the names of parts already known from their fingerprints; the rest are read and sealed */
      return seq(paths,function(p){var f=m.files[p];totalB+=f.size||0;return pidMemo(f.sha256).then(function(id){if(id)cm.parts[p]=id;});})
        .then(function(){var known=Object.keys(cm.parts).map(function(p){return cm.parts[p];});return known.length?ask("POST","/ingenium/cloud/has",{ids:known}):{missing:[]};})
        .then(function(h){var miss={};(h.missing||[]).forEach(function(i){miss[i]=1;});var i=0;
          return seq(paths,function(p){i++;var id=cm.parts[p];if(id&&!miss[id])return;say("Sealing and sending: part "+i+" of "+paths.length+"…");
            return b.zip.read(p).then(function(u){return seal(K,u);}).then(function(s){cm.parts[p]=s.id;ids[s.id]=1;sent++;sentB+=s.sealed.length;
              return putPart(s.id,s.sealed).then(function(){return kput("p",m.files[p].sha256,s.id);});});});});})
    .then(function(){cm.bytes=totalB;return seal(K,TE.encode(JSON.stringify(cm)));})
    .then(function(h){sent++;sentB+=h.sealed.length;return putPart(h.id,h.sealed).then(function(){
        var all=Object.keys(cm.parts).map(function(p){return cm.parts[p];});
        return ask("POST","/ingenium/cloud/snap",{device:CFG.device,name:CFG.name,at:cm.at,head:h.id,parts:all,bytes:totalB,platform:cm.platform,version:cm.version,kdf:CFG.kdf});})
      .then(function(r){CFG.lastPush={at:Date.now(),got:r.got,head:h.id,sent:sent,sentBytes:sentB,bytes:totalB};CFG.ids=lists(state);return mark();})
      .then(function(mk){CFG.mark=mk;keep();say("Sent to the Cloud "+ago(CFG.lastPush.at)+": "+sent+(sent===1?" part":" parts")+" changed ("+mb(sentB)+") of "+mb(totalB)+".");
        return {sent:sent,sentBytes:sentB,bytes:totalB,head:h.id};});})
    .then(function(r){BUSY=null;paint();return r;},function(e){BUSY=null;say(words(e),true);paint();throw e;});
  return BUSY;}
function words(e){var m=String(e&&e.message||e);if(e&&e.status===401)return "The pairing code is not right. It is shown on the computer that keeps your Cloud, in Settings, Your models on every device.";
  if(/refused or could not reach|Failed to fetch|timed out|ECONN|could not be made/i.test(m))return "The computer that keeps your Cloud cannot be reached. Check that it is on, that Ingenium is open there with sharing on, and that this device is on the same Wi-Fi.";
  if(m==="locked")return "Write your Cloud passphrase in step 1 to open the Cloud on this device.";return m;}

/* ---------- what is new from the other devices ---------- */
function fresh(list){var newest={};(list||[]).forEach(function(s){if(!s||s.device===CFG.device)return;if(!newest[s.device]||(s.got||0)>(newest[s.device].got||0))newest[s.device]=s;});
  return Object.keys(newest).map(function(k){return newest[k];}).filter(function(s){return (s.got||0)>(CFG.seen[s.device]||0);}).sort(function(a,b){return (a.at||0)-(b.at||0);});}
function check(){if(!ready())return Promise.resolve({fresh:[],snaps:[]});return ask("GET","/ingenium/cloud").then(function(j){CFG.box.computer=j.computer||CFG.box.computer;CFG.snaps=(j.snaps||[]).map(function(s){return {device:s.device,name:s.name,at:s.at,got:s.got,bytes:s.bytes,platform:s.platform,version:s.version};});CFG.checked=Date.now();keep();
  return {fresh:fresh(j.snaps),snaps:j.snaps||[]};});}

/* ---------- bringing one snapshot in: Backup's Merge, then this device's own things as they were, then what was deleted ---------- */
function bringOne(K,s,cache){var cm=null,inDesk=null;
  return getPart(K,s.head,cache).then(function(u){cm=JSON.parse(TD.decode(u));if(!cm||cm.kind!=="ingenium-cloud"||!cm.backup)throw new Error("That snapshot is not one Ingenium can read.");
      var m=cm.backup;
      var zip={read:function(p){var id=cm.parts[p];if(!id)return Promise.reject(new Error("the snapshot has no part "+p));
        return getPart(K,id,cache).then(function(x){var want=m.files&&m.files[p]&&m.files[p].sha256;if(!want)return x;return sha(x).then(function(h){if(h!==want)throw new Error("a part of the snapshot is not what it says");return x;});});}};
      return zip.read("desk/state.json").then(function(x){inDesk=JSON.parse(TD.decode(x));return {kind:"zip",manifest:m,zip:zip};});})
    .then(function(b){var here={};HERE_KEYS.forEach(function(k){here[k]=state[k]===undefined?undefined:JSON.parse(JSON.stringify(state[k]));});
      var wasChat=state.activeChat;
      return IngBackup.apply(b,{mode:"merge",reload:false,onProgress:function(p){if(p&&p.what)say("Bringing in from "+(cm.name||"another device")+": "+p.what+"…");}}).then(function(rep){
        HERE_KEYS.forEach(function(k){if(here[k]===undefined)delete state[k];else state[k]=here[k];});
        var removed=applyGone();
        /* where she was working last: the conversation open on the device that worked last, when it is here */
        try{if(inDesk&&cm.at>(CFG.lastLocal||0)&&inDesk.activeChat&&Array.isArray(state.chats)&&state.chats.some(function(c){return c&&c.id===inDesk.activeChat;}))state.activeChat=inDesk.activeChat;else state.activeChat=wasChat;}catch(e){}
        try{delete state.v61.backup.restored;}catch(e){}
        try{saveState();}catch(e){}
        CFG.seen[s.device]=s.got;keep();return {from:cm.name,at:cm.at,removed:removed,problems:rep&&rep.problems||[]};});});}
function bring(list,o){o=o||{};if(BUSY)return BUSY;var done=[];
  BUSY=theKey().then(function(K){var cache={};return seq(list,function(s){return bringOne(K,s,cache).then(function(r){done.push(r);});});})
    .then(function(){CFG.ids=lists(state);CFG.lastPull={at:Date.now(),from:done.map(function(r){return r.from;}).join(", ")};keep();BUSY=null;
      var probs=[].concat.apply([],done.map(function(r){return r.problems;}));
      try{sessionStorage.setItem(NOTE_KEY,JSON.stringify({from:CFG.lastPull.from,problems:probs.slice(0,4),removed:done.reduce(function(a,r){return a+r.removed;},0)}));}catch(e){}
      if(o.reload!==false)setTimeout(function(){try{location.reload();}catch(e){}},400);return done;},
      function(e){BUSY=null;say(words(e),true);paint();throw e;});
  return BUSY;}

/* ---------- step 1 and 2: the passphrase, and the computer that keeps the Cloud ---------- */
function connect(b,pass){var snaps=[];say("Reaching "+(b.addr||"the computer")+"…");
  return hello(b).catch(function(e){throw new Error(words(e));}).then(function(h){if(!h||h.app!=="Ingenium")throw new Error("That address is not an Ingenium.");
      if(!h.cloud)throw new Error("The Ingenium on "+(h.computer||"that computer")+" is too old to keep a Cloud. Update it to 6.57 or later.");b.computer=h.computer||"";
      return ask("GET","/ingenium/cloud",undefined,b);})
    .then(function(j){snaps=j.snaps||[];var withKdf=snaps.filter(function(s){return s.kdf&&s.kdf.salt;}).sort(function(a,c){return (c.got||0)-(a.got||0);});
      var kdf=withKdf.length?{salt:withKdf[0].kdf.salt,iter:withKdf[0].kdf.iter}:{salt:b64e(rnd(16)),iter:ITER};say("Drawing your key from the passphrase (a few seconds)…");
      return derive(pass,kdf.salt,kdf.iter).then(function(K){
        /* a Cloud that already holds work proves the passphrase: its newest snapshot must open */
        var test=withKdf[0];var prove=test?(CFG.box=b,getPart(K,test.head,null)):Promise.resolve(null);
        return prove.then(function(){return kdel();}).then(function(){return kput("k","key",{enc:K.enc,mac:K.mac});}).then(function(){KEY=K;CFG.kdf=kdf;CFG.box=b;CFG.keyOk=true;CFG.joined=Date.now();keep();return {fresh:fresh(snaps),created:!test};});},
        function(e){throw e;});})
    .catch(function(e){if(e&&e.code==="key"){CFG.keyOk=false;keep();}throw e;});}
function forget(){return kdel().then(function(){KEY=null;OPEN=1;var dev=CFG.device,name=CFG.name;CFG={device:dev,name:name,seen:{},ids:{},auto:true,bring:"ask"};keep();});}

/* ---------- by itself: sent a minute after a change, and the other devices looked at every minute ---------- */
var dirtyT=null,lastInput=Date.now(),pending=[];
/* where she worked last is the work she did here: a save soon after she typed or pressed, not the app's own background saves */
function dirty(){if(Date.now()-lastInput<15000)CFG.lastLocal=Date.now();if(!ready()||!CFG.auto)return;clearTimeout(dirtyT);dirtyT=setTimeout(function(){autoSend();},60000);}
function autoSend(){if(BUSY||!ready()||!CFG.auto)return;mark().then(function(mk){if(mk===CFG.mark)return;return send({auto:true});}).catch(function(){});}
function idle(){var inp=$("chatInput");return Date.now()-lastInput>90000&&(!inp||!inp.value.trim())&&D.visibilityState==="visible";}
function autoCheck(){if(BUSY||!ready()||!CFG.auto)return;check().then(function(r){pending=r.fresh;if(!pending.length){note(null);return;}
  if(CFG.bring==="quiet"&&idle())return bring(pending);note(pending);}).catch(function(){});}
["keydown","pointerdown","input"].forEach(function(ev){D.addEventListener(ev,function(){lastInput=Date.now();},true);});
function hook(){var o=W.saveState;if(typeof o!=="function"||o.__r255)return;var n=function(){var r=o.apply(this,arguments);try{dirty();}catch(e){}return r;};n.__r255=1;W.saveState=n;try{saveState=n;}catch(e){}}

/* ---------- the note at the foot of the window ---------- */
function note(list){var n=$("ingCloudNote");if(!list||!list.length){if(n)n.hidden=true;return;}
  if(!n){n=el("div");n.id="ingCloudNote";n.setAttribute("role","status");n.setAttribute("aria-live","polite");D.body.appendChild(n);}
  n.innerHTML="";var who=list.map(function(s){return s.name||"another device";}).join(" and "),latest=list[list.length-1];
  n.appendChild(el("div",null,"New work from "+who+", "+ago(latest.at)+", is in your Cloud."));
  var keys=el("div","cn-keys"),later=el("button","btn small","Later"),go=el("button","btn primary small","Bring it in");later.type=go.type="button";
  later.onclick=function(){n.hidden=true;};go.onclick=function(){go.disabled=later.disabled=true;go.textContent="Bringing it in…";bring(list).catch(function(e){go.disabled=later.disabled=false;go.textContent="Bring it in";n.firstChild.textContent=words(e);});};
  keys.appendChild(later);keys.appendChild(go);n.appendChild(keys);n.hidden=false;}
function afterReload(){var x=null;try{x=JSON.parse(sessionStorage.getItem(NOTE_KEY)||"null");sessionStorage.removeItem(NOTE_KEY);}catch(e){}if(!x)return;
  var msg="Your work from "+(x.from||"your other device")+" is here."+(x.removed?" "+x.removed+(x.removed===1?" item deleted there is":" items deleted there are")+" deleted here too.":"")+(x.problems&&x.problems.length?" "+x.problems[0]:"");
  try{if(typeof toast==="function")toast(msg);}catch(e){}}

/* ---------- the card: Settings, Your data, Ingenium Cloud ---------- */
/* the step open on arrival is the one she needs: the passphrase, then the computer, then keeping in step */
var OPEN=0;function openFirst(){return ready()?3:(CFG.keyOk?2:1);}
function card(){var pg=$("page-settings");if(!pg)return;var c=$("cloudCard");
  if(!c){c=el("div","card");c.id="cloudCard";c.setAttribute("role","region");c.setAttribute("aria-labelledby","cloudH");var at=$("bkCard");if(at&&at.parentNode===pg)pg.insertBefore(c,at.nextSibling);else pg.appendChild(c);}
  paint();}
function step(n,title,sum,done,body){var s=el("section","cl-step"+(OPEN===n?" open":"")+(done?" done":""));var h=el("h3");h.appendChild(el("span","cl-num",done?"✓":String(n)));h.appendChild(el("span",null,title));
  if(sum)h.appendChild(el("span","cl-sum",sum));h.tabIndex=0;h.setAttribute("role","button");h.setAttribute("aria-expanded",OPEN===n?"true":"false");
  h.onclick=h.onkeydown=function(e){if(e.type==="keydown"&&e.key!=="Enter"&&e.key!==" ")return;if(e.type==="keydown")e.preventDefault();OPEN=OPEN===n?0:n;paint();};
  s.appendChild(h);var bd=el("div","cl-body");body(bd);s.appendChild(bd);return s;}
function row(lab,input){var r=el("div","cl-row");var l=el("label","cl-l",lab);if(input.id)l.htmlFor=input.id;r.appendChild(l);r.appendChild(input);return r;}
function btn(t,pri){var b=el("button","btn small"+(pri?" primary":""),t);b.type="button";return b;}
function sayEl(){var p=el("p","cl-say");p.setAttribute("role","status");p.setAttribute("aria-live","polite");return p;}
function shell(){try{return (typeof shellApi==="function")?shellApi():null;}catch(e){return null;}}
function paint(){var c=$("cloudCard");if(!c)return;if(OPEN===0)OPEN=openFirst();c.innerHTML="";
  var h=el("h2","sec","Ingenium Cloud");h.id="cloudH";c.appendChild(h);
  c.appendChild(el("p","small muted cl-lede","Your work, the same on every device: "+what()+". "+
    "Your computer at home can keep it for all your devices, or any of your computers can keep it for another. It travels over Wi-Fi, a phone's hotspot included, sealed with your passphrase before it leaves each device."));
  var st=el("div","cl-status");var dot=el("span","cl-dot"+(ready()?" on":"")),line=el("span");st.appendChild(dot);
  line.textContent=ready()?("On. Kept by "+(CFG.box.self?"this computer":(CFG.box.computer||CFG.box.addr))+". Sent "+ago(CFG.lastPush&&CFG.lastPush.at)+(CFG.lastPull?"; brought in "+ago(CFG.lastPull.at):"")+"."):"Off on this device.";
  st.insertBefore(dot,st.firstChild);st.appendChild(line);c.appendChild(st);
  /* 1. the passphrase */
  c.appendChild(step(1,"Your Cloud passphrase",CFG.keyOk?"Kept on this device":"",!!CFG.keyOk,function(bd){
    if(CFG.keyOk){bd.appendChild(el("p","cl-say","Your passphrase opened this Cloud, and its key is kept on this device. To use another passphrase, turn the Cloud off on this device (at the foot of this card) and start again."));return;}
    bd.appendChild(el("p","cl-say","The same passphrase on every device opens your Cloud. Nobody can read your Cloud without it, the computer that keeps it included, and it cannot be recovered if it is forgotten: keep it somewhere safe. At least ten characters."));
    var pw=el("input");pw.type="password";pw.id="clPass";pw.autocomplete="new-password";pw.setAttribute("aria-label","Your Cloud passphrase");bd.appendChild(row("Passphrase",pw));
    var show=el("label","cl-choice"),cb=el("input");cb.type="checkbox";cb.onchange=function(){pw.type=cb.checked?"text":"password";};show.appendChild(cb);show.appendChild(el("span",null,"Show it"));bd.appendChild(show);
    var go=btn("Next",true);bd.appendChild(go);var sy=sayEl();bd.appendChild(sy);
    go.onclick=function(){var v=pw.value;if(String(v).length<10){sy.className="cl-say bad";sy.textContent="The passphrase needs at least ten characters.";return;}PASS=v;OPEN=2;paint();};}));
  /* 2. the computer that keeps it */
  c.appendChild(step(2,"The computer that keeps it",CFG.box&&CFG.box.addr?(CFG.box.self?"This computer":(CFG.box.computer||CFG.box.addr)):"",!!(CFG.box&&CFG.keyOk),function(bd){
    var api=shell(),sy=sayEl();
    if(api&&typeof api.share_status==="function"){
      bd.appendChild(el("p","cl-say","This computer can keep your Cloud for your other devices: choose this on your Mac mini at home, or on the computer you take with you. It stays awake while it does (its screen may turn off)."));
      var me=btn("This computer keeps it",!CFG.box);bd.appendChild(me);
      me.onclick=function(){if(!PASS){sy.className="cl-say bad";sy.textContent="Write your passphrase in step 1 first.";OPEN=1;paint();return;}me.disabled=true;
        /* 6.57: the computer keeps the Cloud (desktop/app_cloud_657.py); lending its models stays as she set it */
        Promise.resolve().then(function(){return typeof api.cloud_box_set==="function"?api.cloud_box_set(true):api.share_set(true);}).then(function(){return api.share_status();}).then(function(x){if(!x||!x.port||!x.code)throw new Error("This computer's sharing did not start: "+((x&&x.error)||"no port"));
            return connect({addr:"127.0.0.1:"+x.port,code:x.code,self:true,computer:x.computer||"this computer",lan:(x.addresses||[])[0]||""},PASS);})
          .then(function(r){PASS="";OPEN=3;paint();return after(r);}).catch(function(e){me.disabled=false;sy.className="cl-say bad";sy.textContent=words(e);});};
      bd.appendChild(el("p","cl-say","Or another computer keeps it:"));}
    else bd.appendChild(el("p","cl-say","Write the address and pairing code of the computer that keeps your Cloud. Both are shown on that computer, in Settings, Ingenium Cloud, and in Your models on every device."));
    var lend=(state.cloud&&state.cloud.provider==="ingenium"&&state.cloud.addr&&!/\/ingenium\/via\//.test(state.cloud.addr))?state.cloud:null;
    var ad=el("input");ad.type="text";ad.id="clAddr";ad.placeholder="192.168.1.20:17860";ad.value=(CFG.box&&!CFG.box.self&&CFG.box.addr)||(lend?lend.addr:"");bd.appendChild(row("Address",ad));
    var cd=el("input");cd.type="text";cd.id="clCode";cd.placeholder="ABCD-EFGH";cd.value=(CFG.box&&!CFG.box.self&&CFG.box.code)||(lend?lend.key:"");bd.appendChild(row("Pairing code",cd));
    if(lend&&!CFG.box)bd.appendChild(el("p","cl-say","Filled in from the computer you borrow models from, "+(lend.computer||lend.addr)+"."));
    var go=btn("Connect",!api);bd.appendChild(go);bd.appendChild(sy);
    go.onclick=function(){if(!PASS&&!CFG.keyOk){sy.className="cl-say bad";sy.textContent="Write your passphrase in step 1 first.";OPEN=1;paint();return;}
      var a=ad.value.trim(),k=cd.value.trim();if(!/^[A-Za-z0-9.:\-\[\]]+(:\d{2,5})?$/.test(a)){sy.className="cl-say bad";sy.textContent="Write the address as it is shown on that computer, for example 192.168.1.20:17860.";return;}
      if(!k){sy.className="cl-say bad";sy.textContent="Write the pairing code shown on that computer.";return;}
      go.disabled=true;sy.className="cl-say";connect({addr:a,code:k,self:false},PASS).then(function(r){PASS="";OPEN=3;paint();return after(r);})
        .catch(function(e){go.disabled=false;sy.className="cl-say bad";sy.textContent=words(e);});};}));
  /* 3. syncing */
  c.appendChild(step(3,"Keep this device in step",ready()?(CFG.auto?"By itself":"When you ask"):"",false,function(bd){var sy=sayEl();sy.textContent=LAST;
    if(!ready()){bd.appendChild(el("p","cl-say","Finish steps 1 and 2 first."));return;}
    var r=el("div","cl-row"),now=btn("Send and bring in now",true),get=btn("Bring in now");r.appendChild(now);r.appendChild(get);bd.appendChild(r);bd.appendChild(sy);
    now.onclick=function(){now.disabled=get.disabled=true;send().then(function(){return check();}).then(function(x){if(x.fresh.length)return bring(x.fresh);})
      .catch(function(){}).then(function(){now.disabled=get.disabled=false;});};
    get.onclick=function(){now.disabled=get.disabled=true;check().then(function(x){if(!x.fresh.length){sy.className="cl-say";sy.textContent="Nothing new from your other devices.";return;}return bring(x.fresh);})
      .catch(function(e){sy.className="cl-say bad";sy.textContent=words(e);}).then(function(){now.disabled=get.disabled=false;});};
    var au=el("label","cl-choice"),ac=el("input");ac.type="checkbox";ac.checked=!!CFG.auto;ac.onchange=function(){CFG.auto=ac.checked;keep();paint();};
    au.appendChild(ac);au.appendChild(el("span",null,"By itself: send a minute after a change, and look for new work every minute"));bd.appendChild(au);
    var br=el("select");br.id="clBring";[["ask","Ask me first"],["quiet","Bring it in by itself when I am not typing"]].forEach(function(o){var op=el("option",null,o[1]);op.value=o[0];br.appendChild(op);});
    br.value=CFG.bring||"ask";br.onchange=function(){CFG.bring=br.value;keep();};bd.appendChild(row("New work",br));
    var nm=el("input");nm.type="text";nm.id="clName";nm.value=CFG.name;nm.onchange=function(){CFG.name=nm.value.trim().slice(0,60)||defaultName();keep();};bd.appendChild(row("This device's name",nm));
    if(CFG.snaps&&CFG.snaps.length){bd.appendChild(el("p","cl-say","In your Cloud:"));var ul=el("ul","cl-devs"),by={};
      CFG.snaps.forEach(function(s){if(!by[s.device]||(s.got||0)>(by[s.device].got||0))by[s.device]=s;});
      Object.keys(by).forEach(function(k){var s=by[k],li=el("li");li.appendChild(D.createTextNode((s.device===CFG.device?"This device ("+s.name+")":s.name)+" "));li.appendChild(el("span",null,"sent "+ago(s.got)+", "+mb(s.bytes||0)));ul.appendChild(li);});bd.appendChild(ul);}
    if(CFG.box&&CFG.box.self&&CFG.box.lan)bd.appendChild(el("p","cl-say","Your other devices connect to this computer at "+CFG.box.lan+" with its pairing code, "+CFG.box.code+"."));}));
  /* away from home */
  var more=el("details","cl-more");more.appendChild(el("summary",null,"Away from home: a sync file"));
  more.appendChild(el("p","cl-say","When your devices cannot reach each other, save a sync file here, sealed with your Cloud passphrase, into a folder you already sync or onto a USB stick, and bring it in on the other device. It is merged as the Cloud merges."));
  var fr=el("div","cl-row"),sv=btn("Save a sync file"),bi=btn("Bring in a sync file"),fi=el("input"),fs=sayEl();fi.type="file";fi.hidden=true;fi.accept=".sealed,.zip";fr.appendChild(sv);fr.appendChild(bi);fr.appendChild(fi);more.appendChild(fr);
  var fp=el("input");fp.type="password";fp.id="clFilePass";fp.autocomplete="current-password";more.appendChild(row("Cloud passphrase",fp));more.appendChild(fs);
  sv.onclick=function(){var v=fp.value;if(v.length<10){fs.className="cl-say bad";fs.textContent="Write your Cloud passphrase (ten characters or more).";return;}sv.disabled=true;goneNow();try{saveState();}catch(e){}fs.className="cl-say";fs.textContent="Gathering your work…";
    IngBackup.make({leave:LEAVE}).then(function(r){fs.textContent="Sealing…";return IngBackup.seal(r,v);}).then(function(r){var d=new Date(),nm="Ingenium sync "+CFG.name.replace(/[^A-Za-z0-9 ]+/g,"")+" "+d.getFullYear()+"-"+String(d.getMonth()+1).padStart(2,"0")+"-"+String(d.getDate()).padStart(2,"0")+".sealed";
        CFG.ids=lists(state);keep();return Promise.resolve(saveFileNative(nm,"application/octet-stream",r.blob)).then(function(){fs.textContent="Saved: "+nm+" ("+mb(r.size)+").";});})
      .catch(function(e){fs.className="cl-say bad";fs.textContent=String(e&&e.message||e);}).then(function(){sv.disabled=false;});};
  bi.onclick=function(){if(fp.value.length<10){fs.className="cl-say bad";fs.textContent="Write your Cloud passphrase first.";return;}fi.click();};
  fi.onchange=function(){var f=fi.files&&fi.files[0];fi.value="";if(!f)return;fs.className="cl-say";fs.textContent="Opening "+f.name+"…";
    IngBackup.open(f,{sealPassword:fp.value}).then(function(b){return fileIn(b);}).catch(function(e){fs.className="cl-say bad";fs.textContent=String(e&&e.message||e);});};
  c.appendChild(more);
  if(ready()){var off=btn("Turn the Cloud off on this device");off.style.marginTop="10px";off.onclick=function(){forget().then(paint);};c.appendChild(off);}}
var PASS="";
/* what travels, named as this edition has it (the public editions have no Lector, Career Studio or Fabrica) */
function what(){var a=["conversations","notes","projects","Focus"];if($("page-lector"))a.push("Lector");a.push("Blend");if($("page-career"))a.push("Vocatio");a.push("Build");if($("page-fabrica"))a.push("Fabrica");
  return a.slice(0,-1).join(", ")+" and "+a[a.length-1];}
/* a new Cloud is sent at once; a device joining one first brings in what is there (it is asked), and sends its own after */
function after(r){paint();if(r&&r.fresh&&r.fresh.length){note(r.fresh);return Promise.resolve();}return send().catch(function(){});}
/* a sync file: the same merge, this device's own things kept, deletions carried */
function fileIn(b,o){o=o||{};var here={};HERE_KEYS.forEach(function(k){here[k]=state[k]===undefined?undefined:JSON.parse(JSON.stringify(state[k]));});
  return IngBackup.apply(b,{mode:"merge",reload:false}).then(function(rep){HERE_KEYS.forEach(function(k){if(here[k]===undefined)delete state[k];else state[k]=here[k];});
    var removed=applyGone();try{delete state.v61.backup.restored;}catch(e){}try{saveState();}catch(e){}CFG.ids=lists(state);keep();
    try{sessionStorage.setItem(NOTE_KEY,JSON.stringify({from:(b.manifest&&b.manifest.platform&&b.manifest.platform.label)||"your sync file",problems:rep.problems||[],removed:removed}));}catch(e){}
    if(o.reload!==false)setTimeout(function(){try{location.reload();}catch(e){}},400);return rep;});}

function init(){hook();afterReload();try{card();}catch(e){}
  if(ready()&&CFG.auto){setTimeout(autoCheck,4000);setInterval(autoCheck,60000);}
  D.addEventListener("visibilitychange",function(){if(D.visibilityState==="hidden"&&ready()&&CFG.auto&&dirtyT){clearTimeout(dirtyT);dirtyT=null;autoSend();}});}
if(D.readyState==="loading")D.addEventListener("DOMContentLoaded",init);else init();
D.addEventListener("click",function(e){var t=e.target&&e.target.closest&&e.target.closest('.nav-btn[data-page="settings"]');if(t)setTimeout(card,0);},true);
W.IngCloud={busy:function(){return !!BUSY;},ready:ready,settings:function(){return JSON.parse(JSON.stringify(CFG));},connect:function(b,pass){return connect(b,pass);},send:send,check:check,bring:bring,forget:forget,
  lists:lists,goneNow:goneNow,applyGone:applyGone,fileIn:fileIn,seal:function(u8){return theKey().then(function(K){return seal(K,u8);});},last:function(){return LAST;},HERE_KEYS:HERE_KEYS.slice()};
})();
;try{window.__ingParts["p255"]="running";}catch(_){}
</script>
