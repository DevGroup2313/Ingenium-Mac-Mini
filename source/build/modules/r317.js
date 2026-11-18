<style id="r317-css">
/* ============ R317 · MENTES, STUDIO, TRAIN: ALL OF IT IN ONE WINDOW (Ingenium 7.36, 18 November 2026) ============
   Her words (18 November 2026, as on 5 November): "The cards on the Train tab inside of the Models page is really stiff and not animated or
   clickable, please fix that. I want the surfaces of the app to 3D animated. There is also a lot of scrolling on that page, it should have a
   redesign that has some tabs and sections to better show the page and not have me endlessly scrolling and losing interest in the page's
   contents." Her word on the live preview (https://claude.ai/artifact/37W6KrMVaDst5bRBxqmEAw, source/previews/train_room): "I approve of
   the preview, please commit and push it everywhere" (both previews, she said).
   Measured on 7.35 at 1440 by 900, opened by hand (Mentes, Studio, Train): the head folded to a band of 198 pixels (r304), then the rooms'
   lines, the Studio's framed bar and Train's own row of parts; the workbench card began 649 pixels down and its page ran to 1,694.
   While a room of the Studio is open (#page-models.r317-st):
   - the band is slimmer: the turret as a coin, the title, the engine's state as a chip (from #trNow), the two keys and Show the turret,
     which brings the whole head back (kept on this device; Fold the turret folds it again);
   - the rooms' lines (#rmSays-models, #stSays, #tnSays) are said in the keys' titles instead, and the Studio's rooms are one row;
   - Train's three parts are a rail beside its card, each with its line (on a narrow window, a row as before);
   - the workbench: its four tools as raised cards (an icon and a line each, drawn by the styles, so the keys' own words stay) beside its
     steps; what it is and its engine folded into About it.
   Every id and handler stays (Lector's and the chat's ways into the workbench, r232's steps, the tests). Under the pointer the parts, the
   tools and the cards lift (r232, 7.36); Minimal or reduced motion keeps them still. */
