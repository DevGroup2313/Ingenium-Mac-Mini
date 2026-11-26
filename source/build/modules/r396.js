<style id="r396-css">
/* ============ R396 · MEMORIA: WHAT INGENIUM KNOWS AND KEEPS, A PAGE OF ITS OWN (Ingenium 7.94, 25 November 2026) ============
   Her words (25 November 2026): "I think that the Memory section and Ingneum's Cloud should not be buried inside of the Settings page.
   Please put them together in their own page under a new page name that better fits them and the rest of the app and give design the
   new page to fully match the rest of the app's look and design please."
   Memoria (Latin: memory, remembrance), in the side bar under Studio, after Ingenia, whose folders feed it. Made as Ingenium's pages are
   made (Vesta, r235 and r290): a head 470 pixels tall, the words at its left (an eyebrow, the page's name in Cormorant at 48 pixels, a
   line, two raised keys, a line of help, an italic hint at its foot) and its own object at its right: the constellation mind she chose
   (r392, Design B), unchanged in its drawing and as light on the device. Under it, Vesta's raised room cards, one room at a time:
   What it knows (r390), From your chats (r271), Ingenium Cloud (r255, r394) and Back up and move (r143, r393, r395: the backup, restore
   points, scheduled backups), each card moved here whole, working as before.
   Settings keeps a small card under Your data, Memory and Ingenium Cloud, that opens Memoria; anything that opened those sections opens
   Memoria's room instead. */
