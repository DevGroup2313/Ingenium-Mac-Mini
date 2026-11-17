<style id="r314-css">
/* ============ R314 · THE DIAMOND'S COLOURS, WITHIN REACH (Ingenium 7.29; refined for 7.30, 17 November 2026) ============
   Her words (17 November 2026): "I want a clear way to edit Adamas' diamond and change the colours as I please, I can't locate the
   settings for it. Please make it accessible and visible for me." Approved as a preview, then, on it: "I want the panel to open beside
   the diamond and for the controls button to be a little button on the top right side of the 3D header of the Adamas page in the same
   format as Ingenium's introduction door ... I also want the diamonds emojis to actually look like real diamond emojis and look more
   refined and actually match the 3D diamond from the Adamas page instead of looking like cheap renditions of it. I want the graphics and
   3D design of the panel to be refined and elevated and made befitting of the Adamas page and the rest of Ingenium."
   - The key: a small key in the head's top-right corner, in the welcome door's form (modules/r197.js .intro-corner: a well holding one
     round key, its words its tooltip), a cut diamond drawn in line.
   - The panel opens beside the diamond: the head's words step aside, the diamond glides toward the middle, and the panel unfolds from the
     key down the head's right side (under the keys on a narrow screen).
   - Every diamond in it is a brilliant cut seen from the side, as the 3D diamond is (its table, six crown facets, four pavilion facets,
     light from the upper left, a four-pointed glint): By the hour shows the four looks in its facets; a colour of her own is cut in it.
   - The panel: a slab of frosted glass with a silver bezel, as the holder's; its parts engraved; its keys raised, the chosen one lit.
   Kept with Ingenium's settings (state.diamond). With nothing chosen, the diamond is exactly as before. */
