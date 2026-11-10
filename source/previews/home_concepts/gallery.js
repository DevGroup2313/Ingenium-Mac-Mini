/* CONCEPT (preview only): Home as a salon wall. The Offline Project's crest hangs at the centre in its gilded frame; the six rooms hang
   around it as framed pictures on cords from a picture rail, each lit from above; pointed at, a frame swings toward you and its light
   comes up. The greeting is engraved on a brass plaque, with the seal key mounted beside it. The real keys and the seal key are moved
   in whole, so each still does what it did. */
(function(){
var D=document,W=window,hx=D.getElementById("hx");if(!hx||D.getElementById("gx"))return;
var css=`
#gx{position:relative;height:800px;margin:0 0 30px;border-radius:26px;overflow:hidden;perspective:1600px;
  background:radial-gradient(120% 80% at 50% 0%,#fbf8f2 0%,#f1ebe1 60%,#e8e0d3 100%);
  box-shadow:inset 0 0 0 1px rgba(120,90,40,.12),0 14px 30px rgba(40,22,68,.08)}
body[data-theme="night"] #gx{background:radial-gradient(120% 80% at 50% 0%,#2a2136 0%,#1d1727 60%,#151019 100%);box-shadow:inset 0 0 0 1px rgba(216,180,106,.12),0 14px 30px rgba(0,0,0,.45)}
#gx .gx-rail{position:absolute;left:0;right:0;top:46px;height:6px;background:linear-gradient(180deg,#d8b46a,#9a7330);box-shadow:0 2px 3px rgba(60,40,10,.25)}
#gx .gx-cords{position:absolute;inset:0;pointer-events:none}
#gx .gx-plaque{position:absolute;left:36px;top:96px;width:290px;box-sizing:border-box;padding:20px 22px 18px;border-radius:6px;
  background:linear-gradient(135deg,#e9cf8f,#c79b4a 45%,#e2c27c 70%,#b48434);color:#3b2a10;
  box-shadow:inset 0 1px 0 rgba(255,255,255,.6),inset 0 -2px 0 rgba(90,60,10,.35),0 2px 2px rgba(60,40,10,.2),0 10px 20px rgba(60,40,10,.18);animation:gxHang 1s cubic-bezier(.22,1,.36,1) backwards}
#gx .gx-plaque .gx-date{font:600 10.5px/1 var(--x-sans);letter-spacing:.3em;text-transform:uppercase;opacity:.8}
#gx .gx-plaque h2{margin:10px 0 8px;font:600 30px/1.08 var(--x-serif);text-shadow:0 1px 0 rgba(255,255,255,.45),0 -1px 0 rgba(90,60,10,.35)}
#gx .gx-plaque p{margin:0;font:italic 13.5px/1.5 var(--x-serif);opacity:.9}
#gx .gx-medal{position:absolute;left:181px;top:420px;z-index:4;transform:translateX(-50%)}
#gx .gx-medal::before{content:"";position:absolute;left:50%;top:50%;width:132px;height:132px;margin:-66px 0 0 -66px;border-radius:50%;
  background:radial-gradient(circle at 40% 35%,#f3dc9e,#c79b4a 60%,#9a7330);box-shadow:inset 0 2px 0 rgba(255,255,255,.5),inset 0 -4px 8px rgba(90,60,10,.4),0 10px 22px rgba(60,40,10,.25)}
#gx .gx-centre{position:absolute;left:356px;top:96px;z-index:3}
#gx .gx-frame{position:absolute;display:block;cursor:pointer;transform-style:preserve-3d;transition:transform .5s cubic-bezier(.22,1,.36,1);animation:gxHang 1.1s cubic-bezier(.22,1,.36,1) backwards}
#gx .gx-gilt{position:relative;padding:14px;border-radius:4px;
  background:linear-gradient(135deg,#f1d792 0%,#b98a3c 22%,#e8c879 45%,#a87a2e 70%,#e3c070 100%);
  box-shadow:inset 0 0 0 2px rgba(255,240,200,.55),inset 0 0 0 5px rgba(120,80,20,.35),0 2px 3px rgba(60,40,10,.25),0 14px 26px rgba(60,40,10,.22),0 30px 50px rgba(40,22,68,.14);transition:box-shadow .5s ease}
#gx .gx-mat{padding:10px;background:#2a1d40;box-shadow:inset 0 2px 6px rgba(0,0,0,.6)}
#gx .gx-art{display:grid;place-items:center;height:100%;background:radial-gradient(circle at 50% 40%,#f7f1ff,#e5d9f5 70%,#d6c6ee);position:relative;overflow:hidden}
body[data-theme="night"] #gx .gx-art{background:radial-gradient(circle at 50% 40%,#3a2d55,#271e3a 70%,#1d1630)}
#gx .gx-light{position:absolute;left:50%;top:-34px;width:70%;height:180px;transform:translateX(-50%);pointer-events:none;opacity:.35;transition:opacity .5s ease;
  background:radial-gradient(ellipse 50% 60% at 50% 0%,rgba(255,236,190,.85),rgba(255,236,190,0) 70%);mix-blend-mode:screen}
#gx .gx-lamp{position:absolute;left:50%;top:-22px;width:56px;height:8px;margin-left:-28px;border-radius:4px;background:linear-gradient(180deg,#e3c070,#8f6526);box-shadow:0 2px 3px rgba(60,40,10,.3)}
#gx .gx-frame:hover .gx-light,#gx .gx-frame:focus-visible .gx-light{opacity:1}
#gx .gx-frame:hover{transform:translateZ(46px) rotateX(var(--rx,0deg)) rotateY(var(--ry,0deg))}
#gx .gx-frame:hover .gx-gilt{box-shadow:inset 0 0 0 2px rgba(255,240,200,.55),inset 0 0 0 5px rgba(120,80,20,.35),0 4px 6px rgba(60,40,10,.25),0 26px 40px rgba(60,40,10,.26),0 50px 80px rgba(40,22,68,.2)}
#gx .gx-label{display:block;margin:12px auto 0;width:max-content;max-width:100%;padding:5px 12px;border-radius:3px;background:linear-gradient(135deg,#e9cf8f,#c79b4a);
  color:#3b2a10;font:600 12px/1.2 var(--x-serif);letter-spacing:.12em;text-transform:uppercase;box-shadow:inset 0 1px 0 rgba(255,255,255,.5),0 2px 4px rgba(60,40,10,.2)}
#gx .hx-key.gx-k{all:unset;display:contents}
#gx .hx-key.gx-k .hx-jewel{width:64px;height:64px;border-radius:18px}
#gx .hx-key.gx-k .hx-jewel svg{width:28px;height:28px}
#gx .gx-art .hx-kt{position:absolute;left:0;right:0;bottom:10px;text-align:center}
#gx .gx-art .hx-kh{display:none}
#gx .gx-art .hx-kd{display:block;margin:0 14px;font:italic 12px/1.35 var(--x-serif);color:#5a4d63;opacity:0;transition:opacity .4s ease}
body[data-theme="night"] #gx .gx-art .hx-kd{color:#cdbfe0}
#gx .gx-frame:hover .gx-art .hx-kd{opacity:1}
#gx .gx-art .hx-km{position:absolute;top:8px;right:10px;font-size:10.5px}
#gx .gx-art .hx-arrow{display:none}
#gx .gx-centre .gx-art > #hxCrest{transform:scale(.8);transform-origin:50% 50%}
#gx .gx-art .hx-key.gx-k .hx-jewel{margin-top:14px}
#gx .gx-next{position:absolute;left:36px;bottom:30px;width:290px;box-sizing:border-box;padding:14px 16px;border-radius:14px;background:rgba(255,253,248,.85);
  box-shadow:inset 0 0 0 1px rgba(120,90,40,.18),0 10px 24px rgba(60,40,10,.14)}
body[data-theme="night"] #gx .gx-next{background:rgba(40,32,54,.85)}
#gx .gx-next .hx-next{background:none;border:0;box-shadow:none;padding:0}
@keyframes gxHang{0%{opacity:0;transform:translateY(-24px) rotate(-2deg)}60%{transform:translateY(4px) rotate(.8deg)}100%{opacity:1;transform:none}}
body[data-motion="minimal"] #gx *,body[data-calm="1"] #gx *{animation:none !important;transition:none !important}
`;
var st=D.createElement("style");st.id="gx-css";st.textContent=css;D.head.appendChild(st);
function el(t,c,x){var e=D.createElement(t);if(c)e.className=c;if(x!=null)e.textContent=x;return e;}
var gx=el("section");gx.id="gx";gx.appendChild(el("div","gx-rail"));
var cords=D.createElementNS("http://www.w3.org/2000/svg","svg");cords.setAttribute("class","gx-cords");gx.appendChild(cords);
var pl=el("div","gx-plaque");pl.appendChild(el("div","gx-date","Ingenium · "+((D.getElementById("hxDate")||{}).textContent||"")));
pl.appendChild(el("h2",null,(D.getElementById("hxHello")||{}).textContent||"Good evening"));pl.appendChild(el("p",null,(hx.querySelector(".hx-lede")||{}).textContent||""));gx.appendChild(pl);
var med=el("div","gx-medal");var seal=D.getElementById("hxSeal");if(seal)med.appendChild(seal);gx.appendChild(med);
/* the centrepiece: the Offline Project's crest in its own frame */
var cen=el("div","gx-frame gx-centre");cen.style.animationDelay=".1s";var cg=el("div","gx-gilt"),cm=el("div","gx-mat"),ca=el("div","gx-art");ca.style.height="300px";ca.style.width="230px";
var crest=D.getElementById("hxCrest");if(crest){ca.appendChild(crest);}cm.appendChild(ca);cg.appendChild(cm);cen.appendChild(el("span","gx-lamp"));cen.appendChild(el("span","gx-light"));cen.appendChild(cg);cen.appendChild(el("span","gx-label","The Offline Project"));gx.appendChild(cen);
/* the rooms, hung salon style around it */
var keys=[].slice.call(hx.querySelectorAll(".hx-keys .hx-key"));
keys.forEach(function(k,i){var f=el("a","gx-frame");f.tabIndex=0;f.setAttribute("role","link");f.style.animationDelay=(.18+i*.08)+"s";
  var g=el("div","gx-gilt"),m=el("div","gx-mat"),a=el("div","gx-art");k.classList.add("gx-k");a.appendChild(k);m.appendChild(a);g.appendChild(m);
  f.appendChild(el("span","gx-lamp"));f.appendChild(el("span","gx-light"));f.appendChild(g);f.appendChild(el("span","gx-label",(k.querySelector(".hx-kh")||{}).textContent||""));
  f.addEventListener("click",function(e){if(e.target===k||k.contains(e.target))return;k.click();});
  f.addEventListener("keydown",function(e){if(e.key==="Enter"||e.key===" "){e.preventDefault();k.click();}});
  f.addEventListener("pointermove",function(e){var r=f.getBoundingClientRect();f.style.setProperty("--ry",(((e.clientX-r.left)/r.width-.5)*10).toFixed(2)+"deg");f.style.setProperty("--rx",((.5-(e.clientY-r.top)/r.height)*8).toFixed(2)+"deg");});
  f.addEventListener("pointerleave",function(){f.style.removeProperty("--rx");f.style.removeProperty("--ry");});
  gx.appendChild(f);});
var nx=el("div","gx-next");var next=hx.querySelector(".hx-next");if(next)nx.appendChild(next);gx.appendChild(nx);
var head=hx.querySelector(".hx-head");head.parentNode.insertBefore(gx,head);head.style.display="none";
var work=hx.querySelector(".hx-work");if(work)work.style.display="none";var plq=D.getElementById("hxPlaque");if(plq)plq.style.display="none";
/* lay the frames out to the wall's width: the plaque and the seal on the left, the crest in the middle, the six rooms as a salon
   cluster of two columns on the right; then draw their cords from the rail */
var ART=[[0,100],[0,92],[0,96],[0,104],[0,92],[0,100]];
function lay(){var W2=gx.clientWidth,cr=356+230+48+36,zone=W2-cr-30,col=Math.max(150,(zone-24)/2),aw=Math.round(col-48);
  var frames=[].slice.call(gx.querySelectorAll(".gx-frame:not(.gx-centre)")),y=[96,96];
  frames.forEach(function(f,i){var c=i%2,a=f.querySelector(".gx-art"),ah=ART[i][1]+(c?12:0);a.style.width=aw+"px";a.style.height=ah+"px";
    f.style.left=Math.round(cr+c*(col+24))+"px";f.style.top=Math.round(y[c]+(c&&i<2?22:0))+"px";y[c]+=ah+48+44+14+(c&&i<2?22:0);});
  var html="";[cen].concat(frames).forEach(function(f){var r=f.getBoundingClientRect(),R=gx.getBoundingClientRect(),cxp=r.left-R.left+r.width/2,top=r.top-R.top+6;
    html+='<path d="M'+(cxp-26)+' 52 L'+cxp+' '+top+' L'+(cxp+26)+' 52" fill="none" stroke="#9a7330" stroke-width="1.2" opacity=".7"/>';});
  cords.setAttribute("viewBox","0 0 "+gx.clientWidth+" "+gx.clientHeight);cords.innerHTML=html;}
setTimeout(lay,50);setTimeout(lay,1300);W.addEventListener("resize",lay);
})();
