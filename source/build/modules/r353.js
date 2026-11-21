<style id="r353-css">
/* ============ R353 · THE AUTHOR STUDIO, RAISED (Ingenium 7.63, 21 November 2026; the master edition only) ============
   Her words (21 November 2026): "The Editor page and other pages inside of Ingenium's Author Studio look flat, stiff and rigid, they lack
   the popped out animated 3D look and effect of the rest of the app, please fix it and give them the animation and 3D look and effect that
   they are missing to match the rest of the app."
   Seen on 7.61 (rig: its pictures): the studio's rooms are white sheets with hairline borders; the Editor's five kinds are flat panels;
   the ready looks flat chips; the fields flat boxes; the layers' strip (Pages, Sections, Scripts, Styles, Hidden) a flat row with a ring;
   the top bar's keys flat pills. 6.38 had made them so at her word then ("Everything inside the Author Studio looks big and chunky, very
   bulky and does not match the rest of the app"), so the measures stay those of 6.38: nothing grows; only depth and movement are added,
   and they are the rest of the app's own, those of Settings, raised (modules/r313.js, 7.28, her approved preview):
   - each card is a raised slab and the cards rise in one after another when a room opens;
   - the Editor's kinds, the Names cards and the ready looks are raised tiles that lean toward the pointer, lift under it and sink when
     pressed; each kind wears its room's mark on a violet disc, as Settings' tiles wear theirs;
   - the rows of Words, Names and the Change log are raised plates that lift under the pointer;
   - the fields are lit wells; the layers' strip is a well whose chosen part is a raised key that slides under the choice;
   - the top bar's keys are raised keys that lift and sink.
   The rail stays as she approved it in 7.42 (the chosen room pressed into the rail; a room glides and its mark tilts under the pointer).
   Minimal motion, the calm look and the system's reduced motion keep everything still, raised but unmoving. */
