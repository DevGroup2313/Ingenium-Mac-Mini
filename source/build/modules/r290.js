<style id="r290-css">
/* ============ R290 · THE HEADS OF THE CAREER STUDIO AND LECTOR, AS BLEND, MODELS, FOLDERS AND HOME ARE MADE (Ingenium 6.93, 12 November 2026) ============
   Her words (12 November 2026): "I want to redesign the Focus, Lector page and the Career Studio to match the rest of the app and overall
   enhance their designs but I do like their 3 panel views so I want that preserved please"; on the drafts: "I want regal and elevated to
   match these pages ... refined, elevated and elegant while being 3D ... theme related without being on the nose ... like they are
   built-in", and "I want them to match the app, please redo them"; on the previews: "I like and approve of all of the previews, please
   commit and push them everywhere"; and after 6.92: "push my approved design of the Career Studio and the Lector (the designs from this
   chat) but I want the little balls inside of the Career Studio's compass that contains the roman numerals to look more refined and match
   the compass and its metal and deepened visuals. I want the balls to just be flat and there with no animation, please use the Models
   catridges as reference"; of Lector's seal: "I don't want pressing the engine button on the Lector page to do anything. I just want to
   use it as a fidget button on the page for my amusement, I like the clicking and the animation that goes with it matching that of the
   one from the Home page", and "redraw the seal as a wax seal pressed into the paper, in the ribbon's violet and the paper's texture,
   while keeping the clicks and flourishes you like from Home."
   So each page opens on a head made as Blend's is made (modules/r262.js), measured from it: 470 pixels tall on Blend's desk, the words at
   its left (Blend's eyebrow, a title in Home's Cormorant at 48 pixels, two of Blend's raised keys, a line of help, an italic hint at its
   foot), the page's own object at its right on Blend's stage (the same perspective and sway, held still out of sight); the panels below
   kept as they were (the Career Studio's two, Lector's three), drawn as Blend's panels and as tall as the window.
   - the Career Studio: the dial. Blend's frosted plate (its renderer, copied here) with the seal's star engraved as its rose; a turned
     bezel drawn with Blend's light; the counsellor's stages set into the bezel as the dial's hub is set (Blend's setting, mvSetting: a
     polished lip of the bezel's own metal round a well of violet enamel, its shadow falling on the bezel), drawn once and still, each with
     its numeral in pearl (her words on the lenses tried first: "still look ugly and not good enough ... fake and pasted on the page");
     the path walked inlaid in violet in the groove; an index cut as one point of the seal's star; the seal in Blend's collar at the hub,
     turning as Home's engine turns. The bezel turns with a spring to bring the stage in hand under the index; each lens turns back as it
     rides, so its numeral stays upright; pressing one opens that stage.
   - Lector: the fan she approved (her words, 12 November 2026: "you've massively regressed it from my approved design", with her
     pictures of it): the documents of the reading as sheets of grained paper standing on their own leaves, each with its tab, its
     initial, its title, a few lines and its numeral, the one shown in front with its ribbon, the others fanned behind; it sways as one
     piece (the sheets at their own depths slide past one another) and leans toward the pointer; at its foot, Ingenium's own seal key
     (R104's layers, R175's flourishes, its sound): it sways, leans, lifts, sinks, knocks, ripples and plays Home's flourishes, and does
     nothing else.
   Every key lifts, sinks and sounds (r176); left alone, nothing is drawn again; Minimal motion and the system's reduced motion still
   every movement. Focus's head is its own module (r291). The heads drawn in another session (r284, r286 to r289, on its own branch)
   are not these. */
