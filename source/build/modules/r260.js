<style id="r260-css">
/* ============ R260 · FABRICA IN INGENIUM'S OWN DEPTH (Ingenium 6.66, 10 November 2026) ============
   Her words (10 November 2026): "The newly added Fabrica pages are still and not animated and clickable when I hover over them, they
   are just stiff and rigid", "I also really dislike the weird film over the background in the Fabrica page when a panel is open",
   "I want the new app panel's surfaces to be animated and have that popped out 3D look and effect, they are very flat and bland and
   currently does not match the rest of the app", and "Every new addition or redesign in Ingenium needs to have the app's signature
   3D style and animations to stay cohesive and consistent with the rest of the app."
   Measured on 6.65: the library's cards (.f-lc), each app's page (its side list, its head, its three boxes), the tiles of Bring an
   app in, and the New app panel's choices, colours and close key had no lift on the pointer and no press; most made no sound; the
   panel stood on a dark film (rgba(17,13,24,.35)) over the whole frame. Now each of them lifts on the pointer and sinks on a press
   with Fabrica's own depths (--f-pop, --f-pophi, --f-press, --f-slab, --f-slabhi) and spring, and makes the keys' sound
   (modules/r176.js); the cards lean a little toward the pointer, as the seals do; the panel has no film and stands as a raised
   plate; the New app's seal is a coin that floats and turns when its letter or colour changes. Minimal motion, the calm days and
   reduced motion keep everything still (a press still answers). Nothing here changes what a key does. */
#fb{--f-plate:inset 0 1px 0 rgba(255,255,255,.95),inset 0 -2px 0 rgba(40,22,68,.06),0 0 0 1px rgba(107,79,160,.10),0 2px 0 rgba(40,22,68,.12),0 6px 0 rgba(40,22,68,.05),0 14px 26px rgba(40,22,68,.16),0 34px 70px rgba(40,22,68,.22);
  --f-well:inset 0 2px 5px rgba(40,22,68,.12),inset 0 -1px 0 rgba(255,255,255,.9),0 1px 0 rgba(255,255,255,.8);
  --f-coin:inset 0 2px 0 rgba(255,255,255,.35),inset 0 -6px 10px rgba(0,0,0,.22),inset 0 0 0 4px rgba(255,255,255,.14),0 5px 0 rgba(30,16,50,.30),0 10px 16px rgba(30,16,50,.22),0 22px 30px rgba(30,16,50,.14)}
body[data-theme="night"] #fb{--f-plate:inset 0 1px 0 rgba(255,255,255,.08),inset 0 -2px 0 rgba(0,0,0,.4),0 0 0 1px rgba(205,184,240,.14),0 2px 0 rgba(0,0,0,.7),0 6px 0 rgba(0,0,0,.35),0 14px 26px rgba(0,0,0,.5),0 34px 70px rgba(0,0,0,.55);
  --f-well:inset 0 2px 6px rgba(0,0,0,.55),inset 0 -1px 0 rgba(255,255,255,.05),0 1px 0 rgba(255,255,255,.04);
  --f-coin:inset 0 2px 0 rgba(255,255,255,.22),inset 0 -6px 10px rgba(0,0,0,.4),inset 0 0 0 4px rgba(255,255,255,.08),0 5px 0 rgba(0,0,0,.6),0 10px 16px rgba(0,0,0,.45),0 22px 30px rgba(0,0,0,.35)}

/* 1. no film behind a panel: the page stays as it is, and the panel stands over it as a raised plate */
#fb .f-sheet-wrap{background:transparent !important;-webkit-backdrop-filter:none !important;backdrop-filter:none !important}
#fb .f-sheet{box-shadow:var(--f-plate);border-color:transparent}

/* 2. the library's cards: lift, lean toward the pointer, sink on a press; the seal rises a little with its card */
#fb .f-lc{--ly:0px;transform:perspective(1100px) rotateX(var(--rx,0deg)) rotateY(var(--ry,0deg)) translateY(var(--ly));transform-style:preserve-3d;
  transition:transform .26s var(--f-spring),box-shadow .22s ease,border-color .2s ease;will-change:transform}
#fb .f-lc:hover{--ly:-4px;box-shadow:var(--f-slabhi);border-color:var(--f-ring,rgba(107,79,160,.4))}
#fb .f-lc:active{--ly:1px;box-shadow:var(--f-slab),var(--f-press);transition-duration:.08s}
#fb .f-lc .sl{transition:transform .3s var(--f-spring)}
#fb .f-lc:hover .sl{transform:translateY(-3px) scale(1.04)}
#fb .f-lc .ks .f-btn{position:relative;z-index:1}

