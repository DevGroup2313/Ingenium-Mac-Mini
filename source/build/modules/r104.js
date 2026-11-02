<style id="r104-css">
/* ============ R104 · THE SEAL IN LAYERED DEPTH, AS CARPE DIEM'S AND THE FORGE'S ============
   Her word (15 October 2026): "I just want the current design to get the layered depth look and animation that Carpe
   Diem and the Forge's seal logos have." The seal is drawn exactly as before, in the same colours, and cut the way
   Carpe Diem 1048 and The Forge 9s58 cut theirs: the face with its rim at the back, the turning ring a little above it,
   the star above that and the heart stone in front, each layer standing at its own depth. It sways slowly so the
   layers slide past one another; under a mouse it turns to follow it and lifts; pressed, it sinks; it knocks before it
   opens the door (or the desk); and the layers part as it rises. The star still turns, the stone still beats and the
   ring still turns against them. Minimal motion and the system's reduced motion still it all.
   Approved the same day ("I like this new raised depth look for the logo, lets push it everywhere"), with its shadows
   made lighter at her word ("reduce the thick dark shadow on the seal button"): the cast beneath it and the layers'
   shadows are about forty per cent lighter by day and by night. The app's icons are this seal, standing still.
   Her report the next day: "the 4.0 seal button does[n't] really sway much ... I have to hover over it with my mouse to
   see any animation unlike Carpe Diem and the Forge's introduction door". Carpe Diem stills its sway in Calm, which
   there is a choice; in Ingenium Calm is the setting every desk starts with, so the seal stood still for her. It now
   sways in Calm as in Full, as the other doors do; only Minimal motion (and the system's reduced motion) stills it. */
html body .isl{position:relative;display:block;width:var(--S);height:var(--S);flex:0 0 auto;perspective:calc(var(--S) * 4);
 --rx:0deg;--ry:0deg;--cdl:0px;--cds:1;border-radius:50%;overflow:visible;
 filter:none !important;animation:none !important;transform:none !important;transition:none !important;-webkit-tap-highlight-color:transparent}
html body .isl .isl-tilt{position:absolute;left:0;top:0;width:100%;height:100%;display:block;transform-style:preserve-3d;
 transform:rotateX(var(--rx)) rotateY(var(--ry)) translateY(var(--cdl)) scale(var(--cds));transition:transform .35s cubic-bezier(.2,.8,.2,1)}
