<style id="r174-css">
/* ============ R174 · INGENIUM ON A PHONE (Ingenium 6.7, 25 October 2026; 6.8, 27 October 2026) ============
   The owner's words: "Ingenium is not properly formatted for my iphone screen, the status panel is clipped from view".
   And on 6.7 (27 October 2026): "I want the old display back but I want it fixed. Making everything bigger is not fixing it."
   So the keys, boxes, lists and the side column keep their 6.6 sizes and places on a phone and a tablet. What this part does:
   1. The top bar shows the seal alone when the name would be cut (its name, "Open the introduction", stays for screen
      readers), the model's name only when it fits, and the keys' signs alone when their words would not fit. Below 360
      pixels the keys wrap to a second row rather than leave the window.
   2. Every panel of the top bar (status, Display, Help) and the panels of the side keys open whole inside the window, clear
      of the notch and the home bar and under the top bar, and scroll inside themselves when they are taller.
   3. The row of pages under the top bar scrolls sideways on a phone: a soft fade at its edge says there is more, and the
      page that is open is always brought into view.
   And the status list, a menu, names each of its keys as one (axe-core found its time report key a plain button there). */

/* the thought cloud is centred by its own width: it keeps clear of the notch when the phone is held sideways */
html body .tc-cloud{max-width:calc(100vw - var(--sal,0px) - var(--sar,0px) - 16px) !important}

