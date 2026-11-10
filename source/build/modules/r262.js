<style id="r262-css">
/* ============ R262 · BLEND IN HOME'S LANGUAGE (Ingenium 6.68, 10 November 2026) ============
   Her words (10 November 2026), after the live previews: "I like the Blend redesign but I want everything made clickable and popped
   out animated. I want you to match the Home page and have the Ingenium engine be animated and a clickable button, the same for
   Scriba and Magister's buttons. I want you give them the same effect as the orbs from the Home page. I also want them to be
   redesigned a bit to better fit the app and its visuals." Then: "I approve of the design please push it everywhere."
   Blend keeps every part it had (the models on this device and the connected ones, the ways, effort and Ultra, the writer, the
   question, the run, every answer with its thinking, the plan and the checks, the ready-made blends, Save as a house); its own
   elements are moved in whole and dressed, so each keeps what it does and its sound (R176).
   - The head is Home's sky: Blend's title in Ingenium's Cormorant, its lede, and its two rooms (New blend, Ready-made) as Home's
     card keys. On the right, the engine: Ingenium's seal key, cloned from the door's seal as Home's is (R104's layers, R175's
     flourishes), larger layers set further apart with a rim behind its face, its star turning counterclockwise; it tilts to
     follow a mouse, sinks when pressed and plays a flourish on every press.
   - The models chosen in step I ride a 3D orbit round the engine (CSS animations, no script redrawing it, so the page stays still
     when left alone). Each is a key made as Home's orbs are made: the ball, and the model's own mark standing above it (Velox a
     swift arrow, Magister the scales, Scriba a quill, Faber a hammer, a connected model a cloud, any other a chip), its sway, its
     tilt toward a mouse, its lift and its press. Pointing at one stops the orbit, brings it near and names what it does in this
     blend in the line under the words; pressing it opens step I at its row. Places wait, as keys too, while fewer than two are
     chosen.
   - The four steps are coins made like the seal's face (I to IV), joined by a thread; the step being shown stands nearer, a tick
     marks those done. Each step's panel and the answers are Home's slabs; every model row, way, answer and ready-made card leans
     toward the pointer, lifts under it and sinks when pressed, as Fabrica's cards do.
   - Minimal motion and the system's reduced motion keep it all still; below 760 pixels Blend keeps its former layout. */