#ingAuthor{--au-hair:rgba(34,26,46,.10);--au-h1:#ffffff;--au-h2:#f6f2fb;--au-acc:#6a3fb5;--au-accs:rgba(106,63,181,.14);
  --au-well:inset 0 1px 2.5px rgba(40,22,68,.10);--au-wellbg:rgba(34,26,46,.04);
  --au-pop:inset 0 -1.5px 0 rgba(40,22,68,.13),0 2px 0 rgba(40,22,68,.25),0 4px 5px rgba(40,22,68,.16),0 9px 14px rgba(40,22,68,.10);
  --au-pophi:inset 0 -1.5px 0 rgba(40,22,68,.13),0 3px 0 rgba(40,22,68,.25),0 6px 8px rgba(40,22,68,.18),0 13px 20px rgba(40,22,68,.12);
  --au-popsm:inset 0 -1px 0 rgba(40,22,68,.12),0 1.5px 0 rgba(40,22,68,.22),0 3px 5px rgba(40,22,68,.12);
  --au-press:inset 0 1px 2px rgba(40,22,68,.16),0 1px 0 rgba(40,22,68,.18);
  --au-slab:inset 0 1px 0 rgba(255,255,255,.85),0 1px 0 rgba(40,22,68,.06),0 2px 6px rgba(40,22,68,.05),0 12px 30px rgba(40,22,68,.07);
  --au-slabhi:inset 0 1px 0 rgba(255,255,255,.85),0 1px 0 rgba(40,22,68,.07),0 4px 10px rgba(40,22,68,.07),0 18px 38px rgba(40,22,68,.10);
  --au-disc:radial-gradient(circle at 35% 30%,#c9b3f2,var(--rm-pa,#7348be) 55%,var(--rm-pb,#5d37a1));--au-discsh:0 2px 0 var(--rm-pledge,#3a2070),0 5px 10px rgba(40,22,68,.3);
  --au-key:linear-gradient(#8f66d3,#6a3fb5 55%,#5d37a1);--au-keysh:inset 0 1px 0 rgba(255,255,255,.35),inset 0 -1.5px 0 rgba(0,0,0,.18),0 2px 0 #3a2070,0 4px 8px rgba(40,22,68,.28);
  --au-out:cubic-bezier(.2,.8,.2,1);--au-spring:cubic-bezier(.34,1.56,.64,1);--au-ease:cubic-bezier(.34,1.35,.64,1)}
body[data-theme="night"] #ingAuthor{--au-hair:rgba(205,184,240,.11);--au-h1:#2a2239;--au-h2:#231c31;--au-acc:#b79ce6;--au-accs:rgba(183,156,230,.16);
  --au-well:inset 0 1px 3px rgba(0,0,0,.45);--au-wellbg:rgba(10,6,18,.35);
  --au-pop:inset 0 1px 0 rgba(255,255,255,.07),inset 0 -2px 0 rgba(0,0,0,.45),0 2px 0 rgba(0,0,0,.75),0 4px 5px rgba(0,0,0,.5),0 9px 14px rgba(0,0,0,.36);
  --au-pophi:inset 0 1px 0 rgba(255,255,255,.08),inset 0 -2px 0 rgba(0,0,0,.45),0 3px 0 rgba(0,0,0,.75),0 6px 8px rgba(0,0,0,.52),0 13px 20px rgba(0,0,0,.4);
  --au-popsm:inset 0 1px 0 rgba(255,255,255,.06),inset 0 -1.5px 0 rgba(0,0,0,.4),0 1.5px 0 rgba(0,0,0,.7),0 3px 5px rgba(0,0,0,.42);
  --au-press:inset 0 1px 3px rgba(0,0,0,.55),0 1px 0 rgba(0,0,0,.5);
  --au-slab:inset 0 1px 0 rgba(255,255,255,.06),0 1px 0 rgba(0,0,0,.4),0 2px 6px rgba(0,0,0,.3),0 12px 30px rgba(0,0,0,.34);
  --au-slabhi:inset 0 1px 0 rgba(255,255,255,.07),0 1px 0 rgba(0,0,0,.45),0 4px 10px rgba(0,0,0,.36),0 18px 38px rgba(0,0,0,.42);
  --au-discsh:0 2px 0 var(--rm-pledge,#170b30),0 5px 10px rgba(0,0,0,.45)}

/* the cards: raised slabs that rise in, one after another */
@keyframes auRaise{from{opacity:0;transform:translateY(10px) scale(.99)}to{opacity:1;transform:none}}
#ingAuthor .au-pane .au-card{background:linear-gradient(var(--au-h1),var(--au-h2));border:1px solid var(--au-hair);box-shadow:var(--au-slab);
  transition:transform .24s var(--au-out),box-shadow .24s ease;animation:auRaise .44s var(--au-out) backwards;animation-delay:calc(var(--au-i,0) * 55ms)}
#ingAuthor .au-pane .au-card:hover{transform:translateY(-2px);box-shadow:var(--au-slabhi)}

/* the Editor's kinds: raised tiles with their room's mark, leaning toward the pointer, lifting, sinking when pressed */
#ingAuthor .au-pane .au-kinds{gap:12px}
#ingAuthor .au-pane .au-kind{display:grid;grid-template-columns:38px minmax(0,1fr);column-gap:12px;row-gap:2px;align-items:start;padding:13px 14px;border-radius:16px;
  background:linear-gradient(var(--au-h1),var(--au-h2));border:1px solid var(--au-hair);box-shadow:var(--au-pop);
  transform:perspective(720px) rotateX(var(--au-rx,0deg)) rotateY(var(--au-ry,0deg)) translateY(var(--au-ty,0px));
  transition:transform .22s var(--au-out),box-shadow .22s ease;animation:auRaise .44s var(--au-out) backwards;animation-delay:calc(var(--au-i,0) * 55ms)}
