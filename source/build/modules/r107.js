<style id="r107-css">
/* ============ R107 · LECTOR, AS SHE APPROVED IT ============
   Her word (16 October): "For the Lector page, I like it and approving the new design but I want the mac mini look for
   the macbook pro and the windows laptop apps and I like the Fire tablet upright look and the iphone. Push the new
   design everywhere ... make sure that it has the analogue feel and that the buttons are animated and not stiff on the
   page. I want the Lector page to have the same vibe and spirit of Ingenium and the rest of the Offline Project family."
   And: "The documents inside of Lector does not need to have the 3D animated look, only the section inside of the
   Lector page. I want them to stay the same as before."
   - One frame the height of the window; the page itself never scrolls. Three panels side by side on every computer
     (the brief, the thinking, the document), each scrolling inside itself; on an upright tablet or a phone, one panel
     at a time, chosen by tabs. The grips between the panels and under the code window resize them; pressed twice,
     a grip puts its panel back. No scroll bars in view; scrolling kept, up and down and sideways.
   - Ingenium's own raised keys and cards: keys lift as they are pointed at and sink as they are pressed, with a
     spring; the active choice in a row slides to its place; panels rise into place; the apps' seals sway in their
     layers. The documents are paper: flat, with their seals as printed, no motion. */
#page-lector.lx7-page > .page-title,#page-lector.lx7-page > .lede{display:none !important}
body.lx7-on .main{padding-bottom:10px !important}
body.lx7-on .foot{display:none !important}
#lx7{
  --l-bg:#f5f3f7;--l-bg2:#efeaf4;--l-card:#ffffff;--l-lo:#eee8f4;--l-a:#ffffff;--l-b:#f9f7fc;
  --l-ink1:#221a2e;--l-ink2:#4a4358;--l-ink3:#6c6579;--l-hair:rgba(34,26,46,.10);--l-hair2:rgba(34,26,46,.06);
  --l-acc:#6a3fb5;--l-accs:rgba(106,63,181,.12);--l-ring:rgba(106,63,181,.5);--l-gold:#b88a3a;--l-golds:rgba(202,162,74,.16);
  --l-ok:#2f7a55;--l-oks:rgba(47,122,85,.12);
  --l-code:#f7f5fa;--l-codeink:#2a2236;--l-kw:#7a3fb5;--l-str:#1d6b54;--l-com:#8a8296;--l-num:#a05a12;--l-hl:rgba(202,162,74,.22);
  --l-raise:0 1px 0 rgba(40,22,68,.06),0 2px 6px rgba(40,22,68,.05),0 12px 30px rgba(40,22,68,.07);
  --l-pop:inset 0 -1.5px 0 rgba(40,22,68,.13),0 2px 0 rgba(40,22,68,.25),0 4px 5px rgba(40,22,68,.16),0 9px 14px rgba(40,22,68,.10);
  --l-pophi:inset 0 -1.5px 0 rgba(40,22,68,.13),0 3px 0 rgba(40,22,68,.25),0 6px 8px rgba(40,22,68,.18),0 13px 20px rgba(40,22,68,.12);
  --l-press:inset 0 2px 5px rgba(40,22,68,.22),0 1px 1px rgba(40,22,68,.18);
  --l-well:inset 0 1px 2.5px rgba(40,22,68,.08);--l-wellbg:rgba(34,26,46,.03);
  --l-pill:inset 0 1px 0 rgba(255,255,255,.6),inset 0 -1.5px 0 rgba(40,20,70,.10),0 1px 0 rgba(40,20,70,.12),0 3px 4px rgba(40,20,70,.09),0 7px 10px rgba(40,20,70,.06);
  --l-pa:#7348be;--l-pb:#5d37a1;--l-pedge:#4b2a86;--l-pledge:#3a2070;
  --l-psh:inset 0 1px 0 rgba(255,255,255,.16),0 2px 0 var(--l-pledge),0 4px 6px rgba(40,22,68,.24),0 9px 16px rgba(40,22,68,.16);
  --l-pshhi:inset 0 1px 0 rgba(255,255,255,.18),0 3px 0 var(--l-pledge),0 6px 9px rgba(40,22,68,.26),0 13px 22px rgba(40,22,68,.18);
  --l-ppress:inset 0 2px 6px rgba(20,8,40,.45),0 1px 1px rgba(40,22,68,.2);
  --l-glow:0 0 12px 2px rgba(198,170,255,.36),0 0 26px 8px rgba(150,112,232,.18);
  --l-spring:cubic-bezier(.34,1.35,.64,1);
  --l-serif:"Iowan Old Style","Palatino Linotype",Palatino,"Book Antiqua",Georgia,"Times New Roman",serif;
  --l-sans:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif;
  --l-mono:ui-monospace,"SF Mono",Menlo,Consolas,"Liberation Mono",monospace;
  --l-h:640px;
  position:relative;display:flex;flex-direction:column;gap:12px;height:var(--l-h);min-height:420px;color:var(--l-ink1);font:14px/1.5 var(--l-sans)}
