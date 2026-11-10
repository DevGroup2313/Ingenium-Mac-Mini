<style id="r261-css">
/* ============ R261 · HOME AS AN ORRERY (Ingenium 6.67, 10 November 2026) ============
   Her choice after the previews of 10 November 2026: the Orrery, "I want this version for the rest", with her seal as the engine
   at its centre and the six rooms as orbs around it. Her words that shape it: "I want Ingenium's engine to continuously be spinning
   and have it counterclockwise animation"; "I don't want the circle around the logo seal. The big one can stay ... I also don't
   want it to be gold"; "Remove the sphere from Fabrica!"; "Remove the tiny moon from Build as well. I think the rooms should follow
   whatever direction looks best and works for the app"; "The Bring your model and Take the guide tour button are too wide and long
   for no reason. I want the original look and animation preserved"; "Remove the 'Read the short Guide' from the card on the Home
   page, it looks neater without it"; and "I want the orbs to actually feel like 3D buttons like Ingenium's logo instead of their
   current weird animations. I want full parity with the rest of the app. I also don't want Ingenium's Engine to look flat either."
   Home's own parts are moved in whole, so each keeps what it does. The seal key (R175, drawn in R104's layers) stands at the centre,
   larger, its layers standing further apart and its rim given a little thickness, so it reads as a raised seal and not a flat disc;
   its star turns counterclockwise without stopping (slower in Calm, still in Minimal motion and under the system's reduced motion),
   and every press still plays one of its flourishes. The six room keys ride one orbit counterclockwise with the engine, nearer ones
   larger; by day the orbs wear Ingenium's own day violets (her keys' and her purple button's), by night each room its own purple
   ("I want you to match the orbs page buttons colours to Ingenium's colours in day mode ... the current colours look best on Dark
   mode"). Each is an orb drawn in layers as the seal is (its shadow, the ball, a glare that follows the pointer, the room's mark
   standing above the ball): at rest it sways a little, as the seal does; under a mouse it tilts to follow it and lifts; pressed, it
   sinks; it keeps its sound (R176), its words, its status and its place in the tour. Pointing at a room, or reaching it with the Tab
   key, slows the orbit to a stop and brings that room near with what it holds; the tour holds the orbit still while it runs. The
   greeting and the rooms' names are in Ingenium's own Cormorant (Lector's, so it looks the same offline). The next-step card keeps
   its keys at their own width with their own lift and press, without "Read the short guide". Where Home is narrower than 760
   pixels it keeps its former head and grid of rooms. */
#page-home #hx.ox-on .hx-head{display:block;position:relative;height:var(--ox-h,700px);padding:0;gap:0;border:0;border-radius:30px;overflow:hidden;isolation:isolate;
  touch-action:pan-y;-webkit-user-select:none;user-select:none;
  background:radial-gradient(ellipse 70% 60% at 50% 64%,#fdfbff 0%,#f4eefb 46%,#e8def5 100%);
  box-shadow:inset 0 0 0 1px rgba(106,63,181,.10),0 1px 1px rgba(40,22,68,.04),0 4px 6px rgba(40,22,68,.04),0 14px 28px rgba(40,22,68,.07),0 34px 60px rgba(40,22,68,.08);
  --ox-line:rgba(106,63,181,.30);--ox-line2:rgba(106,63,181,.20);--ox-chart:rgba(106,63,181,.20);--ox-star:#8c6ad0;--ox-starop:.35;--ox-disc:rgba(106,63,181,.16);
  --ox-shade:rgba(40,22,68,.30);--ox-card:rgba(255,255,255,.72);--ox-cardring:rgba(106,63,181,.12);--ox-cardsh:0 2px 4px rgba(40,22,68,.05),0 12px 30px rgba(40,22,68,.12);
  --ox-rim0:#ddd2ef;--ox-rim1:#a891d4;--ox-kdsh:0 10px 26px rgba(40,22,68,.16)}
body[data-theme="night"] #page-home #hx.ox-on .hx-head{background:radial-gradient(ellipse 70% 60% at 50% 64%,#241a38 0%,#161024 50%,#0c0915 100%);
  box-shadow:inset 0 0 0 1px rgba(205,184,240,.10),0 14px 28px rgba(0,0,0,.45),0 34px 60px rgba(0,0,0,.4);
  --ox-line:rgba(196,176,238,.30);--ox-line2:rgba(196,176,238,.18);--ox-chart:rgba(196,176,238,.16);--ox-star:#f3e7c8;--ox-starop:.6;--ox-disc:rgba(150,112,224,.18);
  --ox-shade:rgba(0,0,0,.62);--ox-card:rgba(33,26,45,.7);--ox-cardring:rgba(205,184,240,.14);--ox-cardsh:0 12px 30px rgba(0,0,0,.5);
  --ox-rim0:#43375e;--ox-rim1:#1d1729;--ox-kdsh:0 10px 26px rgba(0,0,0,.5)}
#page-home #hx.ox-on .hx-head::before,#page-home #hx.ox-on .hx-head::after{display:none}
#hx:not(.ox-on) .ox-deco{display:none}
/* the sky, the orbit and the words under it */
#page-home #hx.ox-on .ox-stars{position:absolute;inset:0;z-index:0;pointer-events:none}
#page-home #hx.ox-on .ox-stars i{position:absolute;width:2px;height:2px;border-radius:50%;background:var(--ox-star);opacity:var(--ox-starop);animation:oxTw 5s ease-in-out infinite}
@keyframes oxTw{0%,100%{opacity:.15}50%{opacity:.7}}
#page-home #hx.ox-on .ox-chart{position:absolute;inset:0;width:100%;height:100%;z-index:0;pointer-events:none}
#page-home #hx.ox-on .ox-chart g{fill:none;stroke:var(--ox-chart);stroke-width:.6}
#page-home #hx.ox-on .ox-stage{position:absolute;inset:0;z-index:2;pointer-events:none}
#page-home #hx.ox-on .ox-plane{position:absolute;left:50%;top:var(--ox-cy,63%);width:1000px;height:1000px;margin:-500px 0 0 -500px;transform:rotateX(70deg) scale(var(--ox-k,1))}
#page-home #hx.ox-on .ox-plane svg{display:block;width:100%;height:100%;overflow:visible}
#page-home #hx.ox-on .ox-ring{fill:none;stroke:var(--ox-line);stroke-width:1.3;vector-effect:non-scaling-stroke}
#page-home #hx.ox-on .ox-ring.r2{stroke:var(--ox-line2);stroke-dasharray:5 7}
#page-home #hx.ox-on .ox-ring.r3{stroke:var(--ox-line2)}
#page-home #hx.ox-on .ox-disc-a{stop-color:var(--ox-disc)}
#page-home #hx.ox-on .ox-disc-b{stop-color:var(--ox-disc);stop-opacity:0}
#page-home #hx.ox-on .ox-shadow{position:absolute;left:0;top:0;width:84px;height:20px;margin:-10px 0 0 -42px;border-radius:50%;pointer-events:none;
  background:radial-gradient(closest-side,var(--ox-shade),rgba(0,0,0,0))}
