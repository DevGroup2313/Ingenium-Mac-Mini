<style id="r147-css">
/* ============ R147 · HOME, REDESIGNED IN INGENIUM'S OWN LANGUAGE ============
   The owner's words (20 October 2026): "I want you to redesign the Home page for Ingenium, right now it looks super basic and
   does not match the other pages on Ingenium." And of The Offline Project: "This is how I wish for the Offline Project to be
   featured inside of Ingenium and the Forge": the master crest centred, and beneath it the line
   "Carpe Diem · The Forge · Ingenium · Inkwell".
   So Home speaks as Fabrica and Lector do: amethyst, slabs with soft depth, keys that stand out of the page in 3D (a light top
   face, a darker bottom edge, layered shadows) and lift on hover and sink when pressed, on the same spring. A head with the
   seal and a greeting; large keys into the main work; what the owner was last doing, one press away; the models and the
   engine in plain words; and a plaque for The Offline Project, framed as the owner's own pictures frame it. Everything the
   page did before is still here: the next step, the guided tour, the short guide, Focus with its step, the instruments,
   the device's numbers and the note on working offline. Nothing slow at start: the page shows at once and its lists fill
   in after; the crest is drawn when the plaque comes into view. */
#page-home.hx-on{max-width:none}
.hx{container:hx/inline-size;position:relative;display:flex;flex-direction:column;gap:18px;padding:2px 0 10px;
  --x-hi:#ffffff;--x-lo:#faf8fc;--x-a:#ffffff;--x-b:#f6f2fb;--x-sunk:rgba(34,26,46,.035);
  --x-ink1:#221a2e;--x-ink2:#4a4358;--x-ink3:#6c6579;--x-hair:rgba(34,26,46,.10);--x-hair2:rgba(34,26,46,.06);
  --x-acc:#6a3fb5;--x-accs:rgba(106,63,181,.10);--x-ring:rgba(106,63,181,.55);
  --x-gold:#b88a3a;--x-goldink:#7d5d22;--x-ok:#2f7a55;--x-oks:rgba(47,122,85,.11);--x-warn:#9a5a12;--x-warns:rgba(184,116,46,.12);
  --x-slab:inset 0 1px 0 rgba(255,255,255,.9),inset 0 -1px 0 rgba(40,22,68,.05),0 1px 0 rgba(40,22,68,.10),0 3px 0 rgba(40,22,68,.05),0 6px 12px rgba(40,22,68,.07),0 18px 36px rgba(40,22,68,.08);
  --x-key:inset 0 1px 0 rgba(255,255,255,.95),inset 0 -3px 0 rgba(40,22,68,.07),0 1px 0 rgba(40,22,68,.12),0 3px 0 rgba(40,22,68,.08),0 6px 10px rgba(40,22,68,.08),0 14px 26px rgba(40,22,68,.08);
  --x-keyhi:inset 0 1px 0 rgba(255,255,255,.95),inset 0 -3px 0 rgba(40,22,68,.07),0 1px 0 rgba(40,22,68,.12),0 5px 0 rgba(40,22,68,.08),0 10px 16px rgba(40,22,68,.10),0 24px 38px rgba(40,22,68,.11);
  --x-press:inset 0 2px 6px rgba(40,22,68,.17),inset 0 0 0 1px rgba(40,22,68,.04),0 1px 0 rgba(40,22,68,.10);
  --x-pill:inset 0 1px 0 rgba(255,255,255,.7),inset 0 -1.5px 0 rgba(40,20,70,.10),0 1px 0 rgba(40,20,70,.12),0 3px 4px rgba(40,20,70,.09),0 7px 10px rgba(40,20,70,.06);
  --x-pa:#7a50c6;--x-pb:#5d37a1;--x-pedge:#4b2a86;--x-pledge:#3a2070;
  --x-psh:inset 0 1px 0 rgba(255,255,255,.18),0 2px 0 var(--x-pledge),0 4px 6px rgba(40,22,68,.24),0 9px 16px rgba(40,22,68,.16);
  --x-pshhi:inset 0 1px 0 rgba(255,255,255,.2),0 3px 0 var(--x-pledge),0 7px 10px rgba(40,22,68,.26),0 14px 24px rgba(40,22,68,.18);
  --x-ppress:inset 0 2px 6px rgba(20,8,40,.45),0 1px 1px rgba(40,22,68,.2);
  --x-jewel:linear-gradient(150deg,#9068d6 0%,#6a3fb5 55%,#55309a 100%);
  --x-jsh:inset 0 1px 0 rgba(255,255,255,.38),inset 0 -2px 0 rgba(30,10,60,.28),0 2px 0 #3d2275,0 4px 8px rgba(40,22,68,.25),0 9px 16px rgba(40,22,68,.12);
  --x-spring:cubic-bezier(.34,1.35,.64,1);
  --x-serif:"Iowan Old Style","Palatino Linotype",Palatino,"Book Antiqua",Georgia,"Times New Roman",serif;
  --x-sans:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif;
  color:var(--x-ink1);font:14px/1.5 var(--x-sans)}
body[data-theme="night"] .hx{
  --x-hi:#211a2d;--x-lo:#1b1526;--x-a:#2a2239;--x-b:#231c31;--x-sunk:rgba(10,6,18,.32);
  --x-ink1:#f3eefb;--x-ink2:#d3c9e3;--x-ink3:#a99cc1;--x-hair:rgba(205,184,240,.12);--x-hair2:rgba(205,184,240,.07);
  --x-acc:#b79ce6;--x-accs:rgba(183,156,230,.14);--x-ring:rgba(183,156,230,.55);
  --x-gold:#d8b46a;--x-goldink:#e3c58a;--x-ok:#7fd1a6;--x-oks:rgba(127,209,166,.13);--x-warn:#e6b26a;--x-warns:rgba(230,178,106,.13);
  --x-slab:inset 0 1px 0 rgba(255,255,255,.06),inset 0 -1px 0 rgba(0,0,0,.35),0 1px 0 rgba(0,0,0,.6),0 3px 0 rgba(0,0,0,.28),0 6px 12px rgba(0,0,0,.35),0 18px 36px rgba(0,0,0,.4);
  --x-key:inset 0 1px 0 rgba(255,255,255,.09),inset 0 -3px 0 rgba(0,0,0,.42),0 1px 0 rgba(0,0,0,.7),0 3px 0 rgba(0,0,0,.45),0 6px 10px rgba(0,0,0,.42),0 14px 26px rgba(0,0,0,.36);
  --x-keyhi:inset 0 1px 0 rgba(255,255,255,.11),inset 0 -3px 0 rgba(0,0,0,.42),0 1px 0 rgba(0,0,0,.7),0 5px 0 rgba(0,0,0,.45),0 10px 16px rgba(0,0,0,.46),0 24px 38px rgba(0,0,0,.4);
  --x-press:inset 0 2px 7px rgba(0,0,0,.6),0 1px 1px rgba(0,0,0,.4);
  --x-pill:inset 0 1px 0 rgba(255,255,255,.09),inset 0 -1.5px 0 rgba(0,0,0,.4),0 1px 0 rgba(0,0,0,.5),0 3px 5px rgba(0,0,0,.4),0 8px 12px rgba(0,0,0,.3);
  --x-pa:#7d58cc;--x-pb:#5b3aa1;--x-pedge:#2c1956;--x-pledge:#170b30;
  --x-psh:inset 0 1px 0 rgba(255,255,255,.15),0 2px 0 var(--x-pledge),0 4px 6px rgba(0,0,0,.5),0 9px 16px rgba(0,0,0,.36);
  --x-pshhi:inset 0 1px 0 rgba(255,255,255,.17),0 3px 0 var(--x-pledge),0 7px 10px rgba(0,0,0,.52),0 14px 24px rgba(0,0,0,.4);
  --x-jewel:linear-gradient(150deg,#8d68d4 0%,#6a45b6 55%,#4e2d91 100%);
  --x-jsh:inset 0 1px 0 rgba(255,255,255,.3),inset 0 -2px 0 rgba(0,0,0,.35),0 2px 0 #1c0f38,0 4px 8px rgba(0,0,0,.5),0 9px 16px rgba(0,0,0,.3)}
.hx *{box-sizing:border-box}
.hx button{font:inherit;color:inherit;-webkit-tap-highlight-color:transparent}
.hx :focus-visible{outline:2.5px solid var(--x-ring);outline-offset:3px}
.hx-sr{position:absolute !important;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap;border:0}
/* ---- slabs ---- */
.hx-slab{position:relative;background:linear-gradient(var(--x-hi),var(--x-lo));border:1px solid var(--x-hair);border-radius:18px;box-shadow:var(--x-slab)}
.hx-sech{display:flex;align-items:baseline;gap:6px 14px;flex-wrap:wrap;margin:0 2px 12px}
.hx-sech h2{font:600 17px/1.2 var(--x-serif);letter-spacing:.06em;margin:0;color:var(--x-ink1)}
.hx-sech p{margin:0;color:var(--x-ink3);font-size:13px}
/* ---- the head ---- */
.hx-head{display:grid;grid-template-columns:auto minmax(0,1fr);gap:14px 20px;align-items:center;padding:20px 22px 20px;overflow:hidden}
.hx-head::before{content:"";position:absolute;inset:0;border-radius:inherit;pointer-events:none;
  background:radial-gradient(520px 260px at 0% 0%,rgba(106,63,181,.10),rgba(106,63,181,0) 70%),radial-gradient(420px 220px at 100% 100%,rgba(184,138,58,.08),rgba(184,138,58,0) 70%)}
body[data-theme="night"] .hx-head::before{background:radial-gradient(520px 260px at 0% 0%,rgba(183,156,230,.12),rgba(183,156,230,0) 70%),radial-gradient(420px 220px at 100% 100%,rgba(216,180,106,.07),rgba(216,180,106,0) 70%)}
.hx-seal{position:relative;width:76px;height:76px;display:grid;place-items:center}
.hx-seal .ing-crest{--W:76px !important}
.hx-htext{position:relative;min-width:0}
.hx-eyebrow{display:flex;align-items:center;gap:6px 12px;flex-wrap:wrap;margin:0 0 4px}
.hx #homeTitle{font:600 12px/1.2 var(--x-sans);letter-spacing:.28em;text-transform:uppercase;color:var(--x-acc);margin:0}
.hx-date{font:600 10.5px/1.2 var(--x-sans);letter-spacing:.22em;color:var(--x-gold)}
.hx-hello{font:600 clamp(24px,2.3vw,34px)/1.12 var(--x-serif);letter-spacing:.02em;margin:0;color:var(--x-ink1)}
.hx-lede{margin:6px 0 0;color:var(--x-ink2);font-size:14.5px;max-width:62ch}
.hx-next{position:relative;grid-column:1/-1;display:flex;flex-direction:column;gap:9px;padding:14px 15px;border-radius:14px;background:var(--x-sunk);border:1px solid var(--x-hair2);box-shadow:inset 0 1px 2.5px rgba(40,22,68,.06)}
.hx-next-h{font:700 10.5px/1.2 var(--x-sans);letter-spacing:.2em;text-transform:uppercase;color:var(--x-ink3)}
.hx #heroStepNote{display:block;color:var(--x-ink2);font-size:13px;line-height:1.45}
.hx-row{display:flex;flex-wrap:wrap;gap:8px}
@container hx (max-width:559px){.hx-head{padding:16px 15px;gap:12px 14px;align-items:start}.hx-seal{width:58px;height:58px;margin-top:2px}.hx-seal .ing-crest{--W:58px !important}
  .hx-hello{font-size:24px}.hx-lede{font-size:14px}.hx-next{padding:12px}}
@container hx (min-width:880px){.hx-head{grid-template-columns:auto minmax(0,1fr) minmax(300px,400px);padding:24px 26px}.hx-next{grid-column:auto}.hx-seal{width:92px;height:92px}.hx-seal .ing-crest{--W:92px !important}}
@container hx (min-width:1640px){.hx-head{grid-template-columns:auto minmax(0,1fr) minmax(360px,480px)}}
/* ---- keys: buttons that stand out of the page ---- */
.hx-btn{position:relative;display:inline-flex;align-items:center;justify-content:center;gap:7px;min-height:38px;padding:8px 15px;border-radius:11px;border:1px solid var(--x-hair);
  background:linear-gradient(var(--x-a),var(--x-b));color:var(--x-ink1);font-size:13.5px;font-weight:600;line-height:1.25;cursor:pointer;box-shadow:var(--x-pill);
  transition:transform .4s var(--x-spring),box-shadow .25s ease;text-align:center}
.hx-btn svg{width:16px;height:16px;flex:0 0 auto}
.hx-btn:hover{transform:translateY(-2px)}
.hx-btn:active{transform:translateY(1px) scale(.985);box-shadow:var(--x-press);transition-duration:.06s}
.hx-btn.pri{background:linear-gradient(var(--x-pa),var(--x-pb));border-color:var(--x-pedge);color:#fff;box-shadow:var(--x-psh);text-shadow:0 1px 1px rgba(30,10,60,.35)}
.hx-btn.pri:hover{box-shadow:var(--x-pshhi)}
.hx-btn.pri:active{box-shadow:var(--x-ppress)}
.hx-btn.wide{width:100%;min-height:44px;font-size:14.5px}
.hx-btn.quiet{border-color:transparent;background:transparent;box-shadow:none;color:var(--x-acc);min-height:30px;padding:4px 8px}
.hx-btn.quiet:hover{transform:none;text-decoration:underline}
.hx-btn[hidden]{display:none}
/* ---- the main work ---- */
.hx-main{container:hxm/inline-size;display:flex;flex-direction:column;gap:20px;min-width:0}
.hx-keys{display:grid;gap:14px;grid-template-columns:repeat(2,minmax(0,1fr))}
@container hxm (min-width:560px){.hx-keys{grid-template-columns:repeat(3,minmax(0,1fr));gap:16px}}
@container hxm (min-width:1500px){.hx-keys{grid-template-columns:repeat(6,minmax(0,1fr))}}
.hx-key{position:relative;display:flex;flex-direction:column;align-items:flex-start;gap:10px;min-height:150px;padding:16px 16px 15px;border-radius:18px;text-align:left;cursor:pointer;
  border:1px solid var(--x-hair);background:linear-gradient(175deg,var(--x-a),var(--x-b));box-shadow:var(--x-key);
  transition:transform .45s var(--x-spring),box-shadow .3s ease,border-color .25s;animation:hxRise .6s var(--x-spring) backwards}
.hx-key:nth-child(2){animation-delay:.04s}.hx-key:nth-child(3){animation-delay:.08s}.hx-key:nth-child(4){animation-delay:.12s}.hx-key:nth-child(5){animation-delay:.16s}.hx-key:nth-child(6){animation-delay:.2s}
.hx-key:hover{transform:translateY(-4px);box-shadow:var(--x-keyhi);border-color:var(--x-ring)}
.hx-key:active{transform:translateY(2px) scale(.99);box-shadow:var(--x-press);transition-duration:.07s}
.hx-jewel{display:grid;place-items:center;width:46px;height:46px;border-radius:14px;background:var(--x-jewel);color:#fff;box-shadow:var(--x-jsh);flex:0 0 auto;transition:transform .45s var(--x-spring)}
.hx-jewel svg{width:23px;height:23px;stroke-width:1.9}
.hx-key:hover .hx-jewel{transform:translateY(-1px) rotate(-4deg) scale(1.05)}
.hx-kt{display:flex;flex-direction:column;gap:3px;min-width:0;width:100%}
.hx-kh{font:600 18px/1.2 var(--x-serif);letter-spacing:.03em;color:var(--x-ink1)}
.hx-kd{color:var(--x-ink2);font-size:13px;line-height:1.42}
.hx-km{margin-top:auto;display:inline-flex;align-items:center;gap:6px;max-width:100%;font-size:11.5px;font-weight:650;color:var(--x-acc);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.hx-km:empty{display:none}
.hx-km::before{content:"";width:6px;height:6px;border-radius:50%;background:currentColor;opacity:.75;flex:0 0 auto}
.hx-arrow{position:absolute;top:16px;right:16px;color:var(--x-ink3);font-size:18px;line-height:1;transition:transform .4s var(--x-spring),color .2s}
.hx-key:hover .hx-arrow{transform:translateX(3px);color:var(--x-acc)}
@container hxm (min-width:1500px){.hx-key{min-height:196px;padding:22px 22px 20px;gap:14px;border-radius:20px}.hx-jewel{width:56px;height:56px;border-radius:16px}.hx-jewel svg{width:27px;height:27px}
  .hx-kh{font-size:21px}.hx-kd{font-size:14px}.hx-km{font-size:12.5px}.hx-arrow{top:22px;right:22px}
  .hx-app{padding:20px 10px 16px}.hx-app .hx-jewel{width:50px;height:50px;border-radius:14px}.hx-app .hx-jewel svg{width:24px;height:24px}.hx-an{font-size:16px}.hx-ad{font-size:12.5px}
  .hx-recent{padding:22px 22px 20px}.hx-item{min-height:58px}}
@container hxm (max-width:559px){.hx-key{min-height:0;padding:13px 12px 12px;gap:8px;border-radius:16px}.hx-jewel{width:38px;height:38px;border-radius:12px}.hx-jewel svg{width:20px;height:20px}
  .hx-kh{font-size:16px}.hx-kd{font-size:12.5px}.hx-arrow{top:13px;right:12px}}
/* ---- where the owner left off ---- */
.hx-recent{padding:18px 18px 16px}
.hx-rcols{display:grid;gap:14px;grid-template-columns:minmax(0,1fr)}
@container hxm (min-width:820px){.hx-rcols{grid-template-columns:repeat(3,minmax(0,1fr));gap:16px}}
.hx-rc{display:flex;flex-direction:column;min-width:0;border-radius:14px;background:var(--x-sunk);border:1px solid var(--x-hair2);padding:12px 10px 10px;box-shadow:inset 0 1px 2.5px rgba(40,22,68,.05)}
.hx-rch{display:flex;align-items:center;gap:8px;padding:0 4px 9px}
.hx-rch svg{width:17px;height:17px;color:var(--x-acc);flex:0 0 auto}
.hx-rch h3{font:600 14.5px/1.2 var(--x-serif);letter-spacing:.05em;margin:0;flex:1 1 auto;min-width:0}
.hx-rch .hx-btn.quiet{font-size:12.5px;padding:2px 6px;min-height:26px}
.hx-list{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:7px}
.hx-item{display:flex;align-items:center;gap:10px;width:100%;min-height:52px;padding:8px 10px;border-radius:12px;border:1px solid var(--x-hair);text-align:left;cursor:pointer;
  background:linear-gradient(var(--x-a),var(--x-b));box-shadow:var(--x-pill);transition:transform .4s var(--x-spring),box-shadow .25s ease,border-color .2s;animation:hxRise .5s var(--x-spring) backwards}
.hx-list li:nth-child(2) .hx-item{animation-delay:.04s}.hx-list li:nth-child(3) .hx-item{animation-delay:.08s}.hx-list li:nth-child(4) .hx-item{animation-delay:.12s}.hx-list li:nth-child(5) .hx-item{animation-delay:.16s}
.hx-item:hover{transform:translateY(-2px);border-color:var(--x-ring)}
.hx-item:active{transform:translateY(1px) scale(.99);box-shadow:var(--x-press);transition-duration:.06s}
.hx-ii{display:grid;place-items:center;width:34px;height:34px;flex:0 0 auto;border-radius:10px;color:var(--x-acc);background:var(--x-accs)}
.hx-ii svg{width:18px;height:18px}
.hx-ii.seal{background:none;border-radius:50%}
.hx-ii img{max-width:34px;max-height:34px;display:block}
.hx-ii .f-mark{font-size:16px;color:var(--x-acc)}
.hx-it{display:flex;flex-direction:column;min-width:0;flex:1 1 auto}
.hx-it{gap:0}.hx-it b{font-weight:650;font-size:13.5px;color:var(--x-ink1);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.hx-it small{font-size:12px;color:var(--x-ink3);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.hx-sub{display:flex;align-items:center;gap:7px;min-width:0;margin-top:2px}
.hx-sub small{flex:1 1 auto;min-width:0}
.hx-chip{flex:0 0 auto;max-width:100%;font-size:11px;font-weight:650;padding:2px 8px;border-radius:999px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;color:var(--x-acc);background:var(--x-accs);border:1px solid var(--x-hair2)}
.hx-chip.ok{color:var(--x-ok);background:var(--x-oks)}.hx-chip.warn{color:var(--x-warn);background:var(--x-warns)}.hx-chip.none{color:var(--x-ink3);background:transparent}
.hx-chev{color:var(--x-ink3);font-size:16px;flex:0 0 auto}
.hx-empty{display:flex;flex-direction:column;align-items:flex-start;gap:9px;padding:6px 6px 4px;color:var(--x-ink3);font-size:13px}
.hx-wait{height:52px;border-radius:12px;background:linear-gradient(90deg,var(--x-hair2),var(--x-sunk),var(--x-hair2));background-size:200% 100%;animation:hxShim 1.4s linear infinite}
/* ---- the apps ---- */
.hx-apps{display:grid;gap:12px;grid-template-columns:repeat(4,minmax(0,1fr))}
@container hxm (min-width:860px){.hx-apps{grid-template-columns:repeat(7,minmax(0,1fr));gap:14px}}
.hx-app{position:relative;display:flex;flex-direction:column;align-items:center;gap:8px;padding:14px 8px 12px;border-radius:16px;border:1px solid var(--x-hair);cursor:pointer;text-align:center;
  background:linear-gradient(175deg,var(--x-a),var(--x-b));box-shadow:var(--x-key);transition:transform .45s var(--x-spring),box-shadow .3s ease,border-color .25s;animation:hxRise .55s var(--x-spring) backwards}
.hx-app:hover{transform:translateY(-3px);box-shadow:var(--x-keyhi);border-color:var(--x-ring)}
.hx-app:active{transform:translateY(2px) scale(.985);box-shadow:var(--x-press);transition-duration:.07s}
.hx-app .hx-jewel{width:40px;height:40px;border-radius:12px;background:var(--c);background:linear-gradient(150deg,color-mix(in srgb,var(--c) 72%,#fff) 0%,var(--c) 60%,color-mix(in srgb,var(--c) 78%,#000) 100%);
  box-shadow:inset 0 1px 0 rgba(255,255,255,.35),inset 0 -2px 0 rgba(0,0,0,.2),0 2px 0 color-mix(in srgb,var(--c) 55%,#000),0 4px 8px rgba(40,22,68,.2)}
.hx-app .hx-jewel svg{width:20px;height:20px}
.hx-an{font:600 14.5px/1.15 var(--x-serif);letter-spacing:.03em;color:var(--x-ink1)}
.hx-ad{font-size:11.5px;line-height:1.3;color:var(--x-ink3)}
@container hxm (max-width:559px){.hx-apps{gap:9px}.hx-app{padding:11px 4px 10px;border-radius:14px}.hx-app .hx-jewel{width:34px;height:34px;border-radius:10px}.hx-an{font-size:12.5px}.hx-ad{display:none}}
/* ---- the side: the plaque, the models ---- */
.hx-cols{display:flex;flex-direction:column;gap:20px}
.hx-side{display:flex;flex-direction:column;gap:20px;min-width:0}
@container hx (min-width:900px){.hx-side{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);align-items:stretch}}
@container hx (min-width:1640px){.hx-cols{flex-direction:row;align-items:flex-start}.hx-main{flex:1 1 auto}.hx-side{display:flex;flex:0 0 clamp(400px,24%,660px)}}
/* The Offline Project, as the owner's own pictures show it: a warm plaque by day, the night sky by night, a fine double
   frame, the master crest in the middle, a small gold rule with a diamond, and the four names in italic beneath */
.hx-plaque{container:hxp/inline-size;position:relative;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:0;min-height:420px;padding:44px 22px 40px;border-radius:18px;overflow:hidden;text-align:center;
  background:radial-gradient(90% 70% at 50% 42%,#ebe7df 0%,#ddd7cc 48%,#c9c1b3 100%);border:1px solid rgba(110,92,60,.28);box-shadow:var(--x-slab);color:#6f5a34}
.hx-plaque::before,.hx-plaque::after{content:"";position:absolute;pointer-events:none;border-radius:10px}
.hx-plaque::before{inset:11px;border:1px solid rgba(120,100,66,.30)}
.hx-plaque::after{inset:16px;border:1px solid rgba(120,100,66,.16);border-radius:7px}
body[data-theme="night"] .hx-plaque{background:radial-gradient(90% 70% at 50% 42%,#1a2436 0%,#121a29 50%,#0b111c 100%);border-color:rgba(201,169,106,.22);color:#d4b878}
body[data-theme="night"] .hx-plaque::before{border-color:rgba(201,169,106,.26)}
body[data-theme="night"] .hx-plaque::after{border-color:rgba(201,169,106,.13)}
.hx-crest{position:relative;display:grid;place-items:center;min-height:calc(clamp(170px,52cqw,310px) * 1.3333)}
.hx-crest .ing-crest{--W:clamp(170px,52cqw,310px) !important}
.hx-crest img.ing-crest-img{width:clamp(170px,52cqw,310px)}
.hx-rule{display:flex;align-items:center;gap:10px;width:min(64%,190px);margin:26px auto 12px;color:currentColor;opacity:.75}
.hx-rule::before,.hx-rule::after{content:"";flex:1 1 auto;height:1px;background:currentColor;opacity:.55}
.hx-rule i{width:6px;height:6px;transform:rotate(45deg);background:currentColor;flex:0 0 auto}
.hx-line{margin:0;font:italic 500 clamp(16px,5.4cqw,25px)/1.3 "Home Cormorant","Lector Cormorant","Cormorant Garamond",Cormorant,var(--x-serif);letter-spacing:.025em;color:currentColor}
.hx-line span{white-space:nowrap}
/* the models and the engine, in plain words */
.hx-models{display:flex;flex-direction:column;gap:12px;padding:18px 18px 16px}
.hx-models .hx-sech{margin-bottom:2px}
.hx-facts{display:flex;flex-direction:column;gap:8px;margin:0}
.hx-fact{display:grid;grid-template-columns:auto minmax(0,1fr);gap:2px 11px;align-items:start;padding:10px 12px;border-radius:12px;background:var(--x-sunk);border:1px solid var(--x-hair2)}
.hx-dot{grid-row:1/3;width:10px;height:10px;margin-top:5px;border-radius:50%;background:var(--x-ink3);box-shadow:0 0 0 3px rgba(108,101,121,.14)}
.hx-dot.ok{background:#2fa36b;box-shadow:0 0 0 3px rgba(47,163,107,.16)}.hx-dot.warn{background:#c9822e;box-shadow:0 0 0 3px rgba(201,130,46,.16)}.hx-dot.acc{background:var(--x-acc);box-shadow:0 0 0 3px var(--x-accs)}
.hx-fact dt{font-size:11px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:var(--x-ink3);margin:0}
.hx-fact dd{margin:0;grid-column:2;min-width:0}
.hx-fact dd b{display:block;font-size:14px;font-weight:650;color:var(--x-ink1);overflow-wrap:anywhere}
.hx-fact dd span{display:block;font-size:12.5px;color:var(--x-ink2);line-height:1.42}
.hx-more{border-top:1px solid var(--x-hair2);padding-top:8px}
.hx-more summary{display:flex;align-items:center;gap:8px;cursor:pointer;list-style:none;padding:7px 4px;border-radius:9px;font-weight:650;font-size:13px;color:var(--x-ink1)}
.hx-more summary::-webkit-details-marker{display:none}
.hx-more summary::after{content:"▾";margin-left:auto;color:var(--x-ink3);transition:transform .3s var(--x-spring)}
.hx-more[open] summary::after{transform:rotate(180deg)}
.hx-more summary:hover{color:var(--x-acc)}
.hx-more-b{padding:4px 4px 6px;font-size:13px;color:var(--x-ink2)}
.hx-more-b p{margin:8px 0 0}
.hx #deviceReadout .kv{display:flex;justify-content:space-between;gap:12px;padding:6px 0;border-bottom:1px dashed var(--x-hair)}
.hx #deviceReadout .kv .k{color:var(--x-ink3)}.hx #deviceReadout .kv .v{color:var(--x-ink1);font-weight:600;text-align:right}
@keyframes hxRise{from{opacity:0;transform:translateY(10px) scale(.985)}to{opacity:1;transform:none}}
@keyframes hxShim{from{background-position:200% 0}to{background-position:0 0}}
@media (prefers-reduced-motion:reduce){.hx *,.hx *::before,.hx *::after{animation:none !important;transition-duration:.01ms !important}}
body[data-motion="minimal"] .hx *,body[data-motion="minimal"] .hx *::before,body[data-motion="minimal"] .hx *::after{animation:none !important;transition-duration:.01ms !important}
@media (forced-colors:active){.hx-key,.hx-app,.hx-item,.hx-btn,.hx-slab{border:1px solid CanvasText}}
</style>
<script>try{(window.__ingParts=window.__ingParts||{})["p68"]="started";}catch(_){}
/* R147 · Home, redesigned: see the note at the top of its styles */
(function(){"use strict";
var home=document.getElementById("page-home");if(!home||document.getElementById("hx"))return;
function $i(id){return document.getElementById(id);}
function mk(tag,cls,text){var e=document.createElement(tag);if(cls)e.className=cls;if(text!=null)e.textContent=text;return e;}
function S(){if(!state.v61||typeof state.v61!=="object")state.v61={};var h=state.v61.home;if(!h||typeof h!=="object")h=state.v61.home={};return h;}
function keep(){try{saveState();}catch(e){}}
function toast(t){try{ingToast(t);}catch(e){}}
function shown(){return home.classList.contains("active");}
/* the Cormorant italic the owner's pictures set the four names in (the face Lector's papers use, under the SIL Open Font
   Licence); filled in by the build, and registered only when the plaque is drawn */
var FONTS=window.LX7_FONTS||null; /* 6.1: Lector's fonts (r108), carried once in the page */

/* ---------- icons: the side column's own, so a key looks like the page it opens ---------- */
var SV='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">';
var OWN={
  chat:SV+'<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>',
  code:SV+'<path d="M8 6l-6 6 6 6"/><path d="M16 6l6 6-6 6"/></svg>',
  build:SV+'<rect x="3" y="4" width="18" height="16" rx="2.5"/><path d="M3 9h18"/><path d="M10 13l-2 2 2 2M14 13l2 2-2 2"/></svg>',
  fabrica:SV+'<circle cx="6" cy="5" r="2"/><circle cx="6" cy="19" r="2"/><circle cx="18" cy="7" r="2"/><path d="M6 7v10M18 9c0 5-7 4-11 8"/></svg>',
  lector:SV+'<path d="M3 5h6a3 3 0 0 1 3 3v12a2 2 0 0 0-2-2H3z"/><path d="M21 5h-6a3 3 0 0 0-3 3v12a2 2 0 0 1 2-2h7z"/></svg>',
  focus:SV+'<circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="4.5"/><circle cx="12" cy="12" r="1.2" fill="currentColor"/></svg>',
  models:SV+'<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/></svg>',
  guide:SV+'<path d="M6 3h9l4 4v14H6z"/><path d="M14 3v5h5"/></svg>',
  tour:SV+'<circle cx="12" cy="12" r="9"/><path d="M15.5 8.5l-2 5-5 2 2-5z"/></svg>',
  wall:SV+'<rect x="3" y="4" width="18" height="16" rx="2.5"/><circle cx="9" cy="10" r="1.8"/><path d="M21 16l-5-5-9 9"/></svg>',
  tabula:SV+'<path d="M4 4h16v16H4z"/><path d="M8 8h8M8 12h8M8 16h5"/></svg>',
  abacus:SV+'<circle cx="6" cy="7" r="1.6"/><circle cx="12" cy="9" r="1.6"/><circle cx="18" cy="7" r="1.6"/><path d="M3 12h18"/><circle cx="6" cy="17" r="1.6"/><circle cx="12" cy="15" r="1.6"/><circle cx="18" cy="17" r="1.6"/></svg>',
  slides:SV+'<rect x="3" y="4" width="18" height="12" rx="1.5"/><path d="M12 16v4M8 20h8"/></svg>',
  scriba:SV+'<rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3"/></svg>',
  fontes:SV+'<path d="M4 5h6a2 2 0 0 1 2 2v13a2 2 0 0 0-2-2H4z"/><path d="M20 5h-6a2 2 0 0 0-2 2v13a2 2 0 0 1 2-2h6z"/></svg>',
  schedae:SV+'<path d="M4 4h16v12l-4 4H4z"/><path d="M16 20v-4h4"/></svg>',
  clepsydra:SV+'<path d="M6 3h12M6 21h12M8 3c0 5 4 6 4 9s-4 4-4 9M16 3c0 5-4 6-4 9s4 4 4 9"/></svg>'};
function icon(k){try{var n=document.querySelector('.nav-btn[data-page="'+k+'"] svg');if(n){var c=n.cloneNode(true);c.setAttribute("aria-hidden","true");c.setAttribute("focusable","false");c.removeAttribute("width");c.removeAttribute("height");return c.outerHTML;}}catch(e){}
  return OWN[k]||OWN.chat;}

/* ---------- words ---------- */
function hello(){var h=new Date().getHours(),part=h<5?"Good evening":h<12?"Good morning":h<18?"Good afternoon":"Good evening",nm="";
  try{nm=(personaGet().name||"").trim();}catch(e){}
  if(!nm){try{nm=(typeof lxhAuthor==="function"?lxhAuthor():"")||"";}catch(e){}}
  nm=nm.split(/\s+/)[0]||"";return part+(nm?", "+nm:"");}
function latinDate(){try{var d=new Date();return romanNum(d.getDate())+" · "+MONTHS_LA[d.getMonth()]+" · "+romanNum(d.getFullYear());}catch(e){return "";}}
function when(t){if(!t)return "";var d=new Date(t),now=new Date(),y=new Date(now);y.setDate(y.getDate()-1);
  var hm=d.toLocaleTimeString("en-GB",{hour:"2-digit",minute:"2-digit"});
  if(d.toDateString()===now.toDateString())return "Today, "+hm;if(d.toDateString()===y.toDateString())return "Yesterday, "+hm;
  return d.toLocaleDateString("en-GB",{day:"numeric",month:"short"})+(d.getFullYear()!==now.getFullYear()?" "+d.getFullYear():"")+", "+hm;}
function plural(n,one,many){return n+" "+(n===1?one:(many||one+"s"));}

/* ---------- the page, built once: the elements other parts of Ingenium speak to keep their ids ---------- */
var KEYS=[
  {k:"chat",t:"Chat",d:"Talk with your model. Ask, write, and make documents and pages."},
  {k:"code",t:"Code",d:"Build an app with the model, and watch it run beside you."},
  {k:"build",t:"Build",d:"A page that runs as you type, ready to save as an app."},
  {k:"fabrica",t:"Fabrica",d:"Your apps, kept with every version, tested and shipped."},
  {k:"lector",t:"Lector",d:"Reads your apps and writes the documents you need from them."},
  {k:"focus",t:"Focus",d:"One step at a time, time you can see, calm when you need it.",id:"homeFocusQuick",line:"homeFocusLine"}];
var APPS=[
  {k:"tabula",t:"Tabula",d:"Writing",c:"#8a8172",go:"tabula"},{k:"abacus",t:"Abacus",d:"Tables",c:"#2d9a52",go:"abacus"},
  {k:"slides",t:"Imago",d:"Slides",c:"#b34a3c",go:"slides"},{k:"scriba",t:"Scriba",d:"Recordings",c:"#2f5f9e",go:"scriba"},
  {k:"fontes",t:"Fontes",d:"Sources",c:"#c9a14a",go:"fontes"},
  {k:"schedae",t:"Schedae",d:"Loose notes",c:"#6a3fb5",fn:"openSchedae"},{k:"clepsydra",t:"Clepsydra",d:"Short sprints",c:"#b88a3a",fn:"openClepsydra"}];
var R={};
function build(){
  /* what the old page held and others still use: taken across as they are, their handlers with them */
  var old={title:$i("homeTitle"),note:$i("heroStepNote"),next:$i("heroNext"),tour:$i("homeTour"),dev:$i("deviceReadout")};
  var tips=[].slice.call(home.querySelectorAll(".tip"));
  var offlineTip=tips.filter(function(t){return t.classList.contains("gold");})[0],devTip=tips.filter(function(t){return !t.classList.contains("gold");})[0];
  function tipText(t){if(!t)return "";var d=t.querySelector("div");return d?d.innerHTML:"";}
  var offHtml=tipText(offlineTip),devHtml=tipText(devTip);

  var root=mk("div","hx");root.id="hx";
  /* the head */
  var head=mk("header","hx-head hx-slab");head.setAttribute("aria-labelledby","hxHello");
  var seal=mk("div","hx-seal");seal.id="hxSeal";head.appendChild(seal);
  var ht=mk("div","hx-htext"),eb=mk("div","hx-eyebrow");
  var h1=old.title||mk("h1");h1.id="homeTitle";h1.className="";if(!h1.textContent)h1.textContent=(state.appName||"Ingenium");eb.appendChild(h1);
  var dt=mk("span","hx-date",latinDate());dt.id="hxDate";dt.setAttribute("aria-hidden","true");eb.appendChild(dt);ht.appendChild(eb);
  var hi=mk("p","hx-hello",hello());hi.id="hxHello";ht.appendChild(hi);
  ht.appendChild(mk("p","hx-lede","Your own room, on this device. Pick up where you left off, or start something new. Nothing here leaves this device."));
  head.appendChild(ht);
  var nx=mk("div","hx-next");nx.setAttribute("role","group");nx.setAttribute("aria-labelledby","hxNextH");
  var nh=mk("span","hx-next-h","Your next step");nh.id="hxNextH";nx.appendChild(nh);
  var note=old.note||mk("span");note.id="heroStepNote";note.className="";nx.appendChild(note);
  var next=old.next||mk("button");next.id="heroNext";next.type="button";next.className="hx-btn pri wide";if(!old.next)next.onclick=function(){go("models");};
  nx.appendChild(next);
  var row=mk("div","hx-row");
  var tour=old.tour||mk("button");tour.id="homeTour";tour.type="button";tour.className="hx-btn";tour.innerHTML=icon("tour")+'<span>Take the guided tour</span>';
  if(!old.tour)tour.onclick=function(){try{var t=state.tour||{};tourStart(t.done?0:(t.last||0));}catch(e){}};row.appendChild(tour);
  var guide=mk("button","hx-btn");guide.type="button";guide.innerHTML=icon("guide")+'<span>Read the short guide</span>';guide.onclick=function(){go("guide");};row.appendChild(guide);
  /* a key into the wallpapers, shown only once that part of Ingenium is here */
  var wall=mk("button","hx-btn");wall.type="button";wall.id="hxWall";wall.hidden=true;wall.innerHTML=icon("wall")+'<span>Wallpapers</span>';
  wall.setAttribute("aria-label","Wallpapers: choose the picture behind Ingenium");
  wall.onclick=function(){try{if(window.IngWallpapers&&typeof IngWallpapers.open==="function")IngWallpapers.open();else toast("Wallpapers are not part of this copy of Ingenium yet.");}catch(e){toast("The wallpapers could not be opened: "+(e&&e.message||e));}};
  row.appendChild(wall);nx.appendChild(row);head.appendChild(nx);root.appendChild(head);

  var cols=mk("div","hx-cols"),main=mk("div","hx-main"),side=mk("aside","hx-side");side.setAttribute("aria-label","The Offline Project, your models and this device");
  /* the main work: large keys */
  var ws=mk("section","hx-work");ws.setAttribute("aria-labelledby","hxWorkH");
  var wh=mk("div","hx-sech");var wh2=mk("h2",null,"The work");wh2.id="hxWorkH";wh.appendChild(wh2);wh.appendChild(mk("p",null,"Where you make things. Each one keeps what you did there."));ws.appendChild(wh);
  var keys=mk("div","hx-keys");
  KEYS.forEach(function(K){var b=mk("button","hx-key");b.type="button";b.setAttribute("data-go",K.k);if(K.id)b.id=K.id;
    var dId=K.line||("hxKd_"+K.k),mId="hxKm_"+K.k;
    b.innerHTML='<span class="hx-jewel">'+icon(K.k)+'</span><span class="hx-kt"><span class="hx-kh"></span><span class="hx-kd" id="'+dId+'"></span></span><span class="hx-km" id="'+mId+'"></span><span class="hx-arrow" aria-hidden="true">›</span>';
    b.querySelector(".hx-kh").textContent=K.t;b.querySelector(".hx-kd").textContent=K.d;
    b.setAttribute("aria-label","Open "+K.t);b.setAttribute("aria-describedby",dId+" "+mId);
    b.onclick=function(){go(K.k);};keys.appendChild(b);});
  ws.appendChild(keys);main.appendChild(ws);
  /* where the owner left off */
  var rs=mk("section","hx-recent hx-slab");rs.setAttribute("aria-labelledby","hxRecentH");
  var rh=mk("div","hx-sech");var rh2=mk("h2",null,"Where you left off");rh2.id="hxRecentH";rh.appendChild(rh2);rh.appendChild(mk("p",null,"Press one to go straight back to it."));rs.appendChild(rh);
  var rc=mk("div","hx-rcols");
  [["chats","chat","Conversations","chat","All conversations"],["fabrica","fabrica","In Fabrica","fabrica","Open Fabrica"],["lector","lector","From Lector","lector","Open Lector"]].forEach(function(c){
    var col=mk("div","hx-rc");col.setAttribute("role","group");col.setAttribute("aria-labelledby","hxRc_"+c[0]);
    var hh=mk("div","hx-rch");hh.innerHTML=icon(c[1]);var h3=mk("h3",null,c[2]);h3.id="hxRc_"+c[0];hh.appendChild(h3);
    var all=mk("button","hx-btn quiet","See all");all.type="button";all.setAttribute("aria-label",c[4]);all.onclick=function(){go(c[3]);};hh.appendChild(all);col.appendChild(hh);
    var ul=mk("ul","hx-list");ul.id="hxList_"+c[0];ul.setAttribute("aria-labelledby","hxRc_"+c[0]);ul.setAttribute("aria-busy","true");
    for(var i=0;i<3;i++){var li=mk("li");li.setAttribute("aria-hidden","true");li.appendChild(mk("div","hx-wait"));ul.appendChild(li);}
    col.appendChild(ul);rc.appendChild(col);});
  rs.appendChild(rc);main.appendChild(rs);
  /* the apps and the instruments */
  var as=mk("section","hx-appsec");as.setAttribute("aria-labelledby","hxAppsH");
  var ah=mk("div","hx-sech");var ah2=mk("h2",null,"Your apps");ah2.id="hxAppsH";ah.appendChild(ah2);ah.appendChild(mk("p",null,"Carpe Diem's own apps open on the Desk; the instruments open over this page."));as.appendChild(ah);
  var ag=mk("div","hx-apps");
  APPS.forEach(function(A,i){var b=mk("button","hx-app");b.type="button";b.setAttribute("data-app",A.k);b.style.setProperty("--c",A.c);b.style.animationDelay=(i*.035).toFixed(3)+"s";
    b.innerHTML='<span class="hx-jewel">'+icon(A.k)+'</span><span class="hx-an"></span><span class="hx-ad"></span>';
    b.querySelector(".hx-an").textContent=A.t;b.querySelector(".hx-ad").textContent=A.d;b.setAttribute("aria-label","Open "+A.t+": "+A.d);
    b.onclick=function(){if(A.go){go(A.go);return;}try{var f=window[A.fn];if(typeof f==="function")f();else toast(A.t+" is not part of this copy of Ingenium.");}catch(e){toast(A.t+" could not be opened: "+(e&&e.message||e));}};
    ag.appendChild(b);});
  as.appendChild(ag);main.appendChild(as);
  /* the plaque */
  var pl=mk("section","hx-plaque");pl.id="hxPlaque";pl.setAttribute("aria-labelledby","hxPlaqueH");
  var ph=mk("h2","hx-sr","The Offline Project");ph.id="hxPlaqueH";pl.appendChild(ph);
  var cr=mk("div","hx-crest");cr.id="hxCrest";pl.appendChild(cr);
  var ru=mk("div","hx-rule");ru.setAttribute("aria-hidden","true");ru.appendChild(mk("i"));pl.appendChild(ru);
  var ln=mk("p","hx-line");ln.id="hxLine";
  ["Carpe Diem","The Forge","Ingenium","Inkwell"].forEach(function(n,i){if(i)ln.appendChild(document.createTextNode(" · "));ln.appendChild(mk("span",null,n));});
  pl.appendChild(ln);side.appendChild(pl);
  /* the models and the engine */
  var ms=mk("section","hx-models hx-slab");ms.setAttribute("aria-labelledby","hxModelsH");
  var mh=mk("div","hx-sech");var mh2=mk("h2",null,"Models and engine");mh2.id="hxModelsH";mh.appendChild(mh2);ms.appendChild(mh);
  var dl=mk("dl","hx-facts");dl.id="hxFacts";ms.appendChild(dl);
  var mrow=mk("div","hx-row");var mb=mk("button","hx-btn");mb.type="button";mb.id="hxModelsKey";mb.innerHTML=icon("models")+'<span>Bring in a model</span>';mb.onclick=function(){go("models");};mrow.appendChild(mb);ms.appendChild(mrow);
  function more(id,label,fill){var d=mk("details","hx-more");d.id=id;var s=mk("summary",null,label);d.appendChild(s);var b=mk("div","hx-more-b");fill(b);d.appendChild(b);
    if(S()[id])d.open=true;d.addEventListener("toggle",function(){S()[id]=d.open;keep();if(d.open&&id==="hxDev"){try{renderDevice();}catch(e){}}});return d;}
  ms.appendChild(more("hxDev","This device, in numbers",function(b){var dv=old.dev||mk("div");dv.id="deviceReadout";b.appendChild(dv);if(devHtml){var p=mk("p");p.innerHTML=devHtml;b.appendChild(p);}}));
  if(offHtml)ms.appendChild(more("hxOff","How working offline works here",function(b){var p=mk("p");p.innerHTML=offHtml;p.style.marginTop="2px";b.appendChild(p);}));
  side.appendChild(ms);
  cols.appendChild(main);cols.appendChild(side);root.appendChild(cols);
  /* the old cards go once their parts are across; their folded tips with them */
  [].slice.call(home.children).forEach(function(c){if(c!==root)c.remove();});
  home.appendChild(root);home.classList.add("hx-on");
  R={root:root,hello:hi,date:dt,seal:seal,crest:cr,plaque:pl,facts:dl,modelsKey:mb,wall:wall};}

/* ---------- the seals: drawn after the page shows; the crest when the plaque comes into view ---------- */
var fontDone=false;
function font(){if(fontDone)return;fontDone=true;try{var u=FONTS&&FONTS["cormorant-500-italic"];if(!u)return;var st=mk("style");st.id="r147-font";
  st.textContent='@font-face{font-family:"Home Cormorant";font-style:italic;font-weight:500;font-display:swap;src:url('+u+') format("woff2")}';document.head.appendChild(st);}catch(e){}}
function drawSeal(){if(!R.seal||R.seal.firstChild||!window.IngSeal)return;try{var e=IngSeal.el(["ingenium"],{live:true,size:92,alt:"The seal of Ingenium"});if(e)R.seal.appendChild(e);}catch(e){}}
function drawCrest(){if(!R.crest||R.crest.firstChild)return;font();
  try{var e=window.IngSeal?IngSeal.el(["cd","forge","ingenium","inkwell"],{night:"auto",live:true,size:300}):null;
    if(e){R.crest.appendChild(e);return;}}catch(x){}
  /* without the seals part: the master seal's own picture, if this copy has it */
  try{var s=window.ING_SEALS&&ING_SEALS.master;if(s&&s.b64){var im=new Image();im.className="ing-crest-img";im.alt="The master seal of The Offline Project";im.src="data:image/png;base64,"+s.b64;R.crest.appendChild(im);}}catch(x){}}
function watchPlaque(){if(!R.plaque)return;
  /* drawn as soon as it nears the window, or, at the latest, once the page has settled after start */
  function later(){var idle=window.requestIdleCallback||function(f){return setTimeout(f,1);};setTimeout(function(){idle(drawCrest,{timeout:1500});},1800);}
  if(document.readyState==="complete")later();else window.addEventListener("load",later);
  if(!("IntersectionObserver" in window))return;
  var io=new IntersectionObserver(function(es){es.forEach(function(en){if(en.isIntersecting){io.disconnect();drawCrest();}});},{rootMargin:"300px"});io.observe(R.plaque);}

/* ---------- what the owner was last doing ---------- */
function list(id){return $i("hxList_"+id);}
function item(ic,title,sub,chip,tone,onPress,label){var li=mk("li"),b=mk("button","hx-item");b.type="button";
  var i=mk("span","hx-ii");if(typeof ic==="string")i.innerHTML=ic;else if(ic){i.className="hx-ii seal";i.appendChild(ic);}i.setAttribute("aria-hidden","true");b.appendChild(i);
  /* the name, then a line with the step or kind first (it never shrinks) and when after it, then any further line */
  var t=mk("span","hx-it"),subs=[].concat(sub||[]);t.appendChild(mk("b",null,title));
  if(chip||subs[0]){var l1=mk("span","hx-sub");if(chip)l1.appendChild(mk("span","hx-chip"+(tone?" "+tone:""),chip));if(subs[0])l1.appendChild(mk("small",null,subs[0]));t.appendChild(l1);}
  subs.slice(1).forEach(function(x){if(x)t.appendChild(mk("small",null,x));});b.appendChild(t);
  b.appendChild(mk("span","hx-chev","›")).setAttribute("aria-hidden","true");
  b.setAttribute("aria-label",label||[title,chip].concat(subs).filter(Boolean).join(", "));b.onclick=onPress;li.appendChild(b);return li;}
function empty(ul,words,key,to){ul.innerHTML="";var li=mk("li","hx-empty");li.appendChild(mk("span",null,words));
  var b=mk("button","hx-btn",key);b.type="button";b.onclick=function(){go(to);};li.appendChild(b);ul.appendChild(li);}
function done(ul){ul.setAttribute("aria-busy","false");}

function chatWhen(c){try{if(typeof ccWhen==="function")return ccWhen(c)||0;}catch(e){}var t=0;(c.messages||[]).forEach(function(x){var a=x.done||x.at||0;if(a>t)t=a;});return t;}
function realChats(){return (state.chats||[]).filter(function(c){return c&&(c.messages||[]).some(function(m){return m&&(m.role==="me"||m.role==="bot")&&(m.text||m.content);});});}
function openChat(c){var code=c.kind==="code";try{var cs=typeof ccState==="function"?ccState():(state.cc=state.cc||{});if(code)cs.activeCode=c.id;else cs.activeChat=c.id;}catch(e){}
  state.activeChat=c.id;keep();go(code?"code":"chat");}
function fillChats(){var ul=list("chats");if(!ul)return;var all=realChats(),cs=all.map(function(c){return {c:c,t:chatWhen(c)};}).sort(function(a,b){return b.t-a.t;}).slice(0,5);
  ul.innerHTML="";
  if(!cs.length)empty(ul,"No conversations yet. Your first one starts with a single message.","Start a conversation","chat");
  cs.forEach(function(x){var c=x.c,code=c.kind==="code",n=(c.messages||[]).filter(function(m){return m&&(m.role==="me"||m.role==="bot");}).length,pr=null;
    if(code){try{pr=c.projectId&&typeof projById==="function"?projById(c.projectId):null;}catch(e){}}
    var title="";try{title=chatTitle(c);}catch(e){title=c.title||"A conversation";}
    var sub=[when(x.t),plural(n,"message")].filter(Boolean).join(" · ");
    ul.appendChild(item(icon(code?"code":"chat"),title,sub,code?(pr&&pr.name?"Code · "+pr.name:"Code"):"","",function(){openChat(c);},
      (code?"Code session: ":"Conversation: ")+title+(pr&&pr.name?", on "+pr.name:"")+(x.t?", "+when(x.t):"")));});
  done(ul);
  var chats=all.filter(function(c){return c.kind!=="code";}),codes=all.filter(function(c){return c.kind==="code";});
  function last(a){var t=0;a.forEach(function(c){var w=chatWhen(c);if(w>t)t=w;});return t?" · last "+lower(when(t)):"";}
  meta("chat",chats.length?plural(chats.length,"conversation")+last(chats):"Nothing yet: say hello");
  meta("code",codes.length?plural(codes.length,"session")+last(codes):"No session yet");}
function lower(s){return s?s.charAt(0).toLowerCase()+s.slice(1):"";}

/* Fabrica: each app with the step it is at, in Fabrica's own words */
var FAPPS={cd:"Carpe Diem",forge:"The Forge",ingenium:"Ingenium",inkwell:"Inkwell"};
function repoState(r,st,n){if(!r.head)return ["Started · nothing kept yet","none"];
  if(st&&!st.clean){var k=(st.changes||[]).length;return [plural(k,"change")+" to keep",""];}
  var t=n&&n.test,tested=!!(t&&t.ok&&(t.checks||[]).some(function(c){return c.id==="reads"&&c.state==="ok";}));
  if(!tested)return t&&!t.ok?["Kept · its test found faults","warn"]:["Kept · to test",""];
  if(!(n.onePage||n.webApp||n.kits||n.apk||n.ipa))return ["Tested · ready to ship","ok"];
  return ["Shipped","ok"];}
function openRepo(id){try{var f=window.fbHubHost&&typeof fbHubHost.FBS==="function"?fbHubHost.FBS():(state.fabrica=state.fabrica||{});f.sel=id;keep();}catch(e){}
  go("fabrica");
  /* on a narrow screen Fabrica opens on Your apps; the owner chose an app here, so it moves to that app's work, as choosing one there does */
  setTimeout(function(){try{if(window.fbHubHost&&fbHubHost.one&&fbHubHost.one())fbHubHost.setPanel("work");}catch(e){}},420);}
var fabTurn=0;
function fillFabrica(){var ul=list("fabrica");if(!ul)return Promise.resolve();var my=++fabTurn;
  if(!window.IngRepo||typeof IngRepo.list!=="function"){ul.innerHTML="";empty(ul,"Fabrica is not part of this copy of Ingenium.","Open Fabrica","fabrica");done(ul);return Promise.resolve();}
  return IngRepo.list().then(function(rs){var top=rs.slice(0,5);
    return Promise.all(top.map(function(r){return Promise.all([
        IngRepo.status(r.id).catch(function(){return null;}),
        r.head?IngRepo.notes(r.id,r.head).catch(function(){return {};}):Promise.resolve({})]).then(function(x){return {r:r,st:x[0],n:x[1]||{}};});}))
      .then(function(items){if(my!==fabTurn)return;ul.innerHTML="";
        if(!items.length)empty(ul,"No apps in Fabrica yet. Start one, or bring one in.","Open Fabrica","fabrica");
        var ready=0,todo=0;
        items.forEach(function(x){var r=x.r,s=repoState(r,x.st,x.n),k=r.app&&FAPPS[r.app]?r.app:null,ic=null;
          if(s[1]==="ok")ready++;else todo++;
          if(k&&window.IngSeal){try{ic=IngSeal.el([k],{size:34,alt:""});}catch(e){ic=null;}}
          if(!ic)ic=icon("fabrica");
          var sub=[r.changed?when(r.changed):"",r.branch&&!/^(main|master)$/.test(r.branch)?"on "+r.branch:""].filter(Boolean).join(" · ");
          ul.appendChild(item(ic,r.name||"An app",sub,s[0],s[1],function(){openRepo(r.id);},"Fabrica app: "+(r.name||"an app")+", "+s[0]+(r.changed?", changed "+lower(when(r.changed)):"")));});
        done(ul);
        meta("fabrica",rs.length?plural(rs.length,"app")+(ready?" · "+ready+" ready":"")+(todo?" · "+todo+" in progress":""):"No app yet");});})
  .catch(function(e){if(my!==fabTurn)return;ul.innerHTML="";empty(ul,"Fabrica's apps could not be read just now: "+(e&&e.message||e)+".","Open Fabrica","fabrica");done(ul);meta("fabrica","");});}

/* Lector: the documents written for each set of apps, newest first */
var LNAMES={cd:"Carpe Diem",forge:"The Forge",ingenium:"Ingenium",inkwell:"Inkwell"},LORDER=["cd","forge","ingenium","inkwell"];
function setName(a){a=LORDER.filter(function(k){return (a||[]).indexOf(k)>=0;});var n=a.map(function(k){return LNAMES[k];});
  if(a.length===4)return "The Offline Project";if(n.length<2)return n[0]||"Your apps";return n.slice(0,-1).join(", ")+" and "+n[n.length-1];}
function docLabel(kind,a,p){var all=(a||[]).filter(function(k){return LNAMES[k];}).length===4;
  return {dossier:all?"Master project dossier":"Project dossier",appendix:all?"Master appendix":"Appendix",portfolio:"Portfolio piece",
    cover:p==="programme"?"Cover letter for the programme":"Cover letter",cv:"CV entry",analysis:"Notes and analysis"}[kind]||"A document";}
function forWords(p){return p==="job"?"for a job":p==="programme"?"for a programme":"for your portfolio";}
function lectorDocs(){var L=null;try{L=IngLector.state();}catch(e){return [];}var out=[];
  Object.keys(L.sets||{}).forEach(function(key){var s=L.sets[key];if(!s||!s.docs)return;
    Object.keys(s.docs).forEach(function(kind){var d=s.docs[kind];if(d&&d.ref)out.push({key:key,set:s,kind:kind,made:d.made||0});});});
  return out.sort(function(a,b){return b.made-a.made;});}
function openDoc(x){var L,R7;try{L=IngLector.state();R7=IngLector.R7;}catch(e){go("lector");return;}
  var j=L.job;
  if(R7&&R7.running){go("lector");toast("Lector is reading just now. Your document is kept, and opens here once the reading is done.");return;}
  if(j&&j.key!==x.key){if(j.status==="done")L.job=null;
    else{go("lector");toast("Lector has a reading paused. Your document is kept; it opens here once that reading is finished or started again.");return;}}
  L.brief.apps=(x.set.apps||[]).slice();L.brief.purpose=x.set.purpose||"portfolio";R7.doc=x.kind;keep();
  go("lector");try{IngLector.render();}catch(e){}
  try{if(document.querySelector("#lx7.l-one"))IngLector.setPanel("doc");}catch(e){}}
function fillLector(){var ul=list("lector");if(!ul)return;var ds=lectorDocs();ul.innerHTML="";
  if(!ds.length)empty(ul,"No documents yet. Lector writes them once it has read your apps.","Open Lector","lector");
  ds.slice(0,5).forEach(function(x){var a=x.set.apps||[],ic=null;
    if(window.IngSeal){try{ic=IngSeal.el(a,{size:a.length>=2?40:34,alt:""});}catch(e){ic=null;}}
    if(!ic)ic=icon("lector");
    var title=docLabel(x.kind,a,x.set.purpose),name=setName(a),sub=[x.made?when(x.made):"",forWords(x.set.purpose)].filter(Boolean).join(" · ");
    ul.appendChild(item(ic,title,[name,sub],"","",function(){openDoc(x);},"Lector document: "+title+", "+name+", "+forWords(x.set.purpose)+(x.made?", written "+lower(when(x.made)):"")));});
  done(ul);
  meta("lector",ds.length?plural(ds.length,"document")+" · last "+lower(when(ds[0].made)):"No document yet");}

function meta(k,t){var m=$i("hxKm_"+k);if(m)m.textContent=t||"";}

/* ---------- the models and the engine, in plain words ---------- */
function fact(dl,label,value,words,tone){var w=mk("div","hx-fact"),d=mk("span","hx-dot"+(tone?" "+tone:""));d.setAttribute("aria-hidden","true");w.appendChild(d);
  w.appendChild(mk("dt",null,label));var dd=mk("dd");dd.appendChild(mk("b",null,value));if(words)dd.appendChild(mk("span",null,words));w.appendChild(dd);dl.appendChild(w);}
function paintModels(){var dl=R.facts;if(!dl)return;dl.innerHTML="";
  var ms=(state.models||[]),act=ms.filter(function(m){return m.id===state.activeModelId;})[0],st="";try{st=Engine.status;}catch(e){}
  var loaded=(st==="ready"||st==="busy")?ms.filter(function(m){try{return m.id===Engine.modelId;}catch(e){return false;}})[0]:null,m=loaded||act||ms[0];
  if(!ms.length)fact(dl,"Your model","None yet","A model is the part that writes the answers. Bring one in once and it stays on this device.","warn");
  else{var how=st==="busy"&&loaded?"Writing an answer now":st==="ready"&&loaded?"Loaded and ready to answer":st==="loading"?"Loading into the engine now":st==="error"?"The engine stopped with an error. The Models page says why.":"Chosen, and not loaded yet. It loads from Chat's Controls or the Models page.";
    fact(dl,"Your model",(m&&m.customName)||"A model",how+" · "+plural(ms.length,"model")+" kept",loaded?"ok":st==="error"?"warn":"acc");}
  var eb=window.engineBundleInfo||{},ni=null;try{ni=(typeof INB!=="undefined"&&INB)?(window.nativeInfo||{}):null;}catch(e){ni=null;}
  if(ni)fact(dl,"The engine","Inside this app"+(ni.engineShort?" · "+ni.engineShort:""),"It runs the model here, on this device"+(ni.gpu?", with the graphics chip helping":"")+".","ok");
  else if(eb.present)fact(dl,"The engine",(eb.embedded?"Built into this copy":"Kept in this browser")+(eb.bytes?" · "+fmtB(eb.bytes):""),"It runs the model here, on this device, with no connection.","ok");
  else fact(dl,"The engine","Not added yet","One drop on the Models page, once. After that it runs here.","warn");
  var cl=state.cloud||{},on=!!(cl.on&&cl.provider);
  fact(dl,"Connection",on?"Set up, and used only when you choose it":"None",on?"Chat's Controls say which one answers: this device, or the connection.":"Nothing you write leaves this device.",on?"acc":"ok");
  var mk2=R.modelsKey&&R.modelsKey.querySelector("span");if(mk2)mk2.textContent=ms.length?"Your models":"Bring in a model";
  if(R.modelsKey)R.modelsKey.setAttribute("aria-label",ms.length?"Open the Models page":"Bring in a model on the Models page");}
function fmtB(n){try{return fmtBytes(n);}catch(e){return Math.round(n/1048576)+" MB";}}

/* ---------- painting: the frame at once, the lists after it shows ---------- */
function paintHead(){if(R.hello)R.hello.textContent=hello();if(R.date)R.date.textContent=latinDate();
  if(R.wall){var has=!!(window.IngWallpapers&&typeof IngWallpapers.open==="function");R.wall.hidden=!has;}}
var soon=0;
function fillAll(){try{fillChats();}catch(e){console.error("R147 chats",e);}try{fillLector();}catch(e){console.error("R147 lector",e);}
  try{fillFabrica();}catch(e){console.error("R147 fabrica",e);}try{paintModels();}catch(e){console.error("R147 models",e);}}
function fillSoon(){clearTimeout(soon);soon=setTimeout(function(){var idle=window.requestIdleCallback||function(f){return setTimeout(f,1);};
  idle(function(){fillAll();drawSeal();},{timeout:700});},60);}
function onShow(){paintHead();fillSoon();try{if(S().hxDev)renderDevice();}catch(e){}}

var t0=(window.performance&&performance.now)?performance.now():0,buildMs=0;
try{build();buildMs=t0?Math.round((performance.now()-t0)*10)/10:0;}catch(e){try{console.error("R147: Home could not be redrawn; the page as it was is kept",e);}catch(_){}return;}
paintHead();
watchPlaque();
/* Home is the first page: its lists fill once the window has painted, never before */
if(document.readyState==="complete")fillSoon();else window.addEventListener("load",function(){fillSoon();});
try{var og=go;go=function(p){var r=og.apply(this,arguments);try{if(p==="home"||PAGES.indexOf(p)<0&&shown())onShow();}catch(e){}return r;};window.go=go;}catch(e){}
try{Engine.on("status",function(){if(shown())paintModels();});}catch(e){}
/* the wallpapers part may come later than this one: its key shows once it is there */
setTimeout(paintHead,1500);setTimeout(paintHead,6000);
window.IngHome={refresh:onShow,fill:fillAll,state:S,drawCrest:drawCrest,buildMs:buildMs};
})();
;try{window.__ingParts["p68"]="running";}catch(_){}
</script>
