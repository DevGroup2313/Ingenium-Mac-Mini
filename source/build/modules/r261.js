<style id="r261-css">
/* ============ R261 · HOME AS AN ORRERY (Ingenium 6.67, 10 November 2026) ============
   Her choice after the previews of 10 November 2026: the Orrery, "I want this version for the rest", with her seal as the engine
   at its centre and the six rooms as orbs around it. Her words that shape it: "I want Ingenium's engine to continuously be spinning
   and have it counterclockwise animation"; "I don't want the circle around the logo seal. The big one can stay ... I also don't
   want it to be gold"; "Remove the sphere from Fabrica!"; "Remove the tiny moon from Build as well. I think the rooms should follow
   whatever direction looks best and works for the app"; "The Bring your model and Take the guide tour button are too wide and long
   for no reason. I want the original look and animation preserved"; "Remove the 'Read the short Guide' from the card on the Home
   page, it looks neater without it"; "I want the orbs to actually feel like 3D buttons like Ingenium's logo instead of their current
   weird animations. I want full parity with the rest of the app. I also don't want Ingenium's Engine to look flat either"; "I want
   you to match the orbs page buttons colours to Ingenium's colours in day mode ... the current colours look best on Dark mode"; and
   "The orbs have a weird glow and a weird animation, it does not match Ingenium's engine logo and its 3d animated popped out effect.
   I want the orbs to have that same effect and look and lose that weird flashing effect."
   Home's own parts are moved in whole, so each keeps what it does. The seal key (R175, drawn in R104's layers) stands at the centre,
   larger, its layers standing further apart and its rim given a little thickness; its star turns counterclockwise without stopping
   (slower in Calm, still in Minimal motion and under the system's reduced motion), and every press still plays its flourishes.
   The six room keys ride one orbit counterclockwise with the engine. The orbit is a true 3D scene that the browser turns by itself
   (CSS animations, no script redrawing it), so nearer rooms are larger by perspective and Home stays light: left alone, nothing on
   it is rewritten (her rule of 7 November: "everything feels really freaking slow when I move my mouse around"). Each room is an
   orb made the way the seal is made: drawn twice its size in layers that stand at their own depths (the ball, and the room's mark
   standing above it with the seal's own shadows) over the seal's soft cast; at rest it sways as the seal sways; under a mouse it
   tilts to follow it and lifts; pressed, it sinks; it keeps its sound (R176), its words, its status and its place in the tour. No
   glare, no glowing edge. By day the orbs wear Ingenium's day violets (her keys' and her purple button's), by night each room its
   own purple. Pointing at a room, or reaching it with the Tab key, stops the orbit and brings that room near with what it holds;
   the tour stops it too. The greeting and the rooms' names are in Ingenium's own Cormorant (Lector's, so it looks the same
   offline). The next-step card keeps its keys at their own width with their own lift and press, without "Read the short guide".
   Where Home is narrower than 760 pixels (a phone), from 6.71 the same orrery stacks: the greeting, the rooms round the seal, the next
   step; below 260 pixels Home keeps its former head and grid of rooms (an iPhone set to Larger Text in Display Zoom is 320 pixels wide,
   its Home 290). On a phone the orbit tilts 44 degrees and the seal at the centre is 58 to 72 pixels: measured over a whole turn at
   290 and 360 pixels, no room's name passes under the seal (at 58 degrees and 80 pixels, Fabrica's name went 13 pixels under it). */
#page-home #hx.ox-on .hx-head{display:block;position:relative;height:var(--ox-h,700px);padding:0;gap:0;border:0;border-radius:30px;overflow:hidden;isolation:isolate;
  -webkit-user-select:none;user-select:none;
  background:radial-gradient(ellipse 70% 60% at 50% 64%,#fdfbff 0%,#f4eefb 46%,#e8def5 100%);
  box-shadow:inset 0 0 0 1px rgba(106,63,181,.10),0 1px 1px rgba(40,22,68,.04),0 4px 6px rgba(40,22,68,.04),0 14px 28px rgba(40,22,68,.07),0 34px 60px rgba(40,22,68,.08);
  --ox-line:rgba(106,63,181,.30);--ox-line2:rgba(106,63,181,.20);--ox-chart:rgba(106,63,181,.20);--ox-star:#8c6ad0;--ox-starop:.35;--ox-disc:rgba(106,63,181,.16);
  --ox-shade:rgba(40,22,68,.30);--ox-card:rgba(255,255,255,.72);--ox-cardring:rgba(106,63,181,.12);--ox-cardsh:0 2px 4px rgba(40,22,68,.05),0 12px 30px rgba(40,22,68,.12);
  --ox-rim0:#ddd2ef;--ox-rim1:#a891d4;--ox-kdsh:0 10px 26px rgba(40,22,68,.16)}
body[data-theme="night"] #page-home #hx.ox-on .hx-head{background:radial-gradient(ellipse 70% 60% at 50% 64%,#241a38 0%,#161024 50%,#0c0915 100%);
  box-shadow:inset 0 0 0 1px rgba(205,184,240,.10),0 14px 28px rgba(0,0,0,.45),0 34px 60px rgba(0,0,0,.4);
  --ox-line:rgba(196,176,238,.30);--ox-line2:rgba(196,176,238,.18);--ox-chart:rgba(196,176,238,.16);--ox-star:#f3e7c8;--ox-starop:.6;--ox-disc:rgba(150,112,224,.18);
  --ox-shade:rgba(0,0,0,.62);--ox-card:rgba(33,26,45,.7);--ox-cardring:rgba(205,184,240,.14);--ox-cardsh:0 12px 30px rgba(0,0,0,.5);
  --ox-rim0:#43375e;--ox-rim1:#1d1729;--ox-kdsh:0 10px 26px rgba(0,0,0,.5)}
#page-home #hx.ox-on .hx-head::before,#page-home #hx.ox-on .hx-head::after{display:none}
#hx:not(.ox-on) .ox-deco,#hx:not(.ox-on) .ox-scene,#hx:not(.ox-on) .ox-shadow{display:none}
/* the sky, the rings and the words under them */
#page-home #hx.ox-on .ox-stars{position:absolute;inset:0;z-index:0;pointer-events:none}
#page-home #hx.ox-on .ox-stars i{position:absolute;width:2px;height:2px;border-radius:50%;background:var(--ox-star);opacity:var(--ox-starop);animation:oxTw 5s ease-in-out infinite}
@keyframes oxTw{0%,100%{opacity:.15}50%{opacity:.7}}
#page-home #hx.ox-on .ox-chart{position:absolute;inset:0;width:100%;height:100%;z-index:0;pointer-events:none}
#page-home #hx.ox-on .ox-chart g{fill:none;stroke:var(--ox-chart);stroke-width:.6}
#page-home #hx.ox-on .ox-stage{position:absolute;inset:0;z-index:2;pointer-events:none;perspective:2600px;perspective-origin:50% var(--ox-cy,61%)}
#page-home #hx.ox-on .ox-plane{position:absolute;left:50%;top:var(--ox-cy,61%);width:1000px;height:1000px;margin:-500px 0 0 -500px;transform:rotateX(70deg) scale(var(--ox-k,1))}
#page-home #hx.ox-on .ox-plane svg{display:block;width:100%;height:100%;overflow:visible}
#page-home #hx.ox-on .ox-ring{fill:none;stroke:var(--ox-line);stroke-width:1.3;vector-effect:non-scaling-stroke}
#page-home #hx.ox-on .ox-ring.r2{stroke:var(--ox-line2);stroke-dasharray:5 7}
#page-home #hx.ox-on .ox-ring.r3{stroke:var(--ox-line2)}
#page-home #hx.ox-on .ox-disc-a{stop-color:var(--ox-disc)}
#page-home #hx.ox-on .ox-disc-b{stop-color:var(--ox-disc);stop-opacity:0}
#page-home #hx.ox-on .ox-legend{position:absolute;left:40px;bottom:24px;z-index:5;font:italic 500 16px/1.4 "Home Cormorant","Cormorant Garamond",Cormorant,var(--x-serif);
  color:var(--x-ink3);pointer-events:none}
