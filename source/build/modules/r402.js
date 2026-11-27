<style id="r402-css">
/* ============ R402 · INGENIA: EACH APP'S LOGO A REAL BUTTON, WITH THE SEAL KEY'S FIDGET PLAY (Ingenium 7.97, 26 November 2026) ============
   Her words (26 November 2026): "I want the apps logos to sink and actually look pressed and clicked on and animate on the Ingenia app folder
   pages, right now they make the sound and animate really slightly, I want them to feel like real 3D app buttons and not this crappy thing.
   Even Ingenium's seal engine button does not have its proper animation that the other pages have to give that digital fidget clickable toy
   effect, that is what I want applied to all of the apps logo buttons."
   Measured on 7.96: pressed, the open folder's logo (r378's .ig-key) sank by 5 per cent of its size and shrank by 6 per cent, then knocked
   back; the five apps' own presses (r388) moved only their inner layers. Now, on the logo of the open folder's page, for every app:
   - pressed, it sinks: it drops by 8 per cent of its size and shrinks by 10, and its shadow gathers close under it; nothing is drawn
     around it (7.97 showed a recess around the logo while it was held, and a violet ring spreading out in some flourishes; her words,
     26 November 2026: "I don't want a dented circle around the apps logos". From 7.98 both are gone);
   - let go, it springs back up past its place and settles, as a sprung key does;
   - then it plays a flourish, a different one at each press, as Ingenium's seal key does on Home (r175): it hops and lands, twirls like
     a coin, spins round, wobbles, pulses, or flips forward; a press held for more than half a second gives a full spin
     with a glow. Each app's own press (r388: Carpe Diem's sunrise, The Forge's strike, Inkwell's dip, Clavis's key, Lakay's spiral) still
     plays inside the seal at the same time;
   - Ingenium's own seal plays the seal key's own set, on its own layers: its star spins, its ring pulses, its heart stone beats with a warm
     glow, and the whole seal hops, wobbles and twirls.
   Ingenium's key sound stays (r378). Ingenium's Minimal motion keeps only the press and its sound; a press she makes still plays under the
   system's reduced motion, as r388's do (it is hers, short, and starts only at her press). */
#page-folders .ig-ls.ig-key{isolation:isolate;z-index:0;transition:translate .32s cubic-bezier(.3,1.5,.5,1),scale .32s cubic-bezier(.3,1.5,.5,1)}
#page-folders .ig-ls.ig-key.down{translate:0 calc(var(--S,84px) * .08);scale:.9;transition-duration:.07s}
#page-folders .ig-ls.ig-key.down .ig-ls-cast{opacity:1;transform:translateZ(calc(var(--S,84px) * -.08)) scale(.78)}
#page-folders .ig-ls.ig-key .r402-glow{position:absolute;inset:-18%;border-radius:50%;pointer-events:none;opacity:0;z-index:-1;
  background:radial-gradient(closest-side,rgba(106,63,181,.36),rgba(106,63,181,0))}
