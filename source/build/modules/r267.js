<style id="r267-css">
/* ============ R267 · THE MODELS PAGE'S ROOMS IN THE TURRET'S DESIGN (Ingenium 6.76, 11 November 2026) ============ */
#page-models.tu-on .card{border-radius:22px;border:0;background:var(--tu-card);box-shadow:inset 0 0 0 1px var(--tu-hair2),var(--tu-shadow)}
#page-models.tu-on .card h2.sec,#page-models.tu-on .card > h2{font:600 26px/1.15 "Home Cormorant","Cormorant Garamond",Cormorant,var(--x-serif,Georgia),serif;color:var(--tu-ink1);letter-spacing:.01em}
/* the Health card as gauges */
#page-models.tu-on #healthBox .hl-rows{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:12px;margin-top:12px}
#page-models.tu-on #healthBox .hl-row{display:flex;flex-direction:column;gap:6px;padding:12px 14px;border:0;border-radius:14px;background:var(--tu-card2);box-shadow:inset 0 0 0 1px var(--tu-hair2)}
#page-models.tu-on #healthBox .hl-k{font:600 10.5px/1.2 var(--sans);letter-spacing:.16em;text-transform:uppercase;color:var(--tu-ink3)}
#page-models.tu-on #healthBox .hl-v{font:600 17px/1.25 "Home Cormorant","Cormorant Garamond",Cormorant,var(--x-serif,Georgia),serif;color:var(--tu-ink1);font-variant-numeric:tabular-nums}
#page-models.tu-on #healthBox .hl-row.warn{background:var(--tu-warnbg)}#page-models.tu-on #healthBox .hl-row.bad{background:var(--tu-warnbg)}
/* each of her models: a row with its lens, its name in the page's serif, and a key to load or unload it */
#page-models.tu-on .model-row{position:relative;align-items:center;gap:16px;padding:12px 14px;border:0;border-radius:16px;background:var(--tu-card2);box-shadow:inset 0 0 0 1px var(--tu-hair2);
  transition:transform .2s cubic-bezier(.2,.8,.2,1),box-shadow .2s ease}
