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
     has its Close key in Adamas's main row of keys, beside Open an app, naming what it closes ("Close Ingenium"), raised, with what the
     two panels are in its tooltip; once closed, the sample comes back in the code and runs in the preview, so the page is as it was
     before. (7.97 put that key and a line of explanation inside the narrow panel; her words, 26 November 2026: "This is too clusttered.
     Why squeeze the button there??" From 7.98 the panel is as it was, and the key stands in the main row.)
   - and on the page itself, in Adamas's own row of keys beside Save this page: Bring back the panels, standing there whenever a panel is
     closed, hidden, folded or floated; it opens them all again where they belong, and nothing written is changed. (7.97 put it in the
     Display panel; her words, 26 November 2026: "I don't want the "bring back every panel" button for the Adamas page to be hidden inside
     of the Display panel. Why would you even put it there? It makes no sense!" From 7.98 it is on Adamas, and Display no longer has it.)
   Minimal motion and reduced motion keep the keys still. */
body[data-buildview="closed"] #showPreview{display:inline-flex!important}
body[data-builded="hidden"] #showEditor{display:inline-flex!important}
#r400Back{display:none}
body[data-buildview="closed"] #r400Back,body[data-buildview="float"] #r400Back,body[data-buildview="full"] #r400Back,body[data-builded="hidden"] #r400Back,body[data-buildfold="1"] #r400Back{display:inline-flex!important}
#showPreview,#showEditor,#r400Panels,#r400Back,#r400Close{position:relative;font-weight:600;color:var(--accent-deep,#4a2a86);
  background:linear-gradient(180deg,var(--card-hi,#fff),var(--card-lo,#f6f2fa));border:0;
  box-shadow:inset 0 -1.5px 0 rgba(40,22,68,.13),0 2px 0 rgba(40,22,68,.22),0 4px 7px rgba(40,22,68,.12);
  transition:transform .3s cubic-bezier(.34,1.35,.64,1),box-shadow .2s}
#showPreview:hover,#showEditor:hover,#r400Panels:hover,#r400Back:hover,#r400Close:hover{transform:translateY(-2px);
  box-shadow:inset 0 -1.5px 0 rgba(40,22,68,.13),0 3px 0 rgba(40,22,68,.24),0 8px 13px rgba(40,22,68,.15)}
#showPreview:active,#showEditor:active,#r400Panels:active,#r400Back:active,#r400Close:active{transform:translateY(1px);transition-duration:.06s;
  box-shadow:inset 0 2px 3px rgba(40,22,68,.22),0 0 0 rgba(40,22,68,0)}
body[data-theme="night"] #showPreview,body[data-theme="night"] #showEditor,body[data-theme="night"] #r400Panels,body[data-theme="night"] #r400Back,body[data-theme="night"] #r400Close{
  color:#e9defc;background:linear-gradient(#2c2440,#251e35);box-shadow:inset 0 1px 0 rgba(255,255,255,.07),inset 0 -2px 0 rgba(0,0,0,.45),0 2px 0 rgba(0,0,0,.7),0 4px 6px rgba(0,0,0,.45)}
#r400Close{display:none}
body[data-bdlarge="1"] #r400Close{display:inline-flex}
#bdBox .r400-close{display:none!important}
body[data-motion="minimal"] #showPreview,body[data-motion="minimal"] #showEditor,body[data-motion="minimal"] #r400Panels,body[data-motion="minimal"] #r400Back,body[data-motion="minimal"] #r400Close{transition:none!important;transform:none!important}
@media (prefers-reduced-motion:reduce){#showPreview,#showEditor,#r400Panels,#r400Back,#r400Close{transition:none!important;transform:none!important}}
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
function large(){var box=$("bdBox"),g=$("buildGrid"),on=!!(box&&g&&g.classList.contains("bd-large"));
  if(on)D.body.setAttribute("data-bdlarge","1");else D.body.removeAttribute("data-bdlarge");
  if(!on)return null;
  var name=(box.querySelector(".bd-head b")||{}).textContent||"this page";
  /* the panel's own Close key stays (hidden): the key in Adamas's main row presses it, so its question about changes is kept */
  var inner=null;[].forEach.call(box.querySelectorAll("button"),function(b){if(/^Close( it|\b)/.test(b.textContent.trim())||b.classList.contains("r400-close")){b.classList.add("r400-close");inner=b;}});
  var k=$("r400Close");if(!k){var open=$("bdOpenBtn")||$("sampleBtn");if(!open||!open.parentNode)return null;
    k=D.createElement("button");k.type="button";k.className="btn small";k.id="r400Close";
    k.addEventListener("click",function(){var b=null;[].forEach.call(($("bdBox")||D).querySelectorAll("button.r400-close"),function(x){b=x;});if(b)b.click();});
    open.parentNode.insertBefore(k,open.nextSibling);}
  var want="Close "+name;if(k.textContent!==want)k.textContent=want;
  k.title="A page this large opens part by part: its parts on the left, the part you choose on the right. Close "+name+" brings back your own page and its preview.";
  return inner;}
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
  words();toast("Your code and its preview are back. Nothing you wrote has changed.");return {ok:true};}
function backKey(){if($("r400Back"))return;var sp=$("showPreview");if(!sp||!sp.parentNode)return;
  var b=D.createElement("button");b.type="button";b.className="btn small";b.id="r400Back";b.textContent="Bring back the panels";
  b.title="Open your code and its preview again, docked side by side";b.addEventListener("click",restore);sp.parentNode.insertBefore(b,sp);}
function start(){words();wireAdamas();watchLarge();backKey();}
if(D.readyState==="loading")D.addEventListener("DOMContentLoaded",start);else start();
setTimeout(start,1500);
W.IngPanels={restore:restore,large:large};
try{window.__ingParts["p400"]="running";}catch(_){}
})();
</script>