#ingAuthor .au-pane .au-kind > :not(.au-disc){grid-column:2}
#ingAuthor .au-pane .au-kind:hover{--au-ty:-3px;box-shadow:var(--au-pophi)}
#ingAuthor .au-pane .au-kind:active{--au-ty:1px;box-shadow:var(--au-press);transition-duration:.08s}
#ingAuthor .au-pane .au-kind:focus-visible{outline:none;box-shadow:var(--au-pophi),0 0 0 2.5px var(--au-acc)}
#ingAuthor .au-disc{grid-column:1;grid-row:1 / span 3;width:38px;height:38px;border-radius:50%;display:grid;place-items:center;color:#fff;background:var(--au-disc);box-shadow:var(--au-discsh);
  transition:transform .3s var(--au-spring)}
#ingAuthor .au-disc svg{width:18px;height:18px;color:#fff;stroke:#fff}
#ingAuthor .au-pane .au-kind:hover .au-disc{transform:translateY(-1px) scale(1.06) rotate(-4deg)}

/* the Names cards and the ready looks: raised tiles too */
#ingAuthor .au-pane .au-names .au-card{box-shadow:var(--au-pop);background:linear-gradient(var(--au-h1),var(--au-h2));border-radius:14px;
  transform:perspective(720px) rotateX(var(--au-rx,0deg)) rotateY(var(--au-ry,0deg)) translateY(var(--au-ty,0px))}
#ingAuthor .au-pane .au-names .au-card:hover{--au-ty:-3px;transform:perspective(720px) rotateX(var(--au-rx,0deg)) rotateY(var(--au-ry,0deg)) translateY(var(--au-ty,0px));box-shadow:var(--au-pophi)}
#ingAuthor .au-pane .au-swatch{height:28px;padding:0 12px;border:1px solid var(--au-hair);background:linear-gradient(var(--au-h1),var(--au-h2));box-shadow:var(--au-popsm);
  transition:transform .2s var(--au-spring),box-shadow .2s ease}
#ingAuthor .au-pane .au-swatch:hover{transform:translateY(-2px);box-shadow:var(--au-pop)}
#ingAuthor .au-pane .au-swatch:active{transform:translateY(1px);box-shadow:var(--au-press);transition-duration:.08s}
#ingAuthor .au-pane .au-swatch i{box-shadow:inset 0 1px 0 rgba(255,255,255,.4),0 1px 2px rgba(0,0,0,.3)}

/* the rows (Words, Names, the Change log, the hits of Find words): raised plates that lift under the pointer */
#ingAuthor .au-pane .au-row{margin:7px 0 0;padding:9px 12px;border:1px solid var(--au-hair);border-radius:12px;background:linear-gradient(var(--au-h1),var(--au-h2));box-shadow:var(--au-popsm);
  transition:transform .2s var(--au-out),box-shadow .2s ease}
#ingAuthor .au-pane .au-row:first-of-type{border-top:1px solid var(--au-hair)}
#ingAuthor .au-pane .au-row:hover{transform:translateY(-2px);box-shadow:var(--au-pop)}

/* the fields: lit wells */
#ingAuthor .au-pane .au-field input[type=text],#ingAuthor .au-pane .au-field select,#ingAuthor .au-pane .au-search,#ingAuthor .au-pane textarea,#ingAuthor .au-pane input[type=text]{
  background:var(--au-wellbg);border:1px solid var(--au-hair);box-shadow:var(--au-well);transition:box-shadow .2s ease,border-color .2s ease}
#ingAuthor .au-pane .au-field input[type=text]:focus,#ingAuthor .au-pane .au-field select:focus,#ingAuthor .au-pane .au-search:focus,#ingAuthor .au-pane textarea:focus,#ingAuthor .au-pane input[type=text]:focus{
  outline:none;border-color:var(--au-acc);box-shadow:var(--au-well),0 0 0 3px var(--au-accs)}
#ingAuthor .au-pane .au-field input[type=color]{box-shadow:var(--au-popsm);background:linear-gradient(var(--au-h1),var(--au-h2));transition:transform .2s var(--au-spring)}
#ingAuthor .au-pane .au-field input[type=color]:hover{transform:translateY(-2px)}

