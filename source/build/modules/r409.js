<style id="r409-css">
/* ============ R409 · MEMORIA'S INGENIUM CLOUD ROOM, RAISED (Ingenium 8.07, 28 November 2026) ============
   Her words (28 November 2026): "All of the pages are flat on the Ingenium Cloud tab page in Memoria, please fix this and slightly redesign
   the page, it looks so plain and motionless and doesn't fit with the other tab pages on the Memoria page, please fix that." Then, of the
   live preview (source/previews/cloud_room): "I approve of the previews for the Cloud room, please commit and push it everywhere".
   The room now speaks the From your chats room's raised language (r271: its tokens, raised cards and keys, counters, wells and orbs, and
   the lean toward the pointer that r271 gives every .mr-pop): the room a slab; its head an eyebrow, a title, the Cloud's own words and
   its state in raised counters; the Cloud's figure, the computer that keeps it with this device and another of hers, each a sphere made
   as Home makes its orbs, with the room's own marks; two columns, the three steps
   as raised cards on the left, and on the right the devices in her Cloud, what two devices both changed and the sync file; the times in
   a well at the foot. r255 and r394 still draw every part and do all the work; this part dresses and places what they draw, each time
   they draw it, and adds only the head's counters, the figure and the device rows (from IngCloud.settings(), read only). */
#page-memoria #cloudCard.clx-room{--mr-pp:2200px;border-radius:26px !important;border:0 !important;padding:24px 22px 22px !important;color:var(--mr-ink1);
  background:radial-gradient(ellipse 80% 90% at 70% 30%,var(--mr-slab0) 0%,var(--mr-slab1) 82%) !important;
  box-shadow:inset 0 1px 0 var(--mr-hi),0 0 0 1px var(--mr-ring),0 6px 0 var(--mr-slabEdge),0 22px 38px var(--mr-amb2),0 4px 10px var(--mr-amb2) !important;
  transform:perspective(var(--mr-pp,900px)) rotateX(var(--ly,0deg)) rotateY(var(--lx,0deg)) translateY(var(--lz,0px)) scale(var(--ls,1))}
#cloudCard.clx-room .clx-sr{position:absolute !important;width:1px !important;height:1px !important;overflow:hidden !important;clip:rect(0 0 0 0) !important;white-space:nowrap !important;margin:0 !important;padding:0 !important;border:0 !important}
#cloudCard.clx-room > .cl-status{display:none !important}
/* the head: the eyebrow, the title and the Cloud's own words, its counters; the figure at its right */
#cloudCard.clx-room .clx-top{display:grid;grid-template-columns:minmax(0,1fr) 300px;gap:18px;align-items:center}
#cloudCard.clx-room .mr-eye{font:600 11px/1.2 var(--sans);letter-spacing:.26em;text-transform:uppercase;color:var(--mr-ink3)}
#cloudCard.clx-room .mr-eye b{color:var(--mr-acc);font-weight:600;margin-right:10px}
#cloudCard.clx-room .clx-title{font:600 34px/1.05 var(--serif);margin:8px 0 6px;color:var(--mr-ink1);text-shadow:0 1px 0 var(--mr-hi),0 2px 2px var(--mr-amb2)}
#cloudCard.clx-room .cl-lede{margin:0 !important;color:var(--mr-ink2) !important;font-size:13.5px !important;line-height:1.55;max-width:66ch;opacity:1 !important}
#cloudCard.clx-room .mr-counts{display:flex;flex-wrap:wrap;gap:10px;margin-top:14px}
#cloudCard.clx-room .mr-count{display:inline-flex;align-items:center;gap:9px;padding:5px 14px 5px 5px;border-radius:999px;font:600 12.5px/1 var(--sans);color:var(--mr-ink2);
  background:linear-gradient(var(--mr-keyA),var(--mr-keyB));box-shadow:var(--mr-sh-key)}
#cloudCard.clx-room .mr-count.mr-ph{box-shadow:var(--mr-sh-keyhi)}
#cloudCard.clx-room .mr-count i.clx-st{width:22px;height:22px;border-radius:50%;flex:0 0 auto;background:radial-gradient(circle at 36% 32%,#e6e1ee,#aaa2b8 52%,#6f6780);box-shadow:0 2px 3px var(--mr-amb1)}
#cloudCard.clx-room:not([data-s="off"]) .mr-count i.clx-st{background:radial-gradient(circle at 36% 32%,var(--mr-pj1),var(--mr-pj2) 50%,var(--mr-pj3));animation:clxBreath 3.6s ease-in-out infinite}
#cloudCard.clx-room .mr-count b.n{display:inline-grid;place-items:center;min-width:22px;height:22px;padding:0 7px;border-radius:999px;box-sizing:border-box;background:linear-gradient(var(--mr-pa),var(--mr-pb));color:#fff;font:600 11.5px/1 var(--sans);box-shadow:inset 0 1px 0 rgba(255,255,255,.22),0 1px 0 var(--mr-pedge)}
#cloudCard.clx-room .mr-count b.n.q{background:linear-gradient(var(--mr-warnA),var(--mr-warnB));color:var(--mr-warn);box-shadow:inset 0 0 0 1px var(--mr-warnedge)}
@keyframes clxBreath{0%,100%{box-shadow:0 2px 3px var(--mr-amb1),0 0 0 0 rgba(138,95,208,0)}50%{box-shadow:0 2px 3px var(--mr-amb1),0 0 0 5px rgba(138,95,208,.16)}}
/* the Cloud's figure, the approved drawing refined: the same three spheres in the same places and the same line beneath, each made as Home
   makes its orbs, with the Cloud room's own marks and no rim line; no line and no beam joins them (her words, 28 November 2026: "I don't
   mind the symbols, I just hate the lasers. This is not a science project, this is cheapening the look of the app") */
#cloudCard.clx-room .clx-fig{position:relative;height:170px;container-type:inline-size;border-radius:20px;perspective:620px;user-select:none;-webkit-user-select:none;
  background:radial-gradient(ellipse 80% 90% at 50% 40%,rgba(255,255,255,.62),rgba(255,255,255,0) 72%);box-shadow:inset 0 0 0 1px var(--mr-hair2)}
body[data-theme="night"] #cloudCard.clx-room .clx-fig,#cloudCard.clx-room.night .clx-fig{--cf-pearl:#e4d9f8;background:radial-gradient(ellipse 80% 90% at 50% 40%,rgba(160,120,240,.12),rgba(160,120,240,0) 72%)}
#cloudCard.clx-room .clx-scene{position:absolute;inset:0;transform-style:preserve-3d;transform:rotateX(var(--cf-rx,0deg)) rotateY(var(--cf-ry,0deg));transition:transform .5s cubic-bezier(.2,.8,.2,1)}
#cloudCard.clx-room .clx-fig.leaning .clx-scene{transition:transform .12s linear}
#cloudCard.clx-room .clx-links{position:absolute;inset:0;width:100%;height:100%;overflow:visible;pointer-events:none;z-index:1}
#cloudCard.clx-room .clx-scene{z-index:2}
/* by night, a few stars, as on Home and Vesta */
#cloudCard.clx-room .clx-stars{position:absolute;inset:0;pointer-events:none;display:none}
body[data-theme="night"] #cloudCard.clx-room .clx-stars,#cloudCard.clx-room.night .clx-stars{display:block}
#cloudCard.clx-room .clx-stars i{position:absolute;width:2px;height:2px;border-radius:50%;background:#e8dcff;opacity:.5;animation:clxTw 5s ease-in-out infinite;animation-play-state:var(--clx-run,running)}
@keyframes clxTw{0%,100%{opacity:.15}50%{opacity:.75}}
/* the spheres: Home's orbs, made as Home makes them (r261): the sphere, a pearl mark standing above it at its own depth, a soft cast
   shadow, a slow sway in 3D, a tilt toward the pointer, a lift under it and a sink when pressed; no rim line; each with the Cloud room's mark */
#cloudCard.clx-room .clx-orb{position:absolute;z-index:2;transform:translate(-50%,-50%) translateZ(var(--z,0px));display:grid;justify-items:center;gap:1px;margin:0;padding:0 4px 3px;border:0;border-radius:14px;background:none;
  color:var(--mr-ink3);font:600 10.5px/1.2 var(--sans);letter-spacing:.14em;text-transform:uppercase;text-align:center;white-space:nowrap;cursor:pointer;-webkit-tap-highlight-color:transparent;touch-action:manipulation}
