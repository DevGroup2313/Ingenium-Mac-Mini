<style id="r112-css">
/* ============ R112 · FABRICA, HER OWN OFFLINE GITHUB, AS SHE APPROVED IT ============
   Her word (17 October): "I want Ingenium to be my own offline GitHub ... I want for Github to be optional because
   Ingenium is fully capable of completing these tasks with no dependencies inside of the app", "fully capable to
   build, test, run and ship ready made apps and zip packages for all of my apps and any future ones", and of this
   page: "I want the buttons on the page to be analogue and have the same animated look and effect of the rest of the
   apps pages. I don't want the buttons to be stiff and flat."
   The page she approved in its preview (source/yard/preview), on the engines under it: IngRepo (R110, each app a
   real git repository on the device) and IngShip (R111, test a version, ship it as one page or a web app).
   One frame the height of the window, as Lector's: her apps on the left, the work on the chosen app in the middle,
   testing and shipping on the right; one panel at a time, under tabs, on an upright tablet or a phone. Every key,
   chip and tile lifts, sinks and settles with a spring; nothing glows and nothing pulses. */
#page-fabrica.fb-page > .page-title,#page-fabrica.fb-page > .lede{display:none !important}
body.fb-on .main{padding-bottom:10px !important}
/* 6.0: Ingenium's own foot only (a direct child of the body). Written as ".foot" it hid every ship card's foot too, with
   its Make and save key: the owner's "the options are not clickable inside of the page except for download them all". */
body.fb-on > .foot{display:none !important}
#fb{
  --f-bg:#f5f3f7;--f-card:#faf8fc;--f-hi:#ffffff;--f-lo:#eee8f4;--f-a:#ffffff;--f-b:#f9f7fc;
  --f-ink1:#221a2e;--f-ink2:#4a4358;--f-ink3:#6c6579;--f-hair:rgba(34,26,46,.10);--f-hair2:rgba(34,26,46,.06);
  --f-acc:#6a3fb5;--f-accs:rgba(106,63,181,.12);--f-ring:rgba(106,63,181,.5);
  --f-gold:#b88a3a;--f-golds:rgba(202,162,74,.16);--f-goldink:#7d5d22;--f-ok:#2f7a55;--f-oks:rgba(47,122,85,.12);--f-warn:#9a5a12;--f-warns:rgba(184,116,46,.12);
  --f-add:#1f7a4d;--f-addbg:rgba(47,160,100,.10);--f-del:#a33a3a;--f-delbg:rgba(200,70,70,.09);
  --f-code:#f7f5fa;--f-codeink:#2a2236;--f-com:#8a8296;
  --f-slab:inset 0 1px 0 rgba(255,255,255,.85),inset 0 -1px 0 rgba(40,22,68,.05),0 1px 0 rgba(40,22,68,.10),0 3px 0 rgba(40,22,68,.05),0 6px 12px rgba(40,22,68,.07),0 18px 36px rgba(40,22,68,.08);
  --f-slabhi:inset 0 1px 0 rgba(255,255,255,.85),inset 0 -1px 0 rgba(40,22,68,.05),0 1px 0 rgba(40,22,68,.11),0 4px 0 rgba(40,22,68,.05),0 9px 16px rgba(40,22,68,.09),0 24px 44px rgba(40,22,68,.10);
  --f-pop:inset 0 -1.5px 0 rgba(40,22,68,.13),0 2px 0 rgba(40,22,68,.25),0 4px 5px rgba(40,22,68,.16),0 9px 14px rgba(40,22,68,.10);
  --f-pophi:inset 0 -1.5px 0 rgba(40,22,68,.13),0 3px 0 rgba(40,22,68,.25),0 6px 8px rgba(40,22,68,.18),0 13px 20px rgba(40,22,68,.12);
  --f-press:inset 0 2px 5px rgba(40,22,68,.22),0 1px 1px rgba(40,22,68,.18);
  --f-well:inset 0 1px 2.5px rgba(40,22,68,.08);--f-wellbg:rgba(34,26,46,.03);
  --f-pill:inset 0 1px 0 rgba(255,255,255,.6),inset 0 -1.5px 0 rgba(40,20,70,.10),0 1px 0 rgba(40,20,70,.12),0 3px 4px rgba(40,20,70,.09),0 7px 10px rgba(40,20,70,.06);
  --f-pa:#7348be;--f-pb:#5d37a1;--f-pedge:#4b2a86;--f-pledge:#3a2070;
  --f-psh:inset 0 1px 0 rgba(255,255,255,.16),0 2px 0 var(--f-pledge),0 4px 6px rgba(40,22,68,.24),0 9px 16px rgba(40,22,68,.16);
  --f-pshhi:inset 0 1px 0 rgba(255,255,255,.18),0 3px 0 var(--f-pledge),0 6px 9px rgba(40,22,68,.26),0 13px 22px rgba(40,22,68,.18);
  --f-ppress:inset 0 2px 6px rgba(20,8,40,.45),0 1px 1px rgba(40,22,68,.2);
  --f-spring:cubic-bezier(.34,1.35,.64,1);
  --f-serif:"Iowan Old Style","Palatino Linotype",Palatino,"Book Antiqua",Georgia,"Times New Roman",serif;
  --f-sans:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif;
  --f-mono:ui-monospace,"SF Mono",Menlo,Consolas,"Liberation Mono",monospace;
  --f-h:640px;
  position:relative;display:flex;flex-direction:column;gap:12px;height:var(--f-h);min-height:420px;color:var(--f-ink1);font:14px/1.5 var(--f-sans)}
body[data-theme="night"] #fb{
  --f-bg:#110d18;--f-card:#1c1626;--f-hi:#201a2b;--f-lo:#2a2239;--f-a:#2a2239;--f-b:#251e33;
  --f-ink1:#f3eefb;--f-ink2:#d3c9e3;--f-ink3:#a99cc1;--f-hair:rgba(205,184,240,.11);--f-hair2:rgba(205,184,240,.07);
  --f-acc:#b79ce6;--f-accs:rgba(183,156,230,.16);--f-ring:rgba(183,156,230,.45);
  --f-gold:#d8b46a;--f-golds:rgba(216,180,106,.16);--f-goldink:#e3c58a;--f-ok:#7fd1a6;--f-oks:rgba(127,209,166,.14);--f-warn:#e6b26a;--f-warns:rgba(230,178,106,.14);
  --f-add:#8fdcb0;--f-addbg:rgba(127,209,166,.10);--f-del:#f0a0a0;--f-delbg:rgba(240,120,120,.10);
  --f-code:#17121f;--f-codeink:#e8e1f4;--f-com:#8a8296;
  --f-slab:inset 0 1px 0 rgba(255,255,255,.06),inset 0 -1px 0 rgba(0,0,0,.35),0 1px 0 rgba(0,0,0,.6),0 3px 0 rgba(0,0,0,.28),0 6px 12px rgba(0,0,0,.35),0 18px 36px rgba(0,0,0,.4);
  --f-slabhi:inset 0 1px 0 rgba(255,255,255,.08),inset 0 -1px 0 rgba(0,0,0,.35),0 1px 0 rgba(0,0,0,.6),0 4px 0 rgba(0,0,0,.3),0 9px 16px rgba(0,0,0,.4),0 24px 44px rgba(0,0,0,.45);
  --f-pop:inset 0 1px 0 rgba(255,255,255,.07),inset 0 -2px 0 rgba(0,0,0,.45),0 2px 0 rgba(0,0,0,.75),0 4px 5px rgba(0,0,0,.50),0 9px 14px rgba(0,0,0,.36);
  --f-pophi:inset 0 1px 0 rgba(255,255,255,.08),inset 0 -2px 0 rgba(0,0,0,.45),0 3px 0 rgba(0,0,0,.75),0 6px 8px rgba(0,0,0,.52),0 13px 20px rgba(0,0,0,.40);
  --f-press:inset 0 2px 6px rgba(0,0,0,.6),0 1px 1px rgba(0,0,0,.4);
  --f-well:inset 0 1px 3px rgba(0,0,0,.4);--f-wellbg:rgba(10,6,18,.35);
  --f-pill:inset 0 1px 0 rgba(255,255,255,.09),inset 0 -1.5px 0 rgba(0,0,0,.4),0 1px 0 rgba(0,0,0,.5),0 3px 5px rgba(0,0,0,.4),0 8px 12px rgba(0,0,0,.3);
  --f-pa:#7a56c8;--f-pb:#5b3aa1;--f-pedge:#2c1956;--f-pledge:#170b30;
  --f-psh:inset 0 1px 0 rgba(255,255,255,.14),0 2px 0 var(--f-pledge),0 4px 6px rgba(0,0,0,.5),0 9px 16px rgba(0,0,0,.36);
  --f-pshhi:inset 0 1px 0 rgba(255,255,255,.16),0 3px 0 var(--f-pledge),0 6px 9px rgba(0,0,0,.52),0 13px 22px rgba(0,0,0,.4)}
#fb *{box-sizing:border-box}
#fb button{font:inherit;color:inherit}
#fb button:focus-visible,#fb [tabindex]:focus-visible,#fb input:focus-visible,#fb textarea:focus-visible{outline:2px solid var(--f-acc);outline-offset:2px}
#fb [hidden]{display:none !important}

/* ---------- Ingenium's keys: they lift, sink and settle with a spring; nothing glows ---------- */
#fb .f-btn{position:relative;display:inline-flex;align-items:center;justify-content:center;gap:6px;border:1px solid var(--f-hair);background:linear-gradient(var(--f-a),var(--f-b));border-radius:10px;padding:7px 13px;font-size:13px;font-weight:600;cursor:pointer;white-space:nowrap;box-shadow:var(--f-pop);color:var(--f-ink1);line-height:1.3;
  transition:transform .16s var(--f-spring),box-shadow .16s ease,background-color .15s,color .15s,border-color .15s,opacity .2s}
#fb .f-btn:hover:not(:disabled){transform:translateY(-2px);box-shadow:var(--f-pophi)}
#fb .f-btn:active:not(:disabled){transform:translateY(1px) scale(.985);box-shadow:var(--f-press);transition-duration:.06s}
#fb .f-btn:disabled{opacity:.5;cursor:default}
#fb .f-btn.pri{background:linear-gradient(var(--f-pa),var(--f-pb));border-color:var(--f-pedge);color:#fff;box-shadow:var(--f-psh);text-shadow:0 1px 1px rgba(30,10,60,.35)}
#fb .f-btn.pri:hover:not(:disabled){box-shadow:var(--f-pshhi)}
#fb .f-btn.pri:active:not(:disabled){box-shadow:var(--f-ppress)}
#fb .f-btn.next{animation:fbPop .55s var(--f-spring)}
#fb .f-btn.quiet{border-color:transparent;background:transparent;box-shadow:none;color:var(--f-acc);padding:3px 6px}
#fb .f-btn.quiet:hover:not(:disabled){transform:none;box-shadow:none;text-decoration:underline}
#fb .f-btn.sm{padding:5px 10px;font-size:12.5px;border-radius:999px}
#fb .f-seg{position:relative;display:inline-flex;gap:2px;border:1px solid var(--f-hair);border-radius:999px;padding:3px;background:var(--f-wellbg);box-shadow:var(--f-well);max-width:100%;overflow-x:auto;scrollbar-width:none}
#fb .f-seg::-webkit-scrollbar{display:none}
#fb .f-seg .f-thumb{position:absolute;top:3px;bottom:3px;left:0;width:0;border-radius:999px;background:linear-gradient(var(--f-pa),var(--f-pb));border:1px solid var(--f-pedge);box-shadow:var(--f-psh);transition:transform .38s var(--f-spring),width .38s var(--f-spring);pointer-events:none;z-index:0}
#fb .f-seg button{position:relative;z-index:1;border:1px solid transparent;background:transparent;border-radius:999px;padding:5px 11px;font-size:12.5px;font-weight:600;cursor:pointer;color:var(--f-ink3);white-space:nowrap;transition:color .2s,transform .12s var(--f-spring)}
#fb .f-seg button:hover{color:var(--f-ink1)}
#fb .f-seg button[aria-pressed="true"],#fb .f-seg button[aria-selected="true"]{color:#fff;text-shadow:0 1px 1px rgba(30,10,60,.3)}
#fb .f-seg button:active{transform:translateY(1px)}
#fb .f-seg .n{display:inline-block;min-width:17px;padding:0 5px;margin-left:5px;border-radius:999px;font-size:11px;line-height:17px;background:var(--f-golds);color:var(--f-goldink)}
#fb .f-seg button[aria-selected="true"] .n{background:rgba(255,255,255,.22);color:#fff}
#fb .f-chip{display:inline-flex;align-items:center;gap:6px;font-size:12px;font-weight:600;border-radius:999px;padding:3px 10px;background:linear-gradient(var(--f-a),var(--f-b));border:1px solid var(--f-hair);color:var(--f-ink2);white-space:nowrap;max-width:100%;overflow:hidden;text-overflow:ellipsis;box-shadow:var(--f-pill);line-height:1.4}
#fb .f-chip.ok{color:var(--f-ok)} #fb .f-chip.warn{color:var(--f-warn)} #fb .f-chip.live{color:var(--f-acc);border-color:var(--f-ring)}
#fb .f-chip .d{width:7px;height:7px;border-radius:50%;background:currentColor;flex:0 0 auto}
#fb .f-sw{display:inline-flex;align-items:center;gap:8px;font-size:12.5px;color:var(--f-ink2);cursor:pointer;user-select:none}
#fb .f-sw input{appearance:none;-webkit-appearance:none;width:38px;height:22px;border-radius:999px;background:var(--f-wellbg);border:1px solid var(--f-hair);box-shadow:var(--f-well);position:relative;cursor:pointer;margin:0;flex:0 0 auto;transition:background .25s}
#fb .f-sw input::after{content:"";position:absolute;top:2px;left:2px;width:16px;height:16px;border-radius:50%;background:linear-gradient(var(--f-a),var(--f-b));box-shadow:var(--f-pop);transition:transform .35s var(--f-spring)}
#fb .f-sw input:checked{background:linear-gradient(var(--f-pa),var(--f-pb))}
#fb .f-sw input:checked::after{transform:translateX(16px)}
#fb input[type="text"],#fb textarea{border-radius:10px;border:1px solid var(--f-hair);background:var(--f-wellbg);box-shadow:var(--f-well);color:var(--f-ink1);font:13.5px/1.45 var(--f-sans);padding:8px 11px}
@keyframes fbRise3{from{opacity:0;transform:perspective(1400px) rotateX(6deg) translateY(16px) scale(.985)}to{opacity:1;transform:none}}
@keyframes fbRise{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}
@keyframes fbPop{0%{transform:scale(.96)}60%{transform:scale(1.015)}100%{transform:none}}
@keyframes fbSway{0%,100%{transform:rotateY(-18deg) rotateX(5deg)}50%{transform:rotateY(18deg) rotateX(-5deg)}}

/* ---------- the frame ---------- */
#fb .f-head{display:flex;align-items:flex-end;gap:12px 18px;flex-wrap:wrap;flex:0 0 auto}
#fb .f-head h1{font:600 25px/1.1 var(--f-serif);margin:0;letter-spacing:.045em;color:var(--f-ink1)}
#fb .f-head p{margin:4px 0 0;color:var(--f-ink2);font-size:14px;max-width:64ch}
#fb .f-steps{display:flex;gap:6px;list-style:none;margin:0 0 0 auto;padding:4px 2px 8px;align-items:center}
#fb .f-steps li{display:flex;align-items:center;gap:6px;font-size:12.5px;font-weight:600;color:var(--f-ink3);padding:4px 11px 4px 5px;border-radius:999px;border:1px solid var(--f-hair);background:linear-gradient(var(--f-a),var(--f-b));box-shadow:var(--f-pill);height:30px;white-space:nowrap;transition:color .3s,border-color .3s,transform .3s var(--f-spring),box-shadow .3s}
#fb .f-steps li i{font-style:normal;width:19px;height:19px;border-radius:50%;display:inline-grid;place-items:center;font-size:11px;background:var(--f-wellbg);box-shadow:var(--f-well)}
#fb .f-steps li.done{color:var(--f-ink2)} #fb .f-steps li.done i{background:var(--f-oks);color:var(--f-ok);box-shadow:none}
#fb .f-steps li.now{color:var(--f-acc);font-weight:700;border-color:var(--f-ring);transform:translateY(-2px);box-shadow:var(--f-pophi)}
#fb .f-steps li.now i{background:linear-gradient(var(--f-pa),var(--f-pb));color:#fff;box-shadow:0 1px 0 var(--f-pledge),0 2px 4px rgba(40,22,68,.25)}
#fb .f-steps .sep{width:10px;height:2px;border-radius:2px;background:var(--f-hair);padding:0;border:0;box-shadow:none}
#fb .f-tabs{display:none}
#fb .f-panels{flex:1 1 auto;min-height:0;display:grid;grid-template-columns:290px minmax(0,1.25fr) minmax(300px,1fr);gap:16px}
#fb .f-pn{min-width:0;min-height:0;display:flex;flex-direction:column;background:var(--f-hi);border:1px solid var(--f-hair);border-radius:14px;overflow:hidden;box-shadow:var(--f-slab);animation:fbRise3 .6s var(--f-spring) backwards;transition:transform .4s var(--f-spring),box-shadow .4s ease;transform-origin:50% 100%}
@media (hover:hover){#fb .f-pn:hover{transform:translateY(-2px);box-shadow:var(--f-slabhi)}}
#fb .f-pn:nth-child(2){animation-delay:.06s}#fb .f-pn:nth-child(3){animation-delay:.12s}
#fb .f-pn-h{display:flex;align-items:center;gap:9px;padding:11px 14px 10px;border-bottom:1px solid var(--f-hair2);flex:0 0 auto;min-height:52px;background:linear-gradient(var(--f-a),var(--f-b));box-shadow:inset 0 1px 0 rgba(255,255,255,.6)}
body[data-theme="night"] #fb .f-pn-h{box-shadow:inset 0 1px 0 rgba(255,255,255,.05)}
#fb .f-pn-h h2{font:600 15px/1 var(--f-serif);letter-spacing:.06em;color:var(--f-ink1);margin:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
#fb .f-pn-h .f-chip{margin-left:auto}
#fb .f-pn-b{flex:1 1 auto;min-height:0;overflow:auto;overscroll-behavior:contain;scrollbar-width:none}
#fb .f-pn-b::-webkit-scrollbar{display:none}
#fb .f-pn-f{flex:0 0 auto;border-top:1px solid var(--f-hair2);padding:11px 14px 13px;display:flex;align-items:center;gap:10px;flex-wrap:wrap;background:linear-gradient(var(--f-b),var(--f-a))}
#fb .f-pn-f:empty{display:none}
#fb .f-sec{padding:13px 14px 12px;border-bottom:1px solid var(--f-hair2)}
#fb .f-sec:last-child{border-bottom:0}
#fb .f-sec h3{font:600 14px/1.3 var(--f-serif);letter-spacing:.03em;margin:0 0 10px;color:var(--f-ink1);display:flex;align-items:center;gap:8px;flex-wrap:wrap}
#fb .f-sec h3 .f-chip{margin-left:auto;font-family:var(--f-sans)}
#fb .f-hint{font-size:12.5px;color:var(--f-ink3);margin:8px 0 0;line-height:1.5}
#fb .f-row{display:flex;align-items:center;gap:8px;flex-wrap:wrap}

/* the seals: each app's own seal in its own layers, at depth, swaying as on Lector's page; they turn toward the pointer,
   lift, and sink when pressed; by night each app's own night seal */
#fb .f-ls{position:relative;display:inline-block;width:var(--S,56px);height:var(--S,56px);perspective:calc(var(--S,56px) * 4);--rx:0deg;--ry:0deg;--lift:0px;--sc:1;flex:0 0 auto}
#fb .f-ls-tilt{position:absolute;inset:0;display:block;transform-style:preserve-3d;transform:rotateX(var(--rx)) rotateY(var(--ry)) translateY(var(--lift)) scale(var(--sc));transition:transform .35s cubic-bezier(.2,.8,.2,1)}
#fb .f-ls-idle{position:absolute;inset:0;display:block;transform-style:preserve-3d;animation:fbSway 7s ease-in-out infinite}
#fb .f-ls-l{position:absolute;inset:0;width:100%;height:100%;display:block;max-width:none;pointer-events:none;backface-visibility:hidden;transform:translateZ(calc(var(--S,56px) * var(--z))) scale(calc(1 - var(--z) / 4))}
#fb .f-ls-l.side{transform:translateZ(calc(var(--S,56px) * -.03)) translateY(2.5%) scale(1.0075)}
#fb .f-ls-cast{position:absolute;left:14%;right:14%;bottom:-9%;height:14%;border-radius:50%;display:block;background:radial-gradient(closest-side,rgba(42,20,80,.26),rgba(42,20,80,0));filter:blur(1.5px);transform:translateZ(calc(var(--S,56px) * -.08))}
body[data-theme="night"] #fb .f-ls-cast{background:radial-gradient(closest-side,rgba(0,0,0,.5),rgba(0,0,0,0))}
#fb .f-ls.hov{--lift:calc(var(--S,56px) * -.06);--sc:1.04}
#fb .f-ls.down{--lift:calc(var(--S,56px) * .02);--sc:.97}
#fb .f-ls.flat img{position:absolute;inset:0;width:100%;height:100%;display:block;animation:fbSway 7s ease-in-out infinite}
#fb .f-ls.new{border-radius:50%;border:1.5px dashed var(--f-ring);display:inline-grid;place-items:center;color:var(--f-acc);font:600 calc(var(--S,56px) * .38)/1 var(--f-serif)}
#fb .f-ls.new span{display:block;animation:fbSway 7s ease-in-out infinite}

/* her apps: tiles two by two; the chosen one raised, with its tick */
#fb .f-repos{display:grid;grid-template-columns:1fr 1fr;gap:10px;padding:12px 12px 14px}
#fb .f-repo{position:relative;display:flex;flex-direction:column;align-items:center;gap:5px;padding:13px 6px 10px;border:1px solid var(--f-hair);border-radius:12px;background:linear-gradient(var(--f-a),var(--f-b));cursor:pointer;text-align:center;box-shadow:var(--f-pop);overflow:hidden;min-width:0;
  transition:transform .18s var(--f-spring),box-shadow .18s,border-color .2s;animation:fbRise .45s var(--f-spring) backwards}