#page-blend.bx-on{--bx-ink1:#221a2e;--bx-ink2:#4a4358;--bx-ink3:#6c6579;--bx-hair:rgba(34,26,46,.10);--bx-hair2:rgba(34,26,46,.06);--bx-acc:#6a3fb5;--bx-gold:#b88a3a;
  --bx-hi:#ffffff;--bx-lo:#faf8fc;--bx-sunk:rgba(34,26,46,.035);--bx-keyA:#ffffff;--bx-keyB:#f6f2fb;--bx-pa:#7a50c6;--bx-pb:#5d37a1;--bx-pedge:#3a2070;
  --bx-slab:inset 0 1px 0 rgba(255,255,255,.9),inset 0 -1px 0 rgba(40,22,68,.05),0 1px 0 rgba(40,22,68,.10),0 3px 0 rgba(40,22,68,.05),0 6px 12px rgba(40,22,68,.07),0 18px 36px rgba(40,22,68,.08);
  --bx-key:inset 0 -1.5px 0 rgba(40,22,68,.13),0 2px 0 rgba(40,22,68,.25),0 4px 5px rgba(40,22,68,.16),0 9px 14px rgba(40,22,68,.1);
  --bx-keyhi:inset 0 -1.5px 0 rgba(40,22,68,.13),0 3px 0 rgba(40,22,68,.25),0 6px 8px rgba(40,22,68,.18),0 13px 20px rgba(40,22,68,.12);
  --bx-press:inset 0 2px 5px rgba(40,22,68,.22),0 1px 1px rgba(40,22,68,.18);
  --bx-sky:radial-gradient(ellipse 70% 80% at 70% 60%,#fdfbff 0%,#f4eefb 46%,#e8def5 100%);--bx-skyring:rgba(106,63,181,.10);--bx-line:rgba(106,63,181,.30);--bx-line2:rgba(106,63,181,.18);
  --bx-star:#8c6ad0;--bx-starop:.35;--bx-shade:rgba(40,22,68,.30);--bx-coin0:#ffffff;--bx-coin1:#efe8f8;--bx-rim0:#b39bea;--bx-rim1:#6a3fb5;--bx-rim2:#472b7f;
  --bx-erim0:#ddd2ef;--bx-erim1:#a891d4;--bx-serif:"Home Cormorant","Cormorant Garamond",Cormorant,"Iowan Old Style",Palatino,Georgia,serif;--bx-r:205px}
body[data-theme="night"] #page-blend.bx-on{--bx-ink1:#f3eefb;--bx-ink2:#d3c9e3;--bx-ink3:#a99cc1;--bx-hair:rgba(205,184,240,.12);--bx-hair2:rgba(205,184,240,.07);--bx-acc:#b79ce6;--bx-gold:#d8b46a;
  --bx-hi:#211a2d;--bx-lo:#1b1526;--bx-sunk:rgba(10,6,18,.32);--bx-keyA:#2a2239;--bx-keyB:#231c31;--bx-pedge:#170b30;
  --bx-slab:inset 0 1px 0 rgba(255,255,255,.06),inset 0 -1px 0 rgba(0,0,0,.35),0 1px 0 rgba(0,0,0,.6),0 3px 0 rgba(0,0,0,.28),0 6px 12px rgba(0,0,0,.35),0 18px 36px rgba(0,0,0,.4);
  --bx-key:inset 0 1px 0 rgba(255,255,255,.07),inset 0 -2px 0 rgba(0,0,0,.45),0 2px 0 rgba(0,0,0,.75),0 4px 5px rgba(0,0,0,.5),0 9px 14px rgba(0,0,0,.36);
  --bx-keyhi:inset 0 1px 0 rgba(255,255,255,.07),inset 0 -2px 0 rgba(0,0,0,.45),0 3px 0 rgba(0,0,0,.75),0 6px 8px rgba(0,0,0,.52),0 13px 20px rgba(0,0,0,.38);
  --bx-press:inset 0 2px 6px rgba(0,0,0,.6),0 1px 1px rgba(0,0,0,.4);
  --bx-sky:radial-gradient(ellipse 70% 80% at 70% 60%,#241a38 0%,#161024 50%,#0c0915 100%);--bx-skyring:rgba(205,184,240,.10);--bx-line:rgba(196,176,238,.30);--bx-line2:rgba(196,176,238,.16);
  --bx-star:#f3e7c8;--bx-starop:.6;--bx-shade:rgba(0,0,0,.62);--bx-coin0:#372d4d;--bx-coin1:#1a1524;--bx-rim0:#e2d5fa;--bx-rim1:#9a7ad8;--bx-rim2:#3d2572;--bx-erim0:#43375e;--bx-erim1:#1d1729}
#page-blend:not(.bx-on) .bx-head,#page-blend:not(.bx-on) .bx-steps{display:none}
/* ---------- the head: Home's sky, Blend's words and rooms, the engine with the chosen models riding round it ---------- */
#page-blend.bx-on .bx-head{position:relative;height:430px;margin:0 0 8px;border-radius:30px;overflow:hidden;isolation:isolate;background:var(--bx-sky);color:var(--bx-ink1);
  box-shadow:inset 0 0 0 1px var(--bx-skyring),0 1px 1px rgba(40,22,68,.04),0 4px 6px rgba(40,22,68,.04),0 14px 28px rgba(40,22,68,.07),0 34px 60px rgba(40,22,68,.08)}
body[data-theme="night"] #page-blend.bx-on .bx-head{box-shadow:inset 0 0 0 1px var(--bx-skyring),0 14px 28px rgba(0,0,0,.45),0 34px 60px rgba(0,0,0,.4)}
#page-blend.bx-on .bx-stars{position:absolute;inset:0;z-index:0;pointer-events:none}
#page-blend.bx-on .bx-stars i{position:absolute;width:2px;height:2px;border-radius:50%;background:var(--bx-star);opacity:var(--bx-starop);animation:bxTw 5s ease-in-out infinite}
@keyframes bxTw{0%,100%{opacity:.15}50%{opacity:.7}}
#page-blend.bx-on .bx-words{position:absolute;left:40px;top:34px;z-index:5;width:var(--bx-ww,470px)}
#page-blend.bx-on .bx-eyebrow{display:flex;gap:14px;font:600 11.5px/1 var(--sans,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif);letter-spacing:.28em;text-transform:uppercase;color:var(--bx-gold)}
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
/* ---------- the engine ---------- */
#page-blend.bx-on .bx-engine{position:absolute;left:var(--bx-el,560px);top:0;right:0;bottom:0;z-index:3;perspective:1600px;perspective-origin:50% 52%}
#page-blend.bx-on .bx-plane{position:absolute;left:50%;top:52%;width:480px;height:480px;margin:-240px 0 0 -240px;transform:rotateX(56deg) scale(var(--bx-k,1));pointer-events:none}
#page-blend.bx-on .bx-plane svg{display:block;width:100%;height:100%;overflow:visible}
#page-blend.bx-on .bx-ring{fill:none;stroke:var(--bx-line);stroke-width:1.2;vector-effect:non-scaling-stroke}
#page-blend.bx-on .bx-ring.r2{stroke:var(--bx-line2);stroke-dasharray:5 7}
#page-blend.bx-on .bx-orbit{position:absolute;inset:0;z-index:2;perspective:1600px;perspective-origin:50% 52%;pointer-events:none}
#page-blend.bx-on .bx-head.bx-hold .bx-orbit{z-index:6}
#page-blend.bx-on .bx-world{position:absolute;left:50%;top:52%;width:0;height:0;transform-style:preserve-3d;transform:rotateX(56deg)}
#page-blend.bx-on .bx-spin,#page-blend.bx-on .bx-arm,#page-blend.bx-on .bx-unarm,#page-blend.bx-on .bx-counter,#page-blend.bx-on .bx-stand{position:absolute;left:0;top:0;width:0;height:0;transform-style:preserve-3d}
#page-blend.bx-on .bx-spin{animation:bxOrbit var(--bx-t,60s) linear infinite}
#page-blend.bx-on .bx-arm{transform:rotateZ(var(--a,0deg)) translateX(var(--bx-r,205px))}
#page-blend.bx-on .bx-unarm{transform:rotateZ(calc(-1 * var(--a,0deg)))}
#page-blend.bx-on .bx-counter{animation:bxCounter var(--bx-t,60s) linear infinite}
#page-blend.bx-on .bx-stand{transform:rotateX(-56deg)}
@keyframes bxOrbit{from{transform:rotateZ(0deg)}to{transform:rotateZ(-360deg)}}
@keyframes bxCounter{from{transform:rotateZ(0deg)}to{transform:rotateZ(360deg)}}
body[data-motion="full"] #page-blend.bx-on .bx-orbit{--bx-t:45s}
#page-blend.bx-on .bx-head.bx-hold .bx-spin,#page-blend.bx-on .bx-head.bx-hold .bx-counter,body.touring #page-blend.bx-on .bx-spin,body.touring #page-blend.bx-on .bx-counter{animation-play-state:paused}
body[data-motion="minimal"] #page-blend.bx-on .bx-spin,body[data-motion="minimal"] #page-blend.bx-on .bx-counter{animation:none}
@media (prefers-reduced-motion:reduce){#page-blend.bx-on .bx-spin,#page-blend.bx-on .bx-counter{animation:none}}
#page-blend.bx-on .bx-shadow{position:absolute;left:-32px;top:-7px;width:64px;height:14px;border-radius:50%;pointer-events:none;background:radial-gradient(closest-side,var(--bx-shade),rgba(0,0,0,0));opacity:.7}
#page-blend.bx-on .bx-sat{position:absolute;left:-60px;top:-70px;width:120px;display:flex;flex-direction:column;align-items:center;margin:0;padding:0;border:0;background:none;color:inherit;font:inherit;
  pointer-events:auto;cursor:pointer;transform-origin:60px 48px;transform:scale(.9);transition:transform .35s cubic-bezier(.2,.8,.2,1),opacity .35s ease,filter .35s ease;-webkit-tap-highlight-color:transparent;box-shadow:none;min-height:0}
#page-blend.bx-on .bx-sat.bx-near{transform:scale(1.02)}
#page-blend.bx-on .bx-sat:focus{outline:none}
#page-blend.bx-on .bx-sat:focus-visible .bxo::after{content:"";position:absolute;inset:17%;border-radius:50%;box-shadow:0 0 0 2.5px var(--bx-acc)}
#page-blend.bx-on .bx-sat .bxo{--S:96px}
#page-blend.bx-on .bx-sat .bx-name{margin-top:-10px;font:600 17px/1.1 var(--bx-serif);letter-spacing:.03em;color:var(--bx-ink1);white-space:nowrap}
#page-blend.bx-on .bx-sat .bx-role{margin-top:3px;font-size:10.5px;font-weight:600;line-height:1.2;color:var(--bx-acc);white-space:nowrap}
#page-blend.bx-on .bx-sat .bx-role::before{content:"";display:inline-block;width:5px;height:5px;margin:0 5px 1px 0;border-radius:50%;background:currentColor;vertical-align:middle}
#page-blend.bx-on .bx-sat .bx-role:empty{display:none}
#page-blend.bx-on .bx-head.bx-hold .bx-sat:not(.bx-near){opacity:.6}
body[data-theme="night"] #page-blend.bx-on .bx-head.bx-hold .bx-sat:not(.bx-near){opacity:.55;filter:saturate(.7)}
#page-blend.bx-on .bx-sat.bx-ghost .bx-name{margin-top:0;font:italic 500 15px/1.1 var(--bx-serif);color:var(--bx-ink3)}
#page-blend.bx-on .bx-ghostorb{display:grid;place-items:center;width:62px;height:62px;margin:17px 0 13px;border-radius:50%;border:1.5px dashed var(--bx-line);color:var(--bx-ink3);
  font:500 26px/1 var(--bx-serif);transition:transform .35s cubic-bezier(.34,1.35,.64,1),border-color .3s ease,color .3s ease}
