<script>try{(window.__ingParts=window.__ingParts||{})["p369"]="started";}catch(_){}
/* ============ R369 · THE LIST OF CONVERSATIONS ALWAYS HAS ITS KEY (Ingenium 7.76, 24 November 2026) ============
   Her words (24 November 2026): "There is an issue with the Full edition of Ingenium, I can't seem to find the conversations control
   button that allows the user to start a new conversation and also have the option to rename the conversation and also see the full
   list of previous conversations. It is present on the Master edition but is entirely missing from the both chat pages inside of the
   Full edition".
   Read in the code first: the key (☰, #ccSideBtn, at the top left of Chat and Code) was hidden whenever the list was set to stand
   open beside the chat (state.cc.side, true unless the list was once closed) on a window wider than 820 points. Since 6.69 (r102) the
   list on Chat and Code always opens over the chat, from that key, and is closed until then; so on a fresh desk (the full edition she
   opened, or any new profile) the list was closed and its key hidden: no way to the list, to a new conversation or to renaming. Her
   master copy showed the key only because she had once closed the list there. It was the same in every edition.
   Now, wherever the list opens over the chat, its key is always shown. */
(function r369(){
"use strict";
if(window.__r369)return;window.__r369=1;
var W=window,D=document;
function over(){try{return typeof ccSideOver==="function"&&!!ccSideOver();}catch(e){return false;}}
function show(){var sb=D.getElementById("ccSideBtn");if(sb&&over()&&sb.hidden)sb.hidden=false;}
function wrap(){if(typeof W.ccPaintHead!=="function"||W.ccPaintHead.__r369)return false;var o=W.ccPaintHead;
  var n=function(){var r=o.apply(this,arguments);try{show();}catch(e){}return r;};n.__r369=1;try{ccPaintHead=n;}catch(e){}W.ccPaintHead=n;return true;}
(function wait(k){if(wrap()){show();return;}if(k<240)setTimeout(function(){wait(k+1);},250);})(0);
/* and whenever the window or the chat's layout changes */
W.addEventListener("resize",function(){setTimeout(show,80);});
setInterval(function(){try{var p=D.getElementById("page-chat");if(p&&p.classList.contains("active"))show();}catch(e){}},1500);
W.IngConvKey={show:show};
})();
;try{window.__ingParts["p369"]="running";}catch(_){}
</script>
