<style id="r348-css">
/* ============ R348 · INGENIUM ITSELF, SIGNED AND CHECKED, THE PAGE'S SIDE (Ingenium 7.58, 20 November 2026) ============
   Her request (18 November 2026): "I really want everything to be encrypted and protected ... my code is protected"; the Security
   room's promise (modules/r318.js): "each release signed with your owner key, and checked by the computer apps ... before Ingenium
   opens: a copy changed by anyone else refuses to open, and says which file changed." Where her owner key signs, her answer (20
   November 2026): on her device, a "Sign this release" key in her master copy, so the key never leaves it ("I approve of your
   recommendation, please continue working on my requests.").
   In Settings, Security, Ingenium itself (r318's section asks IngSelfSign for its state and its words):
   - This copy: its version and edition, its build, its page's size and fingerprint (SHA-256, the build number the device build stamps
     in left out, so it is the one BUILD_INFO.txt lists for the release), as the computer app read them at this start
     (desktop/app_self_758.py, self_check), and whether it is signed: Signed, Not signed yet, or why it is not checked.
   - Sign this release (the master edition, with the owner's key on this device: PermitCore's own, "key" in the store offline_owner):
     her owner key's password is asked in a card of the room's own kind; the release's fields are signed with PermitCore's signWith
     (ECDSA P-256, SHA-256, its fixed order) and handed to the computer app (self_signature_put), which checks the signature in Python
     with the public keys it carries, and keeps it. The key and its password never leave the page; the signature is no secret.
   - Save the signature (for her other computers that run the same release), Bring a signature in (one saved on another computer, or
     given by the maker of another edition), Check it now (the page read afresh).
   - A refusal at an earlier start (the computer app keeps the last ten) is said once Ingenium opens again.
   Without a computer app (a browser, the iPhone, iPad and Fire apps) the room says Not yet, and what the computer apps do.
   Its keys lift and sink as the room's own (.sc-key); its card rises in as the first start's ask does; Minimal or reduced motion keeps
   them still. window.IngSelfSign: state(), describe(mine), check(again), sign(), bring(), save(), put(text)
   Shown to her as six pictures one by one at full size (previews/self_sign: not signed, the card, signed, the refusal by day and by
   night, and the room after a refusal), and her word (20 November 2026): "I approve of your preview, please commit and push it
   everywhere and continue working on my requests." */
#secCard .r348-rows{display:grid;grid-template-columns:auto minmax(0,1fr);gap:3px 14px;margin:0;font-size:12.8px;line-height:1.5}
#secCard .r348-rows dt{color:var(--ink-3,#6c6579)} #secCard .r348-rows dd{margin:0;color:var(--ink-1,#221a2e);min-width:0}
#secCard .r348-fp{font:12px/1.5 var(--f-mono,ui-monospace,SFMono-Regular,Menlo,Consolas,monospace);word-break:break-all}
#secCard .r348-say{min-height:1.2em;margin:0;font-size:12.5px;color:var(--ink-3,#6c6579)}
#secCard .r348-say.bad{color:var(--sc-rub-c)} #secCard .r348-say.ok{color:var(--sc-emr-c)}
#r348Ask{--sc-ck:inset 0 1.5px 0 rgba(255,255,255,.95),inset 0 -3px 5px rgba(60,30,90,.16),0 1px 1px rgba(40,20,70,.3),0 3px 4px rgba(40,20,70,.24),0 6px 9px rgba(40,20,70,.18);
  --sc-ckhi:inset 0 1.5px 0 #fff,inset 0 -3px 5px rgba(60,30,90,.14),0 3px 4px rgba(40,20,70,.24),0 9px 16px rgba(40,20,70,.2),0 16px 26px rgba(40,20,70,.14);
  position:fixed;inset:0;z-index:2147482000;display:flex;align-items:center;justify-content:center;padding:18px;background:rgba(22,18,30,.42)}
