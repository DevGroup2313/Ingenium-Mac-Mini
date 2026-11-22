<style id="r357-css">
/* ============ R357 · READ IT AS WRITTEN, SCRAMBLED FOR EVERYONE ELSE, PART ONE (Ingenium 7.68, 22 November 2026) ============
   Her words (22 November 2026): "I want to be able to unscramble the code of my app Ingenium and my all of my other apps when I am
   working on them to make upgrades and edits to it. I want to be able to clearly read and understand my apps' codes when I am working
   on it and have it scrambled afterwards so that others may not be able to steal, replicate or modify my work. I want that capability
   built in as well please". Her answers that day: Read it as written for her apps, "Yes, add it"; Ingenium itself, "Every copy" (the
   master release page too, the Author Studio showing it as written); "A separate reading key"; and this before the build kit check.
   Part one (this module):
   - Your reading key (Settings, Security, Ingenium itself; her master copy, her own profile): a P-256 key for opening alone (ECDH),
     made on her own device and kept there only under its own password (PBKDF2-SHA-256, 600,000 rounds, then AES-256-GCM, as her owner
     key is kept), in the owner's own store (PermitCore's, "readkey"). Save its public half (reading_keys.json, for the release that is
     to carry it: source/security/reading_keys.json), Save a backup of it, Bring it back from its backup (her other computers). Her
     owner key keeps signing alone (one key, one job).
   - Read it as written, her apps: every package r356 scrambles names the version it was made from inside its page
     (<meta name="ingenium-source" content="<app> <version>">, signed with the page). A copy that comes back into her library (Lector's
     app library; Fabrica's Bring one in) and names a version her Fabrica holds opens as written: Fabrica opens that app instead of
     bringing a scrambled copy in, and Lector keeps the copy as written. Anyone else's Ingenium holds no such version.
   - Ingenium itself, said plainly in the room: as written in this copy; every copy is scrambled from the release that carries her
     reading key's public half, and that release opens it for her as written, with her reading key, in the Workshop, the Author Studio
     and Build (part two).
   The public halves a build carries come from source/security/reading_keys.json (build_page.py writes them in, below).
   window.IngReadable: state(), well(chip), carried(), markOf(html), holder(mark), _sealed(), _open(sealed, pw) */
#secCard .r357-keys{display:flex;flex-wrap:wrap;gap:8px;margin:2px 0 0}
#r357Ask{--sc-ck:inset 0 1.5px 0 rgba(255,255,255,.95),inset 0 -3px 5px rgba(60,30,90,.16),0 1px 1px rgba(40,20,70,.3),0 3px 4px rgba(40,20,70,.24),0 6px 9px rgba(40,20,70,.18);
  --sc-ckhi:inset 0 1.5px 0 #fff,inset 0 -3px 5px rgba(60,30,90,.14),0 3px 4px rgba(40,20,70,.24),0 9px 16px rgba(40,20,70,.2),0 16px 26px rgba(40,20,70,.14);
  position:fixed;inset:0;z-index:2147482000;display:flex;align-items:center;justify-content:center;padding:18px;background:rgba(22,18,30,.42)}
#r357Ask .sa-card{width:min(460px,94vw);border-radius:22px;padding:24px 22px 20px;background:linear-gradient(180deg,#ffffff,#f7f5fa 62%,#efeaf4);color:#221a2e;display:flex;flex-direction:column;gap:10px;font:14px/1.5 -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif;
  box-shadow:inset 0 2px 0 rgba(255,255,255,.45),inset -2px 0 0 #d3cbe0,inset 0 -3px 0 #d3cbe0,0 0 0 1px rgba(40,22,68,.1),0 9px 12px -7px rgba(40,22,68,.18),0 22px 40px -14px rgba(40,22,68,.26);animation:r357Rise .4s cubic-bezier(.2,.9,.25,1.2) backwards;transition:transform .3s cubic-bezier(.2,.9,.25,1.2)}
