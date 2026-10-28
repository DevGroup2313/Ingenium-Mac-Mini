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
#cs button{font:inherit;color:inherit;margin:0}
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
#cs .c-back{display:none}
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
#cs .c-chip.c-ok,#cs .c-band-strong{color:var(--c-ok)}#cs .c-band-possible{color:#4f73ad}#cs .c-band-stretch{color:var(--c-warn)}#cs .c-band-poor{color:var(--c-bad)}
body[data-theme="night"] #cs .c-band-possible{color:#9db8e8}
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
#cs .c-empty h3{font:600 19px/1.3 var(--c-serif);letter-spacing:.03em;margin:0 0 8px}
#cs .c-empty p{color:var(--c-ink2);font-size:14px;line-height:1.6;margin:0}
/* how the studio works, and the lessons */
#cs .c-motto{margin:18px 18px 6px;padding:12px 16px;border-left:3px solid var(--c-acc);font:italic 16px/1.5 var(--c-serif);color:var(--c-ink2);background:var(--c-accs);border-radius:0 10px 10px 0}
#cs .c-motto.c-small{font-size:13.5px;margin:0 0 4px;padding:10px 12px}
#cs .c-how{list-style:none;margin:10px 18px;padding:0;display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px}
#cs .c-how li{border:1px solid var(--c-hair);border-radius:12px;padding:12px 14px;background:linear-gradient(var(--c-a),var(--c-b));box-shadow:var(--c-pill);display:grid;grid-template-columns:auto 1fr;gap:2px 10px}
#cs .c-how li i,#cs .c-lesson li i{font-style:normal;grid-row:span 2;width:24px;height:24px;border-radius:50%;display:inline-grid;place-items:center;font-size:12px;font-weight:700;color:#fff;background:linear-gradient(var(--c-pa),var(--c-pb));box-shadow:0 1px 0 var(--c-pledge)}
#cs .c-how li b{font:600 14.5px/1.3 var(--c-serif)}#cs .c-how li span{font-size:13px;color:var(--c-ink2);line-height:1.5}
#cs .c-lesson{list-style:none;margin:0;padding:18px 22px;display:flex;flex-direction:column;gap:12px;max-width:72ch}
#cs .c-lesson li{display:grid;grid-template-columns:auto 1fr;gap:12px;align-items:start;font-size:15px;line-height:1.6;color:var(--c-ink1)}
#cs .c-lesson-ol{margin:0 0 0 20px;padding:0;font-size:13.5px;line-height:1.6;color:var(--c-ink2)}#cs .c-lesson-ol li{margin:4px 0}
/* how you fit */
#cs .c-bandcard{border-radius:12px;padding:14px 16px;border:1px solid var(--c-hair);border-left:6px solid var(--c-ink3);background:linear-gradient(var(--c-a),var(--c-b));box-shadow:var(--c-pill)}
#cs .c-bandcard[data-band="strong"]{border-left-color:var(--c-ok)}#cs .c-bandcard[data-band="possible"]{border-left-color:#5f7fb0}#cs .c-bandcard[data-band="stretch"]{border-left-color:var(--c-warn)}#cs .c-bandcard[data-band="poor"]{border-left-color:var(--c-bad)}
#cs .c-bandcard h3{font:600 21px/1.2 var(--c-serif);letter-spacing:.03em;margin:0 0 6px}
#cs .c-bandcard p{margin:4px 0;font-size:13.5px;line-height:1.55;color:var(--c-ink2)}#cs .c-advice{color:var(--c-ink1) !important}
#cs .c-pc,#cs .c-next{margin:0 0 0 18px;padding:0;font-size:13.5px;line-height:1.55;color:var(--c-ink2)}#cs .c-pc li{margin:4px 0}
#cs .c-pc li b{font-size:11.5px;letter-spacing:.06em;text-transform:uppercase;margin-right:4px}#cs .c-pc .for b{color:var(--c-ok)}#cs .c-pc .against b{color:var(--c-bad)}
#cs .c-tab{width:100%;border-collapse:collapse;font-size:13px;line-height:1.45}
#cs .c-tab th,#cs .c-tab td{text-align:left;vertical-align:top;padding:7px 8px;border-top:1px solid var(--c-hair2);color:var(--c-ink2)}
#cs .c-tab th{font-size:11.5px;letter-spacing:.06em;text-transform:uppercase;color:var(--c-ink3);font-weight:700;border-top:0}
#cs .c-tab td:first-child{color:var(--c-ink1)}#cs .c-tab small{display:block;color:var(--c-ink3);font-size:11.5px}
#cs .c-st{white-space:nowrap;font-weight:700;font-size:12px;padding:2px 8px;border-radius:999px}
#cs .c-st[data-st="met"]{color:var(--c-ok);background:var(--c-oks)}#cs .c-st[data-st="partly"]{color:var(--c-warn);background:var(--c-warns)}#cs .c-st[data-st="none"]{color:var(--c-bad);background:var(--c-bads)}
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
#cs.c-one .c-back{display:inline-flex}
#cs.c-one .c-head .rm-tabs{margin-left:0;justify-content:flex-start}
#cs.c-one .c-cols,#cs.c-one .c-split{grid-template-columns:minmax(0,1fr)}
#cs.c-one .c-split{grid-template-rows:auto minmax(0,1fr)}
#cs.c-one .c-nav{border-right:0;border-bottom:1px solid var(--c-hair2);max-height:150px}
#cs.c-one .c-mine:has(.c-fbside){grid-template-columns:minmax(0,1fr)}
#cs.c-phone .c-grid2,#cs.c-phone .c-grid3,#cs.c-phone .c-how{grid-template-columns:minmax(0,1fr)}
#cs.c-phone .c-head h1{font-size:22px}#cs.c-phone .c-head p{display:none}
#cs.c-phone .c-addstep{grid-template-columns:minmax(0,1fr)}
#cs.c-phone .c-head .rm-tab{padding:6px 10px;min-height:34px;font-size:12.5px}
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
   Offline Project and my Oxford DPhil aspirations for my doctoral project with the proposal 'The Difficulty Was the
   Point'." "[a] reviewer/assistant/career counselor/recruitor/mentor all in one inside of Ingenium that will not sugarcoat
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
function CS(){var s=state.career;if(!s||typeof s!=="object")s=state.career={};
  if(!s.profile||typeof s.profile!=="object")s.profile={};var P=s.profile;
  if(!Array.isArray(P.items))P.items=[];if(!Array.isArray(P.files))P.files=[];
  if(!P.use||typeof P.use!=="object")P.use={cv:true,linkedin:true,writing:true,letters:true,fontes:false,apps:{}};if(!P.use.apps||typeof P.use.apps!=="object")P.use.apps={};
  if(typeof P.name!=="string")P.name="";if(typeof P.contact!=="string")P.contact="";
  if(!P.wants||typeof P.wants!=="object")P.wants={looking:"",need:"",avoid:"",where:"",when:""};if(!P.prefs||typeof P.prefs!=="object")P.prefs={spelling:"british"};
  if(!Array.isArray(s.goals))s.goals=[];
  if(!Array.isArray(s.opps))s.opps=[];if(!s.ui||typeof s.ui!=="object")s.ui={room:"apps",open:null};
  return s;}
function oppById(id){return CS().opps.filter(function(o){return o.id===id;})[0]||null;}
function american(){return CS().profile.prefs.spelling==="american";}
function english(){return american()?"American English":"British English";}
function wantsText(){var W0=CS().profile.wants,L=[["What I am looking for",W0.looking],["What I need",W0.need],["What I would rather avoid",W0.avoid],["Where",W0.where],["By when",W0.when]].filter(function(x){return String(x[1]||"").trim();});
  return L.length?"WHAT I AM LOOKING FOR (my wants, needs and timeline):\n"+L.map(function(x){return "- "+x[0]+": "+String(x[1]).trim();}).join("\n"):"";}
function myName(){var n=CS().profile.name;if(n)return n;try{return lxhAuthor()||"";}catch(e){return "";}}
function lectorMe(){try{return LXR().state().me;}catch(e){return {cv:null,writing:[],letters:[]};}}

/* ---------------- the model: Lector's choice for this device ---------------- */
function plan(){try{return LXR().plan();}catch(e){return null;}}
function modelReady(){var o=plan();return !!(o&&(o.link||o.chosen));}
function modelName(){var o=plan();if(!o)return "";if(o.link){try{return supModelName();}catch(e){return "the model on your other computer";}}return o.chosen?o.chosen.customName:"";}
function room(){var o=plan(),m=o&&o.chosen,ctx=8192;try{if(m)ctx=lxCtx(m)||ctx;}catch(e){}return Math.max(9000,Math.min(90000,(ctx-1800)*3));}
var RUN={busy:false,stop:false,what:"",live:"",opp:null};
function ask(build,max,temp){var o=plan(),scale=1,tries=0,waits=0;
  return new Promise(function(res,rej){(function go1(){if(RUN.stop){rej(new Error("stopped"));return;}var msgs=build(scale);RUN.live="";paintLive();
    lxAsk({modelId:o&&o.chosen?o.chosen.id:null},msgs,max,temp,function(t){RUN.live=t;paintLive();}).then(function(t){if(RUN.stop)rej(new Error("stopped"));else res(String(t||""));},function(e){var m=String(e&&e.message||e);
      if(RUN.stop){rej(new Error("stopped"));return;}
      if(m==="busy"&&waits++<200){RUN.live="Waiting for the model to finish what it is doing…";paintLive();setTimeout(go1,1500);return;}
      var big=false;try{big=lxIsCtxError(e);}catch(x){}if(big&&scale>0.3){scale*=0.7;setTimeout(go1,300);return;}
      if(++tries<=1){setTimeout(go1,1500);return;}rej(e);});})();});}
function busyNow(){if(RUN.busy){say("The studio is writing. Wait for it, or press Stop.");return true;}
  try{if(W.LX&&LX.busy){say("Lector is using the model. Wait for it, or pause it in Lector.");return true;}}catch(e){}return false;}
function needModel(){if(modelReady())return false;say("No model is ready on this device yet. Get one on the Models page: the studio writes with the model Lector uses.");return true;}
function begin(opp,what){RUN.busy=true;RUN.stop=false;RUN.what=what;RUN.live="";RUN.opp=opp?opp.id:null;CS().ui.show="work";render();}
function end(){RUN.busy=false;RUN.what="";RUN.live="";RUN.opp=null;render();}
function stopNow(){RUN.stop=true;try{if(W.Engine&&Engine.abort)Engine.abort();}catch(e){}}
function failed(e){var m=String(e&&e.message||e);end();if(m!=="stopped")say("It could not be finished: "+m);}

/* what the model is told, every time: the profile is the only source of facts about her, and nothing is invented */
function banned(){try{return (LXR().banned||[]).join(", ");}catch(e){return "";}}
function sys(extra,prose){var X="";try{if(prose)X=LXR().charter||"";}catch(e){}
  return "You write on this device for the applicant, in the first person as the applicant, in "+english()+": exact, measured and plain, never promotional. THE RULES. Use only what THE PROFILE shows about me: my posts, studies, dates, skills, results, publications and names. Never invent a skill, a post, a qualification, a date, a figure, a publication, a name, a referee or a quotation, and never stretch what the profile says into more than it says. Where the posting asks for something the profile does not show, do not claim it. Where a fact is needed and the profile does not give it, write a placeholder in square brackets, such as [the dates]. Do not flatter the reader, the organisation or me."+
    (banned()?" Words never to use: "+banned()+".":"")+X+(extra?" "+extra:"");}
function cut(t,n){t=String(t||"");if(n<=0)return "";if(t.length<=n)return t;var c=t.slice(0,n),p=Math.max(c.lastIndexOf(". "),c.lastIndexOf("\n"));return (p>n*0.6?c.slice(0,p+1):c)+" […]";}

