<style id="r263-css">
/* ============ R263 · FOLDERS, A DRAWER OF HER APPS (Ingenium 6.69, 10 November 2026) ============
   Her words (10 November 2026): "The Folders page needs its own design and not just be a replica of the Blend page and Home page."
   "Also, I want the apps icon logos on their folders please." On the live preview: "I like this new look, please fix the stretched
   icons and push it everywhere. I really like this new design." And: "I want the apps seals to switch to their dark mode look when
   the app is on Dark mode instead of keeping their light mode look."
   So Folders is a filing system of its own, in Ingenium's colours, type and depth, with no orbit and no sky:
   - a drawer pulled open toward her: a folder for each app stands in it with its tab, its papers and its app's own seal (r140's
     IngSeal, by day or by night as the Display is, and changing with it); a new app has a coin with its first letter; pointing at
     a folder lifts it out of the drawer and names it, pressing it opens it; the front folder is the one used last;
   - every folder an index card, ruled and punched, with its seal; the build library a bound volume on its shelf; the ways of
     bringing work in, envelopes in a tray, each sealed with its own mark; How I work, a ruled sheet with Ingenium's seal pressed
     faintly in its corner;
   - a folder opened is a spread: the inside of its cover on the left (its seal, its name, where she left off, how she works on it),
     its papers on the right (how it was built, the decisions, its conversations, its repository, the words that mark it);
   - every card, envelope, row and note leans toward the pointer, lifts under it and sinks when pressed (r176 sounds them); every
     Folders control works as before; left alone, nothing is rewritten; below 760 pixels Folders is as it was. */
#page-folders.fd-on{--fd-gold:#b88a3a;--fd-hair:rgba(34,26,46,.10);--fd-hair2:rgba(34,26,46,.06);--fd-paper:#fffdfa;--fd-paper2:#f6f1fb;
  --fd-rule:rgba(106,63,181,.13);--fd-margin:rgba(106,63,181,.28);--fd-cover0:#f3ecfc;--fd-cover1:#e2d5f5;--fd-edge:rgba(106,63,181,.28);
  --fd-in0:#e6dcf3;--fd-in1:#d4c6ea;--fd-desk:radial-gradient(ellipse 80% 90% at 70% 40%,#fdfbff 0%,#f3eefa 55%,#e9e1f5 100%);--fd-ring:rgba(106,63,181,.10);
  --fd-keyA:#ffffff;--fd-keyB:#f6f2fb;--fd-sunk:rgba(34,26,46,.035);--fd-line:rgba(106,63,181,.30);--fd-hole:#e9e1f5;
  --fd-coin0:#c9b6ee;--fd-coin1:#9068d6;--fd-coin2:#6a3fb5;--fd-coin3:#3d2275;
  --fd-serif:"Home Cormorant","Cormorant Garamond",Cormorant,var(--serif,Georgia),serif}
body[data-theme="night"] #page-folders.fd-on{--fd-gold:#d8b46a;--fd-hair:rgba(205,184,240,.12);--fd-hair2:rgba(205,184,240,.07);--fd-paper:#2a2238;--fd-paper2:#231c31;
  --fd-rule:rgba(205,184,240,.12);--fd-margin:rgba(205,184,240,.26);--fd-cover0:#3a2f52;--fd-cover1:#2a2140;--fd-edge:rgba(205,184,240,.22);
  --fd-in0:#1d1529;--fd-in1:#120d1c;--fd-desk:radial-gradient(ellipse 80% 90% at 70% 40%,#251b38 0%,#171025 55%,#0e0a16 100%);--fd-ring:rgba(205,184,240,.10);
  --fd-keyA:#2a2239;--fd-keyB:#231c31;--fd-sunk:rgba(10,6,18,.32);--fd-line:rgba(196,176,238,.30);--fd-hole:#120d1b;
  --fd-coin0:#8f78c8;--fd-coin1:#5f3fa6;--fd-coin2:#3e2477;--fd-coin3:#1c0f3d}

/* ---------- the head: the words on the left, the drawer on the right ---------- */
#page-folders.fd-on .fd-head{position:relative;display:grid;grid-template-columns:minmax(0,1fr) 560px;gap:24px;max-width:1180px;min-height:480px;margin:0 auto 24px;
  padding:34px 38px 26px 40px;box-sizing:border-box;border-radius:30px;overflow:hidden;isolation:isolate;background:var(--fd-desk);
  box-shadow:inset 0 0 0 1px var(--fd-ring),0 1px 1px rgba(40,22,68,.04),0 4px 6px rgba(40,22,68,.04),0 14px 28px rgba(40,22,68,.07),0 34px 60px rgba(40,22,68,.08)}
body[data-theme="night"] #page-folders.fd-on .fd-head{box-shadow:inset 0 0 0 1px var(--fd-ring),0 14px 28px rgba(0,0,0,.45),0 34px 60px rgba(0,0,0,.4)}
#page-folders.fd-on .fd-head::before{content:"";position:absolute;inset:0;z-index:-1;pointer-events:none;opacity:.5;
  background:repeating-linear-gradient(0deg,rgba(106,63,181,.025) 0 1px,transparent 1px 4px),repeating-linear-gradient(90deg,rgba(106,63,181,.02) 0 1px,transparent 1px 5px)}
#page-folders.fd-on.fd-stack .fd-head{grid-template-columns:minmax(0,1fr);padding:30px 28px 26px}
#page-folders.fd-on .fd-words{display:flex;flex-direction:column;min-width:0}
#page-folders.fd-on .fd-eyebrow{display:flex;gap:14px;font:600 11.5px/1 var(--sans,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif);letter-spacing:.28em;text-transform:uppercase;color:var(--fd-gold)}
#page-folders.fd-on .fd-eyebrow b{color:var(--accent);font-weight:600}
#page-folders.fd-on .fd-words > .page-title{margin:12px 0 10px;padding:0;font:600 48px/1.04 var(--fd-serif);letter-spacing:.004em;color:var(--ink-1)}
#page-folders.fd-on .fd-words > .lede{margin:0 0 18px;max-width:460px;font-size:14px;line-height:1.55;color:var(--ink-2)}
#page-folders.fd-on .fd-keys{display:flex;gap:10px;flex-wrap:wrap}
#page-folders.fd-on .fd-holds{max-width:460px;margin-top:28px;padding:12px 16px 8px;border-radius:6px;background:var(--fd-paper);box-sizing:border-box;
  box-shadow:inset 0 0 0 1px var(--fd-hair),0 1px 2px rgba(40,22,68,.10),0 6px 14px rgba(40,22,68,.07)}
#page-folders.fd-on .fd-holds > span{display:block;margin:0 0 6px;font:700 10.5px/1 var(--sans,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif);letter-spacing:.22em;text-transform:uppercase;color:var(--ink-3)}
#page-folders.fd-on .fd-holds ol{margin:0;padding:0;list-style:none;columns:2;column-gap:22px}
#page-folders.fd-on .fd-holds li{display:flex;gap:8px;align-items:baseline;break-inside:avoid;padding:4px 0 5px;border-bottom:1px solid var(--fd-rule);font-size:12.5px;color:var(--ink-2)}
#page-folders.fd-on .fd-holds li i{min-width:12px;font:600 16px/1 var(--fd-serif);font-style:normal;color:var(--accent)}
#page-folders.fd-on .fd-hint{margin:auto 0 0;padding-top:18px;max-width:460px;font:italic 500 16px/1.4 var(--fd-serif);color:var(--ink-3)}
#page-folders.fd-on .fd-hint b{font-style:normal;font-weight:600;color:var(--ink-1)}
#page-folders.fd-on.fd-stack .fd-hint{margin-top:16px}

/* ---------- the drawer, pulled open: its folders stand in a row, each with its tab, its papers and its app's seal ---------- */
#page-folders.fd-on .fd-drawer{position:relative;width:560px;max-width:100%;height:410px;align-self:center;justify-self:end}
#page-folders.fd-on.fd-stack .fd-drawer{justify-self:center;margin-top:8px}
#page-folders.fd-on .fd-box{position:absolute;left:0;right:0;top:56px;bottom:62px;border-radius:18px 18px 8px 8px;background:linear-gradient(180deg,var(--fd-in1),var(--fd-in0));
  box-shadow:inset 0 12px 24px rgba(30,12,60,.28),inset 0 0 0 1px var(--fd-edge)}
