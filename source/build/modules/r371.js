<style id="r371-css">
/* ============ R371 · THE CONVERSATIONS LIST: ITS TWO IMPORT KEYS RAISED (Ingenium 7.76, 24 November 2026) ============
   Her words (24 November 2026): "Please format the "Bring chats from another assistant" and the "Paste a conversation" buttons from
   the Conversations panel to match the rest of the app."
   Read in the code first: the two keys at the foot of the list (r160, .cc-mini) were bare words stretched across the panel, tinted
   purple under the pointer and still otherwise. Now each is a raised key sized to its words, as the app's other keys are, one under the
   other: at rest the app's raised shadow, under the pointer a lift with a spring and a deeper shadow, pressed a small sink; no purple
   shading. By night the night card colours. Minimal motion and reduced motion keep them still. */
#ccSide .cc-mini.cc-import,#ccSide .cc-mini.cc-import-paste{display:flex!important;align-items:center;gap:6px;width:fit-content!important;max-width:100%;text-align:left;
  margin:8px 0 0 2px!important;padding:7px 13px!important;border-radius:999px;border:.5px solid var(--hairline,rgba(34,26,46,.12));
  background:linear-gradient(180deg,var(--card-hi,#fff),var(--card-lo,#f6f3fa))!important;color:var(--ink-2,#4a4358)!important;
  font:600 12.5px/1.25 var(--sans,system-ui)!important;white-space:normal;
  box-shadow:var(--pop,0 0 0 .5px rgba(40,22,68,.14),0 1px 0 rgba(40,22,68,.12),0 3px 8px rgba(40,22,68,.10));
  transition:transform .2s cubic-bezier(.34,1.4,.64,1),box-shadow .2s ease,color .2s ease}
#ccSide .cc-mini.cc-import-paste{margin-top:6px!important}
#ccSide .cc-mini.cc-import:hover,#ccSide .cc-mini.cc-import-paste:hover{transform:translateY(-2px);color:var(--ink-1,#221a2e)!important;
  background:linear-gradient(180deg,var(--card-hi,#fff),var(--card-lo,#f6f3fa))!important;
  box-shadow:var(--pop-hi,0 0 0 .5px rgba(40,22,68,.16),0 2px 0 rgba(40,22,68,.12),0 8px 16px rgba(40,22,68,.14))}
#ccSide .cc-mini.cc-import:active,#ccSide .cc-mini.cc-import-paste:active{transform:translateY(1px) scale(.98);transition-duration:.06s}
#ccSide .cc-mini.cc-import:focus-visible,#ccSide .cc-mini.cc-import-paste:focus-visible{outline:2.5px solid var(--accent,#6a3fb5);outline-offset:2px}
body[data-theme="night"] #ccSide .cc-mini.cc-import,body[data-theme="night"] #ccSide .cc-mini.cc-import-paste{
  background:linear-gradient(180deg,#2a2239,#251e33)!important;color:#d3c9e3!important;border-color:rgba(205,184,240,.14);
  box-shadow:inset 0 1px 0 rgba(255,255,255,.07),inset 0 -2px 0 rgba(0,0,0,.45),0 2px 0 rgba(0,0,0,.75),0 4px 5px rgba(0,0,0,.5)}
body[data-theme="night"] #ccSide .cc-mini.cc-import:hover,body[data-theme="night"] #ccSide .cc-mini.cc-import-paste:hover{color:#f3eefb!important;
  background:linear-gradient(180deg,#2e2540,#282037)!important;
  box-shadow:inset 0 1px 0 rgba(255,255,255,.1),inset 0 -2px 0 rgba(0,0,0,.4),0 3px 0 rgba(0,0,0,.7),0 7px 10px rgba(0,0,0,.5)}
body[data-motion="minimal"] #ccSide .cc-mini.cc-import,body[data-motion="minimal"] #ccSide .cc-mini.cc-import-paste{transition:none;transform:none!important}
@media (prefers-reduced-motion:reduce){#ccSide .cc-mini.cc-import,#ccSide .cc-mini.cc-import-paste{transition:none;transform:none!important}}
</style>
<script>try{(window.__ingParts=window.__ingParts||{})["p371"]="started";}catch(_){}
/* the inline width and margins r160 gives the two keys are taken off, so the rules above hold */
(function r371(){"use strict";if(window.__r371)return;window.__r371=1;
function tidy(){["cc-import","cc-import-paste"].forEach(function(c){var b=document.querySelector("#ccSide .cc-mini."+c);if(b&&b.style.cssText){b.style.cssText="";}});}
try{new MutationObserver(function(){tidy();}).observe(document.body||document.documentElement,{childList:true,subtree:true});}catch(e){}
tidy();})();
;try{window.__ingParts["p371"]="running";}catch(_){}
</script>