.dmc{--dmc-hi:var(--card-hi,#ffffff);--dmc-lo:var(--card-lo,#f4f0f9);--dmc-ink1:var(--ink-1,#221a2e);--dmc-ink2:var(--ink-2,#4a4358);--dmc-ink3:var(--ink-3,#6c6579);
  --dmc-hair:rgba(70,52,110,.13);--dmc-acc:var(--accent,#6a3fb5);--dmc-pa:#7a50c6;--dmc-pb:#5a33a0;--dmc-pedge:#43267e;
  --dmc-glass:linear-gradient(180deg,rgba(255,255,255,.94),rgba(250,247,254,.90) 46%,rgba(243,238,251,.92));
  --dmc-bezel:linear-gradient(150deg,#ffffff 0%,#d8d2e4 22%,#9d95b2 46%,#f4f1f8 62%,#b7aecb 82%,#ece8f3 100%);
  --dmc-key:linear-gradient(180deg,#ffffff,#f3eff9);--dmc-keysh:inset 0 1px 0 #fff,inset 0 -1.5px 0 rgba(40,22,68,.10),0 1px 0 rgba(40,22,68,.18),0 3px 5px rgba(40,22,68,.13),0 8px 14px rgba(40,22,68,.08);
  --dmc-keyhi:inset 0 1px 0 #fff,inset 0 -1.5px 0 rgba(40,22,68,.10),0 2px 0 rgba(40,22,68,.2),0 6px 9px rgba(40,22,68,.16),0 12px 20px rgba(40,22,68,.1);
  --dmc-slab:inset 0 1px 0 rgba(255,255,255,.95),inset 0 -1px 0 rgba(120,96,170,.08),0 2px 0 rgba(60,40,100,.06),0 14px 30px rgba(70,44,130,.18),0 34px 70px rgba(70,44,130,.16);
  --dmc-well:inset 0 1px 2.5px rgba(40,22,68,.12),inset 0 -1px 0 rgba(255,255,255,.7);--dmc-wellbg:rgba(60,40,100,.045);
  --dmc-glow:0 0 0 1px rgba(255,255,255,.55),0 0 14px rgba(160,120,240,.45);
  position:relative;box-sizing:border-box;color:var(--dmc-ink1);font:500 13px/1.4 Inter,var(--sans,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif);text-align:left}
body[data-theme="night"] .dmc{--dmc-hi:#2c2340;--dmc-lo:#1d1729;--dmc-ink1:#f3eefc;--dmc-ink2:#d4cae6;--dmc-ink3:#a89cc2;--dmc-hair:rgba(205,184,240,.14);--dmc-acc:#c9b2f2;
  --dmc-glass:linear-gradient(180deg,rgba(46,36,66,.94),rgba(30,23,44,.93) 50%,rgba(24,18,36,.95));
  --dmc-bezel:linear-gradient(150deg,#b9aed6 0%,#4c4068 24%,#2a2140 46%,#8e80b4 64%,#3b3056 84%,#a597c9 100%);
  --dmc-key:linear-gradient(180deg,#352a4b,#271f37);--dmc-keysh:inset 0 1px 0 rgba(255,255,255,.08),inset 0 -2px 0 rgba(0,0,0,.4),0 2px 0 rgba(0,0,0,.7),0 4px 6px rgba(0,0,0,.45),0 9px 14px rgba(0,0,0,.3);
  --dmc-keyhi:inset 0 1px 0 rgba(255,255,255,.1),inset 0 -2px 0 rgba(0,0,0,.4),0 3px 0 rgba(0,0,0,.7),0 7px 10px rgba(0,0,0,.5),0 14px 22px rgba(0,0,0,.35);
  --dmc-slab:inset 0 1px 0 rgba(255,255,255,.08),0 2px 0 rgba(0,0,0,.4),0 16px 34px rgba(0,0,0,.5),0 38px 80px rgba(20,8,50,.55),0 0 40px rgba(120,80,220,.12);
  --dmc-well:inset 0 1px 3px rgba(0,0,0,.5),inset 0 -1px 0 rgba(255,255,255,.05);--dmc-wellbg:rgba(8,4,16,.35);--dmc-glow:0 0 0 1px rgba(255,255,255,.18),0 0 16px rgba(170,130,255,.5)}

/* ---------- the key in the head's top-right corner: the welcome door's sign-in key, value for value (modules/r197.js .intro-corner,
   .intro-lockpill, read from the 7.29 page as Chrome draws it): a well 37 by 32 points, 15 from the top, a key 29 by 24, its icon
   12.6 points in a 1.5 stroke, the app's quiet grey; under the pointer and while the panel is open its icon deepens a shade, with no
   tint (her word: "I don't want any purple shading over the button when I hover over it") ---------- */
.skh .dmc-corner{position:absolute;top:15px;right:15px;z-index:9;pointer-events:auto}
.skh .dmc-pill{display:inline-flex;gap:2px;padding:3px;border-radius:999px;border:1px solid var(--hairline,rgba(34,26,46,.10));background:var(--input-bg,rgba(34,26,46,.03));
  box-shadow:inset 0 1px 2.5px rgba(40,22,68,.08)}
body[data-theme="night"] .skh .dmc-pill{border-color:var(--hairline,rgba(205,184,240,.11));background:var(--input-bg,rgba(10,6,18,.35));box-shadow:inset 0 1px 3px rgba(0,0,0,.4)}
.skh .dmc-ck{display:flex;align-items:center;justify-content:center;height:24px;padding:2px 8px;border:0;border-radius:999px;background:transparent;color:var(--ink-3,#6c6579);
  font-size:12px;line-height:12px;cursor:pointer;transition:color .15s,background .15s ease,transform .15s}
.skh .dmc-ck svg{width:1.05em;height:1.05em;display:block}
.skh .dmc-ck:hover,.skh .dmc-ck[aria-expanded="true"]{color:var(--ink-1,#221a2e);background:transparent}
body[data-theme="night"] .skh .dmc-ck{color:var(--ink-3,#a99cc1)}
body[data-theme="night"] .skh .dmc-ck:hover,body[data-theme="night"] .skh .dmc-ck[aria-expanded="true"]{color:var(--ink-1,#f1ecfa);background:transparent}
.skh .dmc-ck:focus-visible{outline:2.5px solid var(--accent,#6a3fb5);outline-offset:3px}

/* ---------- beside the diamond: the words step aside, the diamond glides toward the middle, the panel unfolds from the key ---------- */
.skh .skh-words,.skh .skh-hint{transition:opacity .32s ease,transform .45s cubic-bezier(.2,.8,.2,1)}
.skh .skh-obj{transition:translate .62s cubic-bezier(.22,.9,.22,1)}
.skh.dmc-beside .skh-words,.skh.dmc-beside .skh-hint{opacity:0;transform:translateX(-18px);pointer-events:none}
.skh.dmc-beside .skh-obj{translate:calc(var(--dmc-shift,0px) * -1) 0}
.skh .dmc.dmc-side{position:absolute;right:20px;top:60px;bottom:18px;width:var(--dmc-w,430px);z-index:9;transform-origin:calc(100% - 22px) -30px;animation:dmcUnfold .46s cubic-bezier(.2,.9,.25,1.06) both}
.skh .dmc.dmc-over{position:absolute;left:22px;top:18px;bottom:18px;width:min(540px,calc(100% - 560px));min-width:380px;z-index:9;animation:dmcRise .36s cubic-bezier(.2,.8,.2,1) both}
.skh .dmc.dmc-flow{position:relative;margin:14px 0 4px;pointer-events:auto;animation:dmcRise .36s cubic-bezier(.2,.8,.2,1) both}
@keyframes dmcUnfold{from{opacity:0;transform:scale(.84) translateY(-10px)}60%{opacity:1}to{opacity:1;transform:none}}
@keyframes dmcRise{from{opacity:0;transform:translateY(10px) scale(.985)}to{opacity:1;transform:none}}
@keyframes dmcIn{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:none}}
.skh .dmc *{pointer-events:auto}

/* ---------- the slab: frosted glass in a silver bezel ---------- */
.skh .dmc.dmc-side,.skh .dmc.dmc-over,.skh .dmc.dmc-flow{display:flex;flex-direction:column;padding:0;border-radius:22px;border:1.5px solid transparent;
  background:var(--dmc-glass) padding-box,var(--dmc-bezel) border-box;box-shadow:var(--dmc-slab);-webkit-backdrop-filter:blur(16px) saturate(1.15);backdrop-filter:blur(16px) saturate(1.15);overflow:hidden}
.dmc-scroll{flex:1 1 auto;min-height:0;overflow:auto;overscroll-behavior:contain;padding:14px 18px 6px;scrollbar-width:none;-ms-overflow-style:none}
.dmc-scroll::-webkit-scrollbar{width:0;height:0;display:none}   /* her rule: no scroll bar in view, in any of her apps; the scrolling stays */
.dmc-scroll > *{animation:dmcIn .4s cubic-bezier(.2,.8,.2,1) both}
.dmc-scroll > :nth-child(2){animation-delay:.05s}.dmc-scroll > :nth-child(3){animation-delay:.1s}.dmc-scroll > :nth-child(4){animation-delay:.15s}.dmc-scroll > :nth-child(5){animation-delay:.2s}
.dmc:focus{outline:none}
.dmc-top{display:grid;grid-template-columns:auto minmax(0,1fr) auto;gap:12px;align-items:center;padding:14px 16px 12px 16px;border-bottom:1px solid var(--dmc-hair);
  background:linear-gradient(180deg,rgba(255,255,255,.55),rgba(255,255,255,0))}
body[data-theme="night"] .dmc-top{background:linear-gradient(180deg,rgba(255,255,255,.05),rgba(255,255,255,0))}
/* the chosen stone, set in a small silver bezel, as on the holder */
.dmc-setting{position:relative;display:grid;place-items:center;width:46px;height:46px;border-radius:50%;
  background:radial-gradient(circle at 50% 42%,rgba(255,255,255,.9),rgba(255,255,255,0) 60%),conic-gradient(from 210deg,#f6f4fa,#bdb5cf,#8e86a5,#e9e5f1,#a8a0bd,#f6f4fa);
  box-shadow:inset 0 0 0 3px rgba(255,255,255,.6),inset 0 2px 6px rgba(40,22,68,.25),0 2px 0 rgba(40,22,68,.18),0 6px 12px rgba(40,22,68,.16)}
body[data-theme="night"] .dmc-setting{background:radial-gradient(circle at 50% 42%,rgba(190,160,255,.25),rgba(0,0,0,0) 62%),conic-gradient(from 210deg,#8d80b0,#3a2f52,#241c35,#7a6ca0,#2f2645,#8d80b0);
  box-shadow:inset 0 0 0 3px rgba(255,255,255,.08),inset 0 2px 6px rgba(0,0,0,.5),0 2px 0 rgba(0,0,0,.6),0 6px 12px rgba(0,0,0,.4)}
.dmc-setting svg{width:30px;height:30px;filter:drop-shadow(0 1.5px 1.5px rgba(30,10,60,.3))}
.dmc-top b{display:block;font:600 21px/1.1 "Cormorant Garamond",var(--serif,"Iowan Old Style",Palatino,Georgia,serif);letter-spacing:.005em;color:var(--dmc-ink1)}
.dmc-top small{display:block;margin-top:3px;font-size:11.8px;line-height:1.4;color:var(--dmc-ink3)}
.dmc-x{width:30px;height:30px;border-radius:50%;border:1px solid var(--dmc-hair);background:var(--dmc-key);box-shadow:var(--dmc-keysh);color:var(--dmc-ink2);
  font:500 16px/1 Inter,var(--sans,sans-serif);cursor:pointer;transition:transform .16s cubic-bezier(.34,1.35,.64,1),box-shadow .16s}
.dmc-x:hover{transform:translateY(-2px);box-shadow:var(--dmc-keyhi)}
/* engraved parts */
.dmc-sec{margin:0 0 4px;padding:6px 0 10px}
.dmc-l{display:flex;align-items:center;gap:10px;margin:2px 0 9px;font:600 10px/1 Inter,var(--sans,sans-serif);letter-spacing:.24em;text-transform:uppercase;color:var(--dmc-ink3)}
.dmc-l::after{content:"";flex:1 1 auto;height:1px;background:linear-gradient(90deg,var(--dmc-hair),rgba(0,0,0,0));box-shadow:0 1px 0 rgba(255,255,255,.6)}
body[data-theme="night"] .dmc-l::after{box-shadow:0 1px 0 rgba(255,255,255,.04)}
/* the choices: each a cut stone standing alone, turning slowly and catching the light, its name beneath (her words: "I want the
   crystals diamonds to be animated and be 3D alone without the acrylic button and the names written together on the same button");
   the chosen one floats a little higher over a soft light, its name in Ingenium's violet, a dot beneath */
.dmc-chips{display:grid;grid-template-columns:repeat(6,minmax(0,1fr));gap:2px 0;align-items:start}
.dmc-chips.two{grid-template-columns:repeat(2,minmax(0,86px));justify-content:start;gap:2px 10px}
#dmcCard .dmc-chips{grid-template-columns:repeat(6,minmax(0,96px))}
.dmc-c{position:relative;display:grid;justify-items:center;align-content:start;gap:6px;min-width:0;margin:0;padding:4px 2px 4px;border:0;border-radius:12px;background:none;box-shadow:none;
  color:var(--dmc-ink2);font:600 11px/1.22 Inter,var(--sans,sans-serif);text-align:center;cursor:pointer;-webkit-tap-highlight-color:transparent}
.dmc-g{position:relative;display:grid;place-items:center;width:46px;height:46px;perspective:180px;transition:transform .3s cubic-bezier(.34,1.4,.64,1)}
.dmc-g::after{content:"";position:absolute;left:9px;right:9px;bottom:1px;height:7px;border-radius:50%;background:radial-gradient(closest-side,rgba(40,22,68,.30),rgba(40,22,68,0));
  transition:transform .3s cubic-bezier(.2,.8,.2,1),opacity .3s}
body[data-theme="night"] .dmc-g::after{background:radial-gradient(closest-side,rgba(0,0,0,.6),rgba(0,0,0,0))}
.dmc-t{display:grid;place-items:center;transform-style:preserve-3d;animation:dmcTurn 7.2s ease-in-out infinite;animation-delay:calc(var(--i,0) * -1.1s);will-change:transform}
.dmc-t svg{width:38px;height:38px;overflow:visible;filter:drop-shadow(0 2px 1.5px rgba(30,10,60,.28))}
.dmc-t svg .glint{transform-box:fill-box;transform-origin:center;animation:dmcGlint 3.6s ease-in-out infinite;animation-delay:calc(var(--i,0) * -.7s)}
@keyframes dmcTurn{0%{transform:rotateY(-26deg) translateY(0)}50%{transform:rotateY(26deg) translateY(-2px)}100%{transform:rotateY(-26deg) translateY(0)}}
@keyframes dmcGlint{0%,62%,100%{opacity:0;transform:scale(.3)}72%{opacity:1;transform:scale(1.15)}84%{opacity:.4;transform:scale(.7)}}
.dmc-c:hover .dmc-t{animation-duration:3.6s}
.dmc-c:hover .dmc-g{transform:translateY(-2px)}
.dmc-c[aria-checked="true"]{color:var(--dmc-acc)}
.dmc-c[aria-checked="true"] .dmc-g{transform:translateY(-4px) scale(1.1)}
.dmc-c[aria-checked="true"] .dmc-g::before{content:"";position:absolute;inset:-4px -2px 2px;border-radius:50%;background:radial-gradient(closest-side,rgba(160,120,240,.32),rgba(160,120,240,0));z-index:-1}
body[data-theme="night"] .dmc-c[aria-checked="true"] .dmc-g::before{background:radial-gradient(closest-side,rgba(190,150,255,.34),rgba(190,150,255,0))}
.dmc-c[aria-checked="true"] .dmc-g::after{transform:scaleX(.82);opacity:.7}
.dmc-c[aria-checked="true"] svg{filter:drop-shadow(0 0 6px rgba(255,255,255,.65)) drop-shadow(0 2px 2px rgba(30,10,60,.3))}
.dmc-c .dmc-n{display:block;max-width:100%;padding:0 1px}
.dmc-c[aria-checked="true"] .dmc-n::after{content:"";display:block;width:4px;height:4px;margin:4px auto 0;border-radius:50%;background:var(--dmc-acc)}
.dmc-c:active .dmc-g{transform:translateY(1px) scale(.97)}
.dmc-c:focus-visible,.dmc-s:focus-visible,.dmc-x:focus-visible,.dmc-k:focus-visible,.dmc-any:focus-within{outline:2.5px solid var(--dmc-acc);outline-offset:3px}
.dmc-note{margin:8px 1px 0;font-size:11.8px;line-height:1.5;color:var(--dmc-ink3)}
.dmc-note b{color:var(--dmc-ink2);font-weight:600}
/* her own colour: eight cut stones and any colour, in a well; how deep */
.dmc-own{margin:10px 0 0;padding:10px 10px 9px;border-radius:15px;background:var(--dmc-wellbg);box-shadow:var(--dmc-well)}
.dmc-own[hidden]{display:none}
.dmc-sw8{display:grid;grid-template-columns:repeat(9,minmax(0,1fr));gap:4px;align-items:center;justify-items:center}
.dmc-s,.dmc-any{position:relative;display:grid;place-items:center;width:38px;height:40px;padding:0;border:0;border-radius:50%;background:none;cursor:pointer;perspective:160px;
  transition:transform .3s cubic-bezier(.34,1.4,.64,1);-webkit-tap-highlight-color:transparent}
.dmc-s .dmc-t svg,.dmc-any .dmc-t svg{width:30px;height:30px}
.dmc-s:hover,.dmc-any:hover{transform:translateY(-2px)}
.dmc-s:hover .dmc-t,.dmc-any:hover .dmc-t{animation-duration:3.6s}
.dmc-s[aria-checked="true"],.dmc-any[aria-checked="true"]{transform:translateY(-3px) scale(1.12)}
.dmc-s[aria-checked="true"]::before,.dmc-any[aria-checked="true"]::before{content:"";position:absolute;inset:-2px;border-radius:50%;background:radial-gradient(closest-side,rgba(160,120,240,.34),rgba(160,120,240,0))}
.dmc-s[aria-checked="true"] svg,.dmc-any[aria-checked="true"] svg{filter:drop-shadow(0 0 6px rgba(255,255,255,.7)) drop-shadow(0 1px 1px rgba(30,10,60,.35))}
.dmc-any input{position:absolute;inset:0;width:100%;height:100%;opacity:0;cursor:pointer;border:0;padding:0}
.dmc-swn{margin:6px 2px 0;font-size:11.5px;color:var(--dmc-ink3);min-height:1.4em}
.dmc-swn b{color:var(--dmc-ink2);font-weight:600}
.dmc-depth{display:grid;grid-template-columns:auto minmax(0,1fr) auto;gap:10px;align-items:center;margin:8px 2px 0;font-size:11.5px;color:var(--dmc-ink3)}
.dmc-depth input[type=range]{-webkit-appearance:none;appearance:none;width:100%;height:20px;background:transparent;margin:0;cursor:pointer}
.dmc-depth input[type=range]::-webkit-slider-runnable-track{height:8px;border-radius:999px;background:linear-gradient(90deg,var(--dmc-faint,#f3eef9),var(--dmc-deep,#c8143c));box-shadow:var(--dmc-well)}
.dmc-depth input[type=range]::-moz-range-track{height:8px;border-radius:999px;background:linear-gradient(90deg,var(--dmc-faint,#f3eef9),var(--dmc-deep,#c8143c));box-shadow:var(--dmc-well)}
.dmc-depth input[type=range]::-webkit-slider-thumb{-webkit-appearance:none;width:20px;height:20px;margin-top:-6px;border-radius:50%;border:0;
  background:radial-gradient(circle at 36% 30%,#ffffff,#e4dfee 45%,#9c94b2);box-shadow:0 0 0 2px rgba(255,255,255,.8),0 2px 0 rgba(40,22,68,.25),0 4px 8px rgba(40,22,68,.3)}
.dmc-depth input[type=range]::-moz-range-thumb{width:20px;height:20px;border-radius:50%;border:0;background:radial-gradient(circle at 36% 30%,#ffffff,#e4dfee 45%,#9c94b2);box-shadow:0 2px 0 rgba(40,22,68,.25),0 4px 8px rgba(40,22,68,.3)}
.dmc-row{display:flex;align-items:center;justify-content:space-between;gap:12px;padding:2px 1px}
.dmc-row span{font-size:12.5px;color:var(--dmc-ink2)}
/* the light: Ingenium's own switch, a well when off and a lit violet key when on, its knob springing across (as Settings' since 7.28) */
.dmc-sw{position:relative;flex:0 0 auto;width:46px;height:26px;padding:0;border:0;border-radius:999px;cursor:pointer;background:var(--dmc-wellbg);box-shadow:var(--dmc-well),0 0 0 1px var(--dmc-hair);
  transition:background .22s ease,box-shadow .22s ease}
.dmc-sw i{position:absolute;top:3px;left:3px;width:20px;height:20px;border-radius:50%;background:linear-gradient(#ffffff,#e7e1ef);box-shadow:0 2px 0 rgba(40,22,68,.22),0 3px 6px rgba(40,22,68,.22);
  transition:transform .32s cubic-bezier(.34,1.56,.64,1),box-shadow .22s}
.dmc-sw[aria-checked="true"]{background:linear-gradient(180deg,#7a50c6,#5a33a0);box-shadow:inset 0 1px 0 rgba(255,255,255,.22),0 1px 0 #36196a,0 0 0 1px #43267e,0 3px 8px rgba(60,30,120,.28)}
.dmc-sw[aria-checked="true"] i{transform:translateX(20px);box-shadow:0 2px 0 rgba(30,10,60,.3),0 0 10px rgba(201,179,242,.7)}
body[data-theme="night"] .dmc-sw i{background:linear-gradient(#efe8fb,#cdbfe6)}
.dmc-sw:focus-visible{outline:2.5px solid var(--dmc-acc);outline-offset:3px}
.dmc-foot{display:flex;flex-wrap:wrap;gap:8px;justify-content:space-between;align-items:center;padding:11px 16px 13px;border-top:1px solid var(--dmc-hair);
  background:linear-gradient(180deg,rgba(255,255,255,.35),rgba(255,255,255,.65))}
body[data-theme="night"] .dmc-foot{background:linear-gradient(180deg,rgba(255,255,255,.02),rgba(255,255,255,.05))}
.dmc-k{min-height:34px;padding:7px 15px;border-radius:12px;border:1px solid var(--dmc-hair);background:var(--dmc-key);box-shadow:var(--dmc-keysh);
  color:var(--dmc-ink2);font:600 12.5px/1.2 Inter,var(--sans,sans-serif);cursor:pointer;transition:transform .16s cubic-bezier(.34,1.35,.64,1),box-shadow .16s}
.dmc-k:hover{transform:translateY(-2px);box-shadow:var(--dmc-keyhi)}
.dmc-k.pri{color:#fff;background:linear-gradient(180deg,var(--dmc-pa),var(--dmc-pb));border-color:var(--dmc-pedge);text-shadow:0 1px 1px rgba(30,10,60,.32);
  box-shadow:inset 0 1px 0 rgba(255,255,255,.25),0 1px 0 #36196a,0 4px 8px rgba(60,30,120,.28)}
/* in Settings: the panel flat inside its card (the card is the raised part) */
#dmcCard .dmc{margin-top:4px}
#dmcCard .dmc-top{display:none}
#dmcCard .dmc-scroll{padding:0;overflow:visible}
#dmcCard .dmc-chips{grid-template-columns:repeat(auto-fill,minmax(140px,1fr))}
#dmcCard .dmc-foot{padding:10px 0 0;background:none}
@media (prefers-reduced-motion:reduce){.dmc .dmc-t,.dmc .glint,.dmc,.dmc *,.skh .skh-obj,.skh .skh-words,.skh .skh-hint{animation:none !important;transition:none !important}}
body[data-motion="minimal"] .dmc,body[data-motion="minimal"] .dmc *,body[data-motion="minimal"] .skh .skh-obj,body[data-motion="minimal"] .skh .skh-words{animation:none !important;transition:none !important}
</style>
<script>try{(window.__ingParts=window.__ingParts||{})["p314"]="started";}catch(_){}
/* R314 (7.29, refined in 7.30): the diamond's colours, from a key in the corner of Adamas's head and in Settings, kept with Ingenium's settings */
(function(){var D=document,W=window;
var LOOKS=[["auto","By the hour"],["clear","Clear crystal"],["lavender","Lavender"],["purple","Purple"],["night","Night stone"],["own","Your own colour"]];
var JEWELS=[["Ruby","#c8143c"],["Rose","#e8649a"],["Amber","#e8962a"],["Citrine","#e7cc3e"],["Emerald","#1f9d63"],["Aqua","#2fb7c7"],["Sapphire","#2f5bd3"],["Amethyst","#8e4fe0"]];
/* the looks' own colours, as the stone shows them (r292's tints, lit) */
var TONE={clear:"#dfe9f7",lavender:"#b9a0ee",purple:"#7a4bd6",night:"#3c2878",violet:"#6a3fb5"};
var DEF={look:"auto",stone:"#c8143c",depth:0.6,band:null,light:true};
var SAY={auto:"From 5:00 the <b>clear crystal</b>, from 11:00 <b>lavender</b>, from 14:00 <b>purple</b>, from 18:00 the <b>night stone</b>. With the night theme on, it is always the night stone.",
  clear:"The clear crystal, white with a touch of steel blue, all day. With the night theme on, the night stone shows instead.",
  lavender:"Lavender, a light blue violet, all day. With the night theme on, the night stone shows instead.",
  purple:"The deeper day purple, all day. With the night theme on, the night stone shows instead.",
  night:"The night stone, deep violet, by day as by night.",
  own:"Your colour, cut into the stone: lit as the clear crystal by day and as the night stone by night. Deep makes it a coloured gem; faint keeps it close to clear."};
function st(){try{return typeof state!=="undefined"&&state?state:null;}catch(e){return null;}}  /* as modules/r309.js reaches it */
function hex(h){var m=/^#?([0-9a-f]{6})$/i.exec(String(h||""));return m?"#"+m[1].toLowerCase():null;}
function rgb(h){h=hex(h);return h?[parseInt(h.slice(1,3),16),parseInt(h.slice(3,5),16),parseInt(h.slice(5,7),16)]:null;}
function get(){var s=st(),d=s&&s.diamond&&typeof s.diamond==="object"?s.diamond:{},o={};
  o.look=LOOKS.some(function(l){return l[0]===d.look;})?d.look:DEF.look;o.stone=hex(d.stone)||DEF.stone;
  o.depth=typeof d.depth==="number"&&isFinite(d.depth)?Math.max(0.1,Math.min(1,d.depth)):DEF.depth;o.band=hex(d.band);o.light=d.light!==false;return o;}
function save(o){var s=st();if(!s)return;s.diamond={look:o.look,stone:o.stone,depth:Math.round(o.depth*100)/100,band:o.band||null,light:o.light!==false,at:Date.now()};
  try{if(typeof saveState==="function")saveState();}catch(e){}}
var LASTLOOK=null,LASTLIGHT=null;
function apply(){var d=get(),G=W.IngDiamond;if(!G)return;
  try{var v=d.look==="own"?"auto":d.look;if(v!==LASTLOOK){G.variant(v);LASTLOOK=v;}}catch(e){}
  try{if(G.tint)G.tint({stone:d.look==="own"?rgb(d.stone).concat([d.depth]):null,band:d.band?rgb(d.band):null});}catch(e){}
  try{if(d.light!==LASTLIGHT){if(LASTLIGHT!==null||!d.light)G.light(d.light);LASTLIGHT=d.light;}}catch(e){}}
function set(ch){var d=get();for(var k in ch)if(Object.prototype.hasOwnProperty.call(ch,k))d[k]=ch[k];save(d);apply();paintAll();
  try{if(W.IngSound&&ch.look)IngSound.play("paper");}catch(e){}}
function reset(){var s=st();if(s)delete s.diamond;try{if(typeof saveState==="function")saveState();}catch(e){}apply();paintAll();}
function mk(t,c,txt){var e=D.createElement(t);if(c)e.className=c;if(txt!=null)e.textContent=txt;return e;}

/* ---------- a brilliant cut, seen from the side, as the 3D diamond is: the table, six crown facets, four pavilion facets, the girdle;
   light from the upper left; white edges where facets meet; a four-pointed glint. tones: one colour, or four (By the hour) ---------- */
function mix(a,b,t){var x=rgb(a),y=rgb(b);return "rgb("+[0,1,2].map(function(i){return Math.round(x[i]+(y[i]-x[i])*t);}).join(",")+")";}
function shade(c,t){return t>=0?mix(c,"#ffffff",t):mix(c,"#000000",-t);}
var GSEQ=0;
function gem(tones,o){o=o||{};var id="dmcG"+(++GSEQ),T=Array.isArray(tones)?tones:[tones,tones,tones,tones],c=function(i){return T[Math.min(T.length-1,Math.floor(i))];};
  /* points: table 9..23 at y 7; girdle 2..30 at y 13; culet 16,29 */
  var t0=[9,7],tm=[16,7],t1=[23,7],g0=[2,13],g1=[9,13],g2=[16,13],g3=[23,13],g4=[30,13],cu=[16,29.5];
  function poly(pts,fill){return '<polygon points="'+pts.map(function(p){return p.join(",");}).join(" ")+'" fill="'+fill+'"/>';}
  /* crown: each facet's colour from its place (left to right across the four tones) and its light */
  var crown=[[[g0,t0,g1],0,.55],[[t0,g1,g2],.9,.18],[[t0,tm,g2],1.4,.72],[[tm,t1,g2],2.1,.38],[[t1,g2,g3],2.6,-.08],[[t1,g3,g4],3.4,-.24]];
  var pav=[[[g0,g1,cu],0.2,.18],[[g1,g2,cu],1.1,.42],[[g2,g3,cu],2.2,-.18],[[g3,g4,cu],3.3,-.42]];
  var s='<svg viewBox="0 0 32 32" aria-hidden="true" focusable="false"><defs><linearGradient id="'+id+'t" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ffffff" stop-opacity=".95"/><stop offset="1" stop-color="#ffffff" stop-opacity=".15"/></linearGradient></defs>';
  crown.forEach(function(f){s+=poly(f[0],shade(c(f[1]),f[2]));});pav.forEach(function(f){s+=poly(f[0],shade(c(f[1]),f[2]));});
  /* the table catches the light; the girdle is a fine bright line */
  s+='<polygon points="9,7 23,7 21,8.6 11,8.6" fill="url(#'+id+'t)" opacity=".85"/>';
  s+='<path d="M2 13H30" stroke="#ffffff" stroke-opacity=".75" stroke-width=".7"/>';
  s+='<path d="M9 7L9 13M16 7L16 13M23 7L23 13M9 13L16 29.5L23 13M16 13L16 29.5M9 7L16 13L23 7" stroke="#ffffff" stroke-opacity=".38" stroke-width=".45" fill="none"/>';
  s+='<polygon points="9,7 23,7 30,13 16,29.5 2,13" fill="none" stroke="'+shade(c(1.5),-.45)+'" stroke-opacity=".55" stroke-width=".7" stroke-linejoin="round"/>';
  if(o.glint!==false)s+='<path class="glint" d="M8.6 3.6L9.4 6 11.8 6.8 9.4 7.6 8.6 10 7.8 7.6 5.4 6.8 7.8 6Z" fill="#ffffff"/>';
  return s+"</svg>";}
function gemFor(look,d){d=d||get();if(look==="auto")return gem([TONE.clear,TONE.lavender,TONE.purple,TONE.night]);if(look==="own")return gem(d.stone);return gem(TONE[look]||TONE.violet);}
/* the holder, small: its silver platter and its enamel band */
function holder(band){var id="dmcH"+(++GSEQ);return '<svg viewBox="0 0 32 32" aria-hidden="true" focusable="false"><defs><linearGradient id="'+id+'s" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffffff"/><stop offset=".55" stop-color="#cfc9dc"/><stop offset="1" stop-color="#8d85a3"/></linearGradient>'+
  '<linearGradient id="'+id+'b" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="'+shade(band,-.35)+'"/><stop offset=".45" stop-color="'+shade(band,.25)+'"/><stop offset="1" stop-color="'+shade(band,-.4)+'"/></linearGradient></defs>'+
  '<ellipse cx="16" cy="21" rx="14" ry="5.6" fill="'+shade(band,-.5)+'" opacity=".25"/><path d="M2.5 15.5v4.2c0 3 6 5.5 13.5 5.5s13.5-2.5 13.5-5.5v-4.2" fill="url(#'+id+'s)"/>'+
  '<path d="M2.5 17.2v1.9c0 3 6 5.5 13.5 5.5s13.5-2.5 13.5-5.5v-1.9c0 3-6 5.5-13.5 5.5S2.5 20.2 2.5 17.2z" fill="url(#'+id+'b)"/>'+
  '<ellipse cx="16" cy="15.5" rx="13.5" ry="5.2" fill="url(#'+id+'s)" stroke="#ffffff" stroke-opacity=".8" stroke-width=".5"/><ellipse cx="16" cy="15.5" rx="8" ry="3" fill="none" stroke="'+shade(band,-.1)+'" stroke-opacity=".5" stroke-width=".6"/>'+
  '<path d="M16 13.6l.5 1.4 1.4.5-1.4.5-.5 1.4-.5-1.4-1.4-.5 1.4-.5z" fill="'+band+'"/></svg>';}
/* any colour: a cut stone in every colour */
function anyGem(){return gem(["#e0245e","#f1c40f","#2ecc71","#3498db"]);}
/* the corner key: a cut diamond in line, as the door's keys are drawn */
var KEYGEM='<svg viewBox="0 0 16 16" aria-hidden="true" focusable="false"><path d="M4.7 3.2h6.6l3.1 3.3L8 13.6 1.6 6.5z" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/><path d="M1.6 6.5h12.8M6.2 6.5 8 13.6l1.8-7.1" fill="none" stroke="currentColor" stroke-width="1.1" stroke-linejoin="round" opacity=".8"/></svg>';

var SEQ=0,PANELS=[];
/* one panel: painted from the settings whenever anything changes, so the head's and Settings' panels agree */
function panel(where){var id="dmc"+(++SEQ),p=mk("div","dmc");p.setAttribute("role","group");p.setAttribute("aria-label","The diamond's colours");p.setAttribute("data-where",where);
  var top=mk("div","dmc-top"),setg=mk("span","dmc-setting"),tw=mk("div");tw.appendChild(mk("b",null,"The diamond's colours"));
  tw.appendChild(mk("small",null,"Each choice shows on the diamond at once, and is kept with your settings and your backups."));top.appendChild(setg);top.appendChild(tw);
  if(where==="head"){var x=mk("button","dmc-x","×");x.type="button";x.setAttribute("aria-label","Close the diamond's colours");x.addEventListener("click",function(){closeHead(true);});top.appendChild(x);}
  p.appendChild(top);var sc=mk("div","dmc-scroll");p.appendChild(sc);
  /* the stone */
  var s1=mk("div","dmc-sec"),l1=mk("div","dmc-l","The stone");l1.id=id+"s";s1.appendChild(l1);var ch=mk("div","dmc-chips");ch.setAttribute("role","radiogroup");ch.setAttribute("aria-labelledby",l1.id);
  var lk={};LOOKS.forEach(function(L,ix){var b=mk("button","dmc-c");b.type="button";b.setAttribute("role","radio");b.setAttribute("data-look",L[0]);b.setAttribute("aria-label",L[1]);b.style.setProperty("--i",String(ix));
    var gw=mk("span","dmc-g"),g=mk("span","dmc-t");gw.appendChild(g);b.appendChild(gw);b.appendChild(mk("span","dmc-n",L[1]));
    b.addEventListener("click",function(){set({look:L[0]});});ch.appendChild(b);lk[L[0]]={b:b,g:g};});
  s1.appendChild(ch);var note=mk("p","dmc-note");s1.appendChild(note);
  var own=mk("div","dmc-own"),sw1=swatches(id+"o",function(h){set({look:"own",stone:h});},"stone"),swn1=mk("p","dmc-swn");own.appendChild(sw1);own.appendChild(swn1);
  var dp=mk("label","dmc-depth");dp.appendChild(mk("span",null,"Faint"));var rg=mk("input");rg.type="range";rg.min="0.1";rg.max="1";rg.step="0.05";rg.setAttribute("aria-label","How deep your colour is, faint to deep");
  rg.addEventListener("input",function(){set({look:"own",depth:+rg.value});});dp.appendChild(rg);dp.appendChild(mk("span",null,"Deep"));own.appendChild(dp);s1.appendChild(own);sc.appendChild(s1);
  /* the holder's band */
  var s2=mk("div","dmc-sec"),l2=mk("div","dmc-l","The holder's band");l2.id=id+"b";s2.appendChild(l2);var ch2=mk("div","dmc-chips two");ch2.setAttribute("role","radiogroup");ch2.setAttribute("aria-labelledby",l2.id);
  var bv=mk("button","dmc-c");bv.type="button";bv.setAttribute("role","radio");bv.setAttribute("aria-label","Ingenium's violet");bv.style.setProperty("--i","1");bv.innerHTML='<span class="dmc-g"><span class="dmc-t">'+holder(TONE.violet)+"</span></span>";bv.appendChild(mk("span","dmc-n","Ingenium's violet"));bv.addEventListener("click",function(){set({band:null});});
  var bo=mk("button","dmc-c");bo.type="button";bo.setAttribute("role","radio");bo.setAttribute("aria-label","Your own colour, for the band");bo.style.setProperty("--i","3");var bgw=mk("span","dmc-g"),bog=mk("span","dmc-t");bgw.appendChild(bog);bo.appendChild(bgw);bo.appendChild(mk("span","dmc-n","Your own colour"));
  bo.addEventListener("click",function(){var d=get();set({band:d.band||d.stone||"#2f5bd3"});});ch2.appendChild(bv);ch2.appendChild(bo);s2.appendChild(ch2);
  var own2=mk("div","dmc-own"),sw2=swatches(id+"p",function(h){set({band:h});},"band"),swn2=mk("p","dmc-swn");own2.appendChild(sw2);own2.appendChild(swn2);s2.appendChild(own2);sc.appendChild(s2);
  /* the light */
  var s3=mk("div","dmc-sec"),l3=mk("div","dmc-l","The light");s3.appendChild(l3);var row=mk("div","dmc-row");row.appendChild(mk("span",null,"The light that shoots through it now and then"));
  var sw=mk("button","dmc-sw");sw.type="button";sw.setAttribute("role","switch");sw.setAttribute("aria-label","The light that shoots through the diamond");sw.appendChild(mk("i"));
  sw.addEventListener("click",function(){set({light:sw.getAttribute("aria-checked")!=="true"});});row.appendChild(sw);s3.appendChild(row);sc.appendChild(s3);
  /* the foot */
  var ft=mk("div","dmc-foot"),rs=mk("button","dmc-k","Back to Ingenium's own");rs.type="button";rs.addEventListener("click",reset);ft.appendChild(rs);
  if(where==="head"){var dn=mk("button","dmc-k pri","Done");dn.type="button";dn.addEventListener("click",function(){closeHead(true);});ft.appendChild(dn);}
  else{var sm=mk("button","dmc-k pri","Show me on Adamas");sm.type="button";sm.addEventListener("click",function(){showOnAdamas();});ft.appendChild(sm);}
  p.appendChild(ft);
  var P={el:p,paint:function(){var d=get(),key=JSON.stringify(d);LOOKS.forEach(function(L){lk[L[0]].b.setAttribute("aria-checked",String(d.look===L[0]));});
    if(P.last!==key){P.last=key;setg.innerHTML=gemFor(d.look,d);LOOKS.forEach(function(L){lk[L[0]].g.innerHTML=gemFor(L[0],d);});bog.innerHTML=holder(d.band||d.stone);}
    note.innerHTML=SAY[d.look]||"";own.hidden=d.look!=="own";if(String(rg.value)!==String(d.depth))rg.value=String(d.depth);
    rg.style.setProperty("--dmc-deep",d.stone);rg.style.setProperty("--dmc-faint",mix(d.stone,"#ffffff",.88));
    paintSw(own,d.look==="own"?d.stone:null,swn1,"Your stone");bv.setAttribute("aria-checked",String(!d.band));bo.setAttribute("aria-checked",String(!!d.band));
    own2.hidden=!d.band;paintSw(own2,d.band,swn2,"Your band");sw.setAttribute("aria-checked",String(d.light!==false));}};
  PANELS.push(P);P.paint();return P;}
function nameOf(h){var j=JEWELS.filter(function(J){return J[1]===h;})[0];return j?j[0]:"a colour of your own ("+h+")";}
function swatches(id,pick,what){var w=mk("div","dmc-sw8");w.setAttribute("role","radiogroup");w.setAttribute("aria-label",what==="band"?"The band's colour":"The stone's colour");
  JEWELS.forEach(function(J,ix){var b=mk("button","dmc-s");b.type="button";b.setAttribute("role","radio");b.setAttribute("aria-label",J[0]);b.title=J[0];b.setAttribute("data-hex",J[1]);b.style.setProperty("--i",String(ix));b.innerHTML='<span class="dmc-t">'+gem(J[1])+"</span>";
    b.addEventListener("click",function(){pick(J[1]);});w.appendChild(b);});
  var a=mk("label","dmc-any");a.setAttribute("role","radio");a.title="Any colour";a.style.setProperty("--i","8");a.innerHTML='<span class="dmc-t">'+anyGem()+"</span>";var inp=mk("input");inp.type="color";inp.setAttribute("aria-label","Any colour");
  inp.addEventListener("input",function(){pick(hex(inp.value)||"#c8143c");});a.appendChild(inp);w.appendChild(a);return w;}
function paintSw(box,h,say,lab){var any=true;[].forEach.call(box.querySelectorAll(".dmc-s"),function(b){var on=!!h&&b.getAttribute("data-hex")===h;b.setAttribute("aria-checked",String(on));if(on)any=false;});
  var a=box.querySelector(".dmc-any");if(a){a.setAttribute("aria-checked",String(!!h&&any));var i=a.querySelector("input");if(h&&i&&i.value!==h)i.value=h;
    var want=h&&any?"o:"+h:"any";if(a.__g!==want){a.__g=want;var keep=i;a.innerHTML='<span class="dmc-t">'+(h&&any?gem(h):anyGem())+"</span>";a.appendChild(keep);}}
  if(say)say.innerHTML=h?lab+": <b>"+nameOf(h)+"</b>":"";}
function paintAll(){PANELS=PANELS.filter(function(P){return P.el.isConnected||P.keep;});PANELS.forEach(function(P){try{P.paint();}catch(e){}});
  try{if(W.IngSettingsRaised&&D.getElementById("dmcCard")&&D.getElementById("dmcCard").offsetParent)W.IngSettingsRaised.paint();}catch(e){}}

/* ---------- Adamas's head: the key in its corner (or in its row of keys), and the panel beside the diamond (or over the words) ---------- */
var LAYOUT={key:"corner",place:"beside"};
var HP=null,KEY=null;
function head(){var p=D.getElementById("page-build");return p?p.querySelector(":scope > .skh"):null;}
function addKey(){var h=head();if(!h)return false;var old=D.getElementById("bdColours");
  if(old&&old.getAttribute("data-at")===LAYOUT.key&&h.contains(old)){KEY=old;return true;}
  if(old){var cw=old.closest(".dmc-corner");(cw||old).remove();}
  var b;if(LAYOUT.key==="corner"){var c=mk("div","dmc-corner"),pill=mk("div","dmc-pill");b=mk("button","dmc-ck");b.innerHTML=KEYGEM;pill.appendChild(b);c.appendChild(pill);h.appendChild(c);}
  else{var keys=h.querySelector(".skh-keys");if(!keys)return false;b=mk("button","skh-k");b.innerHTML=KEYGEM;b.appendChild(D.createTextNode("Diamond colours"));keys.appendChild(b);}
  b.type="button";b.id="bdColours";b.setAttribute("data-at",LAYOUT.key);b.setAttribute("aria-expanded","false");b.setAttribute("aria-haspopup","true");
  b.setAttribute("aria-label","The diamond's colours");b.title="The diamond's colours: by the hour, one of its looks, or a colour of your own";
  b.addEventListener("click",function(e){e.preventDefault();if(HP)closeHead(true);else openHead();});KEY=b;return true;}
function narrow(h){try{return h.classList.contains("skh-narrow")||W.matchMedia("(max-width:760px)").matches||h.getBoundingClientRect().width<900;}catch(e){return false;}}
function openHead(){var h=head();if(!h)return null;if(!addKey())return null;if(HP)return HP;HP=panel("head");
  if(narrow(h)){HP.el.classList.add("dmc-flow");h.appendChild(HP.el);}
  else if(LAYOUT.place==="beside"){HP.el.classList.add("dmc-side");var hw=h.getBoundingClientRect().width,pw=Math.round(Math.max(390,Math.min(470,hw*0.4)));HP.el.style.setProperty("--dmc-w",pw+"px");h.appendChild(HP.el);
    /* the diamond glides to the middle of the room the panel leaves it */
    var o=h.querySelector(".skh-obj");if(o){var hr=h.getBoundingClientRect(),or=o.getBoundingClientRect(),room=hr.width-pw-20-24,want=hr.left+12+room/2,mid=or.left+or.width/2;
      h.style.setProperty("--dmc-shift",Math.max(0,Math.round(mid-want))+"px");}
    h.classList.add("dmc-beside");}
  else{HP.el.classList.add("dmc-over");h.appendChild(HP.el);}
  h.classList.add("dmc-open");if(KEY)KEY.setAttribute("aria-expanded","true");
  HP.el.setAttribute("tabindex","-1");try{HP.el.focus({preventScroll:true});}catch(e){}
  try{if(W.IngDiamond&&IngDiamond.kick)IngDiamond.kick();}catch(e){}
  return HP;}
function closeHead(back){if(!HP)return;var h=head();try{HP.el.remove();}catch(e){}HP=null;if(h){h.classList.remove("dmc-open","dmc-beside");h.style.removeProperty("--dmc-shift");}
  if(KEY){KEY.setAttribute("aria-expanded","false");if(back)try{KEY.focus({preventScroll:true});}catch(e){}}paintAll();try{if(W.IngDiamond&&IngDiamond.kick)IngDiamond.kick();}catch(e){}}
D.addEventListener("keydown",function(e){if(e.key==="Escape"&&HP&&HP.el.contains(D.activeElement)){e.preventDefault();closeHead(true);}});
function showOnAdamas(){try{if(typeof W.go==="function")W.go("build");}catch(e){}
  setTimeout(function(){try{if(W.IngRooms)IngRooms.open("build","page");}catch(e){}var h=head();if(h){try{h.scrollIntoView({block:"start",behavior:"smooth"});}catch(e){}}openHead();},120);}

/* ---------- Settings, Everyday: "The diamond on Adamas" ---------- */
function card(){if(D.getElementById("dmcCard"))return D.getElementById("dmcCard");var pg=D.getElementById("page-settings");if(!pg)return null;
  var c=mk("section","card");c.id="dmcCard";c.setAttribute("aria-labelledby","dmcCardH");var h2=mk("h2","sec");h2.id="dmcCardH";var ic=mk("span","st-ic");ic.setAttribute("aria-hidden","true");ic.innerHTML=KEYGEM;h2.appendChild(ic);h2.appendChild(D.createTextNode("The diamond on Adamas"));c.appendChild(h2);
  c.appendChild(mk("p","small muted","The diamond at the head of Adamas: its colour through the day, one look to keep, or a colour of your own; the holder's band; the light that passes through it. The same choices open from the small diamond key in the corner of Adamas's head."));
  var P=panel("settings");P.keep=true;c.appendChild(P.el);
  var place=null;try{place=pg.querySelector("#rmP-settings-everyday");}catch(e){}
  if(place)place.appendChild(c);else pg.appendChild(c);return c;}
/* the line a tile in Settings shows for it (modules/r313.js) */
function says(){var d=get(),a=d.look==="own"?"Your colour: "+nameOf(d.stone).replace(/ \(#.*$/,"")+(d.depth>=0.75?", deep":d.depth<=0.35?", faint":""):(LOOKS.filter(function(L){return L[0]===d.look;})[0]||LOOKS[0])[1];
  return [a,"band: "+(d.band?nameOf(d.band).replace(/ \(#.*$/,""):"Ingenium's violet"),"light "+(d.light?"on":"off")].join(" · ");}

function boot(){try{card();}catch(e){}try{apply();}catch(e){}}
var og=W.go;if(typeof og==="function")W.go=function(p){var r=og.apply(this,arguments);try{if(p==="build")setTimeout(function(){addKey();apply();},30);else if(HP)closeHead(false);}catch(e){}return r;};
function watchHead(){var pg=D.getElementById("page-build");if(!pg||pg.__dmcW)return;pg.__dmcW=1;try{new MutationObserver(function(){if(head()&&!D.getElementById("bdColours")){addKey();apply();}}).observe(pg,{childList:true});}catch(e){}if(head())addKey();}
if(D.readyState==="loading")D.addEventListener("DOMContentLoaded",function(){setTimeout(function(){boot();watchHead();},0);});else setTimeout(function(){boot();watchHead();},0);
D.addEventListener("visibilitychange",function(){if(!D.hidden){try{apply();paintAll();}catch(e){}}});
W.IngDiamondColours={says:says,get:get,set:set,reset:reset,open:openHead,close:function(){closeHead(false);},show:showOnAdamas,looks:function(){return LOOKS.map(function(l){return {key:l[0],name:l[1]};});},
  jewels:function(){return JEWELS.map(function(j){return {name:j[0],hex:j[1]};});},apply:apply,card:card,gem:gem,
  layout:function(o){if(o){var was=!!HP;if(was)closeHead(false);if(o.key)LAYOUT.key=o.key;if(o.place)LAYOUT.place=o.place;addKey();if(was)openHead();}return {key:LAYOUT.key,place:LAYOUT.place};}};
})();
;try{window.__ingParts["p314"]="running";}catch(_){}
</script>
