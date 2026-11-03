<style id="r213-css">
/* ============ R213 · TWO FIXES SHE ASKED FOR (Ingenium 6.10.4, 3 November 2026) ============
   1. The Career Studio scrolls as Lector and Fabrica do: its panels keep scrolling, with no bar showing (Lector hides every bar in
      its room, r107; Fabrica its panels', r112; the Career Studio had thin bars of its own, r188).
   2. Build: the code panel scrolls inside itself. Its panel and the preview had no height of their own, so the code grew to its
      full length (300 lines wrapped stood about 17,000 pixels tall) and only the page scrolled; now both stand as tall as the window
      leaves them (r213's script measures it), the code scrolls within its panel, and at its end the page carries on to the colophon. */
#cs *{scrollbar-width:none;-ms-overflow-style:none}
#cs *::-webkit-scrollbar{display:none;width:0;height:0}
@media (min-width:921px){
  #page-build #buildGrid{height:var(--bd-h,auto)}
  #page-build #buildGrid .editor-pane{min-height:0}
  #page-build #buildGrid .editor-pane .ic-wrap{flex:1 1 auto;min-height:0 !important}}
@media (max-width:920px){
  #page-build #buildGrid .editor-pane{height:min(72vh,720px);min-height:300px}
  #page-build #buildGrid .editor-pane .ic-wrap{flex:1 1 auto;min-height:0 !important}}
</style>
<script>try{(window.__ingParts=window.__ingParts||{})["p213"]="started";}catch(_){}
/* R213: see the note at the top of its styles. Her words (3 November 2026): "I want you to hide the scroll bar inside of the Learn
   panel of the Career studio page, it detracts from the rest of the app. I want everything to remain consistent. I only want the
   scroll bar hidden from view, I want to keep the scrollability of the page intact. I also want the scrolling ability of the Build
   page's 'Your code' panel restored, I don't want it to be stiff and unscrollable." */
(function r213(){
"use strict";
if(window.__r213)return;window.__r213=1;
/* the height the Build page's two panels stand at: what the window leaves below the page's head, never less than 480 pixels */
function fit(){try{var g=document.getElementById("buildGrid"),pg=document.getElementById("page-build");if(!g||!pg||!pg.classList.contains("active"))return;
  if(window.matchMedia&&matchMedia("(max-width: 920px)").matches){g.style.removeProperty("--bd-h");return;}
  var top=g.getBoundingClientRect().top+(window.scrollY||0),h=Math.max(480,Math.round(window.innerHeight-top-16));
  if(g.style.getPropertyValue("--bd-h")!==h+"px")g.style.setProperty("--bd-h",h+"px");}catch(e){}}
var t=0;function soon(){clearTimeout(t);t=setTimeout(fit,60);}
addEventListener("resize",soon);
(function hook(){if(typeof window.go!=="function")return;var o=window.go;
  window.go=function(){var r=o.apply(this,arguments);soon();setTimeout(fit,400);return r;};
  try{go=window.go;}catch(e){}})();
try{var pg=document.getElementById("page-build");if(pg&&window.ResizeObserver)new ResizeObserver(soon).observe(pg);
  new MutationObserver(soon).observe(document.body,{attributes:true,attributeFilter:["class","data-buildview","data-builded","data-buildfold"]});}catch(e){}
fit();
window.IngR213={fit:fit};
})();
;try{window.__ingParts["p213"]="running";}catch(_){}
</script>