#page-home #hx.ox-on .ox-legend{position:absolute;left:40px;bottom:24px;z-index:5;font:italic 500 16px/1.4 "Home Cormorant","Cormorant Garamond",Cormorant,var(--x-serif);
  color:var(--x-ink3);pointer-events:none}
/* the greeting */
#page-home #hx.ox-on .hx-htext{position:absolute;left:40px;top:34px;z-index:5;width:auto;max-width:var(--ox-tw,520px)}
#page-home #hx.ox-on .hx-hello{margin:12px 0 10px;font:600 var(--ox-hs,48px)/1.04 "Home Cormorant","Cormorant Garamond",Cormorant,var(--x-serif);letter-spacing:.004em;color:var(--x-ink1)}
#page-home #hx.ox-on .hx-lede{margin:0;font-size:14.5px;line-height:1.55;max-width:44ch;color:var(--x-ink2)}
/* the next step: Home's own card on a clear plate, its keys as they are */
#page-home #hx.ox-on .hx-next{position:absolute;right:34px;top:34px;z-index:6;width:var(--ox-cw,500px);margin:0;padding:16px 18px;border:0;border-radius:20px;
  background:var(--ox-card);-webkit-backdrop-filter:blur(14px);backdrop-filter:blur(14px);box-shadow:inset 0 0 0 1px var(--ox-cardring),var(--ox-cardsh);
  animation:oxIn .9s cubic-bezier(.22,1,.36,1) .3s backwards}
@keyframes oxIn{0%{opacity:0;transform:translate(40px,-10px)}100%{opacity:1;transform:none}}
#page-home #hx.ox-on #hxGuide{display:none}
#page-home #hx.ox-on .hx-next > .hx-row.ox-empty{display:none}
/* the engine: her seal key, larger, in more depth, its star turning counterclockwise without stopping */
#page-home #hx.ox-on .hx-head .hx-seal{position:absolute;left:50%;top:var(--ox-cy,63%);z-index:40;width:var(--ox-sun,132px);height:var(--ox-sun,132px);margin:0;
  transform:translate(-50%,-62%)}
#page-home #hx.ox-on .hx-head .hx-seal::after{content:"";position:absolute;left:-12%;top:100%;z-index:-1;width:124%;height:22px;margin-top:12px;border-radius:50%;
  background:radial-gradient(closest-side,var(--ox-shade),rgba(0,0,0,0));opacity:.85;pointer-events:none}
#page-home #hx.ox-on #hxSeal .isl .isl-ring{--fz:.11;--fk:.9725}
#page-home #hx.ox-on #hxSeal .isl .isl-star{--fz:.2;--fk:.95}
#page-home #hx.ox-on #hxSeal .isl .isl-heart{--fz:.36;--fk:.91}
#page-home #hx.ox-on #hxSeal .isl .ox-rim{position:absolute;left:2.6%;top:2.6%;width:94.8%;height:94.8%;border-radius:50%;display:block;pointer-events:none;
  background:linear-gradient(160deg,var(--ox-rim0),var(--ox-rim1));transform:translateZ(calc(var(--S) * -.012 * var(--k)))}