/* ---------------- the profile, as the model reads it ---------------- */
function itemLine(it){var when=[it.from,it.to].filter(Boolean).join(" to ");return "- "+[it.title,it.place,when].filter(Boolean).join(", ")+(it.text?"\n  "+String(it.text).replace(/\n/g,"\n  "):"");}
function itemsText(){var P=CS().profile,out=[];
  SECTS.forEach(function(s){var its=P.items.filter(function(it){return it.sec===s[0]&&(it.src!=="linkedin"||P.use.linkedin);});if(its.length)out.push("## "+s[1]+"\n"+its.map(itemLine).join("\n"));});
  return out.join("\n\n");}
function appsWanted(){var P=CS().profile,out=[];try{lxState().runs.forEach(function(r){if(r.kind==="app"&&r.status==="done"&&P.use.apps[r.app||r.name]!==false&&out.every(function(x){return x.name!==r.name;}))out.push(r);});}catch(e){}return out;}
function loadText(ref){try{return ref?Promise.resolve(IngBig.load(ref)).then(function(t){return String(t||"");},function(){return "";}):Promise.resolve("");}catch(e){return Promise.resolve("");}}
/* everything the profile holds, read once for a piece of writing: {items, cv, linkedin, files[], apps[], writing, letters, sources[]} */
function gatherProfile(o){o=o||{};var P=CS().profile,M=lectorMe(),runs=appsWanted();
  return Promise.all([P.use.cv&&M.cv?loadText(M.cv.ref):"",P.use.linkedin&&P.linkedin?loadText(P.linkedin.ref):"",
      Promise.all(P.files.filter(function(f){return f.use!==false;}).map(function(f){return loadText(f.ref).then(function(t){return {name:f.name,text:t};});})),
      Promise.all(runs.map(function(r){return loadText(r.analysisRef).then(function(t){var a={};try{a=JSON.parse(t)||{};}catch(e){}return {name:r.name,an:a};});})),
      o.voice&&P.use.writing&&M.writing?Promise.all(M.writing.map(function(x){return loadText(x.ref);})):[],o.voice&&P.use.letters&&M.letters?Promise.all(M.letters.map(function(x){return loadText(x.ref);})):[]])
    .then(function(r){var G={items:itemsText(),cv:r[0],linkedin:r[1],files:r[2],apps:r[3].map(function(x){var keys=Object.keys(x.an).filter(function(k){return /brief|does|skill|made|built|research|purpose/i.test(k);});
        return {name:x.name,text:keys.map(function(k){return "("+k+") "+x.an[k];}).join("\n")};}).filter(function(x){return x.text;}),writing:(r[4]||[]).filter(Boolean),letters:(r[5]||[]).filter(Boolean),sources:[]};
      if(!o.cite||!P.use.fontes||typeof fontesItems!=="function")return G;var items=[];try{items=fontesItems().slice(0,30);}catch(e){}
      G.sources=items.map(function(c,i){var t="";try{t=fontesPlain(c);}catch(e){t=String(c.title||"");}return {n:i+1,text:t};});return G;});}
function profileBlock(G,R){var parts=[],nm=myName(),wt=wantsText();if(wt)parts.push(wt);
  parts.push("THE PROFILE (the only source of facts about me):"+(nm?"\nName: "+nm:"")+(G.items?"\n\n"+cut(G.items,Math.floor(R*0.34)):""));
  if(G.cv)parts.push("MY CV:\n"+cut(G.cv,Math.floor(R*0.24)));
  if(G.linkedin)parts.push("MY LINKEDIN PROFILE (its headline and summary):\n"+cut(G.linkedin,Math.floor(R*0.05)));
  if(G.files.length){var per=Math.floor(R*0.16/G.files.length);parts.push("MY DOCUMENTS:\n"+G.files.map(function(f){return "### "+f.name+"\n"+cut(f.text,per);}).join("\n\n"));}
  if(G.apps.length){var pa=Math.floor(R*0.12/G.apps.length);parts.push("MY APPS, AS LECTOR READ THEM (what I designed and built):\n"+G.apps.map(function(a){return "### "+a.name+"\n"+cut(a.text,pa);}).join("\n\n"));}
  return parts.join("\n\n");}
function material(G){return [G.items,G.cv,G.linkedin].concat(G.files.map(function(f){return f.text;})).concat(G.apps.map(function(a){return a.text;})).join("\n");}

/* ---------------- an application: its posting, and the reading of it against the profile ---------------- */
function newOpp(kind,text,from){var o={id:uid("op"),kind:kind||"job",title:"",org:"",closes:"",due:"",stage:"considering",at:Date.now(),from:from||"",ref:null,chars:0,docs:{},older:{},emails:[],practice:{crit:{},qs:[]},notes:""};
  try{var m=LXR().parsePost(text);o.title=m.title||"";o.org=m.org||"";o.closes=m.closes||"";o.due=dateIn(m.closes);}catch(e){}
  o.ref=IngBig.newId();o.chars=text.length;return Promise.resolve(IngBig.put(o.ref,text)).then(function(){CS().opps.unshift(o);CS().ui.open=o.id;CS().ui.show="work";save();return o;});}
function postText(o){return loadText(o&&o.ref);}
function kindWord(k){return {job:"posting",phd:"programme's call",grant:"call for applications",other:"posting"}[k]||"posting";}
/* the reading, line by line: what the model is asked to return, and how it is read back */
function readMsgs(G,post,o,scale){var R=room()*scale;
  var u="Read THE "+kindWord(o.kind).toUpperCase()+" against THE PROFILE, as a careful and honest adviser who never flatters.\n"+
    (wantsText()?"0. First, how it matches WHAT I AM LOOKING FOR: for each of my wants and needs that it bears on, say whether it matches, partly matches or does not, from what it says.\n":"")+
    "1. List what it asks of the person, each criterion on its own line, in its own words, shortened. Mark each ESSENTIAL or DESIRABLE as it says; where it does not say, mark ESSENTIAL what it calls required, needed or must, and DESIRABLE the rest.\n"+
    "2. Judge each from THE PROFILE alone: MET (the profile shows it plainly), PARTLY (the profile shows something close to it, but not it), or NOT SHOWN. Never count what the profile does not show. Name the evidence briefly, in the profile's own words.\n"+
    "3. Then the strengths of an application from this profile, the concerns, said plainly, the next steps, and any question worth asking the contact.\n"+
    "Answer in exactly this form, one item to a line, and nothing else:\n"+
    "TITLE: the post, programme or grant\nORGANISATION: who offers it\nCLOSES: the closing date as it gives it, or unknown\nKIND: JOB or PHD or GRANT or OTHER\n"+
    (wantsText()?"WANT: what I am looking for or need | MATCHES or PARTLY or DOES NOT MATCH or NOT SAID | what it offers on that point\n(one WANT line for each of my wants and needs it bears on)\n":"")+
    "CRITERION: the criterion | ESSENTIAL or DESIRABLE | MET or PARTLY or NOT SHOWN | the evidence from the profile, or none\n(one CRITERION line for each criterion, at most 14)\n"+
    "STRENGTH: a strength of this application, from the profile\nCONCERN: a weakness or a risk, said plainly\nNEXT: a concrete next step\nASK: a question worth asking the contact\n\n"+
    "THE "+kindWord(o.kind).toUpperCase()+":\n"+cut(post,Math.floor(R*0.3))+"\n\n"+profileBlock(G,R*0.66);
  return [{role:"system",content:sys("You are now reading an opportunity against my profile for me, and you say plainly what it shows, including what it does not show.")},{role:"user",content:u}];}
function parseRead(t){var r={title:"",org:"",closes:"",kind:"",wants:[],crit:[],strengths:[],concerns:[],next:[],asks:[]};
  String(t||"").replace(/<think>[\s\S]*?<\/think>/g,"").split("\n").forEach(function(line){var L=line.replace(/\*\*/g,"").replace(/^\s*(?:[-*•]\s*)?/,"").trim(),m=/^([A-Za-z][A-Za-z ]{1,14}):\s*(.*)$/.exec(L);if(!m)return;var k=m[1].trim().toUpperCase(),v=m[2].trim();if(!v)return;
    if(k==="TITLE")r.title=v;else if(k==="ORGANISATION"||k==="ORGANIZATION")r.org=v;else if(k==="CLOSES")r.closes=/^unknown$/i.test(v)?"":v;else if(k==="KIND")r.kind=v.toLowerCase();
    else if(k==="CRITERION"){var p=v.split("|").map(function(x){return x.trim();});if(!p[0])return;var ess=!/^desirable/i.test(p[1]||""),st=/not\s*shown|^no\b/i.test(p[2]||"")?"none":/^partly|^partial/i.test(p[2]||"")?"partly":/^met|^yes/i.test(p[2]||"")?"met":"none";
      var ev=(p[3]||"").replace(/^none\.?$/i,"");if(st!=="none"&&!ev)st="partly";r.crit.push({text:p[0],ess:ess,st:st,ev:ev});}
    else if(k==="WANT"){var w=v.split("|").map(function(x){return x.trim();});if(!w[0])return;var ws=/does\s*not|^no\b/i.test(w[1]||"")?"none":/^partly|^partial/i.test(w[1]||"")?"partly":/not\s*said|unknown|unclear/i.test(w[1]||"")?"unsaid":/^match|^yes/i.test(w[1]||"")?"met":"unsaid";r.wants.push({text:w[0],st:ws,offer:w[2]||""});}
    else if(k==="STRENGTH")r.strengths.push(v);else if(k==="CONCERN")r.concerns.push(v);else if(k==="NEXT")r.next.push(v);else if(k==="ASK")r.asks.push(v);});
  r.crit=r.crit.slice(0,14);return r;}
/* the band follows from the criteria by a fixed rule, shown with it; it is not a probability */
var BANDS={strong:"Strong fit",possible:"Possible fit",stretch:"A stretch",poor:"Not a fit as your profile stands"};
function bandOf(r){var c=r.crit||[];if(!c.length)return null;var E=c.filter(function(x){return x.ess;});if(!E.length)E=c;var Dz=c.filter(function(x){return E.indexOf(x)<0;});
  var met=E.filter(function(x){return x.st==="met";}).length,part=E.filter(function(x){return x.st==="partly";}).length,none=E.length-met-part,dm=Dz.filter(function(x){return x.st==="met";}).length+0.5*Dz.filter(function(x){return x.st==="partly";}).length;
  var b=none===0&&part<=E.length/4&&(!Dz.length||dm>=Dz.length/2)?"strong":none===0?"possible":(none===1||none<=E.length/3)?"stretch":"poor";
  var why=[];why.push(met+" of "+E.length+" essential criteria "+(E.length===1?"is":"are")+" shown plainly in your profile"+(part?"; "+part+" "+(part===1?"is":"are")+" only partly shown":"")+(none?"; "+none+" "+(none===1?"is":"are")+" not shown":"")+".");
  if(Dz.length){var dmet=Dz.filter(function(x){return x.st==="met";}).length;why.push("Of the "+Dz.length+" desirable, "+dmet+" "+(dmet===1?"is":"are")+" shown plainly.");}
  var adv={strong:"Apply. Lead with the criteria you meet most plainly.",possible:"Apply, and make the partly shown criteria plain in what you send: they are where a reader will hesitate.",
    stretch:"Apply only if you can show the missing criteria: add the evidence to your profile and read it again, or ask the contact first whether they would consider you.",poor:"Do not apply as things stand. If the missing criteria are things you have done, add them to your profile and read it again."}[b];
  return {band:b,word:BANDS[b],why:why,advice:adv,rule:"The rule: every essential criterion shown and most desirable ones, a strong fit; every essential shown, a possible fit; one essential not shown (or up to a third), a stretch; more, not a fit. A criterion your profile does not show may still be one you meet: then add it to your profile."};}