#page-models.tu-on .model-row:hover{transform:translateY(-2px);box-shadow:inset 0 0 0 1px var(--tu-hair),0 10px 20px rgba(40,22,68,.08)}
#page-models.tu-on .model-row > .swatch{display:none}
#page-models.tu-on .model-row .tm-ic{flex:0 0 64px;width:64px;height:64px;display:grid;place-items:center}
#page-models.tu-on .model-row .mname{font:600 20px/1.15 "Home Cormorant","Cormorant Garamond",Cormorant,var(--x-serif,Georgia),serif;color:var(--tu-ink1)}
#page-models.tu-on .model-row .tm-in{display:inline-flex;align-items:center;margin-left:8px;padding:3px 9px;border-radius:999px;font:600 11.5px/1.4 var(--sans);vertical-align:middle;background:rgba(106,63,181,.12);color:var(--tu-acc)}
#page-models.tu-on .model-row .tm-load{margin-right:2px}
/* Ingenium's models: each house a card with its lens on a dark stage */
#page-models.tu-on .lu-tile{position:relative;padding:16px 16px 14px 132px;border-radius:22px;border:0;min-height:136px;background:var(--tu-card);box-shadow:inset 0 0 0 1px var(--tu-hair2),var(--tu-shadow)}
#page-models.tu-on .lu-tile .tm-stage{position:absolute;left:14px;top:14px;width:104px;height:104px;border-radius:18px;display:grid;place-items:center;
  background:radial-gradient(ellipse at 50% 30%,#2b2238,#17111f)}
body[data-theme="night"] #page-models.tu-on .lu-tile .tm-stage{background:radial-gradient(ellipse at 50% 30%,#1d1628,#0b0812)}
#page-models.tu-on .lu-tile .lu-name{font:600 19px/1.2 "Home Cormorant","Cormorant Garamond",Cormorant,var(--x-serif,Georgia),serif;color:var(--tu-ink1)}
#page-models.tu-on .lu-tile .lu-role{font:600 10.5px/1 var(--sans);letter-spacing:.2em;text-transform:uppercase;color:var(--tu-acc)}
@media (max-width:1060px){#page-models.tu-on #healthBox .hl-rows{grid-template-columns:repeat(2,minmax(0,1fr))}}
@media (max-width:560px){#page-models.tu-on .model-row{flex-wrap:wrap}#page-models.tu-on .model-row .tm-ic{flex-basis:52px;width:52px;height:52px}
  #page-models.tu-on .lu-tile{padding:14px}#page-models.tu-on .lu-tile .tm-stage{position:static;margin:0 0 10px;width:84px;height:84px}#page-models.tu-on #healthBox .hl-rows{grid-template-columns:minmax(0,1fr)}}
@media (prefers-reduced-motion:reduce){#page-models.tu-on .model-row{transition:none}#page-models.tu-on .model-row:hover{transform:none}}
</style>
<script>try{(window.__ingParts=window.__ingParts||{})["p267"]="started";}catch(_){}
/* ============ R267 · THE MODELS PAGE'S ROOMS IN THE TURRET'S DESIGN (Ingenium 6.76, 11 November 2026) ============
   Her words (11 November 2026): "I need you to push build 6.75 and 6.76 with the models page new turet redesign", with her preview
   Ingenium_Models_Designs.html. 6.75 (modules/r266.js) made the page's head the turret; 6.76 brings the rooms below into the same
   design, as her preview draws them, and keeps everything they do:
   - the Health card as gauges (This device, Loaded now, The page itself, Installed models, and the rest it reports);
   - each of her models in Your models a row with its lens (drawn as the turret draws it, in the model's own colour), its name in the
     page's serif, In the engine beside the one loaded, and a key that loads or unloads it through the turret (r266), as the turret
     does; Set active, Settings and Remove stay;
   - Ingenium's models: each house a card with its lens on a dark stage, its name in the serif and its role in small capitals;
   - the cards of the rooms in the head's own surfaces.
   The base page draws these lists again whenever the engine or the models change; each is dressed again, once, after it is drawn. */
(function r267(){
"use strict";
if(window.IngTurretRooms)return;
var W=window,D=document;
function mk(t,c,txt){var e=D.createElement(t);if(c)e.className=c;if(txt!=null)e.textContent=txt;return e;}
function modelsById(){var o={};((W.state&&state.models)||[]).forEach(function(m){if(m&&m.id)o[m.id]=m;});return o;}
function lensFor(m,S){var cv=mk("canvas");try{W.IngTurret.lens(cv,S,m,false);}catch(e){}return cv;}
/* a row of Your models carries no id of its own: it is found by the model's name, in the order the page draws them */
function dressRows(){var list=D.getElementById("modelList");if(!list||!W.IngTurret||!IngTurret.lens)return;var rows=[].slice.call(list.querySelectorAll(":scope > .model-row"));
  var ms=((W.state&&state.models)||[]),loaded=IngTurret.loaded();
  rows.forEach(function(row,i){var m=ms[i];if(!m)return;var sig=m.id+"|"+(m.color||"")+"|"+(loaded===m.id)+"|"+(D.body.getAttribute("data-theme")||"");if(row.__tm===sig)return;row.__tm=sig;
    var ic=row.querySelector(":scope > .tm-ic");if(!ic){ic=mk("span","tm-ic");row.insertBefore(ic,row.firstChild);}ic.innerHTML="";ic.appendChild(lensFor(m,56));
    var nm=row.querySelector(".mname");if(nm){var old=nm.querySelector(".tm-in");if(old)old.remove();if(loaded===m.id)nm.appendChild(mk("span","tm-in","In the engine"));}
    var sa=[].slice.call(row.querySelectorAll("button")).filter(function(x){return /^(Set active|Active)$/.test((x.textContent||"").trim());})[0],acts=sa&&sa.parentNode;if(!acts)return;var k=acts.querySelector(".tm-load");if(!k){k=mk("button","btn small tm-load");k.type="button";acts.insertBefore(k,acts.firstChild);}
    k.textContent=loaded===m.id?"Unload":"Load";k.classList.toggle("primary",loaded!==m.id);
    k.onclick=function(){if(IngTurret.loaded()===m.id)IngTurret.unload();else IngTurret.press(m.id);try{D.querySelector("#page-models .tu-head").scrollIntoView({behavior:"smooth",block:"start"});}catch(e){}};});}
/* Ingenium's models: each house's card with its lens */
var HOUSE={velox:"#7458c6",scriba:"#6a3fb5",magister:"#8641b8",faber:"#4d3db0"};
function dressHouses(){var g=D.getElementById("lineupGrid");if(!g||!W.IngTurret||!IngTurret.lens)return;
  [].forEach.call(g.querySelectorAll(".lu-tile"),function(t){var id=((t.className.match(/\blu-(velox|scriba|magister|faber)\b/)||[])[1])||"";var sig=id+"|"+(D.body.getAttribute("data-theme")||"");if(t.__tm===sig)return;t.__tm=sig;
    var st=t.querySelector(":scope > .tm-stage");if(!st){st=mk("span","tm-stage");st.setAttribute("aria-hidden","true");t.insertBefore(st,t.firstChild);}st.innerHTML="";st.appendChild(lensFor({color:HOUSE[id]||"#6a3fb5"},84));});}
function dress(){try{dressRows();}catch(e){}try{dressHouses();}catch(e){}}
var tries=0;
function boot(){var pg=D.getElementById("page-models");if(!pg||!W.IngTurret){if(++tries<200)setTimeout(boot,600);return;}
  dress();try{new MutationObserver(function(){dress();}).observe(pg,{childList:true,subtree:true});}catch(e){}
  try{Engine.on("status",function(){setTimeout(dress,0);});}catch(e){}
  try{new MutationObserver(function(){D.querySelectorAll("#page-models .model-row,#page-models .lu-tile").forEach(function(x){x.__tm=null;});dress();}).observe(D.body,{attributes:true,attributeFilter:["data-theme"]});}catch(e){}}
if(D.readyState==="loading")D.addEventListener("DOMContentLoaded",boot);else boot();
W.IngTurretRooms={dress:dress};
try{window.__ingParts["p267"]="running";}catch(_){}
})();
</script>
