<style id="r388-css">
/* ============ R388 · EACH APP'S LOGO WITH A PRESS OF ITS OWN (Ingenium 7.87, 25 November 2026) ============
   Her words (25 November 2026): "The apps logos on the Ingenia page still look stiff and do not sink or have any animations when I click on
   them ... they should be just be fun and animated and most importantly clickable and have satisfying animations that is personalised for
   each app and their logo design and animation. I don't just want Ingenium's engine button animation replicated on all of the other app
   logos ... I want animations made specifically for each app." Approved with the live preview the same day ("I approve of the previews").
   On r378's logos (each seal in its layers, at its depth), a press of its own, made from the parts of its own seal:
     Carpe Diem, Sunrise: the rays turn and flare like a sun coming up, the lettering turns with the day, the fleur-de-lis rises and settles;
     The Forge, Strike: the anvil takes a hammer's blow and rings, the seal shakes, the rays flash, sparks fly from the anvil;
     Inkwell, Dip: the wax seal is stamped, the quill dips into the inkwell, the ink ripples out;
     Clavis, Unlock: the key turns a full turn in the astrolabe, the rete answers the other way, the pin clicks as it comes home;
     Lakay, Spiral: the shell turns on itself, each whorl a moment after the one beneath it;
     Ingenium keeps r378's knock, made for its engine key.
   Each layer moves by its own rotate, translate and scale, so its depth (r378's transform) stays as it is. A press she makes plays even
   where the system asks for reduced motion (it is hers, short, and starts only at her press); Ingenium's own Minimal motion stills it. */
