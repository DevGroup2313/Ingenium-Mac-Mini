<style id="r378-css">
/* ============ R378 · INGENIA'S APP LOGOS, AS LECTOR'S AND FABRICA'S (Ingenium 7.79, 25 November 2026) ============
   Her words (25 November 2026): "I want you to make the apps' logos animated and 3D on their folder pages inside of the Ingenia page.
   I want their logo icons to not be a still image"; then, of the previews that missed it: "I just want the apps logos to be animated
   buttons and have the same 3D look and effect on the Ingenia page that they have on the Fabrica and Lector page."
   So nothing new is drawn: Ingenia's app logos are made exactly as Fabrica makes them (modules/r112.js sealEl, its .f-ls styles and its
   pointer), from the same seals in layers that Lector carries (window.LX7_LAYERS: Carpe Diem, The Forge, Ingenium, Inkwell, Lakay and
   Clavis, by day and by night). Each layer stands at its own depth, with the seal's edge and its cast shadow; at rest the logo sways as
   Fabrica's do; under the pointer it tilts to follow it and lifts; pressed, it sinks. Every app logo on the page is made so: the open
   folder's head, the folders standing in the drawer, their tabs and the index cards. A logo she gave an app herself (modules/r277.js)
   stays hers, and moves the same way. Ingenium's seal pressed faintly into How I work is a watermark and stays as it is.
   Minimal motion and the system's reduced motion still the sway, as on Fabrica. */
/* Ingenia's own rule for its seals (r263: a block of automatic height, under a drop shadow) gives way here: a shadow over the layers would
   press them flat, and the layers stand inside the logo's own square */
#page-folders .ig-ls,#page-folders.fd-on .ig-ls.fd-seal{position:relative;display:inline-block !important;width:var(--S,56px) !important;height:var(--S,56px) !important;max-width:none !important;
  perspective:calc(var(--S,56px) * 7);--rx:0deg;--ry:0deg;--lift:0px;--sc:1;flex:0 0 auto;vertical-align:middle;filter:none !important;border-radius:0 !important;background:none !important}
#page-folders .ig-ls-tilt{position:absolute;inset:0;display:block;transform-style:preserve-3d;transform:rotateX(var(--rx)) rotateY(var(--ry)) translateY(var(--lift)) scale(var(--sc));transition:transform .35s cubic-bezier(.2,.8,.2,1)}
#page-folders .ig-ls-idle{position:absolute;inset:0;display:block;transform-style:preserve-3d;animation:igSway 11s ease-in-out infinite}
@keyframes igSway{0%,100%{transform:rotateX(5deg) rotateY(-7deg)}50%{transform:rotateX(-4deg) rotateY(7deg)}}
#page-folders .ig-ls-l{position:absolute;inset:0;width:100%;height:100%;display:block;max-width:none;pointer-events:none;backface-visibility:hidden;transform:translateZ(calc(var(--S,56px) * var(--z) * var(--igz,1))) scale(calc(1 - var(--z) * var(--igz,1) / 7))}
#page-folders .ig-ls-l.side{transform:translateZ(calc(var(--S,56px) * -.03)) translateY(2.5%) scale(1.0075)}
#page-folders .ig-ls-cast{position:absolute;left:14%;right:14%;bottom:-9%;height:14%;border-radius:50%;display:block;background:radial-gradient(closest-side,rgba(42,20,80,.26),rgba(42,20,80,0));filter:blur(1.5px);transform:translateZ(calc(var(--S,56px) * -.08))}
body[data-theme="night"] #page-folders .ig-ls-cast{background:radial-gradient(closest-side,rgba(0,0,0,.5),rgba(0,0,0,0))}
#page-folders .ig-ls.flat .ig-ls-l{transform:none}
#page-folders .ig-ls.hov{--lift:calc(var(--S,56px) * -.06);--sc:1.04}
#page-folders .ig-ls.hov .ig-ls-idle{animation-play-state:paused}
/* 7.82, her words (25 November 2026): "The apps logos on the Ingenia folders page are animated but are still not clickable. I was very
   clear about wanting them to be made into clickable buttons the same way Ingenium's engine logo button is." Ingenium's own logo in the top
   bar (r104) sinks when pressed, its cast spreading beneath it, then knocks back up as it is let go, its layers seating as it rises. Each
   app's logo now does the same, in the same timings: pressed, it sinks deeper; let go, it knocks, and its layers draw together and part
   again to their depths; the open folder's logo is a button, with Ingenium's key sound, from the mouse, a touch or the keyboard. */
