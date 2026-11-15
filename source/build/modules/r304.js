<style id="r304-css">
/* ============ R304 · THE TURRET, A TOY, AND THE MODELS PAGE WITHOUT ENDLESS SCROLLING (Ingenium 7.16, 15 November 2026) ============
   Her words (15 November 2026), on the turret: "I don't want the cartridges to do anything when I click on them ... I only want it to be
   animated but work like a digital fidget toy for stress relief ... The loading of the models and everything else should happen elsewhere so
   that I don't accidentally keep on loading up a model by clicking on the cartridges"; then, over fifteen versions of the live preview, its
   finish (her picture's Lavender sunburst), her star cut in a flat centre, the raised holders without a blurred or doubled line, the
   coloured balls that roll round their cartridges, the empty cartridges flat with their circles engraved, and Ingenium's own key sounds.
   And, sending version 15 as "the approved turret redesign": "remove the white outline that is around the big circle of the turret's
   surface, it is detracting from the overall look of the 3D design especially on Night mode", then "Please make the edits that I requested
   and commit and push the approved design." So this is version 15 without the pale ring that circled the plate's face (one crisp dark line
   is its edge now, by day and by night), built into the page with the compact Models page the same preview carried.
   - IngTurretToy (below, as the preview has it): the turret loads nothing and reads nothing from the engine; every part of it answers a
     press (a lens sinks and turns to the top, the plate steps a port, the band wobbles as a settling coin, the rim sinks and springs back,
     the index nods, the centre whirls the plate round); it can be turned by hand and flicked; it sways, and leans to the pointer.
   - In the page: it stands in r269's head in place of the turret's own drawing; r269 keeps the words, the card of what is in the engine,
     the rooms and the loading, and with the toy in place draws the rooms' cartridges as the toy's lenses are drawn and loads a model only
     from the Load key beside it in Your models.
   - The compact layer (the preview's, on the page's own markup): a room opened folds the head to a band; Ingenium's models in one row of
     four houses with one shelf of a house's models below; More models in divider tabs; Downloads in a drawer; a model's description or
     parts in a raised sheet in the window. Each part is put back after the page draws its lists again.
   - 7.16, her words the same evening: "Ingenium is possibly overheating my phone ... I want my 3D graphics and animations to be preserved":
     the toy draws only while it is on screen, and its slow sway at thirty frames a second; on a touch screen a finger moving up or down
     scrolls the page past it. */
/* 1. a room opened: the turret's head folds to a band (pressing the band unfolds it) */
#page-models.mc-on .tr-head{transition:min-height .55s cubic-bezier(.22,1,.36,1),padding .55s cubic-bezier(.22,1,.36,1)}
#page-models.mc-on.mc-fold .tr-head{grid-template-columns:minmax(0,1fr) auto !important;min-height:0 !important;height:auto !important;padding-top:20px !important;padding-bottom:20px !important;cursor:pointer;overflow:visible}
#page-models.mc-on.mc-fold .tr-head .lede,#page-models.mc-on.mc-fold .tr-head .tr-how,#page-models.mc-on.mc-fold .tr-head .tr-says{display:none}
#page-models.mc-on.mc-fold .tr-head .tr-words{display:grid;grid-template-columns:max-content minmax(250px,1fr);grid-template-areas:"eye eye" "title now" "keys now";column-gap:28px;row-gap:10px;align-items:center;max-width:none;width:auto;flex:1 1 auto}
#page-models.mc-on.mc-fold .tr-head .tr-eyebrow{grid-area:eye;margin:0}
#page-models.mc-on.mc-fold .tr-head .page-title{grid-area:title;margin:0;font-size:46px;line-height:1}
#page-models.mc-on.mc-fold .tr-head .tr-keys{grid-area:keys;margin:0}
#page-models.mc-on.mc-fold .tr-head .tr-now{grid-area:now;margin:0;max-width:420px;min-width:250px;padding:12px 16px;align-self:center}
#page-models.mc-on.mc-fold .tr-head .tr-now .tr-name{white-space:nowrap}
#page-models.mc-on.mc-fold .tr-head .tr-scene{width:170px !important;height:170px !important;flex:0 0 170px;margin:-6px 10px -6px 24px;align-self:center}
#page-models.mc-on.mc-fold .tr-head .tr-fit{-webkit-transform:scale(.37);transform:scale(.37);-webkit-transform-origin:0 0;transform-origin:0 0}
#page-models.mc-on .tr-head .tr-scene,#page-models.mc-on .tr-head .tr-fit{transition:transform .6s cubic-bezier(.22,1,.36,1),width .6s cubic-bezier(.22,1,.36,1),height .6s cubic-bezier(.22,1,.36,1),margin .6s cubic-bezier(.22,1,.36,1)}
#page-models .mc-unfold{display:none}
#page-models.mc-on.mc-fold .mc-unfold{display:block;text-align:center;margin:-2px 0 10px;font-size:11.5px;font-weight:500;letter-spacing:.02em;color:var(--ink-3,#6c6579)}

/* 2. Your models: Health across, Your models and Add a model side by side */
#page-models.mc-on .rm-panel[data-room="yours"]:not([hidden]){display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);column-gap:18px;align-items:start}
#page-models.mc-on .rm-panel[data-room="yours"]>.rm-roomh,#page-models.mc-on .rm-panel[data-room="yours"]>.health-card{grid-column:1/-1}

/* 3. Ingenium's models: the four houses in one row; the house's models on one shelf below them */
#page-models.mc-on .rm-panel[data-room="get"] .lineup-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:14px;align-items:stretch}
#page-models.mc-on .rm-panel[data-room="get"] .lu-tile{min-width:0;display:flex;flex-direction:column;padding:14px 14px 14px 16px !important;min-height:0 !important}
#page-models.mc-on .rm-panel[data-room="get"] .lu-tile .tm-stage{width:104px !important;height:104px !important;left:10px !important;top:10px !important;-webkit-transform:scale(.6);transform:scale(.6);-webkit-transform-origin:0 0;transform-origin:0 0}
#page-models.mc-on .rm-panel[data-room="get"] .lu-tile .lu-head{margin-left:66px;min-height:56px;display:flex;flex-wrap:wrap;align-items:center;align-content:center}
#page-models.mc-on .rm-panel[data-room="get"] .lu-tile .lu-state{flex-basis:100%;white-space:nowrap}
#page-models.mc-on .rm-panel[data-room="get"] .lu-tile .lu-q .seg{flex-wrap:wrap}
#page-models.mc-on .rm-panel[data-room="get"] .lu-tile .lu-why,#page-models.mc-on .rm-panel[data-room="get"] .lu-tile .lu-q-note,#page-models.mc-on .rm-panel[data-room="get"] .lu-tile .lu-coders{display:none}
#page-models.mc-on .rm-panel[data-room="get"] .lu-tile .lu-line{display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;overflow:hidden}
#page-models.mc-on .rm-panel[data-room="get"] .lu-tile .lu-row{margin-top:auto}
#page-models.mc-on .rm-panel[data-room="get"] .card>p.small.muted,#page-models.mc-on .rm-panel[data-room="get"] .card>p.lu-large{display:none}
#page-models.mc-on .rm-panel[data-room="get"]>.card:not(:first-of-type){display:none}
#page-models .mc-shelfkey,#page-models .mc-aboutkey,#page-models .mc-shelf,#page-models .mc-dividers,#page-models .mc-flip,#page-models .mc-sheet{display:none}
#page-models.mc-on .mc-shelfkey{display:flex;align-items:center;justify-content:space-between;width:100%;margin:12px 0 0;padding:9px 12px;font:inherit;font-size:12.5px;font-weight:600;color:var(--accent,#6a3fb5);text-align:left;cursor:pointer;
  border:0;border-radius:11px;background:linear-gradient(180deg,var(--fd-cover0,#f8f3fe),var(--fd-cover1,#ece2f8));
  box-shadow:inset 0 1px 0 rgba(255,255,255,.8),inset 0 0 0 1px rgba(106,63,181,.18),0 1px 2px rgba(40,22,68,.10),0 6px 12px -6px rgba(40,22,68,.22);
  -webkit-transform:translateY(0);transform:translateY(0);transition:transform .18s cubic-bezier(.2,.8,.2,1),box-shadow .18s}
#page-models.mc-on .mc-shelfkey:hover{-webkit-transform:translateY(-1.5px);transform:translateY(-1.5px);box-shadow:inset 0 1px 0 rgba(255,255,255,.8),inset 0 0 0 1px rgba(106,63,181,.24),0 2px 4px rgba(40,22,68,.12),0 10px 18px -8px rgba(40,22,68,.30)}
#page-models.mc-on .mc-shelfkey:active{-webkit-transform:translateY(1.5px);transform:translateY(1.5px);transition-duration:.08s}
#page-models.mc-on .mc-shelfkey[aria-expanded="true"]{background:var(--fd-paper,#fbf8ff);box-shadow:inset 0 2px 0 var(--accent,#6a3fb5),inset 0 0 0 1px rgba(106,63,181,.26),0 1px 2px rgba(40,22,68,.10)}
#page-models.mc-on .mc-shelfkey i{font-style:normal;font-weight:500;opacity:.72;white-space:nowrap}
#page-models.mc-on .mc-aboutkey{display:inline-flex;margin:2px 0 14px}
#page-models.mc-on .mc-shelf.mc-open{display:block;position:relative;margin:16px 0 4px;padding:16px 16px 14px;border-radius:16px;background:var(--fd-paper,#fbf8ff);
  box-shadow:inset 0 1px 0 rgba(255,255,255,.9),inset 0 0 0 1px rgba(106,63,181,.16),0 2px 4px rgba(40,22,68,.08),0 18px 34px -16px rgba(40,22,68,.34);
  -webkit-animation:mcShelf .5s cubic-bezier(.22,1,.36,1);animation:mcShelf .5s cubic-bezier(.22,1,.36,1)}
@-webkit-keyframes mcShelf{from{opacity:0;-webkit-transform:translateY(-8px)}to{opacity:1;-webkit-transform:none}}
@keyframes mcShelf{from{opacity:0;transform:translateY(-8px)}to{opacity:1;transform:none}}
#page-models.mc-on .mc-shelf-h{display:flex;align-items:baseline;margin:0 0 12px}
#page-models.mc-on .mc-shelf-h b{font-family:"Home Cormorant","Cormorant Garamond",Georgia,serif;font-size:22px;font-weight:600;color:var(--ink,#1f1a2b)}
#page-models.mc-on .mc-shelf-h span{font-size:12.5px;color:var(--ink-3,#6c6579)}
#page-models.mc-on .mc-shelf-h .btn{margin-left:auto}

/* 4. drawers: about two or three rows of tiles showing, the rest flipped through with the wheel inside them, the scroll bar hidden */
#page-models.mc-on .mc-drawer{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px;max-height:372px;overflow-y:auto;overscroll-behavior:contain;scrollbar-width:none;padding:4px 4px 8px;margin:0 -4px;align-content:start}
#page-models.mc-on .mc-drawer::-webkit-scrollbar{display:none}
#page-models.mc-on .mc-drawer.mc-tall{max-height:460px}
#page-models.mc-on .mc-wrap{position:relative}
#page-models.mc-on .mc-wrap.mc-more{margin-bottom:24px}
#page-models.mc-on .mc-wrap.mc-more .mc-flip{display:block;position:absolute;left:0;right:0;bottom:-22px;text-align:center;font-size:11px;font-weight:600;letter-spacing:.06em;text-transform:uppercase;color:var(--accent,#6a3fb5);opacity:.85;pointer-events:none}
#page-models.mc-on .mc-wrap.mc-more::after{content:"";position:absolute;left:0;right:0;bottom:0;height:34px;pointer-events:none;border-radius:0 0 14px 14px;background:linear-gradient(180deg,rgba(255,255,255,0),var(--card,#fff))}
#page-models.mc-on .mc-wrap.mc-more.mc-end::after{opacity:0}
/* a tile: every model row raised as a small card */
#page-models.mc-on .mc-drawer>.lu-cd,#page-models.mc-on .mc-drawer>.cat-row,#page-models.mc-on .mc-drawer>.kf-row{margin:0 !important;min-width:0;display:flex !important;flex-direction:column;padding:12px 13px !important;border-radius:13px;background:var(--card,#fff);
  box-shadow:inset 0 1px 0 rgba(255,255,255,.9),inset 0 0 0 1px rgba(106,63,181,.13),0 1px 2px rgba(40,22,68,.08),0 8px 16px -10px rgba(40,22,68,.28);transition:transform .18s cubic-bezier(.2,.8,.2,1),box-shadow .18s}
#page-models.mc-on .mc-drawer>.lu-cd:hover,#page-models.mc-on .mc-drawer>.cat-row:hover,#page-models.mc-on .mc-drawer>.kf-row:hover{-webkit-transform:translateY(-1.5px);transform:translateY(-1.5px);box-shadow:inset 0 1px 0 rgba(255,255,255,.9),inset 0 0 0 1px rgba(106,63,181,.2),0 2px 4px rgba(40,22,68,.10),0 12px 22px -10px rgba(40,22,68,.32)}
#page-models.mc-on .mc-drawer .lu-cd-why,#page-models.mc-on .mc-drawer .lu-cd-more,#page-models.mc-on .mc-drawer .kf-parts{display:none !important}
#page-models.mc-on .mc-drawer .lu-cd-acts,#page-models.mc-on .mc-drawer .kf-acts{display:flex;flex-wrap:wrap;margin-top:auto}
#page-models.mc-on .mc-drawer>.cat-row{cursor:default}
#page-models.mc-on .mc-drawer>.cat-row .cat-t,#page-models.mc-on .mc-drawer>.cat-row .cat-c{width:auto !important;max-width:none !important;flex:none !important}
#page-models.mc-on .mc-drawer>.cat-row .cat-t .small:not(.muted){display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;overflow:hidden;cursor:pointer}
#page-models.mc-on .mc-drawer>.cat-row .cat-c{display:flex;flex-wrap:wrap;align-items:center;margin-top:auto}
#page-models.mc-on .mc-drawer>.lu-cd .lu-cd-name,#page-models.mc-on .mc-drawer>.kf-row .kf-name{cursor:pointer}
#page-models.mc-on .mc-drawer>.kf-row>div:first-child{min-width:0}
#page-models.mc-on .mc-drawer>li.mc-showall{display:flex;align-items:center;justify-content:center;grid-column:1/-1;list-style:none}
#page-models.mc-on .rm-panel[data-room="kept"] .kf-list{list-style:none;padding-left:0}


/* tiles read from the left */
#page-models.mc-on .mc-drawer>.lu-cd,#page-models.mc-on .mc-drawer>.cat-row,#page-models.mc-on .mc-drawer>.kf-row{text-align:left !important;align-items:stretch}
#page-models.mc-on .mc-drawer>.lu-cd>*,#page-models.mc-on .mc-drawer>.kf-row>*{margin-left:0 !important;padding-left:0 !important}
#page-models.mc-on .mc-drawer>.lu-cd::before,#page-models.mc-on .mc-drawer>.lu-cd::after{display:none !important}
#page-models.mc-on .mc-drawer .lu-cd-acts,#page-models.mc-on .mc-drawer .kf-acts{justify-content:flex-start}
#page-models.mc-on .mc-drawer>.cat-row .cat-c{display:flex !important;flex-direction:row !important;justify-content:flex-start !important;align-items:center !important;text-align:left !important}
#page-models.mc-on .mc-drawer>.cat-row .cat-c>*{justify-self:start;text-align:left !important}
#page-models.mc-on .mc-drawer>.cat-row .cat-t>.small.muted{display:block;margin-top:2px}
#page-models.mc-on .mc-drawer>.cat-row .cat-t>b{margin-right:4px}
#page-models.mc-on .mc-drawer>.cat-row .cat-c>*{margin:0 10px 6px 0 !important}

/* 5. divider tabs, one paper at a time (as Folders') */
#page-models.mc-on .mc-dividers{display:flex;flex-wrap:wrap;align-items:flex-end;margin:4px -4px 14px;padding:8px 4px 0;border-bottom:1.5px solid rgba(106,63,181,.28)}
#page-models.mc-on .mc-div{-webkit-appearance:none;appearance:none;border:0;cursor:pointer;font-family:inherit;font-size:13px;font-weight:600;line-height:1.2;color:var(--ink-2,#4a4358);margin:0 6px 0 0;padding:10px 15px 9px;border-radius:11px 11px 0 0;position:relative;
  background:linear-gradient(180deg,#f6f0fd,#e6daf6);box-shadow:inset 0 1px 0 rgba(255,255,255,.75),inset 0 0 0 1px rgba(106,63,181,.18),0 -1px 2px rgba(40,22,68,.10),0 -7px 14px -8px rgba(40,22,68,.22);
  -webkit-transform:translateY(4px);transform:translateY(4px);transition:transform .18s cubic-bezier(.2,.8,.2,1),box-shadow .18s,color .18s}
