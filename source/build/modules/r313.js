<style id="r313-css">
/* ============ R313 · SETTINGS, RAISED (Ingenium 7.28, 17 November 2026) ============
   Her words (17 November 2026): "The Settings page needs to be redesigned, a lot of its tab page are poorly organised and have a very
   long page and I have to scroll down endlessly ... I don't like the way that the "Help and the guided tour" section's selected button
   look so flat, please fix that, the same for the "Your level" section on the Guide page ... a lot of sections and tab pages on the
   Settings page that are entirely out of format are flat and stiff, nothing moves and the popped out animated 3D look and effect is
   entirely missing". On the live preview (https://claude.ai/artifact/RaBy13C9zefPiaVkj9bfv2): "I approve of the raised Settings
   preview, please continue working on my requests."
   - Tiles that open (as the Guide's topics since 6.26): in a section of two cards or more, each card is a raised tile with its mark,
     its name and its state in one line; pressed, it opens across the section and the one open before folds. Storage and Your
     Ingenium, one long card each, open by their groups the same way; Memory's How it works folds; Calm's groups are raised tiles.
     The tile left open is kept for each section, on this device.
   - Raised and moving controls: switches with a lit knob that springs across; strips whose chosen part is a raised key sliding under
     the choice; fields as lit wells; each setting's row a raised plate that lifts under the pointer; tiles rising in one after another.
   - The chosen level lifted, ringed and glowing, its own mark lit as a jewel: in Settings, in the Guide's Your level and in the tour.
   - Find a setting finds what a closed tile holds and opens it; Show every setting at once shows everything open, as before; the tabs,
     the sections and what each setting does are unchanged.
   No motion with Minimal motion, the calm look or the system's reduced motion. */
#page-settings,#page-guide{--st-hair:rgba(34,26,46,.10);--st-h1:#ffffff;--st-h2:#f6f2fb;--st-acc:#6a3fb5;--st-accs:rgba(106,63,181,.14);--st-ring:rgba(106,63,181,.5);
  --st-ink3:#6c6579;--st-well:inset 0 1px 2.5px rgba(40,22,68,.10);--st-wellbg:rgba(34,26,46,.04);
  --st-pop:inset 0 -1.5px 0 rgba(40,22,68,.13),0 2px 0 rgba(40,22,68,.25),0 4px 5px rgba(40,22,68,.16),0 9px 14px rgba(40,22,68,.10);
  --st-pophi:inset 0 -1.5px 0 rgba(40,22,68,.13),0 3px 0 rgba(40,22,68,.25),0 6px 8px rgba(40,22,68,.18),0 13px 20px rgba(40,22,68,.12);
  --st-slab:inset 0 1px 0 rgba(255,255,255,.85),0 1px 0 rgba(40,22,68,.06),0 2px 6px rgba(40,22,68,.05),0 12px 30px rgba(40,22,68,.07);
  --st-knob:linear-gradient(#ffffff,#e7e1ef);--st-knobsh:0 2px 0 rgba(40,22,68,.25),0 3px 6px rgba(40,22,68,.25);--st-lit:rgba(201,179,242,.7);
  --st-disc:radial-gradient(circle at 35% 30%,#c9b3f2,var(--rm-pa,#7348be) 55%,var(--rm-pb,#5d37a1));--st-discsh:0 2px 0 var(--rm-pledge,#3a2070),0 5px 10px rgba(40,22,68,.3);
  --st-ease:cubic-bezier(.34,1.35,.64,1);--st-spring:cubic-bezier(.34,1.56,.64,1);--st-out:cubic-bezier(.2,.8,.2,1)}
body[data-theme="night"] #page-settings,body[data-theme="night"] #page-guide{--st-hair:rgba(205,184,240,.11);--st-h1:#2a2239;--st-h2:#231c31;--st-acc:#b79ce6;
  --st-accs:rgba(183,156,230,.16);--st-ring:rgba(183,156,230,.45);--st-ink3:#a99cc1;--st-well:inset 0 1px 3px rgba(0,0,0,.45);--st-wellbg:rgba(10,6,18,.35);
  --st-pop:inset 0 1px 0 rgba(255,255,255,.07),inset 0 -2px 0 rgba(0,0,0,.45),0 2px 0 rgba(0,0,0,.75),0 4px 5px rgba(0,0,0,.5),0 9px 14px rgba(0,0,0,.36);
  --st-pophi:inset 0 1px 0 rgba(255,255,255,.08),inset 0 -2px 0 rgba(0,0,0,.45),0 3px 0 rgba(0,0,0,.75),0 6px 8px rgba(0,0,0,.52),0 13px 20px rgba(0,0,0,.4);
  --st-slab:inset 0 1px 0 rgba(255,255,255,.06),0 1px 0 rgba(0,0,0,.4),0 2px 6px rgba(0,0,0,.3),0 12px 30px rgba(0,0,0,.34);
  --st-knob:linear-gradient(#efe8fb,#cdbfe6);--st-knobsh:0 2px 0 rgba(0,0,0,.6),0 3px 6px rgba(0,0,0,.5);--st-discsh:0 2px 0 var(--rm-pledge,#170b30),0 5px 10px rgba(0,0,0,.45)}

/* ---------- tiles that open: a section's cards ---------- */
#page-settings:not(.rm-all) .rm-panel.st-tiled:not([hidden]){display:grid;grid-template-columns:repeat(2,minmax(0,1fr));grid-auto-flow:row dense;gap:14px;align-items:start;column-count:auto !important}
#page-settings:not(.rm-all) .rm-panel.st-tiled > :not(.st-tile){grid-column:1/-1}
#page-settings:not(.rm-all) .rm-panel.st-tiled > .st-tile{margin:0 !important;column-span:none;-webkit-column-span:none}
#page-settings:not(.rm-all) .rm-panel.st-tiled > .st-tile.st-open{grid-column:1/-1}
#page-settings:not(.rm-all) #rmP-settings-everyday.st-tiled > .st-tile{margin:0 !important}
/* a card drawn half wide before (eyes and ears, modules/r254.js) takes its tile's cell */
#page-settings:not(.rm-all) .rm-panel.st-tiled > .st-tile:not(.dx-off):not([hidden]){display:block !important;width:auto !important;max-width:none !important;float:none !important;vertical-align:top}
@media (max-width:760px){#page-settings:not(.rm-all) .rm-panel.st-tiled:not([hidden]){grid-template-columns:minmax(0,1fr)}}
#page-settings .st-tile,#page-settings .st-itile{position:relative}
#page-settings:not(.rm-all) .st-tile{transition:transform .2s var(--st-out),box-shadow .2s ease}
#page-settings:not(.rm-all) .st-tile.rm-shut{box-shadow:var(--st-pop) !important;cursor:pointer;padding-top:12px !important;padding-bottom:12px !important}
#page-settings:not(.rm-all) .st-tile.rm-shut:hover{transform:translateY(-3px);box-shadow:var(--st-pophi) !important}
#page-settings:not(.rm-all) .st-tile.rm-shut > :not(.st-th){display:none !important}
#page-settings:not(.rm-all) .st-tile.st-open > .st-th{margin:0 0 14px;padding-bottom:12px;border-bottom:1px solid var(--st-hair)}
#page-settings:not(.rm-all) .st-tile .st-hid,#page-settings:not(.rm-all) .st-itile .st-hid{position:absolute !important;top:0 !important;left:0 !important;width:1px !important;height:1px !important;
  margin:0 !important;padding:0 !important;border:0 !important;overflow:hidden !important;clip:rect(0 0 0 0) !important;white-space:nowrap !important}
@keyframes stRise{from{opacity:0;transform:translateY(10px) scale(.99)}to{opacity:1;transform:none}}
@keyframes stOpen{from{opacity:0;transform:translateY(-6px)}to{opacity:1;transform:none}}
#page-settings:not(.rm-all) .rm-panel > .st-tile,#page-settings:not(.rm-all) .st-in > .st-itile{animation:stRise .44s var(--st-out) backwards;animation-delay:calc(var(--st-i,0) * 55ms)}
#page-settings:not(.rm-all) .st-tile.st-open > :not(.st-th),#page-settings:not(.rm-all) .st-itile.st-open > .st-tb{animation:stOpen .35s cubic-bezier(.22,1,.36,1)}

/* a tile's head: its mark, its name and its state, a chip and a turning chevron */
#page-settings .st-th{display:none}
#page-settings:not(.rm-all) .st-tile > .st-th,#page-settings:not(.rm-all) .st-itile > .st-th{display:grid !important;grid-template-columns:40px minmax(0,1fr) auto 26px;gap:12px;align-items:center;
  cursor:pointer;border-radius:14px;outline:none;-webkit-tap-highlight-color:transparent;-webkit-user-select:none;user-select:none;color:var(--ink-1)}
#page-settings .st-th:focus-visible{box-shadow:0 0 0 2.5px var(--st-acc)}
#page-settings .st-disc{width:38px;height:38px;border-radius:50%;display:grid;place-items:center;color:#fff;background:var(--st-disc);box-shadow:var(--st-discsh);transition:transform .3s var(--st-spring)}
#page-settings .st-disc svg{width:18px;height:18px}
#page-settings .st-th:hover .st-disc{transform:translateY(-1px) scale(1.05)}
#page-settings .st-tt{min-width:0}
#page-settings .st-nm{display:block;font:600 16.5px/1.25 var(--serif,Georgia,serif);letter-spacing:.02em;color:var(--ink-1)}
#page-settings .st-say{display:block;color:var(--st-ink3);font-size:12.5px;line-height:1.45;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
#page-settings .st-say:empty{display:none}
#page-settings .st-chip{font:600 11.5px/1 var(--sans,inherit);padding:5px 9px;border-radius:999px;background:var(--st-accs);color:var(--st-acc);white-space:nowrap}
#page-settings .st-chev{width:24px;height:24px;border-radius:50%;display:grid;place-items:center;color:var(--st-acc);background:linear-gradient(var(--st-h1),var(--st-h2));box-shadow:var(--st-pop);
  transition:transform .3s var(--st-ease)}