#r348Ask[hidden]{display:none}
#r348Ask .sa-card{width:min(460px,94vw);border-radius:22px;padding:24px 22px 20px;background:linear-gradient(180deg,#ffffff,#f7f5fa 62%,#efeaf4);color:#221a2e;display:flex;flex-direction:column;gap:10px;font:14px/1.5 -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif;
  box-shadow:inset 0 2px 0 rgba(255,255,255,.45),inset -2px 0 0 #d3cbe0,inset 0 -3px 0 #d3cbe0,0 0 0 1px rgba(40,22,68,.1),0 9px 12px -7px rgba(40,22,68,.18),0 22px 40px -14px rgba(40,22,68,.26);animation:r348Rise .4s cubic-bezier(.2,.9,.25,1.2) backwards;transition:transform .3s cubic-bezier(.2,.9,.25,1.2);margin:0}
#r348Ask .sa-card:hover{transform:translateY(-3px)}
body[data-theme="night"] #r348Ask{--sc-ck:inset 0 1.5px 0 rgba(255,255,255,.16),inset 0 -3px 5px rgba(0,0,0,.45),0 1px 1px rgba(0,0,0,.65),0 3px 4px rgba(0,0,0,.55),0 6px 9px rgba(0,0,0,.45);
  --sc-ckhi:inset 0 1.5px 0 rgba(255,255,255,.2),inset 0 -3px 5px rgba(0,0,0,.4),0 3px 4px rgba(0,0,0,.6),0 9px 16px rgba(0,0,0,.5),0 16px 26px rgba(0,0,0,.4)}
body[data-theme="night"] #r348Ask .sa-card{background:linear-gradient(180deg,#342a4c,#2c2341 62%,#241c36);color:#ece6f6;box-shadow:inset 0 2px 0 rgba(255,255,255,.12),inset -2px 0 0 #140e1c,inset 0 -3px 0 #140e1c,0 0 0 1px rgba(0,0,0,.4),0 22px 40px -14px rgba(0,0,0,.6)}
#r348Ask .eye{font:700 10.5px/1 inherit;letter-spacing:.12em;text-transform:uppercase;opacity:.65;text-align:center}
#r348Ask h2{font:700 22px/1.2 "Iowan Old Style","Palatino Linotype",Palatino,Georgia,serif;text-align:center;margin:0}
#r348Ask p{margin:0;font-size:13.5px;opacity:.82;text-align:center}
#r348Ask .r348-fp{font:12px/1.5 ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;opacity:1;word-break:break-all}
#r348Ask label{display:flex;flex-direction:column;gap:5px;font-size:12.8px;font-weight:600;margin-top:4px}
#r348Ask input{font:15px/1.3 inherit;padding:10px 12px;border-radius:11px;border:1px solid rgba(40,22,68,.16);background:#fff;color:#221a2e;
  box-shadow:inset 0 2px 4px rgba(40,22,68,.1),0 1px 0 rgba(255,255,255,.9);outline:none;transition:box-shadow .18s}