body[data-theme="night"] #page-folders.fd-on .fd-box{box-shadow:inset 0 14px 28px rgba(0,0,0,.6),inset 0 0 0 1px var(--fd-edge)}
#page-folders.fd-on .fd-files{position:absolute;inset:0}
#page-folders.fd-on .fd-file{position:absolute;left:var(--l);width:var(--w);top:var(--t);height:236px;margin:0;padding:0;border:0;border-radius:0;background:none;color:inherit;font:inherit;
  text-align:left;cursor:pointer;pointer-events:none;-webkit-appearance:none;appearance:none;box-shadow:none;min-height:0;z-index:calc(10 + var(--i));transform-origin:50% 100%;
  transform:translateY(var(--rise,0px)) scale(calc(var(--sc) + var(--grow,0)));
  transition:transform .45s cubic-bezier(.34,1.35,.64,1),filter .35s ease,opacity .35s ease,z-index 0s linear .32s;-webkit-tap-highlight-color:transparent}
#page-folders.fd-on .fd-file:focus{outline:none}
#page-folders.fd-on .fd-file:focus-visible .fd-tab{box-shadow:0 0 0 2.5px var(--accent)}
#page-folders.fd-on .fd-back,#page-folders.fd-on .fd-tab,#page-folders.fd-on .fd-front{pointer-events:auto}
#page-folders.fd-on .fd-back{position:absolute;left:0;right:0;top:26px;bottom:0;border-radius:10px 10px 6px 6px;background:linear-gradient(180deg,var(--fd-cover0),var(--fd-cover1));
  box-shadow:inset 0 0 0 1px var(--fd-edge),0 -2px 6px rgba(40,22,68,.10)}
#page-folders.fd-on .fd-tab{position:absolute;z-index:2;left:var(--tx);top:0;height:34px;max-width:calc(94% - var(--tx));box-sizing:border-box;display:flex;align-items:center;gap:7px;padding:0 14px 0 5px;
  border-radius:10px 10px 0 0;background:var(--fd-cover0);box-shadow:inset 0 1px 0 rgba(255,255,255,.5),inset 0 0 0 1px var(--fd-edge);
  font:600 15px/1 var(--fd-serif);letter-spacing:.03em;color:var(--ink-1);white-space:nowrap}
body[data-theme="night"] #page-folders.fd-on .fd-tab{box-shadow:inset 0 1px 0 rgba(255,255,255,.07),inset 0 0 0 1px var(--fd-edge)}
#page-folders.fd-on .fd-tab .fd-tn{overflow:hidden;text-overflow:ellipsis}
#page-folders.fd-on .fd-paper{position:absolute;z-index:1;left:14px;right:14px;top:36px;height:120px;border-radius:4px;background:linear-gradient(var(--fd-paper),var(--fd-paper2));
  box-shadow:0 1px 2px rgba(40,22,68,.14);transition:transform .45s cubic-bezier(.34,1.35,.64,1)}
#page-folders.fd-on .fd-paper::before{content:"";position:absolute;left:14px;right:40px;top:16px;height:40px;background:repeating-linear-gradient(180deg,var(--fd-rule) 0 1px,transparent 1px 9px)}
#page-folders.fd-on .fd-paper.fd-p2{left:22px;right:8px;top:42px;transform:rotate(.6deg)}
#page-folders.fd-on .fd-front{position:absolute;z-index:3;left:0;right:0;top:58px;bottom:0;display:flex;align-items:flex-start;gap:14px;padding:16px 18px 0;border-radius:6px;
  background:linear-gradient(180deg,var(--fd-cover0) 0%,var(--fd-cover1) 100%);box-shadow:inset 0 1px 0 rgba(255,255,255,.55),inset 0 0 0 1px var(--fd-edge),0 -3px 8px rgba(40,22,68,.12)}
body[data-theme="night"] #page-folders.fd-on .fd-front{box-shadow:inset 0 1px 0 rgba(255,255,255,.06),inset 0 0 0 1px var(--fd-edge),0 -3px 10px rgba(0,0,0,.4)}
#page-folders.fd-on .fd-ft{min-width:0}
#page-folders.fd-on .fd-ft b{display:block;font:600 24px/1.1 var(--fd-serif);letter-spacing:.02em;color:var(--ink-1);overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
#page-folders.fd-on .fd-ft small{display:block;margin-top:4px;color:var(--ink-3);font-size:12.5px;line-height:1.45}
#page-folders.fd-on .fd-ft .fd-parts{display:block;margin-top:5px;color:var(--accent);font-size:11.5px;font-weight:600}
#page-folders.fd-on .fd-file.fd-up{--rise:-64px;--grow:.04;z-index:60;transition:transform .45s cubic-bezier(.34,1.35,.64,1),filter .35s ease,opacity .35s ease,z-index 0s}
#page-folders.fd-on .fd-file.fd-up .fd-paper{transform:translateY(-14px) rotate(-1.4deg)}
#page-folders.fd-on .fd-file.fd-up .fd-paper.fd-p2{transform:translateY(-22px) rotate(1.8deg)}
#page-folders.fd-on .fd-file.fd-dn{--rise:-54px;--grow:.02;transition-duration:.1s}
#page-folders.fd-on .fd-drawer.fd-hold .fd-file:not(.fd-up){opacity:.75;filter:saturate(.85)}
#page-folders.fd-on .fd-dfront{position:absolute;left:-14px;right:-14px;bottom:0;height:110px;z-index:70;display:flex;align-items:center;justify-content:center;gap:26px;border-radius:14px 14px 22px 22px;
  background:linear-gradient(180deg,var(--fd-keyA),var(--fd-keyB));
  box-shadow:inset 0 1px 0 rgba(255,255,255,.7),inset 0 -2px 0 rgba(40,22,68,.08),0 2px 0 rgba(40,22,68,.12),0 10px 22px rgba(40,22,68,.16),0 26px 40px rgba(40,22,68,.12)}
body[data-theme="night"] #page-folders.fd-on .fd-dfront{box-shadow:inset 0 1px 0 rgba(255,255,255,.06),inset 0 -2px 0 rgba(0,0,0,.4),0 2px 0 rgba(0,0,0,.6),0 10px 22px rgba(0,0,0,.45),0 26px 40px rgba(0,0,0,.4)}
#page-folders.fd-on .fd-label{min-width:190px;padding:8px 16px;border-radius:6px;background:var(--fd-paper);box-shadow:inset 0 0 0 1px var(--fd-edge),inset 0 2px 4px rgba(40,22,68,.12);text-align:center}
#page-folders.fd-on .fd-label b{display:block;font:600 17px/1.1 var(--fd-serif);letter-spacing:.06em;color:var(--ink-1)}
#page-folders.fd-on .fd-label small{display:block;margin-top:2px;color:var(--ink-3);font-size:11px}
#page-folders.fd-on .fd-handle{display:block;width:120px;height:20px;border-radius:999px;background:linear-gradient(180deg,rgba(40,22,68,.22),rgba(40,22,68,.06));box-shadow:inset 0 2px 4px rgba(40,22,68,.35),0 1px 0 rgba(255,255,255,.6)}
body[data-theme="night"] #page-folders.fd-on .fd-handle{background:linear-gradient(180deg,rgba(0,0,0,.5),rgba(0,0,0,.2));box-shadow:inset 0 2px 4px rgba(0,0,0,.6),0 1px 0 rgba(255,255,255,.06)}

/* ---------- each app's seal, and a coin for an app with no seal of its own ---------- */
#page-folders.fd-on .fd-seal{flex:0 0 auto;display:block;height:auto;max-width:none;border-radius:50%;filter:drop-shadow(0 2px 3px rgba(40,22,68,.28))}
body[data-theme="night"] #page-folders.fd-on .fd-seal{filter:drop-shadow(0 2px 4px rgba(0,0,0,.5))}
/* 6.85: a logo's picture is drawn whole, never cut to a circle (every logo's picture has clear corners; the crest is taller than wide) */
#page-folders.fd-on img.fd-seal{border-radius:0;object-fit:contain}
#page-folders.fd-on .fd-coin{flex:0 0 auto;display:grid;place-items:center;width:var(--fs);height:var(--fs);border-radius:50%;color:#fff;font:600 calc(var(--fs) * .46)/1 var(--fd-serif);
  background:radial-gradient(circle at 36% 30%,var(--fd-coin0) 0%,var(--fd-coin1) 32%,var(--fd-coin2) 64%,var(--fd-coin3) 100%);
  box-shadow:inset 0 0 0 calc(var(--fs) * .06) rgba(255,255,255,.3),0 2px 3px rgba(40,22,68,.25)}
#page-folders.fd-on .fd-coin::before{content:attr(data-l)}

/* ---------- the sections of the page sit on it, as headings and their papers ---------- */
#page-folders.fd-on #fldBody > .card{background:transparent;border:0;box-shadow:none;padding:0;border-radius:0}
#page-folders.fd-on #fldBody > .card > h2.sec{margin:0 0 6px;font:600 24px/1.15 var(--fd-serif);letter-spacing:.02em;text-transform:none;color:var(--ink-1)}
#page-folders.fd-on #fldBody{gap:28px}

