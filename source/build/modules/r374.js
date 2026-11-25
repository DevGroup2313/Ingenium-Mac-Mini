<style id="r374-css">
/* ============ R374 · THE ENGINE PANEL: ONE MODEL FOR ALL OF INGENIUM (Ingenium 7.77, 24 November 2026) ============
   Her words (24 November 2026): "I should be able to click on the "Engine" button from the top bar and be able to select to unload the
   model and other options for the models inside of the app, right now everything is just hidden and placed in the wrong locations and
   are split across random pages and sections, this does not feel like a true ecosystem"; "Instead of each page getting its own models
   controls, I think it should all be folded into and added to the Engine button and give it its own panel when you click on it and it
   operates for the entire app instead of individual controls scattered all around the app and overriding each other". Shown first as a
   live preview, rebuilt at her word ("The Engine panel looks basic and does not match Ingenium's display design"), then approved with
   three changes: the page names flat, lifting as a sticky note does; the Running card answering the pointer, its plate raised; the
   title fixed while only the body scrolls. Her answer: "I approve of the previews, please commit and push it everywhere".
   The Engine key in the top bar opens it (until 7.76 it opened Mentes). In it: the engine's state, with an analogue gauge of the
   model's size against this device's memory; the pages that write with the model; the models ready on this device and those her
   computers lend; Load and Unload; and Reply, Memory and Effort for the model (the record of r249 and r321, the same in every place).
   Choosing a model makes it the model of the whole app: Chat, Code, Lector, Vocatio, Ingenia, Adamas, Fabrica and Concordia write
   with it (IngLector.plan takes it, so Lector's own list, Read and written by, gives way to one line that says which model reads and
   opens this panel). Mentes keeps adding, removing and checking models. */
#ingEngine{
  --l-bg:#f5f3f7;--l-bg2:#efeaf4;--l-card:#ffffff;--l-lo:#eee8f4;--l-a:#ffffff;--l-b:#f9f7fc;
  --l-ink1:#221a2e;--l-ink2:#4a4358;--l-ink3:#6c6579;--l-hair:rgba(34,26,46,.10);--l-hair2:rgba(34,26,46,.06);
  --l-acc:#6a3fb5;--l-accs:rgba(106,63,181,.12);--l-ring:rgba(106,63,181,.5);--l-gold:#b88a3a;--l-golds:rgba(202,162,74,.16);
  --l-ok:#2f7a55;--l-oks:rgba(47,122,85,.12);
  --l-code:#f7f5fa;--l-codeink:#2a2236;--l-kw:#7a3fb5;--l-str:#1d6b54;--l-com:#8a8296;--l-num:#a05a12;--l-hl:rgba(202,162,74,.22);
  --l-raise:0 1px 0 rgba(40,22,68,.06),0 2px 6px rgba(40,22,68,.05),0 12px 30px rgba(40,22,68,.07);
  --l-bevel:rgba(255,255,255,.85);
  --l-slab:inset 0 1px 0 var(--l-bevel),inset 0 -1px 0 rgba(40,22,68,.05),0 1px 0 rgba(40,22,68,.10),0 3px 0 rgba(40,22,68,.05),0 6px 12px rgba(40,22,68,.07),0 18px 36px rgba(40,22,68,.08);
  --l-slabhi:inset 0 1px 0 var(--l-bevel),inset 0 -1px 0 rgba(40,22,68,.05),0 1px 0 rgba(40,22,68,.11),0 4px 0 rgba(40,22,68,.05),0 9px 16px rgba(40,22,68,.09),0 24px 44px rgba(40,22,68,.10);
  --l-pop:inset 0 -1.5px 0 rgba(40,22,68,.13),0 2px 0 rgba(40,22,68,.25),0 4px 5px rgba(40,22,68,.16),0 9px 14px rgba(40,22,68,.10);
  --l-pophi:inset 0 -1.5px 0 rgba(40,22,68,.13),0 3px 0 rgba(40,22,68,.25),0 6px 8px rgba(40,22,68,.18),0 13px 20px rgba(40,22,68,.12);
  --l-press:inset 0 2px 5px rgba(40,22,68,.22),0 1px 1px rgba(40,22,68,.18);
  --l-well:inset 0 1px 2.5px rgba(40,22,68,.08);--l-wellbg:rgba(34,26,46,.03);
  --l-pill:inset 0 1px 0 rgba(255,255,255,.6),inset 0 -1.5px 0 rgba(40,20,70,.10),0 1px 0 rgba(40,20,70,.12),0 3px 4px rgba(40,20,70,.09),0 7px 10px rgba(40,20,70,.06);
  --l-pa:#7348be;--l-pb:#5d37a1;--l-pedge:#4b2a86;--l-pledge:#3a2070;
  --l-psh:inset 0 1px 0 rgba(255,255,255,.16),0 2px 0 var(--l-pledge),0 4px 6px rgba(40,22,68,.24),0 9px 16px rgba(40,22,68,.16);
  --l-pshhi:inset 0 1px 0 rgba(255,255,255,.18),0 3px 0 var(--l-pledge),0 6px 9px rgba(40,22,68,.26),0 13px 22px rgba(40,22,68,.18);
  --l-ppress:inset 0 2px 6px rgba(20,8,40,.45),0 1px 1px rgba(40,22,68,.2);
  --l-spring:cubic-bezier(.34,1.35,.64,1);
  --l-serif:"Iowan Old Style","Palatino Linotype",Palatino,"Book Antiqua",Georgia,"Times New Roman",serif;
  --l-sans:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif;
  --l-mono:ui-monospace,"SF Mono",Menlo,Consolas,"Liberation Mono",monospace;
  --l-h:640px;
  position:relative;display:flex;flex-direction:column;gap:12px;height:var(--l-h);min-height:420px;color:var(--l-ink1);font:14px/1.5 var(--l-sans)}