#page-settings .st-chev svg{width:14px;height:14px}
#page-settings .st-open > .st-th .st-chev{transform:rotate(180deg)}
@media (max-width:520px){#page-settings .st-chip{display:none}#page-settings:not(.rm-all) .st-tile > .st-th,#page-settings:not(.rm-all) .st-itile > .st-th{grid-template-columns:40px minmax(0,1fr) 26px}}

/* ---------- tiles that open: the groups of one long card (Storage, Your Ingenium) ---------- */
#page-settings:not(.rm-all) .st-in{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));grid-auto-flow:row dense;gap:12px;margin:12px 0 4px;align-items:start}
@media (max-width:760px){#page-settings:not(.rm-all) .st-in{grid-template-columns:minmax(0,1fr)}}
#page-settings:not(.rm-all) .st-itile{min-width:0;border-radius:16px;padding:12px 14px;background:linear-gradient(var(--st-h1),var(--st-h2));border:1px solid var(--st-hair);
  box-shadow:var(--st-pop);transition:transform .2s var(--st-out),box-shadow .2s ease}
#page-settings:not(.rm-all) .st-itile.rm-shut{cursor:pointer}
#page-settings:not(.rm-all) .st-itile.rm-shut:hover{transform:translateY(-3px);box-shadow:var(--st-pophi)}
#page-settings:not(.rm-all) .st-itile.st-open{grid-column:1/-1;background:var(--card,#fff);box-shadow:var(--st-slab)}
#page-settings:not(.rm-all) .st-itile.rm-shut > .st-tb{display:none}
#page-settings:not(.rm-all) .st-itile.st-open > .st-th{margin:0 0 12px;padding-bottom:12px;border-bottom:1px solid var(--st-hair)}
#page-settings .st-tb > :first-child{margin-top:0}
#page-settings .st-tb > :last-child{margin-bottom:0}
#page-settings.rm-all .st-in{display:block}
#page-settings #stxCard .dx-cols[hidden]{display:none !important}

/* Memory: How it works folds under its title */
#page-settings:not(.rm-all) #memRoomCard .mr-how > b.st-howk{display:flex;align-items:center;justify-content:space-between;gap:12px;cursor:pointer;outline:none;border-radius:10px}
#page-settings:not(.rm-all) #memRoomCard .mr-how > b.st-howk:focus-visible{box-shadow:0 0 0 2.5px var(--st-acc)}
#page-settings:not(.rm-all) #memRoomCard .mr-how > b.st-howk::after{content:"";flex:0 0 24px;width:24px;height:24px;border-radius:50%;box-shadow:var(--st-pop);
  background:linear-gradient(var(--st-h1),var(--st-h2));transition:transform .3s var(--st-ease)}
#page-settings:not(.rm-all) #memRoomCard .mr-how.rm-shut > b.st-howk::after{transform:rotate(180deg)}
#page-settings:not(.rm-all) #memRoomCard .mr-how > b.st-howk::before{content:"";position:absolute;right:24px;margin-top:-1px;width:6px;height:6px;border-right:2px solid var(--st-acc);
  border-bottom:2px solid var(--st-acc);transform:rotate(-135deg);transition:transform .3s var(--st-ease);z-index:1}
#page-settings:not(.rm-all) #memRoomCard .mr-how.rm-shut > b.st-howk::before{transform:rotate(45deg) translate(-2px,-2px)}
#page-settings:not(.rm-all) #memRoomCard .mr-how{position:relative}
#page-settings:not(.rm-all) #memRoomCard .mr-how.rm-shut{cursor:pointer;transition:transform .2s var(--st-out),box-shadow .2s ease}
#page-settings:not(.rm-all) #memRoomCard .mr-how.rm-shut:hover{transform:translateY(-3px)}
#page-settings:not(.rm-all) #memRoomCard .mr-how.rm-shut > :not(b){display:none !important}
#page-settings:not(.rm-all) #memRoomCard .mr-how:not(.rm-shut) > :not(b){animation:stOpen .35s cubic-bezier(.22,1,.36,1)}

#page-settings:not(.rm-all) #memRoomCard .mr-left > .st-memk{display:grid !important;grid-template-columns:40px minmax(0,1fr) auto 26px;gap:12px;align-items:center;cursor:pointer;outline:none;
  padding:12px 14px;border-radius:16px;background:linear-gradient(var(--st-h1),var(--st-h2));border:1px solid var(--st-hair);box-shadow:var(--st-pop);color:var(--ink-1);
  -webkit-user-select:none;user-select:none;transition:transform .2s var(--st-out),box-shadow .2s ease}
#page-settings:not(.rm-all) #memRoomCard .mr-left > .st-memk:hover{transform:translateY(-3px);box-shadow:var(--st-pophi)}
#page-settings:not(.rm-all) #memRoomCard .mr-left > .st-memk:focus-visible{box-shadow:var(--st-pop),0 0 0 2.5px var(--st-acc)}
#page-settings:not(.rm-all) #memRoomCard .mr-left:not(.rm-shut) > .st-memk .st-chev{transform:rotate(180deg)}
#page-settings:not(.rm-all) #memRoomCard.st-swshut .mr-left > .mr-sw{display:none !important}
#page-settings:not(.rm-all) #memRoomCard .mr-left:not(.rm-shut) > .mr-sw{animation:stOpen .35s cubic-bezier(.22,1,.36,1)}

