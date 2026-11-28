<style id="r349-css">
/* ============ R349 · YOUR APPS SIGNED WHEN SHIPPED, PART ONE (Ingenium 7.60, 21 November 2026) ============
   The Security room's promise (modules/r318.js, approved on the live preview of 18 November 2026): "your owner key's signature on every
   package, the computer ones too, so a changed file is caught and the app refuses to open and says so." Part one, in Fabrica's Ship, in
   the master edition with her owner key on this device (PermitCore's own, "key" in the store offline_owner):
   - Package details: Signed with your owner key, on for every app unless she turns it off for one.
   - Shipping: her owner key's password is asked once, in a card of the room's own kind, and the key is held in memory for two minutes
     after the last package, then dropped. Not now makes nothing. On a device without her owner key, or with one Ingenium does not
     carry (so no copy could check it), what she makes is made unsigned, and Ingenium says so; the Ship card shows Signed only on what
     was signed.
   - Every package made from the app's page carries the signature inside that page: <meta name="ingenium-signature">, over the page
     with that tag's content and the build number a device build stamps in (<meta name="ingenium-build">) left empty, as Ingenium's own
     check reads its page (desktop/app_self_758.py). So the one page, the APK, the IPA, the Mac and the Windows apps all carry it.
   - The web app (however it was made: r111's, or r178's from the app's templates or Ingenium's family, with r330's additions) also
     carries signature.ingsig (every file in it, signed together), and a check at the head of its service worker: when the worker is
     installed it compares every file with the signature; a changed or missing one, and the app is answered with a page that says which
     file, instead of opening. What it found is kept in the app's own IndexedDB, apart from the caches its worker may clear. The first
     visit, before the worker is installed, opens as the browser fetched it; from then on the check stands.
   - Check a package (the Ship card): a page or a web app's zip, read here: Signed by you, as signed; or changed, and which file; or not
     signed. Any copy of Ingenium checks with the owner's public keys every copy carries (IngPermit.keys).
   Signatures: ECDSA P-256 with SHA-256 over PermitCore's fixed order (canon), as the release signatures of r348.
   Part two (modules/r352.js, 7.62): the Mac, Windows, Android and iPhone apps check the page at every start (the check compiled into
   their shells, source/shells), and an app brought into Ingenium's library is checked as it comes in. Still not yet, said in the room:
   an app built from its build kit, on GitHub or in the terminal, carries the signature but does not check it at start.
   Its card rises in, and its keys lift and sink, as the room's own; Minimal or reduced motion keeps them still.
   window.IngAppSign: plain(u8), signPage(html, ctx), check(u8, name), checkFile(), packageRow(box, r, pref), lineFor(r), signedNote(n, k)
   Shown to her as eight pictures one by one at full size (previews/app_sign: the room, Package details, the card, the Ship card, Check a
   package signed and changed, the web app's refusal by day and by night), and her word (20 November 2026): "I approve of your
   preview, please commit and push it everywhere and continue working on my requests." */
#r349Ask{--sc-ck:inset 0 1.5px 0 rgba(255,255,255,.95),inset 0 -3px 5px rgba(60,30,90,.16),0 1px 1px rgba(40,20,70,.3),0 3px 4px rgba(40,20,70,.24),0 6px 9px rgba(40,20,70,.18);
  --sc-ckhi:inset 0 1.5px 0 #fff,inset 0 -3px 5px rgba(60,30,90,.14),0 3px 4px rgba(40,20,70,.24),0 9px 16px rgba(40,20,70,.2),0 16px 26px rgba(40,20,70,.14);
  position:fixed;inset:0;z-index:2147482000;display:flex;align-items:center;justify-content:center;padding:18px;background:rgba(22,18,30,.42)}
#r349Ask .sa-card{width:min(470px,94vw);border-radius:22px;padding:24px 22px 20px;background:linear-gradient(180deg,#ffffff,#f7f5fa 62%,#efeaf4);color:#221a2e;display:flex;flex-direction:column;gap:10px;font:14px/1.5 -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif;
  box-shadow:inset 0 2px 0 rgba(255,255,255,.45),inset -2px 0 0 #d3cbe0,inset 0 -3px 0 #d3cbe0,0 0 0 1px rgba(40,22,68,.1),0 9px 12px -7px rgba(40,22,68,.18),0 22px 40px -14px rgba(40,22,68,.26);animation:r349Rise .4s cubic-bezier(.2,.9,.25,1.2) backwards;transition:transform .3s cubic-bezier(.2,.9,.25,1.2);margin:0}
#r349Ask .sa-card:hover{transform:translateY(-3px)}
body[data-theme="night"] #r349Ask{--sc-ck:inset 0 1.5px 0 rgba(255,255,255,.16),inset 0 -3px 5px rgba(0,0,0,.45),0 1px 1px rgba(0,0,0,.65),0 3px 4px rgba(0,0,0,.55),0 6px 9px rgba(0,0,0,.45);
  --sc-ckhi:inset 0 1.5px 0 rgba(255,255,255,.2),inset 0 -3px 5px rgba(0,0,0,.4),0 3px 4px rgba(0,0,0,.6),0 9px 16px rgba(0,0,0,.5),0 16px 26px rgba(0,0,0,.4)}
