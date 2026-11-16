<style id="r298-css">
/* ============ R298 · FABRICA, PHASE 3, ITS FIRST STAGE: RUNS, WORKFLOWS, MACHINES, EVERY DEVICE, AND LEARNING AS YOU GO
   (Ingenium 7.08, 14 November 2026) ============
   Her words (14 November 2026): "I want to focus on deepening and expanding Fabrica and its capabilities and making it my own personal
   GitHub inside of Ingenium. I want full and exact parity with GitHub please." On the live preview, Fabrica on Every Device
   (previews/fabrica_p3): "I approve of the Fabrica on Every Device preview, please commit and push it everywhere."
   Built from that preview, in Fabrica's own forms and tokens (--f-*), so each piece takes its look by day and by night as the rest of
   Fabrica does; every motion slow and soft:
   - Runs, a fifth room (GitHub's Actions), between Plans and Care: Runs (each run of a workflow on this computer: its jobs, their steps,
     the whole log as it grows, Find in the log, Explain this error by her own model, the files it made, kept until she removes them),
     Workflows (the app's own .github/workflows files, read as GitHub reads them, Run it now, recipes) and Machines (this computer and
     its tools, checked). The runs themselves happen in the computer app (build/desktop/app_runs_708.py).
   - Story, Releases: every device in one release, each device on its own row, Install on this Mac or this PC, and Make the missing ones.
   - Needs you, at the top of Your apps: failed and running runs, milestones due, pull requests waiting, versions ready to ship.
   - Learn in every room (what it is, its names on GitHub and in git, why it matters, Show me), every word side by side, and Learning
     mode (point at a key: its names on GitHub and in git show beside it).
   - Ship says where each package is made.
   Her rules (7.07 and 7.08: Pages may grow; no flat or plain surfaces): rooms, tabs and pages are added where the work needs them, in the app's own design. */
#fb .r298-hide{display:none!important}
#fb .fr-rooms.r298-five{gap:5px}#fb .fr-rooms.r298-five .fr-room{padding:6px 9px 6px 7px;gap:5px}
#fb .r298-pad{padding:2px 12px 14px}
/* ---------- Needs you ---------- */
#fb .r298-needs{margin:8px 10px 6px;padding:9px 9px 7px;border-radius:12px;background:linear-gradient(var(--f-a),var(--f-b));border:1px solid var(--f-hair);box-shadow:var(--f-pop);animation:r298Open .45s cubic-bezier(.22,.8,.3,1) both}
#fb .r298-needs .t{display:flex;align-items:center;gap:8px;font:600 13.5px/1.3 var(--f-serif);color:var(--f-ink1);letter-spacing:.02em;margin:0 0 6px}
#fb .r298-needs .t .f-chip{font-family:var(--f-sans)}
#fb .r298-need{display:flex;align-items:flex-start;gap:9px;width:100%;text-align:left;padding:7px 8px;margin:0 0 5px;border:1px solid var(--f-hair2);border-radius:9px;background:linear-gradient(var(--f-a),var(--f-b));box-shadow:var(--f-pill);color:inherit;font:inherit;cursor:pointer;transition:background .25s,transform .25s var(--f-spring),box-shadow .25s}
#fb .r298-need:hover{background:linear-gradient(var(--f-a),var(--f-accs));transform:translateY(-1px)}
#fb .r298-need:active{transform:translateY(1px);box-shadow:var(--f-press)}
#fb .r298-need .d{flex:0 0 auto;width:8px;height:8px;border-radius:50%;margin-top:6px;background:var(--f-acc)}
#fb .r298-need .d.bad{background:var(--f-del)}#fb .r298-need .d.due{background:var(--f-warn)}#fb .r298-need .d.ok{background:var(--f-ok)}
#fb .r298-need .d.run{background:var(--f-acc);animation:r298Breathe 2.4s ease-in-out infinite}
@keyframes r298Breathe{0%,100%{opacity:1}50%{opacity:.35}}
#fb .r298-need > span:last-child{min-width:0;flex:1}
#fb .r298-need b{display:block;font-size:12.5px;font-weight:600;color:var(--f-ink1);line-height:1.35;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
#fb .r298-need small{display:block;font-size:11.5px;color:var(--f-ink3);line-height:1.4;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
#fb .r298-needs .r298-more{display:block;margin:2px 0 0 8px;padding:2px 0;border:0;background:none;color:var(--f-acc);font:600 12px var(--f-sans);cursor:pointer}
#fb .r298-needs .r298-more:hover{text-decoration:underline}
/* ---------- Learn ---------- */
#fb .r298-learnk{display:inline-flex;align-items:center;gap:5px;margin-left:8px;padding:2px 9px 2px 7px;border-radius:999px;border:1px solid var(--f-hair);background:linear-gradient(var(--f-a),var(--f-b));box-shadow:var(--f-pill);color:var(--f-acc);font:600 11.5px/1.5 var(--f-sans);cursor:pointer;vertical-align:1px;transition:transform .2s var(--f-spring),box-shadow .2s}
#fb .r298-learnk:hover{transform:translateY(-2px)}#fb .r298-learnk:active{transform:translateY(1px);box-shadow:var(--f-press)}
#fb .r298-learnk svg{width:13px;height:13px}
#fb .r298-lcard{margin:8px 0 10px;padding:11px 13px 10px;border-radius:12px;background:var(--f-card);border:1px solid var(--f-hair);box-shadow:var(--f-well);animation:r298Open .45s cubic-bezier(.22,.8,.3,1) both}
@keyframes r298Open{from{opacity:0;transform:translateY(-4px)}to{opacity:1;transform:none}}
#fb .r298-lcard h4{margin:0 0 6px;font:600 14px/1.3 var(--f-serif);color:var(--f-ink1);letter-spacing:.02em}
#fb .r298-lcard p{margin:0 0 7px;font-size:12.5px;line-height:1.55;color:var(--f-ink2)}
#fb .r298-lcard dl{display:grid;grid-template-columns:auto minmax(0,1fr);gap:4px 12px;margin:0 0 8px;font-size:12.5px}
#fb .r298-lcard dt{color:var(--f-ink3);font-weight:600}#fb .r298-lcard dd{margin:0;color:var(--f-ink1)}
#fb .r298-lcard code{font:12px/1.4 var(--f-mono);background:var(--f-code);color:var(--f-codeink);padding:1px 5px;border-radius:5px;border:1px solid var(--f-hair2)}
#fb .r298-lcard .f-row{display:flex;gap:8px;flex-wrap:wrap}
#fb .r298-show{animation:r298Show 1.6s ease-in-out 2}
@keyframes r298Show{0%,100%{box-shadow:var(--f-pop)}50%{box-shadow:var(--f-pophi),0 0 0 4px var(--f-accs)}}
/* Learning mode's caption, in Ingenium's own purple and raised as its pressed keys are (her words, 14 November 2026: "Please make that
   black little popup card card purple or white or a different colour in Ingenium's colour palette, the black colour detracts from the
   page"); by night a pale violet card */
