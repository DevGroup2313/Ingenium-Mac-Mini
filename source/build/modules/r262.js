<style id="r262-css">
/* ============ R262 · BLEND AS A MOVEMENT IN 3D (Ingenium 6.70, 10 November 2026; first made in 6.68 in Home's language) ============
   Her words (10 November 2026): "I don't want the Blend page to just be a repeat of the Home page and its designs and animations. I want
   that page to have its own look and identity and its own animation, please redesign the spinning logo and orbs for a different
   design." Of the directions that followed: "The "Movement" is the least ugly one but its too flashy in its current colours and
   designs"; of the Movement made quiet: "I like this design the best and I want it pushed everywhere. I just want the logo icon to be
   more animated inside of the little engine wheel. I want it to still have the animation that it has on the Home page." Then: "I want
   it to look 3D and refined like the other pages inside of Ingenium ... The engine logo looks bad inside of the design, it does not
   look built in, it looks placed on top badly"; "I want the 3D look kept and preserved and deepened. It is starting to look fake and
   cartoonish." A version leaning away from her was refused ("it is not even facing me"), so the movement always faces her. On the
   preview that followed: "I approve of this design, please push it everywhere and continue working on my requests."
   Blend keeps every part it had (the models on this device and the connected ones, the ways, effort and Ultra, the writer, the
   question, the run, every answer with its thinking, the plan and the checks, the ready-made blends, Save as a house); its own
   elements are moved in whole and dressed, so each keeps what it does and its sound (R176).
   - The head is a quiet desk (no sky, no stars, no gold): Blend's title in Ingenium's Cormorant, its lede, and its two rooms (New
     blend, Ready-made) as Home's card keys. On the right, the movement, one object built in layers at their own depths: a frosted
     plate with a polished edge; on it Ingenium's wheel, which holds Ingenium's own seal key in a polished collar over an enamel dial
     (R104's layers, its star turning counterclockwise as on Home, R175's flourish on every press, and a press winds the movement).
   - Each model chosen in step I is a wheel in its own violet with pale teeth and its own mark (Velox a swift arrow, Magister the
     scales, Scriba a quill, Faber a hammer, a connected model a cloud, any other a chip), meshing with Ingenium's wheel. The wheels
     are rendered, not drawn: each surface is computed once from its outline (rounded, polished edges, holes you can see through to
     the plate, a turned face), and a light from the top left that stays still while the wheels turn (held inside each turning
     outline); each wheel has its thickness and casts a soft shadow on the plate. The wheels turn by CSS animations and the whole
     movement sways a little, as the seal does on Home, by the Web Animations API: nothing is redrawn while Blend is left alone.
   - Pointing at a wheel brings the movement to rest facing her, slows the wheels to a stop, lifts the wheel and names it in the line
     under the words; pressing it opens step I at its row. Places wait, as wheels too, while fewer than two are chosen. Each model's
     name and what it does in this blend stand outside the plate.
   - The four steps are raised labels with their numerals (I to IV), the step being shown in Ingenium's violet, a tick on those done;
     each step's panel and the answers are Home's slabs; every model row (with its own small wheel), way, answer and ready-made card
     leans toward the pointer, lifts under it and sinks when pressed.
   - Minimal motion and the system's reduced motion keep it all still; below 760 pixels Blend keeps its former layout. */
#page-blend.bx-on{--bx-ink1:#221a2e;--bx-ink2:#4a4358;--bx-ink3:#6c6579;--bx-hair:rgba(34,26,46,.10);--bx-hair2:rgba(34,26,46,.06);--bx-acc:#6a3fb5;
  --bx-hi:#ffffff;--bx-lo:#faf8fc;--bx-sunk:rgba(34,26,46,.035);--bx-keyA:#ffffff;--bx-keyB:#f6f2fb;--bx-pa:#7a50c6;--bx-pb:#5d37a1;--bx-pedge:#3a2070;
  --bx-slab:inset 0 1px 0 rgba(255,255,255,.9),inset 0 -1px 0 rgba(40,22,68,.05),0 1px 0 rgba(40,22,68,.10),0 3px 0 rgba(40,22,68,.05),0 6px 12px rgba(40,22,68,.07),0 18px 36px rgba(40,22,68,.08);
  --bx-key:inset 0 -1.5px 0 rgba(40,22,68,.13),0 2px 0 rgba(40,22,68,.25),0 4px 5px rgba(40,22,68,.16),0 9px 14px rgba(40,22,68,.1);
  --bx-keyhi:inset 0 -1.5px 0 rgba(40,22,68,.13),0 3px 0 rgba(40,22,68,.25),0 6px 8px rgba(40,22,68,.18),0 13px 20px rgba(40,22,68,.12);
  --bx-press:inset 0 2px 5px rgba(40,22,68,.22),0 1px 1px rgba(40,22,68,.18);
  --bx-desk:radial-gradient(ellipse 75% 85% at 72% 42%,#fdfbff 0%,#f4eff9 52%,#e9e1f4 100%);--bx-ring:rgba(106,63,181,.10);--bx-line:rgba(106,63,181,.30);
  --bx-edge0:#d8cdee;--bx-edge1:#c4b5e3;--bx-inlay:#f7f3fd;--bx-under:rgba(40,22,68,.2);--bx-under2:rgba(40,22,68,.12);--bx-under3:rgba(40,22,68,.04);
  --bx-serif:"Home Cormorant","Cormorant Garamond",Cormorant,"Iowan Old Style",Palatino,Georgia,serif}
body[data-theme="night"] #page-blend.bx-on{--bx-ink1:#f3eefb;--bx-ink2:#d3c9e3;--bx-ink3:#a99cc1;--bx-hair:rgba(205,184,240,.12);--bx-hair2:rgba(205,184,240,.07);--bx-acc:#b79ce6;
  --bx-hi:#211a2d;--bx-lo:#1b1526;--bx-sunk:rgba(10,6,18,.32);--bx-keyA:#2a2239;--bx-keyB:#231c31;--bx-pedge:#170b30;
  --bx-slab:inset 0 1px 0 rgba(255,255,255,.06),inset 0 -1px 0 rgba(0,0,0,.35),0 1px 0 rgba(0,0,0,.6),0 3px 0 rgba(0,0,0,.28),0 6px 12px rgba(0,0,0,.35),0 18px 36px rgba(0,0,0,.4);
  --bx-key:inset 0 1px 0 rgba(255,255,255,.07),inset 0 -2px 0 rgba(0,0,0,.45),0 2px 0 rgba(0,0,0,.75),0 4px 5px rgba(0,0,0,.5),0 9px 14px rgba(0,0,0,.36);
  --bx-keyhi:inset 0 1px 0 rgba(255,255,255,.07),inset 0 -2px 0 rgba(0,0,0,.45),0 3px 0 rgba(0,0,0,.75),0 6px 8px rgba(0,0,0,.52),0 13px 20px rgba(0,0,0,.38);
  --bx-press:inset 0 2px 6px rgba(0,0,0,.6),0 1px 1px rgba(0,0,0,.4);
  --bx-desk:radial-gradient(ellipse 75% 85% at 72% 42%,#241a37 0%,#171025 52%,#0d0916 100%);--bx-ring:rgba(205,184,240,.10);--bx-line:rgba(196,176,238,.30);
  --bx-edge0:#120d20;--bx-edge1:#0c0816;--bx-inlay:#e6ddfa;--bx-under:rgba(0,0,0,.6);--bx-under2:rgba(0,0,0,.36);--bx-under3:rgba(0,0,0,.1)}
#page-blend:not(.bx-on) .bx-head,#page-blend:not(.bx-on) .bx-steps{display:none}
/* ---------- the head: a quiet desk, Blend's words and rooms, the movement of the chosen models ---------- */
#page-blend.bx-on .bx-head{position:relative;height:470px;margin:0 0 8px;border-radius:30px;overflow:hidden;isolation:isolate;background:var(--bx-desk);color:var(--bx-ink1);
  box-shadow:inset 0 0 0 1px var(--bx-ring),0 1px 1px rgba(40,22,68,.04),0 4px 6px rgba(40,22,68,.04),0 14px 28px rgba(40,22,68,.07),0 34px 60px rgba(40,22,68,.08)}
body[data-theme="night"] #page-blend.bx-on .bx-head{box-shadow:inset 0 0 0 1px var(--bx-ring),0 14px 28px rgba(0,0,0,.45),0 34px 60px rgba(0,0,0,.4)}
#page-blend.bx-on .bx-words{position:absolute;left:40px;top:34px;z-index:5;width:var(--bx-ww,470px)}
#page-blend.bx-on .bx-eyebrow{display:flex;gap:14px;font:600 11.5px/1 var(--sans,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif);letter-spacing:.28em;text-transform:uppercase;color:var(--bx-ink3)}
#page-blend.bx-on .bx-eyebrow b{color:var(--bx-acc);font-weight:600}
#page-blend.bx-on .bx-words > .page-title{margin:12px 0 10px;padding:0;border:0;font:600 48px/1.04 var(--bx-serif);letter-spacing:.004em;color:var(--bx-ink1)}
#page-blend.bx-on .bx-words > .page-title::after,#page-blend.bx-on .bx-words > .page-title::before{display:none}
#page-blend.bx-on .bx-words > .lede{margin:0 0 16px;max-width:none;font-size:14px;line-height:1.55;color:var(--bx-ink2)}
#page-blend.bx-on .bx-words > .rm-bar{margin:0;padding:0;background:none;border:0;box-shadow:none;position:static}
#page-blend.bx-on .bx-words .rm-row{display:flex;gap:10px;margin:0;padding:0}
#page-blend.bx-on .bx-words .rm-tabs{display:flex;gap:10px;margin:0;padding:0;background:none;border:0;box-shadow:none}
#page-blend.bx-on .bx-words .rm-says{margin:10px 0 0;max-width:460px;font-size:12.5px;line-height:1.5;color:var(--bx-ink3)}
/* keys, as Home's card keys: a raised face that lifts and sinks */
#page-blend.bx-on .bx-words .rm-tab,#page-blend.bx-on .bl-setup .btn,#page-blend.bx-on .bl-setup .rm-stepnav button,#page-blend.bx-on .bl-results .btn,#page-blend.bx-on .bl-preset .btn{
  position:relative;display:inline-flex;align-items:center;justify-content:center;gap:8px;min-height:36px;padding:8px 16px;border-radius:12px;border:1px solid var(--bx-hair);
  background:linear-gradient(var(--bx-keyA),var(--bx-keyB));color:var(--bx-ink1);font-weight:600;font-size:13px;cursor:pointer;box-shadow:var(--bx-key);
  transition:transform .16s cubic-bezier(.34,1.35,.64,1),box-shadow .16s ease}
#page-blend.bx-on .bx-words .rm-tab:hover,#page-blend.bx-on .bl-setup .btn:hover,#page-blend.bx-on .bl-setup .rm-stepnav button:hover,#page-blend.bx-on .bl-results .btn:hover,#page-blend.bx-on .bl-preset .btn:hover{
  transform:translateY(-2px);box-shadow:var(--bx-keyhi)}
#page-blend.bx-on .bx-words .rm-tab:active,#page-blend.bx-on .bl-setup .btn:active,#page-blend.bx-on .bl-setup .rm-stepnav button:active,#page-blend.bx-on .bl-results .btn:active,#page-blend.bx-on .bl-preset .btn:active{
  transform:translateY(1px);box-shadow:var(--bx-press);transition-duration:.06s}