/* the page head's colours, as Vesta's (r290) */
#page-memoria{--sk-ink1:#221a2e;--sk-ink2:#4a4358;--sk-ink3:#6c6579;--sk-hair:rgba(34,26,46,.10);--sk-hair2:rgba(34,26,46,.06);--sk-acc:#6a3fb5;
  --sk-hi:#ffffff;--sk-lo:#faf8fc;--sk-keyA:#ffffff;--sk-keyB:#f6f2fb;--sk-pa:#7a50c6;--sk-pb:#5d37a1;--sk-pedge:#3a2070;
  --sk-slab:inset 0 1px 0 rgba(255,255,255,.9),inset 0 -1px 0 rgba(40,22,68,.05),0 1px 0 rgba(40,22,68,.10),0 3px 0 rgba(40,22,68,.05),0 6px 12px rgba(40,22,68,.07),0 18px 36px rgba(40,22,68,.08);
  --sk-key:inset 0 -1.5px 0 rgba(40,22,68,.13),0 2px 0 rgba(40,22,68,.25),0 4px 5px rgba(40,22,68,.16),0 9px 14px rgba(40,22,68,.1);
  --sk-keyhi:inset 0 -1.5px 0 rgba(40,22,68,.13),0 3px 0 rgba(40,22,68,.25),0 6px 8px rgba(40,22,68,.18),0 13px 20px rgba(40,22,68,.12);
  --sk-press:inset 0 2px 5px rgba(40,22,68,.22),0 1px 1px rgba(40,22,68,.18);
  --sk-desk:radial-gradient(ellipse 75% 85% at 72% 42%,#fdfbff 0%,#f4eff9 52%,#e9e1f4 100%);--sk-ring:rgba(106,63,181,.10);--sk-line:rgba(106,63,181,.30);
  --sk-edge0:#d8cdee;--sk-edge1:#c4b5e3;--sk-under:rgba(40,22,68,.2);--sk-under2:rgba(40,22,68,.12);--sk-under3:rgba(40,22,68,.04);
  --sk-serif:"Home Cormorant","Cormorant Garamond",Cormorant,"Iowan Old Style",Palatino,Georgia,serif;
  --sk-paper:#fdfbf8;--sk-paper2:#f3eef8;--sk-rule:rgba(106,63,181,.08);--sk-tab:#fbf9fd;--sk-paperink:#2f2640;
  --sk-band0:#f4effb;--sk-band1:#c9b6ee;--sk-band2:#9068d6;--sk-stem0:#efe9f8;--sk-stem1:#b8afd0;--sk-bez-ink:rgba(70,44,120,.3);--sk-pearl:#dccff4;--sk-frame:rgba(106,63,181,.16);--sk-txt:rgba(34,26,46,.09)}
body[data-theme="night"] #page-memoria{--sk-ink1:#f3eefb;--sk-ink2:#d3c9e3;--sk-ink3:#a99cc1;--sk-hair:rgba(205,184,240,.12);--sk-hair2:rgba(205,184,240,.07);--sk-acc:#b79ce6;
  --sk-hi:#211a2d;--sk-lo:#1b1526;--sk-keyA:#2a2239;--sk-keyB:#231c31;--sk-pedge:#170b30;
  --sk-slab:inset 0 1px 0 rgba(255,255,255,.06),inset 0 -1px 0 rgba(0,0,0,.35),0 1px 0 rgba(0,0,0,.6),0 3px 0 rgba(0,0,0,.28),0 6px 12px rgba(0,0,0,.35),0 18px 36px rgba(0,0,0,.4);
  --sk-key:inset 0 1px 0 rgba(255,255,255,.07),inset 0 -2px 0 rgba(0,0,0,.45),0 2px 0 rgba(0,0,0,.75),0 4px 5px rgba(0,0,0,.5),0 9px 14px rgba(0,0,0,.36);
  --sk-keyhi:inset 0 1px 0 rgba(255,255,255,.07),inset 0 -2px 0 rgba(0,0,0,.45),0 3px 0 rgba(0,0,0,.75),0 6px 8px rgba(0,0,0,.52),0 13px 20px rgba(0,0,0,.38);
  --sk-press:inset 0 2px 6px rgba(0,0,0,.6),0 1px 1px rgba(0,0,0,.4);
  --sk-desk:radial-gradient(ellipse 75% 85% at 72% 42%,#241a37 0%,#171025 52%,#0d0916 100%);--sk-ring:rgba(205,184,240,.10);--sk-line:rgba(196,176,238,.30);
  --sk-edge0:#120d20;--sk-edge1:#0c0816;--sk-under:rgba(0,0,0,.6);--sk-under2:rgba(0,0,0,.36);--sk-under3:rgba(0,0,0,.1);
  --sk-paper:#2a2238;--sk-paper2:#221b2f;--sk-rule:rgba(205,184,240,.08);--sk-tab:#2f2640;--sk-paperink:#ece4f8;
  --sk-band0:#6f5d9c;--sk-band1:#4f3d7f;--sk-band2:#8d6ad6;--sk-stem0:#5a4c80;--sk-stem1:#221a39;--sk-bez-ink:rgba(10,4,26,.55);--sk-pearl:#e4d9f8;--sk-frame:rgba(205,184,240,.14);--sk-txt:rgba(236,228,248,.09)}
/* the room cards, as Vesta's (r235) */
#page-memoria .fxp-bar{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:12px;margin:6px 0 4px}
#page-memoria .fxp-tab{position:relative;display:flex;flex-direction:column;align-items:flex-start;gap:5px;min-width:0;min-height:88px;margin:0;padding:12px 14px 12px;
  border-radius:14px;border:1px solid var(--hairline);background:linear-gradient(180deg,var(--card-hi,#fff),var(--card-lo,#f6f3fa));box-shadow:var(--pop);
  color:var(--ink-2);font:inherit;text-align:left;cursor:pointer;-webkit-tap-highlight-color:transparent;touch-action:manipulation;
  transition:transform .18s var(--spring,cubic-bezier(.2,.8,.2,1)),box-shadow .18s ease;animation:fxpRise .42s cubic-bezier(.2,.8,.2,1) backwards;animation-delay:calc(var(--i,0) * 60ms)}
#page-memoria .fxp-tab:hover{transform:translateY(-3px);box-shadow:var(--pop-hi,var(--pop));color:var(--ink-1)}
#page-memoria .fxp-tab:active{transform:translateY(1px);transition-duration:.06s}
#page-memoria .fxp-tab:focus-visible{outline:2.5px solid var(--rm-focus,var(--accent));outline-offset:3px}
#page-memoria .fxp-top{display:flex;align-items:center;gap:8px;min-width:0;width:100%}
#page-memoria .fxp-ico{display:inline-flex;width:30px;height:30px;flex:0 0 auto;align-items:center;justify-content:center;border-radius:9px;background:var(--accent-softer,rgba(107,79,160,.10));color:var(--accent)}
#page-memoria .fxp-ico svg{width:18px;height:18px}
#page-memoria .fxp-name{font:600 15px/1.2 var(--serif);letter-spacing:.03em;color:var(--ink-1)}
#page-memoria .fxp-chev{margin-left:auto;width:14px;height:14px;color:var(--ink-3);transition:transform .18s ease}
#page-memoria .fxp-tab:hover .fxp-chev{transform:translateX(2px)}
#page-memoria .fxp-stat{display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;font-size:12.4px;line-height:1.45;color:var(--ink-3);min-height:1.45em}
#page-memoria .fxp-tab[aria-selected="true"]{color:#fff;background:linear-gradient(180deg,var(--rm-pa,#7348be),var(--rm-pb,#5d37a1));border-color:var(--rm-pedge,#4b2a86);box-shadow:var(--rm-psh,var(--pop));text-shadow:0 1px 1px rgba(30,10,60,.32)}
#page-memoria .fxp-tab[aria-selected="true"] .fxp-name{color:#fff}
#page-memoria .fxp-tab[aria-selected="true"] .fxp-stat{color:rgba(255,255,255,.88)}
#page-memoria .fxp-tab[aria-selected="true"] .fxp-ico{background:rgba(255,255,255,.18);color:#fff}
#page-memoria .fxp-tab[aria-selected="true"] .fxp-chev{color:rgba(255,255,255,.85)}
#page-memoria .fxp-says{margin:6px 2px 14px;font-size:12.8px;line-height:1.5;color:var(--ink-2);max-width:78ch}
#page-memoria .mm-panel > .fxp-off{display:none !important}
#page-memoria .mm-panel > .fxp-on{animation:fxpIn .38s cubic-bezier(.2,.8,.2,1) backwards;animation-delay:calc(var(--i,0) * 70ms)}
#page-memoria .mm-panel > .card.fxp-on{transition:box-shadow .2s ease}
#page-memoria .mm-panel > .card.fxp-on:hover{box-shadow:var(--pop-hi,var(--pop))}
@media (max-width:760px){#page-memoria .fxp-bar{grid-template-columns:repeat(2,minmax(0,1fr));gap:9px}
  #page-memoria .fxp-tab{min-height:64px;padding:10px 11px}
  #page-memoria .fxp-stat{-webkit-line-clamp:1}
  #page-memoria .fxp-ico{width:26px;height:26px}
  #page-memoria .fxp-ico svg{width:16px;height:16px}}
body[data-theme="night"] #page-memoria .fxp-tab:not([aria-selected="true"]) .fxp-name{color:#ece4f8}
body[data-motion="minimal"] #page-memoria .fxp-tab,body[data-motion="minimal"] #page-memoria .mm-panel > .fxp-on,
body[data-calm="1"] #page-memoria .fxp-tab,body[data-calm="1"] #page-memoria .mm-panel > .fxp-on{animation:none !important;transition:none !important}
body[data-motion="minimal"] #page-memoria .fxp-tab:hover,body[data-calm="1"] #page-memoria .fxp-tab:hover{transform:none}
@media (prefers-reduced-motion:reduce){#page-memoria .fxp-tab,#page-memoria .mm-panel > .fxp-on{animation:none !important;transition:none !important}
  #page-memoria .fxp-tab:hover{transform:none}}

/* Settings' own look inside Memory's card and Ingenium Cloud's (r313), the same here */
#page-memoria{--st-hair:rgba(34,26,46,.10);--st-h1:#ffffff;--st-h2:#f6f2fb;--st-acc:#6a3fb5;--st-accs:rgba(106,63,181,.14);--st-ring:rgba(106,63,181,.5);
  --st-ink3:#6c6579;--st-well:inset 0 1px 2.5px rgba(40,22,68,.10);--st-wellbg:rgba(34,26,46,.04);
  --st-pop:inset 0 -1.5px 0 rgba(40,22,68,.13),0 2px 0 rgba(40,22,68,.25),0 4px 5px rgba(40,22,68,.16),0 9px 14px rgba(40,22,68,.10);
  --st-pophi:inset 0 -1.5px 0 rgba(40,22,68,.13),0 3px 0 rgba(40,22,68,.25),0 6px 8px rgba(40,22,68,.18),0 13px 20px rgba(40,22,68,.12);
  --st-slab:inset 0 1px 0 rgba(255,255,255,.85),0 1px 0 rgba(40,22,68,.06),0 2px 6px rgba(40,22,68,.05),0 12px 30px rgba(40,22,68,.07);
  --st-knob:linear-gradient(#ffffff,#e7e1ef);--st-knobsh:0 2px 0 rgba(40,22,68,.25),0 3px 6px rgba(40,22,68,.25);--st-lit:rgba(201,179,242,.7);
  --st-disc:radial-gradient(circle at 35% 30%,#c9b3f2,var(--rm-pa,#7348be) 55%,var(--rm-pb,#5d37a1));--st-discsh:0 2px 0 var(--rm-pledge,#3a2070),0 5px 10px rgba(40,22,68,.3);
  --st-ease:cubic-bezier(.34,1.35,.64,1);--st-spring:cubic-bezier(.34,1.56,.64,1);--st-out:cubic-bezier(.2,.8,.2,1)}
body[data-theme="night"] #page-memoria{--st-hair:rgba(205,184,240,.11);--st-h1:#2a2239;--st-h2:#231c31;--st-acc:#b79ce6;
  --st-accs:rgba(183,156,230,.16);--st-ring:rgba(183,156,230,.45);--st-ink3:#a99cc1;--st-well:inset 0 1px 3px rgba(0,0,0,.45);--st-wellbg:rgba(10,6,18,.35);
  --st-pop:inset 0 1px 0 rgba(255,255,255,.07),inset 0 -2px 0 rgba(0,0,0,.45),0 2px 0 rgba(0,0,0,.75),0 4px 5px rgba(0,0,0,.5),0 9px 14px rgba(0,0,0,.36);
  --st-pophi:inset 0 1px 0 rgba(255,255,255,.08),inset 0 -2px 0 rgba(0,0,0,.45),0 3px 0 rgba(0,0,0,.75),0 6px 8px rgba(0,0,0,.52),0 13px 20px rgba(0,0,0,.4);
  --st-slab:inset 0 1px 0 rgba(255,255,255,.06),0 1px 0 rgba(0,0,0,.4),0 2px 6px rgba(0,0,0,.3),0 12px 30px rgba(0,0,0,.34);
  --st-knob:linear-gradient(#efe8fb,#cdbfe6);--st-knobsh:0 2px 0 rgba(0,0,0,.6),0 3px 6px rgba(0,0,0,.5);--st-discsh:0 2px 0 var(--rm-pledge,#170b30),0 5px 10px rgba(0,0,0,.45)}
#page-memoria .st-disc{width:38px;height:38px;border-radius:50%;display:grid;place-items:center;color:#fff;background:var(--st-disc);box-shadow:var(--st-discsh);transition:transform .3s var(--st-spring)}
#page-memoria .st-disc svg{width:18px;height:18px}
#page-memoria .st-tt{min-width:0}
#page-memoria .st-nm{display:block;font:600 16.5px/1.25 var(--serif,Georgia,serif);letter-spacing:.02em;color:var(--ink-1)}
#page-memoria .st-say{display:block;color:var(--st-ink3);font-size:12.5px;line-height:1.45;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
#page-memoria .st-say:empty{display:none}
#page-memoria .st-chip{font:600 11.5px/1 var(--sans,inherit);padding:5px 9px;border-radius:999px;background:var(--st-accs);color:var(--st-acc);white-space:nowrap}
#page-memoria .st-chev{width:24px;height:24px;border-radius:50%;display:grid;place-items:center;color:var(--st-acc);background:linear-gradient(var(--st-h1),var(--st-h2));box-shadow:var(--st-pop);
  transition:transform .3s var(--st-ease)}
#page-memoria .st-chev svg{width:14px;height:14px}
@media (max-width:520px){#page-memoria .st-chip{display:none}}
#page-memoria .st-tb > :first-child{margin-top:0}
#page-memoria .st-tb > :last-child{margin-bottom:0}
#page-memoria.rm-all .st-in{display:block}
#page-memoria #memRoomCard .mr-how > b.st-howk{display:flex;align-items:center;justify-content:space-between;gap:12px;cursor:pointer;outline:none;border-radius:10px}
#page-memoria #memRoomCard .mr-how > b.st-howk:focus-visible{box-shadow:0 0 0 2.5px var(--st-acc)}
#page-memoria #memRoomCard .mr-how > b.st-howk::after{content:"";flex:0 0 24px;width:24px;height:24px;border-radius:50%;box-shadow:var(--st-pop);
  background:linear-gradient(var(--st-h1),var(--st-h2));transition:transform .3s var(--st-ease)}
#page-memoria #memRoomCard .mr-how.rm-shut > b.st-howk::after{transform:rotate(180deg)}
#page-memoria #memRoomCard .mr-how > b.st-howk::before{content:"";position:absolute;right:24px;margin-top:-1px;width:6px;height:6px;border-right:2px solid var(--st-acc);
  border-bottom:2px solid var(--st-acc);transform:rotate(-135deg);transition:transform .3s var(--st-ease);z-index:1}
#page-memoria #memRoomCard .mr-how.rm-shut > b.st-howk::before{transform:rotate(45deg) translate(-2px,-2px)}
#page-memoria #memRoomCard .mr-how{position:relative}
#page-memoria #memRoomCard .mr-how.rm-shut{cursor:pointer;transition:transform .2s var(--st-out),box-shadow .2s ease}
#page-memoria #memRoomCard .mr-how.rm-shut:hover{transform:translateY(-3px)}
#page-memoria #memRoomCard .mr-how.rm-shut > :not(b){display:none !important}
#page-memoria #memRoomCard .mr-how:not(.rm-shut) > :not(b){animation:stOpen .35s cubic-bezier(.22,1,.36,1)}
#page-memoria #memRoomCard .mr-left > .st-memk{display:grid !important;grid-template-columns:40px minmax(0,1fr) auto 26px;gap:12px;align-items:center;cursor:pointer;outline:none;
  padding:12px 14px;border-radius:16px;background:linear-gradient(var(--st-h1),var(--st-h2));border:1px solid var(--st-hair);box-shadow:var(--st-pop);color:var(--ink-1);
  -webkit-user-select:none;user-select:none;transition:transform .2s var(--st-out),box-shadow .2s ease}
#page-memoria #memRoomCard .mr-left > .st-memk:hover{transform:translateY(-3px);box-shadow:var(--st-pophi)}
#page-memoria #memRoomCard .mr-left > .st-memk:focus-visible{box-shadow:var(--st-pop),0 0 0 2.5px var(--st-acc)}
#page-memoria #memRoomCard .mr-left:not(.rm-shut) > .st-memk .st-chev{transform:rotate(180deg)}
#page-memoria #memRoomCard.st-swshut .mr-left > .mr-sw{display:none !important}
#page-memoria #memRoomCard .mr-left:not(.rm-shut) > .mr-sw{animation:stOpen .35s cubic-bezier(.22,1,.36,1)}
#page-memoria #supRows{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));grid-auto-flow:row dense;gap:12px;align-items:start;margin-top:12px}
#page-memoria #supRows > :not(.sup-group),#page-memoria #supRows > .sup-group:not(.rm-shut){grid-column:1/-1}
@media (max-width:760px){#page-memoria #supRows{grid-template-columns:minmax(0,1fr)}}
#page-memoria #supRows > .sup-group{border-radius:16px;padding:2px 16px 12px;margin:0;min-width:0;background:linear-gradient(var(--st-h1),var(--st-h2));
  border:1px solid var(--st-hair);box-shadow:var(--st-pop);transition:transform .2s var(--st-out),box-shadow .2s ease;animation:stRise .44s var(--st-out) backwards}
#page-memoria #supRows > .sup-group:nth-child(2){animation-delay:55ms}
#page-memoria #supRows > .sup-group:nth-child(3){animation-delay:110ms}
#page-memoria #supRows > .sup-group:nth-child(4){animation-delay:165ms}
#page-memoria #supRows > .sup-group.rm-shut{padding-bottom:2px;cursor:pointer}
#page-memoria #supRows > .sup-group.rm-shut:hover{transform:translateY(-3px);box-shadow:var(--st-pophi)}
#page-memoria #supRows > .sup-group:not(.rm-shut){background:var(--card,#fff);box-shadow:var(--st-slab)}
#page-memoria #supRows .sup-group-title{border:0 !important;margin:0 !important;padding:0 !important}
#page-memoria #supRows .sup-group-title > .rm-fold{width:100%;display:flex;align-items:center;gap:12px;padding:12px 0;margin:0;background:none;border:0;box-shadow:none;cursor:pointer;
  font:600 16.5px/1.25 var(--serif,Georgia,serif);letter-spacing:.02em;text-transform:none;color:var(--ink-1);text-align:left}
#page-memoria #supRows .sup-group-title > .rm-fold::before{content:"";flex:0 0 14px;width:14px;height:14px;border-radius:50%;background:var(--st-disc);box-shadow:var(--st-discsh)}
#page-memoria #supRows .sup-group-title > .rm-fold > span{flex:1 1 auto}
#page-memoria #supRows .sup-group-title > .rm-fold > i{flex:0 0 26px;width:26px;height:26px;border-radius:50%;display:grid;place-items:center;color:var(--st-acc);
  background:linear-gradient(var(--st-h1),var(--st-h2));box-shadow:var(--st-pop);border:0}
#page-memoria #supRows .sup-group:not(.rm-shut) > :not(.sup-group-title){animation:stOpen .35s cubic-bezier(.22,1,.36,1)}
#page-memoria label.eswitch .etrack,#page-memoria .fx-sw input[type="checkbox"],#page-memoria .ps-sw input[type="checkbox"],#page-memoria input.bk-sw,#page-memoria button.st-sw{
  background:var(--st-wellbg) !important;box-shadow:var(--st-well),0 0 0 1px var(--st-hair) !important;border-color:transparent !important;transition:background .25s ease,box-shadow .25s ease !important}
#page-memoria label.eswitch input:checked + .etrack,#page-memoria .fx-sw input[type="checkbox"]:checked,#page-memoria .ps-sw input[type="checkbox"]:checked,#page-memoria input.bk-sw:checked,#page-memoria button.st-sw[aria-checked="true"]{background:linear-gradient(var(--rm-pa,#7348be),var(--rm-pb,#5d37a1)) !important;box-shadow:var(--rm-psh,0 2px 0 #3a2070) !important}
#page-memoria label.eswitch .etrack::before,#page-memoria .fx-sw input[type="checkbox"]::before,#page-memoria .ps-sw input[type="checkbox"]::before,#page-memoria input.bk-sw::before,#page-memoria button.st-sw::before{
  background:var(--st-knob) !important;box-shadow:var(--st-knobsh) !important;transition:transform .34s var(--st-spring),box-shadow .25s ease !important}