#r348Ask input:focus{box-shadow:inset 0 2px 4px rgba(40,22,68,.1),0 0 0 3px rgba(106,63,181,.28)}
body[data-theme="night"] #r348Ask input{background:#1d1729;color:#f1ecf8;border-color:rgba(205,184,240,.16);box-shadow:inset 0 2px 5px rgba(0,0,0,.45)}
#r348Ask .r348-say{min-height:1.3em;font-size:12.8px}
#r348Ask .r348-say.bad{color:#b8433f;opacity:1} body[data-theme="night"] #r348Ask .r348-say.bad{color:#f08a8a}
#r348Ask .sa-keys{display:flex;justify-content:flex-end;gap:10px;margin-top:6px}
#r348Ask .sc-key{display:inline-flex;align-items:center;gap:6px;border:1px solid transparent;font:600 12.5px/1.3 var(--sans,system-ui);padding:6px 11px;border-radius:7px;white-space:nowrap;cursor:pointer;box-shadow:var(--sc-ck);transition:transform .16s cubic-bezier(.34,1.35,.64,1),box-shadow .16s}
#r348Ask .sc-key:hover{transform:translateY(-3px);box-shadow:var(--sc-ckhi)} #r348Ask .sc-key:active{transform:translateY(1px)}
#r348Ask .sc-key.pri{background:linear-gradient(180deg,#7348be,#5d37a1);border-color:#4b2a86;color:#fff;border-radius:10px;padding:8px 14px;box-shadow:inset 0 1px 0 rgba(255,255,255,.24),0 1px 0 #3a2070,0 3px 6px rgba(52,24,100,.26),0 8px 14px rgba(52,24,100,.12)}
#r348Ask .sc-key.quiet{background:none;box-shadow:none;color:#6a3fb5} body[data-theme="night"] #r348Ask .sc-key.quiet{color:#c9b8ee}
#r348Ask .sc-key.quiet:hover{box-shadow:var(--sc-ck)}
#r348Ask .sc-key[disabled]{opacity:.6;cursor:default;transform:none}
@keyframes r348Rise{from{opacity:0;transform:translateY(8px) scale(.985)}}
body[data-motion="minimal"] #r348Ask *{animation:none !important;transition:none !important}
body[data-motion="minimal"] #r348Ask *:hover{transform:none !important}
@media (prefers-reduced-motion:reduce){#r348Ask *{animation:none !important;transition:none !important}#r348Ask *:hover{transform:none !important}}
</style>
<script>try{(window.__ingParts=window.__ingParts||{})["p348"]="started";}catch(_){}
(function r348(){
"use strict";
if(window.IngSelfSign)return;
var W=window,D=document;
function api(){try{var a=W.pywebview&&W.pywebview.api;if(a&&typeof a.self_check==="function")return a;}catch(e){}
  /* part two (modules/r355.js, held until her word on its pictures): the iPhone, iPad and Fire apps answer the same calls */
  try{return W.IngSelf2&&IngSelf2.api?IngSelf2.api():null;}catch(e){return null;}}
function esc(s){return String(s==null?"":s).replace(/[&<>"']/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c];});}
function edition(){try{return typeof ING_EDITION==="string"?ING_EDITION:"master";}catch(e){return "master";}}
function toast(m){try{if(typeof W.ingToast==="function")W.ingToast(m);else if(typeof W.toast==="function")W.toast(m);}catch(e){}}
function warn(e){try{console.warn("r348",e);}catch(_){}}
var MONTHS=["January","February","March","April","May","June","July","August","September","October","November","December"];
function day(iso){var m=/^(\d{4})-(\d\d)-(\d\d)/.exec(String(iso||""));return m?(+m[3])+" "+MONTHS[+m[2]-1]+" "+m[1]:"";}
function dayOf(t){try{var d=new Date(t*1000);return d.getDate()+" "+MONTHS[d.getMonth()]+" "+d.getFullYear();}catch(e){return "";}}
function fp(h){h=String(h||"");return h.length===64?h.slice(0,8)+" "+h.slice(8,16)+" … "+h.slice(-8):h;}
function bytes(n){try{return Number(n||0).toLocaleString("en-GB");}catch(e){return String(n||0);}}
var ST=null,ASKED=0,KEY=null,KEYREAD=false,SAY={t:"",cls:""},BUSY=false;
function repaint(){try{if(W.IngSecurity&&IngSecurity.paint)IngSecurity.paint();}catch(e){}}
function show(){try{if(W.IngSecurity&&IngSecurity.view&&IngSecurity.view()!=="self")IngSecurity.view("self");else repaint();}catch(e){repaint();}}
/* the computer app's answer, asked at most every four seconds as the room paints; the room is painted again only when it changed */
function mark(x){return x?[x.state,x.version,x.edition,(x.signed||{}).made,x.own,(x.refused||[]).length,(x.files&&x.files["ingenium.html"]||{}).sha256].join("/"):"";}
function check(again){var a=api();if(!a)return Promise.resolve(null);ASKED=Date.now();
  return Promise.resolve(a.self_check(!!again)).then(function(s){var was=mark(ST);if(s&&s.state)ST=s;if(was!==mark(ST))repaint();return ST;},function(e){warn(e);return ST;});}
/* the owner's key on this device (PermitCore's store; only in the master edition) */
function readKey(){KEYREAD=true;if(edition()!=="master"||!W.PermitCore||!PermitCore._||typeof PermitCore._.get!=="function")return Promise.resolve(null);
  return PermitCore._.get("key").then(function(k){var was=!!KEY;KEY=k&&k.kid&&k.enc?k:null;if(was!==!!KEY)repaint();return KEY;},function(){KEY=null;return null;});}
function carried(){return !!(KEY&&ST&&Array.isArray(ST.keys)&&ST.keys.indexOf(KEY.kid)>=0);}
function state(){if(!api())return "soon";if(!ST)return "off";return ST.state==="signed"&&!ST.own?"on":"off";}
function words(mine){if(W.IngSelf2&&IngSelf2.words){try{var x=IngSelf2.words(mine,ST);if(x)return x;}catch(e){warn(e);}}return {
  noapp:mine?"Already: Ingenium's Fire app is signed with your Android key, so the tablet refuses an update signed with any other. In the Mac and Windows apps, a release you sign with your owner key is checked at every start: a copy changed by anyone else refuses to open, and says which file changed. Not yet: the iPhone, iPad and Fire apps check it too."
    :"Already: Ingenium's Fire app is signed by its maker, so the tablet refuses an update signed with any other key. In the Mac and Windows apps, a release signed by its maker is checked at every start: a copy changed by anyone else refuses to open, and says which file changed. Not yet: the iPhone, iPad and Fire apps check it too.",
  signed:function(d){return mine?"Signed with your owner key"+(d?" on "+d:"")+", and checked at this start: this is the copy you signed. From now on, a copy of it changed by anyone else refuses to open, and says which file changed."
    :"Signed by its maker"+(d?" on "+d:"")+", and checked at this start: this is the copy its maker signed. A copy of it changed by anyone else refuses to open, and says which file changed.";},
  unsigned:mine?"Not signed yet. Sign it once you have installed it from your own release: from then on, this computer checks it at every start, and a copy changed by anyone else refuses to open."
    :"Not signed yet. Bring in the signature its maker gave you: from then on, this computer checks it at every start, and a copy changed by anyone else refuses to open.",
  fine:mine?"Your owner key never leaves this device: the signature is made here, and the computer app keeps it and checks it at every start. Your other computers that run this release take the same signature: save it here, and bring it in there. Someone who can change the computer app itself, or take its signatures away, can stop the check; Ingenium then says Not signed yet. Not yet: the iPhone, iPad and Fire apps check it too, and each release carries your signature to the copies you give."
    :"The computer app keeps the signature and checks it at every start. Someone who can change the computer app itself, or take its signatures away, can stop the check; Ingenium then says Not signed yet. Not yet: the iPhone, iPad and Fire apps check it too."};}
function chipOf(s){if(!s)return '<span class="sc-chip soon">Checking</span>';if(s.own)return '<span class="sc-chip soon">Your own page</span>';
  return s.state==="signed"?'<span class="sc-chip ok">Signed</span>':s.state==="changed"?'<span class="sc-chip off">Changed</span>':s.state==="unchecked"?'<span class="sc-chip soon">Not checked</span>':'<span class="sc-chip off">Not signed yet</span>';}
function changedWords(s){return (s.changed||[]).map(function(c){return c.why==="version"?esc(c.name)+" names Ingenium "+esc((c.now||{}).version||"of no version")+", not the "+esc((c.want||{}).version)+" you signed"
  :c.why==="edition"?esc(c.name)+" names the "+esc((c.now||{}).edition)+" edition, not the "+esc((c.want||{}).edition)+" you signed":c.why==="missing"?esc(c.name)+" is no longer there":esc(c.name)+" is not the file you signed";}).join("; ");}
function describe(mine){var a=api(),w=words(mine);
  if(a&&Date.now()-ASKED>4000)check(false);
  if(a&&!KEYREAD)readKey();
  if(!a)return '<p>'+esc(w.noapp)+'</p>';
  var s=ST,h='<div class="sc-well"><div class="sc-wh"><b>This copy</b>'+chipOf(s)+'</div>';
  if(!s)return h+'<p>Checking this copy…</p></div>';
  var pg=(s.files&&s.files["ingenium.html"])||{};
  h+='<dl class="r348-rows"><dt>Ingenium</dt><dd>'+esc(s.version||"of no version")+', the '+esc(s.edition||"master")+' edition, on this '+esc(s.platform||"computer")+'</dd>'
    +(s.build?'<dt>Build</dt><dd>'+esc(s.build)+'</dd>':'')
    +'<dt>Its page</dt><dd>ingenium.html, '+bytes(pg.size)+' bytes</dd><dt>Fingerprint</dt><dd class="r348-fp">'+esc(fp(pg.sha256))+'</dd></dl>';
  var p="";
  if(s.own)p="You run your own page, chosen in Fabrica, in place of the built one. Your own page is yours and is never refused; the built page is checked: "
    +(s.state==="signed"?"it is the copy you signed.":s.state==="changed"?changedWords(s)+".":"it is not signed yet.");
  else if(s.state==="signed")p=w.signed(day((s.signed||{}).made));
  else if(s.state==="changed")p="This copy is not the one signed: "+changedWords(s)+".";
  else if(s.state==="unchecked")p="Not checked: "+esc(s.why||"the check could not run here")+".";
  else p=w.unsigned;
  h+='<p>'+p+'</p>';
  var keys="";
  if(mine&&s.state==="unsigned"&&!s.own&&!s.mobile){if(KEY&&carried())keys+='<button type="button" class="sc-key pri" data-ss="sign">Sign this release</button>';
    else if(KEY)h+='<p class="sc-fine">Your owner key on this device is not one this copy carries, so its signature could not be checked here. Save its public half (Settings, Licence and permissions) for the next release.</p>';
    else if(KEYREAD)h+='<p class="sc-fine">Your owner key is not on this device. Bring it in (Settings, Licence and permissions), or bring in the signature you made on another computer.</p>';}
  if(s.state==="signed"&&!s.mobile)keys+='<button type="button" class="sc-key lav" data-ss="save">Save the signature</button>';   /* a phone or tablet takes the signature from her computer */
  else if(s.state!=="unchecked"||s.can)keys+='<button type="button" class="sc-key lav" data-ss="bring">Bring a signature in</button>';
  keys+='<button type="button" class="sc-key lav" data-ss="check">Check it now</button>';
  if(W.IngSelf2&&IngSelf2.keys){try{keys+=IngSelf2.keys(s,mine,!!(KEY&&carried()));}catch(e){warn(e);}}
  h+='<div class="sc-keys">'+keys+'</div><p class="r348-say'+(SAY.cls?" "+SAY.cls:"")+'" aria-live="polite">'+esc(SAY.t)+'</p></div>';
  var rf=(s.refused||[]).slice(-1)[0];
  if(rf)h+='<div class="sc-well"><div class="sc-wh"><b>Refused to open</b><span class="sc-chip off">'+esc(dayOf(rf.at))+'</span></div><p>Ingenium '+esc(rf.version||"")+' did not open: '
    +changedWords({changed:rf.changed||[]})+'. It opened again once its page was the one signed.</p></div>';
  h+='<p class="sc-fine">'+esc(w.fine)+'</p>';
  return h;}
/* Sign this release: her owner key's password, in a card of the room's own kind (outside the room, so the room may paint meanwhile) */
function closeAsk(){var a=D.getElementById("r348Ask");if(a)a.remove();}
function ask(){if(!ST||!KEY||!carried()||BUSY)return;closeAsk();var pg=(ST.files&&ST.files["ingenium.html"])||{};
  var w=D.createElement("div");w.id="r348Ask";w.setAttribute("role","dialog");w.setAttribute("aria-modal","true");w.setAttribute("aria-labelledby","r348AskH");
  w.innerHTML='<form class="sa-card" autocomplete="off"><div class="eye">Ingenium itself, signed and checked</div><h2 id="r348AskH">Sign this release</h2>'
    +'<p>Ingenium '+esc(ST.version)+', the '+esc(ST.edition)+' edition. Its page\'s fingerprint:</p><p class="r348-fp">'+esc(fp(pg.sha256))+'</p>'
    +'<p>Sign only a copy you installed from your own release. Your key stays on this device.</p>'
    +(W.IngSelf2&&IngSelf2.askNote?IngSelf2.askNote(ST):'')
    +'<label for="r348Pw">Your owner key\'s password<input type="password" id="r348Pw" autocomplete="off" spellcheck="false"></label>'
    +'<p class="r348-say" id="r348Say" aria-live="polite"></p>'
    +'<div class="sa-keys"><button type="button" class="sc-key quiet" id="r348No">Not now</button><button type="submit" class="sc-key pri" id="r348Yes">Sign this release</button></div></form>';
  D.body.appendChild(w);
  var f=w.querySelector("form"),pw=D.getElementById("r348Pw"),say=D.getElementById("r348Say"),yes=D.getElementById("r348Yes"),no=D.getElementById("r348No");
  no.onclick=function(){closeAsk();};
  w.addEventListener("keydown",function(e){if(e.key==="Escape"&&!BUSY){e.preventDefault();closeAsk();}});
  f.onsubmit=function(e){e.preventDefault();if(BUSY)return;var v=pw.value;if(!v){say.textContent="Your owner key's password first.";say.className="r348-say bad";pw.focus();return;}
    BUSY=true;yes.disabled=no.disabled=pw.disabled=true;say.className="r348-say";say.textContent="Signing…";
    sign(v).then(function(r){BUSY=false;v="";pw.value="";
      if(r&&r.ok){closeAsk();SAY={t:"Signed and checked: this copy is the one you signed.",cls:"ok"};toast("Ingenium "+(ST&&ST.version||"")+" is signed with your owner key, and checked.");show();return;}
      yes.disabled=no.disabled=pw.disabled=false;say.className="r348-say bad";say.textContent=(r&&r.error)||"It could not be signed.";pw.focus();},
      function(e){BUSY=false;v="";pw.value="";yes.disabled=no.disabled=pw.disabled=false;say.className="r348-say bad";say.textContent=(e&&e.message)||"It could not be signed.";pw.focus();});};
  setTimeout(function(){try{pw.focus();}catch(e){}},60);}
/* the release's fields, signed with PermitCore's own signWith (its fixed order), then checked and kept by the computer app */
function sign(pw){var a=api();if(!a||!ST||!KEY)return Promise.resolve({ok:false,error:"This copy cannot be signed here."});
  var body={kind:"ingenium-release",v:1,app:"ingenium",version:ST.version,edition:ST.edition,files:ST.files,made:new Date().toISOString()},kid=KEY.kid;
  var key=null;
  return PermitCore.openKey(KEY,pw).then(function(k){key=k;return PermitCore.signWith(k,body);}).then(function(sg){
    return Promise.resolve(a.self_signature_put(JSON.stringify({kind:"ingenium-release-signature",v:1,release:body,kid:kid,sig:sg})));}).then(function(r){
      if(r&&r.state){ST=r;}if(!(r&&r.ok&&r.state==="signed"))return {ok:false,error:(r&&r.error)||"The computer app did not keep the signature."};
      /* part two (r355): the same key, while it is open, signs the copy her phones and tablets carry */
      if(W.IngSelf2&&IngSelf2.alsoSign)return Promise.resolve(IngSelf2.alsoSign(a,key,kid,ST)).then(function(s2){if(s2&&s2.state)ST=s2;return r;},function(e){warn(e);return r;});
      return r;});}
function put(text){var a=api();if(!a)return Promise.resolve(null);SAY={t:"Checking the signature…",cls:""};repaint();
  return Promise.resolve(a.self_signature_put(String(text||""))).then(function(r){
    if(r&&r.ok&&r.state){ST=r;SAY=r.state==="signed"?{t:"Brought in and checked: this copy is the one signed.",cls:"ok"}:{t:"Brought in.",cls:""};if(r.state==="signed")toast("The signature is brought in, and this copy is the one signed.");}
    else SAY={t:(r&&r.error)||"That signature could not be brought in.",cls:"bad"};show();return r;},
    function(e){warn(e);SAY={t:"That signature could not be brought in.",cls:"bad"};show();return null;});}
function bring(){var i=D.createElement("input");i.type="file";i.accept=".ingsig,.json,application/json";i.style.display="none";D.body.appendChild(i);
  i.onchange=function(){var f=i.files&&i.files[0];i.remove();if(!f)return;if(f.size>65536){SAY={t:"That file is not a signature of Ingenium.",cls:"bad"};show();return;}
    var r=new FileReader();r.onload=function(){put(String(r.result||""));};r.onerror=function(){SAY={t:"That file could not be read.",cls:"bad"};show();};r.readAsText(f);};
  i.click();}
function save(){var a=api();if(!a)return Promise.resolve(null);
  return Promise.resolve(a.self_signature_get()).then(function(r){if(!r||!r.ok){SAY={t:(r&&r.error)||"The signature could not be read.",cls:"bad"};show();return null;}
    /* the page's own way of saving a file (saveFileNative: the computer app's save dialog), else the browser's download */
    var go=null;try{if(typeof W.saveFileNative==="function")go=Promise.resolve(W.saveFileNative(r.name,"application/json",r.text));}catch(e){go=null;}
    if(!go){var l=D.createElement("a");l.href=URL.createObjectURL(new Blob([r.text],{type:"application/json"}));l.download=r.name;D.body.appendChild(l);l.click();
      setTimeout(function(){try{URL.revokeObjectURL(l.href);l.remove();}catch(e){}},2000);go=Promise.resolve(true);}
    return go.then(function(res){SAY=res===false||res===null?{t:"Not saved.",cls:""}:{t:"Saved as “"+r.name+"”: bring it in on your other computers that run Ingenium "+(ST&&ST.version||"")+".",cls:"ok"};show();return res;},
      function(e){warn(e);SAY={t:"It could not be saved.",cls:"bad"};show();return null;});},function(e){warn(e);return null;});}
function again(){SAY={t:"Checking this copy…",cls:""};repaint();return check(true).then(function(s){
  SAY=s?{t:s.state==="signed"?"Checked just now: this copy is the one signed.":s.state==="changed"?"Checked just now: this copy is not the one signed.":s.state==="unchecked"?"Not checked: "+(s.why||""):"Checked just now: not signed yet.",cls:s.state==="signed"?"ok":s.state==="changed"?"bad":""}:SAY;show();return s;});}
D.addEventListener("click",function(e){var b=e.target&&e.target.closest&&e.target.closest("#secCard [data-ss]");if(!b)return;e.preventDefault();var k=b.getAttribute("data-ss");
  if(k==="sign")ask();else if(k==="bring")bring();else if(k==="save")save();else if(k==="check")again();
  else if(W.IngSelf2&&IngSelf2.act)IngSelf2.act(k,{st:function(){return ST;},key:function(){return KEY;},api:api,set:function(x){if(x&&x.state)ST=x;},say:function(t,c){SAY={t:t,cls:c||""};show();},busy:function(v){if(v!=null)BUSY=!!v;return BUSY;}});});
/* at start: the computer app's answer, and the owner's key, once the page is ready */
(function wait(){var n=0;(function t(){if(W.__ingReady===true){setTimeout(function(){if(api()){check(false);readKey();}},600);return;}if(++n<400)setTimeout(t,500);})();})();
W.IngSelfSign={state:state,describe:describe,check:check,sign:function(){ask();},bring:bring,save:save,put:put,_st:function(){return ST;},_key:readKey,_esc:esc,_fp:fp,_day:day,_bytes:bytes};
})();
;try{window.__ingParts["p348"]="running";}catch(_){}
</script>