#page-models.r317-st .mc-unfold{display:none !important}
#page-models.mc-on.mc-fold.r317-st .tr-head{padding-top:12px !important;padding-bottom:12px !important;min-height:0 !important}
#page-models.mc-on.mc-fold.r317-st .tr-head .page-title{font-size:30px !important;line-height:1.15 !important;margin:2px 0 0 !important}
#page-models.mc-on.mc-fold.r317-st .tr-head .tr-now{display:none !important}
#page-models.mc-on.mc-fold.r317-st .tr-head .tr-words{display:grid !important;grid-template-columns:minmax(0,auto) 1fr !important;grid-template-areas:"eye keys" "title keys" !important;align-items:center;column-gap:20px}
#page-models.mc-on.mc-fold.r317-st .tr-head .tr-eyebrow{grid-area:eye}
#page-models.mc-on.mc-fold.r317-st .tr-head .page-title{grid-area:title}
#page-models.mc-on.mc-fold.r317-st .tr-head .tr-keys{grid-area:keys;justify-self:end;display:flex;flex-wrap:wrap;gap:8px;align-items:center;margin:0 !important}
#page-models.mc-on.mc-fold.r317-st .tr-head .tr-scene{width:64px !important;height:64px !important;flex-basis:64px !important;margin:0 0 0 6px !important;order:-1}
#page-models.mc-on.mc-fold.r317-st .tr-head .tr-fit{-webkit-transform:scale(.14) !important;transform:scale(.14) !important}
#page-models.mc-on.mc-fold.r317-st .tr-head{grid-template-columns:auto minmax(0,1fr) !important;align-items:center}
#page-models .r317-chip,#page-models .r317-turret{display:none}
#page-models.r317-st .r317-turret{display:inline-flex}
#page-models.mc-on.mc-fold.r317-st .r317-chip{display:inline-flex;align-items:center;font:600 11.5px/1 var(--sans,system-ui);padding:6px 10px;border-radius:999px;background:rgba(106,63,181,.14);color:#6a3fb5;white-space:nowrap;max-width:260px;overflow:hidden;text-overflow:ellipsis}
body[data-theme="night"] #page-models.mc-on.mc-fold.r317-st .r317-chip{background:rgba(183,156,230,.16);color:#b79ce6}
#page-models.r317-st #rmSays-models,#page-models.r317-st #stSays,#page-models.r317-st #tnSays{display:none !important}
#page-models.r317-st #stBar{display:flex;flex-wrap:wrap;align-items:center;gap:8px;padding:0 !important;margin:2px 0 14px !important;border:0 !important;background:none !important;box-shadow:none !important}
#page-models.r317-st #stLab{font:700 10.5px/1 var(--sans,system-ui);letter-spacing:.12em;text-transform:uppercase;color:var(--ink-3,#6c6579);margin-right:4px}
/* Train's parts, a rail beside the card */
@media (min-width:900px){
  #page-models.r317-st #stP-train.st-in{display:grid;grid-template-columns:210px minmax(0,1fr);gap:14px;align-items:start}
  #page-models.r317-st #stP-train > .tn-bar{grid-column:1;grid-row:1 / span 6;display:flex;flex-direction:column;align-items:stretch;gap:8px;margin:0;position:sticky;top:12px}
  #page-models.r317-st #stP-train > .card{grid-column:2;margin-top:0}
  #page-models.r317-st #stP-train > :not(.tn-bar):not(.card){grid-column:2}
  #page-models.r317-st #stP-train .tn-tab{display:grid;grid-template-columns:auto minmax(0,1fr);column-gap:8px;align-items:center;text-align:left;padding:10px 12px !important;border-radius:13px;white-space:normal}
  #page-models.r317-st #stP-train .tn-tab:hover{transform:translateX(3px) translateY(-1px)}
  #page-models.r317-st #stP-train .tn-tab::after{content:attr(data-sub);grid-column:1 / -1;font:500 12px/1.4 var(--sans,system-ui);color:var(--ink-3,#6c6579);margin-top:2px}
  #page-models.r317-st #stP-train .tn-tab[aria-selected="true"]::after{color:rgba(255,255,255,.84)}
  /* the workbench: what it is, folded; its tools as cards beside its steps */
  #page-models.r317-st #ingLabCard{display:grid;grid-template-columns:240px minmax(0,1fr);grid-template-areas:"h h" "about about" "tools say" "tools panels";column-gap:16px;align-items:start;position:relative}
  #page-models.r317-st #ingLabCard > *{grid-column:1 / -1}
  #page-models.r317-st #ingLabCard > #ingLabH{grid-area:h;margin:0;padding-right:330px}
  #page-models.r317-st #ingLabCard > .r317-hk{position:absolute;top:16px;right:16px}
  #page-models.r317-st #ingLabCard > .r317-about{grid-area:about}
  #page-models.r317-st #ingLabCard > #labTabs{grid-area:tools;display:flex;flex-direction:column;gap:8px;margin:12px 0 0}
  #page-models.r317-st #ingLabCard > #labSays{grid-area:say;margin:12px 0 4px}
  #page-models.r317-st #ingLabCard > #labPanels{grid-area:panels;min-width:0}
}
#page-models.r317-st #ingLabCard .r317-hk{display:flex;flex-wrap:wrap;gap:8px;align-items:center;justify-content:flex-end}
#page-models.r317-st #ingLabCard .r317-ok{display:inline-flex;align-items:center;font:600 11.5px/1 var(--sans,system-ui);padding:6px 10px;border-radius:999px;background:rgba(31,157,99,.14);color:#1a7f50}
body[data-theme="night"] #page-models.r317-st #ingLabCard .r317-ok{background:rgba(64,192,128,.15);color:#6fd8a2}
#page-models.r317-st #ingLabCard .r317-about{margin:10px 0 0}
#page-models.r317-st #ingLabCard .r317-about[hidden]{display:none}
#page-models.r317-st #ingLabCard .lb-tab{display:grid;grid-template-columns:30px minmax(0,1fr);column-gap:10px;align-items:center;text-align:left;white-space:normal;min-height:0;padding:9px 11px;border-radius:12px}
#page-models.r317-st #ingLabCard .lb-tab::before{content:"";grid-row:1 / span 2;width:30px;height:30px;border-radius:9px;background:rgba(106,63,181,.14);
  -webkit-mask:none;transition:transform .35s cubic-bezier(.2,.9,.25,1.2)}
