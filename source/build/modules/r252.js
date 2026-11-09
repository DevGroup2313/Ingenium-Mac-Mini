<style id="r252-css">
/* ============ R252 · HOME'S SPARKS, DRAWN BY THE GRAPHICS CHIP (Ingenium 6.54, 7 November 2026) ============
   Her words (7 November 2026): "I want the 3D look and animation of build 6.8.7, I want everything else to stay the same in Ingenium."
   6.54 gives back every animation 6.53 had rested. Home's app stones sparkle as they did: a white four-pointed star at a corner or
   at the middle of the top or foot, one at a time, growing to its size and back with a gilt glow, on each stone's own beat. They were
   drawn as six growing backgrounds of one layer behind four glows, so every frame the page worked the stone's styles out again and
   drew the four glows anew, all the time, on all seven stones: measured on the 6.54 test page in Chromium with the computer slowed
   four times, Home was busy 80 % of the time with nothing touched (11.5 % without the sparks). The spark is now a picture of its own,
   grown from the same point to the same size on the same beat (the same keyframes, from nothing to its size and back, in straight
   lines) by scaling, which the graphics chip does by itself; its glow is drawn once. One such picture for each stone (not six), as
   the page works out again the style of every moving thing whenever the pointer changes what it is on. */
.hx-app .hx-stone::before{content:none !important}
/* one spark at a time on each stone, so one picture for each stone: as large as the stone, its star of 17px at its corner; it is moved
   to each place while it is nothing (in a hundredth of a per cent of the beat) and grows there. translate(x%,y%) scale(s)
   translate(-17x px,-17y px) puts the star's own x% y% point at the stone's x% y% point and grows it from there, as a background of
   17px at x% y% grows: the same place, the same size at every moment */
.hx-sparks{position:absolute;left:0;top:0;width:100%;height:100%;pointer-events:none;z-index:2;transform-origin:0 0;
  transform:translate(7%,16%) scale(0) translate(-1.19px,-2.72px);
  background:url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZD0iTTEyIDAgTDEzLjMgMTAuNyBMMjQgMTIgTDEzLjMgMTMuMyBMMTIgMjQgTDEwLjcgMTMuMyBMMCAxMiBMMTAuNyAxMC43IFoiIGZpbGw9IiNmZmYiLz48L3N2Zz4=") 0 0/17px 17px no-repeat;
  filter:drop-shadow(0 0 2px rgba(255,255,255,1)) drop-shadow(0 0 6px rgba(255,255,255,.95)) drop-shadow(0 0 12px rgba(255,250,232,.8)) drop-shadow(0 0 24px rgba(226,190,112,.7));
  animation:hxSpark var(--sp-d,9.2s) linear var(--sp-l,0s) infinite}
/* hxGlitter's keyframes (the star at 7% 16% grows to 17px from 4% to 8% and is gone at 12%, then at 50% 4% to 13px, ...); sizes
   17, 16, 15, 13, 12 and 11px are scales 1, .941, .882, .765, .706 and .647 */
