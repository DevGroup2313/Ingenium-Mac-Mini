<style id="r355-css">
/* ============ R355 · INGENIUM ITSELF, SIGNED AND CHECKED, PART TWO (Ingenium 7.64, 21 November 2026; approved on its eight pictures: "I approve of the previews, please commit and push it everywhere and continue working on my requests") ============
   The Security room's promise (modules/r318.js, approved on the live preview of 18 November 2026): "each release signed with your owner
   key, and checked by the computer apps and the iPhone, iPad and Fire apps before Ingenium opens: a copy changed by anyone else refuses
   to open, and says which file changed." Part one (7.58: modules/r348.js, desktop/app_self_758.py) is the Mac and Windows apps. Part
   two, next on her list after 7.63 ("Please continue working on my requests", 21 November 2026):
   - The iPhone, iPad and Fire apps check their copy of Ingenium at every start, before anything of it runs, against a signature of hers
     brought into them (their own side is in the Fire and iPhone repository). The page's side is here: their bridge (window.INB, its calls
     selfCheck, selfSignaturePut and selfSignatureGet) answers r348 as the computer app does, and the room speaks of this phone or tablet.
   - Their copy is not the release's page but made from it (tools/app_page.py: without the engine and the kit store, its later blocks in
     files beside it, the build number stamped in), so a signature of the release's page cannot fit it. Her master copy signs their copy
     too, with the same key while it is open: Sign this release signs the copy her computers run and the copy her phones and tablets
     carry, and Save the signature saves one file that each of her devices takes.
   - The copies she gives (the full and gift editions): Sign a copy you give, in her master copy, on a computer: the edition's page is
     chosen and read by the computer app, signed with her owner key, and saved as a file to give with that copy. Whoever runs it brings it
     in once, and their apps check that copy at every start (Signed by its maker).
   window.IngSelf2: api(), words(mine, st), keys(s, mine, canSign), alsoSign(api, key, kid, st), act(k, ctx), askNote(st) */
