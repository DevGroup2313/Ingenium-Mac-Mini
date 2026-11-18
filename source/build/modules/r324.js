<style id="r324-css">
/* ============ R324 · AT REST, STILL: NOTHING MOVES WHEN NOTHING IS BEING DONE (Ingenium 7.40, 18 November 2026) ============
   Her words (18 November 2026): "Ingenium still heats up my phone, its not as hot as before but it does get warmer"; "Ingenium is running
   really slow on my HP laptops". And her standing rule: parts keep their look at rest and only move when she uses them.
   Measured on 7.39 (rig/t_740_rest.js does it again), a phone's screen, nothing touched for eight seconds, the share of one processor core
   the page kept busy: Adamas 138 per cent, Vesta 98, Home 35, Fabrica 22, Vocatio 15, Lector 7, Chat 3 (in a browser that draws on the
   processor, so a phone's own numbers are lower; the work is the same). Home alone kept 121 animations running for ever: the turret's
   twinkles, sways and turns, the breathing seal, the engine's turn, the bell, and others; most are drawings (SVG), repainted at every
   frame. The scenes (Adamas's diamond, Vesta's water, Vocatio's compass, Fabrica's tree) drew on, more slowly, while nothing was done.
   Now, after a short while with nothing touched, scrolled or typed (12 seconds on a phone or tablet, 30 on a computer), or at once when
   Ingenium is not the window in use: every running animation holds where it is, and the scenes stop drawing. The first touch, key, scroll
   or pointer movement brings everything back where it was. Never while a model writes, a file comes down, or Fabrica works: those keep
   their moving signs. Minimal motion is unchanged (still always). */
body.ing-rest *,body.ing-rest *::before,body.ing-rest *::after{animation-play-state:paused!important}
</style>
<script>try{(window.__ingParts=window.__ingParts||{})["p324"]="started";}catch(_){}
/* R324 · at rest, still: see the note at the top of its styles. window.IngStill {on(), wake(fn), now()} */
(function r324(){
"use strict";
if(window.IngStill)return;
var W=window,D=document;
var touch=false;try{touch=!!(W.matchMedia&&matchMedia("(pointer: coarse)").matches)||(navigator.maxTouchPoints>0&&Math.min(screen.width,screen.height)<900);}catch(e){}
var AFTER=touch?12000:30000,LAST=performance.now(),ON=false,WAKE=[],T=0;
/* work that keeps its moving signs: a model writing, a download, Fabrica at work, a lesson playing */
function busy(){try{if(typeof Engine!=="undefined"&&Engine&&(Engine.status==="busy"||Engine.status==="loading"))return true;}catch(e){}
  try{if(W.liveBot)return true;}catch(e){}
  try{if(D.querySelector('[aria-busy="true"]'))return true;}catch(e){}
  return false;}
function away(){return D.hidden||!(D.hasFocus?D.hasFocus():true);}
function set(on){if(on===ON)return;ON=on;try{D.body.classList.toggle("ing-rest",on);}catch(e){}
  if(!on){var w=WAKE;WAKE=[];w.forEach(function(f){try{f();}catch(e){}});try{W.dispatchEvent(new CustomEvent("ing-wake"));}catch(e){}}}
function check(){T=0;if(ON)return;var idle=performance.now()-LAST;
  if(away()||idle>=AFTER){if(busy()){T=setTimeout(check,2000);return;}set(true);return;}
  T=setTimeout(check,Math.max(500,AFTER-idle+50));}
function touched(){LAST=performance.now();if(ON)set(false);if(!T)T=setTimeout(check,AFTER+50);}
["pointerdown","pointermove","keydown","wheel","touchstart","input","focusin"].forEach(function(k){D.addEventListener(k,touched,{capture:true,passive:true});});
D.addEventListener("scroll",touched,{capture:true,passive:true});
D.addEventListener("visibilitychange",function(){if(D.hidden){clearTimeout(T);T=0;check();}else touched();});
W.addEventListener("blur",function(){clearTimeout(T);T=setTimeout(check,1500);});
W.addEventListener("focus",touched);
/* the page sets a busy sign later: rest waits for it to end */
T=setTimeout(check,AFTER);
W.IngStill={version:1,
  on:function(){return ON;},
  /* a scene that stops drawing at rest asks to be woken; each asks once per rest */
  wake:function(fn){if(typeof fn==="function"&&WAKE.indexOf(fn)<0)WAKE.push(fn);},
  now:function(){set(true);},touched:touched,after:AFTER};
})();
;try{window.__ingParts["p324"]="running";}catch(_){}
</script>
