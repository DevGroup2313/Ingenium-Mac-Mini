/* CONCEPT (preview only): Home as an orrery. The seal key is the sun; the six rooms revolve as medallions on gold orbits laid on a
   tilted plane, nearer ones larger; pointing at one stills the orbits and brings it forward with what it holds. The real keys are
   moved in, so each still opens its room; the seal key is moved in whole, untouched. */
(function(){
var D=document,W=window,hx=D.getElementById("hx");if(!hx||D.getElementById("ox"))return;
var css=`
#page-home #hx.hx{gap:22px}
#ox{position:relative;height:700px;border-radius:30px;overflow:hidden;isolation:isolate;
  background:radial-gradient(ellipse 70% 60% at 50% 64%,#fdfbff 0%,#f4eefb 46%,#e8def5 100%);
  box-shadow:inset 0 0 0 1px rgba(106,63,181,.10),0 1px 1px rgba(40,22,68,.04),0 4px 6px rgba(40,22,68,.04),0 14px 28px rgba(40,22,68,.07),0 34px 60px rgba(40,22,68,.08)}
body[data-theme="night"] #ox{background:radial-gradient(ellipse 70% 60% at 50% 64%,#241a38 0%,#161024 50%,#0c0915 100%);
  box-shadow:inset 0 0 0 1px rgba(205,184,240,.10),0 14px 28px rgba(0,0,0,.45),0 34px 60px rgba(0,0,0,.4)}
#ox .ox-stars{position:absolute;inset:0;z-index:0;pointer-events:none}
#ox .ox-stars i{position:absolute;width:2px;height:2px;border-radius:50%;background:#b88a3a;opacity:.35;animation:oxTw 5s ease-in-out infinite}
body[data-theme="night"] #ox .ox-stars i{background:#f3e7c8;opacity:.6}
@keyframes oxTw{0%,100%{opacity:.15}50%{opacity:.7}}
#ox .ox-chart{position:absolute;inset:0;z-index:0;pointer-events:none;opacity:.5}
#ox .ox-sky{position:absolute;left:40px;top:34px;z-index:5;max-width:520px}
#ox .ox-eyebrow{font:600 11.5px/1 var(--x-sans);letter-spacing:.28em;text-transform:uppercase;color:var(--x-gold)}
#ox .ox-hello{margin:12px 0 10px;font:600 46px/1.04 var(--x-serif);color:var(--x-ink1);letter-spacing:-.005em}
#ox .ox-lede{margin:0;color:var(--x-ink2);font-size:14.5px;line-height:1.55;max-width:44ch}
#ox .ox-next{position:absolute;right:34px;top:34px;z-index:6;width:330px;padding:16px 18px;border-radius:20px;background:rgba(255,255,255,.72);
  -webkit-backdrop-filter:blur(14px);backdrop-filter:blur(14px);box-shadow:inset 0 0 0 1px rgba(106,63,181,.12),0 2px 4px rgba(40,22,68,.05),0 12px 30px rgba(40,22,68,.12);
  animation:oxIn .9s cubic-bezier(.22,1,.36,1) .3s backwards}
body[data-theme="night"] #ox .ox-next{background:rgba(33,26,45,.7);box-shadow:inset 0 0 0 1px rgba(205,184,240,.14),0 12px 30px rgba(0,0,0,.5)}
#ox .ox-next .hx-next{background:none;border:0;box-shadow:none;padding:0}
@keyframes oxIn{0%{opacity:0;transform:translate(40px,-10px)}100%{opacity:1;transform:none}}
#ox .ox-stage{position:absolute;inset:0;z-index:2;pointer-events:none}
#ox .ox-plane{position:absolute;left:50%;top:63%;width:1000px;height:1000px;margin:-500px 0 0 -500px;transform:rotateX(70deg);transform-style:preserve-3d}
#ox .ox-ring{position:absolute;left:50%;top:50%;border-radius:50%;border:1.2px solid rgba(184,138,58,.55);transform:translate(-50%,-50%)}
#ox .ox-ring.r2{border-style:dashed;border-color:rgba(184,138,58,.4)}
#ox .ox-ring.r3{border-color:rgba(106,63,181,.22)}
#ox .ox-disc{position:absolute;left:50%;top:50%;width:300px;height:300px;transform:translate(-50%,-50%);border-radius:50%;
  background:radial-gradient(circle,rgba(106,63,181,.16),rgba(106,63,181,0) 68%)}
#ox .ox-sun{position:absolute;left:50%;top:63%;z-index:40;transform:translate(-50%,-62%)}
#ox .ox-sun::before{content:"";position:absolute;left:50%;top:50%;width:150px;height:150px;margin:-75px 0 0 -75px;border-radius:50%;
  border:1px solid rgba(184,138,58,.5);animation:oxSpin 48s linear infinite;pointer-events:none}
#ox .ox-sun::after{content:"";position:absolute;left:50%;top:100%;width:120px;height:22px;margin:16px 0 0 -60px;border-radius:50%;
  background:radial-gradient(closest-side,rgba(40,22,68,.28),rgba(40,22,68,0));pointer-events:none}
@keyframes oxSpin{to{transform:rotate(360deg)}}
#ox .hx-key.ox-p{position:absolute;left:0;top:0;width:150px;min-height:0;padding:0;margin:0;background:none;border:0;box-shadow:none;align-items:center;text-align:center;
  gap:8px;transform-origin:50% 50%;will-change:transform;transition:filter .3s ease,opacity .3s ease;cursor:pointer;pointer-events:auto}
#ox .hx-key.ox-p:hover{transform-origin:50% 50%}
#ox .hx-key.ox-p .hx-jewel{width:74px;height:74px;border-radius:50%;margin:0 auto;
  box-shadow:inset 0 2px 0 rgba(255,255,255,.35),inset 0 -6px 12px rgba(30,10,60,.35),0 3px 2px rgba(40,22,68,.18),0 12px 18px rgba(40,22,68,.18),0 26px 34px rgba(40,22,68,.12)}
#ox .hx-key.ox-p .hx-jewel svg{width:30px;height:30px}
#ox .hx-key.ox-p .hx-kh{font:600 18px/1.1 var(--x-serif);letter-spacing:.04em}
#ox .hx-key.ox-p .hx-kd{position:absolute;left:50%;top:100%;width:230px;margin:10px 0 0 -115px;padding:10px 12px;border-radius:14px;background:var(--x-hi);
  box-shadow:inset 0 0 0 1px var(--x-hair),0 10px 26px rgba(40,22,68,.16);font-size:12.5px;opacity:0;transform:translateY(-6px);transition:opacity .25s ease,transform .3s cubic-bezier(.22,1,.36,1);pointer-events:none}
#ox .hx-key.ox-p .hx-km{margin:0 auto;font-size:11px}
#ox .hx-key.ox-p .hx-arrow{display:none}
#ox .hx-key.ox-p::after{content:"";position:absolute;left:50%;top:44px;width:70px;height:16px;margin-left:-35px;border-radius:50%;z-index:-1;
  background:radial-gradient(closest-side,rgba(40,22,68,.22),rgba(40,22,68,0));transform:translateY(46px)}
#ox.ox-hold .hx-key.ox-p:not(.ox-on){opacity:.55;filter:saturate(.7)}
#ox .hx-key.ox-p.ox-on .hx-kd{opacity:1;transform:none}
#ox .ox-legend{position:absolute;left:40px;bottom:26px;z-index:5;font:italic 13px/1.4 var(--x-serif);color:var(--x-ink3)}
`;
var st=D.createElement("style");st.id="ox-css";st.textContent=css;D.head.appendChild(st);
var ox=D.createElement("section");ox.id="ox";ox.setAttribute("aria-label","Home");
/* the sky: stars by night, a fine chart by day */
var stars=D.createElement("div");stars.className="ox-stars";for(var i=0;i<70;i++){var s=D.createElement("i");s.style.left=(Math.random()*100).toFixed(2)+"%";s.style.top=(Math.random()*100).toFixed(2)+"%";s.style.animationDelay=(-Math.random()*5).toFixed(2)+"s";stars.appendChild(s);}ox.appendChild(stars);
var chart=D.createElementNS("http://www.w3.org/2000/svg","svg");chart.setAttribute("class","ox-chart");chart.setAttribute("viewBox","0 0 1200 660");chart.setAttribute("preserveAspectRatio","none");
chart.innerHTML='<g fill="none" stroke="#b88a3a" stroke-width=".6" opacity=".55"><path d="M80 520 L210 470 L300 500 L420 430"/><path d="M880 140 L960 210 L1060 190 L1120 260"/><circle cx="600" cy="420" r="560" stroke-dasharray="2 10"/></g>';ox.appendChild(chart);
/* the greeting, in the sky */
var sky=D.createElement("div");sky.className="ox-sky";
var eb=D.createElement("div");eb.className="ox-eyebrow";eb.textContent="Ingenium · "+((D.getElementById("hxDate")||{}).textContent||"");sky.appendChild(eb);
var he=D.createElement("h2");he.className="ox-hello";he.textContent=(D.getElementById("hxHello")||{}).textContent||"Good evening";sky.appendChild(he);
var le=D.createElement("p");le.className="ox-lede";le.textContent=(hx.querySelector(".hx-lede")||{}).textContent||"";sky.appendChild(le);ox.appendChild(sky);
/* the next step, a card that drifts in */
var nx=D.createElement("div");nx.className="ox-next";var next=hx.querySelector(".hx-next");if(next)nx.appendChild(next);ox.appendChild(nx);
/* the orbital plane */
var stage=D.createElement("div");stage.className="ox-stage";var plane=D.createElement("div");plane.className="ox-plane";
[[300,"r1"],[560,"r2"],[860,"r3"]].forEach(function(r){var e=D.createElement("div");e.className="ox-ring "+r[1];e.style.width=e.style.height=r[0]+"px";plane.appendChild(e);});
var disc=D.createElement("div");disc.className="ox-disc";plane.appendChild(disc);stage.appendChild(plane);ox.appendChild(stage);
/* the sun: the seal key, moved in whole */
var sun=D.createElement("div");sun.className="ox-sun";var seal=D.getElementById("hxSeal");if(seal)sun.appendChild(seal);ox.appendChild(sun);
/* the planets: the six keys themselves */
var keys=[].slice.call(hx.querySelectorAll(".hx-keys .hx-key"));
var orbit=[0,1,2,3,4,5].map(function(i){return {r:430,w:.000085,a:Math.PI/2+i*Math.PI/3};});
keys.forEach(function(k,i){k.classList.add("ox-p");ox.appendChild(k);k.__o=orbit[i%orbit.length];
  k.addEventListener("pointerenter",function(){hold=k;ox.classList.add("ox-hold");k.classList.add("ox-on");});
  k.addEventListener("pointerleave",function(){if(hold===k)hold=null;ox.classList.remove("ox-hold");k.classList.remove("ox-on");});});
var leg=D.createElement("div");leg.className="ox-legend";leg.textContent="Point at a room to bring it near; press to enter.";ox.appendChild(leg);
var head=hx.querySelector(".hx-head");head.parentNode.insertBefore(ox,head);head.style.display="none";
var work=hx.querySelector(".hx-work");if(work)work.style.display="none";
/* the motion: speed eases to a stop while a room is held */
var hold=null,speed=1,last=performance.now(),t=0;
function still(){var b=D.body;return b.getAttribute("data-motion")==="minimal"||b.getAttribute("data-calm")==="1"||(W.matchMedia&&matchMedia("(prefers-reduced-motion: reduce)").matches);}
function frame(now){var dt=Math.min(50,now-last);last=now;var target=hold||still()?0:1;speed+=(target-speed)*Math.min(1,dt/260);t+=dt*speed;
  var R=ox.getBoundingClientRect(),cx=R.width/2,cy=R.height*.63,tilt=Math.cos(70*Math.PI/180);
  keys.forEach(function(k){var o=k.__o,th=o.a+o.w*t;var x=cx+Math.cos(th)*o.r,y=cy+Math.sin(th)*o.r*tilt,dep=(Math.sin(th)+1)/2;
    var sc=.74+.34*dep+(k===hold?.22:0);var w=k.offsetWidth||150,h=k.offsetHeight||130;
    k.style.transform="translate("+(x-w/2).toFixed(1)+"px,"+(y-h*.42).toFixed(1)+"px) scale("+sc.toFixed(3)+")";k.style.zIndex=String(10+Math.round(dep*40)+(k===hold?50:0));});
  requestAnimationFrame(frame);}
requestAnimationFrame(frame);
})();
