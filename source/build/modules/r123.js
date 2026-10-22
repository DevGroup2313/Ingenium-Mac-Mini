<style id="r123-css">
/* ============ R123 · THE APPS, AS CARPE DIEM OPENS THEM ============
   The owner's word (18 October 2026), with Carpe Diem's own screens beside Ingenium's: "the apps buttons inside of
   Ingenium's Tabula have massively regressed, this is not full parity with Carpe Diem. It does not even export the
   windows, this feels incomplete." Ingenium now carries all five of Carpe Diem's apps (Tabula, Abacus, Imago, Scriba,
   Fontes), each prepared as Carpe Diem prepares it and dressed as Carpe Diem dresses it once it is open (its cut
   stones on the ribbon's app keys, its seal, its pen). They open as Carpe Diem opens them: full width, with the Desk
   pill at the top; the ↗ on the side column floats the open app into a window that moves and sizes from every edge,
   folds, fills the screen and closes; and the window's own ↗ sends the app to a window of its own, its work handed
   across, where the device allows a second window. */
#ing-desk{position:fixed;top:0;right:0;bottom:0;left:0;z-index:112;display:none;background:var(--bg,#f6f4f9)}
#ing-desk.on{display:block}
#ing-desk iframe{position:absolute;top:0;left:0;width:100%;height:100%;border:0;display:none;background:#fff}
#ing-desk iframe.on{display:block}
body[data-theme="night"] #ing-desk{background:#141019}
body[data-theme="night"] #ing-desk iframe{background:#141210}
body.ing-desk-on{overflow:hidden}
/* Carpe Diem's pill: Desk, then each app that is open, its dot and its ✕ */
#ing-deskbar{position:fixed;top:6px;left:50%;transform:translateX(-50%);z-index:136;display:none;align-items:center;gap:2px;padding:3px 6px;border-radius:10px;
  background:linear-gradient(180deg,rgba(255,255,255,.80),rgba(255,255,255,.56));border:1px solid rgba(255,255,255,.85);
  box-shadow:inset 0 1px 0 rgba(255,255,255,.95),0 0 0 1px rgba(107,79,160,.18),0 2px 5px rgba(40,22,68,.14),0 8px 18px rgba(40,22,68,.10);
  -webkit-backdrop-filter:blur(14px) saturate(1.4);backdrop-filter:blur(14px) saturate(1.4);font:600 11.5px/1 -apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;letter-spacing:.04em}
#ing-deskbar.on{display:flex}
#ing-deskbar button{display:flex;align-items:center;gap:6px;border:0;background:transparent;color:var(--accent-deep,#4f3a7a);padding:6px 10px;border-radius:999px;cursor:pointer;font:inherit;letter-spacing:inherit;white-space:nowrap}
#ing-deskbar button.on{background:rgba(107,79,160,.14)}
#ing-deskbar button:hover{background:rgba(107,79,160,.10)}
#ing-deskbar button.x{font-size:9.5px;padding:4px 5px;opacity:.8;margin-left:-4px}
#ing-deskbar .dot{width:7px;height:7px;border-radius:50%;display:inline-block;flex:none}
body[data-theme="night"] #ing-deskbar{background:linear-gradient(180deg,rgba(44,36,64,.88),rgba(30,24,44,.80));border-color:rgba(205,184,240,.18);
  box-shadow:inset 0 1px 0 rgba(255,255,255,.06),0 0 0 1px rgba(0,0,0,.4),0 6px 16px rgba(0,0,0,.45)}