body[data-theme="night"] #lx7{
  --l-bg:#110d18;--l-bg2:#17121f;--l-card:#201a2b;--l-lo:#2a2239;--l-a:#2a2239;--l-b:#251e33;
  --l-ink1:#f3eefb;--l-ink2:#d3c9e3;--l-ink3:#a99cc1;--l-hair:rgba(205,184,240,.11);--l-hair2:rgba(205,184,240,.07);
  --l-acc:#b79ce6;--l-accs:rgba(183,156,230,.16);--l-ring:rgba(183,156,230,.45);--l-gold:#d8b46a;--l-golds:rgba(216,180,106,.16);
  --l-ok:#7fd1a6;--l-oks:rgba(127,209,166,.14);
  --l-code:#17121f;--l-codeink:#e8e1f4;--l-kw:#c9a8ff;--l-str:#8fd6b5;--l-com:#8a8296;--l-num:#f0b56a;--l-hl:rgba(216,180,106,.18);
  --l-raise:0 1px 0 rgba(0,0,0,.40),0 2px 6px rgba(0,0,0,.30),0 12px 30px rgba(0,0,0,.34);
  --l-pop:inset 0 1px 0 rgba(255,255,255,.07),inset 0 -2px 0 rgba(0,0,0,.45),0 2px 0 rgba(0,0,0,.75),0 4px 5px rgba(0,0,0,.50),0 9px 14px rgba(0,0,0,.36);
  --l-pophi:inset 0 1px 0 rgba(255,255,255,.08),inset 0 -2px 0 rgba(0,0,0,.45),0 3px 0 rgba(0,0,0,.75),0 6px 8px rgba(0,0,0,.52),0 13px 20px rgba(0,0,0,.40);
  --l-press:inset 0 2px 6px rgba(0,0,0,.6),0 1px 1px rgba(0,0,0,.4);
  --l-well:inset 0 1px 3px rgba(0,0,0,.4);--l-wellbg:rgba(10,6,18,.35);
  --l-pill:inset 0 1px 0 rgba(255,255,255,.09),inset 0 -1.5px 0 rgba(0,0,0,.4),0 1px 0 rgba(0,0,0,.5),0 3px 5px rgba(0,0,0,.4),0 8px 12px rgba(0,0,0,.3);
  --l-pa:#7a56c8;--l-pb:#5b3aa1;--l-pedge:#2c1956;--l-pledge:#170b30;
  --l-psh:inset 0 1px 0 rgba(255,255,255,.14),0 2px 0 var(--l-pledge),0 4px 6px rgba(0,0,0,.5),0 9px 16px rgba(0,0,0,.36);
  --l-pshhi:inset 0 1px 0 rgba(255,255,255,.16),0 3px 0 var(--l-pledge),0 6px 9px rgba(0,0,0,.52),0 13px 22px rgba(0,0,0,.4)}
#lx7 *{box-sizing:border-box;scrollbar-width:none;-ms-overflow-style:none}
#lx7 *::-webkit-scrollbar{display:none;width:0;height:0}
#lx7 button{font:inherit;color:inherit;margin:0}
#lx7 button:focus-visible,#lx7 [tabindex]:focus-visible,#lx7 input:focus-visible,#lx7 select:focus-visible,#lx7 textarea:focus-visible{outline:2px solid var(--l-acc);outline-offset:2px}

/* ---------- the keys: raised, lifting under the pointer, sinking when pressed, with a spring ---------- */
#lx7 .l-btn{position:relative;display:inline-flex;align-items:center;justify-content:center;gap:6px;border:1px solid var(--l-hair);background:linear-gradient(var(--l-a),var(--l-b));border-radius:10px;padding:7px 13px;font-size:13px;font-weight:600;cursor:pointer;white-space:nowrap;box-shadow:var(--l-pop);color:var(--l-ink1);
  transition:transform .16s var(--l-spring),box-shadow .16s ease,background-color .15s,color .15s,border-color .15s,opacity .2s}
#lx7 .l-btn:hover:not(:disabled){transform:translateY(-2px);box-shadow:var(--l-pophi)}
#lx7 .l-btn:active:not(:disabled){transform:translateY(1px) scale(.985);box-shadow:var(--l-press);transition-duration:.06s}
#lx7 .l-btn:disabled{opacity:.5;cursor:default}
#lx7 .l-btn.pri{background:linear-gradient(var(--l-pa),var(--l-pb));border-color:var(--l-pedge);color:#fff;box-shadow:var(--l-psh);text-shadow:0 1px 1px rgba(30,10,60,.35);isolation:isolate}
#lx7 .l-btn.pri::after{content:"";position:absolute;inset:0;border-radius:inherit;box-shadow:var(--l-glow);z-index:-1;pointer-events:none;opacity:.9;transition:opacity .3s}
#lx7 .l-btn.pri:hover:not(:disabled){box-shadow:var(--l-pshhi)}
#lx7 .l-btn.pri:active:not(:disabled){box-shadow:var(--l-ppress)}
#lx7 .l-btn.quiet{border-color:transparent;background:transparent;box-shadow:none;color:var(--l-acc);padding:3px 6px;font-weight:600}
#lx7 .l-btn.quiet:hover:not(:disabled){transform:none;box-shadow:none;text-decoration:underline}
#lx7 .l-btn.sm{padding:5px 10px;font-size:12.5px;border-radius:999px}
#lx7 .l-btn.wide{flex:1 1 auto}
/* a gentle breath on the key that is the next step, so the eye finds it without a flash */
#lx7 .l-btn.next{animation:l7Breathe 3.2s ease-in-out infinite}
@keyframes l7Breathe{0%,100%{box-shadow:var(--l-psh)}50%{box-shadow:var(--l-psh),0 0 0 4px var(--l-accs)}}
/* a row of choices: the chosen one is a raised purple key that slides to its place */
#lx7 .l-seg{position:relative;display:inline-flex;gap:2px;border:1px solid var(--l-hair);border-radius:999px;padding:3px;background:var(--l-wellbg);box-shadow:var(--l-well);max-width:100%;overflow-x:auto}
#lx7 .l-seg .l-thumb{position:absolute;top:3px;bottom:3px;left:0;width:0;border-radius:999px;background:linear-gradient(var(--l-pa),var(--l-pb));border:1px solid var(--l-pedge);box-shadow:var(--l-psh);
  transition:transform .38s var(--l-spring),width .38s var(--l-spring);pointer-events:none;z-index:0}