#page-models.mc-on .mc-div small{font-weight:500;opacity:.68;margin-left:5px}
#page-models.mc-on .mc-div:hover,#page-models.mc-on .mc-div:focus-visible{-webkit-transform:translateY(0);transform:translateY(0)}
#page-models.mc-on .mc-div:active{-webkit-transform:translateY(5px);transform:translateY(5px);transition-duration:.08s}
#page-models.mc-on .mc-div[aria-selected="true"]{-webkit-transform:translateY(1.5px);transform:translateY(1.5px);color:var(--accent,#6a3fb5);background:#fbf8ff;z-index:2;
  box-shadow:inset 0 2px 0 var(--accent,#6a3fb5),inset 0 0 0 1px rgba(106,63,181,.22),0 -2px 5px rgba(40,22,68,.12),0 -12px 20px -8px rgba(40,22,68,.24)}
#page-models.mc-on .cat-list>.cat-group{display:none}
#page-models.mc-on .mc-drawer [data-mc-g].mc-gone{display:none !important}

/* 6. a raised sheet in the window: a model's whole description, a model's parts (no film over the page) */
#page-models.mc-on .mc-sheet.mc-open{display:block;position:fixed;z-index:60;width:min(560px,calc(100vw - 32px));max-height:min(70vh,560px);overflow:auto;padding:20px 22px 18px;border-radius:18px;background:var(--card,#fff);
  box-shadow:inset 0 1px 0 rgba(255,255,255,.9),inset 0 0 0 1px rgba(106,63,181,.18),0 4px 10px rgba(40,22,68,.12),0 30px 60px -20px rgba(40,22,68,.45);
  -webkit-animation:mcSheet .42s cubic-bezier(.22,1,.36,1);animation:mcSheet .42s cubic-bezier(.22,1,.36,1)}
@-webkit-keyframes mcSheet{from{opacity:0;-webkit-transform:translateY(12px) scale(.98)}to{opacity:1;-webkit-transform:none}}
@keyframes mcSheet{from{opacity:0;transform:translateY(12px) scale(.98)}to{opacity:1;transform:none}}
#page-models.mc-on .mc-sheet h3{margin:0 0 6px;font-family:"Home Cormorant","Cormorant Garamond",Georgia,serif;font-size:26px;font-weight:600;line-height:1.1;color:var(--ink,#1f1a2b)}
#page-models.mc-on .mc-sheet .mc-sheet-meta{font-size:12.5px;color:var(--ink-3,#6c6579);margin:0 0 12px}
#page-models.mc-on .mc-sheet .mc-sheet-body{font-size:14px;line-height:1.55;color:var(--ink-2,#4a4358)}
#page-models.mc-on .mc-sheet .mc-sheet-body .lu-cd-why,#page-models.mc-on .mc-sheet .mc-sheet-body .kf-parts{display:block !important}
#page-models.mc-on .mc-sheet .mc-sheet-keys{display:flex;justify-content:flex-end;margin-top:16px}

/* 7. by night */
body[data-theme="night"] #page-models.mc-on .mc-shelfkey{background:linear-gradient(180deg,#2c2540,#231d35);color:var(--accent,#c9b2f3);box-shadow:inset 0 1px 0 rgba(255,255,255,.07),inset 0 0 0 1px rgba(255,255,255,.07),0 1px 2px rgba(0,0,0,.4),0 8px 16px -8px rgba(0,0,0,.6)}
body[data-theme="night"] #page-models.mc-on .mc-shelfkey[aria-expanded="true"]{background:#2f2846}
body[data-theme="night"] #page-models.mc-on .mc-shelf.mc-open{background:#221c33;box-shadow:inset 0 1px 0 rgba(255,255,255,.06),inset 0 0 0 1px rgba(255,255,255,.07),0 2px 6px rgba(0,0,0,.4),0 22px 40px -16px rgba(0,0,0,.7)}
body[data-theme="night"] #page-models.mc-on .mc-drawer>.lu-cd,body[data-theme="night"] #page-models.mc-on .mc-drawer>.cat-row,body[data-theme="night"] #page-models.mc-on .mc-drawer>.kf-row{background:#2a2340;box-shadow:inset 0 1px 0 rgba(255,255,255,.06),inset 0 0 0 1px rgba(255,255,255,.07),0 1px 2px rgba(0,0,0,.45),0 10px 18px -10px rgba(0,0,0,.65)}
body[data-theme="night"] #page-models.mc-on .mc-div{color:#cfc6dc;background:linear-gradient(180deg,#2c2540,#231d35);box-shadow:inset 0 1px 0 rgba(255,255,255,.07),inset 0 0 0 1px rgba(255,255,255,.07),0 -1px 2px rgba(0,0,0,.5),0 -8px 16px -8px rgba(0,0,0,.6)}
body[data-theme="night"] #page-models.mc-on .mc-div[aria-selected="true"]{background:#2f2846;color:#d9c8fa;box-shadow:inset 0 2px 0 #b79ce6,inset 0 0 0 1px rgba(255,255,255,.08),0 -2px 6px rgba(0,0,0,.5),0 -12px 22px -8px rgba(0,0,0,.65)}
body[data-theme="night"] #page-models.mc-on .mc-sheet.mc-open{background:#241d36;box-shadow:inset 0 1px 0 rgba(255,255,255,.07),inset 0 0 0 1px rgba(255,255,255,.08),0 4px 12px rgba(0,0,0,.5),0 30px 60px -20px rgba(0,0,0,.8)}
body[data-theme="night"] #page-models.mc-on .mc-wrap.mc-more::after{background:linear-gradient(180deg,rgba(36,29,54,0),var(--card,#241d36))}
body[data-theme="night"] #page-models.mc-on .mc-shelf-h b,body[data-theme="night"] #page-models.mc-on .mc-sheet h3{color:#efe8fb}

