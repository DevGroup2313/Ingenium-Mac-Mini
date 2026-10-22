<script>try{(window.__ingParts=window.__ingParts||{})["p73"]="started";}catch(_){}
/* ============ R152 · WHAT THE ACCESSIBILITY AUDIT FOUND, PUT RIGHT ============
   The owner's words (20 October 2026): "Develop a more comprehensive accessibility audit, including screen reader testing
   with actual assistive technology." The audit (rig/a11y: axe-core's WCAG 2.1 A and AA rules on every page, by day and
   by night, on a desk and on a phone; and Orca, a real screen reader, walking the pages key by key) found these, and
   they are put right here, for every page that has them, now and as pages are drawn again:
   · a divider that the keyboard can move (between Lector's panels, Build's code and preview, Fabrica's panels) told a
     screen reader nothing of where it stood: it now says how much of the room the first panel takes, in per cent;
   · Build's code box had no name, and three switches in Settings (scholarly sources first, peer-reviewed only, pause
     web search during a focus session) were read only as "checkbox": each now says what it is;
   · (6.2) the icons drawn beside the words of a key (the side navigation, the panels' heads) were each a nameless
     "image" in the accessibility tree, 16 to 27 on every page: the key already says what it is, so the icon is now
     hidden from screen readers (aria-hidden), as decoration should be. An icon that carries its own words is left. */
(function(){"use strict";

/* ---------- the switches and boxes with no name ---------- */
function nameOf(el){if(el.getAttribute("aria-label")||el.getAttribute("aria-labelledby"))return true;
  if(el.id){try{if(document.querySelector('label[for="'+CSS.escape(el.id)+'"]'))return true;}catch(e){}}
  var l=el.closest("label");if(l&&String(l.textContent||"").trim())return true;return false;}
function names(root){
  var ce=document.getElementById("codeEditor");if(ce&&!nameOf(ce))ce.setAttribute("aria-label","Your app's code: HTML, CSS and JavaScript in one");
  /* a switch drawn as a track, its words in the block beside it (Settings: .sch-set) */
  [].forEach.call((root||document).querySelectorAll(".eswitch input[type=checkbox]"),function(c){if(nameOf(c))return;
    var row=c.closest(".sch-set")||c.closest("label")&&c.closest("label").parentNode,b=row&&row.querySelector("b");
    var t=b?String(b.textContent||"").trim():"";if(t)c.setAttribute("aria-label",t);});}

/* ---------- the dividers: where each one stands ---------- */
function where(sep){var vert=sep.getAttribute("aria-orientation")!=="horizontal",prev=sep.previousElementSibling,par=sep.parentElement;
  while(prev&&(prev.getAttribute("role")==="separator"||getComputedStyle(prev).display==="none"))prev=prev.previousElementSibling;
  if(!prev||!par)return null;var a=prev.getBoundingClientRect(),p=par.getBoundingClientRect(),whole=vert?p.width:p.height,part=vert?a.width:a.height;
  if(!(whole>0))return null;return Math.max(0,Math.min(100,Math.round(part/whole*100)));}
function seps(){[].forEach.call(document.querySelectorAll('[role="separator"][tabindex]'),function(s){var v=where(s);if(v==null)return;
  if(s.getAttribute("aria-valuenow")!==String(v)){s.setAttribute("aria-valuemin","0");s.setAttribute("aria-valuemax","100");s.setAttribute("aria-valuenow",String(v));
    s.setAttribute("aria-valuetext",v+" per cent for the first panel");}});}
/* ---------- the icons beside the words: decoration, hidden from screen readers ---------- */
function icons(root){[].forEach.call((root||document).querySelectorAll('svg:not([aria-hidden]):not([role="img"]):not([aria-label]):not([aria-labelledby])'),function(g){
  if(g.querySelector("title")||g.closest('[aria-hidden="true"]'))return;g.setAttribute("aria-hidden","true");g.setAttribute("focusable","false");});}
var soon=0;function later(){clearTimeout(soon);soon=setTimeout(function(){try{seps();names();icons();}catch(e){}},120);}
["pointerup","keyup","resize"].forEach(function(t){window.addEventListener(t,later,true);});
document.addEventListener("click",later,true);
try{if(typeof window.go==="function"&&!window.go.__r152){var og=window.go,ng=function(){var r=og.apply(this,arguments);later();return r;};ng.__r152=true;Object.keys(og).forEach(function(k){ng[k]=og[k];});window.go=ng;try{go=ng;}catch(e){}}}catch(e){}
setInterval(function(){if(!document.hidden)later();},2500);
later();
window.IngA11y={names:names,seps:seps,icons:icons};
})();
;try{window.__ingParts["p73"]="running";}catch(_){}
</script>