#cloudCard.clx-room .clx-orb:focus-visible{outline:2.5px solid var(--mr-acc);outline-offset:2px}
#cloudCard.clx-room .clx-orb.keep{--S:76px;--z:22px;--od:0s}
#cloudCard.clx-room .clx-orb.me{--S:54px;--z:8px;--od:-2.3s}
#cloudCard.clx-room .clx-orb.far{--S:50px;--z:2px;--od:-4.6s}
#cloudCard.clx-room .clx-orb .clx-lab{margin-top:-6px;max-width:112px;overflow:hidden;text-overflow:ellipsis}
#cloudCard.clx-room .clx-orb.keep .clx-lab{max-width:160px;margin-top:-8px}
#cloudCard.clx-room .clx-orb.me .clx-lab{color:var(--mr-acc);font-weight:700}
#cloudCard.clx-room .clx-orb.me.plain .clx-lab{color:var(--mr-ink3);font-weight:600}
#cloudCard.clx-room .clx-oxo{position:relative;display:block;width:var(--S);height:var(--S);perspective:calc(var(--S) * 4);--rx:0deg;--ry:0deg;--cdl:0px;--cds:1;--crop:0;
  --ct1:.2;--ct2:.4;--ce1:.1;--ce2:.26}
body[data-theme="night"] #cloudCard.clx-room .clx-oxo,#cloudCard.clx-room.night .clx-oxo{--ct1:.32;--ct2:.6;--ce1:.2;--ce2:.42}
#cloudCard.clx-room .clx-tilt{position:absolute;inset:0;display:block;transform-style:preserve-3d;transform:translateY(var(--cdl)) scale(var(--cds));transition:transform .4s cubic-bezier(.34,1.4,.64,1)}
#cloudCard.clx-room .clx-idle{position:absolute;inset:0;display:block;transform-style:preserve-3d;animation:clxFloat 7s ease-in-out infinite;animation-delay:var(--od,0s);animation-play-state:var(--clx-run,running)}
@keyframes clxFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(calc(var(--S) * -.035))}}
#cloudCard.clx-room .clx-omark{translate:var(--mx,0px) var(--my,0px);transition:translate .45s cubic-bezier(.2,.8,.2,1)}
#cloudCard.clx-room .clx-oico{animation:clxDrift 7s ease-in-out infinite;animation-delay:var(--od,0s);animation-play-state:var(--clx-run,running)}
@keyframes clxDrift{0%,100%{translate:calc(var(--S) * -.05) calc(var(--S) * .012)}50%{translate:calc(var(--S) * .05) calc(var(--S) * -.012)}}
#cloudCard.clx-room .clx-cast{position:absolute;left:31%;right:31%;bottom:13%;height:8%;border-radius:50%;display:block;background:rgba(42,20,80,.16);filter:blur(calc(var(--S) * .045));transform:translateZ(calc(var(--S) * -.12));transition:opacity .35s ease,transform .35s ease}
body[data-theme="night"] #cloudCard.clx-room .clx-cast,#cloudCard.clx-room.night .clx-cast{background:rgba(0,0,0,.4)}
#cloudCard.clx-room .clx-oball,#cloudCard.clx-room .clx-omark{position:absolute;left:0;top:0;width:200%;height:200%;display:block;transform-origin:0 0;pointer-events:none;
  transform:translate(calc(var(--S) * .5),calc(var(--S) * .5)) translateZ(calc(var(--S) * var(--fz))) scale(var(--fk)) translate(calc(var(--S) * -.5),calc(var(--S) * -.5)) scale(.5)}
#cloudCard.clx-room .clx-oball{--fz:0;--fk:1}
#cloudCard.clx-room .clx-omark{--fz:.14;--fk:.965}
#cloudCard.clx-room .clx-oball > svg{display:block;width:100%;height:100%;overflow:visible;transition:filter .2s ease;
  filter:drop-shadow(calc(var(--S) * .004) calc(var(--S) * .012) calc(var(--S) * .006) rgba(42,20,80,.24)) drop-shadow(calc(var(--S) * .01) calc(var(--S) * .03) calc(var(--S) * .025) rgba(42,20,80,.12))}
body[data-theme="night"] #cloudCard.clx-room .clx-oball > svg,#cloudCard.clx-room.night .clx-oball > svg{filter:drop-shadow(calc(var(--S) * .004) calc(var(--S) * .012) calc(var(--S) * .008) rgba(0,0,0,.5)) drop-shadow(calc(var(--S) * .01) calc(var(--S) * .03) calc(var(--S) * .03) rgba(0,0,0,.3))}
#cloudCard.clx-room .clx-oball .clx-css{position:absolute;left:16.7%;top:16.7%;width:66.6%;height:66.6%;border-radius:50%;background:radial-gradient(circle at 36% 32%,var(--c0),var(--c2) 52%,var(--c4))}
#cloudCard.clx-room .clx-oico{position:absolute;left:50%;top:50%;width:calc(var(--S) * .54);height:calc(var(--S) * .54);margin:calc(var(--S) * -.27) 0 0 calc(var(--S) * -.27);display:block;color:#fff;
  filter:drop-shadow(calc(var(--S) * .016) calc(var(--S) * .05) calc(var(--S) * .04) rgba(42,20,80,.3))}
body[data-theme="night"] #cloudCard.clx-room .clx-oico,#cloudCard.clx-room.night .clx-oico{filter:drop-shadow(calc(var(--S) * .016) calc(var(--S) * .045) calc(var(--S) * .045) rgba(0,0,0,.5))}
#cloudCard.clx-room .clx-oico svg{display:block;width:100%;height:100%;overflow:visible;fill:none;stroke-width:1.9;stroke-linecap:round;stroke-linejoin:round}
#cloudCard.clx-room .clx-orb.keep .clx-oxo{--c0:#c9b6ee;--c1:#9068d6;--c2:#6a3fb5;--c3:#55309a;--c4:#3d2275;--csh:#2a1260}
#cloudCard.clx-room .clx-orb.me .clx-oxo{--c0:#d3e3fb;--c1:#7ea4dc;--c2:#4e80bb;--c3:#2f5d93;--c4:#1c3961;--csh:#0c2140}
#cloudCard.clx-room .clx-orb.far .clx-oxo{--c0:#cfeedd;--c1:#76c39b;--c2:#3f9a6c;--c3:#2a7350;--c4:#174a31;--csh:#0b2a1b}
body[data-theme="night"] #cloudCard.clx-room .clx-orb.keep .clx-oxo,#cloudCard.clx-room.night .clx-orb.keep .clx-oxo{--c0:#d2bff4;--c1:#a57fe8;--c2:#6a3fb5;--c3:#2e1764;--c4:#1b0d3a;--csh:#0b0220}
body[data-theme="night"] #cloudCard.clx-room .clx-orb.me .clx-oxo,#cloudCard.clx-room.night .clx-orb.me .clx-oxo{--c0:#d6e6ff;--c1:#93b8ec;--c2:#4e80bb;--c3:#1c3961;--c4:#0f2240;--csh:#061226}
body[data-theme="night"] #cloudCard.clx-room .clx-orb.far .clx-oxo,#cloudCard.clx-room.night .clx-orb.far .clx-oxo{--c0:#d6f6e6;--c1:#93d8b4;--c2:#3f9a6c;--c3:#174a31;--c4:#0c2a1b;--csh:#04140c}
#cloudCard.clx-room[data-s="off"] .clx-oxo{filter:saturate(.72)}
#cloudCard.clx-room .clx-orb.hover .clx-oxo{--cdl:calc(var(--S) * -.05);--cds:1.05}
#cloudCard.clx-room .clx-orb.hover .clx-cast{opacity:.7;transform:translateZ(calc(var(--S) * -.12)) scale(.86)}
#cloudCard.clx-room .clx-orb.down .clx-oxo{--cdl:calc(var(--S) * .05);--cds:.96}
#cloudCard.clx-room .clx-orb.down .clx-tilt{transition-duration:.08s}
#cloudCard.clx-room .clx-orb::after{content:"";position:absolute;left:50%;top:calc(var(--S) / 2);width:calc(var(--S) * .67);height:calc(var(--S) * .67);margin:calc(var(--S) * -.335) 0 0 calc(var(--S) * -.335);border-radius:50%;border:2px solid var(--mr-acc);opacity:0;pointer-events:none}
#cloudCard.clx-room .clx-orb.f-pulse::after{animation:clxRing .9s ease-out}
#cloudCard.clx-room .clx-orb.f-hop .clx-oxo{animation:clxHop .8s cubic-bezier(.3,0,.3,1)}
#cloudCard.clx-room .clx-orb.f-wobble .clx-oxo{animation:clxWobble .8s ease-in-out}
#cloudCard.clx-room .clx-orb.f-pop .clx-oxo{animation:clxPop .6s cubic-bezier(.3,1.6,.5,1)}
@keyframes clxRing{0%{opacity:.8;transform:scale(1)}100%{opacity:0;transform:scale(2.1)}}
@keyframes clxHop{0%{transform:none}18%{transform:translateY(3px) scale(1.1,.88)}50%{transform:translateY(-14px) scale(.95,1.06)}78%{transform:translateY(1px) scale(1.08,.92)}100%{transform:none}}
@keyframes clxWobble{0%,100%{transform:none}20%{transform:rotate(-12deg)}40%{transform:rotate(9deg)}60%{transform:rotate(-6deg)}80%{transform:rotate(3deg)}}
@keyframes clxPop{0%{transform:scale(.88)}50%{transform:scale(1.14)}100%{transform:none}}
#cloudCard.clx-room .clx-figsay{position:absolute;left:10px;right:10px;bottom:8px;text-align:center;font:italic 500 14px/1.3 var(--serif);font-size:clamp(11px,4.1cqi,14px);color:var(--mr-ink2);pointer-events:none;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;transition:opacity .16s ease}
#cloudCard.clx-room .clx-figsay.swap{opacity:0}
#cloudCard.clx-room .clx-figsay.said{color:var(--mr-acc)}
@media (prefers-reduced-motion:reduce){#cloudCard.clx-room .clx-fig *{animation:none !important;transition:none !important}}
body[data-motion="minimal"] #cloudCard.clx-room .clx-fig *{animation:none !important}
/* the links (her words, 28 November 2026: "I just wanted to show the animated connection wireless connection signal links going from the mac
   mini's orb to the other two orbs"): from the sphere that keeps the Cloud to each of the other two, attached to both; a wireless signal travels
   along each while the Cloud is on; faint and still before it is set up */
#cloudCard.clx-room .clx-links .lk-track{fill:none;stroke-linecap:round;stroke:#8e6ad6;stroke-width:1.7;stroke-dasharray:.1 5.6;opacity:.6}
#cloudCard.clx-room .clx-fig[data-look="signal"]:not([data-s="off"]) .clx-links .lk-track{animation:clxFlow 1.15s linear infinite;animation-play-state:var(--clx-run,running)}
@keyframes clxFlow{to{stroke-dashoffset:-5.7}}
#cloudCard.clx-room .clx-fig[data-look="waves"] .clx-links .lk-track,#cloudCard.clx-room .clx-fig[data-look="beads"] .clx-links .lk-track{opacity:.38}
#cloudCard.clx-room .clx-fig[data-s="off"] .clx-links .lk-track{opacity:.28}
#cloudCard.clx-room .clx-links .lk-pulse{fill:none;stroke:#ffffff;stroke-width:2.2;stroke-linecap:round;filter:drop-shadow(0 0 1.5px #ffffff) drop-shadow(0 0 4px rgba(150,110,240,.95))}
#cloudCard.clx-room .clx-links .lk-halo{fill:none;stroke:#b393f0;stroke-width:6;stroke-linecap:round;opacity:.35;filter:blur(1.6px)}
#cloudCard.clx-room .clx-links .lk-wave{fill:none;stroke:#8e6ad6;stroke-width:1.7;stroke-linecap:round;filter:drop-shadow(0 0 2px rgba(150,110,240,.6))}
#cloudCard.clx-room .clx-links .lk-bead{fill:#ffffff;filter:drop-shadow(0 0 1.5px #ffffff) drop-shadow(0 0 3.5px rgba(150,110,240,.95))}
body[data-theme="night"] #cloudCard.clx-room .clx-links .lk-track,#cloudCard.clx-room.night .clx-links .lk-track{stroke:#cdb6f7}
body[data-theme="night"] #cloudCard.clx-room .clx-links .lk-wave,#cloudCard.clx-room.night .clx-links .lk-wave{stroke:#dccbff;filter:drop-shadow(0 0 2.5px rgba(210,190,255,.75))}
body[data-theme="night"] #cloudCard.clx-room .clx-links .lk-halo,#cloudCard.clx-room.night .clx-links .lk-halo{stroke:#d6c4ff;opacity:.3}
/* a small sphere receives the signal: a soft ring widens round it */
#cloudCard.clx-room .clx-orb::before{content:"";position:absolute;left:50%;top:calc(var(--S) / 2);width:calc(var(--S) * .7);height:calc(var(--S) * .7);margin:calc(var(--S) * -.35) 0 0 calc(var(--S) * -.35);border-radius:50%;
  border:1.5px solid rgba(142,106,214,.75);opacity:0;pointer-events:none}