function readOpp(o){if(busyNow()||needModel())return;begin(o,"Reading it against your profile");
  Promise.all([postText(o),gatherProfile({})]).then(function(x){var post=x[0],G=x[1];if(!post)throw new Error("the posting's text is no longer kept; add it again");
    return ask(function(sc){return readMsgs(G,post,o,sc);},1500,0.2).then(function(t){var r=parseRead(t);
      if(!r.crit.length)throw new Error("the model's answer could not be read as criteria. Try again, or choose a larger model for Lector");
      if(r.title&&!o.titleSet)o.title=r.title.slice(0,120);if(r.org&&!o.orgSet)o.org=r.org.slice(0,120);if(r.closes&&(!o.closes||o.closes.length>40))o.closes=r.closes.slice(0,80);if(!o.due&&dateIn(o.closes))o.due=dateIn(o.closes);
      if(/phd|dphil|doctor/i.test(r.kind)&&o.kind==="job"&&!o.kindSet)o.kind="phd";else if(/grant|fellow/i.test(r.kind)&&o.kind==="job"&&!o.kindSet)o.kind="grant";
      o.read={at:Date.now(),model:modelName(),r:r};o.step="fit";save();});}).then(end,failed);}

/* ---------------- the documents ---------------- */
var DOCS={cv:["Tailored CV","A CV in the order this application asks for, from your profile alone."],
  cover:["Cover letter","A letter of four or five paragraphs: what you apply for, the evidence, why here, the close."],
  supporting:["Supporting statement","Each criterion in turn, with your evidence under it; what your profile does not show is left for you."],
  statement:["Personal statement","Why this programme, your preparation, your research and what you bring."],
  proposal:["Research proposal outline","An outline in the usual parts, with what your documents already give and the questions still open."]};
var FOR={job:["cv","cover","supporting"],phd:["statement","proposal","cv","cover"],grant:["proposal","statement","cv","cover"],other:["cv","cover","supporting","statement","proposal"]};
var ROLES=[["supervisor","A prospective supervisor"],["pastsup","A past or present supervisor"],["referee","A referee"],["mentor","A mentor"],["manager","A hiring manager"],["recruiter","A recruiter"],["contact","The contact named in the posting"]];
var PURPOSES=[["enquire","To ask about the post or programme"],["advice","To ask for advice on my application"],["introduce","To introduce myself and my research"],["reference","To ask for a reference"],["followup","To follow up on my application"],["thanks","To thank them after an interview"],["accept","To accept an offer"],["decline","To decline an offer"]];
function critBlock(o){var r=o.read&&o.read.r;if(!r||!r.crit.length)return "";return "THE CRITERIA, AS READ AGAINST MY PROFILE:\n"+r.crit.map(function(c){return "- "+c.text+" ("+(c.ess?"essential":"desirable")+"; "+{met:"shown",partly:"partly shown",none:"NOT SHOWN: do not claim it"}[c.st]+(c.ev?"; evidence: "+c.ev:"")+")";}).join("\n");}
function voiceBlock(G,R){var out=[];if(G.writing.length)out.push("MY OWN WRITING (match its voice and rhythm; do not copy its content):\n"+cut(G.writing.join("\n\n---\n\n"),Math.floor(R*0.06)));
  if(G.letters.length)out.push("MY PAST LETTERS (for their shape and tone only; their facts may be out of date):\n"+cut(G.letters.join("\n\n---\n\n"),Math.floor(R*0.06)));return out.join("\n\n");}
function sourcesBlock(G){if(!G.sources.length)return "";return "MY SOURCES (cite one by its number in square brackets, like [2], only where it supports the sentence; invent none and use none that is not here):\n"+G.sources.map(function(s){return "["+s.n+"] "+s.text;}).join("\n");}
function to(o){var t=[o.title,o.org].filter(Boolean).join(", ");return t||"this "+({job:"post",phd:"programme",grant:"grant"}[o.kind]||"opportunity");}
function docAsk(kind,o,G,post,em){
  var what={cv:"Write my CV for my application to "+to(o)+", in Markdown. Use level-two headings (##) for its sections, in the order that serves this application best, from these: Education, Posts held, Research and publications, Teaching, Projects, Skills, Languages, Awards and funding, Referees. Leave out a section the profile has nothing for. Each entry: one line in bold giving what and where, then the dates after a comma; then up to four bullet points, each beginning with a verb, naming concrete work and exact figures from the profile. Put first what the posting asks for most. Do not write my name or my contact details: they are set above the CV. Write no introduction and no closing note.",
    cover:"Write my cover letter for "+to(o)+". Four or five paragraphs. Begin with \"Dear [the reader's name],\" unless the posting names the reader. The opening says what I apply for and why, in one or two sentences. The middle paragraphs set my evidence from the profile against what the posting asks, the essential criteria first, naming concrete work. Then why this organisation or programme, from what the posting itself says of it. Close courteously, and end with \"Yours sincerely,\" when the reader is named, otherwise \"Yours faithfully,\", and then my name. No headings.",
    supporting:"Write my supporting statement for "+to(o)+". Take each criterion in turn, the essential ones first, as a level-two heading (##) in the posting's own words. Under each, one or two paragraphs giving my evidence from the profile: what I did, how I did it and what came of it. Where the criteria list says NOT SHOWN, write under that heading only: [Not shown in your profile: add your evidence here, or leave this criterion out.] Never invent evidence.",
    statement:"Write my personal statement for "+to(o)+", in about 750 words, in paragraphs, without headings: why this programme and why now; how my studies and work have prepared me, with concrete evidence from the profile; the research I want to do and how it meets what the programme offers, as the call describes it; what I would bring. Name no supervisor, method or source that the profile and the call do not name.",
    proposal:"Write an outline of my research proposal for "+to(o)+": an outline to work from, not a finished proposal. Use these level-two headings (##): Working title; The question; Why it matters; What is already known; Approach and methods; Sources and materials; Timetable; Fit with the programme. Under each, first what my profile and documents already give, in my own words, as short paragraphs; then, as a short list in square brackets, the questions I must still answer for that part. Never invent a finding, a source, a method or a date I have not named.",
    email:""}[kind];
  if(kind==="email"){var role=(ROLES.filter(function(x){return x[0]===em.role;})[0]||ROLES[5])[1].toLowerCase(),pur=(PURPOSES.filter(function(x){return x[0]===em.purpose;})[0]||PURPOSES[0])[1].toLowerCase();
    what="Write an email from me to "+role+", "+pur+", about "+to(o)+". Begin with a line \"Subject: \" and the subject, then a blank line, then the email. Courteous, direct and specific, with one clear request; "+(em.purpose==="introduce"?"no more than 300 words":"no more than 180 words")+". Greet the person by name only if the profile or the posting names them; otherwise write [their name]. Sign it with my name."+(em.extra?" Also: "+em.extra:"");}
  var prose=kind!=="cv";
  return function(sc){var R=room()*sc;var u=what+"\n\n"+(post?"THE "+kindWord(o.kind).toUpperCase()+":\n"+cut(post,Math.floor(R*0.2))+"\n\n":"")+(critBlock(o)?critBlock(o)+"\n\n":"")+profileBlock(G,R*0.6)+
      (prose?"\n\n"+voiceBlock(G,R):"")+(kind==="statement"||kind==="proposal"?"\n\n"+sourcesBlock(G):"");
    return [{role:"system",content:sys(kind==="cv"?"You are now writing a CV: plain, factual lines, nothing promotional.":"",prose&&kind!=="email")},{role:"user",content:u}];};}
/* the second reading: every claim held to the profile, every figure to what it gives; the placeholders kept */
function examine(kind,body,G,post,o){if(!body||body.length<80)return Promise.resolve(body);RUN.what="Examining it against your profile";render();
  return ask(function(sc){var R=room()*sc;return [{role:"system",content:sys("You are now the examiner of a draft. You return the revised text and nothing else.")},
    {role:"user",content:"Below is the draft of my "+(kind==="email"?"email":DOCS[kind][0].toLowerCase())+". Examine it against THE PROFILE and return it revised.\n1. Strike every claim about me that the profile does not support, and every skill, post, date, figure or name it does not give.\n2. Make every figure and date exactly what the profile gives.\n3. Keep the shape, the headings and the placeholders in square brackets where they stand.\n4. "+english()+"; no contractions; no promotional words.\nReturn only the revised text: no notes on what you changed.\n\n"+profileBlock(G,R*0.6)+"\n\n"+(critBlock(o)?critBlock(o)+"\n\n":"")+"THE DRAFT:\n"+body}];},Math.round(body.length/3)+400,0.2)
    .then(function(x){var r=clean(x);if(!r||r.length<body.length*0.45||/^(the draft|here is|revised)/i.test(r.slice(0,24)))return body;return r;},function(e){if(String(e&&e.message)==="stopped")throw e;return body;});}
function clean(t){t=String(t||"").replace(/<think>[\s\S]*?<\/think>/g,"").trim();t=t.replace(/^```(?:markdown|md)?\n([\s\S]*?)\n```$/,"$1");var L=t.split("\n");while(L.length&&/^#\s/.test(L[0]))L.shift();return L.join("\n").trim();}
/* figures the profile does not give, and the places left for her to fill */
function checks(md,mat){var miss=[],seen={};(String(md).match(/\b\d[\d,.]*\d\b|\b\d{2,}\b/g)||[]).forEach(function(n){var k=n.replace(/[.,]+$/,"");if(seen[k]||k.replace(/\D/g,"").length<2)return;seen[k]=1;if(mat.indexOf(k)<0&&mat.indexOf(k.replace(/,/g,""))<0)miss.push(k);});
  return {figures:miss.slice(0,20),fills:(String(md).match(/\[[^\]\n]{2,160}\]/g)||[]).length};}
function writeDoc(o,kind,em){if(busyNow()||needModel())return Promise.resolve(false);begin(o,"Writing the "+(kind==="email"?"email":DOCS[kind][0].toLowerCase()));
  return Promise.all([postText(o),gatherProfile({voice:kind!=="cv",cite:kind==="statement"||kind==="proposal"})]).then(function(x){var post=x[0],G=x[1];
    if(!G.items&&!G.cv&&!G.files.length&&!G.apps.length)throw new Error("your profile is empty. Add your CV or a few entries in Your profile first: the studio writes only from what it holds");
    return ask(docAsk(kind,o,G,post,em),kind==="cv"||kind==="proposal"||kind==="supporting"?2200:kind==="statement"?1800:kind==="email"?700:1300,kind==="cv"?0.35:0.5)
      .then(function(t){return examine(kind,clean(t),G,post,o);}).then(function(md){var sf={md:md,line:""};try{if(kind!=="email"&&!american())sf=LXR().styleFix(md);}catch(e){}md=sf.md;
        var ck=checks(md,material(G)+"\n"+post);ck.style=sf.line||"";var ref=IngBig.newId();
        return Promise.resolve(IngBig.put(ref,md)).then(function(){var rec={ref:ref,made:Date.now(),model:modelName(),chk:ck};
          if(kind==="email"){rec.id=uid("em");rec.role=em.role;rec.purpose=em.purpose;o.emails.unshift(rec);o.sv={kind:"email",id:rec.id};}
          else{var old=o.docs[kind];if(old){o.older[kind]=[old].concat(o.older[kind]||[]);while(o.older[kind].length>2){var z=o.older[kind].pop();try{IngBig.del(z.ref);}catch(e){}}}o.docs[kind]=rec;o.sv={kind:kind};}
          if(o.stage==="considering")o.stage="preparing";o.step="send";o.edit=false;o.tab="doc";save();return true;});});}).then(function(r){end();return r;},function(e){failed(e);return false;});}
function docRec(o,v){if(!v)return null;if(v.kind==="email")return o.emails.filter(function(e){return e.id===v.id;})[0]||null;return o.docs[v.kind]||null;}
function paperKind(kind){return kind==="cover"?"cover":"cv";}
function paperOf(o,kind,md){var P=CS().profile,title=kind==="cv"?myName()||"Curriculum vitae":DOCS[kind][0],sub=kind==="cv"?P.contact:[myName(),to(o)].filter(Boolean).join(" · ");
  return {kind:paperKind(kind),title:[myName(),DOCS[kind][0],to(o)].filter(Boolean).join(" · "),o:{title:title,plain:true,from:myName(),head:kind==="cover"?"":title,headSub:kind==="cover"?"":sub}};}
function savePaper(o,kind,fmt){var rec=o.docs[kind];if(!rec)return;loadText(rec.ref).then(function(md){var pp=paperOf(o,kind,md),what=fmt==="pdf"?"PDF":"Word file";
  if(!W.IngDoc||!IngDoc.make||!W.IngLectorPaper){say("This device cannot make the "+what+".");return;}say("Making the "+what+", as the page shows it…");
  (IngDoc.ready?IngDoc.ready():Promise.resolve()).then(function(){return IngDoc.make(fmt,IngLectorPaper.page(pp.kind,md,pp.o),IngLectorPaper.opts(pp.kind,[],pp.title));})
    .then(function(r){var name=lxFileName(pp.title);saveFileNative(name+"."+fmt,fmt==="pdf"?"application/pdf":"application/vnd.openxmlformats-officedocument.wordprocessingml.document",r.bytes);},
      function(e){say("The "+what+" could not be made: "+(e&&e.message||e));});});}
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
  Promise.all([postText(o),gatherProfile({})]).then(function(x){return ask(function(sc){var R=room()*sc;return [{role:"system",content:sys("You are now an interviewer preparing questions.")},
    {role:"user",content:"Write eight questions an interview panel for "+to(o)+" would be likely to ask me: from what it asks for, and from the concerns my profile leaves (the criteria not shown or partly shown). One question to a line, each beginning with \"Q: \", and nothing else.\n\nTHE "+kindWord(o.kind).toUpperCase()+":\n"+cut(x[0],Math.floor(R*0.3))+"\n\n"+(critBlock(o)||"")+"\n\n"+profileBlock(x[1],R*0.4)}];},700,0.5);})
    .then(function(t){var qs=String(t).split("\n").map(function(l){var m=/^\s*(?:\d+[.)]\s*)?(?:\*\*)?Q:\s*(.+)$/i.exec(l);return m?m[1].replace(/\*\*/g,"").trim():"";}).filter(Boolean).slice(0,10);
      if(!qs.length)throw new Error("no questions came back. Try again");o.practice.qs=qs.map(function(q){return {id:uid("q"),q:q,answer:"",fb:null};});save();end();},failed);}
