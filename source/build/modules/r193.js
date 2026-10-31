<style id="r193-css">
/* ============ R193 · THE APPS IN THE SIDE RAIL AS CUT STONES, WITH THEIR COLOURS (Ingenium 6.9, 30 October 2026) ============
   The owner's words (30 October 2026): "I also want the apps buttons to match the Forge and have the little coloured circles
   that show their colours and I also want them reflected on the desktab circle."
   The Forge's rail shows its apps as Carpe Diem's cut stones (Tabula's dark stone, Abacus's green, Imago's red, Fontes's
   cream, Scriba's blue), and when the group is folded away its Apps key wears a row of small circles, one in each stone's
   colour. Ingenium's rail showed the same apps as plain line icons. Now its Apps group shows the stones Home already wears
   (jewels/jewels.css, r147), lettered as the Forge letters them, 26px high and as wide as the name; its APPS key wears the
   same row of circles when the group is folded (r137); and the circle on each Desk tab (r123) is the same colour as the
   stone, so an open app is known by its colour everywhere. */
.dock .nav-btn.ing-stone{position:relative;isolation:isolate;overflow:hidden;display:inline-flex;align-items:center;justify-content:center;
  width:auto;max-width:none;align-self:flex-start;height:26px;min-height:26px;padding:0 14px;margin:3px 0 3px 2px;box-sizing:border-box;
  border:1px solid #bd9a52;border-radius:8px;background-color:#27272a;background-size:100% 100%;background-repeat:no-repeat;
  font:600 12px/normal Georgia,"Iowan Old Style","Times New Roman",serif;letter-spacing:.02em;white-space:nowrap;color:#fff;
  text-shadow:0 1px 0 rgba(0,0,0,.55),0 -1px 0 rgba(255,255,255,.14),0 2px 3px rgba(0,0,0,.4);
  box-shadow:inset 0 1px 0 rgba(255,255,255,.24),0 1px 0 rgba(12,18,26,.55),0 3px 4px rgba(12,18,26,.4),0 7px 11px rgba(12,18,26,.28);
  transition:transform .09s cubic-bezier(.34,1.3,.64,1),box-shadow .09s ease,filter .12s ease}