/* each of the five plays its own press instead of Ingenium's knock; a logo she gave an app herself (flat) keeps the knock */
#page-folders .ig-ls.knock[data-fd-seal="cd"]:not(.flat),#page-folders .ig-ls.knock[data-fd-seal="cd"]:not(.flat) .ig-ls-tilt,#page-folders .ig-ls.knock[data-fd-seal="forge"]:not(.flat),#page-folders .ig-ls.knock[data-fd-seal="forge"]:not(.flat) .ig-ls-tilt,#page-folders .ig-ls.knock[data-fd-seal="inkwell"]:not(.flat),#page-folders .ig-ls.knock[data-fd-seal="inkwell"]:not(.flat) .ig-ls-tilt,#page-folders .ig-ls.knock[data-fd-seal="clavis"]:not(.flat),#page-folders .ig-ls.knock[data-fd-seal="clavis"]:not(.flat) .ig-ls-tilt,#page-folders .ig-ls.knock[data-fd-seal="lakay"]:not(.flat),#page-folders .ig-ls.knock[data-fd-seal="lakay"]:not(.flat) .ig-ls-tilt{animation:none}
#page-folders .ig-ls .r388-fx{position:absolute;inset:0;display:block;pointer-events:none;transform-style:preserve-3d}
#page-folders .ig-ls.r388-play .ig-ls-idle{animation-play-state:paused}
/* Carpe Diem */
#page-folders .ig-ls[data-fd-seal="cd"].r388-play .ig-ls-l[data-r="rays"]{animation:r388cdRays 1.3s cubic-bezier(.2,.8,.2,1)}
#page-folders .ig-ls[data-fd-seal="cd"].r388-play .ig-ls-l[data-r="ring"]{animation:r388cdRing 1.3s cubic-bezier(.2,.8,.2,1)}
#page-folders .ig-ls[data-fd-seal="cd"].r388-play .ig-ls-l[data-r="mark"]{animation:r388cdMark 1.1s cubic-bezier(.25,.9,.3,1.2)}
@keyframes r388cdRays{0%{rotate:0deg;scale:1;filter:none}35%{rotate:14deg;scale:1.2;filter:brightness(1.35) saturate(1.3)}100%{rotate:22.5deg;scale:1;filter:none}}
@keyframes r388cdRing{0%{rotate:0deg}45%{rotate:-14deg}100%{rotate:0deg}}
@keyframes r388cdMark{0%{translate:0 0;scale:1}30%{translate:0 -9%;scale:1.08}60%{translate:0 1.5%;scale:1}100%{translate:0 0;scale:1}}
/* The Forge */
#page-folders .ig-ls[data-fd-seal="forge"].r388-play .ig-ls-l[data-r="mark"]{animation:r388fgMark .8s cubic-bezier(.2,.9,.3,1)}
#page-folders .ig-ls[data-fd-seal="forge"].r388-play .ig-ls-l[data-r="rays"]{animation:r388fgRays .8s ease-out}
#page-folders .ig-ls[data-fd-seal="forge"].r388-play:not(.flat) .ig-ls-tilt{animation:r388fgShake .45s linear}
@keyframes r388fgMark{0%{translate:0 -6%}14%{translate:0 5%;scale:1 .94}34%{translate:0 -3%;scale:1}56%{translate:0 1%}100%{translate:0 0}}
@keyframes r388fgRays{0%,10%{scale:1;filter:none}24%{scale:1.28;filter:brightness(1.6)}100%{scale:1;filter:none}}
@keyframes r388fgShake{0%,100%{translate:0 0}15%{translate:-1.5% 0}30%{translate:1.5% 0}45%{translate:-1% 0}60%{translate:1% 0}75%{translate:-.5% 0}}
#page-folders .ig-ls .r388-spark{position:absolute;left:50%;top:44%;width:max(3px,calc(var(--S,56px) * .035));height:max(3px,calc(var(--S,56px) * .035));margin:calc(var(--S,56px) * -.0175);border-radius:50%;
  background:radial-gradient(circle,#fff6d0,#f1b43c 60%,transparent 70%);opacity:0;transform:translateZ(calc(var(--S,56px) * .3))}
#page-folders .ig-ls[data-fd-seal="forge"].r388-play .r388-spark{animation:r388spark .7s cubic-bezier(.15,.7,.3,1) .1s}
@keyframes r388spark{0%{opacity:1;translate:0 0}100%{opacity:0;translate:calc(var(--S,56px) * var(--dx)) calc(var(--S,56px) * var(--dy))}}
/* Inkwell */
#page-folders .ig-ls[data-fd-seal="inkwell"].r388-play:not(.flat) .ig-ls-tilt{animation:r388ikStamp .75s cubic-bezier(.3,.8,.3,1.2)}
#page-folders .ig-ls[data-fd-seal="inkwell"].r388-play .ig-ls-l[data-r="mark"]{animation:r388ikDip 1s cubic-bezier(.3,.8,.3,1.1);transform-origin:50% 62%}
@keyframes r388ikStamp{0%{scale:1 1}25%{scale:1.05 .9}55%{scale:.98 1.03}100%{scale:1 1}}
@keyframes r388ikDip{0%{rotate:0deg;translate:0 0}30%{rotate:-12deg;translate:0 4%}60%{rotate:4deg;translate:0 0}100%{rotate:0deg}}
#page-folders .ig-ls .r388-ripple{position:absolute;left:30%;width:40%;top:53%;height:14%;border-radius:50%;border:max(1px,calc(var(--S,56px) * .013)) solid rgba(30,50,90,.45);opacity:0;transform:translateZ(calc(var(--S,56px) * .26))}
body[data-theme="night"] #page-folders .ig-ls .r388-ripple{border-color:rgba(190,200,255,.55)}
#page-folders .ig-ls[data-fd-seal="inkwell"].r388-play .r388-ripple{animation:r388ripple .95s ease-out .28s}
#page-folders .ig-ls[data-fd-seal="inkwell"].r388-play .r388-ripple.r2{animation-delay:.45s}
@keyframes r388ripple{0%{opacity:.9;scale:.3}100%{opacity:0;scale:1.7}}
/* Clavis */
#page-folders .ig-ls[data-fd-seal="clavis"].r388-play .ig-ls-l[data-r="key"]{animation:r388clKey 1.25s cubic-bezier(.25,.8,.25,1.15)}
#page-folders .ig-ls[data-fd-seal="clavis"].r388-play .ig-ls-l[data-r="rete"]{animation:r388clRete 1.25s cubic-bezier(.25,.8,.25,1.1)}
#page-folders .ig-ls[data-fd-seal="clavis"].r388-play .ig-ls-l[data-r="pin"]{animation:r388clPin 1.25s ease-out}
@keyframes r388clKey{0%{rotate:0deg}85%{rotate:368deg}100%{rotate:360deg}}
@keyframes r388clRete{0%{rotate:0deg}50%{rotate:-34deg}100%{rotate:0deg}}
@keyframes r388clPin{0%,80%{filter:none}88%{filter:brightness(1.8)}100%{filter:none}}
/* Lakay */
#page-folders .ig-ls[data-fd-seal="lakay"].r388-play .ig-ls-l[data-r="whorl"]{animation:r388lkWhorl 1.3s cubic-bezier(.25,.8,.25,1.1) both;animation-delay:calc(var(--i,0) * 45ms)}
#page-folders .ig-ls[data-fd-seal="lakay"].r388-play .ig-ls-l[data-r="base"]{animation:r388lkBase 1.3s ease-out}
@keyframes r388lkWhorl{0%{rotate:0deg;scale:1}55%{rotate:-48deg;scale:1.04}100%{rotate:0deg;scale:1}}
@keyframes r388lkBase{0%,100%{filter:none}40%{filter:brightness(1.15)}}
body[data-motion="minimal"] #page-folders .ig-ls.r388-play *,body[data-motion="minimal"] #page-folders .ig-ls.r388-play{animation:none !important}
</style>
<script>try{(window.__ingParts=window.__ingParts||{})["p388"]="started";}catch(_){}
(function r388(){"use strict";
if(window.IngLogoPress)return;var W=window,D=document;
/* each seal's layers, in LX7_LAYERS's order (by day and by night alike), named for what moves */
var ROLES={cd:["disc","rays","ring","mark"],forge:["disc","rays","ring","mark"],ingenium:["disc","ring","mark","dot"],inkwell:["side","disc","ring","mark"],clavis:["mater","rete","key","pin"]};
var DUR={cd:1300,forge:900,inkwell:1300,clavis:1300,lakay:1500};
function page(){return D.getElementById("page-folders");}
function keyOf(ls){return String(ls.getAttribute("data-fd-seal")||"");}
function tag(ls){if(!ls||ls.__r388)return;var k=keyOf(ls);if(!DUR[k]&&k!=="ingenium")return;ls.__r388=1;
  var imgs=[].slice.call(ls.querySelectorAll(".ig-ls-l")),w=0;
  if(ls.classList.contains("flat"))return;
  imgs.forEach(function(im,i){var r="";if(k==="lakay"){var z=parseFloat(im.style.getPropertyValue("--z"))||0;r=z>=0.1?"whorl":(z===0?"base":"edge");if(r==="whorl")im.style.setProperty("--i",String(w++));}
    else r=(ROLES[k]||[])[i]||"";if(r)im.setAttribute("data-r",r);});
  var idle=ls.querySelector(".ig-ls-idle");if(!idle)return;var fx=D.createElement("span");fx.className="r388-fx";
  if(k==="forge")for(var s=0;s<10;s++){var sp=D.createElement("i");sp.className="r388-spark";var an=-Math.PI*(0.1+0.8*s/9),rr=0.32+0.12*((s*7)%3);sp.style.setProperty("--dx",(Math.cos(an)*rr).toFixed(3));sp.style.setProperty("--dy",(Math.sin(an)*rr).toFixed(3));fx.appendChild(sp);}
  if(k==="inkwell"){var a=D.createElement("i");a.className="r388-ripple";var b=D.createElement("i");b.className="r388-ripple r2";fx.appendChild(a);fx.appendChild(b);}
  idle.appendChild(fx);}
function tagAll(){var pg=page();if(!pg)return 0;var n=0;[].forEach.call(pg.querySelectorAll(".ig-ls"),function(ls){if(!ls.__r388){tag(ls);n++;}});return n;}
function play(ls){var k=keyOf(ls);if(!DUR[k]||ls.classList.contains("flat"))return false;tag(ls);ls.classList.remove("r388-play");void ls.offsetWidth;ls.classList.add("r388-play");clearTimeout(ls.__r388t);
  ls.__r388t=setTimeout(function(){ls.classList.remove("r388-play");},DUR[k]+150);return true;}
function wire(){var pg=page();if(!pg||pg.__r388)return false;pg.__r388=1;
  /* before r378 lets the logo go (its own listener, bubbling), the logo that was pressed plays its own press */
  pg.addEventListener("pointerup",function(){[].forEach.call(pg.querySelectorAll(".ig-ls.down"),function(ls){play(ls);});},true);
  pg.addEventListener("keydown",function(e){var k=e.target;if(!(k&&k.classList&&k.classList.contains("ig-key")))return;if((e.key==="Enter"||e.key===" ")&&!e.repeat)setTimeout(function(){play(k);},140);},true);
  try{new MutationObserver(function(){tagAll();}).observe(pg,{childList:true,subtree:true});}catch(e){}
  tagAll();return true;}
(function start(){var n=0;(function w(){if(wire())return;if(++n<240)setTimeout(w,500);})();})();
W.IngLogoPress={play:play,tag:tagAll,roles:function(){return JSON.parse(JSON.stringify(ROLES));}};
})();
;try{window.__ingParts["p388"]="running";}catch(_){}
</script>