#page-blend.bx-on .bx-sat.bx-ghost:hover .bx-ghostorb{transform:translateY(-3px);border-color:var(--bx-acc);color:var(--bx-acc)}
#page-blend.bx-on .bx-sun{position:absolute;left:50%;top:52%;z-index:4;width:96px;height:96px;transform:translate(-50%,-50%)}
#page-blend.bx-on .bx-sun::after{content:"";position:absolute;left:-10%;top:100%;z-index:-1;width:120%;height:18px;margin-top:10px;border-radius:50%;background:radial-gradient(closest-side,var(--bx-shade),rgba(0,0,0,0));opacity:.8;pointer-events:none}
#page-blend.bx-on .bx-sun .isl .isl-ring{--fz:.11;--fk:.9725}
#page-blend.bx-on .bx-sun .isl .isl-star{--fz:.2;--fk:.95}
#page-blend.bx-on .bx-sun .isl .isl-heart{--fz:.36;--fk:.91}
#page-blend.bx-on .bx-sun .isl .bx-rim{position:absolute;left:2.6%;top:2.6%;width:94.8%;height:94.8%;border-radius:50%;display:block;pointer-events:none;
  background:linear-gradient(160deg,var(--bx-erim0),var(--bx-erim1));transform:translateZ(calc(var(--S) * -.012 * var(--k)))}
@keyframes bxEngine{from{transform:rotate(0deg)}to{transform:rotate(-360deg)}}
#page-blend.bx-on .bx-sun .seal-spin{animation:bxEngine 9s linear infinite}
body[data-motion="calm"] #page-blend.bx-on .bx-sun .seal-spin{animation-duration:13s}
body[data-motion="minimal"] #page-blend.bx-on .bx-sun .seal-spin{animation:none}
@media (prefers-reduced-motion:reduce){#page-blend.bx-on .bx-sun .seal-spin{animation:none}}
#page-blend.bx-on .bx-count{position:absolute;left:40px;bottom:24px;z-index:6;max-width:var(--bx-ww,470px);font:italic 500 16px/1.4 var(--bx-serif);color:var(--bx-ink3);transition:color .25s ease}
#page-blend.bx-on .bx-count b{font-style:normal;font-weight:600;color:var(--bx-ink1);letter-spacing:.02em}
#page-blend.bx-on .bx-head.bx-hold .bx-count{color:var(--bx-ink2)}
/* ---------- orbs and coins, made as the seal is made: layers at their own depths over the seal's soft cast ---------- */
#page-blend.bx-on .bxo,#page-blend.bx-on .bxc{position:relative;display:block;flex:0 0 auto;width:var(--S);height:var(--S);--rx:0deg;--ry:0deg;--cdl:0px;--cds:1;perspective:calc(var(--S) * 4);pointer-events:none}
#page-blend.bx-on .bxc{--S:64px}
#page-blend.bx-on .bxo{--c0:#c9b6ee;--c1:#9068d6;--c2:#6a3fb5;--c3:#55309a;--c4:#3d2275;--csh:#2a1260;--ct1:.2;--ct2:.4;--ce1:.1;--ce2:.26}
body[data-theme="night"] #page-blend.bx-on .bxo{--c0:var(--n0);--c1:var(--n1);--c2:var(--n2);--c3:var(--n3);--c4:var(--n4);--csh:#0b0220;--ct1:.32;--ct2:.6;--ce1:.2;--ce2:.42}
#page-blend.bx-on .bx-tilt{position:absolute;inset:0;transform-style:preserve-3d;transform:rotateX(var(--rx)) rotateY(var(--ry)) translateY(var(--cdl)) scale(var(--cds));transition:transform .35s cubic-bezier(.2,.8,.2,1)}
#page-blend.bx-on .bx-idle{position:absolute;inset:0;transform-style:preserve-3d;animation:bxSway 7s ease-in-out infinite;animation-delay:var(--od,0s)}
@keyframes bxSway{0%,100%{transform:rotateY(-18deg) rotateX(5deg)}50%{transform:rotateY(18deg) rotateX(-5deg)}}
#page-blend.bx-on .bx-cast{position:absolute;left:22%;right:22%;bottom:-4%;height:9%;border-radius:50%;background:rgba(42,20,80,.16);filter:blur(calc(var(--S) * .045));
  transform:translateZ(calc(var(--S) * -.12));transition:opacity .35s ease,transform .35s ease}
#page-blend.bx-on .bxo .bx-cast{left:31%;right:31%;bottom:13%;height:8%}
body[data-theme="night"] #page-blend.bx-on .bx-cast{background:rgba(0,0,0,.4)}
#page-blend.bx-on .bx-lay{position:absolute;left:0;top:0;width:200%;height:200%;transform-origin:0 0;pointer-events:none;
  transform:translate(calc(var(--S) * .5),calc(var(--S) * .5)) translateZ(calc(var(--S) * var(--fz))) scale(var(--fk)) translate(calc(var(--S) * -.5),calc(var(--S) * -.5)) scale(.5)}
#page-blend.bx-on .bx-lay > svg{display:block;width:100%;height:100%;overflow:visible}
#page-blend.bx-on .bx-l0{--fz:0;--fk:1}#page-blend.bx-on .bx-l2{--fz:.16;--fk:.96}#page-blend.bx-on .bx-l3{--fz:.14;--fk:.965}
#page-blend.bx-on .bxc .bx-l0 > svg{filter:drop-shadow(calc(var(--S) * .004) calc(var(--S) * .014) calc(var(--S) * .01) rgba(42,20,80,.2))}
#page-blend.bx-on .bxo .bx-l0 > svg{filter:drop-shadow(calc(var(--S) * .004) calc(var(--S) * .012) calc(var(--S) * .006) rgba(42,20,80,.24)) drop-shadow(calc(var(--S) * .01) calc(var(--S) * .03) calc(var(--S) * .025) rgba(42,20,80,.12))}
body[data-theme="night"] #page-blend.bx-on .bxc .bx-l0 > svg{filter:drop-shadow(calc(var(--S) * .004) calc(var(--S) * .014) calc(var(--S) * .012) rgba(0,0,0,.5))}
body[data-theme="night"] #page-blend.bx-on .bxo .bx-l0 > svg{filter:drop-shadow(calc(var(--S) * .004) calc(var(--S) * .012) calc(var(--S) * .008) rgba(0,0,0,.5)) drop-shadow(calc(var(--S) * .01) calc(var(--S) * .03) calc(var(--S) * .03) rgba(0,0,0,.3))}
#page-blend.bx-on .bx-num{position:absolute;inset:0;display:grid;place-items:center;font:600 calc(var(--S) * .8)/1 var(--bx-serif);color:var(--bx-rim1);
  filter:drop-shadow(calc(var(--S) * .012) calc(var(--S) * .04) calc(var(--S) * .03) rgba(42,20,80,.3))}
