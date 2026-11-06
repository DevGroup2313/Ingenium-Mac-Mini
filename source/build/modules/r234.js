<style id="r234-css">
/* ============ R234 · SETTINGS WITHOUT THE LONG SCROLL (Ingenium 6.33, 6 November 2026) ============
   Her words (5 November 2026): "The "Your data" tab page of the Settings page needs to be redesigned and reorganised because its still a
   lot of scrolling on all of its tabs."
   Measured on 6.28 (and the same on 6.32) at 1440 x 900, each room of Settings: Everyday 1,615 pixels, Calm and focus 1,210, Models and AI 2,945, Your data
   2,792 (3,281 with Backup's Moving open: its four steps one under another, and Storage 1,028 on its own), Ownership 1,067, Author
   Studio 1,607.
   Now (modules/r173.js keeps the rooms; this part works inside them, and never in "Show every setting at once", one long page by choice):
   - Your data in four sections, one at a time, under a row of raised keys with their line: Bring in, Back up and move, Storage, Sign-in
     and reset (the sign-in, the older one-file backup and Reset everything); Backup's Moving shows its four steps two by two; Storage
     shows the gauge, your limit and old copies beside what takes the room, with the app library under both;
   - Models and AI in four sections the same way: Your Ingenium, Connections (online and home models, connectors), Search and eyes,
     Your devices;
   - Everyday's five small cards in two columns on a wide window;
   - the section chosen last is kept on this device, room by room; anything that finds, scrolls to, focuses or rings a setting in
     another section (Find a setting, Help's Show me, the tour) opens its section first. */
#page-settings .dx-bar{display:flex;flex-wrap:wrap;align-items:center;gap:8px;margin:4px 0 4px}
#page-settings .dx-tab{display:inline-flex;align-items:center;gap:7px;min-height:36px;margin:0;padding:6px 14px 6px 10px;border-radius:12px;border:1px solid var(--hairline);
  background:linear-gradient(180deg,var(--card-hi),var(--card-lo));box-shadow:var(--pop);color:var(--ink-2);font:600 12.8px/1.2 var(--sans);cursor:pointer;
  -webkit-tap-highlight-color:transparent;touch-action:manipulation;transition:transform .16s var(--spring,cubic-bezier(.2,.8,.2,1)),box-shadow .16s ease}
