<style id="r318-css">
/* ============ R318 · SECURITY, A ROOM IN SETTINGS (Ingenium 7.36, 18 November 2026) ============
   Her words (18 November 2026): "I want you to upgrade and enhance Ingenium's security system and embedded software protection. I really
   want everything to be encrypted and protected ... my data is protected and also my code is protected and anything that I build inside of
   Ingenium with my local models and all of my current apps." Her answers: the lock asked at first start; everything on the computer's disk
   sealed with the same password; messages between her devices encrypted end to end; her code signed and tamper-evident, scrambled, under an
   owner key and sealed in Fabrica, "and any additional features that will further protect me and encrypt Ingenium and all of its content".
   Her word on the live preview (https://claude.ai/artifact/H4ieskf4TqQR7DXc6YSeAQ, source/previews/security): "I approve of the preview,
   please commit and push it everywhere" (both previews, she said).
   Settings, Security (modules/r173.js lists the room): how many protections are on, then each, with its true state: On, Off, or Not yet
   (with the release it is planned for). What is built here, in the page:
   - Sealed on this device: the sign-in of 6.9.x (modules/r197.js), its ways back in read from its record, Lock now; its card stays in
     Your data, Sign-in and reset (Open it there). Backups sealed whole while it is on (r197).
   - At first start: a copy with no sign-in asks once, after the welcome and the tour (Protect it opens r197's own steps; Not now). Not in
     the demonstration edition, and not while a test drives the page (navigator.webdriver), unless the test asks for it.
   - More protection: Offline only (off until she turns it on: requests from the page to anything but this device and her home network
     wait, with Allow for an hour and Allow once; Ingenium's own way out, netFetch, follows it too; the computer apps' own downloads follow
     it from a later release); Lock when the computer sleeps (a pause in time longer than 90 seconds locks it, as the time away does);
     Slow down wrong passwords (after three, each try waits longer: 2, 4, 8 seconds and so on, up to five minutes; nothing is wiped);
     Clear a copied secret (a password, a recovery word or a pairing code copied from Ingenium is cleared from the clipboard after a
     minute, where the browser lets a page do so); A record of every opening (when and on which device Ingenium opened, and every wrong
     password, kept in the desk, so sealed with it).
   - Not yet, and said so with the release planned: sealing on the computer's disk, sealing between her devices, signed packages,
     scrambled code, the owner key on her apps, Ingenium itself signed and checked, asking before each export.
   - 7.51 (20 November 2026): Ask before each export is a switch of More protection, as the preview draws it (off until she turns it on;
     it needs her sign-in): with it on, every file saved out of Ingenium unsealed asks for her password first (modules/r341.js), and
     turning it off asks for the password too.
   - 7.58: Ingenium itself, signed and checked, part one (modules/r348.js, desktop/app_self_758.py): in the Mac and Windows apps, a
     release she signs with her owner key on her device (Sign this release, in her master copy) is checked at every start, and a copy
     changed since refuses to open and says which file changed. The section asks IngSelfSign for its state and its words. */
#secCard{--sc-lav-t:rgba(106,63,181,.14);--sc-lav-c:#6a3fb5;--sc-sky-t:rgba(74,160,240,.16);--sc-sky-c:#2f6fd0;--sc-amb-t:rgba(232,144,42,.16);--sc-amb-c:#b4600f;--sc-emr-t:rgba(31,157,99,.14);--sc-emr-c:#1a7f50;--sc-rub-t:rgba(200,20,60,.1);--sc-rub-c:#b8433f;
  --sc-ck:inset 0 1.5px 0 rgba(255,255,255,.95),inset 0 -3px 5px rgba(60,30,90,.16),0 1px 1px rgba(40,20,70,.3),0 3px 4px rgba(40,20,70,.24),0 6px 9px rgba(40,20,70,.18),0 12px 20px rgba(40,20,70,.12);
  --sc-ckhi:inset 0 1.5px 0 #fff,inset 0 -3px 5px rgba(60,30,90,.14),0 3px 4px rgba(40,20,70,.24),0 9px 16px rgba(40,20,70,.2),0 16px 26px rgba(40,20,70,.14);
  --sc-well:rgba(34,26,46,.035);--sc-line:var(--hairline,rgba(34,26,46,.1));--sc-hi:0 2px 0 rgba(40,22,68,.08),0 8px 16px rgba(40,22,68,.1),0 18px 38px rgba(40,22,68,.12)}
body[data-theme="night"] #secCard{--sc-lav-t:rgba(183,156,230,.15);--sc-lav-c:#b79ce6;--sc-sky-t:rgba(124,196,255,.15);--sc-sky-c:#7cc4ff;--sc-amb-t:rgba(240,176,96,.15);--sc-amb-c:#f0b060;--sc-emr-t:rgba(64,192,128,.15);--sc-emr-c:#6fd8a2;--sc-rub-t:rgba(240,120,120,.14);--sc-rub-c:#f08a86;
  --sc-ck:inset 0 1.5px 0 rgba(255,255,255,.16),inset 0 -3px 5px rgba(0,0,0,.45),0 1px 1px rgba(0,0,0,.65),0 3px 4px rgba(0,0,0,.55),0 6px 9px rgba(0,0,0,.45),0 12px 20px rgba(0,0,0,.32);
  --sc-ckhi:inset 0 1.5px 0 rgba(255,255,255,.2),inset 0 -3px 5px rgba(0,0,0,.4),0 3px 4px rgba(0,0,0,.6),0 9px 16px rgba(0,0,0,.5),0 16px 26px rgba(0,0,0,.4);
  --sc-well:rgba(10,6,18,.35);--sc-hi:0 2px 0 rgba(0,0,0,.45),0 10px 20px rgba(0,0,0,.42),0 20px 40px rgba(0,0,0,.4)}