#r357Ask .sa-card:hover{transform:translateY(-3px)}
body[data-theme="night"] #r357Ask{--sc-ck:inset 0 1.5px 0 rgba(255,255,255,.16),inset 0 -3px 5px rgba(0,0,0,.45),0 1px 1px rgba(0,0,0,.65),0 3px 4px rgba(0,0,0,.55),0 6px 9px rgba(0,0,0,.45);
  --sc-ckhi:inset 0 1.5px 0 rgba(255,255,255,.2),inset 0 -3px 5px rgba(0,0,0,.4),0 3px 4px rgba(0,0,0,.6),0 9px 16px rgba(0,0,0,.5),0 16px 26px rgba(0,0,0,.4)}
body[data-theme="night"] #r357Ask .sa-card{background:linear-gradient(180deg,#342a4c,#2c2341 62%,#241c36);color:#ece6f6;box-shadow:inset 0 2px 0 rgba(255,255,255,.12),inset -2px 0 0 #140e1c,inset 0 -3px 0 #140e1c,0 0 0 1px rgba(0,0,0,.4),0 22px 40px -14px rgba(0,0,0,.6)}
#r357Ask .eye{font:700 10.5px/1 inherit;letter-spacing:.12em;text-transform:uppercase;opacity:.65;text-align:center}
#r357Ask h2{font:700 22px/1.2 "Iowan Old Style","Palatino Linotype",Palatino,Georgia,serif;text-align:center;margin:0}
#r357Ask p{margin:0;font-size:13.5px;opacity:.82;text-align:center}
#r357Ask label{display:flex;flex-direction:column;gap:5px;font-size:12.8px;font-weight:600;margin-top:4px}
#r357Ask input{font:15px/1.3 inherit;padding:10px 12px;border-radius:11px;border:1px solid rgba(40,22,68,.16);background:#fff;color:#221a2e;
  box-shadow:inset 0 2px 4px rgba(40,22,68,.1),0 1px 0 rgba(255,255,255,.9);outline:none;transition:box-shadow .18s}
