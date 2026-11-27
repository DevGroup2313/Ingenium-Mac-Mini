<style id="r407-css">
/* ============ R407 · SORT KEYS BESIDE YOUR APPS AND YOUR MODELS (Ingenium 8.00, 27 November 2026) ============
   Her words (26 November 2026): "I also want to be able to filter through the "Your apps" section in the Mentes page and reorganise them
   by dates and alphabetical order". Shown both lists with the keys beside them (Ingenia's Your apps and Mentes's Your models), her word
   (27 November 2026): "I approve of the previews, please commit and push it everywhere".
   - Ingenia, Your apps: Used last, Newest, Oldest, A to Z, beside the heading. They are the very order of the drawer's right pull in
     Ingenia's head (r279: used last, A to Z, Z to A, newest, oldest), one choice for both, kept; the cards below now stand in it too.
     Newest and Oldest go by the day each folder was made (r279's own reading of it); Used last by its latest conversation (r263's).
   - Mentes, Your models: Newest, Oldest, A to Z, beside the heading, kept. A model keeps no date of its own, so Newest and Oldest go by
     the order the models were added.
   Each key is raised, lifts under the pointer and sinks when pressed; the chosen one stays pressed in. The cards glide to their new
   places; Minimal motion and reduced motion move them at once. */
