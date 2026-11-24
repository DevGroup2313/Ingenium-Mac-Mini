<script>try{(window.__ingParts=window.__ingParts||{})["p370"]="started";}catch(_){}
/* ============ R370 · A STICKY NOTE KEEPS ROOM BELOW THE LINE BEING WRITTEN (Ingenium 7.76, 24 November 2026) ============
   Her words (24 November 2026): "I want you to add more space to the sticky notes for when I am typing and reaching the bottom of the
   page and there isn't another much space left for me to write on the sticky notes. Right now it only goes down by one line and leaves
   barely enough room for me to continue and it makes me feel like the words are about to be cut off the notes and I have to
   continuously keep on expanding and adjusting the sticky notes ... I want it to auto-scroll slightly and leave the page at half a page
   or something or perhaps move the current paragraph to the top of the sticky notes when I get to the last line automatically that way
   I can keep my sticky notes at my desired size on the page and continue writing ... As always, I want the scrolling function kept but
   the scroll bars hidden".
   Read in the code first: a note's writing area (.sticky-note .sn-body) is an editable box that scrolls, with its scroll bar hidden
   (since 5.x); as she types past its foot, the browser scrolls only far enough to show the caret's line, at the very bottom.
   Now, when the line being written comes within about three lines of the foot, the note scrolls gently so that line stands a little above
   the middle, with blank room below it; room is kept under the last line so the end of a note can rise that far. This is for a note
   that keeps a size (one she has resized, or one grown to its tallest); a new note that still grows line by line grows as before.
   The note keeps its size; nothing moves while she reads or scrolls herself; Minimal motion and reduced motion scroll at once, without
   the glide. */
(function r370(){
"use strict";
if(window.__r370)return;window.__r370=1;
var W=window,D=document,AT=0.42;
function calm(){try{var m=D.body.getAttribute("data-motion");if(m==="minimal")return true;return !!(W.matchMedia&&matchMedia("(prefers-reduced-motion: reduce)").matches);}catch(e){return false;}}
/* where the caret stands, on the screen: a collapsed range has no box at a line's end, so a marker is put in for a moment */
function caretRect(body){var s=W.getSelection&&W.getSelection();if(!s||!s.rangeCount)return null;var r=s.getRangeAt(0);if(!body.contains(r.endContainer))return null;
  var q=r.cloneRange();q.collapse(false);var rs=q.getClientRects();if(rs.length&&rs[rs.length-1].height>0)return rs[rs.length-1];
  var m=D.createElement("span");m.textContent="​";try{q.insertNode(m);var b=m.getBoundingClientRect();var p=m.parentNode;p.removeChild(m);try{p.normalize();}catch(e){}
    /* the selection is put back where it was */
    try{s.removeAllRanges();s.addRange(r);}catch(e){}return b.height>0?b:null;}catch(e){try{if(m.parentNode)m.parentNode.removeChild(m);}catch(_){}return null;}}
/* a note that keeps a size: resized by her (its height set), or its writing already longer than the note */
function sized(body){var card=body.closest(".sticky-note");return !!(card&&(card.style.height||body.scrollHeight>body.clientHeight+2));}
function lineH(body){var cs=getComputedStyle(body),lh=parseFloat(cs.lineHeight);if(!(lh>0))lh=(parseFloat(cs.fontSize)||15)*1.45;return lh;}
/* room under the last line, so its end can rise to the middle: the note's own height is kept */
function room(body){var want=Math.round(body.clientHeight*(1-AT))-Math.round(lineH(body));if(want<0)want=0;
  if(body.__room!==want){body.__room=want;body.style.setProperty("padding-bottom",want+"px","important");}}
function keep(body){if(!body||!body.isConnected||D.activeElement!==body||!sized(body))return;var c=caretRect(body);if(!c)return;
  var br=body.getBoundingClientRect(),lh=lineH(body),foot=br.top+body.clientHeight;
  if(c.bottom<=foot-lh*3)return;   /* still more than three lines of room: nothing moves */
  room(body);var to=body.scrollTop+(c.top-br.top)-Math.round(body.clientHeight*AT);if(to<=body.scrollTop+1)return;
  try{body.scrollTo({top:to,behavior:calm()?"auto":"smooth"});}catch(e){body.scrollTop=to;}}
var T=0;function soon(body){if(T)cancelAnimationFrame(T);T=requestAnimationFrame(function(){T=0;try{keep(body);}catch(e){}});}
function isBody(t){return t&&t.nodeType===1&&t.classList&&t.classList.contains("sn-body")&&t.closest&&t.closest(".sticky-note");}
D.addEventListener("input",function(e){if(isBody(e.target))soon(e.target);},true);
D.addEventListener("keyup",function(e){if(!isBody(e.target))return;if(e.key==="Enter"||e.key==="ArrowDown"||e.key==="PageDown"||e.key==="End")soon(e.target);},true);
D.addEventListener("focusin",function(e){if(isBody(e.target)&&sized(e.target))room(e.target);},true);
/* a note resized by her keeps the right room */
if(typeof ResizeObserver!=="undefined"){var RO=new ResizeObserver(function(es){es.forEach(function(x){var b=x.target;if(b.__room!=null)room(b);});});
  new MutationObserver(function(){[].forEach.call(D.querySelectorAll(".sticky-note .sn-body"),function(b){if(!b.__r370){b.__r370=1;try{RO.observe(b);}catch(e){}}});}).observe(D.body||D.documentElement,{childList:true,subtree:true});}
W.IngNoteRoom={keep:keep,room:room,AT:AT};
})();
;try{window.__ingParts["p370"]="running";}catch(_){}
</script>