/* Calm and focus: each group a raised tile, one open at a time (its folding is modules/r173.js's) */
/* the folded groups two to a row, the open one across, as the tiles are */
#page-settings:not(.rm-all) #supRows{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));grid-auto-flow:row dense;gap:12px;align-items:start;margin-top:12px}
#page-settings:not(.rm-all) #supRows > :not(.sup-group),#page-settings:not(.rm-all) #supRows > .sup-group:not(.rm-shut){grid-column:1/-1}
@media (max-width:760px){#page-settings:not(.rm-all) #supRows{grid-template-columns:minmax(0,1fr)}}
#page-settings:not(.rm-all) #supRows > .sup-group{border-radius:16px;padding:2px 16px 12px;margin:0;min-width:0;background:linear-gradient(var(--st-h1),var(--st-h2));
  border:1px solid var(--st-hair);box-shadow:var(--st-pop);transition:transform .2s var(--st-out),box-shadow .2s ease;animation:stRise .44s var(--st-out) backwards}
#page-settings:not(.rm-all) #supRows > .sup-group:nth-child(2){animation-delay:55ms}
#page-settings:not(.rm-all) #supRows > .sup-group:nth-child(3){animation-delay:110ms}
#page-settings:not(.rm-all) #supRows > .sup-group:nth-child(4){animation-delay:165ms}
#page-settings:not(.rm-all) #supRows > .sup-group.rm-shut{padding-bottom:2px;cursor:pointer}
#page-settings:not(.rm-all) #supRows > .sup-group.rm-shut:hover{transform:translateY(-3px);box-shadow:var(--st-pophi)}
#page-settings:not(.rm-all) #supRows > .sup-group:not(.rm-shut){background:var(--card,#fff);box-shadow:var(--st-slab)}
#page-settings:not(.rm-all) #supRows .sup-group-title{border:0 !important;margin:0 !important;padding:0 !important}
#page-settings:not(.rm-all) #supRows .sup-group-title > .rm-fold{width:100%;display:flex;align-items:center;gap:12px;padding:12px 0;margin:0;background:none;border:0;box-shadow:none;cursor:pointer;
  font:600 16.5px/1.25 var(--serif,Georgia,serif);letter-spacing:.02em;text-transform:none;color:var(--ink-1);text-align:left}
#page-settings:not(.rm-all) #supRows .sup-group-title > .rm-fold::before{content:"";flex:0 0 14px;width:14px;height:14px;border-radius:50%;background:var(--st-disc);box-shadow:var(--st-discsh)}
#page-settings:not(.rm-all) #supRows .sup-group-title > .rm-fold > span{flex:1 1 auto}
#page-settings:not(.rm-all) #supRows .sup-group-title > .rm-fold > i{flex:0 0 26px;width:26px;height:26px;border-radius:50%;display:grid;place-items:center;color:var(--st-acc);
  background:linear-gradient(var(--st-h1),var(--st-h2));box-shadow:var(--st-pop);border:0}
#page-settings:not(.rm-all) #supRows .sup-group:not(.rm-shut) > :not(.sup-group-title){animation:stOpen .35s cubic-bezier(.22,1,.36,1)}

/* ---------- raised and moving controls ---------- */
/* switches: a well when off, a lit violet key when on; the knob springs across and glows */
#page-settings label.eswitch .etrack,#page-settings .fx-sw input[type="checkbox"],#page-settings .ps-sw input[type="checkbox"],#page-settings input.bk-sw,#page-settings button.st-sw{
  background:var(--st-wellbg) !important;box-shadow:var(--st-well),0 0 0 1px var(--st-hair) !important;border-color:transparent !important;transition:background .25s ease,box-shadow .25s ease !important}
#page-settings label.eswitch input:checked + .etrack,#page-settings .fx-sw input[type="checkbox"]:checked,#page-settings .ps-sw input[type="checkbox"]:checked,#page-settings input.bk-sw:checked,
#page-settings button.st-sw[aria-checked="true"]{background:linear-gradient(var(--rm-pa,#7348be),var(--rm-pb,#5d37a1)) !important;box-shadow:var(--rm-psh,0 2px 0 #3a2070) !important}
#page-settings label.eswitch .etrack::before,#page-settings .fx-sw input[type="checkbox"]::before,#page-settings .ps-sw input[type="checkbox"]::before,#page-settings input.bk-sw::before,#page-settings button.st-sw::before{
  background:var(--st-knob) !important;box-shadow:var(--st-knobsh) !important;transition:transform .34s var(--st-spring),box-shadow .25s ease !important}
#page-settings label.eswitch input:checked + .etrack::before,#page-settings .fx-sw input[type="checkbox"]:checked::before,#page-settings .ps-sw input[type="checkbox"]:checked::before,
#page-settings input.bk-sw:checked::before,#page-settings button.st-sw[aria-checked="true"]::before{box-shadow:0 2px 0 var(--rm-pledge,#3a2070),0 0 10px var(--st-lit) !important}
#page-settings .st-plate:hover label.eswitch .etrack::before,#page-settings label.fx-sw:hover input[type="checkbox"]::before,#page-settings label.ps-sw:hover input[type="checkbox"]::before,
#page-settings .bk-opt:hover input.bk-sw::before,#page-settings .st-plate:hover button.st-sw::before{box-shadow:var(--st-knobsh),0 0 0 4px var(--st-accs) !important}

/* strips: a well, the chosen part a raised key sliding under the choice (placed by the script; until then, the keys as they were) */
/* the key is the strip's own ::before (the strips' scripts walk their children, so the key is not one of them) */
#page-settings .st-slide.st-ready{position:relative;padding:4px;border-radius:16px;background:var(--st-wellbg);box-shadow:var(--st-well),0 0 0 1px var(--st-hair)}
#page-settings .st-slide.st-ready::before{content:"";position:absolute;left:var(--st-x,0);top:var(--st-y,0);width:var(--st-w,0);height:var(--st-h,0);margin:0;border-radius:var(--st-r,999px);
  pointer-events:none;z-index:0;box-sizing:border-box;background:linear-gradient(var(--rm-pa,#7348be),var(--rm-pb,#5d37a1));border:1px solid var(--rm-pedge,#4b2a86);
  box-shadow:var(--rm-psh,0 2px 0 #3a2070);transition:left .4s var(--st-ease),top .4s var(--st-ease),width .4s var(--st-ease),height .4s var(--st-ease)}
#page-settings .st-slide.st-now::before{transition:none !important}
#page-settings .st-slide.st-ready > *:not(#st-z){position:relative;z-index:1;background:transparent !important;box-shadow:none !important;border-color:transparent !important;
  transition:color .2s ease,transform .18s var(--st-ease) !important}
#page-settings .st-slide.st-ready > *:not(#st-z):hover{transform:translateY(-1px);color:var(--ink-1)}
#page-settings .st-slide.st-ready > .on:not(#st-z),#page-settings .st-slide.st-ready > .active:not(#st-z),#page-settings .st-slide.st-ready > [aria-checked="true"]:not(#st-z),
#page-settings .st-slide.st-ready > [aria-pressed="true"]:not(#st-z){color:#fff !important;text-shadow:0 1px 1px rgba(30,10,60,.32)}

/* fields: lit wells */
#page-settings input[type="text"]:not(#st-z),#page-settings input[type="number"]:not(#st-z),#page-settings input[type="password"]:not(#st-z),#page-settings input[type="email"]:not(#st-z),
#page-settings input[type="url"]:not(#st-z),#page-settings input:not([type]):not(#st-z),#page-settings textarea:not(#st-z){background:var(--st-wellbg);border-color:transparent;
  box-shadow:var(--st-well),0 0 0 1px var(--st-hair);transition:box-shadow .2s ease,background .2s ease}
#page-settings input[type="text"]:not(#st-z):hover,#page-settings input[type="number"]:not(#st-z):hover,#page-settings input[type="password"]:not(#st-z):hover,#page-settings input[type="email"]:not(#st-z):hover,
#page-settings input[type="url"]:not(#st-z):hover,#page-settings input:not([type]):not(#st-z):hover,#page-settings textarea:not(#st-z):hover{box-shadow:var(--st-well),0 0 0 2px var(--st-ring),0 0 16px var(--st-accs)}
#page-settings input[type="text"]:not(#st-z):focus,#page-settings input[type="number"]:not(#st-z):focus,#page-settings input[type="password"]:not(#st-z):focus,#page-settings input[type="email"]:not(#st-z):focus,
#page-settings input[type="url"]:not(#st-z):focus,#page-settings input:not([type]):not(#st-z):focus,#page-settings textarea:not(#st-z):focus{outline:none;box-shadow:var(--st-well),0 0 0 2px var(--st-acc),0 0 18px var(--st-accs)}

/* each setting's row: a raised plate that lifts under the pointer */
#page-settings .st-plate:not(#st-z){margin:6px 0 0 !important;padding:9px 12px !important;border:0 !important;border-radius:14px;background:linear-gradient(var(--st-h1),var(--st-h2));
  box-shadow:var(--st-pop);transition:transform .18s var(--st-ease),box-shadow .18s ease}
