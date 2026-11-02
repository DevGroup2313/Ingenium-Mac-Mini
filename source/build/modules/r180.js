<script>try{(window.__ingParts=window.__ingParts||{})["p101"]="started";}catch(_){}
/* ============ R180 · WHAT INGENIUM SAYS ABOUT ITSELF, MADE TRUE (Ingenium 6.7, 25 October 2026) ============
   The claims audit of 25 October 2026 checked every sentence Ingenium says about itself against the code. Most of the
   corrections are in the words where they stand (build_page.py's 6.7 claims edits and the modules). This part holds the one
   that needs a moment of its own: Dictate.
   Chat's Dictate key uses the browser's own speech service (window.SpeechRecognition). In Chrome and Edge that service sends
   the sound to Google or Microsoft to be written down, and in Safari it may go to Apple. The key's own words now say so; and
   the first time the key is pressed on this device, Ingenium says so plainly before anything is heard, with a choice. After
   "Use Dictate" the key works as before, and the note does not come back. */
(function r180Claims(){
"use strict";
if(window.__ingR180)return;window.__ingR180=true;
var SAID="Dictate uses your browser's own speech service to write down what you say. In Chrome, Edge and Safari the sound may be sent to Google, Microsoft or Apple to do this. Type instead when your words must stay on this device.";
function told(){try{return !!(state.dictateToldAt);}catch(e){return false;}}
function ask(mb){var box=null;
  try{box=modalOpen('<h3>Before you dictate</h3><p class="small" id="r180Said"></p><div style="display:flex;gap:8px;justify-content:flex-end;flex-wrap:wrap;margin-top:14px"><button class="btn" type="button" id="r180Not">Not now</button><button class="btn primary" type="button" id="r180Use">Use Dictate</button></div>');}catch(e){box=null;}
  if(!box){try{if(window.confirm(SAID+"\n\nUse Dictate?")){state.dictateToldAt=Date.now();try{saveState();}catch(_){}mb.click();}}catch(e){}return;}
  box.querySelector("#r180Said").textContent=SAID;
  box.querySelector("#r180Not").onclick=function(){try{closeModal();}catch(e){}try{mb.focus();}catch(e){}};
  box.querySelector("#r180Use").onclick=function(){state.dictateToldAt=Date.now();try{saveState();}catch(e){}try{closeModal();}catch(e){}try{mb.focus();}catch(e){}mb.click();};
  try{box.querySelector("#r180Use").focus();}catch(e){}}
/* the first press is held here, before the key's own listener hears it */
document.addEventListener("click",function(e){var t=e.target&&e.target.closest?e.target.closest("#chatMicBtn"):null;if(!t||told())return;
  if(t.classList.contains("rec"))return;e.preventDefault();e.stopPropagation();ask(t);},true);
window.IngClaims={dictateNote:SAID,dictateTold:told};
})();
;try{window.__ingParts["p101"]="running";}catch(_){}
</script>
