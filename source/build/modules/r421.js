<style id="r421-css">
/* ============ R421 · FABRICA: THE APP'S LOGO BY ITS BRANCH A LIVE KEY, ITS NAME WHOLE (Ingenium 8.14, 28 November 2026) ============
   Her words (28 November 2026), with a picture of Fabrica: "make the little app logo on the second panel on the Fabrica page near the
   "main" button ... clickable and animated when I click and hover it like the rest of the app's engine logo button"; "fix the "Ingenium"
   title next to it, the "g" looks clipped at the bottom". So the logo at the head of The work answers as the seal key does: under the
   pointer it leans to follow it and lifts (r112 already turned it), pressed it sinks, let go it springs back and plays a flourish (it
   hops, knocks, spins, wobbles, pulses or lifts its layers; held, a full turn), with Ingenium's key sound; it is reached with the Tab key
   and pressed with Enter or Space. Its name stands on a line tall enough for the letters that hang below it. (The panels' own length:
   r112's fit.) Minimal motion keeps the press and its sound alone. */
#fb #fbWork .f-pn-h h2,#fb .f-pn-h h2{line-height:1.32;padding-bottom:.06em;margin-bottom:-.06em}
/* the panels' own length, with Fabrica's header on as well (r294 set the frame to the window alone) */
#page-fabrica.sk-on #fb{--f-h:calc(var(--f-chrome,12px) + max(640px,calc(100vh - 86px))) !important}
#fb .f-ls.f-key{cursor:pointer;-webkit-tap-highlight-color:transparent;transition:translate .32s cubic-bezier(.3,1.5,.5,1),scale .32s cubic-bezier(.3,1.5,.5,1)}
#fb .f-ls.f-key:focus{outline:none}
#fb .f-ls.f-key:focus-visible{outline:2.5px solid var(--f-acc,#6a3fb5);outline-offset:3px;border-radius:50%}
#fb .f-ls.f-key:hover,#fb .f-ls.f-key.hov{translate:0 calc(var(--S,34px) * -.07)}
#fb .f-ls.f-key.down{translate:0 calc(var(--S,34px) * .08);scale:.9;transition-duration:.07s}
#fb .f-ls.f-key.r421-up{animation:r421up .5s cubic-bezier(.3,1.4,.5,1)}
#fb .f-ls.f-key.r421-hop{animation:r421hop .78s cubic-bezier(.3,.8,.4,1)}
#fb .f-ls.f-key.r421-knock{animation:r421knock .52s cubic-bezier(.34,1.45,.64,1)}
#fb .f-ls.f-key.r421-spin{animation:r421spin .9s cubic-bezier(.3,.8,.25,1)}
#fb .f-ls.f-key.r421-wobble{animation:r421wobble .75s ease-out}
#fb .f-ls.f-key.r421-pulse{animation:r421pulse .7s cubic-bezier(.3,1.4,.5,1)}
#fb .f-ls.f-key.r421-big{animation:r421big 1.25s cubic-bezier(.25,.8,.25,1)}
@keyframes r421up{0%{translate:0 calc(var(--S,34px) * .08);scale:.9}55%{translate:0 calc(var(--S,34px) * -.06);scale:1.06}100%{translate:0 0;scale:1}}
@keyframes r421hop{0%{translate:0 calc(var(--S,34px) * .05);scale:1.06 .9}28%{translate:0 calc(var(--S,34px) * -.24);scale:.95 1.06}55%{translate:0 0;scale:1.08 .9}75%{translate:0 calc(var(--S,34px) * -.05);scale:.98 1.02}100%{translate:0 0;scale:1}}
@keyframes r421knock{0%{scale:.93}42%{scale:1.08}72%{scale:.995}100%{scale:1}}
@keyframes r421spin{0%{rotate:0deg;scale:1}40%{scale:1.08}100%{rotate:360deg;scale:1}}
@keyframes r421wobble{0%{rotate:0deg}18%{rotate:-14deg}36%{rotate:10deg}54%{rotate:-6deg}72%{rotate:3deg}100%{rotate:0deg}}
@keyframes r421pulse{0%{scale:1}30%{scale:1.15}60%{scale:.97}100%{scale:1}}
@keyframes r421big{0%{rotate:0deg;scale:1}25%{scale:1.12}100%{rotate:720deg;scale:1}}
body[data-motion="minimal"] #fb .f-ls.f-key{animation:none!important;transition:none}
</style>
<script>try{(window.__ingParts=window.__ingParts||{})["p421"]="started";}catch(_){}
(function r421(){"use strict";
var W=window,D=document,SET=["hop","knock","spin","wobble","pulse"],last="",downAt=0,HELD=null;
function minimal(){try{return D.body.getAttribute("data-motion")==="minimal";}catch(e){return false;}}
function seal(){var s=D.getElementById("fbWhSeal");return s&&s.classList&&s.classList.contains("f-ls")?s:null;}
function name(){var n=D.getElementById("fbWhName");return n?n.textContent.trim():"";}
function dress(){var s=seal();if(!s||s.__r421)return;s.__r421=1;s.classList.add("f-key");s.setAttribute("role","button");s.setAttribute("tabindex","0");
  var n=name();s.setAttribute("aria-label",(n?n+"'s logo":"The app's logo")+". Press it for fun.");s.title=n?n+": press me":"Press me";}
var CLS=["r421-up","r421-hop","r421-knock","r421-spin","r421-wobble","r421-pulse","r421-big"];
function clear(s){CLS.forEach(function(c){s.classList.remove(c);});}
function play(s,held){if(!s)return;try{if(W.IngSound)IngSound.play("keys");}catch(e){}if(minimal())return;clear(s);void s.offsetWidth;
  var n;if(held)n="big";else{do{n=SET[Math.floor(Math.random()*SET.length)];}while(n===last&&SET.length>1);last=n;}
  s.classList.add("r421-"+n);clearTimeout(s.__t);s.__t=setTimeout(function(){clear(s);},n==="big"?1300:950);}
D.addEventListener("pointerdown",function(e){var s=e.target&&e.target.closest?e.target.closest("#fbWhSeal.f-key"):null;if(!s)return;HELD=s;downAt=Date.now();clear(s);s.classList.add("down");},{passive:true,capture:true});
D.addEventListener("pointerup",function(){var s=HELD;HELD=null;if(!s)return;s.classList.remove("down");var held=Date.now()-downAt>600;var cur=seal()||s;
  if(!minimal()){clear(cur);void cur.offsetWidth;cur.classList.add("r421-up");}setTimeout(function(){play(seal()||cur,held);},120);},{passive:true,capture:true});
D.addEventListener("pointercancel",function(){if(HELD)HELD.classList.remove("down");HELD=null;},{passive:true,capture:true});
D.addEventListener("keydown",function(e){var s=e.target;if(!(s&&s.id==="fbWhSeal"&&s.classList.contains("f-key")))return;if((e.key==="Enter"||e.key===" ")&&!e.repeat){e.preventDefault();play(s,false);}},true);
/* Fabrica draws the head again for each app it opens: the logo it draws is made a key each time */
(function watch(n){var w=D.getElementById("fbWork");if(!w){if(n<480)setTimeout(function(){watch(n+1);},500);return;}dress();
  try{new MutationObserver(function(){dress();}).observe(w,{childList:true,subtree:true});}catch(e){}})(0);
W.IngFabricaLogoKey={play:function(h){play(seal(),!!h);}};
try{window.__ingParts["p421"]="running";}catch(_){}
})();
</script>