@keyframes oxEngine{from{transform:rotate(0deg)}to{transform:rotate(-360deg)}}
#page-home #hx.ox-on #hxSeal .seal-spin{animation:oxEngine 9s linear infinite}
body[data-motion="calm"] #page-home #hx.ox-on #hxSeal .seal-spin{animation-duration:13s}
body[data-motion="minimal"] #page-home #hx.ox-on #hxSeal .seal-spin{animation:none}
@media (prefers-reduced-motion:reduce){#page-home #hx.ox-on #hxSeal .seal-spin{animation:none}}
/* the rooms: Home's own keys, each an orb on the orbit */
#page-home #hx.ox-on .hx-head .hx-keys{position:absolute;left:0;top:0;width:100%;height:100%;display:block;margin:0;padding:0;gap:0;pointer-events:none}
#page-home #hx.ox-on .hx-head .hx-key{position:absolute;left:0;top:0;z-index:10;width:150px;min-height:0;margin:0;padding:0;gap:0;display:flex;flex-direction:column;
  align-items:center;border:0;border-radius:0;background:none;box-shadow:none;text-align:center;overflow:visible;animation:none;transform-origin:75px 56px;
  will-change:transform;transition:opacity .35s ease,filter .35s ease;pointer-events:auto;cursor:pointer;color:inherit;-webkit-tap-highlight-color:transparent}
#page-home #hx.ox-on .hx-head .hx-key:focus{outline:none}
#page-home #hx.ox-on .hx-head .hx-key:focus-visible .hx-jewel::after{content:"";position:absolute;inset:16px;border-radius:50%;box-shadow:0 0 0 2.5px var(--x-acc);pointer-events:none}
#page-home #hx.ox-on .hx-head .hx-jewel{position:relative;display:block;width:112px;height:112px;flex:0 0 auto;border-radius:0;background:none;box-shadow:none;transform:none;
  transition:none;color:#fff}
#page-home #hx.ox-on .hx-head .hx-kt{display:contents}
#page-home #hx.ox-on .hx-head .hx-kh{margin-top:-12px;font:600 21px/1.1 "Home Cormorant","Cormorant Garamond",Cormorant,var(--x-serif);letter-spacing:.03em;color:var(--x-ink1)}
#page-home #hx.ox-on .hx-head .hx-km{margin-top:5px;font-size:11.5px;max-width:none;overflow:visible}
#page-home #hx.ox-on .hx-head .hx-kd{position:absolute;left:50%;top:100%;width:230px;margin:10px 0 0 -115px;padding:10px 12px;border-radius:14px;background:var(--x-hi);
  color:var(--x-ink2);box-shadow:inset 0 0 0 1px var(--x-hair),var(--ox-kdsh);font-size:12.5px;line-height:1.45;text-align:center;opacity:0;transform:translateY(-6px);
  transition:opacity .25s ease,transform .3s cubic-bezier(.22,1,.36,1);pointer-events:none}
#page-home #hx.ox-on .hx-head .hx-key.ox-near .hx-kd{opacity:1;transform:none}
#page-home #hx.ox-on .hx-head .hx-key.ox-up .hx-kd{top:auto;bottom:100%;margin:0 0 8px -115px;transform:translateY(6px)}
#page-home #hx.ox-on .hx-head .hx-key.ox-up.ox-near .hx-kd{transform:none}
#page-home #hx.ox-on .hx-head .hx-arrow{display:none}
#page-home #hx.ox-on .hx-head.ox-hold .hx-key:not(.ox-near){opacity:.6}
body[data-theme="night"] #page-home #hx.ox-on .hx-head.ox-hold .hx-key:not(.ox-near){opacity:.55;filter:saturate(.7)}
#page-home #hx.ox-on .hx-work{display:none}
/* each orb in layers, as the seal is: its shadow, the ball, a glare, the room's mark above the ball */
#hx:not(.ox-on) .oxo,#hx:not(.ox-on) .oxo-tilt,#hx:not(.ox-on) .oxo-idle,#hx:not(.ox-on) .oxo-ico{display:contents}
#hx:not(.ox-on) .oxo-cast,#hx:not(.ox-on) .oxo-sph,#hx:not(.ox-on) .oxo-glare{display:none}
#page-home #hx.ox-on .oxo{position:absolute;inset:0;display:block;--S:75px;--rx:0deg;--ry:0deg;--cdl:0px;--cds:1;perspective:calc(var(--S) * 4);pointer-events:none;
  --c0:#c9b6ee;--c1:#9068d6;--c2:#6a3fb5;--c3:#55309a;--c4:#3d2275;--csh:#2a1260;--ct1:.2;--ct2:.4;--ce1:.1;--ce2:.26}
