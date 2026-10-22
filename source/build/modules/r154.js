<style id="r154-css">
/* ============ R154 · INGENIUM'S QUIET SCREEN, THE SHARED ONE ============
   The owner's words (22 October 2026): "I want full parity with Ingenium's Quiet screen." The Forge carries the quiet
   screen as the shared thoughts/quiet_screen.html, made from Ingenium's; Ingenium kept its older copy, which the same test
   found short in eight places: focus could leave the screen while it was open, it did not go back to the leaf when it closed,
   the circle kept breathing when the device asked for less motion, the back key was 34 pixels high (too small to touch), and a
   timed note could show over it. So Ingenium now opens the shared screen, as the Forge does: the same words, the same
   breathing circle and the same one way back (the key, or Esc), in Ingenium's own colours (the shared module's own, which are
   Ingenium's), its own serif and sans. The leaf, Focus's I need quiet, the support module and the tour open it. While it is
   open, reminders, the thoughts panel's nudges and timed notes wait, and come after. */
#ingQuiet{--qsc-serif:var(--serif,Georgia,"Times New Roman",serif);--qsc-sans:var(--sans,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif)}
/* the older screen is never shown again */
#quietScreen{display:none !important}
</style>
<script>try{(window.__ingParts=window.__ingParts||{})["p75"]="started";}catch(_){}
/* R154 · Ingenium's quiet screen, the shared one: see the note at the top of its styles */
(function(){"use strict";
if(window.__r154||!window.QuietScreen)return;window.__r154=1;
function $(id){return document.getElementById(id);}
function seen(n){try{if(!n||!n.isConnected)return false;var r=n.getBoundingClientRect(),cs=getComputedStyle(n);
  return r.width>0&&r.height>0&&cs.visibility!=="hidden"&&cs.display!=="none"&&+cs.opacity>0.05&&cs.pointerEvents!=="none";}catch(e){return false;}}
function night(){return document.body.getAttribute("data-theme")==="night";}
/* the circle rests (and the words are shorter) with Minimal motion and with Calm, as Ingenium's always did */
function still(){try{if(window.state&&state.motion==="minimal")return true;}catch(e){}try{if(typeof sup==="function"&&sup("calm"))return true;}catch(e){}
  return document.body.getAttribute("data-motion")==="minimal";}
function inbox(){try{if(window.IngSupport&&!IngSupport.sc.on("inbox"))return null;}catch(e){}return window.IngInbox?IngInbox.tc:null;}
var QS=QuietScreen.create({id:"ingQuiet",night:night,still:still,tc:inbox,
  hold:{toast:function(){return $("sc-toast");},replay:function(h){try{IngSupport.sc.toast(h,9000,true);}catch(e){}},
    after:function(){try{var t=inbox();if(t&&t.tick)t.tick();}catch(e){}}},
  onOpen:function(){try{if(typeof refreshLayerState==="function")refreshLayerState();}catch(e){}},
  onClose:function(){try{if(typeof refreshLayerState==="function")refreshLayerState();}catch(e){}},
  returnTo:function(){var k=$("fabQuiet");if(seen(k))return k;var w=document.querySelector("#fxCalmCard .fx-quiet");return seen(w)?w:null;}});
window.IngQuiet={open:function(){QS.open();},close:function(){QS.close();},isOpen:function(){return QS.isOpen();},screen:QS};
/* every way in (the leaf, Focus, the support module, the tour) calls quietOpen by name; the leaf was bound to the older one */
window.quietOpen=function(){QS.open();};window.quietClose=function(){QS.close();};
try{quietOpen=window.quietOpen;quietClose=window.quietClose;}catch(e){}
function bind(){var k=$("fabQuiet");if(k&&k.__r154!==1){k.onclick=function(e){if(e){e.preventDefault();e.stopPropagation();}QS.open();};k.__r154=1;}}
bind();if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",bind);[600,2500].forEach(function(ms){setTimeout(bind,ms);});
})();
;try{window.__ingParts["p75"]="running";}catch(_){}
</script>