body[data-theme="night"] #ingEngine{
  --l-bg:#110d18;--l-bg2:#17121f;--l-card:#201a2b;--l-lo:#2a2239;--l-a:#2a2239;--l-b:#251e33;
  --l-ink1:#f3eefb;--l-ink2:#d3c9e3;--l-ink3:#a99cc1;--l-hair:rgba(205,184,240,.11);--l-hair2:rgba(205,184,240,.07);
  --l-acc:#b79ce6;--l-accs:rgba(183,156,230,.16);--l-ring:rgba(183,156,230,.45);--l-gold:#d8b46a;--l-golds:rgba(216,180,106,.16);
  --l-ok:#7fd1a6;--l-oks:rgba(127,209,166,.14);
  --l-code:#17121f;--l-codeink:#e8e1f4;--l-kw:#c9a8ff;--l-str:#8fd6b5;--l-com:#8a8296;--l-num:#f0b56a;--l-hl:rgba(216,180,106,.18);
  --l-raise:0 1px 0 rgba(0,0,0,.40),0 2px 6px rgba(0,0,0,.30),0 12px 30px rgba(0,0,0,.34);
  --l-bevel:rgba(255,255,255,.06);
  --l-slab:inset 0 1px 0 var(--l-bevel),inset 0 -1px 0 rgba(0,0,0,.35),0 1px 0 rgba(0,0,0,.6),0 3px 0 rgba(0,0,0,.28),0 6px 12px rgba(0,0,0,.35),0 18px 36px rgba(0,0,0,.4);
  --l-slabhi:inset 0 1px 0 rgba(255,255,255,.08),inset 0 -1px 0 rgba(0,0,0,.35),0 1px 0 rgba(0,0,0,.6),0 4px 0 rgba(0,0,0,.3),0 9px 16px rgba(0,0,0,.4),0 24px 44px rgba(0,0,0,.45);
  --l-pop:inset 0 1px 0 rgba(255,255,255,.07),inset 0 -2px 0 rgba(0,0,0,.45),0 2px 0 rgba(0,0,0,.75),0 4px 5px rgba(0,0,0,.50),0 9px 14px rgba(0,0,0,.36);
  --l-pophi:inset 0 1px 0 rgba(255,255,255,.08),inset 0 -2px 0 rgba(0,0,0,.45),0 3px 0 rgba(0,0,0,.75),0 6px 8px rgba(0,0,0,.52),0 13px 20px rgba(0,0,0,.40);
  --l-press:inset 0 2px 6px rgba(0,0,0,.6),0 1px 1px rgba(0,0,0,.4);
  --l-well:inset 0 1px 3px rgba(0,0,0,.4);--l-wellbg:rgba(10,6,18,.35);
  --l-pill:inset 0 1px 0 rgba(255,255,255,.09),inset 0 -1.5px 0 rgba(0,0,0,.4),0 1px 0 rgba(0,0,0,.5),0 3px 5px rgba(0,0,0,.4),0 8px 12px rgba(0,0,0,.3);
  --l-pa:#7a56c8;--l-pb:#5b3aa1;--l-pedge:#2c1956;--l-pledge:#170b30;
  --l-psh:inset 0 1px 0 rgba(255,255,255,.14),0 2px 0 var(--l-pledge),0 4px 6px rgba(0,0,0,.5),0 9px 16px rgba(0,0,0,.36);
  --l-pshhi:inset 0 1px 0 rgba(255,255,255,.16),0 3px 0 var(--l-pledge),0 6px 9px rgba(0,0,0,.52),0 13px 22px rgba(0,0,0,.4)}
#ingEngine{position:fixed;z-index:9100;width:min(480px,calc(100vw - 24px));border-radius:22px;display:flex;flex-direction:column;overflow:hidden;color:var(--l-ink1);font:14px/1.5 var(--l-sans);
  background:linear-gradient(180deg,var(--l-card),var(--l-b));border:1px solid var(--l-hair);box-shadow:var(--l-slabhi);transform-origin:24% 0;animation:ieRise .42s cubic-bezier(.2,1.25,.35,1) both}
@keyframes ieRise{0%{opacity:0;transform:translateY(-8px) scale(.96)}100%{opacity:1;transform:none}}
#ingEngine *{box-sizing:border-box}
#ingEngine .ie-h{flex:0 0 auto;display:flex;align-items:center;gap:12px;padding:16px 16px 10px 18px;border-bottom:1px solid var(--l-hair2);background:var(--l-card)}
#ingEngine .ie-h h2{flex:1;margin:0;font:600 24px/1.1 var(--l-serif);letter-spacing:.01em;color:var(--l-ink1)}
#ingEngine .ie-h h2 small{display:block;font:600 10.5px/1.4 var(--l-sans);letter-spacing:.18em;text-transform:uppercase;color:var(--l-acc);margin-top:3px}
#ingEngine .ie-seal{width:34px;height:34px;flex:0 0 auto;display:grid;place-items:center;border-radius:50%;overflow:hidden}
#ingEngine .ie-seal .isl{pointer-events:none}
#ingEngine .ie-b{flex:1 1 auto;min-height:0;overflow:auto;scrollbar-width:none;padding:4px 0 16px;overscroll-behavior:contain}
#ingEngine .ie-b::-webkit-scrollbar{display:none}
#ingEngine .k{position:relative;display:inline-flex;align-items:center;justify-content:center;gap:7px;border:1px solid var(--l-hair);background:linear-gradient(var(--l-a),var(--l-b));border-radius:10px;padding:8px 14px;
  font:600 13px/1 var(--l-sans);cursor:pointer;white-space:nowrap;box-shadow:var(--l-pop);color:var(--l-ink1);transition:transform .18s var(--l-spring),box-shadow .18s ease,color .15s}
