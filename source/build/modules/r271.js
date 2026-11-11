<style id="r271-css">
/* ============ R271 · MEMORY FROM HER CHATS (Ingenium 6.79, 11 November 2026) ============
   Her words: "I want Ingenium to build memory from its chats and not have to start from zero with every new chat." She approved the live
   preview on 11 November 2026 ("I approve of the preview, please push it everywhere"), after asking that nothing in it be flat ("I don't
   like everything being flat and not 3D animated").
   Measured on 6.78: Memory (R92, in the base) kept only what she asked it to keep ("remember that …", or the bookmark under one of her
   messages) and sent every item with every conversation, to every model, local or connected; nothing was learnt from her chats; the
   Memory window was a plain list in a dialog, opened from the chat's + menu.
   Now, on top of R92's store (state.memory, its items untouched):
   - with each message, the memories whose words fit it (best three) go to the model, with how she likes answers (two at most); a
     connected service gets them only if she turns that on;
   - a tray above the conversation shows what went with the newest reply: each memory can be left out of this chat; under each answer,
     Used N memories shows them again, and Remember keeps a reply as her own messages already could;
   - Learn from my chats: about a minute after a reply, while she is not typing, the model on this device notes what is worth keeping;
     each new memory waits for her (Keep, Not this) unless she turns asking off; it gives way at once when she types or presses;
   - Memory is a room of its own in Settings, Your data: switches, what waits, the memories in four groups (each card turns over to be
     changed), Forget with Undo, Forget everything asked on the page, the memory file kept from R92, and how it works.
   Every card, tray and key stands raised on its own edge, leans toward the pointer, lifts and sinks (keys sound, r176); what arrives
   rises, what leaves tips over and falls, a kept memory is carried to its group. Nothing is redrawn while the page is left alone. */
body{--mr-keyA:#ffffff;--mr-keyB:#f4f0fa;--mr-card2:#faf8fd;--mr-sunk:#ebe5f4;--mr-ink1:#231a31;--mr-ink2:#4c4360;--mr-ink3:#73698a;--mr-acc:#6a3fb5;
  --mr-pa:#7348be;--mr-pb:#5d37a1;--mr-pedge:#45277d;--mr-pamb:rgba(60,30,110,.26);--mr-hair:rgba(34,26,46,.11);--mr-hair2:rgba(34,26,46,.06);--mr-ring:rgba(106,63,181,.14);
  --mr-hi:rgba(255,255,255,.95);--mr-edge:rgba(66,40,108,.24);--mr-amb1:rgba(40,22,68,.13);--mr-amb2:rgba(40,22,68,.08);
  --mr-ok:#2a714d;--mr-okA:#effaf3;--mr-okB:#ddf0e5;--mr-okedge:#9ccdb2;--mr-warn:#83500c;--mr-warnA:#fff7ea;--mr-warnB:#fbebd0;--mr-warnedge:#e2c08c;
  --mr-slab0:#fdfbff;--mr-slab1:#ebe3f6;--mr-slabEdge:#d6cae8;
  --mr-pj1:#cdbcf0;--mr-pj2:#8a5fd0;--mr-pj3:#3d2275;--mr-wy1:#c4d7f0;--mr-wy2:#4e80bb;--mr-wy3:#1c3961;--mr-dt1:#f2c6d4;--mr-dt2:#b55a7b;--mr-dt3:#5b1f36;--mr-yu1:#c8ead8;--mr-yu2:#3f9a6c;--mr-yu3:#174a31;
  --mr-sh-card:inset 0 1px 0 var(--mr-hi),0 0 0 1px var(--mr-hair2),0 3px 0 var(--mr-edge),0 8px 12px var(--mr-amb1),0 18px 28px var(--mr-amb2);
  --mr-sh-cardhi:inset 0 1px 0 var(--mr-hi),0 0 0 1px var(--mr-hair2),0 5px 0 var(--mr-edge),0 12px 18px var(--mr-amb1),0 26px 38px var(--mr-amb2);
  --mr-sh-press:inset 0 2px 6px var(--mr-amb1),0 0 0 1px var(--mr-hair2),0 1px 0 var(--mr-edge),0 3px 6px var(--mr-amb2);
  --mr-sh-small:inset 0 1px 0 var(--mr-hi),0 0 0 1px var(--mr-hair2),0 2px 0 var(--mr-edge),0 5px 9px var(--mr-amb2);
  --mr-sh-smallhi:inset 0 1px 0 var(--mr-hi),0 0 0 1px var(--mr-hair2),0 4px 0 var(--mr-edge),0 9px 14px var(--mr-amb1);
  --mr-sh-key:inset 0 1px 0 var(--mr-hi),inset 0 -1.5px 0 var(--mr-amb2),0 0 0 1px var(--mr-hair),0 2px 0 var(--mr-edge),0 4px 6px var(--mr-amb1),0 9px 14px var(--mr-amb2);
  --mr-sh-keyhi:inset 0 1px 0 var(--mr-hi),inset 0 -1.5px 0 var(--mr-amb2),0 0 0 1px var(--mr-hair),0 3px 0 var(--mr-edge),0 6px 9px var(--mr-amb1),0 13px 20px var(--mr-amb2);
  --mr-sh-keypress:inset 0 2px 5px var(--mr-amb1),0 0 0 1px var(--mr-hair),0 1px 0 var(--mr-edge);
  --mr-sh-well:inset 0 2px 6px var(--mr-amb1),inset 0 0 0 1px var(--mr-hair2);
  --mr-sh-pkey:inset 0 1px 0 rgba(255,255,255,.22),inset 0 -2px 0 rgba(0,0,0,.14),0 2px 0 var(--mr-pedge),0 4px 6px var(--mr-pamb),0 9px 14px var(--mr-amb2);
  --mr-sh-pkeyhi:inset 0 1px 0 rgba(255,255,255,.24),inset 0 -2px 0 rgba(0,0,0,.14),0 3px 0 var(--mr-pedge),0 6px 9px var(--mr-pamb),0 13px 20px var(--mr-amb2);
  --mr-sh-ppress:inset 0 2px 6px rgba(0,0,0,.3),0 1px 0 var(--mr-pedge),0 3px 6px var(--mr-amb2)}
