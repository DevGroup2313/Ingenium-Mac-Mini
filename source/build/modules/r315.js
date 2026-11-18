<style id="r315-css">
/* ============ R315 · FABRICA: EASIER TO FIND YOUR WAY, AND NOTHING STIFF (Ingenium 7.33, 17 November 2026) ============
   Her words on the live preview (https://claude.ai/artifact/NdgRNGS3yvtan8RH3rmBSE, source/previews/fabrica_nav, version 5): "I approve
   of your preview, please commit and push it everywhere continue working on my requests." With it: "The "4 kept here" button from
   Fabrica's "Your apps" section, the "Kept" button little button and the "Waiting" and "Not tested yet" buttons should all be animated and
   clickable and be responsive and move when I hover my mouse on them. I dislike how the collapsible button on the panels on the Fabrica
   page get a purple shading when I hover over it, I want that removed and I want it to get Ingenium's signature 3D look and animation
   instead. There area lot of sections and buttons inside of the Fabrica page that are stiff and rigid upon hover and do not animate ...
   It is important that the newly added pages, tabs, sections and all of their buttons remain cohesive and consistent with Ingenium's 3D
   look and animation." And, on the preview, said many times: "no new section, page or tab inside of Ingenium should be flat, stiff and
   unresponsive when I hover over it."
   1. Nothing stiff: every chip, card, tile, row, column, input and fold key of Fabrica that did not answer the pointer (41 of 70 kinds,
      found by hovering each one on the 7.32 page) is raised in Ingenium's own key values and lifts, leans or slides under the pointer, sinks when
      pressed; the fold keys lose their violet wash for the raised key; the four chips she named are keys that do something.
   2. Where you are, Go to anything, the map, counts on the rooms, and Teach me as I go (the next step and a lesson on each part, from
      Fabrica's own lessons in modules/r298.js), as the preview has them, in Fabrica's own panels.
   Minimal motion and reduced motion keep everything still. */
#fb{--r315-key:linear-gradient(180deg,#ffffff,#f6f2fb);--r315-bd:rgba(34,26,46,.10);
  --r315-sh:inset 0 -1.5px 0 rgba(40,22,68,.13),0 2px 0 rgba(40,22,68,.25),0 4px 5px rgba(40,22,68,.16),0 9px 14px rgba(40,22,68,.10);
  --r315-hi:inset 0 -1.5px 0 rgba(40,22,68,.13),0 3px 0 rgba(40,22,68,.25),0 6px 8px rgba(40,22,68,.18),0 13px 20px rgba(40,22,68,.12);
  --r315-dn:inset 0 -1px 0 rgba(40,22,68,.13),0 1px 0 rgba(40,22,68,.25),0 2px 3px rgba(40,22,68,.14);
  --r315-card:0 1px 0 rgba(60,40,100,.06),0 4px 10px rgba(70,44,130,.08);--r315-cardhi:0 2px 0 rgba(60,40,100,.08),0 12px 24px rgba(70,44,130,.16);
  --r315-acc:#6a3fb5;--r315-soft:rgba(122,80,198,.12);--r315-ink:#221a2e;--r315-ink2:#4a4358;--r315-ink3:#6c6579;--r315-card-bg:#ffffff;--r315-card-bg2:#f7f4fb}
body[data-theme="night"] #fb{--r315-key:linear-gradient(180deg,#352a4b,#271f37);--r315-bd:rgba(205,184,240,.14);
  --r315-sh:inset 0 1px 0 rgba(255,255,255,.08),inset 0 -2px 0 rgba(0,0,0,.4),0 2px 0 rgba(0,0,0,.7),0 4px 6px rgba(0,0,0,.4);
  --r315-hi:inset 0 1px 0 rgba(255,255,255,.1),inset 0 -2px 0 rgba(0,0,0,.4),0 3px 0 rgba(0,0,0,.7),0 7px 10px rgba(0,0,0,.5);
  --r315-dn:inset 0 1px 0 rgba(255,255,255,.06),0 1px 0 rgba(0,0,0,.7),0 2px 3px rgba(0,0,0,.4);
  --r315-card:0 1px 0 rgba(0,0,0,.4),0 6px 14px rgba(0,0,0,.3);--r315-cardhi:0 2px 0 rgba(0,0,0,.45),0 14px 28px rgba(0,0,0,.45);
  --r315-acc:#c9b2f2;--r315-soft:rgba(201,178,242,.14);--r315-ink:#f3eefc;--r315-ink2:#d4cae6;--r315-ink3:#a89cc2;--r315-card-bg:#241c36;--r315-card-bg2:#1d1729}
/* ---------- 1. nothing stiff ---------- */
#fb .f-chip,#fb .f-fold,#fb .f-repo,#fb .fr-room,#fb .fr-part,#fb .f-seg button,#fb .fr-cmh,#fb .h-line,#fb .h-box,#fb .h-stat,#fb .h-colm,#fb .h-dblk,#fb .f-diff,
#fb .r298-mc,#fb .f-pkg,#fb .r280-ans,#fb .fr-fh,#fb .f-libk,#fb .h-grow,#fb select,#fb .f-pn,.sks .sks-step,#fb .r315-tile{transition:transform .26s cubic-bezier(.2,.9,.25,1.2),box-shadow .26s ease,border-color .2s,color .2s,background-color .2s}
/* her words: "I also didn't want the Kept and Waiting buttons and the other buttons to have a different look and design, I just wanted
   them to animate when I hover over it": every part keeps its own look at rest; under the pointer it lifts, and sinks when pressed */
#fb .f-chip{cursor:pointer}
#fb .f-chip:hover{transform:translateY(-2px);box-shadow:0 3px 0 rgba(40,22,68,.14),0 6px 12px rgba(40,22,68,.14)}
#fb .f-chip:active{transform:translateY(1px);box-shadow:none}
/* the fold keys: as they were at rest (her words: "I only want the collapsible buttons of Fabrica's panel to pop out when I hover it with
   my mouse and not while they are at rest"); under the pointer, no violet wash but the raised key, popping out and lifting */