/* the greeting */
#page-home #hx.ox-on .hx-htext{position:absolute;left:40px;top:34px;z-index:5;width:auto;max-width:var(--ox-tw,520px)}
#page-home #hx.ox-on .hx-hello{margin:12px 0 10px;font:600 var(--ox-hs,48px)/1.04 "Home Cormorant","Cormorant Garamond",Cormorant,var(--x-serif);letter-spacing:.004em;color:var(--x-ink1)}
#page-home #hx.ox-on .hx-lede{margin:0;font-size:14.5px;line-height:1.55;max-width:44ch;color:var(--x-ink2)}
/* the next step: Home's own card on a clear plate, its keys as they are */
#page-home #hx.ox-on .hx-next{position:absolute;right:34px;top:34px;z-index:6;width:var(--ox-cw,500px);margin:0;padding:16px 18px;border:0;border-radius:20px;
  background:var(--ox-card);-webkit-backdrop-filter:blur(14px);backdrop-filter:blur(14px);box-shadow:inset 0 0 0 1px var(--ox-cardring),var(--ox-cardsh);
  animation:oxIn .9s cubic-bezier(.22,1,.36,1) .3s backwards}
@keyframes oxIn{0%{opacity:0;transform:translate(40px,-10px)}100%{opacity:1;transform:none}}
#page-home #hx.ox-on #hxGuide{display:none}
#page-home #hx.ox-on .hx-next > .hx-row.ox-empty{display:none}
/* the engine: her seal key, larger, in more depth, its star turning counterclockwise without stopping */
#page-home #hx.ox-on .hx-head .hx-seal{position:absolute;left:50%;top:var(--ox-cy,61%);z-index:40;width:var(--ox-sun,132px);height:var(--ox-sun,132px);margin:0;
  transform:translate(-50%,-62%)}
#page-home #hx.ox-on .hx-head .hx-seal::after{content:"";position:absolute;left:-12%;top:100%;z-index:-1;width:124%;height:22px;margin-top:12px;border-radius:50%;
  background:radial-gradient(closest-side,var(--ox-shade),rgba(0,0,0,0));opacity:.85;pointer-events:none}
#page-home #hx.ox-on #hxSeal .isl .isl-ring{--fz:.11;--fk:.9725}
#page-home #hx.ox-on #hxSeal .isl .isl-star{--fz:.2;--fk:.95}
#page-home #hx.ox-on #hxSeal .isl .isl-heart{--fz:.36;--fk:.91}
#page-home #hx.ox-on #hxSeal .isl .ox-rim{position:absolute;left:2.6%;top:2.6%;width:94.8%;height:94.8%;border-radius:50%;display:block;pointer-events:none;
  background:linear-gradient(160deg,var(--ox-rim0),var(--ox-rim1));transform:translateZ(calc(var(--S) * -.012 * var(--k)))}
@keyframes oxEngine{from{transform:rotate(0deg)}to{transform:rotate(-360deg)}}
#page-home #hx.ox-on #hxSeal .seal-spin{animation:oxEngine 9s linear infinite}
body[data-motion="calm"] #page-home #hx.ox-on #hxSeal .seal-spin{animation-duration:13s}
body[data-motion="minimal"] #page-home #hx.ox-on #hxSeal .seal-spin{animation:none}
@media (prefers-reduced-motion:reduce){#page-home #hx.ox-on #hxSeal .seal-spin{animation:none}}
/* the orbit: a 3D scene the browser turns by itself. The keys' box holds a tilted world; a turning frame in it carries one arm
   per room; at the end of each arm the room stands up to face her, so nearer rooms are larger by perspective */
#page-home #hx.ox-on .hx-head .hx-keys{position:absolute;inset:0;z-index:10;display:block;margin:0;padding:0;gap:0;pointer-events:none;
  perspective:2600px;perspective-origin:50% var(--ox-cy,61%)}
#page-home #hx.ox-on .hx-head.ox-hold .hx-keys{z-index:45}
#page-home #hx.ox-on .ox-world{position:absolute;left:50%;top:var(--ox-cy,61%);width:0;height:0;transform-style:preserve-3d;transform:rotateX(70deg)}
#page-home #hx.ox-on .ox-spin,#page-home #hx.ox-on .ox-arm,#page-home #hx.ox-on .ox-unarm,#page-home #hx.ox-on .ox-counter,#page-home #hx.ox-on .ox-stand{
  position:absolute;left:0;top:0;width:0;height:0;transform-style:preserve-3d}
#page-home #hx.ox-on .ox-spin{animation:oxOrbit var(--ox-t,105s) linear infinite}
#page-home #hx.ox-on .ox-arm{transform:rotateZ(var(--a,0deg)) translateX(var(--ox-r,430px))}
#page-home #hx.ox-on .ox-unarm{transform:rotateZ(calc(-1 * var(--a,0deg)))}
#page-home #hx.ox-on .ox-counter{animation:oxCounter var(--ox-t,105s) linear infinite}
#page-home #hx.ox-on .ox-stand{transform:rotateX(-70deg)}
@keyframes oxOrbit{from{transform:rotateZ(0deg)}to{transform:rotateZ(-360deg)}}
@keyframes oxCounter{from{transform:rotateZ(0deg)}to{transform:rotateZ(360deg)}}
body[data-motion="full"] #page-home #hx.ox-on .hx-keys{--ox-t:74s}
#page-home #hx.ox-on .hx-head.ox-hold .ox-spin,#page-home #hx.ox-on .hx-head.ox-hold .ox-counter,
body.touring #page-home #hx.ox-on .ox-spin,body.touring #page-home #hx.ox-on .ox-counter{animation-play-state:paused}
body[data-motion="minimal"] #page-home #hx.ox-on .ox-spin,body[data-motion="minimal"] #page-home #hx.ox-on .ox-counter{animation:none}
@media (prefers-reduced-motion:reduce){#page-home #hx.ox-on .ox-spin,#page-home #hx.ox-on .ox-counter{animation:none}}
#page-home #hx.ox-on .ox-stand .ox-shadow{position:absolute;left:-42px;top:-10px;width:84px;height:20px;border-radius:50%;pointer-events:none;
  background:radial-gradient(closest-side,var(--ox-shade),rgba(0,0,0,0));transform:scale(.9);opacity:.85}