function keepEvidence(o,crit,answer){var P=CS().profile;P.items.push({id:uid("it"),sec:"skill",title:crit.length>90?crit.slice(0,87).replace(/\s+\S*$/,"")+"…":crit,place:"",from:"",to:"",text:answer.trim(),src:"me",at:Date.now()});P.at=Date.now();save();say("Kept in your profile, under Skills, with evidence.");}

/* ---------------- the profile's sources: her CV (shared with Lector), LinkedIn, her documents ---------------- */
function pickFile(accept,multi,fn){var i=D.createElement("input");i.type="file";i.accept=accept;if(multi)i.multiple=true;i.onchange=function(){var fs=[].slice.call(i.files||[]);if(fs.length)fn(fs);};i.click();}
function readFile(f){return Promise.resolve(readAsText(f)).then(function(t){t=String(t||"");if(/\.html?$/i.test(f.name)){try{t=lxUnTag(t);}catch(e){}}return t.replace(/\r/g,"").trim();});}
function addCv(){pickFile(".docx,.pdf,.txt,.md,.rtf,.html,.htm",false,function(fs){readFile(fs[0]).then(function(t){if(t.length<80){say("That is too short to be a CV.");return;}var M=lectorMe(),ref=IngBig.newId();
  return Promise.resolve(IngBig.put(ref,t)).then(function(){if(M.cv&&M.cv.ref){try{IngBig.del(M.cv.ref);}catch(e){}}M.cv={ref:ref,name:fs[0].name,chars:t.length,at:Date.now()};CS().profile.at=Date.now();save();render();say("Your CV is kept. Lector uses the same one.");});},function(e){say("It could not be read: "+(e&&e.message||e));});});}
function addDocs(){pickFile(".docx,.pdf,.txt,.md,.rtf,.html,.htm",true,function(fs){var P=CS().profile,q=Promise.resolve(),n=0;
  fs.forEach(function(f){q=q.then(function(){return readFile(f).then(function(t){if(t.length<40)return;var ref=IngBig.newId();return Promise.resolve(IngBig.put(ref,t)).then(function(){P.files.push({id:uid("f"),name:f.name,ref:ref,chars:t.length,at:Date.now(),use:true});n++;});},function(e){say(f.name+" could not be read: "+(e&&e.message||e));});});});
  q.then(function(){if(n){P.at=Date.now();save();render();say(n+" document"+(n>1?"s are":" is")+" kept in your profile.");}});});}
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
  if(/^certifications?$/.test(n))return "certifications";if(/^honors?|^honours?/.test(n))return "honors";if(/^publications?$/.test(n))return "publications";if(/^projects?$/.test(n))return "projects";if(/^courses?$/.test(n))return "courses";if(/^volunteer/.test(n))return "volunteering";if(/^profile$/.test(n))return "profile";return "";}
function unzip(buf){var u8=new Uint8Array(buf),dv=new DataView(buf),i=u8.length-22,dec=new TextDecoder(),out=[];
  while(i>=0&&dv.getUint32(i,true)!==0x06054b50)i--;if(i<0)return Promise.reject(new Error("not a .zip file"));
  if(typeof DecompressionStream==="undefined")return Promise.reject(new Error("this window cannot open .zip files; open the .zip and add its .csv files instead"));
  var n=dv.getUint16(i+10,true),p=dv.getUint32(i+16,true),q=Promise.resolve();
  for(var k=0;k<n;k++){(function(meth,csz,name,lo){if(/\.csv$/i.test(name))q=q.then(function(){var lnl=dv.getUint16(lo+26,true),lxl=dv.getUint16(lo+28,true),st=lo+30+lnl+lxl,data=u8.subarray(st,st+csz);
      return (meth===0?Promise.resolve(data):new Response(new Blob([data]).stream().pipeThrough(new DecompressionStream("deflate-raw"))).arrayBuffer().then(function(b){return new Uint8Array(b);})).then(function(x){out.push({name:name,text:dec.decode(x)});});});})
      (dv.getUint16(p+10,true),dv.getUint32(p+20,true),dec.decode(u8.subarray(p+46,p+46+dv.getUint16(p+28,true))),dv.getUint32(p+42,true));
    p+=46+dv.getUint16(p+28,true)+dv.getUint16(p+30,true)+dv.getUint16(p+32,true);}
  return q.then(function(){return out;});}
function importLinkedIn(files){var P=CS().profile,got=[],others=[],summary=[];
  var read=files.map(function(f){if(/\.zip$/i.test(f.name))return f.arrayBuffer().then(unzip);return (f.text?f.text():readAsText(f)).then(function(t){return [{name:f.name,text:t}];});});
  return Promise.all(read).then(function(all){[].concat.apply([],all).forEach(function(c){var k=liKind(c.name),rows=csvObjs(c.text);
      if(k==="profile"){rows.forEach(function(r){var nm=[col(r,["first name"]),col(r,["last name"])].filter(Boolean).join(" ");if(nm&&!P.name)P.name=nm;var hl=col(r,["headline"]),sm=col(r,["summary"]);if(hl)summary.push("Headline: "+hl);if(sm)summary.push("Summary: "+sm);});return;}
      var M=LI[k];if(!M){if(rows.length&&/\.csv$/i.test(c.name)&&!/connections|messages|invitations|ad_|ads|inferences|logins|security|registration|phone|email|rich_media|receipts|saved|search|learning|endorsement|recommendations_given/i.test(c.name))others.push(c);return;}
      rows.forEach(function(r){var t=col(r,M.title);if(!t)return;got.push({id:uid("it"),sec:M.sec,title:t.slice(0,200),place:col(r,M.place).slice(0,200),from:col(r,M.from),to:col(r,M.to),text:M.text.map(function(x){return col(r,[x]);}).filter(Boolean).join("\n").slice(0,2000),src:"linkedin",at:Date.now()});});});
    if(!got.length&&!summary.length)throw new Error("nothing in it was recognised as LinkedIn's export. Add the .zip LinkedIn sends you, or its Profile, Positions, Education and Skills files");
    P.items=P.items.filter(function(it){return it.src!=="linkedin";}).concat(got);
    var ref=IngBig.newId();return Promise.resolve(IngBig.put(ref,summary.join("\n\n"))).then(function(){if(P.linkedin&&P.linkedin.ref){try{IngBig.del(P.linkedin.ref);}catch(e){}}
      P.linkedin={ref:ref,n:got.length,at:Date.now(),others:others.map(function(c){return c.name.replace(/^.*\//,"");})};P.at=Date.now();save();render();
      say(got.length+" entr"+(got.length===1?"y":"ies")+" came from your LinkedIn export. Look them over in Your entries: change or remove any.");});});}
/* entries suggested from her CV, LinkedIn and documents: each one she keeps or drops; none enters the profile by itself */
function suggest(){if(busyNow()||needModel())return;begin(null,"Reading your sources for entries");
  gatherProfile({}).then(function(G){if(!G.cv&&!G.files.length&&!G.linkedin)throw new Error("add your CV or a document first: entries are suggested from them");
    return ask(function(sc){var R=room()*sc;return [{role:"system",content:sys("You are now listing the entries of a profile from the documents given, exactly as they state them.")},
      {role:"user",content:"List the entries of my profile that my CV and documents state and that are not already in THE PROFILE's entries: my studies, posts, research and publications, teaching, projects, skills (each with the evidence the documents give), languages, awards and referees. Copy names, places and dates exactly; invent nothing; leave a field empty when the documents do not give it. One entry to a line, in exactly this form, and nothing else:\nENTRY: section | title | place | from | to | one line of detail\nwhere section is one of: education, post, research, teaching, project, skill, language, award, referee, other.\n\n"+profileBlock(G,R*0.9)}];},1800,0.15);})
    .then(function(t){var P=CS().profile,have={};P.items.forEach(function(it){have[(it.title+"|"+it.place).toLowerCase()]=1;});
      var s=String(t).split("\n").map(function(l){var m=/^\s*(?:[-*]\s*)?ENTRY:\s*(.+)$/i.exec(l);if(!m)return null;var p=m[1].split("|").map(function(x){return x.trim();});var sec=(p[0]||"").toLowerCase();
        if(!SECTS.some(function(x){return x[0]===sec;}))sec="other";if(!p[1])return null;return {id:uid("sg"),sec:sec,title:p[1],place:p[2]||"",from:p[3]||"",to:p[4]||"",text:p[5]||"",src:"suggested"};})
        .filter(function(x){return x&&!have[(x.title+"|"+x.place).toLowerCase()];});
      P.suggested=s.slice(0,40);if(s.length)CS().ui.ppart="found";save();end();if(!s.length)say("No new entries were found in your sources.");},failed);}

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
      P.suggested=s0.slice(0,40);if(s0.length)CS().ui.ppart="found";save();end();if(!s0.length)say("No skills with evidence were found that are not already in your profile.");},failed);}

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
  begin(o,"Looking at your draft with you");Promise.all([postText(o),gatherProfile({})]).then(function(x){return ask(function(sc){var R=room()*sc;return [{role:"system",content:sys("You are now a frank, kind reviewer. You never rewrite the draft and never write a new one: you help me make my own better.")},
    {role:"user",content:"Here is my own draft of my "+DOCS[kind][0].toLowerCase()+" for "+to(o)+". Look at it against the posting, the criteria and my profile. Answer in exactly this form, a few lines of each, and nothing else:\nWORKS: what works, and why\nMISSING: a criterion or a point it does not yet answer\nUNSUPPORTED: a claim my profile does not support, quoted, or none\nWORDING: a phrase of mine, quoted, that could be plainer or stronger, and why (do not rewrite it)\nNEXT: the one thing to do first\n\nMY DRAFT:\n"+text+"\n\nTHE "+kindWord(o.kind).toUpperCase()+":\n"+cut(x[0],Math.floor(R*0.2))+"\n\n"+(critBlock(o)||"")+"\n\n"+profileBlock(x[1],R*0.5)}];},900,0.3);})
    .then(function(t){var fb={};String(t).replace(/<think>[\s\S]*?<\/think>/g,"").split("\n").forEach(function(l){var m=/^\s*(?:[-*]\s*)?(WORKS|MISSING|UNSUPPORTED|WORDING|NEXT):\s*(.*)$/i.exec(l.replace(/\*\*/g,""));if(m&&m[2].trim()){var k=m[1].toUpperCase();(fb[k]=fb[k]||[]).push(m[2].trim());}});
      if(!Object.keys(fb).length)fb.RAW=[String(t).trim().slice(0,1500)];o.mine[kind].fb=fb;save();end();},failed);}