.r298-cap{position:fixed;z-index:2147483000;pointer-events:none;padding:5px 10px 6px;border-radius:9px;background:linear-gradient(180deg,#7d55d0,#5c35a8);color:#fff;border:1px solid rgba(255,255,255,.26);
  font:600 11.5px/1.35 -apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;box-shadow:inset 0 1px 0 rgba(255,255,255,.34),inset 0 -1.5px 0 rgba(40,16,90,.25),0 1px 0 rgba(60,30,120,.3),0 6px 14px rgba(74,40,140,.28);
  opacity:0;transform:translateY(3px);transition:opacity .3s ease,transform .3s ease;max-width:320px}
.r298-cap.on{opacity:1;transform:none}.r298-cap span{display:block;font-weight:500;opacity:.86}
body[data-theme="night"] .r298-cap{background:linear-gradient(180deg,#f3eefb,#e2d8f5);color:#2a1d48;border-color:rgba(255,255,255,.5);box-shadow:inset 0 1px 0 rgba(255,255,255,.7),0 1px 0 rgba(0,0,0,.4),0 6px 16px rgba(0,0,0,.45)}
/* ---------- Runs ---------- */
#fb .r298-rb{display:flex;flex-direction:column;gap:8px}
#fb .r298-run{display:grid;grid-template-columns:auto minmax(0,1fr) auto;gap:3px 10px;align-items:center;width:100%;text-align:left;padding:10px 11px;margin:0 0 8px;border:1px solid var(--f-hair);border-radius:12px;background:linear-gradient(var(--f-a),var(--f-b));box-shadow:var(--f-pop);color:inherit;font:inherit;cursor:pointer;transition:transform .18s var(--f-spring),box-shadow .18s;animation:r298Open .45s cubic-bezier(.22,.8,.3,1) both}
#fb .r298-run:hover{transform:translateY(-2px);box-shadow:var(--f-pophi)}#fb .r298-run:active{transform:translateY(1px);box-shadow:var(--f-press)}
#fb .r298-m{width:22px;height:22px;border-radius:7px;display:grid;place-items:center;font-size:12px;font-weight:700;background:var(--f-wellbg);box-shadow:var(--f-well);color:var(--f-ink3)}
#fb .r298-m.ok{color:var(--f-ok);background:var(--f-oks);box-shadow:none}
#fb .r298-m.bad{color:var(--f-del);background:var(--f-delbg);box-shadow:none}
#fb .r298-m.run{color:var(--f-acc);background:var(--f-accs);box-shadow:none}
#fb .r298-m.run::after{content:"";width:10px;height:10px;border-radius:50%;border:2px solid currentColor;border-right-color:transparent;animation:r298Turn 1.6s linear infinite}
@keyframes r298Turn{to{transform:rotate(360deg)}}
#fb .r298-run b{font-size:13px;font-weight:600;color:var(--f-ink1)}
#fb .r298-run small{grid-column:2;font-size:11.5px;color:var(--f-ink3)}
#fb .r298-run .w{grid-row:1/3;grid-column:3;display:flex;flex-direction:column;align-items:flex-end;gap:4px;font-size:11.5px;color:var(--f-ink3)}
#fb .r298-run .w .f-chip{font-size:11px;padding:2px 8px}
#fb .r298-bar{grid-column:1/-1;height:4px;border-radius:999px;background:var(--f-wellbg);box-shadow:var(--f-well);overflow:hidden;margin-top:4px}
#fb .r298-bar i{display:block;height:100%;width:0;border-radius:inherit;background:linear-gradient(90deg,var(--f-pb),var(--f-pa));transition:width 1.2s ease-in-out}
#fb .r298-runhead{display:flex;align-items:flex-start;justify-content:space-between;gap:10px;flex-wrap:wrap;margin:10px 0 10px}
#fb .r298-runhead h4{margin:0;font:600 15px/1.3 var(--f-serif);color:var(--f-ink1);letter-spacing:.02em}
#fb .r298-runhead small{display:block;font-size:11.5px;color:var(--f-ink3);margin-top:2px}
#fb .r298-runhead .k{display:flex;gap:6px;flex-wrap:wrap}
#fb .r298-jobs{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px;margin:0 0 10px}
#fb .r298-job{display:grid;grid-template-columns:auto minmax(0,1fr);gap:2px 9px;align-items:center;text-align:left;padding:9px 10px;border:1px solid var(--f-hair);border-radius:12px;background:linear-gradient(var(--f-a),var(--f-b));box-shadow:var(--f-pop);color:inherit;font:inherit;cursor:pointer;transition:transform .18s var(--f-spring),box-shadow .18s,border-color .2s}
#fb .r298-job:hover{transform:translateY(-2px);box-shadow:var(--f-pophi)}#fb .r298-job:active{transform:translateY(1px);box-shadow:var(--f-press)}
#fb .r298-job[aria-pressed="true"]{border-color:var(--f-ring);box-shadow:var(--f-pophi),inset 0 0 0 1px var(--f-ring)}
#fb .r298-job b{font-size:12.5px;font-weight:600;color:var(--f-ink1);overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
#fb .r298-job small{grid-column:2;font-size:11px;color:var(--f-ink3);line-height:1.35}
#fb .r298-steps{display:flex;flex-direction:column;gap:3px;margin:0 0 10px}
#fb .r298-step{display:grid;grid-template-columns:auto minmax(0,1fr) auto;gap:8px;align-items:center;font-size:12.5px;padding:3px 2px;color:var(--f-ink2)}
#fb .r298-step .r298-m{width:20px;height:20px;border-radius:6px;font-size:11px}
#fb .r298-step time{font-size:11px;color:var(--f-ink3);font-variant-numeric:tabular-nums}
#fb .r298-log{position:relative;margin:0 0 10px;border-radius:12px;background:var(--f-code);border:1px solid var(--f-hair);box-shadow:var(--f-well);overflow:hidden}
#fb .r298-log .lh{display:flex;align-items:center;gap:8px;padding:7px 10px;border-bottom:1px solid var(--f-hair2);font-size:11.5px;color:var(--f-ink3)}
#fb .r298-log .lh input{flex:1;min-width:0;border:1px solid var(--f-hair);border-radius:8px;padding:3px 8px;background:var(--f-hi);box-shadow:var(--f-well);color:var(--f-ink1);font:12px var(--f-sans)}
#fb .r298-log pre{margin:0;max-height:300px;overflow:auto;padding:8px 0;font:11.5px/1.6 var(--f-mono);color:var(--f-codeink);white-space:pre-wrap;overflow-wrap:anywhere}
#fb .r298-log pre span{display:block;padding:0 10px 0 44px;text-indent:-44px;animation:r298Line .5s ease both}
@keyframes r298Line{from{opacity:0}to{opacity:1}}
#fb .r298-log pre i{display:inline-block;width:34px;margin-right:10px;text-align:right;color:var(--f-com);font-style:normal;user-select:none}
#fb .r298-log pre span.bad{background:var(--f-delbg);color:var(--f-del)}#fb .r298-log pre span.ok{color:var(--f-ok)}#fb .r298-log pre span.st{font-weight:700;color:var(--f-ink1)}
#fb .r298-log pre span.hit{background:var(--f-accs)}
#fb .r298-explain{margin:0 0 10px;padding:10px 12px;border-radius:12px;border:1px solid var(--f-hair);background:linear-gradient(var(--f-a),var(--f-accs));box-shadow:var(--f-pill);color:var(--f-ink1);font-size:12.5px;line-height:1.55}
#fb .r298-explain b{display:block;font:600 13.5px/1.3 var(--f-serif);margin-bottom:4px}
#fb .r298-explain .k{margin-top:8px}
#fb .r298-explain .said{white-space:pre-wrap}
#fb .r298-arts{display:flex;flex-direction:column;gap:6px;margin-bottom:10px}
#fb .r298-art{display:grid;grid-template-columns:minmax(0,1fr) auto;gap:2px 10px;align-items:center;padding:8px 10px;border-radius:10px;border:1px solid var(--f-hair2);background:linear-gradient(var(--f-a),var(--f-b));box-shadow:var(--f-pill)}
#fb .r298-art b{font-size:12.5px;font-weight:600;color:var(--f-ink1);overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
#fb .r298-art small{grid-column:1;font-size:11px;color:var(--f-ink3)}
#fb .r298-art .k{grid-row:1/3;grid-column:2;display:flex;gap:6px;flex-wrap:wrap;justify-content:flex-end}
#fb .r298-sum{margin:0 0 10px;padding:10px 12px;border-radius:12px;border:1px solid var(--f-hair2);background:linear-gradient(var(--f-a),var(--f-b));box-shadow:var(--f-pill);font-size:12.5px;line-height:1.55;color:var(--f-ink2)}
/* ---------- Workflows ---------- */
#fb .r298-wfs{display:grid;grid-template-columns:minmax(0,1fr);gap:8px}
#fb .r298-wf{display:flex;flex-direction:column;gap:5px;padding:10px 11px;border:1px solid var(--f-hair);border-radius:12px;background:linear-gradient(var(--f-a),var(--f-b));box-shadow:var(--f-pop);animation:r298Open .45s cubic-bezier(.22,.8,.3,1) both}
#fb .r298-wf .top{display:flex;align-items:center;gap:8px;justify-content:space-between}
#fb .r298-wf b{font-size:13px;font-weight:600;color:var(--f-ink1)}
#fb .r298-wf code{font:11px var(--f-mono);color:var(--f-ink3)}
#fb .r298-wf small{font-size:11.5px;color:var(--f-ink3);line-height:1.45}
#fb .r298-wf .on{display:flex;gap:5px;flex-wrap:wrap}
#fb .r298-wf .on .f-chip{font-size:11px;padding:2px 8px}
#fb .r298-wf .k{display:flex;gap:6px;flex-wrap:wrap;margin-top:4px}
#fb .r298-wf.bad{border-style:dashed}
#fb .r298-inputs{display:grid;gap:8px;margin:4px 0 10px}
#fb .r298-inputs label{display:grid;gap:3px;font-size:12px;color:var(--f-ink2)}
#fb .r298-inputs input[type=text],#fb .r298-inputs select{border:1px solid var(--f-hair);border-radius:8px;padding:5px 8px;background:var(--f-hi);box-shadow:var(--f-well);color:var(--f-ink1);font:12.5px var(--f-sans)}
/* ---------- Machines ---------- */
#fb .r298-mcs{display:grid;grid-template-columns:minmax(0,1fr);gap:8px}
#fb .r298-mc{display:grid;grid-template-columns:auto minmax(0,1fr) auto;gap:4px 10px;align-items:start;padding:10px 11px;border:1px solid var(--f-hair);border-radius:12px;background:linear-gradient(var(--f-a),var(--f-b));box-shadow:var(--f-pop);animation:r298Open .45s cubic-bezier(.22,.8,.3,1) both}
#fb .r298-mc .ic{width:34px;height:34px;border-radius:10px;display:grid;place-items:center;background:linear-gradient(var(--f-a),var(--f-accs));box-shadow:var(--f-pill);color:var(--f-acc)}
#fb .r298-mc .ic svg{width:20px;height:20px}
#fb .r298-mc b{font-size:13px;font-weight:600;color:var(--f-ink1)}#fb .r298-mc small{display:block;font-size:11.5px;color:var(--f-ink3)}
#fb .r298-mc .st{font-size:11px}
#fb .r298-tools{grid-column:2/-1;display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:2px 10px;margin-top:4px}
#fb .r298-tools.miss{grid-template-columns:minmax(0,1fr);margin-top:2px}
#fb .r298-tool{display:flex;align-items:baseline;gap:6px;font-size:11.5px;color:var(--f-ink2);line-height:1.45}
#fb .r298-tool i{font-style:normal;font-weight:700;width:12px;flex:0 0 auto}#fb .r298-tool.ok i{color:var(--f-ok)}#fb .r298-tool.no i{color:var(--f-warn)}
#fb .r298-tool.no{color:var(--f-ink3)}
#fb .r298-mc .can{grid-column:2/-1;font-size:11.5px;color:var(--f-ink2);margin-top:3px}
#fb .r298-mc .can b{font-size:11.5px}
#fb .r298-mc .k{grid-column:2/-1;display:flex;gap:6px;flex-wrap:wrap;margin-top:4px}
#fb .r298-mc.later{opacity:.86}
/* ---------- Releases: every device ---------- */
#fb .r298-rel{border:1px solid var(--f-hair);border-radius:14px;background:linear-gradient(var(--f-a),var(--f-b));box-shadow:var(--f-pop);padding:12px 12px 10px;margin:0 0 10px;animation:r298Open .45s cubic-bezier(.22,.8,.3,1) both}
#fb .r298-rel .rh{display:flex;align-items:center;gap:8px;flex-wrap:wrap;margin:0 0 4px}
#fb .r298-rel .rh h4{margin:0;font:600 15px/1.3 var(--f-serif);color:var(--f-ink1);letter-spacing:.02em}
#fb .r298-rel .tag{font:600 11px var(--f-mono);padding:2px 7px;border-radius:6px;background:linear-gradient(var(--f-a),var(--f-accs));box-shadow:var(--f-pill);color:var(--f-acc)}
#fb .r298-rel .meta{font-size:11.5px;color:var(--f-ink3);margin:0 0 6px}
#fb .r298-dev{display:grid;grid-template-columns:auto minmax(0,1fr);gap:4px 10px;padding:9px 2px;border-top:1px solid var(--f-hair2)}
#fb .r298-dev .ic{width:28px;height:28px;border-radius:9px;display:grid;place-items:center;background:var(--f-wellbg);box-shadow:var(--f-well);color:var(--f-ink2)}
#fb .r298-dev .ic svg{width:17px;height:17px}
#fb .r298-dev > b{align-self:center;font-size:13px;font-weight:600;color:var(--f-ink1)}
#fb .r298-assets{grid-column:2;display:flex;flex-direction:column;gap:5px}
#fb .r298-asset{display:grid;grid-template-columns:minmax(0,1fr);gap:2px;padding:7px 9px 8px;border-radius:9px;background:linear-gradient(var(--f-a),var(--f-b));border:1px solid var(--f-hair2);box-shadow:var(--f-pill)}
#fb .r298-asset b{font-size:12px;font-weight:600;color:var(--f-ink1);overflow-wrap:anywhere}
#fb .r298-asset small{grid-column:1;font-size:11px;color:var(--f-ink3);line-height:1.4}
#fb .r298-asset .k{display:flex;gap:6px;flex-wrap:wrap;margin-top:5px}
#fb .r298-asset .f-btn{padding:4px 9px;font-size:11.5px;border-radius:8px}
#fb .r298-asset.miss{background:var(--f-wellbg);border-style:dashed;box-shadow:var(--f-well)}
/* ---------- Ship: where it is made ---------- */
#fb .r298-where{margin:0 0 10px}
/* ---------- the sheets ---------- */
#fb .r298-pick{display:flex;flex-direction:column;gap:6px;margin:6px 0 10px}
#fb .r298-pick .f-opt[aria-pressed="true"]{border-color:var(--f-ring);box-shadow:var(--f-pophi),inset 0 0 0 1px var(--f-ring)}
#fb .r298-gloss{display:grid;grid-template-columns:minmax(0,.8fr) minmax(0,.8fr) minmax(0,1.4fr);gap:0;margin:4px 0 10px;font-size:12.5px;border:1px solid var(--f-hair);border-radius:12px;overflow:hidden;max-height:420px;overflow-y:auto;background:var(--f-card);box-shadow:var(--f-well)}
#fb .r298-gloss > *{padding:6px 10px;border-bottom:1px solid var(--f-hair2)}
#fb .r298-gloss .h{font:700 10.5px/1.4 var(--f-sans);letter-spacing:.08em;text-transform:uppercase;color:var(--f-ink3);background:var(--f-card);position:sticky;top:0}
#fb .r298-gloss b{font-weight:600;color:var(--f-ink1)}#fb .r298-gloss code{font:11.5px var(--f-mono);color:var(--f-ink2)}#fb .r298-gloss span{color:var(--f-ink2)}
@media (max-width:640px){#fb .r298-jobs{grid-template-columns:minmax(0,1fr)}#fb .r298-tools{grid-template-columns:minmax(0,1fr)}#fb .r298-gloss{grid-template-columns:minmax(0,1fr) minmax(0,1fr)}#fb .r298-gloss code{grid-column:1/-1}#fb .r298-gloss .h:nth-child(3){display:none}
  #fb .r298-art{grid-template-columns:minmax(0,1fr)}#fb .r298-art .k{grid-row:auto;grid-column:1;justify-content:flex-start}}
@media (prefers-reduced-motion:reduce){#fb .r298-lcard,#fb .r298-log pre span,#fb .r298-run,#fb .r298-wf,#fb .r298-mc,#fb .r298-rel,#fb .r298-needs{animation:none}#fb .r298-m.run::after,#fb .r298-need .d.run{animation:none}#fb .r298-bar i{transition:none}}
</style>
<script>try{(window.__ingParts=window.__ingParts||{})["p298"]="started";}catch(_){}
/* R298 · Fabrica, phase 3, its first stage: see the note at the top of its styles */
(function r298(){
"use strict";
if(window.__r298)return;window.__r298=1;
var D=document,W=window;
/*CORE-BEGIN*/
/* ---------- the core: GitHub's workflow files read as GitHub reads them, and made into a run for this computer ----------
   Pure functions (no page): yaml(text), expr(src, ctx, status), plan(workflow, opts). Tested in Node (rig/t_708_core.js) against a
   standard YAML reader on real workflow files, and against GitHub's own rules for expressions. */
var CORE=(function(){
/* ----- YAML: the part of YAML 1.2 that workflow files use: mappings and sequences by indentation, flow [ ] and { }, plain, single
   and double quoted scalars, literal | and folded > blocks with their chomping, comments, anchors and aliases, merge keys ----- */
function yerr(m,ln){var e=new Error(m+(ln!=null?" (line "+(ln+1)+")":""));e.line=ln;return e;}
function resolve(t){if(t===""||t==="~"||/^(null|Null|NULL)$/.test(t))return null;if(/^(true|True|TRUE)$/.test(t))return true;if(/^(false|False|FALSE)$/.test(t))return false;
  if(/^[-+]?[0-9]+$/.test(t))return parseInt(t,10);if(/^0o[0-7]+$/.test(t))return parseInt(t.slice(2),8);if(/^0x[0-9a-fA-F]+$/.test(t))return parseInt(t.slice(2),16);
  if(/^[-+]?(\.[0-9]+|[0-9]+(\.[0-9]*)?)([eE][-+]?[0-9]+)?$/.test(t))return parseFloat(t);
  if(/^[-+]?\.(inf|Inf|INF)$/.test(t))return t.charAt(0)==="-"?-Infinity:Infinity;if(/^\.(nan|NaN|NAN)$/.test(t))return NaN;return t;}
var ESC={"0":"\0",a:"\x07",b:"\b",t:"\t","\t":"\t",n:"\n",v:"\x0b",f:"\f",r:"\r",e:"\x1b"," ":" ",'"':'"',"/":"/","\\":"\\",N:"\x85",_:"\xa0",L:"\u2028",P:"\u2029"};
/* a quoted scalar from s at i (s[i] is the quote); returns [value, index after the closing quote], or null when it does not close */
function quoted(s,i){var q=s.charAt(i),out="",j=i+1;
  while(j<s.length){var c=s.charAt(j);
    if(q==="'"){if(c==="'"){if(s.charAt(j+1)==="'"){out+="'";j+=2;continue;}return [out,j+1];}}
    else{if(c==='"')return [out,j+1];
      if(c==="\\"){var d=s.charAt(j+1);if(d==="x"||d==="u"||d==="U"){var n=d==="x"?2:d==="u"?4:8,hx=s.substr(j+2,n);out+=String.fromCodePoint?String.fromCodePoint(parseInt(hx,16)):String.fromCharCode(parseInt(hx,16));j+=2+n;continue;}
        if(d==="\n"){j+=2;while(s.charAt(j)===" "||s.charAt(j)==="\t")j++;continue;}
        if(ESC[d]!=null){out+=ESC[d];j+=2;continue;}out+=d;j+=2;continue;}}
    if(c==="\n"){/* a line break inside quotes folds to a space; an empty line to a newline */out=out.replace(/[ \t]+$/,"");var k=j+1,nl=0;
      while(k<s.length){var e=k;while(s.charAt(e)===" "||s.charAt(e)==="\t")e++;if(s.charAt(e)==="\n"){nl++;k=e+1;continue;}k=e;break;}
      out+=nl?new Array(nl+1).join("\n"):" ";j=k;continue;}
    out+=c;j++;}
  return null;}
/* a comment begins with # at the start or after a space, outside quotes */
function uncomment(s){var q=null;for(var i=0;i<s.length;i++){var c=s.charAt(i);
    if(q){if(q==="'"&&c==="'"){if(s.charAt(i+1)==="'"){i++;continue;}q=null;}else if(q==='"'){if(c==="\\"){i++;continue;}if(c==='"')q=null;}continue;}
    if((c==='"'||c==="'")&&(i===0||/[\s,\[{:]/.test(s.charAt(i-1))))q=c;
    else if(c==="#"&&(i===0||/\s/.test(s.charAt(i-1))))return s.slice(0,i).replace(/\s+$/,"");}
  return s.replace(/\s+$/,"");}
/* the flow forms: [a, b], {a: 1, b: [x]} */
function flow(s,ln,anchors){var i=0;
  function ws(){for(;;){while(i<s.length&&/\s/.test(s.charAt(i)))i++;if(s.charAt(i)==="#"){while(i<s.length&&s.charAt(i)!=="\n")i++;continue;}return;}}
  function plain(inMap){var st=i;while(i<s.length){var c=s.charAt(i);if(c===","||c==="]"||c==="}"||c==="["||c==="{")break;if(c===":"&&(/[\s,\]}]/.test(s.charAt(i+1))||i+1>=s.length))break;if(c==="#"&&/\s/.test(s.charAt(i-1)))break;i++;}
    return s.slice(st,i).replace(/\s+/g," ").trim();}
  function val(inMap){ws();var c=s.charAt(i),anc=null;
    if(c==="&"){var m=/^&([^\s,\[\]{}]+)\s*/.exec(s.slice(i));anc=m[1];i+=m[0].length;ws();c=s.charAt(i);}
    var v;
    if(c==="*"){var m2=/^\*([^\s,\[\]{}]+)/.exec(s.slice(i));i+=m2[0].length;if(!(m2[1] in anchors))throw yerr("“*"+m2[1]+"” names no anchor",ln);v=anchors[m2[1]];}
    else if(c==="!"){var m3=/^![^\s]*\s*/.exec(s.slice(i));i+=m3[0].length;return val(inMap);}
    else if(c==="["){i++;v=[];ws();if(s.charAt(i)==="]"){i++;}else for(;;){var it=val(false);ws();
        if(s.charAt(i)===":"){i++;var vv=val(false),o={};o[keyStr(it)]=vv;it=o;ws();}
        v.push(it);if(s.charAt(i)===","){i++;ws();if(s.charAt(i)==="]"){i++;break;}continue;}if(s.charAt(i)==="]"){i++;break;}throw yerr("a list in [ ] that does not close",ln);}}
    else if(c==="{"){i++;v={};ws();if(s.charAt(i)==="}"){i++;}else for(;;){ws();var k=val(true);ws();var x=null;
        if(s.charAt(i)===":"){i++;ws();if(s.charAt(i)===","||s.charAt(i)==="}")x=null;else x=val(true);}
        put(v,keyStr(k),x,ln);ws();if(s.charAt(i)===","){i++;ws();if(s.charAt(i)==="}"){i++;break;}continue;}if(s.charAt(i)==="}"){i++;break;}throw yerr("a mapping in { } that does not close",ln);}}
    else if(c==='"'||c==="'"){var q=quoted(s,i);if(!q)throw yerr("a quotation that does not close",ln);v=q[0];i=q[1];}
    else v=resolve(plain(inMap));
    if(anc)anchors[anc]=v;return v;}
  var out=val(false);ws();if(i<s.length)throw yerr("something after the end of [ ] or { }: “"+s.slice(i,i+20)+"”",ln);return out;}
function keyStr(k){return k===null?"null":typeof k==="object"?JSON.stringify(k):String(k);}
function put(o,k,v,ln){if(k==="<<"){var srcs=Array.isArray(v)?v:[v];srcs.forEach(function(m){if(m&&typeof m==="object")Object.keys(m).forEach(function(x){if(!(x in o))o[x]=m[x];});});return;}o[k]=v;}
function yaml(text){
  var L=String(text==null?"":text).replace(/\r\n?/g,"\n").split("\n"),i=0,anchors={};
  if(L.length&&L[0].charCodeAt(0)===0xFEFF)L[0]=L[0].slice(1);
  function ind(s){var n=0;while(n<s.length&&s.charAt(n)===" ")n++;return n;}
  function blank(s){var t=s.trim();return !t||t.charAt(0)==="#";}
  function skip(){while(i<L.length&&(blank(L[i])||/^(---|\.\.\.)(\s|$)/.test(L[i])||/^%/.test(L[i])))i++;}
  function sp(n){return new Array(n+1).join(" ");}
  /* a key at the start of t: [key, the rest after its colon] */
  function keyOf(t){var c=t.charAt(0);
    if(c==='"'||c==="'"){var q=quoted(t,0);if(!q)return null;var r=t.slice(q[1]),m=/^\s*:(\s|$)/.exec(r);return m?[q[0],r.slice(m[0].length-(m[1]?1:0))]:null;}
    if(!c||"-#&*!|>%@`[]{},?".indexOf(c)>=0&&!(c==="-"&&t.charAt(1)&&!/\s/.test(t.charAt(1)))&&!(c==="?"&&false))return null;
    if(c==="-"&&(t.length===1||/\s/.test(t.charAt(1))))return null;
    var m2=/:(\s|$)/.exec(t);if(!m2)return null;var k=t.slice(0,m2.index);if(/\s#/.test(k))return null;
    return [k.replace(/\s+$/,""),t.slice(m2.index+1)];}
  function node(min){skip();if(i>=L.length)return null;var n=ind(L[i]);if(n<min)return null;var t=L[i].slice(n);
    if(t==="-"||t.slice(0,2)==="- ")return seq(n);
    if(keyOf(t))return map(n);
    return value(t,n-1);}
  function map(n){var o={};
    for(;;){skip();if(i>=L.length)break;var k0=ind(L[i]);if(k0<n)break;if(k0>n)throw yerr("this line is indented more than the lines around it",i);
      var t=L[i].slice(n);if(t==="-"||t.slice(0,2)==="- ")break;var kv=keyOf(t);if(!kv)throw yerr("a line here should be “name: value”",i);
      var key=kv[0],rest=kv[1];if(key&&(key.charAt(0)!=='"'&&key.charAt(0)!=="'"))key=String(key);
      put(o,keyStr(resolveKey(kv[0],t)),value(rest,n,true),i);}
    return o;}
  function resolveKey(k,t){var c=t.charAt(0);if(c==='"'||c==="'")return k;var r=resolve(k);return r===null?"null":r;}
  function seq(n){var a=[];
    for(;;){skip();if(i>=L.length)break;var k0=ind(L[i]);if(k0!==n)break;var t=L[i].slice(n);if(!(t==="-"||t.slice(0,2)==="- "))break;
      var content=t.slice(1),s0=ind(content),col=n+1+s0;content=content.slice(s0);
      if(content===""||content.charAt(0)==="#"){i++;var sub=node(n+1);a.push(sub);continue;}
      if(content==="-"||content.slice(0,2)==="- "||keyOf(content)){L[i]=sp(col)+content;a.push(node(col));continue;}
      a.push(value(content,n));}
    return a;}
  /* the value after a key's colon (or a list item's dash), on line i; n is the key's (or dash's) indentation */
  function value(rest,n,inMap){var ln=i,anc=null,r=rest.replace(/^\s+/,"");
    r=uncommentHead(r);
    if(r.charAt(0)==="&"){var m=/^&(\S+)\s*/.exec(r);anc=m[1];r=r.slice(m[0].length);}
    if(r.charAt(0)==="!"){var mt=/^!\S*\s*/.exec(r);r=r.slice(mt[0].length);}
    var v;
    if(r===""){i++;skip();var nx=i<L.length?ind(L[i]):-1;
      if(nx>n)v=node(n+1);else if(inMap&&nx===n&&i<L.length&&(L[i].slice(n)==="-"||L[i].slice(n,n+2)==="- "))v=seq(n);else v=null;}
    else if(r.charAt(0)==="*"){var ma=/^\*(\S+)/.exec(r);if(!(ma[1] in anchors))throw yerr("“*"+ma[1]+"” names no anchor",ln);v=anchors[ma[1]];i++;}
    else if(r.charAt(0)==="|"||r.charAt(0)===">")v=block(r,n);
    else if(r.charAt(0)==="["||r.charAt(0)==="{"){var txt=r,dep=depth(r);i++;while(dep>0&&i<L.length){txt+="\n"+L[i];dep=depth(txt);i++;}if(dep>0)throw yerr("[ or { that does not close",ln);v=flow(txt,ln,anchors);}
    else if(r.charAt(0)==='"'||r.charAt(0)==="'"){var txt2=r,q=quoted(txt2,0);i++;while(!q&&i<L.length){txt2+="\n"+L[i];i++;q=quoted(txt2,0);}if(!q)throw yerr("a quotation that does not close",ln);
      var after=uncomment(txt2.slice(q[1])).trim();if(after)throw yerr("something after the closing quotation: “"+after.slice(0,20)+"”",ln);v=q[0];}
    else{var p=uncomment(r);i++;
      /* a plain value may go on over the lines after it, indented more than its key */
      while(i<L.length){var l2=L[i];if(blank(l2)){var j=i;while(j<L.length&&blank(L[j])&&L[j].trim().charAt(0)!=="#")j++;if(j<L.length&&ind(L[j])>n&&!blank(L[j])&&!keyOf(L[j].trim())&&L[j].trim().slice(0,2)!=="- "){p+="\n";i=j;continue;}break;}
        if(ind(l2)<=n)break;var tt=l2.trim();if(tt.charAt(0)==="#")break;p+=(/\n$/.test(p)?"":" ")+uncomment(tt);i++;}
      v=/\n/.test(p)?p:resolve(p);}
    if(anc)anchors[anc]=v;return v;}
  function uncommentHead(r){return r;}
  function depth(s){var d=0,q=null;for(var k=0;k<s.length;k++){var c=s.charAt(k);if(q){if(q==="'"&&c==="'"){if(s.charAt(k+1)==="'"){k++;continue;}q=null;}else if(q==='"'){if(c==="\\"){k++;continue;}if(c==='"')q=null;}continue;}
      if(c==='"'||c==="'")q=c;else if(c==="#"&&(k===0||/\s/.test(s.charAt(k-1)))){while(k<s.length&&s.charAt(k)!=="\n")k++;}else if(c==="["||c==="{")d++;else if(c==="]"||c==="}")d--;}return d;}
  /* | and >, with + (keep), - (strip) or neither (clip), and an indentation digit */
  function block(h,n){var m=/^([|>])([+-]?)([1-9]?)([+-]?)\s*(#.*)?$/.exec(h);if(!m)throw yerr("a | or > that is not written as YAML writes them",i);
    var style=m[1],chomp=m[2]||m[4],digit=m[3]?parseInt(m[3],10):0;i++;var lines=[],ci=digit?n+digit:-1;
    if(ci<0){for(var j=i;j<L.length;j++){if(L[j].trim()!==""){ci=ind(L[j]);break;}}if(ci<=n)ci=-1;}
    while(i<L.length){var l=L[i];if(l.trim()===""){lines.push(l.length>ci&&ci>=0?l.slice(ci):"");i++;continue;}if(ci<0||ind(l)<ci)break;lines.push(l.slice(ci));i++;}
    var trail=0;while(lines.length&&lines[lines.length-1]===""){lines.pop();trail++;}
    var body;
    if(style==="|")body=lines.join("\n");
    else{body="";var prev=null;lines.forEach(function(x){var more=/^[ \t]/.test(x);
        if(x===""){body+="\n";prev="empty";return;}
        if(prev==="text"&&!more)body+=" ";else if(prev==="more"||(more&&prev==="text"))body+="\n";
        body+=x;prev=more?"more":"text";});}
    if(chomp==="-")return body;if(!lines.length)return chomp==="+"?new Array(trail+1).join("\n"):"";
    return body+"\n"+(chomp==="+"?new Array(trail+1).join("\n"):"");}
  skip();if(i>=L.length)return null;var top=node(0);skip();
  if(i<L.length)throw yerr("this line is not part of the file's shape (check its indentation)",i);return top;}

/* ----- GitHub's expressions, ${{ ... }}: literals, contexts, == != < <= > >= && || !, and its functions ----- */
function lex(src){var T=[],i=0,s=String(src);
  while(i<s.length){var c=s.charAt(i);if(/\s/.test(c)){i++;continue;}
    if(c==="'"){var j=i+1,v="";for(;;){if(j>=s.length)throw new Error("a string that does not close in “"+s+"”");var d=s.charAt(j);if(d==="'"){if(s.charAt(j+1)==="'"){v+="'";j+=2;continue;}break;}v+=d;j++;}T.push({t:"s",v:v});i=j+1;continue;}
    var two=s.substr(i,2);if(["==","!=","<=",">=","&&","||"].indexOf(two)>=0){T.push({t:"o",v:two});i+=2;continue;}
    if("!<>()[].,*".indexOf(c)>=0){T.push({t:"o",v:c});i++;continue;}
    var mn=/^(0x[0-9a-fA-F]+|-?[0-9]+(\.[0-9]+)?([eE][-+]?[0-9]+)?)/.exec(s.slice(i));if(mn&&(c!=="-"||/[0-9]/.test(s.charAt(i+1)))){T.push({t:"n",v:Number(mn[0])});i+=mn[0].length;continue;}
    var mi=/^[A-Za-z_][A-Za-z0-9_-]*/.exec(s.slice(i));if(mi){T.push({t:"i",v:mi[0]});i+=mi[0].length;continue;}
    throw new Error("“"+c+"” cannot be read in “"+s+"”");}
  return T;}
function num(v){if(v===null||v===undefined)return 0;if(typeof v==="boolean")return v?1:0;if(typeof v==="number")return v;if(typeof v==="string"){if(v.trim()==="")return 0;var n=Number(v);return n;}return NaN;}
function truthy(v){return !(v===false||v===null||v===undefined||v===0||v===""||(typeof v==="number"&&isNaN(v)));}
function eq(a,b){if(typeof a==="string"&&typeof b==="string")return a.toLowerCase()===b.toLowerCase();
  if(a!==null&&typeof a==="object"||b!==null&&typeof b==="object")return a===b;if(typeof a===typeof b)return a===b||(a==null&&b==null);return num(a)===num(b);}
function str(v){if(v===null||v===undefined)return "";if(typeof v==="string")return v;if(typeof v==="number")return String(v);if(typeof v==="boolean")return v?"true":"false";try{return JSON.stringify(v,null,2);}catch(e){return "";}}
var FN={contains:function(a,b){if(Array.isArray(a))return a.some(function(x){return eq(x,b);});return str(a).toLowerCase().indexOf(str(b).toLowerCase())>=0;},
  startsWith:function(a,b){return str(a).toLowerCase().indexOf(str(b).toLowerCase())===0;},
  endsWith:function(a,b){var x=str(a).toLowerCase(),y=str(b).toLowerCase();return x.length>=y.length&&x.slice(x.length-y.length)===y;},
  format:function(f){var a=[].slice.call(arguments,1);return str(f).replace(/\{\{|\}\}|\{(\d+)\}/g,function(m,k){return m==="{{"?"{":m==="}}"?"}":str(a[+k]);});},
  join:function(a,sep){sep=sep===undefined?",":str(sep);return Array.isArray(a)?a.map(str).join(sep):str(a);},
  toJSON:function(v){return JSON.stringify(v,null,2);},fromJSON:function(s){return JSON.parse(str(s));},hashFiles:function(){return "";}};
/* status: {ok: the job has gone well so far}; ctx: the contexts; a reference to steps or needs that cannot be known before the run
   throws, with .later set */
function expr(src,ctx,status){var T=lex(src),p=0;status=status||{ok:true};
  function peek(v){var t=T[p];return t&&t.t==="o"&&t.v===v;}
  function take(v){if(!peek(v))throw new Error("“"+v+"” was expected in “"+src+"”");p++;}
  function or(){var a=and();while(peek("||")){p++;var b=and();a=truthy(a)?a:b;}return a;}
  function and(){var a=eqn();while(peek("&&")){p++;var b=eqn();a=truthy(a)?b:a;}return a;}
  function eqn(){var a=cmp();for(;;){if(peek("==")){p++;a=eq(a,cmp());}else if(peek("!=")){p++;a=!eq(a,cmp());}else return a;}}
  function cmp(){var a=un();for(;;){var o=T[p];if(o&&o.t==="o"&&["<","<=",">",">="].indexOf(o.v)>=0){p++;var b=un(),x,y;
        if(typeof a==="string"&&typeof b==="string"){x=a.toLowerCase();y=b.toLowerCase();}else{x=num(a);y=num(b);}
        a=o.v==="<"?x<y:o.v==="<="?x<=y:o.v===">"?x>y:x>=y;}else return a;}}
  function un(){if(peek("!")){p++;return !truthy(un());}return post(prim());}
  function post(v){for(;;){if(peek(".")){p++;var t=T[p++];if(!t)throw new Error("a name was expected after “.” in “"+src+"”");
        if(t.t==="o"&&t.v==="*"){v=Array.isArray(v)?v:(v&&typeof v==="object"?Object.keys(v).map(function(k){return v[k];}):[]);v.__star=1;continue;}
        v=prop(v,String(t.v));}
      else if(peek("[")){p++;var k=or();take("]");v=prop(v,typeof k==="number"?k:str(k));}else return v;}}
  function prop(v,k){if(v&&v.__later)return v;
    if(Array.isArray(v)&&v.__star){var out=[];v.forEach(function(x){var y=prop(x,k);if(y!==null&&y!==undefined)out.push(y);});return out;}
    if(v===null||v===undefined||typeof v!=="object")return null;
    if(typeof k==="number")return Array.isArray(v)?(v[k]===undefined?null:v[k]):null;
    /* names of contexts are read without regard to case, as on GitHub */
    if(Object.prototype.hasOwnProperty.call(v,k))return v[k];var lk=String(k).toLowerCase(),ks=Object.keys(v);for(var i=0;i<ks.length;i++)if(ks[i].toLowerCase()===lk)return v[ks[i]];return null;}
  function prim(){var t=T[p++];if(!t)throw new Error("the expression “"+src+"” ends too soon");
    if(t.t==="s"||t.t==="n")return t.v;
    if(t.t==="o"&&t.v==="("){var v=or();take(")");return v;}
    if(t.t==="i"){var nm=t.v,lo=nm.toLowerCase();
      if(lo==="true")return true;if(lo==="false")return false;if(lo==="null")return null;
      if(peek("(")){p++;var args=[];if(!peek(")"))for(;;){args.push(or());if(peek(",")){p++;continue;}break;}take(")");
        if(lo==="success")return !!status.ok;if(lo==="failure")return !status.ok;if(lo==="always")return true;if(lo==="cancelled")return false;
        var f=null;Object.keys(FN).forEach(function(k){if(k.toLowerCase()===lo)f=FN[k];});if(!f)throw new Error("“"+nm+"()” is not one of GitHub's functions");return f.apply(null,args);}
      if(lo==="steps"||lo==="needs"||lo==="jobs"){var e=new Error("“"+nm+"” is known only as the run goes");e.later=nm;throw e;}
      var c=prop(ctx||{},nm);return c===null?null:c;}
    throw new Error("“"+(t.v)+"” cannot begin a part of “"+src+"”");}
  var out=or();if(p<T.length)throw new Error("something is left over in “"+src+"”");return out;}
/* ${{ }} in a text: each one put in as text; steps.<id>.outputs.<name>, env.<NAME>, github.workspace and runner.temp are put in as
   marks the computer app fills in as the run goes (they are known only then) */
var STEPOUT=/^\s*steps\s*\.\s*([A-Za-z_][A-Za-z0-9_-]*)\s*\.\s*outputs\s*\.\s*([A-Za-z_][A-Za-z0-9_-]*)\s*$/,ENVREF=/^\s*env\s*\.\s*([A-Za-z_][A-Za-z0-9_]*)\s*$/;
/* shown: a name to read (a job's, a step's), filled now from what is known, never with marks */
function fill(text,ctx,warn,shown){return String(text==null?"":text).replace(/\$\{\{([\s\S]*?)\}\}/g,function(m,e){var x;
    if((x=STEPOUT.exec(e)))return shown?"":"\x01so:"+x[1]+":"+x[2]+"\x01";
    if((x=ENVREF.exec(e)))return shown?str(ctx&&ctx.env?ctx.env[x[1]]:""):"\x01env:"+x[1]+"\x01";
    if(/^\s*github\s*\.\s*workspace\s*$/.test(e))return shown?"the run's folder":"\x01env:GITHUB_WORKSPACE\x01";
    if(/^\s*runner\s*\.\s*temp\s*$/.test(e))return shown?"the run's spare folder":"\x01env:RUNNER_TEMP\x01";
    try{return str(expr(e,ctx));}catch(er){if(warn)warn(er.later?"${{"+e+"}} is known only on GitHub as the run goes; it is left empty here":"${{"+e+"}}: "+er.message);return "";}});}
/* an if: is true on GitHub when its value is; success() is put before it when it names none of the four */
function cond(src,ctx){var s=String(src==null?"":src).trim();if(s==="")return {when:"success"};var m=/^\$\{\{([\s\S]*)\}\}$/.exec(s);if(m)s=m[1];
  if(!/\b(success|failure|always|cancelled)\s*\(/i.test(s))s="success() && ("+s+")";
  try{var a=truthy(expr(s,ctx,{ok:true})),b=truthy(expr(s,ctx,{ok:false}));return {when:a&&b?"always":a?"success":b?"failure":"never"};}
  catch(e){return {when:"unknown",why:e.later?"it reads what an earlier step or job said, which Fabrica reads only on GitHub for now":e.message};}}

/* ----- a workflow, made into a run for this computer ----- */
var OSN={macOS:"macOS",Windows:"Windows",Linux:"Linux"};
function osOfLabels(labels){var l=labels.map(function(x){return String(x).toLowerCase();});
  if(l.some(function(x){return /mac|osx/.test(x);}))return "macOS";if(l.some(function(x){return /windows|win-/.test(x)||x==="win";}))return "Windows";
  if(l.some(function(x){return /ubuntu|linux/.test(x);}))return "Linux";return null;}
function list(v){return v==null?[]:Array.isArray(v)?v:[v];}
/* when it runs, in plain words */
function triggers(on){var out=[],o=on;if(typeof o==="string"||Array.isArray(o)){var t={};list(o).forEach(function(k){t[k]=null;});o=t;}
  if(!o||typeof o!=="object")return out;
  Object.keys(o).forEach(function(k){var v=o[k]||{};
    if(k==="push"){var tags=list(v.tags),br=list(v.branches);if(tags.length)out.push("a release tag ("+tags.join(", ")+")");if(br.length||!tags.length)out.push("a new version"+(br.length?" on "+br.join(", "):""));}
    else if(k==="pull_request"||k==="pull_request_target")out.push("a pull request"+(list(v.branches).length?" to "+list(v.branches).join(", "):""));
    else if(k==="workflow_dispatch")out.push("by hand");
    else if(k==="schedule")list(v).forEach(function(s){out.push(cron(s&&s.cron));});
    else if(k==="release")out.push("a release"+(list(v.types).length?" ("+list(v.types).join(", ")+")":""));
    else if(k==="workflow_call")out.push("called by another workflow");
    else if(k==="workflow_run")out.push("after "+list(v.workflows).join(", "));
    else if(k==="issues"||k==="issue_comment")out.push("an issue"+(k==="issue_comment"?" comment":""));
    else out.push(k.replace(/_/g," "));});
  return out;}
function cron(c){var m=/^\s*(\d+)\s+(\d+)\s+\*\s+\*\s+(\*|[0-6](?:-[0-6])?)\s*$/.exec(String(c||""));
  if(!m)return "on a schedule ("+(c||"")+", in UTC)";var hh=("0"+m[2]).slice(-2)+":"+("0"+m[1]).slice(-2),days=m[3]==="*"?"every day":m[3]==="1-5"?"every weekday":"on day "+m[3]+" of the week";
  return days+" at "+hh+" (UTC)";}
/* the matrix: every combination, then exclude, then include, as GitHub does */
function matrix(st,ctx){var mx=st&&st.matrix;if(!mx)return [null];if(typeof mx==="string"){try{mx=expr(mx.replace(/^\$\{\{|\}\}$/g,""),ctx);}catch(e){return [null];}}
  if(!mx||typeof mx!=="object")return [null];
  var keys=Object.keys(mx).filter(function(k){return k!=="include"&&k!=="exclude";}),combos=[{}];
  keys.forEach(function(k){var vals=list(mx[k]),next=[];combos.forEach(function(c){vals.forEach(function(v){var x={};for(var a in c)x[a]=c[a];x[k]=v;next.push(x);});});combos=next;});
  if(!keys.length)combos=[];
  list(mx.exclude).forEach(function(ex){if(!ex||typeof ex!=="object")return;combos=combos.filter(function(c){return !Object.keys(ex).every(function(k){return JSON.stringify(c[k])===JSON.stringify(ex[k]);});});});
  list(mx.include).forEach(function(inc){if(!inc||typeof inc!=="object")return;var added=false;
    combos.forEach(function(c){var orig=keys.filter(function(k){return k in inc;});if(orig.every(function(k){return JSON.stringify(c[k])===JSON.stringify(inc[k]);})){
      Object.keys(inc).forEach(function(k){if(keys.indexOf(k)<0||!(k in c))c[k]=inc[k];});added=true;}});
    if(!added){var x={};Object.keys(inc).forEach(function(k){x[k]=inc[k];});combos.push(x);}});
  return combos.length?combos.slice(0,64):[null];}
function merge(){var o={};for(var i=0;i<arguments.length;i++){var a=arguments[i];if(a&&typeof a==="object")for(var k in a)o[k]=a[k];}return o;}
function envOf(e,ctx,warn){var o={};if(!e)return o;if(typeof e==="string"){try{e=expr(e.replace(/^\s*\$\{\{|\}\}\s*$/g,""),ctx);}catch(er){if(warn)warn("env: "+er.message);return o;}}
  if(typeof e!=="object")return o;Object.keys(e).forEach(function(k){o[k]=fill(str(e[k]),ctx,warn);});return o;}
var SETUP={"actions/setup-python":["python","Python 3"],"actions/setup-java":["java","Java"],"actions/setup-node":["node","Node.js"],"android-actions/setup-android":["android","The Android tools"],
  "maxim-lobanov/setup-xcode":["xcode","Xcode"],"actions/setup-dotnet":[null,".NET"],"actions/setup-go":[null,"Go"],"ruby/setup-ruby":[null,"Ruby"],"gradle/actions/setup-gradle":[null,"Gradle (its wrapper, gradlew, does the same)"]};
/* opts: {os, arch, sha, branch, repo, n, inputs, anyway, tools: {python:"3.12.7"...} (the found ones), file} */
function plan(wf,opts){opts=opts||{};var here=opts.os||"macOS",notes=[],warn=function(t){if(notes.indexOf(t)<0)notes.push(t);};
  if(!wf||typeof wf!=="object"||!wf.jobs||typeof wf.jobs!=="object")throw new Error("this workflow has no jobs");
  var name=str(wf.name)||String(opts.file||"workflow").split("/").pop();
  var inputs={};var ons=wf.on||wf["true"]||null,disp=ons&&typeof ons==="object"&&!Array.isArray(ons)?ons.workflow_dispatch:null;
  if(disp&&disp.inputs)Object.keys(disp.inputs).forEach(function(k){var d=disp.inputs[k]||{};inputs[k]=(opts.inputs&&k in opts.inputs)?opts.inputs[k]:(d["default"]!==undefined?d["default"]:(d.type==="boolean"?false:""));});
  var github={event_name:"workflow_dispatch",sha:opts.sha||"",ref:"refs/heads/"+(opts.branch||"main"),ref_name:opts.branch||"main",ref_type:"branch",head_ref:"",base_ref:"",
    repository:opts.repo||"",repository_owner:"",actor:"",triggering_actor:"",workflow:name,run_id:"",run_number:opts.n||1,run_attempt:"1",server_url:"https://github.com",api_url:"https://api.github.com",
    graphql_url:"https://api.github.com/graphql",workspace:"",action:"",token:"",event:{inputs:inputs},job:""};
  var runner={os:here,arch:opts.arch||"ARM64",name:"this computer",temp:"",tool_cache:"",environment:"self-hosted"};
  var wenv0={github:github,runner:runner,env:{},inputs:inputs,vars:{},secrets:{GITHUB_TOKEN:""},matrix:{},strategy:{},job:{status:"success"}};
  var wenv=envOf(wf.env,wenv0,warn),wdef=(wf.defaults&&wf.defaults.run)||{};
  var jobs=[],keyMap={};
  Object.keys(wf.jobs).forEach(function(key){var j=wf.jobs[key]||{};
    var c0=merge(wenv0,{env:wenv});c0.github=merge(github,{job:key});
    var combos=j.uses?[null]:matrix(j.strategy,c0);keyMap[key]=[];
    combos.forEach(function(mx,ci){var ctx=merge(c0,{matrix:mx||{},strategy:{"fail-fast":true,"job-index":ci,"job-total":combos.length,"max-parallel":1}});
      var k=combos.length>1?key+"_"+(ci+1):key;keyMap[key].push(k);
      var nm=j.name!=null?fill(str(j.name),ctx,warn,true):key;if(mx&&combos.length>1&&!/\$\{\{/.test(str(j.name)))nm+=" ("+Object.keys(mx).map(function(x){return str(mx[x]);}).join(", ")+")";
      var job={key:k,name:nm,needs:list(j.needs).map(String),env:{},timeout:Number(j["timeout-minutes"])||360,steps:[],skip:"",always:false};
      var ro=j["runs-on"],labels=[];if(typeof ro==="string")labels=[fill(ro,ctx,warn)];else if(Array.isArray(ro))labels=ro.map(function(x){return fill(str(x),ctx,warn);});else if(ro&&typeof ro==="object")labels=list(ro.labels).map(function(x){return fill(str(x),ctx,warn);});
      var jos=osOfLabels(labels);job.runsOn=labels.join(", ");job.os=jos||here;
      if(j.uses)job.skip="it calls another workflow ("+str(j.uses)+"), which Fabrica runs only on GitHub for now";
      else if(j.container)job.skip="it runs in a container ("+str(j.container.image||j.container)+"), which this computer does not run for a workflow yet";
      else if(jos&&jos!==here&&!opts.anyway)job.skip="it runs on "+jos+" (runs-on: "+labels.join(", ")+"); this computer is "+here;
      if(!job.skip&&j["if"]!=null){var c=cond(j["if"],ctx);if(c.when==="never")job.skip="its condition is false here (if: "+str(j["if"])+")";else if(c.when==="unknown")job.skip="its condition cannot be read here: "+c.why;else if(c.when==="always")job.always=true;}
      if(j.services)warn("A job's services (its databases and the like) run only on GitHub; the steps that need them may fail here.");
      var jenv=envOf(j.env,ctx,warn);job.env=jenv;ctx=merge(ctx,{env:merge(wenv,jenv)});
      var jdef=(j.defaults&&j.defaults.run)||{};
      list(j.steps).forEach(function(s,si){if(!s||typeof s!=="object")return;var senv=envOf(s.env,merge(ctx,{env:merge(wenv,jenv)}),warn),sctx=merge(ctx,{env:merge(wenv,jenv,senv)});
        var st={name:"",kind:"run",env:senv,sid:s.id?str(s.id):"",continue:false,timeout:Number(s["timeout-minutes"])||0};
        var coe=s["continue-on-error"];if(coe!=null){if(typeof coe==="string"){try{st.continue=truthy(expr(coe.replace(/^\s*\$\{\{|\}\}\s*$/g,""),sctx));}catch(e){st.continue=false;}}else st.continue=!!coe;}
        if(s["if"]!=null){var cc=cond(s["if"],sctx);if(cc.when==="never"){st.kind="note";st.text="Skipped: its condition is false here (if: "+str(s["if"])+").";}
          else if(cc.when==="unknown"){st.kind="note";st.text="Skipped: its condition cannot be read here ("+cc.why+").";}else st.when=cc.when;}
        if(s.uses){var u=str(s.uses),base=u.split("@")[0].toLowerCase(),w=s["with"]||{};st.name=s.name!=null?fill(str(s.name),sctx,warn,true):"Run "+u;
          if(st.kind==="note"){}
          else if(base==="actions/checkout"){st.kind="note";st.done=true;st.text="The files of this version are in the run's folder already"+(w.path?" (path: "+str(w.path)+" is not used here)":"")+".";}
          else if(base==="actions/upload-artifact"){st.kind="artifact";st.art=fill(str(w.name||"artifact"),sctx,warn);st.paths=fill(str(w.path||""),sctx,warn).split("\n").map(function(x){return x.trim();}).filter(Boolean);
            st.need=str(w["if-no-files-found"]||"warn");}
          else if(base==="actions/download-artifact"){st.kind="fetch";st.art=w.name!=null?fill(str(w.name),sctx,warn):"";st.into=w.path!=null?fill(str(w.path),sctx,warn).replace(/^\.\/?/,""):"";}
          else if(SETUP[base]){var sp=SETUP[base],t=sp[0]&&opts.tools?opts.tools[sp[0]]:null,want=w["python-version"]||w["java-version"]||w["node-version"]||w["xcode-version"]||"";
            if(sp[0]&&t){st.kind="note";st.done=true;st.text="Uses this computer's "+sp[1]+(t===true?"":" "+t)+(want?" (the workflow asks for "+str(want)+")":"")+".";}
            else if(sp[0]&&opts.tools){st.kind="fail";st.text=sp[1]+" is not on this computer"+(opts.need&&opts.need[sp[0]]?": "+opts.need[sp[0]]:"")+".";}
            else{st.kind="note";st.text=sp[1]+": set up only on GitHub's machines; here the step after it uses what this computer has.";}}
          else if(base==="actions/cache"||base.indexOf("actions/cache/")===0){st.kind="note";st.text="A cache is GitHub's: here each run starts from the files as they are.";}
          else if(base.indexOf("./")===0){st.kind="note";st.text="An action kept in the repository ("+u+"): Fabrica runs it only on GitHub for now.";}
          else if(base.indexOf("docker://")===0){st.kind="note";st.text="A container ("+u+"): not run on this computer.";}
          else{st.kind="note";st.text="An action from GitHub's marketplace ("+u+"): it runs only on GitHub.";}}
        else if(s.run!=null){st.name=s.name!=null?fill(str(s.name),sctx,warn,true):"Run "+String(str(s.run)).split("\n")[0].slice(0,80);
          if(st.kind!=="note"){st.run=fill(str(s.run),sctx,warn);var sh=s.shell||jdef.shell||wdef.shell||"";st.shell=String(sh).split(/\s+/)[0].toLowerCase();
            var wd=s["working-directory"]||jdef["working-directory"]||wdef["working-directory"]||"";st.cwd=fill(str(wd),sctx,warn).replace(/^\.\/?/,"").replace(/\/+$/,"");}}
        else{st.name=s.name!=null?fill(str(s.name),sctx,warn,true):"Step "+(si+1);st.kind="note";st.text="A step with nothing to run.";}
        job.steps.push(st);});
      jobs.push(job);});});
  /* needs name the jobs a matrix made from them */
  jobs.forEach(function(job){var n=[];job.needs.forEach(function(x){(keyMap[x]||[x]).forEach(function(k){if(n.indexOf(k)<0)n.push(k);});});job.needs=n;});
  return {name:name,jobs:jobs,notes:notes,when:triggers(ons),inputs:disp&&disp.inputs||null};}
return {yaml:yaml,expr:expr,fill:fill,cond:cond,plan:plan,triggers:triggers,str:str,truthy:truthy};})();
/*CORE-END*/
W.IngRuns={core:CORE};
function X(){return W.fbHubHost||null;}
function H(){return W.fbHub||null;}
function $(id){return D.getElementById(id);}
function el(t,c,html){var e=D.createElement(t);if(c)e.className=c;if(html!=null)e.innerHTML=html;return e;}
function esc(t){return String(t==null?"":t).replace(/[&<>"]/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c];});}
function still(){try{return matchMedia("(prefers-reduced-motion: reduce)").matches;}catch(e){return false;}}
function key(cls,label,fn,title){var b=el("button","f-btn"+(cls?" "+cls:""));b.type="button";b.textContent=label;if(title)b.title=title;if(fn)b.addEventListener("click",function(e){e.stopPropagation();fn(e,b);});return b;}
function toast(t){var x=X();if(x&&x.toast)x.toast(t);}
function fail(e){var x=X();if(x&&x.fail)x.fail(e);else try{console.warn("Fabrica",e);}catch(_){}}
function kb(n){var x=X();return x&&x.kb?x.kb(n):(n+" B");}
function ago(t){var x=X();return x&&x.when&&t?x.when(t):"";}
function took(a,b){if(!a)return "";var s=Math.max(0,Math.round(((b||Date.now()/1000)-a)));return s>=60?Math.floor(s/60)+" min "+("0"+(s%60)).slice(-2)+" s":s+" s";}
/* ---------- the computer app's side (build/desktop/app_runs_708.py) ---------- */
function A(){try{var a=typeof W.shellApi==="function"?W.shellApi():null;if(!a&&W.pywebview&&W.pywebview.api)a=W.pywebview.api;return a&&typeof a.runs_new==="function"?a:null;}catch(e){return null;}}
var NOHERE="Runs happen in Ingenium's Mac and Windows apps: this copy of Ingenium cannot start programs on this device.";
function call(name,args){var a=A();if(!a||typeof a[name]!=="function")return Promise.reject(new Error(NOHERE));
  return Promise.resolve(a[name].apply(a,args||[])).then(function(x){if(!x||x.ok===false)throw new Error((x&&x.error)||"It could not be done.");return x;});}
function b64(u){var t="",CH=0x8000;for(var i=0;i<u.length;i+=CH)t+=String.fromCharCode.apply(null,u.subarray(i,i+CH));return btoa(t);}
function unb64(s){var t=atob(s),u=new Uint8Array(t.length);for(var i=0;i<t.length;i++)u[i]=t.charCodeAt(i);return u;}
var ST={runs:[],here:"",listAt:0,tools:null,toolsAt:0,open:null,job:null,logs:{},runCache:{},wf:{},timer:0,busy:false,lopen:{},needs:null,needsAt:0};
function seen(){var x=X(),f=x&&x.FBS?x.FBS():{};if(!f.runsSeen||typeof f.runsSeen!=="object")f.runsSeen={};return f.runsSeen;}
function markSeen(id){var s=seen();if(!s[id]){s[id]=1;var x=X();if(x&&x.saveSoon)x.saveSoon();}}
function list(force){if(!A())return Promise.resolve([]);if(!force&&Date.now()-ST.listAt<1500)return Promise.resolve(ST.runs);
  return call("runs_list").then(function(x){ST.runs=x.runs||[];ST.here=x.here||ST.here;ST.listAt=Date.now();return ST.runs;},function(){return ST.runs;});}
function tools(fresh){if(!A())return Promise.resolve(null);if(!fresh&&ST.tools&&Date.now()-ST.toolsAt<120000)return Promise.resolve(ST.tools);
  return call("runs_tools",[!!fresh]).then(function(t){ST.tools=t;ST.toolsAt=Date.now();ST.here=t.os||ST.here;return t;});}
function going(rs){return (rs||ST.runs).filter(function(r){return r.state==="running"||r.state==="ready";});}
function runsOf(r){return ST.runs.filter(function(x){return x.repo===r.id;});}
/* ---------- the rooms: Runs, between Plans and Care ---------- */
function svg(d){return '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'+d+'</svg>';}
var ICON={runs:svg('<circle cx="8" cy="8" r="5.6"/><path d="M6.7 5.6v4.8L10.4 8z"/>'),book:svg('<path d="M2.5 3.5h4a1.5 1.5 0 0 1 1.5 1.5v8a1.5 1.5 0 0 0-1.5-1.5h-4z"/><path d="M13.5 3.5h-4A1.5 1.5 0 0 0 8 5v8a1.5 1.5 0 0 1 1.5-1.5h4z"/>'),
  mac:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4.5" width="18" height="12" rx="2"/><path d="M9 20h6M12 16.5V20"/></svg>',
  win:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="13" rx="1.5"/><path d="M3 9h18M8 21h8"/></svg>',
  fire:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="4.5" y="3" width="15" height="18" rx="2"/><path d="M10.5 18h3"/></svg>',
  ios:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="6" y="2.5" width="12" height="19" rx="3"/><path d="M10.5 5.3h3"/></svg>',
  web:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="8.5"/><path d="M3.5 12h17M12 3.5c2.5 2.6 2.5 14.4 0 17M12 3.5c-2.5 2.6-2.5 14.4 0 17"/></svg>',
  kit:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M4 8l8-4 8 4-8 4z"/><path d="M4 8v8l8 4 8-4V8M12 12v8"/></svg>',
  file:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M6 3h8l4 4v14H6z"/><path d="M14 3v4h4"/></svg>',
  linux:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="14" rx="2"/><path d="M7 9l3 2.5L7 14M12 14h5"/></svg>',
  gh:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3.5a8.5 8.5 0 0 0-2.7 16.6c.4 0 .6-.2.6-.5v-1.7c-2.4.5-2.9-1-2.9-1-.4-1-1-1.3-1-1.3-.8-.5.1-.5.1-.5.9.1 1.3.9 1.3.9.8 1.3 2 1 2.5.7.1-.6.3-1 .6-1.2-1.9-.2-3.9-1-3.9-4.2 0-.9.3-1.7.9-2.3-.1-.2-.4-1.1.1-2.3 0 0 .7-.2 2.3.9a8 8 0 0 1 4.2 0c1.6-1.1 2.3-.9 2.3-.9.5 1.2.2 2.1.1 2.3.5.6.9 1.4.9 2.3 0 3.3-2 4-3.9 4.2.3.3.6.8.6 1.6v2.4c0 .3.2.6.6.5A8.5 8.5 0 0 0 12 3.5z"/></svg>'};
var VIEWS=[["runs","Runs","Each time a workflow ran on this computer: its jobs, their steps, the whole log, and the files it made"],
  ["workflows","Workflows","The app's workflows (.github/workflows): what each does and when, and Run it now"],
  ["machines","Machines","The computers that run your workflows, and the tools each one has"]];
var ROOM={k:"runs",t:"Runs",i:ICON.runs,v:["runs","workflows","machines"],says:"Your workflows, run on this computer: every job and step, the whole log, and every file they make, kept until you remove them."};
function addRoom(){var R=W.fbRooms;if(!R||!Array.isArray(R.rooms))return false;
  if(!R.rooms.some(function(x){return x.k==="runs";})){var at=-1;R.rooms.forEach(function(x,i){if(x.k==="care")at=i;});if(at<0)R.rooms.push(ROOM);else R.rooms.splice(at,0,ROOM);}
  /* drawn already: the key is put in as the others were made */
  var row=$("fbRooms");if(row){row.classList.add("r298-five");if(!row.querySelector('[data-room="runs"]')){var b=D.createElement("button");b.type="button";b.className="fr-room";b.setAttribute("data-room","runs");b.setAttribute("aria-pressed","false");
      b.innerHTML=ROOM.i+"<span>"+ROOM.t+'</span><span class="fr-n" hidden></span>';b.title=ROOM.says;b.onclick=function(){R.choose("runs");};var care=row.querySelector('[data-room="care"]');row.insertBefore(b,care||null);}}
  return true;}
function addTabs(){var vb=$("fbViews");if(!vb)return false;var made=false;
  VIEWS.forEach(function(x){if(vb.querySelector('button[data-v="'+x[0]+'"]'))return;var b=D.createElement("button");b.type="button";b.setAttribute("role","tab");b.setAttribute("data-v",x[0]);b.setAttribute("aria-selected","false");b.setAttribute("aria-controls","fbWorkBody");
    b.innerHTML=esc(x[1])+(x[0]==="runs"?'<span class="n" hidden></span>':"");b.title=x[2];b.hidden=!(W.fbRooms&&W.fbRooms.room&&W.fbRooms.room()==="runs");
    b.onclick=function(){var hh=X();if(!hh)return;if(x[0]==="runs")ST.open=null;hh.S.view=x[0];var w=$("fbWorkBody");if(w)w.scrollTop=0;hh.paintWork();try{hh.thumbs();}catch(e){}};vb.appendChild(b);made=true;});
  var row=$("fbRooms");if(row)row.classList.add("r298-five");
  return made;}
function counts(){var vb=$("fbViews"),r=X()&&X().cur?X().cur():null;if(!vb)return;var c=vb.querySelector('button[data-v="runs"] .n');if(!c)return;var n=r?going(runsOf(r)).length:0;c.hidden=!n;c.textContent=n?String(n):"";}
/* ---------- Runs ---------- */
function mark(s){var c=s==="ok"?"ok":s==="bad"?"bad":s==="running"?"run":"";return '<span class="r298-m '+c+'" aria-hidden="true">'+(s==="ok"?"✓":s==="bad"?"!":s==="running"?"":s==="stopped"?"■":"○")+"</span>";}
var SAY={ready:"Waiting",running:"Running",ok:"Passed",bad:"Failed",stopped:"Stopped",skipped:"Not run",warn:"Passed, with a warning",queued:"Waiting"};
function where(run){var m=run&&run.machine||{};return "this computer"+(m.os?" ("+m.os+")":"");}
function progress(run){var all=0,done=0;(run.jobs||[]).forEach(function(j){if(j.state==="skipped")return;all++;if(j.state!=="running"&&j.state!=="queued")done++;});return all?Math.round(100*done/all):0;}
function paintRuns(r,w,f){var x=X();var body=el("div","r298-pad");w.appendChild(body);
  if(!A()){body.appendChild(el("div","f-empty","<b>Runs happen on a computer</b>"+esc(NOHERE)+" Your workflows are under Workflows, to read here."));
    f.appendChild(key("","Workflows",function(){go("workflows");}));return;}
  if(ST.open){var rid=ST.open,rec=ST.runCache[rid];if(!rec){body.appendChild(el("div","f-empty","Reading the run…"));call("runs_get",[rid]).then(function(g){ST.runCache[rid]=g.run;repaint();},function(e){ST.open=null;fail(e);repaint();});return;}
    return detail(r,body,f,rec);}
  var mine=runsOf(r);
  if(!mine.length){body.appendChild(el("div","f-empty","<b>No runs yet</b>A run is one time a workflow ran: its jobs, their steps, the whole log and the files it made. Choose a workflow under Workflows and press Run it now; it runs here, on this computer."));
    f.appendChild(key("pri","Workflows",function(){go("workflows");}));f.appendChild(key("","Machines",function(){go("machines");}));return;}
  var box=el("div","r298-rb");
  mine.forEach(function(run,i){var b=el("button","r298-run");b.type="button";b.style.animationDelay=Math.min(i,8)*0.04+"s";var st=run.state;
    var fj=(run.jobs||[]).filter(function(j){return j.state==="bad";})[0];
    b.innerHTML=mark(st)+"<b>"+esc(run.workflow||"A workflow")+(run.n?" · #"+run.n:"")+"</b><small>"+esc((run.why||"by you")+" · "+where(run)+(fj?" · "+fj.name+" failed":""))+"</small>"+
      '<span class="w"><span class="f-chip'+(st==="ok"?" ok":st==="bad"?" warn":"")+'">'+esc(SAY[st]||st)+"</span>"+esc(ago((run.started||run.at)*1000)+(run.ended?" · "+took(run.started||run.at,run.ended):""))+"</span>"+
      (st==="running"?'<span class="r298-bar"><i style="width:'+progress(run)+'%"></i></span>':"");
    b.addEventListener("click",function(){ST.open=run.id;ST.job=null;markSeen(run.id);delete ST.runCache[run.id];repaint();});box.appendChild(b);});
  body.appendChild(box);
  body.appendChild(el("p","f-hint","Every run is kept with its whole log and every file it made, on this computer, until you remove it: no expiry, and no minutes counted."));
  f.appendChild(key("pri","Run a workflow",function(){go("workflows");}));f.appendChild(key("","Machines",function(){go("machines");}));}
function detail(r,body,f,run){var x=X();markSeen(run.id);
  var head=el("div","r298-runhead");head.innerHTML="<div><h4>"+esc(run.workflow||"A workflow")+(run.n?" · #"+run.n:"")+"</h4><small>"+esc((run.why||"by you")+" · "+where(run)+" · "+ago((run.started||run.at)*1000)+(run.ended?" · "+took(run.started||run.at,run.ended):"")+(run.version?" · "+String(run.version).slice(0,7):""))+"</small></div>";
  var hk=el("div","k");hk.appendChild(key("sm quiet","All runs",function(){ST.open=null;repaint();}));
  if(run.state==="running"||run.state==="ready")hk.appendChild(key("sm","Stop",function(e,b){b.disabled=true;call("runs_stop",[run.id]).then(function(){toast("The run stops after the step it is on; what it made so far is kept.");},fail);}));
  else if(run.file){var fails=(run.jobs||[]).some(function(j){return j.state==="bad";});
    if(fails)hk.appendChild(key("sm pri","Re-run the failed jobs",function(){again(r,run,true);}));hk.appendChild(key("sm"+(fails?"":" pri"),"Run it again",function(){again(r,run,false);}));}
  head.appendChild(hk);body.appendChild(head);
  var jobs=run.jobs||[];if(!jobs.length){body.appendChild(el("p","f-hint","This run has no jobs."));return;}
  var jsel=ST.job&&jobs.some(function(j){return j.key===ST.job;})?ST.job:(jobs.filter(function(j){return j.state==="bad";})[0]||jobs.filter(function(j){return j.state==="running";})[0]||jobs[0]).key;ST.job=jsel;
  var jb=el("div","r298-jobs");jobs.forEach(function(j){var b=el("button","r298-job");b.type="button";b.setAttribute("aria-pressed",j.key===jsel?"true":"false");
    b.innerHTML=mark(j.state)+"<b>"+esc(j.name)+"</b><small>"+esc(j.state==="skipped"&&j.skip?"Not run: "+j.skip:(j.state==="queued"?"waiting":"this computer · "+(j.started?took(j.started,j.ended):"")))+"</small>";b.title=j.skip||j.name;
    b.addEventListener("click",function(){ST.job=j.key;repaint();});jb.appendChild(b);});
  body.appendChild(jb);
  var j=jobs.filter(function(y){return y.key===jsel;})[0];
  var steps=el("div","r298-steps");(j.steps||[]).forEach(function(s){var d=el("div","r298-step");d.innerHTML=mark(s.state==="warn"?"ok":s.state)+"<span>"+esc(s.name)+(s.state==="skipped"?' <small style="color:var(--f-ink3)">· not run</small>':"")+"</span><time>"+esc(s.started?took(s.started,s.ended):"")+"</time>";steps.appendChild(d);});
  body.appendChild(steps);
  var lg=el("div","r298-log");lg.innerHTML='<div class="lh"><span>The whole log</span><input type="search" placeholder="Find in the log" aria-label="Find in the log"></div>';var pre=el("pre");pre.setAttribute("tabindex","0");pre.setAttribute("aria-label","The log of "+j.name);lg.appendChild(pre);body.appendChild(lg);
  var inp=lg.querySelector("input");inp.value=ST.find||"";inp.addEventListener("input",function(){ST.find=inp.value;hits(pre,inp.value);});
  var L=ST.logs[run.id+"|"+j.key]||(ST.logs[run.id+"|"+j.key]={text:"",offset:0});lines(pre,L.text,0);hits(pre,inp.value);
  requestAnimationFrame(function(){pre.scrollTop=pre.scrollHeight;});
  if(j.state==="bad"){var ex=el("div","r298-explain");ex.innerHTML="<b>"+esc(((j.steps||[]).filter(function(s){return s.state==="bad";})[0]||{}).name||j.name)+": failed</b>Your own model can read the log, here on this computer, and say what went wrong and what to change.";
    var k=el("div","k");k.appendChild(key("sm","Explain this error",function(e,b){b.disabled=true;explain(run,j,ex).then(function(){b.disabled=false;},function(){b.disabled=false;});}));ex.appendChild(k);body.appendChild(ex);}
  if((run.summary||[]).length){var sm=el("div","r298-sum");run.summary.forEach(function(s){var d=el("div");try{d.innerHTML=H()&&H().md?H().md(s.text):esc(s.text);}catch(e){d.textContent=s.text;}sm.appendChild(d);});body.appendChild(el("span","f-lab","Its summary"));body.appendChild(sm);}
  var arts=run.artifacts||[];if(arts.length){body.appendChild(el("span","f-lab","What it made"));var ab=el("div","r298-arts");
    arts.forEach(function(a){var n=(a.files||[]).length,row=el("div","r298-art","<b>"+esc(a.name)+"</b><small>"+esc(n+" file"+(n===1?"":"s")+" · "+kb(a.size||0)+" · kept with run "+(run.n?"#"+run.n:run.id))+"</small>"),k2=el("div","k");
      if(n)k2.appendChild(key("sm","Save",function(e,b){b.disabled=true;saveArt(run,a).then(function(){b.disabled=false;},function(er){b.disabled=false;fail(er);});}));
      if(n&&run.version)k2.appendChild(key("sm quiet","Add to its release",function(e,b){b.disabled=true;addArt(r,run,a).then(function(){b.disabled=false;},function(er){b.disabled=false;fail(er);});},"Keep it under Releases, with the version this run was made from"));
      k2.appendChild(key("sm quiet",showName(),function(){call("runs_reveal",[run.id,a.name]).catch(fail);}));row.appendChild(k2);ab.appendChild(row);});body.appendChild(ab);}
  if(run.file)f.appendChild(key("","The workflow's file",function(){openFile(run.file);}));
  f.appendChild(key("quiet","Remove this run",function(){if(run.state==="running"){toast("Stop it first.");return;}
    ask("Remove run "+(run.n?"#"+run.n:"")+"?","Its log and the files it made are taken off this computer. The workflow and the app are not changed.","Remove it").then(function(y){if(!y)return;
      call("runs_forget",[run.id]).then(function(){ST.open=null;delete ST.runCache[run.id];return list(true);}).then(repaint,fail);});}));
  follow(run,j,pre);}
function showName(){var os=ST.here||(ST.tools&&ST.tools.os)||"";return os==="Windows"?"Show in Explorer":os==="macOS"?"Show in Finder":"Show its folder";}
function ask(title,text,yes){try{if(typeof W.ingAsk==="function")return Promise.resolve(W.ingAsk({title:title,text:text,yes:yes,no:"Keep it"}));}catch(e){}return Promise.resolve(W.confirm(title+"\n\n"+text));}
function lines(pre,text,from){if(!text)return;var ls=text.split("\n");if(ls[ls.length-1]==="")ls.pop();var n=pre.children.length,frag=D.createDocumentFragment();
  ls.forEach(function(l){n++;var c=/^\s*✓/.test(l)?"ok":/^\s*✗/.test(l)?"bad":/^▸ /.test(l)?"st":null;var s=el("span",c);var i=el("i",null);i.textContent=String(n);s.appendChild(i);s.appendChild(D.createTextNode(l));frag.appendChild(s);});
  pre.appendChild(frag);}
function hits(pre,q){q=String(q||"").trim().toLowerCase();var first=null;[].forEach.call(pre.children,function(s){var on=!!q&&s.textContent.toLowerCase().indexOf(q)>=0;s.classList.toggle("hit",on);if(on&&!first)first=s;});if(first&&q)first.scrollIntoView({block:"nearest"});}
/* the open run is followed: its record and its log, read from where they reached, about once a second while it goes */
function follow(run,j,pre){clearTimeout(ST.timer);var key2=run.id+"|"+j.key,L=ST.logs[key2];
  function step(){if(ST.open!==run.id||ST.job!==j.key||!pre.isConnected)return;
    call("runs_log",[run.id,j.key,L.offset]).then(function(lg){if(lg.text){var at=pre.scrollTop+pre.clientHeight>=pre.scrollHeight-24;L.text+=lg.text;L.offset=lg.offset;lines(pre,lg.text);hits(pre,ST.find);if(at)pre.scrollTop=pre.scrollHeight;}
      if(run.state!=="running"&&run.state!=="ready"&&lg.offset>=lg.size)return;
      return call("runs_get",[run.id]).then(function(g){var before=JSON.stringify(stateOf(ST.runCache[run.id])),now=g.run;ST.runCache[run.id]=now;
        if(JSON.stringify(stateOf(now))!==before){list(true).then(function(){repaint();});return;}ST.timer=setTimeout(step,1000);});},function(){ST.timer=setTimeout(step,2500);});}
  step();}
function stateOf(run){return run?[run.state,(run.jobs||[]).map(function(j){return j.state+(j.steps||[]).map(function(s){return s.state;}).join("");}).join(","),(run.artifacts||[]).length]:null;}
/* a quiet watch of every run going, so Needs you and the room's number follow it, with no page open */
var WATCH=0;function watch(){clearTimeout(WATCH);if(!A())return;var g=going();if(!g.length)return;WATCH=setTimeout(function(){list(true).then(function(rs){if(!going(rs).length||D.hidden){needs(true);counts();}else{needs(true);counts();}
      var x=X();if(x&&x.S&&x.S.view==="runs"&&!ST.open&&$("fb")&&$("fb").offsetParent)repaint();watch();});},3000);}
function saveArt(run,a){var x=X();var files=a.files||[];
  function read(path,size){var parts=[],off=0;function next(){return call("runs_file",[run.id,a.name,path,off,4194304]).then(function(p){parts.push(unb64(p.b64));off=p.offset;if(off<p.size)return next();
      var n=0;parts.forEach(function(u){n+=u.length;});var out=new Uint8Array(n),at=0;parts.forEach(function(u){out.set(u,at);at+=u.length;});return out;});}return next();}
  if(files.length===1)return read(files[0].path).then(function(u){var nm=files[0].path.split("/").pop();return x.saveBytes(nm,x.mimeOf?x.mimeOf(nm):"application/octet-stream",u);}).then(function(){toast("Saved.");});
  var IR=W.IngRepo,zipFn=IR&&IR.core&&IR.core.zip;if(!zipFn)return Promise.reject(new Error("this copy cannot make a zip"));
  var out=[],q=Promise.resolve();files.forEach(function(f){q=q.then(function(){return read(f.path).then(function(u){out.push({name:f.path,data:u});});});});
  return q.then(function(){return zipFn(out);}).then(function(z){return x.saveBytes(a.name+".zip","application/zip",z instanceof Uint8Array?z:new Uint8Array(z));}).then(function(){toast("Saved: "+a.name+".zip.");});}
/* a file a run made, kept under Releases with the version the run was made from, under its device */
function kindOfName(n){n=n.toLowerCase();return /\.apk$/.test(n)?"apk":/\.ipa$/.test(n)?"ipa":/\.html?$/.test(n)?"page":/(mac|macos|osx)[^/]*\.zip$|\.dmg$/.test(n)?"mac":/(win|windows)[^/]*\.zip$|\.exe$|\.msi$/.test(n)?"win":"file";}
function addArt(r,run,a){var x=X(),files=a.files||[];if(!x||!x.keepMade)return Promise.reject(new Error("this copy of Fabrica keeps no packages"));
  var one=files.length===1?files[0]:null,name=one?one.path.split("/").pop():a.name+".zip";
  return saveBytesOf(run,a).then(function(u){var kind=kindOfName(name);return x.keepMade(r,run.version,kind,name,x.mimeOf?x.mimeOf(name):"application/octet-stream",u);})
    .then(function(){toast(name+" is kept under Releases, with version "+String(run.version).slice(0,7)+".");});}
function saveBytesOf(run,a){var files=a.files||[];function read(path){var parts=[],off=0;function next(){return call("runs_file",[run.id,a.name,path,off,4194304]).then(function(p){parts.push(unb64(p.b64));off=p.offset;if(off<p.size)return next();
      var n=0;parts.forEach(function(u){n+=u.length;});var out=new Uint8Array(n),at=0;parts.forEach(function(u){out.set(u,at);at+=u.length;});return out;});}return next();}
  if(files.length===1)return read(files[0].path);var zipFn=W.IngRepo&&IngRepo.core&&IngRepo.core.zip;var out=[],q=Promise.resolve();
  files.forEach(function(f){q=q.then(function(){return read(f.path).then(function(u){out.push({name:f.path,data:u});});});});return q.then(function(){return zipFn(out);}).then(function(z){return z instanceof Uint8Array?z:new Uint8Array(z);});}
/* Explain this error: her own model, on this computer, reads the step that failed and the end of its log */
function canAsk(){try{var m=(state.models||[]).filter(function(x){return x.id===state.activeModelId;})[0];return !!(m&&W.Engine&&Engine.modelId===m.id&&typeof Engine.generate==="function");}catch(e){return false;}}
function explain(run,j,box){var said=box.querySelector(".said");if(!said){said=el("div","said");box.appendChild(said);}
  if(!canAsk()){said.textContent="Load a model first (Models, or the model key at the top): your own model reads the log here, on this computer, and nothing leaves it.";return Promise.resolve();}
  var L=ST.logs[run.id+"|"+j.key]||{text:""},tail=L.text.split("\n").slice(-140).join("\n"),bad=(j.steps||[]).filter(function(s){return s.state==="bad";})[0];
  var msgs=[{role:"system",content:"You help a person who builds her own apps. A workflow step failed on her computer. Read the log and say, in plain words and briefly: what went wrong, why, and what to change to fix it. Name the file and line when the log shows them. Do not invent anything the log does not show; say so when it is not clear."},
    {role:"user",content:"Workflow: "+(run.workflow||"")+"\nJob: "+j.name+"\nThe step that failed: "+(bad?bad.name:"(not named)")+"\n\nThe end of the log:\n"+tail}];
  try{Object.defineProperty(msgs,"__ingChat",{value:false,enumerable:false});}catch(e){}
  said.textContent="Reading the log…";var out="";var params={max_tokens:700,temperature:0.2,thinking:false};
  try{if(typeof replyParams==="function"){var m=(state.models||[]).filter(function(x){return x.id===state.activeModelId;})[0];params=Object.assign({},replyParams(m,{max_tokens:700,thinking:false}),{temperature:0.2,thinking:false});}}catch(e){}
  try{Engine.setStatus("busy");}catch(e){}
  return Promise.resolve(Engine.generate({messages:msgs,params:params,onToken:function(t){out+=t;var i=out.lastIndexOf("</think>");said.textContent=(i>=0?out.slice(i+8):out).replace(/^\s+/,"");},onThink:function(){}}))
    .then(function(res){try{Engine.setStatus("ready");}catch(e){}var t=out||(res&&res.text)||"";var i=t.lastIndexOf("</think>");said.textContent=((i>=0?t.slice(i+8):t).trim())||"The model gave no answer.";},
      function(e){try{Engine.setStatus("ready");}catch(_){}said.textContent="The model could not answer: "+(e&&e.message||e);});}
/* ---------- Workflows ---------- */
function wfFiles(r){var ref=r.head||null;return IngRepo.files(r.id,ref||undefined).then(function(fs){return fs.filter(function(f){return /^\.github\/workflows\/[^\/]+\.ya?ml$/i.test(f.path);});});}
function readWf(r,path){var k=r.id+"|"+(r.head||"")+"|"+path;if(ST.wf[k])return Promise.resolve(ST.wf[k]);
  return IngRepo.readText(r.id,path,r.head||undefined).then(function(t){var o={path:path,text:t||""};try{o.doc=CORE.yaml(o.text);if(!o.doc||typeof o.doc!=="object"||!o.doc.jobs)o.err="it has no jobs: a workflow needs on: and jobs:";}catch(e){o.err=e.message;}ST.wf[k]=o;return o;});}
function paintWorkflows(r,w,f){var body=el("div","r298-pad");w.appendChild(body);
  if(!r.head){body.appendChild(el("div","f-empty","<b>No workflows yet</b>Keep a first version of the app; then a workflow can run on it."));return;}
  var k=r.id+"|"+r.head+"|list",have=ST.wf[k];
  if(!have){body.appendChild(el("div","f-empty","Reading the workflows…"));wfFiles(r).then(function(fs){return Promise.all(fs.map(function(x){return readWf(r,x.path);}));}).then(function(all){ST.wf[k]=all;repaint();},function(e){ST.wf[k]=[];fail(e);repaint();});return;}
  if(!have.length){body.appendChild(el("div","f-empty","<b>No workflows yet</b>A workflow is a file in .github/workflows: the steps a machine follows when something happens (a new version, a release, a time of day, or your press). The same file runs here, on this computer, and on GitHub's machines."));
    f.appendChild(key("pri","New workflow, from a recipe",function(){recipes(r);}));return;}
  var box=el("div","r298-wfs");
  have.forEach(function(o,i){var c=el("div","r298-wf"+(o.err?" bad":""));c.style.animationDelay=Math.min(i,8)*0.04+"s";
    if(o.err){c.innerHTML='<div class="top"><b>'+esc(o.path.split("/").pop())+'</b><span class="f-chip warn">Cannot be read</span></div><code>'+esc(o.path)+"</code><small>"+esc(o.err)+"</small>";
      var k0=el("div","k");k0.appendChild(key("sm quiet","Its file",function(){openFile(o.path);}));c.appendChild(k0);box.appendChild(c);return;}
    var p=null;try{p=CORE.plan(o.doc,{os:ST.here||"macOS",file:o.path});}catch(e){}
    var last=ST.runs.filter(function(x){return x.repo===r.id&&x.file===o.path;})[0];
    c.innerHTML='<div class="top"><b>'+esc(p?p.name:o.path)+'</b>'+(last?'<span class="f-chip'+(last.state==="ok"?" ok":last.state==="bad"?" warn":"")+'">'+esc((last.n?"#"+last.n+" ":"")+(SAY[last.state]||last.state).toLowerCase())+"</span>":"")+"</div><code>"+esc(o.path)+"</code>"+
      "<small>When: "+esc(p&&p.when.length?p.when.join("; "):"no trigger named")+"</small>";
    if(p){var on=el("div","on");p.jobs.forEach(function(j){var chip=el("span","f-chip",esc(j.name+" · "+(j.runsOn||"any machine")));chip.title=j.skip?"Not run on this computer: "+j.skip:"Runs on this computer";if(j.skip)chip.style.opacity=".6";on.appendChild(chip);});c.appendChild(on);}
    var kk=el("div","k");kk.appendChild(key("sm pri","Run it now",function(){runSheet(r,o);},A()?"Runs here, on this computer, at the version kept last":NOHERE));if(!A())kk.lastChild.disabled=true;
    kk.appendChild(key("sm quiet","Its file",function(){openFile(o.path);}));c.appendChild(kk);box.appendChild(c);});
  body.appendChild(box);
  body.appendChild(el("p","f-hint","These are plain GitHub Actions files: GitHub runs them as written when the app is on GitHub, and Fabrica runs each job here, on this computer, with every log and file kept."));
  f.appendChild(key("pri","New workflow, from a recipe",function(){recipes(r);}));}
function openFile(path){var hub=H();if(hub&&hub.open&&hub.open("code",{file:path}))return;toast(path+" is under Now, Code.");}
/* the run sheet: where each job runs, and the workflow's own inputs */
function runSheet(r,o){var x=X();if(!A()){toast(NOHERE);return;}var p0=null;try{p0=CORE.plan(o.doc,{os:ST.here||"macOS",file:o.path});}catch(e){fail(e);return;}
  var sh=x.sheet("Run "+p0.name,"It runs here, on this computer, at the version you kept last"+(r.head?" ("+String(r.head).slice(0,7)+")":"")+": each job in a folder of its own, every step and the whole log kept.");
  var here=ST.here||"macOS",opts=[["exact","Each job on the system it names","A job for "+(here==="Windows"?"macOS or Linux":here==="macOS"?"Windows or Linux":"macOS or Windows")+" waits for that system (on GitHub, or on your other computers)"]];
  if(here==="macOS")opts.push(["unix","Linux jobs here too","A job for Linux (ubuntu-latest) runs on this Mac with bash; most of them work as they are"]);
  opts.push(["all","Every job here, whatever its system","Each job is tried on this computer, as it is"]);
  var pick=el("div","r298-pick"),chosen=here==="macOS"?"unix":"exact";
  opts.forEach(function(it){var b=el("button","f-opt");b.type="button";b.innerHTML='<span class="ic">'+(it[0]==="exact"?"▣":it[0]==="unix"?"◇":"⌂")+"</span><span><b>"+esc(it[1])+"</b><small>"+esc(it[2])+"</small></span>";
    b.setAttribute("aria-pressed",it[0]===chosen?"true":"false");b.addEventListener("click",function(){chosen=it[0];[].forEach.call(pick.children,function(c){c.setAttribute("aria-pressed",c===b?"true":"false");});});pick.appendChild(b);});
  sh.box.appendChild(pick);
  var vals={};if(p0.inputs){var ib=el("div","r298-inputs");ib.appendChild(el("span","f-lab","Its inputs"));
    Object.keys(p0.inputs).forEach(function(k){var d=p0.inputs[k]||{},lab=el("label"),cap=el("span",null,esc(d.description||k)+(d.required?" (needed)":""));lab.appendChild(cap);var inp;
      if(d.type==="boolean"){inp=D.createElement("input");inp.type="checkbox";inp.checked=d["default"]===true||d["default"]==="true";vals[k]=function(){return inp.checked;};}
      else if(d.type==="choice"&&Array.isArray(d.options)){inp=D.createElement("select");d.options.forEach(function(v){var op=D.createElement("option");op.value=CORE.str(v);op.textContent=CORE.str(v);inp.appendChild(op);});inp.value=CORE.str(d["default"]!=null?d["default"]:d.options[0]);vals[k]=function(){return inp.value;};}
      else{inp=D.createElement("input");inp.type="text";inp.value=CORE.str(d["default"]);vals[k]=function(){return inp.value;};}
      inp.setAttribute("aria-label",d.description||k);lab.appendChild(inp);ib.appendChild(lab);});sh.box.appendChild(ib);}
  var end=el("div","end"),go1=key("pri","Run it now",function(){var inputs={};Object.keys(vals).forEach(function(k){inputs[k]=vals[k]();});go1.disabled=true;
    start(r,o,{anyway:chosen==="exact"?false:chosen,inputs:inputs,why:"by you, by hand"}).then(function(){sh.close();},function(e){go1.disabled=false;fail(e);});});
  end.appendChild(go1);sh.box.appendChild(end);}
/* a run: the workflow made into jobs and steps for this computer, the app's files at the version put in its folder, then started */
function start(r,o,opt){opt=opt||{};var x=X();
  return Promise.all([tools(),list(true)]).then(function(z){var t=z[0]||{},have={},need={};(t.tools||[]).forEach(function(k){if(k.ok)have[k.key]=k.version||true;need[k.key]=k.need;});
    var n=1;ST.runs.forEach(function(y){if(y.repo===r.id&&y.n>=n)n=y.n+1;});
    var p=CORE.plan(o.doc,{os:t.os||ST.here||"macOS",arch:/arm|aarch/i.test(t.arch||"")?"ARM64":"X64",sha:r.head,branch:r.branch||"main",repo:r.name,n:n,inputs:opt.inputs,anyway:opt.anyway,tools:have,need:need,file:o.path});
    if(opt.only)p.jobs.forEach(function(j){if(opt.only.indexOf(j.key)<0&&!j.skip)j.skip="it passed in run #"+opt.from;});
    if(opt.anyway==="unix")p.jobs.forEach(function(j){if(/it runs on Linux/.test(j.skip||"")&&(t.os||ST.here)==="macOS")j.skip="";});
    var disk=IngRepo.isDisk&&IngRepo.isDisk(r.id);
    var spec={app:r.name,repo:r.id,version:r.head,label:r.branch||"",workflow:p.name,file:o.path,why:opt.why||"by you",n:n,event:"workflow_dispatch",disk:disk?r.id:"",jobs:p.jobs.map(function(j){return {key:j.key,name:j.name,needs:j.needs,skip:j.skip,env:j.env,timeout:j.timeout,
        steps:j.steps.map(function(s){return {name:s.name,kind:s.kind,run:s.run||"",shell:s.shell||"",env:s.env||{},cwd:s.cwd||"",timeout:s.timeout||0,continue:!!s.continue,paths:s.paths||[],art:s.art||"",text:s.text||"",when:s.when||"success",sid:s.sid||"",done:!!s.done,into:s.into||"",need:s.need||""};})};})};
    if(p.notes.length)spec.jobs.forEach(function(j){if(!j.skip&&j.steps.length)j.steps.unshift({name:"What Fabrica noticed in this workflow",kind:"note",done:true,text:p.notes.join("\n  ")});});
    return call("runs_new",[spec]).then(function(made){var rid=made.id;if(disk)return rid;
      x.busy&&x.busy("Putting the app's files in the run's folder…");
      return IngRepo.files(r.id,r.head).then(function(fs){var q=Promise.resolve();fs.forEach(function(fl){q=q.then(function(){return IngRepo.read(r.id,fl.path,r.head).then(function(u){u=u||new Uint8Array(0);
            var mode=typeof fl.mode==="string"?parseInt(fl.mode,8):fl.mode,CH=3*1024*1024,parts=Math.max(1,Math.ceil(u.length/CH)),q2=Promise.resolve();
            for(var i=0;i<parts;i++)(function(i){q2=q2.then(function(){return call("runs_put",[rid,fl.path,b64(u.subarray(i*CH,(i+1)*CH)),mode||null,i>0]);});})(i);return q2;});});});return q;})
        .then(function(){x.unbusy&&x.unbusy();return rid;},function(e){x.unbusy&&x.unbusy();call("runs_forget",[rid]).catch(function(){});throw e;});})
      .then(function(rid){return call("runs_go",[rid]).then(function(){return rid;});})
      .then(function(rid){ST.open=rid;ST.job=null;markSeen(rid);return list(true).then(function(){nav("runs");watch();needs(true);counts();toast(p.name+": run #"+n+" started here, on this computer.");});});});}
function again(r,run,failedOnly){var path=run.file;if(!path){toast("This run's workflow is not known.");return;}
  readWf(r,path).then(function(o){if(o.err)throw new Error(path+": "+o.err);var only=null;
    if(failedOnly)only=(run.jobs||[]).filter(function(j){return j.state==="bad"||j.state==="stopped";}).map(function(j){return j.key;});
    return start(r,o,{why:failedOnly?"the failed jobs of #"+run.n+" again":"#"+run.n+" again",only:only,from:run.n,anyway:(ST.here==="macOS"?"unix":false)});}).catch(fail);}
/* recipes: a workflow written as a file in .github/workflows, a change to keep like any other */
function recipeText(kind,os){var win=os==="Windows",ro=win?"windows-latest":os==="Linux"?"ubuntu-latest":"macos-latest";
  var check=win?["      - name: Every page of the app opens as a page","        shell: pwsh","        run: |",
      "          $pages = Get-ChildItem -Recurse -File -Include *.html,*.htm | Where-Object { $_.FullName -notmatch 'node_modules' }",
      "          if (-not $pages) { Write-Output 'No page found (.html).'; exit 1 }",
      "          foreach ($p in $pages) { $t = Get-Content -Raw -LiteralPath $p.FullName; if ($t -notmatch '(?i)<html|<!doctype html') { Write-Output \"Not a page: $($p.Name)\"; exit 1 }; Write-Output \"A page: $($p.Name), $($p.Length) bytes\" }"]
    :["      - name: Every page of the app opens as a page","        shell: bash","        run: |",
      "          found=0",
      "          while IFS= read -r p; do",
      "            found=1",
      "            grep -qiE '<html|<!doctype html' \"$p\" || { echo \"Not a page: $p\"; exit 1; }",
      "            echo \"A page: $p, $(wc -c < \"$p\" | tr -d ' ') bytes\"",
      "          done < <(find . -type f \\( -name '*.html' -o -name '*.htm' \\) -not -path './node_modules/*')",
      "          [ \"$found\" = 1 ] || { echo 'No page found (.html).'; exit 1; }"];
  var head={check:["name: Check every version","","# Runs when a new version is kept on main, and when you press Run it now.","on:","  push:","    branches: [main]","  workflow_dispatch:"],
    keep:["name: Keep the app's pages","","# Keeps the app's pages with the run, as files you can save or add to a release.","on:","  workflow_dispatch:"],
    night:["name: Check every night","","# Every night at 2:00 (UTC) on GitHub; here, when you press Run it now.","on:","  schedule:","    - cron: '0 2 * * *'","  workflow_dispatch:"],
    blank:["name: My workflow","","# A workflow: when it runs (on:), then its jobs, each on a machine (runs-on:), each a list of steps.","# A step runs a command (run:) or an action (uses:). Fabrica runs each job here; GitHub runs the same file.","on:","  workflow_dispatch:"]}[kind];
  var jobs=["","jobs:","  "+(kind==="keep"?"pages":"check")+":","    runs-on: "+ro,"    steps:","      - uses: actions/checkout@v4"];
  if(kind==="blank")jobs=jobs.concat(["      - name: Say hello","        run: echo \"Hello from ${{ runner.os }}\""]);
  else jobs=jobs.concat(check);
  if(kind==="keep")jobs=jobs.concat(["      - name: Keep the pages","        uses: actions/upload-artifact@v4","        with:","          name: pages","          path: |","            **/*.html","            !node_modules/**"]);
  return head.concat(jobs).join("\n")+"\n";}
function recipes(r){var x=X();var sh=x.sheet("A new workflow","Start from a recipe: it is written as a file in .github/workflows, which you can read and change in Code, and keep as a version like any change.");
  var list0=[["check","✓","Check every version","Every page of the app opens as a page, at each version kept on main, and when you press Run it now"],
    ["keep","▣","Keep the app's pages","Its pages kept with the run, to save or add to a release"],
    ["night","☾","Check every night","The same check at 2:00 every night on GitHub; here, by hand"],
    ["blank","＋","Begin from nothing","A workflow of one step, with a guide in its first lines"]];
  var chosen="check",pick=el("div","r298-pick");
  list0.forEach(function(it){var b=el("button","f-opt");b.type="button";b.innerHTML='<span class="ic">'+it[1]+"</span><span><b>"+esc(it[2])+"</b><small>"+esc(it[3])+"</small></span>";b.setAttribute("aria-pressed",it[0]===chosen?"true":"false");
    b.addEventListener("click",function(){chosen=it[0];[].forEach.call(pick.children,function(c){c.setAttribute("aria-pressed",c===b?"true":"false");});});pick.appendChild(b);});
  sh.box.appendChild(pick);
  var end=el("div","end"),mk=key("pri","Write it",function(){var name={check:"check.yml",keep:"pages.yml",night:"nightly.yml",blank:"workflow.yml"}[chosen],path=".github/workflows/"+name;mk.disabled=true;
    IngRepo.files(r.id).then(function(fs){if(fs.some(function(f){return f.path===path;}))path=".github/workflows/"+name.replace(/\.yml$/,"")+"-"+Date.now().toString(36).slice(-4)+".yml";
      return IngRepo.put(r.id,path,new TextEncoder().encode(recipeText(chosen,ST.here||"macOS")));})
    .then(function(){sh.close();ST.wf={};return x.refresh();}).then(function(){x.paint();toast(path+" is written: keep it in Now, Changes, then Run it now under Workflows.");},function(e){mk.disabled=false;fail(e);});});
  end.appendChild(mk);sh.box.appendChild(end);}
/* ---------- Machines ---------- */
function paintMachines(r,w,f){var body=el("div","r298-pad");w.appendChild(body);var box=el("div","r298-mcs");body.appendChild(box);
  if(!A()){box.appendChild(el("div","f-empty","<b>This device runs no workflows</b>"+esc(NOHERE)));}
  else if(!ST.tools){box.appendChild(el("div","f-empty","Checking this computer's tools…"));tools(false).then(repaint,function(e){fail(e);});}
  else{var t=ST.tools,os=t.os,c=el("div","r298-mc");var ic=os==="Windows"?ICON.win:os==="Linux"?ICON.linux:ICON.mac;
    var sub=os+(t.release?" "+t.release:"")+(t.arch?" · "+(/arm|aarch/i.test(t.arch)?"Apple silicon or ARM ("+t.arch+")":t.arch):"")+" · you are at it";if(os==="macOS"&&/arm/i.test(t.arch||""))sub=os+" "+t.release+" · Apple silicon · you are at it";
    c.innerHTML='<span class="ic">'+ic+"</span><div><b>This computer"+(t.name?" · "+esc(t.name):"")+"</b><small>"+esc(sub)+'</small></div><span class="f-chip ok st">Ready</span>';
    var ok=el("div","r298-tools"),miss=el("div","r298-tools miss");
    (t.tools||[]).forEach(function(k){var d=el("div","r298-tool "+(k.ok?"ok":"no"));d.innerHTML="<i>"+(k.ok?"✓":"○")+"</i><span>"+esc(k.name+(k.ok&&k.version?" "+String(k.version).replace(/^v/,""):""))+(k.ok?"":": for "+esc(k["for"])+"; "+esc(k.need))+"</span>";d.title="For "+k["for"];(k.ok?ok:miss).appendChild(d);});
    c.appendChild(ok);if(miss.children.length)c.appendChild(miss);
    c.appendChild(el("div","can","<b>Builds here:</b> "+esc(builds(t))));
    var k=el("div","k");k.appendChild(key("sm","Check it again",function(e,b){b.disabled=true;tools(true).then(function(){repaint();toast("Every tool checked again just now.");},function(er){b.disabled=false;fail(er);});}));c.appendChild(k);box.appendChild(c);}
  var later=el("div","r298-mc later");later.innerHTML='<span class="ic">'+ICON.mac+'</span><div><b>Your other computers</b><small>Your Mac mini and your HP laptop</small></div><span class="f-chip st">Coming next</span>';
  later.appendChild(el("div","can","Each pairs once with a code this computer shows, as your devices do for models, and runs the jobs for its own system, with every log kept here. They join in a coming release."));box.appendChild(later);
  var gh=el("div","r298-mc later");gh.innerHTML='<span class="ic">'+ICON.gh+'</span><div><b>GitHub\'s machines</b><small>macOS, Windows and Linux, with your GitHub sign-in</small></div><span class="f-chip st">Coming next</span>';
  gh.appendChild(el("div","can","The same workflow files run on GitHub's machines when the app is on GitHub; Fabrica will start them from here and bring their logs and files back, in a coming release. GitHub counts the minutes of a private repository's runs."));box.appendChild(gh);
  f.appendChild(key("","Workflows",function(){go("workflows");}));}
function builds(t){var h={};(t.tools||[]).forEach(function(k){h[k.key]=k.ok;});var out=[];
  if(t.os==="macOS"&&h.python&&h.pyinstaller)out.push("the Mac app, from its kit");if(t.os==="Windows"&&h.python&&h.pyinstaller)out.push("the Windows app, from its kit");
  if(h.java&&h.android)out.push("the Fire tablet's APK, with Gradle");if(h.xcode)out.push("the iPhone and iPad app, with Xcode");
  out.push("any workflow's steps for "+t.os);return out.join("; ")+".";}
/* ---------- Story, Releases: every device in one release ---------- */
var DEVS=[["mac","Mac (Apple silicon and Intel)","mac",["mac"]],["win","Windows","win",["win"]],["fire","Fire tablet and Android","fire",["apk"]],["ios","iPhone and iPad","ios",["ipa"]],
  ["web","Web and one page","web",["web","page"]],["kits","Build kits","kit",["kits"]],["file","Other files","file",["file"]]];
function paintReleases(r,w,f){var x=X(),C=x.C,MADE=W.fbMade;
  if(!r.head){w.appendChild(el("div","f-empty","<b>No releases yet</b>Keep a first version, test it, and make its packages: they are kept here with the version they came from, one row for each device."));return;}
  var ck=r.id+"|rel",have=C.log[ck];
  if(!have){w.appendChild(el("div","f-empty","Reading the releases…"));Promise.all([IngRepo.log(r.id,{max:200}),MADE.list(r.id)]).then(function(z){var log=z[0],made=z[1],by={};made.forEach(function(m){(by[m.commit]=by[m.commit]||[]).push(m);});
      var rows=log.filter(function(c){return by[c.oid]||c.names.some(function(n){return (r.tags||[]).indexOf(n)>=0;});});
      return Promise.all(rows.map(function(c){return IngRepo.notes(r.id,c.oid).then(function(n){return {c:c,made:by[c.oid]||[],notes:n||{}};});}));}).then(function(l){C.log[ck]=l;var cur=x.cur();if(cur&&cur.id===r.id)x.paintWork();},fail);return;}
  var body=el("div","r298-pad");w.appendChild(body);
  if(!have.length)body.appendChild(el("div","f-empty","<b>No releases yet</b>Mark a version as a release in History, or make its packages under Test and ship: each appears here with the version it came from."));
  var os=ST.here||(ST.tools&&ST.tools.os)||"";
  have.forEach(function(it,i){var c=it.c,tags=c.names.filter(function(n){return (r.tags||[]).indexOf(n)>=0;}),card=el("div","r298-rel");card.style.animationDelay=Math.min(i,6)*0.05+"s";
    var t=it.notes.test,isHead=c.oid===r.head;
    card.innerHTML='<div class="rh">'+tags.map(function(tg){return '<span class="tag">'+esc(tg)+"</span>";}).join("")+"<h4>"+esc(c.title)+"</h4>"+(isHead?'<span class="f-chip ok"><span class="d"></span>the version kept now</span>':"")+"</div>"+
      '<div class="meta">'+esc(ago(c.when)+" · "+c.short+" · "+(t?(t.ok?"tested: passed":"tested: faults found"):"not tested"))+"</div>";
    DEVS.forEach(function(dv){var mine=it.made.filter(function(m){return dv[3].indexOf(m.kind)>=0;}),missing=isHead?dv[3].filter(function(k){return k!=="file"&&!mine.some(function(m){return m.kind===k;})&&x.targetHere&&x.targetHere(k);}):[];
      if(!mine.length&&!missing.length)return;var row=el("div","r298-dev");row.innerHTML='<span class="ic">'+ICON[dv[2]]+"</span><b>"+esc(dv[1])+"</b>";var as=el("div","r298-assets");
      mine.forEach(function(m){var a=el("div","r298-asset","<b>"+esc(m.name)+"</b><small>"+esc(kb(m.size)+" · made "+ago(m.at))+"</small>"),k=el("div","k");
        if(A()&&m.kind==="mac"&&os==="macOS")k.appendChild(key("sm pri","Install on this Mac",function(){installSheet(r,m,"mac");},"Into Applications, where Launchpad and Spotlight find it"));
        if(A()&&m.kind==="win"&&os==="Windows")k.appendChild(key("sm pri","Install on this PC",function(){installSheet(r,m,"win");},/\.exe$/i.test(m.name)?"Opens its installer: for everyone on this PC or just for you":"Into your programs, the Start menu and the desktop, and Settings, Apps to uninstall it"));
        k.appendChild(key("sm quiet","Save",function(e,b){b.disabled=true;MADE.bytes(m.key).then(function(u){if(!u)throw new Error("it is no longer kept here: make it again");return x.saveBytes(m.name,m.mime,u);}).then(function(){b.disabled=false;toast("Saved: "+m.name+".");},function(er){b.disabled=false;fail(er);});}));
        k.appendChild(key("sm quiet","Remove",function(){MADE.del([m.key]).then(function(){delete C.log[ck];x.paintWork();toast(m.name+" is no longer kept here.");},fail);}));a.appendChild(k);as.appendChild(a);});
      missing.forEach(function(kd){var t2=(x.TARGETS||[]).filter(function(y){return y[0]===kd;})[0];var a=el("div","r298-asset miss","<b>"+esc(t2?t2[1]:kd)+": not made yet</b><small>"+esc(t2?t2[2]:"")+"</small>"),k=el("div","k");
        k.appendChild(key("sm","Make it",function(e,b){b.disabled=true;Promise.resolve(x.makeOne(r,kd,{})).then(function(){delete C.log[ck];x.paintWork();},function(){b.disabled=false;});}));a.appendChild(k);as.appendChild(a);});
      row.appendChild(as);card.appendChild(row);});
    if(!it.made.length&&!isHead)card.appendChild(el("p","f-hint","No package of this version is kept on this device."));
    body.appendChild(card);});
  var ht=x.headTag?x.headTag(r):"";
  if(!ht)f.appendChild(key("","Mark the version kept now as a release",function(){x.sheetName("Mark a release","A name for this version, as a release: v1, 6.0, autumn.",function(name){return IngRepo.tag(r.id,name,{target:r.head}).then(function(){toast("Release "+name+" marked.");C.log={};return x.refresh();}).then(x.paint);});}));
  var headIt=have.filter(function(y){return y.c.oid===r.head;})[0],miss=[];
  (x.TARGETS||[]).forEach(function(t3){var k3=t3[0];if(x.targetHere&&x.targetHere(k3)&&!(headIt&&headIt.made.some(function(m){return m.kind===k3;})))miss.push(k3);});
  if(miss.length&&x.makeOne)f.appendChild(key("pri","Make the missing ones",function(e,b){b.disabled=true;var q=Promise.resolve(),done=0,bad=[];
    miss.forEach(function(k4){q=q.then(function(){return Promise.resolve(x.makeOne(r,k4,{quiet:true})).then(function(){done++;},function(er){bad.push(k4+": "+(er&&er.message||er));});});});
    q.then(function(){delete C.log[ck];x.paintWork();toast(done+" made"+(bad.length?"; not made: "+bad.join("; "):"")+". Each is kept here, under its device.");});}));
  else f.appendChild(key(ht?"":"quiet","Make its packages",function(){x.S.panel="ship";if(x.one&&x.one())x.setPanel("ship");try{if(W.fbRooms)W.fbRooms.part("ship");}catch(er){}var e2=$("fbTargets");if(e2)e2.scrollIntoView({block:"nearest",behavior:"smooth"});}));}
/* ---------- Install on this Mac, Install on this PC ---------- */
function installSheet(r,m,kind){var x=X(),P=x.pkgOf?x.pkgOf(r):{title:r.name,id:""},title=P.title||r.name,setup=kind==="win"&&/\.exe$/i.test(m.name||"");
  /* 7.24: a Windows app made from 7.24 is its own installer ("<App> Setup.exe"), which asks how to install it itself */
  var sh=x.sheet(kind==="mac"?"Install "+title+" on this Mac":"Install "+title+" on this PC",kind==="mac"?"It goes into Applications, where Launchpad and Spotlight find it, with its own icon; a copy there already is replaced.":
    setup?"Its own installer opens: for everyone on this PC (Windows asks for an administrator first) or just for you, with a shortcut on the desktop if you like. It makes its Start menu entry and its entry in Settings, Apps, where Uninstall takes it away again. Its work stays on this PC.":
    "It is installed for you alone, with no administrator password: in your programs folder, in the Start menu and on the desktop, and in Settings, Apps, where Uninstall takes it all away again. Its work stays on this PC.");
  var where="all",pick=el("div","r298-pick");
  if(kind==="mac"){[["all","▣","Into Applications","Every account on this Mac can open it; if macOS asks, the one for your own account is used"],["mine","⌂","Into my own Applications folder","Only you; nothing is asked"]].forEach(function(it){var b=el("button","f-opt");b.type="button";
      b.innerHTML='<span class="ic">'+it[1]+"</span><span><b>"+esc(it[2])+"</b><small>"+esc(it[3])+"</small></span>";b.setAttribute("aria-pressed",it[0]===where?"true":"false");
      b.addEventListener("click",function(){where=it[0];[].forEach.call(pick.children,function(c){c.setAttribute("aria-pressed",c===b?"true":"false");});});pick.appendChild(b);});sh.box.appendChild(pick);
    sh.box.appendChild(el("p","f-hint","Made here, on this Mac, it opens as it is. A copy carried in from another computer is asked about once by macOS: Control-click it, then Open."));}
  else sh.box.appendChild(el("p","f-hint","The program is not signed with a certificate, so the first time Windows may ask: choose More info, then Run anyway."));
  var end=el("div","end"),k=key("pri",setup?"Open its installer":"Install and open it",function(){k.disabled=true;var tok=null;
    W.fbMade.bytes(m.key).then(function(u){if(!u)throw new Error("it is no longer kept here: make it again");return call("runs_install_begin",[m.name,u.length]).then(function(b){tok=b.token;var CH=2*1024*1024,q=Promise.resolve();
        for(var i=0;i<u.length;i+=CH)(function(i){q=q.then(function(){return call("runs_install_put",[tok,b64(u.subarray(i,i+CH))]);});})(i);return q;});})
    .then(function(){return call("runs_install_go",[tok,{title:title,id:P.id||"",version:P.version||"",where:where,publisher:""}]);})
    .then(function(res){sh.close();toast(res&&res.setup?title+"'s installer is open: choose how to install it there.":title+" is installed in "+(res.where||"its place")+", and open.");},function(e){k.disabled=false;fail(e);});});
  end.appendChild(k);sh.box.appendChild(end);}
/* ---------- Needs you, at the top of Your apps ---------- */
function needs(force){var x=X();if(!x||!x.C)return;if(!force&&ST.needs&&Date.now()-ST.needsAt<15000){drawNeeds();return;}ST.needsAt=Date.now();
  var reps=(x.C.repos||[]).slice(0,24),out=[],hub=H();
  var q=list(false).then(function(rs){var sn=seen();
    rs.forEach(function(run){var rp=reps.filter(function(y){return y.id===run.repo;})[0];if(!rp)return;
      if(run.state==="running"||run.state==="ready")out.push({k:"run",o:0,t:rp.name+": "+(run.workflow||"a workflow")+" is running",s:(run.n?"#"+run.n+" · ":"")+"on this computer · "+ago((run.started||run.at)*1000),go:function(){openRun(rp,run.id);}});
      else if(run.state==="bad"&&!sn[run.id]){var fj=(run.jobs||[]).filter(function(j){return j.state==="bad";})[0];out.push({k:"bad",o:1,t:rp.name+": "+(run.workflow||"a workflow")+" failed",s:(run.n?"#"+run.n+" · ":"")+(fj?fj.name+", ":"")+"on this computer",go:function(){openRun(rp,run.id);}});}});});
  q=q.then(function(){if(!hub||!hub.record)return;return Promise.all(reps.map(function(rp){return hub.record(rp.id).then(function(rec){if(!rec)return;var now=Date.now(),week=7*864e5;
      (rec.milestones||[]).forEach(function(ms){if(ms.state==="closed"||!ms.due||ms.due-now>week)return;var open=(rec.issues||[]).filter(function(is){return is.milestone===ms.title&&is.state!=="closed";}).length;if(!open)return;
        out.push({k:"due",o:2,t:rp.name+": "+ms.title+(ms.due<now?" was due "+day(ms.due):" is due "+day(ms.due)),s:open+" issue"+(open===1?"":"s")+" of it still open",go:function(){openView(rp,"issues");}});});
      var pr=(rec.pulls||[]).filter(function(p){return p.state==="open";});if(pr.length)out.push({k:"",o:3,t:rp.name+": "+(pr.length===1?"a pull request waits for you":pr.length+" pull requests wait for you"),s:pr[0].title||"",go:function(){openView(rp,"pulls");}});},function(){});}));});
  q=q.then(function(){reps.forEach(function(rp){try{if(x.stepOf&&x.stepOf(rp)==="ship")out.push({k:"ok",o:4,t:rp.name+": ready to ship",s:"Tested; its packages are not made yet",go:function(){openShip(rp);}});}catch(e){}});});
  q.then(function(){out.sort(function(a,b){return a.o-b.o;});ST.needs=out;drawNeeds();},function(){});}
function day(t){var d=new Date(t),M=["January","February","March","April","May","June","July","August","September","October","November","December"];return d.getDate()+" "+M[d.getMonth()];}
var NEEDOPEN=false;
function drawNeeds(){var list0=$("fbRepos");if(!list0)return;var box=list0.parentNode.querySelector(".r298-needs"),items=ST.needs||[];
  if(!items.length){if(box)box.remove();return;}
  if(!box){box=el("div","r298-needs");box.setAttribute("role","region");box.setAttribute("aria-label","Needs you");list0.parentNode.insertBefore(box,list0);}
  box.innerHTML='<div class="t">Needs you <span class="f-chip">'+items.length+"</span></div>";
  items.forEach(function(n,i){var b=el("button","r298-need",'<span class="d '+n.k+(n.k==="run"?" run":"")+'"></span><span><b>'+esc(n.t)+"</b><small>"+esc(n.s)+"</small></span>");b.type="button";b.title=n.t+(n.s?": "+n.s:"");
    b.addEventListener("click",function(){n.go();});if(i>2&&!NEEDOPEN)b.classList.add("r298-hide");box.appendChild(b);});
  if(items.length>3){var more=el("button","r298-more",NEEDOPEN?"Fewer":(items.length-3)+" more");more.type="button";more.addEventListener("click",function(){NEEDOPEN=!NEEDOPEN;drawNeeds();});box.appendChild(more);}}
function choose(rp){var x=X();x.FBS().sel=rp.id;x.saveSoon&&x.saveSoon();if(x.openWork)x.openWork(rp.id);}
function openRun(rp,rid){var x=X();choose(rp);ST.open=rid;ST.job=null;nav("runs");if(x.one&&x.one())x.setPanel("work");}
function openView(rp,v){var x=X();choose(rp);nav(v);if(x.one&&x.one())x.setPanel("work");}
function openShip(rp){var x=X();choose(rp);x.S.panel="ship";if(x.one&&x.one())x.setPanel("ship");try{if(W.fbRooms)W.fbRooms.part("ship");}catch(e){}}
/* ---------- Learn, in every room ---------- */
var LEARN={
  "now-changes":["Changes","What you changed since the version you kept last, file by file, before you keep it.","Your uncommitted changes (in your working copy)","git status · git diff","You read your own changes before they become part of the app's history, and put back any you do not want."],
  "now-files":["Files","Every file of the app, folder by folder, at the version shown.","The Code tab: the repository's files","git ls-files","An app is a set of files; here you see them all, as they were at any version."],
  "now-code":["Code","A file's text with its line numbers, who last changed each line and when, and a search.","Code, and Blame","git blame <file>","When a line misbehaves, you see the version that wrote it, and why."],
  "story-history":["History","Every version you kept, newest first, each with what it changed and why.","Commits","git log","Nothing kept is ever lost: any version can be read, compared or opened as the app was then."],
  "story-compare":["Compare","Any two versions side by side: what was added and what was taken out.","Compare","git diff <one> <other>","Before a release, you see exactly what changed since the last one."],
  "story-releases":["Releases","A version named for others, with everything made from it: an app for each device, and the kits to build them.","Releases, and their assets","git tag -a v1.0","A release is what you hand over: one version, ready for every device."],
  "plans-ideas":["Ideas","Work tried on the side, apart from the main line, so the main line stays sound.","Branches","git switch -c <idea>","You can try anything without risk; an idea joins the main line only when it is ready."],
  "plans-issues":["Issues","Things to fix or to add, each with its conversation, people, labels, milestone and date.","Issues","(GitHub's own; git has none)","Every task is written down where the work is, and closed by the version that does it."],
  "plans-pulls":["Pull requests","An idea asking to join the main line: its versions, its changes and its review.","Pull requests","git merge <idea>","A second look before anything reaches the main line: by you, or by your own model."],
  "plans-projects":["Projects","A board of the work: to do, in progress, done.","Projects","(GitHub's own)","You see the whole of the work at once, and what comes next."],
  "plans-wiki":["Wiki","The app's notes and guides, each page with its own history.","Wiki","(a repository of pages)","What you learn while building stays with the app."],
  "care-actions":["Checks","Fabrica's checks on every version, and Safety: no secret left in the code, the parts used and their licences.","Checks, code scanning and secret scanning","(Fabrica's own, on each version)","A fault is found when it is made, not when the app is in someone's hands."],
  "care-insights":["Overview","The app's activity: versions kept, ideas, issues and releases over time.","Insights","git shortlog","You see how the work is going, across weeks."],
  "care-settings":["Settings","The app's description, its labels, and the rules before the main line.","Settings, and branch protection rules","(GitHub's own)","Rules keep the main line sound: a review, or every check passed, before anything joins it."],
  "runs-runs":["Runs","Each time a workflow ran: on which machine, every job and step, its whole log, and the files it made.","Actions: workflow runs","(GitHub Actions runs the files in .github/workflows)","Building and testing happen the same way each time, by themselves, and nothing of it is forgotten."],
  "runs-workflows":["Workflows","Recipes of steps a machine follows when something happens: a new version, a release tag, a time of day, or your press.","Actions: workflows","on: · jobs: · runs-on: · steps:","The same file runs here, on this computer, and on GitHub's machines, as written."],
  "runs-machines":["Machines","The computers that run your workflows, and the tools each one has.","Runners: self-hosted, and GitHub-hosted","(each computer with Ingenium open is one)","Your own computers build and test for you, with every log kept, and no minutes counted."]};
function lkey(){var x=X(),room=W.fbRooms&&W.fbRooms.room?W.fbRooms.room():"now",v=x&&x.S?x.S.view:"changes";return room+"-"+v;}
function dressLearn(){var says=$("fbRoomSays");if(!says)return;var k=lkey(),lk=LEARN[k];
  var old=says.querySelector(".r298-learnk");if(old&&old.getAttribute("data-k")!==k){old.remove();old=null;}
  var card=says.parentNode&&says.parentNode.querySelector(".r298-lcard");if(card&&card.getAttribute("data-k")!==k){card.remove();card=null;}
  if(k.indexOf("runs-")===0&&W.fbRooms&&W.fbRooms.room()==="runs"&&says.firstChild&&says.firstChild.nodeType===3&&says.firstChild.nodeValue!==lk[1]&&LEARN[k])says.firstChild.nodeValue=ROOM.says;
  if(!lk)return;
  if(!old){var b=el("button","r298-learnk",ICON.book+"Learn");b.type="button";b.setAttribute("data-k",k);b.setAttribute("aria-expanded",ST.lopen[k]?"true":"false");b.title="What this is, and its names on GitHub and in git";
    b.addEventListener("click",function(e){e.stopPropagation();ST.lopen[k]=!ST.lopen[k];var c=says.parentNode.querySelector(".r298-lcard");if(c)c.remove();b.setAttribute("aria-expanded",ST.lopen[k]?"true":"false");dressLearn();});says.appendChild(b);}
  if(ST.lopen[k]&&!card){var c=el("div","r298-lcard");c.setAttribute("data-k",k);c.innerHTML="<h4>"+esc(lk[0])+"</h4><p>"+esc(lk[1])+"</p><dl><dt>On GitHub</dt><dd>"+esc(lk[2])+"</dd><dt>In git</dt><dd><code>"+esc(lk[3])+"</code></dd><dt>Why it matters</dt><dd>"+esc(lk[4])+"</dd></dl>";
    var row=el("div","f-row");row.appendChild(key("sm","Show me",showMe));row.appendChild(key("quiet sm","Every word, side by side",glossary));
    var lm=key("quiet sm",LMODE?"Learning mode: on":"Learning mode",function(){setLM(!LMODE);lm.textContent=LMODE?"Learning mode: on":"Learning mode";lm.setAttribute("aria-pressed",LMODE?"true":"false");},"Point at any key in Fabrica: its names on GitHub and in git show beside it");lm.setAttribute("aria-pressed",LMODE?"true":"false");row.appendChild(lm);
    c.appendChild(row);says.parentNode.insertBefore(c,says.nextSibling);}}
function showMe(){var k=D.querySelector("#fbWorkFoot .f-btn.pri")||D.querySelector("#fbWorkFoot .f-btn")||D.querySelector("#fbWorkBody .f-btn.pri")||D.querySelector("#fbWorkBody button");
  if(!k){toast("This room's work is in the list below it.");return;}k.classList.remove("r298-show");void k.offsetWidth;k.classList.add("r298-show");k.scrollIntoView({block:"nearest"});toast("This is the room's main key: "+k.textContent.trim()+".");}
var GLOSS=[["A version","A commit","git commit: a snapshot of every file, kept with its message"],["Keep this version","Commit","git commit -m \"…\""],["An idea","A branch","git switch -c <idea>: a line of work apart from main"],["The main idea","main (the default branch)","the line every release comes from"],
  ["Bring it in","Merge a pull request","git merge <idea>"],["A release","A release (a tag)","git tag -a v1.0: a version named for others"],["A package","A release asset","a file made from the version: an app, a kit"],["A run","A workflow run","one time a workflow ran, with its log"],
  ["A workflow","A workflow (GitHub Actions)",".github/workflows/<name>.yml: steps a machine follows"],["A job","A job","a part of a workflow that runs on one machine"],["A machine","A runner","the computer a workflow runs on: yours, or GitHub's"],["What a run made","Artifacts","the files a run made, kept with it"],
  ["Put back","Restore, revert","git restore, git revert"],["A copy to work apart","A fork","a whole copy, with its history"],["The rules before main","Branch protection rules","what must pass before anything joins main"],["Safety","Secret scanning, licences","read in every version: no key left in the code"]];
function glossary(){var x=X();var sh=x.sheet("Fabrica's words, GitHub's and git's","Fabrica's words are plain on purpose; this is what each is called on GitHub and in git, so you can read either.");
  var g=el("div","r298-gloss");g.innerHTML='<div class="h">Fabrica</div><div class="h">GitHub</div><div class="h">git, and what it means</div>';
  GLOSS.forEach(function(r0){g.appendChild(el("b",null,esc(r0[0])));g.appendChild(el("span",null,esc(r0[1])));g.appendChild(el("code",null,esc(r0[2])));});sh.box.appendChild(g);}
/* Learning mode: point at a key in Fabrica, and its names on GitHub and in git show beside it */
var LMODE=false,CAP=null;
var CAPS={room:{now:["Now","GitHub: the Code tab and your uncommitted changes"],story:["Story","GitHub: Commits, Compare and Releases"],plans:["Plans","GitHub: Branches, Issues, Pull requests, Projects and the Wiki"],runs:["Runs","GitHub: Actions"],care:["Care","GitHub: Checks, Insights and Settings"]},
  part:{test:["Test","GitHub: status checks · Fabrica's own, on this device"],ship:["Ship","GitHub: a release's assets · an app for each device"],copies:["Copies","git: clone, bundle · GitHub: download, fork"],ingenium:["Ingenium","GitHub: Copilot · here your own model, offline"]},
  text:{"Keep this version":"git commit","Put back":"git restore","Run it now":"GitHub: Run workflow (workflow_dispatch)","Re-run the failed jobs":"GitHub: Re-run failed jobs","Run it again":"GitHub: Re-run all jobs",
    "Explain this error":"your own model reads the log","Install on this Mac":"copies the app into Applications","Install on this PC":"opens its installer: for everyone on this PC or just for you","Make the missing ones":"a release's assets, made here",
    "Mark the version kept now as a release":"git tag","New workflow, from a recipe":"GitHub: New workflow","Stop":"GitHub: Cancel workflow","Remove this run":"GitHub: Delete workflow run","The workflow's file":"GitHub: View workflow file","Add to its release":"GitHub: upload a release asset"}};
function setLM(on){LMODE=!!on;var x=X();if(x&&x.FBS){x.FBS().learning=LMODE;x.saveSoon&&x.saveSoon();}if(!LMODE&&CAP)CAP.classList.remove("on");if(LMODE)toast("Learning mode: point at any key in Fabrica to see its names on GitHub and in git.");}
function capFor(b){if(b.classList.contains("fr-room"))return CAPS.room[b.getAttribute("data-room")];if(b.classList.contains("fr-part"))return CAPS.part[b.getAttribute("data-part")];
  if(b.hasAttribute("data-v")&&b.closest("#fbViews")){var room=W.fbRooms&&W.fbRooms.room?W.fbRooms.room():"";var lk=LEARN[room+"-"+b.getAttribute("data-v")];if(lk)return [lk[0],"GitHub: "+lk[2]];}
  var t=(b.textContent||"").replace(/\s*\d+$/,"").trim();return CAPS.text[t]?[t,CAPS.text[t]]:null;}
function capOn(e){if(!LMODE)return;var fb=$("fb");if(!fb||!fb.contains(e.target))return;var b=e.target.closest&&e.target.closest("button,[role=tab]");if(!b){if(CAP)CAP.classList.remove("on");return;}var c=capFor(b);
  if(!c){if(CAP)CAP.classList.remove("on");return;}if(!CAP){CAP=el("div","r298-cap");CAP.setAttribute("role","tooltip");D.body.appendChild(CAP);}
  var r=b.getBoundingClientRect();CAP.innerHTML=esc(c[0])+"<span>"+esc(c[1])+"</span>";CAP.style.left=Math.max(8,Math.min(W.innerWidth-330,Math.round(r.left)))+"px";CAP.style.top=Math.round(Math.min(W.innerHeight-60,r.bottom+6))+"px";CAP.classList.add("on");}
D.addEventListener("pointerover",capOn,true);D.addEventListener("focusin",capOn,true);
D.addEventListener("pointerout",function(e){if(CAP&&(!e.relatedTarget||!$("fb")||!$("fb").contains(e.relatedTarget)))CAP.classList.remove("on");},true);
/* ---------- Ship: where each package is made ---------- */
function dressShip(){var sec=$("fbPartSec_ship")||(function(){var tg=$("fbTargets");return tg&&tg.closest(".f-sec");})();if(!sec||sec.querySelector(".r298-where"))return;var tg=$("fbTargets");if(!tg)return;
  var p=el("p","f-hint r298-where","Made here, in seconds, with nothing to install: Ingenium carries the part of each app that needs a compiler. Each is kept under Releases, on its device's row"+(A()?"; the Mac and Windows apps install from there, on this computer":"")+". A workflow of the app's own runs under Runs, with every step and log kept.");
  tg.parentNode.insertBefore(p,tg);
  if(A()&&ST.here==="Windows"){var wc=tg.querySelector('.f-tg[data-k="win"] small');if(wc)wc.textContent="Its own installer, one file; under Releases, Install on this PC opens it, for everyone on this PC or just for you.";}}
/* ---------- moving between the views ----------
   nav(v): the room of the view chosen (its tabs shown), then the view; a run opened stays open (the rooms may press the room's last tab
   on the way, and the Runs tab pressed by hand shows the list, as GitHub's Actions tab does) */
var ROOMOF={runs:"runs",workflows:"runs",machines:"runs",changes:"now",files:"now",code:"now",history:"story",compare:"story",releases:"story",ideas:"plans",issues:"plans",pulls:"plans",projects:"plans",wiki:"plans",actions:"care",insights:"care",settings:"care"};
function nav(v){var x=X();if(!x)return;var keep=ST.open;try{if(W.fbRooms&&ROOMOF[v])W.fbRooms.choose(ROOMOF[v]);}catch(e){}ST.open=v==="runs"?keep:null;x.S.view=v;var w=$("fbWorkBody");if(w)w.scrollTop=0;x.paintWork();try{x.thumbs();}catch(e){}counts();}
function go(v){if(v!=="runs")ST.open=null;nav(v);}
function repaint(){var x=X();if(!x)return;var r=x.cur();if(!r)return;if(["runs","workflows","machines","releases"].indexOf(x.S.view)<0)return;var w=$("fbWorkBody"),keep=w?w.scrollTop:0;x.paintWork();if(w)w.scrollTop=keep;counts();}
/* ---------- joined to Fabrica ---------- */
function hook(){var hub=H();if(!hub||!hub.views)return false;
  hub.views.runs=function(r,w,f){paintRuns(r,w,f);dressLearn();};hub.views.workflows=function(r,w,f){paintWorkflows(r,w,f);dressLearn();};hub.views.machines=function(r,w,f){paintMachines(r,w,f);dressLearn();};
  hub.views.releases=function(r,w,f){paintReleases(r,w,f);dressLearn();};
  return true;}
function afterPaint(){addRoom();addTabs();counts();dressLearn();dressShip();needs(false);var x=X();if(x&&x.FBS&&x.FBS().learning&&!LMODE)LMODE=true;}
function boot(){if(!hook()){setTimeout(boot,300);return;}addRoom();(W.fbAfterPaint=W.fbAfterPaint||[]).push(afterPaint);
  /* the rooms' line is written again when a room is chosen: the Learn key is put back at its end */
  try{new MutationObserver(function(){var s=$("fbRoomSays");if(s&&!s.__r298){s.__r298=1;new MutationObserver(function(){if(!s.querySelector(".r298-learnk"))dressLearn();}).observe(s,{childList:true,characterData:true,subtree:true});}
      if($("fbViews")&&!$("fbViews").querySelector('button[data-v="runs"]'))addTabs();}).observe(D.body,{childList:true,subtree:true});}catch(e){}
  if(A()){tools(false).catch(function(){});list(true).then(function(){watch();counts();});}}
if(D.readyState==="loading")D.addEventListener("DOMContentLoaded",boot);else boot();
W.addEventListener("pywebviewready",function(){tools(false).catch(function(){});list(true).then(function(){watch();counts();needs(true);});});
W.IngRuns={core:CORE,state:function(){return {open:ST.open,job:ST.job,here:ST.here,runs:ST.runs.length,needs:(ST.needs||[]).map(function(n){return n.t;}),lmode:LMODE};},list:list,tools:tools,start:start,recipeText:recipeText,needs:needs};
try{window.__ingParts["p298"]="running";}catch(_){}
})();
</script>