#page-blend.bx-on .bx-words .rm-tab[aria-selected="true"],#page-blend.bx-on .bl-setup .btn.primary,#page-blend.bx-on .bl-setup .rm-stepnav .rm-next,#page-blend.bx-on .bl-results .btn.primary,#page-blend.bx-on .bl-preset .btn.primary{
  background:linear-gradient(var(--bx-pa),var(--bx-pb));border-color:transparent;color:#fff;
  box-shadow:inset 0 1px 0 rgba(255,255,255,.16),0 2px 0 var(--bx-pedge),0 4px 6px rgba(40,22,68,.24),0 9px 16px rgba(40,22,68,.16)}
#page-blend.bx-on .bx-words .rm-tab[aria-selected="true"] svg{color:#fff}
#page-blend.bx-on .bl-setup .btn.small{min-height:30px;padding:5px 12px;font-size:12px}
@media (prefers-reduced-motion:reduce){#page-blend.bx-on .bx-words .rm-tab:hover,#page-blend.bx-on .bl-setup .btn:hover,#page-blend.bx-on .bl-results .btn:hover{transform:none}}
/* ---------- the movement: one object built in layers at their own depths, rendered as metal and lit from the top left ---------- */
#page-blend.bx-on .bx-move{position:absolute;right:36px;top:22px;width:520px;height:424px;z-index:3;transform:scale(var(--bx-k,1));transform-origin:100% 0}
#page-blend.bx-on .bx-stage{position:absolute;inset:0;perspective:1100px;perspective-origin:50% 48%}
#page-blend.bx-on .bx-sway{position:absolute;inset:0;transform-style:preserve-3d}
#page-blend.bx-on .bx-cv{position:absolute;left:0;top:0;width:100%;height:100%;display:block;pointer-events:none}
#page-blend.bx-on .bx-plate{position:absolute;left:90px;top:44px;width:340px;height:340px;transform-style:preserve-3d;pointer-events:none}
#page-blend.bx-on .bx-plate i{position:absolute;inset:0;border-radius:50%;background:var(--bx-edge1);transform:translateZ(calc(var(--z) * -1px))}
#page-blend.bx-on .bx-plate i:nth-child(3){background:var(--bx-edge0)}
#page-blend.bx-on .bx-under{position:absolute;left:66px;top:62px;width:388px;height:368px;border-radius:50%;transform:translateZ(-26px);pointer-events:none;
  background:radial-gradient(closest-side,var(--bx-under),var(--bx-under2) 55%,var(--bx-under3) 82%,rgba(0,0,0,0))}
#page-blend.bx-on .bx-w{position:absolute;width:var(--D);height:var(--D);margin:calc(var(--D) / -2) 0 0 calc(var(--D) / -2);transform-style:preserve-3d;transform:translateZ(18px);
  --rx:0deg;--ry:0deg;--lift:0px;--sc:1}
#page-blend.bx-on .bx-w.bx-enter .bx-wt{animation:bxIn .7s cubic-bezier(.22,1,.36,1) backwards}
@keyframes bxIn{from{opacity:0;transform:translateZ(30px) scale(.9)}}
#page-blend.bx-on .bx-cast{position:absolute;inset:0;pointer-events:none;opacity:.36;transform:translateZ(-17px) translate(4px,7px);transition:transform .5s cubic-bezier(.2,.8,.2,1),opacity .5s ease}
#page-blend.bx-on .bx-cast .bx-cv{left:-8%;top:-8%;width:116%;height:116%}
body[data-theme="night"] #page-blend.bx-on .bx-cast{opacity:.66}
#page-blend.bx-on .bx-wt{position:absolute;inset:0;transform-style:preserve-3d;transform:rotateX(var(--rx)) rotateY(var(--ry)) translateZ(var(--lift)) scale(var(--sc));
  transition:transform .45s cubic-bezier(.2,.8,.2,1)}
#page-blend.bx-on .bx-l{position:absolute;inset:0;pointer-events:none;transform-style:preserve-3d}
#page-blend.bx-on .bx-rim.r1{transform:translateZ(-7.5px)}#page-blend.bx-on .bx-rim.r2{transform:translateZ(-5px)}#page-blend.bx-on .bx-rim.r3{transform:translateZ(-2.5px)}
#page-blend.bx-on .bx-face{transform:translateZ(0)}
#page-blend.bx-on .bx-turn{position:absolute;inset:0;animation:bxTurn calc(var(--p,40s) * var(--bx-f,1)) linear infinite;animation-direction:var(--dir,normal)}
#page-blend.bx-on .bx-turn.bx-unturn{animation-name:bxUnturn}
@keyframes bxTurn{from{transform:rotate(var(--r0,0deg))}to{transform:rotate(calc(var(--r0,0deg) + 360deg))}}
@keyframes bxUnturn{from{transform:rotate(calc(var(--r0,0deg) * -1))}to{transform:rotate(calc(var(--r0,0deg) * -1 - 360deg))}}
#page-blend.bx-on .bx-mask{-webkit-mask-size:100% 100%;mask-size:100% 100%;-webkit-mask-repeat:no-repeat;mask-repeat:no-repeat}
#page-blend.bx-on .bx-hub{position:absolute;left:27%;top:27%;width:46%;height:46%;pointer-events:none;transform:translateZ(.8px)}
#page-blend.bx-on .bx-hub.bx-chaton{left:18%;top:18%;width:64%;height:64%}
#page-blend.bx-on .bx-mark{position:absolute;left:50%;top:50%;width:calc(var(--D) * .25);height:calc(var(--D) * .25);margin:calc(var(--D) * -.125) 0 0 calc(var(--D) * -.125);
  color:var(--bx-inlay);pointer-events:none;transform:translateZ(1.4px)}
#page-blend.bx-on .bx-mark svg{display:block;width:100%;height:100%}
#page-blend.bx-on .bx-w.bx-ghostw .bx-turn{animation:none}
#page-blend.bx-on .bx-w.bx-ghostw .bx-wt{opacity:.5}
#page-blend.bx-on .bx-w.bx-ghostw::after{content:"+";position:absolute;inset:0;display:grid;place-items:center;font:500 calc(var(--D) * .34)/1 var(--bx-serif);color:var(--bx-ink3);transform:translateZ(8px);pointer-events:none}
#page-blend.bx-on .bx-hit{position:absolute;inset:0;width:auto;height:auto;min-height:0;margin:0;padding:0;border:0;border-radius:50%;background:none;box-shadow:none;cursor:pointer;
  transform:translateZ(8px);-webkit-tap-highlight-color:transparent}
#page-blend.bx-on .bx-hit:hover,#page-blend.bx-on .bx-hit:active{background:none;box-shadow:none}
#page-blend.bx-on .bx-hit:focus{outline:none}
#page-blend.bx-on .bx-hit:focus-visible{box-shadow:0 0 0 2.5px var(--bx-acc)}
#page-blend.bx-on .bx-w.bx-hov{--lift:14px;--sc:1.04}
#page-blend.bx-on .bx-w.bx-hov .bx-cast{opacity:.24;transform:translateZ(-17px) translate(8px,14px) scale(1.05)}
body[data-theme="night"] #page-blend.bx-on .bx-w.bx-hov .bx-cast{opacity:.48}
#page-blend.bx-on .bx-w.bx-dn{--lift:3px;--sc:.97}
#page-blend.bx-on .bx-w.bx-dn .bx-wt{transition-duration:.08s}
body[data-motion="full"] #page-blend.bx-on .bx-move{--bx-f:.75}
body.touring #page-blend.bx-on .bx-turn{animation-play-state:paused}
body[data-motion="minimal"] #page-blend.bx-on .bx-turn,body[data-motion="minimal"] #page-blend.bx-on .bx-w.bx-enter .bx-wt{animation:none}
body[data-motion="minimal"] #page-blend.bx-on .bx-wt{transform:none;transition:none}
@media (prefers-reduced-motion:reduce){#page-blend.bx-on .bx-turn,#page-blend.bx-on .bx-w.bx-enter .bx-wt{animation:none}#page-blend.bx-on .bx-wt{transition:none}}
/* Ingenium's wheel holds its seal in a polished collar: the seal's face is the enamel dial under it, and the seal's ring, star and heart
   stand on the dial, its star turning counterclockwise as on Home */
#page-blend.bx-on .bx-seat{position:absolute;left:50%;top:50%;width:70px;height:70px;margin:-35px 0 0 -35px;transform:translateZ(1.4px);transform-style:preserve-3d}
#page-blend.bx-on .bx-seat .hx-seal{position:absolute;inset:0;width:70px;height:70px;margin:0}
#page-blend.bx-on .bx-seat .r175-seal{position:absolute;inset:0;width:100%;height:100%;min-height:0;margin:0;padding:0}
#page-blend.bx-on .bx-seat .isl{--S:70px !important}
#page-blend.bx-on .bx-seat .isl .isl-ring{--fz:.08;--fk:.98}
#page-blend.bx-on .bx-seat .isl .isl-star{--fz:.17;--fk:.9575}
#page-blend.bx-on .bx-seat .isl .isl-heart{--fz:.3;--fk:.925}
#page-blend.bx-on .bx-seat .isl .isl-cast,#page-blend.bx-on .bx-seat .isl .isl-edge,#page-blend.bx-on .bx-seat .isl .isl-back{display:none !important}
#page-blend.bx-on .bx-seat .isl .isl-idle{animation:none !important}
#page-blend.bx-on .bx-seat .isl .isl-tilt{transform:none !important}
#page-blend.bx-on .bx-seat .r175-glow.gold{--r175-c:rgba(106,63,181,.34)}
body[data-theme="night"] #page-blend.bx-on .bx-seat .r175-glow.gold{--r175-c:rgba(201,178,242,.36)}
@keyframes bxEngine{from{transform:rotate(0deg)}to{transform:rotate(-360deg)}}
#page-blend.bx-on .bx-seat .seal-spin{animation:bxEngine 9s linear infinite}
body[data-motion="calm"] #page-blend.bx-on .bx-seat .seal-spin{animation-duration:13s}
body[data-motion="minimal"] #page-blend.bx-on .bx-seat .seal-spin{animation:none}
@media (prefers-reduced-motion:reduce){#page-blend.bx-on .bx-seat .seal-spin{animation:none}}
/* each model's name, and what it does in this blend, outside the plate */
#page-blend.bx-on .bx-labels{position:absolute;inset:0;pointer-events:none}
#page-blend.bx-on .bx-label{position:absolute;z-index:7;transform:translate(-50%,-50%);text-align:center;white-space:nowrap;pointer-events:none;transition:opacity .3s ease}
#page-blend.bx-on .bx-label.bx-at-r{transform:translate(0,-50%);text-align:left}
#page-blend.bx-on .bx-label.bx-at-l{transform:translate(-100%,-50%);text-align:right}
#page-blend.bx-on .bx-label.bx-at-t{transform:translate(-50%,-100%)}
#page-blend.bx-on .bx-label.bx-at-b{transform:translate(-50%,0)}
#page-blend.bx-on .bx-label .bx-name{display:block;font:600 15px/1.1 var(--bx-serif);letter-spacing:.03em;color:var(--bx-ink1)}
#page-blend.bx-on .bx-label .bx-role{display:block;margin-top:2px;font-size:10.5px;font-weight:600;line-height:1.2;color:var(--bx-acc)}
#page-blend.bx-on .bx-label .bx-role:empty{display:none}
#page-blend.bx-on .bx-label.bx-ghostl .bx-name{font:italic 500 14px/1.1 var(--bx-serif);color:var(--bx-ink3)}
#page-blend.bx-on .bx-head.bx-hold .bx-label:not(.bx-near){opacity:.45}
#page-blend.bx-on .bx-count{position:absolute;left:40px;bottom:24px;z-index:6;max-width:var(--bx-ww,470px);font:italic 500 16px/1.4 var(--bx-serif);color:var(--bx-ink3);transition:color .25s ease}
#page-blend.bx-on .bx-count b{font-style:normal;font-weight:600;color:var(--bx-ink1);letter-spacing:.02em}
#page-blend.bx-on .bx-head.bx-hold .bx-count{color:var(--bx-ink2)}
/* ---------- the four steps: raised labels with their numerals; the one shown in Ingenium's violet ---------- */
#page-blend.bx-on .bx-steps{display:flex;justify-content:center;margin:0 0 10px;padding:6px 0 2px}
#page-blend.rm-on:not([data-rm-room="new"]).bx-on .bx-steps{display:none}
#page-blend.bx-on .bx-steps .rm-steps{position:relative;display:flex;justify-content:center;gap:16px;margin:0;padding:0;list-style:none;width:auto;background:none;border:0;box-shadow:none}
#page-blend.bx-on .bx-steps .rm-steps > li{list-style:none;margin:0;padding:0;flex:0 0 auto}
#page-blend.bx-on .bx-steps .rm-step{position:relative;width:176px;min-height:60px;display:grid;grid-template-columns:auto minmax(0,1fr);align-items:center;column-gap:10px;row-gap:1px;margin:0;padding:10px 14px;
  border:1px solid var(--bx-hair);border-radius:16px;background:linear-gradient(var(--bx-keyA),var(--bx-keyB));box-shadow:var(--bx-key);color:var(--bx-ink1);cursor:pointer;text-align:left;transform:none;
  transition:transform .3s cubic-bezier(.34,1.35,.64,1),box-shadow .2s ease}
#page-blend.bx-on .bx-steps .rm-step:hover{transform:translateY(-3px);box-shadow:var(--bx-keyhi);background:linear-gradient(var(--bx-keyA),var(--bx-keyB))}
#page-blend.bx-on .bx-steps .rm-step:active{transform:translateY(1px);box-shadow:var(--bx-press);transition-duration:.06s}
#page-blend.bx-on .bx-steps .rm-step > i{display:none}
#page-blend.bx-on .bx-steps .rm-step .bx-num{grid-row:1 / span 2;min-width:32px;text-align:center;font:600 24px/1 var(--bx-serif);color:var(--bx-acc)}
#page-blend.bx-on .bx-steps .rm-step > span:not(.rm-sr):not(.bx-sd):not(.bx-num):not(.bx-tick){grid-column:2;font:600 16px/1.1 var(--bx-serif);letter-spacing:.03em;color:inherit}
#page-blend.bx-on .bx-steps .rm-step .bx-sd{grid-column:2;font-size:11px;line-height:1.3;color:var(--bx-ink3)}
#page-blend.bx-on .bx-steps .rm-step[aria-current="step"],#page-blend.bx-on .bx-steps .rm-step[aria-current="step"]:hover{background:linear-gradient(var(--bx-pa),var(--bx-pb));border-color:transparent;color:#fff;transform:translateY(-3px);
  box-shadow:inset 0 1px 0 rgba(255,255,255,.16),0 3px 0 var(--bx-pedge),0 8px 14px rgba(40,22,68,.22)}
