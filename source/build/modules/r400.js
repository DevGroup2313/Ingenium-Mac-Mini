<style id="r400-css">
/* ============ R400 · A CLOSED PANEL ALWAYS COMES BACK (Ingenium 7.97, 26 November 2026) ============
   Her words (26 November 2026): "The Adamas page has a lot of gaps and is pretty broken, I have no way of bringing the Live Preview panel
   back when I close it, also the Ingenium app was open in it and even the code panel had a split screen and had two different little
   panels side by side that didn't really make a lot of sense to me and I still don't know how to bring back the preview sample and the
   Live preview panel back. I need to be able to do in the app without having to delete the app and install it again to reset it. When I
   close either side of the panels on the Adamas page, I have no way of bringing either one of them back ... I want you to also fix this
   issue anywhere else it might be happening inside of the app".
   The cause, measured on 7.96: Adamas has always had its two keys back, Show preview (beside Save this page) and Show (beside Hide, in
   the preview's bar), but the page's markup hides each with an inline style (style="display:none"), which outweighs the rule meant to
   show it when its panel is away (body[data-buildview="closed"] #showPreview, body[data-builded="hidden"] #showEditor). So Close took
   the preview away for good, and Hide took the code away for good. A search of every element the page hides that way found no other.
   Now:
   - when the preview is closed, Show the preview stands beside Save this page; when the code is hidden, Show the code stands beside the
     preview's other keys; each is raised, lifts under the pointer and sinks when pressed, as every key of hers;
   - closing the preview always gives the code its width back (it never leaves both away);
   - a page opened part by part (a page as large as Ingenium itself opens so: its parts listed on the left, the chosen part on the right)
     says so in one line, and its Close key says what it closes ("Close Ingenium") and is raised; once closed, the sample comes back in
     the code and runs in the preview, so the page is as it was before;
   - and for every page: Display, App, Panels: Bring back every panel. Every panel closed, hidden, folded or floated opens again where it
     belongs (Adamas's code and preview, the Code page's preview for every app, the side bar), and nothing written is changed.
   Minimal motion and reduced motion keep the keys still. */
body[data-buildview="closed"] #showPreview{display:inline-flex!important}
body[data-builded="hidden"] #showEditor{display:inline-flex!important}
#showPreview,#showEditor,#r400Panels,#bdBox .r400-close{position:relative;font-weight:600;color:var(--accent-deep,#4a2a86);
  background:linear-gradient(180deg,var(--card-hi,#fff),var(--card-lo,#f6f2fa));border:0;
  box-shadow:inset 0 -1.5px 0 rgba(40,22,68,.13),0 2px 0 rgba(40,22,68,.22),0 4px 7px rgba(40,22,68,.12);
  transition:transform .3s cubic-bezier(.34,1.35,.64,1),box-shadow .2s}
#showPreview:hover,#showEditor:hover,#r400Panels:hover,#bdBox .r400-close:hover{transform:translateY(-2px);
  box-shadow:inset 0 -1.5px 0 rgba(40,22,68,.13),0 3px 0 rgba(40,22,68,.24),0 8px 13px rgba(40,22,68,.15)}
#showPreview:active,#showEditor:active,#r400Panels:active,#bdBox .r400-close:active{transform:translateY(1px);transition-duration:.06s;
  box-shadow:inset 0 2px 3px rgba(40,22,68,.22),0 0 0 rgba(40,22,68,0)}
body[data-theme="night"] #showPreview,body[data-theme="night"] #showEditor,body[data-theme="night"] #r400Panels,body[data-theme="night"] #bdBox .r400-close{
  color:#e9defc;background:linear-gradient(#2c2440,#251e35);box-shadow:inset 0 1px 0 rgba(255,255,255,.07),inset 0 -2px 0 rgba(0,0,0,.45),0 2px 0 rgba(0,0,0,.7),0 4px 6px rgba(0,0,0,.45)}