/* the rooms: Home's own keys, each standing at the end of its arm */
#page-home #hx.ox-on .hx-head .hx-key{position:absolute;left:0;top:0;width:150px;min-height:0;margin:0;padding:0;gap:0;display:flex;flex-direction:column;
  align-items:center;border:0;border-radius:0;background:none;box-shadow:none;text-align:center;overflow:visible;animation:none;
  transform-origin:75px 56px;transform:translate(-75px,calc(-56px - var(--ox-lift,18px))) scale(.9);
  transition:transform .35s cubic-bezier(.2,.8,.2,1),opacity .35s ease,filter .35s ease;pointer-events:auto;cursor:pointer;color:inherit;-webkit-tap-highlight-color:transparent}
#page-home #hx.ox-on .hx-head .hx-key.ox-near{transform:translate(-75px,calc(-56px - var(--ox-lift,18px))) scale(1)}
#page-home #hx.ox-on .hx-head .hx-key:focus{outline:none}
#page-home #hx.ox-on .hx-head .hx-key:focus-visible .hx-jewel::after{content:"";position:absolute;inset:16px;border-radius:50%;box-shadow:0 0 0 2.5px var(--x-acc);pointer-events:none}
#page-home #hx.ox-on .hx-head .hx-jewel{position:relative;display:block;width:112px;height:112px;flex:0 0 auto;border-radius:0;background:none;box-shadow:none;transform:none;
  transition:none;color:#fff}
#page-home #hx.ox-on .hx-head .hx-kt{display:contents}
#page-home #hx.ox-on .hx-head .hx-kh{margin-top:-12px;font:600 21px/1.1 "Home Cormorant","Cormorant Garamond",Cormorant,var(--x-serif);letter-spacing:.03em;color:var(--x-ink1)}
#page-home #hx.ox-on .hx-head .hx-km{margin-top:5px;font-size:11.5px;max-width:none;overflow:visible}
#page-home #hx.ox-on .hx-head .hx-kd{position:absolute;left:50%;top:100%;width:230px;margin:10px 0 0 -115px;padding:10px 12px;border-radius:14px;background:var(--x-hi);
  color:var(--x-ink2);box-shadow:inset 0 0 0 1px var(--x-hair),var(--ox-kdsh);font-size:12.5px;line-height:1.45;text-align:center;opacity:0;transform:translateY(-6px);
  transition:opacity .25s ease,transform .3s cubic-bezier(.22,1,.36,1);pointer-events:none}
#page-home #hx.ox-on .hx-head .hx-key.ox-near .hx-kd{opacity:1;transform:none}
#page-home #hx.ox-on .hx-head .hx-key.ox-up .hx-kd{top:auto;bottom:100%;margin:0 0 8px -115px;transform:translateY(6px)}
#page-home #hx.ox-on .hx-head .hx-key.ox-up.ox-near .hx-kd{transform:none}
#page-home #hx.ox-on .hx-head .hx-arrow{display:none}
#page-home #hx.ox-on .hx-head.ox-hold .hx-key:not(.ox-near){opacity:.6}
body[data-theme="night"] #page-home #hx.ox-on .hx-head.ox-hold .hx-key:not(.ox-near){opacity:.55;filter:saturate(.7)}
#page-home #hx.ox-on .hx-work{display:none}
/* each orb made as the seal is made (R104): drawn twice its size, in layers standing at their own depths, over the seal's soft cast */
#hx:not(.ox-on) .oxo,#hx:not(.ox-on) .oxo-tilt,#hx:not(.ox-on) .oxo-idle,#hx:not(.ox-on) .oxo-mark,#hx:not(.ox-on) .oxo-ico{display:contents}
#hx:not(.ox-on) .oxo-cast,#hx:not(.ox-on) .oxo-ball{display:none}
#page-home #hx.ox-on .oxo{position:absolute;inset:0;display:block;--S:112px;--rx:0deg;--ry:0deg;--cdl:0px;--cds:1;perspective:calc(var(--S) * 4);pointer-events:none;
  --c0:#c9b6ee;--c1:#9068d6;--c2:#6a3fb5;--c3:#55309a;--c4:#3d2275;--csh:#2a1260;--ct1:.2;--ct2:.4;--ce1:.1;--ce2:.26}
/* by night each room keeps its own purple, as she liked it ("the current colours look best on Dark mode") */
body[data-theme="night"] #page-home #hx.ox-on .oxo{--c0:var(--n0);--c1:var(--n1);--c2:var(--n2);--c3:var(--n3);--c4:var(--n4);--csh:#0b0220;--ct1:.32;--ct2:.6;--ce1:.2;--ce2:.42}
#page-home #hx.ox-on .oxo-tilt{position:absolute;inset:0;display:block;transform-style:preserve-3d;
  transform:rotateX(var(--rx)) rotateY(var(--ry)) translateY(var(--cdl)) scale(var(--cds));transition:transform .35s cubic-bezier(.2,.8,.2,1)}
#page-home #hx.ox-on .oxo-idle{position:absolute;inset:0;display:block;transform-style:preserve-3d;animation:oxSway 7s ease-in-out infinite;animation-delay:var(--od,0s)}
@keyframes oxSway{0%,100%{transform:rotateY(-18deg) rotateX(5deg)}50%{transform:rotateY(18deg) rotateX(-5deg)}}
#page-home #hx.ox-on .oxo-cast{position:absolute;left:31%;right:31%;bottom:13%;height:8%;border-radius:50%;display:block;background:rgba(42,20,80,.14);
  filter:blur(calc(var(--S) * .045));transform:translateZ(calc(var(--S) * -.12));transition:opacity .35s ease,transform .35s ease}
body[data-theme="night"] #page-home #hx.ox-on .oxo-cast{background:rgba(0,0,0,.36)}
#page-home #hx.ox-on .oxo-ball,#page-home #hx.ox-on .oxo-mark{position:absolute;left:0;top:0;width:200%;height:200%;display:block;transform-origin:0 0;pointer-events:none;
  transform:translate(calc(var(--S) * .5),calc(var(--S) * .5)) translateZ(calc(var(--S) * var(--fz))) scale(var(--fk)) translate(calc(var(--S) * -.5),calc(var(--S) * -.5)) scale(.5)}
