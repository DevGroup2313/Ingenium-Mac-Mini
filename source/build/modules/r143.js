<style id="r143-css">
/* R143 · Backup and moving: a card in Settings, in the look of Fabrica and Lector: slabs with soft depth, keys that lift,
   sink and settle with a spring, amethyst; by night its own colours; calm and reduced motion respected */
#bkCard{
  --b-acc:var(--accent,#6a3fb5);--b-ink1:var(--ink-1,#221a2e);--b-ink2:var(--ink-2,#4a4358);--b-ink3:var(--ink-3,#6c6579);
  --b-hair:var(--hairline,rgba(34,26,46,.10));--b-a:#ffffff;--b-b:#f7f4fb;--b-slabbg:linear-gradient(180deg,#ffffff,#fbf9fd);
  --b-slab:inset 0 1px 0 rgba(255,255,255,.85),inset 0 -1px 0 rgba(40,22,68,.05),0 1px 0 rgba(40,22,68,.10),0 3px 0 rgba(40,22,68,.04),0 6px 12px rgba(40,22,68,.06),0 14px 28px rgba(40,22,68,.06);
  --b-pop:inset 0 -1.5px 0 rgba(40,22,68,.13),0 2px 0 rgba(40,22,68,.25),0 4px 5px rgba(40,22,68,.16),0 9px 14px rgba(40,22,68,.10);
  --b-pophi:inset 0 -1.5px 0 rgba(40,22,68,.13),0 3px 0 rgba(40,22,68,.25),0 6px 8px rgba(40,22,68,.18),0 13px 20px rgba(40,22,68,.12);
  --b-press:inset 0 2px 5px rgba(40,22,68,.22),0 1px 1px rgba(40,22,68,.18);
  --b-pa:#7348be;--b-pb:#5d37a1;--b-pedge:#4b2a86;--b-pledge:#3a2070;
  --b-psh:inset 0 1px 0 rgba(255,255,255,.16),0 2px 0 var(--b-pledge),0 4px 6px rgba(40,22,68,.24),0 9px 16px rgba(40,22,68,.16);
  --b-pshhi:inset 0 1px 0 rgba(255,255,255,.18),0 3px 0 var(--b-pledge),0 6px 9px rgba(40,22,68,.26),0 13px 22px rgba(40,22,68,.18);
  --b-ppress:inset 0 2px 6px rgba(20,8,40,.45),0 1px 1px rgba(40,22,68,.2);
  --b-da:#b94848;--b-db:#9c3434;--b-dedge:#7f2828;--b-dledge:#621b1b;
  --b-well:inset 0 1px 2.5px rgba(40,22,68,.08);--b-wellbg:rgba(34,26,46,.035);
  --b-ok:#2a6f4c;--b-oks:rgba(47,122,85,.10);--b-bad:#9a3232;--b-bads:rgba(200,70,70,.08);--b-warn:#7f4c0c;--b-warns:rgba(184,116,46,.11);
  --b-spring:cubic-bezier(.34,1.35,.64,1)}
body[data-theme="night"] #bkCard{
  --b-a:#2a2239;--b-b:#241d31;--b-slabbg:linear-gradient(180deg,#262033,#211a2c);
  --b-slab:inset 0 1px 0 rgba(255,255,255,.06),inset 0 -1px 0 rgba(0,0,0,.35),0 1px 0 rgba(0,0,0,.6),0 3px 0 rgba(0,0,0,.28),0 6px 12px rgba(0,0,0,.35),0 14px 28px rgba(0,0,0,.3);
  --b-pop:inset 0 1px 0 rgba(255,255,255,.07),inset 0 -2px 0 rgba(0,0,0,.45),0 2px 0 rgba(0,0,0,.75),0 4px 5px rgba(0,0,0,.50),0 9px 14px rgba(0,0,0,.36);
  --b-pophi:inset 0 1px 0 rgba(255,255,255,.08),inset 0 -2px 0 rgba(0,0,0,.45),0 3px 0 rgba(0,0,0,.75),0 6px 8px rgba(0,0,0,.52),0 13px 20px rgba(0,0,0,.40);
  --b-press:inset 0 2px 6px rgba(0,0,0,.6),0 1px 1px rgba(0,0,0,.4);
  --b-pa:#7a56c8;--b-pb:#5b3aa1;--b-pedge:#2c1956;--b-pledge:#170b30;
  --b-psh:inset 0 1px 0 rgba(255,255,255,.14),0 2px 0 var(--b-pledge),0 4px 6px rgba(0,0,0,.5),0 9px 16px rgba(0,0,0,.36);
  --b-pshhi:inset 0 1px 0 rgba(255,255,255,.16),0 3px 0 var(--b-pledge),0 6px 9px rgba(0,0,0,.52),0 13px 22px rgba(0,0,0,.4);
  --b-da:#b04646;--b-db:#8c2f2f;--b-dedge:#4a1414;--b-dledge:#2a0a0a;
  --b-well:inset 0 1px 3px rgba(0,0,0,.4);--b-wellbg:rgba(10,6,18,.35);
  --b-ok:#8fdcb0;--b-oks:rgba(127,209,166,.12);--b-bad:#f2a9a9;--b-bads:rgba(240,120,120,.11);--b-warn:#ecc07e;--b-warns:rgba(230,178,106,.13)}
#bkCard *{box-sizing:border-box}
#bkCard [hidden]{display:none !important}
#bkCard :focus-visible{outline:2px solid var(--b-acc);outline-offset:2px}
#bkCard .bk-vh{position:absolute !important;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);clip-path:inset(50%);white-space:nowrap}
#bkCard .bk-head{display:flex;align-items:center;gap:10px;flex-wrap:wrap}
#bkCard .bk-head h2{margin:0}
#bkCard .bk-last{margin-left:auto;font-size:12.5px;font-weight:600;color:var(--b-ink2);padding:4px 11px;border-radius:999px;background:var(--b-wellbg);box-shadow:var(--b-well);border:1px solid var(--b-hair)}
#bkCard .bk-last.ok{color:var(--b-ok);background:var(--b-oks)}
#bkCard .bk-last.old{color:var(--b-warn);background:var(--b-warns)}
#bkCard .bk-lede{margin:6px 0 12px;max-width:80ch;line-height:1.5}
/* the three tabs: a segmented row whose thumb slides with a spring */
#bkCard .bk-seg{position:relative;display:inline-flex;gap:2px;padding:3px;border-radius:999px;border:1px solid var(--b-hair);background:var(--b-wellbg);box-shadow:var(--b-well);max-width:100%;overflow-x:auto;scrollbar-width:none}
#bkCard .bk-seg::-webkit-scrollbar{display:none}
#bkCard .bk-seg button{position:relative;z-index:1;border:1px solid transparent;background:transparent;border-radius:999px;padding:7px 16px;font:600 13px/1.25 var(--sans);color:var(--b-ink2);cursor:pointer;white-space:nowrap;transition:color .2s ease,transform .12s var(--b-spring)}
#bkCard .bk-seg button:hover{color:var(--b-ink1)}
#bkCard .bk-seg button[aria-selected="true"]{color:#fff;text-shadow:0 1px 1px rgba(30,10,60,.35)}
#bkCard .bk-seg button:active{transform:scale(.97)}
#bkCard .bk-thumb{position:absolute;top:3px;bottom:3px;left:0;width:0;border-radius:999px;background:linear-gradient(var(--b-pa),var(--b-pb));border:1px solid var(--b-pedge);box-shadow:var(--b-psh);transition:transform .38s var(--b-spring),width .38s var(--b-spring);pointer-events:none;z-index:0}
#bkCard .bk-pane{margin-top:14px;padding:18px;border-radius:14px;background:var(--b-slabbg);border:1px solid var(--b-hair);box-shadow:var(--b-slab);color:var(--b-ink1)}
#bkCard .bk-h3{font:600 15.5px/1.3 var(--serif);color:var(--b-ink1);margin:0 0 9px;letter-spacing:.02em}
#bkCard .bk-grid{display:grid;grid-template-columns:minmax(0,1.05fr) minmax(0,1fr);gap:22px;align-items:start}
#bkCard p{line-height:1.5}
#bkCard .bk-sm{font-size:12.5px;color:var(--b-ink3);margin:6px 0 0}
#bkCard .bk-what{list-style:none;margin:0;padding:0;display:grid;gap:7px}
#bkCard .bk-what li{display:grid;grid-template-columns:auto minmax(0,1fr);gap:10px;align-items:baseline;font-size:13.5px;color:var(--b-ink1)}
#bkCard .bk-what .n{min-width:3.4ch;text-align:right;font-weight:700;color:var(--b-acc);font-variant-numeric:tabular-nums}
#bkCard .bk-what .sub{display:block;font-size:12.5px;color:var(--b-ink3)}
/* the keys: popped out, they lift on hover and sink when pressed */
#bkCard .bk-key{position:relative;display:inline-flex;align-items:center;justify-content:center;gap:7px;min-height:38px;border:1px solid var(--b-hair);background:linear-gradient(var(--b-a),var(--b-b));border-radius:11px;padding:8px 16px;font:600 13.5px/1.2 var(--sans);color:var(--b-ink1);cursor:pointer;box-shadow:var(--b-pop);white-space:nowrap;
  transition:transform .16s var(--b-spring),box-shadow .16s ease,opacity .2s ease}