.dock .nav-btn.ing-stone svg{display:none}
/* Scriba and Fontes carry their own mark before the name, as the Forge's stones do (its own drawings and colours) */
.dock .nav-btn.ing-stone svg.ing-stone-sym{display:inline-block;width:12px;height:12px;flex:none;margin:0 5px 0 -2px}
.dock .nav-btn.ing-stone[data-page="scriba"] svg.ing-stone-sym{width:13px;height:13px}
.dock .nav-btn.ing-stone[data-page="fontes"]{color:#0f4b66;text-shadow:0 1px 0 rgba(255,255,255,.55),0 1px 1px rgba(120,90,40,.2)}
.dock .nav-btn.ing-stone:hover{transform:translateY(-2px);filter:brightness(1.06);color:#fff;background-color:#27272a;
  box-shadow:inset 0 1px 0 rgba(255,255,255,.2),0 2px 3px rgba(12,18,26,.4),0 6px 12px rgba(12,18,26,.28),0 12px 22px rgba(12,18,26,.18)}
.dock .nav-btn.ing-stone[data-page="fontes"]:hover{color:#0f4b66}
.dock .nav-btn.ing-stone:active{transform:translateY(1px);transition-duration:.04s;
  box-shadow:inset 0 0 0 1px rgba(198,166,104,.5),inset 0 3px 8px rgba(0,0,0,.55),inset 0 -1px 0 rgba(255,255,255,.12),0 1px 1px rgba(12,18,26,.4)}
/* the app in hand: the stone keeps its colour and wears a gilt ring and Ingenium's ring outside it */
.dock .nav-btn.ing-stone.active,.dock .nav-btn.ing-stone.active:hover{font-weight:600;border-color:#e8c785;background-color:#27272a;
  box-shadow:inset 0 1px 0 rgba(255,255,255,.3),0 0 0 2px rgba(232,199,133,.85),0 0 0 4px rgba(106,63,181,.55),0 3px 4px rgba(12,18,26,.4),0 7px 11px rgba(12,18,26,.28)}
.dock .nav-btn.ing-stone.active{color:#fff}
.dock .nav-btn.ing-stone.active[data-page="fontes"]{color:#0f4b66}
.dock .nav-btn.ing-stone:focus{outline:none}
.dock .nav-btn.ing-stone:focus-visible{box-shadow:inset 0 0 0 1px rgba(198,166,104,.5),0 0 0 3px rgba(198,166,104,.72),0 0 0 6px rgba(106,63,181,.45)}
body[data-theme="night"] .dock .nav-btn.ing-stone{box-shadow:inset 0 1px 0 rgba(255,255,255,.14),0 1px 0 rgba(0,0,0,.7),0 2px 3px rgba(0,0,0,.55),0 5px 8px rgba(0,0,0,.45)}
/* the rail folded to its icons: the stone is clipped to its first letters, as the Forge clips its own */
body.nav-collapsed .dock .nav-btn.ing-stone{max-width:44px;padding:0 6px;justify-content:flex-start}
/* the folded Apps key wears the five colours */
.dock .grp-label.ing-fold .ing-fak-dots{display:none;align-items:center;gap:3px;margin-left:2px;vertical-align:middle}
.dock.apps-folded .grp-label.ing-fold .ing-fak-dots{display:inline-flex}
.dock .grp-label.ing-fold .ing-fak-dots i{display:block;width:6px;height:6px;border-radius:50%;flex:none;
  box-shadow:0 0 0 .6px rgba(189,154,82,.9),inset 0 1px 0 rgba(255,255,255,.28);transition:transform .16s ease}
.dock .grp-label.ing-fold:hover .ing-fak-dots i{transform:translateY(-1px)}
.ing-fak-dots i[data-app="tabula"],#ing-deskbar [data-tab^="tabula"]:not(.folded) .dot{background:linear-gradient(180deg,#3a3a40,#232326) !important}
.ing-fak-dots i[data-app="abacus"],#ing-deskbar [data-tab^="abacus"]:not(.folded) .dot{background:linear-gradient(180deg,#357a55,#1d4a34) !important}
.ing-fak-dots i[data-app="slides"],#ing-deskbar [data-tab^="slides"]:not(.folded) .dot{background:linear-gradient(180deg,#9a3540,#651d27) !important}
.ing-fak-dots i[data-app="fontes"],#ing-deskbar [data-tab^="fontes"]:not(.folded) .dot{background:linear-gradient(180deg,#f2ead6,#e0d3b4) !important}
.ing-fak-dots i[data-app="scriba"],#ing-deskbar [data-tab^="scriba"]:not(.folded) .dot{background:linear-gradient(180deg,#3a5178,#26375a) !important}
/* the Desk tab's circle: the stone's colour, with the stone's gilt edge */
#ing-deskbar [data-tab]:not(.folded) .dot{box-shadow:0 0 0 .6px rgba(189,154,82,.9),inset 0 1px 0 rgba(255,255,255,.28)}
@media (prefers-reduced-motion:reduce){.dock .nav-btn.ing-stone,.dock .grp-label.ing-fold .ing-fak-dots i{transition:none}}
</style>
<script>try{(window.__ingParts=window.__ingParts||{})["p193"]="started";}catch(_){}
/* R193: the stones on the rail, the circles on the folded Apps key (see the note at the top of its styles) */
(function(){"use strict";
if(window.__r193)return;window.__r193=1;
var APPS=["tabula","abacus","slides","scriba","fontes"];
var SYM={fontes:'<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#145671" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M5 19h14"></path><path d="M8.2 19c0-2.9 1.5-4.9 3.8-6.2 2.3 1.3 3.8 3.3 3.8 6.2"></path><path d="M12 12.8V5"></path><path d="M9.5 7.5C10.1 6.4 11 5.5 12 5c1 .5 1.9 1.4 2.5 2.5"></path></svg>',
  scriba:'<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#f0dca6" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M13.5 3.5c2.9 2.2 4.3 4.6 4.3 7.2L13.5 20l-4.3-9.3c0-2.6 1.4-5 4.3-7.2z"></path><path d="M13.5 11.6V20"></path><circle cx="13.5" cy="10.4" r="1"></circle><path d="M6 9c-.8.9-1.2 1.9-1.2 3s.4 2.1 1.2 3"></path><path d="M3.6 7.2C2.6 8.6 2 10.4 2 12s.6 3.4 1.6 4.8"></path></svg>'};
/* the stone each app wears on Home (jewels.css, written into r147): read off a probe, so the picture is kept in one place */
var probe=null,cache={};
function stoneImage(k){if(cache[k])return cache[k];
  try{if(!probe){probe=document.createElement("div");probe.id="ing-stone-probe";probe.className="hx-apps";probe.setAttribute("aria-hidden","true");
      probe.style.cssText="position:absolute;left:-9999px;top:0;width:1px;height:1px;overflow:hidden;pointer-events:none;visibility:hidden";document.body.appendChild(probe);}
    var a=document.createElement("button");a.type="button";a.className="hx-app";a.setAttribute("data-app",k);var s=document.createElement("span");s.className="hx-stone";a.appendChild(s);probe.appendChild(a);
    var img=getComputedStyle(s).backgroundImage;probe.removeChild(a);if(img&&img!=="none"&&/svg/.test(img)){cache[k]=img;return img;}}catch(e){}
  return null;}
function dress(){var dock=document.querySelector(".dock");if(!dock)return;
  APPS.forEach(function(k){var b=dock.querySelector('.nav-btn[data-page="'+k+'"]');if(!b||b.classList.contains("ing-stone"))return;
    var img=stoneImage(k);if(!img)return;b.classList.add("ing-stone");b.style.backgroundImage=img;
    if(!b.title)b.title=(b.textContent||"").trim();
    /* the Forge's own marks on Scriba and Fontes (the owner's words, 31 October 2026: "Scriba and Fontes are missing their apps symbols from their buttons") */
    if(SYM[k]&&!b.querySelector("svg.ing-stone-sym")){var t=document.createElement("template");t.innerHTML=SYM[k];var sv=t.content.firstElementChild;if(sv){sv.classList.add("ing-stone-sym");sv.setAttribute("aria-hidden","true");sv.setAttribute("focusable","false");
        var tx=null;for(var i=0;i<b.childNodes.length;i++){if(b.childNodes[i].nodeType===3&&b.childNodes[i].nodeValue.trim()){tx=b.childNodes[i];break;}}b.insertBefore(sv,tx||null);}}});
  var lab=dock.querySelector(".grp-label.ing-fold");
  if(lab&&!lab.querySelector(".ing-fak-dots")){var d=document.createElement("span");d.className="ing-fak-dots";d.setAttribute("aria-hidden","true");
    APPS.forEach(function(k){var i=document.createElement("i");i.setAttribute("data-app",k);d.appendChild(i);});lab.appendChild(d);}}
dress();setTimeout(dress,450);setTimeout(dress,1500);
try{var dk=document.querySelector(".dock");if(dk)new MutationObserver(function(){dress();}).observe(dk,{childList:true,subtree:true});}catch(e){}
/* the app in hand: while the Desk is up (r123 marks the body ing-desk-on and the app's frame .on), the rail says which app
   it is, as it says which page elsewhere; r123's go() never reached the rail, so Home stayed lit while Tabula was open */
var deskWatched=false;
function syncActive(){try{var dock=document.querySelector(".dock");if(!dock)return;var on=document.body.classList.contains("ing-desk-on");
  if(!on){[].forEach.call(dock.querySelectorAll(".nav-btn.ing-open"),function(b){b.classList.remove("ing-open");});return;}
  var f=document.querySelector("#ing-desk iframe.on[data-app]"),w=f?f.getAttribute("data-app"):null;if(!w)return;
  [].forEach.call(dock.querySelectorAll(".nav-btn"),function(b){var me=b.getAttribute("data-page")===w;b.classList.toggle("active",me);b.classList.toggle("ing-open",me);});
  if(!deskWatched){var d=document.getElementById("ing-desk");if(d){deskWatched=true;new MutationObserver(syncActive).observe(d,{attributes:true,subtree:true,attributeFilter:["class"]});}}}catch(e){}}
try{new MutationObserver(syncActive).observe(document.body,{attributes:true,attributeFilter:["class"]});}catch(e){}
window.IngStones={dress:dress,image:stoneImage,apps:APPS.slice(),sync:syncActive};
})();
;try{window.__ingParts["p193"]="running";}catch(_){}
</script>
