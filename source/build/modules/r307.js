<style id="r307-css">
/* ============ R307 · A NARROW HEAD STACKED AS ON A PHONE (Ingenium 7.19, 16 November 2026) ============
   Her words (16 November 2026), on the live preview https://claude.ai/artifact/JjCSYt2uj824FQjzXpW16g (Ingenium Tablet Headers, version 1):
   "I approve of the preview and your recommendations, please commit and push it everywhere and continue working on my requests."
   Found on 7.17 and 7.18 (rig/t_716_touch_heads.js and pictures in Safari's engine at an iPad's size): on an iPad (a head 531 px wide)
   and on the Fire tablet upright with the menu open (497 px) the 3D objects of Adamas, Lector, Vocatio, Fabrica and Vesta stood partly
   under their words. A head narrower than 640 px now takes the arrangement a phone already has (r290, r296, r291's rules for a screen
   up to 760 px): its words first, then its object whole beneath them. A wider head keeps its words and its object side by side. The rules
   are the preview's own, word for word; the head's width is watched by a ResizeObserver (Chrome 64 and later, Safari 13.1 and later). */
.skh.skh-narrow{height:auto;padding:24px 18px 22px}.skh.skh-narrow .skh-words{position:static;width:auto}.skh.skh-narrow .skh-hint{position:static;margin-top:14px}
.skh.skh-narrow > .skh-obj:not(.fc-pool){display:block !important;position:relative;right:auto;top:auto;left:auto;margin:12px 0 0;transform-origin:0 0}
#page-focus.sk-on .skh.skh-narrow .skh-obj.fc-pool{display:block !important;position:relative;left:auto;right:auto;top:auto;bottom:auto;width:auto;height:270px;margin:14px -18px 0;border-radius:0}
</style>
<script>try{(window.__ingParts=window.__ingParts||{})["p307"]="started";}catch(_){}
(function(){"use strict";
var D=document,W=window,NARROW=640,ro=null,kick=0;
/* a head narrower than 640 px is stacked; when one changes, the heads that frame their pictures by the window are told once (a resize) */
function set(h){var n=h.offsetWidth>0&&h.offsetWidth<NARROW;if(n===h.classList.contains("skh-narrow"))return false;h.classList.toggle("skh-narrow",n);return true;}
function told(){if(kick)return;kick=setTimeout(function(){kick=0;try{W.dispatchEvent(new Event("resize"));}catch(e){}},60);}
function scan(){var ch=false;[].forEach.call(D.querySelectorAll(".skh"),function(h){if(set(h))ch=true;if(ro&&!h.__r307){h.__r307=1;try{ro.observe(h);}catch(e){}}});if(ch)told();}
if(typeof W.ResizeObserver==="function"){ro=new ResizeObserver(function(es){var ch=false;es.forEach(function(e){if(set(e.target))ch=true;});if(ch)told();});}
else W.addEventListener("resize",function(){scan();});
scan();[400,1500,4000,9000].forEach(function(ms){setTimeout(scan,ms);});
var og=W.go;if(typeof og==="function"&&!og.__r307){var g=function(){var r=og.apply(this,arguments);try{setTimeout(scan,60);setTimeout(scan,1200);}catch(x){}return r;};
  try{Object.keys(og).forEach(function(k){g[k]=og[k];});}catch(x){}g.__r307=1;W.go=g;}
W.IngNarrowHeads={scan:scan,width:NARROW,state:function(){return [].map.call(D.querySelectorAll(".skh"),function(h){return {w:h.offsetWidth,narrow:h.classList.contains("skh-narrow")};});}};
try{window.__ingParts["p307"]="running";}catch(_){}
})();
</script>