#page-blend.bx-on .bx-steps .rm-step[aria-current="step"] .bx-num{color:#fff}
#page-blend.bx-on .bx-steps .rm-step[aria-current="step"] .bx-sd{color:rgba(255,255,255,.82)}
#page-blend.bx-on .bx-steps .rm-step:focus{outline:none}
#page-blend.bx-on .bx-steps .rm-step:focus-visible{outline:2.5px solid var(--bx-acc);outline-offset:3px}
#page-blend.bx-on .bx-steps .bx-tick{position:absolute;right:-6px;top:-6px;width:20px;height:20px;border-radius:50%;background:var(--bx-acc);color:#fff;display:none;place-items:center;box-shadow:0 2px 4px rgba(40,22,68,.3)}
#page-blend.bx-on .bx-steps .rm-step.rm-done .bx-tick{display:grid}
#page-blend.bx-on .bx-steps .bx-tick svg{width:12px;height:12px}
@media (prefers-reduced-motion:reduce){#page-blend.bx-on .bx-steps .rm-step,#page-blend.bx-on .bx-steps .rm-step:hover,#page-blend.bx-on .bx-steps .rm-step[aria-current="step"]{transform:none}}
/* ---------- the panels: Home's slabs ---------- */
#page-blend.bx-on .bl-grid{gap:18px;align-items:start}
#page-blend.bx-on .bl-setup,#page-blend.bx-on .bl-results{border-radius:22px;background:linear-gradient(var(--bx-hi),var(--bx-lo));border:1px solid var(--bx-hair);box-shadow:var(--bx-slab);padding:20px 20px 18px;color:var(--bx-ink1)}
#page-blend.bx-on .bl-setup > h2.sec{font:600 22px/1.15 var(--bx-serif);letter-spacing:.02em;color:var(--bx-ink1)}
#page-blend.bx-on .bl-setup .blx-cxh,#page-blend.bx-on .bl-setup .blx-grp{margin:14px 0 8px;font-size:10.5px;font-weight:700;line-height:1.2;letter-spacing:.2em;text-transform:uppercase;color:var(--bx-ink3)}
/* each model a row with its own small wheel: a chosen one stands raised and turns in the movement */
#page-blend.bx-on .bl-pick{display:flex;flex-direction:column;gap:8px}
#page-blend.bx-on .bl-model{display:flex;align-items:center;gap:12px;margin:0;padding:8px 12px 8px 8px;border-radius:14px;border:1px solid var(--bx-hair2);background:var(--bx-sunk);color:var(--bx-ink1);cursor:pointer}
#page-blend.bx-on .bl-model.bx-chosen{background:linear-gradient(var(--bx-keyA),var(--bx-keyB));border-color:var(--bx-hair);box-shadow:var(--bx-key)}
#page-blend.bx-on .bl-model.bx-seen{box-shadow:inset 0 0 0 1.5px var(--bx-acc),var(--bx-keyhi)}
#page-blend.bx-on .bl-model.off{opacity:.6}
#page-blend.bx-on .bl-model .bl-sw{display:none}
#page-blend.bx-on .bl-model .bx-rw{position:relative;flex:0 0 auto;display:block;width:46px;height:46px;margin:-4px 0 -4px -2px;filter:drop-shadow(0 2px 2px rgba(40,22,68,.22))}
body[data-theme="night"] #page-blend.bx-on .bl-model .bx-rw{filter:drop-shadow(0 2px 3px rgba(0,0,0,.5))}
#page-blend.bx-on .bl-model .bx-rw .bx-rmark{position:absolute;left:37.5%;top:37.5%;width:25%;height:25%;color:var(--bx-inlay)}
#page-blend.bx-on .bl-model .bx-rw .bx-rmark svg{display:block;width:100%;height:100%}
#page-blend.bx-on .bl-model .bl-mn{font:600 17px/1.2 var(--bx-serif);letter-spacing:.03em}
#page-blend.bx-on .bl-model input[type="checkbox"]{order:9;flex:0 0 auto;margin:0 0 0 auto;width:24px;height:24px;border-radius:50%;border:1.5px solid var(--bx-line);background:transparent;
  -webkit-appearance:none;appearance:none;cursor:pointer;transition:background .2s ease,border-color .2s ease}
#page-blend.bx-on .bl-model input[type="checkbox"]:checked{border-color:var(--bx-acc);background:var(--bx-acc) url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='3' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M5 12.5l4.5 4.5L19 7.5'/%3E%3C/svg%3E") center/13px no-repeat}
#page-blend.bx-on .bl-model input[type="checkbox"]:focus-visible{outline:2.5px solid var(--bx-acc);outline-offset:2px}
/* the ways, as raised keys in their groups */
#page-blend.bx-on .blend-strat{display:flex;align-items:flex-start;gap:10px;margin:0 0 8px;padding:10px 14px;border-radius:14px;border:1px solid var(--bx-hair);
  background:linear-gradient(var(--bx-keyA),var(--bx-keyB));color:var(--bx-ink1);cursor:pointer;box-shadow:var(--bx-key)}