body[data-theme="night"] #page-blend.bx-on .bx-num{color:var(--bx-rim0);filter:drop-shadow(calc(var(--S) * .012) calc(var(--S) * .04) calc(var(--S) * .035) rgba(0,0,0,.55))}
#page-blend.bx-on .bx-ico{position:absolute;left:50%;top:50%;width:calc(var(--S) * .54);height:calc(var(--S) * .54);margin:calc(var(--S) * -.27) 0 0 calc(var(--S) * -.27);color:#fff;
  filter:drop-shadow(calc(var(--S) * .016) calc(var(--S) * .05) calc(var(--S) * .04) rgba(42,20,80,.3))}
body[data-theme="night"] #page-blend.bx-on .bx-ico{filter:drop-shadow(calc(var(--S) * .016) calc(var(--S) * .045) calc(var(--S) * .045) rgba(0,0,0,.5))}
#page-blend.bx-on .bx-ico svg{display:block;width:100%;height:100%}
#page-blend.bx-on .bx-hov{--cdl:calc(var(--S) * -.03)}#page-blend.bx-on .bx-hov .bx-idle{animation-play-state:paused}
#page-blend.bx-on .bx-hov .bx-cast{opacity:.75;transform:translateZ(calc(var(--S) * -.12)) scale(.92)}
#page-blend.bx-on .bx-dn{--cdl:calc(var(--S) * .05);--cds:.96}#page-blend.bx-on .bx-dn .bx-tilt{transition-duration:.08s}
#page-blend.bx-on .bx-dn .bx-cast{opacity:1;transform:translateZ(calc(var(--S) * -.12)) scale(1.04)}
body[data-motion="minimal"] #page-blend.bx-on .bx-idle,body[data-motion="minimal"] #page-blend.bx-on .bx-stars i{animation:none}
body[data-motion="minimal"] #page-blend.bx-on .bx-tilt{transform:none}
@media (prefers-reduced-motion:reduce){#page-blend.bx-on .bx-idle,#page-blend.bx-on .bx-stars i{animation:none}#page-blend.bx-on .bx-tilt{transition:none}}
/* ---------- the four steps: coins on a thread ---------- */
#page-blend.bx-on .bx-steps{display:flex;justify-content:center;margin:0 0 10px;padding:6px 0 2px}
#page-blend.rm-on:not([data-rm-room="new"]).bx-on .bx-steps{display:none}
#page-blend.bx-on .bx-steps .rm-steps{position:relative;display:flex;justify-content:center;gap:0;margin:0;padding:0;list-style:none;width:auto;background:none;border:0;box-shadow:none}
#page-blend.bx-on .bx-steps .rm-steps::before{content:"";position:absolute;left:100px;right:100px;top:38px;border-top:1.5px dashed var(--bx-line)}
#page-blend.bx-on .bx-steps .rm-steps > li{list-style:none;margin:0;padding:0;flex:0 0 auto}
#page-blend.bx-on .bx-steps .rm-step{position:relative;width:200px;min-height:0;display:flex;flex-direction:column;align-items:center;gap:6px;margin:0;padding:0;border:0;border-radius:0;
  background:none;box-shadow:none;color:inherit;cursor:pointer;transform:none}
#page-blend.bx-on .bx-steps .rm-step:hover,#page-blend.bx-on .bx-steps .rm-step:active{background:none;box-shadow:none;transform:none}
#page-blend.bx-on .bx-steps .rm-step > i{display:none}
#page-blend.bx-on .bx-steps .rm-step > span:not(.rm-sr):not(.bx-sd){font:600 17px/1.1 var(--bx-serif);letter-spacing:.04em;color:var(--bx-ink2)}
#page-blend.bx-on .bx-steps .rm-step[aria-current="step"] > span:not(.rm-sr):not(.bx-sd){color:var(--bx-ink1)}
#page-blend.bx-on .bx-steps .rm-step .bx-sd{max-width:170px;font-size:11.5px;line-height:1.35;color:var(--bx-ink3);text-align:center}
#page-blend.bx-on .bx-steps .rm-step .bxc{--S:64px;transition:width .35s cubic-bezier(.34,1.35,.64,1),height .35s cubic-bezier(.34,1.35,.64,1)}
#page-blend.bx-on .bx-steps .rm-step[aria-current="step"] .bxc{--S:76px}
#page-blend.bx-on .bx-steps .rm-step[aria-current="step"] .bxc .bx-tilt{transform:rotateX(var(--rx)) rotateY(var(--ry)) translateY(calc(var(--cdl) - 4px)) scale(var(--cds))}
#page-blend.bx-on .bx-steps .rm-step:focus{outline:none}
#page-blend.bx-on .bx-steps .rm-step:focus-visible .bxc::after{content:"";position:absolute;inset:-4px;border-radius:50%;box-shadow:0 0 0 2.5px var(--bx-acc)}
#page-blend.bx-on .bx-steps .bx-tick{position:absolute;right:-2px;top:-2px;width:20px;height:20px;border-radius:50%;background:var(--bx-acc);color:#fff;display:none;place-items:center;box-shadow:0 2px 4px rgba(40,22,68,.3)}
#page-blend.bx-on .bx-steps .rm-step.rm-done .bx-tick{display:grid}
#page-blend.bx-on .bx-steps .bx-tick svg{width:12px;height:12px}
/* ---------- the panels: Home's slabs ---------- */
#page-blend.bx-on .bl-grid{gap:18px;align-items:start}
#page-blend.bx-on .bl-setup,#page-blend.bx-on .bl-results{border-radius:22px;background:linear-gradient(var(--bx-hi),var(--bx-lo));border:1px solid var(--bx-hair);box-shadow:var(--bx-slab);padding:20px 20px 18px;color:var(--bx-ink1)}
#page-blend.bx-on .bl-setup > h2.sec{font:600 22px/1.15 var(--bx-serif);letter-spacing:.02em;color:var(--bx-ink1)}
#page-blend.bx-on .bl-setup .blx-cxh,#page-blend.bx-on .bl-setup .blx-grp{margin:14px 0 8px;font-size:10.5px;font-weight:700;line-height:1.2;letter-spacing:.2em;text-transform:uppercase;color:var(--bx-ink3)}
/* each model a row with its orb: a chosen one stands raised and rides the engine */
#page-blend.bx-on .bl-pick{display:flex;flex-direction:column;gap:8px}
#page-blend.bx-on .bl-model{display:flex;align-items:center;gap:12px;margin:0;padding:8px 12px 8px 8px;border-radius:14px;border:1px solid var(--bx-hair2);background:var(--bx-sunk);color:var(--bx-ink1);cursor:pointer}
#page-blend.bx-on .bl-model.bx-chosen{background:linear-gradient(var(--bx-keyA),var(--bx-keyB));border-color:var(--bx-hair);box-shadow:var(--bx-key)}
#page-blend.bx-on .bl-model.bx-seen{box-shadow:inset 0 0 0 1.5px var(--bx-acc),var(--bx-keyhi)}
#page-blend.bx-on .bl-model.off{opacity:.6}
#page-blend.bx-on .bl-model .bl-sw{display:none}
#page-blend.bx-on .bl-model .bxo{--S:52px;margin:-6px -4px -6px -6px}
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
/* the answers: each model's answer on its own plate, the final answer raised */
#page-blend.bx-on .bl-results .bl-empty{display:grid;place-items:center;min-height:300px;padding:20px;text-align:center;color:var(--bx-ink3);font-size:13px;line-height:1.6}
#page-blend.bx-on .bl-results .bl-empty b{display:block;margin-bottom:6px;font:600 24px/1.2 var(--bx-serif);color:var(--bx-ink1)}
#page-blend.bx-on .bl-results .bl-q{font:600 20px/1.3 var(--bx-serif);letter-spacing:.01em;color:var(--bx-ink1)}
#page-blend.bx-on .bl-results .bl-card{margin:0 0 10px;padding:12px 14px;border-radius:16px;background:var(--bx-sunk);border:1px solid var(--bx-hair2);box-shadow:none}
#page-blend.bx-on .bl-results .bl-card.bl-final{padding:18px 20px;border-radius:20px;background:linear-gradient(var(--bx-keyA),var(--bx-keyB));border-color:var(--bx-hair);box-shadow:var(--bx-slab)}
#page-blend.bx-on .bl-results .bl-card-h b{font:600 16px/1.2 var(--bx-serif);letter-spacing:.03em}
#page-blend.bx-on .bl-results .bl-card.bl-final > .bl-card-h b{font-size:22px}
#page-blend.bx-on .bl-results .bl-card-h b::before,#page-blend.bx-on .bl-results .blx-strip span::before,#page-blend.bx-on .bl-preset .bl-pm span::before{content:"";display:inline-block;
  width:14px;height:14px;margin:0 7px -2px 0;border-radius:50%;background:radial-gradient(circle at 36% 32%,#c9b6ee 0%,#9068d6 30%,#6a3fb5 62%,#3d2275 100%);
  box-shadow:0 1px 2px rgba(40,22,68,.35)}