body[data-theme="night"]{--mr-keyA:#2b2339;--mr-keyB:#221b2f;--mr-card2:#272033;--mr-sunk:#140f1d;--mr-ink1:#ece4f8;--mr-ink2:#bcb0cf;--mr-ink3:#8d82a2;--mr-acc:#b496ff;
  --mr-pa:#7a56c8;--mr-pb:#5b3aa1;--mr-pedge:#24124a;--mr-pamb:rgba(0,0,0,.45);--mr-hair:rgba(205,184,240,.13);--mr-hair2:rgba(205,184,240,.07);--mr-ring:rgba(205,184,240,.12);
  --mr-hi:rgba(255,255,255,.07);--mr-edge:rgba(0,0,0,.72);--mr-amb1:rgba(0,0,0,.45);--mr-amb2:rgba(0,0,0,.3);
  --mr-ok:#86d6aa;--mr-okA:#1c3a2b;--mr-okB:#152e22;--mr-okedge:#0a1a12;--mr-warn:#f2bd6b;--mr-warnA:#3b2b14;--mr-warnB:#30230f;--mr-warnedge:#140d03;
  --mr-slab0:#1f172b;--mr-slab1:#130d1d;--mr-slabEdge:#07050b;
  --mr-pj1:#d9c9ff;--mr-pj2:#9a73e0;--mr-pj3:#2a1650;--mr-wy1:#cfe0ff;--mr-wy2:#6a9ad4;--mr-wy3:#132946;--mr-dt1:#ffd3e1;--mr-dt2:#cf7596;--mr-dt3:#45152a;--mr-yu1:#d2f5e3;--mr-yu2:#5fbf8d;--mr-yu3:#123826}

/* ---------- raised: leans toward the pointer, lifts under it, sinks when pressed ---------- */
.mr-pop{--lx:0deg;--ly:0deg;--lz:0px;--ls:1;transform:perspective(var(--mr-pp,900px)) rotateX(var(--ly)) rotateY(var(--lx)) translateY(var(--lz)) scale(var(--ls));
  transition:transform .5s cubic-bezier(.34,1.3,.64,1),box-shadow .3s ease}
.mr-pop.mr-ph{--lz:-3px}
.mr-pop.mr-pd{--lz:1px;--ls:.992;transition-duration:.09s}
.mr-c3{background:linear-gradient(var(--mr-keyA),var(--mr-keyB));box-shadow:var(--mr-sh-card)}
.mr-c3.mr-ph{box-shadow:var(--mr-sh-cardhi)}
.mr-c3.mr-pd{box-shadow:var(--mr-sh-press)}
.mr-key{display:inline-flex;align-items:center;justify-content:center;gap:7px;min-height:30px;padding:0 12px;border:0;border-radius:10px;cursor:pointer;white-space:nowrap;
  background:linear-gradient(var(--mr-keyA),var(--mr-keyB));color:var(--mr-ink1);font:600 12px/1 var(--sans);box-shadow:var(--mr-sh-key);user-select:none;-webkit-tap-highlight-color:transparent;
  transition:transform .35s cubic-bezier(.34,1.5,.64,1),box-shadow .2s ease}
.mr-key.mr-ph{--lz:-2px;box-shadow:var(--mr-sh-keyhi)}
.mr-key.mr-pd{--lz:1px;box-shadow:var(--mr-sh-keypress);transition-duration:.07s}
.mr-key.mr-primary{background:linear-gradient(var(--mr-pa),var(--mr-pb));color:#fff;text-shadow:0 1px 1px rgba(30,10,60,.3);box-shadow:var(--mr-sh-pkey)}
.mr-key.mr-primary.mr-ph{box-shadow:var(--mr-sh-pkeyhi)}
.mr-key.mr-primary.mr-pd{box-shadow:var(--mr-sh-ppress)}
.mr-key:focus-visible,.mt-head:focus-visible,.mr-tog:focus-visible{outline:2.5px solid var(--mr-acc);outline-offset:3px}
.mr-coin{display:inline-grid;place-items:center;min-width:28px;height:28px;padding:0 8px;border-radius:999px;flex:0 0 auto;background:linear-gradient(var(--mr-pa),var(--mr-pb));color:#fff;
  font:700 12.5px/1 var(--sans);font-variant-numeric:tabular-nums;box-shadow:inset 0 1px 0 rgba(255,255,255,.24),0 2px 0 var(--mr-pedge),0 4px 7px var(--mr-amb1)}
.mr-coin.mr-warm{background:linear-gradient(var(--mr-warnA),var(--mr-warnB));color:var(--mr-warn);box-shadow:inset 0 1px 0 var(--mr-hi),0 0 0 1px var(--mr-warnedge),0 2px 0 var(--mr-warnedge),0 4px 7px var(--mr-amb2)}
.mr-coin.mr-plain{background:linear-gradient(var(--mr-keyA),var(--mr-keyB));color:var(--mr-ink2);box-shadow:var(--mr-sh-small)}
.mr-coin.mr-mini{min-width:22px;height:22px;padding:0 6px;font-size:11px;letter-spacing:0}
.mr-orb{width:15px;height:15px;border-radius:50%;flex:0 0 auto;background:radial-gradient(circle at 36% 32%,var(--o1) 0%,var(--o2) 46%,var(--o3) 100%);box-shadow:0 2px 3px var(--mr-amb1)}
.mr-orb.g-project{--o1:var(--mr-pj1);--o2:var(--mr-pj2);--o3:var(--mr-pj3)}
.mr-orb.g-way{--o1:var(--mr-wy1);--o2:var(--mr-wy2);--o3:var(--mr-wy3)}
.mr-orb.g-date{--o1:var(--mr-dt1);--o2:var(--mr-dt2);--o3:var(--mr-dt3)}
.mr-orb.g-you{--o1:var(--mr-yu1);--o2:var(--mr-yu2);--o3:var(--mr-yu3)}
.mr-tx{min-width:0}
.mr-tx p{margin:0;font-size:13px;line-height:1.45;color:var(--mr-ink1);overflow-wrap:anywhere}
.mr-tx small{display:block;color:var(--mr-ink3);font-size:11.5px;margin-top:2px}
.mr-empty{padding:11px 13px;border-radius:13px;background:var(--mr-sunk);box-shadow:var(--mr-sh-well);color:var(--mr-ink3);font-size:12.5px}

/* ---------- the tray above the conversation ---------- */
#memTray{flex:0 0 auto;margin:2px 4px 8px;border-radius:18px;--mr-pp:1600px}
#memTray .mt-head{display:flex;align-items:center;gap:12px;width:100%;padding:10px 13px;border:0;border-radius:18px;background:none;cursor:pointer;text-align:left;color:var(--mr-ink1)}
#memTray .mt-what{flex:1 1 auto;min-width:0}
#memTray .mt-what b{display:block;font:600 13px/1.3 var(--sans)}
#memTray .mt-what small{display:block;color:var(--mr-ink3);font-size:11.5px;line-height:1.4}
#memTray .mt-chev{display:grid;place-items:center;width:26px;height:26px;border-radius:50%;flex:0 0 auto;background:linear-gradient(var(--mr-keyA),var(--mr-keyB));box-shadow:var(--mr-sh-small);
  color:var(--mr-ink3);font-size:11px;transition:transform .45s cubic-bezier(.34,1.4,.64,1)}
#memTray.mt-open .mt-chev{transform:rotate(90deg)}
#memTray .mt-list{display:grid;gap:9px;padding:0 13px 13px;max-height:min(260px,34vh);overflow-y:auto}
#memTray:not(.mt-open) .mt-list{display:none}
#memTray .mt-tok{display:grid;grid-template-columns:auto minmax(0,1fr) auto;gap:2px 11px;align-items:center;padding:9px 11px;border-radius:13px;background:linear-gradient(var(--mr-card2),var(--mr-keyB));box-shadow:var(--mr-sh-small)}
#memTray .mt-tok.mr-ph{box-shadow:var(--mr-sh-smallhi)}
#memTray .mt-tok.mr-pd{box-shadow:var(--mr-sh-press)}
#memTray .mt-tok.mt-lit{--lz:-3px;box-shadow:inset 0 1px 0 var(--mr-hi),0 0 0 2px var(--mr-okedge),0 4px 0 var(--mr-okedge),0 9px 14px var(--mr-amb1)}
#memTray .mt-foot{display:flex;justify-content:flex-end}
/* under an answer: what went with it, and Remember */
#page-chat .msg-act.mt-used{display:inline-flex;align-items:center;gap:6px;height:30px;padding:0 11px 0 9px;border-radius:9px;border:0;cursor:pointer;font:600 12px/1 var(--sans);
  background:linear-gradient(var(--mr-okA),var(--mr-okB));color:var(--mr-ok);box-shadow:inset 0 1px 0 var(--mr-hi),0 0 0 1px var(--mr-okedge),0 2px 0 var(--mr-okedge),0 4px 7px var(--mr-amb2);
  transition:transform .3s cubic-bezier(.34,1.5,.64,1),box-shadow .2s ease}
#page-chat .msg-act.mt-used:hover{transform:translateY(-2px);box-shadow:inset 0 1px 0 var(--mr-hi),0 0 0 1px var(--mr-okedge),0 3px 0 var(--mr-okedge),0 7px 11px var(--mr-amb1)}
#page-chat .msg-act.mt-used:active{transform:translateY(1px);box-shadow:inset 0 2px 4px var(--mr-amb1),0 0 0 1px var(--mr-okedge),0 1px 0 var(--mr-okedge);transition-duration:.07s}
#page-chat .msg-act.mt-used .mr-orb{width:11px;height:11px}
#page-chat .msg-act[data-mem].mt-kept{color:var(--mr-acc);box-shadow:inset 0 0 0 1.5px var(--mr-acc)}

/* ---------- the Memory room: Settings, Your data, Memory ---------- */
#memRoomCard{--mr-pp:2200px;border-radius:26px;border:0;background:radial-gradient(ellipse 80% 90% at 70% 30%,var(--mr-slab0) 0%,var(--mr-slab1) 82%);
  box-shadow:inset 0 1px 0 var(--mr-hi),0 0 0 1px var(--mr-ring),0 6px 0 var(--mr-slabEdge),0 22px 38px var(--mr-amb2),0 4px 10px var(--mr-amb2);padding:22px 20px;color:var(--mr-ink1)}
#memRoomCard .mr-eye{font:600 11px/1.2 var(--sans);letter-spacing:.26em;text-transform:uppercase;color:var(--mr-ink3)}
#memRoomCard .mr-eye b{color:var(--mr-acc);font-weight:600;margin-right:10px}
#memRoomCard h2.mr-h{font:600 34px/1.05 var(--serif);margin:8px 0 6px;color:var(--mr-ink1);text-shadow:0 1px 0 var(--mr-hi),0 2px 2px var(--mr-amb2);border:0;padding:0}
#memRoomCard .mr-say{margin:0;color:var(--mr-ink2);font-size:13.5px;max-width:66ch}
#memRoomCard .mr-room{display:grid;gap:18px;margin-top:16px}
#memRoomCard .mr-cols{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.15fr);gap:22px;align-items:start}
#memRoomCard .mr-col{display:grid;gap:16px;min-width:0}
#memRoomCard .mr-counts{display:flex;flex-wrap:wrap;gap:10px}
#memRoomCard .mr-count{display:inline-flex;align-items:center;gap:9px;padding:5px 14px 5px 5px;border-radius:999px;font:600 12.5px/1 var(--sans);color:var(--mr-ink2);
  background:linear-gradient(var(--mr-keyA),var(--mr-keyB));box-shadow:var(--mr-sh-key)}
#memRoomCard .mr-count.mr-ph{box-shadow:var(--mr-sh-keyhi)}
#memRoomCard .mr-sw{display:grid;grid-template-columns:auto minmax(0,1fr);gap:3px 14px;align-items:start;padding:13px 15px;border-radius:16px}
#memRoomCard .mr-sw b{font:600 13.5px/1.3 var(--sans);padding-top:3px;color:var(--mr-ink1)}
#memRoomCard .mr-sw small{grid-column:2;color:var(--mr-ink3);font-size:12px;line-height:1.45}
#memRoomCard .mr-tog{grid-row:1 / span 2;position:relative;width:52px;height:30px;border:0;padding:0;border-radius:999px;cursor:pointer;background:var(--mr-sunk);box-shadow:var(--mr-sh-well);transition:background-color .25s}
#memRoomCard .mr-tog[aria-checked="true"]{background:linear-gradient(var(--mr-pa),var(--mr-pb));box-shadow:inset 0 2px 5px rgba(20,6,50,.4),inset 0 0 0 1px var(--mr-pedge)}
#memRoomCard .mr-tog i{--kx:0px;--ky:0px;position:absolute;left:3px;top:3px;width:24px;height:24px;border-radius:999px;background:linear-gradient(var(--mr-keyA),var(--mr-keyB));
  box-shadow:inset 0 1px 0 var(--mr-hi),0 0 0 1px var(--mr-hair),0 2px 0 var(--mr-edge),0 3px 6px var(--mr-amb1);transform:translate(var(--kx),var(--ky));
  transition:transform .42s cubic-bezier(.34,1.55,.6,1),width .2s ease,box-shadow .2s ease}