#ingEngine .k:hover:not(:disabled){transform:translateY(-2px);box-shadow:var(--l-pophi)}
#ingEngine .k:active:not(:disabled){transform:translateY(1px) scale(.985);box-shadow:var(--l-press);transition-duration:.06s}
#ingEngine .k:disabled{opacity:.5;cursor:default}
#ingEngine .k.pri{background:linear-gradient(var(--l-pa),var(--l-pb));border-color:var(--l-pedge);color:#fff;box-shadow:var(--l-psh);text-shadow:0 1px 1px rgba(30,10,60,.35)}
#ingEngine .k.pri:hover:not(:disabled){box-shadow:var(--l-pshhi)}
#ingEngine .k.pri:active:not(:disabled){box-shadow:var(--l-ppress)}
#ingEngine .k.round{width:34px;height:34px;padding:0;border-radius:50%}
#ingEngine .k.round:hover:not(:disabled){transform:translateY(-2px) rotate(90deg)}
#ingEngine .lnk{font:600 13px/1 var(--l-sans);color:var(--l-acc);text-decoration:underline;text-underline-offset:4px;background:none;border:0;cursor:pointer;padding:6px 2px;transition:transform .18s var(--l-spring)}
#ingEngine .lnk:hover{transform:translateY(-1px)}
#ingEngine .ie-st{display:grid;grid-template-columns:118px 1fr;gap:14px;align-items:center;margin:8px 16px 4px;padding:12px 14px;border-radius:16px;background:linear-gradient(var(--l-a),var(--l-b));border:1px solid var(--l-hair);box-shadow:var(--l-slab);
  transform:perspective(700px) rotateX(var(--rx,0deg)) rotateY(var(--ry,0deg)) translateY(var(--ty,0px));transition:transform .35s var(--l-spring),box-shadow .25s;will-change:transform}
#ingEngine .ie-st:hover{--ty:-3px;box-shadow:var(--l-slabhi)}
#ingEngine .ie-st.tracking{transition:transform .12s ease-out,box-shadow .25s}
#ingEngine .ie-g svg{display:block;width:118px;height:70px;overflow:visible}
#ingEngine .ie-g .needle{transform-origin:59px 62px;transition:transform 1.1s cubic-bezier(.34,1.25,.5,1)}
#ingEngine .ie-g .nudge{transform-origin:59px 62px;transition:transform .5s cubic-bezier(.34,1.8,.5,1)}
#ingEngine .ie-g text{font:700 8.5px var(--l-sans);fill:var(--l-ink3);letter-spacing:.06em}
#ingEngine .chip{display:inline-flex;align-items:center;gap:6px;font:700 10.5px/1 var(--l-sans);letter-spacing:.1em;text-transform:uppercase;padding:6px 10px;border-radius:10px;cursor:default;color:var(--l-ok);
  border:1px solid rgba(31,157,99,.22);background:linear-gradient(rgba(31,157,99,.09),rgba(31,157,99,.09)),linear-gradient(var(--l-a),var(--l-b));
  box-shadow:inset 0 -1.5px 0 rgba(40,22,68,.13),0 2px 0 rgba(40,22,68,.22),0 4px 5px rgba(40,22,68,.14),0 9px 14px rgba(40,22,68,.08);transition:transform .3s var(--l-spring),box-shadow .2s}
#ingEngine .chip i{width:7px;height:7px;border-radius:50%;background:currentColor;box-shadow:0 0 0 3px rgba(31,157,99,.16)}
#ingEngine .chip:hover{transform:translateY(-2px) rotate(-1.5deg);box-shadow:inset 0 -1.5px 0 rgba(40,22,68,.13),0 3px 0 rgba(40,22,68,.22),0 6px 8px rgba(40,22,68,.16),0 13px 20px rgba(40,22,68,.1)}
#ingEngine .chip.load{color:#b8701a;border-color:rgba(232,144,42,.28);background:linear-gradient(rgba(232,144,42,.1),rgba(232,144,42,.1)),linear-gradient(var(--l-a),var(--l-b))}
#ingEngine .chip.load i{animation:iePulse 1s ease-in-out infinite}
#ingEngine .chip.off{color:var(--l-ink3);border-color:var(--l-hair);background:linear-gradient(var(--l-a),var(--l-b))}
#ingEngine .chip.bad{color:#b0302f;border-color:rgba(176,48,47,.25);background:linear-gradient(rgba(176,48,47,.08),rgba(176,48,47,.08)),linear-gradient(var(--l-a),var(--l-b))}
@keyframes iePulse{50%{opacity:.35}}
body[data-theme="night"] #ingEngine .chip{box-shadow:inset 0 1px 0 rgba(255,255,255,.07),inset 0 -2px 0 rgba(0,0,0,.45),0 2px 0 rgba(0,0,0,.75),0 4px 5px rgba(0,0,0,.5),0 9px 14px rgba(0,0,0,.36);
  background:linear-gradient(rgba(63,207,138,.1),rgba(63,207,138,.1)),linear-gradient(#2a2239,#251e33)}
body[data-theme="night"] #ingEngine .chip.load{background:linear-gradient(rgba(232,144,42,.12),rgba(232,144,42,.12)),linear-gradient(#2a2239,#251e33)}
body[data-theme="night"] #ingEngine .chip.off,body[data-theme="night"] #ingEngine .chip.bad{background:linear-gradient(#2a2239,#251e33)}
#ingEngine .ie-nm{font:600 17px/1.25 var(--l-serif);margin:6px 0 2px;color:var(--l-ink1)}
#ingEngine .ie-fine{font-size:12px;color:var(--l-ink3)}
#ingEngine .ie-sec{display:flex;align-items:center;gap:10px;margin:16px 18px 8px;font:700 10.5px/1.3 var(--l-sans);letter-spacing:.18em;text-transform:uppercase;color:var(--l-ink3)}
#ingEngine .ie-sec::after{content:"";flex:1;height:1px;background:linear-gradient(90deg,var(--l-hair),transparent)}
#ingEngine .ie-pages{display:flex;flex-wrap:wrap;gap:7px;margin:8px 16px 4px}
#ingEngine .pk{display:inline-flex;align-items:center;gap:6px;border:1px solid rgba(106,63,181,.16);border-radius:10px;padding:6px 11px;cursor:default;font:600 12.5px/1.2 var(--l-sans);color:#6a3fb5;
  background:rgba(106,63,181,.08);box-shadow:none;transition:transform .32s var(--l-spring),box-shadow .25s ease,background .2s}