#secCard .sc-subs{display:flex;flex-wrap:wrap;gap:8px;margin:2px 0 12px}
#secCard .sc-sub{display:inline-flex;align-items:center;gap:6px;border:1px solid var(--sc-line);background:linear-gradient(var(--card-hi,#fff),var(--card-lo,#f9f7fc));box-shadow:var(--pop,0 2px 0 rgba(40,22,68,.25));color:var(--ink-2,#4a4358);font:600 12.8px/1.2 var(--sans,system-ui);padding:6px 13px;border-radius:12px;cursor:pointer;transition:transform .16s cubic-bezier(.34,1.35,.64,1),box-shadow .16s}
#secCard .sc-sub:hover{transform:translateY(-2px);box-shadow:var(--pop-hi,var(--pop))}
#secCard .sc-sub[aria-selected="true"]{color:#fff;background:linear-gradient(180deg,#7348be,#5d37a1);border-color:#4b2a86;box-shadow:inset 0 1px 0 rgba(255,255,255,.24),0 1px 0 #3a2070,0 3px 6px rgba(52,24,100,.26),0 8px 14px rgba(52,24,100,.12)}
#secCard .sc-over{display:grid;grid-template-columns:auto minmax(0,1fr);gap:18px;align-items:center;margin-bottom:12px}
@media (max-width:560px){#secCard .sc-over{grid-template-columns:minmax(0,1fr)}}
#secCard .sc-shield{width:104px;height:118px;transition:transform .5s cubic-bezier(.2,.9,.25,1.2)}
#secCard .sc-shield:hover{transform:rotateY(14deg) rotateX(-6deg) scale(1.04)}
#secCard .sc-shield svg{width:100%;height:100%;filter:drop-shadow(0 10px 14px rgba(40,22,68,.28))}
#secCard .sc-big{font:600 21px/1.25 var(--serif,Georgia,serif);color:var(--ink-1,#221a2e)}
#secCard .sc-bars{display:flex;gap:5px;margin:8px 0}
#secCard .sc-bars i{flex:1;height:9px;border-radius:5px;background:var(--sc-well);border:1px solid var(--sc-line);transition:transform .2s cubic-bezier(.2,.9,.25,1.2)}
#secCard .sc-bars i.on{background:linear-gradient(#7348be,#5d37a1);border-color:transparent}
#secCard .sc-bars i.soon{background:repeating-linear-gradient(135deg,var(--sc-well) 0 4px,var(--sc-line) 4px 6px)}
#secCard .sc-bars i:hover{transform:translateY(-2px)}
#secCard .sc-list{display:grid;grid-template-columns:repeat(auto-fill,minmax(230px,1fr));gap:8px}
#secCard .sc-it{display:flex;align-items:center;gap:8px;padding:8px 10px;border-radius:10px;background:var(--sc-well);border:1px solid var(--sc-line);font-size:12.8px;color:var(--ink-1,#221a2e);text-align:left;cursor:pointer;transition:transform .2s cubic-bezier(.2,.9,.25,1.2),box-shadow .2s}
#secCard .sc-it:hover{transform:translateY(-2px);box-shadow:var(--sc-hi)}
#secCard .sc-it > span:not(.sc-chip){flex:1;min-width:0}
#secCard .sc-dot{width:9px;height:9px;border-radius:50%;flex:0 0 auto;background:var(--ok,#2f7a55);box-shadow:0 0 0 3px var(--sc-emr-t)}
#secCard .sc-dot.off{background:#b8433f;box-shadow:0 0 0 3px var(--sc-rub-t)} #secCard .sc-dot.soon{background:var(--ink-3,#6c6579);box-shadow:0 0 0 3px var(--sc-line)}
#secCard .sc-chip{display:inline-flex;align-items:center;font:600 11.5px/1 var(--sans,system-ui);padding:5px 9px;border-radius:999px;background:var(--sc-lav-t);color:var(--sc-lav-c);white-space:nowrap}
#secCard .sc-chip.ok{background:var(--sc-emr-t);color:var(--sc-emr-c)} #secCard .sc-chip.off{background:var(--sc-rub-t);color:var(--sc-rub-c)} #secCard .sc-chip.soon{background:var(--sc-well);color:var(--ink-3,#6c6579);border:1px solid var(--sc-line)}
#secCard .sc-p{border:1px solid var(--sc-line);border-radius:13px;background:linear-gradient(var(--card-hi,#fff),var(--card-lo,#f9f7fc));box-shadow:0 1px 0 rgba(40,22,68,.06),0 6px 16px rgba(40,22,68,.06);margin:10px 0 0;transition:transform .2s cubic-bezier(.34,1.35,.64,1),box-shadow .2s;animation:scRise .34s cubic-bezier(.2,.9,.25,1.2) backwards}
#secCard .sc-p:hover{transform:translateY(-2px);box-shadow:var(--sc-hi)}
#secCard .sc-ph{display:flex;align-items:center;gap:12px;width:100%;border:0;background:none;padding:12px 14px;text-align:left;cursor:pointer;color:inherit;font:inherit}
#secCard .sc-ph .ic{flex:0 0 36px;height:36px;border-radius:11px;display:grid;place-items:center;color:#fff;background:linear-gradient(180deg,#7348be,#5d37a1);box-shadow:inset 0 1px 0 rgba(255,255,255,.24),0 1px 0 #3a2070,0 3px 6px rgba(52,24,100,.26);transition:transform .35s cubic-bezier(.2,.9,.25,1.2)}
#secCard .sc-ph:hover .ic{transform:rotate(-8deg) scale(1.08)} #secCard .sc-ph .ic svg{width:18px;height:18px}
#secCard .sc-ph .tx{flex:1;min-width:0} #secCard .sc-ph .tx b{display:block;font:600 15px/1.35 var(--serif,Georgia,serif);color:var(--ink-1,#221a2e)} #secCard .sc-ph .tx small{display:block;color:var(--ink-3,#6c6579);font-size:12.5px}
#secCard .sc-ph .chev{color:var(--ink-3,#6c6579);transition:transform .25s cubic-bezier(.2,.9,.25,1.2);font-size:18px}
#secCard .sc-p[aria-expanded="true"] .chev{transform:rotate(90deg)}
#secCard .sc-pb{padding:0 14px 14px 62px;display:flex;flex-direction:column;gap:9px}
@media (max-width:560px){#secCard .sc-pb{padding-left:14px}}
#secCard .sc-pb[hidden]{display:none}
#secCard .sc-well{border:1px solid var(--sc-line);border-radius:11px;background:var(--sc-well);padding:10px 12px;display:flex;flex-direction:column;gap:7px;transition:transform .2s cubic-bezier(.2,.9,.25,1.2),box-shadow .2s}
#secCard .sc-well:hover{transform:translateY(-1.5px);box-shadow:var(--sc-hi)}
#secCard .sc-wh{display:flex;justify-content:space-between;gap:8px;align-items:center;flex-wrap:wrap} #secCard .sc-wh b{color:var(--ink-1,#221a2e);font-size:13.5px}
#secCard .sc-well p,#secCard .sc-pb > p{margin:0;font-size:12.8px;line-height:1.55;color:var(--ink-2,#4a4358)}
#secCard .sc-fine{font-size:12px;color:var(--ink-3,#6c6579)}
#secCard .sc-tags{display:flex;gap:6px;flex-wrap:wrap}
#secCard .sc-keys{display:flex;gap:8px;flex-wrap:wrap;align-items:center}
#secCard .sc-key,#secAsk .sc-key{display:inline-flex;align-items:center;gap:6px;border:1px solid transparent;font:600 12.5px/1.3 var(--sans,system-ui);padding:6px 11px;border-radius:7px;white-space:nowrap;cursor:pointer;box-shadow:var(--sc-ck);transition:transform .16s cubic-bezier(.34,1.35,.64,1),box-shadow .16s}
#secCard .sc-key:hover,#secAsk .sc-key:hover{transform:translateY(-3px);box-shadow:var(--sc-ckhi)} #secCard .sc-key:active,#secAsk .sc-key:active{transform:translateY(1px)}
#secCard .sc-key.lav{background:var(--sc-lav-t);border-color:var(--sc-lav-t);color:var(--sc-lav-c)} #secCard .sc-key.sky{background:var(--sc-sky-t);border-color:var(--sc-sky-t);color:var(--sc-sky-c)}
#secCard .sc-key.amb{background:var(--sc-amb-t);border-color:var(--sc-amb-t);color:var(--sc-amb-c)} #secCard .sc-key.emr{background:var(--sc-emr-t);border-color:var(--sc-emr-t);color:var(--sc-emr-c)}
#secCard .sc-key.pri,#secAsk .sc-key.pri{background:linear-gradient(180deg,#7348be,#5d37a1);border-color:#4b2a86;color:#fff;border-radius:10px;padding:8px 14px;box-shadow:inset 0 1px 0 rgba(255,255,255,.24),0 1px 0 #3a2070,0 3px 6px rgba(52,24,100,.26),0 8px 14px rgba(52,24,100,.12)}
#secCard .sw2{display:flex;align-items:center;gap:10px;border:1px solid var(--sc-line);border-radius:10px;background:var(--card,#fff);padding:8px 10px;text-align:left;width:100%;cursor:pointer;color:inherit;font:inherit;transition:transform .2s cubic-bezier(.2,.9,.25,1.2),box-shadow .2s}
#secCard .sw2:hover{transform:translateX(3px);box-shadow:var(--sc-hi)} #secCard .sw2[disabled]{cursor:default;opacity:.75}
#secCard .sw2 .t{flex:1;min-width:0} #secCard .sw2 .t b{display:block;color:var(--ink-1,#221a2e);font-size:13px} #secCard .sw2 .t small{display:block;color:var(--ink-3,#6c6579);font-size:12px;line-height:1.45}
#secCard .sw2 .tr{flex:0 0 40px;height:24px;border-radius:999px;background:var(--sc-well);border:1px solid var(--sc-line);position:relative}
#secCard .sw2 .tr::after{content:"";position:absolute;top:2px;left:2px;width:18px;height:18px;border-radius:50%;background:#fff;box-shadow:0 1px 2px rgba(0,0,0,.3),0 2px 4px rgba(40,22,68,.2);transition:transform .25s cubic-bezier(.34,1.35,.64,1)}
#secCard .sw2[aria-checked="true"] .tr{background:linear-gradient(#7348be,#5d37a1);border-color:transparent} #secCard .sw2[aria-checked="true"] .tr::after{transform:translateX(16px)}
#secCard .sc-log{display:flex;flex-direction:column;gap:4px;font-size:12.5px;color:var(--ink-2,#4a4358);font-variant-numeric:tabular-nums}
#secCard .sc-limits{background:var(--sc-well)}
#secCard .sc-limits ul{margin:0;padding-left:18px;color:var(--ink-2,#4a4358);font-size:12.8px;line-height:1.6}
@keyframes scRise{from{opacity:0;transform:translateY(6px)}}
/* the first start's ask, as the lock's own door */
#secAsk{position:fixed;inset:0;z-index:2147482000;display:flex;align-items:center;justify-content:center;padding:18px;background:rgba(22,18,30,.42)}
#secAsk[hidden]{display:none}
#secAsk .sa-card{width:min(430px,94vw);border-radius:22px;padding:24px 22px 20px;background:linear-gradient(180deg,#ffffff,#f7f5fa 62%,#efeaf4);color:#221a2e;display:flex;flex-direction:column;gap:10px;font:14px/1.5 -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif;
  box-shadow:inset 0 2px 0 rgba(255,255,255,.45),inset -2px 0 0 #d3cbe0,inset 0 -3px 0 #d3cbe0,0 0 0 1px rgba(40,22,68,.1),0 9px 12px -7px rgba(40,22,68,.18),0 22px 40px -14px rgba(40,22,68,.26);animation:scRise .4s cubic-bezier(.2,.9,.25,1.2) backwards;transition:transform .3s cubic-bezier(.2,.9,.25,1.2)}
#secAsk .sa-card:hover{transform:translateY(-3px)}
body[data-theme="night"] #secAsk .sa-card{background:linear-gradient(180deg,#342a4c,#2c2341 62%,#241c36);color:#ece6f6;box-shadow:inset 0 2px 0 rgba(255,255,255,.12),inset -2px 0 0 #140e1c,inset 0 -3px 0 #140e1c,0 0 0 1px rgba(0,0,0,.4),0 22px 40px -14px rgba(0,0,0,.6)}
#secAsk .eye{font:700 10.5px/1 inherit;letter-spacing:.12em;text-transform:uppercase;opacity:.65;text-align:center}
#secAsk h2{font:700 22px/1.2 "Iowan Old Style","Palatino Linotype",Palatino,Georgia,serif;text-align:center;margin:0}
#secAsk p{margin:0;font-size:13.5px;opacity:.82;text-align:center}
#secAsk .sa-keys{display:flex;justify-content:flex-end;gap:10px;margin-top:6px}
#secAsk .sc-key.quiet{background:none;box-shadow:none;color:#6a3fb5} body[data-theme="night"] #secAsk .sc-key.quiet{color:#c9b8ee}
#secAsk .sc-key.quiet:hover{box-shadow:var(--sc-ck,0 2px 0 rgba(40,22,68,.25))}
/* Offline only's note */
#secNet{position:fixed;left:50%;bottom:22px;transform:translateX(-50%);z-index:2147481000;max-width:min(560px,calc(100vw - 32px));background:var(--card,#fff);color:var(--ink-1,#221a2e);border:1px solid var(--hairline,rgba(34,26,46,.1));border-radius:14px;padding:11px 13px;box-shadow:0 2px 0 rgba(40,22,68,.08),0 12px 28px rgba(40,22,68,.18);display:flex;gap:10px;align-items:center;flex-wrap:wrap;font:13px/1.45 var(--sans,system-ui);animation:scRise .3s cubic-bezier(.2,.9,.25,1.2) backwards}
#secNet[hidden]{display:none} #secNet span{flex:1 1 220px;min-width:0}
#secNet button{font:600 12.5px/1.3 var(--sans,system-ui);padding:6px 11px;border-radius:7px;border:1px solid rgba(106,63,181,.14);background:rgba(106,63,181,.14);color:#6a3fb5;cursor:pointer;transition:transform .16s cubic-bezier(.34,1.35,.64,1)}
#secNet button:hover{transform:translateY(-2px)}
body[data-theme="night"] #secNet{background:#201a2b;color:#f3eefb;border-color:rgba(205,184,240,.11)} body[data-theme="night"] #secNet button{background:rgba(183,156,230,.15);border-color:rgba(183,156,230,.15);color:#b79ce6}
body[data-motion="minimal"] #secCard *,body[data-motion="minimal"] #secAsk *,body[data-motion="minimal"] #secNet{animation:none !important;transition:none !important}
body[data-motion="minimal"] #secCard *:hover{transform:none !important}
@media (prefers-reduced-motion:reduce){#secCard *,#secAsk *,#secNet{animation:none !important;transition:none !important}#secCard *:hover{transform:none !important}}
</style>
<script>try{(window.__ingParts=window.__ingParts||{})["p318"]="started";}catch(_){}
/* R318 · Security, a room in Settings: see the note at the top of its styles. window.IngSecurity */
(function(){
"use strict";
var W=window,D=document;if(W.IngSecurity)return;
var LS="ing.security.v1",ASKED="ing.security.asked.v1",FAILS="ing.security.fails.v1";
function $(id){return D.getElementById(id);}
function mk(t,c,h){var e=D.createElement(t);if(c)e.className=c;if(h!=null)e.innerHTML=h;return e;}
function esc(s){return String(s==null?"":s).replace(/[&<>"']/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c];});}
function lsGet(k,d){try{var v=localStorage.getItem(k);return v==null?d:JSON.parse(v);}catch(e){return d;}}
function lsPut(k,v){try{localStorage.setItem(k,JSON.stringify(v));}catch(e){}}
function toast(m){try{if(typeof W.ingToast==="function")W.ingToast(m);else if(typeof W.toast==="function")W.toast(m);}catch(e){}}
/* her choices: on this device, beside the lock's own record (they must be read before the desk opens) */
var DEF={offline:false,sleep:true,slow:true,clip:true,log:true,export:false};   /* 7.51: Ask before each export, off until she turns it on (as the preview shows it) */
function cfg(){var c=lsGet(LS,{});var o={};for(var k in DEF)o[k]=(k in c)?!!c[k]:DEF[k];o.allow=c.allow&&typeof c.allow==="object"?c.allow:{};return o;}
function setCfg(k,v){var c=lsGet(LS,{});c[k]=v;lsPut(LS,c);}
function L(){return W.IngLock||null;}
function lockOn(){try{return !!(L()&&L().active()&&L().on());}catch(e){return false;}}
function lockActive(){try{return !!(L()&&L().active());}catch(e){return false;}}
function rec(){try{return JSON.parse(localStorage.getItem("ingenium_lock")||"null");}catch(e){return null;}}
function edition(){try{return typeof ING_EDITION==="string"?ING_EDITION:"master";}catch(e){return "master";}}
function devName(){try{var me=W.IngLend&&IngLend.state().me;if(me&&me.name)return me.name;}catch(e){}return /Mac/.test(navigator.platform)?"this Mac":/Win/.test(navigator.platform)?"this PC":/iPhone|iPad/.test(navigator.userAgent)?"this iPhone or iPad":/Android/.test(navigator.userAgent)?"this tablet":"this device";}

/* ================= 1. Offline only: the page's ways out ================= */
var NET={blocked:0,last:null};
function hostOf(u){try{return new URL(String(u),location.href);}catch(e){return null;}}
function local(url){if(!url)return true;var h=url.hostname;if(url.origin===location.origin)return true;if(url.protocol==="data:"||url.protocol==="blob:")return true;
  if(h==="localhost"||h==="127.0.0.1"||h==="[::1]"||h==="::1"||/\.local$/i.test(h))return true;
  var m=/^(\d+)\.(\d+)\.\d+\.\d+$/.exec(h);if(m){var a=+m[1],b=+m[2];if(a===10||a===127||(a===192&&b===168)||(a===172&&b>=16&&b<=31)||(a===169&&b===254))return true;}return false;}
function allowed(url){var c=cfg();if(!c.offline||local(url))return true;var until=c.allow[url.hostname];return !!(until&&until>Date.now());}
function allow(host,ms){var c=lsGet(LS,{});c.allow=c.allow||{};c.allow[host]=Date.now()+ms;lsPut(LS,c);}
function refuse(url){NET.blocked++;NET.last=url.hostname;note(url.hostname);var e=new Error("Offline only is on: Ingenium did not reach "+url.hostname+". Allow it in the note below, or in Settings, Security.");e.offline=true;return e;}
function note(host){var n=$("secNet");if(!n){n=mk("div");n.id="secNet";n.setAttribute("role","status");D.body.appendChild(n);}
  n.innerHTML="";n.appendChild(mk("span",null,"Offline only held back a request to <b>"+esc(host)+"</b>."));
  var a=mk("button",null,"Allow for an hour");a.type="button";a.onclick=function(){allow(host,3600000);n.hidden=true;toast(host+" may be reached for an hour. Try again.");};
  var o=mk("button",null,"Allow once");o.type="button";o.onclick=function(){allow(host,120000);n.hidden=true;toast(host+" may be reached for two minutes. Try again.");};
  var x=mk("button",null,"Keep it offline");x.type="button";x.onclick=function(){n.hidden=true;};n.appendChild(a);n.appendChild(o);n.appendChild(x);n.hidden=false;
  clearTimeout(note.t);note.t=setTimeout(function(){n.hidden=true;},20000);}
function guardNet(){
  if(W.fetch&&!W.fetch.__r318){var of=W.fetch;var nf=function(input,init){var u=hostOf(typeof input==="string"?input:(input&&input.url)||"");if(u&&!allowed(u))return Promise.reject(refuse(u));return of.apply(this,arguments);};nf.__r318=1;W.fetch=nf;}
  if(W.XMLHttpRequest&&!XMLHttpRequest.prototype.open.__r318){var oo=XMLHttpRequest.prototype.open;var no=function(m,u){var x=hostOf(u);if(x&&!allowed(x))throw refuse(x);return oo.apply(this,arguments);};no.__r318=1;XMLHttpRequest.prototype.open=no;}
  if(W.WebSocket&&!W.WebSocket.__r318){var OW=W.WebSocket;var NW=function(u,p){var x=hostOf(String(u).replace(/^ws/,"http"));if(x&&!allowed(x))throw refuse(x);return p===undefined?new OW(u):new OW(u,p);};NW.prototype=OW.prototype;NW.__r318=1;["CONNECTING","OPEN","CLOSING","CLOSED"].forEach(function(k){NW[k]=OW[k];});W.WebSocket=NW;}
  if(W.EventSource&&!W.EventSource.__r318){var OE=W.EventSource;var NE=function(u,o){var x=hostOf(u);if(x&&!allowed(x))throw refuse(x);return new OE(u,o);};NE.prototype=OE.prototype;NE.__r318=1;W.EventSource=NE;}
  /* Ingenium's own way out on the computer apps (through the app, not the browser) */
  if(typeof W.netFetch==="function"&&!W.netFetch.__r318){var on=W.netFetch;var nn=function(url,o){var x=hostOf(url);if(x&&!allowed(x))return Promise.reject(refuse(x));return on.apply(this,arguments);};nn.__r318=1;W.netFetch=nn;}}

/* ================= 2. Lock when the computer sleeps: a pause in time ================= */
var TICK={last:Date.now(),slept:0};
function tick(gap){var now=Date.now();var g=gap!=null?gap:now-TICK.last;TICK.last=now;
  if(g>90000&&cfg().sleep&&lockOn()){TICK.slept++;addLog("locked after sleep");try{L().lockNow("idle");}catch(e){}}}

/* ================= 3. Slow down wrong passwords ================= */
function fails(){return lsGet(FAILS,{n:0,until:0,at:[]});}
function waitFor(n){return n<3?0:Math.min(300000,1000*Math.pow(2,n-2));}
function guardDoor(){D.addEventListener("submit",function(e){var f=e.target;if(!f||!f.closest||!f.closest("#ingLockDoor"))return;if(!f.querySelector("#ildPw")||!cfg().slow)return;
    var s=fails(),now=Date.now();if(s.until>now){e.preventDefault();e.stopImmediatePropagation();var err=f.querySelector(".ild-err")||f.parentNode.querySelector(".ild-err");var secs=Math.ceil((s.until-now)/1000);
      var msg="Wait "+secs+" second"+(secs===1?"":"s")+" before the next try: after three wrong passwords each try waits a little longer. Nothing is wiped.";
      if(!err){err=D.createElement("p");err.className="ild-err";err.setAttribute("role","alert");f.parentNode.insertBefore(err,f);}err.textContent=msg;err.hidden=false;return;}
    /* the answer: a wrong password shows the door's error; the right one opens the page */
    var before=(D.querySelector("#ingLockDoor .ild-err")||{}).textContent||"";
    setTimeout(function(){var d=$("ingLockDoor"),er=d&&d.querySelector(".ild-err");var shown=er&&!er.hidden&&er.offsetParent!==null&&/not right|wrong|incorrect|does not open/i.test(er.textContent||"");
      if(lockOn()){lsPut(FAILS,{n:0,until:0,at:[]});return;}
      if(shown){var s2=fails();s2.n++;s2.at=(s2.at||[]).concat([Date.now()]).slice(-50);s2.until=Date.now()+waitFor(s2.n);lsPut(FAILS,s2);}},1500);},true);}

/* ================= 4. Clear a copied secret ================= */
var CLIP={cleared:0,pending:0,wait:60000};
function secretSel(){try{var s=getSelection();var n=s&&s.anchorNode;var el=n&&(n.nodeType===1?n:n.parentElement);var a=D.activeElement;
  var inSecret=function(x){return !!(x&&x.closest&&x.closest("#ingLockDoor,#ingLockCard,.ild-words,.ld-code,[data-secret],input[type=password]"));};
  return inSecret(el)||inSecret(a);}catch(e){return false;}}
function guardClip(){D.addEventListener("copy",function(){if(!cfg().clip||!secretSel())return;CLIP.pending++;setTimeout(function(){CLIP.pending--;
    try{if(navigator.clipboard&&navigator.clipboard.writeText)navigator.clipboard.writeText("").then(function(){CLIP.cleared++;},function(){});}catch(e){}},CLIP.wait);},true);}

/* ================= 5. A record of every opening (in the desk: sealed with it) ================= */
var PEND=[];
function addLog(kind,at){var item={at:at||Date.now(),kind:kind,device:devName()};if(!cfg().log)return;
  if(lockActive()&&!lockOn()){PEND.push(item);return;}
  try{if(!W.state)return;var lg=state.secLog=Array.isArray(state.secLog)?state.secLog:[];lg.push(item);if(lg.length>200)lg.splice(0,lg.length-200);if(typeof W.saveState==="function")saveState();}catch(e){}}
function flushLog(){if(!PEND.length||(lockActive()&&!lockOn()))return;var p=PEND.splice(0);
  var f=fails();(f.at||[]).forEach(function(t){p.push({at:t,kind:"wrong password",device:devName()});});
  try{var lg=state.secLog=Array.isArray(state.secLog)?state.secLog:[];p.sort(function(a,b){return a.at-b.at;}).forEach(function(x){lg.push(x);});if(lg.length>200)lg.splice(0,lg.length-200);if(typeof W.saveState==="function")saveState();}catch(e){}}

/* ================= 6. the room's card ================= */
var ICON={lock:'<rect x="5" y="10.5" width="14" height="10" rx="2.5"/><path d="M8 10.5V8a4 4 0 0 1 8 0v2.5"/>',disk:'<rect x="3.5" y="5" width="17" height="14" rx="2.5"/><path d="M7 15h.01M10 15h7"/>',
  wifi:'<path d="M2.5 9a14 14 0 0 1 19 0M5.5 12.5a9.5 9.5 0 0 1 13 0M8.8 16a5 5 0 0 1 6.4 0"/><circle cx="12" cy="19.2" r="1.2"/>',code:'<path d="M8.5 8L4.5 12l4 4M15.5 8l4 4-4 4M13.5 5.5l-3 13"/>',
  self:'<path d="M12 2.8l7.5 3v5.6c0 4.6-3.2 8.4-7.5 9.8-4.3-1.4-7.5-5.2-7.5-9.8V5.8z"/><path d="M8.8 12.2l2.2 2.2 4.4-4.6"/>',more:'<path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1"/><circle cx="12" cy="12" r="3.2"/>'};
var NEXT="7.40";
/* 7.36: the room says only what this copy has: Fabrica and Vocatio are not in the gift and demo editions, and Ingenium itself is the
   owner's own build only in the master edition (rig/t_627_editions) */
function hasPg(id){return !!D.getElementById("page-"+id);}
function mine(){return edition()==="master";}
function items(){var c=cfg(),on=lockOn();
  return [{k:"device",t:"Sealed on this device",s:on?"on":"off"},{k:"device",t:"Backups sealed whole",s:on?"on":"off"},
    {k:"disk",t:"Sealed on the computer's disk",s:W.IngDiskSeal?IngDiskSeal.state():"soon"},{k:"wifi",t:"Sealed between your devices",s:W.IngSealing?IngSealing.state():"soon"},
    ].concat(hasPg("fabrica")?[{k:"code",t:"Your apps' sources sealed in Fabrica",s:on?"on":"off"}]:[],[{k:"code",t:"Your apps signed when shipped",s:W.IngAppSign?IngAppSign.state():"soon"},{k:"code",t:"Your apps' code scrambled",s:"soon"},
    {k:"self",t:"Ingenium itself, signed and checked",s:W.IngSelfSign?IngSelfSign.state():"soon"},
    {k:"more",t:"Offline only",s:c.offline?"on":"off"},{k:"more",t:"Lock when the computer sleeps",s:c.sleep&&on?"on":"off"},{k:"more",t:"Slow down wrong passwords",s:c.slow&&lockActive()?"on":"off"},
    {k:"more",t:"Clear a copied secret",s:c.clip?"on":"off"},{k:"more",t:"A record of every opening",s:c.log?"on":"off"},
    {k:"more",t:"Ask before each export",s:c.export&&lockActive()?"on":"off"}]);}
function chip(s){return s==="on"?'<span class="sc-chip ok">On</span>':s==="off"?'<span class="sc-chip off">Off</span>':'<span class="sc-chip soon">Not yet</span>';}
var VIEW="all";
function card(){var c=$("secCard");if(c)return c;var host=$("ingLockCard");var page=$("page-settings");if(!page)return null;
  c=mk("div","card");c.id="secCard";c.innerHTML='<h2 class="sec">Security</h2><div class="sc-body"></div>';
  if(host&&host.parentNode)host.parentNode.insertBefore(c,host.nextSibling);else page.appendChild(c);return c;}
function paint(){var c=card();if(!c)return;var b=c.querySelector(".sc-body");if(!b)return;var it=items(),nOn=it.filter(function(x){return x.s==="on";}).length,nSoon=it.filter(function(x){return x.s==="soon";}).length;
  var subs=[["all","Everything"],["device","This device"],["disk","The computer's disk"],["wifi","Between your devices"],["code","Your code and apps"],["self","Ingenium itself"],["more","More protection"]];
  var h='<div class="sc-subs" role="tablist">'+subs.map(function(s){return '<button type="button" class="sc-sub" role="tab" data-v="'+s[0]+'" aria-selected="'+(VIEW===s[0])+'">'+esc(s[1])+'</button>';}).join("")+'</div>';
  if(VIEW==="all"){h+='<div class="sc-over"><div class="sc-shield" aria-hidden="true"><svg viewBox="0 0 120 136"><defs><linearGradient id="scg" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#8a62d6"/><stop offset=".55" stop-color="#5d37a1"/><stop offset="1" stop-color="#3a2070"/></linearGradient><linearGradient id="sch" x1="0" x2="1" y1="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".55"/><stop offset=".45" stop-color="#fff" stop-opacity="0"/></linearGradient></defs><path d="M60 4l50 18v38c0 32-21 58-50 72C31 118 10 92 10 60V22z" fill="url(#scg)"/><path d="M60 4l50 18v38c0 32-21 58-50 72z" fill="#000" opacity=".16"/><path d="M60 4l50 18v18C80 36 40 50 10 40V22z" fill="url(#sch)"/><path d="M42 66l13 13 25-27" fill="none" stroke="#fff" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/></svg></div>'
      +'<div><div class="sc-big">'+nOn+' of '+(it.length-nSoon)+' protections on</div><div class="sc-bars">'+it.map(function(x){return '<i class="'+(x.s==="on"?"on":x.s==="soon"?"soon":"")+'" title="'+esc(x.t)+'"></i>';}).join("")+'</div>'
      +'<p class="sc-fine">'+(lockOn()?"":"Your sign-in is off: turn it on, and most of the rest turns on with it. ")+nSoon+' more come in the next releases; each says Not yet until it is here.</p>'+(W.IngTerms?'<div class="sc-keys"><button type="button" class="sc-key lav" data-a="privacy">Read the Privacy notice</button></div>':'')+'</div></div>'
      +'<div class="sc-list">'+it.map(function(x){return '<button type="button" class="sc-it" data-go="'+x.k+'"><i class="sc-dot'+(x.s==="on"?"":x.s==="soon"?" soon":" off")+'"></i><span>'+esc(x.t)+'</span>'+chip(x.s)+'</button>';}).join("")+'</div>'
      +'<div class="sc-keys" style="margin-top:12px">'+(lockOn()?'<button type="button" class="sc-key pri" data-a="lock">Lock now</button>':'<button type="button" class="sc-key pri" data-a="protect">Protect this copy</button>')+'<button type="button" class="sc-key lav" data-a="check">Check everything</button></div>';}
  var P=function(k,ic,t,sub,st,body){return '<section class="sc-p" data-k="'+k+'" aria-expanded="'+(VIEW!=="all"?"true":"false")+'"><button type="button" class="sc-ph"><span class="ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">'+ICON[ic]+'</svg></span><span class="tx"><b>'+esc(t)+'</b><small>'+esc(sub)+'</small></span>'+st+'<span class="chev">›</span></button><div class="sc-pb"'+(VIEW!=="all"?"":" hidden")+'>'+body+'</div></section>';};
  var r=rec()||{},ways=[];if(lockActive()){ways.push("your password","your ten recovery words");if(r.file)ways.push("a recovery key file");if(r.dev)ways.push(/Mac/.test(navigator.platform)?"Touch ID on this Mac":"this computer's own sign-in");}
  var sections=[];
  sections.push(P("device","lock","Sealed on this device","Your sign-in, and everything you make, sealed with your password",chip(lockOn()?"on":"off"),
    '<div class="sc-well"><div class="sc-wh"><b>What is sealed</b><span class="sc-chip soon">AES-GCM, 256-bit</span></div><div class="sc-tags">'+["Chats","Notes","Memory","Settings","Projects","Code","Fabrica's apps and versions","Packages","App library","Documents","Career","Signing keys","Your GitHub sign-in","Backups, sealed whole"].filter(function(x){return (x!=="Fabrica's apps and versions"||hasPg("fabrica"))&&(x!=="Career"||hasPg("career"))&&(x!=="Code"||hasPg("code"));}).map(function(x){return '<span class="sc-chip">'+esc(x)+'</span>';}).join("")+'</div>'
    +'<p>'+(lockOn()?"On. Opened only while you are signed in; the key lives in memory, never on the disk.":lockActive()?"Locked now: it opens with your password.":"Off: what Ingenium keeps on this device is plain, as it always was. Turned on, it is sealed, and the page opens to a sign-in.")+'</p>'
    +'<div class="sc-keys">'+(lockOn()?'<button type="button" class="sc-key pri" data-a="lock">Lock now</button>':'<button type="button" class="sc-key pri" data-a="protect">Protect this copy</button>')+'<button type="button" class="sc-key lav" data-a="open">Your sign-in and its ways back in</button></div></div>'
    +'<div class="sc-well"><div class="sc-wh"><b>Your ways back in</b><span class="sc-chip '+(ways.length?"ok":"soon")+'">'+(ways.length?ways.length+" set":"None yet")+'</span></div><p>'+(ways.length?esc(ways.join(", ").replace(/, ([^,]*)$/," and $1"))+".":"Set with your sign-in: your password, ten recovery words, and on a computer its own sign-in (Touch ID or Windows Hello).")+'</p></div>'
    +'<div class="sc-well"><div class="sc-wh"><b>At first start</b><span class="sc-chip ok">On</span></div><p>Every new copy asks you to protect it, after the welcome and the tour. A demonstration copy does not ask.</p></div>'));
  sections.push(P("disk","disk","Sealed on the computer's disk","What the computer apps keep in files of their own",chip(W.IngDiskSeal?IngDiskSeal.state():"soon"),W.IngDiskSeal?IngDiskSeal.describe(hasPg("fabrica")):(
    '<p>'+(hasPg("fabrica")?"Fabrica\'s runs and their logs, apps waiting for your devices, Fabrica apps kept on a drive and texts for training":"Texts for training")+': sealed with the same password, opened only in the computer app\'s memory while you are signed in. Planned for '+NEXT+': the computer apps need an encryption library they do not carry yet.</p><p class="sc-fine">Kept readable on purpose, then too: an app you serve for the Home Screen (Safari has to read it), and your model files.</p>')));
  sections.push(P("wifi","wifi","Sealed between your devices","Every message on your Wi-Fi, sealed end to end",chip(W.IngSealing?IngSealing.state():"soon"),W.IngSealing?(IngSealing.describe().map(function(t){return "<p>"+esc(t)+"</p>";}).join("")+'<p class="sc-fine">Sealed with AES-GCM (256-bit), under a key the two devices agreed on (ECDH P-256) and never sent; the four words show that no one in between swapped the keys. Not sealed yet: a computer calling in to another (call-ins), which still uses the code.</p>'):
    '<p>When two of your devices pair, they will agree on a key of their own, and every message between them ('+(hasPg("fabrica")?"models lent, apps sent, runs and logs":"models lent and borrowed")+') is sealed with it. Planned for '+NEXT+'; until then the pairing code alone guards them, as before, and a device paired before then pairs once more.</p>'));
  var FB=hasPg("fabrica");
  sections.push(P("code","code","Your code and apps",FB?"What Fabrica ships, and your sources in it":"What you make and ship",FB?chip(lockOn()?"on":"off"):chip("soon"),
    (FB?'<div class="sc-well"><div class="sc-wh"><b>Sources sealed in Fabrica</b>'+chip(lockOn()?"on":"off")+'</div><p>Every app\'s files and versions, sealed with your password whenever your sign-in is on.</p></div>':"")
    +(FB&&W.IngAppSign?IngAppSign.well(chip):'<div class="sc-well"><div class="sc-wh"><b>Signed with your key</b>'+chip("soon")+'</div><p>'+(FB?'Already: your Android and Fire packages are signed with your Android key (Fabrica, Ship), as Android requires, and an iPhone or iPad app with your Apple ID, through Sideloadly. ':"")+'Not yet: your owner key\'s signature on every package, the computer ones too, so a changed file is caught and the app refuses to open and says so.</p></div>')
    +'<div class="sc-well"><div class="sc-wh"><b>Scrambled code</b>'+chip("soon")+'</div><p>The shipped code shrunk and its names scrambled: much slower to read or copy, never impossible. Your sources stay as you wrote them.</p></div>'
    +'<div class="sc-well"><div class="sc-wh"><b>Opens only with your owner key</b>'+chip("soon")+'</div><p>For an app meant for you alone: it opens only on a device that holds your owner key.</p></div>'));
  sections.push(P("self","self","Ingenium itself, signed and checked",mine()?"The copy you run is the one you built":"The copy you run is the one its maker released",chip(W.IngSelfSign?IngSelfSign.state():"soon"),
    W.IngSelfSign?IngSelfSign.describe(mine()):('<p>'+(mine()?'Already: Ingenium\'s Fire app is signed with your Android key, so the tablet refuses an update signed with any other. Not yet: each release signed with your owner key,':'Already: Ingenium\'s Fire app is signed by its maker, so the tablet refuses an update signed with any other key. Not yet: each release signed with its maker\'s key,')+' and checked by the computer apps and the iPhone, iPad and Fire apps before Ingenium opens: a copy changed by anyone else refuses to open, and says which file changed. Planned after the sealing above.</p>')));
  var lg=(W.state&&Array.isArray(state.secLog))?state.secLog.slice(-8).reverse():[];
  sections.push(P("more","more","More protection","For a workspace that is truly your own",'<span class="sc-chip ok">'+it.filter(function(x){return x.k==="more"&&x.s==="on";}).length+' on</span>',
    sw("offline","Offline only","Nothing leaves this page but what goes to this device and your home network. Anything else waits, with Allow for an hour and Allow once. The computer apps' own downloads (models you choose to get) follow it from a later release.",cv("offline"))
    +sw("sleep","Lock when the computer sleeps or the lid closes","Besides the lock after time away. Needs your sign-in.",cv("sleep"),!lockActive())
    +sw("slow","Slow down wrong passwords","After three wrong tries, each waits longer before the next (2, 4, 8 seconds, up to five minutes). Nothing is ever wiped.",cv("slow"))
    +sw("clip","Clear a copied secret","A password, a recovery word or a pairing code copied from Ingenium is cleared from the clipboard after a minute, where the browser lets a page do it.",cv("clip"))
    +sw("log","A record of every opening","When and on which device Ingenium opened, and every wrong password, kept with your desk (so sealed with it).",cv("log"))
    +'<div class="sc-well"><div class="sc-wh"><b>Openings lately</b><span class="sc-chip">'+lg.length+'</span></div><div class="sc-log">'+(lg.length?lg.map(function(x){return '<span>'+esc(new Date(x.at).toLocaleString())+' · '+esc(x.kind)+' · '+esc(x.device||"")+'</span>';}).join(""):'<span>None kept yet.</span>')+'</div></div>'
    +sw("export","Ask before each export","A plain copy (a backup without its seal, a plain export of an app, any file saved out of Ingenium unsealed) asks for your password first. Needs your sign-in.",cv("export")&&lockActive(),!lockActive())));
  function cv(k){return cfg()[k];}
  function sw(k,t,s,on,dis){return '<button type="button" class="sw2" role="switch" data-sw="'+k+'" aria-checked="'+(!!on)+'"'+(dis?" disabled":"")+'><span class="t"><b>'+esc(t)+'</b><small>'+esc(s)+'</small></span><span class="tr"></span></button>';}
  var show=VIEW==="all"?sections:sections.filter(function(x){return x.indexOf('data-k="'+VIEW+'"')>=0;});
  h+=show.join("");
  h+='<section class="sc-p sc-limits" aria-expanded="true" style="padding:12px 14px"><b style="font:600 15px/1.35 var(--serif,Georgia,serif);color:var(--ink-1,#221a2e)">What no lock can do</b><ul style="margin-top:6px"><li>Someone who knows your password, or holds your recovery words, can open everything: keep them apart from the device.</li><li>A computer already taken over by a harmful program can read what you see on the screen while you work.</li><li>Code shipped to other people can always be read by someone determined; scrambling makes it slow, signing makes changes show.</li><li>Lose the password, the words and every other way back in, and the sealed data cannot be opened by anyone.</li></ul></section>';
  b.innerHTML=h;wire(b);}
function wire(b){[].forEach.call(b.querySelectorAll(".sc-sub"),function(t){t.onclick=function(){VIEW=t.getAttribute("data-v");paint();};});
  [].forEach.call(b.querySelectorAll(".sc-it"),function(t){t.onclick=function(){VIEW=t.getAttribute("data-go");paint();};});
  [].forEach.call(b.querySelectorAll(".sc-p:not(.sc-limits)"),function(p){var h=p.querySelector(".sc-ph"),bd=p.querySelector(".sc-pb");if(h&&bd)h.onclick=function(){var on=p.getAttribute("aria-expanded")!=="true";p.setAttribute("aria-expanded",String(on));bd.hidden=!on;};});
  [].forEach.call(b.querySelectorAll(".sw2"),function(s){s.onclick=function(){if(s.disabled)return;var k=s.getAttribute("data-sw"),v=s.getAttribute("aria-checked")!=="true";
    /* 7.51: turning Ask before each export off is itself asked with the password, or anyone at the open page could undo it */
    if(k==="export"&&!v&&lockActive()&&L()&&typeof L().confirm==="function"){L().confirm("Stop asking before each export","Your password first: without the question, anyone at this open page could save your work out of Ingenium unsealed.","Stop asking").then(function(ok){if(ok){setCfg(k,false);toast("Ingenium no longer asks before an export.");}paint();});return;}
    setCfg(k,v);if(k==="export"&&v)toast("Each plain export now asks for your password first.");
    if(k==="offline")toast(v?"Offline only is on: this page reaches only this device and your home network.":"Offline only is off.");paint();};});
  [].forEach.call(b.querySelectorAll("[data-a]"),function(k){k.onclick=function(){act(k.getAttribute("data-a"));};});}
function openLock(){try{W.go("settings");}catch(e){}try{if(W.IngRooms)IngRooms.open("settings","data",true);}catch(e){}try{if(W.IngSettingsParts)IngSettingsParts.show("data","lock");}catch(e){}
  setTimeout(function(){var c=$("ingLockCard");if(c)try{c.scrollIntoView({block:"center",behavior:"smooth"});}catch(e){}},300);}
function protect(){openLock();setTimeout(function(){var k=[].filter.call(D.querySelectorAll("#ingLockCard button"),function(b){return /Protect this copy/.test(b.textContent);})[0];if(k)k.click();},500);}
function act(a){if(a==="lock"){try{L().lockNow("press");}catch(e){}return;}if(a==="protect"){protect();return;}if(a==="open"){openLock();return;}if(a==="privacy"){try{W.IngTerms.show("privacy");}catch(e){}return;}
  if(a==="check"){var it=items(),on=it.filter(function(x){return x.s==="on";}).length,off=it.filter(function(x){return x.s==="off";}).map(function(x){return x.t;});
    toast(on+" protections on"+(off.length?"; off: "+off.join(", ")+".":", none off.")+" "+it.filter(function(x){return x.s==="soon";}).length+" come in the next releases.");}}

/* ================= 7. the first start's ask ================= */
function asking(){if(lsGet(ASKED,false)||lockActive())return false;if(edition()==="demo")return false;if(navigator.webdriver&&!W.__ingSecAsk)return false;return true;}
function ask(){if(!asking()||$("secAsk"))return false;var w=mk("div");w.id="secAsk";w.setAttribute("role","dialog");w.setAttribute("aria-modal","true");w.setAttribute("aria-labelledby","secAskH");
  w.innerHTML='<div class="sa-card"><div class="eye">At first start</div><h2 id="secAskH">Protect your work first</h2><p>Ingenium can seal everything you make with your password, on this device. You choose a password and ten recovery words; it opens to a sign-in from then on.</p><div class="sa-keys"><button type="button" class="sc-key quiet" id="secAskNo">Not now</button><button type="button" class="sc-key pri" id="secAskYes">Protect it</button></div></div>';
  D.body.appendChild(w);lsPut(ASKED,true);
  $("secAskNo").onclick=function(){w.remove();toast("Not now. Settings, Security asks again whenever you like.");};
  $("secAskYes").onclick=function(){w.remove();protect();};setTimeout(function(){try{$("secAskYes").focus();}catch(e){}},60);return true;}
function whenFree(){var n=0;(function look(){if(n++>600)return;var busy=D.body.classList.contains("intro-open")||D.body.classList.contains("touring")||!!(D.querySelector("#ingLockDoor")&&!$("ingLockDoor").hidden)||W.__ingReady!==true;
  if(busy){setTimeout(look,2000);return;}setTimeout(ask,1200);})();}

/* ================= start ================= */
function boot(){guardNet();guardDoor();guardClip();setInterval(function(){tick();},10000);
  var n=0;(function wait(){if(W.__ingReady===true){addLog(lockActive()?"opened, locked":"opened");if(lockActive()&&!lockOn()){var t=setInterval(function(){if(lockOn()){clearInterval(t);addLog("signed in");flushLog();lsPut(FAILS,{n:0,until:0,at:[]});}},1500);}
      card();paint();whenFree();
      try{var og=W.go;if(typeof og==="function"&&!og.__r318){var g=function(p){var r=og.apply(this,arguments);try{if(p==="settings")paint();}catch(e){}return r;};Object.keys(og).forEach(function(k){g[k]=og[k];});g.__r318=1;W.go=g;}}catch(e){}
      guardNet();return;}if(++n<600)setTimeout(wait,500);})();}
if(D.readyState==="loading")D.addEventListener("DOMContentLoaded",boot);else boot();
W.IngSecurity={cfg:cfg,set:function(k,v){setCfg(k,v);paint();},items:items,paint:paint,ask:function(){W.__ingSecAsk=true;lsPut(ASKED,false);return ask();},
  net:NET,allowed:function(u){var x=hostOf(u);return !x||allowed(x);},allow:allow,tick:tick,slept:function(){return TICK.slept;},fails:fails,clip:CLIP,log:function(){return (W.state&&state.secLog)||[];},view:function(v){if(v){VIEW=v;paint();}return VIEW;}};
try{window.__ingParts["p318"]="running";}catch(_){}
})();
</script>