#memRoomCard .mr-tog[aria-checked="true"] i{--kx:22px}
#memRoomCard .mr-tog:hover i{--ky:-1.5px;box-shadow:inset 0 1px 0 var(--mr-hi),0 3.5px 0 var(--mr-edge),0 6px 10px var(--mr-amb1)}
#memRoomCard .mr-tog:active i{width:30px;--ky:.5px;box-shadow:inset 0 1px 0 var(--mr-hi),0 1px 0 var(--mr-edge),0 2px 3px var(--mr-amb1)}
#memRoomCard .mr-tog[aria-checked="true"]:active i{--kx:16px}
#memRoomCard .mr-add{display:flex;gap:10px;align-items:center;padding:10px;border-radius:16px}
#memRoomCard .mr-well{flex:1 1 auto;min-width:0;border-radius:12px;background:var(--mr-sunk);box-shadow:var(--mr-sh-well);padding:0 10px}
#memRoomCard .mr-well:focus-within{box-shadow:var(--mr-sh-well),0 0 0 2px var(--mr-acc)}
#memRoomCard .mr-well input{width:100%;min-height:34px;border:0;outline:0;background:transparent;color:var(--mr-ink1);font:13.5px/1.4 var(--sans)}
#memRoomCard .mr-undo{display:flex;flex-wrap:wrap;gap:10px;align-items:center;padding:10px 13px;border-radius:14px;font-size:12.5px;color:var(--mr-ink2)}
#memRoomCard .mr-undo span{flex:1 1 200px;min-width:0}
#memRoomCard .mr-group{display:grid;gap:11px}
#memRoomCard .mr-ghead{display:flex;align-items:center;gap:9px;margin:2px 2px 0;font:600 11px/1.2 var(--sans);letter-spacing:.2em;text-transform:uppercase;color:var(--mr-ink3)}
#memRoomCard .mr-mems{display:grid;gap:13px}
#memRoomCard .mr-mem{position:relative;border-radius:16px}
#memRoomCard .mr-flip{display:grid;transform:perspective(1100px) rotateY(0deg);transform-style:preserve-3d;transition:transform .7s cubic-bezier(.3,1.25,.45,1)}
#memRoomCard .mr-mem.mr-editing .mr-flip{transform:perspective(1100px) rotateY(180deg)}
#memRoomCard .mr-face{grid-area:1 / 1;display:grid;grid-template-columns:auto minmax(0,1fr) auto;gap:4px 12px;align-items:center;padding:12px 14px;border-radius:16px;
  background:linear-gradient(var(--mr-keyA),var(--mr-keyB));box-shadow:var(--mr-sh-card);-webkit-backface-visibility:hidden;backface-visibility:hidden;transition:box-shadow .3s ease}
#memRoomCard .mr-mem.mr-ph .mr-face{box-shadow:var(--mr-sh-cardhi)}
#memRoomCard .mr-mem.mr-pd .mr-face{box-shadow:var(--mr-sh-press)}
#memRoomCard .mr-mem.mr-wait .mr-face{background:linear-gradient(var(--mr-warnA),var(--mr-warnB));box-shadow:inset 0 1px 0 var(--mr-hi),0 0 0 1px var(--mr-hair2),0 3px 0 var(--mr-warnedge),0 8px 12px var(--mr-amb1),0 18px 28px var(--mr-amb2)}
#memRoomCard .mr-mem.mr-wait.mr-ph .mr-face{box-shadow:inset 0 1px 0 var(--mr-hi),0 0 0 1px var(--mr-hair2),0 5px 0 var(--mr-warnedge),0 12px 18px var(--mr-amb1),0 26px 38px var(--mr-amb2)}
#memRoomCard .mr-mem.mr-flash .mr-face{box-shadow:inset 0 1px 0 var(--mr-hi),0 0 0 2px var(--mr-acc),0 5px 0 var(--mr-edge),0 12px 18px var(--mr-amb1)}
#memRoomCard .mr-back{transform:rotateY(180deg);grid-template-columns:minmax(0,1fr) auto}
#memRoomCard .mr-field{display:grid;gap:5px;min-width:0}
#memRoomCard .mr-field label{font:600 10.5px/1.2 var(--sans);letter-spacing:.16em;text-transform:uppercase;color:var(--mr-ink3)}
#memRoomCard .mr-field input{width:100%;min-height:34px;padding:6px 10px;border:0;border-radius:10px;background:var(--mr-sunk);box-shadow:var(--mr-sh-well);color:var(--mr-ink1);font:13.5px/1.4 var(--sans)}
#memRoomCard .mr-field input:focus{outline:2px solid var(--mr-acc);outline-offset:1px}
#memRoomCard .mr-acts{display:flex;gap:7px;align-items:center}
#memRoomCard .mr-forget{display:grid;gap:10px;justify-items:start}
#memRoomCard .mr-confirm{display:flex;flex-wrap:wrap;gap:10px;align-items:center;padding:13px 15px;border-radius:16px;color:var(--mr-warn);font-size:13px;transform-origin:50% 0;
  background:linear-gradient(var(--mr-warnA),var(--mr-warnB));box-shadow:inset 0 1px 0 var(--mr-hi),0 0 0 1px var(--mr-hair2),0 3px 0 var(--mr-warnedge),0 8px 12px var(--mr-amb1)}
#memRoomCard .mr-confirm span{flex:1 1 220px}
#memRoomCard .mr-files{display:flex;flex-wrap:wrap;gap:9px}
#memRoomCard .mr-how{display:grid;gap:12px;padding:16px;border-radius:19px}
#memRoomCard .mr-how > b{font:600 20px/1.2 var(--serif);color:var(--mr-ink1)}
#memRoomCard .mr-steps{list-style:none;margin:0;padding:0;display:grid;gap:10px}
#memRoomCard .mr-step{display:grid;grid-template-columns:auto minmax(0,1fr);gap:12px;align-items:center;padding:10px 13px 10px 10px;border-radius:14px;
  background:linear-gradient(var(--mr-card2),var(--mr-keyB));box-shadow:var(--mr-sh-small);color:var(--mr-ink2);font-size:13px;line-height:1.5}
#memRoomCard .mr-step.mr-ph{box-shadow:var(--mr-sh-smallhi)}
.mr-ticket{position:fixed;left:0;top:0;z-index:9500;display:flex;align-items:center;gap:8px;max-width:250px;padding:8px 12px;border-radius:12px;pointer-events:none;
  background:linear-gradient(var(--mr-keyA),var(--mr-keyB));box-shadow:var(--mr-sh-cardhi);font:600 12px/1.3 var(--sans);color:var(--mr-ink1)}
