/* CONCEPT 1, deepened (preview only; her choice of 10 November 2026: "I prefer Concept 1 but with some modifications. I want the
   "Good evening, Yannie" to be writing in a different font and size, it looks off compared to the rest of the page. I want the design
   deepened and elevated."). Home as an orrery: the seal key is the sun (moved in whole, untouched), the six rooms are spheres on a gold
   orbit laid on a tilted plane, each casting its shadow on the plane; an astrolabe ring with Roman numerals; gold rays turning slowly
   behind the sun; stars in three depths that shift with the pointer. It opens with the rings drawing themselves and the rooms
   spiralling out from the sun; a room pointed at (or reached with the keyboard) comes forward while the orbit eases to a stop, with
   its card beside it; the orbit can be spun by dragging, and slows back to its own pace. The real room keys are moved in, so each
   still opens its room. Minimal motion, calm days and reduced motion: the rooms stand still, evenly spaced. */
(function(){
var D=document,W=window,hx=D.getElementById("hx");if(!hx||D.getElementById("ox"))return;
var NS="http://www.w3.org/2000/svg";
/* the typefaces Ingenium carries (Lector's): Cormorant for the greeting, Cinzel for the date; the system's serif where they are absent */
(function fonts(){try{var F=W.LX7_FONTS;if(!F||D.getElementById("ox-fonts"))return;var r=[];
  [["cormorant-500-normal","Orrery Cormorant","normal",500],["cormorant-500-italic","Orrery Cormorant","italic",500],["cormorant-600-normal","Orrery Cormorant","normal",600],["cinzel-600-normal","Orrery Cinzel","normal",600]]
    .forEach(function(f){if(F[f[0]])r.push('@font-face{font-family:"'+f[1]+'";font-style:'+f[2]+';font-weight:'+f[3]+';font-display:swap;src:url('+F[f[0]]+') format("woff2")}');});
  var st=D.createElement("style");st.id="ox-fonts";st.textContent=r.join("\n");D.head.appendChild(st);}catch(e){}})();
var css=`
#ox{--oxGold:#b88a3a;--oxGoldHi:#e2c27c;--oxInk:#221a2e;--oxInk2:#4d4560;--oxSky1:#fdfbff;--oxSky2:#f4eefb;--oxSky3:#e8def5;--oxPlane:rgba(106,63,181,.10);
  --oxSerif:"Orrery Cormorant","Cormorant Garamond",Cormorant,"Iowan Old Style","Palatino Linotype",Palatino,Georgia,serif;--oxCaps:"Orrery Cinzel",Cinzel,"Trajan Pro","Iowan Old Style",serif;
  position:relative;height:760px;border-radius:30px;overflow:hidden;isolation:isolate;touch-action:pan-y;user-select:none;-webkit-user-select:none;
  background:radial-gradient(ellipse 80% 70% at 52% 66%,var(--oxSky1) 0%,var(--oxSky2) 52%,var(--oxSky3) 100%);
  box-shadow:inset 0 0 0 1px rgba(106,63,181,.10),inset 0 1px 0 rgba(255,255,255,.9),0 1px 1px rgba(40,22,68,.04),0 4px 6px rgba(40,22,68,.04),0 14px 28px rgba(40,22,68,.07),0 34px 64px rgba(40,22,68,.09)}
body[data-theme="night"] #ox{--oxInk:#f4eefb;--oxInk2:#c9bedb;--oxSky1:#231a37;--oxSky2:#140f22;--oxSky3:#0a0812;--oxPlane:rgba(183,156,230,.10);
  box-shadow:inset 0 0 0 1px rgba(216,180,106,.16),0 14px 28px rgba(0,0,0,.45),0 34px 64px rgba(0,0,0,.45)}
#ox .ox-layer{position:absolute;inset:-30px;pointer-events:none;transition:transform .9s cubic-bezier(.22,1,.36,1)}
#ox .ox-layer i{position:absolute;border-radius:50%;background:var(--oxGold);opacity:.3;animation:oxTw 6s ease-in-out infinite}
body[data-theme="night"] #ox .ox-layer i{background:#f6ecd2;opacity:.65}
@keyframes oxTw{0%,100%{opacity:.12}50%{opacity:.75}}
#ox .ox-chart{position:absolute;inset:0;pointer-events:none}
#ox .ox-sky{position:absolute;left:46px;top:40px;z-index:6;max-width:560px;animation:oxUp 1s cubic-bezier(.22,1,.36,1) .15s backwards}
#ox .ox-eyebrow{display:flex;align-items:center;gap:12px;font:600 11.5px/1 var(--oxCaps);letter-spacing:.34em;text-transform:uppercase;color:var(--oxGold)}
#ox .ox-eyebrow::after{content:"";width:72px;height:1px;background:linear-gradient(90deg,var(--oxGold),rgba(184,138,58,0))}
#ox .ox-hello{margin:16px 0 12px;font:500 50px/1.02 var(--oxSerif);letter-spacing:.004em;color:var(--oxInk)}
#ox .ox-hello em{font-style:italic;font-weight:500;color:inherit}
#ox .ox-lede{margin:0;font:400 14.5px/1.6 var(--x-sans);color:var(--oxInk2);max-width:40ch}
#ox .ox-next{position:absolute;right:34px;top:36px;z-index:7;width:316px;padding:18px 18px 16px;border-radius:22px;
  background:linear-gradient(180deg,rgba(255,255,255,.82),rgba(255,255,255,.66));-webkit-backdrop-filter:blur(16px) saturate(1.2);backdrop-filter:blur(16px) saturate(1.2);
  box-shadow:inset 0 0 0 1px rgba(184,138,58,.28),inset 0 1px 0 rgba(255,255,255,.95),0 2px 4px rgba(40,22,68,.05),0 14px 34px rgba(40,22,68,.13);animation:oxComet 1.2s cubic-bezier(.22,1,.36,1) .5s backwards}
body[data-theme="night"] #ox .ox-next{background:linear-gradient(180deg,rgba(40,31,58,.78),rgba(28,21,42,.7));box-shadow:inset 0 0 0 1px rgba(216,180,106,.22),0 14px 34px rgba(0,0,0,.5)}
#ox .ox-next .hx-next{background:none;border:0;box-shadow:none;padding:0}
#ox .ox-next .hx-next-h{font:600 10.5px/1 var(--oxCaps);letter-spacing:.3em;color:var(--oxGold)}
@keyframes oxUp{0%{opacity:0;transform:translateY(16px)}100%{opacity:1;transform:none}}
@keyframes oxComet{0%{opacity:0;transform:translate(60px,-24px) scale(.96)}100%{opacity:1;transform:none}}
#ox .ox-plane{position:absolute;left:50%;top:60%;width:1000px;height:1000px;margin:-500px 0 0 -500px;transform:rotateX(71deg);pointer-events:none;z-index:2}
#ox .ox-plane svg{width:100%;height:100%;overflow:visible}
#ox .ox-plane .ring{fill:none;stroke:var(--oxGold);stroke-width:1.2;stroke-dasharray:2900;stroke-dashoffset:2900;animation:oxDraw 2.2s cubic-bezier(.65,0,.35,1) .1s forwards}
#ox .ox-plane .ring.thin{stroke-width:1;opacity:.55;animation-delay:.3s}
#ox .ox-plane .ring.faint{stroke:rgba(106,63,181,.35);animation-delay:.5s}
body[data-theme="night"] #ox .ox-plane .ring.faint{stroke:rgba(205,184,240,.28)}
#ox .ox-plane .ticks{stroke:var(--oxGold);stroke-width:1.1;opacity:0;animation:oxFade 1.2s ease 1.6s forwards}
#ox .ox-plane .nums{fill:var(--oxGold);font:600 17px var(--oxCaps);opacity:0;animation:oxFade 1.2s ease 1.9s forwards}
#ox .ox-plane .dial{transform-origin:500px 500px;animation:oxSpin 240s linear infinite}
#ox .ox-plane .disc{fill:url(#oxDisc)}
@keyframes oxDraw{to{stroke-dashoffset:0}}
@keyframes oxFade{to{opacity:.32}}
@keyframes oxSpin{to{transform:rotate(360deg)}}
#ox .ox-sun{position:absolute;left:50%;top:60%;z-index:40;transform:translate(-50%,-64%)}
#ox .ox-rays{position:absolute;left:50%;top:60%;width:230px;height:230px;margin:-136px 0 0 -115px;pointer-events:none;animation:oxSpin 90s linear infinite;opacity:.9;z-index:4}
#ox .ox-sun::before{content:"";position:absolute;left:50%;top:50%;width:150px;height:150px;margin:-75px 0 0 -75px;border-radius:50%;
  border:1px solid rgba(184,138,58,.5);animation:oxSpin 48s linear infinite;pointer-events:none}
#ox .ox-sun::after{content:"";position:absolute;left:50%;top:100%;width:150px;height:26px;margin:22px 0 0 -75px;border-radius:50%;pointer-events:none;
  background:radial-gradient(closest-side,rgba(40,22,68,.30),rgba(40,22,68,0))}
#ox .ox-sun .hx-seal{position:relative;z-index:2}
#ox .ox-shadow{position:absolute;left:0;top:0;width:90px;height:22px;margin:-11px 0 0 -45px;border-radius:50%;pointer-events:none;z-index:3;
  background:radial-gradient(closest-side,rgba(40,22,68,.30),rgba(40,22,68,0));will-change:transform}
body[data-theme="night"] #ox .ox-shadow{background:radial-gradient(closest-side,rgba(0,0,0,.55),rgba(0,0,0,0))}
#ox .hx-key.ox-p{position:absolute;left:0;top:0;width:160px;min-height:0;padding:0;margin:0;background:none;border:0;box-shadow:none;align-items:center;text-align:center;
  gap:9px;transform-origin:50% 40%;will-change:transform,filter;cursor:pointer;outline:none;transition:filter .45s ease,opacity .45s ease}
#ox .hx-key.ox-p .hx-jewel{position:relative;width:80px;height:80px;border-radius:50%;margin:0 auto;color:#fff;
  background:radial-gradient(circle at 34% 28%,rgba(255,255,255,.28),rgba(255,255,255,0) 42%),linear-gradient(150deg,#9068d6 0%,#6a3fb5 55%,#55309a 100%);
  box-shadow:inset 0 0 0 1px rgba(255,255,255,.22),inset 0 0 0 5px rgba(106,63,181,.0),inset 0 -8px 14px rgba(30,10,60,.35),inset 0 3px 6px rgba(255,255,255,.18),
    0 2px 2px rgba(40,22,68,.14),0 8px 14px rgba(40,22,68,.18),0 20px 30px rgba(40,22,68,.14);
  transition:transform .45s cubic-bezier(.22,1,.36,1),box-shadow .45s ease}
#ox .hx-key.ox-p .hx-jewel::before{content:"";position:absolute;inset:7px;border-radius:50%;border:1px solid rgba(255,255,255,.26);pointer-events:none}
#ox .hx-key.ox-p .hx-jewel::after{content:"";position:absolute;inset:-9px;border-radius:50%;border:1px solid rgba(106,63,181,.28);pointer-events:none;
  background:radial-gradient(circle at 50% 0%,#fff 0 2.2px,transparent 2.6px);animation:oxMoon 9s linear infinite;transition:border-color .4s ease}
body[data-theme="night"] #ox .hx-key.ox-p .hx-jewel::after{border-color:rgba(205,184,240,.30);background:radial-gradient(circle at 50% 0%,#f4eefb 0 2.2px,transparent 2.6px)}
@keyframes oxMoon{to{transform:rotate(360deg)}}
#ox .hx-key.ox-p .hx-jewel svg{position:relative;z-index:1;width:30px;height:30px;filter:drop-shadow(0 1px 1px rgba(30,10,60,.45))}
#ox .hx-key.ox-p.ox-on .hx-jewel{transform:translateY(-3px) scale(1.04);
  box-shadow:inset 0 0 0 1px rgba(255,255,255,.3),inset 0 -8px 14px rgba(30,10,60,.35),inset 0 3px 6px rgba(255,255,255,.2),0 4px 4px rgba(40,22,68,.14),0 14px 22px rgba(40,22,68,.22),0 30px 44px rgba(40,22,68,.16)}
#ox .hx-key.ox-p.ox-on .hx-jewel::after{border-color:rgba(106,63,181,.55);animation-duration:3s}
#ox .hx-key.ox-p .hx-kh{font:600 21px/1 var(--oxSerif);letter-spacing:.03em;color:var(--oxInk)}
#ox .hx-key.ox-p .hx-km{margin:0 auto;font:600 11.5px/1 var(--x-sans);color:var(--x-acc)}
#ox .hx-key.ox-p .hx-arrow{display:none}
#ox .hx-key.ox-p .hx-kd{position:absolute;left:calc(100% + 6px);top:6px;width:250px;padding:14px 16px 13px;border-radius:16px;text-align:left;
  background:linear-gradient(180deg,rgba(255,255,255,.95),rgba(255,255,255,.86));-webkit-backdrop-filter:blur(10px);backdrop-filter:blur(10px);
  box-shadow:inset 0 0 0 1px rgba(106,63,181,.16),0 2px 4px rgba(40,22,68,.06),0 16px 36px rgba(40,22,68,.16);font:400 13px/1.5 var(--x-sans);color:var(--oxInk2);
  opacity:0;transform:translateX(-8px) scale(.98);transition:opacity .3s ease,transform .4s cubic-bezier(.22,1,.36,1);pointer-events:none}
#ox .hx-key.ox-p .hx-kd::before{content:"Open ›";display:block;margin-bottom:6px;font:700 11px/1 var(--x-sans);letter-spacing:.08em;text-transform:uppercase;color:var(--x-acc)}
body[data-theme="night"] #ox .hx-key.ox-p .hx-kd{background:linear-gradient(180deg,rgba(44,34,64,.95),rgba(30,23,46,.9));box-shadow:inset 0 0 0 1px rgba(216,180,106,.25),0 16px 36px rgba(0,0,0,.55)}
#ox .hx-key.ox-p.ox-left .hx-kd{left:auto;right:calc(100% + 6px);transform:translateX(8px) scale(.98)}
#ox .hx-key.ox-p.ox-on .hx-kd{opacity:1;transform:none}
#ox.ox-hold .hx-key.ox-p:not(.ox-on){opacity:.5;filter:saturate(.6) blur(.4px)}
#ox .hx-key.ox-p:focus-visible .hx-jewel{box-shadow:0 0 0 3px var(--oxGoldHi),0 14px 22px rgba(40,22,68,.22)}
/* each room is a seal medallion: a gold rim with its name engraved around it, an enamel face in its own colour with guilloche lines,
   its emblem in raised gold; pointed at, it tilts toward you and a glint crosses the gold */
#ox .ox-medal{position:relative;width:104px;height:104px;margin:0 auto;transform-style:preserve-3d;transition:transform .5s cubic-bezier(.22,1,.36,1);
  filter:drop-shadow(0 3px 2px rgba(40,22,68,.22)) drop-shadow(0 14px 16px rgba(40,22,68,.20)) drop-shadow(0 28px 30px rgba(40,22,68,.12))}
body[data-theme="night"] #ox .ox-medal{filter:drop-shadow(0 3px 2px rgba(0,0,0,.5)) drop-shadow(0 14px 16px rgba(0,0,0,.45)) drop-shadow(0 28px 30px rgba(0,0,0,.35))}
#ox .ox-medal svg{width:100%;height:100%;display:block;overflow:visible}
#ox .ox-medal .rimtext{animation:oxSpin 70s linear infinite;transform-origin:52px 52px}
#ox .ox-medal .glint{opacity:0;transform:translateX(-120px) rotate(25deg);transform-box:fill-box}
#ox .hx-key.ox-p.ox-on .ox-medal{transform:perspective(500px) rotateX(10deg) rotateY(-14deg) scale(1.04)}
#ox .hx-key.ox-p.ox-on .ox-medal .glint{animation:oxGlint 1.1s cubic-bezier(.22,1,.36,1) .05s}
@keyframes oxGlint{0%{opacity:0;transform:translateX(-120px) rotate(25deg)}25%{opacity:.85}100%{opacity:0;transform:translateX(140px) rotate(25deg)}}
#ox .hx-key.ox-p:focus-visible .ox-medal{outline:2px solid var(--oxGoldHi);outline-offset:4px;border-radius:50%}
#ox .ox-legend{position:absolute;right:46px;bottom:26px;z-index:6;text-align:right;max-width:520px;font:italic 500 15px/1.4 var(--oxSerif);color:var(--oxInk2);opacity:.85}
#ox.ox-drag{cursor:grabbing}
body[data-motion="minimal"] #ox *,body[data-calm="1"] #ox *{animation:none !important}
body[data-motion="minimal"] #ox .ring,body[data-calm="1"] #ox .ring{stroke-dashoffset:0}
body[data-motion="minimal"] #ox .ticks,body[data-motion="minimal"] #ox .nums,body[data-calm="1"] #ox .ticks,body[data-calm="1"] #ox .nums{opacity:.8}
@media (prefers-reduced-motion:reduce){#ox *{animation:none !important}#ox .ring{stroke-dashoffset:0}#ox .ticks,#ox .nums{opacity:.8}}
/* the rest of Home, in the orrery's language: gold hairlines, Cormorant headings */
#page-home #hx .hx-sech h2,#page-home #hx .hx-sech h3,#page-home #hx .hx-sech b{font-family:var(--oxSerifH,"Orrery Cormorant","Cormorant Garamond",Cormorant,var(--x-serif));font-weight:600;font-size:21px;letter-spacing:.03em}
#page-home #hx .hx-recent,#page-home #hx .hx-models{box-shadow:inset 0 0 0 1px rgba(184,138,58,.18),0 1px 1px rgba(40,22,68,.04),0 4px 6px rgba(40,22,68,.04),0 14px 28px rgba(40,22,68,.06);border:0}
`;
var st=D.createElement("style");st.id="ox-css";st.textContent=css;D.head.appendChild(st);
function el(t,c,x){var e=D.createElement(t);if(c)e.className=c;if(x!=null)e.textContent=x;return e;}
function still(){var b=D.body;return b.getAttribute("data-motion")==="minimal"||b.getAttribute("data-calm")==="1"||!!(W.matchMedia&&matchMedia("(prefers-reduced-motion: reduce)").matches);}
var ox=el("section");ox.id="ox";ox.setAttribute("aria-label","Home: your rooms around Ingenium's seal");
/* the stars, in three depths */
var layers=[0,1,2].map(function(d){var L=el("div","ox-layer");for(var i=0;i<[46,30,16][d];i++){var s=el("i"),z=[1.2,1.8,2.6][d];s.style.width=s.style.height=z+"px";s.style.left=(Math.random()*100).toFixed(2)+"%";s.style.top=(Math.random()*100).toFixed(2)+"%";s.style.animationDelay=(-Math.random()*6).toFixed(2)+"s";L.appendChild(s);}ox.appendChild(L);return L;});
/* a fine chart: two constellations and the meridian, engraved in gold */
var chart=D.createElementNS(NS,"svg");chart.setAttribute("class","ox-chart");chart.setAttribute("viewBox","0 0 1200 720");chart.setAttribute("preserveAspectRatio","none");
chart.innerHTML='<g fill="none" stroke="#b88a3a" stroke-width=".7" opacity=".38"><path d="M70 600 L190 548 L276 572 L388 506 L452 530"/><path d="M842 176 L918 236 L1012 214 L1092 284"/><path d="M600 0 V720" stroke-dasharray="1 9"/></g><g fill="#b88a3a" opacity=".55"><circle cx="190" cy="548" r="2.2"/><circle cx="276" cy="572" r="1.8"/><circle cx="388" cy="506" r="2.4"/><circle cx="918" cy="236" r="2.2"/><circle cx="1012" cy="214" r="1.8"/></g>';ox.appendChild(chart);
/* the greeting: the date in Cinzel, the greeting in Cormorant with the name in italic */
var sky=el("div","ox-sky");sky.appendChild(el("div","ox-eyebrow","Ingenium · "+((D.getElementById("hxDate")||{}).textContent||"")));
var hello=(D.getElementById("hxHello")||{}).textContent||"Good evening";var cut=hello.lastIndexOf(","),h2=el("h2","ox-hello");
if(cut>0){h2.appendChild(D.createTextNode(hello.slice(0,cut+1)+" "));h2.appendChild(el("em",null,hello.slice(cut+1).trim()));}else h2.textContent=hello;
sky.appendChild(h2);sky.appendChild(el("p","ox-lede",(hx.querySelector(".hx-lede")||{}).textContent||""));ox.appendChild(sky);
var nx=el("div","ox-next"),next=hx.querySelector(".hx-next");if(next)nx.appendChild(next);ox.appendChild(nx);
/* the plane: three rings, an astrolabe dial of ticks and numerals that turns very slowly, a soft disc */
var R0=430,plane=el("div","ox-plane"),ps=D.createElementNS(NS,"svg");ps.setAttribute("viewBox","0 0 1000 1000");
var ticks="",nums="",ROM=["I","II","III","IV","V","VI","VII","VIII","IX","X","XI","XII"];
for(var a=0;a<360;a+=6){var r1=R0+16,r2=R0+(a%30===0?34:24),c=Math.cos(a*Math.PI/180),s=Math.sin(a*Math.PI/180);ticks+='M'+(500+c*r1).toFixed(1)+' '+(500+s*r1).toFixed(1)+'L'+(500+c*r2).toFixed(1)+' '+(500+s*r2).toFixed(1);}
ROM.forEach(function(t,i){var a=i*30-90,c=Math.cos(a*Math.PI/180),s=Math.sin(a*Math.PI/180),r=R0+58;nums+='<text x="'+(500+c*r).toFixed(1)+'" y="'+(500+s*r).toFixed(1)+'" text-anchor="middle" dominant-baseline="middle" transform="rotate('+(a+90)+' '+(500+c*r).toFixed(1)+' '+(500+s*r).toFixed(1)+')">'+t+'</text>';});
ps.innerHTML='<defs><radialGradient id="oxDisc"><stop offset="0" stop-color="#6a3fb5" stop-opacity=".18"/><stop offset=".55" stop-color="#6a3fb5" stop-opacity=".06"/><stop offset="1" stop-color="#6a3fb5" stop-opacity="0"/></radialGradient></defs>'+
  '<circle class="disc" cx="500" cy="500" r="'+(R0+80)+'"/><circle class="ring faint" cx="500" cy="500" r="150"/><circle class="ring thin" cx="500" cy="500" r="280"/><circle class="ring" cx="500" cy="500" r="'+R0+'"/>'+
  '<g class="dial"><path class="ticks" d="'+ticks+'"/></g>';
plane.appendChild(ps);ox.appendChild(plane);
/* the sun: gold rays turning behind the seal key, which is moved in whole */
var sun=el("div","ox-sun"),rays=D.createElementNS(NS,"svg");rays.setAttribute("class","ox-rays");rays.setAttribute("viewBox","0 0 230 230");var rp="";
for(var k=0;k<24;k++){var aa=k*15*Math.PI/180,l1=62,l2=k%2?92:108;rp+='M'+(115+Math.cos(aa)*l1).toFixed(1)+' '+(115+Math.sin(aa)*l1).toFixed(1)+'L'+(115+Math.cos(aa)*l2).toFixed(1)+' '+(115+Math.sin(aa)*l2).toFixed(1);}
rays.innerHTML='<path d="'+rp+'" stroke="#c9a14f" stroke-width="1.2" stroke-linecap="round" opacity=".7"/><circle cx="115" cy="115" r="76" fill="none" stroke="#c9a14f" stroke-width=".8" stroke-dasharray="1 5" opacity=".7"/>';
var seal=D.getElementById("hxSeal");if(seal)sun.appendChild(seal);ox.appendChild(sun);
/* the rooms' own colours, in Ingenium's family of enamels; the emblem is the room's own icon, in gold */
var ENAMEL={chat:["#8d63d6","#5a33a0","#2e1760"],code:["#5b7fd6","#2c4a9a","#13265a"],build:["#3fa29a","#1f6e69","#0d3a38"],
  fabrica:["#c98a4b","#8f5524","#4e2b0e"],lector:["#c25a5f","#8a2b34","#4a1219"],focus:["#86b08c","#4d7a57","#22412b"]};
var mid=0;
function medal(k){var name=((k.querySelector(".hx-kh")||{}).textContent||"").trim(),key=name.toLowerCase(),E=ENAMEL[key]||ENAMEL.chat,id="oxm"+(++mid);
  var ic=k.querySelector(".hx-jewel svg"),icon=ic?ic.innerHTML:"";
  var ring="";for(var i=0;i<48;i++){var a=i*7.5*Math.PI/180;ring+='<circle cx="'+(52+Math.cos(a)*45.2).toFixed(2)+'" cy="'+(52+Math.sin(a)*45.2).toFixed(2)+'" r=".9"/>';}
  var guil="";for(var j=0;j<18;j++){guil+='<ellipse cx="52" cy="52" rx="'+(30-j*.2).toFixed(1)+'" ry="'+(12+j*.9).toFixed(1)+'" transform="rotate('+(j*10)+' 52 52)"/>';}
  var label=(name.toUpperCase()+" · INGENIUM · ").repeat(2);
  var m=D.createElement("span");m.className="ox-medal";m.setAttribute("aria-hidden","true");
  m.innerHTML='<svg viewBox="0 0 104 104"><defs>'+
    '<linearGradient id="'+id+'g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#f6e2a8"/><stop offset=".28" stop-color="#c99a45"/><stop offset=".5" stop-color="#f1d68f"/><stop offset=".74" stop-color="#a87a2e"/><stop offset="1" stop-color="#e7c477"/></linearGradient>'+
    '<radialGradient id="'+id+'e" cx=".36" cy=".3" r=".8"><stop offset="0" stop-color="'+E[0]+'"/><stop offset=".55" stop-color="'+E[1]+'"/><stop offset="1" stop-color="'+E[2]+'"/></radialGradient>'+
    '<linearGradient id="'+id+'s" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".55"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient>'+
    '<path id="'+id+'p" d="M52 52 m-39.5 0 a39.5 39.5 0 1 1 79 0 a39.5 39.5 0 1 1 -79 0"/>'+
    '<clipPath id="'+id+'c"><circle cx="52" cy="52" r="50"/></clipPath></defs>'+
    '<circle cx="52" cy="52" r="50" fill="url(#'+id+'g)"/>'+
    '<circle cx="52" cy="52" r="47.4" fill="none" stroke="#7a5418" stroke-opacity=".55" stroke-width=".8"/>'+
    '<g fill="#8a6220" opacity=".55">'+ring+'</g>'+
    '<circle cx="52" cy="52" r="34.4" fill="#5e4012" opacity=".45"/>'+
    '<g class="rimtext"><text font-family="Orrery Cinzel, Cinzel, Iowan Old Style, serif" font-size="6.4" font-weight="600" letter-spacing="1.6" fill="#5b3d0e" opacity=".85"><textPath href="#'+id+'p">'+label+'</textPath></text></g>'+
    '<circle cx="52" cy="52" r="33" fill="url(#'+id+'e)"/>'+
    '<g fill="none" stroke="#fff" stroke-opacity=".10" stroke-width=".5">'+guil+'</g>'+
    '<circle cx="52" cy="52" r="33" fill="none" stroke="#f3dc9e" stroke-width="1.1"/>'+
    '<circle cx="52" cy="52" r="31" fill="none" stroke="#000" stroke-opacity=".25" stroke-width="1"/>'+
    '<g transform="translate(37.6 37.6) scale(1.2)" fill="none" stroke="#3a2608" stroke-opacity=".45" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" transform-origin="0 0" style="transform:translate(37.6px,38.8px) scale(1.2)">'+icon+'</g>'+
    '<g fill="none" stroke="#f6e2a8" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round" style="transform:translate(37.6px,37.6px) scale(1.2)">'+icon+'</g>'+
    '<ellipse cx="44" cy="34" rx="20" ry="11" fill="url(#'+id+'s)" opacity=".7"/>'+
    '<g clip-path="url(#'+id+'c)"><rect class="glint" x="30" y="-20" width="18" height="150" fill="#fff" opacity="0"/></g>'+
    '</svg>';
  return m;}
/* the rooms: the six keys themselves, each with its shadow on the plane */
var keys=[].slice.call(hx.querySelectorAll(".hx-keys .hx-key")),hold=null;
keys.forEach(function(k,i){k.classList.add("ox-p");k.__a=Math.PI/2+i*Math.PI/3;k.__sh=el("div","ox-shadow");ox.appendChild(k.__sh);ox.appendChild(k);
  function on(){hold=k;ox.classList.add("ox-hold");k.classList.add("ox-on");}function off(){if(hold===k)hold=null;ox.classList.remove("ox-hold");k.classList.remove("ox-on");}
  k.addEventListener("pointerenter",on);k.addEventListener("pointerleave",off);k.addEventListener("focus",on);k.addEventListener("blur",off);
  k.addEventListener("click",function(e){if(moved>6){e.preventDefault();e.stopImmediatePropagation();}},true);});
ox.appendChild(el("div","ox-legend","Point at a room to bring it near, press to enter, or spin the heavens."));
var head=hx.querySelector(".hx-head");head.parentNode.insertBefore(ox,head);head.style.display="none";var work=hx.querySelector(".hx-work");if(work)work.style.display="none";
/* the motion: its own slow pace; a room held brings it to a stop; a drag spins it, and it slows back to its pace */
var BASE=.000085,vel=BASE,turn=0,last=performance.now(),born=last,drag=null,moved=0,px=0,py=0;
ox.addEventListener("pointerdown",function(e){if(e.button!==0||e.target.closest(".ox-next"))return;drag={x:e.clientX,t:performance.now(),v:0};moved=0;});
W.addEventListener("pointermove",function(e){var r=ox.getBoundingClientRect();px=(e.clientX-r.left)/r.width-.5;py=(e.clientY-r.top)/r.height-.5;
  if(!drag)return;var now=performance.now(),dx=e.clientX-drag.x;moved+=Math.abs(dx);if(moved>6)ox.classList.add("ox-drag");
  var dv=dx*.0042;turn+=dv;drag.v=dv/Math.max(8,now-drag.t);drag.x=e.clientX;drag.t=now;});
W.addEventListener("pointerup",function(){if(!drag)return;if(moved>6)vel=Math.max(-.012,Math.min(.012,drag.v));drag=null;ox.classList.remove("ox-drag");setTimeout(function(){moved=0;},0);});
function frame(now){var dt=Math.min(50,now-last);last=now;var calm=still();
  if(!drag){var want=hold||calm?0:BASE;vel+=(want-vel)*Math.min(1,dt/(Math.abs(vel)>BASE*3?900:320));turn+=vel*dt;}
  var R=ox.getBoundingClientRect(),cx=R.width/2,cy=R.height*.60,tilt=Math.cos(71*Math.PI/180),grow=calm?1:Math.min(1,(now-born)/1500),eg=1-Math.pow(1-grow,3);
  layers.forEach(function(L,d){var m=[6,12,20][d];L.style.transform="translate("+(-px*m).toFixed(1)+"px,"+(-py*m).toFixed(1)+"px)";});
  keys.forEach(function(k,i){var th=k.__a+turn+(1-eg)*2.4,rr=R0*(.15+.85*eg),x=cx+Math.cos(th)*rr,y=cy+Math.sin(th)*rr*tilt,dep=(Math.sin(th)+1)/2;
    var sc=(.72+.36*dep+(k===hold?.2:0))*(.4+.6*eg),w=k.offsetWidth||160;
    k.style.transform="translate("+(x-w/2).toFixed(1)+"px,"+(y-62).toFixed(1)+"px) scale("+sc.toFixed(3)+")";k.style.zIndex=String(10+Math.round(dep*40)+(k===hold?60:0));
    k.style.filter=k===hold||ox.classList.contains("ox-hold")?"":"blur("+((1-dep)*.6).toFixed(2)+"px)";k.classList.toggle("ox-left",x>cx+R0*.35);
    k.__sh.style.transform="translate("+x.toFixed(1)+"px,"+(y+30*sc).toFixed(1)+"px) scale("+(sc*1.05).toFixed(3)+")";k.__sh.style.opacity=String((.45+.55*dep)*eg);});
  requestAnimationFrame(frame);}
requestAnimationFrame(frame);
W.IngOrrery={spin:function(v){vel=v;},state:function(){return {turn:turn,vel:vel,hold:hold&&hold.textContent};}};
})();