body[data-theme="night"] #page-folders .ig-ls.ig-key .r402-glow{background:radial-gradient(closest-side,rgba(201,178,242,.36),rgba(201,178,242,0))}
#page-folders .ig-ls.ig-key .r402-glow.warm{background:radial-gradient(closest-side,rgba(214,150,120,.42),rgba(214,150,120,0))}
/* let go: it springs up past its place and settles */
#page-folders .ig-ls.ig-key.r402-up{animation:r402up .5s cubic-bezier(.3,1.4,.5,1),igSeat .9s cubic-bezier(.2,.9,.25,1)}
@keyframes r402up{0%{translate:0 calc(var(--S,84px) * .08);scale:.9}55%{translate:0 calc(var(--S,84px) * -.05);scale:1.05}100%{translate:0 0;scale:1}}
/* the flourishes, on the whole seal */
#page-folders .ig-ls.ig-key.r402-f.r402-hop{animation:r402hop .78s cubic-bezier(.3,.8,.4,1),igSeat .9s cubic-bezier(.2,.9,.25,1)}
/* 8.04: no press turns it sideways any more (twirl and flip showed its layers edge on: "folds and bends"); the door's knock and a lift of its layers instead */
#page-folders .ig-ls.ig-key.r402-f.r402-knock{animation:r402knock .52s cubic-bezier(.34,1.45,.64,1),igSeat .9s cubic-bezier(.2,.9,.25,1)}
#page-folders .ig-ls.ig-key.r402-f.r402-lift{animation:r402lift .95s cubic-bezier(.3,.8,.3,1)}
#page-folders .ig-ls.ig-key.r402-f.r402-spin{animation:r402spin .9s cubic-bezier(.3,.8,.25,1),igSeat .9s cubic-bezier(.2,.9,.25,1)}
#page-folders .ig-ls.ig-key.r402-f.r402-wobble{animation:r402wobble .75s ease-out,igSeat .9s cubic-bezier(.2,.9,.25,1)}
#page-folders .ig-ls.ig-key.r402-f.r402-pulse{animation:r402pulse .7s cubic-bezier(.3,1.4,.5,1),igSeat .9s cubic-bezier(.2,.9,.25,1)}
#page-folders .ig-ls.ig-key.r402-f.r402-big{animation:r402big 1.25s cubic-bezier(.25,.8,.25,1),igSeat .9s cubic-bezier(.2,.9,.25,1)}
#page-folders .ig-ls.ig-key.r402-f .ig-ls-idle{animation-play-state:paused}
@keyframes r402hop{0%{translate:0 calc(var(--S,84px) * .05);scale:1.06 .9}28%{translate:0 calc(var(--S,84px) * -.2);scale:.95 1.06}55%{translate:0 0;scale:1.08 .9}75%{translate:0 calc(var(--S,84px) * -.04);scale:.98 1.02}100%{translate:0 0;scale:1}}
@keyframes r402knock{0%{scale:.93}42%{scale:1.07}72%{scale:.995}100%{scale:1}}
@keyframes r402lift{0%{--igz:1;translate:0 0}35%{--igz:1.9;translate:0 calc(var(--S,84px) * -.07)}70%{--igz:.85;translate:0 0}100%{--igz:1;translate:0 0}}
@keyframes r402spin{0%{rotate:0deg;scale:1}40%{scale:1.06}100%{rotate:360deg;scale:1}}
@keyframes r402wobble{0%{rotate:0deg}18%{rotate:-13deg}36%{rotate:10deg}54%{rotate:-6deg}72%{rotate:3deg}100%{rotate:0deg}}
@keyframes r402pulse{0%{scale:1}30%{scale:1.13}60%{scale:.97}100%{scale:1}}
@keyframes r402big{0%{rotate:0deg;scale:1}25%{scale:1.1}100%{rotate:720deg;scale:1}}
#page-folders .ig-ls.ig-key.r402-pulse .r402-glow,#page-folders .ig-ls.ig-key.r402-big .r402-glow,#page-folders .ig-ls.ig-key.r402-stone .r402-glow{animation:r402glow .9s ease-out}
@keyframes r402glow{0%{opacity:0}30%{opacity:1}100%{opacity:0}}
/* Ingenium's own seal: the seal key's set, on its own layers (its star, its ring, its heart stone) */
#page-folders .ig-ls.ig-key[data-fd-seal="ingenium"].r402-star .ig-ls-l[data-r="mark"]{animation:r402star .95s cubic-bezier(.25,.8,.25,1)}
#page-folders .ig-ls.ig-key[data-fd-seal="ingenium"].r402-ringp .ig-ls-l[data-r="ring"]{animation:r402ringp .7s cubic-bezier(.3,1.4,.5,1)}
#page-folders .ig-ls.ig-key[data-fd-seal="ingenium"].r402-stone .ig-ls-l[data-r="dot"]{animation:r402stone .9s ease-in-out}
@keyframes r402star{0%{rotate:0deg}100%{rotate:-360deg}}
@keyframes r402ringp{0%{scale:1}35%{scale:1.12}65%{scale:.97}100%{scale:1}}
@keyframes r402stone{0%,100%{scale:1}20%{scale:1.3}40%{scale:1}60%{scale:1.22}80%{scale:1}}
body[data-motion="minimal"] #page-folders .ig-ls.ig-key.r402-f,body[data-motion="minimal"] #page-folders .ig-ls.ig-key.r402-up,
body[data-motion="minimal"] #page-folders .ig-ls.ig-key.r402-f .ig-ls-l{animation:none!important}
body[data-motion="minimal"] #page-folders .ig-ls.ig-key{transition:none}
</style>
<script>try{(window.__ingParts=window.__ingParts||{})["p402"]="started";}catch(_){}
/* R402 · Ingenia: each app's logo a real button, with the seal key's fidget play: see the note at the top of its styles. window.IngAppKeyPress */
(function r402(){
"use strict";
if(window.IngAppKeyPress)return;
var W=window,D=document,ALL=["hop","knock","spin","wobble","pulse","lift"],ING=["star","hop","ringp","wobble","knock","stone"],last={},downAt=0,HELD=null;
function minimal(){try{return D.body.getAttribute("data-motion")==="minimal";}catch(e){return false;}}
function page(){return D.getElementById("page-folders");}
function deco(k){if(!k.querySelector(":scope > .r402-glow")){var g=D.createElement("span");g.className="r402-glow";k.appendChild(g);}
}
function pick(k){var ing=k.getAttribute("data-fd-seal")==="ingenium",set=ing?ING:ALL,id=k.getAttribute("data-fd-seal")||"app",prev=last[id],n;
  do{n=set[Math.floor(Math.random()*set.length)];}while(n===prev&&set.length>1);last[id]=n;return n;}
var CLS=["r402-f","r402-hop","r402-knock","r402-spin","r402-wobble","r402-pulse","r402-lift","r402-big","r402-star","r402-ringp","r402-stone","r402-up"];
function clear(k){CLS.forEach(function(c){k.classList.remove(c);});}
function play(k,held){if(!k||minimal())return null;deco(k);clear(k);void k.offsetWidth;
  var n=held?"big":pick(k),cls=["r402-f"],ing=k.getAttribute("data-fd-seal")==="ingenium";
  if(n==="star"||n==="ringp"||n==="stone"){cls=[ "r402-up","r402-"+n];if(n==="stone"){var g=k.querySelector(":scope > .r402-glow");if(g)g.classList.add("warm");}}
  else{cls.push("r402-"+n);if(ing&&n==="big")cls.push("r402-star");}
  cls.forEach(function(c){k.classList.add(c);});
  clearTimeout(k.__r402);k.__r402=setTimeout(function(){clear(k);var g=k.querySelector(":scope > .r402-glow");if(g)g.classList.remove("warm");},n==="big"?1300:1000);
  k.setAttribute("data-r402",n);return n;}
/* listened for on the whole document: Ingenia makes its page, and its logos, again as she works (r208, r263, r300, r378) */
/* the logo under the press: found by where the press lands (its layers let the pointer through to the folder's head beneath) */
function keyOf(e){var pg=page();if(!pg||!pg.offsetParent)return null;var ks=pg.querySelectorAll(".ig-ls.ig-key");
  for(var i=0;i<ks.length;i++){var r=ks[i].getBoundingClientRect();if(!r.width)continue;var cx=r.left+r.width/2,cy=r.top+r.height/2,rad=r.width*.56;
    if(Math.pow(e.clientX-cx,2)+Math.pow(e.clientY-cy,2)<=rad*rad)return ks[i];}
  return null;}
function live(k){if(k&&k.isConnected)return k;var pg=page();return pg?pg.querySelector(".ig-ls.ig-key"):null;}
D.addEventListener("pointerdown",function(e){var k=keyOf(e);if(!k)return;HELD=k;downAt=Date.now();deco(k);clear(k);},{passive:true,capture:true});
D.addEventListener("pointerup",function(){var k=HELD;HELD=null;if(!k)return;var held=Date.now()-downAt>600;setTimeout(function(){play(live(k),held);},10);},{passive:true,capture:true});
D.addEventListener("pointercancel",function(){HELD=null;},{passive:true,capture:true});
D.addEventListener("keydown",function(e){var k=e.target;if(!(k&&k.classList&&k.classList.contains("ig-key")&&k.closest&&k.closest("#page-folders")))return;if((e.key==="Enter"||e.key===" ")&&!e.repeat)setTimeout(function(){play(live(k),false);},150);},true);
W.IngAppKeyPress={play:play,sets:{all:ALL,ingenium:ING}};
try{window.__ingParts["p402"]="running";}catch(_){}
})();
</script>