/* the catalogue: an index card for every folder, ruled and punched, with its app's seal */
#page-folders.fd-on .fld-grid{grid-template-columns:repeat(auto-fill,minmax(240px,1fr));gap:16px;margin-top:10px}
#page-folders.fd-on .fld-card{position:relative;min-height:150px;padding:16px 18px 30px;border:0;border-radius:6px;background:var(--fd-paper);justify-content:flex-start;gap:0;
  box-shadow:inset 0 3px 0 var(--accent),inset 0 0 0 1px var(--fd-hair),0 1px 2px rgba(40,22,68,.12),0 8px 18px rgba(40,22,68,.10)}
body[data-theme="night"] #page-folders.fd-on .fld-card{box-shadow:inset 0 3px 0 var(--accent),inset 0 0 0 1px var(--fd-hair),0 1px 2px rgba(0,0,0,.5),0 8px 18px rgba(0,0,0,.35)}
#page-folders.fd-on .fld-card::before{content:"";position:absolute;left:18px;right:18px;top:62px;bottom:30px;pointer-events:none;background:repeating-linear-gradient(180deg,transparent 0 21px,var(--fd-rule) 21px 22px)}
#page-folders.fd-on .fld-card::after{content:"";position:absolute;left:50%;bottom:10px;width:12px;height:12px;margin-left:-6px;border-radius:50%;background:var(--fd-hole);box-shadow:inset 0 1px 2px rgba(40,22,68,.35)}
#page-folders.fd-on .fld-card .fld-name{gap:12px;font:600 20px/1.1 var(--fd-serif);letter-spacing:.02em}
#page-folders.fd-on .fld-card .fld-name > svg{display:none}
#page-folders.fd-on .fld-card .fld-meta{position:relative;margin-top:12px;color:var(--ink-2);font-size:12.5px;line-height:22px}
#page-folders.fd-on .fld-card .fld-parts{position:relative;color:var(--accent);font-size:11.5px;font-weight:600;line-height:22px}
#page-folders.fd-on .fld-card.fld-new{align-items:center;justify-content:center;background:transparent;box-shadow:inset 0 0 0 1.5px var(--fd-line);color:var(--ink-2);font-weight:600;font-size:13.5px}
#page-folders.fd-on .fld-card.fld-new::before,#page-folders.fd-on .fld-card.fld-new::after{display:none}

/* the build library, a bound volume on its shelf */
#page-folders.fd-on #fldBody > .card.fd-libcard{display:grid;grid-template-columns:170px minmax(0,1fr);column-gap:28px;align-items:start}
#page-folders.fd-on .fd-libcard > *{grid-column:2}
#page-folders.fd-on .fd-libcard > .fd-shelf{grid-column:1;grid-row:1 / span 9;align-self:center}
#page-folders.fd-on .fd-shelf{position:relative;width:170px;height:200px;perspective:900px}
#page-folders.fd-on .fd-shelf::after{content:"";position:absolute;left:-10px;right:-10px;bottom:-6px;height:12px;border-radius:4px;background:linear-gradient(var(--fd-keyA),var(--fd-keyB));
  box-shadow:0 2px 0 rgba(40,22,68,.14),0 8px 14px rgba(40,22,68,.14)}
#page-folders.fd-on .fd-book{position:absolute;left:30px;bottom:6px;width:120px;height:180px;margin:0;padding:0;border:0;background:none;cursor:pointer;box-shadow:none;min-height:0;
  transform-style:preserve-3d;transform-origin:0 100%;transform:rotateY(var(--by,-26deg));transition:transform .55s cubic-bezier(.34,1.35,.64,1);-webkit-tap-highlight-color:transparent}
#page-folders.fd-on .fd-book:hover,#page-folders.fd-on .fd-book:focus-visible{--by:-6deg}
#page-folders.fd-on .fd-book:active{--by:-10deg;transition-duration:.1s}
#page-folders.fd-on .fd-book:focus{outline:none}
#page-folders.fd-on .fd-book:focus-visible .fd-cover{box-shadow:0 0 0 2.5px var(--accent),6px 10px 18px rgba(40,22,68,.3)}
#page-folders.fd-on .fd-cover{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px;border-radius:3px 8px 8px 3px;color:#fff;text-align:center;
  background:linear-gradient(135deg,#7a50c6,#4f2c94);box-shadow:inset 6px 0 0 rgba(0,0,0,.18),inset 0 0 0 1px rgba(255,255,255,.12),6px 10px 18px rgba(40,22,68,.3)}
#page-folders.fd-on .fd-cover b{font:600 17px/1.15 var(--fd-serif);letter-spacing:.06em}
#page-folders.fd-on .fd-cover i{display:block;width:60px;height:1px;background:rgba(255,255,255,.5)}
#page-folders.fd-on .fd-cover small{font-size:9px;letter-spacing:.14em;text-transform:uppercase;opacity:.85}
#page-folders.fd-on .fd-pages{position:absolute;right:-8px;top:5px;bottom:5px;width:8px;border-radius:0 3px 3px 0;background:repeating-linear-gradient(180deg,#fffaf2 0 2px,#e9e1d4 2px 3px);
  transform:rotateY(90deg);transform-origin:0 50%}
#page-folders.fd-on .fd-spine{position:absolute;left:-26px;top:0;bottom:0;width:26px;display:flex;align-items:center;justify-content:center;border-radius:4px 0 0 4px;color:#fff;
  background:linear-gradient(90deg,#3c2275,#5d37a1);transform:rotateY(-90deg);transform-origin:100% 50%;font:600 10px/1 var(--fd-serif);letter-spacing:.2em;writing-mode:vertical-rl}

/* bring in your work: envelopes in a tray, each sealed with its own mark */
#page-folders.fd-on .fld-ways.fd-tray{grid-template-columns:repeat(3,minmax(0,1fr));gap:14px;margin-top:10px;padding:16px;border-radius:20px;background:var(--fd-sunk);
  box-shadow:inset 0 2px 6px rgba(40,22,68,.12),inset 0 0 0 1px var(--fd-hair2)}
#page-folders.fd-on.fd-mid .fld-ways.fd-tray{grid-template-columns:repeat(2,minmax(0,1fr))}
#page-folders.fd-on .fld-way.fd-env{position:relative;display:flex;flex-direction:column;gap:6px;padding:52px 16px 16px;border:0;border-radius:8px;background:var(--fd-paper);overflow:hidden;
  box-shadow:inset 0 0 0 1px var(--fd-hair),0 1px 2px rgba(40,22,68,.12),0 8px 16px rgba(40,22,68,.08)}
body[data-theme="night"] #page-folders.fd-on .fld-way.fd-env{box-shadow:inset 0 0 0 1px var(--fd-hair),0 1px 2px rgba(0,0,0,.5),0 8px 16px rgba(0,0,0,.3)}
#page-folders.fd-on .fld-way.fd-env::before{content:"";position:absolute;left:0;right:0;top:0;height:44px;background:linear-gradient(var(--fd-cover0),var(--fd-cover1));clip-path:polygon(0 0,100% 0,100% 30%,50% 100%,0 30%)}
#page-folders.fd-on .fld-way.fd-env > .fdo{--S:50px;position:absolute;left:50%;top:6px;margin-left:-25px}
#page-folders.fd-on .fld-way.fd-env > b{margin-top:14px;font:600 17px/1.2 var(--fd-serif);letter-spacing:.03em;color:var(--ink-1)}
#page-folders.fd-on .fld-way.fd-env > p{flex:1;margin:0;font-size:12px;line-height:1.5;color:var(--ink-2)}
#page-folders.fd-on .fld-way.fd-env > .fld-acts{justify-content:flex-start;margin-top:6px}

/* how I work: a ruled sheet with a margin, Ingenium's seal pressed faintly in its corner */
#page-folders.fd-on .fd-sheet{position:relative;margin-top:10px;padding:22px 26px 24px 58px;border-radius:6px;background:var(--fd-paper);
  box-shadow:inset 0 0 0 1px var(--fd-hair),0 1px 2px rgba(40,22,68,.12),0 12px 24px rgba(40,22,68,.10)}
