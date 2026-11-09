<style id="r228-css">
/* ============ R228 · THE PREVIEW'S OWN KEYS, AND COPY INSIDE THE PRESS (Ingenium 6.21, 5 November 2026) ============
   Her words (4 November 2026): "Please redesign the Copy/Open/Download buttons that is at the bottom of the Build's page live
   interactive Preview Screen, I think it looks slightly off compared to the rest of the page." They were outlined purple pills in a
   pale tray, alone of their kind on the page. Now they are the page's own raised keys (as Save this page and Package beside them),
   each with a small line symbol, in Build's preview and in Code's. Their ids, titles and handlers are unchanged.
   And Copy, there and wherever csCopyText copies, first copies inside the press itself, the way Command+C and Ctrl+C do (her words:
   "no matter what I tried it would not work properly, I had to use the keyboard's shortcuts"); the app's bridge and the browser's
   clipboard stay as the second and third ways. */
.stage-foot .cluster.r228,body[data-theme="night"] .stage-foot .cluster.r228{background:none;border:0;box-shadow:none;padding:2px 0 0;gap:8px;border-radius:0}
.stage-foot .cluster.r228 .btn{display:inline-flex;align-items:center;gap:6px;white-space:nowrap}
.stage-foot .cluster.r228 .btn svg{width:14px;height:14px;flex:0 0 auto;fill:none;stroke:currentColor;stroke-width:1.7;stroke-linecap:round;stroke-linejoin:round;opacity:.82}
</style>
<script>try{(window.__ingParts=window.__ingParts||{})["p228"]="started";}catch(_){}
(function r228(){"use strict";
var W=window,D=document;
var ICON={copy:'<rect x="5.5" y="5.5" width="8" height="8" rx="1.6"/><path d="M10.5 3.2H4.2A1.7 1.7 0 0 0 2.5 4.9v6.3"/>',
  open:'<path d="M9 3h4v4"/><path d="M13 3 7.5 8.5"/><path d="M11.5 9.5v2.8a1.2 1.2 0 0 1-1.2 1.2H3.7a1.2 1.2 0 0 1-1.2-1.2V5.7a1.2 1.2 0 0 1 1.2-1.2h2.8"/>',
  dl:'<path d="M8 2.8v7.4"/><path d="M4.9 7.3 8 10.4l3.1-3.1"/><path d="M3 12.8h10"/>'};
function kind(b){var id=b.id||"";return /copy/i.test(id)?"copy":/open/i.test(id)?"open":"dl";}
function icon(b){if(b.querySelector("svg.r228i"))return;var s=D.createElementNS("http://www.w3.org/2000/svg","svg");s.setAttribute("class","r228i");
  s.setAttribute("viewBox","0 0 16 16");s.setAttribute("aria-hidden","true");s.setAttribute("focusable","false");s.innerHTML=ICON[kind(b)];b.insertBefore(s,b.firstChild);}
function dress(){
  [].forEach.call(D.querySelectorAll(".stage-foot .cluster"),function(c){if(c.classList.contains("r228"))return;c.classList.add("r228");
    [].forEach.call(c.querySelectorAll("button.cl"),function(b){b.classList.remove("cl");b.classList.add("btn","small");icon(b);
      /* a key whose words are swapped for a moment ("Copied") gets its symbol back */
      try{new MutationObserver(function(){if(!b.querySelector("svg.r228i"))icon(b);}).observe(b,{childList:true});}catch(e){}});});}

/* copy inside the press: a hidden field holds the words, the web view's own copy takes them; focus and selection go back */
function pressCopy(t){t=String(t==null?"":t);if(!t||t.length>8e6)return false;
  var ok=false,ae=D.activeElement,sl=null,rg=null,ss=null,se=null;
  try{sl=W.getSelection();if(sl&&sl.rangeCount)rg=sl.getRangeAt(0).cloneRange();}catch(e){}
  try{if(ae&&(ae.tagName==="TEXTAREA"||ae.tagName==="INPUT")&&typeof ae.selectionStart==="number"){ss=ae.selectionStart;se=ae.selectionEnd;}}catch(e){}
  var ta=D.createElement("textarea");ta.value=t;ta.setAttribute("readonly","");ta.setAttribute("aria-hidden","true");ta.tabIndex=-1;
  ta.style.cssText="position:fixed;left:-9999px;top:0;width:2px;height:2px;opacity:0;pointer-events:none";
  try{D.body.appendChild(ta);ta.focus();ta.select();try{ta.setSelectionRange(0,t.length);}catch(e){}ok=D.execCommand("copy");}catch(e){ok=false;}
  try{ta.remove();}catch(e){}
  try{if(ae&&ae.focus&&ae!==D.body)ae.focus({preventScroll:true});if(ss!=null)ae.setSelectionRange(ss,se);else if(rg&&sl){sl.removeAllRanges();sl.addRange(rg);}}catch(e){}
  return !!ok;}
function said(btn){if(!btn)return;var lab=null;[].forEach.call(btn.childNodes,function(n){if(n.nodeType===3&&n.nodeValue.trim())lab=n;});
  if(lab){var o=lab.nodeValue;lab.nodeValue="Copied";setTimeout(function(){lab.nodeValue=o;},1400);}else{try{(W.ingToast||function(){})("Copied.");}catch(e){}}}
function wrapCopy(){var o=W.csCopyText;if(typeof o!=="function"||o.__r228)return;
  var n=function(t,btn){if(pressCopy(t)){try{W.__ingLastCopy={how:"press",n:String(t).length};}catch(e){}said(btn);return;}return o.apply(this,arguments);};
  n.__r228=true;W.csCopyText=n;}
function buildCopy(){var b=D.getElementById("copyPreview");if(!b||b.__r228)return;b.__r228=true;var oc=b.onclick;
  b.onclick=function(e){var ed=D.getElementById("codeEditor"),code=(ed&&ed.value)||"";
    if(pressCopy(code)){try{W.__ingLastCopy={how:"press",n:code.length};}catch(x){}said(b);return;}return oc&&oc.call(this,e);};}
function all(){dress();wrapCopy();buildCopy();}
if(D.readyState==="loading")D.addEventListener("DOMContentLoaded",all);else all();
W.IngPreviewKeys={dress:dress,pressCopy:pressCopy};
})();
;try{window.__ingParts["p228"]="running";}catch(_){}
</script>