/* ---------------- online, only when she presses for it ---------------- */
function fetchPosting(url,kind){url=String(url||"").trim();if(!/^https?:\/\/\S+$/i.test(url)){say("Give the whole address, beginning with https://");return;}
  if(typeof fetchPageText!=="function"){say("This device cannot fetch pages.");return;}say("Fetching the posting from its address…");
  fetchPageText(url,40000).then(function(t){t=String(t||"").trim();if(t.length<200)throw new Error("too little text came back; paste the posting instead");return newOpp(kind,t,url);}).then(function(){CS().ui.room="apps";render();},function(e){say("It could not be fetched: "+(e&&e.message||e));});}
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
  ["Asking for a reference",["Ask early, and ask whether they can write a good reference, not just a reference.","Send the posting, your CV and the date it is due, and remind them of the work they know you for.","Thank them, and tell them the outcome."]],
  ["Interviews",["Prepare an example for each essential criterion: the situation, what you did yourself, and the result.","Say \"I\" for what you did. Be exact about figures and dates.","When you do not know, say so, and say how you would find out.","Prepare two or three questions of your own about the work itself."]]];

/* ---------------- painting: Lector's own panels (6.8.3) ----------------
   Her words (28 October 2026): "The Career Studio needs to be redesigned to match the rest of the app and its sleek elegant
   and elevated look. I want it to be AUDHD acessible and organised. I don't want to be endlessly scrolling on this new page,
   please keep that in mind." So the studio is laid out as Lector is: its rooms beside its name, then two raised panels that
   fill the window (a list, and the work), each scrolling inside itself; an application is taken in five numbered steps,
   one step on the screen at a time, its next action always at the foot of the panel. On a narrow screen one panel shows at
   a time, with a key back to the list. */
var ICON={apps:'<rect x="3.5" y="7.5" width="17" height="12" rx="2"/><path d="M9 7.5V5.8A1.8 1.8 0 0 1 10.8 4h2.4A1.8 1.8 0 0 1 15 5.8v1.7M3.5 12.5h17"/>',
  profile:'<circle cx="12" cy="8.5" r="3.6"/><path d="M4.8 19.5c1.2-3.6 4-5.2 7.2-5.2s6 1.6 7.2 5.2"/>',
  goals:'<path d="M6 21V4M6 4.8h10.5l-2.2 3.6 2.2 3.6H6"/>',
  learn:'<path d="M3.5 6.2c2.9-1.3 5.8-1.3 8.5.3 2.7-1.6 5.6-1.6 8.5-.3v12.6c-2.9-1.3-5.8-1.3-8.5.3-2.7-1.6-5.6-1.6-8.5-.3z"/><path d="M12 6.5v12.6"/>'};
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
  if(room0==="profile")paintProfile(two);else if(room0==="goals")paintGoals(two);else if(room0==="learn")paintLearn(two);else paintApps(two);
  root.setAttribute("data-show",S.ui.show==="work"?"work":"list");
  if(same){var nl=host.querySelector(".c-list .c-pn-b"),nr=host.querySelector(".c-work .c-pn-b");if(nl&&keepL!=null)nl.scrollTop=keepL;if(nr&&keepR!=null&&!host.__jump)nr.scrollTop=keepR;}host.__jump=false;
  /* the item in hand stays in sight in its own list (moving only that list, never the page) */
  [].forEach.call(host.querySelectorAll(".c-nav"),function(n){var c=n.querySelector('[aria-current="true"]');if(!c)return;var top=c.offsetTop-n.offsetTop;if(top<n.scrollTop||top+c.offsetHeight>n.scrollTop+n.clientHeight)n.scrollTop=Math.max(0,top-8);});
  fit();}
function jump(){var host=$("csHost");if(host)host.__jump=true;}
function two(L,R,par){L.el.classList.add("c-list");R.el.classList.add("c-work");par.appendChild(L.el);par.appendChild(R.el);}
function livePanel(){var P=panel("csLivePn",RUN.what||"Working",{cls:"c-live-pn"});var p=h("p","c-note");p.id="csWhat";p.textContent=RUN.what;P.body.appendChild(p);
  var l=h("div","c-live");l.id="csLive";l.setAttribute("aria-live","polite");l.textContent=RUN.live||"…";P.body.appendChild(l);
  var pl=plan();P.foot.appendChild(h("span","c-note c-grow",esc(pl&&pl.link?"Written with "+(modelName()||"your model")+", on your other computer, over your own network.":"Written with "+(modelName()||"your model")+" on this device. Nothing leaves it.")));
  P.foot.appendChild(cbtn("","Stop",stopNow));return P;}
function paintLive(){var l=$("csLive");if(l){l.textContent=RUN.live||"…";l.scrollTop=l.scrollHeight;}var w=$("csWhat");if(w)w.textContent=RUN.what;}
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
function removeOpp(o){var S=CS();try{IngBig.del(o.ref);}catch(e){}Object.keys(o.docs).forEach(function(k){try{IngBig.del(o.docs[k].ref);}catch(e){}(o.older[k]||[]).forEach(function(x){try{IngBig.del(x.ref);}catch(e){}});});
  o.emails.forEach(function(x){try{IngBig.del(x.ref);}catch(e){}});S.opps=S.opps.filter(function(x){return x.id!==o.id;});S.ui.open=null;show("list");save();render();}
function fbBox(fb){var d=h("div","c-fb");if(fb.RAW){d.textContent=fb.RAW;return d;}
  d.innerHTML=(fb.MEETS?"<div><b>Meets it:</b> "+esc({YES:"yes",PARTLY:"partly",NO:"not yet"}[String(fb.MEETS).toUpperCase().split(/\W/)[0]]||fb.MEETS)+"</div>":"")+(fb.WORKS?"<div><b>What works:</b> "+esc(fb.WORKS)+"</div>":"")+(fb.MISSING?"<div><b>What is missing:</b> "+esc(fb.MISSING)+"</div>":"")+(fb["ASK YOURSELF"]?"<div><b>Ask yourself:</b> "+esc(fb["ASK YOURSELF"])+"</div>":"");return d;}

/* ---- Applications: the list, and one application in five steps ---- */
var STEPS=[["post","The posting"],["fit","How you fit"],["send","What you send"],["practise","Practise"],["track","Track"]];
function stepDone(o,k){if(k==="post")return true;if(k==="fit")return !!o.read;if(k==="send")return Object.keys(o.docs).length+o.emails.length>0;
  if(k==="practise")return Object.keys(o.practice.crit).some(function(x){return o.practice.crit[x].fb;})||o.practice.qs.some(function(q){return q.fb;});
  return ["applied","interview","offer","accepted","unsuccessful","withdrawn","not"].indexOf(o.stage)>=0;}
function goStep(o,k){o.step=k;save();jump();render();}
function paintApps(par){var S=CS(),open=S.ui.open==="new"?"new":oppById(S.ui.open),list=sortedOpps();
  var L=panel("csList","Applications",{key:cbtn("pri sm","+ Bring one",function(){S.ui.open="new";show("work");save();render();},"Bring a posting, a programme's call or a grant")});
  if(!list.length)L.body.appendChild(empty("Nothing here yet","Bring a posting, a programme's call or a grant you are weighing. The studio reads what you bring; it is not a job board."));
  var fin=[],soon=0;
  list.forEach(function(o){var n=daysLeft(o),dw=dueWords(o),b=h("button","c-opp");b.type="button";if(open&&open.id===o.id)b.setAttribute("aria-current","true");
    var band=o.read&&bandOf(o.read.r);if(n!=null&&n>=0&&n<=7&&!FINISHED[o.stage])soon++;
    b.innerHTML="<b>"+esc(o.title||"Untitled")+"</b>"+(o.org?"<small>"+esc(o.org)+"</small>":"")+"<span class=\"c-tags\"><span class=\"c-chip\">"+esc(stageWord(o.stage))+"</span>"+
      (band?"<span class=\"c-chip c-band-"+band.band+"\"><i></i>"+esc(band.word)+"</span>":"")+"</span>"+(dw?"<small class=\""+(n!=null&&n>=0&&n<=7&&!FINISHED[o.stage]?"c-soon":n!=null&&n<0?"c-gone":"")+"\">"+esc(dw)+"</small>":"");
    b.addEventListener("click",function(){S.ui.open=o.id;show("work");save();render();});if(FINISHED[o.stage])fin.push(b);else L.body.appendChild(b);});
  if(fin.length){var f=fold("finished","Finished ("+fin.length+")");fin.forEach(function(b){f.appendChild(b);});L.body.appendChild(f);}
  var open0=list.length-fin.length;L.foot.appendChild(h("span","c-note",esc(list.length?open0+" open"+(soon?" · "+soon+" closing within a week":"")+(fin.length?" · "+fin.length+" finished":""):"Your applications will be listed here.")));
  var R=RUN.busy?livePanel():open==="new"?newPanel():open?oppPanel(open):introPanel();two(L,R,par);}
function introPanel(){var P=panel("csWork","How the studio works");var q=h("blockquote","c-motto","“Tell me and I forget. Teach me and I remember. Involve me and I learn.”");P.body.appendChild(q);
  var g=h("ol","c-how");[["Your profile","What you are looking for, your CV, your entries and documents, and Lector's readings of your apps: the only facts the studio uses."],
    ["Bring an opportunity","A posting, a programme's call or a grant. It is read against your profile: what matches what you want, and each criterion, shown or not."],
    ["Decide, then write","A plain band with its reasons, and advice on whether to apply. Then the CV, the letter, the statements and the emails, or your own drafts, looked at with you."],
    ["Practise and track","Your evidence and your answers, looked at with you; each application followed to its end; your goals and their steps."]].forEach(function(x,i){var li=h("li");li.innerHTML="<i>"+(i+1)+"</i><b>"+esc(x[0])+"</b><span>"+esc(x[1])+"</span>";g.appendChild(li);});
  P.body.appendChild(g);P.body.appendChild(h("p","c-note c-pad",esc(modelReady()?"Writing with "+modelName()+", the model Lector uses on this device. Nothing is searched online unless you press for it.":"No model is ready on this device yet: the studio keeps and tracks without one, and reads and writes once one is ready (Models page). Nothing is searched online unless you press for it.")));
  P.foot.appendChild(cbtn("","Open your profile",function(){CS().ui.room="profile";save();render();}));P.foot.appendChild(h("span","c-grow"));
  P.foot.appendChild(cbtn("pri","Bring a posting",function(){CS().ui.open="new";show("work");save();render();}));return P;}