/* 3. each app's own page: its side list as keys, its head and boxes as slabs that lift */
#fb .f-rail button{transition:transform .18s var(--f-spring),box-shadow .18s ease,background .15s ease}
#fb .f-rail button:hover{transform:translateY(-1px);box-shadow:var(--f-pill)}
#fb .f-rail button:active{transform:translateY(1px);box-shadow:var(--f-press)}
#fb .f-rail button[aria-current="true"]{box-shadow:var(--f-press)}
#fb .f-hero,#fb .f-box{transition:transform .26s var(--f-spring),box-shadow .22s ease}
#fb .f-hero:hover{transform:translateY(-2px);box-shadow:var(--f-slabhi)}
#fb .f-box:hover{transform:translateY(-3px);box-shadow:var(--f-slabhi)}

/* 4. Bring an app in: its tiles lift and sink as keys */
#fb .f-tile{transition:transform .2s var(--f-spring),box-shadow .2s ease,border-color .2s ease}
#fb .f-tile:hover{transform:translateY(-3px);box-shadow:var(--f-pophi);border-color:var(--f-ring,rgba(107,79,160,.4))}
#fb .f-tile:active{transform:translateY(1px);box-shadow:var(--f-press);transition-duration:.08s}
#fb .f-tile .f-ls{transition:transform .3s var(--f-spring)}
#fb .f-tile:hover .f-ls{transform:translateY(-2px) scale(1.05)}

/* 5. the New app panel */
#fb .f-new-prev{background:linear-gradient(180deg,var(--f-lo),var(--f-hi));box-shadow:var(--f-well);border-radius:16px;padding:16px 8px 12px}
#fb .f-new-prev .f-ls.mark{background:radial-gradient(circle at 34% 28%,rgba(255,255,255,.38),rgba(255,255,255,0) 46%),var(--mc,#2f7a8a);box-shadow:var(--f-coin);
  animation:r260Float 5.5s ease-in-out infinite;transition:background-color .35s ease}
#fb .f-new-prev .f-ls.mark > span{text-shadow:0 2px 0 rgba(0,0,0,.18),0 4px 8px rgba(0,0,0,.18)}
#fb .f-new-prev .f-ls.mark.turn{animation:r260Turn .7s var(--f-spring),r260Float 5.5s ease-in-out .7s infinite}
@keyframes r260Float{0%,100%{transform:translateY(0) rotate(0)}50%{transform:translateY(-5px) rotate(-1.5deg)}}
@keyframes r260Turn{0%{transform:perspective(500px) rotateY(0) scale(1)}45%{transform:perspective(500px) rotateY(180deg) scale(1.08)}100%{transform:perspective(500px) rotateY(360deg) scale(1)}}
#fb .f-sheet input.f-in,#fb .f-sheet textarea.f-in{box-shadow:var(--f-well);border-color:var(--f-hair2,var(--f-hair));transition:box-shadow .2s ease,border-color .2s ease}
#fb .f-sheet input.f-in:focus,#fb .f-sheet textarea.f-in:focus{box-shadow:var(--f-well),0 0 0 3px var(--f-accs,rgba(107,79,160,.15))}
#fb .f-way{background:linear-gradient(var(--f-a),var(--f-b));box-shadow:var(--f-pop);transition:transform .2s var(--f-spring),box-shadow .2s ease,border-color .2s ease}
#fb .f-way:hover{transform:translateY(-2px);box-shadow:var(--f-pophi)}
#fb .f-way:active{transform:translateY(1px);box-shadow:var(--f-press);transition-duration:.08s}
#fb .f-way[aria-pressed="true"]{transform:translateY(1px);box-shadow:var(--f-press),inset 0 0 0 1px var(--f-acc);background:linear-gradient(var(--f-lo),var(--f-hi))}
#fb .f-way[aria-pressed="true"] b::after{content:"  ✓";color:var(--f-acc);font-weight:700}
#fb .f-sw button{box-shadow:inset 0 2px 2px rgba(255,255,255,.45),inset 0 -3px 4px rgba(0,0,0,.25),0 2px 0 rgba(40,22,68,.28),0 4px 8px rgba(40,22,68,.18);
  transition:transform .2s var(--f-spring),box-shadow .2s ease}
#fb .f-sw button:hover{transform:translateY(-3px) scale(1.1)}
#fb .f-sw button:active{transform:translateY(1px) scale(.96)}
#fb .f-sw button[aria-pressed="true"]{transform:translateY(-1px) scale(1.06);box-shadow:inset 0 2px 2px rgba(255,255,255,.45),inset 0 -3px 4px rgba(0,0,0,.25),0 0 0 2px var(--f-hi),0 0 0 4px var(--f-ink2),0 6px 10px rgba(40,22,68,.22)}
#fb .f-x{transition:transform .22s var(--f-spring),box-shadow .2s ease}
#fb .f-x:hover{transform:translateY(-2px) rotate(90deg);box-shadow:var(--f-pophi)}
#fb .f-x:active{transform:translateY(1px);box-shadow:var(--f-press)}

