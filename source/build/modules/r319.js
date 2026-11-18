<style id="r319-css">
/* ============ R319 · SEALED BETWEEN YOUR DEVICES (Ingenium 7.37, 18 November 2026) ============
   Her answer (18 November 2026), asked whether messages between her devices should be encrypted end to end: "Yes, encrypt them". Her word
   on the live preview (https://claude.ai/artifact/KRuQqSihghbSgFcHswJCEU, source/previews/pairing): "Approve, build it", and "I approve of
   the preview, please commit and push it everywhere".
   When a device pairs with a computer that seals (its hello says seal: 1; build/desktop/app_seal_737.py), the device makes a key pair of
   its own (ECDH P-256, the private half never leaves the browser's store), sends its public half with the code, and both screens show
   the same four words (32 bits, from both public keys). She confirms them on the computer; the two then hold a shared key (HKDF-SHA-256,
   AES-GCM 256-bit) that was never sent. From then on every request this device makes to that computer (models, the Cloud, runs, apps)
   goes sealed through /ingenium/sealed, without the code, and every byte of the answer comes back sealed, streams included.
   A device that cannot seal (a page without crypto.subtle) asks the same way, and the computer asks her whether to allow it with the
   code alone. On the computer, its devices say Sealed end to end or Pair once more (paired before 7.37); on a device, its computers do.
   Every sheet, word and key is raised and lifts under the pointer; Minimal or reduced motion keeps them still. */