#page-settings .dx-tab svg{width:15px;height:15px;flex:0 0 auto;color:var(--accent)}
#page-settings .dx-tab:hover{transform:translateY(-2px);box-shadow:var(--pop-hi,var(--pop));color:var(--ink-1)}
#page-settings .dx-tab:active{transform:translateY(1px);transition-duration:.06s}
#page-settings .dx-tab[aria-selected="true"]{color:#fff;background:linear-gradient(180deg,var(--rm-pa,#7348be),var(--rm-pb,#5d37a1));border-color:var(--rm-pedge,#4b2a86);box-shadow:var(--rm-psh);text-shadow:0 1px 1px rgba(30,10,60,.32)}
#page-settings .dx-tab[aria-selected="true"] svg{color:#fff}
#page-settings .dx-tab:focus-visible{outline:2.5px solid var(--rm-focus,var(--accent));outline-offset:3px}
#page-settings .dx-says{margin:2px 2px 12px;font-size:12.8px;line-height:1.5;color:var(--ink-2);max-width:74ch}
#page-settings.rm-all .dx-bar,#page-settings.rm-all .dx-says{display:none !important}
#page-settings:not(.rm-all) .rm-panel > .dx-off{display:none !important}
#page-settings:not(.rm-all) .rm-panel > .dx-on{animation:dxIn .32s cubic-bezier(.2,.8,.2,1) backwards}
@keyframes dxIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}
/* Backup's Moving: the four steps two by two */
@media (min-width:900px){#page-settings:not(.rm-all) #bkSteps{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px;align-items:stretch}
  #page-settings:not(.rm-all) #bkSteps > li{margin:0 !important}}
/* Storage: the room it takes, beside your limit and old copies; the library under both */
#stxCard .dx-cols{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:0 28px;align-items:start}
#stxCard .dx-col > :first-child{margin-top:0}
#stxCard .dx-col > h3.stx-h:first-child{margin-top:4px}
@media (max-width:899px){#stxCard .dx-cols{grid-template-columns:minmax(0,1fr)}}
#page-settings.rm-all #stxCard .dx-cols{grid-template-columns:minmax(0,1fr)}
/* Everyday: its small cards in two columns */
@media (min-width:1100px){#page-settings:not(.rm-all) #rmP-settings-everyday.dx-two{column-count:2;column-gap:16px}
  #page-settings:not(.rm-all) #rmP-settings-everyday.dx-two > .card{display:block;break-inside:avoid;-webkit-column-break-inside:avoid;margin:0 0 16px !important}
  #page-settings:not(.rm-all) #rmP-settings-everyday.dx-two > .rm-roomh{column-span:all}}
@media (max-width:600px){#page-settings .dx-tab{padding:6px 11px 6px 8px}}
body[data-motion="minimal"] #page-settings .rm-panel > .dx-on{animation:none !important}
body[data-motion="minimal"] #page-settings .dx-tab{transition:none !important}
@media (prefers-reduced-motion:reduce){#page-settings .rm-panel > .dx-on{animation:none !important}#page-settings .dx-tab{transition:none !important}}
</style>
<script>try{(window.__ingParts=window.__ingParts||{})["p234"]="started";}catch(_){}
/* R234 · Settings without the long scroll: see the note at the top of its styles. window.IngSettingsParts */
(function r234(){"use strict";
if(window.IngSettingsParts)return;
var W=window,D=document;
function $(id){return D.getElementById(id);}
function mk(tag,cls,txt){var e=D.createElement(tag);if(cls)e.className=cls;if(txt!=null)e.textContent=txt;return e;}
function svg(d){return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">'+d+'</svg>';}
function head(c){var h=c.querySelector("h2,h3");return h?String(h.textContent||"").replace(/\s+/g," ").trim().toLowerCase():"";}
function isCard(e){return !!(e&&e.nodeType===1&&(e.classList.contains("card")||e.id==="wsStudio"));}
/* each room's sections: which cards each holds (by id, or by the words its heading begins with); a card no section names goes to "rest" */
var ROOMS={
  data:{label:"Your data, in sections",rest:"lock",parts:[
    {k:"in",t:"Bring in",i:svg('<path d="M12 4v11"/><path d="M7.5 10.5L12 15l4.5-4.5"/><path d="M4.5 19.5h15"/>'),says:"Your conversations from other assistants, brought in as they came, read on this device.",m:["ingImportCard"]},
    {k:"backup",t:"Back up and move",i:svg('<rect x="3.5" y="4" width="17" height="5" rx="1.5"/><path d="M5 9v9.5A1.5 1.5 0 0 0 6.5 20h11a1.5 1.5 0 0 0 1.5-1.5V9"/><path d="M10 13h4"/>'),says:"Everything in one file, to keep somewhere safe or to carry to another device, and bringing it back.",m:["bkCard"]},
    {k:"storage",t:"Storage",i:svg('<path d="M4 7.5h16v9H4z"/><path d="M7.5 12h.01M11 12h6"/>'),says:"The room Ingenium takes on this device, the most it may take, and the old copies that can go.",m:["stxCard"]},
    {k:"lock",t:"Sign-in and reset",i:svg('<rect x="5" y="10.5" width="14" height="10" rx="2"/><path d="M8.5 10.5V7.8a3.5 3.5 0 0 1 7 0v2.7"/>'),says:"A sign-in that seals your data on this device, the older one-file backup, and starting afresh.",m:["ingLockCard",/^data on this device/]}]},
  ai:{label:"Models and AI, in sections",rest:"conn",parts:[
    {k:"you",t:"Your Ingenium",i:svg('<circle cx="12" cy="8.5" r="3.5"/><path d="M5 20c1.2-3.6 3.9-5.5 7-5.5s5.8 1.9 7 5.5"/>'),says:"Who you are and how you want answers: Ingenium's own instructions, then yours, for every chat and every model.",m:["personaCard"]},
    {k:"conn",t:"Connections",i:svg('<path d="M9 3.5v4M15 3.5v4"/><path d="M6.5 7.5h11v3a5.5 5.5 0 0 1-11 0z"/><path d="M12 16v4.5"/>'),says:"Models online or on your other computers, and the connectors that give a model tools.",m:[/^connect a cloud/,"cnCard"]},
    {k:"search",t:"Search and eyes",i:svg('<circle cx="11" cy="11" r="6.5"/><path d="M20 20l-4.3-4.3"/>'),says:"Web search with scholarly sources, and Ingenium's eyes for pictures and scanned pages.",m:[/^web search/,"ingEyesCard","ragCard"]},
    {k:"devices",t:"Your devices",i:svg('<rect x="2.8" y="4.5" width="13" height="9.5" rx="1.6"/><path d="M6 17.5h6.5"/><rect x="16.8" y="8" width="4.4" height="9.5" rx="1.2"/>'),says:"Your models on every device: a stronger computer lending its models to your laptop, tablet and phone.",m:["linkCard"]}]}};
var KEY="ing.settings.parts.v1",PREF={};
try{PREF=JSON.parse(W.localStorage.getItem(KEY)||"{}")||{};}catch(e){PREF={};}
function keep(){try{W.localStorage.setItem(KEY,JSON.stringify(PREF));}catch(e){}}
var CUR={};
function panel(r){return $("rmP-settings-"+r);}
function partFor(r,c){var R=ROOMS[r];for(var i=0;i<R.parts.length;i++){var P=R.parts[i];for(var j=0;j<P.m.length;j++){var m=P.m[j];if(typeof m==="string"?c.id===m:m.test(head(c)))return P.k;}}return R.rest;}
function bar(r){var pn=panel(r);if(!pn)return null;var b=pn.querySelector(":scope > .dx-bar");if(b)return b;var R=ROOMS[r];
  b=mk("div","dx-bar");b.setAttribute("role","tablist");b.setAttribute("aria-label",R.label);b.setAttribute("data-room",r);
  R.parts.forEach(function(P){var t=mk("button","dx-tab");t.type="button";t.setAttribute("role","tab");t.id="dxT-"+r+"-"+P.k;t.setAttribute("data-part",P.k);t.innerHTML=P.i;t.appendChild(mk("span",null,P.t));
    t.addEventListener("click",function(){show(r,P.k,true);});b.appendChild(t);});
  b.addEventListener("keydown",function(e){var k=e.key;if(k!=="ArrowLeft"&&k!=="ArrowRight"&&k!=="Home"&&k!=="End")return;var ts=[].slice.call(b.querySelectorAll(".dx-tab")).filter(function(x){return !x.hidden;}),i=ts.indexOf(D.activeElement);if(i<0)return;e.preventDefault();
    var j=k==="Home"?0:k==="End"?ts.length-1:(i+(k==="ArrowRight"?1:-1)+ts.length)%ts.length;show(r,ts[j].getAttribute("data-part"),true);ts[j].focus();});
  var says=mk("p","dx-says");says.id="dxSays-"+r;says.setAttribute("aria-live","polite");
  var at=pn.querySelector(":scope > .rm-roomh");var ref=at?at.nextSibling:pn.firstChild;pn.insertBefore(says,ref);pn.insertBefore(b,says);return b;}
function show(r,k,mine){var pn=panel(r),b=bar(r);if(!pn||!b)return;var R=ROOMS[r];
  /* a section with no card in this copy has no key (Sign-in and reset always has Reset everything) */
  var has={};[].forEach.call(pn.children,function(c){if(isCard(c))has[partFor(r,c)]=1;});
  [].forEach.call(b.querySelectorAll(".dx-tab"),function(t){t.hidden=!has[t.getAttribute("data-part")];});
  /* the section wanted is kept even while it has nothing to show yet (its card comes later, as the page is made): until then the
     first section that has one is shown, and the wanted one as soon as its card arrives */
  CUR[r]=k;if(!has[k]){var first=R.parts.filter(function(P){return has[P.k];})[0];k=first?first.k:k;}
  pn.setAttribute("data-dx-cur",k);
  [].forEach.call(pn.children,function(c){if(!isCard(c))return;var on=partFor(r,c)===k;c.classList.toggle("dx-off",!on);c.classList.toggle("dx-on",on);c.setAttribute("data-dx",partFor(r,c));});
  [].forEach.call(b.querySelectorAll(".dx-tab"),function(t){var on=t.getAttribute("data-part")===k;t.setAttribute("aria-selected",on?"true":"false");t.tabIndex=on?0:-1;});
  var P=R.parts.filter(function(x){return x.k===k;})[0];var s=$("dxSays-"+r);if(s&&P&&s.textContent!==P.says)s.textContent=P.says;
  if(mine){PREF[r]=k;keep();}}
/* a setting reached from elsewhere opens its section */
function reach(el){try{if(!el||!el.closest)return;var c=el.closest("#page-settings .rm-panel > .dx-off");if(!c)return;var pn=c.parentNode,r=pn.id.replace(/^rmP-settings-/,"");if(ROOMS[r])show(r,partFor(r,c),false);}catch(e){}}
W.__rmRevealHook=(function(prev){return function(el){try{reach(el);}catch(e){}if(typeof prev==="function")try{prev(el);}catch(e){}};})(W.__rmRevealHook);

/* Storage: the room it takes beside your limit and old copies, the library under both (its card is made once, modules/r142.js) */
function storage(){var c=$("stxCard");if(!c||c.__dx)return;var kids=[].slice.call(c.children);
  var at=function(sel){for(var i=0;i<kids.length;i++)if(kids[i].matches&&kids[i].matches(sel))return i;return -1;};
  var hs=kids.map(function(e,i){return e.tagName==="H3"&&e.classList.contains("stx-h")?i:-1;}).filter(function(i){return i>=0;});
  var g=at(".stx-gauge");if(g<0||hs.length<4)return;c.__dx=1;
  /* left: the gauge, your limit and old copies (what you set); right: what takes the room (the list that grows once measured) */
  var cols=mk("div","dx-cols"),L=mk("div","dx-col dx-room"),Rt=mk("div","dx-col dx-kinds");
  kids.slice(g,hs[0]).forEach(function(e){L.appendChild(e);});kids.slice(hs[1],hs[3]).forEach(function(e){L.appendChild(e);});
  kids.slice(hs[0],hs[1]).forEach(function(e){Rt.appendChild(e);});
  cols.appendChild(L);cols.appendChild(Rt);c.insertBefore(cols,kids[hs[3]]);}

/* ---------- start, and later ---------- */
function apply(){Object.keys(ROOMS).forEach(function(r){var pn=panel(r);if(!pn)return;if(!bar(r))return;show(r,CUR[r]||PREF[r]||ROOMS[r].parts[0].k,false);
    if(!pn.__dxWatch){pn.__dxWatch=1;pn.addEventListener("focusin",function(e){reach(e.target);});var T=0;
      try{new MutationObserver(function(){if(T)return;T=setTimeout(function(){T=0;show(r,CUR[r]||PREF[r]||ROOMS[r].parts[0].k,false);storage();},0);}).observe(pn,{childList:true});}catch(e){}}});
  var ev=panel("everyday");if(ev)ev.classList.add("dx-two");storage();}
if(D.readyState==="loading")D.addEventListener("DOMContentLoaded",apply);else apply();
(function later(){var n=0;(function wait(){apply();if(W.__ingReady===true){setTimeout(apply,700);return;}if(++n<400)setTimeout(wait,500);})();})();
(function wrapGo(){var og=W.go;if(typeof og!=="function"||og.__r234)return;var ng=function(p){var r=og.apply(this,arguments);try{if(p==="settings")apply();}catch(e){}return r;};
  try{Object.keys(og).forEach(function(k){ng[k]=og[k];});}catch(e){}ng.__r234=true;W.go=go=ng;})();
W.IngSettingsParts={show:function(r,k,remember){if(k)show(r,k,!!remember);var pn=panel(r);return pn?pn.getAttribute("data-dx-cur"):null;},rooms:function(){return Object.keys(ROOMS);},parts:function(r){return (ROOMS[r]||{parts:[]}).parts.map(function(P){return {key:P.k,name:P.t};});},apply:apply};
})();
;try{window.__ingParts["p234"]="running";}catch(_){}
</script>