#page-blend.bx-on .bl-results .blx-strip span::before,#page-blend.bx-on .bl-preset .bl-pm span::before{width:10px;height:10px;margin:0 5px -1px 0}
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
</style>
<script>try{(window.__ingParts=window.__ingParts||{})["p262"]="started";}catch(_){}
/* R262 · Blend in Home's language: see the note at the top of its styles */
(function(){"use strict";
if(window.__r262)return;window.__r262=1;
var D=document,W=window;
function $(id){return D.getElementById(id);}
function mk(t,c,h){var e=D.createElement(t);if(c)e.className=c;if(h!=null)e.innerHTML=h;return e;}
function motion(){var m="calm";try{m=D.body.getAttribute("data-motion")||"calm";}catch(e){}try{if(W.matchMedia&&matchMedia("(prefers-reduced-motion: reduce)").matches)m="minimal";}catch(e){}return m;}
function still(){return motion()==="minimal";}

/* ---------- orbs and coins ---------- */
var TONES=[["#a57fe8","#6a3fb5","#2e1764"],["#9283f2","#4d3db0","#1e1660"],["#c48ae8","#8641b8","#3e1760"],["#b47ad9","#7637a8","#331455"],["#b9a3f2","#7458c6","#33206c"],["#9a6be0","#5c31a4","#250f4b"],["#a98ce8","#6648b8","#281a5e"]];
function hex(c){c=c.replace("#","");return [parseInt(c.slice(0,2),16),parseInt(c.slice(2,4),16),parseInt(c.slice(4,6),16)];}
function mix(a,b,t){var A=hex(a),B=hex(b);return "#"+A.map(function(v,i){var n=Math.round(v+(B[i]-v)*t);return (n<16?"0":"")+n.toString(16);}).join("");}
var NS=0;
function ballSvg(){var id="bxb"+(++NS),R=' transform="rotate(44 60 60)"',c=function(n,o){return ' style="stop-color:var(--'+n+')'+(o?';stop-opacity:var(--'+o+')':'')+'"';};
  return '<svg viewBox="0 0 120 120" aria-hidden="true" focusable="false"><defs>'+
    '<radialGradient id="'+id+'b" cx=".36" cy=".5" r=".74" fx=".2" fy=".5"><stop offset="0"'+c('c0')+'/><stop offset=".16"'+c('c1')+'/><stop offset=".52"'+c('c2')+'/><stop offset=".86"'+c('c3')+'/><stop offset="1"'+c('c4')+'/></radialGradient>'+
    '<linearGradient id="'+id+'t" x1="0" y1="0" x2="1" y2="0"><stop offset=".4" stop-opacity="0"'+c('csh')+'/><stop offset=".76"'+c('csh','ct1')+'/><stop offset="1"'+c('csh','ct2')+'/></linearGradient>'+
    '<radialGradient id="'+id+'e" cx=".5" cy=".5" r=".5"><stop offset=".7" stop-opacity="0"'+c('csh')+'/><stop offset=".93"'+c('csh','ce1')+'/><stop offset="1"'+c('csh','ce2')+'/></radialGradient>'+
    '<radialGradient id="'+id+'s" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#fff" stop-opacity=".85"/><stop offset=".4" stop-color="#fff" stop-opacity=".32"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient>'+
    '<clipPath id="'+id+'c"><circle cx="60" cy="60" r="40"/></clipPath></defs>'+
    '<g'+R+'><circle cx="60" cy="60" r="40" fill="url(#'+id+'b)"/></g><g'+R+'><g clip-path="url(#'+id+'c)"><rect x="18" y="18" width="84" height="84" fill="url(#'+id+'t)"/></g></g>'+
    '<circle cx="60" cy="60" r="40" fill="url(#'+id+'e)"/><g'+R+'><ellipse cx="41" cy="60" rx="9.5" ry="13.5" fill="url(#'+id+'s)"/></g></svg>';}
function coinSvg(){var id="bxc"+(++NS);
  return '<svg viewBox="0 0 120 120" aria-hidden="true" focusable="false"><defs><linearGradient id="'+id+'r" x1="0" y1="0" x2="1" y2="1"><stop offset="0" style="stop-color:var(--bx-rim0)"/><stop offset=".5" style="stop-color:var(--bx-rim1)"/><stop offset="1" style="stop-color:var(--bx-rim2)"/></linearGradient>'+
    '<radialGradient id="'+id+'f" cx=".42" cy=".36" r=".75"><stop offset="0" style="stop-color:var(--bx-coin0)"/><stop offset="1" style="stop-color:var(--bx-coin1)"/></radialGradient></defs>'+
    '<circle cx="60" cy="60" r="54" fill="url(#'+id+'r)"/><circle cx="60" cy="60" r="46" fill="url(#'+id+'f)"/><circle cx="60" cy="60" r="46" fill="none" stroke="#fff" stroke-opacity=".35" stroke-width="1"/></svg>';}
/* each model's own mark, drawn as Ingenium's room marks are */
var MARK={velox:'<path d="M4.5 19.5l11-11"/><path d="M9.5 8.5h6v6"/><path d="M3.5 12.5h4M6.5 16.5h3"/>',
  magister:'<path d="M12 4.5v15M7.5 19.5h9M5 8h14"/><path d="M5 8l-2.6 5.5a2.6 2.6 0 0 0 5.2 0z"/><path d="M19 8l-2.6 5.5a2.6 2.6 0 0 0 5.2 0z"/><circle cx="12" cy="4.5" r="1"/>',
  scriba:'<path d="M19.5 4.5c-6 .8-10.6 5.2-12.6 11.2l-.9 3.8 3.8-.9c6-2 10.4-6.6 11.2-12.6z"/><path d="M6.9 17.1l5.6-5.6"/>',
  faber:'<path d="M13.5 6.5l4 4"/><path d="M12 8l-7.5 7.5a1.4 1.4 0 0 0 0 2l2 2a1.4 1.4 0 0 0 2 0L16 12"/><path d="M12 8l2.5-2.5a2.8 2.8 0 0 1 4 4L16 12"/>',
  cloud:'<path d="M7 18.5h10a4 4 0 0 0 .4-8 5.8 5.8 0 0 0-11.2 1.6A3.3 3.3 0 0 0 7 18.5z"/><path d="M10 14.5h4"/>',
  chip:'<rect x="6.5" y="6.5" width="11" height="11" rx="2"/><path d="M9.5 3v3.5M14.5 3v3.5M9.5 17.5V21M14.5 17.5V21M3 9.5h3.5M3 14.5h3.5M17.5 9.5H21M17.5 14.5H21"/>'};
function markOf(name,cloud){var n=(name||"").toLowerCase();if(cloud)return "cloud";if(/velox/.test(n))return "velox";if(/magister/.test(n))return "magister";if(/scriba/.test(n))return "scriba";if(/faber/.test(n))return "faber";return "chip";}
function toneOf(name){var h=0;for(var i=0;i<(name||"").length;i++)h=(h*31+name.charCodeAt(i))|0;return TONES[Math.abs(h)%TONES.length];}
function orb(name,cloud,od){var T=toneOf(name),o=mk("span","bxo");o.setAttribute("aria-hidden","true");if(od!=null)o.style.setProperty("--od",od+"s");
  [mix(T[0],"#ffffff",.5),T[0],T[1],T[2],mix(T[2],"#000000",.42)].forEach(function(v,n){o.style.setProperty("--n"+n,v);});
  o.innerHTML='<span class="bx-tilt"><span class="bx-idle"><i class="bx-cast"></i><span class="bx-lay bx-l0">'+ballSvg()+'</span><span class="bx-lay bx-l3"><span class="bx-ico">'+
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">'+MARK[markOf(name,cloud)]+'</svg></span></span></span></span>';return o;}
function coin(num,od){var c=mk("span","bxc");c.setAttribute("aria-hidden","true");if(od!=null)c.style.setProperty("--od",od+"s");
  c.innerHTML='<span class="bx-tilt"><span class="bx-idle"><i class="bx-cast"></i><span class="bx-lay bx-l0">'+coinSvg()+'</span><span class="bx-lay bx-l2"><span class="bx-num">'+num+'</span></span></span></span>'+
    '<span class="bx-tick"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg></span>';return c;}
/* an orb or a coin answers the pointer as the seal key does: it tilts to follow a mouse and lifts; pressed, it sinks */
function wire(host,o){if(host.__bxw)return;host.__bxw=1;
  host.addEventListener("pointerenter",function(e){if(e.pointerType==="mouse"&&!still())o.classList.add("bx-hov");});
  host.addEventListener("pointermove",function(e){if(e.pointerType!=="mouse"||still())return;var r=o.getBoundingClientRect();if(!r.width)return;
    var x=Math.max(-.25,Math.min(1.25,(e.clientX-r.left)/r.width)),y=Math.max(-.25,Math.min(1.25,(e.clientY-r.top)/r.height));
    o.style.setProperty("--ry",((x-.5)*28).toFixed(1)+"deg");o.style.setProperty("--rx",(-(y-.5)*24).toFixed(1)+"deg");},{passive:true});
  host.addEventListener("pointerleave",function(){o.classList.remove("bx-hov","bx-dn");o.style.setProperty("--rx","0deg");o.style.setProperty("--ry","0deg");});
  host.addEventListener("pointerdown",function(){if(!still())o.classList.add("bx-dn");},{passive:true});
  ["pointerup","pointercancel"].forEach(function(t){host.addEventListener(t,function(){o.classList.remove("bx-dn");},{passive:true});});
  host.addEventListener("keydown",function(e){if((e.key==="Enter"||e.key===" ")&&!still()){o.classList.add("bx-dn");setTimeout(function(){o.classList.remove("bx-dn");},140);}});}

/* ---------- the engine: Ingenium's seal key, cloned from the door's seal as Home's is, with R175's flourishes ---------- */
var SN=0;
function doorSeal(){var d=$("introSeal"),s=d&&d.querySelector(".isl");if(s)return s;var h=$("brandSealBtn");return h?h.querySelector(".isl"):null;}
function copySeal(){var s=doorSeal();if(!s)return null;var c=s.cloneNode(true),k="r262s"+(++SN)+"_";c.className="isl isl-home";c.removeAttribute("style");c.setAttribute("aria-hidden","true");
  var h=c.outerHTML;[].forEach.call(c.querySelectorAll("[id]"),function(n){var id=n.getAttribute("id"),q=id.replace(/[.*+?^${}()|[\]\\]/g,"\\$&");
    h=h.replace(new RegExp('id="'+q+'"',"g"),'id="'+k+id+'"').replace(new RegExp("url\\(#"+q+"\\)","g"),"url(#"+k+id+")").replace(new RegExp('href="#'+q+'"',"g"),'href="#'+k+id+'"');});
  var w=mk("div");w.innerHTML=h;var out=w.firstElementChild;[].forEach.call(out.querySelectorAll(".isl-tilt,.isl-idle"),function(n){n.removeAttribute("style");});return out;}
var KEY=null,busy=false,again=false,lastF="",n7=0,ends=[];
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
function engine(){var box=mk("div","hx-seal bx-sun");box.setAttribute("data-ing-seal","blend");
  var k=mk("button","r175-seal bxk");k.type="button";k.setAttribute("aria-label","Ingenium's seal, the engine of the blend. Press it for fun.");
  var g=mk("span","r175-glow");g.setAttribute("aria-hidden","true");var rp=mk("span","r175-ripple");rp.setAttribute("aria-hidden","true");var fx=mk("span","r175-fx");
  var seal=copySeal();if(seal){fx.appendChild(seal);var edge=seal.querySelector(".isl-edge");if(edge)for(var i=4;i>=1;i--){var r=mk("i","bx-rim");r.setAttribute("aria-hidden","true");r.style.setProperty("--k",String(i));edge.insertBefore(r,edge.firstChild);}}
  k.appendChild(g);k.appendChild(fx);k.appendChild(rp);box.appendChild(k);KEY=k;
  var isl=function(){return k.querySelector(".isl");};
  k.addEventListener("pointerenter",function(e){var s=isl();if(s&&e.pointerType==="mouse"&&!still())s.classList.add("hover");});
  k.addEventListener("pointermove",function(e){var s=isl();if(!s)return;var r=s.getBoundingClientRect();if(!r.width)return;var x=(e.clientX-r.left)/r.width,y=(e.clientY-r.top)/r.height;
    s.style.setProperty("--gx",(x*100).toFixed(1)+"%");s.style.setProperty("--gy",(y*100).toFixed(1)+"%");
    if(e.pointerType==="mouse"&&!still()){x=Math.max(-.25,Math.min(1.25,x));y=Math.max(-.25,Math.min(1.25,y));s.style.setProperty("--ry",((x-.5)*28).toFixed(1)+"deg");s.style.setProperty("--rx",(-(y-.5)*24).toFixed(1)+"deg");}},{passive:true});
  k.addEventListener("pointerleave",function(){var s=isl();if(!s)return;s.classList.remove("hover","down");s.style.setProperty("--rx","0deg");s.style.setProperty("--ry","0deg");});
  k.addEventListener("pointerdown",function(){var s=isl();if(s&&!still())s.classList.add("down");},{passive:true});
  ["pointerup","pointercancel"].forEach(function(t){k.addEventListener(t,function(e){var s=isl();if(!s)return;s.classList.remove("down");if(e.pointerType!=="mouse")s.classList.remove("hover");},{passive:true});});
  k.addEventListener("click",function(e){e.preventDefault();if(busy){again=true;glow(parts(),false);return;}play();});
  try{new ResizeObserver(function(){var s=isl();var w=k.offsetWidth;if(s&&w>0&&s.style.getPropertyValue("--S")!==w+"px")s.style.setProperty("--S",w+"px");}).observe(k);}catch(e){}
  if(seal)seal.style.setProperty("--S","96px");
  return box;}

/* ---------- the page ---------- */
var page=null,head=null,words=null,orbitBox=null,spin=null,count=null,stepsNav=null,on=false,held=null,countText="",title=null,lede=null,bar=null,ol=null;
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
function near(s,v){if(v){if(held&&held!==s)near(held,false);held=s;head.classList.add("bx-hold");s.classList.add("bx-near");var x=s.__bx;
    if(x)count.innerHTML="<b>"+esc(x.name)+"</b>, "+(x.cloud?"connected":"on this device")+(x.sub?": "+esc(x.sub):"")+". In this blend it "+x.role+". Press it to see it in step I.";}
  else{s.classList.remove("bx-near");if(held===s){held=null;head.classList.remove("bx-hold");count.textContent=countText;}}}
function esc(t){return String(t).replace(/[&<>"]/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c];});}
function goStep1(row){try{var b=page.querySelector('.rm-step[data-step="1"]');if(b)b.click();}catch(e){}
  if(row){row.classList.add("bx-seen");try{row.scrollIntoView({block:"center",behavior:still()?"auto":"smooth"});}catch(e){}setTimeout(function(){row.classList.remove("bx-seen");},1600);try{var c=row.querySelector("input");if(c)c.focus({preventScroll:true});}catch(e){}}}
function sat(x,i,n){var arm=mk("div","bx-arm"),un=mk("div","bx-unarm"),co=mk("div","bx-counter"),st=mk("div","bx-stand");arm.appendChild(un);un.appendChild(co);co.appendChild(st);
  var sh=mk("div","bx-shadow");sh.setAttribute("aria-hidden","true");st.appendChild(sh);var s=mk("button","bx-sat"+(x?"":" bx-ghost"));s.type="button";
  if(!x){s.innerHTML='<span class="bx-ghostorb" aria-hidden="true">+</span><span class="bx-name">a model</span>';s.setAttribute("aria-label","Choose a model for the blend");
    s.addEventListener("click",function(){goStep1(null);});}
  else{var o=orb(x.name,x.cloud,(-i*1.1).toFixed(2));s.appendChild(o);s.appendChild(mk("span","bx-name",esc(x.name)));s.appendChild(mk("span","bx-role",esc(x.role)));s.__bx=x;
    s.setAttribute("aria-label",x.name+": "+x.role+". Press it to see it in step one.");wire(s,o);
    s.addEventListener("pointerenter",function(){near(s,true);});s.addEventListener("pointerleave",function(){near(s,false);});
    s.addEventListener("focus",function(){near(s,true);});s.addEventListener("blur",function(){near(s,false);});
    s.addEventListener("click",function(){goStep1(x.row);});}
  st.appendChild(s);arm.style.setProperty("--a",(90+i*360/n).toFixed(1)+"deg");return arm;}
var lastSig="";
function orbit(force){if(!on||!orbitBox)return;var rows=chosenRows(),list=rows.map(function(l,i){return {row:l,name:rowName(l),sub:rowSub(l),cloud:l.classList.contains("blx-cx")};});
  list.forEach(function(x,i){x.role=role(x.name,i,list.length);});
  var sig=list.map(function(x){return x.name+"|"+x.role+"|"+x.cloud;}).join(";");
  /* the rows themselves wear their chosen look */
  [].forEach.call(D.querySelectorAll("#blendPick label.bl-model"),function(l){var c=l.querySelector('input[type="checkbox"]'),v=!!(c&&c.checked);if(l.classList.contains("bx-chosen")!==v)l.classList.toggle("bx-chosen",v);});
  if(sig===lastSig&&!force&&spin&&spin.isConnected)return;lastSig=sig;
  held=null;head.classList.remove("bx-hold");var n=Math.max(2,list.length),ns=mk("div","bx-spin");
  for(var i=0;i<n;i++)ns.appendChild(sat(list[i]||null,i,n));
  var world=orbitBox.querySelector(".bx-world");if(spin&&spin.parentNode)spin.parentNode.replaceChild(ns,spin);else world.appendChild(ns);spin=ns;
  countText=list.length<2?(list.length?"One more model, and the blend can begin.":"Choose two or more models in step I."):list.length+" models in the blend. Point at one to see what it does.";
  count.textContent=countText;}
/* each model row wears its orb */
function dressRows(){[].forEach.call(D.querySelectorAll("#blendPick label.bl-model"),function(l,i){if(l.querySelector(".bxo"))return;var nm=l.querySelector(".bl-mn");
  var o=orb(rowName(l),l.classList.contains("blx-cx"),(-i*1.1).toFixed(2));if(nm)l.insertBefore(o,nm);else l.insertBefore(o,l.firstChild);wire(l,o);});}
/* the steps as coins */
var DESC=["the models","how they work together","your question","as they are written"],NUM=["I","II","III","IV"];
function dressSteps(){if(!ol)return;[].forEach.call(ol.querySelectorAll(".rm-step"),function(b,i){if(b.querySelector(".bxc"))return;var c=coin(NUM[i]||String(i+1),(-i*1.6).toFixed(1));
  var lab=[].filter.call(b.children,function(x){return x.tagName==="SPAN"&&!x.classList.contains("rm-sr");})[0];b.insertBefore(c,lab||null);
  var d=mk("span","bx-sd",DESC[i]||"");d.setAttribute("aria-hidden","true");b.appendChild(d);wire(b,c);});}
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
  var stars=mk("div","bx-stars");stars.setAttribute("aria-hidden","true");for(var i=0;i<46;i++){var t=mk("i");t.style.left=(Math.random()*100).toFixed(2)+"%";t.style.top=(Math.random()*100).toFixed(2)+"%";t.style.animationDelay=(-Math.random()*5).toFixed(2)+"s";stars.appendChild(t);}
  head.appendChild(stars);
  words=mk("div","bx-words");var eb=mk("div","bx-eyebrow",'<b>Ingenium</b><span>Blend · four steps</span>');eb.setAttribute("aria-hidden","true");words.appendChild(eb);head.appendChild(words);
  var en=mk("div","bx-engine");var plane=mk("div","bx-plane",'<svg viewBox="0 0 480 480" aria-hidden="true"><circle class="bx-ring" cx="240" cy="240" r="205"/><circle class="bx-ring r2" cx="240" cy="240" r="110"/></svg>');
  plane.setAttribute("aria-hidden","true");en.appendChild(plane);
  orbitBox=mk("div","bx-orbit");orbitBox.appendChild(mk("div","bx-world"));en.appendChild(orbitBox);en.appendChild(engine());head.appendChild(en);
  count=mk("div","bx-count");count.setAttribute("aria-live","polite");head.appendChild(count);
  stepsNav=mk("nav","bx-steps");stepsNav.setAttribute("aria-label","The steps of a new blend");}
function layout(w){var big=w>=980,ww=big?470:Math.max(320,Math.round(w*.46)),el=ww+90,r=Math.max(120,Math.min(205,Math.round((w-el)/2-62)));
  var set=function(n,v){if(page.style.getPropertyValue(n)!==v)page.style.setProperty(n,v);};set("--bx-ww",ww+"px");set("--bx-el",el+"px");set("--bx-r",r+"px");set("--bx-k",(r/205).toFixed(3));}
function enter(){build();title=page.querySelector(":scope > .page-title");lede=page.querySelector(":scope > .lede");bar=$("rmBar-blend");ol=page.querySelector(".bl-setup .rm-steps")||page.querySelector(".rm-steps");
  var grid=$("rmP-blend")||page.querySelector(".bl-grid");if(!grid)return false;
  page.insertBefore(head,title||page.firstChild);if(title)words.appendChild(title);if(lede)words.appendChild(lede);if(bar)words.appendChild(bar);
  if(ol){stepsNav.appendChild(ol);dressSteps();}
  page.insertBefore(stepsNav,grid);page.classList.add("bx-on");on=true;dressRows();orbit(true);return true;}
function leave(){on=false;page.classList.remove("bx-on");if(held)near(held,false);
  var grid=$("rmP-blend")||page.querySelector(".bl-grid"),before=head&&head.parentNode===page?head:grid;
  if(title)page.insertBefore(title,before);if(lede)page.insertBefore(lede,before);if(bar)page.insertBefore(bar,before);
  if(ol){var setup=page.querySelector(".bl-setup");if(setup){var h=setup.querySelector(":scope > h2.sec");setup.insertBefore(ol,h||setup.firstChild);}}
  if(head&&head.parentNode)head.parentNode.removeChild(head);if(stepsNav&&stepsNav.parentNode)stepsNav.parentNode.removeChild(stepsNav);
  ["--bx-ww","--bx-el","--bx-r","--bx-k"].forEach(function(n){page.style.removeProperty(n);});}
function mount(){try{page=$("page-blend");if(!page)return;var w=page.clientWidth;if(!w)return;
  if(w>=760){layout(w);if(!on){if(!$("blendPick"))return;enter();}else{dressRows();orbit(false);}}else if(on)leave();}catch(e){try{console.warn("Ingenium: Blend's new look",e&&e.message||e);}catch(_){}}}
var T=0;function soon(){if(T)return;T=setTimeout(function(){T=0;if(on){dressRows();orbit(false);}},60);}
function boot(){page=$("page-blend");if(!page||!$("blendPick")){setTimeout(boot,700);return;}
  mount();wirePop();
  try{new ResizeObserver(function(){mount();}).observe(page);}catch(e){W.addEventListener("resize",mount);}
  /* a model chosen or left, a way or a writer chosen: the orbit follows; Blend drawing its list again: the rows wear their orbs again */
  page.addEventListener("change",function(e){var t=e.target;if(!on||!t)return;if(t.closest("#blendPick")||t.closest("#blendStrats")||t.id==="blWriter")soon();},true);
  try{new MutationObserver(soon).observe($("blendPick"),{childList:true});}catch(e){}
  try{var st=$("blendStrats");if(st)new MutationObserver(soon).observe(st,{childList:true});}catch(e){}}
if(D.readyState==="loading")D.addEventListener("DOMContentLoaded",boot);else boot();
W.IngBlendLook={state:function(){var s=spin?getComputedStyle(spin):null;return {on:on,sats:spin?spin.querySelectorAll(".bx-sat:not(.bx-ghost)").length:0,ghosts:spin?spin.querySelectorAll(".bx-ghost").length:0,
    names:spin?[].map.call(spin.querySelectorAll(".bx-sat:not(.bx-ghost) .bx-name"),function(x){return x.textContent;}):[],held:held&&held.__bx?held.__bx.name:null,
    turning:!!(s&&s.animationName!=="none"&&s.animationPlayState==="running"),engine:!!KEY,flourish:KEY?KEY.getAttribute("data-flourish"):null};},refresh:function(){lastSig="";mount();orbit(true);},press:function(){return KEY?play():"";}};
try{window.__ingParts["p262"]="running";}catch(_){}
})();
</script>
