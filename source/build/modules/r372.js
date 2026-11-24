<style id="r372-css">
/* ============ R372 · WHAT'S NEW: ITS CARDS ANSWER THE POINTER, AND INGENIUM'S OWN LOGO (Ingenium 7.76, 24 November 2026) ============
   Her words (24 November 2026): "The cards on the "What's new" card inside of the Guide page need to be made animated and clickable.
   They are currently rigid and motionless on hover and I want to fix that so that they react to my mouse and match the rest of the app.
   I also want the right logo design to be added to the "What's new" panel instead of the stand-in design that is currently there."
   Read in the code first (r230): each version is a card that opens and folds when pressed, raised at rest (--pop), but nothing moved
   under the pointer; and the panel's head showed a gold sparkle in a gold disc, drawn for the panel alone.
   Now each version's card lifts under the pointer with a spring, its shadow deepening, its version chip and chevron answering too;
   pressed, it sinks a little and opens or folds as before. The head shows Ingenium's own logo, the seal of the top bar (its layered
   drawing, the same in day and night), in place of the gold sparkle. Nothing moves at rest; Minimal motion and reduced motion keep
   them still. */
.gd-pop .gd-v{transition:transform .22s cubic-bezier(.34,1.4,.64,1),box-shadow .22s ease;will-change:transform}
.gd-pop .gd-v:hover{transform:translateY(-2px);box-shadow:var(--pop-hi,0 0 0 .5px rgba(40,22,68,.16),0 2px 0 rgba(40,22,68,.12),0 8px 16px rgba(40,22,68,.14))}
.gd-pop .gd-v:has(.gd-vh:active){transform:translateY(1px) scale(.995);transition-duration:.06s}
.gd-pop .gd-vh b{transition:transform .22s cubic-bezier(.34,1.4,.64,1),box-shadow .22s ease}
.gd-pop .gd-v:hover .gd-vh b{transform:translateY(-1px);box-shadow:0 2px 5px rgba(106,63,181,.18)}
.gd-pop .gd-v:hover .gd-vh i{color:var(--ink-1,#221a2e)}
.gd-pop .gd-v:hover .gd-vh .n{color:var(--ink-1,#221a2e)}
body[data-theme="night"] .gd-pop .gd-v:hover{background:#30283f;box-shadow:inset 0 1px 0 rgba(255,255,255,.08),inset 0 -2px 0 rgba(0,0,0,.4),0 3px 0 rgba(0,0,0,.6),0 10px 18px rgba(0,0,0,.45)}
body[data-theme="night"] .gd-pop .gd-v:hover .gd-vh .n,body[data-theme="night"] .gd-pop .gd-v:hover .gd-vh i{color:#f3eefb}
/* the head: Ingenium's seal in place of the gold sparkle */
.gd-pop-h .gd-spark.r372-seal{background:none!important;box-shadow:none!important;width:34px;height:34px;color:inherit;overflow:visible}
.gd-pop-h .gd-spark.r372-seal .isl{pointer-events:none}
.gd-pop-h .gd-spark.r372-seal img{width:34px;height:34px;display:block;border-radius:50%}
body[data-motion="minimal"] .gd-pop .gd-v,body[data-motion="minimal"] .gd-pop .gd-vh b{transition:none;transform:none!important}
@media (prefers-reduced-motion:reduce){.gd-pop .gd-v,.gd-pop .gd-vh b{transition:none;transform:none!important}}
</style>
<script>try{(window.__ingParts=window.__ingParts||{})["p372"]="started";}catch(_){}
(function r372(){"use strict";if(window.__r372)return;window.__r372=1;
var D=document;
/* the top bar's seal, copied as it is drawn (its layers keep their own day and night looks), at the head's size */
function seal(){var src=D.querySelector("#brandSealBtn .isl");if(src){var c=src.cloneNode(true);c.removeAttribute("id");c.classList.remove("down","hover");c.classList.add("r372-isl");c.style.setProperty("--S","34px");return c;}
  /* before the seal is built: the logo's own picture, the one the page gives the browser's tab */
  var ic=D.querySelector('link[rel~="icon"]');if(ic&&ic.href){var im=D.createElement("img");im.alt="";im.src=ic.href;return im;}return null;}
function put(){var sp=D.querySelector(".gd-pop .gd-pop-h .gd-spark");if(!sp||sp.classList.contains("r372-seal"))return;var s=seal();if(!s)return;
  sp.innerHTML="";sp.appendChild(s);sp.classList.add("r372-seal");sp.setAttribute("aria-hidden","true");}
try{new MutationObserver(function(){try{put();}catch(e){}}).observe(D.body||D.documentElement,{childList:true,subtree:true});}catch(e){}
put();window.IngWhatsNewSeal={put:put};})();
;try{window.__ingParts["p372"]="running";}catch(_){}
</script>