#lx7 .l-seg button{position:relative;z-index:1;border:1px solid transparent;background:transparent;border-radius:999px;padding:5px 11px;font-size:12.5px;font-weight:600;cursor:pointer;color:var(--l-ink3);white-space:nowrap;transition:color .2s,transform .12s var(--l-spring)}
#lx7 .l-seg button:hover{color:var(--l-ink1)}
#lx7 .l-seg button[aria-pressed="true"]{color:#fff;text-shadow:0 1px 1px rgba(30,10,60,.3)}
#lx7 .l-seg button:active{transform:translateY(1px)}
#lx7 .l-sw{display:inline-flex;align-items:center;gap:8px;font-size:12.5px;color:var(--l-ink2);cursor:pointer;user-select:none}
#lx7 .l-sw input{appearance:none;-webkit-appearance:none;width:38px;height:22px;border-radius:999px;background:var(--l-wellbg);border:1px solid var(--l-hair);box-shadow:var(--l-well);position:relative;cursor:pointer;margin:0;flex:0 0 auto;transition:background .25s}
#lx7 .l-sw input::after{content:"";position:absolute;top:2px;left:2px;width:16px;height:16px;border-radius:50%;background:linear-gradient(var(--l-a),var(--l-b));box-shadow:var(--l-pop);transition:transform .35s var(--l-spring)}
#lx7 .l-sw input:checked{background:linear-gradient(var(--l-pa),var(--l-pb))}
#lx7 .l-sw input:checked::after{transform:translateX(16px)}
#lx7 .l-chip{display:inline-flex;align-items:center;gap:6px;font-size:12px;font-weight:600;border-radius:999px;padding:3px 10px;background:linear-gradient(var(--l-a),var(--l-b));border:1px solid var(--l-hair);color:var(--l-ink2);white-space:nowrap;max-width:100%;overflow:hidden;text-overflow:ellipsis;box-shadow:var(--l-pill)}
#lx7 .l-chip.live{color:var(--l-acc);border-color:var(--l-ring)}
#lx7 .l-chip.ok{color:var(--l-ok)}
#lx7 .l-chip .pulse{width:7px;height:7px;border-radius:50%;background:currentColor;animation:l7Pulse 1.6s ease-in-out infinite}
@keyframes l7Pulse{50%{opacity:.3;transform:scale(.8)}}
@keyframes l7Rise{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:none}}
@keyframes l7Pop{0%{transform:scale(.96)}60%{transform:scale(1.015)}100%{transform:none}}

/* ---------- the head: the name, a line, and where Lector is ---------- */
#lx7 .l-head{display:flex;align-items:flex-end;gap:14px 18px;flex-wrap:wrap;flex:0 0 auto}
#lx7 .l-head h1{font:600 25px/1.1 var(--l-serif);margin:0;letter-spacing:.045em}
#lx7 .l-head p{margin:4px 0 0;color:var(--l-ink2);font-size:14px;max-width:62ch}
#lx7 .l-steps{display:flex;gap:6px;list-style:none;margin:0 0 0 auto;padding:4px 2px 8px;align-items:center;flex-wrap:nowrap}
#lx7 .l-steps li{display:flex;align-items:center;gap:6px;font-size:12.5px;font-weight:600;color:var(--l-ink3);padding:4px 11px 4px 5px;border-radius:999px;border:1px solid var(--l-hair);background:linear-gradient(var(--l-a),var(--l-b));box-shadow:var(--l-pill);height:30px;white-space:nowrap;transition:color .3s,border-color .3s}
#lx7 .l-steps li i{font-style:normal;width:19px;height:19px;border-radius:50%;display:inline-grid;place-items:center;font-size:11px;background:var(--l-wellbg);box-shadow:var(--l-well);transition:background .3s,color .3s}
#lx7 .l-steps li.done{color:var(--l-ink2)}
#lx7 .l-steps li.done i{background:var(--l-oks);color:var(--l-ok);box-shadow:none}
#lx7 .l-steps li.now{color:var(--l-acc);font-weight:700;border-color:var(--l-ring);animation:l7Pop .5s var(--l-spring)}
#lx7 .l-steps li.now i{background:linear-gradient(var(--l-pa),var(--l-pb));color:#fff;box-shadow:0 1px 0 var(--l-pledge),0 2px 4px rgba(40,22,68,.25)}
#lx7 .l-steps .sep{width:10px;height:2px;border-radius:2px;background:var(--l-hair);padding:0;border:0;box-shadow:none}
#lx7 .l-tabs{display:none}

/* ---------- the three panels ---------- */
#lx7 .l-panels{flex:1 1 auto;min-height:0;display:grid;gap:0;grid-template-columns:var(--w1,300px) 16px minmax(240px,var(--w2,1fr)) 16px minmax(280px,1.18fr)}
#lx7 .l-pn{min-width:0;min-height:0;display:flex;flex-direction:column;background:var(--l-card);border:1px solid var(--l-hair);border-radius:14px;overflow:hidden;box-shadow:var(--l-raise);animation:l7Rise .5s var(--l-spring) both}
#lx7 #l7Read{animation-delay:.06s}#lx7 #l7Doc{animation-delay:.12s}
#lx7 .l-pn-h{display:flex;align-items:center;gap:8px;padding:12px 14px 11px;border-bottom:1px solid var(--l-hair2);flex:0 0 auto;min-height:50px;background:linear-gradient(var(--l-a),var(--l-b))}
#lx7 .l-pn-h h2{font:600 15px/1 var(--l-serif);letter-spacing:.06em;color:var(--l-ink1);margin:0;white-space:nowrap}
#lx7 .l-pn-h .l-chip{margin-left:auto}
#lx7 .l-pn-b{flex:1 1 auto;min-height:0;overflow:auto;overscroll-behavior:contain}
#lx7 .l-pn-f{flex:0 0 auto;border-top:1px solid var(--l-hair2);padding:11px 14px 13px;display:flex;align-items:center;gap:10px;flex-wrap:wrap;background:linear-gradient(var(--l-b),var(--l-a))}
#lx7 .l-gut{cursor:col-resize;display:flex;align-items:center;justify-content:center;touch-action:none;outline:none}
#lx7 .l-gut i,#lx7 .l-vg i{display:block;border-radius:999px;background:var(--l-hair);transition:background .15s,height .25s var(--l-spring),width .25s var(--l-spring),box-shadow .15s}
#lx7 .l-gut i{width:5px;height:46px}
#lx7 .l-gut:hover i,#lx7 .l-gut:focus-visible i,#lx7 .l-gut.drag i{background:linear-gradient(var(--l-pa),var(--l-pb));height:72px;box-shadow:0 0 0 3px var(--l-accs)}
body.l7-resizing,body.l7-resizing *{user-select:none !important}
body.l7-resizing.col,body.l7-resizing.col *{cursor:col-resize !important}
body.l7-resizing.row,body.l7-resizing.row *{cursor:row-resize !important}