#page-blend.bx-on .blend-strat b{font:600 17px/1.2 var(--bx-serif);letter-spacing:.03em}
#page-blend.bx-on .blend-strat .small{font-size:12px;line-height:1.4;color:var(--bx-ink3)}
#page-blend.bx-on .blend-strat.on{border-color:var(--bx-acc);box-shadow:inset 0 0 0 1.5px var(--bx-acc),var(--bx-key)}
#page-blend.bx-on .blend-strat.on b{color:var(--bx-acc)}
#page-blend.bx-on .blend-strat input[type="radio"]{accent-color:var(--bx-acc);margin-top:3px}
#page-blend.bx-on .bl-setup select,#page-blend.bx-on .bl-setup .bl-task{border-radius:12px;border:1px solid var(--bx-hair);background:var(--bx-sunk);color:var(--bx-ink1);box-shadow:inset 0 1px 2.5px rgba(40,22,68,.06)}
#page-blend.bx-on .bl-setup .bl-task{padding:12px 14px;font-size:14px;line-height:1.5}
#page-blend.bx-on .bl-setup .bl-task:focus{outline:2px solid var(--bx-acc);outline-offset:1px}
#page-blend.bx-on .bl-setup .rm-stepnav{border-top:1px solid var(--bx-hair2)}
/* the answers: each model's answer on its own plate, the final answer raised; each marked with a small wheel of the movement */
#page-blend.bx-on .bl-results .bl-empty{display:grid;place-items:center;min-height:300px;padding:20px;text-align:center;color:var(--bx-ink3);font-size:13px;line-height:1.6}
#page-blend.bx-on .bl-results .bl-empty b{display:block;margin-bottom:6px;font:600 24px/1.2 var(--bx-serif);color:var(--bx-ink1)}
#page-blend.bx-on .bl-results .bl-q{font:600 20px/1.3 var(--bx-serif);letter-spacing:.01em;color:var(--bx-ink1)}
#page-blend.bx-on .bl-results .bl-card{margin:0 0 10px;padding:12px 14px;border-radius:16px;background:var(--bx-sunk);border:1px solid var(--bx-hair2);box-shadow:none}
#page-blend.bx-on .bl-results .bl-card.bl-final{padding:18px 20px;border-radius:20px;background:linear-gradient(var(--bx-keyA),var(--bx-keyB));border-color:var(--bx-hair);box-shadow:var(--bx-slab)}
#page-blend.bx-on .bl-results .bl-card-h b{font:600 16px/1.2 var(--bx-serif);letter-spacing:.03em}
#page-blend.bx-on .bl-results .bl-card.bl-final > .bl-card-h b{font-size:22px}
#page-blend.bx-on .bl-results .bl-card-h b::before,#page-blend.bx-on .bl-results .blx-strip span::before,#page-blend.bx-on .bl-preset .bl-pm span::before{content:"";display:inline-block;
  width:16px;height:16px;margin:0 7px -3px 0;border-radius:50%;background:var(--bx-wimg,radial-gradient(circle at 36% 32%,#c9b6ee 0%,#9068d6 30%,#6a3fb5 62%,#3d2275 100%)) center/contain no-repeat}
#page-blend.bx-on .bl-results .blx-strip span::before,#page-blend.bx-on .bl-preset .bl-pm span::before{width:11px;height:11px;margin:0 5px -1px 0}
#page-blend.bx-on .bl-results .bl-card.bl-final > .bl-card-h b::before{width:22px;height:22px;margin:0 9px -4px 0}
#page-blend.bx-on .bl-preset{border-radius:18px;background:linear-gradient(var(--bx-hi),var(--bx-lo));border:1px solid var(--bx-hair);box-shadow:var(--bx-slab);padding:16px}
#page-blend.bx-on .bl-preset b{font:600 19px/1.2 var(--bx-serif);letter-spacing:.03em}
/* every row, way, answer and card leans toward the pointer, lifts under it and sinks when pressed */
#page-blend.bx-on .bx-pop{transform:perspective(900px) rotateX(var(--ly,0deg)) rotateY(var(--lx,0deg)) translateY(var(--lz,0px));
  transition:transform .45s cubic-bezier(.34,1.35,.64,1),box-shadow .3s ease,background .2s ease}
#page-blend.bx-on .bx-pop.bx-ph{--lz:-3px;box-shadow:var(--bx-keyhi)}
#page-blend.bx-on .bx-pop.bx-pd{--lz:1px;transition-duration:.08s;box-shadow:var(--bx-press)}
#page-blend.bx-on .bl-card.bx-pop.bx-ph{box-shadow:var(--bx-key)}
@media (prefers-reduced-motion:reduce){#page-blend.bx-on .bx-pop{transform:none !important}}
body[data-motion="minimal"] #page-blend.bx-on .bx-pop{transform:none !important}
@media (forced-colors:active){#page-blend.bx-on .bx-head{border:1px solid CanvasText}}
/* ---------- 6.71: on a phone, narrower than 760 pixels (her words, 10 November 2026: "The Iphone app does not have the new pages designs, I want them visible on the new Ios apps, I hate that they still have the old design and not the new one, I want that fixed now please"): the same head, stacked:
   Blend's words, then the movement filling the width, then each model's name and what it does, then the line under it; the steps two by two ---------- */
#page-blend.bx-on .bx-legend{display:none}
#page-blend.bx-on.bx-narrow .bx-head{height:auto;display:flex;flex-direction:column;border-radius:24px}
#page-blend.bx-on.bx-narrow .bx-words{position:relative;left:auto;top:auto;width:auto;padding:22px 20px 0}
#page-blend.bx-on.bx-narrow .bx-words > .page-title{font-size:38px}
#page-blend.bx-on.bx-narrow .bx-words .rm-tabs,#page-blend.bx-on.bx-narrow .bx-words .rm-row{flex-wrap:wrap}
#page-blend.bx-on.bx-narrow .bx-move{position:relative;right:auto;top:auto;flex:0 0 auto;width:520px;height:424px;margin:4px 0 calc(424px * (var(--bx-k,1) - 1)) calc(50% - 260px);
  transform-origin:50% 0}
#page-blend.bx-on.bx-narrow .bx-labels{display:none}
#page-blend.bx-on.bx-narrow .bx-legend{display:flex;flex-wrap:wrap;justify-content:center;gap:4px 16px;padding:2px 18px 8px}
#page-blend.bx-on.bx-narrow .bx-legend span{font-size:11.5px;font-weight:600;line-height:1.4;color:var(--bx-acc)}
#page-blend.bx-on.bx-narrow .bx-legend b{margin-right:5px;font:600 15px/1.2 var(--bx-serif);letter-spacing:.03em;color:var(--bx-ink1)}
#page-blend.bx-on.bx-narrow .bx-count{position:relative;left:auto;bottom:auto;max-width:none;padding:2px 20px 20px;font-size:15px}
#page-blend.bx-on.bx-narrow .bx-steps .rm-steps{flex-wrap:wrap;gap:10px;padding:0 4px}
#page-blend.bx-on.bx-narrow .bx-steps .rm-steps > li{flex:0 0 calc(50% - 5px)}
#page-blend.bx-on.bx-narrow .bx-steps .rm-step{width:100%;min-width:0;padding:9px 10px}
#page-blend.bx-on.bx-narrow .bx-steps .rm-step .bx-num{min-width:24px;font-size:20px}
</style>
<script>try{(window.__ingParts=window.__ingParts||{})["p262"]="started";}catch(_){}
/* R262 · Blend as a movement in 3D: see the note at the top of its styles */
(function(){"use strict";
if(window.__r262)return;window.__r262=1;
var D=document,W=window;
function $(id){return D.getElementById(id);}
function mk(t,c,h){var e=D.createElement(t);if(c)e.className=c;if(h!=null)e.innerHTML=h;return e;}
function motion(){var m="calm";try{m=D.body.getAttribute("data-motion")||"calm";}catch(e){}try{if(W.matchMedia&&matchMedia("(prefers-reduced-motion: reduce)").matches)m="minimal";}catch(e){}return m;}
function still(){return motion()==="minimal";}
function night(){try{return D.body.getAttribute("data-theme")==="night";}catch(e){return false;}}
function esc(t){return String(t).replace(/[&<>"]/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c];});}

/* ---------- each model's colours and mark ---------- */
var TONES=[["#a57fe8","#6a3fb5","#2e1764"],["#9283f2","#4d3db0","#1e1660"],["#c48ae8","#8641b8","#3e1760"],["#b47ad9","#7637a8","#331455"],["#b9a3f2","#7458c6","#33206c"],["#9a6be0","#5c31a4","#250f4b"],["#a98ce8","#6648b8","#281a5e"]];
var MARK={velox:'<path d="M4.5 19.5l11-11"/><path d="M9.5 8.5h6v6"/><path d="M3.5 12.5h4M6.5 16.5h3"/>',
  magister:'<path d="M12 4.5v15M7.5 19.5h9M5 8h14"/><path d="M5 8l-2.6 5.5a2.6 2.6 0 0 0 5.2 0z"/><path d="M19 8l-2.6 5.5a2.6 2.6 0 0 0 5.2 0z"/><circle cx="12" cy="4.5" r="1"/>',
  scriba:'<path d="M19.5 4.5c-6 .8-10.6 5.2-12.6 11.2l-.9 3.8 3.8-.9c6-2 10.4-6.6 11.2-12.6z"/><path d="M6.9 17.1l5.6-5.6"/>',
  faber:'<path d="M13.5 6.5l4 4"/><path d="M12 8l-7.5 7.5a1.4 1.4 0 0 0 0 2l2 2a1.4 1.4 0 0 0 2 0L16 12"/><path d="M12 8l2.5-2.5a2.8 2.8 0 0 1 4 4L16 12"/>',
  cloud:'<path d="M7 18.5h10a4 4 0 0 0 .4-8 5.8 5.8 0 0 0-11.2 1.6A3.3 3.3 0 0 0 7 18.5z"/><path d="M10 14.5h4"/>',
  chip:'<rect x="6.5" y="6.5" width="11" height="11" rx="2"/><path d="M9.5 3v3.5M14.5 3v3.5M9.5 17.5V21M14.5 17.5V21M3 9.5h3.5M3 14.5h3.5M17.5 9.5H21M17.5 14.5H21"/>'};
function markOf(name,cloud){var n=(name||"").toLowerCase();if(cloud)return "cloud";if(/velox/.test(n))return "velox";if(/magister/.test(n))return "magister";if(/scriba/.test(n))return "scriba";if(/faber/.test(n))return "faber";return "chip";}
function toneOf(name){var h=0;for(var i=0;i<(name||"").length;i++)h=(h*31+name.charCodeAt(i))|0;return TONES[Math.abs(h)%TONES.length];}
/* a model's mark, inlaid in its wheel: its shadow drawn inside it rather than as a filter */
function mvMark(k){var m=MARK[k]||MARK.chip;return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">'+
  '<g transform="translate(0 .55)" stroke="rgba(20,8,40,.42)">'+m+'</g><g>'+m+'</g></svg>';}

/* ---------- the movement is rendered, not drawn: metal wheels with rounded, polished edges and holes you can see through, lit from
   the top left by a light that stays where it is while the wheels turn. Each surface is computed once from its outline (an exact
   distance from every point to the edge gives each edge its rounding) and kept, so a page drawn again reuses it ---------- */
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
function gearPoly(teeth){var pts=[],ro=49,ri=43.5,s=2*Math.PI/teeth;for(var i=0;i<teeth;i++){var a=i*s;[[ri,a],[ro,a+s*.22],[ro,a+s*.48],[ri,a+s*.7]].forEach(function(p){pts.push([50+p[0]*Math.cos(p[1]),50+p[0]*Math.sin(p[1])]);});}return pts;}
/* how far each point inside a shape lies from its edge, in pixels (the exact distance transform of Felzenszwalb and Huttenlocher) */
function mvEdt(ins,n){var BIG=1e12,f=new Float64Array(n),d=new Float64Array(n),v=new Int32Array(n),z=new Float64Array(n+1),g=new Float32Array(n*n),q,k,s,x,y;
  function one(){k=0;v[0]=0;z[0]=-BIG;z[1]=BIG;for(q=1;q<n;q++){s=((f[q]+q*q)-(f[v[k]]+v[k]*v[k]))/(2*q-2*v[k]);while(s<=z[k]){k--;s=((f[q]+q*q)-(f[v[k]]+v[k]*v[k]))/(2*q-2*v[k]);}k++;v[k]=q;z[k]=s;z[k+1]=BIG;}
    k=0;for(q=0;q<n;q++){while(z[k+1]<q)k++;d[q]=(q-v[k])*(q-v[k])+f[v[k]];}}
  for(x=0;x<n;x++){for(y=0;y<n;y++)f[y]=ins[y*n+x]?BIG:0;one();for(y=0;y<n;y++)g[y*n+x]=d[y];}
  for(y=0;y<n;y++){for(x=0;x<n;x++)f[x]=g[y*n+x];one();for(x=0;x<n;x++)g[y*n+x]=Math.sqrt(d[x]);}
  return g;}
function mvBlur(a,n){var t=new Float32Array(a.length),o=new Float32Array(a.length),x,y,i;
  for(y=0;y<n;y++)for(x=0;x<n;x++){i=y*n+x;t[i]=(a[x>0?i-1:i]+a[i]+a[x<n-1?i+1:i])/3;}
  for(y=0;y<n;y++)for(x=0;x<n;x++){i=y*n+x;o[i]=(t[y>0?i-n:i]+t[i]+t[y<n-1?i+n:i])/3;}return o;}
/* a wheel's outline and the shape of its surface: the rim and teeth stand higher than the face, and every edge is rounded */
function mvGeo(Dp,teeth,ho){var n=Math.ceil(Dp*mvScale()/2)*2,key="g"+[n,teeth,ho.n,ho.rh,ho.hr].join(":");if(MVC[key])return MVC[key];
  var u=n/100,sil=mvCv(n),x=sil.getContext("2d"),N=n*n,k,b,i;
  x.beginPath();gearPoly(teeth).forEach(function(p,j){if(j)x.lineTo(p[0]*u,p[1]*u);else x.moveTo(p[0]*u,p[1]*u);});x.closePath();x.fillStyle="#000";x.fill();
  x.globalCompositeOperation="destination-out";for(k=0;k<ho.n;k++){b=k*2*Math.PI/ho.n-Math.PI/2;x.beginPath();x.arc((50+ho.rh*Math.cos(b))*u,(50+ho.rh*Math.sin(b))*u,ho.hr*u,0,7);x.fill();}
  x.globalCompositeOperation="source-over";
  var A=x.getImageData(0,0,n,n).data,al=new Float32Array(N),ins=new Uint8Array(N);for(i=0;i<N;i++){al[i]=A[i*4+3]/255;ins[i]=al[i]>=.5?1:0;}
  var dist=mvEdt(ins,n),H=new Float32Array(N),RF=40.5*u,bv=1.15*u,rec=.85*u,top=3*u,c0=n/2,xx,yy,r,t,h;
  for(yy=0;yy<n;yy++)for(xx=0;xx<n;xx++){i=yy*n+xx;if(!ins[i]){H[i]=top-rec-bv-2*u;continue;}
    r=Math.sqrt((xx+.5-c0)*(xx+.5-c0)+(yy+.5-c0)*(yy+.5-c0));
    if(r>=RF){t=1-Math.min((r-RF)/rec,1);h=top-rec*(1-Math.sqrt(Math.max(0,1-t*t)));}else h=top-rec;
    t=1-Math.min(Math.max(0,dist[i]-.5)/bv,1);H[i]=h-bv*(1-Math.sqrt(Math.max(0,1-t*t)));}
  H=mvBlur(mvBlur(H,n),n);
  var NZ=new Float32Array(N),gx,gy;NZ.fill(1);
  for(yy=1;yy<n-1;yy++)for(xx=1;xx<n-1;xx++){i=yy*n+xx;gx=(H[i+1]-H[i-1])*.5;gy=(H[i+n]-H[i-n])*.5;NZ[i]=1/Math.sqrt(gx*gx+gy*gy+1);}
  return MVC[key]={key:key,n:n,k:n/Dp,u:u,al:al,nz:NZ,sil:sil,url:null};}
function mvUrl(g){if(!g.url)g.url=g.sil.toDataURL("image/png");return g.url;}
function mvTint(g,col){var key="t"+g.key+col;if(!MVC[key]){var c=mvCv(g.n),x=c.getContext("2d");x.drawImage(g.sil,0,0);x.globalCompositeOperation="source-in";x.fillStyle=col;x.fillRect(0,0,g.n,g.n);MVC[key]=c;}return mvDup(MVC[key]);}
/* a wheel's shadow, softened once as it is drawn (the outline itself is drawn off the canvas; only its soft shadow lands on it) */
function mvCast(g,col){var key="s"+g.key+col;if(!MVC[key]){var pad=Math.round(g.n*.08),N=g.n+2*pad,c=mvCv(N),x=c.getContext("2d");
  x.shadowColor=col;x.shadowBlur=2*2.6*g.k;x.shadowOffsetX=N*2;x.drawImage(g.sil,pad-N*2,pad);MVC[key]=c;}return mvDup(MVC[key]);}
/* the turning surface: a satin metal rim and teeth, a turned face in the model's colour, each rounded edge catching the light as a fine
   bright line; the steep edges reflect the room around them, so they read as metal, not as drawn outlines */
function mvFace(g,rimHex,faceHex){var P=mvPal(),key="f"+g.key+rimHex+faceHex+mvTag();if(MVC[key])return mvDup(MVC[key]);
  var n=g.n,u=g.u,c=mvCv(n),x=c.getContext("2d"),im=x.createImageData(n,n),o=im.data,RF=40.5*u,c0=n/2,R=mvRgb(rimHex),F=mvRgb(faceHex),S=P.spec,i,j,xx,yy,r,m,a,nz,ph,dif,sp,ao,gr,k;
  for(yy=0;yy<n;yy++)for(xx=0;xx<n;xx++){i=yy*n+xx;a=g.al[i];if(a<=0)continue;
    r=Math.sqrt((xx+.5-c0)*(xx+.5-c0)+(yy+.5-c0)*(yy+.5-c0));m=Math.min(1,Math.max(0,r-RF+.5));
    nz=g.nz[i];ph=Math.acos(nz>1?1:nz);dif=P.e0-P.e1*(1-nz);
    sp=P.ks*Math.exp(-(ph-.45)*(ph-.45)/.06)*(.45+.55*m);
    ao=r<RF?1-.24*Math.exp(-(RF-r)/(1.1*u)):1;
    gr=m>.5?1+.018*(mvGrain(i)-.5):1+.03*Math.sin(r/(1.6*u)*6.2832)+.022*(mvGrain(i)-.5);
    k=dif*ao*gr;j=i*4;
    o[j]=(R[0]*m+F[0]*(1-m))*k+S[0]*sp;o[j+1]=(R[1]*m+F[1]*(1-m))*k+S[1]*sp;o[j+2]=(R[2]*m+F[2]*(1-m))*k+S[2]*sp;o[j+3]=a*255;}
  x.putImageData(im,0,0);MVC[key]=c;return mvDup(c);}
/* the light that stays where it is: brighter toward the top left, the rim's inner wall shading the face, the turned face's sheen;
   it is held still inside the turning outline, so it falls only on the metal */
function mvLight(g){var nt=night(),key="l"+g.key+mvTag();if(MVC[key])return mvDup(MVC[key]);
  var n=g.n,u=g.u,c=mvCv(n),x=c.getContext("2d"),im=x.createImageData(n,n),o=im.data,c0=n/2,RF=40.5*u,RW=50*u,i,j,xx,yy,dx,dy,r,ex,ey,s,e,lt,dk,v,q,wt,din;
  for(yy=0;yy<n;yy++)for(xx=0;xx<n;xx++){dx=xx+.5-c0;dy=yy+.5-c0;r=Math.sqrt(dx*dx+dy*dy);if(r>RW)continue;i=yy*n+xx;ex=r?dx/r:0;ey=r?dy/r:0;
    s=(dx*MVLX+dy*MVLY)/RW;e=ex*MVLX+ey*MVLY;
    lt=(nt?.08:.2)*Math.max(0,-s);dk=(nt?.3:.24)*Math.max(0,s);
    wt=Math.min(1,Math.max(0,(r-41.5*u)/(3*u)));lt+=wt*(nt?.09:.2)*Math.max(0,-e);dk+=wt*(nt?.32:.26)*Math.max(0,e);
    if(r<RF){din=RF-r;dk+=(nt?.44:.34)*Math.max(0,-e)*Math.exp(-din/(1.5*u));lt+=(nt?.16:.36)*Math.max(0,e)*Math.exp(-din/(.5*u));
      q=Math.min(1,Math.max(0,(r-.12*RW)/(.33*RW)))*Math.min(1,Math.max(0,(RF-2*u-r)/(2*u)));
      v=Math.max(0,-e);v=v*v;lt+=q*(nt?.06:.16)*v*v;v=Math.max(0,e);v=v*v;lt+=q*(nt?.03:.07)*v*v;}
    v=lt-dk;j=i*4;if(v>=0){o[j]=o[j+1]=o[j+2]=255;o[j+3]=v*255;}else{o[j]=20;o[j+1]=8;o[j+2]=40;o[j+3]=-v*255;}}
  x.putImageData(im,0,0);MVC[key]=c;return mvDup(c);}
/* what polished metal shows where it faces this way: a bright ceiling, a darker floor, and the key light up and to the left */
function mvEnv(nx,ny,nz){var rx=2*nz*nx,ry=2*nz*ny,rz=2*nz*nz-1,k=Math.max(0,rx*MVK[0]+ry*MVK[1]+rz*MVK[2]),k2=k*k,k6=k2*k2*k2;
  return {d:(.6-.3*ry+.12*rz+.3*k6)/.74,s:Math.pow(k,40)};}
/* a polished ring standing on a face, domed across its width */
function mvRingPx(q,ex,ey,hs,base,P){var b=1-q*q,h=Math.sqrt(b>1e-3?b:1e-3),dh=-q/h*hs,nx=-dh*ex,ny=-dh*ey,l=Math.sqrt(nx*nx+ny*ny+1),E;nx/=l;ny/=l;E=mvEnv(nx,ny,1/l);
  var d=E.d*P.env,s=E.s*1.15;return [base[0]*d+P.spec[0]*s,base[1]*d+P.spec[1]*s,base[2]*d+P.spec[2]*s];}
/* a hub that does not need to turn, so it takes the light exactly: a polished ring, an enamel centre in the ring's shadow, the ring's
   shadow on the face; for Ingenium's wheel, the collar and the glazed enamel dial that hold the seal */
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
function mvHub(Dp,faceHex){return mvSetting(Dp,.46,16.5,20.2,mvPal().ring,faceHex,"h",false);}
function mvChaton(Dp){var P=mvPal();return mvSetting(Dp,.64,25,29.6,P.collar,P.floor,"c",true);}
/* the plate the wheels turn above: a fine frosted grain, the light across it from the top left, and a polished chamfer round its edge */
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
/* a still wheel for a row or an answer: the same surface, the same light, its hub */
function mvStill(Dp,teeth,ho,faceHex,hub){var P=mvPal(),g=mvGeo(Dp,teeth,ho),n=g.n,c=mvCv(n),x=c.getContext("2d");x.drawImage(mvFace(g,P.rim,faceHex),0,0);
  x.globalCompositeOperation="source-atop";x.drawImage(mvLight(g),0,0);x.globalCompositeOperation="source-over";
  if(hub){var h=mvHub(Dp,faceHex);x.drawImage(h,(n-h.width)/2,(n-h.height)/2);}return c;}

/* ---------- a wheel of the movement: its shadow, its thickness, its turning face with the still light, its hub; a key ---------- */
function wheel3d(x,Dp,teeth,center,ghost){var w=mk("div","bx-w bx-enter"+(center?" bx-cw":"")+(ghost?" bx-ghostw":""));w.style.setProperty("--D",Dp+"px");
  var P=mvPal(),g=mvGeo(Dp,teeth,center?{n:6,rh:35,hr:3.3}:{n:3,rh:29.5,hr:6}),face=center?MVCTR:(x?x.T[1]:MVGHOST),tilt=mk("div","bx-wt"),s,url;
  var turn=function(cls,kid){var e=mk("div","bx-turn"+(cls?" "+cls:""));if(kid)e.appendChild(kid);return e;};
  var cast=mk("div","bx-cast");cast.appendChild(turn("",mvCast(g,P.cast)));w.appendChild(cast);w.appendChild(tilt);
  P.side.forEach(function(col,k){var l=mk("div","bx-l bx-rim r"+(k+1));l.appendChild(turn("",mvTint(g,col)));tilt.appendChild(l);});
  var f=mk("div","bx-l bx-face");s=turn("bx-mask",mvFace(g,center?P.crim:P.rim,face));url='url("'+mvUrl(g)+'")';s.style.webkitMaskImage=url;s.style.maskImage=url;
  s.appendChild(turn("bx-unturn",mvLight(g)));f.appendChild(s);tilt.appendChild(f);
  var hb=mk("div","bx-hub"+(center?" bx-chaton":""));hb.appendChild(center?mvChaton(Dp):mvHub(Dp,face));tilt.appendChild(hb);
  if(x)tilt.appendChild(mk("span","bx-mark",mvMark(x.k)));
  if(center)tilt.appendChild(mk("div","bx-seat"));
  return w;}
/* every turning layer of a wheel gets the same start and pace; every wheel counts from the same moment, so the teeth keep meshing */
var RATE=1,rampId=0;
function turnSet(w,p,dir,r0){[].forEach.call(w.querySelectorAll(".bx-turn"),function(s){s.style.setProperty("--p",p);if(dir)s.style.setProperty("--dir",dir);if(r0)s.style.setProperty("--r0",r0);});}
function turns(){var a=[];if(!moveBox)return a;[].forEach.call(moveBox.querySelectorAll(".bx-turn"),function(s){try{s.getAnimations().forEach(function(x){a.push(x);});}catch(e){}});return a;}
function syncWheels(){var all=turns();if(!all.length)return;var t=all[0].currentTime||0;all.forEach(function(a){try{a.currentTime=t;a.playbackRate=RATE;}catch(e){}});}
/* the movement slows to a stop and gathers speed again, rather than jumping */
function ramp(to,ms,then){var all=turns();if(still()||!all.length){RATE=to;all.forEach(function(a){try{a.playbackRate=to;}catch(e){}});return;}
  var from=RATE,t0=performance.now(),id=++rampId;
  (function step(now){if(id!==rampId)return;var k=Math.min(1,(now-t0)/ms),e=k<.5?2*k*k:1-Math.pow(-2*k+2,2)/2;RATE=from+(to-from)*e;
    turns().forEach(function(a){try{a.playbackRate=RATE;}catch(x){}});if(k<1)requestAnimationFrame(step);else if(then)then();})(t0);}
/* pressed, Ingenium's seal winds the movement: the wheels run faster for a moment and settle */
function wind(){if(still()||!moveBox)return;ramp(4,380,function(){ramp(held?0:1,1500);});}
/* the whole movement sways a little, as the seal does on Home, and comes back to face her whenever she points at it. While Blend is out of
   sight (another page, or scrolled away) the sway is stopped, not paused: a paused animation on a hidden page still had the browser
   work out styles on every frame of the page being shown (measured on the Guide page). It starts again, facing her, when Blend is seen */
var SWAY=null,SWBACK=null,SWEL=null,inView=true;
function swayOff(){try{if(SWBACK)SWBACK.cancel();if(SWAY)SWAY.cancel();}catch(e){}SWAY=SWBACK=null;}
function swayOn(sw){swayOff();if(sw)SWEL=sw;if(still()||!inView||!SWEL||!SWEL.animate||!SWEL.isConnected)return;
  try{SWAY=SWEL.animate([{transform:"rotateY(-9deg) rotateX(3.5deg)"},{transform:"rotateY(9deg) rotateX(-3.5deg)"}],{duration:5500,iterations:Infinity,direction:"alternate",easing:"ease-in-out"});
    SWAY.currentTime=2750;}catch(e){SWAY=null;}}
function seen(v){if(v===inView)return;inView=v;if(!v)swayOff();else if(on&&!held){RATE=1;swayOn(null);}}
function rest(still_){if(still_){if(!SWAY)return;var sw=SWAY.effect&&SWAY.effect.target;if(!sw)return;if(SWBACK){if(SWBACK.playbackRate<0)SWBACK.reverse();return;}
    var m=getComputedStyle(sw).transform;SWAY.pause();SWBACK=sw.animate([{transform:m&&m!=="none"?m:"none"},{transform:"none"}],{duration:900,easing:"cubic-bezier(.2,.8,.2,1)",fill:"both"});}
  else if(SWBACK){var b=SWBACK;if(b.playbackRate>0)b.reverse();b.onfinish=function(){if(b!==SWBACK||b.playbackRate>0)return;b.cancel();SWBACK=null;try{if(SWAY&&inView)SWAY.play();}catch(e){}};}
  else if(!SWAY&&on&&inView)swayOn(null);}
/* a wheel answers the pointer as the seal key does: it tilts to follow a mouse and lifts; pressed, it sinks */
function tiltTo(w,e){var r=w.getBoundingClientRect();if(!r.width)return;var X=Math.max(-.25,Math.min(1.25,(e.clientX-r.left)/r.width)),Y=Math.max(-.25,Math.min(1.25,(e.clientY-r.top)/r.height));
  w.style.setProperty("--ry",((X-.5)*30).toFixed(1)+"deg");w.style.setProperty("--rx",(-(Y-.5)*26).toFixed(1)+"deg");}
function untilt(w){w.classList.remove("bx-hov","bx-dn");w.style.setProperty("--rx","0deg");w.style.setProperty("--ry","0deg");}
function wireWheel(hit,w){
  hit.addEventListener("pointerenter",function(e){if(!still())w.classList.add("bx-hov");});
  hit.addEventListener("pointermove",function(e){if(e.pointerType==="mouse"&&!still())tiltTo(w,e);},{passive:true});
  hit.addEventListener("pointerleave",function(){untilt(w);});
  hit.addEventListener("pointerdown",function(){if(!still())w.classList.add("bx-dn");},{passive:true});
  ["pointerup","pointercancel"].forEach(function(t){hit.addEventListener(t,function(){w.classList.remove("bx-dn");},{passive:true});});
  hit.addEventListener("focus",function(){if(!still())w.classList.add("bx-hov");});hit.addEventListener("blur",function(){untilt(w);});
  hit.addEventListener("keydown",function(e){if((e.key==="Enter"||e.key===" ")&&!still()){w.classList.add("bx-dn");setTimeout(function(){w.classList.remove("bx-dn");},140);}});}

/* ---------- Ingenium's seal key at the hub, cloned from the door's seal as Home's is, with R175's flourishes ---------- */
var SN=0;
function doorSeal(){var d=$("introSeal"),s=d&&d.querySelector(".isl");if(s)return s;var h=$("brandSealBtn");return h?h.querySelector(".isl"):null;}
function copySeal(){var s=doorSeal();if(!s)return null;var c=s.cloneNode(true),k="r262s"+(++SN)+"_";c.className="isl isl-home";c.removeAttribute("style");c.setAttribute("aria-hidden","true");
  var h=c.outerHTML;[].forEach.call(c.querySelectorAll("[id]"),function(n){var id=n.getAttribute("id"),q=id.replace(/[.*+?^${}()|[\]\\]/g,"\\$&");
    h=h.replace(new RegExp('id="'+q+'"',"g"),'id="'+k+id+'"').replace(new RegExp("url\\(#"+q+"\\)","g"),"url(#"+k+id+")").replace(new RegExp('href="#'+q+'"',"g"),'href="#'+k+id+'"');});
  var w=mk("div");w.innerHTML=h;var out=w.firstElementChild;[].forEach.call(out.querySelectorAll(".isl-tilt,.isl-idle"),function(n){n.removeAttribute("style");});return out;}
var KEY=null,SEALBOX=null,busy=false,again=false,lastF="",n7=0,ends=[];
function anim(e,f,o){if(!e||!e.animate)return null;try{var a=e.animate(f,o);ends.push(a.finished.then(function(){},function(){}));return a;}catch(x){return null;}}
function parts(){var isl=KEY.querySelector(".isl");return {fx:KEY.querySelector(".r175-fx"),glow:KEY.querySelector(".r175-glow"),ripple:KEY.querySelector(".r175-ripple"),
  tilt:isl&&isl.querySelector(".isl-tilt"),cast:isl&&isl.querySelector(".isl-cast"),ring:isl&&isl.querySelector(".isl-ring > svg"),star:isl&&isl.querySelector(".isl-star > svg"),heart:isl&&isl.querySelector(".isl-heart > svg")};}
function glow(P,gold,strong){if(!P.glow)return;P.glow.classList.toggle("gold",!!gold);try{P.glow.getAnimations().forEach(function(a){a.cancel();});}catch(e){}
  anim(P.glow,[{opacity:0,scale:.82},{opacity:strong?1:.85,scale:1.04,offset:.3},{opacity:0,scale:1.12}],{duration:still()?700:1000,easing:"ease-out"});}
var SPRING="cubic-bezier(.2,.8,.25,1)";
var FL={spin:function(P,d){anim(P.star,[{rotate:"0deg"},{rotate:(d*360)+"deg"}],{duration:1150,easing:"cubic-bezier(.25,.9,.3,1)"});anim(P.ring,[{rotate:"0deg"},{rotate:(-d*360)+"deg"}],{duration:1300,easing:"cubic-bezier(.3,.8,.3,1)"});
    anim(P.heart,[{scale:1},{scale:1.14,offset:.35},{scale:1}],{duration:900,easing:"ease-in-out"});glow(P,false);},
  pulse:function(P){anim(P.ring,[{scale:1},{scale:1.13,offset:.28},{scale:.97,offset:.6},{scale:1.03,offset:.8},{scale:1}],{duration:950,easing:"ease-out"});
    anim(P.ripple,[{opacity:.6,scale:.86},{opacity:0,scale:1.55}],{duration:950,easing:"ease-out"});anim(P.ripple,[{opacity:0,scale:.86},{opacity:.4,scale:.9,offset:.25},{opacity:0,scale:1.4}],{duration:950,delay:220,easing:"ease-out"});glow(P,false);},
  hop:function(P){anim(P.fx,[{transform:"translateY(0) scale(1,1)"},{transform:"translateY(3%) scale(1.06,.92)",offset:.12},{transform:"translateY(-18%) scale(.97,1.04)",offset:.42},
      {transform:"translateY(0) scale(1.05,.94)",offset:.7},{transform:"translateY(-3%) scale(1,1)",offset:.85},{transform:"translateY(0) scale(1,1)"}],{duration:900,easing:"ease-in-out"});
    anim(P.cast,[{opacity:1},{opacity:.35,offset:.42},{opacity:1,offset:.7},{opacity:1}],{duration:900,easing:"ease-in-out"});glow(P,false);},
  wobble:function(P,d){anim(P.tilt,[{rotate:"y 0deg"},{rotate:"y "+(d*30)+"deg",offset:.2},{rotate:"y "+(-d*20)+"deg",offset:.45},{rotate:"y "+(d*11)+"deg",offset:.68},{rotate:"y "+(-d*4)+"deg",offset:.86},{rotate:"y 0deg"}],{duration:1250,easing:"ease-in-out"});glow(P,false);},
  twirl:function(P,d){anim(P.fx,[{transform:"rotate(0deg) scale(1)"},{transform:"rotate("+(d*180)+"deg) scale(.9)",offset:.45},{transform:"rotate("+(d*360)+"deg) scale(1.04)",offset:.8},{transform:"rotate("+(d*360)+"deg) scale(1)"}],{duration:1100,easing:SPRING});
    anim(P.star,[{rotate:"0deg"},{rotate:(-d*180)+"deg"}],{duration:1100,easing:SPRING});glow(P,false);},
  beat:function(P){anim(P.heart,[{scale:1},{scale:1.3,offset:.14},{scale:1.04,offset:.3},{scale:1.24,offset:.46},{scale:1,offset:.7},{scale:1}],{duration:1100,easing:"ease-in-out"});
    anim(P.ring,[{scale:1},{scale:1.04,offset:.14},{scale:1,offset:.3},{scale:1.03,offset:.46},{scale:1}],{duration:1100,easing:"ease-in-out"});glow(P,true,true);},
  grand:function(P,d){FL.spin(P,d);FL.hop(P);anim(P.ripple,[{opacity:.65,scale:.86},{opacity:0,scale:1.7}],{duration:1100,easing:"ease-out"});glow(P,true,true);}};
var ORDER=["spin","pulse","hop","wobble","twirl","beat"];
function pickF(){n7++;if(n7%7===0)return "grand";var c=ORDER.filter(function(n){return n!==lastF;});return c[Math.floor(Math.random()*c.length)];}
function play(){var P=parts();if(still()){glow(P,false);return "glow";}busy=true;ends=[];var name=pickF(),d=Math.random()<.5?-1:1;lastF=name;try{FL[name](P,d);}catch(e){}
  KEY.setAttribute("data-flourish",name);var mine=ends.slice();function fin(){busy=false;if(KEY.getAttribute("data-flourish")===name)KEY.removeAttribute("data-flourish");if(again){again=false;play();}}
  if(!mine.length)fin();else Promise.all(mine).then(fin);return name;}
function centre(){return moveBox?moveBox.querySelector(".bx-cw"):null;}
function engine(){var box=mk("div","hx-seal bx-sealbox");box.setAttribute("data-ing-seal","blend");
  var k=mk("button","r175-seal bxk");k.type="button";k.setAttribute("aria-label","Ingenium's seal, at the heart of the blend. Press it to wind the movement.");
  var g=mk("span","r175-glow");g.setAttribute("aria-hidden","true");var rp=mk("span","r175-ripple");rp.setAttribute("aria-hidden","true");var fx=mk("span","r175-fx");
  var seal=copySeal();if(seal)fx.appendChild(seal);
  k.appendChild(g);k.appendChild(fx);k.appendChild(rp);box.appendChild(k);KEY=k;
  var isl=function(){return k.querySelector(".isl");};
  /* the seal and its wheel move as one: pointing at the seal brings the movement to rest, and tilts and lifts the whole wheel; pressing it
     sinks the wheel */
  k.addEventListener("pointerenter",function(e){var s=isl(),c=centre();rest(true);if(still())return;if(s&&e.pointerType==="mouse")s.classList.add("hover");if(c)c.classList.add("bx-hov");});
  k.addEventListener("pointermove",function(e){var s=isl(),c=centre();if(!s)return;var r=s.getBoundingClientRect();if(!r.width)return;var x=(e.clientX-r.left)/r.width,y=(e.clientY-r.top)/r.height;
    s.style.setProperty("--gx",(x*100).toFixed(1)+"%");s.style.setProperty("--gy",(y*100).toFixed(1)+"%");
    if(e.pointerType==="mouse"&&!still()){x=Math.max(-.25,Math.min(1.25,x));y=Math.max(-.25,Math.min(1.25,y));s.style.setProperty("--ry",((x-.5)*28).toFixed(1)+"deg");s.style.setProperty("--rx",(-(y-.5)*24).toFixed(1)+"deg");
      if(c)tiltTo(c,e);}},{passive:true});
  k.addEventListener("pointerleave",function(){var s=isl(),c=centre();rest(false);if(c)untilt(c);if(!s)return;s.classList.remove("hover","down");s.style.setProperty("--rx","0deg");s.style.setProperty("--ry","0deg");});
  k.addEventListener("pointerdown",function(){var s=isl(),c=centre();if(still())return;if(s)s.classList.add("down");if(c)c.classList.add("bx-dn");},{passive:true});
  ["pointerup","pointercancel"].forEach(function(t){k.addEventListener(t,function(e){var s=isl(),c=centre();if(c)c.classList.remove("bx-dn");if(!s)return;s.classList.remove("down");if(e.pointerType!=="mouse")s.classList.remove("hover");},{passive:true});});
  k.addEventListener("click",function(e){e.preventDefault();wind();if(busy){again=true;glow(parts(),false);return;}play();});
  try{new ResizeObserver(function(){var s=isl();var w=k.offsetWidth;if(s&&w>0&&s.style.getPropertyValue("--S")!==w+"px")s.style.setProperty("--S",w+"px");}).observe(k);}catch(e){}
  if(seal)seal.style.setProperty("--S","70px");
  return box;}

/* ---------- the page ---------- */
var page=null,head=null,words=null,moveBox=null,stage=null,labels=null,legend=null,count=null,stepsNav=null,on=false,held=null,countText="",title=null,lede=null,bar=null,ol=null;
function chosenRows(){var pick=$("blendPick");if(!pick)return [];return [].slice.call(pick.querySelectorAll("label.bl-model")).filter(function(l){var c=l.querySelector('input[type="checkbox"]');return c&&c.checked;});}
function rowName(l){var n=l.querySelector(".bl-mn");return n?n.textContent.trim():"";}
function rowSub(l){var s=l.querySelector(".small");return s?s.textContent.trim():"";}
function wayName(){var s=D.querySelector("#blendStrats .blend-strat.on b")||D.querySelector('#blendStrats input[name="blendStrat"]:checked');var t=s?(s.tagName==="B"?s.textContent:((s.closest(".blend-strat")||{}).textContent||"")):"";return t.trim();}
function writerName(){var w=$("blWriter");if(!w||w.selectedIndex<0)return "";var o=w.options[w.selectedIndex];return o?o.textContent.trim():"";}
function role(name,i,n){var w=wayName(),wr=writerName();if(wr&&name&&wr.toLowerCase().indexOf(name.toLowerCase())===0)return "writes the final answer";
  if(/^Pass and refine/.test(w))return i===0?"drafts first":"improves the draft";
  if(/^Judge and decide/.test(w))return i===n-1?"judges and writes":"answers";
  if(/^Check every claim/.test(w))return i===0?"answers":"checks each claim";
  if(/^Divide the work/.test(w))return "part "+(i+1)+" of "+n;
  if(/^Debate and settle/.test(w))return "answers, then revises";
  if(/^Best of the batch/.test(w))return "answers";
  return "answers";}
/* pointing at a wheel: the movement comes to rest facing her, the wheels slow to a stop, and the line under the words names it */
function near(s,v){if(v){if(held&&held!==s)near(held,false);held=s;head.classList.add("bx-hold");if(s.__lb)s.__lb.classList.add("bx-near");ramp(0,650);rest(true);var x=s.__bx;
    if(x)count.innerHTML="<b>"+esc(x.name)+"</b>, "+(x.cloud?"connected":"on this device")+(x.sub?": "+esc(x.sub):"")+". In this blend it "+x.role+". Press it to see it in step I.";}
  else{if(s.__lb)s.__lb.classList.remove("bx-near");if(held===s){held=null;head.classList.remove("bx-hold");count.textContent=countText;ramp(1,900);rest(false);}}}
function goStep1(row){try{var b=page.querySelector('.rm-step[data-step="1"]');if(b)b.click();}catch(e){}
  if(row){row.classList.add("bx-seen");try{row.scrollIntoView({block:"center",behavior:still()?"auto":"smooth"});}catch(e){}setTimeout(function(){row.classList.remove("bx-seen");},1600);try{var c=row.querySelector("input");if(c)c.focus({preventScroll:true});}catch(e){}}}
/* the movement: Ingenium's wheel at the centre of the plate holding the seal key; the chosen models' wheels meshing with it, each a key;
   places wait, as wheels too, while fewer than two are chosen. Drawn again only when something changes */
var lastSig="";
function movement(force){if(!on||!moveBox)return;var rows=chosenRows(),list=rows.map(function(l){var nm=rowName(l),cl=l.classList.contains("blx-cx");return {row:l,name:nm,sub:rowSub(l),cloud:cl,T:toneOf(nm),k:markOf(nm,cl)};});
  list.forEach(function(x,i){x.role=role(x.name,i,list.length);});
  var sig=list.map(function(x){return x.name+"|"+x.role+"|"+x.cloud;}).join(";")+"|"+mvTag()+"|"+motion()+"|"+mvScale();
  /* the rows themselves wear their chosen look */
  [].forEach.call(D.querySelectorAll("#blendPick label.bl-model"),function(l){var c=l.querySelector('input[type="checkbox"]'),v=!!(c&&c.checked);if(l.classList.contains("bx-chosen")!==v)l.classList.toggle("bx-chosen",v);});
  if(sig===lastSig&&!force&&stage&&stage.isConnected)return;lastSig=sig;
  if(held)near(held,false);held=null;head.classList.remove("bx-hold");RATE=1;rampId++;
  var n=Math.max(2,list.length),C=[260,214],a0=n===2?180:-90,Dm=n>4?70:84,Tm=Math.round(32*Dm/132),Pc=60,Pm=Pc*Tm/32,R=132*.4625+Dm*.4625,s1=360/32,s2=360/Tm;
  var st=mk("div","bx-stage"),sw=mk("div","bx-sway"),lbs=mk("div","bx-labels");st.appendChild(sw);lbs.setAttribute("aria-hidden","true");
  sw.appendChild(mk("i","bx-under"));var pl=mk("div","bx-plate",'<i style="--z:12"></i><i style="--z:8"></i><i style="--z:4"></i>');pl.appendChild(mvPlate(340));pl.setAttribute("aria-hidden","true");sw.appendChild(pl);
  var cw=wheel3d(null,132,32,true,false);cw.style.left=C[0]+"px";cw.style.top=C[1]+"px";turnSet(cw,Pc+"s");sw.appendChild(cw);
  if(SEALBOX)cw.querySelector(".bx-seat").appendChild(SEALBOX);
  for(var i=0;i<n;i++){var th=a0+i*360/n,a=th*Math.PI/180,x=list[i]||null,gx=C[0]+R*Math.cos(a),gy=C[1]+R*Math.sin(a);
    var w=wheel3d(x,Dm,Tm,false,!x);w.style.left=gx.toFixed(1)+"px";w.style.top=gy.toFixed(1)+"px";w.style.animationDelay=(.06+i*.07)+"s";
    /* its teeth set into the gaps of Ingenium's wheel where they meet */
    var pc=(((th/s1)%1)+1)%1,r2=th+180-s2*((((.2-pc)%1)+1)%1);turnSet(w,Pm.toFixed(3)+"s","reverse",r2.toFixed(2)+"deg");
    var hit=mk("button","bx-hit");hit.type="button";w.querySelector(".bx-wt").appendChild(hit);sw.appendChild(w);w.__bx=x;wireWheel(hit,w);
    var lb=mk("div","bx-label"+(x?"":" bx-ghostl"),x?'<span class="bx-name">'+esc(x.name)+'</span><span class="bx-role">'+esc(x.role)+'</span>':'<span class="bx-name">a model</span>');
    var ca=Math.cos(a),sa=Math.sin(a),side=ca>.25?"r":ca<-.25?"l":sa<0?"t":"b";lb.classList.add("bx-at-"+side);
    lb.style.left=(C[0]+184*ca).toFixed(1)+"px";lb.style.top=(C[1]+(side==="t"?-178:side==="b"?178:184*sa)).toFixed(1)+"px";lbs.appendChild(lb);hit.__lb=lb;
    if(!x){hit.setAttribute("aria-label","Choose a model for the blend");hit.addEventListener("click",function(){goStep1(null);});}
    else(function(hit,x){hit.__bx=x;hit.setAttribute("aria-label",x.name+": "+x.role+". Press it to see it in step one.");
      hit.addEventListener("pointerenter",function(){near(hit,true);});hit.addEventListener("pointerleave",function(){near(hit,false);});
      hit.addEventListener("focus",function(){near(hit,true);});hit.addEventListener("blur",function(){near(hit,false);});
      hit.addEventListener("click",function(){goStep1(x.row);});})(hit,x);}
  if(stage&&stage.parentNode)stage.parentNode.removeChild(stage);if(labels&&labels.parentNode)labels.parentNode.removeChild(labels);
  moveBox.appendChild(st);moveBox.appendChild(lbs);stage=st;labels=lbs;
  /* on a phone the names stand under the movement, as a line of their own */
  if(legend){legend.innerHTML="";for(var g=0;g<n;g++){var y=list[g]||null,sp=mk("span",null,y?'<b>'+esc(y.name)+'</b>'+esc(y.role):'<b>a model</b>');legend.appendChild(sp);}}
  syncWheels();swayOn(sw);
  countText=list.length<2?(list.length?"One more model, and the blend can begin.":"Choose two or more models in step I."):list.length+" models in the blend, turning with Ingenium's wheel. Point at one to see what it does.";
  count.textContent=countText;}
/* each model row wears its own small wheel, still; drawn again for the night */
function rowWheel(name,cloud){var o=mk("span","bx-rw");o.setAttribute("aria-hidden","true");o.setAttribute("data-bx",mvTag());
  o.appendChild(mvStill(46,20,{n:3,rh:29.5,hr:6},toneOf(name)[1],true));o.appendChild(mk("span","bx-rmark",mvMark(markOf(name,cloud))));return o;}
function dressRows(){[].forEach.call(D.querySelectorAll("#blendPick label.bl-model"),function(l){var cur=l.querySelector(".bx-rw");if(cur&&cur.getAttribute("data-bx")===mvTag())return;
  if(cur)cur.parentNode.removeChild(cur);var nm=l.querySelector(".bl-mn"),o=rowWheel(rowName(l),l.classList.contains("blx-cx"));if(nm)l.insertBefore(o,nm);else l.insertBefore(o,l.firstChild);});}
/* the answers' headings and the ready-made cards carry a small still wheel of the movement */
var wimgTag="";
function markAnswers(){var t=mvTag()+mvScale();if(t===wimgTag&&page.style.getPropertyValue("--bx-wimg"))return;wimgTag=t;
  try{page.style.setProperty("--bx-wimg",'url("'+mvStill(28,12,{n:0,rh:0,hr:0},MVCTR,true).toDataURL("image/png")+'")');}catch(e){}}
/* the steps as raised labels with their numerals */
var DESC=["the models","how they work together","your question","as they are written"],NUM=["I","II","III","IV"];
function dressSteps(){if(!ol)return;[].forEach.call(ol.querySelectorAll(".rm-step"),function(b,i){if(b.querySelector(".bx-num"))return;
  var lab=[].filter.call(b.children,function(x){return x.tagName==="SPAN"&&!x.classList.contains("rm-sr");})[0];var nu=mk("span","bx-num",NUM[i]||String(i+1));nu.setAttribute("aria-hidden","true");b.insertBefore(nu,lab||null);
  var d=mk("span","bx-sd",DESC[i]||"");d.setAttribute("aria-hidden","true");b.appendChild(d);
  var tk=mk("span","bx-tick",'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>');tk.setAttribute("aria-hidden","true");b.appendChild(tk);});}
/* rows, ways, answers and cards lean toward the pointer, lift under it and sink when pressed: one listener for the whole page,
   so the cards Blend draws again and again need nothing of their own */
var POPSEL="#blendPick label.bl-model,#blendStrats .blend-strat,#blendOut .bl-card,.bl-presets .bl-preset",cur=null;
function popOff(e){if(!e)return;e.classList.remove("bx-ph","bx-pd");e.style.removeProperty("--lx");e.style.removeProperty("--ly");}
function wirePop(){page.addEventListener("pointerover",function(e){if(!on||e.pointerType!=="mouse"||still())return;var t=e.target.closest&&e.target.closest(POPSEL);if(t===cur)return;popOff(cur);cur=t;
    if(t){if(!t.classList.contains("bx-pop"))t.classList.add("bx-pop");t.classList.add("bx-ph");}},{passive:true});
  page.addEventListener("pointermove",function(e){if(!cur||e.pointerType!=="mouse"||still())return;var r=cur.getBoundingClientRect();if(!r.width)return;
    var x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5,k=Math.min(1,320/Math.max(r.width,r.height));
    cur.style.setProperty("--lx",(x*7*k).toFixed(2)+"deg");cur.style.setProperty("--ly",(-y*7*k).toFixed(2)+"deg");},{passive:true});
  page.addEventListener("pointerleave",function(){popOff(cur);cur=null;},{passive:true});
  page.addEventListener("pointerdown",function(e){var t=e.target.closest&&e.target.closest(POPSEL);if(t&&on&&!still()){t.classList.add("bx-pop","bx-pd");}},{passive:true});
  ["pointerup","pointercancel"].forEach(function(n){page.addEventListener(n,function(){var p=page.querySelectorAll(".bx-pd");[].forEach.call(p,function(x){x.classList.remove("bx-pd");});},{passive:true});});}

function build(){if(head)return;
  head=mk("section","bx-head");head.setAttribute("aria-label","Blend");
  words=mk("div","bx-words");var eb=mk("div","bx-eyebrow",'<b>Ingenium</b><span>Blend · the movement of your models</span>');eb.setAttribute("aria-hidden","true");words.appendChild(eb);head.appendChild(words);
  moveBox=mk("div","bx-move");head.appendChild(moveBox);SEALBOX=engine();
  legend=mk("div","bx-legend");legend.setAttribute("aria-hidden","true");head.appendChild(legend);
  try{new IntersectionObserver(function(es){seen(es[es.length-1].isIntersecting);}).observe(moveBox);}catch(e){}
  count=mk("div","bx-count");count.setAttribute("aria-live","polite");head.appendChild(count);
  stepsNav=mk("nav","bx-steps");stepsNav.setAttribute("aria-label","The steps of a new blend");}
function layout(w){var narrow=w<760;if(page.classList.contains("bx-narrow")!==narrow)page.classList.toggle("bx-narrow",narrow);
  if(narrow){var k=Math.min(1,(w-24)/350).toFixed(3);if(page.style.getPropertyValue("--bx-k")!==k)page.style.setProperty("--bx-k",k);return;}
  var big=w>=980,ww=big?470:Math.max(320,Math.round(w*.46)),k=Math.max(.6,Math.min(1,(w-ww-70)/520));
  var set=function(n,v){if(page.style.getPropertyValue(n)!==v)page.style.setProperty(n,v);};set("--bx-ww",ww+"px");set("--bx-k",k.toFixed(3));}
function enter(){build();title=page.querySelector(":scope > .page-title");lede=page.querySelector(":scope > .lede");bar=$("rmBar-blend");ol=page.querySelector(".bl-setup .rm-steps")||page.querySelector(".rm-steps");
  var grid=$("rmP-blend")||page.querySelector(".bl-grid");if(!grid)return false;
  page.insertBefore(head,title||page.firstChild);if(title)words.appendChild(title);if(lede)words.appendChild(lede);if(bar)words.appendChild(bar);
  if(ol){stepsNav.appendChild(ol);dressSteps();}
  page.insertBefore(stepsNav,grid);page.classList.add("bx-on");on=true;dressRows();markAnswers();movement(true);return true;}
function leave(){on=false;page.classList.remove("bx-on","bx-narrow");if(held)near(held,false);swayOff();
  var grid=$("rmP-blend")||page.querySelector(".bl-grid"),before=head&&head.parentNode===page?head:grid;
  if(title)page.insertBefore(title,before);if(lede)page.insertBefore(lede,before);if(bar)page.insertBefore(bar,before);
  if(ol){var setup=page.querySelector(".bl-setup");if(setup){var h=setup.querySelector(":scope > h2.sec");setup.insertBefore(ol,h||setup.firstChild);}}
  if(head&&head.parentNode)head.parentNode.removeChild(head);if(stepsNav&&stepsNav.parentNode)stepsNav.parentNode.removeChild(stepsNav);
  ["--bx-ww","--bx-k","--bx-wimg"].forEach(function(n){page.style.removeProperty(n);});wimgTag="";}
function mount(){try{page=$("page-blend");if(!page)return;var w=page.clientWidth;if(!w)return;
  if(w>=260){layout(w);if(!on){if(!$("blendPick"))return;enter();}else{dressRows();movement(false);}}else if(on)leave();}catch(e){try{console.warn("Ingenium: Blend's new look",e&&e.message||e);}catch(_){}}}
var T=0;function soon(){if(T)return;T=setTimeout(function(){T=0;if(on){dressRows();movement(false);}},60);}
function boot(){page=$("page-blend");if(!page||!$("blendPick")){setTimeout(boot,700);return;}
  mount();wirePop();
  try{new ResizeObserver(function(){mount();}).observe(page);}catch(e){W.addEventListener("resize",mount);}
  /* a model chosen or left, a way or a writer chosen: the movement follows; Blend drawing its list again: the rows wear their wheels again */
  page.addEventListener("change",function(e){var t=e.target;if(!on||!t)return;if(t.closest("#blendPick")||t.closest("#blendStrats")||t.id==="blWriter")soon();},true);
  try{new MutationObserver(soon).observe($("blendPick"),{childList:true});}catch(e){}
  try{var st=$("blendStrats");if(st)new MutationObserver(soon).observe(st,{childList:true});}catch(e){}
  /* day and night, or the motion chosen: the movement is rendered again in the new light, still or alive */
  try{new MutationObserver(function(){if(!on)return;dressRows();markAnswers();movement(false);}).observe(D.body,{attributes:true,attributeFilter:["data-theme","data-motion"]});}catch(e){}}
if(D.readyState==="loading")D.addEventListener("DOMContentLoaded",boot);else boot();
W.IngBlendLook={state:function(){var ws=stage?[].slice.call(stage.querySelectorAll(".bx-w:not(.bx-cw)")):[],real=ws.filter(function(w){return !w.classList.contains("bx-ghostw");}),
    t=stage&&stage.querySelector(".bx-w:not(.bx-ghostw):not(.bx-cw) .bx-turn"),s=t?getComputedStyle(t):null,sw=stage&&stage.querySelector(".bx-sway"),an=[];try{an=sw?sw.getAnimations():[];}catch(e){}
    return {on:on,wheels:real.length,sats:real.length,ghosts:ws.length-real.length,names:real.map(function(w){return w.__bx?w.__bx.name:"";}),held:held&&held.__bx?held.__bx.name:null,
      turning:!!(s&&s.animationName!=="none"&&s.animationPlayState==="running"&&RATE>.05),rate:RATE,swaying:an.some(function(a){return a.playState==="running";}),inView:inView,
      engine:!!KEY,flourish:KEY?KEY.getAttribute("data-flourish"):null,night:night(),canvases:moveBox?moveBox.querySelectorAll("canvas").length:0};},
  refresh:function(){lastSig="";mount();movement(true);},press:function(){return KEY?play():"";}};
try{window.__ingParts["p262"]="running";}catch(_){}
})();
</script>