body[data-theme="night"] #page-folders.fd-on .fd-sheet{box-shadow:inset 0 0 0 1px var(--fd-hair),0 1px 2px rgba(0,0,0,.5),0 12px 24px rgba(0,0,0,.3)}
#page-folders.fd-on .fd-sheet:focus-within{box-shadow:inset 0 0 0 1.5px var(--accent),0 1px 2px rgba(40,22,68,.12),0 12px 24px rgba(40,22,68,.10)}
#page-folders.fd-on .fd-sheet::before{content:"";position:absolute;left:40px;top:0;bottom:0;width:1px;background:var(--fd-margin)}
#page-folders.fd-on .fd-sheet > textarea.fld-ta{display:block;width:100%;min-height:130px;margin:0;padding:0 70px 0 0;border:0;border-radius:0;box-shadow:none;color:var(--ink-1);font-size:14px;line-height:26px;
  background:repeating-linear-gradient(180deg,transparent 0 25px,var(--fd-rule) 25px 26px);background-attachment:local}
#page-folders.fd-on .fd-sheet > textarea.fld-ta:focus{outline:none}
#page-folders.fd-on .fd-sheet > .fd-wm{position:absolute;right:22px;top:18px;opacity:.16;pointer-events:none}

/* conversations and notes: rows of paper, each conversation with its own small orb */
#page-folders.fd-on .fld-list{gap:8px}
#page-folders.fd-on .fld-list > li{border:0;border-radius:10px;background:var(--fd-paper2);box-shadow:inset 0 0 0 1px var(--fd-hair2)}
#page-folders.fd-on .fld-list > li.fd-conv{gap:12px;padding:9px 12px}
#page-folders.fd-on .fld-list > li.fd-conv .fld-t b{font:600 16px/1.25 var(--fd-serif);letter-spacing:.02em}
#page-folders.fd-on .fld-list > li.fd-conv > .fdo{--S:42px;margin:-5px -2px -5px -5px}

/* ---------- a folder, opened: the inside of its cover on the left, its papers on the right ---------- */
/* scrolled to, a part stops below Ingenium's top bar */
#page-folders.fd-on .fld-crumb,#page-folders.fd-on .fd-bring,#page-folders.fd-on .fd-head{scroll-margin-top:72px}
#page-folders.fd-on .fd-spread{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.15fr);border-radius:18px;overflow:hidden;
  box-shadow:0 2px 0 rgba(40,22,68,.10),0 14px 30px rgba(40,22,68,.14),0 34px 60px rgba(40,22,68,.10)}
body[data-theme="night"] #page-folders.fd-on .fd-spread{box-shadow:0 2px 0 rgba(0,0,0,.5),0 14px 30px rgba(0,0,0,.45),0 34px 60px rgba(0,0,0,.4)}
#page-folders.fd-on.fd-mid .fd-spread{grid-template-columns:minmax(0,1fr)}
#page-folders.fd-on .fd-left{position:relative;min-width:0;padding:22px 24px;background:linear-gradient(180deg,var(--fd-cover0),var(--fd-cover1));box-shadow:inset -10px 0 18px rgba(40,22,68,.10);transform-origin:100% 50%}
#page-folders.fd-on .fd-spread.fd-anim .fd-left{animation:fdOpen .7s cubic-bezier(.22,1,.36,1)}
@keyframes fdOpen{0%{transform:perspective(1600px) rotateY(-70deg);opacity:.2}100%{transform:none;opacity:1}}
#page-folders.fd-on .fd-right{position:relative;min-width:0;padding:22px 26px;background:var(--fd-paper);box-shadow:inset 10px 0 18px rgba(40,22,68,.06)}
#page-folders.fd-on .fd-spread .card{background:transparent;border:0;box-shadow:none;padding:0;margin:0 0 22px;border-radius:0}
#page-folders.fd-on .fd-spread .card:last-child{margin-bottom:0}
#page-folders.fd-on .fd-spread .card > h2.sec{margin:0 0 6px;font:600 20px/1.2 var(--fd-serif);letter-spacing:.02em;text-transform:none;color:var(--ink-1)}
#page-folders.fd-on .fd-left .fld-h{display:flex;flex-wrap:wrap;align-items:center;gap:10px;margin:0 0 18px}
#page-folders.fd-on .fd-oh{display:flex;align-items:center;gap:16px;flex:1 0 100%;min-width:0;margin-bottom:4px}
#page-folders.fd-on .fd-oh > div{min-width:0}
#page-folders.fd-on .fd-oh h2{margin:0;font:600 38px/1.05 var(--fd-serif);letter-spacing:.01em;color:var(--ink-1);overflow-wrap:anywhere}
#page-folders.fd-on .fd-oh small{display:block;margin-top:5px;color:var(--ink-3);font-size:12px;line-height:1.45}
#page-folders.fd-on .fd-left .fld-brief{background:var(--fd-paper);border:0;box-shadow:inset 0 0 0 1px var(--fd-hair)}
#page-folders.fd-on .fd-right .bl-list{gap:12px 10px;margin-top:10px}
#page-folders.fd-on .fd-right .bl-row{position:relative;display:block;padding:16px 14px 12px;border-radius:4px;background:var(--fd-paper2);
  box-shadow:inset 0 0 0 1px var(--fd-hair),0 1px 2px rgba(40,22,68,.10),0 6px 12px rgba(40,22,68,.08)}
#page-folders.fd-on .fd-right .bl-row::before{content:"";position:absolute;right:12px;top:-7px;width:44px;height:12px;border-radius:5px 5px 0 0;background:var(--fd-cover1);box-shadow:inset 0 0 0 1px var(--fd-edge)}
#page-folders.fd-on .fd-right .bl-row b{display:block;font:600 16px/1.2 var(--fd-serif);letter-spacing:.03em}
#page-folders.fd-on .fd-right .bl-row small{display:block;margin-top:3px}

/* ---------- orbs, made as Home's are: the ball, its mark above it at its own depth, its soft cast; it sways, tilts, lifts and sinks ---------- */
#page-folders.fd-on .fdo{position:relative;display:block;flex:0 0 auto;width:var(--S);height:var(--S);--rx:0deg;--ry:0deg;--cdl:0px;--cds:1;perspective:calc(var(--S) * 4);pointer-events:none;
  --c0:#c9b6ee;--c1:#9068d6;--c2:#6a3fb5;--c3:#55309a;--c4:#3d2275;--csh:#2a1260;--ct1:.2;--ct2:.4;--ce1:.1;--ce2:.26}
body[data-theme="night"] #page-folders.fd-on .fdo{--c0:var(--n0);--c1:var(--n1);--c2:var(--n2);--c3:var(--n3);--c4:var(--n4);--csh:#0b0220;--ct1:.32;--ct2:.6;--ce1:.2;--ce2:.42}
#page-folders.fd-on .fd-tilt{position:absolute;inset:0;transform-style:preserve-3d;transform:rotateX(var(--rx)) rotateY(var(--ry)) translateY(var(--cdl)) scale(var(--cds));transition:transform .35s cubic-bezier(.2,.8,.2,1)}
#page-folders.fd-on .fd-idle{position:absolute;inset:0;transform-style:preserve-3d;animation:fdSway 7s ease-in-out infinite;animation-delay:var(--od,0s)}
@keyframes fdSway{0%,100%{transform:rotateY(-18deg) rotateX(5deg)}50%{transform:rotateY(18deg) rotateX(-5deg)}}
#page-folders.fd-on .fd-cast{position:absolute;left:31%;right:31%;bottom:13%;height:8%;border-radius:50%;background:rgba(42,20,80,.16);filter:blur(calc(var(--S) * .045));
  transform:translateZ(calc(var(--S) * -.12));transition:opacity .35s ease,transform .35s ease}
body[data-theme="night"] #page-folders.fd-on .fd-cast{background:rgba(0,0,0,.4)}
#page-folders.fd-on .fd-lay{position:absolute;left:0;top:0;width:200%;height:200%;transform-origin:0 0;pointer-events:none;
  transform:translate(calc(var(--S) * .5),calc(var(--S) * .5)) translateZ(calc(var(--S) * var(--fz))) scale(var(--fk)) translate(calc(var(--S) * -.5),calc(var(--S) * -.5)) scale(.5)}
#page-folders.fd-on .fd-lay > svg{display:block;width:100%;height:100%;overflow:visible}
#page-folders.fd-on .fd-l0{--fz:0;--fk:1}
#page-folders.fd-on .fd-l3{--fz:.14;--fk:.965}
#page-folders.fd-on .fdo .fd-l0 > svg{filter:drop-shadow(calc(var(--S) * .004) calc(var(--S) * .012) calc(var(--S) * .006) rgba(42,20,80,.24)) drop-shadow(calc(var(--S) * .01) calc(var(--S) * .03) calc(var(--S) * .025) rgba(42,20,80,.12))}
body[data-theme="night"] #page-folders.fd-on .fdo .fd-l0 > svg{filter:drop-shadow(calc(var(--S) * .004) calc(var(--S) * .012) calc(var(--S) * .008) rgba(0,0,0,.5)) drop-shadow(calc(var(--S) * .01) calc(var(--S) * .03) calc(var(--S) * .03) rgba(0,0,0,.3))}
#page-folders.fd-on .fd-ico{position:absolute;left:50%;top:50%;width:calc(var(--S) * .54);height:calc(var(--S) * .54);margin:calc(var(--S) * -.27) 0 0 calc(var(--S) * -.27);color:#fff;
  filter:drop-shadow(calc(var(--S) * .016) calc(var(--S) * .05) calc(var(--S) * .04) rgba(42,20,80,.3))}