/* the brief */
#lx7 .l-bf{padding:4px 14px 14px;display:flex;flex-direction:column}
#lx7 .l-sec{padding:13px 0 12px;border-bottom:1px solid var(--l-hair2)}
#lx7 .l-sec:last-child{border-bottom:0}
#lx7 .l-sec h3{font:600 14px/1.3 var(--l-serif);letter-spacing:.03em;margin:0 0 10px;color:var(--l-ink1)}
#lx7 .l-hint{font-size:12.5px;color:var(--l-ink3);margin:8px 0 0;line-height:1.5}
#lx7 .l-apps{display:grid;grid-template-columns:1fr 1fr;gap:10px;padding-bottom:4px}
#lx7 .l-app{position:relative;display:flex;flex-direction:column;align-items:center;gap:5px;padding:12px 6px 10px;border:1px solid var(--l-hair);border-radius:12px;background:linear-gradient(var(--l-a),var(--l-b));cursor:pointer;text-align:center;box-shadow:var(--l-pop);overflow:hidden;
  transition:transform .18s var(--l-spring),box-shadow .18s,border-color .2s}
#lx7 .l-app::before{content:"";position:absolute;left:0;top:0;bottom:0;width:4px;background:var(--app,var(--l-acc));opacity:.35;transition:opacity .25s}
#lx7 .l-app:hover{transform:translateY(-2px);box-shadow:var(--l-pophi)}
#lx7 .l-app:active{transform:translateY(1px) scale(.985);box-shadow:var(--l-press);transition-duration:.06s}
#lx7 .l-app .nm{font:600 13px/1.2 var(--l-serif);color:var(--l-ink2)}
#lx7 .l-app .st{font-size:11px;color:var(--l-ink3);line-height:1.3}
#lx7 .l-app[aria-pressed="true"]{border-color:var(--l-ring);box-shadow:var(--l-pophi),0 0 0 2px var(--l-accs);transform:translateY(-2px)}
#lx7 .l-app[aria-pressed="true"]::before{opacity:1}
#lx7 .l-app[aria-pressed="true"] .nm{color:var(--l-ink1)}
#lx7 .l-app[aria-pressed="true"]::after{content:"✓";position:absolute;top:6px;right:8px;width:18px;height:18px;border-radius:50%;display:grid;place-items:center;font-size:10.5px;color:#fff;font-weight:700;background:linear-gradient(var(--l-pa),var(--l-pb));box-shadow:0 1px 0 var(--l-pledge);animation:l7Pop .4s var(--l-spring)}
#lx7 .l-app.none{opacity:.72}
#lx7 .l-setname{margin-top:10px;font-size:13px;color:var(--l-ink2);display:flex;gap:6px;align-items:center;flex-wrap:wrap}
#lx7 .l-setname b{font:600 14px/1.3 var(--l-serif);color:var(--l-ink1)}
#lx7 .l-setname img{width:28px;height:auto}
#lx7 .l-libnote{font-size:12.5px;color:var(--l-ink2);margin:8px 0 0;padding:8px 10px;border-radius:10px;background:var(--l-wellbg);box-shadow:var(--l-well)}
#lx7 .l-libnote.warn{color:#9a4b14}
#lx7 .l-purp{display:flex;flex-wrap:wrap;gap:8px;padding-bottom:4px}
#lx7 .l-card{margin-top:12px;border:1px solid var(--l-hair);border-radius:12px;padding:11px 13px;background:linear-gradient(var(--l-a),var(--l-b));box-shadow:var(--l-pop);animation:l7Rise .35s var(--l-spring) both}
#lx7 .l-card b{display:block;font:600 14px/1.3 var(--l-serif)}
#lx7 .l-card .org{font-size:12.5px;color:var(--l-ink3)}
#lx7 .l-asks{display:flex;flex-wrap:wrap;gap:5px;margin-top:9px}
#lx7 .l-ask{font-size:11.5px;font-weight:600;padding:3px 9px;border-radius:999px;background:var(--l-golds);color:var(--l-ink2);border:1px solid rgba(184,138,58,.25);max-width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
#lx7 .l-row{display:flex;justify-content:space-between;align-items:center;margin-top:8px;font-size:12px;color:var(--l-ink3);gap:8px;flex-wrap:wrap}
#lx7 .l-keys{display:flex;gap:8px;flex-wrap:wrap;margin-top:10px}
#lx7 textarea.l-paste{width:100%;min-height:120px;margin-top:10px;border-radius:10px;border:1px solid var(--l-hair);background:var(--l-wellbg);box-shadow:var(--l-well);color:var(--l-ink1);font:13px/1.5 var(--l-sans);padding:9px 11px;resize:vertical}
#lx7 .l-docs{display:flex;flex-direction:column;gap:6px}
#lx7 .l-doc{display:flex;align-items:center;gap:10px;padding:8px 10px;border-radius:10px;cursor:pointer;border:1px solid var(--l-hair2);background:linear-gradient(var(--l-a),var(--l-b));box-shadow:var(--l-pill);transition:transform .16s var(--l-spring),box-shadow .16s}
#lx7 .l-doc:hover{transform:translateY(-1px)}
#lx7 .l-doc:active{transform:translateY(1px)}
#lx7 .l-doc input{width:17px;height:17px;accent-color:var(--l-acc);margin:0;flex:0 0 auto}
#lx7 .l-doc .t{flex:1 1 auto;min-width:0;font-size:13.5px;font-weight:500}
#lx7 .l-doc .t small{display:block;font-size:11.5px;color:var(--l-ink3);font-weight:400}
#lx7 .l-mark{display:inline-flex;align-items:center;gap:2px;flex:0 0 auto}
#lx7 .l-mark img{width:18px;height:18px;object-fit:contain}
#lx7 .l-mark img.ms{width:16px;height:22px}
#lx7 .l-mark.none{font-size:11px;font-weight:600;color:var(--l-ink3);border:1px dashed var(--l-hair);border-radius:999px;padding:1px 8px}
#lx7 .l-facts{display:flex;flex-direction:column;gap:9px}
#lx7 .l-fact{display:flex;gap:10px;align-items:flex-start;font-size:13.5px;font-weight:500}
#lx7 .l-fact .ic{width:26px;height:26px;border-radius:8px;background:linear-gradient(var(--l-a),var(--l-b));color:var(--l-acc);display:grid;place-items:center;font-size:12px;flex:0 0 auto;border:1px solid var(--l-hair);box-shadow:var(--l-pop)}
#lx7 .l-fact .tx{flex:1 1 auto;min-width:0}
#lx7 .l-fact small{display:block;color:var(--l-ink3);font-size:12px;font-weight:400;overflow:hidden;text-overflow:ellipsis}
#lx7 .l-fact .acts{display:flex;gap:2px;flex-wrap:wrap;margin-top:2px}
#lx7 .l-model{border:1px solid var(--l-hair);border-radius:12px;padding:11px 13px;background:linear-gradient(var(--l-a),var(--l-b));box-shadow:var(--l-pop)}
#lx7 .l-model b{font:600 13.5px/1.3 var(--l-sans)}
#lx7 .l-model .need{font-size:12.5px;color:var(--l-ink2);margin-top:3px}
#lx7 .l-meter{height:7px;border-radius:999px;background:var(--l-wellbg);box-shadow:var(--l-well);margin-top:8px;overflow:hidden}
#lx7 .l-meter i{display:block;height:100%;background:linear-gradient(90deg,#3aa46c,#2f7a55);border-radius:999px;transition:width .6s var(--l-spring)}
#lx7 .l-meter i.tight{background:linear-gradient(90deg,#d69a3a,#a86a1c)}
#lx7 .l-model details{margin-top:8px;font-size:12.5px;color:var(--l-ink2)}
#lx7 .l-model summary{cursor:pointer;color:var(--l-acc);list-style:none;font-weight:600}
#lx7 .l-model summary::-webkit-details-marker{display:none}
#lx7 .l-model summary::before{content:"▸ ";display:inline-block;transition:transform .25s var(--l-spring)}
#lx7 .l-model details[open] summary::before{transform:rotate(90deg)}
#lx7 .l-model select{margin-top:7px;width:100%;padding:7px 9px;border-radius:9px;border:1px solid var(--l-hair);background:var(--l-wellbg);box-shadow:var(--l-well);color:var(--l-ink1);font:inherit;font-size:12.5px;max-width:none}
#lx7 .l-model .l-seg{margin-top:9px}
#lx7 .l-shelf{display:flex;flex-direction:column;gap:6px;margin-top:6px}
#lx7 .l-shelf .r{display:flex;align-items:center;gap:8px;font-size:12.5px;color:var(--l-ink2)}
#lx7 .l-shelf .r span{flex:1 1 auto;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
#lx7 details.l-more summary{cursor:pointer;list-style:none;font:600 13.5px/1.3 var(--l-serif);color:var(--l-ink2)}
#lx7 details.l-more summary::-webkit-details-marker{display:none}