.r407-row{display:flex;align-items:center;gap:16px;flex-wrap:wrap;margin:0 0 12px}
.r407-row > h2.sec{margin:0!important;flex:1 1 auto}
.r407-sw{display:flex;align-items:center;gap:10px;flex-wrap:wrap}
.r407-sw > span{font:600 10.5px/1 var(--sans,system-ui,sans-serif);letter-spacing:.22em;text-transform:uppercase;color:var(--ink-3,#6c6579)}
.r407-seg{display:flex;gap:8px;flex-wrap:wrap}
.r407-seg button{position:relative;display:inline-flex;align-items:center;gap:6px;min-height:32px;padding:6px 13px;border-radius:999px;border:1px solid var(--hairline,rgba(34,26,46,.1));cursor:pointer;
  background:linear-gradient(var(--card-hi,#fff),var(--card-lo,#f6f2fa));color:var(--ink-1,#221a2e);font:600 12.8px/1.2 var(--sans,system-ui,sans-serif);
  box-shadow:inset 0 -1.5px 0 rgba(40,22,68,.13),0 2px 0 rgba(40,22,68,.22),0 4px 7px rgba(40,22,68,.12);transition:transform .3s cubic-bezier(.34,1.35,.64,1),box-shadow .2s}
.r407-seg button:hover{transform:translateY(-2px);box-shadow:inset 0 -1.5px 0 rgba(40,22,68,.13),0 3px 0 rgba(40,22,68,.24),0 8px 13px rgba(40,22,68,.15)}
.r407-seg button:active{transform:translateY(1px);transition-duration:.06s;box-shadow:inset 0 2px 3px rgba(40,22,68,.22)}
.r407-seg button:focus-visible{outline:2.5px solid var(--accent,#6a3fb5);outline-offset:3px}
.r407-seg button[aria-pressed="true"]{color:var(--accent-deep,#4a2a86);background:linear-gradient(#efe7fb,#e4d8f6);box-shadow:inset 0 2px 4px rgba(40,22,68,.16),0 1px 0 rgba(255,255,255,.8);transform:translateY(1px)}
.r407-seg button svg{width:14px;height:14px;flex:0 0 auto}
body[data-theme="night"] .r407-seg button{color:#e9defc;background:linear-gradient(#2c2440,#251e35);border-color:rgba(205,184,240,.12);box-shadow:inset 0 1px 0 rgba(255,255,255,.07),inset 0 -2px 0 rgba(0,0,0,.45),0 2px 0 rgba(0,0,0,.7),0 4px 6px rgba(0,0,0,.45)}
body[data-theme="night"] .r407-seg button[aria-pressed="true"]{background:linear-gradient(#3a2d58,#33274e);color:#fff;box-shadow:inset 0 2px 5px rgba(0,0,0,.55)}
.r407-move{transition:transform .45s cubic-bezier(.34,1.35,.64,1)!important}
body[data-motion="minimal"] .r407-seg button,body[data-motion="minimal"] .r407-move{transition:none!important;transform:none!important}
@media (prefers-reduced-motion:reduce){.r407-seg button,.r407-move{transition:none!important}}
</style>
<script>try{(window.__ingParts=window.__ingParts||{})["p407"]="started";}catch(_){}
/* R407 · sort keys beside Your apps and Your models: see the note at the top of its styles. window.IngSortKeys */
(function r407(){
"use strict";
if(window.IngSortKeys)return;
var W=window,D=document,BUSY=0;
function mk(t,c,x){var e=D.createElement(t);if(c)e.className=c;if(x!=null)e.textContent=x;return e;}
function svg(d){return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">'+d+'</svg>';}
var ICO={new:'<path d="M12 19V5M6 11l6-6 6 6"/>',old:'<path d="M12 5v14M6 13l6 6 6-6"/>',az:'<path d="M4 17l3.5-10L11 17M5.3 13.5h4.4M14 7h6l-6 10h6"/>',used:'<circle cx="12" cy="12" r="8"/><path d="M12 8v4l2.5 2"/>'};
var APPS=[["used","Used last"],["new","Newest"],["old","Oldest"],["az","A to Z"]],MODELS=[["new","Newest"],["old","Oldest"],["az","A to Z"]];
function still(){return D.body.getAttribute("data-motion")==="minimal"||(W.matchMedia&&W.matchMedia("(prefers-reduced-motion: reduce)").matches);}
function byName(a,b){return String(a).localeCompare(String(b),undefined,{sensitivity:"base",numeric:true});}
function save(){try{W.saveState();}catch(e){}}
function tick(){try{if(W.IngSound&&IngSound.tick)IngSound.tick();}catch(e){}}
/* the cards glide from where they were to where they now stand */
function place(box,items,order){if(!box||!items.length)return;var first=items.map(function(e){return e.getBoundingClientRect();}),tail=items[items.length-1].nextSibling,same=true;
  order.forEach(function(i,n){if(i!==n)same=false;});if(same)return;BUSY++;try{order.forEach(function(i){box.insertBefore(items[i],tail);});}finally{setTimeout(function(){BUSY--;},0);}
  if(still())return;items.forEach(function(e,i){var a=first[i],b=e.getBoundingClientRect(),dx=a.left-b.left,dy=a.top-b.top;if(!dx&&!dy)return;e.style.transform="translate("+dx+"px,"+dy+"px)";e.getBoundingClientRect();
    e.classList.add("r407-move");e.style.transform="";setTimeout(function(){e.classList.remove("r407-move");},480);});}
function keys(list,cur,label,pick){var sw=mk("div","r407-sw");sw.appendChild(mk("span",null,"Sort"));var seg=mk("div","r407-seg");seg.setAttribute("role","group");seg.setAttribute("aria-label",label);
  list.forEach(function(k){var b=mk("button");b.type="button";b.setAttribute("data-sort",k[0]);b.setAttribute("aria-pressed",k[0]===cur?"true":"false");b.innerHTML=svg(ICO[k[0]])+k[1];
    b.addEventListener("click",function(){pick(k[0]);tick();});seg.appendChild(b);});sw.appendChild(seg);return sw;}
function pressed(sw,cur){if(!sw)return;[].forEach.call(sw.querySelectorAll("button[data-sort]"),function(b){b.setAttribute("aria-pressed",b.getAttribute("data-sort")===cur?"true":"false");});}
/* ---------- Ingenia, Your apps: the drawer's own order (r279), the cards below in it too ---------- */
function folders(){try{return W.IngFolders&&IngFolders.folders?IngFolders.folders()||[]:[];}catch(e){return [];}}
function convs(p){try{return (W.state.chats||[]).filter(function(c){return c&&c.projectId===p.id;});}catch(e){return [];}}
function when(c){var s=c.imported?(c.imported.updated||c.imported.created):(c.updated||c.at||c.made);var t=+new Date(s);return isFinite(t)?t:0;}
function stamp(c){var s=c.imported?(c.imported.created||c.imported.updated):(c.made||c.at||c.updated);var t=+new Date(s);return isFinite(t)?t:0;}
/* as r263 reads it: its notes brought up to date, or its latest conversation */
function lastUsed(p){var t=+((p.app&&p.app.briefAt)||0)||0;convs(p).forEach(function(c){var x=when(c);if(x>t)t=x;});return t;}
/* as r279 reads it: the day it was made (kept since 6.31), else the moment in its name of record, else its first conversation */
function made(p){var a=p.app||{},t=+a.made||0;if(t>0)return t;var m=/^pj([0-9a-z]{8})/.exec(String(p.id||""));if(m){var x=parseInt(m[1],36);if(x>1.5e12&&x<4.2e12)return x;}
  var first=0;convs(p).forEach(function(c){var y=stamp(c);if(y&&(!first||y<first))first=y;});return first;}
function appOrder(){try{return W.IngFolderView&&IngFolderView.state?IngFolderView.state().order:"used";}catch(e){return "used";}}
function appGrid(){var h=[].filter.call(D.querySelectorAll("#page-folders h2.sec"),function(x){return x.textContent.trim()==="Your apps";})[0];if(!h)return null;
  var card=h.closest(".r407-row")?h.closest(".r407-row").parentNode:h.parentNode;return {h:h,card:card,grid:card.querySelector(".fld-grid")};}
function sortApps(){var g=appGrid();if(!g||!g.grid)return;var F=folders(),k=appOrder(),items=[].filter.call(g.grid.children,function(c){return c.classList.contains("fld-card")&&c.querySelector(".fld-name");});
  if(items.length<2)return;var byN={};F.forEach(function(p,i){byN[String(p.name).trim()]={p:p,i:i};});
  var rows=items.map(function(e,n){var nm=(e.querySelector(".fld-name").textContent||"").trim(),f=byN[nm]||null;return {n:n,nm:nm,i:f?f.i:999+n,u:f?lastUsed(f.p):0,m:f?made(f.p):0};});
  var cmp=k==="az"?function(a,b){return byName(a.nm,b.nm)||a.i-b.i;}:k==="za"?function(a,b){return byName(b.nm,a.nm)||a.i-b.i;}:
    k==="new"?function(a,b){return (b.m-a.m)||(b.i-a.i);}:k==="old"?function(a,b){return (a.m||Infinity)-(b.m||Infinity)||(a.i-b.i);}:function(a,b){return (b.u-a.u)||(a.i-b.i);};
  place(g.grid,items,rows.slice().sort(cmp).map(function(r){return r.n;}));}
function appKeys(){var g=appGrid();if(!g||!g.grid)return;var cur=appOrder();
  if(!g.h.closest(".r407-row")){var row=mk("div","r407-row");row.id="r407Apps";g.h.parentNode.insertBefore(row,g.h);row.appendChild(g.h);
    row.appendChild(keys(APPS,cur,"How Your apps are sorted",function(k){try{if(W.IngFolderView&&IngFolderView.setOrder)IngFolderView.setOrder(k);}catch(e){}pressed(D.querySelector("#r407Apps .r407-sw"),appOrder());sortApps();}));}
  else pressed(g.h.closest(".r407-row").querySelector(".r407-sw"),cur);}
/* ---------- Mentes, Your models ---------- */
function modelOrder(){try{var o=W.state&&W.state.ui&&W.state.ui.modelOrder;return o==="new"||o==="az"?o:"old";}catch(e){return "old";}}
function setModelOrder(k){try{W.state.ui=W.state.ui||{};W.state.ui.modelOrder=k;save();}catch(e){}}
function sortModels(){var list=D.getElementById("modelList");if(!list)return;var items=[].slice.call(list.querySelectorAll(":scope > .model-row"));if(items.length<2)return;
  var M=(W.state&&W.state.models)||[],k=modelOrder();
  var rows=items.map(function(e,n){var id=e.getAttribute("data-r407"),i=-1;for(var j=0;j<M.length;j++)if(M[j]&&M[j].id===id){i=j;break;}if(i<0)i=n;var m=M[i]||{};return {n:n,i:i,nm:m.customName||m.name||m.fileName||""};});
  var cmp=k==="az"?function(a,b){return byName(a.nm,b.nm)||a.i-b.i;}:k==="new"?function(a,b){return b.i-a.i;}:function(a,b){return a.i-b.i;};
  place(list,items,rows.slice().sort(cmp).map(function(r){return r.n;}));}
/* each model's row is drawn in the order of the models (renderModels): it is named as it is drawn, so its place is never guessed */
function markModels(){var list=D.getElementById("modelList");if(!list)return;var items=[].slice.call(list.querySelectorAll(":scope > .model-row")),M=(W.state&&W.state.models)||[];
  if(items.length===M.length)items.forEach(function(e,i){if(M[i]&&M[i].id&&!e.getAttribute("data-r407"))e.setAttribute("data-r407",M[i].id);});}
function modelKeys(){var c=D.getElementById("yourModelsCard"),h=c&&c.querySelector("h2.sec");if(!h)return;
  if(!h.closest(".r407-row")){var row=mk("div","r407-row");row.id="r407Models";c.insertBefore(row,h);row.appendChild(h);
    row.appendChild(keys(MODELS,modelOrder(),"How Your models are sorted",function(k){setModelOrder(k);pressed(D.querySelector("#r407Models .r407-sw"),k);sortModels();}));}}
function wrapModels(){var o=W.renderModels;if(typeof o!=="function"||o.__r407)return;var n=function(){var r=o.apply(this,arguments);try{markModels();sortModels();}catch(e){}return r;};n.__r407=1;
  try{Object.keys(o).forEach(function(k){n[k]=o[k];});}catch(e){}W.renderModels=n;try{renderModels=n;}catch(e){}}
/* ---------- when the lists are drawn again ---------- */
var seenApps="",seenModels="";
function watch(){try{appKeys();modelKeys();wrapModels();
    var g=appGrid(),sigA=g&&g.grid?[].map.call(g.grid.children,function(c){return c.textContent.length;}).join(",")+"|"+appOrder():"";if(!BUSY&&g&&g.grid&&sigA!==seenApps){seenApps=sigA;sortApps();seenApps=[].map.call(g.grid.children,function(c){return c.textContent.length;}).join(",")+"|"+appOrder();pressed(D.querySelector("#r407Apps .r407-sw"),appOrder());}
    var l=D.getElementById("modelList"),sigM=l?l.children.length+"|"+modelOrder():"";if(!BUSY&&l&&sigM!==seenModels){seenModels=sigM;markModels();sortModels();}}catch(e){}}
var mo=null;
function start(){watch();try{mo=new MutationObserver(function(){if(!BUSY)watch();});var a=D.getElementById("page-folders"),b=D.getElementById("page-models");if(a)mo.observe(a,{childList:true,subtree:true});if(b)mo.observe(b,{childList:true,subtree:true});}catch(e){}
  setInterval(watch,1500);}
(function w0(n){if(W.__ingReady===true&&W.state){start();return;}if(n<400)setTimeout(function(){w0(n+1);},500);})(0);
W.IngSortKeys={apps:function(k){if(k)try{IngFolderView.setOrder(k);}catch(e){}sortApps();return appOrder();},models:function(k){if(k)setModelOrder(k);sortModels();return modelOrder();},madeOf:made,lastUsedOf:lastUsed};
try{window.__ingParts["p407"]="running";}catch(_){}
})();
</script>