body[data-theme="night"] #page-folders.fd-on .fd-ico{filter:drop-shadow(calc(var(--S) * .016) calc(var(--S) * .045) calc(var(--S) * .045) rgba(0,0,0,.5))}
#page-folders.fd-on .fd-ico svg{display:block;width:100%;height:100%}
#page-folders.fd-on .fd-hov{--cdl:calc(var(--S) * -.03)}
#page-folders.fd-on .fd-hov .fd-idle{animation-play-state:paused}
#page-folders.fd-on .fd-hov .fd-cast{opacity:.75;transform:translateZ(calc(var(--S) * -.12)) scale(.92)}
#page-folders.fd-on .fd-dn2{--cdl:calc(var(--S) * .05);--cds:.96}
#page-folders.fd-on .fd-dn2 .fd-tilt{transition-duration:.08s}

/* every card, envelope, row and note leans toward the pointer, lifts under it and sinks when pressed */
#page-folders.fd-on .fd-pop{transform:perspective(900px) rotateX(var(--ly,0deg)) rotateY(var(--lx,0deg)) translateY(var(--lz,0px));transition:transform .45s cubic-bezier(.34,1.35,.64,1),box-shadow .3s ease}
#page-folders.fd-on .fd-pop.fd-ph{--lz:-3px}
#page-folders.fd-on .fd-pop.fd-pd{--lz:1px;transition-duration:.08s}
#page-folders.fd-on .fld-card.fd-pop.fd-ph{box-shadow:inset 0 3px 0 var(--accent),inset 0 0 0 1px var(--fd-hair),0 2px 3px rgba(40,22,68,.14),0 14px 26px rgba(40,22,68,.14)}
#page-folders.fd-on .fld-card.fd-pop.fd-pd{box-shadow:inset 0 3px 0 var(--accent),inset 0 0 0 1px var(--fd-hair),0 1px 1px rgba(40,22,68,.16)}
#page-folders.fd-on .fld-card.fld-new.fd-pop.fd-ph{box-shadow:inset 0 0 0 1.5px var(--accent),0 8px 16px rgba(40,22,68,.10)}

body[data-motion="minimal"] #page-folders.fd-on .fd-idle{animation:none}
body[data-motion="minimal"] #page-folders.fd-on .fd-tilt,body[data-motion="minimal"] #page-folders.fd-on .fd-pop{transform:none !important}
body[data-motion="minimal"] #page-folders.fd-on .fd-file,body[data-motion="minimal"] #page-folders.fd-on .fd-paper,body[data-motion="minimal"] #page-folders.fd-on .fd-book{transition:none}
body[data-motion="minimal"] #page-folders.fd-on .fd-spread.fd-anim .fd-left{animation:none}
@media (prefers-reduced-motion:reduce){#page-folders.fd-on .fd-idle,#page-folders.fd-on .fd-spread.fd-anim .fd-left{animation:none}
  #page-folders.fd-on .fd-tilt,#page-folders.fd-on .fd-file,#page-folders.fd-on .fd-paper,#page-folders.fd-on .fd-book{transition:none}#page-folders.fd-on .fd-pop{transform:none !important}}
/* ---------- 6.71: on a phone, narrower than 760 pixels (her words, 10 November 2026: "The Iphone app does not have the new pages designs, I want them visible on the new Ios apps, I hate that they still have the old design and not the new one, I want that fixed now please"): the head stacks, the drawer
   fills the width (its words drawn larger in the same proportion, so they read at a phone's size), every list keeps one column, and the
   build library's volume stands on its shelf above its words (measured at 290 and 360 pixels: it had stood over the heading) ---------- */
#page-folders.fd-on.fd-phone .fd-head{padding:22px 16px 18px;border-radius:24px;min-height:0;gap:10px}
#page-folders.fd-on.fd-phone .fd-words > .page-title{font-size:38px}
#page-folders.fd-on.fd-phone .fd-holds ol{columns:1}
#page-folders.fd-on.fd-phone .fd-drawer{width:560px;max-width:none;transform:scale(var(--fd-k,1));transform-origin:50% 0;justify-self:start;
  margin:6px 0 calc(410px * (var(--fd-k,1) - 1)) calc(50% - 280px)}