/* the layers' strip (Pages, Sections, Scripts, Styles, Hidden): a well, its chosen part a raised key that slides under the choice */
#ingAuthor .au-pane .au-strip{position:relative;display:inline-flex;gap:2px;padding:3px;border-radius:13px;background:var(--au-wellbg);box-shadow:var(--au-well);border:1px solid var(--au-hair)}
#ingAuthor .au-pane .au-strip > button{position:relative;z-index:1;border:0 !important;background:transparent !important;box-shadow:none !important;outline:none}
#ingAuthor .au-pane .au-strip > button:focus-visible{box-shadow:0 0 0 2px var(--au-acc) !important;border-radius:10px}
#ingAuthor .au-pane .au-strip::before{content:"";position:absolute;z-index:0;top:3px;bottom:3px;left:var(--au-sx,3px);width:var(--au-sw,0px);border-radius:10px;
  background:linear-gradient(var(--au-h1),var(--au-h2));box-shadow:var(--au-pop);transition:left .32s var(--au-ease),width .32s var(--au-ease)}

/* the top bar's keys: raised keys that lift and sink */
#ingAuthor .au-top .au-pill{height:26px;padding:0 12px;border:1px solid var(--au-hair);background:linear-gradient(var(--au-h1),var(--au-h2));box-shadow:var(--au-popsm);
  transition:transform .18s var(--au-spring),box-shadow .18s ease}
#ingAuthor .au-top .au-pill:hover{transform:translateY(-2px);box-shadow:var(--au-pop)}
#ingAuthor .au-top .au-pill:active{transform:translateY(1px);box-shadow:var(--au-press);transition-duration:.08s}
#ingAuthor .au-top .au-pill.prim{background:var(--au-key);border-color:rgba(58,32,112,.6);box-shadow:var(--au-keysh)}
#ingAuthor .au-top .au-pill.prim:hover{box-shadow:var(--au-keysh),0 6px 12px rgba(40,22,68,.22)}
#ingAuthor .au-top .au-kept{box-shadow:var(--au-well)}