#page-home #hx.ox-on .oxo-ball{--fz:0;--fk:1}
#page-home #hx.ox-on .oxo-mark{--fz:.14;--fk:.965}
#page-home #hx.ox-on .hx-head .oxo-ball > svg{display:block;width:100%;height:100%;overflow:visible;
  filter:drop-shadow(calc(var(--S) * .004) calc(var(--S) * .012) calc(var(--S) * .006) rgba(42,20,80,.24)) drop-shadow(calc(var(--S) * .01) calc(var(--S) * .03) calc(var(--S) * .025) rgba(42,20,80,.12))}
body[data-theme="night"] #page-home #hx.ox-on .hx-head .oxo-ball > svg{
  filter:drop-shadow(calc(var(--S) * .004) calc(var(--S) * .012) calc(var(--S) * .008) rgba(0,0,0,.5)) drop-shadow(calc(var(--S) * .01) calc(var(--S) * .03) calc(var(--S) * .03) rgba(0,0,0,.3))}
#page-home #hx.ox-on .oxo-ico{position:absolute;left:50%;top:50%;width:60px;height:60px;margin:-30px 0 0 -30px;display:block;color:#fff;
  filter:drop-shadow(calc(var(--S) * .016) calc(var(--S) * .05) calc(var(--S) * .04) rgba(42,20,80,.3))}