#ingEngine .pk:hover{transform:translateY(-2px) rotate(-1.2deg);background:linear-gradient(rgba(106,63,181,.06),rgba(106,63,181,.06)),linear-gradient(var(--l-a),var(--l-b));box-shadow:var(--l-pophi)}
#ingEngine .pk svg{width:13px;height:13px;flex:0 0 auto}
body[data-theme="night"] #ingEngine .pk{color:#c9b3f2;border-color:rgba(183,156,230,.18);background:rgba(183,156,230,.1)}
body[data-theme="night"] #ingEngine .pk:hover{background:linear-gradient(rgba(183,156,230,.1),rgba(183,156,230,.1)),linear-gradient(#2a2239,#251e33)}
#ingEngine .ie-grp{display:flex;align-items:center;gap:8px;margin:12px 18px 6px;font:600 12.5px/1.3 var(--l-sans);color:var(--l-ink2)}
#ingEngine .ie-grp svg{width:15px;height:15px;color:var(--l-acc)}
#ingEngine .ie-list{display:flex;flex-direction:column;gap:8px;margin:0 14px}
#ingEngine .mt{display:grid;grid-template-columns:30px 1fr auto;gap:12px;align-items:center;width:100%;padding:10px 12px;border-radius:14px;border:1px solid var(--l-hair);cursor:pointer;color:var(--l-ink1);text-align:left;font:inherit;
  background:linear-gradient(var(--l-a),var(--l-b));box-shadow:var(--l-slab);transition:transform .28s var(--l-spring),box-shadow .25s}