body[data-theme="night"] #cloudCard.clx-room .clx-orb::before,#cloudCard.clx-room.night .clx-orb::before{border-color:rgba(214,196,255,.8)}
#cloudCard.clx-room .clx-orb.rcv::before{animation:clxRcv .9s ease-out}
@keyframes clxRcv{0%{opacity:.9;transform:scale(1)}100%{opacity:0;transform:scale(1.85)}}
#cloudCard.clx-room .clx-glint{position:absolute;left:41%;top:37%;width:calc(var(--S) * .24);height:calc(var(--S) * .24);margin:calc(var(--S) * -.12) 0 0 calc(var(--S) * -.12);pointer-events:none;opacity:0;
  filter:drop-shadow(0 0 2px #fff) drop-shadow(0 0 5px rgba(255,255,255,.9));transform:scale(0) rotate(0deg)}
#cloudCard.clx-room .clx-glint svg{display:block;width:100%;height:100%}
#cloudCard.clx-room .clx-glint.on{animation:clxGlint .7s ease-out}
@keyframes clxGlint{0%{opacity:0;transform:scale(0) rotate(0deg)}35%{opacity:1;transform:scale(1) rotate(30deg)}100%{opacity:0;transform:scale(.2) rotate(70deg)}}

/* two columns */
#cloudCard.clx-room .clx-cols{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:22px;align-items:start;margin-top:18px}
#cloudCard.clx-room .clx-col{display:grid;gap:16px;min-width:0}
#cloudCard.clx-room .clx-group{display:grid;gap:11px;min-width:0}
#cloudCard.clx-room .mr-ghead{display:flex;align-items:center;gap:9px;margin:2px 2px 0;font:600 11px/1.2 var(--sans);letter-spacing:.2em;text-transform:uppercase;color:var(--mr-ink3)}
/* the three steps, raised cards */
#cloudCard.clx-room .cl-step{margin:0 !important;padding:0 !important;border:0 !important;border-radius:18px;overflow:hidden;background:linear-gradient(var(--mr-keyA),var(--mr-keyB)) !important;box-shadow:var(--mr-sh-card)}
#cloudCard.clx-room .cl-step.mr-ph{box-shadow:var(--mr-sh-cardhi)}
#cloudCard.clx-room .cl-step > h3{display:grid !important;grid-template-columns:auto minmax(0,1fr) auto auto;align-items:center;gap:12px !important;margin:0 !important;padding:13px 15px;cursor:pointer;font:600 14.5px/1.3 var(--sans) !important;color:var(--mr-ink1) !important;border-radius:18px}
#cloudCard.clx-room .cl-step > h3:focus-visible{outline:2.5px solid var(--mr-acc);outline-offset:-3px}
#cloudCard.clx-room .cl-num{width:32px !important;height:32px !important;font-size:14px !important;font-weight:600 !important;color:#fff !important;
  background:radial-gradient(circle at 36% 30%,var(--mr-pj1) 0%,var(--mr-pj2) 48%,var(--mr-pj3) 100%) !important;box-shadow:0 3px 5px var(--mr-amb1),inset 0 -2px 3px rgba(0,0,0,.2);text-shadow:0 1px 2px rgba(20,8,50,.5)}
#cloudCard.clx-room .cl-step.done .cl-num{background:radial-gradient(circle at 36% 30%,var(--mr-yu1) 0%,var(--mr-yu2) 48%,var(--mr-yu3) 100%) !important}
#cloudCard.clx-room .cl-step > h3 .cl-sum{margin:0 !important;display:inline-flex;align-items:center;padding:4px 10px;border-radius:999px;font:600 11.5px/1 var(--sans) !important;color:var(--mr-ok) !important;background:linear-gradient(var(--mr-okA),var(--mr-okB));box-shadow:inset 0 0 0 1px var(--mr-okedge);white-space:nowrap}
#cloudCard.clx-room .cl-step > h3 .cl-sum:empty{display:none}
#cloudCard.clx-room .clx-chev{grid-column:4;width:26px;height:26px;border-radius:50%;display:grid;place-items:center;color:var(--mr-acc);background:linear-gradient(var(--mr-keyA),var(--mr-keyB));box-shadow:var(--mr-sh-key);transition:transform .35s cubic-bezier(.34,1.4,.64,1)}
#cloudCard.clx-room .clx-chev svg{width:14px;height:14px}
#cloudCard.clx-room .cl-step.open > h3 .clx-chev,#cloudCard.clx-room details.cl-more[open] > summary .clx-chev{transform:rotate(180deg)}
#cloudCard.clx-room .cl-body{margin:0 !important;padding:2px 16px 16px 59px;animation:clxOpen .45s cubic-bezier(.2,.8,.2,1)}
@keyframes clxOpen{from{opacity:0;transform:translateY(-6px)}}
#cloudCard.clx-room .cl-say{color:var(--mr-ink2);font-size:13px;line-height:1.5}
#cloudCard.clx-room .cl-say.bad{color:var(--bad,#9a3232)}
#cloudCard.clx-room .cl-row{display:grid;gap:7px;margin:12px 0 0}
#cloudCard.clx-room label.cl-l{min-width:0;font:600 10.5px/1 var(--sans);letter-spacing:.2em;text-transform:uppercase;color:var(--mr-ink3)}
#cloudCard.clx-room input[type=text],#cloudCard.clx-room input[type=password]{width:100%;min-width:0;box-sizing:border-box;min-height:38px;padding:0 12px;border:0;border-radius:12px;background:var(--mr-sunk);box-shadow:var(--mr-sh-well);color:var(--mr-ink1);font:13.5px/1.4 var(--sans);outline:0}
#cloudCard.clx-room input[type=text]:focus,#cloudCard.clx-room input[type=password]:focus{box-shadow:var(--mr-sh-well),0 0 0 2px var(--mr-acc)}
#cloudCard.clx-room select{appearance:none;-webkit-appearance:none;width:100%;min-height:38px;padding:0 34px 0 12px;border:0;border-radius:12px;color:var(--mr-ink1);font:13px/1.3 var(--sans);box-shadow:var(--mr-sh-well);
  background:var(--mr-sunk) url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%236a3fb5' stroke-width='2.4' stroke-linecap='round'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E") no-repeat right 12px center}