/* the thinking */
#lx7 .l-rd{display:flex;flex-direction:column;min-height:0;flex:1 1 0}
#lx7 .l-now{flex:0 0 auto;height:40%;max-height:300px;min-height:110px;overflow:hidden;display:flex;flex-direction:column;margin:10px 10px 0;border:1px solid var(--l-hair);border-radius:12px;background:var(--l-code);box-shadow:var(--l-well)}
#lx7 .l-now-h{display:flex;align-items:center;gap:6px;padding:8px 12px;font-size:12px;color:var(--l-ink3);border-bottom:1px solid var(--l-hair2);flex-wrap:wrap;min-height:34px}
#lx7 .l-now-h b{color:var(--l-ink1);font-weight:600}
#lx7 .l-now-h .l-btn{margin-left:auto}
#lx7 .l-code{margin:0;padding:8px 0 10px;font:12px/1.6 var(--l-mono);color:var(--l-codeink);overflow:auto;flex:1 1 0;min-height:0}
#lx7 .l-code .ln{display:flex;white-space:pre;padding-right:14px}
#lx7 .l-code .ln i{flex:0 0 auto;width:66px;text-align:right;padding-right:12px;color:var(--l-com);font-style:normal;user-select:none;font-variant-numeric:tabular-nums}
#lx7 .l-code .kw{color:var(--l-kw)} #lx7 .l-code .st{color:var(--l-str)} #lx7 .l-code .cm{color:var(--l-com);font-style:italic} #lx7 .l-code .nu{color:var(--l-num)}
#lx7 .l-code .empty{padding:14px 16px;font:13px/1.55 var(--l-sans);color:var(--l-ink3);white-space:normal}
#lx7 .l-vg{flex:0 0 14px;cursor:row-resize;display:flex;align-items:center;justify-content:center;touch-action:none;outline:none}
#lx7 .l-vg i{width:46px;height:5px}
#lx7 .l-vg:hover i,#lx7 .l-vg:focus-visible i,#lx7 .l-vg.drag i{background:linear-gradient(90deg,var(--l-pa),var(--l-pb));width:72px;box-shadow:0 0 0 3px var(--l-accs)}
#lx7 .l-stream{flex:1 1 auto;min-height:0;overflow:auto;padding:6px 12px 18px;display:flex;flex-direction:column;gap:12px;position:relative;overscroll-behavior:contain}
#lx7 .l-th{border:1px solid var(--l-hair);border-radius:12px;padding:10px 12px 9px;background:linear-gradient(var(--l-a),var(--l-b));cursor:pointer;box-shadow:var(--l-pop);animation:l7Rise .45s var(--l-spring) both;
  transition:transform .16s var(--l-spring),box-shadow .16s,border-color .2s}