/* by night each room keeps its own purple, as she liked it ("the current colours look best on Dark mode") */
body[data-theme="night"] #page-home #hx.ox-on .oxo{--c0:var(--n0);--c1:var(--n1);--c2:var(--n2);--c3:var(--n3);--c4:var(--n4);--csh:#0b0220;--ct1:.32;--ct2:.6;--ce1:.2;--ce2:.42}
#page-home #hx.ox-on .oxo-tilt{position:absolute;inset:0;display:block;transform-style:preserve-3d;
  transform:rotateX(var(--rx)) rotateY(var(--ry)) translateY(var(--cdl)) scale(var(--cds));transition:transform .35s cubic-bezier(.2,.8,.2,1)}
#page-home #hx.ox-on .oxo-idle{position:absolute;inset:0;display:block;transform-style:preserve-3d;animation:oxSway 8s ease-in-out infinite;animation-delay:var(--od,0s)}
@keyframes oxSway{0%,100%{transform:rotateY(-11deg) rotateX(4deg)}50%{transform:rotateY(11deg) rotateX(-4deg)}}
#page-home #hx.ox-on .oxo-cast{position:absolute;left:30%;right:30%;bottom:11%;height:8%;border-radius:50%;display:block;background:rgba(42,20,80,.24);filter:blur(4px);
  transform:translateZ(calc(var(--S) * -.12));transition:opacity .35s ease,transform .35s ease}
body[data-theme="night"] #page-home #hx.ox-on .oxo-cast{background:rgba(0,0,0,.5)}
#page-home #hx.ox-on .hx-head .hx-jewel svg.oxo-sph{position:absolute;left:0;top:0;width:112px;height:112px;overflow:visible;transform:translateZ(0)}
#page-home #hx.ox-on .oxo-glare{position:absolute;left:16.7%;top:16.7%;width:66.6%;height:66.6%;border-radius:50%;display:block;opacity:0;pointer-events:none;
  background:radial-gradient(circle at var(--gx,34%) var(--gy,28%),rgba(255,255,255,.5) 0%,rgba(255,255,255,0) 48%);transform:translateZ(calc(var(--S) * .02));transition:opacity .3s ease}
#page-home #hx.ox-on .oxo-ico{position:absolute;left:50%;top:50%;width:30px;height:30px;margin:-15px 0 0 -15px;display:block;color:#fff;
  transform:translateZ(calc(var(--S) * .2)) scale(.95);filter:drop-shadow(0 1.5px 1.2px rgba(16,4,40,.55))}
