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
#page-career.sk-on,#page-lector.sk-on,#page-focus.sk-on{--sk-ink1:#221a2e;--sk-ink2:#4a4358;--sk-ink3:#6c6579;--sk-hair:rgba(34,26,46,.10);--sk-hair2:rgba(34,26,46,.06);--sk-acc:#6a3fb5;
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
body[data-theme="night"] #page-career.sk-on,body[data-theme="night"] #page-lector.sk-on,body[data-theme="night"] #page-focus.sk-on{--sk-ink1:#f3eefb;--sk-ink2:#d3c9e3;--sk-ink3:#a99cc1;--sk-hair:rgba(205,184,240,.12);--sk-hair2:rgba(205,184,240,.07);--sk-acc:#b79ce6;
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
/* the stages: set into the bezel as the dial's hub is set (Blend's setting: a polished lip of the bezel's own metal round a well of violet
   enamel, drawn with the dial's own light, its shadow on the bezel), flat and still; the numeral in pearl on the enamel */
.skc-cart{position:absolute;left:12px;top:12px;width:48px;height:48px;margin:0;padding:0;border:0;border-radius:50%;background:none;cursor:pointer;pointer-events:auto;
  -webkit-tap-highlight-color:transparent;transition:none}
.skc-cart img{position:absolute;left:0;top:0;width:48px;height:48px;display:block;-webkit-user-drag:none;pointer-events:none}
.skc-cart svg.nm{position:absolute;left:0;top:0;width:48px;height:48px;overflow:visible;pointer-events:none}
.skc-cart .nm text{font:600 15.5px/1 var(--sk-serif);letter-spacing:.05em;fill:#fbf8ff;fill:url(#skcPearl)}
.skc-cart .nm .sh{fill:rgba(16,6,38,.5)}
.skc-cart:hover,.skc-cart:active{transform:none}
.skc-cart:focus{outline:none}.skc-cart:focus-visible{box-shadow:0 0 0 2.5px var(--sk-acc),0 0 0 5px var(--sk-hi)}
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
#page-lector .lf-sway{animation:lfSway 11s ease-in-out infinite}
@keyframes lfSway{0%,100%{transform:rotateY(-8deg) rotateX(3deg)}50%{transform:rotateY(8deg) rotateX(-3deg)}}
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
function bezelUrl(R1,R2,RG,M){var P=mvPal(),nt=night(),s=mvScale(),n=Math.ceil((R2+M)*2*s/2)*2,key="bz"+n+mvTag();if(URLS[key])return URLS[key];
  var c=mvCv(n),x=c.getContext("2d"),im=x.createImageData(n,n),o=im.data,c0=n/2,G=mvRgb(nt?BZ.night:BZ.day),K=P.dark,i,j,xx,yy,dx,dy,r,ex,ey,e,a,re=4.2,d,sl,nx,ny,l,E,gr,k,ss,cov;
  for(yy=0;yy<n;yy++)for(xx=0;xx<n;xx++){dx=(xx+.5-c0)/s;dy=(yy+.5-c0)/s;r=Math.sqrt(dx*dx+dy*dy);if(r>R2+M||r<R1-M)continue;i=yy*n+xx;j=i*4;ex=r?dx/r:0;ey=r?dy/r:0;e=ex*MVLX+ey*MVLY;
    if(r>R2+.5){a=(nt?.55:.34)*Math.max(0,e)*Math.exp(-(r-R2)/2.4)+(nt?.22:.1)*Math.exp(-(r-R2)/.9);o[j]=K[0];o[j+1]=K[1];o[j+2]=K[2];o[j+3]=Math.min(1,a)*255;continue;}
    if(r<R1-.5){a=(nt?.5:.3)*Math.max(0,-e)*Math.exp(-(R1-r)/2.6)+(nt?.2:.08)*Math.exp(-(R1-r)/.9);o[j]=K[0];o[j+1]=K[1];o[j+2]=K[2];o[j+3]=Math.min(1,a)*255;continue;}
    nx=0;ny=0;d=r-R1;if(d<re){sl=Math.min(6,(re-d)/Math.sqrt(Math.max(1e-3,re*re-(re-d)*(re-d))));nx=-ex*sl;ny=-ey*sl;}
    d=R2-r;if(d<re){sl=Math.min(6,(re-d)/Math.sqrt(Math.max(1e-3,re*re-(re-d)*(re-d))));nx=ex*sl;ny=ey*sl;}
    d=r-RG;if(Math.abs(d)<1.7){sl=.95*(d<0?1:-1);nx=ex*sl;ny=ey*sl;}
    l=Math.sqrt(nx*nx+ny*ny+1);E=mvEnv(nx/l,ny/l,1/l);gr=1+.012*Math.sin(r*4.6)+.014*(mvGrain(i)-.5);k=E.d*P.env*gr;ss=E.s*1.1;
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
/* a stage: Blend's setting (mvSetting) at 48 pixels, its lip in the bezel's own metal, its enamel in Ingenium's violet (deepest for the
   stage in hand, quieter for the stages ahead), drawn once by day and once by night; its numeral in pearl */
var ENAMEL={day:{cur:"#5a32a6",done:"#7752c2",ahead:"#9a8cc0"},night:{cur:"#6238b4",done:"#7350bf",ahead:"#5e5287"}};
function stageUrl(kind){var key="st"+kind+mvTag()+mvScale();if(URLS[key])return URLS[key];var E=ENAMEL[night()?"night":"day"];
  try{URLS[key]=mvSetting(48/.64,.64,22.6,28.6,night()?BZ.night:BZ.day,E[kind]||E.ahead,"s"+kind,true).toDataURL("image/png");}catch(e){URLS[key]="";}return URLS[key];}
function cartEl(num,kind){var f=D.createDocumentFragment();f.appendChild(img("",stageUrl(kind)));
  var s=svg("svg",{"class":"nm",viewBox:"0 0 48 48","aria-hidden":"true"});
  if(!$("skcPearl")){var df=svg("defs",{}),gr=svg("linearGradient",{id:"skcPearl",gradientUnits:"userSpaceOnUse",x1:"14",y1:"16",x2:"34",y2:"34"});
    [["0","#ffffff"],[".45","#ffffff"],["1","#e2d6f8"]].forEach(function(p){gr.appendChild(svg("stop",{offset:p[0],"stop-color":p[1]}));});df.appendChild(gr);s.appendChild(df);}
  var sh=svg("text",{"class":"sh",x:"24.3",y:"30.4","text-anchor":"middle"});sh.textContent=num;s.appendChild(sh);var t=svg("text",{x:"24",y:"29.7","text-anchor":"middle"});t.textContent=num;s.appendChild(t);f.appendChild(s);return f;}
/* the index: one point of the seal's star, pointing at the stage in hand, its pearl where the seal keeps its heart */
function indexEl(){var e=mk("div","skc-index"),s=svg("svg",{viewBox:"0 0 28 44","aria-hidden":"true"}),id="skcPl"+(++NS),df=svg("defs",{}),rg=svg("radialGradient",{id:id,cx:".38",cy:".34",r:".72"});
  rg.appendChild(svg("stop",{offset:"0","stop-color":"#ffffff"}));var st=svg("stop",{offset:"1"});st.setAttribute("style","stop-color:var(--sk-pearl)");rg.appendChild(st);df.appendChild(rg);s.appendChild(df);
  s.appendChild(svg("path",{"class":"lit",d:"M14 44Q12.4 25 2 14.5L14 7.5z"}));s.appendChild(svg("path",{"class":"shd",d:"M14 44Q15.6 25 26 14.5L14 7.5z"}));
  s.appendChild(svg("circle",{cx:"14",cy:"12.2",r:"4.3",fill:"url(#"+id+")"}));e.appendChild(s);e.setAttribute("aria-hidden","true");return e;}
function careerHero(){var pg=$("page-career"),cs=$("cs");if(!pg||!cs)return null;if(CP.h&&CP.h.el.isConnected)return CP.h;
  var lede=(cs.querySelector(".c-head p")||{}).textContent||"Your profile, the posts, programmes and grants you are weighing, and what you send. Everything stays on this device.";
  var H=hero({title:"Career Studio",eyebrow:"Career Studio · the dial of your path",lede:lede,
    keys:[{pri:true,ico:ICO.compass,txt:"Your counsellor",id:"skCareerGo",fn:function(){var S=W.IngCareer.state();S.ui.room="mentor";S.ui.show="work";try{saveState();}catch(e){}W.IngCareer.render();scrollTo(cs);}},
      {ico:ICO.plus,txt:"Bring one in",fn:function(){var S=W.IngCareer.state();S.ui.room="apps";S.ui.open="new";S.ui.show="work";try{saveState();}catch(e){}W.IngCareer.render();scrollTo(cs);}}],
    says:"Your counsellor's stages, one after another: what you have, your record, what you want, where you could go, and this week.",hint:"Press a stage to turn the dial to it."});
  var who=cs.querySelector(".c-who");if(who)H.keys.appendChild(who);
  var box=mk("div","skc");box.setAttribute("role","group");box.setAttribute("aria-label","The dial: your counsellor's stages");
  box.appendChild(mk("div","skc-under"));var pl=mk("div","skc-plate");[6,4,2].forEach(function(z){var i=mk("i");i.style.setProperty("--z",z);pl.appendChild(i);});pl.appendChild(img("skc-plateimg"));box.appendChild(pl);
  var eng=mk("div","skc-eng");eng.appendChild(engraving());box.appendChild(eng);
  [2,4,6].forEach(function(z,i){var b=mk("i","skc-bside"+(i===2?" b2":""));b.style.setProperty("--z",z);b.setAttribute("aria-hidden","true");box.appendChild(b);});
  var bz=mk("div","skc-bezel");bz.appendChild(img("skc-bezelimg"));box.appendChild(bz);
  box.appendChild(mk("div","skc-dial"));box.appendChild(indexEl());
  var cb=mk("div","skc-collarbox");cb.appendChild(img("skc-collar"));box.appendChild(cb);
  var seat=mk("div","skc-seat"),hs=mk("div","hx-seal");hs.setAttribute("data-ing-seal","career");var k=mk("button","r175-seal");k.type="button";k.setAttribute("aria-label","Ingenium's seal, the engine at the heart of the dial. Press it for fun.");
  var g=mk("span","r175-glow"),fx=mk("span","r175-fx"),rp=mk("span","r175-ripple");g.setAttribute("aria-hidden","true");rp.setAttribute("aria-hidden","true");var se=sealCopy();if(se)fx.appendChild(se);
  k.appendChild(g);k.appendChild(fx);k.appendChild(rp);hs.appendChild(k);seat.appendChild(hs);box.appendChild(seat);k.addEventListener("click",function(){sealPlay(box);});
  H.sway.appendChild(box);H.dial=box;cs.parentNode.insertBefore(H.el,cs);CP.h=H;CP.key="";CP.T=null;CP.painted=false;return H;}
function scrollTo(el){try{el.scrollIntoView({behavior:still()?"auto":"smooth",block:"start"});}catch(e){}}
/* pressing the seal: the bezel makes one full turn and settles where it was, the index ticks, the seal glows (its own flourish, R175) */
function sealPlay(box){var gl=box.querySelector(".r175-glow"),rp=box.querySelector(".r175-ripple");
  if(!still()&&CP.T!=null){turnTo(CP.T-360,true);setTimeout(function(){tick();},1100);}
  try{if(gl&&gl.animate)gl.animate([{opacity:0,transform:"scale(.82)"},{opacity:.85,transform:"scale(1.04)",offset:.3},{opacity:0,transform:"scale(1.12)"}],{duration:1000,easing:"ease-out"});
    if(rp&&rp.animate&&!still())rp.animate([{opacity:.6,transform:"scale(.86)"},{opacity:0,transform:"scale(1.55)"}],{duration:950,easing:"ease-out"});}catch(e){}}
function tick(){var ix=CP.h&&CP.h.dial.querySelector(".skc-index");if(!ix||still())return;ix.classList.remove("tick");void ix.offsetWidth;ix.classList.add("tick");}
/* the turn: the bezel and everything on it turn together; each stage turns back by as much, so its numeral stays upright */
function turnTo(T,quiet){var b=CP.h&&CP.h.dial;if(!b)return;var d=b.querySelector(".skc-dial");if(!d)return;CP.T=T;
  d.style.transform="translateZ(8.4px) rotate("+T.toFixed(3)+"deg)";[].forEach.call(d.querySelectorAll(".skc-up"),function(u){u.style.transform="rotate("+(-T).toFixed(3)+"deg)";});
  if(!quiet)setTimeout(tick,820);}
function nearest(T,prev){if(prev==null)return T;while(T-prev>180)T-=360;while(T-prev<-180)T+=360;return T;}
function tagFor(H,i,s,n){var o=H.obj;[].forEach.call(o.querySelectorAll(".skh-label.tag"),function(l){l.parentNode.removeChild(l);});if(i===CP.cur)return;
  var th=(angleOf(i,n)+(CP.T||0))*Math.PI/180,x=260+198*Math.cos(th),y=214+198*Math.sin(th);label(o,x,y,Math.cos(th),Math.sin(th),ROMAN[i]+" · "+s.name,s.done?"done":s.next?"next":"","tag");}
function paintCompass(){var H=careerHero();if(!H)return;var data=stagesNow(),key=JSON.stringify(data)+(night()?"n":"d");if(key===CP.key)return;CP.key=key;var o=H.obj,box=H.dial;
  var pk=night()?"n":"d";if(box.__pk!==pk){box.__pk=pk;box.querySelector(".skc-plateimg").src=plateUrl(340);box.querySelector(".skc-bezelimg").src=bezelUrl(100,152,126,10);box.querySelector(".skc-collar").src=collarUrl(112);}
  [].forEach.call(o.querySelectorAll(".skh-label"),function(l){l.parentNode.removeChild(l);});
  var old=box.querySelector(".skc-dial"),dial=mk("div","skc-dial");if(old)old.parentNode.replaceChild(dial,old);else box.appendChild(dial);
  if(!data||!data.list.length)return;var n=data.list.length,cur=0;data.list.forEach(function(s,i){if(s.cur)cur=i;});CP.cur=cur;CP.data=data;
  dial.appendChild(dialSvg(data.list));
  data.list.forEach(function(s,i){var a=angleOf(i,n)*Math.PI/180,sl=mk("div","skc-slot"),up=mk("div","skc-up"),b=mk("button","skc-cart");sl.style.left=(152+126*Math.cos(a)-36).toFixed(1)+"px";sl.style.top=(152+126*Math.sin(a)-36).toFixed(1)+"px";
    b.type="button";b.setAttribute("aria-label",ROMAN[i]+". "+s.name+(s.done?", done":"")+(i===cur?", the stage in hand":s.next?", the next stage":""));if(i===cur)b.setAttribute("aria-current","step");
    b.appendChild(cartEl(ROMAN[i],i===cur?"cur":s.done?"done":"ahead"));
    b.addEventListener("pointerenter",function(){tagFor(H,i,s,n);});b.addEventListener("focus",function(){tagFor(H,i,s,n);});
    b.addEventListener("pointerleave",function(){[].forEach.call(o.querySelectorAll(".skh-label.tag"),function(l){l.parentNode.removeChild(l);});});
    b.addEventListener("click",function(){var C=W.IngCareer,S=C.state();S.ui.room="mentor";S.ui.show="work";
      try{if(data.room==="counsellor"&&W.IngCounsel){IngCounsel.go(s.k);}else{C.mentor.state().step=s.k;try{saveState();}catch(e){}C.render();}}catch(e){}});
    up.appendChild(b);sl.appendChild(up);dial.appendChild(sl);});
  label(o,284,40,1,0,ROMAN[cur]+" · "+data.list[cur].name,data.list.every(function(x){return x.done;})?"every stage done":data.list[cur].done?"done":"in hand");
  H.hint.innerHTML="";H.hint.appendChild(D.createTextNode("Your bearing: "));H.hint.appendChild(mk("b",null,ROMAN[cur]+" · "+data.list[cur].name));H.hint.appendChild(D.createTextNode(". Press a stage to turn the dial to it."));
  var target=nearest(-cur*(360/n),CP.T);
  if(!CP.painted&&!still()){var pre=target+360/n*1.5;dial.style.transition="none";[].forEach.call(dial.querySelectorAll(".skc-up"),function(u){u.style.transition="none";});CP.T=pre;turnTo(pre,true);void dial.offsetWidth;
    dial.style.transition="";[].forEach.call(dial.querySelectorAll(".skc-up"),function(u){u.style.transition="";});
    requestAnimationFrame(function(){requestAnimationFrame(function(){turnTo(target);});});}
  else{var prev=CP.T;if(prev==null){CP.T=target;}dial.style.transition="none";[].forEach.call(dial.querySelectorAll(".skc-up"),function(u){u.style.transition="none";});turnTo(prev==null?target:prev,true);void dial.offsetWidth;
    dial.style.transition="";[].forEach.call(dial.querySelectorAll(".skc-up"),function(u){u.style.transition="";});if(prev!=null&&Math.abs(prev-target)>.01)requestAnimationFrame(function(){turnTo(target);});}
  CP.painted=true;}
function dressCareer(){var pg=$("page-career");if(!pg||!$("cs"))return false;pg.classList.add("sk-on");paintCompass();return true;}

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
  b.innerHTML='<i class="lf-shade"></i><i class="lf-leaf c"></i><i class="lf-leaf b"></i><i class="lf-leaf a"></i><span class="lf-sheet"><span class="lf-cap"></span><span class="lf-ttl"></span><span class="lf-sub"></span>'+
    '<span class="lf-lines"><i style="width:92%"></i><i style="width:84%"></i><i style="width:88%"></i><i style="width:58%"></i><i class="gap"></i><i style="width:90%"></i><i style="width:80%"></i><i style="width:64%"></i></span>'+
    '<span class="lf-rule"></span><span class="lf-num"></span></span><span class="lf-tab"></span><span class="lf-ribbon"></span>';
  b.addEventListener("pointerdown",function(e){if(e.button!=null&&e.button!==0)return;b.classList.add("lf-down");});
  ["pointerup","pointercancel","pointerleave","blur"].forEach(function(t){b.addEventListener(t,function(){b.classList.remove("lf-down");});});
  b.addEventListener("click",function(e){e.preventDefault();lfOpen(b.__d);});return b;}
function lfSet(e,s){if(e&&e.textContent!==s)e.textContent=s;}
function lfFill(b,d,pos){b.__d=d;var cls="lf-card lf-"+pos+(d&&d.done?" is-done":"");if(b.className!==cls)b.className=cls;b.hidden=!d;if(!d)return;
  var n=d.name,cap=(n.replace(/^(Master|The)\s+/i,"").charAt(0)||"·").toUpperCase(),a=lfApps(),sub=a?"from the "+(a===1?"app":a+" apps")+" you chose":"from the apps you choose";
  lfSet(b.querySelector(".lf-tab"),n);lfSet(b.querySelector(".lf-cap"),cap);lfSet(b.querySelector(".lf-ttl"),n);lfSet(b.querySelector(".lf-sub"),sub);lfSet(b.querySelector(".lf-num"),ROMAN[d.i]||String(d.i+1));
  var lab=n+(pos==="f"?", shown in The document":"")+". Press to read it.";if(b.getAttribute("aria-label")!==lab)b.setAttribute("aria-label",lab);}
/* the paper's tooth: a small tile of grain, made once */
function grainTile(dark){var c=D.createElement("canvas");c.width=c.height=96;var g=c.getContext("2d"),im=g.createImageData(96,96),s=7;
  for(var i=0;i<im.data.length;i+=4){s=(s*1103515245+12345)&2147483647;var v=s/2147483647;im.data[i]=dark?205:90;im.data[i+1]=dark?184:64;im.data[i+2]=dark?240:150;im.data[i+3]=Math.round(v*v*(dark?20:16));}
  g.putImageData(im,0,0);try{return 'url("'+c.toDataURL("image/png")+'")';}catch(e){return "none";}}
function lfBuild(H){var root=mk("div","lf");root.setAttribute("role","group");root.setAttribute("aria-label","The documents of this reading");
  var tilt=mk("div","lf-tilt"),sway=mk("div","lf-sway");root.appendChild(mk("i","lf-cast"));LB.cards=[lfCard(),lfCard(),lfCard()];
  sway.appendChild(LB.cards[0]);sway.appendChild(LB.cards[2]);sway.appendChild(LB.cards[1]);
  var sl=mk("div","lf-seal");sl.appendChild(sealKey("lf-key","Ingenium's seal. Press it for fun.",74));sway.appendChild(sl);
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
function paintLector(){var H=lectorHero();if(!H)return;var lx=$("lx7"),st=lectorState(),t=lfThree(),key=JSON.stringify({s:st.steps,d:t.map(function(d){return d?[d.name,!!d.on,!!d.done,d.i]:null;}),a:lfApps()});if(key===LB.key)return;LB.key=key;
  if(LB.row&&LB.row.parentNode)LB.row.parentNode.removeChild(LB.row);LB.row=steps(st.steps.length?st.steps:[{name:"Choose",sub:SUBS.choose,now:true},{name:"Read",sub:SUBS.read},{name:"Write",sub:SUBS.write},{name:"Save",sub:SUBS.save}],function(i){goStep(i);});
  lx.parentNode.insertBefore(LB.row,lx);
  lfFill(LB.cards[0],t[0],"l");lfFill(LB.cards[1],t[1],"f");lfFill(LB.cards[2],t[2],"r");
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
W.IngStudios={career:dressCareer,lector:dressLector,compass:paintCompass,documents:paintLector,turn:function(T){turnTo(T);},
  state:function(){return {T:CP.T,cur:CP.cur,n:CP.data?CP.data.list.length:0,cp:CP.key,lb:LB.key};},
  /* what the other heads share with these (Focus, modules/r291.js; Build, modules/r292.js) */
  kit:{hero:hero,label:label,steps:steps,orb:orb,wireOrb:wireOrb,sealKey:sealKey,plateUrl:plateUrl,collarUrl:collarUrl,scrollTo:scrollTo,still:still,night:night,mk:mk,svg:svg,img:img,ICO:ICO,ROMAN:ROMAN,
    mv:{pal:mvPal,tag:mvTag,scale:mvScale,cv:mvCv,rgb:mvRgb,grain:mvGrain,env:mvEnv,ring:mvRingPx,setting:mvSetting,plate:mvPlate,LX:MVLX,LY:MVLY}}};
try{window.__ingParts["p290"]="running";}catch(_){}
})();
</script>
