<style id="r331-css">
/* ============ R331 · LOCAL PROFILES (Ingenium 7.44, 19 November 2026) ============
   Her words (14 November 2026), on my recommendations: "I am saying yes to your recommendations, please proceed": a profile key in the top
   bar beside Ingenium's seal, managed in Settings; the owner decides for each profile whether it needs a password, hers always while the
   sign-in is on, a guest's or a test's none; kept apart for each person: conversations and memory, folders and the folder search, Lector and
   Vocatio records and Folders' notes, Display and sound settings, connections and their keys; shared: the models. On the live preview
   (https://claude.ai/artifact/B3SYtEftUUgisz6kAuSNAE, previews/profiles): "I approve of the preview ... Just add it to the damn app and let's
   move on. Put the drop down menu of version 3 of the preview." So the key and its menu are version 3's: a raised pill with the profile's
   pastel tile, its name and a chevron; the menu a raised card, Who is using Ingenium, each profile a row with its tile, how it opens and In
   use, Lock Ingenium and Manage profiles at its foot. Profiles on this device stands in Settings, Security, beside her sign-in (since 7.36).
   Every surface here is raised and answers the pointer, as her rule asks; Ingenium's own sounds (r176) play on its keys. */
body{--p3-card:#ffffff;--p3-ink1:#221a2e;--p3-ink2:#4a4358;--p3-ink3:#6c6579;--p3-acc:#6a3fb5;--p3-line:rgba(34,26,46,.1);--p3-well:#faf8fc;--p3-rail:#efeaf6;
  --p3-slot:rgba(60,40,90,.06);--p3-slot-sh:inset 0 1px 2px rgba(40,22,68,.18),inset 0 0 0 1px rgba(40,22,68,.05),0 1px 0 rgba(255,255,255,.85);
  --p3-card-sh:0 1px 0 rgba(40,22,68,.06),0 2px 6px rgba(40,22,68,.05),0 12px 30px rgba(40,22,68,.07);
  --p3-card-hi:0 2px 0 rgba(40,22,68,.08),0 8px 16px rgba(40,22,68,.1),0 18px 38px rgba(40,22,68,.12);
  --p3-key-bg:linear-gradient(#ffffff,#f9f7fc);
  --p3-key-sh:inset 0 -1.5px 0 rgba(40,22,68,.13),0 2px 0 rgba(40,22,68,.25),0 4px 5px rgba(40,22,68,.16),0 9px 14px rgba(40,22,68,.1);
  --p3-key-hi:inset 0 -1.5px 0 rgba(40,22,68,.13),0 3px 0 rgba(40,22,68,.25),0 6px 8px rgba(40,22,68,.18),0 13px 20px rgba(40,22,68,.12);
  --p3-pri-bg:linear-gradient(#7348be,#5d37a1);--p3-pri-line:#4b2a86;--p3-pri-sh:inset 0 1px 0 rgba(255,255,255,.24),0 1px 0 #3a2070,0 3px 6px rgba(52,24,100,.26);
  --p3-lav-t:rgba(106,63,181,.12);--p3-lav-c:#6a3fb5;--p3-emr-t:rgba(31,157,99,.14);--p3-emr-c:#1a7f50;--p3-red-c:#a8323e;--p3-dim:1;
  --p3-serif:"Home Cormorant","Cormorant Garamond","Iowan Old Style","Palatino Linotype",Palatino,Georgia,serif;
  --p3-bounce:cubic-bezier(.34,1.35,.64,1);--p3-spring:cubic-bezier(.2,.9,.25,1.2)}
body[data-theme="night"]{--p3-card:#201a2b;--p3-ink1:#f6f1fd;--p3-ink2:#d3c9e3;--p3-ink3:#a99cc1;--p3-acc:#b79ce6;--p3-line:rgba(205,184,240,.11);--p3-well:#1c1626;--p3-rail:#171221;
  --p3-slot:rgba(0,0,0,.28);--p3-slot-sh:inset 0 2px 3px rgba(0,0,0,.55),inset 0 0 0 1px rgba(0,0,0,.25),0 1px 0 rgba(255,255,255,.05);
  --p3-card-sh:0 1px 0 rgba(0,0,0,.4),0 2px 6px rgba(0,0,0,.3),0 12px 30px rgba(0,0,0,.34);--p3-card-hi:0 2px 0 rgba(0,0,0,.45),0 10px 20px rgba(0,0,0,.42),0 20px 40px rgba(0,0,0,.4);
  --p3-key-bg:linear-gradient(#2a2239,#251e33);--p3-key-sh:inset 0 1px 0 rgba(255,255,255,.07),inset 0 -2px 0 rgba(0,0,0,.45),0 2px 0 rgba(0,0,0,.75),0 4px 5px rgba(0,0,0,.5);
  --p3-key-hi:inset 0 1px 0 rgba(255,255,255,.1),inset 0 -2px 0 rgba(0,0,0,.4),0 3px 0 rgba(0,0,0,.7),0 7px 10px rgba(0,0,0,.5);
  --p3-pri-bg:linear-gradient(#7a56c8,#5b3aa1);--p3-pri-line:#2c1956;--p3-pri-sh:inset 0 1px 0 rgba(255,255,255,.14),0 1px 0 #170b30,0 3px 6px rgba(0,0,0,.45);
  --p3-lav-t:rgba(183,156,230,.15);--p3-lav-c:#b79ce6;--p3-emr-t:rgba(64,192,128,.15);--p3-emr-c:#6fd8a2;--p3-red-c:#f0939c;--p3-dim:.8}
/* the key, beside the seal */
html body .topbar #profKey{display:inline-flex;align-items:center;gap:8px;min-height:34px;margin:0 0 0 6px;padding:0 12px 0 4px;border-radius:999px;border:1px solid var(--p3-line);
  background:var(--p3-key-bg);box-shadow:var(--p3-key-sh);font:600 12.8px/1 -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif;color:var(--p3-ink1);
  flex:0 0 auto;cursor:pointer;white-space:nowrap;transition:transform .3s var(--p3-bounce),box-shadow .2s}
html body .topbar #profKey:hover{transform:translateY(-2px);box-shadow:var(--p3-key-hi)}
html body .topbar #profKey:active{transform:translateY(1px);box-shadow:var(--p3-key-sh)}
html body .topbar #profKey:focus-visible{outline:3px solid var(--p3-acc);outline-offset:2px}
html body .topbar #profKey .r331-chev{width:12px;height:12px;fill:none;stroke:var(--p3-ink3);stroke-width:1.8;stroke-linecap:round;stroke-linejoin:round;transition:transform .35s var(--p3-bounce)}
html body .topbar #profKey[aria-expanded="true"] .r331-chev{transform:rotate(180deg)}
html.ing-tb-icons body .topbar #profKey .r331-nm,html.ing-tb-icons body .topbar #profKey .r331-chev{display:none}
html.ing-tb-icons body .topbar #profKey{padding:0 4px}
/* each profile's tile: soft pastel by day, deeper by night, raised, as Fabrica's app tile */
.r331-mk{--s:30px;width:var(--s);height:var(--s);flex:0 0 auto;border-radius:calc(var(--s)*.3);display:inline-grid;place-items:center;background:linear-gradient(145deg,var(--a),var(--b));color:var(--c);
  font:700 calc(var(--s)*.56)/1 var(--p3-serif);filter:brightness(var(--p3-dim));
  box-shadow:inset 0 1px 0 rgba(255,255,255,.6),inset 0 -3px 0 rgba(40,22,68,.16),0 3px 0 rgba(40,22,68,.2),0 8px 14px rgba(40,22,68,.16);transition:transform .45s var(--p3-bounce)}
.r331-mk.round{border-radius:50%}
#profKey:hover .r331-mk,.r331-who:hover .r331-mk,.r331-prow:hover .r331-mk,.r331-coin:hover .r331-mk,.r331-sw:hover .r331-mk{transform:rotate(-6deg) scale(1.06)}
.r331-mk.tap{animation:r331Tap .5s var(--p3-bounce)}
@keyframes r331Tap{40%{transform:rotate(8deg) scale(.92)}}
/* the menu under the key (version 3) */
#profPop{position:fixed;z-index:2147482500;width:min(340px,calc(100vw - 24px));padding:10px;border-radius:16px;border:1px solid var(--p3-line);background:var(--p3-card);box-shadow:var(--p3-card-hi);
  display:flex;flex-direction:column;gap:4px;color:var(--p3-ink2);font:14px/1.45 -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif;animation:r331Rise .3s var(--p3-spring)}
#profPop[hidden]{display:none}
@keyframes r331Rise{from{opacity:0;transform:translateY(-4px)}to{opacity:1;transform:none}}
#profPop h4{margin:4px 6px 6px;font:600 16px/1.2 var(--p3-serif);color:var(--p3-ink1)}
.r331-who{display:grid;grid-template-columns:auto minmax(0,1fr) auto;gap:10px;align-items:center;padding:8px 10px;border-radius:11px;border:1px solid transparent;background:transparent;text-align:left;width:100%;
  font:inherit;color:inherit;cursor:pointer;transition:transform .3s var(--p3-spring),box-shadow .2s,background .2s,border-color .2s}
.r331-who:hover{transform:translateY(-1px);background:var(--p3-well);border-color:var(--p3-line);box-shadow:0 1px 0 rgba(40,22,68,.05),0 4px 10px rgba(40,22,68,.07)}
.r331-who[aria-current="true"]{background:var(--p3-slot);box-shadow:var(--p3-slot-sh)}
.r331-who b{display:block;color:var(--p3-ink1);font-size:13.3px}
.r331-who .r331-t{display:block;font-size:12.2px;color:var(--p3-ink3)}
.r331-foot{display:flex;gap:8px;flex-wrap:wrap;padding:8px 6px 2px;border-top:1px solid var(--p3-line);margin-top:4px}
.r331-chip{display:inline-flex;align-items:center;gap:6px;font:600 11.8px/1 -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif;padding:5px 10px;border-radius:999px;white-space:nowrap;
  background:var(--p3-lav-t);color:var(--p3-lav-c);transition:transform .3s var(--p3-spring)}
.r331-chip.ok{background:var(--p3-emr-t);color:var(--p3-emr-c)}
.r331-chip i{width:7px;height:7px;border-radius:50%;background:currentColor}
.r331-k{display:inline-flex;align-items:center;gap:7px;min-height:28px;padding:0 10px;border-radius:9px;border:1px solid var(--p3-line);background:var(--p3-key-bg);box-shadow:var(--p3-key-sh);color:var(--p3-ink1);
  font:600 12px/1 -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif;white-space:nowrap;cursor:pointer;transition:transform .3s var(--p3-bounce),box-shadow .2s}
.r331-k:hover{transform:translateY(-2px);box-shadow:var(--p3-key-hi)}
.r331-k:active{transform:translateY(1px);box-shadow:var(--p3-key-sh)}
.r331-k.pri{background:var(--p3-pri-bg);border-color:var(--p3-pri-line);box-shadow:var(--p3-pri-sh),0 4px 10px rgba(52,24,100,.2);color:#fff;min-height:34px;padding:0 14px;font-size:12.8px;border-radius:10px}
.r331-k.warn{color:var(--p3-red-c)}
.r331-k:focus-visible,.r331-who:focus-visible,.r331-opt:focus-visible,.r331-sw:focus-visible,.r331-part:focus-visible,.r331-coin:focus-visible,#profCard input:focus-visible{outline:3px solid var(--p3-acc);outline-offset:2px}
/* Profiles on this device (Settings, Security) */
#profCard .r331-lede{margin:4px 0 12px;max-width:68ch;font-size:13.5px;color:var(--p3-ink2)}
#profCard .r331-sec{font:600 19px/1.2 var(--p3-serif);color:var(--p3-ink1);margin:14px 0 8px;display:flex;align-items:baseline;gap:10px;flex-wrap:wrap}
#profCard .r331-sec small{font:400 12.5px/1.4 -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif;color:var(--p3-ink3)}
.r331-list{display:flex;flex-direction:column;gap:8px}
.r331-prow{display:grid;grid-template-columns:auto minmax(0,1fr) auto;gap:12px;align-items:center;padding:10px 12px;border-radius:13px;border:1px solid var(--p3-line);background:var(--p3-card);box-shadow:var(--p3-card-sh);
  transition:transform .3s var(--p3-spring),box-shadow .2s}
.r331-prow:hover{transform:translateY(-2px);box-shadow:var(--p3-card-hi)}
.r331-prow b{color:var(--p3-ink1);font-size:13.5px}
.r331-prow .r331-t{display:block;font-size:12.4px;color:var(--p3-ink3)}
.r331-acts{display:flex;gap:6px;flex-wrap:wrap;justify-content:flex-end;align-items:center}
.r331-confirm{grid-column:1/-1;display:flex;gap:8px;flex-wrap:wrap;align-items:center;padding:10px 12px;border-radius:11px;background:var(--p3-well);border:1px solid var(--p3-line);font-size:12.6px;animation:r331Rise .3s var(--p3-spring)}
.r331-confirm span{flex:1 1 260px}
.r331-opts{display:inline-flex;gap:6px;flex-wrap:wrap}
.r331-opt{display:inline-flex;align-items:center;gap:7px;padding:6px 10px;border-radius:10px;border:1px solid var(--p3-line);background:var(--p3-card);font:12.2px/1.2 -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif;color:var(--p3-ink2);
  box-shadow:0 1px 0 rgba(40,22,68,.05),0 2px 5px rgba(40,22,68,.05);cursor:pointer;transition:transform .3s var(--p3-spring),box-shadow .2s}
.r331-opt:hover{transform:translateY(-2px);box-shadow:var(--p3-key-hi)}
.r331-opt:active{transform:translateY(1px)}
.r331-opt .r331-dot{width:13px;height:13px;border-radius:50%;border:1px solid var(--p3-line);background:var(--p3-key-bg);box-shadow:var(--p3-key-sh);display:grid;place-items:center}
.r331-opt[aria-checked="true"]{color:var(--p3-ink1);font-weight:600;border-color:var(--p3-acc)}
.r331-opt[aria-checked="true"] .r331-dot::after{content:"";width:6px;height:6px;border-radius:50%;background:var(--p3-acc)}
.r331-add{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:14px;padding:14px;border-radius:16px;border:1px solid var(--p3-line);background:var(--p3-well);box-shadow:var(--p3-card-sh);transition:transform .35s var(--p3-spring),box-shadow .25s}
.r331-add:hover{transform:translateY(-2px);box-shadow:var(--p3-card-hi)}
.r331-add label,.r331-add .r331-lab{display:flex;flex-direction:column;gap:6px;font-size:12.6px;font-weight:600;color:var(--p3-ink1)}
.r331-add input{border-radius:10px;border:1px solid var(--p3-line);background:var(--p3-card);padding:8px 10px;font-size:13px;font-weight:400;color:var(--p3-ink1);box-shadow:inset 0 2px 3px rgba(40,22,68,.08);max-width:280px}
.r331-sws{display:flex;gap:8px;flex-wrap:wrap}
.r331-sw{border:0;background:none;padding:3px;border-radius:12px;cursor:pointer;transition:transform .3s var(--p3-spring),box-shadow .2s}
.r331-sw:hover{transform:translateY(-2px)}
.r331-sw[aria-checked="true"]{box-shadow:0 0 0 2px var(--p3-acc)}
.r331-go{grid-column:1/-1;display:flex;gap:8px;flex-wrap:wrap;align-items:center}
.r331-said{font-size:12.6px;color:var(--p3-acc);min-height:18px}
.r331-err{font-size:12.6px;color:var(--p3-red-c);min-height:18px}
.r331-note{padding:10px 12px;border-radius:12px;background:var(--p3-well);border:1px solid var(--p3-line);font-size:12.8px;color:var(--p3-ink2);box-shadow:var(--p3-card-sh);transition:transform .3s var(--p3-spring),box-shadow .2s}
.r331-note:hover{transform:translateY(-2px);box-shadow:var(--p3-card-hi)}
.r331-parts{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:10px}
.r331-part{display:grid;grid-template-columns:auto minmax(0,1fr);gap:10px;align-items:start;text-align:left;padding:11px 12px;border-radius:13px;border:1px solid var(--p3-line);background:var(--p3-card);box-shadow:var(--p3-card-sh);
  font:inherit;color:inherit;cursor:pointer;transition:transform .35s var(--p3-spring),box-shadow .25s}
.r331-part:hover{transform:translateY(-3px) rotateX(1deg);box-shadow:var(--p3-card-hi)}
.r331-part svg{width:18px;height:18px;margin-top:1px;fill:none;stroke:var(--p3-acc);stroke-width:1.6;stroke-linecap:round;stroke-linejoin:round;transition:transform .35s var(--p3-bounce)}
.r331-part:hover svg{transform:rotate(-10deg) scale(1.12)}
.r331-part b{display:block;color:var(--p3-ink1);font-size:13px}
.r331-part span{display:block;font-size:12.2px;color:var(--p3-ink3)}
.r331-part.shared{background:var(--p3-well)}
#profCard details{margin-top:12px;border-radius:16px;border:1px solid var(--p3-line);background:var(--p3-card);box-shadow:var(--p3-card-sh);padding:12px 16px;transition:transform .3s var(--p3-spring)}
#profCard details:hover{transform:translateX(3px)}
#profCard summary{cursor:pointer;list-style:none;font-weight:600;font-size:13.3px;color:var(--p3-ink1);display:flex;justify-content:space-between;gap:10px}
#profCard summary::-webkit-details-marker{display:none}
#profCard summary::after{content:"Read";color:var(--p3-acc);font-size:12px}
#profCard details[open] summary::after{content:"Fold"}
#profCard details ul{margin:8px 0 2px;padding-left:18px;font-size:12.8px;color:var(--p3-ink2)}
#profCard details li{margin:4px 0}
/* the door: who is using Ingenium */
#profDoor{position:fixed;top:0;right:0;bottom:0;left:0;z-index:2147483002;display:flex;align-items:center;justify-content:center;padding:18px;background:rgba(20,12,30,.42);animation:r331Fade .2s ease-out}
body[data-theme="night"] #profDoor{background:rgba(9,6,15,.62)}
#profDoor[hidden]{display:none}
@keyframes r331Fade{from{opacity:0}to{opacity:1}}
.r331-door{display:flex;flex-direction:column;align-items:center;gap:14px;padding:24px 18px;border-radius:20px;border:1px solid var(--p3-line);background:var(--p3-card);box-shadow:var(--p3-card-hi);text-align:center;max-width:min(640px,96vw);
  color:var(--p3-ink2);font:14px/1.45 -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif;animation:r331Rise .35s var(--p3-spring)}
.r331-door h3{margin:0;font:600 24px/1.15 var(--p3-serif);color:var(--p3-ink1)}
.r331-coins{display:flex;gap:14px;flex-wrap:wrap;justify-content:center}
.r331-coin{display:flex;flex-direction:column;align-items:center;gap:8px;padding:12px 14px;border-radius:14px;border:1px solid var(--p3-line);background:var(--p3-card);box-shadow:var(--p3-card-sh);min-width:112px;
  font:inherit;color:inherit;cursor:pointer;transition:transform .35s var(--p3-spring),box-shadow .25s}
.r331-coin:hover{transform:translateY(-3px);box-shadow:var(--p3-card-hi)}
.r331-coin:active{transform:translateY(1px)}
.r331-coin b{font-size:13px;color:var(--p3-ink1)}
.r331-coin .r331-cap{font-size:11.6px;color:var(--p3-ink3)}
@media (max-width:760px){.r331-parts{grid-template-columns:1fr}.r331-add{grid-template-columns:1fr}.r331-prow{grid-template-columns:auto minmax(0,1fr)}.r331-acts{grid-column:1/-1;justify-content:flex-start}}
body[data-motion="minimal"] #profKey,body[data-motion="minimal"] .r331-mk,body[data-motion="minimal"] #profPop,body[data-motion="minimal"] #profCard *,body[data-motion="minimal"] #profDoor *{animation:none!important;transition:none!important}
@media (prefers-reduced-motion:reduce){#profKey,.r331-mk,#profPop,#profCard *,#profDoor,#profDoor *{animation:none!important;transition:none!important}}
</style>
<script>try{(window.__ingParts=window.__ingParts||{})["p331"]="started";}catch(_){}
(function(){"use strict";
if(window.IngProfiles)return;
var W=window,D=document,P0=W.__ingProfile||{id:"owner",owner:true},X=W.__ingProfiles;
if(!X)return;   /* the boot script did not run (an older page): nothing here */
function $(id){return D.getElementById(id);}
function esc(s){return String(s==null?"":s).replace(/[&<>"']/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c];});}
var TINT=[["#dccbf3","#bfa6e6","#3b2266"],["#cfe0f7","#a9c4ec","#1e3a66"],["#cfe9dc","#a8d4bf","#1d4d38"],["#f3c9d6","#d9a2c9","#5b2147"],["#f6e7b8","#e9cf86","#5a4310"],["#f1eef6","#ddd7e6","#4a4358"]];
function snd(r){try{if(W.IngSound)IngSound.play(r);}catch(e){}}
/* ---------- the list of profiles (shared by the device; the owner's own entry is "owner") ---------- */
function ownerName(){if(P0.owner){var n="";try{n=String((W.state&&state.persona&&state.persona.name)||"").trim();}catch(e){}
  /* as Home greets her: her profile's name, or else the copy's own author, by the first word */
  if(!n){try{n=String((typeof W.lxhAuthor==="function"&&W.lxhAuthor())||"").trim().split(/\s+/)[0]||"";}catch(e){}}
  if(!n){try{n=String((W.IngLock&&IngLock.user())||"").trim();}catch(e){}}if(n)return n;}var r=X.reg();return (r&&r.ownerName)||"";}
function reg(){var r=X.reg();if(!r||typeof r!=="object")r={v:1,cur:"owner",list:[]};if(!Array.isArray(r.list))r.list=[];if(typeof r.cur!=="string")r.cur="owner";
  if(!r.list.some(function(p){return p&&p.id==="owner";}))r.list.unshift({id:"owner",name:ownerName()||"You",t:0,pw:"always"});
  r.list.forEach(function(p){if(p.id==="owner"){p.pw="always";if(P0.owner){var n=ownerName();if(n)p.name=n;}}});
  return r;}
function list(){return reg().list;}
function me(){var r=reg(),id=P0.owner?"owner":P0.id;for(var i=0;i<r.list.length;i++)if(r.list[i].id===id)return r.list[i];return r.list[0];}
function isOwner(){return !!P0.owner;}
function lockOn(){try{return !!(W.IngLock&&IngLock.on());}catch(e){return false;}}
function lockRec(){try{return !!(W.IngLock&&IngLock.active());}catch(e){return false;}}
function tile(p,s,round){var c=TINT[(+p.t||0)%TINT.length];return '<span class="r331-mk'+(round?' round':'')+'" style="--s:'+(s||30)+'px;--a:'+c[0]+';--b:'+c[1]+';--c:'+c[2]+'" aria-hidden="true">'+esc(String(p.name||"?").charAt(0).toUpperCase())+'</span>';}
function opens(p){return p.pw==="always"?"Always your password, while the sign-in is on":p.pw==="own"?(p.sealed?"Sealed with its own password":"Its own password, chosen when it first opens"):"Opens without a password";}
function kindOf(p){return p.id==="owner"?"The owner":p.kind==="guest"?"A guest":"A profile";}
/* ---------- the computer apps: each profile's files on the disk its own (desktop/app_profiles_744.py) ---------- */
function api(){try{return (W.pywebview&&W.pywebview.api)||null;}catch(e){return null;}}
function shellUse(id){var a=api();if(!a)return Promise.resolve(true);
  if(typeof a.profile_use!=="function")return Promise.resolve(id==="owner");   /* an older computer app: only the owner's profile is safe on its disk */
  return Promise.resolve(a.profile_use(id==="owner"?"":id)).then(function(r){return !!(r&&r.ok);}).catch(function(){return false;});}
/* ---------- moving to another profile: everything saved, the computer's app told, the page opened again in that profile ---------- */
function saveNow(){try{if(typeof W.saveState==="function")W.saveState();}catch(e){}try{if(typeof W.flushShellSave==="function")W.flushShellSave();}catch(e){}}
function switchTo(id,note){var r=reg(),t=null;r.list.forEach(function(p){if(p.id===id)t=p;});if(!t)return;
  if(id===(P0.owner?"owner":P0.id)&&!$("profDoor")){closePop();return;}
  saveNow();
  setTimeout(function(){shellUse(id).then(function(ok){
    if(!ok){say(note,"This computer's app is older than profiles, so only your own profile can open here until it is brought up to date.");return;}
    r.cur=id;X.save(r);try{sessionStorage.setItem("ing.profile.entered","1");}catch(e){}location.reload();});},250);}
function say(where,t){var s=where||$("profSaid");if(s)s.textContent=t;else try{if(typeof W.toast==="function")W.toast(t);}catch(e){}}
/* ---------- the key, beside the seal ---------- */
function key(){var k=$("profKey");if(k)return k;var seal=$("brandSealBtn");if(!seal||!seal.parentNode)return null;
  k=D.createElement("button");k.id="profKey";k.type="button";k.setAttribute("aria-haspopup","true");k.setAttribute("aria-expanded","false");
  seal.parentNode.insertBefore(k,seal.nextSibling);k.addEventListener("click",function(){var p=$("profPop");if(p&&!p.hidden)closePop();else openPop();});return k;}
function keepOwnerName(){if(!P0.owner)return;var r=X.reg()||null,n=ownerName();if(r&&n&&r.ownerName!==n){r.ownerName=n;X.save(r);}}
function paintKey(){keepOwnerName();var k=key();if(!k)return;var p=me();
  k.innerHTML=tile(p,26,true)+'<span class="r331-nm">'+esc(p.name)+'</span><svg class="r331-chev" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg>';
  k.title="Who is using Ingenium: "+p.name;k.setAttribute("aria-label","Profile in use: "+p.name+". Press to switch");}
/* ---------- the menu under the key (version 3) ---------- */
function pop(){var d=$("profPop");if(d)return d;d=D.createElement("div");d.id="profPop";d.setAttribute("role","menu");d.setAttribute("aria-label","Who is using Ingenium");d.hidden=true;D.body.appendChild(d);
  d.addEventListener("click",function(e){var b=e.target.closest("button");if(!b)return;tap(b);
    if(b.hasAttribute("data-who")){var id=b.getAttribute("data-who");if(id===(P0.owner?"owner":P0.id)){closePop();return;}closePop();switchTo(id);return;}
    if(b.id==="profLock"){closePop();lockNow();return;}
    if(b.id==="profManage"){closePop();manage();}});return d;}
function place(){var d=$("profPop"),k=$("profKey");if(!d||d.hidden||!k)return;var r=k.getBoundingClientRect();d.style.top=Math.round(r.bottom+8)+"px";d.style.left=Math.round(Math.max(12,Math.min(r.left-6,innerWidth-d.offsetWidth-12)))+"px";}
function openPop(){var d=pop(),cur=P0.owner?"owner":P0.id;
  d.innerHTML='<h4>Who is using Ingenium</h4>'+list().map(function(p){return '<button class="r331-who" type="button" role="menuitem" data-who="'+esc(p.id)+'"'+(p.id===cur?' aria-current="true"':'')+'>'+tile(p,30,true)
     +'<span><b>'+esc(p.name)+'</b><span class="r331-t">'+opens(p)+'</span></span>'+(p.id===cur?'<span class="r331-chip">In use</span>':'')+'</button>';}).join("")
   +'<div class="r331-foot"><button class="r331-k" type="button" id="profLock">Lock Ingenium</button>'+(isOwner()?'<button class="r331-k" type="button" id="profManage">Manage profiles</button>':'')+'</div>';
  d.hidden=false;place();var k=$("profKey");if(k)k.setAttribute("aria-expanded","true");snd("cards");}
function closePop(){var d=$("profPop");if(d)d.hidden=true;var k=$("profKey");if(k)k.setAttribute("aria-expanded","false");}
D.addEventListener("pointerdown",function(e){var d=$("profPop");if(d&&!d.hidden&&!e.target.closest("#profPop")&&!e.target.closest("#profKey"))closePop();},true);
D.addEventListener("keydown",function(e){if(e.key!=="Escape")return;var d=$("profPop");if(d&&!d.hidden){closePop();var k=$("profKey");if(k)k.focus();}},true);
W.addEventListener("resize",place);W.addEventListener("scroll",place,true);
function tap(b){var m=b&&b.querySelector&&b.querySelector(".r331-mk");if(m){m.classList.remove("tap");void m.offsetWidth;m.classList.add("tap");}}
/* ---------- locking: a profile with a sign-in locks as the sign-in does; one without opens the door, who is using Ingenium ---------- */
function lockNow(){if(lockOn()){saveNow();try{IngLock.lockNow();return;}catch(e){}}door();}
function door(){var d=$("profDoor");if(!d){d=D.createElement("div");d.id="profDoor";d.setAttribute("role","dialog");d.setAttribute("aria-modal","true");d.setAttribute("aria-label","Who is using Ingenium");D.body.appendChild(d);
    d.addEventListener("click",function(e){var b=e.target.closest("button");if(!b)return;tap(b);if(b.hasAttribute("data-door")){var id=b.getAttribute("data-door");switchTo(id,$("profDoorSaid"));}});}
  d.innerHTML='<div class="r331-door"><h3>Who is using Ingenium?</h3><p style="margin:0">Each profile opens as its owner chose.</p><div class="r331-coins">'+list().map(function(p){return '<button class="r331-coin" type="button" data-door="'+esc(p.id)+'">'+tile(p,48,true)+'<b>'+esc(p.name)+'</b><span class="r331-cap">'+(p.pw==="none"?"Opens without a password":"Needs its password")+'</span></button>';}).join("")+'</div><div class="r331-said" id="profDoorSaid"></div></div>';
  d.hidden=false;snd("cards");}
/* on the sign-in's own door (r197), the way to another profile */
function onLockDoor(){var dd=$("ingLockDoor");if(!dd||dd.hidden||dd.querySelector(".r331-else"))return;if(list().length<2)return;var card=dd.querySelector(".ild-card");if(!card)return;
  var b=D.createElement("button");b.type="button";b.className="r331-k r331-else";b.style.margin="12px auto 0";b.style.display="flex";b.textContent="Someone else? Choose a profile";
  b.addEventListener("click",function(){door();});card.appendChild(b);}
/* ---------- Profiles on this device: Settings, Security ---------- */
var UI={rm:null,add:{name:"",t:3,pw:"own"},said:"",part:null};
function card(){var c=$("profCard");if(c)return c;var after=$("secCard"),page=$("page-settings");if(!page)return null;
  c=D.createElement("div");c.className="card";c.id="profCard";c.innerHTML='<h2 class="sec">Profiles on this device</h2><div class="r331-body"></div>';
  if(after&&after.parentNode)after.parentNode.insertBefore(c,after.nextSibling);else page.appendChild(c);
  c.addEventListener("click",onCard);c.addEventListener("submit",onSubmit);c.addEventListener("input",function(e){if(e.target.id==="profAddName"){UI.add.name=e.target.value;[].forEach.call(c.querySelectorAll(".r331-sw .r331-mk"),function(m){m.textContent=(e.target.value||"?").charAt(0).toUpperCase();});}});
  return c;}
var ICON={chat:'<path d="M5 5h14a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H9l-4 3V6a1 1 0 0 1 1-1z"/>',folder:'<path d="M3.5 7a1 1 0 0 1 1-1h5l2 2h8a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1h-15a1 1 0 0 1-1-1z"/>',
  book:'<path d="M4 5.5A1.5 1.5 0 0 1 5.5 4H11v15H5.5A1.5 1.5 0 0 0 4 20.5z"/><path d="M20 5.5A1.5 1.5 0 0 0 18.5 4H13v15h5.5a1.5 1.5 0 0 1 1.5 1.5z"/>',
  sun:'<circle cx="12" cy="12" r="4"/><path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6l1.4 1.4M17 17l1.4 1.4M5.6 18.4L7 17M17 7l1.4-1.4"/>',
  link:'<path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1"/><path d="M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1"/>',
  chip:'<rect x="6" y="6" width="12" height="12" rx="2"/><path d="M9 3v3M15 3v3M9 18v3M15 18v3M3 9h3M3 15h3M18 9h3M18 15h3"/>'};
function ic(k){return '<svg viewBox="0 0 24 24" aria-hidden="true">'+ICON[k]+'</svg>';}
function holds(i){try{var s=W.state||{};
  if(i===0)return ((s.chats||[]).length)+" conversations kept here";
  if(i===1)return "Read only for this profile";
  if(i===3)return "This profile's look: "+(s.theme==="night"?"Night":s.theme==="day"?"Day":"as this device is set");
  if(i===4)return ((s.cxKept||[]).length)+" connections kept here";
  if(i===5)return ((s.models||[]).length)+" models, the same for every profile";}catch(e){}return "Kept for this profile alone";}
function paint(){var c=card();if(!c)return;var b=c.querySelector(".r331-body");if(!b)return;var M=me(),own=isOwner(),h="";
  h+='<p class="r331-lede">Each person who uses Ingenium here has a profile of their own. What a profile keeps stays apart from the others; the models are shared. '+(own?"Only you, the owner, add, remove or change profiles.":"Only the owner adds, removes or changes profiles.")+'</p><div class="r331-list">';
  list().forEach(function(p){var isMe=p.id===M.id;
    h+='<div class="r331-prow">'+tile(p,38)+'<span><b>'+esc(p.name)+'</b>'+(isMe?' <span class="r331-chip" style="margin-left:6px">In use</span>':'')+'<span class="r331-t">'+kindOf(p)+'</span></span><span class="r331-acts">';
    if(p.id==="owner"||!own)h+='<span class="r331-chip">'+opens(p)+'</span>';
    else{if(p.sealed)h+='<span class="r331-chip">'+opens(p)+'</span>';
      else h+='<span class="r331-opts" role="radiogroup" aria-label="How '+esc(p.name)+' opens">'+[["own","Its own password"],["none","Opens without one"]].map(function(o){return '<button class="r331-opt" type="button" role="radio" data-pw="'+esc(p.id)+':'+o[0]+'" aria-checked="'+(p.pw===o[0])+'"><span class="r331-dot"></span>'+o[1]+'</button>';}).join("")+'</span>';
      h+='<button class="r331-k warn" type="button" data-rm="'+esc(p.id)+'">Remove</button>';}
    h+='</span>';
    if(own&&UI.rm===p.id)h+='<div class="r331-confirm"><span>Remove '+esc(p.name)+'\'s profile? Its conversations, memory, folders, records, settings and keys on this device go with it. This cannot be undone.</span><button class="r331-k warn" type="button" data-rmyes="'+esc(p.id)+'">Remove '+esc(p.name)+'</button><button class="r331-k" type="button" data-rmno="1">Keep it</button></div>';
    h+='</div>';});
  h+='</div>';
  if(own){var a=UI.add;
    h+='<div class="r331-sec">Add a profile<small>For another person, a guest, or a test.</small></div>';
    if(!lockOn())h+='<div class="r331-note">Profiles need your sign-in to be on, so that your own profile is guarded by your password. <button class="r331-k" type="button" id="profLockSetup" style="margin-left:6px">Turn on your sign-in</button></div>';
    else h+='<form class="r331-add" id="profAdd" autocomplete="off"><label for="profAddName">Their name<input id="profAddName" maxlength="24" placeholder="A first name" value="'+esc(a.name)+'"></label>'
      +'<div class="r331-lab">Their tile<div class="r331-sws" role="radiogroup" aria-label="Their tile">'+TINT.map(function(c,i){return '<button class="r331-sw" type="button" role="radio" data-t="'+i+'" aria-checked="'+(a.t===i)+'" aria-label="Tile '+(i+1)+'">'+tile({name:a.name||"?",t:i},30)+'</button>';}).join("")+'</div></div>'
      +'<div class="r331-lab">How it opens<span class="r331-opts" role="radiogroup">'+[["own","Its own password"],["none","Opens without one"]].map(function(o){return '<button class="r331-opt" type="button" role="radio" data-addpw="'+o[0]+'" aria-checked="'+(a.pw===o[0])+'"><span class="r331-dot"></span>'+o[1]+'</button>';}).join("")+'</span></div>'
      +'<div class="r331-lab" style="font-weight:400;color:var(--p3-ink3)">'+(a.pw==="own"?"They choose their password the first time the profile opens, and are shown its ten words themselves, so nobody else can open it, you included.":"Not sealed: anyone at this device can open it. It suits a guest or a test.")+'</div>'
      +'<div class="r331-go"><button class="r331-k pri" type="submit">Add the profile</button><span class="r331-err" id="profAddErr"></span><span class="r331-said" id="profSaid">'+esc(UI.said)+'</span></div></form>';}
  else h+='<div class="r331-said" id="profSaid"></div>';
  h+='<div class="r331-sec">What each profile keeps apart<small>Press one to see what it holds for '+esc(M.name)+'.</small></div><div class="r331-parts">'
    +[["chat","Conversations and memory","Its own chats, and what Ingenium remembers from them."],["folder","Folders and the folder search","Its folders in Ingenia; the search reads only these."],["book","Lector and Vocatio records","With its notes in Ingenia's folders."],["sun","Display and sounds","Day or night, motion, Ingenium's sounds, nature sounds."],["link","Connections and their keys","Its own keys, so nobody spends another's."],["chip","Shared: the models","Kept once, in Mentes, for every profile."]]
     .map(function(x,i){return '<button class="r331-part'+(i===5?' shared':'')+'" type="button" data-part="'+i+'">'+ic(x[0])+'<span><b>'+x[1]+'</b><span>'+(UI.part===i?esc(holds(i)):x[2])+'</span></span></button>';}).join("")+'</div>';
  h+='<details><summary>Said plainly</summary><ul>'
    +'<li>A profile with its own password is sealed with it, as your sign-in seals your data. No other profile can read it, yours included. If its password is forgotten, the ten words made with it open it again; without them, the profile can only be removed.</li>'
    +'<li>A profile that opens without a password is not sealed: anyone at this device can open it.</li>'
    +'<li>Moving to another profile saves everything first and opens Ingenium again in that profile, so nothing of one session is left for the next.</li>'
    +'<li>The folder search records who may read each folder and applies it inside the search itself, so another profile\'s passages never reach an answer.</li>'
    +'<li>Profiles live on this device. They are not accounts on the internet, and nothing about them leaves the device.</li></ul></details>';
  b.innerHTML=h;}
function onCard(e){var b=e.target.closest("button");if(!b)return;tap(b);var r=reg();
  if(b.id==="profLockSetup"){try{IngLock.setup({});}catch(x){}return;}
  if(b.hasAttribute("data-part")){var i=+b.getAttribute("data-part");UI.part=UI.part===i?null:i;paint();return;}
  if(!isOwner())return;
  if(b.hasAttribute("data-pw")){var a=b.getAttribute("data-pw").split(":");r.list.forEach(function(p){if(p.id===a[0]&&!p.sealed)p.pw=a[1]==="own"?"own":"none";});X.save(r);paint();return;}
  if(b.hasAttribute("data-rm")){UI.rm=b.getAttribute("data-rm");paint();return;}
  if(b.hasAttribute("data-rmno")){UI.rm=null;paint();return;}
  if(b.hasAttribute("data-rmyes")){removeProfile(b.getAttribute("data-rmyes"));return;}
  if(b.hasAttribute("data-t")){keepName();UI.add.t=+b.getAttribute("data-t");paint();return;}
  if(b.hasAttribute("data-addpw")){keepName();UI.add.pw=b.getAttribute("data-addpw")==="none"?"none":"own";paint();return;}}
function keepName(){var n=$("profAddName");if(n)UI.add.name=n.value;}
function onSubmit(e){if(e.target.id!=="profAdd")return;e.preventDefault();keepName();var a=UI.add,nm=String(a.name||"").trim(),er=$("profAddErr"),r=reg();
  if(!isOwner()||!lockOn())return;
  if(!nm){if(er)er.textContent="Give the profile a name first.";return;}
  if(r.list.some(function(p){return String(p.name).toLowerCase()===nm.toLowerCase();})){if(er)er.textContent="There is a profile of that name already.";return;}
  var id="p"+Date.now().toString(36)+Math.floor(Math.random()*1296).toString(36);
  r.list.push({id:id,name:nm.slice(0,24),t:a.t|0,pw:a.pw==="none"?"none":"own",added:new Date().toISOString().slice(0,10)});
  if(X.save(r)){snd("confirm");UI.said=nm+"'s profile is ready"+(a.pw==="own"?": "+nm+" chooses its password the first time it opens.":", and opens without a password.");UI.add={name:"",t:(a.t+1)%TINT.length,pw:"own"};}
  paint();paintKey();}
function removeProfile(id){var r=reg();if(id==="owner"||!isOwner())return;var t=null;r.list.forEach(function(p){if(p.id===id)t=p;});if(!t)return;
  r.list=r.list.filter(function(p){return p.id!==id;});if(r.cur===id)r.cur="owner";X.save(r);UI.rm=null;
  var a=api(),disk=(a&&typeof a.profile_drop==="function")?Promise.resolve(a.profile_drop(id)).catch(function(){}):Promise.resolve();
  /* its folders in the folder search: the reader "p:<id>" and the folders only it could read */
  var rag=Promise.resolve().then(function(){if(!W.IngRag||!IngRag._store)return;var st=IngRag._store;
    return Promise.resolve(st.principal.find({name:"p:"+id})).then(function(pr){if(!pr||!pr.id)return;return Promise.resolve(st.folder.list({principalId:pr.id})).then(function(fs){
      return Promise.all((fs||[]).map(function(f){return Promise.resolve(IngRag.removeFolder(f.id)).catch(function(){});}));});});}).catch(function(){});
  Promise.all([X.drop(id),disk,rag]).then(function(){UI.said=t.name+"'s profile was removed, with what it kept on this device.";paint();paintKey();});}
function manage(){try{if(typeof W.go==="function")go("settings");}catch(e){}
  setTimeout(function(){try{var tab=[].filter.call(D.querySelectorAll("#page-settings button"),function(x){return x.textContent.trim()==="Security"&&x.offsetParent;})[0];if(tab)tab.click();}catch(e){}
    setTimeout(function(){try{if(W.IngSecurity&&IngSecurity.view)IngSecurity.view("device");}catch(e){}paint();var c=$("profCard");if(c&&c.scrollIntoView)c.scrollIntoView({behavior:"smooth",block:"start"});},250);},250);}
/* the card shows with Security's Everything and This device, and is drawn again as the room is */
function fit(){var c=$("profCard");if(!c)return;var v="all";try{if(W.IngSecurity&&IngSecurity.view)v=IngSecurity.view();}catch(e){}c.style.display=(v==="all"||v==="device")?"":"none";}
/* ---------- the shared models: each profile's desk lists them, and they are kept once for the device ---------- */
var MODELS="ingenium_models_shared";
function modelsIn(){try{var t=localStorage.getItem(MODELS);var L=t?JSON.parse(t):[];if(!Array.isArray(L)||!W.state)return;var have={};(state.models||[]).forEach(function(m){if(m&&m.id)have[m.id]=1;});
  var add=L.filter(function(m){return m&&m.id&&!have[m.id];});if(add.length){state.models=(state.models||[]).concat(add);try{saveState();}catch(e){}try{if(typeof renderModels==="function")renderModels();}catch(e){}}}catch(e){}}
function modelsOut(){try{if(!W.state||!Array.isArray(state.models))return;var L=state.models.filter(function(m){return m&&m.id;}).map(function(m){var o={};for(var k in m){if(k!=="history"&&k!=="notes")o[k]=m[k];}return o;});
  var t=JSON.stringify(L);if(t!==modelsOut.last){modelsOut.last=t;localStorage.setItem(MODELS,t);}}catch(e){}}
/* ---------- a profile opening for the first time: its name, and its own password when the owner chose one ---------- */
function first(){if(P0.owner){var r=reg(),n=ownerName();if(n&&r.ownerName!==n){r.ownerName=n;X.save(r);}return;}
  try{if(W.state){state.persona=state.persona||{};if(!String(state.persona.name||"").trim()&&P0.name){state.persona.name=P0.name;try{saveState();}catch(e){}}}}catch(e){}
  var m=me();
  if(lockRec()){if(!m.sealed){var r2=reg();r2.list.forEach(function(p){if(p.id===P0.id)p.sealed=true;});X.save(r2);}return;}
  if(m.pw==="own"&&W.IngLock&&typeof IngLock.setup==="function"){
    setTimeout(function(){try{IngLock.setup({onCancel:function(){door();}});}catch(e){}},600);}}
/* a profile whose own sign-in is turned on is marked sealed on the list (its menu and the owner's card say so) */
function markSealed(){if(P0.owner||!lockRec())return;var r=reg(),ch=false;r.list.forEach(function(p){if(p.id===P0.id&&!p.sealed){p.sealed=true;p.pw="own";ch=true;}});if(ch)X.save(r);}
/* ---------- start ---------- */
function start(){paintKey();card();paint();fit();first();modelsIn();
  setInterval(function(){modelsOut();fit();if(!$("profKey"))paintKey();onLockDoor();markSealed();},1500);
  try{new MutationObserver(function(){onLockDoor();}).observe(D.body,{childList:true,subtree:false});}catch(e){}
  try{if(sessionStorage.getItem("ing.profile.entered")==="1"){sessionStorage.removeItem("ing.profile.entered");}}catch(e){}}
if(D.readyState==="loading")D.addEventListener("DOMContentLoaded",start);else start();
W.IngProfiles={me:function(){return me();},list:function(){return list();},owner:isOwner,switchTo:switchTo,door:door,open:openPop,close:closePop,paint:paint,
  _reg:reg,_models:{into:modelsIn,out:modelsOut}};
try{window.__ingParts["p331"]="running";}catch(_){}
})();
</script>