.mr-ticket span:last-child{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
@media (max-width:1100px){#memRoomCard .mr-cols{grid-template-columns:minmax(0,1fr)}}
@media (max-width:520px){#memRoomCard{padding:18px 13px;border-radius:22px}#memRoomCard h2.mr-h{font-size:29px}
  #memTray .mt-tok,#memRoomCard .mr-face{grid-template-columns:auto minmax(0,1fr)}#memTray .mt-tok .mr-key,#memRoomCard .mr-face .mr-acts{grid-column:1 / -1;justify-self:start}
  #memRoomCard .mr-back{grid-template-columns:minmax(0,1fr)}#memRoomCard .mr-back .mr-acts{grid-column:1}#memRoomCard .mr-add{flex-wrap:wrap}}
@media (prefers-reduced-motion:reduce){.mr-pop,.mr-key{transform:none !important;transition:none}#memRoomCard .mr-flip,#memTray .mt-chev,#memRoomCard .mr-tog i{transition:none}}
body[data-motion="minimal"] .mr-pop,body[data-motion="minimal"] .mr-key{transform:none !important;transition:none}
@media (forced-colors:active){#memTray,#memRoomCard,#memRoomCard .mr-face,#memTray .mt-tok{border:1px solid CanvasText}}
</style>
<script>try{(window.__ingParts=window.__ingParts||{})["p271"]="started";}catch(_){}
(function(){"use strict";var W=window,D=document;
if(typeof W.memState!=="function"||typeof W.memAdd!=="function"||W.IngChatMemory){try{W.__ingParts["p271"]="running";}catch(_){}return;}
function $(id){return D.getElementById(id);}
function mk(t,c,x){var e=D.createElement(t);if(c)e.className=c;if(x!=null)e.textContent=x;return e;}
function still(){try{return W.matchMedia("(prefers-reduced-motion: reduce)").matches||D.body.getAttribute("data-motion")==="minimal";}catch(e){return false;}}
function save(){try{W.saveState();}catch(e){}}
function toast(t){try{W.ingToast(t);}catch(e){}}
function plural(n,one,many){return n+" "+(n===1?one:many);}
var GROUPS={project:"Your projects",way:"How you like answers",date:"Dates and decisions",you:"About you"},ORDER=["project","way","date","you"];
/* R92's store, with what this part adds; her items stay as they were */
function M(){var s=W.memState();if(s.learn==null)s.learn=true;if(s.ask==null)s.ask=true;if(s.cloud==null)s.cloud=false;if(s.trayOpen==null)s.trayOpen=true;
  if(!Array.isArray(s.waiting))s.waiting=[];if(!s.skip||typeof s.skip!=="object")s.skip={};if(!s.noted||typeof s.noted!=="object")s.noted={};if(!Array.isArray(s.no))s.no=[];return s;}
function byId(id){var s=M(),i;for(i=0;i<s.items.length;i++)if(s.items[i].id===id)return s.items[i];return null;}
function newId(){return "m"+Date.now().toString(36)+Math.random().toString(36).slice(2,5);}

/* ---------- which group a memory belongs to ---------- */
var RX_DATE=/\b(due|deadline|exams?|appointments?|meetings?|interviews?|birthday|anniversary|tomorrow|tonight|next (week|month|year)|monday|tuesday|wednesday|thursday|friday|saturday|sunday|january|february|april|june|july|august|september|october|november|december|decided|decision|chose|chosen|agreed)\b|\b\d{1,2}(st|nd|rd|th)?\s+(of\s+)?(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)|\bmay \d/i;
var RX_WAY=/\b(prefers?|preferred|likes? (short|long|plain|clear|detailed|brief)|answers?|explain|explanations?|repl(y|ies)|tone|style|spelling|language|format|bullets?|plain words|examples?|step by step|(don'?t|do not) (use|want|like)|call me)\b/i;
var RX_PROJ=/\b(projects?|apps?|application|building|build|writing|essay|thesis|paper|book|chapter|research|study|studying|course|repo|code|coding|website|design|business|portfolio|dissertation|article|degree|phd)\b/i;
function groupOf(t){t=String(t||"");if(RX_DATE.test(t))return "date";if(RX_WAY.test(t))return "way";if(RX_PROJ.test(t))return "project";return "you";}
function gOf(it){return it&&it.g&&GROUPS[it.g]?it.g:groupOf(it&&it.text);}
function dayOf(at){try{var d=new Date(at||Date.now()),n=new Date();if(d.toDateString()===n.toDateString())return "today";return d.toLocaleDateString("en-GB",{day:"numeric",month:"long"});}catch(e){return "";}}
function quoted(t){t=String(t||"").trim();if(t.length>44)t=t.slice(0,42)+"…";return "“"+t+"”";}
function fromOf(it){var d=dayOf(it.at),c=it.chat?" "+quoted(it.chat):"";
  switch(it.how){case "asked":return "You asked Ingenium to remember this, "+d;case "key":return (it.chat?"Kept from the chat"+c:"Kept from a chat")+", "+d;
    case "noted":return (it.chat?"Noted from the chat"+c:"Noted from a chat")+", "+d;case "typed":return "Added in Memory, "+d;case "file":return "From a memory file, "+d;default:return "Kept, "+d;}}
function chatName(){try{var c=W.curChat(),t=c&&c.title;if(!t||/^new conversation$/i.test(String(t).trim()))t=c&&W.chatTitle(c);return String(t||"").replace(/\s+/g," ").trim().slice(0,60);}catch(e){return "";}}
function chatId(){try{return String(W.state.activeChat||"");}catch(e){return "";}}

/* ---------- which memories fit a message: shared words, the rarer the better ---------- */
var STOP={};("the and for are but not you your yours with this that these those there their they them then than have has had was were will would could should can cannot about into from what when where which who whom why how all any each few more most other some such only own same very just also too again here once out off over under above below between both being been does did doing done get got make made like want need please thanks thank hello okay yes its i'm i've i'll you're don't can't won't our ours ourselves him her his hers she one two now still even much many lot lots thing things way ways something anything everything tell know think help let")
  .split(" ").forEach(function(w){STOP[w]=1;});
function stem(w){if(w.length>5&&/ing$/.test(w))return w.slice(0,-3);if(w.length>4&&/ies$/.test(w))return w.slice(0,-3)+"y";if(w.length>4&&/es$/.test(w))return w.slice(0,-2);
  if(w.length>3&&/s$/.test(w)&&!/ss$/.test(w))return w.slice(0,-1);if(w.length>4&&/ed$/.test(w))return w.slice(0,-2);return w;}
function toks(s){var a=String(s||"").toLowerCase();try{a=a.normalize("NFD").replace(/[̀-ͯ]/g,"");}catch(e){}
  return (a.match(/[a-z0-9]{3,}/g)||[]).filter(function(w){return !STOP[w];}).map(stem);}
function skipped(cid){var s=M().skip[cid||chatId()];var o={};(Array.isArray(s)?s:[]).forEach(function(i){o[i]=1;});return o;}
function pick(text,cid){var s=M();if(!s.on||!s.items.length)return [];var sk=skipped(cid),q={},df={},N=s.items.length;toks(text).forEach(function(w){q[w]=1;});
  var docs=s.items.map(function(it){var d={};toks(it.text).forEach(function(w){d[w]=1;});Object.keys(d).forEach(function(w){df[w]=(df[w]||0)+1;});return d;});
  var sc=[];s.items.forEach(function(it,i){if(sk[it.id])return;var v=0;Object.keys(docs[i]).forEach(function(w){if(q[w])v+=Math.log(1+N/df[w]);});if(v>0)sc.push({it:it,v:v});});
  sc.sort(function(a,b){return b.v-a.v;});var out=sc.slice(0,3).map(function(x){return x.it;});
  s.items.filter(function(it){return !sk[it.id]&&gOf(it)==="way"&&out.indexOf(it)<0;}).slice(0,2).forEach(function(it){out.push(it);});
  return out;}
function cloudAnswers(){try{return W.chatSource()==="cloud"&&W.state.cloud&&W.state.cloud.on&&!!W.state.cloud.provider;}catch(e){return false;}}
function queryOf(msgs){var a=[];for(var i=msgs.length-1;i>=0&&a.length<2;i--){var x=msgs[i];if(x&&x.role==="me"&&x.text)a.push(String(x.text).slice(0,2000));}return a.join("\n");}
/* in place of R92's: the memories that fit go with the message (it is asked for as the instructions are made) */
var HEAD="What you know about the person from earlier conversations (kept on their device). Use it when it helps; do not repeat it back unless asked:\n";
W.memLayer=function(budget){var s=M();if(!s.on||!s.items.length)return "";var msgs=[];try{msgs=W.curMsgs()||[];}catch(e){}
  var last=msgs[msgs.length-1],live=last&&last.role==="bot"&&last.live?last:null;
  if(cloudAnswers()&&!s.cloud){if(live&&live.mem==null){live.mem=[];live.memOff=1;later();}return "";}
  var list=pick(queryOf(msgs)),cap=Math.max(400,Math.min(2400,Math.floor((+budget||6000)*0.12))),out=[],ids=[],n=0;
  list.forEach(function(it){var line="- "+it.text;if(n+line.length>cap)return;out.push(line);ids.push(it.id);n+=line.length+1;});
  if(live&&live.mem==null){live.mem=ids;later();}
  return out.length?HEAD+out.join("\n"):"";};
var LT=0;function later(){if(LT)return;LT=setTimeout(function(){LT=0;paintTray();},0);}

/* ---------- motion: what arrives rises, what moves glides, what leaves falls ---------- */
var EASE="cubic-bezier(.2,.8,.2,1)";
function riseIn(e,i,base){if(still()||!e.animate)return;e.animate([
    {transform:"perspective(800px) rotateX(-32deg) translateY(14px) scale(.96)",opacity:.25,transformOrigin:"50% 100%"},
    {transform:"perspective(800px) rotateX(0deg) translateY(0px) scale(1)",opacity:1,transformOrigin:"50% 100%"}],
  {duration:540,delay:(base||0)+Math.min(i,12)*42,easing:"cubic-bezier(.2,.9,.3,1.12)",fill:"backwards"});}
function fallAway(e){if(still()||!e||!e.isConnected||!e.animate)return Promise.resolve();return e.animate([
    {transform:"perspective(800px) rotateX(0deg) translateY(0px) scale(1)",opacity:1,transformOrigin:"50% 100%"},
    {transform:"perspective(800px) rotateX(80deg) translateY(12px) scale(.94)",opacity:0,transformOrigin:"50% 100%"}],
  {duration:380,easing:"cubic-bezier(.55,0,.8,.3)",fill:"forwards"}).finished.catch(function(){});}
function sinkAway(e){if(still()||!e||!e.isConnected||!e.animate)return Promise.resolve();return e.animate([
    {transform:"perspective(800px) translateZ(0px) translateY(0px)",opacity:1},{transform:"perspective(800px) translateZ(-140px) translateY(10px)",opacity:0}],
  {duration:420,easing:"cubic-bezier(.5,0,.75,.3)",fill:"forwards"}).finished.catch(function(){});}
function hop(e,n){if(still()||!e||!e.animate)return;var k=[];for(var i=0;i<(n||2);i++)k.push({transform:"translateY(0px)"},{transform:"translateY(-7px)"});k.push({transform:"translateY(0px)"});
  e.animate(k,{duration:380*(n||2),easing:"ease-in-out"});}
function snap(root){var m={};[].forEach.call(root.querySelectorAll("[data-mr-k]"),function(e){var r=e.getBoundingClientRect();if(r.width||r.height)m[e.getAttribute("data-mr-k")]=r;});return m;}
/* positions before and after a change: each piece glides from where it was, new ones rise */
function change(root,mutate,opt){opt=opt||{};if(!root||still()){mutate();return;}
  var before=snap(root),hs=[].concat(opt.height||[]).map(function(e){return [e,e.offsetHeight];});
  mutate();
  hs.forEach(function(p){var h1=p[0].offsetHeight;if(Math.abs(h1-p[1])>1&&p[0].animate)p[0].animate([{height:p[1]+"px",overflow:"hidden"},{height:h1+"px",overflow:"hidden"}],{duration:420,easing:EASE});});
  var all=[].slice.call(root.querySelectorAll("[data-mr-k]")),after=all.map(function(e){return e.getBoundingClientRect();}),n=0;
  all.forEach(function(e,i){var k=e.getAttribute("data-mr-k"),b=before[k],a=after[i];if(!a.width&&!a.height)return;
    if(!b){if(!(opt.skip&&opt.skip.indexOf(k)>=0))riseIn(e,n++,opt.base);return;}
    var dx=b.left-a.left,dy=b.top-a.top,p=e.parentElement&&e.parentElement.closest("[data-mr-k]");
    if(p&&root.contains(p)){var pb=before[p.getAttribute("data-mr-k")],pa=p.getBoundingClientRect();if(pb){dx-=pb.left-pa.left;dy-=pb.top-pa.top;}}
    if(Math.abs(dx)<1&&Math.abs(dy)<1)return;if(!e.animate)return;
    if(opt.lift===k){e.style.position="relative";e.style.zIndex="5";
      e.animate([{transform:"translate("+dx+"px,"+dy+"px) scale(1)"},{transform:"translate("+(dx*.5)+"px,"+(dy*.5-28)+"px) scale(1.05)",offset:.45},{transform:"translate(0px,0px) scale(1)"}],
        {duration:760,easing:"cubic-bezier(.35,.1,.25,1)"}).finished.catch(function(){}).then(function(){e.style.position="";e.style.zIndex="";});return;}
    e.animate([{transform:"translate("+dx+"px,"+dy+"px)"},{transform:"translate(0px,0px)"}],{duration:420,easing:EASE});});}
/* a number on a coin turns over to show the new one */
function setCoin(c,v){if(!c)return;var b=c.querySelector("b"),s=String(v);if(!b||b.textContent===s)return;if(still()||!c.animate||!c.isConnected){b.textContent=s;return;}
  c.animate([{transform:"perspective(300px) rotateY(0deg)"},{transform:"perspective(300px) rotateY(90deg)"}],{duration:140,easing:"ease-in"}).finished.catch(function(){}).then(function(){b.textContent=s;
    c.animate([{transform:"perspective(300px) rotateY(-90deg)"},{transform:"perspective(300px) rotateY(0deg)"}],{duration:260,easing:"cubic-bezier(.2,.9,.3,1.35)"});});}
function coin(cls,v){var c=mk("span","mr-coin"+(cls?" "+cls:""));c.appendChild(mk("b",null,String(v)));return c;}
function orb(g){var o=mk("span","mr-orb g-"+g);o.setAttribute("aria-hidden","true");return o;}
/* a ticket carries what she keeps from where she pressed to the tray */
function fly(from,to,it){if(still()||!from||!to||!to.isConnected)return Promise.resolve();var a=from.getBoundingClientRect(),b=to.getBoundingClientRect();
  if(!b.width||b.bottom<0||b.top>W.innerHeight||a.bottom<0||a.top>W.innerHeight)return Promise.resolve();
  var t=mk("div","mr-ticket");t.setAttribute("aria-hidden","true");t.appendChild(orb(gOf(it)));t.appendChild(mk("span",null,it.text));D.body.appendChild(t);
  var w=t.offsetWidth,h=t.offsetHeight,x0=a.left+a.width/2-w/2,y0=a.top+a.height/2-h/2,dx=b.left+b.width/2-w/2-x0,dy=b.top+b.height/2-h/2-y0,up=-Math.max(60,Math.abs(dy)*.18);
  t.style.left=x0+"px";t.style.top=y0+"px";
  return t.animate([{transform:"translate(0px,0px) rotate(-6deg) scale(.6)",opacity:0},
      {transform:"translate("+(dx*.12)+"px,"+(dy*.12+up*.6)+"px) rotate(-3deg) scale(1)",opacity:1,offset:.2},
      {transform:"translate("+(dx*.6)+"px,"+(dy*.6+up)+"px) rotate(4deg) scale(.95)",opacity:1,offset:.6},
      {transform:"translate("+dx+"px,"+dy+"px) rotate(0deg) scale(.25)",opacity:.15}],{duration:820,easing:"cubic-bezier(.45,.05,.4,1)"}).finished.catch(function(){}).then(function(){t.remove();});}
function key(txt,cls,fn,label){var b=mk("button","mr-key mr-pop"+(cls?" "+cls:""),txt);b.type="button";if(label)b.setAttribute("aria-label",label);b.addEventListener("click",fn);return b;}

/* ---------- leaning toward the pointer, lifting under it, sinking when pressed ---------- */
var LP=null,RAF=0,LIT=[],PRESSED=null;
function rest(p){p.classList.remove("mr-ph");p.style.removeProperty("--lx");p.style.removeProperty("--ly");}
function lean(){RAF=0;var e=LP;if(!e)return;var pops=[];
  if(!still()){var n=e.target&&e.target.closest?e.target.closest(".mr-pop"):null;while(n){pops.push(n);n=n.parentElement?n.parentElement.closest(".mr-pop"):null;}}
  LIT.forEach(function(p){if(pops.indexOf(p)<0)rest(p);});
  pops.forEach(function(p){var r=p.getBoundingClientRect();if(!r.width)return;var x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5,
      m=Math.min(7,Math.max(1.4,1500/r.width))*(+(p.getAttribute("data-lean")||1));
    p.style.setProperty("--lx",(x*2*m).toFixed(2)+"deg");p.style.setProperty("--ly",(-y*2*m).toFixed(2)+"deg");p.classList.add("mr-ph");});
  LIT=pops;}
D.addEventListener("pointermove",function(e){if(e.pointerType!=="mouse")return;if(!LIT.length&&!(e.target&&e.target.closest&&e.target.closest(".mr-pop")))return;LP=e;if(!RAF)RAF=requestAnimationFrame(lean);},{passive:true});
D.addEventListener("pointerdown",function(e){var t=e.target;if(!t||!t.closest||t.closest(".mr-tog,input,textarea"))return;var k=t.closest(".mr-key,.mr-pop");if(k&&k.id!=="memRoomCard"){k.classList.add("mr-pd");PRESSED=k;}},true);
["pointerup","pointercancel"].forEach(function(n){D.addEventListener(n,function(){if(PRESSED){PRESSED.classList.remove("mr-pd");PRESSED=null;}},true);});
D.addEventListener("keydown",function(e){var k=e.target;if((e.key==="Enter"||e.key===" ")&&k&&k.classList&&k.classList.contains("mr-key"))k.classList.add("mr-pd");},true);
D.addEventListener("keyup",function(e){var k=e.target;if(k&&k.classList)k.classList.remove("mr-pd");},true);

/* ---------- the tray above the conversation ---------- */
var SHOWN=null;   /* the answer whose memories she asked to see (Used N memories), until the next reply */
function latestReply(msgs){for(var i=msgs.length-1;i>=0;i--){var x=msgs[i];if(x&&x.role==="bot"&&x.mem!=null)return x;}return null;}
function modelName(){try{var m=(W.state.models||[]).filter(function(x){return x.id===W.state.activeModelId;})[0];return m?String(m.customName||"the model"):"the model";}catch(e){return "the model";}}
function trayView(){var s=M(),msgs=[];try{msgs=W.curMsgs()||[];}catch(e){}var rep=SHOWN&&msgs.indexOf(SHOWN)>=0?SHOWN:latestReply(msgs),sk=skipped();
  if(!rep&&!s.items.length)return {ids:[],name:plural(s.waiting.length,"memory waits","memories wait")+" for you in Memory",where:"Keep the ones you want there, and they will go with the messages they fit.",count:0};
  if(!rep)return {ids:[],name:"Ingenium remembers "+plural(s.items.length,"thing","things"),where:"The ones that fit your message go with it to "+(cloudAnswers()&&!s.cloud?"a model on this device, never to a connected service.":modelName()+", on this device."),count:s.items.length};
  if(rep.memOff)return {ids:[],name:"Your memories stayed on this device",where:"A connected service answers this chat. To send the memories that fit, turn on Use memories with a connected service, in Memory.",count:0};
  var ids=(rep.mem||[]).filter(function(id){return byId(id)&&!sk[id];});
  return {ids:ids,name:ids.length?"Ingenium remembered "+plural(ids.length,"thing","things")+" for "+(rep===SHOWN?"this answer":"this chat"):"Nothing Ingenium remembers fits this message",
    where:ids.length?"Only you see this list. They went with your message to "+(cloudAnswers()?"the service you connected.":modelName()+", on this device."):"When a message fits something you talked about before, it shows here.",count:ids.length};}
function trayEl(){var t=$("memTray");if(t)return t;var sc=$("chatScroll");if(!sc||!sc.parentElement)return null;
  t=mk("div","mr-pop mr-c3");t.id="memTray";t.setAttribute("data-lean",".5");
  var h=mk("button","mt-head");h.type="button";h.setAttribute("aria-controls","memTrayList");
  var c=coin("","0");c.classList.add("mt-coin");var w=mk("span","mt-what");w.appendChild(mk("b","mt-name"));w.appendChild(mk("small","mt-where"));
  var ch=mk("span","mt-chev","▸");ch.setAttribute("aria-hidden","true");h.appendChild(c);h.appendChild(w);h.appendChild(ch);
  h.addEventListener("click",function(){var s=M();change(t,function(){s.trayOpen=!s.trayOpen;t.classList.toggle("mt-open",s.trayOpen);h.setAttribute("aria-expanded",String(s.trayOpen));},{height:t});save();});
  var l=mk("div","mt-list");l.id="memTrayList";t.appendChild(h);t.appendChild(l);sc.parentElement.insertBefore(t,sc);return t;}
function paintTray(){var s=M(),sc=$("chatScroll"),t=$("memTray");
  if(!sc||!s.on||(!s.items.length&&!s.waiting.length)){if(t&&!t.hidden)t.hidden=true;return;}
  t=trayEl();if(!t)return;var v=trayView(),sig=JSON.stringify([v,s.trayOpen,v.ids.map(function(id){var it=byId(id);return it?it.text:"";})]);
  if(t.hidden)t.hidden=false;if(t.__sig===sig)return;t.__sig=sig;
  t.classList.toggle("mt-open",!!s.trayOpen);var h=t.querySelector(".mt-head");h.setAttribute("aria-expanded",String(!!s.trayOpen));
  setCoin(t.querySelector(".mt-coin"),v.count);t.querySelector(".mt-name").textContent=v.name;t.querySelector(".mt-where").textContent=v.where;
  var l=$("memTrayList");l.replaceChildren();
  v.ids.forEach(function(id){var it=byId(id),r=mk("div","mt-tok mr-pop");r.setAttribute("data-mr-k","tok-"+id);r.setAttribute("data-mid",id);
    var tx=mk("div","mr-tx");tx.appendChild(mk("p",null,it.text));tx.appendChild(mk("small",null,fromOf(it)));r.appendChild(orb(gOf(it)));r.appendChild(tx);
    r.appendChild(key("Not for this chat","",function(){leaveOut(it,r);},"Leave out of this chat: "+it.text));l.appendChild(r);});
  if(!v.ids.length){var e=mk("div","mr-empty",M().items.length?"Ask anything: the memories that fit your message will show here.":"Nothing is kept yet. Memory, in Settings, Your data, shows what waits for you.");e.setAttribute("data-mr-k","tok-none");l.appendChild(e);}
  var f=mk("div","mt-foot");f.setAttribute("data-mr-k","tray-foot");f.appendChild(key("See all in Memory","",function(){openRoom();}));l.appendChild(f);}
function leaveOut(it,r){var cid=chatId();fallAway(r).then(function(){var s=M(),a=Array.isArray(s.skip[cid])?s.skip[cid]:(s.skip[cid]=[]);if(a.indexOf(it.id)<0)a.push(it.id);save();
  var t=$("memTray");change(t,function(){paintTray();},{height:t});toast("Left out of this chat. It stays in Memory.");});}
function lightUsed(ids,on){[].forEach.call(D.querySelectorAll("#memTrayList .mt-tok"),function(t){t.classList.toggle("mt-lit",!!on&&ids.indexOf(t.getAttribute("data-mid"))>=0);});}
function showUsed(mm){var s=M(),t=trayEl();if(!t)return;var live=(mm.mem||[]).filter(function(id){return byId(id);});
  if(!live.length){toast("Those memories are no longer kept.");return;}
  change(t,function(){SHOWN=mm;s.trayOpen=true;paintTray();},{height:t});save();
  setTimeout(function(){live.forEach(function(id){hop(D.querySelector('#memTrayList .mt-tok[data-mid="'+id+'"]'),2);});lightUsed(live,true);setTimeout(function(){lightUsed(live,false);},1300);},still()?0:300);}

/* ---------- under each message: Remember; under each answer: Used N memories ---------- */
function gist(mm){var t="";if(mm.role==="me")t=W.memClean?W.memClean(mm.text):String(mm.text||"");
  else{var d=mk("div");try{d.innerHTML=W.chatMd(mm.text);}catch(e){d.textContent=mm.text;}t=d.textContent.replace(/\s+/g," ").trim();
    var m=/^[\s\S]{12,}?[.!?](?=\s|$)/.exec(t),a=m?m[0]:t;if(a.length<60&&t.length>a.length){var m2=/^[\s\S]{12,}?[.!?](?=\s|$)/.exec(t.slice(a.length).trim());if(m2)a=a+" "+m2[0];}t=a;}
  t=String(t).trim();if(t.length>240)t=t.slice(0,237).replace(/\s+\S*$/,"")+"…";return t;}
function keepFrom(mm,btn){var ex=mm.memKept&&byId(mm.memKept);if(ex){openRoom(ex.id);return;}
  var it=W.memAdd(gist(mm),"key");if(!it){toast("There is nothing in that message to keep.");return;}
  if(!it.g)it.g=groupOf(it.text);if(!it.chat)it.chat=chatName();if(!it.src)it.src=chatId();mm.memKept=it.id;save();
  markKept(btn,true);var t=trayEl();if(t&&t.hidden)paintTray();t=$("memTray");
  fly(btn,t&&!t.hidden?t.querySelector(".mt-coin"):null,it).then(function(){paintTray();paintRoom();toast("Kept in Memory, under "+GROUPS[gOf(it)]+".");});}
function markKept(b,on){if(!b)return;b.classList.toggle("mt-kept",!!on);b.setAttribute("aria-pressed",on?"true":"false");
  b.title=on?"Kept in Memory. Press to see it.":(b.getAttribute("data-mem-who")==="bot"?"Remember this answer":"Remember this message");}
function decorate(d,mm){var s=M();if(!d||!mm||mm.live||mm.preview||!mm.text)return;
  var acts=null;[].forEach.call(d.children,function(c){if(c.classList&&c.classList.contains("msg-acts"))acts=c;});if(!acts)return;
  var b=acts.querySelector("[data-mem]");
  if(!b&&mm.role==="bot"&&s.on){b=mk("button","msg-act","Remember");b.type="button";b.setAttribute("data-mem","1");
    b.setAttribute("data-mk-q","1");b.classList.add("mk-ik");b.setAttribute("data-mk-k","mem");b.setAttribute("data-mk-l","Remember");
    var ref=acts.querySelector(".blx-chk");if(ref)acts.insertBefore(b,ref);else acts.appendChild(b);}
  if(b){b.setAttribute("data-mem-who",mm.role==="bot"?"bot":"me");b.onclick=function(ev){if(ev)ev.preventDefault();keepFrom(mm,b);};markKept(b,!!(mm.memKept&&byId(mm.memKept)));}
  var ids=mm.role==="bot"&&Array.isArray(mm.mem)?mm.mem.filter(function(id){return byId(id);}):[],u=acts.querySelector(".mt-used");
  if(ids.length&&s.on){if(!u){u=mk("button","msg-act mt-used");u.type="button";u.setAttribute("data-mk-q","1");u.appendChild(orb("way"));u.appendChild(mk("span"));acts.insertBefore(u,acts.firstChild);
      u.addEventListener("pointerenter",function(){lightUsed(mm.mem||[],true);});u.addEventListener("pointerleave",function(){lightUsed(mm.mem||[],false);});
      u.addEventListener("focus",function(){lightUsed(mm.mem||[],true);});u.addEventListener("blur",function(){lightUsed(mm.mem||[],false);});}
    u.lastChild.textContent="Used "+plural(ids.length,"memory","memories");u.title="The memories that went with your message for this answer";u.onclick=function(){showUsed(mm);};}
  else if(u)u.remove();}
(function wrapFill(){var of=W.fillMsg;if(typeof of!=="function")return;W.fillMsg=function(d,mm,keep){var r=of.apply(this,arguments);try{decorate(d,mm);}catch(e){}return r;};})();
(function wrapRender(){var or=W.renderChat;if(typeof or!=="function")return;var nr=function(){var r=or.apply(this,arguments);try{var msgs=W.curMsgs()||[],x=msgs[msgs.length-1];if(SHOWN&&x&&x.role==="bot"&&x!==SHOWN&&x.mem!=null)SHOWN=null;paintTray();noteSoon();}catch(e){}return r;};
  try{Object.keys(or).forEach(function(k){nr[k]=or[k];});}catch(e){}W.renderChat=nr;})();

/* ---------- Learn from my chats: the model on this device notes what is worth keeping, when she is not chatting ---------- */
var IDLE=60000,NT=0,NOTING=false,NOTE_P=Promise.resolve(),AB=null,LAST=0;
var ASK_SYS="You keep a short memory about one person, from their conversations with an assistant. Read the conversation and write only facts about the person that will still help in later conversations: their projects and work, how they like answers, and dates or decisions. Write each fact on its own line, starting with PROJECT:, WAY:, DATE: or YOU:, as one short sentence that begins with \"You\" or \"Your\" (for example: DATE: Your essay is due on 13 November.). Write at most 4 lines. Leave out anything about the assistant, general knowledge, passwords, health, money and other private details unless the person asked you to remember them. If nothing is worth keeping, write NONE.";
function chatShown(){var p=$("page-chat");return !!(p&&p.offsetParent!==null);}
function noteSoon(){clearTimeout(NT);NT=0;var s=M();if(!s.on||!s.learn)return;NT=setTimeout(noteNow,IDLE);}
function freshOf(cid,msgs){var from=+(M().noted[cid]||0);if(!(from>=0&&from<=msgs.length))from=0;
  return msgs.slice(from).filter(function(x){return x&&!x.live&&!x.preview&&!x.wake&&x.text&&(x.role==="me"||x.role==="bot");});}
function convoOf(fresh){var lines=fresh.map(function(x){var t=String(x.text).replace(/<think>[\s\S]*?<\/think>/gi,"").replace(/\s+/g," ").trim(),cap=x.role==="me"?700:300;
    if(t.length>cap)t=t.slice(0,cap)+" …";return (x.role==="me"?"Person: ":"Assistant: ")+t;}),out=[],n=0;
  for(var i=lines.length-1;i>=0;i--){if(n+lines[i].length>4000)break;out.unshift(lines[i]);n+=lines[i].length+1;}return out.join("\n");}
function noteNow(){NT=0;var s=M();if(NOTING||!s.on||!s.learn)return;
  try{if(W.Engine.status!=="ready"||!W.Engine.modelId||W.liveBot||!W.Engine.adapter)return;}catch(e){return;}
  if(!chatShown())return;if(Date.now()-LAST<90000){NT=setTimeout(noteNow,90000-(Date.now()-LAST));return;}
  var inp=$("chatInput");if(inp&&String(inp.value||"").trim()){NT=setTimeout(noteNow,IDLE);return;}
  var cid=chatId(),msgs=[];try{msgs=W.curMsgs()||[];}catch(e){}if(!cid||!msgs.length)return;
  var fresh=freshOf(cid,msgs),mine=fresh.filter(function(x){return x.role==="me"&&String(x.text).trim().length>=12;}),upto=msgs.length;
  if(!mine.length){if(s.noted[cid]!==upto){s.noted[cid]=upto;save();}return;}
  var params={temperature:0.2,top_p:0.9};try{var m=(W.state.models||[]).filter(function(x){return x.id===W.Engine.modelId;})[0];if(m&&typeof W.modelSampling==="function"){var b=W.modelSampling(m,2,false);if(b)params=Object.assign({},b);}}catch(e){}
  params=Object.assign(params,{temperature:0.2,max_tokens:220,thinking:false});
  var out="",ab={stopped:false};AB=ab;NOTING=true;LAST=Date.now();var name=chatName();
  try{W.Engine.setStatus("busy");}catch(e){}
  NOTE_P=Promise.resolve().then(function(){return W.Engine.generate({messages:[{role:"system",content:ASK_SYS},{role:"user",content:"Conversation:\n"+convoOf(fresh)}],params:params,onToken:function(t){out+=t;},onThink:function(){}});})
    .then(function(res){if(!out&&res&&res.text)out=res.text;return out;})
    .then(function(text){done();if(ab.stopped)return;take(text,cid,upto,name);},function(){done();if(ab.stopped)return;M().noted[cid]=upto;save();});
  function done(){NOTING=false;AB=null;try{if(W.Engine.status==="busy"&&!W.liveBot)W.Engine.setStatus("ready");}catch(e){}}}
function stopNoting(){if(!NOTING||!AB)return;AB.stopped=true;try{if(W.Engine.adapter&&W.Engine.adapter.abort)W.Engine.adapter.abort();}catch(e){}}
function norm(t){return toks(t).sort().join(" ");}
function alike(a,b){var A={},B={},n=0,u=0;toks(a).forEach(function(w){A[w]=1;});toks(b).forEach(function(w){B[w]=1;});Object.keys(A).forEach(function(w){u++;if(B[w])n++;});Object.keys(B).forEach(function(w){if(!A[w])u++;});return u?n/u:0;}
function known(t){var s=M(),all=s.items.concat(s.waiting),i;for(i=0;i<all.length;i++)if(alike(all[i].text,t)>=0.6)return true;var k=norm(t);return s.no.indexOf(k)>=0;}
function take(text,cid,upto,name){var s=M(),got=[];String(text||"").replace(/<think>[\s\S]*?<\/think>/gi,"").split(/\n+/).forEach(function(line){
    var m=/^\s*[-*•\d.)\s]*\**(PROJECT|WAY|DATE|YOU)\**\s*:\s*(.+?)\s*$/i.exec(line);if(!m||got.length>=4)return;var t=m[2].replace(/^["“]|["”]$/g,"").trim();
    if(t.length<8||t.length>240||/^none\b/i.test(t)||known(t)||got.some(function(x){return alike(x.text,t)>=0.6;}))return;
    got.push({id:newId(),text:t.charAt(0).toUpperCase()+t.slice(1),at:Date.now(),how:"noted",g:({project:"project",way:"way",date:"date",you:"you"})[m[1].toLowerCase()],chat:name,src:cid});});
  s.noted[cid]=upto;
  if(got.length){if(s.ask)got.slice().reverse().forEach(function(it){s.waiting.unshift(it);});else got.slice().reverse().forEach(function(it){s.items.unshift(it);});}
  save();if(!got.length)return;paintTray();paintRoom();
  toast(s.ask?"Ingenium noted "+plural(got.length,"thing","things")+" from this chat. "+(got.length===1?"It waits":"They wait")+" for you in Memory (Settings, Your data).":"Ingenium kept "+plural(got.length,"thing","things")+" from this chat in Memory.");}
/* she comes back: the noting gives way at once, and a message she sends goes as soon as the engine is free */
D.addEventListener("keydown",function(e){if(!NOTING)return;var t=e.target;
  if(t&&t.id==="chatInput"&&e.key==="Enter"&&!e.shiftKey){e.preventDefault();e.stopImmediatePropagation();stopNoting();NOTE_P.then(function(){try{W.sendChat();}catch(_){}});return;}
  stopNoting();},true);
D.addEventListener("click",function(e){if(!NOTING)return;var b=e.target&&e.target.closest&&e.target.closest("#chatSend");
  if(b){e.preventDefault();e.stopImmediatePropagation();stopNoting();NOTE_P.then(function(){try{W.sendChat();}catch(_){}});}},true);
D.addEventListener("pointerdown",function(e){if(NOTING&&!(e.target&&e.target.closest&&e.target.closest("#chatSend")))stopNoting();},true);
try{W.Engine.on("status",function(st){if(st==="ready"&&!NOTING)noteSoon();});}catch(e){}

/* ---------- the Memory room: Settings, Your data, Memory ---------- */
var CONFIRM=false,EDIT=null,FLASH=null;
function roomCard(){var c=$("memRoomCard");if(c)return c;var pn=$("rmP-settings-data");if(!pn)return null;
  c=mk("section","card mr-pop");c.id="memRoomCard";c.setAttribute("data-lean",".25");c.setAttribute("aria-label","Memory");pn.appendChild(c);paintRoom(true);return c;}
function sw(id,title,says,get,set){var w=mk("div","mr-sw mr-c3 mr-pop");w.setAttribute("data-mr-k","sw-"+id);var b=mk("button","mr-tog");b.type="button";b.id="memSw-"+id;b.setAttribute("role","switch");
  b.setAttribute("aria-checked",get()?"true":"false");b.setAttribute("aria-labelledby","memSwT-"+id);b.appendChild(mk("i"));var t=mk("b",null,title);t.id="memSwT-"+id;
  b.addEventListener("click",function(){var on=b.getAttribute("aria-checked")!=="true";b.setAttribute("aria-checked",String(on));set(on);save();paintTray();});
  w.appendChild(b);w.appendChild(t);w.appendChild(mk("small",null,says));return w;}
function empty(k,txt){var e=mk("div","mr-empty",txt);e.setAttribute("data-mr-k",k);return e;}
function memEl(it,waiting){var r=mk("div","mr-mem mr-pop"+(waiting?" mr-wait":""));r.setAttribute("data-mr-k","mem-"+it.id);r.setAttribute("data-mid",it.id);
  var flip=mk("div","mr-flip"),front=mk("div","mr-face mr-front"),tx=mk("div","mr-tx"),acts=mk("div","mr-acts");tx.appendChild(mk("p",null,it.text));tx.appendChild(mk("small",null,fromOf(it)));
  if(waiting){acts.appendChild(key("Keep","mr-primary",function(){keepIt(it);},"Keep: "+it.text));acts.appendChild(key("Not this","",function(){notThis(it,r);},"Do not keep: "+it.text));}
  else{acts.appendChild(key("Edit","",function(){startEdit(it,r);},"Edit: "+it.text));acts.appendChild(key("Forget","",function(){forget(it,r);},"Forget: "+it.text));}
  front.appendChild(orb(gOf(it)));front.appendChild(tx);front.appendChild(acts);flip.appendChild(front);
  if(!waiting){var back=mk("div","mr-face mr-back"),f=mk("div","mr-field"),lab=mk("label",null,"Change this memory"),inp=mk("input"),ba=mk("div","mr-acts");
    inp.type="text";inp.id="memEdit-"+it.id;inp.maxLength=400;inp.value=it.text;lab.htmlFor=inp.id;f.appendChild(lab);f.appendChild(inp);
    ba.appendChild(key("Save","mr-primary",function(){saveEdit(it,r);}));ba.appendChild(key("Cancel","",function(){endEdit(r,true);}));
    inp.addEventListener("keydown",function(e){if(e.key==="Enter"){e.preventDefault();saveEdit(it,r);}if(e.key==="Escape"){e.preventDefault();e.stopPropagation();endEdit(r,true);}});
    back.appendChild(f);back.appendChild(ba);back.inert=true;flip.appendChild(back);}
  r.appendChild(flip);return r;}
function paintRoom(first){var c=$("memRoomCard");if(!c)return;var s=M();EDIT=null;
  if(first||!c.querySelector(".mr-room")){c.replaceChildren();var eye=mk("div","mr-eye");eye.appendChild(mk("b",null,"Ingenium"));eye.appendChild(D.createTextNode("Settings · Your data"));
    var h=mk("h2","mr-h","Memory");var say=mk("p","mr-say","What Ingenium remembers from your chats. You see every memory, and you choose what stays.");
    var room=mk("div","mr-room"),cols=mk("div","mr-cols"),L=mk("div","mr-col mr-left"),R=mk("div","mr-col mr-right");cols.appendChild(L);cols.appendChild(R);room.appendChild(cols);
    c.appendChild(eye);c.appendChild(h);c.appendChild(say);c.appendChild(room);}
  var L=c.querySelector(".mr-left"),R=c.querySelector(".mr-right");L.replaceChildren();R.replaceChildren();
  /* left: the counts, the switches, adding one, the memory file, how it works */
  var counts=mk("div","mr-counts");counts.setAttribute("data-mr-k","counts");var c1=mk("span","mr-count mr-pop");c1.id="memCountKept";var k1=coin("",s.items.length);k1.id="memCoinKept";c1.appendChild(k1);c1.appendChild(mk("span",null,s.items.length===1?"memory":"memories"));
  var c2=mk("span","mr-count mr-pop");c2.id="memCountWait";var k2=coin("mr-warm",s.waiting.length);k2.id="memCoinWait";c2.appendChild(k2);c2.appendChild(mk("span",null,"waiting for you"));c2.hidden=!s.waiting.length;
  counts.appendChild(c1);counts.appendChild(c2);L.appendChild(counts);
  L.appendChild(sw("on","Use memory in my chats","On: with each message, the memories that fit it go to the model, with how you like answers. Off: every chat starts from zero, and what is kept stays here.",function(){return s.on;},function(v){s.on=v;toast(v?"Memory goes with your messages again.":"Every chat starts from zero now. What is kept stays here.");}));
  L.appendChild(sw("learn","Learn from my chats","As you chat, Ingenium notes what is worth keeping: your projects, how you like answers, dates and decisions. The model on this device does it, a minute after a reply, while you are not typing.",function(){return s.learn;},function(v){s.learn=v;toast(v?"Ingenium learns from your chats.":"Ingenium learns nothing new. What it remembers stays.");}));
  L.appendChild(sw("ask","Ask me before keeping a memory","New memories wait for you here. Turn this off to keep them at once.",function(){return s.ask;},function(v){s.ask=v;toast(v?"New memories wait for you first.":"New memories are kept at once. You can still forget any of them.");}));
  L.appendChild(sw("cloud","Use memories with a connected service","Off: memories go only to models on your devices. On: the ones that fit a message go with it to the service you connected, such as Claude.",function(){return s.cloud;},function(v){s.cloud=v;toast(v?"Memories that fit a message go with it to a connected service too.":"Memories go only to models on your devices.");}));
  var add=mk("div","mr-add mr-c3 mr-pop");add.setAttribute("data-mr-k","add");add.setAttribute("data-lean",".5");var well=mk("div","mr-well"),inp=mk("input");inp.type="text";inp.id="memRoomNew";inp.maxLength=400;inp.placeholder="Add something to remember";inp.setAttribute("aria-label","Add something to remember");
  well.appendChild(inp);add.appendChild(well);var addIt=function(){var it=W.memAdd(inp.value,"typed");if(!it)return;if(!it.g)it.g=groupOf(it.text);save();inp.value="";var cc=$("memRoomCard");change(cc,function(){paintRoom();});toast("Kept in Memory, under "+GROUPS[gOf(it)]+".");var f=$("memRoomNew");if(f)f.focus();};
  add.appendChild(key("Add","mr-primary",addIt));inp.addEventListener("keydown",function(e){if(e.key==="Enter"){e.preventDefault();addIt();}});L.appendChild(add);
  var files=mk("div","mr-files");files.setAttribute("data-mr-k","files");
  files.appendChild(key("Save memory to a file","",function(){try{W.saveFileNative("Ingenium memory.json","application/json",JSON.stringify({format:"ingenium-memory",version:1,saved:new Date().toISOString(),items:s.items},null,1));}catch(e){toast("The file could not be saved.");}}));
  var fi=mk("input");fi.type="file";fi.accept=".json,application/json";fi.hidden=true;fi.id="memRoomFile";files.appendChild(key("Add from a memory file","",function(){fi.click();}));files.appendChild(fi);
  fi.addEventListener("change",function(){var f=fi.files&&fi.files[0];fi.value="";if(!f)return;(f.text?f.text():new Promise(function(r){var x=new FileReader();x.onload=function(){r(String(x.result||""));};x.readAsText(f);})).then(function(t){
    var j;try{j=JSON.parse(t);}catch(e){j=null;}if(!j||j.format!=="ingenium-memory"||!Array.isArray(j.items)){toast("That file is not an Ingenium memory file.");return;}
    var before=s.items.length;j.items.slice().reverse().forEach(function(x){if(x&&x.text){var it=W.memAdd(x.text,x.how||"file");if(it&&!it.g)it.g=x.g&&GROUPS[x.g]?x.g:groupOf(it.text);}});save();
    change($("memRoomCard"),function(){paintRoom();});toast(plural(s.items.length-before,"memory","memories")+" added; the ones already here were kept once.");});});
  L.appendChild(files);
  var how=mk("div","mr-how mr-c3 mr-pop");how.setAttribute("data-mr-k","how");how.setAttribute("data-lean",".6");how.appendChild(mk("b",null,"How it works"));var ol=mk("ol","mr-steps");
  ["As you chat, Ingenium notes what is worth keeping, and each new memory waits for you to keep it or not. You can also say “remember that …”, or press Remember under a message.",
   "With each message, it looks on this device for the memories whose words fit it, and gives the best few to the model, with how you like answers. The tray above the chat shows which.",
   "Memories stay on this device. They reach your other devices only through Ingenium Cloud or a backup you make, and a connected service only if you turn that on."].forEach(function(t,i){
    var li=mk("li","mr-step mr-pop");li.appendChild(coin("",i+1));li.appendChild(mk("span",null,t));ol.appendChild(li);});how.appendChild(ol);L.appendChild(how);
  /* right: an undo, what waits, the four groups, forgetting everything */
  var u=W.MEM&&W.MEM.undo;if(u&&u.it){var ur=mk("div","mr-undo mr-c3 mr-pop");ur.setAttribute("data-mr-k","undo");ur.appendChild(mk("span",null,"Forgotten: "+u.it.text.slice(0,90)+(u.it.text.length>90?"…":"")));
    ur.appendChild(key("Undo","",function(){var it=W.MEM.undo&&W.MEM.undo.it;if(!it)return;s.items.splice(Math.min(W.MEM.undo.at,s.items.length),0,it);W.MEM.undo=null;save();change($("memRoomCard"),function(){paintRoom();});paintTray();toast("It is back in Memory.");}));R.appendChild(ur);}
  if(s.waiting.length){var gw=mk("div","mr-group");gw.setAttribute("data-mr-k","grp-wait");var hw=mk("h3","mr-ghead");hw.appendChild(coin("mr-warm mr-mini",s.waiting.length));hw.appendChild(D.createTextNode("Waiting for you"));gw.appendChild(hw);
    var mw=mk("div","mr-mems");s.waiting.forEach(function(it){mw.appendChild(memEl(it,true));});gw.appendChild(mw);R.appendChild(gw);}
  ORDER.forEach(function(g){var list=s.items.filter(function(it){return gOf(it)===g;});if(g==="you"&&!list.length)return;
    var gr=mk("div","mr-group");gr.setAttribute("data-mr-k","grp-"+g);var hh=mk("h3","mr-ghead");hh.appendChild(orb(g));hh.appendChild(D.createTextNode(GROUPS[g]));hh.appendChild(coin("mr-plain mr-mini",list.length));gr.appendChild(hh);
    var mm=mk("div","mr-mems");if(!list.length)mm.appendChild(empty("emp-"+g,"Nothing here yet."));list.forEach(function(it){mm.appendChild(memEl(it,false));});gr.appendChild(mm);R.appendChild(gr);});
  var fb=mk("div","mr-forget");fb.setAttribute("data-mr-k","forget");
  if(!s.items.length&&!s.waiting.length){CONFIRM=false;fb.appendChild(empty("emp-all","Ingenium remembers nothing yet. Memories from your chats will show here."));}
  else{fb.appendChild(key(CONFIRM?"Forget everything…":"Forget everything","",askForget));
    if(CONFIRM){var cf=mk("div","mr-confirm mr-pop");cf.setAttribute("data-mr-k","confirm");cf.appendChild(mk("span",null,"Forget all "+plural(s.items.length+s.waiting.length,"memory","memories")+"? This cannot be undone."));
      cf.appendChild(key("Forget them","mr-primary",forgetAll));cf.appendChild(key("Keep them","",function(){closeConfirm(cf);}));fb.appendChild(cf);}}
  R.appendChild(fb);
  if(FLASH){var fl=c.querySelector('.mr-mem[data-mid="'+FLASH+'"]');FLASH=null;if(fl){fl.classList.add("mr-flash");setTimeout(function(){fl.classList.remove("mr-flash");},1600);
    try{fl.scrollIntoView({block:"center",behavior:still()?"auto":"smooth"});}catch(e){}hop(fl,2);}}}
function keepIt(it){var s=M();change($("memRoomCard"),function(){s.waiting=s.waiting.filter(function(x){return x.id!==it.id;});s.items.unshift(it);save();paintRoom();},{lift:"mem-"+it.id});
  paintTray();toast("Kept in Memory, under "+GROUPS[gOf(it)]+".");}
function notThis(it,r){sinkAway(r).then(function(){var s=M();s.waiting=s.waiting.filter(function(x){return x.id!==it.id;});var k=norm(it.text);if(k&&s.no.indexOf(k)<0){s.no.push(k);if(s.no.length>300)s.no.splice(0,s.no.length-300);}save();
  change($("memRoomCard"),function(){paintRoom();});paintTray();toast("Not kept. Ingenium will not note it again.");});}
function forget(it,r){fallAway(r).then(function(){W.memDel(it.id);save();change($("memRoomCard"),function(){paintRoom();});paintTray();toast("Forgotten. It no longer goes with any message.");});}
function startEdit(it,r){if(EDIT&&EDIT!==r)endEdit(EDIT,false);EDIT=r;var front=r.querySelector(".mr-front"),back=r.querySelector(".mr-back");if(!back)return;var inp=back.querySelector("input");
  inp.value=it.text;r.classList.add("mr-editing");front.inert=true;back.inert=false;setTimeout(function(){try{inp.focus({preventScroll:true});inp.select();}catch(e){}},still()?0:300);}
function endEdit(r,focusKey){r.classList.remove("mr-editing");var f=r.querySelector(".mr-front"),b=r.querySelector(".mr-back");if(f)f.inert=false;if(b)b.inert=true;if(EDIT===r)EDIT=null;
  if(focusKey){var k=r.querySelector(".mr-front .mr-key");if(k)setTimeout(function(){try{k.focus({preventScroll:true});}catch(e){}},still()?0:320);}}
function saveEdit(it,r){var v=String(r.querySelector(".mr-back input").value||"").replace(/\s+/g," ").trim();
  if(v&&v!==it.text){it.text=v.slice(0,400);save();r.querySelector(".mr-front .mr-tx p").textContent=it.text;
    [].forEach.call(r.querySelectorAll(".mr-front .mr-key"),function(k){k.setAttribute("aria-label",k.textContent+": "+it.text);});toast("Memory changed.");var t=$("memTray");if(t)t.__sig="";paintTray();}
  endEdit(r,true);}
function askForget(){if(CONFIRM)return;change($("memRoomCard"),function(){CONFIRM=true;paintRoom();},{skip:["confirm"]});var cf=D.querySelector("#memRoomCard .mr-confirm");
  if(cf&&!still()&&cf.animate)cf.animate([{transform:"perspective(700px) rotateX(-90deg)",opacity:.2},{transform:"perspective(700px) rotateX(0deg)",opacity:1}],{duration:520,easing:"cubic-bezier(.2,.9,.3,1.2)"});
  var k=cf&&cf.querySelector(".mr-key");if(k)try{k.focus({preventScroll:true});}catch(e){}}
function closeConfirm(cf){var p=(!still()&&cf&&cf.animate)?cf.animate([{transform:"perspective(700px) rotateX(0deg)",opacity:1},{transform:"perspective(700px) rotateX(-90deg)",opacity:0}],{duration:280,easing:"ease-in",fill:"forwards"}).finished.catch(function(){}):Promise.resolve();
  p.then(function(){change($("memRoomCard"),function(){CONFIRM=false;paintRoom();});});}
function forgetAll(){var cards=[].slice.call(D.querySelectorAll("#memRoomCard .mr-mem"));
  Promise.all(cards.map(function(c,i){return new Promise(function(res){setTimeout(function(){fallAway(c).then(res);},still()?0:i*50);});})).then(function(){var s=M();
    s.items.length=0;s.waiting.length=0;s.skip={};CONFIRM=false;if(W.MEM)W.MEM.undo=null;save();change($("memRoomCard"),function(){paintRoom();});paintTray();toast("Ingenium remembers nothing now.");});}
/* the room, reached from the chat's + menu, the tray, or a kept memory */
function openRoom(id){try{W.go("settings");}catch(e){}try{W.IngRooms.open("settings","data");}catch(e){}var c=roomCard();try{W.IngSettingsParts.show("data","memory",true);}catch(e){}
  if(id)FLASH=id;paintRoom();if(!id&&c)setTimeout(function(){try{c.scrollIntoView({block:"start",behavior:still()?"auto":"smooth"});}catch(e){}},60);}
W.memOpen=function(editId){openRoom(editId||null);};

/* ---------- start ---------- */
function boot(){roomCard();paintTray();}
if(D.readyState==="loading")D.addEventListener("DOMContentLoaded",boot);else boot();
(function wait(n){if(roomCard()&&W.__ingReady===true){paintTray();return;}if(n<240)setTimeout(function(){wait(n+1);},500);})(0);
W.IngChatMemory={pick:function(t){return pick(t).map(function(it){return it.id;});},groupOf:groupOf,open:openRoom,paint:function(){paintTray();paintRoom();},
  tray:function(){var t=$("memTray");return t?{shown:!t.hidden,open:t.classList.contains("mt-open"),name:(t.querySelector(".mt-name")||{}).textContent,ids:[].map.call(t.querySelectorAll(".mt-tok"),function(x){return x.getAttribute("data-mid");})}:null;},
  noteNow:function(){LAST=0;clearTimeout(NT);noteNow();return NOTE_P;},noting:function(){return NOTING;},take:function(t,cid,upto,name){take(t,cid||chatId(),upto||0,name||"");},state:M};
try{window.__ingParts["p271"]="running";}catch(_){}
})();
</script>