#page-career.sk-on,#page-lector.sk-on,#page-focus.sk-on,#page-fabrica.sk-on{--sk-ink1:#221a2e;--sk-ink2:#4a4358;--sk-ink3:#6c6579;--sk-hair:rgba(34,26,46,.10);--sk-hair2:rgba(34,26,46,.06);--sk-acc:#6a3fb5;
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
body[data-theme="night"] #page-career.sk-on,body[data-theme="night"] #page-lector.sk-on,body[data-theme="night"] #page-focus.sk-on,body[data-theme="night"] #page-fabrica.sk-on{--sk-ink1:#f3eefb;--sk-ink2:#d3c9e3;--sk-ink3:#a99cc1;--sk-hair:rgba(205,184,240,.12);--sk-hair2:rgba(205,184,240,.07);--sk-acc:#b79ce6;
  --sk-hi:#211a2d;--sk-lo:#1b1526;--sk-keyA:#2a2239;--sk-keyB:#231c31;--sk-pedge:#170b30;
  --sk-slab:inset 0 1px 0 rgba(255,255,255,.06),inset 0 -1px 0 rgba(0,0,0,.35),0 1px 0 rgba(0,0,0,.6),0 3px 0 rgba(0,0,0,.28),0 6px 12px rgba(0,0,0,.35),0 18px 36px rgba(0,0,0,.4);
  --sk-key:inset 0 1px 0 rgba(255,255,255,.07),inset 0 -2px 0 rgba(0,0,0,.45),0 2px 0 rgba(0,0,0,.75),0 4px 5px rgba(0,0,0,.5),0 9px 14px rgba(0,0,0,.36);
  --sk-keyhi:inset 0 1px 0 rgba(255,255,255,.07),inset 0 -2px 0 rgba(0,0,0,.45),0 3px 0 rgba(0,0,0,.75),0 6px 8px rgba(0,0,0,.52),0 13px 20px rgba(0,0,0,.38);
  --sk-press:inset 0 2px 6px rgba(0,0,0,.6),0 1px 1px rgba(0,0,0,.4);
  --sk-desk:radial-gradient(ellipse 75% 85% at 72% 42%,#241a37 0%,#171025 52%,#0d0916 100%);--sk-ring:rgba(205,184,240,.10);--sk-line:rgba(196,176,238,.30);
  --sk-edge0:#120d20;--sk-edge1:#0c0816;--sk-under:rgba(0,0,0,.6);--sk-under2:rgba(0,0,0,.36);--sk-under3:rgba(0,0,0,.1);
  --sk-paper:#2a2238;--sk-paper2:#221b2f;--sk-rule:rgba(205,184,240,.08);--sk-tab:#2f2640;--sk-paperink:#ece4f8;
  --sk-band0:#6f5d9c;--sk-band1:#4f3d7f;--sk-band2:#8d6ad6;--sk-stem0:#5a4c80;--sk-stem1:#221a39;--sk-bez-ink:rgba(10,4,26,.55);--sk-pearl:#e4d9f8;--sk-frame:rgba(205,184,240,.14);--sk-txt:rgba(236,228,248,.09)}
/* ---------- the hero: Blend's desk, words and keys ---------- */
.skh{position:relative;height:470px;margin:0 0 8px;border-radius:30px;overflow:hidden;isolation:isolate;background:var(--sk-desk);color:var(--sk-ink1);
  box-shadow:inset 0 0 0 1px var(--sk-ring),0 1px 1px rgba(40,22,68,.04),0 4px 6px rgba(40,22,68,.04),0 14px 28px rgba(40,22,68,.07),0 34px 60px rgba(40,22,68,.08)}
body[data-theme="night"] .skh{box-shadow:inset 0 0 0 1px var(--sk-ring),0 14px 28px rgba(0,0,0,.45),0 34px 60px rgba(0,0,0,.4)}
.skh-words{position:absolute;left:40px;top:34px;z-index:5;width:470px}
.skh-eyebrow{display:flex;gap:14px;font:600 11.5px/1 var(--sans,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif);letter-spacing:.28em;text-transform:uppercase;color:var(--sk-ink3)}
.skh-eyebrow b{color:var(--sk-acc);font-weight:600}
.skh-title{margin:12px 0 10px;padding:0;border:0;font:600 48px/1.04 var(--sk-serif);letter-spacing:.004em;color:var(--sk-ink1)}
.skh-lede{margin:0 0 16px;font-size:14px;line-height:1.55;color:var(--sk-ink2)}
.skh-keys{display:flex;gap:10px;flex-wrap:wrap;align-items:center}
.skh-k{position:relative;display:inline-flex;align-items:center;justify-content:center;gap:8px;min-height:36px;padding:8px 16px;border-radius:12px;border:1px solid var(--sk-hair);
  background:linear-gradient(var(--sk-keyA),var(--sk-keyB));color:var(--sk-ink1);font:600 13px/1.2 var(--sans,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif);cursor:pointer;box-shadow:var(--sk-key);
  transition:transform .16s cubic-bezier(.34,1.35,.64,1),box-shadow .16s ease;-webkit-tap-highlight-color:transparent}
.skh-k svg{width:16px;height:16px;flex:0 0 auto}
.skh-k:hover{transform:translateY(-2px);box-shadow:var(--sk-keyhi)}
.skh-k:active{transform:translateY(1px);box-shadow:var(--sk-press);transition-duration:.06s}
.skh-k.pri{background:linear-gradient(var(--sk-pa),var(--sk-pb));border-color:transparent;color:#fff;box-shadow:inset 0 1px 0 rgba(255,255,255,.16),0 2px 0 var(--sk-pedge),0 4px 6px rgba(40,22,68,.24),0 9px 16px rgba(40,22,68,.16)}
.skh-k:focus-visible{outline:2.5px solid var(--sk-acc);outline-offset:3px}
.skh-keys .c-who{display:inline-flex;align-items:center;gap:8px;margin:0}
.skh-keys .c-who span{font:600 11px/1 var(--sans,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif);letter-spacing:.2em;text-transform:uppercase;color:var(--sk-ink3)}
.skh-says{margin:12px 0 0;max-width:460px;font-size:12.5px;line-height:1.5;color:var(--sk-ink3)}
.skh-hint{position:absolute;left:40px;bottom:24px;z-index:6;max-width:470px;margin:0;font:italic 500 16px/1.4 var(--sk-serif);color:var(--sk-ink3)}
.skh-hint b{font-style:normal;font-weight:600;color:var(--sk-ink1)}
.skh-obj{position:absolute;right:36px;top:22px;width:520px;height:424px;z-index:3;-webkit-user-select:none;user-select:none}
.skh-stage{position:absolute;inset:0;perspective:1100px;perspective-origin:50% 48%}
.skh-sway{position:absolute;inset:0;transform-style:preserve-3d;animation:skhSway 11s ease-in-out infinite;transition:transform .6s cubic-bezier(.2,.8,.2,1)}
@keyframes skhSway{0%,100%{transform:rotateY(-9deg) rotateX(3.5deg)}50%{transform:rotateY(9deg) rotateX(-3.5deg)}}
.skh.is-away .skh-sway{animation:none}
.skh-label{position:absolute;z-index:7;transform:translate(-50%,-50%);text-align:center;white-space:nowrap;pointer-events:none;transition:opacity .3s ease}
.skh-label.at-r{transform:translate(0,-50%);text-align:left}.skh-label.at-l{transform:translate(-100%,-50%);text-align:right}
.skh-label.at-t{transform:translate(-50%,-100%)}.skh-label.at-b{transform:translate(-50%,0)}
.skh-label b{display:block;font:600 15px/1.1 var(--sk-serif);letter-spacing:.03em;color:var(--sk-ink1)}
.skh-label small{display:block;margin-top:2px;font-size:10.5px;font-weight:600;line-height:1.2;color:var(--sk-acc)}
.skh-label small:empty{display:none}
.skh-label.ghost b{font:italic 500 14px/1.1 var(--sk-serif);color:var(--sk-ink3)}
.skh.is-hold .skh-label:not(.near){opacity:.45}
/* ---------- the step cards under the hero: Blend's ---------- */
.sks{display:flex;justify-content:center;gap:16px;margin:0 0 14px;padding:6px 0 2px;flex-wrap:wrap}
.sks-step{position:relative;width:176px;min-height:60px;display:grid;grid-template-columns:auto minmax(0,1fr);align-items:center;column-gap:10px;row-gap:1px;margin:0;padding:10px 14px;
  border:1px solid var(--sk-hair);border-radius:16px;background:linear-gradient(var(--sk-keyA),var(--sk-keyB));box-shadow:var(--sk-key);color:var(--sk-ink1);cursor:pointer;text-align:left;
  font:inherit;transition:transform .3s cubic-bezier(.34,1.35,.64,1),box-shadow .2s ease;-webkit-tap-highlight-color:transparent}
.sks-step:hover{transform:translateY(-3px);box-shadow:var(--sk-keyhi)}
.sks-step:active{transform:translateY(1px);box-shadow:var(--sk-press);transition-duration:.06s}
.sks-step .n{grid-row:1 / span 2;min-width:32px;text-align:center;font:600 24px/1 var(--sk-serif);color:var(--sk-acc)}
.sks-step b{grid-column:2;font:600 16px/1.1 var(--sk-serif);letter-spacing:.03em;color:inherit}
.sks-step small{grid-column:2;font-size:11px;line-height:1.3;color:var(--sk-ink3)}
.sks-step[aria-current="step"],.sks-step[aria-current="step"]:hover{background:linear-gradient(var(--sk-pa),var(--sk-pb));border-color:transparent;color:#fff;transform:translateY(-3px);
  box-shadow:inset 0 1px 0 rgba(255,255,255,.16),0 2px 0 var(--sk-pedge),0 4px 6px rgba(40,22,68,.24),0 9px 16px rgba(40,22,68,.16)}
.sks-step[aria-current="step"] .n{color:#fff}.sks-step[aria-current="step"] small{color:rgba(255,255,255,.82)}
.sks-step .tick{position:absolute;right:-7px;top:-7px;width:22px;height:22px;border-radius:50%;background:#a78be3 url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 12 12'%3E%3Cpath d='M3 6.2l2 2 4-4.4' fill='none' stroke='white' stroke-width='1.6' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E") center/62% no-repeat;
  box-shadow:0 0 0 2px var(--sk-hi),0 2px 4px rgba(40,22,68,.25)}
.sks-step:focus{outline:none}.sks-step:focus-visible{outline:2.5px solid var(--sk-acc);outline-offset:3px}
/* ---------- the panels below: Blend's, as tall as the window ---------- */
#page-career.sk-on #cs{height:calc(100vh - 74px) !important;min-height:560px}
#page-lector.sk-on #lx7{height:calc(100vh - 74px) !important;min-height:560px}
#page-career.sk-on #cs .c-head{min-height:0;justify-content:center}
#page-career.sk-on #cs .c-head > div:first-child{display:none}
#page-career.sk-on #cs .c-head .rm-tabs{margin:0 auto;justify-content:center;flex-wrap:wrap}
#page-lector.sk-on #lx7 .l-head{display:none}
#page-career.sk-on #cs .c-pn,#page-lector.sk-on #lx7 .l-pn{border-radius:22px;background:linear-gradient(var(--sk-hi),var(--sk-lo));border:1px solid var(--sk-hair);box-shadow:var(--sk-slab)}
#page-career.sk-on #cs .c-pn-h,#page-lector.sk-on #lx7 .l-pn-h{background:transparent;box-shadow:none;border-bottom:1px solid var(--sk-hair2);min-height:56px;padding:12px 18px 10px}
#page-career.sk-on #cs .c-pn-h h2,#page-lector.sk-on #lx7 .l-pn-h h2{font:600 22px/1.15 var(--sk-serif);letter-spacing:.02em;color:var(--sk-ink1)}
#page-career.sk-on #cs .c-pn-f,#page-lector.sk-on #lx7 .l-pn-f{background:transparent;border-top:1px solid var(--sk-hair2)}
#page-career.sk-on #cs .c-item b,#page-career.sk-on #cs .c-opp b,#page-career.sk-on #cs .c-entry b{font:600 17px/1.25 var(--sk-serif);letter-spacing:.01em}
#page-career.sk-on #cs .cn-lede h3,#page-career.sk-on #cs .c-today-step,#page-career.sk-on #cs .c-empty h3{font:600 25px/1.2 var(--sk-serif)}
/* ---------- Home's orbs (modules/r261.js, as refined in 6.92), for the stages, the pivot and the hour: the same planet, the same rim,
   light, bevel, pearl and breath, so an orb here is an orb on Home ---------- */
.sko{--S:72px;position:absolute;inset:0;display:block;perspective:calc(var(--S) * 4);pointer-events:none;--rx:0deg;--ry:0deg;--cdl:0px;--cds:1;
  --c0:#e2d6f7;--c1:#b49be6;--c2:#9478d2;--c3:#7656c2;--c4:#55399a;--csh:#2e1765;--ct1:.18;--ct2:.36;--ce1:.08;--ce2:.22;
  --cr0:#efe8fb;--cr1:#a891d4;--cr2:#55309a;--crop:.95}
.sko.is-next{--c0:#c9b6ee;--c1:#9068d6;--c2:#6a3fb5;--c3:#55309a;--c4:#3d2275;--csh:#2a1260;--ct1:.2;--ct2:.4;--ce1:.1;--ce2:.26}
.sko.is-done{--c0:#d9cbf5;--c1:#a98be6;--c2:#8462cf;--c3:#6a4bb8;--c4:#4b3290;--csh:#2e1765}
.sko.focus{--c0:#d4bff3;--c1:#9a6be0;--c2:#5c31a4;--c3:#3f1f7c;--c4:#250f4b;--csh:#1d0b3c}
body[data-theme="night"] .sko{--c0:#9a87c6;--c1:#6a559a;--c2:#4a3878;--c3:#33265a;--c4:#1e1538;--csh:#0b0220;--ct1:.32;--ct2:.6;--ce1:.2;--ce2:.42;--cr0:#e2d5fa;--cr1:#9a7ad8;--cr2:#472b7f;--crop:.7}
body[data-theme="night"] .sko.is-next{--c0:#c3a3f4;--c1:#9a6be0;--c2:#6a3fb5;--c3:#4a2890;--c4:#2a1260}
body[data-theme="night"] .sko.is-done{--c0:#b9a2e6;--c1:#8466c6;--c2:#62489e;--c3:#45317a;--c4:#2b1d52}
body[data-theme="night"] .sko.focus{--c0:#c3a3f4;--c1:#9a6be0;--c2:#5c31a4;--c3:#3a1c74;--c4:#1d0b3c}
.sko-tilt{position:absolute;inset:0;display:block;transform-style:preserve-3d;transform:rotateX(var(--rx)) rotateY(var(--ry)) translateY(var(--cdl)) scale(var(--cds));transition:transform .35s cubic-bezier(.2,.8,.2,1)}
.sko-idle{position:absolute;inset:0;display:block;transform-style:preserve-3d;animation:skoSway 7s ease-in-out infinite;animation-delay:var(--od,0s)}
@keyframes skoSway{0%,100%{transform:rotateY(-18deg) rotateX(5deg)}50%{transform:rotateY(18deg) rotateX(-5deg)}}
.sko-cast{position:absolute;left:27%;right:27%;bottom:11%;height:8%;border-radius:50%;display:block;background:rgba(42,20,80,.14);filter:blur(calc(var(--S) * .045));
  transform:translateZ(calc(var(--S) * -.12));transition:opacity .35s ease,transform .35s ease}
body[data-theme="night"] .sko-cast{background:rgba(0,0,0,.36)}
.sko-ball,.sko-mark{position:absolute;left:0;top:0;width:200%;height:200%;display:block;transform-origin:0 0;pointer-events:none;
  transform:translate(calc(var(--S) * .5),calc(var(--S) * .5)) translateZ(calc(var(--S) * var(--fz))) scale(var(--fk)) translate(calc(var(--S) * -.5),calc(var(--S) * -.5)) scale(.5)}
.sko-ball{--fz:0;--fk:1}
.sko-mark{--fz:.14;--fk:.965;transform-style:preserve-3d}
.sko-ball > svg{display:block;width:100%;height:100%;overflow:visible;
  filter:drop-shadow(calc(var(--S) * .004) calc(var(--S) * .012) calc(var(--S) * .006) rgba(42,20,80,.24)) drop-shadow(calc(var(--S) * .01) calc(var(--S) * .03) calc(var(--S) * .025) rgba(42,20,80,.12))}
body[data-theme="night"] .sko-ball > svg{filter:drop-shadow(calc(var(--S) * .004) calc(var(--S) * .012) calc(var(--S) * .008) rgba(0,0,0,.5)) drop-shadow(calc(var(--S) * .01) calc(var(--S) * .03) calc(var(--S) * .03) rgba(0,0,0,.3))}
.sko-ball .oxs-sheen{transform:translate(var(--hx,0px),var(--hy,0px));transition:transform .35s cubic-bezier(.2,.8,.2,1)}
.sko-ico{position:absolute;left:50%;top:50%;width:30%;height:30%;margin:-15% 0 0 -15%;display:block;color:#fff;filter:drop-shadow(0 calc(var(--S) * .006) calc(var(--S) * .006) rgba(42,20,80,.24));
  animation:skoLift 7s ease-in-out infinite;animation-delay:var(--od,0s)}
body[data-theme="night"] .sko-ico{filter:drop-shadow(0 calc(var(--S) * .006) calc(var(--S) * .008) rgba(0,0,0,.42))}
.sko-ico.n{width:40%;height:40%;margin:-20% 0 0 -20%}
.sko-ico svg{display:block;width:100%;height:100%;overflow:visible}
.sko-ico .num{font:600 16px/1 var(--sk-serif);letter-spacing:.03em;fill:url(#oxPearl)}
body[data-theme="night"] .sko-ico .num{fill:url(#oxPearlN)}
.sko-ico .gl{fill:none;stroke:url(#oxPearl);stroke-width:1.9;stroke-linecap:round;stroke-linejoin:round}
body[data-theme="night"] .sko-ico .gl{stroke:url(#oxPearlN)}
.sko-ico .glf{fill:url(#oxPearl)}body[data-theme="night"] .sko-ico .glf{fill:url(#oxPearlN)}
@keyframes skoLift{0%,50%,100%{transform:translateZ(0)}25%,75%{transform:translateZ(calc(var(--S) * .07))}}
.sko.hover{--cdl:calc(var(--S) * -.025)}
.sko.hover .sko-idle,.sko.hover .sko-ico{animation-play-state:paused}
.sko.hover .sko-cast{opacity:.75;transform:translateZ(calc(var(--S) * -.12)) scale(.92)}
.sko.down{--cdl:calc(var(--S) * .05);--cds:.96}
.sko.down .sko-tilt{transition-duration:.08s}
.sko.down .sko-cast{opacity:1;transform:translateZ(calc(var(--S) * -.12)) scale(1.04)}
.skh.is-away .sko-idle,.skh.is-away .sko-ico{animation-play-state:paused}
.sko .ok{position:absolute;right:23%;top:20%;width:15px;height:15px;border-radius:50%;transform:translateZ(calc(var(--S) * .2));
  background:#8f6fd8 url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 12 12'%3E%3Cpath d='M3 6.2l2 2 4-4.4' fill='none' stroke='white' stroke-width='1.7' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E") center/66% no-repeat;
  box-shadow:0 0 0 1.5px var(--sk-hi),0 1px 3px rgba(40,22,68,.3)}
/* ---------- the dial (the Career Studio): Blend's plate, a turned bezel that carries the stages and turns, an index cut as one point of the
   seal's star, and the seal at the heart turning as Home's engine turns ---------- */
.skc{position:absolute;inset:0;transform-style:preserve-3d}
.skc-under{position:absolute;left:66px;top:62px;width:388px;height:368px;border-radius:50%;transform:translateZ(-26px);pointer-events:none;
  background:radial-gradient(closest-side,var(--sk-under),var(--sk-under2) 55%,var(--sk-under3) 82%,rgba(0,0,0,0))}
.skc-plate{position:absolute;left:90px;top:44px;width:340px;height:340px;transform-style:preserve-3d;pointer-events:none}
.skc-plate i{position:absolute;inset:0;border-radius:50%;background:var(--sk-edge1);transform:translateZ(calc(var(--z) * -1px))}
.skc-plate i:nth-child(3){background:var(--sk-edge0)}
.skc img{-webkit-user-drag:none;pointer-events:none}
.skc-plate img,.skc-eng svg,.skc-bezel img,.skc-collarbox img{position:absolute;inset:0;width:100%;height:100%;display:block}
.skc-eng{position:absolute;left:90px;top:44px;width:340px;height:340px;transform:translateZ(.6px);pointer-events:none}
.skc-eng .r{fill:none;stroke:var(--sk-line);stroke-width:.8}.skc-eng .rd{fill:none;stroke:var(--sk-line);stroke-width:.9;stroke-dasharray:1 3.2;stroke-linecap:round}
.skc-eng .t{stroke:var(--sk-line);stroke-width:.8}.skc-eng .T{stroke:var(--sk-line);stroke-width:1.2}
.skc-eng .pl{fill:var(--sk-acc);fill-opacity:.07}.skc-eng .pd{fill:var(--sk-acc);fill-opacity:.15}.skc-eng .po{fill:none;stroke:var(--sk-line);stroke-width:.7}
/* the bezel: its sides (as Blend's plate has its edge), then its turned top, drawn once with Blend's light */
.skc-bside{position:absolute;left:108px;top:62px;width:304px;height:304px;border-radius:50%;box-sizing:border-box;border:52px solid var(--sk-edge1);pointer-events:none;transform:translateZ(calc(var(--z) * 1px))}
.skc-bside.b2{border-color:var(--sk-edge0)}
.skc-bezel{position:absolute;left:98px;top:52px;width:324px;height:324px;transform:translateZ(8px);pointer-events:none}
/* what turns: the scale on the bezel, the path inlaid in its groove, and the stages */
.skc-dial{position:absolute;left:108px;top:62px;width:304px;height:304px;transform-style:preserve-3d;transform-origin:152px 152px;transform:translateZ(8.4px) rotate(var(--t0,0deg));
  transition:transform 1.15s cubic-bezier(.3,1.32,.5,1)}
.skc-dsvg{position:absolute;inset:0;width:100%;height:100%;display:block;overflow:visible;pointer-events:none}
.skc-dsvg .t{stroke:var(--sk-bez-ink);stroke-width:.85}.skc-dsvg .T{stroke:var(--sk-bez-ink);stroke-width:1.3}
.skc-dsvg .sep{fill:var(--sk-bez-ink)}
.skc-dsvg .inl{fill:none;stroke-width:4.4;stroke-linecap:round;stroke:url(#skcInlay)}
.skc-dsvg .inh{fill:none;stroke-width:.9;stroke-linecap:round;stroke:#fff;stroke-opacity:.55}
body[data-theme="night"] .skc-dsvg .inh{stroke-opacity:.3}
.skc-slot{position:absolute;width:72px;height:72px;transform-style:preserve-3d;transform:translateZ(13px);pointer-events:none}
.skc-up{position:absolute;inset:0;transform-style:preserve-3d;transform:rotate(var(--u0,0deg));transition:transform 1.15s cubic-bezier(.3,1.32,.5,1)}
/* the stages: lenses set in the bezel, made as the Models turret makes its own, drawn crisp; each sits in a clean cut in the bezel's metal
   (a fine edge, no soft halo), flat and still; the numeral in pearl on the glass; a stage done carries a small violet mark */
.skc-cart{position:absolute;left:10px;top:10px;width:52px;height:52px;margin:0;padding:0;border:0;border-radius:50%;background:none;cursor:pointer;pointer-events:auto;
  -webkit-tap-highlight-color:transparent;transition:none;box-shadow:0 0 0 1.25px rgba(40,20,80,.32),0 .75px .5px 1.25px rgba(40,20,80,.16)}
body[data-theme="night"] .skc-cart{box-shadow:0 0 0 1.25px rgba(0,0,0,.62),0 .75px .5px 1.25px rgba(0,0,0,.35)}
.skc-cart canvas{position:absolute;left:0;top:0;width:52px;height:52px;display:block;border-radius:50%}
.skc-cart svg.nm{position:absolute;left:0;top:0;width:52px;height:52px;overflow:visible;pointer-events:none}
.skc-cart .nm text{font:600 15.5px/1 var(--sk-serif);letter-spacing:.05em;fill:#fbf8ff;fill:url(#skcPearl)}
.skc-cart .nm .sh{fill:rgba(16,6,38,.5)}
.skc-cart .ok{position:absolute;right:-1px;top:-1px;width:13px;height:13px;border-radius:50%;
  background:#6a3fb5 url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 12 12'%3E%3Cpath d='M3 6.2l2 2 4-4.4' fill='none' stroke='white' stroke-width='1.8' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E") center/70% no-repeat;
  box-shadow:0 0 0 1.25px #fff}
body[data-theme="night"] .skc-cart .ok{background-color:#8a63d8;box-shadow:0 0 0 1.25px #2a2140}
.skc-cart:hover,.skc-cart:active{transform:none}
.skc-cart:focus{outline:none}.skc-cart:focus-visible{box-shadow:0 0 0 2.5px var(--sk-acc),0 0 0 5px var(--sk-hi)}
.skc-face{position:absolute;left:160px;top:114px;width:200px;height:200px;transform:translateZ(.3px);pointer-events:none;display:none}
/* the instrument: the case, its side, the bow; the face and the rose */
.skc-plate{display:none}
.skc-face{position:absolute;left:160px;top:114px;width:200px;height:200px;transform:translateZ(.3px);pointer-events:none;display:block}
.skc-face img{width:100%;height:100%;display:block}
.skc-eng{left:160px;top:114px;width:200px;height:200px;transform:translateZ(.6px)}
.skc-case{position:absolute;left:64px;top:18px;width:392px;height:392px;transform:translateZ(12px);pointer-events:none}
.skc-case img{position:absolute;inset:0;width:100%;height:100%;display:block}
.skc-cside{position:absolute;left:88px;top:42px;width:344px;height:344px;border-radius:50%;pointer-events:none;transform:translateZ(calc(var(--z) * 1px));
  background:linear-gradient(160deg,#f3f0f8 0%,#bdb5d2 30%,#6f6690 60%,#3d3558 100%);
  -webkit-mask:radial-gradient(closest-side,transparent 87.3%,#000 88.3%);mask:radial-gradient(closest-side,transparent 87.3%,#000 88.3%)}
body[data-theme="night"] .skc-cside{background:linear-gradient(160deg,#cfc6e6 0%,#857aa8 30%,#463d66 60%,#211a36 100%)}
.skc-bow{position:absolute;left:230px;top:-14px;width:60px;height:66px;transform:translateZ(12px);pointer-events:none;filter:drop-shadow(1px 2px 1.5px rgba(30,14,60,.35))}
.skc-bow svg{width:100%;height:100%;display:block;overflow:visible}
.skc-index{transform:translateZ(34px)}
.skc-collarbox{left:210px;top:164px;width:100px;height:100px}
.skc-seat{left:224px;top:178px;width:72px;height:72px}
.skc-seat .hx-seal{width:72px;height:72px}
.skc-seat .isl{--S:72px !important}
.skc-index .lit{fill:#f4f1fa}.skc-index .shd{fill:#9d93bb}
body[data-theme="night"] .skc-index .lit{fill:#e9e4f4}body[data-theme="night"] .skc-index .shd{fill:#8a80aa}
.skc-dsvg .t{stroke:rgba(36,22,70,.55)}.skc-dsvg .T{stroke:rgba(36,22,70,.7)}.skc-dsvg .sep{fill:rgba(36,22,70,.55)}
body[data-theme="night"] .skc-dsvg .t,body[data-theme="night"] .skc-dsvg .T{stroke:rgba(12,6,28,.75)}

.skc-face img{width:100%;height:100%;display:block}
.skc.v-b .skc-face{display:block}
.skc.v-b .skc-eng{--sk-line:rgba(236,226,255,.42);--sk-acc:#efe6ff}
.skc.v-b .skc-eng .pl{fill-opacity:.12}.skc.v-b .skc-eng .pd{fill-opacity:.22}
/* the index: one point of the seal's star, lit and shaded as the seal's star is, its pearl where the seal keeps its heart */
.skc-index{position:absolute;left:246px;top:24px;width:28px;height:44px;transform:translateZ(30px);transform-origin:14px 44px;pointer-events:none}
.skc-index svg{display:block;width:100%;height:100%;overflow:visible;filter:drop-shadow(0 1px .5px rgba(42,20,80,.3)) drop-shadow(0 3px 4px rgba(42,20,80,.18))}
body[data-theme="night"] .skc-index svg{filter:drop-shadow(0 1px .5px rgba(0,0,0,.6)) drop-shadow(0 3px 4px rgba(0,0,0,.4))}
.skc-index .lit{fill:#9275d8}.skc-index .shd{fill:#7853c3}.skc-index .ped{fill:var(--sk-edge0)}
body[data-theme="night"] .skc-index .lit{fill:#a68ce6}body[data-theme="night"] .skc-index .shd{fill:#8360cf}
.skc-index.tick{animation:skcTick .5s cubic-bezier(.3,1.6,.5,1)}
@keyframes skcTick{0%{transform:translateZ(30px) translateY(0)}35%{transform:translateZ(30px) translateY(-3px) rotate(-3deg)}100%{transform:translateZ(30px)}}
.skc-collarbox{position:absolute;left:204px;top:158px;width:112px;height:112px;transform:translateZ(10px);pointer-events:none}
.skc-seat{position:absolute;left:220px;top:174px;width:80px;height:80px;transform:translateZ(18px);transform-style:preserve-3d}
.skc-seat .hx-seal{position:absolute;inset:0;width:80px;height:80px;margin:0}
.skc-seat .r175-seal{position:absolute;inset:0;width:100%;height:100%;min-width:0;min-height:0;margin:0;padding:0;border:0;border-radius:50%;background:transparent;box-shadow:none;cursor:pointer;display:grid;place-items:center}
.skc-seat .r175-seal:focus-visible{outline:2.5px solid var(--sk-acc);outline-offset:4px}
.skc-seat .r175-fx{display:block;width:100%;height:100%;pointer-events:none}
.skc-seat .isl{--S:80px !important}
.skc-seat .isl .isl-ring{--fz:.08;--fk:.98}.skc-seat .isl .isl-star{--fz:.17;--fk:.9575}.skc-seat .isl .isl-heart{--fz:.3;--fk:.925}
.skc-seat .isl .isl-cast,.skc-seat .isl .isl-edge,.skc-seat .isl .isl-back{display:none !important}
.skc-seat .seal-spin{animation:skcEngine 9s linear infinite}
body[data-motion="calm"] .skc-seat .seal-spin{animation-duration:13s}
@keyframes skcEngine{from{transform:rotate(0deg)}to{transform:rotate(-360deg)}}
.skc-seat .r175-glow,.skc-seat .r175-ripple{position:absolute;border-radius:50%;pointer-events:none;opacity:0}
.skc-seat .r175-glow{inset:-16%;background:radial-gradient(closest-side,rgba(106,63,181,.34),rgba(106,63,181,0))}
.skc-seat .r175-ripple{inset:3%;border:2px solid var(--sk-acc)}
.skh.is-away .skc-seat .seal-spin{animation-play-state:paused}
body[data-motion="minimal"] .skc-dial,body[data-motion="minimal"] .skc-up{transition:none}
body[data-motion="minimal"] .skc-seat .seal-spin,body[data-motion="minimal"] .skc-index.tick{animation:none}
@media (prefers-reduced-motion:reduce){.skc-dial,.skc-up{transition:none}.skc-seat .seal-spin,.skc-index.tick{animation:none}}
/* ---------- the documents (Lector): the fan she approved on 12 November 2026 (drawn in another session from her pictures, modules/r287.js
   on its branch), its sheets, leaves, paper, tabs, initials, ribbon and seal as they were; here it stands in this head, sways as one
   piece and leans toward the pointer, and its seal is Ingenium's own seal key (Home's), to press for fun ---------- */
#page-lector .lf{position:absolute;left:0;top:-16px;width:520px;height:460px;perspective:1000px;perspective-origin:262px 200px;transform:scale(.86);transform-origin:262px 250px}
#page-lector .lf-cast{position:absolute;left:96px;top:372px;width:330px;height:84px;border-radius:50%;background:radial-gradient(closest-side,rgba(42,20,80,.20),rgba(42,20,80,.07) 60%,rgba(42,20,80,0));pointer-events:none}
body[data-theme="night"] #page-lector .lf-cast{background:radial-gradient(closest-side,rgba(0,0,0,.55),rgba(0,0,0,.2) 60%,rgba(0,0,0,0))}
#page-lector .lf-tilt,#page-lector .lf-sway{position:absolute;left:0;top:0;width:520px;height:460px;transform-style:preserve-3d;transform-origin:262px 250px}
/* it leans toward the pointer as Home's orbs do (the same quick, soft settling) and sways as one piece, as the Career Studio's dial and
   Blend's plate sway, never halting: the sheets stand at their own depths, so they slide past one another as it turns */
#page-lector .lf-tilt{transform:rotateX(var(--lf-rx,0deg)) rotateY(var(--lf-ry,0deg));transition:transform .45s cubic-bezier(.2,.8,.2,1)}
#page-lector .lf-sway{animation:lfSway 7s ease-in-out infinite}
/* 6.96: the documents and their seal sway as one piece, on the clock and the curve of Home's engine button (R104's islSway, 7 seconds),
   gentler, as a stack of paper would; the seal no longer sways on its own on the paper (her words, 13 November 2026: "right now they
   just pasted in together but not really connected or in unison") */
@keyframes lfSway{0%,100%{transform:rotateY(-7deg) rotateX(2.2deg)}50%{transform:rotateY(7deg) rotateX(-2.2deg)}}
#page-lector .lf-stamp{position:absolute;left:0;top:0;width:520px;height:460px;transform-style:preserve-3d;transform-origin:262px 380px}
.skh.is-away .lf-sway{animation-play-state:paused}
/* a sheet: a key that is a document, standing in the fan with its own thickness */
#page-lector button.lf-card{position:absolute;left:152px;top:58px;width:216px;height:330px;margin:0;padding:0;border:0;background:none;color:inherit;font:inherit;text-align:left;cursor:pointer;
  -webkit-tap-highlight-color:transparent;transform-style:preserve-3d;transform-origin:50% 100%;
  transform:translate3d(var(--lx,0px),var(--ly,0px),var(--lz,0px)) rotate(var(--lr,0deg)) scale(var(--ls,1));transition:transform .5s cubic-bezier(.34,1.3,.64,1)}
#page-lector button.lf-card.lf-l{--lx:-36px;--ly:24px;--lz:-34px;--lr:-11deg;--ls:.97}
#page-lector button.lf-card.lf-r{--lx:36px;--ly:24px;--lz:-34px;--lr:11deg;--ls:.97}
#page-lector button.lf-card.lf-f{--lz:0px}
#page-lector button.lf-card.lf-l:hover,#page-lector button.lf-card.lf-l.lf-ph{--lx:-84px;--ly:4px;--lz:-6px;--lr:-15deg;--ls:.99}
#page-lector button.lf-card.lf-r:hover,#page-lector button.lf-card.lf-r.lf-ph{--lx:84px;--ly:4px;--lz:-6px;--lr:15deg;--ls:.99}
#page-lector button.lf-card.lf-f:hover,#page-lector button.lf-card.lf-f.lf-ph{--ly:-16px;--lz:26px;--ls:1.015}
#page-lector button.lf-card.lf-down{--lz:-4px;--ls:.98;transition-duration:.08s}
#page-lector button.lf-card:focus{outline:none}
#page-lector button.lf-card:focus-visible .lf-sheet{box-shadow:0 0 0 3px var(--sk-acc)}
#page-lector .lf-sheet,#page-lector .lf-leaf,#page-lector .lf-shade{position:absolute;left:0;top:0;width:216px;height:330px;border-radius:14px;box-sizing:border-box;display:block}
#page-lector .lf-shade{background:rgba(42,20,80,.16);filter:blur(10px);transform:translateZ(-12px) translateY(10px)}
body[data-theme="night"] #page-lector .lf-shade{background:rgba(0,0,0,.6)}
#page-lector .lf-leaf{background:linear-gradient(170deg,#eee8f8,#dcd2ee);box-shadow:inset 0 0 0 1px rgba(106,63,181,.16)}
#page-lector .lf-leaf.a{transform:translateZ(-2.6px) translate(.8px,1.4px)}#page-lector .lf-leaf.b{transform:translateZ(-5.2px) translate(1.6px,2.8px);background:linear-gradient(170deg,#e3dbf2,#cfc4e6)}
#page-lector .lf-leaf.c{transform:translateZ(-7.8px) translate(2.4px,4.2px);background:linear-gradient(170deg,#d8cfeb,#c3b6df)}
body[data-theme="night"] #page-lector .lf-leaf{background:linear-gradient(170deg,#2c2342,#211a33);box-shadow:inset 0 0 0 1px rgba(205,184,240,.10)}
body[data-theme="night"] #page-lector .lf-leaf.b,body[data-theme="night"] #page-lector .lf-leaf.c{background:linear-gradient(170deg,#221b34,#18122a)}
#page-lector .lf-sheet{overflow:hidden;padding:20px 20px 16px;background-color:#fdfcff;background-image:var(--lf-grain,none),linear-gradient(170deg,#ffffff 0%,#fbf9fe 55%,#f2edfa 100%);
  box-shadow:inset 0 0 0 1px rgba(106,63,181,.18),inset 0 0 0 7px rgba(255,255,255,.9),inset 0 0 0 8px rgba(106,63,181,.13),inset 0 -18px 30px rgba(106,63,181,.05)}
body[data-theme="night"] #page-lector .lf-sheet{background-color:#2a2140;background-image:var(--lf-grain-n,none),linear-gradient(170deg,#30264a 0%,#271e3b 55%,#1f1830 100%);
  box-shadow:inset 0 0 0 1px rgba(205,184,240,.16),inset 0 0 0 7px rgba(42,33,64,.9),inset 0 0 0 8px rgba(205,184,240,.10)}
#page-lector .lf-tab{position:absolute;left:22px;top:-30px;height:31px;max-width:150px;padding:0 14px 0 26px;box-sizing:border-box;border-radius:11px 11px 0 0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;
  font:600 14px/32px var(--sk-serif);color:var(--sk-ink1);background:linear-gradient(#ffffff,#f8f5fd);box-shadow:inset 0 0 0 1px rgba(106,63,181,.18),inset 0 1px 0 #ffffff}
#page-lector .lf-tab::before{content:"";position:absolute;left:12px;top:13px;width:7px;height:7px;border-radius:50%;background:var(--sk-acc)}
body[data-theme="night"] #page-lector .lf-tab{background:linear-gradient(#352a4f,#2f2546);box-shadow:inset 0 0 0 1px rgba(205,184,240,.16)}
#page-lector .lf-card:not(.lf-f) .lf-ribbon{display:none}
#page-lector .lf-ribbon{position:absolute;right:30px;top:-6px;width:16px;height:96px;transform:translateZ(3px);background:linear-gradient(90deg,#5e33b0,#9b74e6 40%,#7a4fd0 62%,#55309a);
  clip-path:polygon(0 0,100% 0,100% 100%,50% 86%,0 100%)}
#page-lector .lf-ribbon::before{content:"";position:absolute;left:0;top:0;width:16px;height:7px;background:rgba(30,10,70,.35)}
body[data-theme="night"] #page-lector .lf-ribbon{background:linear-gradient(90deg,#4f2c96,#a27ef0 40%,#7a54d4 62%,#3f227e)}
#page-lector .lf-cap{float:left;margin:2px 10px 0 0;font:600 54px/.82 var(--sk-serif);color:var(--sk-acc);text-shadow:0 1px 0 rgba(255,255,255,.8)}
body[data-theme="night"] #page-lector .lf-cap{text-shadow:none}
#page-lector .lf-ttl{display:block;padding-right:18px;font:600 21px/1.08 var(--sk-serif);color:var(--sk-ink1)}
#page-lector .lf-sub{display:block;clear:both;margin:6px 0 0 50px;padding-right:12px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;font:italic 500 14px/1.2 var(--sk-serif);color:var(--sk-ink3)}
#page-lector .lf-lines{display:block;margin-top:30px}
#page-lector .lf-lines i{display:block;height:4px;margin:0 0 9px;border-radius:2px;background:rgba(106,63,181,.10)}
body[data-theme="night"] #page-lector .lf-lines i{background:rgba(205,184,240,.11)}
#page-lector .lf-lines i.gap{height:0;margin:0 0 14px;background:none}
#page-lector .lf-rule{position:absolute;left:20px;right:20px;bottom:56px;height:1px;background:rgba(106,63,181,.18)}
#page-lector .lf-num{position:absolute;left:22px;bottom:24px;font:600 19px/1 var(--sk-serif);color:var(--sk-acc)}
#page-lector .lf-card.is-done .lf-num::after{content:"·";margin-left:6px;color:var(--sk-ink3)}
/* the seal: a coin standing proud of the fan, on discs of its own */
/* Ingenium's own seal key at the foot of the fan (modules/r284.js IngHeads.sealKey, made as Home's is): for the pleasure of pressing it, as
   the owner asked ("I just want to use it as a fidget button on the page for my amusement, I like the clicking and the animation that
   goes with it matching that of the one from the Home page"); it opens nothing */
#page-lector .lf-seal{position:absolute;left:222px;top:350px;width:78px;height:78px;transform-style:preserve-3d;transform:translateZ(34px)}
#page-lector .lf-seal .hx-seal{position:absolute;left:2px;top:2px;width:74px;height:74px;margin:0}
#page-lector .lf-seal .r175-seal{position:absolute;inset:0;width:100%;height:100%;min-width:0;min-height:0;margin:0;padding:0;border:0;border-radius:50%;background:transparent;box-shadow:none;cursor:pointer}
#page-lector .lf-seal .r175-seal:focus-visible{outline:2.5px solid var(--sk-acc);outline-offset:6px}
#page-lector .lf-seal .r175-fx{display:block;width:100%;height:100%;pointer-events:none}
body[data-motion="minimal"] #page-lector .lf-sway{animation:none}
body[data-motion="minimal"] #page-lector button.lf-card,body[data-motion="minimal"] #page-lector .lf-tilt{transition:none}
@media (prefers-reduced-motion:reduce){#page-lector .lf-sway{animation:none}#page-lector button.lf-card,#page-lector .lf-tilt{transition:none}}
/* ---------- Lector's seal (6.94): the engine logo pressed in wax, a real vintage stamp, moving as Home's engine button does (its own
   .isl rules give it Home's sway, lean, lift, sink and knock; its layers stand a little off one another as Home's do) ---------- */
#page-lector .lf-seal{position:absolute;left:214px;top:245px;width:92px;height:92px;transform-style:preserve-3d;transform:translate3d(0,0,3px);transition:transform .5s cubic-bezier(.34,1.3,.64,1)}
/* 6.96: the seal is pressed on the sheet in front: it rises with it under the pointer and sinks with it when pressed, its own sway stilled
   (the stack sways it), its lean toward the pointer a third of Home's, as wax on paper leans */
#page-lector .lf-seal.lf-up{transform:translate3d(0,-16px,29px)}
#page-lector .lf-seal.lf-dn{transform:translate3d(0,0,-1px);transition-duration:.08s}
#page-lector .lf-seal .lxs-isl .isl-idle{animation:none}
/* 6.96, her words (13 November 2026): "remove the black dot/shadow that shows up behind the wax seal on the header". It was the seal's cast
   shadow, a disc of near black by night (rgba 0,0,0,.72), softened only by a blur inside the seal's 3D frame; where the window's web view
   draws that blur badly, a hard dark dot stands behind the wax. The seal casts none on the paper now: its own lit edge and side wall stand it
   off the sheet. */
#page-lector .lf-seal .lxs-cast{display:none}
#page-lector .lf-seal .lxs-isl .isl-tilt{transform:rotateX(calc(var(--rx) * .35)) rotateY(calc(var(--ry) * .35)) translateY(var(--cdl)) scale(var(--cds))}
/* the ribbon that binds the three: its two tails come out from under the seal, below the sheet, in the seal's violet silk */
#page-lector .lf-tails{position:absolute;left:0;top:0;width:92px;height:92px;transform-style:preserve-3d;transform:translateZ(-1px);pointer-events:none}
#page-lector .lf-tails i{position:absolute;left:38px;top:50px;width:16px;height:70px;transform-origin:50% 0;
  background:linear-gradient(90deg,#4b2a8e 0%,#7a52cc 22%,#a789ea 46%,#8460d8 60%,#5b36a6 82%,#3f2378 100%);
  clip-path:polygon(0 0,100% 0,100% 100%,50% 85%,0 100%);box-shadow:inset 0 -1px 0 rgba(30,10,70,.3)}
#page-lector .lf-tails i.a{animation:lfTailA 7s ease-in-out infinite}#page-lector .lf-tails i.b{height:62px;animation:lfTailB 7s ease-in-out infinite}
@keyframes lfTailA{0%,100%{transform:rotate(25deg)}50%{transform:rotate(29deg)}}
@keyframes lfTailB{0%,100%{transform:rotate(-20deg)}50%{transform:rotate(-16.5deg)}}
body[data-theme="night"] #page-lector .lf-tails i{background:linear-gradient(90deg,#2f1a5c 0%,#5a3aa6 22%,#8a6ad8 46%,#6a48c0 60%,#41267e 82%,#24133f 100%)}
body[data-motion="minimal"] #page-lector .lf-tails i{animation:none}
@media (prefers-reduced-motion:reduce){#page-lector .lf-tails i{animation:none}}
/* the sheets drawn as the seal is drawn (6.96): one canvas each, the paper, its tab and its printing, under the seal's own light */
#page-lector .lf-paper{position:absolute;left:0;top:-34px;width:226px;height:374px;display:block;pointer-events:none}
/* the drawn pages stand for the leaves, and no ribbon is tied to them (her words, 13 November 2026: "Please remove the bow, I hate it and it
   cheapens the look of the design"); the seal closes the band round the dossier in front */
#page-lector .lf-card.lf-drawn .lf-leaf,#page-lector .lf-card.lf-drawn .lf-ribbon{display:none}
#page-lector .lf-loose{position:absolute;left:152px;top:58px;width:216px;height:330px;transform-style:preserve-3d;transform-origin:50% 100%;pointer-events:none}
#page-lector .lf-loose.l{transform:translate3d(-74px,42px,-70px) rotate(-21deg) scale(.93)}
#page-lector .lf-loose.r{transform:translate3d(74px,42px,-70px) rotate(21deg) scale(.93)}
#page-lector .lf-loose .lf-shade{position:absolute;left:0;top:0;width:216px;height:330px;border-radius:14px;background:rgba(42,20,80,.12);filter:blur(10px);transform:translateZ(-10px) translateY(8px)}
body[data-theme="night"] #page-lector .lf-loose .lf-shade{background:rgba(0,0,0,.5)}
/* 6.99: the seal never goes behind the paper. Her words (13 November 2026): "there is a clear bug that keeps on disappearing the wax seal.
   I hate that." Pressing the sheet in front sent the seal to its resting depth (-1 px) while the sheet's lift under the pointer outweighed
   its press (26 px): the seal stood 27 px behind the paper until the press ended. A press now sinks the sheet from where it stands, lifted
   or at rest, and the seal with it; and the seal stands 6 px off the paper in every state, so its lean toward the pointer never meets it */
#page-lector button.lf-card.lf-f.lf-down:hover,#page-lector button.lf-card.lf-f.lf-down.lf-ph{--ly:-16px;--lz:18px;--ls:1}
#page-lector button.lf-card.lf-l.lf-down:hover{--lx:-84px;--ly:4px;--lz:-14px;--lr:-15deg;--ls:.98}
#page-lector button.lf-card.lf-r.lf-down:hover{--lx:84px;--ly:4px;--lz:-14px;--lr:15deg;--ls:.98}
#page-lector .lf-seal{transform:translate3d(0,0,6px)}
#page-lector .lf-seal.lf-up{transform:translate3d(0,-16px,32px)}
#page-lector .lf-seal.lf-dn{transform:translate3d(0,0,2px)}
#page-lector .lf-seal.lf-up.lf-dn{transform:translate3d(0,-16px,24px)}
/* 6.99: no blur filter inside the stack's 3D frame. Her words (13 November 2026): "please remove the weird dark shadow that is showing on
   the left top corner of the seal and documents for the Lector drawing, it detracts from the page." Each sheet's shadow was a dark sheet
   blurred by a filter, and the star in the wax cast one by a filter too; the Mac's web view (Safari's engine) draws a filter inside a 3D
   frame in a layer of its own and can set that layer down out of place, a dark patch at the top left. The shadows are now painted soft by
   box-shadow, as part of their own sheet (a sheet 20 px smaller each way, spread back by 20 px and softened by 20 px: the same blur of 10 px),
   and the star casts none */
#page-lector .lf-shade,#page-lector .lf-loose .lf-shade{filter:none;left:20px;top:20px;width:176px;height:290px;border-radius:0;background:rgba(42,20,80,.16);box-shadow:0 0 20px 20px rgba(42,20,80,.16)}
#page-lector .lf-loose .lf-shade{background:rgba(42,20,80,.12);box-shadow:0 0 20px 20px rgba(42,20,80,.12)}
body[data-theme="night"] #page-lector .lf-shade{background:rgba(0,0,0,.6);box-shadow:0 0 20px 20px rgba(0,0,0,.6)}
body[data-theme="night"] #page-lector .lf-loose .lf-shade{background:rgba(0,0,0,.5);box-shadow:0 0 20px 20px rgba(0,0,0,.5)}
#page-lector .lf-seal .lxs-isl .isl-star > img,body[data-theme="night"] #page-lector .lf-seal .lxs-isl .isl-star > img{filter:none}
#page-lector .lf-sheet.lf-drawn{background:none !important;box-shadow:none !important;overflow:visible}
#page-lector .lf-sheet.lf-drawn > span{visibility:hidden}
#page-lector .lf-card.lf-drawn > .lf-tab{visibility:hidden}
#page-lector .lf-card.lf-drawn .lf-leaf{background:linear-gradient(170deg,#f1edf6,#e2dbee);box-shadow:inset 0 0 0 1px rgba(106,63,181,.10)}
body[data-theme="night"] #page-lector .lf-card.lf-drawn .lf-leaf{background:linear-gradient(170deg,#2a2039,#1c1529);box-shadow:inset 0 0 0 1px rgba(205,184,240,.09)}
#page-lector .lf-card.lf-drawn .lf-ribbon{background:linear-gradient(90deg,#4b2a8e 0%,#7a52cc 22%,#a789ea 46%,#8460d8 60%,#5b36a6 82%,#3f2378 100%)}
.lf-seal .lx-wax{position:absolute;left:2px;top:2px;margin:0}
.lx-wax{position:relative;display:block;width:var(--S);height:var(--S)}
.lx-wax .lxs{position:absolute;inset:0;width:100%;height:100%;min-width:0;min-height:0;margin:0;padding:0;border:0;border-radius:50%;background:transparent;box-shadow:none;cursor:pointer;-webkit-tap-highlight-color:transparent}
.lx-wax .lxs:hover,.lx-wax .lxs:active{background:transparent;box-shadow:none;transform:none}
.lx-wax .lxs:focus{outline:none}.lx-wax .lxs:focus-visible{outline:2.5px solid var(--sk-acc,#6a3fb5);outline-offset:6px}
.lx-wax .r175-fx{display:block;width:100%;height:100%;pointer-events:none}
.lxs-isl{width:var(--S);height:var(--S)}
.lxs-isl .isl-ring{--fz:.02;--fk:.995}.lxs-isl .isl-star{--fz:.05;--fk:.988}.lxs-isl .isl-heart{--fz:.052;--fk:.987}
.lxs-l img{display:block;width:100%;height:100%;transform-origin:50% 50%;-webkit-user-drag:none;pointer-events:none}
.lxs-isl .isl-star > img{filter:drop-shadow(calc(var(--S) * .006) calc(var(--S) * .014) calc(var(--S) * .01) rgba(30,10,60,.34))}
.lxs-isl .isl-heart > img{filter:none}
/* the pearl at the heart beats at rest exactly as Home's engine button's heart does (Home's sealBeat, its pace and its calm pace) */
.lxs-isl .isl-heart > img{animation:sealBeat 3.2s ease-in-out infinite}
body[data-motion="calm"] .lxs-isl .isl-heart > img{animation-duration:5s}
@keyframes sealBeat{0%,100%{transform:scale(1)}14%{transform:scale(1.18)}28%{transform:scale(1.04)}42%{transform:scale(1.12)}56%{transform:scale(1)}}
@media (prefers-reduced-motion:reduce){.lxs-isl .isl-heart > img{animation:none}}
body[data-motion="minimal"] .lxs-isl .isl-heart > img{animation:none}
body[data-theme="night"] .lxs-isl .isl-star > img{filter:drop-shadow(calc(var(--S) * .006) calc(var(--S) * .014) calc(var(--S) * .012) rgba(0,0,0,.6))}
.lxs-face{position:absolute;left:0;top:0;width:100%;height:100%;transform-style:preserve-3d}
.lxs-cast{position:absolute;left:5%;top:9%;width:92%;height:92%;border-radius:50%;background:rgba(40,16,80,.26);filter:blur(calc(var(--S) * .055));transform:translateZ(calc(var(--S) * -.1))}
body[data-theme="night"] .lxs-cast{background:rgba(0,0,0,.72)}
.lxs-side{position:absolute;left:0;top:0;width:var(--S);height:calc(var(--S) + 4px);transform:translateZ(calc(var(--S) * -.012))}
.lxs-side svg{position:absolute;left:0;bottom:0}
/* still */
body[data-motion="minimal"] .skh-sway,body[data-motion="minimal"] .sko-idle,body[data-motion="minimal"] .sko-ico{animation:none}
body[data-motion="minimal"] .sko-tilt{transform:none}
body[data-motion="minimal"] .skh-k,body[data-motion="minimal"] .sks-step,body[data-motion="minimal"] .skc-cart{transition:none}
@media (prefers-reduced-motion:reduce){.skh-sway,.sko-idle,.sko-ico{animation:none}.sko-tilt{transition:none}.skh-k,.sks-step{transition:none}}
/* narrower: the object scales as Blend's does; a phone keeps the words and the cards */
@media (max-width:1180px){.skh-obj{transform:scale(.82);transform-origin:100% 0}.skh-words{width:420px}}
@media (max-width:980px){.skh-obj{transform:scale(.66)}.skh-words{width:360px}.skh-title{font-size:40px}}
@media (max-width:760px){.skh{height:auto;padding:24px 18px 22px}.skh-words{position:static;width:auto}.skh-obj{display:none}.skh-hint{position:static;margin-top:14px}
  .sks-step{width:calc(50% - 8px)}#page-focus.sk-on .fxp-tab{width:calc(50% - 8px)}}
/* ---------- the dial (Vocatio, until 6.95 the Career Studio), 6.94 and 6.95: a vintage pocket compass in silver, pearl and violet, in the
   Offline Project's layered depth: a cast shadow below, the case's thickness in stacked rims, the dial sunk inside it, the rose raised off
   the dial in layers that turn in harmony, the medallions and the engine button standing off the dial, the crystal and the case on top.
   6.95, as she chose it on 13 November 2026 ("I choose Ingenium's Orrery for the Career Studio page"; the raised compass): the grey
   chapter ring and the violet band stand higher off the case, each on its own walls, over a well; Home's engine button at the heart in
   full (its engine turning counterclockwise without pause, its rim in layers); the white dial engraved with Ingenium's Orrery, Home's
   six rooms as raised orbs on engraved orbits among the engine's stars. It sways on its own, leans to the pointer on a spring (one clock,
   in the script), and every part answers a press ---------- */
.skv{position:absolute;inset:0;transform-style:preserve-3d}
.skv img{-webkit-user-drag:none;pointer-events:none;display:block}
.skv-tilt,.skv-idle,.skv-rise{position:absolute;inset:0;transform-style:preserve-3d;transform-origin:260px 232px;pointer-events:none}
.skv-rise{animation:skvRise .95s cubic-bezier(.2,.9,.25,1) both}
@keyframes skvRise{0%{opacity:0;transform:translateZ(-40px) scale(.9)}60%{opacity:1;transform:translateZ(4px) scale(1.015)}100%{opacity:1;transform:none}}
.skv-under{position:absolute;left:58px;top:52px;width:404px;height:404px;border-radius:50%;transform:translateZ(-34px);pointer-events:none;
  background:radial-gradient(closest-side,rgba(44,22,88,.34),rgba(44,22,88,.2) 55%,rgba(44,22,88,.07) 80%,rgba(44,22,88,0))}
body[data-theme="night"] .skv-under{background:radial-gradient(closest-side,rgba(0,0,0,.7),rgba(0,0,0,.42) 55%,rgba(0,0,0,.12) 80%,rgba(0,0,0,0))}
.skv-side{position:absolute;left:80px;top:52px;width:360px;height:360px;box-sizing:border-box;border-radius:50%;pointer-events:none;transform:translateZ(calc(var(--z) * 1px));
  border:23px solid #8f88a6;border-color:#e4e0ec #aaa4bb #5d5772 #9d97b0}
body[data-theme="night"] .skv-side{border-color:#9890aa #5c5670 #1d1a28 #4f4964}
.skv-base{display:none}
.skv-domeimg,.skv-bandimg,.skv-chapimg,.skv-glassart{will-change:transform}
/* the inside, raised in layers: the dial, then the sixteen fine points, the four violet points and the four great points, each standing off
   the one below with its own edge and its shadow (they turn in harmony, in the script) */
.skv-lay{position:absolute;left:152px;top:124px;width:216px;height:216px;transform-origin:108px 108px;pointer-events:none;will-change:transform}
.skv-lay svg,.skv-lay img{position:absolute;left:0;top:0;display:block;width:216px;height:216px;overflow:visible}
.skv-dial{transform:translateZ(33px)}
.skv-lsh{transform:translateZ(calc(var(--z) * 1px))}.skv-led{transform:translateZ(calc(var(--z) * 1px))}.skv-ltop{transform:translateZ(calc(var(--z) * 1px))}
/* the outer ring inside, raised: the band on its wall above the dial, the chapter ring on its wall above the band, each with its shadow */
.skv-ring{position:absolute;left:103px;top:75px;width:314px;height:314px;transform-style:preserve-3d;pointer-events:none}
.skv-band,.skv-chap{position:absolute;left:0;top:0;width:314px;height:314px;transform-style:preserve-3d;pointer-events:none}
.skv-band{transform:translateZ(28px)}.skv-chap{transform:translateZ(19px)}
.skv-well{position:absolute;left:0;top:0;width:314px;height:314px;transform:translateZ(8px);pointer-events:none}.skv-well > img{position:absolute;left:0;top:0;width:314px;height:314px}
.skv-band > img,.skv-chap > img{position:absolute;left:0;top:0;width:314px;height:314px}
.skv-bandwall,.skv-chapwall{position:absolute;border-radius:50%;box-sizing:border-box;pointer-events:none;transform:translateZ(calc(var(--z) * 1px))}
.skv-bandwall{left:49.5px;top:49.5px;width:215px;height:215px;border:2.2px solid #3d2780;border-color:#5d45a6 #3a2478 #241452 #3a2478}
.skv-chapwall{left:25.5px;top:25.5px;width:263px;height:263px;border:2.4px solid #8d86a6;border-color:#d6d1e2 #8d86a6 #4f4868 #8d86a6}
.skv-chapwall.out{left:4.5px;top:4.5px;width:305px;height:305px;border-color:#efecf5 #9c96b2 #3f3958 #9c96b2}
body[data-theme="night"] .skv-bandwall{border-color:#40297d #261552 #120830 #261552}
body[data-theme="night"] .skv-chapwall{border-color:#6d6688 #403a58 #1f1b2c #403a58}
body[data-theme="night"] .skv-chapwall.out{border-color:#7d7798 #463f60 #17131f #463f60}
.skv-bandsh,.skv-chapsh{position:absolute;border-radius:50%;pointer-events:none}
.skv-bandsh{left:51.6px;top:52.8px;width:264px;height:264px;margin:-24px 0 0 -24px;box-sizing:border-box;border:24px solid rgba(26,10,58,.3);filter:blur(1.8px);transform:translateZ(19.3px)}
.skv-dialsh{position:absolute;border-radius:50%;pointer-events:none;left:51.5px;top:53.5px;width:215px;height:215px;box-shadow:0 0 0 0 transparent,2px 3px 6px rgba(26,10,58,.34);transform:translateZ(28.3px)}
.skv-dialwall{position:absolute;border-radius:50%;box-sizing:border-box;pointer-events:none;transform:translateZ(calc(var(--z) * 1px));left:49.5px;top:49.5px;width:215px;height:215px;border:1.6px solid #c9c2da;border-color:#f3f0f8 #bdb6cf #8a83a4 #bdb6cf}
body[data-theme="night"] .skv-dialwall{border-color:#5d5478 #3a3352 #1b1728 #3a3352}
.skv-chapwall.bside{border-width:2px;border-color:#6a50b8 #45298c #2a1660 #45298c}
body[data-theme="night"] .skv-chapwall.bside{border-color:#4a3290 #2c1a62 #150a36 #2c1a62}
body[data-theme="night"] .skv-dialsh{box-shadow:0 0 0 0 transparent,2px 3px 6px rgba(0,0,0,.6)}
.skv-chapsh{left:27.2px;top:28.6px;width:306px;height:306px;margin:-21px 0 0 -21px;box-sizing:border-box;border:21px solid rgba(26,10,58,.36);filter:blur(3px);transform:translateZ(8.3px)}
body[data-theme="night"] .skv-bandsh{border-color:rgba(0,0,0,.55)}
body[data-theme="night"] .skv-chapsh{border-color:rgba(0,0,0,.78)}
.skv-scale{position:absolute;left:0;top:0;width:314px;height:314px;display:block;overflow:visible;pointer-events:none;text-rendering:geometricPrecision;transform-origin:157px 157px}
.skv-marks{position:absolute;left:0;top:0;width:314px;height:314px;transform-origin:157px 157px;transform-style:preserve-3d;pointer-events:none}
.skv-scale .nm{font:700 8.7px/1 "Home Cormorant","Cormorant Garamond",Cormorant,"Iowan Old Style",Palatino,Georgia,serif;letter-spacing:1.45px;fill:#efe9fb}
.skv-scale .nm.cur{fill:#ffffff}
.skv-scale .sep{fill:#d8d0ea}
body[data-theme="night"] .skv-scale .nm{fill:#e9e2f8}body[data-theme="night"] .skv-scale .sep{fill:#a99cc8}
/* the medallions stand off the ring: their own edge beneath and their shadow on the ring */
.skv-slot{position:absolute;width:32px;height:32px;transform-style:preserve-3d;transform:translateZ(5px);pointer-events:none}
.skv-up{position:absolute;inset:0;transform-style:preserve-3d}
.skv-mdsh{position:absolute;left:3px;top:5px;width:28px;height:28px;border-radius:50%;background:rgba(26,10,58,.42);filter:blur(2.2px);transform:translateZ(-4.4px);pointer-events:none}
body[data-theme="night"] .skv-mdsh{background:rgba(0,0,0,.75)}
.skv-mdside{position:absolute;left:1.6px;top:1.6px;width:28.8px;height:28.8px;border-radius:50%;background:linear-gradient(150deg,#e9e5f1,#8c84a6 55%,#4b4466);transform:translateZ(-2.4px);pointer-events:none}
body[data-theme="night"] .skv-mdside{background:linear-gradient(150deg,#a59dbb,#4d4763 55%,#1d1a2a)}
.skv-md{position:absolute;left:0;top:0;width:32px;height:32px;margin:0;padding:0;border:0;border-radius:50%;background:none;cursor:pointer;pointer-events:auto;-webkit-tap-highlight-color:transparent}
.skv-md::before{content:"";position:absolute;left:-6px;top:-6px;right:-6px;bottom:-6px;border-radius:50%}
.skv-md svg{position:absolute;left:0;top:0;width:32px;height:32px;display:block;overflow:visible}
.skv-md .nmr{font:600 10.6px/1 "Home Cormorant","Cormorant Garamond",Cormorant,"Iowan Old Style",Palatino,Georgia,serif;letter-spacing:.04em}
.skv-md:focus{outline:none}.skv-md:focus-visible{box-shadow:0 0 0 2px #fff,0 0 0 4px #6a3fb5}
/* 6.97: the medallion drawn as the case is (vcMedalUrl), and its glint, crossing the dome on Home's engine button's clock */
.skv-md .md2{position:absolute;left:0;top:0;width:32px;height:32px;display:block;pointer-events:none}
.skv-md .md2-img{position:absolute;left:0;top:0;width:32px;height:32px;display:block;-webkit-user-drag:none;user-select:none}
.skv-md .md2-glint{position:absolute;left:6.4px;top:6.4px;width:19.2px;height:19.2px;border-radius:50%;overflow:hidden;pointer-events:none;mix-blend-mode:screen}
.skv-md .md2-glint::before{content:"";position:absolute;left:-75%;top:-75%;width:250%;height:250%;
  background:linear-gradient(118deg,rgba(255,255,255,0) 43%,rgba(255,255,255,.62) 50%,rgba(255,255,255,0) 57%);transform:translateX(-62%);
  animation:skvGlint 14s cubic-bezier(.45,0,.2,1) infinite;animation-delay:var(--md-d,0s)}
.skv-md[data-kind="cur"] .md2-glint::before{animation-duration:7s}
.skv-md:hover .md2-glint::before,.skv-md.md-over .md2-glint::before{animation-duration:2.2s;animation-delay:0s}
/* 6.98: as on the preview she approved, the medallion under the pointer lifts and a pressed one sinks. The compass finds it from its own
   geometry (vcPick), since its 3D layers hide the medallions from the pointer: .md-over and .md-down, as :hover and :active would */
.skv-md .md2{transition:transform .38s cubic-bezier(.34,1.35,.64,1)}
.skv-md:hover .md2,.skv-md.md-over .md2{transform:translateY(-1.6px) scale(1.06)}
.skv-md:active .md2,.skv-md.md-down .md2{transform:translateY(.6px) scale(.95);transition-duration:.08s}
body[data-motion="minimal"] .skv-md .md2{transition:none;transform:none}
body[data-theme="night"] .skv-md .md2-glint::before{background:linear-gradient(118deg,rgba(255,255,255,0) 43%,rgba(225,212,255,.4) 50%,rgba(255,255,255,0) 57%)}
@keyframes skvGlint{0%,70%{transform:translateX(-62%)}88%,100%{transform:translateX(62%)}}
body[data-motion="minimal"] .skv-md .md2-glint::before{animation:none;transform:translateX(-62%)}
@media (prefers-reduced-motion:reduce){.skv-md .md2-glint::before{animation:none;transform:translateX(-62%)}.skv-md .md2{transition:none}}
.skv-inner{position:absolute;left:103px;top:75px;width:314px;height:314px;border-radius:50%;transform:translateZ(8.4px);pointer-events:none;
  box-shadow:inset 2px 3px 4px rgba(26,10,58,.36),inset 5px 9px 14px rgba(26,10,58,.16)}
body[data-theme="night"] .skv-inner{box-shadow:inset 2px 3px 4px rgba(0,0,0,.62),inset 5px 9px 14px rgba(0,0,0,.32)}
/* the engine button stands well off the rose, in its silver collar on a polished post (its thickness) */
.skv-seatsh{position:absolute;left:232px;top:207px;width:64px;height:64px;border-radius:50%;background:rgba(26,10,58,.42);filter:blur(5px);transform:translateZ(43.8px);pointer-events:none}
body[data-theme="night"] .skv-seatsh{background:rgba(0,0,0,.78)}
.skv-seatside{position:absolute;left:228.5px;top:200.5px;width:63px;height:63px;border-radius:50%;pointer-events:none;transform:translateZ(calc(var(--z) * 1px));
  background:linear-gradient(150deg,#f1eef6,#a7a0bb 50%,#57506f)}
body[data-theme="night"] .skv-seatside{background:linear-gradient(150deg,#b0a8c4,#5a5472 50%,#1f1b2c)}
.skv-seat{position:absolute;left:228px;top:200px;width:64px;height:64px;transform:translateZ(52px);border-radius:50%;pointer-events:none}
.skv-seat .skv-collar{position:absolute;left:-.5px;top:-.5px;width:65px;height:65px}
.skv-key{position:absolute;left:5px;top:5px;width:54px;height:54px}
.skv-key .hx-seal{position:absolute;left:0;top:0;width:54px;height:54px;margin:0}
.skv-key .r175-seal{position:absolute;inset:0;width:100%;height:100%;min-width:0;min-height:0;margin:0;padding:0;border:0;border-radius:50%;background:transparent;box-shadow:none;cursor:pointer;pointer-events:auto}
.skv-key .r175-seal:focus{outline:none}.skv-key .r175-seal:focus-visible{outline:2.5px solid #6a3fb5;outline-offset:5px}
.skv-key .r175-fx{display:block;width:100%;height:100%;pointer-events:none}
.skv-glass{position:absolute;left:103px;top:75px;width:314px;height:314px;transform:translateZ(33.4px);pointer-events:none}
.skv-glassart{display:none}
.skv-glass svg{display:block;width:314px;height:314px}
.skv-glassart{position:absolute;left:0;top:0;width:314px;height:314px;pointer-events:none}
.skv-ripples{position:absolute;left:0;top:0;width:314px;height:314px;border-radius:50%;overflow:hidden;pointer-events:none}
.skv-ripple{position:absolute;width:160px;height:160px;margin:-80px 0 0 -80px;border-radius:50%;pointer-events:none;animation:skvRip .95s cubic-bezier(.2,.7,.3,1) forwards;
  background:radial-gradient(closest-side,rgba(255,255,255,0) 52%,rgba(255,255,255,.6) 70%,rgba(255,255,255,0) 100%)}
body[data-theme="night"] .skv-ripple{background:radial-gradient(closest-side,rgba(214,198,255,0) 52%,rgba(214,198,255,.42) 70%,rgba(214,198,255,0) 100%)}
@keyframes skvRip{0%{transform:scale(.12);opacity:.95}100%{transform:scale(1.6);opacity:0}}
.skv-case{position:absolute;left:79px;top:51px;width:362px;height:362px;transform:translateZ(10px);pointer-events:none}
.skv-case img{position:absolute;left:0;top:0;width:362px;height:362px}
.skv-bow{position:absolute;left:232px;top:-14px;width:56px;height:72px;transform:translateZ(10px);pointer-events:none;filter:drop-shadow(.8px 1.6px 1.2px rgba(30,14,60,.32))}
.skv-bow.skv-bowback{transform:translateZ(6px);filter:brightness(.5)}
body[data-theme="night"] .skv-bow{filter:drop-shadow(.8px 1.6px 1.2px rgba(0,0,0,.6))}
body[data-theme="night"] .skv-bow.skv-bowback{filter:brightness(.45)}
.skv-bow img{width:56px;height:72px}
.skv-index{position:absolute;left:251px;top:48px;width:18px;height:27px;transform:translateZ(12px);transform-origin:8px 2px;pointer-events:none;filter:drop-shadow(.6px 1.2px .8px rgba(30,14,60,.38))}
body[data-theme="night"] .skv-index{filter:drop-shadow(.6px 1.2px .8px rgba(0,0,0,.65))}
.skv-index svg{display:block;width:18px;height:27px;overflow:visible}
.skv-index.tick{animation:skvTick .42s cubic-bezier(.3,1.6,.5,1)}
@keyframes skvTick{0%{transform:translateZ(12px) rotate(0)}35%{transform:translateZ(12px) rotate(-5deg)}70%{transform:translateZ(12px) rotate(2deg)}100%{transform:translateZ(12px) rotate(0)}}
/* every part answers a press (found from the compass's own geometry, in the script) */
.skv{cursor:default}.skv.hov{cursor:pointer}
@media (prefers-reduced-motion:reduce){.skv-index.tick,.skv-rise{animation:none}}
body[data-motion="minimal"] .skv-index.tick,body[data-motion="minimal"] .skv-rise{animation:none}

/* the engine button at the heart, as Home's: its engine turning counterclockwise without pause, and its rim of four layers */
@keyframes skvEngine{from{transform:rotate(0deg)}to{transform:rotate(-360deg)}}
.skv-hx .seal-spin{animation:skvEngine 9s linear infinite}
body[data-motion="calm"] .skv-hx .seal-spin{animation-duration:13s}
body[data-motion="minimal"] .skv-hx .seal-spin{animation:none}
@media (prefers-reduced-motion:reduce){.skv-hx .seal-spin{animation:none}}
.skv-hx{--ox-rim0:#ddd2ef;--ox-rim1:#a891d4}
body[data-theme="night"] .skv-hx{--ox-rim0:#43375e;--ox-rim1:#1d1729}
.skv-hx .isl .ox-rim{position:absolute;left:2.6%;top:2.6%;width:94.8%;height:94.8%;border-radius:50%;display:block;pointer-events:none;
  background:linear-gradient(160deg,var(--ox-rim0),var(--ox-rim1));transform:translateZ(calc(var(--S) * -.012 * var(--k)))}

.skh.skv-head .skh-sway{animation:none}
</style>
<script>try{(window.__ingParts=window.__ingParts||{})["p290"]="started";}catch(_){}
/* R290 · the heads of the Career Studio and Lector as Blend, Models, Folders and Home are made: see the note at the top of its styles */
(function r290(){"use strict";
var W=window,D=document;if(W.IngStudios)return;
function $(id){return D.getElementById(id);}
function mk(t,c,txt){var e=D.createElement(t);if(c)e.className=c;if(txt!=null)e.textContent=txt;return e;}
function night(){try{return D.body.getAttribute("data-theme")==="night";}catch(e){return false;}}
function still(){try{if(D.body.getAttribute("data-motion")==="minimal")return true;}catch(e){}try{return W.matchMedia&&matchMedia("(prefers-reduced-motion: reduce)").matches;}catch(e){return false;}}
var ROMAN=["I","II","III","IV","V","VI","VII","VIII","IX","X"],NSV="http://www.w3.org/2000/svg";
function svg(t,a){var e=D.createElementNS(NSV,t);for(var k in a)e.setAttribute(k,a[k]);return e;}
function press(el){el.addEventListener("pointerdown",function(){el.classList.add("is-down");});["pointerup","pointerleave","pointercancel"].forEach(function(t){el.addEventListener(t,function(){el.classList.remove("is-down");});});}
function img(cls,src){var e=mk("img",cls);e.alt="";e.setAttribute("aria-hidden","true");e.draggable=false;if(src)e.src=src;return e;}

/* ================= Blend's renderer (modules/r262.js), copied as it is, so the plate and the collar are Blend's own material ================= */
var MVC={},MVLX=.62,MVLY=.78;  /* in the picture's plane, the way away from the light: down and to the right */
var MVK=(function(){var a=-.45,b=-.62,c=.64,l=Math.sqrt(a*a+b*b+c*c);return [a/l,b/l,c/l];})();  /* the key light: up, to the left and in front */
var MVP={day:{rim:"#ddd3f0",crim:"#d8cdee",side:["#9d92b8","#aaa0c4","#b8afd0"],ring:"#efe9f8",collar:"#e4dcf3",floor:"#f8f5fc",cast:"#2a1452",
    plate:"#eee8f7",bevel:"#d9cfee",e0:.97,e1:.27,ks:.6,spec:[255,255,255],dark:[30,12,62],env:1},
  night:{rim:"#5a4c80",crim:"#62558b",side:["#191329","#221a39","#2d2348"],ring:"#5a4f7a",collar:"#706598",floor:"#201830",cast:"#000000",
    plate:"#201a30",bevel:"#4b4069",e0:.9,e1:.32,ks:.4,spec:[226,214,255],dark:[0,0,0],env:.85}};
var MVGHOST="#8f86a8",MVCTR="#6a3fb5";
function mvPal(){return MVP[night()?"night":"day"];}
function mvTag(){return night()?"n":"d";}
function mvScale(){return Math.min(3,Math.max(1.5,(W.devicePixelRatio||1)*1.2));}
function mvCv(n){var c=D.createElement("canvas");c.width=c.height=n;c.className="bx-cv";c.setAttribute("aria-hidden","true");return c;}
function mvDup(s){var c=mvCv(s.width);c.getContext("2d").drawImage(s,0,0);return c;}
function mvRgb(h){h=h.replace("#","");return [parseInt(h.slice(0,2),16),parseInt(h.slice(2,4),16),parseInt(h.slice(4,6),16)];}
function mvGrain(i){var s=Math.sin(i*12.9898+78.233)*43758.5453;return s-Math.floor(s);}
function mvEnv(nx,ny,nz){var rx=2*nz*nx,ry=2*nz*ny,rz=2*nz*nz-1,k=Math.max(0,rx*MVK[0]+ry*MVK[1]+rz*MVK[2]),k2=k*k,k6=k2*k2*k2;
  return {d:(.6-.3*ry+.12*rz+.3*k6)/.74,s:Math.pow(k,40)};}
function mvRingPx(q,ex,ey,hs,base,P){var b=1-q*q,h=Math.sqrt(b>1e-3?b:1e-3),dh=-q/h*hs,nx=-dh*ex,ny=-dh*ey,l=Math.sqrt(nx*nx+ny*ny+1),E;nx/=l;ny/=l;E=mvEnv(nx,ny,1/l);
  var d=E.d*P.env,s=E.s*1.15;return [base[0]*d+P.spec[0]*s,base[1]*d+P.spec[1]*s,base[2]*d+P.spec[2]*s];}
function mvSetting(Dp,frac,r1u,r2u,ringHex,innerHex,key,dial){var P=mvPal(),nt=night(),n=Math.ceil(Dp*frac*mvScale()/2)*2;key+=n+ringHex+innerHex+mvTag();if(MVC[key])return mvDup(MVC[key]);
  var u=n/(frac*100),c=mvCv(n),x=c.getContext("2d"),im=x.createImageData(n,n),o=im.data,c0=n/2,G=mvRgb(ringHex),F=mvRgb(innerHex),K=P.dark,
    r1=r1u*u,r2=r2u*u,rm=(r1+r2)/2,hw=(r2-r1)/2,RO=n/2,i,j,xx,yy,dx,dy,r,ex,ey,e,rg,en,cov,k,lit,sh,a,gl,din,gx,gy;
  for(yy=0;yy<n;yy++)for(xx=0;xx<n;xx++){dx=xx+.5-c0;dy=yy+.5-c0;r=Math.sqrt(dx*dx+dy*dy);if(r>RO)continue;i=yy*n+xx;j=i*4;ex=r?dx/r:0;ey=r?dy/r:0;e=ex*MVLX+ey*MVLY;
    if(r>r2+.5){a=(nt?.6:.4)*Math.max(0,e)*Math.exp(-(r-r2)/(1.2*u))+(nt?.25:.12)*Math.exp(-(r-r2)/(.5*u));o[j]=K[0];o[j+1]=K[1];o[j+2]=K[2];o[j+3]=Math.min(1,a)*255;continue;}
    rg=mvRingPx(Math.max(-1,Math.min(1,(r-rm)/hw)),ex,ey,.6,G,P);
    din=Math.max(0,r1-r);sh=(nt?.55:.42)*Math.max(0,-e)*Math.exp(-din/(1.7*u))+(nt?.2:.14)*Math.exp(-din/(.6*u));lit=(nt?.1:.3)*Math.max(0,e)*Math.exp(-din/(.45*u));
    k=(1-sh)*(1-(dial?.05:.08)*(r/r1)*(r/r1));gx=dx/r1+.38;gy=dy/r1+.45;gl=dial?(nt?.05:.16)*Math.exp(-(gx*gx+gy*gy)/.09):0;
    en=[F[0]*k+255*(lit+gl),F[1]*k+255*(lit+gl),F[2]*k+255*(lit+gl)];
    cov=Math.min(1,Math.max(0,r-r1+.5));a=Math.min(1,Math.max(0,r2+.5-r));
    o[j]=rg[0]*cov+en[0]*(1-cov);o[j+1]=rg[1]*cov+en[1]*(1-cov);o[j+2]=rg[2]*cov+en[2]*(1-cov);o[j+3]=255*(cov<1?1:a);}
  x.putImageData(im,0,0);MVC[key]=c;return mvDup(c);}
function mvPlate(size){var P=mvPal(),nt=night(),s=mvScale(),n=Math.ceil(size*s/2)*2,key="p"+n+mvTag();if(MVC[key])return mvDup(MVC[key]);
  var c=mvCv(n),x=c.getContext("2d"),R=n/2,bw=7*s,gr,t,tx,im,o,i,v,B=mvRgb(P.bevel),NS=360,k,a0,E,col;
  x.save();x.beginPath();x.arc(R,R,R-.5,0,7);x.clip();x.fillStyle=P.plate;x.fillRect(0,0,n,n);
  t=mvCv(96);tx=t.getContext("2d");im=tx.createImageData(96,96);o=im.data;for(i=0;i<96*96;i++){v=mvGrain(i*7.31+3);o[i*4]=o[i*4+1]=o[i*4+2]=v>.5?255:0;o[i*4+3]=Math.abs(v-.5)*(nt?24:34);}tx.putImageData(im,0,0);
  x.fillStyle=x.createPattern(t,"repeat");x.fillRect(0,0,n,n);
  gr=x.createRadialGradient(R*.62,R*.5,R*.05,R*.9,R*.85,R*1.25);gr.addColorStop(0,nt?"rgba(255,255,255,.07)":"rgba(255,255,255,.55)");gr.addColorStop(.6,"rgba(255,255,255,0)");gr.addColorStop(1,nt?"rgba(0,0,0,.3)":"rgba(60,40,100,.1)");
  x.fillStyle=gr;x.fillRect(0,0,n,n);
  x.lineWidth=bw+1;for(k=0;k<NS;k++){a0=k/NS*2*Math.PI;E=mvEnv(Math.cos(a0)*.7,Math.sin(a0)*.7,.714);
    col="rgb("+[0,1,2].map(function(q){return Math.min(255,Math.round(B[q]*E.d*P.env+P.spec[q]*E.s*.9));}).join(",")+")";
    x.strokeStyle=col;x.beginPath();x.arc(R,R,R-bw/2,a0-.004,a0+2*Math.PI/NS+.004);x.stroke();}
  x.lineWidth=1.1*s;x.strokeStyle=nt?"rgba(0,0,0,.5)":"rgba(70,50,110,.22)";x.beginPath();x.arc(R,R,R-bw-2.6*s,0,7);x.stroke();
  x.strokeStyle=nt?"rgba(255,255,255,.07)":"rgba(255,255,255,.8)";x.beginPath();x.arc(R,R,R-bw-1.5*s,0,7);x.stroke();
  x.restore();MVC[key]=c;return mvDup(c);}
var URLS={};
function plateUrl(size){var k="p"+size+mvTag()+mvScale();if(!URLS[k]){try{URLS[k]=mvPlate(size).toDataURL("image/png");}catch(e){URLS[k]="";}}return URLS[k];}
function collarSilverUrl(px){var k="cS"+px+mvTag()+mvScale();if(!URLS[k]){try{URLS[k]=mvSetting(px/.64,.64,25,29.6,night()?"#b4aad0":"#e4dff0",night()?"#2a1a52":"#3a2470","cs",true).toDataURL("image/png");}catch(e){URLS[k]="";}}return URLS[k];}
function collarUrl(px){var k="c"+px+mvTag()+mvScale();if(!URLS[k]){try{var P=mvPal();URLS[k]=mvSetting(px/.64,.64,25,29.6,P.collar,P.floor,"c",true).toDataURL("image/png");}catch(e){URLS[k]="";}}return URLS[k];}

/* ================= Home's orbs (modules/r261.js, refined in 6.92): the same ball, drawn by Home itself (IngOrrery.sphere), the same bevel
   and pearl for the mark, the same answer to the pointer ================= */
var NS=0;
var LOOKS=["bands","swirl","aurora","dapple","faint","storm"];
function ballSvg(look){try{if(W.IngOrrery&&IngOrrery.sphere)return IngOrrery.sphere(look);}catch(e){}
  var id="skf"+(++NS);return '<svg viewBox="0 0 120 120" aria-hidden="true" focusable="false"><defs><radialGradient id="'+id+'" cx=".36" cy=".32" r=".74"><stop offset="0" style="stop-color:var(--c0)"/><stop offset=".5" style="stop-color:var(--c2)"/><stop offset="1" style="stop-color:var(--c4)"/></radialGradient></defs><circle cx="60" cy="60" r="40" fill="url(#'+id+')"/></svg>';}
function bevel(){try{if(W.IngOrrery&&IngOrrery.pearl)IngOrrery.pearl();}catch(e){}}
var MARKS={focus:'<svg viewBox="0 0 24 24" aria-hidden="true"><circle class="gl" cx="12" cy="12" r="8.2"/><circle class="gl" cx="12" cy="12" r="4.4"/><circle class="glf" cx="12" cy="12" r="1.15"/></svg>',
  star:'<svg viewBox="0 0 24 24" aria-hidden="true"><path class="glf" d="M12 2.5c.9 5.2 4.3 8.6 9.5 9.5-5.2.9-8.6 4.3-9.5 9.5-.9-5.2-4.3-8.6-9.5-9.5 5.2-.9 8.6-4.3 9.5-9.5z"/></svg>'};
function orb(o){o=o||{};bevel();var e=mk("span","sko"+(o.cls?" "+o.cls:""));e.setAttribute("aria-hidden","true");e.style.setProperty("--od",(-(o.i||0)*1.17).toFixed(2)+"s");
  var mark=o.mark?(MARKS[o.mark]||""):o.num?'<svg viewBox="0 0 24 24" aria-hidden="true"><text class="num" x="12" y="17.2" text-anchor="middle">'+o.num+'</text></svg>':"";
  e.innerHTML='<span class="sko-tilt"><span class="sko-idle"><i class="sko-cast"></i><span class="sko-ball">'+ballSvg(o.look||LOOKS[(o.i||0)%LOOKS.length])+'</span><span class="sko-mark"><span class="sko-ico'+(o.num?' n':'')+'">'+mark+'</span></span>'+(o.done?'<b class="ok"></b>':'')+'</span></span>';
  return e;}
/* each orb answers the pointer as Home's do, and as the seal does: it tilts to follow a mouse and lifts, its light follows; pressed, it sinks */
function wireOrb(k,o){
  k.addEventListener("pointerenter",function(e){if(e.pointerType==="mouse"&&!still())o.classList.add("hover");});
  k.addEventListener("pointermove",function(e){if(e.pointerType!=="mouse"||still())return;var r=o.getBoundingClientRect();if(!r.width)return;
    var x=Math.max(-.25,Math.min(1.25,(e.clientX-r.left)/r.width)),y=Math.max(-.25,Math.min(1.25,(e.clientY-r.top)/r.height));
    o.style.setProperty("--ry",((x-.5)*26).toFixed(1)+"deg");o.style.setProperty("--rx",(-(y-.5)*22).toFixed(1)+"deg");o.style.setProperty("--hx",((x-.5)*7).toFixed(2)+"px");o.style.setProperty("--hy",((y-.5)*7).toFixed(2)+"px");},{passive:true});
  k.addEventListener("pointerleave",function(){o.classList.remove("hover","down");o.style.setProperty("--rx","0deg");o.style.setProperty("--ry","0deg");o.style.setProperty("--hx","0px");o.style.setProperty("--hy","0px");});
  k.addEventListener("pointerdown",function(){if(!still())o.classList.add("down");},{passive:true});
  ["pointerup","pointercancel"].forEach(function(t){k.addEventListener(t,function(e){o.classList.remove("down");if(e.pointerType!=="mouse")o.classList.remove("hover");},{passive:true});});
  k.addEventListener("keydown",function(e){if(still())return;if(e.key==="Enter"||e.key===" "){o.classList.add("down");setTimeout(function(){o.classList.remove("down");},140);}});
  k.addEventListener("blur",function(){o.classList.remove("hover","down");});}

/* ================= the hero ================= */
var IO=null;
function watch(h){if(!h||h.__io||typeof IntersectionObserver!=="function")return;h.__io=1;if(!IO)IO=new IntersectionObserver(function(es){es.forEach(function(e){e.target.classList.toggle("is-away",!e.isIntersecting);});},{threshold:0});IO.observe(h);}
function hero(o){var h=mk("section","skh"),w=mk("div","skh-words"),eb=mk("div","skh-eyebrow");h.setAttribute("aria-label",o.title);eb.setAttribute("aria-hidden","true");
  eb.appendChild(mk("b",null,"Ingenium"));eb.appendChild(mk("span",null,o.eyebrow));w.appendChild(eb);
  var t=mk("h2","skh-title",o.title);t.setAttribute("aria-hidden","true");w.appendChild(t);w.appendChild(mk("p","skh-lede",o.lede));
  var keys=mk("div","skh-keys");(o.keys||[]).forEach(function(k){var b=mk("button","skh-k"+(k.pri?" pri":""));b.type="button";if(k.ico)b.innerHTML=k.ico;b.appendChild(D.createTextNode(k.txt));if(k.id)b.id=k.id;
    b.addEventListener("click",function(e){e.preventDefault();k.fn(b);});keys.appendChild(b);});w.appendChild(keys);
  if(o.says){var s=mk("p","skh-says",o.says);w.appendChild(s);}h.appendChild(w);
  var obj=mk("div","skh-obj"),stg=mk("div","skh-stage"),sw=mk("div","skh-sway");stg.appendChild(sw);obj.appendChild(stg);h.appendChild(obj);
  var hint=mk("p","skh-hint",o.hint);hint.setAttribute("aria-live","polite");h.appendChild(hint);
  obj.addEventListener("pointerenter",function(){h.classList.add("is-hold");});obj.addEventListener("pointerleave",function(){h.classList.remove("is-hold");});
  watch(h);return {el:h,words:w,keys:keys,obj:obj,sway:sw,hint:hint};}
function label(obj,x,y,cos,sin,name,role,cls){var l=mk("div","skh-label"+(cls?" "+cls:""));l.style.left=x+"px";l.style.top=y+"px";
  if(cos>.35)l.classList.add("at-r");else if(cos<-.35)l.classList.add("at-l");else if(sin<0)l.classList.add("at-t");else l.classList.add("at-b");
  l.appendChild(mk("b",null,name));l.appendChild(mk("small",null,role||""));obj.appendChild(l);return l;}
function steps(list,onPick){var row=mk("div","sks");row.setAttribute("role","list");list.forEach(function(s,i){var b=mk("button","sks-step");b.type="button";b.setAttribute("role","listitem");
    if(s.now)b.setAttribute("aria-current","step");b.appendChild(mk("span","n",ROMAN[i]));b.appendChild(mk("b",null,s.name));b.appendChild(mk("small",null,s.sub||""));if(s.done&&!s.now)b.appendChild(mk("span","tick"));
    b.addEventListener("click",function(){onPick(i,s);});row.appendChild(b);});return row;}
var ICO={compass:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="8.5"/><path d="M15.6 8.4l-2.1 5.1-5.1 2.1 2.1-5.1z"/></svg>',
  plus:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" aria-hidden="true"><path d="M12 5v14M5 12h14"/></svg>',
  read:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3.5 6.5c3-1.4 5.8-1.4 8.5.6 2.7-2 5.5-2 8.5-.6V19c-3-1.4-5.8-1.4-8.5.6-2.7-2-5.5-2-8.5-.6z"/><path d="M12 7.1v12.5"/></svg>',
  begin:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="8.5"/><path d="M10.2 8.6l5 3.4-5 3.4z" fill="currentColor"/></svg>',
  rout:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 7h14M5 12h14M5 17h9"/></svg>'};

/* ================= THE DIAL (the Career Studio) ================= */
var CP={h:null,key:"",T:null,n:0,painted:false,data:null,cur:0};
function stagesNow(){var C=W.IngCareer;if(!C)return null;
  try{if(W.IngCounsel&&IngCounsel.stages){var nx=IngCounsel.next(),cur=nx;try{var st=IngCounsel.state&&IngCounsel.state();if(st&&st.stage&&IngCounsel.stages.some(function(s){return s[0]===st.stage;}))cur=st.stage;}catch(e){}
    return {room:"counsellor",list:IngCounsel.stages.map(function(s){return {k:s[0],name:s[1],done:!!IngCounsel.done(s[0]),next:s[0]===nx,cur:s[0]===cur};})};}}catch(e){}
  try{var M=C.mentor;if(M&&M.steps){var n=M.next(),cu=n;try{var ms=M.state();if(ms&&ms.step&&M.steps.some(function(s){return s[0]===ms.step;}))cu=ms.step;}catch(e){}
    return {room:"mentor",list:M.steps.map(function(s){return {k:s[0],name:s[1],done:!!M.done(s[0]),next:s[0]===n,cur:s[0]===cu};})};}}catch(e){}
  return null;}
function angleOf(i,n){return -90+i*(360/n);}
function sealCopy(){var d=$("introSeal"),s=d&&d.querySelector(".isl");if(!s){var hb=$("brandSealBtn");s=hb?hb.querySelector(".isl"):null;}if(!s)return null;
  var c=s.cloneNode(true),k="r290s"+(++CP.n)+"_";c.className="isl isl-home";c.removeAttribute("style");c.setAttribute("aria-hidden","true");var html=c.outerHTML;
  [].forEach.call(c.querySelectorAll("[id]"),function(n){var id=n.getAttribute("id"),q=id.replace(/[.*+?^${}()|[\]\\]/g,"\\$&");
    html=html.replace(new RegExp('id="'+q+'"',"g"),'id="'+k+id+'"').replace(new RegExp("url\\(#"+q+"\\)","g"),"url(#"+k+id+")").replace(new RegExp('href="#'+q+'"',"g"),'href="#'+k+id+'"');});
  var w=mk("div");w.innerHTML=html;var out=w.firstElementChild;[].forEach.call(out.querySelectorAll(".isl-tilt,.isl-idle"),function(n){n.removeAttribute("style");});return out;}
/* the bezel's turned top, drawn once by day and once by night with Blend's own light (mvEnv): flat and turned (fine concentric lines), its
   two edges rounded so each catches the light as a fine bright line where it faces it, a groove where the stages ride, and the soft shadow
   it casts on the plate. It is round, so it is drawn still; what turns on it (its scale, its inlay, its stages) is drawn above it */
var BZ={day:"#e6def4",night:"#4d4270"};
function bezelUrl(R1,R2,RG,M){var P=mvPal(),nt=night(),s=mvScale(),n=Math.ceil((R2+M)*2*s/2)*2,key="bz"+n+mvTag()+skcVar();if(URLS[key])return URLS[key];
  var c=mvCv(n),x=c.getContext("2d"),im=x.createImageData(n,n),o=im.data,c0=n/2,G=mvRgb(skcVar()==="c"?(nt?"#3a2f5c":"#4a3d72"):(nt?BZ.night:BZ.day)),K=P.dark,i,j,xx,yy,dx,dy,r,ex,ey,e,a,re=4.2,d,sl,nx,ny,l,E,gr,k,ss,cov;
  for(yy=0;yy<n;yy++)for(xx=0;xx<n;xx++){dx=(xx+.5-c0)/s;dy=(yy+.5-c0)/s;r=Math.sqrt(dx*dx+dy*dy);if(r>R2+M||r<R1-M)continue;i=yy*n+xx;j=i*4;ex=r?dx/r:0;ey=r?dy/r:0;e=ex*MVLX+ey*MVLY;
    if(r>R2+.5){a=(nt?.55:.34)*Math.max(0,e)*Math.exp(-(r-R2)/2.4)+(nt?.22:.1)*Math.exp(-(r-R2)/.9);o[j]=K[0];o[j+1]=K[1];o[j+2]=K[2];o[j+3]=Math.min(1,a)*255;continue;}
    if(r<R1-.5){a=(nt?.5:.3)*Math.max(0,-e)*Math.exp(-(R1-r)/2.6)+(nt?.2:.08)*Math.exp(-(R1-r)/.9);o[j]=K[0];o[j+1]=K[1];o[j+2]=K[2];o[j+3]=Math.min(1,a)*255;continue;}
    nx=0;ny=0;d=r-R1;if(d<re){sl=Math.min(6,(re-d)/Math.sqrt(Math.max(1e-3,re*re-(re-d)*(re-d))));nx=-ex*sl;ny=-ey*sl;}
    d=R2-r;if(d<re){sl=Math.min(6,(re-d)/Math.sqrt(Math.max(1e-3,re*re-(re-d)*(re-d))));nx=ex*sl;ny=ey*sl;}
    d=r-RG;if(Math.abs(d)<1.7){sl=.95*(d<0?1:-1);nx=ex*sl;ny=ey*sl;}
    l=Math.sqrt(nx*nx+ny*ny+1);E=mvEnv(nx/l,ny/l,1/l);gr=1+.012*Math.sin(r*4.6)+.014*(mvGrain(i)-.5);var th=Math.atan2(dy,dx),dl=Math.atan2(-MVLY,-MVLX),aw=Math.abs(Math.atan2(Math.sin(2*(th-dl)),Math.cos(2*(th-dl))))/2,wedge=(nx===0&&ny===0)?Math.exp(-aw*aw/.035)*(nt?.18:.26):0;k=E.d*P.env*gr*(1+wedge)-(nt?.0:.05);ss=E.s*2.2;
    cov=Math.min(1,Math.max(0,r-R1+.5))*Math.min(1,Math.max(0,R2+.5-r));
    o[j]=Math.min(255,G[0]*k+P.spec[0]*ss);o[j+1]=Math.min(255,G[1]*k+P.spec[1]*ss);o[j+2]=Math.min(255,G[2]*k+P.spec[2]*ss);o[j+3]=cov*255;}
  x.putImageData(im,0,0);try{URLS[key]=c.toDataURL("image/png");}catch(err){URLS[key]="";}return URLS[key];}
/* the plate's engraving, which stays still: the rose as the seal's own star (four long points, four short, each a lit half and a shaded
   half, their sides drawn in as the seal's are) */
function starPoint(s,c,ang,L,w,big){var u=[Math.cos(ang),Math.sin(ang)],v=[-u[1],u[0]],P=[c+L*u[0],c+L*u[1]],B1=[c+w*v[0],c+w*v[1]],B2=[c-w*v[0],c-w*v[1]],
    K1=[c+.42*L*u[0]+.2*w*v[0],c+.42*L*u[1]+.2*w*v[1]],K2=[c+.42*L*u[0]-.2*w*v[0],c+.42*L*u[1]-.2*w*v[1]],f=function(p){return p[0].toFixed(1)+" "+p[1].toFixed(1);};
  s.appendChild(svg("path",{"class":"pl",d:"M"+c+" "+c+"L"+f(B1)+"Q"+f(K1)+" "+f(P)+"z"}));s.appendChild(svg("path",{"class":"pd",d:"M"+c+" "+c+"L"+f(B2)+"Q"+f(K2)+" "+f(P)+"z"}));
  if(big)s.appendChild(svg("path",{"class":"po",d:"M"+f(B1)+"Q"+f(K1)+" "+f(P)+"Q"+f(K2)+" "+f(B2)}));}
function engraving(){var s=svg("svg",{viewBox:"0 0 340 340","aria-hidden":"true"}),c=170,i,q,r0;
  for(i=0;i<4;i++)starPoint(s,c,(i*90-45)*Math.PI/180,70,9,false);
  for(i=0;i<4;i++)starPoint(s,c,(i*90-90)*Math.PI/180,92,13,true);
  return s;}
/* what turns with the bezel: its scale, a little star of the seal's between one stage and the next, and the path inlaid in its groove in
   Ingenium's violet, from the first stage to the last one done and on toward the next */
function dialSvg(list){var n=list.length,s=svg("svg",{viewBox:"0 0 304 304","class":"skc-dsvg","aria-hidden":"true"}),c=152,i,q,a,id="skcIn"+(++NS),df=svg("defs",{}),gr=svg("linearGradient",{id:id,x1:"0",y1:"0",x2:"1",y2:"1"});
  [["0","#b394f0"],[".5","#7a50c6"],["1","#55309a"]].forEach(function(p){gr.appendChild(svg("stop",{offset:p[0],"stop-color":p[1]}));});df.appendChild(gr);s.appendChild(df);
  for(i=0;i<60;i++){q=(i*6-90)*Math.PI/180;s.appendChild(svg("line",{"class":i%2?"t":"T",x1:(c+141*Math.cos(q)).toFixed(2),y1:(c+141*Math.sin(q)).toFixed(2),x2:(c+(i%2?145.5:147)*Math.cos(q)).toFixed(2),y2:(c+(i%2?145.5:147)*Math.sin(q)).toFixed(2)}));}
  for(i=0;i<n;i++){a=(angleOf(i,n)+180/n)*Math.PI/180;var px=c+126*Math.cos(a),py=c+126*Math.sin(a),k=4.4,m=1.1;
    s.appendChild(svg("path",{"class":"sep",d:"M"+px.toFixed(1)+" "+(py-k).toFixed(1)+"Q"+(px+m).toFixed(1)+" "+(py-m).toFixed(1)+" "+(px+k).toFixed(1)+" "+py.toFixed(1)+"Q"+(px+m).toFixed(1)+" "+(py+m).toFixed(1)+" "+px.toFixed(1)+" "+(py+k).toFixed(1)+"Q"+(px-m).toFixed(1)+" "+(py+m).toFixed(1)+" "+(px-k).toFixed(1)+" "+py.toFixed(1)+"Q"+(px-m).toFixed(1)+" "+(py-m).toFixed(1)+" "+px.toFixed(1)+" "+(py-k).toFixed(1)+"z"}));}
  var p=0;while(p<n&&list[p].done)p++;
  if(p>0){var a0=angleOf(0,n),a1=p>=n?a0+359.9:angleOf(p-1,n)+180/n,big=(a1-a0)>180?1:0,P0=[c+126*Math.cos(a0*Math.PI/180),c+126*Math.sin(a0*Math.PI/180)],P1=[c+126*Math.cos(a1*Math.PI/180),c+126*Math.sin(a1*Math.PI/180)],
      d="M"+P0[0].toFixed(2)+" "+P0[1].toFixed(2)+"A126 126 0 "+big+" 1 "+P1[0].toFixed(2)+" "+P1[1].toFixed(2);
    s.appendChild(svg("path",{"class":"inl",d:d,stroke:"url(#"+id+")"}));
    var h0=[c+125.2*Math.cos(a0*Math.PI/180),c+125.2*Math.sin(a0*Math.PI/180)],h1=[c+125.2*Math.cos(a1*Math.PI/180),c+125.2*Math.sin(a1*Math.PI/180)];
    s.appendChild(svg("path",{"class":"inh",d:"M"+h0[0].toFixed(2)+" "+h0[1].toFixed(2)+"A125.2 125.2 0 "+big+" 1 "+h1[0].toFixed(2)+" "+h1[1].toFixed(2)}));}
  return s;}
/* a stage: a lens set in the bezel, made as the Models turret makes its own (modules/r269.js: a knurled rim, a turned ring, the glass),
   drawn crisp at this size (fewer, firmer teeth, and a polished collar where it meets the bezel), flat and still; its numeral on the glass.
   Her words on the first lenses: "I want a variation of this design but I don't want the little fuzy look around the little balls, I want
   it to look more refined and elevated but still match the look of the rest of the app": no soft halo, a clean cut in the bezel */
var LENS={cur:"#5d34a8",done:"#7a56c4",ahead:"#9a86c8"},TAU2=Math.PI*2;
function lensPal(){return night()?{mL:52,mS:12,knL:30,knS:12,hole:"#0d0618"}:{mL:80,mS:12,knL:52,knS:12,hole:"#1d0f38"};}
function lhex(c){c=String(c).replace("#","");return [parseInt(c.slice(0,2),16),parseInt(c.slice(2,4),16),parseInt(c.slice(4,6),16)];}
function lmix(a,b,t){return [0,1,2].map(function(i){return Math.round(a[i]+(b[i]-a[i])*t);});}
function ltones(col){var c=lhex(col);return [lmix(c,[255,255,255],.84),lmix(c,[255,255,255],.4),c,lmix(c,[0,0,0],.56)];}
function lrgba(c,a){return "rgba("+c[0]+","+c[1]+","+c[2]+","+a+")";}
function lspun(g,cx,cy,r0,r1,l0,sat,light){for(var r=Math.max(.35,r0);r<r1;r+=.7){var n=(Math.sin(r*1.9)+Math.sin(r*.41+1.1)+Math.sin(r*5.3)*.5)/2.5;g.strokeStyle="hsl(268,"+sat+"%,"+(l0+n*4)+"%)";g.lineWidth=1;g.beginPath();g.arc(cx,cy,r,0,TAU2);g.stroke();}
  if(g.createConicGradient){var cg=g.createConicGradient(-2.2,cx,cy);[[0,.45],[.07,0],[.43,0],[.5,.3],[.57,0],[.93,0],[1,.45]].forEach(function(s){cg.addColorStop(s[0],"rgba(255,255,255,"+(s[1]*(light||1))+")");});
    g.save();g.beginPath();g.arc(cx,cy,r1,0,TAU2);g.arc(cx,cy,r0,0,TAU2,true);g.fillStyle=cg;g.fill();g.restore();}}
function lbevel(g,cx,cy,r,w){var lg=g.createLinearGradient(cx-r,cy-r,cx+r,cy+r);lg.addColorStop(0,"rgba(255,255,255,.85)");lg.addColorStop(.5,"rgba(255,255,255,.05)");lg.addColorStop(1,"rgba(46,23,100,.42)");
  g.strokeStyle=lg;g.lineWidth=w;g.beginPath();g.arc(cx,cy,r,0,TAU2);g.stroke();}
function stageLens(cv,S,col){var dpr=Math.min(2,W.devicePixelRatio||1),px=Math.round(S*dpr);cv.width=cv.height=px;cv.style.width=cv.style.height=S+"px";var g=cv.getContext("2d");if(!g)return;
  g.setTransform(dpr,0,0,dpr,0,0);g.clearRect(0,0,S,S);var c=S/2,R=S/2-.5,Q=lensPal(),N=60,i,nt=night();
  /* the polished collar where the lens meets the bezel: raised, lit above on the left */
  var cg=g.createLinearGradient(0,0,S,S);cg.addColorStop(0,nt?"#e6e1f0":"#ffffff");cg.addColorStop(.48,nt?"#8c84a6":"#cfc9dc");cg.addColorStop(1,nt?"#2a2440":"#615a7c");g.fillStyle=cg;g.beginPath();g.arc(c,c,R,0,TAU2);g.fill();
  /* the knurled rim: firm teeth, each lit on its side toward the light */
  var R1=R-1.7,R2=R*.84;for(i=0;i<N;i++){var a0=i*TAU2/N,a1=(i+.5)*TAU2/N,lit=.5+.5*Math.cos(a0+2.3);
    g.beginPath();g.arc(c,c,R1,a0,a1);g.arc(c,c,R2,a1,a0,true);g.closePath();g.fillStyle="hsl(268,"+Q.knS+"%,"+(Q.knL+lit*30)+"%)";g.fill();
    g.beginPath();g.arc(c,c,R1,a1,a0+TAU2/N);g.arc(c,c,R2,a0+TAU2/N,a1,true);g.closePath();g.fillStyle="hsl(268,"+(Q.knS+6)+"%,"+(Q.knL-10+lit*16)+"%)";g.fill();}
  lbevel(g,c,c,R1,.9);lspun(g,c,c,R*.64,R2,Q.mL-4,Q.mS,.9);lbevel(g,c,c,R2,.9);lbevel(g,c,c,R*.64,.9);
  var T=ltones(col);g.strokeStyle=lrgba(T[2],.95);g.lineWidth=R*.04;g.beginPath();g.arc(c,c,R*.74,0,TAU2);g.stroke();
  g.fillStyle=Q.hole;g.beginPath();g.arc(c,c,R*.62,0,TAU2);g.fill();
  /* the glass, deep at its edge and lit at its heart, with its inner rings and one highlight */
  var gl=g.createRadialGradient(c-R*.14,c-R*.16,R*.05,c,c,R*.58);gl.addColorStop(0,lrgba(T[1],1));gl.addColorStop(.5,lrgba(T[2],1));gl.addColorStop(1,lrgba(T[3],1));
  g.fillStyle=gl;g.beginPath();g.arc(c,c,R*.58,0,TAU2);g.fill();
  [.48,.36].forEach(function(k,j){g.strokeStyle="rgba(255,255,255,"+(.13-j*.04)+")";g.lineWidth=.8;g.beginPath();g.arc(c,c,R*k,0,TAU2);g.stroke();});
  g.save();g.beginPath();g.arc(c,c,R*.58,0,TAU2);g.clip();var hx=c-R*.25,hy=c-R*.3,hl=g.createRadialGradient(hx,hy,0,hx,hy,R*.24);hl.addColorStop(0,"rgba(255,255,255,.72)");hl.addColorStop(1,"rgba(255,255,255,0)");
  g.fillStyle=hl;g.beginPath();g.ellipse(hx,hy,R*.22,R*.11,-.7,0,TAU2);g.fill();g.restore();
  g.strokeStyle=lrgba(T[3],.95);g.lineWidth=1.1;g.beginPath();g.arc(c,c,R*.58,0,TAU2);g.stroke();}
function cartEl(num,kind){var f=D.createDocumentFragment(),cv=D.createElement("canvas");cv.setAttribute("aria-hidden","true");stageLens(cv,52,LENS[kind]||LENS.ahead);f.appendChild(cv);
  var s=svg("svg",{"class":"nm",viewBox:"0 0 52 52","aria-hidden":"true"});
  if(!$("skcPearl")){var df=svg("defs",{}),gr=svg("linearGradient",{id:"skcPearl",gradientUnits:"userSpaceOnUse",x1:"16",y1:"18",x2:"36",y2:"36"});
    [["0","#ffffff"],[".45","#ffffff"],["1","#e2d6f8"]].forEach(function(p){gr.appendChild(svg("stop",{offset:p[0],"stop-color":p[1]}));});df.appendChild(gr);s.appendChild(df);}
  var sh=svg("text",{"class":"sh",x:"26.3",y:"31.9","text-anchor":"middle"});sh.textContent=num;s.appendChild(sh);var t=svg("text",{x:"26",y:"31.3","text-anchor":"middle"});t.textContent=num;s.appendChild(t);f.appendChild(s);return f;}
/* the dial's face, for a variant drawn for her choice: a deep violet enamel over a sunburst guilloche (fine rays that catch the light
   toward the lamp and away from it, as an engine-turned watch dial does), darker where the enamel is thicker at its edge, with one soft
   gloss of the lamp on its surface; drawn once by day and once by night */
function faceUrl(R){var M=mvScale(),key="fc"+R+mvTag()+M;if(URLS[key])return URLS[key];var nt=night(),n=Math.ceil(R*2*M/2)*2,c=mvCv(n),x=c.getContext("2d"),im=x.createImageData(n,n),o=im.data,c0=n/2,
    A=mvRgb(nt?"#4a2896":"#55309f"),B=mvRgb(nt?"#1c0b44":"#26105a"),thL=Math.atan2(-MVLY,-MVLX),i,j,xx,yy,dx,dy,r,th,t,sb,gr,k,gl,cov;
  for(yy=0;yy<n;yy++)for(xx=0;xx<n;xx++){dx=(xx+.5-c0)/M;dy=(yy+.5-c0)/M;r=Math.sqrt(dx*dx+dy*dy);if(r>R+.6)continue;i=yy*n+xx;j=i*4;th=Math.atan2(dy,dx);t=r/R;
    sb=Math.pow(Math.abs(Math.cos(th-thL)),4);gr=1+.07*Math.sin(th*300)+.03*Math.sin(th*97+1.3);k=1-.42*Math.pow(t,3);
    gl=.22*Math.exp(-((dx+R*.38)*(dx+R*.38)+(dy+R*.42)*(dy+R*.42))/(R*R*.09));
    var mix=.35+.65*sb;cov=Math.min(1,Math.max(0,R+.5-r));
    o[j]=Math.min(255,(B[0]+(A[0]-B[0])*mix)*gr*k*1.12+255*gl);o[j+1]=Math.min(255,(B[1]+(A[1]-B[1])*mix)*gr*k*1.12+240*gl);o[j+2]=Math.min(255,(B[2]+(A[2]-B[2])*mix)*gr*k*1.12+255*gl);o[j+3]=cov*255;}
  x.putImageData(im,0,0);try{URLS[key]=c.toDataURL("image/png");}catch(err){URLS[key]="";}return URLS[key];}
function skcVar(){var v=W.__skcVar||"a";return /^[abc]$/.test(v)?v:"a";}
/* ---------- the instrument (13 November 2026): her pictures of old compasses "as inspiration for the 3D rendering of the compass",
   "customise it to Ingenium and its design and colour palette". A real instrument in Ingenium's colours: a heavy case of polished silver
   with its own thickness, the turning bezel set lower inside it, the dial recessed again in deep violet enamel over a sunburst, a
   faceted silver rose built on the seal's star, and a pocket compass's bow above. Polished metal is drawn as polished metal is seen:
   it shows the room round it (a bright window above on the left, a pale ceiling, a dark floor), so its curves carry bright and dark
   bands and its flat faces stay deep; nothing is pastel. ---------- */
var IK=(function(){var a=-.5,b=-.66,c=.56,l=Math.sqrt(a*a+b*b+c*c);return [a/l,b/l,c/l];})();
/* the room a polished surface shows: r is the direction it reflects (screen axes, y down, z toward her) */
function room(rx,ry,rz){var up=-ry,k=Math.max(0,rx*IK[0]+ry*IK[1]+rz*IK[2]),win=Math.pow(k,18)*1.9+Math.pow(k,4)*.35,
    sky=up>0?.62+.3*up:.62+.5*up,front=rz>0?.36*rz:0,fill=Math.max(0,rx*.7-ry*.1)*.22;
  return Math.max(.05,Math.min(2.4,sky*(1-rz*.55)+front+win+fill));}
function metal(nx,ny,nz,base,P,rough){var rz=2*nz*nz-1,rx=2*nz*nx,ry=2*nz*ny,e=room(rx,ry,rz),d=Math.max(0,nx*IK[0]+ny*IK[1]+nz*IK[2]),v=(1-rough)*e+rough*(.35+.75*d),
    sp=Math.pow(Math.max(0,rx*IK[0]+ry*IK[1]+rz*IK[2]),60)*(1-rough)*1.4,nt=night(),dim=nt?.78:1;
  return [Math.min(255,(base[0]*v*.78+255*sp)*dim),Math.min(255,(base[1]*v*.78+250*sp)*dim),Math.min(255,(base[2]*v*.82+255*sp)*dim)];}
var SILVER={day:"#e2dcee",night:"#b9aed6"};
/* the case: a domed ring of polished silver from r0 to r1, its inner lip falling to the bezel, and the shadow it casts inward and outward */
function caseUrl(S,r0,r1){var M=mvScale(),key="cs"+S+r0+r1+mvTag()+M;if(URLS[key])return URLS[key];var nt=night(),n=Math.ceil(S*M/2)*2,c=mvCv(n),x=c.getContext("2d"),im=x.createImageData(n,n),o=im.data,c0=n/2,
    G=mvRgb(nt?SILVER.night:SILVER.day),rm=(r0+r1)/2,hw=(r1-r0)/2,i,j,xx,yy,dx,dy,r,ex,ey,e,q,sl,nx,ny,nz,l,col,cov,a;
  for(yy=0;yy<n;yy++)for(xx=0;xx<n;xx++){dx=(xx+.5-c0)/M;dy=(yy+.5-c0)/M;r=Math.sqrt(dx*dx+dy*dy);i=yy*n+xx;j=i*4;ex=r?dx/r:0;ey=r?dy/r:0;e=ex*MVLX+ey*MVLY;
    if(r>r1+.5){a=(nt?.62:.42)*Math.max(0,e+.15)*Math.exp(-(r-r1)/5)+(nt?.3:.16)*Math.exp(-(r-r1)/1.6);if(r>r1+16)continue;o[j]=12;o[j+1]=4;o[j+2]=30;o[j+3]=Math.min(1,a)*255;continue;}
    if(r<r0-.5){a=(nt?.62:.46)*Math.max(0,-e+.1)*Math.exp(-(r0-r)/3.4)+(nt?.3:.14)*Math.exp(-(r0-r)/1.2);if(r<r0-12)continue;o[j]=12;o[j+1]=4;o[j+2]=30;o[j+3]=Math.min(1,a)*255;continue;}
    q=Math.max(-.985,Math.min(.985,(r-rm)/hw));sl=q/Math.sqrt(1-q*q)*.9;nx=ex*sl;ny=ey*sl;nz=1;l=Math.sqrt(nx*nx+ny*ny+1);
    col=metal(nx/l,ny/l,nz/l,G,null,.18);cov=Math.min(1,Math.max(0,r-r0+.5))*Math.min(1,Math.max(0,r1+.5-r));
    /* two fine turned lines where the lip begins, as a case is finished */
    var line=(Math.abs(r-(r0+2.2))<.45?.72:1)*(Math.abs(r-(r1-2))<.4?1.15:1);
    o[j]=Math.min(255,col[0]*line);o[j+1]=Math.min(255,col[1]*line);o[j+2]=Math.min(255,col[2]*line);o[j+3]=cov*255;}
  x.putImageData(im,0,0);try{URLS[key]=c.toDataURL("image/png");}catch(err){URLS[key]="";}return URLS[key];}
/* the turning bezel as metal: a flat turned face (two soft wedges of light, as turned metal shows) between rounded edges, its groove */
function bezelMetalUrl(R1,R2,RG,M){var P=mvPal(),nt=night(),s=mvScale(),n=Math.ceil((R2+M)*2*s/2)*2,key="bzm"+n+mvTag();if(URLS[key])return URLS[key];
  var c=mvCv(n),x=c.getContext("2d"),im=x.createImageData(n,n),o=im.data,c0=n/2,G=mvRgb(nt?"#beb4da":"#efebf7"),i,j,xx,yy,dx,dy,r,ex,ey,e,a,re=3.2,d,sl,nx,ny,l,col,cov,th,dl=Math.atan2(-MVLY,-MVLX),aw,wedge;
  for(yy=0;yy<n;yy++)for(xx=0;xx<n;xx++){dx=(xx+.5-c0)/s;dy=(yy+.5-c0)/s;r=Math.sqrt(dx*dx+dy*dy);if(r>R2+M||r<R1-M)continue;i=yy*n+xx;j=i*4;ex=r?dx/r:0;ey=r?dy/r:0;e=ex*MVLX+ey*MVLY;
    if(r>R2+.5){continue;}
    if(r<R1-.5){a=(nt?.6:.4)*Math.max(0,-e+.1)*Math.exp(-(R1-r)/3)+(nt?.26:.12)*Math.exp(-(R1-r)/1);o[j]=12;o[j+1]=4;o[j+2]=30;o[j+3]=Math.min(1,a)*255;continue;}
    nx=0;ny=0;d=r-R1;if(d<re){sl=Math.min(5,(re-d)/Math.sqrt(Math.max(1e-3,re*re-(re-d)*(re-d))));nx=-ex*sl;ny=-ey*sl;}
    d=R2-r;if(d<re){sl=Math.min(5,(re-d)/Math.sqrt(Math.max(1e-3,re*re-(re-d)*(re-d))));nx=ex*sl;ny=ey*sl;}
    d=r-RG;if(Math.abs(d)<1.6){sl=.95*(d<0?1:-1);nx=ex*sl;ny=ey*sl;}
    l=Math.sqrt(nx*nx+ny*ny+1);col=metal(nx/l,ny/l,1/l,G,P,nx===0&&ny===0?.34:.12);
    th=Math.atan2(dy,dx);aw=Math.abs(Math.atan2(Math.sin(2*(th-dl)),Math.cos(2*(th-dl))))/2;wedge=(nx===0&&ny===0)?Math.exp(-aw*aw/.028)*(nt?.42:.5):0;
    var gr=1+.03*Math.sin(r*4.6)+.02*(mvGrain(i)-.5);cov=Math.min(1,Math.max(0,r-R1+.5))*Math.min(1,Math.max(0,R2+.5-r));
    o[j]=Math.min(255,col[0]*gr*(1+wedge));o[j+1]=Math.min(255,col[1]*gr*(1+wedge));o[j+2]=Math.min(255,col[2]*gr*(1+wedge));o[j+3]=cov*255;}
  x.putImageData(im,0,0);try{URLS[key]=c.toDataURL("image/png");}catch(err){URLS[key]="";}return URLS[key];}
/* the rose, faceted silver on the enamel: four long points cut as the seal's star is (its sides drawn in), four short ones between, and
   sixteen fine ones; each point a lit half and a shaded half, with a hairline where they meet */
function roseSvg(){var s=svg("svg",{viewBox:"0 0 200 200","aria-hidden":"true"}),c=100,id="skR"+(++NS),df=svg("defs",{}),f=function(n){return n.toFixed(2);},i;
  var g1=svg("linearGradient",{id:id+"l",x1:"0",y1:"0",x2:"1",y2:"1"});[["0","#ffffff"],[".55","#e6e0f2"],["1","#b9aed6"]].forEach(function(p){g1.appendChild(svg("stop",{offset:p[0],"stop-color":p[1]}));});
  var g2=svg("linearGradient",{id:id+"d",x1:"0",y1:"0",x2:"1",y2:"1"});[["0","#a99fc6"],[".5","#7d72a0"],["1","#4c4370"]].forEach(function(p){g2.appendChild(svg("stop",{offset:p[0],"stop-color":p[1]}));});
  var fl=svg("filter",{id:id+"f",x:"-20%",y:"-20%",width:"140%",height:"140%"});fl.appendChild(svg("feDropShadow",{dx:".8",dy:"1.4",stdDeviation:"1.2","flood-color":"#0c0420","flood-opacity":".55"}));
  df.appendChild(g1);df.appendChild(g2);df.appendChild(fl);s.appendChild(df);
  var gAll=svg("g",{filter:"url(#"+id+"f)"});s.appendChild(gAll);
  function point(ang,L,w,curve,cls){var u=[Math.cos(ang),Math.sin(ang)],v=[-u[1],u[0]],P=[c+L*u[0],c+L*u[1]],B1=[c+w*v[0],c+w*v[1]],B2=[c-w*v[0],c-w*v[1]],K1=[c+.42*L*u[0]+curve*w*v[0],c+.42*L*u[1]+curve*w*v[1]],K2=[c+.42*L*u[0]-curve*w*v[0],c+.42*L*u[1]-curve*w*v[1]];
    var lit=svg("path",{d:"M"+c+" "+c+"L"+f(B1[0])+" "+f(B1[1])+"Q"+f(K1[0])+" "+f(K1[1])+" "+f(P[0])+" "+f(P[1])+"z",fill:"url(#"+id+"l)"}),shd=svg("path",{d:"M"+c+" "+c+"L"+f(B2[0])+" "+f(B2[1])+"Q"+f(K2[0])+" "+f(K2[1])+" "+f(P[0])+" "+f(P[1])+"z",fill:"url(#"+id+"d)"});
    var rid=svg("path",{d:"M"+c+" "+c+"L"+f(P[0])+" "+f(P[1]),stroke:"#3a2a66","stroke-opacity":".5","stroke-width":".5",fill:"none"});gAll.appendChild(lit);gAll.appendChild(shd);gAll.appendChild(rid);}
  for(i=0;i<16;i++){var a=(i*22.5-90)*Math.PI/180;if(i%2===1)point(a,84,4.2,.25);}
  for(i=0;i<4;i++)point((i*90-45)*Math.PI/180,80,13,.3);
  for(i=0;i<4;i++)point((i*90-90)*Math.PI/180,97,21,.22);
  s.appendChild(svg("circle",{cx:c,cy:c,r:"84",fill:"none",stroke:"#e9e1fb","stroke-opacity":".28","stroke-width":".7"}));
  s.appendChild(svg("circle",{cx:c,cy:c,r:"78",fill:"none",stroke:"#e9e1fb","stroke-opacity":".2","stroke-width":".5","stroke-dasharray":"1 2.6"}));
  return s;}
/* the bow: a pocket compass's ring and its knurled crown, polished silver */
function bowSvg(){var s=svg("svg",{viewBox:"0 0 60 66","aria-hidden":"true"}),id="skB"+(++NS),df=svg("defs",{});
  var g=svg("linearGradient",{id:id+"m",x1:"0",y1:"0",x2:"1",y2:"1"});[["0","#ffffff"],[".3","#e2dcee"],[".55","#8d83ab"],[".75","#d6cfe6"],["1","#5d547e"]].forEach(function(p){g.appendChild(svg("stop",{offset:p[0],"stop-color":p[1]}));});
  var k=svg("linearGradient",{id:id+"k",x1:"0",y1:"0",x2:"1",y2:"0"});[["0","#6f6592"],[".3","#f3effa"],[".55","#b7aed0"],["1","#4f4672"]].forEach(function(p){k.appendChild(svg("stop",{offset:p[0],"stop-color":p[1]}));});
  df.appendChild(g);df.appendChild(k);s.appendChild(df);
  s.appendChild(svg("ellipse",{cx:"30",cy:"20",rx:"19",ry:"17",fill:"none",stroke:"#2a2046","stroke-opacity":".35","stroke-width":"6.4",transform:"translate(.8 1.4)"}));
  s.appendChild(svg("ellipse",{cx:"30",cy:"20",rx:"19",ry:"17",fill:"none",stroke:"url(#"+id+"m)","stroke-width":"5.4"}));
  s.appendChild(svg("ellipse",{cx:"30",cy:"20",rx:"19",ry:"17",fill:"none",stroke:"#ffffff","stroke-opacity":".55","stroke-width":".8",transform:"translate(-.6 -.9)"}));
  s.appendChild(svg("rect",{x:"23",y:"34",width:"14",height:"13",rx:"2.4",fill:"url(#"+id+"k)"}));
  for(var i=0;i<6;i++)s.appendChild(svg("line",{x1:(24.6+i*2.2).toFixed(1),y1:"35",x2:(24.6+i*2.2).toFixed(1),y2:"46",stroke:"#3c3360","stroke-opacity":".35","stroke-width":".6"}));
  s.appendChild(svg("rect",{x:"25.5",y:"46",width:"9",height:"10",rx:"1.6",fill:"url(#"+id+"m)"}));
  return s;}
/* the index: one point of the seal's star, pointing at the stage in hand, its pearl where the seal keeps its heart */
function indexEl(){var e=mk("div","skc-index"),s=svg("svg",{viewBox:"0 0 28 44","aria-hidden":"true"}),id="skcPl"+(++NS),df=svg("defs",{}),rg=svg("radialGradient",{id:id,cx:".38",cy:".34",r:".72"});
  rg.appendChild(svg("stop",{offset:"0","stop-color":"#ffffff"}));var st=svg("stop",{offset:"1"});st.setAttribute("style","stop-color:var(--sk-pearl)");rg.appendChild(st);df.appendChild(rg);s.appendChild(df);
  s.appendChild(svg("path",{"class":"lit",d:"M14 44Q12.4 25 2 14.5L14 7.5z"}));s.appendChild(svg("path",{"class":"shd",d:"M14 44Q15.6 25 26 14.5L14 7.5z"}));
  s.appendChild(svg("circle",{cx:"14",cy:"12.2",r:"4.3",fill:"url(#"+id+")"}));e.appendChild(s);e.setAttribute("aria-hidden","true");return e;}
/* ================= THE DIAL (Career Studio), 6.94: a vintage pocket compass in Ingenium's silver, pearl and violet =================
   Her words (13 November 2026), with eight photographs of old pocket compasses: "Use these pictures as inspiration for the 3D rendering
   of the compass." "Please customise it to Ingenium and its design and colour palette." And of the try before: "synthetic and plastic ...
   fake and chunky". So the instrument is made as those compasses are: a slim polished case with a reeded edge and a bow, a domed bezel,
   a turned silver chapter ring engraved with fine degrees, a violet enamel ring with the stages' names, a faceted rose in silver and
   violet on a pearl (by night violet) enamel dial, and a crystal over it all. The metal is lit as polished silver is photographed: a
   studio's light reflected in it, sharp and bright, never shaded like plastic. Only the chapter ring with the stages turns (its light,
   the room's, stays put, as a turned ring's does), and its medallions are flat and still: they ride the ring and stay upright. */
var VC={n:0,urls:{},art:"orrery"};  /* the drawing in the dial: Ingenium's Orrery, her choice of 13 November 2026 */
var VCL=(function(){var x=-.5,y=-.62,z=.6,l=Math.sqrt(x*x+y*y+z*z);return [x/l,y/l,z/l];})();
function vcS(a,b,x){var t=(x-a)/(b-a);t=t<0?0:t>1?1:t;return t*t*(3-2*t);}
/* the window (a softbox above on the left): a soft-edged rectangle in the room, so its reflections are crisp panes, as in the photographs */
var VCE1=(function(){var x=-VCL[2],z=VCL[0],l=Math.sqrt(x*x+z*z);return [x/l,0,z/l];})(),VCE2=[VCL[1]*VCE1[2]-VCL[2]*VCE1[1],VCL[2]*VCE1[0]-VCL[0]*VCE1[2],VCL[0]*VCE1[1]-VCL[1]*VCE1[0]];
function vcWin(x,y,z){if(x*VCL[0]+y*VCL[1]+z*VCL[2]<.6)return 0;var a=Math.abs(x*VCE1[0]+y*VCE1[1]+z*VCE1[2]),b=Math.abs(x*VCE2[0]+y*VCE2[1]+z*VCE2[2]);return (1-vcS(.17,.215,a))*(1-vcS(.25,.3,b));}
/* the room the silver reflects: a soft sky above, the floor below, the camera straight behind the eye, a large window above on the left
   and a slim light on the right, as silver is photographed */
function vcEnv(x,y,z,nt,o){var up=-y,r,g,b,a,f;
  if(nt){a=.22+.2*vcS(-.2,.85,up);r=a*.92;g=a*.9;b=a*1.22;f=vcS(0,.7,-up);r-=f*.15;g-=f*.14;b-=f*.18;}
  else{a=.86+.13*vcS(-.2,.9,up);r=a*.985;g=a*.98;b=a;f=vcS(-.05,.65,-up);r-=f*.4;g-=f*.4;b-=f*.36;}
  var hz=(1-vcS(.1,.28,Math.abs(y)))*(1-vcS(.5,.78,z))*.85,hd=nt?.07:.28;r+=(hd-r)*hz;g+=(hd-g)*hz;b+=(hd*1.12-b)*hz;
  var cam=vcS(.88,.975,z)*.8,cd=nt?.1:.5;r+=(cd-r)*cam;g+=(cd-g)*cam;b+=(cd*1.08-b)*cam;
  var k=vcWin(x,y,z);r+=k*1.3;g+=k*1.3;b+=k*1.34;
  var fs=vcS(.55,.72,x)*(1-vcS(.25,.5,Math.abs(y+.1)));r+=fs*(nt?.55:.6);g+=fs*(nt?.53:.6);b+=fs*(nt?.68:.64);
  o[0]=r<0?0:r;o[1]=g<0?0:g;o[2]=b<0?0:b;}
function vcTone(v){return v<.8?(v<0?0:v):.8+.2*(1-Math.exp(-(v-.8)*5));}
/* polished silver: the room reflected about the surface's normal (the eye looks straight in) */
function vcSilver(nx,ny,nz,nt,o){var l=Math.sqrt(nx*nx+ny*ny+nz*nz);nx/=l;ny/=l;nz/=l;var d=2*nz;vcEnv(d*nx,d*ny,d*nz-1,nt,o);
  o[0]=vcTone(o[0]*.965);o[1]=vcTone(o[1]*.96);o[2]=vcTone(o[2]*.975);}
/* glossy enamel: its colour lit softly, with the room's light caught in its glaze */
function vcEnamel(nx,ny,nz,base,nt,o){var l=Math.sqrt(nx*nx+ny*ny+nz*nz);nx/=l;ny/=l;nz/=l;var dl=nx*VCL[0]+ny*VCL[1]+nz*VCL[2],df=.62+.5*(dl<0?0:dl),d=2*nz;
  vcEnv(d*nx,d*ny,d*nz-1,nt,o);var fr=.035+.5*Math.pow(1-nz,5),k=vcWin(d*nx,d*ny,d*nz-1);
  o[0]=vcTone(base[0]*df+o[0]*fr+k*.42);o[1]=vcTone(base[1]*df+o[1]*fr+k*.42);o[2]=vcTone(base[2]*df+o[2]*fr+k*.46);}
/* a normal from a slope across the ring (a, outward) and along it (b) */
function vcN(a,b,ph,o){var c=Math.cos(ph),s=Math.sin(ph),sa=Math.sin(a),ca=Math.cos(a),sb=Math.sin(b),cb=Math.cos(b);o[0]=sa*c-sb*s;o[1]=sa*s+sb*c;o[2]=ca*cb;}
/* paints a round part pixel by pixel (supersampled, so its edges stay fine), once per theme */
function vcPaint(size,rmin,rmax,shade,ss){var dpr=Math.min(2,Math.max(1,W.devicePixelRatio||1)),N=Math.round(size*dpr),cv=D.createElement("canvas");cv.width=cv.height=N;
  var g=cv.getContext("2d"),im=g.createImageData(N,N),d=im.data,c=size/2,col=[0,0,0],i,j,si,sj;ss=ss||3;
  for(j=0;j<N;j++)for(i=0;i<N;i++){var px=(i+.5)/dpr-c,py=(j+.5)/dpr-c,rr=Math.sqrt(px*px+py*py);if(rr>rmax+1||rr<rmin-1)continue;
    var R0=0,G0=0,B0=0,A0=0;
    for(sj=0;sj<ss;sj++)for(si=0;si<ss;si++){var x=(i+(si+.5)/ss)/dpr-c,y=(j+(sj+.5)/ss)/dpr-c,r=Math.sqrt(x*x+y*y);if(r>rmax||r<rmin)continue;
      var w=shade(x,y,r,Math.atan2(y,x),col);if(!w)continue;R0+=col[0];G0+=col[1];B0+=col[2];A0++;}
    if(!A0)continue;var k=(j*N+i)*4;d[k]=Math.round(R0/A0*255);d[k+1]=Math.round(G0/A0*255);d[k+2]=Math.round(B0/A0*255);d[k+3]=Math.round(A0/(ss*ss)*255);}
  g.putImageData(im,0,0);try{return cv.toDataURL("image/png");}catch(e){return "";}}
/* the case's face, from its rim inwards: the reeded edge, a groove, the domed bezel, the chamfer down to the crystal */
function vcCaseUrl(nt,part){var k="case"+nt+(part||"");if(VC.urls[k])return VC.urls[k];var n=[0,0,0];
  VC.urls[k]=vcPaint(362,part==="rope"?171.8:156.5,part==="dome"?172.6:180,function(x,y,r,ph,o){var a=0,b=0,ao=1,t,u;
    if(r>=173){/* a twisted rope, its strands slanting round the rim */t=(180-r)/7;u=1-2*t;a=1.15*(u<0?-Math.pow(-u,.85):Math.pow(u,.85));
      var q=ph*150/(2*Math.PI)+(r-176.5)*.14;q-=Math.floor(q);var tw=(2*q-1)*.55;a+=tw*-.38;b=tw*.92;ao=(.8+.2*Math.sin(Math.PI*q))*(.88+.12*(1-Math.abs(u)));}
    else if(r>=171.8){t=(173-r)/1.2;a=-1+2*t;ao=.45+.55*Math.abs(2*t-1);}
    else if(r>=159.6){t=(171.8-r)/12.2;u=1-2*t;a=.8*(u<0?-Math.pow(-u,1.4):Math.pow(u,1.4));}
    else{t=(159.6-r)/3.1;a=-.8-.15*t;ao=1-.22*t;}
    vcN(a,b,ph,n);vcSilver(n[0],n[1],n[2],nt,o);o[0]*=ao;o[1]*=ao;o[2]*=ao;return 1;},3);return VC.urls[k];}
/* the dial under the crystal (it never turns): the turned silver chapter ring, its beads, the violet enamel ring and the enamel centre */
var VCG=null;function vcGrain(r){if(!VCG){VCG=[];var s=11;for(var i=0;i<1400;i++){s=(s*1103515245+12345)&2147483647;VCG.push(s/2147483647);}}
  var p=Math.abs(r)*2.2,i0=Math.floor(p),f=p-i0,a=VCG[i0%1400],b=VCG[(i0+1)%1400];return a+(b-a)*f;}
function vcBaseUrl(nt,part){var k="base"+nt+part;if(VC.urls[k])return VC.urls[k];var n=[0,0,0],cc=[0,0,0];
  var EN=nt?[.2,.135,.4]:[.27,.18,.5];
  function turned(ph,r,o,dim){var R0=0,G0=0,B0=0,W0=0;for(var q=-3;q<=3;q++){var bt=q*.19,wt=Math.exp(-q*q/4.5);vcN(bt,0,ph,n);vcSilver(n[0],n[1],n[2],nt,cc);R0+=cc[0]*wt;G0+=cc[1]*wt;B0+=cc[2]*wt;W0+=wt;}
    var gr=.95+.1*vcGrain(r);o[0]=R0/W0*gr*dim;o[1]=G0/W0*gr*dim;o[2]=B0/W0*gr*dim;}
  VC.urls[k]=vcPaint(314,part==="chap"?131.5:part==="well"?131.5:107,part==="chap"?152.5:part==="well"?157:131.9,function(x,y,r,ph,o){var t,u,a;
    if(part==="chap"){
      if(r>=150){t=(152.5-r)/2.5;a=1.15*(1-2*t);vcN(a,0,ph,n);vcSilver(n[0],n[1],n[2],nt,o);return 1;}
      if(r>=134){turned(ph,r,o,1-.1*vcS(147,150,r)-.1*vcS(136,134,r));return 1;}
      t=(134-r)/2.5;a=1.15*(1-2*t);vcN(a,0,ph,n);vcSilver(n[0],n[1],n[2],nt,o);return 1;}
    if(r>=131.5){/* the well under the chapter ring: turned silver deep in shadow */turned(ph,r,o,(nt?.42:.5)*(1-.25*vcS(154,157,r)));return 1;}
    if(r>=110){t=(131.5-r)/21.5;u=1-2*t;a=.42*u*u*u;vcN(a,0,ph,n);vcEnamel(n[0],n[1],n[2],EN,nt,o);var sd=1-.25*vcS(112.5,110,r)-.18*vcS(129,131.5,r);o[0]*=sd;o[1]*=sd;o[2]*=sd;return 1;}
    t=(110-r)/2.5;a=1.15*(1-2*t);vcN(a,0,ph,n);vcSilver(n[0],n[1],n[2],nt,o);return 1;},3);return VC.urls[k];}
/* the dial's enamel, its fine sunray guilloche catching the light along the light's line: a layer of its own, for it turns */
function vcDialUrl(nt){var k="dial"+nt;if(VC.urls[k])return VC.urls[k];var PE=nt?[.14,.095,.26]:[.955,.94,.98],kx=Math.atan2(VCL[1],VCL[0]);
  VC.urls[k]=vcPaint(216,0,107.8,function(x,y,r,ph,o){var lit=(.35+.65*Math.abs(Math.cos(ph-kx))),ray=Math.cos(ph*180)*lit*vcS(28,34,r)*(1-vcS(54,60,r)),
      wav=Math.cos(r*2.15+1.7*Math.sin(ph*12))*(.4+.6*Math.abs(Math.cos(ph-kx+.6)))*vcS(60,64,r)*(1-vcS(86,90,r)),
      gl=1+(nt?.06:.022)*ray+(nt?.05:.02)*wav+.01*(vcGrain(r*1.7+ph*31)-.5),lift=1+(nt?.06:.025)*(-(x+y)/150),edge=1-(nt?.18:.07)*vcS(101,107.8,r);
    o[0]=PE[0]*gl*lift*edge;o[1]=PE[1]*gl*lift*edge;o[2]=PE[2]*gl*lift*edge;return 1;},3);return VC.urls[k];}
function vcCollarUrl(nt,R0,R1){var k="col"+nt+R0+"_"+R1;if(VC.urls[k])return VC.urls[k];var n=[0,0,0];
  VC.urls[k]=vcPaint(2*R1+2,R0,R1,function(x,y,r,ph,o){var t=(R1-r)/(R1-R0),a=1.25*(1-2*t);vcN(a,0,ph,n);vcSilver(n[0],n[1],n[2],nt,o);return 1;},3);return VC.urls[k];}
/* the bow: a ring through a knurled crown on a short neck (its own little drawing, lit as the case) */
function vcBowUrl(nt){var k="bow"+nt;if(VC.urls[k])return VC.urls[k];
  var w=56,h=72,dpr=Math.min(2,Math.max(1,W.devicePixelRatio||1)),cv=D.createElement("canvas");cv.width=Math.round(w*dpr);cv.height=Math.round(h*dpr);
  var g=cv.getContext("2d"),im=g.createImageData(cv.width,cv.height),d=im.data,col=[0,0,0],ss=3,i,j,si,sj,cx=28;
  function at(x,y,o){var dx,dy,dd,s,u,th,q,sa,ao;
    if(y>=59&&y<=72&&Math.abs(x-cx)<=5.2){u=(x-cx)/5.2;vcSilver(u,y<61?-.6:0,Math.sqrt(1-u*u),nt,o);ao=y>66?.8:1;o[0]*=ao;o[1]*=ao;o[2]*=ao;return 1;}
    if(y>=45&&y<=59.4&&Math.abs(x-cx)<=10.2){u=(x-cx)/10.2;th=Math.asin(Math.max(-1,Math.min(1,u)));q=th*15/Math.PI;q-=Math.floor(q);th+=(q<.5?q*4-1:3-q*4)*.24*Math.cos(th);
      var ny=y<46.6?-.9*(46.6-y)/1.6:(y>57.8?.9*(y-57.8)/1.6:0);vcSilver(Math.sin(th),ny,Math.cos(th),nt,o);return 1;}
    dx=x-cx;dy=y-45;if(dx*dx+dy*dy<=4.9*4.9&&y<=45){var nz=Math.sqrt(Math.max(0,1-(dx*dx+dy*dy)/(4.9*4.9)));vcSilver(dx/4.9,dy/4.9,nz,nt,o);return 1;}
    dx=x-cx;dy=y-25.5;dd=Math.sqrt(dx*dx+dy*dy);s=dd-19.5;if(Math.abs(s)<=3.4){sa=s/3.4;var ca=Math.sqrt(1-sa*sa);vcSilver(sa*dx/dd,sa*dy/dd,ca,nt,o);
      ao=1-.32*vcS(38,45,y);o[0]*=ao;o[1]*=ao;o[2]*=ao;return 1;}
    return 0;}
  for(j=0;j<cv.height;j++)for(i=0;i<cv.width;i++){var R0=0,G0=0,B0=0,A0=0;
    for(sj=0;sj<ss;sj++)for(si=0;si<ss;si++){if(at((i+(si+.5)/ss)/dpr,(j+(sj+.5)/ss)/dpr,col)){R0+=col[0];G0+=col[1];B0+=col[2];A0++;}}
    if(!A0)continue;var p=(j*cv.width+i)*4;d[p]=Math.round(R0/A0*255);d[p+1]=Math.round(G0/A0*255);d[p+2]=Math.round(B0/A0*255);d[p+3]=Math.round(A0/(ss*ss)*255);}
  g.putImageData(im,0,0);try{VC.urls[k]=cv.toDataURL("image/png");}catch(e){VC.urls[k]="";}return VC.urls[k];}
function vcHex(c){var h=function(v){v=Math.round(Math.max(0,Math.min(1,v))*255);return (v<16?"0":"")+v.toString(16);};return "#"+h(c[0])+h(c[1])+h(c[2]);}
/* the rose: four silver cardinal points (the north in violet enamel, pointing at the stage in hand), four violet points between them and
   sixteen fine silver ones, each a raised facet pair lit by the same light as the case */
function vcRose(nt){var c=108,id="skv"+(++VC.n),f=function(v){return v.toFixed(2);},o=[0,0,0],VI=nt?[.40,.27,.70]:[.45,.30,.78],VN=nt?[.36,.22,.66]:[.40,.24,.72];
  var ink=nt?"rgba(232,224,250,.32)":"rgba(52,30,100,.42)",rings=svg("svg",{viewBox:"0 0 216 216","aria-hidden":"true"});
  rings.appendChild(svg("circle",{cx:c,cy:c,r:"104",fill:"none",stroke:ink,"stroke-width":".6"}));
  vcDialArt(rings,c,nt);
  function layer(pts){var top=svg("svg",{viewBox:"0 0 216 216","aria-hidden":"true"}),df=svg("defs",{}),edge=svg("svg",{viewBox:"0 0 216 216","aria-hidden":"true"}),shd=svg("svg",{viewBox:"0 0 216 216","aria-hidden":"true"}),df2=svg("defs",{});
    top.appendChild(df);shd.appendChild(df2);var fl=svg("filter",{id:id+"b"+pts.k,x:"-10%",y:"-10%",width:"120%",height:"120%"});fl.appendChild(svg("feGaussianBlur",{stdDeviation:"1.8"}));df2.appendChild(fl);
    var sg=svg("g",{filter:"url(#"+id+"b"+pts.k+")",opacity:nt?".72":".34"});shd.appendChild(sg);var FC=[],gi=0;
    pts.list.forEach(function(P0){var ang=P0[0],len=P0[1],w=P0[2],mat=P0[3],u=[Math.cos(ang),Math.sin(ang)],v=[-u[1],u[0]],P=[c+len*u[0],c+len*u[1]];
      [1,-1].forEach(function(sd){var B=[c+w*v[0]*sd,c+w*v[1]*sd],sl=.6,nx=Math.sin(sl)*v[0]*sd+.16*u[0],ny=Math.sin(sl)*v[1]*sd+.16*u[1],nz=Math.cos(sl);
        var gid=id+pts.k+"g"+(gi++),gr=svg("linearGradient",{id:gid,gradientUnits:"userSpaceOnUse",x1:f(c),y1:f(c),x2:f(P[0]),y2:f(P[1])}),s0=svg("stop",{offset:"0"}),s1=svg("stop",{offset:"1"});gr.appendChild(s0);gr.appendChild(s1);df.appendChild(gr);
        var d="M"+f(c)+" "+f(c)+"L"+f(B[0])+" "+f(B[1])+"L"+f(P[0])+" "+f(P[1])+"z";
        top.appendChild(svg("path",{d:d,fill:"url(#"+gid+")",stroke:nt?"rgba(8,3,20,.55)":"rgba(30,14,64,.38)","stroke-width":".45","stroke-linejoin":"round"}));
        edge.appendChild(svg("path",{d:d,fill:mat==="s"?(nt?"#3a3450":"#8c84a6"):(nt?"#241645":"#3e2580")}));sg.appendChild(svg("path",{d:d,fill:"#120626"}));
        FC.push({s0:s0,s1:s1,nx:nx,ny:ny,nz:nz,u:u,mat:mat});});});
    top.__fc=FC;return {top:top,edge:edge,shd:shd};}
  var L1=[],L2=[],L3=[],i;for(i=0;i<16;i++)if(i%2)L1.push([(i*22.5-90)*Math.PI/180,60,3.6,"s"]);
  for(i=0;i<4;i++)L2.push([(i*90-45)*Math.PI/180,76,9.5,"v"]);
  for(i=1;i<4;i++)L3.push([(i*90-90)*Math.PI/180,100,13.5,"s"]);L3.push([-Math.PI/2,102,13.5,"n"]);
  var out={rings:rings,layers:[layer({k:"a",list:L1}),layer({k:"b",list:L2}),layer({k:"c",list:L3})],nt:nt,VI:VI,VN:VN};
  out.layers.forEach(function(Ly){vcFacets(Ly.top,0,nt,VI,VN);});return out;}
/* the dial's engraving: Ingenium's own ornament, after the old dials she chose */
function vcDialArt(g0,c,nt){var f=function(v){return v.toFixed(2);},i,a,k,id="skv"+(++VC.n),P=function(r,t){return [c+r*Math.cos(t),c+r*Math.sin(t)];},D=Math.PI/180,
    groove=nt?"rgba(208,192,248,.5)":"rgba(66,36,140,.6)",lipc=nt?"rgba(4,1,14,.55)":"rgba(255,255,255,.96)",
    df=svg("defs",{}),lp=svg("g",{}),eng=svg("g",{}),sh=svg("g",{}),hi=svg("g",{}),body=svg("g",{}),sp=svg("g",{});
  g0.appendChild(df);[lp,eng,sh,hi,body,sp].forEach(function(e){g0.appendChild(e);});
  var bl=svg("filter",{id:id+"b",x:"-5%",y:"-5%",width:"110%",height:"110%"});bl.appendChild(svg("feGaussianBlur",{stdDeviation:nt?".55":".45"}));df.appendChild(bl);
  sh.setAttribute("filter","url(#"+id+"b)");sh.setAttribute("fill",nt?"rgba(0,0,0,.66)":"rgba(40,16,92,.34)");hi.setAttribute("fill",nt?"rgba(255,255,255,.26)":"#ffffff");
  sp.setAttribute("fill","#ffffff");sp.setAttribute("opacity",nt?".75":".9");
  var grad=function(n,stops,x1,y1,x2,y2){var gr=svg("linearGradient",{id:id+n,x1:x1,y1:y1,x2:x2,y2:y2});stops.forEach(function(p){gr.appendChild(svg("stop",{offset:p[0],"stop-color":p[1]}));});df.appendChild(gr);return "url(#"+id+n+")";};
  var vio=grad("v",nt?[["0","#d6c8f8"],["1","#8f70dc"]]:[["0","#8562d8"],["1","#4b2a9f"]],"0","0","1","1"),
      vStar=grad("t",nt?[["0","#efe8ff"],["1","#a585ea"]]:[["0","#9d7be6"],["1","#4a2797"]],"0","0","1","1"),
      pearl=nt?"#e9e1fb":"#fbf9ff",pline=nt?"rgba(60,36,120,.4)":"rgba(80,50,150,.35)";
  var og=svg("radialGradient",{id:id+"o",cx:".5",cy:".5",r:".55"});[["0",nt?"#e6dcfd":"#d9ccfa"],[".55",nt?"#9d7fe6":"#8a66dc"],["1",nt?"#4a2f96":"#45238f"]].forEach(function(p){og.appendChild(svg("stop",{offset:p[0],"stop-color":p[1]}));});df.appendChild(og);
  /* the tools: a cut, engraved with its lit lip; a piece of raised work with its shadow and lit edge; a pen stroke that swells and tapers */
  function cut(d,w,op){var o={d:d,fill:"none",stroke:lipc,"stroke-width":f(w*.9+.08)},b={d:d,fill:"none",stroke:groove,"stroke-width":f(w)};if(op!=null){o.opacity=op;b.opacity=op;}lp.appendChild(svg("path",o));eng.appendChild(svg("path",b));}
  function raise(d,fill,extra){var fr=extra&&extra["fill-rule"],o={d:d};if(fr)o["fill-rule"]=fr;sh.appendChild(svg("path",o));hi.appendChild(svg("path",{d:d,"fill-rule":fr||"nonzero"}));var b={d:d,fill:fill};if(extra)for(var x in extra)b[x]=extra[x];body.appendChild(svg("path",b));}
  function line(pts){var n=pts.length,o=[];for(var x=0;x<n;x++)o.push(f(pts[x][0])+" "+f(pts[x][1]));return "M"+o.join("L");}
  function outline(pts,w0,w1,wm,pk){var n=pts.length,L=[],R=[],x;for(x=0;x<n;x++){var p0=pts[Math.max(0,x-1)],p1=pts[Math.min(n-1,x+1)],dx=p1[0]-p0[0],dy=p1[1]-p0[1],l=Math.sqrt(dx*dx+dy*dy)||1,sp2=x/(n-1),w=(w0+(w1-w0)*sp2+wm*Math.pow(Math.sin(Math.PI*Math.pow(sp2,pk||1)),1.15))/2;
      L.push(f(pts[x][0]-dy/l*w)+" "+f(pts[x][1]+dx/l*w));R.push(f(pts[x][0]+dy/l*w)+" "+f(pts[x][1]-dx/l*w));}return "M"+L.join("L")+"L"+R.reverse().join("L")+"Z";}
  function bez(segs){var pts=[],N=18;segs.forEach(function(q,si){for(var m=si?1:0;m<=N;m++){var t=m/N,u=1-t;pts.push([u*u*u*q[0]+3*u*u*t*q[2]+3*u*t*t*q[4]+t*t*t*q[6],u*u*u*q[1]+3*u*u*t*q[3]+3*u*t*t*q[5]+t*t*t*q[7]]);}});return pts;}
  function arc(cx,cy,r,a0,a1,n){var pts=[];for(var m=0;m<=n;m++){var t=(a0+(a1-a0)*m/n)*D;pts.push([cx+r*Math.cos(t),cy+r*Math.sin(t)]);}return pts;}
  function ring(cx,cy,r){return "M"+f(cx+r)+" "+f(cy)+"a"+f(r)+" "+f(r)+" 0 1 0 "+f(-2*r)+" 0a"+f(r)+" "+f(r)+" 0 1 0 "+f(2*r)+" 0Z";}
  function star(x,y,k){return "M"+f(x)+" "+f(y-k)+"Q"+f(x+k*.2)+" "+f(y-k*.2)+" "+f(x+k)+" "+f(y)+"Q"+f(x+k*.2)+" "+f(y+k*.2)+" "+f(x)+" "+f(y+k)+"Q"+f(x-k*.2)+" "+f(y+k*.2)+" "+f(x-k)+" "+f(y)+"Q"+f(x-k*.2)+" "+f(y-k*.2)+" "+f(x)+" "+f(y-k)+"Z";}
  function ticks(r0,r1,n,skip){var d="";for(var m=0;m<n;m++){if(skip&&skip(m))continue;var t=m*2*Math.PI/n,p=P(r0,t),q=P(r1,t);d+="M"+f(p[0])+" "+f(p[1])+"L"+f(q[0])+" "+f(q[1]);}return d;}
  function estar(x,y,k){raise(star(x,y,k),vStar);raise(ring(x,y,k*.2),pearl);}
  var style=VC.art||"rose";
  if(style==="rose"){
    /* the collar round the heart: two cuts and a string of pearls between */
    cut(ring(c,c,34.2),.42);cut(ring(c,c,37.6),.32);var bd="";for(i=0;i<64;i++){var bq=P(35.9,i*2*Math.PI/64);bd+=ring(bq[0],bq[1],.42);}raise(bd,pearl);
    /* the rosette: thirty-six circles cut round the heart, interlaced into lace */
    var gd="";for(i=0;i<36;i++){var gq=P(58.6,i*2*Math.PI/36);gd+=ring(gq[0],gq[1],21);}cut(gd,.28);
    var gd2="";for(i=0;i<36;i++){var gq2=P(58.6,(i+.5)*2*Math.PI/36);gd2+=ring(gq2[0],gq2[1],13.2);}cut(gd2,.2,.8);
    cut(ring(c,c,81.4),.42);cut(ring(c,c,83.5),.26);
    /* the twisted band: two waves cut against each other, a pearl in every second eye */
    var w1=[],w2=[];for(i=0;i<=720;i++){var tw=i/720*2*Math.PI;w1.push(P(89.6+2.3*Math.sin(40*tw),tw));w2.push(P(89.6-2.3*Math.sin(40*tw),tw));}cut(line(w1)+"Z"+line(w2)+"Z",.3);
    var pp="";for(i=0;i<40;i++){var pq=P(89.6,(i*2+.5)*Math.PI/40);pp+=ring(pq[0],pq[1],.62);}raise(pp,pearl,{stroke:pline,"stroke-width":".2"});
    cut(ring(c,c,95.4),.3);
    /* the chapter ring: fine cuts, the engine logo's stars at the hours */
    cut(ticks(96.6,99.4,120,function(m){return m%10===0;}),.24);cut(ticks(96,100,120,function(m){return m%5!==0||m%10===0;}),.34);
    for(i=0;i<12;i++){var sq=P(98,i*Math.PI/6);estar(sq[0],sq[1],1.75);}
    cut(ring(c,c,100.6),.45);}
  else if(style==="orrery"){
    cut(ring(c,c,34.2),.42);cut(ticks(35.2,37.6,72),.22);
    /* the orbits, each a double cut; between them a fine dotted path */
    [50,68,86].forEach(function(r){cut(ring(c,c,r),.42);cut(ring(c,c,r+1.5),.2,.85);});
    [59,77].forEach(function(r){var dd="";for(i=0;i<120;i++){var dq=P(r,i*3*D);dd+=ring(dq[0],dq[1],.3);}body.appendChild(svg("path",{d:dd,fill:groove,opacity:".75"}));});
    /* the six rooms, raised as Home's orbs, each with its wake along its orbit and its fine rim */
    [[50,200,3],[50,20,3],[68,112,3.6],[68,292,3.6],[86,66,4.2],[86,246,4.2]].forEach(function(o){var r=o[0],t=o[1],q=P(r,t*D),rr=o[2];
      body.appendChild(svg("path",{d:outline(arc(c,c,r+.75,t-38,t-rr*1.2/r/D,26),.05,rr*.95,0,1),fill:nt?"rgba(190,170,245,.38)":"rgba(106,63,181,.28)"}));
      cut(ring(q[0],q[1],rr+1.5),.22);raise(ring(q[0],q[1],rr),"url(#"+id+"o)");sp.appendChild(svg("path",{d:ring(q[0],q[1],rr*.3)}));});
    /* two constellations of the engine logo's stars, joined by hairlines, and stars between */
    var C1=[[61,150,1.7],[66,164,1.2],[74,171,1.5],[79,160,1.1]],C2=[[43,318,1.5],[55,332,1.2],[62,316,1.6]],
        lone=[[41,75,1],[57,244,1.2],[76,36,1.1],[80,206,1.3],[45,262,.95],[77,96,1],[93.5,128,.9],[94,300,.9],[42,140,.9]];
    [C1,C2].forEach(function(C){var pts=C.map(function(q){return P(q[0],q[1]*D);});cut(line(pts),.2,.9);});
    C1.concat(C2,lone).forEach(function(q){var p=P(q[0],q[1]*D);estar(p[0],p[1],q[2]);});
    /* the edge: a scale of fine cuts, pearls between the long ones */
    cut(ring(c,c,92.6),.32);cut(ticks(96,99.4,120,function(m){return m%10===0;}),.22);cut(ticks(93.6,100.2,120,function(m){return m%10!==0;}),.36);
    var ep="";for(i=0;i<12;i++){var eq=P(94.8,(i*30+15)*D);ep+=ring(eq[0],eq[1],.8);}raise(ep,pearl,{stroke:pline,"stroke-width":".2"});cut(ring(c,c,100.6),.45);}
  else{
    /* the limb: its scale of cuts and pearls at the hours */
    cut(ring(c,c,100.6),.45);cut(ring(c,c,96.2),.3);cut(ring(c,c,92.4),.3);cut(ticks(96.2,100.6,72,function(m){return m%6===0;}),.24);cut(ticks(92.4,100.6,72,function(m){return m%6!==0;}),.34);
    var lp2="";for(i=0;i<12;i++){var lq=P(94.3,(i*30+15)*D);lp2+=ring(lq[0],lq[1],.75);}raise(lp2,pearl,{stroke:pline,"stroke-width":".2"});
    /* the plate: tropics and equator, the meridian, and the nested circles of altitude, finely cut */
    var cp=svg("clipPath",{id:id+"p"});cp.appendChild(svg("circle",{cx:c,cy:c,r:"86"}));df.appendChild(cp);
    cut(ring(c,c,37),.3);cut(ring(c,c,57.6),.26,.85);cut(ring(c,c,86),.34);
    var al="";for(i=1;i<=9;i++){var rr2=5+i*8.6,cy2=c-36+i*3.4;al+=ring(c,cy2,rr2);}
    var alg=svg("g",{"clip-path":"url(#"+id+"p)"});lp.appendChild(alg);var alg2=svg("g",{"clip-path":"url(#"+id+"p)"});eng.appendChild(alg2);
    alg.appendChild(svg("path",{d:al,fill:"none",stroke:lipc,"stroke-width":".26",opacity:".8"}));alg2.appendChild(svg("path",{d:al,fill:"none",stroke:groove,"stroke-width":".2",opacity:".8"}));
    cut("M"+c+" "+f(c-86)+"L"+c+" "+f(c+86)+"M"+f(c-86)+" "+c+"L"+f(c+86)+" "+c,.22,.7);
    /* the rete, in violet enamel over the plate: its outer ring, the ecliptic set off-centre with its scale, struts and flame pointers */
    var ey=c-24.5;raise(ring(c,c,87.8)+ring(c,c,86.2),vio,{"fill-rule":"evenodd"});
    raise(ring(c,ey,61.2)+ring(c,ey,57.6),vio,{"fill-rule":"evenodd"});
    var et="";for(i=0;i<72;i++){var ta=i*5*D,r0=i%6===0?58:59.2,qa=[c+r0*Math.cos(ta),ey+r0*Math.sin(ta)],qb=[c+60.8*Math.cos(ta),ey+60.8*Math.sin(ta)];et+="M"+f(qa[0])+" "+f(qa[1])+"L"+f(qb[0])+" "+f(qb[1]);}
    body.appendChild(svg("path",{d:et,stroke:nt?"rgba(255,255,255,.75)":"rgba(255,255,255,.9)","stroke-width":".28",fill:"none"}));
    /* struts from the ecliptic down to the outer ring, curling */
    var st2="";[[1,1],[-1,1]].forEach(function(m){var sx=m[0];
      st2+=outline(bez([[c+sx*30,ey+54,c+sx*36,ey+68,c+sx*24,ey+82,c+sx*34,c+80.8]]),.95,.7,.35,1);
      st2+=outline(bez([[c+sx*52,ey+31,c+sx*64,ey+40,c+sx*60,ey+60,c+sx*74,c+41.5]]),.9,.7,.3,1);});
    st2+=outline(bez([[c,ey+61.2,c+1.8,c+48,c-1.8,c+64,c,c+86.2]]),1,.8,.3,1);raise(st2,vio);
    /* the flame pointers, each ending at a star's place in a pearl, the engine logo's star at its root */
    var fl="",roots=[],tips=[];[[c+sx2(1)*30,ey+54,c+sx2(1)*44,c+57]].length;
    function sx2(v){return v;}
    [[-1,0],[1,0]].forEach(function(m){var sx=m[0];
      [[c+sx*33.2,ey+64,c+sx*44,ey+70,c+sx*48,ey+76,c+sx*47.5,ey+86],[c+sx*65.4,ey+46.5,c+sx*72,ey+46,c+sx*76,ey+42,c+sx*80.5,ey+36],
       [c+sx*48,ey-38,c+sx*44,ey-48,c+sx*48,ey-56,c+sx*38,ey-60],[c+sx*12,ey+59,c+sx*14,ey+70,c+sx*18,ey+76,c+sx*13.5,ey+82],
       [c+sx*58,ey+20,c+sx*66,ey+16,c+sx*70,ey+8,c+sx*76,ey+6]].forEach(function(q){fl+=outline(bez([q]),1.35,.04,.3,.7);roots.push([q[0],q[1]]);tips.push([q[6],q[7]]);});});
    raise(fl,vio);roots.forEach(function(q){estar(q[0],q[1],1.7);});var tp="";tips.forEach(function(q){tp+=ring(q[0],q[1],.62);});raise(tp,pearl,{stroke:pline,"stroke-width":".2"});
    cut(ring(c,c,34.2),.42);}
  g0.__rel={sh:sh,hi:hi,lp:lp,sp:sp,a:null};}

/* a layer's facets lit as they stand now: turned by A, with the room's light moved by L */
function vcFacets(sv,A,nt,VI,VN){var r=A*Math.PI/180,c=Math.cos(r),sn=Math.sin(r),o=[0,0,0],F=sv.__fc;
  for(var i=0;i<F.length;i++){var q=F[i],nx=q.nx*c-q.ny*sn,ny=q.nx*sn+q.ny*c,ux=q.u[0]*c-q.u[1]*sn,uy=q.u[0]*sn+q.u[1]*c;
    if(q.mat==="s")vcSilver(nx-.1*ux,ny-.1*uy,q.nz,nt,o);else vcEnamel(nx-.1*ux,ny-.1*uy,q.nz,q.mat==="n"?VN:VI,nt,o);q.s0.setAttribute("stop-color",vcHex(o));
    if(q.mat==="s")vcSilver(nx+.12*ux,ny+.12*uy,q.nz,nt,o);else vcEnamel(nx+.12*ux,ny+.12*uy,q.nz,q.mat==="n"?VN:VI,nt,o);q.s1.setAttribute("stop-color",vcHex(o));}}
/* the chapter ring that turns: its engraved degrees, the stages' names in the violet enamel, and the inlay of the stages done */
function vcRingSvg(list,nt){var n=list.length,c=157,s0=svg("svg",{viewBox:"0 0 314 314","class":"skv-scale","aria-hidden":"true"}),s=svg("g",{"class":"rot"}),i,a,f=function(v){return v.toFixed(2);};s0.appendChild(s);
  var s1=svg("svg",{viewBox:"0 0 314 314","class":"skv-scale skv-names","aria-hidden":"true"}),sN=svg("g",{"class":"rot"});s1.appendChild(sN);
  var ang=function(k){return -90+k*360/n;},near=function(deg){for(var k=0;k<n;k++){var dd=Math.abs(((deg-ang(k))%360+540)%360-180);if(dd<6.6)return true;}return false;};
  var ink=nt?"rgba(232,226,248,.5)":"rgba(34,18,70,.72)",g=svg("g",{stroke:ink,"stroke-linecap":"butt"});s.appendChild(g);
  for(i=0;i<180;i++){var dg=i*2-90;if(near(dg))continue;a=dg*Math.PI/180;var big=i%5===0,r0=big?142.8:146;
    g.appendChild(svg("line",{x1:f(c+r0*Math.cos(a)),y1:f(c+r0*Math.sin(a)),x2:f(c+149.2*Math.cos(a)),y2:f(c+149.2*Math.sin(a)),"stroke-width":big?".9":".55"}));}
  s.appendChild(svg("circle",{cx:c,cy:c,r:"149.7",fill:"none",stroke:ink,"stroke-width":".5"}));
  /* the inlay: from the first stage to the last one done */
  var p=0;while(p<n&&list[p].done)p++;
  if(p>0){var a0=ang(0),a1=p>=n?a0+359.99:ang(p-1),big2=(a1-a0)>180?1:0,R=137.4,P0=[c+R*Math.cos(a0*Math.PI/180),c+R*Math.sin(a0*Math.PI/180)],P1=[c+R*Math.cos(a1*Math.PI/180),c+R*Math.sin(a1*Math.PI/180)];
    var dd="M"+f(P0[0])+" "+f(P0[1])+"A"+R+" "+R+" 0 "+big2+" 1 "+f(P1[0])+" "+f(P1[1]);
    s.appendChild(svg("path",{d:dd,fill:"none",stroke:nt?"#2a1650":"#3a2470","stroke-width":"3.2","stroke-linecap":"round","stroke-opacity":".55"}));
    s.appendChild(svg("path",{d:dd,fill:"none",stroke:nt?"#8f6ce0":"#7b56cc","stroke-width":"2.2","stroke-linecap":"round","class":"inl"}));}
  /* the names, engraved in the enamel and filled with silver, each under its own medallion */
  var id="skv"+(++VC.n),df=svg("defs",{});s1.insertBefore(df,sN);
  for(i=0;i<n;i++){var A=ang(i),a2=(A-62)*Math.PI/180,a3=(A+62)*Math.PI/180,R2=117.6,pid=id+"p"+i;
    df.appendChild(svg("path",{id:pid,d:"M"+f(c+R2*Math.cos(a2))+" "+f(c+R2*Math.sin(a2))+"A"+R2+" "+R2+" 0 0 1 "+f(c+R2*Math.cos(a3))+" "+f(c+R2*Math.sin(a3))}));
    var t=svg("text",{"class":"nm"+(list[i].cur?" cur":"")}),tp=svg("textPath",{href:"#"+pid,startOffset:"50%","text-anchor":"middle"});tp.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href","#"+pid);
    tp.textContent=String(list[i].name||"").toUpperCase();t.appendChild(tp);sN.appendChild(t);
    /* a small four-pointed star between two names */
    var B=(A+180/n)*Math.PI/180,sx=c+120.7*Math.cos(B),sy=c+120.7*Math.sin(B),k=3.3,m=.8;
    sN.appendChild(svg("path",{"class":"sep",d:"M"+f(sx)+" "+f(sy-k)+"Q"+f(sx+m)+" "+f(sy-m)+" "+f(sx+k)+" "+f(sy)+"Q"+f(sx+m)+" "+f(sy+m)+" "+f(sx)+" "+f(sy+k)+"Q"+f(sx-m)+" "+f(sy+m)+" "+f(sx-k)+" "+f(sy)+"Q"+f(sx-m)+" "+f(sy-m)+" "+f(sx)+" "+f(sy-k)+"z"}));}
  return [s0,s1];}
/* a stage's medallion: a polished silver setting round a flat enamel face, its numeral raised in silver (pearl enamel ahead, violet done) */
function vcMedal(num,kind,nt){var s=svg("svg",{viewBox:"0 0 30 30","class":"md","aria-hidden":"true"}),id="skv"+(++VC.n),df=svg("defs",{}),o=[0,0,0],n=[0,0,0];s.appendChild(df);
  function lg(gid,stops){var g=svg("linearGradient",{id:gid,x1:".15",y1:".1",x2:".85",y2:".9"});stops.forEach(function(p){g.appendChild(svg("stop",{offset:p[0],"stop-color":p[1]}));});df.appendChild(g);}
  function sil(a,ph){vcN(a,0,ph,n);vcSilver(n[0],n[1],n[2],nt,o);return vcHex(o);}
  var ul=-2.36,dr=.785;/* up-left and down-right */
  lg(id+"o",[["0",sil(.9,ul)],[".5",sil(.9,-.8)],["1",sil(.9,dr)]]);lg(id+"i",[["0",sil(-.9,ul)],[".5",sil(-.9,-.8)],["1",sil(-.9,dr)]]);
  var done=kind!=="ahead",E=done?(nt?[.42,.28,.74]:[.44,.29,.77]):(nt?[.86,.83,.93]:[.97,.955,.99]),e0=[0,0,0],e1=[0,0,0];/* violet for a stage done (and the one in hand), pearl for one ahead */
  vcEnamel(-.12,-.15,1,E,nt,e0);vcEnamel(.12,.15,1,E,nt,e1);lg(id+"e",[["0",vcHex(e0)],["1",vcHex(e1)]]);
  s.appendChild(svg("circle",{cx:"15",cy:"15",r:"12.1",fill:nt?"rgba(4,1,12,.6)":"rgba(26,12,56,.32)"}));
  s.appendChild(svg("circle",{cx:"15",cy:"15",r:"11.5",fill:"url(#"+id+"o)"}));
  s.appendChild(svg("circle",{cx:"15",cy:"15",r:"10.35",fill:"url(#"+id+"i)"}));
  s.appendChild(svg("circle",{cx:"15",cy:"15",r:"9.4",fill:"url(#"+id+"e)"}));
  s.appendChild(svg("path",{d:"M8.2 12.4A7.6 7.6 0 0 1 12.6 7.9",fill:"none",stroke:"#fff","stroke-opacity":done?".45":".9","stroke-width":".8","stroke-linecap":"round"}));
  if(kind==="cur")s.appendChild(svg("circle",{cx:"15",cy:"15",r:"8.3",fill:"none",stroke:nt?"#e6dcfa":"#f1ebfc","stroke-opacity":".75","stroke-width":".55"}));
  var tc=done?(nt?"#f6f1ff":"#fbf8ff"):(nt?"#3a2470":"#4a2c90"),sc=done?"rgba(14,4,36,.55)":"rgba(255,255,255,.9)";
  var t0=svg("text",{x:"15",y:"18.6","text-anchor":"middle","class":"nmr",fill:sc,transform:"translate(.35 .45)"});t0.textContent=num;s.appendChild(t0);
  var t1=svg("text",{x:"15",y:"18.6","text-anchor":"middle","class":"nmr",fill:tc});t1.textContent=num;s.appendChild(t1);return s;}
/* 6.97: a stage's medallion made as the case is made. Her words (12 November 2026): "I want the balls inside of the compass on the Career
   Studio to be refined and elevated to match the texture and look of the compass but I still want to be animated match the page and the
   rest of Ingenium." So each is painted pixel by pixel through the case's own light (vcSilver, vcEnamel), as the case's reeded edge and
   bezel are: a milled silver edge (44 ribs, as a coin's), a polished bevel, a sunken groove, and a domed face of enamel over an
   engine-turned guilloché (waved rings and a fine sunburst, seen through the glaze); its numeral raised in polished silver on violet, or
   inlaid in violet on pearl; the stage in hand ringed in a fine silver wire. Violet for a stage done and the one in hand, pearl for one
   ahead, as before. A glint crosses each dome on Home's engine button's clock (7 seconds; 14 for a stage not in hand), one after another */
var VCM={};
function vcFontIn(){try{return !D.fonts||!D.fonts.check||D.fonts.check('700 40px "Home Cormorant"');}catch(e){return true;}}
function vcMask(num){var k="m"+num;if(VCM[k])return VCM[k];var ready=vcFontIn();var Z=4,N=32*Z,cv=D.createElement("canvas");cv.width=cv.height=N;var g=cv.getContext("2d"),h=new Float32Array(N*N);
  try{g.textAlign="center";g.textBaseline="alphabetic";g.fillStyle="#000";g.font="700 "+(num.length>2?40:46)+'px "Home Cormorant","Cormorant Garamond",Cormorant,"Iowan Old Style",Palatino,Georgia,serif';
    try{g.filter="blur(1.2px)";}catch(e){}g.fillText(num,N/2,N/2+15.5);var a=g.getImageData(0,0,N,N).data;for(var i=0;i<N*N;i++)h[i]=a[i*4+3]/255;}catch(e){}
  var Mk={N:N,Z:Z,h:h};if(ready)VCM[k]=Mk;return Mk;}
function vcMaskAt(M,x,y){var u=x*M.Z+M.N/2-.5,v=y*M.Z+M.N/2-.5,i=Math.floor(u),j=Math.floor(v);if(i<0||j<0||i>=M.N-1||j>=M.N-1)return 0;var fu=u-i,fv=v-j,N=M.N,h=M.h;
  return h[j*N+i]*(1-fu)*(1-fv)+h[j*N+i+1]*fu*(1-fv)+h[(j+1)*N+i]*(1-fu)*fv+h[(j+1)*N+i+1]*fu*fv;}
function vcMedalUrl(num,kind,nt){var key="md2|"+num+"|"+kind+"|"+(nt?1:0);if(VC.urls[key])return VC.urls[key];var ready=vcFontIn();
  var M=vcMask(num),n=[0,0,0],fc=[0,0,0],nc=[0,0,0],done=kind!=="ahead",E=done?(nt?[.42,.28,.74]:[.44,.29,.77]):(nt?[.86,.83,.93]:[.97,.955,.99]),V=nt?[.5,.36,.86]:[.4,.25,.74];
  var R=15.6,EDGE=14.4,BEZ=12.8,GRV=12.2,WIRE0=10.9,WIRE1=11.6;
  /* 6.98: painted at the medallions' original size, at her word: "I want the size of the little balls inside of Vocatio's compass to be
     remain smaller in their original sizes, they look really odd bigger." 6.96's medallion was 11.5 of its 30 units across its silver rim,
     drawn into 32 px: 12.27 px. The whole design is drawn in its own units (R 15.6) and scaled by SC, so it keeps every proportion */
  var SC=11.5*32/30/R;
  VC.urls[key]=vcPaint(32,0,R*SC,function(x,y,r,ph,o){var t,a,q,b,k;x/=SC;y/=SC;r/=SC;
    if(r>=EDGE){t=(R-r)/(R-EDGE);a=1.05*(1-2*t);q=ph*44/(2*Math.PI);q-=Math.floor(q);b=(2*q-1)*.75;vcN(a,b,ph,n);vcSilver(n[0],n[1],n[2],nt,o);
      k=.8+.2*Math.sin(Math.PI*q);o[0]*=k;o[1]*=k;o[2]*=k;return 1;}
    if(r>=BEZ){t=(EDGE-r)/(EDGE-BEZ);a=.95*(1-2*t)+.12;vcN(a,0,ph,n);vcSilver(n[0],n[1],n[2],nt,o);return 1;}
    if(r>=GRV){t=(BEZ-r)/(BEZ-GRV);a=-.75+1.5*t;vcN(a,0,ph,n);vcSilver(n[0],n[1],n[2],nt,o);k=.46+.3*Math.abs(2*t-1);o[0]*=k;o[1]*=k;o[2]*=k;return 1;}
    if(kind==="cur"&&r>=WIRE0&&r<=WIRE1){t=(WIRE1-r)/(WIRE1-WIRE0);a=.9*(1-2*t);vcN(a,0,ph,n);vcSilver(n[0],n[1],n[2],nt,o);return 1;}
    /* the dome: enamel over guilloché */
    var dome=Math.asin(Math.min(.98,(r/GRV)*.52)),gw=.5+.5*Math.cos(2*Math.PI*(r*1.2+.85*Math.sin(ph*10))),sb=.5+.5*Math.cos(ph*64),pf=1+.11*(gw-.5)+.045*(sb-.5);
    vcN(dome,0,ph,n);vcEnamel(n[0],n[1],n[2],[E[0]*pf,E[1]*pf,E[2]*pf],nt,fc);
    var h=vcMaskAt(M,x,y);if(h<=.03){o[0]=fc[0];o[1]=fc[1];o[2]=fc[2];return 1;}
    /* the numeral: its relief from the mask's slope, raised in silver on violet, inlaid in violet on pearl */
    var e=.45,dx=vcMaskAt(M,x+e,y)-vcMaskAt(M,x-e,y),dy=vcMaskAt(M,x,y+e)-vcMaskAt(M,x,y-e),kk=done?3.4:-2.6;
    var nx=n[0]-kk*dx,ny=n[1]-kk*dy,nz=n[2];if(done)vcSilver(nx,ny,nz,nt,nc);else vcEnamel(nx,ny,nz,V,nt,nc);
    /* its edge engraved: a fine dark line where the relief meets the enamel, so the numeral reads at any size */
    var gm=Math.min(1,Math.sqrt(dx*dx+dy*dy)*3.2),cut=1-(done?.42:.3)*gm*(1-vcS(.35,.7,h));
    var m=vcS(.05,.34,h);o[0]=(fc[0]+(nc[0]-fc[0])*m)*cut;o[1]=(fc[1]+(nc[1]-fc[1])*m)*cut;o[2]=(fc[2]+(nc[2]-fc[2])*m)*cut;return 1;},3);
  var u=VC.urls[key];if(!ready)delete VC.urls[key];return u;}
function vcMedal2(num,kind,nt,i){var f=D.createElement("span");f.className="md2";var im=D.createElement("img");im.className="md2-img";im.alt="";im.setAttribute("aria-hidden","true");im.draggable=false;
  im.src=vcMedalUrl(num,kind,nt);f.appendChild(im);
  /* drawn again once Cormorant is in, if it was not when the compass first stood */
  if(!vcFontIn())try{D.fonts.load('700 40px "Home Cormorant"').then(function(){if(im.isConnected)im.src=vcMedalUrl(num,kind,nt);},function(){});}catch(e){}var gl=D.createElement("i");gl.className="md2-glint";gl.setAttribute("aria-hidden","true");gl.style.setProperty("--md-d",(i*1.4).toFixed(1)+"s");f.appendChild(gl);return f;}
/* the index on the bezel: a slim arrow of violet enamel framed in silver, over the stage in hand */
function vcIndex(nt){var s=svg("svg",{viewBox:"0 0 20 30","aria-hidden":"true"}),id="skv"+(++VC.n),df=svg("defs",{}),o=[0,0,0],n=[0,0,0];s.appendChild(df);
  function sil(nx,ny){vcSilver(nx,ny,1,nt,o);return vcHex(o);}
  var g=svg("linearGradient",{id:id+"f",x1:"0",y1:"0",x2:"1",y2:"1"});[["0",sil(-.5,-.6)],[".45",sil(0,-.3)],["1",sil(.6,.6)]].forEach(function(p){g.appendChild(svg("stop",{offset:p[0],"stop-color":p[1]}));});df.appendChild(g);
  var e0=[0,0,0],e1=[0,0,0];vcEnamel(-.3,-.2,1,nt?[.44,.29,.76]:[.46,.3,.8],nt,e0);vcEnamel(.3,.2,1,nt?[.44,.29,.76]:[.46,.3,.8],nt,e1);
  var g2=svg("linearGradient",{id:id+"e",x1:"0",y1:"0",x2:"1",y2:"1"});g2.appendChild(svg("stop",{offset:"0","stop-color":vcHex(e0)}));g2.appendChild(svg("stop",{offset:"1","stop-color":vcHex(e1)}));df.appendChild(g2);
  s.appendChild(svg("path",{d:"M10 29.2L3.2 6.4Q10 3.2 16.8 6.4z",fill:"url(#"+id+"f)",stroke:nt?"rgba(6,2,16,.6)":"rgba(30,14,64,.4)","stroke-width":".5","stroke-linejoin":"round"}));
  s.appendChild(svg("path",{d:"M10 25.6L5.4 7.9Q10 5.8 14.6 7.9z",fill:"url(#"+id+"e)"}));
  s.appendChild(svg("path",{d:"M10 25.6L5.4 7.9Q7.4 7 9.4 6.7",fill:"none",stroke:"#fff","stroke-opacity":".5","stroke-width":".5"}));
  var c0=[0,0,0];vcSilver(-.45,-.5,1,nt,c0);var c1=[0,0,0];vcSilver(.5,.55,1,nt,c1);
  var g3=svg("radialGradient",{id:id+"r",cx:".35",cy:".3",r:".75"});g3.appendChild(svg("stop",{offset:"0","stop-color":vcHex(c0)}));g3.appendChild(svg("stop",{offset:"1","stop-color":vcHex(c1)}));df.appendChild(g3);
  s.appendChild(svg("circle",{cx:"10",cy:"4.6",r:"3.1",fill:"url(#"+id+"r)",stroke:nt?"rgba(6,2,16,.6)":"rgba(30,14,64,.35)","stroke-width":".4"}));return s;}
/* the crystal: a window's reflection, crisp, very faint, and the light caught along its edge */
function vcGlass(nt){var s=svg("svg",{viewBox:"0 0 314 314","aria-hidden":"true"}),id="skv"+(++VC.n),df=svg("defs",{}),c=157;s.appendChild(df);
  var g=svg("linearGradient",{id:id+"g",x1:"0",y1:"0",x2:"1",y2:"1"});[["0",nt?".16":".42"],[".45",nt?".05":".14"],[".7","0"]].forEach(function(p){var st=svg("stop",{offset:p[0],"stop-color":"#fff"});st.setAttribute("stop-opacity",p[1]);g.appendChild(st);});df.appendChild(g);
  var P=function(R,dg){var a=dg*Math.PI/180;return (c+R*Math.cos(a)).toFixed(2)+" "+(c+R*Math.sin(a)).toFixed(2);};
  s.appendChild(svg("path",{d:"M"+P(152,188)+"A152 152 0 0 1 "+P(152,282)+"Q"+(c-40)+" "+(c-98)+" "+P(152,188)+"z",fill:"url(#"+id+"g)"}));
  s.appendChild(svg("path",{d:"M"+P(153.5,18)+"A153.5 153.5 0 0 1 "+P(153.5,72),fill:"none",stroke:"#fff","stroke-opacity":nt?".22":".55","stroke-width":".9","stroke-linecap":"round"}));
  return s;}
/* the turning: one spring, as Home's keys move (it overshoots a hair and settles), the medallions kept upright as it goes */
/* while it turns, the ring's engraving turns as one picture (smooth); at rest it is drawn at its angle, so its names stay crisp */
function vcApply(st){if(!st.ring)return;var T=st.T,tx=T.toFixed(3),i;if(st.marks)st.marks.style.transform="rotate("+tx+"deg)";for(i=0;i<st.ups.length;i++)st.ups[i].style.transform="rotate("+(-T).toFixed(3)+"deg)";
  [st.svg,st.svg2].forEach(function(sv){var g=sv&&sv.querySelector("g.rot");if(!g)return;
    if(st.raf){sv.style.transform="rotate("+tx+"deg)";if(g.__r!==0){g.removeAttribute("transform");g.__r=0;}}
    else{sv.style.transform="";if(g.__r!==tx){g.setAttribute("transform","rotate("+tx+" 157 157)");g.__r=tx;}}});}
function vcAim(st,goal,kick,quiet){st.goal=goal;if(kick)st.v+=kick;if(quiet||still()){if(st.raf){cancelAnimationFrame(st.raf);st.raf=0;}st.T=goal;st.v=0;vcApply(st);return;}
  if(!st.raf){st.last=0;st.raf=requestAnimationFrame(function step(ts){var dt=st.last?Math.min(.034,(ts-st.last)/1000):.016;st.last=ts;var a=46*(st.goal-st.T)-10.4*st.v;st.v+=a*dt;st.T+=st.v*dt;vcApply(st);
    if(Math.abs(st.goal-st.T)<.03&&Math.abs(st.v)<.08){st.T=st.goal;st.v=0;st.raf=0;st.last=0;vcApply(st);if(st.onLand)try{st.onLand();}catch(e){}return;}
    st.raf=requestAnimationFrame(step);});}}
/* the instrument's parts, built once, in the depth of the Offline Project's apps (her words, 13 November 2026: "give it the Offline
   Project's apps' signature layered depth animated popped out 3D look and animation"), as the engine logo is built: a cast shadow
   beneath, the case's thickness in stacked rims, the dial sunk inside it, the rose, the medallions and the logo standing off the dial,
   the crystal and the case above. The whole sways on its own as the logo does, leans to the pointer on a spring, rises when it appears */
function vcBuild(){var box=mk("div","skc skv"),tilt=mk("div","skv-tilt"),idle=mk("div","skv-idle"),P=mk("div","skv-rise");box.appendChild(tilt);tilt.appendChild(idle);idle.appendChild(P);
  box.setAttribute("role","group");box.setAttribute("aria-label","The dial: your counsellor's stages");
  P.appendChild(mk("i","skv-under"));
  for(var z=1;z<=9;z+=2.6){var e=mk("i","skv-side");e.style.setProperty("--z",z);e.setAttribute("aria-hidden","true");P.appendChild(e);}
  var base=mk("div","skv-base");P.appendChild(base);
  var dial=mk("div","skv-dial skv-lay");dial.appendChild(img("skv-dialimg"));P.appendChild(dial);
  /* the outer ring inside, raised: the band stands off the dial and the chapter ring off the band, each on its wall, each casting its shadow */
  var ring=mk("div","skv-ring"),band=mk("div","skv-band"),chap=mk("div","skv-chap");
  var well=mk("div","skv-well");well.appendChild(img("skv-wellimg"));ring.appendChild(well);
  ring.appendChild(mk("i","skv-chapsh"));
  [9.8,11.2,12.6,14,15.4,16.8,18.2].forEach(function(z){var w2=mk("i","skv-chapwall out");w2.style.setProperty("--z",z);ring.appendChild(w2);});
  ring.appendChild(mk("i","skv-bandsh"));[20.2,21.6,23,24.4,25.8,27.2].forEach(function(z){var w=mk("i","skv-chapwall bside");w.style.setProperty("--z",z);ring.appendChild(w);});
  ring.appendChild(mk("i","skv-dialsh"));[29.2,30.6,32].forEach(function(z){var w=mk("i","skv-dialwall");w.style.setProperty("--z",z);ring.appendChild(w);});
  band.appendChild(img("skv-bandimg"));ring.appendChild(band);

  chap.appendChild(img("skv-chapimg"));ring.appendChild(chap);P.appendChild(ring);P.appendChild(mk("i","skv-inner"));
  var LZ=[36.5,40,43.5],lays=[];
  LZ.forEach(function(z,i){var sh=mk("div","skv-lay skv-lsh"),ed=mk("div","skv-lay skv-led"),tp=mk("div","skv-lay skv-ltop");sh.style.setProperty("--z",(z-2.8));ed.style.setProperty("--z",(z-1.3));tp.style.setProperty("--z",z);
    P.appendChild(sh);P.appendChild(ed);P.appendChild(tp);lays.push({sh:sh,ed:ed,tp:tp});});
  P.appendChild(mk("i","skv-seatsh"));
  [46.5,48,49.5,51].forEach(function(z){var e=mk("i","skv-seatside");e.style.setProperty("--z",z);e.setAttribute("aria-hidden","true");P.appendChild(e);});
  var seat=mk("div","skv-seat"),key=mk("div","skv-key");seat.appendChild(img("skv-collar"));seat.appendChild(key);P.appendChild(seat);
  var gl=mk("div","skv-glass"),gs=mk("div","skv-glassart"),rip=mk("div","skv-ripples");gl.appendChild(gs);gl.appendChild(rip);P.appendChild(gl);
  var bwb=mk("div","skv-bow skv-bowback");bwb.appendChild(img("skv-bowimg"));P.appendChild(bwb);
  var cs=mk("div","skv-case");cs.appendChild(img("skv-domeimg"));cs.appendChild(img("skv-caseimg"));P.appendChild(cs);
  var bw=mk("div","skv-bow skv-bowtop");bw.appendChild(img("skv-bowimg"));P.appendChild(bw);
  var ix=mk("div","skv-index");ix.setAttribute("aria-hidden","true");P.appendChild(ix);
  var st={T:0,v:0,goal:0,raf:0,last:0,ups:[],ring:ring,onLand:null,tilt:tilt,h:0,hx:0,hy:0,lx:0,ly:0,vx:0,vy:0,t0:0,mraf:0,
    kz:0,kv:0,swT:-9,swS:1,shT:-9,box:box,key:key,bandImg:band.firstChild,chapImg:chap.firstChild,wellImg:well.firstChild,band:band,chap:chap,dial:dial,dome:cs.firstChild,glassArt:gs,rip:rip,seat:seat,lays:lays,onSound:null,onPick:null,
    /* the inside's harmony: the dial and the great points turn slowly one way and back, the violet points twice as fast the other way, the
       fine points three times; all meet again every ninety seconds. Each: its turn now, its speed, its harmony speed and its symmetry */
    H:[{a:0,v:4,s:4,p:1.8},{a:0,v:-12,s:-12,p:45},{a:0,v:8,s:8,p:90},{a:0,v:-4,s:-4,p:90}],RX:0,RY:0,SW:0,tH:0};box.__vc=st;
  function snd(k){}
  box.addEventListener("pointermove",function(e){var d=st.press;if(d&&d.id===e.pointerId){if(d.hit.part==="logo")vcKeySend(st,"pointermove",e);return;}if(e.pointerType!=="mouse")return;
    if(!(e.target&&e.target.closest&&e.target.closest(".r175-seal"))){var hk=vcPick(st,e.clientX,e.clientY),on=!!(hk&&hk.part==="logo");if(on!==!!st.overKey){st.overKey=on;vcKeySend(st,on?"pointerenter":"pointerleave",e);}if(on)vcKeySend(st,"pointermove",e);
      vcMdOver(st,hk&&hk.part==="medal"&&!(e.target&&e.target.closest&&e.target.closest(".skv-md"))?hk.i:-1);}var r=box.getBoundingClientRect();if(!r.width)return;st.hold=1;box.classList.add("hov");
    st.hx=Math.max(-.6,Math.min(.6,(e.clientX-r.left)/r.width-.5));st.hy=Math.max(-.6,Math.min(.6,(e.clientY-r.top)/r.height-.5));
    vcMove(st);},{passive:true});
  box.addEventListener("pointerleave",function(e){st.hold=0;box.classList.remove("hov");vcMdOver(st,-1);if(st.overKey){st.overKey=false;vcKeySend(st,"pointerleave",e);}});
  /* a press anywhere on the compass: what was pressed is found from its own geometry, front to back */
  box.addEventListener("pointerdown",function(e){if(e.button!=null&&e.button!==0)return;if(e.target&&e.target.closest&&e.target.closest(".skv-md,.r175-seal"))return;
    var hit=vcPick(st,e.clientX,e.clientY);if(!hit)return;st.press={id:e.pointerId,hit:hit,x0:e.clientX,y0:e.clientY,t:performance.now(),moved:0};
    if(hit.part==="logo")vcKeySend(st,"pointerdown",e);
    try{box.setPointerCapture(e.pointerId);}catch(x){}if(hit.part!=="medal")e.preventDefault();});
  function release(e){var d=st.press;if(!d||d.id!==e.pointerId)return;st.press=null;var h=d.hit,moved=Math.sqrt(Math.pow(e.clientX-d.x0,2)+Math.pow(e.clientY-d.y0,2));
    if(h.part==="logo"){vcKeySend(st,"pointerup",e);if(moved<=12){var k=st.key.querySelector(".r175-seal");if(k)k.click();vcRipple(st,h);}return;}
    if(moved>8)return;vcPress(st,h);}
  box.addEventListener("pointerup",release);box.addEventListener("pointercancel",function(e){var d=st.press;st.press=null;if(d&&d.hit.part==="logo")vcKeySend(st,"pointercancel",e);});
  function knock(el){el.classList.remove("knock");void el.offsetWidth;el.classList.add("knock");}
  st.knock=knock;st.snd=snd;
  vcMove(st);return box;}
/* the compass's own geometry: a point on the screen found on the face of each part, from the front back (the eye 1100px off, as the head's) */
function vcMat(st){var rx=st.RX*Math.PI/180,ry=st.RY*Math.PI/180,rz=st.SW*Math.PI/180,cx=Math.cos(rx),sx=Math.sin(rx),cy=Math.cos(ry),sy=Math.sin(ry);
  /* rotateX then rotateY, as written: the matrix is RX * RY */
  return {m:[[cy,0,sy],[sx*sy,cx,-sx*cy],[-cx*sy,sx,cx*cy]],rz:rz,kz:st.kz};}
function vcOn(st,X,Y,Zp){var M=vcMat(st),m=M.m,O=[260,232,0],E=[260,203.52,1100],D=[X-E[0],Y-E[1],-E[2]];
  var n=[m[0][2],m[1][2],m[2][2]],W0=[O[0]+m[0][2]*Zp,O[1]+m[1][2]*Zp,O[2]+m[2][2]*Zp+M.kz],den=n[0]*D[0]+n[1]*D[1]+n[2]*D[2];if(Math.abs(den)<1e-6)return null;
  var t=(n[0]*(W0[0]-E[0])+n[1]*(W0[1]-E[1])+n[2]*(W0[2]-E[2]))/den,H=[E[0]+t*D[0]-O[0],E[1]+t*D[1]-O[1],E[2]+t*D[2]-O[2]-M.kz];
  var lx=m[0][0]*H[0]+m[1][0]*H[1]+m[2][0]*H[2],ly=m[0][1]*H[0]+m[1][1]*H[1]+m[2][1]*H[2];
  if(M.rz){var py=-220.5,yy=ly-py,c=Math.cos(-M.rz),s2=Math.sin(-M.rz),x2=lx*c-yy*s2,y2=lx*s2+yy*c;lx=x2;ly=y2+py;}
  return {x:260+lx,y:232+ly};}
function vcPick(st,cx,cy){var r=st.box.getBoundingClientRect();if(!r.width)return null;var X=(cx-r.left)/r.width*520,Y=(cy-r.top)/r.height*424,q,d,a,i;
  function at(Z){q=vcOn(st,X,Y,Z);if(!q)return false;d=Math.sqrt(Math.pow(q.x-260,2)+Math.pow(q.y-232,2));a=Math.atan2(q.y-232,q.x-260)*180/Math.PI;return true;}
  function near(base,step,len,w,tol){var k,best=999;for(k=0;k<360/step;k++){var dd=Math.abs(((a-(base+k*step))%360+540)%360-180)*Math.PI/180;if(dd<best)best=dd;}var half=Math.atan2(w*Math.max(0,1-d/len),Math.max(d,1))+tol;return d<len&&best<half;}
  if(at(52)&&d<31.5)return {part:"logo",x:q.x,y:q.y,gx:q.x,gy:q.y};
  if(at(43.5)&&near(st.H[3].a-90,90,102,13.5,.04))return {part:"lay",i:3,x:q.x,y:q.y,gx:q.x,gy:q.y};
  if(at(40)&&near(st.H[2].a-45,90,76,9.5,.04))return {part:"lay",i:2,x:q.x,y:q.y,gx:q.x,gy:q.y};
  if(at(36.5)&&near(st.H[1].a-67.5,45,60,3.6,.07))return {part:"lay",i:1,x:q.x,y:q.y,gx:q.x,gy:q.y};
  if(at(33)&&d<107.5)return {part:"lay",i:0,x:q.x,y:q.y,gx:q.x,gy:q.y};
  if(at(28)&&d>=107.5&&d<131.5)return {part:"ring",x:q.x,y:q.y,gx:q.x,gy:q.y};
  if(at(24)&&st.ups.length){var n=st.ups.length;for(i=0;i<n;i++){var A=(-90+i*360/n+st.T)*Math.PI/180,mx=260+142*Math.cos(A),my=232+142*Math.sin(A);if(Math.pow(q.x-mx,2)+Math.pow(q.y-my,2)<15*15)return {part:"medal",i:i,x:q.x,y:q.y,gx:q.x,gy:q.y};}}
  if(at(19)&&d>=131.5&&d<=152.5)return {part:"ring",x:q.x,y:q.y,gx:q.x,gy:q.y};
  if(at(10)){if(q.x>=232&&q.x<=288&&q.y>=-14&&q.y<=58&&d>178)return {part:"bow",x:q.x,y:q.y};if(d>=152.5&&d<=181)return {part:"rim",x:q.x,y:q.y};}
  return null;}
/* 6.98: the medallion the compass finds under the pointer (i, or -1 for none): it lifts, its glint quickens, its stage's name shows,
   and it sounds as a key under the pointer does. When the pointer reaches the medallion itself, its own :hover and the key sounds do this */
function vcMdOver(st,i){if(still())i=-1;if(st.overMd===i)return;st.overMd=i;
  [].forEach.call(st.box.querySelectorAll(".skv-md.md-over"),function(b){b.classList.remove("md-over");});
  var b=i>=0&&st.ups[i]?st.ups[i].querySelector(".skv-md"):null;if(b){b.classList.add("md-over");try{if(W.IngSound&&IngSound.play)IngSound.play("hover");}catch(e){}}
  try{if(st.onHover)st.onHover(b?i:-1);}catch(e){}}
function vcMdDown(st,i){var b=st.ups[i]?st.ups[i].querySelector(".skv-md"):null;if(!b)return;try{if(W.IngSound&&IngSound.play)IngSound.play("keys");}catch(e){}
  b.classList.add("md-down");setTimeout(function(){b.classList.remove("md-down");},160);}
/* what a press does, part by part */
function vcPress(st,h){if(still()&&h.part!=="medal")return;var snd=st.snd;vcRipple(st,h);
  if(h.part==="medal"){vcMdDown(st,h.i);if(st.onPick)st.onPick(h.i);return;}
  if(h.part==="bow"){st.swT=performance.now();st.swS=h.x<260?-1:1;snd("bow");}
  else if(h.part==="rim"){st.kv=-150;st.shT=performance.now();snd("rim");}
  else if(h.part==="ring"){var dx=h.x-260,dy=h.y-232;st.v+=(dx>0?1:-1)*(dy<0?1:-1)*150;vcAim(st,st.goal);snd("ring");}
  else if(h.part==="lay"){var L=st.H[h.i];L.v+=(L.s>0?1:-1)*(h.i===0?120:220);L.kick=1;snd("ring");}
  vcMove(st);}
/* turning the logo by hand */
/* hands a press or a pointer to Home's engine button, as if the browser had found it */
function vcKeySend(st,type,e){var k=st.key&&st.key.querySelector(".r175-seal");if(!k)return;var o={bubbles:type!=="pointerenter"&&type!=="pointerleave",cancelable:true,clientX:e.clientX,clientY:e.clientY,pointerId:e.pointerId||1,pointerType:e.pointerType||"mouse",button:0,buttons:type==="pointerup"?0:1,isPrimary:true};
  var ev;try{ev=new PointerEvent(type,o);}catch(x){try{ev=new MouseEvent(type.replace("pointer","mouse"),o);}catch(y){return;}}k.dispatchEvent(ev);}
function vcRipple(st,h){if(h.gx==null||still())return;var r=mk("i","skv-ripple");r.style.left=(h.gx-103).toFixed(1)+"px";r.style.top=(h.gy-75).toFixed(1)+"px";st.rip.appendChild(r);setTimeout(function(){if(r.parentNode)r.parentNode.removeChild(r);},1000);}
/* the motion: one clock. The sway is the logo's (it turns a little to one side and back, and never stops), the lean follows the pointer
   on a spring and the sway quietens under it; minimal motion and the system's reduced motion leave the instrument still */
function vcMove(st){if(st.mraf)return;if(still()){st.tilt.style.transform="";return;}
  st.mraf=requestAnimationFrame(function fr(ts){st.mraf=0;if(!st.t0)st.t0=ts;var dt=st.lt?Math.min(.034,(ts-st.lt)/1000):.016;st.lt=ts;
    if(still()||!st.tilt.isConnected){st.lt=0;return;}
    var hd=st.tilt.offsetParent===null||(st.head&&st.head.classList.contains("is-away"));if(hd){st.lt=0;clearTimeout(st.poll);st.poll=setTimeout(function(){vcMove(st);},450);return;}
    st.tH+=dt;st.h+=((st.hold?1:0)-st.h)*Math.min(1,dt*4);var w=st.tH*2*Math.PI/10,iy=11*Math.sin(w),ix=-4*Math.sin(w);
    var ty=st.hold?st.hx*28:0,tx=st.hold?-st.hy*20:0;st.vy+=(62*(ty-st.ly)-11*st.vy)*dt;st.ly+=st.vy*dt;st.vx+=(62*(tx-st.lx)-11*st.vx)*dt;st.lx+=st.vx*dt;
    var k=1-.7*st.h,RX=ix*k+st.lx,RY=iy*k+st.ly;st.RX=RX;st.RY=RY;
    st.kv+=(-190*st.kz-15*st.kv)*dt;st.kz+=st.kv*dt;
    var now=performance.now(),sw=0,swt=(now-st.swT)/1000;if(swt<4.5)sw=st.swS*7*Math.exp(-swt/1.25)*Math.sin(2*Math.PI*swt/1.35);st.SW=sw;
    st.tilt.style.transform="translateZ("+st.kz.toFixed(2)+"px) rotateX("+RX.toFixed(3)+"deg) rotateY("+RY.toFixed(3)+"deg)"+(sw?" translateY(-220.5px) rotateZ("+sw.toFixed(3)+"deg) translateY(220.5px)":"");
    var L=Math.max(-40,Math.min(40,1.6*RY-1.2*RX)),sht=(now-st.shT)/900,shim=sht>=0&&sht<1?360*(1-Math.pow(1-sht,3)):0;
    if(st.bandImg)st.bandImg.style.transform="rotate("+L.toFixed(2)+"deg)";if(st.chapImg)st.chapImg.style.transform="rotate("+L.toFixed(2)+"deg)";if(st.wellImg)st.wellImg.style.transform="rotate("+L.toFixed(2)+"deg)";if(st.dome)st.dome.style.transform="rotate("+(L+shim).toFixed(2)+"deg)";if(st.glassArt)st.glassArt.style.transform="rotate("+(L*.55).toFixed(2)+"deg)";
    /* the inside in harmony: each layer turns at its harmony speed; a press throws it on, and when it has slowed it falls back into step */
    for(var i=0;i<st.H.length;i++){var Ly=st.H[i],tgt=Ly.s*st.tH;if(Math.abs(Ly.v-Ly.s)>2){Ly.v+=(Ly.s-Ly.v)*Math.min(1,dt/1.5);}
      else{var e=((tgt-Ly.a)%Ly.p+Ly.p*1.5)%Ly.p-Ly.p/2;Ly.v=Ly.s+Math.max(-6,Math.min(6,.9*e));}
      Ly.a+=Ly.v*dt;}
    vcLayers(st,L);
    st.mraf=requestAnimationFrame(fr);});}
/* the layers turned, their shadows kept below them on the right, their facets relit when they have turned a degree or the light has moved */
function vcLayers(st,L){var R=st.rose;var d=st.dial;if(d)d.style.transform="translateZ(33px) rotate("+st.H[0].a.toFixed(2)+"deg)";if(!R)return;
  var rl=R.rings&&R.rings.__rel;if(rl){var A0=st.H[0].a;if(rl.a===null||Math.abs(A0-rl.a)>1.2){rl.a=A0;var t0=-A0*Math.PI/180,c0=Math.cos(t0),s0=Math.sin(t0),
    put=function(g,x,y){g.setAttribute("transform","translate("+(x*c0-y*s0).toFixed(2)+" "+(x*s0+y*c0).toFixed(2)+")");};put(rl.sh,.42,.62);put(rl.hi,-.3,-.38);if(rl.lp)put(rl.lp,.3,.38);if(rl.sp)put(rl.sp,-1.15,-1.3);}}
  for(var i=0;i<3;i++){var A=st.H[i+1].a,ly=st.lays[i],tx=A.toFixed(2);ly.tp.style.transform="translateZ("+ly.tp.style.getPropertyValue("--z")+"px) rotate("+tx+"deg)";ly.ed.style.transform="translateZ("+ly.ed.style.getPropertyValue("--z")+"px) translate(.5px,.8px) rotate("+tx+"deg)";
    ly.sh.style.transform="translateZ("+ly.sh.style.getPropertyValue("--z")+"px) translate(2px,3.2px) rotate("+tx+"deg)";
    var key=Math.round((A-L)*1.5);if(ly.__k!==key){ly.__k=key;vcFacets(R.layers[i].top,A-L,R.nt,R.VI,R.VN);}}}
/* the engine button in its seat: Home's own (sealKey), or whatever key the caller makes */
function vcKey(box,key){var slot=box.querySelector(".skv-key");if(!slot||!key)return;while(slot.firstChild)slot.removeChild(slot.firstChild);slot.appendChild(key);
  var e=key.querySelector(".isl-edge");if(e&&!e.querySelector(".ox-rim"))for(var k=4;k>=1;k--){var r=mk("i","ox-rim");r.setAttribute("aria-hidden","true");r.style.setProperty("--k",String(k));e.insertBefore(r,e.firstChild);}}
/* the theme's drawing: the metal is drawn once for day and once for night */
function vcTheme(box,nt){var pk=nt?"n":"d";if(box.__pk===pk)return;box.__pk=pk;var st=box.__vc;
  box.querySelector(".skv-bandimg").src=vcBaseUrl(nt,"band");box.querySelector(".skv-wellimg").src=vcBaseUrl(nt,"well");box.querySelector(".skv-chapimg").src=vcBaseUrl(nt,"chap");box.querySelector(".skv-dialimg").src=vcDialUrl(nt);box.querySelector(".skv-caseimg").src=vcCaseUrl(nt,"rope");box.querySelector(".skv-domeimg").src=vcCaseUrl(nt,"dome");
  [].forEach.call(box.querySelectorAll(".skv-bowimg"),function(e){e.src=vcBowUrl(nt);});box.querySelector(".skv-collar").src=vcCollarUrl(nt,26.5,31.5);
  var R=vcRose(nt),dl=box.querySelector(".skv-dial"),old=dl.querySelector("svg");if(old)dl.removeChild(old);dl.appendChild(R.rings);
  if(st){st.rose=R;st.lays.forEach(function(ly,i){[ly.sh,ly.ed,ly.tp].forEach(function(e){while(e.firstChild)e.removeChild(e.firstChild);});ly.sh.appendChild(R.layers[i].shd);ly.ed.appendChild(R.layers[i].edge);ly.tp.appendChild(R.layers[i].top);ly.__k=null;});}
  var gl=box.querySelector(".skv-glassart");while(gl.firstChild)gl.removeChild(gl.firstChild);gl.appendChild(vcGlass(nt));
  var ix=box.querySelector(".skv-index");while(ix.firstChild)ix.removeChild(ix.firstChild);ix.appendChild(vcIndex(nt));}
/* the ring's markings and medallions for these stages; onPick(i) when one is pressed, onHover(i or -1) for its name tag */
function vcStages(box,list,nt,onPick,onHover){var st=box.__vc;st.onHover=onHover||null;st.overMd=-1;[st.svg,st.svg2,st.marks].forEach(function(e){if(e&&e.parentNode)e.parentNode.removeChild(e);});st.ups=[];
  var n=list.length,two=vcRingSvg(list,nt);st.svg=two[0];st.svg2=two[1];st.chap.appendChild(st.svg);st.band.appendChild(st.svg2);st.marks=mk("div","skv-marks");st.chap.appendChild(st.marks);
  list.forEach(function(s,i){var a=(-90+i*360/n)*Math.PI/180,sl=mk("div","skv-slot"),up=mk("div","skv-up"),b=mk("button","skv-md");
    sl.style.left=(157+142*Math.cos(a)-16).toFixed(2)+"px";sl.style.top=(157+142*Math.sin(a)-16).toFixed(2)+"px";b.type="button";
    var kind=s.cur?"cur":s.done?"done":"ahead";b.setAttribute("data-kind",kind);if(s.done)b.classList.add("is-done");
    b.setAttribute("aria-label",ROMAN[i]+". "+s.name+(s.done?", done":"")+(s.cur?", the stage in hand":s.next?", the next stage":""));if(s.cur)b.setAttribute("aria-current","step");
    up.appendChild(mk("i","skv-mdsh"));up.appendChild(mk("i","skv-mdside"));b.appendChild(vcMedal2(ROMAN[i],kind,nt,i));
    if(onHover){b.addEventListener("pointerenter",function(){onHover(i);});b.addEventListener("focus",function(){onHover(i);});b.addEventListener("pointerleave",function(){onHover(-1);});b.addEventListener("blur",function(){onHover(-1);});}
    b.addEventListener("click",function(e){e.preventDefault();if(onPick)onPick(i);});st.onPick=onPick;up.appendChild(b);sl.appendChild(up);st.marks.appendChild(sl);st.ups.push(up);});
  vcApply(st);}

function careerHero(){if(!W.ING_COMPASS)return null;var pg=$("page-career"),cs=$("cs");if(!pg||!cs)return null;if(CP.h&&CP.h.el.isConnected)return CP.h;
  var lede=(cs.querySelector(".c-head p")||{}).textContent||"Your profile, the posts, programmes and grants you are weighing, and what you send. Everything stays on this device.";
  var H=hero({title:"Vocatio",eyebrow:"Vocatio · the compass of your path",lede:lede,
    keys:[{pri:true,ico:ICO.compass,txt:"Your counsellor",id:"skCareerGo",fn:function(){var S=W.IngCareer.state();S.ui.room="mentor";S.ui.show="work";try{saveState();}catch(e){}W.IngCareer.render();scrollTo(cs);}},
      {ico:ICO.plus,txt:"Bring one in",fn:function(){var S=W.IngCareer.state();S.ui.room="apps";S.ui.open="new";S.ui.show="work";try{saveState();}catch(e){}W.IngCareer.render();scrollTo(cs);}}],
    says:"Your counsellor's stages, one after another: what you have, your record, what you want, where you could go, and this week.",hint:"Press a stage to turn the compass to it."});
  var who=cs.querySelector(".c-who");if(who)H.keys.appendChild(who);
  var box=vcBuild(),st=box.__vc;st.head=H.el;st.onLand=function(){tick();};H.el.classList.add("skv-head");
  /* at its heart, Home's own engine button: Home's animation and Home's click (her words, 13 November 2026) */
  vcKey(box,sealKey("skv-hx","Ingenium's engine button at the heart of the compass. Press it, as on Home.",54));
  H.sway.appendChild(box);H.dial=box;cs.parentNode.insertBefore(H.el,cs);CP.h=H;CP.key="";CP.T=null;CP.painted=false;return H;}
/* 6.95: the heads' keys act where they stand and never move the page (her words, 13 November 2026: "please remove the scrolling down
   the page effect from it and everywhere else. I dislike it.") */
function scrollTo(el){}
/* pressing the seal: the bezel makes one full turn and settles where it was, the index ticks, the seal glows (its own flourish, R175) */
function sealPlay(box){var k=box&&box.querySelector(".skv-key .r175-seal");if(k)k.click();}
function tick(){var ix=CP.h&&CP.h.dial&&CP.h.dial.querySelector(".skv-index");if(!ix||still())return;ix.classList.remove("tick");void ix.offsetWidth;ix.classList.add("tick");}
/* the turn: the bezel and everything on it turn together; each stage turns back by as much, so its numeral stays upright */
function turnTo(T,quiet){var b=CP.h&&CP.h.dial;if(!b||!b.__vc)return;CP.T=T;vcAim(b.__vc,T,0,!!quiet);}
function nearest(T,prev){if(prev==null)return T;while(T-prev>180)T-=360;while(T-prev<-180)T+=360;return T;}
function tagFor(H,i,s,n){var o=H.obj;[].forEach.call(o.querySelectorAll(".skh-label.tag"),function(l){l.parentNode.removeChild(l);});if(i===CP.cur||i<0)return;
  var T=H.dial&&H.dial.__vc?H.dial.__vc.goal:(CP.T||0),th=(angleOf(i,n)+T)*Math.PI/180,x=260+204*Math.cos(th),y=232+204*Math.sin(th);label(o,x,y,Math.cos(th),Math.sin(th),ROMAN[i]+" · "+s.name,s.done?"done":s.next?"next":"","tag");}
function paintCompass(){var H=careerHero();if(!H)return;var data=stagesNow(),nt=night(),key=JSON.stringify(data)+(nt?"n":"d");if(key===CP.key)return;CP.key=key;var o=H.obj,box=H.dial,st=box.__vc;
  vcTheme(box,nt);[].forEach.call(o.querySelectorAll(".skh-label"),function(l){l.parentNode.removeChild(l);});
  if(!data||!data.list.length)return;var n=data.list.length,cur=0;data.list.forEach(function(s,i){if(s.cur)cur=i;});CP.cur=cur;CP.data=data;
  vcStages(box,data.list,nt,function(i){var s=data.list[i],C=W.IngCareer,S=C.state();S.ui.room="mentor";S.ui.show="work";
      try{if(data.room==="counsellor"&&W.IngCounsel){IngCounsel.go(s.k);}else{C.mentor.state().step=s.k;try{saveState();}catch(e){}C.render();}}catch(e){}},
    function(i){if(i<0)[].forEach.call(o.querySelectorAll(".skh-label.tag"),function(l){l.parentNode.removeChild(l);});else tagFor(H,i,data.list[i],n);});
  label(o,304,14,1,0,ROMAN[cur]+" · "+data.list[cur].name,data.list.every(function(x){return x.done;})?"every stage done":data.list[cur].done?"done":"in hand");
  H.hint.innerHTML="";H.hint.appendChild(D.createTextNode("Your bearing: "));H.hint.appendChild(mk("b",null,ROMAN[cur]+" · "+data.list[cur].name));H.hint.appendChild(D.createTextNode(". Press a stage to turn the compass to it."));
  var target=nearest(-cur*(360/n),CP.painted?st.goal:null);
  if(!CP.painted&&!still()){st.T=target+360/n*1.5;st.goal=st.T;st.v=0;vcApply(st);vcAim(st,target);}else vcAim(st,target,0,!CP.painted);
  CP.T=target;CP.painted=true;}
function dressCareer(){if(!W.ING_COMPASS)return false;var pg=$("page-career");if(!pg||!$("cs"))return false;pg.classList.add("sk-on");paintCompass();return true;}

/* ================= THE SEAL KEY: Ingenium's own seal (R104's layers), its pointer and flourishes as Home's (R175), its sound (r176) ================= */
/* the flourishes, as Home's seal plays them, with the transform each layer already uses (so they play on every browser Ingenium runs in) */
var SFL={
  spin:function(P,d){return [an(P.star,[{transform:"rotate(0deg)"},{transform:"rotate("+(d*360)+"deg)"}],{duration:1150,easing:"cubic-bezier(.25,.9,.3,1)"}),
    an(P.ring,[{transform:"rotate(0deg)"},{transform:"rotate("+(-d*360)+"deg)"}],{duration:1300,easing:"cubic-bezier(.3,.8,.3,1)"}),
    an(P.heart,[{transform:"scale(1)"},{transform:"scale(1.14)",offset:.35},{transform:"scale(1)"}],{duration:900,easing:"ease-in-out"})];},
  pulse:function(P){return [an(P.ring,[{transform:"scale(1)"},{transform:"scale(1.13)",offset:.28},{transform:"scale(.97)",offset:.6},{transform:"scale(1.03)",offset:.8},{transform:"scale(1)"}],{duration:950,easing:"ease-out"}),
    ripple(P,0),ripple(P,220)];},
  hop:function(P){return [an(P.fx,[{transform:"translateY(0) scale(1,1)"},{transform:"translateY(3%) scale(1.06,.92)",offset:.12},{transform:"translateY(-18%) scale(.97,1.04)",offset:.42},
      {transform:"translateY(0) scale(1.05,.94)",offset:.7},{transform:"translateY(-3%) scale(1,1)",offset:.85},{transform:"translateY(0) scale(1,1)"}],{duration:900,easing:"ease-in-out"})];},
  wobble:function(P,d){return [an(P.fx,[{transform:"perspective(260px) rotateY(0deg)"},{transform:"perspective(260px) rotateY("+(d*30)+"deg)",offset:.2},{transform:"perspective(260px) rotateY("+(-d*20)+"deg)",offset:.45},
      {transform:"perspective(260px) rotateY("+(d*11)+"deg)",offset:.68},{transform:"perspective(260px) rotateY("+(-d*4)+"deg)",offset:.86},{transform:"perspective(260px) rotateY(0deg)"}],{duration:1250,easing:"ease-in-out"})];},
  twirl:function(P,d){return [an(P.fx,[{transform:"rotate(0deg) scale(1)"},{transform:"rotate("+(d*180)+"deg) scale(.9)",offset:.45},{transform:"rotate("+(d*360)+"deg) scale(1.04)",offset:.8},{transform:"rotate("+(d*360)+"deg) scale(1)"}],{duration:1100,easing:"cubic-bezier(.2,.8,.25,1)"}),
    an(P.star,[{transform:"rotate(0deg)"},{transform:"rotate("+(-d*180)+"deg)"}],{duration:1100,easing:"cubic-bezier(.2,.8,.25,1)"})];},
  beat:function(P){return [an(P.heart,[{transform:"scale(1)"},{transform:"scale(1.3)",offset:.14},{transform:"scale(1.04)",offset:.3},{transform:"scale(1.24)",offset:.46},{transform:"scale(1)",offset:.7},{transform:"scale(1)"}],{duration:1100,easing:"ease-in-out"}),
    an(P.ring,[{transform:"scale(1)"},{transform:"scale(1.04)",offset:.14},{transform:"scale(1)",offset:.3},{transform:"scale(1.03)",offset:.46},{transform:"scale(1)"}],{duration:1100,easing:"ease-in-out"})];},
  grand:function(P,d){return SFL.spin(P,d).concat(SFL.hop(P),[an(P.ripple,[{opacity:.65,transform:"scale(.86)"},{opacity:0,transform:"scale(1.7)"}],{duration:1100,easing:"ease-out"})]);}};
var SORDER=["spin","pulse","hop","wobble","twirl","beat"];
function an(el,fr,o){if(!el||!el.animate)return null;try{return el.animate(fr,o);}catch(e){return null;}}
function ripple(P,delay){return an(P.ripple,[{opacity:.6,transform:"scale(.86)"},{opacity:0,transform:"scale(1.55)"}],{duration:950,delay:delay||0,easing:"ease-out"});}
function sparts(k){var isl=k.querySelector(".isl");return {fx:k.querySelector(".r175-fx"),glow:k.querySelector(".r175-glow"),ripple:k.querySelector(".r175-ripple"),isl:isl,
  ring:isl&&isl.querySelector(".isl-ring > svg"),star:isl&&isl.querySelector(".isl-star > svg"),heart:isl&&isl.querySelector(".isl-heart > svg")};}
function sglow(P,strong){an(P.glow,[{opacity:0,transform:"scale(.82)"},{opacity:strong?1:.85,transform:"scale(1.04)",offset:.3},{opacity:0,transform:"scale(1.12)"}],{duration:still()?700:1000,easing:"ease-out"});}
/* the key: it sways at rest; under a mouse it leans to follow it and lifts, its light following; pressed, it sinks; let go, it knocks and
   ripples; each press plays one of Home's flourishes (every seventh, the grand one) with Home's sound, and nothing else happens */
function wireSeal(k){var busy=false,again=false,last="",count=0,downAt=0;
  function isl(){return k.querySelector(".isl");}
  k.addEventListener("pointerenter",function(e){var s=isl();if(s&&e.pointerType==="mouse"&&!still())s.classList.add("hover");});
  k.addEventListener("pointermove",function(e){var s=isl();if(!s)return;var r=s.getBoundingClientRect();if(!r.width)return;var x=(e.clientX-r.left)/r.width,y=(e.clientY-r.top)/r.height;
    s.style.setProperty("--gx",(x*100).toFixed(1)+"%");s.style.setProperty("--gy",(y*100).toFixed(1)+"%");
    if(e.pointerType==="mouse"&&!still()){x=Math.max(-.25,Math.min(1.25,x));y=Math.max(-.25,Math.min(1.25,y));s.style.setProperty("--ry",((x-.5)*28).toFixed(1)+"deg");s.style.setProperty("--rx",(-(y-.5)*24).toFixed(1)+"deg");}},{passive:true});
  k.addEventListener("pointerleave",function(){var s=isl();if(!s)return;s.classList.remove("hover","down");s.style.setProperty("--rx","0deg");s.style.setProperty("--ry","0deg");});
  k.addEventListener("pointerdown",function(){var s=isl();downAt=Date.now();if(s&&!still()){s.classList.remove("knock");s.classList.add("down");}},{passive:true});
  ["pointerup","pointercancel"].forEach(function(t){k.addEventListener(t,function(e){var s=isl();if(!s)return;var was=s.classList.contains("down");s.classList.remove("down");if(e.pointerType!=="mouse")s.classList.remove("hover");
    if(was&&t==="pointerup"&&!still()){void s.offsetWidth;s.classList.add("knock");clearTimeout(s.__kn);s.__kn=setTimeout(function(){s.classList.remove("knock");},600);}},{passive:true});});
  function play(){var P=sparts(k);if(still()){sglow(P,false);return;}busy=true;count++;var name=count%7===0?"grand":(function(){var c=SORDER.filter(function(n){return n!==last;});return c[Math.floor(Math.random()*c.length)];})();
    last=name;k.setAttribute("data-flourish",name);try{SFL[name](P,Math.random()<.5?-1:1);}catch(e){}sglow(P,name==="beat"||name==="grand");if(name!=="pulse"&&name!=="grand")ripple(P,0);
    setTimeout(function(){busy=false;if(k.getAttribute("data-flourish")===name)k.removeAttribute("data-flourish");if(again){again=false;play();}},name==="wobble"||name==="grand"?1300:1150);}
  k.addEventListener("click",function(e){e.preventDefault();e.stopPropagation();try{if(W.IngSound&&IngSound.play)IngSound.play("paper",{el:k});}catch(x){}
    if(busy){again=true;sglow(sparts(k),false);return;}play();});
  k.addEventListener("keydown",function(e){if((e.key==="Enter"||e.key===" ")&&!still()){var s=isl();if(s){s.classList.add("down");setTimeout(function(){s.classList.remove("down");},140);}}});}
function sealKey(cls,label,size){var hs=mk("div","hx-seal sk-seal"+(cls?" "+cls:"")),k=mk("button","r175-seal");k.type="button";k.setAttribute("aria-label",label);
  var g=mk("span","r175-glow"),fx=mk("span","r175-fx"),rp=mk("span","r175-ripple");g.setAttribute("aria-hidden","true");rp.setAttribute("aria-hidden","true");
  var se=sealCopy();if(se){se.style.setProperty("--S",(size||58)+"px");fx.appendChild(se);}k.appendChild(g);k.appendChild(fx);k.appendChild(rp);hs.appendChild(k);wireSeal(k);return hs;}
/* ---------------- Lector's seal (6.94): a real vintage wax stamp of the engine logo ----------------
   Her words (13 November 2026): "The seal engine needs to look like a real vintage wax stamp, it looked too shiny and sparkly and smooth in
   the last design, it did not match the layered depth and animated look and effect." "The seal should not say Lector, instead it should
   read Ingenium at the top and the live latin date of the day at the bottom. It needs to also be animated and work like my own digital
   fidget spinner button on the page." So: wax poured unevenly and pressed, its edge rolled and wrinkled where the matrix pushed it out, a
   satin surface with its fine grain and the odd bubble, no gloss and no passing gleam; INGENIUM raised round the top, today's date in Latin
   round the foot (it changes at midnight), the engine logo's star raised in the middle with its heart. All of it is one height field lit
   pixel by pixel, so the relief catches the light as wax does. It stands on the page with its thickness and its shadow, sways a little,
   leans to the pointer, and a press plays one of Home's flourishes with Home's click. */
var LXS={N:0,urls:{},wax:"violet"};
var LXWAX={violet:{day:{base:[.45,.31,.72],deep:[.22,.13,.43],ink:[.95,.93,1],star:[.9,.88,.97],collar:[.86,.83,.95],pearl:[1,.99,1],side0:"#4a2f86",side1:"#2f1b5e"},
                   night:{base:[.4,.27,.66],deep:[.18,.1,.36],ink:[.88,.84,.98],star:[.84,.8,.94],collar:[.8,.76,.92],pearl:[.97,.95,1],side0:"#3b2470",side1:"#1f1240"}},
           white:{day:{base:[1,.995,1],deep:[.9,.87,.96],ink:[.36,.21,.66],star:[.46,.31,.8],collar:[.4,.24,.72],pearl:[1,.99,1],side0:"#ebe6f4",side1:"#dcd4ea",amb:.7,dif:.34,cavK:.22},
                  night:{base:[.25,.185,.38],deep:[.1,.068,.17],ink:[.8,.7,.99],star:[.52,.37,.88],collar:[.45,.3,.82],pearl:[.97,.95,1],side0:"#2b2142",side1:"#171226",amb:.46,dif:.68,cavK:.36}}};
var LXL=(function(){var x=-.5,y=-.62,z=.6,l=Math.sqrt(x*x+y*y+z*z);return [x/l,y/l,z/l];})(),LXH=(function(){var x=LXL[0],y=LXL[1],z=LXL[2]+1,l=Math.sqrt(x*x+y*y+z*z);return [x/l,y/l,z/l];})();
var LXMONTH=["IANUARII","FEBRUARII","MARTII","APRILIS","MAII","IUNII","IULII","AUGUSTI","SEPTEMBRIS","OCTOBRIS","NOVEMBRIS","DECEMBRIS"];
function lxRoman(n){var v=[1000,900,500,400,100,90,50,40,10,9,5,4,1],s=["M","CM","D","CD","C","XC","L","XL","X","IX","V","IV","I"],o="",i;for(i=0;i<v.length;i++)while(n>=v[i]){o+=s[i];n-=v[i];}return o;}
/* today, in Latin, as Inkwell's seal gives its own: the day, the month and the year (XIII · NOVEMBRIS · MMXXVI) */
function lxDate(d){d=d||new Date();return lxRoman(d.getDate())+" · "+LXMONTH[d.getMonth()]+" · "+lxRoman(d.getFullYear());}
function lxNoise(x,y){var s=Math.sin(x*12.9898+y*78.233)*43758.5453;return s-Math.floor(s);}
function lxVN(x,y){var x0=Math.floor(x),y0=Math.floor(y),fx=x-x0,fy=y-y0,a=lxNoise(x0,y0),b=lxNoise(x0+1,y0),c=lxNoise(x0,y0+1),d=lxNoise(x0+1,y0+1),u=fx*fx*(3-2*fx),v=fy*fy*(3-2*fy);return a+(b-a)*u+(c-a)*v+(a-b-c+d)*u*v;}
/* the poured edge: round, but not quite, with a spill here and there */
function lxRb(t){return 45.2+.95*(.55*Math.sin(3*t+.7)+.3*Math.sin(5*t+2.1)+.22*Math.sin(8*t+.4)+.12*Math.sin(13*t+1.3))+1.6*Math.max(0,Math.cos(t-2.2))*Math.max(0,Math.cos(3*(t-2.2)))+.9*Math.max(0,Math.cos(2*(t+.6)))*Math.max(0,Math.cos(5*(t+.6)));}
function lxBlob(r0,amp){var d="",i,t,r;for(i=0;i<=140;i++){t=i/140*Math.PI*2;r=lxRb(t)+(r0-45.2);d+=(i?" L":"M")+(50+r*Math.cos(t)).toFixed(2)+","+(50+r*Math.sin(t)).toFixed(2);}return d+" Z";}
/* the matrix's face as a mask (white where it is raised): the name round the top, the date round the foot, a fine ring, the star, its heart */
function lxArc(g,txt,cx,cy,r,mid,px,sp,foot){g.font="600 "+px+"px \"Home Cormorant\",\"Cormorant Garamond\",Cormorant,Georgia,serif";g.textBaseline="alphabetic";
  var ws=[],W=0,i;for(i=0;i<txt.length;i++){ws.push(g.measureText(txt[i]).width);W+=ws[i]+(i?sp:0);}
  var acc=0;for(i=0;i<txt.length;i++){var th=foot?mid+(W/2-acc-ws[i]/2)/r:mid-(W/2-acc-ws[i]/2)/r;g.save();g.translate(cx+r*Math.cos(th),cy+r*Math.sin(th));g.rotate(foot?th-Math.PI/2:th+Math.PI/2);g.fillText(txt[i],-ws[i]/2,0);g.restore();acc+=ws[i]+sp;}}
function lxStarPath(g,cx,cy,L,ri){g.beginPath();for(var i=0;i<4;i++){var A=i*Math.PI/2-Math.PI/2,P=[cx+L*Math.cos(A),cy+L*Math.sin(A)],B=A+Math.PI/4,Wp=[cx+ri*Math.cos(B),cy+ri*Math.sin(B)],A2=A+Math.PI/2,P2=[cx+L*Math.cos(A2),cy+L*Math.sin(A2)];
    if(!i)g.moveTo(P[0],P[1]);var q1=[cx+.5*(P[0]+Wp[0]-2*cx)*.7,cy+.5*(P[1]+Wp[1]-2*cy)*.7],q2=[cx+.5*(P2[0]+Wp[0]-2*cx)*.7,cy+.5*(P2[1]+Wp[1]-2*cy)*.7];
    g.quadraticCurveTo(q1[0],q1[1],Wp[0],Wp[1]);g.quadraticCurveTo(q2[0],q2[1],P2[0],P2[1]);}g.closePath();}
function lxMask(N,what,date){var c=D.createElement("canvas");c.width=c.height=N;var g=c.getContext("2d"),k=N/100;g.fillStyle="#000";g.fillRect(0,0,N,N);g.fillStyle="#fff";g.strokeStyle="#fff";
  if(what==="ring"){lxArc(g,"INGENIUM",50*k,50*k,31.6*k,-Math.PI/2,8.6*k,2.5*k,false);var fp=date.length>22?4.9:5.4;lxArc(g,date,50*k,50*k,37.4*k,Math.PI/2,fp*k,(date.length>22?.85:1.05)*k,true);
    g.lineWidth=.8*k;g.beginPath();g.arc(50*k,50*k,28.6*k,0,Math.PI*2);g.stroke();g.beginPath();g.arc(15.4*k,50*k,.95*k,0,Math.PI*2);g.arc(84.6*k,50*k,.95*k,0,Math.PI*2);g.fill();}
  else if(what==="star"){lxStarPath(g,50*k,50*k,20.6*k,9.2*k);g.fill();}
  else if(what==="heart"){g.beginPath();g.arc(50*k,50*k,5.6*k,0,Math.PI*2);g.fill();}
  var d=g.getImageData(0,0,N,N).data,m=new Float32Array(N*N),i;for(i=0;i<N*N;i++)m[i]=d[i*4]/255;return m;}
function lxBlur(m,N,r){var t=new Float32Array(N*N),o=new Float32Array(N*N),x,y,k,s,w=2*r+1;
  for(y=0;y<N;y++){s=0;for(k=-r;k<=r;k++)s+=m[y*N+Math.min(N-1,Math.max(0,k))];for(x=0;x<N;x++){t[y*N+x]=s/w;s+=m[y*N+Math.min(N-1,x+r+1)]-m[y*N+Math.max(0,x-r)];}}
  for(x=0;x<N;x++){s=0;for(k=-r;k<=r;k++)s+=t[Math.min(N-1,Math.max(0,k))*N+x];for(y=0;y<N;y++){o[y*N+x]=s/w;s+=t[Math.min(N-1,y+r+1)*N+x]-t[Math.max(0,y-r)*N+x];}}return o;}
/* the wax's own height: a rolled edge, a lip wrinkled where the matrix pushed it out, the step down into the pressed field */
function lxH0(x,y){var dx=x-50,dy=y-50,r=Math.sqrt(dx*dx+dy*dy),t=Math.atan2(dy,dx),d=lxRb(t)-r,h;if(d<0)return -1;
  if(d<3.4)h=3.3*Math.sin(Math.PI/2*d/3.4);else if(d<6.6){var w=(d-3.4)/3.2;h=3.3+.25*Math.sin(Math.PI*w)+.32*(lxVN(t*9,d*.6)-.5)*Math.sin(Math.PI*w);}
  else if(d<8.2){var q=(d-6.6)/1.6;h=3.3-1.9*q*q*(3-2*q);}else h=1.4-.25*Math.min(1,(d-8.2)/34);
  return h+.09*(lxVN(x*1.3,y*1.3)-.5)+.035*(lxVN(x*5.2,y*5.2)-.5);}
/* the layers, lit as wax: the ring (the wax with its name and date), the star, its heart; each its own picture, so Home's flourishes can turn
   the star against the ring as they turn Home's */
function lxWaxUrls(size,dark,date,wax){wax=wax||LXS.wax;var k=wax+(dark?"n":"d")+size+date;if(LXS.urls[k])return LXS.urls[k];var P=LXWAX[wax][dark?"night":"day"],dpr=Math.min(2,Math.max(1,W.devicePixelRatio||1)),N=Math.round(size*dpr*2),u=100/N,i,j;
  var mR=lxBlur(lxMask(N,"ring",date),N,Math.max(1,Math.round(N/380))),mS=lxBlur(lxMask(N,"star"),N,Math.max(1,Math.round(N/240))),mH=lxBlur(lxMask(N,"heart"),N,Math.max(1,Math.round(N/200)));
  /* bubbles: a few small pits in the lip and the field */
  var bub=[];for(i=0;i<9;i++){var a=lxNoise(i*3.1,7.7)*Math.PI*2,rr=12+lxNoise(i*1.7,2.2)*30;bub.push([50+rr*Math.cos(a),50+rr*Math.sin(a),.35+lxNoise(i,4.4)*.5]);}
  var H=new Float32Array(N*N),Hs=new Float32Array(N*N),Hh=new Float32Array(N*N);
  for(j=0;j<N;j++)for(i=0;i<N;i++){var x=(i+.5)*u,y=(j+.5)*u,h=lxH0(x,y),p=j*N+i;if(h<0){H[p]=-1;continue;}
    var dx=x-50,dy=y-50,r=Math.sqrt(dx*dx+dy*dy),inField=r<lxRb(Math.atan2(dy,dx))-8.2;
    for(var b=0;b<bub.length;b++){var bx=x-bub[b][0],by=y-bub[b][1],bd=bx*bx+by*by,br=bub[b][2];if(bd<br*br)h-=.35*(1-bd/(br*br));}
    if(inField)h+=1.55*mR[p];H[p]=h;Hs[p]=inField?1.7*mS[p]:0;
    var hr=Math.sqrt((x-50)*(x-50)+(y-50)*(y-50));Hh[p]=inField&&hr<5.6?(hr<3.7?.5*Math.sqrt(1-hr*hr/13.69)+.25:.25):0;}
  var Hb=(function(){var t=new Float32Array(N*N);for(var q=0;q<N*N;q++)t[q]=H[q]<0?0:H[q];return lxBlur(t,N,Math.max(2,Math.round(N/70)));})();
  /* kind: "ring" (the wax, its lettering painted), "star" (the logo's facets), "heart" (the pearl in its collar) */
  function shade(Hx,alphaOf,kind){var c=D.createElement("canvas");c.width=c.height=N;var g=c.getContext("2d"),im=g.createImageData(N,N),px=im.data,s=1/(2*u);
    for(j=1;j<N-1;j++)for(i=1;i<N-1;i++){var p=j*N+i,a=alphaOf(p);if(a<=0)continue;
      var hL=Hx(p-1),hR=Hx(p+1),hU=Hx(p-N),hD=Hx(p+N),c0=Hx(p);if(hL<0)hL=c0;if(hR<0)hR=c0;if(hU<0)hU=c0;if(hD<0)hD=c0;
      var nx=-(hR-hL)*s*.85,ny=-(hD-hU)*s*.85,nz=1,l=Math.sqrt(nx*nx+ny*ny+1);nx/=l;ny/=l;nz/=l;
      var x=(i+.5)*u-50,y=(j+.5)*u-50,R,G,B;
      if(kind==="star"){/* the logo's facets: each point two planes, lit from above on the left, softened at the edge where the wax rounds it */
        var ph=Math.atan2(y,x),A=Math.round((ph+Math.PI/2)/(Math.PI/2))*(Math.PI/2)-Math.PI/2,dd=Math.atan2(Math.sin(ph-A),Math.cos(ph-A)),sd=dd>0?1:-1,
            ux=Math.cos(A),uy=Math.sin(A),vx=-uy,vy=ux,fx=Math.sin(.5)*vx*sd+.1*ux,fy=Math.sin(.5)*vy*sd+.1*uy,fz=Math.cos(.5),e=Math.min(1,Math.max(0,(mS[p]-.55)/.4));
        nx=nx*(1-e)+fx*e;ny=ny*(1-e)+fy*e;nz=nz*(1-e)+fz*e;l=Math.sqrt(nx*nx+ny*ny+nz*nz);nx/=l;ny/=l;nz/=l;}
      var dl=nx*LXL[0]+ny*LXL[1]+nz*LXL[2],df=Math.max(0,(dl+.3)/1.3),nh=Math.max(0,nx*LXH[0]+ny*LXH[1]+nz*LXH[2]),sp=Math.pow(nh,14)*.13,
          cav=Math.max(0,Math.min(1,(Hb[p]-c0)*.55)),th=Math.min(1,Math.max(0,(c0-1)/2.6)),gr=.95+.1*lxVN(i*.9,j*.9),lt=((P.amb!=null?P.amb:.34)+(P.dif!=null?P.dif:.86)*df)*gr*(1-(P.cavK!=null?P.cavK:.42)*cav);
      R=(P.deep[0]+(P.base[0]-P.deep[0])*(1-.45*th))*lt;G=(P.deep[1]+(P.base[1]-P.deep[1])*(1-.45*th))*lt;B=(P.deep[2]+(P.base[2]-P.deep[2])*(1-.45*th))*lt;
      if(kind==="ring"){var w=Math.min(1,Math.max(0,(mR[p]-.25)/.5)),pl=(.5+.62*df)*(.96+.06*lxVN(i*.9,j*.9));if(w>0){R+=(P.ink[0]*pl-R)*w;G+=(P.ink[1]*pl-G)*w;B+=(P.ink[2]*pl-B)*w;}}
      else if(kind==="star"){var fl=.6+.55*Math.max(0,dl);R=P.star[0]*fl;G=P.star[1]*fl;B=P.star[2]*fl;}
      else if(kind==="heart"){var hr=Math.sqrt(x*x+y*y),pd=.66+.5*Math.max(0,dl);if(hr<3.7){R=P.pearl[0]*pd;G=P.pearl[1]*pd;B=P.pearl[2]*pd;sp*=2.4;}else{var cl=.6+.55*Math.max(0,dl);R=P.collar[0]*cl;G=P.collar[1]*cl;B=P.collar[2]*cl;}}
      R+=sp;G+=sp;B+=sp;
      px[p*4]=Math.min(255,R*255);px[p*4+1]=Math.min(255,G*255);px[p*4+2]=Math.min(255,B*255);px[p*4+3]=Math.round(Math.min(1,a)*255);}
    g.putImageData(im,0,0);var o=D.createElement("canvas");o.width=o.height=Math.round(N/2);var go=o.getContext("2d");go.imageSmoothingEnabled=true;go.drawImage(c,0,0,o.width,o.height);try{return o.toDataURL("image/png");}catch(e){return "";}}
  var ring=shade(function(p){return H[p];},function(p){if(H[p]<0)return 0;var x=(p%N+.5)*u,y=(Math.floor(p/N)+.5)*u,dx=x-50,dy=y-50,d=lxRb(Math.atan2(dy,dx))-Math.sqrt(dx*dx+dy*dy);return Math.min(1,d/(1.2*u));},"ring");
  var star=shade(function(p){return H[p]+Hs[p];},function(p){return Hs[p]>.02?Math.min(1,Hs[p]*2.2):0;},"star");
  var heart=shade(function(p){return H[p]+Hs[p]+Hh[p];},function(p){var x=(p%N+.5)*u-50,y=(Math.floor(p/N)+.5)*u-50,r=Math.sqrt(x*x+y*y);return r<5.6?Math.min(1,(5.6-r)/(1.2*u)):0;},"heart");
  LXS.urls[k]={ring:ring,star:star,heart:heart};return LXS.urls[k];}
/* the wax's thickness below its face, a little darker, as a seal stands on the page */
function lxSideSvg(size,dpx,dark,wax){var P=LXWAX[wax||LXS.wax][dark?"night":"day"],B=lxBlob(45.2,1),d=dpx/size*100,s="",i;
  for(i=4;i>=0;i--)s+='<path d="'+B+'" transform="translate(0 '+(d*i/4).toFixed(2)+')" fill="'+(i===4?P.side1:P.side0)+'"/>';
  return '<svg width="'+size+'" height="'+(size+dpx)+'" viewBox="0 0 100 '+(100+d).toFixed(2)+'" aria-hidden="true" focusable="false" style="position:absolute;left:0;bottom:0;overflow:visible">'+s+'</svg>';}
/* the key: Home's engine button's behaviour (its sway, its lean and lift under a mouse, its sink when pressed and its knock, and one of
   Home's flourishes on each press with Home's click), dressed as the wax stamp */
function lxSealKey(size,opt){opt=opt||{};var hs=mk("div","hx-seal lx-wax"),k=mk("button","r175-seal lxs");k.type="button";k.setAttribute("aria-label","Lector's seal: Ingenium's engine logo pressed in wax, with today's date. Press it for fun.");
  hs.style.setProperty("--S",size+"px");k.style.setProperty("--S",size+"px");
  k.innerHTML='<span class="r175-glow" aria-hidden="true"></span><span class="r175-fx"><span class="isl lxs-isl"><span class="isl-tilt"><span class="isl-idle"><span class="lxs-cast"></span><span class="lxs-side"></span>'+
    '<span class="lxs-face"><span class="isl-layer isl-ring lxs-l"><img class="lxs-ring" alt="" draggable="false"></span><span class="isl-layer isl-star lxs-l"><img class="lxs-star" alt="" draggable="false"></span><span class="isl-layer isl-heart lxs-l"><img class="lxs-heart" alt="" draggable="false"></span></span></span></span></span></span>'+
    '<span class="r175-ripple" aria-hidden="true"></span>';
  if(opt.wax)hs.__wax=opt.wax;if(opt.night!=null)hs.__nt=opt.night;hs.appendChild(k);lxSealPaint(hs);lxWire(k);return hs;}
function lxWire(k){var busy=false,again=false,last="",count=0;function isl(){return k.querySelector(".isl");}
  k.addEventListener("pointerenter",function(e){var s=isl();if(s&&e.pointerType==="mouse"&&!still())s.classList.add("hover");});
  k.addEventListener("pointermove",function(e){var s=isl();if(!s)return;var r=s.getBoundingClientRect();if(!r.width)return;var x=(e.clientX-r.left)/r.width,y=(e.clientY-r.top)/r.height;
    if(e.pointerType==="mouse"&&!still()){x=Math.max(-.25,Math.min(1.25,x));y=Math.max(-.25,Math.min(1.25,y));s.style.setProperty("--ry",((x-.5)*28).toFixed(1)+"deg");s.style.setProperty("--rx",(-(y-.5)*24).toFixed(1)+"deg");}},{passive:true});
  k.addEventListener("pointerleave",function(){var s=isl();if(!s)return;s.classList.remove("hover","down");s.style.setProperty("--rx","0deg");s.style.setProperty("--ry","0deg");});
  k.addEventListener("pointerdown",function(){var s=isl();if(s&&!still()){s.classList.remove("knock");s.classList.add("down");}},{passive:true});
  ["pointerup","pointercancel"].forEach(function(t){k.addEventListener(t,function(e){var s=isl();if(!s)return;var was=s.classList.contains("down");s.classList.remove("down");if(e.pointerType!=="mouse")s.classList.remove("hover");
    if(was&&t==="pointerup"&&!still()){void s.offsetWidth;s.classList.add("knock");clearTimeout(s.__kn);s.__kn=setTimeout(function(){s.classList.remove("knock");},600);}},{passive:true});});
  function parts(){var s=isl();return {fx:k.querySelector(".r175-fx"),glow:k.querySelector(".r175-glow"),ripple:k.querySelector(".r175-ripple"),isl:s,ring:k.querySelector(".lxs-ring"),star:k.querySelector(".lxs-star"),heart:k.querySelector(".lxs-heart")};}
  function play(){var P=parts();if(still()){sglow(P,false);return;}busy=true;count++;var name=count%7===0?"grand":(function(){var c=SORDER.filter(function(n){return n!==last;});return c[Math.floor(Math.random()*c.length)];})();
    last=name;k.setAttribute("data-flourish",name);try{SFL[name](P,Math.random()<.5?-1:1);}catch(e){}sglow(P,name==="beat"||name==="grand");if(name!=="pulse"&&name!=="grand")ripple(P,0);
    setTimeout(function(){busy=false;if(k.getAttribute("data-flourish")===name)k.removeAttribute("data-flourish");if(again){again=false;play();}},name==="wobble"||name==="grand"?1300:1150);}
  k.addEventListener("click",function(e){e.preventDefault();e.stopPropagation();try{if(W.IngSound&&IngSound.play)IngSound.play("paper",{el:k});}catch(x){}if(busy){again=true;sglow(parts(),false);return;}play();});
  k.addEventListener("keydown",function(e){if((e.key==="Enter"||e.key===" ")&&!still()){var s=isl();if(s){s.classList.add("down");setTimeout(function(){s.classList.remove("down");},140);}}});}
/* drawn for the theme and for today; at midnight the date turns over */
function lxSealPaint(hs){var go=function(){lxSealDraw(hs);};try{if(D.fonts&&D.fonts.load){D.fonts.load('600 12px "Home Cormorant"').then(go,go);return;}}catch(e){}go();}
function lxSealDraw(hs){var nt=hs.__nt!=null?hs.__nt:night(),wax=hs.__wax||"white",S=parseFloat(hs.style.getPropertyValue("--S"))||86,date=lxDate(),key=wax+(nt?"n":"d")+S+date;if(hs.__k2===key)return;hs.__k2=key;
  var U=lxWaxUrls(S,nt,date,wax);hs.querySelector(".lxs-ring").src=U.ring;hs.querySelector(".lxs-star").src=U.star;hs.querySelector(".lxs-heart").src=U.heart;
  hs.querySelector(".lxs-side").innerHTML=lxSideSvg(S,hs.__thin?1.5:Math.max(3,Math.round(S/22)),nt,wax);hs.querySelector(".r175-seal").setAttribute("data-date",date);
  clearTimeout(hs.__mid);var now=new Date(),mid=new Date(now.getFullYear(),now.getMonth(),now.getDate()+1,0,0,5);hs.__mid=setTimeout(function(){hs.__k2="";if(hs.isConnected)lxSealDraw(hs);},Math.max(1000,mid-now));}
/* ================= THE DOCUMENTS (Lector): the fan she approved, its seal Ingenium's own seal key ================= */
var LB={h:null,row:null,key:"",cards:[],root:null};
var SUBS={choose:"your apps",read:"part by part",write:"the documents",save:"Word, PDF or the web"};
function lectorState(){var o={steps:[]};try{[].forEach.call(D.querySelectorAll("#lx7 .l-steps li[data-s]"),function(li){var s=li.getAttribute("data-s");o.steps.push({k:s,name:(li.querySelector("span")||li).textContent.trim(),sub:SUBS[s]||"",now:li.classList.contains("now"),done:li.classList.contains("done")});});}catch(e){}
  if(!o.steps.some(function(s){return s.now;})&&o.steps.length)o.steps[0].now=true;return o;}
/* the documents, as The document names them (its tabs), else the three a reading begins with */
function lfDocs(){var box=$("l7Dtabs"),out=[];if(box)[].forEach.call(box.querySelectorAll("button"),function(b,i){var t=(b.textContent||"").trim();if(t)out.push({i:i,name:t,on:b.getAttribute("aria-selected")==="true",done:!!b.querySelector(".dot.done")});});
  if(!out.length)out=[{i:0,name:"Notes and analysis"},{i:1,name:"Project dossier",on:true},{i:2,name:"Appendix"}];return out;}
function lfApps(){try{var L=W.IngLector&&IngLector.state();var a=L&&((L.job&&L.job.apps)||(L.brief&&L.brief.apps))||[];return a.length;}catch(e){return 0;}}
function lfThree(){var d=lfDocs(),f=0;d.forEach(function(x,i){if(x.on)f=i;});if(d.length===1)return [null,d[0],null];if(d.length===2)return [null,d[f],d[1-f]];
  return [d[(f-1+d.length)%d.length],d[f],d[(f+1)%d.length]];}
/* a sheet: a key that is a document, standing in the fan with its own thickness (its leaves behind it) */
function lfCard(){var b=mk("button","lf-card");b.type="button";
  b.innerHTML='<i class="lf-shade"></i><i class="lf-leaf c"></i><i class="lf-leaf b"></i><i class="lf-leaf a"></i><span class="lf-sheet"><canvas class="lf-paper" aria-hidden="true"></canvas><span class="lf-cap"></span><span class="lf-ttl"></span><span class="lf-sub"></span>'+
    '<span class="lf-lines"><i style="width:92%"></i><i style="width:84%"></i><i style="width:88%"></i><i style="width:58%"></i><i class="gap"></i><i style="width:90%"></i><i style="width:80%"></i><i style="width:64%"></i></span>'+
    '<span class="lf-rule"></span><span class="lf-num"></span></span><span class="lf-tab"></span><span class="lf-ribbon"></span>';
  b.addEventListener("pointerdown",function(e){if(e.button!=null&&e.button!==0)return;b.classList.add("lf-down");});
  ["pointerup","pointercancel","pointerleave","blur"].forEach(function(t){b.addEventListener(t,function(){b.classList.remove("lf-down");});});
  b.addEventListener("click",function(e){e.preventDefault();lfOpen(b.__d);});return b;}
function lfSet(e,s){if(e&&e.textContent!==s)e.textContent=s;}
function lfFill(b,d,pos){b.__d=d;var cls="lf-card lf-"+pos+(d&&d.done?" is-done":"")+(b.classList.contains("lf-drawn")?" lf-drawn":"")+(b.classList.contains("lf-ph")?" lf-ph":"");if(b.className!==cls)b.className=cls;b.hidden=!d;if(!d)return;lpPaint(b,d,{band:pos==="f"});
  var n=d.name,cap=(n.replace(/^(Master|The)\s+/i,"").charAt(0)||"·").toUpperCase(),a=lfApps(),sub=a?"from the "+(a===1?"app":a+" apps")+" you chose":"from the apps you choose";
  lfSet(b.querySelector(".lf-tab"),n);lfSet(b.querySelector(".lf-cap"),cap);lfSet(b.querySelector(".lf-ttl"),n);lfSet(b.querySelector(".lf-sub"),sub);lfSet(b.querySelector(".lf-num"),ROMAN[d.i]||String(d.i+1));
  var lab=n+(pos==="f"?", shown in The document":"")+". Press to read it.";if(b.getAttribute("aria-label")!==lab)b.setAttribute("aria-label",lab);}
/* ---------- 6.96: each sheet drawn as the seal is drawn ----------
   Her words (13 November 2026): "Please refine and improve the drawings of the documents on the Lector page header so that they can better
   match the seal logo and its texture, design and animation, right now they just pasted in together but not really connected or in
   unison." So each sheet, with its tab, is a height map lit by the seal's own light (LXL, LXH) in the seal's own colours (the white wax by
   day, the engine button's night by night): laid paper, its fibre and its chain lines, its edges deckled; its initial, its title, its
   numeral and its tab's name pressed into it by letterpress in the seal's violet ink, its text printed small, and the engine's star in
   it as a watermark. Drawn once for a document and a theme, and kept. */
var LP={c:{}};
var LPTEXT={"notes and analysis":"What the reading found, part by part: what each part does, how it is built, what it decides, and what it shows of your work and the way you think.",
  "project dossier":"Each app you chose, set out for a reader: its purpose and its parts, its methods and its decisions, the evidence for each, and what it shows of you.",
  "appendix":"The detail behind the dossier: every part that was read, the sources it names, each quotation with its line, and the notes made on the way."};
var LPC={day:{paper:[.988,.982,.996],deep:[.9,.87,.96],ink:[.36,.21,.66],soft:[.55,.47,.72],amb:.74,dif:.3},
         night:{paper:[.205,.152,.315],deep:[.1,.068,.17],ink:[.8,.7,.99],soft:[.58,.51,.74],amb:.5,dif:.62}};
function lpBox(a,W,H,r){var t=new Float32Array(W*H),o=new Float32Array(W*H),x,y,s,w=2*r+1,row;
  for(y=0;y<H;y++){row=y*W;s=0;for(x=-r;x<=r;x++)s+=a[row+Math.min(W-1,Math.max(0,x))];for(x=0;x<W;x++){t[row+x]=s/w;s+=a[row+Math.min(W-1,x+r+1)]-a[row+Math.max(0,x-r)];}}
  for(x=0;x<W;x++){s=0;for(y=-r;y<=r;y++)s+=t[Math.min(H-1,Math.max(0,y))*W+x];for(y=0;y<H;y++){o[y*W+x]=s/w;s+=t[Math.min(H-1,y+r+1)*W+x]-t[Math.max(0,y-r)*W+x];}}
  return o;}
function lpMask(W,H,k,draw){var c=D.createElement("canvas");c.width=W;c.height=H;var g=c.getContext("2d");g.fillStyle="#000";g.fillRect(0,0,W,H);g.setTransform(k,0,0,k,0,0);g.fillStyle="#fff";g.strokeStyle="#fff";
  try{draw(g);}catch(e){}var d=g.getImageData(0,0,W,H).data,m=new Float32Array(W*H);for(var i=0;i<W*H;i++)m[i]=d[i*4]/255;return m;}
function lpRound(g,x,y,w,h,r,top){g.beginPath();g.moveTo(x+r,y);g.lineTo(x+w-r,y);g.quadraticCurveTo(x+w,y,x+w,y+r);if(top){g.lineTo(x+w,y+h);g.lineTo(x,y+h);}
  else{g.lineTo(x+w,y+h-r);g.quadraticCurveTo(x+w,y+h,x+w-r,y+h);g.lineTo(x+r,y+h);g.quadraticCurveTo(x,y+h,x,y+h-r);}g.lineTo(x,y+r);g.quadraticCurveTo(x,y,x+r,y);g.closePath();}
function lpWrap(g,txt,w){var words=String(txt).split(/\s+/),lines=[],cur="";words.forEach(function(wd){var t=cur?cur+" "+wd:wd;if(cur&&g.measureText(t).width>w){lines.push(cur);cur=wd;}else cur=t;});if(cur)lines.push(cur);return lines;}
var LPF='"Home Cormorant","Cormorant Garamond",Cormorant,"Iowan Old Style",Palatino,Georgia,serif';
/* a document drawn as a dossier: its top sheet over a few pages (their edges seen under it, each a step lower, lit as paper edges are), its
   tab, its printing; the one in front bound by a band of the same paper, lettered INGENIUM and LECTOR, which the seal closes; a loose leaf
   is paper and printing alone. opt: {band, leaf, pages} */
function lpDraw(cv,d,nt,opt){opt=opt||{};var leaf=!!opt.leaf,band=!!opt.band,pages=opt.pages==null?4:opt.pages,name=d.name,cap=(name.replace(/^(Master|The)\s+/i,"").charAt(0)||"·").toUpperCase(),a=lfApps(),
    sub=a?"from the "+(a===1?"app":a+" apps")+" you chose":"from the apps you choose",num=ROMAN[d.i]||String(d.i+1),
    txt=LPTEXT[name.toLowerCase()]||("The "+name.toLowerCase()+" of this reading, written from the apps you chose, each statement with its evidence and its place in the code."),
    k=Math.min(2,Math.max(1.5,W.devicePixelRatio||1)),SW=216,SH=330,CW=SW+10,CH=34+SH+10,TY=34,NW=Math.round(CW*k),NH=Math.round(CH*k),P=LPC[nt?"night":"day"],i,j,q,L;
  cv.width=NW;cv.height=NH;var g0=cv.getContext("2d");
  g0.font="600 13.5px "+LPF;var tw=Math.min(158,Math.max(96,Math.ceil(g0.measureText(name).width)+40));
  /* the layers of paper, the top sheet first: L[0] the top sheet (and its tab), L[1..] the pages under it, each a little lower and to the right */
  var LAY=[];for(L=0;L<=pages;L++)(function(L){LAY.push(lpMask(NW,NH,k,function(g){var ox=L*1.45,oy=L*1.85;lpRound(g,.5+ox,TY+oy,SW-1,SH,11);g.fill();if(!L&&!leaf){lpRound(g,20,TY-31,tw,34,10,true);g.fill();}}));})(L);
  var mP=new Float32Array(NW*NH),top=new Int8Array(NW*NH);for(q=0;q<NW*NH;q++){var t=-1;for(L=0;L<LAY.length;L++)if(LAY[L][q]>.5){t=L;break;}top[q]=t;var mx=0;for(L=0;L<LAY.length;L++)if(LAY[L][q]>mx)mx=LAY[L][q];mP[q]=mx;}
  var BY0=TY+215,BY1=TY+251,BCX=SW/2,BCY=TY+233;
  var mB=band?lpMask(NW,NH,k,function(g){g.fillRect(-4,BY0,SW+16,BY1-BY0);}):null;
  var mI=leaf?new Float32Array(NW*NH):lpMask(NW,NH,k,function(g){g.textBaseline="alphabetic";g.font="600 54px "+LPF;g.fillText(cap,20,TY+64);var cw=g.measureText(cap).width;
    g.font="600 21px "+LPF;var tl=lpWrap(g,name,Math.max(70,180-(30+cw)));tl.slice(0,2).forEach(function(l,n){g.fillText(l,20+cw+10,TY+40+n*22);});
    g.font="600 19px "+LPF;g.fillText(num,22,TY+SH-22);g.font="600 13.5px "+LPF;g.fillText(name.length>20?name.slice(0,19)+"…":name,20+26,TY-11);
    g.beginPath();g.arc(20+14,TY-16,3.4,0,Math.PI*2);g.fill();
    /* the band's two words, each centred in its half, clear of the seal (which covers the middle 92 of its 216) */
    if(band){g.font="600 6.3px "+LPF;var wd=function(str){var w=0;for(var c=0;c<str.length;c++)w+=g.measureText(str[c]).width+(c?2.3:0);return w;},
      sp=function(str,cx,y){var x=cx-wd(str)/2;for(var c=0;c<str.length;c++){g.fillText(str[c],x,y);x+=g.measureText(str[c]).width+2.3;}};
      sp("INGENIUM",(6+(SW/2-50))/2,BCY+2.2);sp("LECTOR",(SW-6+(SW/2+50))/2,BCY+2.2);}});
  var mS=lpMask(NW,NH,k,function(g){g.textBaseline="alphabetic";var y=TY+(leaf?40:124);
    if(!leaf){g.font="italic 500 13.5px "+LPF;var sl=lpWrap(g,sub,170);g.fillText(sl[0]||"",22,TY+96);}
    g.font="500 7.6px "+LPF;var paras=[txt,"Its parts are named in the order they were read, so each can be found again in the app it came from, with the line it was read at and the note made there.",
      "Nothing in it is invented: every statement points to the part it rests on, and every quotation keeps its words."],lim=band?BY0-10:TY+SH-58;
    paras.forEach(function(pt,pi){if(pi)y+=7;lpWrap(g,pt,SW-44).forEach(function(l){if(y<=lim){g.fillText(l,22,y);y+=12.5;}});});
    g.lineWidth=.9;lpRound(g,9.5,TY+9.5,SW-19,SH-19,6);g.stroke();g.lineWidth=.5;lpRound(g,12.5,TY+12.5,SW-25,SH-25,4);g.stroke();
    if(!leaf){g.lineWidth=.8;g.beginPath();g.moveTo(22,TY+SH-48);g.lineTo(SW-22,TY+SH-48);g.stroke();}
    if(band){g.lineWidth=.45;g.beginPath();g.moveTo(4,BY0+3.6);g.lineTo(SW-4,BY0+3.6);g.moveTo(4,BY1-3.6);g.lineTo(SW-4,BY1-3.6);g.stroke();}});
  var mW=(band||leaf)?new Float32Array(NW*NH):lpMask(NW,NH,k,function(g){var cx=SW/2,cy=TY+240;g.lineWidth=2.2;g.beginPath();g.arc(cx,cy,30,0,Math.PI*2);g.stroke();g.lineWidth=.9;g.beginPath();g.arc(cx,cy,26,0,Math.PI*2);g.stroke();lxStarPath(g,cx,cy,22,5.5);g.fill();g.beginPath();g.arc(cx,cy,3.4,0,Math.PI*2);g.fill();});
  var pS=lpBox(mP,NW,NH,Math.max(1,Math.round(k*1.2))),pW=lpBox(mP,NW,NH,Math.max(2,Math.round(k*2.6))),iB=lpBox(mI,NW,NH,1),sB=lpBox(mS,NW,NH,1),wB=lpBox(mW,NW,NH,Math.max(2,Math.round(k*2.2)));
  var bB=band?lpBox(mB,NW,NH,Math.max(1,Math.round(k*1.1))):null,bW2=band?lpBox(mB,NW,NH,Math.max(2,Math.round(k*2.4))):null,
      bSh=band?lpBox((function(){var o=new Float32Array(NW*NH),dy=Math.round(2.6*k),dx=Math.round(1.2*k);for(q=dy*NW+dx;q<NW*NH;q++)o[q]=mB[q-dy*NW-dx];return o;})(),NW,NH,Math.max(2,Math.round(k*3.2))):null;
  /* the wax: a thin pool where it was poured and spread under the stamp, its edge uneven and thin, round the seal at the band's middle */
  function poolR(t){return 45.5+2.4*Math.sin(2*t+1.1)+1.7*Math.sin(3*t+.4)+1.1*Math.sin(5*t+2.3)+.6*Math.sin(9*t+.8)+4.2*Math.pow(Math.max(0,Math.cos(t-1.95)),6)+3*Math.pow(Math.max(0,Math.cos(t+.35)),9)+2.2*Math.pow(Math.max(0,Math.cos(t-3.6)),10);}
  var BAND=nt?[.33,.26,.47]:[.935,.918,.968],WAX=nt?LXWAX.white.night:LXWAX.white.day;
  /* the pages under the top sheet stand a step lower each; their soft edges come from each page's own mask */
  var tops=[];for(L=0;L<LAY.length;L++)tops.push(lpBox(LAY[L],NW,NH,Math.max(1,Math.round(k*.9))));
  var H=new Float32Array(NW*NH),A=new Float32Array(NW*NH),BP=new Float32Array(NW*NH),PP=new Float32Array(NW*NH),u=1/k;
  for(j=0;j<NH;j++)for(i=0;i<NW;i++){q=j*NW+i;var x=i*u,y=j*u,n0=(lxVN(x*.55,y*.55)-.5),dk=pS[q]+(n0*.42+(lxVN(x*2.1,y*2.1)-.5)*.24)*Math.min(1,pW[q]*4)*(1-pW[q]);
    var al=Math.min(1,Math.max(0,(dk-.36)/.2));A[q]=al;if(al<=0){H[q]=0;continue;}
    /* the height of the paper here: the highest layer that covers it, a step of .3 for each page down, softened at each page's edge */
    var h=0;for(L=LAY.length-1;L>=0;L--){var hl=(1.4-.3*L)*Math.min(1,tops[L][q]*1.25);if(hl>h)h=hl;}
    var cm=x%26,ch=-.05*Math.exp(-(cm-13)*(cm-13)/1.1),onTop=top[q]===0;
    h+=.08*n0+.04*(lxVN(x*3.1,y*3.1)-.5)+.014*Math.sin(y*Math.PI)+(onTop?ch-.44*iB[q]-.28*sB[q]-.07*wB[q]:0);
    var bp=0,pp=0;if(band){var be=bB[q]+((lxVN(x*.9,y*1.7)-.5)*.5+(lxVN(x*3.2,y*2.6)-.5)*.22)*Math.min(1,bW2[q]*4)*(1-bW2[q]);bp=Math.min(1,Math.max(0,(be-.38)/.18));
      h+=bp*(.95*Math.min(1,bW2[q]*1.35)+.05*(lxVN(x*.35,y*4.2)-.5));
      var px0=x-BCX,py0=y-BCY,rr=Math.sqrt(px0*px0+py0*py0);if(rr<56){var pr=poolR(Math.atan2(py0,px0))*.88,dd=pr-rr;if(dd>0){pp=Math.min(1,dd/1.3);h+=.55*Math.min(1,dd/5)*(.9+.2*(lxVN(x*1.1,y*1.1)-.5));}}}
    H[q]=h;BP[q]=bp;PP[q]=pp;}
  var im=g0.createImageData(NW,NH),px=im.data,s2=k/2;
  for(j=1;j<NH-1;j++)for(i=1;i<NW-1;i++){q=j*NW+i;var al2=A[q];if(al2<=0)continue;
    var nx=-(H[q+1]-H[q-1])*s2,ny=-(H[q+NW]-H[q-NW])*s2,nz=1,l=Math.sqrt(nx*nx+ny*ny+1);nx/=l;ny/=l;nz/=l;
    var dl=nx*LXL[0]+ny*LXL[1]+nz*LXL[2],df=Math.max(0,(dl+.3)/1.3),sp=Math.pow(Math.max(0,nx*LXH[0]+ny*LXH[1]+nz*LXH[2]),18)*.06,fib=.97+.06*lxVN(i*.7,j*.7),
        lay=top[q]<0?0:top[q],dim=1-.035*lay,lt=(P.amb+P.dif*df)*fib*dim,wm=Math.min(1,wB[q]*1.4)*(nt?.16:.11),
        R=(P.paper[0]+(P.deep[0]-P.paper[0])*wm)*lt,G=(P.paper[1]+(P.deep[1]-P.paper[1])*wm)*lt,B=(P.paper[2]+(P.deep[2]-P.paper[2])*wm)*lt;
    if(band){var bq=BP[q],sh=(1-bq)*bSh[q]*(nt?.42:.26);R*=1-sh;G*=1-sh;B*=1-sh;
      if(bq>0){var fb=.97+.06*lxVN(i*.3,j*1.6);R+=(BAND[0]*lt*fb-R)*bq;G+=(BAND[1]*lt*fb-G)*bq;B+=(BAND[2]*lt*fb-B)*bq;}
      var pq=PP[q];if(pq>0){var wl=(WAX.amb+WAX.dif*df),wa=pq*(.55+.45*Math.min(1,pq*1.4));R+=(WAX.base[0]*wl-R)*wa;G+=(WAX.base[1]*wl-G)*wa;B+=(WAX.base[2]*wl-B)*wa;sp+=Math.pow(Math.max(0,nx*LXH[0]+ny*LXH[1]+nz*LXH[2]),26)*.16*pq;}}
    if(top[q]===0||band&&BP[q]>.5){var ie=Math.min(1,Math.max(0,(mI[q]-.2)/.55)),se=Math.min(1,Math.max(0,(mS[q]-.15)/.55))*.85,il=.62+.5*df;
      if(se>0){R+=(P.soft[0]*il-R)*se;G+=(P.soft[1]*il-G)*se;B+=(P.soft[2]*il-B)*se;}
      if(ie>0){R+=(P.ink[0]*il-R)*ie;G+=(P.ink[1]*il-G)*ie;B+=(P.ink[2]*il-B)*ie;}}
    var e=1-Math.min(1,pW[q]*1.6);R*=1-.1*e;G*=1-.1*e;B*=1-.08*e;
    px[q*4]=Math.min(255,(R+sp)*255);px[q*4+1]=Math.min(255,(G+sp)*255);px[q*4+2]=Math.min(255,(B+sp)*255);px[q*4+3]=Math.round(al2*255);}
  g0.putImageData(im,0,0);}
/* a sheet is drawn again only when its document, its numeral or the theme changes; the fonts are waited for, as the seal's are */
function lpPaint(b,d,opt){if(!d)return;opt=opt||{};var cv=b.querySelector(".lf-paper"),nt=night(),key=[d.name,d.i,nt?1:0,lfApps(),opt.band?1:0,opt.leaf?1:0].join("|");if(!cv||cv.__k===key)return;cv.__k=key;
  var go=function(){if(cv.__k!==key)return;try{lpDraw(cv,d,nt,opt);b.classList.add("lf-drawn");b.querySelector(".lf-sheet").classList.add("lf-drawn");}catch(e){}};
  try{if(D.fonts&&D.fonts.load){D.fonts.load('600 12px "Home Cormorant"').then(go,go);return;}}catch(e){}go();}
/* the paper's tooth: a small tile of grain, made once */
function grainTile(dark){var c=D.createElement("canvas");c.width=c.height=96;var g=c.getContext("2d"),im=g.createImageData(96,96),s=7;
  for(var i=0;i<im.data.length;i+=4){s=(s*1103515245+12345)&2147483647;var v=s/2147483647;im.data[i]=dark?205:90;im.data[i+1]=dark?184:64;im.data[i+2]=dark?240:150;im.data[i+3]=Math.round(v*v*(dark?20:16));}
  g.putImageData(im,0,0);try{return 'url("'+c.toDataURL("image/png")+'")';}catch(e){return "none";}}
function lfBuild(H){var root=mk("div","lf");root.setAttribute("role","group");root.setAttribute("aria-label","The documents of this reading");
  var tilt=mk("div","lf-tilt"),sway=mk("div","lf-sway"),stamp=mk("div","lf-stamp");root.appendChild(mk("i","lf-cast"));LB.cards=[lfCard(),lfCard(),lfCard()];
  stamp.appendChild(LB.cards[0]);stamp.appendChild(LB.cards[2]);stamp.appendChild(LB.cards[1]);
  /* two loose leaves behind the three, so the spread is a sheaf of paper */
  LB.loose=[mk("div","lf-loose l"),mk("div","lf-loose r")];LB.loose.forEach(function(e){e.setAttribute("aria-hidden","true");e.innerHTML='<i class="lf-shade"></i><canvas class="lf-paper"></canvas>';stamp.insertBefore(e,stamp.firstChild);});
  var sl=mk("div","lf-seal"),sk=lxSealKey(88);sk.__thin=true;LB.seal=sk;sl.appendChild(sk);stamp.appendChild(sl);sway.appendChild(stamp);
  /* 6.96: the seal is pressed on the sheet in front: pointing at either lifts both, pressing the sheet sinks the seal with it */
  var front=LB.cards[1],onS=false,onF=false;function lift(){sl.classList.toggle("lf-up",onS||onF);front.classList.toggle("lf-ph",onS&&!onF);}
  front.addEventListener("pointerenter",function(e){if(e.pointerType==="mouse"){onF=true;lift();}});front.addEventListener("pointerleave",function(){onF=false;lift();});
  sk.addEventListener("pointerenter",function(e){if(e.pointerType==="mouse"){onS=true;lift();}});sk.addEventListener("pointerleave",function(){onS=false;lift();});
  front.addEventListener("pointerdown",function(){sl.classList.add("lf-dn");});["pointerup","pointercancel","pointerleave"].forEach(function(t){front.addEventListener(t,function(){sl.classList.remove("lf-dn");});});
  /* a press of the seal stamps the stack: the sheets give under it and spring back, as paper under a seal does, with the seal's own knock */
  sk.addEventListener("click",function(){if(still()||!stamp.animate)return;try{stamp.animate([{transform:"translateZ(0) scale(1)"},{transform:"translateZ(-7px) scale(.986)",offset:.18},{transform:"translateZ(2px) scale(1.004)",offset:.5},{transform:"translateZ(0) scale(1)"}],{duration:620,easing:"cubic-bezier(.3,.7,.3,1)"});}catch(e){}});
  tilt.appendChild(sway);root.appendChild(tilt);H.obj.appendChild(root);LB.root=root;
  root.style.setProperty("--lf-grain",grainTile(false));root.style.setProperty("--lf-grain-n",grainTile(true));
  root.addEventListener("pointermove",function(e){if(e.pointerType!=="mouse"||still())return;var r=root.getBoundingClientRect();if(!r.width)return;
    var x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;tilt.style.setProperty("--lf-ry",(x*24).toFixed(1)+"deg");tilt.style.setProperty("--lf-rx",(-y*16).toFixed(1)+"deg");},{passive:true});
  root.addEventListener("pointerleave",function(){tilt.style.removeProperty("--lf-ry");tilt.style.removeProperty("--lf-rx");});}
function lfOpen(d){if(!d)return;var box=$("l7Dtabs"),tab=null;/* The document draws its tabs again on each change: find this one by its name now */
  if(box)[].some.call(box.querySelectorAll("button"),function(x){if((x.textContent||"").trim()===d.name){tab=x;return true;}return false;});if(tab){try{tab.click();}catch(e){}}
  try{if(W.IngLector&&IngLector.setPanel&&W.innerWidth<900)IngLector.setPanel("doc");}catch(e){}var dp=$("l7Doc");if(dp)scrollTo(dp);setTimeout(paintLector,40);}
function lectorHero(){var pg=$("page-lector"),lx=$("lx7");if(!pg||!lx)return null;if(LB.h&&LB.h.el.isConnected)return LB.h;
  var lede=(lx.querySelector(".l-head p")||{}).textContent||"Reads your apps part by part, thinks out loud as it goes, and writes the documents you need from them. It works on this device, or with your other computer's model when you have linked one.";
  var H=hero({title:"Lector",eyebrow:"Lector · the documents of your apps",lede:lede,
    keys:[{pri:true,ico:ICO.read,txt:"Start reading",id:"skLectorGo",fn:function(){var go=$("l7BriefF")&&$("l7BriefF").querySelector("button.next");if(!go)go=[].slice.call(lx.querySelectorAll("#l7BriefF button,#l7Brief .l-pn-f button")).filter(function(x){return /read|continue|again/i.test(x.textContent);})[0];
        try{if(W.IngLector&&IngLector.setPanel&&W.innerWidth<900)IngLector.setPanel("brief");}catch(e){}if(go)go.click();scrollTo(lx);}},
      {ico:ICO.plus,txt:"Add your apps",fn:function(){var bf=$("l7Bf"),b=null;if(bf)[].some.call(bf.querySelectorAll("button"),function(x){if(/Add your apps/.test(x.textContent||"")){b=x;return true;}return false;});
        if(b)b.click();else{try{libPickFiles();}catch(e){}}scrollTo(lx);}}],
    says:"In four steps: choose your apps, read them part by part, write the documents, then save them as Word, PDF or a web page.",hint:"Point at a document to lift it from the fan; press it to read it."});
  lfBuild(H);lx.parentNode.insertBefore(H.el,lx);LB.h=H;LB.key="";return H;}
function paintLector(){var H=lectorHero();if(!H)return;if(LB.seal)lxSealPaint(LB.seal);var lx=$("lx7"),st=lectorState(),t=lfThree(),key=JSON.stringify({s:st.steps,d:t.map(function(d){return d?[d.name,!!d.on,!!d.done,d.i]:null;}),a:lfApps()});if(key===LB.key)return;LB.key=key;
  if(LB.row&&LB.row.parentNode)LB.row.parentNode.removeChild(LB.row);LB.row=steps(st.steps.length?st.steps:[{name:"Choose",sub:SUBS.choose,now:true},{name:"Read",sub:SUBS.read},{name:"Write",sub:SUBS.write},{name:"Save",sub:SUBS.save}],function(i){goStep(i);});
  lx.parentNode.insertBefore(LB.row,lx);
  lfFill(LB.cards[0],t[0],"l");lfFill(LB.cards[1],t[1],"f");lfFill(LB.cards[2],t[2],"r");
  (LB.loose||[]).forEach(function(e,n){var cv=e.querySelector(".lf-paper"),nt=night(),key="loose|"+n+"|"+(nt?1:0);if(cv.__k===key)return;cv.__k=key;
    var go=function(){if(cv.__k!==key)return;try{lpDraw(cv,{name:n?"Notes on the reading":"Drafts of the documents",i:n},nt,{leaf:true,pages:1});}catch(x){}};try{if(D.fonts&&D.fonts.load){D.fonts.load('600 12px "Home Cormorant"').then(go,go);return;}}catch(x){}go();});
  var go=$("l7BriefF")&&$("l7BriefF").querySelector("button.next"),k=H.keys.querySelector("#skLectorGo");if(k&&go){var tx=(go.textContent||"").trim();if(tx&&k.lastChild&&k.lastChild.nodeType===3&&k.lastChild.textContent!==tx)k.lastChild.textContent=tx;}}
function goStep(i){try{if(W.IngLector&&IngLector.setPanel&&W.innerWidth<900)IngLector.setPanel(["brief","read","doc","doc"][i]||"brief");}catch(e){}var p=$(["l7Brief","l7Read","l7Doc","l7Doc"][i]);if(!p)return;scrollTo($("lx7"));
  if(!still()&&p.animate)try{p.animate([{boxShadow:"0 0 0 0 rgba(106,63,181,0)"},{boxShadow:"0 0 0 3px rgba(106,63,181,.45)"},{boxShadow:"0 0 0 0 rgba(106,63,181,0)"}],{duration:1100,delay:250});}catch(e){}}
function watchLector(){var lx=$("lx7");if(!lx||lx.__r290w||typeof MutationObserver!=="function")return;lx.__r290w=1;var t=0;
  var mo=new MutationObserver(function(){clearTimeout(t);t=setTimeout(paintLector,80);});
  var st=lx.querySelector(".l-steps");if(st)mo.observe(st,{subtree:true,attributes:true,attributeFilter:["class"]});
  ["l7Dtabs","l7Bf","l7BriefF"].forEach(function(id){var e=$(id);if(e)mo.observe(e,{childList:true,subtree:true,characterData:true,attributes:true,attributeFilter:["aria-selected","class"]});});}
function dressLector(){var pg=$("page-lector");if(!pg||!$("lx7"))return false;pg.classList.add("sk-on");paintLector();watchLector();return true;}

/* ---------------- when each is drawn ---------------- */
function hookCareer(){var C=W.IngCareer;if(!C||!C.render||C.render.__r290)return;var o=C.render;var f=function(){var r=o.apply(this,arguments);try{dressCareer();}catch(e){}return r;};f.__r290=1;C.render=f;}
var og=W.go;if(typeof og==="function"&&!og.__r290){var g2=function(p){var r=og.apply(this,arguments);try{if(p==="career"){hookCareer();dressCareer();}else if(p==="lector")dressLector();}catch(e){}return r;};g2.__r290=1;W.go=g2;}
var themeMo=null;try{themeMo=new MutationObserver(function(){CP.key="";LB.key="";try{if($("page-career").classList.contains("active"))paintCompass();if($("page-lector").classList.contains("active"))paintLector();}catch(e){}});
  themeMo.observe(D.body,{attributes:true,attributeFilter:["data-theme"]});}catch(e){}
try{hookCareer();dressCareer();}catch(e){}try{dressLector();}catch(e){}
W.IngStudios={compassOn:function(){W.ING_COMPASS=true;CP.key="";try{hookCareer();dressCareer();}catch(e){}},career:dressCareer,lector:dressLector,compass:paintCompass,documents:paintLector,turn:function(T){turnTo(T);},repaint:function(){CP.key="";if(CP.h&&CP.h.dial)CP.h.dial.__pk="";paintCompass();},
  state:function(){return {T:CP.T,cur:CP.cur,n:CP.data?CP.data.list.length:0,cp:CP.key,lb:LB.key};},
  /* what the other heads share with these (Focus, modules/r291.js; Build, modules/r292.js) */
  kit:{hero:hero,label:label,steps:steps,orb:orb,wireOrb:wireOrb,sealKey:sealKey,plateUrl:plateUrl,collarUrl:collarUrl,scrollTo:scrollTo,still:still,night:night,mk:mk,svg:svg,img:img,ICO:ICO,ROMAN:ROMAN,
    mv:{pal:mvPal,tag:mvTag,scale:mvScale,cv:mvCv,rgb:mvRgb,grain:mvGrain,env:mvEnv,ring:mvRingPx,setting:mvSetting,plate:mvPlate,LX:MVLX,LY:MVLY}}};
try{window.__ingParts["p290"]="running";}catch(_){}
})();
</script>