#bdBox .r400-say{margin:2px 0 0;font-size:12.5px;line-height:1.45;color:var(--ink-2,#4a4358)}
body[data-motion="minimal"] #showPreview,body[data-motion="minimal"] #showEditor,body[data-motion="minimal"] #r400Panels,body[data-motion="minimal"] #bdBox .r400-close{transition:none!important;transform:none!important}
@media (prefers-reduced-motion:reduce){#showPreview,#showEditor,#r400Panels,#bdBox .r400-close{transition:none!important;transform:none!important}}
</style>
<script>try{(window.__ingParts=window.__ingParts||{})["p400"]="started";}catch(_){}
/* R400 · a closed panel always comes back: see the note at the top of its styles. window.IngPanels */
(function r400(){
"use strict";
if(window.IngPanels)return;
var W=window,D=document;
function $(i){return D.getElementById(i);}
function toast(m){try{if(typeof W.ingToast==="function")W.ingToast(m);else if(typeof W.toast==="function")W.toast(m);}catch(e){}}
function words(){var s=$("showPreview"),e=$("showEditor");
  if(s&&s.textContent!=="Show the preview"){s.textContent="Show the preview";s.title="Open the preview again beside your code";}
  if(e&&e.textContent!=="Show the code"){e.textContent="Show the code";e.title="Show the code again beside the preview";}}
/* Adamas: closing the preview gives the code its width back, so the two are never both away */
function wireAdamas(){var c=$("closePreview");if(!c||c.__r400)return;c.__r400=1;
  c.addEventListener("click",function(){D.body.removeAttribute("data-builded");},true);}
/* a page opened part by part: one line that says so, and a Close key that says what it closes */
function large(){var box=$("bdBox"),g=$("buildGrid");if(!box||!g||!g.classList.contains("bd-large"))return;
  var t=null;try{t=W.IngBuild&&W.IngBuild.parts&&W.IngBuild.parts();}catch(e){}
  var name=(box.querySelector(".bd-head b")||{}).textContent||"this page";
  [].forEach.call(box.querySelectorAll("button"),function(b){if(/^Close( it|\b)/.test(b.textContent.trim())&&!b.classList.contains("r400-close")){b.classList.add("r400-close");}
    if(b.classList.contains("r400-close")){var want="Close "+name;if(b.textContent!==want){b.textContent=want;b.title="Close "+name+" and bring back your own page and its preview";}}});
  var head=box.querySelector(".bd-head");if(head&&!box.querySelector(".r400-say")){var p=D.createElement("p");p.className="r400-say";
    p.textContent="A page this large opens part by part: its parts are listed on the left, and the part you choose is written on the right. Run the whole app shows it in the preview; Close "+name+" brings back your own page.";
    head.parentNode.insertBefore(p,head.nextSibling);}
  else{var s=box.querySelector(".r400-say");if(s&&s.textContent.indexOf("Close "+name+" ")<0)s.textContent=s.textContent.replace(/Close .* brings back/,"Close "+name+" brings back");}
  return t;}
/* once a large page is closed and the code is left empty, the sample comes back and runs */
function watchLarge(){var g=$("buildGrid");if(!g||g.__r400)return;g.__r400=1;var was=g.classList.contains("bd-large");
  try{new MutationObserver(function(){var now=g.classList.contains("bd-large");
    if(now)large();
    if(was&&!now){var ed=$("codeEditor");if(ed&&!ed.value.trim()){var s=$("sampleBtn");if(s)try{s.click();}catch(e){}}
      try{if(typeof W.setBuildView==="function")W.setBuildView("dock");}catch(e){}D.body.removeAttribute("data-builded");}
    was=now;}).observe(g,{attributes:true,attributeFilter:["class"]});}catch(e){}
  var box=$("bdBox");if(box)try{new MutationObserver(function(){large();}).observe(box,{childList:true,subtree:true});}catch(e){}
  large();}
/* Display, App, Panels: every panel back, on every page */
function restore(){var n=0;
  try{if(typeof W.setBuildView==="function"){W.setBuildView("dock");n++;}else D.body.removeAttribute("data-buildview");}catch(e){}
  D.body.removeAttribute("data-builded");
  if(D.body.getAttribute("data-buildfold")==="1"){D.body.setAttribute("data-buildfold","0");var f=$("foldPreview");if(f){f.setAttribute("aria-pressed","false");f.textContent="Fold";}}
  var g=$("buildGrid");if(g)g.style.removeProperty("--room-w");
  try{if(typeof W.ccState==="function"){var cs=W.ccState();if(cs&&cs.pvOff){cs.pvOff={};try{if(typeof W.keep==="function")W.keep();else if(typeof W.saveState==="function")W.saveState();}catch(e){}}
    var pr=typeof W.ccProj==="function"?W.ccProj():null;if(pr&&typeof W.ccShowPreview==="function"){W.ccShowPreview(pr);}}}catch(e){}
  try{if(W.state&&W.state.navCollapsed){W.state.navCollapsed=false;try{W.saveState();}catch(e){}}D.body.classList.remove("nav-collapsed");}catch(e){}
  words();toast("Every panel is back where it belongs. Nothing you wrote has changed.");return {ok:true};}
function displayRow(){var dp=$("displayPanel");if(!dp||$("r400Panels"))return;var ref=dp.querySelector(".dp-refresh");if(!ref)return;
  var row=D.createElement("div");row.className="dp-row r400-row";
  var l=D.createElement("div");l.className="dp-label";l.textContent="Panels";
  var seg=D.createElement("div");seg.className="seg";var b=D.createElement("button");b.type="button";b.className="seg-btn";b.id="r400Panels";
  b.textContent="Bring back every panel";b.title="Open again every panel you closed, hid, folded or floated, on every page";b.addEventListener("click",restore);seg.appendChild(b);
  var note=D.createElement("div");note.className="dp-note";note.textContent="Any panel you closed or hid opens again, on every page. Nothing you wrote changes.";
  row.appendChild(l);row.appendChild(seg);row.appendChild(note);ref.parentNode.insertBefore(row,ref.nextSibling);}
function start(){words();wireAdamas();watchLarge();displayRow();}
if(D.readyState==="loading")D.addEventListener("DOMContentLoaded",start);else start();
setTimeout(start,1500);
W.IngPanels={restore:restore,large:large};
try{window.__ingParts["p400"]="running";}catch(_){}
})();
</script>
