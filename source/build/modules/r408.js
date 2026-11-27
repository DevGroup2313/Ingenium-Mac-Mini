<style id="r408-css">
/* ============ R408 · CUSTODIA: EVERY KEY INGENIUM KEEPS, AND ITS WAYS BACK (Ingenium 8.00, 27 November 2026) ============
   Her words (26 November 2026): "I want Ingenium to have a recovery system for the passwords and key terms and keys, so that I am not
   locked out ... clear and sophisticated ... for every user on all devices". Shown it drawn in the real page, her word (27 November 2026):
   "I approve of the previews, please commit and push it everywhere".
   What was found first (every part read): only the sign-in had ways back (its ten words, its recovery key file, the computer's own
   sign-in, a hint; r197); the Cloud's passphrase (r255), a backup's password (r143), the owner key's password (PermitCore) and the
   reading key's password (r357) had none: forgotten, they locked their thing for good.
   Custodia (Latin: safekeeping), a page of its own in the side bar, before Settings:
   - its head: a combination dial in pewter, Ingenium's own seal at its heart (8.02: Home's seal in its layers, pressed as on Home; the
     bezel finely brushed with a polished rim, finer ticks with a middle tick between the numbers, the pointer cut in two facets, the knob taken away so the seal sits in
     the face within a fine engraved ring, its thin purple ring held in step with it); around it a bead for each key, violet when it has a way back, amber when it has none yet (pressed, the dial turns
     its number under the pointer and the key opens). It tilts toward the pointer and its light follows; the ring turns under the hand;
     nothing moves by itself but the seal's breath;
   - Your keys: a tag for each key this copy holds (the owner key and the reading key in the master edition alone; GitHub only where
     Fabrica is), with its ways back as lamps;
   - each key opened: its ways back, read from the part that holds it, with keys to the places that already keep them (Settings' sign-in
     and its ways back in, Ownership, Security, Your devices, Memoria's Cloud and backups, Build, Fabrica), and what is new:
       a sealed copy inside the sign-in, for the Cloud passphrase, the owner key's and the reading key's passwords (each checked first
       against the key it opens, sealed with the sign-in's own key, IngLock.sealText, shown again only after the sign-in's password),
       and for every backup password, kept as each backup is made (her choice, on by default; the last ten);
       the owner key's own ten words, apart from the sign-in, so that no one who opens the sign-in can sign as her: they bring back its
       password (PBKDF2-SHA-256, 600,000 rounds, AES-GCM; kept in the owner key's own store on this device, offline_owner "words");
   - My recovery sheet: the sign-in's ten words (after its password; boxes to write them in otherwise) and where each key's ways back
     are, to print or save; no password is ever written on it.
   Nothing here leaves the device. Tags rest flat and lift under the pointer; keys are raised; Minimal motion and reduced motion keep
   the dial and the cards still. By day pearl and pewter, by night deep indigo. */
