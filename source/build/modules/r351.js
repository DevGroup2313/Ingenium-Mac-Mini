<style id="r351-css">
/* ============ R351 · SEE THE PASSWORD AS IT IS TYPED (Ingenium 7.61, 21 November 2026) ============
   Her words (20 November 2026): "I also want to be able to see the text of my password when I am typing it on the sign-in page the
   same way it is done on the Lakay app, please make the fix."
   As Lakay does it (its "See the password": every password field, wherever it appears, carries a key that shows what is typed and
   hides it again; part of its AuDHD support; the field keeps the focus while the key is used), every password field in Ingenium carries
   a small key at its right edge: the sign-in, its set-up and its ways back in, Change the password, a backup's password, the Cloud's
   passphrase, the owner key's password, the keys of connections. Pressed, the field shows its text and the key says Hide the password;
   pressed again, it hides it. The caret stays where it was, at the end.
   In Ingenium's own look: an eye drawn in the field's quiet ink (an eye with a line across it while the text is shown), no purple
   shading under the pointer (her rule): it brightens and stands a little, and sinks a little when pressed; it never moves under the
   pointer on the sign-in's door, whose keys never do. Minimal or reduced motion keeps it still.
   Kept safe while shown: the field is marked secret (data-secret), so Clear a copied secret (r318) still clears what is copied from
   it; spelling and correction are off, so the words are never sent to a spelling service; and the field is a password field again the
   moment its form is sent, so the browser never keeps it among a form's remembered words. window.IngPeek: scan(), show(input, on) */