/* 8. narrower windows: three tiles, then two, then one; the houses two by two */
@media (max-width:1180px){#page-models.mc-on.mc-fold .tr-head .page-title{font-size:40px}#page-models.mc-on.mc-fold .tr-head .tr-scene{width:140px !important;height:140px !important;flex-basis:140px;margin-left:12px}#page-models.mc-on.mc-fold .tr-head .tr-fit{-webkit-transform:scale(.3);transform:scale(.3)}#page-models.mc-on .rm-panel[data-room="get"] .lineup-grid{grid-template-columns:repeat(2,minmax(0,1fr))}#page-models.mc-on .mc-drawer{grid-template-columns:repeat(2,minmax(0,1fr))}}
@media (max-width:760px){#page-models.mc-on .mc-drawer{grid-template-columns:minmax(0,1fr);max-height:420px}#page-models.mc-on .rm-panel[data-room="yours"]:not([hidden]){display:block}
  #page-models.mc-on.mc-fold .tr-head .tr-words{grid-template-columns:minmax(0,1fr);grid-template-areas:"eye" "title" "keys" "now"}#page-models.mc-on.mc-fold .tr-head .tr-scene{display:none}}
@media (prefers-reduced-motion:reduce){#page-models.mc-on .mc-shelf.mc-open,#page-models.mc-on .mc-sheet.mc-open{-webkit-animation:none;animation:none}}
body[data-motion="still"] #page-models.mc-on .mc-shelf.mc-open,body[data-motion="still"] #page-models.mc-on .mc-sheet.mc-open{-webkit-animation:none;animation:none}



/* the spaces Chrome 83 gives no flex row a gap for, as margins (the same spaces in every browser) */
#page-models.mc-on .rm-panel[data-room="get"] .lu-tile .lu-head>*{margin:1px 8px 1px 0}
#page-models.mc-on .mc-shelfkey i{margin-left:8px}
#page-models.mc-on .mc-shelf-h>*+*{margin-left:10px}
#page-models.mc-on .mc-drawer>.lu-cd>*+*,#page-models.mc-on .mc-drawer>.cat-row>*+*,#page-models.mc-on .mc-drawer>.kf-row>*+*{margin-top:6px !important}
#page-models.mc-on .mc-drawer .lu-cd-acts>*,#page-models.mc-on .mc-drawer .kf-acts>*{margin:0 8px 4px 0}
#page-models.mc-on .mc-sheet .mc-sheet-keys>*+*{margin-left:8px}

/* the toy in the head, where the turret's own drawing stood; it takes the turret's size (r269's --tr-k on a narrow window) */
#page-models.tq-on .tr-turret{display:none !important}
#page-models .tr-fit>.tq{--tq-k:var(--tr-k,1)}
#page-models.mc-on.mc-fold .tq{pointer-events:none}
/* on a touch screen a finger moving up or down scrolls the page past the turret; a tap, a press or a sideways turn plays with it */
@media (pointer:coarse){#page-models .tq{touch-action:pan-y}}

</style>
<script>try{(window.__ingParts=window.__ingParts||{})["p304"]="started";}catch(_){}
/* The turret, a toy (Ingenium 7.15 draft). Her words (15 November 2026): "I don't want the cartridges to do anything when I click on them
   ... I only want it to be animated but work like a digital fidget toy for stress relief. I only want the turret and to be animated but
   serve no real function. The loading of the models and everything else should happen elsewhere so that I don't accidentally keep on
   loading up a model by clicking on the cartridges." And: "refined and sharpened a bit more to look more sleek and elegant but still have
   Ingenium's headers signature 3D look and animation style", with Vocatio's compass and Adamas's diamond for inspiration; "I prefer the
   lighter purple look for it, but I want to see different options to choose from."
   So the turret loads nothing and reads nothing from the engine. Pressing a lens sinks it with a click and turns it to the top, a soft
   tick at each port it passes; the plate can be flicked and spins on, slows and settles into a detent; the centre whirls it round once.
   It stands in layers that stand off one another (the case, the plate, the wells, the lenses, the centre, the index), sways on its own
   and leans to the pointer on a spring, as the compass does. Its metal is lit pixel by pixel from a window above on the left with a cool
   light from the lower right, so its polished edges are crisp lines; each layer is drawn once for its size, finish and theme.
   IngTurretToy.mount(scene, {finish, night, models:[{name, color}], gb}) returns the toy; toy.set({finish, night, models, gb}).
   Second draft (15 November 2026). Her words: "I like the new turret look but I don't just want the cartridges to be animated and
   clickable. I want the entire surface to be animated and clickable but I dislike the sound effect, they sound too chirpy and childish,
   the sound is a bit irritating." So every part of it answers a press, each in its own way; the whole turret lifts a little under the
   pointer and sinks when pressed, as Ingenium's keys do; and a ring of light spreads from where a press lands, as on Vocatio's compass:
     a lens sinks and turns to the top, as before, and its name round the rim does the same;
     the plate between the lenses: the turret dips toward the press and the plate steps one port on (clockwise when pressed on its upper
       right or lower left quarter, the other way on the other two, as the compass's ring does); pressed and dragged anywhere (the plate,
       the band or the rim) it turns with the hand, and pressed while it spins it is caught;
     the band with the scale: the turret wobbles as a coin settles, its low side running round faster as it calms, and light runs along it;
     the rim: the turret sinks and springs back, and light runs both ways round the polished rim;
     the index at the top nods and steps the plate one port on; the centre whirls the plate round, as before.
   The sounds are Ingenium's own kind (the sounds, below). Minimal motion and the system's reduced motion: a press that turns the plate
   still turns it, at once; the rest stays still. */
(function(){"use strict";
var D=document,W=window,TAU=Math.PI*2;
var SANS='Inter,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif';
function sst(a,b,x){var t=(x-a)/(b-a);t=t<0?0:t>1?1:t;return t*t*(3-2*t);}
function nrm(x,y,z){var l=Math.sqrt(x*x+y*y+z*z);return [x/l,y/l,z/l];}
var KL=nrm(-.48,-.66,.58),RL=nrm(.62,.55,.56),LXY=(function(){var l=Math.sqrt(.48*.48+.66*.66);return [-.48/l,-.66/l];})();
function hash(i){i=Math.imul(i^61,2654435761)^(i>>>15);i=Math.imul(i^(i>>>13),1274126177);return ((i^(i>>>16))>>>0)/4294967296;}
function hex(c){c=String(c||"").trim().replace("#","");if(/^[0-9a-f]{3}$/i.test(c))c=c.replace(/./g,"$&$&");if(!/^[0-9a-f]{6}$/i.test(c))c="6a3fb5";
  return [parseInt(c.slice(0,2),16),parseInt(c.slice(2,4),16),parseInt(c.slice(4,6),16)];}
function mix(a,b,t){return [Math.round(a[0]+(b[0]-a[0])*t),Math.round(a[1]+(b[1]-a[1])*t),Math.round(a[2]+(b[2]-a[2])*t)];}
function rgba(c,a){return "rgba("+c[0]+","+c[1]+","+c[2]+","+a+")";}
/* (no concentric grain anywhere: at this resolution its fine rings showed as faint lines; the metal keeps only an even, very fine texture) */
/* the resolution each layer is drawn at. Her words, again and again: "THE BLURRED LINES GONE!", "The double faded lines are still there too, just
   lighter". The cause: on the page the turret is shown at about seven tenths of the size its layers were drawn for, and always a little tilted
   in 3D, so every fine line of one pixel was shrunk and smeared across two at less strength, and two lines close together blurred into a faded
   double. So each layer is drawn for the size the turret is shown at on this screen, twice over, and seated at that size: the screen halves it
   cleanly, as Ingenium draws its logo (r104: "each layer is drawn at twice its size and scaled down where it stands"). KS is the turret's
   scale on the page, measured when it draws; the rooms' cartridges draw at 1. */
/* 7.15, later the same day: drawn at exactly the screen's resolution, no more. Drawn at twice it, each layer was shrunk by half on the graphics
   card as the turret swayed, without smoothing, and thin circles came out lumpy (her words: "the cartridge circles look so deformed and
   expanded at weird angles"); a canvas is a picture, not a drawing the browser redraws at each size, as the logo's layers are */
var KS=1,SS=1;
function dpr(){return Math.min(5,Math.max(1,(W.devicePixelRatio||1)*KS*SS));}
function still(){var m="calm";try{m=D.body.getAttribute("data-motion")||"calm";}catch(e){}try{if(W.matchMedia&&matchMedia("(prefers-reduced-motion: reduce)").matches)m="minimal";}catch(e){}return m==="minimal";}

/* ---------- the finishes: each a family of materials, by day (d) and by night (n); t is how far a highlight takes the metal's colour ---------- */
var FIN={
  lilac:{label:"Lilac metal",
    caseM:{d:[158,138,218],n:[88,70,146],t:.5},caseRo:.2,rimRo:.06,reed:300,
    bandM:{d:[150,130,212],n:[76,58,132],t:.5},bandRo:.3,ink:{d:[34,14,74],n:[236,228,252]},inkA:.86,
    plateM:{d:[178,164,232],n:[100,84,162],t:.5},plateRo:.3,tex:"turned",bow:.18,
    wellM:{d:[132,112,192],n:[56,40,100],t:.5},
    bezelM:{d:[218,210,246],n:[140,126,190],t:.3},bezelRo:.12,knurl:110,
    capM:{d:[184,170,236],n:[104,88,166],t:.5},
    hubM:{d:[214,202,250],n:[128,112,186],t:.3},hub:"ball",star:null},
  pearl:{label:"Pearl and violet",
    caseM:{d:[226,220,242],n:[150,142,182],t:.18},caseRo:.16,rimRo:.05,reed:0,
    bandM:{d:[86,56,156],n:[58,36,116],t:.42},bandRo:.12,ink:{d:[250,246,255],n:[236,228,252]},inkA:.9,
    plateM:{d:[186,170,238],n:[98,82,160],t:.48},plateRo:.28,tex:"sun",bow:.3,
    wellM:{d:[114,92,176],n:[48,34,90],t:.5},
    bezelM:{d:[228,222,244],n:[152,144,186],t:.16},bezelRo:.08,knurl:0,
    capM:{d:[222,216,244],n:[136,128,176],t:.2},
    hubM:{d:[244,240,252],n:[176,168,204],t:.12},hub:"medal",star:{d:[92,58,170],n:[214,198,248]}},
  sun:{label:"Lavender sunburst",
    caseM:{d:[166,146,222],n:[90,72,148],t:.5},caseRo:.07,rimRo:.035,reed:0,
    bandM:{d:[186,170,234],n:[82,64,140],t:.5},bandRo:.18,ink:{d:[48,22,98],n:[236,228,252]},inkA:.84,
    plateM:{d:[190,172,242],n:[102,84,166],t:.46},plateRo:.16,tex:"sun",bow:.36,
    wellM:{d:[118,96,180],n:[50,36,92],t:.5},
    bezelM:{d:[196,184,240],n:[128,112,178],t:.3},bezelRo:.05,knurl:0,
    capM:{d:[186,170,236],n:[102,86,164],t:.46},
    hubM:{d:[212,200,246],n:[128,112,182],t:.3},hub:"medal",star:{d:[104,64,188],n:[220,206,250]}},
  satin:{label:"Soft violet satin",
    caseM:{d:[136,112,202],n:[78,60,132],t:.52},caseRo:.3,rimRo:.06,reed:0,
    bandM:{d:[118,94,192],n:[64,48,118],t:.52},bandRo:.34,ink:{d:[246,240,255],n:[232,224,250]},inkA:.84,
    plateM:{d:[160,140,218],n:[92,76,150],t:.5},plateRo:.38,tex:"turned",bow:.12,
    wellM:{d:[104,82,166],n:[46,32,86],t:.5},
    bezelM:{d:[186,174,232],n:[124,108,174],t:.3},bezelRo:.1,knurl:0,
    capM:{d:[162,142,220],n:[94,78,152],t:.5},
    hubM:{d:[190,176,236],n:[116,100,170],t:.3},hub:"ball",star:null}
};
var ORDER=["lilac","pearl","sun","satin"];

/* ---------- light: a window above on the left (its reflection a crisp highlight on what is polished), a pale ceiling, a darker floor,
   and a cool light from the lower right that draws a fine line on the edges in shadow ---------- */
function shade(n0,n1,n2,M,ro,nt,o,cr){var rx=2*n2*n0,ry=2*n2*n1,rz=2*n2*n2-1,up=-ry,
    /* the room the metal mirrors (her words, 15 November 2026: "The cartridge holders need to have more definition and be more refined, the whole
       turret needs it. It looks too smoooth and buttery, it feels cartoonish a bit."): a darker floor, a crisp horizon a little below the eye
       and a bright ceiling, so a curved polished edge shows a sharp line where floor meets sky, as machined metal does; a face turned to us
       mirrors what it mirrored before (within three per cent) */
    /* and (her words: "This does not look right, it looks generated instead of a defined, crisp 3D turret") a wider range: the floor darker
       still and the ceiling brighter, a face turned to us as before */
    /* ... but a horizon in that room drew two parallel lines along every rounded ring (its reflection crosses the horizon on the ring's outer
       slope and again on its inner slope), the doubled, faded lines she pointed at again and again: so the room is smooth again, as it was
       before, only darker below and brighter above, and each ring shows one clean highlight */
    /* shine: the room's reflection steeper across a curve (bright where it faces the light, deep where it turns away), while a face turned to
       us mirrors exactly what it did (its value at up=0 held), so the flat plate keeps its lighter purple */
    env=nt?(.6+.95*(sst(-.9,1,up)-.455)):(.887+1.15*(sst(-.9,1,up)-.455)),
    d=n0*KL[0]+n1*KL[1]+n2*KL[2],k=rx*KL[0]+ry*KL[1]+rz*KL[2],k2=rx*RL[0]+ry*RL[1]+rz*RL[2];d=d<0?0:d;k=k<0?0:k;k2=k2<0?0:k2;
  /* her words: "I want the purple metal refined and look sleek and shiny. I want it more elavated." So the window's reflection is sharper and
     brighter on what is polished, with a glossy sheen round it from the same window (one highlight, never two lines), and its colour nearer
     white, as polished metal gives back the light it is shown */
  var sm=1-ro,p=8+190*sm*sm*sm,spec=Math.pow(k,p)*(.25+2.3*sm*sm)+(cr?0:Math.pow(k,Math.max(6,p*.16))*.26*sm*sm)+Math.pow(k,5)*.08*sm,rim=Math.pow(k2,p*.5)*(nt?.16:.26)*sm,
    lum=ro*(nt?(.3+.7*d):(.4+.92*d))+sm*env*(.84+.26*d),a=nt?M.n:M.d,t=M.t*.55,dim=1,sr=255*(1-t)+a[0]*t,sg=255*(1-t)+a[1]*t,sb=255*(1-t)+a[2]*t;
  o[0]=(a[0]*lum+sr*spec)*dim+(nt?150:226)*rim;o[1]=(a[1]*lum+sg*spec)*dim+(nt?136:216)*rim;o[2]=(a[2]*lum+sb*spec)*dim+(nt?200:255)*rim;return o;}
/* a band from r0 to r1, rounded: its normal leans out beyond its middle and in before it (h: how round) */
function dome(ex,ey,r,r0,r1,h,o){var q=(r-(r0+r1)/2)/((r1-r0)/2);q=q<-.985?-.985:q>.985?.985:q;var s=q/Math.sqrt(1-q*q)*h,l=Math.sqrt(s*s+1);o[0]=ex*s/l;o[1]=ey*s/l;o[2]=1/l;return o;}
function slope(ex,ey,s,o){var l=Math.sqrt(s*s+1);o[0]=ex*s/l;o[1]=ey*s/l;o[2]=1/l;return o;}
function put(px,j,c,a){px[j]=c[0]>255?255:c[0]<0?0:c[0];px[j+1]=c[1]>255?255:c[1]<0?0:c[1];px[j+2]=c[2]>255?255:c[2]<0?0:c[2];px[j+3]=a<0?0:a>1?255:a*255;}
var CACHE={},KEYS=[];
function cv(n){var c=D.createElement("canvas");c.width=n;c.height=n;return c;}
function keep(k,c){CACHE[k]=c;KEYS.push(k);while(KEYS.length>60){var x=KEYS.shift();if(x!==k)delete CACHE[x];}return c;}

/* ---------- the case: a polished rim (reeded where the finish asks), a rounded case, a polished step down to the scale's band, the band,
   a polished step down to the well that holds the plate; the scale engraved on the band's upper arc, and the words on its lower arc ---------- */
function caseLayer(F,nt,N,gb){var key="c"+N+F.label+nt+gb;if(CACHE[key])return CACHE[key];var c=cv(N),g=c.getContext("2d"),im=g.createImageData(N,N),px=im.data,u=N/460,c0=N/2,
    R=225*u,rR=219*u,rc=208*u,rb=205*u,re=171*u,rw=168*u,n=[0,0,1],col=[0,0,0],x,y,dx,dy,r,ex,ey,j,a;
  for(y=0;y<N;y++)for(x=0;x<N;x++){dx=x+.5-c0;dy=y+.5-c0;r=Math.sqrt(dx*dx+dy*dy);if(r>R+1)continue;ex=r?dx/r:0;ey=r?dy/r:0;j=(y*N+x)*4;a=Math.min(1,R+.5-r);
    if(r>=rR){dome(ex,ey,r,rR,R,1.15,n);if(F.reed){var th=Math.atan2(dy,dx),kn=Math.sin(th*F.reed);n[0]+=-ey*kn*.22;n[1]+=ex*kn*.22;var l=Math.sqrt(n[0]*n[0]+n[1]*n[1]+n[2]*n[2]);n[0]/=l;n[1]/=l;n[2]/=l;}
      shade(n[0],n[1],n[2],F.caseM,F.rimRo,nt,col);}
    else if(r>=rc){dome(ex,ey,r,rc,rR,.55,n);shade(n[0],n[1],n[2],F.caseM,F.caseRo,nt,col);if(r<rc+.9*u){col[0]*=.86;col[1]*=.86;col[2]*=.88;}}
    else if(r>=rb){slope(ex,ey,-1.6,n);shade(n[0],n[1],n[2],F.caseM,F.rimRo,nt,col);}
    else if(r>=re){dome(ex,ey,r,re,rb,.14,n);shade(n[0],n[1],n[2],F.bandM,F.bandRo,nt,col);var gr=1+.008*(hash(y*N+x)-.5);col[0]*=gr;col[1]*=gr;col[2]*=gr;
      /* the case's shadow on the band, on the side the light comes from */
      var e=ex*-LXY[0]+ey*-LXY[1],sh=(nt?.34:.22)*Math.max(0,-e+.25)*Math.exp(-(rb-r)/(4*u));col[0]*=1-sh;col[1]*=1-sh;col[2]*=1-sh;}
    else if(r>=rw){slope(ex,ey,1.5,n);shade(n[0],n[1],n[2],F.caseM,F.rimRo,nt,col);}
    else{var dd=nt?[16,8,30]:[54,36,92];col[0]=dd[0];col[1]=dd[1];col[2]=dd[2];}
    put(px,j,col,a);}
  g.putImageData(im,0,0);
  /* every boundary between the case's parts cut as a fine line, with the light its far wall catches */
  /* her words: "I just want THE BLURRED LINES GONE!": each boundary a single crisp dark line, no pale line beside it */
  [R-.6*u,rR,rc,rb,re,rw].forEach(function(rr){g.lineWidth=Math.max(1,.6*u);g.strokeStyle=nt?"rgba(0,0,0,.5)":"rgba(40,18,84,.34)";g.beginPath();g.arc(c0,c0,rr,0,TAU);g.stroke();});
  /* the scale: cut into the band (each cut drawn twice, its lit lower edge first, then the cut), on the upper arc */
  var ink=nt?F.ink.n:F.ink.d,lit=nt?[0,0,0]:[255,255,255],litA=nt?.45:(F.ink.d[0]>200?.0:.55),s=u,a0=-Math.PI/2-1.05,a1=-Math.PI/2+1.05;
  function cut(fn){g.save();g.translate(.7*s,.9*s);fn(rgba(lit,litA),true);g.restore();fn(rgba(ink,F.inkA),false);}
  if(gb>0){var steps=[1,2,4,5,8,10,16,20,25,32,40,50,64,80,100,128],L=128;for(var q=0;q<steps.length;q++)if(gb/steps[q]<=6){L=steps[q];break;}var sm=L/4;
    for(var i=0;i*sm<=gb+1e-9;i++){var v=i*sm,an=a0+(a1-a0)*v/gb,big=i%2===0,lab=i%4===0,r0=(big?182:186)*u,r1=196*u;
      (function(an,r0,r1,big,lab,v){cut(function(st){g.strokeStyle=st;g.lineCap="round";g.lineWidth=(big?1.7:1.05)*s;g.beginPath();g.moveTo(c0+Math.cos(an)*r0,c0+Math.sin(an)*r0);g.lineTo(c0+Math.cos(an)*r1,c0+Math.sin(an)*r1);g.stroke();
        if(lab){g.save();g.translate(c0+Math.cos(an)*175*u,c0+Math.sin(an)*175*u);g.rotate(an+Math.PI/2);g.fillStyle=st;g.font="600 "+(10.5*s)+"px "+SANS;g.textAlign="center";g.textBaseline="middle";g.fillText(String(Math.round(v*10)/10),0,0);g.restore();}});})(an,r0,r1,big,lab,v);}
    cut(function(st){g.strokeStyle=st;g.lineWidth=1.2*s;g.beginPath();g.arc(c0,c0,196*u,a0-.02,a1+.02);g.stroke();});}
  /* the words on the lower arc, each letter set on the curve as the compass's ring is lettered */
  var words=gb>0?((Math.round(gb*10)/10)+" GB for a model").toUpperCase():"INGENIUM";g.font="600 "+(9.6*s)+"px "+SANS;g.textAlign="center";g.textBaseline="middle";
  var track=2.1*s,ws=[],tot=0;for(var k=0;k<words.length;k++){var w=g.measureText(words[k]).width+track;ws.push(w);tot+=w;}
  var rr=188*u,ang=Math.PI/2+tot/2/rr;
  cut(function(st){g.fillStyle=st;var aa=ang;for(var k=0;k<words.length;k++){var w=ws[k],mid=aa-w/2/rr;g.save();g.translate(c0+Math.cos(mid)*rr,c0+Math.sin(mid)*rr);g.rotate(mid-Math.PI/2);g.fillText(words[k],0,0);g.restore();aa-=w/rr;}});
  return keep(key,c);}

/* ---------- the plate: drawn without its light (it turns), its light drawn on a layer of its own that stays with the window ---------- */
var PR=166,PF=158,HUBR=34;
function plateFace(F,nt,N,flush){var key="pf"+N+F.label+nt+(flush?"f":"");if(CACHE[key])return CACHE[key];var c=cv(N),g=c.getContext("2d"),im=g.createImageData(N,N),px=im.data,u=N/340,c0=N/2,
    R=PR*u,rf=PF*u,rh=HUBR*u,col=[0,0,0],base=[0,0,0],x,y,dx,dy,r,j,a;
  shade(0,0,1,F.plateM,F.plateRo,nt,base);var edgeTop=[0,0,0];shade(0,-.2,.98,F.plateM,.1,nt,edgeTop);
  for(y=0;y<N;y++)for(x=0;x<N;x++){dx=x+.5-c0;dy=y+.5-c0;r=Math.sqrt(dx*dx+dy*dy);if(r>R+1)continue;j=(y*N+x)*4;a=Math.min(1,R+.5-r);var m;
    if(r>=rf){var q=(r-rf)/(R-rf);m=1.06-.34*Math.pow(Math.abs(q-.35)*1.5,2);col[0]=base[0]*m;col[1]=base[1]*m;col[2]=base[2]*m;}
    else if(!flush&&r<=rh+2*u){var q2=(rh+2*u-r)/(2*u);if(r>rh){col[0]=base[0]*.62;col[1]=base[1]*.62;col[2]=base[2]*.66;}else{col[0]=base[0]*.5;col[1]=base[1]*.5;col[2]=base[2]*.54;}}
    else{if(F.tex==="sun"){var th=Math.atan2(dy,dx),ix=Math.floor((th+Math.PI)/TAU*2880),n1=hash(ix),n2=hash(ix*7+3);m=1+.05*(n1-.5)+.025*(n2-.5)+.008*(hash(y*N+x)-.5);}
      else{m=1+.01*(hash(y*N+x)-.5);}
      if(flush){var fz=sst(rh*.55,rh+14*u,r);m=1+(m-1)*fz;}
      col[0]=base[0]*m;col[1]=base[1]*m;col[2]=base[2]*m;
      /* her words (15 November 2026, on version 15): "remove the white outline that is around the big circle of the turret's surface, it is detracting
         from the overall look of the 3D design especially on Night mode": the pale ring drawn just inside the face's edge is gone, so the edge is
         the one crisp dark line the plate's light draws there, as every other boundary of the turret is */
      if(!flush&&Math.abs(r-(rh+2*u))<.9*u){var hl=nt?[150,138,196]:[236,230,252];col[0]=hl[0]*.9;col[1]=hl[1]*.9;col[2]=hl[2]*.92;}}
    put(px,j,col,a);}
  g.putImageData(im,0,0);return keep(key,c);}
/* the plate's light, which never turns: the edge lit on the window's side and in shadow on the other, the bow of light across the face
   (a sunburst's is stronger), and the band's wall casting its shadow on the plate's edge on the window's side */
function plateLight(F,nt,N,flush){var key="pl"+N+F.label+nt+(flush?"f":"");if(CACHE[key])return CACHE[key];var c=cv(N),g=c.getContext("2d"),im=g.createImageData(N,N),px=im.data,u=N/340,c0=N/2,
    R=PR*u,rf=PF*u,rh=HUBR*u,n=[0,0,1],col=[0,0,0],base=[0,0,0],x,y,dx,dy,r,ex,ey,j;
  for(y=0;y<N;y++)for(x=0;x<N;x++){dx=x+.5-c0;dy=y+.5-c0;r=Math.sqrt(dx*dx+dy*dy);if(r>R+1)continue;ex=r?dx/r:0;ey=r?dy/r:0;j=(y*N+x)*4;var w=0,b=0;
    if(r>=rf){dome(ex,ey,r,rf,R,1.0,n);shade(n[0],n[1],n[2],F.plateM,.08,nt,col);shade(0,0,1,F.plateM,.08,nt,base);var dl=(col[0]+col[1]+col[2]-base[0]-base[1]-base[2])/3/255;
      if(dl>0)w=Math.min(.85,dl*1.25);else b=Math.min(.6,-dl*1.4);}
    else if(flush||r>rh+2*u){var pr=ex*LXY[0]+ey*LXY[1],ap=Math.abs(pr),on,off;
      if(F.tex==="sun"){on=Math.exp(-pr*pr/.012)*1.15;off=Math.exp(-(1-ap)*(1-ap)/.03);}else{on=Math.exp(-(1-ap)*(1-ap)/.07);off=Math.exp(-pr*pr/.06);}
      w=on*F.bow*(.5+.5*sst(rh,rf,r));b=off*F.bow*.32;}
    var e=ex*LXY[0]+ey*LXY[1],cs=(nt?.42:.3)*Math.max(0,e-.05)*Math.exp(-(R-r)/(7*u));b=Math.min(.75,b+cs);
    if(w>b){px[j]=255;px[j+1]=nt?236:248;px[j+2]=255;px[j+3]=Math.round((w-b)*255);}else{px[j]=nt?4:24;px[j+1]=nt?0:10;px[j+2]=nt?12:48;px[j+3]=Math.round((b-w)*255);}
    if(r>R-.5){px[j+3]=Math.round(px[j+3]*Math.max(0,R+.5-r));}}
  g.putImageData(im,0,0);
  [rf].forEach(function(rr){g.lineWidth=Math.max(1,.6*u);g.strokeStyle=nt?"rgba(0,0,0,.45)":"rgba(40,18,84,.3)";g.beginPath();g.arc(c0,c0,rr,0,TAU);g.stroke();});
  return keep(key,c);}

/* ---------- a port: its well sunk in the plate (a polished chamfer, lit on the far side, and the shadow of the near wall), drawn upright
   so its light stays with the window as the plate turns; and the lens in its bezel, standing off the plate ---------- */
var WELL=118,LENS=112;
function wellLayer(F,nt,N,wr,kind){var key="w"+N+F.label+nt+wr+(kind||"");if(CACHE[key])return CACHE[key];var c=cv(N),g=c.getContext("2d"),im=g.createImageData(N,N),px=im.data,u=N/WELL,c0=N/2,
    R=wr*u,ch=3*u,n=[0,0,1],col=[0,0,0],x,y,dx,dy,r,ex,ey,j;
  for(y=0;y<N;y++)for(x=0;x<N;x++){dx=x+.5-c0;dy=y+.5-c0;r=Math.sqrt(dx*dx+dy*dy);if(r>R+1)continue;ex=r?dx/r:0;ey=r?dy/r:0;j=(y*N+x)*4;
    /* an empty cartridge sits flat in the plate: its well is the plate's own metal, no darker, with no shade round it */
    if(kind==="cap"){shade(0,0,1,F.plateM,F.plateRo,nt,col);var gq=1+.006*(hash(y*N+x)-.5);col[0]*=gq;col[1]*=gq;col[2]*=gq;}
    else if(r>R-ch){slope(ex,ey,-1.7,n);shade(n[0],n[1],n[2],F.plateM,.07,nt,col);}
    else{shade(0,0,1,F.wellM,.36,nt,col);var e=ex*LXY[0]+ey*LXY[1],sh=(nt?.55:.42)*Math.max(0,e+.15)*Math.exp(-(R-ch-r)/(7*u))+(nt?.26:.16)*Math.exp(-(R-ch-r)/(2*u));
      col[0]*=1-sh;col[1]*=1-sh;col[2]*=1-sh;}
    /* a ball standing above its well casts a soft shadow on the floor, away from the window (the empty cartridges sit low and cast none) */
    if(kind==="lens"){var rl=(LENS/2-2)*u,ds=Math.sqrt((dx+LXY[0]*4*u)*(dx+LXY[0]*4*u)+(dy+LXY[1]*4*u)*(dy+LXY[1]*4*u)),cs2=(nt?.5:.34)*(1-sst(rl-3*u,rl+5*u,ds));col[0]*=1-cs2;col[1]*=1-cs2;col[2]*=1-cs2;}
    put(px,j,col,Math.min(1,R+.5-r));}
  g.putImageData(im,0,0);
  return keep(key,c);}
/* the holders, machined (her words: "Please refine and sharpen the circles of the cartridges and give them more definition and make them look like
   proper refined metals like the rest of the turret unlike this soft smoothed out over glossed variation that is there. It looks mishappen
   and deformed."). The rounded tube lit from one side looked thicker on one side than the other; now each holder is a ring turned on a
   lathe: a narrow crisp bevel at each edge and between them a flat face, very slightly crowned, so it reads even all round; a crisp finish
   (one sharp highlight, no glossy glow); and every edge drawn with nine samples where it falls inside a pixel, so the circles are smooth
   and true at the screen's own resolution. A ball's holder has inside it a flat satin seat and a narrow lip down to the glass. */
function bezelLayer(F,nt,N,kind){var key="b2"+N+F.label+nt+kind;if(CACHE[key])return CACHE[key];var c=cv(N),g=c.getContext("2d"),im=g.createImageData(N,N),px=im.data,u=N/LENS,c0=N/2,
    R=(LENS/2-2)*u,n=[0,0,1],col=[0,0,0],x,y,dx,dy,r,j;
  var bw=1.15*u,qA=R*.86,qB=qA+bw,qC=R-bw,seat=R*.68,lip=R*.64,B=kind==="cap"?[qA,qB,qC]:[lip,seat,qA,qB,qC];
  function at(sx,sy,o){var rr=Math.sqrt(sx*sx+sy*sy),ex=rr?sx/rr:0,ey=rr?sy/rr:0;
    if(rr>R)return false;
    if(rr>=qC){slope(ex,ey,1,n);shade(n[0],n[1],n[2],F.bezelM,F.bezelRo,nt,o,1);}
    else if(rr>=qB){dome(ex,ey,rr,qB,qC,.15,n);
      if(F.knurl){var th=Math.atan2(sy,sx),kn=Math.sin(th*F.knurl);n[0]+=-ey*kn*.3;n[1]+=ex*kn*.3;var l=Math.sqrt(n[0]*n[0]+n[1]*n[1]+n[2]*n[2]);n[0]/=l;n[1]/=l;n[2]/=l;}
      shade(n[0],n[1],n[2],F.bezelM,F.bezelRo,nt,o,1);}
    else if(rr>=qA){slope(ex,ey,-1,n);shade(n[0],n[1],n[2],F.bezelM,F.bezelRo,nt,o,1);}
    else if(kind==="cap"){shade(0,0,1,F.plateM,F.plateRo,nt,o);}
    else if(rr>=seat){shade(0,0,1,F.bezelM,.42,nt,o,1);}
    else if(rr>=lip){slope(ex,ey,-1.6,n);shade(n[0],n[1],n[2],F.bezelM,.06,nt,o,1);}
    else return false;
    return true;}
  var acc=[0,0,0],SUB=[-1/3,0,1/3];
  for(y=0;y<N;y++)for(x=0;x<N;x++){dx=x+.5-c0;dy=y+.5-c0;r=Math.sqrt(dx*dx+dy*dy);if(r>R+1.5)continue;j=(y*N+x)*4;
    var near=r>R-1.2;for(var b=0;!near&&b<B.length;b++)if(Math.abs(r-B[b])<1.2)near=true;
    if(!near){if(!at(dx,dy,col))continue;put(px,j,col,1);continue;}
    acc[0]=acc[1]=acc[2]=0;var cnt=0;
    for(var a1=0;a1<3;a1++)for(var a2=0;a2<3;a2++)if(at(dx+SUB[a1],dy+SUB[a2],col)){acc[0]+=col[0];acc[1]+=col[1];acc[2]+=col[2];cnt++;}
    if(!cnt)continue;col[0]=acc[0]/cnt;col[1]=acc[1]/cnt;col[2]=acc[2]/cnt;put(px,j,col,cnt/9);}
  g.putImageData(im,0,0);
  if(kind==="cap"){/* the empty cartridge's circle and centre, cut as the ruler's marks and the star are: the lit lower edge first, then the ink */
    var ink=nt?[30,13,66]:F.ink.d,inkA=nt?.86:F.inkA,lit=nt?[196,178,246]:[255,255,255],litA=nt?.2:.55,s=u;
    /* her words: "in the middle of the cartridge circles two parallel blurriness effect": the circle and the centre are each one crisp line in
       the ink, with no pale copy of the cut beside them */
    var cut=function(fn){fn(rgba(ink,inkA));};
    cut(function(st){g.strokeStyle=st;g.lineWidth=1.2*s;g.beginPath();g.arc(c0,c0,R*.42,0,TAU);g.stroke();});
    cut(function(st){g.fillStyle=st;g.beginPath();g.arc(c0,c0,1.6*s,0,TAU);g.fill();});}
  return keep(key,c);}
/* the glass: deep in the model's colour, its coating rings, the window's reflection crisp at the upper left, a soft second one, and the
   light gathered inside it at the lower right */
function glassBody(g,c,R,col,nt,ext){var C=hex(col),L=mix(C,[255,255,255],.45),Dk=mix(C,[0,0,0],.62),Rg=R*.64,E=Rg*(ext||1);
  var gl=g.createRadialGradient(c+R*.1,c+R*.12,R*.04,c,c,Rg);gl.addColorStop(0,rgba(L,1));gl.addColorStop(.45,rgba(C,1));gl.addColorStop(1,rgba(Dk,1));g.fillStyle=gl;g.fillRect(c-E,c-E,2*E,2*E);
  var cau=g.createRadialGradient(c+R*.26,c+R*.3,0,c+R*.26,c+R*.3,R*.34);cau.addColorStop(0,rgba(mix(C,[255,255,255],.7),.55));cau.addColorStop(1,rgba(C,0));g.fillStyle=cau;g.fillRect(c-E,c-E,2*E,2*E);
  /* no coating rings inside the glass (her words: "Please also remove the weird faded blurred lines that are around the gem balls") */}
function glassEdge(g,c,R,col,nt){var C=hex(col),Dk=mix(C,[0,0,0],.62),Rg=R*.64;
  g.save();g.beginPath();g.arc(c,c,Rg,0,TAU);g.clip();
  var vg=g.createRadialGradient(c,c,Rg*.66,c,c,Rg);vg.addColorStop(0,"rgba(0,0,0,0)");vg.addColorStop(1,"rgba(0,0,0,"+(nt?.5:.38)+")");g.fillStyle=vg;g.fillRect(c-Rg,c-Rg,2*Rg,2*Rg);
  /* (no pale arc along the lower edge: it read as a faded line round the ball) */
  g.restore();
  g.strokeStyle=rgba(Dk,.9);g.lineWidth=Math.max(1,R*.02);g.beginPath();g.arc(c,c,Rg,0,TAU);g.stroke();}
function glass(g,c,R,col,nt){var Rg=R*.64;g.save();g.beginPath();g.arc(c,c,Rg,0,TAU);g.clip();glassBody(g,c,R,col,nt,1);g.restore();glassEdge(g,c,R,col,nt);}
function lensDraw(canvas,F,nt,kind,col,size,bare){var S=size||LENS,p=dpr(),N=Math.round(S*p);if(canvas.width!==N){canvas.width=N;canvas.height=N;}canvas.style.width=S+"px";canvas.style.height=S+"px";
  var g=canvas.getContext("2d");g.setTransform(1,0,0,1,0,0);g.clearRect(0,0,N,N);g.drawImage(bezelLayer(F,nt,N,kind),0,0);if(kind==="cap"||bare)return;
  glass(g,N/2,(S/2-2)*p,col,nt);}
/* ---------- the balls move a little in their settings (her words, 15 November 2026: "I don't want the swirly motion, I just want the balls to
   move around a bit", when hovered or pressed). The ball's coloured body rolls inside a round window the ball's own size, while its edge
   shading, its rim of light and its highlight stay where the light puts them, as a glass marble's do when it turns in its cup: no gap ever
   opens at its edge. Under the pointer it drifts gently round; pressed, it rocks in its setting and settles. ---------- */
var BALL_EXT=1.32;
function floorDraw(cv_,F,nt){var p=dpr(),N=Math.round(LENS*p),R=(LENS/2-2)*.64*p+1.5*p,c=N/2,col=[0,0,0];cv_.width=N;cv_.height=N;cv_.style.width=LENS+"px";cv_.style.height=LENS+"px";
  var g=cv_.getContext("2d");shade(0,0,1,F.wellM,.36,nt,col);var base=mix(col,[0,0,0],nt?.35:.25),deep=mix(col,[0,0,0],nt?.6:.5);
  var gr=g.createRadialGradient(c,c,R*.5,c,c,R);gr.addColorStop(0,rgba(base,1));gr.addColorStop(1,rgba(deep,1));g.fillStyle=gr;g.beginPath();g.arc(c,c,R,0,TAU);g.fill();}
function ballDraw(pt,nt){var R=LENS/2-2,Rg=R*.64,p=dpr(),W=Rg*2,B=Math.ceil(Rg*BALL_EXT*2),Nb=Math.round(B*p),o=(LENS-W)/2;
  pt.bw.style.left=o.toFixed(2)+"px";pt.bw.style.top=o.toFixed(2)+"px";pt.bw.style.width=W.toFixed(2)+"px";pt.bw.style.height=W.toFixed(2)+"px";
  pt.body.width=Nb;pt.body.height=Nb;pt.body.style.width=B+"px";pt.body.style.height=B+"px";pt.body.style.left=((W-B)/2).toFixed(2)+"px";pt.body.style.top=((W-B)/2).toFixed(2)+"px";
  var g=pt.body.getContext("2d");g.clearRect(0,0,Nb,Nb);glassBody(g,Nb/2,R*p,pt.color,nt,BALL_EXT);
  var N=Math.round(LENS*p);pt.edge.width=N;pt.edge.height=N;pt.edge.style.width=LENS+"px";pt.edge.style.height=LENS+"px";var e=pt.edge.getContext("2d");e.clearRect(0,0,N,N);glassEdge(e,N/2,R*p,pt.color,nt);}
/* the glass's highlight, a little layer of its own, so it moves with the lean */
function sparkDraw(canvas){var p=dpr(),S=46,N=Math.round(S*p);canvas.width=N;canvas.height=N;canvas.style.width=S+"px";canvas.style.height=S+"px";var g=canvas.getContext("2d"),c=N/2;
  var hl=g.createRadialGradient(c,c,0,c,c,N*.42);hl.addColorStop(0,"rgba(255,255,255,.86)");hl.addColorStop(.3,"rgba(255,255,255,.4)");hl.addColorStop(.62,"rgba(255,255,255,.07)");hl.addColorStop(1,"rgba(255,255,255,0)");
  g.save();g.translate(c,c);g.rotate(-.7);g.scale(1,.55);g.fillStyle=hl;g.beginPath();g.arc(0,0,N*.42,0,TAU);g.fill();g.restore();
  g.fillStyle="rgba(255,255,255,.96)";g.beginPath();g.arc(c-N*.08,c-N*.03,N*.045,0,TAU);g.fill();}

/* ---------- the centre: the star medallion of her picture, or the polished ball. Her words on the second draft: "I want the Ingenium's
   logo engraved in the middle of the turret and still be clickable like it is in the middle of this turret. I really like this look, I
   want to see it as an option in the preview please." Her picture showed the Lavender sunburst's centre: a medallion with a polished rim
   and a star of four long points and four short, each point a lit half and a shaded half, a point of light at its heart. Then, on the
   seal designs I offered in its place: "I wanted the same engraved look of the picture that I sent you replicated not this weird
   button-esque design that you have sent me in the preview. It looks poorly." So the centre is that medallion, drawn exactly as in her
   picture (the star in the picture's own colours) with any finish; the polished ball is the other choice. It stays the key that whirls
   the plate. ---------- */
var PIC_STAR={d:[104,64,188],n:[220,206,250]};
/* her words on version 4: "I was only refering to the logo design in the picture of the turret, the rest of the refinements and added
   polish of your preview was amzing, leave them as is only undo the middle part please." So the centre is the star medallion exactly as her
   picture shows it (drawn by the same lines that drew her picture); the engine star is no longer offered. */
var CENTRES=[["star","The star, engraved and flush"],["medal","The star on its medallion, as in your picture"],["ball","The polished ball"]];
function cenOf(c){return c==="ball"||c==="medal"?c:"star";}
/* ---------- the engine star at the centre (7.15). Her words: "I want the star to be remodeled into Ingenium's purple engine inside of its logo
   button", and then: "I just wanted you to replicate the style of this picture". So the star of her picture keeps its medallion, its violet,
   its flat lit and shaded halves and the point of light at its heart, and takes the engine star's shape: Ingenium's logo's four points,
   each running from the centre to its tip with its sides curving in toward the diagonals (the base page's seal, a 120 square: tip 30 from
   the centre, the sides through 10.69 on each diagonal), each a lit half and a shaded half as the logo's are. It turns as the logo's engine
   does (four eased quarter turns in nine seconds, thirteen in Calm), and pressed it spins once, as Home's engine button does. ---------- */
function bz(x1,y1,x2,y2){function B(a,b,u){return 3*a*u*(1-u)*(1-u)+3*b*u*u*(1-u)+u*u*u;}return function(x){if(x<=0)return 0;if(x>=1)return 1;var lo=0,hi=1,u=x;for(var i=0;i<24;i++){u=(lo+hi)/2;if(B(x1,x2,u)<x)lo=u;else hi=u;}return B(y1,y2,u);};}
var EN=bz(.45,.05,.55,.95),ESP=bz(.25,.9,.3,1);
function engineDraw(canvas,nt){var S=HUBR*2+8,p=dpr(),N=Math.round(S*p);canvas.width=N;canvas.height=N;canvas.style.width=S+"px";canvas.style.height=S+"px";
  var g=canvas.getContext("2d"),c=N/2,Rs=HUBR*p*.72,s=Rs/30,SC=nt?PIC_STAR.n:PIC_STAR.d,LT=mix(SC,[255,255,255],.35),DK=mix(SC,[0,0,0],.35);
  function half(k,side){var a=k*Math.PI/2,ca=Math.cos(a),sa=Math.sin(a);function P(x,y){x*=s*side;y*=s;return [c+x*ca-y*sa,c+x*sa+y*ca];}
    var t=P(0,-30),c1=P(-1.75,-22.5),c2=P(-5.5,-15.875),w=P(-10.69,-10.69);g.beginPath();g.moveTo(c,c);g.lineTo(t[0],t[1]);g.bezierCurveTo(c1[0],c1[1],c2[0],c2[1],w[0],w[1]);g.closePath();}
  for(var k=0;k<4;k++){half(k,1);g.fillStyle=rgba(LT,1);g.fill();half(k,-1);g.fillStyle=rgba(DK,1);g.fill();}
  g.fillStyle=rgba(mix(SC,[255,255,255],.75),1);g.beginPath();g.arc(c,c,Rs*.1,0,TAU);g.fill();}
/* ---------- the centre engraved and flush (her words, 15 November 2026: "I want the inside of the turret where the logo drawing is to be flat and not
   pop out. I want the drawing to look engraved and not just pasted on top of the turret. I want the refined elegance of the compass and the
   diamond."). As the dial on the diamond's holder: a flat disc level with the plate, two hairline rings cut in it, and her picture's star
   (four long points and four short, the same lines that drew her picture) cut into the metal and filled with its violet: in a cut each
   point's halves take the light the other way round, the edge on the window's side throws a fine shadow in, and the wall across from it
   catches the light. Nothing stands proud of the plate; pressed, it still whirls the plate. ---------- */
function starTris(c,Rr){var T=[];function point(a,len,wd){var ux=Math.cos(a),uy=Math.sin(a),vx=-uy,vy=ux,tip=[c+ux*len,c+uy*len];
    T.push({p:[[c,c],tip,[c+vx*wd,c+vy*wd]],lit:(vx*-LXY[0]+vy*-LXY[1])>0});T.push({p:[[c,c],tip,[c-vx*wd,c-vy*wd]],lit:(vx*-LXY[0]+vy*-LXY[1])<=0});}
  for(var k=0;k<4;k++)point(-Math.PI/2+k*Math.PI/2+Math.PI/4,Rr*.48,Rr*.11);for(var k2=0;k2<4;k2++)point(-Math.PI/2+k2*Math.PI/2,Rr,Rr*.17);return T;}
function triPath(g,t,dx,dy){g.beginPath();g.moveTo(t.p[0][0]+dx,t.p[0][1]+dy);g.lineTo(t.p[1][0]+dx,t.p[1][1]+dy);g.lineTo(t.p[2][0]+dx,t.p[2][1]+dy);g.closePath();}
/* her words on the first engraving: "The drawing is still sitting on top of the area and molded and embedded in it, plus it is silver on night
   mode and looks ugly because it is too bright", and: "The design needs to be the same colour as the ruler on the turret and read as a part
   of the turret and its drawing and mechanics and not as a last minute patchwork." So the centre is drawn as the ruler is: the disc in the
   band's own metal and grain (the ruler's ground), and every mark on it (two rings and her picture's star) cut as the ruler's ticks are cut,
   twice: its lit lower edge first, then the cut itself in the ruler's ink, by day and by night. */
function hubEngraved(src,F,nt,N,S){var g=src.getContext("2d"),im=g.createImageData(N,N),px=im.data,c0=N/2,u=N/S,R=HUBR*u,col=[0,0,0],base=[0,0,0],x,y,dx,dy,r,j;
  /* the disc, flat and level with the plate, in the band's own metal and grain, its edge the circle round the middle of the turret (her words:
     "I didn't want the bigger circle from the middle of the turret to be removed, bring it back please"); no rings drawn on it */
  /* by night the band's metal is darker than the plate's, and the disc looked sunk in shadow (her words: "Do not darken the inside of the circle on
     dark mode, please remove that effect"): by night the disc takes the plate's own metal, so it is no darker than the plate round it */
  if(nt)shade(0,0,1,F.plateM,F.plateRo,nt,base);else shade(0,0,1,F.bandM,F.bandRo,nt,base);
  for(y=0;y<N;y++)for(x=0;x<N;x++){dx=x+.5-c0;dy=y+.5-c0;r=Math.sqrt(dx*dx+dy*dy);if(r>R+1)continue;j=(y*N+x)*4;var m=1+.008*(hash(y*N+x)-.5);
    col[0]=base[0]*m;col[1]=base[1]*m;col[2]=base[2]*m;put(px,j,col,Math.min(1,R+.5-r));}
  g.putImageData(im,0,0);
  /* the circle round the middle (her words: "please remove the white outline of the circle in the middle of the turret"): no light rim, one
     crisp line in the ruler's ink at the disc's edge, as the ruler's marks are cut */
  g.strokeStyle=nt?"rgba(30,13,66,.86)":rgba(F.ink.d,F.inkA);g.lineWidth=Math.max(1,1.1*u);g.beginPath();g.arc(c0,c0,R-1.2*u,0,TAU);g.stroke();
  /* the ruler's cut: its ink, its lit edge */
  /* her words: "Why is the drawing silver in dark mode against a dark purple turret? It needs to be dark purple too." So by night the
     marks are cut in a deep purple, darker than the turret's night metal, with a faint lit edge to each cut; by day the ruler's own ink */
  var ink=nt?[30,13,66]:F.ink.d,inkA=nt?.86:F.inkA,lit=nt?[196,178,246]:[255,255,255],litA=nt?.2:(F.ink.d[0]>200?0:.55),s=u;
  function cut(fn){g.save();g.translate(.7*s,.9*s);fn(rgba(lit,litA),true);g.restore();fn(rgba(ink,inkA),false);}
  /* no rings: her words, "I want the circle removed from the drawing and only leave the star design in the middle only" */
  /* her picture's star, in the ruler's ink: each point's two halves, one in the full ink, the other a little lighter, as a cut's two walls */
  var Rr=HUBR*u*.7,T=starTris(c0,Rr);
  cut(function(st,isLit){T.forEach(function(t){triPath(g,t,0,0);if(isLit){g.fillStyle=st;}else{g.fillStyle=rgba(ink,inkA*(t.lit?.62:1));}g.fill();});});
  /* the point at its heart: the band's metal left standing in the cut, ringed by it */
  g.fillStyle=rgba(base,1);g.beginPath();g.arc(c0,c0,Rr*.1,0,TAU);g.fill();cut(function(st){g.strokeStyle=st;g.lineWidth=.9*s;g.beginPath();g.arc(c0,c0,Rr*.1,0,TAU);g.stroke();});}
function hubDraw(canvas,F,nt,cen){var S=HUBR*2+8,p=dpr(),N=Math.round(S*p);canvas.width=N;canvas.height=N;canvas.style.width=S+"px";canvas.style.height=S+"px";
  var ck=cenOf(cen);
  var kind=ck==="ball"?"ball":ck==="engine"?"medal":ck==="medal"?"star":"engraved";
  var key="h"+N+F.label+nt+kind;var src=CACHE[key];
  if(!src&&kind==="engraved"){src=cv(N);hubEngraved(src,F,nt,N,S);keep(key,src);}
  if(!src){src=cv(N);var g=src.getContext("2d"),im=g.createImageData(N,N),px=im.data,c0=N/2,u=N/S,R=HUBR*u,n=[0,0,1],col=[0,0,0],x,y,dx,dy,r,ex,ey,j;
    for(y=0;y<N;y++)for(x=0;x<N;x++){dx=x+.5-c0;dy=y+.5-c0;r=Math.sqrt(dx*dx+dy*dy);if(r>R+1)continue;ex=r?dx/r:0;ey=r?dy/r:0;j=(y*N+x)*4;
      if(kind==="ball"){var q=r/R,z=Math.sqrt(Math.max(.02,1-q*q*.9));n[0]=ex*q*.95;n[1]=ey*q*.95;n[2]=z;var l=Math.sqrt(n[0]*n[0]+n[1]*n[1]+n[2]*n[2]);shade(n[0]/l,n[1]/l,n[2]/l,F.hubM,.1,nt,col);
        if(Math.abs(q-.5)<.035){col[0]*=.84;col[1]*=.84;col[2]*=.86;}}
      else{if(r>R*.84){dome(ex,ey,r,R*.84,R,1.1,n);shade(n[0],n[1],n[2],F.caseM,.05,nt,col);}
        else{dome(ex,ey,r,0,R*.84,.16,n);shade(n[0],n[1],n[2],F.hubM,.2,nt,col);}}
      put(px,j,col,Math.min(1,R+.5-r));}
    g.putImageData(im,0,0);
    if(kind==="star"){var SC=nt?PIC_STAR.n:PIC_STAR.d,LT=mix(SC,[255,255,255],.35),DK=mix(SC,[0,0,0],.35),c1=N/2;
      /* the star of her picture: four long points and four short, each a lit half and a shaded half, a point of light at its heart */
      var point=function(a,len,wd){var ux=Math.cos(a),uy=Math.sin(a),vx=-uy,vy=ux;var tip=[c1+ux*len,c1+uy*len],b1=[c1+vx*wd,c1+vy*wd],b2=[c1-vx*wd,c1-vy*wd],lit=(vx*-LXY[0]+vy*-LXY[1])>0;
        g.fillStyle=rgba(lit?LT:DK,1);g.beginPath();g.moveTo(c1,c1);g.lineTo(tip[0],tip[1]);g.lineTo(b1[0],b1[1]);g.closePath();g.fill();
        g.fillStyle=rgba(lit?DK:LT,1);g.beginPath();g.moveTo(c1,c1);g.lineTo(tip[0],tip[1]);g.lineTo(b2[0],b2[1]);g.closePath();g.fill();};
      var Rr=HUBR*u*.7;for(var k=0;k<4;k++)point(-Math.PI/2+k*Math.PI/2+Math.PI/4,Rr*.48,Rr*.11);for(var k2=0;k2<4;k2++)point(-Math.PI/2+k2*Math.PI/2,Rr,Rr*.17);
      g.fillStyle=rgba(mix(SC,[255,255,255],.75),1);g.beginPath();g.arc(c1,c1,Rr*.1,0,TAU);g.fill();}
    keep(key,src);}
  var gg=canvas.getContext("2d");gg.clearRect(0,0,N,N);gg.drawImage(src,0,0);}
/* the index at the top: a polished point in the case's metal */
function indexDraw(canvas,F,nt){var S=26,p=dpr(),N=Math.round(S*p);canvas.width=N;canvas.height=Math.round(20*p);canvas.style.width=S+"px";canvas.style.height="20px";
  var g=canvas.getContext("2d"),w=N,h=canvas.height,M=nt?F.caseM.n:F.caseM.d,L=mix(M,[255,255,255],nt?.35:.6),Dd=mix(M,[0,0,0],.45);
  g.fillStyle=rgba(L,1);g.beginPath();g.moveTo(w*.08,h*.08);g.lineTo(w*.5,h*.08);g.lineTo(w*.5,h*.92);g.closePath();g.fill();
  g.fillStyle=rgba(Dd,1);g.beginPath();g.moveTo(w*.92,h*.08);g.lineTo(w*.5,h*.08);g.lineTo(w*.5,h*.92);g.closePath();g.fill();
  g.strokeStyle=rgba(mix(M,[0,0,0],.6),.7);g.lineWidth=p*.8;g.beginPath();g.moveTo(w*.08,h*.08);g.lineTo(w*.92,h*.08);g.lineTo(w*.5,h*.92);g.closePath();g.stroke();}

/* ---------- the styles ---------- */
var CSS=[
".tq{position:relative;width:calc(460px * var(--tq-k,1));height:calc(460px * var(--tq-k,1));-webkit-user-select:none;user-select:none;-webkit-tap-highlight-color:transparent;touch-action:none}",
".tq-stage{position:absolute;left:0;top:0;width:460px;height:460px;transform-origin:0 0;transform:scale(var(--tq-k,1));perspective:1150px;perspective-origin:50% 46%}",
".tq-tilt,.tq-platez,.tq-plate,.tq-port,.tq-up{position:absolute;transform-style:preserve-3d}",
".tq-tilt{left:0;top:0;width:460px;height:460px;will-change:transform}",
".tq-rise{position:absolute;left:0;top:0;width:460px;height:460px;transform-style:preserve-3d;animation:tqRise 1s cubic-bezier(.2,.9,.25,1) both}",
"@keyframes tqRise{0%{opacity:0;transform:translateZ(-50px) scale(.9)}60%{opacity:1;transform:translateZ(4px) scale(1.012)}100%{opacity:1;transform:none}}",
".tq canvas{display:block;position:absolute;pointer-events:none}",
".tq-shadow{position:absolute;left:28px;top:40px;width:420px;height:420px;border-radius:50%;transform:translateZ(-30px);pointer-events:none;",
"  background:radial-gradient(closest-side,rgba(52,26,104,.36),rgba(52,26,104,.2) 55%,rgba(52,26,104,.06) 82%,rgba(52,26,104,0))}",
".tq.tq-night .tq-shadow{background:radial-gradient(closest-side,rgba(0,0,0,.72),rgba(0,0,0,.42) 55%,rgba(0,0,0,.12) 82%,rgba(0,0,0,0))}",
".tq-case{left:5px;top:5px;width:450px;height:450px}",
".tq-platez{left:60px;top:60px;width:340px;height:340px;transform:translateZ(8px)}",
".tq-plate{left:0;top:0;width:340px;height:340px;will-change:transform}",
".tq-face{left:0;top:0;width:340px;height:340px}",
".tq-light{left:0;top:0;width:340px;height:340px;transform:translateZ(.6px)}",
".tq-port{left:170px;top:170px;width:0;height:0}",
".tq-up{left:0;top:0;width:0;height:0}",
".tq-well{transform:translate(-59px,-59px) translateZ(1.2px)}",
".tq-lens{position:absolute;left:-56px;top:-56px;width:112px;height:112px;padding:0;margin:0;border:0;border-radius:50%;background:none;cursor:pointer;outline:none;",
"  transform:translateZ(11px) translateY(var(--ty,0px)) scale(var(--ts,1));transition:transform .32s cubic-bezier(.34,1.4,.64,1);transform-style:flat}",
".tq-lens.tq-cap{cursor:grab;transform:translateZ(3px)}",
".tq-lens canvas{left:0;top:0}",
".tq-lens canvas.tq-bez{transform:translateZ(.6px)}",".tq-lens canvas.tq-floor{left:0;top:0;transform:translateZ(-.4px)}",
".tq-ball{position:absolute;left:0;top:0;width:112px;height:112px;pointer-events:none;transform:translate(var(--px,0px),var(--py,0px))}",
".tq-ballw{position:absolute;border-radius:50%;overflow:hidden;pointer-events:none}",".tq-ballw canvas.tq-body{transform:translate(var(--bx,0px),var(--by,0px))}",".tq-lens canvas.tq-edge{left:0;top:0}",
".tq-lens canvas.tq-spark{left:22px;top:20px;transform:translate(var(--gx,0px),var(--gy,0px)) translateZ(.5px)}",
".tq-lens:hover{--ty:-3px;--ts:1.05}",
".tq-lens.tq-down{--ty:1px;--ts:.94;transition-duration:.07s}",
".tq-lens:focus-visible{box-shadow:0 0 0 3px #6a3fb5}",
".tq-hub{position:absolute;left:192px;top:192px;width:76px;height:76px;padding:0;margin:0;border:0;border-radius:50%;background:none;cursor:pointer;outline:none;",
"  transform:translateZ(20px) translateY(var(--ty,0px)) scale(var(--ts,1));transition:transform .32s cubic-bezier(.34,1.4,.64,1)}",
".tq-hub canvas{left:0;top:0}",
".tq-hub.tq-flat{transform:translateZ(9px)}",".tq-hub.tq-flat:hover,.tq-hub.tq-flat.tq-down{--ty:0px;--ts:1}",
".tq-hub canvas.tq-estar{transform:translateZ(.6px) rotate(var(--ea,0deg))}",
".tq-hub:hover{--ty:-2px;--ts:1.04}.tq-hub.tq-down{--ty:1px;--ts:.93;transition-duration:.07s}",
".tq-hub:focus-visible{box-shadow:0 0 0 3px #6a3fb5}",
".tq-index{left:217px;top:24px;transform:translateZ(14px) translateY(var(--iy,0px))}",
".tq-names{position:absolute;left:0;top:0;width:460px;height:460px;transform:translateZ(16px);pointer-events:none}",
".tq-tag{position:absolute;transform:translate(-50%,-50%);font:600 10.5px/1.15 "+SANS+";letter-spacing:.14em;text-transform:uppercase;white-space:nowrap;pointer-events:auto;cursor:pointer;",
"  color:#2e1764;text-shadow:0 1px 0 rgba(255,255,255,.6);transition:opacity .3s ease}",
".tq.tq-night .tq-tag{color:#e6dcfa;text-shadow:0 1px 0 rgba(0,0,0,.65)}",
".tq.tq-moving .tq-tag{opacity:0;pointer-events:none;transition-duration:.12s}",
".tq-plate.tq-grab{cursor:grabbing}",
/* the runs of light round the rim and the band, and the rings of light where a press lands (Vocatio's compass's ripple) */
".tq-fx{left:0;top:0;transform:translateZ(.4px)}",
".tq-rips{position:absolute;left:5px;top:5px;width:450px;height:450px;border-radius:50%;overflow:hidden;pointer-events:none;transform:translateZ(17px)}",
".tq-ripple{position:absolute;width:210px;height:210px;border-radius:50%;pointer-events:none;background:radial-gradient(closest-side,rgba(255,255,255,0) 52%,rgba(250,246,255,.5) 70%,rgba(255,255,255,0) 100%);animation:tqRip .9s cubic-bezier(.2,.7,.3,1) both}",
".tq.tq-night .tq-ripple{background:radial-gradient(closest-side,rgba(214,198,255,0) 52%,rgba(214,198,255,.34) 70%,rgba(214,198,255,0) 100%)}",
"@keyframes tqRip{0%{transform:scale(.12);opacity:.95}100%{transform:scale(1.6);opacity:0}}",
"@media (prefers-reduced-motion:reduce){.tq-rise{animation:none}.tq-lens,.tq-hub{transition:none}.tq-ripple{display:none}}",
"body[data-motion=\"minimal\"] .tq-rise{animation:none}body[data-motion=\"minimal\"] .tq-ripple{display:none}"
].join("\n");
function addCss(){if(D.getElementById("tq-css"))return;var s=D.createElement("style");s.id="tq-css";s.textContent=CSS;D.head.appendChild(s);}

/* ---------- the sounds (second draft). Her words: "I dislike the sound effect, they sound too chirpy and childish, the sound is a bit
   irritating." The first draft's two sounds of its own were notes that slid in pitch (880 to 520 Hz for a press, 2400 to 1700 Hz for a
   tick): the slide is the chirp. Every sound here is Ingenium's own kind, a key's short breath of noise over its own low note that never
   slides (r176's tap()). In Ingenium its sound engine plays them, so they follow her Sound settings (on or off, the level, the key and
   touch sounds she chose, the calm look); where the engine is absent (a preview) the same parts play here, at Ingenium's level (0.55),
   through the same soft edge. Three sets: Ingenium's keys (the key's press; the softer key for a knock on the band, the rim or the plate;
   the touch sound for a tick at each port), a watch's bezel (finer and drier) and felt (lower and muffled). A tick waits 55 thousandths of
   a second for the one before, and is quieter the faster the plate turns. ---------- */
var SETS={keys:{press:[.29,740,.055],knock:[.20,600,.06],tick:[.082,1500,.02]},
  bezel:{press:[.15,1900,.03,.3],knock:[.12,1400,.035,.3],tick:[.05,3000,.009,0]},
  felt:{press:[.26,420,.075],knock:[.22,340,.08],tick:[.06,820,.018]}};
var SOUND={set:"keys",level:.55},AC=null,OUT=null;
function softEdge(){var n=2049,k=new Float32Array(n);for(var i=0;i<n;i++){var x=i*2/(n-1)-1,a=Math.abs(x);k[i]=a<=.8?x:(x<0?-1:1)*(.8+.17*Math.tanh((a-.8)/.17));}return k;}
function actx(){if(!AC){try{var C=W.AudioContext||W.webkitAudioContext;if(!C)return null;AC=new C();OUT=AC.createGain();OUT.gain.value=1;
    try{var sh=AC.createWaveShaper();sh.curve=softEdge();sh.oversample="none";OUT.connect(sh);sh.connect(AC.destination);}catch(x){OUT.connect(AC.destination);}}catch(e){AC=null;return null;}}
  if(AC.state!=="running"){try{var pr=AC.resume();if(pr&&pr.catch)pr.catch(function(){});}catch(e){}}return AC;}
/* a key's noise over its own low note: [peak, the noise's centre in Hz, how long in seconds, the low note as a share of the centre (0 for none)] */
function tap(v,L){var c=actx();if(!c||!v)return;var peak=v[0]*L,cut=v[1],dur=v[2],low=v.length>3?v[3]:.35,t=c.currentTime+.02;
  try{var n=Math.max(2,Math.floor(c.sampleRate*dur)),buf=c.createBuffer(1,n,c.sampleRate),d=buf.getChannelData(0);for(var i=0;i<n;i++)d[i]=(Math.random()*2-1)*Math.pow(1-i/n,3);
    var s=c.createBufferSource();s.buffer=buf;var bp=c.createBiquadFilter();bp.type="bandpass";bp.frequency.value=cut;bp.Q.value=.9;var g=c.createGain();g.gain.value=peak;
    s.connect(bp);bp.connect(g);g.connect(OUT);s.start(t);
    if(low>0){var o=c.createOscillator();o.type="sine";o.frequency.value=cut*low;var og=c.createGain();og.gain.setValueAtTime(peak*.7,t);og.gain.exponentialRampToValueAtTime(.0001,t+dur);
      o.connect(og);og.connect(OUT);o.start(t);o.stop(t+dur+.01);}}catch(e){}}
function sound(kind,k){if(SOUND.set==="off")return;
  if(SOUND.set==="keys"&&W.IngSound){try{
    if(kind==="press"&&typeof IngSound.play==="function"){IngSound.play("keys");return;}
    if(kind==="knock"&&typeof IngSound.voice==="function"){var kv="softKey";try{var c0=typeof IngSound.config==="function"?IngSound.config():null;if(c0&&c0.keys==="keysOff")kv="";}catch(x){}if(kv)IngSound.voice(kv);return;}
    if(kind==="tick"&&typeof IngSound.voice==="function"){var hv="keyTouch";try{var c1=typeof IngSound.config==="function"?IngSound.config():null;if(c1&&c1.hover)hv=c1.hover;}catch(x){}if(hv!=="touchOff")IngSound.voice(hv);return;}}catch(e){}}
  var set=SETS[SOUND.set]||SETS.keys;tap(set[kind],SOUND.level*(k==null?1:k));}
var lastTick=0;
function tick(v){var now=performance.now();if(now-lastTick<55)return;lastTick=now;sound("tick",1-Math.min(.5,Math.abs(v||0)/2000));}

/* ---------- the toy ---------- */
function mount(scene,opts){addCss();opts=opts||{};
  var T={finish:opts.finish&&FIN[opts.finish]?opts.finish:"sun",night:!!opts.night,centre:cenOf(opts.centre),models:(opts.models||[]).slice(0,5),gb:+opts.gb||0,
    turn:0,v:0,goal:null,mode:"rest",raf:0,lt:0,ports:[],P:5,hold:0,hx:0,hy:0,lx:0,ly:0,vx:0,vy:0,tH:0,h:0,iy:0,ivy:0,lastDet:null,moving:false,
    kz:0,kv:0,over:0,wA:0,wA0:0,wP:0,wT:0,runs:[],fxOn:false,idle:0,seen:true};
  var root=D.createElement("div");root.className="tq";root.setAttribute("role","group");root.setAttribute("aria-label","The turret, to play with: it loads nothing");
  var stage=D.createElement("div");stage.className="tq-stage";var tilt=D.createElement("div");tilt.className="tq-tilt";var rise=D.createElement("div");rise.className="tq-rise";
  var shadow=D.createElement("i");shadow.className="tq-shadow";
  var cCase=D.createElement("canvas");cCase.className="tq-case";var cFx=D.createElement("canvas");cFx.className="tq-fx";
  var platez=D.createElement("div");platez.className="tq-platez";var plate=D.createElement("div");plate.className="tq-plate";
  var cFace=D.createElement("canvas");cFace.className="tq-face";var cLight=D.createElement("canvas");cLight.className="tq-light";
  var hub=D.createElement("button");hub.type="button";hub.className="tq-hub";hub.setAttribute("aria-label","Spin the turret round");var cHub=D.createElement("canvas");hub.appendChild(cHub);
  var cIdx=D.createElement("canvas");cIdx.className="tq-index";var names=D.createElement("div");names.className="tq-names";names.setAttribute("aria-hidden","true");
  var rips=D.createElement("div");rips.className="tq-rips";rips.setAttribute("aria-hidden","true");
  plate.appendChild(cFace);platez.appendChild(plate);platez.appendChild(cLight);
  rise.appendChild(shadow);rise.appendChild(cCase);rise.appendChild(cFx);rise.appendChild(platez);rise.appendChild(cIdx);rise.appendChild(hub);rise.appendChild(names);rise.appendChild(rips);
  tilt.appendChild(rise);stage.appendChild(tilt);root.appendChild(stage);scene.appendChild(root);
  function F(){return FIN[T.finish];}
  function step(){return 360/T.P;}
  /* the drawing */
  function measure(){var r=stage.getBoundingClientRect(),k=r.width/460;return k>.05&&isFinite(k)?k:1;}
  function drawAll(){KS=measure();T.kDrawn=KS;var f=F(),nt=T.night,p=dpr();root.classList.toggle("tq-night",nt);
    var nC=Math.round(450*p);cCase.width=nC;cCase.height=nC;cCase.style.width="450px";cCase.style.height="450px";
    var src=caseLayer(f,nt,Math.round(460*p),T.gb);var g=cCase.getContext("2d");g.clearRect(0,0,nC,nC);g.drawImage(src,-Math.round(5*p),-Math.round(5*p));
    var nP=Math.round(340*p);[cFace,cLight].forEach(function(c){c.width=nP;c.height=nP;c.style.width="340px";c.style.height="340px";});
    var fl=T.centre==="star";cFace.getContext("2d").clearRect(0,0,nP,nP);cLight.getContext("2d").clearRect(0,0,nP,nP);cFace.getContext("2d").drawImage(plateFace(f,nt,nP,fl),0,0);cLight.getContext("2d").drawImage(plateLight(f,nt,nP,fl),0,0);
    hubDraw(cHub,f,nt,T.centre);engSet();indexDraw(cIdx,f,nt);
    T.ports.forEach(function(pt){drawPort(pt);});KS=1;}
  function wellR(){return Math.min(58,102*Math.sin(Math.PI/T.P)-2);}
  function drawPort(pt){var kk=KS;KS=T.kDrawn||measure();var f=F(),nt=T.night,p=dpr(),N=Math.round(WELL*p);pt.well.width=N;pt.well.height=N;pt.well.style.width=WELL+"px";pt.well.style.height=WELL+"px";
    /* no well under the holders (her picture, 15 November 2026, after "Please also remove the weird faded blurred lines that are around the gem
       balls"): the well sat above the plate's own light, so it never took the plate's shading and showed as a soft halo round every
       cartridge, pale round the empty ones, dark round the balls; each holder now sits straight on the plate's metal */
    pt.well.getContext("2d").clearRect(0,0,N,N);lensDraw(pt.lc,f,nt,pt.kind,pt.color,null,!!pt.body);if(pt.body){ballDraw(pt,nt);floorDraw(pt.floor,f,nt);}if(pt.spark)sparkDraw(pt.spark);KS=kk;}
  function build(){T.ports.forEach(function(pt){if(pt.el.parentNode)pt.el.parentNode.removeChild(pt.el);});T.ports=[];
    T.P=Math.max(5,Math.min(6,T.models.length+(T.models.length>=5?1:0)));if(T.models.length<5)T.P=5;
    for(var i=0;i<T.P;i++){var m=T.models[i]||null,kind=m?"lens":"cap",el=D.createElement("div");el.className="tq-port";var up=D.createElement("div");up.className="tq-up";
      var well=D.createElement("canvas");well.className="tq-well";var b=D.createElement("button");b.type="button";b.className="tq-lens"+(kind==="cap"?" tq-cap":"");
      b.setAttribute("aria-label",m?("Turn "+m.name+" to the top"):"A cap: turn it to the top");var lc=D.createElement("canvas");b.appendChild(lc);var sp=null;
      var bw=null,bd=null,ed=null,bl=null,fl=null;if(m){bl=D.createElement("span");bl.className="tq-ball";bw=D.createElement("span");bw.className="tq-ballw";bd=D.createElement("canvas");bd.className="tq-body";bw.appendChild(bd);bl.appendChild(bw);
        ed=D.createElement("canvas");ed.className="tq-edge";bl.appendChild(ed);sp=D.createElement("canvas");sp.className="tq-spark";bl.appendChild(sp);
        /* the cup floor, then the ball, then the holder on top: the ball rolls under the holder's lip, so the ring stays whole and round */
        fl=D.createElement("canvas");fl.className="tq-floor";b.insertBefore(fl,lc);b.insertBefore(bl,lc);lc.className="tq-bez";}
      up.appendChild(well);up.appendChild(b);el.appendChild(up);plate.appendChild(el);
      var pt={i:i,el:el,up:up,well:well,btn:b,lc:lc,spark:sp,ball:bl,bw:bw,body:bd,edge:ed,floor:fl,bx:0,by:0,bvx:0,bvy:0,hov:0,kind:kind,color:m?m.color:"#6a3fb5",name:m?m.name:""};T.ports.push(pt);wirePort(pt);}
    while(names.firstChild)names.removeChild(names.firstChild);
    T.ports.forEach(function(pt){if(pt.kind!=="lens")return;var tg=D.createElement("span");tg.className="tq-tag";tg.textContent=pt.name;tg.__pt=pt;names.appendChild(tg);pt.tag=tg;});
    place();drawAll();}
  /* where things stand: the plate turned, each port upright, the names beside their lenses */
  function place(){var t=T.turn;plate.style.transform="rotate("+t.toFixed(3)+"deg)";
    T.ports.forEach(function(pt){var a=(-90+pt.i*step())*Math.PI/180;pt.el.style.transform="translate("+(Math.cos(a)*102).toFixed(2)+"px,"+(Math.sin(a)*102).toFixed(2)+"px)";
      pt.up.style.transform="rotate("+(-t).toFixed(3)+"deg)";});}
  function names_(){T.ports.forEach(function(pt){if(!pt.tag)return;var a=(-90+pt.i*step()+T.turn)*Math.PI/180,ca=Math.cos(a),sa=Math.sin(a),top=sa<-.93;
      pt.tag.style.display=top?"none":"";var rr=188;pt.tag.style.left=(230+ca*rr).toFixed(1)+"px";pt.tag.style.top=(230+sa*rr).toFixed(1)+"px";});}
  /* the engine star: drawn over the medallion when the centre is the engine; it turns as the logo's engine does and spins once when pressed */
  var cEng=null,engSpin=null;
  function engSet(){var kk0=KS;KS=T.kDrawn||measure();try{engSet0();}finally{KS=kk0;}}
  function engSet0(){hub.classList.toggle("tq-flat",T.centre==="star");if(T.centre!=="engine"){if(cEng&&cEng.parentNode)cEng.parentNode.removeChild(cEng);cEng=null;return;}
    if(!cEng){cEng=D.createElement("canvas");cEng.className="tq-estar";hub.appendChild(cEng);}engineDraw(cEng,T.night);}
  function engFrame(st){if(!cEng)return;var a=0;if(!st){var calm=D.body.getAttribute("data-motion")==="calm",Ts=calm?13:9,t=performance.now()/1000,f=(t%Ts)/Ts,k=Math.min(4,Math.floor(f/.22));
      a=f>=.88?360:(k+EN((f-k*.22)/.22))*90;if(engSpin){var e=(performance.now()-engSpin.t)/1000;if(e<1.2)a+=engSpin.d*360*ESP(e/1.15);else engSpin=null;}}
    cEng.style.setProperty("--ea",(a%360).toFixed(2)+"deg");}
  function engPress(){if(cEng&&!still()){engSpin={t:performance.now(),d:Math.random()<.5?-1:1};wake();}}
  /* light running both ways round a ring from where a press landed, fading as it goes (the rim's polish, the band) */
  function run(p,r,w,al){T.runs.push({a:Math.atan2(p.y-230,p.x-230),r:r,w:w,al:al,t:0});}
  function drawRuns(dt){var kk=KS;KS=T.kDrawn||1;var p=dpr();KS=kk;var N=Math.round(460*p);if(cFx.width!==N){cFx.width=N;cFx.height=N;cFx.style.width="460px";cFx.style.height="460px";}
    var g=cFx.getContext("2d");g.setTransform(1,0,0,1,0,0);g.clearRect(0,0,N,N);
    T.runs=T.runs.filter(function(R){R.t+=dt;return R.t<1;});T.fxOn=T.runs.length>0;if(!T.fxOn)return;
    g.setTransform(p,0,0,p,0,0);g.lineCap="butt";var lc=T.night?"226,214,255":"255,255,255";
    T.runs.forEach(function(R){var q=R.t,head=(1-Math.pow(1-q,3))*Math.PI*1.02,fade=1-sst(.5,1,q),tail=.6,n=12;
      for(var k=0;k<n;k++){var b0=head-tail*k/n,b1=head-tail*(k+1)/n;if(b0<=0)break;if(b1<0)b1=0;var al=R.al*fade*(1-k/n);if(al<.004)continue;
        g.strokeStyle="rgba("+lc+","+al.toFixed(3)+")";g.lineWidth=R.w;
        g.beginPath();g.arc(230,230,R.r,R.a+b1,R.a+b0);g.stroke();g.beginPath();g.arc(230,230,R.r,R.a-b0,R.a-b1);g.stroke();}});}
  /* the motion: one clock for the turn (a spring, or a flick that slows and settles into a detent), the depth, the sway, the lean, the
     wobble, the runs of light and the index */
  function detentOf(t){return Math.round(t/step());}
  function loop(ts){T.raf=0;var dt=T.lt?Math.min(.034,(ts-T.lt)/1000):.016;T.lt=ts;var st=still();
    if(T.mode==="coast"){var sgn=T.v>0?1:-1,dec=(110+Math.abs(T.v)*.55)*dt;T.v=Math.abs(T.v)<=dec?0:T.v-sgn*dec;T.turn+=T.v*dt;
      if(Math.abs(T.v)<85){T.mode="spring";var tg=detentOf(T.turn+T.v*.12)*step();T.goal=tg;}}
    else if(T.mode==="spring"){var a=46*(T.goal-T.turn)-10.4*T.v;T.v+=a*dt;T.turn+=T.v*dt;if(Math.abs(T.goal-T.turn)<.03&&Math.abs(T.v)<.08){T.turn=T.goal;T.v=0;T.mode="rest";settle();}}
    if(T.mode!=="rest"&&T.mode!=="drag"){place();var dn=detentOf(T.turn);if(T.lastDet!==null&&dn!==T.lastDet){tick(T.v);T.ivy-=30;}T.lastDet=dn;}
    /* the index nods at each port that passes it */
    T.ivy+=(-260*T.iy-16*T.ivy)*dt;T.iy+=T.ivy*dt;cIdx.style.setProperty("--iy",Math.max(-4.5,Math.min(4.5,T.iy*1.3)).toFixed(2)+"px");
    if(!st){
      /* the depth: a little lifted under the pointer, down while it is pressed; a press sinks it further and it springs back */
      var kzT=T.over&&!G?3:0;T.kv+=(-190*(T.kz-kzT)-15*T.kv)*dt;T.kz+=T.kv*dt;
      /* the sway and the lean */
      T.tH+=dt;T.h+=((T.hold?1:0)-T.h)*Math.min(1,dt*4);var w=T.tH*TAU/11,iy=7.5*Math.sin(w),ix=-3*Math.sin(w),ty=T.hold?T.hx*22:0,tx=T.hold?-T.hy*16:0;
      T.vy+=(62*(ty-T.ly)-11*T.vy)*dt;T.ly+=T.vy*dt;T.vx+=(62*(tx-T.lx)-11*T.vx)*dt;T.lx+=T.vx*dt;var k=1-.7*T.h,RX=ix*k+T.lx,RY=iy*k+T.ly;
      /* the wobble of a coin settling: its low side runs round, faster as it calms */
      if(T.wA>.03){T.wT+=dt;var q=1-T.wA/T.wA0,env=sst(0,.16,T.wT);T.wP+=TAU*(.9+1.5*q)*dt;T.wA*=Math.exp(-dt/.95);RX+=-T.wA*env*Math.sin(T.wP);RY+=T.wA*env*Math.cos(T.wP);}else T.wA=0;
      tilt.style.transform="translateZ("+T.kz.toFixed(2)+"px) rotateX("+RX.toFixed(3)+"deg) rotateY("+RY.toFixed(3)+"deg)";shadow.style.transform="translateZ("+(-30-T.kz).toFixed(2)+"px)";
      root.style.setProperty("--gx",(RY*.45).toFixed(2)+"px");root.style.setProperty("--gy",(-RX*.45).toFixed(2)+"px");
      if(T.runs.length||T.fxOn)drawRuns(dt);engFrame(false);ballFrame(dt);}
    else{tilt.style.transform="";shadow.style.transform="";engFrame(true);}
    if(visible()&&(!st||T.mode!=="rest"||Math.abs(T.ivy)>.01)){if(!st&&calm()){T.idle=setTimeout(function(){T.idle=0;if(!T.raf&&visible())T.raf=requestAnimationFrame(loop);},24);}
      else T.raf=requestAnimationFrame(loop);}else T.lt=0;}
  function visible(){return root.isConnected&&root.offsetParent!==null&&T.seen!==false&&!D.hidden;}
  /* 7.16 (her words, 15 November 2026: "Ingenium is possibly overheating my phone ... I want my 3D graphics and animations to be preserved and
     run smoothly"): the toy draws only while it is on screen and the window is shown (it is told when it comes back, instead of looking
     every 0.6 s), and while nothing but its slow sway moves (about 4 degrees a second at most) it draws thirty frames a second instead of
     every frame the screen offers: the same motion, half the work or less; a touch, a turn or a press is drawn at the full rate at once */
  function wake(){if(T.raf>0)return;if(T.idle){clearTimeout(T.idle);T.idle=0;}if(visible())T.raf=requestAnimationFrame(loop);}
  function calm(){if(G||T.over||T.hold||T.h>.01||T.mode!=="rest"||T.wA>0||T.runs.length||T.fxOn||engSpin||Math.abs(T.kv)>.4||Math.abs(T.kz)>.05||Math.abs(T.ivy)>.3||
      Math.abs(T.vx)>.05||Math.abs(T.vy)>.05)return false;
    for(var i=0;i<T.ports.length;i++){var pt=T.ports[i];if(pt.hov||Math.abs(pt.bvx||0)+Math.abs(pt.bvy||0)>.05||Math.abs(pt.bx||0)+Math.abs(pt.by||0)>.02)return false;}return true;}
  try{if(W.IntersectionObserver)new IntersectionObserver(function(es){T.seen=es[es.length-1].isIntersecting;if(T.seen)wake();}).observe(root);}catch(e){}
  D.addEventListener("visibilitychange",function(){if(!D.hidden)wake();});
  function moving(on){if(T.moving!==on){T.moving=on;root.classList.toggle("tq-moving",on);}}
  function settle(){moving(false);names_();}
  function turnTo(goal){if(still()){var n=Math.round(Math.abs(goal-T.turn)/step());T.turn=goal;T.v=0;T.mode="rest";place();if(n)tick(0);settle();return;}
    T.goal=goal;T.mode="spring";moving(true);T.lastDet=detentOf(T.turn);wake();}
  function toTop(i){var s=step(),cur=T.turn,target=-i*s,d=((target-cur)%360+540)%360-180;turnTo(cur+d);}
  function whirl(){if(still()){toTop(0);return;}T.mode="coast";T.v=-640;moving(true);T.lastDet=detentOf(T.turn);wake();}
  /* where a press lands, in the stage's own measure (460 across), and the part it lands on */
  function local(e){var r=stage.getBoundingClientRect(),k=r.width/460||1;return {x:(e.clientX-r.left)/k,y:(e.clientY-r.top)/k};}
  function angleAt(e){var p=local(e);return Math.atan2(p.y-230,p.x-230)*180/Math.PI;}
  function portOf(b){var f=null;T.ports.forEach(function(x){if(x.btn===b)f=x;});return f;}
  function onIndex(p){return Math.abs(p.x-230)<=15&&p.y>=18&&p.y<=48;}
  function partAt(e,p){var t=e.target,dx=p.x-230,dy=p.y-230,r=Math.sqrt(dx*dx+dy*dy),b,tg;
    if(t&&t.closest){if(t.closest(".tq-hub"))return {part:"hub",r:r};b=t.closest(".tq-lens");if(b&&portOf(b))return {part:"lens",pt:portOf(b),r:r};
      tg=t.closest(".tq-tag");if(tg&&tg.__pt)return {part:"name",pt:tg.__pt,r:r};}
    if(onIndex(p))return {part:"index",r:r};
    return r<=171?{part:"plate",r:r}:r<=205?{part:"band",r:r}:r<=226?{part:"case",r:r}:null;}
  /* a press: the surface answers at once, with its light, its depth and its sound; what turns the plate waits for the release, so that a
     press can become a drag */
  function dip(dx,dy,K){T.vy+=dx*K;T.vx+=-dy*K;}
  function ripple(p){var r=D.createElement("i");r.className="tq-ripple";r.style.left=(p.x-110).toFixed(1)+"px";r.style.top=(p.y-110).toFixed(1)+"px";rips.appendChild(r);
    setTimeout(function(){if(r.parentNode)r.parentNode.removeChild(r);},950);}
  function feel(h,p){var dx=(p.x-230)/230,dy=(p.y-230)/230,pt=h.part;
    sound(pt==="band"||pt==="case"||pt==="plate"?"knock":"press");
    if(still())return;ripple(p);
    if(pt==="band"){if(T.wA>.5){T.wA=Math.min(6.5,T.wA+3);T.wA0=Math.max(T.wA0,T.wA);}else{T.wA0=T.wA=5;T.wT=0;T.wP=Math.atan2(dy,dx);}run(p,188,26,.16);run(p,188,2.5,.45);}
    else if(pt==="case"){T.kv-=150;dip(dx,dy,25);run(p,222,3.5,.7);run(p,213,6,.2);}
    else if(pt==="index"){T.ivy-=110;T.kv-=50;}
    else if(pt==="hub"){T.kv-=110;engPress();}
    else{dip(dx,dy,pt==="plate"?55:40);T.kv-=60;if(pt==="lens")ballKick(h.pt);}
    wake();}
  var G=null;
  stage.addEventListener("pointerdown",function(e){if(e.button!==0||G)return;var p=local(e),h=partAt(e,p);if(!h)return;
    feel(h,p);if(h.part==="hub")return;   /* the centre's own key whirls the plate (its click) */
    /* a plate spinning fast is caught by a press; one settling into a port is not, so presses in quick succession each step it on */
    var caught=T.mode==="coast"||(T.mode==="spring"&&Math.abs(T.v)>90);
    G={id:e.pointerId,p:p,h:h,a0:angleAt(e),t0:T.turn,last:[],moved:false,caught:caught};
    if(caught){T.mode="drag";T.v=0;}
    if(h.part==="lens")h.pt.btn.classList.add("tq-down");
    try{stage.setPointerCapture(e.pointerId);}catch(x){}T.lastDet=detentOf(T.turn);wake();});
  stage.addEventListener("pointermove",function(e){var p=local(e);
    if(!G&&e.pointerType==="mouse"){var dx=p.x-230,dy=p.y-230,on=dx*dx+dy*dy<=226*226;if(on!==!!T.over){T.over=on?1:0;wake();}stage.style.cursor=on?(onIndex(p)?"pointer":"grab"):"";}
    var d=G;if(!d||d.id!==e.pointerId)return;var a=angleAt(e),da=((a-d.a0)%360+540)%360-180;
    if(!d.moved&&Math.abs(da)>4&&d.h.r>30){d.moved=true;d.t0=T.turn-da;T.mode="drag";moving(true);stage.style.cursor="grabbing";if(d.h.part==="lens")d.h.pt.btn.classList.remove("tq-down");}
    if(d.moved){T.turn=d.t0+da;place();var now=performance.now();d.last.push([now,T.turn]);while(d.last.length>6)d.last.shift();
      var dn=detentOf(T.turn);if(dn!==T.lastDet){var L=d.last,v=0;if(L.length>=2){var dtm=(L[L.length-1][0]-L[0][0])/1000;if(dtm>0)v=(L[L.length-1][1]-L[0][1])/dtm;}tick(v);T.ivy-=30;}T.lastDet=dn;
      if(Math.abs(da)>150){d.a0=a;d.t0=T.turn;}}});
  stage.addEventListener("pointerleave",function(e){if(e.pointerType==="mouse"&&!G){T.over=0;stage.style.cursor="";}});
  function release(e){var d=G;if(!d||d.id!==e.pointerId)return;G=null;stage.style.cursor="";
    if(d.h.part==="lens")setTimeout(function(){d.h.pt.btn.classList.remove("tq-down");},90);
    if(!d.moved){if(d.caught){T.v=0;T.goal=detentOf(T.turn)*step();T.mode="spring";moving(true);wake();return;}
      if(e.type==="pointercancel")return;var h=d.h;
      var base=T.mode==="spring"&&T.goal!=null?T.goal:detentOf(T.turn)*step();
      if(h.part==="lens"||h.part==="name")toTop(h.pt.i);
      else if(h.part==="index")turnTo(base+step());
      else if(h.part==="plate"){var px=d.p.x-230,py=d.p.y-230;turnTo(base+(px>0?1:-1)*(py<0?1:-1)*step());}
      return;}
    var L=d.last,v=0;if(L.length>=2){var a=L[0],z=L[L.length-1],dtm=(z[0]-a[0])/1000;if(dtm>0)v=(z[1]-a[1])/dtm;}
    if(still()){turnTo(detentOf(T.turn)*step());return;}
    if(Math.abs(v)>120){T.v=Math.max(-1500,Math.min(1500,v));T.mode="coast";}else{T.v=0;T.goal=detentOf(T.turn)*step();T.mode="spring";}moving(true);wake();}
  stage.addEventListener("pointerup",release);stage.addEventListener("pointercancel",release);
  /* the keyboard: the arrow keys turn it one port at a time; Enter and Space on a lens turn it to the top */
  /* the balls: a gentle drift round under the pointer, a rock in the setting when pressed, a spring back to rest */
  function ballKick(pt){if(!pt||!pt.body||still())return;var a=Math.random()*TAU;pt.bvx+=Math.cos(a)*190;pt.bvy+=Math.sin(a)*190;wake();}
  function ballFrame(dt){var t=performance.now()/1000;T.ports.forEach(function(pt){if(!pt.body)return;var tx=0,ty=0;
      if(pt.hov){var w=t*2.4+pt.i*2.1;tx=4.6*Math.cos(w);ty=4.6*Math.sin(w);}
      pt.bvx+=(130*(tx-pt.bx)-6.5*pt.bvx)*dt;pt.bvy+=(130*(ty-pt.by)-6.5*pt.bvy)*dt;pt.bx+=pt.bvx*dt;pt.by+=pt.bvy*dt;
      var m=Math.sqrt(pt.bx*pt.bx+pt.by*pt.by);if(m>7){pt.bx*=7/m;pt.by*=7/m;}
      if(!pt.hov&&m<.02&&Math.abs(pt.bvx)+Math.abs(pt.bvy)<.05){pt.bx=pt.by=pt.bvx=pt.bvy=0;}
      /* the whole ball moves round its cartridge; inside the glass its colours move on a little further, as a rolling marble's turn */
      var k=pt.bx.toFixed(2)+","+pt.by.toFixed(2);if(pt.__bk!==k){pt.__bk=k;pt.ball.style.setProperty("--px",pt.bx.toFixed(2)+"px");pt.ball.style.setProperty("--py",pt.by.toFixed(2)+"px");
        pt.body.style.setProperty("--bx",(pt.bx*.55).toFixed(2)+"px");pt.body.style.setProperty("--by",(pt.by*.55).toFixed(2)+"px");}});}
  function wirePort(pt){var b=pt.btn;
    b.addEventListener("pointerenter",function(e){if(e.pointerType==="mouse"&&!(G&&G.moved)){pt.hov=1;wake();}});
    b.addEventListener("pointerleave",function(e){if(e.pointerType==="mouse")pt.hov=0;});b.addEventListener("keydown",function(e){var base=T.mode==="spring"&&T.goal!=null?T.goal:detentOf(T.turn)*step();
      if(e.key==="ArrowRight"||e.key==="ArrowDown"){e.preventDefault();turnTo(base+step());}
      else if(e.key==="ArrowLeft"||e.key==="ArrowUp"){e.preventDefault();turnTo(base-step());}});
    b.addEventListener("click",function(e){if(e.detail!==0)return;sound("press");ballKick(pt);toTop(pt.i);});}
  hub.addEventListener("pointerdown",function(){hub.classList.add("tq-down");});["pointerup","pointerleave","pointercancel"].forEach(function(t){hub.addEventListener(t,function(){hub.classList.remove("tq-down");});});
  hub.addEventListener("click",function(e){if(e.detail===0){sound("press");engPress();}whirl();});
  /* the lean follows the pointer over the head */
  var over=scene.closest(".tr-head")||scene;
  over.addEventListener("pointermove",function(e){if(e.pointerType!=="mouse")return;var r=stage.getBoundingClientRect();T.hx=Math.max(-.6,Math.min(.6,(e.clientX-(r.left+r.width/2))/r.width));T.hy=Math.max(-.6,Math.min(.6,(e.clientY-(r.top+r.height/2))/r.height));T.hold=1;wake();});
  over.addEventListener("pointerleave",function(){T.hold=0;});
  var rzT=0;function rescale(){clearTimeout(rzT);rzT=setTimeout(function(){if(!root.isConnected)return;var k=measure();if(T.kDrawn&&Math.abs(k-T.kDrawn)/T.kDrawn>.04)drawAll();},180);}
  W.addEventListener("resize",rescale);try{if(W.ResizeObserver)new ResizeObserver(rescale).observe(scene);}catch(e){}
  build();names_();wake();
  return {el:root,set:function(o){var re=false;if(o.finish&&FIN[o.finish]&&o.finish!==T.finish){T.finish=o.finish;re=true;}if(o.night!=null&&!!o.night!==T.night){T.night=!!o.night;re=true;}
      if(o.gb!=null&&+o.gb!==T.gb){T.gb=+o.gb;re=true;}if(o.centre&&cenOf(o.centre)!==T.centre){T.centre=cenOf(o.centre);engSet();re=true;}if(o.models){T.models=o.models.slice(0,5);build();names_();return;}if(re)drawAll();},
    state:function(){return {finish:T.finish,night:T.night,centre:T.centre,balls:T.ports.map(function(pt){return pt.body?{x:+pt.bx.toFixed(2),y:+pt.by.toFixed(2)}:null;}),turn:T.turn,mode:T.mode,P:T.P,top:((Math.round(-T.turn/step())%T.P)+T.P)%T.P,kz:T.kz,wobble:T.wA,runs:T.runs.length,sound:SOUND.set};},
    spin:whirl,toTop:toTop,
    /* the sounds: "keys" (Ingenium's own, the default), "bezel", "felt" or "off"; true and false as on and off */
    sound:function(v){SOUND.set=v===true?"keys":v===false?"off":(SETS[v]||v==="off")?v:"keys";},
    /* a short sample of the sounds chosen: a press, two ticks, a knock */
    sample:function(){sound("press");setTimeout(function(){tick(0);},170);setTimeout(function(){tick(0);},280);setTimeout(function(){sound("knock");},470);}};}
W.IngTurretToy={mount:mount,finishes:function(){return ORDER.map(function(k){return [k,FIN[k].label];});},centres:function(){return CENTRES.map(function(c){return c.slice();});},
  /* a cartridge of the rooms (Your models, Ingenium's models) drawn as the turret's lenses are, in the same finish */
  cartridge:function(canvas,finish,night,color,size){lensDraw(canvas,FIN[finish]||FIN.lilac,!!night,"lens",color,size||84);}};
})();
/* ---------- the toy in Ingenium: it stands in the Models page's head, where the turret of 6.77 stood (modules/r269.js keeps the words
   beside it, the card of what is in the engine, the rooms and the loading; with the toy in place it no longer draws its own turret, draws
   the rooms' cartridges as the toy's lenses are drawn, and loads a model from Your models' Load key alone) ---------- */
(function(){"use strict";
var D=document,W=window,toy=null,P=null,SIGV="",SIGM="",tries=0;
var HOW="The turret is a toy, all of it: press any part of it, or drag it round and let it spin. It loads nothing. Load a model from Your models below.";
function night(){try{return D.body.getAttribute("data-theme")==="night";}catch(e){return false;}}
/* the models the turret held (five at most, the one in the engine among them), as r269 chose them */
function mods(){var a=null;try{a=W.IngModelsTurret&&typeof IngModelsTurret.chosen==="function"?IngModelsTurret.chosen():null;}catch(e){}
  return (a||[]).slice(0,5).map(function(m){return {name:String(m.name||"Model"),color:String(m.color||"#6a3fb5")};});}
/* the scale round the band: this device's memory for a model, as the turret's scale was */
function gb(){try{var s=W.IngTurret&&typeof IngTurret.state==="function"?IngTurret.state():null,a=s?+s.avail:0;return a>0&&isFinite(a)?Math.round(a*10)/10:0;}catch(e){return 0;}}
function sync(){if(!toy)return;var v=(night()?1:0)+"|"+gb(),ms=mods(),m=JSON.stringify(ms);
  if(v!==SIGV){SIGV=v;toy.set({night:night(),gb:gb()});}
  if(m!==SIGM){SIGM=m;toy.set({models:ms});}
  rooms();}
/* the rooms' cartridges (Your models, Ingenium's models): each drawn as the toy's lenses are, in its own colour */
function rooms(){if(!P||!W.IngTurretToy)return;var nt=night();
  [].forEach.call(P.querySelectorAll(".tm-key canvas, .tm-ic canvas, .tm-stage canvas"),function(cv){var k=cv.parentNode,col=(k&&k.getAttribute&&k.getAttribute("data-col"))||"#6a3fb5",
      S=parseFloat(cv.style.width)||cv.clientWidth||56,sg=[col,S,nt?1:0,W.devicePixelRatio||1].join("|");if(cv.__tq===sg)return;cv.__tq=sg;
      try{IngTurretToy.cartridge(cv,"sun",nt,col,S);}catch(e){cv.__tq="";}});}
function mount(){P=D.getElementById("page-models");if(!P||!W.IngTurretToy)return false;var fit=P.querySelector(".tr-head .tr-fit");if(!fit)return false;
  if(!toy){toy=IngTurretToy.mount(fit,{finish:"sun",centre:"star",night:night(),gb:gb(),models:mods()});SIGV=(night()?1:0)+"|"+gb();SIGM=JSON.stringify(mods());}
  else if(toy.el.parentNode!==fit)fit.appendChild(toy.el);
  if(!P.classList.contains("tq-on"))P.classList.add("tq-on");
  var how=P.querySelector(".tr-head .tr-how");if(how&&how.textContent!==HOW)how.textContent=HOW;
  try{if(W.IngModelsTurret&&typeof IngModelsTurret.refresh==="function")IngModelsTurret.refresh();}catch(e){}
  rooms();return true;}
function tick(){if(mount())return;if(++tries<240)setTimeout(tick,500);}
/* r269 tells the toy whenever it paints (the models, the engine, day or night) */
function hook(){if(!W.IngModelsTurret){if(++tries<240)setTimeout(hook,500);return;}
  IngModelsTurret.onPaint=function(){if(!toy)mount();else sync();};tick();}
if(D.readyState==="loading")D.addEventListener("DOMContentLoaded",hook);else hook();
W.IngTurretToy.ing={toy:function(){return toy;},sync:sync,rooms:rooms,how:HOW};
})();

/* ---------- the Models page without endless scrolling: the compact layer approved on the preview, on the page's own markup ----------
   A room opened from its tab folds the turret's head to a band (pressing the band unfolds it); Your models with Health across and Add a
   model beside it; Ingenium's models: the four houses in a row, a house's models on one shelf below them; More models: divider tabs, one
   group at a time, in a drawer; Downloads: a drawer; a model's whole description or its parts in a raised sheet in the window. The page
   draws its lists again whenever models or the engine change, so each part is put back, once, after every drawing. */
(function(){"use strict";
var D=document,W=window,P=null,sheet=null,note=null,wraps=[],openTier="",pickG="",rq=0,mo=null,booted=false;
function $(s,r){return (r||D).querySelector(s);}function $$(s,r){return [].slice.call((r||D).querySelectorAll(s));}
function el(t,c,h){var e=D.createElement(t);if(c)e.className=c;if(h!=null)e.textContent=h;return e;}
function coarse(){try{return !!(W.matchMedia&&matchMedia("(pointer: coarse)").matches);}catch(e){return false;}}
/* the raised sheet */
function openSheet(title,meta,body,keys){if(!sheet)return;while(sheet.firstChild)sheet.removeChild(sheet.firstChild);sheet.appendChild(el("h3","",title));if(meta)sheet.appendChild(el("p","mc-sheet-meta",meta));
  var b=el("div","mc-sheet-body");if(typeof body==="string")b.textContent=body;else if(body)b.appendChild(body);sheet.appendChild(b);
  var k=el("div","mc-sheet-keys");(keys||[]).forEach(function(x){if(x)k.appendChild(x);});var c=el("button","btn","Close");c.type="button";c.addEventListener("click",closeSheet);k.appendChild(c);sheet.appendChild(k);
  sheet.classList.remove("mc-open");void sheet.offsetWidth;sheet.classList.add("mc-open");
  var w=sheet.offsetWidth,main=$(".main")||D.body,r=main.getBoundingClientRect();sheet.style.left=Math.max(16,Math.round(r.left+(r.width-w)/2))+"px";sheet.style.top=Math.round(Math.max(70,innerHeight*.16))+"px";
  try{c.focus({preventScroll:true});}catch(e){}}
function closeSheet(){if(sheet)sheet.classList.remove("mc-open");}
/* a link the row carries (a model's page), copied for the sheet: a link works by itself, as the page's own does */
function link(a){if(!a)return null;var c=a.cloneNode(true);c.removeAttribute("id");return c;}
/* drawers: a hint while more is below; the wheel, or a finger, flips through */
function drawer(listEl,tall){var w=listEl.parentNode;if(!w||!w.classList.contains("mc-wrap")){w=el("div","mc-wrap");listEl.parentNode.insertBefore(w,listEl);w.appendChild(listEl);w.appendChild(el("div","mc-flip"));}
  listEl.classList.add("mc-drawer");listEl.classList.toggle("mc-tall",!!tall);
  if(!listEl.__mcs){listEl.__mcs=1;listEl.addEventListener("scroll",function(){hint(w);},{passive:true});}
  if(wraps.indexOf(w)<0)wraps.push(w);return w;}
function hint(w){var d=$(".mc-drawer",w);if(!d||!d.offsetParent)return;var more=d.scrollHeight>d.clientHeight+4;w.classList.toggle("mc-more",more);
  var end=d.scrollTop+d.clientHeight>=d.scrollHeight-4;w.classList.toggle("mc-end",end);
  if(more){var below=0,bot=d.getBoundingClientRect().bottom;[].forEach.call(d.children,function(x){if(x.offsetParent&&!x.classList.contains("mc-gone")&&x.getBoundingClientRect().top>bot-8)below++;});
    var how=coarse()?"swipe up":"turn the wheel",f=$(".mc-flip",w),t=end?"the end":(below?below+" more below · "+how:how);if(f&&f.textContent!==t)f.textContent=t;}}
function hints(){setTimeout(function(){wraps=wraps.filter(function(w){return w.isConnected;});wraps.forEach(hint);},30);}

/* ---- Ingenium's models: the four houses in a row; one shelf of a house's models at a time ---- */
function rowsOf(tile){return $$(".lu-cd",tile);}
/* the device in the page's own words (r105): this computer, this tablet, this iPhone or iPad */
function devWord(){var d="";try{d=typeof lineupDevice==="function"?lineupDevice():"";}catch(e){}return d==="android"?"this tablet":d==="ios"?"this iPhone or iPad":"this computer";}
function tierOf(tile){return tile.getAttribute("data-tier")||"";}
/* a copy on the shelf passes each press to the key it copies, in the row the page drew (found by the model's name, data-cd) */
function proxy(copy,orig){var a=$$("button",copy),b=$$("button",orig);a.forEach(function(x,i){var o=b[i];if(!o)return;
    x.addEventListener("click",function(e){e.preventDefault();e.stopPropagation();try{o.click();}catch(_){}});});}
function fillShelf(shelf,tile){var rows=rowsOf(tile),code=tile.classList.contains("lu-faber"),name=(($(".lu-name",tile)||{}).textContent||"").trim();
  var keep=$(".mc-drawer",shelf),top=keep?keep.scrollTop:0;while(shelf.firstChild)shelf.removeChild(shelf.firstChild);
  var hh=el("div","mc-shelf-h");hh.appendChild(el("b","",code?"Coding models for "+devWord():"Models for "+name+" on "+devWord()));hh.appendChild(el("span","","in the order Ingenium suggests · "+rows.length));
  var x=el("button","btn ghost small","Fold the shelf");x.type="button";x.addEventListener("click",function(){shut();});hh.appendChild(x);shelf.appendChild(hh);
  var list=el("div","");rows.forEach(function(r){var c=r.cloneNode(true);c.removeAttribute("id");list.appendChild(c);proxy(c,r);var nm=$(".lu-cd-name",c);
    if(nm){nm.classList.add("mc-sheetable");nm.title="Press for more about this model";nm.addEventListener("click",function(){var why=$(".lu-cd-why",r);
      openSheet(nm.textContent,(($(".lu-cd-meta",r)||{}).textContent||"")+" · "+(($(".lu-cd-fit",r)||{}).textContent||""),why?why.textContent:"",[link($(".lu-cd-acts a[href]",r))]);});}});
  shelf.appendChild(list);var w=drawer(list,false);list.scrollTop=top;hint(w);}
function shut(){var g=$("#lineupGrid",P),shelf=g&&g.parentNode&&$(":scope > .mc-shelf",g.parentNode);openTier="";if(shelf)shelf.classList.remove("mc-open");
  $$(".mc-shelfkey",P).forEach(function(k){k.setAttribute("aria-expanded","false");});}
function dressLineup(){var pan=$('.rm-panel[data-room="get"]',P),grid=$("#lineupGrid",P);if(!pan||!grid)return;var card=grid.closest(".card")||grid.parentNode;
  var h2=$("h2",card);if(h2&&!$(".mc-aboutkey",card)){var about=el("button","btn ghost small mc-aboutkey mc-sheetable","How the houses are chosen");about.type="button";h2.parentNode.insertBefore(about,h2.nextSibling);
    about.addEventListener("click",function(){var b=el("div","");$$(":scope > p.small.muted, :scope > p.lu-large",card).forEach(function(p){b.appendChild(p.cloneNode(true));});
      var four=$$(".card",pan)[1];if(four){var c=four.cloneNode(true);c.removeAttribute("id");c.style.display="block";c.style.margin="14px 0 0";c.style.boxShadow="none";c.style.padding="0";b.appendChild(c);}
      openSheet("Ingenium's models","How Ingenium chooses its four houses",b);});}
  var shelf=$(":scope > .mc-shelf",grid.parentNode);if(!shelf){shelf=el("div","mc-shelf");grid.parentNode.insertBefore(shelf,grid.nextSibling);}
  $$(".lu-tile",grid).forEach(function(t){var rows=rowsOf(t),k=$(".mc-shelfkey",t);if(!rows.length){if(k)k.parentNode.removeChild(k);return;}
    var code=t.classList.contains("lu-faber"),lab=(code?"Coding models for "+devWord():"Its models for "+devWord());
    if(!k){k=el("button","mc-shelfkey mc-sheetable","");k.type="button";k.appendChild(D.createTextNode(lab));k.appendChild(el("i","",""));
      var row=$(".lu-row",t);if(row&&row.parentNode)row.parentNode.insertBefore(k,row.nextSibling);else t.appendChild(k);
      k.addEventListener("click",function(){var tier=tierOf(t);if(openTier===tier){shut();return;}openTier=tier;$$(".mc-shelfkey",P).forEach(function(x){x.setAttribute("aria-expanded","false");});
        k.setAttribute("aria-expanded","true");fillShelf(shelf,t);shelf.classList.remove("mc-open");void shelf.offsetWidth;shelf.classList.add("mc-open");hints();});}
    var n=rows.length+" ▾",i=$("i",k);if(i&&i.textContent!==n)i.textContent=n;k.setAttribute("aria-expanded",openTier===tierOf(t)?"true":"false");});
  /* the shelf open before the page drew the houses again: the same house, its rows as they are now */
  if(openTier){var t0=$('.lu-tile[data-tier="'+openTier+'"]',grid);if(t0&&rowsOf(t0).length){fillShelf(shelf,t0);shelf.classList.add("mc-open");}else shut();}}

/* ---- More models: divider tabs, one group at a time; the models as tiles in a drawer ---- */
function dressCatalogue(){var pan=$('.rm-panel[data-room="catalogue"]',P);if(!pan)return;var list=$(".cat-list",pan);if(!list)return;
  var groups=[],g=-1;[].forEach.call(list.children,function(c){if(c.classList.contains("cat-group")){g++;groups.push({label:c.textContent.trim()});return;}c.setAttribute("data-mc-g",String(Math.max(0,g)));});
  var w=drawer(list,true),tabsEl=$(":scope > .mc-dividers",w.parentNode),sig=groups.map(function(x){return x.label;}).join("\u0001");
  if(!tabsEl||tabsEl.__sig!==sig){if(tabsEl)tabsEl.parentNode.removeChild(tabsEl);tabsEl=el("div","mc-dividers");tabsEl.setAttribute("role","tablist");tabsEl.setAttribute("aria-label","Which models");tabsEl.__sig=sig;
    groups.forEach(function(gr,i){var parts=gr.label.split("·"),b=el("button","mc-div",parts[0].trim());if(parts[1])b.appendChild(el("small","",parts[1].trim()));b.type="button";b.setAttribute("role","tab");b.setAttribute("data-g",gr.label);
      b.addEventListener("click",function(){pick(list,tabsEl,i);});
      b.addEventListener("keydown",function(e){var j=-1;if(e.key==="ArrowRight")j=(i+1)%groups.length;else if(e.key==="ArrowLeft")j=(i-1+groups.length)%groups.length;if(j<0)return;e.preventDefault();var bs=$$(".mc-div",tabsEl);bs[j].focus();pick(list,tabsEl,j);});
      tabsEl.appendChild(b);});
    w.parentNode.insertBefore(tabsEl,w);}
  var at=0;$$(".mc-div",tabsEl).forEach(function(b,i){if(b.getAttribute("data-g")===pickG)at=i;});if(groups.length)pick(list,tabsEl,at,true);
  $$(".cat-row",list).forEach(function(r){var d=$(".cat-t .small:not(.muted)",r);if(!d||d.__mc)return;d.__mc=1;d.classList.add("mc-sheetable");d.title="Press to read it all";
    d.addEventListener("click",function(){openSheet(($(".cat-t b",r)||{}).textContent||"",($(".cat-t .small.muted",r)||{}).textContent||"",d.textContent,[link($(".cat-k a[href]",r))]);});});}
function pick(list,tabsEl,i,quiet){$$(".mc-div",tabsEl).forEach(function(b,j){b.setAttribute("aria-selected",j===i?"true":"false");b.tabIndex=j===i?0:-1;if(j===i)pickG=b.getAttribute("data-g")||"";});
  $$("[data-mc-g]",list).forEach(function(c){var gone=c.getAttribute("data-mc-g")!==String(i);if(c.classList.contains("mc-gone")!==gone)c.classList.toggle("mc-gone",gone);});if(!quiet)list.scrollTop=0;hints();}

/* ---- Downloads: the models to keep as tiles in a drawer; a model's parts in a raised sheet ---- */
function dressKept(){var pan=$('.rm-panel[data-room="kept"]',P);if(!pan)return;var list=$(".kf-list",pan);if(!list)return;
  [].forEach.call(list.children,function(li){if(!li.classList.contains("kf-row")&&!li.classList.contains("mc-showall"))li.classList.add("mc-showall");});drawer(list,true);
  $$(".kf-row",list).forEach(function(r){var b=$(".kf-acts .btn.small",r),parts=$(".kf-parts",r);if(!b||!parts||b.__mc)return;b.__mc=1;b.classList.add("mc-sheetable");
    b.addEventListener("click",function(){var c=parts.cloneNode(true);c.removeAttribute("id");c.style.display="block";openSheet(($(".kf-name",r)||{}).textContent||"",($(".kf-meta",r)||{}).textContent||"",c);});});}

/* everything put back after the page draws, in one go, a frame later (and never while it is itself writing) */
var mine=false;
function dress(){rq=0;if(!P)return;mine=true;try{dressLineup();}catch(e){}try{dressCatalogue();}catch(e){}try{dressKept();}catch(e){}hints();
  setTimeout(function(){mine=false;if(mo)mo.takeRecords();},0);}
function later(){if(mine||rq)return;try{rq=requestAnimationFrame(dress);}catch(e){rq=setTimeout(dress,16);}}
function boot(){if(booted)return;P=D.getElementById("page-models");if(!P||!P.querySelector(".tr-head")){setTimeout(boot,700);return;}booted=true;
  P.classList.add("mc-on");
  sheet=el("div","mc-sheet");sheet.setAttribute("role","dialog");sheet.setAttribute("aria-modal","false");P.appendChild(sheet);
  /* the head: a room opened from its tab folds it to a band; pressing the band unfolds the turret */
  var head=$(".tr-head",P);note=el("p","mc-unfold","Press the band to unfold the turret");if(head&&head.parentNode)head.parentNode.insertBefore(note,head.nextSibling);
  P.addEventListener("click",function(e){var t=e.target;if(t.closest&&t.closest(".rm-tab")&&P.classList.contains("mc-on")){P.classList.add("mc-fold");closeSheet();hints();return;}
    var h=t.closest&&t.closest(".tr-head");if(h&&P.classList.contains("mc-fold")&&!t.closest("button,a,input,select,textarea")){P.classList.remove("mc-fold");}});
  D.addEventListener("keydown",function(e){if(e.key==="Escape")closeSheet();});
  D.addEventListener("pointerdown",function(e){if(sheet.classList.contains("mc-open")&&!sheet.contains(e.target)&&!(e.target.closest&&e.target.closest(".mc-sheetable")))closeSheet();},{passive:true});
  W.addEventListener("resize",hints);
  /* the page opens on its turret every time */
  var og=W.go;if(typeof og==="function"&&!og.__r304){var g=function(p){var r=og.apply(this,arguments);try{if(p==="models"){P.classList.remove("mc-fold");closeSheet();later();}}catch(x){}return r;};
    try{Object.keys(og).forEach(function(k){g[k]=og[k];});}catch(x){}g.__r304=1;W.go=g;}
  /* only the page's own drawing counts: the turret's head (the toy's rings of light), the shelf, the sheet, the tabs and the drawers' hints
     are this layer's or the toy's own */
  try{mo=new MutationObserver(function(rs){for(var i=0;i<rs.length;i++){var t=rs[i].target;if(t&&t.nodeType!==1)t=t.parentNode;
      if(t&&t.closest&&t.closest(".tr-head,.mc-shelf,.mc-sheet,.mc-dividers,.mc-flip,.mc-unfold"))continue;later();return;}});mo.observe(P,{childList:true,subtree:true});}catch(x){}
  dress();}
if(D.readyState==="loading")D.addEventListener("DOMContentLoaded",boot);else boot();
W.IngModelsCompact={state:function(){return {on:!!(P&&P.classList.contains("mc-on")),fold:!!(P&&P.classList.contains("mc-fold")),tier:openTier,group:pickG,
    sheet:!!(sheet&&sheet.classList.contains("mc-open")),shelves:P?$$(".mc-shelfkey",P).length:0,dividers:P?$$(".mc-div",P).length:0,drawers:P?$$(".mc-drawer",P).length:0};},
  fold:function(on){if(P)P.classList.toggle("mc-fold",on!==false);},dress:dress,close:closeSheet};
try{window.__ingParts["p304"]="running";}catch(_){}
})();
</script>
