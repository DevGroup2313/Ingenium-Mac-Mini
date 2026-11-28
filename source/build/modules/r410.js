<style id="r410-css">
/* ============ R410 · THE SIGN-IN ORBIT (Ingenium 8.08, 28 November 2026) ============
   Her words, of the live preview (https://claude.ai/artifact/EsxXinYmb582rHbBdmVUj1, previews/sign_in_orbit): "This looks much better.";
   "I want the logo button to be clickable on the Sign-in Orbit"; "I approve of the previews, please commit and push it everywhere".
   The sign-in's door (modules/r197.js) and Who is using Ingenium (r331, with r344's Signed out and r350's practice studio) stand on the
   orbit: a soft violet ground with its stars, two fine rings, Ingenium's seal at the heart as the fully pressable key it is on Home (r290's
   own key, with Home's flourishes), and each profile an orb on the orbit, its sphere Home's own (r261), its initial on it, its name and how it
   opens beneath. The sign-in's card is the plate at the foot: the greeting, the fields, the keys and the ways back in, as before, and a short
   record: when this device last signed in, and any wrong password since. Nothing about how a sign-in works is changed: the door's own
   card, its fields, its keys and the profile door's own buttons are the very ones pressed. Asked over the open page (a new password, turning
   the sign-in on) the door keeps its card as before. */
#sioStage{position:fixed;inset:0;z-index:2147483000;display:none;overflow:hidden;pointer-events:none;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif;
  background:radial-gradient(90% 78% at 50% 56%,#fdfbff 0%,#f4eefb 46%,#e2d5f2 100%);color:#221a33;
  --sio-ink:#1e1530;--sio-ink2:#4c4360;--sio-ink3:#7a7090;--sio-acc:#6a3fb5;--sio-plate:rgba(255,255,255,.93);--sio-line:rgba(106,63,181,.10);--sio-rec:rgba(106,63,181,.05);--sio-warn:#9b2c3c;
  --sio-serif:"Home Cormorant","Cormorant Garamond",Cormorant,"Iowan Old Style",Palatino,Georgia,serif;transition:opacity .5s ease}
body.sio-on #sioStage{display:block}
#sioStage.night{background:radial-gradient(90% 78% at 50% 56%,#241a37 0%,#171025 52%,#0b0716 100%);color:#f1ecf9;
  --sio-ink:#f3eefb;--sio-ink2:#cfc4e2;--sio-ink3:#a99cc1;--sio-acc:#c3a8f0;--sio-plate:rgba(30,22,46,.92);--sio-line:rgba(205,184,240,.14);--sio-rec:rgba(205,184,240,.06);--sio-warn:#f0a0ac}
#sioStage.going{opacity:0}
#sioStage .sio-stars i{position:absolute;width:2px;height:2px;border-radius:50%;background:#b9a3e6;opacity:.45}
#sioStage.night .sio-stars i{background:#e8dcff;opacity:.7}
#sioStage .sio-head{position:absolute;left:16px;right:16px;top:40px;text-align:center;transition:opacity .4s ease}
#sioStage.plate .sio-head{opacity:0}
#sioStage .sio-date{font:600 11px/1 -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif;letter-spacing:.32em;text-transform:uppercase;color:var(--sio-acc)}
#sioStage .sio-hello{font:500 42px/1.08 var(--sio-serif);color:var(--sio-ink);margin:10px 0 0;letter-spacing:-.005em;text-wrap:balance}
#sioStage .sio-sub{font:400 15px/1.5 -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif;color:var(--sio-ink2);margin:8px auto 0;max-width:56ch}
#sioStage .sio-box{position:absolute;left:50%;top:var(--cy,50%);width:1240px;height:640px;transform:translate(-50%,-50%) scale(var(--k,1));transform-origin:50% 50%}
#sioStage.nar .sio-box{width:560px;height:600px}
#sioStage .sio-ring{position:absolute;left:50%;top:50%;border-radius:50%;transform:translate(-50%,-50%);box-shadow:inset 0 0 0 1px rgba(106,63,181,.16)}
#sioStage.night .sio-ring{box-shadow:inset 0 0 0 1px rgba(205,184,240,.16)}
#sioStage .sio-ring.r1{width:1060px;height:400px}
#sioStage .sio-ring.r2{width:720px;height:260px;border:1px dashed rgba(106,63,181,.10)}
#sioStage.nar .sio-ring.r1{width:520px;height:300px}
#sioStage.nar .sio-ring.r2{width:360px;height:200px}
#sioStage .sio-centre{position:absolute;left:50%;top:50%;transform:translate(-50%,-62%);display:grid;justify-items:center;gap:10px;z-index:3;pointer-events:auto}
#sioStage .sio-centre .hx-seal{position:relative;inset:auto;transform:none;margin:0;width:150px;height:150px}
#sioStage .sio-sealed{display:inline-flex;align-items:center;gap:8px;padding:6px 12px;border-radius:999px;background:rgba(106,63,181,.08);color:var(--sio-acc);font:600 12px/1 -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif;transition:opacity .3s ease}
#sioStage .sio-sealed svg{width:14px;height:14px}
#sioStage.plate .sio-sealed{opacity:0}
/* an orb on the orbit: the stage's own (beside the sign-in's plate), or the profile door's own button dressed as one */
.sio-orb{position:absolute;transform:translate(-50%,-50%);display:grid;justify-items:center;gap:6px;width:150px;cursor:pointer;border:0;background:none;padding:0;color:inherit;pointer-events:auto;
  font:inherit;-webkit-tap-highlight-color:transparent;transition:opacity .4s ease}
