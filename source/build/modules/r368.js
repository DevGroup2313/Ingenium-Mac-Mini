<script>try{(window.__ingParts=window.__ingParts||{})["p368"]="started";}catch(_){}
/* ============ R368 · INGENIUM FILLS A LARGE SCREEN (Ingenium 7.75, 24 November 2026) ============
   Her words (24 November 2026): "Ingenium's 3D headers drawings and designs look small and odd on the Mac mini's large curved screen. I
   have a 34-inch Dell Desktop screen for the Mac mini, so it looks really tiny and weird on the screen, shrunken like that. I want you to
   fix that and compensate for the larger desk screen of the Mac mini so that Ingenium can properly enjoy the larger screen."
   Measured on 7.74 at 3,440 by 1,440: the page stretches across the whole width at a laptop's sizes; Adamas's 520-pixel stone stands in
   a head 3,110 pixels wide, and every word, key and drawing keeps the size it has on a laptop. A zoom in the page's own styles cannot be
   used (it enlarges what is measured in the window's own units too: a box of 100vw by 100vh measured 5,160 by 2,160 at 1.5, so the panes
   that fill the window would spill past it). The Mac app's window zooms the page as a browser does (desktop/app_zoom_775.py,
   display_zoom): the page is laid out for a narrower window and drawn larger, so everything keeps its proportions.
   - Size on this screen, in Display beside Width: Auto (the default), 100%, 110%, 125% and 150%. Auto keeps 100% on a window up to about
     1,700 pixels wide and grows with a wider one, to 150% at most (about 125% for a window 2,000 pixels wide, 150% for the whole of a
     34-inch screen); it follows the window as it is resized. The choice is kept on this device only, as each screen differs.
   - Where the window cannot zoom (a browser, which has its own zoom; the Windows app for now), the row is not shown. */
(function r368(){
"use strict";
if(window.__r368)return;window.__r368=1;
var W=window,D=document,KEY="ing.size.v1",CHOICES=[["auto","Auto"],["1","100%"],["1.1","110%"],["1.25","125%"],["1.5","150%"]];
var Z=1,CAN=false,T=0;
function api(){try{var a=typeof deskApi==="function"?deskApi():null;return a&&typeof a.display_zoom==="function"?a:null;}catch(e){return null;}}
function pref(){try{var v=localStorage.getItem(KEY)||"auto";return CHOICES.some(function(c){return c[0]===v;})?v:"auto";}catch(e){return "auto";}}
function setPref(v){try{localStorage.setItem(KEY,v);}catch(e){}}
/* the window's own width, whatever the zoom now: the page sees it divided by the zoom */
function auto(){var w=(W.innerWidth||1440)*Z;if(w<1700)return 1;return Math.round(Math.min(1.5,w/1600)*20)/20;}
function target(){var p=pref();return p==="auto"?auto():parseFloat(p)||1;}
function apply(){var a=api();if(!a||!CAN)return;var t=target();if(Math.abs(t-Z)<0.01){paint();return;}
  Promise.resolve(a.display_zoom(t)).then(function(r){if(r&&r.ok){Z=+r.zoom||t;D.documentElement.setAttribute("data-zoom",String(Z));}paint();},function(){});}
function paint(){var row=D.getElementById("dpSize");if(!row)return;var p=pref();
  [].forEach.call(row.querySelectorAll(".seg-btn"),function(b){b.classList.toggle("on",b.getAttribute("data-v")===p);});
  var a=row.querySelector('[data-v="auto"]');if(a)a.textContent=p==="auto"?"Auto ("+Math.round(Z*100)+"%)":"Auto";}
function row(){var p=D.getElementById("displayPanel");if(!p||!CAN||D.getElementById("dpSize"))return;
  var r=D.createElement("div");r.className="dp-row";var lab=D.createElement("div");lab.className="dp-label";lab.textContent="Size";
  lab.title="How large Ingenium is drawn in this window. Auto grows with a wide screen. Kept on this device.";
  var seg=D.createElement("div");seg.className="seg";seg.id="dpSize";
  CHOICES.forEach(function(c){var b=D.createElement("button");b.type="button";b.className="seg-btn";b.setAttribute("data-v",c[0]);b.textContent=c[1];
    b.onclick=function(){setPref(c[0]);apply();paint();};seg.appendChild(b);});
  r.appendChild(lab);r.appendChild(seg);
  var w=D.getElementById("dpWidth"),after=w?w.closest(".dp-row"):null;if(after&&after.parentNode)after.parentNode.insertBefore(r,after.nextSibling);else p.appendChild(r);paint();}
function start(){var a=api();if(!a)return;
  Promise.resolve(a.display_zoom()).then(function(r){if(!r||!r.ok)return;CAN=true;Z=+r.zoom||1;row();apply();
    W.addEventListener("resize",function(){if(pref()!=="auto")return;clearTimeout(T);T=setTimeout(apply,400);});
    try{new MutationObserver(function(){row();}).observe(D.getElementById("displayPanel")||D.body,{childList:true,subtree:true});}catch(e){}},function(){});}
(function wait(n){if(W.__ingReady===true){start();return;}if(n<240)setTimeout(function(){wait(n+1);},250);})(0);
W.IngSize={zoom:function(){return Z;},auto:auto,pref:pref,apply:apply};
})();
;try{window.__ingParts["p368"]="running";}catch(_){}
</script>