.ing-peek-wrap{position:relative;display:block;width:100%;min-width:0}
.ing-peek-wrap.inl{display:inline-block;vertical-align:middle}
.ing-peek-wrap>input{width:100%;box-sizing:border-box;padding-right:44px!important}
.ing-peek{position:absolute;right:6px;top:50%;transform:translateY(-50%);width:34px;height:30px;padding:0;margin:0;border:0;border-radius:9px;background:transparent;
  color:var(--ink-3,#6c6579);cursor:pointer;display:grid;place-items:center;line-height:1;-webkit-tap-highlight-color:transparent;
  transition:color .15s ease,box-shadow .18s ease,transform .14s cubic-bezier(.34,1.35,.64,1)}
.ing-peek svg{width:19px;height:19px;fill:none;stroke:currentColor;stroke-width:1.7;stroke-linecap:round;stroke-linejoin:round;display:block}
.ing-peek:hover{color:var(--ink-1,#221a2e);box-shadow:inset 0 1px 0 rgba(255,255,255,.75),0 1px 0 rgba(40,22,68,.1),0 2px 5px rgba(40,22,68,.12)}
.ing-peek:active{transform:translateY(-50%) scale(.92);box-shadow:inset 0 1px 2px rgba(40,22,68,.18)}
.ing-peek:focus-visible{outline:2px solid var(--accent,#6a3fb5);outline-offset:1px}
.ing-peek[aria-pressed="true"]{color:var(--ink-1,#221a2e)}
body[data-theme="night"] .ing-peek{color:var(--ink-3,#a79bbb)}
body[data-theme="night"] .ing-peek:hover,body[data-theme="night"] .ing-peek[aria-pressed="true"]{color:var(--ink-1,#efe9f6);box-shadow:inset 0 1px 0 rgba(255,255,255,.1),0 1px 0 rgba(0,0,0,.5),0 2px 6px rgba(0,0,0,.4)}
#ingLockDoor .ing-peek{color:var(--ild-soft)}
#ingLockDoor .ing-peek:hover,#ingLockDoor .ing-peek[aria-pressed="true"]{color:var(--ild-ink)}
#ingLockDoor.ild-night .ing-peek:hover{box-shadow:inset 0 1px 0 rgba(255,255,255,.1),0 1px 0 rgba(0,0,0,.5),0 2px 6px rgba(0,0,0,.4)}
body[data-motion="minimal"] .ing-peek{transition:none}body[data-motion="minimal"] .ing-peek:active{transform:translateY(-50%)}
@media (prefers-reduced-motion:reduce){.ing-peek{transition:none}.ing-peek:active{transform:translateY(-50%)}}
</style>
<script>try{(window.__ingParts=window.__ingParts||{})["p351"]="started";}catch(_){}
/* R351 · see the password as it is typed: see the note at the top of its styles. window.IngPeek */
(function r351(){"use strict";
var W=window,D=document;if(W.IngPeek)return;
var EYE='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M2.5 12s3.5-6.5 9.5-6.5S21.5 12 21.5 12s-3.5 6.5-9.5 6.5S2.5 12 2.5 12z"/><circle cx="12" cy="12" r="2.8"/></svg>';
var SHUT='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M2.5 12s3.5-6.5 9.5-6.5S21.5 12 21.5 12s-3.5 6.5-9.5 6.5S2.5 12 2.5 12z"/><circle cx="12" cy="12" r="2.8"/><path d="M4.5 19.5L19.5 4.5"/></svg>';
function paint(inp,key){var shown=inp.type!=="password",l=shown?"Hide the password":"Show the password";
  key.innerHTML=shown?SHUT:EYE;key.title=l;key.setAttribute("aria-label",l);key.setAttribute("aria-pressed",String(shown));}
function show(inp,on){if(!inp)return;if(on){inp.setAttribute("spellcheck","false");inp.setAttribute("autocorrect","off");inp.setAttribute("autocapitalize","off");inp.type="text";}else inp.type="password";
  var k=inp.parentNode&&inp.parentNode.querySelector&&inp.parentNode.querySelector(".ing-peek");if(k)paint(inp,k);}
function deco(inp){if(!inp||inp.getAttribute("data-peek")||!inp.parentNode||(inp.closest&&inp.closest(".ing-peek-wrap")))return;
  inp.setAttribute("data-peek","1");inp.setAttribute("data-secret","1");inp.setAttribute("spellcheck","false");
  var par=inp.parentNode,w=D.createElement("span");w.className="ing-peek-wrap";
  try{var cs=getComputedStyle(inp),pcs=getComputedStyle(par);
    /* in a row of a flex box the wrap takes the field's own place; a narrow inline field keeps its own width */
    if(/flex/.test(pcs.display)&&!/column/.test(pcs.flexDirection)){w.style.flex=cs.flex;w.style.width=inp.style.width||"auto";}
    else if(/^inline/.test(cs.display)&&inp.offsetWidth&&par.clientWidth&&inp.offsetWidth<par.clientWidth*.8){w.classList.add("inl");w.style.width=inp.offsetWidth+"px";}}catch(e){}
  /* moving a field takes its focus away: a field that had it (the sign-in opens ready to type) keeps it, and its caret */
  var had=D.activeElement===inp,s0=null,s1=null;try{s0=inp.selectionStart;s1=inp.selectionEnd;}catch(e){}
  par.insertBefore(w,inp);w.appendChild(inp);
  if(had){try{inp.focus({preventScroll:true});}catch(e){try{inp.focus();}catch(_){}}try{if(s0!=null)inp.setSelectionRange(s0,s1);}catch(e){}}
  var key=D.createElement("button");key.type="button";key.className="ing-peek";
  key.addEventListener("mousedown",function(e){e.preventDefault();});   /* the field keeps the focus */
  key.addEventListener("click",function(e){e.preventDefault();e.stopPropagation();show(inp,inp.type==="password");
    /* the caret back at the end: at once, and again once the field has taken its new kind (the browser sets it to the start then) */
    var n=inp.value.length,at=function(){try{inp.setSelectionRange(n,n);}catch(x){}};try{inp.focus();}catch(x){}at();setTimeout(at,0);try{requestAnimationFrame(at);}catch(x){}
    try{if(W.IngSound)IngSound.play("keys");}catch(x){}});
  paint(inp,key);w.appendChild(key);}
function scan(root){var r=root||D;try{if(r.nodeType===1&&r.matches&&r.matches('input[type="password"]'))deco(r);
  [].forEach.call((r.querySelectorAll?r:D).querySelectorAll('input[type="password"]:not([data-peek])'),deco);}catch(e){}}
/* only what was added is looked at, at once (before the page is painted), so a door's field never shows without its key */
try{new MutationObserver(function(list){for(var i=0;i<list.length;i++){var a=list[i].addedNodes;for(var j=0;j<a.length;j++){var n=a[j];
  if(n.nodeType===1&&(n.tagName==="INPUT"||n.querySelector&&n.querySelector('input[type="password"]')))scan(n);}}}).observe(D.documentElement,{childList:true,subtree:true});}catch(e){}
/* a field sent is a password field again first, so the browser keeps nothing of it among a form's remembered words */
D.addEventListener("submit",function(e){var f=e.target;if(!f||!f.querySelectorAll)return;
  [].forEach.call(f.querySelectorAll("input[data-peek]"),function(inp){if(inp.type!=="password")show(inp,false);});},true);
if(D.readyState==="loading")D.addEventListener("DOMContentLoaded",function(){scan();});else scan();
W.IngPeek={scan:function(){scan();},show:show};
})();
;try{window.__ingParts["p351"]="running";}catch(_){}
</script>