#fb .f-fold:hover,#fb .f-fold:focus-visible{background:var(--r315-key)!important;border-color:var(--r315-bd)!important;transform:translateY(-2px);box-shadow:var(--r315-hi)!important;color:var(--r315-ink)!important}
#fb .f-fold:hover svg,#fb .f-fold:hover i{transform:translateX(-1px)}
#fb .f-fold:active{transform:translateY(1px);box-shadow:var(--r315-dn)!important}
/* the app cards lift and grow; the chosen one too */
#fb .f-repo:hover{transform:translateY(-3px) scale(1.025)}
#fb .f-repo:active{transform:translateY(1px) scale(.98)}
/* 7.40: the apps' logos keep their own depth and movement, as Lector's do. Her words (18 November 2026): "The apps logos on Fabrica need to
   have the same popped out 3D look and animation as the rest of the app. I want them to be just as clickable and thick and weighted as
   the ones on the Lector page. Right now they seem flat and shallow and have a completely different animations." These two rules (7.33)
   turned the whole logo, and every picture in it, flat by a few degrees under the pointer: the picture rule took each layer's depth
   (its translateZ), so the four layers fell into one. The logo now answers as Lector's: it turns toward the pointer in depth, lifts,
   and sinks when pressed (r112's own handling); a picture outside the logo still turns as before. */
#fb .f-repo img:not(.f-ls img){transition:transform .5s cubic-bezier(.3,1.7,.45,1)}
#fb .f-repo:hover img:not(.f-ls img){transform:rotate(-6deg) scale(1.08)}
#fb .f-libk:hover{transform:translateY(-1px);color:var(--r315-acc)}
/* the rooms and parts: the chosen one, pressed in, still answers */
#fb .fr-room:hover,#fb .fr-part:hover{transform:translateY(-2px)}
#fb .fr-room:active,#fb .fr-part:active{transform:translateY(1px)}
#fb .f-seg button:not([aria-selected="true"]):not(.on):hover{transform:translateY(-1px);color:var(--r315-ink)}
/* cards, tiles, rows, columns and blocks: raised, lifting under the pointer */
#fb .h-box:hover,#fb .h-stat:hover,#fb .r298-mc:hover,#fb .f-pkg:hover,#fb .r280-ans:hover,#fb .h-colm:hover{transform:translateY(-3px);box-shadow:var(--r315-cardhi)}
#fb .h-stat:hover{transform:translateY(-3px) scale(1.02)}
#fb .fr-cmh:hover,#fb .h-line:hover{transform:translateX(3px);box-shadow:var(--r315-cardhi)}
#fb button.fr-cmh:hover:not(:disabled){transform:translateX(3px)!important}   /* the versions in History: a broader rule on Fabrica's keys held them still */
#fb .h-dblk:hover,#fb .f-diff:hover{transform:translateY(-2px);box-shadow:var(--r315-cardhi)}
#fb .fr-fh:hover{transform:translateX(3px);color:var(--r315-acc)}
#fb .fr-fh:hover .fr-chev{transform:rotate(90deg)}
#fb .fr-chev{transition:transform .3s cubic-bezier(.3,1.6,.45,1)}
#fb .h-grow:hover,#fb select:hover{transform:translateY(-1px);box-shadow:0 0 0 3px var(--r315-soft)}
/* the panels lean toward the pointer, as Ingenium's raised cards do */
#fb .f-pn{transform-style:preserve-3d}
#fb .f-pn:hover{box-shadow:0 2px 0 rgba(60,40,100,.07),0 20px 40px rgba(70,44,130,.16)}
body[data-theme="night"] #fb .f-pn:hover{box-shadow:0 2px 0 rgba(0,0,0,.45),0 20px 40px rgba(0,0,0,.5)}
/* the four steps over the panels lift */
.sks .sks-step:hover{transform:translateY(-3px)}
.sks .sks-step:active{transform:translateY(1px)}
/* the checks in Test: each row answers */
#fb .f-checks li,#fb .f-tests li,#fb .r315-row{transition:transform .2s ease,background-color .2s;border-radius:10px}
#fb .f-checks li:hover,#fb .f-tests li:hover,#fb .r315-row:hover{transform:translateX(3px);background-color:var(--r315-soft)}
/* the quiet keys, the hints, the checks' rows and the steps' ticks answer too */
#fb .f-btn.quiet,#fb .fp-hint,#fb :is(li,div):has(> .m),.sks .tick{transition:transform .22s cubic-bezier(.2,.9,.25,1.2),box-shadow .22s ease,background-color .2s,color .2s}
#fb .f-btn.quiet:hover:not(:disabled){transform:translateY(-2px)}   /* its own look kept (the underline, modules/r112.js); it lifts */
#fb .f-btn.quiet:active:not(:disabled){transform:translateY(1px)}
#fb .fp-hint:hover{transform:translateY(-2px);box-shadow:var(--r315-card)}
#fb :is(li,div):has(> .m){border-radius:10px}
#fb :is(li,div):has(> .m):hover{transform:translateX(3px);background-color:var(--r315-soft)}
#fb :is(li,div):has(> .m):hover > .m{transform:scale(1.15)}
#fb .m{display:inline-block;transition:transform .35s cubic-bezier(.3,1.8,.45,1)}
.sks .sks-step:hover .tick{transform:scale(1.15) rotate(-8deg)}
/* a chip pressed glows the key it leads to */
#fb .r315-glow,.r315-glow{animation:r315Glow 1.3s ease-in-out 2}
@keyframes r315Glow{0%,100%{box-shadow:0 0 0 0 rgba(122,80,198,0)}50%{box-shadow:0 0 0 6px rgba(122,80,198,.38)}}

/* ---------- 2. where you are, the next step, the palette, the map, the lessons ---------- */
#fb .r315-path{display:flex;align-items:center;justify-content:space-between;gap:10px;flex-wrap:wrap;margin:0 0 10px;padding:8px 10px 8px 14px;border-radius:14px;
  background:var(--r315-card-bg);border:1px solid var(--r315-bd);box-shadow:var(--r315-card);transition:box-shadow .26s ease,transform .26s ease}
#fb .r315-path:hover{box-shadow:var(--r315-cardhi)}
#fb .r315-crumbs{display:flex;align-items:center;gap:3px;flex-wrap:wrap;min-width:0}
#fb .r315-crumb{border:0;background:none;padding:4px 8px;border-radius:8px;cursor:pointer;color:var(--r315-ink2);font:600 13px/1.2 inherit;transition:transform .2s,background-color .2s}
#fb .r315-crumb:hover{background:var(--r315-soft);transform:translateY(-1px)}
#fb .r315-crumb.here{color:var(--r315-acc)}
#fb .r315-sep{color:var(--r315-ink3);opacity:.6}
#fb .r315-gh{font-size:11.5px;color:var(--r315-ink3);margin-left:6px}#fb .r315-gh b{color:var(--r315-ink2);font-weight:600}
#fb .r315-tools{display:flex;gap:6px;align-items:center;flex-wrap:wrap}
#fb .r315-k{display:inline-flex;align-items:center;gap:6px;padding:7px 12px;border-radius:10px;border:1px solid var(--r315-bd);background:var(--r315-key);box-shadow:var(--r315-sh);
  color:var(--r315-ink);font:600 12.5px/1.2 inherit;cursor:pointer;transition:transform .16s cubic-bezier(.34,1.35,.64,1),box-shadow .16s;white-space:nowrap}