@property --igz{syntax:"<number>";inherits:true;initial-value:1}
#page-folders .ig-ls{cursor:pointer;--igz:1}
#page-folders .ig-ls.down{--lift:calc(var(--S,56px) * .05);--sc:.94}
#page-folders .ig-ls.down .ig-ls-cast{opacity:1;transform:translateZ(calc(var(--S,56px) * -.08)) scale(1.06)}
#page-folders .ig-ls.knock .ig-ls-tilt{animation:igKnock .55s cubic-bezier(.3,.7,.3,1)}
#page-folders .ig-ls.knock{animation:igSeat .9s cubic-bezier(.2,.9,.25,1)}
@keyframes igKnock{0%{translate:0 calc(var(--S,56px) * .03)}45%{translate:0 calc(var(--S,56px) * -.035)}75%{translate:0 calc(var(--S,56px) * .008)}100%{translate:0 0}}
@keyframes igSeat{0%{--igz:.3}55%{--igz:1.3}100%{--igz:1}}
body[data-motion="minimal"] #page-folders .ig-ls.knock,body[data-motion="minimal"] #page-folders .ig-ls.knock .ig-ls-tilt{animation:none}
@media (prefers-reduced-motion:reduce){#page-folders .ig-ls.knock,#page-folders .ig-ls.knock .ig-ls-tilt{animation:none}}
#page-folders .ig-ls.down .ig-ls-tilt{transition-duration:.08s}
#page-folders .ig-key{cursor:pointer;border-radius:50%;outline:none}
#page-folders .ig-key:focus-visible{outline:2.5px solid var(--accent,#6a3fb5);outline-offset:4px}
body[data-motion="minimal"] #page-folders .ig-ls-idle{animation:none}
body[data-motion="minimal"] #page-folders .ig-ls-tilt{transform:none !important}
@media (prefers-reduced-motion:reduce){#page-folders .ig-ls-idle{animation:none}#page-folders .ig-ls-tilt{transition:none}}
#page-folders .ig-ls.down .ig-ls-tilt{transition-duration:.08s}
/* 8.04: weighted, as the doors draw them. Her words (27 November 2026): "All of the apps logos look flat and one dimensional on the Ingenia folder pages, especially Clavis
   which even folds and bends while animated. I HATE THAT. There is also this small and light purple shadow that moves with the apps'
   logos which adds to enhanced flat and 1D look of the logo animated buttons. I want that all to be fixed and for all of the apps logos
   especially Clavis' look proper and like truly 3D weighted animated buttons like they all do on their introduction doors."
   Found: each logo was flat layers 18 degrees each way under a deep perspective (Clavis, The Forge, Carpe Diem and Ingenium had no rim,
   so their faces were paper-thin), two of the presses turned it a full round sideways (twirl, flip: r402), which showed its flat layers
   edge on, and a blurred violet oval swam beneath it. Now: the door's sway, a lean of 12 degrees at most, a shallower perspective, a rim
   of four layers behind the face where a logo has none, each raised layer casting its own small shadow on the one below, and a soft
   shadow of the plate itself beneath it, neutral, never violet. */
#page-folders .ig-ls-l.rim{filter:brightness(var(--b,.8)) saturate(.85)}
body[data-theme="night"] #page-folders .ig-ls-l.rim{filter:brightness(calc(var(--b,.8) * .8)) saturate(.85)}
#page-folders .ig-ls-l:not(.rim):not(.side){filter:drop-shadow(0 calc(var(--S,56px) * var(--z,0) * .10) calc(var(--S,56px) * var(--z,0) * .14) rgba(20,14,30,.24))}
body[data-theme="night"] #page-folders .ig-ls-l:not(.rim):not(.side){filter:drop-shadow(0 calc(var(--S,56px) * var(--z,0) * .10) calc(var(--S,56px) * var(--z,0) * .14) rgba(0,0,0,.5))}
#page-folders .ig-ls-cast{left:3%;right:3%;top:3%;bottom:3%;height:auto;border-radius:50%;background:none !important;filter:none;transform:translateZ(calc(var(--S,56px) * -.06));
  box-shadow:0 calc(var(--S,56px) * .05) calc(var(--S,56px) * .09) rgba(20,14,30,.22),0 calc(var(--S,56px) * .13) calc(var(--S,56px) * .22) rgba(20,14,30,.12)}
body[data-theme="night"] #page-folders .ig-ls-cast{box-shadow:0 calc(var(--S,56px) * .05) calc(var(--S,56px) * .09) rgba(0,0,0,.55),0 calc(var(--S,56px) * .13) calc(var(--S,56px) * .22) rgba(0,0,0,.38)}
#page-folders .ig-ls.flat .ig-ls-cast,#page-folders .ig-ls.obj .ig-ls-cast{display:none}
/* an object (Clavis's astrolabe) casts the shadow of its own outline, and its parts stand closer, so they stay in register as it sways */
#page-folders .ig-ls.obj{--igz:.6}
#page-folders .ig-ls.obj .ig-ls-l.face{filter:drop-shadow(0 calc(var(--S,56px) * .03) calc(var(--S,56px) * .035) rgba(20,14,30,.32)) drop-shadow(0 calc(var(--S,56px) * .08) calc(var(--S,56px) * .1) rgba(20,14,30,.14))}
body[data-theme="night"] #page-folders .ig-ls.obj .ig-ls-l.face{filter:drop-shadow(0 calc(var(--S,56px) * .03) calc(var(--S,56px) * .035) rgba(0,0,0,.6)) drop-shadow(0 calc(var(--S,56px) * .08) calc(var(--S,56px) * .1) rgba(0,0,0,.35))}
</style>
<script>try{(window.__ingParts=window.__ingParts||{})["p378"]="started";}catch(_){}
/* R378 · Ingenia's app logos, as Lector's and Fabrica's: see the note at the top of its styles. window.IngFolderLogos: {paint(), made()} */
(function r378(){"use strict";
if(window.IngFolderLogos)return;
var W=window,D=document;
/* no app is named here: an app's name is read from its folder (an edition carries only the apps it carries, and names no other) */
function nameOf(k){try{var fs=W.IngFolders&&typeof IngFolders.folders==="function"?IngFolders.folders():[];for(var i=0;i<fs.length;i++){if(W.IngAppLogo&&IngAppLogo.key(fs[i].name)===k)return fs[i].name;}}catch(e){}return "";}
/* the sway of each starts at its own moment, as on Fabrica, so the logos never move in step */
function delayOf(k){var n=0;for(var i=0;i<k.length;i++)n=(n*31+k.charCodeAt(i))%997;return (n%60)/10;}
function night(){return D.body.getAttribute("data-theme")==="night";}
function page(){return D.getElementById("page-folders");}
function mine(k){try{if(!W.IngAppLogo||typeof IngAppLogo.own!=="function")return "";var n=nameOf(k);return n?IngAppLogo.own(n)||"":"";}catch(e){}return "";}
function sizeOf(e){var w=parseFloat(e.style.width)||e.width||0;if(!w){var r=e.getBoundingClientRect();w=r.width;}return Math.max(18,Math.round(w||56));}
function h(tag,cls){var e=D.createElement(tag);if(cls)e.className=cls;return e;}
/* Fabrica's sealEl, made for Ingenia: the seal in its layers, each at its depth, its edge and its cast; or, for a logo of her own, that logo */
/* 8.04: objects, not plates, as Clavis's own door draws its astrolabe (its seal options, sopt-free): no rim and no plate's shadow */
var OBJ={clavis:1};
function make(k,size){var L=W.LX7_LAYERS||{},key=night()&&L[k+"N"]?k+"N":k,ls=L[key],own=mine(k);
  var root=h("span","ig-ls fd-seal");root.setAttribute("aria-hidden","true");root.setAttribute("data-fd-seal",k);root.setAttribute("data-ig",key+(own?":own":""));root.style.setProperty("--S",size+"px");
  var tilt=h("span","ig-ls-tilt"),idle=h("span","ig-ls-idle");idle.style.animationDelay=(-delayOf(k))+"s";idle.appendChild(h("i","ig-ls-cast"));
  if(own||!ls){root.classList.add("flat");var im=new Image();im.src=own||"";im.alt="";im.className="ig-ls-l";idle.appendChild(im);}
  else{var obj=OBJ[String(k).replace(/N$/,"")]===1,rim=!obj&&ls.filter(function(L1){return L1.z<0;}).length<3,face=ls.filter(function(L1){return !L1.side&&L1.z===0;})[0];if(obj)root.classList.add("obj");
    if(rim&&face)[[-.012,.84],[-.024,.76],[-.036,.68],[-.048,.6]].forEach(function(R){var im=new Image();im.src=face.src;im.alt="";im.className="ig-ls-l rim";im.style.setProperty("--z",String(R[0]));im.style.setProperty("--b",String(R[1]));idle.appendChild(im);});
    ls.forEach(function(L1){var im=new Image();im.src=L1.src;im.alt="";im.className="ig-ls-l"+(L1.side?" side":"")+(L1===face?" face":"");im.style.setProperty("--z",String(L1.z));idle.appendChild(im);});}
  tilt.appendChild(idle);root.appendChild(tilt);return root;}
var busy=false;
function paint(){var pg=page();if(!pg||busy)return 0;var L=W.LX7_LAYERS||{},n=0;busy=true;
  try{[].forEach.call(pg.querySelectorAll(".fd-seal"),function(e){var k=e.getAttribute("data-fd-seal");if(!k||k==="app"||e.classList.contains("fd-wm"))return;
      if(!L[k]&&!mine(k))return;
      var want=(night()&&L[k+"N"]?k+"N":k)+(mine(k)?":own":"");if(e.classList.contains("ig-ls")&&e.getAttribute("data-ig")===want)return;
      var nw=make(k,sizeOf(e));if(e.classList.contains("ig-ls"))nw.style.setProperty("--S",e.style.getPropertyValue("--S"));
      /* the open folder's own logo is a key of its own: it answers the pointer and the keyboard */
      if(e.closest(".fd-oh")){nw.classList.add("ig-key");nw.setAttribute("role","button");nw.removeAttribute("aria-hidden");nw.setAttribute("aria-label",(nameOf(k)||"The app")+"'s logo");nw.title=(nameOf(k)||"The app")+"'s logo: press it";nw.tabIndex=0;}
      e.replaceWith(nw);n++;});}catch(x){try{console.warn("Ingenia logos:",x);}catch(_){}}
  busy=false;return n;}
/* the pointer, as on Fabrica: the logo of the folder, tab, card or head under it tilts to follow it and lifts; pressed, it sinks */
function clamp(v,a,b){return Math.max(a,Math.min(b,v));}
var HOST=".fd-oh,.fd-file,.fd-front,.fd-tab,.fld-card,button,[role=button],.ig-key";
function lsOf(e){var t=e.target&&e.target.closest?e.target.closest(HOST):null;if(!t||!page()||!page().contains(t))return null;return t.classList.contains("ig-ls")?t:t.querySelector(".ig-ls");}
function off(except){var pg=page();if(!pg)return;[].forEach.call(pg.querySelectorAll(".ig-ls.hov,.ig-ls.down"),function(x){if(x!==except){x.classList.remove("hov","down");x.style.removeProperty("--rx");x.style.removeProperty("--ry");}});}
function wire(){var pg=page();if(!pg||pg.__r378)return;pg.__r378=1;
  pg.addEventListener("pointermove",function(e){var ls=lsOf(e);off(ls);if(!ls||e.pointerType==="touch")return;var r=ls.getBoundingClientRect();if(!r.width)return;
    var px=(e.clientX-r.left)/r.width-.5,py=(e.clientY-r.top)/r.height-.5;ls.classList.add("hov");
    ls.style.setProperty("--ry",(clamp(px,-.8,.8)*15).toFixed(1)+"deg");ls.style.setProperty("--rx",(-clamp(py,-.8,.8)*15).toFixed(1)+"deg");},{passive:true});
  pg.addEventListener("pointerleave",function(){off(null);});
  pg.addEventListener("pointerdown",function(e){var ls=lsOf(e);if(ls)ls.classList.add("down");},{passive:true});
  pg.addEventListener("pointerup",function(){[].forEach.call(pg.querySelectorAll(".ig-ls.down"),function(x){x.classList.remove("down");knock(x);});},{passive:true});
  pg.addEventListener("pointercancel",function(){[].forEach.call(pg.querySelectorAll(".ig-ls.down"),function(x){x.classList.remove("down");});},{passive:true});
  pg.addEventListener("keydown",function(e){var k=e.target;if(!(k&&k.classList&&k.classList.contains("ig-key")))return;if(e.key==="Enter"||e.key===" "){e.preventDefault();if(e.repeat)return;k.classList.add("down");setTimeout(function(){k.classList.remove("down");knock(k);},140);}});}
function still(){try{return D.body.getAttribute("data-motion")==="minimal"||matchMedia("(prefers-reduced-motion: reduce)").matches;}catch(e){return false;}}
function knock(x){try{if(x.classList.contains("ig-key")&&W.IngSound&&IngSound.play)IngSound.play("keys");}catch(e){}if(still())return;
  x.classList.remove("knock");void x.offsetWidth;x.classList.add("knock");clearTimeout(x.__kn);x.__kn=setTimeout(function(){x.classList.remove("knock");},950);}
/* Ingenia draws its pages again as she works (r208, r263, r300): each time, its logos are made again here */
var T=0;function soon(){if(T)return;T=setTimeout(function(){T=0;wire();paint();},40);}
function watch(){var pg=page();if(!pg||pg.__r378w)return false;pg.__r378w=1;
  try{new MutationObserver(function(rs){if(busy)return;for(var i=0;i<rs.length;i++){var a=rs[i].addedNodes;for(var j=0;j<a.length;j++){var n=a[j];if(n.nodeType===1&&!(n.classList&&n.classList.contains("ig-ls"))&&(n.classList.contains("fd-seal")||n.querySelector&&n.querySelector(".fd-seal:not(.ig-ls)"))){soon();return;}}}})
      .observe(pg,{childList:true,subtree:true});}catch(e){}
  try{new MutationObserver(function(){soon();}).observe(D.body,{attributes:true,attributeFilter:["data-theme"]});}catch(e){}
  soon();return true;}
(function start(){var n=0;(function w(){if(watch())return;if(++n<240)setTimeout(w,500);})();})();
(function wrapGo(){var og=W.go;if(typeof og!=="function"||og.__r378)return;var ng=function(p){var r=og.apply(this,arguments);try{if(p==="folders"){watch();soon();}}catch(e){}return r;};
  try{Object.keys(og).forEach(function(k){ng[k]=og[k];});}catch(e){}ng.__r378=true;W.go=go=ng;})();
W.IngFolderLogos={paint:function(){wire();return paint();},made:function(){var pg=page();return pg?pg.querySelectorAll(".ig-ls").length:0;}};
})();
;try{window.__ingParts["p378"]="running";}catch(_){}
</script>