body[data-theme="night"] #r349Ask .sa-card{background:linear-gradient(180deg,#342a4c,#2c2341 62%,#241c36);color:#ece6f6;box-shadow:inset 0 2px 0 rgba(255,255,255,.12),inset -2px 0 0 #140e1c,inset 0 -3px 0 #140e1c,0 0 0 1px rgba(0,0,0,.4),0 22px 40px -14px rgba(0,0,0,.6)}
#r349Ask .eye{font:700 10.5px/1 inherit;letter-spacing:.12em;text-transform:uppercase;opacity:.65;text-align:center}
#r349Ask h2{font:700 22px/1.2 "Iowan Old Style","Palatino Linotype",Palatino,Georgia,serif;text-align:center;margin:0}
#r349Ask p{margin:0;font-size:13.5px;opacity:.82;text-align:center}
#r349Ask .r349-fp{font:12px/1.5 ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;opacity:1;word-break:break-all}
#r349Ask .r349-rows{display:grid;grid-template-columns:auto minmax(0,1fr);gap:4px 14px;margin:4px 0;font-size:13px;text-align:left}
#r349Ask .r349-rows dt{opacity:.7} #r349Ask .r349-rows dd{margin:0;min-width:0;word-break:break-word}
#r349Ask .r349-state{align-self:center;display:inline-flex;align-items:center;gap:6px;font:600 12px/1 var(--sans,system-ui);padding:6px 11px;border-radius:999px;background:rgba(31,157,99,.14);color:#1a7f50}
#r349Ask .r349-state.bad{background:rgba(200,20,60,.1);color:#b8433f} #r349Ask .r349-state.none{background:rgba(34,26,46,.06);color:#6c6579}
body[data-theme="night"] #r349Ask .r349-state{background:rgba(64,192,128,.15);color:#6fd8a2} body[data-theme="night"] #r349Ask .r349-state.bad{background:rgba(240,120,120,.14);color:#f08a8a}
body[data-theme="night"] #r349Ask .r349-state.none{background:rgba(255,255,255,.08);color:#b9b0c8}
#r349Ask label{display:flex;flex-direction:column;gap:5px;font-size:12.8px;font-weight:600;margin-top:4px}
#r349Ask input{font:15px/1.3 inherit;padding:10px 12px;border-radius:11px;border:1px solid rgba(40,22,68,.16);background:#fff;color:#221a2e;
  box-shadow:inset 0 2px 4px rgba(40,22,68,.1),0 1px 0 rgba(255,255,255,.9);outline:none;transition:box-shadow .18s}