#fb .r315-k:hover{transform:translateY(-2px);box-shadow:var(--r315-hi)}#fb .r315-k:active{transform:translateY(1px);box-shadow:var(--r315-dn)}
#fb .r315-k.pri{color:#fff;background:linear-gradient(180deg,#7a50c6,#5d37a1);border-color:#4b2a86;text-shadow:0 1px 1px rgba(30,10,60,.35);
  box-shadow:inset 0 1px 0 rgba(255,255,255,.16),0 2px 0 #3a2070,0 4px 6px rgba(40,22,68,.24),0 9px 16px rgba(40,22,68,.16)}
#fb .r315-k.pri:hover{box-shadow:inset 0 1px 0 rgba(255,255,255,.18),0 3px 0 #3a2070,0 6px 9px rgba(40,22,68,.26),0 13px 22px rgba(40,22,68,.18)}
#fb .r315-k.pri:active{box-shadow:inset 0 1px 0 rgba(255,255,255,.12),0 1px 0 #3a2070,0 2px 3px rgba(40,22,68,.22)}
#fb .r315-k kbd,.r315-sheet kbd{font:600 10.5px/1 ui-monospace,Menlo,monospace;padding:3px 6px;border-radius:6px;border:1px solid var(--r315-bd,rgba(34,26,46,.1));color:var(--r315-ink3,#6c6579)}
#fb .r315-teach{display:inline-flex;align-items:center;gap:8px;font:600 12.5px/1.2 inherit;color:var(--r315-ink2)}
#fb .r315-sw{position:relative;width:42px;height:24px;border:0;border-radius:999px;cursor:pointer;background:rgba(60,40,100,.08);box-shadow:inset 0 1px 2.5px rgba(40,22,68,.14),0 0 0 1px var(--r315-bd);transition:background .22s}
#fb .r315-sw i{position:absolute;top:3px;left:3px;width:18px;height:18px;border-radius:50%;background:linear-gradient(#fff,#e7e1ef);box-shadow:0 2px 0 rgba(40,22,68,.22),0 3px 6px rgba(40,22,68,.22);transition:transform .32s cubic-bezier(.34,1.56,.64,1)}
#fb .r315-sw[aria-checked="true"]{background:linear-gradient(180deg,#7a50c6,#5a33a0)}#fb .r315-sw[aria-checked="true"] i{transform:translateX(18px)}
#fb .r315-sw:hover{transform:scale(1.06)}
#fb .r315-ring{display:inline-flex;align-items:center;gap:6px;font-size:11.5px;color:var(--r315-ink3)}#fb .r315-ring svg{width:22px;height:22px;transform:rotate(-90deg)}
#fb .r315-next{display:flex;align-items:center;gap:12px;margin:0 0 12px;padding:10px 12px 10px 12px;border-radius:14px;border:1px solid var(--r315-bd);
  background:linear-gradient(90deg,var(--r315-soft),transparent 70%),var(--r315-card-bg);box-shadow:var(--r315-card);transition:box-shadow .26s ease,transform .26s ease}
#fb .r315-next:hover{box-shadow:var(--r315-cardhi);transform:translateY(-1px)}
#fb .r315-next .ico{width:28px;height:28px;border-radius:50%;flex:none;display:grid;place-items:center;color:#fff;background:linear-gradient(180deg,#7a50c6,#5d37a1);box-shadow:inset 0 1px 0 rgba(255,255,255,.16),0 2px 0 #3a2070,0 4px 6px rgba(40,22,68,.24);animation:r315Nudge 2.4s ease-in-out infinite}
@keyframes r315Nudge{0%,100%{transform:translateX(0)}50%{transform:translateX(3px)}}
#fb .r315-next div{min-width:0;flex:1}#fb .r315-next strong{display:block;font-size:13px;color:var(--r315-ink)}#fb .r315-next small{color:var(--r315-ink3);font-size:12px}
#fb .fr-room .r315-n{min-width:18px;height:18px;padding:0 5px;margin-left:2px;border-radius:999px;display:inline-grid;place-items:center;font-size:10.5px;font-weight:700;color:#fff;background:#7a50c6;box-shadow:0 1px 2px rgba(0,0,0,.25);animation:r315Pop .5s cubic-bezier(.3,1.8,.45,1) backwards}
#fb .fr-room .r315-n.warn{background:#c9741e}#fb .fr-room .r315-n.bad{background:#c43c55}
@keyframes r315Pop{from{transform:scale(.4)}to{transform:none}}
#fb .r315-lesson{display:grid;gap:8px;margin:2px 0 10px;padding:11px 13px;border-radius:14px;border:1px dashed var(--r315-acc);background:var(--r315-soft);transition:transform .26s ease,box-shadow .26s ease}
#fb .r315-lesson:hover{transform:translateY(-2px);box-shadow:var(--r315-cardhi)}
#fb .r315-lesson .lt{display:flex;align-items:center;justify-content:space-between;gap:8px}
#fb .r315-lesson .lt b{font-size:11px;letter-spacing:.16em;text-transform:uppercase;color:var(--r315-acc)}
#fb .r315-lesson dl{margin:0;display:grid;grid-template-columns:auto minmax(0,1fr);gap:3px 12px;font-size:12.5px}
#fb .r315-lesson dt{color:var(--r315-ink3)}#fb .r315-lesson dd{margin:0;color:var(--r315-ink)}#fb .r315-lesson dd code{font-size:11.5px}
#fb .r315-lesson .acts{display:flex;gap:6px;flex-wrap:wrap}
.r315-veil{position:fixed;inset:0;background:rgba(20,10,40,.35);-webkit-backdrop-filter:blur(3px);backdrop-filter:blur(3px);display:grid;place-items:start center;padding:70px 16px 20px;z-index:9000}
.r315-sheet{--r315-bd:rgba(34,26,46,.10);--r315-ink:#221a2e;--r315-ink2:#4a4358;--r315-ink3:#6c6579;--r315-soft:rgba(122,80,198,.12);--r315-acc:#6a3fb5;--r315-bg:#ffffff;--r315-bg2:#f7f4fb;
  width:min(640px,100%);max-height:calc(100vh - 100px);overflow:auto;scrollbar-width:none;border-radius:20px;background:var(--r315-bg);color:var(--r315-ink);box-shadow:0 30px 80px rgba(20,10,50,.4);border:1px solid var(--r315-bd);
  animation:r315In .28s cubic-bezier(.2,.9,.25,1.1) backwards}