#r357Ask input:focus{box-shadow:inset 0 2px 4px rgba(40,22,68,.1),0 0 0 3px rgba(106,63,181,.28)}
body[data-theme="night"] #r357Ask input{background:#1d1729;color:#f1ecf8;border-color:rgba(205,184,240,.16);box-shadow:inset 0 2px 5px rgba(0,0,0,.45)}
#r357Ask .r357-say{min-height:1.3em;font-size:12.8px;margin:0;text-align:center}
#r357Ask .r357-say.bad{color:#b8433f} body[data-theme="night"] #r357Ask .r357-say.bad{color:#f08a8a}
#r357Ask .sa-keys{display:flex;justify-content:flex-end;gap:10px;margin-top:6px}
#r357Ask .sc-key{display:inline-flex;align-items:center;gap:6px;border:1px solid transparent;font:600 12.5px/1.3 var(--sans,system-ui);padding:6px 11px;border-radius:7px;white-space:nowrap;cursor:pointer;box-shadow:var(--sc-ck);transition:transform .16s cubic-bezier(.34,1.56,.64,1),box-shadow .16s;background:linear-gradient(180deg,#fff,#f4f1f8);color:#221a2e}
#r357Ask .sc-key:hover{transform:translateY(-3px);box-shadow:var(--sc-ckhi)} #r357Ask .sc-key:active{transform:translateY(1px)}
#r357Ask .sc-key.pri{background:linear-gradient(180deg,#7348be,#5d37a1);border-color:#4b2a86;color:#fff;border-radius:10px;padding:8px 14px;box-shadow:inset 0 1px 0 rgba(255,255,255,.24),0 1px 0 #3a2070,0 3px 6px rgba(52,24,100,.26),0 8px 14px rgba(52,24,100,.18)}
#r357Ask .sc-key.quiet{background:none;box-shadow:none;color:#6a3fb5} body[data-theme="night"] #r357Ask .sc-key.quiet{color:#c9b8ee}
#r357Ask .sc-key.quiet:hover{box-shadow:var(--sc-ck)}
#r357Ask .sc-key[disabled]{opacity:.6;cursor:default;transform:none}
body[data-theme="night"] #r357Ask .sc-key:not(.pri):not(.quiet){background:linear-gradient(180deg,#3a3052,#2e2642);color:#ece6f6}
@keyframes r357Rise{from{opacity:0;transform:translateY(8px) scale(.985)}}
body[data-motion="minimal"] #r357Ask *{animation:none !important;transition:none !important}
body[data-motion="minimal"] #r357Ask *:hover{transform:none !important}
@media (prefers-reduced-motion:reduce){#r357Ask *{animation:none !important;transition:none !important}#r357Ask *:hover{transform:none !important}}
</style>
<script>try{(window.__ingParts=window.__ingParts||{})["p357"]="started";}catch(_){}
/* R357 · read it as written, scrambled for everyone else: see the note at the top of its styles */
(function r357(){
"use strict";
var W=window,D=document,TE=new TextEncoder(),TD=new TextDecoder();
if(W.IngReadable)return;
/* the public halves of her reading keys this build carries (source/security/reading_keys.json), written in by build_page.py */
var KEYS=/*ING_READING_KEYS*/[];
var KIND="ingenium-reading-key",PUBKIND="ingenium-reading-public-key",ITER=600000,EC={name:"ECDH",namedCurve:"P-256"};
function edition(){try{return typeof ING_EDITION==="string"?ING_EDITION:"master";}catch(e){return "master";}}
function master(){return edition()==="master";}
function guest(){try{return !!W.__ingGuest;}catch(e){return false;}}
function mine(){return master()&&!guest()&&!!W.PermitCore;}
function esc(s){return String(s==null?"":s).replace(/[&<>"']/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c];});}
function toast(m){try{if(typeof W.ingToast==="function")W.ingToast(m);else if(typeof W.toast==="function")W.toast(m);}catch(e){}}
function subtle(){return W.crypto.subtle;}
function b64u(u8){var s="",i;for(i=0;i<u8.length;i+=32768)s+=String.fromCharCode.apply(null,u8.subarray(i,i+32768));return btoa(s).replace(/\+/g,"-").replace(/\//g,"_").replace(/=+$/,"");}
function unb64u(s){s=String(s||"").replace(/-/g,"+").replace(/_/g,"/");while(s.length%4)s+="=";var b=atob(s),u=new Uint8Array(b.length);for(var i=0;i<b.length;i++)u[i]=b.charCodeAt(i);return u;}
function day(d){d=d||new Date();return d.getFullYear()+"-"+("0"+(d.getMonth()+1)).slice(-2)+"-"+("0"+d.getDate()).slice(-2);}
function store(){try{return W.PermitCore&&PermitCore._&&typeof PermitCore._.get==="function"?PermitCore._:null;}catch(e){return null;}}
function carried(rid){return KEYS.some(function(k){return k&&k.rid===rid;});}

/* ---------- the reading key: made here, kept only under its own password ---------- */
function derive(pw,salt,iter){return subtle().importKey("raw",TE.encode(pw),"PBKDF2",false,["deriveKey"]).then(function(base){
  return subtle().deriveKey({name:"PBKDF2",hash:"SHA-256",salt:salt,iterations:iter},base,{name:"AES-GCM",length:256},false,["encrypt","decrypt"]);});}
function seal(privJwk,pubJwk,rid,pw){var salt=W.crypto.getRandomValues(new Uint8Array(16)),iv=W.crypto.getRandomValues(new Uint8Array(12));
  return derive(pw,salt,ITER).then(function(k){return subtle().encrypt({name:"AES-GCM",iv:iv},k,TE.encode(JSON.stringify(privJwk)));}).then(function(ct){
    return {kind:KIND,v:1,rid:rid,pub:{kty:"EC",crv:"P-256",x:pubJwk.x,y:pubJwk.y},made:new Date().toISOString(),
      enc:{kdf:"PBKDF2-SHA-256",iter:ITER,salt:b64u(salt),iv:b64u(iv),cipher:"AES-256-GCM",ct:b64u(new Uint8Array(ct))}};});}
/* opened with its password: the key itself, for opening alone (deriveBits), never kept */
function open(s,pw){if(!s||s.kind!==KIND||!s.enc)return Promise.reject(new Error("This is not your reading key's file."));var e=s.enc;
  return derive(pw,unb64u(e.salt),e.iter).then(function(k){return subtle().decrypt({name:"AES-GCM",iv:unb64u(e.iv)},k,unb64u(e.ct));})
    .then(function(pt){var j=JSON.parse(TD.decode(pt));delete j.key_ops;delete j.ext;return subtle().importKey("jwk",j,EC,false,["deriveBits"]);},
      function(){throw new Error("That password does not open your reading key.");});}
function make(pw){return subtle().generateKey(EC,true,["deriveBits"]).then(function(kp){
  return Promise.all([subtle().exportKey("jwk",kp.privateKey),subtle().exportKey("jwk",kp.publicKey)]).then(function(j){
    return PermitCore.kidOf(j[1]).then(function(rid){return seal(j[0],j[1],rid,pw);});});});}
function sealed(){var s=store();if(!mine()||!s)return Promise.resolve(null);
  return Promise.resolve(s.get("readkey")).then(function(k){return k&&k.kind===KIND&&k.enc?k:null;},function(){return null;});}
function pubFile(s){return JSON.stringify({kind:PUBKIND,v:1,keys:[{rid:s.rid,jwk:{kty:"EC",crv:"P-256",x:s.pub.x,y:s.pub.y},made:String(s.made||"").slice(0,10)}]},null,1)+"\n";}
function saveFile(name,text){var go=null;try{if(typeof W.saveFileNative==="function")go=Promise.resolve(W.saveFileNative(name,"application/json",text));}catch(e){go=null;}
  if(go)return go;var l=D.createElement("a");l.href=URL.createObjectURL(new Blob([text],{type:"application/json"}));l.download=name;D.body.appendChild(l);l.click();
  setTimeout(function(){try{URL.revokeObjectURL(l.href);l.remove();}catch(e){}},2000);return Promise.resolve(true);}
function appName(){try{var s=String(state&&state.appName||"ingenium").toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"");return s||"ingenium";}catch(e){return "ingenium";}}
function pickFile(){return new Promise(function(res){var i=D.createElement("input");i.type="file";i.accept=".ingreadkey,.json,application/json";i.style.display="none";D.body.appendChild(i);
  i.onchange=function(){var f=i.files&&i.files[0];i.remove();if(!f){res(null);return;}f.text().then(function(t){try{res(JSON.parse(t));}catch(e){res({bad:true});}},function(){res({bad:true});});};i.click();});}

/* ---------- its card: a password asked, in the room's own kind ---------- */
function closeAsk(){var a=D.getElementById("r357Ask");if(a)a.remove();}
function ask(o){closeAsk();return new Promise(function(res){var w=D.createElement("div");w.id="r357Ask";w.setAttribute("role","dialog");w.setAttribute("aria-modal","true");w.setAttribute("aria-labelledby","r357H");
  w.innerHTML='<form class="sa-card" novalidate><div class="eye">Your reading key</div><h2 id="r357H">'+esc(o.title)+'</h2><p>'+esc(o.lead)+'</p>'
    +'<label>'+esc(o.label)+'<input type="password" id="r357Pw" autocomplete="'+(o.twice?"new-password":"current-password")+'"></label>'
    +(o.twice?'<label>The same password again<input type="password" id="r357Pw2" autocomplete="new-password"></label>':"")
    +'<p class="r357-say" id="r357Say" role="status"></p><div class="sa-keys"><button type="button" class="sc-key quiet" id="r357No">Not now</button><button type="submit" class="sc-key pri" id="r357Yes">'+esc(o.yes)+'</button></div></form>';
  D.body.appendChild(w);var f=w.querySelector("form"),pw=D.getElementById("r357Pw"),pw2=D.getElementById("r357Pw2"),say=D.getElementById("r357Say"),busy=false;
  function done(v){closeAsk();res(v);}
  D.getElementById("r357No").onclick=function(){if(!busy)done(null);};w.addEventListener("keydown",function(e){if(e.key==="Escape"&&!busy){e.preventDefault();done(null);}});
  f.onsubmit=function(e){e.preventDefault();if(busy)return;var v=pw.value;
    if(!v){say.className="r357-say bad";say.textContent="The password first.";pw.focus();return;}
    if(o.twice&&v.length<12){say.className="r357-say bad";say.textContent="At least twelve characters, please.";pw.focus();return;}
    if(o.twice&&v!==pw2.value){say.className="r357-say bad";say.textContent="The two passwords are not the same.";pw2.focus();return;}
    busy=true;D.getElementById("r357Yes").disabled=true;say.className="r357-say";say.textContent=o.busy||"One moment…";
    Promise.resolve(o.go(v)).then(function(r){pw.value="";if(pw2)pw2.value="";done(r==null?true:r);},
      function(err){busy=false;D.getElementById("r357Yes").disabled=false;say.className="r357-say bad";say.textContent=(err&&err.message)||String(err);pw.focus();});};
  setTimeout(function(){try{pw.focus();}catch(e){}},60);});}

/* ---------- in the Security room: Ingenium itself, read as written ---------- */
var KS=null,SAY=null;   /* what is known of her reading key here: null (not looked yet), {none}, or {s} */
function look(){return sealed().then(function(s){var was=KS&&(KS.s?KS.s.rid:"none");KS=s?{s:s}:{none:true};if(was!==(s?s.rid:"none"))paint();return KS;});}
function paint(){try{if(W.IngSecurity&&IngSecurity.paint)IngSecurity.paint();}catch(e){}}
function say(t,cls){SAY={t:t,c:cls||""};var e=D.getElementById("r357Say2");if(e){e.textContent=t;e.className="r348-say "+(cls||"");}}
function state(){if(!mine())return "soon";if(!KS)look();return KS&&KS.s&&carried(KS.s.rid)?"on":"soon";}
function well(chip){if(!mine())return "";if(!KS)look();
  var s=KS&&KS.s,keys="",p,fine;
  if(!KS){p="Looking for your reading key on this device…";}
  else if(!s){p="Every copy of Ingenium is to be scrambled, and you to read it as written: in the Workshop, the Author Studio and Build, opened with your reading key. Make it here, on your own device. It is kept here only under its own password, and its public half goes into the next release, which scrambles every copy and carries your readable copy, sealed so that only this key opens it. Your owner key keeps signing alone.";
    keys='<button type="button" class="sc-key pri" data-rk="make">Make your reading key</button><button type="button" class="sc-key" data-rk="bring">Bring it back from its backup…</button>';}
  else if(!carried(s.rid)){p="Your reading key is here. This release does not carry its public half yet: save it, and give the file for the next release. From that release every copy of Ingenium is scrambled, and yours opens as written with this key.";
    keys='<button type="button" class="sc-key pri" data-rk="pub">Save its public half</button><button type="button" class="sc-key" data-rk="backup">Save a backup of it</button>';}
  else{p="Your reading key is here, and this release carries its public half: the release that scrambles every copy of Ingenium carries your readable copy, sealed to it.";
    keys='<button type="button" class="sc-key" data-rk="backup">Save a backup of it</button>';}
  fine="Ingenium's code, in this copy: as written. A scrambled copy of one of your own apps that comes back to you opens as written, from Fabrica. Keep the key's backup and its password safe, away from this device: without them no one can open a release's readable copy, though your sources stay readable where you keep them.";
  return '<div class="sc-well" id="r357Well"><div class="sc-wh"><b>Read it as written</b>'+chip(state())+'</div><p>'+esc(p)+'</p>'
    +(s?'<dl class="r348-rows"><dt>Your reading key</dt><dd class="r348-fp">'+esc(s.rid)+'</dd><dt>Made</dt><dd>'+esc(String(s.made||"").slice(0,10))+'</dd><dt>In this release</dt><dd>'+(carried(s.rid)?"its public half":"not yet")+'</dd></dl>':"")
    +(keys?'<div class="r357-keys">'+keys+'</div>':"")+'<p class="r348-say '+esc(SAY?SAY.c:"")+'" id="r357Say2" role="status">'+esc(SAY?SAY.t:"")+'</p><p class="sc-fine">'+esc(fine)+'</p></div>';}
function act(k){
  if(k==="make")return ask({title:"Make your reading key",lead:"For opening Ingenium's readable copy, on your own device. Choose its own password: no one can give it back to you.",label:"A password for your reading key (at least twelve characters)",twice:true,yes:"Make it",busy:"Making your key…",
      go:function(pw){return make(pw).then(function(s){return store().put("readkey",s).then(function(){return s;});});}}).then(function(s){if(!s||s===true)return;
      var name=appName()+"-reading-key-"+day()+".ingreadkey";return saveFile(name,JSON.stringify(s,null,1)).then(function(){KS={s:s};say("Your reading key is made, kept here under its password, and its backup is saved ("+name+"). Now save its public half for the next release.","ok");paint();});});
  if(k==="bring")return pickFile().then(function(f){if(!f)return;if(f.bad||f.kind!==KIND){say("That is not a reading key's file.","bad");return;}
      return ask({title:"Bring your reading key back",lead:"The key from its backup, opened once to be sure it is yours, then kept here under the same password.",label:"Its password",yes:"Bring it back",busy:"Opening your key…",
        go:function(pw){return open(f,pw).then(function(){return store().put("readkey",f);});}}).then(function(ok){if(!ok)return;KS={s:f};say("Your reading key is back on this device.","ok");paint();});});
  if(k==="pub")return sealed().then(function(s){if(!s)return;return saveFile("reading_keys.json",pubFile(s)).then(function(){say("Its public half is saved (reading_keys.json). Give that file for the next release; it holds nothing secret.","ok");});});
  if(k==="backup")return sealed().then(function(s){if(!s)return;var name=appName()+"-reading-key-"+day()+".ingreadkey";return saveFile(name,JSON.stringify(s,null,1)).then(function(){say("A backup of your reading key is saved ("+name+"). It opens only with its password.","ok");});});}
D.addEventListener("click",function(e){var b=e.target&&e.target.closest&&e.target.closest("#secCard [data-rk]");if(!b)return;e.preventDefault();
  Promise.resolve(act(b.getAttribute("data-rk"))).then(null,function(err){say((err&&err.message)||String(err),"bad");});});

/* ---------- read it as written: a scrambled copy of one of her apps, matched to the version her Fabrica holds ---------- */
function markOf(html){var m=/<meta name="ingenium-source" content="([a-z0-9][a-z0-9._-]{0,79}) ([0-9a-f]{40})">/.exec(String(html||"").slice(0,1<<20));return m?{slug:m[1],commit:m[2]}:null;}
/* the version as she wrote it: an app in her Fabrica of that name, holding that version; its one page as written (no package, unsigned) */
function holder(mk){if(!mk||!W.IngRepo||typeof IngRepo.list!=="function"||!W.IngShip)return Promise.resolve(null);
  return Promise.resolve(IngRepo.list()).then(function(rs){var c=(rs||[]).filter(function(r){return r&&String(r.slug||r.name||"").toLowerCase()===mk.slug;}),i=0;
    function next(){if(i>=c.length)return null;var r=c[i++];
      return IngShip.onePage(r.id,{ref:mk.commit,quiet:true,unsigned:true}).then(function(x){return x&&typeof x.html==="string"&&!markOf(x.html)?{id:r.id,name:r.name,commit:mk.commit,html:x.html}:next();},function(){return next();});}
    return next();}).then(null,function(){return null;});}
/* the check every app passes as it comes into her library (r352): a copy that names a version her Fabrica holds is offered as written */
if(W.IngAppSign&&typeof IngAppSign.cameIn==="function"){var oCame=IngAppSign.cameIn;
  IngAppSign.cameIn=function(u8,name){return Promise.resolve(oCame.apply(this,arguments)).then(function(x){if(!x||!x.go||!u8||!u8.length||u8[0]===0x50)return x;
      var head;try{head=TD.decode(u8.subarray(0,Math.min(u8.length,1<<20)));}catch(e){return x;}var mk=markOf(head);if(!mk)return x;
      return holder(mk).then(function(h){if(!h)return x;x.asWritten=h;
        return Promise.resolve(IngAppSign.check(TE.encode(h.html))).then(function(r2){x.s2=IngAppSign.brief(r2);return x;},function(){return x;});});});};}

W.IngReadable={state:state,well:well,carried:function(){return KEYS.slice();},markOf:markOf,holder:holder,_sealed:sealed,_open:open,_make:make,_look:look};
setTimeout(function wait(){if(W.__ingReady===true){if(mine())look();}else setTimeout(wait,900);},700);
})();
;try{window.__ingParts["p357"]="running";}catch(_){}
</script>