#r349Ask input:focus{box-shadow:inset 0 2px 4px rgba(40,22,68,.1),0 0 0 3px rgba(106,63,181,.28)}
body[data-theme="night"] #r349Ask input{background:#1d1729;color:#f1ecf8;border-color:rgba(205,184,240,.16);box-shadow:inset 0 2px 5px rgba(0,0,0,.45)}
#r349Ask .r349-say{min-height:1.3em;font-size:12.8px}
#r349Ask .r349-say.bad{color:#b8433f;opacity:1} body[data-theme="night"] #r349Ask .r349-say.bad{color:#f08a8a}
#r349Ask .sa-keys{display:flex;justify-content:flex-end;gap:10px;margin-top:6px}
#r349Ask .sc-key{display:inline-flex;align-items:center;gap:6px;border:1px solid transparent;font:600 12.5px/1.3 var(--sans,system-ui);padding:6px 11px;border-radius:7px;white-space:nowrap;cursor:pointer;box-shadow:var(--sc-ck);transition:transform .16s cubic-bezier(.34,1.35,.64,1),box-shadow .16s}
#r349Ask .sc-key:hover{transform:translateY(-3px);box-shadow:var(--sc-ckhi)} #r349Ask .sc-key:active{transform:translateY(1px)}
#r349Ask .sc-key.pri{background:linear-gradient(180deg,#7348be,#5d37a1);border-color:#4b2a86;color:#fff;border-radius:10px;padding:8px 14px;box-shadow:inset 0 1px 0 rgba(255,255,255,.24),0 1px 0 #3a2070,0 3px 6px rgba(52,24,100,.26),0 8px 14px rgba(52,24,100,.12)}
#r349Ask .sc-key.quiet{background:none;box-shadow:none;color:#6a3fb5} body[data-theme="night"] #r349Ask .sc-key.quiet{color:#c9b8ee}
#r349Ask .sc-key.quiet:hover{box-shadow:var(--sc-ck)}
#r349Ask .sc-key[disabled]{opacity:.6;cursor:default;transform:none}
/* Package details: the switch, as the room's switches (.sw2's look) */
.r349-row{display:flex;align-items:center;gap:12px;border:1px solid var(--hairline,rgba(34,26,46,.1));border-radius:12px;background:var(--card,#fff);padding:10px 12px;margin:2px 0 14px;cursor:pointer;width:100%;text-align:left;color:inherit;font:inherit;
  box-shadow:0 1px 0 rgba(40,22,68,.06),0 4px 10px rgba(40,22,68,.06);transition:transform .2s cubic-bezier(.2,.9,.25,1.2),box-shadow .2s}
.r349-row:hover{transform:translateY(-2px);box-shadow:0 2px 0 rgba(40,22,68,.08),0 8px 16px rgba(40,22,68,.1)} .r349-row:active{transform:translateY(1px)}
.r349-row[disabled]{cursor:default;opacity:.75;transform:none}
.r349-row .t{flex:1;min-width:0} .r349-row .t b{display:block;font-size:13.5px;color:var(--ink-1,#221a2e)} .r349-row .t small{display:block;font-size:12px;line-height:1.45;color:var(--ink-3,#6c6579)}
.r349-row .tr{flex:0 0 40px;height:24px;border-radius:999px;background:rgba(34,26,46,.06);border:1px solid var(--hairline,rgba(34,26,46,.1));position:relative}
.r349-row .tr::after{content:"";position:absolute;top:2px;left:2px;width:18px;height:18px;border-radius:50%;background:#fff;box-shadow:0 1px 2px rgba(0,0,0,.3),0 2px 4px rgba(40,22,68,.2);transition:transform .25s cubic-bezier(.34,1.35,.64,1)}
.r349-row[aria-checked="true"] .tr{background:linear-gradient(#7348be,#5d37a1);border-color:transparent} .r349-row[aria-checked="true"] .tr::after{transform:translateX(16px)}
body[data-theme="night"] .r349-row{background:#241c31;border-color:rgba(205,184,240,.11)} body[data-theme="night"] .r349-row .t b{color:#f1ecf8}
@keyframes r349Rise{from{opacity:0;transform:translateY(8px) scale(.985)}}
body[data-motion="minimal"] #r349Ask *,body[data-motion="minimal"] .r349-row,body[data-motion="minimal"] .r349-row *{animation:none !important;transition:none !important}
body[data-motion="minimal"] #r349Ask *:hover,body[data-motion="minimal"] .r349-row:hover{transform:none !important}
@media (prefers-reduced-motion:reduce){#r349Ask *,.r349-row,.r349-row *{animation:none !important;transition:none !important}#r349Ask *:hover,.r349-row:hover{transform:none !important}}
</style>
<script>try{(window.__ingParts=window.__ingParts||{})["p349"]="started";}catch(_){}
(function r349(){
"use strict";
if(window.IngAppSign||!window.IngShip||!window.PermitCore)return;
var W=window,D=document,TE=new TextEncoder(),TD=new TextDecoder();
var KIND="ingenium-app-signature",BODY="ingenium-app-release";
var SIGTAG=/<meta name="ingenium-signature" content="([A-Za-z0-9_-]{0,8000})">/,BUILDTAG=/<meta name="ingenium-build" content="([0-9A-Za-z.\-]{0,40})">/;
function edition(){try{return typeof ING_EDITION==="string"?ING_EDITION:"master";}catch(e){return "master";}}
function master(){return edition()==="master";}
function esc(s){return String(s==null?"":s).replace(/[&<>"']/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c];});}
function toast(m){try{if(typeof W.ingToast==="function")W.ingToast(m);else if(typeof W.toast==="function")W.toast(m);}catch(e){}}
var MONTHS=["January","February","March","April","May","June","July","August","September","October","November","December"];
function day(iso){var m=/^(\d{4})-(\d\d)-(\d\d)/.exec(String(iso||""));return m?(+m[3])+" "+MONTHS[+m[2]-1]+" "+m[1]:"";}
function b64u(u8){var s="",i;for(i=0;i<u8.length;i+=32768)s+=String.fromCharCode.apply(null,u8.subarray(i,i+32768));return btoa(s).replace(/\+/g,"-").replace(/\//g,"_").replace(/=+$/,"");}
function unb64u(s){s=String(s||"").replace(/-/g,"+").replace(/_/g,"/");while(s.length%4)s+="=";var b=atob(s),u=new Uint8Array(b.length);for(var i=0;i<b.length;i++)u[i]=b.charCodeAt(i);return u;}
function hex(buf){return [].map.call(new Uint8Array(buf),function(x){return ("0"+x.toString(16)).slice(-2);}).join("");}
function sha(u8){return crypto.subtle.digest("SHA-256",u8).then(hex);}
function fp(h){h=String(h||"");return h.length===64?h.slice(0,8)+" "+h.slice(8,16)+" … "+h.slice(-8):h;}
function keys(){try{return ((W.IngPermit&&IngPermit.keys)||[]).filter(function(k){return k&&k.kid&&k.jwk;});}catch(e){return [];}}
/* ---------- what is signed: the page, its signature's content and its build number left empty (each the first in its first MB) ---------- */
function latin(u8){return new TextDecoder("iso-8859-1").decode(u8);}
function plain(u8){var s=latin(u8.subarray(0,Math.min(u8.length,1<<20))),cut=[],sig="",build="";
  var m=SIGTAG.exec(s);if(m){sig=m[1];if(sig.length){var a=m.index+m[0].indexOf('content="')+9;cut.push([a,a+sig.length]);}}
  m=BUILDTAG.exec(s);if(m){build=m[1];if(build.length){var b=m.index+m[0].indexOf('content="')+9;cut.push([b,b+build.length]);}}
  if(!cut.length)return {bytes:u8,sig:sig,build:build,tag:SIGTAG.test(s)};
  cut.sort(function(x,y){return x[0]-y[0];});var parts=[],last=0;cut.forEach(function(c){parts.push(u8.subarray(last,c[0]));last=c[1];});parts.push(u8.subarray(last));
  var n=0;parts.forEach(function(p){n+=p.length;});var out=new Uint8Array(n),o=0;parts.forEach(function(p){out.set(p,o);o+=p.length;});
  return {bytes:out,sig:sig,build:build,tag:true};}
/* ---------- checking: a signature of the owner's, over the release's fields; then each file as it is ---------- */
function bodyOk(b){try{if(!b||b.kind!==BODY||b.v!==1||typeof b.app!=="string"||typeof b.name!=="string"||typeof b.version!=="string"||typeof b.made!=="string"||!b.files||typeof b.files!=="object")return false;
  return Object.keys(b.files).length>0&&Object.keys(b.files).every(function(k){var x=b.files[k];return x&&/^[0-9a-f]{64}$/.test(x.sha256)&&typeof x.size==="number";});}catch(e){return false;}}
function verify(f){try{if(!f||f.kind!==KIND||f.v!==1||!bodyOk(f.release)||typeof f.sig!=="string")return Promise.resolve({ok:false,why:"This is not a signature of an app of the owner's."});}catch(e){return Promise.resolve({ok:false,why:"This is not a signature of an app of the owner's."});}
  var k=keys().filter(function(x){return x.kid===f.kid;})[0];
  if(!k)return Promise.resolve({ok:false,why:"It is not signed with one of the owner's keys this copy carries."});
  return crypto.subtle.importKey("jwk",{kty:"EC",crv:"P-256",x:k.jwk.x,y:k.jwk.y,ext:true},{name:"ECDSA",namedCurve:"P-256"},false,["verify"])
    .then(function(key){return crypto.subtle.verify({name:"ECDSA",hash:"SHA-256"},key,unb64u(f.sig),TE.encode(PermitCore.canon(f.release)));})
    .then(function(ok){return ok?{ok:true,release:f.release,kid:f.kid}:{ok:false,why:"Its signature does not match: it was changed, or it is not the owner's."};},function(){return {ok:false,why:"Its signature cannot be read."};});}
/* a page: {state: signed | changed | foreign | unsigned, release, kid, why, build} */
function checkPage(u8){var p=plain(u8);if(!p.sig)return Promise.resolve({state:"unsigned",why:"It carries no signature.",build:p.build});
  var f;try{f=JSON.parse(TD.decode(unb64u(p.sig)));}catch(e){return Promise.resolve({state:"foreign",why:"Its signature cannot be read."});}
  return verify(f).then(function(v){if(!v.ok)return {state:"foreign",why:v.why,build:p.build};var want=v.release.files.page;
    if(!want)return {state:"foreign",why:"This signature is not a page's.",release:v.release,kid:v.kid};
    return sha(p.bytes).then(function(h){return h===want.sha256&&p.bytes.length===want.size?{state:"signed",release:v.release,kid:v.kid,build:p.build}
      :{state:"changed",release:v.release,kid:v.kid,build:p.build,changed:[{name:"the page",want:want,now:{sha256:h,size:p.bytes.length}}]};});});}
/* a web app's zip: signature.ingsig, then each file it names; a file it does not name is a change too (but its own sw.js) */
function checkZip(u8){var ents;try{ents=IngRepo.core.unzip(u8);}catch(e){return Promise.resolve({state:"unreadable",why:"This zip cannot be read."});}
  var list=((ents&&ents.entries)||[]).filter(function(e){return e&&e.name&&!e.dir;});  /* r110's unzip: {entries:[{name, dir, lho, ...}], comment} */
  var sigE=list.filter(function(e){return /(^|\/)signature\.ingsig$/.test(e.name);})[0];
  if(!sigE){var pages=list.filter(function(e){return /\.html?$/i.test(e.name);});if(!pages.length)return Promise.resolve({state:"unsigned",why:"It carries no signature."});
    return IngRepo.core.unzipData(u8,pages[0]).then(checkPage);}
  var top=sigE.name.slice(0,sigE.name.length-"signature.ingsig".length);
  return IngRepo.core.unzipData(u8,sigE).then(function(b){var f;try{f=JSON.parse(TD.decode(b));}catch(e){return {state:"foreign",why:"Its signature cannot be read."};}
    return verify(f).then(function(v){if(!v.ok)return {state:"foreign",why:v.why};var names=Object.keys(v.release.files).sort(),changed=[],i=0;
      var have={};list.forEach(function(e){if(e.name.indexOf(top)===0&&!/\/$/.test(e.name))have[e.name.slice(top.length)]=e;});
      Object.keys(have).forEach(function(n){if(n!=="sw.js"&&n!=="signature.ingsig"&&!v.release.files[n])changed.push({name:n,why:"added"});});
      function next(){if(i>=names.length)return Promise.resolve();var n=names[i++],want=v.release.files[n],e=have[n];
        if(!e){changed.push({name:n,why:"missing",want:want});return next();}
        return IngRepo.core.unzipData(u8,e).then(function(d){var x=/\.html?$/i.test(n)?plain(d).bytes:d;return sha(x).then(function(h){if(h!==want.sha256||x.length!==want.size)changed.push({name:n,why:"content",want:want,now:{sha256:h,size:x.length}});});}).then(next);}
      return next().then(function(){return changed.length?{state:"changed",release:v.release,kid:v.kid,changed:changed}:{state:"signed",release:v.release,kid:v.kid,files:names.length};});});});}
function check(u8){return (u8.length>4&&u8[0]===0x50&&u8[1]===0x4b)?checkZip(u8):checkPage(u8);}
/* ---------- signing: the owner's key, opened once for a ship, held two minutes after the last package, then dropped ---------- */
var SESSION=null,DROP=0;
function hold(s){SESSION=s;clearTimeout(DROP);DROP=setTimeout(function(){SESSION=null;},120000);return s;}
function sealedKey(){return master()&&PermitCore._&&typeof PermitCore._.get==="function"?PermitCore._.get("key").then(function(k){return k&&k.kid&&k.enc?k:null;},function(){return null;}):Promise.resolve(null);}
function carried(kid){return keys().some(function(k){return k.kid===kid;});}
function closeAsk(){var a=D.getElementById("r349Ask");if(a)a.remove();}
function ask(name,sealed){return new Promise(function(res,rej){closeAsk();var w=D.createElement("div");w.id="r349Ask";w.setAttribute("role","dialog");w.setAttribute("aria-modal","true");w.setAttribute("aria-labelledby","r349AskH");
  w.innerHTML='<form class="sa-card" autocomplete="off"><div class="eye">Your apps signed when shipped</div><h2 id="r349AskH">Sign '+esc(name)+'</h2>'
    +'<p>Every package you make of it now carries your owner key\'s signature, so a changed file is caught. Your key stays on this device.</p>'
    +'<label for="r349Pw">Your owner key\'s password<input type="password" id="r349Pw" autocomplete="off" spellcheck="false"></label>'
    +'<p class="r349-say" id="r349Say" aria-live="polite"></p>'
    +'<div class="sa-keys"><button type="button" class="sc-key quiet" id="r349No">Not now</button><button type="submit" class="sc-key pri" id="r349Yes">Sign and make</button></div></form>';
  D.body.appendChild(w);var f=w.querySelector("form"),pw=D.getElementById("r349Pw"),say=D.getElementById("r349Say"),yes=D.getElementById("r349Yes"),no=D.getElementById("r349No"),busy=false;
  function stop(){closeAsk();rej(new Error("Nothing was made: it was not signed."));}
  no.onclick=function(){if(!busy)stop();};w.addEventListener("keydown",function(e){if(e.key==="Escape"&&!busy){e.preventDefault();stop();}});
  f.onsubmit=function(e){e.preventDefault();if(busy)return;var v=pw.value;if(!v){say.className="r349-say bad";say.textContent="Your owner key's password first.";pw.focus();return;}
    busy=true;yes.disabled=no.disabled=pw.disabled=true;say.className="r349-say";say.textContent="Opening your key…";
    PermitCore.openKey(sealed,v).then(function(k){v="";pw.value="";closeAsk();res(hold({key:k,kid:sealed.kid}));},
      function(e){v="";pw.value="";busy=false;yes.disabled=no.disabled=pw.disabled=false;say.className="r349-say bad";say.textContent=(e&&e.message)||"That password does not open the key.";pw.focus();});};
  setTimeout(function(){try{pw.focus();}catch(e){}},60);});}
/* a ship where her owner key cannot sign (not on this device, or not one Ingenium carries) is made unsigned, and says so once */
var SAID=0;
function unsignedSay(t){if(Date.now()-SAID>15000){SAID=Date.now();toast(t);}return null;}
function session(name){if(SESSION)return Promise.resolve(hold(SESSION));
  return sealedKey().then(function(s){if(!s)return unsignedSay("Made unsigned: your owner key is not on this device (Settings, Licence and permissions).");
    if(!carried(s.kid))return unsignedSay("Made unsigned: your owner key on this device is not one Ingenium carries, so no copy could check it. Save its public half (Settings, Licence and permissions) for the next release.");
    return ask(name,s);});}
function signBody(s,body){return PermitCore.signWith(s.key,body).then(function(sg){return {kind:KIND,v:1,release:body,kid:s.kid,sig:sg};});}
/* a page, signed: the tag put in the head when it has none, the page hashed with it empty, the signature written into it */
function signPage(html,ctx){var head=html.slice(0,1<<20);
  if(!SIGTAG.test(head)){var tag='<meta name="ingenium-signature" content="">';
    html=/<head(\s[^>]*)?>/i.test(head)?html.replace(/<head(\s[^>]*)?>/i,function(m){return m+"\n"+tag;}):/<html(\s[^>]*)?>/i.test(head)?html.replace(/<html(\s[^>]*)?>/i,function(m){return m+"\n"+tag;}):tag+"\n"+html;}
  else html=html.replace(SIGTAG,'<meta name="ingenium-signature" content="">');
  var p=plain(TE.encode(html));
  return sha(p.bytes).then(function(h){return signBody(ctx.s,{kind:BODY,v:1,app:ctx.app,name:ctx.name,version:ctx.version,files:{page:{sha256:h,size:p.bytes.length}},made:new Date().toISOString()});})
    .then(function(file){var c=b64u(TE.encode(JSON.stringify(file)));return {html:html.replace(SIGTAG,function(){return '<meta name="ingenium-signature" content="'+c+'">';}),file:file};});}
/* her choice for an app (Package details): on unless she turned it off */
function prefsOf(id){try{var f=W.fbHubHost&&fbHubHost.FBS?fbHubHost.FBS():null;return f&&f.ship&&f.ship[id]?f.ship[id]:{};}catch(e){return {};}}
function wanted(id){var p=prefsOf(id);return master()&&(p.sign!==false||p.ownerOnly===true);}
function mark(id,commit,target,file){if(!target||!W.IngRepo||typeof IngRepo.setNote!=="function")return Promise.resolve();
  return IngRepo.setNote(id,commit,"ownerSigned_"+target,{at:Date.now(),kid:file.kid,made:file.release.made}).catch(function(){});}
/* the page every package carries */
var o1=IngShip.onePage;
/* 7.67 (modules/r356.js): what is shipped has its code scrambled first, before the door and the signature (the version is read before it) */
function scrambled(id,x,opt){return W.IngScramble?IngScramble.onePage(id,x,opt):Promise.resolve(x);}
IngShip.onePage=function(id,opt){opt=opt||{};return o1.apply(IngShip,arguments).then(function(x){if(!wanted(id)||opt.unsigned)return scrambled(id,x,opt);
  return IngRepo.info(id).then(function(info){var name=(x.recipe&&x.recipe.name)||info.name||"this app",ver=String(IngShip._.numberOf(x.html,x.recipe||{})||(x.commit||"").slice(0,7)||"1.0");
    /* 7.63 (modules/r354.js): an app for its owner alone carries its door, written in before the page is signed, and is never made unsigned.
       8.11 (modules/r420.js): an edition made for others (Ingenium's Full, Gift or Demo edition, a demonstration) never carries her door */
    var own=!(x.edition&&x.edition!=="master")&&W.IngOwnerOnly&&IngOwnerOnly.wanted(id);
    return session(name).then(function(s){if(!s){if(own)throw new Error("Nothing was made: "+name+" opens only with your owner key, and it can only be made signed, with your owner key on this device.");return scrambled(id,x,opt);}
      return scrambled(id,x,opt).then(function(x){var page=own?IngOwnerOnly.door(x.html,{id:id,app:info.slug||"",name:name}):x.html;
      return signPage(page,{s:s,app:info.slug||"",name:name,version:ver}).then(function(sp){
      x.html=sp.html;x.bytes=TE.encode(sp.html);x.signed=sp.file;return mark(id,x.commit,opt.target,sp.file).then(function(){return x;});});});});});});};
/* the web app, however it was made (r111's own, r178's from the app's templates or Ingenium's family of designs, with r330's additions):
   the finished zip is read, every file in it listed and signed together (signature.ingsig, beside them), and a check put at the head of
   its service worker. Its page already carries its own signature: r178 makes it from the one page, signed above. */
var o2=IngShip.webApp;
IngShip.webApp=function(id,opt){opt=opt||{};var a=arguments;if(!wanted(id)||opt.unsigned)return o2.apply(IngShip,a);
  return o2.apply(IngShip,a).then(function(res){if(!res||!res.bytes)return res;
    return IngRepo.info(id).then(function(info){var name=(info&&info.name)||"this app";return session(name).then(function(s){if(!s)return res;
      return signZip(res.bytes,s,{app:(info&&info.slug)||"",name:name}).then(function(z){res.bytes=z.bytes;res.signed=z.file;
        return mark(id,res.commit,"web",z.file).then(function(){return res;});});});});});};
function signZip(u8,s,meta){var ents=((IngRepo.core.unzip(u8)||{}).entries||[]).filter(function(e){return e&&e.name&&!e.dir;});
  var names=ents.map(function(e){return e.name;}),first=names[0]||"",top=first.indexOf("/")>0?first.slice(0,first.indexOf("/")+1):"";
  if(top&&!names.every(function(n){return n.indexOf(top)===0;}))top="";
  var out=[],files={},version="",chain=Promise.resolve();
  ents.forEach(function(e){chain=chain.then(function(){return IngRepo.core.unzipData(u8,e).then(function(d){var n=e.name.slice(top.length);
    if(n==="signature.ingsig")return;out.push({name:e.name,data:d,mode:e.unix||undefined});if(n==="sw.js")return;
    var html=/\.html?$/i.test(n),p=html?plain(d):null,x=html?p.bytes:d;
    if(html&&!version&&p.sig){try{version=String(JSON.parse(TD.decode(unb64u(p.sig))).release.version||"");}catch(err){}}
    return sha(x).then(function(h){files[n]={sha256:h,size:x.length};});});});});
  return chain.then(function(){return signBody(s,{kind:BODY,v:1,app:meta.app,name:meta.name,version:version||"",files:files,made:new Date().toISOString()});}).then(function(file){
    out.push({name:top+"signature.ingsig",data:TE.encode(JSON.stringify(file,null,1))});
    var sw=out.filter(function(f){return f.name===top+"sw.js";})[0],k=keys().filter(function(x){return x.kid===s.kid;})[0];
    if(sw&&k)sw.data=TE.encode(swPrelude(file,k.jwk,meta.name)+"\n"+TD.decode(sw.data));
    return Promise.resolve(IngRepo.core.zip(out)).then(function(z){return {bytes:z,file:file};});});}
/* the check put at the head of a signed web app's service worker: when it is installed, every file the signature names is fetched and
   compared; a changed or missing one, and every opening of the app is answered with a page that says which, instead of the app. What
   it found is kept in the app's own IndexedDB (ingenium-signature), apart from its caches, which its own worker may clear. */
function swPrelude(file,jwk,name){
  return "/* Ingenium: "+String(name).replace(/\*\//g,"")+" opens only as its maker signed it. Each of its files is checked against its signature before it opens. */\n"
    +"const __ING = { SIG: "+JSON.stringify(file)+", KEY: "+JSON.stringify({kty:"EC",crv:"P-256",x:jwk.x,y:jwk.y})+", NAME: "+JSON.stringify(String(name))+" };\n"
    +"(() => {\n"
    +"const canon = v => { if (v === null || typeof v !== 'object') return JSON.stringify(v); if (Array.isArray(v)) return '[' + v.map(canon).join(',') + ']';\n"
    +"  return '{' + Object.keys(v).sort().filter(k => v[k] !== undefined).map(k => JSON.stringify(k) + ':' + canon(v[k])).join(',') + '}'; };\n"
    +"const unb64u = s => { s = s.replace(/-/g, '+').replace(/_/g, '/'); while (s.length % 4) s += '='; const b = atob(s), u = new Uint8Array(b.length); for (let i = 0; i < b.length; i++) u[i] = b.charCodeAt(i); return u; };\n"
    +"const hex = b => [...new Uint8Array(b)].map(x => x.toString(16).padStart(2, '0')).join('');\n"
    +"const SIGTAG = /<meta name=\"ingenium-signature\" content=\"([A-Za-z0-9_-]{0,8000})\">/, BUILDTAG = /<meta name=\"ingenium-build\" content=\"([0-9A-Za-z.\\-]{0,40})\">/;\n"
    +"const plain = u8 => { const s = new TextDecoder('iso-8859-1').decode(u8.subarray(0, Math.min(u8.length, 1 << 20))), cut = [];\n"
    +"  for (const re of [SIGTAG, BUILDTAG]) { const m = re.exec(s); if (m && m[1].length) { const a = m.index + m[0].indexOf('content=\"') + 9; cut.push([a, a + m[1].length]); } }\n"
    +"  if (!cut.length) return u8; cut.sort((x, y) => x[0] - y[0]); const parts = []; let last = 0; for (const c of cut) { parts.push(u8.subarray(last, c[0])); last = c[1]; } parts.push(u8.subarray(last));\n"
    +"  const out = new Uint8Array(parts.reduce((n, p) => n + p.length, 0)); let o = 0; for (const p of parts) { out.set(p, o); o += p.length; } return out; };\n"
    +"const db = () => new Promise((res, rej) => { const r = indexedDB.open('ingenium-signature', 1); r.onupgradeneeded = () => r.result.createObjectStore('s'); r.onsuccess = () => res(r.result); r.onerror = () => rej(r.error); });\n"
    +"const keep = v => db().then(d => new Promise(res => { const t = d.transaction('s', 'readwrite'); t.objectStore('s').put(v, 'refused'); t.oncomplete = () => { d.close(); res(); }; t.onerror = () => { d.close(); res(); }; }));\n"
    +"const kept = () => db().then(d => new Promise(res => { const t = d.transaction('s', 'readonly'), q = t.objectStore('s').get('refused'); q.onsuccess = () => res(q.result || null); q.onerror = () => res(null); t.oncomplete = () => d.close(); })).catch(() => null);\n"
    +"async function check() { const S = __ING.SIG, k = await crypto.subtle.importKey('jwk', Object.assign({ ext: true }, __ING.KEY), { name: 'ECDSA', namedCurve: 'P-256' }, false, ['verify']);\n"
    +"  if (!(await crypto.subtle.verify({ name: 'ECDSA', hash: 'SHA-256' }, k, unb64u(S.sig), new TextEncoder().encode(canon(S.release))))) return { name: 'signature.ingsig', why: 'does not match its own signature' };\n"
    +"  for (const [name, want] of Object.entries(S.release.files)) { let r = null; try { r = await fetch('./' + name.split('/').map(encodeURIComponent).join('/'), { cache: 'reload' }); } catch (e) {}\n"
    +"    if (!r || !r.ok) return { name, why: 'is missing' }; const b = new Uint8Array(await r.arrayBuffer()), x = /\\.html?$/i.test(name) ? plain(b) : b;\n"
    +"    if (x.length !== want.size || hex(await crypto.subtle.digest('SHA-256', x)) !== want.sha256) return { name, why: 'changed since it was signed' }; }\n"
    +"  return null; }\n"
    +"const esc = t => String(t).replace(/[&<>\"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '\"': '&quot;' })[c]);\n"
    +"const page = bad => '<!doctype html><html lang=\"en\"><head><meta charset=\"utf-8\"><meta name=\"viewport\" content=\"width=device-width,initial-scale=1\"><title>' + esc(__ING.NAME) + ' did not open</title><style>'\n"
    +"  + ':root{color-scheme:light;--bg1:#efe8fb;--bg2:#d9ccf3;--card:#fff;--card2:#faf8fd;--ink1:#221a2e;--ink2:#4a4358;--ink3:#6c6480;--line:rgba(34,26,46,.1);--vio:#6a3fb5;--well:rgba(34,26,46,.04)}'\n"
    +"  + '@media (prefers-color-scheme:dark){:root{color-scheme:dark;--bg1:#1b1326;--bg2:#2a1d3d;--card:#2a2138;--card2:#241c31;--ink1:#f1ecf8;--ink2:#cfc6de;--ink3:#a69cb8;--line:rgba(255,255,255,.1);--vio:#b79ce6;--well:rgba(10,6,18,.35)}}'\n"
    +"  + '*{box-sizing:border-box}body{margin:0;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:28px 16px;background:linear-gradient(160deg,var(--bg1),var(--bg2));color:var(--ink2);font:15px/1.6 -apple-system,BlinkMacSystemFont,\"Segoe UI\",system-ui,sans-serif}'\n"
    +"  + '.card{width:min(540px,100%);background:linear-gradient(180deg,var(--card),var(--card2));border:1px solid var(--line);border-radius:22px;padding:28px 30px 24px;box-shadow:0 1px 1px rgba(40,20,70,.18),0 4px 8px rgba(40,20,70,.12),0 14px 30px rgba(40,20,70,.14),0 30px 60px rgba(40,20,70,.12);animation:rise .5s cubic-bezier(.2,.8,.2,1) both}'\n"
    +"  + '@keyframes rise{from{opacity:0;transform:translateY(14px) scale(.985)}to{opacity:1;transform:none}}'\n"
    +"  + '.seal{width:58px;height:58px;border-radius:50%;display:grid;place-items:center;color:#fff;background:radial-gradient(circle at 35% 30%,#9a74df,#6a3fb5 55%,#3a2070);box-shadow:inset 0 2px 1px rgba(255,255,255,.35),inset 0 -4px 8px rgba(20,8,40,.45),0 3px 5px rgba(40,20,70,.3),0 10px 22px rgba(52,24,100,.28);margin-bottom:12px}.seal svg{width:30px;height:30px}'\n"
    +"  + '.eye{font:600 11.5px/1.3 -apple-system,BlinkMacSystemFont,\"Segoe UI\",system-ui,sans-serif;letter-spacing:.16em;text-transform:uppercase;color:var(--vio);margin:0}h1{font:700 26px/1.25 Georgia,\"Times New Roman\",serif;color:var(--ink1);margin:6px 0 8px}p{margin:6px 0}'\n"
    +"  + '.well{background:var(--well);border:1px solid var(--line);border-radius:14px;padding:12px 16px;margin:14px 0;box-shadow:inset 0 1px 3px rgba(40,20,70,.08)}.nm{font:700 14px/1.4 ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;color:var(--ink1)}'\n"
    +"  + 'h2{font:700 15.5px/1.35 Georgia,\"Times New Roman\",serif;color:var(--ink1);margin:16px 0 2px}@media (prefers-reduced-motion:reduce){.card{animation:none}}</style></head>'\n"
    +"  + '<body><main class=\"card\" role=\"alertdialog\" aria-labelledby=\"h\"><div class=\"seal\" aria-hidden=\"true\"><svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M12 2.8l7.5 3v5.6c0 4.6-3.2 8.4-7.5 9.8-4.3-1.4-7.5-5.2-7.5-9.8V5.8z\"/><path d=\"M12 8v4.6\"/><path d=\"M12 16.2h.01\"/></svg></div>'\n"
    +"  + '<p class=\"eye\">Signed by its maker</p><h1 id=\"h\">' + esc(__ING.NAME) + ' did not open</h1><p>It is not as its maker signed it, so nothing of it ran.</p>'\n"
    +"  + '<div class=\"well\"><div class=\"nm\">' + esc(bad.name) + '</div><p>It ' + esc(bad.why) + '.</p></div><h2>What to do</h2><p>Install it again from where you first got it.</p></main></body></html>';\n"
    +"self.addEventListener('install', e => { e.waitUntil(check().catch(() => ({ name: 'signature.ingsig', why: 'could not be checked' })).then(bad => keep(bad))); });\n"
    +"self.addEventListener('fetch', e => { if (e.request.method !== 'GET' || e.request.mode !== 'navigate') return;\n"
    +"  e.respondWith(kept().then(bad => bad ? new Response(page(bad), { headers: { 'Content-Type': 'text/html; charset=utf-8' } })\n"
    +"    : caches.match(e.request, { ignoreSearch: true }).then(r => r || (new URL(e.request.url).pathname.endsWith('/') ? caches.match(new URL('index.html', e.request.url).href, { ignoreSearch: true }) : null)).then(r => r || fetch(e.request)))); });\n"
    +"})();\n";}
/* ---------- Check a package: a page or a web app's zip, read here ---------- */
function stateWords(r){var rel=r.release||{},d=day(rel.made),who=r.kid&&SESSION&&SESSION.kid===r.kid?"you":"its maker";
  if(r.state==="signed")return {cls:"",chip:"Signed",line:esc(rel.name||"This app")+(rel.version?" "+esc(rel.version):"")+", signed with "+(master()?"your owner key":"its maker's key")+(d?" on "+d:"")+": every file is as it was signed."};
  if(r.state==="changed")return {cls:"bad",chip:"Changed",line:"Not as it was signed"+(d?" on "+d:"")+": "+(r.changed||[]).map(function(c){return "<b>"+esc(c.name)+"</b> "+(c.why==="missing"?"is missing":c.why==="added"?"was added":"changed");}).join(", ")+"."};
  if(r.state==="foreign")return {cls:"bad",chip:"Not the owner's",line:esc(r.why||"Its signature is not the owner's.")};
  return {cls:"none",chip:"Not signed",line:esc(r.why||"It carries no signature.")};}
function showResult(name,r){closeAsk();var w=D.createElement("div");w.id="r349Ask";w.setAttribute("role","dialog");w.setAttribute("aria-modal","true");w.setAttribute("aria-labelledby","r349AskH");var s=stateWords(r),rel=r.release||{};
  w.innerHTML='<div class="sa-card"><div class="eye">Check a package</div><h2 id="r349AskH">'+esc(name)+'</h2><span class="r349-state '+s.cls+'">'+s.chip+'</span><p>'+s.line+'</p>'
    +(rel.app?'<dl class="r349-rows"><dt>App</dt><dd>'+esc(rel.name)+'</dd><dt>Version</dt><dd>'+esc(rel.version)+'</dd>'+(r.kid?'<dt>Key</dt><dd class="r349-fp">'+esc(r.kid)+'</dd>':'')+(r.build?'<dt>Build</dt><dd>'+esc(r.build)+'</dd>':'')+'</dl>':'')
    +'<div class="sa-keys"><button type="button" class="sc-key pri" id="r349Ok">Done</button></div></div>';
  D.body.appendChild(w);var ok=D.getElementById("r349Ok");ok.onclick=closeAsk;w.addEventListener("keydown",function(e){if(e.key==="Escape"){e.preventDefault();closeAsk();}});setTimeout(function(){try{ok.focus();}catch(e){}},60);}
function checkFile(){var i=D.createElement("input");i.type="file";i.accept=".html,.htm,.zip,text/html,application/zip";i.style.display="none";D.body.appendChild(i);
  i.onchange=function(){var f=i.files&&i.files[0];i.remove();if(!f)return;f.arrayBuffer().then(function(ab){return check(new Uint8Array(ab));}).then(function(r){showResult(f.name,r);},function(e){showResult(f.name,{state:"unreadable",why:"It could not be read: "+((e&&e.message)||e)});});};
  i.click();}
/* ---------- in the Ship card and in Package details (modules/r112.js asks for these) ---------- */
function lineFor(id){return !master()?"":wanted(id)?"and with your owner key":"not with your owner key";}
function signedNote(n,k){return !!(n&&n["ownerSigned_"+k]);}
function packageRow(box,r,pref){if(!master())return null;var on=pref.sign!==false;
  var b=D.createElement("button");b.type="button";b.className="r349-row";b.setAttribute("role","switch");b.setAttribute("aria-checked",String(on));
  b.innerHTML='<span class="t"><b>Signed with your owner key</b><small>Every package carries your signature inside its page, and every app made from it checks the signature each time it starts: a changed copy refuses to open and says which file. Your owner key\'s password is asked once each time you make them.</small></span><span class="tr"></span>';
  b.onclick=function(){on=!on;b.setAttribute("aria-checked",String(on));};box.appendChild(b);
  sealedKey().then(function(k){if(!k){var s=b.querySelector("small");s.textContent="Your owner key is not on this device (Settings, Licence and permissions): until it is, what you make here is made unsigned, and Ingenium says so.";}});
  return {on:function(){return on;}};}
/* ---------- the Security room (modules/r318.js asks for these): its state and its words ---------- */
var KEYSTATE=null,KEYASKED=0;
function readKey(){KEYASKED=Date.now();return sealedKey().then(function(k){var was=KEYSTATE;KEYSTATE=!k?"none":carried(k.kid)?"ok":"foreign";if(was!==KEYSTATE){try{if(W.IngSecurity&&IngSecurity.paint)IngSecurity.paint();}catch(e){}}return KEYSTATE;});}
/* asked again as the room paints, at most every four seconds, so a key made or brought in is seen; the room is painted again only on a change */
function state(){if(!master())return "soon";if(Date.now()-KEYASKED>4000)readKey();return KEYSTATE==="ok"?"on":"off";}
function well(chip){var st=state(),already="Already, too: your Android and Fire packages are signed with your Android key (Fabrica, Ship), as Android requires, and an iPhone or iPad app with your Apple ID, through Sideloadly.";
  /* an edition other than the owner's own: no owner key here; what it can do is check */
  if(!master())return '<div class="sc-well"><div class="sc-wh"><b>Signed with your key</b>'+chip("soon")+'</div><p>'+esc("Already: your Android and Fire packages are signed with your Android key (Fabrica, Ship), as Android requires, and an iPhone or iPad app with your Apple ID, through Sideloadly. The owner's own copy also signs every package with the owner key; here, Check a package (Fabrica, Ship) reads the signature any package carries.")+'</p></div>';
  var p=st==="on"?"On: every package Fabrica makes carries your owner key's signature inside its page, and every app it makes checks that signature each time it starts: on a Mac, on Windows, on a Fire tablet or Android, on an iPhone or iPad, and on the web. A changed copy does not open, and says which file changed. Check a package (Fabrica, Ship) reads any copy, and an app brought into your library is checked as it comes in. "+already
    :KEYSTATE==="foreign"?"Off on this device: your owner key here is not one Ingenium carries, so no copy could check it, and what you make here is made unsigned. Save its public half (Settings, Licence and permissions) for the next release. "+already
    :"Off on this device: your owner key is not here (Settings, Licence and permissions), so what you make here is made unsigned. "+already;
  return '<div class="sc-well"><div class="sc-wh"><b>Signed with your key</b>'+chip(st)+'</div><p>'+esc(p)+'</p><p class="sc-fine">Not yet: an app built from its build kit, on GitHub or in the terminal, carries your signature but does not check it at start. An app made before 7.62 checks itself once it is made again. Turned off for an app in Package details, its packages are made unsigned.</p></div>';}
setTimeout(function wait(){if(W.__ingReady===true)readKey();else setTimeout(wait,800);},600);
W.IngAppSign={state:state,well:well,plain:plain,signPage:signPage,check:check,checkPage:checkPage,checkZip:checkZip,checkFile:checkFile,packageRow:packageRow,lineFor:lineFor,signedNote:signedNote,swPrelude:swPrelude,signZip:signZip,
  _session:function(){return SESSION;},_drop:function(){SESSION=null;}};
})();
;try{window.__ingParts["p349"]="running";}catch(_){}
</script>