html body .isl .isl-idle{position:absolute;left:0;top:0;width:100%;height:100%;display:block;transform-style:preserve-3d;animation:islSway 7s ease-in-out infinite}
html body .isl .isl-edge{position:absolute;left:0;top:0;width:100%;height:100%;display:block;transform-style:preserve-3d;pointer-events:none}
/* the seal's body under its face: the face's own size, so nothing is added to the drawing but its depth */
html body .isl .isl-base{position:absolute;left:2.6%;top:2.6%;width:94.8%;height:94.8%;border-radius:50%;display:block;transform:translateZ(-.6px);
 background:radial-gradient(circle at var(--gx,36%) var(--gy,26%),rgba(255,255,255,.95) 0%,rgba(255,255,255,0) 44%),radial-gradient(circle at 50% 40%,#ffffff 0%,#f7f3fc 62%,#e6dcf3 100%);
 box-shadow:0 0 0 calc(var(--S) * .005) rgba(106,63,181,.20),0 calc(var(--S) * .012) calc(var(--S) * .016) rgba(42,20,80,.15),0 calc(var(--S) * .03) calc(var(--S) * .045) rgba(42,20,80,.06);
 transition:box-shadow .35s cubic-bezier(.2,.8,.2,1)}
html body[data-theme="night"] .isl .isl-base{background:radial-gradient(circle at var(--gx,36%) var(--gy,26%),rgba(255,255,255,.13) 0%,rgba(255,255,255,0) 44%),radial-gradient(circle at 50% 40%,#372d4d 0%,#241d33 62%,#15111d 100%);
 box-shadow:0 0 0 calc(var(--S) * .005) rgba(183,156,230,.26),0 calc(var(--S) * .012) calc(var(--S) * .016) rgba(0,0,0,.34),0 calc(var(--S) * .03) calc(var(--S) * .045) rgba(0,0,0,.16)}
html body .isl.hover .isl-base{box-shadow:0 0 0 calc(var(--S) * .005) rgba(106,63,181,.24),0 calc(var(--S) * .02) calc(var(--S) * .026) rgba(42,20,80,.15),0 calc(var(--S) * .05) calc(var(--S) * .07) rgba(42,20,80,.07)}
html body[data-theme="night"] .isl.hover .isl-base{box-shadow:0 0 0 calc(var(--S) * .005) rgba(183,156,230,.30),0 calc(var(--S) * .02) calc(var(--S) * .026) rgba(0,0,0,.34),0 calc(var(--S) * .05) calc(var(--S) * .07) rgba(0,0,0,.17)}
html body .isl.down .isl-base{transition-duration:.08s;box-shadow:0 0 0 calc(var(--S) * .005) rgba(106,63,181,.20),0 calc(var(--S) * .005) calc(var(--S) * .009) rgba(42,20,80,.17)}
html body[data-theme="night"] .isl.down .isl-base{box-shadow:0 0 0 calc(var(--S) * .005) rgba(183,156,230,.26),0 calc(var(--S) * .005) calc(var(--S) * .009) rgba(0,0,0,.38)}
html body .isl .isl-cast{position:absolute;left:17%;right:17%;bottom:-5%;height:9%;border-radius:50%;display:block;background:rgba(42,20,80,.14);
 filter:blur(calc(var(--S) * .045));transform:translateZ(calc(var(--S) * -.12));transition:opacity .35s ease,transform .35s ease}
html body[data-theme="night"] .isl .isl-cast{background:rgba(0,0,0,.36)}
/* each layer is drawn at twice its size and scaled down where it stands: a browser draws a turning layer at a low
   resolution, and without this the swaying seal looks soft */
html body .isl .isl-layer{position:absolute;left:0;top:0;width:200%;height:200%;transform-origin:0 0;display:block;pointer-events:none}
html body .isl .isl-layer > svg{display:block;width:100% !important;height:100% !important;max-width:none !important;margin:0 !important;overflow:visible;pointer-events:none;filter:none;outline:none !important;border-radius:0 !important}
html body .isl .isl-back{transform:scale(.5)}
/* the layers seated true: each stands off the face by its depth and is drawn at the size it has in the seal */
html body .isl .isl-ring{--fz:.065;--fk:.98375;transform-style:preserve-3d}
html body .isl .isl-star{--fz:.11;--fk:.9725}
html body .isl .isl-heart{--fz:.25;--fk:.9375}
html body .isl :is(.isl-ring,.isl-star,.isl-heart){transform:translate(calc(var(--S) * .5),calc(var(--S) * .5)) translateZ(calc(var(--S) * var(--fz))) scale(var(--fk)) translate(calc(var(--S) * -.5),calc(var(--S) * -.5)) scale(.5)}
html body .isl .isl-ring > svg{filter:drop-shadow(calc(var(--S) * .004) calc(var(--S) * .01) calc(var(--S) * .004) rgba(42,20,80,.15));animation:islLift 7s ease-in-out infinite}
html body .isl .isl-star > svg{filter:drop-shadow(calc(var(--S) * .004) calc(var(--S) * .012) calc(var(--S) * .006) rgba(42,20,80,.24)) drop-shadow(calc(var(--S) * .01) calc(var(--S) * .03) calc(var(--S) * .025) rgba(42,20,80,.12))}
html body .isl .isl-heart > svg{filter:drop-shadow(calc(var(--S) * .016) calc(var(--S) * .05) calc(var(--S) * .04) rgba(42,20,80,.26))}
html body[data-theme="night"] .isl .isl-ring > svg{filter:drop-shadow(calc(var(--S) * .004) calc(var(--S) * .01) calc(var(--S) * .005) rgba(0,0,0,.55))}
html body[data-theme="night"] .isl .isl-star > svg{filter:drop-shadow(calc(var(--S) * .004) calc(var(--S) * .012) calc(var(--S) * .008) rgba(0,0,0,.5)) drop-shadow(calc(var(--S) * .01) calc(var(--S) * .03) calc(var(--S) * .03) rgba(0,0,0,.3))}
html body[data-theme="night"] .isl .isl-heart > svg{filter:drop-shadow(calc(var(--S) * .016) calc(var(--S) * .045) calc(var(--S) * .045) rgba(0,0,0,.5))}
html body .isl.hover{--cdl:calc(var(--S) * -.025)}
html body .isl.hover .isl-idle,html body .isl.hover .isl-ring > svg{animation-play-state:paused}
html body .isl.hover .isl-cast{opacity:.75;transform:translateZ(calc(var(--S) * -.12)) scale(.92)}
html body .isl.down{--cdl:calc(var(--S) * .05);--cds:.96}
html body .isl.down .isl-tilt{transition-duration:.08s}
html body .isl.down .isl-cast{opacity:1;transform:translateZ(calc(var(--S) * -.12)) scale(1.04)}
html body .isl.rise .isl-tilt{animation:islRise .9s cubic-bezier(.2,.9,.25,1) both}
html body .isl.rise :is(.isl-ring,.isl-star,.isl-heart){animation:islSeat .9s cubic-bezier(.2,.9,.25,1) both}
html body .isl.rise .isl-cast{animation:islCastIn .9s ease both}
html body .isl.knock .isl-tilt,html body .intro-seal.knock .isl .isl-tilt{animation:islKnock .55s cubic-bezier(.3,.7,.3,1)}
/* the door's key and the top bar's key keep their places and their names; the layered seal does their moving now */
html body .intro-seal.isl-host,html body .intro-seal.isl-host:hover,html body .intro-seal.isl-host:active,html body .intro-seal.isl-host.knock{
 filter:none !important;transform:none !important;animation:none !important;background:transparent !important;box-shadow:none !important}
html body .intro-seal.isl-host{margin:2px auto 14px}
@keyframes islSway{0%,100%{transform:rotateY(-18deg) rotateX(5deg)}50%{transform:rotateY(18deg) rotateX(-5deg)}}
@keyframes islLift{0%,50%,100%{transform:translateZ(0)}25%,75%{transform:translateZ(calc(var(--S) * .07))}}
@keyframes islKnock{0%{translate:0 calc(var(--S) * .03)}45%{translate:0 calc(var(--S) * -.035)}75%{translate:0 calc(var(--S) * .008)}100%{translate:0 0}}
@keyframes islRise{0%{opacity:0;scale:.86}60%{opacity:1;scale:1.03}100%{opacity:1;scale:1}}
@keyframes islSeat{0%{transform:translate(0,0) translateZ(0) scale(1) translate(0,0) scale(.5)}}
@keyframes islCastIn{0%{opacity:0}100%{opacity:1}}
html body[data-motion="minimal"] .isl :is(.isl-idle,.isl-tilt,.isl-layer,.isl-cast),html body[data-motion="minimal"] .isl .isl-layer > svg{animation:none !important;transition:none !important}
html body[data-motion="minimal"] .isl :is(.isl-idle,.isl-tilt){transform:none !important}
@media (prefers-reduced-motion:reduce){
 html body .isl :is(.isl-idle,.isl-tilt,.isl-layer,.isl-cast),html body .isl .isl-layer > svg{animation:none !important;transition:none !important}
 html body .isl :is(.isl-idle,.isl-tilt){transform:none !important}}
</style>
<script>try{(window.__ingParts=window.__ingParts||{})["p36"]="started";}catch(_){}
(function(){
  var N=0;
  function still(){try{if(document.body.getAttribute("data-motion")==="minimal")return true;}catch(e){}
    try{return matchMedia("(prefers-reduced-motion: reduce)").matches;}catch(e){return false;}}
  /* which part of the drawing stands in which layer */
  function where(n){var c=n.getAttribute("class")||"";
    if(n.tagName==="defs"||n.tagName==="title"||n.tagName==="desc")return "all";
    if(/\bseal-counter\b/.test(c))return "ring";
    if(n.querySelector&&n.querySelector(".seal-spin"))return "star";
    if(n.querySelector&&n.querySelector(".seal-heart"))return "heart";
    return "back";}
  /* a copy of the seal holding one layer, its gradients and filters named afresh so no copy borrows another's */
  function layer(svg,L){var c=svg.cloneNode(true);
    Array.prototype.slice.call(c.children).forEach(function(n){var w=where(n);if(w!=="all"&&w!==L)c.removeChild(n);});
    try{c.classList.remove("seal");}catch(e){}
    c.setAttribute("aria-hidden","true");c.setAttribute("focusable","false");c.removeAttribute("width");c.removeAttribute("height");c.removeAttribute("style");
    var h=c.outerHTML,k="isl"+(++N)+"_";
    Array.prototype.slice.call(c.querySelectorAll("[id]")).forEach(function(n){var id=n.getAttribute("id"),q=id.replace(/[.*+?^${}()|[\]\\]/g,"\\$&");
      h=h.replace(new RegExp('id="'+q+'"',"g"),'id="'+k+id+'"').replace(new RegExp("url\\(#"+q+"\\)","g"),"url(#"+k+id+")").replace(new RegExp('href="#'+q+'"',"g"),'href="#'+k+id+'"');});
    return h;}
  function build(svg){
    return '<span class="isl-tilt"><span class="isl-idle"><span class="isl-cast" aria-hidden="true"></span>'
      +'<span class="isl-edge" aria-hidden="true"><i class="isl-base"></i></span>'
      +["back","ring","star","heart"].map(function(L){return '<span class="isl-layer isl-'+L+'">'+layer(svg,L)+'</span>';}).join("")
      +'</span></span>';}
  function rise(w){if(!w||still())return;w.classList.remove("rise","knock");try{var hb=w.closest(".intro-seal");if(hb)hb.classList.remove("knock");}catch(e){}void w.offsetWidth;w.classList.add("rise");
    clearTimeout(w.__rise);w.__rise=setTimeout(function(){w.classList.remove("rise");},950);}
  function size(w){var s=w.getBoundingClientRect().width;if(s>0&&Math.abs(s-(w.__S||0))>.5){w.__S=s;w.style.setProperty("--S",s+"px");}}
  /* the pointer: the seal turns to follow a mouse and lifts under it; pressed, it sinks */
  function wire(w,host){
    host.addEventListener("pointerenter",function(e){if(e.pointerType==="mouse"&&!still())w.classList.add("hover");});
    host.addEventListener("pointermove",function(e){var r=w.getBoundingClientRect();if(!r.width)return;
      var x=(e.clientX-r.left)/r.width,y=(e.clientY-r.top)/r.height;
      w.style.setProperty("--gx",(x*100).toFixed(1)+"%");w.style.setProperty("--gy",(y*100).toFixed(1)+"%");
      if(e.pointerType==="mouse"&&!still()){x=Math.max(-.25,Math.min(1.25,x));y=Math.max(-.25,Math.min(1.25,y));
        w.style.setProperty("--ry",((x-.5)*26).toFixed(1)+"deg");w.style.setProperty("--rx",(-(y-.5)*22).toFixed(1)+"deg");}});
    host.addEventListener("pointerleave",function(){w.classList.remove("hover","down");w.style.setProperty("--rx","0deg");w.style.setProperty("--ry","0deg");});
    host.addEventListener("pointerdown",function(){w.classList.remove("knock");if(!still())w.classList.add("down");});
    host.addEventListener("pointerup",function(e){w.classList.remove("down");if(e.pointerType!=="mouse")w.classList.remove("hover");});
    host.addEventListener("pointercancel",function(){w.classList.remove("down","hover");});}
  function mount(host,sel,cls,fallback){if(!host)return null;var had=host.querySelector(".isl");if(had)return had;
    var sv=host.querySelector(sel);if(!sv)return null;
    var s=parseFloat(getComputedStyle(sv).width)||0;if(!(s>0))s=sv.getBoundingClientRect().width||fallback;
    var w=document.createElement("span");w.className=cls;w.setAttribute("aria-hidden","true");w.style.setProperty("--S",s+"px");w.__S=s;
    w.innerHTML=build(sv);sv.parentNode.replaceChild(w,sv);wire(w,host);
    try{new ResizeObserver(function(){size(w);}).observe(w);}catch(e){}
    return w;}
  var door=null,head=null;
  function init(){
    var ds=document.getElementById("introSeal");
    /* the door's key: the seal is the button's picture; the button still knocks and opens the desk */
    door=mount(ds,"svg.seal3d","isl isl-door",104);if(door&&ds)ds.classList.add("isl-host");
    /* the top bar's key: it keeps the class the bar's code knocks and raises (seal) */
    head=mount(document.getElementById("brandSealBtn"),"svg.seal","seal isl isl-head",34);
    var dd=document.getElementById("introDoor");
    if(dd){if(!dd.hasAttribute("hidden"))rise(door);
      try{new MutationObserver(function(){if(!dd.hasAttribute("hidden"))rise(door);}).observe(dd,{attributes:true,attributeFilter:["hidden"]});}catch(e){}}}
  try{init();}catch(e){try{console.error("Ingenium: the layered seal could not be made",e);}catch(_){}}
  /* the icons the page draws for itself (the browser tab's, day and night, and the web kit's) are this seal standing
     still, from pictures drawn once from it; until they are read, the seal is drawn as before */
  var ICON=/*R104_ICON*/null;
  (function icons(){if(!ICON||typeof drawIngeniumSeal!=="function")return;var od=drawIngeniumSeal,IM={},left=2;
    function ready(im){return im&&im.complete&&im.naturalWidth>0;}
    window.drawIngeniumSeal=drawIngeniumSeal=function(cv,opts){opts=opts||{};var im=IM[opts.night?"night":"day"];
      if(!ready(im))return od.apply(this,arguments);
      var s=cv.width,ctx=cv.getContext("2d");ctx.clearRect(0,0,s,s);if(opts.plate){ctx.fillStyle=opts.plate;ctx.fillRect(0,0,s,s);}
      /* the picture's disc fills .889 of it; the old drawing's disc filled fit (0.9 unless asked) of the canvas */
      var D=s*(opts.fit||0.9)/0.889;try{ctx.imageSmoothingEnabled=true;ctx.imageSmoothingQuality="high";}catch(e){}
      ctx.drawImage(im,(s-D)/2,(s-D)/2,D,D);};
    ["day","night"].forEach(function(k){var im=new Image();im.onload=function(){if(--left===0){try{_ingIcons=null;_ingIconShown=null;ingSyncIcons();}catch(e){}}};im.src=ICON[k];IM[k]=im;});})();
  window.IngR104={door:function(){return door;},head:function(){return head;},rise:rise};
})();
;try{window.__ingParts["p36"]="running";}catch(_){}
</script>