#page-custodia{--c-ink1:#221a2e;--c-ink2:#4a4358;--c-ink3:#6c6579;--c-acc:#6a3fb5;--c-warn:#a0601c;--c-warnbg:rgba(232,144,42,.12);--c-ok:#2e7d52;--c-okbg:rgba(46,125,82,.10);
  --c-desk:radial-gradient(ellipse 75% 85% at 72% 42%,#fdfbff 0%,#f4eff9 52%,#e9e1f4 100%);--c-ring:rgba(106,63,181,.10);
  --c-p0:#fffdf9;--c-p1:#f5eff8;--c-l1:rgba(74,42,134,.40);--c-l2:rgba(74,42,134,.16);--c-edge:#dcd2ec;--c-edge2:#cdc1e2;--c-well:rgba(34,26,46,.045);
  --c-face0:#fbf9fd;--c-face1:#e9e3f3;--c-tag0:#fffefb;--c-tag1:#f6f1ea;--c-serif:"Home Cormorant","Cormorant Garamond",Cormorant,Georgia,serif}
body[data-theme="night"] #page-custodia{--c-ink1:#f3eefb;--c-ink2:#d3c9e3;--c-ink3:#a99cc1;--c-acc:#c3a8f0;--c-warn:#f0b65c;--c-warnbg:rgba(240,182,92,.14);--c-ok:#8fd6a9;--c-okbg:rgba(143,214,169,.12);
  --c-desk:radial-gradient(ellipse 75% 85% at 72% 42%,#241a37 0%,#171025 52%,#0d0916 100%);--c-ring:rgba(205,184,240,.10);
  --c-p0:#1c1530;--c-p1:#0f0a1b;--c-l1:rgba(214,200,244,.42);--c-l2:rgba(214,200,244,.15);--c-edge:#0b0814;--c-edge2:#06040b;--c-well:rgba(10,6,18,.4);
  --c-face0:#2a2140;--c-face1:#150f22;--c-tag0:#2a2238;--c-tag1:#221b2f}
#page-custodia > .page-title{display:none}
/* the head, as Ingenium's pages hold their objects */
#cuHead{position:relative;height:470px;margin:0 0 8px;border-radius:30px;overflow:hidden;background:var(--c-desk);
  box-shadow:inset 0 0 0 1px var(--c-ring),0 1px 1px rgba(40,22,68,.04),0 4px 6px rgba(40,22,68,.04),0 14px 28px rgba(40,22,68,.07),0 34px 60px rgba(40,22,68,.08)}
#cuHead .cu-words{position:absolute;left:40px;top:34px;z-index:5;width:470px}
#cuHead .cu-eye{font:600 11.5px/1 var(--sans,system-ui,sans-serif);letter-spacing:.28em;text-transform:uppercase;color:var(--c-ink3)}
#cuHead h2{margin:12px 0 10px;font:600 48px/1.04 var(--c-serif);color:var(--c-ink1)}
#cuHead p{margin:0 0 16px;font-size:14px;line-height:1.55;color:var(--c-ink2)}
#cuHead .cu-chips{display:flex;gap:8px;flex-wrap:wrap;margin:0 0 16px}
#cuHead .cu-chip{display:inline-flex;align-items:center;gap:7px;padding:6px 11px;border-radius:999px;font:600 12px/1 var(--sans,system-ui,sans-serif);color:var(--c-acc);background:rgba(106,63,181,.09);box-shadow:inset 0 0 0 1px rgba(106,63,181,.12)}
#cuHead .cu-chip::before{content:"";width:6px;height:6px;border-radius:50%;background:currentColor}
#cuHead .cu-chip.warn{color:var(--c-warn);background:var(--c-warnbg);box-shadow:inset 0 0 0 1px rgba(160,96,28,.16)}
#cuHead .cu-keys{display:flex;gap:10px;flex-wrap:wrap}
.cu-key{position:relative;display:inline-flex;align-items:center;justify-content:center;gap:8px;min-height:36px;padding:8px 16px;border-radius:12px;border:1px solid var(--sk-hair,rgba(34,26,46,.1));cursor:pointer;
  background:linear-gradient(var(--sk-keyA,#fff),var(--sk-keyB,#f6f2fb));color:var(--c-ink1);font:600 13px/1.2 var(--sans,system-ui,sans-serif);box-shadow:var(--sk-key,0 2px 0 rgba(40,22,68,.25),0 4px 5px rgba(40,22,68,.16));
  transition:transform .16s cubic-bezier(.34,1.35,.64,1),box-shadow .16s ease}
.cu-key:hover{transform:translateY(-2px)}
body[data-theme="night"] .cu-key:not(.primary){color:#e9defc;background:linear-gradient(#2c2440,#251e35);border-color:rgba(205,184,240,.12);box-shadow:inset 0 1px 0 rgba(255,255,255,.07),inset 0 -2px 0 rgba(0,0,0,.45),0 2px 0 rgba(0,0,0,.7),0 4px 6px rgba(0,0,0,.45)}
.cu-key.primary{background:linear-gradient(#7a50c6,#5d37a1);border-color:transparent;color:#fff;box-shadow:inset 0 1px 0 rgba(255,255,255,.16),0 2px 0 #3a2070,0 4px 6px rgba(40,22,68,.24),0 9px 16px rgba(40,22,68,.16)}
.cu-key svg{width:16px;height:16px}
#cuHead .cu-say{position:absolute;left:40px;bottom:24px;z-index:6;max-width:470px;font:italic 500 16px/1.4 var(--c-serif);color:var(--c-ink3)}
#cuHead .cu-say b{font-style:normal;font-weight:600;color:var(--c-ink1)}
/* the dial: a combination dial in pewter, Ingenium's seal at its heart */
#cuHead .cu-dialbox{position:absolute;right:78px;top:50%;width:380px;height:380px;margin-top:-190px}
/* the dial: a combination dial in pewter, as approved; 8.02 refines it in its own terms: a finely brushed bezel whose polished rim catches
   the light, a crisper lip around the face, finer ticks with a middle tick between the numbers, the pointer cut in two
   facets, the lamps as small polished beads; no knob: Ingenium's own seal sits in the face within a fine engraved ring */
.cu-dial{position:absolute;inset:0;border-radius:50%;
  background:repeating-radial-gradient(circle at 50% 50%,rgba(255,255,255,.08) 0 1px,rgba(60,50,80,.03) 1px 2px),
    conic-gradient(from 200deg,#fdfdff,#d6d2df 12%,#9e99ab 26%,#e9e7ee 40%,#ffffff 50%,#bfbaca 64%,#8f8a9c 80%,#e4e1ea 92%,#fdfdff);
  box-shadow:0 3px 0 #8d879b,0 6px 0 #7b7589,0 14px 22px rgba(40,22,68,.25),0 30px 54px rgba(40,22,68,.18),inset 0 0 0 1px rgba(255,255,255,.8),0 0 0 .6px rgba(60,50,80,.4)}
.cu-dial::before{content:"";position:absolute;inset:0;border-radius:50%;pointer-events:none;
  background:linear-gradient(145deg,rgba(255,255,255,.85),rgba(255,255,255,0) 36%,rgba(40,22,68,0) 64%,rgba(40,22,68,.24));
  -webkit-mask:radial-gradient(circle closest-side,transparent calc(100% - 7px),#000 calc(100% - 6px));mask:radial-gradient(circle closest-side,transparent calc(100% - 7px),#000 calc(100% - 6px))}
body[data-theme="night"] .cu-dial{background:repeating-radial-gradient(circle at 50% 50%,rgba(214,200,244,.035) 0 1px,rgba(0,0,0,.05) 1px 2px),
    conic-gradient(from 200deg,#5a5373,#3a3450 12%,#221d30 26%,#4a4361 40%,#6a6388 50%,#2e2940 64%,#1a1625 80%,#433c58 92%,#5a5373);
  box-shadow:0 3px 0 #2c273a,0 6px 0 #1d1928,0 14px 22px rgba(0,0,0,.55),0 30px 54px rgba(0,0,0,.45),inset 0 0 0 1px rgba(214,200,244,.22),0 0 0 .6px rgba(0,0,0,.6)}
body[data-theme="night"] .cu-dial::before{background:linear-gradient(145deg,rgba(214,200,244,.34),rgba(214,200,244,0) 36%,rgba(0,0,0,0) 64%,rgba(0,0,0,.38))}
.cu-face{position:absolute;inset:22px;border-radius:50%;background:radial-gradient(circle at 46% 36%,var(--c-face0),var(--c-face1) 78%);
  box-shadow:inset 0 3px 8px rgba(40,22,68,.30),inset 0 -2px 0 rgba(255,255,255,.5),0 0 0 1.5px rgba(60,50,80,.38),0 0 0 3.5px rgba(255,255,255,.6)}
body[data-theme="night"] .cu-face{box-shadow:inset 0 3px 10px rgba(0,0,0,.6),inset 0 -1px 0 rgba(214,200,244,.10),0 0 0 1.5px rgba(10,6,18,.75),0 0 0 3px rgba(214,200,244,.10)}
.cu-turn{position:absolute;inset:22px;border-radius:50%;transform:rotate(0deg);cursor:grab;touch-action:none}
.cu-turn.held{cursor:grabbing}
.cu-ticks{position:absolute;inset:6px;border-radius:50%;
  background:repeating-conic-gradient(from -.3deg,var(--c-l1) 0 .6deg,transparent .6deg 3.6deg);
  -webkit-mask:radial-gradient(circle,transparent 0 69%,#000 69.5% 76%,transparent 76.5%);mask:radial-gradient(circle,transparent 0 69%,#000 69.5% 76%,transparent 76.5%)}
.cu-ticks.mid{background:repeating-conic-gradient(from 17.55deg,var(--c-ink3) 0 .9deg,transparent .9deg 36deg);
  -webkit-mask:radial-gradient(circle,transparent 0 67%,#000 67.5% 76%,transparent 76.5%);mask:radial-gradient(circle,transparent 0 67%,#000 67.5% 76%,transparent 76.5%)}
.cu-ticks.big{background:repeating-conic-gradient(from -.6deg,var(--c-ink2) 0 1.2deg,transparent 1.2deg 36deg);
  -webkit-mask:radial-gradient(circle,transparent 0 65%,#000 65.5% 76%,transparent 76.5%);mask:radial-gradient(circle,transparent 0 65%,#000 65.5% 76%,transparent 76.5%)}
.cu-num{position:absolute;left:50%;top:50%;width:30px;height:20px;margin:-10px 0 0 -15px;text-align:center;font:600 16px/20px var(--c-serif);color:var(--c-ink1);letter-spacing:.02em;text-shadow:0 1px 0 rgba(255,255,255,.8);pointer-events:none}
body[data-theme="night"] .cu-num{color:var(--c-ink2);text-shadow:0 1px 0 rgba(0,0,0,.6)}
.cu-mark{position:absolute;left:50%;top:-14px;width:24px;height:19px;margin-left:-12px;z-index:5;pointer-events:none;filter:drop-shadow(0 2px 2px rgba(40,22,68,.35))}
.cu-mark i{position:absolute;inset:0;clip-path:polygon(0 0,100% 0,50% 100%);background:linear-gradient(180deg,rgba(255,255,255,.4) 0 1.5px,rgba(255,255,255,0) 1.5px),linear-gradient(90deg,#8d66d9 0 50%,#5a31a6 50% 100%)}
body[data-theme="night"] .cu-mark i{background:linear-gradient(180deg,rgba(255,255,255,.3) 0 1.5px,rgba(255,255,255,0) 1.5px),linear-gradient(90deg,#a986ee 0 50%,#6d44bd 50% 100%)}
.cu-lamp{position:absolute;width:14px;height:14px;border-radius:50%;z-index:3;box-shadow:0 0 0 1px rgba(255,255,255,.8),0 1px 2px rgba(40,22,68,.35)}
.cu-lamp.ok{background:radial-gradient(circle at 35% 30%,#efe6ff 0,#a682e8 32%,#6a3fb5 68%,#43247f 100%);box-shadow:0 0 0 1px rgba(255,255,255,.8),0 1px 2px rgba(40,22,68,.35),0 0 10px rgba(122,76,200,.6)}
.cu-lamp.warn{background:radial-gradient(circle at 35% 30%,#fff2d9 0,#f0b65c 34%,#d08a2b 70%,#94570f 100%);box-shadow:0 0 0 1px rgba(255,255,255,.8),0 1px 2px rgba(40,22,68,.35),0 0 10px rgba(217,144,47,.55)}
.cu-lamp.none{background:radial-gradient(circle at 35% 30%,#ffffff 0,#dedae6 40%,#a9a3b8 80%,#8a849b 100%)}
/* the board of key tags */
#cuBoard{margin:22px 0 0}
#cuBoard .cu-bh{display:flex;align-items:baseline;gap:14px;margin:0 4px 16px}
#cuBoard .cu-bh h3{margin:0;font:600 28px/1.1 var(--c-serif);color:var(--c-ink1)}
#cuBoard .cu-bh span{font:600 10.5px/1 var(--sans,system-ui,sans-serif);letter-spacing:.22em;text-transform:uppercase;color:var(--c-ink3)}
.cu-tags{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:22px 18px}
.cu-tag{position:relative;display:flex;flex-direction:column;gap:8px;min-width:0;min-height:176px;padding:34px 18px 16px;border:0;cursor:pointer;text-align:left;font:inherit;color:var(--c-ink1);
  background:linear-gradient(180deg,var(--c-tag0),var(--c-tag1));clip-path:polygon(18px 0,calc(100% - 18px) 0,100% 18px,100% 100%,0 100%,0 18px);
  filter:drop-shadow(0 0 0.6px rgba(34,26,46,.35));transition:transform .34s cubic-bezier(.34,1.35,.64,1),filter .22s ease}
.cu-tag:hover{transform:translateY(-4px) rotate(-.6deg);filter:drop-shadow(0 0 0.6px rgba(34,26,46,.3)) drop-shadow(0 12px 14px rgba(40,22,68,.18))}
body[data-theme="night"] .cu-tag{filter:drop-shadow(0 0 0.6px rgba(205,184,240,.4))}
.cu-tag::before{content:"";position:absolute;left:50%;top:10px;width:16px;height:16px;margin-left:-8px;border-radius:50%;
  background:radial-gradient(circle,var(--c-well) 0 4px,transparent 4.5px),conic-gradient(from 200deg,#fdfdff,#bdb8c8,#8e899b,#e9e7ee,#fdfdff);box-shadow:0 1px 1px rgba(40,22,68,.3)}
.cu-tag[aria-pressed="true"]{transform:translateY(-4px);filter:drop-shadow(0 0 0 #6a3fb5) drop-shadow(0 0 2px #6a3fb5) drop-shadow(0 12px 14px rgba(40,22,68,.2))}
.cu-tag b{font:600 19px/1.15 var(--c-serif);color:var(--c-ink1)}
.cu-tag small{font:500 12.5px/1.4 var(--sans,system-ui,sans-serif);color:var(--c-ink3)}
.cu-ways{display:flex;gap:6px;margin-top:auto;align-items:center}
.cu-ways i{width:11px;height:11px;border-radius:50%;box-shadow:inset 0 0 0 1.5px var(--c-acc)}
.cu-ways i.on{background:radial-gradient(circle at 35% 30%,#d8c6ff,#7a52c7 62%);box-shadow:0 0 6px rgba(122,76,200,.6)}
.cu-st{font:600 11px/1 var(--sans,system-ui,sans-serif);letter-spacing:.08em;margin-left:6px;color:var(--c-ok)}
.cu-tag.warn .cu-st{color:var(--c-warn)}
.cu-tag.warn::after{content:"";position:absolute;right:16px;top:14px;width:10px;height:10px;border-radius:50%;background:radial-gradient(circle at 35% 30%,#ffe3b3,#d9902f 60%);box-shadow:0 0 8px rgba(217,144,47,.8)}
/* a key opened: its ways back */
#cuOpen{position:relative;isolation:isolate;margin:26px 0 0;border-radius:26px;padding:32px 40px 28px;background:radial-gradient(ellipse 85% 75% at 28% 22%,var(--c-p0),var(--c-p1));
  box-shadow:inset 0 1px 0 rgba(255,255,255,.9),0 1px 0 rgba(40,22,68,.05),0 7px 0 var(--c-edge),0 8px 0 var(--c-edge2),0 18px 30px rgba(40,22,68,.10),0 40px 64px rgba(40,22,68,.07)}
body[data-theme="night"] #cuOpen{box-shadow:inset 0 1px 0 rgba(255,255,255,.06),0 7px 0 var(--c-edge),0 8px 0 var(--c-edge2),0 18px 30px rgba(0,0,0,.5)}
#cuOpen::before{content:"";position:absolute;inset:12px;border-radius:18px;border:1px solid var(--c-l2);pointer-events:none;z-index:-1}
#cuOpen header{display:flex;align-items:flex-start;gap:18px;margin:0 0 20px}
#cuOpen header div{flex:1 1 auto}
#cuOpen .cu-pno{display:block;font:600 10.5px/1 var(--sans,system-ui,sans-serif);letter-spacing:.28em;text-transform:uppercase;color:var(--c-ink3)}
#cuOpen h3{margin:10px 0 6px;font:600 32px/1.05 var(--c-serif);color:var(--c-ink1)}
#cuOpen header i{font:italic 500 16px/1.3 var(--c-serif);color:var(--c-ink3)}
#cuOpen .cu-badge{flex:0 0 auto;padding:8px 14px;border-radius:999px;font:600 12.5px/1 var(--sans,system-ui,sans-serif);color:var(--c-warn);background:var(--c-warnbg)}
#cuOpen .cu-badge.ok{color:var(--c-ok);background:var(--c-okbg)}
.cu-wlist{list-style:none;margin:0;padding:0;display:grid;gap:12px}
.cu-way{display:grid;grid-template-columns:44px minmax(0,1fr) auto;gap:16px;align-items:center;padding:16px 18px;border-radius:16px;box-shadow:inset 0 0 0 1px var(--c-l2);transition:transform .32s cubic-bezier(.34,1.35,.64,1),box-shadow .22s,background .22s}
.cu-way:hover{transform:translateY(-3px);background:var(--c-p0);box-shadow:inset 0 0 0 1px var(--c-l2),0 3px 0 rgba(40,22,68,.06),0 10px 18px rgba(40,22,68,.12)}
.cu-way .ic{display:grid;place-items:center;width:44px;height:44px;border-radius:50%;background:rgba(106,63,181,.10);color:var(--c-acc)}
.cu-way.new .ic{background:linear-gradient(#7a50c6,#5d37a1);color:#fff;box-shadow:0 2px 0 #3a2070}
.cu-way .ic svg{width:21px;height:21px}
.cu-way b{display:block;font:600 18px/1.25 var(--c-serif);color:var(--c-ink1)}
.cu-way p{margin:4px 0 0;font:500 13px/1.45 var(--sans,system-ui,sans-serif);color:var(--c-ink2)}
.cu-way .st{display:inline-block;margin-top:6px;font:600 11px/1 var(--sans,system-ui,sans-serif);letter-spacing:.06em;color:var(--c-ok)}
.cu-way .st.no{color:var(--c-warn)}
.cu-w{border:0;background:none;padding:0;font:600 13px/1.3 var(--sans,system-ui,sans-serif);color:var(--c-acc);text-decoration:underline;text-decoration-thickness:1.5px;text-underline-offset:3px;cursor:pointer}
#cuOpen .cu-foot{display:flex;align-items:flex-start;gap:12px;margin-top:22px;padding-top:16px;border-top:1px solid var(--c-l2);font:italic 500 15.5px/1.45 var(--c-serif);color:var(--c-ink3)}
#cuOpen .cu-foot svg{flex:0 0 auto;width:17px;height:17px;margin-top:2px;color:var(--c-acc)}
/* the recovery sheet */
#cuSheet{margin:26px auto 0;max-width:760px;padding:44px 52px 40px;border-radius:6px;background:#fffdf8;color:#2a2236;
  box-shadow:0 1px 1px rgba(40,22,68,.08),0 12px 30px rgba(40,22,68,.16),0 40px 70px rgba(40,22,68,.12)}
#cuSheet .sh-h{display:flex;align-items:center;gap:14px;padding:0 0 18px;border-bottom:1.5px solid rgba(106,63,181,.25)}
#cuSheet .sh-h svg{width:38px;height:38px}
#cuSheet h4{margin:0;font:600 30px/1.1 var(--c-serif)}
#cuSheet .sh-k{font:600 10.5px/1 var(--sans,system-ui,sans-serif);letter-spacing:.24em;text-transform:uppercase;color:#6c6579;margin-top:6px}
#cuSheet h5{margin:34px 0 10px;font:600 12px/1 var(--sans,system-ui,sans-serif);letter-spacing:.2em;text-transform:uppercase;color:#6a3fb5}
#cuSheet .words{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:10px}
#cuSheet .words span{padding:10px 8px;border-radius:8px;text-align:center;font:600 15px/1 var(--c-serif);background:#f4f0f9;color:#4a4358;box-shadow:inset 0 0 0 1px rgba(106,63,181,.14)}
#cuSheet .words span i{display:block;margin-bottom:5px;font:600 9.5px/1 var(--sans,system-ui,sans-serif);font-style:normal;color:#8a8398}
#cuSheet table{width:100%;border-collapse:collapse;font:500 13.5px/1.4 var(--sans,system-ui,sans-serif)}
#cuSheet td{padding:9px 6px;border-bottom:1px solid rgba(106,63,181,.12);vertical-align:top}
#cuSheet td:first-child{font-weight:600;width:34%}
#cuSheet .sh-note{margin:24px 0 0;font:italic 500 15px/1.5 var(--c-serif);color:#6c6579}
@media (max-width:1180px){#cuHead .cu-dialbox{right:30px;width:320px;height:320px;margin-top:-160px}.cu-tags{grid-template-columns:repeat(2,minmax(0,1fr))}}
body[data-motion="minimal"] #page-custodia *{animation:none!important;transition:none!important}
/* ---- what the real page adds to the approved pictures ---- */
#page-custodia{--c-on:linear-gradient(#7a50c6,#5d37a1)}
#cuRoot{display:block}
.cu-tag.none .cu-st{color:var(--c-ink3)}
.cu-tag.none::after{display:none}
.cu-tag:focus-visible{outline:2.5px solid var(--c-acc);outline-offset:4px}
.cu-way .acts{display:flex;align-items:center;gap:14px;flex-wrap:wrap;justify-content:flex-end}
.cu-way .acts .cu-key{min-height:34px;padding:7px 14px;font-size:12.8px}
.cu-way.wide{grid-template-columns:44px minmax(0,1fr)}
.cu-way.wide .acts{justify-content:flex-start;margin-top:10px}
.cu-form{display:grid;gap:10px;margin:12px 0 2px;max-width:520px}
.cu-form label{font:600 10.5px/1 var(--sans,system-ui,sans-serif);letter-spacing:.2em;text-transform:uppercase;color:var(--c-ink3)}
#page-custodia .cu-form input,#page-custodia .cu-form textarea{width:100%;box-sizing:border-box;padding:11px 14px;border-radius:12px;border:0;font:500 14.5px/1.4 var(--sans,system-ui,sans-serif);color:var(--c-ink1);
  background:var(--c-well);box-shadow:inset 0 1px 3px rgba(40,22,68,.13),0 0 0 1px rgba(34,26,46,.08)}
#page-custodia .cu-form textarea{min-height:84px;resize:vertical;font:500 15px/1.5 var(--c-serif)}
#page-custodia .cu-form input:focus,#page-custodia .cu-form textarea:focus{outline:none;box-shadow:inset 0 1px 3px rgba(40,22,68,.13),0 0 0 2px var(--c-acc),0 0 16px rgba(106,63,181,.16)}
.cu-form .row{display:flex;align-items:center;gap:14px;flex-wrap:wrap}
.cu-err{margin:0;font:600 12.8px/1.4 var(--sans,system-ui,sans-serif);color:#b0303e}
body[data-theme="night"] .cu-err{color:#f08a95}
.cu-ok{margin:0;font:600 12.8px/1.4 var(--sans,system-ui,sans-serif);color:var(--c-ok)}
.cu-reveal{display:flex;align-items:center;gap:14px;flex-wrap:wrap;margin:12px 0 2px;padding:12px 14px;border-radius:12px;background:var(--c-well);box-shadow:inset 0 0 0 1px var(--c-l2)}
.cu-reveal code{flex:1 1 auto;min-width:0;overflow-wrap:anywhere;font:600 15px/1.4 ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;color:var(--c-ink1);user-select:all}
.cu-reveal small{flex:1 1 100%;font:500 12px/1.4 var(--sans,system-ui,sans-serif);color:var(--c-ink3)}
.cu-sw{position:relative;display:inline-block;width:46px;height:26px;border:0;border-radius:999px;cursor:pointer;background:var(--c-well);box-shadow:inset 0 1px 3px rgba(40,22,68,.25),0 0 0 1px var(--c-l2);transition:background .25s ease;vertical-align:middle}
.cu-sw::after{content:"";position:absolute;top:3px;left:3px;width:20px;height:20px;border-radius:50%;background:linear-gradient(#fff,#e7e1ef);box-shadow:0 2px 0 rgba(40,22,68,.25),0 3px 6px rgba(40,22,68,.25);transition:left .34s cubic-bezier(.34,1.56,.64,1)}
.cu-sw[aria-checked="true"]{background:var(--c-on);box-shadow:0 2px 0 #3a2070}
.cu-sw[aria-checked="true"]::after{left:23px}
.cu-kept{list-style:none;margin:10px 0 0;padding:0;display:grid;gap:8px}
.cu-kept li{display:flex;align-items:center;gap:14px;flex-wrap:wrap;font:500 13px/1.4 var(--sans,system-ui,sans-serif);color:var(--c-ink2)}
.cu-kept li span{margin-right:auto}
.cu-wgrid{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:10px;margin:12px 0 4px;max-width:640px}
.cu-wgrid span{padding:10px 8px;border-radius:10px;text-align:center;font:600 16px/1 var(--c-serif);color:var(--c-ink1);background:var(--c-well);box-shadow:inset 0 0 0 1px var(--c-l2)}
.cu-wgrid span i{display:block;margin-bottom:6px;font:600 9.5px/1 var(--sans,system-ui,sans-serif);font-style:normal;color:var(--c-ink3)}
#cuSheet .sh-keys{display:flex;gap:12px;flex-wrap:wrap;justify-content:flex-end;margin:26px 0 0}
#cuSheet .words span.blank{color:#b7afc4}
@media (max-width:860px){#cuHead{height:auto;min-height:760px}#cuHead .cu-words{position:relative;left:auto;top:auto;width:auto;padding:26px 22px 0}#cuHead .cu-say{left:22px;right:22px;bottom:18px}
  #cuHead .cu-dialbox{position:relative;right:auto;top:auto;margin:20px auto 70px;width:300px;height:300px;--k:.79}.cu-tags{grid-template-columns:minmax(0,1fr)}.cu-way{grid-template-columns:36px minmax(0,1fr)}.cu-way .acts{grid-column:1/-1;justify-content:flex-start}
  .cu-wgrid,#cuSheet .words{grid-template-columns:repeat(2,minmax(0,1fr))}#cuOpen{padding:26px 22px}#cuSheet{padding:30px 22px}}
@media print{body *{visibility:hidden}#cuSheet,#cuSheet *{visibility:visible}#cuSheet{position:absolute;left:0;top:0;box-shadow:none}#cuSheet .sh-keys{display:none}}
/* 8.02 (her words, 27 November 2026): "Custodia has the wrong logo on the inside of the 3D drawing and also is overheating my devices again,
   please fix it. Also, the design looks entirely too bright on Night mode ... I want Custodia to have the same animated and clickable feel and
   look as the other pages inside of Ingenium"; and, shown a painted vault in the compass's manner: "i preferred this original look, I just
   wanted it to look more defined, refined, elegant and elevated without you copying the compass' literal design". What heated: the ring
   turned for ever (a 16 second round) and the amber lamps pulsed their glow for ever (a glow that changes is painted again on every frame).
   Now nothing moves by itself but the seal's own breath, as on every page: the plate tilts toward the pointer and its light follows it, the
   ring turns under her hand and to a lamp she presses, once as the page opens; Ingenium's own seal sits in the face within a fine engraved ring, upright; by night
   the metal is dark and its light low. The dial keeps its approved look, refined in its own terms (see the dial's rules above). */
#cuHead .cu-dialbox{perspective:1100px;--k:1}
.cu-tilt{position:absolute;left:50%;top:50%;width:380px;height:380px;margin:-190px 0 0 -190px}
.cu-tilt{transform:scale(var(--k,1)) rotateX(var(--rx,0deg)) rotateY(var(--ry,0deg));transition:transform .5s cubic-bezier(.2,.8,.2,1)}
.cu-dialbox.live .cu-tilt{transition:transform .14s linear}
.cu-dialbox.live .cu-tilt{transform:scale(calc(var(--k,1)*1.015)) rotateX(var(--rx,0deg)) rotateY(var(--ry,0deg))}
.cu-tilt.press{transform:scale(calc(var(--k,1)*.982)) rotateX(var(--rx,0deg)) rotateY(var(--ry,0deg))!important;transition:transform .12s ease!important}
.cu-dial{transition:box-shadow .35s ease}
.cu-dialbox.live .cu-dial{box-shadow:0 3px 0 #8d879b,0 6px 0 #7b7589,0 20px 30px rgba(40,22,68,.28),0 40px 70px rgba(40,22,68,.2),inset 0 0 0 1px rgba(255,255,255,.8),0 0 0 .6px rgba(60,50,80,.4)}
body[data-theme="night"] .cu-dialbox.live .cu-dial{box-shadow:0 3px 0 #2c273a,0 6px 0 #1d1928,0 20px 30px rgba(0,0,0,.6),0 40px 70px rgba(0,0,0,.5),inset 0 0 0 1px rgba(214,200,244,.26),0 0 0 .6px rgba(0,0,0,.6)}
.cu-gleam{position:absolute;inset:0;border-radius:50%;pointer-events:none;z-index:2;opacity:0;
  background:conic-gradient(from 0deg,rgba(255,255,255,0) 0deg,rgba(255,255,255,.95) 9deg,rgba(255,255,255,0) 20deg,rgba(255,255,255,0) 360deg);
  -webkit-mask:radial-gradient(circle closest-side,transparent calc(100% - 22px),#000 calc(100% - 21px));mask:radial-gradient(circle closest-side,transparent calc(100% - 22px),#000 calc(100% - 21px))}
.cu-gleam.go{animation:cuGleam 1.4s cubic-bezier(.4,0,.2,1) 1}
@keyframes cuGleam{0%{opacity:0;transform:rotate(-40deg)}14%{opacity:1}84%{opacity:1}100%{opacity:0;transform:rotate(320deg)}}
body[data-theme="night"] .cu-gleam{background:conic-gradient(from 0deg,rgba(214,200,244,0) 0deg,rgba(214,200,244,.6) 9deg,rgba(214,200,244,0) 20deg,rgba(214,200,244,0) 360deg)}
.cu-sheen{position:absolute;inset:0;border-radius:50%;pointer-events:none;z-index:3;opacity:0;transition:opacity .4s ease;
  background:radial-gradient(circle at var(--lx,32%) var(--ly,24%),rgba(255,255,255,.58),rgba(255,255,255,.14) 22%,rgba(255,255,255,0) 46%)}
.cu-dialbox.live .cu-sheen{opacity:1}
body[data-theme="night"] .cu-sheen{background:radial-gradient(circle at var(--lx,32%) var(--ly,24%),rgba(214,196,250,.26),rgba(214,196,250,.07) 24%,rgba(214,196,250,0) 48%)}
.cu-sealbox{position:absolute;left:50%;top:50%;width:88px;height:88px;margin:-44px 0 0 -44px;z-index:4;border-radius:50%}
/* 8.02: the seal set into the face within a fine engraved ring, a shallow seat under it: the look she chose as "As before" on the live
   preview (27 November 2026: "Build the current Custodia's dial into the app with the \"As before\" look, we can come back to it later") */
.cu-sealbox::before{content:"";position:absolute;inset:-11px;border-radius:50%;pointer-events:none;box-shadow:inset 0 0 0 1px rgba(60,50,80,.26),0 0 0 1px rgba(255,255,255,.8)}
.cu-sealbox::after{content:"";position:absolute;inset:-5px;border-radius:50%;pointer-events:none;box-shadow:inset 0 1px 3px rgba(40,22,68,.16)}
body[data-theme="night"] .cu-sealbox::before{box-shadow:inset 0 0 0 1px rgba(0,0,0,.55),0 0 0 1px rgba(214,200,244,.14)}
body[data-theme="night"] .cu-sealbox::after{box-shadow:inset 0 1px 3px rgba(0,0,0,.45)}
/* the seal's thin purple ring, held in step. Her words (27 November 2026): "I also want the faint little purple circle from the engine button
   to be fixed." The cause is the compass's (r290, 13 and 14 November 2026): the seal swayed in 3D on a clock of its own inside a dial that
   leans on its own, and its ring lay lower than its star, so the ring slid about. So it is held as the compass's and Blend's are: no sway
   and no tilt of its own, its ring, star and heart at Blend's heights; it moves only with the dial. */
.cu-sealbox .isl .isl-ring{--fz:.08;--fk:.98}.cu-sealbox .isl .isl-star{--fz:.17;--fk:.9575}.cu-sealbox .isl .isl-heart{--fz:.3;--fk:.925}
.cu-sealbox .isl .isl-idle{animation:none !important}
.cu-sealbox .isl .isl-tilt{transform:none !important}
.cu-sealbox .hx-seal{position:absolute;inset:0;width:100%;height:100%;margin:0;transform:none}
.cu-sealbox .r175-seal{position:absolute;inset:0;width:100%;height:100%;min-width:0;min-height:0;margin:0;padding:0;border:0;border-radius:50%;background:transparent;box-shadow:none;cursor:pointer}
.cu-sealbox .r175-seal:focus-visible{outline:2.5px solid var(--c-acc);outline-offset:4px}
.cu-fx{display:grid;place-items:center;width:100%;height:100%}
.cu-lamp{transition:transform .28s cubic-bezier(.34,1.56,.64,1),box-shadow .28s ease}
.cu-lamp:focus-visible{outline:2px solid var(--c-acc);outline-offset:3px}
.cu-lamp.ok{color:#8a62d6}.cu-lamp.warn{color:#d9902f}.cu-lamp.none{color:#9d97ad}
.cu-lamp:hover,.cu-lamp:focus-visible{transform:scale(1.55)}
.cu-lamp.ok:hover{box-shadow:0 0 0 1px rgba(255,255,255,.9),0 2px 3px rgba(40,22,68,.35),0 0 0 4px rgba(122,76,200,.16),0 0 16px rgba(122,76,200,.85)}
.cu-lamp.warn:hover{box-shadow:0 0 0 1px rgba(255,255,255,.9),0 2px 3px rgba(40,22,68,.35),0 0 0 4px rgba(217,144,47,.16),0 0 16px rgba(217,144,47,.9)}
body[data-theme="night"] .cu-lamp{box-shadow:0 0 0 1px rgba(214,200,244,.28),0 1px 2px rgba(0,0,0,.6)}
body[data-theme="night"] .cu-lamp.ok{box-shadow:0 0 0 1px rgba(214,200,244,.3),0 1px 2px rgba(0,0,0,.6),0 0 12px rgba(150,104,236,.6)}
body[data-theme="night"] .cu-lamp.warn{box-shadow:0 0 0 1px rgba(214,200,244,.3),0 1px 2px rgba(0,0,0,.6),0 0 12px rgba(217,144,47,.5)}
body[data-theme="night"] .cu-lamp.none{background:radial-gradient(circle at 35% 30%,#8e87a8 0,#5d5675 60%,#3a344d 100%)}
.cu-lamp::after{content:"";position:absolute;inset:-5px;border-radius:50%;border:2px solid currentColor;opacity:0;pointer-events:none}
.cu-lamp.pop::after{animation:cuRing .6s cubic-bezier(.2,.7,.3,1) 1}
.cu-lamp.hello::after{animation:cuRing 1.1s ease-out 2}
@keyframes cuRing{0%{opacity:.85;transform:scale(.6)}100%{opacity:0;transform:scale(2.1)}}
.cu-lab{position:absolute;z-index:6;padding:6px 10px;border-radius:10px;white-space:nowrap;pointer-events:none;opacity:0;transform:translate(-50%,var(--ty,18px)) translateY(4px);transition:opacity .2s ease,transform .2s ease;
  font:600 12px/1.25 var(--sans,system-ui,sans-serif);color:var(--c-ink1);background:rgba(255,255,255,.96);box-shadow:0 0 0 1px rgba(106,63,181,.14),0 6px 16px rgba(40,22,68,.16)}
.cu-lab small{display:block;font-weight:500;color:var(--c-ink3);margin-top:2px}
.cu-lab.on{opacity:1;transform:translate(-50%,var(--ty,18px))}
body[data-theme="night"] .cu-lab{background:rgba(32,25,48,.97);box-shadow:0 0 0 1px rgba(205,184,240,.16),0 8px 18px rgba(0,0,0,.45)}
body[data-motion="minimal"] .cu-tilt{transform:scale(var(--k,1))!important}
body[data-motion="minimal"] .cu-sheen{display:none}
@media (prefers-reduced-motion:reduce){#page-custodia *{animation:none!important;transition:none!important}}
</style>
<script>try{(window.__ingParts=window.__ingParts||{})["p408"]="started";}catch(_){}
/* R408 · Custodia: every key Ingenium keeps, and its ways back: see the note at the top of its styles. window.IngCustodia */
(function r408(){
"use strict";
if(window.IngCustodia)return;
var W=window,D=document,TE=new TextEncoder(),TD=new TextDecoder();
var OPEN=null,SHEET=null,FORM=null,REVEAL=null,WORDS=null,NOTE={},ARMED=null,KEYS=[],TOK=0;
function mk(t,c,x){var e=D.createElement(t);if(c)e.className=c;if(x!=null)e.textContent=x;return e;}
function esc(s){return String(s==null?"":s).replace(/[&<>"']/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#39;"}[c];});}
function svg(d){return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">'+d+'</svg>';}
var I={words:'<path d="M5 6h14M5 10h14M5 14h9M5 18h6"/>',file:'<path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5"/><circle cx="12" cy="14" r="2"/><path d="M12 16v3"/>',
  device:'<path d="M12 11v4M8.5 8.8A4.5 4.5 0 0 1 16.5 11v3.5M7.5 12.5v2.5a4.5 4.5 0 0 0 1.4 3.3M16.4 17.6a8.7 8.7 0 0 0 .6-2.1M5 10.5a7 7 0 0 1 12.2-4.6M19 10a7 7 0 0 1 .2 2.5"/>',
  hint:'<circle cx="12" cy="12" r="9"/><path d="M9.6 9.3a2.5 2.5 0 0 1 4.8.9c0 1.7-2.4 2.2-2.4 3.6M12 17h.01"/>',seal:'<rect x="5" y="10.5" width="14" height="9.5" rx="2"/><path d="M8 10.5V8a4 4 0 0 1 8 0v2.5"/><path d="M12 14v2.5"/>',
  dev:'<rect x="3" y="5" width="13" height="9" rx="1.5"/><path d="M7 18h5M9.5 14v4"/><rect x="17.5" y="8" width="4" height="9" rx="1"/>',again:'<path d="M4 12a8 8 0 0 1 14-5.3L20 9"/><path d="M20 4v5h-5"/><path d="M20 12a8 8 0 0 1-14 5.3L4 15"/><path d="M4 20v-5h5"/>',
  sheet:'<path d="M6 3h9l3 3v15H6z"/><path d="M9 9h6M9 13h6M9 17h4"/>',shield:'<path d="M12 3l8 3v6c0 4.5-3.4 8.3-8 9-4.6-.7-8-4.5-8-9V6z"/>',key:'<circle cx="8" cy="14" r="4"/><path d="M11 11l8-8M16 6l2 2M14 8l2 2"/>',
  box:'<rect x="3.5" y="4" width="17" height="5" rx="1.5"/><path d="M5 9v9.5A1.5 1.5 0 0 0 6.5 20h11a1.5 1.5 0 0 0 1.5-1.5V9"/><path d="M10 13h4"/>',link:'<path d="M10 14a4 4 0 0 0 5.6 0l3-3a4 4 0 0 0-5.6-5.6l-1 1"/><path d="M14 10a4 4 0 0 0-5.6 0l-3 3a4 4 0 0 0 5.6 5.6l1-1"/>',
  print:'<path d="M7 9V3h10v6"/><rect x="4" y="9" width="16" height="8" rx="2"/><path d="M7 14h10v7H7z"/>',save:'<path d="M12 4v11M7 10l5 5 5-5"/><path d="M5 20h14"/>'};
var STAR='<svg viewBox="-12 -12 24 24" aria-hidden="true"><path d="M0,-10C1.6,-1.6 1.6,-1.6 10,0C1.6,1.6 1.6,1.6 0,10C-1.6,1.6 -1.6,1.6 -10,0C-1.6,-1.6 -1.6,-1.6 0,-10Z" fill="#fff"/></svg>';
function save(){try{W.saveState();}catch(e){}}
function toast(m){try{if(typeof W.ingToast==="function")W.ingToast(m);else if(typeof W.toast==="function")W.toast(m);}catch(e){}}
function heard(){try{if(W.IngSound&&IngSound.tick)IngSound.tick();}catch(e){}}
function day(t){try{return t?new Date(t).toLocaleDateString("en-GB",{day:"numeric",month:"long",year:"numeric"}):"";}catch(e){return "";}}
function edition(){try{return typeof ING_EDITION==="string"?ING_EDITION:"master";}catch(e){return "master";}}
function hasFab(){return !!D.getElementById("page-fabrica");}
function L(){return W.IngLock||null;}
function signedIn(){var l=L();try{return !!(l&&l.active&&l.active());}catch(e){return false;}}
function keysInHand(){var l=L();try{return !!(l&&l.on&&l.on());}catch(e){return false;}}
function rec(){var l=L();try{return l&&l._test&&l._test.record?l._test.record():null;}catch(e){return null;}}
function sub(){return W.crypto&&W.crypto.subtle;}
function rnd(n){var u=new Uint8Array(n);W.crypto.getRandomValues(u);return u;}
function b64e(u8){var s="";for(var i=0;i<u8.length;i++)s+=String.fromCharCode(u8[i]);return btoa(s);}
function b64d(t){var s=atob(String(t||"").replace(/-/g,"+").replace(/_/g,"/")),u=new Uint8Array(s.length);for(var i=0;i<s.length;i++)u[i]=s.charCodeAt(i);return u;}
function hex(u8){return [].map.call(u8,function(b){return ("0"+b.toString(16)).slice(-2);}).join("");}
/* the copies Custodia keeps, sealed with the sign-in, in the desk (itself sealed by the sign-in) */
function C(){var s=W.state;if(!s.custodia||typeof s.custodia!=="object")s.custodia={};var c=s.custodia;c.v=c.v&&typeof c.v==="object"?c.v:{};if(!Array.isArray(c.v.backup))c.v.backup=[];if(c.keepBackup==null)c.keepBackup=true;return c;}
var AAD={cloud:"ingenium-custodia cloud",owner:"ingenium-custodia owner",read:"ingenium-custodia read",backup:"ingenium-custodia backup"};
function sealCopy(kind,secret){var l=L();if(!keysInHand())return Promise.reject(new Error("Your sign-in must be on, and open, to keep a sealed copy."));return l.sealText(secret,AAD[kind]);}
function openCopy(kind,c){var l=L();if(!keysInHand())return Promise.reject(new Error("Open your sign-in first."));return l.openText(c,AAD[kind]);}
function confirmFirst(what){var l=L();if(!l||!l.confirm)return Promise.resolve(false);return l.confirm("Show "+what,"Your sign-in's password first: what is shown here opens one of your keys.","Show it");}
/* ---------- each key, read from the part that holds it ---------- */
function ownerStore(k){try{return W.PermitCore&&PermitCore._&&PermitCore._.get?Promise.resolve(PermitCore._.get(k)).catch(function(){return null;}):Promise.resolve(null);}catch(e){return Promise.resolve(null);}}
function readRec(){try{return W.IngReadable&&IngReadable._sealed?Promise.resolve(IngReadable._sealed()).catch(function(){return null;}):Promise.resolve(null);}catch(e){return Promise.resolve(null);}}
function model(){var R=rec(),act=signedIn(),c=C(),V=c.v,out=[],master=edition()==="master";
  var si={k:"signin",name:"Your sign-in",opens:"Opens your whole desk on this device: chats, folders, keys"};
  if(!act){si.none=true;si.st="No password yet";si.ways=[];}
  else{si.ways=[["words",!!(R&&R.phr)],["file",!!(R&&R.file&&R.file.ct)],["device",!!(R&&R.dev&&R.dev.ct&&R.dev.id)],["hint",!!(R&&R.hint)]];si.ok=si.ways.slice(0,3).some(function(w){return w[1];});}
  out.push(si);
  if(W.IngCloud){var cs={};try{cs=IngCloud.settings()||{};}catch(e){}var joined=!!(cs.keyOk&&cs.kdf),cl={k:"cloud",name:"Ingenium Cloud passphrase",opens:"Opens your work on your other devices"};
    if(!joined){cl.none=true;cl.st="Not set up here";cl.ways=[];}else{cl.ways=[["seal",!!V.cloud],["dev",true]];cl.ok=!!V.cloud;}out.push(cl);}
  if(W.IngBackup){var bk={k:"backup",name:"Backup password",opens:"Opens a sealed backup, and the keys inside a backup"};
    if(!act){bk.none=true;bk.st="Needs your sign-in";bk.ways=[];}else{bk.ways=[["seal",c.keepBackup!==false],["kept",V.backup.length>0]];bk.ok=c.keepBackup!==false;}out.push(bk);}
  return Promise.all([master?ownerStore("key"):null,master?ownerStore("words"):null,master?readRec():null]).then(function(x){
    if(master&&x[0]){var ow={k:"owner",name:"Your owner key",opens:"Signs your apps, and opens your owner-only apps",words:x[1]};ow.ways=[["file",true],["words",!!(x[1]&&x[1].ct)],["seal",!!V.owner]];ow.ok=!!((x[1]&&x[1].ct)||V.owner);out.push(ow);}
    if(master&&x[2]){var rd={k:"read",name:"Your reading key",opens:"Opens the readable copy of your apps' code"};rd.ways=[["file",false],["seal",!!V.read]];rd.ok=!!V.read;out.push(rd);}
    if(W.IngApk)out.push({k:"signing",name:"Signing keys",opens:"Sign the apps you make for phones and tablets",ways:[["p12",true],["inbackup",true]],ok:true});
    out.push({k:"pair",name:"Pairing code",opens:"Lets your devices lend and share with each other",ways:[["newcode",true],["accept",true]],ok:true});
    if(hasFab())out.push({k:"github",name:"GitHub",opens:"Lets Fabrica send your work to GitHub",ways:[["again",true]],ok:true});
    return out;});}
/* ---------- checks: does a typed or kept secret still open its key ---------- */
function cloudOpens(pass){var s=sub(),cs={};try{cs=IngCloud.settings()||{};}catch(e){}if(!s||!cs.kdf)return Promise.reject(new Error("The Cloud is not set up on this device."));
  var probe=TE.encode("ingenium custodia probe "+Date.now());
  return s.importKey("raw",TE.encode(String(pass).normalize("NFC")),"PBKDF2",false,["deriveBits"])
    .then(function(k){return s.deriveBits({name:"PBKDF2",hash:"SHA-256",salt:b64d(cs.kdf.salt),iterations:cs.kdf.iter},k,512);})
    .then(function(bits){return s.importKey("raw",new Uint8Array(bits).slice(32),{name:"HMAC",hash:"SHA-256"},false,["sign"]);})
    .then(function(mk2){var a=TE.encode("ingenium-cloud part 1\n"),x=new Uint8Array(a.length+probe.length);x.set(a,0);x.set(probe,a.length);
      return Promise.all([s.sign("HMAC",mk2,x),IngCloud.seal(probe)]);})
    .then(function(r){return hex(new Uint8Array(r[0]))===r[1].id;});}
function ownerOpens(pw){return ownerStore("key").then(function(k){if(!k)throw new Error("There is no owner key on this device.");return PermitCore.openKey(k,pw).then(function(){return true;},function(){return false;});});}
function readOpens(pw){return readRec().then(function(k){if(!k)throw new Error("There is no reading key on this device.");return IngReadable._open(k,pw).then(function(){return true;},function(){return false;});});}
var OPENS={cloud:cloudOpens,owner:ownerOpens,read:readOpens};
var WHAT={cloud:"your Cloud passphrase",owner:"your owner key's password",read:"your reading key's password",backup:"a backup password"};
/* ---------- the owner key's own ten words: they bring back its password, apart from the sign-in ---------- */
var ITER=600000;
function phraseKey(words,salt){var s=sub(),p=String(words).toLowerCase().normalize("NFC").replace(/\s+/g," ").trim();
  return s.importKey("raw",TE.encode(p),"PBKDF2",false,["deriveKey"]).then(function(k){return s.deriveKey({name:"PBKDF2",hash:"SHA-256",salt:salt,iterations:ITER},k,{name:"AES-GCM",length:256},false,["encrypt","decrypt"]);});}
function newWords(){var list=(L()&&L().words)||[];if(list.length<512)throw new Error("The word list is not at hand.");var u=new Uint16Array(10);W.crypto.getRandomValues(u);return [].map.call(u,function(v){return list[v%512];});}
function makeWordsRecord(words,pw){var salt=rnd(16),iv=rnd(12);return phraseKey(words.join(" "),salt).then(function(k){return sub().encrypt({name:"AES-GCM",iv:iv,additionalData:TE.encode("ingenium-owner-words 1")},k,TE.encode(pw));})
  .then(function(ct){return {kind:"ingenium-owner-words",v:1,salt:b64e(salt),iter:ITER,iv:b64e(iv),ct:b64e(new Uint8Array(ct)),made:Date.now()};});}
function wordsOpen(r,words){return phraseKey(words,b64d(r.salt)).then(function(k){return sub().decrypt({name:"AES-GCM",iv:b64d(r.iv),additionalData:TE.encode("ingenium-owner-words 1")},k,b64d(r.ct));}).then(function(pt){return TD.decode(pt);});}
/* ---------- where the existing ways are kept: opened, not copied ---------- */
function goSettings(cardId,keyRe){try{W.go("settings");}catch(e){}setTimeout(function(){var c=D.getElementById(cardId);if(!c)return;try{c.scrollIntoView({block:"start",behavior:"smooth"});}catch(e){}
    if(keyRe){var b=[].filter.call(c.querySelectorAll("button"),function(x){return keyRe.test(x.textContent);})[0];if(b)setTimeout(function(){b.click();},350);}},450);}
function openMemoria(room){try{if(W.IngMemoria&&IngMemoria.open)IngMemoria.open(room);else W.go("memoria");}catch(e){}}
/* ---------- the head ---------- */
function head(keys){var h=mk("div");h.id="cuHead";var w=mk("div","cu-words");w.appendChild(mk("div","cu-eye","Every key and its ways back"));w.appendChild(mk("h2",null,"Custodia"));
  w.appendChild(mk("p",null,"Every password and key Ingenium keeps for you, and every way back to each, so that you are never locked out. It is all kept on this device, sealed with your sign-in."));
  var live=keys.filter(function(k){return !k.none;}),bad=live.filter(function(k){return !k.ok;}).length,ch=mk("div","cu-chips");
  ch.appendChild(mk("span","cu-chip",keys.length+" keys · "+(live.length-bad)+" with a way back"));if(bad)ch.appendChild(mk("span","cu-chip warn",bad+" with no way back yet"));w.appendChild(ch);
  var ks=mk("div","cu-keys"),a=mk("button","cu-key primary");a.type="button";a.innerHTML=svg(I.shield)+"Give every key a way back";a.onclick=function(){var k=keys.filter(function(x){return !x.none&&!x.ok;})[0];if(!k){toast("Every key has a way back.");return;}heard();open(k.k,true);};ks.appendChild(a);
  var b=mk("button","cu-key");b.type="button";b.innerHTML=svg(I.sheet)+"My recovery sheet";b.onclick=sheetStart;ks.appendChild(b);w.appendChild(ks);h.appendChild(w);
  var say=mk("div","cu-say");say.innerHTML="Each lamp around the dial is one of your keys. <b>Violet</b> has a way back; <b>amber</b> has none yet. Press a lamp to dial its key.";h.appendChild(say);
  /* 8.02: the dial in a tilting plate; the ring turns under her hand; Ingenium's own seal in the face, upright, pressed as on Home */
  var box=mk("div","cu-dialbox"),tilt=mk("div","cu-tilt"),dial=mk("div","cu-dial"),turn=mk("div","cu-turn");dial.appendChild(mk("div","cu-face"));
  turn.appendChild(mk("div","cu-ticks"));turn.appendChild(mk("div","cu-ticks mid"));turn.appendChild(mk("div","cu-ticks big"));
  for(var n=0;n<100;n+=10){var a2=n*3.6,s=mk("span","cu-num",String(n));s.style.transform="rotate("+a2+"deg) translateY(-122px)";turn.appendChild(s);}
  turn.style.transform="rotate("+DL.rot.toFixed(2)+"deg)";dial.appendChild(turn);dial.appendChild(mk("div","cu-gleam"));dial.appendChild(mk("div","cu-sheen"));tilt.appendChild(dial);
  var sb=mk("div","cu-sealbox"),se=sealKey();if(se)sb.appendChild(se);tilt.appendChild(sb);var mkk=mk("div","cu-mark");mkk.appendChild(mk("i"));tilt.appendChild(mkk);var lab=mk("div","cu-lab");lab.setAttribute("aria-hidden","true");
  keys.forEach(function(x,i){var t=(-90+i*(360/keys.length)+22)*Math.PI/180,l=mk("button","cu-lamp "+(x.none?"none":x.ok?"ok":"warn"));l.type="button";l.style.left=(190+201*Math.cos(t)-7)+"px";l.style.top=(190+201*Math.sin(t)-7)+"px";
    l.setAttribute("aria-label",x.name+": "+(x.none?x.st:x.ok?"has a way back":"no way back yet"));l.setAttribute("data-key",x.k);l.style.border="0";l.style.padding="0";l.style.cursor="pointer";
    l.addEventListener("pointerenter",function(){showLab(lab,l,x);});l.addEventListener("focus",function(){showLab(lab,l,x);});
    l.addEventListener("pointerleave",function(){lab.classList.remove("on");});l.addEventListener("blur",function(){lab.classList.remove("on");});
    l.onclick=function(){lampPress(box,l,x,i,keys.length);};tilt.appendChild(l);});
  tilt.appendChild(lab);box.appendChild(tilt);wireDial(box,turn);h.appendChild(box);return h;}
/* ---------- 8.02: the dial moves and answers, and runs cool (her words, 27 November 2026: "the same animated and clickable feel and look as the
   other pages"; "overheating my devices again"). Nothing turns or glows by itself any more but the seal's own breath, as on every page; what
   moves moves whole (turned, tilted, faded), and only while she moves it or for a moment after: a turn as the page opens, a press. ---------- */
var DL={rot:0,last:0,n:0,tt:0};
function still(){try{if(D.body.getAttribute("data-motion")==="minimal")return true;}catch(e){}try{return !!(W.matchMedia&&matchMedia("(prefers-reduced-motion: reduce)").matches);}catch(e){return false;}}
function sealKey(){var K=W.IngStudios&&IngStudios.kit;
  if(K&&typeof K.sealKey==="function"){try{var hs0=K.sealKey("cu-seal","Ingenium's seal. Press it for fun.",88);if(hs0)return hs0;}catch(e){}}
  /* where the compass's part is not carried (the Gift and Demo editions): the welcome door's own seal, in its layers, with a press of its own */
  var src=D.querySelector("#introSeal .isl")||D.querySelector("#brandSealBtn .isl")||D.querySelector("#hxSeal .isl");if(!src)return null;
  var c=src.cloneNode(true),pre="cu"+(++DL.n)+"_",html;c.className="isl isl-home";c.removeAttribute("style");c.setAttribute("aria-hidden","true");html=c.outerHTML;
  [].forEach.call(c.querySelectorAll("[id]"),function(nd){var id=nd.getAttribute("id"),q=id.replace(/[.*+?^${}()|[\]\\]/g,"\\$&");
    html=html.replace(new RegExp('id="'+q+'"',"g"),'id="'+pre+id+'"').replace(new RegExp("url\\(#"+q+"\\)","g"),"url(#"+pre+id+")").replace(new RegExp('href="#'+q+'"',"g"),'href="#'+pre+id+'"');});
  var w=mk("div");w.innerHTML=html;var isl=w.firstElementChild;isl.style.setProperty("--S","88px");[].forEach.call(isl.querySelectorAll(".isl-tilt,.isl-idle"),function(nd){nd.removeAttribute("style");});
  var hs=mk("div","hx-seal cu-seal"),k=mk("button","r175-seal"),g=mk("span","r175-glow"),fx=mk("span","r175-fx"),cx=mk("span","cu-fx"),f=0;k.type="button";k.setAttribute("aria-label","Ingenium's seal. Press it for fun.");
  g.setAttribute("aria-hidden","true");cx.appendChild(isl);fx.appendChild(cx);k.appendChild(g);k.appendChild(fx);hs.appendChild(k);
  k.addEventListener("pointermove",function(e){if(e.pointerType!=="mouse"||still())return;var r=isl.getBoundingClientRect();if(!r.width)return;var x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;
    isl.classList.add("hover");isl.style.setProperty("--ry",(x*28).toFixed(1)+"deg");isl.style.setProperty("--rx",(-y*24).toFixed(1)+"deg");},{passive:true});
  k.addEventListener("pointerleave",function(){isl.classList.remove("hover","down");isl.style.setProperty("--rx","0deg");isl.style.setProperty("--ry","0deg");});
  k.addEventListener("pointerdown",function(){if(!still())isl.classList.add("down");},{passive:true});
  ["pointerup","pointercancel"].forEach(function(t){k.addEventListener(t,function(){isl.classList.remove("down");},{passive:true});});
  var FL=[[{transform:"rotate(0deg)"},{transform:"rotate(360deg)"}],[{transform:"scale(1)"},{transform:"scale(1.12)"},{transform:"scale(.95)"},{transform:"scale(1)"}],
    [{transform:"translateY(0)"},{transform:"translateY(-12px)"},{transform:"translateY(0)"},{transform:"translateY(-4px)"},{transform:"translateY(0)"}],
    [{transform:"rotate(0deg)"},{transform:"rotate(-14deg)"},{transform:"rotate(10deg)"},{transform:"rotate(-5deg)"},{transform:"rotate(0deg)"}]];
  k.addEventListener("click",function(e){e.preventDefault();e.stopPropagation();heard();if(still()||!cx.animate)return;var q=FL[f++%FL.length];try{cx.animate(q,{duration:q.length>3?760:640,easing:"cubic-bezier(.3,.7,.3,1)"});}catch(x){}});
  return hs;}
function showLab(lab,l,x){lab.textContent="";lab.appendChild(D.createTextNode(x.name));lab.appendChild(mk("small",null,x.none?x.st:x.ok?"Has a way back":"No way back yet"));
  var lx=parseFloat(l.style.left)+7,ly=parseFloat(l.style.top)+7;lab.style.left=Math.max(96,Math.min(284,lx))+"px";lab.style.top=ly+"px";lab.style.setProperty("--ty",ly<190?"18px":"calc(-100% - 18px)");lab.classList.add("on");}
/* the ring turned to a number: the shortest way round; already there, a whole turn */
function turnTo(turn,target,ms){var d=((target-DL.rot)%360+540)%360-180;if(Math.abs(d)<2)d=d>=0?360:-360;DL.rot+=d;clearTimeout(DL.tt);
  if(!ms){turn.style.transition="none";turn.style.transform="rotate("+DL.rot.toFixed(2)+"deg)";return;}
  turn.style.transition="transform "+ms+"ms cubic-bezier(.2,.85,.25,1)";turn.style.transform="rotate("+DL.rot.toFixed(2)+"deg)";DL.tt=setTimeout(function(){turn.style.transition="";heard();},ms);}
/* a lamp pressed: it flares once, the ring dials its number under the mark, and its key opens below */
function lampPress(box,l,x,i,n){heard();var turn=box.querySelector(".cu-turn");l.classList.remove("pop");void l.offsetWidth;l.classList.add("pop");setTimeout(function(){l.classList.remove("pop");},700);
  if(turn)turnTo(turn,-Math.round(i*(100/n))*3.6,still()?0:950);setTimeout(function(){open(x.k,true);},still()?0:560);}
/* the plate tilts toward the pointer and its light follows it (a mouse only; one drawing a frame, and only while it moves); the ring turns
   under her hand, glides on a little when let go, and settles on a number with a click */
function wireDial(box,turn){var raf=0,px=0,py=0,drag=null;
  function frame(){raf=0;if(!drag&&!box.classList.contains("live"))return;var r=box.getBoundingClientRect();if(!r.width)return;var x=(px-r.left)/r.width,y=(py-r.top)/r.height;
    box.style.setProperty("--lx",(x*100).toFixed(1)+"%");box.style.setProperty("--ly",(y*100).toFixed(1)+"%");
    if(!drag){box.style.setProperty("--rx",(-(y-.5)*14).toFixed(2)+"deg");box.style.setProperty("--ry",((x-.5)*16).toFixed(2)+"deg");}}
  box.addEventListener("pointermove",function(e){if((e.pointerType!=="mouse"&&!drag)||still())return;px=e.clientX;py=e.clientY;box.classList.add("live");if(!raf)raf=requestAnimationFrame(frame);},{passive:true});
  box.addEventListener("pointerleave",function(){if(drag)return;if(raf){cancelAnimationFrame(raf);raf=0;}box.classList.remove("live");box.style.setProperty("--rx","0deg");box.style.setProperty("--ry","0deg");});
  function ang(e){var r=box.getBoundingClientRect();return Math.atan2(e.clientY-(r.top+r.height/2),e.clientX-(r.left+r.width/2))*180/Math.PI;}
  function clicks(){var s=Math.floor(DL.rot/36);if(s!==DL.last){DL.last=s;heard();}}
  function snap(){var to=Math.round(DL.rot/3.6)*3.6;DL.rot=to;turn.style.transition="transform .2s cubic-bezier(.3,1.4,.5,1)";turn.style.transform="rotate("+to.toFixed(2)+"deg)";setTimeout(function(){turn.style.transition="";},220);}
  turn.addEventListener("pointerdown",function(e){if(e.button!==0)return;clearTimeout(DL.tt);drag={a:ang(e),t:performance.now(),v:0,id:e.pointerId,x:e.clientX,y:e.clientY,moved:false};turn.style.transition="none";turn.classList.add("held");try{turn.setPointerCapture(e.pointerId);}catch(x){}});
  turn.addEventListener("pointermove",function(e){if(!drag||e.pointerId!==drag.id)return;if(!drag.moved&&Math.abs(e.clientX-drag.x)+Math.abs(e.clientY-drag.y)<5)return;drag.moved=true;var a=ang(e),d=a-drag.a;if(d>180)d-=360;if(d<-180)d+=360;drag.a=a;
    var t=performance.now(),dt=Math.max(8,t-drag.t);drag.t=t;drag.v=d/dt*1000;DL.rot+=d;turn.style.transform="rotate("+DL.rot.toFixed(2)+"deg)";clicks();});
  function end(e){if(!drag)return;var v=drag.v,moved=drag.moved;drag=null;turn.classList.remove("held");try{turn.releasePointerCapture(e.pointerId);}catch(x){}
    if(!moved&&e.type==="pointerup"){var rb=box.getBoundingClientRect();turnTo(turn,DL.rot+(e.clientX>=rb.left+rb.width/2?36:-36),still()?0:620);return;}
    if(still()||Math.abs(v)<60){snap();return;}var t0=performance.now(),last=t0;
    (function glide(now){var dt=Math.min(.05,(now-last)/1000);last=now;v*=Math.pow(.05,dt);DL.rot+=v*dt;turn.style.transform="rotate("+DL.rot.toFixed(2)+"deg)";clicks();
      if(Math.abs(v)>30&&now-t0<1000)requestAnimationFrame(glide);else snap();})(t0);}
  turn.addEventListener("pointerup",end);turn.addEventListener("pointercancel",end);
  var dial=box.querySelector(".cu-dial"),tilt=box.querySelector(".cu-tilt");
  if(dial)dial.addEventListener("pointerdown",function(e){if(e.target!==dial||e.button!==0)return;heard();if(still())return;tilt.classList.remove("press");void tilt.offsetWidth;tilt.classList.add("press");
    setTimeout(function(){tilt.classList.remove("press");},150);gleam(box);});
  box.addEventListener("pointerenter",function(e){if(e.pointerType==="mouse")gleam(box);});}
/* a gleam of light goes once round the bezel: as the pointer comes, at most once in four seconds, and as the page opens */
function gleam(box){var g=box&&box.querySelector(".cu-gleam"),t=Date.now();if(!g||still()||t-(DL.gl||0)<4000)return;DL.gl=t;g.classList.remove("go");void g.offsetWidth;g.classList.add("go");setTimeout(function(){g.classList.remove("go");},1500);}
/* as the page opens: the ring turns home once, and a lamp with no way back yet calls twice */
function settle(){var box=D.querySelector("#cuHead .cu-dialbox"),turn=box&&box.querySelector(".cu-turn");if(!turn||still())return;
  DL.rot=-48;turn.style.transition="none";turn.style.transform="rotate(-48deg)";void turn.offsetWidth;turnTo(turn,0,1300);DL.gl=0;setTimeout(function(){gleam(box);},700);
  [].forEach.call(box.querySelectorAll(".cu-lamp.warn"),function(l){l.classList.remove("hello");void l.offsetWidth;l.classList.add("hello");setTimeout(function(){l.classList.remove("hello");},2400);});}
/* ---------- the board of key tags ---------- */
function board(keys){var b=mk("section");b.id="cuBoard";var bh=mk("div","cu-bh");bh.appendChild(mk("h3",null,"Your keys"));bh.appendChild(mk("span",null,"press one to see its ways back"));b.appendChild(bh);
  var g=mk("div","cu-tags");keys.forEach(function(x){var t=mk("button","cu-tag"+(x.none?" none":x.ok?"":" warn"));t.type="button";t.setAttribute("data-key",x.k);t.setAttribute("aria-pressed",OPEN===x.k?"true":"false");
    t.appendChild(mk("b",null,x.name));t.appendChild(mk("small",null,x.opens));var wy=mk("div","cu-ways");x.ways.forEach(function(w){wy.appendChild(mk("i",w[1]?"on":""));});
    var n=x.ways.filter(function(w){return w[1];}).length;wy.appendChild(mk("span","cu-st",x.none?x.st:x.ok?n+" way"+(n===1?"":"s")+" back":"No way back yet"));t.appendChild(wy);
    t.onclick=function(){heard();open(OPEN===x.k?null:x.k,false);};g.appendChild(t);});b.appendChild(g);return b;}
/* ---------- a key opened: its ways back ---------- */
function key(t,primary,fn,ico){var b=mk("button","cu-key"+(primary?" primary":""));b.type="button";b.innerHTML=(ico?svg(I[ico]):"")+esc(t);b.addEventListener("click",function(e){e.stopPropagation();fn(b);});return b;}
function word(t,fn){var b=mk("button","cu-w",t);b.type="button";b.addEventListener("click",function(e){e.stopPropagation();fn(b);});return b;}
function way(icon,title,text,state,acts,opts){opts=opts||{};var li=mk("li","cu-way"+(opts.isNew?" new":"")+(opts.wide?" wide":""));var ic=mk("span","ic");ic.innerHTML=svg(I[icon]||I.key);li.appendChild(ic);
  var d=mk("div");d.appendChild(mk("b",null,title));d.appendChild(mk("p",null,text));if(state)d.appendChild(mk("span","st"+(state.no?" no":""),state.t));if(opts.extra)d.appendChild(opts.extra);li.appendChild(d);
  var r=mk("div","acts");(acts||[]).forEach(function(a){if(a)r.appendChild(a);});if(opts.wide)d.appendChild(r);else li.appendChild(r);return li;}
function foot(t){var f=mk("div","cu-foot");f.innerHTML=svg(I.shield);f.appendChild(mk("span",null,t));return f;}
function hd(x){var h=mk("header"),d=mk("div");d.appendChild(mk("span","cu-pno","Its ways back"));d.appendChild(mk("h3",null,x.name));d.appendChild(mk("i",null,x.opens.charAt(0).toLowerCase()+x.opens.slice(1)));h.appendChild(d);
  h.appendChild(mk("span","cu-badge"+(x.none||x.ok?" ok":""),x.none?x.st:x.ok?"Has a way back":"No way back yet"));return h;}
function note(k){return NOTE[k]?mk("p",NOTE[k].bad?"cu-err":"cu-ok",NOTE[k].t):null;}
/* the form that keeps a sealed copy of a secret, after checking that it opens its key */
function copyForm(kind){var f=mk("form","cu-form"),lb=mk("label",null,kind==="cloud"?"Your Cloud passphrase":kind==="owner"?"Your owner key's password":"Your reading key's password"),inp=mk("input");inp.type="password";inp.id="cuSecret";inp.autocomplete="new-password";inp.spellcheck=false;lb.htmlFor="cuSecret";
  f.appendChild(lb);f.appendChild(inp);var row=mk("div","row"),go=key("Check it and keep it sealed",true,function(){f.requestSubmit?f.requestSubmit():f.dispatchEvent(new Event("submit",{cancelable:true}));},"seal");row.appendChild(go);row.appendChild(word("Cancel",function(){FORM=null;paint();}));f.appendChild(row);
  var err=mk("p","cu-err");err.hidden=true;f.appendChild(err);
  f.addEventListener("submit",function(e){e.preventDefault();var v=inp.value;if(!v){inp.focus();return;}go.disabled=true;err.hidden=true;
    OPENS[kind](v).then(function(okk){if(!okk)throw new Error(kind==="cloud"?"That passphrase does not open this Cloud.":"That password does not open the key.");return sealCopy(kind,v);})
      .then(function(c){C().v[kind]={c:c,at:Date.now()};save();FORM=null;NOTE[kind]={t:"Checked, and kept sealed with your sign-in."};heard();paint();},function(x){go.disabled=false;err.textContent=x&&x.message?x.message:String(x);err.hidden=false;});});
  setTimeout(function(){try{inp.focus();}catch(e){}},30);return f;}
function reveal(kind,text){var r=mk("div","cu-reveal"),c=mk("code",null,text);r.appendChild(c);r.appendChild(key("Copy",false,function(){try{navigator.clipboard.writeText(text).then(function(){toast("Copied.");},function(){});}catch(e){}}));
  r.appendChild(word("Hide it",function(){REVEAL=null;paint();}));r.appendChild(mk("small",null,"It hides itself in thirty seconds. Nothing shown here is written anywhere."));return r;}
function showCopy(kind,item){confirmFirst(WHAT[kind]).then(function(okk){if(!okk)return;return openCopy(kind,item.c).then(function(t){var tok=++TOK;REVEAL={k:kind,at:item.at,t:t};paint();setTimeout(function(){if(TOK===tok){REVEAL=null;paint();}},30000);});})
  .catch(function(x){NOTE[kind]={t:x&&x.message?x.message:String(x),bad:1};paint();});}
function checkCopy(kind){var item=C().v[kind];if(!item)return;confirmFirst(WHAT[kind]).then(function(okk){if(!okk)return;return openCopy(kind,item.c).then(function(t){return OPENS[kind](t);}).then(function(r){
    NOTE[kind]=r?{t:"Checked today: the sealed copy still opens it."}:{t:"The sealed copy no longer opens it: it was changed since. Keep the new one.",bad:1};paint();});}).catch(function(x){NOTE[kind]={t:x&&x.message?x.message:String(x),bad:1};paint();});}
function forgetCopy(kind){if(ARMED!==kind+":forget"){ARMED=kind+":forget";NOTE[kind]={t:"Press Forget the copy again to let it go."};paint();return;}ARMED=null;delete C().v[kind];save();NOTE[kind]={t:"The sealed copy is let go."};paint();}
function sealedWay(kind,x,warnText){var V=C().v,item=V[kind],act=signedIn(),acts=[],extra=null;
  if(!act)acts.push(key("Turn on your sign-in",true,function(){goSettings("ingLockCard",null);},"seal"));
  else if(!item&&FORM===kind)extra=copyForm(kind);
  else if(!item)acts.push(key("Keep a sealed copy",true,function(){FORM=kind;NOTE[kind]=null;paint();},"seal"));
  else{acts.push(key("Show it",false,function(){showCopy(kind,item);}));acts.push(key("Check it",false,function(){checkCopy(kind);}));acts.push(word(ARMED===kind+":forget"?"Press again to forget it":"Forget the copy",function(){forgetCopy(kind);}));
    if(REVEAL&&REVEAL.k===kind)extra=reveal(kind,REVEAL.t);}
  var n=note(kind);if(n){var wrap=mk("div");if(extra)wrap.appendChild(extra);wrap.appendChild(n);extra=wrap;}
  return way("seal","A sealed copy inside your sign-in",warnText||"Ingenium keeps it sealed with your sign-in, so your ten words, your recovery file or this computer's own sign-in bring it back. You see it again only after your password.",
    act?(item?{t:"Kept "+day(item.at)}:{t:"Not kept yet",no:1}):{t:"Needs your sign-in",no:1},acts,{isNew:!item,extra:extra,wide:!!(extra&&(FORM===kind))});}
var PANELS={
 signin:function(p,x){var R=rec()||{},l=mk("ul","cu-wlist");p.appendChild(hd(x));
   if(x.none){l.appendChild(way("seal","Turn on your sign-in","A password seals your whole desk on this device. Turning it on gives every key below a place to keep its sealed copy, and makes your ten words at once.",{t:"Off",no:1},[key("Turn on your sign-in",true,function(){goSettings("ingLockCard",null);},"seal")]));
     p.appendChild(l);p.appendChild(foot("While the sign-in is off, nothing is sealed, so nothing can be forgotten; anyone at this device can open your desk."));return;}
   var ways=function(){goSettings("ingLockCard",/ways back in/i);};
   l.appendChild(way("words","Your ten words","Ten words that open your desk if the password is forgotten. Write them on paper and keep them away from this device.",R.phr?{t:"Made"+(R.recMade?" "+day(R.recMade):"")}:{t:"Not made",no:1},[key(R.phr?"See them, or make new ones":"Make them",!R.phr,ways)]));
   l.appendChild(way("file","Its recovery key file","A small file that opens your desk on its own. Keep it on a memory stick, apart from this device.",R.file&&R.file.ct?{t:"Made"}:{t:"Not made",no:1},[key(R.file&&R.file.ct?"Make a new one":"Make it",!(R.file&&R.file.ct),ways)]));
   l.appendChild(way("device","This computer's own sign-in","On a Mac or a Windows computer, its own sign-in (Touch ID, the Mac's password or Windows Hello) opens your desk with no password.",R.dev&&R.dev.ct?{t:"On"}:{t:"Off",no:1},[key("Open it",false,ways)]));
   l.appendChild(way("hint","Your hint","A few words that remind you of the password, never the password itself.",R.hint?{t:"Set"}:{t:"Not set",no:1},[key("Open it",false,ways)]));
   p.appendChild(l);p.appendChild(foot("If every way back were lost: you could start again with an empty desk; what was sealed cannot be opened, by you or by anyone else."));},
 cloud:function(p,x){p.appendChild(hd(x));var l=mk("ul","cu-wlist");
   if(x.none){l.appendChild(way("dev","Set up Ingenium Cloud","Your work kept the same on each of your devices, sealed with a passphrase of your own.",{t:"Not set up here",no:1},[key("Open Ingenium Cloud",true,function(){openMemoria("cloud");},"link")]));p.appendChild(l);return;}
   l.appendChild(sealedWay("cloud",x));
   l.appendChild(way("dev","This device holds its key","This device keeps its Cloud key, and goes on in step without the passphrase.",{t:"Holds its key"},[]));
   l.appendChild(way("again","Start the Cloud again with a new passphrase","Your work stays on this device; it lets go of its Cloud key, and you join again with a new passphrase.",{t:"Always there"},
     [key(ARMED==="cloud:again"?"Press again to start again":"Start again",false,function(){if(ARMED!=="cloud:again"){ARMED="cloud:again";paint();return;}ARMED=null;Promise.resolve(IngCloud.forget()).then(function(){toast("This device let go of its Cloud key. Join again with a new passphrase.");openMemoria("cloud");});},"again")]));
   p.appendChild(l);p.appendChild(foot("If every way back were lost: your devices that hold the key keep working and in step, but a new device could not join until you start the Cloud again."));},
 backup:function(p,x){p.appendChild(hd(x));var l=mk("ul","cu-wlist"),c=C();
   if(x.none){l.appendChild(way("seal","Turn on your sign-in","A copy of each backup password is kept sealed inside your sign-in, so the sign-in comes first.",{t:"Off",no:1},[key("Turn on your sign-in",true,function(){goSettings("ingLockCard",null);},"seal")]));p.appendChild(l);
     p.appendChild(foot("If every way back were lost: a backup sealed with a forgotten password cannot be opened; a backup made without the keys or the seal opens as it is."));return;}
   var sw=mk("button","cu-sw");sw.type="button";sw.setAttribute("role","switch");sw.setAttribute("aria-checked",c.keepBackup!==false?"true":"false");sw.setAttribute("aria-label","Keep a sealed copy of each backup password");
   sw.onclick=function(){c.keepBackup=!(c.keepBackup!==false);save();heard();paint();};
   l.appendChild(way("seal","A sealed copy of each backup password","Each time you make a backup with a password, Ingenium keeps a copy of that password sealed with your sign-in.",c.keepBackup!==false?{t:"On"}:{t:"Off",no:1},[sw]));
   var kept=c.v.backup.slice().reverse(),ul=mk("ul","cu-kept");kept.forEach(function(it){var li=mk("li");li.appendChild(mk("span",null,"Kept "+day(it.at)+(it.n?" · "+it.n:"")));
     li.appendChild(key("Show it",false,function(){showCopy("backup",it);}));li.appendChild(word("Forget it",function(){c.v.backup=c.v.backup.filter(function(y){return y!==it;});save();paint();}));ul.appendChild(li);
     if(REVEAL&&REVEAL.k==="backup"&&REVEAL.at===it.at)ul.appendChild(reveal("backup",REVEAL.t));});
   l.appendChild(way("box","The copies kept",kept.length?"One for each backup you sealed, newest first. The last ten are kept.":"None yet: the next backup you make with a password keeps one.",kept.length?{t:kept.length+" kept"}:{t:"None yet",no:1},[key("Make a backup",false,function(){openMemoria("backup");},"box")],{extra:kept.length?ul:null,wide:!!kept.length}));
   p.appendChild(l);p.appendChild(foot("If every way back were lost: a backup sealed with a forgotten password cannot be opened; a backup made without the keys or the seal opens as it is."));},
 owner:function(p,x){p.appendChild(hd(x));var l=mk("ul","cu-wlist"),wr=x.words;
   l.appendChild(way("file","Its backup file (.ingkey)","Saved when the key was made. It brings the key back to a new device, and opens with the same password.",{t:"Saved when it was made"},[key("Save another copy",false,function(){goSettings("ingPermitCard",/save a backup of my key/i);},"save")]));
   var extra=null,acts=[];
   if(WORDS&&WORDS.phase==="show"){extra=mk("div");var g=mk("div","cu-wgrid");WORDS.list.forEach(function(wd,i){var s=mk("span");s.appendChild(mk("i",null,String(i+1)));s.appendChild(D.createTextNode(wd));g.appendChild(s);});extra.appendChild(g);
     extra.appendChild(mk("p","cu-ok","Write these ten words down, in this order, and keep them apart from this device and from your sign-in's words."));
     var r1=mk("div","row");r1.appendChild(key("I have written them down",true,function(){var a=Math.floor(Math.random()*10),b=(a+1+Math.floor(Math.random()*9))%10;WORDS.phase="check";WORDS.ask=[a,b];paint();}));r1.appendChild(word("Cancel",function(){WORDS=null;paint();}));extra.appendChild(r1);}
   else if(WORDS&&WORDS.phase==="check"){extra=mk("form","cu-form");var q=WORDS.ask;[0,1].forEach(function(j){var lb=mk("label",null,"Word "+(q[j]+1)),i=mk("input");i.id="cuW"+j;i.autocomplete="off";i.spellcheck=false;lb.htmlFor=i.id;extra.appendChild(lb);extra.appendChild(i);});
     var er=mk("p","cu-err");er.hidden=true;var r2=mk("div","row"),go2=key("Check them",true,function(){extra.requestSubmit?extra.requestSubmit():extra.dispatchEvent(new Event("submit",{cancelable:true}));});r2.appendChild(go2);r2.appendChild(word("Show the words again",function(){WORDS.phase="show";paint();}));extra.appendChild(r2);extra.appendChild(er);
     extra.addEventListener("submit",function(e){e.preventDefault();var a=D.getElementById("cuW0").value.trim().toLowerCase(),b=D.getElementById("cuW1").value.trim().toLowerCase();
       if(a!==WORDS.list[q[0]]||b!==WORDS.list[q[1]]){er.textContent="Those are not the words in those places. Look at what you wrote, or see the words again.";er.hidden=false;return;}go2.disabled=true;
       makeWordsRecord(WORDS.list,WORDS.pw).then(function(r){return Promise.resolve(PermitCore._.put("words",r)).then(function(){return r;});}).then(function(r){x.words=r;WORDS=null;NOTE.ownerwords={t:"Its ten words are made. They bring back its password."};heard();refresh();},function(z){go2.disabled=false;er.textContent=z&&z.message?z.message:String(z);er.hidden=false;});});}
   else if(FORM==="ownerwords"){extra=mk("form","cu-form");var lb0=mk("label",null,"Its password, to check it before the words are made"),i0=mk("input");i0.type="password";i0.id="cuOwPw";i0.autocomplete="new-password";lb0.htmlFor=i0.id;extra.appendChild(lb0);extra.appendChild(i0);
     var er0=mk("p","cu-err");er0.hidden=true;var r0=mk("div","row"),g0=key("Check it and make the words",true,function(){extra.requestSubmit?extra.requestSubmit():extra.dispatchEvent(new Event("submit",{cancelable:true}));});r0.appendChild(g0);r0.appendChild(word("Cancel",function(){FORM=null;paint();}));extra.appendChild(r0);extra.appendChild(er0);
     extra.addEventListener("submit",function(e){e.preventDefault();var v=i0.value;if(!v)return;g0.disabled=true;ownerOpens(v).then(function(okk){if(!okk)throw new Error("That password does not open the key.");FORM=null;WORDS={phase:"show",list:newWords(),pw:v};paint();})
       .catch(function(z){g0.disabled=false;er0.textContent=z&&z.message?z.message:String(z);er0.hidden=false;});});setTimeout(function(){try{i0.focus();}catch(_){}},30);}
   else if(FORM==="ownerforgot"){extra=mk("form","cu-form");var lb1=mk("label",null,"Its ten words, in their order"),t1=mk("textarea");t1.id="cuOwWords";t1.spellcheck=false;lb1.htmlFor=t1.id;extra.appendChild(lb1);extra.appendChild(t1);
     var er1=mk("p","cu-err");er1.hidden=true;var r3=mk("div","row"),g1=key("Bring back its password",true,function(){extra.requestSubmit?extra.requestSubmit():extra.dispatchEvent(new Event("submit",{cancelable:true}));});r3.appendChild(g1);r3.appendChild(word("Cancel",function(){FORM=null;paint();}));extra.appendChild(r3);extra.appendChild(er1);
     extra.addEventListener("submit",function(e){e.preventDefault();g1.disabled=true;wordsOpen(wr,t1.value).then(function(pw){FORM=null;var tok=++TOK;REVEAL={k:"ownerwords",t:pw};paint();setTimeout(function(){if(TOK===tok){REVEAL=null;paint();}},30000);},
       function(){g1.disabled=false;er1.textContent="Those words do not open it. Check each word and their order.";er1.hidden=false;});});setTimeout(function(){try{t1.focus();}catch(_){}},30);}
   else if(wr&&wr.ct){acts.push(key("Forgot its password? Use the words",false,function(){FORM="ownerforgot";REVEAL=null;paint();},"words"));acts.push(word("Make new words",function(){FORM="ownerwords";paint();}));
     if(REVEAL&&REVEAL.k==="ownerwords")extra=reveal("owner",REVEAL.t);}
   else acts.push(key("Make its ten words",true,function(){FORM="ownerwords";NOTE.ownerwords=null;paint();},"words"));
   var n=note("ownerwords");if(n&&!FORM&&!WORDS){var wrap=mk("div");if(extra)wrap.appendChild(extra);wrap.appendChild(n);extra=wrap;}
   l.appendChild(way("words","Its own ten words","Ten words made only for the owner key, kept apart from your sign-in, so that no one who opens your sign-in can sign as you. They bring back its password.",
     wr&&wr.ct?{t:"Made "+day(wr.made)}:{t:"Not made yet",no:1},acts,{isNew:!(wr&&wr.ct),extra:extra,wide:!!extra}));
   l.appendChild(sealedWay("owner",x,"Simpler, but less apart: anyone who could open your sign-in could then sign as you. Offered, never chosen for you."));
   p.appendChild(l);p.appendChild(foot("If every way back were lost: your apps could no longer be signed or opened as their owner; a new owner key would be made, and each app would carry the new one from its next release."));},
 read:function(p,x){p.appendChild(hd(x));var l=mk("ul","cu-wlist");
   l.appendChild(way("file","Its backup file","A file that brings the reading key back to another of your computers; it opens with the same password.",{t:"Saved by you, in Security"},[key("Save a backup of it",false,function(){goSettings("secCard",null);},"save")]));
   l.appendChild(sealedWay("read",x));p.appendChild(l);p.appendChild(foot("If every way back were lost: the readable copy of your apps' code could not be opened, but your sources stay readable."));},
 signing:function(p,x){p.appendChild(hd(x));var l=mk("ul","cu-wlist");
   l.appendChild(way("file","Save it as a .p12 file","In Build: keep the file on a memory stick; bringing it back asks the password you give it then.",{t:"Always there"},[key("Open Build",false,function(){try{W.go("build");}catch(e){}},"link")]));
   l.appendChild(way("box","Inside your backups","A backup made with its keys carries them, sealed with that backup's password.",{t:"Always there"},[key("Open Back up and move",false,function(){openMemoria("backup");},"box")]));
   p.appendChild(l);p.appendChild(foot("If every way back were lost: a new key can be made, but phones and tablets would treat the next app as a new one."));},
 pair:function(p,x){p.appendChild(hd(x));var l=mk("ul","cu-wlist");
   l.appendChild(way("again","Make a new code","On the computer that lends, Your devices makes a new code at any time; each device asks it once.",{t:"Always there"},[key("Open Your devices",false,function(){goSettings("linkCard",null);},"link")]));
   l.appendChild(way("dev","Accept on the computer","A device that seals can be accepted on the computer, with no code typed.",{t:"Always there"},[]));
   p.appendChild(l);p.appendChild(foot("Nothing is lost if the code is forgotten: a new one takes its place."));},
 github:function(p,x){p.appendChild(hd(x));var l=mk("ul","cu-wlist");
   l.appendChild(way("again","Sign in to GitHub again","Fabrica signs in on GitHub's own page; signing out and in again gives it a new key.",{t:"Always there"},[key("Open Fabrica",false,function(){try{W.go("fabrica");}catch(e){}},"link")]));
   p.appendChild(l);p.appendChild(foot("Nothing of yours is lost: your work is in Fabrica and on GitHub."));}};
/* ---------- the recovery sheet ---------- */
function sheetStart(){var R=rec();if(signedIn()&&R&&R.phr&&keysInHand()){confirmFirst("your recovery sheet").then(function(okk){if(!okk)return;
      return L().openText("ING1."+R.phr.iv+"."+R.phr.ct,"ingenium-lock phrase").then(function(t){SHEET={words:String(t).split(" ").slice(0,10)};paint();setTimeout(function(){var s=D.getElementById("cuSheet");if(s)try{s.scrollIntoView({block:"start",behavior:"smooth"});}catch(e){}},80);});})
    .catch(function(){SHEET={words:null};paint();});}
  else{SHEET={words:null};paint();setTimeout(function(){var s=D.getElementById("cuSheet");if(s)try{s.scrollIntoView({block:"start",behavior:"smooth"});}catch(e){}},80);}}
function sheetRows(keys){var R=rec()||{},V=C().v,rows=[];keys.forEach(function(x){var t=[];
  if(x.k==="signin"){if(x.none)t.push("No sign-in yet");else{if(R.phr)t.push("The ten words on this sheet");if(R.file&&R.file.ct)t.push("its recovery key file");if(R.dev&&R.dev.ct)t.push("this computer's own sign-in");if(R.hint)t.push("your hint");}}
  else if(x.k==="cloud"){if(x.none)t.push("Not set up on this device");else{if(V.cloud)t.push("A sealed copy inside your sign-in");t.push("each device that holds its key");}}
  else if(x.k==="backup"){if(x.none)t.push("Needs your sign-in");else if(C().keepBackup!==false)t.push("A sealed copy of each, inside your sign-in");}
  else if(x.k==="owner"){t.push("Its backup file (.ingkey)");if(x.words&&x.words.ct)t.push("its own ten words, on their own sheet");if(V.owner)t.push("a sealed copy inside your sign-in");}
  else if(x.k==="read"){t.push("Its backup file");if(V.read)t.push("a sealed copy inside your sign-in");}
  else if(x.k==="signing")t.push("Its .p12 file, or a backup with its keys");else if(x.k==="pair")t.push("A new code from the computer");else if(x.k==="github")t.push("Signing in to GitHub again");
  rows.push([x.name,t.length?t.join("; "):"No way back yet"]);});return rows;}
function sheetHtml(keys,forFile){var d=new Date(),rows=sheetRows(keys),w=SHEET&&SHEET.words;
  var words=w?w.map(function(x,i){return '<span><i>'+(i+1)+'</i>'+esc(x)+'</span>';}).join(""):Array.apply(null,Array(10)).map(function(_,i){return '<span class="blank"><i>'+(i+1)+'</i>&nbsp;</span>';}).join("");
  var body='<div class="sh-h">'+STAR.replace('fill="#fff"','fill="#6a3fb5"')+'<div><h4>Your recovery sheet</h4><div class="sh-k">Made '+esc(day(d.getTime()))+' · keep it away from this device</div></div></div>'
    +'<h5>Your sign-in’s ten words</h5><div class="words">'+words+'</div>'+(w?'':'<p class="sh-note">'+(signedIn()?'Write your ten words in the boxes by hand. Settings shows them again after your password.':'Your sign-in is off, so there are no words yet.')+'</p>')
    +'<h5>Where each key’s ways back are</h5><table>'+rows.map(function(r){return '<tr><td>'+esc(r[0])+'</td><td>'+esc(r[1])+'</td></tr>';}).join("")+'</table>'
    +'<p class="sh-note">No password is ever written on this sheet. Keep it somewhere safe, away from this device, and make a new one when your ways back change.</p>';
  if(!forFile)return body;
  return '<!doctype html><html><head><meta charset="utf-8"><title>Your recovery sheet</title><style>body{margin:0;padding:40px;background:#fff;color:#2a2236;font-family:Georgia,serif}#cuSheet{max-width:760px;margin:0 auto}.sh-h{display:flex;align-items:center;gap:14px;padding:0 0 18px;border-bottom:1.5px solid rgba(106,63,181,.25)}.sh-h svg{width:38px;height:38px}h4{margin:0;font-size:30px}.sh-k{font:600 10.5px/1 sans-serif;letter-spacing:.24em;text-transform:uppercase;color:#6c6579;margin-top:6px}h5{margin:30px 0 10px;font:600 12px/1 sans-serif;letter-spacing:.2em;text-transform:uppercase;color:#6a3fb5}.words{display:grid;grid-template-columns:repeat(5,1fr);gap:10px}.words span{padding:10px 8px;border-radius:8px;text-align:center;font-size:16px;background:#f4f0f9;border:1px solid #e1d8ef}.words i{display:block;margin-bottom:5px;font:600 9.5px/1 sans-serif;font-style:normal;color:#8a8398}table{width:100%;border-collapse:collapse;font:14px/1.45 sans-serif}td{padding:9px 6px;border-bottom:1px solid #ece6f4;vertical-align:top}td:first-child{font-weight:600;width:34%}.sh-note{font-style:italic;color:#6c6579}</style></head><body><div id="cuSheet">'+body+'</div></body></html>';}
function sheet(keys){var s=mk("section");s.id="cuSheet";s.innerHTML=sheetHtml(keys,false);var k=mk("div","sh-keys");
  k.appendChild(key("Print it",false,function(){var f=D.createElement("iframe");f.style.cssText="position:fixed;width:0;height:0;border:0;left:-9999px";D.body.appendChild(f);try{f.contentDocument.open();f.contentDocument.write(sheetHtml(keys,true));f.contentDocument.close();
      setTimeout(function(){try{f.contentWindow.focus();f.contentWindow.print();}catch(e){toast("This device cannot print from here: save the sheet, then print the file.");}setTimeout(function(){f.remove();},60000);},250);}catch(e){f.remove();}},"print"));
  k.appendChild(key("Save it",true,function(){try{if(typeof W.saveFileNative==="function")W.saveFileNative("Ingenium recovery sheet.html","text/html",sheetHtml(keys,true));else{var a=D.createElement("a");a.href=URL.createObjectURL(new Blob([sheetHtml(keys,true)],{type:"text/html"}));a.download="Ingenium recovery sheet.html";D.body.appendChild(a);a.click();setTimeout(function(){URL.revokeObjectURL(a.href);a.remove();},2000);}}catch(e){toast("The sheet could not be saved here.");}},"save"));
  k.appendChild(word("Close the sheet",function(){SHEET=null;paint();}));s.appendChild(k);return s;}
/* ---------- painting ---------- */
function root(){return D.getElementById("cuRoot");}
function paint(){var r=root();if(!r)return;var keys=KEYS,old=D.getElementById("cuHead"),sig=keys.map(function(x){return x.k+(x.none?"0":x.ok?"1":"2");}).join(",");
  var keep=!!(old&&old.parentNode===r&&old.getAttribute("data-sig")===sig);[].slice.call(r.childNodes).forEach(function(nd){if(!(keep&&nd===old))r.removeChild(nd);});
  if(!keep){var hd=head(keys);hd.setAttribute("data-sig",sig);r.insertBefore(hd,r.firstChild);}r.appendChild(board(keys));
  if(OPEN){var x=keys.filter(function(k){return k.k===OPEN;})[0];if(x&&PANELS[x.k]){var o=mk("section");o.id="cuOpen";o.setAttribute("data-key",x.k);PANELS[x.k](o,x);r.appendChild(o);}}
  if(SHEET)r.appendChild(sheet(keys));}
function refresh(){return model().then(function(k){KEYS=k;paint();return k;});}
function open(k,scroll){OPEN=k;FORM=null;REVEAL=null;ARMED=null;if(!WORDS||k!=="owner")WORDS=null;paint();if(scroll&&k)setTimeout(function(){var o=D.getElementById("cuOpen");if(o)try{o.scrollIntoView({block:"start",behavior:D.body.getAttribute("data-motion")==="minimal"?"auto":"smooth"});}catch(e){}},60);}
/* ---------- its place: a page of its own, in the side bar before Settings ---------- */
function install(){if(D.getElementById("page-custodia")){nav();return true;}var main=D.querySelector(".main");if(!main)return false;
  var sec=mk("section","section");sec.id="page-custodia";sec.innerHTML='<h1 class="page-title">Custodia</h1><div id="cuRoot"></div>';main.appendChild(sec);nav();return true;}
function nav(){var st=D.querySelector('.nav-btn[data-page="settings"]');if(st&&!D.querySelector('.nav-btn[data-page="custodia"]')){var b=mk("button","nav-btn");b.type="button";b.setAttribute("data-page","custodia");b.setAttribute("onclick","go('custodia')");b.title="Custodia";
    b.innerHTML=svg(I.shield)+"Custodia";st.parentNode.insertBefore(b,st);}
  if(W.PAGES&&W.PAGES.indexOf("custodia")<0)W.PAGES.push("custodia");}
/* a backup made with a password: a copy kept, sealed with the sign-in (her choice, on by default) */
function wrapBackup(){var B=W.IngBackup;if(!B||B.__r408||typeof B.make!=="function")return;var o=B.make;B.make=function(opts){var pw=opts&&opts.password,r=o.apply(this,arguments);
    try{if(pw&&C().keepBackup!==false&&keysInHand())Promise.resolve(r).then(function(){return sealCopy("backup",String(pw));}).then(function(c){var v=C().v;v.backup.push({c:c,at:Date.now(),n:opts&&opts.seal?"the whole backup sealed":"its keys sealed"});if(v.backup.length>10)v.backup=v.backup.slice(-10);save();}).catch(function(){});}catch(e){}
    return r;};B.__r408=1;}
function wrapGo(){var og=W.go;if(typeof og!=="function"||og.__r408)return;var ng=function(p){var r=og.apply(this,arguments);try{if(p==="custodia"){install();refresh().then(function(){setTimeout(settle,60);});}else{SHEET=null;REVEAL=null;FORM=null;WORDS=null;}}catch(e){}return r;};
  try{Object.keys(og).forEach(function(k){ng[k]=og[k];});}catch(e){}ng.__r408=true;W.go=ng;try{go=ng;}catch(e){}}
function tick(){try{install();wrapGo();wrapBackup();}catch(e){}}
install();
(function w0(n){if(W.__ingReady===true&&W.state){tick();setInterval(tick,2000);return;}if(n<400)setTimeout(function(){w0(n+1);},500);})(0);
W.IngCustodia={open:function(k){try{W.go("custodia");}catch(e){}install();return refresh().then(function(){open(k||null,true);});},keys:function(){return model();},refresh:refresh,sheet:function(){sheetStart();},
  _cloudOpens:cloudOpens,_wordsOpen:wordsOpen,_ownerOpens:ownerOpens,store:function(){return JSON.parse(JSON.stringify(C()));}};
try{window.__ingParts["p408"]="running";}catch(_){}
})();
</script>