#page-settings .st-plate:not(#st-z):hover{transform:translateY(-2px);box-shadow:var(--st-pophi)}
#page-settings .st-plate:not(#st-z)::before,#page-settings .st-plate:not(#st-z)::after{border:0 !important}

/* ---------- the chosen level: lifted, ringed and glowing, its mark lit (Settings, the Guide and the tour) ---------- */
.ih-lv{--lv-ring:rgba(106,63,181,.5);--lv-glow:rgba(106,63,181,.16)}
body[data-theme="night"] .ih-lv{--lv-ring:rgba(183,156,230,.45);--lv-glow:rgba(183,156,230,.2)}
.ih-lv .ih-lvk{position:relative}
.ih-lv .ih-lvk .ih-lvi{display:inline-grid;place-items:center;flex:0 0 30px;width:30px;height:30px;border-radius:50%;font-size:15px;line-height:1;background:var(--ih-accs,rgba(106,63,181,.12));
  box-shadow:inset 0 1px 2.5px rgba(40,22,68,.14);transition:transform .3s cubic-bezier(.34,1.56,.64,1),box-shadow .3s ease,background .3s ease}
.ih-lv .ih-lvk[aria-checked="true"]:not(#ih-z){color:var(--ih-ink1);background:linear-gradient(var(--ih-a),var(--ih-b));transform:translateY(-3px);
  box-shadow:var(--ih-pophi),0 0 0 2px var(--lv-ring),0 12px 26px var(--lv-glow);animation:lvChosen .5s cubic-bezier(.34,1.56,.64,1)}