.sl-veil{position:fixed;inset:0;z-index:2147483000;display:grid;place-items:center;padding:max(16px,env(safe-area-inset-top,0px)) max(16px,env(safe-area-inset-right,0px)) max(16px,env(safe-area-inset-bottom,0px)) max(16px,env(safe-area-inset-left,0px));background:rgba(20,12,34,.32);backdrop-filter:blur(3px);-webkit-backdrop-filter:blur(3px);animation:sl-in .25s ease both}
body[data-theme="night"] .sl-veil{background:rgba(0,0,0,.5)}
@keyframes sl-in{from{opacity:0}}
@keyframes sl-rise{from{opacity:0;transform:translateY(10px) scale(.98)}}
.sl-sheet{width:min(440px,100%);max-height:calc(100vh - 32px);overflow:auto;scrollbar-width:none;border-radius:24px;padding:20px;display:grid;gap:12px;color:var(--mr-ink1,#231a31);
  background:radial-gradient(ellipse 80% 90% at 70% 30%,var(--mr-slab0,#fdfbff) 0%,var(--mr-slab1,#ebe3f6) 82%);
  box-shadow:inset 0 1px 0 var(--mr-hi,#fff),0 0 0 1px var(--mr-ring,rgba(106,63,181,.14)),0 5px 0 var(--mr-slabEdge,#d6cae8),0 22px 38px var(--mr-amb2,rgba(40,22,68,.08)),0 4px 10px var(--mr-amb2,rgba(40,22,68,.08));
  animation:sl-rise .35s cubic-bezier(.34,1.3,.64,1) both;transition:transform .45s cubic-bezier(.34,1.3,.64,1)}
.sl-sheet::-webkit-scrollbar{display:none}
.sl-sheet:hover{transform:translateY(-2px)}
.sl-sheet h2{margin:0;font:600 22px/1.2 var(--serif,Georgia,serif);color:var(--mr-ink1,#231a31);text-wrap:balance}
.sl-sheet p{margin:0;color:var(--mr-ink2,#4c4360);font-size:13.5px;line-height:1.5}
.sl-eye{font:600 10.5px/1.25 var(--sans,system-ui);letter-spacing:.17em;text-transform:uppercase;color:var(--mr-ink3,#73698a)}
.sl-words{display:flex;flex-wrap:wrap;gap:8px}
.sl-word{font:600 17px/1 var(--serif,Georgia,serif);padding:10px 13px;border-radius:12px;color:var(--mr-ink1,#231a31);background:linear-gradient(var(--mr-keyA,#fff),var(--mr-keyB,#f4f0fa));box-shadow:var(--mr-sh-key);transition:transform .35s cubic-bezier(.34,1.5,.64,1),box-shadow .2s}
.sl-word:hover{transform:translateY(-2px) rotate(-1deg);box-shadow:var(--mr-sh-keyhi)}
.sl-word i{font:600 11px/1 var(--sans,system-ui);font-style:normal;color:var(--mr-ink3,#73698a);margin-right:6px}
.sl-row{display:flex;flex-wrap:wrap;gap:9px;align-items:center}
.sl-key{display:inline-flex;align-items:center;justify-content:center;min-height:32px;padding:0 14px;border:0;border-radius:10px;cursor:pointer;white-space:nowrap;font:600 12.5px/1 var(--sans,system-ui);color:var(--mr-ink1,#231a31);
  background:linear-gradient(var(--mr-keyA,#fff),var(--mr-keyB,#f4f0fa));box-shadow:var(--mr-sh-key);transition:transform .35s cubic-bezier(.34,1.5,.64,1),box-shadow .2s}
.sl-key:hover{transform:translateY(-2px);box-shadow:var(--mr-sh-keyhi)}
.sl-key:active{transform:translateY(1px);box-shadow:var(--mr-sh-keypress);transition-duration:.07s}
.sl-key.pri{background:linear-gradient(var(--mr-pa,#7348be),var(--mr-pb,#5d37a1));color:#fff;text-shadow:0 1px 1px rgba(30,10,60,.3);box-shadow:var(--mr-sh-pkey)}
.sl-key.pri:hover{box-shadow:var(--mr-sh-pkeyhi)}
.sl-key.amb{background:linear-gradient(rgba(232,144,42,.16),rgba(232,144,42,.16)),linear-gradient(var(--mr-keyA,#fff),var(--mr-keyB,#f4f0fa));color:#b4600f}
body[data-theme="night"] .sl-key.amb{background:linear-gradient(rgba(240,176,96,.15),rgba(240,176,96,.15)),linear-gradient(var(--mr-keyA),var(--mr-keyB));color:#f0b060}
.sl-key:focus-visible{outline:3px solid var(--mr-acc,#6a3fb5);outline-offset:2px}
.sl-chip{display:inline-flex;align-items:center;gap:5px;font:600 11px/1 var(--sans,system-ui);padding:5px 9px;border-radius:999px;white-space:nowrap;margin-top:4px}
.sl-chip.ok{background:rgba(31,157,99,.14);color:#1a7f50} .sl-chip.warn{background:rgba(232,144,42,.16);color:#b4600f} .sl-chip.sky{background:rgba(74,160,240,.16);color:#2f6fd0}
body[data-theme="night"] .sl-chip.ok{background:rgba(64,192,128,.15);color:#6fd8a2} body[data-theme="night"] .sl-chip.warn{background:rgba(240,176,96,.15);color:#f0b060} body[data-theme="night"] .sl-chip.sky{background:rgba(124,196,255,.15);color:#7cc4ff}
.sl-wait{display:flex;align-items:center;gap:8px;color:var(--mr-ink2,#4c4360);font-size:13px}
.sl-dot{width:8px;height:8px;border-radius:50%;background:#2f6fd0;animation:sl-pulse 1.4s ease-in-out infinite}
@keyframes sl-pulse{50%{opacity:.25;transform:scale(.7)}}
.sl-seal{display:grid;justify-items:center;gap:6px;text-align:center}
.sl-seal svg{width:58px;height:58px;fill:none;stroke:#1a7f50;stroke-width:1.6;stroke-linecap:round;stroke-linejoin:round}
body[data-theme="night"] .sl-seal svg{stroke:#6fd8a2}
.sl-tagline{display:flex;flex-wrap:wrap;gap:6px;align-items:center}
body.ing-minimal .sl-sheet,body.ing-minimal .sl-key,body.ing-minimal .sl-word{transition:none!important;transform:none!important;animation:none!important}
@media (prefers-reduced-motion:reduce){.sl-sheet,.sl-key,.sl-word,.sl-veil,.sl-dot{transition:none!important;transform:none!important;animation:none!important}}
</style>
<script>try{(window.__ingParts=window.__ingParts||{})["p319"]="started";}catch(_){}
/* R319 · sealed between your devices: see the note at the top of its styles. window.IngSealing */
(function(){"use strict";
var W=window,D=document;if(W.IngSealing)return;
var WORDS=["acorn","amber","anchor","apple","apron","arch","arrow","atlas","attic","autumn","badge","bagel","bakery","bamboo","banjo","barley","basil","basket","beacon","beach","bean","bell","berry","birch","biscuit","blanket","bloom","blossom","boat","bonnet","book","boot","bottle","branch","bread","breeze","brick","bridge","brook","brush","bubble","bucket","button","cabin","cactus","cake","camel","candle","canoe","canvas","canyon","cape","carrot","castle","cedar","cello","chalk","cherry","chess","cider","cinnamon","circle","cliff","clock","cloud","clover","coast","cobalt","coconut","comet","compass","copper","coral","cotton","cradle","crane","crayon","creek","cricket","crystal","cup","daisy","dawn","delta","desert","dolphin","dove","dragon","drum","dune","eagle","easel","echo","elbow","ember","falcon","feather","fern","fiddle","field","fig","flame","flute","forest","fossil","fountain","fox","garden","garnet","ginger","glacier","globe","glove","granite","grape","harbour","harp","hazel","heron","hill","honey","horizon","iris","island","ivory","jacket","jasmine","jewel","kayak","kettle","kite","koala","ladder","lagoon","lake","lantern","lark","lemon","lilac","lily","linen","lion","lotus","lunar","maple","marble","meadow","melon","mint","mirror","mitten","moon","moss","mountain","muffin","nectar","needle","nest","noodle","nutmeg","oak","oasis","ocean","olive","onion","opal","orbit","orchard","otter","owl","paddle","palm","panda","paper","parrot","pasta","peach","peanut","pearl","pebble","pencil","penguin","pepper","piano","pigeon","pillow","pine","planet","plum","pocket","pony","poppy","pottery","prairie","pumpkin","quail","quartz","quill","quilt","rabbit","radish","rain","raven","reef","ribbon","river","robin","rocket","rose","saddle","saffron","sail","salmon","sand","satin","scarf","shell","silver","sketch","sky","sled","snow","sparrow","spice","spoon","spring","spruce","star","stone","straw","stream","sugar","summit","sun","swan","teapot","thistle","thunder","tiger","timber","tulip","tunnel","turtle","valley","velvet","violet","volcano","walnut","wave","whale","wheat","willow","window","winter","wren","yarn"];
var TE=new TextEncoder(),TD=new TextDecoder();
function S(){try{if(W.isSecureContext===false)return null;return (W.crypto&&W.crypto.subtle)||null;}catch(e){return null;}}
function b64e(u){u=u instanceof Uint8Array?u:new Uint8Array(u);var s="",i;for(i=0;i<u.length;i+=32768)s+=String.fromCharCode.apply(null,u.subarray(i,i+32768));return btoa(s);}
function b64d(s){var b=atob(String(s||"")),u=new Uint8Array(b.length);for(var i=0;i<b.length;i++)u[i]=b.charCodeAt(i);return u;}
function cat(){var n=0,i;for(i=0;i<arguments.length;i++)n+=arguments[i].length;var o=new Uint8Array(n),k=0;for(i=0;i<arguments.length;i++){o.set(arguments[i],k);k+=arguments[i].length;}return o;}
function cmp(a,b){for(var i=0;i<Math.min(a.length,b.length);i++){if(a[i]!==b[i])return a[i]-b[i];}return a.length-b.length;}
function sorted2(a,b){return cmp(a,b)<=0?[a,b]:[b,a];}
function rnd(n){var u=new Uint8Array(n);W.crypto.getRandomValues(u);return u;}
function toast(t){try{(W.ingToast||W.toast)(t);}catch(e){}}
function esc(s){return String(s==null?"":s).replace(/[&<>"]/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c];});}
function shell(){try{var a=typeof shellApi==="function"?shellApi():null;return a&&typeof a.seal_pending==="function"?a:null;}catch(e){return null;}}
function me(){try{return (W.IngLend&&IngLend.state().me)||{};}catch(e){return {};}}
function originOf(u){try{var x=String(u||"");if(!/^[a-z]+:\/\//i.test(x))x="http://"+x;return new URL(x).origin;}catch(e){return "";}}

/* ---------- the store: this device's key pair, and one sealed key per computer (IndexedDB "ingenium_seal", store "k") ---------- */
var DB=null;
function db(){if(DB)return DB;DB=new Promise(function(res,rej){var r;try{r=indexedDB.open("ingenium_seal",1);}catch(e){rej(e);return;}
  r.onupgradeneeded=function(){if(!r.result.objectStoreNames.contains("k"))r.result.createObjectStore("k");};
  r.onsuccess=function(){res(r.result);};r.onerror=function(){rej(r.error);};});DB.catch(function(){DB=null;});return DB;}
function kget(k){return db().then(function(d){return new Promise(function(res,rej){var t=d.transaction("k","readonly"),q=t.objectStore("k").get(k);q.onsuccess=function(){res(q.result||null);};q.onerror=function(){rej(q.error);};});});}
function kput(k,v){return db().then(function(d){return new Promise(function(res,rej){var t=d.transaction("k","readwrite");t.objectStore("k").put(v,k);t.oncomplete=function(){res(v);};t.onerror=function(){rej(t.error);};});});}
function kdel(k){return db().then(function(d){return new Promise(function(res){var t=d.transaction("k","readwrite");t.objectStore("k").delete(k);t.oncomplete=function(){res();};t.onerror=function(){res();};});});}
function kall(){return db().then(function(d){return new Promise(function(res,rej){var t=d.transaction("k","readonly"),s=t.objectStore("k"),a=s.getAll(),b=s.getAllKeys();t.oncomplete=function(){res(b.result.map(function(k,i){return [k,a.result[i]];}));};t.onerror=function(){rej(t.error);};});});}
var MINE=null;
function mine(){if(MINE)return MINE;var s=S();if(!s)return Promise.reject(new Error("no seal here"));
  MINE=kget("me").then(function(r){if(r&&r.kp&&r.pub)return r;
    return s.generateKey({name:"ECDH",namedCurve:"P-256"},false,["deriveBits"]).then(function(kp){return s.exportKey("raw",kp.publicKey).then(function(raw){return kput("me",{kp:kp,pub:b64e(raw),at:Date.now()});});});});
  MINE.catch(function(){MINE=null;});return MINE;}
function words(a,b){var p=sorted2(a,b);return S().digest("SHA-256",cat(TE.encode("ingenium-pair-v1"),p[0],p[1])).then(function(h){h=new Uint8Array(h);return [WORDS[h[0]],WORDS[h[1]],WORDS[h[2]],WORDS[h[3]]];});}
function derive(myPair,myPub,peerRaw){var s=S();
  return s.importKey("raw",peerRaw,{name:"ECDH",namedCurve:"P-256"},false,[]).then(function(peer){return s.deriveBits({name:"ECDH",public:peer},myPair.privateKey,256);})
    .then(function(bits){var p=sorted2(myPub,peerRaw);return Promise.all([s.importKey("raw",bits,"HKDF",false,["deriveKey"]),s.digest("SHA-256",cat(TE.encode("ingenium-seal-v1"),p[0],p[1]))]);})
    .then(function(x){return s.deriveKey({name:"HKDF",hash:"SHA-256",salt:x[1],info:TE.encode("messages")},x[0],{name:"AES-GCM",length:256},false,["encrypt","decrypt"]);});}

/* the computers this device holds a sealed key for, by every address they gave */
var REC={},BYO={};
function load(){return kall().then(function(rows){REC={};BYO={};rows.forEach(function(r){if(String(r[0]).indexOf("c:")===0&&r[1]&&r[1].key){REC[r[1].id]=r[1];(r[1].origins||[]).forEach(function(o){BYO[o]=r[1].id;});}});return REC;},function(){return REC;});}
var LOADED=null;function ready(){if(!LOADED)LOADED=S()?load():Promise.resolve(REC);return LOADED;}
function learn(){try{(IngLend.state().computers||[]).forEach(function(c){var r=REC[c.id];if(!r)return;[c.base].concat(c.addrs||[]).forEach(function(a){var o=originOf(a);if(o&&!BYO[o]){BYO[o]=c.id;if(r.origins.indexOf(o)<0)r.origins.push(o);}});});}catch(e){}}
function recFor(url){var o=originOf(url);if(!o)return null;if(!BYO[o])learn();var id=BYO[o];return id?REC[id]||null:null;}

/* ---------- netFetch: pairing becomes sealed pairing; every request to a sealed computer goes sealed ---------- */
var raw0=W.netFetch;
function result(status,text,ctype,hdrs){return {ok:status>=200&&status<300,status:status,contentType:ctype||"",
  text:function(){return Promise.resolve(text);},json:function(){try{return Promise.resolve(JSON.parse(text));}catch(e){return Promise.reject(new Error("The answer was not readable data."));}},
  headers:{get:function(n){return (hdrs||{})[String(n).toLowerCase()]||null;}}};}
function pathOf(url){try{var u=new URL(url);return u.pathname+u.search;}catch(e){return "/";}}
var SKIP=/^\/(ingenium\/hello|ingenium\/pair2|ingenium\/sealed|apps\/)/;
function sealedFetch(rec,url,o){var s=S(),dev=me().id||"",rid=b64e(rnd(12)).replace(/[^A-Za-z0-9]/g,"").slice(0,16)||String(Date.now());
  var hdr={},k;for(k in (o.headers||{}))if(!/^authorization$/i.test(k))hdr[k]=o.headers[k];
  var bodyStr=o.body==null?"":String(o.body);
  var inner={m:(o.method||"GET").toUpperCase(),p:pathOf(url),h:hdr,b:bodyStr?b64e(TE.encode(bodyStr)):"",t:Date.now(),r:rid};
  var iv=rnd(12),ad="ingenium-seal-v1|res|"+dev+"|"+rid+"|";
  var n=0,headDone=false,headBuf=new Uint8Array(0),status=0,hdrs={},ctype="",all="",dec=new TextDecoder(),ended=false,bad=null,chain=Promise.resolve(),buf="";
  function body(u){var t=dec.decode(u,{stream:true});if(t){all+=t;if(o.onChunk)try{o.onChunk(t);}catch(e){}}}
  function take(u){if(headDone){body(u);return;}headBuf=cat(headBuf,u);var i,s4=-1;for(i=0;i+3<headBuf.length;i++){if(headBuf[i]===13&&headBuf[i+1]===10&&headBuf[i+2]===13&&headBuf[i+3]===10){s4=i;break;}}
    if(s4<0)return;var head=TD.decode(headBuf.subarray(0,s4)).split("\r\n"),m=/^HTTP\/\d\.\d\s+(\d+)/.exec(head[0]||"");status=m?+m[1]:500;
    head.slice(1).forEach(function(l){var j=l.indexOf(":");if(j>0)hdrs[l.slice(0,j).trim().toLowerCase()]=l.slice(j+1).trim();});ctype=hdrs["content-type"]||"";headDone=true;
    var rest=headBuf.subarray(s4+4);headBuf=null;if(rest.length)body(rest);}
  function line(l){if(!l)return;var x=n++;chain=chain.then(function(){if(bad||ended)return;var u=b64d(l);
      return s.decrypt({name:"AES-GCM",iv:u.subarray(0,12),additionalData:TE.encode(ad+x),tagLength:128},rec.key,u.subarray(12)).then(function(p){p=new Uint8Array(p);if(p[0]===1){ended=true;return;}take(p.subarray(1));});})
    .catch(function(e){bad=bad||new Error("An answer from "+(rec.name||"your computer")+" could not be opened with this device's key.");});}
  function feed(t){buf+=t;var i;while((i=buf.indexOf("\n"))>=0){var l=buf.slice(0,i).trim();buf=buf.slice(i+1);line(l);}}
  return s.encrypt({name:"AES-GCM",iv:iv,additionalData:TE.encode("ingenium-seal-v1|req|"+dev),tagLength:128},rec.key,TE.encode(JSON.stringify(inner))).then(function(ct){
    return raw0(originOf(url)+"/ingenium/sealed",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({v:1,d:dev,i:b64e(iv),c:b64e(ct)}),abort:o.abort,timeout:o.timeout,onChunk:feed});})
    .then(function(r){if(r.status!==200){return r.text().then(function(t){var j=null;try{j=JSON.parse(t);}catch(e){}if(j&&j.pair_sealed){rec.stale=1;}return result(r.status,t,r.contentType,{});});}
      return r.text().then(function(t){if(t&&!all&&!n)feed(t);if(buf.trim())line(buf.trim());buf="";return chain;}).then(function(){
        if(bad)throw bad;if(!ended)throw new Error("The answer from "+(rec.name||"your computer")+" was cut off.");
        return result(status,all+dec.decode(),ctype,hdrs);});});}

function sealedPair(url,o){var b=originOf(url),hello=null,can=!!S();
  return raw0(b+"/ingenium/hello",{timeout:8}).then(function(r){return r.json();}).catch(function(){return null;}).then(function(h){hello=h;
    if(!h||!h.seal)return raw0(url,o);       /* a computer that does not seal yet: pairing as before */
    var body={};try{body=JSON.parse(String(o.body||"{}"));}catch(e){}
    return (can?mine():Promise.resolve(null)).then(function(my){if(my)body.pub=my.pub;
      return raw0(b+"/ingenium/pair2",{method:"POST",headers:o.headers,body:JSON.stringify(body),timeout:15}).then(function(r){
        if(!r.ok)return r;return r.json().then(function(j){return waitFor(b,o,h,j,my);});});});});}
function waitFor(b,o,h,j,my){var name=h.computer||j.computer||"your computer",cancelled=false,sheet=null,ws=null;
  var p=my?words(b64d(my.pub),b64d(j.pub)):Promise.resolve(null);
  return p.then(function(w){ws=w;sheet=deviceSheet(name,w,function(){cancelled=true;});
    var t0=Date.now();
    function poll(){if(cancelled)return Promise.resolve(result(499,JSON.stringify({error:{message:"Pairing was stopped on this device."}}),"application/json"));
      if(Date.now()-t0>300000){sheet.say("no","No answer from "+name+" in five minutes, so nothing was paired. Pair again when you are at both.");return Promise.resolve(result(408,JSON.stringify({error:{message:"No answer from "+name+" in five minutes."}}),"application/json"));}
      return new Promise(function(r){setTimeout(r,1500);}).then(function(){if(cancelled)return poll();
        return raw0(b+"/ingenium/pair2/state?rid="+encodeURIComponent(j.rid),{headers:o.headers,timeout:10}).then(function(r){return r.json().then(function(s){return {r:r,s:s};});},function(){return {s:{state:"wait"}};});})
        .then(function(x){var s=x.s||{};if(s.state==="wait")return poll();
          if(s.state==="ok"){if(!my){sheet.say("plain","Paired with "+name+", unsealed: this device cannot seal, so the code alone guards what passes between them.");return result(200,JSON.stringify(s),"application/json");}
            return derive(my.kp,b64d(my.pub),b64d(j.pub)).then(function(key){var origins=[b].concat((s.addresses||[]).map(originOf)).filter(function(v,i,a){return v&&a.indexOf(v)===i;});
              var rec={id:s.id||j.id,name:name,key:key,pub:j.pub,origins:origins,at:Date.now()};REC[rec.id]=rec;origins.forEach(function(x){BYO[x]=rec.id;});
              return kput("c:"+rec.id,rec).then(function(){sheet.say("ok",name);return result(200,JSON.stringify(s),"application/json");});});}
          sheet.say("no","Not paired. The words were refused on "+name+", so nothing was shared. If they differed, someone else may have answered first: make a new code on "+name+", then pair again.");
          return result(403,JSON.stringify({error:{message:"Not paired: the words were refused on "+name+"."}}),"application/json");});}
    return poll();});}

var nn=function(url,o){o=o||{};var u=String(url||""),pth=pathOf(u),meth=(o.method||"GET").toUpperCase();
  if(!S()&&!/\/ingenium\/pair$/.test(pth.split("?")[0]))return raw0(url,o);
  return ready().then(function(){
    if(meth==="POST"&&/^\/ingenium\/pair$/.test(pth.split("?")[0]))return sealedPair(u,o);
    if(SKIP.test(pth))return raw0(url,o);
    var rec=recFor(u);if(!rec||rec.stale)return raw0(url,o);
    return sealedFetch(rec,u,o);});};
if(typeof raw0==="function"){try{Object.keys(raw0).forEach(function(k){nn[k]=raw0[k];});}catch(e){}nn.__r319=true;W.netFetch=nn;try{netFetch=nn;}catch(e){}}

/* ---------- the device's sheet: the four words, waiting for the computer ---------- */
var SHIELD='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.8l7.5 3v5.6c0 4.6-3.2 8.4-7.5 9.8-4.3-1.4-7.5-5.2-7.5-9.8V5.8z"/><path d="M8.8 12.2l2.2 2.2 4.4-4.6"/></svg>';
function wordsHtml(w){return '<div class="sl-words">'+(w||[]).map(function(x,i){return '<span class="sl-word"><i>'+(i+1)+'</i>'+esc(x)+'</span>';}).join("")+'</div>';}
function veil(id){var old=D.getElementById(id);if(old)old.remove();var v=D.createElement("div");v.className="sl-veil";v.id=id;var sh=D.createElement("div");sh.className="sl-sheet";sh.setAttribute("role","dialog");sh.setAttribute("aria-modal","true");v.appendChild(sh);D.body.appendChild(v);return {v:v,sh:sh};}
function deviceSheet(name,w,onCancel){var x=veil("sealPair"),sh=x.sh;sh.setAttribute("aria-label","Pair with "+name);
  function cancelKey(t){var k=D.createElement("button");k.type="button";k.className="sl-key";k.textContent=t;return k;}
  function waiting(){sh.innerHTML='<div class="sl-eye">Pairing, sealed end to end</div><h2>Check '+esc(name)+'</h2>'+(w?'<p>It shows four words. Confirm there that they are these, in this order:</p>'+wordsHtml(w):'<p>This device cannot seal what it sends, so '+esc(name)+' asks you whether to allow it with the code alone.</p>')+'<div class="sl-wait"><span class="sl-dot"></span>Waiting for '+esc(name)+'</div><div class="sl-row" id="sealPairKeys"></div>';
    var k=cancelKey("Stop pairing");k.onclick=function(){onCancel();x.v.remove();};sh.querySelector("#sealPairKeys").appendChild(k);try{k.focus();}catch(e){}}
  waiting();
  return {say:function(kind,text){if(kind==="ok"){sh.innerHTML='<div class="sl-seal">'+SHIELD+'<h2>Paired with '+esc(text)+'</h2><span class="sl-chip ok">Sealed end to end</span><p>Its models, the Cloud, runs and the apps it sends you: sealed with a key only these two devices hold.</p></div>';setTimeout(function(){x.v.remove();},2600);return;}
      sh.innerHTML='<div class="sl-eye">Pairing</div><h2>'+(kind==="plain"?"Paired, unsealed":"Not paired")+'</h2><p>'+esc(text)+'</p><div class="sl-row" id="sealPairKeys"></div>';var k=cancelKey("Close");k.onclick=function(){x.v.remove();};sh.querySelector("#sealPairKeys").appendChild(k);try{k.focus();}catch(e){}}};}

/* ---------- the computer's sheet: a device asks; she compares the words ---------- */
var ASK={shown:"",busy:false,timer:0},CST=null;
function askSheet(a){var api=shell();if(!api)return;ASK.shown=a.rid;var x=veil("sealAsk"),sh=x.sh,plain=!(a.words&&a.words.length),nm=a.name||"A device";sh.setAttribute("aria-label",nm+" asks to pair");
  sh.innerHTML='<div class="sl-tagline"><span class="sl-eye">Your devices</span><span class="sl-chip sky">Waiting for you</span></div><h2>'+esc(nm)+' asks to pair</h2>'
    +(plain?'<p>It cannot seal what it sends (its Ingenium is older, or it does not allow it). Allowed, what passes between them is guarded by the code alone, as before 7.37.</p>'
      :'<p>Check that '+esc(nm)+' shows these same four words, in this order.</p>'+wordsHtml(a.words))+'<div class="sl-row" id="sealAskKeys"></div>';
  var row=sh.querySelector("#sealAskKeys");
  function key(t,cls,yes){var k=D.createElement("button");k.type="button";k.className="sl-key"+(cls?" "+cls:"");k.textContent=t;k.onclick=function(){if(ASK.busy)return;ASK.busy=true;
      Promise.resolve().then(function(){return api.seal_answer(a.rid,yes);}).then(function(r){ASK.busy=false;x.v.remove();ASK.shown="";
        if(r&&r.ok===false){toast(r.error||"That device is no longer waiting.");return;}
        toast(yes?(plain?nm+" is paired, unsealed.":nm+" is paired, sealed end to end."):"Not paired. Nothing was shared with "+nm+".");
        try{if(typeof W.lkPaint==="function")W.lkPaint();}catch(e){}poll(true);},function(){ASK.busy=false;});};return k;}
  row.appendChild(key(plain?"Allow it with the code alone":"They match","pri",true));row.appendChild(key(plain?"Refuse":"They do not match","",false));
  try{row.firstChild.focus();}catch(e){}}
function poll(now){var api=shell();if(!api)return;clearTimeout(ASK.timer);
  Promise.resolve().then(function(){return api.seal_pending();}).then(function(r){var asks=(r&&r.asks)||[];
      var cur=D.getElementById("sealAsk");if(cur&&!asks.some(function(a){return a.rid===ASK.shown;})){cur.remove();ASK.shown="";}
      if(asks.length&&!D.getElementById("sealAsk"))askSheet(asks[0]);return api.seal_status();}).then(function(st){if(st)CST=st;},function(){})
    .then(function(){ASK.timer=setTimeout(poll,D.hidden?6000:2000);});}

/* ---------- marks: on the computer, each device; on a device, each computer ---------- */
function chip(cls,t,title){var c=D.createElement("span");c.className="sl-chip "+cls;c.textContent=t;if(title)c.title=title;return c;}
function mark(row,d){try{var tx=row.children[1];if(!tx)return;if(d.sealed)tx.appendChild(chip("ok","Sealed end to end"));
    else if(d.legacy){var k=D.createElement("button");k.type="button";k.className="sl-key amb";k.style.marginTop="6px";k.textContent="Pair once more";
      k.title="Paired before 7.37: what passes between them is guarded by the code alone";k.onclick=function(){toast("On "+(d.name||"that device")+", open Settings, Models and AI, Your devices, and pair this computer again with its code. You compare four words on both screens, then it is sealed end to end.");};tx.appendChild(k);}}catch(e){}}
var HELLO={};
function markComp(r,comp,repair){try{var rec=REC[comp.id];if(rec&&!rec.stale){r.appendChild(chip("ok","Sealed end to end"));return;}
    if(!S())return;var h=HELLO[comp.id];
    var put=function(){if(!(HELLO[comp.id]||{}).seal)return;if(r.querySelector(".sl-key.amb"))return;var k=D.createElement("button");k.type="button";k.className="sl-key amb";k.textContent="Pair once more";
      k.title=rec&&rec.stale?comp.name+" no longer knows this device's key":"Paired before 7.37: guarded by the code alone";k.onclick=function(){if(rec&&rec.stale){kdel("c:"+comp.id);delete REC[comp.id];}if(typeof repair==="function")repair();};r.appendChild(k);};
    if(h)put();else raw0((comp.base||"")+"/ingenium/hello",{timeout:5}).then(function(x){return x.json();}).then(function(j){HELLO[comp.id]=j||{};put();},function(){HELLO[comp.id]={};});}catch(e){}}

/* ---------- what the Security room shows (r318): this computer's devices, or this device's computers ---------- */
function paired(){try{return (IngLend.state().computers||[]).filter(function(c){return c&&c.id&&!/^addr:/.test(c.id);});}catch(e){return [];}}
function summary(){var api=shell(),list=paired(),sealed=list.filter(function(c){return REC[c.id]&&!REC[c.id].stale;}).length;
  return {computer:!!api,can:!!S(),lib:CST?!!CST.lib:null,devSealed:CST?CST.sealed:0,devLegacy:CST?CST.legacy:0,computers:list.length,sealed:sealed};}
function state(){var x=summary();
  if(x.computer&&x.lib===false)return "off";
  if(x.computer&&x.devLegacy>0)return "off";
  if(!x.can&&x.computers)return "off";
  if(x.computers>x.sealed)return "off";
  return "on";}
function describe(){var x=summary(),out=[];
  if(x.computer){if(x.lib===false)out.push("This computer's app cannot seal yet: it lacks its encryption library. Update Ingenium on it.");
    else{out.push("Every device that pairs with this computer is sealed end to end: both screens show four words, and you confirm them here.");
      if(x.devSealed||x.devLegacy)out.push(x.devSealed+(x.devSealed===1?" device is":" devices are")+" sealed"+(x.devLegacy?"; "+x.devLegacy+" paired before 7.37 still "+(x.devLegacy===1?"uses":"use")+" the code alone, and "+(x.devLegacy===1?"says":"say")+" Pair once more in Settings, Models and AI, Your devices.":"."));}}
  if(!x.can)out.push("This device cannot seal: its page does not allow the browser's encryption here. It can still pair if you allow it on the computer, guarded by the code alone.");
  else if(x.computers)out.push(x.sealed+" of "+x.computers+" paired "+(x.computers===1?"computer":"computers")+" sealed"+(x.computers>x.sealed?"; the others say Pair once more.":"."));
  else if(!x.computer)out.push("When this device pairs with a computer, the two are sealed end to end: both screens show four words, and you confirm them on the computer.");
  return out;}
function computerState(){var api=shell();if(!api)return Promise.resolve(null);return Promise.resolve().then(function(){return api.seal_status();}).then(function(st){if(st)CST=st;return st;}).catch(function(){return null;});}
/* Reset everything (Settings, Your data) clears this store too: this device's key pair and its computers' keys */
D.addEventListener("click",function(e){var t=e.target&&e.target.closest&&e.target.closest("#rGo");if(!t||!W.__ingResetting&&!D.getElementById("rGo"))return;
  var go=function(){try{indexedDB.deleteDatabase("ingenium_seal");}catch(_){}};if(DB)DB.then(function(d){try{d.close();}catch(_){}go();},go);else go();},true);

W.IngSealing={can:function(){return !!S();},ready:ready,mark:mark,markComp:markComp,poll:poll,summary:summary,state:state,describe:describe,computerState:computerState,
  computers:function(){return Object.keys(REC).map(function(k){var r=REC[k];return {id:r.id,name:r.name,origins:r.origins.slice(),at:r.at,stale:!!r.stale};});},
  forget:function(id){delete REC[id];Object.keys(BYO).forEach(function(o){if(BYO[o]===id)delete BYO[o];});return kdel("c:"+id);},words:function(a,b){return words(b64d(a),b64d(b));},_raw:function(){return raw0;}};
ready();
if(shell()){computerState();if(D.readyState==="loading")D.addEventListener("DOMContentLoaded",function(){poll();});else poll();}
else W.addEventListener("pywebviewready",function(){if(shell())poll();});
})();
try{window.__ingParts["p319"]="ok";}catch(_){}
</script>
