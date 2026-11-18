<style id="r329-css">
/* ============ R329 · TROUBLESHOOT, THE AUTHOR STUDIO'S FIRST ROOM (Ingenium 7.42, 18 November 2026; the master edition only) ============
   Her words (18 November 2026): troubleshooting, diagnostics, finding and fixing bugs and full authorship in the Author Studio, her master
   copy only. Her approval of the live preview (https://claude.ai/artifact/Fw3N7GZMX2JE1ShEjWi7Cn, source/previews/troubleshoot): "I approve
   of everything from the Author Studio except for the the white acrylic button look of the navigation bar, please fix it".
   - Troubleshoot, first in the studio's rail (r236): Check everything (r226's own check, run as before, and the checks added here: the
     graphics mode Adamas chose (r292), at rest (r324), who serves your models (r328), sealed between your devices (r319), the model
     settings record (r249), this device's memory), with an analogue gauge for the whole result; the checks in four groups, each line
     unfolding to say why and what to do, with a key to ask a model about that line alone (r226's fix, Ingenium's own page in Code, the
     message ready for her to read); what went wrong (r226's error list, newest first, each with Ask a model to fix and Copy); say it in
     your own words (her words, with what she ticks: the report, the last ten errors, this device, the model settings record).
   - Checks and additions becomes Additions: Check Ingenium and the errors are in Troubleshoot now (the same r226, not a copy).
   - The rail (her change): no white acrylic keys and no purple shade under the pointer. The room she is in sits pressed into the rail,
     an engraved slot in the rail's own tone, its words and icon in the accent; under the pointer a room glides and its icon tilts.
   - Its keys click with Ingenium's own sounds (IngSound "keys"), which her sound settings govern. */