/* 6. still, when she asks for stillness: minimal motion, a calm day, or the device's reduced motion */
body[data-motion="minimal"] #fb .f-lc,body[data-calm="1"] #fb .f-lc{transform:none !important}
body[data-motion="minimal"] #fb .f-new-prev .f-ls.mark,body[data-calm="1"] #fb .f-new-prev .f-ls.mark{animation:none !important}
body[data-motion="minimal"] #fb .f-lc:hover .sl,body[data-motion="minimal"] #fb .f-tile:hover .f-ls,body[data-motion="minimal"] #fb .f-x:hover{transform:none !important}
@media (prefers-reduced-motion:reduce){#fb .f-lc{transform:none !important}#fb .f-new-prev .f-ls.mark{animation:none !important}}
</style>
<script>try{(window.__ingParts=window.__ingParts||{})["p260"]="started";}catch(_){}
/* R260 · Fabrica in Ingenium's own depth: the cards lean toward the pointer, and the New app's coin turns when it changes (see above) */
(function r260(){
"use strict";
if(window.__r260)return;window.__r260=1;
var W=window,D=document,MAX=3.2,raf=0,cur=null,px=0,py=0;
function still(){try{var b=D.body;if(b.getAttribute("data-motion")==="minimal"||b.getAttribute("data-calm")==="1")return true;
  return !!(W.matchMedia&&W.matchMedia("(prefers-reduced-motion: reduce)").matches);}catch(e){return true;}}
function lean(){raf=0;if(!cur||!cur.isConnected)return;var r=cur.getBoundingClientRect();if(!r.width||!r.height)return;
  var x=(px-r.left)/r.width-.5,y=(py-r.top)/r.height-.5;cur.style.setProperty("--ry",(x*MAX*2).toFixed(2)+"deg");cur.style.setProperty("--rx",(-y*MAX*2).toFixed(2)+"deg");}
function rest(c){if(!c)return;c.style.removeProperty("--rx");c.style.removeProperty("--ry");}
D.addEventListener("pointermove",function(e){if(e.pointerType==="touch")return;var t=e.target,c=t&&t.closest?t.closest("#fb .f-lc"):null;
  if(c!==cur){rest(cur);cur=c;}if(!c||still())return;px=e.clientX;py=e.clientY;if(!raf)raf=requestAnimationFrame(lean);},{passive:true});
D.addEventListener("pointerleave",function(){rest(cur);cur=null;},true);
D.addEventListener("pointerdown",function(e){var c=e.target&&e.target.closest?e.target.closest("#fb .f-lc"):null;if(c)rest(c);},true);
/* the New app's coin turns when its letter or its colour changes */
function watchCoin(root){try{new MutationObserver(function(ms){var seen=[];
    if(ms.some(function(m){return m.type==="childList"&&m.addedNodes&&m.addedNodes.length;}))knowCoins();
    ms.forEach(function(m){var n=m.target&&m.target.nodeType===1?m.target:m.target&&m.target.parentNode;
    var mk=n&&n.closest?n.closest(".f-new-prev .f-ls.mark"):null;if(!mk||seen.indexOf(mk)>=0)return;seen.push(mk);
    /* only a real change of its letter or its colour turns it (typing more of the same name does not) */
    var sig=String(mk.style.getPropertyValue("--mc")||"").trim()+"|"+String(mk.textContent||"").trim(),was=mk.__sig;mk.__sig=sig;
    if(was===undefined||was===sig||still())return;
    mk.classList.remove("turn");void mk.offsetWidth;mk.classList.add("turn");clearTimeout(mk.__turnT);mk.__turnT=setTimeout(function(){mk.classList.remove("turn");},760);});})
  .observe(root,{subtree:true,attributes:true,attributeFilter:["style"],characterData:true,childList:true});}catch(e){}}
/* a coin drawn before its first change knows its first face */
function knowCoins(){try{[].forEach.call(D.querySelectorAll("#fb .f-new-prev .f-ls.mark"),function(mk){if(mk.__sig===undefined)mk.__sig=String(mk.style.getPropertyValue("--mc")||"").trim()+"|"+String(mk.textContent||"").trim();});}catch(e){}}
var tries=0;
function boot(){var fb=D.getElementById("fb");if(!fb){if(++tries<200)setTimeout(boot,700);return;}if(fb.__r260)return;fb.__r260=1;watchCoin(fb);
  knowCoins();}
if(D.readyState==="loading")D.addEventListener("DOMContentLoaded",boot);else boot();
W.IngFabricaDepth={still:still};
try{window.__ingParts["p260"]="running";}catch(_){}
})();
</script>