#fb .f-repo:nth-child(2){animation-delay:.05s}#fb .f-repo:nth-child(3){animation-delay:.1s}#fb .f-repo:nth-child(4){animation-delay:.15s}#fb .f-repo:nth-child(5){animation-delay:.2s}
#fb .f-repo::before{content:"";position:absolute;left:0;top:0;bottom:0;width:4px;background:var(--app,var(--f-acc));opacity:.35;transition:opacity .25s}
#fb .f-repo:hover{transform:translateY(-2px);box-shadow:var(--f-pophi)}
#fb .f-repo:active{transform:translateY(1px) scale(.985);box-shadow:var(--f-press);transition-duration:.06s}
#fb .f-repo[aria-pressed="true"]{border-color:var(--f-ring);box-shadow:var(--f-pophi),inset 0 0 0 1px var(--f-ring);transform:translateY(-3px)}
#fb .f-repo[aria-pressed="true"]::before{opacity:1}
#fb .f-repo[aria-pressed="true"]::after{content:"✓";position:absolute;top:6px;right:8px;width:18px;height:18px;border-radius:50%;display:grid;place-items:center;font-size:10.5px;color:#fff;font-weight:700;background:linear-gradient(var(--f-pa),var(--f-pb));box-shadow:0 1px 0 var(--f-pledge);animation:fbPop .4s var(--f-spring)}
#fb .f-repo .f-ls{--S:56px}
#fb .f-repo:not([aria-pressed="true"]) .f-ls{filter:saturate(.8)}
#fb .f-repo .nm{font:600 13px/1.2 var(--f-serif);color:var(--f-ink2);max-width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;padding:0 4px}
#fb .f-repo .nm em{font:500 11.5px var(--f-sans);font-style:normal;color:var(--f-ink3)}
#fb .f-repo[aria-pressed="true"] .nm{color:var(--f-ink1)}
#fb .f-repo .stl{font-size:11px;color:var(--f-ink3);line-height:1.3;max-width:100%;padding:0 6px;display:flex;align-items:center;gap:5px;justify-content:center}
#fb .f-repo .stl span{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
#fb .f-repo .st{flex:0 0 auto;width:7px;height:7px;border-radius:50%;background:var(--f-ok);box-shadow:inset 0 -1px 0 rgba(0,0,0,.25)}
#fb .f-repo .st.changed{background:var(--f-gold)} #fb .f-repo .st.tested{background:var(--f-acc)} #fb .f-repo .st.new{background:var(--f-ink3)}
#fb .f-repo.wide{grid-column:1 / -1;flex-direction:row;justify-content:center;gap:12px;padding:10px 12px}
#fb .f-repo.wide .f-ls{--S:42px}
#fb .f-repo.wide .tx{display:flex;flex-direction:column;align-items:flex-start;gap:3px;min-width:0}
#fb.f-one .f-repos{grid-template-columns:repeat(auto-fill,minmax(150px,1fr))}

/* the work: a branch, the views, the changes */
#fb .f-pn-h .f-ls{--S:34px}
#fb .f-branch{display:inline-flex;align-items:center;gap:6px;border:1px solid var(--f-hair);border-radius:999px;padding:3px 10px 3px 8px;font-size:12px;font-weight:600;color:var(--f-ink2);background:linear-gradient(var(--f-a),var(--f-b));box-shadow:var(--f-pill);cursor:pointer;transition:transform .16s var(--f-spring),box-shadow .16s;max-width:40%;overflow:hidden}
#fb .f-branch:hover{transform:translateY(-2px);box-shadow:var(--f-pophi)}
#fb .f-branch:active{transform:translateY(1px);box-shadow:var(--f-press)}
#fb .f-branch svg{width:13px;height:13px;flex:0 0 auto}
#fb .f-branch span{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
#fb .f-views{padding:10px 12px 0;flex:0 0 auto}
#fb .f-work{display:flex;flex-direction:column;min-height:0;flex:1 1 auto;overflow:auto;scrollbar-width:none}
#fb .f-work::-webkit-scrollbar{display:none}
#fb .f-files{padding:10px 12px 0;display:flex;flex-direction:column;gap:6px;flex:0 0 auto}
#fb .f-frow{display:flex;align-items:center;gap:9px;padding:7px 10px;text-align:left;width:100%;border-radius:10px;border:1px solid var(--f-hair2);background:linear-gradient(var(--f-a),var(--f-b));box-shadow:var(--f-pill);cursor:pointer;transition:transform .16s var(--f-spring),box-shadow .16s,border-color .2s;font-size:13px}
#fb .f-frow:hover{transform:translateY(-2px);box-shadow:var(--f-pophi)}
#fb .f-frow:active{transform:translateY(1px);box-shadow:var(--f-press)}
#fb .f-frow[aria-pressed="true"]{border-color:var(--f-ring);box-shadow:var(--f-pophi),inset 0 0 0 1px var(--f-ring)}
#fb .f-frow .p{flex:1 1 auto;min-width:0;font-family:var(--f-mono);font-size:12.5px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;text-align:left}
#fb .f-frow .k{flex:0 0 auto;font-size:11px;font-weight:700;padding:1px 8px;border-radius:999px;background:var(--f-golds);color:var(--f-goldink)}
#fb .f-frow .k.added{background:var(--f-addbg);color:var(--f-add)} #fb .f-frow .k.removed{background:var(--f-delbg);color:var(--f-del)} #fb .f-frow .k.moved,#fb .f-frow .k.mode{background:var(--f-accs);color:var(--f-acc)}
#fb .f-frow .c{flex:0 0 auto;font:600 11.5px/1 var(--f-mono)}
#fb .f-frow .c .a{color:var(--f-add)} #fb .f-frow .c .r{color:var(--f-del)}
#fb .f-diff{margin:10px 12px 12px;border:1px solid var(--f-hair);border-radius:12px;background:var(--f-code);box-shadow:var(--f-well);overflow:hidden;display:flex;flex-direction:column;min-height:160px;flex:1 1 auto}
#fb .f-diff-h{display:flex;align-items:center;gap:8px;padding:8px 12px;font-size:12px;color:var(--f-ink3);border-bottom:1px solid var(--f-hair2);flex-wrap:wrap}
#fb .f-diff-h b{color:var(--f-ink1);font-weight:600;font-family:var(--f-mono);font-size:12px;overflow:hidden;text-overflow:ellipsis;max-width:100%}
#fb .f-diff-h .f-btn{margin-left:auto}
#fb .f-dcode{margin:0;padding:6px 0 10px;font:12px/1.6 var(--f-mono);color:var(--f-codeink);overflow:auto;flex:1 1 0;min-height:120px;scrollbar-width:none}
#fb .f-dcode::-webkit-scrollbar{display:none}
#fb .f-dl{display:flex;white-space:pre;padding-right:14px}
#fb .f-dl i{flex:0 0 auto;width:56px;text-align:right;padding-right:8px;color:var(--f-com);font-style:normal;user-select:none;font-variant-numeric:tabular-nums}
#fb .f-dl s{flex:0 0 auto;width:16px;text-decoration:none;color:var(--f-com);user-select:none}
#fb .f-dl.add{background:var(--f-addbg)} #fb .f-dl.add s{color:var(--f-add)}
#fb .f-dl.del{background:var(--f-delbg)} #fb .f-dl.del s{color:var(--f-del)}
#fb .f-dl.hunk{color:var(--f-acc);background:var(--f-accs);font-family:var(--f-sans);font-size:11.5px;font-weight:600;padding:3px 12px;margin:6px 0 2px;white-space:normal}
#fb .f-keep{display:flex;flex-direction:column;gap:8px;width:100%}
#fb .f-keep textarea{width:100%;min-height:58px;resize:vertical}
#fb .f-keep .f-row .f-btn.pri{margin-left:auto}
#fb .f-empty{padding:22px 16px;color:var(--f-ink2);font-size:13.5px;line-height:1.6;animation:fbRise .4s var(--f-spring)}
#fb .f-empty b{display:block;font:600 17px/1.3 var(--f-serif);color:var(--f-ink1);margin-bottom:6px;letter-spacing:.02em}
#fb .f-note{margin:10px 12px 0;padding:8px 12px;border-radius:10px;background:var(--f-accs);color:var(--f-acc);font-size:12.5px;font-weight:600;display:flex;align-items:center;gap:8px;flex-wrap:wrap}
#fb .f-note .f-btn{margin-left:auto}

/* files */
#fb .f-tree{padding:10px 12px;font-size:13px;display:flex;flex-direction:column;gap:2px}
#fb .f-node{display:flex;align-items:center;gap:7px;padding:5px 8px;border-radius:8px;cursor:pointer;transition:background .15s,transform .16s var(--f-spring);border:0;background:transparent;width:100%;text-align:left}
#fb .f-node:hover{background:var(--f-accs);transform:translateX(2px)}
#fb .f-node[aria-pressed="true"]{background:var(--f-accs);color:var(--f-acc);font-weight:600}
#fb .f-node .ic{width:16px;text-align:center;color:var(--f-ink3);flex:0 0 auto}
#fb .f-node .nm{font-family:var(--f-mono);font-size:12.5px;flex:1 1 auto;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
#fb .f-node .sz{font-size:11.5px;color:var(--f-ink3);flex:0 0 auto;font-variant-numeric:tabular-nums}

/* history */
#fb .f-hist{padding:12px 12px 16px 26px;position:relative;display:flex;flex-direction:column;gap:10px}
#fb .f-hist::before{content:"";position:absolute;left:15px;top:18px;bottom:18px;width:2px;border-radius:2px;background:var(--f-hair)}
#fb .f-cm{position:relative;border:1px solid var(--f-hair);border-radius:12px;padding:9px 12px 8px;background:linear-gradient(var(--f-a),var(--f-b));box-shadow:var(--f-pop);cursor:pointer;animation:fbRise .4s var(--f-spring) backwards;transition:transform .18s var(--f-spring),box-shadow .18s,border-color .2s}
#fb .f-cm::before{content:"";position:absolute;left:-16px;top:14px;width:10px;height:10px;border-radius:50%;background:var(--f-hi);border:2px solid var(--f-acc)}
#fb .f-cm.merge::before{border-color:var(--f-gold)}
#fb .f-cm:hover{transform:translateY(-2px);box-shadow:var(--f-pophi)}
#fb .f-cm[aria-expanded="true"]{border-color:var(--f-ring);box-shadow:var(--f-pophi),inset 0 0 0 1px var(--f-ring)}
#fb .f-cm b{font:600 13.5px/1.35 var(--f-sans);display:block;overflow:hidden;text-overflow:ellipsis}
#fb .f-cm .meta{display:flex;gap:6px 9px;align-items:center;flex-wrap:wrap;margin-top:3px;font-size:11.5px;color:var(--f-ink3)}
#fb .f-cm .id{font-family:var(--f-mono);font-size:11px;padding:0 6px;border-radius:5px;background:var(--f-wellbg);box-shadow:var(--f-well)}
#fb .f-tag{font-size:11px;font-weight:700;padding:1px 8px;border-radius:999px;background:var(--f-golds);color:var(--f-goldink);border:1px solid rgba(184,138,58,.3)}
#fb .f-cm .more{display:none;margin-top:8px;border-top:1px solid var(--f-hair2);padding-top:8px}
#fb .f-cm[aria-expanded="true"] .more{display:block}
#fb .f-cm .more ul{margin:0 0 8px;padding-left:18px;font-size:12.5px;color:var(--f-ink2)}
#fb .f-cm .more ul li{font-family:var(--f-mono);font-size:12px;overflow:hidden;text-overflow:ellipsis}
#fb .f-cm .more .msg{white-space:pre-wrap;font-size:12.5px;color:var(--f-ink2);margin:0 0 8px}
#fb .f-acts{display:flex;gap:8px;flex-wrap:wrap}

/* ideas */
#fb .f-ideas{padding:12px;display:flex;flex-direction:column;gap:10px}
#fb .f-idea{border:1px solid var(--f-hair);border-radius:12px;padding:11px 13px;background:linear-gradient(var(--f-a),var(--f-b));box-shadow:var(--f-pop);transition:transform .18s var(--f-spring),box-shadow .18s;animation:fbRise .4s var(--f-spring) backwards}
#fb .f-idea:hover{transform:translateY(-2px);box-shadow:var(--f-pophi)}
#fb .f-idea.on{border-color:var(--f-ring)}
#fb .f-idea b{font:600 14px/1.3 var(--f-serif);display:flex;align-items:center;gap:8px;flex-wrap:wrap}
#fb .f-idea p{margin:4px 0 9px;font-size:12.5px;color:var(--f-ink2)}

/* test and ship */
#fb .f-checks{display:flex;flex-direction:column;gap:7px}
#fb .f-ck{display:flex;align-items:flex-start;gap:10px;font-size:13px;padding:2px 0}
#fb .f-ck .m{flex:0 0 auto;width:22px;height:22px;border-radius:7px;display:grid;place-items:center;font-size:12px;font-weight:700;background:var(--f-wellbg);box-shadow:var(--f-well);color:var(--f-ink3);transition:background .3s,color .3s,transform .3s var(--f-spring)}
#fb .f-ck.run .m{color:var(--f-acc);background:var(--f-accs);box-shadow:none}
#fb .f-ck.ok .m{background:var(--f-oks);color:var(--f-ok);box-shadow:none;transform:scale(1.06)}
#fb .f-ck.warn .m,#fb .f-ck.fail .m{background:var(--f-warns);color:var(--f-warn);box-shadow:none}
#fb .f-ck.fail .m{color:var(--f-del);background:var(--f-delbg)}
#fb .f-ck small{display:block;font-size:12px;color:var(--f-ink3);white-space:pre-wrap}
#fb .f-targets{display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:9px}
#fb .f-tg{position:relative;display:flex;flex-direction:column;gap:5px;padding:10px 11px 10px;border:1px solid var(--f-hair);border-radius:12px;background:linear-gradient(var(--f-a),var(--f-b));box-shadow:var(--f-pop);transition:transform .18s var(--f-spring),box-shadow .18s,border-color .2s;min-width:0}
#fb .f-tg:hover{transform:translateY(-2px);box-shadow:var(--f-pophi)}
#fb .f-tg .top{display:flex;align-items:center;gap:8px}
#fb .f-tg svg{width:20px;height:20px;flex:0 0 auto;color:var(--f-acc)}
#fb .f-tg b{font:600 13px/1.25 var(--f-sans);min-width:0}
#fb .f-tg small{font-size:11.5px;color:var(--f-ink3);line-height:1.35}
#fb .f-tg .bar{height:6px;border-radius:999px;background:var(--f-wellbg);box-shadow:var(--f-well);overflow:hidden;margin-top:2px}
#fb .f-tg .bar i{display:block;height:100%;width:0;border-radius:999px;background:linear-gradient(90deg,var(--f-pa),var(--f-pb));transition:width .6s var(--f-spring)}
#fb .f-tg .foot{display:flex;align-items:center;gap:6px;margin-top:2px;flex-wrap:wrap}
#fb .f-tg .foot .f-chip{font-size:11px;padding:2px 8px}
#fb .f-tg.done{border-color:rgba(47,122,85,.35)}
#fb .f-copies{display:flex;flex-direction:column;gap:7px}
#fb .f-cp{display:flex;align-items:center;gap:10px;font-size:13px;padding:7px 10px;border-radius:10px;border:1px solid var(--f-hair2);background:linear-gradient(var(--f-a),var(--f-b));box-shadow:var(--f-pill);transition:transform .16s var(--f-spring),box-shadow .16s}
#fb .f-cp:hover{transform:translateY(-2px);box-shadow:var(--f-pophi)}
#fb .f-cp .t{flex:1 1 auto;min-width:0}
#fb .f-cp small{display:block;font-size:11.5px;color:var(--f-ink3)}

/* a sheet over the frame: bringing an app in, a new one, a name */
#fb .f-sheet-wrap{position:absolute;inset:0;z-index:20;display:grid;place-items:center;background:rgba(17,13,24,.35);animation:fbRise .2s ease;padding:14px;border-radius:14px}
#fb .f-sheet{width:min(560px,100%);max-height:100%;overflow:auto;background:var(--f-hi);border:1px solid var(--f-hair);border-radius:16px;box-shadow:var(--f-slabhi);padding:16px 18px 16px;animation:fbRise3 .45s var(--f-spring);scrollbar-width:none}
#fb .f-sheet h3{font:600 18px/1.25 var(--f-serif);margin:0 0 4px;letter-spacing:.02em}
#fb .f-sheet > p{margin:0 0 12px;color:var(--f-ink2);font-size:13.5px}
#fb .f-opt{display:flex;gap:11px;align-items:flex-start;padding:10px 12px;border:1px solid var(--f-hair);border-radius:12px;background:linear-gradient(var(--f-a),var(--f-b));box-shadow:var(--f-pop);margin-bottom:9px;cursor:pointer;width:100%;text-align:left;transition:transform .16s var(--f-spring),box-shadow .16s}
#fb .f-opt:hover:not(:disabled){transform:translateY(-2px);box-shadow:var(--f-pophi)}
#fb .f-opt:active:not(:disabled){transform:translateY(1px);box-shadow:var(--f-press)}
#fb .f-opt:disabled{opacity:.55;cursor:default}
#fb .f-opt .ic{flex:0 0 auto;width:30px;height:30px;border-radius:9px;display:grid;place-items:center;background:var(--f-accs);color:var(--f-acc);font-weight:700}
#fb .f-opt b{display:block;font-size:13.5px}
#fb .f-opt small{display:block;font-size:12px;color:var(--f-ink3)}
#fb .f-sheet .end{display:flex;justify-content:flex-end;gap:8px;margin-top:6px;flex-wrap:wrap}
#fb .f-sheet input[type="text"]{width:100%;margin:4px 0 10px}
#fb .f-toast{position:absolute;left:50%;bottom:86px;transform:translateX(-50%);z-index:25;background:var(--f-hi);border:1px solid var(--f-ring);border-radius:999px;padding:8px 16px;font-size:13px;font-weight:600;box-shadow:var(--f-pophi);animation:fbRise .3s var(--f-spring);max-width:calc(100% - 24px);text-align:center;color:var(--f-ink1)}

