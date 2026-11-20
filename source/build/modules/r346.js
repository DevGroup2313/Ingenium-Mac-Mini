<style id="r346-css">
/* ============ R346 · THE PROJECT PANEL CLOSES FROM ITS TOP (Ingenium 7.55, 20 November 2026) ============
   Her words (20 November 2026), on the picture of the record in Ingenium's folder: "I approve of your preview but I don't see any way to
   close the Project panel, please make sure that it has a way of being closed or "x" out to go back to Ingenia's main page." Then: "Leave
   the Project panel's Close and Save buttons below and add the scrolling function and scroll bar to the panel but hide the scroll bar from
   view to abide by my rule and keep the panel consistent with the rest of Ingenium." And: "On second thought, please still add the "x"
   button at the top of the panel so I don't always have to scroll all the way down in order to close the Project panel."
   The Project panel (the base page's openProject, opened from a folder's Its files and instructions) keeps its own Cancel and Save at its
   foot, below its files, and scrolls to them with its scroll bar out of view, as every panel of Ingenium; none of that changes. It gets a
   close key at its top-right corner, which stays there while the panel scrolls: a raised round key of the app's own kind (its face, its
   wall and its shadows), lifting under the pointer and sinking when pressed, with Ingenium's key sound, never tinted. It does what the
   panel's own Cancel does (closes it, nothing saved), so the page beneath, Ingenia with the folder, is there again. Escape still closes it. */
#modalBox .r346-x-row{position:sticky;top:6px;height:0;z-index:3;display:flex;justify-content:flex-end;pointer-events:none}
#modalBox .r346-x{pointer-events:auto;margin:0 -8px 0 0;width:34px;height:34px;flex:0 0 auto;border-radius:50%;display:grid;place-items:center;padding:0;
  border:1px solid var(--hairline);background:linear-gradient(180deg,var(--card-hi),var(--card-lo));box-shadow:var(--pop);color:var(--ink-2);cursor:pointer;
  transition:transform .3s var(--spring),box-shadow .2s ease,color .2s ease}
#modalBox .r346-x:hover{transform:translateY(-2px);box-shadow:var(--pop-hi);color:var(--ink-1)}
#modalBox .r346-x:active{transform:translateY(1px);box-shadow:var(--pop)}
#modalBox .r346-x:focus-visible{outline:3px solid var(--accent);outline-offset:2px}
#modalBox .r346-x svg{width:15px;height:15px;fill:none;stroke:currentColor;stroke-width:2.2;stroke-linecap:round}
body[data-motion="minimal"] #modalBox .r346-x{transition:none}
body[data-motion="minimal"] #modalBox .r346-x:hover,body[data-motion="minimal"] #modalBox .r346-x:active{transform:none}
@media (prefers-reduced-motion:reduce){#modalBox .r346-x{transition:none}#modalBox .r346-x:hover,#modalBox .r346-x:active{transform:none}}
</style>
<script>try{(window.__ingParts=window.__ingParts||{})["p346"]="started";}catch(_){}
(function r346(){"use strict";
var W=window,D=document;if(W.__r346)return;W.__r346=1;
function close(){try{if(typeof W.closeModal==="function"){W.closeModal();return;}}catch(e){}var c=D.getElementById("pjCancel");if(c)c.click();}
/* the panel is the Project panel when it holds its name field; only then is the key put in */
function dress(){var box=D.getElementById("modalBox");if(!box||!box.querySelector("#pjName")||box.querySelector(".r346-x"))return;
  var row=D.createElement("div");row.className="r346-x-row";var k=D.createElement("button");k.type="button";k.className="r346-x";
  k.setAttribute("aria-label","Close the project panel");k.title="Close";
  k.innerHTML='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>';
  k.addEventListener("pointerdown",function(){try{if(W.IngSound&&IngSound.play)IngSound.play("keys");}catch(e){}});
  k.addEventListener("click",function(e){e.preventDefault();e.stopPropagation();close();});
  row.appendChild(k);box.insertBefore(row,box.firstChild);}
var o=W.openProject;
if(typeof o==="function"&&!o.__r346){W.openProject=function(){var r=o.apply(this,arguments);try{dress();}catch(e){}return r;};W.openProject.__r346=1;}
/* and whatever opens it another way: the panel's box, watched for its name field */
function watch(){var box=D.getElementById("modalBox");if(!box||box.__r346)return;box.__r346=1;try{new MutationObserver(function(){try{dress();}catch(e){}}).observe(box,{childList:true});}catch(e){}}
watch();if(D.readyState==="loading")D.addEventListener("DOMContentLoaded",watch);
})();
;try{window.__ingParts["p346"]="running";}catch(_){}
</script>