function newPanel(){var S=CS(),kind="job",P=panel("csWork","Bring a posting, programme or grant",{back:"Applications",onBack:function(){S.ui.open=null;show("list");save();render();}});
  var k0=seg(OKINDS,kind,function(v){kind=v;[].forEach.call(k0.children,function(b,i){b.setAttribute("aria-pressed",OKINDS[i][0]===v?"true":"false");});},"What it is");
  var box=h("div","c-col c-fill");box.appendChild(h("p","c-note",esc("Paste its whole text: the title, who offers it, what it asks for, how to apply and when it closes. Or add it as a file, or fetch it from its address.")));
  box.appendChild(k0);var ta=h("textarea","c-ta c-grow");ta.setAttribute("aria-label","The posting's text");ta.placeholder="Paste the posting or the call here.";box.appendChild(ta);
  var r=h("div","c-row"),u=input("url","","https://");u.setAttribute("aria-label","Its address");r.appendChild(field("Or its address (only this uses the internet)",u));r.appendChild(cbtn("","Fetch it",function(){fetchPosting(u.value,kind);}));box.appendChild(r);P.body.appendChild(box);
  P.foot.appendChild(cbtn("","Choose a file",function(){pickFile(".docx,.pdf,.txt,.md,.html,.htm,.rtf",false,function(fs){readFile(fs[0]).then(function(t){if(t.length<120){say("That file holds too little text to be a posting.");return;}return newOpp(kind,t,fs[0].name).then(function(o){o.kindSet=kind!=="job";save();render();});},function(e){say("It could not be read: "+(e&&e.message||e));});});}));
  P.foot.appendChild(h("span","c-grow"));P.foot.appendChild(cbtn("","Cancel",function(){S.ui.open=null;show("list");save();render();}));
  P.foot.appendChild(cbtn("pri","Keep it",function(){var t=ta.value.replace(/\r/g,"").trim();if(t.length<120){say("That is too short to be a posting. Paste the whole of it.");return;}newOpp(kind,t,"pasted").then(function(o){o.kindSet=kind!=="job";save();render();});}));return P;}
function oppPanel(o){var S=CS(),step=o.step||(o.read?"fit":"post"),band=o.read&&bandOf(o.read.r);
  var P=panel("csWork",o.title||"Untitled",{back:"Applications",onBack:function(){show("list");save();render();},chip:band?chip(band.word,"c-band-"+band.band):null});
  var bar=h("ol","c-steps");bar.setAttribute("aria-label","The steps of this application");
  STEPS.forEach(function(s,i){if(i)bar.appendChild(h("li","sep"));var li=h("li"),b=h("button");b.type="button";b.innerHTML="<i>"+(stepDone(o,s[0])&&s[0]!==step?"✓":i+1)+"</i><span>"+esc(s[1])+"</span>";
    if(s[0]===step){li.className="now";b.setAttribute("aria-current","step");}else if(stepDone(o,s[0]))li.className="done";b.addEventListener("click",function(){goStep(o,s[0]);});li.appendChild(b);bar.appendChild(li);});
  P.el.insertBefore(bar,P.body);
  ({post:stepPost,fit:stepFit,send:stepSend,practise:stepPractise,track:stepTrack}[step]||stepPost)(o,P);return P;}
function stepPost(o,P){var box=h("div","c-col c-fill"),g=h("div","c-grid3"),ti=input("text",o.title),or=input("text",o.org),kd=select(OKINDS,o.kind);
  ti.addEventListener("change",function(){o.title=ti.value.trim();o.titleSet=true;save();render();});or.addEventListener("change",function(){o.org=or.value.trim();o.orgSet=true;save();});kd.addEventListener("change",function(){o.kind=kd.value;o.kindSet=true;save();});
  g.appendChild(field("Title",ti));g.appendChild(field("Organisation",or));g.appendChild(field("What it is",kd));box.appendChild(g);
  var meta=[dueWords(o),o.from&&/^https?:/.test(o.from)?"Fetched from its address":o.from&&o.from!=="pasted"&&!/^lector:/.test(o.from)?"From "+o.from:/^lector:/.test(o.from||"")?"From Lector's brief":"Pasted","Added "+dayStr(o.at)].filter(Boolean).join(" · ");
  box.appendChild(h("p","c-note",esc(meta)));var tx=h("div","c-well c-text c-grow");tx.setAttribute("tabindex","0");tx.setAttribute("aria-label","The posting");tx.textContent="…";postText(o).then(function(t){tx.textContent=t||"(its text is no longer kept)";});box.appendChild(tx);
  if(o.web&&o.web.results&&o.web.results.length){var wd=fold("web:"+o.id,"Found online for “"+o.web.q+"”, "+dayStr(o.web.at)+" ("+o.web.results.length+")");wd.classList.add("c-web");var ul=h("ul");
    o.web.results.forEach(function(x){var li=h("li"),a=h("a");a.href=x.url;a.target="_blank";a.rel="noopener noreferrer";a.textContent=x.title;li.appendChild(a);if(x.snippet)li.appendChild(h("div","c-note",esc(x.snippet)));ul.appendChild(li);});
    wd.appendChild(ul);wd.appendChild(h("p","c-note",esc("For you to read. The studio does not write from what was found online.")));box.appendChild(wd);}
  P.body.appendChild(box);
  P.foot.appendChild(cbtn("","Look it up online",function(){lookUp(o);},"Searches the internet for the organisation and the post, only now"));P.foot.appendChild(h("span","c-grow"));
  P.foot.appendChild(o.read?cbtn("pri","Next: how you fit",function(){goStep(o,"fit");}):cbtn("pri","Read it against my profile",function(){o.step="fit";readOpp(o);}));}
function stepFit(o,P){var r=o.read&&o.read.r,b=r&&bandOf(r);
  if(!b){P.body.appendChild(empty("Not read yet","The studio reads it against your profile: first how it matches what you are looking for; then each criterion it asks for, judged shown, partly shown or not shown, with the evidence named; then a plain band with its reasons, and what to do next."));
    P.foot.appendChild(h("span","c-grow"));P.foot.appendChild(cbtn("pri","Read it against my profile",function(){readOpp(o);}));return;}
  var cols=h("div","c-cols"),a=h("div","c-col"),z=h("div","c-col");
  var band=h("div","c-bandcard");band.setAttribute("data-band",b.band);band.appendChild(h("h3",null,esc(b.word)));b.why.forEach(function(w){band.appendChild(h("p",null,esc(w)));});
  band.appendChild(h("p","c-advice","<b>Advice.</b> "+esc(b.advice)));a.appendChild(band);
  if(r.strengths.length||r.concerns.length){var ul=h("ul","c-pc");r.strengths.forEach(function(s){ul.appendChild(h("li","for","<b>For</b> "+esc(s)));});r.concerns.forEach(function(s){ul.appendChild(h("li","against","<b>Against</b> "+esc(s)));});a.appendChild(ul);}
  if(r.next.length||r.asks.length){a.appendChild(h("h3","c-h3",esc("Next")));var ol=h("ol","c-next");r.next.forEach(function(s){ol.appendChild(h("li",null,esc(s)));});r.asks.forEach(function(s){ol.appendChild(h("li",null,"Ask the contact: "+esc(s)));});a.appendChild(ol);}
  a.appendChild(h("p","c-note",esc(b.rule)));
  if(r.wants&&r.wants.length){z.appendChild(h("h3","c-h3",esc("Against what you are looking for")));var wt=h("table","c-tab");wt.innerHTML="<thead><tr><th>You are looking for</th><th>Here</th><th>What it offers</th></tr></thead>";var wb=h("tbody");
    r.wants.forEach(function(x){var tr=h("tr");tr.innerHTML="<td>"+esc(x.text)+"</td><td><span class=\"c-st\" data-st=\""+(x.st==="unsaid"?"partly":x.st)+"\">"+{met:"Matches",partly:"Partly",none:"Does not match",unsaid:"Not said"}[x.st]+"</span></td><td>"+esc(x.offer||"")+"</td>";wb.appendChild(tr);});wt.appendChild(wb);z.appendChild(wt);}
  else if(!wantsText())z.appendChild(h("p","c-note",esc("Say what you are looking for in Your profile, and the next reading says first how each opportunity matches it.")));
  z.appendChild(h("h3","c-h3",esc("What it asks")));var t=h("table","c-tab");t.innerHTML="<thead><tr><th>Criterion</th><th>In your profile</th><th>Evidence</th></tr></thead>";var tb=h("tbody");
  r.crit.forEach(function(x){var tr=h("tr");tr.innerHTML="<td>"+esc(x.text)+"<small>"+(x.ess?"Essential":"Desirable")+"</small></td><td><span class=\"c-st\" data-st=\""+x.st+"\">"+{met:"Shown",partly:"Partly shown",none:"Not shown"}[x.st]+"</span></td><td>"+esc(x.ev||"")+"</td>";tb.appendChild(tr);});t.appendChild(tb);z.appendChild(t);
  z.appendChild(h("p","c-note",esc("Read on "+dayStr(o.read.at)+" with "+(o.read.model||"your model")+". The band follows from these judgements, made from your profile alone; it is not a probability.")));
  cols.appendChild(a);cols.appendChild(z);P.body.appendChild(cols);
  P.foot.appendChild(cbtn("","Read it again",function(){readOpp(o);}));P.foot.appendChild(h("span","c-grow"));P.foot.appendChild(cbtn("pri","Next: what you send",function(){goStep(o,"send");}));}
/* what you send: the documents on the left, the one chosen on the right, its keys at the foot */
function sendView(o){var v=o.sv;if(v&&v.kind==="email"&&!o.emails.some(function(e){return e.id===v.id;}))v=null;if(v)return v;var k0=(FOR[o.kind]||FOR.other).filter(function(k){return o.docs[k];})[0];return {kind:k0||(FOR[o.kind]||FOR.other)[0]};}
function setView(o,v){o.sv=v;o.edit=false;o.tab="doc";save();render();}
function stepSend(o,P){var v=sendView(o),split=h("div","c-split"),nav=h("div","c-nav"),pane=h("div","c-pane");
  nav.appendChild(h("div","c-label",esc("Documents")));
  var kinds=(FOR[o.kind]||FOR.other).slice();Object.keys(o.docs).forEach(function(k){if(kinds.indexOf(k)<0)kinds.push(k);});
  kinds.forEach(function(k){var d=o.docs[k];nav.appendChild(item(DOCS[k][0],d?(d.mine?"Your version":"Written")+", "+dayStr(d.made):"Not written yet",v.kind===k,function(){setView(o,{kind:k});},d?"c-has":""));});
  var more=["cv","cover","supporting","statement","proposal"].filter(function(x){return kinds.indexOf(x)<0;});
  if(more.length){var sel=select([["","Another document…"]].concat(more.map(function(x){return [x,DOCS[x][0]];})),"");sel.setAttribute("aria-label","Another document");sel.className="c-sel";sel.addEventListener("change",function(){if(sel.value)setView(o,{kind:sel.value});});nav.appendChild(sel);}
  nav.appendChild(h("div","c-label",esc("Emails")));
  o.emails.forEach(function(e){var rl=(ROLES.filter(function(x){return x[0]===e.role;})[0]||["",""])[1],pu=(PURPOSES.filter(function(x){return x[0]===e.purpose;})[0]||["",""])[1].replace(/^To /,"");
    nav.appendChild(item(rl,pu.charAt(0).toUpperCase()+pu.slice(1),v.kind==="email"&&v.id===e.id,function(){setView(o,{kind:"email",id:e.id});},"c-has"));});
  nav.appendChild(item("+ A new email","To a supervisor, a referee, a mentor, a hiring manager or a recruiter",v.kind==="emailnew",function(){setView(o,{kind:"emailnew"});}));
  nav.appendChild(h("div","c-label",esc("Your own")));nav.appendChild(item("Write it yourself","Your draft, looked at with you",v.kind==="mine",function(){setView(o,{kind:"mine"});}));
  split.appendChild(nav);split.appendChild(pane);P.body.appendChild(split);
  if(v.kind==="emailnew")return newEmail(o,pane,P);if(v.kind==="mine")return mineView(o,pane,P);
  var rec=docRec(o,v);if(!rec)return unwritten(o,v.kind,pane,P);return docPane(o,v,rec,pane,P);}