.r315-sheet::-webkit-scrollbar{width:0;height:0;display:none}
body[data-theme="night"] .r315-sheet{--r315-bd:rgba(205,184,240,.14);--r315-ink:#f3eefc;--r315-ink2:#d4cae6;--r315-ink3:#a89cc2;--r315-soft:rgba(201,178,242,.14);--r315-acc:#c9b2f2;--r315-bg:#211a33;--r315-bg2:#1a1429}
@keyframes r315In{from{opacity:.001;transform:translateY(10px) scale(.98)}}
.r315-sheet.wide{width:min(980px,100%)}
.r315-pin{display:flex;align-items:center;gap:10px;padding:14px 16px;border-bottom:1px solid var(--r315-bd)}
.r315-pin input{flex:1;min-width:0;border:0;outline:0;background:none;font:500 16px/1.3 inherit;color:var(--r315-ink)}
.r315-list{padding:8px;display:grid;gap:2px}
.r315-g{padding:8px 10px 4px;font:600 10px/1 inherit;letter-spacing:.2em;text-transform:uppercase;color:var(--r315-ink3)}
.r315-it{display:grid;grid-template-columns:22px minmax(0,1fr) auto;gap:10px;align-items:center;padding:8px 10px;border-radius:10px;border:0;background:none;text-align:left;cursor:pointer;color:var(--r315-ink);transition:transform .16s ease,background-color .16s}
.r315-it[aria-selected="true"],.r315-it:hover{background:var(--r315-soft);transform:translateX(3px)}
.r315-it b{font-size:13px;font-weight:600}.r315-it small{display:block;color:var(--r315-ink3);font-size:11.5px}
.r315-shead{display:flex;align-items:center;justify-content:space-between;gap:10px;padding:14px 16px;border-bottom:1px solid var(--r315-bd)}
.r315-shead h2{margin:0;font:600 24px/1 var(--sk-serif,"Home Cormorant","Cormorant Garamond",Georgia,serif)}
.r315-map{padding:16px;display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:12px}
.r315-mroom{border-radius:14px;border:1px solid var(--r315-bd);background:var(--r315-bg2);padding:12px;display:grid;gap:6px;align-content:start;
  box-shadow:inset 0 -1.5px 0 rgba(40,22,68,.10),0 2px 0 rgba(40,22,68,.16),0 6px 12px rgba(40,22,68,.08);transition:transform .26s cubic-bezier(.2,.9,.25,1.2),box-shadow .26s}
.r315-mroom:hover{transform:translateY(-3px);box-shadow:inset 0 -1.5px 0 rgba(40,22,68,.10),0 3px 0 rgba(40,22,68,.2),0 12px 22px rgba(40,22,68,.14)}
.r315-mroom.here{border-color:var(--r315-acc);box-shadow:0 0 0 1px var(--r315-acc) inset}
.r315-mroom h3{margin:0;font:600 20px/1.1 var(--sk-serif,"Home Cormorant","Cormorant Garamond",Georgia,serif)}.r315-mroom .g{font-size:11.5px;color:var(--r315-ink3)}
.r315-mtab{display:grid;gap:1px;padding:6px 8px;border-radius:9px;border:0;background:none;text-align:left;cursor:pointer;color:var(--r315-ink);transition:transform .16s ease,background-color .16s}
.r315-mtab:hover,.r315-mtab.here{background:var(--r315-soft)}.r315-mtab:hover{transform:translateX(3px)}.r315-mtab b{font-size:12.5px}.r315-mtab small{font-size:11.5px;color:var(--r315-ink3)}
.r315-keys{padding:12px 16px 16px;display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:8px 18px;font-size:13px}
.r315-keys div{display:flex;justify-content:space-between;gap:10px;align-items:center;padding:4px 0;border-bottom:1px solid var(--r315-bd)}
.r315-x{padding:6px 12px;border-radius:10px;border:1px solid var(--r315-bd);background:linear-gradient(180deg,#fff,#f6f2fb);box-shadow:inset 0 -1.5px 0 rgba(40,22,68,.13),0 2px 0 rgba(40,22,68,.25),0 4px 5px rgba(40,22,68,.16);
  font:600 12.5px/1.2 inherit;color:#221a2e;cursor:pointer;transition:transform .16s cubic-bezier(.34,1.35,.64,1)}
.r315-x:hover{transform:translateY(-2px)}
body[data-theme="night"] .r315-x{background:linear-gradient(180deg,#352a4b,#271f37);color:#f3eefc}
@media (max-width:760px){#fb .r315-gh{display:none}#fb .r315-k span{display:none}}
@media (prefers-reduced-motion:reduce){#fb *,.sks *,.r315-sheet,.r315-sheet *{animation:none!important;transition:none!important}#fb .f-pn{transform:none!important}}
body[data-motion="minimal"] #fb *,body[data-motion="minimal"] .sks *,body[data-motion="minimal"] .r315-sheet,body[data-motion="minimal"] .r315-sheet *{animation:none!important;transition:none!important}
body[data-motion="minimal"] #fb .f-pn{transform:none!important}
</style>
<script>try{(window.__ingParts=window.__ingParts||{})["p315"]="started";}catch(_){}
/* R315 (7.33): Fabrica, easier to find your way, and nothing stiff (see the style above) */
(function(){var D=document,W=window;
function $(id){return D.getElementById(id);}
function el(t,c,h){var e=D.createElement(t);if(c)e.className=c;if(h!=null)e.innerHTML=h;return e;}
function esc(s){return String(s==null?"":s).replace(/[&<>"]/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c];});}
function X(){return W.fbHubHost||null;}
function R(){return W.IngRuns||null;}
function still(){try{return W.matchMedia("(prefers-reduced-motion: reduce)").matches||D.body.getAttribute("data-motion")==="minimal";}catch(e){return false;}}
/* the rooms and their parts, in Fabrica's own words (its views; r298's ROOMOF and LEARN) */
var ROOMS=[["now","Now",[["changes","Changes"],["files","Files"],["code","Code"]]],["story","Story",[["history","History"],["compare","Compare"],["releases","Releases"]]],
  ["plans","Plans",[["ideas","Ideas"],["issues","Issues"],["pulls","Pull requests"],["projects","Projects"],["wiki","Wiki"]]],
  ["runs","Runs",[["runs","Runs"],["workflows","Workflows"],["machines","Machines"]]],["care","Care",[["actions","Checks"],["insights","Overview"],["settings","Settings"]]]];
var PARTS=[["test","Test"],["ship","Ship"],["copies","Copies"],["ingenium","Ingenium"]];
var RGH={now:"the Code tab and your uncommitted changes",story:"Commits, Compare and Releases",plans:"Branches, Issues, Pull requests, Projects and the Wiki",runs:"Actions",care:"Checks, Insights and Settings"};
function L(room,view){var r=R(),l=r&&r.learn?r.learn:{};return l[room+"-"+view]||l[room+"-"+({actions:"checks",insights:"overview",pulls:"prs"}[view]||view)]||null;}
function viewName(v){for(var i=0;i<ROOMS.length;i++)for(var j=0;j<ROOMS[i][2].length;j++)if(ROOMS[i][2][j][0]===v)return ROOMS[i][2][j][1];return v;}
function roomOfView(v){for(var i=0;i<ROOMS.length;i++)for(var j=0;j<ROOMS[i][2].length;j++)if(ROOMS[i][2][j][0]===v)return ROOMS[i][0];return "";}
function cur(){try{return X()&&X().cur?X().cur():null;}catch(e){return null;}}
function view(){try{return X().S.view||"";}catch(e){return "";}}
function room(){try{return W.fbRooms&&W.fbRooms.room?W.fbRooms.room():roomOfView(view());}catch(e){return roomOfView(view());}}
function openView(v){var r=R();try{if(r&&r.nav){r.nav(v);return;}}catch(e){}try{if(W.fbHub&&W.fbHub.open)W.fbHub.open(v);}catch(e){}}
function openPart(p){try{var b=D.querySelector('#fb .fr-part[data-part="'+p+'"]');if(b){b.click();return b;}}catch(e){}return null;}
function glow(e){if(!e)return;e.classList.remove("r315-glow");void e.offsetWidth;e.classList.add("r315-glow");try{e.scrollIntoView({block:"nearest",behavior:still()?"auto":"smooth"});}catch(x){}setTimeout(function(){e.classList.remove("r315-glow");},2800);}
function toast(s){try{if(X()&&X().toast){X().toast(s);return;}}catch(e){}}
/* what she has learned, and Teach me as I go, kept on this device */
var LK="ing.fabrica.learned.v1",TK="ing.fabrica.teach.v1",LEARNED={},TEACH=true;
try{LEARNED=JSON.parse(localStorage.getItem(LK)||"{}")||{};}catch(e){LEARNED={};}
try{var t0=localStorage.getItem(TK);if(t0!==null)TEACH=t0==="1";}catch(e){}
function learn(k){if(!TEACH||!k||LEARNED[k])return;LEARNED[k]=1;try{localStorage.setItem(LK,JSON.stringify(LEARNED));}catch(e){}}
var TOTAL=0;ROOMS.forEach(function(r){TOTAL+=r[2].length;});TOTAL+=PARTS.length;
/* ---------- counts for each room ---------- */
var REC={},RECAT={};
function recOf(r){if(!r||!W.fbHub||!W.fbHub.record)return null;if(REC[r.id]&&Date.now()-(RECAT[r.id]||0)<3000)return REC[r.id];
  if(!RECAT[r.id+"p"]){RECAT[r.id+"p"]=1;W.fbHub.record(r.id).then(function(x){REC[r.id]=x;RECAT[r.id]=Date.now();delete RECAT[r.id+"p"];paintSoon();},function(){delete RECAT[r.id+"p"];});}return REC[r.id]||null;}
function counts(){var r=cur(),o={};if(!r)return o;var x=X();
  try{var st=x.statusOf(r);if(st&&st.changes&&st.changes.length)o.now=[st.changes.length,"",st.changes.length===1?"1 change not kept yet":st.changes.length+" changes not kept yet"];}catch(e){}
  var rc=recOf(r);if(rc){var oi=(rc.issues||[]).filter(function(i){return i.state==="open";}).length,op=(rc.pulls||[]).filter(function(i){return i.state==="open";}).length;
    if(oi+op)o.plans=[oi+op,"",oi+" open issue"+(oi===1?"":"s")+" and "+op+" open pull request"+(op===1?"":"s")];}
  try{var n=x.notesOf(r).test;if(n&&!n.ok)o.care=[1,"warn","the last test found something to look at"];}catch(e){}
  try{var rs=R()&&R().state?R().state():null;var bad=D.querySelectorAll('#fb .r298-run .r298-m.bad').length;if(bad)o.runs=[bad,"bad",bad===1?"1 run failed":bad+" runs failed"];}catch(e){}
  return o;}
/* ---------- the next step, read from the app's state ---------- */
function nextStep(){var r=cur(),x=X();if(!r||!x)return null;var st={},tested=false,shipped=false,tstate="none";
  try{st=x.statusOf(r)||{};}catch(e){}try{var nt=x.notesOf(r);tstate=nt.test?(nt.test.ok?"ok":"fail"):"none";shipped=!!(nt.onePage||nt.webApp||nt.kits||nt.made);}catch(e){}
  if(st.changes&&st.changes.length)return {t:"Keep a version of your change",s:(st.changes.length===1?"1 file changed":st.changes.length+" files changed")+" since the last version. Keeping it makes a point you can always come back to.",k:"Show me",f:function(){openView("changes");setTimeout(function(){glow(D.querySelector("#fbWorkFoot .f-btn.pri")||D.querySelector("#fbWorkFoot .f-btn"));},350);}};
  if(tstate==="none")return {t:"Test this version",s:"Fabrica's five checks read the page, its files, its errors, its self-test and its build number, before it ships.",k:"Test it",f:function(){openPart("test");setTimeout(function(){var b=findKey("#fbShip","Test this version");glow(b);},300);}};
  if(tstate==="fail")return {t:"Look at what the test found",s:"One of the five checks did not pass: each says what it found and how to fix it.",k:"Open Test",f:function(){openPart("test");}};
  if(!shipped)return {t:"Ship it to your devices",s:"Make the app for each of your devices from this tested version.",k:"Open Ship",f:function(){openPart("ship");}};
  return {t:"All caught up",s:"Every change is kept, tested and shipped. Plans holds your issues and ideas when you want something next.",k:"Open Plans",f:function(){openView("issues");}};}
function findKey(root,text){var b=null;[].forEach.call(D.querySelectorAll(root+" button"),function(x){if(!b&&x.offsetParent&&x.textContent.trim().indexOf(text)===0)b=x;});return b;}
/* ---------- painting the path, the next step, the counts and the lesson ---------- */
var BAR=null,NEXT=null,PQ=0;
function paintSoon(){if(PQ)return;PQ=setTimeout(function(){PQ=0;paint();},60);}
function ensure(){var fb=$("fb"),pn=$("fbPanels");if(!fb||!pn)return false;
  if(!BAR||!BAR.isConnected){BAR=el("div","r315-path");BAR.setAttribute("role","navigation");BAR.setAttribute("aria-label","Where you are in Fabrica");fb.insertBefore(BAR,pn);}
  if(!NEXT||!NEXT.isConnected){NEXT=el("div","r315-next");NEXT.setAttribute("aria-live","polite");fb.insertBefore(NEXT,pn);}
  return true;}
function paint(){if(!ensure())return;var r=cur(),inApp=!!r&&$("fbPanels")&&$("fbPanels").offsetParent!==null;
  BAR.hidden=!inApp;NEXT.hidden=!inApp;if(!inApp)return;
  var v=view(),rm=room()||roomOfView(v),RM=ROOMS.filter(function(x){return x[0]===rm;})[0]||ROOMS[0],l=L(RM[0],v),vn=viewName(v);
  var k=Object.keys(LEARNED).length,p=Math.min(1,k/TOTAL),C=2*Math.PI*8;
  BAR.innerHTML='<div class="r315-crumbs"><button class="r315-crumb" data-c="lib" type="button">Fabrica</button><span class="r315-sep">›</span><button class="r315-crumb" data-c="map" type="button">'+esc(r.name||"Your app")+'</button><span class="r315-sep">›</span><button class="r315-crumb" data-c="room" type="button">'+esc(RM[1])+'</button><span class="r315-sep">›</span><button class="r315-crumb here" data-c="go" type="button" aria-current="page">'+esc(vn)+'</button>'+(l?'<span class="r315-gh">GitHub calls it <b>'+esc(l[2])+'</b></span>':"")+'</div>'+
    '<div class="r315-tools"><span class="r315-teach"><span id="r315tl">Teach me as I go</span><button class="r315-sw" type="button" role="switch" aria-labelledby="r315tl" aria-checked="'+TEACH+'" id="r315Teach"><i></i></button></span>'+
    (TEACH?'<span class="r315-ring" title="Parts of Fabrica learned"><svg viewBox="0 0 22 22" aria-hidden="true"><circle cx="11" cy="11" r="8" fill="none" stroke="rgba(122,80,198,.18)" stroke-width="3"/><circle cx="11" cy="11" r="8" fill="none" stroke="#7a50c6" stroke-width="3" stroke-linecap="round" stroke-dasharray="'+(C*p).toFixed(1)+' '+C.toFixed(1)+'"/></svg>'+k+' of '+TOTAL+'</span>':"")+
    '<button class="r315-k" type="button" id="r315Go" title="Go to anything (/ or Ctrl K)">⌕ <span>Go to anything</span> <kbd>/</kbd></button><button class="r315-k" type="button" id="r315Map" title="The whole of Fabrica, as a map (M)">◫ <span>Map</span></button><button class="r315-k" type="button" id="r315Keys" aria-label="Keys" title="Keys (?)">?</button></div>';
  var n=nextStep();if(n){NEXT.innerHTML='<span class="ico" aria-hidden="true">→</span><div><strong>Next: '+esc(n.t)+'</strong><small>'+esc(n.s)+'</small></div><button class="r315-k pri" type="button" id="r315Next">'+esc(n.k)+'</button>';$("r315Next").onclick=n.f;}else NEXT.hidden=true;
  $("r315Teach").onclick=function(){TEACH=!TEACH;try{localStorage.setItem(TK,TEACH?"1":"0");}catch(e){}if(TEACH)learn(RM[0]+"/"+v);paint();};
  $("r315Go").onclick=palette;$("r315Map").onclick=map;$("r315Keys").onclick=keys;
  /* the counts on the rooms, with GitHub's name */
  var c=counts();[].forEach.call(D.querySelectorAll("#fb .fr-room"),function(b){var key=b.getAttribute("data-room");if(!key)return;var old=b.querySelector(".r315-n");var cc=c[key];
    if(cc){if(!old){old=el("span","r315-n");b.appendChild(old);}var cn="r315-n "+cc[1];if(old.className!==cn)old.className=cn;if(old.textContent!==String(cc[0]))old.textContent=String(cc[0]);if(old.getAttribute("aria-label")!==cc[2])old.setAttribute("aria-label",cc[2]);}else if(old)old.remove();
    var base=b.getAttribute("data-r315t")||b.title||"";if(!b.getAttribute("data-r315t"))b.setAttribute("data-r315t",base);b.title=(RGH[key]?"On GitHub: "+RGH[key]:base)+(cc?" · "+cc[2]:"");});
  lesson(RM,v,l);}
/* the lesson laid over the part that is open */
function lesson(RM,v,l){var body=$("fbWorkBody");if(!body)return;var old=body.querySelector(":scope > .r315-lesson");
  if(!TEACH||!l){if(old)old.remove();return;}var key=RM[0]+"/"+v,done=!!LEARNED[key],sig=key+(done?"1":"0");
  if(old&&old.getAttribute("data-k")===sig)return;if(old)old.remove();
  var c=el("div","r315-lesson");c.setAttribute("data-k",sig);c.setAttribute("role","note");c.setAttribute("aria-label","A lesson: "+l[0]);
  c.innerHTML='<div class="lt"><b>Learn · '+esc(l[0])+'</b>'+(done?'<span class="f-chip ok">✓ learned</span>':'<span class="f-chip">new to you</span>')+'</div><dl><dt>What it is</dt><dd>'+esc(l[1])+'</dd><dt>On GitHub</dt><dd>'+esc(l[2])+'</dd><dt>In git</dt><dd><code>'+esc(l[3])+'</code></dd>'+(l[4]?'<dt>Why</dt><dd>'+esc(l[4])+'</dd>':"")+'</dl><div class="acts"><button class="r315-k" type="button" data-r315="show">Show me where</button><button class="r315-k" type="button" data-r315="got">Got it</button></div>';
  body.insertBefore(c,body.firstChild);
  c.querySelector('[data-r315="got"]').onclick=function(){learn(key);paint();};
  c.querySelector('[data-r315="show"]').onclick=function(){learn(key);var t=D.querySelector("#fbWorkFoot .f-btn.pri")||D.querySelector("#fbWorkBody .f-btn.pri")||D.querySelector("#fbWorkBody .f-btn")||D.querySelector("#fbWorkBody > :not(.r315-lesson)");glow(t);paint();};}
/* ---------- Go to anything ---------- */
function closeAll(){var v=$("r315Veil");if(v)v.remove();}
function sheetOf(cls,label){closeAll();var v=el("div","r315-veil");v.id="r315Veil";var s=el("div","r315-sheet"+(cls?" "+cls:""));s.setAttribute("role","dialog");s.setAttribute("aria-label",label);v.appendChild(s);
  v.addEventListener("click",function(e){if(e.target===v)closeAll();});D.body.appendChild(v);return s;}
function items(){var a=[];ROOMS.forEach(function(r){r[2].forEach(function(t){var l=L(r[0],t[0]);a.push({g:"Places",i:"◇",t:r[1]+" › "+t[1],s:(l?"GitHub: "+l[2]+" · "+l[1]:""),f:function(){openView(t[0]);}});});});
  PARTS.forEach(function(p){a.push({g:"Places",i:"◇",t:"Test and ship › "+p[1],s:(R()&&R().caps&&R().caps.part[p[0]]?R().caps.part[p[0]][1]:""),f:function(){openPart(p[0]);}});});
  [["Keep a version","Make a point you can come back to",function(){openView("changes");setTimeout(function(){glow(D.querySelector("#fbWorkFoot .f-btn.pri"));},350);}],
   ["Test this version","Fabrica's five checks",function(){openPart("test");setTimeout(function(){glow(findKey("#fbShip","Test this version"));},300);}],
   ["A new issue","Something to fix or add",function(){openView("issues");}],["Compare two versions","Any two side by side",function(){openView("compare");}],
   ["Run a workflow","On this computer or one of yours",function(){openView("workflows");}],["Add a machine","Pair another of your computers",function(){openView("machines");}],
   ["Your apps","Every app kept here",function(){try{X().openLibrary();}catch(e){}}]].forEach(function(x){a.push({g:"Do",i:"▸",t:x[0],s:x[1],f:x[2]});});
  var r=cur(),rc=r?recOf(r):null;if(rc){(rc.issues||[]).slice(0,30).forEach(function(i){a.push({g:"In "+(r.name||"this app"),i:"•",t:"#"+i.n+" "+(i.title||"An issue"),s:"Plans › Issues · "+(i.state||""),f:function(){try{W.fbHub.open("issues",{n:i.n});}catch(e){openView("issues");}}});});
    (rc.pulls||[]).slice(0,20).forEach(function(i){a.push({g:"In "+(r.name||"this app"),i:"•",t:"#"+i.n+" "+(i.title||"A pull request"),s:"Plans › Pull requests · "+(i.state||""),f:function(){try{W.fbHub.open("pulls",{n:i.n});}catch(e){openView("pulls");}}});});}
  try{(X().FBS().repos||[]).slice(0,40).forEach(function(rp){a.push({g:"Your apps",i:"✦",t:rp.name||rp.id,s:"Open this app",f:function(){try{X().openWork(rp.id);}catch(e){}}});});}catch(e){}
  return a;}
function score(q,s){q=q.toLowerCase();s=s.toLowerCase();if(!q)return 1;if(s.indexOf(q)>=0)return 3;var i=0;for(var j=0;j<s.length&&i<q.length;j++)if(s[j]===q[i])i++;return i===q.length?1:0;}
function palette(){var s=sheetOf("","Go to anything");s.innerHTML='<div class="r315-pin"><span aria-hidden="true">⌕</span><input id="r315Q" placeholder="A room, a part, an issue, an app, or something to do" aria-label="Go to anything" autocomplete="off"><kbd>Esc</kbd></div><div class="r315-list" id="r315L" role="listbox"></div>';
  var all=items(),sel=0,shown=[];
  function draw(){var q=$("r315Q").value.trim();shown=all.map(function(x){return [score(q,x.t+" "+x.s),x];}).filter(function(x){return x[0]>0;}).sort(function(a,b){return b[0]-a[0];}).map(function(x){return x[1];}).slice(0,16);sel=Math.min(sel,Math.max(0,shown.length-1));
    var h="",g="";shown.forEach(function(x,i){if(x.g!==g&&!q){g=x.g;h+='<div class="r315-g">'+esc(g)+'</div>';}h+='<button class="r315-it" type="button" role="option" data-i="'+i+'" aria-selected="'+(i===sel)+'"><span aria-hidden="true">'+x.i+'</span><span><b>'+esc(x.t)+'</b><small>'+esc(x.s)+'</small></span>'+(i===sel?'<kbd>↵</kbd>':"")+'</button>';});
    $("r315L").innerHTML=h||'<div class="r315-g">Nothing by that name</div>';}
  function pick(i){var x=shown[i];closeAll();if(x)x.f();}
  $("r315Q").addEventListener("input",function(){sel=0;draw();});
  $("r315Q").addEventListener("keydown",function(e){if(e.key==="ArrowDown"){e.preventDefault();sel=Math.min(shown.length-1,sel+1);draw();}else if(e.key==="ArrowUp"){e.preventDefault();sel=Math.max(0,sel-1);draw();}else if(e.key==="Enter"){e.preventDefault();pick(sel);}});
  $("r315L").addEventListener("click",function(e){var b=e.target.closest(".r315-it");if(b)pick(+b.getAttribute("data-i"));});draw();setTimeout(function(){$("r315Q").focus();},0);}
/* ---------- the map ---------- */
function map(){var s=sheetOf("wide","The map of Fabrica"),rm=room(),v=view();
  var h='<div class="r315-shead"><h2>The map of Fabrica</h2><button class="r315-x" type="button" id="r315MX">Close</button></div><div class="r315-map">';
  ROOMS.forEach(function(r){h+='<div class="r315-mroom'+(r[0]===rm?" here":"")+'"><h3>'+r[1]+'</h3><div class="g">On GitHub: '+esc(RGH[r[0]])+'</div>';
    r[2].forEach(function(t){var l=L(r[0],t[0]);h+='<button class="r315-mtab'+(t[0]===v?" here":"")+'" type="button" data-v="'+t[0]+'"><b>'+t[1]+(LEARNED[r[0]+"/"+t[0]]?" ✓":"")+'</b><small>'+esc(l?l[1]:"")+'</small></button>';});h+='</div>';});
  h+='<div class="r315-mroom"><h3>Test and ship</h3><div class="g">The panel on the right</div>'+PARTS.map(function(p){var c=R()&&R().caps&&R().caps.part[p[0]];return '<button class="r315-mtab" type="button" data-p="'+p[0]+'"><b>'+p[1]+(LEARNED["part/"+p[0]]?" ✓":"")+'</b><small>'+esc(c?c[1]:"")+'</small></button>';}).join("")+'</div></div>';
  s.innerHTML=h;$("r315MX").onclick=closeAll;
  s.addEventListener("click",function(e){var b=e.target.closest(".r315-mtab");if(!b)return;closeAll();if(b.getAttribute("data-p")){learn("part/"+b.getAttribute("data-p"));openPart(b.getAttribute("data-p"));}else openView(b.getAttribute("data-v"));});setTimeout(function(){$("r315MX").focus();},0);}
function keys(){var s=sheetOf("","Keys in Fabrica");s.innerHTML='<div class="r315-shead"><h2>Keys in Fabrica</h2><button class="r315-x" type="button" id="r315KX">Close</button></div><div class="r315-keys">'+
  [["Go to anything","/"],["The map","M"],["Now","G then N"],["Story","G then S"],["Plans","G then P"],["Runs","G then R"],["Care","G then C"],["Teach me as I go","T"],["These keys","?"],["Close","Esc"]].map(function(k){return '<div><span>'+k[0]+'</span><kbd>'+k[1]+'</kbd></div>';}).join("")+'</div>';
  $("r315KX").onclick=closeAll;setTimeout(function(){$("r315KX").focus();},0);}
/* ---------- the four chips she named, and the crumbs: keys that do something ---------- */
D.addEventListener("click",function(e){var b=e.target.closest&&e.target.closest("#fb .f-chip, #fb .r315-crumb");if(!b)return;
  if(b.classList.contains("r315-crumb")){var c=b.getAttribute("data-c");if(c==="lib"){try{X().openLibrary();}catch(x){}}else if(c==="go")palette();else map();return;}
  if(b.tagName==="BUTTON"&&!b.classList.contains("f-chip"))return;
  var t=b.textContent.trim(),inShip=!!b.closest("#fbShip"),inWorkHead=!!b.closest("#fbWork")&&!b.closest("#fbWorkBody");
  if(inShip&&/^(Waiting|Not tested yet|Tested|Passed|\d+ of \d+)/i.test(t)){openPart("test");setTimeout(function(){glow(findKey("#fbShip","Test this version")||findKey("#fbShip","Test"));},300);return;}
  if(inWorkHead&&/^(Kept|\d+ not kept|Not kept|Changed)/i.test(t)){openView("changes");return;}},true);
/* the panels lean toward the pointer */
D.addEventListener("pointermove",function(e){var p=e.target.closest&&e.target.closest("#fb .f-pn");if(!p||still()||e.pointerType==="touch")return;var r=p.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;
  p.style.transform="perspective(1600px) rotateY("+(x*1.4).toFixed(2)+"deg) rotateX("+(-y*1.1).toFixed(2)+"deg)";},{passive:true});
D.addEventListener("pointerout",function(e){var p=e.target.closest&&e.target.closest("#fb .f-pn");if(p&&!(e.relatedTarget&&p.contains(e.relatedTarget)))p.style.transform="";},{passive:true});
/* keys, only on Fabrica and not while typing */
var G=0;D.addEventListener("keydown",function(e){var pg=$("page-fabrica");if(!pg||!pg.classList.contains("active"))return;var t=e.target,typing=t&&(t.tagName==="INPUT"||t.tagName==="TEXTAREA"||t.isContentEditable);
  if(e.key==="Escape"&&$("r315Veil")){closeAll();return;}if(typing||$("r315Veil"))return;if(!cur())return;
  if((e.key==="k"||e.key==="K")&&(e.ctrlKey||e.metaKey)){e.preventDefault();palette();return;}if(e.ctrlKey||e.metaKey||e.altKey)return;
  if(e.key==="/"){e.preventDefault();palette();return;}if(e.key==="?"){keys();return;}if(e.key==="m"||e.key==="M"){map();return;}
  if(e.key==="t"||e.key==="T"){var s=$("r315Teach");if(s)s.click();return;}if(e.key==="g"||e.key==="G"){G=Date.now();return;}
  if(Date.now()-G<1500){var m={n:"changes",s:"history",p:"issues",r:"runs",c:"actions"}[e.key.toLowerCase()];if(m){G=0;openView(m);}}});
/* painted again as Fabrica paints itself */
function watch(){var fb=$("fb");if(!fb||fb.__r315)return false;fb.__r315=1;
  try{new MutationObserver(function(ms){for(var i=0;i<ms.length;i++){var t=ms[i].target;if(BAR&&(BAR.contains(t)||t===BAR))continue;if(NEXT&&(NEXT.contains(t)||t===NEXT))continue;if(t.closest&&t.closest(".r315-lesson,.r315-n"))continue;if(t.classList&&t.classList.contains("fr-room")&&[].every.call(ms[i].addedNodes,function(n){return n.classList&&n.classList.contains("r315-n");})&&[].every.call(ms[i].removedNodes,function(n){return n.classList&&n.classList.contains("r315-n");}))continue;paintSoon();var rm=room(),v=view();if(rm&&v)learn(rm+"/"+v);return;}}).observe(fb,{childList:true,subtree:true});}catch(e){}
  paint();return true;}
var og=W.go;if(typeof og==="function")W.go=function(p){var r=og.apply(this,arguments);try{if(p==="fabrica")setTimeout(function(){watch();paint();},60);else closeAll();}catch(e){}return r;};
function boot(){if(!watch())setTimeout(boot,1500);}
if(D.readyState==="loading")D.addEventListener("DOMContentLoaded",function(){setTimeout(boot,0);});else setTimeout(boot,0);
W.IngFabricaWay={paint:paint,palette:palette,map:map,keys:keys,close:closeAll,next:nextStep,counts:counts,learned:function(){return Object.keys(LEARNED);},total:TOTAL,teach:function(on){if(on!=null){TEACH=!!on;try{localStorage.setItem(TK,TEACH?"1":"0");}catch(e){}paint();}return TEACH;}};
})();
;try{window.__ingParts["p315"]="running";}catch(_){}
</script>