#page-folders.fd-on.fd-phone .fd-tab{font-size:calc(13px / var(--fd-k,1));height:calc(34px / var(--fd-k,1) * .8)}
#page-folders.fd-on.fd-phone .fd-ft b{font-size:calc(17px / var(--fd-k,1))}
#page-folders.fd-on.fd-phone .fd-label b{font-size:calc(13px / var(--fd-k,1))}
#page-folders.fd-on.fd-phone .fld-ways.fd-tray,#page-folders.fd-on.fd-phone .fld-grid,#page-folders.fd-on.fd-phone #fldBody > .card.fd-libcard{grid-template-columns:minmax(0,1fr)}
#page-folders.fd-on.fd-phone .fd-libcard > *{grid-column:1}
#page-folders.fd-on.fd-phone .fd-libcard > .fd-shelf{grid-row:auto;justify-self:center;margin:6px 0 22px}
</style>
<script>try{(window.__ingParts=window.__ingParts||{})["p263"]="started";}catch(_){}
/* R263 · Folders, a drawer of her apps: see the note at the top of its styles */
(function(){"use strict";
if(window.__r263)return;window.__r263=1;
var D=document,W=window;
function $(id){return D.getElementById(id);}
function mk(t,c,h){var e=D.createElement(t);if(c)e.className=c;if(h!=null)e.innerHTML=h;return e;}
function esc(s){return String(s==null?"":s).replace(/[&<>"]/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c];});}
function motion(){var m="calm";try{m=D.body.getAttribute("data-motion")||"calm";}catch(e){}try{if(W.matchMedia&&matchMedia("(prefers-reduced-motion: reduce)").matches)m="minimal";}catch(e){}return m;}
function still(){return motion()==="minimal";}
function save(){try{W.saveState();}catch(e){}}
function G(){var s=W.state;if(!s.folders||typeof s.folders!=="object")s.folders={how:"",ui:{}};if(!s.folders.ui)s.folders.ui={};return s.folders;}
function folders(){try{return W.IngFolders&&typeof IngFolders.folders==="function"?IngFolders.folders():[];}catch(e){return [];}}
function convs(p){try{return (W.state.chats||[]).filter(function(c){return c&&c.projectId===p.id;});}catch(e){return [];}}
function unread(p){try{return IngFolders.unread(p).length;}catch(e){return 0;}}
function day(t){try{return new Date(t).toLocaleDateString("en-GB",{day:"numeric",month:"long",year:"numeric"});}catch(e){return "";}}
function meta(p){var n=convs(p).length,u=unread(p),a=p.app||{};return n+" conversation"+(n===1?"":"s")+" · "+(a.briefAt?"summary of "+day(a.briefAt)+(u?", "+u+" not read yet":""):"no summary yet");}
function partsOf(p){var w=(p.app&&p.app.words)||[];return w.length>1?w.slice(1).join(", "):"";}
function when(c){var s=c.imported?(c.imported.updated||c.imported.created):(c.updated||c.at||c.made);var t=+new Date(s);return isFinite(t)?t:0;}
function lastUsed(p){var t=+((p.app&&p.app.briefAt)||0)||0;convs(p).forEach(function(c){var x=when(c);if(x>t)t=x;});return t;}
function paintFolders(){try{IngFolders.paint();}catch(e){}}
function show(el,where){if(!el)return;try{el.scrollIntoView({block:where||"start",behavior:still()?"auto":"smooth"});}catch(e){try{el.scrollIntoView();}catch(_){}}}

/* ---------- each app's own seal (r140's, by day or by night as the Display is), and a coin for any other app ---------- */
function sealKey(name){var n=String(name||"").trim().toLowerCase().replace(/\s+/g," ");
  return n==="carpe diem"?"cd":/^(the )?forge$/.test(n)?"forge":n==="ingenium"?"ingenium":n==="inkwell"?"inkwell":null;}
function seal(name,size){var k=sealKey(name),e=null;
  /* 6.85: a logo she gave the app herself comes first, even over its seal (kept by modules/r277.js, given on an opened folder, modules/r279.js) */
  if(W.IngAppLogo&&typeof IngAppLogo.own==="function"&&IngAppLogo.own(name)){try{e=IngAppLogo.el(name,size);}catch(x){e=null;}}
  if(!e&&k&&W.IngSeal&&typeof IngSeal.el==="function"){try{e=IngSeal.el([k],{size:size,alt:""});}catch(x){e=null;}}
  /* 6.83 (her words, 12 November 2026: "I want the Lakay and Offline Project app folders and any future apps folders to show their logo
     icon and not have some randomised letter stand-in"): every other app wears its own logo too, found by modules/r277.js (Lakay's
     Spiral, the Offline Project's master logo, any app's own page), and a quiet disc while it is looked for; never a letter */
  if(!e&&W.IngAppLogo){try{e=IngAppLogo.el(name,size);}catch(x){e=null;}}
  if(e){e.classList.add("fd-seal");e.setAttribute("aria-hidden","true");e.setAttribute("data-fd-seal",k||(W.IngAppLogo&&IngAppLogo.key(name))||"app");return e;}
  /* the letter is drawn by the sheet, so a folder's name reads as its name alone */
  var c=mk("span","fd-coin");c.setAttribute("data-l",(String(name||"?").trim().charAt(0)||"?").toUpperCase());c.setAttribute("aria-hidden","true");c.style.setProperty("--fs",size+"px");return c;}

/* ---------- orbs, made as Home's are ---------- */
var TONES=[["#a57fe8","#6a3fb5","#2e1764"],["#9283f2","#4d3db0","#1e1660"],["#c48ae8","#8641b8","#3e1760"],["#b47ad9","#7637a8","#331455"],["#b9a3f2","#7458c6","#33206c"],["#9a6be0","#5c31a4","#250f4b"],["#a98ce8","#6648b8","#281a5e"]];
function hex(c){c=c.replace("#","");return [parseInt(c.slice(0,2),16),parseInt(c.slice(2,4),16),parseInt(c.slice(4,6),16)];}
function mix(a,b,t){var A=hex(a),B=hex(b);return "#"+A.map(function(v,i){var n=Math.round(v+(B[i]-v)*t);return (n<16?"0":"")+n.toString(16);}).join("");}
var NS=0;
function ballSvg(){var id="fdb"+(++NS),R=' transform="rotate(44 60 60)"',c=function(n,o){return ' style="stop-color:var(--'+n+')'+(o?';stop-opacity:var(--'+o+')':'')+'"';};
  return '<svg viewBox="0 0 120 120" aria-hidden="true" focusable="false"><defs>'+
    '<radialGradient id="'+id+'b" cx=".36" cy=".5" r=".74" fx=".2" fy=".5"><stop offset="0"'+c('c0')+'/><stop offset=".16"'+c('c1')+'/><stop offset=".52"'+c('c2')+'/><stop offset=".86"'+c('c3')+'/><stop offset="1"'+c('c4')+'/></radialGradient>'+
    '<linearGradient id="'+id+'t" x1="0" y1="0" x2="1" y2="0"><stop offset=".4" stop-opacity="0"'+c('csh')+'/><stop offset=".76"'+c('csh','ct1')+'/><stop offset="1"'+c('csh','ct2')+'/></linearGradient>'+
    '<radialGradient id="'+id+'e" cx=".5" cy=".5" r=".5"><stop offset=".7" stop-opacity="0"'+c('csh')+'/><stop offset=".93"'+c('csh','ce1')+'/><stop offset="1"'+c('csh','ce2')+'/></radialGradient>'+
    '<radialGradient id="'+id+'s" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#fff" stop-opacity=".85"/><stop offset=".4" stop-color="#fff" stop-opacity=".32"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient>'+
    '<clipPath id="'+id+'c"><circle cx="60" cy="60" r="40"/></clipPath></defs>'+
    '<g'+R+'><circle cx="60" cy="60" r="40" fill="url(#'+id+'b)"/></g><g'+R+'><g clip-path="url(#'+id+'c)"><rect x="18" y="18" width="84" height="84" fill="url(#'+id+'t)"/></g></g>'+
    '<circle cx="60" cy="60" r="40" fill="url(#'+id+'e)"/><g'+R+'><ellipse cx="41" cy="60" rx="9.5" ry="13.5" fill="url(#'+id+'s)"/></g></svg>';}
var MARK={archive:'<path d="M4.5 8h15v10.5a1 1 0 0 1-1 1h-13a1 1 0 0 1-1-1z"/><path d="M3.5 4.5h17V8h-17z"/><path d="M10 12h4"/>',
  tray:'<path d="M12 3.5v10.5"/><path d="M7.5 9.5L12 14l4.5-4.5"/><path d="M4 15.5v4h16v-4"/>',
  terminal:'<rect x="3" y="4.5" width="18" height="15" rx="2"/><path d="M7 9.5l3 2.5-3 2.5M12.5 15H17"/>',
  globe:'<circle cx="12" cy="12" r="8.5"/><path d="M3.5 12h17M12 3.5c2.5 2.6 3.7 5.4 3.7 8.5s-1.2 5.9-3.7 8.5c-2.5-2.6-3.7-5.4-3.7-8.5s1.2-5.9 3.7-8.5z"/>',
  branch:'<circle cx="6" cy="5" r="2.2"/><circle cx="6" cy="19" r="2.2"/><circle cx="18" cy="9" r="2.2"/><path d="M6 7.2v9.6M18 11.2c0 3.6-4.5 3.9-9.9 5.4"/>',
  file:'<path d="M6 3.5h8l4 4v13H6z"/><path d="M14 3.5v4h4"/><path d="M9 12h6M9 15.5h6"/>',
  chat:'<path d="M5 6.5h14a1.5 1.5 0 0 1 1.5 1.5v8a1.5 1.5 0 0 1-1.5 1.5H10l-4 3v-3H5A1.5 1.5 0 0 1 3.5 16V8A1.5 1.5 0 0 1 5 6.5z"/>'};
function orb(mark,tone,od){var T=TONES[Math.abs(tone|0)%TONES.length],o=mk("span","fdo");o.setAttribute("aria-hidden","true");if(od!=null)o.style.setProperty("--od",od+"s");
  [mix(T[0],"#ffffff",.5),T[0],T[1],T[2],mix(T[2],"#000000",.42)].forEach(function(v,n){o.style.setProperty("--n"+n,v);});
  o.innerHTML='<span class="fd-tilt"><span class="fd-idle"><i class="fd-cast"></i><span class="fd-lay fd-l0">'+ballSvg()+'</span><span class="fd-lay fd-l3"><span class="fd-ico">'+
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">'+(MARK[mark]||MARK.chat)+'</svg></span></span></span></span>';return o;}
/* an orb answers the pointer over its card as the seal key does: it tilts to follow a mouse and lifts; pressed, it sinks */
function wire(host,o){if(host.__fdw)return;host.__fdw=1;
  host.addEventListener("pointerenter",function(e){if(e.pointerType==="mouse"&&!still())o.classList.add("fd-hov");});
  host.addEventListener("pointermove",function(e){if(e.pointerType!=="mouse"||still())return;var r=o.getBoundingClientRect();if(!r.width)return;
    var x=Math.max(-.25,Math.min(1.25,(e.clientX-r.left)/r.width)),y=Math.max(-.25,Math.min(1.25,(e.clientY-r.top)/r.height));
    o.style.setProperty("--ry",((x-.5)*28).toFixed(1)+"deg");o.style.setProperty("--rx",(-(y-.5)*24).toFixed(1)+"deg");},{passive:true});
  host.addEventListener("pointerleave",function(){o.classList.remove("fd-hov","fd-dn2");o.style.setProperty("--rx","0deg");o.style.setProperty("--ry","0deg");});
  host.addEventListener("pointerdown",function(){if(!still())o.classList.add("fd-dn2");},{passive:true});
  ["pointerup","pointercancel"].forEach(function(t){host.addEventListener(t,function(){o.classList.remove("fd-dn2");},{passive:true});});}

/* ---------- the head: the words, and the drawer of folders ---------- */
var page=null,body=null,on=false,busy=false,head=null,words=null,drawer=null,files=null,hint=null,label=null,title=null,lede=null,held=null,lastSig="",lastOpen=null,mo=null;
var HINT="Point at a folder to lift it out of the drawer; press it to open it.",EMPTY="Your folders will stand here. Make them below, from the apps your profile names.";
var TABX=["6%","36%","64%"];
function build(){if(head)return;
  head=mk("section","fd-head");head.setAttribute("aria-label","Folders");
  words=mk("div","fd-words");var eb=mk("div","fd-eyebrow","<b>Ingenium</b><span>Folders · a drawer of your apps</span>");eb.setAttribute("aria-hidden","true");words.appendChild(eb);
  var keys=mk("div","fd-keys"),kn=mk("button","btn primary","A folder for another app"),kb=mk("button","btn","Bring in your work");kn.type="button";kb.type="button";kn.id="fdNewKey";kb.id="fdBringKey";
  kn.addEventListener("click",function(e){e.preventDefault();addFolder();});kb.addEventListener("click",function(e){e.preventDefault();bringIn();});keys.appendChild(kn);keys.appendChild(kb);words.appendChild(keys);
  var holds=mk("div","fd-holds",'<span>What a folder holds</span><ol><li><i>1</i>Where we left off</li><li><i>2</i>How I work on it</li><li><i>3</i>How it was built</li>'+
    '<li><i>4</i>Decisions, and what is open</li><li><i>5</i>Its conversations</li><li><i>6</i>The words that mark it</li></ol>');words.appendChild(holds);
  hint=mk("p","fd-hint");hint.setAttribute("aria-live","polite");hint.textContent=HINT;words.appendChild(hint);head.appendChild(words);
  drawer=mk("div","fd-drawer");drawer.setAttribute("role","group");drawer.setAttribute("aria-label","Your folders, in their drawer");
  var box=mk("div","fd-box");box.setAttribute("aria-hidden","true");drawer.appendChild(box);files=mk("div","fd-files");drawer.appendChild(files);
  var front=mk("div","fd-dfront");front.setAttribute("aria-hidden","true");label=mk("span","fd-label","<b>Your apps</b><small></small>");
  front.appendChild(mk("i","fd-handle"));front.appendChild(label);front.appendChild(mk("i","fd-handle"));drawer.appendChild(front);head.appendChild(drawer);}
function lift(b,v){if(v){if(held&&held!==b)lift(held,false);held=b;b.classList.add("fd-up");drawer.classList.add("fd-hold");var p=b.__p;
    hint.innerHTML="<b>"+esc(p.name)+"</b>: "+esc(meta(p))+". Press it to open the folder.";}
  else{b.classList.remove("fd-up","fd-dn");if(held===b){held=null;drawer.classList.remove("fd-hold");hint.textContent=files.children.length?HINT:EMPTY;}}}
function drawFiles(){var fs=folders(),V=W.IngFolderView,vw=null;
  /* 6.85: the drawer's pulls (modules/r279.js) find folders and put them in order; the six first in that order stand in the drawer */
  try{vw=V&&typeof V.view==="function"?V.view(fs,{lastUsed:lastUsed}):null;}catch(e){vw=null;}
  var sig=fs.map(function(p){return p.id+"|"+p.name+"|"+meta(p)+"|"+partsOf(p)+"|"+lastUsed(p);}).join("§")+(vw?"#"+vw.sig:"");
  if(sig===lastSig&&files.children.length===Math.min(6,vw?vw.list.length:fs.length))return;lastSig=sig;held=null;drawer.classList.remove("fd-hold");files.innerHTML="";
  var shown=(vw?vw.list.map(function(p){return {p:p};}):fs.map(function(p,i){return {p:p,t:lastUsed(p),i:i};}).sort(function(a,b){return (b.t-a.t)||(a.i-b.i);})).slice(0,6).reverse(),n=shown.length,gap=n>1?Math.min(44,110/(n-1)):0;
  shown.forEach(function(x,i){var p=x.p,depth=n-1-i,b=mk("button","fd-file");b.type="button";b.__p=p;
    b.style.setProperty("--i",String(i));b.style.setProperty("--t",(150-depth*gap).toFixed(1)+"px");b.style.setProperty("--sc",(1-depth*.035).toFixed(3));
    b.style.setProperty("--l",(26+depth*6)+"px");b.style.setProperty("--w","calc(100% - "+(52+depth*12)+"px)");b.style.setProperty("--tx",TABX[i%3]);
    b.setAttribute("aria-label",p.name+": "+meta(p)+". Opens the folder.");
    var tab=mk("span","fd-tab");tab.appendChild(seal(p.name,26));tab.appendChild(mk("span","fd-tn",esc(p.name)));
    var front=mk("span","fd-front");front.appendChild(seal(p.name,64));var pp=partsOf(p);
    front.appendChild(mk("span","fd-ft","<b>"+esc(p.name)+"</b><small>"+esc(meta(p))+"</small>"+(pp?'<span class="fd-parts">'+esc(pp)+"</span>":"")));
    b.appendChild(mk("span","fd-back"));b.appendChild(tab);b.appendChild(mk("span","fd-paper"));b.appendChild(mk("span","fd-paper fd-p2"));b.appendChild(front);
    b.addEventListener("pointerenter",function(){lift(b,true);});b.addEventListener("pointerleave",function(){lift(b,false);});
    b.addEventListener("focus",function(){lift(b,true);});b.addEventListener("blur",function(){lift(b,false);});
    b.addEventListener("pointerdown",function(){if(!still())b.classList.add("fd-dn");});
    ["pointerup","pointercancel"].forEach(function(t){b.addEventListener(t,function(){b.classList.remove("fd-dn");});});
    b.addEventListener("click",function(e){e.preventDefault();openFolder(p);});files.appendChild(b);});
  var lb=label.querySelector("small"),all=fs.length;lb.textContent=vw&&vw.label?vw.label:all?all+" folder"+(all===1?"":"s")+(all>6?", the six used last":""):"No folders yet";
  hint.textContent=n?HINT:(vw&&vw.none&&all?vw.none:EMPTY);}
function openFolder(p){var g=G();g.ui.open=p.id;g.ui.adding=false;g.ui.renaming=null;save();if(held)lift(held,false);paintFolders();
  setTimeout(function(){show(page&&(page.querySelector("#fldBody > .fld-crumb")||page.querySelector(".fd-spread"))||body);},40);}
function home(){var g=G();if(g.ui.open){g.ui.open=null;g.ui.renaming=null;save();paintFolders();}}
function addFolder(){if(!folders().length){home();var m=page&&page.querySelector(".fld-more");if(m){show(m,"center");try{m.focus({preventScroll:true});}catch(e){m.focus();}}return;}
  var g=G();g.ui.open=null;g.ui.adding=true;save();paintFolders();var i=$("fldAddName");if(i){show(i,"center");try{i.focus({preventScroll:true});}catch(e){i.focus();}}}
function bringIn(){home();var c=body&&body.querySelector(".fd-bring");if(c)show(c);}

/* ---------- dressing the page that Folders draws (r208 draws it again on every change; this follows it) ---------- */
var LEFT=/^(Where we left off|Seen in the conversations|How I work on )/;
function h2of(c){var h=c&&c.querySelector&&c.querySelector(":scope > h2");return h?h.textContent.trim():"";}
function dressHome(){
  [].forEach.call(body.querySelectorAll(".fld-card"),function(c){if(c.__fd)return;c.__fd=1;if(c.classList.contains("fld-new"))return;
    var nm=c.querySelector(".fld-name");if(!nm)return;var name=nm.textContent.trim();nm.insertBefore(seal(name,44),nm.firstChild);});
  [].forEach.call(body.querySelectorAll(":scope > .card"),function(c){var t=h2of(c);
    if(/^Your build library/.test(t)&&!c.querySelector(":scope > .fd-shelf")){c.classList.add("fd-libcard");var sh=mk("div","fd-shelf"),bk=mk("button","fd-book");bk.type="button";
      bk.setAttribute("aria-label","Your build library");bk.title="Your build library";
      bk.innerHTML='<span class="fd-spine" aria-hidden="true">BUILD LIBRARY</span><span class="fd-cover" aria-hidden="true"><small>Ingenium</small><i></i><b>Your build<br>library</b><i></i><small>By app, by part</small></span><span class="fd-pages" aria-hidden="true"></span>';
      bk.addEventListener("click",function(e){e.preventDefault();var inp=c.querySelector("input");if(inp){show(inp,"center");try{inp.focus({preventScroll:true});}catch(x){inp.focus();}return;}
        var k=c.querySelector(".btn.primary")||c.querySelector(".btn");if(k)k.click();});sh.appendChild(bk);c.insertBefore(sh,c.firstChild);}
    if(c.querySelector(":scope > .fld-ways")&&!c.classList.contains("fd-bring")){c.classList.add("fd-bring");var ways=c.querySelector(":scope > .fld-ways");ways.classList.add("fd-tray");
      [].forEach.call(ways.querySelectorAll(":scope > .fld-way"),function(w,i){if(w.__fd)return;w.__fd=1;w.classList.add("fd-env");var t=(w.querySelector(":scope > b")||{}).textContent||"";
        var m=/^Claude, on claude/.test(t)?"archive":/ChatGPT/.test(t)?"tray":/this computer/.test(t)?"terminal":/on the web/.test(t)?"globe":/GitHub/.test(t)?"branch":/Ollama/.test(t)?"file":"tray";
        var o=orb(m,i+2,(-i*1.2).toFixed(1));w.insertBefore(o,w.firstChild);wire(w,o);});}});}
function sheets(){[].forEach.call(body.querySelectorAll("textarea.fld-ta"),function(ta){if(ta.parentNode&&ta.parentNode.classList.contains("fd-sheet"))return;
    var sh=mk("div","fd-sheet");ta.parentNode.insertBefore(sh,ta);sh.appendChild(ta);var wm=seal("Ingenium",54);wm.classList.add("fd-wm");sh.appendChild(wm);});}
function rows(){[].forEach.call(body.querySelectorAll(".fld-list > li"),function(li,i){if(li.__fd||!li.querySelector("select"))return;li.__fd=1;li.classList.add("fd-conv");
    var o=orb("chat",i,(-(i%5)*1.4).toFixed(1));li.insertBefore(o,li.firstChild);wire(li,o);});}
function dressFolder(){var crumb=body.querySelector(":scope > .fld-crumb"),sp=body.querySelector(":scope > .fd-spread"),fresh=false;
  if(!sp){sp=mk("div","fd-spread");sp.appendChild(mk("div","fd-left"));sp.appendChild(mk("div","fd-right"));body.insertBefore(sp,crumb.nextSibling);fresh=true;}
  var L=sp.firstChild,R=sp.lastChild;
  [].slice.call(body.children).forEach(function(c){if(c===crumb||c===sp)return;
    if(c.classList.contains("fld-h")||c.classList.contains("fld-status")||(c.classList.contains("card")&&LEFT.test(h2of(c))))L.appendChild(c);else R.appendChild(c);});
  var g=G(),p=null;folders().forEach(function(f){if(f.id===g.ui.open)p=f;});
  var hd=L.querySelector(":scope > .fld-h");
  if(hd&&p&&!hd.__fd){hd.__fd=1;var h2=hd.querySelector(":scope > h2");
    if(h2){var oh=mk("div","fd-oh"),tx=mk("div");oh.appendChild(seal(p.name,84));hd.insertBefore(oh,hd.firstChild);tx.appendChild(h2);var pp=partsOf(p);
      tx.appendChild(mk("small",null,esc(meta(p))+(pp?" · its parts: "+esc(pp):"")));oh.appendChild(tx);
      var st=[].filter.call(hd.querySelectorAll(":scope > .btn"),function(b){return /^Start a conversation/.test(b.textContent.trim());})[0];if(st)hd.insertBefore(st,oh.nextSibling);}
    else hd.insertBefore(seal(p.name,40),hd.firstChild);}
  if(fresh){var id=g.ui.open;if(id!==lastOpen&&!still())sp.classList.add("fd-anim");lastOpen=id;}}
function dress(){if(!on||!page||!body||busy)return;busy=true;
  try{drawFiles();var inside=!!body.querySelector(":scope > .fld-crumb");page.classList.toggle("fd-inside",inside);
    if(inside)dressFolder();else{lastOpen=null;dressHome();}
    sheets();rows();
    try{if(W.IngFolderView&&typeof IngFolderView.dressed==="function")IngFolderView.dressed(page,body,inside);}catch(e){try{console.warn("Ingenium: Folders' pulls and logos",e&&e.message||e);}catch(_){}}}
  catch(e){try{console.warn("Ingenium: Folders' new look",e&&e.message||e);}catch(_){}}
  try{if(mo)mo.takeRecords();}catch(e){}busy=false;}

/* ---------- every card, envelope, row and note leans toward the pointer, lifts under it and sinks when pressed ---------- */
var POPSEL=".fld-card,.fld-way.fd-env,.fld-list > li,.fd-right .bl-row",cur=null;
function popOff(e){if(!e)return;e.classList.remove("fd-ph","fd-pd");e.style.removeProperty("--lx");e.style.removeProperty("--ly");}
function wirePop(){
  page.addEventListener("pointerover",function(e){if(!on||e.pointerType!=="mouse"||still())return;var t=e.target.closest&&e.target.closest(POPSEL);if(t&&!page.contains(t))t=null;if(t===cur)return;popOff(cur);cur=t;
    if(t){t.classList.add("fd-pop","fd-ph");}},{passive:true});
  page.addEventListener("pointermove",function(e){if(!cur||e.pointerType!=="mouse"||still())return;var r=cur.getBoundingClientRect();if(!r.width)return;
    var x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5,k=Math.min(1,320/Math.max(r.width,r.height));
    cur.style.setProperty("--lx",(x*7*k).toFixed(2)+"deg");cur.style.setProperty("--ly",(-y*7*k).toFixed(2)+"deg");},{passive:true});
  page.addEventListener("pointerleave",function(){popOff(cur);cur=null;},{passive:true});
  page.addEventListener("pointerdown",function(e){var t=e.target.closest&&e.target.closest(POPSEL);if(t&&on&&!still())t.classList.add("fd-pop","fd-pd");},{passive:true});
  ["pointerup","pointercancel"].forEach(function(n){page.addEventListener(n,function(){[].forEach.call(page.querySelectorAll(".fd-pd"),function(x){x.classList.remove("fd-pd");});},{passive:true});});}

/* ---------- in and out: from 760 pixels the drawer; below, Folders as it was ---------- */
function enter(){build();title=page.querySelector(":scope > .page-title");lede=page.querySelector(":scope > .lede");
  page.insertBefore(head,title||body);if(title)words.insertBefore(title,words.children[1]);if(lede)words.insertBefore(lede,words.children[2]);
  page.classList.add("fd-on");on=true;lastSig="";dress();}
function leave(){on=false;if(held)lift(held,false);page.classList.remove("fd-on","fd-stack","fd-mid","fd-inside","fd-phone");page.style.removeProperty("--fd-k");
  if(title)page.insertBefore(title,head);if(lede)page.insertBefore(lede,head);if(head&&head.parentNode)head.parentNode.removeChild(head);paintFolders();}
function layout(w){var set=function(c,v){if(page.classList.contains(c)!==v)page.classList.toggle(c,v);};set("fd-stack",w<1060);set("fd-mid",w<980);set("fd-phone",w<760);
  var k=w<760?Math.min(1,(w-40)/560).toFixed(3):"";if(page.style.getPropertyValue("--fd-k")!==k){if(k)page.style.setProperty("--fd-k",k);else page.style.removeProperty("--fd-k");}}
function mount(){try{page=$("page-folders");body=$("fldBody");if(!page||!body)return;var w=page.clientWidth;if(!w)return;
    if(w>=260){layout(w);if(!on)enter();}else if(on)leave();}catch(e){try{console.warn("Ingenium: Folders' new look",e&&e.message||e);}catch(_){}}}
function boot(){page=$("page-folders");body=$("fldBody");if(!page||!body||!W.IngFolders){setTimeout(boot,700);return;}
  wirePop();
  /* only a change of width matters, and it is answered in the next frame, so the drawer's own height never loops the observer */
  var lastW=-1,rq=0,onSize=function(){rq=0;var w=page?page.clientWidth:0;if(w===lastW)return;lastW=w;mount();};
  try{new ResizeObserver(function(){if(!rq)rq=requestAnimationFrame(onSize);}).observe(page);}catch(e){W.addEventListener("resize",mount);}
  /* Folders drawing its page again: the drawer, the cards, the envelopes, the sheet and the spread follow it, before it is shown */
  try{mo=new MutationObserver(function(){if(busy)return;if(!on){mount();return;}dress();});mo.observe(body,{childList:true});}catch(e){}
  mount();}
if(D.readyState==="loading")D.addEventListener("DOMContentLoaded",boot);else boot();
W.IngFoldersLook={state:function(){var fl=files?[].slice.call(files.querySelectorAll(".fd-file")):[];
    return {on:on,files:fl.map(function(b){return b.__p?b.__p.name:"";}),held:held&&held.__p?held.__p.name:null,label:label?label.textContent:"",
      seals:fl.map(function(b){var s=b.querySelector(".fd-front .fd-seal");return s?s.getAttribute("data-fd-seal"):null;}),
      spread:!!(page&&page.querySelector(".fd-spread")),stack:!!(page&&page.classList.contains("fd-stack")),inside:!!(page&&page.classList.contains("fd-inside"))};},
  refresh:function(){lastSig="";mount();dress();}};
try{window.__ingParts["p263"]="running";}catch(_){}
})();
</script>