@keyframes hxSpark{0%,4%{transform:translate(7%,16%) scale(0) translate(-1.19px,-2.72px)}8%{transform:translate(7%,16%) scale(1) translate(-1.19px,-2.72px)}12%{transform:translate(7%,16%) scale(0) translate(-1.19px,-2.72px)}12.01%{transform:translate(50%,4%) scale(0) translate(-8.5px,-0.68px)}16%{transform:translate(50%,4%) scale(0.765) translate(-8.5px,-0.68px)}19%{transform:translate(50%,4%) scale(0) translate(-8.5px,-0.68px)}19.01%{transform:translate(93%,84%) scale(0) translate(-15.81px,-14.28px)}24%{transform:translate(93%,84%) scale(0.882) translate(-15.81px,-14.28px)}28%{transform:translate(93%,84%) scale(0) translate(-15.81px,-14.28px)}28.01%{transform:translate(50%,96%) scale(0) translate(-8.5px,-16.32px)}34%{transform:translate(50%,96%) scale(0.706) translate(-8.5px,-16.32px)}37%{transform:translate(50%,96%) scale(0) translate(-8.5px,-16.32px)}37.01%{transform:translate(93%,16%) scale(0) translate(-15.81px,-2.72px)}41%{transform:translate(93%,16%) scale(0.941) translate(-15.81px,-2.72px)}45%{transform:translate(93%,16%) scale(0) translate(-15.81px,-2.72px)}45.01%{transform:translate(50%,4%) scale(0) translate(-8.5px,-0.68px)}52%{transform:translate(50%,4%) scale(0.647) translate(-8.5px,-0.68px)}55%{transform:translate(50%,4%) scale(0) translate(-8.5px,-0.68px)}55.01%{transform:translate(7%,84%) scale(0) translate(-1.19px,-14.28px)}58%{transform:translate(7%,84%) scale(0.882) translate(-1.19px,-14.28px)}62%{transform:translate(7%,84%) scale(0) translate(-1.19px,-14.28px)}62.01%{transform:translate(50%,4%) scale(0) translate(-8.5px,-0.68px)}68%{transform:translate(50%,4%) scale(0.882) translate(-8.5px,-0.68px)}71%{transform:translate(50%,4%) scale(0) translate(-8.5px,-0.68px)}71.01%{transform:translate(7%,16%) scale(0) translate(-1.19px,-2.72px)}75%{transform:translate(7%,16%) scale(1) translate(-1.19px,-2.72px)}79%{transform:translate(7%,16%) scale(0) translate(-1.19px,-2.72px)}79.01%{transform:translate(50%,96%) scale(0) translate(-8.5px,-16.32px)}84%{transform:translate(50%,96%) scale(0.765) translate(-8.5px,-16.32px)}87%{transform:translate(50%,96%) scale(0) translate(-8.5px,-16.32px)}87.01%{transform:translate(93%,84%) scale(0) translate(-15.81px,-14.28px)}90%{transform:translate(93%,84%) scale(0.941) translate(-15.81px,-14.28px)}94%,100%{transform:translate(93%,84%) scale(0) translate(-15.81px,-14.28px)}}
/* as before: no sparks with Display's Minimal motion, in Calm, or when the computer asks for less motion */
body[data-motion="minimal"] .hx-sparks,body[data-calm="1"] .hx-sparks{animation:none;visibility:hidden}
@media (prefers-reduced-motion:reduce){.hx-sparks{animation:none;visibility:hidden}}
</style>
<script>try{(window.__ingParts=window.__ingParts||{})["p252"]="started";}catch(_){}
/* R252 · each app stone on Home gets its spark, on the beat its stone had (modules/r147.js builds the stones; jewels.css gives
   each its own beat and start) */
(function r252(){
"use strict";
if(window.__r252)return;window.__r252=1;
var D=document;
function beat(stone,box){try{var c=getComputedStyle(stone,"::before"),d=c.animationDuration,l=c.animationDelay;
    if(d&&d!=="0s"&&box.style.getPropertyValue("--sp-d")!==d)box.style.setProperty("--sp-d",d);
    if(l&&box.style.getPropertyValue("--sp-l")!==l)box.style.setProperty("--sp-l",l);}catch(e){}}
function dress(){var st=D.querySelectorAll(".hx-app .hx-stone");for(var i=0;i<st.length;i++){var s=st[i],box=null;
    for(var k=0;k<s.children.length;k++)if(s.children[k].className==="hx-sparks"){box=s.children[k];break;}
    if(!box){box=D.createElement("i");box.className="hx-sparks";box.setAttribute("aria-hidden","true");
      s.appendChild(box);}
    beat(s,box);}}
var soon=0;function later(){if(soon)return;soon=setTimeout(function(){soon=0;try{dress();}catch(e){}},60);}
try{dress();}catch(e){}
/* the stones are made again when Home's lists change: sparks for any stone that has none (adding them is itself a change, after
   which every stone has its sparks and nothing more is written) */
function watch(){var h=D.getElementById("page-home");if(!h||h.__r252)return!!h;h.__r252=1;
  try{new MutationObserver(function(ms){for(var i=0;i<ms.length;i++){var a=ms[i].addedNodes;for(var j=0;j<a.length;j++){var n=a[j];
      if(n.nodeType===1&&n.className!=="hx-sparks"&&(n.matches(".hx-app,.hx-stone")||n.querySelector(".hx-stone"))){later();return;}}}})
    .observe(h,{childList:true,subtree:true});}catch(e){}return true;}
(function w(n){if(watch()){later();return;}if(n<120)setTimeout(function(){w(n+1);},500);})(0);
window.IngSparks={dress:dress,version:1};
})();
;try{window.__ingParts["p252"]="running";}catch(_){}
</script>