body[data-theme="night"] #ing-deskbar button{color:#e4dcf3}
body[data-theme="night"] #ing-deskbar button.on{background:rgba(205,184,240,.16)}
/* on the Desk the pill stands just under Ingenium's own top bar, so the status pills stay in view */
body:not(.ing-desk-on) #ing-deskbar{top:52px}
@media (max-width:560px){#ing-deskbar{top:4px;max-width:calc(100vw - 80px);overflow-x:auto}body:not(.ing-desk-on) #ing-deskbar{top:50px}}
/* the float key on the side column, above the bell, as in Carpe Diem */
html body #fabFloat{bottom:388px}
@supports (bottom:max(0px)){html body #fabFloat{bottom:max(388px, calc(env(safe-area-inset-bottom) + 384px))}}
@media (max-width:720px){html body #fabFloat{bottom:calc(env(safe-area-inset-bottom,0px) + 320px)}}
html body #fabFloat[hidden]{display:none!important}
/* 6.2: while an app is open the float key stands where the chevron stood, so the chevron steps up above it (the owner's
   words, 22 October 2026: "the collapsible chevron is covered and hidden from view by the export floating window button") */
html:not(.ing-lite) body.ing-desk-on #railChevron{bottom:444px}
@supports (bottom:max(0px)){html:not(.ing-lite) body.ing-desk-on #railChevron{bottom:max(444px, calc(env(safe-area-inset-bottom) + 440px))}}
@media (max-width:720px){html:not(.ing-lite) body.ing-desk-on #railChevron{bottom:calc(env(safe-area-inset-bottom,0px) + 368px)}}
/* a floating window's key back into the desk, and a window of its own's tab on the Desk bar */
.ing-fw-keys button svg{width:14px;height:14px;display:block;margin:auto}
#ing-deskbar button[data-lite] .own{font-size:11px;opacity:.7;margin-left:3px}
/* in a window of its own: the way back to Ingenium's desk, a small pill at the top, as the Desk bar is in the main window */
#ingLiteHome{position:fixed;top:6px;left:50%;transform:translateX(-50%);z-index:2147482900;display:none;align-items:center;gap:6px;
  padding:5px 12px;border-radius:999px;border:1px solid rgba(40,22,68,.14);background:rgba(255,255,255,.94);color:#4a2f86;
  font:600 12.5px/1.2 var(--sans,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif);cursor:pointer;
  box-shadow:inset 0 1px 0 rgba(255,255,255,.9),0 2px 0 rgba(40,22,68,.14),0 6px 14px rgba(40,22,68,.14);transition:transform .15s ease,box-shadow .15s ease}
#ingLiteHome:hover{transform:translate(-50%,-1px)}
#ingLiteHome:active{transform:translate(-50%,1px)}
#ingLiteHome:focus-visible{outline:2px solid #6b4fa0;outline-offset:2px}
#ingLiteHome svg{width:14px;height:14px}
html.ing-lite #ingLiteHome{display:inline-flex}
body[data-theme="night"] #ingLiteHome{background:rgba(42,34,57,.96);color:#e4dcf3;border-color:rgba(205,184,240,.22)}
#fabFloat svg{width:30px;height:30px;color:var(--accent,#6b4fa0);filter:drop-shadow(0 1px 0 rgba(255,255,255,.7)) drop-shadow(0 2px 3px rgba(40,22,68,.2))}
body[data-theme="night"] #fabFloat svg{color:#cbb6f0;filter:drop-shadow(0 2px 3px rgba(0,0,0,.6))}
/* the floating windows */
.ing-fw{position:fixed;z-index:600;display:flex;flex-direction:column;background:var(--card,#fff);border-radius:12px;overflow:hidden;
  box-shadow:0 0 0 1px rgba(40,22,68,.10),0 2px 4px rgba(40,22,68,.08),0 14px 34px rgba(40,22,68,.20)}
.ing-fw-bar{flex:0 0 auto;display:flex;align-items:center;gap:8px;padding:6px 8px 6px 12px;background:var(--card-hi,#fff);border-bottom:1px solid rgba(107,79,160,.22);cursor:move;touch-action:none;user-select:none;-webkit-user-select:none}
.ing-fw-title{font:700 13.5px/1.2 var(--serif,Georgia,serif);color:var(--accent,#6b4fa0);letter-spacing:.02em;flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.ing-fw-keys{display:flex;gap:4px;align-items:center}
.ing-fw-keys button{width:28px;height:26px;border-radius:8px;border:1px solid rgba(107,79,160,.20);background:var(--card-hi,#fff);color:var(--accent-deep,#4f3a7a);cursor:pointer;
  font:600 13px/1 -apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;padding:0;display:inline-flex;align-items:center;justify-content:center;
  box-shadow:inset 0 1.5px 0 rgba(255,255,255,1),0 1px 2px rgba(40,22,68,.10),0 2px 5px rgba(40,22,68,.06);transition:transform .12s ease,box-shadow .12s ease}
.ing-fw-keys button:hover{transform:translateY(-2px);box-shadow:inset 0 1.5px 0 rgba(255,255,255,1),0 2px 4px rgba(40,22,68,.14),0 6px 12px rgba(40,22,68,.10)}
.ing-fw-keys button:active{transform:none}
.ing-fw-body{flex:1 1 auto;position:relative;min-height:0;background:#fff}
.ing-fw-body iframe{border:0;width:100%;height:100%;display:block}
.ing-fw.moving .ing-fw-body{pointer-events:none}
.ing-fw-edge{position:absolute;z-index:2;touch-action:none}
.ing-fw-grip{position:absolute;right:0;bottom:0;width:22px;height:22px;cursor:nwse-resize;z-index:3;touch-action:none}
@media (pointer:coarse){.ing-fw-grip{width:36px;height:36px}}
.ing-fw.folded{display:none!important}
.ing-fw.hail{animation:ingFwHail 1s ease}
@keyframes ingFwHail{0%,100%{box-shadow:0 0 0 1px rgba(40,22,68,.10),0 14px 34px rgba(40,22,68,.20)}35%{box-shadow:0 0 0 3px rgba(107,79,160,.45),0 14px 34px rgba(40,22,68,.24)}}
body[data-calm="1"] .ing-fw.hail,body[data-motion="minimal"] .ing-fw.hail{animation:none}
body[data-theme="night"] .ing-fw{background:#1c1726;box-shadow:0 0 0 1px rgba(205,184,240,.12),0 14px 34px rgba(0,0,0,.55)}
body[data-theme="night"] .ing-fw-bar{background:#241d33;border-bottom-color:rgba(205,184,240,.12)}
body[data-theme="night"] .ing-fw-title{color:#cbb6f0}
body[data-theme="night"] .ing-fw-keys button{background:#2c2440;color:#e4dcf3;border-color:rgba(205,184,240,.18);box-shadow:inset 0 1px 0 rgba(255,255,255,.06),0 1px 2px rgba(0,0,0,.5)}
body[data-theme="night"] .ing-fw-body{background:#141210}
.ing-fw-veil{position:absolute;top:0;right:0;bottom:0;left:0;display:flex;align-items:center;justify-content:center;background:rgba(255,255,255,.86);font:600 14px/1.4 var(--serif,Georgia,serif);color:var(--accent-deep,#4f3a7a);z-index:5}
body[data-theme="night"] .ing-fw-veil{background:rgba(20,16,25,.88);color:#e4dcf3}
/* the Desk bar does the Apps dock's work (the owner's word: the dock's key was out of place on the page): each floating
   window keeps its tab, − folds a window away into its tab, the tab brings it back and its ✕ closes it */
#ing-deskbar button.folded{opacity:.62;font-style:italic}
#ing-deskbar button.folded .dot{background:transparent!important;box-shadow:inset 0 0 0 1.5px currentColor}
#ing-deskbar button.folded:hover{opacity:1}
/* a window of its own: laid out as the main page is with an app open, so every side button and its panels (the bell,
   the leaf, the 💭 thought panel, day and night, the Clepsydra, the notes) stand above the app and work as they do there.
   Only the Desk bar, the float key and the door stay away */
html.ing-lite #ing-desk{display:block!important}
html.ing-lite #ing-deskbar,html.ing-lite #fabFloat,html.ing-lite #introDoor,html.ing-lite .tour-ov{display:none!important}
html.ing-lite body{overflow:hidden}
</style>
<script>try{(window.__ingParts=window.__ingParts||{})["p53"]="started";}catch(_){}
/* R123 · the apps, as Carpe Diem opens them: see the note at the top of its styles */
(function r123Desk(){
"use strict";
var A=window.IngApps2;if(!A||typeof A.prep!=="function")return;
var APPS=["tabula","abacus","slides","scriba","fontes"],N=A.NAMES;
/* the dots on the pill, each app's own colour as its stone wears it */
var DOT={tabula:"#8a8172",abacus:"#2d9a52",slides:"#b34a3c",scriba:"#2f5f9e",fontes:"#c9a14a"};
var LITE=(function(){var m=/[#&]ingapp=(tabula|abacus|slides|scriba|fontes)(?:&tok=([\w-]+))?/.exec(location.hash||"");return m?{which:m[1],tok:m[2]||""}:null;})();
var DOCK_SVG='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3.5" y="4.5" width="17" height="15" rx="2.5"/><path d="M12 8v7M8.5 11.5L12 15l3.5-3.5"/></svg>';
var FLOAT_SVG='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3.5" y="8" width="11" height="11" rx="3"/><path d="M14.5 4H20v5.5"/><path d="M20 4l-8 8"/></svg>';
function toast(t){try{ingToast(t);}catch(e){}}
var desk=null,bar=null,fab=null,open=[],active=null,shown=false,wins={},Z=600,front=null,lites={},liteRefs={};
function baseOf(id){return String(id).split("-")[0];}
function seqOf(id){var p=String(id).split("-");return p.length>1?(parseInt(p[1],10)||0):0;}
function label(id){var n=seqOf(id);return N[baseOf(id)]+(n>=2?" ("+n+")":"");}

function ensure(){if(desk)return;desk=document.createElement("div");desk.id="ing-desk";desk.setAttribute("data-notip","1");document.body.appendChild(desk);
  bar=document.createElement("div");bar.id="ing-deskbar";bar.setAttribute("role","tablist");bar.setAttribute("aria-label","Open apps");document.body.appendChild(bar);
  bar.addEventListener("click",onBar);}
function frameOf(w){return desk?desk.querySelector('iframe[data-app="'+w+'"]'):null;}
/* a frame for the app: prepared, dressed, handed what it was holding, its theme followed (r118 keeps the registry) */
function mk(which,opts,key){var html=A.prep(which,opts);if(!html)return null;
  if(which==="tabula"){try{A.hand.tabula();}catch(e){}}
  if(which==="abacus"){try{var p=A.pending();if(p.csv==null)A.setLite(A.liteCsv());}catch(e){}}
  var ifr=document.createElement("iframe");ifr.setAttribute("title",N[which]);ifr.setAttribute("data-app",which);
  ifr.setAttribute("allow","microphone *; fullscreen *; clipboard-read *; clipboard-write *");
  ifr.addEventListener("load",function(){A.themeTo(ifr);if(which==="abacus")setTimeout(function(){try{A.hand.abacus(ifr);}catch(e){}},60);});
  ifr.srcdoc=html;A.frames[key]=ifr;return ifr;}
/* what an app is holding is handed to the next frame it opens in, as Carpe Diem hands it (its __cdHandoff) */
function capture(ifr,which){try{var w=ifr&&ifr.contentWindow;if(!w||typeof w.__tabulaCapture!=="function")return;var c=w.__tabulaCapture(),t="";
    try{if(c){t=c.text||c.html||c.body||c.content||"";}if(!t&&typeof c==="string")t=c;t=typeof t==="string"?t:"";}catch(e){}
    var full=String(t).replace(/<[^>]*>/g,"").replace(/[\s "{}\[\],:]+/g,"").length>0;
    if(c){window.__cdHandoff=window.__cdHandoff||{};window.__cdHandoff[which]=c;}
    if(full&&typeof w.__tabulaFlush==="function")w.__tabulaFlush();}catch(e){}}

/* ---------- full width, with the Desk pill ---------- */
function openApp(which,o){o=o||{};if(APPS.indexOf(which)<0)return false;ensure();
  if(wins[which]&&!LITE){surface(wins[which]);handOn(which);return true;}
  if(o.only)open.slice().forEach(function(w){if(w!==which)closeApp(w,true);});
  var f=frameOf(which);
  if(!f){f=mk(which,{close:true},"desk:"+which);if(!f){toast("The whole "+N[which]+" is not inside this copy of the page.");return false;}desk.appendChild(f);}
  else handOn(which);
  if(open.indexOf(which)<0)open.push(which);active=which;show(true);return true;}
function show(on){ensure();shown=!!on&&!!active;desk.classList.toggle("on",shown);document.body.classList.toggle("ing-desk-on",shown);
  [].forEach.call(desk.querySelectorAll("iframe"),function(f){f.classList.toggle("on",shown&&f.getAttribute("data-app")===active);});
  syncFab();paint();}
function closeApp(which,quiet){var f=frameOf(which);if(f){capture(f,which);delete A.frames["desk:"+which];f.remove();}
  var i=open.indexOf(which);if(i>=0)open.splice(i,1);
  if(active===which)active=open.length?open[open.length-1]:null;
  if(LITE&&!open.length){closeLite();return;}
  show(shown&&!!active);}
function paint(){ensure();var ids=Object.keys(wins);
  var lt=Object.keys(lites),any=open.length+ids.length+lt.length;bar.classList.toggle("on",!!any&&!LITE);
  if(front&&(!wins[front]||wins[front].classList.contains("folded")))front=null;
  var cur=shown?active:front;
  if(!any){bar.innerHTML="";bar.removeAttribute("data-sig");return;}
  /* Carpe Diem's bar: Desk, each app open full width, then each floating window (a second document reads "Tabula (2)");
     a window folded away keeps its tab, drawn hollow, and the tab brings it back */
  var h='<button type="button" data-tab="__desk" role="tab">Desk</button>';
  function tab(id,nm,tip){return '<button type="button" data-tab="'+id+'" role="tab" title="'+tip+'"><span class="dot" style="background:'+DOT[baseOf(id)]+'"></span>'+nm+'</button>'
    +'<button type="button" class="x" data-tabx="'+id+'" title="Close '+nm+'" aria-label="Close '+nm+'">✕</button>';}
  open.forEach(function(w){h+=tab(w,N[w],N[w]);});
  ids.forEach(function(id){h+=tab(id,label(id),label(id)+", in its floating window");});
  /* 6.2: an app in a window of its own keeps a tab here: the tab brings that window forward, its ✕ brings the app back */
  lt.forEach(function(t){var w=lites[t].which;h+='<button type="button" data-tab="lite:'+t+'" data-lite="1" role="tab" title="'+N[w]+', in a window of its own: press to bring it forward">'
    +'<span class="dot" style="background:'+DOT[w]+'"></span>'+N[w]+'<span class="own" aria-hidden="true">↗</span></button>'
    +'<button type="button" class="x" data-litex="'+t+'" title="Bring '+N[w]+' back into this desk" aria-label="Bring '+N[w]+' back into this desk">⤓</button>';});
  /* a change of which tab is lit only repaints the light, so a press never lands on a tab that moved under it */
  if(bar.getAttribute("data-sig")!==h){bar.setAttribute("data-sig",h);bar.innerHTML=h;}
  [].forEach.call(bar.querySelectorAll("[data-tab]"),function(t){var v=t.getAttribute("data-tab");t.classList.toggle("on",v==="__desk"?!cur:v===cur);
    var fw=wins[v]&&wins[v].classList.contains("folded");t.classList.toggle("folded",!!fw);
    if(wins[v])t.title=label(v)+(fw?", folded away: press to bring it back":", in its floating window");});}
function onBar(e){var t=e.target.closest("button");if(!t)return;var tab=t.getAttribute("data-tab"),x=t.getAttribute("data-tabx"),lx=t.getAttribute("data-litex");
  if(tab&&tab.indexOf("lite:")===0){liteForward(tab.slice(5));return;}
  if(lx){liteHome(lx);return;}
  /* Desk, as in Carpe Diem: the floating windows fold away into their tabs and Ingenium's own desk comes back */
  if(tab==="__desk"){Object.keys(wins).forEach(function(id){fold(wins[id],true);});front=null;show(false);return;}
  if(tab){if(open.indexOf(tab)>=0){active=tab;show(true);}else if(wins[tab])surface(wins[tab]);return;}
  if(x){if(open.indexOf(x)>=0)closeApp(x);else if(wins[x])closeWin(x);}}

/* ---------- the float key on the side column ---------- */
function syncFab(){if(!fab){fab=document.createElement("button");fab.id="fabFloat";fab.className="rail-btn";fab.type="button";
    fab.title="Open this app in a floating window";fab.setAttribute("aria-label",fab.title);fab.innerHTML=FLOAT_SVG;
    fab.onclick=function(){if(active&&shown)floatApp(active);};document.body.appendChild(fab);}
  fab.hidden=!(shown&&active)||!!LITE;}

/* ---------- floating windows: moved and sized from every edge, folded, filled, closed ---------- */
function floatApp(which){var f=frameOf(which);
  if(f){capture(f,which);delete A.frames["desk:"+which];f.remove();var i=open.indexOf(which);if(i>=0)open.splice(i,1);if(active===which)active=open.length?open[open.length-1]:null;}
  makeWin(which,1);show(false);}
function geoKey(id){return "ing_fw_geo_"+id;}
function clampGeo(g){var vw=Math.max(300,window.innerWidth),vh=Math.max(300,window.innerHeight);
  g.w=Math.max(280,Math.min(g.w,vw-12));g.h=Math.max(200,Math.min(g.h,vh-52));g.x=Math.max(6,Math.min(g.x,vw-g.w-6));g.y=Math.max(46,Math.min(g.y,vh-g.h-6));return g;}
function makeWin(which,n){var id=which+(n>1?"-"+n:"");if(wins[id]){surface(wins[id]);return wins[id];}
  var g=null;try{g=JSON.parse(localStorage.getItem(geoKey(id))||"null");}catch(e){}
  if(!g){var vw=Math.max(300,window.innerWidth),vh=Math.max(300,window.innerHeight),c=Object.keys(wins).length;
    var w=Math.min(900,Math.round(vw*0.94)),h=Math.min(640,Math.round(vh*0.86));g={w:w,h:h,x:Math.round((vw-w)/2)+c*22,y:Math.round((vh-h)/2)+c*22};}
  g=clampGeo(g);
  var win=document.createElement("div");win.className="ing-fw";win.id="ing-fw-"+id;win.setAttribute("role","dialog");win.setAttribute("aria-label",N[which]+(n>1?" "+n:""));
  win.style.cssText="left:"+g.x+"px;top:"+g.y+"px;width:"+g.w+"px;height:"+g.h+"px;";
  var barEl=document.createElement("div");barEl.className="ing-fw-bar";
  var ttl=document.createElement("span");ttl.className="ing-fw-title";ttl.textContent=N[which]+(n>1?" · "+n:"");barEl.appendChild(ttl);
  var keys=document.createElement("span");keys.className="ing-fw-keys";barEl.appendChild(keys);
  function key(txt,title,fn){var b=document.createElement("button");b.type="button";b.textContent=txt;b.title=title;b.setAttribute("aria-label",title);
    b.addEventListener("pointerdown",function(e){e.stopPropagation();});b.onclick=function(e){e.preventDefault();e.stopPropagation();fn(b);};keys.appendChild(b);return b;}
  if(n===1&&canExport())key("↗","Export this window: the same app, in a window of its own",function(){exportWin(id);}).setAttribute("data-ing-export","1");
  /* 6.2: back into the desk, full width, the work carried across (the owner's words, 22 October 2026: "The exported floating
     windows have no way back into Ingenium's main desk") */
  if(n===1)key("","Back into the desk, full width",function(){dockWin(id);}).innerHTML=DOCK_SVG;
  if(n===1&&(which==="tabula"||which==="abacus"||which==="slides"))key("＋","New window · a second document",function(){var k=2;while(wins[which+"-"+k]&&k<3)k++;if(wins[which+"-"+k]){surface(wins[which+"-"+k]);return;}makeWin(which,k);});
  key("−","Fold the window away into its tab on the Desk bar",function(){fold(win,true);});
  key("□","Fill the screen",function(b){var on=win.getAttribute("data-full")!=="1";
    if(on){var r=win.getBoundingClientRect();win.setAttribute("data-prev",[r.left,r.top,r.width,r.height].map(Math.round).join(","));win.setAttribute("data-full","1");
      win.style.left="6px";win.style.top="46px";win.style.width=Math.max(260,window.innerWidth-12)+"px";win.style.height=Math.max(180,window.innerHeight-52)+"px";}
    else{win.removeAttribute("data-full");var p=(win.getAttribute("data-prev")||"").split(",");if(p.length===4){win.style.left=p[0]+"px";win.style.top=p[1]+"px";win.style.width=p[2]+"px";win.style.height=p[3]+"px";}}
    b.title=on?"Restore the size":"Fill the screen";b.setAttribute("aria-label",b.title);raise(win);save(win,id);});
  key("✕","Close the window",function(){closeWin(id);});
  var body=document.createElement("div");body.className="ing-fw-body";body.setAttribute("data-notip","1");
  var ifr=mk(which,{inst:n>1?n:0},"fw:"+id);
  if(!ifr){toast("The whole "+N[which]+" is not inside this copy of the page.");return null;}
  body.appendChild(ifr);win.appendChild(barEl);win.appendChild(body);
  [["n","top:0;left:14px;right:14px;height:7px;cursor:ns-resize"],["s","bottom:0;left:14px;right:22px;height:8px;cursor:ns-resize"],["e","right:0;top:14px;bottom:22px;width:8px;cursor:ew-resize"],
   ["w","left:0;top:14px;bottom:14px;width:8px;cursor:ew-resize"],["nw","left:0;top:0;width:14px;height:14px;cursor:nwse-resize"],["ne","right:0;top:0;width:14px;height:14px;cursor:nesw-resize"],
   ["sw","left:0;bottom:0;width:14px;height:14px;cursor:nesw-resize"]].forEach(function(d){var e=document.createElement("div");e.className="ing-fw-edge";e.setAttribute("data-edge",d[0]);e.style.cssText=d[1];win.appendChild(e);drag(e,win,id,d[0]);});
  var grip=document.createElement("div");grip.className="ing-fw-grip";grip.setAttribute("data-edge","se");win.appendChild(grip);drag(grip,win,id,"se");
  drag(barEl,win,id,"move");
  win.addEventListener("pointerdown",function(){raise(win);if(front!==id){front=id;paint();}},true);
  wins[id]=win;document.body.appendChild(win);raise(win);front=id;paint();return win;}
/* the window last brought forward stands on top; the count starts again before it could climb over Ingenium's sheets */
function raise(win){Z++;if(Z>1800){var all=Object.keys(wins).map(function(k){return wins[k];}).sort(function(a,b){return (+a.style.zIndex||0)-(+b.style.zIndex||0);});
    Z=600;all.forEach(function(w){if(w!==win){Z++;w.style.zIndex=String(Z);}});Z++;}win.style.zIndex=String(Z);}
function fold(win,on){if(!win)return;win.classList.toggle("folded",!!on);var id=(win.id||"").replace(/^ing-fw-/,"");if(on&&front===id)front=null;paint();}
function save(win,id){try{if(win.getAttribute("data-full")==="1"||win.classList.contains("folded"))return;var r=win.getBoundingClientRect();
    localStorage.setItem(geoKey(id),JSON.stringify({x:Math.round(r.left),y:Math.round(r.top),w:Math.round(r.width),h:Math.round(r.height)}));}catch(e){}}
function drag(handle,win,id,mode){handle.addEventListener("pointerdown",function(e){if(e.button>0)return;if(mode==="move"&&e.target.closest("button"))return;
    e.preventDefault();var r=win.getBoundingClientRect(),sx=e.clientX,sy=e.clientY,g={x:r.left,y:r.top,w:r.width,h:r.height};win.classList.add("moving");raise(win);
    try{handle.setPointerCapture(e.pointerId);}catch(x){}
    function mv(ev){var dx=ev.clientX-sx,dy=ev.clientY-sy,x=g.x,y=g.y,w=g.w,h=g.h;
      if(mode==="move"){x+=dx;y+=dy;}
      else{if(mode.indexOf("e")>=0)w=g.w+dx;if(mode.indexOf("s")>=0)h=g.h+dy;if(mode.indexOf("w")>=0){w=g.w-dx;x=g.x+dx;}if(mode.indexOf("n")>=0){h=g.h-dy;y=g.y+dy;}
        if(w<280){if(mode.indexOf("w")>=0)x-=280-w;w=280;}if(h<160){if(mode.indexOf("n")>=0)y-=160-h;h=160;}}
      var vw=window.innerWidth,vh=window.innerHeight;x=Math.max(-w+120,Math.min(x,vw-80));y=Math.max(0,Math.min(y,vh-40));
      win.style.left=Math.round(x)+"px";win.style.top=Math.round(y)+"px";if(mode!=="move"){win.style.width=Math.round(w)+"px";win.style.height=Math.round(h)+"px";win.removeAttribute("data-full");}}
    function up(){win.classList.remove("moving");handle.removeEventListener("pointermove",mv);handle.removeEventListener("pointerup",up);handle.removeEventListener("pointercancel",up);save(win,id);}
    handle.addEventListener("pointermove",mv);handle.addEventListener("pointerup",up);handle.addEventListener("pointercancel",up);});}
function surface(win){try{win.classList.remove("folded");front=(win.id||"").replace(/^ing-fw-/,"");
    var r=win.getBoundingClientRect(),g=clampGeo({x:r.left,y:r.top,w:r.width,h:r.height});win.style.left=g.x+"px";win.style.top=g.y+"px";win.style.width=g.w+"px";win.style.height=g.h+"px";
    raise(win);win.classList.remove("hail");void win.offsetWidth;win.classList.add("hail");setTimeout(function(){win.classList.remove("hail");},1100);paint();}catch(e){}}
/* a floating window goes back into the desk: its work is taken as it stands and handed to the app, full width */
function dockWin(id){var w=wins[id];if(!w)return;var which=baseOf(id),f=w.querySelector("iframe");if(f)capture(f,which);delete A.frames["fw:"+id];
  w.remove();delete wins[id];if(front===id)front=null;openApp(which);}
function closeWin(id){var w=wins[id];if(!w)return;var f=w.querySelector("iframe");if(f)capture(f,id.split("-")[0]);delete A.frames["fw:"+id];w.remove();delete wins[id];if(front===id)front=null;paint();}

/* ---------- a window of its own ---------- */
function shell(){try{if(typeof shellApi==="function"){var a=shellApi();if(a)return a;}}catch(e){}try{return (window.pywebview&&window.pywebview.api)||null;}catch(e){return null;}}
/* where a second window can be had at all: not inside the Fire, Android, iPhone or iPad app's own web view, and in the
   Mac and Windows apps only where the app can open one itself */
function canExport(){try{var ua=navigator.userAgent||"";
    if(/; wv\)|\bwv\b.*Chrome\/|Android.*Version\/[\d.]+.*Chrome\//.test(ua))return false;
    var api=shell();if(api&&(window.pywebview||typeof api.big_put==="function"))return typeof api.open_lite==="function";
    if(window.webkit&&window.webkit.messageHandlers&&!/Safari\//.test(ua))return false;
    return typeof window.open==="function";}catch(e){return false;}}
function hold(win){try{var b=win.querySelector(".ing-fw-body");if(!b)return null;var v=document.createElement("div");v.className="ing-fw-veil";v.setAttribute("role","status");v.textContent="Opening in a window of its own…";b.appendChild(v);
    /* the new window reads the whole page before it can take the app: say how long it has been */
    var t0=Date.now();v.__t=setInterval(function(){var s=Math.round((Date.now()-t0)/1000);if(s>=4)v.textContent="Opening in a window of its own… the new window is starting ("+s+" s)";},1000);return v;}catch(e){return null;}}
function unhold(v){try{if(v){clearInterval(v.__t);v.remove();}}catch(e){}}
function waitAck(tok,ms,gone){return new Promise(function(res){var t0=Date.now();(function look(){var v=null;try{v=localStorage.getItem("ing_lite_ack_"+tok);}catch(e){}
    if(v){try{localStorage.removeItem("ing_lite_ack_"+tok);}catch(e){}res(true);return;}if(Date.now()-t0>ms||(gone&&gone())){res(false);return;}setTimeout(look,200);})();});}
function drop(tok){try{localStorage.removeItem("ing_lite_"+tok);}catch(e){}}
function takenBy(api,tok,ms){return new Promise(function(res){var t0=Date.now();(function look(){Promise.resolve().then(function(){return api.lite_taken(tok);}).then(function(v){
    if(v===true){res(true);return;}if(Date.now()-t0>ms){res(false);return;}setTimeout(look,250);},function(){if(Date.now()-t0>ms){res(false);return;}setTimeout(look,250);});})();});}
function exportWin(id){var win=wins[id];if(!win)return;var which=id.split("-")[0],f=win.querySelector("iframe");if(f)capture(f,which);
  var tok="w"+Date.now().toString(36)+Math.random().toString(36).slice(2,8),ho=(window.__cdHandoff||{})[which]||null;
  try{if(window.__cdHandoff)delete window.__cdHandoff[which];}catch(e){}
  try{localStorage.setItem("ing_lite_"+tok,JSON.stringify({which:which,handoff:ho,at:Date.now()}));}catch(e){}
  var veil=hold(win),url=location.href.split("#")[0]+"#ingapp="+which+"&tok="+tok,api=shell();
  function done(ok,why){unhold(veil);if(ok){closeWin(id);lites[tok]={which:which,at:Date.now()};paint();return;}drop(tok);if(ho){window.__cdHandoff=window.__cdHandoff||{};window.__cdHandoff[which]=ho;}toast(why);}
  if(api&&typeof api.open_lite==="function"){drop(tok);
    /* the Mac and Windows apps open the window themselves and carry the work across; the app here lets go only once the
       new window has taken it, and a window too slow to take it is closed */
    Promise.resolve().then(function(){return api.open_lite(JSON.stringify({which:which,tok:tok,url:url,title:N[which],handoff:ho}));}).then(function(r){
      /* 6.2: 90 seconds, not 15: on a slower Mac the new window could still be reading the page when it was closed, so no
         second window ever showed (the owner's words, 22 October 2026: "a second window is not made") */
      if(r===true||(r&&r.ok===true)){takenBy(api,tok,90000).then(function(ok){if(!ok){try{api.lite_cancel(tok);}catch(e){}}
          done(ok,"The new window took too long to open, so it was closed and "+N[which]+" stays here, as it was.");});return;}
      done(false,r&&r.why==="safety"?"Ingenium closed unexpectedly last time while an app had a window of its own, so for now apps open here. Next time, ↗ offers windows of their own again."
        :"This copy of Ingenium cannot open a second window, so "+N[which]+" stays here.");},function(){done(false,"A second window could not be opened, so "+N[which]+" stays here.");});
    return;}
  var ref=null;try{ref=window.open(url,"ing-"+tok,"width=1180,height=840");}catch(e){}
  /* a window the browser refused is known at once; one that opens is waited for while it reads the page, unless it is closed */
  var said="The browser kept no new window, so "+N[which]+" stays here, as it was. Allow pop-up windows for Ingenium to send apps outside.";
  if(!ref){done(false,said);return;}liteRefs[tok]=ref;
  waitAck(tok,60000,function(){return ref.closed;}).then(function(ok){done(ok,"The browser kept no new window, so "+N[which]+" stays here, as it was. Allow pop-up windows for Ingenium to send apps outside.");});}
/* the main window: a window of its own brought forward, or asked to send its app back into this desk */
function liteForward(tok){var api=shell();
  if(api&&typeof api.lite_focus==="function"){Promise.resolve().then(function(){return api.lite_focus(tok);}).then(function(r){if(r===false){delete lites[tok];paint();toast("That window is closed.");}},function(){});return;}
  var w=liteRefs[tok];if(w&&!w.closed){try{w.focus();}catch(e){}return;}delete lites[tok];delete liteRefs[tok];paint();toast("That window is closed.");}
function liteHome(tok){var api=shell();
  if(api&&typeof api.lite_cmd==="function"){Promise.resolve().then(function(){return api.lite_cmd(tok,"home");}).then(function(r){if(r===false){delete lites[tok];paint();}},function(){});return;}
  var w=liteRefs[tok];if(!w||w.closed){delete lites[tok];delete liteRefs[tok];paint();return;}
  try{localStorage.setItem("ing_lite_cmd_"+tok,"home");}catch(e){}}
/* in a browser a window of its own is a pop-up: one closed by hand loses its tab here */
setInterval(function(){var gone=false;Object.keys(liteRefs).forEach(function(t){var w=liteRefs[t];if(!w||w.closed){delete liteRefs[t];if(lites[t]){delete lites[t];gone=true;}}});if(gone)paint();},2000);
/* a window of its own: its app goes back into the main window's desk, the work carried across, and the window closes */
function goHome(){if(!LITE)return;var f=frameOf(LITE.which),ho=null;if(f){capture(f,LITE.which);ho=(window.__cdHandoff||{})[LITE.which]||null;}
  post({kind:"home",which:LITE.which,tok:LITE.tok,handoff:ho}).then(function(ok){if(ok){setTimeout(closeLite,300);return;}
    toast("Ingenium’s main window could not be reached, so "+N[LITE.which]+" stays in this window.");});}
function liteCmds(){if(!LITE||!LITE.tok)return;var api=shell();
  if(api&&typeof api.lite_cmds==="function"){Promise.resolve().then(function(){return api.lite_cmds(LITE.tok);}).then(function(t){var a=[];try{a=JSON.parse(t||"[]");}catch(e){}if(a.indexOf("home")>=0)goHome();},function(){});return;}
  try{var k="ing_lite_cmd_"+LITE.tok,v=localStorage.getItem(k);if(v){localStorage.removeItem(k);if(v==="home")goHome();}}catch(e){}}
function liteHomeKey(){if(!LITE||document.getElementById("ingLiteHome"))return;var b=document.createElement("button");b.id="ingLiteHome";b.type="button";
  b.innerHTML=DOCK_SVG+"<span>Back to Ingenium’s desk</span>";b.title="Put "+N[LITE.which]+" back into Ingenium’s main window, your work with it";b.onclick=goHome;document.body.appendChild(b);}
function closeLite(){var api=shell();try{if(api&&typeof api.close_lite==="function"&&LITE){api.close_lite(LITE.tok);return;}}catch(e){}try{window.close();}catch(e){}}
function liteBoot(){document.documentElement.classList.add("ing-lite");
  function go2(p){if(p&&p.handoff){window.__cdHandoff=window.__cdHandoff||{};window.__cdHandoff[LITE.which]=p.handoff;}
    try{hideIntro();}catch(e){}openApp(LITE.which);document.title=N[LITE.which]+" · Ingenium";
    if(LITE.tok){try{localStorage.setItem("ing_lite_ack_"+LITE.tok,String(Date.now()));}catch(e){}}}
  var p=null;if(LITE.tok){try{p=JSON.parse(localStorage.getItem("ing_lite_"+LITE.tok)||"null");localStorage.removeItem("ing_lite_"+LITE.tok);}catch(e){}}
  if(p||!LITE.tok){go2(p);return;}
  /* in the Mac and Windows apps the parcel waits in the app itself; its bridge may take a moment to be ready */
  var n=0;(function ask(){var api=shell();if(api&&typeof api.lite_take==="function"){Promise.resolve().then(function(){return api.lite_take(LITE.tok);}).then(function(t){var q=null;try{q=t?JSON.parse(t):null;}catch(e){}go2(q);},function(){go2(null);});return;}
    if(++n>20){go2(null);return;}setTimeout(ask,150);})();}

/* ---------- the windows share one desk; the main window alone writes it ---------- */
/* The side buttons work in a window of its own as on the main page. What they keep (the notes, the reminders, the
   thought Inbox, day and night, the Clepsydra's settings) is shared by every window through a small common store: in
   the Mac and Windows apps the app itself holds it, and in a browser this browser's storage does. Each window takes in
   what another changed. The main window alone writes the saved desk, so a window of its own can never write an older
   desk over a newer one; what it changes reaches the saved desk through the main window (or, if that window is
   closed, when Ingenium next starts). If two windows change the same thing at the same moment, the later change
   stands. The notes keep their place on the main page: moving a note in a window of its own moves it there only. */
var SYNC=["notes","reminders","parked","theme","clep"],HUBK="ing_lite_hub",QP="ing_lite_q_";
var ME=(LITE?"L":"M")+Date.now().toString(36)+Math.random().toString(36).slice(2,6),sent={},seen={},hubSeq=0,hubReady=false,base={};
function js(v){try{return JSON.stringify(v===undefined?null:v);}catch(e){return "";}}
function hubApi(){var a=shell();return a&&typeof a.lite_hub_put==="function"&&typeof a.lite_hub_get==="function"?a:null;}
function hubRead(){var api=hubApi();
  if(api)return Promise.resolve().then(function(){return api.lite_hub_get(hubSeq);}).then(function(t){var o=null;try{o=JSON.parse(t||"null");}catch(e){}
      if(!o||typeof o!=="object")return {};if(typeof o.seq==="number")hubSeq=o.seq;var out={};
      Object.keys(o.keys||{}).forEach(function(k){var e=o.keys[k];try{out[k]={v:JSON.parse(e.v),by:e.by,at:e.at};}catch(x){}});return out;},function(){return {};});
  try{return Promise.resolve(JSON.parse(localStorage.getItem(HUBK)||"{}")||{});}catch(e){return Promise.resolve({});}}
function hubWrite(keys){var api=hubApi(),at=Date.now();
  if(api){var p={by:ME,at:at,keys:{}};Object.keys(keys).forEach(function(k){p.keys[k]=js(keys[k]);});
    return Promise.resolve().then(function(){return api.lite_hub_put(JSON.stringify(p));}).then(function(){},function(){});}
  try{var h=JSON.parse(localStorage.getItem(HUBK)||"{}")||{};Object.keys(keys).forEach(function(k){h[k]={v:keys[k],by:ME,at:at};});localStorage.setItem(HUBK,JSON.stringify(h));}catch(e){}
  return Promise.resolve();}
/* a window of its own hands on notes with the main page's places, so its own moves never move them there */
function outgoing(k,v){if(!LITE||k!=="notes"||!Array.isArray(v)||!Array.isArray(base.notes))return v;var at={};base.notes.forEach(function(n){if(n&&n.id)at[n.id]=n;});
  return v.map(function(n){var b=n&&n.id&&at[n.id];if(!b)return n;var c={};for(var q in n)c[q]=n[q];c.x=b.x;c.y=b.y;return c;});}
function push(){if(!hubReady)return;var ch={},any=false;SYNC.forEach(function(k){var v=outgoing(k,state[k]),t=js(v);if(t!==sent[k]){sent[k]=t;ch[k]=v;any=true;}});if(any)hubWrite(ch);}
var pushT=0;function pushSoon(){clearTimeout(pushT);pushT=setTimeout(push,200);}
function editingNote(){try{var a=document.activeElement;return !!(a&&a.closest&&a.closest(".sticky-note,#schedaePanel"));}catch(e){return false;}}
function redraw(k){try{
  if(k==="notes"){renderStickyPins();updateNotesCount();if(document.getElementById("schedaePanel")){closeSchedae();openSchedae();}}
  else if(k==="reminders")bellRefresh();
  else if(k==="parked"){if(window.IngInbox){IngInbox.tc.refresh();IngInbox.tc.badge();}}
  else if(k==="theme")applyTheme();
  else if(k==="clep"){pomoRender();pomoPill();}}catch(e){}}
/* take in what another window changed; the main window then keeps it in the saved desk */
function takeIn(entries,floor){var got=[],wait=false;
  SYNC.forEach(function(k){var e=entries[k];if(!e||e.by===ME)return;var at=+e.at||0;if(at<=(seen[k]||floor||0))return;
    if(k==="notes"&&editingNote()){wait=true;return;}
    seen[k]=at;if(k==="notes")base.notes=e.v;var t=js(e.v);if(t===js(state[k]))return;state[k]=e.v;sent[k]=js(outgoing(k,e.v));got.push(k);});
  got.forEach(redraw);if(got.length&&!LITE){try{saveState();}catch(e){}}return wait;}
function hubPull(){hubRead().then(function(h){takeIn(h,0);});}
function hubStart(){var floor=+(state.__deskAt||0);
  hubRead().then(function(h){takeIn(h,floor);
    SYNC.forEach(function(k){sent[k]=js(outgoing(k,state[k]));if(!seen[k])seen[k]=floor;});base.notes=state.notes;hubReady=true;
    /* the main window lays down what it holds, for windows that open later */
    if(!LITE){var all={};SYNC.forEach(function(k){all[k]=state[k];});hubWrite(all);}
    if(typeof saveState==="function"&&!saveState.__ingHub){var _ss=saveState;saveState=function(){var r=_ss.apply(this,arguments);pushSoon();return r;};saveState.__ingHub=1;window.saveState=saveState;}
    setInterval(hubPull,1200);
    window.addEventListener("storage",function(ev){if(!ev||!ev.key)return;if(ev.key===HUBK)hubPull();else if(!LITE&&ev.key.indexOf(QP)===0)drain();});
    if(!LITE){drain();setInterval(drain,1500);}});}
/* what a window of its own asks of the main window: to show a page, or to take a thought to the chat or to Steps */
function post(item){item.at=Date.now();var api=shell();
  if(api&&typeof api.lite_post==="function")return Promise.resolve().then(function(){return api.lite_post(JSON.stringify(item));}).then(function(r){return r===true;},function(){return false;});
  try{localStorage.setItem(QP+Date.now().toString(36)+Math.random().toString(36).slice(2,8),JSON.stringify(item));return Promise.resolve(true);}catch(e){return Promise.resolve(false);}}
function take(it){if(!it||typeof it!=="object")return;
  /* 6.2: an app comes home from a window of its own; a window of its own was closed */
  if(it.kind==="home"&&APPS.indexOf(it.which)>=0){if(it.tok)delete lites[it.tok];if(it.handoff){window.__cdHandoff=window.__cdHandoff||{};window.__cdHandoff[it.which]=it.handoff;}
    var fr=frameOf(it.which);if(fr){delete A.frames["desk:"+it.which];fr.remove();var j=open.indexOf(it.which);if(j>=0)open.splice(j,1);}
    openApp(it.which);try{var api=shell();if(api&&typeof api.main_focus==="function")api.main_focus();else window.focus();}catch(e){}paint();return;}
  if(it.kind==="gone"&&typeof it.tok==="string"){if(lites[it.tok]){delete lites[it.tok];paint();}return;}
  if(it.kind==="go"&&typeof it.page==="string"&&/^[a-z]{2,20}$/.test(it.page)&&APPS.indexOf(it.page)<0){try{if(document.getElementById("page-"+it.page))go(it.page);}catch(e){}return;}
  if(it.kind==="place"&&typeof it.t==="string"&&(it.key==="task"||it.key==="chat")){try{var pl=IngInbox.places.filter(function(x){return x.key===it.key;})[0];if(pl)pl.run({t:it.t.slice(0,2000)},IngInbox.tc);}catch(e){}}}
function drain(){var api=shell();
  if(api&&typeof api.lite_inbox==="function")Promise.resolve().then(function(){return api.lite_inbox();}).then(function(t){var a=[];try{a=JSON.parse(t||"[]");}catch(e){}
      (Array.isArray(a)?a:[]).forEach(function(x){try{take(typeof x==="string"?JSON.parse(x):x);}catch(e){}});},function(){});
  try{var ks=[];for(var i=0;i<localStorage.length;i++){var k=localStorage.key(i);if(k&&k.indexOf(QP)===0)ks.push(k);}ks.sort();
    ks.forEach(function(k){var v=localStorage.getItem(k);localStorage.removeItem(k);if(v){try{take(JSON.parse(v));}catch(e){}}});}catch(e){}}
function pageName(p){try{var b=document.querySelector('.nav-btn[data-page="'+p+'"]');return b?b.textContent.trim():p;}catch(e){return p;}}
var liteLive=false;
function liteSide(){
  /* a thought sent to the chat or to Steps goes to the main window, where those pages are */
  try{IngInbox.places.forEach(function(pl){if(pl.key!=="task"&&pl.key!=="chat")return;pl.run=function(it,tc){try{tc.closeInbox();}catch(e){}
      post({kind:"place",key:pl.key,t:String(it.t||"")}).then(function(ok){toast(ok?(pl.key==="chat"?"Sent to the chat in Ingenium’s main window.":"Sent to Steps in Ingenium’s main window.")
        :"Ingenium’s main window could not be reached, so the thought stays in the Inbox.");});};});}catch(e){}
  setTimeout(function(){liteLive=true;},2500);
  liteHomeKey();setInterval(liteCmds,1000);}

/* ---------- the apps' requests: open another, close, a new window ---------- */
function srcOf(ev){var r=null;if(desk)[].forEach.call(desk.querySelectorAll("iframe"),function(f){if(f.contentWindow===ev.source)r={kind:"desk",which:f.getAttribute("data-app")};});
  Object.keys(wins).forEach(function(id){var f=wins[id].querySelector("iframe");if(f&&f.contentWindow===ev.source)r={kind:"fw",id:id,which:id.split("-")[0]};});return r;}
function onMessage(d,ev){var s=srcOf(ev);if(!s)return false;
  if(d.kind==="carpe-open"){if(APPS.indexOf(d.which)>=0){if(LITE)window.open(location.href.split("#")[0]+"#ingapp="+d.which,"_blank");else openApp(d.which,{only:true});}return true;}
  if(d.kind==="carpe-close"){if(LITE)closeLite();else if(s.kind==="desk")closeApp(s.which);else closeWin(s.id);return true;}
  /* the app's own "new window" is Carpe Diem's ＋: a second document, in a floating window of its own */
  if(d.kind==="carpe-new-window"){var w=APPS.indexOf(d.which)>=0?d.which:s.which;if(w==="tabula"||w==="abacus"||w==="slides"){var k=2;while(wins[w+"-"+k]&&k<3)k++;makeWin(w,k);}return true;}
  return false;}

/* ---------- Ingenium's own ways in: the side list, the home tiles, go() ---------- */
/* what is sent to an app already open (Lector's document, a note, a table from a reply) goes into it: a running Tabula
   takes a document from its storage line, as in Carpe Diem, and Abacus takes a table through the host */
function handOn(which){try{if(which==="tabula")A.hand.tabula();
    else if(which==="abacus"){var f=frameOf(which)||(wins.abacus&&wins.abacus.querySelector("iframe"));if(f)A.hand.abacus(f);}}catch(e){}}
/* the older ways in (Lector's "To Tabula", a note sent to Tabula, a table sent to Abacus, the old #ingenium= address and
   the old apps dock) reach the app on the Desk; nothing is built on Ingenium's old hidden app pages any more */
window.buildTabula=function(){handOn("tabula");};window.buildAbacus=function(){handOn("abacus");};
window.openApp=function(w){if(APPS.indexOf(w)>=0)return openApp(w);};
(function routes(){if(typeof go!=="function")return;var o=go;go=function(page){if(APPS.indexOf(page)>=0){openApp(page);return;}
  /* in a window of its own, Ingenium's own pages open in the main window */
  if(LITE){if(liteLive){post({kind:"go",page:String(page)}).then(function(ok){toast(ok?pageName(page)+" is open in Ingenium’s main window.":"Ingenium’s main window could not be reached.");});return;}return o.apply(this,arguments);}
  if(shown)show(false);return o.apply(this,arguments);};window.go=go;})();
(function nav(){var ab=document.querySelector('.nav-btn[data-page="abacus"]');if(!ab)return;var after=ab;
  var SV='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">';
  [["slides","Imago",SV+'<rect x="3" y="4" width="18" height="12" rx="1.5"/><path d="M12 16v4M8 20h8"/></svg>'],
   ["scriba","Scriba",SV+'<rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3"/></svg>'],
   ["fontes","Fontes",SV+'<path d="M4 5h6a2 2 0 0 1 2 2v13a2 2 0 0 0-2-2H4z"/><path d="M20 5h-6a2 2 0 0 0-2 2v13a2 2 0 0 1 2-2h6z"/></svg>']].forEach(function(x){
    if(document.querySelector('.nav-btn[data-page="'+x[0]+'"]'))return;var b=document.createElement("button");b.className="nav-btn";b.type="button";b.setAttribute("data-page",x[0]);
    b.innerHTML=x[2]+x[1];b.onclick=function(){go(x[0]);};after.parentNode.insertBefore(b,after.nextSibling);after=b;});})();
/* the tour says how the apps open now */
(function words(){try{ING_TOUR.forEach(function(s){if(s.sub==="Tabula and Abacus"){s.t="📚 The apps, as in Carpe Diem";
    s.b="Tabula (writing), Abacus (tables), Imago (slides), Scriba (recordings and notes) and Fontes (sources) are Carpe Diem's own apps, whole. Each opens full width with the Desk bar at the top; Desk brings Ingenium back. The ↗ on the side column floats the app into a window you can move, size from any edge or fill the screen with. Every floating window keeps a tab on the Desk bar: − folds the window away into its tab, the tab brings it back and its ✕ closes it. A window's ↗ sends the app to a window of its own where the device allows one, and that window carries every side button too: the bell, the leaf, the 💭, day and night, the Clepsydra and the notes.";}});/* R125: the chapter's own words name the five apps */if(typeof ING_TOUR_TEASERS==="object")ING_TOUR_TEASERS["Making things"]="Build, Blend, and Carpe Diem's five apps.";if(typeof ING_TOUR_CLOSERS==="object")ING_TOUR_CLOSERS["Making things"]="Build, Blend and Carpe Diem's five apps turn answers into things you keep.";}catch(e){}})();
window.addEventListener("resize",function(){Object.keys(wins).forEach(function(id){var w=wins[id];if(w.getAttribute("data-full")==="1"){w.style.width=Math.max(260,window.innerWidth-12)+"px";w.style.height=Math.max(180,window.innerHeight-52)+"px";}});});

window.IngDesk={open:openApp,close:closeApp,float:floatApp,window:makeWin,closeWindow:closeWin,exportWindow:exportWin,canExport:canExport,show:show,onMessage:onMessage,
  dock:dockWin,lites:function(){return JSON.parse(JSON.stringify(lites));},liteForward:liteForward,liteHome:liteHome,goHome:goHome,
  fold:function(id,on){fold(wins[id],on!==false);},surface:function(id){if(wins[id])surface(wins[id]);},
  state:function(){return {open:open.slice(),active:active,shown:shown,windows:Object.keys(wins),folded:Object.keys(wins).filter(function(k){return wins[k].classList.contains("folded");}),front:front,lite:LITE};}};
if(LITE){document.documentElement.classList.add("ing-lite");try{ensure();}catch(e){}var tries=0;(function wait(){if(document.body&&(window.__ingReady===true||++tries>40)){liteBoot();try{liteSide();hubStart();}catch(e){}return;}setTimeout(wait,150);})();}
else{var tries2=0;(function wait2(){if(window.__ingReady===true||++tries2>60){try{hubStart();}catch(e){}return;}setTimeout(wait2,250);})();}
})();
;try{window.__ingParts["p53"]="running";}catch(_){}
</script>
