<style id="r338-css">
/* ============ R338 · THE PROFILE KEY INSIDE THE STATUS PANEL (Ingenium 7.48, 20 November 2026) ============
   Her words (20 November 2026), with a picture of the top bar's Status panel open: "please remove the profile toggle from the side
   navigation bar, instead put it inside of the Status panel on the top bar since it makes the most sense and cleanly removes it from
   messing with the design and template of the app."
   So the left menu has no profile key any more (r331's #profKey stays in the page, out of sight, so its menu's own ways keep working),
   and the Status panel (the first key of the top bar, openPresenceMenu in the base page) ends with Who is using Ingenium: each profile a
   row of the panel's own kind (.pres-row), with its round pastel tile (r331's .r331-mk) and In use beside the one in use, then Lock
   Ingenium and, in her own profile, Manage profiles. Each row does exactly what the same row of r331's menu does (it is pressed there).
   Her word on its pictures: "I approve of the preview, please commit and push it everywhere". The panel's own rows, words and look are
   not changed. Minimal or reduced motion keeps them still, as the panel's rows are. */
html body nav.dock #profKey{display:none!important}
.pres-menu .r338-who .r331-mk{--s:22px;font-size:11px;margin:0 2px 0 -2px}
.pres-menu .r338-who .pres-tick.r338-in{font:600 11px/1 inherit;letter-spacing:.02em;opacity:.75}
</style>
<script>try{(window.__ingParts=window.__ingParts||{})["p338"]="started";}catch(_){}
(function r338(){"use strict";
if(window.__r338)return;window.__r338=1;
var W=window,D=document;
/* r331's own tints, so each profile wears the same tile as in its menu */
var TINT=[["#dccbf3","#bfa6e6","#3b2266"],["#cfe0f7","#a9c4ec","#1e3a66"],["#cfe9dc","#a8d4bf","#1d4d38"],["#f3c9d6","#d9a2c9","#5b2147"],["#f6e7b8","#e9cf86","#5a4310"],["#f1eef6","#ddd7e6","#4a4358"]];
function mk(t,c,x){var e=D.createElement(t);if(c)e.className=c;if(x!=null)e.textContent=x;return e;}
function tile(p){var c=TINT[(+p.t||0)%TINT.length],s=mk("span","r331-mk round",String(p.name||"?").charAt(0).toUpperCase());s.setAttribute("aria-hidden","true");
  s.style.setProperty("--a",c[0]);s.style.setProperty("--b",c[1]);s.style.setProperty("--c",c[2]);return s;}
/* a row here is pressed in r331's own menu, so it does what that row does (switching, its password, locking, Settings) */
function viaMenu(sel){try{IngProfiles.open();var b=D.querySelector("#profPop "+sel);if(b)b.click();IngProfiles.close();}catch(e){}}
function close(){try{W.closePresenceMenu();}catch(e){}}
function dress(menu){if(!W.IngProfiles||typeof IngProfiles.list!=="function"||menu.querySelector(".r338-who"))return;
  var list=[];try{list=IngProfiles.list()||[];}catch(e){}if(!list.length)return;
  var cur=(W.__ingProfile&&W.__ingProfile.owner===false)?W.__ingProfile.id:"owner";
  menu.appendChild(mk("div","pres-rule"));menu.appendChild(mk("div","pres-head","Who is using Ingenium"));
  list.forEach(function(p){var on=p.id===cur,row=mk("button","pres-row r338-who"+(on?" on":""));row.type="button";row.setAttribute("data-who",p.id);row.setAttribute("role","menuitemradio");row.setAttribute("aria-checked",on?"true":"false");
    row.appendChild(tile(p));var col=mk("span","pres-col");col.appendChild(mk("span","pres-name",p.name||"A profile"));row.appendChild(col);
    if(on)row.appendChild(mk("span","pres-tick r338-in","In use"));
    row.onclick=function(){close();if(!on)viaMenu('.r331-who[data-who="'+String(p.id).replace(/"/g,"")+'"]');};menu.appendChild(row);});
  var lk=mk("button","pres-row pres-opt r338-who");lk.type="button";lk.id="r338Lock";lk.appendChild(mk("span","pres-name","Lock Ingenium"));lk.onclick=function(){close();viaMenu("#profLock");};menu.appendChild(lk);
  var own=false;try{own=!!IngProfiles.owner();}catch(e){}
  if(own){var mg=mk("button","pres-row pres-opt r338-who");mg.type="button";mg.id="r338Manage";mg.appendChild(mk("span","pres-name","Manage profiles"));mg.onclick=function(){close();viaMenu("#profManage");};menu.appendChild(mg);}}
var o=W.openPresenceMenu;
if(typeof o==="function"&&!o.__r338){W.openPresenceMenu=function(){var r=o.apply(this,arguments);try{var m=D.querySelector(".pres-menu");if(m)dress(m);}catch(e){}return r;};W.openPresenceMenu.__r338=1;}
})();
;try{window.__ingParts["p338"]="running";}catch(_){}
</script>
