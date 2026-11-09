<script>try{(window.__ingParts=window.__ingParts||{})["p231"]="started";}catch(_){}
/* ============ R231 · THE PUBLIC EDITIONS' OWN PAGES (Ingenium 6.27, 5 November 2026; the gift and demo editions only) ============
   Her words (5 November 2026): "The Ingenium edition that will be made available to the public and participants and even friends and
   family will only have the Home, Chat, Code, Folders, Focus, Models, Blend, Build, No apps, and the Guide and Settings page without the
   Author Studio and its functions."
   build/editions.py leaves this module out of the master and full editions, leaves the five apps and their modules out of these, and
   takes their words out of the page (_public). What is made while the page runs is taken away here:
   - Fabrica's key and page (modules/r112.js makes them; its code stays, as Build and the chat call it), and any key or page of the five
     apps, now or made later; their routes lead Home;
   - the tour's Fabrica chapter and its step on the five apps; the chapters' lines that name them; the Guide's tour card painted again;
   - Help's lines for keys that are not here. */
(function r231(){"use strict";
if(window.__r231)return;window.__r231=1;
var W=window,D=document;
function has(p){try{return typeof ING_HAS==="function"?ING_HAS(p):true;}catch(e){return true;}}
if(has("fabrica")&&has("desk"))return;
var GONE=[];if(!has("fabrica"))GONE.push("fabrica");if(!has("desk"))GONE.push("tabula","abacus","slides","scriba","fontes");
var GONE_RX=new RegExp("\\b("+(has("fabrica")?"":"Fabrica|")+(has("desk")?"":"Tabula|Abacus|Imago")+")\\b");
try{D.documentElement.setAttribute("data-edition-public","1");}catch(e){}

/* ---------- keys, pages and routes ---------- */
function sweep(){GONE.forEach(function(p){[].forEach.call(D.querySelectorAll('.nav-btn[data-page="'+p+'"]'),function(b){b.remove();});
    var s=D.getElementById("page-"+p);if(s&&!s.classList.contains("active"))s.remove();});
  try{if(W.PAGES)for(var i=PAGES.length-1;i>=0;i--)if(GONE.indexOf(PAGES[i])>=0)PAGES.splice(i,1);}catch(e){}
  /* a group label of the side bar left with no key under it */
  [].forEach.call(D.querySelectorAll(".grp-label"),function(g){var n=g.nextElementSibling;if(!n||n.classList.contains("grp-label")){if(/apps/i.test(g.textContent||""))g.remove();}});}
function wrapGo(){var og=W.go;if(typeof og!=="function"||og.__r231)return;
  var ng=function(p){if(GONE.indexOf(p)>=0)p="home";return og.call(this,p);};
  try{Object.keys(og).forEach(function(k){ng[k]=og[k];});}catch(e){}ng.__r231=true;W.go=go=ng;}

/* ---------- the tour and its chapters' lines ---------- */
function rings(s){var r=s&&s.ring;return (Array.isArray(r)?r:[r]).filter(Boolean).join(",");}
function goneStep(s){if(!s)return false;if(!has("fabrica")&&s.chap==="Fabrica")return true;
  var r=rings(s);if(GONE.some(function(p){return r.indexOf('data-page="'+p+'"')>=0||r.indexOf("#page-"+p)>=0;}))return true;
  if(!has("desk")&&/^\W*The apps\b/.test(String(s.t||"").trim()))return true;
  return false;}
var TOURN=-1;
function tour(){try{if(!Array.isArray(W.ING_TOUR))return;var n0=ING_TOUR.length;for(var i=ING_TOUR.length-1;i>=0;i--)if(goneStep(ING_TOUR[i]))ING_TOUR.splice(i,1);
    var T=W.ING_TOUR_TEASERS;if(T&&typeof T==="object"){if(!has("fabrica"))delete T.Fabrica;
      Object.keys(T).forEach(function(k){var v=String(T[k]||"");var w=v.replace(/,? and (?:Carpe Diem's |the )?five apps/g,"").replace(/,? Carpe Diem's five apps/g,"").replace(/\bBuild, Blend\b(?! and)/,"Build and Blend");if(w!==v)T[k]=w;});}
    if(ING_TOUR.length!==n0||ING_TOUR.length!==TOURN){TOURN=ING_TOUR.length;try{if(D.getElementById("guideTour")&&typeof W.tourPaintEntry==="function")W.tourPaintEntry();}catch(e){}}}catch(e){}}

/* ---------- start, and later (modules that come after add keys, steps and lines) ---------- */
function all(){sweep();wrapGo();tour();}
all();
if(D.readyState==="loading")D.addEventListener("DOMContentLoaded",all);
(function later(){var n=0;(function wait(){all();if(W.__ingReady===true){setTimeout(all,600);setTimeout(all,2500);return;}if(++n<400)setTimeout(wait,500);})();})();
try{var nav=D.querySelector("nav")||D.querySelector(".nav")||D.body;var T=0;new MutationObserver(function(){if(T)return;T=setTimeout(function(){T=0;sweep();},0);}).observe(nav,{childList:true,subtree:true});}catch(e){}
/* the tour is opened from many places: each time, its steps are this edition's */
(function wrapTour(){["tourStart","tourRender","tourPaintEntry"].forEach(function(n){var f=W[n];if(typeof f!=="function"||f.__r231)return;
  var g=function(){if(n!=="tourPaintEntry")tour();return f.apply(this,arguments);};g.__r231=true;try{Object.keys(f).forEach(function(k){g[k]=f[k];});}catch(e){}W[n]=g;
  try{if(n==="tourStart")tourStart=g;else if(n==="tourRender")tourRender=g;}catch(e){}});})();
W.IngPublic={gone:GONE.slice(),sweep:sweep,tour:tour,words:GONE_RX};
})();
;try{window.__ingParts["p231"]="running";}catch(_){}
</script>