function unwritten(o,kind,pane,P){var e=empty(DOCS[kind][0],DOCS[kind][1]+" Written from your profile and the posting, then read a second time against your profile; what your profile does not give is left in square brackets for you.");pane.appendChild(e);
  var how=lessonFor(kind,null);if(how){var d=fold("how:"+how[0],"How it is built");var ol=h("ol","c-lesson-ol");how[1].forEach(function(s){ol.appendChild(h("li",null,esc(s)));});d.appendChild(ol);pane.appendChild(d);}
  P.foot.appendChild(cbtn("","Write it yourself",function(){o.mineKind=kind;setView(o,{kind:"mine"});}));P.foot.appendChild(h("span","c-grow"));
  P.foot.appendChild(cbtn("pri","Write the "+DOCS[kind][0].replace(/^./,function(m){return m.toLowerCase();}).replace(/^tailored cv$/,"tailored CV"),function(){writeDoc(o,kind);}));}
function lessonFor(kind,rec){var lk=kind==="email"?(rec&&rec.role==="supervisor"?"Writing to a prospective supervisor":rec&&rec.purpose==="reference"?"Asking for a reference":""):{cv:"A CV for an application",cover:"A cover letter",supporting:"A supporting statement",statement:"A personal statement for a PhD or DPhil",proposal:"A research proposal"}[kind];
  return LESSONS.filter(function(L){return L[0]===lk;})[0]||null;}
function docPane(o,v,rec,pane,P){var kind=v.kind,isMail=kind==="email",how=lessonFor(kind,rec),tab=o.tab==="how"&&how?"how":"doc";
  var top=h("div","c-row c-tight");top.appendChild(h("h3","c-h3",esc(isMail?"The email":DOCS[kind][0])));
  if(how)top.appendChild(seg([["doc",isMail?"The email":"The document"],["how","How it is built"]],tab,function(x){o.tab=x;save();render();},"Show"));pane.appendChild(top);
  var ck=rec.chk||{},notes=[];if(ck.figures&&ck.figures.length)notes.push("Figures to check, not found in your profile or the posting: "+ck.figures.join(", ")+".");
  if(ck.fills)notes.push(ck.fills+" place"+(ck.fills>1?"s are":" is")+" left for you to fill, in square brackets.");if(ck.style)notes.push(ck.style.trim());
  notes.push(rec.mine?"Your own version, kept on "+dayStr(rec.made)+".":"Written on "+dayStr(rec.made)+" with "+(rec.model||"your model")+".");pane.appendChild(h("p","c-note c-checks",esc(notes.join(" "))));
  var area=h("div","c-area c-grow");pane.appendChild(area);
  if(tab==="how"){var ol=h("ol","c-lesson-ol");how[1].forEach(function(s){ol.appendChild(h("li",null,esc(s)));});area.appendChild(ol);}
  loadText(rec.ref).then(function(md){
    if(o.edit){var ta=h("textarea","c-ta c-mono c-grow");ta.value=md;ta.setAttribute("aria-label","The text, to change");area.innerHTML="";area.appendChild(ta);P.foot.innerHTML="";P.foot.appendChild(h("span","c-grow"));
      P.foot.appendChild(cbtn("","Cancel",function(){o.edit=false;render();}));P.foot.appendChild(cbtn("pri","Keep my changes",function(){var t=ta.value.trim();if(!t)return;var ref=IngBig.newId();Promise.resolve(IngBig.put(ref,t)).then(function(){try{IngBig.del(rec.ref);}catch(e){}rec.ref=ref;rec.edited=Date.now();o.edit=false;save();render();say("Your changes are kept.");});}));ta.focus();return;}
    if(tab==="doc"){if(isMail){var m=h("div","c-well c-mail");m.textContent=md;area.appendChild(m);}
      else{var pp=paperOf(o,kind,md),f=h("iframe","c-paper");f.title=DOCS[kind][0];f.setAttribute("sandbox","allow-same-origin");f.srcdoc=W.IngLectorPaper?IngLectorPaper.page(pp.kind,md,pp.o):"<pre>"+esc(md)+"</pre>";area.appendChild(f);}}
    P.foot.appendChild(cbtn("","Change it",function(){o.edit=true;render();}));P.foot.appendChild(cbtn("","Copy the text",function(){copyText(md);}));
    P.foot.appendChild(cbtn("","Write it again",function(){if(isMail)writeDoc(o,"email",{role:rec.role,purpose:rec.purpose});else writeDoc(o,kind);}));P.foot.appendChild(h("span","c-grow"));
    if(!isMail){P.foot.appendChild(cbtn("","Save as PDF",function(){savePaper(o,kind,"pdf");}));P.foot.appendChild(cbtn("pri","Save as Word",function(){savePaper(o,kind,"docx");}));}});}
function newEmail(o,pane,P){pane.appendChild(h("h3","c-h3",esc("A new email")));var g=h("div","c-grid2"),rs=select(ROLES,o.kind==="phd"?"supervisor":"contact"),ps=select(PURPOSES,o.kind==="phd"?"introduce":"enquire"),ex=h("textarea","c-ta");
  ex.placeholder="Anything to add (optional): a name, a date, something they said.";ex.style.minHeight="90px";g.appendChild(field("To",rs));g.appendChild(field("What for",ps));pane.appendChild(g);pane.appendChild(field("Also",ex));
  var how=lessonFor("email",{role:rs.value,purpose:ps.value});var note=h("p","c-note",esc("Written from your profile and the posting: courteous, direct and specific, with one clear request."));pane.appendChild(note);
  P.foot.appendChild(h("span","c-grow"));P.foot.appendChild(cbtn("pri","Write the email",function(){writeDoc(o,"email",{role:rs.value,purpose:ps.value,extra:ex.value.trim()});}));}
function mineView(o,pane,P){var kinds=Object.keys(DOCS),ks=o.mineKind&&DOCS[o.mineKind]?o.mineKind:(FOR[o.kind]||FOR.other)[0],m=(o.mine||{})[ks];
  var top=h("div","c-row c-tight");top.appendChild(h("h3","c-h3",esc("Your own draft")));var sel=select(kinds.map(function(k){return [k,DOCS[k][0]];}),ks);sel.className="c-sel";sel.setAttribute("aria-label","Which document");
  sel.addEventListener("change",function(){o.mineKind=sel.value;save();render();});top.appendChild(sel);pane.appendChild(top);
  pane.appendChild(h("p","c-note",esc("Write it yourself, or paste a draft you have written. It is looked at with you: what works, what is missing, what your profile does not support. It is never rewritten for you.")));
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
  pane.appendChild(h("h3","c-h3",esc(q.q)));var tq=h("textarea","c-ta c-grow");tq.setAttribute("aria-label","Your answer");tq.placeholder="Your answer, as you would say it.";tq.value=q.answer||"";pane.appendChild(tq);if(q.fb)pane.appendChild(fbBox(q.fb));
  P.foot.appendChild(cbtn("","New questions",function(){questions(o);}));P.foot.appendChild(h("span","c-grow"));P.foot.appendChild(cbtn("pri","Look at it with me",function(){look(o,q.id,q.q,tq.value,true);}));}
function stepTrack(o,P){var box=h("div","c-col c-fill"),g=h("div","c-grid3"),st=select(STAGES,o.stage),du=input("date",o.due||"");
  st.addEventListener("change",function(){o.stage=st.value;save();render();});du.addEventListener("change",function(){o.due=du.value;save();render();});
  g.appendChild(field("Where it stands",st));g.appendChild(field("Closing date",du));var n=daysLeft(o),big=h("div","c-days");big.innerHTML=n==null?"<b>—</b><span>No closing date set</span>":n<0?"<b>Closed</b><span>"+esc(dayStr(o.due))+"</span>":"<b>"+n+"</b><span>day"+(n===1?"":"s")+" left</span>";g.appendChild(big);box.appendChild(g);
  if(o.closes)box.appendChild(h("p","c-note",esc("The posting says: "+o.closes)));
  var nt=h("textarea","c-ta c-grow");nt.placeholder="Your notes: who to ask, what to do next, what was said.";nt.value=o.notes||"";nt.setAttribute("aria-label","Your notes");nt.addEventListener("change",function(){o.notes=nt.value;save();});box.appendChild(field("Notes",nt));
  P.body.appendChild(box);P.foot.appendChild(cbtn("quiet c-danger","Remove this application",function(){if(!confirm("Remove "+(o.title||"this application")+" and what was written for it?"))return;removeOpp(o);}));}

/* ---- Your profile: its parts on the left, one part at a time on the right ---- */
function paintProfile(par){var S=CS(),P=S.profile,M=lectorMe(),part=S.ui.ppart||"about",n=P.items.length,sg=(P.suggested||[]).length,filled=Object.keys(P.wants).filter(function(k){return String(P.wants[k]||"").trim();}).length;
  var srcN=(M.cv?1:0)+(P.linkedin?1:0)+P.files.length;
  var L=panel("csList","Your profile");
  [["about","About you",[P.name||myName()||"Your name",P.contact].filter(Boolean).join(" · ")||"Your name and how to reach you"],["looking","What you are looking for",filled?filled+" of 5 said":"Not said yet"],
   ["sources","What the studio may use",srcN?srcN+" source"+(srcN===1?"":"s")+": "+[M.cv?"your CV":"",P.linkedin?"LinkedIn":"",P.files.length?P.files.length+" document"+(P.files.length===1?"":"s"):""].filter(Boolean).join(", "):"Your CV, LinkedIn, your documents"],
   ["entries","Your entries",n?n+" entr"+(n===1?"y":"ies"):"None yet"]].concat(sg?[["found","Found in your sources",sg+" to keep or drop"]]:[]).forEach(function(x){
    L.body.appendChild(item(x[1],x[2],part===x[0],function(){S.ui.ppart=x[0];S.ui.editing=null;show("work");save();jump();render();},x[0]==="found"?"c-new":""));});
  L.foot.appendChild(h("span","c-note",esc(P.at?"Last changed "+dayStr(P.at):"Kept on this device only")));
  if(RUN.busy){two(L,livePanel(),par);return;}
  var R=({about:profAbout,looking:profLooking,sources:profSources,entries:profEntries,found:profFound}[part]||profAbout)();
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
  src("Your CV",M.cv?M.cv.name+", kept "+dayStr(M.cv.at||Date.now())+". Lector uses the same one.":"Not added yet. Lector and the studio share it.",P.use.cv,function(v){P.use.cv=v;},
    [cbtn("sm",M.cv?"Replace":"Add your CV",addCv)].concat(M.cv?[cbtn("sm quiet","Remove",function(){if(!confirm("Remove your CV from Lector and the studio?"))return;try{IngBig.del(M.cv.ref);}catch(e){}M.cv=null;save();render();})]:[]));
  src("Your LinkedIn export",P.linkedin?P.linkedin.n+" entr"+(P.linkedin.n===1?"y":"ies")+" from it, "+dayStr(P.linkedin.at)+(P.linkedin.others&&P.linkedin.others.length?". Not read: "+P.linkedin.others.slice(0,4).join(", "):"")+".":"The .zip LinkedIn sends when you ask for a copy of your data, or its .csv files.",P.use.linkedin,function(v){P.use.linkedin=v;},
    [cbtn("sm",P.linkedin?"Add it again":"Add the export",function(){pickFile(".zip,.csv",true,function(fs){importLinkedIn(fs).catch(function(e){say("It could not be read: "+(e&&e.message||e));});});})]);
  src("Your documents",P.files.length?P.files.length+" kept: a proposal, a statement, a publication.":"A research proposal, a statement, a publication or anything else about your work.",null,null,[cbtn("sm","Add documents",addDocs)]);
  P.files.forEach(function(f){src(f.name,Math.round(f.chars/1000)+" thousand characters, kept "+dayStr(f.at)+".",f.use!==false,function(v){f.use=v;},[cbtn("sm quiet","Remove",function(){try{IngBig.del(f.ref);}catch(e){}P.files=P.files.filter(function(x){return x.id!==f.id;});save();render();})],true);});
  var runs=[];try{lxState().runs.forEach(function(x){if(x.kind==="app"&&x.status==="done"&&runs.every(function(y){return y.name!==x.name;}))runs.push(x);});}catch(e){}
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
  else R.body.appendChild(empty("No entries yet","Add them one by one, take them from your LinkedIn export (What the studio may use), or let the studio suggest them from your CV and documents, for you to keep or drop."));
  var grid=h("div","c-entries");P.items.filter(function(it){return fl==="all"||it.sec===fl;}).forEach(function(it){var c=h("div","c-entry");
    c.appendChild(h("span","c-sec",esc((SECTS.filter(function(x){return x[0]===it.sec;})[0]||["",""])[1].replace(/, with evidence$/,""))));c.appendChild(h("b",null,esc(it.title)));
    var meta=[it.place,[it.from,it.to].filter(Boolean).join(" to "),it.src==="linkedin"?"from LinkedIn":""].filter(Boolean).join(" · ");if(meta)c.appendChild(h("small",null,esc(meta)));if(it.text)c.appendChild(h("p",null,esc(it.text)));
    var k=h("div","c-keys");k.appendChild(cbtn("sm","Change",function(){S.ui.editing=it.id;save();render();}));k.appendChild(cbtn("sm quiet","Remove",function(){P.items=P.items.filter(function(x){return x.id!==it.id;});P.at=Date.now();save();render();}));c.appendChild(k);grid.appendChild(c);});
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
    var meta=[it.place,[it.from,it.to].filter(Boolean).join(" to ")].filter(Boolean).join(" · ");if(meta)c.appendChild(h("small",null,esc(meta)));if(it.text)c.appendChild(h("p",null,esc(it.text)));
    var k=h("div","c-keys");k.appendChild(cbtn("sm pri","Keep",function(){P.items.push(Object.assign({},it,{id:uid("it"),src:"me",at:Date.now()}));P.suggested=P.suggested.filter(function(x){return x.id!==it.id;});P.at=Date.now();if(!P.suggested.length)S.ui.ppart="entries";save();render();}));
    k.appendChild(cbtn("sm","Drop",function(){P.suggested=P.suggested.filter(function(x){return x.id!==it.id;});if(!P.suggested.length)S.ui.ppart="entries";save();render();}));c.appendChild(k);grid.appendChild(c);});
  R.body.appendChild(grid);R.foot.appendChild(h("span","c-grow"));R.foot.appendChild(cbtn("","Drop them all",function(){P.suggested=[];S.ui.ppart="entries";save();render();}));return R;}