#page-home #hx.ox-on .hx-head .oxo-ico svg{display:block;width:30px;height:30px;stroke-width:1.9}
#page-home #hx.ox-on .oxo.hover{--cdl:calc(var(--S) * -.07)}
#page-home #hx.ox-on .oxo.hover .oxo-idle{animation-play-state:paused}
#page-home #hx.ox-on .oxo.hover .oxo-glare{opacity:1}
#page-home #hx.ox-on .oxo.hover .oxo-cast{opacity:.7;transform:translateZ(calc(var(--S) * -.12)) scale(.9)}
#page-home #hx.ox-on .oxo.down{--cdl:calc(var(--S) * .04);--cds:.95}
#page-home #hx.ox-on .oxo.down .oxo-tilt{transition-duration:.08s}
#page-home #hx.ox-on .oxo.down .oxo-cast{opacity:1;transform:translateZ(calc(var(--S) * -.12)) scale(1.05)}
body[data-motion="minimal"] #page-home #hx.ox-on .oxo-idle,body[data-motion="minimal"] #page-home #hx.ox-on .ox-stars i,
body[data-motion="minimal"] #page-home #hx.ox-on .hx-next{animation:none}
@media (prefers-reduced-motion:reduce){#page-home #hx.ox-on .oxo-idle,#page-home #hx.ox-on .ox-stars i,#page-home #hx.ox-on .hx-next{animation:none}
  #page-home #hx.ox-on .oxo-tilt{transition:none}}
@media (forced-colors:active){#page-home #hx.ox-on .hx-head{border:1px solid CanvasText}}
</style>
<script>try{(window.__ingParts=window.__ingParts||{})["p261"]="started";}catch(_){}
/* R261 · Home as an orrery: see the note at the top of its styles */
(function(){"use strict";
if(window.__r261)return;window.__r261=1;
var D=document,W=window,SVG="http://www.w3.org/2000/svg";
function $(id){return D.getElementById(id);}
function motion(){var m="calm";try{m=D.body.getAttribute("data-motion")||"calm";}catch(e){}
  try{if(W.matchMedia&&matchMedia("(prefers-reduced-motion: reduce)").matches)m="minimal";}catch(e){}return m;}

/* Ingenium's own Cormorant Garamond (Lector's, R108), upright, for the greeting and the rooms' names, so they look the same offline */
(function(){try{var u=(typeof LX7_FONTS!=="undefined"&&LX7_FONTS&&LX7_FONTS["cormorant-600-normal"])||"";if(!u||$("r261-font"))return;
  var st=D.createElement("style");st.id="r261-font";
  st.textContent='@font-face{font-family:"Home Cormorant";font-style:normal;font-weight:600;font-display:swap;src:url('+u+') format("woff2")}';D.head.appendChild(st);}catch(e){}})();

/* ---------- the orbs: each room a little planet in Ingenium's purples, lit from above on the left ---------- */
var LOOK={chat:[["#a57fe8","#6a3fb5","#2e1764"],"bands"],code:[["#9283f2","#4d3db0","#1e1660"],"storm"],build:[["#c48ae8","#8641b8","#3e1760"],"faint"],
  fabrica:[["#b47ad9","#7637a8","#331455"],"dapple"],lector:[["#b9a3f2","#7458c6","#33206c"],"swirl"],focus:[["#9a6be0","#5c31a4","#250f4b"],"aurora"]};
function hex(c){c=c.replace("#","");return [parseInt(c.slice(0,2),16),parseInt(c.slice(2,4),16),parseInt(c.slice(4,6),16)];}
function mix(a,b,t){var A=hex(a),B=hex(b);return "#"+A.map(function(v,i){var n=Math.round(v+(B[i]-v)*t);return (n<16?"0":"")+n.toString(16);}).join("");}
function wave(y,c,o,w,d){return '<path d="M20 '+y+' q20 '+(d||-2.6)+' 40 0 t40 0" fill="none" stroke="'+c+'" stroke-opacity="'+o+'" stroke-width="'+w+'"/>';}
function surface(k){
  if(k==="bands")return wave(33,"#fff",.13,3.4)+wave(44,"#1a0840",.15,4.4)+wave(56,"#fff",.10,3)+wave(68,"#1a0840",.13,5)+wave(80,"#fff",.12,3.6)+wave(90,"#1a0840",.12,3);
  if(k==="storm")return wave(48,"#fff",.12,3,-5)+wave(79,"#1a0840",.16,4,5)+'<ellipse cx="72" cy="66" rx="10" ry="5.4" fill="#fff" opacity=".24"/><ellipse cx="72" cy="66" rx="4.8" ry="2.4" fill="#1a0840" opacity=".28"/>';
  if(k==="swirl")return '<path d="M16 44 c18 -14 34 10 56 -4 s22 4 28 2" fill="none" stroke="#fff" stroke-opacity=".17" stroke-width="4" stroke-linecap="round"/>'+
    '<path d="M20 72 c20 14 36 -12 58 4 s16 2 22 0" fill="none" stroke="#fff" stroke-opacity=".11" stroke-width="5" stroke-linecap="round"/>';
  if(k==="aurora")return '<ellipse cx="60" cy="27" rx="22" ry="7.5" fill="#efe3ff" opacity=".24"/><ellipse cx="60" cy="27" rx="12" ry="3.8" fill="#fff" opacity=".24"/>'+wave(38,"#e6d6ff",.14,3,4);
  if(k==="dapple")return '<circle cx="38" cy="44" r="6" fill="#fff" opacity=".08"/><circle cx="70" cy="62" r="8" fill="#1a0840" opacity=".12"/>'+
    '<circle cx="50" cy="80" r="5" fill="#fff" opacity=".07"/><circle cx="86" cy="36" r="4" fill="#1a0840" opacity=".10"/>';
  if(k==="faint")return wave(52,"#fff",.09,5,-3)+wave(74,"#1a0840",.12,4,3);
  return "";}
var NS=0;
function sphere(look){var id="oxs"+(++NS),R=' transform="rotate(44 60 60)"',c=function(n,o){return ' style="stop-color:var(--'+n+')'+(o?';stop-opacity:var(--'+o+')':'')+'"';};
  return '<svg class="oxo-sph" viewBox="0 0 120 120" aria-hidden="true" focusable="false"><defs>'+
    '<radialGradient id="'+id+'b" cx=".36" cy=".5" r=".74" fx=".2" fy=".5"><stop offset="0"'+c('c0')+'/><stop offset=".16"'+c('c1')+'/><stop offset=".52"'+c('c2')+'/><stop offset=".86"'+c('c3')+'/><stop offset="1"'+c('c4')+'/></radialGradient>'+
    '<linearGradient id="'+id+'t" x1="0" y1="0" x2="1" y2="0"><stop offset=".4" stop-opacity="0"'+c('csh')+'/><stop offset=".76"'+c('csh','ct1')+'/><stop offset="1"'+c('csh','ct2')+'/></linearGradient>'+
    '<radialGradient id="'+id+'e" cx=".5" cy=".5" r=".5"><stop offset=".7" stop-opacity="0"'+c('csh')+'/><stop offset=".93"'+c('csh','ce1')+'/><stop offset="1"'+c('csh','ce2')+'/></radialGradient>'+
    '<radialGradient id="'+id+'s" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#fff" stop-opacity=".95"/><stop offset=".32" stop-color="#fff" stop-opacity=".45"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient>'+
    '<linearGradient id="'+id+'r" x1="0" y1="0" x2="1" y2="0"><stop offset=".6" stop-opacity="0"'+c('c0')+'/><stop offset="1" stop-opacity=".75"'+c('c0')+'/></linearGradient>'+
    '<clipPath id="'+id+'c"><circle cx="60" cy="60" r="40"/></clipPath><filter id="'+id+'g" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="1"/></filter></defs>'+
    '<g'+R+'><circle cx="60" cy="60" r="40" fill="url(#'+id+'b)"/></g>'+
    '<g clip-path="url(#'+id+'c)">'+surface(look[1])+'</g>'+
    '<g'+R+'><g clip-path="url(#'+id+'c)"><rect x="18" y="18" width="84" height="84" fill="url(#'+id+'t)"/></g>'+
      '<circle cx="60" cy="60" r="39" fill="none" stroke="url(#'+id+'r)" stroke-width="1.8" filter="url(#'+id+'g)"/></g>'+
    '<circle cx="60" cy="60" r="40" fill="url(#'+id+'e)"/>'+
    '<g'+R+'><ellipse cx="40.5" cy="60" rx="10.5" ry="15" fill="url(#'+id+'s)"/><circle cx="36.5" cy="56.5" r="2.8" fill="#fff" opacity=".92" filter="url(#'+id+'g)"/></g></svg>';}

/* ---------- the orbit ---------- */
var hx=null,head=null,box=null,work=null,stage=null,keys=[],on=false,turn=0,vel=0,last=0,drag=null,moved=0,hold=null,raf=0,R0=430,CY=.63,
  TILT=Math.cos(70*Math.PI/180),sweeping=0;
function speed(){var m=motion();return m==="minimal"?0:(m==="full"?.000085:.00006);}
function still(){return motion()==="minimal";}

/* each orb answers the pointer as the seal does (R104, R175): it tilts to follow a mouse and lifts under it; pressed, it sinks */
function wireOrb(k,o){
  k.addEventListener("pointerenter",function(e){if(on&&e.pointerType==="mouse"&&!still())o.classList.add("hover");});
  k.addEventListener("pointermove",function(e){if(!on)return;var r=o.getBoundingClientRect();if(!r.width)return;
    var x=(e.clientX-r.left)/r.width,y=(e.clientY-r.top)/r.height;
    o.style.setProperty("--gx",(x*100).toFixed(1)+"%");o.style.setProperty("--gy",(y*100).toFixed(1)+"%");
    if(e.pointerType==="mouse"&&!still()){x=Math.max(-.25,Math.min(1.25,x));y=Math.max(-.25,Math.min(1.25,y));
      o.style.setProperty("--ry",((x-.5)*28).toFixed(1)+"deg");o.style.setProperty("--rx",(-(y-.5)*24).toFixed(1)+"deg");}},{passive:true});
  k.addEventListener("pointerleave",function(){o.classList.remove("hover","down");o.style.setProperty("--rx","0deg");o.style.setProperty("--ry","0deg");});
  k.addEventListener("pointerdown",function(){if(on&&!still())o.classList.add("down");},{passive:true});
  ["pointerup","pointercancel"].forEach(function(t){k.addEventListener(t,function(e){o.classList.remove("down");if(e.pointerType!=="mouse")o.classList.remove("hover");},{passive:true});});
  k.addEventListener("keydown",function(e){if(!on||still())return;if(e.key==="Enter"||e.key===" "){o.classList.add("down");setTimeout(function(){o.classList.remove("down");},140);}});
  k.addEventListener("focus",function(){try{if(on&&!still()&&k.matches(":focus-visible"))o.classList.add("hover");}catch(e){}});
  k.addEventListener("blur",function(){o.classList.remove("hover","down");});}
function dress(k,i){var o=k.querySelector(".oxo");if(o)return o;var j=k.querySelector(".hx-jewel");if(!j)return null;
  var look=LOOK[k.getAttribute("data-go")||""]||LOOK.chat,ico=j.querySelector("svg");
  o=D.createElement("span");o.className="oxo";o.setAttribute("aria-hidden","true");o.style.setProperty("--od",(-i*1.35).toFixed(2)+"s");
  var T=look[0];[mix(T[0],"#ffffff",.5),T[0],T[1],T[2],mix(T[2],"#000000",.42)].forEach(function(v,n){o.style.setProperty("--n"+n,v);});
  o.innerHTML='<span class="oxo-tilt"><span class="oxo-idle"><i class="oxo-cast"></i>'+sphere(look)+'<i class="oxo-glare"></i><span class="oxo-ico"></span></span></span>';
  if(ico)o.querySelector(".oxo-ico").appendChild(ico);
  j.appendChild(o);wireOrb(k,o);return o;}
function near(p,v){if(v){hold=p;head.classList.add("ox-hold");p.el.classList.add("ox-near");}
  else{p.el.classList.remove("ox-near");if(hold===p){hold=null;head.classList.remove("ox-hold");}}}

/* the sky and the orbit's rings: the larger ring round the seal stays, in purple, with no circle hugging the seal */
function decorate(){if(head.querySelector(".ox-stars"))return;
  var s=D.createElement("div");s.className="ox-stars ox-deco";s.setAttribute("aria-hidden","true");
  for(var i=0;i<70;i++){var t=D.createElement("i");t.style.left=(Math.random()*100).toFixed(2)+"%";t.style.top=(Math.random()*100).toFixed(2)+"%";
    t.style.animationDelay=(-Math.random()*5).toFixed(2)+"s";s.appendChild(t);}
  var c=D.createElementNS(SVG,"svg");c.setAttribute("class","ox-chart ox-deco");c.setAttribute("viewBox","0 0 1200 660");c.setAttribute("preserveAspectRatio","none");c.setAttribute("aria-hidden","true");
  c.innerHTML='<g><path d="M80 520 L210 470 L300 500 L420 430"/><path d="M880 140 L960 210 L1060 190 L1120 260"/><circle cx="600" cy="420" r="560" stroke-dasharray="2 10"/></g>';
  stage=D.createElement("div");stage.className="ox-stage ox-deco";stage.setAttribute("aria-hidden","true");
  stage.innerHTML='<div class="ox-plane"><svg viewBox="0 0 1000 1000"><defs><radialGradient id="oxDisc" cx=".5" cy=".5" r=".5"><stop class="ox-disc-a" offset="0"/><stop class="ox-disc-b" offset=".68"/></radialGradient></defs>'+
    '<circle cx="500" cy="500" r="150" fill="url(#oxDisc)"/><circle class="ox-ring r1" cx="500" cy="500" r="150"/><circle class="ox-ring r2" cx="500" cy="500" r="280"/><circle class="ox-ring r3" cx="500" cy="500" r="430"/></svg></div>';
  var l=D.createElement("div");l.className="ox-legend ox-deco";l.setAttribute("aria-hidden","true");l.textContent="Point at a room to bring it near; press to enter.";
  head.insertBefore(c,head.firstChild);head.insertBefore(s,head.firstChild);head.appendChild(stage);head.appendChild(l);}

/* the seal's rim, given a little thickness behind its face (only Home's seal, only here) */
function rim(){var e=head&&head.querySelector("#hxSeal .isl-edge");if(!e||e.querySelector(".ox-rim"))return;
  for(var k=4;k>=1;k--){var i=D.createElement("i");i.className="ox-rim";i.setAttribute("aria-hidden","true");i.style.setProperty("--k",String(k));e.insertBefore(i,e.firstChild);}}
/* the row that held "Read the short guide" goes when nothing else in it shows (the wallpapers key may come later) */
function row(){var g=$("hxGuide"),r=g&&g.parentNode;if(!r||!r.classList)return;
  var any=[].some.call(r.children,function(c){return c!==g&&!c.hidden;});r.classList.toggle("ox-empty",!any);}

function layout(w){var big=w>=980;R0=Math.max(220,Math.min(430,w/2-130));CY=big?.63:.66;
  var cw=Math.max(360,Math.min(500,w-40-34-24-420)),tw=Math.max(300,Math.min(520,w-40-34-24-cw)),st=head.style;
  st.setProperty("--ox-h",(big?700:760)+"px");st.setProperty("--ox-cy",Math.round(CY*100)+"%");st.setProperty("--ox-cw",cw+"px");st.setProperty("--ox-tw",tw+"px");
  st.setProperty("--ox-sun",(big?132:112)+"px");st.setProperty("--ox-hs",(tw<420?40:48)+"px");st.setProperty("--ox-k",(R0/430).toFixed(3));}
function enter(){decorate();hx.classList.add("ox-on");if(box.parentNode!==head)head.appendChild(box);
  var list=[].slice.call(box.querySelectorAll(".hx-key"));
  keys=list.map(function(k,i){var p=k.__ox;if(!p){p=k.__ox={el:k,o:null,sh:null,nr:0};
      k.addEventListener("pointerenter",function(){if(on)near(p,true);});k.addEventListener("pointerleave",function(){near(p,false);});
      k.addEventListener("focus",function(){if(on)near(p,true);});k.addEventListener("blur",function(){near(p,false);});}
    p.o=dress(k,i);if(!p.sh||!p.sh.isConnected){p.sh=D.createElement("div");p.sh.className="ox-shadow";stage.appendChild(p.sh);}
    p.a=Math.PI/2+i*2*Math.PI/list.length;return p;});
  rim();row();watchRow();on=true;loop();}
/* the wallpapers key may be shown later by Home (paintHead): its row is looked at again as soon as it changes */
var rowSeen=null;function watchRow(){var g=$("hxGuide"),r=g&&g.parentNode;if(!r||r===rowSeen)return;rowSeen=r;
  try{new MutationObserver(function(){row();}).observe(r,{attributes:true,subtree:true,childList:true,attributeFilter:["hidden"]});}catch(e){}}
function leave(){on=false;hold=null;hx.classList.remove("ox-on");if(head)head.classList.remove("ox-hold");
  if(work&&box&&box.parentNode!==work)work.appendChild(box);
  keys.forEach(function(p){p.el.style.transform="";p.el.style.zIndex="";p.el.classList.remove("ox-near","ox-up");p.up=undefined;if(p.o)p.o.classList.remove("hover","down");});
  ["--ox-h","--ox-cy","--ox-cw","--ox-tw","--ox-sun","--ox-hs","--ox-k"].forEach(function(n){if(head)head.style.removeProperty(n);});}
function mount(){try{
  var h=$("hx");if(!h)return;if(h!==hx){if(on)leave();hx=h;}
  head=hx.querySelector(".hx-head");work=hx.querySelector(".hx-work");box=hx.querySelector(".hx-keys");if(!head||!box)return;
  var w=hx.clientWidth;if(!w)return;
  if(w>=760){layout(w);if(!on||box.parentNode!==head||!hx.classList.contains("ox-on"))enter();else{rim();row();loop();}}
  else if(on)leave();
}catch(e){try{console.warn("Ingenium: Home's orrery",e&&e.message||e);}catch(_){}}}

/* ---------- the motion: the orbit's own slow pace, counterclockwise with the engine; a room held or the tour brings it to a stop ---------- */
function shown(){return on&&head&&head.offsetParent!==null&&D.visibilityState!=="hidden";}
function frame(now){raf=0;if(!on)return;if(!shown()){last=0;setTimeout(loop,700);return;}
  var dt=last?Math.min(50,now-last):16;last=now;
  var touring=false;try{touring=D.body.classList.contains("touring");}catch(e){}
  if(!drag){var want=(hold||touring)?0:speed();vel+=(want-vel)*Math.min(1,dt/(Math.abs(vel)>.0003?900:260));turn+=vel*dt;}
  var w=head.clientWidth,h=head.clientHeight,cx=w/2,cy=h*CY;
  for(var i=0;i<keys.length;i++){var p=keys[i],th=p.a-turn,x=cx+Math.cos(th)*R0,y=cy+Math.sin(th)*R0*TILT,dep=(Math.sin(th)+1)/2;
    p.nr+=((p===hold?1:0)-p.nr)*Math.min(1,dt/170);
    var sc=(.74+.34*dep)*(1+.1*p.nr),lift=18*sc;
    p.el.style.transform="translate("+(x-75).toFixed(1)+"px,"+(y-56-lift).toFixed(1)+"px) scale("+sc.toFixed(3)+")";
    p.el.style.zIndex=String(10+Math.round(dep*40)+(p===hold?60:0));
    /* a room near the front shows what it holds above it, so the words stay inside Home */
    var up=dep>.55;if(up!==p.up){p.up=up;p.el.classList.toggle("ox-up",up);}
    if(p.sh){p.sh.style.transform="translate("+x.toFixed(1)+"px,"+(y+4).toFixed(1)+"px) scale("+(sc*(1-.15*p.nr)).toFixed(3)+")";
      p.sh.style.opacity=((.42+.5*dep)*(1-.3*p.nr)).toFixed(3);}}
  raf=requestAnimationFrame(frame);}
function loop(){if(!raf&&on)raf=requestAnimationFrame(frame);}
/* a drag across the sky spins the orbit, and it slows back to its own pace */
D.addEventListener("pointerdown",function(e){if(!on||e.button!==0||!head||!head.contains(e.target))return;
  if(e.target.closest(".hx-key,.hx-next,.hx-seal,.hx-htext,a,button,input,select,textarea"))return;drag={x:e.clientX,t:performance.now(),v:0};moved=0;},true);
W.addEventListener("pointermove",function(e){if(!drag)return;var now=performance.now(),dx=e.clientX-drag.x;moved+=Math.abs(dx);var dv=dx*.0042;turn+=dv;
  drag.v=dv/Math.max(8,now-drag.t);drag.x=e.clientX;drag.t=now;},{passive:true});
W.addEventListener("pointerup",function(){if(!drag)return;if(moved>6&&!still())vel=Math.max(-.012,Math.min(.012,drag.v));drag=null;});
D.addEventListener("visibilitychange",function(){if(D.visibilityState==="visible")loop();});

function boot(){mount();var h=$("hx");if(!h){setTimeout(boot,700);return;}
  try{new ResizeObserver(function(){mount();}).observe(h);}catch(e){W.addEventListener("resize",mount);}
  /* Home's parts may be redrawn by other parts later (the seal key, the wallpapers key): looked at again, cheaply */
  setInterval(function(){if(!on){if($("hx")&&$("hx").clientWidth>=760)mount();return;}if($("hx")!==hx||!head||!head.isConnected||box.parentNode!==head){mount();return;}rim();row();},2000);}
if(D.readyState==="loading")D.addEventListener("DOMContentLoaded",boot);else boot();
W.IngOrrery={state:function(){return {on:on,turn:turn,vel:vel,R:R0,keys:keys.length,hold:hold?hold.el.getAttribute("data-go"):null,motion:motion()};},
  refresh:mount,spin:function(v){vel=+v||0;}};
try{window.__ingParts["p261"]="running";}catch(_){}
})();
</script>