#page-models.r317-st #ingLabCard .lb-tab::after{content:attr(data-sub);font:500 11.5px/1.35 var(--sans,system-ui);color:var(--ink-3,#6c6579)}
#page-models.r317-st #ingLabCard .lb-tab[aria-selected="true"]::after{color:rgba(255,255,255,.84)}
#page-models.r317-st #ingLabCard .lb-tab[aria-selected="true"]::before{background:rgba(255,255,255,.22)}
#page-models.r317-st #ingLabCard .lb-tab:hover::before{transform:rotate(-8deg) scale(1.08)}
#page-models.r317-st #ingLabCard .lb-tab > .r317-ic{display:none}
/* each tool's mark, drawn in its tile (an image, so the key's own words stay as they are) */
#page-models.r317-st #ingLabCard .lb-tab{background-repeat:no-repeat,no-repeat;background-size:16px 16px,100% 100%;background-position:18px center,0 0}
#page-models.r317-st #ingLabCard #labT-chars{background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%236a3fb5' stroke-width='1.9' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M4 20h4L19 9l-4-4L4 16z'/%3E%3C/svg%3E"),linear-gradient(180deg,var(--card-hi,#fff),var(--card-lo,#f6f2fb))}
#page-models.r317-st #ingLabCard #labT-notes{background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%236a3fb5' stroke-width='1.9' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M5 5h14v4H5zM5 13h9v6H5z'/%3E%3C/svg%3E"),linear-gradient(180deg,var(--card-hi,#fff),var(--card-lo,#f6f2fb))}
#page-models.r317-st #ingLabCard #labT-pictures{background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%236a3fb5' stroke-width='1.9' stroke-linecap='round' stroke-linejoin='round'%3E%3Crect x='3.5' y='5' width='17' height='14' rx='2'/%3E%3Cpath d='M7 15l3.5-4 3 3 2-2 3 3'/%3E%3C/svg%3E"),linear-gradient(180deg,var(--card-hi,#fff),var(--card-lo,#f6f2fb))}
#page-models.r317-st #ingLabCard #labT-words{background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%236a3fb5' stroke-width='1.9' stroke-linecap='round'%3E%3Ccircle cx='7' cy='8' r='2.5'/%3E%3Ccircle cx='17' cy='9' r='2.5'/%3E%3Ccircle cx='11' cy='17' r='2.5'/%3E%3Cpath d='M9 9l6 .5M8.5 10l2 5M15.5 11l-3 4'/%3E%3C/svg%3E"),linear-gradient(180deg,var(--card-hi,#fff),var(--card-lo,#f6f2fb))}
#page-models.r317-st #ingLabCard .lb-tab[aria-selected="true"]{background-image:none}
body[data-theme="night"] #page-models.r317-st #ingLabCard #labT-chars:not([aria-selected="true"]){background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23b79ce6' stroke-width='1.9' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M4 20h4L19 9l-4-4L4 16z'/%3E%3C/svg%3E"),linear-gradient(180deg,var(--card-hi,#2a2239),var(--card-lo,#251e33))}
body[data-theme="night"] #page-models.r317-st #ingLabCard #labT-notes:not([aria-selected="true"]){background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23b79ce6' stroke-width='1.9' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M5 5h14v4H5zM5 13h9v6H5z'/%3E%3C/svg%3E"),linear-gradient(180deg,var(--card-hi,#2a2239),var(--card-lo,#251e33))}
body[data-theme="night"] #page-models.r317-st #ingLabCard #labT-pictures:not([aria-selected="true"]){background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23b79ce6' stroke-width='1.9' stroke-linecap='round' stroke-linejoin='round'%3E%3Crect x='3.5' y='5' width='17' height='14' rx='2'/%3E%3Cpath d='M7 15l3.5-4 3 3 2-2 3 3'/%3E%3C/svg%3E"),linear-gradient(180deg,var(--card-hi,#2a2239),var(--card-lo,#251e33))}
body[data-theme="night"] #page-models.r317-st #ingLabCard #labT-words:not([aria-selected="true"]){background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23b79ce6' stroke-width='1.9' stroke-linecap='round'%3E%3Ccircle cx='7' cy='8' r='2.5'/%3E%3Ccircle cx='17' cy='9' r='2.5'/%3E%3Ccircle cx='11' cy='17' r='2.5'/%3E%3Cpath d='M9 9l6 .5M8.5 10l2 5M15.5 11l-3 4'/%3E%3C/svg%3E"),linear-gradient(180deg,var(--card-hi,#2a2239),var(--card-lo,#251e33))}
#page-models.r317-st #ingLabCard #labT-chars[aria-selected="true"]{background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='1.9' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M4 20h4L19 9l-4-4L4 16z'/%3E%3C/svg%3E"),linear-gradient(180deg,var(--rm-pa,#7348be),var(--rm-pb,#5d37a1))}
#page-models.r317-st #ingLabCard #labT-notes[aria-selected="true"]{background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='1.9' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M5 5h14v4H5zM5 13h9v6H5z'/%3E%3C/svg%3E"),linear-gradient(180deg,var(--rm-pa,#7348be),var(--rm-pb,#5d37a1))}
#page-models.r317-st #ingLabCard #labT-pictures[aria-selected="true"]{background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='1.9' stroke-linecap='round' stroke-linejoin='round'%3E%3Crect x='3.5' y='5' width='17' height='14' rx='2'/%3E%3Cpath d='M7 15l3.5-4 3 3 2-2 3 3'/%3E%3C/svg%3E"),linear-gradient(180deg,var(--rm-pa,#7348be),var(--rm-pb,#5d37a1))}
#page-models.r317-st #ingLabCard #labT-words[aria-selected="true"]{background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='1.9' stroke-linecap='round'%3E%3Ccircle cx='7' cy='8' r='2.5'/%3E%3Ccircle cx='17' cy='9' r='2.5'/%3E%3Ccircle cx='11' cy='17' r='2.5'/%3E%3Cpath d='M9 9l6 .5M8.5 10l2 5M15.5 11l-3 4'/%3E%3C/svg%3E"),linear-gradient(180deg,var(--rm-pa,#7348be),var(--rm-pb,#5d37a1))}
/* the Overview's four tiles two by two, an open one across */
@media (min-width:900px){
  #page-models.r317-st #ingTruthBands{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px;padding:0;margin:10px 0 0;list-style:none}
  #page-models.r317-st #ingTruthBands > .tr-band{margin:0}
  #page-models.r317-st #ingTruthBands > .tr-band.tn-open{grid-column:1 / -1}
}
body[data-motion="minimal"] #page-models.r317-st #ingLabCard .lb-tab::before{transition:none !important;transform:none !important}
@media (prefers-reduced-motion:reduce){#page-models.r317-st #ingLabCard .lb-tab::before{transition:none !important;transform:none !important}}
</style>
<script>try{(window.__ingParts=window.__ingParts||{})["p317"]="started";}catch(_){}
/* R317 · Mentes, Studio, Train, in one window: see the note at the top of its styles */
(function(){
"use strict";
var W=window,D=document;if(W.__r317)return;W.__r317=1;
var KEY="ing.mentes.turret.v1";
function $(id){return D.getElementById(id);}
function get(){try{return localStorage.getItem(KEY)||"";}catch(e){return "";}}
function put(v){try{localStorage.setItem(KEY,v);}catch(e){}}
var SUBS={overview:"What can be trained here",workbench:"Watch a small model learn",trainer:"Train a small model on a computer"};
var TOOLS={chars:"A tiny model learns your text's habits",notes:"It learns your own labels",pictures:"It learns what tells them apart",words:"A map of your words"};
function studioOpen(){var p=$("rmP-models-studio");return !!(p&&!p.hidden&&p.offsetParent!==null);}
function engineSays(){var n=$("trNow");if(!n)return "";var t=n.querySelector("h2,h3,b,.tr-now-t")||n;var s=(t.textContent||"").replace(/\s+/g," ").trim();return s.length>60?s.slice(0,60)+"…":s;}
function dress(){var P=$("page-models");if(!P)return;var on=studioOpen();P.classList.toggle("r317-st",on);
  var keys=P.querySelector(".tr-head .tr-keys");
  if(keys&&!keys.querySelector(".r317-turret")){var chip=D.createElement("span");chip.className="r317-chip";keys.insertBefore(chip,keys.firstChild);
    var k=D.createElement("button");k.type="button";k.className="btn r317-turret";
    k.onclick=function(e){e.stopPropagation();var folded=P.classList.contains("mc-fold");P.classList.toggle("mc-fold",!folded);put(folded?"open":"");say();};keys.appendChild(k);}
  say();
  /* the room's lines, said in the keys' titles */
  [["rmSays-models","#rmTabs-models .rm-tab[aria-selected='true']"],["stSays","#stTabs [aria-selected='true'], #stTabs .st-in, #stTabs .on"],["tnSays","#stP-train .tn-tab[aria-selected='true']"]].forEach(function(x){var s=$(x[0]),t=D.querySelector(x[1]);if(s&&t&&s.textContent.trim())t.title=s.textContent.trim();});
  [].forEach.call(D.querySelectorAll("#stP-train .tn-tab"),function(t){var k=(t.id||"").replace("tnT-","");if(SUBS[k]&&!t.getAttribute("data-sub"))t.setAttribute("data-sub",SUBS[k]);});
  var lab=$("ingLabCard");if(lab){[].forEach.call(lab.querySelectorAll(".lb-tab"),function(t){var k=(t.id||"").replace("labT-","");if(TOOLS[k]&&!t.getAttribute("data-sub"))t.setAttribute("data-sub",TOOLS[k]);});
    if(!lab.querySelector(".r317-hk")){var h=$("ingLabH");var hk=D.createElement("div");hk.className="r317-hk";var ok=D.createElement("span");ok.className="r317-ok";ok.textContent="Runs in this page; nothing is sent";
      var ab=D.createElement("button");ab.type="button";ab.className="btn small";ab.textContent="About it";hk.appendChild(ok);hk.appendChild(ab);
      var box=D.createElement("div");box.className="r317-about";box.hidden=true;
      var intro=lab.querySelector(":scope > p.small.muted"),eng=$("labEngine");if(intro)box.appendChild(intro);if(eng)box.appendChild(eng);
      if(h&&h.parentNode===lab){lab.insertBefore(hk,h.nextSibling);lab.insertBefore(box,hk.nextSibling);}
      ab.onclick=function(){box.hidden=!box.hidden;ab.textContent=box.hidden?"About it":"Fold it away";};}}}
function say(){var P=$("page-models");if(!P)return;var c=P.querySelector(".r317-chip"),k=P.querySelector(".r317-turret");
  if(c){var t=engineSays();c.textContent=t?"Engine: "+t.replace(/^In the engine\s*/i,""):"";c.hidden=!t;}
  if(k)k.textContent=P.classList.contains("mc-fold")?"Show the turret":"Fold the turret";}
/* a room opened folds the head (r304); kept open when she chose to see the turret */
function afterFold(){var P=$("page-models");if(P&&get()==="open"&&studioOpen())P.classList.remove("mc-fold");say();}
var pend=0;function soon(){if(pend)return;pend=setTimeout(function(){pend=0;try{dress();}catch(e){}},30);}
function boot(){var P=$("page-models");if(!P){setTimeout(boot,500);return;}
  try{new MutationObserver(function(ms){for(var i=0;i<ms.length;i++){var t=ms[i].target;if(t&&t.classList&&(t.classList.contains("r317-chip")||t.classList.contains("r317-turret")))continue;soon();return;}}).observe(P,{attributes:true,attributeFilter:["hidden","class","aria-selected"],subtree:true,childList:true});}catch(e){}
  P.addEventListener("click",function(e){var t=e.target;if(t&&t.closest&&t.closest(".rm-tab"))setTimeout(afterFold,0);},false);
  dress();}
(function wait(){if(W.__ingReady===true||D.getElementById("page-models"))boot();else setTimeout(wait,400);})();
W.IngTrainRoom={dress:dress,state:function(){var P=$("page-models");return {st:!!(P&&P.classList.contains("r317-st")),fold:!!(P&&P.classList.contains("mc-fold")),pref:get()};}};
try{window.__ingParts["p317"]="running";}catch(_){}
})();
</script>