.ih-lv .ih-lvk[aria-checked="true"]:not(#ih-z):hover{transform:translateY(-4px)}
.ih-lv .ih-lvk[aria-checked="true"] .ih-lvn{color:var(--ih-acc)}
.ih-lv .ih-lvk[aria-checked="true"] .ih-lvd{color:var(--ih-ink2)}
.ih-lv .ih-lvk[aria-checked="true"] .ih-lvi{background:radial-gradient(circle at 35% 30%,#efe6ff,#c9b3f2 60%,var(--ih-pa,#7348be));transform:scale(1.08);
  box-shadow:0 0 0 2px var(--lv-ring),0 0 14px var(--lv-glow),0 2px 0 var(--ih-pledge,#3a2070);animation:lvPip .4s cubic-bezier(.34,1.56,.64,1)}
.ih-lv .ih-lvk[aria-checked="true"]::after{content:"";position:absolute;top:-2px;right:-2px;bottom:-2px;left:-2px;border-radius:inherit;pointer-events:none;
  box-shadow:0 0 18px 2px var(--lv-glow);animation:lvBreathe 4.5s ease-in-out infinite;will-change:opacity}
@keyframes lvChosen{0%{transform:translateY(0) scale(.985)}55%{transform:translateY(-5px) scale(1.012)}100%{transform:translateY(-3px) scale(1)}}
@keyframes lvBreathe{0%,100%{opacity:.35}50%{opacity:1}}
@keyframes lvPip{from{transform:scale(.2)}to{transform:scale(1.08)}}

/* ---------- no motion when she asks for less ---------- */
body[data-motion="minimal"] #page-settings .st-tile,body[data-motion="minimal"] #page-settings .st-itile,body[data-motion="minimal"] #page-settings .st-tile > *,body[data-motion="minimal"] #page-settings .st-tb,
body[data-motion="minimal"] #page-settings #supRows > .sup-group,body[data-motion="minimal"] #page-settings #supRows > .sup-group > *,body[data-motion="minimal"] #page-settings .mr-how > *,
body[data-motion="minimal"] #page-settings .st-slide::before,body[data-motion="minimal"] #page-settings .st-plate,body[data-motion="minimal"] #page-settings .st-chev,body[data-motion="minimal"] #page-settings .st-disc,
body[data-motion="minimal"] .ih-lv .ih-lvk,body[data-motion="minimal"] .ih-lv .ih-lvk::after,body[data-motion="minimal"] .ih-lv .ih-lvi,
body[data-calm="1"] #page-settings .st-tile,body[data-calm="1"] #page-settings .st-itile,body[data-calm="1"] #page-settings .st-tile > *,body[data-calm="1"] #page-settings .st-tb,
body[data-calm="1"] #page-settings #supRows > .sup-group,body[data-calm="1"] #page-settings #supRows > .sup-group > *,body[data-calm="1"] #page-settings .mr-how > *,
body[data-calm="1"] #page-settings .st-slide::before,body[data-calm="1"] #page-settings .st-plate,body[data-calm="1"] #page-settings .st-chev,body[data-calm="1"] #page-settings .st-disc,
body[data-calm="1"] .ih-lv .ih-lvk,body[data-calm="1"] .ih-lv .ih-lvk::after,body[data-calm="1"] .ih-lv .ih-lvi{animation:none !important;transition:none !important}
body[data-motion="minimal"] #page-settings label.eswitch .etrack::before,body[data-motion="minimal"] #page-settings input[type="checkbox"]::before,body[data-motion="minimal"] #page-settings button.st-sw::before,
body[data-calm="1"] #page-settings label.eswitch .etrack::before,body[data-calm="1"] #page-settings input[type="checkbox"]::before,body[data-calm="1"] #page-settings button.st-sw::before{transition:none !important}
@media (prefers-reduced-motion:reduce){
  #page-settings .st-tile,#page-settings .st-itile,#page-settings .st-tile > *,#page-settings .st-tb,#page-settings #supRows > .sup-group,#page-settings #supRows > .sup-group > *,#page-settings .mr-how > *,
  #page-settings .st-slide::before,#page-settings .st-plate,#page-settings .st-chev,#page-settings .st-disc,.ih-lv .ih-lvk,.ih-lv .ih-lvk::after,.ih-lv .ih-lvi,
  #page-settings label.eswitch .etrack::before,#page-settings input[type="checkbox"]::before,#page-settings button.st-sw::before{animation:none !important;transition:none !important}}
</style>
<script>try{(window.__ingParts=window.__ingParts||{})["p313"]="started";}catch(_){}
/* R313 · Settings, raised: see the note at the top of its styles. window.IngSettingsRaised */
(function r313(){"use strict";
if(window.IngSettingsRaised)return;
var W=window,D=document;
function $(id){return D.getElementById(id);}
function mk(tag,cls,txt){var e=D.createElement(tag);if(cls)e.className=cls;if(txt!=null)e.textContent=txt;return e;}
function svg(d){return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">'+d+'</svg>';}
function words(e){return e?String(e.textContent||"").replace(/\s+/g," ").trim():"";}
function warn(e){try{console.warn("r313",e);}catch(_){}}
function pg(){return $("page-settings");}
var KEY="ing.settings.tiles.v1",PREF={},CUR={};
try{PREF=JSON.parse(W.localStorage.getItem(KEY)||"{}")||{};}catch(e){PREF={};}
function keep(){try{W.localStorage.setItem(KEY,JSON.stringify(PREF));}catch(e){}}
var IC={card:'<rect x="4" y="5" width="16" height="14" rx="2"/><path d="M8 10h8M8 14h5"/>',
  refresh:'<path d="M19.5 12a7.5 7.5 0 1 1-2.2-5.3"/><path d="M19.6 4.2v4.6H15"/>',
  gauge:'<path d="M4.5 16a7.5 7.5 0 0 1 15 0"/><path d="M12 16l3.6-4.2"/><circle cx="12" cy="16" r="1.3"/>',
  kinds:'<path d="M5 6.5h14M5 12h9M5 17.5h11"/>',
  limit:'<path d="M5 19.5h14"/><path d="M12 4.5v11"/><path d="M8 11.5l4 4 4-4"/>',
  copies:'<rect x="8" y="8" width="11" height="11" rx="2"/><path d="M5 15V6.5A1.5 1.5 0 0 1 6.5 5H15"/>',
  library:'<path d="M5 5h3.5v14H5zM10.5 5H14v14h-3.5z"/><path d="M15.8 6.2l3.3-.9 3.2 12.9-3.3.9z"/>',
  person:'<circle cx="12" cy="8.5" r="3.5"/><path d="M5 20c1.2-3.6 3.9-5.5 7-5.5s5.8 1.9 7 5.5"/>',
  answers:'<path d="M5 6.5h14v9H10l-4 3.5v-3.5H5z"/><path d="M8.5 10h7M8.5 12.8h4.5"/>',
  mine:'<path d="M5 18.5l1-4L15.5 5a2.1 2.1 0 0 1 3 3L9 17.5z"/><path d="M13.5 7l3 3"/>',
  rules:'<path d="M12 3.5l7 3v5c0 4.2-3 7.6-7 9-4-1.4-7-4.8-7-9v-5z"/><path d="M9 12l2.2 2.2L15.5 10"/>',
  switches:'<rect x="3.5" y="5" width="17" height="6" rx="3"/><circle cx="17.5" cy="8" r="1.6"/><rect x="3.5" y="13" width="17" height="6" rx="3"/><circle cx="6.5" cy="16" r="1.6"/>'};
var CHEV=svg('<path d="M6 9l6 6 6-6"/>');
function on(id){var e=$(id);return !!(e&&e.checked);}
function sel(id){var e=$(id);if(!e||!e.options||e.selectedIndex<0)return "";return words(e.options[e.selectedIndex]);}
function val(id){var e=$(id);return e&&typeof e.value==="string"?e.value.trim():"";}
function lead(c){var p=c.querySelector("p.small.muted, p");var t=words(p);if(!t)return "";t=t.split(/[.;:]\s/)[0]||t;return t.replace(/[.;:]$/,"");}
function low(s){return s?s.charAt(0).toLowerCase()+s.slice(1):s;}

/* the cards that become tiles, in the order they sit in their section, each with its state in one line */
var CARDS=[
  {m:/^look and feel/,o:1,st:function(c){var t="",m="";[].forEach.call(c.querySelectorAll(".st-pills"),function(g){var x=g.querySelector('[aria-checked="true"]'),l=(g.getAttribute("aria-label")||"").toLowerCase();
      if(!x)return;if(l==="theme")t=words(x);else if(l==="motion")m=words(x);});
    if(!t)t=sel("setTheme");if(!m)m=sel("setMotion");return [t,m?"motion "+low(m):""].filter(Boolean).join(" · ");}},
  {id:"ingSoundCard",o:2,st:function(c){var sw=$("setSndSw"),x=sw?sw.getAttribute("aria-checked")==="true":!!c.querySelector('#setSndOn .seg-btn.on[data-snd-on="1"]');
    var n=c.querySelector('.nat-seg [aria-checked="true"]');return "Ingenium's sounds "+(x?"on":"off")+(n?" · nature sounds: "+low(words(n)):"");}},
  {id:"ihSetCard",o:3,st:function(c){var k=c.querySelector('.ih-lvk[aria-checked="true"]');if(!k)return "Your level: not chosen yet";
    return (words(k.querySelector(".ih-lvi"))+" "+words(k.querySelector(".ih-lvn"))).trim();}},
  {id:"dmcCard",o:5,st:function(){try{return W.IngDiamondColours?IngDiamondColours.says():"";}catch(e){return "";}}},  /* 7.29 (r314) */
  {id:"ing-refresh-card",o:4,t:"#ing-refresh-h",mark:"refresh",st:function(){return "Refresh the app: it starts again in a few seconds, your work saved first";}},
  {m:/^connect a cloud/,o:1,st:function(){var k=$("cxKept"),n=k&&!k.hidden?k.querySelectorAll(".cxk-row").length:0;
    return n?(n===1?"One connection kept":n+" connections kept"):"Claude, OpenAI, Gemini and others, in three steps";}},
  {id:"cnCard",o:2,st:function(){var l=$("cnList");if(!l)return "";return l.querySelector(".cn-none")?"No connector yet":"";}},
  {id:"ingEyesCard",o:1,st:function(){return "Describing pictures "+(on("eyesOn")?"on":"off")+" · reading their words "+(on("eyesWords")?"on":"off");}},
  {id:"ingEarsCard",o:2,st:function(){return [sel("earsLang"),on("earsBrowser")?"your browser's speech service":""].filter(Boolean).join(" · ");}},
  {m:/^web search/,o:3,st:function(){return (val("srchKey")?"Brave Search and Wikipedia":"DuckDuckGo and Wikipedia")+" · scholarly sources first "+(on("srchScholar")?"on":"off");}},
  {id:"ragCard",o:4},
  {id:"linkCard",o:1,st:function(){return "Pair a device once with your computer's code";}},
  {id:"awakeCard",o:2,st:function(){return "Screen kept on while Ingenium works: "+(on("awakeOn")?"on":"off");}},
  {id:"ingLockCard",o:1,st:function(c){var s=c.querySelector(".ild-state");return s?"Sign-in "+low(words(s).replace(/\.$/,"")):"";}},
  {m:/^data on this device/,o:2}];
function headOf(c){var h=c.querySelector("h2");return words(h).toLowerCase();}
function defFor(c){var h=headOf(c);for(var i=0;i<CARDS.length;i++){var d=CARDS[i];if(d.id?c.id===d.id:(d.m&&d.m.test(h)))return d;}return null;}
function isCard(e){return !!(e&&e.nodeType===1&&!e.hasAttribute("data-rm-skip")&&(e.classList.contains("card")||e.id==="wsStudio"));}

/* a tile's head: a key the whole width of the tile (a div, so Find a setting lists the settings, not the heads) */
function headFor(name,mark){var h=mk("div","st-th");h.setAttribute("role","button");h.tabIndex=0;h.setAttribute("aria-expanded","false");h.setAttribute("data-rm-skip","");
  var d=mk("span","st-disc");d.setAttribute("aria-hidden","true");d.innerHTML=mark;
  var t=mk("span","st-tt");t.appendChild(mk("span","st-nm",name));t.appendChild(mk("span","st-say"));
  var c=mk("span","st-chip","Open it");c.setAttribute("aria-hidden","true");
  var v=mk("span","st-chev");v.setAttribute("aria-hidden","true");v.innerHTML=CHEV;
  h.appendChild(d);h.appendChild(t);h.appendChild(c);h.appendChild(v);return h;}

/* one tile open in a group; the others fold (rm-shut also lets Find a setting look inside a folded tile, modules/r173.js) */
function setOpen(G,key,mine){CUR[G.sk]=key;
  G.tiles.forEach(function(t){var o=!!key&&t.key===key;if(t.el.classList.contains("st-open")!==o)t.el.classList.toggle("st-open",o);if(t.el.classList.contains("rm-shut")===o)t.el.classList.toggle("rm-shut",!o);
    if(t.head.getAttribute("aria-expanded")!==(o?"true":"false"))t.head.setAttribute("aria-expanded",o?"true":"false");var ch=t.head.querySelector(".st-chip");if(ch&&ch.textContent!==(o?"Open":"Open it"))ch.textContent=o?"Open":"Open it";});
  if(mine){PREF[G.sk]=key||"";keep();}}
function applyG(G){var keys=G.tiles.map(function(t){return t.key;}),want=CUR[G.sk];
  if(want===undefined||(want&&keys.indexOf(want)<0)){want=PREF[G.sk];if(want===undefined||(want&&keys.indexOf(want)<0))want=keys[0];}
  setOpen(G,want,false);}

/* a section's cards as tiles, when it has two or more */
function keyOf(c){return c.id||("h:"+headOf(c));}
function tileCard(c,d,i){if(!c.__st){var te=d&&d.t?c.querySelector(d.t):c.querySelector(":scope > h2");if(!te)return false;
    var ic=te.querySelector(".st-ic svg"),h=headFor(words(te),svg(d&&d.mark?IC[d.mark]:ic?ic.innerHTML:IC.card));if(!ic&&!(d&&d.mark))h.__stPlain=1;
    h.__stF=function(){try{return d&&d.st?d.st(c):lead(c);}catch(e){return "";}};c.insertBefore(h,c.firstChild);c.__st={te:te,h:h};}
  else if(c.__st.h.__stPlain){var ic2=c.__st.te.querySelector(".st-ic svg");if(ic2){c.__st.h.querySelector(".st-disc").innerHTML=svg(ic2.innerHTML);c.__st.h.__stPlain=0;}}
  if(c.__st.h.parentNode!==c)c.insertBefore(c.__st.h,c.firstChild);
  c.__st.te.classList.add("st-hid");c.classList.add("st-tile");var o=String(d&&d.o?d.o:20+i);if(c.style.order!==o)c.style.order=o;return true;}
function untile(c){if(!c.__st)return;c.classList.remove("st-tile","st-open","rm-shut");c.__st.te.classList.remove("st-hid");if(c.style.order)c.style.order="";}
function paintPanel(pn){var room=pn.getAttribute("data-room")||pn.id,cur=pn.getAttribute("data-dx-cur")||"";
  var cards=[].filter.call(pn.children,function(c){return isCard(c)&&!c.classList.contains("dx-off")&&!c.hidden;}),tiles=[];
  if(cards.length>=2)cards.forEach(function(c,i){if(tileCard(c,defFor(c),i))tiles.push({el:c,key:keyOf(c),head:c.__st.h,o:+c.style.order||0});});
  cards.forEach(function(c){if(!tiles.some(function(t){return t.el===c;}))untile(c);});
  if(tiles.length<2){tiles.forEach(function(t){untile(t.el);});pn.classList.remove("st-tiled");return;}
  pn.classList.add("st-tiled");tiles.sort(function(a,b){return a.o-b.o;});
  var G={sk:"c:"+room+"/"+cur,tiles:tiles};tiles.forEach(function(t,i){t.el.style.setProperty("--st-i",String(i));t.el.__stK=t.key;t.el.__stG=G;});applyG(G);}

/* the groups of one long card, as tiles inside it (each group's parts are moved into its tile; every part keeps its id) */
function run(start){var out=[start],n=start.nextElementSibling;while(n&&!(n.tagName==="H3"&&n.classList.contains("stx-h"))){out.push(n);n=n.nextElementSibling;}return out;}
function inner(c,groups){if(c.__stIn)return c.__stIn;if(!groups)return null;
  for(var i=0;i<groups.length;i++)if(!groups[i].nodes||!groups[i].nodes.length||groups[i].nodes.some(function(n){return !n;}))return null;
  var first=null;[].forEach.call(c.querySelectorAll("*"),function(e){if(first)return;for(var j=0;j<groups.length;j++)if(groups[j].nodes.indexOf(e)>=0){first=e;return;}});
  if(!first)return null;var box=mk("div","st-in");first.parentNode.insertBefore(box,first);
  var G={sk:"i:"+c.id,tiles:[]};
  groups.forEach(function(g,i){var t=mk("div","st-itile");t.style.setProperty("--st-i",String(i));var h=headFor(g.n,svg(IC[g.mark]||IC.card));h.__stF=function(){try{return g.st()||"";}catch(e){return "";}};
    var b=mk("div","st-tb");g.nodes.forEach(function(n){if(n.tagName==="H3"&&n.classList.contains("stx-h"))n.classList.add("st-hid");b.appendChild(n);});
    t.appendChild(h);t.appendChild(b);box.appendChild(t);t.__stK=g.k;t.__stG=G;G.tiles.push({el:t,key:g.k,head:h});});
  c.__stIn=G;return G;}
function storageGroups(c){var hs=[].slice.call(c.querySelectorAll("h3.stx-h")),g=c.querySelector(".stx-gauge");
  function h3(t){for(var i=0;i<hs.length;i++)if(words(hs[i]).toLowerCase()===t)return hs[i];return null;}
  var hK=h3("what takes the room"),hL=h3("your limit"),hO=h3("old copies"),hA=h3("your app library");if(!g||!hK||!hL||!hO||!hA)return null;
  return [{k:"room",n:"Room used",mark:"gauge",nodes:run(g),st:function(){var u=words($("stxUsed")),of=words($("stxOf")).split(",")[0];return u&&u!=="…"?u+" "+of:"Measuring…";}},
    {k:"kinds",n:"What takes the room",mark:"kinds",nodes:run(hK),st:function(){var m=words($("stxMeasured"));return m?m.split(":").slice(0,2).join(":").replace(/:\s*\d+(\.\d+)?\s*[KMGT]?B.*$/,""):"Each store measured when you open this";}},
    {k:"limit",n:"Your limit",mark:"limit",nodes:run(hL),st:function(){var v=val("stxLimit");return v?"At most "+v+" "+sel("stxUnit"):"None of your own";}},
    {k:"old",n:"Old copies",mark:"copies",nodes:run(hO),st:function(){var k=val("stxKeep");return (on("stxAuto")?"Frees room on its own":"Never frees room on its own")+(k?" · keeps "+k+(k==="1"?" version":" versions")+" of each app":"");}},
    {k:"lib",n:"Your app library",mark:"library",nodes:run(hA),st:function(){var a=$("stxApps");if(!a)return "";if(a.querySelector(".stx-none"))return "No apps in the library yet";
      var n=a.querySelectorAll("h4").length;return n===1?"One app":n+" apps";}}];}
function personaGroups(c){var nm=$("psName"),ab=$("psAbout"),cu=$("psCustom"),grid=c.querySelector(".ps-grid"),sws=c.querySelector(".ps-switches"),rules=$("psRulesBox"),prev=c.querySelector(".ps-prev");
  var ln=nm&&nm.closest("label"),la=ab&&ab.closest("label"),lc=cu&&cu.closest("label");
  if(!ln||!la||!lc||!grid||!sws||!rules)return null;
  if([ln,la,lc,grid,sws,rules].some(function(e){return e.parentNode!==c;}))return null;
  /* Ingenium's own instructions, its switch beside its ten rules */
  var core=$("psCore"),lcore=core&&core.closest("label.ps-sw"),cw=null;
  if(lcore&&lcore.parentNode===sws){cw=mk("div","ps-switches st-core");cw.appendChild(lcore);}
  var rn=[rules];if(cw)rn.push(cw);if(prev&&prev.parentNode===c)rn.push(prev);
  return [{k:"who",n:"Who you are",mark:"person",nodes:[ln,la],st:function(){var n=val("psName");return (n?"Ingenium calls you "+n:"No name given yet")+(val("psAbout")?" · about you written":"");}},
    {k:"answers",n:"How you want answers",mark:"answers",nodes:[grid],st:function(){return [sel("psLength"),low(sel("psTone"))].filter(Boolean).join(" · ");}},
    {k:"mine",n:"Your own instructions",mark:"mine",nodes:[lc,sws],st:function(){return (on("psOn")?"In use":"Not in use")+(val("psCustom")?"":" · none written yet");}},
    {k:"rules",n:"Ingenium's own instructions",mark:"rules",nodes:rn,st:function(){var s=words(rules.querySelector("summary")).split("·")[1];
      return (core?(on("psCore")?"On":"Off")+" · ":"")+(s?s.trim():"its ten rules");}}];}

/* Memory: How it works folds (its room is drawn again by modules/r271.js as memories change, so only its card keeps the state) */
function howFold(){var c=$("memRoomCard");if(!c)return;var how=c.querySelector(".mr-how"),b=how&&how.querySelector(":scope > b");if(!b)return;
  var shut=PREF["mem:how"]!=="open";if(!b.classList.contains("st-howk")){b.classList.add("st-howk");b.setAttribute("role","button");b.tabIndex=0;b.setAttribute("data-rm-skip","");}
  if(how.classList.contains("rm-shut")!==shut)how.classList.toggle("rm-shut",shut);if(b.getAttribute("aria-expanded")!==(shut?"false":"true"))b.setAttribute("aria-expanded",shut?"false":"true");memFold();}

function memState(){var c=$("memRoomCard"),o={};if(!c)return "";[].forEach.call(c.querySelectorAll(".mr-sw"),function(w){var t=words(w.querySelector("b")).toLowerCase(),g=w.querySelector('[role="switch"]'),v=!!g&&g.getAttribute("aria-checked")==="true";
    if(/^use memory in my chats/.test(t))o.on=v;else if(/^learn from/.test(t))o.learn=v;else if(/^ask me/.test(t))o.ask=v;else if(/connected service/.test(t))o.cloud=v;});
  var out=[];if(o.on!==undefined)out.push(o.on?"On in your chats":"Off in your chats");if(o.learn!==undefined)out.push(o.learn?"learns from them":"does not learn");
  if(o.ask!==undefined)out.push(o.ask?"asks before keeping":"keeps at once");if(o.cloud!==undefined)out.push(o.cloud?"goes to a connected service":"stays on your devices");return out.join(" · ");}
function memFold(){var c=$("memRoomCard"),L=c&&c.querySelector(".mr-left");if(!L)return;var sws=[].filter.call(L.children,function(e){return e.classList.contains("mr-sw");});if(!sws.length)return;
  var h=L.querySelector(":scope > .st-memk");if(!h){h=headFor("Memory's switches",svg(IC.switches));h.classList.add("st-memk");h.__stF=memState;}
  if(h.parentNode!==L||h.nextElementSibling!==sws[0])L.insertBefore(h,sws[0]);
  var shut=PREF["mem:sw"]!=="open";if(L.classList.contains("rm-shut")!==shut)L.classList.toggle("rm-shut",shut);if(c.classList.contains("st-swshut")!==shut)c.classList.toggle("st-swshut",shut);
  if(h.getAttribute("aria-expanded")!==(shut?"false":"true"))h.setAttribute("aria-expanded",shut?"false":"true");var ch=h.querySelector(".st-chip");if(ch&&ch.textContent!==(shut?"Open it":"Open"))ch.textContent=shut?"Open it":"Open";
  var sy=h.querySelector(".st-say"),st=memState();if(sy&&sy.textContent!==st)sy.textContent=st;}
function memToggle(){PREF["mem:sw"]=PREF["mem:sw"]==="open"?"shut":"open";keep();memFold();}

/* each setting's row with a switch: a plate */
function plates(){var p=pg();if(!p)return;[].forEach.call(p.querySelectorAll("label.eswitch, label.fx-sw, label.ps-sw, input.bk-sw, button.st-sw"),function(sw){
  var r=sw.closest(".ey-row,.sch-set,.bk-opt,.ears-row,.snd-row,label.fx-sw,label.ps-sw");if(r&&p.contains(r)&&!r.closest("#memRoomCard")&&!r.classList.contains("st-plate"))r.classList.add("st-plate");});}

/* strips: a raised key that slides under the choice */
function chosenOf(s){return s.querySelector(':scope > [aria-checked="true"], :scope > [aria-pressed="true"], :scope > .on, :scope > .active');}
function setv(s,k,v){if(s.style.getPropertyValue(k)!==v)s.style.setProperty(k,v);}
function place(s){if(s.__stReplay)return;var b=chosenOf(s);
  if(!b||!s.offsetWidth||!b.offsetWidth){if(s.classList.contains("st-ready"))s.classList.remove("st-ready");return;}
  var first=!s.classList.contains("st-ready");if(first){s.classList.add("st-now");s.classList.add("st-ready");}
  var r="999px";try{r=getComputedStyle(b).borderTopLeftRadius||r;}catch(e){}
  var was=vars(s),nx=b.offsetLeft+"px",ny=b.offsetTop+"px";if(!first&&(was.x!==nx||was.y!==ny)){s.__stFrom=was;s.__stAt=Date.now();}
  setv(s,"--st-x",b.offsetLeft+"px");setv(s,"--st-y",b.offsetTop+"px");setv(s,"--st-w",b.offsetWidth+"px");setv(s,"--st-h",b.offsetHeight+"px");setv(s,"--st-r",r);
  if(first){void s.offsetWidth;requestAnimationFrame(function(){s.classList.remove("st-now");});}}
function vars(s){var o={};["x","y","w","h","r"].forEach(function(k){o[k]=s.style.getPropertyValue("--st-"+k);});return o;}
function setAll(s,o){["x","y","w","h","r"].forEach(function(k){setv(s,"--st-"+k,o[k]);});}
/* while the app applies a new theme or motion it stops every transition for a moment (the class ing-swap on the page, set a frame
   after the choice): a key that had just begun to slide goes back where it was and slides again once that moment is over */
function replay(){var p=pg();if(!p)return;var now=Date.now();[].forEach.call(p.querySelectorAll(".st-slide.st-ready"),function(s){if(!s.__stFrom||now-s.__stAt>400)return;
  var f=s.__stFrom,to=vars(s);s.__stFrom=null;s.__stReplay=true;s.classList.add("st-now");setAll(s,f);void s.offsetWidth;
  requestAnimationFrame(function(){s.classList.remove("st-now");void s.offsetWidth;setAll(s,to);s.__stReplay=false;});});}
var SWAP=false;try{new MutationObserver(function(){var on=D.documentElement.classList.contains("ing-swap");if(SWAP&&!on)replay();SWAP=on;}).observe(D.documentElement,{attributes:true,attributeFilter:["class"]});}catch(e){}
function strips(){var p=pg();if(!p)return;[].forEach.call(p.querySelectorAll(".st-pills, .seg"),function(s){if(s.classList.contains("bk-seg")||s.closest("#memRoomCard")||s.closest(".nat-groups"))return;   /* 7.71: the nature sounds in their groups keep raised keys (r295, r363) */
  if(!s.__st313){s.__st313=1;s.classList.add("st-slide");
    try{new MutationObserver(function(){place(s);}).observe(s,{attributes:true,subtree:true,attributeFilter:["class","aria-checked","aria-pressed"]});}catch(e){}}
  place(s);});}

/* every head's state line */
function states(){var p=pg();if(!p)return;[].forEach.call(p.querySelectorAll(".st-th"),function(h){if(typeof h.__stF!=="function")return;var s="";try{s=h.__stF()||"";}catch(e){}
  var el=h.querySelector(".st-say");if(el&&el.textContent!==s)el.textContent=s;});}

var BUSY=false;
function paint(){var p=pg();if(!p||BUSY)return;BUSY=true;
  try{[].forEach.call(p.querySelectorAll(".rm-panel"),function(pn){try{paintPanel(pn);}catch(e){warn(e);}});
    var sc=$("stxCard");if(sc&&!sc.__stIn){var G=inner(sc,storageGroups(sc));if(G){var cols=sc.querySelector(".dx-cols");if(cols&&!cols.querySelector("*:not(.dx-col)")&&!words(cols))cols.hidden=true;}}
    if(sc&&sc.__stIn)applyG(sc.__stIn);
    var pc=$("personaCard");if(pc&&!pc.__stIn)inner(pc,personaGroups(pc));if(pc&&pc.__stIn)applyG(pc.__stIn);
    howFold();plates();strips();states();}
  catch(e){warn(e);}
  BUSY=false;}
var PT=0;function soon(ms){if(PT)return;PT=setTimeout(function(){PT=0;paint();},ms||0);}
var STT=0;function stateSoon(){clearTimeout(STT);STT=setTimeout(function(){try{states();var p=pg();if(p)[].forEach.call(p.querySelectorAll(".st-slide"),place);howFold();}catch(e){warn(e);}},160);}

/* pressing a head, or anywhere on a folded tile */
function toggle(t){var G=t.__stG;if(!G)return;var opening=!t.classList.contains("st-open");setOpen(G,opening?t.__stK:"",true);
  if(opening){var p=pg();if(p)[].forEach.call(t.querySelectorAll(".st-slide"),place);states();
    try{var r=t.getBoundingClientRect(),calm=D.body.getAttribute("data-motion")==="minimal"||D.body.getAttribute("data-calm")==="1"||(W.matchMedia&&W.matchMedia("(prefers-reduced-motion: reduce)").matches);
      if(r.top<70||r.top>W.innerHeight-90)t.scrollIntoView({block:"start",behavior:calm?"auto":"smooth"});}catch(e){}}}
function howToggle(){var open=PREF["mem:how"]!=="open";PREF["mem:how"]=open?"open":"shut";keep();howFold();}
function wire(){var p=pg();if(!p||p.__st313)return;p.__st313=1;
  p.addEventListener("click",function(e){if(p.classList.contains("rm-all"))return;var x=e.target;if(!x||!x.closest)return;
    var hw=x.closest("#memRoomCard .mr-how > b.st-howk")||x.closest("#memRoomCard .mr-how.rm-shut");if(hw){howToggle();return;}
    var mk2=x.closest("#memRoomCard .st-memk");if(mk2){memToggle();return;}
    var th=x.closest(".st-th");if(th&&p.contains(th)){toggle(th.parentNode);return;}
    var t=x.closest(".st-tile.rm-shut, .st-itile.rm-shut");if(t&&p.contains(t)){toggle(t);return;}
    stateSoon();});
  p.addEventListener("keydown",function(e){if(e.key!=="Enter"&&e.key!==" "&&e.key!=="Spacebar")return;var x=e.target;if(!x||!x.classList)return;
    if(x.classList.contains("st-memk")){e.preventDefault();memToggle();}else if(x.classList.contains("st-th")){e.preventDefault();toggle(x.parentNode);}else if(x.classList.contains("st-howk")){e.preventDefault();howToggle();}});
  p.addEventListener("change",stateSoon);p.addEventListener("input",stateSoon);
  try{new MutationObserver(function(){soon(0);}).observe(p,{attributes:true,attributeFilter:["class","hidden"]});}catch(e){}}
function watch(){var p=pg();if(!p)return;[].forEach.call(p.querySelectorAll(".rm-panel"),function(pn){if(pn.__st313)return;pn.__st313=1;
    try{new MutationObserver(function(){soon(0);}).observe(pn,{childList:true,attributes:true,attributeFilter:["data-dx-cur","hidden"]});}catch(e){}});
  var m=$("memRoomCard");if(m&&!m.__st313){m.__st313=1;try{new MutationObserver(function(){howFold();}).observe(m,{childList:true,subtree:true});}catch(e){}}}

/* Find a setting, the tour and Help open the tile that holds what they show; so does any focus or scroll to a part of Settings, which
   modules/r173.js sends here (Storage's Change my limit, for one) */
function reveal(el){if(!el||!el.closest)return;paint();var t=el.closest(".st-tile.rm-shut, .st-itile.rm-shut"),n=0;
  while(t&&n++<4){if(t.__stG)setOpen(t.__stG,t.__stK,false);t=t.parentNode&&t.parentNode.closest?t.parentNode.closest(".st-tile.rm-shut, .st-itile.rm-shut"):null;}
  if(el.closest("#memRoomCard .mr-left.rm-shut > .mr-sw")){var mc=$("memRoomCard"),ml=mc&&mc.querySelector(".mr-left");if(mc)mc.classList.remove("st-swshut");if(ml)ml.classList.remove("rm-shut");}
  var how=el.closest("#memRoomCard .mr-how.rm-shut");if(how){how.classList.remove("rm-shut");var b=how.querySelector(":scope > b");if(b)b.setAttribute("aria-expanded","true");}
  var p=pg();if(p)[].forEach.call(p.querySelectorAll(".st-slide"),place);}
W.__rmRevealHook=(function(prev){return function(el){if(typeof prev==="function")try{prev(el);}catch(e){}try{reveal(el);}catch(e){warn(e);}};})(W.__rmRevealHook);

var RT=0;W.addEventListener("resize",function(){if(RT)return;RT=requestAnimationFrame(function(){RT=0;var p=pg();if(p)[].forEach.call(p.querySelectorAll(".st-slide.st-ready"),place);});});
function boot(){try{wire();watch();paint();}catch(e){warn(e);}}
(function wrapGo(){var og=W.go;if(typeof og!=="function"||og.__r313)return;var ng=function(p){var r=og.apply(this,arguments);try{if(p==="settings"){soon(0);setTimeout(paint,320);}}catch(e){}return r;};
  try{Object.keys(og).forEach(function(k){ng[k]=og[k];});}catch(e){}ng.__r313=true;W.go=go=ng;})();
if(D.readyState==="loading")D.addEventListener("DOMContentLoaded",boot);else boot();
(function later(){var n=0;(function wait(){boot();if(W.__ingReady===true){setTimeout(boot,700);setTimeout(boot,2500);return;}if(++n<400)setTimeout(wait,500);})();})();
W.IngSettingsRaised={paint:paint,reveal:reveal,open:function(el){var t=el&&el.closest?el.closest(".st-tile, .st-itile"):null;if(t&&t.__stG)setOpen(t.__stG,t.__stK,true);},
  groups:function(){var p=pg(),out=[];if(!p)return out;[].forEach.call(p.querySelectorAll(".st-tile.st-open, .st-itile.st-open"),function(t){out.push(t.__stK);});return out;}};
})();
;try{window.__ingParts["p313"]="running";}catch(_){}
</script>