/* still, where she asked for stillness */
body[data-motion="minimal"] #ingAuthor .au-pane *,body[data-calm="1"] #ingAuthor .au-pane *{--au-rx:0deg !important;--au-ry:0deg !important}
@media (prefers-reduced-motion:reduce){#ingAuthor .au-pane *{--au-rx:0deg !important;--au-ry:0deg !important}}
</style>
<script>try{(window.__ingParts=window.__ingParts||{})["p353"]="started";}catch(_){}
/* R353 · the Author Studio, raised: see the note at the top of its styles */
(function r353(){
"use strict";
var W=window,D=document;
if(W.__r353)return;W.__r353=1;
function still(){try{return D.body.getAttribute("data-motion")==="minimal"||D.body.getAttribute("data-calm")==="1"||(W.matchMedia&&matchMedia("(prefers-reduced-motion: reduce)").matches);}catch(e){return false;}}
/* the kinds' marks: the rail's own mark for each room the kind opens */
var KIND_ROOM={words:"words",names:"names",side:"side",sidebar:"side",look:"look",additions:"checks",checks:"checks"};
function roomOfKind(k){var t=(k.textContent||"").toLowerCase();
  if(/open words/.test(t))return "Words";if(/open names/.test(t))return "Names";if(/open side bar/.test(t))return "Side bar";if(/open look/.test(t))return "Look";if(/open additions|open checks/.test(t))return "Additions";return "";}
function markFor(name){var rooms=D.querySelectorAll("#ingAuthor .au-rail .au-room");for(var i=0;i<rooms.length;i++){var t=(rooms[i].textContent||"").trim();if(t.indexOf(name)===0){var s=rooms[i].querySelector("svg");return s?s.cloneNode(true):null;}}return null;}
/* the layers' strip: the row of keys whose one key is chosen, found by its shape (keys side by side, one marked as chosen) */
function strips(root){var out=[];root.querySelectorAll("div").forEach(function(d){var k=[].filter.call(d.children,function(c){return c.tagName==="BUTTON";});
  if(k.length<3||k.length!==d.children.length)return;var t=k.map(function(b){return (b.textContent||"").trim();}).join("|");
  if(/^Pages\|Sections\|Scripts\|Styles/.test(t))out.push(d);});return out;}
function chosenOf(strip){var k=[].slice.call(strip.children);for(var i=0;i<k.length;i++){var b=k[i];
  if(b.getAttribute("aria-selected")==="true"||b.getAttribute("aria-pressed")==="true"||/\b(on|sel|chosen|active|cur)\b/.test(b.className))return b;}return null;}
function placeStrip(strip){var c=chosenOf(strip);if(!c){strip.style.setProperty("--au-sw","0px");return;}
  strip.style.setProperty("--au-sx",c.offsetLeft+"px");strip.style.setProperty("--au-sw",c.offsetWidth+"px");}
function dress(){var pane=D.querySelector("#ingAuthor .au-pane");if(!pane)return;
  var i=0;pane.querySelectorAll(".au-card,.au-kind").forEach(function(el){if(el.__r353)return;el.__r353=1;el.style.setProperty("--au-i",String(i++));});
  pane.querySelectorAll(".au-kind").forEach(function(k){if(k.querySelector(".au-disc"))return;var m=markFor(roomOfKind(k));if(!m)return;var d=D.createElement("span");d.className="au-disc";d.setAttribute("aria-hidden","true");d.appendChild(m);k.insertBefore(d,k.firstChild);});
  strips(pane).forEach(function(s){if(!s.classList.contains("au-strip"))s.classList.add("au-strip");placeStrip(s);});}
var T=0;function soon(){clearTimeout(T);T=setTimeout(dress,30);}
/* leaning toward the pointer: the tile under it turns a little toward it (at most 4 degrees), and settles when the pointer leaves */
var LEAN=".au-kind,.au-names .au-card",cur=null,raf=0,px=0,py=0;
function lean(){raf=0;if(!cur)return;var r=cur.getBoundingClientRect();if(!r.width)return;var x=(px-r.left)/r.width-.5,y=(py-r.top)/r.height-.5;
  cur.style.setProperty("--au-ry",(x*8).toFixed(2)+"deg");cur.style.setProperty("--au-rx",(-y*6).toFixed(2)+"deg");}
function settle(el){if(!el)return;el.style.removeProperty("--au-rx");el.style.removeProperty("--au-ry");}
function onMove(e){if(still())return;var t=e.target&&e.target.closest&&e.target.closest("#ingAuthor .au-pane "+LEAN.split(",").join(",#ingAuthor .au-pane "));
  if(t!==cur){settle(cur);cur=t;}if(!cur)return;px=e.clientX;py=e.clientY;if(!raf)raf=requestAnimationFrame(lean);}
function onLeave(){settle(cur);cur=null;}
function onPress(e){var t=e.target&&e.target.closest&&e.target.closest("#ingAuthor .au-pane .au-kind,#ingAuthor .au-pane .au-swatch,#ingAuthor .au-pane .au-strip > button,#ingAuthor .au-top .au-pill");
  if(!t)return;try{if(W.IngSound&&IngSound.play)IngSound.play("keys");}catch(_){}
  var s=t.parentNode&&t.parentNode.classList&&t.parentNode.classList.contains("au-strip")?t.parentNode:null;if(s)setTimeout(function(){placeStrip(s);},0);}
function wire(){var a=D.getElementById("ingAuthor");if(!a){setTimeout(wire,1500);return;}if(a.__r353)return;a.__r353=1;
  new MutationObserver(soon).observe(a,{childList:true,subtree:true,attributes:true,attributeFilter:["aria-selected","aria-pressed","class","hidden"]});
  a.addEventListener("pointermove",onMove,{passive:true});a.addEventListener("pointerleave",onLeave);a.addEventListener("click",onPress,true);
  W.addEventListener("resize",function(){D.querySelectorAll("#ingAuthor .au-strip").forEach(placeStrip);});
  dress();}
if(D.readyState==="loading")D.addEventListener("DOMContentLoaded",wire);else wire();
W.IngAuthorRaised={dress:dress,_strips:function(){return D.querySelectorAll("#ingAuthor .au-strip").length;}};
})();
;try{window.__ingParts["p353"]="running";}catch(_){}
</script>