/* the switches: the From your chats room's own toggles */
#cloudCard.clx-room .cl-choice{display:grid;grid-template-columns:auto minmax(0,1fr);gap:12px;align-items:center;margin:12px 0 0;font-size:13px;color:var(--mr-ink2)}
#cloudCard.clx-room .cl-choice input[type=checkbox]{appearance:none;-webkit-appearance:none;position:relative;width:52px;height:30px;margin:0;border-radius:999px;cursor:pointer;background:var(--mr-sunk);box-shadow:var(--mr-sh-well);transition:background-color .25s}
#cloudCard.clx-room .cl-choice input[type=checkbox]::after{content:"";position:absolute;left:3px;top:3px;width:24px;height:24px;border-radius:999px;background:linear-gradient(var(--mr-keyA),var(--mr-keyB));box-shadow:inset 0 1px 0 var(--mr-hi),0 2px 0 var(--mr-edge),0 3px 6px var(--mr-amb1);transition:transform .35s cubic-bezier(.34,1.4,.64,1)}
#cloudCard.clx-room .cl-choice input[type=checkbox]:checked{background:linear-gradient(var(--mr-pa),var(--mr-pb));box-shadow:inset 0 2px 5px rgba(20,6,50,.4),inset 0 0 0 1px var(--mr-pedge)}
#cloudCard.clx-room .cl-choice input[type=checkbox]:checked::after{transform:translateX(22px)}
#cloudCard.clx-room .cl-choice input[type=checkbox]:focus-visible{outline:2.5px solid var(--mr-acc);outline-offset:3px}
/* the keys: the From your chats room's own */
#cloudCard.clx-room .btn.small{display:inline-flex;align-items:center;justify-content:center;gap:7px;min-height:32px;padding:0 13px;margin:12px 10px 0 0;border:0 !important;border-radius:10px;cursor:pointer;white-space:nowrap;
  background:linear-gradient(var(--mr-keyA),var(--mr-keyB)) !important;color:var(--mr-ink1) !important;font:600 12.5px/1 var(--sans) !important;box-shadow:var(--mr-sh-key) !important;text-decoration:none !important;
  transform:perspective(900px) rotateX(var(--ly,0deg)) rotateY(var(--lx,0deg)) translateY(var(--lz,0px)) scale(var(--ls,1));transition:transform .35s cubic-bezier(.34,1.5,.64,1),box-shadow .2s ease}