#ingEngine .mt:hover{transform:translateY(-2px);box-shadow:var(--l-slabhi)}
#ingEngine .mt:active{transform:translateY(1px) scale(.995);transition-duration:.06s}
#ingEngine .mt[aria-checked="true"]{box-shadow:0 0 0 2px var(--l-ring),var(--l-slabhi)}
#ingEngine .orb{width:26px;height:26px;border-radius:50%;background:radial-gradient(circle at 35% 30%,#fff 0 12%,var(--o) 55%,var(--o2) 100%);box-shadow:inset 0 -2px 3px rgba(0,0,0,.18),0 2px 3px rgba(40,22,68,.25);transition:transform .4s var(--l-spring)}
#ingEngine .mt:hover .orb{transform:rotate(-12deg) scale(1.08)}
#ingEngine .mt .nm{font:600 14px/1.25 var(--l-sans);min-width:0}
#ingEngine .mt .nm small{display:block;font:500 11.5px/1.4 var(--l-sans);color:var(--l-ink3);margin-top:2px}
#ingEngine .house{display:inline-block;margin-left:6px;font:700 9.5px/1 var(--l-sans);letter-spacing:.14em;text-transform:uppercase;color:var(--l-acc);vertical-align:2px}
#ingEngine .plate{font:700 10px/1 var(--l-sans);letter-spacing:.1em;text-transform:uppercase;padding:6px 9px;border-radius:999px;box-shadow:var(--l-pill);background:linear-gradient(var(--l-a),var(--l-b));white-space:nowrap}
#ingEngine .plate.ok{color:var(--l-ok)}#ingEngine .plate.ld{color:#b8701a}#ingEngine .plate.rec{color:var(--l-acc)}
#ingEngine .ie-keys{display:flex;flex-wrap:wrap;gap:10px;align-items:center;margin:14px 16px 4px}
#ingEngine .ie-r{display:grid;grid-template-columns:74px 1fr 80px;align-items:center;gap:10px;margin:8px 18px 0}
#ingEngine .ie-r label,#ingEngine .ie-r .l{font:600 12.5px/1.2 var(--l-sans);color:var(--l-ink2)}
#ingEngine .ie-r output{font:600 13px/1 var(--l-sans);font-variant-numeric:tabular-nums;text-align:right;color:var(--l-ink1)}
#ingEngine .ie-r input{width:100%}
#ingEngine .ie-say{margin:3px 18px 0 102px;font-size:11.8px;color:var(--l-ink3)}
#ingEngine .ie-eff{display:flex;flex-wrap:wrap;gap:6px}
#ingEngine .ie-eff .k{padding:6px 11px;font-size:12px;border-radius:9px}
#ingEngine .ie-eff .k[aria-pressed="true"]{background:linear-gradient(var(--l-pa),var(--l-pb));border-color:var(--l-pedge);color:#fff;box-shadow:var(--l-psh)}
#ingEngine .ie-foot{margin:12px 18px 0;font-size:11.8px;color:var(--l-ink3)}
#ingEngine .ie-none{margin:4px 18px;font-size:12.5px;color:var(--l-ink3)}
#enginePill[aria-expanded="true"]{box-shadow:0 0 0 2px rgba(106,63,181,.5),0 3px 0 rgba(40,22,68,.2)}
/* Lector: its own list gives way to one line, the model of the whole app, and the way to this panel */
#lx7 .l-how-model,#lx7 .r365-who{display:none!important}
#lx7 .r374-who{display:block;margin:0 0 8px;padding:9px 12px;border-radius:12px;font-size:12.8px;line-height:1.45;color:var(--l-ink2);background:var(--l-wellbg);box-shadow:var(--l-well)}
#lx7 .r374-who b{color:var(--l-ink1)}
#lx7 .r374-who button{font:600 12.8px/1 var(--l-sans);color:var(--l-acc);text-decoration:underline;text-underline-offset:4px;background:none;border:0;cursor:pointer;padding:2px;margin-left:2px;transition:transform .18s var(--l-spring)}
#lx7 .r374-who button:hover{transform:translateY(-1px)}
body[data-motion="minimal"] #ingEngine,body[data-motion="minimal"] #ingEngine *{animation:none!important;transition:none!important}
@media (prefers-reduced-motion:reduce){#ingEngine,#ingEngine *{animation:none!important;transition:none!important}}
</style>
<script>try{(window.__ingParts=window.__ingParts||{})["p374"]="started";}catch(_){}
/* R374 · the Engine panel, one model for all of Ingenium: see the note at the top of its styles. window.IngEnginePanel */
(function r374(){
"use strict";
if(window.IngEnginePanel)return;
var W=window,D=document,P=null,T=0;
function $(i){return D.getElementById(i);}
function mk(t,c,x){var e=D.createElement(t);if(c)e.className=c;if(x!=null)e.textContent=x;return e;}
function esc(s){return String(s==null?"":s).replace(/[&<>"']/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c];});}
function fmt(n){try{return Number(n).toLocaleString("en-GB");}catch(e){return String(n);}}
function ready(){try{return (state.models||[]).filter(function(m){return m&&m.fileState==="ready";});}catch(e){return [];}}
function byId(id){return ready().filter(function(m){return m.id===id;})[0]||null;}
function linked(){try{return typeof W.supUsesLink==="function"&&!!supUsesLink();}catch(e){return false;}}
function lent(){var c={};try{c=state.cloud||{};}catch(e){}return linked()&&c.lendId?{id:c.lendId,model:c.model||"",name:c.computer||"your computer"}:null;}
function comps(){try{return ((W.IngLend&&IngLend.state().computers)||[]).filter(function(c){return (c.models||[]).length;});}catch(e){return [];}}
function gb(m){var b=+(m&&(m.sizeBytes||m.size))||0;return b>0?b/(1024*1024*1024):0;}
function mem(){try{return typeof W.deviceMemGB==="function"?deviceMemGB():null;}catch(e){return null;}}
function house(m){var H=[["velox","Velox"],["scriba","Scriba"],["magister","Magister"],["faber","Faber"]];
  for(var i=0;i<H.length;i++){try{var r=lineupRec(lineupKeyFor(H[i][0]));if(r&&r.id===m.id)return H[i][1];}catch(e){}}return "";}
function recId(){try{var r=lineupRec(lineupKeyFor("magister"));return r&&r.fileState==="ready"?r.id:null;}catch(e){return null;}}
function fit(m){try{return fitVerdict(m);}catch(e){return {level:"unknown"};}}
/* 7.81: a model's orb is its own colour (r380, one colour for each model everywhere); its fit is said in words under its name */
function shade(hex,k){var m=/^#([0-9a-f]{6})$/i.exec(hex||"");if(!m)return hex;var n=parseInt(m[1],16),r=(n>>16)&255,g=(n>>8)&255,b=n&255;return "rgb("+Math.round(r*k)+","+Math.round(g*k)+","+Math.round(b*k)+")";}
function orb(m){if(W.IngModelColour){var c=IngModelColour.of(m);return [c,shade(c,.62)];}var lv=fit(m).level;return lv==="ok"?["#4fc38a","#1f7a50"]:(lv==="heavy"?["#e57373","#a33a3a"]:["#f0c24e","#a67412"]);}
function chosen(){try{return byId(state.activeModelId);}catch(e){return null;}}
function loaded(){try{return Engine.modelId?byId(Engine.modelId):null;}catch(e){return null;}}
function st(){try{return Engine.status||"";}catch(e){return "";}}
function G(){return W.IngGen&&typeof IngGen.note==="function"?IngGen:null;}
/* the record's key for the model the whole app writes with (r249): a model here, or the computer's or connection's */
function gkey(){var c=chosen();if(!linked()&&c)return "m:"+c.id;var g=G();try{return g?g.key():"none";}catch(e){return "none";}}
function vals(k){var g=G(),r=null,d={tokens:1024,ctx:8192,effort:3};try{r=g?g.rec(k):null;d=(g&&g.defaults)||d;}catch(e){}var o={tokens:d.tokens,ctx:d.ctx,effort:d.effort};
  if(r){if(r.tokens>0)o.tokens=r.tokens;if(r.ctx>0)o.ctx=r.ctx;if(r.effort>=1&&r.effort<=5)o.effort=r.effort;}return o;}
/* a soft mechanical click, as the app's keys make (its own sound, when it has one) */
function click(){try{if(W.IngSound&&typeof IngSound.play==="function"){IngSound.play("paper");return;}}catch(e){}}
/* ---------- the pages that write with the model: names, not keys; each lifts under the pointer ---------- */
var PAGES=[["page-chat","Chat","M4 5h16v10H9l-5 4z"],["code","Code","M8 7l-5 5 5 5M16 7l5 5-5 5"],["page-lector","Lector","M4 5h6a2 2 0 0 1 2 2v12a2 2 0 0 0-2-2H4zM20 5h-6a2 2 0 0 0-2 2v12a2 2 0 0 1 2-2h6z"],
  ["page-career","Vocatio","M4 8h16v11H4zM9 8V5h6v3"],["page-folders","Ingenia","M3 7h7l2 2h9v10H3z"],["page-build","Adamas","M6 3h12l4 6-10 12L2 9z"],
  ["page-fabrica","Fabrica","M6 3v12M6 15a3 3 0 1 0 0 6 3 3 0 0 0 0-6zM18 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM18 9c0 6-12 3-12 6"],["page-blend","Concordia","M8 12a4 4 0 1 0 0-.01M16 12a4 4 0 1 0 0-.01"]];
function pagesHere(){return PAGES.filter(function(p){if(p[0]==="code")return !!D.querySelector('.nav-btn[data-page="code"]')||!!$("page-chat");return !!$(p[0]);});}
function svg(d){return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="'+d+'"/></svg>';}
/* ---------- the panel ---------- */
function seal(){var s=D.querySelector("#brandSealBtn .isl");if(s){var c=s.cloneNode(true);c.removeAttribute("id");c.classList.remove("down","hover");c.style.setProperty("--S","34px");return c;}var i=mk("span");i.textContent="✦";return i;}
function build(){P=mk("section");P.id="ingEngine";P.setAttribute("role","dialog");P.setAttribute("aria-label","The engine and its model");
  var h=mk("div","ie-h"),sl=mk("span","ie-seal");sl.appendChild(seal());h.appendChild(sl);
  var t=mk("h2");t.innerHTML="The engine<small>One model for all of Ingenium</small>";h.appendChild(t);
  var x=mk("button","k round");x.type="button";x.setAttribute("aria-label","Close the engine panel");x.innerHTML='<svg width="13" height="13" viewBox="0 0 16 16" aria-hidden="true"><path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>';
  x.onclick=function(){close();};h.appendChild(x);P.appendChild(h);
  var b=mk("div","ie-b");b.id="ieBody";P.appendChild(b);D.body.appendChild(P);}
function gauge(){var w=mk("div","ie-g"),ticks="";for(var i=0;i<=12;i++){var a=Math.PI*(1-i/12),r1=i%3?40:37,r2=44;ticks+='<line x1="'+(59+r1*Math.cos(a)).toFixed(1)+'" y1="'+(62-r1*Math.sin(a)).toFixed(1)+'" x2="'+(59+r2*Math.cos(a)).toFixed(1)+'" y2="'+(62-r2*Math.sin(a)).toFixed(1)+'" stroke="currentColor" stroke-width="'+(i%3?1:1.6)+'" style="color:var(--l-ink3)"/>';}
  var m=mem();w.innerHTML='<svg viewBox="0 0 118 70" aria-hidden="true"><defs><linearGradient id="ieBez" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ffffff"/><stop offset=".5" stop-color="#c9c4d8"/><stop offset="1" stop-color="#7d7695"/></linearGradient>'+
    '<linearGradient id="ieArc" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#1f9d63"/><stop offset=".65" stop-color="#e8b04a"/><stop offset="1" stop-color="#c0392b"/></linearGradient></defs>'+
    '<path d="M9 62 A50 50 0 0 1 109 62" fill="none" stroke="url(#ieBez)" stroke-width="5" stroke-linecap="round"/><path d="M15 62 A44 44 0 0 1 103 62" fill="none" stroke="url(#ieArc)" stroke-width="4" stroke-linecap="round" opacity=".8"/>'+ticks+
    '<g class="nudge"><g class="needle"><path d="M59 62 L59 22" stroke="#5d37a1" stroke-width="2.4" stroke-linecap="round"/><circle cx="59" cy="62" r="5.5" fill="url(#ieBez)" stroke="#5d37a1" stroke-width="1.2"/></g></g>'+
    '<text x="4" y="70">0</text><text x="92" y="70">'+(m?Math.round(m)+" GB":"")+'</text></svg>';return w;}
function stateCard(){var c=mk("div","ie-st");c.id="ieState";c.appendChild(gauge());var r=mk("div");
  var chip=mk("span","chip"),nm=mk("div","ie-nm"),fine=mk("div","ie-fine"),L=lent(),l=loaded(),s=st(),ch=chosen(),M=mem();
  if(L){chip.innerHTML="<i></i>Lent";nm.textContent=L.model||"Its model";fine.textContent="It answers from "+L.name+"; this device keeps its memory free.";}
  else if(s==="loading"){chip.className="chip load";chip.innerHTML="<i></i>Loading";nm.textContent=ch?ch.customName:"The model";fine.textContent="Loading into this device's memory…";}
  else if(s==="error"){chip.className="chip bad";chip.innerHTML="<i></i>Stopped";nm.textContent=ch?ch.customName:"The model";var le="";try{le=Engine.lastError||"";}catch(e){}fine.textContent=le?("It could not load: "+le):"It could not load. Try Load again, or another model.";}
  else if(l){chip.innerHTML="<i></i>"+(s==="busy"?"Writing":"Running");nm.textContent=l.customName;fine.textContent=(l===ch?"Loaded and ready, for every page.":"Loaded for a page's work; "+(ch?ch.customName:"your model")+" is the app's model.")+(M&&gb(l)?" Its file is about "+gb(l).toFixed(1)+" GB of this device's "+Math.round(M)+" GB.":"");}
  else{chip.className="chip off";chip.innerHTML="<i></i>Resting";nm.textContent="No model loaded";fine.textContent=ch?("Pages load "+ch.customName+" when they need it, or press Load."):"Choose a model below.";}
  r.appendChild(chip);r.appendChild(nm);r.appendChild(fine);c.appendChild(r);
  var nd=c.querySelector(".needle"),frac=L?0:(l?Math.min(1,gb(l)/(M||16)):0);setTimeout(function(){if(nd)nd.style.transform="rotate("+(-90+180*frac)+"deg)";},30);
  /* the card leans toward the pointer; the needle gives a small mechanical nudge as the pointer arrives */
  var nu=c.querySelector(".nudge");
  c.addEventListener("pointerenter",function(){if(!nu)return;nu.style.transform="rotate(5deg)";setTimeout(function(){nu.style.transform="rotate(-2deg)";},170);setTimeout(function(){nu.style.transform="";},360);});
  c.addEventListener("pointermove",function(e){var q=c.getBoundingClientRect(),x=(e.clientX-q.left)/q.width-.5,y=(e.clientY-q.top)/q.height-.5;c.classList.add("tracking");c.style.setProperty("--ry",(x*6).toFixed(2)+"deg");c.style.setProperty("--rx",(-y*6).toFixed(2)+"deg");});
  c.addEventListener("pointerleave",function(){c.classList.remove("tracking");c.style.setProperty("--ry","0deg");c.style.setProperty("--rx","0deg");});
  return c;}
function row(name,sub,colors,houseName,plate,checked,onpick,mid,run){var b=mk("button","mt");b.type="button";b.setAttribute("role","radio");b.setAttribute("aria-checked",String(!!checked));
  b.innerHTML='<span class="orb'+(run?' run':'')+'"'+(mid?' data-mid="'+esc(mid)+'" title="Press to change its colour"':'')+' style="--o:'+colors[0]+';--o2:'+colors[1]+';--mc:'+colors[0]+'"></span><span class="nm">'+esc(name)+(houseName?'<span class="house">'+esc(houseName)+'</span>':'')+'<small>'+esc(sub)+'</small></span>'+(plate||'');
  b.onclick=function(){click();onpick();};return b;}
function choose(m){try{if(linked()&&W.IngLend&&IngLend.useDevice)IngLend.useDevice();}catch(e){}
  try{setActive(m.id,{fromUser:true});}catch(e){}
  if(!(loaded()&&loaded().id===m.id)){try{loadActiveModel();}catch(e){}}
  paintSoon();}
function chooseLent(c,model){try{IngLend.use(c.id,model);}catch(e){}setTimeout(paint,400);}
function paint(){if(!P)return;var b=$("ieBody"),keep=b.scrollTop;b.innerHTML="";
  b.appendChild(stateCard());
  b.appendChild(mk("div","ie-sec","Every page writes with it"));var pg=mk("div","ie-pages");pagesHere().forEach(function(p){var s=mk("span","pk");s.innerHTML=svg(p[2])+esc(p[1]);pg.appendChild(s);});b.appendChild(pg);
  b.appendChild(mk("div","ie-sec","Choose the model"));
  var ch=chosen(),L=lent(),l=loaded(),s=st(),rec=recId();
  var g1=mk("div","ie-grp");g1.innerHTML=svg("M3 4h18v12H3zM8 20h8M12 16v4")+"On this device";b.appendChild(g1);
  var list=mk("div","ie-list"),ms=ready().slice().sort(function(a,c){return gb(a)-gb(c);});
  if(!ms.length)list.appendChild(mk("p","ie-none","No model is ready on this device yet. Mentes brings one in."));
  ms.forEach(function(m){var f=fit(m),sub=(gb(m)?gb(m).toFixed(1)+" GB · ":"")+(f.level==="ok"?"fits this device":f.level==="heavy"?"likely too heavy here":"fit not known here");
    var pl=(s==="loading"&&ch&&ch.id===m.id)?'<span class="plate ld">Loading</span>':((l&&l.id===m.id&&!L)?'<span class="plate ok">In use</span>':(m.id===rec?'<span class="plate rec">Ingenium\'s choice</span>':''));
    list.appendChild(row(m.customName||m.name,sub,orb(m),house(m),pl,!L&&ch&&ch.id===m.id,function(){choose(m);},m.id,!!(l&&l.id===m.id&&!L)));});
  b.appendChild(list);
  comps().forEach(function(c){var g=mk("div","ie-grp");g.innerHTML=svg("M4 5h16v10H4zM2 19h20")+esc("Lent by "+c.name+(c.status&&c.status!=="ok"?" (not answering now)":"")+", over your Wi-Fi");b.appendChild(g);
    var li=mk("div","ie-list");(c.models||[]).forEach(function(md){var on=!!(L&&L.id===c.id&&L.model===md);
      li.appendChild(row(md,"Runs on "+c.name+" · nothing loads here",["#b79ce6","#5d37a1"],"",on?'<span class="plate ok">In use</span>':'',on,function(){chooseLent(c,md);}));});b.appendChild(li);});
  var ks=mk("div","ie-keys"),ld=mk("button","k pri","Load"),ul=mk("button","k","Unload"),mn=mk("button","lnk","Your models, in Mentes");ld.type=ul.type=mn.type="button";
  ld.disabled=!!L||!ch||s==="loading"||!!(l&&ch&&l.id===ch.id);ul.disabled=s==="loading"||!(l&&!L);
  ld.onclick=function(){click();try{loadActiveModel();}catch(e){}paintSoon();};
  ul.onclick=function(){click();try{Promise.resolve(Engine.unload()).then(function(){try{renderEngineCtl();renderModels();}catch(e){}paint();});}catch(e){}};
  mn.onclick=function(){close();try{go("models");}catch(e){}};ks.appendChild(ld);ks.appendChild(ul);ks.appendChild(mn);b.appendChild(ks);
  /* Reply, Memory and Effort for the model, through the one record (r249), as the Controls sheet sets them (r321) */
  var k=gkey(),g=G();if(g&&k&&k!=="none"){var v=vals(k),m=ch;b.appendChild(mk("div","ie-sec","For "+(L?(L.model||"the lent model"):(m?m.customName:"this model"))));
    function range(lab,min,max,step,val,field,say){var r=mk("div","ie-r"),l2=mk("label",null,lab),i=D.createElement("input"),o=mk("output",null,fmt(val));i.type="range";i.min=String(min);i.max=String(max);i.step=String(step);if(val%step||val<min)i.step="any";i.value=String(val);
      l2.htmlFor=i.id="ie"+field;var tm=0;i.addEventListener("input",function(){o.textContent=fmt(+i.value);clearTimeout(tm);tm=setTimeout(function(){try{g.note(k,field,Math.round(+i.value),"Engine");}catch(e){}chips();},350);});
      i.addEventListener("change",function(){clearTimeout(tm);try{g.note(k,field,Math.round(+i.value),"Engine");}catch(e){}chips();});r.appendChild(l2);r.appendChild(i);r.appendChild(o);b.appendChild(r);b.appendChild(mk("div","ie-say",say));}
    var rmax=32768,cmax=32768;try{if(m&&typeof W.ingReplyMax==="function")rmax=+W.ingReplyMax(m)||rmax;}catch(e){}try{if(m&&typeof W.ingCtxMax==="function")cmax=+W.ingCtxMax(m)||cmax;}catch(e){}
    range("Reply",256,Math.max(rmax,v.tokens),256,v.tokens,"tokens","The longest answer it may write, in tokens. A task that needs more still gets it.");
    if(!L)range("Memory",Math.min(2048,v.ctx),Math.max(cmax,v.ctx),1024,v.ctx,"ctx","How much it holds at once; a new memory takes effect when the model next loads.");
    var er=mk("div","ie-r");er.appendChild(mk("span","l","Effort"));var seg=mk("div","ie-eff");seg.setAttribute("role","group");seg.setAttribute("aria-label","Effort");
    ["Low","Medium","High","Extra","Max"].forEach(function(n,i){var x=mk("button","k",n);x.type="button";x.setAttribute("aria-pressed",String(v.effort===i+1));
      x.onclick=function(){click();try{g.note(k,"effort",i+1,"Engine");if(!state.effort||typeof state.effort!=="object")state.effort={};state.effort.auto=false;state.wEff=String(i+1);saveState();}catch(e){}
        try{if(W.IngR215&&typeof IngR215.paintKey==="function")IngR215.paintKey();}catch(e){}chips();[].forEach.call(seg.children,function(y,j){y.setAttribute("aria-pressed",String(j===i));});};seg.appendChild(x);});
    er.appendChild(seg);er.appendChild(mk("span"));b.appendChild(er);}
  b.appendChild(mk("p","ie-foot","Kept on this device for this model, over restarts and updates. The same in every place."));
  b.scrollTop=keep;place();}
function chips(){try{if(W.IngGenKey&&IngGenKey.paint)IngGenKey.paint();}catch(e){}}
function paintSoon(){if(T)return;T=setTimeout(function(){T=0;paint();},120);}
function pill(){return $("enginePill");}
function place(){if(!P)return;var k=pill(),r=k?k.getBoundingClientRect():{left:innerWidth-500,bottom:56},w=Math.min(480,innerWidth-24);
  P.style.left=Math.max(12,Math.min(r.left,innerWidth-w-12))+"px";P.style.top=Math.round(r.bottom+10)+"px";P.style.maxHeight=Math.max(260,innerHeight-r.bottom-24)+"px";}
function open(){if(P){paint();return;}build();paint();var k=pill();if(k)k.setAttribute("aria-expanded","true");
  setTimeout(function(){D.addEventListener("pointerdown",outside,true);},0);}
function close(){if(!P)return;P.remove();P=null;var k=pill();if(k)k.setAttribute("aria-expanded","false");D.removeEventListener("pointerdown",outside,true);}
function outside(e){if(!P)return;var t=e.target;if(P.contains(t))return;var k=pill();if(k&&k.contains(t))return;
  /* 7.78: the guided tour's card points at the panel while it is open (r376): pressing or moving that card leaves it open */
  if(t&&t.closest&&t.closest("#ingTour"))return;close();}
D.addEventListener("keydown",function(e){if(e.key==="Escape"&&P)close();});
W.addEventListener("resize",function(){place();});
/* the Engine key opens the panel (until 7.76 it opened Mentes) */
function wire(){var k=pill();if(!k||k.__r374)return false;k.__r374=1;k.removeAttribute("onclick");k.removeAttribute("onkeydown");k.setAttribute("aria-haspopup","dialog");k.setAttribute("aria-expanded","false");
  k.title="The engine: the model for all of Ingenium, Load, Unload, Reply, Memory and Effort";
  k.onclick=function(e){if(e)e.preventDefault();click();if(P)close();else open();};
  k.onkeydown=function(e){if(e.key==="Enter"||e.key===" "){e.preventDefault();if(P)close();else open();}};return true;}
(function wait(n){if(wire())return;if(n<240)setTimeout(function(){wait(n+1);},250);})(0);
try{Engine.on("status",function(){if(P)paintSoon();});}catch(e){}
/* ---------- one model for every page: the pages that took Lector's own choice take the app's ---------- */
(function onePlan(){var n=0;(function wait(){var L=W.IngLector;if(!L||typeof L.plan!=="function"){if(++n<240)setTimeout(wait,250);return;}if(L.plan.__r374)return;
  var o=L.plan;var p=function(){var r=o.apply(this,arguments);try{if(r&&!r.link&&!r.cloud){var a=supModel();if(a&&a.fileState==="ready")r.chosen=a;}}catch(e){}return r;};p.__r374=1;L.plan=p;})();})();
/* Lector: one line in place of its own list */
function who(){var sel=$("l7HowModel");if(!sel)return;var lab=sel.closest("label")||sel.parentNode;if(!lab||!lab.parentNode)return;var w=lab.parentNode.querySelector(".r374-who");
  if(!w){w=mk("div","r374-who");lab.parentNode.insertBefore(w,lab);}
  var L=lent(),ch=chosen(),t=L?("<b>"+esc(L.model||"Its model")+"</b> on "+esc(L.name)):("<b>"+esc(ch?ch.customName:"No model yet")+"</b>"+(ch?", Ingenium's model,":""));
  var html="Reads and writes with "+t+" <button type=\"button\">Change it in the engine</button>";if(w.__h!==html){w.__h=html;w.innerHTML=html;w.querySelector("button").onclick=function(e){e.stopPropagation();open();};}}
try{new MutationObserver(function(){try{who();}catch(e){}}).observe(D.body||D.documentElement,{childList:true,subtree:true});}catch(e){}
setInterval(function(){try{var lp=$("page-lector");if(lp&&lp.classList.contains("active"))who();}catch(e){}},1500);
W.IngEnginePanel={open:open,close:close,paint:paint,isOpen:function(){return !!P;}};
})();
;try{window.__ingParts["p374"]="running";}catch(_){}
</script>