#bkCard .bk-key:hover:not(:disabled){transform:translateY(-2px);box-shadow:var(--b-pophi)}
#bkCard .bk-key:active:not(:disabled){transform:translateY(1px) scale(.985);box-shadow:var(--b-press);transition-duration:.06s}
#bkCard .bk-key:disabled{opacity:.55;cursor:default}
#bkCard .bk-key.pri{background:linear-gradient(var(--b-pa),var(--b-pb));border-color:var(--b-pedge);color:#fff;box-shadow:var(--b-psh);text-shadow:0 1px 1px rgba(30,10,60,.35)}
#bkCard .bk-key.pri:hover:not(:disabled){box-shadow:var(--b-pshhi)}
#bkCard .bk-key.pri:active:not(:disabled){box-shadow:var(--b-ppress)}
#bkCard .bk-key.danger{background:linear-gradient(var(--b-da),var(--b-db));border-color:var(--b-dedge);color:#fff;text-shadow:0 1px 1px rgba(60,10,10,.35);box-shadow:inset 0 1px 0 rgba(255,255,255,.16),0 2px 0 var(--b-dledge),0 4px 6px rgba(80,20,20,.24),0 9px 16px rgba(80,20,20,.14)}
#bkCard .bk-key.danger:active:not(:disabled){box-shadow:inset 0 2px 6px rgba(40,5,5,.45),0 1px 1px rgba(80,20,20,.2)}
#bkCard .bk-key.sm{min-height:32px;padding:5px 12px;font-size:12.5px;border-radius:999px}
#bkCard .bk-row{display:flex;gap:10px;flex-wrap:wrap;align-items:center;margin-top:14px}
/* a switch that is a real checkbox, so the keyboard and a screen reader find it as one */
#bkCard .bk-opt{display:grid;grid-template-columns:auto minmax(0,1fr);gap:12px;align-items:start;padding:11px 0;border-top:1px solid var(--b-hair)}
#bkCard .bk-opt:first-of-type{border-top:0;padding-top:2px}
#bkCard .bk-opt label{cursor:pointer;font-size:13.5px;line-height:1.45}
#bkCard .bk-opt label b{display:block;color:var(--b-ink1)}
#bkCard .bk-opt label span{display:block;font-size:12.5px;color:var(--b-ink3)}
#bkCard .bk-sw{-webkit-appearance:none;appearance:none;position:relative;flex:0 0 auto;width:44px;height:25px;margin:1px 0 0;border-radius:999px;border:1px solid rgba(70,50,100,.45);background:rgba(120,105,150,.30);box-shadow:inset 0 1px 3px rgba(40,20,70,.25);cursor:pointer;transition:background .18s ease,border-color .18s ease}
#bkCard .bk-sw::before{content:"";position:absolute;left:2px;top:2px;width:19px;height:19px;border-radius:50%;background:linear-gradient(#ffffff,#efeaf6);box-shadow:0 1px 0 rgba(40,20,70,.25),0 2px 4px rgba(40,20,70,.3);transition:transform .3s var(--b-spring)}
#bkCard .bk-sw:checked{background:var(--b-pb);border-color:var(--b-pedge)}
#bkCard .bk-sw:checked::before{transform:translateX(19px)}
#bkCard .bk-sw:disabled{opacity:.5;cursor:default}
body[data-theme="night"] #bkCard .bk-sw{border-color:rgba(205,184,240,.35);background:rgba(205,184,240,.14)}
body[data-theme="night"] #bkCard .bk-sw:checked{background:#7a56c8;border-color:#b79ce6}
#bkCard .bk-pw{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:10px;margin:2px 0 6px 56px}
#bkCard .bk-pw .bk-sm{grid-column:1 / -1;margin:0}
#bkCard .bk-field{display:grid;gap:5px;font-size:12.5px;font-weight:600;color:var(--b-ink2)}
#bkCard .bk-field input,#bkCard .bk-field select{width:100%;min-height:40px;font:500 14px/1.3 var(--sans);color:var(--b-ink1);background:var(--input-bg,rgba(34,26,46,.03));border:1px solid var(--b-hair);border-radius:10px;padding:8px 10px;box-shadow:var(--b-well)}
#bkCard .bk-field input:focus-visible,#bkCard .bk-field select:focus-visible{outline:2px solid var(--b-acc);outline-offset:1px}
/* the bar that says how far it has got */
#bkCard .bk-progress{margin-top:14px}
#bkCard .bk-bar{position:relative;height:12px;border-radius:999px;background:var(--b-wellbg);box-shadow:var(--b-well);border:1px solid var(--b-hair);overflow:hidden}
#bkCard .bk-bar i{position:absolute;left:0;top:0;bottom:0;width:0;border-radius:999px;background:linear-gradient(90deg,var(--b-pb),var(--b-pa));box-shadow:inset 0 1px 0 rgba(255,255,255,.3);transition:width .3s ease}
#bkCard .bk-say{margin:7px 0 0;font-size:13px;color:var(--b-ink2)}
#bkCard .bk-msg{margin-top:14px;padding:12px 15px;border-radius:12px;border:1px solid var(--b-hair);font-size:13.5px;line-height:1.5;color:var(--b-ink1)}
#bkCard .bk-msg.good{background:var(--b-oks)}
#bkCard .bk-msg.good b{color:var(--b-ok)}
#bkCard .bk-msg.bad{background:var(--b-bads)}
#bkCard .bk-msg.bad b{color:var(--b-bad)}
#bkCard .bk-msg.warn{background:var(--b-warns)}
#bkCard .bk-msg.warn b{color:var(--b-warn)}
#bkCard .bk-msg p{margin:4px 0 0}
#bkCard .bk-msg ul{margin:6px 0 0;padding-left:20px}
/* restoring */
#bkCard .bk-drop{display:grid;gap:8px;justify-items:start;padding:18px;border-radius:14px;border:2px dashed rgba(var(--accent-line-rgb,106,63,181),.38);background:var(--b-wellbg);transition:background .2s ease,border-color .2s ease}
#bkCard .bk-drop.over{background:var(--accent-soft,rgba(106,63,181,.14));border-color:var(--b-acc)}
#bkCard .bk-drop p{margin:0}
#bkCard .bk-sum{margin-top:16px;outline:none}
#bkCard .bk-sum:focus-visible{outline:2px solid var(--b-acc);outline-offset:4px;border-radius:8px}
#bkCard .bk-tabwrap{overflow-x:auto;margin:12px 0;border-radius:12px;border:1px solid var(--b-hair);background:var(--b-wellbg)}
#bkCard .bk-tab{width:100%;border-collapse:collapse;font-size:13px;color:var(--b-ink1)}
#bkCard .bk-tab th,#bkCard .bk-tab td{padding:8px 11px;text-align:left;border-bottom:1px solid var(--b-hair);vertical-align:top}
#bkCard .bk-tab thead th{font-size:12px;font-weight:700;color:var(--b-ink2);letter-spacing:.02em}
#bkCard .bk-tab tbody th{font-weight:600}
#bkCard .bk-tab td.num,#bkCard .bk-tab th.num{text-align:right;font-variant-numeric:tabular-nums;white-space:nowrap}
#bkCard .bk-tab tr:last-child>*{border-bottom:0}
#bkCard .bk-tab .chg{color:var(--b-acc);font-weight:700}
#bkCard .bk-modes{border:0;padding:0;margin:14px 0 0;min-width:0}
#bkCard .bk-modes legend{font:600 15.5px/1.3 var(--serif);color:var(--b-ink1);margin:0 0 9px;padding:0;letter-spacing:.02em}
#bkCard .bk-modes .bk-two{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:10px}
#bkCard .bk-mode{display:grid;grid-template-columns:auto minmax(0,1fr);gap:10px;align-items:start;padding:12px 13px;border-radius:12px;border:1px solid var(--b-hair);background:linear-gradient(var(--b-a),var(--b-b));box-shadow:var(--b-pop);cursor:pointer;font-size:13px;line-height:1.45;color:var(--b-ink2);transition:transform .16s var(--b-spring),box-shadow .16s ease,border-color .16s ease}
#bkCard .bk-mode:hover{transform:translateY(-2px);box-shadow:var(--b-pophi)}
#bkCard .bk-mode.on{border-color:var(--b-acc);box-shadow:inset 0 0 0 1px var(--b-acc),var(--b-pop)}
#bkCard .bk-mode b{display:block;font-size:14px;color:var(--b-ink1)}
#bkCard .bk-mode input{width:17px;height:17px;margin:2px 0 0;accent-color:var(--b-pb)}
#bkCard .bk-lines{margin:12px 0 0;padding-left:20px;font-size:13.5px;line-height:1.55;color:var(--b-ink1)}
#bkCard .bk-lines li+li{margin-top:3px}
#bkCard .bk-keys{margin-top:14px;padding:12px 14px;border-radius:12px;border:1px solid var(--b-hair);background:var(--b-wellbg)}
#bkCard .bk-keys .bk-field{max-width:360px;margin-top:10px}
#bkCard .bk-err{margin:8px 0 0;font-size:13px;font-weight:600;color:var(--b-bad)}
#bkCard .bk-err:empty{display:none}
#bkCard .bk-models{margin-top:14px}
#bkCard .bk-chips{display:flex;flex-wrap:wrap;gap:6px;margin:6px 0 0;padding:0;list-style:none}
#bkCard .bk-chips li{font-size:12.5px;font-weight:600;padding:4px 10px;border-radius:999px;border:1px solid var(--b-hair);background:linear-gradient(var(--b-a),var(--b-b));box-shadow:var(--b-pop);color:var(--b-ink1)}
/* moving */
#bkCard .bk-pair{display:grid;grid-template-columns:minmax(0,1fr) auto minmax(0,1fr);gap:10px;align-items:end;max-width:640px}
#bkCard .bk-steps{list-style:none;margin:16px 0 0;padding:0;display:grid;gap:10px}
#bkCard .bk-steps>li{display:grid;grid-template-columns:auto minmax(0,1fr);gap:13px;align-items:start;padding:13px 15px;border-radius:13px;background:linear-gradient(var(--b-a),var(--b-b));border:1px solid var(--b-hair);box-shadow:var(--b-pop)}
#bkCard .bk-num{width:30px;height:30px;border-radius:50%;display:grid;place-items:center;font:700 13.5px/1 var(--sans);color:#fff;background:linear-gradient(var(--b-pa),var(--b-pb));border:1px solid var(--b-pedge);box-shadow:var(--b-psh)}
#bkCard .bk-steps h4{margin:3px 0 4px;font:650 14px/1.35 var(--sans);color:var(--b-ink1)}
#bkCard .bk-steps p{margin:0;font-size:13.5px;color:var(--b-ink2)}
#bkCard .bk-steps .bk-key{margin-top:9px}
#bkCard .bk-stay{margin-top:18px}
#bkCard .bk-stay ul{margin:0;padding-left:20px;font-size:13.5px;line-height:1.55;color:var(--b-ink2)}
#bkCard .bk-stay li+li{margin-top:3px}
#bkCard .bk-tip{margin-top:14px;font-size:13px;color:var(--b-ink3)}
.card .bk-pointer{margin:8px 0 0}
.card .bk-pointer button{font:inherit;color:var(--accent,#6a3fb5);background:none;border:0;padding:0;text-decoration:underline;cursor:pointer}
#bkCard .bk-tab .bk-short{display:none}
/* a wide display: the steps side by side, so no line runs across the whole screen */
@media (min-width:1700px){#bkCard .bk-steps{grid-template-columns:repeat(2,minmax(0,1fr))}#bkCard .bk-lede,#bkCard .bk-lines,#bkCard .bk-stay ul{max-width:120ch}}
@media (max-width:760px){#bkCard .bk-grid{grid-template-columns:minmax(0,1fr)}#bkCard .bk-modes .bk-two{grid-template-columns:minmax(0,1fr)}}
@media (max-width:560px){#bkCard .bk-pane{padding:13px}#bkCard .bk-seg{display:flex;width:100%}#bkCard .bk-seg button{flex:1 1 0;padding:7px 6px}
  #bkCard .bk-pw{grid-template-columns:minmax(0,1fr);margin-left:0}#bkCard .bk-pair{grid-template-columns:minmax(0,1fr)}#bkCard .bk-pair .bk-key{justify-self:start}
  #bkCard .bk-row .bk-key{flex:1 1 auto}#bkCard .bk-last{margin-left:0}
  #bkCard .bk-tab{font-size:12.5px}#bkCard .bk-tab th,#bkCard .bk-tab td{padding:7px 6px}
  #bkCard .bk-tab .bk-long{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);clip-path:inset(50%);white-space:nowrap}#bkCard .bk-tab .bk-short{display:inline}}
@media (prefers-reduced-motion:reduce){#bkCard *,#bkCard *::before,#bkCard *::after{transition-duration:.01ms !important;animation:none !important}}
body[data-motion="minimal"] #bkCard *,body[data-motion="minimal"] #bkCard *::before{transition-duration:.01ms !important;animation:none !important}
body[data-motion="calm"] #bkCard .bk-key:hover:not(:disabled),body[data-motion="calm"] #bkCard .bk-mode:hover{transform:none}
</style>
<script>try{(window.__ingParts=window.__ingParts||{})["p64"]="started";}catch(_){}
/* ============ R143 · BACKUP, RESTORE AND MOVING TO ANOTHER DEVICE ============
   The owner's words (20 October 2026): "Create a backup and restore system that allows users to export the entire library
   and app state. ... Develop a migration path for users moving between different devices or platforms."
   What was here before: Settings, Data on this device, kept Export a backup (the desk alone, one .json file: conversations,
   notes, settings) and Import a backup (that file read back over the desk). Lector's documents, Fabrica's apps with their
   history and their issues and pages, the app library and every long text live in this device's larger stores, and none of
   them went with it. Now Settings has Backup and moving:
   · Back up. Everything in one file: a zip with a manifest (the app and its version, the date, the device, what it holds
     with counts and sizes, and the SHA-256 fingerprint of every part). It carries the desk, the small store, every store
     in this device's larger store (read a batch at a time, so hundreds of megabytes go through without filling the
     memory), Fabrica's issues and pages (fbHub.exportAll), and on the computer apps the long texts kept only on the disk.
     Fabrica's packages and the signing keys stay out unless chosen; the keys, and the connection keys with them, go
     locked with a password (AES-GCM, its key drawn from the password by PBKDF2 with 600,000 rounds of SHA-256). Models
     never go: their names are listed, so they can be fetched again.
   · Restore. Every fingerprint is checked before anything changes. Then what the backup holds, and what it would change
     here, is shown; Replace or Merge is chosen and confirmed; the desk as it was goes onto the recovery shelf, and
     Ingenium starts again. A damaged file, or a file that is not a backup, is refused plainly and nothing changes. A desk
     backup from an earlier Ingenium (.json) is read too, so a desk kept long ago still comes home.
   · Moving. A guided path for each pair of the owner's devices (Mac, Mac mini, Windows, the Fire tablet, iPhone, iPad, a
     browser): back up here, carry it (AirDrop, Files, a USB stick, the tablet's cable and Silk's downloads), restore
     there, and what does not move.
   window.IngBackup: make, open, describe, unlock, apply, restore, census, fingerprints, guide. */
(function(){"use strict";
if(window.IngBackup)return;
var TE=new TextEncoder(),TD=new TextDecoder();
var FORMAT=1,ITER=600000,CHUNK_N=1000,CHUNK_B=16*1024*1024,STR_OUT=32*1024,BIG_DISK_MAX=16*1024*1024;
/* the stores Ingenium keeps; any other store this page holds (an app carried inside keeps its own) goes as well */
var KNOWN=["ingenium_big","ingenium_apps","ingenium_repos","ingenium_hub","ingenium_claude","ingenium_keys","fabrica_made","ingenium_files","the_foundry_files","ingenium_desk"];
var DATA_DBS=["ingenium_big","ingenium_apps","ingenium_repos","ingenium_claude"];
/* never in a backup: the model files, file links and the engine (ingenium_files and its older name), and the desk's
   overflow copy (the desk itself goes whole, in desk/state.json) */
var NEVER={ingenium_files:1,the_foundry_files:1,ingenium_desk:1};
var LABEL={ingenium_big:"Long texts (the large store)",ingenium_apps:"Your app library",ingenium_repos:"Fabrica's apps, with every version",
  ingenium_hub:"Fabrica's issues, pull requests and pages",ingenium_claude:"Conversations you brought in from elsewhere",ingenium_keys:"Signing keys",fabrica_made:"Fabrica's packages"};
/* what belongs to one device and stays with it: its models and how they ran here */
var DEVICE_KEYS=["models","activeModelId","perf"];
var NOTHING=" Nothing was changed.";
/* 6.7 (security audit): the fields of a connection that say where its key or token is sent. A key belongs to the one
   address it was saved with; when a restore would change the address, the key is not carried over to it. */
var ENDP=["base","api","endpoint","host","url","addr","provider","computer","via","model","owner","repo"];
function connOf(root,path){return path.length>1?getPath(root,path.slice(0,-1)):root;}
function sameEndpoint(a,b){if(a===b)return true;if(!a||!b||typeof a!=="object"||typeof b!=="object")return false;
  for(var i=0;i<ENDP.length;i++){var k=ENDP[i];if((k in a)||(k in b)){if(String(a[k]==null?"":a[k])!==String(b[k]==null?"":b[k]))return false;}}return true;}

/* ---------- small helpers ---------- */
function V(){try{if(!state.v61||typeof state.v61!=="object")state.v61={};if(!state.v61.backup||typeof state.v61.backup!=="object")state.v61.backup={};return state.v61.backup;}catch(e){return {};}}
function peek(){try{return (state.v61&&state.v61.backup)||{};}catch(e){return {};}}
function keep(){try{saveState();}catch(e){}}
function num(x){return (x||0).toLocaleString("en-GB");}
function plural(x,one,many){x=x||0;return num(x)+" "+(x===1?one:(many||one+"s"));}
function size(b){try{return fmtBytes(b||0);}catch(e){return (b||0)+" bytes";}}
function rest(){return new Promise(function(r){setTimeout(r,0);});}
function seq(list,fn){var i=0,out=[];function next(){if(i>=list.length)return Promise.resolve(out);var k=i++;
  return Promise.resolve().then(function(){return fn(list[k],k);}).then(function(v){out[k]=v;return next();});}return next();}
function hex(b){var u=b instanceof Uint8Array?b:new Uint8Array(b),s="";for(var i=0;i<u.length;i++)s+=(u[i]<16?"0":"")+u[i].toString(16);return s;}
function b64e(u){var s="",C=0x8000;for(var i=0;i<u.length;i+=C)s+=String.fromCharCode.apply(null,u.subarray(i,Math.min(u.length,i+C)));return btoa(s);}
function b64d(t){var bin=atob(String(t||"")),u=new Uint8Array(bin.length);for(var i=0;i<bin.length;i++)u[i]=bin.charCodeAt(i);return u;}
function toU8(x){if(!x)return new Uint8Array(0);if(x instanceof Uint8Array)return x;if(x instanceof ArrayBuffer)return new Uint8Array(x);if(ArrayBuffer.isView(x))return new Uint8Array(x.buffer,x.byteOffset,x.byteLength);if(Array.isArray(x))return new Uint8Array(x);return new Uint8Array(0);}
function rnd(k){var u=new Uint8Array(k);crypto.getRandomValues(u);return u;}
function subtle(){try{return (window.crypto&&window.crypto.subtle)||null;}catch(e){return null;}}
function sha(u8){try{if(typeof libSha==="function")return libSha(u8);}catch(e){}var s=subtle();if(s)return s.digest("SHA-256",u8).then(hex);return Promise.reject(new Error("this browser cannot take fingerprints"));}
function api0(){try{return (typeof shellApi==="function")?shellApi():null;}catch(e){return null;}}
/* the computer apps' bridge, which keeps long texts on disk (big_put, big_get, big_del, big_gc) */
function shell(){var a=api0();return a&&typeof a.big_put==="function"&&typeof a.big_get==="function"?a:null;}
function readBlob(b){return (b.arrayBuffer?b.arrayBuffer():new Response(b).arrayBuffer()).then(function(x){return new Uint8Array(x);});}
function slice(f,a,b){return readBlob(f.slice(a,b));}
function pad(x,w){x=String(x);while(x.length<w)x="0"+x;return x;}
function safe(s){return String(s).replace(/[^A-Za-z0-9_.-]+/g,"_").slice(0,60)||"_";}
function when(t){try{return new Date(t).toLocaleString("en-GB",{weekday:"long",day:"numeric",month:"long",year:"numeric",hour:"2-digit",minute:"2-digit"});}catch(e){return String(new Date(t));}}
function day(t){try{return new Date(t).toLocaleDateString("en-GB",{day:"numeric",month:"long",year:"numeric"});}catch(e){return "";}}
function ago(t){var d=Math.floor((Date.now()-t)/86400000);return d<=0?"today":d===1?"yesterday":d+" days ago";}
function fail(code,msg,extra){var e=new Error(msg);e.code=code;if(extra)Object.keys(extra).forEach(function(k){e[k]=extra[k];});return e;}
function foreign(msg){return fail("foreign",(msg||"This file is not an Ingenium backup.")+NOTHING);}
function damaged(what,extra){return fail("damaged","This backup is damaged: "+what+"."+NOTHING+" If you have another copy of it, try that one.",extra);}
function isCode(e){return e&&typeof e.code==="string";}
function ver(){try{return String(ING_VERSION);}catch(e){return "";}}

/* ---------- where this is ---------- */
var DEV={mac:"Mac",macmini:"Mac mini",windows:"Windows",fire:"Fire tablet",iphone:"iPhone",ipad:"iPad",browser:"A browser"};
var DEVTHE={mac:"the Mac",macmini:"the Mac mini",windows:"the Windows computer",fire:"the Fire tablet",iphone:"the iPhone",ipad:"the iPad",browser:"the browser"};
var ORDER=["mac","macmini","windows","fire","iphone","ipad","browser"];
function hereNow(){var ua=String(navigator.userAgent||""),pf=String(navigator.platform||""),nat=null;try{nat=(typeof INB==="object"&&INB)?INB.platform:null;}catch(e){}
  var app=!!(window.IngeniumNative||nat);
  if(/iPhone|iPod/.test(ua))return {kind:"iphone",label:"iPhone",shell:app?"app":"browser"};
  if(/iPad/.test(ua)||(/Macintosh/.test(ua)&&navigator.maxTouchPoints>1))return {kind:"ipad",label:"iPad",shell:app?"app":"browser"};
  if(/Silk|Kindle|\bKF[A-Z]{2,5}\b/.test(ua)||nat==="android"||/Android/.test(ua))return {kind:"fire",label:"Fire tablet",shell:app?"app":"browser"};
  if(shell()&&/Mac/.test(pf+ua))return {kind:"mac",label:"Mac",shell:"app"};
  if(shell()&&/Win/.test(pf+ua))return {kind:"windows",label:"Windows",shell:"app"};
  return {kind:"browser",label:"A browser",shell:"browser",os:/Mac/.test(ua)?"Mac":/Windows/.test(ua)?"Windows":/Linux|CrOS/.test(ua)?"Linux":""};}

/* ---------- the values the stores hold, written as JSON with their bytes beside them ----------
   Everything the browser's stores can hold is kept as it was: text, numbers (and NaN, Infinity, -0), dates, bytes of any
   kind, files and blobs with their names and types, maps, sets. A long text goes beside the JSON as UTF-8, as bytes do. */
function Bin(){this.parts=[];this.len=0;this.skipped=0;}
Bin.prototype.u8=function(u){var o=this.len;this.parts.push(u);this.len+=u.byteLength;return [o,u.byteLength];};
Bin.prototype.blob=function(b){var o=this.len;this.parts.push(b);this.len+=b.size;return [o,b.size];};
var WF=/[\ud800-\udbff](?![\udc00-\udfff])|(?:[^\ud800-\udbff]|^)[\udc00-\udfff]/;
function wellFormed(s){if(typeof s.isWellFormed==="function")return s.isWellFormed();return !WF.test(s);}
function setKey(o,k,v){if(k==="__proto__")Object.defineProperty(o,k,{value:v,enumerable:true,writable:true,configurable:true});else o[k]=v;}
function enc(v,B,path){if(v===null)return null;var t=typeof v;
  if(t==="string")return (v.length>STR_OUT&&wellFormed(v))?{$ing:"s",b:B.u8(TE.encode(v))}:v;
  if(t==="number"){if(isFinite(v))return (v===0&&1/v<0)?{$ing:"n",v:"-0"}:v;return {$ing:"n",v:String(v)};}
  if(t==="boolean")return v;if(t==="undefined")return {$ing:"u"};if(t==="bigint")return {$ing:"bi",v:v.toString()};
  if(t!=="object"){B.skipped++;return {$ing:"x",t:t};}
  path=path||[];if(path.indexOf(v)>=0||path.length>400){B.skipped++;return {$ing:"x",t:"cycle"};}
  var tag=Object.prototype.toString.call(v).slice(8,-1),out,i;path.push(v);
  try{
    if(Array.isArray(v)){out=new Array(v.length);for(i=0;i<v.length;i++)out[i]=(i in v)?enc(v[i],B,path):{$ing:"hole"};return out;}
    switch(tag){
      case "Date":var tm=v.getTime();return {$ing:"d",v:isNaN(tm)?"NaN":tm};
      case "RegExp":return {$ing:"re",s:v.source,f:v.flags};
      case "ArrayBuffer":return {$ing:"ab",b:B.u8(new Uint8Array(v))};
      case "DataView":return {$ing:"dv",b:B.u8(new Uint8Array(v.buffer,v.byteOffset,v.byteLength))};
      case "Blob":return {$ing:"blob",t:v.type||"",b:B.blob(v)};
      case "File":return {$ing:"file",t:v.type||"",n:v.name,m:v.lastModified,b:B.blob(v)};
      case "Map":out=[];v.forEach(function(x,k){out.push([enc(k,B,path),enc(x,B,path)]);});return {$ing:"map",v:out};
      case "Set":out=[];v.forEach(function(x){out.push(enc(x,B,path));});return {$ing:"set",v:out};
      case "Boolean":case "Number":case "String":return {$ing:"box",v:enc(v.valueOf(),B,path)};
      case "Error":return {$ing:"err",n:String(v.name||"Error"),m:String(v.message||"")};}
    if(ArrayBuffer.isView(v))return {$ing:"ta",c:tag,b:B.u8(new Uint8Array(v.buffer,v.byteOffset,v.byteLength))};
    var proto=Object.getPrototypeOf(v);
    if(proto===Object.prototype||proto===null){out={};var ks=Object.keys(v);for(i=0;i<ks.length;i++)setKey(out,ks[i],enc(v[ks[i]],B,path));
      return Object.prototype.hasOwnProperty.call(v,"$ing")?{$ing:"o",v:out}:out;}
    /* a handle to a file on this device, or a key the browser will not let out: it cannot be written down */
    B.skipped++;return {$ing:"x",t:tag};
  }finally{path.pop();}}
function sub(bin,b){if(!bin||!Array.isArray(b)||b[0]+b[1]>bin.length)throw damaged("a part's bytes are missing");return bin.subarray(b[0],b[0]+b[1]);}
function dec(j,bin){if(j===null||typeof j!=="object")return j;var i;
  if(Array.isArray(j)){var a=new Array(j.length);for(i=0;i<j.length;i++){var x=j[i];if(x&&typeof x==="object"&&x.$ing==="hole")continue;a[i]=dec(x,bin);}return a;}
  var t=j.$ing,o,k;
  if(t===undefined){o={};for(k in j)if(Object.prototype.hasOwnProperty.call(j,k))setKey(o,k,dec(j[k],bin));return o;}
  switch(t){
    case "u":return undefined;case "n":return j.v==="-0"?-0:Number(j.v);case "bi":return (typeof BigInt==="function")?BigInt(j.v):Number(j.v);
    case "d":return new Date(j.v==="NaN"?NaN:j.v);case "re":return new RegExp(j.s,j.f);
    case "s":return TD.decode(sub(bin,j.b));
    case "ab":return sub(bin,j.b).slice().buffer;
    case "dv":return new DataView(sub(bin,j.b).slice().buffer);
    case "ta":var C=window[j.c],u=sub(bin,j.b).slice();return (C&&C.BYTES_PER_ELEMENT)?new C(u.buffer,0,u.byteLength/C.BYTES_PER_ELEMENT):u;
    case "blob":return new Blob([sub(bin,j.b)],{type:j.t||""});
    case "file":try{return new File([sub(bin,j.b)],j.n||"file",{type:j.t||"",lastModified:j.m});}catch(e){return new Blob([sub(bin,j.b)],{type:j.t||""});}
    case "map":return new Map((j.v||[]).map(function(p){return [dec(p[0],bin),dec(p[1],bin)];}));
    case "set":return new Set((j.v||[]).map(function(x){return dec(x,bin);}));
    case "box":return Object(dec(j.v,bin));
    case "err":var er=new Error(j.m);er.name=j.n;return er;
    case "o":o={};for(k in j.v)if(Object.prototype.hasOwnProperty.call(j.v,k))setKey(o,k,dec(j.v[k],bin));return o;}
  return null;}
/* records [{k,v}] → one part of the backup: its JSON and the bytes beside it */
function pack(recs){var B=new Bin(),list=recs.map(function(r){return [enc(r.k,B),enc(r.v,B)];});
  var json=TE.encode(JSON.stringify({v:1,recs:list}));
  var binP=B.len?readBlob(new Blob(B.parts)):Promise.resolve(null);
  return binP.then(function(bin){return {json:json,bin:bin,skipped:B.skipped};});}
function unpack(json,bin){var d;try{d=JSON.parse(TD.decode(json));}catch(e){throw damaged("a part cannot be read");}
  if(!d||!Array.isArray(d.recs))throw damaged("a part cannot be read");
  return d.recs.map(function(p){return {k:dec(p[0],bin),v:dec(p[1],bin)};});}
/* a rough weight, only to keep each part to a sensible size (the same data always gives the same parts) */
function weigh(v,dep){if(v==null)return 4;var t=typeof v;if(t==="string")return v.length+2;if(t!=="object")return 8;
  if(v instanceof ArrayBuffer)return v.byteLength;if(ArrayBuffer.isView(v))return v.byteLength;if(typeof Blob!=="undefined"&&v instanceof Blob)return v.size;
  dep=dep||0;if(dep>6)return 64;var n=16,i;if(Array.isArray(v)){for(i=0;i<v.length&&i<20000;i++)n+=weigh(v[i],dep+1);return n;}
  for(var k in v)if(Object.prototype.hasOwnProperty.call(v,k))n+=k.length+weigh(v[k],dep+1);return n;}

/* ---------- the zip: written a part at a time (each part becomes a Blob, which the browser may keep on disk), Zip64 when
   it grows past 4 GB; read back a slice at a time from the file chosen, so a large backup is never held whole ---------- */
var CRCT=null;
function crc32(u8){if(!CRCT){CRCT=new Int32Array(256);for(var n=0;n<256;n++){var c=n;for(var k=0;k<8;k++)c=c&1?0xEDB88320^(c>>>1):c>>>1;CRCT[n]=c;}}
  var x=-1;for(var i=0,L=u8.length;i<L;i++)x=CRCT[(x^u8[i])&255]^(x>>>8);return (x^-1)>>>0;}
function w16(a,o,v){a[o]=v&255;a[o+1]=(v>>>8)&255;}
function w32(a,o,v){a[o]=v&255;a[o+1]=(v>>>8)&255;a[o+2]=(v>>>16)&255;a[o+3]=(v>>>24)&255;}
function w64(a,o,v){w32(a,o,v%4294967296);w32(a,o+4,Math.floor(v/4294967296));}
function r16(a,o){return a[o]|(a[o+1]<<8);}
function r32(a,o){return (a[o]|(a[o+1]<<8)|(a[o+2]<<16)|(a[o+3]<<24))>>>0;}
function r64(a,o){return r32(a,o)+r32(a,o+4)*4294967296;}
function dosTime(d){return ((d.getHours()<<11)|(d.getMinutes()<<5)|(d.getSeconds()>>1))&0xffff;}
function dosDate(d){return (((Math.max(1980,d.getFullYear())-1980)<<9)|((d.getMonth()+1)<<5)|d.getDate())&0xffff;}
var DEF=null;
function deflateKind(){if(DEF!==null)return DEF;DEF="";try{new CompressionStream("deflate-raw");DEF="raw";}catch(e){try{new CompressionStream("deflate");DEF="zlib";}catch(e2){}}return DEF;}
function deflate(u8){var k=deflateKind();if(!k)return Promise.resolve(null);
  return new Response(new Blob([u8]).stream().pipeThrough(new CompressionStream(k==="raw"?"deflate-raw":"deflate"))).arrayBuffer()
    .then(function(b){var x=new Uint8Array(b);return k==="zlib"?x.subarray(2,x.length-4):x;},function(){return null;});}
function inflate(c,e){
  function gz(){var g=new Uint8Array(c.length+18);g.set([0x1f,0x8b,8,0,0,0,0,0,0,255]);g.set(c,10);var t=c.length+10;w32(g,t,e.crc);w32(g,t+4,e.usz%4294967296);return g;}
  try{new DecompressionStream("deflate-raw");return new Response(new Blob([c]).stream().pipeThrough(new DecompressionStream("deflate-raw"))).arrayBuffer().then(function(b){return new Uint8Array(b);});}catch(x){}
  try{new DecompressionStream("gzip");return new Response(new Blob([gz()]).stream().pipeThrough(new DecompressionStream("gzip"))).arrayBuffer().then(function(b){return new Uint8Array(b);});}catch(x){}
  if(typeof ingInflateGzip==="function")return Promise.resolve().then(function(){return ingInflateGzip(gz());}).then(toU8);
  return Promise.reject(new Error("this browser cannot open a compressed part"));}
function ZipOut(){this.parts=[];this.off=0;this.cd=[];this.when=new Date();}
ZipOut.prototype.add=function(name,u8,squeeze){var me=this,nb=TE.encode(name),crc=crc32(u8);
  return (squeeze&&u8.length>512?deflate(u8):Promise.resolve(null)).then(function(d){var meth=0,data=u8;if(d&&d.length<u8.length-64){meth=8;data=d;}
    var h=new Uint8Array(30+nb.length);w32(h,0,0x04034b50);w16(h,4,20);w16(h,6,0x0800);w16(h,8,meth);w16(h,10,dosTime(me.when));w16(h,12,dosDate(me.when));
    w32(h,14,crc);w32(h,18,data.length);w32(h,22,u8.length);w16(h,26,nb.length);w16(h,28,0);h.set(nb,30);
    me.parts.push(new Blob([h,data]));me.cd.push({nb:nb,crc:crc,csz:data.length,usz:u8.length,meth:meth,off:me.off});me.off+=h.length+data.length;
    return {size:u8.length,stored:data.length};});};
ZipOut.prototype.finish=function(){var me=this,cdStart=me.off,cdParts=[],cdLen=0;
  me.cd.forEach(function(e){var big=e.off>=0xFFFFFFFF,x=big?12:0,h=new Uint8Array(46+e.nb.length+x);
    w32(h,0,0x02014b50);w16(h,4,big?45:20);w16(h,6,big?45:20);w16(h,8,0x0800);w16(h,10,e.meth);w16(h,12,dosTime(me.when));w16(h,14,dosDate(me.when));
    w32(h,16,e.crc);w32(h,20,e.csz);w32(h,24,e.usz);w16(h,28,e.nb.length);w16(h,30,x);w16(h,32,0);w16(h,34,0);w16(h,36,0);w32(h,38,0);w32(h,42,big?0xFFFFFFFF:e.off);h.set(e.nb,46);
    if(big){var p=46+e.nb.length;w16(h,p,1);w16(h,p+2,8);w64(h,p+4,e.off);}
    cdParts.push(h);cdLen+=h.length;});
  var n=me.cd.length,z64=n>=0xFFFF||cdStart>=0xFFFFFFFF||cdLen>=0xFFFFFFFF,tail=[];
  if(z64){var r=new Uint8Array(56);w32(r,0,0x06064b50);w64(r,4,44);w16(r,12,45);w16(r,14,45);w64(r,24,n);w64(r,32,n);w64(r,40,cdLen);w64(r,48,cdStart);
    var l=new Uint8Array(20);w32(l,0,0x07064b50);w64(l,8,cdStart+cdLen);w32(l,16,1);tail.push(r,l);}
  var e=new Uint8Array(22);w32(e,0,0x06054b50);w16(e,8,z64?0xFFFF:n);w16(e,10,z64?0xFFFF:n);w32(e,12,z64?0xFFFFFFFF:cdLen);w32(e,16,z64?0xFFFFFFFF:cdStart);tail.push(e);
  return new Blob(me.parts.concat(cdParts,tail),{type:"application/zip"});};
function ZipIn(file){this.f=file;this.map=null;}
ZipIn.prototype.open=function(){var me=this,f=me.f,size=f.size;
  if(size<22)return Promise.reject(foreign());
  var tl=Math.min(size,65557+20+56);
  return slice(f,size-tl,size).then(function(t){var at=-1;for(var i=t.length-22;i>=0;i--){if(t[i]===0x50&&t[i+1]===0x4b&&t[i+2]===5&&t[i+3]===6){at=i;break;}}
      if(at<0)return slice(f,0,4).then(function(h){if(r32(h,0)===0x04034b50)throw damaged("it ends too soon, so it may not have been saved or copied whole");throw foreign();});
      var d={n:r16(t,at+10),cl:r32(t,at+12),co:r32(t,at+16)};
      if(d.n===0xFFFF||d.cl===0xFFFFFFFF||d.co===0xFFFFFFFF){var lp=at-20;if(lp>=0&&r32(t,lp)===0x07064b50){var zo=r64(t,lp+8);
        return slice(f,zo,zo+56).then(function(z){if(r32(z,0)!==0x06064b50)throw damaged("its index cannot be read");return {n:r64(z,32),cl:r64(z,40),co:r64(z,48)};});}}
      return d;})
    .then(function(d){if(d.co+d.cl>size)throw damaged("its index cannot be read");
      return slice(f,d.co,d.co+d.cl).then(function(c){var map={},o=0;
        for(var i=0;i<d.n;i++){if(o+46>c.length||r32(c,o)!==0x02014b50)throw damaged("its index cannot be read");
          var nl=r16(c,o+28),xl=r16(c,o+30),kl=r16(c,o+32),e={meth:r16(c,o+10),crc:r32(c,o+16),csz:r32(c,o+20),usz:r32(c,o+24),lho:r32(c,o+42)};
          var name=TD.decode(c.subarray(o+46,o+46+nl));
          if(e.usz===0xFFFFFFFF||e.csz===0xFFFFFFFF||e.lho===0xFFFFFFFF){var xo=o+46+nl,xe=xo+xl;while(xo+4<=xe){var id=r16(c,xo),sz=r16(c,xo+2);
            if(id===1){var q=xo+4;if(e.usz===0xFFFFFFFF){e.usz=r64(c,q);q+=8;}if(e.csz===0xFFFFFFFF){e.csz=r64(c,q);q+=8;}if(e.lho===0xFFFFFFFF){e.lho=r64(c,q);}}xo+=4+sz;}}
          map[name]=e;o+=46+nl+xl+kl;}
        me.map=map;return map;});});};
ZipIn.prototype.has=function(n){return !!(this.map&&Object.prototype.hasOwnProperty.call(this.map,n));};
ZipIn.prototype.read=function(name,checkCrc){var me=this,e=me.has(name)?me.map[name]:null;if(!e)return Promise.reject(damaged(name+" is missing"));
  return slice(me.f,e.lho,e.lho+30).then(function(h){if(h.length<30||r32(h,0)!==0x04034b50)throw damaged(name+" cannot be read");var s=e.lho+30+r16(h,26)+r16(h,28);return slice(me.f,s,s+e.csz);})
    .then(function(c){if(c.length!==e.csz)throw damaged(name+" cannot be read");if(e.meth===0)return c;if(e.meth===8)return inflate(c,e);throw damaged(name+" cannot be read");})
    .then(function(u){if(u.length!==e.usz||(checkCrc&&crc32(u)!==e.crc))throw damaged(name+" cannot be read");return u;},function(err){if(isCode(err))throw err;throw damaged(name+" cannot be read");});};

/* ---------- this device's stores ---------- */
function openExisting(name){return new Promise(function(res){var made=false,rq;try{rq=indexedDB.open(name);}catch(e){res(null);return;}
  rq.onupgradeneeded=function(ev){if(ev.oldVersion===0){made=true;try{rq.transaction.abort();}catch(e){}}};
  rq.onsuccess=function(){var d=rq.result;if(made){try{d.close();}catch(e){}res(null);return;}d.onversionchange=function(){try{d.close();}catch(e){}};res(d);};
  rq.onerror=function(ev){try{ev.preventDefault();}catch(e){}res(null);};});}
function listDbs(){var names={};KNOWN.forEach(function(n){names[n]=0;});
  var p=(indexedDB.databases?indexedDB.databases().then(function(a){(a||[]).forEach(function(d){if(d&&d.name)names[d.name]=1;});},function(){}):Promise.resolve());
  return p.then(function(){var all=Object.keys(names).sort();
    return seq(all,function(n){if(names[n])return n;return openExisting(n).then(function(d){if(!d)return null;try{d.close();}catch(e){}return n;});})
      .then(function(L){return L.filter(Boolean);});});}
function schema(d){return [].map.call(d.objectStoreNames,function(sn){var s=d.transaction(sn,"readonly").objectStore(sn);
  return {name:sn,keyPath:s.keyPath,autoIncrement:!!s.autoIncrement,indexes:[].map.call(s.indexNames,function(ix){var i=s.index(ix);return {name:i.name,keyPath:i.keyPath,unique:!!i.unique,multiEntry:!!i.multiEntry};})};});}
function count(d,sn){return new Promise(function(res,rej){try{var r=d.transaction(sn,"readonly").objectStore(sn).count();r.onsuccess=function(){res(r.result||0);};r.onerror=function(){rej(r.error);};}catch(e){rej(e);}});}
function getAll(d,sn){return new Promise(function(res,rej){try{var r=d.transaction(sn,"readonly").objectStore(sn).getAll();r.onsuccess=function(){res(r.result||[]);};r.onerror=function(){rej(r.error);};}catch(e){rej(e);}});}
/* a batch at a time, each in its own short transaction: the work between batches (fingerprints, squeezing) never holds a store open */
function readBatch(d,sn,after,started){return new Promise(function(res,rej){var out=[],w=0,done=true,t;
  try{t=d.transaction(sn,"readonly");var st=t.objectStore(sn),rq=st.openCursor(started?IDBKeyRange.lowerBound(after,true):null);
    rq.onsuccess=function(){var c=rq.result;if(!c)return;out.push({k:c.primaryKey,v:c.value});w+=weigh(c.value);if(out.length>=CHUNK_N||w>=CHUNK_B){done=false;return;}c.continue();};}catch(e){rej(e);return;}
  t.oncomplete=function(){res({recs:out,done:done,last:out.length?out[out.length-1].k:after});};t.onerror=t.onabort=function(){rej(t.error||new Error("this device's store could not be read"));};});}
function dumpStore(d,sn,onChunk,check){var after,started=false;
  function step(){if(check)check();return readBatch(d,sn,after,started).then(function(b){started=true;if(!b.recs.length)return;after=b.last;
    return pack(b.recs).then(function(ch){ch.n=b.recs.length;ch.keys=b.recs.map(function(r){return r.k;});return onChunk(ch);}).then(function(){if(!b.done)return rest().then(step);});});}
  return step();}
function openUp(name,version,stores){return new Promise(function(res){var rq,settled=false,to=setTimeout(function(){if(!settled){settled=true;res(null);}},8000);
  try{rq=indexedDB.open(name,version);}catch(e){clearTimeout(to);res(null);return;}
  rq.onupgradeneeded=function(){var d=rq.result;stores.forEach(function(s){if(d.objectStoreNames.contains(s.name))return;var o={};if(s.keyPath!=null)o.keyPath=s.keyPath;if(s.autoIncrement)o.autoIncrement=true;
    try{var st=d.createObjectStore(s.name,o);(s.indexes||[]).forEach(function(ix){try{st.createIndex(ix.name,ix.keyPath,{unique:!!ix.unique,multiEntry:!!ix.multiEntry});}catch(e){}});}catch(e){}});};
  rq.onsuccess=function(){var d=rq.result;d.onversionchange=function(){try{d.close();}catch(e){}};clearTimeout(to);if(settled){try{d.close();}catch(e){}return;}settled=true;res(d);};
  rq.onerror=function(ev){try{ev.preventDefault();}catch(e){}clearTimeout(to);if(!settled){settled=true;res(null);}};});}
/* the store as the backup knew it; a store missing here is made, never by raising the version past what this Ingenium opens */
function ensureDb(name,version,stores){return openExisting(name).then(function(d){
  if(!d)return openUp(name,Math.max(1,version||1),stores);
  var miss=stores.filter(function(s){return !d.objectStoreNames.contains(s.name);});if(!miss.length)return d;
  var cur=d.version;try{d.close();}catch(e){}
  if((version||1)>cur)return openUp(name,version,miss);return openExisting(name);});}
function clearStore(d,sn){return new Promise(function(res,rej){try{var t=d.transaction(sn,"readwrite");t.objectStore(sn).clear();t.oncomplete=function(){res();};t.onerror=t.onabort=function(){rej(t.error);};}catch(e){rej(e);}});}
function clearDb(name){return openExisting(name).then(function(d){if(!d)return;return seq([].slice.call(d.objectStoreNames),function(sn){return clearStore(d,sn);}).then(function(){d.close();},function(e){d.close();throw e;});});}
function stampOf(x){if(!x||typeof x!=="object")return 0;var ks=["changed","updated","updatedAt","modified","lastModified","at","made","created","ts","time"];
  for(var i=0;i<ks.length;i++){var v=x[ks[i]];if(typeof v==="number"&&v>0)return v;if(typeof v==="string"&&v){var t=Date.parse(v);if(t>0)return t;}}return 0;}
function stampDeep(x){var s=stampOf(x);try{if(x&&Array.isArray(x.messages)&&x.messages.length){var m=x.messages[x.messages.length-1];s=Math.max(s,stampOf(m),(m&&m.done)||0);}}catch(e){}return s;}
function writeRecs(d,sn,recs,mode){return new Promise(function(res,rej){var t,bad=0;try{t=d.transaction(sn,"readwrite");var s=t.objectStore(sn),inl=s.keyPath!=null;
    recs.forEach(function(r){function put(){try{if(inl)s.put(r.v);else s.put(r.v,r.k);}catch(e){bad++;}}
      if(mode==="merge"){try{var g=s.get(r.k);g.onsuccess=function(){var cur=g.result;if(cur!==undefined&&stampDeep(cur)>stampDeep(r.v))return;put();};}catch(e){put();}}else put();});}catch(e){rej(e);return;}
  t.oncomplete=function(){res(bad);};t.onerror=t.onabort=function(){rej(t.error||new Error("this device's store refused it (it may be full)"));};});}
function countIn(db,sn){return openExisting(db).then(function(d){if(!d)return 0;if(!d.objectStoreNames.contains(sn)){d.close();return 0;}
  return count(d,sn).then(function(n){d.close();return n;},function(){d.close();return 0;});},function(){return 0;});}

/* ---------- the desk ---------- */
var SECRET=/^(apiKey|api_key|token|accessToken|refreshToken|hfToken|ghToken|braveKey|secret|clientSecret|password|passphrase)$/i;
function isSecret(k,parent){if(SECRET.test(k))return true;return k==="key"&&!!parent&&typeof parent==="object"&&("provider" in parent||"base" in parent||"endpoint" in parent);}
/* connection keys and tokens on the desk: [path, value]; taken out when strip is set */
function secrets(o,strip){var out=[];(function walk(x,path,dep){if(!x||typeof x!=="object"||dep>8)return;
    if(Array.isArray(x)){x.forEach(function(v,i){walk(v,path.concat(i),dep+1);});return;}
    Object.keys(x).forEach(function(k){if(dep===0&&(k==="chats"||k==="yard"))return;var v=x[k];
      if(typeof v==="string"&&v&&isSecret(k,x)){out.push([path.concat(k),v]);if(strip)delete x[k];}else if(v&&typeof v==="object")walk(v,path.concat(k),dep+1);});})(o,[],0);
  return out;}
function getPath(o,p){for(var i=0;i<p.length;i++){if(!o||typeof o!=="object")return undefined;o=o[p[i]];}return o;}
function setPath(o,p,v){for(var i=0;i<p.length-1;i++){if(!o||typeof o!=="object")return false;o=o[p[i]];}if(!o||typeof o!=="object")return false;o[p[p.length-1]]=v;return true;}
function deskNow(){var raw;try{raw=JSON.stringify(state,typeof deskReplacer==="function"?deskReplacer:undefined);}catch(e){raw="{}";}return raw;}
function protectedKey(k){var key="ingenium_v4";try{key=KEY;}catch(e){}return k===key||/^ingenium_v4\.snap\d+$/.test(k)||/\.broken-\d+$/.test(k);}
function localPart(){var items={},count=0,bytes=0;try{for(var i=0;i<localStorage.length;i++){var k=localStorage.key(i);if(k==null||protectedKey(k))continue;var v=localStorage.getItem(k);items[k]=v;count++;bytes+=k.length+(v?v.length:0);}}catch(e){}
  return {items:items,count:count,bytes:bytes};}
function libRefsOf(st){var r={};try{var A=(st.appLib&&st.appLib.apps)||{};Object.keys(A).forEach(function(k){var a=A[k];if(a&&a.ref)r[a.ref]=1;if(a&&a.earlier&&a.earlier.ref)r[a.earlier.ref]=1;});}catch(e){}return r;}
function modelList(st){var out=[];try{(st.models||[]).forEach(function(x){if(!x)return;var nm=x.customName||x.name||x.fileName||x.id;if(!nm)return;
  out.push({name:String(nm),file:String(x.fileName||""),size:x.sizeBytes||0});});}catch(e){}return out;}
function censusState(st){st=st||{};var c={},chats=Array.isArray(st.chats)?st.chats:[];
  c.chats=chats.length;c.messages=chats.reduce(function(a,x){return a+((x&&Array.isArray(x.messages))?x.messages.length:0);},0);
  c.projects=Array.isArray(st.projects)?st.projects.length:0;
  c.notes=(Array.isArray(st.notes)?st.notes.length:0)+(Array.isArray(st.parked)?st.parked.length:0)+(Array.isArray(st.reminders)?st.reminders.length:0);
  var nl=0;try{var sets=(st.lector&&st.lector.sets)||{};Object.keys(sets).forEach(function(k){nl+=Object.keys((sets[k]&&sets[k].docs)||{}).length;});}catch(e){}c.lector=nl;
  c.sources=(st.fontes&&Array.isArray(st.fontes.items))?st.fontes.items.length:0;
  var lib=[];try{var A=(st.appLib&&st.appLib.apps)||{},NM=(typeof LIB_NAMES==="object"&&LIB_NAMES)||{};Object.keys(A).forEach(function(k){if(A[k]&&A[k].ref)lib.push({key:k,name:NM[k]||A[k].title||k,version:String(A[k].version||"")});});}catch(e){}
  c.library=lib;c.models=modelList(st);return c;}
function hubApi(){var H=window.fbHub;return H&&typeof H.exportAll==="function"&&typeof H.importAll==="function"?H:null;}
function hubCensus(d){var out={apps:[],issues:0,pulls:0};((d&&d.apps)||[]).forEach(function(a){if(!a)return;var i=(a.issues||[]).length,p=(a.pulls||[]).length;out.issues+=i;out.pulls+=p;out.apps.push({id:a.id,name:a.name||"",issues:i,pulls:p});});return out;}
function repoList(){if(!window.IngRepo||typeof IngRepo.list!=="function")return Promise.resolve([]);
  return IngRepo.list().then(function(rs){return (rs||[]).map(function(r){return {id:r.id,name:r.name||r.id};});},function(){return [];});}
/* what is here now, counted as a backup counts it */
function censusHere(){var c=censusState(JSON.parse(deskNow())),H=hubApi();
  return Promise.all([repoList(),countIn("ingenium_big","t"),countIn("ingenium_claude","conv"),countIn("ingenium_keys","k"),countIn("fabrica_made","meta"),
      H?H.exportAll().then(hubCensus,function(){return null;}):null])
    .then(function(x){c.fabrica=x[0];c.big=x[1];c.imported=x[2];c.keys=x[3];c.packages=x[4];var h=x[5]||{apps:[],issues:0,pulls:0};c.issues=h.issues;c.pulls=h.pulls;c.hubApps=h.apps;c.small=localPart().count;
      c.connections=secrets(JSON.parse(deskNow()),false).length;return c;});}

/* ======================= making a backup ======================= */
function make(o){o=o||{};var say=o.onProgress||function(){},sig=o.signal||{},api=shell();
  if(o.keys&&(!o.password||String(o.password).length<8))return Promise.reject(fail("password","The password for the keys needs at least eight characters."));
  if(o.keys&&!subtle())return Promise.reject(fail("crypto","This browser offers no encryption here, so the keys cannot be locked. Make the backup without them."));
  var zip=new ZipOut(),files={},now=new Date(),raw=deskNow(),st=JSON.parse(raw),sec=secrets(st,true),libRefs=libRefsOf(st),haveBig={},skipped=0;
  var m={kind:"ingenium-backup",format:FORMAT,app:"Ingenium",version:ver(),id:hex(rnd(8)),made:now.toISOString(),madeAt:now.getTime(),platform:hereNow(),
    options:{packages:!!o.packages,keys:!!o.keys},contents:[],stores:[],absent:[],disk:null,hub:null,secrets:null,secretPaths:sec.map(function(p){return p[0];}),
    models:modelList(st),census:{},leftOut:[],files:files};
  var total=0,doneN=0,bytesIn=0,phase="desk";
  function prog(frac,what){say({phase:phase,frac:Math.max(0,Math.min(1,frac)),bytes:bytesIn,what:what||""});}
  function check(){if(sig.stopped)throw fail("stopped","Stopped. Nothing was saved.");}
  function put(path,u8,squeeze){check();return sha(u8).then(function(h){files[path]={size:u8.length,sha256:h};bytesIn+=u8.length;return zip.add(path,u8,squeeze!==false);});}
  var hubData=null,plan=[];
  return Promise.resolve().then(function(){prog(0.01,"Your desk");
      var stJson=TE.encode(JSON.stringify(st));
      return put("desk/state.json",stJson).then(function(){var c=censusState(st);
        m.contents.push({id:"desk",label:"Your desk: conversations, notes, projects and settings",count:c.chats,unit:"conversation",bytes:stJson.length,files:["desk/state.json"]});
        var L=localPart(),lj=TE.encode(JSON.stringify(L.items));
        return put("desk/local.json",lj).then(function(){m.contents.push({id:"local",label:"The small store (what the apps inside keep for themselves)",count:L.count,unit:"entry",bytes:lj.length,files:["desk/local.json"]});m.census.small=L.count;});});})
    /* Fabrica's list first: on the computer apps it brings back into the store any app kept only on the disk */
    .then(function(){phase="count";prog(0.02,"Counting");return repoList();})
    .then(function(rs){m.census.fabrica=rs;var H=hubApi();if(!H)return;return H.exportAll().then(function(d){hubData=d;},function(){hubData=null;});})
    .then(function(){return listDbs();})
    .then(function(names){DATA_DBS.forEach(function(db){if(names.indexOf(db)<0)m.absent.push(db);});
      /* every store this page holds is named in the manifest: those that go, and those left out with the reason */
      var WHY={ingenium_files:"model files, file links and the engine: models never go in a backup",the_foundry_files:"an older name of the same store",ingenium_desk:"the desk's overflow copy: the desk itself goes whole (desk/state.json)",
        ingenium_keys:o.keys?"locked with the password (secrets.enc)":"not chosen",fabrica_made:"not chosen",ingenium_hub:"read through Fabrica's own export (fabrica/hub.json)"};
      m.excluded=[];
      names.forEach(function(db){var skip=NEVER[db]||db==="ingenium_keys"||(db==="fabrica_made"&&!o.packages)||(db==="ingenium_hub"&&hubData);
        if(skip){m.excluded.push({db:db,why:WHY[db]||""});return;}plan.push(db);});
      return seq(plan,function(db){return openExisting(db).then(function(d){if(!d)return null;var sch=schema(d);
        return seq(sch,function(s){return count(d,s.name).then(function(c){s.count=c;total+=c;},function(){s.count=0;});}).then(function(){d.close();return {db:db,schema:sch};});});});})
    .then(function(P){P=P.filter(Boolean);phase="stores";
      return seq(P,function(p,i){var dbo={db:p.db,label:LABEL[p.db]||null,version:1,count:0,bytes:0,stores:[]};
        return openExisting(p.db).then(function(d){if(!d)return;dbo.version=d.version;m.stores.push(dbo);
          return seq(p.schema,function(s,j){var so={name:s.name,keyPath:s.keyPath,autoIncrement:s.autoIncrement,indexes:s.indexes,count:0,bytes:0,files:[],digest:""},hs=[],k=0;dbo.stores.push(so);
              var base="stores/"+pad(i+1,2)+"-"+safe(p.db)+"/"+pad(j+1,2)+"-"+safe(s.name)+"/";
              return dumpStore(d,s.name,function(ch){k++;skipped+=ch.skipped;var jp=base+pad(k,4)+".json";
                  if(p.db==="ingenium_big"||p.db==="ingenium_apps")ch.keys.forEach(function(x){if(typeof x==="string")haveBig[x]=1;});
                  so.count+=ch.n;so.bytes+=ch.json.length+(ch.bin?ch.bin.length:0);doneN+=ch.n;
                  return put(jp,ch.json).then(function(){hs.push(files[jp].sha256);so.files.push(jp);if(!ch.bin)return;var bp=base+pad(k,4)+".bin";
                      return put(bp,ch.bin,true).then(function(){hs.push(files[bp].sha256);so.files.push(bp);});})
                    .then(function(){prog(0.03+0.85*(total?doneN/total:1),dbo.label||p.db);});},check)
                .then(function(){dbo.count+=so.count;dbo.bytes+=so.bytes;return sha(TE.encode(hs.join("\n"))).then(function(h){so.digest=h;});});})
            .then(function(){d.close();},function(e){try{d.close();}catch(_){}throw e;});})
          .then(function(){if(m.stores.indexOf(dbo)>=0)m.contents.push({id:"db:"+p.db,label:dbo.label||("The store “"+p.db+"”"),count:dbo.count,unit:"record",bytes:dbo.bytes,files:[].concat.apply([],dbo.stores.map(function(s){return s.files;}))});});});})
    /* on the computer apps, the long texts the desk names that only the disk still holds */
    .then(function(){if(!api)return;phase="disk";var scan=JSON.parse(raw);try{if(scan.yard)delete scan.yard.mir;}catch(e){}
      var s=JSON.stringify(scan),re=/"(big_[a-z0-9]{7,})"/g,mm,ids={};while((mm=re.exec(s)))if(!haveBig[mm[1]])ids[mm[1]]=1;
      var list=Object.keys(ids);if(!list.length)return;var recs=[],acc=0,k=0,dk={count:0,bytes:0,files:[]};
      function flush(){if(!recs.length)return Promise.resolve();var r=recs;recs=[];acc=0;k++;
        return pack(r).then(function(ch){var jp="disk/"+pad(k,4)+".json";return put(jp,ch.json).then(function(){dk.files.push(jp);if(!ch.bin)return;var bp="disk/"+pad(k,4)+".bin";return put(bp,ch.bin).then(function(){dk.files.push(bp);});});});}
      return seq(list,function(id,i){check();prog(0.88+0.04*(i/list.length),"Long texts on the disk");
          return Promise.resolve().then(function(){return api.big_get(id);}).then(function(r){if(!r||!r.ok||typeof r.text!=="string")return;
            recs.push({k:id,v:{t:r.text,lib:!!libRefs[id]}});acc+=r.text.length;dk.count++;dk.bytes+=r.text.length;if(acc>=CHUNK_B||recs.length>=CHUNK_N)return flush();},function(){});})
        .then(flush).then(function(){if(dk.count){m.disk=dk;m.contents.push({id:"disk",label:"Long texts kept on this computer's disk",count:dk.count,unit:"text",bytes:dk.bytes,files:dk.files});}});})
    .then(function(){if(!hubData)return;phase="hub";prog(0.93,"Fabrica's issues and pages");var hc=hubCensus(hubData),u=TE.encode(JSON.stringify(hubData));
      m.hub={file:"fabrica/hub.json",apps:hc.apps.length,issues:hc.issues,pulls:hc.pulls};
      return put("fabrica/hub.json",u).then(function(){m.contents.push({id:"hub",label:LABEL.ingenium_hub,count:hc.issues+hc.pulls,unit:"issue or pull request",bytes:u.length,files:["fabrica/hub.json"]});m.census.hubApps=hc.apps;m.census.issues=hc.issues;m.census.pulls=hc.pulls;});})
    .then(function(){if(!o.keys)return;phase="keys";prog(0.95,"Locking the keys");
      return keyRecords().then(function(keys){var payload={keys:keys.map(function(r){return {id:r.id,label:r.label||"",source:r.source||"",made:r.made||0,pkcs8:b64e(toU8(r.pkcs8)),cert:b64e(toU8(r.cert))};}),conn:sec};
        var salt=rnd(16),iv=rnd(12);
        return lockKey(o.password,salt,ITER).then(function(k){return subtle().encrypt({name:"AES-GCM",iv:iv,additionalData:TE.encode("ingenium-backup "+m.id)},k,TE.encode(JSON.stringify(payload)));})
          .then(function(ct){var u=new Uint8Array(ct);m.secrets={file:"secrets.enc",keys:payload.keys.length,connections:sec.length,kdf:{name:"PBKDF2",hash:"SHA-256",iterations:ITER,salt:b64e(salt)},cipher:{name:"AES-GCM",length:256,iv:b64e(iv)}};
            return put("secrets.enc",u,false).then(function(){m.contents.push({id:"secrets",label:"Signing keys and connection keys, locked with your password",count:payload.keys.length+sec.length,unit:"key",bytes:u.length,files:["secrets.enc"]});});});});})
    .then(function(){phase="manifest";prog(0.97,"The list of contents");
      var c=censusState(st);Object.keys(c).forEach(function(k){m.census[k]=c[k];});
      function storeCount(db,sn){var x=null;m.stores.forEach(function(d){if(d.db===db)d.stores.forEach(function(s){if(s.name===sn)x=s;});});return x?x.count:0;}
      m.census.big=storeCount("ingenium_big","t")+(m.disk?m.disk.count:0);m.census.imported=storeCount("ingenium_claude","conv");
      m.census.keys=m.secrets?m.secrets.keys:0;m.census.connections=sec.length;m.census.packages=o.packages?storeCount("fabrica_made","meta"):0;
      if(!m.census.hubApps){m.census.hubApps=[];m.census.issues=0;m.census.pulls=0;}
      m.leftOut.push({what:"Model files",why:"they are large and can be fetched again; their names are listed under models"});
      m.leftOut.push({what:"Links to files on this device",why:"a model or document opened from a folder here is chosen again on the other device"});
      m.leftOut.push({what:"The engine that runs models",why:"each Ingenium carries its own"});
      if(!o.packages)m.leftOut.push({what:"Fabrica's packages",why:"not chosen; each can be made again from its version"});
      if(!o.keys)m.leftOut.push({what:"Signing keys and connection keys",why:"not chosen; they go only when chosen, locked with a password"});
      if(skipped)m.leftOut.push({what:plural(skipped,"thing")+" the browser will not let out of its store",why:"handles to files on this device, which mean nothing elsewhere"});
      m.bytes=bytesIn;
      return put("manifest.json",TE.encode(JSON.stringify(m,null,1)));})
    .then(function(){phase="done";prog(1,"Ready");delete m.files["manifest.json"];var blob=zip.finish();
      return {blob:blob,name:"Ingenium-backup-"+now.getFullYear()+"-"+pad(now.getMonth()+1,2)+"-"+pad(now.getDate(),2)+".zip",size:blob.size,manifest:m};});}
function lockKey(pw,salt,iter){var s=subtle();return s.importKey("raw",TE.encode(String(pw)),"PBKDF2",false,["deriveKey"])
  .then(function(b){return s.deriveKey({name:"PBKDF2",salt:salt,iterations:iter||ITER,hash:"SHA-256"},b,{name:"AES-GCM",length:256},false,["encrypt","decrypt"]);});}
function keyRecords(){return openExisting("ingenium_keys").then(function(d){if(!d)return [];if(!d.objectStoreNames.contains("k")){d.close();return [];}return getAll(d,"k").then(function(a){d.close();return a;},function(){d.close();return [];});})
  .then(function(a){var api=shell();if(!api||a.some(function(r){return r&&r.id==="device";}))return a;
    return Promise.resolve().then(function(){return api.big_get("signing_device");}).then(function(r){if(r&&r.ok){var x=JSON.parse(r.text);a.push({id:x.id,label:x.label,source:x.source,made:x.made,pkcs8:b64d(x.pkcs8),cert:b64d(x.cert)});}return a;},function(){return a;});});}

/* ======================= reading a backup ======================= */
function open(file,o){o=o||{};var say=o.onProgress||function(){};
  if(!file||typeof file.size!=="number"||typeof file.slice!=="function")return Promise.reject(foreign());
  if(!file.size)return Promise.reject(foreign("This file is empty, so it is not a backup."));
  return slice(file,0,Math.min(4,file.size)).then(function(h){
    if(h.length>=2&&h[0]===0x50&&h[1]===0x4b)return openZip(file,say);
    if(file.size>480*1024*1024)throw foreign();
    return readBlob(file).then(function(u){var d;try{d=JSON.parse(TD.decode(u));}catch(e){throw foreign();}return fromJson(d);});});}
function fromJson(d){if(!d||typeof d!=="object"||Array.isArray(d))throw foreign();
  if(d.kind==="ingenium-hub")throw foreign("This is a copy of Fabrica's issues and pages, not a whole backup. Bring it back in Fabrica: an app's Settings, Bring a copy back.");
  if(d.kind==="ingenium-backup")throw foreign("This is only the list of contents of a backup. Choose the backup's .zip file itself.");
  var deskish=["chats","appName","models","notes","theme","reminders","build","parked"].filter(function(k){return k in d;}).length;
  if(deskish<2)throw foreign();
  return {kind:"desk",state:d,manifest:{kind:"desk-json",format:0,app:"Ingenium",version:"",made:d.__deskAt?new Date(d.__deskAt).toISOString():null,madeAt:d.__deskAt||0,platform:null,
    census:censusState(d),models:modelList(d),files:{},stores:[],absent:[],secretPaths:[],contents:[{id:"desk",label:"Your desk: conversations, notes, projects and settings",count:censusState(d).chats,unit:"conversation",bytes:0}]},parts:1,bytes:0};}
function openZip(file,say){var z=new ZipIn(file);
  return z.open().then(function(map){if(!z.has("manifest.json"))throw foreign(Object.keys(map).length?"This zip file is not an Ingenium backup: it has no Ingenium list of contents.":null);
      return z.read("manifest.json",true);})
    .then(function(u){var m;try{m=JSON.parse(TD.decode(u));}catch(e){throw damaged("its list of contents cannot be read");}
      if(!m||typeof m!=="object")throw damaged("its list of contents cannot be read");
      if(m.kind==="forge-app-library")throw foreign("This is an app library file, not a backup. Bring it in with Add your apps.");
      if(m.kind!=="ingenium-backup")throw foreign("This zip file is not an Ingenium backup.");
      if(typeof m.format!=="number"||m.format>FORMAT)throw fail("newer","This backup was made by a newer Ingenium"+(m.version?" ("+m.version+")":"")+". Update Ingenium here first, then restore it."+NOTHING);
      if(!m.files||typeof m.files!=="object"||!m.files["desk/state.json"])throw damaged("its list of contents is incomplete");
      return verify(z,m,say).then(function(v){return {kind:"zip",zip:z,manifest:m,file:file,parts:v.parts,bytes:v.bytes};});});}
/* every part against its fingerprint, before anything changes */
function verify(z,m,say){var names=Object.keys(m.files),bad=[],seen=0,total=0;names.forEach(function(n){total+=+(m.files[n]&&m.files[n].size)||0;});
  return seq(names,function(n,i){var f=m.files[n]||{};
      var job=!z.has(n)?Promise.resolve(bad.push({name:n,why:"missing"})):z.read(n).then(function(u){if(u.length!==f.size){bad.push({name:n,why:"size"});return;}
        return sha(u).then(function(h){if(h!==f.sha256)bad.push({name:n,why:"fingerprint"});});},function(){bad.push({name:n,why:"unreadable"});});
      return job.then(function(){seen+=+f.size||0;say({phase:"check",frac:total?seen/total:(i+1)/names.length,what:n});if(i%8===7)return rest();});})
    .then(function(){if(bad.length)throw damaged(bad.length===1?"one of its "+num(names.length)+" parts does not match its fingerprint":num(bad.length)+" of its "+num(names.length)+" parts do not match their fingerprints",{bad:bad,parts:names.length});
      return {parts:names.length,bytes:total};});}
function readDesk(b){if(b.kind==="desk")return Promise.resolve(JSON.parse(JSON.stringify(b.state)));
  return b.zip.read("desk/state.json").then(function(u){try{return JSON.parse(TD.decode(u));}catch(e){throw damaged("its desk cannot be read");}});}
function readJson(b,name){return b.zip.read(name).then(function(u){try{return JSON.parse(TD.decode(u));}catch(e){throw damaged(name+" cannot be read");}});}
function unlock(b,pw){var m=b.manifest,S=m&&m.secrets;if(!S)return Promise.resolve(null);
  if(!subtle())return Promise.reject(fail("crypto","This browser offers no encryption here, so the keys cannot be opened. Restore without them, or on another browser."));
  if(!pw)return Promise.reject(fail("password","Write the keys' password, or restore without the keys."));
  return b.zip.read(S.file||"secrets.enc").then(function(ct){return lockKey(pw,b64d(S.kdf.salt),S.kdf.iterations).then(function(k){
      return subtle().decrypt({name:"AES-GCM",iv:b64d(S.cipher.iv),additionalData:TE.encode("ingenium-backup "+m.id)},k,ct);});})
    .then(function(pt){var d=JSON.parse(TD.decode(new Uint8Array(pt)));
      return {keys:(d.keys||[]).map(function(r){return {id:r.id,label:r.label,source:r.source,made:r.made,pkcs8:b64d(r.pkcs8),cert:b64d(r.cert)};}),conn:Array.isArray(d.conn)?d.conn:[]};},
      function(e){if(isCode(e))throw e;throw fail("password","That password does not open the keys."+NOTHING);});}

/* ---------- merging: what the backup holds is added; where both hold the same thing, the newer is kept; a setting both hold stays as it is here ---------- */
function isRec(o){return !!o&&typeof o==="object"&&!Array.isArray(o)&&("id" in o||"ref" in o);}
function idOf(x){return x&&typeof x==="object"&&(typeof x.id==="string"||typeof x.id==="number")?String(x.id):null;}
function mergeVal(h,t){if(h===undefined)return t;if(t===undefined)return h;
  if(Array.isArray(h)&&Array.isArray(t)){var all=h.concat(t);
    if(all.length&&all.every(function(x){return idOf(x)!==null;})){var at={},out=h.slice();h.forEach(function(x,i){at[idOf(x)]=i;});
      t.forEach(function(x){var k=idOf(x);if(Object.prototype.hasOwnProperty.call(at,k)){if(stampDeep(x)>stampDeep(out[at[k]]))out[at[k]]=x;}else{at[k]=out.length;out.push(x);}});return out;}
    if(all.every(function(x){return x===null||typeof x!=="object";})){var seen={},o2=[];all.forEach(function(x){var k=typeof x+":"+String(x);if(!seen[k]){seen[k]=1;o2.push(x);}});return o2;}
    var js={};h.forEach(function(x){try{js[JSON.stringify(x)]=1;}catch(e){}});return h.concat(t.filter(function(x){try{return !js[JSON.stringify(x)];}catch(e){return true;}}));}
  if(h&&t&&typeof h==="object"&&typeof t==="object"&&!Array.isArray(h)&&!Array.isArray(t)){
    if(isRec(h)||isRec(t))return stampDeep(t)>stampDeep(h)?t:h;
    var o={};Object.keys(h).forEach(function(k){o[k]=h[k];});Object.keys(t).forEach(function(k){o[k]=mergeVal(h[k],t[k]);});return o;}
  return h;}
/* the desk to be: the backup's (Replace) or both (Merge); this device's models stay, and its own keys where the backup left them out */
function buildState(bst,mode,sec,m){var here=JSON.parse(deskNow()),mine=secrets(here,false),out=mode==="merge"?mergeVal(here,bst):bst;
  if(!out||typeof out!=="object")out={};
  DEVICE_KEYS.forEach(function(k){if(here[k]!==undefined)out[k]=here[k];else delete out[k];});
  try{if(!out.v61||typeof out.v61!=="object")out.v61={};out.v61=Object.assign({},out.v61);out.v61.backup=(here.v61&&here.v61.backup)?here.v61.backup:{};}catch(e){}
  /* where the computer app keeps its copy of Fabrica's apps on disk belongs to this device: on Replace its list starts afresh
     (the apps are written there again once restored), so an app replaced here is not brought back from the old copy */
  try{var hm=here.yard&&here.yard.mir;if(out.yard&&typeof out.yard==="object"){out.yard=Object.assign({},out.yard);delete out.yard.mir;}
    if(hm){if(!out.yard||typeof out.yard!=="object")out.yard={};out.yard.mir=mode==="merge"?hm:{segs:(hm.segs||[]).slice(),recs:{}};}}catch(e){}
  /* 6.7 (security audit): a connection's key belongs to the one address it was saved with. A backup chooses the addresses
     in its desk, so a key must never land on an address the backup chose.
     - the backup's own keys (sec.conn, opened from secrets.enc) go back only where the restored desk keeps the very address
       they were saved with (the backup's desk, bst); if the restore changed that address, the key is left out;
     - this device's keys (mine) fill a blank only where the restored connection's address is still this device's own; if the
       restore would move that connection to another address or provider, the key is left empty, not carried across. */
  var dropped=[],bsec={};try{secrets(JSON.parse(JSON.stringify(bst)),false).forEach(function(p){bsec[p[0].join(".")]=connOf(bst,p[0]);});}catch(e){}
  if(sec&&Array.isArray(sec.conn))sec.conn.forEach(function(p){if(!Array.isArray(p[0]))return;var saved=bsec[p[0].join(".")],nowC=connOf(out,p[0]);
    if(saved&&!sameEndpoint(saved,nowC)){dropped.push(p[0]);return;}setPath(out,p[0],p[1]);});
  mine.forEach(function(p){var cur=getPath(out,p[0]);if(cur!==undefined&&cur!=="")return;var hc=connOf(here,p[0]),nowC=connOf(out,p[0]);
    if(!sameEndpoint(hc,nowC)){if(dropped.indexOf(p[0])<0)dropped.push(p[0]);return;}setPath(out,p[0],p[1]);});
  try{if(m&&typeof m==="object")m.__droppedKeys=dropped.map(function(p){return p.join(".");});}catch(e){}
  /* every piece of HTML a restore brings in is cut down to safe formatting, so a note or Tabula page from a backup cannot run
     as Ingenium when it is later drawn into the page */
  restoreSafeHtml(out);
  return out;}
/* the HTML a restore carries: notes, parked thoughts, reminders and the Tabula page, each kept as formatting only */
function cleanMarkup(s){if(typeof s!=="string"||!s)return s;try{if(window.IngSafe&&typeof IngSafe.html==="function")return IngSafe.html(s);}catch(e){}
  try{var t=document.createElement("template");t.innerHTML=s;t.content.querySelectorAll("script,style,iframe,object,embed,link,meta,base,form,svg").forEach(function(n){n.remove();});
    t.content.querySelectorAll("*").forEach(function(n){for(var i=n.attributes.length-1;i>=0;i--){var a=n.attributes[i],nm=a.name.toLowerCase(),v=String(a.value||"").replace(/\s+/g,"").toLowerCase();
      if(nm.indexOf("on")===0||((nm==="href"||nm==="src"||nm==="xlink:href")&&(v.indexOf("javascript:")===0||v.indexOf("vbscript:")===0||(v.indexOf("data:")===0&&nm!=="src"))))n.removeAttribute(a.name);}});return t.innerHTML;}catch(e){return "";}}
function restoreSafeHtml(st){try{["notes","parked","reminders"].forEach(function(k){if(Array.isArray(st[k]))st[k].forEach(function(n){if(n&&typeof n.text==="string")n.text=cleanMarkup(n.text);});});
    if(st.tabulaDoc&&typeof st.tabulaDoc.body==="string")st.tabulaDoc.body=cleanMarkup(st.tabulaDoc.body);}catch(e){}}

/* ---------- what a backup holds, and what it would change here ---------- */
function rowsFor(bc,hc,mc,mode,b,withKeys){var R=[],rep=mode!=="merge";
  function row(label,bv,hv,after,note){R.push({label:label,backup:bv,here:hv,after:after,note:note||""});}
  row("Conversations",bc.chats,hc.chats,rep?bc.chats:mc.chats);
  row("Messages",bc.messages,hc.messages,rep?bc.messages:mc.messages);
  row("Apps in Code",bc.projects,hc.projects,rep?bc.projects:mc.projects);
  row("Notes, parked thoughts and reminders",bc.notes,hc.notes,rep?bc.notes:mc.notes);
  row("Lector's documents",bc.lector,hc.lector,rep?bc.lector:mc.lector);
  row("Sources in Fontes",bc.sources,hc.sources,rep?bc.sources:mc.sources);
  row("Apps in your library",(bc.library||[]).length,(hc.library||[]).length,rep?(bc.library||[]).length:(mc.library||[]).length,(bc.library||[]).map(function(a){return a.name+(a.version?" "+a.version:"");}).join(", "));
  if(b.kind==="zip"){var bf=bc.fabrica||[],hf=hc.fabrica||[],ids={};hf.forEach(function(r){ids[r.id]=1;});var added=bf.filter(function(r){return !ids[r.id];});
    row("Apps in Fabrica, with every version",bf.length,hf.length,rep?bf.length:hf.length+added.length,bf.map(function(r){return r.name;}).join(", "));
    var bi=(bc.issues||0)+(bc.pulls||0),hi=(hc.issues||0)+(hc.pulls||0),mi=hi;
    if(!rep){var named={};(bc.hubApps||[]).forEach(function(a){named[a.id]=a.issues+a.pulls;});mi=0;(hc.hubApps||[]).forEach(function(a){if(!(a.id in named))mi+=a.issues+a.pulls;});Object.keys(named).forEach(function(k){mi+=named[k];});}
    row("Issues and pull requests",bi,hi,rep?bi:mi);
    row("Long texts in the large store",bc.big||0,hc.big||0,rep?(bc.big||0):"up to "+num((bc.big||0)+(hc.big||0)));
    if(bc.imported||hc.imported)row("Conversations brought in from elsewhere",bc.imported||0,hc.imported||0,rep?(bc.imported||0):"up to "+num((bc.imported||0)+(hc.imported||0)));
    var bk=(b.manifest.secrets&&b.manifest.secrets.keys)||0;if(bk||hc.keys)row("Signing keys",bk?bk+" (locked)":0,hc.keys||0,!withKeys||!bk?hc.keys||0:(rep?bk:"up to "+num(bk+(hc.keys||0))),!bk?"not in this backup: the keys here stay":"");
    if(bc.packages||(b.manifest.options&&b.manifest.options.packages))row("Fabrica's packages",bc.packages||0,hc.packages||0,rep?(bc.packages||0):"up to "+num((bc.packages||0)+(hc.packages||0)));
    else if(hc.packages)row("Fabrica's packages","not in it",hc.packages,hc.packages,"the packages here stay");}
  return R;}
function describe(b,mode,withKeys){mode=mode==="merge"?"merge":"replace";var m=b.manifest;
  return Promise.all([censusHere(),readDesk(b)]).then(function(x){var hc=x[0],bst=x[1],bc=Object.assign({},censusState(bst),m.census||{});
    var mc=censusState(buildState(JSON.parse(JSON.stringify(bst)),"merge",null,m));
    var rows=rowsFor(bc,hc,mc,mode,b,withKeys),lines=[];
    if(mode==="replace"){lines.push("What is here is replaced by what the backup holds: the conversations, apps, documents and settings in the table.");}
    else{lines.push("What the backup holds is added to what is here. Where both hold the same conversation, note or app, the newer one is kept.");lines.push("Your settings here stay as they are; what this device lacks is added.");}
    lines.push("Your models stay as they are here"+((m.models||[]).length?"; the backup names "+plural(m.models.length,"model")+" to fetch again (below).":"."));
    if(m.secrets){lines.push(withKeys?"The signing keys and connection keys are opened with their password and put back.":"The signing keys and connection keys stay locked in the backup; the ones here stay.");}
    else if(b.kind==="zip")lines.push("This backup holds no signing keys or connection keys: the ones here stay.");
    /* 6.7: a plain word when a connection's address changes, so a key is not carried onto an address the backup chose */
    var cc=connChange(bst,mode,m,withKeys);
    if(cc.device)lines.push("A connection here (its cloud model, GitHub or search) is set to a different address or provider in this backup. Its key or token is left empty, not moved to the new address. Connect again and enter the key when you need it.");
    if(cc.backup)lines.push("This backup carries a key for a connection whose address it also changed. That key is not put back: a key is only ever used with the address it was saved with.");
    if(b.kind==="desk")lines.push("This is a desk backup from an earlier Ingenium: it holds the desk only (conversations, notes, projects and settings). Fabrica's apps, Lector's documents and the stores here are left as they are.");
    if(m.options&&!m.options.packages&&hc.packages)lines.push("Fabrica's packages are not in this backup: the ones here stay.");
    lines.push("Your desk as it is now goes onto the recovery shelf first"+(api0()&&typeof api0().desk_keep_now==="function"?", and this computer keeps a copy of it":"")+" (Settings, Recover an earlier moment).");
    var room=navigator.storage&&navigator.storage.estimate?navigator.storage.estimate().then(function(e){var free=(e.quota||0)-(e.usage||0),need=b.bytes||0;
      if(e.quota&&need>free*0.9)lines.push("This device may be short of room: the backup holds "+size(need)+", and this browser offers about "+size(Math.max(0,free))+" more.");},function(){}):Promise.resolve();
    return room.then(function(){return {rows:rows,lines:lines,here:hc,backup:bc,models:m.models||[],secrets:m.secrets||null,fresh:isFresh(hc)};});});}
/* a new device: no work of the owner's yet (the apps Ingenium carries are put in the library at first start, so the library does not count) */
function isFresh(hc){return hc.chats<=1&&hc.messages<=2&&!(hc.fabrica||[]).length&&!hc.lector&&!hc.projects&&!hc.notes&&!(hc.issues||0)&&!(hc.big||0);}
/* 6.7: would restoring change a connection's address so that a key is not carried onto it? device: a key here; backup: a key the backup holds */
function connChange(bst,mode,m,withKeys){var here=JSON.parse(deskNow()),out=mode==="merge"?mergeVal(JSON.parse(JSON.stringify(here)),JSON.parse(JSON.stringify(bst))):JSON.parse(JSON.stringify(bst));
  var r={device:false,backup:false};
  try{secrets(here,false).forEach(function(p){var cur=getPath(out,p[0]);if(cur!==undefined&&cur!=="")return;if(!sameEndpoint(connOf(here,p[0]),connOf(out,p[0])))r.device=true;});}catch(e){}
  try{if(withKeys&&m&&Array.isArray(m.secretPaths))m.secretPaths.forEach(function(path){if(!Array.isArray(path))return;if(!sameEndpoint(connOf(bst,path),connOf(out,path)))r.backup=true;});}catch(e){}
  return r;}

/* ======================= restoring ======================= */
function shelve(){var cur=deskNow();try{_snapAt=0;}catch(e){}try{if(typeof ingNoteSnapshot==="function")ingNoteSnapshot(cur);}catch(e){}
  var a=api0();try{if(a&&typeof a.desk_keep_now==="function")return Promise.resolve(a.desk_keep_now("before-restore")).catch(function(){});}catch(e){}return Promise.resolve();}
function apply(b,o){o=o||{};var mode=o.mode==="merge"?"merge":"replace",say=o.onProgress||function(){},m=b.manifest,api=shell(),report={mode:mode,problems:[],stores:0,records:0};
  var total=0;(m.stores||[]).forEach(function(d){d.stores.forEach(function(s){total+=s.count||0;});});total+=(m.disk&&m.disk.count)||0;var done=0;
  function prog(frac,what){say({phase:"restore",frac:Math.max(0,Math.min(1,frac)),what:what||""});}
  var secP=o.secrets!==undefined?Promise.resolve(o.secrets):((m.secrets&&o.withKeys!==false&&o.password)?unlock(b,o.password):Promise.resolve(null));
  var bst=null,sec=null;
  return secP.then(function(s){sec=s;return readDesk(b);}).then(function(x){bst=x;prog(0.01,"Keeping your desk as it is now");return shelve();})
    .then(function(){/* 1. the desk, first: from here on, everything the stores hold is named by it */
      var ns=buildState(bst,mode,sec,m);Object.keys(state).forEach(function(k){delete state[k];});Object.keys(ns).forEach(function(k){state[k]=ns[k];});
      if(m.__droppedKeys&&m.__droppedKeys.length)report.problems.push("A connection's address changed in this backup, so its key or token was left empty, not carried onto the new address. Open that connection and enter the key when you need it.");
      V().restored={at:Date.now(),made:m.madeAt||0,from:(m.platform&&m.platform.label)||"",version:m.version||"",mode:mode,models:(m.models||[]).map(function(x){return x.name;}),told:false};
      keep();prog(0.04,"Your desk");
      if(b.kind!=="zip")return;
      /* 2. the small store */
      return readJson(b,"desk/local.json").then(function(L){L=L||{};try{if(mode==="replace"){var gone=[];for(var i=0;i<localStorage.length;i++){var k=localStorage.key(i);if(k!=null&&!protectedKey(k)&&!Object.prototype.hasOwnProperty.call(L,k))gone.push(k);}gone.forEach(function(k){localStorage.removeItem(k);});}}catch(e){}
        var refused=0;Object.keys(L).forEach(function(k){if(protectedKey(k))return;try{if(mode==="merge"&&localStorage.getItem(k)!==null)return;localStorage.setItem(k,L[k]);}catch(e){refused++;}});
        if(refused)report.problems.push(plural(refused,"entry","entries")+" of the small store could not be kept: this browser's small store is full.");});})
    .then(function(){if(b.kind!=="zip")return;
      /* 3. every store, a part at a time */
      return seq(m.stores||[],function(dbo){return ensureDb(dbo.db,dbo.version,dbo.stores).then(function(d){
          if(!d){report.problems.push((dbo.label||dbo.db)+" could not be opened here, so it was not put back.");return;}
          return seq(dbo.stores,function(so){if(!d.objectStoreNames.contains(so.name)){report.problems.push((dbo.label||dbo.db)+": the part “"+so.name+"” has no place here, so it was not put back.");return;}
              return (mode==="replace"?clearStore(d,so.name):Promise.resolve()).then(function(){
                var js=so.files.filter(function(f){return /\.json$/.test(f);});
                return seq(js,function(jp){var bp=jp.replace(/\.json$/,".bin");
                  return Promise.all([b.zip.read(jp),so.files.indexOf(bp)>=0?b.zip.read(bp):null]).then(function(x){var recs=unpack(x[0],x[1]);
                    return writeRecs(d,so.name,recs,mode).then(function(bad){if(bad)report.problems.push(plural(bad,"record")+" in "+(dbo.label||dbo.db)+" did not fit this device's store.");
                      done+=recs.length;report.records+=recs.length;prog(0.05+0.8*(total?done/total:1),dbo.label||dbo.db);return mirror(api,dbo.db,so.name,recs);});});});});})
            .then(function(){report.stores++;d.close();},function(e){try{d.close();}catch(_){}throw e;});});})
        .then(function(){if(mode!=="replace")return;return seq(m.absent||[],function(db){return clearDb(db).catch(function(){});});});})
    .then(function(){/* 4. on a computer that made the backup, the long texts its disk alone kept */
      if(b.kind!=="zip"||!m.disk||!m.disk.files)return;var js=m.disk.files.filter(function(f){return /\.json$/.test(f);});
      return seq(js,function(jp){var bp=jp.replace(/\.json$/,".bin");return Promise.all([b.zip.read(jp),m.disk.files.indexOf(bp)>=0?b.zip.read(bp):null]).then(function(x){var recs=unpack(x[0],x[1]);
        return seq(recs,function(r){var v=r.v||{};done++;prog(0.05+0.8*(total?done/total:1),"Long texts");
          if(v.lib)return ensureDb("ingenium_apps",1,[{name:"b",keyPath:null}]).then(function(d){if(!d)return;var u=TE.encode(String(v.t||""));
            return writeRecs(d,"b",[{k:r.k,v:u}],mode).then(function(){d.close();return mirror(api,"ingenium_apps","b",[{k:r.k,v:u}]);},function(e){d.close();throw e;});});
          return (window.IngBig&&IngBig.put)?Promise.resolve(IngBig.put(r.k,String(v.t||""))):null;});});});})
    .then(function(){/* 5. Fabrica's issues and pages, once its apps are back */
      if(b.kind!=="zip"||!m.hub)return;prog(0.87,"Fabrica's issues and pages");
      return readJson(b,m.hub.file||"fabrica/hub.json").then(function(d){var H=hubApi();
        return (mode==="replace"?clearDb("ingenium_hub").catch(function(){}):Promise.resolve()).then(function(){
          if(H)return H.importAll(d).then(function(r){report.hub=r;});
          return ensureDb("ingenium_hub",1,[{name:"apps",keyPath:null}]).then(function(db){if(!db)return;var recs=(d.apps||[]).filter(function(a){return a&&a.id;}).map(function(a){var c=JSON.parse(JSON.stringify(a));delete c.name;return {k:a.id,v:c};});
            return writeRecs(db,"apps",recs,mode).then(function(){db.close();});});});});})
    .then(function(){/* 6. the signing keys, when opened with their password */
      if(!sec||!sec.keys)return;prog(0.9,"The signing keys");
      return ensureDb("ingenium_keys",1,[{name:"k",keyPath:null}]).then(function(d){if(!d){report.problems.push("The signing keys could not be put back here.");return;}
        return (mode==="replace"?clearStore(d,"k"):Promise.resolve()).then(function(){return writeRecs(d,"k",sec.keys.map(function(r){return {k:r.id,v:r};}),"replace");})
          .then(function(){d.close();if(api)sec.keys.forEach(function(r){try{api.big_put("signing_"+r.id,JSON.stringify({id:r.id,label:r.label,source:r.source,made:r.made,pkcs8:b64e(toU8(r.pkcs8)),cert:b64e(toU8(r.cert))}));}catch(e){}});},function(e){d.close();throw e;});});})
    .then(function(){/* 7. the computer app writes its disk copy of Fabrica's apps again, from what is now in the store */
      if(!api||b.kind!=="zip"||!window.IngRepo||!IngRepo.core||typeof IngRepo.core.remirror!=="function")return;prog(0.93,"Fabrica's apps, on this computer's disk");
      return IngRepo.core.remirror().catch(function(){report.problems.push("Fabrica's apps are back in this device's store; their copy on this computer's disk is written again when an app next changes.");});})
    .then(function(){/* 8. the desk, kept everywhere it is kept */
      prog(0.96,"Saving");keep();var a=api0();try{if(a&&typeof a.save_state==="function")return Promise.resolve(a.save_state(deskNow())).catch(function(){});}catch(e){}})
    .then(function(){/* 9. checked: each store holds what the backup holds */
      if(b.kind!=="zip")return;return seq(m.stores||[],function(dbo){return seq(dbo.stores,function(so){return countIn(dbo.db,so.name).then(function(c){
        if(mode==="replace"?c!==so.count:c<so.count)report.problems.push((dbo.label||dbo.db)+" holds "+num(c)+" of the "+num(so.count)+" records the backup holds.");});});});})
    .then(function(){prog(1,"Done");report.ok=!report.problems.length;
      if(o.reload!==false)setTimeout(function(){try{location.reload();}catch(e){}},o.reloadAfter||1400);return report;});}
/* on a computer app, what goes into a store goes onto its disk as well, as the store's own code does */
function mirror(api,db,sn,recs){if(!api)return Promise.resolve();
  if(db==="ingenium_big"&&sn==="t")return seq(recs,function(r){if(typeof r.k==="string"&&typeof r.v==="string"&&r.v.length<=BIG_DISK_MAX)return Promise.resolve(api.big_put(r.k,r.v)).catch(function(){});});
  if(db==="ingenium_apps"&&sn==="b")return seq(recs,function(r){if(typeof r.k!=="string")return;var u=toU8(r.v);if(!u.length)return;return Promise.resolve(api.big_put(r.k,TD.decode(u))).catch(function(){});});
  return Promise.resolve();}
function restore(file,o){o=o||{};return open(file,o).then(function(b){return apply(b,o).then(function(r){r.backup=b.manifest;return r;});});}

/* ---------- the fingerprints of what is here, store by store, as a backup would take them (for a check after a move) ---------- */
function fingerprints(){var out={state:null,local:null,stores:{},hub:null},st=JSON.parse(deskNow());
  DEVICE_KEYS.concat(["__deskAt","presence","presenceSince","presenceLog","presenceSync"]).forEach(function(k){delete st[k];});try{delete st.v61.backup;}catch(e){}try{delete st.yard.mir;}catch(e){}secrets(st,true);
  var L=localPart().items,lk={};Object.keys(L).sort().forEach(function(k){lk[k]=L[k];});
  return sha(TE.encode(JSON.stringify(st))).then(function(h){out.state=h;return sha(TE.encode(JSON.stringify(lk)));}).then(function(h){out.local=h;return listDbs();})
    .then(function(names){return seq(names.filter(function(n){return !NEVER[n]&&n!=="ingenium_hub";}),function(db){return openExisting(db).then(function(d){if(!d)return;
      return seq(schema(d),function(s){var hs=[],n=0;return dumpStore(d,s.name,function(ch){n+=ch.n;return sha(ch.json).then(function(h){hs.push(h);return ch.bin?sha(ch.bin).then(function(h2){hs.push(h2);}):null;});})
        .then(function(){return sha(TE.encode(hs.join("\n"))).then(function(h){out.stores[db+"/"+s.name]={count:n,digest:h};});});}).then(function(){d.close();});});});})
    .then(function(){var H=hubApi();if(!H)return;return H.exportAll().then(function(d){var apps=(d.apps||[]).slice().sort(function(a,b){return a.id<b.id?-1:1;});return sha(TE.encode(JSON.stringify(apps))).then(function(h){out.hub={apps:apps.length,digest:h};});},function(){});})
    .then(function(){return out;});}

/* ======================= moving: the guide for each pair of devices ======================= */
var APPLE={mac:1,macmini:1,iphone:1,ipad:1},COMP={mac:1,macmini:1,windows:1},PHONE={iphone:1,ipad:1};
function saveWhere(f){switch(f){
  case "mac":case "macmini":return "The Mac asks where to keep it. Downloads is a good place, or a USB stick straight away.";
  case "windows":return "Windows asks where to keep it. Downloads is a good place, or a USB stick straight away.";
  case "fire":return "In Ingenium's own app, the tablet asks where to keep it: choose Download. In Silk, the file goes to Silk's downloads, in the tablet's Download folder.";
  case "iphone":case "ipad":return "The share sheet opens. Choose Save to Files and pick On My "+DEV[f]+", or choose AirDrop to send it straight to the other device.";
  default:return "The browser keeps it in its downloads (the Downloads folder, on a computer).";}}
function carry(f,t){
  if(f==="browser"||t==="browser")return "If the browser is on the same device, the file is already there: there is nothing to carry. If not, carry it as you would between those two devices: a USB stick between computers, AirDrop between Apple devices, the tablet's USB cable for the Fire tablet.";
  if(f==="fire"&&t==="fire")return "A microSD card, if both tablets take one: copy the file onto it in the Files app, then onto the other tablet. Or through a computer, with each tablet's USB cable.";
  if(f==="windows"&&t==="windows")return "A USB stick: copy the file onto it, then plug it into the other computer. A shared folder on your home network works too.";
  if(APPLE[f]&&APPLE[t])return "AirDrop: share the file and choose "+DEVTHE[t]+". Both need Wi-Fi and Bluetooth switched on; no internet connection is needed."+(COMP[f]&&COMP[t]?" A USB stick works too.":"");
  if(COMP[f]&&COMP[t])return "A USB stick: copy the file onto it, then plug it into "+DEVTHE[t]+". A stick formatted as exFAT is read by both a Mac and Windows.";
  if(f==="fire"&&t==="windows")return "The tablet's USB cable: plug the tablet into the computer and open it in File Explorer, where it shows as Fire. Copy the file out of its Download folder.";
  if(f==="windows"&&t==="fire")return "The tablet's USB cable: plug the tablet into the computer and open it in File Explorer, where it shows as Fire. Copy the file into its Download folder.";
  if(f==="fire"&&COMP[t])return "The tablet's USB cable, and a free app that opens Android tablets on a Mac, such as OpenMTP. Copy the file out of the tablet's Download folder onto "+DEVTHE[t]+".";
  if(COMP[f]&&t==="fire")return "The tablet's USB cable, and a free app that opens Android tablets on a Mac, such as OpenMTP. Copy the file into the tablet's Download folder.";
  if(f==="fire"&&PHONE[t])return "Through a computer: copy the file from the tablet to a Mac with the USB cable, then AirDrop it to "+DEVTHE[t]+".";
  if(PHONE[f]&&t==="fire")return "Through a computer: AirDrop the file to a Mac, then copy it into the tablet's Download folder with the USB cable.";
  if(PHONE[f]&&t==="windows")return "A USB stick: an "+DEV[f]+" with USB-C takes one directly (an older one needs Apple's Lightning to USB camera adapter). In the Files app the stick shows under Locations: save the file onto it, then plug it into the computer.";
  if(f==="windows"&&PHONE[t])return "A USB stick: copy the file onto it on the computer. An "+DEV[t]+" with USB-C takes the stick directly (an older one needs Apple's Lightning to USB camera adapter), and the Files app shows it under Locations.";
  return "A USB stick, or AirDrop between Apple devices.";}
function openWhere(t){var lead="On "+DEVTHE[t]+", open Ingenium, then Settings, Backup and moving, Restore, and press Choose a backup file. ";switch(t){
  case "mac":case "macmini":return lead+"Pick it from Downloads (AirDrop puts files there too), or from the USB stick under Locations.";
  case "windows":return lead+"Pick it from Downloads, or from the USB stick under This PC.";
  case "fire":return lead+"The tablet's file picker opens: choose Download.";
  case "iphone":case "ipad":return lead+"Files opens: look in Downloads (where AirDrop puts files) or On My "+DEV[t]+".";
  default:return lead+"Pick it from the browser's downloads.";}}
function guide(f,t){f=DEV[f]?f:"browser";t=DEV[t]?t:"mac";var steps=[],stay=[];
  steps.push({title:"Back up "+(f==="browser"?"in the browser":"on "+DEVTHE[f]),text:"In Settings, Backup and moving, press Make the backup. "+saveWhere(f)+" Choose the keys if apps you sign here will be updated there.",act:"make"});
  steps.push({title:"Carry it to "+DEVTHE[t],text:carry(f,t)});
  steps.push({title:"Restore "+(t==="browser"?"in the browser":"on "+DEVTHE[t]),text:openWhere(t)+" Every part is checked first. Choose Replace on a new device, or Merge to bring the work into a device you already use.",act:"restore"});
  steps.push({title:"Check, then fetch the models",text:"Open a conversation, an app in Fabrica and a Lector document to see that all is there. Then fetch the models again in Models: Restore lists the ones the backup names."+(PHONE[t]||t==="fire"?" On "+DEVTHE[t]+", choose smaller ones; Models suggests those that fit.":"")});
  stay.push("Models: their files stay on "+DEVTHE[f]+". The backup names them, so you can fetch them again.");
  stay.push("Signing keys and connection keys, unless you choose them when you back up; then they go locked with a password.");
  stay.push("Fabrica's packages, unless you choose them. Each can be made again from its version.");
  stay.push("Links to files on "+DEVTHE[f]+": a model or document opened from a folder there is chosen again on "+DEVTHE[t]+".");
  stay.push("The engine that runs models: each Ingenium carries its own.");
  if(COMP[f]&&!COMP[t])stay.push("What only the computer app does (sharing models with your other computer, windows of their own) stays with the computer.");
  return {from:f,to:t,steps:steps,stay:stay,tip:"Use the same Ingenium on both if you can (this one is "+(ver()||"the newest")+"). A backup made by a newer Ingenium waits until the older one is updated."};}

/* ======================= the card in Settings ======================= */
var UI={card:null,busy:false,made:null,read:null,stop:null,census:null,censusAt:0};
function E(tag,cls,text){var n=document.createElement(tag);if(cls)n.className=cls;if(text!=null)n.textContent=text;return n;}
function q(sel){return UI.card?UI.card.querySelector(sel):null;}
var CARD='<div class="bk-head"><h2 class="sec" id="bkH">Backup and moving</h2><span class="bk-last" id="bkLast" role="status"></span></div>'
  +'<p class="small muted bk-lede">Everything in one file: your conversations, notes and settings, Fabrica\'s apps with every version, their issues and pages, Lector\'s documents, your app library and the large store. Keep it somewhere safe, or carry it to another device.</p>'
  +'<div id="bkNotice"></div>'
  +'<div class="bk-seg" role="tablist" aria-label="Backup and moving"><span class="bk-thumb" aria-hidden="true"></span>'
  +'<button type="button" role="tab" id="bkTab-make" aria-controls="bkPane-make" aria-selected="true">Back up</button>'
  +'<button type="button" role="tab" id="bkTab-restore" aria-controls="bkPane-restore" aria-selected="false" tabindex="-1">Restore</button>'
  +'<button type="button" role="tab" id="bkTab-move" aria-controls="bkPane-move" aria-selected="false" tabindex="-1">Moving</button></div>'
  /* back up */
  +'<section class="bk-pane" id="bkPane-make" role="tabpanel" aria-labelledby="bkTab-make"><div class="bk-grid">'
  +'<div><h3 class="bk-h3">What goes in</h3><ul class="bk-what" id="bkWhat"><li><span class="n">…</span><span>Counting what is here</span></li></ul>'
  +'<p class="bk-sm">Models never go in a backup: their files are large and can be fetched again. The backup lists their names.</p></div>'
  +'<div><h3 class="bk-h3">Choose</h3>'
  +'<div class="bk-opt"><input type="checkbox" class="bk-sw" role="switch" id="bkOptPk" aria-labelledby="bkOptPkL" aria-describedby="bkOptPkD"><label for="bkOptPk"><b id="bkOptPkL">Fabrica\'s packages</b><span id="bkOptPkD">The Android, iPhone and other packages Fabrica made. Each can be made again from its version, so they stay out unless you want them.</span></label></div>'
  +'<div class="bk-opt"><input type="checkbox" class="bk-sw" role="switch" id="bkOptKy" aria-labelledby="bkOptKyL" aria-describedby="bkOptKyD"><label for="bkOptKy"><b id="bkOptKyL">Signing keys and connection keys</b><span id="bkOptKyD">Locked with a password of your own. Without them, an app signed here cannot be updated from the other device, and connections ask for their keys again.</span></label></div>'
  +'<div class="bk-pw" id="bkPw" hidden><label class="bk-field"><span>A password for the keys</span><input type="password" id="bkPw1" autocomplete="new-password" minlength="8"></label>'
  +'<label class="bk-field"><span>The same password again</span><input type="password" id="bkPw2" autocomplete="new-password" minlength="8"></label>'
  +'<p class="bk-sm">At least eight characters. Keep it somewhere safe: without it the keys cannot be opened, by you or by anyone.</p></div>'
  +'<p class="bk-err" id="bkMakeErr" role="alert"></p>'
  +'<div class="bk-row"><button type="button" class="bk-key pri" id="bkMake">Make the backup</button><button type="button" class="bk-key" id="bkStop" hidden>Stop</button><button type="button" class="bk-key" id="bkAgain" hidden>Save it again</button></div></div></div>'
  +'<div class="bk-progress" id="bkMakeProg" hidden><div class="bk-bar" role="progressbar" aria-label="Making the backup" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0"><i></i></div><p class="bk-say" id="bkMakeSay"></p></div>'
  +'<div id="bkMakeOut" aria-live="polite"></div></section>'
  /* restore */
  +'<section class="bk-pane" id="bkPane-restore" role="tabpanel" aria-labelledby="bkTab-restore" hidden>'
  +'<div class="bk-drop" id="bkDrop"><p><b>Choose a backup file</b>, or drop it here.</p><p class="bk-sm" style="margin:0">An Ingenium backup (.zip), or a desk backup from an earlier Ingenium (.json). Every part is checked against its fingerprint before anything changes.</p>'
  +'<button type="button" class="bk-key pri" id="bkPick">Choose a backup file</button><input type="file" id="bkFile" accept=".zip,.json,application/zip,application/json" hidden></div>'
  +'<div class="bk-progress" id="bkReadProg" hidden><div class="bk-bar" role="progressbar" aria-label="Checking the backup" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0"><i></i></div><p class="bk-say" id="bkReadSay"></p></div>'
  +'<div id="bkReadOut"></div></section>'
  /* moving */
  +'<section class="bk-pane" id="bkPane-move" role="tabpanel" aria-labelledby="bkTab-move" hidden>'
  +'<h3 class="bk-h3">Moving to another device</h3><p class="bk-sm" style="margin:-4px 0 12px">Choose the two devices: the steps follow, with what to press and where the file goes.</p>'
  +'<div class="bk-pair"><label class="bk-field"><span>From</span><select id="bkFrom"></select></label><button type="button" class="bk-key sm" id="bkSwap" aria-label="Swap the two devices" title="Swap the two devices">⇄</button><label class="bk-field"><span>To</span><select id="bkTo"></select></label></div>'
  +'<ol class="bk-steps" id="bkSteps"></ol><div class="bk-stay"><h3 class="bk-h3">What does not move</h3><ul id="bkStay"></ul></div><p class="bk-tip" id="bkTip"></p></section>';
function ensureCard(){if(UI.card&&document.body.contains(UI.card))return UI.card;var pg=document.getElementById("page-settings");if(!pg)return null;
  var ex=document.getElementById("exportApp"),dataCard=ex&&ex.closest?ex.closest(".card"):null;
  var c=E("div","card");c.id="bkCard";c.setAttribute("role","region");c.setAttribute("aria-labelledby","bkH");c.innerHTML=CARD;
  if(dataCard&&dataCard.parentNode===pg)pg.insertBefore(c,dataCard);else pg.appendChild(c);UI.card=c;
  /* the older keys stay (one .json file of the desk alone); a word beside them says where the whole of it is now */
  try{if(dataCard&&!dataCard.querySelector(".bk-pointer")){var p=E("p","small muted bk-pointer");p.appendChild(document.createTextNode("For everything in one file, with Fabrica's apps, Lector's documents and your app library, use "));
    var lk=E("button",null,"Backup and moving");lk.type="button";lk.onclick=function(){c.scrollIntoView({block:"start",behavior:"smooth"});var t=q("#bkTab-make");if(t)t.focus();};p.appendChild(lk);p.appendChild(document.createTextNode(" above."));
    var after=dataCard.querySelector("p.small.muted:last-of-type");if(after&&after.parentNode===dataCard)after.after(p);else dataCard.appendChild(p);}}catch(e){}
  wire();paint();return c;}
function paint(){paintLast();paintNotice();var t=peek().tab;select(t==="restore"||t==="move"?t:"make",false,true);}
function paintLast(){var b=q("#bkLast");if(!b)return;var L=peek().last;b.className="bk-last";
  if(!L||!L.at){b.textContent="No backup made here yet";return;}var d=Math.floor((Date.now()-L.at)/86400000);
  b.textContent="Last backup: "+day(L.at)+", "+ago(L.at)+(L.size?" · "+size(L.size):"");b.classList.add(d>14?"old":"ok");}
function paintNotice(){var host=q("#bkNotice");if(!host)return;host.innerHTML="";var r=peek().restored;if(!r||!r.at)return;
  var box=E("div","bk-msg good");box.setAttribute("role","status");var b=E("b",null,"Restored on "+day(r.at)+".");box.appendChild(b);
  box.appendChild(document.createTextNode(" From the backup made "+(r.made?"on "+day(r.made):"earlier")+(r.from?" on "+(r.from==="A browser"?"a browser":"a "+r.from):"")+(r.version?" with Ingenium "+r.version:"")+" ("+(r.mode==="merge"?"merged with what was here":"in place of what was here")+")."));
  if(r.models&&r.models.length){var p=E("p",null,"Models to fetch again here: ");p.appendChild(document.createTextNode(r.models.join(", ")+"."));box.appendChild(p);}
  var row=E("div","bk-row");if(r.models&&r.models.length){var mo=E("button","bk-key sm","Open Models");mo.type="button";mo.onclick=function(){try{go("models");}catch(e){}};row.appendChild(mo);}
  var ok=E("button","bk-key sm","Done");ok.type="button";ok.onclick=function(){delete V().restored;keep();paintNotice();};row.appendChild(ok);box.appendChild(row);host.appendChild(box);}
function select(name,focus,quiet){var c=UI.card;if(!c)return;["make","restore","move"].forEach(function(t){var b=c.querySelector("#bkTab-"+t),p=c.querySelector("#bkPane-"+t),on=t===name;
    b.setAttribute("aria-selected",on?"true":"false");b.tabIndex=on?0:-1;p.hidden=!on;});
  if(!quiet&&peek().tab!==name){V().tab=name;keep();}thumb();if(focus)c.querySelector("#bkTab-"+name).focus();
  if(name==="make")paintWhat();if(name==="move")paintMove();}
function thumb(){var c=UI.card;if(!c)return;var seg=c.querySelector(".bk-seg"),b=seg&&seg.querySelector('[aria-selected="true"]'),t=seg&&seg.querySelector(".bk-thumb");if(!b||!t)return;
  t.style.width=b.offsetWidth+"px";t.style.transform="translateX("+b.offsetLeft+"px)";}
function wire(){var c=UI.card;
  [].forEach.call(c.querySelectorAll('.bk-seg [role="tab"]'),function(b){b.onclick=function(){select(b.id.replace("bkTab-",""),false);};});
  c.querySelector(".bk-seg").addEventListener("keydown",function(e){var tabs=["make","restore","move"],cur=tabs.indexOf((document.activeElement&&document.activeElement.id||"").replace("bkTab-",""));if(cur<0)return;
    var nx=e.key==="ArrowRight"?(cur+1)%3:e.key==="ArrowLeft"?(cur+2)%3:e.key==="Home"?0:e.key==="End"?2:-1;if(nx<0)return;e.preventDefault();select(tabs[nx],true);});
  var ky=q("#bkOptKy"),pw=q("#bkPw");ky.onchange=function(){pw.hidden=!ky.checked;if(ky.checked)setTimeout(function(){if(document.activeElement===ky||document.activeElement===document.body)q("#bkPw1").focus();},30);q("#bkMakeErr").textContent="";};
  if(!subtle()){ky.disabled=true;q("#bkOptKyD").textContent="This browser offers no encryption here, so the keys cannot be locked and stay out.";}
  q("#bkMake").onclick=doMake;q("#bkStop").onclick=function(){if(UI.stop)UI.stop.stopped=true;q("#bkStop").disabled=true;};
  q("#bkAgain").onclick=function(){if(UI.made)Promise.resolve(saveFileNative(UI.made.name,"application/zip",UI.made.blob)).catch(function(){});};
  var fi=q("#bkFile");q("#bkPick").onclick=function(){if(!UI.busy)fi.click();};fi.onchange=function(){var f=fi.files&&fi.files[0];fi.value="";if(f)doRead(f);};
  var dz=q("#bkDrop");dz.addEventListener("dragover",function(e){e.preventDefault();dz.classList.add("over");});dz.addEventListener("dragleave",function(){dz.classList.remove("over");});
  dz.addEventListener("drop",function(e){e.preventDefault();dz.classList.remove("over");var f=e.dataTransfer&&e.dataTransfer.files&&e.dataTransfer.files[0];if(f&&!UI.busy)doRead(f);});
  var fr=q("#bkFrom"),to=q("#bkTo");ORDER.forEach(function(k){fr.appendChild(new Option(DEV[k],k));to.appendChild(new Option(DEV[k],k));});
  fr.onchange=to.onchange=function(){V().from=fr.value;V().to=to.value;keep();paintMove();};
  q("#bkSwap").onclick=function(){var a=fr.value;fr.value=to.value;to.value=a;V().from=fr.value;V().to=to.value;keep();paintMove();};
  window.addEventListener("resize",function(){requestAnimationFrame(thumb);});}
function bar(id,frac,text){var p=q("#"+id);if(!p)return;p.hidden=false;var b=p.querySelector(".bk-bar"),v=Math.round(frac*100);b.setAttribute("aria-valuenow",String(v));b.setAttribute("aria-valuetext",v+" per cent"+(text?": "+text:""));
  b.querySelector("i").style.width=v+"%";var s=p.querySelector(".bk-say");if(s&&text!=null)s.textContent=text;}
/* counted afresh each time the tab is shown; the numbers counted before stay on screen until the new ones are in */
function paintWhat(){var host=q("#bkWhat");if(!host)return;if(UI.census)fillWhat(UI.census);var my=++UI.censusAt;
  censusHere().then(function(c){if(my!==UI.censusAt)return;UI.census=c;fillWhat(c);},function(){});}
function fillWhat(c){var host=q("#bkWhat");if(!host)return;host.innerHTML="";
  function li(n,text,sub){var l=E("li");l.appendChild(E("span","n",n==null?"·":num(n)));var t=E("span",null,text);if(sub)t.appendChild(E("span","sub",sub));l.appendChild(t);host.appendChild(l);}
  li(c.chats,c.chats===1?"conversation":"conversations",c.messages?plural(c.messages,"message"):"");
  li((c.fabrica||[]).length,((c.fabrica||[]).length===1?"app":"apps")+" in Fabrica, with every version",(c.fabrica||[]).slice(0,6).map(function(r){return r.name;}).join(", ")+((c.fabrica||[]).length>6?" and more":""));
  li((c.issues||0)+(c.pulls||0),"issues and pull requests, with Fabrica's pages");
  li(c.lector,c.lector===1?"document from Lector":"documents from Lector");li(c.projects,c.projects===1?"app in Code":"apps in Code");
  li((c.library||[]).length,((c.library||[]).length===1?"app":"apps")+" in your library",(c.library||[]).map(function(a){return a.name+(a.version?" "+a.version:"");}).join(", "));
  li(c.notes,"notes, parked thoughts and reminders");if(c.sources)li(c.sources,"sources in Fontes");li(c.big,"long texts in the large store");
  if(c.imported)li(c.imported,"conversations you brought in from elsewhere");li(null,"Your settings, and what the apps inside keep for themselves");
  var pk=q("#bkOptPkD");if(pk&&c.packages!=null)pk.textContent="The Android, iPhone and other packages Fabrica made ("+plural(c.packages,"package")+" here). Each can be made again from its version, so they stay out unless you want them.";
  var kd=q("#bkOptKyD");if(kd&&subtle())kd.textContent="Locked with a password of your own ("+plural(c.keys||0,"signing key")+" and "+plural(c.connections||0,"connection key")+" here). Without them, an app signed here cannot be updated from the other device, and connections ask for their keys again.";}
function doMake(){if(UI.busy)return;var err=q("#bkMakeErr"),out=q("#bkMakeOut");err.textContent="";out.innerHTML="";
  var o={packages:q("#bkOptPk").checked,keys:q("#bkOptKy").checked&&!q("#bkOptKy").disabled};
  if(o.keys){var a=q("#bkPw1").value,b=q("#bkPw2").value;if(a.length<8){err.textContent="The password needs at least eight characters.";q("#bkPw1").focus();return;}
    if(a!==b){err.textContent="The two passwords are not the same.";q("#bkPw2").focus();return;}o.password=a;}
  UI.busy=true;UI.stop={stopped:false};o.signal=UI.stop;var mk=q("#bkMake"),st=q("#bkStop"),ag=q("#bkAgain");mk.disabled=true;st.hidden=false;st.disabled=false;ag.hidden=true;
  var said=0;o.onProgress=function(p){var t=Date.now();if(t-said<120&&p.frac<1)return;said=t;bar("bkMakeProg",p.frac,(p.what?p.what+"… ":"")+size(p.bytes)+" so far");};
  bar("bkMakeProg",0,"Starting…");
  make(o).then(function(r){UI.made=r;bar("bkMakeProg",1,"Ready: "+size(r.size)+". Saving it now…");
      return Promise.resolve(saveFileNative(r.name,"application/zip",r.blob)).catch(function(){}).then(function(){return r;});})
    .then(function(r){var L=V();L.last={at:Date.now(),name:r.name,size:r.size,parts:Object.keys(r.manifest.files).length+1,keys:!!r.manifest.secrets,packages:!!r.manifest.options.packages};keep();paintLast();
      var box=E("div","bk-msg good");box.appendChild(E("b",null,"Your backup is ready."));
      box.appendChild(document.createTextNode(" "+r.name+", "+size(r.size)+", in "+plural(Object.keys(r.manifest.files).length+1,"part")+", each with its fingerprint"+(r.manifest.secrets?"; the keys are locked with your password":"")+"."));
      box.appendChild(E("p",null,saveWhere(hereNow().kind)));
      if((r.manifest.leftOut||[]).length){var p=E("p",null,"Not in it: "+r.manifest.leftOut.map(function(x){return x.what.charAt(0).toLowerCase()+x.what.slice(1);}).join("; ")+".");box.appendChild(p);}
      out.innerHTML="";out.appendChild(box);q("#bkAgain").hidden=false;},
      function(e){var box=E("div","bk-msg "+(e&&e.code==="stopped"?"warn":"bad"));box.appendChild(E("b",null,e&&e.code==="stopped"?"Stopped.":"The backup stopped."));
        box.appendChild(document.createTextNode(" "+(e&&e.code==="stopped"?"Nothing was saved.":(e&&e.message||String(e))+" Nothing was saved; what is here is untouched.")));out.innerHTML="";out.appendChild(box);})
    .then(function(){UI.busy=false;mk.disabled=false;st.hidden=true;q("#bkPw1").value="";q("#bkPw2").value="";setTimeout(function(){var p=q("#bkMakeProg");if(p&&!UI.busy)p.hidden=true;},1600);});}
function doRead(file){var out=q("#bkReadOut");out.innerHTML="";UI.read=null;UI.busy=true;q("#bkPick").disabled=true;bar("bkReadProg",0,"Reading "+file.name+"…");
  var said=0;open(file,{onProgress:function(p){var t=Date.now();if(t-said<120&&p.frac<1)return;said=t;bar("bkReadProg",p.frac,"Checking every part against its fingerprint…");}})
    .then(function(b){UI.read=b;bar("bkReadProg",1,"Every part matches its fingerprint.");return paintSummary(b,true);},
      function(e){var box=E("div","bk-msg bad");box.setAttribute("role","alert");var msg=(e&&e.message)||String(e);
        var title=e&&e.code==="damaged"?"This backup is damaged.":e&&e.code==="newer"?"This backup is from a newer Ingenium.":"This file cannot be restored.";
        var more=msg.replace(/^This backup is damaged: /,"").replace(/^This backup was made by a newer Ingenium[^.]*\. /,"");more=more.charAt(0).toUpperCase()+more.slice(1);
        box.appendChild(E("b",null,title));box.appendChild(document.createTextNode(" "+more));
        out.appendChild(box);var p=q("#bkReadProg");if(p)p.hidden=true;})
    .then(function(){UI.busy=false;q("#bkPick").disabled=false;});}
function paintSummary(b,first){var out=q("#bkReadOut"),m=b.manifest,mode=UI.mode||null;
  var wk=!!m.secrets;return describe(b,"replace",wk).then(function(d0){if(!mode)mode=d0.fresh?"replace":"merge";UI.mode=mode;return mode==="replace"?d0:describe(b,mode,wk);}).then(function(d){
    out.innerHTML="";var s=E("div","bk-sum");s.id="bkSum";s.tabIndex=-1;
    s.appendChild(E("h3","bk-h3","What this backup holds"));
    var p=E("p");p.style.margin="0";var made=m.madeAt?when(m.madeAt):"an unknown day";
    p.textContent=b.kind==="desk"?"A desk backup from an earlier Ingenium"+(m.madeAt?", last changed "+when(m.madeAt):"")+".":"Made "+made+(m.platform&&m.platform.label?" on "+(m.platform.label==="A browser"?"a browser":"a "+m.platform.label):"")+(m.version?", with Ingenium "+m.version:"")+". "+plural(b.parts,"part")+", "+size(b.bytes)+". ";
    if(b.kind==="zip"){var ok=E("b",null,"✓ Every fingerprint matches.");ok.style.color="var(--b-ok)";p.appendChild(ok);}s.appendChild(p);
    var wrap=E("div","bk-tabwrap");wrap.setAttribute("role","region");wrap.setAttribute("aria-label","What changes here");wrap.tabIndex=0;
    var tb=E("table","bk-tab"),cap=E("caption","bk-vh","What changes here, row by row");tb.appendChild(cap);
    /* on a phone the column heads are shortened on screen; a screen reader still hears them whole */
    var th=E("thead"),tr=E("tr");[["What","What"],["In the backup","Backup"],["Here now","Here"],["After restoring","After"]].forEach(function(x,i){var h=E("th",i?"num":null);h.scope="col";
      h.appendChild(E("span","bk-long",x[0]));var sh=E("span","bk-short",x[1]);sh.setAttribute("aria-hidden","true");h.appendChild(sh);tr.appendChild(h);});th.appendChild(tr);tb.appendChild(th);
    var tbd=E("tbody");d.rows.forEach(function(r){var row=E("tr"),h=E("th",null,r.label);h.scope="row";if(r.note){var sm=E("span","bk-vh",". "+r.note);h.appendChild(sm);h.title=r.note;}row.appendChild(h);
      [r.backup,r.here,r.after].forEach(function(v,i){var td=E("td","num",typeof v==="number"?num(v):String(v));if(i===2&&String(v)!==String(r.here))td.classList.add("chg");row.appendChild(td);});tbd.appendChild(row);});
    tb.appendChild(tbd);wrap.appendChild(tb);s.appendChild(wrap);
    var fs=E("fieldset","bk-modes"),lg=E("legend",null,"How to restore it");fs.appendChild(lg);var two=E("div","bk-two");
    [["replace","Replace what is here","Best on a new device. What is here is replaced by the backup; your models stay."],["merge","Merge with what is here","Best on a device you already use. What the backup holds is added; where both hold the same thing, the newer is kept; your settings stay."]].forEach(function(x){
      var lb=E("label","bk-mode"+(mode===x[0]?" on":"")),ip=E("input");ip.type="radio";ip.name="bkMode";ip.value=x[0];ip.checked=mode===x[0];
      ip.onchange=function(){UI.mode=x[0];paintSummary(b,false).then(function(){var r=q('input[name="bkMode"][value="'+x[0]+'"]');if(r)r.focus();});};
      var sp=E("span");sp.appendChild(E("b",null,x[1]));sp.appendChild(document.createTextNode(x[2]));lb.appendChild(ip);lb.appendChild(sp);two.appendChild(lb);});
    fs.appendChild(two);s.appendChild(fs);
    var ul=E("ul","bk-lines");d.lines.forEach(function(t){ul.appendChild(E("li",null,t));});s.appendChild(ul);
    var keysOn=null,pw=null,kerr=null;
    if(m.secrets){var kb=E("div","bk-keys"),row=E("div","bk-opt");row.style.borderTop="0";row.style.padding="0";
      keysOn=E("input","bk-sw");keysOn.type="checkbox";keysOn.setAttribute("role","switch");keysOn.id="bkWithKeys";keysOn.checked=UI.withKeys!==false;
      var kl=E("label");kl.htmlFor="bkWithKeys";kl.appendChild(E("b",null,"Bring back the signing keys and connection keys"));kl.appendChild(E("span",null,plural(m.secrets.keys||0,"signing key")+" and "+plural(m.secrets.connections||0,"connection key")+", locked with the password chosen when the backup was made."));
      row.appendChild(keysOn);row.appendChild(kl);kb.appendChild(row);
      var fl=E("label","bk-field");fl.appendChild(E("span",null,"Their password"));pw=E("input");pw.type="password";pw.id="bkKeyPw";pw.autocomplete="current-password";fl.appendChild(pw);kb.appendChild(fl);
      kerr=E("p","bk-err");kerr.id="bkKeyErr";kerr.setAttribute("role","alert");kb.appendChild(kerr);
      keysOn.onchange=function(){UI.withKeys=keysOn.checked;fl.hidden=!keysOn.checked;kerr.textContent="";};fl.hidden=!keysOn.checked;s.appendChild(kb);}
    if((m.models||[]).length){var mb=E("div","bk-models");mb.appendChild(E("h4","bk-h3","Models to fetch again here"));var ch=E("ul","bk-chips");m.models.forEach(function(x){ch.appendChild(E("li",null,x.name));});mb.appendChild(ch);
      mb.appendChild(E("p","bk-sm","Their files never go in a backup. After restoring, fetch them in Models."));s.appendChild(mb);}
    var rw=E("div","bk-row"),other=E("button","bk-key","Choose another file");other.type="button";other.onclick=function(){UI.read=null;UI.mode=null;out.innerHTML="";var pp=q("#bkReadProg");if(pp)pp.hidden=true;q("#bkPick").focus();};
    var goK=E("button","bk-key "+(mode==="replace"?"danger":"pri"),mode==="replace"?"Replace and start again":"Merge and start again");goK.type="button";goK.id="bkGo";rw.appendChild(other);rw.appendChild(goK);s.appendChild(rw);
    var pg=E("div","bk-progress");pg.id="bkApplyProg";pg.hidden=true;pg.innerHTML='<div class="bk-bar" role="progressbar" aria-label="Restoring" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0"><i></i></div><p class="bk-say"></p>';s.appendChild(pg);
    var res=E("div");res.id="bkApplyOut";res.setAttribute("aria-live","polite");s.appendChild(res);
    goK.onclick=function(){if(UI.busy)return;var wk2=!!(keysOn&&keysOn.checked);if(kerr)kerr.textContent="";
      if(wk2&&!pw.value){kerr.textContent="Write the keys' password, or switch the keys off to restore without them.";pw.focus();return;}
      goK.disabled=true;var unl=wk2?(bar("bkApplyProg",0,"Opening the keys…"),unlock(b,pw.value)):Promise.resolve(null);
      unl.then(function(sec){var pp=q("#bkApplyProg");if(pp)pp.hidden=true;
          var t=mode==="replace"?"Replace what is here with this backup?":"Merge this backup with what is here?";
          var txt=(mode==="replace"?"Conversations, apps, documents and settings here are replaced by the backup's.":"What the backup holds is added; where both hold the same thing, the newer is kept.")+" Your desk as it is now goes onto the recovery shelf first. Then Ingenium starts again.";
          return Promise.resolve(window.ingAsk?window.ingAsk({title:t,text:txt,yes:mode==="replace"?"Replace and start again":"Merge and start again",no:"Not now",danger:mode==="replace"}):window.confirm(t)).then(function(ok){
            if(!ok){goK.disabled=false;goK.focus();return;}UI.busy=true;q("#bkPick").disabled=true;other.disabled=true;
            var said=0;bar("bkApplyProg",0,"Restoring. Keep Ingenium open until it starts again.");
            return apply(b,{mode:mode,secrets:sec,onProgress:function(p){var tt=Date.now();if(tt-said<120&&p.frac<1)return;said=tt;bar("bkApplyProg",p.frac,(p.what?p.what+"… ":"")+"Keep Ingenium open until it starts again.");},reload:false})
              .then(function(r){bar("bkApplyProg",1,"Restored.");var box=E("div","bk-msg "+(r.ok?"good":"warn"));box.setAttribute("role","status");box.appendChild(E("b",null,"Restored."));
                box.appendChild(document.createTextNode(" "+plural(r.records,"record")+" put back"+(r.ok?", and every store holds what the backup holds":"")+". Ingenium starts again now."));
                if(!r.ok){var u2=E("ul");r.problems.forEach(function(x){u2.appendChild(E("li",null,x));});box.appendChild(u2);}
                res.innerHTML="";res.appendChild(box);setTimeout(function(){try{location.reload();}catch(e){}},r.ok?1500:6000);});});},
        function(e){goK.disabled=false;var pp=q("#bkApplyProg");if(pp)pp.hidden=true;
          if(e&&e.code==="password"&&kerr){kerr.textContent=e.message;pw.focus();pw.select();return;}
          var box=E("div","bk-msg bad");box.setAttribute("role","alert");box.appendChild(E("b",null,"The restore stopped."));box.appendChild(document.createTextNode(" "+((e&&e.message)||String(e))));res.innerHTML="";res.appendChild(box);})
      .catch(function(e){UI.busy=false;var box=E("div","bk-msg bad");box.setAttribute("role","alert");box.appendChild(E("b",null,"The restore stopped part way."));
        box.appendChild(document.createTextNode(" "+((e&&e.message)||String(e))+" What was put back so far stays; your desk as it was is on the recovery shelf (Settings, Recover an earlier moment)."));res.innerHTML="";res.appendChild(box);
        var again=E("button","bk-key","Start Ingenium again");again.type="button";again.onclick=function(){location.reload();};box.appendChild(E("div","bk-row")).appendChild(again);});};
    out.appendChild(s);if(first)setTimeout(function(){try{s.focus();}catch(e){}},40);});}
function paintMove(){var fr=q("#bkFrom"),to=q("#bkTo");if(!fr)return;var me=hereNow().kind,L=peek();
  fr.value=L.from&&DEV[L.from]?L.from:me;to.value=L.to&&DEV[L.to]?L.to:ORDER.filter(function(k){return k!==fr.value;})[0];
  var g=guide(fr.value,to.value),ol=q("#bkSteps"),st=q("#bkStay");ol.innerHTML="";st.innerHTML="";
  g.steps.forEach(function(s,i){var li=E("li");li.appendChild(E("span","bk-num",String(i+1))).setAttribute("aria-hidden","true");var d=E("div");d.appendChild(E("h4",null,s.title));d.appendChild(E("p",null,s.text));
    if(s.act==="make"&&g.from===me){var k=E("button","bk-key sm pri","Make the backup now");k.type="button";k.onclick=function(){select("make",true);};d.appendChild(k);}
    if(s.act==="restore"&&g.to===me){var k2=E("button","bk-key sm pri","Restore here");k2.type="button";k2.onclick=function(){select("restore",true);};d.appendChild(k2);}
    li.appendChild(d);ol.appendChild(li);});
  g.stay.forEach(function(t){st.appendChild(E("li",null,t));});q("#bkTip").textContent=g.tip;}

/* ---------- light at start: the card is made the first time Settings is opened ---------- */
function watch(){var pg=document.getElementById("page-settings");if(!pg)return;
  function chk(){if(pg.classList.contains("active")){ensureCard();requestAnimationFrame(thumb);}}
  try{new MutationObserver(chk).observe(pg,{attributes:true,attributeFilter:["class"]});}catch(e){}chk();}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",watch);else watch();
/* after a restore, once: a word on what came back, and the models to fetch again */
(function told(){var tries=0;(function wait(){if(window.__ingReady===true){setTimeout(tell,1500);return;}if(++tries<240)setTimeout(wait,500);})();
  function tell(){var r=peek().restored;if(!r||r.told)return;r.told=true;keep();
    try{ingToast("Restored from the backup of "+(r.made?day(r.made):"an earlier day")+"."+(r.models&&r.models.length?" "+plural(r.models.length,"model")+" to fetch again: see Settings, Backup and moving.":""));}catch(e){}}})();

window.IngBackup={version:FORMAT,make:make,open:open,describe:describe,unlock:unlock,apply:apply,restore:restore,census:censusHere,fingerprints:fingerprints,guide:guide,devices:DEV,here:hereNow,
  show:function(tab){try{go("settings");}catch(e){}var c=ensureCard();if(c){select(tab||"make",true);c.scrollIntoView({block:"start"});}return !!c;},
  _:{enc:enc,dec:dec,pack:pack,unpack:unpack,ZipOut:ZipOut,ZipIn:ZipIn,crc32:crc32,mergeVal:mergeVal,buildState:buildState,secrets:secrets,listDbs:listDbs}};
})();
;try{window.__ingParts["p64"]="running";}catch(_){}
</script>