/* smaller frames: one panel at a time, chosen by tabs (her Fire tablet upright, her iPhone) */
#fb.f-one .f-tabs{display:inline-flex;position:relative;flex:0 0 auto;align-self:stretch}
#fb.f-one .f-tabs button{flex:1 1 0;justify-content:center}
#fb.f-one .f-panels{grid-template-columns:minmax(0,1fr)}
#fb.f-one .f-pn{display:none}
#fb.f-one .f-pn.show{display:flex}
#fb.f-one .f-head p{display:none}
#fb.f-one .f-steps li span{display:none}
#fb.f-one .f-steps li{padding:4px 5px}
#fb.f-one .f-steps li.now{padding:4px 11px 4px 5px}
#fb.f-one .f-steps li.now span{display:inline}
#fb.f-phone .f-head h1{font-size:22px}
#fb.f-phone .f-steps{margin-left:0}
#fb.f-phone #fbWork .f-pn-h{flex-wrap:wrap;row-gap:6px}
#fb.f-phone #fbWork .f-pn-h h2{flex:1 1 auto;min-width:0}
#fb.f-phone #fbWorkChip{order:5;margin-left:0}
#fb.f-phone #fbRun{order:6;margin-left:auto !important}
#fb.f-phone .f-keep .f-hint{display:none}
#fb.f-phone .f-views .f-seg button{padding:5px 9px}
#fb.f-mid .f-panels{grid-template-columns:250px minmax(0,1.2fr) minmax(270px,1fr)}
/* ---------- 6.0 · the ship cards are keys: pressed, a card is chosen for "Make the chosen"; its own key makes it alone ---------- */
#fb .f-tg{cursor:pointer;text-align:left;color:inherit;-webkit-user-select:none;user-select:none}
#fb .f-tg:active{transform:translateY(1px) scale(.99);box-shadow:var(--f-press);transition-duration:.06s}
#fb .f-tg[aria-pressed="true"]{border-color:var(--f-ring);box-shadow:var(--f-pophi),inset 0 0 0 1px var(--f-ring)}
#fb .f-tg .tick{margin-left:auto;width:19px;height:19px;border-radius:6px;border:1.5px solid var(--f-hair);display:grid;place-items:center;font-size:11px;font-weight:700;color:transparent;flex:0 0 auto;background:var(--f-wellbg);box-shadow:var(--f-well);transition:background .2s,color .2s,transform .35s var(--f-spring)}
#fb .f-tg[aria-pressed="true"] .tick{background:linear-gradient(var(--f-pa),var(--f-pb));border-color:var(--f-pedge);color:#fff;box-shadow:0 1px 0 var(--f-pledge);transform:scale(1.08)}
#fb .f-tg.off{opacity:.62;cursor:default}
#fb .f-tg .foot .f-hint{margin:0;font-size:11px}
#fb .f-tg:focus-visible{outline:2px solid var(--f-acc);outline-offset:2px}
#fb .f-pkg{display:flex;align-items:center;gap:8px;flex-wrap:wrap;margin-top:10px;padding:8px 10px;border-radius:10px;border:1px dashed var(--f-hair);font-size:12px;color:var(--f-ink2)}
#fb .f-pkg code{font:600 11.5px var(--f-mono);color:var(--f-ink1);background:var(--f-wellbg);padding:1px 6px;border-radius:5px}
#fb .f-pkg .f-btn{margin-left:auto}
/* the chosen app's menu */
#fb .f-menu{position:absolute;z-index:24;min-width:230px;background:var(--f-hi);border:1px solid var(--f-hair);border-radius:12px;box-shadow:var(--f-slabhi);padding:6px;animation:fbRise .2s var(--f-spring)}
#fb .f-menu button{display:flex;align-items:center;gap:9px;width:100%;text-align:left;padding:8px 10px;border-radius:8px;border:0;background:transparent;cursor:pointer;font-size:13px;font-weight:600;color:var(--f-ink1);transition:background .15s,transform .16s var(--f-spring)}
#fb .f-menu button:hover{background:var(--f-accs);color:var(--f-acc);transform:translateX(2px)}
#fb .f-menu button.danger{color:var(--f-del)}
#fb .f-menu button.danger:hover{background:var(--f-delbg);color:var(--f-del)}
#fb .f-menu hr{border:0;border-top:1px solid var(--f-hair2);margin:5px 4px}
#fb .f-btn.danger{background:linear-gradient(#c65050,#a83a3a);border-color:#8a2c2c;color:#fff;box-shadow:inset 0 1px 0 rgba(255,255,255,.16),0 2px 0 #6e2020,0 4px 6px rgba(80,20,20,.24);text-shadow:0 1px 1px rgba(60,10,10,.35)}
/* a sheet's fields */
#fb .f-field{display:block;margin:0 0 10px}
#fb .f-field > span{display:block;font-size:12px;font-weight:600;color:var(--f-ink2);margin-bottom:4px}
#fb .f-field input[type="text"],#fb .f-field input[type="password"],#fb .f-field select{width:100%;margin:0;border-radius:10px;border:1px solid var(--f-hair);background:var(--f-wellbg);box-shadow:var(--f-well);color:var(--f-ink1);font:13.5px/1.45 var(--f-sans);padding:8px 11px}
#fb .f-field small{display:block;font-size:11.5px;color:var(--f-ink3);margin-top:4px;line-height:1.45}
#fb .f-sheet .f-warn{padding:9px 12px;border-radius:10px;background:var(--f-warns);color:var(--f-warn);font-size:12.5px;margin:0 0 10px;line-height:1.5}
#fb .f-sheet .f-opt[aria-pressed="true"]{border-color:var(--f-ring);box-shadow:var(--f-pophi),inset 0 0 0 1px var(--f-ring)}
#fb .f-sheet .f-opt[aria-pressed="true"] .ic{background:linear-gradient(var(--f-pa),var(--f-pb));color:#fff}
/* releases: each version kept with its packages, as GitHub's Releases page shows them */
#fb .f-rels{padding:12px;display:flex;flex-direction:column;gap:10px}
#fb .f-rel{border:1px solid var(--f-hair);border-radius:12px;padding:11px 13px;background:linear-gradient(var(--f-a),var(--f-b));box-shadow:var(--f-pop);animation:fbRise .4s var(--f-spring) backwards}
#fb .f-rel b{font:600 14px/1.3 var(--f-serif);display:flex;align-items:center;gap:8px;flex-wrap:wrap}
#fb .f-rel .meta{font-size:11.5px;color:var(--f-ink3);margin:3px 0 8px;display:flex;gap:8px;flex-wrap:wrap;align-items:center}
#fb .f-asset{display:flex;align-items:center;gap:9px;padding:6px 9px;border-radius:9px;border:1px solid var(--f-hair2);background:var(--f-wellbg);margin-top:6px;font-size:12.5px}
#fb .f-asset .nm{flex:1 1 auto;min-width:0;font-family:var(--f-mono);font-size:12px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
#fb .f-asset .sz{flex:0 0 auto;color:var(--f-ink3);font-size:11.5px}
/* the file editor: a sheet wide enough to write in (as the Forge's) */
#fb .f-sheet.f-edit{width:min(1080px,96%);max-width:none;max-height:94%;display:flex;flex-direction:column}
#fb .f-edit-bar{margin:0 0 8px}
#fb .f-edit-bar select{font:600 13px var(--f-mono);padding:6px 10px;border-radius:9px;border:1px solid var(--f-hair);background:var(--f-hi);color:var(--f-ink1);max-width:100%}
#fb .f-edit-ta{flex:1 1 auto;min-height:320px;height:52vh;width:100%;resize:vertical;font:13px/1.5 var(--f-mono);color:var(--f-codeink);background:var(--f-code);border:1px solid var(--f-hair);border-radius:10px;padding:10px 12px;box-shadow:var(--f-well);tab-size:2;white-space:pre;overflow:auto}
#fb .f-edit-report{max-height:9em;overflow:auto;font:12px/1.45 var(--f-mono);white-space:pre-wrap;background:var(--f-wellbg);border:1px solid var(--f-hair2);border-radius:9px;padding:8px 10px;margin:0 0 10px;color:var(--f-ink2)}
/* the dividers between the three panels: drag to give a panel more room, a double press puts the widths back */
#fb .f-panels{position:relative}
#fb .f-split{position:absolute;top:8px;bottom:8px;width:16px;margin-left:-8px;cursor:col-resize;z-index:6;display:flex;justify-content:center;touch-action:none}
#fb .f-split::before{content:"";width:4px;height:44px;align-self:center;border-radius:4px;background:var(--f-hair);box-shadow:var(--f-well);transition:background .2s,height .3s var(--f-spring)}
#fb .f-split:hover::before,#fb .f-split.drag::before{background:var(--f-acc);height:84px}
#fb.f-one .f-split{display:none}
#fb .f-split[hidden]{display:none}
/* 6.1 · a panel folds away to a narrow strip that keeps its name, and the others take its room (the owner's words, 20 October
   2026: "I want to be able to collapse sections of the Fabrica and Lector pages so that I can hide them from view and see the
   other panels and their contents better"); a section of Test and ship folds to its heading */
