/* CONCEPT (preview only): Home as an open codex on the desk. The greeting opens with an illuminated initial; the next step is a note
   in the margin; the rooms are the chapters, each line lifting off the page when pointed at; a ribbon marks the page and carries the
   seal key as its seal. The real keys and the seal key are moved in whole, so each still does what it did. */
(function(){
var D=document,W=window,hx=D.getElementById("hx");if(!hx||D.getElementById("cx"))return;
var css=`
#cx{position:relative;margin:6px 0 34px;padding:26px 0 150px;perspective:2200px}
#cx .cx-desk{position:absolute;inset:0;border-radius:30px;background:linear-gradient(180deg,rgba(106,63,181,.06),rgba(106,63,181,0) 60%)}
#cx .cx-book{position:relative;margin:0 auto;width:min(1080px,100%);display:grid;grid-template-columns:1fr 1fr;transform:rotateX(9deg);transform-origin:50% 100%;
  padding:14px;border-radius:14px;background:linear-gradient(135deg,#5a3399,#45267a 55%,#3a2068);
  box-shadow:inset 0 0 0 2px rgba(216,180,106,.55),inset 0 0 0 7px #4a2a82,inset 0 0 0 8px rgba(216,180,106,.35),0 2px 2px rgba(40,22,68,.12),0 12px 20px rgba(40,22,68,.16),0 34px 60px rgba(40,22,68,.22),0 60px 90px rgba(40,22,68,.12);
  animation:cxOpen 1.1s cubic-bezier(.22,1,.36,1) backwards}
@keyframes cxOpen{0%{opacity:0;transform:rotateX(26deg) translateY(30px)}100%{opacity:1;transform:rotateX(9deg)}}
#cx .cx-page{position:relative;min-height:540px;padding:38px 44px 34px;background:#fbf6ea;color:#2b2233;font-family:var(--x-serif)}
#cx .cx-l{border-radius:6px 2px 2px 6px;background:linear-gradient(90deg,#f6efde 0%,#fcf8ee 8%,#fbf6ea 80%,#efe5cf 96%,#e3d6bb 100%);
  box-shadow:inset -10px 0 18px -10px rgba(90,60,20,.35),-3px 0 0 #efe6d2,-6px 0 0 #e7dcc4,-9px 0 0 #ded1b6}
#cx .cx-r{border-radius:2px 6px 6px 2px;background:linear-gradient(270deg,#f6efde 0%,#fcf8ee 8%,#fbf6ea 80%,#efe5cf 96%,#e3d6bb 100%);
  box-shadow:inset 10px 0 18px -10px rgba(90,60,20,.35),3px 0 0 #efe6d2,6px 0 0 #e7dcc4,9px 0 0 #ded1b6}
body[data-theme="night"] #cx .cx-page{color:#eadff5}
body[data-theme="night"] #cx .cx-l{background:linear-gradient(90deg,#211a2c 0%,#2a2238 10%,#282035 80%,#1c1626 100%);box-shadow:inset -10px 0 18px -10px rgba(0,0,0,.6),-3px 0 0 #2e2540,-6px 0 0 #272036,-9px 0 0 #201a2d}
body[data-theme="night"] #cx .cx-r{background:linear-gradient(270deg,#211a2c 0%,#2a2238 10%,#282035 80%,#1c1626 100%);box-shadow:inset 10px 0 18px -10px rgba(0,0,0,.6),3px 0 0 #2e2540,6px 0 0 #272036,9px 0 0 #201a2d}
#cx .cx-run{font:600 10.5px/1 var(--x-sans);letter-spacing:.3em;text-transform:uppercase;color:#a07a2e;text-align:center;margin-bottom:26px}
#cx .cx-open{display:grid;grid-template-columns:auto 1fr;gap:4px 18px;align-items:start}
#cx .cx-init{width:104px;height:104px;border-radius:6px;display:grid;place-items:center;position:relative;
  background:radial-gradient(circle at 35% 30%,#8b62d0,#5d37a1 60%,#45267a);color:#fff8e6;font:600 74px/1 var(--x-serif);
  box-shadow:inset 0 0 0 3px #d8b46a,inset 0 0 0 6px #5d37a1,inset 0 0 0 7px rgba(216,180,106,.7),0 3px 4px rgba(40,22,68,.25),0 10px 20px rgba(40,22,68,.2);
  text-shadow:0 2px 0 rgba(0,0,0,.25);animation:cxGild 6s ease-in-out infinite}
#cx .cx-init svg{position:absolute;inset:0;width:100%;height:100%;pointer-events:none}
@keyframes cxGild{0%,100%{filter:brightness(1)}50%{filter:brightness(1.12)}}
#cx .cx-hello{margin:0;font:600 40px/1.05 var(--x-serif);letter-spacing:-.005em;padding-top:6px}
#cx .cx-lede{grid-column:1 / -1;margin:16px 0 0;font:italic 17px/1.6 var(--x-serif);color:#5a4d63}
body[data-theme="night"] #cx .cx-lede{color:#c9bcd8}
#cx .cx-nota{margin-top:26px;padding:14px 0 0;border-top:1px solid rgba(160,122,46,.35)}
#cx .cx-nota h4{margin:0 0 6px;font:600 12px/1 var(--x-sans);letter-spacing:.22em;text-transform:uppercase;color:#9a3b2a}
body[data-theme="night"] #cx .cx-nota h4{color:#e08a6e}
#cx .cx-nota .hx-next{background:none;border:0;box-shadow:none;padding:0}
#cx .cx-nota .hx-next-h{display:none}
#cx .cx-cap{font:600 12px/1 var(--x-sans);letter-spacing:.3em;text-transform:uppercase;color:#a07a2e;margin:0 0 18px;text-align:center}
#cx .cx-cap::after{content:"";display:block;width:60px;height:1px;margin:10px auto 0;background:#b88a3a}
#cx .hx-key.cx-ch{all:unset;box-sizing:border-box;display:grid;grid-template-columns:36px minmax(0,1fr) auto;gap:2px 10px;align-items:baseline;width:100%;padding:10px 12px;margin:2px 0;
  border-radius:10px;cursor:pointer;position:relative;transition:transform .35s cubic-bezier(.22,1,.36,1),box-shadow .35s ease,background .3s ease}
#cx .hx-key.cx-ch .cx-num{font:600 15px/1 var(--x-serif);color:#a07a2e;text-align:right}
#cx .hx-key.cx-ch .hx-jewel{display:none}
#cx .hx-key.cx-ch .hx-kt{display:block}
#cx .hx-key.cx-ch .hx-kh{display:flex;align-items:baseline;gap:8px;font:600 20px/1.25 var(--x-serif);color:inherit}
#cx .hx-key.cx-ch .hx-kh::after{content:"";flex:1;border-bottom:1.5px dotted rgba(120,90,40,.45);transform:translateY(-5px)}
#cx .hx-key.cx-ch .hx-kd{display:block;font:italic 13.5px/1.45 var(--x-serif);color:#6b5d72;margin-top:2px}
body[data-theme="night"] #cx .hx-key.cx-ch .hx-kd{color:#b9abc9}
#cx .hx-key.cx-ch .hx-km{font:600 11.5px/1 var(--x-sans);color:#6a3fb5;white-space:nowrap}
body[data-theme="night"] #cx .hx-key.cx-ch .hx-km{color:#c3a8ee}
#cx .hx-key.cx-ch .hx-arrow{display:none}
#cx .hx-key.cx-ch:hover{transform:translateY(-3px);background:rgba(255,253,246,.9);box-shadow:0 1px 1px rgba(90,60,20,.06),0 4px 6px rgba(90,60,20,.07),0 12px 22px rgba(90,60,20,.10)}
body[data-theme="night"] #cx .hx-key.cx-ch:hover{background:rgba(52,42,68,.9);box-shadow:0 12px 22px rgba(0,0,0,.4)}
#cx .hx-key.cx-ch:hover .cx-num::before{content:"✒ ";color:#6a3fb5}
#cx .hx-key.cx-ch:active{transform:translateY(0)}
#cx .cx-ribbon{position:absolute;left:calc(50% - 15px);top:6px;width:30px;height:calc(100% - 60px);z-index:5;transform-origin:50% 0;animation:cxSway 7s ease-in-out infinite;pointer-events:none}
#cx .cx-ribbon::before{content:"";position:absolute;left:0;top:0;width:30px;height:calc(100% - 64px);
  background:linear-gradient(90deg,#4b2a86,#6a3fb5 40%,#55309a);clip-path:polygon(0 0,100% 0,100% 100%,50% calc(100% - 16px),0 100%);
  box-shadow:0 6px 12px rgba(40,22,68,.25)}
#cx .cx-ribbon .hx-seal{position:absolute;left:50%;bottom:-36px;transform:translateX(-50%);pointer-events:auto}
@keyframes cxSway{0%,100%{transform:rotate(-1.2deg)}50%{transform:rotate(1.2deg)}}
body[data-motion="minimal"] #cx *,body[data-calm="1"] #cx *{animation:none !important}
`;
var st=D.createElement("style");st.id="cx-css";st.textContent=css;D.head.appendChild(st);
function el(t,c,x){var e=D.createElement(t);if(c)e.className=c;if(x!=null)e.textContent=x;return e;}
var cx=el("section");cx.id="cx";cx.appendChild(el("div","cx-desk"));var book=el("div","cx-book");cx.appendChild(book);
var L=el("div","cx-page cx-l"),R=el("div","cx-page cx-r");book.appendChild(L);book.appendChild(R);
L.appendChild(el("div","cx-run","Ingenium · "+((D.getElementById("hxDate")||{}).textContent||"")));
var hello=(D.getElementById("hxHello")||{}).textContent||"Good evening";
var op=el("div","cx-open"),ini=el("div","cx-init",hello.charAt(0));
ini.insertAdjacentHTML("beforeend",'<svg viewBox="0 0 104 104" fill="none" stroke="#d8b46a" stroke-width="1.2"><path d="M12 22c8-2 10-8 10-10M92 22c-8-2-10-8-10-10M12 82c8 2 10 8 10 10M92 82c-8 2-10 8-10 10"/><circle cx="12" cy="12" r="2.5" fill="#d8b46a"/><circle cx="92" cy="12" r="2.5" fill="#d8b46a"/><circle cx="12" cy="92" r="2.5" fill="#d8b46a"/><circle cx="92" cy="92" r="2.5" fill="#d8b46a"/></svg>');
op.appendChild(ini);op.appendChild(el("h2","cx-hello",hello.slice(1)));op.appendChild(el("p","cx-lede",(hx.querySelector(".hx-lede")||{}).textContent||""));L.appendChild(op);
var nota=el("div","cx-nota");nota.appendChild(el("h4",null,"Nota bene · your next step"));var next=hx.querySelector(".hx-next");if(next)nota.appendChild(next);L.appendChild(nota);
R.appendChild(el("div","cx-run","The work"));R.appendChild(el("div","cx-cap","Capitula"));
var ROM=["I","II","III","IV","V","VI","VII","VIII"];
[].slice.call(hx.querySelectorAll(".hx-keys .hx-key")).forEach(function(k,i){k.classList.add("cx-ch");k.insertBefore(el("span","cx-num",ROM[i]+"."),k.firstChild);R.appendChild(k);});
var rib=el("div","cx-ribbon");var seal=D.getElementById("hxSeal");if(seal)rib.appendChild(seal);cx.appendChild(rib);
var head=hx.querySelector(".hx-head");head.parentNode.insertBefore(cx,head);head.style.display="none";
var work=hx.querySelector(".hx-work");if(work)work.style.display="none";
})();