#ingAuthor{--ts-well:rgba(106,63,181,.035);--ts-line:var(--hairline,rgba(34,26,46,.1));--ts-ink1:var(--ink-1,#221a2e);--ts-ink2:var(--ink-2,#4a4358);--ts-ink3:var(--ink-3,#6c6579);--ts-acc:var(--accent,#6a3fb5);
  --ts-card:var(--card-hi,#fff);--ts-card-sh:0 1px 0 rgba(40,22,68,.06),0 2px 6px rgba(40,22,68,.05),0 12px 30px rgba(40,22,68,.07);--ts-card-hi:0 2px 0 rgba(40,22,68,.08),0 8px 16px rgba(40,22,68,.1),0 18px 38px rgba(40,22,68,.12);
  --ts-key:linear-gradient(var(--card-hi,#fff),var(--card-lo,#f9f7fc));--ts-key-sh:inset 0 -1.5px 0 rgba(40,22,68,.13),0 2px 0 rgba(40,22,68,.25),0 4px 5px rgba(40,22,68,.16),0 9px 14px rgba(40,22,68,.1);
  --ts-key-hi:inset 0 -1.5px 0 rgba(40,22,68,.13),0 3px 0 rgba(40,22,68,.25),0 6px 8px rgba(40,22,68,.18),0 13px 20px rgba(40,22,68,.12);
  --ts-pri:linear-gradient(#7348be,#5d37a1);--ts-pri-line:#4b2a86;--ts-pri-sh:inset 0 1px 0 rgba(255,255,255,.24),0 1px 0 #3a2070,0 3px 6px rgba(52,24,100,.26);
  --ts-ok-t:rgba(31,157,99,.14);--ts-ok-c:#1a7f50;--ts-look-t:rgba(232,144,42,.16);--ts-look-c:#b4600f;--ts-bad-t:rgba(196,60,72,.13);--ts-bad-c:#a8323e;--ts-lav-t:rgba(106,63,181,.12);
  --ts-rim:#d9d0e6;--ts-needle:#3a2a55;
  --ts-slot:rgba(60,40,90,.06);--ts-slot-sh:inset 0 1px 2px rgba(40,22,68,.18),inset 0 0 0 1px rgba(40,22,68,.05),0 1px 0 rgba(255,255,255,.85)}
body[data-theme="night"] #ingAuthor{--ts-well:rgba(183,156,230,.05);--ts-line:rgba(205,184,240,.12);--ts-ink1:#f6f1fd;--ts-ink2:#d3c9e3;--ts-ink3:#a99cc1;--ts-acc:#b79ce6;--ts-card:#201a2b;
  --ts-card-sh:0 1px 0 rgba(0,0,0,.4),0 2px 6px rgba(0,0,0,.3),0 12px 30px rgba(0,0,0,.34);--ts-card-hi:0 2px 0 rgba(0,0,0,.45),0 10px 20px rgba(0,0,0,.42),0 20px 40px rgba(0,0,0,.4);
  --ts-key:linear-gradient(#2a2239,#251e33);--ts-key-sh:inset 0 1px 0 rgba(255,255,255,.07),inset 0 -2px 0 rgba(0,0,0,.45),0 2px 0 rgba(0,0,0,.75),0 4px 5px rgba(0,0,0,.5);
  --ts-key-hi:inset 0 1px 0 rgba(255,255,255,.1),inset 0 -2px 0 rgba(0,0,0,.4),0 3px 0 rgba(0,0,0,.7),0 7px 10px rgba(0,0,0,.5);
  --ts-pri:linear-gradient(#7a56c8,#5b3aa1);--ts-pri-line:#2c1956;--ts-pri-sh:inset 0 1px 0 rgba(255,255,255,.14),0 1px 0 #170b30,0 3px 6px rgba(0,0,0,.45);
  --ts-ok-t:rgba(64,192,128,.15);--ts-ok-c:#6fd8a2;--ts-look-t:rgba(240,176,96,.15);--ts-look-c:#f0b060;--ts-bad-t:rgba(230,110,120,.15);--ts-bad-c:#f0939c;--ts-lav-t:rgba(183,156,230,.15);
  --ts-rim:#3a3050;--ts-needle:#e9e0f7;--ts-slot:rgba(0,0,0,.28);--ts-slot-sh:inset 0 2px 3px rgba(0,0,0,.55),inset 0 0 0 1px rgba(0,0,0,.25),0 1px 0 rgba(255,255,255,.05)}
/* the rail: no white keys, no purple shade under the pointer */
#ingAuthor .au-room{border-radius:11px;transition:transform .3s cubic-bezier(.2,.9,.25,1.2),color .2s,box-shadow .25s}
#ingAuthor .au-room svg{transition:transform .35s cubic-bezier(.34,1.35,.64,1)}
#ingAuthor .au-room:hover{background:transparent;color:var(--ts-ink1);transform:translateX(4px)}
#ingAuthor .au-room:hover svg{transform:rotate(-10deg) scale(1.12)}
#ingAuthor .au-room:active{transform:translateX(4px) translateY(1px)}
#ingAuthor .au-room[aria-selected="true"]{background:var(--ts-slot);box-shadow:var(--ts-slot-sh);color:var(--ts-acc)}
#ingAuthor .au-room[aria-selected="true"]:hover{transform:translateX(2px)}
#ingAuthor .au-room .ts-new{margin-left:auto;font:700 10px/1.5 var(--sans,system-ui);letter-spacing:.04em;padding:1px 7px;border-radius:999px;background:var(--ts-lav-t);color:var(--ts-acc)}
#ingAuthor.au-dock .au-room .ts-new{display:none}
/* Additions: the check and the errors are in Troubleshoot now */
#auChecks .card:has(#wsRes),#auChecks .card:has(#wsErrs){display:none!important}
/* the room */
#tsRoom{display:flex;flex-direction:column;gap:16px;color:var(--ts-ink2)}
#tsRoom button{font:inherit;cursor:pointer}
#tsRoom .ts-key{display:inline-flex;align-items:center;gap:7px;min-height:34px;padding:0 14px;border-radius:10px;border:1px solid var(--ts-line);background:var(--ts-key);box-shadow:var(--ts-key-sh);color:var(--ts-ink1);font-weight:600;font-size:12.8px;white-space:nowrap;
  transition:transform .3s cubic-bezier(.34,1.35,.64,1),box-shadow .2s}
#tsRoom .ts-key:hover{transform:translateY(-2px);box-shadow:var(--ts-key-hi)}
#tsRoom .ts-key:active{transform:translateY(1px);box-shadow:var(--ts-key-sh)}
#tsRoom .ts-key.pri{background:var(--ts-pri);border-color:var(--ts-pri-line);box-shadow:var(--ts-pri-sh),0 4px 10px rgba(52,24,100,.2);color:#fff}
#tsRoom .ts-key.sm{min-height:28px;padding:0 10px;font-size:12px;border-radius:9px}
#tsRoom .ts-key[disabled]{opacity:.6;cursor:default;transform:none}
#tsRoom .ts-key:focus-visible,#tsRoom .ts-row:focus-visible,#tsRoom textarea:focus-visible,#tsRoom .ts-tick:focus-visible{outline:3px solid var(--ts-acc);outline-offset:2px}
#tsRoom .ts-sum{display:grid;grid-template-columns:auto minmax(0,1fr);gap:18px;align-items:center;padding:16px;border-radius:18px;border:1px solid var(--ts-line);background:var(--ts-well);box-shadow:var(--ts-card-sh);transition:transform .35s cubic-bezier(.2,.9,.25,1.2),box-shadow .25s}
#tsRoom .ts-sum:hover{transform:translateY(-2px);box-shadow:var(--ts-card-hi)}
#tsRoom .ts-dial svg{width:150px;height:92px;overflow:visible;display:block}
#tsRoom .ts-dial .face{fill:var(--ts-card);stroke:var(--ts-rim);stroke-width:1.5}
#tsRoom .ts-dial .tk{stroke:var(--ts-ink3);stroke-width:1.2}
#tsRoom .ts-dial .a1{stroke:var(--ts-ok-c)}#tsRoom .ts-dial .a2{stroke:var(--ts-look-c)}#tsRoom .ts-dial .a3{stroke:var(--ts-bad-c)}
#tsRoom .ts-dial .arc{stroke-width:5;fill:none;opacity:.55}
#tsRoom .ts-dial .nd{stroke:var(--ts-needle);stroke-width:2.4;stroke-linecap:round;transform-origin:75px 80px;transition:transform 1.1s cubic-bezier(.3,1.4,.5,1)}
#tsRoom .ts-dial .hub{fill:var(--ts-needle)}
#tsRoom .ts-dial .lab{font:600 9.5px/1 var(--sans,system-ui);fill:var(--ts-ink3);letter-spacing:.05em}
#tsRoom .ts-sum-r{display:flex;flex-direction:column;gap:10px;min-width:0}
#tsRoom .ts-tally,#tsRoom .ts-keys{display:flex;gap:8px;flex-wrap:wrap}
#tsRoom .ts-chip{display:inline-flex;align-items:center;gap:6px;font:600 11.8px/1 var(--sans,system-ui);padding:5px 10px;border-radius:999px;white-space:nowrap}
#tsRoom .ts-chip i{width:7px;height:7px;border-radius:50%;background:currentColor}
#tsRoom .ts-chip.ok{background:var(--ts-ok-t);color:var(--ts-ok-c)}#tsRoom .ts-chip.look{background:var(--ts-look-t);color:var(--ts-look-c)}#tsRoom .ts-chip.bad{background:var(--ts-bad-t);color:var(--ts-bad-c)}#tsRoom .ts-chip.lav{background:var(--ts-lav-t);color:var(--ts-acc)}
#tsRoom .ts-when{font-size:12.4px;color:var(--ts-ink3)}
#tsRoom .ts-sec{font:600 19px/1.2 var(--serif,Georgia,serif);color:var(--ts-ink1);margin:6px 0 0;display:flex;align-items:baseline;gap:10px;flex-wrap:wrap}
#tsRoom .ts-sec small{font:400 12.5px/1.4 var(--sans,system-ui);color:var(--ts-ink3)}
#tsRoom .ts-groups{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:14px}
#tsRoom .ts-grp{border-radius:16px;border:1px solid var(--ts-line);background:var(--ts-card);box-shadow:var(--ts-card-sh);padding:12px;display:flex;flex-direction:column;gap:6px;transition:transform .35s cubic-bezier(.2,.9,.25,1.2),box-shadow .25s}
#tsRoom .ts-grp:hover{transform:translateY(-3px);box-shadow:var(--ts-card-hi)}
#tsRoom .ts-grp h3{margin:0 0 4px;font:600 16px/1.2 var(--serif,Georgia,serif);color:var(--ts-ink1);display:flex;align-items:center;gap:8px}
#tsRoom .ts-grp h3 svg{width:18px;height:18px;fill:none;stroke:var(--ts-acc);stroke-width:1.6;stroke-linecap:round;stroke-linejoin:round}
#tsRoom .ts-row{display:grid;grid-template-columns:auto minmax(0,1fr) auto;gap:10px;align-items:start;padding:8px 10px;border-radius:11px;border:1px solid transparent;background:transparent;text-align:left;width:100%;color:inherit;
  transition:transform .3s cubic-bezier(.2,.9,.25,1.2),box-shadow .2s,background .2s,border-color .2s}
#tsRoom .ts-row:hover{transform:translateY(-1px);background:var(--ts-well);border-color:var(--ts-line);box-shadow:0 1px 0 rgba(40,22,68,.05),0 4px 10px rgba(40,22,68,.07)}
#tsRoom .ts-st{margin-top:5px;width:10px;height:10px;border-radius:50%;box-shadow:inset 0 -1px 1px rgba(0,0,0,.2),0 1px 1px rgba(0,0,0,.15)}
#tsRoom .ts-st.ok{background:var(--ts-ok-c)}#tsRoom .ts-st.look{background:var(--ts-look-c)}#tsRoom .ts-st.bad{background:var(--ts-bad-c)}#tsRoom .ts-st.wait{background:var(--ts-line);animation:tsPulse 1s infinite ease-in-out}
@keyframes tsPulse{50%{opacity:.35}}
#tsRoom .ts-row b{display:block;color:var(--ts-ink1);font-size:13.3px}
#tsRoom .ts-row .t{display:block;font-size:12.4px;color:var(--ts-ink3);overflow-wrap:anywhere}
#tsRoom .ts-row .o{font-size:11.5px;font-weight:600;color:var(--ts-acc);margin-top:3px}
#tsRoom .ts-why{display:none;margin:2px 0 4px 30px;padding:10px 12px;border-radius:11px;background:var(--ts-well);border:1px solid var(--ts-line);font-size:12.6px}
#tsRoom .ts-why p{margin:0 0 6px;overflow-wrap:anywhere}
#tsRoom .ts-why .ts-keys{gap:6px}
#tsRoom .ts-row[aria-expanded="true"]+.ts-why{display:block;animation:tsRise .3s cubic-bezier(.2,.9,.25,1.2)}
@keyframes tsRise{from{opacity:0;transform:translateY(-4px)}to{opacity:1;transform:none}}
#tsRoom .ts-errs{display:flex;flex-direction:column;gap:8px}
#tsRoom .ts-err{display:grid;grid-template-columns:auto minmax(0,1fr) auto;gap:12px;align-items:center;padding:10px 12px;border-radius:13px;border:1px solid var(--ts-line);background:var(--ts-card);box-shadow:var(--ts-card-sh);transition:transform .3s cubic-bezier(.2,.9,.25,1.2),box-shadow .2s}
#tsRoom .ts-err:hover{transform:translateY(-2px);box-shadow:var(--ts-card-hi)}
#tsRoom .ts-err time{font:600 12px/1.2 ui-monospace,Menlo,Consolas,monospace;color:var(--ts-ink3);font-variant-numeric:tabular-nums}
#tsRoom .ts-err b{display:block;color:var(--ts-ink1);font-size:13px;overflow-wrap:anywhere}
#tsRoom .ts-err code{display:block;font:12px/1.4 ui-monospace,Menlo,Consolas,monospace;color:var(--ts-ink3);overflow-wrap:anywhere}
#tsRoom .ts-err .ts-keys{gap:6px;flex-wrap:nowrap}
#tsRoom .ts-none{font-size:13px;color:var(--ts-ink3);margin:0}
#tsRoom .ts-ask{display:grid;grid-template-columns:minmax(0,1fr) 250px;gap:14px;padding:14px;border-radius:16px;border:1px solid var(--ts-line);background:var(--ts-well);box-shadow:var(--ts-card-sh);transition:transform .35s cubic-bezier(.2,.9,.25,1.2),box-shadow .25s}
#tsRoom .ts-ask:hover{transform:translateY(-2px);box-shadow:var(--ts-card-hi)}
#tsRoom .ts-ask label{font-size:12.6px;font-weight:600;color:var(--ts-ink1)}
#tsRoom .ts-ask textarea{width:100%;min-height:104px;resize:vertical;border-radius:12px;border:1px solid var(--ts-line);background:var(--ts-card);padding:10px 12px;font:13.3px/1.5 var(--sans,system-ui);color:var(--ts-ink1);box-shadow:inset 0 2px 3px rgba(40,22,68,.08);box-sizing:border-box}
#tsRoom .ts-with{display:flex;flex-direction:column;gap:6px}
#tsRoom .ts-with b{font-size:12.6px;color:var(--ts-ink1)}
#tsRoom .ts-tick{display:flex;align-items:center;gap:9px;text-align:left;padding:7px 10px;border-radius:10px;border:1px solid var(--ts-line);background:var(--ts-card);color:var(--ts-ink2);box-shadow:0 1px 0 rgba(40,22,68,.05),0 2px 5px rgba(40,22,68,.05);font-size:12.6px;
  transition:transform .3s cubic-bezier(.2,.9,.25,1.2),box-shadow .2s}
#tsRoom .ts-tick:hover{transform:translateY(-2px);box-shadow:var(--ts-key-hi)}
#tsRoom .ts-tick .bx{width:16px;height:16px;border-radius:5px;border:1px solid var(--ts-line);background:var(--ts-key);box-shadow:var(--ts-key-sh);display:grid;place-items:center;flex:0 0 auto}
#tsRoom .ts-tick[aria-checked="true"] .bx{background:var(--ts-pri);border-color:var(--ts-pri-line)}
#tsRoom .ts-tick[aria-checked="true"] .bx::after{content:"";width:7px;height:4px;border:2px solid #fff;border-top:0;border-right:0;transform:rotate(-45deg) translateY(-1px)}
#tsRoom .ts-go{display:flex;gap:8px;flex-wrap:wrap;margin-top:10px;align-items:center}
#tsRoom .ts-go small{font-size:12px;color:var(--ts-ink3)}
#tsRoom details.ts-fold{border-radius:14px;border:1px solid var(--ts-line);background:var(--ts-card);box-shadow:var(--ts-card-sh);padding:10px 14px;transition:transform .3s cubic-bezier(.2,.9,.25,1.2)}
#tsRoom details.ts-fold:hover{transform:translateX(3px)}
#tsRoom details.ts-fold summary{cursor:pointer;list-style:none;font-weight:600;font-size:13.3px;color:var(--ts-ink1);display:flex;justify-content:space-between;gap:10px}
#tsRoom details.ts-fold summary::-webkit-details-marker{display:none}
#tsRoom details.ts-fold summary::after{content:"Read";color:var(--ts-acc);font-size:12px}#tsRoom details.ts-fold[open] summary::after{content:"Fold"}
#tsRoom details.ts-fold ul{margin:8px 0 2px;padding-left:18px;font-size:12.8px}
@media (max-width:860px){#tsRoom .ts-groups{grid-template-columns:1fr}#tsRoom .ts-ask{grid-template-columns:1fr}#tsRoom .ts-sum{grid-template-columns:1fr;justify-items:start}}
@media (max-width:520px){#tsRoom .ts-err{grid-template-columns:1fr}}
@media (prefers-reduced-motion:reduce){#tsRoom *,#ingAuthor .au-room,#ingAuthor .au-room svg{transition:none!important;animation:none!important}}
</style>
<script>try{(window.__ingParts=window.__ingParts||{})["p329"]="started";}catch(_){}
/* R329 · Troubleshoot, the Author Studio's first room: see the note at the top of its styles. window.IngTrouble */
(function r329(){
"use strict";
if(window.IngTrouble)return;
var W=window,D=document;
/* Adamas's mark, as it stood when Ingenium started: the check itself opens Adamas, which sets the mark while it measures */
var TRY0="";try{TRY0=localStorage.getItem("ing.diamond.trying")||"";}catch(e){}
function mk(t,c,x){var e=D.createElement(t);if(c)e.className=c;if(x!=null)e.textContent=x;return e;}
function esc(s){return String(s==null?"":s).replace(/[&<>"]/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c];});}
function snd(){try{if(W.IngSound)IngSound.play("keys");}catch(e){}}
function toast(t){try{W.ingToast(t);}catch(e){}}
function key(cls,t,fn,tip){var b=mk("button","ts-key"+(cls?" "+cls:""),t);b.type="button";if(tip)b.title=tip;b.addEventListener("click",function(e){snd();fn.call(b,e);});return b;}
function hhmm(t){var d=new Date(t);return String(d.getHours()).padStart(2,"0")+":"+String(d.getMinutes()).padStart(2,"0");}
function plain(h){return String(h||"").replace(/<[^>]+>/g,"");}
var IC={app:'<rect x="4" y="4" width="16" height="16" rx="3"/><path d="M4 9h16"/>',store:'<ellipse cx="12" cy="6" rx="7" ry="2.5"/><path d="M5 6v12c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5V6"/><path d="M5 12c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5"/>',
  models:'<circle cx="12" cy="12" r="3"/><path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1"/>',dev:'<rect x="5" y="5" width="14" height="10" rx="1.6"/><path d="M3 18.5h18"/>'};
var GROUPS=[["app","The app"],["store","Storage"],["models","Your models and computers"],["dev","This device"]];
/* r226's lines, by their name, into the four groups (Errors since it started has its own section) */
var WHERE={"Parts":"app","Pages":"app","Version":"app","Your layers":"app","The large store":"store","The small store":"store","Room":"store","The engine":"models","Connections":"models","Connectors":"models","Sign-in":"dev"};
var DO={"Parts":"Ask a model to find why a part stopped as Ingenium started.","Pages":"Open the page that did not open, then ask a model about the error it left in What went wrong.",
  "The large store":"Restart Ingenium. If it says so again, ask a model; your work is also kept in the small store.","The small store":"Ingenium keeps your desk in the large store when this one refuses it.",
  "Room":"Free room in Mentes (models you no longer use), or keep large models on your Mac mini and use them from here.","Your layers":"Look at the script in Additions, Your layers; it can be turned off there.",
  "Connectors":"Test the connector again in Settings, Connectors."};
/* ---------- the checks added here (each fast, nothing sent anywhere) ---------- */
var FN={tokens:"Reply",ctx:"Memory",effort:"Effort"};
function extra(){var out=[];
  /* graphics: what Adamas chose (r292) */
  try{var g=W.IngDiamond&&IngDiamond.gpu?IngDiamond.gpu():null,trying=TRY0,force="";try{force=localStorage.getItem("ing.gpu.diamond")||"";}catch(e){}
    if(trying==="1")out.push({g:"dev",st:"bad",n:"Graphics",t:"Adamas stopped while it tried the moving stone.",why:"The mark Adamas leaves while it tries the moving stone is still there, so the last try before this start did not finish (the app may have closed).",what:"Adamas shows the still stone from now on, by itself. If it keeps happening, ask a model about it.",ask:true});
    else if(!g||!g.n)out.push({g:"dev",st:"ok",n:"Graphics",t:force?"Chosen by hand: "+(force==="still"?"the still stone":"the moving stone")+".":"Not measured yet on this device.",why:"Adamas measures this graphics card the first time it opens, and chooses the moving stone or the still one."});
    else if(g.st==="still")out.push({g:"dev",st:"look",n:"Graphics",t:"Too slow for the moving stone: still mode.",why:"Adamas timed "+g.n+" frames on this graphics card: about "+(g.est>=1000?(g.est/1000).toFixed(1)+" s":Math.round(g.est)+" ms")+" for a full frame. It shows the stone still, from its own strip, so the app does not freeze or close.",what:"Nothing to do: the still stone is chosen for you."});
    else out.push({g:"dev",st:"ok",n:"Graphics",t:"The moving stone ("+(g.st||"full")+").",why:"Adamas timed "+g.n+" frames on this graphics card: about "+Math.round(g.est||0)+" ms for a full frame."});}catch(e){}
  /* at rest (r324) */
  try{if(W.IngStill)out.push({g:"dev",st:"ok",n:"At rest",t:"Rests after "+Math.round((IngStill.after||30000)/1000)+" s; nothing moves at rest.",why:"Scenes and animations pause when you leave Ingenium alone or look at another window, so the device stays cool. Not while a model is answering or loading."});}catch(e){}
  /* memory, as the browser reports it (rounded, and only by some browsers) */
  try{var dm=navigator.deviceMemory;if(dm)out.push({g:"dev",st:"ok",n:"Memory",t:"About "+dm+" GB"+(dm>=8?" or more":"")+", as the browser rounds it.",why:"Browsers report memory roughly, and none above 8 GB, so a 16 GB computer shows 8. A model runs in this memory; a larger one runs best on a computer with more."});}catch(e){}
  /* who serves your models (r328, r274) */
  try{if(W.IngLend){var s=IngLend.state(),cs=s.computers||[];if(!cs.length)out.push({g:"models",st:"ok",n:"Who serves your models",t:"No computer paired: this device's models answer.",why:"Pair your Mac mini and other computers in Settings, Your devices, to use their models from here."});
    else{var ord=W.IngServe?IngServe.order():cs.map(function(c){return c.id;}),by={};cs.forEach(function(c){by[c.id]=c;});var list=ord.map(function(id){return by[id];}).filter(Boolean),first=list[0],on=list.filter(function(c){return c.status==="ok";})[0];
      var asked=list.some(function(c){return c.status;});
      if(!asked)out.push({g:"models",st:"ok",n:"Who serves your models",t:list.length+" computer"+(list.length===1?"":"s")+" paired; not asked yet.",why:"They are asked before a message, or when you press Ask them now.",acts:[["Ask them now",askAll]]});
      else if(first&&first.status==="ok")out.push({g:"models",st:"ok",n:"Who serves your models",t:first.name+" answers, first in your order.",why:list.map(function(c,i){return (i+1)+". "+c.name+": "+(c.status==="ok"?"on":c.status==="re"?"looking":"away");}).join("; ")+".",acts:[["Ask them now",askAll]]});
      else if(on)out.push({g:"models",st:"look",n:"Who serves your models",t:(first?first.name+" away; ":"")+on.name+" serves.",why:(first?first.name+" did not answer at the addresses it gave. ":"")+on.name+" answers instead, as you set.",what:"Check "+(first?first.name:"it")+" is awake and on the same Wi-Fi. Nothing to change here.",acts:[["Ask them now",askAll]]});
      else out.push({g:"models",st:"look",n:"Who serves your models",t:"None of your computers answered.",why:"Each was asked at the addresses it gave. This device's own models answer meanwhile.",what:"Wake your Mac mini or an HP laptop, on the same Wi-Fi, then press Ask them now.",acts:[["Ask them now",askAll]]});}}}catch(e){}
  /* sealed between your devices (r319) */
  try{if(W.IngSealing&&IngSealing.summary){var x=IngSealing.summary();if(x.computers||x.computer){var st=IngSealing.state();
    out.push({g:"models",st:st==="on"?"ok":"look",n:"Sealed between your devices",t:st==="on"?"Sealed end to end.":"Not every device is sealed yet.",why:x.computer?(x.devSealed+" device"+(x.devSealed===1?"":"s")+" sealed, "+x.devLegacy+" paired before sealing"):(x.sealed+" of "+x.computers+" computer"+(x.computers===1?"":"s")+" sealed end to end."),
      what:st==="on"?"":"Pair once more with each one marked so, in Settings, Your devices."});}}}catch(e){}
  /* the model settings record (r249): a value refused in the last seven days */
  try{if(W.IngGen&&IngGen.log){var lg=IngGen.log(),wk=Date.now()-7*864e5,rs=lg.filter(function(e){return e.reset&&e.at>wk;}),last=lg[0];
    if(rs.length){var r0=rs[0];out.push({g:"models",st:"look",n:"Model settings record",t:rs.length+" value"+(rs.length===1?"":"s")+" refused in the last seven days; the kept one stayed.",
      why:"Latest: "+(FN[r0.f]||r0.f)+" for "+(r0.n||"a model")+" was asked to be "+(r0.from==null?"nothing":r0.from)+(r0.p?" in "+r0.p:"")+" ("+hhmm(r0.at)+"); "+r0.to+" was kept.",what:"Nothing was lost. If it happens again, ask a model where the wrong value came from.",ask:true});}
    else out.push({g:"models",st:"ok",n:"Model settings record",t:last?"No value lost; last change "+hhmm(last.at)+".":"No change recorded yet.",why:"Reply, Memory and Effort for each model, with every change and any value refused, in Settings, Your Ingenium."});}}catch(e){}
  return out;}
function askAll(){var b=this;b.disabled=true;b.textContent="Asking…";var ids=[];try{ids=(IngLend.state().computers||[]).map(function(c){return c.id;});}catch(e){}
  Promise.all(ids.map(function(id){return IngLend.check(id,{find:true}).catch(function(){return false;});})).then(function(){LINES=null;paintChecks();});}
/* ---------- the result ---------- */
var LINES=null,AT=0,RUNNING=false;
function fromWorkshop(lines){var out=[];(lines||[]).forEach(function(l){var m=/^<b>([^<]+)<\/b>:\s*([\s\S]*)$/.exec(l.t||"");if(!m)return;var n=m[1],g=WHERE[n];if(!g)return;
  var st=l.st==="warn"?"look":l.st,txt=plain(m[2]),cut=txt.search(/\.\s/),first=cut>=0?txt.slice(0,cut+1):txt;first=first.charAt(0).toUpperCase()+first.slice(1);out.push({g:g,st:st,n:n,t:first,why:txt,what:st==="ok"?"":(DO[n]||""),ask:st!=="ok"});});return out;}
function all(){return (LINES||[]).concat(extra());}
function tally(lines){var t={ok:0,look:0,bad:0};lines.forEach(function(l){t[l.st]=(t[l.st]||0)+1;});return t;}
function run(){if(RUNNING||!W.IngWorkshop)return Promise.resolve();RUNNING=true;paintChecks();
  return Promise.resolve().then(function(){return IngWorkshop.run();}).then(function(lines){LINES=fromWorkshop(lines);AT=Date.now();},function(e){LINES=[{g:"app",st:"bad",n:"The check",t:"It stopped: "+(e&&e.message||e),why:String(e&&e.stack||e),ask:true}];AT=Date.now();})
    .then(function(){RUNNING=false;try{if(W.IngAuthor)IngAuthor.room("trouble");}catch(e){}paint();});}
function reportText(){var lines=all(),r="Ingenium's own check"+(AT?", "+new Date(AT).toLocaleString():"")+":\n";
  GROUPS.forEach(function(g){var ls=lines.filter(function(l){return l.g===g[0];});if(!ls.length)return;r+=g[1]+"\n"+ls.map(function(l){return "  ["+(l.st==="ok"?"ok":l.st==="look"?"look":"wrong")+"] "+l.n+": "+l.why;}).join("\n")+"\n";});
  return r;}
function errs(){try{return (IngWorkshop.errors||[]).slice().reverse();}catch(e){return [];}}
function errText(e){return "["+e.kind+"] "+e.msg+(e.where?" ("+e.where+")":"")+(e.n>1?" (x"+e.n+")":"");}
function fix(about){try{if(W.IngAuthor)IngAuthor.close();}catch(e){}try{return IngWorkshop.fix(about);}catch(e){toast("Ingenium's own page cannot be opened in Code from here.");}}
/* ---------- the room ---------- */
var BODY=null,ASK={text:"",report:true,errors:true,device:true,record:false};
function dial(t){var tot=(t.ok+t.look+t.bad)||1,score=(t.look+t.bad*3)/tot,a=LINES?-80+Math.min(160,score*240):-80,ticks="";
  for(var i=0;i<=10;i++){var q=Math.PI*(1-i/10);ticks+='<line class="tk" x1="'+(75+52*Math.cos(q)).toFixed(1)+'" y1="'+(80-52*Math.sin(q)).toFixed(1)+'" x2="'+(75+46*Math.cos(q)).toFixed(1)+'" y2="'+(80-46*Math.sin(q)).toFixed(1)+'"/>';}
  return '<svg viewBox="0 0 150 92" aria-hidden="true"><path class="face" d="M8 80a67 67 0 0 1 134 0z"/><path class="arc a1" d="M17 80a58 58 0 0 1 32.4-52"/><path class="arc a2" d="M52 26.2a58 58 0 0 1 46 0"/><path class="arc a3" d="M100.6 28a58 58 0 0 1 32.4 52"/>'+ticks+
    '<text class="lab" x="16" y="90">FINE</text><text class="lab" x="62" y="14">LOOK</text><text class="lab" x="112" y="90">WRONG</text><line class="nd" x1="75" y1="80" x2="75" y2="30" style="transform:rotate('+(RUNNING?-80:a)+'deg)"/><circle class="hub" cx="75" cy="80" r="5"/></svg>';}
function paintChecks(){if(!BODY)return;var sum=BODY.querySelector(".ts-sum"),gs=BODY.querySelector(".ts-groups");if(!sum||!gs)return;var lines=all(),t=tally(lines);
  sum.querySelector(".ts-dial").innerHTML=dial(t);var ta=sum.querySelector(".ts-tally");ta.innerHTML="";
  if(RUNNING)ta.appendChild(mk("span","ts-chip lav","Checking: each page is opened in turn…"));
  else{[["ok","fine"],["look","worth a look"],["bad","wrong"]].forEach(function(x){var c=mk("span","ts-chip "+x[0]);c.appendChild(mk("i"));c.appendChild(D.createTextNode(t[x[0]]+" "+x[1]));ta.appendChild(c);});
    if(!LINES)ta.appendChild(mk("span","ts-chip lav","The full check not run yet"));}
  sum.querySelector(".ts-when").textContent=RUNNING?"Pages open and close behind the studio; it takes a few seconds.":LINES?"Checked at "+hhmm(AT)+". Press a line to see why.":"Check everything opens every page, tests both stores and the engine, and reads the rest. Shown now: what is known without it.";
  var rk=sum.querySelector("#tsRun");if(rk){rk.disabled=RUNNING;rk.textContent=RUNNING?"Checking…":"Check everything";}
  gs.innerHTML="";GROUPS.forEach(function(g){var ls=lines.filter(function(l){return l.g===g[0];});var c=mk("section","ts-grp");c.innerHTML='<h3><svg viewBox="0 0 24 24" aria-hidden="true">'+IC[g[0]]+'</svg>'+esc(g[1])+'</h3>';
    if(!ls.length){c.appendChild(mk("p","ts-none",RUNNING?"Checking…":"Shown after Check everything."));}
    ls.forEach(function(l){var b=mk("button","ts-row");b.type="button";b.setAttribute("aria-expanded","false");var st=RUNNING&&WHERE[l.n]?"wait":l.st;
      b.innerHTML='<span class="ts-st '+st+'" title="'+(st==="ok"?"Fine":st==="look"?"Worth a look":st==="bad"?"Wrong":"Checking")+'"></span><span><b>'+esc(l.n)+'</b><span class="t">'+esc(l.t)+'</span></span><span class="o">Why</span>';
      var w=mk("div","ts-why");w.appendChild(mk("p",null,l.why||l.t));if(l.what){var p=mk("p");var bb=mk("b",null,"What to do: ");bb.style.color="var(--ts-ink1)";p.appendChild(bb);p.appendChild(D.createTextNode(l.what));w.appendChild(p);}
      var ks=mk("div","ts-keys");(l.acts||[]).forEach(function(a){ks.appendChild(key("sm",a[0],a[1]));});
      if(l.ask)ks.appendChild(key("sm","Ask a model about this",function(){fix("This line of Ingenium's own check is "+(l.st==="bad"?"wrong":"worth a look")+": "+l.n+": "+(l.why||l.t)+"\n\n"+reportText());}));
      ks.appendChild(key("sm","Copy this line",function(){var t0=l.n+": "+(l.why||l.t),b2=this;try{navigator.clipboard.writeText(t0).then(function(){b2.textContent="Copied";},function(){toast(t0);});}catch(e){toast(t0);}}));
      w.appendChild(ks);b.addEventListener("click",function(){var o=b.getAttribute("aria-expanded")==="true";b.setAttribute("aria-expanded",String(!o));b.querySelector(".o").textContent=o?"Why":"Fold";snd();});
      c.appendChild(b);c.appendChild(w);});
    gs.appendChild(c);});}
function paintErrs(){if(!BODY)return;var h=BODY.querySelector(".ts-errs");if(!h)return;h.innerHTML="";var es=errs();
  if(!es.length){h.appendChild(mk("p","ts-none","Nothing went wrong since Ingenium started."));return;}
  es.slice(0,20).forEach(function(e){var r=mk("div","ts-err"),t=mk("time",null,hhmm(e.at));if(e.before)t.title="Before this start";r.appendChild(t);
    var m=mk("span");m.appendChild(mk("b",null,(e.before?"Before this start: ":"")+(e.msg||"").split("\n")[0].slice(0,160)));m.appendChild(mk("code",null,"["+e.kind+"]"+(e.where?" "+e.where:"")+(e.n>1?" (x"+e.n+")":"")));r.appendChild(m);
    var ks=mk("span","ts-keys");ks.appendChild(key("sm","Ask a model to fix",function(){fix("This error was met in Ingenium: "+errText(e)+"\n\n"+reportText());}));
    ks.appendChild(key("sm","Copy",function(){var t0=errText(e),b=this;try{navigator.clipboard.writeText(t0).then(function(){b.textContent="Copied";},function(){toast(t0);});}catch(x){toast(t0);}}));r.appendChild(ks);h.appendChild(r);});
  if(es.length>20)h.appendChild(mk("p","ts-none","And "+(es.length-20)+" older; Copy the report holds the last twelve."));}
function deviceText(){var x=extra().filter(function(l){return l.g==="dev";});return "This device:\n"+x.map(function(l){return "  "+l.n+": "+(l.why||l.t);}).join("\n")+"\n  "+(navigator.userAgent||"").slice(0,160);}
function recordText(){try{return "The model settings record (newest first):\n"+IngGen.log().slice(0,15).map(function(e){return "  "+new Date(e.at).toLocaleString()+": "+(FN[e.f]||e.f)+" for "+(e.n||"?")+": "+(e.reset?"asked "+e.from+", kept "+e.to:e.from+" to "+e.to)+(e.p?" ("+e.p+")":"");}).join("\n");}catch(e){return "";}}
function hand(){var t=String(ASK.text||"").trim();if(!t){toast("Write what happened first, in your own words.");return;}
  var go=function(){var parts=["What happened, in my own words: "+t];if(ASK.report)parts.push(reportText());if(ASK.errors){var es=errs().slice(0,10);if(es.length)parts.push("The last errors:\n"+es.map(function(e){return "  "+new Date(e.at).toLocaleString()+" "+errText(e);}).join("\n"));}
    if(ASK.device)parts.push(deviceText());if(ASK.record)parts.push(recordText());fix(parts.join("\n\n"));};
  if(ASK.report&&!LINES)run().then(go);else go();}
function paint(body){if(body)BODY=body;if(!BODY)return;BODY.innerHTML="";var R=mk("div");R.id="tsRoom";BODY.appendChild(R);
  var sum=mk("section","ts-sum");sum.setAttribute("aria-label","Check everything");var dl=mk("div","ts-dial");sum.appendChild(dl);var sr=mk("div","ts-sum-r");sr.appendChild(mk("div","ts-tally"));sr.appendChild(mk("div","ts-when"));
  var ks=mk("div","ts-keys"),rk=key("pri","Check everything",function(){run();});rk.id="tsRun";ks.appendChild(rk);
  ks.appendChild(key("","Copy the report",function(){var t=reportText(),b=this;try{navigator.clipboard.writeText(t).then(function(){b.textContent="Copied";setTimeout(function(){b.textContent="Copy the report";},1600);},function(){toast("The report could not be copied here.");});}catch(e){toast("The report could not be copied here.");}}));
  sr.appendChild(ks);sum.appendChild(sr);R.appendChild(sum);
  var h1=mk("h3","ts-sec","The checks");h1.appendChild(mk("small",null,"Press a line to see why, and what to do."));R.appendChild(h1);R.appendChild(mk("div","ts-groups"));
  var h2=mk("h3","ts-sec","What went wrong");h2.appendChild(mk("small",null,"Every error since Ingenium started, newest first; the last 50 are kept across restarts."));R.appendChild(h2);R.appendChild(mk("div","ts-errs"));
  var h3=mk("h3","ts-sec","Say it in your own words");h3.appendChild(mk("small",null,"For what a check cannot see."));R.appendChild(h3);
  var ask=mk("section","ts-ask"),L=mk("div"),lb=mk("label",null,"What happened?");lb.htmlFor="tsProb";L.appendChild(lb);var ta=mk("textarea");ta.id="tsProb";ta.value=ASK.text;ta.placeholder="For example: on my HP laptop, Adamas froze for a moment and then the app closed.";
  ta.addEventListener("input",function(){ASK.text=ta.value;});L.appendChild(ta);var go=mk("div","ts-go");go.appendChild(key("pri","Hand to a model in Code",hand));go.appendChild(mk("small",null,"Ingenium's own page opens in Code with this message ready. You read it before you send it."));L.appendChild(go);ask.appendChild(L);
  var wi=mk("div","ts-with");wi.appendChild(mk("b",null,"Sent with it"));[["report","The report of the checks"],["errors","The last ten errors"],["device","This device: graphics, memory, at rest"],["record","The model settings record"]].forEach(function(x){
    var b=mk("button","ts-tick");b.type="button";b.setAttribute("role","checkbox");b.setAttribute("aria-checked",String(!!ASK[x[0]]));b.appendChild(mk("span","bx"));b.appendChild(D.createTextNode(x[1]));
    b.addEventListener("click",function(){ASK[x[0]]=!ASK[x[0]];b.setAttribute("aria-checked",String(ASK[x[0]]));snd();});wi.appendChild(b);});ask.appendChild(wi);R.appendChild(ask);
  var f=D.createElement("details");f.className="ts-fold";f.appendChild(mk("summary",null,"Fixing safely"));var ul=mk("ul");["Every change a model makes is a version you can undo, in Additions, Your page.","A changed page counts as working once it reports in; if it does not within half a minute, Ingenium goes back to the last version that worked, and says so.","The built page is always one choice away."].forEach(function(t){ul.appendChild(mk("li",null,t));});f.appendChild(ul);R.appendChild(f);
  paintChecks();paintErrs();}
/* the errors list follows r226's as it grows, while the room is open */
var ET=0;setInterval(function(){if(!BODY||!BODY.isConnected||!D.getElementById("tsRoom"))return;try{var n=(IngWorkshop.errors||[]).length;if(n!==ET){ET=n;paintErrs();}}catch(e){}},2000);
W.IngTrouble={version:1,paint:paint,run:run,report:reportText,lines:all,hand:hand,ask:ASK};
try{window.__ingParts["p329"]="running";}catch(_){}
})();
</script>