#r348Ask .r355-ed{font-weight:600;color:inherit}
/* a fingerprint breaks only between its groups, never inside one: on a phone the room is narrow, and r348's break-all cut a group in two */
#secCard .r348-fp,#r348Ask .r348-fp{word-break:normal;overflow-wrap:anywhere}
</style>
<script>try{(window.__ingParts=window.__ingParts||{})["p355"]="started";}catch(_){}
/* R355 · Ingenium itself, signed and checked, part two: see the note at the top of its styles */
(function r355(){
"use strict";
var W=window,D=document;
if(W.IngSelf2)return;
function edition(){try{return typeof ING_EDITION==="string"?ING_EDITION:"master";}catch(e){return "master";}}
function warn(e){try{console.warn("r355",e);}catch(_){}}
function toast(m){try{if(typeof W.ingToast==="function")W.ingToast(m);else if(typeof W.toast==="function")W.toast(m);}catch(e){}}
function S(){return W.IngSelfSign||{};}
function esc(x){return S()._esc?S()._esc(x):String(x==null?"":x);}
function fp(x){return S()._fp?S()._fp(x):String(x||"");}
/* ---------- the phone's or tablet's own side, through its bridge (the page's INB) ---------- */
var NAT=null,NATOK=null;   /* NATOK: null while not yet asked, false for an app made before part two (it does not know the calls) */
function inb(){try{return W.INB&&typeof W.INB.call==="function"?W.INB:null;}catch(e){return null;}}
function host(){try{var a=W.pywebview&&W.pywebview.api;return a&&typeof a.self_check==="function"?a:null;}catch(e){return null;}}
function api(){var n=inb();if(!n||NATOK===false)return null;
  if(!NAT)NAT={mobile:true,
    self_check:function(again){return n.call("selfCheck",{again:!!again}).then(function(r){NATOK=true;return r;},function(e){if(/Unknown request/i.test(String(e&&e.message)))NATOK=false;throw e;});},
    self_signature_put:function(text){return n.call("selfSignaturePut",{text:String(text||"")});},
    self_signature_get:function(){return n.call("selfSignatureGet",{});}};
  return NAT;}
/* ---------- the room's words ---------- */
function words(mine,st){var mob=!!(st&&st.mobile),dev=(st&&st.platform)||(mob?"device":"computer");
  return {
  noapp:mine?"In the Mac and Windows apps and the iPhone, iPad and Fire apps, a release you sign with your owner key is checked at every start: a copy changed by anyone else refuses to open, and says which file changed. Ingenium's Fire app is also signed with your Android key, so the tablet refuses an update signed with any other. A page opened in a browser is not checked."
    :"In the Mac and Windows apps and the iPhone, iPad and Fire apps, a release signed by its maker is checked at every start: a copy changed by anyone else refuses to open, and says which file changed. A page opened in a browser is not checked.",
  signed:function(d){return mine?"Signed with your owner key"+(d?" on "+d:"")+", and checked at this start: this is the copy you signed. From now on, a copy of it changed by anyone else refuses to open on this "+dev+", and says which file changed."
    :"Signed by its maker"+(d?" on "+d:"")+", and checked at this start: this is the copy its maker signed. A copy of it changed by anyone else refuses to open on this "+dev+", and says which file changed.";},
  unsigned:mob?(mine?"Not signed yet. Bring in the signature you saved when you signed this release on your computer: from then on, this "+dev+" checks it at every start, and a copy changed by anyone else refuses to open."
      :"Not signed yet. Bring in the signature its maker gave you: from then on, this "+dev+" checks it at every start, and a copy changed by anyone else refuses to open.")
    :(mine?"Not signed yet. Sign it once you have installed it from your own release: from then on, this computer checks it at every start, and a copy changed by anyone else refuses to open."
      :"Not signed yet. Bring in the signature its maker gave you: from then on, this computer checks it at every start, and a copy changed by anyone else refuses to open."),
  fine:mob?(mine?"This "+dev+" keeps the signature and checks it at every start, before anything of Ingenium runs; your owner key never comes here. Someone who can change the app itself, or take its signature away, can stop the check; Ingenium then says Not signed yet."
      :"This "+dev+" keeps the signature and checks it at every start, before anything of Ingenium runs. Someone who can change the app itself, or take its signature away, can stop the check; Ingenium then says Not signed yet.")
    :(mine?"Your owner key never leaves this device: the signature is made here, for the copy your computers run and the copy your phones and tablets carry, and Save the signature saves one file that each of them takes. Someone who can change the computer app itself, or take its signatures away, can stop the check; Ingenium then says Not signed yet."
      :"The computer app keeps the signature and checks it at every start. Someone who can change the computer app itself, or take its signatures away, can stop the check; Ingenium then says Not signed yet.")};}
/* ---------- her master copy, on a computer: the keys part two adds ---------- */
function keys(s,mine,canSign){var a=host(),h="";if(!s||s.mobile||!mine||!canSign||!a||edition()!=="master")return h;
  if(s.state==="signed"&&!s.own&&typeof a.self_mobile_fields==="function"&&!s.mobile_signed)h+='<button type="button" class="sc-key lav" data-ss="mobile">Sign it for your phones and tablets</button>';
  if(typeof a.self_give_pick==="function")h+='<button type="button" class="sc-key lav" data-ss="give">Sign a copy you give</button>';
  return h;}
/* the line r348's Sign this release card adds when the computer app can read the copy her phones and tablets carry */
function askNote(st){var a=host();return a&&typeof a.self_mobile_fields==="function"&&st&&!st.mobile?'<p>It signs the copy your computers run and the copy your iPhone, iPad and Fire tablet carry, and Save the signature then saves one file that each of them takes.</p>':"";}
function body(f,app){return {kind:"ingenium-release",v:1,app:app,version:f.version,edition:f.edition,files:f.files,made:new Date().toISOString()};}
function signed(b,kid,sg){return {kind:"ingenium-release-signature",v:1,release:b,kid:kid,sig:sg};}
/* Sign this release, in r348: the same key, while it is open, signs the copy her phones and tablets carry, and the computer app keeps it */
function alsoSign(a,key,kid,st){if(!a||typeof a.self_mobile_fields!=="function"||typeof a.self_mobile_signature_put!=="function")return Promise.resolve(null);
  return Promise.resolve(a.self_mobile_fields()).then(function(f){if(!f||!f.ok||!f.files)return null;var b=body(f,"ingenium-mobile");
    return PermitCore.signWith(key,b).then(function(sg){return a.self_mobile_signature_put(JSON.stringify(signed(b,kid,sg)));});});}
/* a card of r348's own kind (its id, so its look and its night): one password, then the work */
function card(o){var old=D.getElementById("r348Ask");if(old)old.remove();
  var w=D.createElement("div");w.id="r348Ask";w.setAttribute("role","dialog");w.setAttribute("aria-modal","true");w.setAttribute("aria-labelledby","r348AskH");
  w.innerHTML='<form class="sa-card" autocomplete="off"><div class="eye">Ingenium itself, signed and checked</div><h2 id="r348AskH">'+esc(o.title)+'</h2>'+o.body
    +'<label for="r348Pw">Your owner key\'s password<input type="password" id="r348Pw" autocomplete="off" spellcheck="false"></label>'
    +'<p class="r348-say" id="r348Say" aria-live="polite"></p>'
    +'<div class="sa-keys"><button type="button" class="sc-key quiet" id="r348No">Not now</button><button type="submit" class="sc-key pri" id="r348Yes">'+esc(o.yes)+'</button></div></form>';
  D.body.appendChild(w);var f=w.querySelector("form"),pw=D.getElementById("r348Pw"),say=D.getElementById("r348Say"),yes=D.getElementById("r348Yes"),no=D.getElementById("r348No"),busy=false;
  function close(){w.remove();}
  no.onclick=close;w.addEventListener("keydown",function(e){if(e.key==="Escape"&&!busy){e.preventDefault();close();}});
  f.onsubmit=function(e){e.preventDefault();if(busy)return;var v=pw.value;if(!v){say.textContent="Your owner key's password first.";say.className="r348-say bad";pw.focus();return;}
    busy=true;yes.disabled=no.disabled=pw.disabled=true;say.className="r348-say";say.textContent=o.doing;
    Promise.resolve().then(function(){return o.work(v);}).then(function(r){busy=false;v="";pw.value="";if(r&&r.ok){close();return;}
      yes.disabled=no.disabled=pw.disabled=false;say.className="r348-say bad";say.textContent=(r&&r.error)||"It could not be signed.";pw.focus();},
      function(err){busy=false;v="";pw.value="";yes.disabled=no.disabled=pw.disabled=false;say.className="r348-say bad";say.textContent=(err&&err.message)||"It could not be signed.";pw.focus();});};
  setTimeout(function(){try{pw.focus();}catch(e){}},60);return w;}
function saveFile(name,text){var go=null;try{if(typeof W.saveFileNative==="function")go=Promise.resolve(W.saveFileNative(name,"application/json",text));}catch(e){go=null;}
  if(go)return go;var l=D.createElement("a");l.href=URL.createObjectURL(new Blob([text],{type:"application/json"}));l.download=name;D.body.appendChild(l);l.click();
  setTimeout(function(){try{URL.revokeObjectURL(l.href);l.remove();}catch(e){}},2000);return Promise.resolve(true);}
function act(k,ctx){var a=host();if(!a)return;var key=ctx.key(),st=ctx.st();if(!key||ctx.busy())return;
  if(k==="mobile"){if(!st)return;
    card({title:"Sign it for your phones and tablets",yes:"Sign it",doing:"Signing…",
      body:'<p>Ingenium '+esc(st.version)+', the '+esc(st.edition)+' edition, as your iPhone, iPad and Fire tablet carry it. Your key stays on this device.</p>',
      work:function(pw){return PermitCore.openKey(key,pw).then(function(kk){return alsoSign(a,kk,key.kid,st);}).then(function(r){
        if(r&&r.state){ctx.set(r);ctx.say("Signed for your phones and tablets: Save the signature saves one file that each of your devices takes.","ok");toast("Ingenium "+(st.version||"")+" is signed for your phones and tablets.");return {ok:true};}
        return {ok:false,error:(r&&r.error)||"The computer app did not keep it."};});}});
    return;}
  if(k==="give"){Promise.resolve(a.self_give_pick()).then(function(g){if(!g)return;if(!g.ok){ctx.say(g.error||"That page could not be read.","bad");return;}
    var pg=(g.files&&g.files["ingenium.html"])||{};
    card({title:"Sign a copy you give",yes:"Sign and save",doing:"Signing…",
      body:'<p>Ingenium '+esc(g.version)+', <span class="r355-ed">the '+esc(g.edition)+' edition</span> ('+esc(g.name||"its page")+'). Its page\'s fingerprint:</p><p class="r348-fp">'+esc(fp(pg.sha256))+'</p>'
        +'<p>Give the signature with the copy: whoever runs it brings it in once, and their apps check that copy at every start. Your key stays on this device.</p>',
      work:function(pw){var kid=key.kid,kk=null,list=[];
        return PermitCore.openKey(key,pw).then(function(x){kk=x;var b=body(g,"ingenium");return PermitCore.signWith(kk,b).then(function(sg){list.push(signed(b,kid,sg));});})
          .then(function(){if(!g.mobile_files)return;var b=body({version:g.version,edition:g.edition,files:g.mobile_files},"ingenium-mobile");return PermitCore.signWith(kk,b).then(function(sg){list.push(signed(b,kid,sg));});})
          .then(function(){var text=JSON.stringify(list.length>1?{kind:"ingenium-release-signatures",v:1,signatures:list}:list[0]);
            var name="ingenium-"+g.edition+"-"+g.version+"-"+String(pg.sha256||"").slice(0,12)+".ingsig";
            return saveFile(name,text).then(function(res){if(res===false||res===null){ctx.say("Not saved.","");return {ok:true};}
              ctx.say("Saved as “"+name+"”: give it with the "+g.edition+" edition. Whoever runs it brings it in once, in Settings, Security, Ingenium itself.","ok");return {ok:true};});});}});},
    function(e){warn(e);ctx.say("That page could not be read.","bad");});}}
W.IngSelf2={api:api,words:words,keys:keys,alsoSign:alsoSign,act:act,askNote:askNote};
})();
;try{window.__ingParts["p355"]="running";}catch(_){}
</script>