#fb .f-fold{flex:0 0 auto;width:30px;height:30px;margin-left:4px;display:inline-flex;align-items:center;justify-content:center;border-radius:9px;border:1px solid var(--f-hair);background:var(--f-hi);color:var(--f-ink2);cursor:pointer;box-shadow:var(--f-key,0 1px 0 var(--f-hair));transition:transform .25s var(--f-spring),background .2s}
#fb .f-fold:hover{background:var(--f-accs);color:var(--f-acc)}
#fb .f-fold:focus-visible,#fb .f-secfold:focus-visible{outline:2px solid var(--f-ring);outline-offset:2px}
#fb .f-fold svg{width:14px;height:14px}
#fb .f-pn-h .f-fold{margin-left:auto}
#fb #fbWork .f-pn-h .f-fold{margin-left:4px}
#fb .f-pn.is-folded{cursor:pointer}
#fb .f-pn.is-folded > :not(.f-pn-h){display:none !important}
#fb .f-pn.is-folded .f-pn-h{flex:1 1 auto;flex-direction:column;align-items:center;justify-content:flex-start;gap:10px;padding:10px 0;border-bottom:0;min-height:0}
#fb .f-pn.is-folded .f-pn-h > :not(h2):not(.f-fold):not(.f-chip){display:none !important}
#fb .f-pn.is-folded .f-pn-h h2{writing-mode:vertical-rl;transform:rotate(180deg);white-space:nowrap;font-size:14px;margin:0}
#fb .f-pn.is-folded .f-pn-h .f-chip{writing-mode:vertical-rl;transform:rotate(180deg);white-space:nowrap;padding:8px 3px}
#fb .f-pn.is-folded .f-fold{margin:0;order:-1}
#fb .f-pn.is-folded .f-fold svg{transform:rotate(180deg)}
#fb.f-one .f-fold{display:none}
#fb .f-sec > h3{display:flex;align-items:center}
#fb .f-secfold{margin-left:auto;flex:0 0 auto;width:26px;height:26px;display:inline-flex;align-items:center;justify-content:center;border-radius:8px;border:1px solid transparent;background:transparent;color:var(--f-ink3);cursor:pointer;transition:transform .25s var(--f-spring),background .2s}
#fb .f-secfold:hover{background:var(--f-accs);color:var(--f-acc)}
#fb .f-secfold svg{width:13px;height:13px;transition:transform .25s var(--f-spring)}
#fb .f-sec.is-shut > :not(h3){display:none !important}
#fb .f-sec.is-shut .f-secfold svg{transform:rotate(-90deg)}
#fb .f-sec.is-shut > h3{margin-bottom:0}
body.fb-drag,body.fb-drag *{cursor:col-resize !important;-webkit-user-select:none !important;user-select:none !important}
/* reduced motion: no animation and no gliding, but a key still answers a press at once (6.0: nothing was left to answer) */
@media (prefers-reduced-motion:reduce){#fb *,#fb *::before,#fb *::after{animation:none !important;transition-duration:.01ms !important}}
</style>
<script>try{(window.__ingParts=window.__ingParts||{})["p44"]="started";}catch(_){}
/* R112 · FABRICA: the page on the repository engine (R110) and the ship engine (R111). See the note at the top of its
   styles for her words. Nothing here needs a connection; GitHub is a copy she may send, never a dependency. */
(function r112Fabrica(){
if(typeof IngRepo==="undefined"||typeof IngShip==="undefined"||typeof go!=="function")return;
"use strict";
function $(id){return document.getElementById(id);}
function h(tag,cls,html){var e=document.createElement(tag);if(cls)e.className=cls;if(html!=null)e.innerHTML=html;return e;}
function esc(s){return String(s==null?"":s).replace(/[&<>"]/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c];});}
function btn(cls,label,on){var b=h("button","f-btn"+(cls?" "+cls:""));b.type="button";b.textContent=label;if(on)b.onclick=on;return b;}
function night(){return document.body.getAttribute("data-theme")==="night";}
function kb(n){n=n||0;if(n<1024)return n+" B";if(n<1048576)return Math.round(n/1024)+" KB";return (n/1048576).toFixed(n<10485760?1:0)+" MB";}
function when(t){if(!t)return "";var d=new Date(t),now=new Date(),same=d.toDateString()===now.toDateString();var y=new Date(now);y.setDate(y.getDate()-1);
  var hm=d.toLocaleTimeString("en-GB",{hour:"2-digit",minute:"2-digit"});if(same)return "Today, "+hm;if(d.toDateString()===y.toDateString())return "Yesterday, "+hm;
  return d.toLocaleDateString("en-GB",{day:"numeric",month:"short"})+(d.getFullYear()!==now.getFullYear()?" "+d.getFullYear():"")+", "+hm;}
var APPS={cd:{name:"Carpe Diem",color:"#1B6B93"},forge:{name:"The Forge",color:"#17577A"},ingenium:{name:"Ingenium",color:"#6A3FB5"},inkwell:{name:"Inkwell",color:"#1F4F68"}};
var DELAY={cd:0,forge:1.7,ingenium:3.4,inkwell:5.1};
function appOf(r){return r&&r.app&&APPS[r.app]?r.app:null;}
function colorOf(r){var k=appOf(r);return k?APPS[k].color:"#b88a3a";}

/* the seals: each app's own layers (as Lector shows them), else a flat seal, else the mark of a new app */
function flatSrc(k){try{var s=window.ING_SEALS&&ING_SEALS[k];return s?"data:image/png;base64,"+s.b64:"";}catch(e){return "";}}
function sealEl(k,size){var root=h("span","f-ls");root.setAttribute("aria-hidden","true");if(size)root.style.setProperty("--S",size+"px");
  var L=window.LX7_LAYERS||{},key=night()&&L[k+"N"]?k+"N":k,ls=k?L[key]:null;
  if(!ls){if(k&&flatSrc(k)){root.className="f-ls flat";var im=new Image();im.src=flatSrc(k);im.alt="";root.appendChild(im);return root;}
    root.className="f-ls new";root.appendChild(h("span",null,"✦"));return root;}
  var tilt=h("span","f-ls-tilt"),idle=h("span","f-ls-idle");idle.style.animationDelay=(-(DELAY[k]||0))+"s";idle.appendChild(h("i","f-ls-cast"));
  ls.forEach(function(L1){var im=new Image();im.src=L1.src;im.alt="";im.className="f-ls-l"+(L1.side?" side":"");im.style.setProperty("--z",String(L1.z));idle.appendChild(im);});
  tilt.appendChild(idle);root.appendChild(tilt);return root;}

/* ---------- what is kept of the page's own state ---------- */
function FBS(){if(!state.fabrica||typeof state.fabrica!=="object")state.fabrica={};var f=state.fabrica;if(!f.links)f.links={};if(!f.drafts)f.drafts={};return f;}
function saveSoon(){try{saveState();}catch(e){}}
var S={view:"changes",file:0,panel:"apps",dir:"",cmp:null,testing:null,making:null,busy:false,open:{}};
var C={repos:[],status:{},notes:{},diff:{},files:{},log:{},tags:{},lastErr:{}};
function sel(){var id=FBS().sel;return C.repos.filter(function(r){return r.id===id;})[0]||null;}
function cur(){return sel();}

/* ---------- reading the repositories ---------- */
function refresh(){return IngRepo.list().then(function(rs){C.repos=rs;if(!sel()&&rs.length){FBS().sel=rs[0].id;}
  return Promise.all(rs.map(function(r){return Promise.all([
    IngRepo.status(r.id).then(function(s){C.status[r.id]=s;},function(e){C.status[r.id]={changes:[],clean:true,err:e.message};}),
    r.head?IngRepo.notes(r.id,r.head).then(function(n){C.notes[r.id]=n||{};},function(){C.notes[r.id]={};}):Promise.resolve(C.notes[r.id]={}),
    /* which version each release names, for the tiles */
    Promise.all((r.tags||[]).map(function(t){return IngRepo.resolve(r.id,t).then(function(o){return [o,t];},function(){return null;});})).then(function(ps){var m={};ps.forEach(function(p){if(p&&p[0])m[p[0]]=p[1];});C.tags[r.id]=m;})]);}));}).then(function(){return C.repos;});}
function statusOf(r){return C.status[r.id]||{changes:[],clean:true};}
function notesOf(r){return C.notes[r.id]||{};}
/* 6.0: a test passes only when it found and read the page (a version whose files could not be read showed "Passed"
   beside "there is no page in this version") */
function tested(r){var n=notesOf(r).test;return !!(n&&n.ok&&(n.checks||[]).some(function(c){return c.id==="reads"&&c.state==="ok";}));}
function testedState(r){var n=notesOf(r).test;return n?(n.ok?"ok":"fail"):"none";}
function shipped(r){var n=notesOf(r);return !!(n.onePage||n.webApp||n.kits||n.apk||n.ipa);}
function stepOf(r){if(!r.head)return "change";if(!statusOf(r).clean)return "keep";if(!tested(r))return "test";if(!shipped(r))return "ship";return "done";}
function headTag(r){var t=(r.tags||[]);if(!t.length||!r.head)return "";var hit=C.tags[r.id]||{};return hit[r.head]||"";}
function tileLine(r){if(!r.head)return "Started · nothing kept yet";var s=stepOf(r),n=statusOf(r).changes.length;if(s==="keep")return n+" to keep";if(s==="test")return testedState(r)==="fail"?"Kept · its test found faults":"Kept · to test";if(s==="ship")return "Tested · ready to ship";return "Shipped";}
function verOf(r){return headTag(r);}

/* ---------- the frame ---------- */
function build(){var host=$("fbHost");if(!host)return null;if($("fb")&&$("fb").parentNode===host)return $("fb");
  host.innerHTML='<div id="fb">'+
   '<div class="f-head"><div><h1>Fabrica</h1><p>Your own GitHub, on this device: each of your apps kept with every version, changed, tested and shipped from here. GitHub is there only when you want it.</p></div>'+
   '<ol class="f-steps" id="fbSteps" aria-label="Where this app is"><li data-s="change"><i>1</i><span>Change</span></li><li class="sep" aria-hidden="true"></li><li data-s="keep"><i>2</i><span>Keep</span></li><li class="sep" aria-hidden="true"></li><li data-s="test"><i>3</i><span>Test</span></li><li class="sep" aria-hidden="true"></li><li data-s="ship"><i>4</i><span>Ship</span></li></ol></div>'+
   '<div class="f-seg f-tabs" id="fbTabs" role="tablist" aria-label="Fabrica\'s panels"><span class="f-thumb"></span><button type="button" role="tab" data-p="apps">Your apps</button><button type="button" role="tab" data-p="work" aria-selected="true">The work</button><button type="button" role="tab" data-p="ship">Test and ship</button></div>'+
   '<div class="f-panels" id="fbPanels">'+
    '<section class="f-pn" id="fbApps" aria-label="Your apps"><div class="f-pn-h"><h2>Your apps</h2><span class="f-chip" id="fbAppsChip"></span><button class="f-fold" type="button" data-f="apps" aria-expanded="true" title="Fold Your apps away; press again to open it"><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M10 3.5L5.5 8l4.5 4.5"/></svg></button></div>'+
     '<div class="f-pn-b"><div class="f-repos" id="fbRepos"></div><div class="f-sec" style="border-top:1px solid var(--f-hair2)"><p class="f-hint" style="margin:0">Each app is a real git repository. Any git, and GitHub, opens what is kept here, and nothing it holds leaves this device unless you send it.</p></div></div>'+
     '<div class="f-pn-f"><button class="f-btn" id="fbNew" type="button">＋ New app</button><button class="f-btn" id="fbBring" type="button">Bring one in</button></div></section>'+
    '<section class="f-pn show" id="fbWork" aria-label="The work"><div class="f-pn-h"><span class="f-ls" id="fbWhSeal"></span><h2 id="fbWhName"></h2>'+
     '<button class="f-branch" id="fbBranch" type="button" title="Your ideas: each one is a branch"><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><circle cx="4" cy="3.5" r="1.8"/><circle cx="4" cy="12.5" r="1.8"/><circle cx="12" cy="6" r="1.8"/><path d="M4 5.3v5.4M12 7.8c0 2.4-3 2.6-6.6 3.6"/></svg><span id="fbBranchName">main</span></button>'+
     '<span class="f-chip" id="fbWorkChip"></span><button class="f-btn sm" id="fbRun" type="button" style="margin-left:6px">Run ▸</button><button class="f-btn sm" id="fbMore" type="button" title="Rename, edit a file, package details, remove" aria-haspopup="menu">⋯</button><button class="f-fold" type="button" data-f="work" aria-expanded="true" title="Fold The work away; press again to open it"><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M10 3.5L5.5 8l4.5 4.5"/></svg></button></div>'+
     '<div class="f-views"><div class="f-seg" id="fbViews" role="tablist" aria-label="The work on this app"><span class="f-thumb"></span><button type="button" role="tab" data-v="changes" aria-selected="true">Changes<span class="n" id="fbNChanges"></span></button><button type="button" role="tab" data-v="files">Files</button><button type="button" role="tab" data-v="history">History</button><button type="button" role="tab" data-v="releases">Releases</button><button type="button" role="tab" data-v="ideas">Ideas</button></div></div>'+
     '<div class="f-work" id="fbWorkBody"></div><div class="f-pn-f" id="fbWorkFoot"></div></section>'+
    '<section class="f-pn" id="fbShip" aria-label="Test and ship"><div class="f-pn-h"><h2>Test and ship</h2><span class="f-chip" id="fbShipChip"></span><button class="f-fold" type="button" data-f="ship" aria-expanded="true" title="Fold Test and ship away; press again to open it"><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M10 3.5L5.5 8l4.5 4.5"/></svg></button></div>'+
     '<div class="f-pn-b"><div class="f-sec"><h3>Test this version <span class="f-chip" id="fbTestChip">Not tested yet</span></h3><div class="f-checks" id="fbChecks"></div><div class="f-row" style="margin-top:11px"><button class="f-btn" id="fbTest" type="button">Test this version</button></div></div>'+
     '<div class="f-sec"><h3>Ship to your devices <span class="f-chip" id="fbShipState">Ready to make</span></h3><div class="f-targets" id="fbTargets"></div><div class="f-pkg" id="fbPkg"></div><p class="f-hint">Press a card to choose it; its own key makes it alone. Everything is made here from the version you kept, with no compiler and no connection, and kept under Releases.</p></div>'+
     '<div class="f-sec"><h3>Copies, and GitHub</h3><div class="f-copies" id="fbCopies"></div></div></div>'+
     '<div class="f-pn-f"><button class="f-btn pri" id="fbMakeAll" type="button" style="flex:1 1 auto">Make the chosen</button></div></section>'+
   '</div></div>';
  wire();return $("fb");}

function wire(){
  $("fbNew").onclick=function(){sheetNew();};
  $("fbBring").onclick=function(){sheetBring();};
  $("fbRun").onclick=function(){run();};
  $("fbBranch").onclick=function(){S.view="ideas";paintWork();thumbs();};
  $("fbTest").onclick=function(){testNow();};
  $("fbMakeAll").onclick=function(){makeChosen();};
  $("fbMore").onclick=function(e){e.stopPropagation();menuMore($("fbMore"));};
  wireFolds();
  [].forEach.call($("fbViews").querySelectorAll("button"),function(b){b.onclick=function(){S.view=b.getAttribute("data-v");S.cmp=null;S.file=0;paintWork();thumbs();};});
  [].forEach.call($("fbTabs").querySelectorAll("button"),function(b){b.onclick=function(){setPanel(b.getAttribute("data-p"));};});
  var root=$("fb");
  function clamp(v,a,b){return Math.max(a,Math.min(b,v));}
  root.addEventListener("pointermove",function(e){var t=e.target&&e.target.closest?e.target.closest(".f-repo,.f-pn-h"):null,ls=t&&t.querySelector(".f-ls:not(.new):not(.flat)");
    [].forEach.call(root.querySelectorAll(".f-ls.hov"),function(x){if(x!==ls){x.classList.remove("hov","down");x.style.removeProperty("--rx");x.style.removeProperty("--ry");}});
    if(!ls||e.pointerType==="touch")return;var r=ls.getBoundingClientRect(),px=(e.clientX-r.left)/r.width-.5,py=(e.clientY-r.top)/r.height-.5;ls.classList.add("hov");
    ls.style.setProperty("--ry",(clamp(px,-.8,.8)*30).toFixed(1)+"deg");ls.style.setProperty("--rx",(-clamp(py,-.8,.8)*24).toFixed(1)+"deg");},{passive:true});
  root.addEventListener("pointerleave",function(){[].forEach.call(root.querySelectorAll(".f-ls.hov"),function(x){x.classList.remove("hov","down");x.style.removeProperty("--rx");x.style.removeProperty("--ry");});});
  root.addEventListener("pointerdown",function(e){var t=e.target&&e.target.closest?e.target.closest(".f-repo"):null,ls=t&&t.querySelector(".f-ls");if(ls)ls.classList.add("down");},{passive:true});
  root.addEventListener("pointerup",function(){[].forEach.call(root.querySelectorAll(".f-ls.down"),function(x){x.classList.remove("down");});},{passive:true});}

/* ---------- layout: the height of the window, one panel at a time on a narrow frame ---------- */
function one(){var r=$("fb");return !!(r&&r.classList.contains("f-one"));}
function setPanel(p){S.panel=p;var tabs=$("fbTabs");if(tabs)[].forEach.call(tabs.querySelectorAll("button"),function(b){b.setAttribute("aria-selected",b.getAttribute("data-p")===p?"true":"false");});
  [["apps","fbApps"],["work","fbWork"],["ship","fbShip"]].forEach(function(x){var e=$(x[1]);if(e)e.classList.toggle("show",x[0]===p);});thumbs();}
function fit(){var root=$("fb");if(!root||!root.offsetParent)return;var r=root.getBoundingClientRect(),se=document.scrollingElement||document.documentElement,top=r.top+(se?se.scrollTop:0);
  setTimeout(splits,0);
  var hgt=Math.max(420,Math.floor(window.innerHeight-top-12));root.style.setProperty("--f-h",hgt+"px");
  var w=r.width,isOne=w<900,isPhone=w<540,isMid=!isOne&&w<1180;
  if(root.classList.contains("f-one")!==isOne){root.classList.toggle("f-one",isOne);if(isOne)setPanel(S.panel||"apps");}
  root.classList.toggle("f-phone",isPhone);root.classList.toggle("f-mid",isMid);paintFolds();thumbs();}
var fitT=0;function layoutSoon(){clearTimeout(fitT);fitT=setTimeout(fit,30);}
/* 6.0 · the dividers: the owner's words (20 October 2026): "I want to be able to resize the panels ... for the Lector and
   Fabrica pages as well. I just want the option to resize every section to my liking inside of the app." The widths of
   Your apps and of Test and ship are kept (state.fabrica.cols); the work takes the rest. */
function colsNow(){var c=FBS().cols;return c&&c.a>0&&c.c>0?c:null;}
function folds(){var f=FBS().fold;return f&&typeof f==="object"?f:{};}
function applyCols(){var p=$("fbPanels"),c=colsNow(),F=folds();if(!p)return;paintFolds();
  if(one()||(!c&&!F.apps&&!F.work&&!F.ship)){p.style.gridTemplateColumns="";return;}
  var w=p.getBoundingClientRect().width,mid=$("fb").classList.contains("f-mid"),a=c?Math.max(200,Math.min(c.a,w-560)):(mid?250:290),z=c?Math.max(260,Math.min(c.c,w-a-320)):0;
  p.style.gridTemplateColumns=[F.apps?"44px":(F.work&&F.ship?"minmax(0,1fr)":a+"px"),F.work?"44px":"minmax(0,1.25fr)",F.ship?"44px":(F.work?"minmax(0,1fr)":(z?z+"px":"minmax("+(mid?270:300)+"px,1fr)"))].join(" ");}
/* 6.1 · folding a panel away: its strip keeps its name, and a press anywhere on it opens it again */
var FOLDS=[["apps","fbApps","Your apps"],["work","fbWork","The work"],["ship","fbShip","Test and ship"]];
function paintFolds(){var F=folds();FOLDS.forEach(function(x){var pn=$(x[1]);if(!pn)return;var on=!!F[x[0]]&&!one();pn.classList.toggle("is-folded",on);
    var k=pn.querySelector(".f-fold");if(k){k.setAttribute("aria-expanded",on?"false":"true");k.title=on?"Open "+x[2]+" again":"Fold "+x[2]+" away; press again to open it";k.setAttribute("aria-label",k.title);}});}
function foldPanel(k,on){var F=FBS().fold=folds();if(on==null)on=!F[k];
  if(on&&FOLDS.filter(function(x){return x[0]!==k&&!F[x[0]];}).length===0){toast("One panel stays open: open another before folding this one.");return;}
  if(on)F[k]=true;else delete F[k];saveSoon();applyCols();splits();thumbs();
  var x=FOLDS.filter(function(y){return y[0]===k;})[0];toast(x[2]+(on?" is folded away. Press its strip to open it again.":" is open again."));}
function wireFolds(){FOLDS.forEach(function(x){var pn=$(x[1]);if(!pn)return;var k=pn.querySelector(".f-fold");
    if(k)k.onclick=function(e){e.stopPropagation();foldPanel(x[0]);};
    pn.addEventListener("click",function(e){if(pn.classList.contains("is-folded")&&!e.target.closest(".f-fold")){e.preventDefault();e.stopPropagation();foldPanel(x[0],false);}},true);});
  /* the sections of Test and ship fold to their headings */
  var shut=FBS().secs=FBS().secs&&typeof FBS().secs==="object"?FBS().secs:{};
  [].forEach.call($("fbShip").querySelectorAll(".f-pn-b > .f-sec"),function(sec,i){var key=["test","ship","copies"][i]||("s"+i),hd=sec.querySelector("h3");if(!hd||hd.querySelector(".f-secfold"))return;
    var b=h("button","f-secfold");b.type="button";b.innerHTML='<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 6l4 4 4-4"/></svg>';
    function show(){var on=!!shut[key];sec.classList.toggle("is-shut",on);b.setAttribute("aria-expanded",on?"false":"true");var nm=hd.firstChild&&hd.firstChild.nodeType===3?hd.firstChild.nodeValue.trim():"this section";b.title=(on?"Open ":"Fold ")+nm;b.setAttribute("aria-label",b.title);}
    b.onclick=function(e){e.stopPropagation();if(shut[key])delete shut[key];else shut[key]=true;saveSoon();show();};hd.appendChild(b);show();});}
function splits(){var p=$("fbPanels");if(!p)return;applyCols();var pn=[$("fbApps"),$("fbWork"),$("fbShip")],sp=p.querySelectorAll(".f-split");
  if(sp.length!==2){[].forEach.call(sp,function(x){x.remove();});sp=[0,1].map(function(i){var d=h("div","f-split");d.setAttribute("role","separator");d.setAttribute("aria-orientation","vertical");
      d.setAttribute("aria-label",i?"Give The work or Test and ship more room":"Give Your apps or The work more room");d.tabIndex=0;d.title="Drag to resize; double press to put the widths back";wireSplit(d,i);p.appendChild(d);return d;});}
  if(one())return;var pr=p.getBoundingClientRect(),F=folds();sp[0].hidden=!!(F.apps||F.work);sp[1].hidden=!!(F.work||F.ship);
  [0,1].forEach(function(i){var a=pn[i].getBoundingClientRect(),b=pn[i+1].getBoundingClientRect();sp[i].style.left=Math.round((a.right+b.left)/2-pr.left)+"px";});}
function wireSplit(d,i){d.addEventListener("pointerdown",function(e){if(e.button!==0)return;e.preventDefault();var p=$("fbPanels"),pr=p.getBoundingClientRect(),a=$("fbApps").getBoundingClientRect().width,z=$("fbShip").getBoundingClientRect().width,x0=e.clientX;
    d.classList.add("drag");document.body.classList.add("fb-drag");try{d.setPointerCapture(e.pointerId);}catch(_){}
    function mv(ev){var dx=ev.clientX-x0,c=FBS().cols={a:i===0?a+dx:a,c:i===1?z-dx:z};applyCols();splits();}
    function up(){d.classList.remove("drag");document.body.classList.remove("fb-drag");d.removeEventListener("pointermove",mv);d.removeEventListener("pointerup",up);d.removeEventListener("pointercancel",up);saveSoon();thumbs();}
    d.addEventListener("pointermove",mv);d.addEventListener("pointerup",up);d.addEventListener("pointercancel",up);});
  d.addEventListener("dblclick",function(){delete FBS().cols;saveSoon();applyCols();splits();thumbs();toast("The panels have their first widths again.");});
  d.addEventListener("keydown",function(e){if(e.key!=="ArrowLeft"&&e.key!=="ArrowRight")return;e.preventDefault();var a=$("fbApps").getBoundingClientRect().width,z=$("fbShip").getBoundingClientRect().width,dx=e.key==="ArrowLeft"?-24:24;
    FBS().cols={a:i===0?a+dx:a,c:i===1?z-dx:z};saveSoon();applyCols();splits();});}
function thumbs(){var root=$("fb");if(!root)return;[].forEach.call(root.querySelectorAll(".f-seg"),function(sg){var th=sg.querySelector(".f-thumb");if(!th){th=h("span","f-thumb");sg.insertBefore(th,sg.firstChild);}
  var on=sg.querySelector('button[aria-pressed="true"],button[aria-selected="true"]');if(!on||!on.offsetWidth){th.style.width="0";return;}th.style.width=on.offsetWidth+"px";th.style.transform="translateX("+(on.offsetLeft-3)+"px)";});}
var tt=null;function toast(m){var root=$("fb");if(!root)return;var old=root.querySelector(".f-toast");if(old)old.remove();var t=h("div","f-toast",esc(m));root.appendChild(t);clearTimeout(tt);tt=setTimeout(function(){t.remove();},4200);}
function fail(e){var m=e&&e.message?e.message:String(e);toast(m.charAt(0).toUpperCase()+m.slice(1));try{console.warn("Fabrica",e);}catch(_){}}

/* ---------- painting ---------- */
function paint(){if(!$("fb"))return;paintRepos();paintWork();paintShip();paintSteps();thumbs();}
function paintSteps(){var r=cur(),s=r?stepOf(r):"change",order=["change","keep","test","ship"],i=order.indexOf(s);if(s==="done")i=4;
  [].forEach.call($("fbSteps").querySelectorAll("li[data-s]"),function(li){var j=order.indexOf(li.getAttribute("data-s"));li.className=j<i?"done":j===i?"now":"";});}
function paintRepos(){var box=$("fbRepos");box.innerHTML="";var rs=C.repos;$("fbAppsChip").textContent=rs.length?rs.length+" kept here":"None yet";
  if(!rs.length){box.appendChild(h("div","f-empty","<b>No app here yet</b>Bring one in: from your app library, a zip, a git bundle or a folder with its history. Or start a new one."));box.style.display="block";return;}
  box.style.display="";var id=FBS().sel;
  rs.forEach(function(r){var b=h("button","f-repo");b.type="button";b.style.setProperty("--app",colorOf(r));b.setAttribute("aria-pressed",r.id===id?"true":"false");
    var s=stepOf(r),st='<i class="st'+(s==="keep"?" changed":s==="change"?" new":s==="test"||s==="ship"?" tested":"")+'" title="'+(s==="done"?"Shipped":s==="keep"?"Changes not kept yet":s==="test"?"Kept, not tested":s==="ship"?"Tested":"New")+'"></i>';
    b.appendChild(sealEl(appOf(r),56));var v=verOf(r);
    b.insertAdjacentHTML("beforeend",'<span class="nm">'+esc(r.name)+(v?" <em>"+esc(v)+"</em>":"")+'</span><span class="stl">'+st+"<span>"+esc(tileLine(r))+"</span></span>");
    b.onclick=function(){FBS().sel=r.id;saveSoon();S.view=statusOf(r).clean&&r.head?"history":"changes";S.file=0;S.cmp=null;S.dir="";S.panel="work";if(one())setPanel("work");paint();syncFromCode(r);};box.appendChild(b);});}
function views(){var r=cur(),n=r?statusOf(r).changes.length:0;[].forEach.call($("fbViews").querySelectorAll("button"),function(b){b.setAttribute("aria-selected",b.getAttribute("data-v")===S.view?"true":"false");});
  $("fbNChanges").textContent=n||"";$("fbNChanges").hidden=!n;}
function paintWork(){var r=cur(),w=$("fbWorkBody"),f=$("fbWorkFoot");w.innerHTML="";f.innerHTML="";
  var ws=$("fbWhSeal"),nw=sealEl(r?appOf(r):null,34);nw.id="fbWhSeal";ws.replaceWith(nw);
  $("fbWhName").textContent=r?r.name:"No app chosen";$("fbBranchName").textContent=r?(r.detached?"an older version":(r.branch||"main")):"";$("fbBranch").hidden=!r;$("fbRun").hidden=!r;
  var chip=$("fbWorkChip");if(!r){chip.className="f-chip";chip.textContent="";views();w.appendChild(h("div","f-empty","<b>Choose an app on the left</b>Or bring one in, and its work shows here."));return;}
  var s=stepOf(r),n=statusOf(r).changes.length;chip.className="f-chip"+(s==="keep"?" warn":s==="done"?" ok":"");
  chip.innerHTML='<span class="d"></span>'+(!r.head?"New":s==="keep"?n+" not kept":s==="test"?"Kept":s==="ship"?"Tested":"Shipped");
  views();
  if(r.merging){var mn=h("div","f-note","Bringing in “"+esc(r.merging.theirs)+"”: both versions are in "+r.merging.conflicts.length+" file"+(r.merging.conflicts.length===1?"":"s")+". Open them in Code, keep one of each, then keep this version.");
    mn.appendChild(btn("quiet sm","Stop the merge",function(){IngRepo.stopMerge(r.id).then(function(){toast("The merge is stopped; your files are as they were.");return refresh();}).then(paint,fail);}));w.appendChild(mn);}
  if(r.detached){var dn=h("div","f-note","You are looking at an older version. Nothing is changed until you keep something here.");
    dn.appendChild(btn("quiet sm","Back to "+(r.branches[0]||"main"),function(){IngRepo.switchTo(r.id,r.branches.indexOf("main")>=0?"main":r.branches[0]).then(refresh).then(paint,fail);}));w.appendChild(dn);}
  if(S.view==="changes")return paintChanges(r,w,f);
  if(S.view==="files")return paintFiles(r,w,f);
  if(S.view==="history")return paintHistory(r,w,f);
  if(S.view==="ideas")return paintIdeas(r,w,f);
  if(S.view==="releases")return paintReleases(r,w,f);
  /* 6.1 · the views of GitHub's own (R140): code at any version, issues, pull requests, compare, actions, projects, wiki, insights, settings */
  if(window.fbHub&&fbHub.views&&fbHub.views[S.view])return fbHub.views[S.view](r,w,f);}

/* the changes: what differs from the last version, file by file, line by line */
function paintChanges(r,w,f){
  if(S.cmp){var cmp=S.cmp,bn=h("div","f-note","The changes of “"+esc(cmp.title)+"”");bn.appendChild(btn("quiet sm","Back to the changes now",function(){S.cmp=null;S.file=0;paintWork();}));w.appendChild(bn);
    return diffList(r,{from:cmp.from||"empty",to:cmp.to},w,null);}
  if(!r.head&&!statusOf(r).changes.length){w.appendChild(h("div","f-empty","<b>A new app, ready for its first page</b>Describe it in Chat or open it in Code: every change the model makes, and every save of yours, lands here as a change to keep. Or bring in a page you already have."));
    f.appendChild(btn("pri","Open it in Code",function(){openInCode(r);}));f.appendChild(btn("","Write its first page",function(){openEditor(r,"index.html");}));f.appendChild(btn("","Bring a page in",function(){sheetBring(r);}));return;}
  if(statusOf(r).clean){w.appendChild(h("div","f-empty","<b>Nothing changed since the last version</b>Every change you or the model make in Chat or Code appears here first, file by file, with exactly what changed. You keep it as a version when it is right."));
    f.appendChild(btn("","Open it in Code",function(){openInCode(r);}));f.appendChild(btn("","Edit a file",function(){openEditor(r);}));return;}
  diffList(r,{from:r.head?"HEAD":"empty",to:"work"},w,f);}
function diffList(r,q,w,f){var key=r.id+"|"+q.from+"|"+q.to,have=C.diff[key];
  if(!have){w.appendChild(h("div","f-empty","Reading the changes…"));IngRepo.diff(r.id,{from:q.from,to:q.to,context:3}).then(function(d){C.diff[key]=d;if(cur()&&cur().id===r.id)paintWork();},fail);return;}
  var list=h("div","f-files");have.forEach(function(c,i){var row=h("button","f-frow");row.type="button";row.setAttribute("aria-pressed",i===S.file?"true":"false");
    row.innerHTML='<span class="p">'+esc(c.path)+(c.from?' <small style="color:var(--f-ink3)">from '+esc(c.from)+"</small>":"")+'</span><span class="k '+esc(c.kind)+'">'+esc(c.kind)+'</span>'+(c.binary?'<span class="c" style="color:var(--f-ink3)">'+kb(c.newSize)+'</span>':'<span class="c"><span class="a">+'+c.adds+'</span> <span class="r">−'+c.dels+'</span></span>');
    row.onclick=function(){S.file=i;paintWork();};list.appendChild(row);});
  w.appendChild(list);if(!have.length){w.appendChild(h("div","f-empty","Nothing differs."));return;}
  var c=have[S.file]||have[0],dv=h("div","f-diff");
  dv.innerHTML='<div class="f-diff-h"><b>'+esc(c.path)+'</b><span>'+(c.binary?"a binary file, "+kb(c.oldSize)+" → "+kb(c.newSize):c.kind==="mode"?"its mode changed":"what changed")+"</span></div>";
  if(f&&q.to==="work"){var pb=btn("quiet sm","Put it back",function(){IngRepo.discard(r.id,[c.path]).then(function(){toast("Put back as it was in the last version. Nothing else changed.");delete C.diff[r.id+"|"+q.from+"|work"];S.file=0;return refresh();}).then(paint,fail);});dv.querySelector(".f-diff-h").appendChild(pb);}
  var pre=h("pre","f-dcode");
  if(c.binary||!c.hunks.length){pre.appendChild(h("div","f-dl hunk",c.binary?"Binary files are kept whole; there are no lines to show.":"No lines differ."));}
  c.hunks.forEach(function(hk){pre.appendChild(h("div","f-dl hunk","lines "+(hk.b0+1).toLocaleString("en-GB")+" to "+(hk.b0+hk.bN).toLocaleString("en-GB")+(hk.a0!==hk.b0?" (were "+(hk.a0+1).toLocaleString("en-GB")+" to "+(hk.a0+hk.aN).toLocaleString("en-GB")+")":"")));
    var la=hk.a0,lb=hk.b0;hk.lines.forEach(function(l){var d=h("div","f-dl"+(l[0]==="+"?" add":l[0]==="-"?" del":""));var num=l[0]==="-"?(++la):(++lb);if(l[0]===" ")la++;
      d.innerHTML="<i>"+num.toLocaleString("en-GB")+"</i><s>"+(l[0]===" "?"":l[0]==="+"?"+":"−")+"</s>"+esc(l[1]);pre.appendChild(d);});});
  dv.appendChild(pre);w.appendChild(dv);
  if(!f||q.to!=="work")return;
  var k=h("div","f-keep"),draft=FBS().drafts[r.id]||"";
  k.innerHTML='<textarea id="fbMsg" placeholder="What changed? One line, then any detail.">'+esc(draft)+'</textarea><div class="f-row"><button class="f-btn quiet sm" type="button" id="fbWrite">Write it for me</button><span class="f-hint" style="margin:0">Kept as a version: you can always go back to it.</span><button class="f-btn pri next" type="button" id="fbKeep">Keep this version</button></div>';
  f.appendChild(k);
  $("fbWrite").onclick=function(){var m=draftMessage(have);$("fbMsg").value=m;FBS().drafts[r.id]=m;saveSoon();};
  $("fbMsg").oninput=function(){FBS().drafts[r.id]=this.value;saveSoon();};
  $("fbKeep").onclick=function(){var m=($("fbMsg").value||"").trim();if(!m){$("fbMsg").focus();toast("A few words first: what changed?");return;}
    $("fbKeep").disabled=true;IngRepo.commit(r.id,m).then(function(){delete FBS().drafts[r.id];saveSoon();C.diff={};C.log={};S.view="history";toast("Kept: "+m.split("\n")[0]+". Next: test it.");if(one())setPanel("ship");return refresh();}).then(paint,function(e){$("fbKeep").disabled=false;fail(e);});};}
function draftMessage(d){if(!d.length)return "";var names=d.map(function(c){return c.path.split("/").pop();}),kinds={};d.forEach(function(c){kinds[c.kind]=(kinds[c.kind]||0)+1;});
  var head=d.length===1?(d[0].kind==="added"?"A new file, "+names[0]:d[0].kind==="removed"?names[0]+" taken away":"Changes to "+names[0]):"Changes to "+names[0]+" and "+(d.length-1)+" other file"+(d.length>2?"s":"");
  var body=d.map(function(c){return "- "+c.path+": "+(c.kind==="added"?"new":c.kind==="removed"?"removed":c.kind==="moved"?"moved from "+c.from:c.binary?"changed (binary)":"+"+c.adds+" −"+c.dels+" lines");}).join("\n");
  return head+"\n\n"+body;}

/* the files, folder by folder */
function paintFiles(r,w,f){var key=r.id+"|work",have=C.files[key];
  if(!have){w.appendChild(h("div","f-empty","Reading the files…"));IngRepo.files(r.id).then(function(l){C.files[key]=l;if(cur()&&cur().id===r.id)paintWork();},fail);return;}
  if(!have.length){w.appendChild(h("div","f-empty","<b>No files yet</b>The first page you make or bring in appears here."));f.appendChild(btn("","Bring a page in",function(){sheetBring(r);}));return;}
  var dir=S.dir||"",tr=h("div","f-tree"),rows={},order=[];
  have.forEach(function(x){if(x.path.indexOf(dir)!==0)return;var rest=x.path.slice(dir.length),i=rest.indexOf("/");
    if(i<0){rows[rest]={path:x.path,size:x.size,dir:false};order.push(rest);}else{var dn=rest.slice(0,i+1);if(!rows[dn]){rows[dn]={path:dir+dn,dir:true,n:0,size:0};order.push(dn);}rows[dn].n++;rows[dn].size+=x.size||0;}});
  order.sort(function(a,b){var da=rows[a].dir,db=rows[b].dir;if(da!==db)return da?-1:1;return a.localeCompare(b);});
  if(dir){var up=h("button","f-node");up.type="button";up.innerHTML='<span class="ic">↑</span><span class="nm">'+esc(dir)+'</span><span class="sz">up</span>';up.onclick=function(){S.dir=dir.replace(/[^/]+\/$/,"");S.fsel=null;paintWork();};tr.appendChild(up);}
  order.forEach(function(nm){var x=rows[nm],n=h("button","f-node");n.type="button";n.setAttribute("aria-pressed",S.fsel===x.path?"true":"false");
    n.innerHTML='<span class="ic">'+(x.dir?"▸":"·")+'</span><span class="nm">'+esc(nm)+'</span><span class="sz">'+(x.dir?x.n+" file"+(x.n===1?"":"s")+" · "+kb(x.size):kb(x.size))+"</span>";
    n.onclick=function(){if(x.dir){S.dir=x.path;S.fsel=null;}else S.fsel=x.path;paintWork();};tr.appendChild(n);});
  w.appendChild(tr);
  var selp=S.fsel&&have.filter(function(x){return x.path===S.fsel;})[0];
  w.appendChild(h("div","f-sec","<p class='f-hint' style='margin:0'>"+(selp?"<b style='color:var(--f-ink1);font-family:var(--f-mono)'>"+esc(selp.path)+"</b> · "+kb(selp.size)+". ":"")+"Every file is kept, pictures, keys and other binary files too, at its own path, as in the app itself.</p>"));
  f.appendChild(btn("","Open it in Code",function(){openInCode(r,selp?selp.path:null);}));
  f.appendChild(btn("",selp?"Edit this file":"Edit a file",function(){openEditor(r,selp?selp.path:null);}));
  if(selp)f.appendChild(btn("quiet","Save a copy",function(){IngRepo.read(r.id,selp.path).then(function(b){if(b==null)throw new Error("the file is not here");saveBytes(selp.path.split("/").pop(),mimeOf(selp.path),b);toast("Saved: "+selp.path.split("/").pop());},fail);}));}
function mimeOf(p){var m=/\.([a-z0-9]+)$/i.exec(p),e=m?m[1].toLowerCase():"";return {html:"text/html",htm:"text/html",css:"text/css",js:"text/javascript",json:"application/json",svg:"image/svg+xml",png:"image/png",jpg:"image/jpeg",jpeg:"image/jpeg",gif:"image/gif",webp:"image/webp",txt:"text/plain",md:"text/markdown",pdf:"application/pdf",zip:"application/zip"}[e]||"application/octet-stream";}
/* 6.0: a save is a promise, kept until the dialog has closed, so the next waits for it (see R137's queue) */
function saveBytes(name,mime,data){try{if(typeof saveFileNative==="function")return Promise.resolve(saveFileNative(name,mime,data));}catch(e){}
  var u=URL.createObjectURL(new Blob([data],{type:mime})),a=document.createElement("a");a.href=u;a.download=name;document.body.appendChild(a);a.click();setTimeout(function(){a.remove();URL.revokeObjectURL(u);},4000);
  return new Promise(function(res){setTimeout(res,400);});}

/* the history: every version kept, newest first; nothing in it is ever written over */
function paintHistory(r,w,f){var key=r.id+"|"+(r.head||""),have=C.log[key];
  if(!r.head){w.appendChild(h("div","f-empty","<b>No versions yet</b>The first version you keep starts its history. Nothing in it is ever written over."));return;}
  if(!have){w.appendChild(h("div","f-empty","Reading the history…"));IngRepo.log(r.id,{max:120}).then(function(l){C.log[key]=l;var tg={};l.forEach(function(c){var t=c.names.filter(function(n){return r.tags.indexOf(n)>=0;});if(t.length)tg[c.oid]=t[t.length-1];});C.tags[r.id]=tg;if(cur()&&cur().id===r.id){paintWork();paintRepos();}},fail);return;}
  var hb=h("div","f-hist");
  have.forEach(function(c,i){var merge=c.parents.length>1,e=h("div","f-cm"+(merge?" merge":""));e.tabIndex=0;var open=!!S.open[c.oid];e.setAttribute("aria-expanded",open?"true":"false");
    var tags=c.names.filter(function(n){return r.tags.indexOf(n)>=0;}),brs=c.names.filter(function(n){return r.branches.indexOf(n)>=0;});
    e.innerHTML="<b>"+esc(c.title)+'</b><div class="meta"><span>'+esc(when(c.when))+'</span><span class="id">'+esc(c.short)+"</span>"+tags.map(function(t){return '<span class="f-tag">'+esc(t)+"</span>";}).join("")+brs.map(function(t){return '<span class="f-chip" style="font-size:11px;padding:1px 8px">'+esc(t)+"</span>";}).join("")+(c.oid===r.head?'<span class="f-chip ok" style="font-size:11px;padding:1px 8px"><span class="d"></span>you are here</span>':"")+"</div>"+
      '<div class="more">'+(c.msg.indexOf("\n")>0?'<p class="msg">'+esc(c.msg.split("\n").slice(1).join("\n").trim())+"</p>":"")+'<ul class="fl"></ul><div class="f-acts"></div></div>';
    if(open){var ul=e.querySelector(".fl"),fk=r.id+"|"+(c.parents[0]||"empty")+"|"+c.oid,dd=C.diff[fk];
      if(dd)ul.innerHTML=dd.slice(0,12).map(function(x){return "<li>"+esc(x.path)+(x.kind!=="changed"?" <small>("+esc(x.kind)+")</small>":"")+"</li>";}).join("")+(dd.length>12?"<li>… and "+(dd.length-12)+" more</li>":"")||"<li>no files differ</li>";
      else{ul.innerHTML="<li>reading…</li>";IngRepo.diff(r.id,{from:c.parents[0]||"empty",to:c.oid,namesOnly:true}).then(function(d){C.diff[fk]=d;if(S.open[c.oid]&&cur()&&cur().id===r.id)paintWork();},fail);}
      var acts=e.querySelector(".f-acts");
      acts.appendChild(btn("sm","See the changes",function(ev){ev.stopPropagation();S.cmp={from:c.parents[0]||"empty",to:c.oid,title:c.title};S.view="changes";S.file=0;paintWork();thumbs();}));
      if(c.oid!==r.head||i>0){acts.appendChild(btn("sm","Look at this version",function(ev){ev.stopPropagation();IngRepo.switchTo(r.id,c.oid).then(function(){toast("Showing "+r.name+" as it was at "+c.short+". Nothing is changed.");C.files={};C.diff={};return refresh();}).then(paint,fail);}));}
      if(!merge)acts.appendChild(btn("sm","Undo it",function(ev){ev.stopPropagation();IngRepo.revert(r.id,c.oid).then(function(){toast("Undone in a new version. The old one is still there.");C.log={};C.diff={};return refresh();}).then(paint,fail);}));
      if(!tags.length)acts.appendChild(btn("sm","Mark a release",function(ev){ev.stopPropagation();sheetName("Mark a release","A name for this version, as a release: v1, 1051, autumn.",function(name){return IngRepo.tag(r.id,name,{target:c.oid}).then(function(){toast("Release "+name+" marked on “"+c.title+"”.");C.log={};return refresh();}).then(paint);});}));}
    e.onclick=function(){S.open[c.oid]=!S.open[c.oid];paintWork();};hb.appendChild(e);});
  w.appendChild(hb);
  f.appendChild(btn("","Save the whole history (git bundle)",function(){IngRepo.bundle(r.id).then(function(b){saveBytes(r.slug+".bundle","application/octet-stream",b);toast("Saved: "+r.slug+".bundle, "+kb(b.length)+". Any git clones it.");},fail);}));}

/* the ideas: each one a branch; main is where the app ships from */
function paintIdeas(r,w,f){var ib=h("div","f-ideas"),list=r.branches.slice().sort(function(a,b){return a==="main"?-1:b==="main"?1:a.localeCompare(b);});
  if(!r.head){w.appendChild(h("div","f-empty","<b>Ideas come after the first version</b>Keep a first version; then any idea can branch from it, and main stays as it is until you bring the idea in."));return;}
  list.forEach(function(n){var on=n===r.branch&&!r.detached,e=h("div","f-idea"+(on?" on":""));
    e.innerHTML="<b>"+esc(n)+(on?' <span class="f-chip live" style="font:600 11px var(--f-sans);padding:1px 8px">working here</span>':"")+"</b><p>"+(n==="main"?"Where "+esc(r.name)+" ships from. Every package is made from here.":"An idea of yours. main is not touched until you bring it in.")+"</p>";
    var a=h("div","f-acts");
    if(!on)a.appendChild(btn("sm","Work on this",function(){IngRepo.switchTo(r.id,n).then(function(){toast("Now working on “"+n+"”. Your files follow it.");C.files={};C.diff={};C.log={};return refresh();}).then(paint,fail);}));
    if(n!=="main"&&r.branches.indexOf("main")>=0)a.appendChild(btn("sm","Bring it into main",function(){var p=(r.branch==="main"&&!r.detached)?Promise.resolve():IngRepo.switchTo(r.id,"main");
      p.then(function(){return IngRepo.merge(r.id,n);}).then(function(m){C.files={};C.diff={};C.log={};
        if(m.kind==="same")toast("main already has everything from “"+n+"”.");else if(m.kind==="conflicts"||(m.conflicts&&m.conflicts.length))toast("Both versions are in "+((m.conflicts||[]).length||"some")+" file(s): open them in Code, keep one of each, then keep this version.");
        else toast("Brought into main: no two changes crossed. Next: test it.");return refresh();}).then(paint,fail);}));
    if(n!=="main"&&!on)a.appendChild(btn("quiet sm","Take it away",function(){IngRepo.delBranch(r.id,n).then(function(){toast("“"+n+"” is taken away. Its versions stay in the history.");return refresh();}).then(paint,fail);}));
    e.appendChild(a);ib.appendChild(e);});
  w.appendChild(ib);
  f.appendChild(btn("","＋ New idea from here",function(){sheetName("A new idea","Its name, in one or two words: autumn-room, faster-start.",function(name){return IngRepo.branch(r.id,name).then(function(){return IngRepo.switchTo(r.id,name);}).then(function(){toast("A new idea, “"+name+"”: try anything; main stays as it is.");C.files={};C.diff={};C.log={};return refresh();}).then(paint);});}));}

/* ---------- test and ship ---------- */
var CHECKS=[["reads","The page reads cleanly","its markup is whole, and every script in it parses"],["names","Every file it names is here","pictures, scripts, its manifest and its offline copy"],["opens","It opens with no errors","in a quiet window of its own, as on your devices"],["self","Its own self-test","the checks the app carries for itself"],["number","Its build number moves forward","so every device takes it as an update"]];
/* 6.0 · what can be made, each card its own key. The owner's words (20 October 2026): "The options are not clickable inside
   of the page except for download them all", "I want to be able to select how I want to download the apps", and "it is
   supposed to be APKs and IPAs right there inside of Ingenium". A card pressed is chosen (its tick) for Make the chosen;
   its own key makes it alone. The APK and the IPA are made here by R136 in the shells Ingenium carries. */
var ICONS={apk:'<rect x="6" y="2.5" width="12" height="19" rx="2.5"/><path d="M10 18.5h4"/><path d="M9 8.5l3 3 3-3M12 11.5V5.5"/>',
  ipa:'<rect x="5.5" y="2.5" width="13" height="19" rx="3"/><path d="M10.5 5.3h3"/><circle cx="12" cy="18.2" r=".9"/>',
  web:'<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.7 2.6 2.7 15.4 0 18M12 3c-2.7 2.6-2.7 15.4 0 18"/>',
  page:'<path d="M6 2.5h8l4 4V21.5H6z"/><path d="M14 2.5v4h4"/>',
  kits:'<path d="M4 7.5l8-4 8 4v9l-8 4-8-4z"/><path d="M4 7.5l8 4 8-4M12 11.5v9"/>'};
var TARGETS=[["apk","Android app (APK)","For the Fire tablet and any Android device: signed here, it installs as it is"],
  ["ipa","iPhone and iPad app (IPA)","Signed with your Apple ID as Sideloadly or AltStore installs it"],
  ["web","Web app (.zip)","Installs from a browser and works offline; on iPhone and iPad, Add to Home Screen"],
  ["page","One page (.html)","The whole app in one file, for any browser"],
  ["kits","Build kits (.zip)","Projects for a computer or GitHub to build: you choose the devices"]];
var NOTE={page:"onePage",web:"webApp",kits:"kits",apk:"apk",ipa:"ipa"};
/* the family's apps keep the ids, launcher names and bridges their earlier packages had, so a package made here installs over
   one built by the Forge or by GitHub (with that one's key). Ingenium's own Fire app carries the model engine and its models,
   which a shell does not: its package here has an id of its own, so it installs beside Ingenium, never over it. */
var KNOWN={forge:{id:"com.yannieforest.theforge",alias:"com.yannie.carpediem.MainActivity",and:["CarpeNative"],ios:["CarpeNative","pywebview"]},
  cd:{id:"com.yannie.carpediem",alias:"com.yannie.carpediem.MainActivity",and:["CarpeNative"],ios:["CarpeNative","pywebview"]},
  inkwell:{id:"studio.inkwell.app",alias:"",and:["InkwellNative","CarpeNative"],ios:["InkwellNative","CarpeNative"]},
  ingenium:{id:"com.yannieforest.ingenium.web",alias:"",and:["IngeniumNative"],ios:["IngeniumNative"],note:"Ingenium's own Fire tablet app, built by GitHub, carries the model engine and its models; this package is Ingenium's page in Fabrica's shell, without them. Its id is its own, so it installs beside your Ingenium and never over it."}};
window.fbKnown=KNOWN;
/* 6.1 · Download as an app (R139), from the version kept: every device with its emoji, one at a time or all; what is made is kept
   under Releases like the cards' own */
function downloadAsApp(r){if(!window.IngDownload){toast("This copy has no Download as an app.");return;}if(!r||!r.head){toast("Keep a first version first.");return;}var P=pkgOf(r),snap=null;
  IngDownload.open({getHtml:function(){busy("Reading the version you kept…");return IngShip.onePage(r.id,{quiet:true}).then(function(x){unbusy();snap=x;return x.html;},function(e){unbusy();fail(e);return "";});},
    title:P.title,id:P.id,version:P.version||verOf(r)||"",keyId:P.keyId,app:P.app,alias:P.alias,
    onMade:function(k,name,mime,bytes){if(!snap)return;var kind={mac:"kits",macarm:"kits",windows:"kits",ipa:"ipa",apk:"apk",web:"web",html:"page"}[k]||"page";
      return keepMade(r,snap.commit,kind,name,mime,bytes).then(function(){return IngRepo.setNote(r.id,snap.commit,NOTE[kind],{at:Date.now(),size:bytes.length,name:name});}).then(function(){return refresh();}).then(paint);}});}
var KITS=[["fire","Fire tablet"],["iphone","iPhone"],["ipad","iPad"],["mac","MacBook (Intel)"],["macarm","Mac mini (Apple silicon)"],["windows","Windows"]];
function kitsHere(){return typeof kitStore==="function"&&typeof kitAssemble==="function"&&typeof makeZip==="function"&&!!document.getElementById("ingenium-kit-bundle");}
function targetHere(k){try{if(k==="kits")return kitsHere();if(k==="apk")return !!(window.IngApk&&document.getElementById("ing-android-shell"));if(k==="ipa")return !!(window.IngIpa&&IngIpa.has());}catch(e){return false;}return true;}
function whyNot(k){return k==="kits"?"The kits are made on a computer: this build of Ingenium carries no kit store.":k==="apk"?"This build of Ingenium carries no Android shell.":k==="ipa"?"This build of Ingenium carries no iPhone and iPad shell.":"";}
function shipPrefs(r){var f=FBS();if(!f.ship)f.ship={};var p=f.ship[r.id];if(!p)p=f.ship[r.id]={};if(!p.chosen)p.chosen=["apk","page"];if(!p.kits)p.kits=KITS.map(function(k){return k[0];});return p;}
function slugId(r){var s=String(r.slug||r.name||"app").toLowerCase().replace(/[^a-z0-9]+/g,"");if(!s||/^[0-9]/.test(s))s="app"+s;return "com.yannieforest."+s.slice(0,40);}
function pkgOf(r){var p=shipPrefs(r),k=appOf(r),K=KNOWN[k]||{};
  return {title:(p.title||r.name||"My app").slice(0,50),id:p.id||K.id||slugId(r),version:p.version||"",keyId:p.keyId||"device",alias:p.alias!=null?p.alias:(K.alias||""),
    and:K.and||["CarpeNative"],ios:K.ios||["CarpeNative","pywebview"],app:k,note:K.note||""};}
function paintShip(){var r=cur(),cb=$("fbChecks");cb.innerHTML="";var n=r?notesOf(r):{},t=n.test,live=S.testing&&r&&S.testing.id===r.id?S.testing:null;
  CHECKS.forEach(function(c,i){var st="",det=c[2],mark="○";var got=live?live.checks.filter(function(x){return x.id===c[0];})[0]:(t?t.checks.filter(function(x){return x.id===c[0];})[0]:null);
    if(live&&!got&&live.checks.length===i)st="run";
    if(got){st=got.state==="ok"?"ok":got.state==="none"||got.state==="skip"?"":got.state==="warn"?"warn":"fail";det=got.detail||det;mark=st==="ok"?"✓":st==="fail"?"!":st==="warn"?"~":"○";}
    if(st==="run")mark="…";var e=h("div","f-ck"+(st?" "+st:""));e.innerHTML='<span class="m">'+mark+'</span><div>'+esc(c[1])+"<small>"+esc(det)+"</small></div>";cb.appendChild(e);});
  var tc=$("fbTestChip"),ok=r&&tested(r);tc.className="f-chip"+(ok?" ok":(t&&!ok?" warn":""));
  tc.innerHTML=!r?"":live?"Testing…":ok?'<span class="d"></span>Passed':t?(t.page?"Faults found":"No page found"):(!r.head?"Nothing to test yet":statusOf(r).clean?"Not tested yet":"Keep first, then test");
  var tb=$("fbTest");tb.disabled=!r||!r.head||!!live;tb.className="f-btn"+(r&&stepOf(r)==="test"?" pri next":"");tb.textContent=t?"Test it again":"Test this version";
  var tg=$("fbTargets");tg.innerHTML="";var mk=S.making&&r&&S.making.id===r.id?S.making:null,pref=r?shipPrefs(r):null;
  TARGETS.forEach(function(x){var k=x[0],note=n[NOTE[k]],here=targetHere(k),prog=mk?mk.prog[k]:null,chosen=!!(pref&&here&&pref.chosen.indexOf(k)>=0);
    var e=h("div","f-tg"+(note?" done":"")+(here?"":" off"));e.setAttribute("role","button");e.tabIndex=0;e.setAttribute("aria-pressed",chosen?"true":"false");e.setAttribute("data-k",k);
    e.title=!here?whyNot(k):chosen?"Chosen: made with the others you chose. Press to leave it out.":"Press to choose it for Make the chosen";
    e.innerHTML='<div class="top"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round">'+ICONS[k]+"</svg><b>"+esc(x[1])+'</b><span class="tick" aria-hidden="true">✓</span></div><small>'+esc(here?x[2]:whyNot(k))+"</small>"+(typeof prog==="number"?'<div class="bar"><i style="width:'+prog+'%"></i></div>':"")+'<div class="foot"></div>';
    var ft=e.querySelector(".foot");
    if(typeof prog==="number"){if(mk.say&&mk.say[k])ft.appendChild(h("span","f-hint",esc(mk.say[k])));}
    else{if(note)ft.appendChild(h("span","f-chip ok",'<span class="d"></span>Made · '+kb(note.size||0)));
      else ft.appendChild(h("span","f-chip",!r?"":!r.head?"After a first version":tested(r)?"Ready to make":"After its test"));
      if(r&&r.head&&here)ft.appendChild(btn("quiet sm",note?"Make and save again":"Make and save",function(ev){ev.stopPropagation();if(k==="kits")sheetKits(r);else makeOne(r,k);}));}
    function toggle(){if(!r)return;if(!here){toast(whyNot(k));return;}var i=pref.chosen.indexOf(k);if(i>=0)pref.chosen.splice(i,1);else pref.chosen.push(k);saveSoon();paintShip();}
    e.onclick=toggle;e.onkeydown=function(ev){if(ev.target!==e)return;if(ev.key===" "||ev.key==="Enter"){ev.preventDefault();toggle();}};
    tg.appendChild(e);});
  var pk=$("fbPkg");pk.innerHTML="";pk.hidden=!r;
  if(r){var P=pkgOf(r);pk.innerHTML="<span>"+esc(P.title)+" · <code>"+esc(P.id)+"</code>"+(P.version?" · version "+esc(P.version):"")+"</span>";
    var kl=h("span",null,"signed with "+(P.keyId==="device"?"this device's key":"a key you brought in"));pk.appendChild(kl);
    pk.appendChild(btn("quiet sm","Package details",function(){sheetPackage(r);}));
    if(window.IngDownload&&r.head)pk.appendChild(btn("sm","📦 Download as an app…",function(){downloadAsApp(r);}));}
  var chosen=r?pref.chosen.filter(targetHere):[],all=r&&chosen.length&&chosen.every(function(k){return !!n[NOTE[k]];});
  var ss=$("fbShipState");ss.className="f-chip"+(all?" ok":"");ss.innerHTML=!r?"":all?'<span class="d"></span>Made':r.head?(tested(r)?"Ready to make":"After its test"):"After a first version";
  var mb=$("fbMakeAll");mb.disabled=!r||!r.head||!!mk||!chosen.length;mb.textContent=mk?"Making…":!chosen.length?"Choose what to make above":(all?"Make the chosen again":"Make the chosen")+" ("+chosen.length+")";mb.className="f-btn pri"+(r&&stepOf(r)==="ship"?" next":"");
  var sc=$("fbShipChip");sc.className="f-chip"+(shipped(r||{id:""})&&r?" ok":"");sc.textContent=!r?"":r&&shipped(r)?"Shipped":r&&tested(r)?"Tested":r&&r.head?"Waiting":"";
  var cp=$("fbCopies");cp.innerHTML="";if(!r)return;
  [["folder","A folder for git","Its files with their whole history (.git inside), zipped: any git opens it"],["bundle","The whole history in one file","A git bundle: one file to keep, or to clone anywhere"],["zip","A zip of its files","As GitHub's Download ZIP makes it"]].forEach(function(c){var e=h("div","f-cp");e.innerHTML='<div class="t">'+esc(c[1])+"<small>"+esc(c[2])+"</small></div>";
    var b=btn("quiet sm","Save",function(){if(!r.head){toast("Keep a first version first.");return;}b.disabled=true;var p=c[0]==="folder"?IngRepo.gitFolder(r.id).then(function(z){return [r.slug+"-git.zip","application/zip",z];}):c[0]==="bundle"?IngRepo.bundle(r.id).then(function(z){return [r.slug+".bundle","application/octet-stream",z];}):IngRepo.sourceZip(r.id).then(function(z){return [r.slug+"-"+r.head.slice(0,7)+".zip","application/zip",z];});
      p.then(function(x){return saveBytes(x[0],x[1],x[2]).then(function(){toast("Saved: "+x[0]+", "+kb(x[2].length)+".");b.disabled=false;});}).catch(function(e){b.disabled=false;fail(e);});});e.appendChild(b);cp.appendChild(e);});
  var gh=h("div","f-cp"),on=!!FBS().gh;gh.innerHTML='<div class="t">GitHub, only when you choose<small>'+(on?"A copy there, when you want one. Nothing leaves this device until you send it yourself.":"Off. Everything works without it.")+"</small></div>";
  var lab=h("label","f-sw");lab.innerHTML='<input type="checkbox"'+(on?" checked":"")+' aria-label="GitHub">';lab.querySelector("input").onchange=function(){FBS().gh=this.checked;saveSoon();paintShip();};gh.appendChild(lab);cp.appendChild(gh);
  if(on){if(window.fbGitHub&&typeof fbGitHub.paint==="function"){try{fbGitHub.paint(r,cp,{btn:btn,h:h,esc:esc,kb:kb,when:when,toast:toast,fail:fail,sheet:sheet,sheetName:sheetName,saveBytes:saveBytes,refresh:function(){C.diff={};C.files={};C.log={};return refresh().then(paint);},busy:busy,unbusy:unbusy});}catch(e){fail(e);}}
    else{var g2=h("div","f-cp");g2.innerHTML='<div class="t">Send its versions<small>GitHub needs a connection and your sign-in. Save the bundle and, on any computer with git: git clone '+esc(r.slug)+'.bundle, then git push to your repository.</small></div>';
      g2.appendChild(btn("sm","Save the bundle",function(){IngRepo.bundle(r.id).then(function(b){return saveBytes(r.slug+".bundle","application/octet-stream",b).then(function(){toast("Saved: "+r.slug+".bundle, "+kb(b.length)+".");});},fail);}));cp.appendChild(g2);}
    var g3=h("div","f-cp");g3.innerHTML='<div class="t">Bring a copy in by file<small>GitHub\'s Download ZIP, or a bundle from git bundle create: it comes in here as an app of its own, history and all.</small></div>';
    g3.appendChild(btn("sm","Choose the file",function(){pickFile(".zip,.bundle",function(file){importFile(file);});}));cp.appendChild(g3);}}
window.fbPaintShip=paintShip;
function testNow(){var r=cur();if(!r||!r.head)return;S.testing={id:r.id,checks:[]};paintShip();
  IngShip.test(r.id,{onStep:function(c){if(S.testing&&S.testing.id===r.id){S.testing.checks.push(c);paintShip();}}}).then(function(out){S.testing=null;return refresh().then(function(){paint();var bad=(out.checks||[]).filter(function(c){return c.state!=="ok"&&c.state!=="none"&&c.state!=="skip";});
    toast(!out.page?"No page was found in this version: bring the app's page in again, or open Files to see what is there.":out.ok?"Every check passed. Next: ship it.":bad.length+" check"+(bad.length===1?"":"s")+" found something to look at.");});},function(e){S.testing=null;paintShip();fail(e);});}
function making(r,what,v){if(!S.making||S.making.id!==r.id)S.making={id:r.id,prog:{},say:{}};if(v==null){delete S.making.prog[what];delete S.making.say[what];if(!Object.keys(S.making.prog).length)S.making=null;}else S.making.prog[what]=v;paintShip();}
function say(r,what,t){if(S.making&&S.making.id===r.id){S.making.say[what]=t;paintShip();}}
/* one package, made and saved; the saving is waited for, so packages made one after another never cross */
function makeOne(r,what,opt){opt=opt||{};if(!r.head)return Promise.resolve();making(r,what,5);
  var p;
  if(what==="page")p=IngShip.onePage(r.id).then(function(x){var name=x.name||(r.slug+".html");return saveBytes(name,"text/html",x.bytes).then(function(){return keepMade(r,x.commit,what,name,"text/html",x.bytes);}).then(function(){return x.bytes.length;});});
  else if(what==="web")p=IngShip.webApp(r.id).then(function(x){return saveBytes(x.name,"application/zip",x.bytes).then(function(){return keepMade(r,x.commit,what,x.name,"application/zip",x.bytes);}).then(function(){return x.bytes.length;});});
  else if(what==="apk"||what==="ipa")p=makeDevice(r,what);
  else p=makeKits(r,opt.kits||shipPrefs(r).kits);
  return p.then(function(){making(r,what,100);return refresh();}).then(function(){making(r,what,null);paint();if(!opt.quiet)toast(TARGETS.filter(function(t){return t[0]===what;})[0][1]+" made and saved. It is kept under Releases too.");},
    function(e){making(r,what,null);if(!opt.quiet)fail(e);throw e;});}
/* the APK or the IPA: the version kept, made into one page, in the shell Ingenium carries (R136) */
function makeDevice(r,what){var P=pkgOf(r),said=function(t){say(r,what,t);};
  said("Reading the version you kept…");
  return IngShip.onePage(r.id,{quiet:true}).then(function(x){var vn=String(P.version||verOf(r)||IngShip._.numberOf(x.html,x.recipe||{})||"1.0").replace(/^v(?=\d)/,"");
    said("Drawing its icons…");making(r,what,25);
    return IngApk.iconsFor(x.html,P.title,colorOf(r),flatSrc(P.app)||null).then(function(icons){var page=x.page.split("/").pop(),stem=(P.title.replace(/[^\w.-]+/g,"-").replace(/^-+|-+$/g,"")||"app")+"-"+vn.replace(/[^\w.-]+/g,"");
      making(r,what,45);
      if(what==="apk")return IngApk.make({html:x.bytes,page:page,title:P.title,id:P.id,versionName:vn,icons:icons.android,background:"#ffffff",bridges:P.and,alias:P.alias,keyId:P.keyId,onStep:said})
        .then(function(a){return {name:stem+".apk",mime:"application/vnd.android.package-archive",bytes:a.bytes,commit:x.commit,info:{at:Date.now(),size:a.size,sha256:a.sha256,id:a.id,versionName:a.versionName,versionCode:a.versionCode,key:a.key?a.key.fingerprint:"",keyLabel:a.key?a.key.label:""}};});
      return IngIpa.make({html:x.bytes,page:page,title:P.title,id:P.id,versionName:vn,build:String(IngApk.versionCodeNow()),icons:icons.ios,bridges:P.ios,onStep:said})
        .then(function(a){return {name:IngIpa.iosName(P.title)+"-"+vn.replace(/[^\w.-]+/g,"")+".ipa",mime:"application/octet-stream",bytes:a.bytes,commit:x.commit,info:{at:Date.now(),size:a.size,sha256:a.sha256,id:a.id}};});});})
  .then(function(o){said("Saving "+o.name+"…");making(r,what,90);return saveBytes(o.name,o.mime,o.bytes).then(function(){return keepMade(r,o.commit,what,o.name,o.mime,o.bytes);}).then(function(){return IngRepo.setNote(r.id,o.commit,NOTE[what],o.info);}).then(function(){return o.bytes.length;});});}
/* the chosen ones, one after another */
function makeChosen(){var r=cur();if(!r||!r.head)return;var list=shipPrefs(r).chosen.filter(targetHere);if(!list.length){toast("Choose what to make: press a card above.");return;}
  var q=Promise.resolve(),done=[],bad=[];
  list.forEach(function(w){q=q.then(function(){return makeOne(r,w,{quiet:true}).then(function(){done.push(w);},function(e){bad.push([w,e&&e.message||String(e)]);});});});
  q.then(function(){var nm=function(w){return TARGETS.filter(function(t){return t[0]===w;})[0][1];};
    toast(bad.length?(done.length?done.map(nm).join(", ")+" made; ":"")+nm(bad[0][0])+" was not: "+bad[0][1]:done.length+" made and saved: "+done.map(nm).join(", ")+". Each is kept under Releases too.");});}
function makeAll(){makeChosen();}
/* the build kits: the devices chosen, one zip each, saved one after another */
function sheetKits(r){var pref=shipPrefs(r),sh=sheet("Build kits","A kit holds everything needed to build the app for one device, with a guide to every step: GitHub builds the Fire tablet, iPhone and iPad apps from theirs, and the Mac and Windows kits build on the computer itself. Choose the devices.");
  var picked=pref.kits.slice();
  KITS.forEach(function(k){var o=opt("✓",k[1],k[0]==="fire"?"An Android project and its GitHub recipe (Fabrica's APK needs none)":k[0]==="iphone"||k[0]==="ipad"?"An Xcode project and its GitHub recipe (Fabrica's IPA needs none)":"The app for this computer, built on it",function(){var i=picked.indexOf(k[0]);if(i>=0)picked.splice(i,1);else picked.push(k[0]);o.setAttribute("aria-pressed",picked.indexOf(k[0])>=0?"true":"false");go2.textContent="Make "+picked.length+" kit"+(picked.length===1?"":"s");go2.disabled=!picked.length;});
    o.setAttribute("aria-pressed",picked.indexOf(k[0])>=0?"true":"false");sh.box.appendChild(o);});
  var end=h("div","end"),go2=btn("pri","Make "+picked.length+" kit"+(picked.length===1?"":"s"),function(){pref.kits=picked.slice();saveSoon();sh.close();makeOne(r,"kits",{kits:picked.slice()}).catch(function(){});});
  go2.disabled=!picked.length;end.appendChild(btn("","Close",sh.close));end.appendChild(go2);sh.box.appendChild(end);}
function makeKits(r,ids){ids=(ids&&ids.length?ids:KITS.map(function(k){return k[0];})).filter(function(i){return KITS.some(function(k){return k[0]===i;});});
  return IngShip.onePage(r.id,{quiet:true}).then(function(x){var name=r.name.replace(/[^\w .-]+/g,"").trim()||"App",file=name.replace(/\s+/g,""),who={isNew:true,name:name,id:pkgOf(r).id.slice(0,60),file:file},page=x.html;
    return kitStore().then(function(store){var total=0,chain=Promise.resolve(),made=[];
      ids.forEach(function(id,i){chain=chain.then(function(){say(r,"kits","The "+KITS.filter(function(k){return k[0]===id;})[0][1]+" kit…");var k=kitAssemble(store,id,who,page),bytes=makeZip(k.entries);total+=bytes.length;made.push({name:k.zip,size:bytes.length,kit:id});
        return saveBytes(k.zip,"application/zip",bytes).then(function(){return keepMade(r,x.commit,"kits",k.zip,"application/zip",bytes);}).then(function(){if(S.making){S.making.prog.kits=Math.round(10+85*(i+1)/ids.length);paintShip();}});});});
      return chain.then(function(){return IngRepo.setNote(r.id,x.commit,"kits",{at:Date.now(),size:total,made:made});}).then(function(){return total;});});});}
/* what was made, kept on this device beside its version (IndexedDB fabrica_made): Releases shows it, and saves it again with no
   making; the packages of an app's three newest versions are kept */
var MADE=(function(){var dbp=null;
  function db(){if(dbp)return dbp;dbp=new Promise(function(res,rej){try{var rq=indexedDB.open("fabrica_made",1);rq.onupgradeneeded=function(){var d=rq.result;try{d.createObjectStore("meta");}catch(e){}try{d.createObjectStore("bytes");}catch(e){}};
    rq.onsuccess=function(){res(rq.result);};rq.onerror=function(){rej(rq.error);};}catch(e){rej(e);}});dbp.catch(function(){dbp=null;});return dbp;}
  function tx(stores,mode,fn){return db().then(function(d){return new Promise(function(res,rej){var t=d.transaction(stores,mode),out=fn(t);t.oncomplete=function(){res(out&&"result" in out?out.result:out);};t.onerror=function(){rej(t.error);};t.onabort=function(){rej(t.error||new Error("this device's storage is full"));};});});}
  function list(repo){return tx(["meta"],"readonly",function(t){return t.objectStore("meta").getAll();}).then(function(a){return (a||[]).filter(function(m){return !repo||m.repo===repo;}).sort(function(x,y){return y.at-x.at;});}).catch(function(){return [];});}
  function del(keys){if(!keys.length)return Promise.resolve();return tx(["meta","bytes"],"readwrite",function(t){keys.forEach(function(k){t.objectStore("meta").delete(k);t.objectStore("bytes").delete(k);});});}
  return {list:list,del:del,
    keep:function(r,commit,kind,name,mime,bytes){var key=r.id+"|"+commit+"|"+kind+"|"+name,m={key:key,repo:r.id,commit:commit,kind:kind,name:name,mime:mime,size:bytes.length,at:Date.now()};
      return tx(["meta","bytes"],"readwrite",function(t){t.objectStore("meta").put(m,key);t.objectStore("bytes").put(bytes,key);}).then(function(){return list(r.id);}).then(function(all){var commits=[];all.forEach(function(x){if(commits.indexOf(x.commit)<0)commits.push(x.commit);});
        return del(all.filter(function(x){return commits.indexOf(x.commit)>=3;}).map(function(x){return x.key;}));}).catch(function(e){try{console.warn("Fabrica: a package could not be kept here",e);}catch(_){}});},
    bytes:function(key){return tx(["bytes"],"readonly",function(t){return t.objectStore("bytes").get(key);});},
    forget:function(repo){return list(repo).then(function(all){return del(all.map(function(x){return x.key;}));});}};})();
function keepMade(r,commit,kind,name,mime,bytes){return MADE.keep(r,commit,kind,name,mime,bytes).then(function(){delete C.log[r.id+"|rel"];});}

/* ---------- running the app ---------- */
function run(){var r=cur();if(!r)return;if(!r.head){toast("Nothing to run yet: give it a first page.");return;}
  $("fbRun").disabled=true;IngShip.onePage(r.id).then(function(x){$("fbRun").disabled=false;var html=x.html;
    var u=URL.createObjectURL(new Blob([html],{type:"text/html"})),w=null;try{w=window.open(u,"_blank");}catch(e){}
    if(w){toast(r.name+" is running in a window of its own."+(statusOf(r).clean?"":" (The last kept version; the changes not kept yet are not in it.)"));setTimeout(function(){URL.revokeObjectURL(u);},60000);return;}
    URL.revokeObjectURL(u);if(typeof csShow==="function"){go("chat");csShow({kind:"file",html:html,name:x.page||(r.slug+".html")},{user:true});}else toast("This build cannot open a window; save the one page and open it.");},function(e){$("fbRun").disabled=false;fail(e);});}

/* ---------- bringing apps in ---------- */
function sheet(title,lead){var root=$("fb"),wrap=h("div","f-sheet-wrap"),s=h("div","f-sheet");wrap.appendChild(s);s.innerHTML="<h3>"+esc(title)+"</h3>"+(lead?"<p>"+esc(lead)+"</p>":"");
  wrap.onclick=function(e){if(e.target===wrap)wrap.remove();};root.appendChild(wrap);thumbs();return {wrap:wrap,box:s,close:function(){wrap.remove();}};}
function opt(ic,title,small,on){var b=h("button","f-opt");b.type="button";b.innerHTML='<span class="ic">'+ic+"</span><span><b>"+esc(title)+"</b><small>"+esc(small)+"</small></span>";b.onclick=on;return b;}
function libList(){try{return typeof libApps==="function"?libApps():[];}catch(e){return [];}}
function sheetBring(into){var sh=sheet("Bring an app in","Whatever you bring keeps its history if it has one; if not, it starts with a first version."),lib=libList();
  sh.box.appendChild(opt("♦","From your app library",lib.length?lib.map(function(m){return (APPS[m.key]?APPS[m.key].name:m.key)+(m.version?" "+m.version:"");}).join(", "):"Nothing is kept there yet: Lector's brief takes your apps' pages",function(){if(!lib.length){toast("Add an app's page in Lector first, or bring a file in here.");return;}sh.close();sheetLibrary(lib,into);}));
  sh.box.appendChild(opt("⇩","A page, or a zip of its files","Your app's own .html, its install kit, or GitHub's Download ZIP",function(){sh.close();pickFile(".html,.htm,.zip",function(f){importFile(f,into);});}));
  sh.box.appendChild(opt("⎇","A git bundle, or a folder with its .git (zipped)","Its whole history comes with it, branch for branch",function(){sh.close();pickFile(".bundle,.zip",function(f){importFile(f,into);});}));
  var prs=[];try{prs=typeof ccProjects==="function"?ccProjects():[];}catch(e){}
  sh.box.appendChild(opt("◇","From Code",prs.length?prs.length+" project"+(prs.length===1?"":"s")+" there: "+prs.slice(0,3).map(function(p){return p.name;}).join(", ")+(prs.length>3?"…":""):"No app project in Code yet",function(){if(!prs.length){toast("Make an app in Code first; it will show here.");return;}sh.close();sheetProjects(prs,into);}));
  var end=h("div","end");end.appendChild(btn("","Close",sh.close));sh.box.appendChild(end);}
function sheetLibrary(lib,into){var sh=sheet("From your app library","The copies Lector keeps on this device. Each comes in as a repository with a first version.");
  lib.forEach(function(m){var k=m.key,nm=(APPS[k]?APPS[k].name:k)+(m.version?" "+m.version:"");
    sh.box.appendChild(opt("♦",nm,(m.title||"")+(m.size?" · "+kb(m.size):""),function(){sh.close();busy("Bringing "+nm+" in…");
      libText(k).then(function(text){if(!text)throw new Error("its copy could not be read");var page=(m.title&&/\.html?$/i.test(m.title))?m.title.split("/").pop():(APPS[k]?APPS[k].name.replace(/\s+/g,"_"):k)+".html";
        var files=[{path:page,data:text}];if(into)return IngRepo.putMany(into.id,files).then(function(){return {id:into.id};});
        return IngRepo.fromFiles(files,{name:APPS[k]?APPS[k].name:k,app:k,msg:"Brought in from "+nm+" (your app library)"});}).then(function(x){FBS().sel=x.id;saveSoon();S.view=into?"changes":"history";C.diff={};C.files={};C.log={};return refresh();}).then(function(){unbusy();paint();toast(nm+" is here"+(into?", as changes to keep.":", with its first version."));},function(e){unbusy();fail(e);});}));});
  var end=h("div","end");end.appendChild(btn("","Close",sh.close));sh.box.appendChild(end);}
function sheetProjects(prs,into){var sh=sheet("From Code","An app project in Code becomes a repository here; its files are the first version, and Code and Fabrica keep the same files from then on.");
  prs.forEach(function(p){sh.box.appendChild(opt("◇",p.name,(p.files||[]).length+" file"+((p.files||[]).length===1?"":"s"),function(){sh.close();busy("Bringing "+p.name+" in…");
    ccLoadAll(p).then(function(){var files=(p.files||[]).filter(function(f){return typeof f.text==="string";}).map(function(f){return {path:f.name,data:f.text};});if(!files.length)throw new Error("the project holds no text files yet");
      if(into)return IngRepo.putMany(into.id,files).then(function(){return {id:into.id};});return IngRepo.fromFiles(files,{name:p.name,msg:"Brought in from Code"});}).then(function(x){FBS().links[x.id]=p.id;FBS().sel=x.id;saveSoon();S.view=into?"changes":"history";C.diff={};C.files={};C.log={};return refresh();}).then(function(){unbusy();paint();toast(p.name+" is here.");},function(e){unbusy();fail(e);});}));});
  var end=h("div","end");end.appendChild(btn("","Close",sh.close));sh.box.appendChild(end);}
function sheetNew(){sheetName("A new app","Its name. Then give it its first page in Chat or Code, or bring one in.",function(name){return IngRepo.create({name:name}).then(function(s){FBS().sel=s.id;saveSoon();S.view="changes";return refresh();}).then(function(){paint();toast("A new app, "+name+": give it its first page in Chat or Code, or bring one in.");});},"Carpe Diem, My Notes…");}
function sheetName(title,lead,fn,ph){var sh=sheet(title,lead),inp=h("input");inp.type="text";inp.placeholder=ph||"";inp.setAttribute("aria-label",title);sh.box.appendChild(inp);
  var end=h("div","end"),ok=btn("pri","Done",function(){var v=inp.value.trim();if(!v){inp.focus();return;}ok.disabled=true;Promise.resolve().then(function(){return fn(v);}).then(sh.close,function(e){ok.disabled=false;fail(e);});});
  end.appendChild(btn("","Close",sh.close));end.appendChild(ok);sh.box.appendChild(end);inp.onkeydown=function(e){if(e.key==="Enter")ok.click();};setTimeout(function(){inp.focus();},60);}
function pickFile(accept,fn){var i=document.createElement("input");i.type="file";i.accept=accept;i.style.display="none";document.body.appendChild(i);i.onchange=function(){var f=i.files&&i.files[0];i.remove();if(f)fn(f);};i.click();}
function importFile(file,into){busy("Bringing "+file.name+" in…");file.arrayBuffer().then(function(ab){var u8=new Uint8Array(ab),name=file.name.replace(/\.(zip|bundle|html?)$/i,"");
    if(/\.html?$/i.test(file.name)){var files=[{path:file.name,data:u8}];if(into)return IngRepo.putMany(into.id,files).then(function(){return {id:into.id};});return IngRepo.fromFiles(files,{name:name,msg:"Brought in from "+file.name});}
    if(into&&u8[0]===0x50&&u8[1]===0x4b){return IngRepo.core.unzipData?Promise.reject(new Error("choose the app's own page to add to an app that is here; a zip comes in as an app of its own")):Promise.reject(new Error("a zip comes in as an app of its own"));}
    return IngRepo.importAny(u8,{name:name});}).then(function(x){var id=x.id||(x.repo&&x.repo.id)||(x.summary&&x.summary.id);if(id){FBS().sel=id;saveSoon();}S.view="history";C.diff={};C.files={};C.log={};return refresh();}).then(function(){unbusy();paint();toast(file.name+" is here.");},function(e){unbusy();fail(e);});}
var busyEl=null;function busy(m){unbusy();busyEl=h("div","f-toast",esc(m));$("fb").appendChild(busyEl);}
function unbusy(){if(busyEl){busyEl.remove();busyEl=null;}}

/* ---------- 6.0 · the chosen app's menu: rename it, edit a file, its package details, save its history, remove it ----------
   The owner's words (20 October 2026): "I literally cannot clear out any added apps from the Code page, the chat page and
   Fabrica, its all just stick". Fabrica had no way to take an app away; now it is one press and one answer. */
function menuMore(anchor){var r=cur();if(!r){toast("Choose an app on the left first.");return;}var root=$("fb"),old=root.querySelector(".f-menu");if(old){old.remove();return;}
  var m=h("div","f-menu");m.setAttribute("role","menu");
  function item(label,fn,cls){var b=h("button",cls||null,esc(label));b.type="button";b.setAttribute("role","menuitem");b.onclick=function(e){e.stopPropagation();m.remove();fn();};m.appendChild(b);}
  item("Edit a file",function(){openEditor(r);});
  if(window.IngDownload)item("📦 Download as an app…",function(){downloadAsApp(r);});
  item("Open it in Build",function(){openInBuild(r);});
  item("Open it in Code",function(){openInCode(r);});
  m.appendChild(h("hr"));
  item("Package details",function(){sheetPackage(r);});
  item("Rename",function(){sheetName("Rename "+r.name,"Its new name. Its history, releases and packages keep it.",function(name){return IngRepo.rename(r.id,name).then(function(){toast("It is "+name+" now.");return refresh();}).then(paint);},r.name);});
  item("Save the whole history (git bundle)",function(){IngRepo.bundle(r.id).then(function(b){return saveBytes(r.slug+".bundle","application/octet-stream",b).then(function(){toast("Saved: "+r.slug+".bundle, "+kb(b.length)+". Any git clones it.");});},fail);});
  m.appendChild(h("hr"));
  item("Remove from Fabrica",function(){sheetRemove(r);},"danger");
  root.appendChild(m);var a=anchor.getBoundingClientRect(),rr=root.getBoundingClientRect();
  m.style.top=Math.round(a.bottom-rr.top+6)+"px";m.style.left=Math.round(Math.max(8,Math.min(a.right-rr.left-m.offsetWidth,rr.width-m.offsetWidth-8)))+"px";
  setTimeout(function(){document.addEventListener("pointerdown",function f(ev){if(!m.contains(ev.target)){m.remove();document.removeEventListener("pointerdown",f,true);}},true);},0);}
function sheetRemove(r){var sh=sheet("Remove "+r.name+" from Fabrica?","Its versions, ideas, releases and the packages kept here leave this device. The app itself is not touched: its page in your app library, in Code and on your devices stays where it is.");
  var end=h("div","end");
  end.appendChild(btn("","Save its history first",function(){IngRepo.bundle(r.id).then(function(b){return saveBytes(r.slug+".bundle","application/octet-stream",b).then(function(){toast("Saved: "+r.slug+".bundle. Remove it now, or keep it.");});},fail);}));
  end.appendChild(btn("","Keep it",sh.close));
  var go2=btn("danger","Remove it",function(){go2.disabled=true;IngRepo.remove(r.id).then(function(){var f=FBS();delete f.links[r.id];if(f.ship)delete f.ship[r.id];delete f.drafts[r.id];if(f.sel===r.id)f.sel=null;saveSoon();return MADE.forget(r.id);})
      .then(function(){sh.close();C.diff={};C.files={};C.log={};return refresh();}).then(function(){paint();toast(r.name+" is no longer in Fabrica.");},function(e){go2.disabled=false;fail(e);});});
  end.appendChild(go2);sh.box.appendChild(end);}
/* the package: its name, its id, its version, its launcher name, and the key it is signed with */
function sheetPackage(r){var P=pkgOf(r),pref=shipPrefs(r),sh=sheet("Package details: "+r.name,"What the APK and the IPA carry. Keep the id the same for every version of an app: Android and iOS take a new id as a different app, installed beside the old one, with none of its work.");
  if(P.note)sh.box.appendChild(h("p","f-warn",esc(P.note)));
  function field(label,val,hint,ph){var l=h("label","f-field"),i=h("input");i.type="text";i.value=val||"";if(ph)i.placeholder=ph;l.appendChild(h("span",null,esc(label)));l.appendChild(i);if(hint)l.appendChild(h("small",null,esc(hint)));sh.box.appendChild(l);return i;}
  var fT=field("Its name on the device",P.title,"Under its icon, on the home screen."),fI=field("Its id",P.id,"Letters, digits and dots, such as com.yannieforest.myapp."),
    fV=field("Its version",pref.version||"","Empty: the release you marked on this version, else the build number in its page, else 1.0. Android also gets a version code that rises by itself with every package.",verOf(r)||"from the page"),
    fA=field("Its launcher name on Android (optional)",P.alias,"The name a home screen icon already points to. An app the Forge or GitHub built for the Fire tablet uses com.yannie.carpediem.MainActivity; keep it, and its icon stays where it is after the update.");
  var kl=h("label","f-field"),ks=h("select");kl.appendChild(h("span",null,"The key it is signed with (Android)"));kl.appendChild(ks);
  kl.appendChild(h("small",null,"Android installs a new package over an app only when both carry the same key. A package of The Forge or Ingenium installs over the one GitHub built when it is signed with that repository's key (its signing folder): bring that key in here."));sh.box.appendChild(kl);
  function fillKeys(sel){ks.innerHTML="";IngApk.keys.list().then(function(list){if(!list.some(function(k){return k.id==="device";}))list.unshift({id:"device",label:"Made on this device",cn:"",fingerprint:""});
    list.forEach(function(k){var o=document.createElement("option");o.value=k.id;o.textContent=(k.id==="device"?"This device's own key":k.label)+(k.cn&&k.id!=="device"?" ("+k.cn+")":"")+(k.fingerprint?" · "+k.fingerprint.slice(0,12):"");if(k.id===(sel||P.keyId))o.selected=true;ks.appendChild(o);});},fail);}
  fillKeys();
  var kr=h("div","f-row");kr.style.margin="-2px 0 12px";
  kr.appendChild(btn("sm","Bring a key in (.keystore, .p12)",function(){pickFile(".keystore,.p12,.pfx,.jks,application/x-pkcs12",function(file){sheetName("The password of "+file.name,"The keystore's password (in GitHub's builds, storePassword in signing/signing.properties).",function(pw){
      return file.arrayBuffer().then(function(ab){return IngApk.keys.bring(new Uint8Array(ab),pw,file.name.replace(/\.[^.]+$/,""));}).then(function(k){fillKeys(k.id);toast("Kept: "+(k.cn||k.label)+", "+k.fingerprint.slice(0,12)+"…");});},"");});}));
  kr.appendChild(btn("sm","Save this key (.p12)",function(){var id=ks.value||"device";sheetName("A password for the key's file","At least six characters. Keep the file and its password safe: anyone holding both can sign an app that installs over yours.",function(pw){
      return IngApk.keys.save(id,pw).then(function(u8){return saveBytes((id==="device"?"ingenium-device":"ingenium-"+id)+"-signing.p12","application/x-pkcs12",u8);}).then(function(){toast("Saved. keytool and GitHub's builds open it with the password you chose.");});},"");}));
  sh.box.appendChild(kr);
  var end=h("div","end");end.appendChild(btn("","Close",sh.close));
  end.appendChild(btn("pri","Keep these",function(){var id=fI.value.trim();if(!IngApk.cleanId(id)){fI.focus();toast("“"+id+"” cannot be an id: letters, digits and dots, such as com.yannieforest.myapp.");return;}
    pref.title=fT.value.trim()||r.name;pref.id=id;pref.version=fV.value.trim();pref.alias=fA.value.trim();pref.keyId=ks.value||"device";saveSoon();sh.close();paintShip();toast("Kept. The next APK and IPA carry them.");}));
  sh.box.appendChild(end);}
/* the app's files, written here: any text file, saved as a change to keep (The Forge's file editor, in Ingenium) */
var BIN=/\.(png|jpe?g|gif|webp|ico|woff2?|ttf|otf|pdf|zip|gz|wasm|mp3|mp4|m4a|ogg|wav|webm|avif|jks|keystore|p12|apk|ipa)$/i;
function openEditor(r,path,report){busy("Reading "+r.name+"’s files…");
  IngRepo.files(r.id).then(function(list){unbusy();var texts=list.filter(function(f){return !BIN.test(f.path);});
    var want=path||(texts.filter(function(f){return /\.html?$/i.test(f.path)&&f.path.indexOf("/")<0;})[0]||texts[0]||{}).path||"index.html";sheetEdit(r,texts,want,report);},function(e){unbusy();fail(e);});}
function sheetEdit(r,texts,path,report){var sh=sheet("Edit "+r.name,null);sh.box.classList.add("f-edit");sh.box.id="fbEdit";
  if(report){var rp=h("pre","f-edit-report");rp.textContent=report;sh.box.appendChild(rp);}
  var bar=h("div","f-row f-edit-bar"),pick=h("select");pick.id="fbEdFile";pick.setAttribute("aria-label","The file");
  function opts(){pick.innerHTML="";var have=texts.map(function(f){return f.path;});if(have.indexOf(path)<0)have.push(path);have.sort().forEach(function(p){var o=document.createElement("option");o.value=p;o.textContent=p;if(p===path)o.selected=true;pick.appendChild(o);});}
  opts();bar.appendChild(pick);
  var ta=h("textarea","f-edit-ta");ta.id="fbEdText";ta.spellcheck=false;ta.setAttribute("aria-label","The file's text");
  var info=h("p","f-hint"),dirty=false,orig="",big=false;
  var buildBtn=btn("quiet sm","Open it in Build",function(){if(dirty){toast("Save your change first, or close without it.");return;}sh.close();openInBuild(r,path);});
  function load(p){path=p;ta.disabled=true;info.textContent="Reading "+p+"…";IngRepo.readText(r.id,p).then(function(t){orig=t==null?"":t;big=orig.length>6*1048576;
      ta.value=big?"":orig;ta.disabled=big;dirty=false;
      info.textContent=t==null?"A new file: it is made when you save it.":big?p+" is "+kb(orig.length)+": open it in Build, which shows a page this size part by part.":orig.split("\n").length.toLocaleString("en-GB")+" lines. Saved here, it waits under Changes until you keep a version.";
      buildBtn.hidden=t==null||!/\.html?$/i.test(p);},function(e){ta.disabled=false;fail(e);});}
  pick.onchange=function(){if(dirty&&!window.confirm("Leave your change to "+path+" unsaved?")){pick.value=path;return;}load(pick.value);};
  ta.oninput=function(){dirty=ta.value!==orig;};
  bar.appendChild(btn("quiet sm","New file",function(){sheetName("A new file","Its path in the app: notes.md, css/room.css.",function(p){p=String(p).replace(/^\/+/,"");if(!p)return;texts.push({path:p});path=p;opts();load(p);});}));
  bar.appendChild(buildBtn);sh.box.appendChild(bar);sh.box.appendChild(ta);sh.box.appendChild(info);
  var end=h("div","end"),saveBtn=btn("pri","Save the change",function(){if(big){toast("Open it in Build to change a page this size.");return;}saveBtn.disabled=true;IngRepo.put(r.id,path,ta.value).then(function(){orig=ta.value;dirty=false;saveBtn.disabled=false;C.diff={};C.files={};
      if(!texts.some(function(f){return f.path===path;}))texts.push({path:path});toast("Saved: "+path+". It waits under Changes until you keep a version.");return refresh();}).then(function(){S.view="changes";paint();},function(e){saveBtn.disabled=false;fail(e);});});
  saveBtn.id="fbEdSave";
  end.appendChild(btn("quiet","Take it away",function(){if(!window.confirm("Take "+path+" away? It goes when you keep the next version; the history keeps it."))return;IngRepo.del(r.id,path).then(function(){sh.close();C.diff={};C.files={};toast(path+" is taken away, as a change to keep.");return refresh();}).then(function(){S.view="changes";paint();},fail);}));
  end.appendChild(btn("quiet","Rename",function(){sheetName("A new name for "+path,"Its new path in the app.",function(p){p=String(p).replace(/^\/+/,"");if(!p||p===path)return;return IngRepo.move(r.id,path,p).then(function(){sh.close();C.diff={};C.files={};toast(path+" is now "+p+", as a change to keep.");return refresh();}).then(function(){S.view="changes";paint();});});}));
  end.appendChild(btn("","Close",function(){if(dirty&&!window.confirm("Close without saving your change to "+path+"?"))return;sh.close();}));end.appendChild(saveBtn);sh.box.appendChild(end);
  ta.addEventListener("keydown",function(e){if((e.ctrlKey||e.metaKey)&&(e.key==="s"||e.key==="S")){e.preventDefault();e.stopPropagation();saveBtn.click();return;}
    if(e.key==="Tab"&&!e.shiftKey&&!e.ctrlKey&&!e.metaKey&&!e.altKey){e.preventDefault();var s0=ta.selectionStart,e0=ta.selectionEnd;ta.value=ta.value.slice(0,s0)+"  "+ta.value.slice(e0);ta.selectionStart=ta.selectionEnd=s0+2;ta.oninput();}});
  load(path);setTimeout(function(){try{ta.focus();}catch(e){}},80);}
/* the Build page holds a page of any size, part by part; what is saved there comes back here as a change to keep (R138) */
function openInBuild(r,path){if(!window.IngBuild||typeof IngBuild.open!=="function"){toast("The Build page in this copy cannot take an app.");return;}
  busy("Opening "+r.name+" in Build…");IngRepo.files(r.id).then(function(list){var p=path||(list.filter(function(f){return /\.html?$/i.test(f.path)&&f.path.indexOf("/")<0;})[0]||list.filter(function(f){return /\.html?$/i.test(f.path);})[0]||{}).path;
    if(!p)throw new Error("there is no page in "+r.name+" to open");return IngRepo.readText(r.id,p).then(function(t){unbusy();IngBuild.open({name:p.split("/").pop(),text:t||"",repo:r.id,path:p,title:r.name});});},function(e){unbusy();fail(e);});}
window.fbFromBuild=function(repoId,path,text){return IngRepo.put(repoId,path,text).then(function(){C.diff={};C.files={};return refresh();}).then(function(){if(cur()&&cur().id===repoId){S.view="changes";S.cmp=null;S.file=0;}if($("fb"))paint();return true;});};
/* the releases: each version that has a release name or packages, newest first, with what was made from it; a package kept
   here saves again with no making (GitHub's Releases page, on the device) */
function paintReleases(r,w,f){if(!r.head){w.appendChild(h("div","f-empty","<b>No releases yet</b>Keep a first version, test it, and make its packages: they are kept here with the version they came from."));return;}
  var key=r.id+"|rel",have=C.log[key];
  if(!have){w.appendChild(h("div","f-empty","Reading the releases…"));Promise.all([IngRepo.log(r.id,{max:200}),MADE.list(r.id)]).then(function(x){var log=x[0],made=x[1],by={};made.forEach(function(m){(by[m.commit]=by[m.commit]||[]).push(m);});
      var rows=log.filter(function(c){return by[c.oid]||c.names.some(function(n){return r.tags.indexOf(n)>=0;});});
      return Promise.all(rows.map(function(c){return IngRepo.notes(r.id,c.oid).then(function(n){return {c:c,made:by[c.oid]||[],notes:n||{}};});}));}).then(function(list){C.log[key]=list;if(cur()&&cur().id===r.id)paintWork();},fail);return;}
  if(!have.length){w.appendChild(h("div","f-empty","<b>No releases yet</b>Mark a version as a release in History, or make its packages under Test and ship: each appears here with the version it came from."));}
  var box=h("div","f-rels");
  have.forEach(function(x,i){var c=x.c,tags=c.names.filter(function(n){return r.tags.indexOf(n)>=0;}),e=h("div","f-rel");e.style.animationDelay=(i*0.04)+"s";
    var t=x.notes.test;e.innerHTML="<b>"+(tags.length?tags.map(function(tg){return '<span class="f-tag">'+esc(tg)+"</span>";}).join(" ")+" ":"")+esc(c.title)+(c.oid===r.head?' <span class="f-chip ok" style="font:600 11px var(--f-sans);padding:1px 8px"><span class="d"></span>the version kept now</span>':"")+"</b>"+
      '<div class="meta"><span>'+esc(when(c.when))+'</span><span class="id" style="font-family:var(--f-mono)">'+esc(c.short)+"</span>"+(t?"<span>"+(t.ok?"tested: passed":"tested: faults found")+"</span>":"<span>not tested</span>")+"</div>";
    if(!x.made.length)e.appendChild(h("p","f-hint","No package of this version is kept on this device."+(c.oid===r.head?" Make them under Test and ship.":"")));
    x.made.forEach(function(m){var a=h("div","f-asset");a.innerHTML='<span class="nm">'+esc(m.name)+'</span><span class="sz">'+kb(m.size)+" · "+esc(when(m.at))+"</span>";
      a.appendChild(btn("quiet sm","Save it again",function(){MADE.bytes(m.key).then(function(b){if(!b)throw new Error("it is no longer kept here: make it again");return saveBytes(m.name,m.mime,b);}).then(function(){toast("Saved: "+m.name+".");},fail);}));
      a.appendChild(btn("quiet sm","Remove",function(){MADE.del([m.key]).then(function(){delete C.log[key];paintWork();toast(m.name+" is no longer kept here.");},fail);}));e.appendChild(a);});
    box.appendChild(e);});
  w.appendChild(box);
  var ht=headTag(r);
  if(!ht)f.appendChild(btn("","Mark the version kept now as a release",function(){sheetName("Mark a release","A name for this version, as a release: v1, 6.0, autumn.",function(name){return IngRepo.tag(r.id,name,{target:r.head}).then(function(){toast("Release "+name+" marked.");C.log={};return refresh();}).then(paint);});}));
  f.appendChild(btn(ht?"pri":"","Make its packages",function(){S.panel="ship";if(one())setPanel("ship");var e=$("fbTargets");if(e)e.scrollIntoView({block:"nearest",behavior:"smooth"});toast("Choose the packages on the right, then Make the chosen.");}));}

/* ---------- Code and Fabrica keep the same files ---------- */
function projFor(r){var id=FBS().links[r.id];if(!id)return null;try{return (state.projects||[]).filter(function(p){return p.id===id;})[0]||null;}catch(e){return null;}}
function isText(path,u8){if(/\.(png|jpe?g|gif|webp|ico|woff2?|ttf|otf|pdf|zip|gz|wasm|mp3|mp4|m4a|ogg|wav|webm|avif|jks|keystore|p12)$/i.test(path))return false;var n=Math.min(u8.length,4096);for(var i=0;i<n;i++)if(u8[i]===0)return false;return true;}
function openInCode(r,path){if(typeof ccMakeProject!=="function"||typeof ccNewSession!=="function"){toast("Code is not in this build.");return;}
  busy("Opening "+r.name+" in Code…");var pr=projFor(r);
  IngRepo.files(r.id).then(function(list){var td=new TextDecoder(),chain=Promise.resolve(),files=[];
    list.forEach(function(f){chain=chain.then(function(){return IngRepo.read(r.id,f.path).then(function(b){if(b&&isText(f.path,b)&&b.length<40*1048576)files.push({name:f.path,text:td.decode(b)});});});});
    return chain.then(function(){return files;});}).then(function(files){
    if(!pr){var main=path||(files.filter(function(f){return /\.html?$/i.test(f.name)&&f.name.indexOf("/")<0;})[0]||files[0]||{}).name||"";return ccMakeProject(r.name,files,main).then(function(p){FBS().links[r.id]=p.id;saveSoon();return p;});}
    return ccLoadAll(pr).then(function(){var have={};(pr.files||[]).forEach(function(f){have[f.name]=f;});var q=Promise.resolve();
      files.forEach(function(f){var x=have[f.name];if(x){if(x.text!==f.text)q=q.then(function(){return ccPut(x,f.text);});}else{var nf={name:f.name,ref:null,size:0};pr.files.push(nf);q=q.then(function(){return ccPut(nf,f.text);});}});
      if(path&&have[path])pr.main=path;return q.then(function(){return pr;});});}).then(function(p){unbusy();FBS().linksBack=FBS().linksBack||{};FBS().linksBack[p.id]=r.id;saveSoon();ccNewSession(p);go("code");},function(e){unbusy();fail(e);});}
/* what Code changed comes back here as changes to keep */
function syncFromCode(r){var pr=r&&projFor(r);if(!pr||typeof ccLoadAll!=="function")return Promise.resolve(false);
  return ccLoadAll(pr).then(function(){var fs=(pr.files||[]).filter(function(f){return typeof f.text==="string";}),q=Promise.resolve(),puts=[];
    fs.forEach(function(f){q=q.then(function(){return IngRepo.readText(r.id,f.name).then(function(t){if(t!==f.text)puts.push({path:f.name,data:f.text});});});});
    return q.then(function(){if(!puts.length)return false;return IngRepo.putMany(r.id,puts).then(function(){C.diff={};C.files={};return true;});});}).then(function(changed){
      /* what came back from Code is shown at once, as changes to keep */
      if(changed)return refresh().then(function(){if(cur()&&cur().id===r.id&&S.view!=="changes"){S.view="changes";S.cmp=null;S.file=0;}paint();return true;});return false;}).catch(function(){return false;});}

/* ---------- the page in Ingenium: its place in the rail, its section, its turn in go() ---------- */
function install(){if($("page-fabrica"))return;
  var sec=h("section","section fb-page");sec.id="page-fabrica";sec.innerHTML='<h1 class="page-title">Fabrica</h1><p class="lede">Your own GitHub, on this device.</p><div id="fbHost"></div>';
  var after=$("page-build")||$("page-lector");if(after&&after.parentNode)after.parentNode.insertBefore(sec,after.nextSibling);else document.querySelector(".main").appendChild(sec);
  var nb=document.querySelector('.nav-btn[data-page="build"]')||document.querySelector('.nav-btn[data-page="lector"]');
  if(nb){var b=h("button","nav-btn");b.type="button";b.setAttribute("data-page","fabrica");b.setAttribute("onclick","go('fabrica')");
    b.innerHTML='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="6" cy="5" r="2.2"/><circle cx="6" cy="19" r="2.2"/><circle cx="18" cy="9" r="2.2"/><path d="M6 7.2v9.6M18 11.2c0 3.6-4.5 3.9-9.9 5.4"/></svg>Fabrica';nb.parentNode.insertBefore(b,nb.nextSibling);}
  if(window.PAGES&&PAGES.indexOf("fabrica")<0)PAGES.push("fabrica");}
function render(){if(!$("fb")){build();}refresh().then(function(){paint();layoutSoon();var r=cur();if(r)syncFromCode(r);},function(e){paint();fail(e);});}
install();
try{var og=go;go=function(p){var r=og.apply(this,arguments);try{document.body.classList.toggle("fb-on",p==="fabrica");/* R123: on a narrow screen Fabrica always opens on Your apps (the owner's word); choosing an app moves to its work */
    if(p==="fabrica"){S.panel="apps";if(one())setPanel("apps");render();setTimeout(fit,120);}}catch(e){try{console.error("R112",e);}catch(_){}}return r;};window.go=go;}catch(e){}
window.addEventListener("resize",function(){if($("fb"))layoutSoon();});
try{new MutationObserver(function(){if($("fb")&&$("page-fabrica").classList.contains("active"))paint();}).observe(document.body,{attributes:true,attributeFilter:["data-theme"]});}catch(e){}
/* the engine's author line: her name on every version */
try{var nm=(state&&state.profile&&state.profile.name)||(state&&state.userName)||"";if(nm)IngRepo.setAuthor({name:nm});}catch(e){}
try{if($("page-fabrica").classList.contains("active")){document.body.classList.add("fb-on");render();}}catch(e){}
window.fbRender=render;window.fbSync=syncFromCode;
/* 6.1 · what R140 (GitHub's own views) works with */
window.fbHubHost={S:S,C:C,cur:cur,FBS:FBS,saveSoon:saveSoon,h:h,esc:esc,btn:btn,kb:kb,when:when,toast:toast,fail:fail,sheet:sheet,sheetName:sheetName,busy:busy,unbusy:unbusy,
  refresh:refresh,paint:paint,paintWork:paintWork,thumbs:thumbs,diffList:diffList,openEditor:openEditor,saveBytes:saveBytes,mimeOf:mimeOf,notesOf:notesOf,statusOf:statusOf,setPanel:setPanel,one:one,
  pkgOf:pkgOf,appOf:appOf,sealEl:sealEl,draftMessage:draftMessage};
/* R114: Code opened on an app, with something to say once it is open */
window.fbOpenInCode=function(r,path,after){openInCode(r,path);if(after)setTimeout(after,900);};
})();
;try{window.__ingParts["p44"]="running";}catch(_){}
</script>
