<style id="r174-css">
/* ============ R174 · INGENIUM ON A PHONE (Ingenium 6.7, 25 October 2026) ============
   The owner's words: "Ingenium is not properly formatted for my iphone screen, the status panel is clipped from view and
   some other section of the app is hard to view and navigate when I am on my phone, please fix that as well."
   Measured on 6.6 in Chromium with an iPhone's user agent, touch and the notch's safe areas (rig/t_67_phone.js):
   - the status panel opened from the green dot ran off the left edge (it was placed under the dot by its right edge);
   - the side column of keys (the bell, the leaf, the thought cloud, the moon, the hourglass, the notes and the chevron)
     floated over the words of every card on a phone, where the page kept no room for it;
   - the top bar read "IN..." and its keys, like most keys on the pages, were 26 to 33 pixels high: too small for a finger.
   So, on a phone:
   1. The side column has a lane of its own. The owner wants the leaf in the column on every screen (r155), so the column
      stays a column, on the right, in its usual order, and the page keeps a gutter for it: words never run under a key.
      The keys are 44 pixels, the glyphs as before. A phone held sideways keeps one column, as r155 settled with the
      owner: the keys come a little smaller there (no less than r155's 38 pixels) and closer. Only where even that cannot
      fit (a phone with a notch held sideways, its home bar below) do the keys stand in two columns of 44 pixels side by
      side rather than shrink further. The lane does not move when the column is laid down, so nothing jumps under the
      reader's eyes. Above 720 pixels the page already keeps its gutter (76 pixels).
   2. The top bar shows the seal alone when the name would be cut (its name, "Open the introduction", stays for screen
      readers), the model's name only when it fits, and every key at 44 pixels. Below 360 pixels the keys wrap to a second
      row rather than leave the window.
   3. Every panel of the top bar (status, Display, Help) and the panels of the side keys open whole inside the window and
      clear of the notch and the home bar, under the top bar, and scroll inside themselves when they are taller.
   4. With a finger (a touch screen, on a phone or a phone held sideways), every key, box, list and fold is at least 44
      pixels high; a box to tick is larger and its whole line answers the finger.
   5. The row of pages under the top bar scrolls sideways on a phone: a soft fade at its edge says there is more, and the
      page that is open is always brought into view.
   And the status list, a menu, names each of its keys as one (axe-core found its time report key a plain button there). */

/* ---- 1. the side column's lane (html.ing-lane, set by the script below with the keys' places). The keys' own places are
   written with their ids and !important elsewhere, so these name them too ---- */
html.ing-lane body :is(#fabNote,#fabTimer,#fabTheme,#fabPark,#fabQuiet,#fabBell,#fabFloat,#railChevron):not(#r174-z){
  width:var(--ln-k,44px) !important;height:var(--ln-k,44px) !important;min-width:0 !important;min-height:0 !important;scale:1 !important;bottom:var(--ln-b,auto) !important;right:var(--ln-r,16px) !important;top:auto !important;left:auto !important}
