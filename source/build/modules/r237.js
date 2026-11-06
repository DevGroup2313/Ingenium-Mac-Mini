<style id="r237-css">
/* ============ R237 · THE MODEL LIST OPENS AT ITS KEY (Ingenium 6.38, 6 November 2026) ============
   Her note: "The models drop down list panel from the chats does not open directly on top of the button, it opens on the other
   side of the chat text, please fix that." Found: the list (#chatModelMenu) was placed by the rule all the chat's menus share, at
   the left edge of the composer's bar (left:0), while its key stands at the right, beside the send arrow; the effort list
   (modules/r215.js) was already placed at its own key. Now, in Chat and in Code alike, the model list opens just above its key,
   its right edge on the key's right edge (as the effort list's is), moved in only as far as the window's edge asks. It follows
   the key when the window changes size or the list is painted again, and where there is less room above the key than the list
   needs, the list scrolls inside that room instead of running under the top bar. */
</style>
<script>try{(window.__ingParts=window.__ingParts||{})["p237"]="started";}catch(_){}
(function r237(){"use strict";
var W=window,D=document,GAP=6,EDGE=8;
function $(id){return D.getElementById(id);}
/* the list and its key: the list is positioned inside the composer's bar (its offsetParent), so the key's place on the screen is
   turned into the bar's own measures */
function place(){var m=$("chatModelMenu"),k=$("chatModelBtn");if(!m||!k||m.hidden)return;var op=m.offsetParent;if(!op)return;
  try{var kr=k.getBoundingClientRect();if(!kr.width&&!kr.height)return;
    var or=op.getBoundingClientRect(),padR=or.left+op.clientLeft+op.clientWidth,padB=or.top+op.clientTop+op.clientHeight;
    var edge=Math.min(kr.right,(W.innerWidth||D.documentElement.clientWidth)-EDGE);
    m.style.left="auto";m.style.top="auto";m.style.maxHeight="";
    m.style.right=Math.round(padR-edge)+"px";m.style.bottom=Math.round(padB-kr.top+GAP)+"px";
    var mr=m.getBoundingClientRect();
    if(mr.left<EDGE){m.style.right=Math.round(padR-edge-(EDGE-mr.left))+"px";}
    /* the room above the key, below the top bar */
    var top=EDGE;var tb=D.querySelector(".topbar");if(tb){var t=tb.getBoundingClientRect();if(t.bottom>0&&t.bottom<kr.top)top=t.bottom+EDGE;}
    var room=Math.floor(kr.top-GAP-top);if(mr.height>room)m.style.maxHeight=Math.max(120,room)+"px";
  }catch(e){}}
/* whenever the list opens or is painted again (the houses, the connections and the blends are added to it by other parts), and
   whenever the window or the composer changes size while it is open; the observer runs before the screen is drawn, so the list
   never shows at the bar's left edge first */
function watch(){var m=$("chatModelMenu");if(!m||m.__r237)return !!m;m.__r237=true;
  try{new MutationObserver(function(){if(!m.hidden)place();}).observe(m,{attributes:true,attributeFilter:["hidden"],childList:true,subtree:true});}catch(e){}
  try{var bar=m.offsetParent||m.parentNode;if(W.ResizeObserver&&bar)new ResizeObserver(function(){if(!m.hidden)place();}).observe(bar);}catch(e){}
  W.addEventListener("resize",function(){if(!m.hidden)place();});
  return true;}
(function later(){var n=0;(function wait(){if(watch())return;if(++n<240)setTimeout(wait,500);})();})();
W.IngModelMenu={place:place};
})();
;try{window.__ingParts["p237"]="running";}catch(_){}
</script>