#page-memoria label.eswitch input:checked + .etrack::before,#page-memoria .fx-sw input[type="checkbox"]:checked::before,#page-memoria .ps-sw input[type="checkbox"]:checked::before,#page-memoria input.bk-sw:checked::before,#page-memoria button.st-sw[aria-checked="true"]::before{box-shadow:0 2px 0 var(--rm-pledge,#3a2070),0 0 10px var(--st-lit) !important}
#page-memoria .st-plate:hover label.eswitch .etrack::before,#page-memoria label.fx-sw:hover input[type="checkbox"]::before,#page-memoria label.ps-sw:hover input[type="checkbox"]::before,#page-memoria .bk-opt:hover input.bk-sw::before,#page-memoria .st-plate:hover button.st-sw::before{box-shadow:var(--st-knobsh),0 0 0 4px var(--st-accs) !important}
#page-memoria .st-slide.st-ready{position:relative;padding:4px;border-radius:16px;background:var(--st-wellbg);box-shadow:var(--st-well),0 0 0 1px var(--st-hair)}
#page-memoria .st-slide.st-ready::before{content:"";position:absolute;left:var(--st-x,0);top:var(--st-y,0);width:var(--st-w,0);height:var(--st-h,0);margin:0;border-radius:var(--st-r,999px);
  pointer-events:none;z-index:0;box-sizing:border-box;background:linear-gradient(var(--rm-pa,#7348be),var(--rm-pb,#5d37a1));border:1px solid var(--rm-pedge,#4b2a86);
  box-shadow:var(--rm-psh,0 2px 0 #3a2070);transition:left .4s var(--st-ease),top .4s var(--st-ease),width .4s var(--st-ease),height .4s var(--st-ease)}
#page-memoria .st-slide.st-now::before{transition:none !important}
#page-memoria .st-slide.st-ready > *:not(#st-z){position:relative;z-index:1;background:transparent !important;box-shadow:none !important;border-color:transparent !important;
  transition:color .2s ease,transform .18s var(--st-ease) !important}
#page-memoria .st-slide.st-ready > *:not(#st-z):hover{transform:translateY(-1px);color:var(--ink-1)}
#page-memoria .st-slide.st-ready > .on:not(#st-z),#page-memoria .st-slide.st-ready > .active:not(#st-z),#page-memoria .st-slide.st-ready > [aria-checked="true"]:not(#st-z),#page-memoria .st-slide.st-ready > [aria-pressed="true"]:not(#st-z){color:#fff !important;text-shadow:0 1px 1px rgba(30,10,60,.32)}
#page-memoria input[type="text"]:not(#st-z),#page-memoria input[type="number"]:not(#st-z),#page-memoria input[type="password"]:not(#st-z),#page-memoria input[type="email"]:not(#st-z),#page-memoria input[type="url"]:not(#st-z),#page-memoria input:not([type]):not(#st-z),#page-memoria textarea:not(#st-z){background:var(--st-wellbg);border-color:transparent;
  box-shadow:var(--st-well),0 0 0 1px var(--st-hair);transition:box-shadow .2s ease,background .2s ease}
#page-memoria input[type="text"]:not(#st-z):hover,#page-memoria input[type="number"]:not(#st-z):hover,#page-memoria input[type="password"]:not(#st-z):hover,#page-memoria input[type="email"]:not(#st-z):hover,#page-memoria input[type="url"]:not(#st-z):hover,#page-memoria input:not([type]):not(#st-z):hover,#page-memoria textarea:not(#st-z):hover{box-shadow:var(--st-well),0 0 0 2px var(--st-ring),0 0 16px var(--st-accs)}
#page-memoria input[type="text"]:not(#st-z):focus,#page-memoria input[type="number"]:not(#st-z):focus,#page-memoria input[type="password"]:not(#st-z):focus,#page-memoria input[type="email"]:not(#st-z):focus,#page-memoria input[type="url"]:not(#st-z):focus,#page-memoria input:not([type]):not(#st-z):focus,#page-memoria textarea:not(#st-z):focus{outline:none;box-shadow:var(--st-well),0 0 0 2px var(--st-acc),0 0 18px var(--st-accs)}
#page-memoria .st-plate:not(#st-z){margin:6px 0 0 !important;padding:9px 12px !important;border:0 !important;border-radius:14px;background:linear-gradient(var(--st-h1),var(--st-h2));
  box-shadow:var(--st-pop);transition:transform .18s var(--st-ease),box-shadow .18s ease}