html.ing-lane body :is(#fabNote,#fabTimer,#fabTheme,#fabFloat):not(#r174-z) > span,html.ing-lane body #fabBell:not(#r174-z) .bell{font-size:calc(var(--ln-k,44px) * .7) !important}
html.ing-lane body :is(#fabPark,#fabQuiet):not(#r174-z) > span{font-size:calc(var(--ln-k,44px) * .59) !important}
html.ing-lane body #railChevron:not(#r174-z){font-size:calc(var(--ln-k,44px) * .545) !important}
html.ing-lane body #railChevron:not(#r174-z)::before{top:4px;right:4px;bottom:4px;left:4px}
html.ing-lane body .shell{padding-right:var(--ln-gut,64px) !important}
/* the thought's small window, which stood beside the column, stands beside the lane */
html.ing-lane body .park-pop{right:calc(var(--ln-gut,64px) - 4px) !important}

/* the thought cloud is centred by its own width: it keeps clear of the notch when the phone is held sideways */
html body .tc-cloud{max-width:calc(100vw - var(--sal,0px) - var(--sar,0px) - 16px) !important}

/* ---- 2. the top bar ---- */
html.ing-tb-seal body .topbar #brandSealBtn .bname{display:none !important}
html.ing-tb-seal body .topbar #brandSealBtn{padding:0 !important;justify-content:center}
html.ing-tb-dot body .topbar #activeModelPill .nm{position:absolute !important;width:1px !important;height:1px !important;overflow:hidden !important;clip:rect(0 0 0 0) !important;clip-path:inset(50%) !important;white-space:nowrap !important;margin:-1px !important;padding:0 !important;border:0 !important}
html.ing-tb-dot body .topbar #activeModelPill{position:relative}
html.ing-tb-icons body .topbar .cl-key .kl,html.ing-tb-icons body .topbar #ingHelpKey .kl,html.ing-tb-icons body #engineText,html.ing-tb-icons body #statusText{display:none !important}
html.ing-tb-icons body .topbar .cl-key .kico{display:block !important}
html.ing-tb-icons body .topbar :is(#statusPill,#enginePill,#displayBtn,#aboutBtn,#ingHelpKey){padding:0 !important;width:30px;justify-content:center}

/* ---- 4. with a finger: 44 pixels ---- */
@media (pointer:coarse) and (max-width:760px),(pointer:coarse) and (max-height:520px){
  html body .topbar{gap:4px}
  html body .topbar .topbar-tools{gap:4px;flex:0 0 auto;padding:2px 0}
  html body .topbar .cl-key,html body .topbar #ingHelpKey{height:44px !important;min-height:44px;min-width:44px;border-radius:22px;box-sizing:border-box;padding:0 12px}
  html body .topbar .cl-key .kico{width:18px;height:18px}
  html body .topbar .cl-key .pdot,html body .topbar .cl-key .dot,html body .topbar .cl-key .swatch{width:11px;height:11px}
  html body .topbar #brandSealBtn{min-height:44px;min-width:44px;flex:0 1 auto}
  html body #navChevron{width:44px;height:44px;min-width:44px}
  html body .dock .grp-label.ing-fold{min-height:44px;align-items:center}
  html body :is(button,[role="button"],[role="tab"],[role="menuitem"],[role="menuitemradio"],[role="menuitemcheckbox"],[role="switch"],[role="option"],a.btn,select,
    input:not([type="checkbox"]):not([type="radio"]):not([type="range"]):not([type="hidden"]):not([type="file"]):not([type="color"]):not([type="image"]),textarea){min-height:44px !important}
  html body :is(button,[role="button"],[role="tab"],[role="switch"],a.btn,select){min-width:44px !important}
  html body a.btn{display:inline-flex;align-items:center;justify-content:center}
  html body summary{min-height:44px;box-sizing:border-box;padding-top:12px;padding-bottom:12px}
  html body input[type="checkbox"]:not([role="switch"]),html body input[type="radio"]{width:22px;height:22px;min-width:22px}
  html body label:has(> input[type="checkbox"]),html body label:has(> input[type="radio"]){min-height:44px}
  /* a link that is a key of its own (not words linked inside a sentence) */
  html body :is(a.small,a.lu-lic,a.btn.xs){display:inline-flex;align-items:center;min-height:44px}
  /* the chat's head: its keys on one row, the conversation's name on its own row beneath them, whole */
  html body #page-chat .chat-top.chat-top{flex-wrap:wrap !important;row-gap:6px}
  html body #page-chat .chat-top #ccTitle{order:9;flex:1 0 100%;max-width:100%;text-align:left}
  /* the grip that makes the chat longer or shorter: on a phone the chat already fits the window, and the grip, too small
     for a finger, would lie over the keys under the box where one writes */
  html body .chat-grip{display:none !important}
}
/* where the keys show only their signs (640 pixels and under), round keys of 44 pixels */
@media (pointer:coarse) and (max-width:640px){
  html body .topbar #statusPill,html body .topbar #enginePill,html body .topbar #displayBtn,html body .topbar #aboutBtn,html body .topbar #ingHelpKey{width:44px;padding:0}
  html.ing-tb-dot body .topbar #activeModelPill{width:44px;padding:0}
}
@media (pointer:coarse){
  html.ing-tb-icons body .topbar :is(#statusPill,#enginePill,#displayBtn,#aboutBtn,#ingHelpKey){width:44px}
  html.ing-tb-dot body .topbar #activeModelPill{width:44px;padding:0 !important}
}
/* a very narrow phone (under 360 pixels): the top bar's keys wrap to a second row rather than leave the window */
@media (pointer:coarse) and (max-width:359px){
  html body .topbar .topbar-tools{flex:0 1 auto;min-width:0;flex-wrap:wrap;justify-content:flex-end;row-gap:4px}
}

/* ---- 3. a dialog (About, and the others in the same frame) stays inside the frame's padding, which keeps clear of the notch
   and the home bar, and scrolls inside itself ---- */
@media (max-width:760px),(max-height:520px){
  html body #modalRoot > #modalBox{max-height:min(88vh,100%);overflow-y:auto}
}

/* ---- 5. the row of pages: a fade where there is more to scroll to ---- */
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
var COARSE=null;try{COARSE=matchMedia("(pointer: coarse)");}catch(e){}
/* the safe areas (the notch, the home bar) as the browser gives them */
var probe=null;
function safe(){try{if(!probe){probe=D.createElement("div");probe.setAttribute("aria-hidden","true");
    probe.style.cssText="position:fixed;left:0;top:0;width:0;height:0;visibility:hidden;pointer-events:none;padding:env(safe-area-inset-top,0px) env(safe-area-inset-right,0px) env(safe-area-inset-bottom,0px) env(safe-area-inset-left,0px)";}
  if(!probe.isConnected)D.body.appendChild(probe);var c=getComputedStyle(probe);
  return {t:parseFloat(c.paddingTop)||0,r:parseFloat(c.paddingRight)||0,b:parseFloat(c.paddingBottom)||0,l:parseFloat(c.paddingLeft)||0};}catch(e){return {t:0,r:0,b:0,l:0};}}
function barBottom(){var t=D.querySelector(".topbar");if(!t||!shown(t))return 0;return Math.max(0,t.getBoundingClientRect().bottom);}

/* ---------- 1. the side column's lane ---------- */
var KEYS=["fabNote","fabTimer","fabTheme","fabPark","fabQuiet","fabBell","fabFloat"],CHEV="railChevron",laneSig="";
function laneWanted(){var W=window.innerWidth||0,H=window.innerHeight||0;return W<=720||(!!(COARSE&&COARSE.matches)&&H<=520);}
function laneOff(){if(!root.classList.contains("ing-lane"))return;root.classList.remove("ing-lane");
  KEYS.concat([CHEV]).forEach(function(id){var e=$(id);if(e){e.style.removeProperty("--ln-b");e.style.removeProperty("--ln-r");}});
  root.style.removeProperty("--ln-gut");root.style.removeProperty("--ln-k");try{if(window.IngSideFit)IngSideFit.fit();}catch(e){}}
function lane(force){try{
  var keys=KEYS.map($).filter(shown),ch=$(CHEV);
  if(!laneWanted()||!ch||!shown(ch)||!keys.length){laneSig="";laneOff();return;}
  var sf=safe(),H=window.innerHeight||800,W=window.innerWidth||400,hb=Math.max(barBottom(),sf.t);
  var sig=[W,H,Math.round(hb),keys.map(function(k){return k.id;}).join(","),sf.r,sf.b].join("|");
  if(!force&&sig===laneSig&&root.classList.contains("ing-lane"))return;laneSig=sig;
  var n=keys.length+1,top=hb+8,foot=sf.b+10,avail=H-top-foot,cols=1,rows=n,K=44,g0=4;
  /* held sideways, where one column of 44 pixels cannot stand: one column still, of keys as large as fit and no smaller
     than r155's 38 pixels, closer together (its top a little under the top bar, where r155 looks for it) */
  if(W>H&&n*K+(n-1)*g0>avail){var t2=hb+5,f2=sf.b+6,a2=H-t2-f2,k2=Math.min(K,Math.floor((a2-(n-1)*2)/n));
    if(k2>=38){K=k2;g0=2;top=t2;foot=f2;avail=a2;}}
  while(cols<3){rows=Math.ceil(n/cols);if(rows*K+(rows-1)*g0<=avail)break;cols++;}
  rows=Math.ceil(n/cols);
  var gap=rows>1?Math.max(g0,Math.min(12,(avail-rows*K)/(rows-1))):0,R0=6+sf.r;
  /* the chevron heads the right-hand column; the keys fill that column from the foot up, then the next one */
  var slots=[],c,r;for(c=0;c<cols;c++)for(r=0;r<rows;r++)slots.push({c:c,r:r});
  var chSlot={c:0,r:rows-1},free=slots.filter(function(s){return !(s.c===chSlot.c&&s.r===chSlot.r);});
  function place(e,s){e.style.setProperty("--ln-b",Math.round(foot+s.r*(K+gap))+"px");e.style.setProperty("--ln-r",Math.round(R0+s.c*(K+4))+"px");}
  keys.forEach(function(k,i){place(k,free[i]);});place(ch,chSlot);
  root.style.setProperty("--ln-gut",Math.round(R0+cols*K+(cols-1)*4+8)+"px");root.style.setProperty("--ln-k",K+"px");
  if(!root.classList.contains("ing-lane")){root.classList.add("ing-lane");}
  /* the column's own fitting (r155) looks again, sees the column fits and lets it be */
  try{if(window.IngSideFit)IngSideFit.fit();}catch(e){}
}catch(e){try{console.warn("Ingenium on a phone (the side keys):",e&&e.message||e);}catch(_){}}}

/* ---------- 2. the top bar ---------- */
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

/* ---------- 3. panels inside the window and its safe areas ---------- */
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

/* ---------- 5. the row of pages ---------- */
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
function all(force){lane(force);topFit();dockFade();fitAll();}
var rz=0;function soon(){clearTimeout(rz);rz=setTimeout(function(){all(true);},80);}
window.addEventListener("resize",soon);
try{window.addEventListener("orientationchange",function(){setTimeout(function(){all(true);},250);});}catch(e){}
try{if(window.visualViewport)visualViewport.addEventListener("resize",soon);}catch(e){}
try{new MutationObserver(function(ms){var p=false;ms.forEach(function(m){
    if(m.type==="childList")[].forEach.call(m.addedNodes,function(n){if(n.nodeType===1&&(n.matches(PANELS)||n.querySelector&&n.querySelector(PANELS)))p=true;});
    else p=true;});if(p)fitSoon();})
  .observe(D.body,{childList:true,subtree:false,attributes:true,attributeFilter:["hidden"],attributeOldValue:false});}catch(e){}
try{new MutationObserver(function(ms){ms.forEach(function(m){if(m.target&&m.target.nodeType===1&&m.target.matches&&m.target.matches(PANELS))fitSoon();});})
  .observe(D.body,{subtree:true,attributes:true,attributeFilter:["hidden"]});}catch(e){}
/* the body's classes and settings (a column laid down, Focus, the text's size) */
try{new MutationObserver(function(){soon();}).observe(D.body,{attributes:true,attributeFilter:["class","data-focus","data-text","data-nav","data-gap"]});}catch(e){}
/* the model's name changes */
try{var nm=$("activeModelName");if(nm)new MutationObserver(function(){topFit();}).observe(nm,{childList:true,characterData:true,subtree:true});}catch(e){}
/* a page opened: its key brought into view in the row of pages */
try{if(typeof go==="function"){var og=go;go=function(){var r=og.apply(this,arguments);setTimeout(dockShowActive,60);setTimeout(fitAll,60);return r;};window.go=go;}}catch(e){}
/* a key that comes or goes (the float key, a window of its own) changes the column: looked at again every second, cheaply */
setInterval(function(){lane(false);dockFade();},1000);
if(D.readyState==="loading")D.addEventListener("DOMContentLoaded",function(){all(true);});else all(true);
try{window.addEventListener("load",function(){all(true);dockShowActive();});}catch(e){}
try{if(D.fonts&&D.fonts.ready)D.fonts.ready.then(function(){topFit();lane(true);});}catch(e){}
window.IngPhone={fit:function(){all(true);},panels:fitAll,lane:function(){lane(true);}};
})();
;try{window.__ingParts["p95"]="running";}catch(_){}
</script>