/* ---- Goals and plan ---- */
function whenWords(by){by=String(by||"").trim();if(!by)return "";if(/^\d{4}-\d{2}-\d{2}$/.test(by))return "By "+dayStr(by);if(/^(by|in|within|before|after|next|this|on|at)\b/i.test(by))return by.charAt(0).toUpperCase()+by.slice(1);return "By "+by;}
function paintGoals(par){var S=CS(),sel=S.ui.gsel||(S.goals[0]?S.goals[0].id:"roles");if(sel!=="roles"&&sel!=="new"&&!S.goals.some(function(g){return g.id===sel;}))sel=S.goals[0]?S.goals[0].id:"roles";
  var L=panel("csList","Goals and plan",{key:cbtn("pri sm","+ A goal",function(){S.ui.gsel="new";show("work");save();render();},"Add a goal")});
  L.body.appendChild(item("Roles and programmes that suit you",S.roles?"Weighed "+dayStr(S.roles.at)+", "+S.roles.list.length+" kinds":"Kinds of role worth an application, never postings",sel==="roles",function(){S.ui.gsel="roles";show("work");save();render();},"c-pin"));
  if(S.goals.length)L.body.appendChild(h("div","c-label c-pad",esc("Your goals")));
  S.goals.forEach(function(g){var done=g.steps.filter(function(x){return x.done;}).length;L.body.appendChild(item(g.text,[g.kind==="career"?"Career":"Academic",g.by?"by "+dayStr(g.by):"",g.steps.length?done+" of "+g.steps.length+" steps done":"No steps yet"].filter(Boolean).join(" · "),sel===g.id,function(){S.ui.gsel=g.id;show("work");save();render();}));});
  if(!S.goals.length)L.body.appendChild(h("p","c-note c-pad",esc("No goals yet. Add one, or make one from a kind of role that suits you.")));
  L.foot.appendChild(h("span","c-note",esc(S.goals.length?S.goals.length+" goal"+(S.goals.length===1?"":"s"):"Your goals, with steps and dates")));
  if(RUN.busy){two(L,livePanel(),par);return;}
  var R=sel==="roles"?rolesPanel():sel==="new"?goalNew():goalPanel(S.goals.filter(function(g){return g.id===sel;})[0]);
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
  R.foot.appendChild(cbtn("quiet c-danger","Remove the goal",function(){if(!confirm("Remove this goal and its steps?"))return;S.goals=S.goals.filter(function(y){return y.id!==g.id;});S.ui.gsel=null;save();render();}));R.foot.appendChild(h("span","c-grow"));
  R.foot.appendChild(cbtn("pri","Suggest steps",function(){goalSteps(g);}));return R;}
function rolesPanel(){var S=CS(),R=panel("csWork","Roles and programmes that suit you");
  if(!S.roles||!S.roles.list||!S.roles.list.length)R.body.appendChild(empty("Not weighed yet","Kinds of role and programme worth an application, from your profile and what you are looking for: why, what is missing, and a first step. Never postings: bring those to Applications yourself."));
  else{var grid=h("div","c-entries");S.roles.list.forEach(function(x){var c=h("div","c-entry");c.appendChild(h("b",null,esc(x.role)));if(x.why)c.appendChild(h("p",null,"<span class=\"c-k\">Why</span> "+esc(x.why)));if(x.gap)c.appendChild(h("p",null,"<span class=\"c-k\">What is missing</span> "+esc(x.gap)));if(x.first)c.appendChild(h("p",null,"<span class=\"c-k\">A first step</span> "+esc(x.first)));
      var k=h("div","c-keys");k.appendChild(cbtn("sm","Make it a goal",function(){var id=uid("g");S.goals.unshift({id:id,text:x.role,kind:/phd|dphil|doctor|master|programme|fellow/i.test(x.role)?"academic":"career",by:"",at:Date.now(),steps:x.first?[{id:uid("st"),text:x.first,by:"",done:false}]:[]});save();render();say("It is a goal now, with its first step.");}));c.appendChild(k);grid.appendChild(c);});
    R.body.appendChild(grid);R.body.appendChild(h("p","c-note c-pad",esc("Weighed on "+dayStr(S.roles.at)+" with "+(S.roles.model||"your model")+", from your profile alone.")));}
  R.foot.appendChild(h("span","c-grow"));R.foot.appendChild(cbtn("pri",S.roles?"Weigh them again":"Weigh what suits me",roles));return R;}

/* ---- Learn: one lesson at a time ---- */
function paintLearn(par){var S=CS(),i=Math.max(0,Math.min(LESSONS.length-1,S.ui.lesson||0)),L=panel("csList","Learn");
  L.body.appendChild(h("blockquote","c-motto c-small","“Tell me and I forget. Teach me and I remember. Involve me and I learn.”"));
  LESSONS.forEach(function(x,j){L.body.appendChild(item(x[0],x[1].length+" steps",j===i,function(){S.ui.lesson=j;show("work");save();render();}));});
  L.foot.appendChild(h("span","c-note",esc("Common practice in the UK. A posting's own instructions come first.")));
  var Ls=LESSONS[i],R=panel("csWork",Ls[0]);R.head.insertBefore(cbtn("quiet c-back","‹ Learn",function(){show("list");save();render();}),R.head.firstChild);
  var ol=h("ol","c-lesson");Ls[1].forEach(function(s,j){var li=h("li");li.innerHTML="<i>"+(j+1)+"</i><span>"+esc(s)+"</span>";ol.appendChild(li);});R.body.appendChild(ol);
  if(i>0)R.foot.appendChild(cbtn("","‹ "+LESSONS[i-1][0],function(){S.ui.lesson=i-1;save();render();}));R.foot.appendChild(h("span","c-grow"));
  if(i<LESSONS.length-1)R.foot.appendChild(cbtn("pri",LESSONS[i+1][0]+" ›",function(){S.ui.lesson=i+1;save();render();}));
  else R.foot.appendChild(cbtn("pri","Try it: bring a posting",function(){S.ui.room="apps";S.ui.open="new";show("work");save();render();}));two(L,R,par);}

/* ---------------- from Lector: a CV or a cover letter needs no apps (her request) ---------------- */
function fromLector(B){var kinds=Object.keys(B&&B.docs||{}).filter(function(k){return B.docs[k];}),want=kinds.filter(function(k){return k==="cv"||k==="cover";});if(!want.length)return false;
  var P=null;try{P=B.purpose!=="portfolio"&&LXR().state().posts[B.purpose];}catch(e){}
  var go1=function(o){CS().ui.room="apps";CS().ui.open=o?o.id:"new";CS().ui.show="work";if(o)o.step="send";save();go("career");
    if(!o){say("A CV or a cover letter needs no apps: bring the posting here, and the Career Studio writes them from your profile.");return;}
    say("A CV or a cover letter needs no apps: the Career Studio writes them from your profile and the posting.");
    var q=Promise.resolve();want.forEach(function(k){q=q.then(function(){return writeDoc(o,k);});});q.then(function(){render();});};
  if(!P||!P.ref){go1(null);return true;}
  loadText(P.ref).then(function(t){if(!t||t.length<40){go1(null);return;}var same=CS().opps.filter(function(o){return o.from==="lector:"+P.id;})[0];if(same){go1(same);return;}
    newOpp(B.purpose==="programme"?"phd":"job",t,"lector:"+P.id).then(go1);});
  return true;}

/* ---------------- its place: the page, the menu, go() ---------------- */
function install(){if($("page-career"))return;
  var sec=h("section","section");sec.id="page-career";
  sec.innerHTML='<h1 class="page-title">Career Studio</h1><div id="cs"><div class="c-head"><div><h1>Career Studio</h1><p>Your profile, the posts, programmes and grants you are weighing, and what you send. Everything stays on this device.</p></div>'+
    '<div class="rm-tabs" role="tablist" aria-label="The studio\'s rooms">'+[["apps","Applications"],["profile","Your profile"],["goals","Goals and plan"],["learn","Learn"]].map(function(r){
      return '<button type="button" class="rm-tab" role="tab" data-room="'+r[0]+'" aria-selected="false" tabindex="-1">'+ico(r[0])+'<span>'+r[1]+'</span></button>';}).join("")+'</div></div><div id="csHost"></div></div>';
  var after=$("page-lector")||$("page-blend");if(after&&after.parentNode)after.parentNode.insertBefore(sec,after.nextSibling);else{var mn=D.querySelector(".main");if(!mn)return;mn.appendChild(sec);}
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
window.IngCareer={state:CS,render:render,newOpp:newOpp,read:readOpp,write:writeDoc,findSkills:findSkills,roles:roles,goalSteps:goalSteps,reviewMine:reviewMine,parseRead:parseRead,bandOf:bandOf,checks:checks,csvObjs:csvObjs,importLinkedIn:importLinkedIn,unzip:unzip,parseLook:parseLook,fromLector:fromLector,lessons:LESSONS,run:RUN,stop:stopNow};
})();
;try{window.__ingParts["p188"]="running";}catch(_){}
</script>