/* ---- 1. the top bar ---- */
html.ing-tb-seal body .topbar #brandSealBtn .bname{display:none !important}
html.ing-tb-seal body .topbar #brandSealBtn{padding:0 !important;justify-content:center}
html.ing-tb-dot body .topbar #activeModelPill .nm{position:absolute !important;width:1px !important;height:1px !important;overflow:hidden !important;clip:rect(0 0 0 0) !important;clip-path:inset(50%) !important;white-space:nowrap !important;margin:-1px !important;padding:0 !important;border:0 !important}
html.ing-tb-dot body .topbar #activeModelPill{position:relative}
html.ing-tb-icons body .topbar .cl-key .kl,html.ing-tb-icons body .topbar #ingHelpKey .kl,html.ing-tb-icons body #engineText,html.ing-tb-icons body #statusText{display:none !important}
html.ing-tb-icons body .topbar .cl-key .kico{display:block !important}
html.ing-tb-icons body .topbar :is(#statusPill,#enginePill,#displayBtn,#aboutBtn,#ingHelpKey){padding:0 !important;width:30px;justify-content:center}

/* a very narrow phone (under 360 pixels): the top bar's keys wrap to a second row rather than leave the window */
@media (pointer:coarse) and (max-width:359px){
  html body .topbar .topbar-tools{flex:0 1 auto;min-width:0;flex-wrap:wrap;justify-content:flex-end;row-gap:4px}
}

/* ---- 2. a dialog (About, and the others in the same frame) stays inside the frame's padding, which keeps clear of the notch
   and the home bar, and scrolls inside itself ---- */
@media (max-width:760px),(max-height:520px){
  html body #modalRoot > #modalBox{max-height:min(88vh,100%);overflow-y:auto}
}

/* ---- 3. the row of pages: a fade where there is more to scroll to ---- */
@media (max-width:760px){
  html body .dock.ing-more-r{-webkit-mask-image:linear-gradient(90deg,#000 calc(100% - 36px),transparent);mask-image:linear-gradient(90deg,#000 calc(100% - 36px),transparent)}
  html body .dock.ing-more-l{-webkit-mask-image:linear-gradient(90deg,transparent,#000 36px);mask-image:linear-gradient(90deg,transparent,#000 36px)}
  html body .dock.ing-more-l.ing-more-r{-webkit-mask-image:linear-gradient(90deg,transparent,#000 36px,#000 calc(100% - 36px),transparent);mask-image:linear-gradient(90deg,transparent,#000 36px,#000 calc(100% - 36px),transparent)}
}
</style>
<script>try{(window.__ingParts=window.__ingParts||{})["p95"]="started";}catch(_){}
/* R174 · Ingenium on a phone: see the note at the top of its styles */
(function(){"use strict";
if(window.__r174)return;window.__r174=1;
var D=document,root=D.documentElement;
function $(id){return D.getElementById(id);}
function shown(e){if(!e||!e.isConnected)return false;var c=getComputedStyle(e);return c.display!=="none"&&c.visibility!=="hidden";}
/* the safe areas (the notch, the home bar) as the browser gives them */
var probe=null;
function safe(){try{if(!probe){probe=D.createElement("div");probe.setAttribute("aria-hidden","true");
    probe.style.cssText="position:fixed;left:0;top:0;width:0;height:0;visibility:hidden;pointer-events:none;padding:env(safe-area-inset-top,0px) env(safe-area-inset-right,0px) env(safe-area-inset-bottom,0px) env(safe-area-inset-left,0px)";}
  if(!probe.isConnected)D.body.appendChild(probe);var c=getComputedStyle(probe);
  return {t:parseFloat(c.paddingTop)||0,r:parseFloat(c.paddingRight)||0,b:parseFloat(c.paddingBottom)||0,l:parseFloat(c.paddingLeft)||0};}catch(e){return {t:0,r:0,b:0,l:0};}}
function barBottom(){var t=D.querySelector(".topbar");if(!t||!shown(t))return 0;return Math.max(0,t.getBoundingClientRect().bottom);}

/* ---------- 1. the top bar ---------- */
function topFit(){try{
  var bar=D.querySelector(".topbar"),tools=$("topTools"),wm=$("brandName"),nm=$("activeModelName");if(!bar)return;
  root.classList.remove("ing-tb-seal","ing-tb-icons","ing-tb-dot");
  var narrow=(window.innerWidth||0)<=760,edge=(window.innerWidth||0)-safe().r-2;
  function over(){return bar.scrollWidth>bar.clientWidth+1||(tools&&tools.getBoundingClientRect().right>edge);}
  /* the name is cut (a phone upright, or held sideways with the keys' words showing), or the bar is wider than the window:
     the seal alone */
  if((wm&&shown(wm)&&wm.scrollWidth>wm.clientWidth+1)||over())root.classList.add("ing-tb-seal");
  /* still too wide (a phone held sideways shows the keys' words): the keys show their signs only */
  if(over())root.classList.add("ing-tb-icons");
  /* the model's name only when it can be read whole, or nearly (a long name ends in an ellipsis), and the keys still fit */
  if(nm&&nm.textContent.trim()){var w=nm.getBoundingClientRect().width;if(over()||(narrow&&w<56&&nm.scrollWidth>nm.clientWidth+1))root.classList.add("ing-tb-dot");}
}catch(e){}}

/* ---------- 2. panels inside the window and its safe areas ---------- */
var PANELS=".pres-menu,#displayPanel,#ihPanel,#schedaePanel,.park-pop,#tourMenu,.ctx-panel,#remPanel,#bellPanel";
/* what this part wrote on a panel is undone before it measures again, and the panel's own values (the status list is placed
   under its key by the page) come back, so a second look gives the same answer and the panel never jumps; a value the page
   wrote since is the page's and stays */
function unfit(e){var o=e.__r174;if(!o||typeof o!=="object")return;e.__r174=null;
  Object.keys(o).forEach(function(p){var s=o[p];
    if(e.style.getPropertyValue(p)!==s.mine||e.style.getPropertyPriority(p)!=="important")return;
    if(s.v)e.style.setProperty(p,s.v,s.pr);else e.style.removeProperty(p);});}
function fitPanel(e){try{
  if(!e||!e.isConnected||e.hidden||!shown(e))return;
  if(getComputedStyle(e).position!=="fixed")return;
  unfit(e);
  var sf=safe(),W=window.innerWidth,H=window.innerHeight,M=8,hb=barBottom();
  var L=sf.l+M,R=W-sf.r-M,T=Math.max(sf.t+M,hb?hb+6:0),B=H-sf.b-M;
  /* where its own rules put it (offsets: the layout's box, not a moment of its opening animation) */
  var x=e.offsetLeft,y=e.offsetTop,w=e.offsetWidth,h=e.offsetHeight,set={};
  if(!(w>0&&h>0))return;
  if(w>R-L){set["max-width"]=(R-L)+"px";w=R-L;}
  if(x<L||x+w>R){set.left=Math.round(Math.min(Math.max(x,L),R-w))+"px";set.right="auto";}
  if(h>B-T){set.top=T+"px";set.bottom="auto";set["max-height"]=(B-T)+"px";set["overflow-y"]="auto";}
  else if(y<T){set.top=T+"px";set.bottom="auto";}
  else if(y+h>B){
    /* a sheet that rises from the foot (nearer the foot than the top bar) rises a little more; a list that falls from the top
       bar keeps its place and is made shorter, scrolling inside itself */
    var sheet=(H-(y+h))<(y-T);
    if(!sheet&&B-y>=Math.min(h,260)){set.top=Math.round(y)+"px";set.bottom="auto";set["max-height"]=Math.floor(B-y)+"px";set["overflow-y"]="auto";}
    else{set.top=Math.round(B-h)+"px";set.bottom="auto";}}
  /* 6.8: a panel held by its top and its foot (Help) takes its height from them; once its foot is let go it would grow to all
     it holds (987 pixels on a phone held sideways), so it keeps the height it had, or what fits, and scrolls inside itself */
  if(set.bottom==="auto"&&!set["max-height"]){var t0=parseFloat(set.top);if(!(t0>=0))t0=y;
    set["max-height"]=Math.floor(Math.min(h,B-t0))+"px";set["overflow-y"]="auto";}
  var ks=Object.keys(set);if(!ks.length)return;var o={};
  ks.forEach(function(p){o[p]={v:e.style.getPropertyValue(p),pr:e.style.getPropertyPriority(p)};e.style.setProperty(p,set[p],"important");o[p].mine=e.style.getPropertyValue(p);});e.__r174=o;
}catch(x){}}
/* the status list is a menu: each of its keys says so (the time report's key said nothing, so a screen reader met a plain
   button inside a menu), and its rule is a separator */
function presTidy(){try{var m=D.querySelector(".pres-menu");if(!m||m.__r174t)return;m.__r174t=1;
  [].forEach.call(m.querySelectorAll("button:not([role])"),function(b){b.setAttribute("role","menuitem");});
  [].forEach.call(m.querySelectorAll(".pres-rule"),function(r){r.setAttribute("role","separator");});
  if(!m.hasAttribute("aria-label")&&!m.hasAttribute("aria-labelledby"))m.setAttribute("aria-label","Status");}catch(e){}}
function fitAll(){try{presTidy();[].forEach.call(D.querySelectorAll(PANELS),fitPanel);}catch(e){}}
function fitSoon(){presTidy();requestAnimationFrame(function(){fitAll();});setTimeout(fitAll,120);setTimeout(fitAll,450);}

/* ---------- 3. the row of pages ---------- */
function dockFade(){try{var d=D.querySelector(".dock");if(!d)return;
  var wide=(window.innerWidth||0)>760,sc=d.scrollWidth>d.clientWidth+2;
  d.classList.toggle("ing-more-r",!wide&&sc&&d.scrollLeft+d.clientWidth<d.scrollWidth-4);
  d.classList.toggle("ing-more-l",!wide&&sc&&d.scrollLeft>4);
  if(!d.__r174d){d.__r174d=1;d.addEventListener("scroll",function(){dockFade();},{passive:true});}}catch(e){}}
function dockShowActive(){try{var d=D.querySelector(".dock");if(!d||(window.innerWidth||0)>760)return;
  var a=d.querySelector(".nav-btn.active");if(!a)return;var dr=d.getBoundingClientRect(),ar=a.getBoundingClientRect();
  if(ar.left<dr.left+8||ar.right>dr.right-8){var to=d.scrollLeft+(ar.left-dr.left)-(dr.width-ar.width)/2;d.scrollTo({left:Math.max(0,to),behavior:"auto"});}
  dockFade();}catch(e){}}

/* ---------- when to look again ---------- */
function all(){topFit();dockFade();fitAll();}
var rz=0;function soon(){clearTimeout(rz);rz=setTimeout(all,80);}
window.addEventListener("resize",soon);
try{window.addEventListener("orientationchange",function(){setTimeout(all,250);});}catch(e){}
try{if(window.visualViewport)visualViewport.addEventListener("resize",soon);}catch(e){}
try{new MutationObserver(function(ms){var p=false;ms.forEach(function(m){
    if(m.type==="childList")[].forEach.call(m.addedNodes,function(n){if(n.nodeType===1&&(n.matches(PANELS)||n.querySelector&&n.querySelector(PANELS)))p=true;});
    else p=true;});if(p)fitSoon();})
  .observe(D.body,{childList:true,subtree:false,attributes:true,attributeFilter:["hidden"],attributeOldValue:false});}catch(e){}
try{new MutationObserver(function(ms){ms.forEach(function(m){if(m.target&&m.target.nodeType===1&&m.target.matches&&m.target.matches(PANELS))fitSoon();});})
  .observe(D.body,{subtree:true,attributes:true,attributeFilter:["hidden"]});}catch(e){}
/* the body's classes and settings (Focus, the text's size) */
try{new MutationObserver(function(){soon();}).observe(D.body,{attributes:true,attributeFilter:["class","data-focus","data-text","data-nav","data-gap"]});}catch(e){}
/* the model's name changes */
try{var nm=$("activeModelName");if(nm)new MutationObserver(function(){topFit();}).observe(nm,{childList:true,characterData:true,subtree:true});}catch(e){}
/* a page opened: its key brought into view in the row of pages */
try{if(typeof go==="function"){var og=go;go=function(){var r=og.apply(this,arguments);setTimeout(dockShowActive,60);setTimeout(fitAll,60);return r;};window.go=go;}}catch(e){}
if(D.readyState==="loading")D.addEventListener("DOMContentLoaded",all);else all();
try{window.addEventListener("load",function(){all();dockShowActive();});}catch(e){}
try{if(D.fonts&&D.fonts.ready)D.fonts.ready.then(topFit);}catch(e){}
window.IngPhone={fit:all,panels:fitAll};
})();
;try{window.__ingParts["p95"]="running";}catch(_){}
</script>