#lx7 .l-th:hover{transform:translateY(-2px);box-shadow:var(--l-pophi)}
#lx7 .l-th:active{transform:translateY(1px);box-shadow:var(--l-press)}
#lx7 .l-th.on{border-color:var(--l-ring);box-shadow:var(--l-pophi),0 0 0 2px var(--l-accs)}
#lx7 .l-th .where{font-size:11.5px;color:var(--l-ink3);display:flex;gap:6px;align-items:center;flex-wrap:wrap}
#lx7 .l-th .tag{padding:1px 8px;border-radius:999px;background:var(--l-wellbg);box-shadow:var(--l-well);font-weight:600}
#lx7 .l-th .tag.note{background:var(--l-oks);color:var(--l-ok);box-shadow:none}
#lx7 .l-th .tag.check{background:var(--l-golds);color:var(--l-ink2);box-shadow:none}
#lx7 .l-th .tag.live{background:var(--l-accs);color:var(--l-acc);box-shadow:none}
#lx7 .l-th .body{margin:5px 0 0;font-size:13.5px;line-height:1.55;color:var(--l-ink2);white-space:pre-wrap;word-break:break-word;max-height:9.3em;overflow:hidden;position:relative}
#lx7 .l-th.open .body{max-height:none}
#lx7 .l-th .see{margin-top:6px;font-size:12px;font-weight:600;color:var(--l-acc)}
#lx7 .l-caret{display:inline-block;width:7px;height:1.05em;vertical-align:-2px;background:var(--l-acc);margin-left:2px;animation:l7Blink 1s steps(2) infinite;border-radius:1px}
@keyframes l7Blink{50%{opacity:0}}
#lx7 .l-jump{position:sticky;bottom:4px;align-self:center;z-index:2}
#lx7 .l-empty{padding:18px 14px;color:var(--l-ink2);font-size:13.5px;line-height:1.6}
#lx7 .l-empty b{display:block;font:600 17px/1.3 var(--l-serif);color:var(--l-ink1);margin-bottom:6px;letter-spacing:.02em}
#lx7 .l-prog{flex:1 1 200px;min-width:0}
#lx7 .l-prog .lbl{display:flex;justify-content:space-between;gap:8px;font-size:12.5px;color:var(--l-ink2);flex-wrap:wrap}
#lx7 .l-prog .lbl b{color:var(--l-ink1);font-weight:600}
#lx7 .l-bar{height:8px;border-radius:999px;background:var(--l-wellbg);box-shadow:var(--l-well);margin-top:7px;overflow:hidden}
#lx7 .l-bar i{display:block;height:100%;width:0;background:linear-gradient(90deg,#6a3fb5,#4e2c8a);border-radius:999px;transition:width .6s var(--l-spring);box-shadow:inset 0 1px 0 rgba(255,255,255,.25);position:relative;overflow:hidden}
#lx7 .l-bar.live i::after{content:"";position:absolute;inset:0;background:linear-gradient(90deg,transparent,rgba(255,255,255,.35),transparent);transform:translateX(-100%);animation:l7Sheen 2.2s ease-in-out infinite}
@keyframes l7Sheen{to{transform:translateX(100%)}}

