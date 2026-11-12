<style id="r188-css">
/* 6.8.3 · THE CAREER STUDIO (modules/r188.js), in Lector's own look: the same faces, raised panels, keys, steps and
   choices (r107), by day and by night; the room keys are Settings' own (r173). Nothing on the page scrolls but the panels. */
#page-career{--rm-pa:#7348be;--rm-pb:#5d37a1;--rm-pedge:#4b2a86;--rm-pledge:#3a2070;
  --rm-psh:inset 0 1px 0 rgba(255,255,255,.24),0 1px 0 #3a2070,0 3px 6px rgba(52,24,100,.26),0 8px 14px rgba(52,24,100,.12);--rm-focus:var(--accent,#6a3fb5)}
body[data-theme="night"] #page-career{--rm-pa:#7a56c8;--rm-pb:#5b3aa1;--rm-pedge:#2c1956;--rm-pledge:#170b30;
  --rm-psh:inset 0 1px 0 rgba(255,255,255,.14),0 1px 0 #170b30,0 3px 6px rgba(0,0,0,.45),0 8px 14px rgba(0,0,0,.3);--rm-focus:var(--accent-bright,#c9b2f2)}
#page-career > .page-title,#page-career > .lede{display:none !important}
#cs{--c-card:#ffffff;--c-a:#ffffff;--c-b:#f9f7fc;--c-ink1:#221a2e;--c-ink2:#4a4358;--c-ink3:#6c6579;--c-hair:rgba(34,26,46,.10);--c-hair2:rgba(34,26,46,.06);
  --c-acc:#6a3fb5;--c-accs:rgba(106,63,181,.10);--c-ring:rgba(106,63,181,.5);--c-ok:#2f7a55;--c-oks:rgba(47,122,85,.12);--c-warn:#9a6212;--c-warns:rgba(184,121,31,.13);--c-bad:#a8423e;--c-bads:rgba(184,67,63,.11);
  --c-bevel:rgba(255,255,255,.85);
  --c-slab:inset 0 1px 0 var(--c-bevel),inset 0 -1px 0 rgba(40,22,68,.05),0 1px 0 rgba(40,22,68,.10),0 3px 0 rgba(40,22,68,.05),0 6px 12px rgba(40,22,68,.07),0 18px 36px rgba(40,22,68,.08);
  --c-pop:inset 0 -1.5px 0 rgba(40,22,68,.13),0 2px 0 rgba(40,22,68,.25),0 4px 5px rgba(40,22,68,.16),0 9px 14px rgba(40,22,68,.10);
  --c-pophi:inset 0 -1.5px 0 rgba(40,22,68,.13),0 3px 0 rgba(40,22,68,.25),0 6px 8px rgba(40,22,68,.18),0 13px 20px rgba(40,22,68,.12);
  --c-press:inset 0 2px 5px rgba(40,22,68,.22),0 1px 1px rgba(40,22,68,.18);
  --c-well:inset 0 1px 2.5px rgba(40,22,68,.08);--c-wellbg:rgba(34,26,46,.03);
  --c-pill:inset 0 1px 0 rgba(255,255,255,.6),inset 0 -1.5px 0 rgba(40,20,70,.10),0 1px 0 rgba(40,20,70,.12),0 3px 4px rgba(40,20,70,.09),0 7px 10px rgba(40,20,70,.06);
  --c-pa:#7348be;--c-pb:#5d37a1;--c-pedge:#4b2a86;--c-pledge:#3a2070;
  --c-psh:inset 0 1px 0 rgba(255,255,255,.16),0 2px 0 var(--c-pledge),0 4px 6px rgba(40,22,68,.24),0 9px 16px rgba(40,22,68,.16);
  --c-pshhi:inset 0 1px 0 rgba(255,255,255,.18),0 3px 0 var(--c-pledge),0 6px 9px rgba(40,22,68,.26),0 13px 22px rgba(40,22,68,.18);
  --c-ppress:inset 0 2px 6px rgba(20,8,40,.45),0 1px 1px rgba(40,22,68,.2);
  --c-spring:cubic-bezier(.34,1.35,.64,1);
  --c-serif:"Iowan Old Style","Palatino Linotype",Palatino,"Book Antiqua",Georgia,"Times New Roman",serif;
  --c-sans:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif;--c-mono:ui-monospace,"SF Mono",Menlo,Consolas,"Liberation Mono",monospace;
  --c-h:640px;position:relative;display:flex;flex-direction:column;gap:12px;height:var(--c-h);min-height:440px;color:var(--c-ink1);font:14px/1.5 var(--c-sans)}
body[data-theme="night"] #cs{--c-card:#201a2b;--c-a:#2a2239;--c-b:#251e33;--c-ink1:#f3eefb;--c-ink2:#d3c9e3;--c-ink3:#a99cc1;--c-hair:rgba(205,184,240,.11);--c-hair2:rgba(205,184,240,.07);
  --c-acc:#b79ce6;--c-accs:rgba(183,156,230,.14);--c-ring:rgba(183,156,230,.45);--c-ok:#7fd1a6;--c-oks:rgba(127,209,166,.14);--c-warn:#e5b56a;--c-warns:rgba(229,181,106,.13);--c-bad:#ef9a95;--c-bads:rgba(239,154,149,.12);
  --c-bevel:rgba(255,255,255,.06);
  --c-slab:inset 0 1px 0 var(--c-bevel),inset 0 -1px 0 rgba(0,0,0,.35),0 1px 0 rgba(0,0,0,.6),0 3px 0 rgba(0,0,0,.28),0 6px 12px rgba(0,0,0,.35),0 18px 36px rgba(0,0,0,.4);
  --c-pop:inset 0 1px 0 rgba(255,255,255,.07),inset 0 -2px 0 rgba(0,0,0,.45),0 2px 0 rgba(0,0,0,.75),0 4px 5px rgba(0,0,0,.50),0 9px 14px rgba(0,0,0,.36);
  --c-pophi:inset 0 1px 0 rgba(255,255,255,.08),inset 0 -2px 0 rgba(0,0,0,.45),0 3px 0 rgba(0,0,0,.75),0 6px 8px rgba(0,0,0,.52),0 13px 20px rgba(0,0,0,.40);
  --c-press:inset 0 2px 6px rgba(0,0,0,.6),0 1px 1px rgba(0,0,0,.4);--c-well:inset 0 1px 3px rgba(0,0,0,.4);--c-wellbg:rgba(10,6,18,.35);
  --c-pill:inset 0 1px 0 rgba(255,255,255,.09),inset 0 -1.5px 0 rgba(0,0,0,.4),0 1px 0 rgba(0,0,0,.5),0 3px 5px rgba(0,0,0,.4),0 8px 12px rgba(0,0,0,.3);
  --c-pa:#7a56c8;--c-pb:#5b3aa1;--c-pedge:#2c1956;--c-pledge:#170b30;
  --c-psh:inset 0 1px 0 rgba(255,255,255,.14),0 2px 0 var(--c-pledge),0 4px 6px rgba(0,0,0,.5),0 9px 16px rgba(0,0,0,.36);
  --c-pshhi:inset 0 1px 0 rgba(255,255,255,.16),0 3px 0 var(--c-pledge),0 6px 9px rgba(0,0,0,.52),0 13px 22px rgba(0,0,0,.4)}
#cs *{box-sizing:border-box;scrollbar-width:thin;scrollbar-color:var(--c-hair) transparent}
/* 6.38 (her note, 6 November 2026: "I want the fonts and sizes of the newly added pages and sections of Ingenium to match the rest of the app ... I don't want big bulky texts or buttons"): this rule outranked the studio's keys (#cs button:not(.rm-tab) beats #cs .c-btn), drawing them at 14px and 40px high;
   it now gives way (:where), so they take the 13px they were written with */
#cs button:where(:not(.rm-tab)){font:inherit;color:inherit;margin:0}
#cs :focus-visible{outline:2px solid var(--c-acc);outline-offset:2px}
/* the head: the name and a line, and the rooms */
#cs .c-head{display:flex;align-items:flex-end;gap:12px 18px;flex-wrap:wrap;flex:0 0 auto}
#cs .c-head h1{font:600 25px/1.1 var(--c-serif);margin:0;letter-spacing:.045em}
#cs .c-head p{margin:4px 0 0;color:var(--c-ink2);font-size:14px;max-width:58ch}
#cs .c-head .rm-tabs{flex:0 1 auto;margin-left:auto;justify-content:flex-end}
#cs .c-head .rm-tab{min-height:38px;padding:7px 14px 7px 11px}
/* the two panels */
#cs #csHost{flex:1 1 auto;min-height:0;display:flex;flex-direction:column}
#cs .c-panels{flex:1 1 auto;min-height:0;display:grid;gap:16px;grid-template-columns:minmax(250px,300px) minmax(0,1fr);grid-template-rows:minmax(0,1fr)}
#cs .c-pn{min-width:0;min-height:0;display:flex;flex-direction:column;background:var(--c-card);border:1px solid var(--c-hair);border-radius:14px;overflow:hidden;box-shadow:var(--c-slab)}
#cs .c-rise .c-pn{animation:cRise .55s var(--c-spring) backwards}#cs .c-rise .c-work{animation-delay:.06s}
@keyframes cRise{from{opacity:0;transform:perspective(1400px) rotateX(5deg) translateY(14px) scale(.988)}to{opacity:1;transform:none}}
body[data-motion="minimal"] #cs .c-pn,body[data-calm="1"] #cs .c-pn{animation:none !important}
@media (prefers-reduced-motion:reduce){#cs .c-pn,#cs .c-btn,#cs .c-steps li{animation:none !important;transition:none !important}}
#cs .c-pn-h{display:flex;align-items:center;gap:8px;padding:12px 14px 11px;border-bottom:1px solid var(--c-hair2);flex:0 0 auto;min-height:52px;background:linear-gradient(var(--c-a),var(--c-b));box-shadow:inset 0 1px 0 var(--c-bevel)}
#cs .c-pn-h h2{font:600 15.5px/1.25 var(--c-serif);letter-spacing:.05em;color:var(--c-ink1);margin:0;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;flex:1 1 auto}
#cs .c-pn-h .c-chip,#cs .c-pn-h .c-btn{flex:0 0 auto}
#cs .c-pn-b{flex:1 1 auto;min-height:0;overflow:auto;overscroll-behavior:contain;display:flex;flex-direction:column}
#cs .c-list .c-pn-b{padding:10px;gap:8px}
#cs .c-pn-f{flex:0 0 auto;border-top:1px solid var(--c-hair2);padding:10px 14px 12px;display:flex;align-items:center;gap:8px;flex-wrap:wrap;background:linear-gradient(var(--c-b),var(--c-a));min-height:54px}
#cs .c-pn-f:empty{display:none}
#cs .c-grow{flex:1 1 auto}
#cs .c-btn.c-back{display:none}
/* keys, raised and springing, as Lector's */
#cs .c-btn{position:relative;display:inline-flex;align-items:center;justify-content:center;gap:6px;border:1px solid var(--c-hair);background:linear-gradient(var(--c-a),var(--c-b));border-radius:10px;padding:7px 13px;font-size:13px;font-weight:600;cursor:pointer;white-space:nowrap;box-shadow:var(--c-pop);color:var(--c-ink1);
  transition:transform .16s var(--c-spring),box-shadow .16s ease}
#cs .c-btn:hover{transform:translateY(-2px);box-shadow:var(--c-pophi)}
#cs .c-btn:active{transform:translateY(1px) scale(.985);box-shadow:var(--c-press);transition-duration:.06s}
#cs .c-btn.pri{background:linear-gradient(var(--c-pa),var(--c-pb));border-color:var(--c-pedge);color:#fff;box-shadow:var(--c-psh);text-shadow:0 1px 1px rgba(30,10,60,.35)}
#cs .c-btn.pri:hover{box-shadow:var(--c-pshhi)}#cs .c-btn.pri:active{box-shadow:var(--c-ppress)}
#cs .c-btn.sm{padding:5px 11px;font-size:12.5px;border-radius:999px}
#cs .c-btn.quiet{border-color:transparent;background:transparent;box-shadow:none;color:var(--c-acc);padding:5px 7px}
#cs .c-btn.quiet:hover{transform:none;text-decoration:underline}
#cs .c-btn.c-danger{color:var(--c-bad)}
#cs .c-chip{display:inline-flex;align-items:center;gap:6px;font-size:12px;font-weight:600;border-radius:999px;padding:3px 10px;background:linear-gradient(var(--c-a),var(--c-b));border:1px solid var(--c-hair);color:var(--c-ink2);white-space:nowrap;box-shadow:var(--c-pill)}
#cs .c-chip i{width:8px;height:8px;border-radius:50%;background:currentColor}
#cs .c-chip.c-ok,#cs .c-band-strong{color:var(--c-ok)}#cs .c-band-good{color:#3c7f8c}#cs .c-band-possible{color:#4f73ad}#cs .c-band-stretch{color:var(--c-warn)}#cs .c-band-poor{color:var(--c-bad)}
body[data-theme="night"] #cs .c-band-possible{color:#9db8e8}body[data-theme="night"] #cs .c-band-good{color:#8fd0d8}
/* a row of choices: the chosen one raised and purple */
#cs .c-seg{display:inline-flex;gap:2px;border:1px solid var(--c-hair);border-radius:999px;padding:3px;background:var(--c-wellbg);box-shadow:var(--c-well);max-width:100%;overflow-x:auto;flex:0 0 auto;align-self:flex-start}
#cs .c-seg button{border:1px solid transparent;background:transparent;border-radius:999px;padding:5px 12px;font-size:12.5px;font-weight:600;cursor:pointer;color:var(--c-ink3);white-space:nowrap}
#cs .c-seg button:hover{color:var(--c-ink1)}
#cs .c-seg button[aria-pressed="true"]{color:#fff;background:linear-gradient(var(--c-pa),var(--c-pb));border-color:var(--c-pedge);box-shadow:var(--c-psh);text-shadow:0 1px 1px rgba(30,10,60,.3)}
/* the steps of an application, as Lector's: numbered, the one in hand raised, the ones done ticked */
#cs .c-steps{display:flex;gap:6px;list-style:none;margin:0;padding:10px 14px;align-items:center;flex-wrap:nowrap;overflow-x:auto;border-bottom:1px solid var(--c-hair2);flex:0 0 auto;background:var(--c-card)}
#cs .c-steps li{display:flex;align-items:center}
#cs .c-steps li button{display:flex;align-items:center;gap:6px;font-size:12.5px;font-weight:600;color:var(--c-ink3);padding:4px 11px 4px 5px;border-radius:999px;border:1px solid var(--c-hair);background:linear-gradient(var(--c-a),var(--c-b));box-shadow:var(--c-pill);height:30px;white-space:nowrap;cursor:pointer;transition:transform .16s var(--c-spring)}
#cs .c-steps li button:hover{transform:translateY(-1px)}
#cs .c-steps li i{font-style:normal;width:19px;height:19px;border-radius:50%;display:inline-grid;place-items:center;font-size:11px;background:var(--c-wellbg);box-shadow:var(--c-well)}
#cs .c-steps li.done button{color:var(--c-ink2)}#cs .c-steps li.done i{background:var(--c-oks);color:var(--c-ok);box-shadow:none}
#cs .c-steps li.now button{color:var(--c-acc);font-weight:700;border-color:var(--c-ring);transform:translateY(-2px);box-shadow:var(--c-pophi)}
#cs .c-steps li.now i{background:linear-gradient(var(--c-pa),var(--c-pb));color:#fff;box-shadow:0 1px 0 var(--c-pledge),0 2px 4px rgba(40,22,68,.25)}
#cs .c-steps .sep{width:10px;height:2px;border-radius:2px;background:var(--c-hair);flex:0 0 auto}
/* the list: an application, a part, a goal, a lesson */
#cs .c-opp,#cs .c-item{display:flex;flex-direction:column;gap:3px;width:100%;text-align:left;border:1px solid var(--c-hair);border-radius:12px;background:linear-gradient(var(--c-a),var(--c-b));padding:10px 12px;cursor:pointer;box-shadow:var(--c-pill);color:var(--c-ink1);
  transition:transform .16s var(--c-spring),box-shadow .16s ease;flex:0 0 auto}
#cs .c-opp:hover,#cs .c-item:hover{transform:translateY(-1px);box-shadow:var(--c-pop)}
#cs .c-opp[aria-current="true"],#cs .c-item[aria-current="true"]{border-color:var(--c-ring);box-shadow:var(--c-pop),inset 3px 0 0 var(--c-acc)}
#cs .c-opp b,#cs .c-item b{font:600 14.5px/1.3 var(--c-serif);letter-spacing:.01em}
#cs .c-opp small,#cs .c-item small{color:var(--c-ink3);font-size:12px;line-height:1.4}
#cs .c-opp .c-tags{display:flex;flex-wrap:wrap;gap:5px;margin-top:3px}
#cs .c-soon{color:var(--c-warn) !important;font-weight:600}#cs .c-gone{opacity:.8}
#cs .c-item.c-pin{background:linear-gradient(var(--c-accs),transparent),linear-gradient(var(--c-a),var(--c-b))}
#cs .c-item[aria-current="true"],#cs .c-opp[aria-current="true"]{background:linear-gradient(var(--c-accs),transparent),linear-gradient(var(--c-a),var(--c-b))}
#cs .c-item.c-new b::after{content:"";display:inline-block;width:7px;height:7px;border-radius:50%;background:var(--c-acc);margin-left:7px;vertical-align:middle}
#cs .c-item[class*="c-dot-"] b::before{content:"";display:inline-block;width:8px;height:8px;border-radius:50%;margin-right:7px;vertical-align:middle;background:var(--c-ink3)}
#cs .c-item.c-dot-met b::before{background:var(--c-ok)}#cs .c-item.c-dot-partly b::before{background:var(--c-warn)}#cs .c-item.c-dot-none b::before{background:var(--c-bad)}
#cs .c-item.c-has small{color:var(--c-ok)}
#cs details.cs-fold>summary{cursor:pointer;font-weight:600;color:var(--c-ink2);font-size:13px;padding:6px 4px}
#cs .c-label{font-size:11.5px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:var(--c-ink3);margin:8px 2px 0}
/* the work: padding, columns, splits, wells */
#cs .c-pad{padding-left:16px;padding-right:16px}
#cs .c-col{display:flex;flex-direction:column;gap:12px;min-width:0}
#cs .c-fill{flex:1 1 auto;min-height:0;padding:14px 16px}
#cs .c-cols{display:grid;grid-template-columns:minmax(260px,.9fr) minmax(0,1.3fr);gap:18px;padding:14px 16px}
#cs .c-grid2{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px}
#cs .c-grid3{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px;align-items:end}
#cs .c-row{display:flex;flex-wrap:wrap;gap:8px 12px;align-items:flex-end}
#cs .c-row .field{flex:1 1 220px;margin:0}
#cs .c-tight{align-items:center;justify-content:space-between;gap:8px}
#cs .c-split{flex:1 1 auto;min-height:0;display:grid;grid-template-columns:minmax(200px,250px) minmax(0,1fr)}
#cs .c-nav{border-right:1px solid var(--c-hair2);padding:10px;display:flex;flex-direction:column;gap:7px;overflow:auto;min-height:0}
#cs .c-nav .c-item{padding:8px 10px}#cs .c-nav .c-item b{font-size:13.5px}
#cs .c-pane{display:flex;flex-direction:column;gap:10px;padding:14px 16px;min-width:0;min-height:0;overflow:auto}
#cs .c-area{display:flex;flex-direction:column;min-height:240px}
#cs .c-paper{flex:1 1 auto;width:100%;min-height:320px;border:1px solid var(--c-hair);border-radius:10px;background:#fff;box-shadow:var(--c-well)}
#cs .c-well{border:1px solid var(--c-hair);border-radius:10px;background:var(--c-wellbg);box-shadow:var(--c-well);padding:12px 14px}
#cs .c-text{white-space:pre-wrap;font-size:13.5px;line-height:1.55;color:var(--c-ink2);overflow:auto;min-height:120px}
#cs .c-mail{white-space:pre-wrap;font-size:14px;line-height:1.6;color:var(--c-ink1);overflow:auto;flex:1 1 auto}
#cs .c-ta{width:100%;min-height:96px;font:14px/1.55 var(--c-sans);padding:10px 12px;border-radius:10px;border:1px solid var(--c-hair);background:var(--c-wellbg);box-shadow:var(--c-well);color:var(--c-ink1);resize:vertical}
#cs .c-ta.c-grow{flex:1 1 auto;min-height:150px;resize:none}
#cs .c-ta.c-mono{font:13px/1.55 var(--c-mono)}
#cs input[type=date],#cs input[type=url]{font:13.5px var(--c-sans);color:var(--c-ink1);padding:7px 10px;border:1px solid var(--c-hair);border-radius:9px;background:var(--c-wellbg);box-shadow:var(--c-well);min-height:34px;width:100%}
body[data-theme="night"] #cs input[type=date]{color-scheme:dark}
#cs .c-sel{font:600 13px var(--c-sans);color:var(--c-ink1);background:linear-gradient(var(--c-a),var(--c-b));border:1px solid var(--c-hair);border-radius:10px;padding:6px 9px;box-shadow:var(--c-pill);max-width:100%}
#cs .field{margin:0}
#cs .c-note{font-size:12.5px;color:var(--c-ink3);line-height:1.5;margin:0}
#cs .c-h3{font:600 15px/1.3 var(--c-serif);letter-spacing:.03em;margin:4px 0 0;color:var(--c-ink1)}
#cs .c-empty{margin:auto;max-width:46ch;text-align:center;padding:28px 18px}
#cs .c-empty h3{font:600 16.5px/1.3 var(--c-serif);letter-spacing:.03em;margin:0 0 8px}
#cs .c-empty p{color:var(--c-ink2);font-size:14px;line-height:1.6;margin:0}
/* how the studio works, and the lessons */
#cs .c-motto{margin:18px 18px 6px;padding:12px 16px;border-left:3px solid var(--c-acc);font:italic 16px/1.5 var(--c-serif);color:var(--c-ink2);background:var(--c-accs);border-radius:0 10px 10px 0}
#cs .c-motto.c-small{font-size:13.5px;margin:0 0 4px;padding:10px 12px}
/* 6.8.5: each card is a key, her words (28 October 2026): "I want the cards on the 'How the Studio Works' on the Career page
   to be clickable and animated. I want to be able to click on them for additional details or just because it would feel
   nice to be able to click on those cards." They rise into place, lift under the pointer, sink when pressed; pressed, a
   card stays where it is, raised and ringed, and beneath the four opens what that part of the studio does, with a key into
   it; pressed again, it closes. Nothing on the panel moves out from under the pointer. */
#cs .c-how{list-style:none;margin:10px 18px;padding:0;display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px;align-items:start}
#cs .c-how > li{position:relative;min-width:0;border:1px solid var(--c-hair);border-radius:12px;background:linear-gradient(var(--c-a),var(--c-b));box-shadow:var(--c-pill);
  transition:transform .3s var(--c-spring),box-shadow .25s ease,border-color .2s ease;animation:cHowRise .5s var(--c-spring) backwards}
#cs .c-how > li:nth-child(2){animation-delay:.05s}#cs .c-how > li:nth-child(3){animation-delay:.1s}#cs .c-how > li:nth-child(4){animation-delay:.15s}
#cs .c-how > li:hover{transform:translateY(-3px);box-shadow:var(--c-pophi);border-color:var(--c-ring)}
#cs .c-how > li:has(> .c-howk:active){transform:translateY(1px) scale(.992);box-shadow:var(--c-press);transition-duration:.06s}
#cs .c-how > li.c-open{border-color:var(--c-acc);box-shadow:var(--c-pophi),0 0 0 1.5px var(--c-ring);transform:translateY(-2px);animation:cHowOpen .45s var(--c-spring)}
#cs .c-howk{display:grid;grid-template-columns:auto 1fr auto;gap:2px 10px;width:100%;margin:0;padding:12px 14px;border:0;border-radius:12px;background:none;text-align:left;cursor:pointer;color:var(--c-ink1);font:inherit;-webkit-tap-highlight-color:transparent;touch-action:manipulation}
#cs .c-howk:focus{outline:none}#cs .c-howk:focus-visible{outline:2.5px solid var(--c-ring);outline-offset:3px}
#cs .c-howk b{grid-column:2}
#cs .c-howk .c-howm{grid-column:3;grid-row:1;align-self:start;display:inline-flex;align-items:center;gap:6px;font-style:normal;font-size:12px;font-weight:600;color:var(--c-acc);white-space:nowrap;padding-top:2px}
#cs .c-howk .c-howm::after{content:"";width:6px;height:6px;border-right:1.7px solid currentColor;border-bottom:1.7px solid currentColor;transform:translateY(-2px) rotate(45deg);transition:transform .3s var(--c-spring)}
#cs .c-howk[aria-expanded="true"] .c-howm::after{transform:translateY(2px) rotate(-135deg)}
#cs .c-howk .c-howt{grid-column:2/-1}
#cs .c-howk[aria-expanded="true"] i{animation:cHowPulse .55s var(--c-spring)}
#cs .c-howd{margin:2px 18px 10px;padding:14px 18px 16px;border:1px solid var(--c-ring);border-radius:12px;background:linear-gradient(var(--c-a),var(--c-b));box-shadow:var(--c-pophi);animation:cHowIn .4s var(--c-spring) both}
#cs .c-howd h3{margin:0 0 8px;font:600 15.5px/1.3 var(--c-serif);color:var(--c-ink1)}
#cs .c-howd[hidden]{display:none}
#cs .c-howd ul{margin:2px 0 0;padding:0 0 0 18px;display:flex;flex-direction:column;gap:6px;max-width:78ch}
#cs .c-howd ul li{font-size:13.5px;line-height:1.55;color:var(--c-ink1)}#cs .c-howd ul li::marker{color:var(--c-acc)}
#cs .c-howd .c-btn{margin-top:12px}
@keyframes cHowRise{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}
@keyframes cHowOpen{0%{transform:scale(.985)}60%{transform:scale(1.006)}100%{transform:none}}
@keyframes cHowIn{from{opacity:0;transform:translateY(-6px)}to{opacity:1;transform:none}}
@keyframes cHowPulse{0%{transform:scale(1)}45%{transform:scale(1.22)}100%{transform:scale(1)}}
body[data-motion="minimal"] #cs .c-how > li,body[data-calm="1"] #cs .c-how > li,body[data-motion="minimal"] #cs .c-howd,body[data-calm="1"] #cs .c-howd,body[data-motion="minimal"] #cs .c-howk i,body[data-calm="1"] #cs .c-howk i{animation:none !important;transition:none !important}
@media (prefers-reduced-motion:reduce){#cs .c-how > li,#cs .c-howd,#cs .c-howk i,#cs .c-howk .c-howm::after{animation:none !important;transition:none !important}}
/* what a draft speaks to, and the improving of it */
#cs .c-count{margin:0}#cs .c-count b{color:var(--c-ink1);font-weight:600}#cs .c-count .c-over{color:var(--c-bad);font-weight:600}
#cs .c-cover{display:flex;flex-wrap:wrap;align-items:center;gap:6px 10px;padding:8px 12px;border-radius:10px;background:var(--c-wellbg);box-shadow:var(--c-well);font-size:12.5px;color:var(--c-ink2);line-height:1.5}
#cs .c-cover b{color:var(--c-ink1)}
#cs .c-improve{display:flex;flex-direction:column;gap:8px;padding:12px;border-radius:12px;border:1px solid var(--c-ring);background:linear-gradient(var(--c-a),var(--c-b));box-shadow:var(--c-pill);animation:cHowIn .35s var(--c-spring) both}
#cs .c-improve .c-tunes{display:flex;flex-wrap:wrap;gap:6px}
#cs .c-improve .c-ta{min-height:72px}
body[data-motion="minimal"] #cs .c-improve,body[data-calm="1"] #cs .c-improve{animation:none}
#cs .c-how li i,#cs .c-lesson li i{font-style:normal;grid-row:span 2;width:24px;height:24px;border-radius:50%;display:inline-grid;place-items:center;font-size:12px;font-weight:700;color:#fff;background:linear-gradient(var(--c-pa),var(--c-pb));box-shadow:0 1px 0 var(--c-pledge)}
#cs .c-howk b{font:600 14.5px/1.3 var(--c-serif)}#cs .c-howk .c-howt{font-size:13px;color:var(--c-ink2);line-height:1.5}
#cs .c-lesson{list-style:none;margin:0;padding:18px 22px;display:flex;flex-direction:column;gap:12px;max-width:72ch}
#cs .c-lesson li{display:grid;grid-template-columns:auto 1fr;gap:12px;align-items:start;font-size:15px;line-height:1.6;color:var(--c-ink1)}
#cs .c-lesson-ol{margin:0 0 0 20px;padding:0;font-size:13.5px;line-height:1.6;color:var(--c-ink2)}#cs .c-lesson-ol li{margin:4px 0}
/* how you fit */
#cs .c-bandcard{border-radius:12px;padding:14px 16px;border:1px solid var(--c-hair);border-left:6px solid var(--c-ink3);background:linear-gradient(var(--c-a),var(--c-b));box-shadow:var(--c-pill)}
#cs .c-bandcard[data-band="strong"]{border-left-color:var(--c-ok)}#cs .c-bandcard[data-band="good"]{border-left-color:#3c7f8c}#cs .c-bandcard[data-band="possible"]{border-left-color:#5f7fb0}#cs .c-bandcard[data-band="stretch"]{border-left-color:var(--c-warn)}#cs .c-bandcard[data-band="poor"]{border-left-color:var(--c-bad)}
#cs .c-bandcard h3{font:600 21px/1.2 var(--c-serif);letter-spacing:.03em;margin:0 0 6px}
#cs .c-bandcard p{margin:4px 0;font-size:13.5px;line-height:1.55;color:var(--c-ink2)}#cs .c-advice{color:var(--c-ink1) !important}
#cs .c-pc,#cs .c-next{margin:0 0 0 18px;padding:0;font-size:13.5px;line-height:1.55;color:var(--c-ink2)}#cs .c-pc li{margin:4px 0}
#cs .c-pc li b{font-size:11.5px;letter-spacing:.06em;text-transform:uppercase;margin-right:4px}#cs .c-pc .for b{color:var(--c-ok)}#cs .c-pc .against b{color:var(--c-bad)}
#cs .c-tab{width:100%;border-collapse:collapse;font-size:13px;line-height:1.45}
#cs .c-tab th,#cs .c-tab td{text-align:left;vertical-align:top;padding:7px 8px;border-top:1px solid var(--c-hair2);color:var(--c-ink2)}
#cs .c-tab th{font-size:11.5px;letter-spacing:.06em;text-transform:uppercase;color:var(--c-ink3);font-weight:700;border-top:0}
#cs .c-tab td:first-child{color:var(--c-ink1)}#cs .c-tab small{display:block;color:var(--c-ink3);font-size:11.5px}
#cs .c-st{white-space:nowrap;font-weight:700;font-size:12px;padding:2px 8px;border-radius:999px}
#cs .c-st[data-st="met"]{color:var(--c-ok);background:var(--c-oks)}#cs .c-st[data-st="transfer"]{color:var(--c-acc);background:var(--c-accs)}
#cs .c-gap{display:inline-block;margin:4px 0 0 4px;white-space:nowrap;font-weight:600;font-size:11.5px;padding:1px 7px;border-radius:999px;border:1px solid var(--c-hair);color:var(--c-ink2)}
#cs .c-gap[data-g="learn"]{border-color:rgba(184,121,31,.35)}#cs .c-gap[data-g="ask"]{border-color:var(--c-ring);color:var(--c-acc)}#cs .c-gap[data-g="hard"]{border-color:rgba(184,67,63,.4);color:var(--c-bad)}
#cs .c-from{display:block;font-weight:600;color:var(--c-ink1);margin-bottom:2px}#cs .c-bridge{display:block}#cs .c-bridge i{font-style:normal;font-weight:600;color:var(--c-acc)}
#cs .c-close{display:block;color:var(--c-ink2);font-size:12px;margin-top:3px}#cs tr.c-tr td{background:linear-gradient(90deg,var(--c-accs),transparent 60%)}
#cs .c-view{font-size:14px;line-height:1.55;color:var(--c-ink1)}
#cs .c-gaps{margin:6px 0 10px 18px;padding:0}#cs .c-gaps li{margin:5px 0;font-size:13px;line-height:1.5}#cs .c-gaps li span{display:block;color:var(--c-ink2)}
#cs .c-think{margin:10px 0 6px;border:1px solid var(--c-hair);border-radius:10px;padding:6px 10px;background:linear-gradient(var(--c-a),var(--c-b))}#cs .c-think summary{cursor:pointer;font-weight:600;font-size:13px;color:var(--c-ink1)}
#cs .c-think-b{white-space:pre-wrap;font:12.5px/1.55 var(--c-sans,inherit);color:var(--c-ink2);max-height:260px;overflow:auto;margin-top:6px}
#cs .c-live-state{font-size:13px;color:var(--c-ink2);margin:0 16px 6px}#cs .c-sofar{margin:0 16px}#cs .c-old{color:var(--c-warn)}#cs .c-st[data-st="partly"]{color:var(--c-warn);background:var(--c-warns)}#cs .c-st[data-st="none"]{color:var(--c-bad);background:var(--c-bads)}
/* practise, and her own draft */
#cs .c-fb{font-size:13.5px;line-height:1.55;padding:11px 13px;border-radius:10px;background:var(--c-accs);border:1px solid var(--c-hair);color:var(--c-ink1);display:flex;flex-direction:column;gap:4px}
#cs .c-fb b{color:var(--c-acc)}
#cs .c-mine{display:grid;grid-template-columns:minmax(0,1fr);gap:12px;min-height:0}
#cs .c-mine:has(.c-fbside){grid-template-columns:minmax(0,1.4fr) minmax(220px,1fr)}
#cs .c-fbside{overflow:auto;align-self:start;max-height:100%}
/* the profile */
#cs .c-srcs{padding:6px 16px 12px}
#cs .c-src{display:flex;gap:12px;align-items:center;padding:11px 0;border-top:1px solid var(--c-hair2)}
#cs .c-src:first-child{border-top:0}#cs .c-src.sub{padding-left:40px}
#cs .c-src .tx{flex:1 1 auto;min-width:0}#cs .c-src .tx b{display:block;font-size:14px}#cs .c-src .tx small{display:block;color:var(--c-ink3);font-size:12.5px;line-height:1.45}
#cs .c-sw-pad{width:38px;flex:0 0 auto}
#cs .c-sw{display:inline-flex;flex:0 0 auto}
#cs .c-sw input,#cs .c-check input{appearance:none;-webkit-appearance:none;width:38px;height:22px;border-radius:999px;background:var(--c-wellbg);border:1px solid var(--c-hair);box-shadow:var(--c-well);position:relative;cursor:pointer;margin:0;transition:background .25s}
#cs .c-sw input::after{content:"";position:absolute;top:2px;left:2px;width:16px;height:16px;border-radius:50%;background:linear-gradient(var(--c-a),var(--c-b));box-shadow:var(--c-pop);transition:transform .35s var(--c-spring)}
#cs .c-sw input:checked{background:linear-gradient(var(--c-pa),var(--c-pb))}#cs .c-sw input:checked::after{transform:translateX(16px)}
#cs .c-keys{display:flex;flex-wrap:wrap;gap:6px;align-items:center}
#cs .c-filter{display:flex;flex-wrap:wrap;gap:6px;padding-top:12px;padding-bottom:4px}
#cs .c-pill{border:1px solid var(--c-hair);border-radius:999px;padding:4px 11px;font-size:12.5px;font-weight:600;background:linear-gradient(var(--c-a),var(--c-b));box-shadow:var(--c-pill);cursor:pointer;color:var(--c-ink2)}
#cs .c-pill[aria-pressed="true"]{color:#fff;background:linear-gradient(var(--c-pa),var(--c-pb));border-color:var(--c-pedge);box-shadow:var(--c-psh)}
#cs .c-entries{display:grid;grid-template-columns:repeat(auto-fill,minmax(250px,1fr));gap:10px;padding:10px 16px 16px;align-content:start}
#cs .c-entry{border:1px solid var(--c-hair);border-radius:12px;padding:11px 13px;background:linear-gradient(var(--c-a),var(--c-b));box-shadow:var(--c-pill);display:flex;flex-direction:column;gap:3px;min-width:0}
#cs .c-entry b{font:600 14.5px/1.3 var(--c-serif)}#cs .c-entry small{color:var(--c-ink3);font-size:12px}
#cs .c-entry p{margin:3px 0 0;font-size:13px;line-height:1.5;color:var(--c-ink2);white-space:pre-wrap;display:-webkit-box;-webkit-line-clamp:5;-webkit-box-orient:vertical;overflow:hidden}
#cs .c-entry .c-keys{margin-top:auto;padding-top:6px}
#cs .c-sec{font-size:10.5px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:var(--c-acc)}
/* 6.58 · Your mentor: the line on Today, and the talk's question */
#cs .c-td-mentor{margin:16px 0 6px;font-size:13.5px;font-weight:600;color:var(--c-ink1)}
#cs #csTalk{width:100%;box-sizing:border-box;margin-top:6px}
/* 6.44 · Your edge and Your direction */
#cs .c-entry .c-line{font:italic 13.5px/1.5 var(--c-serif);color:var(--c-ink1);-webkit-line-clamp:6}
#cs .c-steprow .tx .c-bk{font-size:10.5px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:var(--c-acc)}
#cs .c-fb{margin:4px 0 8px;padding:0 16px 0 34px;display:flex;flex-direction:column;gap:7px}
#cs .c-fb li{font-size:13.5px;line-height:1.5;color:var(--c-ink1)}#cs .c-fb li small{display:block;color:var(--c-ink3);font-size:12.5px;line-height:1.45}
#cs .c-entry.c-pos small{font-size:10.5px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:var(--c-acc)}
#cs .c-entry.c-path.is-kept{border-color:var(--c-ring)}
#cs .c-k{font-size:11px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;color:var(--c-acc);margin-right:4px}
/* goals */
#cs .c-steplist{display:flex;flex-direction:column;padding:4px 16px}
#cs .c-steprow{display:flex;gap:12px;align-items:center;padding:10px 0;border-top:1px solid var(--c-hair2)}
#cs .c-steprow:first-child{border-top:0}#cs .c-steprow .tx{flex:1 1 auto;min-width:0}#cs .c-steprow .tx b{display:block;font-size:14px;font-weight:600}#cs .c-steprow .tx small{display:block;color:var(--c-ink3);font-size:12.5px}
#cs .c-steprow.is-done .tx b{color:var(--c-ink3);text-decoration:line-through;text-decoration-color:var(--c-hair)}
#cs .c-steprow.c-sugg{margin:0 16px;padding:10px 12px;border:1px dashed var(--c-ring);border-radius:10px;background:var(--c-accs)}
#cs .c-check input{width:22px;height:22px;border-radius:7px}
#cs .c-check input:checked{background:linear-gradient(var(--c-pa),var(--c-pb))}
#cs .c-check input:checked::after{content:"";position:absolute;left:7px;top:3px;width:5px;height:10px;border:solid #fff;border-width:0 2px 2px 0;transform:rotate(45deg)}
#cs .c-addstep{display:grid;grid-template-columns:minmax(0,1fr) 160px auto;gap:8px;align-items:center;margin:10px 0 16px}
#cs .c-days{display:flex;flex-direction:column;align-items:flex-start;justify-content:flex-end;padding-bottom:2px}#cs .c-days b{font:600 24px/1 var(--c-serif)}#cs .c-days span{font-size:12.5px;color:var(--c-ink3)}
#cs .c-live{flex:1 1 auto;white-space:pre-wrap;font-size:13.5px;line-height:1.6;overflow:auto;margin:0 16px 16px;padding:12px 14px;border-radius:10px;background:var(--c-wellbg);border:1px dashed var(--c-hair);color:var(--c-ink2)}
#cs .c-live-pn .c-pn-b>.c-note{padding:12px 16px 8px}
#cs .c-web ul{margin:6px 0 0 18px;padding:0}#cs .c-web li{margin:6px 0;font-size:13px}#cs .c-web a{color:var(--c-acc)}
/* a narrow screen: one panel at a time, a key back to the list */
#cs.c-one .c-panels{grid-template-columns:minmax(0,1fr)}
#cs.c-one[data-show="list"] .c-work,#cs.c-one[data-show="work"] .c-list{display:none}
#cs.c-one .c-btn.c-back{display:inline-flex}
#cs.c-one .c-head .rm-tabs{margin-left:0;justify-content:flex-start}
#cs.c-one .c-cols,#cs.c-one .c-split{grid-template-columns:minmax(0,1fr)}
#cs.c-one .c-split{grid-template-rows:auto minmax(0,1fr)}
#cs.c-one .c-nav{border-right:0;border-bottom:1px solid var(--c-hair2);max-height:150px}
#cs.c-one .c-mine:has(.c-fbside){grid-template-columns:minmax(0,1fr)}
#cs.c-phone .c-grid2,#cs.c-phone .c-grid3,#cs.c-phone .c-how{grid-template-columns:minmax(0,1fr)}
#cs.c-phone .c-head h1{font-size:22px}#cs.c-phone .c-head p{display:none}
#cs.c-phone .c-addstep{grid-template-columns:minmax(0,1fr)}
#cs.c-phone .c-head .rm-tab{padding:6px 10px;min-height:34px;font-size:12.5px}

/* 6.8.12 · at her pace: the way of working, the checklist, Today, changes one by one, and several profiles */
#cs .c-keyrow{display:flex;flex-wrap:wrap;align-items:center;gap:8px;justify-content:flex-start}
#cs .c-way{display:flex;flex-wrap:wrap;align-items:center;gap:6px 10px;margin:0 0 10px}
#cs .c-way .c-label{margin:0}
#cs .c-way .c-note{flex:1 1 260px;margin:0}
#cs .c-hrow{display:flex;align-items:center;flex-wrap:wrap;gap:6px 16px}
/* five rooms beside the title, on one line, as the four were */
#cs .c-head .rm-tab{padding:7px 11px 7px 9px}
#cs .c-head .rm-tabs{gap:6px}
#cs .c-who{display:inline-flex;align-items:center;gap:8px;margin:0;font-size:12.5px;font-weight:600;color:var(--c-ink2)}
#cs .c-who select{font:600 12.5px var(--c-sans);color:var(--c-ink1);background:linear-gradient(var(--c-a),var(--c-b));border:1px solid var(--c-hair);border-radius:9px;padding:3px 8px;height:28px;box-shadow:var(--c-pill);max-width:min(230px,60vw);text-overflow:ellipsis}
#cs .c-who select:focus-visible{outline:2px solid var(--c-ring);outline-offset:1px}
#cs .c-people{display:flex;flex-direction:column;gap:8px;padding:0 14px}
#cs .c-person{display:flex;flex-wrap:wrap;align-items:center;gap:8px 12px;padding:10px 12px;border:1px solid var(--c-hair);border-radius:12px;background:linear-gradient(var(--c-a),var(--c-b));box-shadow:var(--c-pill)}
#cs .c-person.c-cur{border-color:var(--c-ring);box-shadow:var(--c-pill),inset 3px 0 0 var(--c-acc)}
#cs .c-person .tx{flex:1 1 220px;display:flex;flex-direction:column;gap:2px}
#cs .c-person .tx b{font:600 14.5px/1.3 var(--c-serif)}
#cs .c-person .tx small{color:var(--c-ink3);font-size:12px}
#cs .c-newp{margin-top:14px;gap:10px}
#cs .c-newrow{align-items:center;flex-wrap:wrap;gap:8px 10px}
#cs .c-newrow .c-note{flex:1 1 240px;margin:0}
#cs .c-newrow input{max-width:240px}
#cs .c-ck{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:6px}
#cs .c-ck li{display:flex;align-items:flex-start;gap:10px;padding:9px 11px;border:1px solid var(--c-hair);border-radius:11px;background:linear-gradient(var(--c-a),var(--c-b));box-shadow:var(--c-pill)}
#cs .c-ck li input{width:18px;height:18px;margin:2px 0 0;flex:0 0 auto;accent-color:var(--c-acc)}
#cs .c-ck li label{flex:1 1 auto;display:flex;flex-direction:column;gap:3px;cursor:pointer}
#cs .c-ck li .c-ck-t{font-weight:600;color:var(--c-ink1)}
#cs .c-ck li small{color:var(--c-ink3);font-size:12px;line-height:1.45}
#cs .c-ck li.c-ck-done .c-ck-t{color:var(--c-ink3);text-decoration:line-through;text-decoration-thickness:1px}
#cs .c-ck-acts{display:flex;gap:6px;flex:0 0 auto}
#cs .c-ck-sug{padding:12px 14px;border:1px solid var(--c-ring);border-radius:12px;background:linear-gradient(var(--c-accs),transparent),linear-gradient(var(--c-a),var(--c-b));box-shadow:var(--c-pop);display:flex;flex-direction:column;gap:6px}
#cs .c-ck-sug small{color:var(--c-ink3);font-size:12px}
#cs .c-ck-sug b{font:600 15px/1.35 var(--c-serif)}
#cs .c-ck-sug blockquote,#cs .c-today-q{margin:0;padding:6px 10px;border-left:2px solid var(--c-acc);color:var(--c-ink2);font-size:13px;background:var(--c-wellbg);border-radius:0 8px 8px 0}
#cs .c-today{gap:10px;padding:6px 4px}
#cs .c-today-step{font:600 20px/1.35 var(--c-serif);color:var(--c-ink1);margin:2px 0}
/* 6.45, her words (6 November 2026): "The Make its checklist page looks odd and not formatted. It looks very plain and reads poorly,
   please redesign it to better fit the rest of the Career Studio and the colour palette and design of Ingenium." Today's step, in
   parts: the application's strip (its organisation, its date and its stage as chips), the step itself on a lilac card with its own
   mark, where it stands among today's steps and its minutes, the posting's own words when it quotes them, what this application
   holds so far (its checklist, its documents, its referees), and the pace in a soft band. Only what the studio holds is shown. */
#cs .c-today2{gap:14px;padding:6px 6px 10px;max-width:780px}
#cs .c-td-top{display:flex;flex-wrap:wrap;align-items:center;gap:8px}
#cs .c-td-org{font-weight:600;font-size:13.5px;color:var(--c-ink2);margin-right:2px}
#cs .c-chip.c-td-closed{background:var(--c-bads);color:var(--c-bad)}
#cs .c-chip.c-td-soon{background:var(--c-warns);color:var(--c-warn)}
#cs .c-chip.c-td-ok{background:var(--c-oks);color:var(--c-ok)}
#cs .c-chip.c-td-stage{background:var(--c-accs);color:var(--c-acc)}
#cs .c-td-hero{display:flex;gap:16px;align-items:flex-start;padding:18px 20px;border-radius:16px;border:1px solid rgba(106,63,181,.16);background:linear-gradient(180deg,var(--c-accs),rgba(106,63,181,0) 88%)}
#cs .c-td-ic{flex:0 0 50px;width:50px;height:50px;border-radius:14px;display:grid;place-items:center;color:#fff;background:linear-gradient(160deg,#8d63d9,#5b2fa8);
  box-shadow:inset 0 1px 0 rgba(255,255,255,.35),0 2px 0 rgba(60,25,120,.22),0 6px 14px rgba(90,47,168,.26)}
#cs .c-td-ic svg{width:25px;height:25px}
#cs .c-td-hx{min-width:0}
#cs .c-td-kick{font-weight:700;font-size:11px;line-height:1.35;letter-spacing:.08em;text-transform:uppercase;color:var(--c-acc)}
#cs .c-today2 .c-today-step{margin:4px 0 0}
#cs .c-td-why{margin:6px 0 0;font-size:15px;line-height:1.6;color:var(--c-ink2);max-width:62ch}
#cs .c-td-facts{padding:14px 18px 16px;border-radius:14px;background:var(--c-card);border:1px solid rgba(40,20,70,.09);box-shadow:0 1px 0 rgba(40,22,68,.05),0 4px 12px rgba(40,22,68,.05)}
#cs .c-td-fh{font:600 16px/1.25 var(--c-serif);color:var(--c-ink1);margin:0 0 10px}
#cs .c-td-grid{display:grid;grid-template-columns:max-content minmax(0,1fr);gap:7px 20px;margin:0}
#cs .c-td-grid dt{font-weight:600;font-size:12.5px;line-height:1.5;color:var(--c-ink3)}
#cs .c-td-grid dd{margin:0;font-size:14px;line-height:1.5;color:var(--c-ink1)}
#cs .c-td-pace{display:flex;gap:10px;align-items:center;padding:11px 14px;border-radius:12px;background:var(--c-accs);color:var(--c-ink2);font-size:13.5px;line-height:1.45}
#cs .c-td-pace svg{flex:0 0 18px;width:18px;height:18px;color:var(--c-acc)}
body[data-theme="night"] #cs .c-td-hero{border-color:rgba(183,156,230,.22)}
body[data-theme="night"] #cs .c-td-facts{border-color:rgba(183,156,230,.16);box-shadow:none}
#cs .c-item.c-soon-i small{color:var(--c-warn)}
#cs .c-rv{gap:10px}
#cs .c-rv-card{border:1px solid var(--c-hair);border-radius:12px;padding:10px 12px;background:linear-gradient(var(--c-a),var(--c-b));box-shadow:var(--c-pill);display:flex;flex-direction:column;gap:8px}
#cs .c-rv-card.c-rv-new{border-color:var(--c-ok)}
#cs .c-rv-card.c-rv-old{border-color:var(--c-ring)}
#cs .c-rv-h{display:flex;align-items:center;gap:8px;flex-wrap:wrap}
#cs .c-rv-old,#cs .c-rv-new{border-radius:8px;padding:6px 10px}
#cs .c-rv-card > .c-rv-old{background:var(--c-bads)}
#cs .c-rv-card > .c-rv-new{background:var(--c-oks)}
#cs .c-rv-card small{display:block;font-size:11px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;color:var(--c-ink3);margin-bottom:2px}
#cs .c-rv-card p{margin:0 0 6px;white-space:pre-wrap}
#cs .c-rv-gone p{font-style:italic;color:var(--c-ink3)}
#cs .c-rv-same{text-align:center;margin:0}
#cs .c-chip.c-ok{color:var(--c-ok);border-color:var(--c-ok)}
#cs .c-plan{min-height:220px;font:13.5px/1.6 var(--c-sans)}
#cs .c-guide{font-size:13.5px;line-height:1.55;max-height:46vh;overflow:auto}
#cs .c-guide h2{font:600 15px/1.3 var(--c-serif);margin:12px 0 4px}
#cs .c-guide h2:first-child{margin-top:0}
/* 6.9.2 · PhD and job applications at her pace: dates and reminders, referees, the interview, the reading list, minutes, the posting checked again, LinkedIn as a difference */
#cs .c-week{display:flex;flex-direction:column;gap:6px;padding:2px 2px 8px;border-bottom:1px solid var(--c-hair2);margin-bottom:2px}
#cs .c-week .c-label{margin:0 2px 2px}#cs .c-week .c-note{padding:0 2px}
#cs .c-wk{display:flex;flex-direction:column;gap:2px;text-align:left;border:1px solid var(--c-hair);border-radius:10px;padding:7px 10px;background:linear-gradient(var(--c-accs),transparent),linear-gradient(var(--c-a),var(--c-b));box-shadow:var(--c-pill);cursor:pointer;color:var(--c-ink1)}
#cs .c-wk:hover{transform:translateY(-1px);box-shadow:var(--c-pop)}
#cs .c-wk b{font:600 13px/1.3 var(--c-sans);color:var(--c-warn)}#cs .c-wk span{font-size:12.5px;color:var(--c-ink2)}
#cs .c-mins{display:flex;flex-direction:column;gap:8px;padding:10px 12px;border:1px solid var(--c-hair);border-radius:12px;background:linear-gradient(var(--c-a),var(--c-b));box-shadow:var(--c-pill)}
#cs .c-mins .c-label{margin:0}#cs .c-mins p{margin:0;font-size:13.5px;color:var(--c-ink2)}
#cs .c-fitlist{gap:6px}
#cs .c-dates,#cs .c-ivcard,#cs .c-mock{display:flex;flex-direction:column;gap:8px;padding:12px 14px;border:1px solid var(--c-hair);border-radius:12px;background:linear-gradient(var(--c-a),var(--c-b));box-shadow:var(--c-pill)}
#cs .c-mock{gap:6px;padding:10px 12px;align-items:flex-start}#cs .c-mock b{font:600 14px/1.3 var(--c-serif)}
#cs .c-date{display:flex;flex-wrap:wrap;align-items:center;gap:6px 12px;padding:8px 0;border-top:1px solid var(--c-hair2)}
#cs .c-date .tx{flex:1 1 180px;min-width:0}#cs .c-date .tx b{display:block;font-size:14px}#cs .c-date .tx small{display:block;color:var(--c-ink3);font-size:12.5px}
#cs .c-remind{flex:0 1 auto}#cs .c-remind .c-btn[disabled]{opacity:.45;cursor:default}
#cs .c-adddate{align-items:flex-end}#cs .c-adddate .field{flex:1 1 140px}
#cs .c-ref{display:flex;flex-direction:column;gap:6px;padding:10px 12px;border:1px solid var(--c-hair);border-radius:12px;background:linear-gradient(var(--c-a),var(--c-b));box-shadow:var(--c-pill)}
#cs .c-ref .c-ref-h{display:flex;flex-wrap:wrap;align-items:center;gap:6px 10px}#cs .c-ref .c-ref-h b{font:600 14.5px/1.3 var(--c-serif);flex:1 1 auto;min-width:0}
#cs .c-ref .c-ref-h a{color:var(--c-acc)}
#cs .c-ref small{color:var(--c-ink3);font-size:12.5px}
#cs .c-ref .c-ta{min-height:56px}
#cs .c-prep{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:6px}
#cs .c-prep li{display:flex;align-items:center;gap:10px}#cs .c-prep li input{width:18px;height:18px;margin:0;flex:0 0 auto;accent-color:var(--c-acc)}
#cs .c-prep li label{flex:1 1 auto;cursor:pointer;font-size:13.5px}#cs .c-prep li.c-ck-done label{color:var(--c-ink3);text-decoration:line-through}
#cs .c-ivdays{font:600 20px/1 var(--c-serif);color:var(--c-ink1)}
#cs .c-rc{display:flex;flex-direction:column;gap:6px;padding:10px 12px;border:1px solid var(--c-ring);border-radius:12px;background:linear-gradient(var(--c-accs),transparent),linear-gradient(var(--c-a),var(--c-b))}
#cs .c-rc .c-rv-old,#cs .c-rc .c-rv-new{border-radius:8px;padding:5px 9px;font-size:13px}#cs .c-rc .c-rv-old{background:var(--c-bads)}#cs .c-rc .c-rv-new{background:var(--c-oks)}
#cs .c-rc p{margin:0}#cs .c-rc small{display:block;font-size:11px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;color:var(--c-ink3)}
#cs .c-more{display:flex;flex-wrap:wrap;gap:6px;align-items:center}#cs .c-more .c-label{margin:0}#cs .c-more .c-chip .c-btn{padding:0 4px;margin-left:2px}
#cs .c-web li .c-btn,#cs .c-web li .c-chip{margin-left:8px;vertical-align:middle}
#cs .c-an{font-size:13.5px;line-height:1.55;max-height:40vh;overflow:auto;white-space:normal}#cs .c-an h4{font:600 13.5px/1.3 var(--c-serif);margin:8px 0 2px}#cs .c-an h4:first-child{margin-top:0}#cs .c-an p{margin:0 0 4px;white-space:pre-wrap}
#cs .c-ligone{color:var(--c-warn) !important;font-weight:600}
#cs.c-one .c-adddate .field{flex:1 1 100%}
#cs:not(.c-one) .c-only-one{display:none}
/* the reading page's brief: a posting kept in the Career Studio, chosen there */
#lx7 select.l-sel{margin-top:6px;max-width:100%;padding:6px 9px;border-radius:9px;border:1px solid var(--l-hair);background:var(--l-wellbg);box-shadow:var(--l-well);color:var(--l-ink1);font:inherit}
/* 6.9.8 · a posting by its link, the reading vetted against the profile, and the jobs saved on LinkedIn */
#cs .c-link{display:flex;gap:10px;align-items:flex-end;min-width:0}
#cs .c-link .field{flex:1 1 auto;min-width:0}
/* 6.38 (one scale, her note of 6 November 2026): the link's field and its key at the app's sizes (a field 13.5px, a key about 35px high) */
#cs .c-link>input,#cs .c-link .field input{flex:1 1 auto;min-width:0;font-size:13.5px;min-height:35px}
#cs .c-link input[type=text]{font:13.5px var(--c-sans);color:var(--c-ink1);padding:7px 10px;border:1px solid var(--c-hair);border-radius:9px;background:var(--c-wellbg);box-shadow:var(--c-well);min-height:34px}
#cs .c-link .c-btn{flex:0 0 auto;min-height:35px;white-space:nowrap}
#cs .c-intro .c-pn-b{scrollbar-gutter:stable}
#cs .c-quick{margin:16px 18px 2px;padding:14px 16px 12px;border:1px solid var(--c-hair);border-radius:14px;background:linear-gradient(var(--c-a),var(--c-b));box-shadow:var(--c-slab);display:flex;flex-direction:column;gap:9px}
#cs .c-quick .c-h3{margin:0}
#cs .c-status{display:flex;align-items:center;gap:9px;font-size:13px;color:var(--c-ink2);margin:0}
#cs .c-spin{flex:0 0 auto;width:14px;height:14px;border-radius:50%;border:2px solid var(--c-accs);border-top-color:var(--c-acc);animation:cSpin698 .9s linear infinite}
@keyframes cSpin698{to{transform:rotate(360deg)}}
@media (prefers-reduced-motion:reduce){#cs .c-spin{animation:none}}
#cs .c-alert{border:1px solid var(--c-hair);border-left:3px solid var(--c-warn);background:var(--c-warns);border-radius:10px;padding:10px 14px;color:var(--c-ink1);font-size:13.5px;line-height:1.55;display:flex;flex-direction:column;gap:8px}
#cs .c-alert p{margin:0}
#cs .c-found{display:flex;flex-direction:column;gap:6px}
#cs .c-found ul{margin:0;padding:0;list-style:none;display:flex;flex-direction:column;gap:6px}
#cs .c-found li{display:flex;flex-wrap:wrap;align-items:center;gap:4px 10px;font-size:13px;padding:8px 10px;border:1px solid var(--c-hair2);border-radius:10px;background:var(--c-wellbg)}
#cs .c-found li a{color:var(--c-acc);font-weight:600;flex:1 1 100%}
#cs .c-found li small{color:var(--c-ink3);flex:1 1 auto}
#cs .c-or{display:flex;align-items:center;gap:12px;color:var(--c-ink3);font-size:12px;letter-spacing:.04em}
#cs .c-or:before,#cs .c-or:after{content:"";flex:1;height:1px;background:var(--c-hair)}
#cs .c-vet{display:block;font-size:11.5px;margin-top:4px;color:var(--c-ink3)}
#cs .c-vet:before{content:"\2713\00a0";}
#cs .c-vet[data-v=found]{color:var(--c-ok)}
#cs .c-vet[data-v=near]:before{content:"\2248\00a0"}
#cs .c-vet[data-v=missing],#cs .c-vet[data-v=check]{color:var(--c-warn)}
#cs .c-vet[data-v=missing]:before{content:"!\00a0";font-weight:700}
#cs .c-lead{margin:4px 0 2px;padding-left:20px;display:flex;flex-direction:column;gap:6px;font-size:13.5px;line-height:1.45;color:var(--c-ink1)}
#cs .c-lead li span{display:block;color:var(--c-ink3);font-size:12.5px}
#cs .c-svk b:before{content:"";display:inline-block;width:8px;height:8px;border-radius:50%;background:var(--c-acc);margin-right:7px;vertical-align:1px}
#cs .c-svnote{padding-top:14px}
/* 6.10.2 · templates by field and role */
#cs .c-tplbar{display:flex;flex-wrap:wrap;align-items:center;gap:8px 12px;margin:10px 0 2px;padding:10px 12px;border:1px solid var(--c-hair);border-radius:12px;background:var(--c-wellbg)}
#cs .c-tplbar .c-label{margin:0}
#cs .c-tplbar .c-sel{max-width:min(100%,420px)}
#cs .c-tplsg{display:inline-flex;align-items:center;gap:8px;flex-wrap:wrap}
#cs .c-tplgrid{display:grid;grid-template-columns:repeat(auto-fill,minmax(240px,1fr));gap:10px;padding:4px 16px 16px}
#cs .c-tplview{padding:4px 18px 18px;gap:6px;font-size:14px;line-height:1.55;color:var(--c-ink1)}
#cs .c-tplview p{margin:0 0 6px}
#cs .c-tplview .c-h3{margin-top:12px}
#cs .c-tplol,#cs .c-tplul{margin:2px 0 6px;padding-left:22px;display:flex;flex-direction:column;gap:5px}
#cs .c-tplline{white-space:pre-wrap;font:13px/1.5 var(--c-mono);background:var(--c-wellbg);border:1px solid var(--c-hair);border-radius:10px;padding:10px 12px;margin:2px 0}
#cs .c-tplk b:before{content:"";display:inline-block;width:8px;height:8px;border-radius:2px;background:var(--c-acc);margin-right:7px;vertical-align:1px}
#cs .c-svcard{border:1px solid var(--c-hair);border-radius:12px;background:linear-gradient(var(--c-a),var(--c-b));box-shadow:var(--c-slab);padding:12px 14px;margin:12px 16px 4px;display:flex;flex-direction:column;gap:4px}
#cs .c-svcard b{font-size:14.5px;color:var(--c-ink1)}
#cs .c-svcard small{color:var(--c-ink3);font-size:12.5px}
#cs .c-svcard .c-row{margin-top:8px;align-items:center}
#cs a.c-btn{text-decoration:none;display:inline-flex;align-items:center}
#cs .c-svdone{margin:6px 0 0;padding:0;list-style:none;display:flex;flex-direction:column;gap:4px;font-size:13px;color:var(--c-ink2)}
#cs .c-svdone li{display:flex;align-items:center;justify-content:space-between;gap:10px}
@media (max-width:700px){#cs .c-link{flex-wrap:wrap}#cs .c-link .c-btn{flex:1 1 auto}}
</style>
<script>try{(window.__ingParts=window.__ingParts||{})["p188"]="started";}catch(_){}
/* R188 · THE CAREER STUDIO (6.8.3, 28 October 2026)
   Her words (her original message, sent again on 28 October 2026): "I want Ingenium to gain the function and full
   capabilities to work like my own Linkedin premium with its full functionality and ressources. I want it curated entirely
   to my in-app profile, resume, cover letter and portfolio. By that, I mean that I want to be able to copy and paste or
   upload a job posting and or role description and have a deep and thorough analysis done that tells me first how it
   matches with what I am looking for, if I fit the role and what my probablities are, and recommendation on whether to
   apply or not and clear plan for next steps." "I want it to teach me how to do this so that I can properly learn and be
   able to do this without assistance and continue to get better on my own." "I want to help figure out what skills that I
   have gained and developped from building my 4 apps (Carpe Diem, The Forge, Ingenium and Inkwell) and curating the
   Offline Project and [her doctoral plans: private, so left out of this public source since 6.43]." "[a] reviewer/assistant/career counselor/recruitor/mentor all in one inside of Ingenium that will not sugarcoat
   anything, that will not invent skills or experiences that I do not possess". "I want this recipe applicable to any user,
   it should be customisable and replicable." "Tell me and I forget. Teach me and I remember. Involve me and I learn." "I
   want it curated and trained to help figure out my career and academic goals and help me create real actionable steps and
   plans to best achieve them. I want it to help me determine what roles would best suit me and worth an application based
   on my wants and needs. I don't want it to be Linkedin, I don't want job postings generated or provided, instead, I want an
   area where I can bring jobs, academic programmes, or grants, etc. that I am interested in applying to and help me
   analyse, review, curate, rewrite, and track my applications." Her answers when asked: its own page in the main menu; the
   chances as a plain band with reasons, never a percentage; "All of the above, I want the option to curate my own profile
   with all of them and be able to update as I go"; online search off unless she asks. And: "Please keep the Lector page and
   the new Career Studio page off the demo and its tour." (editions.py leaves this module out wherever Lector is left out.)
   What it does, plainly:
     - Your profile: what she is looking for (the work, what she needs, what she would rather avoid, where, by when); the
       entries she keeps up to date; and the sources she lets it use (her CV, the one Lector keeps; her LinkedIn export;
       her own documents, such as a proposal; her writing and past letters; Lector's readings of her apps; her sources in
       Fontes). The profile is the only source of facts about her. Her skills can be found in it, each with its evidence
       and where it counts (academic, professional or both), for her to keep or drop.
     - Applications: each posting, programme or grant she brings (pasted, from a file, or fetched from its address when
       she presses for it). Read against the profile: first how it matches what she is looking for; then every criterion,
       judged shown, partly shown or not shown, with the evidence named. The band (Strong fit, Possible fit, A stretch, Not
       a fit as the profile stands) follows from those judgements by a fixed rule shown beside it; it is not a probability.
     - What she sends: a CV, a cover letter, a supporting statement, a personal statement, an outline for a research
       proposal and emails, written from the profile and the posting, examined a second time against the profile, and
       checked for figures the profile does not give; shown on the paper they are saved on (Word or PDF, as shown). Or her
       own draft, looked at with her: what works, what is missing, what the profile does not support, never rewritten.
     - Practise: her own evidence for each criterion, and her answers to likely interview questions, looked at with her.
     - Goals and plan: her goals with dated steps; steps suggested for a goal, for her to keep or drop; the kinds of role
       and programme that suit her profile and wants, with reasons and gaps (never postings).
     - Learn: how each piece is built, in short steps.
   Nothing is searched online unless she presses for it, and what is found is for her to read: the studio does not write
   from it. */
/* 6.9.2 (31 October 2026): dates and reminders, referees, the interview, an application exported as a folder, a reading
   list read by the reading page, what she can do in N minutes, the posting checked again, LinkedIn as a difference; her
   words and the note stand before those functions below (search "6.9.2: PhD and job applications"). */
(function r188Career(){
"use strict";
if(window.__r188)return;window.__r188=1;
var D=document,W=window;
function $(id){return D.getElementById(id);}
function h(t,c,html){var e=D.createElement(t);if(c)e.className=c;if(html!=null)e.innerHTML=html;return e;}
function esc(s){return String(s==null?"":s).replace(/[&<>"]/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c];});}
function say(t){try{ingToast(t);}catch(e){}}
function uid(p){return p+Date.now().toString(36)+Math.random().toString(36).slice(2,6);}
function save(){try{saveState();}catch(e){}}
function LXR(){return W.IngLector||null;}
function field(label,el){var l=h("label","field");l.appendChild(h("span",null,esc(label)));l.appendChild(el);return l;}
function input(type,val,ph){var i=h("input");i.type=type||"text";if(val!=null)i.value=val;if(ph)i.placeholder=ph;return i;}
function select(opts,val){var s=h("select");opts.forEach(function(o){var x=h("option");x.value=o[0];x.textContent=o[1];if(o[0]===val)x.selected=true;s.appendChild(x);});return s;}
/* a section that folds keeps its place when the page is drawn again (her place is never lost after a press) */
var OPEN={};
function fold(key,label,dflt){var d=h("details","cs-fold");d.open=key in OPEN?OPEN[key]:!!dflt;d.appendChild(h("summary",null,esc(label)));d.addEventListener("toggle",function(){OPEN[key]=d.open;});return d;}
function dayStr(t){try{return new Date(t).toLocaleDateString("en-GB",{day:"numeric",month:"long",year:"numeric"});}catch(e){return "";}}

/* ---------------- what the studio keeps (small, in the app's state; long texts in IngBig) ---------------- */
var STAGES=[["considering","Considering"],["preparing","Preparing"],["applied","Applied"],["interview","Interview"],["offer","Offer"],["accepted","Accepted"],["unsuccessful","Not successful"],["withdrawn","Withdrawn"],["not","Not applying"]];
var FINISHED={accepted:1,unsuccessful:1,withdrawn:1,not:1};
var OKINDS=[["job","A job"],["phd","A PhD or DPhil"],["grant","A grant or fellowship"],["other","Something else"]];
var SECTS=[["education","Education"],["post","Posts and work"],["research","Research and publications"],["teaching","Teaching"],["project","Projects"],["skill","Skills, with evidence"],["language","Languages"],["award","Awards and funding"],["referee","Referees"],["other","Other"]];
/* 6.8.12: several profiles. state.career holds {people:[...], cur}; each person keeps its own profile, applications, goals,
   suggested roles and place in the studio, and CS() is the one open now. What was kept before becomes the first. */
function ROOT(){var r=state.career;if(!r||typeof r!=="object")r=state.career={};
  if(!Array.isArray(r.people)){var p0={id:uid("pp")};Object.keys(r).forEach(function(k){p0[k]=r[k];delete r[k];});r.v=2;r.people=[p0];r.cur=p0.id;}
  if(!r.people.length){var p1={id:uid("pp")};r.people.push(p1);r.cur=p1.id;}
  if(!r.people.some(function(p){return p&&p.id===r.cur;}))r.cur=r.people[0].id;return r;}
function CS(){var r=ROOT(),s=r.people.filter(function(p){return p.id===r.cur;})[0];
  if(!s.profile||typeof s.profile!=="object")s.profile={};var P=s.profile;
  if(!Array.isArray(P.items))P.items=[];if(!Array.isArray(P.files))P.files=[];
  if(!P.use||typeof P.use!=="object")P.use={cv:true,linkedin:true,writing:true,letters:true,fontes:false,apps:{}};if(!P.use.apps||typeof P.use.apps!=="object")P.use.apps={};
  if(typeof P.name!=="string")P.name="";if(typeof P.contact!=="string")P.contact="";
  if(!P.wants||typeof P.wants!=="object")P.wants={looking:"",need:"",avoid:"",where:"",when:""};if(!P.prefs||typeof P.prefs!=="object")P.prefs={spelling:"british"};
  if(!Array.isArray(s.goals))s.goals=[];
  if(!Array.isArray(s.opps))s.opps=[];if(!s.ui||typeof s.ui!=="object")s.ui={room:"today",open:null};
  return s;}
function oppById(id){return CS().opps.filter(function(o){return o.id===id;})[0]||null;}
function american(){return CS().profile.prefs.spelling==="american";}
function english(){return american()?"American English":"British English";}
function wantsText(){var W0=CS().profile.wants,L=[["What I am looking for",W0.looking],["What I need",W0.need],["What I would rather avoid",W0.avoid],["Where",W0.where],["By when",W0.when]].filter(function(x){return String(x[1]||"").trim();});
  return L.length?"WHAT I AM LOOKING FOR (my wants, needs and timeline):\n"+L.map(function(x){return "- "+x[0]+": "+String(x[1]).trim();}).join("\n"):"";}
function myName(){var P=CS().profile,n=P.name;if(n)return n;if(P.isMe===false)return "";try{return lxhAuthor()||"";}catch(e){return "";}}
function isMe(){return CS().profile.isMe!==false;}
function lectorMe(){var P=CS().profile;if(P.isMe===false){if(!P.own||typeof P.own!=="object")P.own={cv:null,writing:[],letters:[]};if(!Array.isArray(P.own.writing))P.own.writing=[];if(!Array.isArray(P.own.letters))P.own.letters=[];return P.own;}
  try{return LXR().state().me;}catch(e){return {cv:null,writing:[],letters:[]};}}

/* ---------------- the model: Lector's choice for this device ---------------- */
function plan(){try{return LXR().plan();}catch(e){return null;}}
function modelReady(){var o=plan();return !!(o&&(o.link||o.chosen));}
function modelName(){var o=plan();if(!o)return "";if(o.cloud){try{return lxCloudName();}catch(e){return "your connected model";}}if(o.link){try{return supModelName();}catch(e){return "the model on your other computer";}}return o.chosen?o.chosen.customName:"";}
/* 6.9.5: the connected model (Settings, Connections) may write for the studio as for Lector: one key to choose it, one to go back */
function cloudKey(){var o=plan();if(typeof lxCxReady!=="function")return null;
  if(o&&o.cloud)return cbtn("","Use this device's model instead",function(){lxSetCloud(false);render();});
  if(lxCxReady()&&!(o&&o.link))return cbtn("","Use "+lxCloudName(),function(){lxSetCloud(true);render();});
  return null;}
function whereLine(){var o=plan();if(o&&o.cloud)return lxCloudLeaves()?"through your "+lxCloudWho()+" connection: what it reads is sent to "+lxCloudWho():"through your connection, on your own computer or in your home";
  if(o&&o.link)return "on your other computer, over your own network";return "on this device";}
/* 6.44: her words (6 November 2026): "I don't want any caps inside of Ingenium's pages. I want the cap of the Career studio removed and
   anywhere else inside of Ingenium that does not harm the app and leave it vulnerable." The studio reads as much as the model's own memory
   holds (it kept to 90,000 characters, and 30,000 for a model on this device); what is larger than the memory is still shortened, or a
   refusal for size asks again in smaller parts */
function room(){var o=plan(),m=o&&o.chosen,ctx=8192;try{if(m||(o&&o.cloud))ctx=lxCtx(m)||ctx;}catch(e){}return Math.max(9000,(ctx-1800)*3);}
var RUN={busy:false,stop:false,what:"",live:"",think:"",opp:null,t0:0};
function ask(build,max,temp){var o=plan(),scale=1,tries=0,waits=0,req={modelId:o&&o.chosen?o.chosen.id:null};RUN.req=req;
  function mine(){return RUN.req===req;}
  return new Promise(function(res,rej){(function go1(){if(!mine())return;if(RUN.stop||req.__stopped){rej(new Error("stopped"));return;}var msgs=build(scale);RUN.live="";RUN.think="";paintLive();
    try{if(W.LX)LX.onThink=function(t){if(!t||!mine())return;RUN.think+=t;paintLive();};}catch(e){}
    lxAsk(req,msgs,max,temp,function(t){if(!mine()||req.__stopped)return;RUN.live=t;paintLive();}).then(function(t){if(!mine())return;try{if(W.LX)LX.onThink=null;}catch(e){}if(RUN.stop||req.__stopped)rej(new Error("stopped"));else res(String(t||""));},function(e){if(!mine())return;try{if(W.LX)LX.onThink=null;}catch(x){}var m=String(e&&e.message||e);
      if(RUN.stop||req.__stopped){rej(new Error("stopped"));return;}
      if(m==="busy"&&waits++<200){RUN.live="Waiting for the model to finish what it is doing…";paintLive();setTimeout(go1,1500);return;}
      var big=false;try{big=lxIsCtxError(e);}catch(x){}if(big&&scale>0.3){scale*=0.7;setTimeout(go1,300);return;}
      if(++tries<=1){setTimeout(go1,1500);return;}rej(e);});})();});}
function busyNow(){if(RUN.busy){say("The studio is writing. Wait for it, or press Stop.");return true;}
  try{if(W.LX&&LX.busy){say("Lector is using the model. Wait for it, or pause it in Lector.");return true;}}catch(e){}return false;}
function needModel(){if(modelReady())return false;say("No model is ready on this device yet. Get one on the Models page: the studio writes with the model Lector uses."+(typeof lxCxReady==="function"&&lxCxReady()?" Or choose your connected model, "+lxCloudName()+", on the studio's first page.":""));return true;}
function begin(opp,what){RUN.req=null;RUN.busy=true;RUN.stop=false;EXAM.last=null;RUN.what=what;RUN.live="";RUN.think="";RUN.t0=Date.now();RUN.opp=opp?opp.id:null;CS().ui.show="work";render();startTick();}
var TICK=0;function startTick(){if(TICK)return;TICK=setInterval(function(){if(!RUN.busy){clearInterval(TICK);TICK=0;return;}paintLive();},1000);}
function end(){RUN.busy=false;RUN.what="";RUN.live="";RUN.think="";RUN.opp=null;render();}
/* 6.24: Stop stops. The engines answer a stop by handing back what was written so far, as if the reply had ended, so the layers around
   the ask (Ultra's check, the guard against repetition) went on to ask again; and a connection's request was never cancelled. Now Stop
   marks the studio's own request as stopped (lxAsk then refuses it at once, however many layers ask again: build_page.py 6.24, so
   Lector and Folders are never held up), cancels it on this device and through a connection, and the panel ends within a few seconds
   whatever the engine does. A late answer from a stopped request is dropped, and never ends a newer run. */
function stopNow(){MSTOP=true;/* 6.58: and Your mentor's steps after this one */if(!RUN.busy)return;RUN.stop=true;try{if(RUN.req)RUN.req.__stopped=true;}catch(e){}
  try{if(W.Engine&&Engine.abort)Engine.abort();}catch(e){}
  try{if(W.LX&&LX.cloudAb){if(typeof cloudAbort==="function")cloudAbort();if(LX.cloudAb&&LX.cloudAb.abort)LX.cloudAb.abort();}}catch(e){}
  RUN.what="Stopping…";paintLive();var k=$("csStopKey");if(k){k.disabled=true;k.textContent="Stopping…";}
  setTimeout(function(){if(RUN.busy&&RUN.stop){end();say("Stopped. Nothing from this run was kept.");}},2500);}
function failed(e){var m=String(e&&e.message||e);end();if(m!=="stopped")say("It could not be finished: "+m);}

/* what the model is told, every time: the profile is the only source of facts about her, and nothing is invented */
function banned(){try{return (LXR().banned||[]).join(", ");}catch(e){return "";}}
function sys(extra,prose){var X="";try{if(prose)X=LXR().charter||"";}catch(e){}
  return (/^You are now /.test(String(extra||""))?"You read and advise on this device for the applicant, in "+english()+": exact, measured and plain, never promotional. ":"You write on this device for the applicant, in the first person as the applicant, in "+english()+": exact, measured and plain, never promotional. ")+"THE RULES. Use only what THE PROFILE shows about me: my posts, studies, dates, skills, results, publications and names. Never invent a skill, a post, a qualification, a date, a figure, a publication, a name, a referee or a quotation, and never stretch what the profile says into more than it says. You may show how what the profile does show answers what is asked (experience that transfers from another setting), naming where it comes from; that is drawing the link, not stretching. Where the posting asks for something the profile does not show, do not claim it. Where a fact is needed and the profile does not give it, write a placeholder in square brackets, such as [the dates]. Do not flatter the reader, the organisation or me."+
    (banned()?" Words never to use: "+banned()+".":"")+X+toneLine()+(extra?" "+extra:"");}
/* 6.90: how the counsellor speaks (her answer, 12 November 2026: "Frank, like a good recruiter"; "Yes: tell me when a plan or document is weak") */
function toneLine(){var t=(CS().profile.prefs||{}).tone||"frank";return {frank:" Speak frankly, as a good recruiter would: say plainly when a plan, a document or an answer is weak, and why, then what would mend it; one strength named is no reason to hide a weakness.",
  warm:" Speak warmly and encouragingly, naming what is strong first; say what is weak plainly too, with what would mend it.",measured:" Speak as a measured academic supervisor would: exact, even, with the evidence for every judgement and what would mend a weakness."}[t]||"";}
function cut(t,n){t=String(t||"");if(n<=0)return "";if(t.length<=n)return t;var c=t.slice(0,n),p=Math.max(c.lastIndexOf(". "),c.lastIndexOf("\n"));return (p>n*0.6?c.slice(0,p+1):c)+" […]";}

/* ---------------- the profile, as the model reads it ---------------- */
function itemLine(it){var when=[it.from,it.to].filter(Boolean).join(" to ");return "- "+[it.title,it.place,when].filter(Boolean).join(", ")+(it.text?"\n  "+String(it.text).replace(/\n/g,"\n  "):"");}
/* 6.90: what never leaves the device (her answer, 12 November 2026): when the model is a connected service that reads what it is sent,
   the referees are left out, as are pay figures and the contact line; a model on this device or in her home sees everything */
function leaves(){try{var o=plan();return !!(o&&o.cloud&&typeof lxCloudLeaves==="function"&&lxCloudLeaves());}catch(e){return false;}}
function noPay(t){return String(t||"").replace(/(?:[£$€]\s?\d[\d,.]*\s?(?:k|K|thousand|million)?|\b\d[\d,.]*\s?(?:GBP|USD|EUR|dollars|pounds|euros)\b)(?:\s*(?:a|per)\s*(?:year|annum|month|hour|day|week))?/g,"[a figure kept on this device]").replace(/\b(salary|pay|stipend|wage)\s*(?:of|:)?\s*\[a figure kept on this device\]/gi,"$1 [kept on this device]");}
function itemsText(){var P=CS().profile,out=[],away=leaves();
  SECTS.forEach(function(s){if(away&&s[0]==="referee")return;var its=P.items.filter(function(it){return it.sec===s[0]&&(it.src!=="linkedin"||P.use.linkedin);});if(its.length)out.push("## "+s[1]+"\n"+its.map(function(it){var l=itemLine(it);return away?noContact(noPay(l)):l;}).join("\n"));});
  return out.join("\n\n");}
function appsWanted(){var P=CS().profile,out=[];if(P.isMe===false)return out;try{lxState().runs.forEach(function(r){if(r.kind==="app"&&r.status==="done"&&P.use.apps[r.app||r.name]!==false&&out.every(function(x){return x.name!==r.name;}))out.push(r);});}catch(e){}return out;}
function loadText(ref){try{return ref?Promise.resolve(IngBig.load(ref)).then(function(t){return String(t||"");},function(){return "";}):Promise.resolve("");}catch(e){return Promise.resolve("");}}
/* everything the profile holds, read once for a piece of writing: {items, cv, linkedin, files[], apps[], writing, letters, sources[]} */
function gatherProfile(o){o=o||{};return gatherProfile0(o).then(function(G){return readingNotes(o.opp).then(function(rn){G.reading=rn;return G;},function(){G.reading=[];return G;});});}
function gatherProfile0(o){var P=CS().profile,M=lectorMe(),runs=appsWanted();
  return Promise.all([P.use.cv&&M.cv?loadText(M.cv.ref):"",P.use.linkedin&&P.linkedin?loadText(P.linkedin.ref):"",
      Promise.all(P.files.filter(function(f){return f.use!==false;}).map(function(f){return loadText(f.ref).then(function(t){return {name:f.name,text:t};});})),
      Promise.all(runs.map(function(r){return loadText(r.analysisRef).then(function(t){var a={};try{a=JSON.parse(t)||{};}catch(e){}return {name:r.name,an:a};});})),
      o.voice&&P.use.writing&&M.writing?Promise.all(M.writing.map(function(x){return loadText(x.ref);})):[],o.voice&&P.use.letters&&M.letters?Promise.all(M.letters.map(function(x){return loadText(x.ref);})):[]])
    .then(function(r){var G={items:itemsText(),cv:r[0],linkedin:r[1],files:r[2],apps:r[3].map(function(x){var keys=Object.keys(x.an).filter(function(k){return /brief|does|skill|made|built|research|purpose/i.test(k);});
        return {name:x.name,text:keys.map(function(k){return "("+k+") "+x.an[k];}).join("\n")};}).filter(function(x){return x.text;}),writing:(r[4]||[]).filter(Boolean),letters:(r[5]||[]).filter(Boolean),sources:[]};
      if(!o.cite||!P.use.fontes||P.isMe===false||typeof fontesItems!=="function")return G;var items=[];try{items=fontesItems().slice(0,30);}catch(e){}
      G.sources=items.map(function(c,i){var t="";try{t=fontesPlain(c);}catch(e){t=String(c.title||"");}return {n:i+1,text:t};});return G;});}
function profileBlock(G,R){var parts=[],nm=myName(),wt=wantsText();if(wt)parts.push(wt);
  var away=leaves(),away_=function(t){return noContact(noPay(t));};parts.push("THE PROFILE (the only source of facts about me):"+(nm?"\nName: "+nm:"")+(G.items?"\n\n"+cut(G.items,Math.floor(R*0.34)):""));
  if(G.cv)parts.push("MY CV:\n"+cut(away?away_(cvNoRefs(G.cv)):G.cv,Math.floor(R*0.24)));
  if(G.linkedin)parts.push("MY LINKEDIN PROFILE (its headline and summary):\n"+cut(away?away_(G.linkedin):G.linkedin,Math.floor(R*0.05)));
  if(G.files.length){var per=Math.floor(R*0.16/G.files.length);parts.push("MY DOCUMENTS:\n"+G.files.map(function(f){return "### "+f.name+"\n"+cut(away?away_(cvNoRefs(f.text)):f.text,per);}).join("\n\n"));}
  if(G.apps.length){var pa=Math.floor(R*0.12/G.apps.length);parts.push("MY APPS, AS LECTOR READ THEM (what I designed and built):\n"+G.apps.map(function(a){return "### "+a.name+"\n"+cut(a.text,pa);}).join("\n\n"));}
  if(G.reading&&G.reading.length){var pr=Math.floor(R*0.1/G.reading.length);parts.push("MY READING NOTES (what the reading page found in works I read for this application: take from them only what they say, never as facts about me):\n"+G.reading.map(function(a){return "### "+a.title+"\n"+cut(a.text,pr);}).join("\n\n"));}
  return parts.join("\n\n");}
/* 6.90: a CV's referees section, left out when the model is away */
/* 6.90: and her contact details: email addresses, telephone numbers and the profile's contact line */
function noContact(t){var c=String((CS().profile||{}).contact||"").trim();t=String(t||"");if(c)t=t.split(c).join("[contact details kept on this device]");
  return t.replace(/[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/g,"[an email kept on this device]").replace(/(?:\+|\b00)\d[\d ()-]{7,}\d|\b0\d{2,4}[ -]?\d{3,4}[ -]?\d{3,4}\b|\(\d{3}\)\s?\d{3}[ -]\d{4}/g,"[a telephone number kept on this device]");}
function cvNoRefs(t){return String(t||"").replace(/\n\s*(referees?|references)\s*:?\s*\n[\s\S]*?(?=\n\s*[A-Z][A-Za-z ]{2,40}\s*:?\s*\n|$)/i,"\n[Referees: kept on this device]\n");}
function material(G){return [G.items,G.cv,G.linkedin].concat(G.files.map(function(f){return f.text;})).concat(G.apps.map(function(a){return a.text;})).concat((G.reading||[]).map(function(a){return a.text;})).join("\n");}

/* ---------------- an application: its posting, and the reading of it against the profile ---------------- */
function newOpp(kind,text,from){var o={id:uid("op"),kind:kind||"job",title:"",org:"",closes:"",due:"",stage:"considering",at:Date.now(),from:from||"",ref:null,chars:0,docs:{},older:{},emails:[],practice:{crit:{},qs:[]},notes:""};
  try{var m=LXR().parsePost(text);o.title=m.title||"";o.org=m.org||"";o.closes=m.closes||"";o.due=dateIn(m.closes);}catch(e){}
  if(!o.due){var cl=jlCloses(text);if(cl){o.closes=cl.word;o.due=cl.iso;}}
  o.ref=IngBig.newId();o.chars=text.length;return Promise.resolve(IngBig.put(o.ref,text)).then(function(){CS().opps.unshift(o);CS().ui.open=o.id;CS().ui.show="work";save();return o;});}
function postOnly(o){return loadText(o&&o.ref);}
/* 6.9.2: the posting and the further particulars added to it (a PDF of particulars, a handbook), read together by the model, the limits and the checklist */
function postText(o){if(!o)return Promise.resolve("");var more=(o.more||[]).filter(function(m){return m.ref;});if(!more.length)return loadText(o.ref);
  return Promise.all([loadText(o.ref)].concat(more.map(function(m){return loadText(m.ref);}))).then(function(ts){var out=ts[0]||"";more.forEach(function(m,i){if(ts[i+1])out+="\n\nFURTHER PARTICULARS ("+m.name+"):\n"+ts[i+1];});return out;});}
function kindWord(k){return {job:"posting",phd:"programme's call",grant:"call for applications",other:"posting"}[k]||"posting";}
/* the reading, line by line: what the model is asked to return, and how it is read back */
/* 6.24: a model on this device reads at its own pace: the posting and the profile are kept to about 30,000 characters (a connection still gets its full room) */
function readRoom(){return room();}  /* 6.44: no cap of its own (it was 30,000 characters for a model on this device) */
function readMsgs(G,post,o,scale){var R=readRoom()*scale,wt=wantsText();
  var u="Read THE "+kindWord(o.kind).toUpperCase()+" against THE PROFILE for me, as an experienced admissions tutor and recruiter reads an application: generously and honestly. "+
    "Credit what transfers: a criterion may be met by what I have done in another setting, shown by its results, even where THE PROFILE uses other words than the "+kindWord(o.kind)+". Never credit what THE PROFILE does not show, and never invent.\n"+
    (wt?"0. First, how it matches WHAT I AM LOOKING FOR: for each of my wants and needs that it bears on, say whether it matches, partly matches or does not, from what it says.\n":"")+
    "1. List what it asks of the person, each criterion on its own line, in its own words, shortened. Mark each ESSENTIAL or DESIRABLE as it says; where it does not say, mark ESSENTIAL what it calls required, needed or must, and DESIRABLE the rest.\n"+
    "2. Judge each from THE PROFILE: MET (THE PROFILE shows it directly), TRANSFERABLE (THE PROFILE shows the same ability or knowledge in another setting, and a reader would accept it once the link is made plain), PARTLY (THE PROFILE shows part of it), or NOT SHOWN (nothing in THE PROFILE bears on it). "+
    "Name the entry it rests on exactly as THE PROFILE names it (or MY CV, or the name of one of MY DOCUMENTS or MY APPS), and say in one or two plain sentences what that entry shows and how it answers the criterion.\n"+
    "3. For PARTLY and NOT SHOWN, say what kind of gap it is: LEARNABLE (a tool, a method or a body of knowledge that could be learned or shown before applying or in the post), ASK ME (I may well have done it and THE PROFILE does not say), or REQUIRED (a formal requirement, such as a degree, a licence or a right to work, that no framing can bridge); then what would close it.\n"+
    "4. Then, in two or three sentences, how an admissions tutor or a hiring manager would see this application from this profile, and why; its strengths and its concerns, said plainly; the next steps; and any question worth asking the contact.\n"+
    "Answer in exactly this form, one item to a line, and nothing else:\n"+
    "TITLE: the post, programme or grant\nORGANISATION: who offers it\nCLOSES: the closing date as it gives it, or unknown\nKIND: JOB or PHD or GRANT or OTHER\n"+
    (wt?"WANT: what I am looking for or need | MATCHES or PARTLY or DOES NOT MATCH or NOT SAID | what it offers on that point\n(one WANT line for each of my wants and needs it bears on)\n":"")+
    "CRITERION: the criterion | ESSENTIAL or DESIRABLE | MET or TRANSFERABLE or PARTLY or NOT SHOWN | the entry it rests on, or none | what that entry shows and how it answers the criterion | for PARTLY or NOT SHOWN only: LEARNABLE or ASK ME or REQUIRED, and what would close the gap\n(one CRITERION line for each criterion, at most 14)\n"+
    "READING: how an admissions tutor or a hiring manager would see this application, and why, in two or three sentences\n"+
    "STRENGTH: a strength of this application, from the profile\nCONCERN: a weakness or a risk, said plainly\nNEXT: a concrete next step\nASK: a question worth asking the contact\n"+
    "LEAD: an entry of THE PROFILE to put first in this application, named exactly as THE PROFILE names it | the criteria it answers best\n(up to three LEAD lines, the strongest first; name only entries that are in THE PROFILE)\n\n"+
    "THE "+kindWord(o.kind).toUpperCase()+":\n"+cut(post,Math.floor(R*0.3))+"\n\n"+profileBlock(G,R*0.66);
  return [{role:"system",content:sys("You are now reading an opportunity against my profile for me, as an experienced admissions tutor and recruiter: you credit what transfers from my own record, you say plainly what is missing, and you never invent.")},{role:"user",content:u}];}
function parseRead(t){var r={title:"",org:"",closes:"",kind:"",wants:[],crit:[],strengths:[],concerns:[],next:[],asks:[],lead:[],view:""};
  String(t||"").replace(/<think>[\s\S]*?<\/think>/g,"").split("\n").forEach(function(line){var L=line.replace(/\*\*/g,"").replace(/^\s*(?:[-*•]\s*)?/,"").trim(),m=/^([A-Za-z][A-Za-z ]{1,14}):\s*(.*)$/.exec(L);if(!m)return;var k=m[1].trim().toUpperCase(),v=m[2].trim();if(!v)return;
    if(k==="TITLE")r.title=v;else if(k==="ORGANISATION"||k==="ORGANIZATION")r.org=v;else if(k==="CLOSES")r.closes=/^unknown$/i.test(v)?"":v;else if(k==="KIND")r.kind=v.toLowerCase();
    else if(k==="CRITERION"){var p=v.split("|").map(function(x){return x.trim();});if(!p[0])return;var ess=!/^desirable/i.test(p[1]||""),s2=p[2]||"",
        st=/transfer/i.test(s2)?"transfer":/not\s*shown|^no\b/i.test(s2)?"none":/^partly|^partial/i.test(s2)?"partly":/^met|^yes|^shown/i.test(s2)?"met":"none";
      var nw=p.length>=5,src=nw?(p[3]||""):"",ev=nw?(p[4]||""):(p[3]||""),gr=nw?(p[5]||""):"";
      if(p.length===5&&/^(learnable|ask\s*me|required)\b/i.test(p[4])){src="";ev=p[3]||"";gr=p[4];}
      src=src.replace(/^(none|n\/a|-|nothing)\.?$/i,"");ev=ev.replace(/^none\.?$/i,"");
      var gap=/^\s*requir|formal requirement|mandatory/i.test(gr)?"hard":/^\s*ask/i.test(gr)?"ask":/^\s*learn/i.test(gr)?"learn":"";
      var close=gr.replace(/^\s*(learnable|ask\s*me|ask|required)\s*[:,.;\-–—]?\s*/i,"").trim();
      if(st!=="none"&&!ev&&!src)st="partly";if(st==="met"||st==="transfer"){gap="";close="";}
      r.crit.push({text:p[0],ess:ess,st:st,ev:ev,src:src,gap:gap,close:close});}
    else if(k==="READING"){if(!r.view)r.view=v;}
    else if(k==="WANT"){var w=v.split("|").map(function(x){return x.trim();});if(!w[0])return;var ws=/does\s*not|^no\b/i.test(w[1]||"")?"none":/^partly|^partial/i.test(w[1]||"")?"partly":/not\s*said|unknown|unclear/i.test(w[1]||"")?"unsaid":/^match|^yes/i.test(w[1]||"")?"met":"unsaid";r.wants.push({text:w[0],st:ws,offer:w[2]||""});}
    else if(k==="STRENGTH")r.strengths.push(v);else if(k==="CONCERN")r.concerns.push(v);else if(k==="NEXT")r.next.push(v);else if(k==="ASK")r.asks.push(v);
    else if(k==="LEAD"){var ld=v.split("|").map(function(x){return x.trim();});if(ld[0]&&r.lead.length<3)r.lead.push({title:ld[0].replace(/^["“'‘]|["”'’]$/g,""),why:ld[1]||""});}});
  r.crit=r.crit.slice(0,14);return r;}
/* the band follows from the criteria by a fixed rule, shown with it; it is not a probability */
var BANDS={strong:"Strong fit",good:"Good fit",possible:"Possible fit",stretch:"A stretch",poor:"Not a fit as your profile stands"};
var BAND_A={strong:"a strong fit",good:"a good fit",possible:"a possible fit",stretch:"a stretch",poor:"not a fit"};
/* 6.22: what each judgement counts toward the band (shown with it as the rule) */
var CWT={met:1,transfer:0.85,partly:0.5,none:0};
function critPts(x,ifAsk){if(ifAsk&&x.st==="none"&&x.gap==="ask")return 1;var v=CWT[x.st];if(v==null)v=0;if(x.st==="none"&&x.gap==="learn")v=0.25;return v;}
function bandScore(E,Dz,ifAsk){function avg(a){return a.length?a.reduce(function(t,x){return t+critPts(x,ifAsk);},0)/a.length:1;}var es=avg(E);return Dz.length?es*0.8+avg(Dz)*0.2:es;}
function bandPick(sc,none,hard,unbr,ne){return hard>=2?"poor":hard===1?(sc>=0.6?"stretch":"poor"):(sc>=0.85&&none===0)?"strong":(sc>=0.7&&unbr===0)?"good":(sc>=0.5&&unbr<=ne/4)?"possible":sc>=0.3?"stretch":"poor";}
/* a reading made before 6.22 (no transfers, no entries named, no gaps typed) keeps the rule it was made under */
var BANDS0={strong:"Strong fit",possible:"Possible fit",stretch:"A stretch",poor:"Not a fit as your profile stands"};
function bandOf0(r){var c=r.crit||[];if(!c.length)return null;var E=c.filter(function(x){return x.ess;});if(!E.length)E=c;var Dz=c.filter(function(x){return E.indexOf(x)<0;});
  var met=E.filter(function(x){return x.st==="met";}).length,part=E.filter(function(x){return x.st==="partly";}).length,none=E.length-met-part,dm=Dz.filter(function(x){return x.st==="met";}).length+0.5*Dz.filter(function(x){return x.st==="partly";}).length;
  var b=none===0&&part<=E.length/4&&(!Dz.length||dm>=Dz.length/2)?"strong":none===0?"possible":(none===1||none<=E.length/3)?"stretch":"poor";
  var why=[];why.push(met+" of "+E.length+" essential criteria "+(E.length===1?"is":"are")+" shown plainly in your profile"+(part?"; "+part+" "+(part===1?"is":"are")+" only partly shown":"")+(none?"; "+none+" "+(none===1?"is":"are")+" not shown":"")+".");
  if(Dz.length){var dmet=Dz.filter(function(x){return x.st==="met";}).length;why.push("Of the "+Dz.length+" desirable, "+dmet+" "+(dmet===1?"is":"are")+" shown plainly.");}
  var adv={strong:"Apply. Lead with the criteria you meet most plainly.",possible:"Apply, and make the partly shown criteria plain in what you send: they are where a reader will hesitate.",
    stretch:"Apply only if you can show the missing criteria: add the evidence to your profile and read it again, or ask the contact first whether they would consider you.",poor:"Do not apply as things stand. If the missing criteria are things you have done, add them to your profile and read it again."}[b];
  return {band:b,word:BANDS0[b],why:why,advice:adv,rule:"The rule: every essential criterion shown and most desirable ones, a strong fit; every essential shown, a possible fit; one essential not shown (or up to a third), a stretch; more, not a fit. A criterion your profile does not show may still be one you meet: then add it to your profile."};}
function bandOf(r){var c=r.crit||[];if(!c.length)return null;if(!c.some(function(x){return x.st==="transfer"||x.src||x.gap;}))return bandOf0(r);var E=c.filter(function(x){return x.ess;});if(!E.length)E=c;var Dz=c.filter(function(x){return E.indexOf(x)<0;});
  function n(a,st){return a.filter(function(x){return x.st===st;}).length;}
  var met=n(E,"met"),tr=n(E,"transfer"),part=n(E,"partly"),none=n(E,"none");
  var hard=E.filter(function(x){return x.st!=="met"&&x.st!=="transfer"&&x.gap==="hard";}).length,ask=c.filter(function(x){return x.st==="none"&&x.gap==="ask";}).length;
  var unbr=E.filter(function(x){return x.st==="none"&&x.gap!=="learn";}).length,unbr2=E.filter(function(x){return x.st==="none"&&x.gap!=="learn"&&x.gap!=="ask";}).length;
  var sc=bandScore(E,Dz,false),b=bandPick(sc,none,hard,unbr,E.length);
  var b2=ask?bandPick(bandScore(E,Dz,true),E.filter(function(x){return x.st==="none"&&x.gap!=="ask";}).length,hard,unbr2,E.length):null;if(b2===b)b2=null;
  var bits=[];if(met)bits.push(met+" shown directly");if(tr)bits.push(tr+" "+(tr===1?"transfers":"transfer")+" from your other work");if(part)bits.push(part+" partly shown");if(none)bits.push(none+" not shown");
  var why=["Of the "+E.length+" essential criteria, "+bits.join(", ").replace(/, ([^,]*)$/," and $1")+"."];
  if(Dz.length){var dk=n(Dz,"met")+n(Dz,"transfer");why.push("Of the "+Dz.length+" desirable, "+dk+" "+(dk===1?"is":"are")+" shown or "+(dk===1?"transfers":"transfer")+".");}
  if(hard)why.push(hard===1?"One is a formal requirement your profile does not show (marked Required).":hard+" are formal requirements your profile does not show (marked Required).");
  if(b2)why.push((ask===1?"One criterion your profile does not show may be something you have done (marked Ask me). If it is, this would be ":ask+" criteria your profile does not show may be things you have done (marked Ask me). If they are, this would be ")+BAND_A[b2]+".");
  var adv={strong:"Apply. Lead with the criteria you meet most plainly, and give each transferable one a sentence that makes the link plain.",
    good:"Apply. Make each transferable criterion plain in your CV and letter, in the posting's own words: the bridges under What it asks say how, from your own record.",
    possible:"Worth applying if you want it: make the transferable and partly shown criteria plain, and say how you are closing the gaps marked Learnable.",
    stretch:"Apply only if you want it enough to make the case: close what you can (Learnable), answer the Ask me ones, and consider writing to the contact first.",
    poor:hard?"Not as things stand: it asks for a formal requirement your profile does not show. If you do hold it, add it to your profile and read it again.":"Not as things stand. If the criteria not shown are things you have done, add them to your profile and read it again."}[b];
  return {band:b,word:BANDS[b],why:why,advice:adv,score:Math.round(sc*100)/100,ifAsk:b2?{band:b2,word:BANDS[b2]}:null,
    rule:"The rule: each essential criterion counts 1 when shown directly, 0.85 when it transfers from your other work, 0.5 when partly shown, 0.25 when not shown but learnable, and 0 otherwise; the desirable ones count for a fifth. 0.85 or more, with no essential criterion missing, is a strong fit; 0.7 or more, with every missing essential one learnable, a good fit; 0.5 or more, with no more than a quarter of the essential ones missing and not learnable, a possible fit; 0.3 or more, a stretch; below that, not a fit. A formal requirement that is not shown makes it a stretch at best. It is not a probability, and a criterion your profile does not show may still be one you meet: then add it to your profile."};}
function readOpp(o){if(busyNow()||needModel())return;begin(o,"Reading it against your profile");
  Promise.all([postText(o),gatherProfile({opp:o})]).then(function(x){var post=x[0],G=x[1];if(!post)throw new Error("the posting's text is no longer kept; add it again");
    return ask(function(sc){return readMsgs(G,post,o,sc);},1700,0.2).then(function(t){var r=parseRead(t);
      if(!r.crit.length)throw new Error("the model's answer could not be read as criteria. Try again, or choose a larger model for Lector");
      vetEvidence(r,G);vetLead(r,G);
      if(r.title&&!o.titleSet)o.title=r.title.slice(0,120);if(r.org&&!o.orgSet)o.org=r.org.slice(0,120);if(r.closes&&(!o.closes||o.closes.length>40))o.closes=r.closes.slice(0,80);if(!o.due&&dateIn(o.closes))o.due=dateIn(o.closes);
      if(/phd|dphil|doctor/i.test(r.kind)&&o.kind==="job"&&!o.kindSet)o.kind="phd";else if(/grant|fellow/i.test(r.kind)&&o.kind==="job"&&!o.kindSet)o.kind="grant";
      o.read={at:Date.now(),model:modelName(),r:r,think:String(RUN.think||"").slice(0,24000),how:6.22};o.step="fit";save();});}).then(end,failed);}

/* 6.9.8 · the reading vetted against her profile. Each piece of evidence it names is looked for in her profile itself: found in
   its words, or nearly (most of its words of substance are there), it stands; not found, a "shown" falls to "partly shown" until
   she checks it, and the table says so. A reading may summarise her profile; it may not bring in what her profile does not hold.
   The entries it says to lead with are kept only when they are entries of her profile, named as her profile names them. */
var VET_STOP={"with":1,"that":1,"this":1,"from":1,"have":1,"been":1,"were":1,"which":1,"their":1,"they":1,"them":1,"into":1,"also":1,"more":1,"most":1,"some":1,"such":1,"than":1,"then":1,"there":1,"these":1,"those":1,"what":1,"when":1,"where":1,"while":1,"about":1,"over":1,"under":1,"very":1,"your":1,"yours":1,"other":1,"each":1,"both":1,"only":1,"just":1,"through":1,"across":1,"including":1,"profile":1,"shows":1,"shown":1,"evidence":1,"none":1,"plainly":1,"partly":1,"does":1,"doing":1,"done":1,"being":1,"will":1,"would":1,"could":1,"should":1,"years":1,"year":1};
function vetPlain(s){return String(s||"").toLowerCase().normalize("NFKD").replace(/[\u0300-\u036f]/g,"").replace(/[^a-z0-9]+/g," ");}
function vetWords(s){var a=vetPlain(s).split(" ").filter(function(w){return w.length>3&&!VET_STOP[w];});return a.filter(function(w,i){return a.indexOf(w)===i;});}
function vetSrc(src,G){var s=vetPlain(src).trim();if(!s)return null;if(/^(my )?cv\b|curriculum vitae|^resume/.test(s))return G.cv?"cv":null;
  var P=CS().profile,sw=vetWords(src);
  if(sw.length){var best=0;P.items.forEach(function(x){if(x.src==="linkedin"&&!P.use.linkedin)return;var iw=vetWords(x.title+" "+(x.place||""));if(!iw.length)return;
      var hit=sw.filter(function(w){return iw.some(function(y){return y===w||(y.length>5&&w.length>5&&(y.indexOf(w)===0||w.indexOf(y)===0));});}).length,sc=hit/Math.min(sw.length,iw.length);if(sc>best)best=sc;});
    if(best>=0.6)return "entry";}
  if((G.files||[]).some(function(f){var nm=vetPlain(f.name).replace(/\b(docx|pdf|txt|md|rtf|html?)\b/g," ").trim();return nm&&(s.indexOf(nm)>=0||nm.indexOf(s)>=0);}))return "doc";
  if((G.apps||[]).some(function(a){var nm=vetPlain(a.name).trim();return nm&&s.indexOf(nm)>=0;}))return "app";
  return null;}
function vetEvidence(r,G){var M=" "+vetPlain(material(G))+" ";
  (r.crit||[]).forEach(function(c){c.vet="";c.at="";if((!c.ev&&!c.src)||c.st==="none")return;
    var ws=vetWords(c.ev),share=1;if(ws.length){var hit=ws.filter(function(w){return M.indexOf(" "+w)>=0||(w.length>6&&M.indexOf(" "+w.slice(0,w.length-2))>=0);}).length;share=hit/ws.length;}
    var at=c.src?vetSrc(c.src,G):null;c.at=at||"";
    c.vet=(at&&share>=0.2)||share>=0.7?"found":at?"check":share>=0.45?"near":"missing";
    if(c.vet==="missing"&&(c.st==="met"||c.st==="transfer")){c.was=c.st;c.st="partly";}});
  return r;}
function vetLead(r,G){var P=CS().profile,out=[];
  (r.lead||[]).forEach(function(l){var lw=vetWords(l.title);if(!lw.length)return;var best=null,bs=0;
    P.items.forEach(function(it){if(it.src==="linkedin"&&!P.use.linkedin)return;var iw=vetWords(it.title+" "+(it.place||""));if(!iw.length)return;var hit=lw.filter(function(w){return iw.some(function(x){return x===w||(x.length>5&&w.length>5&&(x.indexOf(w)===0||w.indexOf(x)===0));});}).length,sc=hit/lw.length;if(sc>bs){bs=sc;best=it;}});
    var app=(G.apps||[]).filter(function(a){var n=vetPlain(a.name).trim();return n&&(vetPlain(l.title).indexOf(n)>=0);})[0];
    if(best&&bs>=0.6){if(!out.some(function(x){return x.id===best.id;}))out.push({id:best.id,title:best.title+(best.place?", "+best.place:""),why:l.why});}
    else if(app){if(!out.some(function(x){return x.app===app.name;}))out.push({app:app.name,title:app.name+" (an app you designed and built)",why:l.why});}
    else r.leadOff=(r.leadOff||0)+1;});
  r.lead=out;return r;}

/* ---------------- the documents ---------------- */
var DOCS={cv:["Tailored CV","A CV in the order this application asks for, from your profile alone."],
  cover:["Cover letter","A letter of four or five paragraphs: what you apply for, the evidence, why here, the close."],
  supporting:["Supporting statement","Each criterion in turn, with your evidence under it; what your profile does not show is left for you."],
  statement:["Personal statement","Why this programme, your preparation, your research and what you bring."],
  proposal:["Research proposal outline","An outline in the usual parts, with what your documents already give and the questions still open."],
  purpose:["Statement of purpose","The research you mean to do, how you are prepared for it, why this programme and its people, and where it leads."],
  teaching:["Teaching statement","How you teach and why, shown through moments from your own teaching, and how you would teach here."],
  funding:["Funding application","The case for funding you: the project, why it matters, what you have done, and what the funding makes possible."],
  sample:["Writing sample: which to send","Which of your own writings to send as the writing sample, why, and how to bring it within the limit, without rewriting it."],
  portfolio:["Portfolio","Two to four pieces of your own work as short case studies, chosen and ordered for this application."]};
var FOR={job:["cv","cover","supporting","portfolio"],phd:["statement","purpose","proposal","sample","cv","cover","funding","portfolio"],grant:["proposal","funding","statement","cv","cover"],other:["cv","cover","supporting","statement","purpose","proposal","teaching","funding","sample","portfolio"]};
var ROLES=[["supervisor","A prospective supervisor"],["pastsup","A past or present supervisor"],["referee","A referee"],["mentor","A mentor"],["manager","A hiring manager"],["recruiter","A recruiter"],["contact","The contact named in the posting"]];
var PURPOSES=[["enquire","To ask about the post or programme"],["advice","To ask for advice on my application"],["introduce","To introduce myself and my research"],["reference","To ask for a reference"],["followup","To follow up on my application"],["thanks","To thank them after an interview"],["accept","To accept an offer"],["decline","To decline an offer"]];
function critBlock(o){var r=o.read&&o.read.r;if(!r||!r.crit.length)return "";return "THE CRITERIA, AS READ AGAINST MY PROFILE (for TRANSFERS, make the link plain in a sentence drawn from the entry named; never claim what is NOT SHOWN):\n"+r.crit.map(function(c){return "- "+c.text+" ("+(c.ess?"essential":"desirable")+"; "+({met:"shown",transfer:"TRANSFERS",partly:"partly shown: say what I have, do not claim the rest",none:"NOT SHOWN: do not claim it"}[c.st]||"not shown")+(c.src?"; from: "+c.src:"")+(c.ev?"; "+(c.st==="transfer"?"the link: ":"evidence: ")+c.ev:"")+(c.st==="none"&&c.gap==="learn"&&c.close?"; I may say how I am closing it: "+c.close:"")+")";}).join("\n");}
function voiceBlock(G,R){var out=[];if(G.writing.length)out.push("MY OWN WRITING (match its voice and rhythm; do not copy its content):\n"+cut(G.writing.join("\n\n---\n\n"),Math.floor(R*0.06)));
  if(G.letters.length)out.push("MY PAST LETTERS (for their shape and tone only; their facts may be out of date):\n"+cut(G.letters.join("\n\n---\n\n"),Math.floor(R*0.06)));return out.join("\n\n");}
function sourcesBlock(G){if(!G.sources.length)return "";return "MY SOURCES (cite one by its number in square brackets, like [2], only where it supports the sentence; invent none and use none that is not here):\n"+G.sources.map(function(s){return "["+s.n+"] "+s.text;}).join("\n");}
/* 6.8.5: a limit the posting sets for a document (words or pages), read from its own sentences */
var NUMW={one:1,two:2,three:3,four:4,five:5,six:6,seven:7,eight:8,nine:9,ten:10};
function limitsIn(post){var out={};
  function kindOf(s){return /cover(?:ing)? letter|letter of (?:application|motivation)|motivation(?:al)? letter/.test(s)?"cover":/supporting statement|statement in support/.test(s)?"supporting":
      /statement of (?:purpose|intent)|purpose statement/.test(s)?"purpose":/teaching (?:statement|philosophy)/.test(s)?"teaching":/writing sample|sample of (?:your )?(?:written|academic) work/.test(s)?"sample":/funding (?:application|statement)|scholarship (?:application|statement)|case for support/.test(s)?"funding":/personal statement|research statement/.test(s)?"statement":/proposal/.test(s)?"proposal":/\bcvs?\b|curriculum vitae|r[eé]sum[eé]/.test(s)?"cv":"";}
  String(post||"").replace(/\r/g,"").split(/\n+|[.;!?](?:\s+|$)/).forEach(function(s0){var last="";
    /* each clause on its own, so "a CV of two pages and a statement of 1,000 words" gives each its own; a clause that names
       no document takes the one named before it in the sentence */
    s0.toLowerCase().replace(/[\u2010-\u2015]/g,"-").split(/,\s+|\s+and\s+|\s*[()]\s*/).forEach(function(s){var k=kindOf(s)||last;if(kindOf(s))last=kindOf(s);
      var w=/(?:no more than|not (?:to )?exceed(?:ing)?|maximum(?: of)?|max\.?|up to|at most|(?:word )?limit(?:ed)?(?:\s+(?:of|to)|:)?|not longer than|no longer than)\s*(\d[\d,]*)\s*words?/.exec(s)||/(\d[\d,]*)\s*words?\s*(?:maximum|max\b|or (?:less|fewer)|at most|in length)/.exec(s)||/(\d[\d,]*)[- ]word (?:limit|maximum|max\b)/.exec(s);
      var pg=/(?:no more than|not (?:to )?exceed(?:ing)?|maximum(?: of)?|max\.?|up to|at most|not longer than|no longer than)\s*(\d+|one|two|three|four|five|six)\s*(?:a4\s*)?(?:pages?|sides?)/.exec(s)||/(\d+|one|two|three|four)[- ](?:a4[- ])?(?:page|side)s? (?:maximum|limit|max\b)/.exec(s);
      k=k||"any";
      if(w){var n=parseInt(w[1].replace(/,/g,""),10);if(n>=50&&n<=20000&&!(out[k]&&out[k].words))out[k]={words:n};}
      else if(pg){var m=NUMW[pg[1]]||parseInt(pg[1],10);if(m>=1&&m<=40&&!out[k])out[k]={pages:m};}});});return out;}
function limitFor(post,kind){var L=limitsIn(post);return L[kind]||(/^(supporting|statement|proposal|purpose|teaching|funding)$/.test(kind)?L.any:null)||null;}
function limitLine(l){return l.words?"THE POSTING SETS A LIMIT of "+l.words+" words: stay within it, at about "+Math.round(l.words*0.92)+" words.":"THE POSTING SETS A LIMIT of "+l.pages+" page"+(l.pages>1?"s":"")+": stay within it.";}
function wordCount(md){return (String(md||"").replace(/^#{1,6}\s+/gm,"").match(/[A-Za-zÀ-ÿ0-9][^\s]*/g)||[]).length;}
/* which criteria a draft speaks to: a match of their own words in it, a guide and not a judgement */
var STOPW={};("with that this from have been will your their which into such other more most some able ability experience demonstrable demonstrated demonstrate evidence knowledge understanding skills skill excellent strong good proven relevant related field fields including within work working must should would could also both each well high level levels range wide areas area across through using used able essential desirable degree").split(" ").forEach(function(w){STOPW[w]=1;});
function stemsOf(t){var out={};String(t||"").replace(/\[[^\]]*\]/g," ").split(/[^A-Za-zÀ-ÿ0-9]+/).forEach(function(w0){var w=w0.toLowerCase();
    /* short words count only when they are names such as PhD, MSc or GIS */
    if((w.length<4&&!/[A-Z].*[A-Z]/.test(w0))||STOPW[w])return;out[w.slice(0,5)]=1;});return out;}
function coverage(md,crit){if(!crit||!crit.length)return null;var S=stemsOf(String(md||"").replace(/^#{1,6}\s.*$/gm," "));
  var res=crit.map(function(c){var k=Object.keys(stemsOf(c.text));if(!k.length)return {c:c,ok:true};var hit=k.filter(function(x){return S[x];}).length;return {c:c,ok:hit>=Math.min(2,k.length)&&hit/k.length>=0.5};});
  return {n:res.filter(function(x){return x.ok;}).length,of:res.length,missEss:res.filter(function(x){return !x.ok&&x.c.ess;}).map(function(x){return x.c.text;}),miss:res.filter(function(x){return !x.ok;}).map(function(x){return x.c.text;})};}
function to(o){var t=[o.title,o.org].filter(Boolean).join(", ");return t||"this "+({job:"post",phd:"programme",grant:"grant"}[o.kind]||"opportunity");}
function docAsk(kind,o,G,post,em){
  var what={cv:"Write my CV for my application to "+to(o)+", in Markdown. Use level-two headings (##) for its sections, in the order that serves this application best, from these: Education, Posts held, Research and publications, Teaching, Projects, Skills, Languages, Awards and funding, Referees. Leave out a section the profile has nothing for. Each entry: one line in bold giving what and where, then the dates after a comma; then up to four bullet points, each beginning with a verb, naming concrete work and exact figures from the profile. Put first what the posting asks for most. Do not write my name or my contact details: they are set above the CV. Write no introduction and no closing note.",
    cover:"Write my cover letter for "+to(o)+". Four or five paragraphs. Begin with \"Dear [the reader's name],\" unless the posting names the reader. The opening says what I apply for and why, in one or two sentences. The middle paragraphs set my evidence from the profile against what the posting asks, the essential criteria first, naming concrete work. Then why this organisation or programme, from what the posting itself says of it. Close courteously, and end with \"Yours sincerely,\" when the reader is named, otherwise \"Yours faithfully,\", and then my name. No headings.",
    supporting:"Write my supporting statement for "+to(o)+". Take each criterion in turn, the essential ones first, as a level-two heading (##) in the posting's own words. Under each, one or two paragraphs giving my evidence from the profile: what I did, how I did it and what came of it. Where the criteria list says NOT SHOWN, write under that heading only: [Not shown in your profile: add your evidence here, or leave this criterion out.] Never invent evidence.",
    statement:"Write my personal statement for "+to(o)+", in about 750 words, in paragraphs, without headings: why this programme and why now; how my studies and work have prepared me, with concrete evidence from the profile; the research I want to do and how it meets what the programme offers, as the call describes it; what I would bring. Name no supervisor, method or source that the profile and the call do not name.",
    proposal:"Write an outline of my research proposal for "+to(o)+": an outline to work from, not a finished proposal. Use these level-two headings (##): Working title; The question; Why it matters; What is already known; Approach and methods; Sources and materials; Timetable; Fit with the programme. Under each, first what my profile and documents already give, in my own words, as short paragraphs; then, as a short list in square brackets, the questions I must still answer for that part. Never invent a finding, a source, a method or a date I have not named.",
    purpose:"Write my statement of purpose for "+to(o)+", in about 1,000 words, in paragraphs, without headings: the research I mean to do and the question at its centre, said plainly and early; how my studies, my work and my writing have prepared me for it, with concrete evidence from the profile; which parts of this programme, as the call describes them, my work needs, and why; and what I mean to do with the degree afterwards. Name no supervisor, method, source or outcome that the profile and the call do not name.",
    teaching:"Write my teaching statement for "+to(o)+", in about 700 words, in paragraphs, without headings: what I believe helps students learn, shown through concrete moments from my own teaching in the profile (what I taught, to whom, what I did, and what came of it); how I would teach what this post asks for, from what the posting says; and how I keep improving my teaching. Where the profile gives no teaching at all, write only: [Your profile holds no teaching yet: add an entry under Teaching, then write this again.]",
    funding:"Write my funding application for "+to(o)+": the case for funding me. Use these level-two headings (##), unless the call names its own sections, in which case use those, in its order: The project; Why it matters; What I have done so far; What the funding makes possible; Fit with the funder. Under each, short paragraphs from the profile and my documents. Where the profile is silent, leave a place in square brackets saying what is needed. Never invent a figure, a cost, a date or an outcome.",
    portfolio:"Write my portfolio for "+to(o)+", in Markdown: two to four pieces of my own work as short case studies, those that answer the posting's criteria best, the strongest first. For each, a level-two heading (##) with the piece's name; then, in short paragraphs or bullets: What it is; My part; The problem or question; What I did (methods and tools); What came of it (only what THE PROFILE gives: no figure, user number or outcome it does not give); What it shows for this application (the criteria it answers, in the posting's words); Where to see it (a link only if THE PROFILE gives one, otherwise [a link]). Draw on MY APPS, AS LECTOR READ THEM, my documents and my entries. Half a page for each piece at most. No introduction and no closing note.",
    sample:"Choose, from MY OWN WRITING below, the piece best suited to send as the writing sample for "+to(o)+". Answer in plain words, under three level-two headings (##): Which to send (its number and first words, and why it suits what the call asks); How to bring it within the limit (which parts to keep and which to cut, naming them, without rewriting a sentence); What to say about it (one or two sentences introducing it, only if the call asks for a note). If MY OWN WRITING holds nothing, write only: [No writing of yours is kept yet: add your writing to your profile's sources, then ask again.]",
    email:""}[kind];
  if(kind==="email"){var role=(ROLES.filter(function(x){return x[0]===em.role;})[0]||ROLES[5])[1].toLowerCase(),pur=(PURPOSES.filter(function(x){return x[0]===em.purpose;})[0]||PURPOSES[0])[1].toLowerCase();
    what="Write an email from me to "+role+", "+pur+", about "+to(o)+". Begin with a line \"Subject: \" and the subject, then a blank line, then the email. Courteous, direct and specific, with one clear request; "+(em.purpose==="introduce"?"no more than 300 words":"no more than 180 words")+". Greet the person by name only if the profile or the posting names them; otherwise write [their name]. Sign it with my name."+(em.extra?" Also: "+em.extra:"");}
  /* 6.10.2: the template chosen for this application (modules/r209.js), for its CV, its letter and its portfolio */
  var tpl=(kind==="cv"||kind==="cover"||kind==="portfolio")?tplOf(o):null;if(tpl)what+="\n\n"+W.IngTemplates.block(tpl,kind);
  var lim=kind==="email"?null:limitFor(post,kind);
  if(lim&&lim.words&&kind==="statement")what=what.replace("in about 750 words","in no more than "+lim.words+" words");
  if(lim&&lim.words&&kind==="purpose")what=what.replace("in about 1,000 words","in no more than "+lim.words+" words");
  if(lim&&lim.words&&kind==="teaching")what=what.replace("in about 700 words","in no more than "+lim.words+" words");
  /* Step by step: the plan she approved, part by part */
  var pl=kind!=="email"&&o.plan&&o.plan[kind]&&o.plan[kind].use?o.plan[kind].text:"";
  if(lim)what+=" "+limitLine(lim);
  var prose=kind!=="cv";
  return function(sc){var R=room()*sc;var u=what+(pl?"\n\nFOLLOW THIS PLAN, WHICH I APPROVED, PART BY PART AND IN ITS ORDER (a part I struck out stays out):\n"+pl:"")+"\n\n"+(post?"THE "+kindWord(o.kind).toUpperCase()+":\n"+cut(post,Math.floor(R*0.2))+"\n\n":"")+(critBlock(o)?critBlock(o)+"\n\n":"")+profileBlock(G,R*(kind==="sample"?0.3:0.6))+
      (kind==="sample"?"\n\nMY OWN WRITING (choose among these only):\n"+(G.writing.length?G.writing.map(function(w,i){return "["+(i+1)+"] "+cut(w,Math.floor(R*0.45/G.writing.length));}).join("\n\n"):"(nothing kept)"):prose?"\n\n"+voiceBlock(G,R):"")+(kind==="statement"||kind==="proposal"||kind==="purpose"||kind==="funding"?"\n\n"+sourcesBlock(G):"");
    return [{role:"system",content:sys(kind==="cv"?"You are now writing a CV: plain, factual lines, nothing promotional.":"",prose&&kind!=="email")},{role:"user",content:u}];};}
/* the second reading: every claim held to the profile, every figure to what it gives; the placeholders kept */
/* 6.9.2: for the documents of a doctoral application the examiner is given the reading page's own instructions (a claim inferred
   marked as inferred, one idea to a paragraph, the limit kept, a citation only where a source supports it), and the share of the
   words it changed is kept, to be shown with the document as the reading page shows it */
function examine(kind,body,G,post,o){EXAM.last=null;if(!body||body.length<80)return Promise.resolve(body);RUN.what="Examining it against your profile";render();
  var doc=/^(statement|purpose|proposal|funding|supporting|teaching)$/.test(kind),lim=doc?limitFor(post,kind):null,k=3;function n(){return (++k)+". ";}
  return ask(function(sc){var R=room()*sc;k=3;return [{role:"system",content:sys("You are now the examiner of a draft"+(doc?", as an Oxford or Cambridge doctoral examiner would be":"")+". You return the revised text and nothing else.")},
    {role:"user",content:"Below is the draft of my "+(kind==="email"?"email":DOCS[kind][0].toLowerCase())+". Examine it against THE PROFILE"+(doc?" as an Oxford or Cambridge doctoral examiner would, against the material that follows,":"")+" and return it revised.\n1. Strike every claim about me that the profile does not support, and every skill, post, date, figure or name it does not give.\n2. Make every figure and date exactly what the profile gives.\n3. Keep the shape, the headings and the placeholders in square brackets where they stand.\n"+
      (doc?n()+"Mark as inferred (\"on this reading\", \"the evidence suggests\") every claim that is inferred rather than shown, and call nothing proven; no superlative without a measure beside it.\n"+n()+"One idea to a paragraph, the topic sentence first; take out filler, repetition and every promotional word; prefer the concrete to the general.\n"+n()+"Keep each citation in square brackets only where the source supports the sentence; take it out where it does not; add none that is not on MY SOURCES.\n"+(lim?n()+limitLine(lim)+"\n":""):"")+
      n()+english()+"; no contractions; no promotional words.\nReturn only the revised text: no notes on what you changed.\n\n"+profileBlock(G,R*0.6)+"\n\n"+(critBlock(o)?critBlock(o)+"\n\n":"")+"THE DRAFT:\n"+body}];},Math.round(body.length/3)+400,0.2)
    .then(function(x){var r=clean(x);if(!r||r.length<body.length*0.45||/^(the draft|here is|revised)/i.test(r.slice(0,24))){EXAM.last=0;return body;}EXAM.last=wordsChanged(body,r);return r;},function(e){if(String(e&&e.message)==="stopped")throw e;EXAM.last=0;return body;});}
function clean(t){t=String(t||"").replace(/<think>[\s\S]*?<\/think>/g,"").trim();t=t.replace(/^```(?:markdown|md)?\n([\s\S]*?)\n```$/,"$1");var L=t.split("\n");while(L.length&&/^#\s/.test(L[0]))L.shift();return L.join("\n").trim();}
/* figures the profile does not give, and the places left for her to fill */
function checks(md,mat){var miss=[],seen={};(String(md).match(/\b\d[\d,.]*\d\b|\b\d{2,}\b/g)||[]).forEach(function(n){var k=n.replace(/[.,]+$/,"");if(seen[k]||k.replace(/\D/g,"").length<2)return;seen[k]=1;if(mat.indexOf(k)<0&&mat.indexOf(k.replace(/,/g,""))<0)miss.push(k);});
  return {figures:miss.slice(0,20),fills:(String(md).match(/\[[^\]\n]{2,160}\]/g)||[]).length};}
function writeDoc(o,kind,em){if(busyNow()||needModel())return Promise.resolve(false);begin(o,"Writing the "+(kind==="email"?"email":DOCS[kind][0].toLowerCase()));
  return Promise.all([postText(o),gatherProfile({voice:kind!=="cv",cite:kind==="statement"||kind==="proposal"||kind==="purpose"||kind==="funding",opp:o})]).then(function(x){var post=x[0],G=x[1];
    if(!G.items&&!G.cv&&!G.files.length&&!G.apps.length)throw new Error("your profile is empty. Add your CV or a few entries in Your profile first: the studio writes only from what it holds");
    return ask(docAsk(kind,o,G,post,em),kind==="cv"||kind==="proposal"||kind==="supporting"||kind==="funding"||kind==="portfolio"?2200:kind==="statement"||kind==="purpose"?2000:kind==="teaching"?1500:kind==="sample"?900:kind==="email"?700:1300,kind==="cv"?0.35:0.5)
      .then(function(t){return kind==="sample"?clean(t):examine(kind,clean(t),G,post,o);}).then(function(md){var sf={md:md,line:""};try{if(kind!=="email"&&!american())sf=LXR().styleFix(md);}catch(e){}md=sf.md;
        var ck=checks(md,material(G)+"\n"+post);ck.style=sf.line||"";ck.exam=EXAM.last;var ref=IngBig.newId();
        return Promise.resolve(IngBig.put(ref,md)).then(function(){var rec={ref:ref,made:Date.now(),model:modelName(),chk:ck};
          if(kind==="email"){rec.id=uid("em");rec.role=em.role;rec.purpose=em.purpose;o.emails.unshift(rec);o.sv={kind:"email",id:rec.id};}
          else{keepOlder(o,kind);o.docs[kind]=rec;o.sv={kind:kind};}
          if(o.stage==="considering")o.stage="preparing";o.step="send";o.edit=false;o.tab="doc";save();return true;});});}).then(function(r){end();return r;},function(e){failed(e);return false;});}
function keepOlder(o,kind){o.older=o.older||{};var old=o.docs[kind];if(!old)return;o.older[kind]=[old].concat(o.older[kind]||[]);while(o.older[kind].length>2){var z=o.older[kind].pop();try{IngBig.del(z.ref);}catch(e){}}}
/* 6.8.5: improve a draft with a note of her own; the version before is kept, and comes back with one press */
var TUNE=[["Shorter","Make it about a fifth shorter: keep every point that matters, and cut repetition and padding."],
  ["Warmer","Make the tone warmer and more personal, still professional, with no flattery."],
  ["More formal","Make the tone more formal and measured."],
  ["Plainer words","Use plainer, shorter words and shorter sentences."],
  ["Essential criteria first","Put the evidence for the essential criteria first."]];
function reviseDoc(o,v,rec,note){if(busyNow()||needModel())return Promise.resolve(false);note=String(note||"").trim();if(note.length<4){say("Say what should change first.");return Promise.resolve(false);}
  var kind=v.kind,isMail=kind==="email",label=isMail?"email":DOCS[kind][0].toLowerCase().replace(/^tailored cv$/,"tailored CV");begin(o,"Improving the "+label);
  return Promise.all([postText(o),gatherProfile({voice:kind!=="cv",cite:kind==="statement"||kind==="proposal"||kind==="purpose"||kind==="funding",opp:o}),loadText(rec.ref)]).then(function(x){var post=x[0],G=x[1],cur=x[2],lim=isMail?null:limitFor(post,kind);
    if(!cur||cur.length<40)throw new Error("the draft could not be read");
    return ask(function(sc){var R=room()*sc;return [{role:"system",content:sys("You are now revising a draft of mine as I ask. You return the whole revised text and nothing else.",!isMail&&kind!=="cv")},
      {role:"user",content:"Revise my "+label+" as I ask below, and change nothing else.\nWHAT I ASK: "+note+"\n"+(lim?limitLine(lim)+"\n":"")+
        "Keep its form: the headings, their order and every placeholder in square brackets, unless what I ask changes them. Add no claim, skill, post, date, figure, name or source that THE PROFILE does not give. "+english()+"; no contractions; no promotional words.\nReturn only the revised text: no notes on what you changed.\n\n"+
        (post?"THE "+kindWord(o.kind).toUpperCase()+":\n"+cut(post,Math.floor(R*0.15))+"\n\n":"")+(critBlock(o)?critBlock(o)+"\n\n":"")+profileBlock(G,R*0.5)+"\n\nTHE DRAFT:\n"+cur}];},Math.round(cur.length/3)+600,0.4)
    .then(function(t){var r=clean(t);if(!r||r.length<Math.min(80,cur.length*0.3))throw new Error("the model gave back too little, so the draft stays as it was");return examine(kind,r,G,post,o);})
    .then(function(md){var sf={md:md,line:""};try{if(!isMail&&!american())sf=LXR().styleFix(md);}catch(e){}md=sf.md;var ck=checks(md,material(G)+"\n"+post);ck.style=sf.line||"";ck.exam=EXAM.last;var ref=IngBig.newId();
      if(!isMail&&wayOf(o)==="step")return Promise.resolve(IngBig.put(ref,md)).then(function(){dropReview(o);o.review={kind:kind,base:rec.ref,ref:ref,note:note,at:Date.now(),dec:{},why:{},chk:ck};o.improve=false;o.edit=false;o.tab="doc";save();return "review";});
      return Promise.resolve(IngBig.put(ref,md)).then(function(){var made={ref:ref,made:Date.now(),model:modelName(),chk:ck,note:note};
        if(isMail){rec.older=[{ref:rec.ref,made:rec.made,model:rec.model,chk:rec.chk,note:rec.note||""}].concat(rec.older||[]);while(rec.older.length>2){var z=rec.older.pop();try{IngBig.del(z.ref);}catch(e){}}Object.assign(rec,made);}
        else{keepOlder(o,kind);o.docs[kind]=made;}
        o.improve=false;o.edit=false;o.tab="doc";save();return true;});});})
  .then(function(r){end();if(r==="review")say("Each change waits for you: keep it, or keep your own words.");else if(r)say("Improved. The version before is kept: The version before brings it back.");return r;},function(e){failed(e);return false;});}
function olderOf(o,v,rec){return v.kind==="email"?(rec.older||[]):((o.older||{})[v.kind]||[]);}
function earlier(o,v,rec){if(v.kind==="email"){if(!rec.older||!rec.older.length)return;var p=rec.older.shift(),cur={ref:rec.ref,made:rec.made,model:rec.model,chk:rec.chk,note:rec.note||""};Object.assign(rec,p);rec.older.unshift(cur);}
  else{var list=(o.older||{})[v.kind];if(!list||!list.length)return;var prev=list.shift();list.unshift(o.docs[v.kind]);o.docs[v.kind]=prev;}o.improve=false;save();render();say("The version before is back. The other is kept, one press away.");}
function docRec(o,v){if(!v)return null;if(v.kind==="email")return o.emails.filter(function(e){return e.id===v.id;})[0]||null;return o.docs[v.kind]||null;}
function paperKind(kind){return kind==="cover"?"cover":"cv";}
function paperOf(o,kind,md){var P=CS().profile,title=kind==="cv"?myName()||"Curriculum vitae":DOCS[kind][0],sub=kind==="cv"?P.contact:[myName(),to(o)].filter(Boolean).join(" · ");
  return {kind:paperKind(kind),title:[myName(),DOCS[kind][0],to(o)].filter(Boolean).join(" · "),o:{title:title,plain:true,from:myName(),head:kind==="cover"?"":title,headSub:kind==="cover"?"":sub}};}
function savePaper(o,kind,fmt){var rec=o.docs[kind];if(!rec)return;loadText(rec.ref).then(function(md){var pp=paperOf(o,kind,md),what=fmt==="pdf"?"PDF":"Word file";
  if(!W.IngDoc||!IngDoc.make||!W.IngLectorPaper){say("This device cannot make the "+what+".");return;}say("Making the "+what+", as the page shows it…");
  (IngDoc.ready?IngDoc.ready():Promise.resolve()).then(function(){return IngDoc.make(fmt,IngLectorPaper.page(pp.kind,md,pp.o),IngLectorPaper.opts(pp.kind,[],pp.title));})
    .then(function(r){var name=lxFileName(pp.title);saveFileNative(name+"."+fmt,fmt==="pdf"?"application/pdf":"application/vnd.openxmlformats-officedocument.wordprocessingml.document",r.bytes);},
      function(e){say("The "+what+" could not be made: "+(e&&e.message||e));});});}
/* 6.9.1: the document as the Word file Save as Word gives, handed to Tabula to keep writing it there (modules/r194.js) */
function paperFile(o,kind){var rec=o.docs[kind];if(!rec)return Promise.reject(new Error("There is no such document yet."));
  return loadText(rec.ref).then(function(md){var pp=paperOf(o,kind,md);if(!W.IngDoc||!IngDoc.make||!W.IngLectorPaper)throw new Error("this device cannot make the Word file");
    return (IngDoc.ready?IngDoc.ready():Promise.resolve()).then(function(){return IngDoc.make("docx",IngLectorPaper.page(pp.kind,md,pp.o),IngLectorPaper.opts(pp.kind,[],pp.title));})
      .then(function(r){return {title:pp.title,name:lxFileName(pp.title)+".docx",bytes:r.bytes};});});}
function openInTabula(o,kind){if(!W.IngOpenIn){say("Tabula cannot be reached in this copy of the page.");return;}say("Making the Word file for Tabula…");
  paperFile(o,kind).then(function(f){return IngOpenIn.open("tabula",{title:f.title,file:{name:f.name,mime:"application/vnd.openxmlformats-officedocument.wordprocessingml.document",bytes:f.bytes}});}).then(null,function(e){say("It could not be opened in Tabula: "+(e&&e.message||e));});}
(function(){(W.__ingOpenInProviders=W.__ingOpenInProviders||[]).push({list:function(){var out=[];try{(ROOT().people||[]).forEach(function(p){(p.opps||[]).forEach(function(o){Object.keys(o.docs||{}).forEach(function(kind){var rec=o.docs[kind];if(!rec||!rec.ref||!DOCS[kind])return;
      out.push({id:"career:"+o.id+":"+kind,kind:"doc",title:[DOCS[kind][0],to(o)].filter(Boolean).join(" · "),from:"Career Studio",when:rec.made||0,open:function(x){return paperFile(o,kind).then(function(f){return IngOpenIn.open("tabula",{title:f.title,file:{name:f.name,mime:"application/vnd.openxmlformats-officedocument.wordprocessingml.document",bytes:f.bytes}},x);});}});});});});}catch(e){}return out;}});})();
function copyText(t){try{if(navigator.clipboard&&navigator.clipboard.writeText){navigator.clipboard.writeText(t).then(function(){say("Copied.");},function(){say("It could not be copied here: select the text and copy it.");});return;}}catch(e){}say("It could not be copied here: select the text and copy it.");}

/* ---------------- practise: her own evidence and her own answers, looked at with her, never rewritten ---------------- */
function lookMsgs(o,G,q,answer,isQ){return function(sc){var R=room()*sc;return [{role:"system",content:sys("You are now a frank, kind tutor. You never rewrite the answer and never write one for me: you help me make my own better.")},
  {role:"user",content:(isQ?"An interview question for "+to(o)+":\n"+q:"A criterion of "+to(o)+":\n"+q)+"\n\nMY ANSWER, IN MY OWN WORDS:\n"+answer+"\n\nLook at my answer against "+(isQ?"the question":"the criterion")+" and my profile. Answer in exactly this form, and nothing else:\nMEETS: YES or PARTLY or NO\nWORKS: what works in it, in one or two sentences\nMISSING: what is missing, in one or two sentences (the situation, what I did myself, what came of it, a concrete detail)\nASK YOURSELF: one question I should answer to make it stronger\n\n"+profileBlock(G,R*0.5)}];};}
function parseLook(t){var r={};String(t||"").replace(/<think>[\s\S]*?<\/think>/g,"").split("\n").forEach(function(l){l=l.replace(/\*\*/g,"");var m=/^\s*(?:\*\*)?(MEETS|WORKS|MISSING|ASK YOURSELF)(?:\*\*)?:\s*(.*)$/i.exec(l);if(m)r[m[1].toUpperCase()]=m[2].replace(/\*\*/g,"").trim();});
  if(!r.WORKS&&!r.MISSING)r.RAW=String(t||"").trim().slice(0,1200);return r;}
function look(o,key,q,answer,isQ){if(!answer||answer.trim().length<20){say("Write a few sentences of your own first: the studio looks at what you write.");return;}if(busyNow()||needModel())return;
  var slot=isQ?o.practice.qs.filter(function(x){return x.id===key;})[0]:(o.practice.crit[key]=o.practice.crit[key]||{});if(!slot)return;
  slot.answer=answer;save();begin(o,"Looking at your answer with you");
  gatherProfile({}).then(function(G){return ask(lookMsgs(o,G,q,answer,isQ),600,0.3);}).then(function(t){slot.fb=parseLook(t);slot.fbAt=Date.now();save();end();},failed);}
function questions(o){if(busyNow()||needModel())return;begin(o,"Choosing questions to practise");
  Promise.all([postText(o),gatherProfile({opp:o})]).then(function(x){return ask(function(sc){var R=room()*sc;return [{role:"system",content:sys("You are now an interviewer preparing questions.")},
    {role:"user",content:"Write eight questions an interview panel for "+to(o)+" would be likely to ask me: from what it asks for, and from the concerns my profile leaves (the criteria not shown or partly shown). One question to a line, each beginning with \"Q: \", and nothing else.\n\nTHE "+kindWord(o.kind).toUpperCase()+":\n"+cut(x[0],Math.floor(R*0.3))+"\n\n"+(critBlock(o)||"")+"\n\n"+profileBlock(x[1],R*0.4)}];},700,0.5);})
    .then(function(t){var qs=String(t).split("\n").map(function(l){var m=/^\s*(?:\d+[.)]\s*)?(?:\*\*)?Q:\s*(.+)$/i.exec(l);return m?m[1].replace(/\*\*/g,"").trim():"";}).filter(Boolean).slice(0,10);
      if(!qs.length)throw new Error("no questions came back. Try again");o.practice.qs=qs.map(function(q){return {id:uid("q"),q:q,answer:"",fb:null};});save();end();},failed);}
function keepEvidence(o,crit,answer){var P=CS().profile;P.items.push({id:uid("it"),sec:"skill",title:crit.length>90?crit.slice(0,87).replace(/\s+\S*$/,"")+"…":crit,place:"",from:"",to:"",text:answer.trim(),src:"me",at:Date.now()});P.at=Date.now();save();say("Kept in your profile, under Skills, with evidence.");}

/* ---------------- the profile's sources: her CV (shared with Lector), LinkedIn, her documents ---------------- */
function pickFile(accept,multi,fn){var i=D.createElement("input");i.type="file";i.accept=accept;if(multi)i.multiple=true;i.onchange=function(){var fs=[].slice.call(i.files||[]);if(fs.length)fn(fs);};i.click();}
function readFile(f){return Promise.resolve(readAsText(f)).then(function(t){t=String(t||"");if(/\.html?$/i.test(f.name)){try{t=lxUnTag(t);}catch(e){}}return t.replace(/\r/g,"").trim();});}
function addCv(){pickFile(".docx,.pdf,.txt,.md,.rtf,.html,.htm",false,function(fs){readFile(fs[0]).then(function(t){if(t.length<80){say("That is too short to be a CV.");return;}var M=lectorMe(),ref=IngBig.newId();
  return Promise.resolve(IngBig.put(ref,t)).then(function(){if(M.cv&&M.cv.ref){try{IngBig.del(M.cv.ref);}catch(e){}}M.cv={ref:ref,name:fs[0].name,chars:t.length,at:Date.now()};CS().profile.at=Date.now();save();render();say(isMe()?"Your CV is kept. Lector uses the same one.":"The CV is kept in this profile.");});},function(e){say("It could not be read: "+(e&&e.message||e));});});}
function addDocs(){pickFile(".docx,.pdf,.txt,.md,.rtf,.html,.htm",true,function(fs){var P=CS().profile,q=Promise.resolve(),n=0;
  fs.forEach(function(f){q=q.then(function(){return readFile(f).then(function(t){if(t.length<40)return;var ref=IngBig.newId();return Promise.resolve(IngBig.put(ref,t)).then(function(){P.files.push({id:uid("f"),name:f.name,ref:ref,chars:t.length,at:Date.now(),use:true});n++;});},function(e){say(f.name+" could not be read: "+(e&&e.message||e));});});});
  q.then(function(){if(n){P.at=Date.now();save();render();say(n+" document"+(n>1?"s are":" is")+" kept in your profile.");}});});}
/* 6.9.6 · a profile in one file. Her words (3 November 2026): "I don't want to have to input my information for my profile from
   scratch on my master version, its really tedious to have to go through it all again", and "I want that to be replicable for a
   second user profile and so forth". A profile file (.json, kind "ingenium-profile", v 1) holds a person's entries (in the studio's
   sections), documents (their text) and CV. It is made on a device ("Save this profile as a file") or by hand from a person's own
   documents, kept by its owner, and never sent anywhere by Ingenium. Brought in, it fills this profile, or a new one: entries and
   documents already there are left as they are and not doubled, and the CV becomes Lector's when none is kept yet. */
function packNorm(s){return String(s||"").toLowerCase().replace(/[^a-z0-9]+/g," ").trim();}
function packKey(it){return (it.sec||"other")+"|"+packNorm(it.title)+"|"+packNorm(it.place);}
function packEmpty(){var P=CS().profile,M=lectorMe();return !P.items.length&&!P.files.length&&!(M&&M.cv);}
function packRead(t){var d;try{d=JSON.parse(String(t||"").replace(/^﻿/,""));}catch(e){throw new Error("it could not be read as a profile file");}
  if(!d||(d.kind!=="ingenium-profile"&&d.kind!=="ingenium-career-pack")||!(+d.v>=1))throw new Error("it is not an Ingenium profile file");
  if(+d.v>1)throw new Error("it was made by a newer Ingenium: update this one first");
  d.person=d.person&&typeof d.person==="object"?d.person:{};
  d.items=Array.isArray(d.items)?d.items.filter(function(x){return x&&typeof x.title==="string"&&x.title.trim();}):[];
  d.files=Array.isArray(d.files)?d.files.filter(function(x){return x&&typeof x.name==="string"&&typeof x.text==="string";}):[];
  if(d.cv&&!(typeof d.cv.text==="string"&&d.cv.text.trim().length>=80))d.cv=null;
  /* 6.22: applications (programmes, posts, grants, with their particulars) and the people to write to, in the same file or a pack of their own */
  d.opps=Array.isArray(d.opps)?d.opps.filter(function(x){return x&&typeof x.text==="string"&&x.text.trim().length>=40;}):[];
  d.contacts=Array.isArray(d.contacts)?d.contacts.filter(function(x){return x&&typeof x.name==="string"&&x.name.trim();}):[];return d;}
function packSecs(){var o={};SECTS.forEach(function(x){o[x[0]]=x[1];});return o;}
function packTally(d){var L=packSecs(),n={};d.items.forEach(function(x){var k=L[x.sec]?x.sec:"other";n[k]=(n[k]||0)+1;});
  return SECTS.filter(function(x){return n[x[0]];}).map(function(x){return n[x[0]]+" "+x[1];}).join(", ");}
function packApply(d){var P=CS().profile,M=lectorMe(),L=packSecs(),got={items:0,files:0,cv:false,same:0,keptCv:false};
  if(!String(P.name||"").trim()&&d.person.name)P.name=String(d.person.name).trim().slice(0,120);
  if(!String(P.contact||"").trim()&&d.person.contact)P.contact=String(d.person.contact).trim().slice(0,400);
  if(d.person.spelling==="american"||d.person.spelling==="british")P.prefs.spelling=d.person.spelling;
  if(d.wants&&typeof d.wants==="object")["looking","need","avoid","where","when"].forEach(function(k){if(!String(P.wants[k]||"").trim()&&typeof d.wants[k]==="string"&&d.wants[k].trim())P.wants[k]=d.wants[k].trim().slice(0,2000);});
  var have={};P.items.forEach(function(it){have[packKey(it)]=1;});
  d.items.forEach(function(x){var it={id:uid("it"),sec:L[x.sec]?x.sec:"other",title:String(x.title).trim().slice(0,300),place:String(x.place||"").trim().slice(0,300),
      from:String(x.from||"").trim().slice(0,40),to:String(x.to||"").trim().slice(0,40),text:String(x.text||"").trim().slice(0,8000),src:"file",note:String(x.note||"").trim().slice(0,200),at:Date.now()};
    var k=packKey(it);if(have[k]){got.same++;return;}have[k]=1;P.items.push(it);got.items++;});
  var names={};P.files.forEach(function(f){names[packNorm(f.name)]=1;});
  var q=Promise.resolve();
  d.files.forEach(function(x){q=q.then(function(){var t=x.text.trim();if(t.length<40)return;if(names[packNorm(x.name)]){got.same++;return;}names[packNorm(x.name)]=1;var ref=IngBig.newId();
    return Promise.resolve(IngBig.put(ref,t)).then(function(){P.files.push({id:uid("f"),name:x.name.trim().slice(0,200),ref:ref,chars:t.length,at:Date.now(),use:true,kind:String(x.kind||"").slice(0,20)});got.files++;});});});
  if(d.cv)q=q.then(function(){if(M.cv){got.keptCv=true;return;}var t=d.cv.text.trim(),ref=IngBig.newId();
    return Promise.resolve(IngBig.put(ref,t)).then(function(){M.cv={ref:ref,name:String(d.cv.name||"CV").slice(0,200),chars:t.length,at:Date.now()};got.cv=true;});});
  if((d.opps&&d.opps.length)||(d.contacts&&d.contacts.length))q=q.then(function(){return packApplyMore(d,got);});
  return q.then(function(){P.at=Date.now();save();return got;});}
/* 6.22: applications and people from a file: an application already here (same title and organisation) or a person already here (same
   name and organisation) is left as it is; a person is tied to the application the file names for them */
function packApplyMore(d,got){var S=CS(),have={},made={},q=Promise.resolve();got.opps=0;got.contacts=0;
  S.opps.forEach(function(o){have[packNorm(o.title)+"|"+packNorm(o.org)]=o.id;made[packNorm(o.title)]=o.id;});
  (d.opps||[]).forEach(function(x){q=q.then(function(){var k=packNorm(x.title)+"|"+packNorm(x.org);if(x.title&&have[k]){got.same++;return;}
    var kind=/^(job|phd|grant|other)$/.test(x.kind)?x.kind:"other";
    return newOpp(kind,String(x.text).trim(),"file").then(function(o){if(x.title){o.title=String(x.title).trim().slice(0,120);o.titleSet=true;}if(x.org){o.org=String(x.org).trim().slice(0,120);o.orgSet=true;}
      if(x.closes)o.closes=String(x.closes).trim().slice(0,80);if(/^\d{4}-\d{2}-\d{2}$/.test(String(x.due||"")))o.due=x.due;if(x.notes)o.notes=String(x.notes).slice(0,6000);o.kindSet=true;
      have[packNorm(o.title)+"|"+packNorm(o.org)]=o.id;made[packNorm(o.title)]=o.id;got.opps++;});});});
  return q.then(function(){var C=contacts(),seen={};C.forEach(function(c){seen[packNorm(c.name)+"|"+packNorm(c.org)]=1;});
    (d.contacts||[]).forEach(function(x){var k=packNorm(x.name)+"|"+packNorm(x.org);if(seen[k]){got.same++;return;}seen[k]=1;
      var role=PPL_ROLES.some(function(r){return r[0]===x.role;})?x.role:"supervisor";
      C.push({id:uid("pc"),name:String(x.name).trim().slice(0,120),role:role,org:String(x.org||"").trim().slice(0,200),email:String(x.email||"").trim().slice(0,200),link:String(x.link||"").trim().slice(0,400),
        opp:made[packNorm(x.opp||"")]||"",status:"write",by:"",follow:"",notes:String(x.notes||"").slice(0,6000),draft:"",at:Date.now()});got.contacts++;});
    save();});}
function packSay(d,got){var me=CS().profile.isMe!==false,bits=[];
  if(got.items)bits.push(got.items+" entr"+(got.items===1?"y":"ies"));if(got.files)bits.push(got.files+" document"+(got.files===1?"":"s"));
  if(got.cv)bits.push(me?"your CV, which Lector now uses too":"the CV");
  if(got.opps)bits.push(got.opps+" application"+(got.opps===1?"":"s")+" (in Applications)");if(got.contacts)bits.push(got.contacts+" "+(got.contacts===1?"person":"people")+" to write to (in People)");
  var t=bits.length?"Brought in: "+bits.join(", ")+".":"Nothing new: everything in the file is already here.";
  if(got.same&&bits.length)t+=" "+got.same+" already here "+(got.same===1?"was":"were")+" left as "+(got.same===1?"it was":"they were")+".";
  if(got.keptCv)t+=" "+(me?"Your CV was already kept, so it stays; the file's CV is among the documents if it was in them.":"The CV kept here stays.");
  say(t+(bits.length?" Look them over"+(got.items||got.files?" in Your entries":"")+": change or remove anything.":""));}
/* the file is read, and what it holds is said before anything changes: into this profile, or a new one when this one is not empty */
function packOpen(d){var empty0=packEmpty(),who=String(d.person.name||"").trim()||"this person",n=d.items.length,f=d.files.length;
  var only=!(n||f||d.cv);   /* 6.22: a pack of applications and people only, for the profile open now */
  var html='<h3>'+(only?'Bring in applications and people':'Bring in a profile')+'</h3><p class="small">'+(only?'The file':'The file is '+esc(who)+"'s")+(d.made?" (made "+esc(String(d.made))+")":"")+'. It holds:</p><ul class="small">'
    +(only?'':'<li>'+n+' entr'+(n===1?'y':'ies')+(n?': '+esc(packTally(d)):'')+'</li><li>'+f+' document'+(f===1?'':'s')+'</li>')+(d.cv?'<li>a CV: '+esc(String(d.cv.name||'CV'))+'</li>':'')+(d.opps&&d.opps.length?'<li>'+d.opps.length+' application'+(d.opps.length===1?'':'s')+' (programmes, posts or grants, with their particulars)</li>':'')+(d.contacts&&d.contacts.length?'<li>'+d.contacts.length+' '+(d.contacts.length===1?'person':'people')+' to write to</li>':'')+'</ul>'
    +'<p class="small muted">Nothing already in a profile is changed, and nothing is added twice. It stays on this device: Ingenium sends it nowhere.</p>'
    +'<div style="display:flex;gap:8px;justify-content:flex-end;flex-wrap:wrap;margin-top:12px"><button class="btn ghost" id="pkCancel">Cancel</button>'
    +(empty0||only?'':'<button class="btn" id="pkNew">Make it a new profile</button>')
    +'<button class="btn primary" id="pkHere">'+(empty0?'Bring it in':'Add it to '+esc(personLabel(CS())))+'</button></div>';
  var box=modalOpen(html),busy=false;
  function go(asNew){if(busy)return;busy=true;closeModal();
    var p=asNew?newPerson("other",who,""):Promise.resolve(null);   /* a new profile is a person of its own, beside hers */
    p.then(function(){return packApply(d);}).then(function(got){render();packSay(d,got);},function(e){say("It could not be brought in: "+(e&&e.message||e));});}
  box.querySelector("#pkCancel").onclick=closeModal;box.querySelector("#pkHere").onclick=function(){go(false);};
  var nk=box.querySelector("#pkNew");if(nk)nk.onclick=function(){go(true);};}
function packPick(){pickFile(".json,application/json",false,function(fs){Promise.resolve(readAsText(fs[0])).then(function(t){packOpen(packRead(t));}).then(null,function(e){say(fs[0].name+": "+(e&&e.message||e)+".");});});}
/* this profile, saved as one file: for another device, for safe keeping, or to begin someone else's */
function packMake(){var S=CS(),P=S.profile,M=lectorMe();
  var d={kind:"ingenium-profile",v:1,made:dayStr(Date.now()),about:"A profile from Ingenium's Career Studio: entries, documents and CV. It is its owner's, and Ingenium sends it nowhere.",
    person:{name:personName(S),contact:P.contact||"",isMe:P.isMe!==false,spelling:(P.prefs&&P.prefs.spelling)||"british"},
    wants:Object.assign({},P.wants),
    items:P.items.map(function(it){return {sec:it.sec,title:it.title,place:it.place||"",from:it.from||"",to:it.to||"",text:it.text||"",note:it.note||""};}),files:[]};
  var q=P.files.reduce(function(q0,f){return q0.then(function(){return loadText(f.ref).then(function(t){if(t)d.files.push({name:f.name,kind:f.kind||"",text:t});});});},Promise.resolve());
  if(M&&M.cv&&M.cv.ref)q=q.then(function(){return loadText(M.cv.ref).then(function(t){if(t)d.cv={name:M.cv.name,text:t};});});
  return q.then(function(){return d;});}
function packSave(){if(typeof saveFileNative!=="function"){say("This copy of the page cannot save files.");return;}
  packMake().then(function(d){var name=safeName(personLabel(CS())+" - profile")+".ingenium-profile.json";
    return Promise.resolve(saveFileNative(name,"application/json",new TextEncoder().encode(JSON.stringify(d,null,1)))).then(function(){
      say("Saved as "+name+": "+d.items.length+" entr"+(d.items.length===1?"y":"ies")+", "+d.files.length+" document"+(d.files.length===1?"":"s")+(d.cv?" and the CV":"")+". Keep it somewhere safe: it is yours, and Ingenium sends it nowhere.");});})
  .then(null,function(e){say("It could not be saved: "+(e&&e.message||e));});}
W.IngProfileFile={read:packRead,apply:packApply,make:packMake,open:packOpen};   /* for the tests */
/* LinkedIn's export: a .zip of .csv files (or the .csv files themselves). Their columns are read by name, loosely, so a
   column renamed or moved is still found; a file that is not recognised is kept as a document of the profile instead. */
function csvRows(t){var rows=[],row=[],f="",q=false;t=String(t).replace(/^\uFEFF/,"");
  for(var i=0;i<t.length;i++){var c=t[i];if(q){if(c==='"'){if(t[i+1]==='"'){f+='"';i++;}else q=false;}else f+=c;}
    else if(c==='"')q=true;else if(c===","){row.push(f);f="";}else if(c==="\n"||c==="\r"){if(c==="\r"&&t[i+1]==="\n")i++;row.push(f);f="";if(row.some(function(x){return x.trim();}))rows.push(row);row=[];}else f+=c;}
  row.push(f);if(row.some(function(x){return x.trim();}))rows.push(row);return rows;}
function csvObjs(t){t=String(t||"").replace(/^\uFEFF/,"");
  /* a note above the header (LinkedIn puts one in some files, "Notes:" and a quoted paragraph) is passed over: up to the
     first blank line after it, or else the note's own two lines */
  if(/^\s*notes?:/i.test(t)){var bl=t.search(/\n\s*\n/);t=bl>0?t.slice(bl).replace(/^\s+/,""):t.split("\n").slice(2).join("\n");}
  var r=csvRows(t);if(r.length<2)return [];var hd=r[0].map(function(x){return x.trim().toLowerCase();});
  return r.slice(1).map(function(row){var o={};hd.forEach(function(k,i){o[k]=(row[i]||"").trim();});return o;});}
function col(o,names){for(var i=0;i<names.length;i++){var k=names[i];if(o[k])return o[k];}var ks=Object.keys(o);for(var j=0;j<names.length;j++){for(var m=0;m<ks.length;m++)if(ks[m].indexOf(names[j])>=0&&o[ks[m]])return o[ks[m]];}return "";}
var LI={positions:{sec:"post",title:["title"],place:["company name","company"],from:["started on","start date"],to:["finished on","end date"],text:["description","location"]},
  education:{sec:"education",title:["degree name","degree"],place:["school name","school"],from:["start date","started on"],to:["end date","finished on"],text:["notes","activities","field of study"]},
  skills:{sec:"skill",title:["name","skill"],place:[],from:[],to:[],text:[]},
  languages:{sec:"language",title:["name","language"],place:[],from:[],to:[],text:["proficiency"]},
  certifications:{sec:"award",title:["name"],place:["authority"],from:["started on"],to:["finished on"],text:["url"]},
  honors:{sec:"award",title:["title"],place:["issuer"],from:["issued on"],to:[],text:["description"]},
  publications:{sec:"research",title:["name","title"],place:["publisher"],from:["published on"],to:[],text:["description","url"]},
  projects:{sec:"project",title:["title","name"],place:[],from:["started on"],to:["finished on"],text:["description","url"]},
  courses:{sec:"education",title:["name"],place:[],from:[],to:[],text:["number"]},
  volunteering:{sec:"other",title:["role"],place:["company name","organization"],from:["started on"],to:["finished on"],text:["description","cause"]}};
function liKind(name){var n=name.toLowerCase().replace(/^.*\//,"").replace(/\.csv$/,"");if(/^positions?$/.test(n))return "positions";if(/^education$/.test(n))return "education";if(/^skills?$/.test(n))return "skills";if(/^languages?$/.test(n))return "languages";
  if(/^certifications?$/.test(n))return "certifications";if(/^honors?|^honours?/.test(n))return "honors";if(/^publications?$/.test(n))return "publications";if(/^projects?$/.test(n))return "projects";if(/^courses?$/.test(n))return "courses";if(/^volunteer/.test(n))return "volunteering";if(/^profile$/.test(n))return "profile";
  if(/^saved[ _-]?jobs?(?:[ _-]?\d+)?$/.test(n))return "savedjobs";if(/^job[ _-]?applications?(?:[ _-]?\d+)?$/.test(n))return "jobapps";return "";}
function unzip(buf){var u8=new Uint8Array(buf),dv=new DataView(buf),i=u8.length-22,dec=new TextDecoder(),out=[];
  while(i>=0&&dv.getUint32(i,true)!==0x06054b50)i--;if(i<0)return Promise.reject(new Error("not a .zip file"));
  if(typeof DecompressionStream==="undefined")return Promise.reject(new Error("this window cannot open .zip files; open the .zip and add its .csv files instead"));
  var n=dv.getUint16(i+10,true),p=dv.getUint32(i+16,true),q=Promise.resolve();
  for(var k=0;k<n;k++){(function(meth,csz,name,lo){if(/\.csv$/i.test(name))q=q.then(function(){var lnl=dv.getUint16(lo+26,true),lxl=dv.getUint16(lo+28,true),st=lo+30+lnl+lxl,data=u8.subarray(st,st+csz);
      return (meth===0?Promise.resolve(data):new Response(new Blob([data]).stream().pipeThrough(new DecompressionStream("deflate-raw"))).arrayBuffer().then(function(b){return new Uint8Array(b);})).then(function(x){out.push({name:name,text:dec.decode(x)});});});})
      (dv.getUint16(p+10,true),dv.getUint32(p+20,true),dec.decode(u8.subarray(p+46,p+46+dv.getUint16(p+28,true))),dv.getUint32(p+42,true));
    p+=46+dv.getUint16(p+28,true)+dv.getUint16(p+30,true)+dv.getUint16(p+32,true);}
  return q.then(function(){return out;});}
/* 6.9.2: imported again, the export is read as a difference against what is there: an entry unchanged is kept as it is; one
   new or changed is offered in Found in your sources; one gone from the export is flagged, for her to keep or drop; an entry
   she changed herself (it became her own) or dropped before is never touched. The first import still enters every entry at once. */
function importLinkedIn(files){var P=CS().profile,got=[],others=[],skipped=[],summary=[],perFile=[],jobs=[];
  var read=files.map(function(f){if(/\.zip$/i.test(f.name))return f.arrayBuffer().then(unzip);return (f.text?f.text():readAsText(f)).then(function(t){return [{name:f.name,text:t}];});});
  return Promise.all(read).then(function(all){[].concat.apply([],all).forEach(function(c){var k=liKind(c.name),rows=csvObjs(c.text),short=c.name.replace(/^.*\//,"");
      if(k==="profile"){rows.forEach(function(r){var nm=[col(r,["first name"]),col(r,["last name"])].filter(Boolean).join(" ");if(nm&&!P.name)P.name=nm;var hl=col(r,["headline"]),sm=col(r,["summary"]);if(hl)summary.push("Headline: "+hl);if(sm)summary.push("Summary: "+sm);});return;}
      /* 6.9.8: the jobs she saved on LinkedIn, and those she applied to there, wait in Applications to be taken one at a time */
      if(k==="savedjobs"||k==="jobapps"){rows.forEach(function(r){var url=col(r,["job url","url","link"]),t=col(r,["job title","title"]),org=col(r,["company name","company","organization","organisation"]),dt=col(r,["saved date","application date","applied on","date"]);
          if(t||url)jobs.push({kind:k==="jobapps"?"applied":"saved",title:t.slice(0,200),org:org.slice(0,200),url:url,date:dt.slice(0,40)});});return;}
      var M=LI[k];if(!M){if(rows.length&&/\.csv$/i.test(c.name)){if(/connections|messages|invitations|ad_|ads|inferences|logins|security|registration|phone|email|rich_media|receipts|saved|search|learning|endorsement|recommendations_given/i.test(c.name))skipped.push(short.replace(/\.csv$/i,""));else others.push(c);}return;}
      var n0=got.length;rows.forEach(function(r){var t=col(r,M.title);if(!t)return;got.push({id:uid("it"),sec:M.sec,title:t.slice(0,200),place:col(r,M.place).slice(0,200),from:col(r,M.from),to:col(r,M.to),text:M.text.map(function(x){return col(r,[x]);}).filter(Boolean).join("\n").slice(0,2000),src:"linkedin",at:Date.now()});});
      perFile.push({name:short,rows:rows.length,kept:got.length-n0,sec:M.sec});});
    var svN=jobs.length?svMerge(jobs):0,svMsg=jobs.length?" "+svWords(jobs,svN):"";
    if(!got.length&&!summary.length){if(jobs.length){CS().savedAt=Date.now();save();render();say(svWords(jobs,svN).trim());return;}
      throw new Error("nothing in it was recognised as LinkedIn's export. Add the .zip LinkedIn sends you, or its Profile, Positions, Education and Skills files");}
    if(jobs.length)CS().savedAt=Date.now();
    var first=!P.linkedin,old=P.items.filter(function(it){return it.src==="linkedin";}),oldBy={},dropped=(P.linkedin&&P.linkedin.dropped)||{},added=0,changed=0,kept=0,gone=0,sugg=[];
    old.forEach(function(it){oldBy[liKey(it)]=it;});
    if(first)P.items=P.items.concat(got);
    else got.forEach(function(nw){var k=liKey(nw),ex=oldBy[k];
      if(ex){delete oldBy[k];if(liSame(ex,nw)){delete ex.gone;kept++;}else{changed++;sugg.push(Object.assign(nw,{src:"linkedin-new",note:"Changed in your export",was:ex.id}));}return;}
      if(P.items.some(function(it){return it.src!=="linkedin"&&liKey(it)===k;}))return;if(dropped[k])return;
      added++;sugg.push(Object.assign(nw,{src:"linkedin-new",note:"New in your export"}));});
    if(!first)Object.keys(oldBy).forEach(function(k){oldBy[k].gone=Date.now();gone++;});
    P.suggested=(P.suggested||[]).filter(function(x){return x.src!=="linkedin-new";}).concat(sugg);
    var ref=IngBig.newId();return Promise.resolve(IngBig.put(ref,summary.join("\n\n"))).then(function(){if(P.linkedin&&P.linkedin.ref){try{IngBig.del(P.linkedin.ref);}catch(e){}}
      P.linkedin={ref:ref,n:P.items.filter(function(it){return it.src==="linkedin";}).length,at:Date.now(),others:others.map(function(c){return c.name.replace(/^.*\//,"");}),skipped:skipped,files:perFile,added:first?got.length:added,changed:changed,gone:gone,kept:kept,dropped:dropped};
      P.at=Date.now();if(sugg.length)CS().ui.ppart="found";save();render();
      say((first?got.length+" entr"+(got.length===1?"y":"ies")+" came from your LinkedIn export. Look them over in Your entries: change or remove any.":
        "Read as a difference: "+kept+" unchanged, "+added+" new and "+changed+" changed (offered in Found in your sources), "+gone+" no longer in the export (flagged in Your entries). Your own changes were not touched.")+svMsg);});});}
/* entries suggested from her CV, LinkedIn and documents: each one she keeps or drops; none enters the profile by itself */
function suggest(){if(busyNow()||needModel())return;begin(null,"Reading your sources for entries");
  gatherProfile({}).then(function(G){if(!G.cv&&!G.files.length&&!G.linkedin)throw new Error("add your CV or a document first: entries are suggested from them");
    return ask(function(sc){var R=room()*sc;return [{role:"system",content:sys("You are now listing the entries of a profile from the documents given, exactly as they state them.")},
      {role:"user",content:"List the entries of my profile that my CV and documents state and that are not already in THE PROFILE's entries: my studies, posts, research and publications, teaching, projects, skills (each with the evidence the documents give), languages, awards and referees. Copy names, places and dates exactly; invent nothing; leave a field empty when the documents do not give it. One entry to a line, in exactly this form, and nothing else:\nENTRY: section | title | place | from | to | one line of detail\nwhere section is one of: education, post, research, teaching, project, skill, language, award, referee, other.\n\n"+profileBlock(G,R*0.9)}];},1800,0.15);})
    .then(function(t){var P=CS().profile,have={};P.items.forEach(function(it){have[(it.title+"|"+it.place).toLowerCase()]=1;});
      var s=String(t).split("\n").map(function(l){var m=/^\s*(?:[-*]\s*)?ENTRY:\s*(.+)$/i.exec(l);if(!m)return null;var p=m[1].split("|").map(function(x){return x.trim();});var sec=(p[0]||"").toLowerCase();
        if(!SECTS.some(function(x){return x[0]===sec;}))sec="other";if(!p[1])return null;return {id:uid("sg"),sec:sec,title:p[1],place:p[2]||"",from:p[3]||"",to:p[4]||"",text:p[5]||"",src:"suggested"};})
        .filter(function(x){return x&&!have[(x.title+"|"+x.place).toLowerCase()];});
      P.suggested=s;if(s.length)CS().ui.ppart="found";save();end();if(!s.length)say("No new entries were found in your sources.");},failed);}

/* her skills: what her sources show she can do (her apps as Lector read them, her proposal, her CV), each with its evidence
   and where it counts, for her to keep or drop; a skill no source shows is not offered */
function findSkills(){if(busyNow()||needModel())return;begin(null,"Finding your skills in your sources");
  gatherProfile({}).then(function(G){if(!G.cv&&!G.files.length&&!G.apps.length&&!G.items)throw new Error("add your CV, a document, or Lector's readings of your apps first: skills are found in them");
    return ask(function(sc){var R=room()*sc;return [{role:"system",content:sys("You are now an honest careers adviser listing the skills the sources show, and only those.")},
      {role:"user",content:"List the skills my sources show I have: what building my apps shows (as Lector read them), what my documents and my CV show, and what my entries show. For each skill, name the evidence in the sources (which app, document or post, and what in it), and where it counts: ACADEMIC, PROFESSIONAL or BOTH, with where to put it (a CV section, a statement, a letter). A skill no source shows is not listed; do not round a skill up. One skill to a line, in exactly this form, and nothing else:\nSKILL: the skill, in plain words | ACADEMIC or PROFESSIONAL or BOTH | the evidence | where to put it\n\n"+profileBlock(G,R*0.9)}];},1800,0.2);})
    .then(function(t){var P=CS().profile,have={};P.items.forEach(function(it){if(it.sec==="skill")have[it.title.toLowerCase()]=1;});
      var s0=String(t).split("\n").map(function(l){var m=/^\s*(?:[-*]\s*)?(?:\*\*)?SKILL:(?:\*\*)?\s*(.+)$/i.exec(l.replace(/\*\*/g,""));if(!m)return null;var p=m[1].split("|").map(function(x){return x.trim();});if(!p[0]||!p[2]||/^none/i.test(p[2]))return null;
        var where=/^academic/i.test(p[1]||"")?"Academic":/^professional/i.test(p[1]||"")?"Professional":"Academic and professional";
        return {id:uid("sg"),sec:"skill",title:p[0].slice(0,140),place:"",from:"",to:"",text:"Evidence: "+p[2]+"\nWhere it counts: "+where+(p[3]?"; "+p[3]:""),src:"suggested"};}).filter(function(x){return x&&!have[x.title.toLowerCase()];});
      P.suggested=s0;if(s0.length)CS().ui.ppart="found";save();end();if(!s0.length)say("No skills with evidence were found that are not already in your profile.");},failed);}

/* ---------------- goals and plan: her goals, dated steps, and the kinds of role that suit her (never postings) ---------------- */
function goalSteps(g){if(busyNow()||needModel())return;begin(null,"Thinking through steps for your goal");
  gatherProfile({}).then(function(G){return ask(function(sc){var R=room()*sc;return [{role:"system",content:sys("You are now a mentor helping me plan. You are concrete and honest about what each step needs.")},
    {role:"user",content:"My goal: "+g.text+(g.by?" (by "+g.by+")":"")+".\nSuggest between four and seven concrete steps towards it, in order, each small enough to begin this week or this month, from what my profile shows I already have and what it shows is missing. Never assume a qualification or experience the profile does not show. One step to a line, in exactly this form, and nothing else:\nSTEP: the step | when to do it by, as a date or as a span such as \"in two weeks\" | why it matters, in one sentence\n\n"+profileBlock(G,R*0.8)}];},900,0.4);})
    .then(function(t){var st=String(t).split("\n").map(function(l){var m=/^\s*(?:[-*\d.)]\s*)?STEP:\s*(.+)$/i.exec(l.replace(/\*\*/g,""));if(!m)return null;var p=m[1].split("|").map(function(x){return x.trim();});return p[0]?{id:uid("ss"),text:p[0],by:p[1]||"",why:p[2]||""}:null;}).filter(Boolean);
      g.suggested=st.slice(0,8);save();end();if(!st.length)say("No steps came back. Try again.");},failed);}
function roles(){if(busyNow()||needModel())return;begin(null,"Weighing the kinds of role and programme that suit you");
  gatherProfile({}).then(function(G){return ask(function(sc){var R=room()*sc;return [{role:"system",content:sys("You are now a frank careers adviser. You name kinds of role and programme, never particular postings, organisations' vacancies or people.")},
    {role:"user",content:"From my profile and what I am looking for, name between three and six kinds of role or programme (academic or professional) that would suit me and be worth an application. For each: why, from the profile (the evidence); what is missing for it, plainly; and a first step. Do not name particular vacancies, and do not suggest what my wants rule out. One to a line, in exactly this form, and nothing else:\nROLE: the kind of role or programme | why, from my profile | what is missing | a first step\n\n"+profileBlock(G,R*0.85)}];},1200,0.4);})
    .then(function(t){var rs=String(t).split("\n").map(function(l){var m=/^\s*(?:[-*\d.)]\s*)?ROLE:\s*(.+)$/i.exec(l.replace(/\*\*/g,""));if(!m)return null;var p=m[1].split("|").map(function(x){return x.trim();});return p[0]?{id:uid("rl"),role:p[0],why:p[1]||"",gap:p[2]||"",first:p[3]||""}:null;}).filter(Boolean);
      CS().roles={at:Date.now(),model:modelName(),list:rs.slice(0,6)};save();end();if(!rs.length)say("Nothing came back. Try again, or say more of what you are looking for in Your profile.");},failed);}
/* ---------------- her own draft, looked at with her: never rewritten ---------------- */
function reviewMine(o,kind,text){if(!text||text.trim().length<120){say("Write or paste your draft first: a few paragraphs at least.");return;}o.mine=o.mine||{};o.mine[kind]={text:text,at:Date.now()};save();if(busyNow()||needModel())return;
  begin(o,"Looking at your draft with you");Promise.all([postText(o),gatherProfile({opp:o})]).then(function(x){return ask(function(sc){var R=room()*sc;return [{role:"system",content:sys("You are now a frank, kind reviewer. You never rewrite the draft and never write a new one: you help me make my own better.")},
    {role:"user",content:"Here is my own draft of my "+DOCS[kind][0].toLowerCase()+" for "+to(o)+". Look at it against the posting, the criteria and my profile. Answer in exactly this form, a few lines of each, and nothing else:\nWORKS: what works, and why\nMISSING: a criterion or a point it does not yet answer\nUNSUPPORTED: a claim my profile does not support, quoted, or none\nWORDING: a phrase of mine, quoted, that could be plainer or stronger, and why (do not rewrite it)\nNEXT: the one thing to do first\n\nMY DRAFT:\n"+text+"\n\nTHE "+kindWord(o.kind).toUpperCase()+":\n"+cut(x[0],Math.floor(R*0.2))+"\n\n"+(critBlock(o)||"")+"\n\n"+profileBlock(x[1],R*0.5)}];},900,0.3);})
    .then(function(t){var fb={};String(t).replace(/<think>[\s\S]*?<\/think>/g,"").split("\n").forEach(function(l){var m=/^\s*(?:[-*]\s*)?(WORKS|MISSING|UNSUPPORTED|WORDING|NEXT):\s*(.*)$/i.exec(l.replace(/\*\*/g,""));if(m&&m[2].trim()){var k=m[1].toUpperCase();(fb[k]=fb[k]||[]).push(m[2].trim());}});
      if(!Object.keys(fb).length)fb.RAW=[String(t).trim().slice(0,1500)];o.mine[kind].fb=fb;save();end();},failed);}
/* ---------------- online, only when she presses for it ---------------- */
/* 6.9.8 · a posting from its link, read against her profile at once. Her words (3 November 2026): "I want to be able to paste a
   link of a job that I am interested in applying to in the Career studio and have the analysis be done and the match profile for
   me and the job be done from there ... Ingenium can go online to get the information. I want that feature added and I want it to
   really work." A link pasted (or pressed for) is fetched once. What is read first is what the site publishes for machines: on
   boards hosted by Greenhouse and by Lever, their public posting APIs, as their documentation gives them (Greenhouse's Job Board
   API, GET https://boards-api.greenhouse.io/v1/boards/{board}/jobs/{id}, whose "content" is entity-encoded HTML; Lever's Postings
   API, GET https://api.lever.co/v0/postings/{site}/{id}, or api.eu.lever.co); on any other site, the schema.org JobPosting that
   job sites put in their pages for search engines (JSON-LD, or microdata); and failing both, the page's readable text, its lists
   kept as lists. A page that asks her to sign in, refuses, or has gone is said so plainly, with what to do instead. Then, when a
   model is ready, the reading against her profile starts by itself. Nothing else is sent anywhere. */
var JL={busy:false,url:"",err:null,found:null,sv:null,hint:null,kind:"",focus:""};
function jlHost(u){try{return new URL(u).hostname.replace(/^www\./,"");}catch(e){return "";}}
function jlNorm(u){u=String(u||"").trim().replace(/^[<"'“‘(\[]+|[>"'”’)\].,;]+$/g,"");if(!u||/\s/.test(u))return "";
  if(!/^[a-z][a-z0-9+.-]*:\/\//i.test(u)){if(/^(www\.)?[a-z0-9-]+(\.[a-z0-9-]+)+([\/?#]|$)/i.test(u))u="https://"+u;else return "";}
  var x;try{x=new URL(u);}catch(e){return "";}if(!/^https?:$/.test(x.protocol)||!x.hostname||x.hostname.indexOf(".")<0)return "";var host=x.hostname.toLowerCase();
  /* LinkedIn: a job opened from a list or a search carries its number as currentJobId; its own page is /jobs/view/{number}/ */
  if(/(^|\.)linkedin\.com$/.test(host)){var li=x.searchParams.get("currentJobId")||(/\/jobs\/view\/(?:[^\/]*?-)?(\d{6,})/.exec(x.pathname)||[])[1];if(li&&/^\d+$/.test(li))return "https://www.linkedin.com/jobs/view/"+li+"/";}
  /* Indeed: a job opened from a search carries its key as vjk; its own page is /viewjob?jk={key} */
  if(/(^|\.)indeed\.[a-z.]+$/.test(host)){var jk=x.searchParams.get("jk")||x.searchParams.get("vjk");if(jk&&/^[\w-]+$/.test(jk))return "https://"+host+"/viewjob?jk="+jk;}
  var drop=[];x.searchParams.forEach(function(v,k){if(/^(utm_\w+|fbclid|gclid|mc_cid|mc_eid|_hsenc|_hsmi|trk\w*|refId|trackingId|lipi)$/i.test(k))drop.push(k);});drop.forEach(function(k){x.searchParams.delete(k);});
  if(!/^#[!\/]/.test(x.hash))x.hash="";return x.href;}
function jlAts(u){var x;try{x=new URL(u);}catch(e){return null;}var host=x.hostname.toLowerCase(),p=x.pathname.split("/").filter(Boolean);
  if(/^(boards|job-boards)(\.eu)?\.greenhouse\.io$/.test(host)){
    if(p[0]==="embed"&&x.searchParams.get("for")&&/^\d+$/.test(x.searchParams.get("token")||""))return {kind:"greenhouse",board:x.searchParams.get("for"),id:x.searchParams.get("token")};
    if(p.length>=3&&p[1]==="jobs"&&/^\d+$/.test(p[2]))return {kind:"greenhouse",board:p[0],id:p[2]};}
  if(/^jobs(\.eu)?\.lever\.co$/.test(host)&&p.length>=2&&/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(p[1]))return {kind:"lever",site:p[0],id:p[1],eu:/\.eu\./.test(host)};
  return null;}
function jlApi(a){if(a.kind==="greenhouse")return "https://boards-api.greenhouse.io/v1/boards/"+encodeURIComponent(a.board)+"/jobs/"+encodeURIComponent(a.id);
  return "https://api"+(a.eu?".eu":"")+".lever.co/v0/postings/"+encodeURIComponent(a.site)+"/"+encodeURIComponent(a.id);}
/* HTML written as entities ("&lt;p&gt;"), as Greenhouse gives it and some pages put it in their data, made HTML again */
function jlUnent(s){s=String(s||"");for(var i=0;i<2&&/&(?:amp;)*lt;\/?[a-z]/i.test(s);i++){var ta=new DOMParser().parseFromString("<!doctype html><body><textarea>"+s.replace(/<\/textarea/gi,"&lt;/textarea")+"</textarea>","text/html").querySelector("textarea");s=ta?ta.value:s;}return s;}
/* HTML as plain text that keeps its shape: a paragraph to a paragraph, a list item to a line that begins "- ", headings apart */
var JL_BLK=/^(P|DIV|SECTION|ARTICLE|HEADER|FOOTER|MAIN|ASIDE|UL|OL|DL|DT|DD|TABLE|THEAD|TBODY|TR|BLOCKQUOTE|PRE|FIGURE|FIGCAPTION|ADDRESS|HR|CENTER|DETAILS|SUMMARY)$/;
function jlNodeText(root){var out=[];
  (function walk(n){for(var c=n.firstChild;c;c=c.nextSibling){if(c.nodeType===3){out.push(c.nodeValue.replace(/\s+/g," "));continue;}if(c.nodeType!==1)continue;var t=String(c.tagName).toUpperCase();
      if(/^(SCRIPT|STYLE|NOSCRIPT|TEMPLATE|SVG|IFRAME|BUTTON|FORM|INPUT|SELECT|TEXTAREA|NAV|OBJECT|CANVAS)$/.test(t))continue;
      if(t==="BR"){out.push("\n");continue;}if(t==="LI"){out.push("\n- ");walk(c);continue;}
      if(/^H[1-6]$/.test(t)){out.push("\n\n");walk(c);out.push("\n");continue;}if(t==="TD"||t==="TH"){walk(c);out.push(" · ");continue;}
      if(JL_BLK.test(t)){out.push("\n");walk(c);out.push("\n");continue;}walk(c);}})(root);
  return out.join("").replace(/[ \t ]+/g," ").replace(/ ?· ?\n/g,"\n").replace(/ *\n */g,"\n").replace(/\n- ?(?=\n)/g,"").replace(/\n- (?:- )+/g,"\n- ").replace(/\n{3,}/g,"\n\n").trim();}
function jlText(html){html=String(html||"");if(!html.trim())return "";var doc=new DOMParser().parseFromString("<!doctype html><body>"+html+"</body>","text/html");
  if(!/<[a-z!\/]/i.test(html))return String(doc.body.textContent||"").replace(/\r/g,"").replace(/[ \t ]+/g," ").replace(/ *\n */g,"\n").replace(/\n{3,}/g,"\n\n").trim();return jlNodeText(doc.body);}
/* the structured data of a page: JSON-LD, read leniently (a raw line break inside a string is the commonest fault) */
function jlJson(t){t=String(t||"").replace(/^\s*<!--/,"").replace(/-->\s*$/,"").replace(/^\s*\/\/\s*<!\[CDATA\[/,"").replace(/\/\/\s*\]\]>\s*$/,"").trim();if(!t)return null;
  try{return JSON.parse(t);}catch(e){}try{return JSON.parse(t.replace(/[\u0000-\u001f]+/g," "));}catch(e){}return null;}
function jlFind(x,d){if(!x||d>8)return null;if(Array.isArray(x)){for(var i=0;i<x.length;i++){var r=jlFind(x[i],d+1);if(r)return r;}return null;}if(typeof x!=="object")return null;
  var ty=x["@type"];if((Array.isArray(ty)?ty:[ty]).some(function(t){return /(^|[\/:#])JobPosting$/i.test(String(t||""));}))return x;
  var ks=["@graph","mainEntity","mainEntityOfPage","itemListElement","item","about","hasPart"];for(var k=0;k<ks.length;k++){var r2=jlFind(x[ks[k]],d+1);if(r2)return r2;}return null;}
function jlStr(v){if(v==null||v===false)return "";if(Array.isArray(v)){var a=v.map(jlStr).filter(Boolean);return a.filter(function(s,i){return a.indexOf(s)===i;}).join(", ");}
  if(typeof v==="object")return jlStr(v.name!=null?v.name:v["@value"]!=null?v["@value"]:(v.value!=null&&typeof v.value!=="object")?v.value:"");return String(v).replace(/\s+/g," ").trim();}
function jlIso(s){var m=/(\d{4})-(\d{2})-(\d{2})/.exec(String(s||""));return m?m[1]+"-"+m[2]+"-"+m[3]:"";}
function jlDay(s){var i=jlIso(s);if(!i)return jlStr(s);var p=i.split("-");return dayStr(new Date(+p[0],+p[1]-1,+p[2],12));}
function jlPlace(v){var out=[];(Array.isArray(v)?v:[v]).filter(Boolean).forEach(function(p){var s="";if(typeof p==="string")s=p;else{var a=p.address||p;if(typeof a==="string")s=a;
      else{var ps=[a.addressLocality,a.addressRegion,a.addressCountry].map(jlStr).filter(Boolean);s=ps.filter(function(x,i){return ps.indexOf(x)===i;}).join(", ");}if(!s)s=jlStr(p.name);}
    s=String(s||"").trim();if(s&&out.indexOf(s)<0)out.push(s);});return out.slice(0,4).join("; ");}
function jlPay(v){if(!v)return "";if(typeof v!=="object")return jlStr(v);if(Array.isArray(v))return jlPay(v[0]);var cur=jlStr(v.currency),q=v.value,unit="",amt="";
  var f=function(n){var x=+n;return (n===""||isNaN(x))?String(n):x.toLocaleString("en-GB");};
  if(q&&typeof q==="object"){unit=jlStr(q.unitText);var lo=q.minValue,hi=q.maxValue;amt=lo!=null&&hi!=null&&+lo!==+hi?f(lo)+" to "+f(hi):lo!=null?f(lo):hi!=null?f(hi):q.value!=null?f(q.value):"";}
  else if(q!=null)amt=f(q);if(!amt)return "";
  return [cur,amt,{YEAR:"a year",MONTH:"a month",WEEK:"a week",DAY:"a day",HOUR:"an hour"}[String(unit||v.unitText||"").toUpperCase()]||""].filter(Boolean).join(" ");}
var JL_HOURS={FULL_TIME:"Full time",PART_TIME:"Part time",CONTRACTOR:"Contract",TEMPORARY:"Temporary",INTERN:"Internship",VOLUNTEER:"Volunteer",PER_DIEM:"Per diem",OTHER:"Other"};
function jlHours(v){var a=(Array.isArray(v)?v:[v]).map(function(x){x=jlStr(x);return JL_HOURS[x.toUpperCase().replace(/[\s-]+/g,"_")]||x;}).filter(Boolean);return a.filter(function(s,i){return a.indexOf(s)===i;}).join(", ");}
function jlFromLd(j){var desc=jlText(jlUnent(typeof j.description==="string"?j.description:jlStr(j.description)));
  var more=[["What you will do",j.responsibilities],["What it asks for",j.qualifications],["Experience",j.experienceRequirements],["Education",j.educationRequirements],["Skills",j.skills],["Benefits",j.jobBenefits]].map(function(x){
    var t=jlText(jlUnent(typeof x[1]==="string"?x[1]:jlStr(x[1])));if(!t||t.length<3||desc.indexOf(t.slice(0,60))>=0)return "";return x[0]+":\n"+t;}).filter(Boolean);
  var remote=/telecommute/i.test(jlStr(j.jobLocationType)),appl=jlPlace(j.applicantLocationRequirements);
  return {title:jlStr(j.title)||jlStr(j.name),org:jlStr(j.hiringOrganization),loc:jlPlace(j.jobLocation),where:remote?"Remote"+(appl?" (open to applicants in "+appl+")":""):"",type:jlHours(j.employmentType),
    pay:jlPay(j.baseSalary)||jlPay(j.estimatedSalary),posted:jlDay(j.datePosted),closesIso:jlIso(j.validThrough),closesWord:jlDay(j.validThrough),body:[desc].concat(more).filter(Boolean).join("\n\n"),url:jlStr(j.url)};}
/* microdata, which older pages use instead of JSON-LD */
function jlMicro(doc){var root=null;try{root=doc.querySelector('[itemtype*="schema.org/JobPosting" i]');}catch(e){}if(!root)return null;
  function el(n,sc){return (sc||root).querySelector('[itemprop~="'+n+'"]');}
  function val(e){if(!e)return "";if(e.hasAttribute("content"))return e.getAttribute("content");if(e.tagName==="TIME")return e.getAttribute("datetime")||e.textContent;if(/^(A|LINK)$/.test(e.tagName))return e.getAttribute("href")||"";return e.textContent.replace(/\s+/g," ").trim();}
  var org=el("hiringOrganization"),loc=el("jobLocation"),d=el("description");
  return {"@type":"JobPosting",title:val(el("title")),description:d?d.innerHTML:"",datePosted:val(el("datePosted")),validThrough:val(el("validThrough")),employmentType:val(el("employmentType")),
    hiringOrganization:org?(val(el("name",org))||org.textContent.replace(/\s+/g," ").trim()):"",
    jobLocation:loc?{address:{addressLocality:val(el("addressLocality",loc)),addressRegion:val(el("addressRegion",loc)),addressCountry:val(el("addressCountry",loc))}}:""};}
/* the readable part of a page: the posting's own box where the page marks one, else its article or main part */
var JL_SEL=['[itemprop="description"]','[data-automation-id="jobPostingDescription"]','#jobDescriptionText','.show-more-less-html__markup','.description__text','.job-description','#job-description','.jobDescription','.job-details','#job-details','.job-body','.posting-page','.vacancy-description','#vacancy','.vacancy','article','main','[role=main]','#content','#main'];
function jlReadable(doc){var pick=null;for(var i=0;i<JL_SEL.length&&!pick;i++){var e=null;try{e=doc.querySelector(JL_SEL[i]);}catch(x){}if(e&&String(e.textContent||"").replace(/\s+/g," ").trim().length>=500)pick=e;}
  var root=pick||doc.body;if(!root)return "";root=root.cloneNode(true);
  [].forEach.call(root.querySelectorAll('nav,header,footer,aside,form,[role=navigation],[role=banner],[role=contentinfo],[aria-hidden=true],#onetrust-consent-sdk,#onetrust-banner-sdk,#CybotCookiebotDialog,.cc-window'),function(n){n.remove();});
  return jlNodeText(root);}
/* Greenhouse's Job Board API and Lever's Postings API, by the fields their documentation names */
function jlGh(j){if(!j||!j.title)return null;var deps=(j.departments||[]).map(function(x){return x&&x.name;}).filter(Boolean).join(", "),offs=(j.offices||[]).map(function(x){return x&&x.name;}).filter(Boolean).join("; ");
  return {title:String(j.title).trim(),org:String(j.company_name||"").trim(),loc:(j.location&&j.location.name)||offs||"",team:deps,posted:jlDay(j.first_published||j.updated_at||""),
    closesIso:jlIso(j.application_deadline),closesWord:j.application_deadline?jlDay(j.application_deadline):"",body:jlText(jlUnent(String(j.content||""))),url:j.absolute_url||""};}
function jlLever(j){if(!j||!j.text)return null;var c=j.categories||{},parts=[j.descriptionPlain||jlText(j.description||"")];
  (j.lists||[]).forEach(function(l){if(l&&(l.text||l.content))parts.push(((l.text||"")+"\n"+jlText("<ul>"+String(l.content||"")+"</ul>")).trim());});
  parts.push(j.additionalPlain||jlText(j.additional||""));if(j.salaryDescriptionPlain)parts.push(j.salaryDescriptionPlain);
  return {title:String(j.text).trim(),org:"",loc:jlStr(c.allLocations&&c.allLocations.length?c.allLocations:c.location),team:[c.team,c.department].map(jlStr).filter(Boolean).join(", "),type:jlStr(c.commitment),
    where:{"on-site":"On site",remote:"Remote",hybrid:"Hybrid"}[j.workplaceType]||"",body:parts.filter(function(x){return x&&String(x).trim();}).join("\n\n").trim(),url:j.hostedUrl||""};}
/* why a page gave no posting: a sign-in, a refusal, a page built only by its scripts, or a page gone */
function jlWall(st,t,hasData,host){if(st===404||st===410)return "gone";if(st===401||st===407||st===999)return "signin";if(st===403||st===429||st===451)return "refused";if(st>=500)return "down";if(st&&(st<200||st>=300))return "refused";
  if(hasData)return "";var s=String(t||"").slice(0,4000).toLowerCase(),n=String(t||"").length;
  if(n<2500&&(/sign in to (view|see|continue|apply)|log ?in to (view|see|continue|apply)|join (now )?to (view|see)|please (sign|log) ?in|you must be (signed|logged) in/.test(s)||(/linkedin\.com$/.test(host||"")&&/sign in|join now|agree & join/.test(s))))return "signin";
  if(n<1500&&/enable javascript|javascript is (required|disabled|not enabled)|requires javascript|turn on javascript/.test(s))return "script";
  if(n<3000&&/captcha|are you a robot|verify (that )?you are (a )?human|access denied|unusual traffic|request (was )?blocked|attention required/.test(s))return "refused";return "";}
function jlErr(kind,host,st,n){var e=new Error(kind);e.jl={kind:kind,host:host,status:st,n:n||0};return e;}
function jlMsg(e){var j=e&&e.jl,m=String(e&&e.message||e||""),site=(j&&j.host)||"The site",li=/linkedin\.com$/.test(site);
  if(!j){if(/browser refused or could not reach/i.test(m))return {text:"In a browser, most sites refuse requests from another page. The Ingenium apps fetch postings; here, paste the posting's text below instead.",paste:true};
    return {text:"It could not be fetched: "+m.replace(/\.$/,"")+". Paste the posting's text below instead.",paste:true};}
  var st=j.status?" (it answered "+j.status+")":"";
  return ({signin:{text:(li?"LinkedIn":site)+" shows this posting only to people who are signed in, so Ingenium cannot fetch it. Open it in your browser, select all of its text (Ctrl+A, or Command+A on a Mac), copy it, and paste it below. Or look for the same post on the employer's own site.",paste:true,elsewhere:true},
    refused:{text:site+" refused the request"+st+". Many job sites refuse anything but a browser. Open it in your browser, copy its text, and paste it below, or look for the same post on the employer's own site.",paste:true,elsewhere:true},
    script:{text:site+" builds its pages with scripts, so their text cannot be read from here. Open it in your browser, copy its text, and paste it below.",paste:true,elsewhere:true},
    gone:{text:site+" says the page does not exist"+st+". The posting may have closed, or the link may be cut short: copy it again from the address bar.",paste:false},
    down:{text:site+" did not answer properly"+st+". Try again in a few minutes, or paste the posting's text below.",paste:true},
    pdf:{text:"This link opens a PDF. Save it, then add it with Choose a file.",file:true},
    little:{text:"Too little of the posting came back ("+j.n+" characters): the site may build it with scripts. Open it in your browser, copy its text, and paste it below.",paste:true,elsewhere:true}})[j.kind]||{text:"It could not be fetched. Paste the posting's text below instead.",paste:true};}
function jlPage(u){var host=jlHost(u);
  return netFetch(u,{headers:{"Accept":"text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8","Accept-Language":(navigator.language||"en-GB")+",en;q=0.8"},timeout:30}).then(function(r){
    return r.text().then(function(t){t=String(t||"");var ct=String(r.contentType||"");
      if(/application\/pdf/i.test(ct)||/^%PDF-/.test(t.slice(0,8)))throw jlErr("pdf",host,r.status);
      var w0=jlWall(r.status,"",true,host);if(w0)throw jlErr(w0,host,r.status);
      if(!/html|xml/i.test(ct)&&!/<html|<body|<div|<p[\s>]/i.test(t.slice(0,4000))){var plain=t.replace(/\r/g,"").trim();if(plain.length<200)throw jlErr("little",host,r.status,plain.length);return {title:"",org:"",body:plain,plain:true,how:"the page's text"};}
      var doc=new DOMParser().parseFromString(t,"text/html"),jp=null;
      [].forEach.call(doc.querySelectorAll('script[type*="ld+json"]'),function(s){if(!jp){var f=jlFind(jlJson(s.textContent),0);if(f)jp=f;}});
      if(!jp)jp=jlMicro(doc);
      var d=jp?jlFromLd(jp):{title:"",org:"",body:""},rd=jlReadable(doc);if(String(d.body||"").length<300&&rd.length>String(d.body||"").length)d.body=rd;
      var meta=function(n){var m=doc.querySelector('meta[property="'+n+'"],meta[name="'+n+'"]');return m?String(m.getAttribute("content")||"").trim():"";},h1=doc.querySelector("h1");
      d.pageTitle=meta("og:title")||(h1?h1.textContent.replace(/\s+/g," ").trim():"")||String(doc.title||"").trim();d.site=meta("og:site_name");
      /* LinkedIn gives a posting only on its public job page, with the posting's own data or its description box; anything else is its sign-in */
      if(/(^|\.)linkedin\.com$/.test(host)&&!(jp&&d.title)&&!doc.querySelector(".show-more-less-html__markup,.description__text"))throw jlErr("signin",host,r.status);
      var w=jlWall(r.status,d.body,!!(jp&&d.title&&String(d.body).length>=200),host);if(w)throw jlErr(w,host,r.status);
      if(String(d.body).length<200)throw jlErr("little",host,r.status,String(d.body).length);
      d.data=!!(jp&&d.title);d.how=d.data?"the posting's own data, which the site publishes for search engines":"the page's text";return d;});});}
function jlFetch(u){var a=jlAts(u);if(!a)return jlPage(u);
  return netFetch(jlApi(a),{headers:{"Accept":"application/json"},timeout:25}).then(function(r){if(!r.ok)throw new Error("answered "+r.status);return r.json();})
    .then(function(j){var d=a.kind==="greenhouse"?jlGh(j):jlLever(j);if(!d||!d.title||String(d.body).length<200)throw new Error("too little");d.data=true;d.how=a.kind==="greenhouse"?"Greenhouse's public job board":"Lever's public job postings";return d;})
    .catch(function(){return jlPage(u);});}
/* the posting as it is kept: its title and who offers it first (as the reading and Lector's parser expect), then its facts, then its text */
function jlCompose(d,u){if(d.plain)return String(d.body||"").trim();var head=[d.title||d.pageTitle||"A posting"];if(d.org||d.site)head.push(d.org||d.site);
  [["Location",d.loc],["Workplace",d.where],["Team",d.team],["Hours",d.type],["Salary",d.pay],["Posted",d.posted],["Closing date",d.closesWord],["Link",u]].forEach(function(x){if(x[1])head.push(x[0]+": "+x[1]);});
  return head.join("\n")+"\n\n"+String(d.body||"").trim();}
/* the closing date where the posting gives it in a sentence ("Closing date: 15 December 2026. Interviews ...") */
function jlCloses(t){var L=String(t||"").split(/\n+/),re=/(clos(es|ing)( date)?|deadline|apply by|applications? (are |must be )?(due|received|submitted)|no later than)/i;
  for(var i=0;i<L.length;i++){if(!re.test(L[i]))continue;var ss=L[i].split(/[.;]\s+/);for(var j=0;j<ss.length;j++){if(re.test(ss[j])){var iso=dateIn(ss[j]);if(iso)return {iso:iso,word:jlDay(iso)};}}}return null;}
function jlKind(d,kind){if(kind&&kind!=="job")return kind;var t=(d.title||d.pageTitle||"")+" "+(d.type||"");
  if(/\b(phd|dphil|doctoral|doctorate|studentship)\b/i.test(t))return "phd";if(/\b(fellowship|grant|scholarship|bursary)\b/i.test(t))return "grant";return "job";}
/* a saved job from LinkedIn, once it is an application, is marked as brought in */
function jlLinked(o){if(JL.sv){var x=svList().filter(function(s){return s.id===JL.sv;})[0];if(x){x.st="in";x.opp=o.id;if(x.kind==="applied")o.stage="applied";if(!o.org&&x.org)o.org=x.org;if(!o.title&&x.title)o.title=x.title;}}JL.sv=null;JL.hint=null;}
function jlClear(){JL.err=null;JL.found=null;JL.sv=null;JL.hint=null;JL.focus="";}
/* once kept, it is read at once when a model is ready */
function readNow(o){CS().ui.room="apps";CS().ui.open=o.id;show("work");save();
  if(modelReady()){readOpp(o);return;}render();say("Kept. A model is needed to read it against your profile: get one on the Models page"+(typeof lxCxReady==="function"&&lxCxReady()?", or choose your connected model on the studio's first page":"")+".");}
function fetchPosting(url,kind,opt){opt=opt||{};var u=jlNorm(url);
  if(!u){JL.err={text:"That is not a whole web address. Copy it from the address bar: it begins with https://",paste:true};CS().ui.open="new";show("work");save();render();return Promise.resolve(null);}
  if(typeof netFetch!=="function"){say("This device cannot fetch pages.");return Promise.resolve(null);}if(JL.busy||busyNow())return Promise.resolve(null);
  var same=CS().opps.filter(function(o){return urlOf(o)===u;})[0];
  if(same&&!opt.again){jlLinked(same);jlClear();CS().ui.room="apps";CS().ui.open=same.id;show("work");save();render();say("It is in your applications already: "+(same.title||"Untitled")+".");return Promise.resolve(same);}
  JL.busy=true;JL.url=u;JL.err=null;JL.found=null;render();
  return jlFetch(u).then(function(d){if(!d.closesWord){var cl=jlCloses(d.body);if(cl){d.closesWord=cl.word;d.closesIso=cl.iso;}}return newOpp(jlKind(d,kind),jlCompose(d,u),u).then(function(o){o.url=u;o.fetchedAt=Date.now();o.how=d.how;
      if(d.data&&d.title){o.title=d.title.slice(0,160);o.titleSet=true;}else if(d.pageTitle)o.title=d.pageTitle.slice(0,160);
      o.org=String(d.org||d.site||"").slice(0,160);if(d.data&&d.org)o.orgSet=true;
      if(d.closesWord){o.closes=d.closesWord.slice(0,80);o.due=d.closesIso||dateIn(d.closesWord)||o.due;}
      if(kind&&kind!=="job")o.kindSet=true;jlLinked(o);JL.busy=false;JL.url="";jlClear();save();say("Fetched from "+jlHost(u)+(d.data?", from "+d.how:"")+".");readNow(o);return o;});},
    function(e){JL.busy=false;JL.url="";JL.err=jlMsg(e);JL.err.url=u;JL.focus=JL.err.paste?"paste":"";JL.kind=kind||JL.kind;CS().ui.room="apps";CS().ui.open="new";show("work");save();render();return null;});}
/* the same post on the employer's own site, found by its title and who offers it (a search, only when she presses) */
function jlElsewhere(q){q=String(q||"").replace(/\s+/g," ").trim();if(q.length<4){say("Give its title and who offers it first.");return;}
  if(typeof webSearch!=="function"){say("This device cannot search online.");return;}JL.found={q:q,busy:true,rs:[]};render();
  webSearch(q+" job",8).then(function(rs){JL.found={q:q,rs:(rs||[]).filter(function(x){return x&&x.url&&!/linkedin\.com|indeed\.|glassdoor\./i.test(x.url);}).slice(0,6)};render();},
    function(e){JL.found={q:q,rs:[],err:String(e&&e.message||e)};render();});}
function linkRow(kind,val,big){var r=h("div","c-link"),u=input("url",val||"","Paste a job link: https://…");u.setAttribute("aria-label","The posting's link");u.setAttribute("autocomplete","off");u.spellcheck=false;
  var go=cbtn("pri",JL.busy?"Fetching…":"Fetch and read it",function(){fetchPosting(u.value,kind());},"Fetches the posting from its link, only now, and reads it against your profile");if(JL.busy){go.disabled=true;u.disabled=true;}
  u.addEventListener("keydown",function(e){if(e.key==="Enter"){e.preventDefault();fetchPosting(u.value,kind());}});
  /* a whole link pasted is fetched at once: the paste is the press */
  u.addEventListener("paste",function(){setTimeout(function(){if(jlNorm(u.value)&&!JL.busy)fetchPosting(u.value,kind());},40);});
  if(big){u.id="csLink";r.appendChild(field("Its link",u));}else r.appendChild(u);r.appendChild(go);return r;}
function quickLink(){var w=h("div","c-quick");w.appendChild(h("h3","c-h3",esc("Bring a posting by its link")));w.appendChild(linkRow(function(){return "job";},"",false));
  w.appendChild(JL.busy?h("p","c-status","<i class=\"c-spin\" aria-hidden=\"true\"></i>"+esc("Fetching the posting from "+jlHost(JL.url)+"…")):h("p","c-note",esc("Paste the link: Ingenium fetches the posting, keeps it on this device and reads it against your profile at once. For a PhD, a grant, or a posting to paste as text, use Bring a posting.")));return w;}
function lookUp(o){if(typeof webSearch!=="function"){say("This device cannot search online.");return;}var q=[o.org,o.title].filter(Boolean).join(" ").trim();if(!q){say("Give it a title or an organisation first.");return;}
  say("Searching online for "+q+"…");webSearch(q,6).then(function(rs){o.web={at:Date.now(),q:q,results:rs.map(function(x){return {title:String(x.title||x.url).slice(0,200),url:x.url,snippet:String(x.snippet||x.text||"").slice(0,400)};})};save();render();},function(e){say("The search did not work: "+(e&&e.message||e));});}

/* ---------------- teaching: how each piece is built (common practice; the posting's own instructions come first) ---------------- */
var LESSONS=[["Reading a posting",["Find the person specification: the essential criteria are the ones a panel must see; the desirable ones decide between close candidates.","Copy each criterion into your own list, in the posting's words. You will answer them in its words too.","For each, write down your evidence: a moment, what you did yourself, and what came of it. Where you have none, say so to yourself plainly.","Note the closing date, how to apply, what to send and how long each part may be. Follow these to the letter.","Note who to ask questions, and ask one good question if something matters to your decision."]],
  ["A CV for an application",["Put first what the posting asks for most: for an academic post, often education, research and teaching; for other posts, the work closest to the role.","One line for each entry, what and where, with the dates; then a few lines that begin with a verb and name concrete work and results.","Keep the dates exact and in the same form throughout.","Leave out what does not serve this application; keep the rest for another.","No photograph, date of birth or marital status, unless the posting asks (common practice in the UK)."]],
  ["A cover letter",["The first paragraph says what you apply for and, in a sentence, why.","Each middle paragraph takes one or two of the essential criteria and gives your evidence for them: what you did, how, and what came of it.","One paragraph on why this organisation or programme, from what it says of itself, not from praise.","Close courteously. \"Yours sincerely\" when you name the reader, \"Yours faithfully\" when you do not.","One page is usual. Say nothing you could not show."]],
  ["A supporting statement",["Many posts in the UK ask you to show how you meet each criterion of the person specification. Take them in order, under their own words as headings.","Under each, a short example: the situation, what you did yourself, and the result.","Where you do not meet a criterion, say what comes closest, or leave it: never claim it.","The panel scores each criterion: make each answer easy to find."]],
  ["A personal statement for a PhD or DPhil",["Say what you want to research and why it matters, in plain terms, early.","Show how your studies and work prepared you: the methods, the sources and the languages you already have.","Show that you know what this programme and its people offer, from what they publish, and why it fits your project.","Keep to the length asked. Read the department's guidance: some want a research proposal instead, or as well."]],
  ["A research proposal",["A working title, then the question, in one or two sentences.","Why it matters: what is not yet known, and to whom it matters.","What is known: the main work your question answers to, honestly cited.","Approach and methods, and the sources or materials you will use, and whether you can reach them.","A timetable that fits the funding, and why this programme and supervisor suit it. It is a plan: it may change, and examiners know that."]],
  ["Writing to a prospective supervisor",["Read their recent work first, and say briefly which part bears on your project.","In a few lines: who you are, what you want to research, and why with them.","Attach or offer a short outline and your CV. Ask one clear question: whether they would consider supervising it.","Keep it short. If there is no answer in two or three weeks, one polite follow-up is usual."]],
  ["A portfolio for an application",["Choose two to four pieces of your own work that answer the posting's criteria; put the strongest first.","For each: what it is, your part, the problem, what you did, and what came of it.","Say in a line what each piece shows for this application, in the posting's own words.","Only what you can show: links that work, figures you can stand behind.","Half a page for each piece; a link carries the rest."]],
  ["Asking for a reference",["Ask early, and ask whether they can write a good reference, not just a reference.","Send the posting, your CV and the date it is due, and remind them of the work they know you for.","Thank them, and tell them the outcome."]],
  ["Interviews",["Prepare an example for each essential criterion: the situation, what you did yourself, and the result.","Say \"I\" for what you did. Be exact about figures and dates.","When you do not know, say so, and say how you would find out.","Prepare two or three questions of your own about the work itself."]],
  ["A checklist from a posting",["Read the posting once through without writing anything.","Then read it again, slowly, and mark each thing it asks you to send: a CV, a letter, a statement, a proposal, a sample, transcripts, references.","Mark how to send it (a portal, an email address, a form) and the closing date and time.","Mark every limit: words, pages, the number of references.","Write each as one short line, and tick it only when it is ready to send."]],
  ["A statement of purpose",["Many programmes, in North America above all, ask for a statement of purpose: it is about the work you mean to do, more than about your life.","Open with the research question or the field, plainly, in the first paragraph.","Show how your studies, work and writing prepared you for it, with concrete examples.","Say which parts of this programme, and which of its people, your work needs, from what the programme itself publishes.","Close with what you mean to do with the degree.","Keep within the limit, and follow the programme's own instructions first."]],
  ["A teaching statement",["Say what you believe helps students learn, in a sentence or two.","Show it through moments from your own teaching: what you taught, to whom, what you did and what came of it.","Say how you would teach what this post asks for.","Say how you keep improving your teaching: feedback, observation, training.","Concrete examples count for more than general claims."]],
  ["A funding application",["Follow the funder's own sections and limits first.","Say what the project is and why it matters, plainly, at the start.","Show what you have already done that makes it likely to succeed.","Say exactly what the money makes possible, and leave every figure and cost for you to check.","Show why this funder: from what the funder itself says it supports."]],
  /* 6.44 */ ["Finding your edge",["Write down every setting you have worked, studied or made something in, not only posts: projects, teaching, volunteering, things you built.","For each, write what you did yourself and what came of it: a result, a number, a change someone noticed.","Ask of each: what does this show I can do anywhere? Name the ability, not the task: planning a course, not making slides.","Put your abilities beside the words of what you are aiming for. Where they meet, you have a transfer: one sentence that names the setting, what you did and the result.","Look for what you leave out. A strength your record shows that your CV never mentions is a blind spot; so is a question a reader will ask that your documents do not answer.","Find your edge: the combination few others have. Say it in one line, and let every document show it.","Check every sentence against your record: if you could not show it, take it out."]],
  ["Choosing a writing sample",["Choose the piece closest to the field and the kind of work the programme asks for.","Prefer a piece you wrote alone, and your most recent strong work.","Keep within the limit by cutting whole sections, not by rewriting; say in a short note where it was cut, if the call allows a note.","Check the call for its format: length, file type, and whether references count."]]];

/* ---------------- painting: Lector's own panels (6.8.3) ----------------
   Her words (28 October 2026): "The Career Studio needs to be redesigned to match the rest of the app and its sleek elegant
   and elevated look. I want it to be AUDHD acessible and organised. I don't want to be endlessly scrolling on this new page,
   please keep that in mind." So the studio is laid out as Lector is: its rooms beside its name, then two raised panels that
   fill the window (a list, and the work), each scrolling inside itself; an application is taken in five numbered steps,
   one step on the screen at a time, its next action always at the foot of the panel. On a narrow screen one panel shows at
   a time, with a key back to the list. */
var ICON={today:'<circle cx="12" cy="12" r="3.6"/><path d="M12 3.5v2.2M12 18.3v2.2M3.5 12h2.2M18.3 12h2.2M6 6l1.6 1.6M16.4 16.4 18 18M6 18l1.6-1.6M16.4 7.6 18 6"/>',apps:'<rect x="3.5" y="7.5" width="17" height="12" rx="2"/><path d="M9 7.5V5.8A1.8 1.8 0 0 1 10.8 4h2.4A1.8 1.8 0 0 1 15 5.8v1.7M3.5 12.5h17"/>',
  profile:'<circle cx="12" cy="8.5" r="3.6"/><path d="M4.8 19.5c1.2-3.6 4-5.2 7.2-5.2s6 1.6 7.2 5.2"/>',
  goals:'<path d="M6 21V4M6 4.8h10.5l-2.2 3.6 2.2 3.6H6"/>',
  /* 6.44: Your edge, a compass */
  edge:'<circle cx="12" cy="12" r="8.5"/><path d="m15.3 8.7-2.2 4.4-4.4 2.2 2.2-4.4z"/>',
  learn:'<path d="M3.5 6.2c2.9-1.3 5.8-1.3 8.5.3 2.7-1.6 5.6-1.6 8.5-.3v12.6c-2.9-1.3-5.8-1.3-8.5.3-2.7-1.6-5.6-1.6-8.5-.3z"/><path d="M12 6.5v12.6"/>',
  people:'<circle cx="9" cy="8.5" r="3.2"/><path d="M3.5 19c.6-3.2 2.8-5 5.5-5s4.9 1.8 5.5 5"/><circle cx="17" cy="9.5" r="2.5"/><path d="M15.6 14.3c2.4-.3 4.3 1.2 4.9 4.2"/>'};
function ico(k){return '<svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">'+(ICON[k]||"")+'</svg>';}
function cbtn(cls,txt,fn,title){var b=h("button","c-btn"+(cls?" "+cls:""));b.type="button";b.textContent=txt;if(title)b.title=title;b.addEventListener("click",function(e){e.preventDefault();fn(b,e);});return b;}
function chip(txt,cls){return h("span","c-chip"+(cls?" "+cls:""),esc(txt));}
function seg(opts,val,fn,label){var s=h("div","c-seg");s.setAttribute("role","group");if(label)s.setAttribute("aria-label",label);
  opts.forEach(function(o){var b=h("button");b.type="button";b.textContent=o[1];b.setAttribute("aria-pressed",o[0]===val?"true":"false");b.addEventListener("click",function(){fn(o[0]);});s.appendChild(b);});return s;}
function panel(id,title,o){o=o||{};var p=h("section","c-pn"+(o.cls?" "+o.cls:""));if(id)p.id=id;p.setAttribute("aria-label",title);
  var hd=h("div","c-pn-h");if(o.back){hd.appendChild(cbtn("quiet c-back","‹ "+o.back,o.onBack,"Back to "+o.back));}
  var t=h("h2",null,esc(title));hd.appendChild(t);if(o.chip)hd.appendChild(o.chip);if(o.key)hd.appendChild(o.key);
  var bd=h("div","c-pn-b"),ft=h("div","c-pn-f");p.appendChild(hd);p.appendChild(bd);p.appendChild(ft);return {el:p,head:hd,body:bd,foot:ft,title:t};}
function empty(title,text){var e=h("div","c-empty");e.appendChild(h("h3",null,esc(title)));if(text)e.appendChild(h("p",null,esc(text)));return e;}
function item(title,sub,on,fn,cls){var b=h("button","c-item"+(cls?" "+cls:""));b.type="button";if(on)b.setAttribute("aria-current","true");b.appendChild(h("b",null,esc(title)));if(sub)b.appendChild(h("small",null,esc(sub)));b.addEventListener("click",fn);return b;}
function flex(cls){return h("div",cls);}
function show(where){CS().ui.show=where;}

/* the window's height, as Lector takes it: the panels fill what is left below the head, and only they scroll */
function fit(){var root=$("cs");if(!root||!root.offsetParent)return;var r=root.getBoundingClientRect(),top=r.top;
  /* where its top would be with nothing scrolled: the page's main area scrolls by itself, and a top taken while it was
     scrolled made the studio taller by as much, and so kept it scrolling */
  for(var a=root.parentNode;a&&a.nodeType===1;a=a.parentNode)top+=a.scrollTop||0;
  root.style.setProperty("--c-h",Math.max(440,Math.floor(W.innerHeight-top-12))+"px");root.classList.toggle("c-one",r.width<900);root.classList.toggle("c-phone",r.width<540);}
var fitT=0;function fitSoon(){clearTimeout(fitT);fitT=setTimeout(fit,30);}
W.addEventListener("resize",function(){if($("cs"))fitSoon();});

var LAST_ROOM=null;
function render(){var root=$("cs");if(!root)return;var S=CS(),room0=S.ui.room||"apps";
  [].forEach.call(root.querySelectorAll(".c-head [data-room]"),function(b){var on=b.getAttribute("data-room")===room0;b.setAttribute("aria-selected",on?"true":"false");b.tabIndex=on?0:-1;});
  var host=$("csHost"),keepL=null,keepR=null,ol=host.querySelector(".c-list .c-pn-b"),or=host.querySelector(".c-work .c-pn-b");if(ol)keepL=ol.scrollTop;if(or)keepR=or.scrollTop;
  host.innerHTML="";var two=h("div","c-panels"+(LAST_ROOM!==room0?" c-rise":""));host.appendChild(two);var same=LAST_ROOM===room0;LAST_ROOM=room0;
  if(room0==="today")paintToday(two);else if(room0==="mentor"){if(W.IngCounsel)IngCounsel.paint(two);else paintMentor(two);}else if(room0==="people")paintPeople(two);else if(room0==="profile")paintProfile(two);else if(room0==="edge")paintEdge(two);else if(room0==="goals")paintGoals(two);else if(room0==="learn")paintLearn(two);else paintApps(two);
  paintWho();
  root.setAttribute("data-show",S.ui.show==="work"?"work":"list");
  if(same){var nl=host.querySelector(".c-list .c-pn-b"),nr=host.querySelector(".c-work .c-pn-b");if(nl&&keepL!=null)nl.scrollTop=keepL;if(nr&&keepR!=null&&!host.__jump)nr.scrollTop=keepR;}host.__jump=false;
  /* the item in hand stays in sight in its own list (moving only that list, never the page) */
  [].forEach.call(host.querySelectorAll(".c-nav"),function(n){var c=n.querySelector('[aria-current="true"]');if(!c)return;var top=c.offsetTop-n.offsetTop;if(top<n.scrollTop||top+c.offsetHeight>n.scrollTop+n.clientHeight)n.scrollTop=Math.max(0,top-8);});
  fit();}
/* ---------------- 6.9.7 · People: potential supervisors, referees, recruiters and hiring managers, one list ----------------
   Her words (3 November 2026): "I will be juggling many job applications, phd applications prep and emailing potential supervisors,
   reference requests and hiring managers and recruiters. I need a system built-in Ingenium that can help me streamline all of that
   and manage it all"; of what overwhelms her, "Tracking it all"; and her choices: one step at a time; Ingenium drafts, she reviews
   all and edits freely. Each person has a status and a date to follow up; their step joins Today in the order of its date; the
   referees kept with each application are listed here too. A draft uses only what her profile and the notes say: never a name, a
   work or a date that is not there. Nothing is sent by Ingenium: she copies the email into her own. */
var PPL_ROLES=[["supervisor","Potential supervisor"],["referee","Referee"],["recruiter","Recruiter"],["manager","Hiring manager"],["other","Someone else"]];
var PSTAT=[["write","To write to"],["draft","Draft ready"],["sent","Sent, waiting"],["replied","Replied"],["follow","Follow up"],["done","Done"]];
function roleWord(k){return (PPL_ROLES.filter(function(x){return x[0]===k;})[0]||PPL_ROLES[4])[1];}
function pstatWord(k){return (PSTAT.filter(function(x){return x[0]===k;})[0]||PSTAT[0])[1];}
function contacts(){var S=CS();if(!Array.isArray(S.contacts))S.contacts=[];return S.contacts;}
function waitDays(role){return role==="recruiter"||role==="manager"?7:10;}
function dayDiff(d){if(!d)return 0;var a=new Date(d+"T12:00:00"),t=new Date();if(isNaN(a))return 0;t.setHours(12,0,0,0);return Math.round((a-t)/864e5);}
function pplWhen(d){var n=dayDiff(d);return n<0?"overdue by "+(-n)+" day"+(n===-1?"":"s"):n===0?"today":n===1?"tomorrow":"in "+n+" days";}
/* the step a person asks of her now, or none */
function personStep(c){var t=todayStr(),nm=c.name||"this person";
  if(c.status==="done")return null;
  if(c.status==="write")return {text:"Write to "+nm,due:c.by||t,mins:20};
  if(c.status==="draft")return {text:"Read the draft to "+nm+", then send it",due:c.by||t,mins:10};
  if(c.status==="replied")return {text:"Read "+nm+"'s reply and answer it",due:c.follow||t,mins:15};
  if(c.status==="follow"||(c.status==="sent"&&c.follow&&c.follow<=t))return {text:"Follow up with "+nm,due:c.follow||t,mins:10};
  return null;}
function peopleSteps(){var out=[];contacts().forEach(function(c){var st=personStep(c);if(!st)return;out.push({c:c,text:st.text,mins:st.mins,days:dayDiff(st.due),when:pplWhen(st.due)});});
  out.sort(function(a,b){return a.days-b.days;});return out;}
function oppTitle(id){var o=CS().opps.filter(function(x){return x.id===id;})[0];return o?(o.title||"Untitled")+(o.org?" · "+o.org:""):"";}
function paintPeople(par){var S=CS(),C=contacts(),sel=C.filter(function(c){return c.id===S.ui.person;})[0]||null;
  var L=panel("csList","People",{key:cbtn("pri sm","+ A person",function(){var c={id:uid("pc"),name:"",role:"supervisor",org:"",email:"",link:"",opp:"",status:"write",by:"",follow:"",notes:"",draft:"",at:Date.now()};
    C.unshift(c);S.ui.person=c.id;show("work");save();render();setTimeout(function(){var i=$("pcName");if(i)i.focus();},60);},"A potential supervisor, a referee, a recruiter or a hiring manager")});
  var next=[],wait=[],done=[];C.forEach(function(c){(personStep(c)?next:c.status==="done"?done:wait).push(c);});
  function prow(c){var st=personStep(c);return item(c.name||"Someone new",[roleWord(c.role),c.org,pstatWord(c.status),st?"next step "+pplWhen(st.due):(c.follow&&c.status==="sent"?"follow up "+pplWhen(c.follow):"")].filter(Boolean).join(" · "),sel===c,function(){S.ui.person=c.id;show("work");save();render();});}
  if(!C.length)L.body.appendChild(empty("No one yet","Add the people you are writing to: potential supervisors, referees, recruiters and hiring managers. Each one gets a status and a date, and Today tells you when to write or follow up."));
  if(next.length){L.body.appendChild(h("div","c-label",esc("To do")));next.forEach(function(c){L.body.appendChild(prow(c));});}
  if(wait.length){var fw=fold("people-wait","Waiting to hear ("+wait.length+")",!next.length);wait.forEach(function(c){fw.appendChild(prow(c));});L.body.appendChild(fw);}
  if(done.length){var fd=fold("people-done","Done ("+done.length+")");done.forEach(function(c){fd.appendChild(prow(c));});L.body.appendChild(fd);}
  /* the referees kept with each application, listed here too; they are changed in their application */
  var refs=[];S.opps.forEach(function(o){(o.refs||[]).forEach(function(r){refs.push({r:r,o:o});});});
  if(refs.length){var fr=fold("people-refs","Referees in your applications ("+refs.length+")");refs.forEach(function(x){fr.appendChild(item(x.r.name,[x.o.title||"Untitled",rstat(x.r.status)].filter(Boolean).join(" · "),false,function(){S.ui.room="apps";S.ui.open=x.o.id;x.o.step="send";save();render();try{setView(x.o,{kind:"refs"});}catch(e){}}));});L.body.appendChild(fr);}
  L.foot.appendChild(h("span","c-note",esc(next.length?next.length+" to do, "+wait.length+" waiting":C.length?"Nothing to do now":"Your list of people")));
  if(RUN.busy){two(L,livePanel(),par);return;}
  var R=sel?personPanel(sel):peopleHelp();two(L,R,par);}
function peopleHelp(){var R=panel("csWork","How People works");var c=h("div","c-col c-pad");
  [["One list","Potential supervisors, referees, recruiters and hiring managers, each with what they are for."],["One step at a time","Each person has a status: to write to, draft ready, sent, replied, follow up, done. Today shows the next step, in the order of its date."],
   ["Drafts you control","Ingenium drafts the email from your profile and your notes; you read every word and change what you like. It sends nothing: you copy it into your own email."],["Follow-ups","When you mark an email as sent, a date to follow up is set (ten days for a supervisor or a referee, seven for a recruiter or a hiring manager). You can change it."]]
    .forEach(function(x){var p=h("p");p.appendChild(h("b",null,esc(x[0])));p.appendChild(document.createTextNode(": "+x[1]));c.appendChild(p);});R.body.appendChild(c);return R;}
function personPanel(c){var S=CS(),R=panel("csWork",c.name||"Someone new",{back:"People",onBack:function(){S.ui.person=null;show("list");save();render();}});var g=h("div","c-grid2 c-pad");
  function inp(id,label,key,type,ph){var i=h("input","c-in");i.id=id;i.type=type||"text";i.value=c[key]||"";if(ph)i.placeholder=ph;i.addEventListener("change",function(){c[key]=i.value.trim();save();if(key==="name")render();});g.appendChild(field(label,i));return i;}
  inp("pcName","Name","name","text","Their name");
  var rs=h("select","c-in");PPL_ROLES.forEach(function(x){var o=document.createElement("option");o.value=x[0];o.textContent=x[1];rs.appendChild(o);});rs.value=c.role;rs.addEventListener("change",function(){c.role=rs.value;save();render();});g.appendChild(field("Who they are",rs));
  inp("pcOrg","Where","org","text","University, department or company");inp("pcMail","Email","email","text","Their address, to copy into your email").inputMode="email";inp("pcLink","A link","link","url","Their page, the posting or the programme");
  var os=h("select","c-in"),o0=document.createElement("option");o0.value="";o0.textContent="No application";os.appendChild(o0);S.opps.forEach(function(o){var op=document.createElement("option");op.value=o.id;op.textContent=(o.title||"Untitled")+(o.org?" · "+o.org:"");os.appendChild(op);});
  os.value=c.opp||"";os.addEventListener("change",function(){c.opp=os.value;save();});g.appendChild(field("For",os));R.body.appendChild(g);
  var nt=h("textarea","c-ta");nt.id="pcNotes";nt.placeholder="What you know of them, and what you want from them: their research, the posting, where you met. A draft uses only this and your profile.";nt.value=c.notes||"";nt.addEventListener("change",function(){c.notes=nt.value.trim();save();});R.body.appendChild(h("div","c-pad")).appendChild(field("Notes",nt));
  /* where it stands, and the date to follow up */
  var st=h("div","c-keys c-pad");st.setAttribute("role","radiogroup");st.setAttribute("aria-label","Where it stands");
  PSTAT.forEach(function(x){var b=cbtn("sm"+(c.status===x[0]?" pri":""),x[1],function(){c.status=x[0];if(x[0]==="sent"){c.last=Date.now();if(!c.follow||c.follow<=todayStr())c.follow=addDays(todayStr(),waitDays(c.role));}save();render();});b.setAttribute("role","radio");b.setAttribute("aria-checked",c.status===x[0]?"true":"false");st.appendChild(b);});
  R.body.appendChild(st);
  var fu=h("input","c-in");fu.type="date";fu.id="pcFollow";fu.value=c.follow||"";fu.addEventListener("change",function(){c.follow=fu.value;save();render();});
  var fr=h("div","c-pad");fr.appendChild(field("Follow up on",fu));if(c.last)fr.appendChild(h("p","c-note",esc("Last written to on "+dayStr(c.last)+".")));R.body.appendChild(fr);
  /* the draft: hers to read and change */
  var dt=h("textarea","c-ta c-draft");dt.id="pcDraft";dt.placeholder="Press Draft an email for me, or write it here.";dt.value=c.draft||"";dt.rows=12;dt.addEventListener("change",function(){c.draft=dt.value;if(c.draft.trim()&&c.status==="write")c.status="draft";save();render();});
  R.body.appendChild(h("div","c-pad")).appendChild(field("The email",dt));
  R.foot.appendChild(cbtn("pri","Draft an email for me",function(){draftFor(c);},"Ingenium writes a first draft from your profile and your notes; you read and change it"));
  R.foot.appendChild(cbtn("","Copy the email",function(){var t=String(c.draft||"").trim();if(!t){say("There is no email to copy yet.");return;}try{csCopyText(t);}catch(e){}say("Copied. Paste it into your own email: Ingenium sends nothing.");}));
  if(c.status!=="sent")R.foot.appendChild(cbtn("","I sent it",function(){c.status="sent";c.last=Date.now();c.follow=addDays(todayStr(),waitDays(c.role));save();render();say("Marked as sent. Today will remind you to follow up "+pplWhen(c.follow)+" if they have not replied.");}));
  R.foot.appendChild(h("span","c-grow"));
  R.foot.appendChild(cbtn("quiet","Remove",function(){ingConfirm("Remove "+(c.name||"this person")+" from your people?",function(){S.contacts=contacts().filter(function(x){return x!==c;});S.ui.person=null;save();render();},{danger:true});}));
  return R;}
var PURPOSE={supervisor:"to ask, briefly and politely, whether they would consider supervising her doctoral project; name a link between her research interests and their work only where the notes give their work, and otherwise ask openly",
  referee:"to ask whether they would be willing to write a reference, saying what it is for and its deadline where the notes or the application give them",
  recruiter:"to introduce herself and the kinds of role she is looking for, briefly",manager:"to say why she is interested in the post and what she would bring, briefly",other:"for the purpose the notes give"};
function draftFor(c){if(busyNow()||needModel())return;var S=CS(),P=S.profile;begin(null,"Drafting an email to "+(c.name||"them"));
  var ents=P.items.slice(0,40).map(function(it){return "- "+[it.title,it.place,[it.from,it.to].filter(Boolean).join(" to ")].filter(Boolean).join(", ");}).join("\n");
  ask(function(){return [{role:"system",content:sys("You write a short email for the applicant to send herself, in "+english()+", plain and warm, with no jargon. Use only facts that her profile below or the notes give: never invent a name, a publication, a project, a date, a figure or a claim; where something is needed and not given, write it in square brackets for her to fill. First line: Subject: ... Then the email, under 200 words, signed with her name.",true)},
    {role:"user",content:"Write an email from "+(myName()||"me")+" to "+(c.name||"[their name]")+" ("+roleWord(c.role).toLowerCase()+(c.org?", "+c.org:"")+"), "+(PURPOSE[c.role]||PURPOSE.other)+"."+(c.opp?"\nIt concerns: "+oppTitle(c.opp)+".":"")+
      "\n\nNOTES ABOUT THEM (her own):\n"+(c.notes||"(none)")+"\n\n"+wantsText()+"\n\nHER PROFILE (entries):\n"+(ents||"(none)")}];},900,0.5)
  .then(function(t){t=String(t||"").trim();end();if(!t){say("Nothing came back. Try again, or add a line to the notes.");return;}c.draft=t;if(c.status==="write")c.status="draft";save();render();say("A first draft is ready: read every line, change what you like, then copy it into your own email.");},failed);}
function jump(){var host=$("csHost");if(host)host.__jump=true;}
function two(L,R,par){L.el.classList.add("c-list");R.el.classList.add("c-work");par.appendChild(L.el);par.appendChild(R.el);}
function livePanel(){var P=panel("csLivePn",RUN.what||"Working",{cls:"c-live-pn"});var p=h("p","c-note");p.id="csWhat";p.textContent=RUN.what;P.body.appendChild(p);
  var st=h("p","c-live-state");st.id="csLiveState";st.setAttribute("aria-live","polite");P.body.appendChild(st);
  var th=h("details","c-think");th.id="csThink";th.open=true;th.appendChild(h("summary",null,esc("How the model is reasoning")));var tb=h("div","c-think-b");tb.id="csThinkB";th.appendChild(tb);P.body.appendChild(th);
  var sofar=h("div","c-sofar");sofar.id="csSoFar";P.body.appendChild(sofar);
  var l=h("div","c-live");l.id="csLive";l.textContent=RUN.live||"…";P.body.appendChild(l);
  var pl=plan();P.foot.appendChild(h("span","c-note c-grow",esc(pl&&pl.link?"Written with "+(modelName()||"your model")+", "+whereLine()+".":"Written with "+(modelName()||"your model")+" on this device. Nothing leaves it.")));
  var sk=cbtn("pri","Stop",stopNow);sk.id="csStopKey";P.foot.appendChild(sk);setTimeout(paintLive,0);return P;}
/* 6.22: what is shown while it works: the time, the model's own reasoning when it gives it, and each criterion as it is judged */
function liveStateText(){var s=Math.max(0,Math.round((Date.now()-(RUN.t0||Date.now()))/1000)),t=s<60?s+" seconds":Math.floor(s/60)+" min "+(s%60)+" s";
  if(!RUN.live&&!RUN.think)return "The model is reading the posting and your profile before its first word ("+t+" so far). A model on this device can take a minute or more here; a connected one is quicker.";
  if(RUN.think&&!RUN.live)return "The model is reasoning ("+t+" so far). Its reasoning is shown below as it comes.";
  var n=(String(RUN.live).match(/^\s*(?:[-*•]\s*)?(?:\*\*)?CRITERION(?:\*\*)?:/gim)||[]).length;return n?n+" criteri"+(n===1?"on":"a")+" judged so far ("+t+")."+(RUN.think?" Its reasoning is above.":""):"Writing ("+t+" so far).";}
function paintLive(){var w=$("csWhat");if(w)w.textContent=RUN.what;var st=$("csLiveState");if(st)st.textContent=liveStateText();
  var tb=$("csThinkB"),th=$("csThink");if(tb&&th){th.style.display=RUN.think?"":"none";if(tb.textContent!==RUN.think){tb.textContent=RUN.think;tb.scrollTop=tb.scrollHeight;}}
  var sf=$("csSoFar"),l=$("csLive"),r=null;if(sf&&RUN.live&&/CRITERION/i.test(RUN.live)){try{r=parseRead(RUN.live);}catch(e){r=null;}}
  if(sf){sf.innerHTML="";if(r&&r.crit.length){var t=h("table","c-tab c-tab-live");t.innerHTML="<thead><tr><th>Criterion</th><th>Judged</th><th>From your record</th></tr></thead>";var tbd=h("tbody");
      r.crit.forEach(function(x){var tr=h("tr");tr.innerHTML="<td>"+esc(x.text)+"<small>"+(x.ess?"Essential":"Desirable")+"</small></td><td>"+stChip(x)+"</td><td>"+(x.src?"<b>"+esc(x.src)+"</b> ":"")+esc(x.ev||"")+"</td>";tbd.appendChild(tr);});
      t.appendChild(tbd);sf.appendChild(t);}}
  if(l){l.style.display=r&&r.crit.length?"none":"";l.textContent=RUN.live||"…";l.scrollTop=l.scrollHeight;}}
function stChip(x){var lab={met:"Shown",transfer:"Transfers",partly:"Partly shown",none:"Not shown"}[x.st]||"Not shown";
  var g=(x.st==="partly"||x.st==="none")&&x.gap?"<span class=\"c-gap\" data-g=\""+x.gap+"\">"+{learn:"Learnable",ask:"Ask me",hard:"Required"}[x.gap]+"</span>":"";
  return "<span class=\"c-st\" data-st=\""+x.st+"\">"+lab+"</span>"+g;}
function daysLeft(o){if(!o.due)return null;var d=new Date(o.due+"T12:00:00"),t=new Date();if(isNaN(d))return null;t.setHours(12,0,0,0);return Math.round((d-t)/864e5);}
/* a closing date in words ("30 November 2026", "November 30, 2026", "2026-11-30"), as a date for the tracker */
var MONTHS=["january","february","march","april","may","june","july","august","september","october","november","december"];
function dateIn(t){t=String(t||"");var m=/(\d{4})-(\d{2})-(\d{2})/.exec(t),y,mo,d;if(m){y=+m[1];mo=+m[2];d=+m[3];}
  else if((m=/\b(\d{1,2})(?:st|nd|rd|th)?\s+(?:of\s+)?([a-z]{3,9})\.?,?\s+(\d{4})\b/i.exec(t))){d=+m[1];mo=monthOf(m[2]);y=+m[3];}
  else if((m=/\b([a-z]{3,9})\.?\s+(\d{1,2})(?:st|nd|rd|th)?,?\s+(\d{4})\b/i.exec(t))){mo=monthOf(m[1]);d=+m[2];y=+m[3];}
  if(!y||!mo||!d||d>31)return "";return y+"-"+("0"+mo).slice(-2)+"-"+("0"+d).slice(-2);}
function monthOf(w){w=String(w).toLowerCase();for(var i=0;i<12;i++)if(MONTHS[i].indexOf(w)===0&&w.length>=3)return i+1;return 0;}
function dueWords(o){var n=daysLeft(o);if(n==null)return o.closes?"Closes: "+o.closes:"";if(n<0)return "Closed "+dayStr(o.due);if(n===0)return "Closes today";if(n===1)return "Closes tomorrow";return "Closes in "+n+" days";}
function stageWord(k){return (STAGES.filter(function(x){return x[0]===k;})[0]||STAGES[0])[1];}
function sortedOpps(){return CS().opps.slice().sort(function(a,b){var fa=FINISHED[a.stage]?1:0,fb=FINISHED[b.stage]?1:0;if(fa!==fb)return fa-fb;var da=daysLeft(a),db=daysLeft(b);
  if(da!=null&&db!=null&&da!==db)return da-db;if(da!=null&&db==null)return -1;if(db!=null&&da==null)return 1;return b.at-a.at;});}
/* the readings the reading page made for an application's reading list go with it */
function dropRuns(o){(o.reading||[]).forEach(function(it){if(!it.runId)return;try{var run=lxRun(it.runId);if(run&&run.career===o.id&&!(W.LX&&LX.busy&&LX.runId===run.id))lxDelete(run.id);}catch(e){}});}
function removeOpp(o){var S=CS();oppRefs(o).forEach(function(r){try{IngBig.del(r);}catch(e){}});dropThoughts(o);dropRuns(o);
  if(CLOCK.ids)CLOCK.ids=CLOCK.ids.filter(function(id){return id!==o.id;});S.opps=S.opps.filter(function(x){return x.id!==o.id;});S.ui.open=null;show("list");save();render();}
function fbBox(fb){var d=h("div","c-fb");if(fb.RAW){d.textContent=fb.RAW;return d;}
  d.innerHTML=(fb.MEETS?"<div><b>Meets it:</b> "+esc({YES:"yes",PARTLY:"partly",NO:"not yet"}[String(fb.MEETS).toUpperCase().split(/\W/)[0]]||fb.MEETS)+"</div>":"")+(fb.WORKS?"<div><b>What works:</b> "+esc(fb.WORKS)+"</div>":"")+(fb.MISSING?"<div><b>What is missing:</b> "+esc(fb.MISSING)+"</div>":"")+(fb["ASK YOURSELF"]?"<div><b>Ask yourself:</b> "+esc(fb["ASK YOURSELF"])+"</div>":"");return d;}

/* ---- Applications: the list, and one application in five steps ---- */
var STEPS=[["post","The posting"],["fit","How you fit"],["check","Checklist"],["send","What you send"],["practise","Practise"],["track","Track"]];
function stepDone(o,k){if(k==="post")return true;if(k==="fit")return !!o.read;if(k==="check")return !!(o.check&&o.check.items.length&&o.check.items.every(function(x){return x.done;})&&!(o.check.pending||[]).length);if(k==="send")return Object.keys(o.docs).length+o.emails.length>0;
  if(k==="practise")return Object.keys(o.practice.crit).some(function(x){return o.practice.crit[x].fb;})||o.practice.qs.some(function(q){return q.fb;});
  return ["applied","interview","offer","accepted","unsuccessful","withdrawn","not"].indexOf(o.stage)>=0;}
function goStep(o,k){o.step=k;save();jump();render();}
function paintApps(par){var S=CS(),open=S.ui.open==="new"?"new":oppById(S.ui.open),list=sortedOpps();
  var L=panel("csList","Applications",{key:cbtn("pri sm","+ Bring one",function(){jlClear();S.ui.open="new";show("work");save();render();},"Bring a posting, a programme's call or a grant")});
  /* 6.9.8: the jobs saved on LinkedIn, waiting to be taken one at a time */
  var svw=svList().filter(function(x){return x.st==="wait";}).length;if(svw||S.ui.open==="saved"){var sb=item("Saved on LinkedIn",svw?svw+" waiting · one at a time":"Nothing waiting",S.ui.open==="saved",function(){S.ui.open="saved";show("work");save();render();},"c-svk");L.body.appendChild(sb);}
  if(!list.length)L.body.appendChild(empty("Nothing here yet","Bring a posting, a programme's call or a grant you are weighing. The studio reads what you bring; it is not a job board."));
  var fin=[],soon=0;
  list.forEach(function(o){var n=daysLeft(o),dw=dueWords(o),b=h("button","c-opp");b.type="button";if(open&&open.id===o.id)b.setAttribute("aria-current","true");
    var band=o.read&&bandOf(o.read.r);if(n!=null&&n>=0&&n<=7&&!FINISHED[o.stage])soon++;
    b.innerHTML="<b>"+esc(o.title||"Untitled")+"</b>"+(o.org?"<small>"+esc(o.org)+"</small>":"")+"<span class=\"c-tags\"><span class=\"c-chip\">"+esc(stageWord(o.stage))+"</span>"+
      (band?"<span class=\"c-chip c-band-"+band.band+"\"><i></i>"+esc(band.word)+"</span>":"")+"</span>"+(dw?"<small class=\""+(n!=null&&n>=0&&n<=7&&!FINISHED[o.stage]?"c-soon":n!=null&&n<0?"c-gone":"")+"\">"+esc(dw)+"</small>":"");
    b.addEventListener("click",function(){S.ui.open=o.id;show("work");save();render();});if(FINISHED[o.stage])fin.push(b);else L.body.appendChild(b);});
  if(fin.length){var f=fold("finished","Finished ("+fin.length+")");fin.forEach(function(b){f.appendChild(b);});L.body.appendChild(f);}
  var open0=list.length-fin.length;L.foot.appendChild(h("span","c-note",esc(list.length?open0+" open"+(soon?" · "+soon+" closing within a week":"")+(fin.length?" · "+fin.length+" finished":""):"Your applications will be listed here.")));
  if(list.length)L.foot.appendChild(cbtn("sm quiet","Export all",function(){exportAll();},"Every application as a folder of files, in one zip"));
  var R=RUN.busy?livePanel():open==="new"?newPanel():S.ui.open==="saved"?savedPanel():open?oppPanel(open):introPanel();two(L,R,par);}
/* 6.8.5: each of the four parts opens to what it does, with a key into it */
var HOW=[["Your profile","What you are looking for, your CV, your entries and documents, and Lector's readings of your apps: the only facts the studio uses.",
    ["About you: your name and how to reach you, set above your CV and your letters.",
     "What you are looking for: what you want, what you need and what you would rather avoid. Every reading weighs a posting against it first.",
     "Your sources: your CV, your documents, a LinkedIn export, and Lector's readings of your apps. You choose which of them the studio may use.",
     "Your entries: posts, education, research, teaching, projects, skills and languages. Find your skills reads your sources for more, and you keep only what is right.",
     "Nothing outside your profile is ever claimed for you. Where it is silent, a place is left in square brackets for you to fill."],
    ["Open your profile",function(){CS().ui.room="profile";save();render();}]],
  ["Bring an opportunity","A posting, a programme's call or a grant. It is read against your profile: what matches what you want, and each criterion, shown or not.",
    ["Paste its link and it is fetched and read against your profile at once; or paste its text, or choose a file. Fetching is the only step that uses the internet, and only when you paste a link or press.",
     "From LinkedIn: the copy of your data that LinkedIn sends you holds the jobs you saved; they wait in Applications, to be brought in one at a time.",
     "The reading names the post, who offers it and when it closes, and lists what it asks for, each criterion essential or desirable.",
     "Each criterion is judged from your profile alone: shown, partly shown or not shown, with the evidence named.",
     "Then your strengths for it, its concerns said plainly, your next steps, and the questions worth asking the contact.",
     "Look it up online when you wish to know more about who offers it; nothing is searched unless you press for it."],
    ["Bring a posting",function(){CS().ui.open="new";show("work");save();render();}]],
  ["Decide, then write","A plain band with its reasons, and advice on whether to apply. Then the CV, the letter, the statements and the emails, or your own drafts, looked at with you.",
    ["The band follows a fixed rule, never a percentage: Strong fit, Possible fit, A stretch, or Not a fit as your profile stands, from how many essential criteria your profile shows.",
     "Then what this kind of application asks for: a tailored CV, a cover letter, a supporting statement, a personal statement, a statement of purpose, a research proposal outline, a teaching statement, a funding application, the choice of a writing sample, and emails to a supervisor, a referee, a mentor or a recruiter.",
     "Each is written from your profile and read a second time against it. A word limit the posting sets is kept, and you see which of its criteria the draft speaks to.",
     "Improve it with a note of your own, such as shorter or warmer, or go back to the version before. Or write it yourself and have it looked at with you.",
     "Save it as Word or as a PDF, exactly as it is shown."],
    ["How each is built",function(){CS().ui.room="learn";save();render();}]],
  ["Practise and track","Your evidence and your answers, looked at with you; each application followed to its end; your goals and their steps.",
    ["Your evidence: for each criterion, a moment that shows it (the situation, what you did yourself, what came of it), looked at with you and kept in your profile if you wish.",
     "Interview questions: eight that a panel would be likely to ask, and your answers, as you would say them, looked at with you.",
     "Today: only the next small step of each application, with its closing date. Not today lets one rest until tomorrow.",
     "Checklist: what each posting asks you to send and do, from its own sentences, ticked at your pace.",
     "Track: where each application stands, its closing date and the days left, and your notes. Finished applications fold away.",
     "Dates and reminders: the closing date, the interview, a reference due; Remind me puts a thought in the Inbox that comes back on its morning, inside Ingenium only. Today's This week strip gathers them.",
     "Referees, the interview and a reading list sit beside what you send; an application exports as a folder of files; Today says what fits in ten, fifteen, twenty-five or forty-five minutes.",
     "Goals and plan: your goals and their steps, and the kinds of role and programme that suit your profile."],
    ["Goals and plan",function(){CS().ui.room="goals";save();render();}]]];
var HOWOPEN=-1;
function howCards(ol){var d=ol.nextSibling;ol.innerHTML="";
  HOW.forEach(function(x,i){var open=HOWOPEN===i,li=h("li",open?"c-open":null),b=h("button","c-howk");b.type="button";b.id="csHowK"+i;
    b.setAttribute("aria-expanded",open?"true":"false");b.setAttribute("aria-controls","csHowD");
    b.innerHTML="<i>"+(i+1)+"</i><b>"+esc(x[0])+"</b><em class=\"c-howm\">"+(open?"Less":"More")+"</em><span class=\"c-howt\">"+esc(x[1])+"</span>";
    b.addEventListener("click",function(){HOWOPEN=HOWOPEN===i?-1:i;howCards(ol);var k=$("csHowK"+i);if(k){try{k.focus({preventScroll:true});}catch(e){}}
      /* what opened, in sight in its own panel; the page itself never moves */
      var dd=$("csHowD"),pb=dd&&dd.closest(".c-pn-b");if(HOWOPEN===i&&pb&&!dd.hidden){var r=dd.getBoundingClientRect(),q=pb.getBoundingClientRect(),cr=ol.getBoundingClientRect();if(r.bottom>q.bottom)pb.scrollTop+=Math.max(0,Math.min(r.bottom-q.bottom+12,cr.top-q.top-8));}});
    li.appendChild(b);ol.appendChild(li);});
  /* the one place the details open, beneath the four cards */
  d.innerHTML="";var x=HOW[HOWOPEN];
  if(x){d.hidden=false;d.setAttribute("aria-labelledby","csHowK"+HOWOPEN);d.appendChild(h("h3",null,esc(x[0])));var ul=h("ul");x[2].forEach(function(t){ul.appendChild(h("li",null,esc(t)));});d.appendChild(ul);d.appendChild(cbtn("",x[3][0],x[3][1]));
    d.style.animation="none";void d.offsetWidth;d.style.animation="";}
  else{d.hidden=true;d.removeAttribute("aria-labelledby");}}
function introPanel(){var P=panel("csWork","How the studio works",{cls:"c-intro"});P.body.appendChild(quickLink());var q=h("blockquote","c-motto","“Tell me and I forget. Teach me and I remember. Involve me and I learn.”");P.body.appendChild(q);
  var g=h("ol","c-how"),dt=h("div","c-howd");g.setAttribute("aria-label","The four parts of the studio: press one for more");dt.id="csHowD";dt.setAttribute("role","region");
  P.body.appendChild(g);P.body.appendChild(dt);howCards(g);P.body.appendChild(h("p","c-note c-pad",esc(modelReady()?"Writing with "+modelName()+", the model Lector uses, "+whereLine()+". Nothing is searched online unless you press for it.":"No model is ready on this device yet: the studio keeps and tracks without one, and reads and writes once one is ready (Models page). Nothing is searched online unless you press for it.")));
  P.foot.appendChild(cbtn("","Open your profile",function(){CS().ui.room="profile";save();render();}));var ckey=cloudKey();if(ckey)P.foot.appendChild(ckey);P.foot.appendChild(h("span","c-grow"));
  P.foot.appendChild(cbtn("pri","Bring a posting",function(){CS().ui.open="new";show("work");save();render();}));return P;}
/* 6.9.8: the link first (one paste fetches it and reads it against her profile); its text, or a file, as the other ways */
function newPanel(){var S=CS(),kind=JL.kind||"job",P=panel("csWork","Bring a posting, programme or grant",{back:"Applications",onBack:function(){jlClear();S.ui.open=null;show("list");save();render();}});
  var k0=seg(OKINDS,kind,function(v){kind=JL.kind=v;[].forEach.call(k0.children,function(b,i){b.setAttribute("aria-pressed",OKINDS[i][0]===v?"true":"false");});},"What it is");
  var box=h("div","c-col c-fill");box.appendChild(k0);
  box.appendChild(linkRow(function(){return kind;},JL.busy?JL.url:(JL.err&&JL.err.url)||"",true));
  if(JL.busy)box.appendChild(h("p","c-status","<i class=\"c-spin\" aria-hidden=\"true\"></i>"+esc("Fetching the posting from "+jlHost(JL.url)+"…")));
  else if(!JL.err)box.appendChild(h("p","c-note",esc("Paste the link and Ingenium fetches the posting, keeps its text on this device, and reads it against your profile at once. Only this uses the internet, and only when you paste or press.")));
  if(JL.err){var al=h("div","c-alert");al.setAttribute("role","alert");al.appendChild(h("p",null,esc(JL.err.text)));
    if(JL.err.elsewhere&&typeof webSearch==="function"){var hint=JL.hint||{},q=input("text",[hint.title,hint.org].filter(Boolean).join(" "),"Its title and who offers it");q.setAttribute("aria-label","The post's title and who offers it");
      var er=h("div","c-link");er.appendChild(q);er.appendChild(cbtn("sm","Look for it elsewhere",function(){jlElsewhere(q.value);},"Searches the internet for the same post on the employer's own site, only now"));
      q.addEventListener("keydown",function(e){if(e.key==="Enter"){e.preventDefault();jlElsewhere(q.value);}});al.appendChild(er);}
    box.appendChild(al);}
  if(JL.found){var fd=h("div","c-found");fd.appendChild(h("h3","c-h3",esc(JL.found.busy?"Looking for “"+JL.found.q+"”…":"Found for “"+JL.found.q+"”")));
    if(!JL.found.busy){if(!JL.found.rs.length)fd.appendChild(h("p","c-note",esc(JL.found.err?"The search did not work: "+JL.found.err:"Nothing that looks like it was found. Paste its text below.")));
      var ul=h("ul");JL.found.rs.forEach(function(x){var li=h("li"),a=h("a");a.href=x.url;a.target="_blank";a.rel="noopener noreferrer";a.textContent=String(x.title||x.url).slice(0,160);li.appendChild(a);
        li.appendChild(h("small",null,esc(jlHost(x.url))));li.appendChild(cbtn("sm","This is it: fetch and read it",function(){fetchPosting(x.url,kind);}));ul.appendChild(li);});fd.appendChild(ul);
      if(JL.found.rs.length)fd.appendChild(h("p","c-note",esc("Open one to be sure it is the same post before you choose it.")));}
    box.appendChild(fd);}
  box.appendChild(h("div","c-or",esc("or paste its text")));
  var ta=h("textarea","c-ta c-grow");ta.id="csPaste";ta.setAttribute("aria-label","The posting's text");ta.placeholder="Paste the whole posting here: its title, who offers it, what it asks for, how to apply and when it closes.";box.appendChild(ta);P.body.appendChild(box);
  if(JL.focus==="paste"){JL.focus="";setTimeout(function(){try{ta.focus({preventScroll:true});}catch(e){}},60);}
  P.foot.appendChild(cbtn("","Choose a file",function(){pickFile(".docx,.pdf,.txt,.md,.html,.htm,.rtf",false,function(fs){readFile(fs[0]).then(function(t){if(t.length<120){say("That file holds too little text to be a posting.");return;}return newOpp(kind,t,fs[0].name).then(function(o){o.kindSet=kind!=="job";jlLinked(o);jlClear();save();readNow(o);});},function(e){say("It could not be read: "+(e&&e.message||e));});});}));
  P.foot.appendChild(h("span","c-grow"));P.foot.appendChild(cbtn("","Cancel",function(){jlClear();S.ui.open=null;show("list");save();render();}));
  P.foot.appendChild(cbtn("pri","Keep and read it",function(){var t=ta.value.replace(/\r/g,"").trim();if(jlNorm(t)){fetchPosting(t,kind);return;}
    if(t.length<120){say("That is too short to be a posting. Paste the whole of it, or its link above.");return;}
    newOpp(kind,t,"pasted").then(function(o){o.kindSet=kind!=="job";jlLinked(o);jlClear();save();readNow(o);});},"Keeps the text on this device and reads it against your profile"));return P;}
function oppPanel(o){var S=CS(),step=o.step||(o.read?"fit":"post"),band=o.read&&bandOf(o.read.r);
  var P=panel("csWork",o.title||"Untitled",{back:"Applications",onBack:function(){show("list");save();render();},chip:band?chip(band.word,"c-band-"+band.band):null});
  var bar=h("ol","c-steps");bar.setAttribute("aria-label","The steps of this application");
  STEPS.forEach(function(s,i){if(i)bar.appendChild(h("li","sep"));var li=h("li"),b=h("button");b.type="button";b.innerHTML="<i>"+(stepDone(o,s[0])&&s[0]!==step?"✓":i+1)+"</i><span>"+esc(s[1])+"</span>";
    if(s[0]===step){li.className="now";b.setAttribute("aria-current","step");}else if(stepDone(o,s[0]))li.className="done";b.addEventListener("click",function(){goStep(o,s[0]);});li.appendChild(b);bar.appendChild(li);});
  P.el.insertBefore(bar,P.body);
  ({post:stepPost,fit:stepFit,check:stepCheck,send:stepSend,practise:stepPractise,track:stepTrack}[step]||stepPost)(o,P);return P;}
function stepPost(o,P){var box=h("div","c-col c-fill"),g=h("div","c-grid3"),ti=input("text",o.title),or=input("text",o.org),kd=select(OKINDS,o.kind);
  ti.addEventListener("change",function(){o.title=ti.value.trim();o.titleSet=true;save();render();});or.addEventListener("change",function(){o.org=or.value.trim();o.orgSet=true;save();});kd.addEventListener("change",function(){o.kind=kd.value;o.kindSet=true;save();});
  g.appendChild(field("Title",ti));g.appendChild(field("Organisation",or));g.appendChild(field("What it is",kd));box.appendChild(g);
  var url=urlOf(o),meta=[dueWords(o),url?"Fetched from its address"+(o.fetchedAt?" on "+dayStr(o.fetchedAt):"")+(o.checkedAt?", checked again "+dayStr(o.checkedAt):""):o.from&&o.from!=="pasted"&&!/^lector:/.test(o.from)?"From "+o.from:/^lector:/.test(o.from||"")?"From Lector's brief":"Pasted","Added "+dayStr(o.at)].filter(Boolean).join(" · ");
  box.appendChild(h("p","c-note",esc(meta)));
  /* 6.9.2: the posting fetched again and compared, sentence by sentence; and the further particulars read with it */
  if(o.recheck)box.appendChild(recheckBox(o));
  var tx=h("div","c-well c-text c-grow");tx.setAttribute("tabindex","0");tx.setAttribute("aria-label","The posting");tx.textContent="…";postOnly(o).then(function(t){tx.textContent=t||"(its text is no longer kept)";});box.appendChild(tx);
  box.appendChild(moreBox(o));
  if(o.web&&o.web.results&&o.web.results.length){var wd=fold("web:"+o.id,"Found online for “"+o.web.q+"”, "+dayStr(o.web.at)+" ("+o.web.results.length+")");wd.classList.add("c-web");var ul=h("ul");
    o.web.results.forEach(function(x){var li=h("li"),a=h("a");a.href=x.url;a.target="_blank";a.rel="noopener noreferrer";a.textContent=x.title;li.appendChild(a);
      if((o.reading||[]).some(function(r){return r.url===x.url;}))li.appendChild(chip("On your reading list","c-ok"));else li.appendChild(cbtn("sm","Keep to read",function(){keepToRead(o,{title:x.title,url:x.url,kind:"other"});},"Kept in the reading list of this application (What you send)"));
      if(x.snippet)li.appendChild(h("div","c-note",esc(x.snippet)));ul.appendChild(li);});
    wd.appendChild(ul);wd.appendChild(h("p","c-note",esc("For you to read. The studio does not write from what was found online.")));box.appendChild(wd);}
  P.body.appendChild(box);
  P.foot.appendChild(cbtn("","Add a document",function(){pickFile(".docx,.pdf,.txt,.md,.html,.htm,.rtf",true,function(fs){var q=Promise.resolve();fs.forEach(function(f){q=q.then(function(){return readFile(f).then(function(t){return addMore(o,f.name,t);},function(e){say(f.name+" could not be read: "+(e&&e.message||e));});});});});},"Further particulars, a handbook or the person specification, read with the posting by the reading, the limits and the checklist"));
  if(url)P.foot.appendChild(cbtn("","Check it again",function(){checkAgain(o);},"Fetches the posting again from its address, only now, and shows each sentence that changed"));
  P.foot.appendChild(cbtn("","Look it up online",function(){lookUp(o);},"Searches the internet for the organisation and the post, only now"));P.foot.appendChild(h("span","c-grow"));
  P.foot.appendChild(o.read?cbtn("pri","Next: how you fit",function(){goStep(o,"fit");}):cbtn("pri","Read it against my profile",function(){o.step="fit";readOpp(o);}));}
function stepFit(o,P){var r=o.read&&o.read.r,b=r&&bandOf(r);
  if(!b){P.body.appendChild(empty("Not read yet","The studio reads it against your profile as an admissions tutor or a recruiter would: how it matches what you are looking for; each criterion it asks for, shown, transferring from your other work, partly shown or not shown, with the entry it rests on and the link to make; what kind each gap is; and a band with its reasons and what to do next. You see the model's reasoning as it works."));
    P.foot.appendChild(h("span","c-grow"));P.foot.appendChild(cbtn("pri","Read it against my profile",function(){readOpp(o);}));return;}
  var cols=h("div","c-cols"),a=h("div","c-col"),z=h("div","c-col");
  var band=h("div","c-bandcard");band.setAttribute("data-band",b.band);band.appendChild(h("h3",null,esc(b.word)));
  if(r.view)band.appendChild(h("p","c-view","<b>How a reader would see it.</b> "+esc(r.view)));
  b.why.forEach(function(w){band.appendChild(h("p",null,esc(w)));});
  band.appendChild(h("p","c-advice","<b>Advice.</b> "+esc(b.advice)));a.appendChild(band);
  if(o.read.how!==6.22&&!(o.read.r.crit||[]).some(function(x){return x.st==="transfer"||x.src;}))a.appendChild(h("p","c-note c-old",esc("This reading was made before 6.22, which credits experience that transfers from your other work. Read it again for the fuller reading.")));
  if(r.lead&&r.lead.length){a.appendChild(h("h3","c-h3",esc("What to lead with")));var lo=h("ol","c-lead");r.lead.forEach(function(x){lo.appendChild(h("li",null,"<b>"+esc(x.title)+"</b>"+(x.why?"<span>"+esc(x.why)+"</span>":"")));});a.appendChild(lo);
    a.appendChild(h("p","c-note",esc("Entries of your profile that answer this posting best: put them first in your CV and in your letter for it.")));}
  var asks=r.crit.filter(function(x){return x.st==="none"&&x.gap==="ask";}),learn=r.crit.filter(function(x){return (x.st==="none"||x.st==="partly")&&x.gap==="learn";}),hard=r.crit.filter(function(x){return x.st!=="met"&&x.st!=="transfer"&&x.gap==="hard";});
  if(asks.length){a.appendChild(h("h3","c-h3",esc("Waiting on you")));a.appendChild(h("p","c-note",esc("Your profile does not say these. If you have done them, add them to Your entries and read it again; the band can only rise.")));
    var ua=h("ul","c-gaps");asks.forEach(function(x){ua.appendChild(h("li",null,"<b>"+esc(x.text)+"</b>"+(x.close?"<span>"+esc(x.close)+"</span>":"")));});a.appendChild(ua);
    a.appendChild(cbtn("sm","Add to my profile",function(){var S=CS();S.ui.room="profile";S.ui.ppart="items";show("work");save();render();},"Opens Your entries"));}
  if(learn.length){a.appendChild(h("h3","c-h3",esc("Gaps you could close")));var ul2=h("ul","c-gaps");learn.forEach(function(x){ul2.appendChild(h("li",null,"<b>"+esc(x.text)+"</b>"+(x.close?"<span>"+esc(x.close)+"</span>":"")));});a.appendChild(ul2);}
  if(hard.length){a.appendChild(h("h3","c-h3",esc("Formal requirements not shown")));var ul3=h("ul","c-gaps c-hard");hard.forEach(function(x){ul3.appendChild(h("li",null,"<b>"+esc(x.text)+"</b>"+(x.close?"<span>"+esc(x.close)+"</span>":"")));});a.appendChild(ul3);}
  if(r.strengths.length||r.concerns.length){var ul=h("ul","c-pc");r.strengths.forEach(function(s){ul.appendChild(h("li","for","<b>For</b> "+esc(s)));});r.concerns.forEach(function(s){ul.appendChild(h("li","against","<b>Against</b> "+esc(s)));});a.appendChild(ul);}
  if(r.next.length||r.asks.length){a.appendChild(h("h3","c-h3",esc("Next")));var ol=h("ol","c-next");r.next.forEach(function(s){ol.appendChild(h("li",null,esc(s)));});r.asks.forEach(function(s){ol.appendChild(h("li",null,"Ask the contact: "+esc(s)));});a.appendChild(ol);}
  if(o.read.think){var fr=fold("think-"+o.id,"How the model reasoned");var pre=h("div","c-think-b");pre.textContent=o.read.think;fr.appendChild(pre);fr.classList.add("c-think");a.appendChild(fr);}
  a.appendChild(h("p","c-note",esc(b.rule)));
  if(r.wants&&r.wants.length){z.appendChild(h("h3","c-h3",esc("Against what you are looking for")));var wt=h("table","c-tab");wt.innerHTML="<thead><tr><th>You are looking for</th><th>Here</th><th>What it offers</th></tr></thead>";var wb=h("tbody");
    r.wants.forEach(function(x){var tr=h("tr");tr.innerHTML="<td>"+esc(x.text)+"</td><td><span class=\"c-st\" data-st=\""+(x.st==="unsaid"?"partly":x.st)+"\">"+{met:"Matches",partly:"Partly",none:"Does not match",unsaid:"Not said"}[x.st]+"</span></td><td>"+esc(x.offer||"")+"</td>";wb.appendChild(tr);});wt.appendChild(wb);z.appendChild(wt);}
  else if(!wantsText())z.appendChild(h("p","c-note",esc("Say what you are looking for in Your profile, and the next reading says first how each opportunity matches it.")));
  z.appendChild(h("h3","c-h3",esc("What it asks")));var t=h("table","c-tab");t.innerHTML="<thead><tr><th>Criterion</th><th>Judged</th><th>From your record</th></tr></thead>";var tb=h("tbody");
  r.crit.forEach(function(x){var tr=h("tr");if(x.st==="transfer")tr.className="c-tr";
    tr.innerHTML="<td>"+esc(x.text)+"<small>"+(x.ess?"Essential":"Desirable")+"</small></td><td>"+stChip(x)+"</td><td>"+(x.src?"<b class=\"c-from\">"+esc(x.src)+"</b>":"")+(x.st==="transfer"&&x.ev?"<span class=\"c-bridge\"><i>The link to make:</i> "+esc(x.ev)+"</span>":esc(x.ev||""))+
    ((x.st==="partly"||x.st==="none")&&x.close?"<small class=\"c-close\">"+esc(x.close)+"</small>":"")+
    (x.vet?"<small class=\"c-vet\" data-v=\""+x.vet+"\">"+esc({found:"In your profile",check:"The entry is in your profile: check that it shows this",near:"Close to your profile's words",missing:"Not found in your profile"+(x.was?": counted as partly shown until you check it":": check it")}[x.vet])+"</small>":"")+"</td>";tb.appendChild(tr);});t.appendChild(tb);z.appendChild(t);
  if(r.crit.some(function(x){return x.vet;}))z.appendChild(h("p","c-note",esc("Each piece of evidence was looked for in your profile itself: first the entry it names, then its words. Where neither was found, a “shown” or a “transfers” counts only as partly shown until you check it: add the evidence to your profile, or read it again.")));
  z.appendChild(h("p","c-note",esc("Read on "+dayStr(o.read.at)+" with "+(window.ingPrettyModels||String)(o.read.model||"your model")+". The band follows from these judgements, made from your profile alone; it is not a probability.")));
  cols.appendChild(a);cols.appendChild(z);P.body.appendChild(cols);
  P.foot.appendChild(cbtn("","Read it again",function(){readOpp(o);}));P.foot.appendChild(h("span","c-grow"));P.foot.appendChild(cbtn("pri","Next: its checklist",function(){goStep(o,"check");}));}
/* what you send: the documents on the left, the one chosen on the right, its keys at the foot */
function sendView(o){var v=o.sv;if(v&&v.kind==="email"&&!o.emails.some(function(e){return e.id===v.id;}))v=null;if(v)return v;var k0=(FOR[o.kind]||FOR.other).filter(function(k){return o.docs[k];})[0];return {kind:k0||(FOR[o.kind]||FOR.other)[0]};}
function setView(o,v){o.sv=v;o.edit=false;o.improve=false;o.tab="doc";save();render();}
function stepSend(o,P){var v=sendView(o),split=h("div","c-split"),nav=h("div","c-nav"),pane=h("div","c-pane");
  nav.appendChild(h("div","c-label",esc("Documents")));
  var kinds=(FOR[o.kind]||FOR.other).slice();Object.keys(o.docs).forEach(function(k){if(kinds.indexOf(k)<0)kinds.push(k);});
  kinds.forEach(function(k){var d=o.docs[k];nav.appendChild(item(DOCS[k][0],d?(d.mine?"Your version":"Written")+", "+dayStr(d.made):"Not written yet",v.kind===k,function(){setView(o,{kind:k});},d?"c-has":""));});
  var more=Object.keys(DOCS).filter(function(x){return kinds.indexOf(x)<0;});
  if(more.length){var sel=select([["","Another document…"]].concat(more.map(function(x){return [x,DOCS[x][0]];})),"");sel.setAttribute("aria-label","Another document");sel.className="c-sel";sel.addEventListener("change",function(){if(sel.value)setView(o,{kind:sel.value});});nav.appendChild(sel);}
  nav.appendChild(h("div","c-label",esc("Emails")));
  o.emails.forEach(function(e){var rl=(ROLES.filter(function(x){return x[0]===e.role;})[0]||["",""])[1],pu=(PURPOSES.filter(function(x){return x[0]===e.purpose;})[0]||["",""])[1].replace(/^To /,"");
    nav.appendChild(item(rl,pu.charAt(0).toUpperCase()+pu.slice(1),v.kind==="email"&&v.id===e.id,function(){setView(o,{kind:"email",id:e.id});},"c-has"));});
  nav.appendChild(item("+ A new email","To a supervisor, a referee, a mentor, a hiring manager or a recruiter",v.kind==="emailnew",function(){setView(o,{kind:"emailnew"});}));
  nav.appendChild(h("div","c-label",esc("Your own")));nav.appendChild(item("Write it yourself","Your draft, looked at with you",v.kind==="mine",function(){setView(o,{kind:"mine"});}));
  /* 6.9.2: who will speak for her, and what to read for it */
  var rf=o.refs||[],rl=o.reading||[];nav.appendChild(h("div","c-label",esc("With it")));
  nav.appendChild(item("Your referees",rf.length?rf.length+" · "+rf.filter(function(r){return r.status!=="toask";}).length+" asked":"Who will speak for you",v.kind==="refs",function(){setView(o,{kind:"refs"});},rf.length?"c-has":""));
  nav.appendChild(item("Your reading list",rl.length?rl.length+" piece"+(rl.length===1?"":"s")+" · "+rl.filter(function(r){return r.status==="read";}).length+" read":"What to read for it",v.kind==="reading",function(){setView(o,{kind:"reading"});},rl.length?"c-has":""));
  split.appendChild(nav);split.appendChild(pane);P.body.appendChild(split);
  if(v.kind==="emailnew")return newEmail(o,pane,P);if(v.kind==="mine")return mineView(o,pane,P);if(v.kind==="refs")return refsPane(o,pane,P);if(v.kind==="reading")return readingPane(o,pane,P);
  var rec=docRec(o,v);if(!rec)return unwritten(o,v.kind,pane,P);if(o.review&&o.review.kind===v.kind&&v.kind!=="email")return reviewPane(o,v,rec,pane,P);return docPane(o,v,rec,pane,P);}
function unwritten(o,kind,pane,P){var w=wayOf(o),pl=o.plan&&o.plan[kind],gd=o.guide&&o.guide[kind];
  var e=empty(DOCS[kind][0],DOCS[kind][1]+(w==="guide"?" You write it yourself, with a guide to its parts and what your profile holds for each.":" Written from your profile and the posting, then read a second time against your profile; what your profile does not give is left in square brackets for you."));pane.appendChild(e);
  var how=lessonFor(kind,null);if(how){var d=fold("how:"+how[0],"How it is built");var ol=h("ol","c-lesson-ol");how[1].forEach(function(s){ol.appendChild(h("li",null,esc(s)));});d.appendChild(ol);pane.appendChild(d);}
  wayBar(o,pane);if(kind==="cv"||kind==="cover"||kind==="portfolio")tplBar(o,pane);
  if(w==="step"&&pl){pane.appendChild(h("h3","c-h3",esc("The plan, part by part")));pane.appendChild(h("p","c-note",esc("Change any line, take one out, or add one. The writing follows this plan, in its order.")));
    var ta=h("textarea","c-ta c-plan");ta.value=pl.text;ta.setAttribute("aria-label","The plan, one part to a line");ta.addEventListener("change",function(){pl.text=ta.value.trim();save();});pane.appendChild(ta);
    P.foot.appendChild(cbtn("","Plan it again",function(){planDoc(o,kind);}));P.foot.appendChild(h("span","c-grow"));
    P.foot.appendChild(cbtn("pri","Write it from this plan",function(){var t=ta.value.trim();if(t.length<10){say("The plan is empty: write a part to a line, or plan it again.");return;}pl.text=t;pl.use=true;save();writeDoc(o,kind);}));return;}
  if(w==="guide"){P.foot.appendChild(h("span","c-grow"));
    if(gd)P.foot.appendChild(cbtn("","Make a new guide",function(){guideDoc(o,kind);}));
    P.foot.appendChild(cbtn("pri",gd?"Open my guide and write":"Guide me to write it",function(){if(gd){o.mineKind=kind;setView(o,{kind:"mine"});}else guideDoc(o,kind);}));return;}
  P.foot.appendChild(cbtn("","Write it yourself",function(){o.mineKind=kind;setView(o,{kind:"mine"});}));P.foot.appendChild(h("span","c-grow"));
  if(w==="step")P.foot.appendChild(cbtn("pri","Plan it with me",function(){planDoc(o,kind);},"A plan first, part by part, for you to approve or change"));
  else P.foot.appendChild(cbtn("pri","Write the "+docWord(kind),function(){writeDoc(o,kind);}));}
function lessonFor(kind,rec){if(kind==="portfolio")return LESSONS.filter(function(L){return L[0]==="A portfolio for an application";})[0]||null;var lk=kind==="email"?(rec&&rec.role==="supervisor"?"Writing to a prospective supervisor":rec&&rec.purpose==="reference"?"Asking for a reference":""):{cv:"A CV for an application",cover:"A cover letter",supporting:"A supporting statement",statement:"A personal statement for a PhD or DPhil",proposal:"A research proposal",purpose:"A statement of purpose",teaching:"A teaching statement",funding:"A funding application",sample:"Choosing a writing sample"}[kind];
  return LESSONS.filter(function(L){return L[0]===lk;})[0]||null;}
function docPane(o,v,rec,pane,P){var kind=v.kind,isMail=kind==="email",how=lessonFor(kind,rec),tab=o.tab==="how"&&how?"how":"doc";
  var top=h("div","c-row c-tight");top.appendChild(h("h3","c-h3",esc(isMail?"The email":DOCS[kind][0])));
  if(how)top.appendChild(seg([["doc",isMail?"The email":"The document"],["how","How it is built"]],tab,function(x){o.tab=x;save();render();},"Show"));pane.appendChild(top);
  if(!isMail&&!rec.mine)wayBar(o,pane);
  var ck=rec.chk||{},notes=[];if(ck.figures&&ck.figures.length)notes.push("Figures to check, not found in your profile or the posting: "+ck.figures.join(", ")+".");
  if(ck.fills)notes.push(ck.fills+" place"+(ck.fills>1?"s are":" is")+" left for you to fill, in square brackets.");if(ck.style)notes.push(ck.style.trim());
  if(ck.exam!=null&&!isMail&&!rec.mine)notes.push(ck.exam?Math.round(ck.exam*100)+"% of the words were changed in the examiner's pass, which holds every claim to your profile and every figure to what it gives.":"The examiner's pass left the draft as it was.");
  notes.push(rec.mine?"Your own version, kept on "+dayStr(rec.made)+".":"Written on "+dayStr(rec.made)+" with "+(window.ingPrettyModels||String)(rec.model||"your model")+".");pane.appendChild(h("p","c-note c-checks",esc(notes.join(" "))));
  var info=h("div","c-col");info.style.gap="6px";pane.appendChild(info);
  var area=h("div","c-area c-grow");pane.appendChild(area);
  if(tab==="how"){var ol=h("ol","c-lesson-ol");how[1].forEach(function(s){ol.appendChild(h("li",null,esc(s)));});area.appendChild(ol);}
  Promise.all([loadText(rec.ref),postText(o)]).then(function(xx){var md=xx[0],post=xx[1];
    /* 6.8.5: its length against any limit the posting sets, and the criteria it speaks to */
    var n=wordCount(md),lim=isMail?null:limitFor(post,kind),over=lim&&lim.words&&n>lim.words,cnt=h("p","c-note c-count"),old=olderOf(o,v,rec);
    cnt.innerHTML="<b>"+n+" words</b>"+(lim?(lim.words?(over?", <span class=\"c-over\">"+(n-lim.words)+" over the posting's limit of "+lim.words+"</span>":", within the posting's limit of "+lim.words):", and the posting allows "+lim.pages+" page"+(lim.pages>1?"s":"")):"")+(rec.note?". Last improved: “"+esc(rec.note.length>90?rec.note.slice(0,87)+"…":rec.note)+"”":"")+".";
    if(old.length){var ob=cbtn("quiet","The version before",function(){earlier(o,v,rec);},"Bring back the version before this one; this one is kept");ob.classList.add("sm");cnt.appendChild(document.createTextNode(" "));cnt.appendChild(ob);}
    info.appendChild(cnt);
    var cov=(!isMail&&kind!=="proposal"&&kind!=="sample"&&o.read&&o.read.r)?coverage(md,o.read.r.crit):null;
    if(cov){var cv=h("div","c-cover");cv.innerHTML="<span>It speaks to <b>"+cov.n+" of "+cov.of+"</b> criteria, by their own words: a guide, not a judgement.</span>"+(cov.missEss.length?"<span>Essential, not found in it: "+esc(cov.missEss.join("; "))+".</span>":"");info.appendChild(cv);}
    if(o.improve&&!o.edit){var box=h("div","c-improve"),ta=h("textarea","c-ta");ta.setAttribute("aria-label","What should change");ta.placeholder="What should change? For example: shorter, warmer, lead with my teaching, make the second paragraph about the archive project.";
      var tunes=h("div","c-tunes");tunes.setAttribute("role","group");tunes.setAttribute("aria-label","Quick choices");
      var add=function(t){ta.value=(ta.value.trim()?ta.value.trim()+" ":"")+t;ta.focus();};
      TUNE.forEach(function(t){tunes.appendChild(cbtn("sm",t[0],function(){add(t[1]);}));});
      if(over)tunes.appendChild(cbtn("sm","Within the limit",function(){add("Bring it within the posting's limit of "+lim.words+" words.");}));
      if(cov&&cov.missEss.length)tunes.appendChild(cbtn("sm","The missing criteria",function(){add("Speak to these essential criteria, with evidence from my profile only, or leave a place in square brackets where my profile is silent: "+cov.missEss.join("; ")+".");}));
      box.appendChild(h("p","c-note",esc("Say what should change, or press the quick choices. It is rewritten from your profile and read a second time against it; the version before is kept."+(!isMail&&wayOf(o)==="step"?" Each change then waits for you, one by one.":""))));box.appendChild(tunes);box.appendChild(ta);info.appendChild(box);
      P.foot.innerHTML="";P.foot.appendChild(h("span","c-grow"));P.foot.appendChild(cbtn("","Cancel",function(){o.improve=false;save();render();}));
      P.foot.appendChild(cbtn("pri","Improve it",function(){reviseDoc(o,v,rec,ta.value);}));setTimeout(function(){try{ta.focus({preventScroll:true});}catch(e){}},0);}
    if(o.edit){var ta=h("textarea","c-ta c-mono c-grow");ta.value=md;ta.setAttribute("aria-label","The text, to change");area.innerHTML="";area.appendChild(ta);P.foot.innerHTML="";P.foot.appendChild(h("span","c-grow"));
      P.foot.appendChild(cbtn("","Cancel",function(){o.edit=false;render();}));P.foot.appendChild(cbtn("pri","Keep my changes",function(){var t=ta.value.trim();if(!t)return;var ref=IngBig.newId();Promise.resolve(IngBig.put(ref,t)).then(function(){try{IngBig.del(rec.ref);}catch(e){}rec.ref=ref;rec.edited=Date.now();o.edit=false;save();render();say("Your changes are kept.");});}));ta.focus();return;}
    if(tab==="doc"){if(isMail){var m=h("div","c-well c-mail");m.textContent=md;area.appendChild(m);}
      else{var pp=paperOf(o,kind,md),f=h("iframe","c-paper");f.title=DOCS[kind][0];f.setAttribute("sandbox","allow-same-origin");f.srcdoc=W.IngLectorPaper?IngLectorPaper.page(pp.kind,md,pp.o):"<pre>"+esc(md)+"</pre>";area.appendChild(f);}}
    if(o.improve&&!o.edit)return;
    /* her own version is never rewritten for her: it is looked at with her (Write it yourself) */
    if(!rec.mine&&!isMail&&wayOf(o)==="guide")P.foot.appendChild(cbtn("","Look at it with me",function(){lookWithMe(o,kind,md);},"It is looked at with you, and you change it yourself"));
    else if(!rec.mine)P.foot.appendChild(cbtn("","Improve it",function(){o.improve=true;o.edit=false;save();render();},wayOf(o)==="step"&&!isMail?"Say what should change; each change then waits for you":"Say what should change, and it is rewritten"));
    P.foot.appendChild(cbtn("","Change it",function(){o.edit=true;o.improve=false;render();}));P.foot.appendChild(cbtn("","Copy the text",function(){copyText(md);}));
    P.foot.appendChild(cbtn("","Write it again",function(){if(isMail)writeDoc(o,"email",{role:rec.role,purpose:rec.purpose});else writeDoc(o,kind);}));P.foot.appendChild(h("span","c-grow"));
    if(!isMail){P.foot.appendChild(cbtn("","Open in Tabula",function(){openInTabula(o,kind);},"Open it in Tabula, as the Word file Save as Word gives, to keep writing it there"));P.foot.appendChild(cbtn("","Save as PDF",function(){savePaper(o,kind,"pdf");}));P.foot.appendChild(cbtn("pri","Save as Word",function(){savePaper(o,kind,"docx");}));}});}
function newEmail(o,pane,P){pane.appendChild(h("h3","c-h3",esc("A new email")));var g=h("div","c-grid2"),rs=select(ROLES,o.kind==="phd"?"supervisor":"contact"),ps=select(PURPOSES,o.kind==="phd"?"introduce":"enquire"),ex=h("textarea","c-ta");
  ex.placeholder="Anything to add (optional): a name, a date, something they said.";ex.style.minHeight="90px";g.appendChild(field("To",rs));g.appendChild(field("What for",ps));pane.appendChild(g);pane.appendChild(field("Also",ex));
  var how=lessonFor("email",{role:rs.value,purpose:ps.value});var note=h("p","c-note",esc("Written from your profile and the posting: courteous, direct and specific, with one clear request."));pane.appendChild(note);
  P.foot.appendChild(h("span","c-grow"));P.foot.appendChild(cbtn("pri","Write the email",function(){writeDoc(o,"email",{role:rs.value,purpose:ps.value,extra:ex.value.trim()});}));}
function mineView(o,pane,P){var kinds=Object.keys(DOCS),ks=o.mineKind&&DOCS[o.mineKind]?o.mineKind:(FOR[o.kind]||FOR.other)[0],m=(o.mine||{})[ks];
  var top=h("div","c-row c-tight");top.appendChild(h("h3","c-h3",esc("Your own draft")));var sel=select(kinds.map(function(k){return [k,DOCS[k][0]];}),ks);sel.className="c-sel";sel.setAttribute("aria-label","Which document");
  sel.addEventListener("change",function(){o.mineKind=sel.value;save();render();});top.appendChild(sel);pane.appendChild(top);
  pane.appendChild(h("p","c-note",esc("Write it yourself, or paste a draft you have written. It is looked at with you: what works, what is missing, what your profile does not support. It is never rewritten for you.")));
  if(o.guide&&o.guide[ks]){var gf=fold("guide:"+o.id+":"+ks,"Your guide to writing it",true),gw=h("div","c-well c-guide");try{gw.innerHTML=typeof W.chatMd==="function"?W.chatMd(o.guide[ks].text):esc(o.guide[ks].text);}catch(e){gw.textContent=o.guide[ks].text;}gf.appendChild(gw);pane.appendChild(gf);}
  var row=h("div","c-mine c-grow"),ta=h("textarea","c-ta c-grow");ta.setAttribute("aria-label","Your draft");ta.placeholder="Your draft.";ta.value=m?m.text:"";row.appendChild(ta);
  if(m&&m.fb){var b=h("div","c-fb c-fbside"),Lb={WORKS:"What works",MISSING:"What is missing",UNSUPPORTED:"Not supported by your profile",WORDING:"Wording to look at",NEXT:"First, do this",RAW:"What it said"};
    Object.keys(Lb).forEach(function(k){if(m.fb[k])m.fb[k].forEach(function(x){b.appendChild(h("div",null,"<b>"+esc(Lb[k])+":</b> "+esc(x)));});});row.appendChild(b);}
  pane.appendChild(row);
  P.foot.appendChild(cbtn("","Keep it as my version",function(){var t=ta.value.trim();if(t.length<40){say("Write your draft first.");return;}var ref=IngBig.newId(),kind=sel.value;o.mine=o.mine||{};o.mine[kind]=Object.assign(o.mine[kind]||{},{text:t,at:Date.now()});
    Promise.resolve(IngBig.put(ref,t)).then(function(){var old=o.docs[kind];if(old){o.older[kind]=[old].concat(o.older[kind]||[]);}o.docs[kind]={ref:ref,made:Date.now(),model:"you",mine:true,chk:{figures:[],fills:(t.match(/\[[^\]\n]{2,160}\]/g)||[]).length}};o.sv={kind:kind};save();render();say("Your version is kept: save it as Word or PDF from here.");});}));
  P.foot.appendChild(h("span","c-grow"));P.foot.appendChild(cbtn("pri","Look at it with me",function(){o.mineKind=sel.value;reviewMine(o,sel.value,ta.value);}));}
function stepPractise(o,P){var r=o.read&&o.read.r;
  if(!r||!r.crit.length){P.body.appendChild(empty("Read it first","The criteria to practise come from the reading of this opportunity against your profile."));P.foot.appendChild(h("span","c-grow"));P.foot.appendChild(cbtn("pri","Read it against my profile",function(){readOpp(o);}));return;}
  var tab=o.ptab||"evidence",top=h("div","c-row c-tight c-pad");top.appendChild(seg([["evidence","Your evidence"],["interview","Interview questions"]],tab,function(x){o.ptab=x;save();render();},"Practise"));
  top.appendChild(h("span","c-note",esc(tab==="evidence"?"A moment for each criterion: the situation, what you did yourself, what came of it.":"Your answers, as you would say them.")));P.body.appendChild(top);
  var split=h("div","c-split"),nav=h("div","c-nav"),pane=h("div","c-pane");split.appendChild(nav);split.appendChild(pane);P.body.appendChild(split);
  if(tab==="evidence"){var crit=r.crit.filter(function(x){return x.ess;}).concat(r.crit.filter(function(x){return !x.ess;})),cur=o.csel!=null&&r.crit[o.csel]?r.crit[o.csel]:crit[0],key="c"+r.crit.indexOf(cur);
    crit.forEach(function(x){var k="c"+r.crit.indexOf(x),s=o.practice.crit[k]||{};var b=item(x.text,(x.ess?"Essential":"Desirable")+" · "+{met:"shown",partly:"partly shown",none:"not shown"}[x.st]+(s.fb?" · looked at":s.answer?" · written":""),x===cur,function(){o.csel=r.crit.indexOf(x);save();render();},"c-dot-"+x.st);nav.appendChild(b);});
    var slot=o.practice.crit[key]||{};pane.appendChild(h("h3","c-h3",esc(cur.text)));pane.appendChild(h("p","c-note",esc((cur.ess?"Essential":"Desirable")+". In your profile: "+{met:"shown",partly:"partly shown",none:"not shown"}[cur.st]+(cur.ev?" ("+cur.ev+")":"")+".")));
    var ta=h("textarea","c-ta c-grow");ta.setAttribute("aria-label","Your evidence for this criterion");ta.placeholder="A moment that shows it: the situation, what you did yourself, and what came of it.";ta.value=slot.answer||"";pane.appendChild(ta);if(slot.fb)pane.appendChild(fbBox(slot.fb));
    P.foot.appendChild(cbtn("","Keep it in my profile",function(){if(ta.value.trim().length<20){say("Write your evidence first.");return;}keepEvidence(o,cur.text,ta.value);}));P.foot.appendChild(h("span","c-grow"));
    P.foot.appendChild(cbtn("pri","Look at it with me",function(){look(o,key,cur.text,ta.value,false);}));return;}
  if(!o.practice.qs.length){pane.appendChild(empty("No questions yet","Eight questions a panel would be likely to ask, from what it asks for and from what your profile leaves open."));P.foot.appendChild(h("span","c-grow"));P.foot.appendChild(cbtn("pri","Choose questions to practise",function(){questions(o);}));return;}
  var q=o.practice.qs.filter(function(x){return x.id===o.qsel;})[0]||o.practice.qs[0];
  o.practice.qs.forEach(function(x,i){nav.appendChild(item((i+1)+". "+x.q,x.fb?"Looked at":x.answer?"Answered":"",x===q,function(){o.qsel=x.id;save();render();}));});
  pane.appendChild(h("h3","c-h3",esc(q.q)));mockBox(o,q,pane);var tq=h("textarea","c-ta c-grow");tq.setAttribute("aria-label","Your answer");tq.placeholder="Your answer, as you would say it.";tq.value=q.answer||"";pane.appendChild(tq);if(q.fb)pane.appendChild(fbBox(q.fb));
  P.foot.appendChild(cbtn("","New questions",function(){questions(o);}));P.foot.appendChild(h("span","c-grow"));P.foot.appendChild(cbtn("pri","Look at it with me",function(){look(o,q.id,q.q,tq.value,true);}));}
function stepTrack(o,P){var box=h("div","c-col c-fill"),g=h("div","c-grid3"),st=select(STAGES,o.stage),du=input("date",o.due||"");
  st.addEventListener("change",function(){o.stage=st.value;if(st.value==="interview"&&!o.interview)o.interview={};save();render();});du.addEventListener("change",function(){o.due=du.value;save();render();});
  g.appendChild(field("Where it stands",st));g.appendChild(field("Closing date",du));var n=daysLeft(o),big=h("div","c-days");big.innerHTML=n==null?"<b>—</b><span>No closing date set</span>":n<0?"<b>Closed</b><span>"+esc(dayStr(o.due))+"</span>":"<b>"+n+"</b><span>day"+(n===1?"":"s")+" left</span>";g.appendChild(big);box.appendChild(g);
  if(o.closes)box.appendChild(h("p","c-note",esc("The posting says: "+o.closes)));
  /* 6.9.2: its dates and their reminders, the referees in short, and the interview */
  box.appendChild(datesBox(o));
  var rf=o.refs||[],line=h("div","c-keyrow");line.appendChild(h("span","c-note c-grow",esc(rf.length?rf.length+" referee"+(rf.length===1?"":"s")+": "+rf.map(function(r){return r.name+" ("+rstat(r.status).toLowerCase()+")";}).join(", ")+".":"No referees yet.")));
  line.appendChild(cbtn("sm",rf.length?"Your referees":"Choose your referees",function(){o.step="send";setView(o,{kind:"refs"});}));box.appendChild(line);
  if(o.stage==="interview"||o.interview)box.appendChild(interviewCard(o));
  else{var ik=h("div","c-keyrow");ik.appendChild(cbtn("sm quiet","Add an interview",function(){o.interview={};save();render();},"Its day, time and place, and a list to prepare by"));box.appendChild(ik);}
  var nt=h("textarea","c-ta");nt.style.minHeight="110px";nt.placeholder="Your notes: who to ask, what to do next, what was said.";nt.value=o.notes||"";nt.setAttribute("aria-label","Your notes");nt.addEventListener("change",function(){o.notes=nt.value;save();});box.appendChild(field("Notes",nt));
  P.body.appendChild(box);P.foot.appendChild(cbtn("quiet c-danger","Remove this application",function(){ingConfirm("Remove "+(o.title||"this application")+" and what was written for it?",function(){removeOpp(o);},{danger:true});}));
  P.foot.appendChild(h("span","c-grow"));P.foot.appendChild(cbtn("","Export this application",function(){exportOpp(o);},"A folder of files: the posting, the reading, the checklist, each document as Word and as text, the emails, your practise and your notes"));}

/* ---------------- 6.8.12: at her pace (her words, 28 October 2026: "I want to be able to automate where I want and also
   meticulously review and do on my own at my own pace"; asked how, she chose a switch on each task, a calm Today view,
   requirement checklists, more PhD documents, and changes accepted one by one) ---------------- */
var WAYS2=[["auto","Do it for me"],["step","Step by step with me"],["guide","Guide me, I do it"]];
var WAYSAY={auto:"The studio writes it from your profile; you read it, improve it or change it.",
  step:"First a plan, for you to approve or change; then the writing. Each change you ask for afterwards waits for you, one by one.",
  guide:"A guide to write it yourself: its parts, questions to answer and what your profile holds for each. Nothing is written for you."};
function wayOf(o){var w=o&&o.way;if(WAYSAY[w])return w;w=CS().ui.way;return WAYSAY[w]?w:"step";}
function setWay(o,w){o.way=w;CS().ui.way=w;save();render();}
function wayBar(o,pane){var w=wayOf(o),r=h("div","c-way");r.appendChild(h("span","c-label",esc("How")));
  r.appendChild(seg(WAYS2,w,function(x){setWay(o,x);},"How the studio works on this"));r.appendChild(h("p","c-note",esc(WAYSAY[w])));pane.insertBefore(r,pane.firstChild);}
function docWord(kind){return DOCS[kind][0].replace(/^./,function(m){return m.toLowerCase();}).replace(/^tailored cv$/,"tailored CV");}
/* Step by step: a plan first, for her to approve or change; the writing then follows it */
function planDoc(o,kind){if(busyNow()||needModel())return;begin(o,"Planning the "+docWord(kind)+" with you");
  Promise.all([postText(o),gatherProfile({opp:o})]).then(function(x){var post=x[0],G=x[1];
    return ask(function(sc){var R=room()*sc;return [{role:"system",content:sys("You are now planning a document with me, part by part, before it is written. You return the plan and nothing else.")},
      {role:"user",content:"Plan my "+docWord(kind)+" for "+to(o)+". Give its parts in order, one per line, each as: the part's name, a colon, then one plain sentence saying what it will say and which entries of THE PROFILE it will draw on. Five to nine parts. Where the profile is silent on something a part needs, say so in square brackets. Write nothing else.\n\n"+
        (post?"THE "+kindWord(o.kind).toUpperCase()+":\n"+cut(post,Math.floor(R*0.25))+"\n\n":"")+(critBlock(o)?critBlock(o)+"\n\n":"")+profileBlock(G,R*0.55)}];},700,0.3);})
  .then(function(t){var plan=clean(t).split("\n").map(function(l){return l.replace(/^\s*(?:[-*•]|\d+[.)])\s*/,"").trim();}).filter(Boolean).join("\n");
      if(plan.length<20)throw new Error("the model gave back no plan");o.plan=o.plan||{};o.plan[kind]={text:plan,at:Date.now(),model:modelName()};o.sv={kind:kind};save();end();},failed);}
/* Guide me: the parts, questions for her to answer, and what her profile holds for each; nothing is written for her */
function guideDoc(o,kind){if(busyNow()||needModel())return;begin(o,"Making your guide to the "+docWord(kind));
  Promise.all([postText(o),gatherProfile({opp:o})]).then(function(x){var post=x[0],G=x[1];
    return ask(function(sc){var R=room()*sc;return [{role:"system",content:sys("You are now a teacher. You never write the document, nor any sentence of it: you help me write it myself.")},
      {role:"user",content:"I will write my "+docWord(kind)+" for "+to(o)+" myself, to learn. Guide me. Give its parts in order, each as a level-two heading (##). Under each: one plain sentence on what the part is for; then two or three questions for me to answer in my own words, as a list; then a line beginning \"From your profile:\" naming the entries of THE PROFILE I could draw on, as they stand there, or \"nothing yet\" where it is silent. Write no part of the document itself.\n\n"+
        (post?"THE "+kindWord(o.kind).toUpperCase()+":\n"+cut(post,Math.floor(R*0.25))+"\n\n":"")+(critBlock(o)?critBlock(o)+"\n\n":"")+profileBlock(G,R*0.55)}];},1100,0.3);})
  .then(function(t){var g=clean(t);if(g.length<40)throw new Error("the model gave back no guide");o.guide=o.guide||{};o.guide[kind]={text:g,at:Date.now(),model:modelName()};o.mineKind=kind;o.sv={kind:"mine"};save();end();},failed);}
/* Guide me, on a draft already written: it is looked at with her, and she changes it herself */
function lookWithMe(o,kind,md){o.mine=o.mine||{};o.mine[kind]={text:md,at:Date.now()};o.mineKind=kind;o.sv={kind:"mine"};save();reviewMine(o,kind,md);}

/* ---- changes accepted one by one: the revised text is laid against the draft, paragraph by paragraph ---- */
function blocksOf(t){return String(t||"").replace(/\r/g,"").split(/\n[ \t]*\n+/).map(function(b){return b.trim();}).filter(Boolean);}
function diffUnits(a,b){return lcsUnits(blocksOf(a),blocksOf(b));}
function joinUnits(units,dec){var out=[];units.forEach(function(u,k){out=out.concat(u.same||dec[k]!=="new"?u.old:u.nw);});return out.join("\n\n");}
function reviewPane(o,v,rec,pane,P){var rv=o.review;rv.dec=rv.dec||{};rv.why=rv.why||{};
  var top=h("div","c-row c-tight");top.appendChild(h("h3","c-h3",esc("The changes to your "+docWord(v.kind)+", one by one")));pane.appendChild(top);
  pane.appendChild(h("p","c-note",esc("You asked: “"+(rv.note.length>160?rv.note.slice(0,157)+"…":rv.note)+"”. Each change waits for you: keep it, or keep your own words. Nothing is changed until you press Done.")));
  var list=h("div","c-col c-rv");pane.appendChild(list);
  Promise.all([loadText(rv.base),loadText(rv.ref)]).then(function(x){var units=diffUnits(x[0],x[1]),ch=[];units.forEach(function(u,k){if(!u.same)ch.push(k);});
    if(!ch.length){list.appendChild(empty("No change","The model gave back the same text."));}
    var same=0;
    function flushSame(){if(same){list.appendChild(h("p","c-note c-rv-same",esc("⋯ "+same+" paragraph"+(same===1?"":"s")+" as they were")));same=0;}}
    units.forEach(function(u,k){if(u.same){same++;return;}flushSame();var no=ch.indexOf(k)+1,d=rv.dec[k],card=h("div","c-rv-card"+(d?" c-rv-"+d:""));
      card.appendChild(h("div","c-rv-h","<b>Change "+no+" of "+ch.length+"</b>"+(d==="new"?"<span class=\"c-chip c-ok\">The change is kept</span>":d==="old"?"<span class=\"c-chip\">Your words are kept</span>":"")));
      if(u.old.length){var a=h("div","c-rv-old");a.appendChild(h("small",null,"Before"));u.old.forEach(function(p){a.appendChild(h("p",null,esc(p)));});card.appendChild(a);}
      if(u.nw.length){var b=h("div","c-rv-new");b.appendChild(h("small",null,u.old.length?"After":"Added"));u.nw.forEach(function(p){b.appendChild(h("p",null,esc(p)));});card.appendChild(b);}
      else card.appendChild(h("div","c-rv-new c-rv-gone","<small>After</small><p>(taken out)</p>"));
      if(rv.why[k])card.appendChild(h("p","c-note c-rv-why","<b>Why:</b> "+esc(rv.why[k])));
      var keys=h("div","c-keyrow");
      var kn=cbtn(d==="new"?"pri sm":"sm","Keep the change",function(){rv.dec[k]="new";save();render();});kn.setAttribute("aria-pressed",d==="new"?"true":"false");keys.appendChild(kn);
      var ko=cbtn(d==="old"?"pri sm":"sm","Keep my words",function(){rv.dec[k]="old";save();render();});ko.setAttribute("aria-pressed",d==="old"?"true":"false");keys.appendChild(ko);
      if(!rv.why[k])keys.appendChild(cbtn("quiet sm","Why this change?",function(){whyChange(o,rv,k,u);},"Asks the model for one sentence on why"));
      card.appendChild(keys);list.appendChild(card);});flushSame();
    var nd=ch.filter(function(k){return rv.dec[k];}).length,nk=ch.filter(function(k){return rv.dec[k]==="new";}).length;
    P.foot.appendChild(h("span","c-note",esc(nd+" of "+ch.length+" decided")));P.foot.appendChild(cbtn("","Keep all changes",function(){ch.forEach(function(k){rv.dec[k]="new";});save();render();}));
    P.foot.appendChild(cbtn("","Keep none",function(){ch.forEach(function(k){rv.dec[k]="old";});save();render();}));P.foot.appendChild(h("span","c-grow"));
    P.foot.appendChild(cbtn("quiet","Cancel",function(){dropReview(o);render();say("Nothing was changed.");}));
    P.foot.appendChild(cbtn("pri","Done",function(){finishReview(o,v,rec,units,ch);},nd<ch.length?"Changes you have not decided keep your own words":"Keep what you chose"));});}
function whyChange(o,rv,k,u){if(busyNow()||needModel())return;RUN.busy=true;RUN.what="Asking why";render();
  ask(function(){return [{role:"system",content:sys("You explain a change in one plain sentence. You never rewrite anything.")},{role:"user",content:"I asked for this: “"+rv.note+"”.\nIn one plain sentence, say why the change below serves what I asked, or say plainly if it does not.\n\nBEFORE:\n"+(u.old.join("\n\n")||"(nothing)")+"\n\nAFTER:\n"+(u.nw.join("\n\n")||"(taken out)")}];},160,0.2)
    .then(function(t){rv.why[k]=clean(t).split("\n")[0].slice(0,400);save();end();},failed);}
function dropReview(o){var rv=o.review;if(!rv)return;try{IngBig.del(rv.ref);}catch(e){}delete o.review;save();}
function finishReview(o,v,rec,units,ch){var rv=o.review,kept=ch.filter(function(k){return rv.dec[k]==="new";}).length;
  loadText(rv.base).then(function(){var md=joinUnits(units,rv.dec),kind=v.kind;
    if(!kept){dropReview(o);render();say("Your words are kept: nothing was changed.");return;}
    var ref=IngBig.newId();return Promise.resolve(IngBig.put(ref,md)).then(function(){var c0=rv.chk||rec.chk||{},chk={figures:(c0.figures||[]).filter(function(f){return md.indexOf(f)>=0;}),fills:(md.match(/\[[^\]\n]{2,160}\]/g)||[]).length,style:""};
      keepOlder(o,kind);o.docs[kind]={ref:ref,made:Date.now(),model:rec.model,chk:chk,note:rv.note+" ("+kept+" of "+ch.length+" changes kept, one by one)"};
      dropReview(o);o.improve=false;o.edit=false;o.tab="doc";save();render();say(kept+" of "+ch.length+" changes kept. The version before is one press away.");});});}

/* ---- the checklist: what the posting asks her to send and do, from its own sentences ---- */
var CHECK_RULES=[
  [/\b(?:cvs?|curriculum vitae|r[eé]sum[eé])\b/i,"Your CV","cv"],
  [/cover(?:ing)? letter|letter of (?:application|motivation)|motivation(?:al)? letter/i,"A cover letter","cover"],
  [/supporting statement|statement in support/i,"A supporting statement","supporting"],
  [/statement of (?:purpose|intent)|purpose statement/i,"A statement of purpose","purpose"],
  [/personal statement/i,"A personal statement","statement"],
  [/research proposal|project proposal|research outline|outline of (?:the |your )?(?:proposed )?research/i,"A research proposal","proposal"],
  [/teaching (?:statement|philosophy)/i,"A teaching statement","teaching"],
  [/writing sample|sample of (?:your )?(?:written|academic) work|piece of (?:written|academic) work/i,"A writing sample","sample"],
  [/funding (?:application|statement|form)|scholarship (?:application|form|statement)|case for support/i,"A funding or scholarship application","funding"],
  [/\btranscripts?\b|academic records?\b/i,"Transcripts of your degrees",""],
  [/degree certificates?|certificates? (?:of|for) (?:your )?degrees?/i,"Degree certificates",""],
  [/\breferees?\b|\breferences\b|letters? of (?:recommendation|reference)|recommendation letters?/i,"References","ref"],
  [/\bielts\b|\btoefl\b|english language (?:test|requirement|proficiency|qualification)|pte academic/i,"Proof of your English (IELTS, TOEFL or the like)",""],
  [/(?:list of|full list of) (?:your )?publications|publication list/i,"A list of your publications",""],
  [/\bportfolio\b/i,"A portfolio",""],
  [/application form/i,"The application form",""],
  [/right to work|\bvisa\b|\bpassport\b/i,"Proof of your right to work or study",""]];
var NUMWORD={two:2,three:3,four:4,five:5,"2":2,"3":3,"4":4,"5":5};
function sentencesOf(t){return String(t||"").replace(/\r/g,"").replace(/([.;!?])\s+/g,"$1\n").split(/\n+/).map(function(s){return s.replace(/\s+/g," ").trim();}).filter(function(s){return s.length>6;});}
function checkFind(post,o){var S=sentencesOf(post),items=[],lim=limitsIn(post),seen={};
  function add(text,quote,doc){var k=text.toLowerCase();if(seen[k])return;seen[k]=1;items.push({id:uid("ck"),text:text,quote:String(quote||"").slice(0,240),doc:doc||"",done:false,src:"posting"});}
  CHECK_RULES.forEach(function(r){var q=S.filter(function(s){return r[0].test(s);})[0];if(!q)return;var t=r[1],d=r[2];
    if(d==="ref"){var m=/\b(two|three|four|five|[2-5])\s+(?:academic\s+|professional\s+|confidential\s+)?(?:referees?|references?|letters)/i.exec(q);t=m?(NUMWORD[m[1].toLowerCase()]+" references"):"References";d="";
      add(t,q,"refs");add("Ask your referees, and give them the posting and the date it is due",q,"refs");return;}
    var L=d&&lim[d];if(L)t+=L.words?" (no more than "+L.words.toLocaleString("en-GB")+" words)":" (no more than "+L.pages+" page"+(L.pages>1?"s":"")+")";add(t,q,d);});
  var how=S.filter(function(s){return /apply (?:online|through|via|at|using)|application (?:portal|system)|submit (?:your |an |the )?applications?|send (?:your |an |the )?applications?|applications? (?:should|must) be (?:submitted|sent|made)/i.test(s);})[0];
  if(how)add("Send it the way it asks: "+(how.length>140?how.slice(0,137)+"…":how),how,"");
  if(o&&(o.due||o.closes))add("Send it before it closes"+(o.due?": "+dayStr(o.due+"T12:00:00"):"")+(o.closes&&!o.due?": "+o.closes:""),o.closes||"","");
  var iv=S.filter(function(s){return /interviews? (?:will|are|is) (?:be )?(?:held|expected|planned|take place)|shortlisted (?:candidates|applicants) will/i.test(s);})[0];
  if(iv)add("Keep the interview dates free",iv,"");
  return items;}
/* what the rules missed: the model lists what the posting asks, each with the sentence that asks it; only a sentence found
   word for word in the posting is kept, so nothing can be invented */
function checkSuggest(o,asPending){if(busyNow()||needModel())return;begin(o,"Reading the posting for anything the checklist missed");
  postText(o).then(function(post){return ask(function(sc){var R=room()*sc;return [{role:"system",content:"You read a posting and list what it asks applicants to send or do. You quote it exactly. You add nothing it does not ask."},
      {role:"user",content:"List what this "+kindWord(o.kind)+" asks applicants to send or to do, one item per line, each as: the item in a few plain words, then \" :: \", then the sentence of the posting that asks for it, copied exactly. Only what the text below asks; nothing else.\n\n"+cut(post,Math.floor(R*0.8))}];},700,0.2)
    .then(function(t){var flat=post.replace(/\s+/g," ").toLowerCase(),C=o.check,have={},quoted={},added=0,qk=function(q){return String(q||"").replace(/\s+/g," ").trim().toLowerCase().replace(/[.;:!?]+$/,"");};
      (C.items.concat(C.pending||[]).concat(C.hidden||[])).forEach(function(x){have[x.text.toLowerCase().replace(/\s*\(.*\)$/,"")]=1;if(x.quote)quoted[qk(x.quote)]=1;});
      clean(t).split("\n").forEach(function(l){var m=/^\s*(?:[-*•]|\d+[.)])?\s*(.{3,120}?)\s*::\s*["“]?(.{12,400}?)["”]?\s*$/.exec(l);if(!m)return;var q=m[2].replace(/\s+/g," ").trim(),txt=m[1].trim();
        /* a sentence already on the list is not offered again, under another name */
        if(flat.indexOf(q.toLowerCase().replace(/[.;]$/,""))<0||have[txt.toLowerCase()]||quoted[qk(q)])return;have[txt.toLowerCase()]=1;quoted[qk(q)]=1;added++;
        var it={id:uid("ck"),text:txt.charAt(0).toUpperCase()+txt.slice(1),quote:q.slice(0,240),doc:"",done:false,src:"model"};if(asPending)(C.pending=C.pending||[]).push(it);else C.items.push(it);});
      C.asked=Date.now();save();end();say(added?added+" more found in its own sentences"+(asPending?": keep or drop each.":"."):"Nothing more: the checklist has all it asks.");});},failed);}
function makeCheck(o){var w=wayOf(o);postText(o).then(function(post){var found=checkFind(post,o);
  o.check={items:w==="auto"?found:[],pending:w==="step"?found:[],hidden:w==="guide"?found:[],at:Date.now(),way:w};save();render();
  if(w==="auto"&&modelReady())checkSuggest(o,false);});}
function stepCheck(o,P){var C=o.check,w=wayOf(o),box=h("div","c-col c-fill");P.body.appendChild(box);
  var ways=h("div","c-way");ways.appendChild(h("span","c-label",esc("How")));ways.appendChild(seg(WAYS2,w,function(x){setWay(o,x);},"How the checklist is made"));
  ways.appendChild(h("p","c-note",esc({auto:"Ingenium makes the list from the posting's own sentences; you tick each item at your pace.",step:"Ingenium finds each item in the posting and shows it to you: keep it or drop it, one by one.",guide:"You make the list yourself, with the posting beside you; Ingenium's list waits until you ask for it."}[w])));box.appendChild(ways);
  if(!C){box.appendChild(empty("What it asks you to send","A checklist of what this "+kindWord(o.kind)+" asks for: the documents, the references, how and when to send it. Each item shows the sentence of the posting it comes from, so you can check it yourself."));
    if(w==="guide"){var how=LESSONS.filter(function(L){return L[0]==="A checklist from a posting";})[0];if(how){var ol=h("ol","c-lesson-ol");how[1].forEach(function(s){ol.appendChild(h("li",null,esc(s)));});box.appendChild(ol);}}
    P.foot.appendChild(cbtn("","Next: what you send",function(){goStep(o,"send");},"Go on without a checklist"));P.foot.appendChild(h("span","c-grow"));P.foot.appendChild(cbtn("pri",w==="guide"?"Start my own list":w==="step"?"Find what it asks for":"Make the checklist",function(){makeCheck(o);}));return;}
  var pend=C.pending||[];
  if(pend.length){var x=pend[0],card=h("div","c-ck-sug");card.appendChild(h("small",null,esc((x.src==="model"?"Found by the model":"Found in the posting")+" · "+pend.length+" to look at")));
    card.appendChild(h("b",null,esc(x.text)));if(x.quote)card.appendChild(h("blockquote",null,esc("“"+x.quote+"”")));
    var kr=h("div","c-keyrow");kr.appendChild(cbtn("pri sm","Keep it",function(){C.items.push(pend.shift());save();render();}));kr.appendChild(cbtn("sm","Drop it",function(){pend.shift();save();render();}));
    if(pend.length>1)kr.appendChild(cbtn("quiet sm","Keep all "+pend.length,function(){C.items=C.items.concat(pend.splice(0));save();render();}));card.appendChild(kr);box.appendChild(card);}
  var n=C.items.length,d=C.items.filter(function(x){return x.done;}).length;
  if(n)box.appendChild(h("p","c-note c-ck-count","<b>"+d+" of "+n+" done</b>"+(d===n?" · everything on the list is done":"")));
  else if(!pend.length)box.appendChild(h("p","c-note",esc("Nothing on the list yet: add an item below.")));
  var ul=h("ul","c-ck");C.items.forEach(function(x){var li=h("li",x.done?"c-ck-done":null),cb=h("input");cb.type="checkbox";cb.checked=!!x.done;cb.id="ck_"+x.id;
    cb.addEventListener("change",function(){x.done=cb.checked;x.at=Date.now();save();render();});var lb=h("label");lb.setAttribute("for",cb.id);lb.appendChild(h("span","c-ck-t",esc(x.text)));
    if(x.quote)lb.appendChild(h("small",null,esc("From the posting: “"+x.quote+"”")));else if(x.src==="you")lb.appendChild(h("small",null,esc("Added by you")));
    li.appendChild(cb);li.appendChild(lb);var acts=h("span","c-ck-acts");
    if(x.doc&&DOCS[x.doc])acts.appendChild(cbtn("sm",o.docs[x.doc]?"Open it":"Write it",function(){o.step="send";setView(o,{kind:x.doc});}));
    else if(x.doc==="refs")acts.appendChild(cbtn("sm",(o.refs||[]).length?"Your referees":"Choose them",function(){o.step="send";setView(o,{kind:"refs"});}));
    acts.appendChild(cbtn("quiet sm","✕",function(){C.items=C.items.filter(function(y){return y!==x;});save();render();},"Take it off the list"));li.appendChild(acts);ul.appendChild(li);});
  box.appendChild(ul);
  var ar=h("div","c-row"),ai=input("text","","Add an item of your own");ai.setAttribute("aria-label","Add an item of your own");
  var addIt=function(){var t=ai.value.trim();if(!t)return;C.items.push({id:uid("ck"),text:t,quote:"",doc:"",done:false,src:"you"});save();render();};
  ai.addEventListener("keydown",function(e){if(e.key==="Enter"){e.preventDefault();addIt();}});ar.appendChild(ai);ar.appendChild(cbtn("sm","Add",addIt));box.appendChild(ar);
  if(C.hidden&&C.hidden.length)P.foot.appendChild(cbtn("","Show what Ingenium found ("+C.hidden.length+")",function(){C.pending=(C.pending||[]).concat(C.hidden.splice(0));save();render();},"Compare your list with the one found in the posting: keep or drop each"));
  P.foot.appendChild(cbtn("","Find anything missed",function(){checkSuggest(o,wayOf(o)!=="auto");},"The model reads the posting again; only what it can quote word for word is offered"));
  P.foot.appendChild(h("span","c-grow"));P.foot.appendChild(cbtn("pri","Next: what you send",function(){goStep(o,"send");}));}

/* ---- Today: only the next small step of each application, with its closing date ---- */
function todayStr(){var d=new Date();return d.getFullYear()+"-"+("0"+(d.getMonth()+1)).slice(-2)+"-"+("0"+d.getDate()).slice(-2);}
function tomorrowStr(){var d=new Date();d.setDate(d.getDate()+1);return d.getFullYear()+"-"+("0"+(d.getMonth()+1)).slice(-2)+"-"+("0"+d.getDate()).slice(-2);}
function nextOf(o){if(FINISHED[o.stage])return null;
  /* 6.9.2: an interview with a day set comes first; then a referee asked ten days ago and not heard from */
  if(o.interview&&o.interview.at){var nd=daysTo(o.interview.at);if(nd!=null&&nd>=0)return {step:"track",text:"Prepare: "+(nd===0?"the interview is today":nd===1?"the interview is tomorrow":nd+" days to the interview"),why:"Its list to prepare by is in Track: the posting once more, an example for each essential criterion, two questions to ask, the way there and what to bring."};
    if(nd!=null&&nd>=-7&&!String(o.interview.after||"").trim()&&!(o.emails||[]).some(function(e){return e.purpose==="thanks";}))return {step:"track",text:"Note how the interview went, and write your thanks",why:"While it is fresh: what was asked and what went well, in Notes after the interview; then a short thank-you, written for you to send. Both are in Track."};}
  var fu=(o.refs||[]).filter(function(r){return r.status==="asked"&&r.asked&&Date.now()-r.asked>10*864e5;})[0];
  if(fu)return {step:"send",kind:"refs",text:"Follow up with "+fu.name,why:"You asked for the reference on "+dayStr(fu.asked)+" and nothing has come back. One courteous line is usual after ten days."};
  if(!o.read)return {step:"fit",text:"Read it against your profile",why:"The reading shows how it matches what you are looking for, and each thing it asks for, judged from your profile."+(modelReady()?"":" A model is needed for it (Models page).")};
  if(!o.check)return {step:"check",text:"Make its checklist",why:"What it asks you to send and do, from its own sentences, to tick at your pace."};
  var C=o.check;if(C.pending&&C.pending.length)return {step:"check",text:"Look at "+C.pending.length+" item"+(C.pending.length===1?"":"s")+" found in the posting",why:"Keep or drop each, one at a time."};
  var und=C.items.filter(function(x){return !x.done;});
  if(und.length){var x=und[0];
    /* the references line, in its turn on the list: choose the referees first, then the line itself */
    if(x.doc==="refs")return (o.refs||[]).length?{step:"send",kind:"refs",text:x.text,why:"From its checklist: "+(o.refs||[]).length+" referee"+((o.refs||[]).length===1?"":"s")+" so far.",quote:x.quote}
      :{step:"send",kind:"refs",text:"Choose your referees",why:"Its checklist asks for references. Ask early, and give them the posting, your CV and the date it is due.",quote:x.quote};
    if(x.doc&&DOCS[x.doc]){var dr=o.docs[x.doc];if(!dr)return {step:"send",kind:x.doc,text:"Write your "+docWord(x.doc),why:"Its checklist asks for it.",quote:x.quote};
      var fills=dr.chk&&dr.chk.fills||0;if(fills)return {step:"send",kind:x.doc,text:"Fill the "+fills+" place"+(fills===1?"":"s")+" in square brackets in your "+docWord(x.doc),why:"Your profile did not give what goes there; you do."};
      return {step:"check",text:"Read your "+docWord(x.doc)+" once more, then tick it off",why:"It is written; only you can say it is ready."};}
    return {step:"check",text:x.text,why:"From its checklist ("+(C.items.length-und.length)+" of "+C.items.length+" done).",quote:x.quote};}
  if(o.stage==="considering"||o.stage==="preparing")return {step:"track",text:"Send it, then mark it Applied in Track",why:"Everything on its checklist is done."};
  if(o.stage==="interview"){if(o.interview&&o.interview.at&&daysTo(o.interview.at)<0)return null;return {step:"practise",text:"Practise your answers for the interview",why:"One criterion or one question at a time."};}
  if(o.stage==="offer")return {step:"track",text:"Decide on the offer, and note what you decide in Track",why:""};
  return null;}
function dateWords(d,o){var t=String(o.title||"an application").replace(/[.\s]+$/,""),l=d.label.charAt(0).toLowerCase()+d.label.slice(1);return d.kind==="closes"?t+" closes":d.kind==="interview"?"the interview for "+t:d.kind==="referee"?l+", for "+t:l+" for "+t;}
/* 6.45: a mark for each kind of step (the line art of Ingenium's other marks) */
var TD_SVG='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">';
var TD_IC={check:TD_SVG+'<path d="M10 6h10M10 12h10M10 18h10"/><path d="M3.5 6l1.6 1.6L8 4.8"/><path d="M3.5 12l1.6 1.6L8 10.8"/><path d="M3.5 18l1.6 1.6L8 16.8"/></svg>',
  fit:TD_SVG+'<circle cx="10.5" cy="10.5" r="6.5"/><path d="M15.5 15.5L21 21"/><path d="M8 10.5h5M10.5 8v5"/></svg>',
  send:TD_SVG+'<path d="M21 3L10.5 13.5"/><path d="M21 3l-6.5 18-4-7.5L3 9.5z"/></svg>',
  track:TD_SVG+'<path d="M5 21V4"/><path d="M5 4h12l-2.5 4.5L17 13H5"/></svg>',
  practise:TD_SVG+'<path d="M4 5h11a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H9l-4 4v-4H4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2z"/><path d="M19 9h1a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-1v3l-3-3"/></svg>',
  leaf:TD_SVG+'<path d="M5 19c8.5 0 14-5.5 14-14C10.5 5 5 10.5 5 19z"/><path d="M5 19l7.5-7.5"/></svg>'};
function paintToday(par){var S=CS(),t=todayStr(),act=[],rest=[],wait=[],low=lowDay();
  sortedOpps().forEach(function(o){if(FINISHED[o.stage])return;var n=nextOf(o);if(!n){wait.push(o);return;}var x={o:o,n:n,mins:estimateOf(o,n)};if(o.rest&&o.rest>t)rest.push(x);else act.push(x);});
  var L=panel("csList","Today",{key:cbtn("pri sm","+ Bring one",function(){S.ui.room="apps";S.ui.open="new";show("work");save();render();},"Bring a posting, a programme's call or a grant")});
  /* 6.9.7, her choice (3 November 2026): one step at a time. The single most urgent step leads; the rest wait folded. The people she
     writes to (People) have their steps here too, in the order of their dates. */
  var sel=act.filter(function(x){return x.o.id===S.ui.today;})[0]||null,SHOWN=S.ui.many?3:1,pp=peopleSteps();
  /* 6.9.2: the dates of the week at the head of the list; each step says about how long it takes */
  if(S.opps.some(function(o){return !FINISHED[o.stage];}))L.body.appendChild(weekStrip(S));
  if(!act.length&&!rest.length&&!pp.length)L.body.appendChild(empty(S.opps.length?"Nothing for today":"Nothing here yet",S.opps.length?"Every open application is waiting on someone else, or has no step left.":"Bring a posting, a programme's call or a grant: its next step will be here each day."));
  function row(x){var dw=dueWords(x.o),n=daysLeft(x.o);return item(x.n.text,[(x.o.title||"Untitled"),dw,"about "+x.mins+" min"].filter(Boolean).join(" · "),sel===x,function(){S.ui.today=x.o.id;show("work");save();render();},n!=null&&n>=0&&n<=7?"c-soon-i":"");}
  var all=act.map(function(x){var n=daysLeft(x.o);return {k:n==null?9999:n,x:x};}).concat(pp.map(function(y){return {k:y.days,y:y};}));
  all.sort(function(a,b){return a.k-b.k;});
  function prow(y){return item(y.text,[y.c.org,roleWord(y.c.role),y.when,"about "+y.mins+" min"].filter(Boolean).join(" · "),false,function(){S.ui.room="people";S.ui.person=y.c.id;show("work");save();render();},y.days<=2?"c-soon-i":"");}
  function any(z){return z.x?row(z.x):prow(z.y);}
  all.slice(0,SHOWN).forEach(function(z){L.body.appendChild(any(z));});
  if(all.length>SHOWN){var f=fold("today-later",(SHOWN===1?"What else is waiting":"Later")+" ("+(all.length-SHOWN)+")");all.slice(SHOWN).forEach(function(z){f.appendChild(any(z));});L.body.appendChild(f);}
  if(rest.length){var fr=fold("today-rest","Resting today ("+rest.length+")");rest.forEach(function(x){var b=item(x.o.title||"Untitled","Back tomorrow: "+x.n.text,false,function(){delete x.o.rest;save();render();},"");b.title="Bring it back today";fr.appendChild(b);});L.body.appendChild(fr);}
  if(wait.length){var fw=fold("today-wait","Waiting to hear ("+wait.length+")");wait.forEach(function(o){fw.appendChild(item(o.title||"Untitled",stageWord(o.stage),false,function(){S.ui.room="apps";S.ui.open=o.id;o.step="track";show("work");save();render();}));});L.body.appendChild(fw);}
  L.foot.appendChild(h("span","c-note",esc(all.length?(SHOWN===1?"One step at a time: "+all.length+" in all":all.length+" step"+(all.length===1?"":"s")+" for today"):"Nothing pressing")));
  if(all.length>1)L.foot.appendChild(cbtn("sm quiet",SHOWN===1?"Show three at once":"Show one at a time",function(){S.ui.many=!S.ui.many;save();render();},SHOWN===1?"The three most urgent steps, the rest folded":"Only the most urgent step, the rest folded"));
  if(act.length){var hk=cbtn("sm c-only-one","How long do you have?",function(){S.ui.today=null;show("work");save();render();},"Only the steps that fit in ten, fifteen, twenty-five or forty-five minutes");L.foot.appendChild(hk);}
  var R;
  if(sel){var o=sel.o,nx=sel.n,dw=dueWords(o);R=panel("csWork",o.title||"Untitled",{back:"Today",onBack:function(){S.ui.today=null;show("list");save();render();}});
    /* 6.45: the step in parts (the styles say why) */
    var c=h("div","c-col c-today c-today2"),nl=daysLeft(o),top=h("div","c-td-top");
    if(o.org)top.appendChild(h("span","c-td-org",esc(o.org)));
    if(dw)top.appendChild(chip(dw,nl==null?"c-td-stage":nl<0?"c-td-closed":nl<=7?"c-td-soon":"c-td-ok"));
    top.appendChild(chip(stageWord(o.stage),"c-td-stage"));c.appendChild(top);
    var hero=h("div","c-td-hero"),ic=h("div","c-td-ic");ic.setAttribute("aria-hidden","true");ic.innerHTML=TD_IC[nx.step]||TD_IC.check;hero.appendChild(ic);
    var at=all.map(function(z){return z.x;}).indexOf(sel),hx=h("div","c-td-hx");
    hx.appendChild(h("div","c-td-kick",esc((all.length>1&&at>=0?"Step "+(at+1)+" of "+all.length+" for today":"The step for today")+" · about "+sel.mins+" minutes")));
    hx.appendChild(h("h3","c-today-step",esc(nx.text)));if(nx.why)hx.appendChild(h("p","c-td-why",esc(nx.why)));hero.appendChild(hx);c.appendChild(hero);
    if(nx.quote)c.appendChild(h("blockquote","c-today-q",esc("From the posting: “"+nx.quote+"”")));
    var F=h("div","c-td-facts"),gr=h("dl","c-td-grid"),C=o.check;F.appendChild(h("h4","c-td-fh",esc("This application")));
    function fact(k,v){gr.appendChild(h("dt",null,esc(k)));gr.appendChild(h("dd",null,esc(v)));}
    fact("Stage",stageWord(o.stage));if(dw)fact("Its date",dw);
    fact("Checklist",!C?"Not made yet":(C.items||[]).length?(C.items.filter(function(x){return x.done;}).length+" of "+C.items.length+" ticked"):(C.pending&&C.pending.length?C.pending.length+" found, waiting for you to keep or drop":"Made, with nothing on it yet"));
    var dk=Object.keys(o.docs||{}).filter(function(k){return DOCS[k]&&o.docs[k];});fact("Documents",dk.length?dk.map(function(k){return DOCS[k][0];}).join(", "):"None written yet");
    var nrf=(o.refs||[]).length;if(nrf||(C&&(C.items||[]).some(function(x){return x.doc==="refs";})))fact("Referees",nrf?nrf+" chosen":"None chosen yet");
    F.appendChild(gr);c.appendChild(F);
    var pace=h("div","c-td-pace");pace.innerHTML=TD_IC.leaf+"<span>"+esc((low?"A low-energy day: this one step is enough. ":"")+"One step at a time. When it is done, the next one takes its place here.")+"</span>";c.appendChild(pace);
    R.body.appendChild(c);
    R.foot.appendChild(cbtn("quiet","Not today",function(){o.rest=tomorrowStr();S.ui.today=null;save();render();say("It rests until tomorrow.");},"It comes back tomorrow"));
    R.foot.appendChild(cbtn("","Open the application",function(){S.ui.room="apps";S.ui.open=o.id;show("work");save();render();}));R.foot.appendChild(h("span","c-grow"));
    R.foot.appendChild(cbtn("pri","Do this now",function(){S.ui.room="apps";S.ui.open=o.id;o.step=nx.step;if(nx.kind){o.sv={kind:nx.kind};o.tab="doc";}show("work");save();render();}));}
  else{R=panel("csWork","Your day",{back:"Today",onBack:function(){show("list");save();render();}});/* 6.46: not Today twice, beside the list of that name */var near=nearestDate(act.concat(rest).map(function(x){return x.o;}));
    var c2=h("div","c-col c-today");c2.appendChild(h("h3","c-today-step",esc(act.length?(act.length===1?"One step for today.":act.length+" steps for today, one for each application."):"Nothing is asked of you today.")));
    /* 6.90: the whole picture, and what changed while she was away (modules/r283.js draws them) */
    try{if(W.IngCounsel&&IngCounsel.picture)IngCounsel.picture(c2,S);}catch(e){}
    if(near)c2.appendChild(h("p",null,esc("The nearest date is "+(near.n===0?"today":near.n===1?"tomorrow":"in "+near.n+" days")+", "+dayStr(near.d.at+"T12:00:00")+": "+dateWords(near.d,near.o)+".")));
    if(act.length||CLOCK.ended)c2.appendChild(minutesBox(S,act,low));
    c2.appendChild(h("p","c-note",esc("Choose one on the left. Each says what to do and why; Do this now takes you straight to it, and Not today lets it rest until tomorrow.")));
    /* 6.58: Your mentor's next step, one line, one key */
    var mx=nextStep(),mt=(MS.filter(function(x){return x[0]===mx;})[0]||["",""])[1];var tl=null;try{if(W.IngCounsel&&IngCounsel.todayText)tl=IngCounsel.todayText();}catch(e){}c2.appendChild(h("p","c-td-mentor",esc(tl||(mx==="sum"?"Your mentor's summary is ready.":"Your mentor's next step: "+mt+"."))));
    var mk=h("div","c-keys");mk.appendChild(cbtn("sm",W.IngCounsel?"Open your counsellor":"Open your mentor",function(){S.ui.room="mentor";MT().step=mx;show("work");save();render();}));c2.appendChild(mk);R.body.appendChild(c2);}
  two(L,R,par);}

/* ---- several profiles (her words, 28 October 2026: "I want the Career Studio to be able to hold multiple profiles"; asked,
   she chose both: other sides of her, and other people she helps, each with its own applications and nothing mixed) ---- */
function personName(p){var P=p.profile||{},n=String(P.name||"").trim();if(!n&&P.isMe!==false){try{n=lxhAuthor()||"";}catch(e){}}return n||(P.isMe===false?"Someone else":"You");}
function personLabel(p){var n=personName(p),l=String(p.label||"").trim();return l?n+" · "+l:n;}
function switchTo(id){var r=ROOT();if(!r.people.some(function(p){return p.id===id;}))return;if(RUN.busy){say("Wait for the studio to finish, or press Stop, before you change profile.");paintWho();return;}
  r.cur=id;save();render();say("This is now the profile of "+personLabel(CS())+".");}
function meFirst(){var r=ROOT();if(CS().profile.isMe!==false)return;var m=r.people.filter(function(p){return !p.profile||p.profile.isMe!==false;})[0];if(m){r.cur=m.id;save();}}
function copyRef(ref){return loadText(ref).then(function(t){if(!t)return null;var n=IngBig.newId();return Promise.resolve(IngBig.put(n,t)).then(function(){return n;});});}
function newPerson(kind,name,label){var r=ROOT(),cur=CS(),p={id:uid("pp"),label:String(label||"").trim().slice(0,40),ui:{room:"mentor",open:null,ppart:"about"},opps:[],goals:[]};
  if(kind==="me"){var P=JSON.parse(JSON.stringify(cur.profile));P.isMe=true;delete P.suggested;delete P.own;P.at=Date.now();p.profile=P;
    /* its documents and LinkedIn export are copied, so each profile can change or remove its own */
    var q=Promise.all((P.files||[]).map(function(f){return copyRef(f.ref).then(function(n){f.ref=n;f.id=uid("f");});}));
    if(P.linkedin&&P.linkedin.ref)q=q.then(function(){return copyRef(P.linkedin.ref).then(function(n){P.linkedin.ref=n;});});
    return q.then(function(){P.files=(P.files||[]).filter(function(f){return f.ref;});r.people.push(p);r.cur=p.id;save();render();return p;});}
  p.profile={isMe:false,name:String(name||"").trim(),contact:"",items:[],files:[],use:{cv:true,linkedin:true,writing:true,letters:true,fontes:false,apps:{}},
    wants:{looking:"",need:"",avoid:"",where:"",when:""},prefs:{spelling:(cur.profile.prefs&&cur.profile.prefs.spelling)||"british"},own:{cv:null,writing:[],letters:[]},at:Date.now()};
  r.people.push(p);r.cur=p.id;save();render();return Promise.resolve(p);}
function refsOfPerson(p){var out=[],P=p.profile||{};
  (p.opps||[]).forEach(function(o){out=out.concat(oppRefs(o));});
  (P.files||[]).forEach(function(f){out.push(f.ref);});if(P.linkedin)out.push(P.linkedin.ref);
  if(P.own){if(P.own.cv)out.push(P.own.cv.ref);(P.own.writing||[]).concat(P.own.letters||[]).forEach(function(x){out.push(x.ref);});}
  return out.filter(Boolean);}
function removePerson(p){var r=ROOT();if(r.people.length<2){say("This is the only profile: it stays.");return;}
  var n=(p.opps||[]).length;ingConfirm("Remove the profile of "+personLabel(p)+", its "+n+" application"+(n===1?"":"s")+" and everything written for them? This cannot be undone.",function(){
  refsOfPerson(p).forEach(function(ref){try{IngBig.del(ref);}catch(e){}});(p.opps||[]).forEach(function(o){try{dropThoughts(o);dropRuns(o);}catch(e){}});r.people=r.people.filter(function(x){return x!==p;});if(r.cur===p.id)r.cur=r.people[0].id;save();render();say("The profile is removed.");},{danger:true});}
function addOwnText(list,what){pickFile(".docx,.pdf,.txt,.md,.rtf,.html,.htm",true,function(fs){var q=Promise.resolve(),n=0;
  fs.forEach(function(f){q=q.then(function(){return readFile(f).then(function(t){if(t.length<40)return;var ref=IngBig.newId();return Promise.resolve(IngBig.put(ref,t)).then(function(){list.push({ref:ref,name:f.name,chars:t.length,at:Date.now()});n++;});});});});
  q.then(function(){if(n){CS().profile.at=Date.now();save();render();say(n+" "+what+(n>1?"s are":" is")+" kept in this profile.");}});});}
function profPeople(){var r=ROOT(),cur=CS(),R=panel("csWork","Profiles");
  R.body.appendChild(h("p","c-note c-pad",esc("Each profile keeps its own entries, sources, applications and Today, and nothing passes between them. A profile for someone else never uses your CV, your writing, or Lector's readings of your apps.")));
  var ul=h("div","c-people");
  r.people.forEach(function(p){var row=h("div","c-person"+(p===cur?" c-cur":"")),tx=h("div","tx"),n=(p.opps||[]).length;tx.appendChild(h("b",null,esc(personLabel(p))));
    tx.appendChild(h("small",null,esc((p.profile&&p.profile.isMe===false?"Someone else":"You")+" · "+n+" application"+(n===1?"":"s")+(p===cur?" · open now":""))));row.appendChild(tx);
    var k=h("div","c-keys");if(p!==cur)k.appendChild(cbtn("sm","Open this profile",function(){switchTo(p.id);}));
    k.appendChild(cbtn("sm quiet","Name it",function(){ingPromptThen("A short name for this profile, shown beside the person's name (for example Academic, or Museums). Leave it empty for none.",p.label||"",function(v){p.label=v.trim().slice(0,40);save();render();},{empty:true});}));
    if(r.people.length>1)k.appendChild(cbtn("sm quiet c-danger","Remove",function(){removePerson(p);}));row.appendChild(k);ul.appendChild(row);});
  R.body.appendChild(ul);
  var nw=h("div","c-col c-pad c-newp");nw.appendChild(h("h3","c-h3",esc("A new profile")));
  var a=h("div","c-row c-newrow");a.appendChild(cbtn("","Another side of me",function(){ingPromptThen("What should this side of you be called? For example Academic, Industry, or Museums.","",function(v){
      newPerson("me","",v).then(function(){say("A new side of you, copied from "+personLabel(cur)+". Change what you wish: its applications start empty.");});},{empty:true});},"A copy of this profile, to change: its own entries and applications"));
  a.appendChild(h("span","c-note",esc("A copy of this profile (its entries, wishes and documents) with no applications yet, to change as you wish.")));nw.appendChild(a);
  var b=h("div","c-row c-newrow"),nm=input("text","","Their name");nm.setAttribute("aria-label","Their name");b.appendChild(nm);
  b.appendChild(cbtn("","Someone else",function(){var v=nm.value.trim();if(!v){nm.focus();say("Give their name first.");return;}newPerson("other",v,"").then(function(){say("A profile for "+v+". Add their CV and their entries first.");});},"An empty profile for someone you help"));
  b.appendChild(h("span","c-note",esc("An empty profile for someone you help, with their own CV and documents.")));nw.appendChild(b);R.body.appendChild(nw);
  return R;}
function paintWho(){var sel=$("csWho");if(!sel)return;var r=ROOT(),cur=CS();sel.innerHTML="";
  r.people.forEach(function(p){var o=h("option");o.value=p.id;o.textContent=personLabel(p);if(p===cur)o.selected=true;sel.appendChild(o);});
  var n=h("option");n.value="+manage";n.textContent="Add or manage profiles…";sel.appendChild(n);}

/* ---- Your profile: its parts on the left, one part at a time on the right ---- */
function paintProfile(par){var S=CS(),P=S.profile,M=lectorMe(),part=S.ui.ppart||"about",n=P.items.length,sg=(P.suggested||[]).length,filled=Object.keys(P.wants).filter(function(k){return String(P.wants[k]||"").trim();}).length;
  var srcN=(M.cv?1:0)+(P.linkedin?1:0)+P.files.length;
  var L=panel("csList","Your profile");
  [["about","About you",[P.name||myName()||"Your name",P.contact].filter(Boolean).join(" · ")||"Your name and how to reach you"],["looking","What you are looking for",filled?filled+" of 5 said":"Not said yet"],
   ["sources","What the studio may use",srcN?srcN+" source"+(srcN===1?"":"s")+": "+[M.cv?"your CV":"",P.linkedin?"LinkedIn":"",P.files.length?P.files.length+" document"+(P.files.length===1?"":"s"):""].filter(Boolean).join(", "):"Your CV, LinkedIn, your documents"],
   ["entries","Your entries",n?n+" entr"+(n===1?"y":"ies"):"None yet"]].concat(sg?[["found","Found in your sources",sg+" to keep or drop"]]:[]).concat([["people","Profiles",ROOT().people.length+" kept · open, add or remove one"]]).forEach(function(x){
    L.body.appendChild(item(x[1],x[2],part===x[0],function(){S.ui.ppart=x[0];S.ui.editing=null;show("work");save();jump();render();},x[0]==="found"?"c-new":""));});
  L.foot.appendChild(h("span","c-note",esc(P.at?"Last changed "+dayStr(P.at):"Kept on this device only")));
  if(RUN.busy){two(L,livePanel(),par);return;}
  var R=({about:profAbout,looking:profLooking,sources:profSources,entries:profEntries,found:profFound,people:profPeople}[part]||profAbout)();
  R.head.insertBefore(cbtn("quiet c-back","‹ Your profile",function(){show("list");save();render();}),R.head.firstChild);two(L,R,par);}
function profAbout(){var P=CS().profile,R=panel("csWork","About you"),g=h("div","c-col c-pad");
  var nm=input("text",P.name,myName()||"Your name"),ct=input("text",P.contact,"Email · telephone · town"),sp=select([["british","British English"],["american","American English"]],P.prefs.spelling);
  nm.addEventListener("change",function(){P.name=nm.value.trim();P.at=Date.now();save();});ct.addEventListener("change",function(){P.contact=ct.value.trim();P.at=Date.now();save();});sp.addEventListener("change",function(){P.prefs.spelling=sp.value;save();});
  g.appendChild(field("Your name, as it heads your CV",nm));g.appendChild(field("How to reach you, one line",ct));g.appendChild(field("Spelling in what the studio writes",sp));
  g.appendChild(h("p","c-note",esc("Kept on this device only. Your name heads your CV and signs your letters.")));R.body.appendChild(g);return R;}
function profLooking(){var P=CS().profile,R=panel("csWork","What you are looking for"),g=h("div","c-grid2 c-pad");
  [["looking","The work you are looking for","Roles, fields, kinds of programme or grant, the level"],["need","What you need","Place, hours, pay or funding, support, access needs, the start date"],["avoid","What you would rather avoid",""],["where","Where","Towns, countries, or working from home"],["when","By when","When you want to start, or apply by"]].forEach(function(f){
    var t=h("textarea","c-ta");t.placeholder=f[2];t.value=P.wants[f[0]]||"";t.addEventListener("change",function(){P.wants[f[0]]=t.value.trim();P.at=Date.now();save();});g.appendChild(field(f[1],t));});
  R.body.appendChild(g);R.foot.appendChild(h("span","c-note",esc("In your own words. Each reading says first how an opportunity matches these, before whether you fit it.")));return R;}
function profSources(){var S=CS(),P=S.profile,M=lectorMe(),R=panel("csWork","What the studio may use"),list=h("div","c-srcs");
  function src(title,sub,on,set,keys,inner){var row=h("div","c-src"+(inner?" sub":""));if(set){var sw=h("label","c-sw"),cb=h("input");cb.type="checkbox";cb.checked=!!on;cb.setAttribute("aria-label","Use "+title);cb.addEventListener("change",function(){set(cb.checked);save();});sw.appendChild(cb);row.appendChild(sw);}else row.appendChild(h("span","c-sw-pad"));
    var tx=h("div","tx");tx.appendChild(h("b",null,esc(title)));tx.appendChild(h("small",null,esc(sub)));row.appendChild(tx);if(keys&&keys.length){var k=h("div","c-keys");keys.forEach(function(x){k.appendChild(x);});row.appendChild(k);}list.appendChild(row);}
  var me=P.isMe!==false;
  src("Your CV",M.cv?M.cv.name+", kept "+dayStr(M.cv.at||Date.now())+(me?". Lector uses the same one.":". Kept in this profile only."):(me?"Not added yet. Lector and the studio share it.":"Not added yet. Kept in this profile only."),P.use.cv,function(v){P.use.cv=v;},
    [cbtn("sm",M.cv?"Replace":me?"Add your CV":"Add their CV",addCv)].concat(M.cv?[cbtn("sm quiet","Remove",function(){ingConfirm(me?"Remove your CV from Lector and the studio?":"Remove this CV from this profile?",function(){try{IngBig.del(M.cv.ref);}catch(e){}M.cv=null;save();render();},{danger:true});})]:[]));
  src("A profile file","Your entries, documents and CV in one file: bring one in, or keep a copy for another device or to begin someone else's. It stays with you: Ingenium sends it nowhere.",null,null,
    [cbtn("sm","Bring in a profile file",packPick),cbtn("sm quiet","Save this profile as a file",packSave)]);
  var LK=P.linkedin;
  src("Your LinkedIn export",LK?(LK.files?liStatus(LK):LK.n+" entr"+(LK.n===1?"y":"ies")+" from it, "+dayStr(LK.at)+"."):"The .zip LinkedIn sends when you ask for a copy of your data, or its .csv files. Imported again later, only what is new, changed or gone is shown to you; your own changes are never touched.",P.use.linkedin,function(v){P.use.linkedin=v;},
    [cbtn("sm",LK?"Import it again":"Add the export",function(){pickFile(".zip,.csv",true,function(fs){importLinkedIn(fs).catch(function(e){say("It could not be read: "+(e&&e.message||e));});});})]);
  /* 6.9.2: the headline and summary it keeps, shown, and kept as an entry on her press */
  if(LK&&LK.ref){src("Your headline and summary","…",null,null,[cbtn("sm","Keep as an entry",function(){loadText(LK.ref).then(function(t){if(!t){say("Nothing was kept of them.");return;}if(P.items.some(function(it){return it.title==="LinkedIn headline and summary";})){say("It is among your entries already.");return;}
      P.items.push({id:uid("it"),sec:"other",title:"LinkedIn headline and summary",place:"",from:"",to:"",text:t.slice(0,2000),src:"me",at:Date.now()});P.at=Date.now();save();render();say("Kept in your entries, under Other.");});})],true);
    var hs=list.lastChild.querySelector(".tx small");loadText(LK.ref).then(function(t){if(hs)hs.textContent=t?t.replace(/\s+/g," ").slice(0,400):"(nothing was kept of them)";});}
  src("Your documents",P.files.length?P.files.length+" kept: a proposal, a statement, a publication.":"A research proposal, a statement, a publication or anything else about your work.",null,null,[cbtn("sm","Add documents",addDocs)]);
  P.files.forEach(function(f){src(f.name,Math.round(f.chars/1000)+" thousand characters, kept "+dayStr(f.at)+".",f.use!==false,function(v){f.use=v;},[cbtn("sm quiet","Remove",function(){try{IngBig.del(f.ref);}catch(e){}P.files=P.files.filter(function(x){return x.id!==f.id;});save();render();})],true);});
  var runs=[];if(me)try{lxState().runs.forEach(function(x){if(x.kind==="app"&&x.status==="done"&&runs.every(function(y){return y.name!==x.name;}))runs.push(x);});}catch(e){}
  if(!me){src("Writing and past letters",M.writing.length+" piece"+(M.writing.length===1?"":"s")+" of writing and "+M.letters.length+" letter"+(M.letters.length===1?"":"s")+", kept in this profile: for the voice only, never for facts.",P.use.writing,function(v){P.use.writing=v;P.use.letters=v;},
      [cbtn("sm","Add writing",function(){addOwnText(M.writing,"piece of writing");}),cbtn("sm","Add a letter",function(){addOwnText(M.letters,"letter");})]);
    M.writing.concat(M.letters).forEach(function(x){src(x.name,Math.round(x.chars/1000)+" thousand characters, kept "+dayStr(x.at)+".",null,null,[cbtn("sm quiet","Remove",function(){try{IngBig.del(x.ref);}catch(e){}M.writing=M.writing.filter(function(y){return y!==x;});M.letters=M.letters.filter(function(y){return y!==x;});save();render();})],true);});
    R.body.appendChild(list);R.foot.appendChild(h("span","c-note",esc("This profile uses only what is switched on here, and nothing of yours: not your CV, your writing, nor Lector's readings of your apps.")));return R;}
  src("Lector's readings of your apps",runs.length?runs.length+" read in full: what each does, how it was built, the skills it shows.":"None yet. Read your apps in Lector, and what it found can be used here.",null,null,runs.length?[]:[cbtn("sm","Open Lector",function(){go("lector");})]);
  runs.forEach(function(x){var k=x.app||x.name;src(x.name,"Read "+dayStr(x.finished||x.updated)+".",P.use.apps[k]!==false,function(v){P.use.apps[k]=v;},null,true);});
  src("Your writing and past letters",(M.writing||[]).length+" piece"+((M.writing||[]).length===1?"":"s")+" of writing and "+(M.letters||[]).length+" letter"+((M.letters||[]).length===1?"":"s")+", kept in Lector: for your voice only, never for facts.",P.use.writing,function(v){P.use.writing=v;P.use.letters=v;},[cbtn("sm","Manage them in Lector",function(){go("lector");})]);
  var nf=0;try{nf=fontesItems().length;}catch(e){}
  src("Your sources in Fontes",nf+" source"+(nf===1?"":"s")+". When on, a personal statement or a proposal may cite them by number, and only them.",P.use.fontes,function(v){P.use.fontes=v;});
  R.body.appendChild(list);R.foot.appendChild(h("span","c-note",esc("The studio uses only what is switched on here, and invents nothing.")));return R;}
function profEntries(){var S=CS(),P=S.profile,R=panel("csWork","Your entries");
  if(S.ui.editing)return entryForm(R,S.ui.editing==="new"?null:P.items.filter(function(x){return x.id===S.ui.editing;})[0]||null);
  var have=SECTS.filter(function(s){return P.items.some(function(it){return it.sec===s[0];});}),fl=have.some(function(s){return s[0]===S.ui.efilter;})?S.ui.efilter:"all";
  if(P.items.length){var bar=h("div","c-filter c-pad");[["all","All ("+P.items.length+")"]].concat(have.map(function(s){return [s[0],s[1].replace(/, with evidence$/,"")+" ("+P.items.filter(function(it){return it.sec===s[0];}).length+")"];})).forEach(function(x){
      var b=h("button","c-pill");b.type="button";b.textContent=x[1];b.setAttribute("aria-pressed",x[0]===fl?"true":"false");b.addEventListener("click",function(){S.ui.efilter=x[0];save();render();});bar.appendChild(b);});R.body.appendChild(bar);}
  else{R.body.appendChild(empty("No entries yet","Bring in a profile file, add them one by one, take them from your LinkedIn export (What the studio may use), or let the studio suggest them from your CV and documents, for you to keep or drop."));
    var pk=h("div","c-keys c-pad");pk.appendChild(cbtn("pri","Bring in a profile file",packPick));R.body.appendChild(pk);}
  var grid=h("div","c-entries");P.items.filter(function(it){return fl==="all"||it.sec===fl;}).forEach(function(it){var c=h("div","c-entry");
    c.appendChild(h("span","c-sec",esc((SECTS.filter(function(x){return x[0]===it.sec;})[0]||["",""])[1].replace(/, with evidence$/,""))));c.appendChild(h("b",null,esc(it.title)));
    var meta=[it.place,[it.from,it.to].filter(Boolean).join(" to "),it.src==="linkedin"?"from LinkedIn":""].filter(Boolean).join(" · ");if(meta)c.appendChild(h("small",null,esc(meta)));
    if(it.gone)c.appendChild(h("small","c-ligone",esc("No longer in your LinkedIn export ("+dayStr(it.gone)+"): keep it as your own, or drop it.")));if(it.text)c.appendChild(h("p",null,esc(it.text)));
    var k=h("div","c-keys");if(it.gone){k.appendChild(cbtn("sm pri","Keep it",function(){delete it.gone;it.src="me";P.at=Date.now();save();render();}));k.appendChild(cbtn("sm","Drop it",function(){liDropped(P,liKey(it));P.items=P.items.filter(function(x){return x.id!==it.id;});P.at=Date.now();save();render();}));}
    k.appendChild(cbtn("sm","Change",function(){S.ui.editing=it.id;save();render();}));k.appendChild(cbtn("sm quiet","Remove",function(){if(it.src==="linkedin")liDropped(P,liKey(it));P.items=P.items.filter(function(x){return x.id!==it.id;});P.at=Date.now();save();render();}));c.appendChild(k);grid.appendChild(c);});
  R.body.appendChild(grid);
  R.foot.appendChild(cbtn("","Find my skills",findSkills,"Your skills, with their evidence, from your sources"));R.foot.appendChild(cbtn("","Suggest entries",suggest,"Entries from your CV and documents, for you to keep or drop"));R.foot.appendChild(h("span","c-grow"));
  R.foot.appendChild(cbtn("pri","Add an entry",function(){S.ui.editing="new";save();render();}));return R;}
function entryForm(R,it){var S=CS(),P=S.profile;R.title.textContent=it?"Change an entry":"Add an entry";var g=h("div","c-col c-pad");
  var sec=select(SECTS,it?it.sec:"post"),ti=input("text",it?it.title:"","What: a degree, a post, a paper, a course taught, a skill"),pl=input("text",it?it.place:"","Where, or with whom"),fr=input("text",it?it.from:"","From"),tt=input("text",it?it.to:"","To");
  var tx=h("textarea","c-ta");tx.style.minHeight="120px";tx.placeholder="Details: what you did and what came of it, with exact figures. For a skill, the evidence for it.";tx.value=it?it.text||"":"";
  var r1=h("div","c-grid2");r1.appendChild(field("Section",sec));r1.appendChild(field("Title",ti));g.appendChild(r1);var r2=h("div","c-grid3");r2.appendChild(field("Place",pl));r2.appendChild(field("From",fr));r2.appendChild(field("To",tt));g.appendChild(r2);g.appendChild(field("Details",tx));
  g.id="csEntry";R.body.appendChild(g);R.foot.appendChild(h("span","c-grow"));R.foot.appendChild(cbtn("","Cancel",function(){S.ui.editing=null;save();render();}));
  R.foot.appendChild(cbtn("pri","Keep it",function(){if(!ti.value.trim()){say("Give it a title.");return;}var rec={sec:sec.value,title:ti.value.trim(),place:pl.value.trim(),from:fr.value.trim(),to:tt.value.trim(),text:tx.value.trim(),at:Date.now()};
    if(it){Object.assign(it,rec);if(it.src==="linkedin")it.src="me";}else P.items.push(Object.assign({id:uid("it"),src:"me"},rec));P.at=Date.now();S.ui.editing=null;save();render();}));
  setTimeout(function(){try{ti.focus();}catch(e){}},30);return R;}
function profFound(){var S=CS(),P=S.profile,R=panel("csWork","Found in your sources"),grid=h("div","c-entries");
  R.body.appendChild(h("p","c-note c-pad",esc("Keep the ones that are right (you can change them after) and drop the rest. Nothing enters your profile by itself.")));
  (P.suggested||[]).forEach(function(it){var c=h("div","c-entry");c.appendChild(h("span","c-sec",esc((SECTS.filter(function(x){return x[0]===it.sec;})[0]||["",""])[1].replace(/, with evidence$/,""))));c.appendChild(h("b",null,esc(it.title)));
    var meta=[it.place,[it.from,it.to].filter(Boolean).join(" to "),it.src==="linkedin-new"?(it.note||"From your LinkedIn export"):""].filter(Boolean).join(" · ");if(meta)c.appendChild(h("small",null,esc(meta)));if(it.text)c.appendChild(h("p",null,esc(it.text)));
    var k=h("div","c-keys");k.appendChild(cbtn("sm pri","Keep",function(){var li=it.src==="linkedin-new",ex=li&&it.was?P.items.filter(function(x){return x.id===it.was;})[0]:null;
      if(ex){Object.assign(ex,{title:it.title,place:it.place,from:it.from,to:it.to,text:it.text,at:Date.now()});delete ex.gone;}else{var nw=Object.assign({},it,{id:uid("it"),src:li?"linkedin":"me",at:Date.now()});delete nw.note;delete nw.was;P.items.push(nw);}
      P.suggested=P.suggested.filter(function(x){return x.id!==it.id;});P.at=Date.now();if(!P.suggested.length)S.ui.ppart="entries";save();render();}));
    k.appendChild(cbtn("sm","Drop",function(){if(it.src==="linkedin-new")liDropped(P,liKey(it));P.suggested=P.suggested.filter(function(x){return x.id!==it.id;});if(!P.suggested.length)S.ui.ppart="entries";save();render();}));c.appendChild(k);grid.appendChild(c);});
  R.body.appendChild(grid);R.foot.appendChild(h("span","c-grow"));R.foot.appendChild(cbtn("","Drop them all",function(){(P.suggested||[]).forEach(function(x){if(x.src==="linkedin-new")liDropped(P,liKey(x));});P.suggested=[];S.ui.ppart="entries";save();render();}));return R;}

/* ---- Goals and plan ---- */
function whenWords(by){by=String(by||"").trim();if(!by)return "";if(/^\d{4}-\d{2}-\d{2}$/.test(by))return "By "+dayStr(by);if(/^(by|in|within|before|after|next|this|on|at)\b/i.test(by))return by.charAt(0).toUpperCase()+by.slice(1);return "By "+by;}
function paintGoals(par){var S=CS(),sel=S.ui.gsel||(S.goals[0]?S.goals[0].id:"roles");if(sel!=="roles"&&sel!=="paths"&&sel!=="new"&&!S.goals.some(function(g){return g.id===sel;}))sel=S.goals[0]?S.goals[0].id:"roles";
  var L=panel("csList","Goals and plan",{key:cbtn("pri sm","+ A goal",function(){S.ui.gsel="new";show("work");save();render();},"Add a goal")});
  /* 6.44: Your direction, first */
  L.body.appendChild(item("Your direction",S.paths&&S.paths.list?"Thought through "+dayStr(S.paths.at)+", "+S.paths.list.length+" path"+(S.paths.list.length===1?"":"s"):"Paths that fit what you want, and what to find out first",sel==="paths",function(){S.ui.gsel="paths";show("work");save();render();},"c-pin"));
  L.body.appendChild(item("Roles and programmes that suit you",S.roles?"Weighed "+dayStr(S.roles.at)+", "+S.roles.list.length+" kinds":"Kinds of role worth an application, never postings",sel==="roles",function(){S.ui.gsel="roles";show("work");save();render();},"c-pin"));
  if(S.goals.length)L.body.appendChild(h("div","c-label c-pad",esc("Your goals")));
  S.goals.forEach(function(g){var done=g.steps.filter(function(x){return x.done;}).length;L.body.appendChild(item(g.text,[g.kind==="career"?"Career":"Academic",g.by?"by "+dayStr(g.by):"",g.steps.length?done+" of "+g.steps.length+" steps done":"No steps yet"].filter(Boolean).join(" · "),sel===g.id,function(){S.ui.gsel=g.id;show("work");save();render();}));});
  if(!S.goals.length)L.body.appendChild(h("p","c-note c-pad",esc("No goals yet. Add one, or make one from a kind of role that suits you.")));
  L.foot.appendChild(h("span","c-note",esc(S.goals.length?S.goals.length+" goal"+(S.goals.length===1?"":"s"):"Your goals, with steps and dates")));
  if(RUN.busy){two(L,livePanel(),par);return;}
  var R=sel==="roles"?rolesPanel():sel==="paths"?pathsPanel():sel==="new"?goalNew():goalPanel(S.goals.filter(function(g){return g.id===sel;})[0]);
  R.head.insertBefore(cbtn("quiet c-back","‹ Goals and plan",function(){show("list");save();render();}),R.head.firstChild);two(L,R,par);}
function goalNew(){var S=CS(),R=panel("csWork","A new goal"),g=h("div","c-col c-pad"),gt=input("text","","For example: a DPhil place for October 2027"),gb=input("date",""),kind="academic";
  var ks=seg([["academic","Academic"],["career","Career"]],kind,function(v){kind=v;[].forEach.call(ks.children,function(b){b.setAttribute("aria-pressed",b.textContent===(v==="career"?"Career":"Academic")?"true":"false");});},"Kind of goal");
  g.appendChild(field("Your goal, in your words",gt));g.appendChild(ks);g.appendChild(field("By when (optional)",gb));R.body.appendChild(g);
  R.foot.appendChild(h("span","c-grow"));R.foot.appendChild(cbtn("","Cancel",function(){S.ui.gsel=null;save();render();}));
  R.foot.appendChild(cbtn("pri","Add the goal",function(){if(!gt.value.trim()){say("Write the goal first.");return;}var id=uid("g");S.goals.unshift({id:id,text:gt.value.trim(),kind:kind,by:gb.value,at:Date.now(),steps:[]});S.ui.gsel=id;save();render();}));
  setTimeout(function(){try{gt.focus();}catch(e){}},30);return R;}
function goalPanel(g){var S=CS(),done=g.steps.filter(function(x){return x.done;}).length,R=panel("csWork",g.text,{chip:chip(g.steps.length?done+" of "+g.steps.length+" done":"No steps yet",done&&done===g.steps.length?"c-ok":"")});
  R.body.appendChild(h("p","c-note c-pad",esc([g.kind==="career"?"A career goal":"An academic goal",g.by?"by "+dayStr(g.by):"","added "+dayStr(g.at)].filter(Boolean).join(", ")+".")));
  var list=h("div","c-steplist");g.steps.forEach(function(st){var row=h("div","c-steprow"+(st.done?" is-done":"")),sw=h("label","c-check"),cb=h("input");cb.type="checkbox";cb.checked=!!st.done;cb.setAttribute("aria-label","Done: "+st.text);
    cb.addEventListener("change",function(){st.done=cb.checked;st.doneAt=cb.checked?Date.now():null;save();render();});sw.appendChild(cb);row.appendChild(sw);
    var tx=h("div","tx");tx.appendChild(h("b",null,esc(st.text)));var sub=[whenWords(st.by),st.why].filter(Boolean).join(". ");if(sub)tx.appendChild(h("small",null,esc(sub)));row.appendChild(tx);
    row.appendChild(cbtn("sm quiet","Remove",function(){g.steps=g.steps.filter(function(y){return y.id!==st.id;});save();render();}));list.appendChild(row);});
  if(!g.steps.length)list.appendChild(h("p","c-note c-pad",esc("No steps yet. Add the first one below, small enough to begin, or ask for steps to keep or drop.")));R.body.appendChild(list);
  if(g.suggested&&g.suggested.length){R.body.appendChild(h("div","c-label c-pad",esc("Suggested steps, for you to keep or drop")));g.suggested.forEach(function(st){var row=h("div","c-steprow c-sugg");
    var tx=h("div","tx");tx.appendChild(h("b",null,esc(st.text)));var sub=[whenWords(st.by),st.why].filter(Boolean).join(". ");if(sub)tx.appendChild(h("small",null,esc(sub)));row.appendChild(h("span","c-sw-pad"));row.appendChild(tx);
    var k=h("div","c-keys");k.appendChild(cbtn("sm pri","Keep",function(){g.steps.push({id:uid("st"),text:st.text,by:st.by,why:st.why,done:false});g.suggested=g.suggested.filter(function(y){return y.id!==st.id;});save();render();}));
    k.appendChild(cbtn("sm","Drop",function(){g.suggested=g.suggested.filter(function(y){return y.id!==st.id;});save();render();}));row.appendChild(k);R.body.appendChild(row);});}
  var add=h("div","c-addstep c-pad"),stx=input("text","","A step: small enough to begin"),sby=input("date","");stx.setAttribute("aria-label","A new step");sby.setAttribute("aria-label","By when");add.appendChild(stx);add.appendChild(sby);
  add.appendChild(cbtn("","Add the step",function(){if(!stx.value.trim())return;g.steps.push({id:uid("st"),text:stx.value.trim(),by:sby.value,done:false});save();render();}));R.body.appendChild(add);
  R.foot.appendChild(cbtn("quiet c-danger","Remove the goal",function(){ingConfirm("Remove this goal and its steps?",function(){S.goals=S.goals.filter(function(y){return y.id!==g.id;});S.ui.gsel=null;save();render();},{danger:true});}));R.foot.appendChild(h("span","c-grow"));
  R.foot.appendChild(cbtn("pri","Suggest steps",function(){goalSteps(g);}));return R;}
function rolesPanel(){var S=CS(),R=panel("csWork","Roles and programmes that suit you");
  if(!S.roles||!S.roles.list||!S.roles.list.length)R.body.appendChild(empty("Not weighed yet","Kinds of role and programme worth an application, from your profile and what you are looking for: why, what is missing, and a first step. Never postings: bring those to Applications yourself."));
  else{var grid=h("div","c-entries");S.roles.list.forEach(function(x){var c=h("div","c-entry");c.appendChild(h("b",null,esc(x.role)));if(x.why)c.appendChild(h("p",null,"<span class=\"c-k\">Why</span> "+esc(x.why)));if(x.gap)c.appendChild(h("p",null,"<span class=\"c-k\">What is missing</span> "+esc(x.gap)));if(x.first)c.appendChild(h("p",null,"<span class=\"c-k\">A first step</span> "+esc(x.first)));
      var k=h("div","c-keys");k.appendChild(cbtn("sm","Make it a goal",function(){var id=uid("g");S.goals.unshift({id:id,text:x.role,kind:/phd|dphil|doctor|master|programme|fellow/i.test(x.role)?"academic":"career",by:"",at:Date.now(),steps:x.first?[{id:uid("st"),text:x.first,by:"",done:false}]:[]});save();render();say("It is a goal now, with its first step.");}));c.appendChild(k);grid.appendChild(c);});
    R.body.appendChild(grid);R.body.appendChild(h("p","c-note c-pad",esc("Weighed on "+dayStr(S.roles.at)+" with "+(S.roles.model||"your model")+", from your profile alone.")));}
  R.foot.appendChild(h("span","c-grow"));R.foot.appendChild(cbtn("pri",S.roles?"Weigh them again":"Weigh what suits me",roles));return R;}

/* ---------------- 6.44 · Your edge, and Your direction ----------------
   Her request (6 November 2026), in short: suggestions and recommendations for her CV, portfolio documents, cover letters and the
   rest, from Lector and the Career Studio alike; the skills and experience she has, and how each transfers to her documents where
   it suits; her blind spots; what gives her an edge as a professional and as an academic; and direction in choosing a career, a
   clear path from what she wants. A room of its own, Your edge: What transfers, Blind spots, What sets you apart (with her
   positioning as a professional, as an academic, and the bridge between the two), and Your documents, each looked at with
   suggestions, never rewritten. In Goals and plan, Your direction: paths that fit what she is looking for, each with why, the
   evidence, what is missing, a first step this week, the next three months and how it sits beside her other goals, then what to
   find out before choosing. Every suggestion rests on her profile (her entries, her CV, her documents, her apps as Lector read
   them), read by the model she chose; nothing is invented, nothing is searched online, and each is hers to keep or drop. Lector's
   Suggestions key hands its document here, and the chat's + menu attaches her career profile to a message, so any conversation in
   Ingenium can help with it. */
function EDGE(){var S=CS();if(!S.edge||typeof S.edge!=="object")S.edge={};var E=S.edge;if(!E.docs||typeof E.docs!=="object")E.docs={};if(!Array.isArray(E.inbox))E.inbox=[];return E;}
var OKW={job:"a job",phd:"a PhD or DPhil",grant:"a grant or fellowship",other:"an opportunity"};
function targetsText(){var S=CS(),out=[];
  S.goals.forEach(function(g){out.push("- My goal ("+(g.kind==="career"?"career":"academic")+"): "+g.text+(g.by?" (by "+g.by+")":""));});
  S.opps.filter(function(o){return ["unsuccessful","withdrawn","not"].indexOf(o.stage)<0;}).slice(0,8).forEach(function(o){var t=[o.title,o.org].filter(Boolean).join(", ");if(t)out.push("- I am weighing "+(OKW[o.kind]||"an opportunity")+": "+t);});
  if(S.roles&&S.roles.list)S.roles.list.slice(0,4).forEach(function(r){out.push("- A kind of role that suits me: "+r.role);});
  if(S.paths&&S.paths.list)S.paths.list.filter(function(p){return p.kept;}).forEach(function(p){out.push("- A path I chose: "+p.path);});
  return out.length?"MY TARGETS (my goals, and what I am weighing):\n"+out.join("\n"):"";}
/* lines of the form TAG: a | b | c, read back as {TAG:[[a,b,c],...]} */
function tagged(t,tags){var out={},re=new RegExp("^\\s*(?:[-*\\d.)]+\\s*)?("+tags.join("|")+")\\s*:\\s*(.+)$","i");
  String(t||"").replace(/<think>[\s\S]*?<\/think>/g,"").split("\n").forEach(function(l){var m=re.exec(l.replace(/\*\*/g,""));if(!m)return;var p=m[2].split("|").map(function(x){return x.trim();});
    if(!p[0]||/^none\b/i.test(p[0]))return;var k=m[1].toUpperCase();(out[k]=out[k]||[]).push(p);});return out;}
function hasSources(G){return !!(G.items||G.cv||G.files.length||G.apps.length);}
var EDGE_ASK={
  tr:{what:"Finding what transfers from your record",sys:"You are now an honest careers adviser who finds what transfers from one setting to another, and only what the sources show.",max:1800,temp:0.25,
    say:function(tt){return "From my profile, my CV, my documents and my apps as Lector read them, find the skills and experience I have that transfer: what I did in one setting that counts in another I am aiming for"+(tt?" (MY TARGETS below, and WHAT I AM LOOKING FOR)":" (WHAT I AM LOOKING FOR)")+". For each: the skill or experience, in plain words; the evidence, naming the entry, document or app it rests on and what in it shows the skill; where it suits: which of my documents (a CV, a cover letter, a portfolio, a personal statement, a research proposal, a supporting statement) and which of my targets or kinds of role; and one sentence I could use in those documents, drawn only from the evidence, with no figure, name or claim the evidence does not give. Every one the sources show, the strongest first. Never list a skill no source shows, and never round one up. One to a line, in exactly this form, and nothing else:\nTRANSFER: the skill or experience | the evidence, with the entry named | where it suits | a sentence for my documents";},
    read:function(t){return (tagged(t,["TRANSFER"]).TRANSFER||[]).filter(function(p){return p[1];}).map(function(p){return {id:uid("tr"),skill:p[0].slice(0,160),evidence:p[1]||"",suits:p[2]||"",line:p[3]||""};});}},
  bl:{what:"Looking for your blind spots",sys:"You are now a frank mentor, reading as an admissions tutor and a recruiter would. You do not flatter and you never invent.",max:1500,temp:0.3,
    say:function(tt){return "Look at my profile, my CV and my documents as a frank mentor, an admissions tutor and a recruiter would"+(tt?", against MY TARGETS and WHAT I AM LOOKING FOR":", against WHAT I AM LOOKING FOR")+". Name my blind spots: UNDERSOLD, a strength my profile shows that my CV or documents leave out or undersell; MISSING, what my targets usually ask for that my profile does not show yet; HABIT, a habit in my documents that weakens them (duties listed without results, jargon, a story a reader cannot follow, a gap left unexplained); QUESTION, a question a reader will ask that my documents do not answer. For each: what it is; why it matters to a reader; and the fix, in one or two plain sentences (where the fix is to add something, name only what my profile already shows, or say what to do or find out). Every one you find, the most important first. One to a line, in exactly this form, and nothing else:\nBLIND: UNDERSOLD or MISSING or HABIT or QUESTION | what it is | why it matters | the fix";},
    read:function(t){return (tagged(t,["BLIND"]).BLIND||[]).map(function(p){var k=/^under/i.test(p[0])?"undersold":/^miss/i.test(p[0])?"missing":/^habit/i.test(p[0])?"habit":/^quest/i.test(p[0])?"question":"";
      if(!k)p=[""].concat(p);return {id:uid("bl"),kind:k||"other",what:p[1]||"",why:p[2]||"",fix:p[3]||"",done:false};}).filter(function(x){return x.what;});}},
  ed:{what:"Finding what sets you apart",sys:"You are now a careers adviser who knows what panels and recruiters see too often, and what they rarely see. You never claim what the profile does not show.",max:1300,temp:0.35,
    say:function(tt){return "From my profile, find what sets me apart from other applicants"+(tt?" for MY TARGETS":" for what I am looking for")+": combinations of skills and experience few applicants have, results only I can show, and a story that ties my work together. For each: what it is; the evidence, naming the entries it rests on; and how to say it in one sentence in a CV, a letter or an interview, drawn only from the evidence. Every one the profile shows. Then my positioning, one line each: how I present myself as a professional; as an academic; and the bridge, why my two sides strengthen each other. Never claim what the profile does not show. In exactly this form, and nothing else:\nEDGE: what sets me apart | the evidence | how to say it\nPOSITION: PROFESSIONAL | the line\nPOSITION: ACADEMIC | the line\nPOSITION: BRIDGE | the line";},
    read:function(t){var x=tagged(t,["EDGE","POSITION"]),pos={};(x.POSITION||[]).forEach(function(p){var k=/^prof/i.test(p[0])?"pro":/^acad/i.test(p[0])?"acad":/^bridge/i.test(p[0])?"bridge":"";if(k&&p[1])pos[k]=p[1];});
      return {list:(x.EDGE||[]).filter(function(p){return p[1];}).map(function(p){return {id:uid("ed"),what:p[0],evidence:p[1]||"",say:p[2]||""};}),pos:pos};}}};
function edgeRun(k){if(busyNow()||needModel())return;var A=EDGE_ASK[k],E=EDGE();begin(null,A.what);
  gatherProfile({}).then(function(G){if(!hasSources(G))throw new Error("add your CV, an entry, a document or Lector's readings of your apps to Your profile first: the studio finds these in them");
    return ask(function(sc){var R=room()*sc,tt=targetsText();return [{role:"system",content:sys(A.sys)},{role:"user",content:A.say(tt)+"\n\n"+(tt?tt+"\n\n":"")+profileBlock(G,R*0.85)}];},A.max,A.temp);})
    .then(function(t){var r=A.read(t),rec={at:Date.now(),model:modelName()};if(Array.isArray(r))rec.list=r;else{rec.list=r.list;rec.pos=r.pos;}
      if(!rec.list.length&&!(rec.pos&&Object.keys(rec.pos).length)){end();say("Nothing came back in the form asked. Try again, or add more to Your profile.");return;}
      E[k]=rec;save();end();},failed);}
/* her documents, each looked at with suggestions (never rewritten) */
function docKindOf(name){var n=String(name||"").toLowerCase();return /\bcv\b|résumé|resume|curriculum/.test(n)?"cv":/cover|letter/.test(n)?"cover":/portfolio/.test(n)?"portfolio":/proposal/.test(n)?"proposal":/statement/.test(n)?"statement":"";}
function edgeDocs(){var S=CS(),P=S.profile,M=lectorMe(),out=[];
  if(M&&M.cv&&M.cv.ref)out.push({id:"cv",name:isMe()?"Your CV":"Their CV",sub:isMe()?"The CV Lector keeps":"The CV kept in this profile",kind:"cv",ref:M.cv.ref});
  P.files.forEach(function(f){if(f&&f.ref)out.push({id:"f:"+f.id,name:f.name,sub:"A document in Your profile",kind:docKindOf(f.name),ref:f.ref});});
  S.opps.forEach(function(o){Object.keys(o.docs||{}).forEach(function(k){var d=o.docs[k];if(d&&d.ref)out.push({id:"o:"+o.id+":"+k,name:(DOCS[k]?DOCS[k][0]:k)+(o.title?": "+o.title:""),sub:d.mine?"Your own draft, in Applications":"Written in Applications"+(o.org?", for "+o.org:""),kind:k,ref:d.ref,opp:o.id});});});
  EDGE().inbox.forEach(function(x){out.push({id:"i:"+x.id,name:x.name,sub:(x.from==="lector"?"From Lector, ":"Brought here, ")+dayStr(x.at),kind:x.kind||"",ref:x.ref});});
  return out;}
var ADV_TAGS=[["STRENGTHEN","Could do more"],["ADD","What your record adds"],["CUT","Could go"],["WORDING","Wording to look at again"],["BLIND","What a reader will ask"],["NEXT","The first thing to do"]];
function docWordOf(d){return DOCS[d.kind]?"my "+DOCS[d.kind][0].toLowerCase():d.kind==="cover"?"my cover letter":d.kind==="cv"?"my CV":"my document";}
function docAdvise(d){if(busyNow()||needModel())return;var E=EDGE(),o=d.opp?oppById(d.opp):null;begin(o,"Looking at "+d.name+" with you");
  Promise.all([loadText(d.ref),gatherProfile({opp:o}),o?postText(o):""]).then(function(x){var text=String(x[0]||"");if(text.trim().length<80)throw new Error("this document is empty, or too short to look at");
    return ask(function(sc){var R=room()*sc,tt=targetsText();return [{role:"system",content:sys("You are now a frank, kind reviewer and careers adviser. You never rewrite the document and never write a new one: you help me make my own better, and you never suggest a claim my profile does not support.")},
      {role:"user",content:"Here is "+docWordOf(d)+", \""+d.name+"\". Look at it against my profile"+(tt?", my targets":"")+(x[2]?" and the posting it is for":"")+". Give me suggestions, the most useful first. One suggestion to a line, a few of each kind where there are any, in exactly this form, and nothing else:\nSTRENGTHEN: a part that works but could do more | how\nADD: something my profile shows that suits this document and is missing from it, naming the entry it rests on | where it would go\nCUT: what could go | why\nWORDING: a phrase of mine, quoted exactly | why it could be plainer or stronger (do not rewrite it)\nBLIND: what a reader will notice or ask that the document does not answer | what to do about it\nNEXT: the one thing to do first\n\nMY DOCUMENT:\n"+cut(text,Math.floor(R*0.34))+"\n\n"+(x[2]?"THE POSTING:\n"+cut(x[2],Math.floor(R*0.12))+"\n\n":"")+(tt?tt+"\n\n":"")+profileBlock(x[1],R*0.44)}];},1200,0.3);})
    .then(function(t){var fb=tagged(t,ADV_TAGS.map(function(a){return a[0];}));if(!Object.keys(fb).length)fb.RAW=[[String(t).replace(/<think>[\s\S]*?<\/think>/g,"").trim().slice(0,1500)]];
      E.docs[d.id]={at:Date.now(),model:modelName(),name:d.name,fb:fb};save();end();},failed);}
/* a document handed over by another page (Lector's Suggestions): kept here, then looked at */
function adviseDoc(o){o=o||{};var text=String(o.text||"");if(text.trim().length<80){say("There is nothing to look at yet: the document is empty or very short.");return Promise.resolve(null);}
  if(RUN.busy){say("The studio is writing. Wait for it, or press Stop.");return Promise.resolve(null);}
  var E=EDGE(),ref=IngBig.newId(),it={id:uid("in"),name:String(o.name||"A document").slice(0,160),kind:o.kind||docKindOf(o.name),ref:ref,from:o.from||"",at:Date.now()};
  return Promise.resolve(IngBig.put(ref,text)).then(function(){var old=E.inbox.filter(function(x){return x.name===it.name&&x.from===it.from;});
    old.forEach(function(x){try{IngBig.del(x.ref);}catch(e){}delete E.docs["i:"+x.id];});
    E.inbox=[it].concat(E.inbox.filter(function(x){return old.indexOf(x)<0;}));var S=CS();S.ui.room="edge";S.ui.esel="d:i:"+it.id;show("work");save();
    try{go("career");}catch(e){}render();var d=edgeDocs().filter(function(x){return x.id==="i:"+it.id;})[0];if(d)docAdvise(d);return it;});}
/* the room */
function paintEdge(par){var S=CS(),E=EDGE(),docs=edgeDocs(),sel=S.ui.esel||"tr";if(/^d:/.test(sel)&&!docs.some(function(d){return "d:"+d.id===sel;}))sel="tr";if(/^a:/.test(sel)&&!appReadings().some(function(r){return "a:"+r.name===sel;}))sel="tr";
  var L=panel("csList","Your edge");
  function sub(rec,word,none){return rec&&rec.list&&rec.list.length?(rec.list.length+" "+word+(rec.list.length===1?"":"s")+", "+dayStr(rec.at)):none;}
  L.body.appendChild(item("What transfers",sub(E.tr,"skill","Your skills and experience, and where each one counts"),sel==="tr",function(){S.ui.esel="tr";show("work");save();render();}));
  L.body.appendChild(item("Blind spots",sub(E.bl,"blind spot","What you undersell or leave out, and what a reader will ask"),sel==="bl",function(){S.ui.esel="bl";show("work");save();render();}));
  L.body.appendChild(item("What sets you apart",E.ed&&((E.ed.list||[]).length||Object.keys(E.ed.pos||{}).length)?((E.ed.list||[]).length+" found, with your positioning, "+dayStr(E.ed.at)):"Your edge, and how you present yourself",sel==="ed",function(){S.ui.esel="ed";show("work");save();render();}));
  /* what each app Lector read adds to her record (Lector spots it by itself after a reading) */
  var reads=appReadings();if(reads.length){L.body.appendChild(h("div","c-label c-pad",esc("From your apps")));reads.forEach(function(r){var a=(E.apps||{})[r.name],nw=a?a.list.filter(function(z){return z.fresh;}).length:0;
    L.body.appendChild(item(r.name+(r.version?" "+r.version:""),a?(a.list.length+" to add"+(nw?", "+nw+" new":"")+", "+dayStr(a.at)+(a.version!==(r.version||"")?" (an earlier copy)":"")):"Read by Lector: what it adds to your record",sel==="a:"+r.name,function(){S.ui.esel="a:"+r.name;show("work");save();render();}));});}
  L.body.appendChild(h("div","c-label c-pad",esc("Your documents")));
  if(!docs.length)L.body.appendChild(h("p","c-note c-pad",esc("None yet. Add your CV in Lector or a document in Your profile, or write one in Applications; Lector's Suggestions key brings its documents here.")));
  docs.forEach(function(d){var a=E.docs[d.id];L.body.appendChild(item(d.name,d.sub+(a?" · looked at "+dayStr(a.at):""),sel==="d:"+d.id,function(){S.ui.esel="d:"+d.id;show("work");save();render();}));});
  L.foot.appendChild(h("span","c-note",esc("Suggestions from your profile alone, for you to keep or drop.")));
  if(RUN.busy){two(L,livePanel(),par);return;}
  var ar=/^a:/.test(sel)?reads.filter(function(r){return "a:"+r.name===sel;})[0]:null;
  var R=sel==="bl"?blindPanel():sel==="ed"?apartPanel():ar?appSkillsPanel(ar):/^d:/.test(sel)?docPanel(docs.filter(function(d){return "d:"+d.id===sel;})[0]):transferPanel();
  R.head.insertBefore(cbtn("quiet c-back","‹ Your edge",function(){show("list");save();render();}),R.head.firstChild);two(L,R,par);}
function madeLine(rec){return "Found on "+dayStr(rec.at)+" with "+(rec.model||"your model")+", from your profile alone. Each is a suggestion: check it against your record before you use it.";}
function transferPanel(){var S=CS(),E=EDGE(),rec=E.tr,R=panel("csWork","What transfers");
  if(!rec||!rec.list||!rec.list.length)R.body.appendChild(empty("Not looked for yet","The skills and experience your record shows, each with its evidence, where it counts (which documents, which of your targets), and a sentence for your documents drawn from that evidence alone. A skill no source shows is never offered."));
  else{var grid=h("div","c-entries"),P=S.profile;rec.list.forEach(function(x){var c=h("div","c-entry c-edge");c.appendChild(h("b",null,esc(x.skill)));
      if(x.evidence)c.appendChild(h("p",null,"<span class=\"c-k\">Evidence</span> "+esc(x.evidence)));if(x.suits)c.appendChild(h("p",null,"<span class=\"c-k\">Where it counts</span> "+esc(x.suits)));if(x.line)c.appendChild(h("p","c-line",esc("“"+x.line+"”")));
      var have=P.items.some(function(it){return it.sec==="skill"&&String(it.title).toLowerCase()===String(x.skill).toLowerCase();}),k=h("div","c-keys");
      k.appendChild(cbtn("sm"+(have?"":" pri"),have?"In your profile":"Add to your profile",function(){if(have)return;P.items.push({id:uid("it"),sec:"skill",title:x.skill.slice(0,140),place:"",from:"",to:"",text:"Evidence: "+x.evidence+(x.suits?"\nWhere it counts: "+x.suits:""),src:"edge"});save();render();say("Added to Your profile, under Skills, with its evidence.");}));
      if(x.line)k.appendChild(cbtn("sm","Copy the sentence",function(){copyText(x.line);}));
      k.appendChild(cbtn("sm quiet","Drop",function(){rec.list=rec.list.filter(function(y){return y.id!==x.id;});save();render();}));c.appendChild(k);grid.appendChild(c);});
    R.body.appendChild(grid);R.body.appendChild(h("p","c-note c-pad",esc(madeLine(rec))));}
  R.foot.appendChild(h("span","c-grow"));R.foot.appendChild(cbtn("pri",rec?"Look again":"Find what transfers",function(){edgeRun("tr");}));return R;}
var BLW={undersold:"Undersold",missing:"Not shown yet",habit:"A habit",question:"A reader will ask",other:"A blind spot"};
function blindPanel(){var E=EDGE(),rec=E.bl,n=rec&&rec.list?rec.list.length:0,R=panel("csWork","Blind spots",{chip:n?chip(rec.list.filter(function(x){return x.done;}).length+" of "+n+" seen to",""):null});
  if(!n)R.body.appendChild(empty("Not looked for yet","Read as a frank mentor, an admissions tutor and a recruiter would read you: strengths your documents undersell or leave out, what your targets ask that your record does not show yet, habits that weaken your documents, and questions a reader will ask. Each with why it matters and a fix."));
  else{var list=h("div","c-steplist");rec.list.forEach(function(x){var row=h("div","c-steprow c-blind"+(x.done?" is-done":"")),sw=h("label","c-check"),cb=h("input");cb.type="checkbox";cb.checked=!!x.done;cb.setAttribute("aria-label","Seen to: "+x.what);
      cb.addEventListener("change",function(){x.done=cb.checked;save();render();});sw.appendChild(cb);row.appendChild(sw);var tx=h("div","tx");tx.appendChild(h("small","c-bk",esc(BLW[x.kind]||BLW.other)));tx.appendChild(h("b",null,esc(x.what)));
      if(x.why)tx.appendChild(h("small",null,esc("Why it matters: "+x.why)));if(x.fix)tx.appendChild(h("small",null,esc("The fix: "+x.fix)));row.appendChild(tx);
      row.appendChild(cbtn("sm quiet","Drop",function(){rec.list=rec.list.filter(function(y){return y.id!==x.id;});save();render();}));list.appendChild(row);});
    R.body.appendChild(list);R.body.appendChild(h("p","c-note c-pad",esc(madeLine(rec))));}
  R.foot.appendChild(h("span","c-grow"));R.foot.appendChild(cbtn("pri",rec?"Look again":"Find my blind spots",function(){edgeRun("bl");}));return R;}
function apartPanel(){var E=EDGE(),rec=E.ed,R=panel("csWork","What sets you apart");
  if(!rec||(!(rec.list||[]).length&&!Object.keys(rec.pos||{}).length))R.body.appendChild(empty("Not looked for yet","What few other applicants can show: the combinations in your record, results only you have, the story that ties your work together; each with its evidence and a sentence to say it. Then your positioning, in a line each: as a professional, as an academic, and the bridge between the two."));
  else{var P0=rec.pos||{};if(P0.pro||P0.acad||P0.bridge){R.body.appendChild(h("div","c-label c-pad",esc("Your positioning")));var pg=h("div","c-entries");
      [["pro","As a professional"],["acad","As an academic"],["bridge","The bridge"]].forEach(function(p){if(!P0[p[0]])return;var c=h("div","c-entry c-pos");c.appendChild(h("small",null,esc(p[1])));c.appendChild(h("p","c-line",esc(P0[p[0]])));var k=h("div","c-keys");k.appendChild(cbtn("sm","Copy",function(){copyText(P0[p[0]]);}));c.appendChild(k);pg.appendChild(c);});R.body.appendChild(pg);}
    if((rec.list||[]).length){R.body.appendChild(h("div","c-label c-pad",esc("What sets you apart")));var grid=h("div","c-entries");rec.list.forEach(function(x){var c=h("div","c-entry c-edge");c.appendChild(h("b",null,esc(x.what)));
        if(x.evidence)c.appendChild(h("p",null,"<span class=\"c-k\">Evidence</span> "+esc(x.evidence)));if(x.say)c.appendChild(h("p","c-line",esc("“"+x.say+"”")));var k=h("div","c-keys");if(x.say)k.appendChild(cbtn("sm","Copy",function(){copyText(x.say);}));
        k.appendChild(cbtn("sm quiet","Drop",function(){rec.list=rec.list.filter(function(y){return y.id!==x.id;});save();render();}));c.appendChild(k);grid.appendChild(c);});R.body.appendChild(grid);}
    R.body.appendChild(h("p","c-note c-pad",esc(madeLine(rec))));}
  R.foot.appendChild(h("span","c-grow"));R.foot.appendChild(cbtn("pri",rec?"Look again":"Find what sets me apart",function(){edgeRun("ed");}));return R;}
function docPanel(d){var E=EDGE(),a=E.docs[d.id],R=panel("csWork",d.name);R.body.appendChild(h("p","c-note c-pad",esc(d.sub+".")));
  if(!a)R.body.appendChild(empty("Not looked at yet","Suggestions for this document, from your profile and your targets: what could do more, what your record adds that it leaves out, what could go, wording to look at again, what a reader will ask, and the one thing to do first. It is never rewritten: you make your own better."));
  else{ADV_TAGS.forEach(function(tg){var rows=a.fb[tg[0]];if(!rows||!rows.length)return;R.body.appendChild(h("div","c-label c-pad",esc(tg[1])));var ul=h("ul","c-fb");
      rows.forEach(function(p){var li=h("li");li.appendChild(h("span",null,esc(p[0])));if(p[1])li.appendChild(h("small",null,esc(p.slice(1).join(" · "))));ul.appendChild(li);});R.body.appendChild(ul);});
    if(a.fb.RAW)R.body.appendChild(h("p","c-note c-pad",esc(a.fb.RAW[0][0])));
    R.body.appendChild(h("p","c-note c-pad",esc("Looked at on "+dayStr(a.at)+" with "+(a.model||"your model")+". Suggestions only: the document is yours, and nothing in it was changed.")));}
  R.foot.appendChild(h("span","c-grow"));R.foot.appendChild(cbtn("pri",a?"Look again":"Suggestions for this document",function(){docAdvise(d);}));return R;}
/* ---- Your direction (Goals and plan): paths that fit what she wants, and what to find out before choosing ---- */
function paths(){if(busyNow()||needModel())return;begin(null,"Thinking through paths that fit what you want");
  gatherProfile({}).then(function(G){if(!wantsText()&&!CS().goals.length)throw new Error("say what you are looking for in Your profile first (the work, what you need, what you would rather avoid): the paths start from it");
    return ask(function(sc){var R=room()*sc,tt=targetsText();return [{role:"system",content:sys("You are now a careers guide for someone who has little information about which career to choose and wants a clear direction. You are concrete and honest, and you never invent.")},
      {role:"user",content:"I want a clear direction. From WHAT I AM LOOKING FOR, my goals and my profile, suggest between two and four paths: a kind of work, and the fields or kinds of organisation where it is found, that fits what I want and what my profile shows. Put first the path you recommend, and begin its why-it-fits line with the reason it comes first; the second is the alternative you would weigh against it. A path may combine work with study when my goals include study. For each path: why it fits my wants (name the want); the evidence in my profile that I could do it; what is missing; a first step I can take this week; the next steps over three months; and how it sits beside my other goals. Never name a particular vacancy or person, and give no salary or market figure; where a point about the world needs checking, say so. Then between three and six questions I should answer before choosing, each with how to find out (a person to ask, a small trial, something to read). In exactly this form, and nothing else:\nPATH: the path | why it fits my wants | the evidence | what is missing | a first step this week | the next three months | beside my other goals\nFIND: a question to answer | how to find out\n\n"+(tt?tt+"\n\n":"")+profileBlock(G,R*0.85)}];},1800,0.4);})
    .then(function(t){var x=tagged(t,["PATH","FIND"]),list=(x.PATH||[]).map(function(p){return {id:uid("pa"),path:p[0].slice(0,200),fits:p[1]||"",evidence:p[2]||"",gap:p[3]||"",first:p[4]||"",months:p[5]||"",beside:p[6]||""};}),
        find=(x.FIND||[]).map(function(p){return {id:uid("fd"),q:p[0],how:p[1]||"",done:false};});
      if(!list.length){end();say("No paths came back in the form asked. Try again, or say more of what you are looking for in Your profile.");return;}
      CS().paths={at:Date.now(),model:modelName(),list:list,find:find};save();end();},failed);}
function pathsPanel(){var S=CS(),Pa=S.paths,R=panel("csWork","Your direction");
  if(!Pa||!Pa.list||!Pa.list.length)R.body.appendChild(empty("Not thought through yet","Two to four paths that fit what you say you are looking for and what your record shows: why each fits, the evidence, what is missing, a first step this week, the next three months, and how it sits beside your other goals. Then the questions to answer before you choose, and how to find out. Never postings: bring those to Applications."));
  else{var grid=h("div","c-entries");Pa.list.forEach(function(x){var c=h("div","c-entry c-path"+(x.kept?" is-kept":""));c.appendChild(h("b",null,esc(x.path)));
      [["fits","Why it fits"],["evidence","Evidence"],["gap","What is missing"],["first","This week"],["months","The next three months"],["beside","Beside your other goals"]].forEach(function(f){if(x[f[0]])c.appendChild(h("p",null,"<span class=\"c-k\">"+f[1]+"</span> "+esc(x[f[0]])));});
      var k=h("div","c-keys");k.appendChild(cbtn("sm"+(x.kept?"":" pri"),x.kept?"A goal now":"Make it a goal",function(){if(x.kept)return;var steps=[];if(x.first)steps.push({id:uid("st"),text:x.first,by:"in a week",done:false});
          String(x.months||"").split(/;\s*|\.\s+(?=[A-Z])/).map(function(s){return s.trim().replace(/\.$/,"");}).filter(function(s){return s.length>3;}).slice(0,4).forEach(function(s){steps.push({id:uid("st"),text:s,by:"in three months",done:false});});
          S.goals.unshift({id:uid("g"),text:x.path,kind:/phd|dphil|doctor|master|programme|fellow|study/i.test(x.path)?"academic":"career",by:"",at:Date.now(),steps:steps});x.kept=true;save();render();say("It is a goal now, with its steps.");}));
      k.appendChild(cbtn("sm quiet","Drop",function(){Pa.list=Pa.list.filter(function(y){return y.id!==x.id;});save();render();}));c.appendChild(k);grid.appendChild(c);});R.body.appendChild(grid);
    if(Pa.find&&Pa.find.length){R.body.appendChild(h("div","c-label c-pad",esc("Before you choose: what to find out")));var fl=h("div","c-steplist");Pa.find.forEach(function(f){var row=h("div","c-steprow"+(f.done?" is-done":"")),sw=h("label","c-check"),cb=h("input");cb.type="checkbox";cb.checked=!!f.done;cb.setAttribute("aria-label","Found out: "+f.q);
        cb.addEventListener("change",function(){f.done=cb.checked;save();render();});sw.appendChild(cb);row.appendChild(sw);var tx=h("div","tx");tx.appendChild(h("b",null,esc(f.q)));if(f.how)tx.appendChild(h("small",null,esc("How: "+f.how)));row.appendChild(tx);fl.appendChild(row);});R.body.appendChild(fl);}
    R.body.appendChild(h("p","c-note c-pad",esc("Thought through on "+dayStr(Pa.at)+" with "+(Pa.model||"your model")+", from your profile and what you are looking for. A point about the world (what a field asks for, how it hires) is for you to check.")));}
  R.foot.appendChild(h("span","c-grow"));R.foot.appendChild(cbtn("pri",Pa?"Think it through again":"Show me paths that fit",paths));return R;}
/* ---- the chat's + menu: her career profile, attached to a message, so any conversation can help with it ---- */
function profileForChat(){return gatherProfile({}).then(function(G){var tt=targetsText(),nm=myName();
  return "# "+(nm?nm+": ":"")+"my career profile\n\nKept in Ingenium's Career Studio. Use only what it shows about me; never invent a skill, a post, a date or a figure. When I ask for suggestions, say which entry each rests on.\n\n"+(tt?tt+"\n\n":"")+profileBlock(G,60000);});}
(function plusHook(){if(typeof W.paintPlus!=="function")return;var orig=W.paintPlus;
  W.paintPlus=function(view){var r=orig.apply(this,arguments);try{if(!view&&$("page-career")&&typeof pmItem==="function"){var mm=$("chatPlusMenu");if(mm&&!mm.querySelector(".pm-career")){
      var it=pmItem(mm,"file","Your career profile","Your entries, CV, wants and goals go with your message, for advice on your documents and direction",function(){profileForChat().then(function(t){if(typeof stageText==="function")stageText("Career profile.md",t,false);try{closePlus();}catch(e){}say("Your career profile goes with your next message. Ask for suggestions on your CV, a letter or your direction.");},function(e){say("It could not be gathered: "+(e&&e.message||e));});});
      it.classList.add("pm-career");var after=[].filter.call(mm.querySelectorAll(".pm-item"),function(b){return /One of your apps/.test(b.textContent);})[0];if(after&&after.nextSibling)mm.insertBefore(it,after.nextSibling);}}}catch(e){}return r;};})();
/* ---- 6.44 · what a reading of her app adds to her record, built into Lector's reading ----
   Her words (6 November 2026): "I want Lector to read my updated apps and spot additional skills and experience that I can add to my
   resume to further enhance as well as all of the other documents where it fits and would enhance it. I want it to be built-in for
   it." When Lector has read an app in full (a newer copy above all), the studio reads that reading against her CV and her profile,
   with the earlier reading of the same app when there is one, and lists what the app shows that her CV and profile do not show yet:
   each with its evidence in the reading, whether it is new since the earlier copy, where it fits (the CV section, and the other
   documents) and a sentence for them, drawn only from the reading. Lector says so in its stream; the list is kept in Your edge, under
   From your apps, where any reading can be looked at again. Nothing is added to her CV by itself: she adds what is right. */
function runAnalysis(r){return loadText(r&&r.analysisRef).then(function(t){var a={};try{a=JSON.parse(t)||{};}catch(e){return String(t||"");}return Object.keys(a).map(function(k){return "("+k+") "+a[k];}).join("\n");});}
function earlierRun(r){try{var t0=r.finished||r.updated||Date.now();return lxState().runs.filter(function(x){return x&&x.kind==="app"&&x.status==="done"&&x.id!==r.id&&(x.app?x.app===r.app:x.name===r.name)&&(x.finished||x.updated||0)<t0&&(x.sha||"")!==(r.sha||"-");})
  .sort(function(a,b){return (b.finished||b.updated||0)-(a.finished||a.updated||0);})[0]||null;}catch(e){return null;}}
function appReadings(){var out=[],seen={};try{lxState().runs.forEach(function(r){if(r&&r.kind==="app"&&r.status==="done"&&!seen[r.name]){seen[r.name]=1;out.push(r);}});}catch(e){}return out;}
function appSkills(r){var E=EDGE();if(!E.apps||typeof E.apps!=="object")E.apps={};var prev=earlierRun(r),label=r.name+(r.version?" "+r.version:"");
  return Promise.all([runAnalysis(r),prev?runAnalysis(prev):"",gatherProfile({})]).then(function(x){if(!String(x[0]||"").trim())throw new Error("Lector's reading of "+label+" holds no analysis to read");var two=!!String(x[1]||"").trim();
    return ask(function(sc){var R=room()*sc;return [{role:"system",content:sys("You are now an honest careers adviser reading what an app I built shows about my skills and experience. You list only what the reading shows.")},
      {role:"user",content:"Lector has read my app "+label+" in full. From THE READING below, list the skills and experience building it shows that MY CV and THE PROFILE do not show yet, or show less fully than the reading does"+(two?"; mark each NEW when THE EARLIER READING (of an earlier copy"+(prev.version?", "+prev.version:"")+") does not show it, else KNOWN":"")+". For each: the skill or experience, in plain words; the evidence in THE READING (what in the app shows it); "+(two?"NEW or KNOWN; ":"")+"where it fits: the CV section, and which other documents (a cover letter, a portfolio, a personal statement, a supporting statement, a research proposal); and one sentence for those documents, drawn only from the reading, with no figure, name or claim the reading does not give. Every one the reading shows, the strongest first. Never list what the reading does not show, and never round a skill up. One to a line, in exactly this form, and nothing else:\nSKILLFROMAPP: the skill or experience | the evidence in the reading | "+(two?"NEW or KNOWN | ":"")+"where it fits | a sentence for my documents\n\nTHE READING (of "+label+"):\n"+cut(x[0],Math.floor(R*0.4))+(two?"\n\nTHE EARLIER READING:\n"+cut(x[1],Math.floor(R*0.15)):"")+"\n\n"+profileBlock(x[2],R*0.4)}];},1500,0.25)
      .then(function(t){var list=(tagged(t,["SKILLFROMAPP"]).SKILLFROMAPP||[]).map(function(p){var n="";if(two&&/^(new|known)$/i.test(p[2]||""))n=p.splice(2,1)[0].toLowerCase();
          return {id:uid("sa"),skill:p[0].slice(0,160),evidence:p[1]||"",fresh:n==="new",known:n==="known",suits:p[2]||"",line:p[3]||""};}).filter(function(z){return z.evidence;});
        E.apps[r.name]={at:Date.now(),model:modelName(),app:r.app||"",version:r.version||"",runId:r.id,earlier:prev?(prev.version||dayStr(prev.finished||prev.updated)):"",list:list};save();return E.apps[r.name];});});}
/* from Lector, when a reading ends: each app read afresh, one after another, while nothing else is using the model */
var SPOT={q:[],on:false};
function spotSkills(ids,tell){(ids||[]).forEach(function(id){if(SPOT.q.indexOf(id)<0)SPOT.q.push(id);});SPOT.tell=tell||SPOT.tell||null;spotNext(0);}
function spotNext(tries){if(SPOT.on||!SPOT.q.length)return;if(!modelReady())return;if(RUN.busy||(W.LX&&LX.busy)){if(tries<120)setTimeout(function(){spotNext(tries+1);},5000);return;}
  var id=SPOT.q.shift(),r=null;try{r=lxRun(id);}catch(e){}if(!r||r.kind!=="app"||r.status!=="done"){spotNext(0);return;}
  SPOT.on=true;RUN.req=null;RUN.busy=true;RUN.stop=false;RUN.what="Spotting what "+r.name+" adds to your record";RUN.live="";RUN.think="";RUN.t0=Date.now();RUN.opp=null;
  appSkills(r).then(function(rec){SPOT.on=false;end();var n=rec?rec.list.length:0,nw=rec?rec.list.filter(function(z){return z.fresh;}).length:0;
      try{if(SPOT.tell)SPOT.tell(r,n?(n+" skill"+(n===1?"":"s")+" or experience in "+r.name+(r.version?" "+r.version:"")+" that your CV and profile do not show yet"+(rec.earlier?" ("+nw+" new since the earlier copy, "+rec.earlier+")":"")+". They are in the Career Studio, Your edge, From your apps: each with its evidence, where it fits and a sentence."):"Nothing in "+r.name+" that your CV and profile do not already show.");}catch(e){}
      spotNext(0);},
    function(e){SPOT.on=false;var m=String(e&&e.message||e);end();if(m!=="stopped")try{if(SPOT.tell)SPOT.tell(r,"What "+r.name+" adds to your record could not be read now ("+m+"). Look again in the Career Studio, Your edge.");}catch(x){}spotNext(0);});}
function spotOne(r){if(busyNow()||needModel())return;begin(null,"Spotting what "+r.name+" adds to your record");appSkills(r).then(function(){end();},failed);}
function appSkillsPanel(r){var S=CS(),E=EDGE(),rec=(E.apps||{})[r.name],label=r.name+(r.version?" "+r.version:""),R=panel("csWork","From "+label);
  if(!rec)R.body.appendChild(empty("Not looked at yet","What Lector's reading of "+label+" shows that your CV and profile do not show yet: each skill or experience with its evidence in the reading, where it fits (the CV section, and your other documents) and a sentence for them. Lector does this by itself each time it reads an app afresh."));
  else{if(rec.version&&r.version&&rec.version!==r.version)R.body.appendChild(h("p","c-note c-pad c-old",esc("This list is from the reading of "+rec.version+". Lector has read "+r.version+" since: look again.")));
    if(!rec.list.length)R.body.appendChild(empty("Nothing new","Everything this reading shows is already in your CV or your profile."));
    var grid=h("div","c-entries"),P=S.profile;rec.list.forEach(function(x){var c=h("div","c-entry c-edge"+(x.fresh?" is-new":""));var t=h("b",null,esc(x.skill));c.appendChild(t);if(x.fresh)c.appendChild(chip("New since the earlier copy","c-ok"));
      if(x.evidence)c.appendChild(h("p",null,"<span class=\"c-k\">Evidence</span> "+esc(x.evidence)));if(x.suits)c.appendChild(h("p",null,"<span class=\"c-k\">Where it fits</span> "+esc(x.suits)));if(x.line)c.appendChild(h("p","c-line",esc("“"+x.line+"”")));
      var have=P.items.some(function(it){return it.sec==="skill"&&String(it.title).toLowerCase()===String(x.skill).toLowerCase();}),k=h("div","c-keys");
      k.appendChild(cbtn("sm"+(have?"":" pri"),have?"In your profile":"Add to your profile",function(){if(have)return;P.items.push({id:uid("it"),sec:"skill",title:x.skill.slice(0,140),place:"",from:"",to:"",text:"Evidence (Lector's reading of "+label+"): "+x.evidence+(x.suits?"\nWhere it fits: "+x.suits:""),src:"edge"});save();render();say("Added to Your profile, under Skills, with its evidence.");}));
      if(x.line)k.appendChild(cbtn("sm","Copy the sentence",function(){copyText(x.line);}));
      k.appendChild(cbtn("sm quiet","Drop",function(){rec.list=rec.list.filter(function(y){return y.id!==x.id;});save();render();}));c.appendChild(k);grid.appendChild(c);});
    R.body.appendChild(grid);R.body.appendChild(h("p","c-note c-pad",esc("Read on "+dayStr(rec.at)+" with "+(rec.model||"your model")+(rec.earlier?", beside the earlier copy ("+rec.earlier+")":"")+". Nothing is added to your CV by itself: add what is right, in your own words or with the sentence.")));}
  if(rec&&rec.list.some(function(x){return x.line;}))R.foot.appendChild(cbtn("","Copy as CV bullets",function(){copyText(rec.list.filter(function(x){return x.line;}).map(function(x){return "- "+x.line;}).join("\n"));},"Every sentence from this reading, as bullets for your CV, a letter or a portfolio"));  /* 6.90 */
  R.foot.appendChild(h("span","c-grow"));R.foot.appendChild(cbtn("pri",rec?"Look again":"Spot what it adds",function(){spotOne(r);}));return R;}

/* ---- Learn: one lesson at a time ---- */
function paintLearn(par){var S=CS();if(S.ui.learnTpl&&W.IngTemplates)return paintTemplates(par);var i=Math.max(0,Math.min(LESSONS.length-1,S.ui.lesson||0)),L=panel("csList","Learn");
  L.body.appendChild(h("blockquote","c-motto c-small","“Tell me and I forget. Teach me and I remember. Involve me and I learn.”"));
  LESSONS.forEach(function(x,j){L.body.appendChild(item(x[0],x[1].length+" steps",j===i,function(){S.ui.lesson=j;show("work");save();render();}));});
  if(W.IngTemplates){L.body.appendChild(h("div","c-label c-pad",esc("Templates")));L.body.appendChild(item("CV and letter templates",W.IngTemplates.list.length+" roles in "+W.IngTemplates.industries.length+" fields",false,function(){S.ui.learnTpl=true;show("list");save();render();},"c-tplk"));}
  L.foot.appendChild(h("span","c-note",esc("Common practice in the UK. A posting's own instructions come first.")));
  var Ls=LESSONS[i],R=panel("csWork",Ls[0]);R.head.insertBefore(cbtn("quiet c-back","‹ Learn",function(){show("list");save();render();}),R.head.firstChild);
  var ol=h("ol","c-lesson");Ls[1].forEach(function(s,j){var li=h("li");li.innerHTML="<i>"+(j+1)+"</i><span>"+esc(s)+"</span>";ol.appendChild(li);});R.body.appendChild(ol);
  if(i>0)R.foot.appendChild(cbtn("","‹ "+LESSONS[i-1][0],function(){S.ui.lesson=i-1;save();render();}));R.foot.appendChild(h("span","c-grow"));
  if(i<LESSONS.length-1)R.foot.appendChild(cbtn("pri",LESSONS[i+1][0]+" ›",function(){S.ui.lesson=i+1;save();render();}));
  else R.foot.appendChild(cbtn("pri","Try it: bring a posting",function(){S.ui.room="apps";S.ui.open="new";show("work");save();render();}));two(L,R,par);}

/* ---------------- 6.10.2 · templates by field and role (modules/r209.js). Her words (3 November 2026): "I want for Ingenium and its
   pages to have resume templates and cover letter templates for different industry and different roles within them ... to help any
   applicant ... curate their experience and education ... and portfolio for their future roles." The studio teaches from them here,
   and writes from them in What you send: the template chosen for an application shapes its CV, its letter and its portfolio. ---------- */
function tplOf(o){var T=W.IngTemplates;return T&&o&&o.tpl?T.byId(o.tpl):null;}
function tplSuggest(o){var T=W.IngTemplates;if(!T||!o)return Promise.resolve(null);return postOnly(o).then(function(t){return T.match(o.title||"",t||"");},function(){return T.match(o.title||"","");});}
function tplBar(o,pane){var T=W.IngTemplates;if(!T)return;var cur=tplOf(o),box=h("div","c-tplbar");
  box.appendChild(h("span","c-label",esc("Template")));
  var sel=select([["","None: the order this application asks for"]].concat(T.list.map(function(t){return [t.id,t.role+" · "+T.indName(t.ind)];})),cur?cur.id:"");sel.setAttribute("aria-label","The template this application follows");sel.className="c-sel";
  sel.addEventListener("change",function(){o.tpl=sel.value||null;save();render();say(o.tpl?"This application's CV, letter and portfolio will follow the template for "+T.byId(o.tpl).role+".":"No template: the studio follows the order this application asks for.");});box.appendChild(sel);
  if(cur)box.appendChild(cbtn("sm quiet","See the template",function(){var S=CS();S.ui.learnTpl=true;S.ui.tplInd=cur.ind;S.ui.tpl=cur.id;S.ui.room="learn";show("work");save();render();},"Opens it in Learn"));
  else{var sg=h("span","c-note c-tplsg");box.appendChild(sg);tplSuggest(o).then(function(t){if(!t||!sg.isConnected)return;sg.textContent="";sg.appendChild(document.createTextNode("Suggested for this posting: "));
    sg.appendChild(cbtn("sm","Use "+t.role,function(){o.tpl=t.id;save();render();say("This application's CV, letter and portfolio will follow the template for "+t.role+".");}));});}
  pane.appendChild(box);}
function paintTemplates(par){var S=CS(),T=W.IngTemplates,ind=S.ui.tplInd||T.industries[0][0],t=S.ui.tpl?T.byId(S.ui.tpl):null;if(t)ind=t.ind;
  var L=panel("csList","Templates");L.head.insertBefore(cbtn("quiet c-back","‹ Learn",function(){S.ui.learnTpl=false;S.ui.tpl=null;show("list");save();render();}),L.head.firstChild);
  T.industries.forEach(function(x){L.body.appendChild(item(x[1],T.inInd(x[0]).length+" role"+(T.inInd(x[0]).length===1?"":"s"),x[0]===ind,function(){S.ui.tplInd=x[0];S.ui.tpl=null;show("work");save();render();}));});
  L.foot.appendChild(h("span","c-note",esc("Common practice in the UK and the US. A posting's own instructions come first.")));
  var R;
  if(!t){R=panel("csWork",T.indName(ind));R.head.insertBefore(cbtn("quiet c-back","‹ Fields",function(){show("list");save();render();}),R.head.firstChild);
    R.body.appendChild(h("p","c-note c-pad c-tplintro",esc("Choose a role: its template says what its readers look for, the CV's sections in the order that serves it, the letter's moves, its length and what to avoid. Used for an application, it shapes the CV, the letter and the portfolio the studio writes; every fact still comes from your profile.")));
    var g=h("div","c-tplgrid");T.inInd(ind).forEach(function(x){var b=h("button","c-item");b.type="button";b.appendChild(h("b",null,esc(x.role)));b.appendChild(h("small",null,esc((x.look.match(/^[^.:]+[.:]?/)||[x.look])[0])));b.addEventListener("click",function(){S.ui.tpl=x.id;save();render();});g.appendChild(b);});R.body.appendChild(g);}
  else{R=panel("csWork",t.role);R.head.insertBefore(cbtn("quiet c-back","‹ "+T.indName(t.ind),function(){S.ui.tpl=null;save();render();}),R.head.firstChild);
    var b=h("div","c-col c-tplview");
    b.appendChild(h("h3","c-h3",esc("What its readers look for")));b.appendChild(h("p",null,esc(t.look)));
    b.appendChild(h("h3","c-h3",esc("The CV, in this order")));var ol=h("ol","c-tplol");t.cv.forEach(function(x){var k=x.indexOf(": ");ol.appendChild(h("li",null,k>0?"<b>"+esc(x.slice(0,k))+":</b> "+esc(x.slice(k+2)):"<b>"+esc(x)+"</b>"));});b.appendChild(ol);
    if(t.tips&&t.tips.length){var ul=h("ul","c-tplul");t.tips.forEach(function(x){ul.appendChild(h("li",null,esc(x)));});b.appendChild(ul);}
    b.appendChild(h("h3","c-h3",esc(t.id==="civil"?"The statement and the examples":t.id==="narrative"?"The application's own questions":"The cover letter's moves")));var ol2=h("ol","c-tplol");t.cover.forEach(function(x){ol2.appendChild(h("li",null,esc(x)));});b.appendChild(ol2);
    b.appendChild(h("h3","c-h3",esc("Length and form")));b.appendChild(h("p",null,esc(t.length)));
    b.appendChild(h("h3","c-h3",esc("Avoid")));var ul2=h("ul","c-tplul");t.avoid.forEach(function(x){ul2.appendChild(h("li",null,esc(x)));});b.appendChild(ul2);
    b.appendChild(h("h3","c-h3",esc("An example line, to show the shape")));b.appendChild(h("pre","c-tplline",esc(t.line)));
    b.appendChild(h("p","c-note",esc("Your own facts go where the square brackets are. The studio never writes a fact from a template: it takes every one from your profile.")));
    R.body.appendChild(b);
    var open=CS().opps.filter(function(o){return !FINISHED[o.stage];});
    if(open.length){var sel=select([["","Use it for an application…"]].concat(open.map(function(o){return [o.id,(o.title||"Untitled")+(o.org?", "+o.org:"")+(o.tpl===t.id?" (uses it)":"")];})),"");sel.className="c-sel";sel.setAttribute("aria-label","Use this template for one of your applications");
      sel.addEventListener("change",function(){var o=oppById(sel.value);if(!o)return;o.tpl=t.id;S.ui.room="apps";S.ui.open=o.id;o.step="send";o.sv={kind:"cv"};show("work");save();render();say((o.title||"This application")+" now follows the template for "+t.role+": its CV, letter and portfolio take its shape.");});
      R.foot.appendChild(sel);}
    else R.foot.appendChild(h("span","c-note",esc("Bring a posting, and this template can shape its CV and letter.")));
    R.foot.appendChild(h("span","c-grow"));var i0=T.list.indexOf(t);if(i0<T.list.length-1){var nx=T.list[i0+1];R.foot.appendChild(cbtn("","Next: "+nx.role+" ›",function(){S.ui.tpl=nx.id;save();render();}));}}
  two(L,R,par);}

/* ---------------- from Lector: a CV or a cover letter needs no apps (her request) ---------------- */
function fromLector(B){meFirst();var kinds=Object.keys(B&&B.docs||{}).filter(function(k){return B.docs[k];}),want=kinds.filter(function(k){return k==="cv"||k==="cover";});if(!want.length)return false;
  var P=null;try{P=B.purpose!=="portfolio"&&LXR().state().posts[B.purpose];}catch(e){}
  var go1=function(o){CS().ui.room="apps";CS().ui.open=o?o.id:"new";CS().ui.show="work";if(o)o.step="send";save();go("career");
    if(!o){say("A CV or a cover letter needs no apps: bring the posting here, and the Career Studio writes them from your profile.");return;}
    say("A CV or a cover letter needs no apps: the Career Studio writes them from your profile and the posting.");
    var q=Promise.resolve();want.forEach(function(k){q=q.then(function(){return writeDoc(o,k);});});q.then(function(){render();});};
  if(!P||!P.ref){go1(null);return true;}
  loadText(P.ref).then(function(t){if(!t||t.length<40){go1(null);return;}var same=CS().opps.filter(function(o){return o.from==="lector:"+P.id||P.from==="career:"+o.id;})[0];if(same){go1(same);return;}
    newOpp(B.purpose==="programme"?"phd":"job",t,"lector:"+P.id).then(go1);});
  return true;}


/* ---------------- 6.9.2: PhD and job applications, at her pace (31 October 2026) ----------------
   Her words: "I want to make the Career Studio and the Lector page more capable. I want to be able to use it for PhD
   applications and for job applications. I want to be able to automate where I want and also meticulously review and do
   on my own at my own pace." So, in this order: the dates of an application and reminders through the Inbox and the bell
   (inside Ingenium only: there are no alarms outside it); a tracker of referees; the interview, with a list to prepare by,
   a mock run on the Clepsydra and a thank-you; an application exported as a folder of files; a reading list for each
   programme, read by the reading page; what she can do in ten, fifteen, twenty-five or forty-five minutes; the posting
   fetched again and compared, and further particulars read with it; and a LinkedIn export imported as a difference. */
function addDays(s,n){var d=s?new Date(s+"T12:00:00"):new Date();if(isNaN(d))d=new Date();d.setDate(d.getDate()+n);return d.getFullYear()+"-"+("0"+(d.getMonth()+1)).slice(-2)+"-"+("0"+d.getDate()).slice(-2);}
function daysTo(s){if(!s)return null;var d=new Date(s+"T12:00:00"),t=new Date();if(isNaN(d))return null;t.setHours(12,0,0,0);return Math.round((d-t)/864e5);}
function inWords(n){return n==null?"":n<0?"past":n===0?"today":n===1?"tomorrow":"in "+n+" days";}
function shortDay(s){try{return new Date(s+"T12:00:00").toLocaleDateString("en-GB",{weekday:"short",day:"numeric",month:"short"});}catch(e){return s;}}
/* every long text an application names, so that a profile copied, removed or swept keeps or lets go of all of them */
function oppRefs(o){var out=[o.ref];Object.keys(o.docs||{}).forEach(function(k){out.push(o.docs[k].ref);});Object.keys(o.older||{}).forEach(function(k){(o.older[k]||[]).forEach(function(x){out.push(x.ref);});});
  (o.emails||[]).forEach(function(x){out.push(x.ref);(x.older||[]).forEach(function(y){out.push(y.ref);});});if(o.review)out.push(o.review.ref);
  (o.more||[]).forEach(function(m){out.push(m.ref);});(o.reading||[]).forEach(function(r){out.push(r.ref);});if(o.recheck)out.push(o.recheck.ref);return out.filter(Boolean);}

/* ---- 1. dates and reminders: the closing date, the interview, a reference due, a funding deadline, any other day ---- */
var DKINDS=[["closes","Closing date"],["interview","Interview"],["referee","Reference due"],["funding","Funding deadline"],["other","Another date"]];
function dkLabel(k){return (DKINDS.filter(function(x){return x[0]===k;})[0]||DKINDS[4])[1];}
function datesOf(o){var out=[];if(o.due)out.push({id:"due",kind:"closes",at:o.due,label:"Closes",o:o});
  if(o.interview&&o.interview.at)out.push({id:"iv",kind:"interview",at:o.interview.at,label:"Interview"+(o.interview.time?" at "+o.interview.time:""),o:o});
  (o.refs||[]).forEach(function(r){if(r.due)out.push({id:"ref:"+r.id,kind:"referee",at:r.due,label:"Reference from "+r.name+" due",o:o});});
  (o.dates||[]).forEach(function(d){if(d.at)out.push({id:d.id,kind:d.kind,at:d.at,label:d.label||dkLabel(d.kind),o:o,own:true});});
  return out.sort(function(a,b){return a.at<b.at?-1:a.at>b.at?1:0;});}
function thoughtAlive(id){try{return (state.parked||[]).some(function(it){return it.id===id;});}catch(e){return false;}}
function hasReminder(o,dateId,days){var d=datesOf(o).filter(function(x){return x.id===dateId;})[0];return (o.reminders||[]).some(function(r){return r.dateId===dateId&&r.days===days&&thoughtAlive(r.thoughtId)&&(!r.forAt||!d||r.forAt===d.at);});}
/* a reminder set for a date that has since moved: its thought leaves the Inbox, so the new one does not stand beside it */
function dropStale(o,dateId,days){var keep=[];(o.reminders||[]).forEach(function(r){if(r.dateId===dateId&&r.days===days){var l=state.parked||[];for(var i=l.length-1;i>=0;i--)if(l[i].id===r.thoughtId)l.splice(i,1);}else keep.push(r);});o.reminders=keep;}
/* a thought in the Inbox that comes back on its day (the cloud nudges it while the page is open, and Focus lists it) */
function remindAt(o,dateId,days){var d=datesOf(o).filter(function(x){return x.id===dateId;})[0];if(!d)return null;
  if(hasReminder(o,dateId,days)){say("That reminder is set already: it waits in the Inbox.");return null;}
  dropStale(o,dateId,days);var day=addDays(d.at,-days),when=new Date(day+"T09:00:00").getTime(),now=Date.now();if(!(when>now))when=now+5*60000;
  var n=daysTo(d.at),text=(o.title||"An application")+": "+d.label.charAt(0).toLowerCase()+d.label.slice(1)+" on "+dayStr(d.at+"T12:00:00")+(n>0?", in "+n+" day"+(n===1?"":"s"):n===0?", today":"")+".";
  var it=null;try{if(W.IngInbox&&IngInbox.tc)it=IngInbox.tc.add(text);}catch(e){it=null;}
  if(!it){bellFor(o,d);return null;}
  it.remindAt=when;it.reminded=0;it.career={opp:o.id,date:dateId};(o.reminders=o.reminders||[]).push({id:uid("rm"),dateId:dateId,days:days,at:when,forAt:d.at,thoughtId:it.id});save();
  try{IngInbox.tc.refresh();}catch(e){}render();say("It comes back to you "+(day<=todayStr()?"today":"on "+dayStr(day+"T12:00:00"))+", in the Inbox and on Focus. Inside Ingenium only: there is no alarm outside it.");return it;}
function bellFor(o,d){state.reminders=state.reminders||[];var text=(o.title||"An application")+": "+d.label.charAt(0).toLowerCase()+d.label.slice(1)+" on "+dayStr(d.at+"T12:00:00")+".";
  if(state.reminders.some(function(r){return r.text===text;})){say("It is with the bell already.");return;}state.reminders.push({text:text});save();try{bellRefresh();}catch(e){}say("Kept with your reminders (the bell).");}
function dropThoughts(o){var l=state.parked;if(!Array.isArray(l))return;(o.reminders||[]).forEach(function(r){for(var i=l.length-1;i>=0;i--)if(l[i].id===r.thoughtId)l.splice(i,1);});try{IngInbox.tc.badge();}catch(e){}}
function datesBox(o){var box=h("div","c-dates"),head=h("div","c-row c-tight");head.appendChild(h("h3","c-h3",esc("Dates")));box.appendChild(head);
  var ds=datesOf(o);if(!ds.length)box.appendChild(h("p","c-note",esc("No dates yet: set the closing date above, or add one below.")));
  ds.forEach(function(d){var n=daysTo(d.at),row=h("div","c-date"),tx=h("div","tx");tx.appendChild(h("b",null,esc(d.label)));tx.appendChild(h("small",null,esc(dayStr(d.at+"T12:00:00")+(n==null?"":" · "+inWords(n)))));row.appendChild(tx);
    var k=h("div","c-keys c-remind");k.appendChild(h("span","c-note",esc("Remind me")));
    [[7,"A week before"],[3,"3 days before"],[1,"The day before"]].forEach(function(c){var set=hasReminder(o,d.id,c[0]),b=cbtn("sm"+(set?" pri":""),c[1],function(){remindAt(o,d.id,c[0]);},set?"Set: it waits in the Inbox":"A thought in the Inbox that comes back that morning");b.setAttribute("aria-pressed",set?"true":"false");if(n!=null&&n<c[0])b.disabled=true;k.appendChild(b);});
    k.appendChild(cbtn("sm quiet","With the bell",function(){bellFor(o,d);},"A line among the bell's reminders"));
    if(d.own)k.appendChild(cbtn("sm quiet","✕",function(){o.dates=(o.dates||[]).filter(function(z){return z.id!==d.id;});save();render();},"Take the date off"));row.appendChild(k);box.appendChild(row);});
  var add=h("div","c-row c-adddate"),kd=select(DKINDS.filter(function(k){return k[0]!=="closes"&&k[0]!=="interview";}),"other"),ad=input("date",""),al=input("text","","What it is (optional)");
  kd.className="c-sel";ad.setAttribute("aria-label","The day");al.setAttribute("aria-label","What it is");add.appendChild(field("A date",kd));add.appendChild(field("Which day",ad));add.appendChild(field("Called",al));
  add.appendChild(cbtn("sm","Add the date",function(){if(!ad.value){say("Choose the day first.");return;}(o.dates=o.dates||[]).push({id:uid("dt"),kind:kd.value,at:ad.value,label:al.value.trim()||dkLabel(kd.value)});save();render();}));box.appendChild(add);
  box.appendChild(h("p","c-note",esc("Reminders stay inside Ingenium: a thought in the Inbox comes back on its morning while the page is open, and the bell keeps a line. There are no alarms outside the app. When a date moves, set its reminder again: the old one goes.")));return box;}
/* Today's strip: every date of every open application in the next seven days */
function weekStrip(S){var items=[];sortedOpps().forEach(function(o){if(FINISHED[o.stage])return;datesOf(o).forEach(function(d){var n=daysTo(d.at);if(n!=null&&n>=0&&n<=7)items.push({d:d,n:n,o:o});});});
  items.sort(function(a,b){return a.n-b.n;});var box=h("div","c-week");box.appendChild(h("div","c-label",esc("This week")));
  if(!items.length){box.appendChild(h("p","c-note",esc("No dates in the next seven days.")));return box;}
  items.slice(0,6).forEach(function(x){var b=h("button","c-wk");b.type="button";b.innerHTML="<b>"+esc((x.n===0?"Today":x.n===1?"Tomorrow":shortDay(x.d.at)+" · in "+x.n+" days"))+"</b><span>"+esc(x.d.label+" · "+(x.o.title||"Untitled"))+"</span>";
    b.addEventListener("click",function(){S.ui.room="apps";S.ui.open=x.o.id;x.o.step="track";show("work");save();render();});box.appendChild(b);});return box;}
function nearestDate(opps){var best=null;opps.forEach(function(o){datesOf(o).forEach(function(d){var n=daysTo(d.at);if(n==null||n<0)return;if(!best||n<best.n)best={d:d,n:n,o:o};});});return best;}

/* ---- 2. referees: who will speak for her, and where each stands ---- */
var RSTAT=[["toask","To ask"],["asked","Asked"],["agreed","Agreed"],["sent","Sent"],["thanked","Thanked"]];
function rstat(k){return (RSTAT.filter(function(x){return x[0]===k;})[0]||RSTAT[0])[1];}
function setRefStatus(o,r,st){r.status=st;if(st==="asked"&&!r.asked)r.asked=Date.now();if(st==="sent")(r.sent=r.sent||[]).push(Date.now());if(st==="thanked")r.thanked=Date.now();save();render();}
function refsPane(o,pane,P){o.refs=o.refs||[];var top=h("div","c-row c-tight");top.appendChild(h("h3","c-h3",esc("Your referees")));pane.appendChild(top);
  pane.appendChild(h("p","c-note",esc("Who will speak for you, and where each stands: to ask, asked, agreed, sent, thanked. Ask early, and give them the posting, your CV and the date it is due. Nothing is sent from here: the email is written for you to send.")));
  var how=LESSONS.filter(function(L){return L[0]==="Asking for a reference";})[0];if(how){var d=fold("how:refs","How to ask");var ol=h("ol","c-lesson-ol");how[1].forEach(function(s){ol.appendChild(h("li",null,esc(s)));});d.appendChild(ol);pane.appendChild(d);}
  if(!o.refs.length)pane.appendChild(empty("No referees yet","Add one from the Referees entries of your profile, or by name. Today then says when to choose them and when to follow up."));
  o.refs.forEach(function(r){var c=h("div","c-ref"),hd=h("div","c-ref-h");hd.appendChild(h("b",null,esc(r.name)));hd.appendChild(chip(rstat(r.status),r.status==="thanked"||r.status==="sent"?"c-ok":""));
    var ss=select(RSTAT,r.status);ss.className="c-sel";ss.setAttribute("aria-label","Where it stands with "+r.name);ss.addEventListener("change",function(){setRefStatus(o,r,ss.value);});hd.appendChild(ss);c.appendChild(hd);
    var meta=[r.role,r.contact,r.asked?"asked "+dayStr(r.asked):"",r.sent&&r.sent.length?"sent "+dayStr(r.sent[r.sent.length-1]):""].filter(Boolean).join(" · ");if(meta)c.appendChild(h("small",null,esc(meta)));
    var g=h("div","c-row"),du=input("date",r.due||"");du.setAttribute("aria-label","When the reference is due");du.addEventListener("change",function(){r.due=du.value;save();render();});g.appendChild(field("Due by",du));
    var nt=h("textarea","c-ta");nt.placeholder="Notes: what they know you for, what you sent them.";nt.value=r.notes||"";nt.setAttribute("aria-label","Notes on "+r.name);nt.addEventListener("change",function(){r.notes=nt.value;save();});g.appendChild(field("Notes",nt));c.appendChild(g);
    var k=h("div","c-keyrow"),i=RSTAT.map(function(x){return x[0];}).indexOf(r.status);
    if(i>=0&&i<RSTAT.length-1)k.appendChild(cbtn("sm pri","Mark "+RSTAT[i+1][1].toLowerCase(),function(){setRefStatus(o,r,RSTAT[i+1][0]);}));
    var pur=r.status==="toask"||r.status==="asked"?"reference":r.status==="agreed"?"followup":"thanks";
    k.appendChild(cbtn("sm",pur==="reference"?"Write the request":pur==="followup"?"Write a follow-up":"Write the thanks",function(){writeDoc(o,"email",{role:"referee",purpose:pur,extra:"The referee is "+r.name+(r.role?", "+r.role:"")+"."+(r.due?" The reference is due by "+dayStr(r.due+"T12:00:00")+".":"")+(r.notes?" "+r.notes.slice(0,300):"")});}));
    if(r.due){var set=hasReminder(o,"ref:"+r.id,3);var rb=cbtn("sm"+(set?" pri":""),"Remind me, 3 days before",function(){remindAt(o,"ref:"+r.id,3);});rb.setAttribute("aria-pressed",set?"true":"false");k.appendChild(rb);}
    k.appendChild(cbtn("sm quiet","Remove",function(){o.refs=o.refs.filter(function(x){return x!==r;});save();render();}));c.appendChild(k);pane.appendChild(c);});
  var add=h("div","c-col"),P0=CS().profile,ents=P0.items.filter(function(it){return it.sec==="referee";}),row1=h("div","c-row");
  add.appendChild(h("h3","c-h3",esc("Add a referee")));
  if(ents.length){var es=select([["","From your profile…"]].concat(ents.map(function(it){return [it.id,[it.title,it.place].filter(Boolean).join(", ")];})),"");es.className="c-sel";es.setAttribute("aria-label","A referee from your profile");
    es.addEventListener("change",function(){var it=ents.filter(function(x){return x.id===es.value;})[0];if(!it)return;o.refs.push({id:uid("rf"),name:it.title,role:it.place||"",contact:"",status:"toask",due:o.due?addDays(o.due,-3):"",notes:it.text||"",sent:[]});save();render();});row1.appendChild(es);}
  var nm=input("text","","Their name"),rl=input("text","","Their post or relation to you"),ct=input("text","","Email (optional)");nm.setAttribute("aria-label","The referee's name");rl.setAttribute("aria-label","Their post");ct.setAttribute("aria-label","Their email");
  row1.appendChild(nm);row1.appendChild(rl);row1.appendChild(ct);row1.appendChild(cbtn("sm","Add by name",function(){var v=nm.value.trim();if(!v){nm.focus();say("Give their name first.");return;}o.refs.push({id:uid("rf"),name:v,role:rl.value.trim(),contact:ct.value.trim(),status:"toask",due:o.due?addDays(o.due,-3):"",notes:"",sent:[]});save();render();}));
  add.appendChild(row1);add.appendChild(h("p","c-note",esc("A reference is usually due with the application or soon after it: the due date is set three days before the closing date, for you to change.")));pane.appendChild(add);
  var asked=o.refs.filter(function(r){return r.status!=="toask";}).length;P.foot.appendChild(h("span","c-note",esc(o.refs.length?o.refs.length+" referee"+(o.refs.length===1?"":"s")+" · "+asked+" asked":"Referees are kept with this application only.")));
  P.foot.appendChild(h("span","c-grow"));P.foot.appendChild(cbtn("","Track",function(){goStep(o,"track");}));}

/* ---- 3. the interview: its day, a list to prepare by (fixed, no model), a mock run, and the thanks after ---- */
function interviewCard(o){var iv=o.interview=o.interview||{},card=h("div","c-ivcard"),hd=h("div","c-row c-tight");hd.appendChild(h("h3","c-h3",esc("The interview")));
  var n=daysTo(iv.at);if(n!=null)hd.appendChild(h("span","c-ivdays",esc(n<0?"Held "+dayStr(iv.at+"T12:00:00"):n===0?"Today":n===1?"Tomorrow":"In "+n+" days")));card.appendChild(hd);
  var g=h("div","c-grid3"),dt=input("date",iv.at||""),tm=input("time",iv.time||""),fm=select([["","Not said"],["person","In person"],["online","Online"],["phone","By telephone"]],iv.format||"");
  dt.addEventListener("change",function(){iv.at=dt.value;if(iv.at&&o.stage!=="interview"&&!FINISHED[o.stage])o.stage="interview";save();render();});tm.addEventListener("change",function(){iv.time=tm.value;save();render();});fm.addEventListener("change",function(){iv.format=fm.value;save();});
  g.appendChild(field("Day",dt));g.appendChild(field("Time",tm));g.appendChild(field("How",fm));card.appendChild(g);
  var g2=h("div","c-grid2"),wh=input("text",iv.where||"","The place, or the link"),pn=input("text",iv.panel||"","Who will be there, if you know");
  wh.addEventListener("change",function(){iv.where=wh.value.trim();save();});pn.addEventListener("change",function(){iv.panel=pn.value.trim();save();});g2.appendChild(field("Where",wh));g2.appendChild(field("The panel",pn));card.appendChild(g2);
  card.appendChild(h("p","c-note",esc("To prepare, in this order; nothing here is written by the model.")));var prep=iv.prep=iv.prep||{},ul=h("ul","c-prep");
  var asks=o.read&&o.read.r&&o.read.r.asks||[];
  [["post","Read the posting once more, slowly, and the criteria it scores",["The posting",function(){goStep(o,"post");}]],
   ["evidence","An example for each essential criterion: the situation, what you did yourself, what came of it",["Practise",function(){o.step="practise";o.ptab="evidence";save();jump();render();}]],
   ["asks","Two questions to ask them, about the work itself (below)",null],["way","The way there, or the link, and the time: leave margin",null],["bring","What to bring: the posting, your CV as you sent it, your notes",null]].forEach(function(x){
    var li=h("li",prep[x[0]]?"c-ck-done":null),cb=h("input");cb.type="checkbox";cb.id="iv_"+o.id+"_"+x[0];cb.checked=!!prep[x[0]];cb.addEventListener("change",function(){prep[x[0]]=cb.checked;save();render();});
    var lb=h("label",null,esc(x[1]));lb.setAttribute("for",cb.id);li.appendChild(cb);li.appendChild(lb);if(x[2])li.appendChild(cbtn("sm",x[2][0],x[2][1]));ul.appendChild(li);});card.appendChild(ul);
  var qa=h("textarea","c-ta");qa.placeholder=asks.length?"":"Two questions about the work itself.";qa.value=iv.asked!=null?iv.asked:asks.slice(0,2).join("\n");qa.setAttribute("aria-label","Your questions to ask");qa.addEventListener("change",function(){iv.asked=qa.value;save();});
  card.appendChild(field("Your questions to ask"+(asks.length&&iv.asked==null?" (from the reading: change them as you wish)":""),qa));
  var nb=h("textarea","c-ta");nb.placeholder="Notes before: what to say first, what to remember.";nb.value=iv.notes||"";nb.setAttribute("aria-label","Notes before the interview");nb.addEventListener("change",function(){iv.notes=nb.value;save();});card.appendChild(field("Notes before",nb));
  var na=h("textarea","c-ta");na.placeholder="After: what was asked, what went well, what to say in the thanks.";na.value=iv.after||"";na.setAttribute("aria-label","Notes after the interview");na.addEventListener("change",function(){iv.after=na.value;save();});card.appendChild(field("Notes after the interview",na));
  var k=h("div","c-keyrow");k.appendChild(cbtn("sm","Write a thank-you email",function(){writeDoc(o,"email",{role:"contact",purpose:"thanks",extra:"The interview was "+(iv.at?"on "+dayStr(iv.at+"T12:00:00"):"recently")+(iv.panel?", with "+iv.panel:"")+"."+(iv.after?" My notes after it: "+iv.after.slice(0,400):"")});},"To the contact named in the posting; written for you to send"));
  k.appendChild(cbtn("sm","Practise the questions",function(){o.step="practise";o.ptab="interview";save();jump();render();}));
  k.appendChild(cbtn("sm quiet","Take the interview off",function(){ingConfirm("Take the interview and its notes off this application?",function(){delete o.interview;if(o.stage==="interview")o.stage="applied";save();render();},{danger:true});}));card.appendChild(k);return card;}
/* the mock run: one question, two minutes on the Clepsydra, then her answer looked at with her */
var MOCK=null,mockT=0;
function mockBox(o,q,pane){var box=h("div","c-mock");
  if(MOCK&&MOCK.opp===o.id&&MOCK.q===q.id){var b=h("b",null,esc("The clock runs: "+clockLeft()+" left"));b.id="csMockLeft";box.appendChild(b);
    box.appendChild(h("p","c-note",esc("Answer as you would in the room, aloud or in writing. At the bell, write down what you said and press Look at it with me.")));box.appendChild(cbtn("sm","Stop the clock",function(){stopMock();}));}
  else{box.appendChild(h("p","c-note",esc("A mock run: this one question, two minutes on the Clepsydra, then your answer looked at with you.")));
    box.appendChild(cbtn("sm","Mock run · 2 minutes",function(){startMock(o,q);},"The Clepsydra runs two minutes; at the bell it is given back its usual length"));}
  pane.appendChild(box);}
function clockLeft(){try{return pomoFmt(pomo.remaining);}catch(e){return "";}}
function startMock(o,q){if(typeof pomoReset!=="function"||typeof pomoStart!=="function"){say("The Clepsydra is not in this copy of the page.");return;}try{if(pomo.running){say("The Clepsydra is running already: still it first.");return;}}catch(e){}
  MOCK={opp:o.id,q:q.id,prev:state.clep.focusLen,at:Date.now()};try{localStorage.setItem("ing_cs_mock",String(MOCK.prev));}catch(e){}state.clep.focusLen=2;pomoReset();pomoStart();render();
  clearInterval(mockT);mockT=setInterval(function(){if(!MOCK){clearInterval(mockT);return;}var b=$("csMockLeft");if(b)b.textContent="The clock runs: "+clockLeft()+" left";},1000);}
function stopMock(){var m=MOCK;MOCK=null;clearInterval(mockT);try{if(m&&m.prev)state.clep.focusLen=m.prev;localStorage.removeItem("ing_cs_mock");pomoReset();}catch(e){}save();render();}
(function(){try{var mp=+localStorage.getItem("ing_cs_mock");if(!mp)return;localStorage.removeItem("ing_cs_mock");
  if(state.clep&&state.clep.focusLen===2){state.clep.focusLen=mp;if(typeof pomo!=="undefined"&&!pomo.running&&pomo.phase==="focus")pomo.remaining=mp*60;saveState();}}catch(e){}})();
/* the bell: when a focus session ends on the Clepsydra, the mock run or the minutes chosen on Today hear of it */
var CLOCK={on:false,mins:0,ids:[],ended:false};
function bellRang(){if(MOCK){var m=MOCK;MOCK=null;clearInterval(mockT);try{if(m.prev)state.clep.focusLen=m.prev;localStorage.removeItem("ing_cs_mock");pomoReset();}catch(e){}save();say("Two minutes: now write down what you said, and press Look at it with me.");render();return;}
  if(CLOCK.on){CLOCK.on=false;CLOCK.ended=true;save();render();}}
(function(){try{if(typeof W.pomoAdvance!=="function"||W.pomoAdvance.__r188)return;var og=W.pomoAdvance,wrapped=function(auto){var focus=false;try{focus=pomo.phase==="focus";}catch(e){}var r=og.apply(this,arguments);try{if(focus)bellRang();}catch(e){}return r;};
  wrapped.__r188=1;W.pomoAdvance=wrapped;try{pomoAdvance=wrapped;}catch(e){}}catch(e){}})();

/* ---- 4. an application as a folder of files (one zip), and the Settings export carrying the studio's texts ---- */
function safeName(s){try{return lxFileName(s);}catch(e){return String(s||"file").replace(/[\\/:*?"<>|]+/g," ").trim()||"file";}}
function stWord(st,isWant){return isWant?{met:"Matches",partly:"Partly",none:"Does not match",unsaid:"Not said"}[st]||st:{met:"Shown",transfer:"Transfers",partly:"Partly shown",none:"Not shown"}[st]||st;}
function readingMd(o){var r=o.read&&o.read.r;if(!r)return "";var b=bandOf(r),out=["# How you fit: "+to(o),""];
  if(b){out.push("**"+b.word+"**","");if(r.view)out.push("How a reader would see it. "+r.view,"");b.why.forEach(function(w){out.push(w);});out.push("","Advice. "+b.advice,"",b.rule,"");}
  if(r.wants&&r.wants.length){out.push("## Against what you are looking for","","| You are looking for | Here | What it offers |","|---|---|---|");r.wants.forEach(function(x){out.push("| "+x.text+" | "+stWord(x.st,true)+" | "+(x.offer||"")+" |");});out.push("");}
  if(r.crit.length){out.push("## What it asks","","| Criterion | Essential or desirable | In your profile | Evidence |","|---|---|---|---|");r.crit.forEach(function(x){out.push("| "+x.text+" | "+(x.ess?"Essential":"Desirable")+" | "+stWord(x.st)+((x.st==="partly"||x.st==="none")&&x.gap?" ("+{learn:"learnable",ask:"ask me",hard:"required"}[x.gap]+")":"")+" | "+(x.src?x.src+": ":"")+(x.ev||"")+(x.close?" To close it: "+x.close:"")+" |");});out.push("");}
  if(r.strengths.length){out.push("## For","");r.strengths.forEach(function(s){out.push("- "+s);});out.push("");}if(r.concerns.length){out.push("## Against","");r.concerns.forEach(function(s){out.push("- "+s);});out.push("");}
  if(r.next.length||r.asks.length){out.push("## Next","");r.next.forEach(function(s){out.push("1. "+s);});r.asks.forEach(function(s){out.push("- Ask the contact: "+s);});out.push("");}
  out.push("Read on "+dayStr(o.read.at)+" with "+(window.ingPrettyModels||String)(o.read.model||"the model")+", from the profile alone; the band is not a probability.");return out.join("\n");}
function checklistMd(o){var C=o.check;if(!C)return "";var out=["# Checklist: "+to(o),""];C.items.forEach(function(x){out.push("- ["+(x.done?"x":" ")+"] "+x.text+(x.quote?"  \n  From the posting: “"+x.quote+"”":""));});
  (C.pending||[]).forEach(function(x){out.push("- [ ] (to look at) "+x.text);});return out.join("\n")+"\n";}
function practiseMd(o){var r=o.read&&o.read.r,pr=o.practice||{crit:{},qs:[]},out=[];
  var ck=Object.keys(pr.crit||{}).filter(function(k){return pr.crit[k].answer;});
  if(ck.length&&r){out.push("# Your evidence","");ck.forEach(function(k){var c=r.crit[+k.slice(1)];if(!c)return;var s=pr.crit[k];out.push("## "+c.text,"",s.answer,"");if(s.fb&&!s.fb.RAW)out.push("Looked at: "+[s.fb.MEETS?"meets it: "+s.fb.MEETS.toLowerCase():"",s.fb.WORKS?"works: "+s.fb.WORKS:"",s.fb.MISSING?"missing: "+s.fb.MISSING:"",s.fb["ASK YOURSELF"]?"ask yourself: "+s.fb["ASK YOURSELF"]:""].filter(Boolean).join("; "),"");});}
  if((pr.qs||[]).length){out.push("# Interview questions","");pr.qs.forEach(function(q,i){out.push((i+1)+". "+q.q);if(q.answer)out.push("","   "+q.answer.replace(/\n/g,"\n   "));out.push("");});}
  return out.join("\n");}
function notesMd(o){var out=["# "+(o.title||"Untitled")+(o.org?" · "+o.org:""),"","Where it stands: "+stageWord(o.stage)+"."+(o.due?" Closing date: "+dayStr(o.due+"T12:00:00")+".":"")+(o.closes?" The posting says: "+o.closes:""),""];
  var ds=datesOf(o);if(ds.length){out.push("## Dates","");ds.forEach(function(d){out.push("- "+dayStr(d.at+"T12:00:00")+": "+d.label);});out.push("");}
  if((o.refs||[]).length){out.push("## Referees","");o.refs.forEach(function(r){out.push("- "+r.name+(r.role?", "+r.role:"")+(r.contact?" ("+r.contact+")":"")+": "+rstat(r.status).toLowerCase()+(r.asked?", asked "+dayStr(r.asked):"")+(r.due?", due "+dayStr(r.due+"T12:00:00"):"")+(r.notes?". "+r.notes:""));});out.push("");}
  if(o.interview){var iv=o.interview;out.push("## The interview","",[iv.at?dayStr(iv.at+"T12:00:00"):"",iv.time,iv.format,iv.where,iv.panel?"with "+iv.panel:""].filter(Boolean).join(" · ")||"(no day set)");if(iv.asked)out.push("","Questions to ask:",iv.asked);if(iv.notes)out.push("","Before: "+iv.notes);if(iv.after)out.push("","After: "+iv.after);out.push("");}
  if((o.reading||[]).length){out.push("## Reading list","");o.reading.forEach(function(r){out.push("- "+r.title+(r.by?", "+r.by:"")+(r.url?" <"+r.url+">":"")+" · "+rsLabel(r.status)+(r.notes?". "+r.notes:""));});out.push("");}
  if(o.notes){out.push("## Notes","",o.notes,"");}return out.join("\n");}
function exportFiles(o,dir,opt){dir=dir?String(dir).replace(/\/?$/,"/"):"";opt=opt||{};var files=[];
  return Promise.all([postOnly(o),Promise.all((o.more||[]).map(function(m){return loadText(m.ref).then(function(t){return {name:m.name,text:t};});})),
      Promise.all(Object.keys(o.docs||{}).filter(function(k){return DOCS[k];}).map(function(k){return loadText(o.docs[k].ref).then(function(t){return {kind:k,text:t};});})),
      Promise.all((o.emails||[]).map(function(e){return loadText(e.ref).then(function(t){return {e:e,text:t};});}))]).then(function(x){
    if(x[0])files.push({name:dir+"posting.txt",data:x[0]});x[1].forEach(function(m){if(m.text)files.push({name:dir+"particulars/"+safeName(m.name.replace(/\.[a-z0-9]+$/i,""))+".txt",data:m.text});});
    var rd=readingMd(o);if(rd)files.push({name:dir+"reading.md",data:rd});var ck=checklistMd(o);if(ck)files.push({name:dir+"checklist.md",data:ck});
    x[2].forEach(function(d){if(d.text)files.push({name:dir+safeName(DOCS[d.kind][0])+".md",data:d.text});});
    x[3].forEach(function(m,i){if(!m.text)return;var rl=(ROLES.filter(function(z){return z[0]===m.e.role;})[0]||["","Email"])[1],pu=(PURPOSES.filter(function(z){return z[0]===m.e.purpose;})[0]||["",""])[1].replace(/^To /,"");files.push({name:dir+"emails/"+safeName(rl+" - "+pu)+(i?" "+(i+1):"")+".txt",data:m.text});});
    var pr=practiseMd(o);if(pr)files.push({name:dir+"practise.md",data:pr});files.push({name:dir+"notes.md",data:notesMd(o)});
    var q=Promise.resolve(),withDocx=!opt.noDocx&&W.IngDoc&&IngDoc.make&&W.IngLectorPaper;
    if(withDocx)x[2].forEach(function(d){if(!d.text)return;q=q.then(function(){return paperFile(o,d.kind).then(function(f){files.push({name:dir+safeName(DOCS[d.kind][0])+".docx",data:f.bytes});},function(){});});});
    return q.then(function(){files.push({name:dir+"README.txt",data:"This folder was made by the Career Studio in Ingenium on "+new Date().toString()+", for "+to(o)+".\n\n"+
      "posting.txt is the posting as it was kept"+(x[1].length?"; particulars/ holds the further documents added to it":"")+".\nreading.md is how it was read against the profile: the band with its rule, each want and each criterion with the evidence.\n"+
      "checklist.md is what it asks to send and do, ticked as it stood.\nEach document is here as the Word file Save as Word gives (.docx) and as the same text in Markdown (.md).\nemails/ holds each email written; practise.md the evidence and answers practised; notes.md the dates, referees, interview, reading list and notes.\n\nNothing here was sent anywhere: the files were made on the device and saved where you chose.\n"});return files;});});}
function exportOpp(o){if(typeof makeZip!=="function"||typeof saveFileNative!=="function"){say("This copy of the page cannot make the folder.");return Promise.resolve(null);}say("Making the folder of files…");
  return exportFiles(o,safeName(o.title||"application")+"/").then(function(files){return Promise.resolve(saveFileNative(safeName(o.title||"application")+".zip","application/zip",makeZip(files))).then(function(){say(files.length+" files, in one zip folder.");return files;});},function(e){say("It could not be made: "+(e&&e.message||e));return null;});}
function exportAll(){var S=CS(),opps=S.opps.slice();if(!opps.length){say("Nothing to export yet.");return Promise.resolve(null);}if(typeof makeZip!=="function"){say("This copy of the page cannot make the folder.");return Promise.resolve(null);}
  say("Making a folder for each application…");var files=[],q=Promise.resolve();
  opps.forEach(function(o){q=q.then(function(){return exportFiles(o,safeName(o.title||"application")+"/").then(function(fs){files=files.concat(fs);});});});
  return q.then(function(){files.push({name:"README.txt",data:"The applications of "+personLabel(S)+", exported from the Career Studio in Ingenium on "+new Date().toString()+": one folder for each, with its posting, its reading, its checklist, its documents (Word and Markdown), its emails, practise and notes.\n"});
    return Promise.resolve(saveFileNative(safeName("Career Studio - "+personLabel(S))+".zip","application/zip",makeZip(files))).then(function(){say(files.length+" files, one folder for each application.");return files;});},function(e){say("It could not be made: "+(e&&e.message||e));return null;});}
/* Settings, Export your data: the studio's own line, with each application as readable files and every text kept whole */
(function(){(W.__ingExportProviders=W.__ingExportProviders||[]).push({id:"exCareer",label:"The Career Studio: each profile's applications as readable files (postings, readings, checklists, documents, notes), and everything it keeps, whole",
  files:function(){var people=ROOT().people||[],out=[],q=Promise.resolve(),texts={};
    people.forEach(function(p){var pd="career/"+safeName(personLabel(p))+"/";(p.opps||[]).forEach(function(o){q=q.then(function(){return exportFiles(o,pd+safeName(o.title||"application")+"/",{noDocx:true}).then(function(fs){out=out.concat(fs);},function(){});});});});
    return q.then(function(){var refs=[];people.forEach(function(p){refs=refs.concat(refsOfPerson(p));});
        try{var M=LXR().state().me;[M.cv].concat(M.writing||[],M.letters||[]).forEach(function(x){if(x&&x.ref)refs.push(x.ref);});}catch(e){}return Promise.all(refs.map(function(r){return loadText(r).then(function(t){if(t)texts[r]=t;});}));})
      .then(function(){out.push({name:"career/career.json",data:JSON.stringify({career:state.career,texts:texts},null,1)});return out;});}});})();

/* ---- 5. the reading list of an application: a supervisor's work, the programme's pages, the call; kept, in Fontes, fetched on press, read by the reading page ---- */
var RKINDS=[["sup","A supervisor's work"],["prog","The programme's page"],["call","The call itself"],["other","Other"]],RSTATUS=[["toread","To read"],["reading","Reading"],["read","Read"]];
function rsLabel(k){return (RSTATUS.filter(function(x){return x[0]===k;})[0]||RSTATUS[0])[1];}
function keepToRead(o,x){o.reading=o.reading||[];if(x.url&&o.reading.some(function(r){return r.url===x.url;})){say("It is on the reading list already.");return null;}
  var it={id:uid("rd"),title:String(x.title||x.url||"Untitled").slice(0,200),by:String(x.by||"").slice(0,120),url:String(x.url||"").slice(0,500),kind:x.kind||"other",status:"toread",notes:"",fontesId:null,ref:null,runId:null,at:Date.now()};
  o.reading.push(it);save();render();say("Kept in your reading list (What you send).");return it;}
function toFontes(o,it){if(typeof fontesAdd!=="function"){say("Fontes is not in this copy of the page.");return;}var d=new Date(),c={type:"webpage",title:it.title,accessed:{"date-parts":[[d.getFullYear(),d.getMonth()+1,d.getDate()]]}};
  if(it.url)c.URL=it.url;if(it.by)c.author=[{literal:it.by}];fontesAdd([c]);var id=c.id;if(!id){try{id=fontesKey(c);}catch(e){id=null;}}it.fontesId=id||null;save();render();}
function fetchReading(o,it){if(!it.url){say("It has no address to fetch.");return;}if(typeof fetchPageText!=="function"){say("This device cannot fetch pages.");return;}say("Fetching its text…");
  fetchPageText(it.url,120000).then(function(t){t=String(t||"").trim();if(t.length<200)throw new Error("too little text came back");var ref=IngBig.newId();return Promise.resolve(IngBig.put(ref,t)).then(function(){if(it.ref){try{IngBig.del(it.ref);}catch(e){}}it.ref=ref;it.chars=t.length;it.fetchedAt=Date.now();save();render();say("Its text is kept: "+Math.round(t.length/1000)+" thousand characters.");});},function(e){say("It could not be fetched: "+(e&&e.message||e));});}
var watchT=0;function watchRuns(){clearInterval(watchT);watchT=setInterval(function(){var busy=false;try{busy=W.LX&&LX.busy;}catch(e){}var seen=false;
    (ROOT().people||[]).forEach(function(p){(p.opps||[]).forEach(function(o){(o.reading||[]).forEach(function(it){if(!it.runId||it.readAt||it.runErr)return;var run=null;try{run=lxRun(it.runId);}catch(e){}if(!run)return;seen=true;
      if(run.status==="done"){it.readAt=Date.now();it.status="read";save();render();}else if(run.status==="error"){it.runErr=run.err||"stopped";save();render();}});});});
    if(!seen&&!busy)clearInterval(watchT);},1500);}
/* the reading page reads it as a document (its parts, notes and analysis), and what it found stands under the item and beside the profile when the studio writes */
function readWithLector(o,it){if(!it.ref){say("Fetch its text first.");return Promise.resolve(null);}if(typeof lxPrepare!=="function"||typeof lxStart!=="function"||typeof lxPartsFor!=="function"){say("The reading page is not in this copy of the page.");return Promise.resolve(null);}
  try{if(W.LX&&LX.busy){say("The reading page is busy: wait for it, or pause it there.");return Promise.resolve(null);}}catch(e){}if(needModel())return Promise.resolve(null);var pl=plan(),m=pl&&pl.chosen;
  try{var old=it.runId?lxRun(it.runId):null;if(old&&old.career===o.id&&old.status!=="done")lxDelete(old.id);}catch(e){}
  return loadText(it.ref).then(function(text){if(!text)throw new Error("its text is no longer kept");return lxPrepare(it.title+".txt",text);}).then(function(P){var parts=lxPartsFor(P,"overview",m);
    var run={id:"lx_"+Date.now().toString(36)+Math.random().toString(36).slice(2,5),name:it.title,file:it.title+".txt",kind:"doc",depth:"overview",modelId:m?m.id:null,created:Date.now(),updated:Date.now(),status:"reading",done:0,total:parts.length,facts:P.facts,
      partsRef:IngBig.newId(),notesRef:IngBig.newId(),mergeRef:IngBig.newId(),analysisRef:IngBig.newId(),writings:{},career:o.id};
    return Promise.all([lxPutJSON(run.partsRef,parts),lxPutJSON(run.notesRef,parts.map(function(){return "";}))]).then(function(){var s=lxState();s.runs.unshift(run);it.runId=run.id;delete it.readAt;delete it.runErr;it.status="reading";save();lxStart(run.id);watchRuns();render();return run;});})
  .then(null,function(e){say("It could not be read: "+(e&&e.message||e));return null;});}
function analysisOf(it){var run=null;try{run=it.runId?lxRun(it.runId):null;}catch(e){}if(!run||run.status!=="done")return Promise.resolve(null);return lxJSON(run.analysisRef,{}).then(function(a){return a&&Object.keys(a).length?a:null;});}
/* what the reading page found in the works read for this application, for the prompts */
function readingNotes(o){if(!o||!(o.reading||[]).length)return Promise.resolve([]);return Promise.all(o.reading.map(function(it){return analysisOf(it).then(function(a){if(!a)return null;var keys=["In brief","Main points","Evidence and sources","Gaps and questions"];
    var t=keys.map(function(k){return a[k]?"("+k+") "+a[k]:"";}).filter(Boolean).join("\n");return t?{title:it.title+(it.by?", "+it.by:""),text:t}:null;});})).then(function(r){return r.filter(Boolean);});}
function readingPane(o,pane,P){o.reading=o.reading||[];var top=h("div","c-row c-tight");top.appendChild(h("h3","c-h3",esc("Your reading list")));pane.appendChild(top);
  pane.appendChild(h("p","c-note",esc("What to read for this application: a supervisor's work, the programme's pages, the call itself. Keep what you find online, add a piece to Fontes, fetch its text when you press for it, and have the reading page read it: what it found then stands beside your profile when the studio writes, as MY READING NOTES, and is never claimed as your own.")));
  if(!o.reading.length)pane.appendChild(empty("Nothing to read yet","Add a piece below, or press Keep to read on anything Look it up online found (The posting)."));
  o.reading.forEach(function(it){var c=h("div","c-ref"),hd=h("div","c-ref-h"),run=null;try{run=it.runId?lxRun(it.runId):null;}catch(e){}
    var rst=run?run.status:"",live=!!(run&&W.LX&&LX.busy&&LX.runId===run.id);
    /* read to its end in the reading page itself (Resume there), it is read here too */
    if(run&&rst==="done"&&!it.readAt){it.readAt=run.finished||Date.now();it.status="read";delete it.runErr;save();}
    if(it.url){var a=h("a");a.href=it.url;a.target="_blank";a.rel="noopener noreferrer";a.textContent=it.title;var bb=h("b");bb.appendChild(a);hd.appendChild(bb);}else hd.appendChild(h("b",null,esc(it.title)));
    hd.appendChild(chip((RKINDS.filter(function(k){return k[0]===it.kind;})[0]||RKINDS[3])[1]));hd.appendChild(seg(RSTATUS,it.status,function(v){it.status=v;save();render();},"Where you are with it"));c.appendChild(hd);
    var meta=[it.by,it.fontesId?"in Fontes":"",it.ref?Math.round((it.chars||0)/1000)+" thousand characters kept":"",!run?(it.runId?"the reading is no longer kept":""):rst==="done"?"read by the reading page "+dayStr(it.readAt||run.finished||Date.now()):rst==="error"?"the reading stopped: "+(run.err||it.runErr||"an error"):live?"the reading page is reading it ("+(run.done||0)+" of "+(run.total||0)+" parts)":"the reading is paused ("+(run.done||0)+" of "+(run.total||0)+" parts)"].filter(Boolean).join(" · ");if(meta)c.appendChild(h("small",null,esc(meta)));
    var nt=h("textarea","c-ta");nt.placeholder="Your notes on it.";nt.value=it.notes||"";nt.setAttribute("aria-label","Your notes on "+it.title);nt.addEventListener("change",function(){it.notes=nt.value;save();});c.appendChild(nt);
    var k=h("div","c-keyrow");if(!it.fontesId)k.appendChild(cbtn("sm","Add to Fontes",function(){toFontes(o,it);},"Kept among your sources, to cite by number when Fontes is switched on in your profile"));
    if(it.url)k.appendChild(cbtn("sm",it.ref?"Fetch it again":"Fetch its text",function(){fetchReading(o,it);},"Fetches the page at its address, only now"));
    if(it.ref&&(!run||rst==="error"))k.appendChild(cbtn("sm pri","Read it with the reading page",function(){readWithLector(o,it);},"The reading page reads it part by part and writes its notes and analysis"));
    else if(run&&rst!=="done"&&!live)k.appendChild(cbtn("sm pri","Carry on reading",function(){try{if(W.LX&&LX.busy){say("The reading page is busy: wait for it, or pause it there.");return;}lxStart(run.id);}catch(e){}watchRuns();render();},"The reading page carries on from where it stopped"));
    k.appendChild(cbtn("sm quiet","Remove",function(){if(it.ref){try{IngBig.del(it.ref);}catch(e){}}o.reading=o.reading.filter(function(x){return x!==it;});save();render();}));c.appendChild(k);
    if(it.runId){var an=fold("an:"+it.id,"What the reading page found",true),aw=h("div","c-well c-an");aw.textContent="…";an.appendChild(aw);c.appendChild(an);
      analysisOf(it).then(function(a){if(!a){var run=null;try{run=lxRun(it.runId);}catch(e){}aw.textContent=run?(run.status==="done"?"(nothing was written)":"Reading: "+(run.done||0)+" of "+(run.total||0)+" parts."+(run.status==="error"?" It stopped: "+(run.err||""):"")):"(the reading is no longer kept)";return;}
        aw.innerHTML="";Object.keys(a).forEach(function(kk){aw.appendChild(h("h4",null,esc(kk)));aw.appendChild(h("p",null,esc(a[kk])));});});}
    pane.appendChild(c);});
  var add=h("div","c-col");add.appendChild(h("h3","c-h3",esc("Add a piece")));var row=h("div","c-row"),ti=input("text","","Its title"),by=input("text","","Who wrote it (optional)"),ur=input("url","","https:// (optional)"),kd=select(RKINDS,o.kind==="phd"||o.kind==="grant"?"sup":"other");
  ti.setAttribute("aria-label","Its title");by.setAttribute("aria-label","Who wrote it");ur.setAttribute("aria-label","Its address");kd.className="c-sel";kd.setAttribute("aria-label","What it is");row.appendChild(ti);row.appendChild(by);row.appendChild(ur);row.appendChild(kd);
  row.appendChild(cbtn("sm","Add it",function(){var t=ti.value.trim();if(!t){ti.focus();say("Give it a title first.");return;}keepToRead(o,{title:t,by:by.value.trim(),url:ur.value.trim(),kind:kd.value});}));add.appendChild(row);pane.appendChild(add);
  var read=o.reading.filter(function(x){return x.status==="read";}).length;P.foot.appendChild(h("span","c-note",esc(o.reading.length?o.reading.length+" piece"+(o.reading.length===1?"":"s")+" · "+read+" read":"Nothing is fetched or searched unless you press for it.")));P.foot.appendChild(h("span","c-grow"));}

/* ---- 6. what she can do in ten, fifteen, twenty-five or forty-five minutes ---- */
function estimateOf(o,n){if(!n)return 0;var w=wayOf(o);
  if(n.step==="fit")return 10;
  if(n.step==="check")return /^Make its checklist/.test(n.text)?5:/^Look at /.test(n.text)?10:/^Read your /.test(n.text)?10:5;
  if(n.step==="send"){if(n.kind==="refs")return /^Follow up/.test(n.text)?10:15;if(/^Fill the /.test(n.text))return 15;return w==="guide"?45:w==="step"?25:15;}
  if(n.step==="practise")return 10;if(n.step==="track")return /^Prepare/.test(n.text)?25:5;return 15;}
function lowDay(){try{return D.body.hasAttribute("data-sc-low");}catch(e){return false;}}
function minutesBox(S,act,low){var box=h("div","c-mins"),m=S.ui.mins||0,row=h("div","c-row c-tight");box.id="csMins";
  row.appendChild(h("span","c-label",esc("I have")));row.appendChild(seg([[10,"10"],[15,"15"],[25,"25"],[45,"45 minutes"]],m,function(v){S.ui.mins=S.ui.mins===v?0:v;save();render();},"How many minutes you have"));box.appendChild(row);
  if(CLOCK.ended){box.appendChild(h("p",null,esc("The bell has gone. What is left can wait: nothing is lost by stopping here.")));var kr=h("div","c-keyrow");
    kr.appendChild(cbtn("pri sm","Not today",function(){restClock(S);},"The steps you chose rest until tomorrow"));kr.appendChild(cbtn("sm","Carry on",function(){CLOCK={on:false,mins:0,ids:[],ended:false};render();}));box.appendChild(kr);return box;}
  if(!m){box.appendChild(h("p","c-note",esc("Say how long you have, and only the steps that fit are listed, the smallest first."+(low?" A low-energy day: one step is enough.":""))));return box;}
  var fit=act.filter(function(x){return x.mins<=m;}).sort(function(a,b){return a.mins-b.mins;});if(low&&fit.length>1)fit=fit.slice(0,1);
  if(!fit.length)box.appendChild(h("p",null,esc("Nothing on today's list fits in "+m+" minutes. Choose a longer stretch, or open one step and do its first part only.")));
  else{box.appendChild(h("p",null,esc("In "+m+" minutes you could"+(low?" (a low-energy day: this one step is enough)":"")+":")));var ul=h("div","c-col c-fitlist");
    fit.forEach(function(x){ul.appendChild(item(x.n.text,(x.o.title||"Untitled")+" · about "+x.mins+" min",false,function(){S.ui.today=x.o.id;show("work");save();render();}));});box.appendChild(ul);}
  if(CLOCK.on){box.appendChild(h("p","c-note",esc("The clock runs: "+clockLeft()+" left. Stop at the bell; what is left waits for another day.")));box.appendChild(cbtn("sm","Stop the clock",stopClock));}
  else if(fit.length&&typeof pomoReset==="function")box.appendChild(cbtn("pri sm","Start the clock · "+m+" minutes",function(){startClock(m,fit.map(function(x){return x.o.id;}));},"The Clepsydra runs "+m+" minutes; at the bell the studio offers Not today or Carry on"));
  return box;}
function startClock(m,ids){try{if(pomo.running){say("The Clepsydra is running already: still it first.");return;}}catch(e){}CLOCK={on:true,mins:m,ids:ids||[],ended:false,at:Date.now()};
  state.clep.focusLen=m;save();pomoReset();pomoStart();render();say("The clock runs for "+m+" minutes. Stop at the bell.");}
function stopClock(){CLOCK={on:false,mins:0,ids:[],ended:false};try{pomoReset();}catch(e){}render();}
function restClock(S){var t=tomorrowStr();(CLOCK.ids||[]).forEach(function(id){var o=oppById(id);if(o&&nextOf(o))o.rest=t;});CLOCK={on:false,mins:0,ids:[],ended:false};S.ui.today=null;save();render();say("They rest until tomorrow.");}

/* ---- 7. the posting fetched again and compared, and further particulars read with it ---- */
function lcsUnits(A,B){var n=A.length,m=B.length,L=[],i,j;
  for(i=0;i<=n;i++){L.push([]);for(j=0;j<=m;j++)L[i].push(0);}
  for(i=n-1;i>=0;i--)for(j=m-1;j>=0;j--)L[i][j]=A[i]===B[j]?L[i+1][j+1]+1:Math.max(L[i+1][j],L[i][j+1]);
  var units=[],cur=null;i=0;j=0;
  while(i<n||j<m){if(i<n&&j<m&&A[i]===B[j]){if(cur){units.push(cur);cur=null;}units.push({same:true,old:[A[i]],nw:[B[j]]});i++;j++;continue;}
    if(!cur)cur={same:false,old:[],nw:[]};if(j<m&&(i>=n||L[i][j+1]>=L[i+1][j])){cur.nw.push(B[j]);j++;}else{cur.old.push(A[i]);i++;}}
  if(cur)units.push(cur);return units;}
function urlOf(o){return o.url||(/^https?:\/\//.test(o.from||"")?o.from:"");}
function checkAgain(o){var url=urlOf(o);if(!url){say("This posting was not fetched from an address: paste the new text as a new application, or add it as a document.");return Promise.resolve(null);}
  if(typeof fetchPageText!=="function"){say("This device cannot fetch pages.");return Promise.resolve(null);}say("Fetching the posting again from its address…");
  return Promise.all([postOnly(o),o.how?jlFetch(url).then(function(d){return jlCompose(d,url);}):fetchPageText(url,40000)]).then(function(x){var old=String(x[0]||""),nw=String(x[1]||"").trim();if(nw.length<200)throw new Error("too little text came back");
    var A=sentencesOf(old),B=sentencesOf(nw),units=lcsUnits(A,B),ch=units.filter(function(u){return !u.same;}),nS=ch.reduce(function(a,u){return a+Math.max(u.old.length,u.nw.length);},0);o.checkedAt=Date.now();
    if(!ch.length){if(o.recheck){try{IngBig.del(o.recheck.ref);}catch(e){}delete o.recheck;}save();render();say("Unchanged: the posting reads as it did on "+dayStr(o.fetchedAt||o.at)+".");return null;}
    var meta={};try{meta=LXR().parsePost(nw)||{};}catch(e){}var nd=dateIn(meta.closes||""),ref=IngBig.newId();
    return Promise.resolve(IngBig.put(ref,nw)).then(function(){if(o.recheck&&o.recheck.ref){try{IngBig.del(o.recheck.ref);}catch(e){}}
      o.recheck={at:Date.now(),ref:ref,chars:nw.length,n:nS,changes:ch.slice(0,20).map(function(u){return {old:u.old.slice(0,6),nw:u.nw.slice(0,6)};}),closes:meta.closes||"",due:nd,dueChanged:!!(nd&&nd!==o.due)};
      save();render();say(nS+" sentence"+(nS===1?"":"s")+" changed since it was fetched. The changes are shown in The posting.");return o.recheck;});})
  .then(null,function(e){say("It could not be checked: "+(e&&e.message||e));return null;});}
function keepRecheck(o){var rc=o.recheck;if(!rc)return;o.older=o.older||{};(o.older.post||[]).forEach(function(x){try{IngBig.del(x.ref);}catch(e){}});o.older.post=[{ref:o.ref,made:o.fetchedAt||o.at,chars:o.chars}];
  o.ref=rc.ref;o.chars=rc.chars;o.fetchedAt=rc.at;if(rc.closes)o.closes=rc.closes;if(rc.due&&rc.due!==o.due){o.due=rc.due;if(o.check)o.check.items.forEach(function(x){if(/^Send it before it closes/.test(x.text))x.text="Send it before it closes: "+dayStr(o.due+"T12:00:00");});}
  delete o.recheck;save();render();say("The new text is kept; the one before stays kept beside it.");}
function dropRecheck(o){if(!o.recheck)return;try{IngBig.del(o.recheck.ref);}catch(e){}delete o.recheck;save();render();say("Your copy is kept as it was.");}
function recheckBox(o){var rc=o.recheck,box=h("div","c-rc");box.appendChild(h("b",null,esc("Checked "+dayStr(rc.at)+": "+rc.n+" sentence"+(rc.n===1?"":"s")+" changed since it was fetched on "+dayStr(o.fetchedAt||o.at)+".")));
  if(rc.closes&&rc.dueChanged)box.appendChild(h("p",null,"<b>The closing date now reads:</b> "+esc(rc.closes)+(o.due?" (it was "+esc(dayStr(o.due+"T12:00:00"))+")":"")));
  rc.changes.forEach(function(u){var w=h("div","c-col");w.style.gap="4px";if(u.old.length){var a=h("div","c-rv-old");a.appendChild(h("small",null,"Before"));u.old.forEach(function(s){a.appendChild(h("p",null,esc(s)));});w.appendChild(a);}
    if(u.nw.length){var b=h("div","c-rv-new");b.appendChild(h("small",null,u.old.length?"Now":"Added"));u.nw.forEach(function(s){b.appendChild(h("p",null,esc(s)));});w.appendChild(b);}else w.appendChild(h("div","c-rv-new","<small>Now</small><p>(taken out)</p>"));box.appendChild(w);});
  var shown=rc.changes.reduce(function(a,u){return a+Math.max(u.old.length,u.nw.length);},0);if(rc.n>shown)box.appendChild(h("p","c-note",esc("And "+(rc.n-shown)+" more.")));
  var k=h("div","c-keyrow");k.appendChild(cbtn("sm pri","Keep the new text",function(){keepRecheck(o);},"The posting becomes the new text; your copy of the old one stays kept"));k.appendChild(cbtn("sm","Keep my copy",function(){dropRecheck(o);}));box.appendChild(k);return box;}
function addMore(o,name,text){text=String(text||"").replace(/\r/g,"").trim();if(text.length<40){say("That holds too little text.");return Promise.resolve(null);}var ref=IngBig.newId();
  return Promise.resolve(IngBig.put(ref,text)).then(function(){var m={id:uid("mo"),name:String(name||"document"),ref:ref,chars:text.length,at:Date.now()};(o.more=o.more||[]).push(m);save();render();say(m.name+" is kept with this application: its limits and what it asks join the posting's.");return m;});}
function moreBox(o){var box=h("div","c-more");box.appendChild(h("span","c-label",esc("Further particulars")));
  (o.more||[]).forEach(function(m){var c=chip(m.name+" · "+Math.round(m.chars/1000)+" thousand characters");var x=cbtn("quiet sm","✕",function(){try{IngBig.del(m.ref);}catch(e){}o.more=o.more.filter(function(z){return z!==m;});save();render();},"Take it off");c.appendChild(x);box.appendChild(c);});
  box.appendChild(h("span","c-note",esc((o.more||[]).length?"Read with the posting: by the reading, the limits and the checklist.":"A document the posting points to (further particulars, a handbook, the person specification), read with it.")));return box;}

/* ---- 6.9.8 · the jobs saved on LinkedIn. Her words (3 November 2026): "I want to be able to link my LinkedIn account to Ingenium
   so that I can have Ingenium fetch my saved jobs easier ... keep my data and information protected and safely stored on my device
   ... and always with my permission." LinkedIn's own copy of her data, which she asks LinkedIn for and brings here herself, holds
   the jobs she saved and those she applied to. They wait here, one at a time: Bring it in fetches that posting, only then, and reads
   it against her profile; Not this one sets it aside. Imported again later, only the new ones are added. Nothing signs in to
   LinkedIn and nothing is sent to it. Its columns are read loosely by name, as the rest of the export is. ---- */
function svList(){var S=CS();if(!Array.isArray(S.saved))S.saved=[];return S.saved;}
function svKey(j){var u=j.url?(jlNorm(j.url)||String(j.url).trim()):"";return u||("t:"+String(j.title||"").toLowerCase().replace(/\s+/g," ").trim()+"|"+String(j.org||"").toLowerCase().replace(/\s+/g," ").trim());}
function svMerge(jobs){var L=svList(),n=0,have={};CS().opps.forEach(function(o){var u=urlOf(o);if(u)have[u]=o.id;});
  jobs.forEach(function(j){var key=svKey(j),ex=L.filter(function(x){return x.key===key;})[0];
    if(ex){if(j.kind==="applied"&&ex.kind!=="applied"){ex.kind="applied";ex.date=j.date||ex.date;}return;}
    var it={id:uid("sv"),key:key,kind:j.kind,title:j.title,org:j.org,url:/^https?:/.test(key)?key:"",date:j.date,st:"wait",at:Date.now()};if(it.url&&have[it.url]){it.st="in";it.opp=have[it.url];}L.push(it);if(it.st==="wait")n++;});
  return n;}
function svWords(jobs,n){var s=jobs.filter(function(j){return j.kind==="saved";}).length,a=jobs.length-s;
  return (s?s+" saved job"+(s===1?"":"s"):"")+(s&&a?" and ":"")+(a?a+" application"+(a===1?"":"s")+" sent through LinkedIn":"")+" read: "+(n?n+" new, waiting in Applications under Saved on LinkedIn.":"nothing new.");}
function svBring(x){JL.sv=x.id;JL.hint={title:x.title,org:x.org};JL.kind="job";
  if(!x.url){JL.err={text:"This saved job has no link in your LinkedIn data. Look for it on the employer's own site, or paste its text below.",paste:true,elsewhere:true};JL.focus="paste";CS().ui.open="new";show("work");save();render();return;}
  fetchPosting(x.url,"job");}
function savedPanel(){var S=CS(),L=svList(),wait=L.filter(function(x){return x.st==="wait";}),many=!!S.ui.svMany,P=panel("csWork","Saved on LinkedIn",{back:"Applications",onBack:function(){S.ui.open=null;show("list");save();render();}});
  P.body.appendChild(h("p","c-note c-pad c-svnote",esc("From the copy of your LinkedIn data"+(S.savedAt?" you brought in on "+dayStr(S.savedAt):"")+": the jobs you saved there"+(L.some(function(x){return x.kind==="applied";})?", and those you applied to":"")+". Take them one at a time. Bring it in fetches that posting, only then, and reads it against your profile; nothing is sent to LinkedIn.")));
  if(!wait.length)P.body.appendChild(empty("Nothing waiting","Every saved job has been brought in or set aside. Bring in your LinkedIn data again later, and only the new ones come here."));
  (many?wait:wait.slice(0,1)).forEach(function(x){var c=h("div","c-svcard");c.appendChild(h("b",null,esc(x.title||"A saved job")));
    c.appendChild(h("small",null,esc([x.org,(x.kind==="applied"?"Applied":"Saved")+(x.date?" "+x.date:"")].filter(Boolean).join(" · "))));
    var r=h("div","c-row");r.appendChild(cbtn("pri sm","Bring it in and read it",function(){svBring(x);},"Fetches the posting, only now, and reads it against your profile"));r.appendChild(cbtn("sm","Not this one",function(){x.st="drop";x.dropAt=Date.now();save();render();}));
    if(x.url){var a=h("a","c-btn sm quiet");a.href=x.url;a.target="_blank";a.rel="noopener noreferrer";a.textContent="Open it";r.appendChild(a);}c.appendChild(r);P.body.appendChild(c);});
  if(wait.length>1)P.body.appendChild(h("div","c-pad",null)).appendChild(cbtn("quiet sm",many?"Show one at a time":"Show all "+wait.length+" waiting",function(){S.ui.svMany=!many;save();render();}));
  var done=L.filter(function(x){return x.st!=="wait";});
  if(done.length){var f=fold("svdone","Brought in or set aside ("+done.length+")"),ul=h("ul","c-svdone");done.forEach(function(x){var li=h("li");li.appendChild(h("span",null,esc((x.title||"A saved job")+(x.org?", "+x.org:""))));
      if(x.st==="in"&&oppById(x.opp))li.appendChild(cbtn("sm quiet","Open",function(){S.ui.open=x.opp;show("work");save();render();}));else if(x.st==="drop")li.appendChild(cbtn("sm quiet","Put it back",function(){x.st="wait";save();render();}));ul.appendChild(li);});
    f.appendChild(ul);P.body.appendChild(f);}
  P.foot.appendChild(cbtn("","Bring in your LinkedIn data again",function(){pickFile(".zip,.csv",true,function(fs){importLinkedIn(fs).catch(function(e){say("It could not be read: "+(e&&e.message||e));});});},"The .zip LinkedIn sends when you ask for a copy of your data"));
  P.foot.appendChild(h("span","c-grow"));return P;}

/* ---- 8. a LinkedIn export imported as a difference ---- */
function liKey(it){return (String(it.title||"")+"|"+String(it.place||"")).toLowerCase().replace(/\s+/g," ").trim();}
function liSame(a,b){return ["title","place","from","to","text"].every(function(k){return String(a[k]||"").trim()===String(b[k]||"").trim();});}
function liStatus(L){var files=(L.files||[]).filter(function(f){return f.kept;}),n=files.reduce(function(a,f){return a+f.kept;},0);
  var s="Imported "+dayStr(L.at)+": "+n+" entr"+(n===1?"y":"ies")+(files.length?" from "+files.map(function(f){return f.name.replace(/\.csv$/i,"")+" ("+f.kept+")";}).join(", "):"");
  if(L.added)s+=" · "+L.added+" new";if(L.changed)s+=" · "+L.changed+" changed";if(L.gone)s+=" · "+L.gone+" gone";
  if(L.skipped&&L.skipped.length)s+=" · skipped: "+L.skipped.slice(0,4).join(", ")+(L.skipped.length>4?"…":"");if(L.others&&L.others.length)s+=" · not read: "+L.others.slice(0,4).join(", ");return s+".";}
function liDropped(P,k){P.linkedin=P.linkedin||{};P.linkedin.dropped=P.linkedin.dropped||{};P.linkedin.dropped[k]=Date.now();}

/* ---- Lector-side: one posting, two pages ---- */
function openPosts(){return CS().opps.filter(function(o){return !FINISHED[o.stage];}).map(function(o){return {id:o.id,title:o.title||"Untitled",org:o.org||"",closes:o.closes||"",kind:o.kind};});}
function postFor(id){var o=oppById(id);if(!o)return Promise.resolve(null);return postOnly(o).then(function(t){return {id:o.id,title:o.title||"",org:o.org||"",closes:o.closes||"",kind:o.kind,text:t||""};});}
function bringPost(p){var P=null;try{P=LXR().state().posts[p];}catch(e){}if(!P||!P.ref){say("Add the posting in the reading page's brief first.");return Promise.resolve(null);}meFirst();
  var same=CS().opps.filter(function(o){return o.from==="lector:"+P.id;})[0];if(same){CS().ui.room="apps";CS().ui.open=same.id;CS().ui.show="work";save();go("career");say("It is in the Career Studio already.");return Promise.resolve(same);}
  return loadText(P.ref).then(function(t){if(!t||t.length<40)throw new Error("its text is no longer kept");return newOpp(p==="programme"?"phd":"job",t,"lector:"+P.id);})
    .then(function(o){o.kindSet=true;if(P.title&&!o.title)o.title=P.title;if(P.org&&!o.org)o.org=P.org;CS().ui.room="apps";save();go("career");say("It is in the Career Studio, under Applications.");return o;},function(e){say("It could not be brought: "+(e&&e.message||e));return null;});}
/* the share of words that differ between a draft and its revision, as the reading page counts it */
function wordsChanged(a,b){var A={},n=0,added=0,left=0;String(a).toLowerCase().split(/\W+/).forEach(function(w){if(w){A[w]=(A[w]||0)+1;n++;}});
  String(b).toLowerCase().split(/\W+/).forEach(function(w){if(!w)return;if(A[w]>0)A[w]--;else added++;});Object.keys(A).forEach(function(w){left+=A[w];});return n?Math.min(1,(added+left)/n):0;}
var EXAM={last:null};

/* ---------------- 6.58 · YOUR MENTOR: one path through the studio, one step on the screen at a time ----------------
   Her words (8 November 2026): "Right now, the current set up of the Career and Lector page are still not quite well curated enough
   and customised for me ... It creates more work and is not really AuDHD accessible ... I am still unclear on what exactly I am
   looking for so I would like for Ingenium to provide that inside of the app and be my in-app recruiter/mentor/counselor/headhunter";
   "I want both Lector and the Career Studio to provide me with suggestions and recommendations for my Cv, portfolio documents, cover
   letter and etc. I want them to spot skills and experience that I have show me how it can be transferred ... spot my blindspots";
   and "I need guidance and a little direction when it comes to choosing a career". Asked where the mentor should learn about her, she
   chose all four: her CV and documents, Lector's readings of her apps, her LinkedIn export, and a short talk.
   Measured on 6.57: what the mentor needs was in the studio already, in five rooms and under a dozen keys (Suggest entries and Find
   my skills in Your profile; What transfers, Blind spots and What sets you apart in Your edge; Your direction in Goals and plan; a
   document looked at with her; the skills each new reading of an app shows, sent by Lector). Nothing said which to press first, and
   Suggest entries and Find my skills each replaced the other's findings.
   Now Your mentor walks her through them in order, one step on the screen at a time, with her place in the steps always in view:
   1 what the mentor may read; 2 a short talk (eight questions, one at a time, each skippable; the answers fill What you are looking
   for); 3 her entries found in her sources, kept or dropped one at a time (both kinds of finding kept together); 4 what transfers,
   her blind spots and what sets her apart; 5 paths that fit; 6 her CV and her other documents looked at with her; 7 the mentor's
   summary. Do the rest for me runs every step that needs the model, one after another; Stop stops it, whatever was finished is kept,
   and the room opens at the first step not done. Each profile has its own mentor, so a second person's is theirs. Nothing of what she
   says is sent anywhere but to the model she chose for the studio. */
var MS=[["sources","What I can read about you"],["talk","A short talk"],["read","Your entries, found"],["edge","What transfers, and your blind spots"],["paths","Paths that fit"],["cv","Your CV and documents, looked at with you"],["sum","Your mentor's summary"]];
var TALK=[
  ["enjoy","What kind of work makes you lose track of time?","Think of a task rather than a job title: building something, explaining, writing, researching, organising."],
  ["asked","What do people ask you for help with?","What friends, colleagues or classmates come to you for."],
  ["drawn","Which roles, fields, programmes or organisations interest you, even a little?","Name as many as you like, however loosely. Nothing here commits you."],
  ["change","What would you like your work to change for other people?",""],
  ["need","What must your work give you?","For example pay, security, flexible hours, working from anywhere, time to study."],
  ["avoid","What would you rather avoid?",""],
  ["where","Where would you like to work from?","Towns, countries, or remotely from anywhere."],
  ["when","Any studies, deadlines or dates your mentor should know?","For example a doctorate you plan and its funding deadline, or when you could start."]];
function MT(){var S=CS();if(!S.mentor||typeof S.mentor!=="object")S.mentor={};var m=S.mentor;if(!m.ans||typeof m.ans!=="object")m.ans={};if(!m.done||typeof m.done!=="object")m.done={};
  if(typeof m.qi!=="number")m.qi=0;return m;}
function cvDoc(){return edgeDocs().filter(function(d){return d.kind==="cv"&&d.id==="cv";})[0]||null;}
function stDone(k){var S=CS(),m=MT(),E=EDGE();
  if(k==="sources")return m.done.sources||0;if(k==="talk")return m.done.talk||0;if(k==="read")return m.done.read&&!(S.profile.suggested||[]).length?m.done.read:0;
  if(k==="edge")return E.tr&&E.bl&&E.ed?Math.max(E.tr.at||0,E.bl.at||0,E.ed.at||0):0;if(k==="paths")return S.paths&&S.paths.list&&S.paths.list.length?S.paths.at:0;
  if(k==="cv"){var d=cvDoc();return d&&E.docs[d.id]?E.docs[d.id].at:0;}return m.done.sum||0;}
function nextStep(){for(var i=0;i<MS.length-1;i++)if(!stDone(MS[i][0]))return MS[i][0];return "sum";}
function talkApply(){var P=CS().profile,a=MT().ans,L=[];
  [["drawn","Interested in"],["enjoy","Work I enjoy"],["asked","What people come to me for"],["change","What I want my work to do for others"]].forEach(function(x){var v=String(a[x[0]]||"").trim();if(v)L.push(x[1]+": "+v);});
  if(L.length)P.wants.looking=L.join("\n");["need","avoid","where","when"].forEach(function(k){var v=String(a[k]||"").trim();if(v)P.wants[k]=v;});P.at=Date.now();}
/* the steps that use the model, one after another; each waits for the one before to end */
var MSTOP=false;
function waitRun(){return new Promise(function(res){var t=setInterval(function(){if(!RUN.busy){clearInterval(t);res();}},300);});}
function runOne(fn){if(MSTOP)return Promise.reject(new Error("stopped"));fn();return waitRun().then(function(){if(MSTOP)throw new Error("stopped");});}
/* both kinds of finding, kept together: entries from her CV and documents, then skills with their evidence */
function readSources(){var P=CS().profile;
  return runOne(suggest).then(function(){var first=(P.suggested||[]).slice();
    return runOne(findSkills).then(function(){var seen={};first.forEach(function(x){seen[(x.sec+"|"+x.title).toLowerCase()]=1;});
      P.suggested=first.concat((P.suggested||[]).filter(function(x){return !seen[(x.sec+"|"+x.title).toLowerCase()];}));MT().done.read=Date.now();save();});});}
function edgeAll(force){var E=EDGE(),q=Promise.resolve();["tr","bl","ed"].forEach(function(k){q=q.then(function(){if(E[k]&&!force)return;return runOne(function(){edgeRun(k);});});});return q;}
function doRest(){if(busyNow()||needModel())return;var S=CS(),m=MT(),E=EDGE(),jobs=[];MSTOP=false;
  if(!stDone("read"))jobs.push(readSources);
  if(!stDone("edge"))jobs.push(function(){return edgeAll(false);});
  if(!stDone("paths"))jobs.push(function(){if(!wantsText()&&!S.goals.length){say("Your mentor needs the short talk first to think through paths: it is step 2.");return;}return runOne(paths);});
  var cv=cvDoc();if(cv&&!E.docs[cv.id])jobs.push(function(){return runOne(function(){docAdvise(cv);});});
  if(!jobs.length){m.step="sum";save();render();return;}
  var i=0;function next(){if(i>=jobs.length)return Promise.resolve();return Promise.resolve(jobs[i++]()).then(next);}
  m.chain=true;save();next().then(function(){m.chain=false;m.step=nextStep()==="sum"?"sum":nextStep();save();render();say("Your mentor has finished the steps it could do. Your summary is in step 7.");},
    function(){m.chain=false;save();render();say("Stopped. Whatever was finished is kept; Do the rest for me goes on from there.");});}
function mLede(R,t){R.body.appendChild(h("p","c-note c-pad",esc(t)));}
function mNextKey(R,k,label){R.foot.appendChild(h("span","c-grow"));R.foot.appendChild(cbtn("pri",label,function(){var m=MT();m.step=k;save();jump();render();}));}
function mSources(){var S=CS(),P=S.profile,M=lectorMe(),me=isMe(),R=panel("csWork","1. What I can read about you"),list=h("div","c-srcs");
  mLede(R,"Your mentor learns about you from what you give it here, so you never type your profile from scratch. Add what you have; anything can wait.");
  var runs=[];if(me)try{lxState().runs.forEach(function(x){if(x.kind==="app"&&x.status==="done"&&runs.every(function(y){return y.name!==x.name;}))runs.push(x);});}catch(e){}
  function row(ok,title,sub,keys){var r=h("div","c-src"),tx=h("div","tx");tx.appendChild(h("b",null,esc((ok?"✓ ":"")+title)));tx.appendChild(h("small",null,esc(sub)));r.appendChild(tx);
    if(keys&&keys.length){var k=h("div","c-keys");keys.forEach(function(x){k.appendChild(x);});r.appendChild(k);}list.appendChild(r);}
  row(!!M.cv,me?"Your CV":"Their CV",M.cv?M.cv.name+", kept "+dayStr(M.cv.at||Date.now())+".":"A Word file, a PDF or text.",[cbtn("sm",M.cv?"Replace":"Add",addCv)]);
  row(P.files.length>0,"Your documents",P.files.length?P.files.length+" kept: cover letters, a portfolio, a statement, a proposal.":"Cover letters, a portfolio, a statement, a proposal: anything about your work.",[cbtn("sm","Add",addDocs)]);
  row(!!P.linkedin,"Your LinkedIn export",P.linkedin?"Read "+dayStr(P.linkedin.at)+".":"The .zip LinkedIn sends when you ask it for a copy of your data.",[cbtn("sm",P.linkedin?"Read it again":"Add",function(){pickFile(".zip,.csv",true,function(fs){importLinkedIn(fs).catch(function(e){say("It could not be read: "+(e&&e.message||e));});});})]);
  if(me)row(runs.length>0,"Lector's readings of your apps",runs.length?runs.map(function(x){return x.name+(x.version?" "+x.version:"");}).join(", ")+".":"None yet: read your apps in Lector, and your mentor uses what it finds.",runs.length?[]:[cbtn("sm","Open Lector",function(){go("lector");})]);
  row(false,"A profile file","Entries, documents and a CV kept in one file, from another device or another time.",[cbtn("sm","Bring one in",packPick)]);
  R.body.appendChild(list);R.foot.appendChild(h("span","c-grow"));
  R.foot.appendChild(cbtn("pri","Next: a short talk",function(){var m=MT();m.done.sources=m.done.sources||Date.now();m.step="talk";save();jump();render();}));return R;}
function mTalk(){var m=MT(),P=CS().profile,R=panel("csWork","2. A short talk");
  if(!m.talkSeeded){["need","avoid","where","when"].forEach(function(k){if(!m.ans[k]&&String(P.wants[k]||"").trim())m.ans[k]=String(P.wants[k]).trim();});m.talkSeeded=true;}
  var i=Math.max(0,Math.min(TALK.length-1,m.qi)),q=TALK[i],c=h("div","c-col c-pad");
  c.appendChild(h("span","c-k",esc("Question "+(i+1)+" of "+TALK.length)));c.appendChild(h("h3","c-today-step",esc(q[1])));if(q[2])c.appendChild(h("p","c-note",esc(q[2])));
  var t=h("textarea","c-ta");t.id="csTalk";t.value=m.ans[q[0]]||"";t.setAttribute("aria-label",q[1]);t.style.minHeight="120px";var tm=null;
  t.addEventListener("input",function(){m.ans[q[0]]=t.value;clearTimeout(tm);tm=setTimeout(save,500);});c.appendChild(t);
  c.appendChild(h("p","c-note",esc("Your words, as you would say them. Saved as you type; you can stop and come back at any time.")));R.body.appendChild(c);
  if(i>0)R.foot.appendChild(cbtn("quiet","Back",function(){m.ans[q[0]]=t.value;m.qi=i-1;save();render();}));
  R.foot.appendChild(h("span","c-grow"));
  if(i<TALK.length-1){R.foot.appendChild(cbtn("","Skip",function(){m.qi=i+1;save();render();}));R.foot.appendChild(cbtn("pri","Next",function(){m.ans[q[0]]=t.value;m.qi=i+1;save();render();}));}
  else R.foot.appendChild(cbtn("pri","Finish the talk",function(){m.ans[q[0]]=t.value;talkApply();m.done.talk=Date.now();m.step="read";save();render();say("Thank you. Your answers are in Your profile, What you are looking for, where you can change them at any time.");}));
  setTimeout(function(){try{t.focus();}catch(e){}},30);return R;}
function mRead(){var S=CS(),P=S.profile,m=MT(),sg=P.suggested||[],R=panel("csWork","3. Your entries, found");
  if(sg.length){var it=sg[0],c=h("div","c-col c-pad");c.appendChild(h("span","c-k",esc(sg.length===1?"The last one to look at":"1 of "+sg.length+" to look at")));
    var card=h("div","c-entry");card.appendChild(h("span","c-sec",esc((SECTS.filter(function(x){return x[0]===it.sec;})[0]||["",""])[1].replace(/, with evidence$/,""))));card.appendChild(h("b",null,esc(it.title)));
    var meta=[it.place,[it.from,it.to].filter(Boolean).join(" to ")].filter(Boolean).join(" · ");if(meta)card.appendChild(h("small",null,esc(meta)));if(it.text)card.appendChild(h("p",null,esc(it.text)));c.appendChild(card);
    c.appendChild(h("p","c-note",esc("Keep it if it is right (you can change it later in Your profile), or drop it. Nothing enters your profile by itself.")));R.body.appendChild(c);
    function keepOne(x){var nw=Object.assign({},x,{id:uid("it"),src:x.src==="linkedin-new"?"linkedin":"me",at:Date.now()});delete nw.note;delete nw.was;P.items.push(nw);}
    R.foot.appendChild(cbtn("quiet","Keep all the rest",function(){sg.forEach(keepOne);P.suggested=[];P.at=Date.now();save();render();say("Kept in your profile.");}));R.foot.appendChild(h("span","c-grow"));
    R.foot.appendChild(cbtn("","Drop",function(){P.suggested=sg.slice(1);save();render();}));
    R.foot.appendChild(cbtn("pri","Keep",function(){keepOne(it);P.suggested=sg.slice(1);P.at=Date.now();save();render();}));return R;}
  if(m.done.read){mLede(R,"Every entry found is looked at. Your profile holds "+P.items.length+" entr"+(P.items.length===1?"y":"ies")+". Read your sources again whenever you add something new.");
    R.foot.appendChild(cbtn("quiet","Read my sources again",function(){if(busyNow()||needModel())return;MSTOP=false;readSources().then(render,render);}));mNextKey(R,"edge","Next: what transfers");return R;}
  mLede(R,"Your mentor reads your CV, documents, LinkedIn export and Lector's readings, and finds the entries and skills they show. You keep or drop each one, one at a time.");
  R.foot.appendChild(h("span","c-grow"));R.foot.appendChild(cbtn("pri","Read my sources",function(){if(busyNow()||needModel())return;MSTOP=false;readSources().then(render,render);}));return R;}
function mList(title,list,f){if(!list||!list.length)return null;var b=h("div","c-col c-pad");b.appendChild(h("div","c-label",esc(title)));var ul=h("ul","c-fb");list.forEach(function(x){var li=h("li");li.innerHTML=f(x);ul.appendChild(li);});b.appendChild(ul);return b;}
function mEdge(){var E=EDGE(),R=panel("csWork","4. What transfers, and your blind spots"),any=false;
  mLede(R,"What you did in one place that counts in another, what a reader will miss or ask, and what few others can show. Only what your sources show; nothing invented.");
  [mList("What transfers",E.tr&&E.tr.list.slice(0,6),function(x){return esc(x.skill)+(x.line?"<small>"+esc(x.line)+"</small>":x.evidence?"<small>"+esc(x.evidence)+"</small>":"");}),
   mList("Your blind spots",E.bl&&E.bl.list.slice(0,5),function(x){return esc(x.what)+(x.fix?"<small>"+esc("What to do: "+x.fix)+"</small>":"");}),
   mList("What sets you apart",E.ed&&E.ed.list.slice(0,4),function(x){return esc(x.what)+(x.say?"<small>"+esc(x.say)+"</small>":"");})].forEach(function(b){if(b){R.body.appendChild(b);any=true;}});
  R.foot.appendChild(cbtn("quiet","See it all in Your edge",function(){CS().ui.room="edge";show("list");save();render();}));
  if(stDone("edge"))mNextKey(R,"paths","Next: paths that fit");
  else{R.foot.appendChild(h("span","c-grow"));R.foot.appendChild(cbtn("pri",any?"Finish this step":"Find them",function(){if(busyNow()||needModel())return;MSTOP=false;edgeAll(false).then(render,render);}));}
  return R;}
function mPaths(){var R=pathsPanel();R.title.textContent="5. Paths that fit";
  if(!wantsText()&&!CS().goals.length){R.body.insertBefore(h("p","c-note c-pad",esc("Your mentor starts from what you said in the short talk: have it first, in step 2.")),R.body.firstChild);}
  if(stDone("paths")){R.foot.appendChild(cbtn("","Next: your CV",function(){MT().step="cv";save();jump();render();}));}return R;}
function mCv(){var E=EDGE(),R=panel("csWork","6. Your CV and documents, looked at with you"),docs=edgeDocs().filter(function(d){return !/^o:/.test(d.id);}),cv=cvDoc();
  mLede(R,"Each document is looked at against your profile and what you are looking for: what could do more, what your record adds that it leaves out, what could go, and what a reader will ask. It is never rewritten for you.");
  if(!cv){var k=h("div","c-keys c-pad");k.appendChild(cbtn("pri","Add your CV",addCv));R.body.appendChild(k);}
  var shown=cv&&E.docs[cv.id]?cv:null;if(shown){var fb=E.docs[shown.id].fb||{};ADV_TAGS.forEach(function(a){var L=fb[a[0]];var b=mList(a[1],L&&L.slice(0,4),function(p){return esc(p[0])+(p[1]?"<small>"+esc(p[1])+"</small>":"");});if(b)R.body.appendChild(b);});}
  if(docs.length){var lst=h("div","c-srcs");docs.forEach(function(d){var r=h("div","c-src"),tx=h("div","tx"),got=E.docs[d.id];tx.appendChild(h("b",null,esc((got?"✓ ":"")+d.name)));tx.appendChild(h("small",null,esc(got?"Looked at "+dayStr(got.at)+" (in Your edge, Your documents).":d.sub)));r.appendChild(tx);
      var kk=h("div","c-keys");kk.appendChild(cbtn("sm"+(got?"":" pri"),got?"Look again":"Look at it",function(){docAdvise(d);}));r.appendChild(kk);lst.appendChild(r);});R.body.appendChild(lst);}
  mNextKey(R,"sum","Next: your summary");return R;}
function mSum(){var S=CS(),E=EDGE(),m=MT(),R=panel("csWork","7. Your mentor's summary"),cv=cvDoc(),fb=cv&&E.docs[cv.id]?E.docs[cv.id].fb||{}:{},lines=[];
  m.done.sum=Date.now();
  var week=[];(S.paths&&S.paths.list||[]).slice(0,2).forEach(function(p){if(p.first)week.push(p.first+" (for "+p.path+")");});(E.bl&&E.bl.list||[]).slice(0,2).forEach(function(b){if(b.fix)week.push(b.fix);});
  (fb.NEXT||[]).slice(0,1).forEach(function(p){week.push(p[0]);});
  week=week.filter(function(x,i){var k=String(x).toLowerCase().trim();return week.findIndex(function(y){return String(y).toLowerCase().trim()===k;})===i;});
  var add=[];(fb.ADD||[]).slice(0,4).forEach(function(p){add.push(p[0]+(p[1]?": "+p[1]:""));});(E.tr&&E.tr.list||[]).slice(0,3).forEach(function(x){add.push(x.skill+(x.line?": "+x.line:""));});
  var fromApps=[];Object.keys(E.apps||{}).forEach(function(k){var a=E.apps[k];(a.list||[]).filter(function(x){return x.fresh||!a.earlier;}).slice(0,3).forEach(function(x){fromApps.push(x.skill+" (from "+k+(a.version?" "+a.version:"")+(x.fresh?", new in this build":"")+")");});});
  var blocks=[["This week, one at a time",week],["What to add to your CV and letters",add],["New from Lector's readings of your apps",fromApps.slice(0,6)],
    ["Your blind spots to mend first",(E.bl&&E.bl.list||[]).slice(0,3).map(function(b){return b.what+(b.fix?": "+b.fix:"");})],
    ["Where you stand out",(E.ed&&E.ed.list||[]).slice(0,3).map(function(x){return x.what;})],
    ["Paths that fit",(S.paths&&S.paths.list||[]).map(function(p){return p.path+(p.fits?": "+p.fits:"");})]];
  var any=false;blocks.forEach(function(b){if(!b[1].length)return;any=true;var x=mList(b[0],b[1],function(t){return esc(t);});R.body.appendChild(x);lines.push(b[0]+":");b[1].forEach(function(t){lines.push("- "+t);});lines.push("");});
  if(!any)mLede(R,"Your summary gathers what the steps before found. None of them has run yet: Do the rest for me runs them for you, one after another.");
  else R.body.appendChild(h("p","c-note c-pad",esc("Drawn from your sources and what you said, with "+(modelName()||"your model")+". What it says about a field, an employer or a programme is for you to check before you rely on it.")));
  if(any)R.foot.appendChild(cbtn("","Copy the summary",function(){var t=lines.join("\n");try{navigator.clipboard.writeText(t).then(function(){say("Copied.");},function(){say("It could not be copied here.");});}catch(e){say("It could not be copied here.");}}));
  R.foot.appendChild(h("span","c-grow"));var nx=nextStep();if(nx!=="sum")R.foot.appendChild(cbtn("pri","Do the rest for me",doRest,"Runs every step still to do, one after another"));
  else if(S.paths&&S.paths.list&&S.paths.list.length&&!S.paths.list.some(function(p){return p.kept;}))R.foot.appendChild(cbtn("pri","Make paths into goals",function(){CS().ui.room="goals";show("list");save();render();}));
  save();return R;}
function paintMentor(par){var S=CS(),m=MT(),nx=nextStep(),cur=m.step||nx;if(cur==="sum"&&!RUN.busy)m.done.sum=Date.now();var L=panel("csList","Your mentor");
  MS.forEach(function(x,i){var d=stDone(x[0]),sub=d?(x[0]==="sum"?"Read "+dayStr(d):"Done "+dayStr(d)):(x[0]===nx?"Next":x[0]==="sum"?"When the steps are done":"Not yet");
    L.body.appendChild(item((i+1)+". "+x[1],sub,cur===x[0],function(){m.step=x[0];show("work");save();jump();render();},x[0]===nx&&!d?"c-new":""));});
  L.foot.appendChild(cbtn("pri","Do the rest for me",doRest,"Runs every step that needs your model, one after another; Stop stops it, and whatever was finished is kept"));
  if(RUN.busy){two(L,livePanel(),par);return;}
  var R=({sources:mSources,talk:mTalk,read:mRead,edge:mEdge,paths:mPaths,cv:mCv,sum:mSum}[cur]||mSources)();
  R.head.insertBefore(cbtn("quiet c-back","‹ Your mentor",function(){show("list");save();render();}),R.head.firstChild);two(L,R,par);}
ICON.mentor='<circle cx="12" cy="12" r="8.5"/><path d="M15.6 8.4l-2.1 5.1-5.1 2.1 2.1-5.1z"/>';

/* ---------------- its place: the page, the menu, go() ---------------- */
function install(){if($("page-career"))return;
  var sec=h("section","section");sec.id="page-career";
  sec.innerHTML='<h1 class="page-title">Career Studio</h1><div id="cs"><div class="c-head"><div><div class="c-hrow"><h1>Career Studio</h1><label class="c-who"><span>Profile</span><select id="csWho" aria-label="Whose profile is open"></select></label></div><p>Your profile, the posts, programmes and grants you are weighing, and what you send. Everything stays on this device.</p></div>'+
    '<div class="rm-tabs" role="tablist" aria-label="The studio\'s rooms">'+[["today","Today"],["mentor","Your mentor"],["apps","Applications"],["people","People"],["profile","Your profile"],["edge","Your edge"],["goals","Goals and plan"],["learn","Learn"]].map(function(r){
      return '<button type="button" class="rm-tab" role="tab" data-room="'+r[0]+'" aria-selected="false" tabindex="-1">'+ico(r[0])+'<span>'+r[1]+'</span></button>';}).join("")+'</div></div><div id="csHost"></div></div>';
  var after=$("page-lector")||$("page-blend");if(after&&after.parentNode)after.parentNode.insertBefore(sec,after.nextSibling);else{var mn=D.querySelector(".main");if(!mn)return;mn.appendChild(sec);}
  var who=sec.querySelector("#csWho");if(who)who.addEventListener("change",function(){var v=who.value;if(v==="+manage"){var S=CS();S.ui.room="profile";S.ui.ppart="people";show("work");save();render();return;}switchTo(v);});
  var tabs=[].slice.call(sec.querySelectorAll(".rm-tabs [data-room]"));
  tabs.forEach(function(b,i){b.addEventListener("click",function(){var S=CS();S.ui.room=b.getAttribute("data-room");S.ui.show="list";if(S.ui.room==="apps"&&S.ui.open==="new")S.ui.open=null;save();render();});
    /* the arrow keys go from room to room, as in Settings */
    b.addEventListener("keydown",function(e){var k=e.key==="ArrowRight"?1:e.key==="ArrowLeft"?-1:0;if(!k)return;e.preventDefault();var n=tabs[(i+k+tabs.length)%tabs.length];n.focus();n.click();});});
  var nb=D.querySelector('.nav-btn[data-page="lector"]');
  if(nb){var b=h("button","nav-btn");b.type="button";b.setAttribute("data-page","career");b.setAttribute("onclick","go('career')");b.title="Career Studio";
    b.innerHTML='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3.5" y="7.5" width="17" height="12" rx="2"/><path d="M9 7.5V5.8A1.8 1.8 0 0 1 10.8 4h2.4A1.8 1.8 0 0 1 15 5.8v1.7M3.5 12.5h17M11 12.5v1.6h2v-1.6"/></svg>Career';nb.parentNode.insertBefore(b,nb.nextSibling);}
  if(W.PAGES&&PAGES.indexOf("career")<0)PAGES.push("career");}
install();
try{var og=go;go=function(p){var r=og.apply(this,arguments);try{if(p==="career"){render();fitSoon();}}catch(e){try{console.error("R188",e);}catch(_){}}return r;};window.go=go;}catch(e){}
try{if($("page-career").classList.contains("active"))render();}catch(e){}
window.IngCareer={state:CS,render:render,/* 6.58 */ mentor:{state:MT,next:nextStep,done:stDone,talk:TALK,steps:MS,apply:talkApply,rest:doRest,readSources:readSources},/* 6.44 */ adviseDoc:adviseDoc,spotSkills:spotSkills,appSkills:appSkills,edgeRun:edgeRun,docAdvise:docAdvise,edgeDocs:edgeDocs,paths:paths,tagged:tagged,targetsText:targetsText,profileForChat:profileForChat,newOpp:newOpp,read:readOpp,fetchPosting:fetchPosting,jl:{norm:jlNorm,ats:jlAts,api:jlApi,text:jlText,unent:jlUnent,fromLd:jlFromLd,find:jlFind,json:jlJson,compose:jlCompose,fetch:jlFetch,wall:jlWall},vetEvidence:vetEvidence,vetLead:vetLead,saved:svList,svMerge:svMerge,write:writeDoc,findSkills:findSkills,roles:roles,goalSteps:goalSteps,reviewMine:reviewMine,parseRead:parseRead,bandOf:bandOf,checks:checks,csvObjs:csvObjs,importLinkedIn:importLinkedIn,unzip:unzip,parseLook:parseLook,fromLector:fromLector,lessons:LESSONS,run:RUN,stop:stopNow,limitsIn:limitsIn,limitFor:limitFor,coverage:coverage,wordCount:wordCount,revise:reviseDoc,earlier:earlier,how:HOW,
  root:ROOT,newPerson:newPerson,switchTo:switchTo,removePerson:removePerson,checkFind:checkFind,diffUnits:diffUnits,joinUnits:joinUnits,nextOf:nextOf,planDoc:planDoc,guideDoc:guideDoc,wayOf:wayOf,docs:DOCS,FOR:FOR,
  /* 6.9.2 */ datesOf:datesOf,remindAt:remindAt,bellFor:bellFor,estimateOf:estimateOf,exportOpp:exportOpp,exportAll:exportAll,exportFiles:exportFiles,keepToRead:keepToRead,toFontes:toFontes,readWithLector:readWithLector,readingNotes:readingNotes,
  checkAgain:checkAgain,keepRecheck:keepRecheck,addMore:addMore,postText:postText,postOnly:postOnly,makeCheck:makeCheck,lcsUnits:lcsUnits,startMock:startMock,stopMock:stopMock,startClock:startClock,stopClock:stopClock,clock:function(){return CLOCK;},mock:function(){return MOCK;},
  bellRang:bellRang,openPosts:openPosts,postFor:postFor,bringPost:bringPost,wordsChanged:wordsChanged,setRefStatus:setRefStatus,removeOpp:removeOpp,liStatus:liStatus,oppRefs:oppRefs,refsOfPerson:refsOfPerson};
/* 6.90: the studio's own parts, for the counsellor (modules/r283.js), which draws the mentor's room anew in them */
IngCareer.ui={h:h,esc:esc,panel:panel,item:item,cbtn:cbtn,chip:chip,empty:empty,two:two,fold:fold,field:field,input:input,select:select,seg:seg,livePanel:livePanel,mList:mList,say:say,save:save,uid:uid,dayStr:dayStr,jump:jump,show:show,fitSoon:fitSoon,
  SECTS:SECTS,TALK:TALK,MS:MS,MT:MT,stDone:stDone,nextStep:nextStep,talkApply:talkApply,readSources:readSources,edgeAll:edgeAll,cvDoc:cvDoc,EDGE:EDGE,addCv:addCv,addDocs:addDocs,importLinkedIn:importLinkedIn,packRead:packRead,packOpen:packOpen,packPick:packPick,pickFile:pickFile,readFile:readFile,readAsText:readAsText,loadText:loadText,
  busyNow:busyNow,needModel:needModel,modelReady:modelReady,begin:begin,end:end,failed:failed,ask:ask,gatherProfile:gatherProfile,profileBlock:profileBlock,sys:sys,room:room,tagged:tagged,cut:cut,lectorMe:lectorMe,isMe:isMe,myName:myName,personLabel:personLabel,wantsText:wantsText,modelName:modelName,whereLine:whereLine,appReadings:appReadings,cloudKey:cloudKey,
  RUN:RUN,lowDay:lowDay,ADV_TAGS:ADV_TAGS,docAdvise:docAdvise,pathsPanel:pathsPanel,edgeDocs:edgeDocs,stopNow:stopNow,waitRun:waitRun,runOne:runOne,setStop:function(v){MSTOP=!!v;},stopped:function(){return MSTOP;},paintMentor:paintMentor,paintWho:paintWho,ICON:ICON,todayStr:todayStr,goalSteps:goalSteps,appSkills:appSkills,suggest:suggest,findSkills:findSkills,ROOT:ROOT,
  oppById:oppById,sortedOpps:sortedOpps,FINISHED:FINISHED,copyText:copyText,BLW:BLW,leaves:leaves,noPay:noPay,noContact:noContact,cvNoRefs:cvNoRefs,datesOf:datesOf,daysTo:daysTo,nextOf:nextOf};
})();
;try{window.__ingParts["p188"]="running";}catch(_){}
</script>