.sio-orb:focus-visible{outline:2.5px solid var(--sio-acc,#6a3fb5);outline-offset:6px;border-radius:16px}
.sio-orb .sio-nm{font:500 19px/1.15 "Home Cormorant","Cormorant Garamond",Georgia,serif;color:var(--sio-ink,#1e1530);white-space:nowrap;max-width:150px;overflow:hidden;text-overflow:ellipsis}
.sio-orb .sio-st{display:inline-flex;align-items:center;gap:6px;font:600 11.5px/1.2 -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif;color:var(--sio-acc,#6a3fb5)}
.sio-orb .sio-st i{width:6px;height:6px;border-radius:50%;background:currentColor}
.sio-ball{position:relative;display:grid;place-items:center;width:92px;height:92px;filter:drop-shadow(0 10px 14px rgba(60,30,120,.28));transition:transform .35s cubic-bezier(.3,1.4,.5,1),filter .4s ease;
  --c0:#d2bff4;--c1:#a57fe8;--c2:#6a3fb5;--c3:#2e1764;--c4:#1b0d3a;--csh:#0b0220;--ct1:.32;--ct2:.6;--ce1:.2;--ce2:.42}
.sio-ball svg{position:absolute;inset:0;width:100%;height:100%;border-radius:50%}
.sio-ball .sio-css{position:absolute;inset:4%;border-radius:50%;background:radial-gradient(circle at 36% 32%,#d2bff4,#6a3fb5 52%,#1b0d3a)}
.sio-ball b{position:relative;font:600 36px/1 "Home Cormorant","Cormorant Garamond",Georgia,serif;color:#fff;text-shadow:0 1px 3px rgba(20,8,50,.55)}
.sio-orb:hover .sio-ball{transform:translateY(-4px) scale(1.05)}
.sio-orb:active .sio-ball{transform:translateY(2px) scale(.95);transition-duration:.08s}
.sio-orb.dim .sio-ball{filter:saturate(.55) brightness(1.06) drop-shadow(0 8px 10px rgba(60,30,120,.18));opacity:.8}
#sioStage.night .sio-orb.dim .sio-ball,#profDoor.sio.r344-night .sio-orb.dim .sio-ball{filter:saturate(.6) brightness(.85) drop-shadow(0 8px 10px rgba(0,0,0,.4))}
#sioStage.doorup .sio-box .sio-orb{visibility:hidden}
@media (prefers-reduced-motion:reduce){.sio-ball,#sioStage,#sioStage .sio-head{transition:none}}
body[data-motion="minimal"] .sio-ball{transition:none}
/* the sign-in's own card, the plate at the foot of the orbit */
body.sio-on #ingLockDoor.sio{background:transparent !important;pointer-events:none;align-items:flex-end;padding:0 16px max(28px,env(safe-area-inset-bottom,0px))}
body.sio-on #ingLockDoor.sio .ild-card{pointer-events:auto;width:min(480px,100%) !important;max-height:calc(100vh - 56px);padding:24px 30px 22px;border-radius:26px;background:var(--sio-plate,rgba(255,255,255,.93));
  box-shadow:inset 0 0 0 1px var(--sio-line,rgba(106,63,181,.10)),0 1px 1px rgba(40,22,68,.04),0 4px 6px rgba(40,22,68,.04),0 14px 28px rgba(40,22,68,.07),0 34px 60px rgba(40,22,68,.10)}
body.sio-on #ingLockDoor.sio.ild-night .ild-card{--sio-plate:rgba(30,22,46,.92);--sio-line:rgba(205,184,240,.14);box-shadow:inset 0 0 0 1px var(--sio-line),0 14px 28px rgba(0,0,0,.45),0 34px 60px rgba(0,0,0,.4)}
body.sio-on #ingLockDoor.sio .ild-card>h1{font:500 32px/1.1 "Home Cormorant","Cormorant Garamond",Georgia,serif;letter-spacing:0;text-wrap:balance}
body.sio-on #ingLockDoor.sio .ild-card>p.ild-sub{font-size:14px;margin:8px 0 14px}
body.sio-on #ingLockDoor.sio .ild-card input{border-radius:14px;padding:13px 16px}
body.sio-on #ingLockDoor.sio .r331-else{display:none !important}
#ingLockDoor .sio-rec{margin:16px 0 0;padding:12px 14px;border-radius:14px;background:var(--sio-rec,rgba(106,63,181,.05));box-shadow:inset 0 0 0 1px var(--sio-line,rgba(106,63,181,.10));text-align:left;display:grid;gap:6px}
#ingLockDoor.ild-night .sio-rec{--sio-rec:rgba(205,184,240,.06);--sio-line:rgba(205,184,240,.14)}
#ingLockDoor .sio-rec p{margin:0;font:500 13px/1.45 -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif;color:var(--ild-soft);text-align:left}
#ingLockDoor .sio-rec b{font-weight:650;color:var(--ild-ink)}
#ingLockDoor .sio-rec .warn{display:inline-flex;align-items:center;gap:7px;color:#9b2c3c}
#ingLockDoor.ild-night .sio-rec .warn{color:#f0a0ac}
#ingLockDoor .sio-rec .warn i{width:7px;height:7px;border-radius:50%;background:#c2414f;box-shadow:0 0 0 3px rgba(194,65,79,.15);flex:none}
#ingLockDoor .sio-list{list-style:none;margin:4px 0 0;padding:0;display:grid;gap:6px;max-height:220px;overflow:auto}
#ingLockDoor .sio-list li{display:grid;grid-template-columns:112px 1fr;gap:10px;padding:8px 10px;border-radius:10px;background:var(--sio-rec,rgba(106,63,181,.05));box-shadow:inset 0 0 0 1px var(--sio-line,rgba(106,63,181,.10));font-size:13px;color:var(--ild-soft)}
#ingLockDoor .sio-list li time{font-weight:650;color:var(--ild-ink)}
#ingLockDoor .sio-list li.w{color:#9b2c3c}
#ingLockDoor.ild-night .sio-list li.w{color:#f0a0ac}
#ingLockDoor .sio-list+p{font-size:12.5px}
/* Who is using Ingenium, on the orbit: its own buttons are the orbs; its words for the moment sit at the foot */
body.sio-on #profDoor.sio{background:transparent !important;pointer-events:none;animation:none}
body.sio-on #profDoor.sio .r331-door{position:fixed;inset:0;width:auto;max-width:none;max-height:none;margin:0;padding:0;background:none !important;box-shadow:none !important;border:0;pointer-events:none;overflow:visible;animation:none}
body.sio-on #profDoor.sio .r331-door>h3,body.sio-on #profDoor.sio .r331-door>p,body.sio-on #profDoor.sio .r331-door>.r344-door-out{display:none}
body.sio-on #profDoor.sio .r331-coins{display:block;position:static}
body.sio-on #profDoor.sio .r331-coin.sio-orb{position:fixed;left:var(--ox,50%);top:var(--oy,50%);transform:translate(-50%,-50%) scale(var(--k,1));min-width:0;height:auto;padding:0;background:none !important;box-shadow:none !important;border:0}
body.sio-on #profDoor.sio .r331-coin.sio-orb>.r331-mk,body.sio-on #profDoor.sio .r331-coin.sio-orb>b,body.sio-on #profDoor.sio .r331-coin.sio-orb>.r331-cap{display:none}
body.sio-on #profDoor.sio .r331-said,body.sio-on #profDoor.sio .r350-door{position:fixed;left:50%;transform:translateX(-50%);width:min(560px,calc(100% - 32px));text-align:center;pointer-events:auto;color:var(--sio-ink2,#4c4360)}
body.sio-on #profDoor.sio .r350-door{bottom:max(22px,env(safe-area-inset-bottom,0px));background:none;box-shadow:none;border:0;padding:0;margin:0}
body.sio-on #profDoor.sio .r331-said{bottom:calc(max(22px,env(safe-area-inset-bottom,0px)) + 64px)}
body.sio-on #profDoor.sio.r344-night .r331-said,body.sio-on #profDoor.sio.r344-night .r350-door{color:#cfc4e2}
/* 8.12 · the welcome door on the orbit. Her words (28 November 2026), with a picture of the welcome card: "Ingenium still does not have the
   sphere sign-in Orbit page and I have been waiting all night for it ... Please push it through!" The orbit stood only behind the sign-in
   (a password set up, then locked), so on a copy without a sign-in it was never seen: the first screen was still the welcome card. Now the
   welcome itself stands on the orbit: the ground, the stars and the two rings, the date in Latin and the greeting at the head with the
   welcome's own words, the seal at the heart as the same key, her orb on the orbit (pressed, it enters), and the welcome card as the plate
   at the foot: its name, the tour, Enter, Open straight to the app, and its two small keys in the corners. The orbit takes the welcome's own
   place among the layers (just above the desk), so anything that opens over the welcome opens over it as before; nothing about how the
   welcome works changes. */
#sioStage.welcome{z-index:401}
#sioStage.welcome .sio-sealed{display:none}
#sioStage.welcome .sio-sub{max-width:62ch;text-wrap:pretty}
body.sio-on #introDoor.sio{z-index:402;background:transparent !important;-webkit-backdrop-filter:none !important;backdrop-filter:none !important;pointer-events:none;
  align-items:flex-end;padding:0 16px max(26px,env(safe-area-inset-bottom,0px)) !important}
body.sio-on #introDoor.sio .intro-card{pointer-events:auto;position:relative !important;left:auto !important;top:auto !important;margin:0 !important;height:auto !important;
  width:min(500px,100%) !important;max-width:100% !important;max-height:calc(100vh - 40px);overflow:auto;scrollbar-width:none;padding:20px 28px 16px !important;border-radius:26px !important;
  border:0 !important;background:var(--sio-plate,rgba(255,255,255,.93)) !important;animation:none;
  box-shadow:inset 0 0 0 1px var(--sio-line,rgba(106,63,181,.10)),0 1px 1px rgba(40,22,68,.04),0 4px 6px rgba(40,22,68,.04),0 14px 28px rgba(40,22,68,.07),0 34px 60px rgba(40,22,68,.10) !important}
body.sio-on #introDoor.sio .intro-card::-webkit-scrollbar{display:none}
body.sio-on #introDoor.sio .intro-card::after,body.sio-on #introDoor.sio .intro-card::before{display:none !important}
body[data-theme="night"].sio-on #introDoor.sio .intro-card{--sio-plate:rgba(30,22,46,.92);--sio-line:rgba(205,184,240,.14);
  box-shadow:inset 0 0 0 1px var(--sio-line),0 14px 28px rgba(0,0,0,.45),0 34px 60px rgba(0,0,0,.4) !important}
body.sio-on #introDoor.sio .intro-seal,body.sio-on #introDoor.sio .intro-lede,body.sio-on #introDoor.sio .intro-grab,body.sio-on #introDoor.sio .intro-edge{display:none !important}
body.sio-on #introDoor.sio .intro-word{font:500 32px/1.1 "Home Cormorant","Cormorant Garamond",Georgia,serif;letter-spacing:0;margin:2px 0 0}
body.sio-on #introDoor.sio .intro-subword{margin:6px 0 14px}
body.sio-on #introDoor.sio .intro-tourline{margin:0 auto 12px}
body.sio-on #introDoor.sio .intro-straight{margin-top:12px}
body.sio-on #introDoor.sio .intro-credit{margin-top:14px;padding-top:12px}
</style>
<script>
(function(){"use strict";var W=window,D=document;try{(W.__ingParts=W.__ingParts||{})["p410"]="started";}catch(_){}
function $(i){return D.getElementById(i);}
function mk(t,c,x){var e=D.createElement(t);if(c)e.className=c;if(x!=null)e.textContent=x;return e;}
function esc(s){return String(s==null?"":s).replace(/[&<>"']/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#39;"}[c];});}
function warn(e){try{console.warn("r410",e);}catch(_){}}
var LOCK='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="4.5" y="10.5" width="15" height="10" rx="2.5"/><path d="M8 10.5V7.8a4 4 0 0 1 8 0v2.7"/></svg>';
var ROM=["I","II","III","IV","V","VI","VII","VIII","IX","X","XI","XII","XIII","XIV","XV","XVI","XVII","XVIII","XIX","XX","XXI","XXII","XXIII","XXIV","XXV","XXVI","XXVII","XXVIII","XXIX","XXX","XXXI"],
  MON=["Ianuarii","Februarii","Martii","Aprilis","Maii","Iunii","Iulii","Augusti","Septembris","Octobris","Novembris","Decembris"];
function roman(n){var v=[1000,900,500,400,100,90,50,40,10,9,5,4,1],s=["M","CM","D","CD","C","XC","L","XL","X","IX","V","IV","I"],o="";for(var i=0;i<v.length;i++)while(n>=v[i]){o+=s[i];n-=v[i];}return o;}
function latinDate(){var d=new Date();return ROM[d.getDate()-1]+" · "+MON[d.getMonth()]+" · "+roman(d.getFullYear());}
function hm(t){var d=new Date(t);return ("0"+d.getHours()).slice(-2)+":"+("0"+d.getMinutes()).slice(-2);}
function greet(){var h=new Date().getHours();return h<12?"Good morning":h<18?"Good afternoon":"Good evening";}
function day(t){var d=new Date(t),n=new Date(),a=new Date(n.getFullYear(),n.getMonth(),n.getDate()).getTime(),x=new Date(d.getFullYear(),d.getMonth(),d.getDate()).getTime();
  return x===a?"today":x===a-864e5?"yesterday":d.getDate()+" "+["January","February","March","April","May","June","July","August","September","October","November","December"][d.getMonth()];}
function when(t){var w=day(t);return w+" at "+hm(t);}
function cap(s){return s.charAt(0).toUpperCase()+s.slice(1);}
/* ---------- the record: times only (signed in, a wrong password, locked, signed out), kept on this device outside the seal so that it
   can show before you sign in; nothing else of yours is in it ---------- */
var LOGK="ingenium_signin_log",LOCKK="ing.sio.lock";
function logRead(){try{var o=JSON.parse(localStorage.getItem(LOGK)||"null");return o&&Array.isArray(o.log)?o:{v:1,log:[]};}catch(e){return {v:1,log:[]};}}
function logAdd(k){try{var o=logRead();o.log.unshift({at:Date.now(),k:k});o.log=o.log.slice(0,40);localStorage.setItem(LOGK,JSON.stringify(o));}catch(e){warn(e);}}
function logFix(){try{var o=logRead(),r=reg(),f=o.log[0];if(r&&r.out&&f&&f.k==="lock"&&Date.now()-f.at<5*60000){f.k="out";localStorage.setItem(LOGK,JSON.stringify(o));}}catch(e){}}
var WORD={"in":"Signed in",bad:"A wrong password",lock:"Locked",out:"Signed out"};
function recHtml(open){var o=logRead(),L=o.log,last=null,bad=[];for(var i=0;i<L.length;i++){if(L[i].k==="in"){last=L[i];break;}if(L[i].k==="bad")bad.push(L[i]);}
  var h='<div class="sio-rec" id="sioRec">';
  h+=last?'<p>Last signed in <b>'+esc(when(last.at))+'</b>, on this device.</p>':'<p>No sign-in on this device is in the record yet.</p>';
  if(bad.length)h+='<p class="warn"><i></i>'+bad.length+' wrong password'+(bad.length>1?'s':'')+' since, the last '+esc(when(bad[0].at))+'.</p>';else if(last)h+='<p>No wrong password since.</p>';
  if(L.length)h+='<p><button type="button" class="ild-link" id="sioRecKey" aria-expanded="'+(open?"true":"false")+'">'+(open?"Hide the record of sign-ins":"The record of sign-ins")+'</button></p>';
  if(open&&L.length)h+='<ol class="sio-list">'+L.slice(0,14).map(function(r){return '<li class="'+(r.k==="bad"?"w":"")+'"><time>'+esc(cap(day(r.at))+" "+hm(r.at))+'</time><span>'+esc(WORD[r.k]||r.k)+', on this device</span></li>';}).join("")+'</ol>'+
    '<p>Times only, kept on this device outside the seal, so that they can show before you sign in. Nothing else of yours is in it.</p>';
  return h+'</div>';}
/* ---------- who is here ---------- */
function reg(){try{return W.__ingProfiles&&W.__ingProfiles.reg?W.__ingProfiles.reg():null;}catch(e){return null;}}
/* the sign-in greets by the user name it was set up with (r197's own card said "Welcome back" with it), so her orb carries that name too;
   every other profile keeps its own name */
function signName(){var c=lockCard(),n=c&&c.querySelector("#ildName");return n&&n.value?String(n.value).trim():"";}
function people(){var r=reg(),cur=r&&typeof r.cur==="string"?r.cur:"owner",sn=signName(),l=r&&Array.isArray(r.list)?r.list.filter(function(p){return p&&p.id&&p.name;}):[];
  if(!l.length)l=[{id:"owner",name:sn||"You",pw:"always"}];
  else if(sn)l=l.map(function(p){return p.id===cur?{id:p.id,name:sn,pw:p.pw,t:p.t}:p;});
  return {list:l,cur:cur,out:!!(r&&r.out)};}
var LOOKS=["bands","dapple","swirl","storm","aurora","bands"];
function ball(look,letter){var s=null;try{s=W.IngOrrery&&IngOrrery.sphere?IngOrrery.sphere(look):null;}catch(e){s=null;}
  return '<span class="sio-ball" aria-hidden="true">'+(s||'<span class="sio-css"></span>')+'<b>'+esc(letter)+'</b></span>';}
function initial(n){return String(n||"?").trim().charAt(0).toUpperCase()||"?";}
/* ---------- the stage ---------- */
var ST=null,BOX=null,SEAL=null,ORBS=[],SIG="",HEAD=null,GOING=false;
function stars(){var h="",x=7;function r(){x=(x*9301+49297)%233280;return x/233280;}for(var i=0;i<60;i++)h+='<i style="left:'+(r()*100).toFixed(1)+'%;top:'+(r()*100).toFixed(1)+'%"></i>';return h;}
function stage(){if(ST)return ST;ST=mk("div");ST.id="sioStage";ST.setAttribute("aria-hidden","false");
  ST.innerHTML='<div class="sio-stars" aria-hidden="true">'+stars()+'</div><div class="sio-head"><div class="sio-date"></div><h1 class="sio-hello"></h1><p class="sio-sub"></p></div>'+
    '<div class="sio-box"><div class="sio-ring r1"></div><div class="sio-ring r2"></div><div class="sio-centre"><div class="sio-sealed">'+LOCK+'Sealed</div></div></div>';
  (D.body||D.documentElement).appendChild(ST);BOX=ST.querySelector(".sio-box");HEAD=ST.querySelector(".sio-head");return ST;}
function sealIn(){if(SEAL||!ST)return;try{if(typeof W.IngSealKey!=="function")return;SEAL=W.IngSealKey("sio-seal","Ingenium's seal. Press it for fun.",150);var c=ST.querySelector(".sio-centre");c.insertBefore(SEAL,c.firstChild);}catch(e){warn(e);SEAL=null;}}
function flourish(){try{var k=SEAL&&SEAL.querySelector(".r175-seal");if(k)k.click();}catch(e){}}
var SLOTS={wide:[[19,44],[81,40],[9,70],[91,68],[31,12],[69,10]],nar:[[16,50],[84,46],[20,84],[80,82],[24,14],[76,12]]};
function orbs(pp,nar){var sig=pp.list.map(function(p){return p.id+":"+p.name+":"+p.pw;}).join("|")+"/"+(nar?1:0)+"/"+(W.IngOrrery?1:0);if(sig===SIG)return;SIG=sig;
  ORBS.forEach(function(o){o.remove();});ORBS=[];var sl=SLOTS[nar?"nar":"wide"];
  pp.list.slice(0,6).forEach(function(p,i){var b=mk("button","sio-orb");b.type="button";b.setAttribute("data-p",p.id);b.style.left=sl[i][0]+"%";b.style.top=sl[i][1]+"%";
    b.innerHTML=ball(LOOKS[i],initial(p.name))+'<span class="sio-nm">'+esc(p.name)+'</span><span class="sio-st"><i></i><span class="sio-stt"></span></span>';
    b.addEventListener("click",function(){press(p.id);});BOX.appendChild(b);ORBS.push(b);});}
/* an orb pressed beside the sign-in's plate: your own takes you to its password; another opens Who is using Ingenium and chooses it */
function press(id){var pp=people(),card=lockCard();
  /* 8.12: on the welcome, her orb enters, with one of the seal's flourishes, as Enter does */
  if(WELCOME&&!card){var en=$("introEnter");flourish();WGO=Date.now();setTimeout(function(){try{var dd=$("introDoor");if(en&&dd&&!dd.hasAttribute("hidden"))en.click();}catch(e){warn(e);}},300);return;}
  if(card){if(id===pp.cur||pp.list.length<2){var f=card.querySelector("#ildPw")||card.querySelector("input:not([type=hidden])");if(f){try{f.focus();}catch(e){}}flourish();return;}
    var e=card.querySelector(".r331-else");if(e){e.click();setTimeout(function(){var c=D.querySelector('#profDoor .r331-coin[data-door="'+String(id).replace(/"/g,"")+'"]');if(c)c.click();},60);}return;}
  var c2=D.querySelector('#profDoor .r331-coin[data-door="'+String(id).replace(/"/g,"")+'"]');if(c2)c2.click();}
function lockCard(){var d=$("ingLockDoor");if(!d||d.hidden||d.classList.contains("ild-over")||d.classList.contains("ild-indoor"))return null;var c=d.querySelector(".ild-card");return c;}
function profDoor(){var d=$("profDoor");return d&&!d.hidden?d:null;}
/* 8.12: the welcome door, when it is open and nothing else is asked over it (a sign-in being set up keeps its own card, as before) */
var WELCOME=false,WGO=0;
function introCard(){var d=$("introDoor");if(!d||d.hasAttribute("hidden"))return null;var l=$("ingLockDoor");if(l&&!l.hidden)return null;
  var c=d.querySelector(".intro-card");return c||null;}
/* the name the welcome greets: the profile's own, else the one Home greets by (r261's hello: the persona's first name, else the author's) */
function welcomeName(){var nm="";try{var pp=people();pp.list.forEach(function(p){if(p.id===pp.cur&&p.name&&p.name!=="You")nm=p.name;});}catch(e){}
  if(!nm)try{nm=typeof W.personaGet==="function"?(W.personaGet().name||""):"";}catch(e){nm="";}
  if(!nm)try{nm=typeof W.lxhAuthor==="function"?(W.lxhAuthor()||""):"";}catch(e){nm="";}
  return String(nm||"").trim().split(/\s+/)[0]||"";}
function welcomePeople(pp){var me=null;pp.list.forEach(function(p){if(p.id===pp.cur)me=p;});var nm=welcomeName()||"You";
  return {list:[{id:me?me.id:"owner",name:nm,pw:"none"}],cur:me?me.id:"owner",out:false};}
function signOn(){try{return !!(W.IngLock&&typeof IngLock.active==="function"&&IngLock.active());}catch(e){return false;}}
function nightNow(){var l=$("ingLockDoor"),d=$("profDoor");if(l&&!l.hidden&&l.classList.contains("ild-night"))return true;if(d&&!d.hidden&&d.classList.contains("r344-night"))return true;return D.body.getAttribute("data-theme")==="night";}
function lockedAt(){try{var t=+sessionStorage.getItem(LOCKK)||0;return t&&Date.now()-t<12*36e5?t:0;}catch(e){return 0;}}
/* ---------- the sign-in's card dressed as the plate ---------- */
var OPEN=false;
function dressCard(card,pp){var form=card.querySelector("#ildSign");
  if(form&&!form.__sio){form.__sio=1;form.addEventListener("submit",function(){SUBMIT=Date.now();},true);
    var me=null;pp.list.forEach(function(p){if(p.id===pp.cur)me=p;});var nm=signName()||(me&&me.name)||"";
    var h=card.querySelector("h1");if(h)h.textContent=greet()+(nm?", "+nm:"");
    var sub=card.querySelector("p.ild-sub"),la=lockedAt(),l0=logRead().log[0];if(sub)sub.textContent=la?(l0&&l0.k==="out"?"Signed out at ":"Locked at ")+hm(la)+". Your password opens your desk again.":"Your password opens your desk.";
    var rec=mk("div");rec.innerHTML=recHtml(OPEN);var r=rec.firstChild,note=card.querySelector(".ild-note");if(note)card.insertBefore(r,note);else card.appendChild(r);}
  var key=card.querySelector("#sioRecKey");if(key&&!key.__sio){key.__sio=1;key.addEventListener("click",function(){OPEN=!OPEN;var old=card.querySelector("#sioRec");if(!old)return;var x=mk("div");x.innerHTML=recHtml(OPEN);old.parentNode.replaceChild(x.firstChild,old);dressCard(card,people());var k2=card.querySelector("#sioRecKey");if(k2)try{k2.focus();}catch(e){}});}
  /* a wrong password, as the door says it, goes into the record (once for each press of Sign in) */
  var er=card.querySelector(".ild-err");if(er&&SUBMIT&&/does not open this copy/.test(er.textContent||"")&&er.offsetParent!==null){SUBMIT=0;logAdd("bad");var old2=card.querySelector("#sioRec");if(old2){var y=mk("div");y.innerHTML=recHtml(OPEN);old2.parentNode.replaceChild(y.firstChild,old2);dressCard(card,people());}}}
var SUBMIT=0;
/* ---------- Who is using Ingenium dressed: its own buttons stand where the orbs stand ---------- */
function dressDoor(d,pp){d.classList.add("sio");if(d.getAttribute("aria-label")!=="Who is using Ingenium")d.setAttribute("aria-label","Who is using Ingenium");
  [].forEach.call(d.querySelectorAll(".r331-coin"),function(c,i){var id=c.getAttribute("data-door"),o=null;ORBS.forEach(function(x){if(x.getAttribute("data-p")===id)o=x;});
    if(!c.__sio){c.__sio=1;c.classList.add("sio-orb","dim");var p=null;pp.list.forEach(function(q){if(q.id===id)p=q;});var nm=p?p.name:(c.querySelector("b")||{}).textContent||"";
      var w=mk("span");w.innerHTML=ball(LOOKS[Math.min(i,5)],initial(nm))+'<span class="sio-nm">'+esc(nm)+'</span><span class="sio-st"><i></i><span class="sio-stt">'+esc((c.querySelector(".r331-cap")||{}).textContent||"")+'</span></span>';
      while(w.firstChild)c.appendChild(w.firstChild);}
    if(o){var r=o.getBoundingClientRect();if(r.width){c.style.setProperty("--ox",(r.left+r.width/2).toFixed(1)+"px");c.style.setProperty("--oy",(r.top+r.height/2).toFixed(1)+"px");c.style.setProperty("--k",K.toFixed(3));}}});}
/* ---------- the orbit laid out for the screen it is on ---------- */
var K=1;
function place(card,door,foot){var Wd=W.innerWidth,Hd=W.innerHeight,nar=Wd<760;ST.classList.toggle("nar",nar);var NW=nar?560:1240,n=ORBS.length||1,CH=n<=2?(nar?440:420):n<=4?(nar?560:560):(nar?600:640);
  var top=16,bottom=Hd-16;if(card){var cr=card.getBoundingClientRect();if(cr.height)bottom=cr.top-12;}else{var hr=HEAD.getBoundingClientRect();top=hr.bottom+8;
    if(foot){var fr=foot.getBoundingClientRect();if(fr.height)bottom=Math.min(bottom,fr.top-12);}
    var low=door?[].slice.call(door.querySelectorAll(".r350-door,.r331-said")).filter(function(x){return x.textContent.trim();}):[];low.forEach(function(x){var q=x.getBoundingClientRect();if(q.height)bottom=Math.min(bottom,q.top-8);});}
  var avail=Math.max(150,bottom-top);K=Math.max(.3,Math.min(1,(Wd-24)/NW,avail/CH));BOX.style.setProperty("--k",K.toFixed(3));BOX.style.setProperty("--cy",(top+avail/2).toFixed(1)+"px");BOX.style.top=(top+avail/2).toFixed(1)+"px";}
/* ---------- each moment: is the orbit up, and in which state ---------- */
var WAS=false;
function off(){D.body.classList.remove("sio-on");var l=$("ingLockDoor");if(l)l.classList.remove("sio");var dd=$("profDoor");if(dd)dd.classList.remove("sio");var idr=$("introDoor");if(idr)idr.classList.remove("sio");
  WAS=false;GOING=false;WELCOME=false;WGO=0;if(ST)ST.classList.remove("going","welcome");}
function setText(sel,t){var e=ST.querySelector(sel);if(e&&e.textContent!==t)e.textContent=t;}
function tick(){var card=lockCard(),door=profDoor(),pp=people(),intro=(!card&&!door)?introCard():null;
  /* signed in: the orbit stands until the door has closed, then gives way to the desk (8.12: or to the welcome, where it opens next) */
  if(GOING){if(card||door)return;if(intro)GOING=false;else{if(ST&&!ST.classList.contains("going")){ST.classList.add("going");setTimeout(off,520);}return;}}
  /* 8.12: entered from the welcome (her orb, Enter or the tour): the orbit gives way to the desk the same way */
  if(WGO&&!intro&&!card&&!door){if(WAS&&ST&&!ST.classList.contains("going")){ST.classList.add("going");setTimeout(off,520);}else if(!WAS)WGO=0;return;}
  if(WGO&&(card||door))WGO=0;
  var want=!!((card&&(W.__ingLocked||!W.__ingReady))||(door&&(W.__ingLocked||pp.out||!W.__ingReady))||intro);
  var l=$("ingLockDoor"),idr=$("introDoor");
  if(!want){if(WAS)off();return;}
  WELCOME=!!intro;
  stage();sealIn();if(!WAS){logFix();WAS=true;}D.body.classList.add("sio-on");
  var plate=!!card&&!door;ST.classList.toggle("plate",plate);ST.classList.toggle("doorup",!!door);ST.classList.toggle("welcome",WELCOME);ST.classList.toggle("night",nightNow());
  if(l)l.classList.toggle("sio",!!card);if(idr)idr.classList.toggle("sio",WELCOME);
  setText(".sio-date",latinDate());
  var who=WELCOME?welcomeName():"",lede=WELCOME?((intro.querySelector(".intro-lede")||{}).textContent||"").trim():"";
  setText(".sio-hello",WELCOME?greet()+(who?", "+who:""):pp.out?"Signed out":door?"Who is using Ingenium?":"Welcome back");
  setText(".sio-sub",WELCOME?(lede?lede+" ":"")+"Press your orb to enter.":pp.out?"Everything is sealed until its profile signs in again. Press your orb.":door?"Each profile opens as its owner chose. Press your orb.":"Your password opens your desk.");
  var ppl=WELCOME?welcomePeople(pp):pp;
  orbs(ppl,W.innerWidth<760);
  ORBS.forEach(function(b){var id=b.getAttribute("data-p"),p=null;ppl.list.forEach(function(q){if(q.id===id)p=q;});var mine=id===ppl.cur||ppl.list.length<2;
    b.classList.toggle("dim",WELCOME?!mine:(!plate||!mine));var s=b.querySelector(".sio-stt"),t=WELCOME?(signOn()?"Signed in":"Opens straight away"):plate&&mine?(lockedAt()?"Locked":"Signing in"):(p&&p.pw==="none"?"Opens straight away":"Needs its password");if(s.textContent!==t)s.textContent=t;
    b.setAttribute("aria-label",(p?p.name:"Profile")+": "+t+(WELCOME?". Press to enter.":""));});
  if(card)dressCard(card,pp);
  place(plate?card:null,door,WELCOME?intro:null);
  if(door)dressDoor(door,pp);}
/* 8.12: Enter and the tour close the welcome as before; the orbit then gives way as it does after a sign-in */
D.addEventListener("click",function(e){try{var t=e.target&&e.target.closest?e.target.closest("#introEnter,#introTour"):null;if(t&&WELCOME)WGO=Date.now();}catch(_){}},true);
/* the welcome opens at once on the orbit, wherever it is opened from (each start, or the logo in the top bar) */
/* and while it stands, every quarter of a second, so that whatever opens over it (a sign-in being set up) is answered at once */
var FAST=0;function fast(){if(FAST)return;FAST=setInterval(function(){if(!WAS){clearInterval(FAST);FAST=0;return;}try{tick();}catch(e){warn(e);}},250);}
(function watch(){var d=$("introDoor");if(!d){setTimeout(watch,400);return;}try{new MutationObserver(function(){try{tick();}catch(e){warn(e);}if(WAS)fast();}).observe(d,{attributes:true,attributeFilter:["hidden"]});}catch(e){warn(e);}if(WAS)fast();})();
/* signed in: a flourish of the seal, and the orbit gives way to the desk */
W.addEventListener("ing-keys",function(e){var d=e&&e.detail||{};
  if(d.locking){try{sessionStorage.setItem(LOCKK,String(Date.now()));}catch(_){}logAdd("lock");return;}
  if(d.held&&WAS&&!GOING){logAdd("in");try{sessionStorage.removeItem(LOCKK);}catch(_){}flourish();GOING=true;return;}
  if(d.held===false&&GOING)GOING=false;});
W.addEventListener("resize",function(){if(WAS)try{tick();}catch(e){warn(e);}});
(function loop(n){try{tick();}catch(e){warn(e);}setTimeout(function(){loop(n+1);},WAS?250:(W.__ingReady===true&&!W.__ingLocked&&n>40?2000:400));})(0);
W.IngSignOrbit={tick:tick,record:logRead};
try{W.__ingParts["p410"]="running";}catch(_){}
})();
</script>