#page-memoria .st-plate:not(#st-z):hover{transform:translateY(-2px);box-shadow:var(--st-pophi)}
#page-memoria .st-plate:not(#st-z)::before,#page-memoria .st-plate:not(#st-z)::after{border:0 !important}
body[data-motion="minimal"] #page-memoria .st-tb,body[data-motion="minimal"] #page-memoria #supRows > .sup-group,body[data-motion="minimal"] #page-memoria #supRows > .sup-group > *,body[data-motion="minimal"] #page-memoria .mr-how > *,body[data-motion="minimal"] #page-memoria .st-slide::before,body[data-motion="minimal"] #page-memoria .st-plate,body[data-motion="minimal"] #page-memoria .st-chev,body[data-motion="minimal"] #page-memoria .st-disc,body[data-calm="1"] #page-memoria .st-tb,body[data-calm="1"] #page-memoria #supRows > .sup-group,body[data-calm="1"] #page-memoria #supRows > .sup-group > *,body[data-calm="1"] #page-memoria .mr-how > *,body[data-calm="1"] #page-memoria .st-slide::before,body[data-calm="1"] #page-memoria .st-plate,body[data-calm="1"] #page-memoria .st-chev,body[data-calm="1"] #page-memoria .st-disc{animation:none !important;transition:none !important}
body[data-motion="minimal"] #page-memoria label.eswitch .etrack::before,body[data-motion="minimal"] #page-memoria input[type="checkbox"]::before,body[data-motion="minimal"] #page-memoria button.st-sw::before,body[data-calm="1"] #page-memoria label.eswitch .etrack::before,body[data-calm="1"] #page-memoria input[type="checkbox"]::before,body[data-calm="1"] #page-memoria button.st-sw::before{transition:none !important}
@media (prefers-reduced-motion:reduce){#page-memoria .st-tb,#page-memoria #supRows > .sup-group,#page-memoria #supRows > .sup-group > *,#page-memoria .mr-how > *,#page-memoria .st-slide::before,#page-memoria .st-plate,#page-memoria .st-chev,#page-memoria .st-disc,#page-memoria label.eswitch .etrack::before,#page-memoria input[type="checkbox"]::before,#page-memoria button.st-sw::before{animation:none !important;transition:none !important}}

#page-memoria > .page-title,#page-memoria > .lede{display:none !important}
#page-memoria .fxp-bar{grid-template-columns:repeat(4,minmax(0,1fr))}
@media (max-width:1100px){#page-memoria .fxp-bar{grid-template-columns:repeat(2,minmax(0,1fr))}}
@media (max-width:560px){#page-memoria .fxp-bar{grid-template-columns:minmax(0,1fr)}}
/* Back up and move: Moving's four steps two by two, as in Settings (r234) */
@media (min-width:900px){#page-memoria #bkSteps{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px;align-items:stretch}#page-memoria #bkSteps > li{margin:0 !important}}
#page-memoria .mm-panel{display:grid;gap:16px}
#page-memoria .mm-panel > .card{margin:0}
/* the head: the mind (r392) as Ingenium's pages hold their objects; its words as theirs */
#mmHeadSlot{margin:0 0 8px}
#page-memoria #knHead{height:470px;min-height:0;margin:0;border-radius:30px;display:block;
  box-shadow:inset 0 0 0 1px var(--sk-ring),0 1px 1px rgba(40,22,68,.04),0 4px 6px rgba(40,22,68,.04),0 14px 28px rgba(40,22,68,.07),0 34px 60px rgba(40,22,68,.08)}
body[data-theme="night"] #page-memoria #knHead{box-shadow:inset 0 0 0 1px var(--sk-ring),0 14px 28px rgba(0,0,0,.45),0 34px 60px rgba(0,0,0,.4)}
#page-memoria #knHead .kh-words{position:absolute;left:40px;top:34px;z-index:5;width:470px;max-width:none;padding:0;display:block}
#page-memoria #knHead .kh-eye{display:flex;gap:14px;font:600 11.5px/1 var(--sans,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif);letter-spacing:.28em;text-transform:uppercase;color:var(--sk-ink3)}
#page-memoria #knHead h2{margin:12px 0 10px;padding:0;border:0;font:600 48px/1.04 var(--sk-serif);letter-spacing:.004em;color:var(--sk-ink1)}
#page-memoria #knHead .kh-words > p{margin:0 0 16px;font-size:14px;line-height:1.55;color:var(--sk-ink2)}
#page-memoria #knHead .kh-chips{margin:0 0 14px}
#page-memoria #knHead .kh-keys{display:flex;gap:10px;flex-wrap:wrap;align-items:center}
#page-memoria #knHead .kh-keys button{position:relative;display:inline-flex;align-items:center;justify-content:center;gap:8px;min-height:36px;padding:8px 16px;border-radius:12px;border:1px solid var(--sk-hair);
  background:linear-gradient(var(--sk-keyA),var(--sk-keyB));color:var(--sk-ink1);font:600 13px/1.2 var(--sans,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif);cursor:pointer;box-shadow:var(--sk-key);
  transition:transform .16s cubic-bezier(.34,1.35,.64,1),box-shadow .16s ease;-webkit-tap-highlight-color:transparent}
#page-memoria #knHead .kh-keys button svg{width:16px;height:16px;flex:0 0 auto}
#page-memoria #knHead .kh-keys button:hover{transform:translateY(-2px);box-shadow:var(--sk-keyhi)}
#page-memoria #knHead .kh-keys button:active{transform:translateY(1px);box-shadow:var(--sk-press);transition-duration:.06s}
#page-memoria #knHead .kh-keys button.primary{background:linear-gradient(var(--sk-pa),var(--sk-pb));border-color:transparent;color:#fff;box-shadow:inset 0 1px 0 rgba(255,255,255,.16),0 2px 0 var(--sk-pedge),0 4px 6px rgba(40,22,68,.24),0 9px 16px rgba(40,22,68,.16)}
#page-memoria #knHead .kh-keys button:focus-visible{outline:2.5px solid var(--sk-acc);outline-offset:3px}
#page-memoria #knHead .mm-says{margin:12px 0 0;max-width:460px;font-size:12.5px;line-height:1.5;color:var(--sk-ink3)}
#page-memoria #knHead .kh-say{left:40px;right:auto;bottom:24px;z-index:6;max-width:470px;text-align:left;font:italic 500 16px/1.4 var(--sk-serif);color:var(--sk-ink3)}
#page-memoria #knHead .kh-say b{font-style:normal;font-weight:600;color:var(--sk-ink1)}
@media (max-width:1180px){#page-memoria #knHead .kh-words{width:420px}}
@media (max-width:860px){#page-memoria #knHead{height:auto;min-height:640px}
  #page-memoria #knHead .kh-words{position:relative;left:auto;top:auto;width:auto;padding:26px 22px 0}
  #page-memoria #knHead h2{font-size:40px}
  #page-memoria #knHead .kh-say{left:22px;right:22px;bottom:18px;font-size:14.5px}}
body[data-motion="minimal"] #page-memoria #knHead .kh-keys button{transition:none}
@media (prefers-reduced-motion:reduce){#page-memoria #knHead .kh-keys button{transition:none}}
/* a card's heading with its little icon, as Settings draws it (r278) */
#page-memoria .card h2.sec .st-ic{display:inline-grid;place-items:center;width:28px;height:28px;margin:-3px 9px 0 0;vertical-align:middle;border-radius:8px;
  background:rgba(106,63,181,.10);color:var(--accent);flex:0 0 auto}
body[data-theme="night"] #page-memoria .card h2.sec .st-ic{background:rgba(183,156,230,.14)}
#page-memoria .card h2.sec .st-ic svg{width:15px;height:15px;stroke:currentColor;fill:none;stroke-width:1.8;stroke-linecap:round;stroke-linejoin:round}
/* each room's card open whole: Settings' folded tile head (r313) is not needed here */
#page-memoria .mm-panel > .card > .st-th{display:none !important}
#page-memoria .mm-panel > .card > .st-hid{display:block}
/* From your chats: Memory's own card, without a second head of its own under the page's */
#page-memoria #memRoomCard > .mr-eye,#page-memoria #memRoomCard > h2.mr-h{display:none}
#page-memoria #memRoomCard > .mr-say{font:600 15px/1.45 var(--sans,system-ui,sans-serif);color:var(--mr-ink1,var(--ink-1));margin:2px 0 6px}
/* Settings: the card that opens Memoria */
.mm-moved{display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:12px 20px}
.mm-moved h3{margin:0 0 4px}
.mm-moved p{margin:0;max-width:64ch;font-size:13px;line-height:1.5;color:var(--ink-2)}
</style>
<script>try{(window.__ingParts=window.__ingParts||{})["p396"]="started";}catch(_){}
(function r396(){"use strict";
if(window.IngMemoria)return;var W=window,D=document,KEY="ing.memoria.room",CUR="knows",WANT="knows";
function $(id){return D.getElementById(id);}
function mk(t,c,x){var e=D.createElement(t);if(c)e.className=c;if(x!=null)e.textContent=x;return e;}
function svg(d){return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">'+d+'</svg>';}
var ICO={page:'<circle cx="6" cy="8" r="1.6"/><circle cx="17.5" cy="6" r="1.6"/><circle cx="12" cy="13" r="1.9"/><circle cx="7" cy="18.5" r="1.4"/><circle cx="18" cy="17" r="1.4"/><path d="M7.4 8.7l3.2 3.1M13.6 12.1l2.8-4.7M10.6 14.2l-2.6 3.3M13.7 13.9l3 2.3"/>',
  knows:'<circle cx="12" cy="12" r="2.2"/><circle cx="5.5" cy="7" r="1.5"/><circle cx="18.5" cy="7" r="1.5"/><circle cx="12" cy="20" r="1.5"/><path d="M7 7.9l3.3 2.6M17 7.9l-3.3 2.6M12 14.2V18.5"/>',
  chats:'<path d="M4.5 6.5A2 2 0 0 1 6.5 4.5h11a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H11l-4 3.5v-3.5H6.5a2 2 0 0 1-2-2z"/><path d="M9 9.5h6M9 12h3.5"/>',
  cloud:'<path d="M7 18.5h10a4 4 0 0 0 .6-7.96A5.5 5.5 0 0 0 7.1 9.6 4.5 4.5 0 0 0 7 18.5z"/><path d="M9.5 14.5l2 2 3.5-4"/>',
  backup:'<rect x="3.5" y="4" width="17" height="5" rx="1.5"/><path d="M5 9v9.5A1.5 1.5 0 0 0 6.5 20h11a1.5 1.5 0 0 0 1.5-1.5V9"/><path d="M10 13h4"/>',
  chev:'<path d="M9 6l6 6-6 6"/>',wait:'<path d="M12 7v5l3 2"/><circle cx="12" cy="12" r="8"/>',find:'<circle cx="11" cy="11" r="6.5"/><path d="M20 20l-4.3-4.3"/>'};
var ROOMS=[{k:"knows",t:"What it knows",card:"knRoom",says:"What Ingenium knows about your apps and about you, each fact with where it came from: kept, waiting for you, or found. Chats draw on it."},
  {k:"chats",t:"From your chats",card:"memRoomCard",says:"What Ingenium remembers from your chats: what waits for you, what is kept, and what goes with each message. You see every memory, and you choose what stays."},
  {k:"cloud",t:"Ingenium Cloud",card:"cloudCard",says:"Your work the same on every device, kept by your home computer or another of yours, sealed with your passphrase; and what two devices both changed, kept for you to choose."},
  /* her word (25 November 2026): "Backup and move should also move into Memoria as a fourth room beside Ingenium Cloud" */
  {k:"backup",t:"Back up and move",card:"bkCard",more:["rpCard","sbCard"],says:"Everything in one file, to keep somewhere safe or to carry to another device, and bringing it back; restore points of your whole desk, and backups on a schedule."}];
function cardsOf(R){return [R.card].concat(R.more||[]);}
try{var s0=W.localStorage.getItem(KEY);if(s0&&ROOMS.some(function(r){return r.k===s0;}))CUR=WANT=s0;}catch(e){}
/* ---------- its place: the page, the side bar, go() ---------- */
function install(){if($("page-memoria")){nav();return true;}var main=D.querySelector(".main");var after=$("page-folders");if(!main&&!after)return false;
  var sec=mk("section","section");sec.id="page-memoria";sec.classList.add("sk-on");
  sec.innerHTML='<h1 class="page-title">Memoria</h1><div id="mmHeadSlot"></div><div class="fxp-bar" id="mmBar" role="tablist" aria-label="Memoria\'s rooms"></div><p class="fxp-says" id="mmSays" aria-live="polite"></p><div class="mm-panel" id="mmPanel"></div>';
  if(after&&after.parentNode)after.parentNode.insertBefore(sec,after.nextSibling);else main.appendChild(sec);
  var bar=sec.querySelector("#mmBar");ROOMS.forEach(function(R,i){var t=mk("button","fxp-tab");t.type="button";t.id="mmT-"+R.k;t.setAttribute("role","tab");t.setAttribute("data-room",R.k);t.style.setProperty("--i",i);
    t.innerHTML='<span class="fxp-top"><span class="fxp-ico">'+svg(ICO[R.k])+'</span><span class="fxp-name">'+R.t+'</span>'+svg(ICO.chev).replace("<svg",'<svg class="fxp-chev"')+'</span><span class="fxp-stat" id="mmS-'+R.k+'"></span>';
    t.addEventListener("click",function(){show(R.k,true);});bar.appendChild(t);});
  bar.addEventListener("keydown",function(e){var k=e.key;if(k!=="ArrowLeft"&&k!=="ArrowRight")return;var ts=[].slice.call(bar.querySelectorAll(".fxp-tab")).filter(function(x){return !x.hidden;}),i=ts.indexOf(D.activeElement);if(i<0)return;e.preventDefault();var j=(i+(k==="ArrowRight"?1:-1)+ts.length)%ts.length;show(ts[j].getAttribute("data-room"),true);ts[j].focus();});
  nav();return true;}
/* in the side bar, under Studio, after Ingenia; made again if the side bar is made anew */
function nav(){var nb=D.querySelector('.nav-btn[data-page="folders"]');
  if(nb&&!D.querySelector('.nav-btn[data-page="memoria"]')){var b=mk("button","nav-btn");b.type="button";b.setAttribute("data-page","memoria");b.setAttribute("onclick","go('memoria')");b.title="Memoria";
    b.innerHTML=svg(ICO.page)+"Memoria";nb.parentNode.insertBefore(b,nb.nextSibling);try{if($("page-memoria").classList.contains("active"))b.classList.add("active");}catch(e){}}
  if(W.PAGES&&W.PAGES.indexOf("memoria")<0)W.PAGES.push("memoria");}
/* ---------- the rooms: the cards brought here whole ---------- */
function adopt(){var P=$("mmPanel");if(!P)return;var moved=false;ROOMS.forEach(function(R){cardsOf(R).forEach(function(id){var c=$(id);if(c&&c.parentNode!==P){P.appendChild(c);moved=true;}if(c&&c.getAttribute("data-mm")!==R.k){c.setAttribute("data-mm",R.k);moved=true;}});});
  /* in the order of the rooms, each room's cards in their own order (the backup, then its restore points, then its schedule) */
  if(moved)ROOMS.forEach(function(R){cardsOf(R).forEach(function(id){var c=$(id);if(c&&c.parentNode===P)P.appendChild(c);});});
  if(moved)show(WANT,false);settingsCards();}
/* the room wanted is kept even while its card is not made yet (as Settings keeps its sections, r234): until then the first room that has one is shown */
function show(k,mine){var P=$("mmPanel");if(!P)return;WANT=k||WANT;k=WANT;var has={};ROOMS.forEach(function(R){has[R.k]=!!$(R.card);});if(!has[k]){var f=ROOMS.filter(function(R){return has[R.k];})[0];if(f)k=f.k;}CUR=k;
  [].forEach.call(P.children,function(c){var on=c.getAttribute("data-mm")===k;c.classList.toggle("fxp-on",on);c.classList.toggle("fxp-off",!on);});
  ROOMS.forEach(function(R){var t=$("mmT-"+R.k);if(!t)return;t.hidden=!has[R.k];var on=R.k===k;t.setAttribute("aria-selected",on?"true":"false");t.tabIndex=on?0:-1;});
  var R=ROOMS.filter(function(x){return x.k===k;})[0],s=$("mmSays");if(R&&s&&s.textContent!==R.says)s.textContent=R.says;
  if(mine)try{W.localStorage.setItem(KEY,k);}catch(e){}
  try{if(k==="chats"&&W.IngChatMemory)IngChatMemory.paint();}catch(e){}
  if(k==="backup")requestAnimationFrame(function(){requestAnimationFrame(bkThumb);});}
/* the backup card's sliding pill, placed as the backup places it (r143's thumb), which it does only while Settings is open */
function bkThumb(){var c=$("bkCard");if(!c||c.offsetWidth===0)return;var seg=c.querySelector(".bk-seg"),b=seg&&seg.querySelector('[aria-selected="true"]'),t=seg&&seg.querySelector(".bk-thumb");if(!b||!t)return;
  t.style.width=b.offsetWidth+"px";t.style.transform="translateX("+b.offsetLeft+"px)";}
W.addEventListener("resize",function(){if(CUR==="backup")requestAnimationFrame(bkThumb);});
D.addEventListener("click",function(e){try{if(e.target.closest&&e.target.closest("#page-memoria #bkCard .bk-seg"))requestAnimationFrame(bkThumb);}catch(_){}},true);
/* each room's line, from what it holds */
function n(x,one,many){return x+" "+(x===1?one:many);}
function stats(){try{var a=$("mmS-knows"),ch=D.querySelectorAll("#knHead .kh-chips .kn-chip");if(a)a.textContent=[].map.call(ch,function(c){return c.textContent.trim();}).filter(Boolean).join(" · ")||"About your apps and about you";}catch(e){}
  try{var b=$("mmS-chats"),M=W.IngChatMemory&&IngChatMemory.state,L=M&&(M.items||M.list||M.mems)||[],w=L.filter?L.filter(function(x){return x&&(x.st==="waiting"||x.wait||x.pending);}).length:0;if(b)b.textContent=L.length?n(L.length-w,"memory kept","memories kept")+(w?" · "+w+" waiting for you":""):"Nothing remembered yet; it learns as you chat";}catch(e){}
  try{var k=$("mmS-backup"),sc={};try{sc=JSON.parse(localStorage.getItem("ingenium_backup_schedule")||"{}")||{};}catch(_){}if(k)k.textContent=sc.last&&sc.last.ok?"Last scheduled backup "+new Date(sc.last.at).toLocaleString("en-GB",{day:"numeric",month:"short",hour:"2-digit",minute:"2-digit"}):"One file, restore points and backups on a schedule";}catch(e){}
  try{var c=$("mmS-cloud"),S=W.IngCloud&&IngCloud.settings?IngCloud.settings():null,t=S&&Math.max(S.lastPull||0,S.lastPush||0);if(c)c.textContent=S&&(S.joined||t)?"On"+(t?" · last in step "+new Date(t).toLocaleString("en-GB",{day:"numeric",month:"short",hour:"2-digit",minute:"2-digit"}):""):"Not set up on this device";}catch(e){}}
/* ---------- the head: the mind (r392), with the words of Ingenium's pages ---------- */
function head(){var h=$("knHead"),s=$("mmHeadSlot");if(!h||!s||h.parentNode!==s)return;if(h.__mm)return;h.__mm=1;
  var e=h.querySelector(".kh-eye");if(e)e.textContent="What Ingenium knows and keeps";var t=h.querySelector("h2");if(t)t.textContent="Memoria";
  var p=h.querySelector(".kh-words > p");if(p)p.textContent="Everything Ingenium knows and remembers, about your apps and about you, and your work kept the same on each of your devices. It stays yours: on this device, or on your own computers through Ingenium Cloud.";
  var ks=h.querySelectorAll(".kh-keys button");[[ICO.wait,"knows"],[ICO.find,"knows"]].forEach(function(x,i){var b=ks[i];if(!b)return;b.insertAdjacentHTML("afterbegin",svg(x[0]));b.addEventListener("click",function(){show(x[1],true);},true);});
  var w=h.querySelector(".kh-words");if(w&&!w.querySelector(".mm-says")){var m=mk("p","mm-says",D.getElementById("page-fabrica")?"It learns from your chats, your apps' folders and Fabrica, and asks before it keeps what it is not sure of.":"It learns from your chats and your folders, and asks before it keeps what it is not sure of.");  /* 7.96: an edition without Fabrica does not name it (t_627_editions) */w.appendChild(m);}
  var say=h.querySelector(".kh-say");if(say)say.innerHTML="Your apps are its brightest stars. <b>Press a star</b> and what Ingenium knows of it opens below; drag to turn the mind.";}
/* ---------- Settings: a card where Memory and Ingenium Cloud were, opening Memoria ---------- */
function settingsCards(){var pn=$("rmP-settings-data");if(!pn)return;[["mmMovedMem","Memory","chats","Memory has a page of its own: Memoria, in the side bar under Studio. What Ingenium knows, what it remembers from your chats, and its switches are there."],
    ["mmMovedCloud","Ingenium Cloud","cloud","Ingenium Cloud is in Memoria now, beside what Ingenium knows: joining, sending and bringing in your work, and what two devices both changed."],
    ["mmMovedBackup","Back up and move","backup","Back up and move is in Memoria now, beside Ingenium Cloud: the one-file backup, bringing it back, restore points, and backups on a schedule."]].forEach(function(x){
    if($(x[0]))return;var c=mk("section","card mm-moved");c.id=x[0];var d=mk("div");d.appendChild(mk("h3",null,x[1]));d.appendChild(mk("p",null,x[3]));c.appendChild(d);
    var b=mk("button","btn primary","Open Memoria");b.type="button";b.onclick=function(){open(x[2]);};c.appendChild(b);pn.appendChild(c);});}
/* ---------- anything that opened Memory or Ingenium Cloud in Settings opens Memoria ---------- */
var AWAY=0;
function open(k){if(AWAY)return;AWAY=1;try{if(!$("page-memoria")||!$("page-memoria").classList.contains("active"))W.go("memoria");}catch(e){}AWAY=0;show(k||WANT,true);try{W.scrollTo({top:0});}catch(e){}}
function wraps(){var SP=W.IngSettingsParts;if(SP&&!SP.__r396){var os=SP.show;SP.show=function(r,k,rem){if(r==="data"&&(k==="memory"||k==="cloud"||k==="backup")&&$("page-memoria")){REDIRECT=1;try{if(!$("page-memoria").classList.contains("active"))W.go("memoria");}catch(e){}REDIRECT=0;show(k==="memory"?"chats":k,true);return k;}return os.apply(this,arguments);};SP.__r396=1;}
  var CM=W.IngChatMemory;if(CM&&!CM.__r396){var oo=CM.open;CM.open=function(){REDIRECT=1;try{return oo.apply(this,arguments);}finally{REDIRECT=0;}};CM.__r396=1;W.memOpen=function(id){CM.open(id||null);};}
  var K=W.IngKnow;if(K&&!K.__r396){var ko=K.open;K.open=function(){var r=ko.apply(this,arguments);show("knows",true);return r;};K.__r396=1;}
  var B=W.IngBackup;if(B&&!B.__r396show&&typeof B.show==="function"){BKSHOW=B.show;B.show=function(){if(MAKING)return BKSHOW.apply(this,arguments);REDIRECT=1;var r;try{r=BKSHOW.apply(this,arguments);}finally{REDIRECT=0;}adopt();show("backup",true);return r;};B.__r396show=1;}
  var RM=W.IngRooms;if(RM&&!RM.__r396&&typeof RM.open==="function"){var ro=RM.open;RM.open=function(pg){if(REDIRECT&&pg==="settings")return;return ro.apply(this,arguments);};RM.__r396=1;}
  var og=W.go;if(typeof og==="function"&&!og.__r396){var ng=function(p){if(REDIRECT&&p==="settings")p="memoria";var r=og.apply(this,[p].concat([].slice.call(arguments,1)));try{if(p==="memoria"&&!MAKING){makeBk();adopt();head();stats();show(WANT,false);}}catch(e){}return r;};
    try{Object.keys(og).forEach(function(k){ng[k]=og[k];});}catch(e){}ng.__r396=true;W.go=ng;try{go=ng;}catch(e){}}}
var REDIRECT=0,MAKING=0,BKSHOW=null;
/* the backup's card is made by the backup itself (r143's ensureCard) when Settings first opens; Memoria asks for it the same way, through
   IngBackup.show, with its step to Settings turned into Memoria */
function makeBk(){if($("bkCard")||MAKING||typeof BKSHOW!=="function")return;MAKING=1;REDIRECT=1;try{BKSHOW("make");}catch(e){}REDIRECT=0;MAKING=0;adopt();}
/* ---------- start, and later ---------- */
install();
(function start(){var n=0;(function w(){install();if(W.__ingReady===true&&W.state){adopt();wraps();head();stats();show(WANT,false);
      setInterval(function(){try{install();adopt();wraps();head();stats();}catch(e){}},2000);return;}if(++n<400)setTimeout(w,500);})();})();
W.IngMemoria={show:function(k,mine){show(k,!!mine);return CUR;},open:open,room:function(){return CUR;},rooms:function(){return ROOMS.map(function(R){return {key:R.k,name:R.t,card:R.card};});},adopt:adopt,stats:stats};
})();
;try{window.__ingParts["p396"]="running";}catch(_){}
</script>
