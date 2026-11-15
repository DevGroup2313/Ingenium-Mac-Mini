<style id="r305-css">
/* ============ R305 · NOTHING UNSEEN KEEPS MOVING (Ingenium 7.16, 15 November 2026) ============
   Her words (15 November 2026): "Ingenium is possibly overheating my phone, please fix that too. It is moving slow and lagging on all of my
   devices and sometimes making them overheat them. Ingenium needs to be running smoothly and fast with no issues and errors on all of my
   devices and I want my 3D graphics and animations to be preserved and run smoothly as well, please make the fix."
   Measured on 7.15 (rig/t_716_rest.js: a phone's screen at three pixels to the point, touch, the processor slowed four times): a page's
   head keeps every one of its endless animations running once it is scrolled out of sight, Home's 109 (its orrery, its stars, its seal),
   Concordia's 11, Lector's 8, Vocatio's 10; the graphics chip keeps composing frames of them that no one sees. So each page's head is
   watched, and while none of it is on screen its endless animations stand still; they go on from where they stood when it comes back into
   sight, so nothing looks different. Only endless ones are held (a key's press, a sheet's opening, anything that ends, is never touched),
   and only through the browser's own list of animations (document.getAnimations): a web view without it (Chrome 83, the Fire tablet's
   older one) keeps every animation running, as before. */
</style>
<script>try{(window.__ingParts=window.__ingParts||{})["p305"]="started";}catch(_){}
(function(){"use strict";
var D=document,W=window,SEL=".hx-head,.bx-head,.fd-head,.tr-head,.skh",io=null,held=0;
if(typeof D.getAnimations!=="function"||typeof W.IntersectionObserver!=="function"){try{window.__ingParts["p305"]="running";}catch(_){}return;}
function endless(a){try{var t=a.effect&&a.effect.getTiming?a.effect.getTiming():null;return !!(t&&t.iterations===Infinity);}catch(e){return false;}}
function hold(h){var list=[];try{D.getAnimations().forEach(function(a){var t=a.effect&&a.effect.target;if(!t||a.playState!=="running"||!endless(a))return;
    if(t.nodeType!==1||!h.contains(t))return;try{a.pause();list.push(a);}catch(e){}});}catch(e){}h.__ingHeld=list;held+=list.length;}
function free(h){var list=h.__ingHeld||[];h.__ingHeld=null;list.forEach(function(a){try{if(a.playState==="paused")a.play();}catch(e){}});held=Math.max(0,held-list.length);}
io=new IntersectionObserver(function(es){es.forEach(function(e){var h=e.target,away=!e.isIntersecting;if(!!h.__ingAway===away)return;h.__ingAway=away;
  if(away)hold(h);else free(h);});},{threshold:0});
function scan(){[].forEach.call(D.querySelectorAll(SEL),function(h){if(h.__ingRest)return;h.__ingRest=1;io.observe(h);});}
/* the heads are made when their pages are first shown, or soon after Ingenium starts */
scan();[1000,3000,8000,20000].forEach(function(ms){setTimeout(scan,ms);});
var og=W.go;if(typeof og==="function"&&!og.__r305){var g=function(){var r=og.apply(this,arguments);try{setTimeout(scan,60);setTimeout(scan,1200);}catch(x){}return r;};
  try{Object.keys(og).forEach(function(k){g[k]=og[k];});}catch(x){}g.__r305=1;W.go=g;}
W.IngRest={state:function(){var hs=[].slice.call(D.querySelectorAll(SEL));return {heads:hs.length,away:hs.filter(function(h){return !!h.__ingAway;}).length,held:held};},scan:scan};
try{window.__ingParts["p305"]="running";}catch(_){}
})();
</script>