/* the document */
#lx7 .l-dtabs{display:flex;gap:3px;margin:10px 12px 0;padding:3px;border:1px solid var(--l-hair);border-radius:999px;background:var(--l-wellbg);box-shadow:var(--l-well);overflow-x:auto;flex:0 0 auto;width:fit-content;max-width:calc(100% - 24px)}
#lx7 .l-dtabs button{border:1px solid transparent;background:transparent;padding:5px 12px;font-size:12.5px;font-weight:600;color:var(--l-ink3);cursor:pointer;border-radius:999px;white-space:nowrap;display:flex;align-items:center;gap:6px;transition:transform .14s var(--l-spring),color .2s,background .2s,box-shadow .2s}
#lx7 .l-dtabs button[aria-selected="true"]{background:linear-gradient(var(--l-a),var(--l-b));border-color:var(--l-hair);color:var(--l-ink1);box-shadow:var(--l-pop)}
#lx7 .l-dtabs button:active{transform:translateY(1px)}
#lx7 .l-dtabs .dot{width:7px;height:7px;border-radius:50%;background:var(--l-lo);border:1px solid var(--l-hair)}
#lx7 .l-dtabs .dot.live{background:var(--l-acc);border-color:var(--l-acc);box-shadow:0 0 0 3px var(--l-accs);animation:l7Pulse 1.6s ease-in-out infinite}
#lx7 .l-dtabs .dot.done{background:#3aa46c;border-color:#3aa46c}
#lx7 .l-outline{display:flex;gap:6px;padding:10px 12px 12px;overflow-x:auto;flex:0 0 auto;border-bottom:1px solid var(--l-hair2)}
#lx7 .l-outline:empty{display:none}
#lx7 .l-outline button{border:1px solid var(--l-hair);background:linear-gradient(var(--l-a),var(--l-b));border-radius:999px;padding:4px 11px;font-size:12px;font-weight:600;color:var(--l-ink2);cursor:pointer;white-space:nowrap;display:flex;gap:5px;align-items:center;box-shadow:var(--l-pill);transition:transform .16s var(--l-spring)}
#lx7 .l-outline button:hover{transform:translateY(-2px)}
#lx7 .l-outline button:active{transform:translateY(1px)}
#lx7 .l-outline .m{font-size:10px}
#lx7 .l-outline button.done .m{color:var(--l-ok)}
#lx7 .l-outline button.live{border-color:var(--l-ring);color:var(--l-acc)}
#lx7 .l-outline button.wait{color:var(--l-ink3)}
#lx7 .l-desk{flex:1 1 auto;min-height:0;overflow:auto;padding:20px 18px 28px;background:var(--l-bg2);box-shadow:inset 0 2px 6px rgba(40,22,68,.06);overscroll-behavior:contain}
#lx7 .l-rule{max-width:640px;margin:0 auto 14px;font-size:12.5px;color:var(--l-ink2);display:flex;gap:8px;align-items:center;background:linear-gradient(var(--l-a),var(--l-b));border:1px solid var(--l-hair);border-radius:10px;padding:8px 12px;box-shadow:var(--l-pill)}
#lx7 .l-rule .i{color:var(--l-gold);font-weight:700}
#lx7 .l-fmt{display:flex;gap:8px;align-items:center;flex-wrap:wrap;min-width:0}
#lx7 .l-fmt > span{font-size:12.5px;color:var(--l-ink3);font-weight:600}
/* the paper: flat, as printed (her word: the documents stay as they were, without the 3D or the motion) */
#lx7 .l-paper{max-width:640px;margin:0 auto;background:#fff;color:#1e1828;border-radius:3px;box-shadow:0 1px 0 rgba(40,22,68,.06),0 3px 8px rgba(40,22,68,.08),0 18px 40px rgba(40,22,68,.12);padding:46px 52px 52px;font:15px/1.62 "Times New Roman",Times,serif}
#lx7 .l-paper + .l-paper{margin-top:16px}
#lx7 .l-paper .cv{display:flex;flex-direction:column;align-items:center;gap:10px;padding:10px 0 8px;border-bottom:1px solid rgba(30,24,40,.14);margin-bottom:22px;text-align:center}
#lx7 .l-paper .cv .seals{display:flex;gap:14px;justify-content:center;flex-wrap:wrap}
#lx7 .l-paper .cv .seals img{width:84px;height:84px;object-fit:contain}
#lx7 .l-paper .cv .seals img.master{width:118px;height:auto}
#lx7 .l-paper .cv h1{font:700 24px/1.2 "Times New Roman",Times,serif;margin:4px 0 0;color:var(--app,#4e2c8a)}
#lx7 .l-paper .cv .sub{font:italic 15px/1.4 "Times New Roman",Times,serif;color:#454549}
#lx7 .l-paper .cv .for,#lx7 .l-paper .cv .by{font:13px/1.4 "Times New Roman",Times,serif;color:#454549}
#lx7 .l-paper h2{font:700 16px/1.3 "Times New Roman",Times,serif;margin:22px 0 8px;color:var(--app,#4e2c8a)}
#lx7 .l-paper h3{font:italic 700 15px/1.3 "Times New Roman",Times,serif;margin:16px 0 6px;color:var(--app2,#454549)}
#lx7 .l-paper p{margin:0 0 10px}
#lx7 .l-paper ul,#lx7 .l-paper ol{margin:0 0 10px;padding-left:22px}
#lx7 .l-paper li{margin:0 0 4px}
#lx7 .l-paper blockquote{margin:0 0 10px 18px;font-style:italic;color:#454549}
#lx7 .l-paper pre{background:#f4f2f6;padding:8px 10px;border-radius:4px;font:12px/1.5 var(--l-mono);white-space:pre-wrap;word-break:break-word}
#lx7 .l-paper table{width:100%;border-collapse:collapse;font:13px/1.45 "Times New Roman",Times,serif;margin:8px 0 14px;display:block;overflow-x:auto}
#lx7 .l-paper th,#lx7 .l-paper td{border-bottom:1px solid rgba(30,24,40,.14);padding:5px 6px;text-align:left;vertical-align:top}
#lx7 .l-paper th{font-weight:700;border-top:1.5px solid #4a405a;border-bottom:1.5px solid #4a405a;background:var(--fill,#f2f2f4)}
#lx7 .l-paper .note{font-style:italic;font-size:13px;color:#5a5068;border-top:1px solid rgba(30,24,40,.14);padding-top:10px;margin-top:18px}
#lx7 .l-paper .wait{color:#9a92a6;font-style:italic;font-size:13.5px}
#lx7 .l-paper .fill{color:#8a6526;font-style:italic;border-bottom:1.5px dotted #b88a3a}
#lx7 .l-paper .chk{border-bottom:1.5px dotted #b0302f;cursor:help}
#lx7 .l-paper .lhead{text-align:right;font:13px/1.5 "Times New Roman",Times,serif;color:#454549;margin-bottom:22px}
#lx7 .l-paper .lhead b{display:block;font:700 16px/1.3 "Times New Roman",Times,serif;color:#1e1828}
#lx7 .l-paper [data-live] .l-caret{background:#6a3fb5}

