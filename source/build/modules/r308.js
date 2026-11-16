<style id="r308-css">
/* ============ R308 · A PAGE THAT COMES IN STILL, A THEME THAT TURNS AT ONCE, A TOUCH THAT IS NOT TAKEN FOR A SELECTION (Ingenium 7.22, 16 November 2026) ============
   Her words (16 November 2026): "The home page's 3D header card and its "Your next step" card keep on resizing and lifitng slight higher on
   the page"; "the app is moving really slow on the Fire Tablet as well, it does not always register my click to go to a different on the
   navigation bar and sometimes even when it registers that I clicked on the page it just selects the page's title instead with a blue fade
   and then slowly gets to the next page. Its the same with changing the app from Day mode to Night mode, it takes a while to change between
   the two themes and a lot of times it looks weirdly stuck between parts of the screen being still on Day mode but with Night mode dark
   buttons halfway painted and vice versa, it does not happen all at once like it is supposed to".
   - Every page came in with a fade that also slid it up 6 px (the base's fadeIn): the lift she saw on Home. A page now only fades in.
   - 860 parts of the page ease their colours on a change (transitions on background, colour, border and shadow, from 0.16 s to 0.3 s), so
     a slow device repainted them in turn. While the theme turns, transitions are held for two frames: every part takes its new colours in
     the same frame.
   - The keys of the side list and the pages' titles cannot be selected by a finger that rests (on a busy device a tap can last long enough
     to be read as a press and hold), and a tap leaves no grey or blue flash. */
.section.active{animation-name:ingPageIn}
@keyframes ingPageIn{from{opacity:0}to{opacity:1}}
html.ing-swap *,html.ing-swap *::before,html.ing-swap *::after{transition:none !important}
.nav-btn,.nav-btn *,.rail-btn,.page-title,.skh-title,.skh-eyebrow{-webkit-user-select:none;user-select:none;-webkit-touch-callout:none}
button,a,.nav-btn,.rail-btn,[role="button"]{-webkit-tap-highlight-color:transparent;touch-action:manipulation}
</style>
<script>try{(window.__ingParts=window.__ingParts||{})["p308"]="started";}catch(_){}
(function(){"use strict";
var W=window,D=document;if(W.__r308)return;W.__r308=1;
var raf=W.requestAnimationFrame||function(f){return setTimeout(f,16);},held=0;
function hold(){var h=D.documentElement;h.classList.add("ing-swap");held++;raf(function(){raf(function(){if(--held<=0){held=0;h.classList.remove("ing-swap");}});});}
/* the base's applyTheme sets the theme on the body; anything else that sets it is caught as it happens, before the next frame is drawn */
var ap=W.applyTheme;if(typeof ap==="function"&&!ap.__r308){var g=function(){hold();return ap.apply(this,arguments);};g.__r308=1;try{Object.keys(ap).forEach(function(k){g[k]=ap[k];});}catch(e){}W.applyTheme=g;}
var last=D.body?D.body.getAttribute("data-theme"):null;
try{new MutationObserver(function(){var t=D.body.getAttribute("data-theme");if(t!==last){last=t;if(!D.documentElement.classList.contains("ing-swap"))hold();}}).observe(D.body,{attributes:true,attributeFilter:["data-theme"]});}catch(e){}
W.IngThemeSwap={hold:hold};
try{window.__ingParts["p308"]="running";}catch(_){}
})();
</script>
