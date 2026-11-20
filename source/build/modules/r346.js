<style id="r346-css">
/* ============ R346 · THE PROJECT PANEL CLOSES FROM ITS TOP (Ingenium 7.55, 20 November 2026) ============
   Her words (20 November 2026), on the picture of the record in Ingenium's folder: "I approve of your preview but I don't see any way to
   close the Project panel, please make sure that it has a way of being closed or "x" out to go back to Ingenia's main page." Then: "Leave
   the Project panel's Close and Save buttons below and add the scrolling function and scroll bar to the panel but hide the scroll bar from
   view to abide by my rule and keep the panel consistent with the rest of Ingenium." And: "On second thought, please still add the "x"
   button at the top of the panel so I don't always have to scroll all the way down in order to close the Project panel." Then, on its
   picture, where the key floated over the panel's fields once it was scrolled: "It looks like the x button scrolls down on the panel and is
   not placed properly, please fix that and have it placed properly at the top of the page."
   So the Project panel (the base page's openProject) has a top that stays: its title, Project, and the close key on one line, which never
   scrolls; beneath it, the rest of the panel scrolls on its own, its scroll bar out of view, down to its own Cancel and Save at its foot,
   which stay where they were. The key is a raised round key of the app's own kind (its face, its wall and its shadows), lifting under the
   pointer and sinking when pressed, with Ingenium's key sound, never tinted. It does what the panel's Cancel does (closes it, nothing
   saved), so the page beneath, Ingenia with the folder, is there again. Escape and a press outside still close it. Only the Project panel
   is dressed so (found by its name field); every other panel in the same box is left as it is. */
#modalBox.r346-on{display:flex;flex-direction:column;overflow:hidden;padding:0}
#modalBox.r346-on .r346-head{flex:0 0 auto;display:flex;align-items:center;gap:12px;padding:16px 16px 10px 20px;border-bottom:1px solid var(--hairline-soft,var(--hairline))}
#modalBox.r346-on .r346-head h3{margin:0;flex:1 1 auto;min-width:0}
#modalBox.r346-on .r346-body{flex:1 1 auto;min-height:0;overflow-y:auto;overscroll-behavior:contain;padding:12px 20px 18px;scrollbar-width:none;-ms-overflow-style:none}
#modalBox.r346-on .r346-body::-webkit-scrollbar{display:none;width:0;height:0}
#modalBox .r346-x{flex:0 0 auto;width:34px;height:34px;border-radius:50%;display:grid;place-items:center;padding:0;margin:0;
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
function key(){var k=D.createElement("button");k.type="button";k.className="r346-x";k.setAttribute("aria-label","Close the project panel");k.title="Close";
  k.innerHTML='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>';
  k.addEventListener("pointerdown",function(){try{if(W.IngSound&&IngSound.play)IngSound.play("keys");}catch(e){}});
  k.addEventListener("click",function(e){e.preventDefault();e.stopPropagation();close();});return k;}
/* the Project panel (it holds its name field): its title and the key in a top that stays, the rest in a body that scrolls. Any other
   panel drawn in the same box takes the box as it always was. */
function dress(){var box=D.getElementById("modalBox");if(!box)return;
  if(!box.querySelector("#pjName")){box.classList.remove("r346-on");return;}
  if(box.querySelector(".r346-head"))return;
  var head=D.createElement("div");head.className="r346-head";var body=D.createElement("div");body.className="r346-body";
  var h=box.querySelector(":scope > h3");if(h)head.appendChild(h);head.appendChild(key());
  while(box.firstChild)body.appendChild(box.firstChild);
  box.appendChild(head);box.appendChild(body);box.classList.add("r346-on");}
var o=W.openProject;
if(typeof o==="function"&&!o.__r346){W.openProject=function(){var r=o.apply(this,arguments);try{dress();}catch(e){}return r;};W.openProject.__r346=1;}
/* whatever is drawn in the box next: the Project panel is dressed, any other panel undressed */
function watch(){var box=D.getElementById("modalBox");if(!box||box.__r346)return;box.__r346=1;try{new MutationObserver(function(){try{dress();}catch(e){}}).observe(box,{childList:true});}catch(e){}}
watch();if(D.readyState==="loading")D.addEventListener("DOMContentLoaded",watch);
})();
;try{window.__ingParts["p346"]="running";}catch(_){}
</script>