/* the layered seals of the apps (on the page only; never on the paper) */
#lx7 .ls{position:relative;display:inline-block;width:var(--S,56px);height:var(--S,56px);perspective:calc(var(--S,56px) * 4);--rx:0deg;--ry:0deg;--lift:0px;--sc:1;flex:0 0 auto}
#lx7 .ls-tilt{position:absolute;inset:0;display:block;transform-style:preserve-3d;transform:rotateX(var(--rx)) rotateY(var(--ry)) translateY(var(--lift)) scale(var(--sc));transition:transform .35s cubic-bezier(.2,.8,.2,1)}
#lx7 .ls-idle{position:absolute;inset:0;display:block;transform-style:preserve-3d;animation:l7Sway 7s ease-in-out infinite}
#lx7 .ls-l{position:absolute;inset:0;width:100%;height:100%;display:block;max-width:none;pointer-events:none;backface-visibility:hidden;transform:translateZ(calc(var(--S,56px) * var(--z))) scale(calc(1 - var(--z) / 4))}
#lx7 .ls-l.side{transform:translateZ(calc(var(--S,56px) * -.03)) translateY(2.5%) scale(1.0075)}
#lx7 .ls-cast{position:absolute;left:14%;right:14%;bottom:-9%;height:14%;border-radius:50%;display:block;background:radial-gradient(closest-side,rgba(42,20,80,.26),rgba(42,20,80,0));filter:blur(1.5px);transform:translateZ(calc(var(--S,56px) * -.08))}
body[data-theme="night"] #lx7 .ls-cast{background:radial-gradient(closest-side,rgba(0,0,0,.5),rgba(0,0,0,0))}
@keyframes l7Sway{0%,100%{transform:rotateY(-18deg) rotateX(5deg)}50%{transform:rotateY(18deg) rotateX(-5deg)}}
#lx7 .ls.hov{--lift:calc(var(--S,56px) * -.06);--sc:1.04}
#lx7 .ls.down{--lift:calc(var(--S,56px) * .02);--sc:.97}
#lx7 .l-app .ls{--S:56px}
#lx7 .l-app:not([aria-pressed="true"]) .ls{filter:saturate(.75)}
body[data-motion="minimal"] #lx7 .ls-idle,body[data-motion="minimal"] #lx7 .l-btn.next,body[data-motion="minimal"] #lx7 .l-pn{animation:none !important}

/* ---------- smaller frames: one panel at a time, chosen by tabs (her Fire tablet upright, her iPhone) ---------- */
#lx7.l-one .l-head p{display:none}
#lx7.l-one .l-steps li span{display:none}
#lx7.l-one .l-steps li{padding:4px 5px}
#lx7.l-one .l-steps li.now{padding:4px 11px 4px 5px}
#lx7.l-one .l-steps li.now span{display:inline}
#lx7.l-one .l-tabs{display:flex;position:relative;gap:3px;background:var(--l-wellbg);box-shadow:var(--l-well);border:1px solid var(--l-hair);padding:3px;border-radius:999px;flex:0 0 auto}
#lx7.l-one .l-tabs .l-thumb{position:absolute;top:3px;bottom:3px;left:0;width:0;border-radius:999px;background:linear-gradient(var(--l-pa),var(--l-pb));border:1px solid var(--l-pedge);box-shadow:var(--l-psh);transition:transform .38s var(--l-spring),width .38s var(--l-spring);pointer-events:none}
#lx7.l-one .l-tabs button{position:relative;z-index:1;flex:1 1 0;border:1px solid transparent;background:transparent;border-radius:999px;padding:7px 6px;font-size:13px;font-weight:600;cursor:pointer;color:var(--l-ink3);white-space:nowrap;display:flex;align-items:center;justify-content:center;gap:6px;transition:color .2s}
#lx7.l-one .l-tabs button[aria-selected="true"]{color:#fff}
#lx7.l-one .l-tabs .d{width:6px;height:6px;border-radius:50%;background:currentColor;animation:l7Pulse 1.6s ease-in-out infinite}
#lx7.l-one .l-panels{grid-template-columns:minmax(0,1fr) !important}
#lx7.l-one .l-gut{display:none}
#lx7.l-one .l-pn{display:none}
#lx7.l-one .l-pn.show{display:flex}
#lx7.l-one .l-paper{padding:30px 26px 34px}
#lx7.l-phone .l-head h1{font-size:22px}
#lx7.l-phone .l-steps{display:none}
#lx7.l-phone .l-paper{padding:22px 16px 26px;font-size:14px}
#lx7.l-phone .l-desk{padding:12px 8px 20px}
#lx7.l-phone .l-paper .cv .seals img{width:62px;height:62px}
@media (prefers-reduced-motion:reduce){#lx7 *,#lx7 *::before,#lx7 *::after{animation:none !important;transition:none !important}}
</style>
<script>try{(window.__ingParts=window.__ingParts||{})["p39"]="started";}catch(_){}
/* R107 · Lector's page, as she approved it. The reading itself (the parts, the notes, the joining, the analysis) is
   Lector's own (R86), unchanged; this draws it in three panels, reads one app or a set of them, writes the documents
   for the set, and keeps what it writes. The layered seals and the master seal are filled in by the build. */
var LX7_LAYERS=/*R107_LAYERS*/null;
var LX7_MASTER=/*R107_MASTER*/null;
;try{window.__ingParts["p39"]="running";}catch(_){}
</script>