body[data-theme="night"] #page-home #hx.ox-on .oxo-ico{filter:drop-shadow(calc(var(--S) * .016) calc(var(--S) * .045) calc(var(--S) * .045) rgba(0,0,0,.5))}
#page-home #hx.ox-on .hx-head .oxo-ico svg{display:block;width:60px;height:60px;stroke-width:1.9}
#page-home #hx.ox-on .oxo.hover{--cdl:calc(var(--S) * -.025)}
#page-home #hx.ox-on .oxo.hover .oxo-idle{animation-play-state:paused}
#page-home #hx.ox-on .oxo.hover .oxo-cast{opacity:.75;transform:translateZ(calc(var(--S) * -.12)) scale(.92)}
#page-home #hx.ox-on .oxo.down{--cdl:calc(var(--S) * .05);--cds:.96}
#page-home #hx.ox-on .oxo.down .oxo-tilt{transition-duration:.08s}
#page-home #hx.ox-on .oxo.down .oxo-cast{opacity:1;transform:translateZ(calc(var(--S) * -.12)) scale(1.04)}
body[data-motion="minimal"] #page-home #hx.ox-on .oxo-idle,body[data-motion="minimal"] #page-home #hx.ox-on .ox-stars i,
body[data-motion="minimal"] #page-home #hx.ox-on .hx-next{animation:none}
body[data-motion="minimal"] #page-home #hx.ox-on .oxo-tilt{transform:none}
@media (prefers-reduced-motion:reduce){#page-home #hx.ox-on .oxo-idle,#page-home #hx.ox-on .ox-stars i,#page-home #hx.ox-on .hx-next{animation:none}
  #page-home #hx.ox-on .oxo-tilt{transition:none}}
@media (forced-colors:active){#page-home #hx.ox-on .hx-head{border:1px solid CanvasText}}
/* ---------- 6.93: the orbs and the engine as one family (her words, 12 November 2026: "I also want the orbs from the Home page to be
   refined and have the whole graphics of the orbs pages and the engine logo button be better matched design and animation-wise ... I want
   the visuals to look more refined and cohesive, please do not change the design, I really like it"; approved on its preview the same
   day). Nothing of the design moves: the same planets in the same purples, the same marks, the same orbit, the same turning (6.72's r264
   still parts each ball into its body, its turning surface and its light, so the ball keeps its six parts). Each orb takes its finish
   from the seal (R104, its own drawing):
   - the seal's polished rim, a hairline round each ball in the seal's rim colours, lit above on the left as the seal's is;
   - the seal's light: the highlight drawn as the seal's face is lit, a crisp core in a broad soft sheen, and under a mouse it follows the
     pointer a little, as the seal's sheen does; the surface fades a little towards the ball's edge, as it turns away from the eye;
   - the seal's pearl: each mark white at its top and the seal's pearl at its foot;
   - the seal's tilt under a mouse (26 and 22 degrees). Minimal motion and the system's reduced motion still the sheen. ---------- */
#page-home #hx.ox-on .oxo{--cr0:#efe8fb;--cr1:#a891d4;--cr2:#55309a;--crop:.95}
body[data-theme="night"] #page-home #hx.ox-on .oxo{--cr0:#e2d5fa;--cr1:#9a7ad8;--cr2:#472b7f;--crop:.7}
#page-home #hx.ox-on .hx-head .oxo-ico svg,#page-home #hx.ox-on .hx-head .oxo-ico svg [stroke="currentColor"]{stroke:url(#oxPearl)}
#page-home #hx.ox-on .hx-head .oxo-ico svg [fill="currentColor"]{fill:url(#oxPearl)}
body[data-theme="night"] #page-home #hx.ox-on .hx-head .oxo-ico svg,body[data-theme="night"] #page-home #hx.ox-on .hx-head .oxo-ico svg [stroke="currentColor"]{stroke:url(#oxPearlN)}
body[data-theme="night"] #page-home #hx.ox-on .hx-head .oxo-ico svg [fill="currentColor"]{fill:url(#oxPearlN)}
#page-home #hx.ox-on .oxo-ball .oxs-sheen{transform:translate(var(--hx,0px),var(--hy,0px));transition:transform .35s cubic-bezier(.2,.8,.2,1)}
@media (prefers-reduced-motion:reduce){#page-home #hx.ox-on .oxo-ball .oxs-sheen{transition:none}}
/* ---------- 6.71: on a phone, narrower than 760 pixels (her words, 10 November 2026: "The Iphone app does not have the new pages designs, I want them visible on the new Ios apps, I hate that they still have the old design and not the new one, I want that fixed now please"): the same orrery,
   stacked: the greeting, then the rooms turning round the seal at a phone's size on a gentler tilt, then the next step; each part placed
   where the heights above it say (layout) ---------- */
#page-home #hx.ox-on.ox-narrow .hx-head{border-radius:24px}
#page-home #hx.ox-on.ox-narrow .hx-htext{left:20px;right:20px;top:22px;max-width:none}
#page-home #hx.ox-on.ox-narrow .hx-lede{font-size:14px;max-width:none}
#page-home #hx.ox-on.ox-narrow .hx-next{left:14px;right:14px;top:var(--ox-ct,640px);width:auto;animation:oxUp .9s cubic-bezier(.22,1,.36,1) .3s backwards}
@keyframes oxUp{0%{opacity:0;transform:translateY(24px)}100%{opacity:1;transform:none}}
#page-home #hx.ox-on.ox-narrow .ox-legend{left:20px;right:20px;bottom:18px;font-size:14.5px}
#page-home #hx.ox-on.ox-narrow .ox-plane{transform:rotateX(44deg) scale(var(--ox-k,1))}
#page-home #hx.ox-on.ox-narrow .ox-world{transform:rotateX(44deg)}
#page-home #hx.ox-on.ox-narrow .ox-stand{transform:rotateX(-44deg)}
#page-home #hx.ox-on.ox-narrow .ox-stand .ox-shadow{left:-30px;top:-7px;width:60px;height:14px}
#page-home #hx.ox-on.ox-narrow .hx-head .hx-key{width:112px;transform-origin:56px 38px;transform:translate(-56px,calc(-38px - var(--ox-lift,12px))) scale(.92)}
#page-home #hx.ox-on.ox-narrow .hx-head .hx-key.ox-near{transform:translate(-56px,calc(-38px - var(--ox-lift,12px))) scale(1)}
#page-home #hx.ox-on.ox-narrow .hx-head .hx-jewel{width:76px;height:76px}
#page-home #hx.ox-on.ox-narrow .oxo{--S:76px}
#page-home #hx.ox-on.ox-narrow .hx-head .hx-kh{margin-top:-8px;font-size:16px}
#page-home #hx.ox-on.ox-narrow .hx-head .hx-km{display:none}
#page-home #hx.ox-on.ox-narrow .hx-head .hx-kd{width:180px;margin-left:-90px;font-size:12px}
#page-home #hx.ox-on.ox-narrow .hx-head .hx-key.ox-up .hx-kd{margin-left:-90px}
/* 6.72: the next step's keys keep the width of their words on a phone too, one under the other, as they keep it on a computer (her words,
   10 November 2026: "I don't want the "Bring in your first model" and "Take the guided tour" buttons to be this wide and long for no
   reason, please fix that from the iphone app"; and of the computer, 10 November: "too wide and long for no reason"). Home's own rule
   (R147, a card narrower than 330 pixels) lays them in one column as wide as the card, and each key filled it. */
#page-home #hx.ox-on .hx-next .hx-row-top{justify-items:start}
#page-home #hx.ox-on .hx-next .hx-row-top .hx-btn{justify-self:start;width:auto;max-width:100%}
/* 6.90: her words (12 November 2026): "Sometimes the Bring in your model and take the guided tour buttons from the Home page revert back to
   a wider and chunkier look instead of their new designs". Measured on 6.89: the keys keep one size at every width and at first paint;
   what changes them is the next step's words, written by the base page (renderNextStep) as the step moves on: "Bring in your first
   model" is 185 pixels wide, "Load Qwen3.5 2B into the engine" 241, "One-time setup: add the engine files" wider still, and a long model
   name more (the name came inside the key). The tour key also stood 2 pixels taller than the next step (36 against 34). Now the key's
   words stay as short as the first step's (the model's name moves into the line above it, the full words kept for a screen reader
   and under the pointer), and the two keys are one height, 34 pixels. */
#page-home .hx-next .hx-row-top{align-items:center}
#page-home .hx-next .hx-row-top .hx-btn{min-height:34px;line-height:18px;padding-top:7px;padding-bottom:7px;align-self:center}
</style>
<script>try{(window.__ingParts=window.__ingParts||{})["p261"]="started";}catch(_){}
/* R261 · Home as an orrery: see the note at the top of its styles */
/* 6.90: the next step's key keeps short words (see the note above its last rules) */
(function shortNext(){var W=window;if(typeof W.renderNextStep!=="function"||W.renderNextStep.__short)return;var orig=W.renderNextStep;
  var f=function(){var r=orig.apply(this,arguments);try{var b=document.getElementById("heroNext"),note=document.getElementById("heroStepNote");if(!b||!note)return r;
      var t=String(b.textContent||"").trim(),m,key=null,lead="";
      if((m=/^Load (.+) into the engine$/.exec(t))){key="Load your model";lead=m[1]+": ";}
      else if((m=/^Talk to (.+)$/.exec(t))){key="Start a chat";lead=m[1]+" is running. ";}
      else if(/^One-time setup: add the engine files$/.test(t)){key="Add the engine files";lead="One-time setup. ";}
      if(key){b.textContent=key;b.setAttribute("aria-label",t);b.title=t;var n=String(note.textContent||""),sm=/^(Step \d of \d) · (.*)$/.exec(n);
        note.textContent=sm?sm[1]+" · "+lead+sm[2].charAt(0).toUpperCase()+sm[2].slice(1):lead+n;}
      else{b.removeAttribute("aria-label");b.removeAttribute("title");}}catch(e){}return r;};
  f.__short=true;W.renderNextStep=f;try{f();}catch(e){}})();
(function(){"use strict";
if(window.__r261)return;window.__r261=1;
var D=document,W=window,SVG="http://www.w3.org/2000/svg";
function $(id){return D.getElementById(id);}
function motion(){var m="calm";try{m=D.body.getAttribute("data-motion")||"calm";}catch(e){}
  try{if(W.matchMedia&&matchMedia("(prefers-reduced-motion: reduce)").matches)m="minimal";}catch(e){}return m;}
function still(){return motion()==="minimal";}

/* Ingenium's own Cormorant Garamond (Lector's, R108), upright, for the greeting and the rooms' names, so they look the same offline */
(function(){try{var u=(typeof LX7_FONTS!=="undefined"&&LX7_FONTS&&LX7_FONTS["cormorant-600-normal"])||"";if(!u||$("r261-font"))return;
  var st=D.createElement("style");st.id="r261-font";
  st.textContent='@font-face{font-family:"Home Cormorant";font-style:normal;font-weight:600;font-display:swap;src:url('+u+') format("woff2")}';D.head.appendChild(st);}catch(e){}})();

/* ---------- the orbs: each room a little planet, lit from above on the left; by night in its own purple ---------- */
var LOOK={chat:[["#a57fe8","#6a3fb5","#2e1764"],"bands"],code:[["#9283f2","#4d3db0","#1e1660"],"storm"],build:[["#c48ae8","#8641b8","#3e1760"],"faint"],
  fabrica:[["#b47ad9","#7637a8","#331455"],"dapple"],lector:[["#b9a3f2","#7458c6","#33206c"],"swirl"],focus:[["#9a6be0","#5c31a4","#250f4b"],"aurora"]};
function hex(c){c=c.replace("#","");return [parseInt(c.slice(0,2),16),parseInt(c.slice(2,4),16),parseInt(c.slice(4,6),16)];}
function mix(a,b,t){var A=hex(a),B=hex(b);return "#"+A.map(function(v,i){var n=Math.round(v+(B[i]-v)*t);return (n<16?"0":"")+n.toString(16);}).join("");}
function wave(y,c,o,w,d){return '<path d="M20 '+y+' q20 '+(d||-2.6)+' 40 0 t40 0" fill="none" stroke="'+c+'" stroke-opacity="'+o+'" stroke-width="'+w+'"/>';}
function surface(k){
  if(k==="bands")return wave(33,"#fff",.13,3.4)+wave(44,"#1a0840",.15,4.4)+wave(56,"#fff",.10,3)+wave(68,"#1a0840",.13,5)+wave(80,"#fff",.12,3.6)+wave(90,"#1a0840",.12,3);
  if(k==="storm")return wave(48,"#fff",.12,3,-5)+wave(79,"#1a0840",.16,4,5)+'<ellipse cx="72" cy="66" rx="10" ry="5.4" fill="#fff" opacity=".24"/><ellipse cx="72" cy="66" rx="4.8" ry="2.4" fill="#1a0840" opacity=".28"/>';
  if(k==="swirl")return '<path d="M16 44 c18 -14 34 10 56 -4 s22 4 28 2" fill="none" stroke="#fff" stroke-opacity=".17" stroke-width="4" stroke-linecap="round"/>'+
    '<path d="M20 72 c20 14 36 -12 58 4 s16 2 22 0" fill="none" stroke="#fff" stroke-opacity=".11" stroke-width="5" stroke-linecap="round"/>';
  if(k==="aurora")return '<ellipse cx="60" cy="27" rx="22" ry="7.5" fill="#efe3ff" opacity=".24"/><ellipse cx="60" cy="27" rx="12" ry="3.8" fill="#fff" opacity=".24"/>'+wave(38,"#e6d6ff",.14,3,4);
  if(k==="dapple")return '<circle cx="38" cy="44" r="6" fill="#fff" opacity=".08"/><circle cx="70" cy="62" r="8" fill="#1a0840" opacity=".12"/>'+
    '<circle cx="50" cy="80" r="5" fill="#fff" opacity=".07"/><circle cx="86" cy="36" r="4" fill="#1a0840" opacity=".10"/>';
  if(k==="faint")return wave(52,"#fff",.09,5,-3)+wave(74,"#1a0840",.12,4,3);
  return "";}
/* the ball: its body, its surface, the side away from the light, its edge, and one soft highlight (no glow, no glare). From 6.93 the
   surface fades a little towards the edge (its clip holds the fade, so the surface still turns under it, r264), the edge wears the seal's
   polished rim (a hairline in the seal's rim colours, lit above on the left as the seal's is), and the highlight is lit as the seal's
   face is: a crisp core in a broad soft sheen. Still six parts: defs, body, surface, shade, edge, highlight */
var NS=0;
function sphere(look){var id="oxs"+(++NS),R=' transform="rotate(44 60 60)"',c=function(n,o){return ' style="stop-color:var(--'+n+')'+(o?';stop-opacity:var(--'+o+')':'')+'"';};
  return '<svg viewBox="0 0 120 120" aria-hidden="true" focusable="false"><defs>'+
    '<radialGradient id="'+id+'b" cx=".36" cy=".5" r=".74" fx=".2" fy=".5"><stop offset="0"'+c('c0')+'/><stop offset=".16"'+c('c1')+'/><stop offset=".52"'+c('c2')+'/><stop offset=".86"'+c('c3')+'/><stop offset="1"'+c('c4')+'/></radialGradient>'+
    '<linearGradient id="'+id+'t" x1="0" y1="0" x2="1" y2="0"><stop offset=".4" stop-opacity="0"'+c('csh')+'/><stop offset=".76"'+c('csh','ct1')+'/><stop offset="1"'+c('csh','ct2')+'/></linearGradient>'+
    '<radialGradient id="'+id+'e" cx=".5" cy=".5" r=".5"><stop offset=".7" stop-opacity="0"'+c('csh')+'/><stop offset=".93"'+c('csh','ce1')+'/><stop offset="1"'+c('csh','ce2')+'/></radialGradient>'+
    '<radialGradient id="'+id+'s" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#fff" stop-opacity=".85"/><stop offset=".4" stop-color="#fff" stop-opacity=".32"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient>'+
    '<radialGradient id="'+id+'h" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#fff" stop-opacity=".95"/><stop offset=".45" stop-color="#fff" stop-opacity=".5"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient>'+
    '<radialGradient id="'+id+'m" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#fff"/><stop offset=".72" stop-color="#fff"/><stop offset="1" stop-color="#555"/></radialGradient>'+
    '<mask id="'+id+'f" maskUnits="userSpaceOnUse" x="18" y="18" width="84" height="84"><circle cx="60" cy="60" r="40" fill="url(#'+id+'m)"/></mask>'+
    '<linearGradient id="'+id+'r" x1="0" y1="0" x2="1" y2="1"><stop offset="0"'+c('cr0')+'/><stop offset=".5"'+c('cr1')+'/><stop offset="1"'+c('cr2')+'/></linearGradient>'+
    '<clipPath id="'+id+'c"><circle cx="60" cy="60" r="40"/></clipPath></defs>'+
    '<g'+R+'><circle cx="60" cy="60" r="40" fill="url(#'+id+'b)"/></g>'+
    '<g clip-path="url(#'+id+'c)" mask="url(#'+id+'f)">'+surface(look[1])+'</g>'+
    '<g'+R+'><g clip-path="url(#'+id+'c)"><rect x="18" y="18" width="84" height="84" fill="url(#'+id+'t)"/></g></g>'+
    '<g><circle cx="60" cy="60" r="40" fill="url(#'+id+'e)"/><circle cx="60" cy="60" r="39.55" fill="none" stroke="url(#'+id+'r)" stroke-width=".9" style="stroke-opacity:var(--crop,.85)"/></g>'+
    '<g class="oxs-sheen"><g'+R+'><ellipse cx="43" cy="60" rx="15" ry="22" fill="url(#'+id+'s)" opacity=".42"/><ellipse cx="40.6" cy="60" rx="6.4" ry="10.4" fill="url(#'+id+'h)"/></g></g></svg>';}
/* the seal's pearl for the marks (6.93): white into the seal's own pearl (R104's sdPearl), drawn once for the page */
function pearlDefs(){if($("oxPearlDefs"))return;var d=D.createElement("div");d.id="oxPearlDefs";d.setAttribute("aria-hidden","true");
  d.style.cssText="position:absolute;width:0;height:0;overflow:hidden;pointer-events:none";
  var g=function(id,pl){return '<linearGradient id="'+id+'" gradientUnits="userSpaceOnUse" x1="3" y1="3" x2="21" y2="21"><stop offset="0" stop-color="#ffffff"/><stop offset=".42" stop-color="#ffffff"/><stop offset="1" stop-color="'+pl+'"/></linearGradient>';};
  d.innerHTML='<svg width="0" height="0" focusable="false"><defs>'+g("oxPearl","#dccff4")+g("oxPearlN","#e4d9f8")+'</defs></svg>';(D.body||D.documentElement).appendChild(d);}

/* each orb answers the pointer as the seal does (R104, R175): it tilts to follow a mouse and lifts under it; pressed, it sinks */
var on=false;
function wireOrb(k,o){
  k.addEventListener("pointerenter",function(e){if(on&&e.pointerType==="mouse"&&!still())o.classList.add("hover");});
  k.addEventListener("pointermove",function(e){if(!on||e.pointerType!=="mouse"||still())return;var r=o.getBoundingClientRect();if(!r.width)return;
    var x=Math.max(-.25,Math.min(1.25,(e.clientX-r.left)/r.width)),y=Math.max(-.25,Math.min(1.25,(e.clientY-r.top)/r.height));
    o.style.setProperty("--ry",((x-.5)*26).toFixed(1)+"deg");o.style.setProperty("--rx",(-(y-.5)*22).toFixed(1)+"deg");
    o.style.setProperty("--hx",((x-.5)*7).toFixed(2)+"px");o.style.setProperty("--hy",((y-.5)*7).toFixed(2)+"px");},{passive:true});
  k.addEventListener("pointerleave",function(){o.classList.remove("hover","down");o.style.setProperty("--rx","0deg");o.style.setProperty("--ry","0deg");o.style.setProperty("--hx","0px");o.style.setProperty("--hy","0px");});
  k.addEventListener("pointerdown",function(){if(on&&!still())o.classList.add("down");},{passive:true});
  ["pointerup","pointercancel"].forEach(function(t){k.addEventListener(t,function(e){o.classList.remove("down");if(e.pointerType!=="mouse")o.classList.remove("hover");},{passive:true});});
  k.addEventListener("keydown",function(e){if(!on||still())return;if(e.key==="Enter"||e.key===" "){o.classList.add("down");setTimeout(function(){o.classList.remove("down");},140);}});
  k.addEventListener("blur",function(){o.classList.remove("hover","down");});}
function dress(k,i){var o=k.querySelector(".oxo");if(o)return o;var j=k.querySelector(".hx-jewel");if(!j)return null;try{pearlDefs();}catch(e){}
  var look=LOOK[k.getAttribute("data-go")||""]||LOOK.chat,ico=j.querySelector("svg"),T=look[0];
  o=D.createElement("span");o.className="oxo";o.setAttribute("aria-hidden","true");o.style.setProperty("--od",(-i*1.17).toFixed(2)+"s");
  [mix(T[0],"#ffffff",.5),T[0],T[1],T[2],mix(T[2],"#000000",.42)].forEach(function(v,n){o.style.setProperty("--n"+n,v);});
  o.innerHTML='<span class="oxo-tilt"><span class="oxo-idle"><i class="oxo-cast"></i><span class="oxo-ball">'+sphere(look)+'</span><span class="oxo-mark"><span class="oxo-ico"></span></span></span></span>';
  if(ico)o.querySelector(".oxo-ico").appendChild(ico);
  j.appendChild(o);wireOrb(k,o);return o;}

/* ---------- the orbit ---------- */
var hx=null,head=null,box=null,work=null,stage=null,world=null,spin=null,keys=[],hold=null,R0=430,CY=.61,rowSeen=null;
function near(p,v){if(v){if(hold&&hold!==p)near(hold,false);hold=p;
    /* a room in the lower part of Home shows what it holds above it, so its words stay inside Home */
    try{var r=p.el.querySelector(".hx-jewel").getBoundingClientRect(),h=head.getBoundingClientRect();p.el.classList.toggle("ox-up",(r.top+r.height/2-h.top)>h.height*.6);}catch(e){}
    head.classList.add("ox-hold");p.el.classList.add("ox-near");}
  else{p.el.classList.remove("ox-near");if(hold===p){hold=null;head.classList.remove("ox-hold");}}}
/* the sky and the rings: the larger ring round the seal stays, in purple, with no circle hugging the seal */
function decorate(){if(head.querySelector(".ox-stars"))return;
  var s=D.createElement("div");s.className="ox-stars ox-deco";s.setAttribute("aria-hidden","true");
  for(var i=0;i<70;i++){var t=D.createElement("i");t.style.left=(Math.random()*100).toFixed(2)+"%";t.style.top=(Math.random()*100).toFixed(2)+"%";
    t.style.animationDelay=(-Math.random()*5).toFixed(2)+"s";s.appendChild(t);}
  var c=D.createElementNS(SVG,"svg");c.setAttribute("class","ox-chart ox-deco");c.setAttribute("viewBox","0 0 1200 660");c.setAttribute("preserveAspectRatio","none");c.setAttribute("aria-hidden","true");
  c.innerHTML='<g><path d="M80 520 L210 470 L300 500 L420 430"/><path d="M880 140 L960 210 L1060 190 L1120 260"/><circle cx="600" cy="420" r="560" stroke-dasharray="2 10"/></g>';
  stage=D.createElement("div");stage.className="ox-stage ox-deco";stage.setAttribute("aria-hidden","true");
  stage.innerHTML='<div class="ox-plane"><svg viewBox="0 0 1000 1000"><defs><radialGradient id="oxDisc" cx=".5" cy=".5" r=".5"><stop class="ox-disc-a" offset="0"/><stop class="ox-disc-b" offset=".68"/></radialGradient></defs>'+
    '<circle cx="500" cy="500" r="150" fill="url(#oxDisc)"/><circle class="ox-ring r1" cx="500" cy="500" r="150"/><circle class="ox-ring r2" cx="500" cy="500" r="280"/><circle class="ox-ring r3" cx="500" cy="500" r="430"/></svg></div>';
  var l=D.createElement("div");l.className="ox-legend ox-deco";l.setAttribute("aria-hidden","true");l.textContent="Point at a room to bring it near; press to enter.";
  head.insertBefore(c,head.firstChild);head.insertBefore(s,head.firstChild);head.appendChild(stage);head.appendChild(l);}
/* the seal's rim, given a little thickness behind its face (only Home's seal, only here) */
function rim(){var e=head&&head.querySelector("#hxSeal .isl-edge");if(!e||e.querySelector(".ox-rim"))return;
  for(var k=4;k>=1;k--){var i=D.createElement("i");i.className="ox-rim";i.setAttribute("aria-hidden","true");i.style.setProperty("--k",String(k));e.insertBefore(i,e.firstChild);}}
/* the row that held "Read the short guide" goes when nothing else in it shows (the wallpapers key may come later) */
function row(){var g=$("hxGuide"),r=g&&g.parentNode;if(!r||!r.classList)return;
  var any=[].some.call(r.children,function(c){return c!==g&&!c.hidden;});if(r.classList.contains("ox-empty")===any)r.classList.toggle("ox-empty",!any);}
function watchRow(){var g=$("hxGuide"),r=g&&g.parentNode;if(!r||r===rowSeen)return;rowSeen=r;
  try{new MutationObserver(function(){row();}).observe(r,{attributes:true,subtree:true,childList:true,attributeFilter:["hidden"]});}catch(e){}}
function layout(w){var big=w>=980,narrow=w<760;if(hx.classList.contains("ox-narrow")!==narrow)hx.classList.toggle("ox-narrow",narrow);
  /* 6.71: a phone: the orrery under the greeting at a phone's size, the next step under it (writes only what changed) */
  if(narrow){var ns=head.style,nset=function(n,v){if(ns.getPropertyValue(n)!==v)ns.setProperty(n,v);};R0=Math.round(Math.max(100,Math.min(185,w/2-52)));
    nset("--ox-k",(R0/430).toFixed(3));nset("--ox-r",R0+"px");nset("--ox-sun",(w<330?58:w<380?66:72)+"px");nset("--ox-hs",(w<380?32:36)+"px");
    var tx=head.querySelector(".hx-htext"),cd=head.querySelector(".hx-next"),tH=tx?tx.offsetHeight:220,cH=cd?cd.offsetHeight:240,orb=Math.round(R0*1.439+150),top=22+tH+14;
    nset("--ox-cy",(top+Math.round(orb/2)+18)+"px");nset("--ox-ct",(top+orb+20)+"px");nset("--ox-h",(top+orb+20+cH+58)+"px");return;}
  R0=Math.round(Math.max(220,Math.min(430,w/2-130)));CY=big?.61:.64;
  var cw=Math.max(360,Math.min(500,w-40-34-24-420)),tw=Math.max(300,Math.min(520,w-40-34-24-cw)),st=head.style,set=function(n,v){if(st.getPropertyValue(n)!==v)st.setProperty(n,v);};
  set("--ox-h",(big?700:760)+"px");set("--ox-cy",Math.round(CY*100)+"%");set("--ox-cw",cw+"px");set("--ox-tw",tw+"px");set("--ox-sun",(big?132:112)+"px");
  set("--ox-hs",(tw<420?40:48)+"px");set("--ox-k",(R0/430).toFixed(3));set("--ox-r",R0+"px");}
/* the world: a tilted plane, a turning frame, and for each room an arm, the room standing up at its end */
function build(){world=box.querySelector(".ox-world");if(!world){world=D.createElement("div");world.className="ox-world ox-scene";
    spin=D.createElement("div");spin.className="ox-spin";world.appendChild(spin);box.appendChild(world);}else spin=world.querySelector(".ox-spin");
  var list=[].slice.call(box.querySelectorAll(".hx-key")),n=list.length;
  keys=list.map(function(k,i){var p=k.__ox;if(!p){p=k.__ox={el:k,o:null,stand:null,arm:null};
      k.addEventListener("pointerenter",function(){if(on)near(p,true);});k.addEventListener("pointerleave",function(){near(p,false);});
      k.addEventListener("focus",function(){if(on)near(p,true);});k.addEventListener("blur",function(){near(p,false);});}
    p.o=dress(k,i);
    if(!p.stand||!p.stand.isConnected){var arm=D.createElement("div");arm.className="ox-arm";
      arm.innerHTML='<div class="ox-unarm"><div class="ox-counter"><div class="ox-stand"><div class="ox-shadow" aria-hidden="true"></div></div></div></div>';spin.appendChild(arm);
      p.arm=arm;p.stand=arm.querySelector(".ox-stand");}
    p.arm.style.setProperty("--a",(90+i*360/n).toFixed(2)+"deg");
    if(k.parentNode!==p.stand)p.stand.appendChild(k);return p;});}
function enter(){decorate();hx.classList.add("ox-on");if(box.parentNode!==head)head.appendChild(box);build();rim();row();watchRow();on=true;}
function leave(){on=false;if(hold)near(hold,false);hx.classList.remove("ox-on");if(head)head.classList.remove("ox-hold");
  /* the keys go back into their grid, in their order, and Home is as it was */
  keys.forEach(function(p){p.el.classList.remove("ox-near","ox-up");if(p.o)p.o.classList.remove("hover","down");box.appendChild(p.el);});
  if(world&&world.parentNode)world.parentNode.removeChild(world);world=null;spin=null;keys.forEach(function(p){p.stand=null;p.arm=null;});
  if(work&&box&&box.parentNode!==work)work.appendChild(box);
  ["--ox-h","--ox-cy","--ox-cw","--ox-tw","--ox-sun","--ox-hs","--ox-k","--ox-r","--ox-ct"].forEach(function(n){if(head)head.style.removeProperty(n);});if(hx)hx.classList.remove("ox-narrow");}
function mount(){try{
  var h=$("hx");if(!h)return;if(h!==hx){if(on)leave();hx=h;}
  head=hx.querySelector(".hx-head");work=hx.querySelector(".hx-work");box=hx.querySelector(".hx-keys");if(!head||!box)return;
  var w=hx.clientWidth;if(!w)return;
  if(w>=260){layout(w);if(!on||box.parentNode!==head||!hx.classList.contains("ox-on")||!box.querySelector(".ox-world")){enter();if(w<760)layout(w);}else{rim();row();}}
  else if(on)leave();
}catch(e){try{console.warn("Ingenium: Home's orrery",e&&e.message||e);}catch(_){}}}

function boot(){mount();var h=$("hx");if(!h){setTimeout(boot,700);return;}
  try{new ResizeObserver(function(){mount();}).observe(h);}catch(e){W.addEventListener("resize",mount);}
  /* Home's parts may be redrawn by other parts later (the seal key, the wallpapers key): looked at again, cheaply, writing nothing when all is in place */
  setInterval(function(){var x=$("hx");if(!on){if(x&&x.clientWidth>=300)mount();return;}if(x&&x.clientWidth<760)layout(x.clientWidth);
    if(x!==hx||!head||!head.isConnected||box.parentNode!==head||!box.querySelector(".ox-world")){mount();return;}rim();row();},2000);}
if(D.readyState==="loading")D.addEventListener("DOMContentLoaded",boot);else boot();
W.IngOrrery={sphere:function(look){return sphere([null,look||"bands"]);},pearl:function(){try{pearlDefs();}catch(e){}},state:function(){var s=spin?getComputedStyle(spin):null;return {on:on,R:R0,keys:keys.length,hold:hold?hold.el.getAttribute("data-go"):null,motion:motion(),
    turning:!!(s&&s.animationName!=="none"&&s.animationPlayState==="running"),period:s?s.animationDuration:null};},refresh:mount};
try{window.__ingParts["p261"]="running";}catch(_){}
})();
</script>
