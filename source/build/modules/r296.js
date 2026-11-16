<style id="r296-css">
/* ============ R296 · THE STUDIOS' HEADS ON A PHONE (Ingenium 7.00, 13 November 2026) ============
   Her words (13 November 2026): "I also want the new pages designs and graphics visible on the Iphone/Ipad and Fire Tablet screens too,
   last time the Home page sphere's design was not on the iphone's update". Until now a window narrower than 760 pixels showed a studio's
   head without its instrument (modules/r290.js hid it there). Now the instrument stands under the words at the width there is: Vocatio's
   compass, Lector's documents, Fabrica's tree and Build's diamond are drawn at their own size and scaled down whole, so they look as they
   do on a computer; Focus's pool takes the card's width by itself (modules/r291.js). A tablet keeps the computer's layout, scaled as before. */
@media (max-width:760px){.skh > .skh-obj:not(.fc-pool){display:block !important;position:relative;right:auto;top:auto;left:auto;margin:12px 0 0;transform-origin:0 0}}
</style>
<script>try{(window.__ingParts=window.__ingParts||{})["p296"]="started";}catch(_){}
/* R296 · the studios' heads on a phone: see the note at the top of its styles */
(function r296(){
"use strict";
if(window.__r296)return;window.__r296=1;
var D=document,W=window,T=0;
/* 7.22, her words (16 November 2026): "Lector's 3D documents looks weird on the Fire Tablet screen, its skewed to the left and placed
   directly unde the Lector header title and its two buttons and looks significantly smaller on the card ... it would look better in the
   middle of the card if it is stacked up on a smaller screen. It is the same for Vocatio's compass ... I have the same complaint for
   Adamas' diamond and Fabrica's tree on the Fire Tablet." A head stacked by r307 (narrower than 640 px, as on the Fire tablet upright
   with the menu open, the window 800 px wide) was not fitted here, since this asked the window's width alone: its object kept the 0.66
   of r290's rule for a window under 980 px, from its left edge, over a box still 424 px tall (144 px empty beneath it). A stacked head
   is now fitted as a phone's is: its object as wide as the head's inside, in the middle, with no empty band below. */
function fit(){T=0;var small=W.innerWidth<=760;
  [].forEach.call(D.querySelectorAll(".skh > .skh-obj:not(.fc-pool)"),function(o){var h=o.parentNode,narrow=small||!!(h&&h.classList&&h.classList.contains("skh-narrow"));
    if(!narrow){if(o.__fit){o.style.transform="";o.style.marginBottom="";o.style.marginLeft="";o.__fit=0;}return;}
    if(!h||!h.offsetParent)return;var cs=W.getComputedStyle(h),w=h.clientWidth-(parseFloat(cs.paddingLeft)||0)-(parseFloat(cs.paddingRight)||0);if(w<=0)return;
    var k=Math.max(0.35,Math.min(1,w/520)),tr="scale("+k.toFixed(4)+")",mb=(-424*(1-k)).toFixed(1)+"px",ml=Math.max(0,(w-520*k)/2).toFixed(1)+"px";
    if(o.style.transform!==tr)o.style.transform=tr;if(o.style.marginBottom!==mb)o.style.marginBottom=mb;if(o.style.marginLeft!==ml)o.style.marginLeft=ml;o.__fit=1;});}
function soon(){if(!T)T=setTimeout(fit,60);}
W.addEventListener("resize",soon);
var og=W.go;if(typeof og==="function")W.go=function(){var r=og.apply(this,arguments);try{setTimeout(fit,40);setTimeout(fit,400);}catch(e){}return r;};
if(D.readyState==="loading")D.addEventListener("DOMContentLoaded",function(){setTimeout(fit,300);});else setTimeout(fit,300);
W.IngHeadsFit=fit;
try{window.__ingParts["p296"]="running";}catch(_){}
})();
</script>