#cloudCard.clx-room .btn.small.mr-ph{--lz:-2px;box-shadow:var(--mr-sh-keyhi) !important}
#cloudCard.clx-room .btn.small.mr-pd{--lz:1px;box-shadow:var(--mr-sh-keypress) !important;transition-duration:.07s}
#cloudCard.clx-room .btn.small.primary{background:linear-gradient(var(--mr-pa),var(--mr-pb)) !important;color:#fff !important;text-shadow:0 1px 1px rgba(30,10,60,.3);box-shadow:var(--mr-sh-pkey) !important}
#cloudCard.clx-room .btn.small.primary.mr-ph{box-shadow:var(--mr-sh-pkeyhi) !important}
#cloudCard.clx-room .btn.small.primary.mr-pd{box-shadow:var(--mr-sh-ppress) !important}
#cloudCard.clx-room .btn.small:disabled{opacity:.55;cursor:default}
#cloudCard.clx-room .cl-row > .btn.small{justify-self:start;margin-top:0}
/* the right column: the devices in her Cloud, what two devices both changed, the sync file */
#cloudCard.clx-room .cl-devs,#cloudCard.clx-room .clx-devsay{display:none !important}
#cloudCard.clx-room .clx-devs{display:grid;gap:10px}
#cloudCard.clx-room .clx-drow{display:grid;grid-template-columns:auto minmax(0,1fr) auto;align-items:center;gap:12px;padding:11px 14px;border-radius:16px;background:linear-gradient(var(--mr-keyA),var(--mr-keyB));box-shadow:var(--mr-sh-card)}
#cloudCard.clx-room .clx-drow.mr-ph{box-shadow:var(--mr-sh-cardhi)}
#cloudCard.clx-room .clx-drow .o{width:26px;height:26px;border-radius:50%;background:radial-gradient(circle at 36% 32%,var(--o1),var(--o2) 46%,var(--o3) 100%);box-shadow:0 3px 5px var(--mr-amb1)}
#cloudCard.clx-room .clx-drow.me .o{--o1:var(--mr-wy1);--o2:var(--mr-wy2);--o3:var(--mr-wy3)}
#cloudCard.clx-room .clx-drow.keep .o{--o1:var(--mr-pj1);--o2:var(--mr-pj2);--o3:var(--mr-pj3)}
#cloudCard.clx-room .clx-drow.far .o{--o1:var(--mr-yu1);--o2:var(--mr-yu2);--o3:var(--mr-yu3)}
#cloudCard.clx-room .clx-drow b{display:block;font:600 13.5px/1.3 var(--sans);color:var(--mr-ink1);overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
#cloudCard.clx-room .clx-drow small{color:var(--mr-ink3);font-size:12px}
#cloudCard.clx-room .clx-drow em{font-style:normal;font:600 11.5px/1 var(--sans);color:var(--mr-ink3)}
#cloudCard.clx-room .clx-empty{padding:12px 14px;border-radius:12px;background:var(--mr-sunk);box-shadow:var(--mr-sh-well);font-size:13px;line-height:1.5;color:var(--mr-ink3)}
#cloudCard.clx-room #clConf{display:grid;gap:10px;margin:0}
#cloudCard.clx-room #clConf:empty{display:none}
#cloudCard.clx-room #clConf > h4{display:flex;align-items:center;gap:9px;margin:2px 2px 0;font:600 11px/1.2 var(--sans);letter-spacing:.2em;text-transform:uppercase;color:var(--mr-ink3)}
#cloudCard.clx-room #clConf > h4::before{content:"";width:15px;height:15px;border-radius:50%;flex:0 0 auto;background:radial-gradient(circle at 36% 32%,var(--mr-dt1) 0%,var(--mr-dt2) 46%,var(--mr-dt3) 100%);box-shadow:0 2px 3px var(--mr-amb1)}
#cloudCard.clx-room #clConf .cf-row{display:grid;grid-template-columns:1fr 1fr;gap:10px;padding:14px;border:0 !important;border-radius:18px;background:linear-gradient(var(--mr-keyA),var(--mr-keyB)) !important;box-shadow:var(--mr-sh-card) !important}
#cloudCard.clx-room #clConf .cf-row.mr-ph{box-shadow:var(--mr-sh-cardhi) !important}
#cloudCard.clx-room #clConf .cf-row:hover{transform:perspective(900px) rotateX(var(--ly,0deg)) rotateY(var(--lx,0deg)) translateY(var(--lz,0px))}
#cloudCard.clx-room #clConf .cf-h b{font:600 14px/1.3 var(--sans);color:var(--mr-ink1)}
#cloudCard.clx-room #clConf .cf-h small{color:var(--mr-ink3);font-size:12px}
#cloudCard.clx-room #clConf .cf-side{border-radius:12px;padding:10px 12px;background:var(--mr-sunk) !important;box-shadow:var(--mr-sh-well);color:var(--mr-ink3);font-size:12px;min-width:0}
#cloudCard.clx-room #clConf .cf-side b{font:600 12.5px/1.3 var(--sans);color:var(--mr-ink1)}
#cloudCard.clx-room #clConf .cf-side q{font:italic 500 14px/1.35 var(--serif);color:var(--mr-ink2)}
#cloudCard.clx-room #clConf .cf-acts .btn.small{margin:0 10px 0 0}
#cloudCard.clx-room details.cl-more{margin:0 !important;border-radius:18px;overflow:hidden;background:linear-gradient(var(--mr-keyA),var(--mr-keyB));box-shadow:var(--mr-sh-card)}
#cloudCard.clx-room details.cl-more.mr-ph{box-shadow:var(--mr-sh-cardhi)}
#cloudCard.clx-room details.cl-more > summary{display:grid;grid-template-columns:auto minmax(0,1fr) auto;align-items:center;gap:12px;padding:13px 15px;list-style:none;cursor:pointer;font:600 14.5px/1.3 var(--sans) !important;color:var(--mr-ink1) !important}
#cloudCard.clx-room details.cl-more > summary::-webkit-details-marker{display:none}
#cloudCard.clx-room details.cl-more > summary .clx-chev{grid-column:3}
#cloudCard.clx-room details.cl-more > summary:focus-visible{outline:2.5px solid var(--mr-acc);outline-offset:-3px;border-radius:18px}
#cloudCard.clx-room details.cl-more[open] > :not(summary){margin-left:16px;margin-right:16px}
#cloudCard.clx-room details.cl-more[open] > :last-child{margin-bottom:16px}
#cloudCard.clx-room .clx-sync{display:grid;place-items:center;width:32px;height:32px;border-radius:50%;color:#fff;font:600 15px/1 var(--sans);background:radial-gradient(circle at 36% 30%,var(--mr-pj1) 0%,var(--mr-pj2) 48%,var(--mr-pj3) 100%);box-shadow:0 3px 5px var(--mr-amb1),inset 0 -2px 3px rgba(0,0,0,.2)}
/* the foot: the times in a well, and the key that turns the Cloud off */
#cloudCard.clx-room #clTimes{margin:16px 0 0;padding:11px 14px;border-radius:14px;background:var(--mr-sunk);box-shadow:var(--mr-sh-well);font-size:12.8px;color:var(--mr-ink2)}
#cloudCard.clx-room > .btn.small{margin-top:12px !important}
/* what arrives rises, once, when the room opens */
#cloudCard.clx-room.clx-rise .clx-top,#cloudCard.clx-room.clx-rise .clx-col > *{animation:clxRise .55s cubic-bezier(.2,.8,.2,1) backwards}
#cloudCard.clx-room.clx-rise .clx-col > :nth-child(2){animation-delay:70ms}#cloudCard.clx-room.clx-rise .clx-col > :nth-child(3){animation-delay:140ms}
@keyframes clxRise{from{opacity:0;transform:translateY(10px) scale(.985)}}
@media (max-width:1100px){#cloudCard.clx-room .clx-cols{grid-template-columns:minmax(0,1fr)}}
@media (max-width:760px){#cloudCard.clx-room .clx-top{grid-template-columns:minmax(0,1fr)}#cloudCard.clx-room #clConf .cf-row{grid-template-columns:minmax(0,1fr)}#cloudCard.clx-room .cl-body{padding-left:16px}}
@media (max-width:520px){#page-memoria #cloudCard.clx-room{padding:18px 13px !important;border-radius:22px !important}#cloudCard.clx-room .clx-title{font-size:29px}}
body[data-motion="minimal"] #cloudCard.clx-room *:not(.zip),body[data-motion="minimal"] #cloudCard.clx-room{animation:none !important}
@media (prefers-reduced-motion:reduce){#cloudCard.clx-room *,#cloudCard.clx-room{animation:none !important;transition:none !important}}
</style>
<script>
(function r409(){"use strict";
if(window.__r409)return;window.__r409=1;try{window.__ingParts=window.__ingParts||{};window.__ingParts["p409"]="started";}catch(_){}
var W=window,D=document,MO=null,CARD=null,ROSE=false,IO=null;
function $(i){return D.getElementById(i);}
function mk(t,c,x){var e=D.createElement(t);if(c)e.className=c;if(x!=null)e.textContent=x;return e;}
function warn(e){try{console.warn("r409",e);}catch(_){}}
function cfg(){try{return W.IngCloud&&IngCloud.settings?IngCloud.settings():{};}catch(e){return {};}}
function isOn(){try{return !!(W.IngCloud&&IngCloud.ready&&IngCloud.ready());}catch(e){return false;}}
function at(x){return x&&typeof x==="object"?(x.at||0):(x||0);}
function ago(t){if(!t)return "never";var s=Math.round((Date.now()-t)/1000);if(s<60)return "just now";var m=Math.round(s/60);if(m<60)return m+(m===1?" minute ago":" minutes ago");
  var h=Math.round(m/60);if(h<48)return h+(h===1?" hour ago":" hours ago");return Math.round(h/24)+" days ago";}
function short(t){if(!t)return "never";var s=Math.round((Date.now()-t)/1000);if(s<60)return "now";var m=Math.round(s/60);if(m<60)return m+" min";var h=Math.round(m/60);if(h<48)return h+" h";return Math.round(h/24)+" d";}
function mb(n){return n>=1048576?(n/1048576).toFixed(1)+" MB":Math.max(1,Math.round(n/1024))+" KB";}
var CHEV='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg>';
function chev(){var s=mk("span","clx-chev");s.setAttribute("aria-hidden","true");s.innerHTML=CHEV;return s;}
/* the devices in her Cloud, from what r255 keeps of them: each device's newest copy */
function devices(C){var by={};(C.snaps||[]).forEach(function(s){if(!s||!s.device)return;if(!by[s.device]||(s.got||0)>(by[s.device].got||0))by[s.device]=s;});
  return Object.keys(by).map(function(k){return by[k];});}
function keeper(C){var b=C.box||{};return b.self?"This computer":(b.computer||b.addr||"");}
function conflicts(c){var b=c.querySelector("#clConf");return b?b.querySelectorAll(".cf-row").length:0;}
/* ---------- the head ---------- */
function counters(C,on,nc){var w=mk("div","mr-counts");
  var a=mk("span","mr-count mr-pop");a.appendChild(mk("i","clx-st"));a.appendChild(D.createTextNode(on?("On, kept by "+(C.box&&C.box.self?"this computer":(keeper(C)||"your computer"))):"Off on this device"));w.appendChild(a);
  function pill(n,t,q){var p=mk("span","mr-count mr-pop");p.appendChild(mk("b","n"+(q?" q":""),n));p.appendChild(D.createTextNode(t));w.appendChild(p);}
  pill(short(at(C.lastPush)),"sent");pill(short(at(C.lastPull)),"brought in");if(nc)pill(String(nc),"to choose",true);return w;}
/* ---------- the Cloud's figure: the approved drawing, refined. Her words (28 November 2026): "I want you to make the little drawing more 3D
   and animated, I want it to be clickable and interactive like the rest of the app is"; "I didn't want you to change the design of the
   drawing, I just wanted it refined and improved, please only do that"; "There is a white outline around the orbs that cheapen the look,
   please fix that and match them to the orbs from the Home page"; and, of what it should show: "I just wanted to show the animated connection
   wireless connection signal links going from the mac mini's orb to the other two orbs".
   The same three spheres in the same places and the same line beneath; each sphere made as Home makes its orbs (r261): Home's sphere with
   no rim line, a pearl mark standing above it at its own depth (a cloud for the computer that keeps the Cloud, a laptop for this device, a
   phone for another), a soft cast shadow, a slow sway; on hover it lifts and its mark leans toward the pointer. From the sphere that keeps
   the Cloud a link runs to each of the other two, attached to both: while the Cloud is on, a wireless signal travels along it (look
   "signal": dotted links flowing out of it, a soft light running along them now and then; "waves": waves of signal leaving it for each
   sphere; "beads": beads of light going to and fro), and each small sphere answers with a soft ring as the signal reaches it. Before the
   Cloud is set up the links stand faint and still. Each sphere answers a press (it hops, pulses or wobbles, and sends a signal), says what
   it is in the line beneath and, before the Cloud is set up, opens the step it belongs to. Under Minimal motion or reduced motion nothing
   moves by itself. ---------- */
var CF_N=0;
function cfEsc(s){return String(s==null?"":s).replace(/[&<>"']/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#39;"}[c];});}
function cfStill(){try{if(document.body.getAttribute("data-motion")==="minimal")return true;}catch(e){}try{return matchMedia("(prefers-reduced-motion: reduce)").matches;}catch(e){return false;}}
/* d: {state:"off"|"on"|"choose", say, keeper:{name,tip,step}, me:{name,tip,step}, far:{name,tip,step}|null}
   opt: {sphere(look): an SVG string or null, step(n), look: "signal"|"waves"|"beads"} */
function cfFigure(d,opt){var n=++CF_N,id="cf"+n+"x",f=document.createElement("div"),NS="http://www.w3.org/2000/svg";f.className="clx-fig";f.setAttribute("role","group");
  f.setAttribute("aria-label","Your Cloud: the computer that keeps it, linked to this device and your others. Press a sphere.");
  var hasFar=!!d.far,on=d.state!=="off",LOOK=(opt&&opt.look)||"waves";f.setAttribute("data-look",LOOK);
  var svg='<svg class="clx-links" aria-hidden="true" focusable="false"><defs><linearGradient id="'+id+'P" gradientUnits="userSpaceOnUse" x1="3" y1="3" x2="21" y2="21">'+
    '<stop offset="0" style="stop-color:#ffffff"/><stop offset=".42" style="stop-color:#ffffff"/><stop offset="1" style="stop-color:var(--cf-pearl,#dccff4)"/></linearGradient></defs><g class="lk-g"></g></svg>',
    stars='<span class="clx-stars" aria-hidden="true">'+[[8,18],[4,58],[29,9],[36,44],[61,13],[66,46],[83,24],[96,62],[47,84],[13,38],[76,8],[57,30]].map(function(q,k){return '<i style="left:'+q[0]+'%;top:'+q[1]+'%;animation-delay:'+(-k*0.7).toFixed(1)+'s"></i>';}).join("")+'</span>';
  var MARK={keep:'<path d="M7.6 18.4h9.6a3.7 3.7 0 0 0 .55-7.36 5.4 5.4 0 0 0-10.45 1.3 3.05 3.05 0 0 0 .3 6.06z"/><path d="M12 13.2v3.2M10.6 14.7l1.4-1.5 1.4 1.5"/>',
    me:'<rect x="4.6" y="5.6" width="14.8" height="10" rx="1.4"/><path d="M2.8 18.6h18.4"/>',
    far:'<rect x="7.3" y="3.4" width="9.4" height="17.2" rx="2"/><path d="M11 17.6h2"/>'};
  var STAR="M12 0 L13.3 10.7 L24 12 L13.3 13.3 L12 24 L10.7 13.3 L0 12 L10.7 10.7 Z";
  function mark(k){return '<svg viewBox="0 0 24 24" stroke="url(#'+id+'P)" aria-hidden="true" focusable="false">'+MARK[k.split(" ")[0]]+'</svg>';}
  function ball(look){var s=null;try{s=opt.sphere?opt.sphere(look):null;}catch(e){s=null;}return s||'<span class="clx-css"></span>';}
  function orb(cls,who,look,x,y,i){return '<button type="button" class="clx-orb '+cls+'" data-o="'+i+'" style="left:'+x+';top:'+y+'" aria-label="'+cfEsc(who.name)+'">'+
    '<span class="clx-oxo"><span class="clx-tilt"><span class="clx-idle"><i class="clx-cast"></i><span class="clx-oball">'+ball(look)+'</span>'+
    '<span class="clx-omark"><span class="clx-oico">'+mark(cls)+'</span></span></span></span><span class="clx-glint"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="'+STAR+'" fill="#fff"/></svg></span></span><span class="clx-lab">'+cfEsc(who.name)+'</span></button>';}
  f.innerHTML=stars+svg+'<div class="clx-scene">'+orb("keep",d.keeper,"bands","50%","38%",0)+orb("me"+(d.me.plain?" plain":""),d.me,"aurora","20%","60%",1)+(hasFar?orb("far",d.far,"dapple","80%","60%",2):"")+'</div>'+
    '<span class="clx-figsay" role="status" aria-live="polite">'+cfEsc(d.say||"")+'</span>';
  var SV=f.querySelector(".clx-links"),G=SV.querySelector(".lk-g"),ORB=[].slice.call(f.querySelectorAll(".clx-orb")),WHO=[d.keeper,d.me,d.far],tipT=0,CY=[0,0,0],LIVE=true;
  /* what a pressed sphere says takes the place of the line beneath the drawing for a moment, so nothing covers the spheres */
  function tip(t){var e=f.querySelector(".clx-figsay");if(!e||!t)return;e.classList.add("swap");clearTimeout(tipT);
    setTimeout(function(){e.textContent=t;e.classList.remove("swap");e.classList.add("said");},160);
    tipT=setTimeout(function(){e.classList.add("swap");setTimeout(function(){e.textContent=d.say||"";e.classList.remove("swap","said");},160);},3800);}
  function flourish(b,cls){b.classList.remove("f-hop","f-wobble","f-pop","f-pulse");void b.offsetWidth;b.classList.add(cls);setTimeout(function(){b.classList.remove(cls);},900);try{settle(950);}catch(e){}}
  function glint(i){var g=ORB[i]&&ORB[i].querySelector(".clx-glint");if(!g)return;g.classList.remove("on");void g.offsetWidth;g.classList.add("on");setTimeout(function(){g.classList.remove("on");},800);}
  /* a small sphere receives the signal: a soft ring widens round it */
  function receive(i){var b=ORB[i];if(!b)return;b.classList.remove("rcv");void b.offsetWidth;b.classList.add("rcv");setTimeout(function(){b.classList.remove("rcv");},950);}
  /* ---------- the links' way: from just outside the keeper's rim to just outside a small sphere's rim, measured from where the spheres
     appear (as the scene leans toward the pointer, each at its own depth), so the links stay attached to both ---------- */
  var L=[];
  function centre(i){var o=ORB[i]&&ORB[i].querySelector(".clx-oxo");if(!o)return null;var fr=f.getBoundingClientRect(),q=o.getBoundingClientRect();if(!q.width)return null;
    return {x:q.left+q.width/2-fr.left,y:q.top+q.height/2-fr.top,r:q.width*0.33};}
  function unit(x,y){var l=Math.hypot(x,y)||1;return [x/l,y/l];}
  function q(p){return p.x.toFixed(1)+" "+p.y.toFixed(1);}
  function geo(i){var K0=centre(0),M0=centre(i);if(!K0||!M0)return null;var vx=M0.x-K0.x,vy=M0.y-K0.y,len=Math.hypot(vx,vy)||1;
    if(LOOK==="waves"){var u=unit(vx,vy),a={x:K0.x+u[0]*K0.r*1.12,y:K0.y+u[1]*K0.r*1.12},b={x:M0.x-u[0]*M0.r*1.18,y:M0.y-u[1]*M0.r*1.18};
      return {K:K0,M:M0,a:a,b:b,d:"M"+q(a)+" L"+q(b),ang:Math.atan2(vy,vx),reach:Math.hypot(b.x-a.x,b.y-a.y)};}
    /* a gentle arch, as the drawing's own arcs were, a little lower */
    var ux=-vx/len,uy=-vy/len,nx=uy,ny=-ux;if(ny>0){nx=-nx;ny=-ny;}var H=0.6;
    var c1={x:M0.x+len*(0.5106*ux+0.439*H*nx),y:M0.y+len*(0.5106*uy+0.439*H*ny)},c2={x:M0.x+len*(0.889*ux+0.361*H*nx),y:M0.y+len*(0.889*uy+0.361*H*ny)};
    var e=unit(c2.x-K0.x,c2.y-K0.y),s=unit(c1.x-M0.x,c1.y-M0.y),a2={x:K0.x+e[0]*K0.r*1.1,y:K0.y+e[1]*K0.r*1.1},b2={x:M0.x+s[0]*M0.r*1.16,y:M0.y+s[1]*M0.r*1.16};
    return {K:K0,M:M0,a:a2,b:b2,d:"M"+q(a2)+" C"+q(c2)+", "+q(c1)+", "+q(b2)};}
  function mkp(cls,dd){var p=document.createElementNS(NS,"path");p.setAttribute("d",dd);p.setAttribute("class",cls);G.appendChild(p);return p;}
  function lay(){var W=f.clientWidth,H=f.clientHeight;if(!W||!H)return false;SV.setAttribute("viewBox","0 0 "+W+" "+H);
    [1,2].forEach(function(i,j){if(i===2&&!hasFar)return;var g=geo(i);if(!g)return;var l=L[j];
      if(!l){l=L[j]={i:i,g:g,track:mkp("lk-track",g.d),len:0};}else{l.g=g;l.track.setAttribute("d",g.d);}try{l.len=l.track.getTotalLength();}catch(e){}});
    return L.length>0;}
  /* while the scene leans or settles back, the links are drawn again each frame */
  var SETTLE=0,sraf=0;function settle(ms){SETTLE=Math.max(SETTLE,performance.now()+(ms||0));if(!sraf)sraf=requestAnimationFrame(function st(t){sraf=0;lay();if(t<SETTLE||f.classList.contains("leaning"))sraf=requestAnimationFrame(st);});}
  /* ---------- the signal ---------- */
  var RUN=[];   /* what is travelling now: each {t0,dur,step(p),end()} */
  function fly(dur,step,end){RUN.push({t0:performance.now(),dur:dur,step:step,end:end});kick();}
  /* a soft light running along a link, out to a small sphere (or in, from it) */
  function pulse(k,inward){var l=L[k];if(!l||!l.len)return;var core=mkp("lk-pulse",l.track.getAttribute("d")),halo=mkp("lk-halo",l.track.getAttribute("d")),PL=Math.max(10,l.len*0.16);
    [core,halo].forEach(function(x){x.style.strokeDasharray=PL+" "+(l.len+PL*2);});
    fly(1100,function(p){var e=p<.5?2*p*p:1-Math.pow(-2*p+2,2)/2,h=inward?l.len*(1-e):l.len*e,o=inward?-h:PL-h,fd=Math.min(1,p/.1)*Math.min(1,(1-p)/.12),dd=l.track.getAttribute("d");
      [core,halo].forEach(function(x){if(x.getAttribute("d")!==dd)x.setAttribute("d",dd);x.style.strokeDashoffset=o.toFixed(1);x.style.opacity=fd.toFixed(3);});},
      function(){core.remove();halo.remove();if(inward)glint(0);else receive(l.i);});}
  /* waves of signal leaving the keeper for a small sphere, widening as they go */
  function waves(k){var l=L[k];if(!l)return;var span=0.30;
    for(var w=0;w<3;w++)(function(w){setTimeout(function(){var a=document.createElementNS(NS,"path");a.setAttribute("class","lk-wave");G.appendChild(a);
      /* each wave fans away from the keeper's name beneath it: shorter on the side that faces down */
      fly(1500,function(p){var g=l.g,R0=Math.hypot(g.a.x-g.K.x,g.a.y-g.K.y),R1=R0+g.reach,r=R0+(R1-R0)*p,sp=span*(0.75+0.5*p),dn=Math.cos(g.ang)<0?-1:1,s1=g.ang-sp*(dn<0?0.3:1),s2=g.ang+sp*(dn>0?0.3:1),
        x1=g.K.x+r*Math.cos(s1),y1=g.K.y+r*Math.sin(s1),x2=g.K.x+r*Math.cos(s2),y2=g.K.y+r*Math.sin(s2);
        a.setAttribute("d","M"+x1.toFixed(1)+" "+y1.toFixed(1)+" A"+r.toFixed(1)+" "+r.toFixed(1)+" 0 0 1 "+x2.toFixed(1)+" "+y2.toFixed(1));a.style.opacity=(Math.min(1,p/.15)*Math.min(1,(1-p)/.25)).toFixed(3);},
        function(){a.remove();if(w===2)receive(l.i);});},w*210);})(w);}
  /* a train of beads of light, out along a link or back */
  function beads(k,inward){var l=L[k];if(!l||!l.len)return;var N=5;for(var j=0;j<N;j++)(function(j){var c=document.createElementNS(NS,"circle");c.setAttribute("r",(1.7-j*0.2).toFixed(2));c.setAttribute("class","lk-bead");G.appendChild(c);
      fly(1500,function(p){var s=Math.max(0,Math.min(1,p*1.25-j*0.06)),pt=l.track.getPointAtLength((inward?1-s:s)*l.len);c.setAttribute("cx",pt.x.toFixed(1));c.setAttribute("cy",pt.y.toFixed(1));
        c.style.opacity=(s<=0||s>=1?0:Math.min(1,s/.08)*Math.min(1,(1-s)/.1)*(1-j*0.14)).toFixed(3);},
        function(){c.remove();if(j===0){if(inward)glint(0);else receive(l.i);}});})(j);}
  function send(k,inward){if(cfStill()||!lay())return;if(LOOK==="waves"){if(inward)beads(k,true);else waves(k);}else if(LOOK==="beads")beads(k,inward);else pulse(k,inward);}
  var raf=0;function kick(){if(!raf)raf=requestAnimationFrame(frame);}
  function frame(now){raf=0;if(!document.contains(f)){RUN.forEach(function(x){x.end();});RUN=[];return;}
    RUN=RUN.filter(function(x){var p=Math.min(1,(now-x.t0)/x.dur);try{x.step(p);}catch(e){}if(p>=1){try{x.end();}catch(e){}return false;}return true;});if(RUN.length)kick();}
  /* now and then, while the drawing is seen, the Cloud is on and motion is allowed: out to each sphere in turn, and now and then back */
  var T=0,NX=0;
  function cycle(){clearTimeout(T);if(!on)return;if(LIVE&&!cfStill()&&document.contains(f)&&!document.hidden){var k=L.length>1?NX%2:0,inward=NX%5===3;NX++;send(k,inward);}
    if(document.contains(f)||!T)T=setTimeout(cycle,(LOOK==="waves"?2600:2200)+Math.random()*1200);}
  f.__live=function(v){LIVE=!!v;f.classList.toggle("lk-paused",!v);};f.__kick=function(){clearTimeout(T);T=setTimeout(cycle,300);};
  f.addEventListener("click",function(e){var b=e.target.closest&&e.target.closest(".clx-orb");if(!b||!f.contains(b))return;var i=+b.getAttribute("data-o"),who=WHO[i]||{},off=!on;
    if(i===0){flourish(b,["f-pulse","f-pop","f-hop"][CY[0]++%3]);if(!off&&lay()){for(var k=0;k<L.length;k++)send(k,false);}}
    else{flourish(b,["f-hop","f-wobble","f-pulse"][CY[i]++%3]);if(!off&&lay()){var kk=0;L.forEach(function(l,j){if(l.i===i)kk=j;});send(kk,true);}}
    tip(who.tip);if(off&&who.step&&opt.step)setTimeout(function(){opt.step(who.step);},450);});
  ORB.forEach(function(b){var o=b.querySelector(".clx-oxo"),mk=b.querySelector(".clx-omark");
    b.addEventListener("pointermove",function(e){if(e.pointerType!=="mouse"||cfStill())return;var r=o.getBoundingClientRect(),x=Math.max(-.5,Math.min(.5,(e.clientX-r.left)/r.width-.5)),y=Math.max(-.5,Math.min(.5,(e.clientY-r.top)/r.height-.5)),S=r.width;
      b.classList.add("hover");if(mk){mk.style.setProperty("--mx",(x*S*.16).toFixed(1)+"px");mk.style.setProperty("--my",(y*S*.12).toFixed(1)+"px");}},{passive:true});
    b.addEventListener("pointerleave",function(){b.classList.remove("hover");if(mk){mk.style.setProperty("--mx","0px");mk.style.setProperty("--my","0px");}});
    b.addEventListener("blur",function(){b.classList.remove("hover","down");});});
  f.addEventListener("pointerdown",function(e){var b=e.target.closest&&e.target.closest(".clx-orb");if(!b)return;b.classList.add("down");
    var W=window,up=function(){b.classList.remove("down");W.removeEventListener("pointerup",up,true);W.removeEventListener("pointercancel",up,true);};W.addEventListener("pointerup",up,true);W.addEventListener("pointercancel",up,true);},true);
  /* the scene leans toward the pointer (a mouse only): the spheres stand at their own depths, the links with them */
  f.addEventListener("pointermove",function(e){if(e.pointerType!=="mouse"||cfStill())return;var r=f.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;
    f.classList.add("leaning");f.style.setProperty("--cf-ry",(x*12).toFixed(2)+"deg");f.style.setProperty("--cf-rx",(y*-10).toFixed(2)+"deg");settle(200);},{passive:true});
  f.addEventListener("pointerleave",function(){f.classList.remove("leaning");f.style.setProperty("--cf-ry","0deg");f.style.setProperty("--cf-rx","0deg");settle(700);});
  /* the links are laid when the drawing is in the page and has its size, and again whenever its size changes */
  try{new ResizeObserver(function(){lay();}).observe(f);}catch(e){}
  (function first(n){if(lay()||n>40){f.setAttribute("data-s",d.state);return;}setTimeout(function(){first(n+1);},120);})(0);
  f.setAttribute("data-s",d.state);setTimeout(cycle,900);return f;}

/* the drawing's words, from what r255 keeps (read only) */
function figData(C,on,nc){var me=C.device,others=devices(C).filter(function(s){return s.device!==me;}),self=!!(C.box&&C.box.self);
  if(!on)return {state:"off",say:"Not linked yet: your work stays on each device.",
    keeper:{name:"Your computer",tip:"A computer of yours keeps your Cloud: step 2.",step:2},
    me:{name:"This device",tip:"This device joins with your passphrase: step 1.",step:1},
    far:{name:"Your others",tip:"Your others join through the computer: step 2.",step:2}};
  function dev(s){return {name:s.name||"Another device",tip:(s.name||"Another device")+" sent its work "+ago(s.got)+"."};}
  var kname=self?"This computer":(keeper(C)||"Your computer"),d={state:nc?"choose":"on",
    say:nc?("In step, and "+(nc===1?"one thing waits":nc+" things wait")+" for your choice."):"In step: sealed before it leaves each device.",
    keeper:{name:kname,tip:kname+" keeps your Cloud, sealed."}};
  if(self){if(others[0]){d.me=dev(others[0]);d.me.plain=true;}else d.me={name:"Your others",tip:"Your others join with this computer's pairing code.",plain:true};d.far=others[1]?dev(others[1]):null;}
  else{d.me={name:"This device",tip:"This device sent its work "+ago(at(C.lastPush))+"."};d.far=others[0]?dev(others[0]):null;}
  return d;}
var FIG=null,FSIG="";
function figure(C,on,nc){var d=figData(C,on,nc),sig=JSON.stringify(d);if(FIG&&sig===FSIG)return FIG;
  FSIG=sig;FIG=cfFigure(d,{look:"waves",sphere:function(look){try{return W.IngOrrery&&IngOrrery.sphere?IngOrrery.sphere(look):null;}catch(e){return null;}},
    step:function(n){var st=$("cloudCard")&&$("cloudCard").querySelectorAll(".cl-step")[n-1],h=st&&st.querySelector(":scope > h3");if(h&&!st.classList.contains("open"))h.click();}});return FIG;}
/* ---------- the right column's devices ---------- */
function devRows(C,on){var g=mk("div","clx-group clx-devgroup"),h=mk("div","mr-ghead");h.appendChild(mk("span","mr-orb g-way"));h.appendChild(D.createTextNode("In your Cloud"));g.appendChild(h);
  if(!on){g.appendChild(mk("div","clx-empty","No device is in your Cloud yet. Once it is on, each of your devices shows here with when it last sent its work."));return g;}
  var box=mk("div","clx-devs"),me=C.device;
  function row(cls,name,sub,size){var r=mk("div","clx-drow mr-pop "+cls);r.setAttribute("data-lean",".6");r.appendChild(mk("span","o"));var t=mk("span");t.appendChild(mk("b",null,name));t.appendChild(mk("small",null,sub));r.appendChild(t);r.appendChild(mk("em",null,size||""));box.appendChild(r);}
  if(C.box&&!C.box.self&&keeper(C))row("keep",keeper(C),"Keeps your Cloud","");
  var list=devices(C),mine=list.filter(function(s){return s.device===me;})[0];
  row("me","This device ("+(C.name||"this device")+")",(C.box&&C.box.self?"Keeps your Cloud · ":"")+"Sent "+ago(mine?mine.got:at(C.lastPush)),mine&&mine.bytes?mb(mine.bytes):"");
  list.filter(function(s){return s.device!==me;}).forEach(function(s){row("far",s.name||"Another device","Sent "+ago(s.got),s.bytes?mb(s.bytes):"");});
  g.appendChild(box);return g;}
/* ---------- dressing what r255 and r394 drew ---------- */
function dress(c){c.classList.add("clx-room","mr-pop");c.setAttribute("data-lean",".35");
  var C=cfg(),on=isOn(),nc=conflicts(c);c.setAttribute("data-s",on?(nc?"choose":"on"):"off");
  var h2=$("cloudH");if(h2)h2.classList.add("clx-sr");
  var top=c.querySelector(":scope > .clx-top");
  if(!top){top=mk("div","clx-top");var head=mk("div","clx-head"),eye=mk("div","mr-eye");eye.appendChild(mk("b",null,"Ingenium Cloud"));eye.appendChild(D.createTextNode("Sealed before it leaves each device"));
    head.appendChild(eye);var tt=mk("div","clx-title","Your work, on every device");tt.setAttribute("aria-hidden","true");head.appendChild(tt);top.appendChild(head);
    c.insertBefore(top,h2?h2.nextSibling:c.firstChild);}
  var hd=top.querySelector(".clx-head"),lede=c.querySelector(".cl-lede");if(lede&&lede.parentNode!==hd)hd.insertBefore(lede,hd.querySelector(".mr-counts"));
  var oc=hd.querySelector(".mr-counts");if(oc)oc.remove();hd.appendChild(counters(C,on,nc));
  var nf=figure(C,on,nc),of=top.querySelector(".clx-fig");if(of&&of!==nf)of.remove();if(nf.parentNode!==top){top.appendChild(nf);if(nf.__kick)nf.__kick();}
  /* the columns */
  var cols=c.querySelector(":scope > .clx-cols"),L,R;
  if(!cols){cols=mk("div","clx-cols");L=mk("div","clx-col clx-left");R=mk("div","clx-col clx-right");cols.appendChild(L);cols.appendChild(R);
    var g1=mk("div","clx-group clx-steps"),h1=mk("div","mr-ghead");h1.appendChild(mk("span","mr-orb g-project"));h1.appendChild(D.createTextNode("Three steps"));g1.appendChild(h1);L.appendChild(g1);
    var g3=mk("div","clx-group clx-awaygroup"),h3=mk("div","mr-ghead");h3.appendChild(mk("span","mr-orb g-you"));h3.appendChild(D.createTextNode("Away from home"));g3.appendChild(h3);R.appendChild(g3);
    top.parentNode.insertBefore(cols,top.nextSibling);}
  else{L=cols.querySelector(".clx-left");R=cols.querySelector(".clx-right");}
  var steps=L.querySelector(".clx-steps");
  [].forEach.call(c.querySelectorAll(".cl-step"),function(s){if(s.parentNode!==steps)steps.appendChild(s);s.classList.add("mr-pop");s.setAttribute("data-lean",".6");
    var hh=s.querySelector(":scope > h3");if(hh&&!hh.querySelector(".clx-chev"))hh.appendChild(chev());});
  /* the devices: r255's list is kept, hidden, and drawn as raised rows */
  [].forEach.call(c.querySelectorAll(".cl-devs"),function(u){var p=u.previousElementSibling;if(p&&p.classList.contains("cl-say")&&/^In your Cloud:?$/.test((p.textContent||"").trim()))p.classList.add("clx-devsay");});
  var od=R.querySelector(".clx-devgroup");if(od)od.remove();R.insertBefore(devRows(C,on),R.firstChild);
  var conf=c.querySelector("#clConf");if(conf&&conf.parentNode!==R)R.insertBefore(conf,R.querySelector(".clx-awaygroup"));
  if(conf&&conf.parentNode===R&&conf.nextElementSibling!==R.querySelector(".clx-awaygroup"))R.insertBefore(conf,R.querySelector(".clx-awaygroup"));
  if(conf)[].forEach.call(conf.querySelectorAll(".cf-row"),function(r){r.classList.add("mr-pop");r.setAttribute("data-lean",".5");});
  var more=c.querySelector("details.cl-more"),ag=R.querySelector(".clx-awaygroup");
  if(more){if(more.parentNode!==ag)ag.appendChild(more);more.classList.add("mr-pop");more.setAttribute("data-lean",".6");var su=more.querySelector(":scope > summary");
    if(su&&!su.querySelector(".clx-sync")){var t=(su.textContent||"").trim();su.textContent="";var o=mk("span","clx-sync","⇄");o.setAttribute("aria-hidden","true");su.appendChild(o);su.appendChild(mk("span",null,t));su.appendChild(chev());}}
  /* the foot */
  var tm=c.querySelector("#clTimes");if(tm&&tm.previousElementSibling!==cols)cols.parentNode.insertBefore(tm,cols.nextSibling);
  [].forEach.call(c.querySelectorAll(":scope > .btn.small"),function(b){var after=tm||cols;if(b.previousElementSibling!==after&&b.parentNode===c)c.insertBefore(b,after.nextSibling);});
  [].forEach.call(c.querySelectorAll(".btn.small"),function(b){b.classList.add("mr-pop");});
  if(!ROSE){ROSE=true;c.classList.add("clx-rise");setTimeout(function(){c.classList.remove("clx-rise");},900);}}
function arrange(){var c=$("cloudCard");if(!c||!c.closest||!c.closest("#page-memoria"))return;
  try{dress(c);}catch(e){warn(e);}if(MO)MO.takeRecords();}
var RAF=0;function soon(){if(RAF)return;RAF=requestAnimationFrame(function(){RAF=0;arrange();});}
/* watched: the card as r255 and r394 draw it; the figure moves only while the room is seen */
function watch(c){if(CARD===c)return;CARD=c;ROSE=false;if(MO)MO.disconnect();MO=new MutationObserver(soon);MO.observe(c,{childList:true,subtree:true});
  try{if(IO)IO.disconnect();IO=new IntersectionObserver(function(es){es.forEach(function(x){c.style.setProperty("--clx-run",x.isIntersecting?"running":"paused");if(FIG&&FIG.__live)FIG.__live(x.isIntersecting);});});IO.observe(c);}catch(e){}
  soon();}
function find(){var c=$("cloudCard");if(c&&c.closest&&c.closest("#page-memoria"))watch(c);}
/* the room's tab opened again: it rises again */
D.addEventListener("pointerdown",function(){var c=$("cloudCard");if(c)c.classList.remove("mr-pd");},true);
D.addEventListener("click",function(e){var t=e.target&&e.target.closest&&e.target.closest("#page-memoria .fxp-tab");if(t){ROSE=false;setTimeout(soon,30);}},true);
(function wait(n){find();if(!CARD||n<400)setTimeout(function(){wait(n+1);},CARD?3000:800);})(0);
W.IngCloudRoom={arrange:arrange};
try{window.__ingParts["p409"]="running";}catch(_){}
})();
</script>
