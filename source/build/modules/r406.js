<style id="r406-css">
/* ============ R406 · MEMORIA: THE ATLAS OF WHAT INGENIUM KNOWS (Ingenium 7.99, 26 November 2026) ============
   Her words (26 November 2026): "the Memoria page looks super plain and basic"; "While you redesign the Memoria page, I want you to also do a
   deeper pass on the page and truly deepen and expand its functions and features"; of the first redesign (r405, never released): "lackluster",
   "a clustered mess. It does not look tidy and organised"; and, shown two directions drawn in the real page under the real head, a card
   cabinet and a star atlas: "I choose direction B- the atlas."
   So What it knows, under Memoria's head and its four room cards, is an atlas of plates, drawn as approved:
   - a thumb index of medallions, pewter rimmed: Waiting (how many wait), You, then each of her apps in the colour its star has in the head
     (r392's own colours, by its place among her folders), and Find a fact on every plate at the end of the row;
   - one plate at a time, as in a star atlas: its number, its name, and a round chart where each fact is a star (her own words near the
     middle and brightest, what was learned and kept further out, what waits for her as a hollow star at the edge), joined as a constellation;
   - beside the chart, the chosen star read large, with where it came from (a stamp in its own ink: Your words, Its folder, Fabrica, A chat,
     A memory, Lector, Vocatio), when, and how often it went with a chat this week (counted from the replies themselves: each reply keeps the
     facts it was given, r390); then the key, every star of the plate by its number;
   - keys where they act: Keep and Not this on what waits; Keep mine, Keep the new one or Keep both when a fact disagrees with her words, the
     two side by side; Edit and Leave out on what is kept (a fact left out stays on its plate, dimmed, and no model is given it; r390 passes
     it by); Add a fact on her plate and each app's; Keep all that agree on the Waiting plate;
   - How it is kept, at the plate's foot, turns the plate over: on its back, how it learns (the three switches), what is never kept, and
     which models may read it (taken over from r405, never released: a fact from any source but her that reads as a password, a code, a
     key, or a card or account number is refused and let go; a model she turns off is given no memory and no fact).
   The head's own keys (Waiting for you, Find a fact) and its stars open the atlas's plates. r390's room card stays underneath, unseen.
   Medallions are raised and lift under the pointer; the key's rows lie flat and answer it; Minimal motion and reduced motion keep it
   still. By day on cream paper with violet ink, by night silver lines on deep indigo. */
#page-memoria #knRoom{display:none!important}
#page-memoria.ma-knows #mmSays{display:none}
#mmAtlas{--b-ink1:#221a2e;--b-ink2:#4a4358;--b-ink3:#6c6579;--b-acc:#6a3fb5;
  --b-p0:#fffdf9;--b-p1:#f5eff8;--b-edge:#dcd2ec;--b-edge2:#cdc1e2;--b-l1:rgba(74,42,134,.40);--b-l2:rgba(74,42,134,.16);--b-dot:rgba(74,42,134,.55);
  --b-face0:#fffdf9;--b-face1:#efe7f6;--b-well:rgba(34,26,46,.045);--b-chip:rgba(106,63,181,.08);--b-on:linear-gradient(#7a50c6,#5d37a1);
  --b-her:#2e7d52;--b-folder:#2f62b0;--b-fabrica:#6a3fb5;--b-chat:#a35f22;--b-memory:#8e4f9c;--b-lector:#9a3b4f;--b-vocatio:#2f7a73;
  display:block;margin:20px 0 0;padding:0;background:none;border:0;box-shadow:none;color:var(--b-ink1)}
body[data-theme="night"] #mmAtlas{--b-ink1:#f3eefb;--b-ink2:#d3c9e3;--b-ink3:#a99cc1;--b-acc:#c3a8f0;
  --b-p0:#1c1530;--b-p1:#0f0a1b;--b-edge:#0b0814;--b-edge2:#06040b;--b-l1:rgba(214,200,244,.42);--b-l2:rgba(214,200,244,.15);--b-dot:rgba(236,228,250,.75);
  --b-face0:#221a36;--b-face1:#130d20;--b-well:rgba(10,6,18,.4);--b-chip:rgba(195,168,240,.12);
  --b-her:#8fd6a9;--b-folder:#9bbcf0;--b-fabrica:#c3a8f0;--b-chat:#e8b47e;--b-memory:#dba6e6;--b-lector:#f0a3b3;--b-vocatio:#8fd1c9}
/* the thumb index: one medallion for each plate */
#mmAtlas .mmb-idx{display:flex;align-items:flex-start;gap:20px;flex-wrap:wrap;margin:6px 4px 22px}
#mmAtlas .mmb-med{display:flex;flex-direction:column;align-items:center;gap:11px;min-width:66px;margin:0;padding:6px 0 0;border:0;background:none;cursor:pointer;font:inherit;color:var(--b-ink2);-webkit-tap-highlight-color:transparent}
#mmAtlas .mmb-med:focus-visible{outline:none}
#mmAtlas .mmb-med:focus-visible .mmb-disc{box-shadow:0 0 0 3px var(--b-acc),0 4px 6px rgba(40,22,68,.22)}
#mmAtlas .mmb-disc{position:relative;display:grid;place-items:center;width:58px;height:58px;border-radius:50%;
  background:conic-gradient(from 210deg,#fdfdff,#d3cfdc 16%,#9b96a8 30%,#e9e7ee 46%,#ffffff 55%,#bdb8c8 70%,#8e899b 84%,#fdfdff);
  box-shadow:0 2px 0 #8d879b,0 4px 6px rgba(40,22,68,.22),0 10px 16px rgba(40,22,68,.10);transition:transform .34s cubic-bezier(.34,1.35,.64,1),box-shadow .22s ease}
body[data-theme="night"] #mmAtlas .mmb-disc{box-shadow:0 2px 0 #3b3549,0 4px 8px rgba(0,0,0,.6),0 10px 16px rgba(0,0,0,.4)}
#mmAtlas .mmb-disc::after{content:"";position:absolute;inset:5px;border-radius:50%;background:radial-gradient(circle at 50% 38%,var(--b-face0),var(--b-face1) 76%);
  box-shadow:inset 0 2px 5px rgba(40,22,68,.24),inset 0 -1px 0 rgba(255,255,255,.5),0 0 0 1px rgba(60,50,80,.25)}
#mmAtlas .mmb-disc > *{position:relative;z-index:1}
#mmAtlas .mmb-disc svg{width:26px;height:26px;overflow:visible;filter:drop-shadow(0 0 4px var(--st,#7a52c7))}
#mmAtlas .mmb-disc b{font:700 24px/1 var(--sk-serif);color:var(--b-acc)}
#mmAtlas .mmb-med:hover .mmb-disc{transform:translateY(-3px) scale(1.04);box-shadow:0 3px 0 #8d879b,0 8px 10px rgba(40,22,68,.24),0 16px 24px rgba(40,22,68,.14)}
body[data-theme="night"] #mmAtlas .mmb-med:hover .mmb-disc{box-shadow:0 3px 0 #3b3549,0 8px 12px rgba(0,0,0,.6),0 16px 24px rgba(0,0,0,.45)}
#mmAtlas .mmb-med:active .mmb-disc{transform:translateY(1px) scale(.97);transition-duration:.06s}
#mmAtlas .mmb-med.twirl .mmb-disc{animation:mmbCoin .7s cubic-bezier(.3,.8,.3,1)}
@keyframes mmbCoin{0%{transform:perspective(300px) rotateY(0)}100%{transform:perspective(300px) rotateY(360deg)}}
#mmAtlas .mmb-med[aria-selected="true"] .mmb-disc::after{background:radial-gradient(circle at 40% 32%,#a47de6,#6a3fb5 58%,#4b2a86);box-shadow:inset 0 2px 5px rgba(20,6,46,.45),inset 0 -1px 0 rgba(255,255,255,.25),0 0 0 1px rgba(60,30,110,.5),0 0 14px rgba(122,76,200,.45)}
#mmAtlas .mmb-med[aria-selected="true"] .mmb-disc svg{filter:drop-shadow(0 0 5px rgba(255,255,255,.8))}
#mmAtlas .mmb-med[aria-selected="true"] .mmb-disc svg path{fill:#fff}
#mmAtlas .mmb-med[aria-selected="true"] .mmb-disc b{color:#fff}
#mmAtlas .mmb-nm{font:600 14.5px/1.15 var(--sk-serif);letter-spacing:.02em;color:var(--b-ink1);white-space:nowrap}
#mmAtlas .mmb-med[aria-selected="true"] .mmb-nm{color:var(--b-acc);text-decoration:underline;text-decoration-thickness:1.5px;text-underline-offset:4px}
#mmAtlas .mmb-find{margin-left:auto;align-self:center;display:flex;align-items:center;gap:10px;width:300px;max-width:100%;height:44px;padding:0 15px;border-radius:14px;background:var(--b-well);
  box-shadow:inset 0 1px 3px rgba(40,22,68,.13),0 0 0 1px rgba(34,26,46,.08);transition:box-shadow .2s ease;cursor:text}
#mmAtlas .mmb-find:hover,#mmAtlas .mmb-find:focus-within{box-shadow:inset 0 1px 3px rgba(40,22,68,.13),0 0 0 2px rgba(106,63,181,.45),0 0 16px rgba(106,63,181,.14)}
#mmAtlas .mmb-find svg{width:17px;height:17px;flex:0 0 auto;color:var(--b-ink3)}
#mmAtlas .mmb-find input,#page-memoria #mmAtlas .mmb-find input[type="search"]{flex:1;min-width:0;height:100%;border:0;outline:0;background:transparent;box-shadow:none;padding:0;font:500 14px/1.2 var(--sans,system-ui,sans-serif);color:var(--b-ink1);-webkit-appearance:none;appearance:none}
#mmAtlas .mmb-find input::placeholder{color:var(--b-ink3);opacity:.9}
/* the plate */
#mmAtlas .mmb-plate{position:relative;isolation:isolate;border-radius:26px;padding:34px 40px 30px;
  background:radial-gradient(ellipse 85% 75% at 28% 22%,var(--b-p0),var(--b-p1));
  box-shadow:inset 0 1px 0 rgba(255,255,255,.9),0 1px 0 rgba(40,22,68,.05),0 7px 0 var(--b-edge),0 8px 0 var(--b-edge2),0 18px 30px rgba(40,22,68,.10),0 40px 64px rgba(40,22,68,.07)}
body[data-theme="night"] #mmAtlas .mmb-plate{box-shadow:inset 0 1px 0 rgba(255,255,255,.06),inset 0 0 0 1px rgba(205,184,240,.06),0 7px 0 var(--b-edge),0 8px 0 var(--b-edge2),0 18px 30px rgba(0,0,0,.5),0 40px 64px rgba(0,0,0,.35)}
#mmAtlas .mmb-plate.enter{animation:mmbIn .5s cubic-bezier(.2,.8,.2,1)}
@keyframes mmbIn{0%{opacity:.4;transform:translateY(8px)}100%{opacity:1;transform:none}}
#mmAtlas .mmb-plate.flip-out{animation:mmbOut .24s cubic-bezier(.5,0,.75,0) forwards}
#mmAtlas .mmb-plate.flip-in{animation:mmbBack .46s cubic-bezier(.2,1.25,.4,1)}
@keyframes mmbOut{to{transform:perspective(1800px) rotateY(90deg);opacity:.55}}
@keyframes mmbBack{from{transform:perspective(1800px) rotateY(-90deg);opacity:.55}to{transform:none;opacity:1}}
#mmAtlas .mmb-plate::before{content:"";position:absolute;inset:12px;border-radius:18px;border:1px solid var(--b-l2);pointer-events:none;z-index:-1}
#mmAtlas .mmb-plate::after{content:"";position:absolute;inset:17px;border-radius:14px;border:1.5px solid var(--b-l1);opacity:.55;pointer-events:none;z-index:-1}
#mmAtlas .mmb-ph{text-align:center;margin:0 0 6px}
#mmAtlas .mmb-pno{display:block;font:600 10.5px/1 var(--sans,system-ui,sans-serif);letter-spacing:.32em;text-transform:uppercase;color:var(--b-ink3)}
#mmAtlas .mmb-ph h3{margin:10px 0 6px;font:600 34px/1.05 var(--sk-serif);letter-spacing:.01em;color:var(--b-ink1)}
#mmAtlas .mmb-ph i{font:italic 500 16px/1.3 var(--sk-serif);color:var(--b-ink3)}
#mmAtlas .mmb-body{display:grid;grid-template-columns:400px minmax(0,1fr);gap:40px;align-items:center;margin-top:8px}
#mmAtlas .mmb-chart{display:block;width:400px;height:auto;aspect-ratio:1;max-width:100%;overflow:visible}
#mmAtlas .mmb-chart text{font-family:var(--sk-serif)}
#mmAtlas .mmb-chart .num{fill:var(--b-ink2);font-size:11px;font-weight:700}
#mmAtlas .mmb-chart .deg{fill:var(--b-l1);font-size:9px}
#mmAtlas .mmb-chart .mmb-s{cursor:pointer;outline:none}
#mmAtlas .mmb-chart .mmb-s.off{opacity:.36}
#mmAtlas .mmb-chart .mmb-s .core{transition:transform .34s cubic-bezier(.34,1.35,.64,1);transform-box:fill-box;transform-origin:center}
#mmAtlas .mmb-chart .mmb-s:hover .core,#mmAtlas .mmb-chart .mmb-s:focus-visible .core{transform:scale(1.35)}
#mmAtlas .mmb-chart .mmb-spin{transform-box:fill-box;transform-origin:center;animation:mmbSpin 14s linear infinite}
@keyframes mmbSpin{to{transform:rotate(360deg)}}
#mmAtlas .mmb-chart .tw{animation:mmbTw 3.2s ease-in-out infinite alternate}
@keyframes mmbTw{0%{opacity:.25}100%{opacity:.9}}
/* the key: the chosen star read large, then every star of the plate by its number */
#mmAtlas .mmb-key{min-width:0}
#mmAtlas .mmb-focus{padding:0 0 20px;margin:0 0 18px;border-bottom:1px solid var(--b-l2);box-shadow:0 1px 0 rgba(255,255,255,.6)}
body[data-theme="night"] #mmAtlas .mmb-focus{box-shadow:none}
#mmAtlas .mmb-fh{display:flex;align-items:center;gap:12px;flex-wrap:wrap}
#mmAtlas .mmb-no{font:600 10.5px/1 var(--sans,system-ui,sans-serif);letter-spacing:.28em;text-transform:uppercase;color:var(--b-ink3)}
#mmAtlas .mmb-date{margin-left:auto;font:500 12px/1 var(--sans,system-ui,sans-serif);color:var(--b-ink3)}
#mmAtlas .mmb-ft{margin:14px 0 10px;font:600 27px/1.28 var(--sk-serif);letter-spacing:.003em;color:var(--b-ink1);text-wrap:pretty;overflow-wrap:anywhere}
#mmAtlas .mmb-ft.long{font-size:21px;line-height:1.36}
#mmAtlas .mmb-ft.off{color:var(--b-ink3)}
#mmAtlas .mmb-fm{font:500 12.5px/1.4 var(--sans,system-ui,sans-serif);color:var(--b-ink3)}
#mmAtlas .mmb-fk{display:flex;align-items:center;gap:16px;margin-top:14px;flex-wrap:wrap}
#mmAtlas .mmb-w{border:0;background:none;padding:0;margin:0;font:600 13px/1.3 var(--sans,system-ui,sans-serif);color:var(--b-acc);text-decoration:underline;text-decoration-thickness:1.5px;text-underline-offset:3px;cursor:pointer}
#mmAtlas .mmb-w:hover{text-decoration-thickness:2px}
#mmAtlas .mmb-w:focus-visible{outline:2px solid var(--b-acc);outline-offset:3px;border-radius:3px}
#mmAtlas .mmb-stamp{display:inline-flex;align-items:center;padding:4px 7px 3px;border:1.5px solid currentColor;border-radius:4px;font:700 9.5px/1 var(--sans,system-ui,sans-serif);letter-spacing:.15em;text-transform:uppercase;transform:rotate(-2.5deg);opacity:.85;white-space:nowrap}
#mmAtlas .mmb-stamp[data-k="her"]{color:var(--b-her)}#mmAtlas .mmb-stamp[data-k="folder"]{color:var(--b-folder)}#mmAtlas .mmb-stamp[data-k="fabrica"]{color:var(--b-fabrica)}
#mmAtlas .mmb-stamp[data-k="chat"]{color:var(--b-chat)}#mmAtlas .mmb-stamp[data-k="memory"]{color:var(--b-memory)}#mmAtlas .mmb-stamp[data-k="lector"]{color:var(--b-lector)}#mmAtlas .mmb-stamp[data-k="vocatio"]{color:var(--b-vocatio)}
#mmAtlas .mmb-lh{display:block;margin:0 0 10px;font:600 10.5px/1 var(--sans,system-ui,sans-serif);letter-spacing:.28em;text-transform:uppercase;color:var(--b-ink3)}
#mmAtlas .mmb-list{list-style:none;margin:0;padding:0;display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:4px 22px}
#mmAtlas .mmb-list button{display:flex;align-items:center;gap:10px;width:100%;min-width:0;margin:0;padding:6px 8px;border:0;border-radius:10px;background:none;cursor:pointer;text-align:left;font:500 13.5px/1.3 var(--sans,system-ui,sans-serif);color:var(--b-ink2);
  transition:background .2s ease,transform .3s cubic-bezier(.34,1.35,.64,1)}
#mmAtlas .mmb-list button:hover{background:var(--b-chip);transform:translateX(2px)}
#mmAtlas .mmb-list button:focus-visible{outline:2px solid var(--b-acc);outline-offset:1px}
#mmAtlas .mmb-list button span{min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
#mmAtlas .mmb-list b{flex:0 0 auto;display:grid;place-items:center;width:23px;height:23px;border-radius:50%;font:700 13.5px/1 var(--sk-serif);color:#fff;background:var(--st,#7a52c7);box-shadow:0 0 6px var(--st,#7a52c7)}
body[data-theme="night"] #mmAtlas .mmb-list b{color:#130d20}
#mmAtlas .mmb-list li.wait b{background:transparent;color:var(--st,#7a52c7);box-shadow:inset 0 0 0 1.5px var(--st,#7a52c7)}
#mmAtlas .mmb-list li.off button{opacity:.62;font-style:italic}
#mmAtlas .mmb-list li.on button{background:var(--b-chip);color:var(--b-ink1);font-weight:600}
#mmAtlas .mmb-more{margin:10px 0 0 8px}
/* two stars that disagree */
#mmAtlas .mmb-pair{display:grid;grid-template-columns:minmax(0,1fr) 40px minmax(0,1fr);gap:0;align-items:start;margin:14px 0 6px}
#mmAtlas .mmb-pair small{display:block;margin:0 0 6px;font:600 10px/1 var(--sans,system-ui,sans-serif);letter-spacing:.2em;text-transform:uppercase;color:var(--b-ink3)}
#mmAtlas .mmb-pair p{margin:0;font:600 20px/1.3 var(--sk-serif);color:var(--b-ink1);overflow-wrap:anywhere}
#mmAtlas .mmb-vs{display:grid;place-items:center;padding-top:22px}
#mmAtlas .mmb-vs i{display:grid;place-items:center;width:28px;height:28px;border-radius:50%;font:600 16px/1 var(--sk-serif);font-style:normal;color:var(--b-acc);box-shadow:inset 0 0 0 1.5px var(--b-l1)}
#mmAtlas .mmb-ask{margin:10px 0 0;font:italic 600 17px/1.3 var(--sk-serif);color:var(--b-ink2)}
/* writing a fact: changing one, or adding one to the plate */
#mmAtlas .mmb-ed{margin:14px 0 0}
#mmAtlas .mmb-ed label{display:block;margin:0 0 8px;font:600 10.5px/1 var(--sans,system-ui,sans-serif);letter-spacing:.24em;text-transform:uppercase;color:var(--b-ink3)}
#mmAtlas .mmb-ed textarea{display:block;width:100%;box-sizing:border-box;min-height:104px;resize:vertical;margin:0;padding:12px 14px;border-radius:14px;font:600 20px/1.35 var(--sk-serif);color:var(--b-ink1)}
/* the plate's foot: the legend, and its keys */
#mmAtlas .mmb-foot{display:flex;align-items:center;gap:22px;margin-top:26px;padding-top:18px;border-top:1px solid var(--b-l2);flex-wrap:wrap}
#mmAtlas .mmb-lg{display:flex;align-items:center;gap:7px;font:italic 500 15px/1 var(--sk-serif);color:var(--b-ink3)}
#mmAtlas .mmb-lg svg{width:16px;height:16px;overflow:visible}
#mmAtlas .mmb-foot .mmb-sp{flex:1 1 auto}
#mmAtlas .mmb-key2{position:relative;display:inline-flex;align-items:center;gap:7px;min-height:34px;padding:7px 14px;border-radius:11px;border:1px solid var(--sk-hair,rgba(34,26,46,.1));
  background:linear-gradient(var(--sk-keyA,#fff),var(--sk-keyB,#f6f2fb));color:var(--b-ink1);font:600 12.8px/1.2 var(--sans,system-ui,sans-serif);cursor:pointer;
  box-shadow:var(--sk-key);transition:transform .16s cubic-bezier(.34,1.35,.64,1),box-shadow .16s ease}
#mmAtlas .mmb-key2:hover{transform:translateY(-2px);box-shadow:var(--sk-keyhi)}
#mmAtlas .mmb-key2:active{transform:translateY(1px);box-shadow:var(--sk-press);transition-duration:.06s}
#mmAtlas .mmb-key2:focus-visible{outline:2.5px solid var(--b-acc);outline-offset:3px}
#mmAtlas .mmb-key2.primary{background:linear-gradient(var(--sk-pa,#7a50c6),var(--sk-pb,#5d37a1));border-color:transparent;color:#fff;
  box-shadow:inset 0 1px 0 rgba(255,255,255,.16),0 2px 0 var(--sk-pedge,#3a2070),0 4px 6px rgba(40,22,68,.24),0 9px 16px rgba(40,22,68,.16)}
#mmAtlas .mmb-key2 svg{width:15px;height:15px}
#mmAtlas .mmb-empty{font:italic 500 18px/1.5 var(--sk-serif);color:var(--b-ink3)}
/* the back of the plate: how it is kept */
#mmAtlas .mmb-back{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:26px;margin-top:22px;align-items:start}
#mmAtlas .mmb-col{display:grid;gap:10px;min-width:0}
#mmAtlas .mmb-col h4{margin:0 0 4px;font:600 21px/1.15 var(--sk-serif);color:var(--b-ink1)}
#mmAtlas .mmb-col p{margin:2px 0 0;font:500 12.8px/1.5 var(--sans,system-ui,sans-serif);color:var(--b-ink2)}
#mmAtlas .mmb-sw{position:relative;display:grid;grid-template-columns:minmax(0,1fr) auto;gap:12px;align-items:center;width:100%;margin:0;padding:11px 13px;border:0;border-radius:13px;cursor:pointer;text-align:left;
  font:500 13.5px/1.35 var(--sans,system-ui,sans-serif);color:var(--b-ink1);background:transparent;box-shadow:inset 0 0 0 1px var(--b-l2);
  transition:transform .32s cubic-bezier(.34,1.35,.64,1),box-shadow .22s,background .22s}
#mmAtlas .mmb-sw:hover{transform:translateY(-3px);background:var(--b-p0);box-shadow:inset 0 0 0 1px var(--b-l2),0 3px 0 rgba(40,22,68,.06),0 10px 18px rgba(40,22,68,.12)}
body[data-theme="night"] #mmAtlas .mmb-sw:hover{box-shadow:inset 0 0 0 1px var(--b-l2),0 3px 0 rgba(0,0,0,.5),0 10px 18px rgba(0,0,0,.45)}
#mmAtlas .mmb-sw:focus-visible{outline:2px solid var(--b-acc);outline-offset:2px}
#mmAtlas .mmb-sw i{position:relative;display:block;width:42px;height:24px;border-radius:999px;background:var(--b-well);box-shadow:inset 0 1px 3px rgba(40,22,68,.25),0 0 0 1px var(--b-l2);transition:background .25s ease}
#mmAtlas .mmb-sw i::after{content:"";position:absolute;top:3px;left:3px;width:18px;height:18px;border-radius:50%;background:linear-gradient(#ffffff,#e7e1ef);box-shadow:0 2px 0 rgba(40,22,68,.25),0 3px 6px rgba(40,22,68,.25);transition:left .34s cubic-bezier(.34,1.56,.64,1)}
#mmAtlas .mmb-sw[aria-checked="true"] i{background:var(--b-on);box-shadow:0 2px 0 #3a2070}
#mmAtlas .mmb-sw[aria-checked="true"] i::after{left:21px;box-shadow:0 2px 0 #3a2070,0 0 10px rgba(201,179,242,.7)}
#mmAtlas .mmb-never{list-style:none;margin:0;padding:0;display:grid;gap:8px}
#mmAtlas .mmb-never li{display:flex;align-items:center;gap:9px;font:500 13.5px/1.3 var(--sans,system-ui,sans-serif);color:var(--b-ink1)}
#mmAtlas .mmb-never svg{width:15px;height:15px;flex:0 0 auto;color:var(--b-acc)}
@media (max-width:1180px){#mmAtlas .mmb-body{grid-template-columns:minmax(0,1fr)}#mmAtlas .mmb-chart{margin:0 auto}#mmAtlas .mmb-back{grid-template-columns:minmax(0,1fr)}}
@media (max-width:700px){#mmAtlas .mmb-find{width:100%;margin-left:0}#mmAtlas .mmb-list{grid-template-columns:minmax(0,1fr)}#mmAtlas .mmb-plate{padding:26px 22px}
  #mmAtlas .mmb-ph h3{font-size:28px}#mmAtlas .mmb-ft{font-size:22px}#mmAtlas .mmb-pair{grid-template-columns:minmax(0,1fr)}#mmAtlas .mmb-vs{padding:8px 0;justify-items:start}}
body[data-motion="minimal"] #mmAtlas *,body[data-motion="minimal"] #mmAtlas .mmb-plate{animation:none!important;transition:none!important}
@media (prefers-reduced-motion:reduce){#mmAtlas *,#mmAtlas .mmb-plate{animation:none!important;transition:none!important}}
</style>
<script>try{(window.__ingParts=window.__ingParts||{})["p406"]="started";}catch(_){}
/* R406 · Memoria: the atlas of what Ingenium knows: see the note at the top of its styles. window.IngAtlas */
(function r406(){
"use strict";
if(window.IngAtlas)return;
var W=window,D=document,T0=Date.now();
/* each app's colour, as the head (r392) gives its star: by its place among her folders */
var PAL=[["#7a52c7","#d2b8ff"],["#5c9bd6","#a9d0f5"],["#3c8c86","#8fdcd3"],["#4a63a6","#aab9ef"],["#b38a4e","#efd29e"],["#6f79dc","#b7bdff"],["#b0578f","#f0b3d8"],["#5d8a4e","#b9e3a6"]];
var SRC={her:"Your words",folder:"Its folder",fabrica:"Fabrica",chat:"A chat",memory:"A memory",lector:"Lector",vocatio:"Vocatio"};
var ROMAN=["I","II","III","IV","V","VI","VII","VIII","IX","X","XI","XII","XIII","XIV","XV","XVI","XVII","XVIII","XIX","XX"];
/* what is never kept (r405's, as she answered): refused from any source but her own words */
var NEVER_RE=/\b(pass(word|code|phrase)s?|pin code|one-time code|verification code|api[ -]?keys?|secret keys?|private keys?|recovery words|sk-[a-z0-9]{8,}|iban|sort code|account number|card number|cvv|committee code)\b/i;
var OPEN=null,PREV=null,FOCUS=null,Q="",MODE="front",EDIT=null,ADDING=false,ALL=false,ENTER=false,BUSY=0,SEEN={};
var KEYP="ing.memoria.plate";
try{var s0=W.localStorage.getItem(KEYP);if(s0&&s0!=="find")OPEN=s0;}catch(e){}
function mk(t,c,x){var e=D.createElement(t);if(c)e.className=c;if(x!=null)e.textContent=x;return e;}
function svg(d){return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">'+d+'</svg>';}
var ICO={find:'<circle cx="11" cy="11" r="6.5"/><path d="M20 20l-4.3-4.3"/>',add:'<path d="M12 5v14M5 12h14"/>',rules:'<path d="M4 7h10M18 7h2M4 17h4M12 17h8"/><circle cx="16" cy="7" r="2"/><circle cx="10" cy="17" r="2"/>',
  back:'<path d="M15 6l-6 6 6 6"/>',lock:'<rect x="5" y="10.5" width="14" height="9.5" rx="2"/><path d="M8 10.5V8a4 4 0 0 1 8 0v2.5"/>',keep:'<path d="M5 12.5l4.5 4.5L19 7.5"/>'};
function night(){try{return D.body.getAttribute("data-theme")==="night";}catch(e){return false;}}
function hasFabrica(){return !!D.getElementById("page-fabrica");}
function folders(){try{return W.IngFolders&&IngFolders.folders?IngFolders.folders()||[]:[];}catch(e){return [];}}
function norm(s){return String(s||"").toLowerCase().replace(/\s+/g," ").trim();}
function hash(s){var h=2166136261;s=String(s);for(var i=0;i<s.length;i++){h^=s.charCodeAt(i);h=Math.imul(h,16777619);}return h>>>0;}
function rnd(seed){var x=seed||1;return function(){x^=x<<13;x^=x>>>17;x^=x<<5;return ((x>>>0)%10000)/10000;};}
function K(){try{return W.IngKnow&&IngKnow.store?IngKnow.store():null;}catch(e){return null;}}
function save(){try{W.saveState();}catch(e){}}
function toast(m){try{if(typeof W.ingToast==="function")W.ingToast(m);else if(typeof W.toast==="function")W.toast(m);}catch(e){}}
function col(p){return p&&p.col?(night()?p.col[1]:p.col[0]):(night()?"#d2b8ff":"#7a52c7");}
function plates(){var A=folders(),out=[{k:"wait",name:"Waiting for you"},{k:"me",name:"You",col:PAL[0]}];
  A.forEach(function(a,i){out.push({k:IngKnow.appKey(a.name),name:a.name,col:PAL[i%PAL.length]});});return out;}
function plateOf(f){var P=plates();for(var i=0;i<P.length;i++)if(P[i].k===f.about)return P[i];return null;}
/* her memories from her chats (r271) are stars on her plate too */
function mems(){try{var m=W.memState?W.memState():null;return (m&&m.items||[]).filter(function(it){return it&&it.text;}).map(function(it){return {id:"mem:"+it.id,mid:it.id,about:"me",t:it.text,src:{k:"memory"},at:it.at||0,st:"kept",mem:true};});}catch(e){return [];}}
function facts(){var k=K();return (k?k.facts.slice():[]).concat(mems());}
function onPlate(p,F){if(p.k==="wait")return F.filter(function(f){return f.st==="waiting";});
  if(p.k==="find"){var q=norm(Q);return F.filter(function(f){var pl=plateOf(f);return norm(f.t+" "+(pl?pl.name:"")).indexOf(q)>=0;}).sort(function(a,b){return (a.st==="waiting")-(b.st==="waiting");});}
  var rank=function(f){return f.st==="waiting"?3:f.off?2:(f.src&&f.src.k==="her"?0:1);};
  return F.filter(function(f){return f.about===p.k;}).sort(function(a,b){return rank(a)-rank(b)||(a.at||0)-(b.at||0);});}
function when(t){try{return t?new Date(t).toLocaleDateString("en-GB",{day:"numeric",month:"short",year:"numeric"}):"";}catch(e){return "";}}
function stamp(f){var k=(f.src&&f.src.k)||"chat";if(!SRC[k])k="chat";var s=mk("span","mmb-stamp",SRC[k]);s.setAttribute("data-k",k);return s;}
function starPath(s){var c=s*.16;return "M0,"+(-s)+"C"+c+","+(-c)+" "+c+","+(-c)+" "+s+",0C"+c+","+c+" "+c+","+c+" 0,"+s+"C"+(-c)+","+c+" "+(-c)+","+c+" "+(-s)+",0C"+(-c)+","+(-c)+" "+(-c)+","+(-c)+" 0,"+(-s)+"Z";}
function esc(s){return String(s).replace(/[&<>"']/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#39;"}[c];});}
/* ---------- how often each fact went with a chat this week, counted from the replies (each keeps the facts it was given, r390) ---------- */
function chatTime(c){var t=parseInt(String(c&&c.id||"").replace(/^c/,""),36);return isFinite(t)&&t>1e12&&t<4e12?t:0;}
function uses(){var out={},since=Date.now()-7*864e5;try{(W.state.chats||[]).forEach(function(c){(c.messages||[]).forEach(function(m){if(!m||m.role!=="bot")return;
      var ids=[].concat(m.know||[],m.knowF||[]);if(!ids.length)return;var t=m.done||m.at||chatTime(c);if(!t||t<since)return;ids.forEach(function(id){(out[id]=out[id]||{})[c.id]=1;});});});}catch(e){}
  var n={};Object.keys(out).forEach(function(k){n[k]=Object.keys(out[k]).length;});return n;}
/* ---------- which models may read it (r405's, as she answered: all may, and she chooses) ---------- */
function readers(){var k=K();if(!k)return {};k.opts=k.opts||{};if(!k.opts.readers||typeof k.opts.readers!=="object")k.opts.readers={};return k.opts.readers;}
function curModel(){try{return (W.Engine&&Engine.modelId)||(W.state&&W.state.activeModelId)||"";}catch(e){return "";}}
function allowed(){var R=readers(),id=curModel();return !(id&&R[id]===false);}
function models(){try{return (W.state.models||[]).filter(function(m){return m&&(m.fileState==="ready"||m.nativeId||m.builtinDesk||m.shellStored);});}catch(e){return [];}}
/* the memory layer (her memories and the facts, r271 and r390) goes to a model she has not turned off; wrapped over r390's own */
function gate(){var L=W.memLayer;if(typeof L!=="function"||L.__r406)return;if(!L.__r390&&Date.now()-T0<60000)return;
  var n=function(){if(!allowed())return "";return L.apply(this,arguments);};n.__r406=1;n.__r390=1;W.memLayer=n;try{memLayer=n;}catch(e){}}
/* a chat in an app's folder is given all of that app's kept facts (r390): to a model she has not turned off, and the reply keeps which */
function folderGate(){var FF=W.IngFolderFab;if(!FF||typeof FF.lines!=="function"||FF.__r406||!FF.__r390)return;var ol=FF.lines;
  FF.lines=function(p){var r=ol.apply(this,arguments)||"";try{if(!allowed()){var i=r.indexOf("What Ingenium knows about ");if(i>=0)r=r.slice(0,i).replace(/\s+$/,"");}
      else if(p&&p.name&&W.IngKnow){var L=IngKnow.of(IngKnow.appKey(p.name),"kept").filter(function(f){return !f.off;}),msgs=W.curMsgs?W.curMsgs():[],last=msgs[msgs.length-1];
        if(L.length&&last&&last.role==="bot"&&last.live){var have=Array.isArray(last.knowF)?last.knowF:[];L.forEach(function(f){if(have.indexOf(f.id)<0)have.push(f.id);});last.knowF=have;}}}catch(e){}return r;};FF.__r406=1;}
/* what she never wants kept: refused from any source but her own words, and let go if it came before this part */
function guard(){var KN=W.IngKnow;if(!KN||KN.__r406g)return;var oAdd=KN.add;KN.add=function(about,t,src){if(!(src&&src.k==="her")&&NEVER_RE.test(String(t||"")))return null;return oAdd.apply(KN,arguments);};KN.__r406g=1;}
function sweep(){var k=K();if(!k)return;k.facts.filter(function(f){return !(f.src&&f.src.k==="her")&&NEVER_RE.test(f.t||"");}).forEach(function(f){try{IngKnow.drop(f.id);}catch(e){}});}
/* ---------- the chart ---------- */
function place(L){var n=L.length,r=rnd(hash(L.map(function(f){return f.id;}).join("|"))||7),out=[];
  L.forEach(function(f,i){var kind=f.st==="waiting"?2:(f.src&&f.src.k==="her"?0:1),a=(-100+i*(360/Math.max(n,1))+(r()-.5)*(n>1?18:0))*Math.PI/180,
    R=kind===0?58+r()*36:kind===1?100+r()*36:128+r()*22;out.push({f:f,kind:kind,x:200+R*Math.cos(a),y:200+R*Math.sin(a),a:a});});return out;}
function chart(p,L){var host=D.getElementById("mmAtlas"),cs=host?getComputedStyle(host):null,v=function(n,d){var x=cs?cs.getPropertyValue(n).trim():"";return x||d;};
  var c=col(p),l1=v("--b-l1","rgba(74,42,134,.4)"),l2=v("--b-l2","rgba(74,42,134,.16)"),dot=v("--b-dot","rgba(74,42,134,.55)"),ring=night()?"#d2b8ff":"#6a3fb5",gid="mmbG"+hash(p.k);
  var s='<svg class="mmb-chart" viewBox="0 0 400 400" role="group" aria-label="'+esc((p.k==="find"?"What was found":p.name)+": its stars")+'">';
  s+='<defs><radialGradient id="'+gid+'"><stop offset="0" stop-color="#fff" stop-opacity=".9"/><stop offset=".25" stop-color="'+c+'" stop-opacity=".55"/><stop offset="1" stop-color="'+c+'" stop-opacity="0"/></radialGradient>'
    +'<radialGradient id="'+gid+'v"><stop offset="0" stop-color="#fff" stop-opacity=".9"/><stop offset=".25" stop-color="'+ring+'" stop-opacity=".5"/><stop offset="1" stop-color="'+ring+'" stop-opacity="0"/></radialGradient></defs>';
  s+='<circle cx="200" cy="200" r="190" fill="none" stroke="'+l1+'" stroke-width="1.4"/><circle cx="200" cy="200" r="183" fill="none" stroke="'+l2+'" stroke-width=".9"/>';
  for(var a=0;a<360;a+=5){var t=a*Math.PI/180,r0=183,r1=a%30===0?172:a%15===0?176:179;s+='<line x1="'+(200+r0*Math.cos(t)).toFixed(1)+'" y1="'+(200+r0*Math.sin(t)).toFixed(1)+'" x2="'+(200+r1*Math.cos(t)).toFixed(1)+'" y2="'+(200+r1*Math.sin(t)).toFixed(1)+'" stroke="'+l1+'" stroke-width="'+(a%30===0?1:.6)+'"/>';}
  for(a=0;a<360;a+=30){t=(a-90)*Math.PI/180;s+='<text class="deg" x="'+(200+163*Math.cos(t)).toFixed(1)+'" y="'+(200+163*Math.sin(t)+3).toFixed(1)+'" text-anchor="middle">'+a+'</text>';}
  s+='<circle cx="200" cy="200" r="120" fill="none" stroke="'+l2+'" stroke-dasharray="1.5 4"/><circle cx="200" cy="200" r="62" fill="none" stroke="'+l2+'" stroke-dasharray="1.5 4"/>';
  for(a=0;a<360;a+=30){t=a*Math.PI/180;s+='<line x1="'+(200+24*Math.cos(t)).toFixed(1)+'" y1="'+(200+24*Math.sin(t)).toFixed(1)+'" x2="'+(200+154*Math.cos(t)).toFixed(1)+'" y2="'+(200+154*Math.sin(t)).toFixed(1)+'" stroke="'+l2+'" stroke-width=".6"/>';}
  s+='<ellipse cx="200" cy="200" rx="148" ry="56" fill="none" stroke="'+l2+'" stroke-dasharray="3 5" transform="rotate(-18 200 200)"/>';
  var r=rnd(hash(p.k)||3);for(var i=0;i<74;i++){var ang=r()*Math.PI*2,rr=Math.sqrt(r())*150;s+='<circle class="'+(i%5===0?"tw":"")+'" cx="'+(200+rr*Math.cos(ang)).toFixed(1)+'" cy="'+(200+rr*Math.sin(ang)).toFixed(1)+'" r="'+(.45+r()*.8).toFixed(2)+'" fill="'+dot+'" opacity="'+(.35+r()*.45).toFixed(2)+'" style="animation-delay:'+(-r()*3).toFixed(2)+'s"/>';}
  var P=place(L),mixed=p.k==="wait"||p.k==="find";
  if(P.length>1&&!mixed){var o=P.filter(function(q){return !q.f.off;}).sort(function(a,b){return a.a-b.a;});if(o.length>1)s+='<polyline points="'+o.map(function(q){return q.x.toFixed(1)+","+q.y.toFixed(1);}).join(" ")+'" fill="none" stroke="'+c+'" stroke-opacity=".5" stroke-width="1.1"/>';}
  P.forEach(function(q,i){var f=q.f,pl=mixed?plateOf(f):p,cc=mixed?col(pl):c,g2=mixed?(pl&&pl.k==="me"||!pl?gid+"v":gid+"v"):gid,sz=q.kind===0?9:q.kind===1?6.5:5.5,on=FOCUS===f.id;
    s+='<g class="mmb-s'+(f.off?" off":"")+'" data-id="'+esc(f.id)+'" role="button" tabindex="-1" aria-label="'+esc("Star "+(i+1)+": "+f.t)+'" transform="translate('+q.x.toFixed(1)+' '+q.y.toFixed(1)+')">';
    if(on)s+='<circle r="17" fill="none" stroke="'+ring+'" stroke-width="1.6"/><circle class="mmb-spin" r="23" fill="none" stroke="'+ring+'" stroke-width="1" stroke-dasharray="3 5"/>';
    if(q.kind<2)s+='<circle r="'+(sz*2.3).toFixed(1)+'" fill="url(#'+g2+')"/><path class="core" d="'+starPath(sz)+'" fill="'+cc+'"/><circle r="'+(sz*.24).toFixed(2)+'" fill="#fff"/>';
    else s+='<circle class="core" r="5.2" fill="'+(night()?"#130d20":"#fffdf9")+'" stroke="'+cc+'" stroke-width="1.6"/>';
    s+='<text class="num" x="'+(sz+6)+'" y="'+(-sz-2)+'">'+(i+1)+'</text></g>';
    /* a fact that disagrees with her words: her own star beside it, a double star */
    if(f.clash&&f.st==="waiting")s+='<g transform="translate('+(q.x-18).toFixed(1)+' '+(q.y+14).toFixed(1)+')"><circle r="14" fill="url(#'+g2+')"/><path d="'+starPath(7)+'" fill="'+cc+'"/><circle r="1.7" fill="#fff"/></g><line x1="'+(q.x-12).toFixed(1)+'" y1="'+(q.y+9).toFixed(1)+'" x2="'+(q.x-4).toFixed(1)+'" y2="'+(q.y+3).toFixed(1)+'" stroke="'+cc+'" stroke-width="1" stroke-dasharray="2 2"/>';});
  return s+'</svg>';}
/* ---------- the key ---------- */
function w(t,fn){var b=mk("button","mmb-w",t);b.type="button";b.addEventListener("click",function(e){e.stopPropagation();fn(b);});return b;}
function key2(t,primary,fn,ico){var b=mk("button","mmb-key2"+(primary?" primary":""));b.type="button";b.innerHTML=(ico?svg(ICO[ico]):"")+esc(t);b.addEventListener("click",function(e){e.stopPropagation();fn(b);});return b;}
function heard(){try{if(W.IngSound&&IngSound.tick)IngSound.tick();}catch(e){}}
function usedLine(f,U){if(f.mem)return "Remembered from your chats; it goes with each message as From your chats says.";
  if(f.st==="waiting")return "Learned on "+when(f.at)+"; no chat is given it until you keep it.";
  if(f.off)return "Left out: it stays on this plate, and no model is given it.";
  var n=U[f.id]||0;return n?"Used in "+n+" chat"+(n===1?"":"s")+" this week.":"Not used in a chat this week.";}
function focusBlock(p,f,n,U){var box=mk("div","mmb-focus"),h=mk("div","mmb-fh"),mixed=p.k==="wait"||p.k==="find",pl=plateOf(f);
  h.appendChild(mk("span","mmb-no","Star "+n+(mixed?" · "+(pl?pl.name:"About you"):"")));h.appendChild(stamp(f));h.appendChild(mk("span","mmb-date",when(f.at)));box.appendChild(h);
  /* changing a fact */
  if(EDIT===f.id){var ed=mk("div","mmb-ed"),lb=mk("label",null,"Change this fact"),ta=mk("textarea");ta.id="mmbEdit";ta.value=f.t;ta.maxLength=600;lb.htmlFor="mmbEdit";ed.appendChild(lb);ed.appendChild(ta);box.appendChild(ed);
    var ek=mk("div","mmb-fk");ek.appendChild(key2("Save it",true,function(){var v=ta.value.trim();if(!v)return;IngKnow.edit(f.id,v);EDIT=null;heard();paint();}));ek.appendChild(w("Cancel",function(){EDIT=null;paint();}));box.appendChild(ek);
    setTimeout(function(){try{ta.focus();ta.setSelectionRange(ta.value.length,ta.value.length);}catch(e){}},30);return box;}
  /* a fact that disagrees with hers */
  if(f.clash&&f.st==="waiting"){var pr=mk("div","mmb-pair"),a=mk("div"),b=mk("div");a.appendChild(mk("small",null,"You said"));a.appendChild(mk("p",null,f.clash));
    b.appendChild(mk("small",null,(f.src&&f.src.k==="folder")?"Its folder says":(f.src&&f.src.k==="fabrica")?"Fabrica says":"It learned"));b.appendChild(mk("p",null,f.t));
    var vs=mk("div","mmb-vs");vs.innerHTML="<i>&#8800;</i>";pr.appendChild(a);pr.appendChild(vs);pr.appendChild(b);box.appendChild(pr);box.appendChild(mk("p","mmb-ask","These two disagree. Which is right?"));
    var k=mk("div","mmb-fk");
    k.appendChild(key2("Keep mine",true,function(){IngKnow.drop(f.id);FOCUS=null;heard();toast("Your words stay; the other is let go.");paint();}));
    k.appendChild(key2("Keep the new one",false,function(){var kk=K(),her=kk?kk.facts.filter(function(x){return x.about===f.about&&x.st==="kept"&&x.src&&x.src.k==="her"&&x.t===f.clash;})[0]:null;
      IngKnow.keep(f.id);if(her)IngKnow.drop(her.id);heard();toast("The new fact is kept in place of yours.");paint();}));
    k.appendChild(key2("Keep both",false,function(){IngKnow.keep(f.id);heard();paint();}));box.appendChild(k);return box;}
  var ft=mk("p","mmb-ft"+(f.t.length>150?" long":"")+(f.off?" off":""),f.t);box.appendChild(ft);box.appendChild(mk("div","mmb-fm",usedLine(f,U)));
  var k2=mk("div","mmb-fk");
  if(f.mem){k2.appendChild(w("Open it in From your chats",function(){try{if(W.IngMemoria)IngMemoria.show("chats",true);}catch(e){}}));}
  else if(f.st==="waiting"){k2.appendChild(key2("Keep",true,function(){IngKnow.keep(f.id);heard();paint();},"keep"));k2.appendChild(w("Not this",function(){IngKnow.drop(f.id);FOCUS=null;paint();}));}
  else{k2.appendChild(w("Edit",function(){EDIT=f.id;ADDING=false;paint();}));
    k2.appendChild(w(f.off?"Use it again":"Leave out",function(){var x=K(),g=null;if(x)x.facts.forEach(function(y){if(y.id===f.id)g=y;});if(!g)return;if(g.off)delete g.off;else g.off=true;save();heard();paint();}));}
  box.appendChild(k2);return box;}
function addBlock(p){var box=mk("div","mmb-focus"),ed=mk("div","mmb-ed"),lb=mk("label",null,p.k==="me"?"Something Ingenium should know about you":"A new fact about "+p.name),ta=mk("textarea");ta.id="mmbAdd";ta.maxLength=600;lb.htmlFor="mmbAdd";
  ta.placeholder=p.k==="me"?"In your own words":"In your own words: what it is, how it is built, a decision";ed.appendChild(lb);ed.appendChild(ta);box.appendChild(ed);
  var k=mk("div","mmb-fk");k.appendChild(key2("Add it",true,function(){var v=ta.value.trim();if(!v)return;var f=IngKnow.add(p.k,v,{k:"her",label:"yours"});
    if(!f){toast("That fact is already on this plate.");return;}ADDING=false;FOCUS=f.id;heard();paint();},"add"));k.appendChild(w("Cancel",function(){ADDING=false;paint();}));box.appendChild(k);
  setTimeout(function(){try{ta.focus();}catch(e){}},30);return box;}
/* ---------- the back of the plate: how it is kept ---------- */
function sw(label,on,set){var b=mk("button","mmb-sw");b.type="button";b.setAttribute("role","switch");b.setAttribute("aria-checked",on?"true":"false");b.appendChild(mk("span",null,label));b.appendChild(mk("i"));
  b.addEventListener("click",function(){var v=b.getAttribute("aria-checked")!=="true";b.setAttribute("aria-checked",v?"true":"false");set(v);save();heard();});return b;}
function back(pl){var k=K(),o=(k&&k.opts)||{},fab=hasFabrica(),ph=mk("header","mmb-ph");ph.appendChild(mk("span","mmb-pno","The back of the plate"));ph.appendChild(mk("h3",null,"How it is kept"));
  ph.appendChild(mk("i",null,"what Ingenium learns, what it never keeps, and which models may read it"));pl.appendChild(ph);
  var g=mk("div","mmb-back"),c1=mk("section","mmb-col"),c2=mk("section","mmb-col"),c3=mk("section","mmb-col");
  c1.appendChild(mk("h4",null,"How it learns"));
  c1.appendChild(sw(fab?"Learn from my folders and from Fabrica":"Learn from my folders",o.learn!==false,function(v){o.learn=v;}));
  c1.appendChild(sw("Ask me before keeping what it learns",o.ask!==false,function(v){o.ask=v;}));
  c1.appendChild(sw("When I am away, offer to bring my folders up to date; I choose which",o.auto!==false,function(v){o.auto=v;}));  /* 8.14: it asks first (r390, r421) */
  c1.appendChild(mk("p",null,"What it learns waits on the Waiting plate until you keep it, unless you turn asking off."));
  c2.appendChild(mk("h4",null,"Never kept"));var ul=mk("ul","mmb-never");
  var never=["Passwords and codes","Keys of every kind"].concat(folders().some(function(a){return norm(a.name)==="carpe diem";})?["The committee code"]:[]).concat(["Money","Other people's details"]);
  never.forEach(function(x){var li=mk("li");li.innerHTML=svg(ICO.lock);li.appendChild(D.createTextNode(x));ul.appendChild(li);});c2.appendChild(ul);
  c2.appendChild(mk("p",null,"What it learns from your chats leaves these out, and a fact from "+(fab?"a folder or Fabrica":"a folder")+" that holds a password, a code, a key, or a card or account number is let go at once. Only what you write yourself is kept as you wrote it."));
  c3.appendChild(mk("h4",null,"Which models may read it"));var R=readers(),ML=models();
  if(!ML.length)c3.appendChild(mk("p",null,"Your models appear here once one is ready on this device."));
  ML.forEach(function(m){c3.appendChild(sw(m.customName||m.name||m.fileName||"A model",R[m.id]!==false,function(v){R[m.id]=v;}));});
  c3.appendChild(mk("p",null,"A model you turn off is given no fact and no memory when it answers."));
  g.appendChild(c1);g.appendChild(c2);g.appendChild(c3);pl.appendChild(g);
  var ft=mk("div","mmb-foot");ft.appendChild(mk("span","mmb-sp"));ft.appendChild(key2("Back to the plate",true,function(){flip("front");},"back"));pl.appendChild(ft);}
/* ---------- painting ---------- */
function paint(){var host=D.getElementById("mmAtlas");if(!host||BUSY)return;var k=K();if(!k)return;sweep();
  var F=facts(),PL=plates(),U=uses(),keep=D.activeElement&&D.activeElement.id==="mmbFind",caret=keep?D.activeElement.selectionStart:0;
  if(!OPEN||(OPEN!=="find"&&!PL.some(function(p){return p.k===OPEN;}))){OPEN=onPlate(PL[0],F).length?"wait":"me";}
  if(OPEN==="find"&&!Q.trim())OPEN=PREV||"me";
  host.innerHTML="";
  /* the thumb index */
  var idx=mk("nav","mmb-idx");idx.setAttribute("role","tablist");idx.setAttribute("aria-label","The plates of the atlas");
  PL.forEach(function(p){var L=onPlate(p,F),b=mk("button","mmb-med");b.type="button";b.setAttribute("role","tab");b.setAttribute("data-k",p.k);var on=OPEN===p.k;b.setAttribute("aria-selected",on?"true":"false");b.tabIndex=on||(OPEN==="find"&&p.k==="me")?0:-1;
    b.title=p.k==="wait"?(L.length?L.length+" to keep or let go":"Nothing waits for you"):p.name+": "+L.length+" star"+(L.length===1?"":"s");
    var d=mk("span","mmb-disc");d.style.setProperty("--st",col(p));if(p.k==="wait")d.appendChild(mk("b",null,String(L.length)));else d.innerHTML='<svg viewBox="-12 -12 24 24" aria-hidden="true"><path d="'+starPath(10)+'" fill="'+col(p)+'"/></svg>';
    b.appendChild(d);b.appendChild(mk("span","mmb-nm",p.k==="wait"?"Waiting":p.name));
    b.addEventListener("click",function(){choose(p.k,b);});idx.appendChild(b);});
  idx.addEventListener("keydown",function(e){var ks=[].slice.call(idx.querySelectorAll(".mmb-med")),i=ks.indexOf(D.activeElement);if(i<0)return;var j=e.key==="ArrowRight"?i+1:e.key==="ArrowLeft"?i-1:e.key==="Home"?0:e.key==="End"?ks.length-1:-9;
    if(j===-9)return;e.preventDefault();j=(j+ks.length)%ks.length;choose(ks[j].getAttribute("data-k"),null);var n=D.querySelector('#mmAtlas .mmb-med[data-k="'+ks[j].getAttribute("data-k").replace(/"/g,'\\"')+'"]');if(n)n.focus();});
  var fd=mk("label","mmb-find");fd.innerHTML=svg(ICO.find);var inp=mk("input");inp.type="search";inp.id="mmbFind";inp.placeholder="Find a fact on every plate";inp.value=Q;inp.setAttribute("aria-label","Find a fact on every plate");inp.autocomplete="off";
  inp.addEventListener("input",function(){if(OPEN!=="find")PREV=OPEN;Q=inp.value;OPEN=Q.trim()?"find":(PREV||"me");FOCUS=null;EDIT=null;ADDING=false;MODE="front";paint();});
  inp.addEventListener("keydown",function(e){if(e.key==="Escape"){Q="";OPEN=PREV||"me";paint();}});fd.appendChild(inp);idx.appendChild(fd);host.appendChild(idx);
  /* the plate */
  var p=OPEN==="find"?{k:"find",name:"“"+Q.trim()+"”"}:PL.filter(function(x){return x.k===OPEN;})[0],L=onPlate(p,F),no=PL.indexOf(p);
  if(!FOCUS||!L.some(function(f){return f.id===FOCUS;}))FOCUS=L.length?L[0].id:null;
  var pl=mk("section","mmb-plate"+(ENTER?" enter":""));ENTER=false;pl.setAttribute("aria-live","polite");
  if(MODE==="back"){back(pl);host.appendChild(pl);return;}
  var ph=mk("header","mmb-ph");ph.appendChild(mk("span","mmb-pno",p.k==="find"?"Found on every plate":"Plate "+(ROMAN[no]||String(no+1))));ph.appendChild(mk("h3",null,p.k==="wait"?"Waiting for you":p.name));
  var kept=L.filter(function(f){return f.st==="kept"&&!f.off;}).length,wt=L.filter(function(f){return f.st==="waiting";}).length,off=L.filter(function(f){return f.off;}).length;
  ph.appendChild(mk("i",null,p.k==="wait"?(L.length?L.length+" new star"+(L.length===1?"":"s")+" to keep or let go":"Nothing waits for you"):p.k==="find"?(L.length?L.length+" star"+(L.length===1?"":"s")+" found":"Nothing found"):
    (p.k==="me"?"what Ingenium knows of you":"what Ingenium knows of it")+" · "+kept+" star"+(kept===1?"":"s")+(wt?", "+wt+" waiting":"")+(off?", "+off+" left out":"")));pl.appendChild(ph);
  var body=mk("div","mmb-body"),ch=mk("div");ch.innerHTML=chart(p,L);body.appendChild(ch);var ky=mk("div","mmb-key");
  if(ADDING&&p.k!=="wait"&&p.k!=="find")ky.appendChild(addBlock(p));
  if(!L.length){if(!ADDING)ky.appendChild(mk("p","mmb-empty",p.k==="wait"?"Nothing waits for you. What Ingenium learns comes here first.":p.k==="find"?"Nothing on any plate holds those words.":"No star on this plate yet. Add a fact, and it is the first."));}
  else{var fi=0;L.forEach(function(f,i){if(f.id===FOCUS)fi=i;});if(!ADDING)ky.appendChild(focusBlock(p,L[fi],fi+1,U));ky.appendChild(mk("span","mmb-lh","The key"));var ol=mk("ol","mmb-list"),cap=ALL?L.length:12;
    L.forEach(function(f,i){if(i>=cap&&f.id!==FOCUS)return;var li=mk("li",(f.st==="waiting"?"wait":"")+(f.off?" off":"")+(f.id===FOCUS?" on":"")),bt=mk("button");bt.type="button";bt.title=f.t;
      var nb=mk("b",null,String(i+1));nb.style.setProperty("--st",(p.k==="wait"||p.k==="find")?col(plateOf(f)):col(p));bt.appendChild(nb);bt.appendChild(mk("span",null,f.t));
      bt.addEventListener("click",function(){FOCUS=f.id;EDIT=null;ADDING=false;paint();});li.appendChild(bt);ol.appendChild(li);});ky.appendChild(ol);
    if(L.length>12)ky.appendChild(w(ALL?"Show fewer":"Show every star ("+L.length+")",function(){ALL=!ALL;paint();})).classList.add("mmb-more");}
  body.appendChild(ky);pl.appendChild(body);
  /* the foot: the legend and the plate's keys */
  var ft=mk("div","mmb-foot"),c=col(p);[["Your words",'<path d="'+starPath(7.5)+'" fill="'+c+'"/>'],["Learned and kept",'<path d="'+starPath(5)+'" fill="'+c+'"/>'],["Waiting for you",'<circle r="4.6" fill="none" stroke="'+c+'" stroke-width="1.5"/>']]
    .concat(off?[["Left out",'<path d="'+starPath(5)+'" fill="'+c+'" opacity=".36"/>']]:[]).forEach(function(x){var g=mk("span","mmb-lg");g.innerHTML='<svg viewBox="-8 -8 16 16" aria-hidden="true">'+x[1]+'</svg>';g.appendChild(D.createTextNode(x[0]));ft.appendChild(g);});
  ft.appendChild(mk("span","mmb-sp"));
  if(p.k==="wait"){var ok=L.filter(function(f){return !f.clash;});if(ok.length>1)ft.appendChild(key2("Keep all that agree",true,function(){ok.forEach(function(f){IngKnow.keep(f.id);});heard();toast(ok.length+" facts kept.");paint();},"keep"));}
  else if(p.k!=="find")ft.appendChild(key2("Add a fact",true,function(){ADDING=true;EDIT=null;paint();},"add"));
  ft.appendChild(key2("How it is kept",false,function(){flip("back");},"rules"));pl.appendChild(ft);host.appendChild(pl);
  [].forEach.call(host.querySelectorAll(".mmb-s"),function(g){g.addEventListener("click",function(){FOCUS=g.getAttribute("data-id");EDIT=null;ADDING=false;paint();});});
  if(keep){var nq=D.getElementById("mmbFind");if(nq){nq.focus();try{nq.setSelectionRange(caret,caret);}catch(e){}}}}
function choose(k,btn){if(k===OPEN&&MODE==="front"&&!Q)return;OPEN=k;Q="";FOCUS=null;EDIT=null;ADDING=false;ALL=false;MODE="front";ENTER=true;try{W.localStorage.setItem(KEYP,k);}catch(e){}heard();paint();
  var nb=D.querySelector('#mmAtlas .mmb-med[data-k="'+String(k).replace(/"/g,'\\"')+'"]');if(nb&&!(D.body.getAttribute("data-motion")==="minimal")){nb.classList.add("twirl");setTimeout(function(){nb.classList.remove("twirl");},720);}}
/* the plate turns over, and back */
function flip(to){var pl=D.querySelector("#mmAtlas .mmb-plate");var still=D.body.getAttribute("data-motion")==="minimal"||(W.matchMedia&&W.matchMedia("(prefers-reduced-motion: reduce)").matches);
  if(!pl||still){MODE=to;EDIT=null;ADDING=false;paint();return;}BUSY=1;pl.classList.add("flip-out");heard();
  setTimeout(function(){BUSY=0;MODE=to;EDIT=null;ADDING=false;paint();var n=D.querySelector("#mmAtlas .mmb-plate");if(n){n.classList.add("flip-in");setTimeout(function(){n.classList.remove("flip-in");},500);}},240);}
/* ---------- its place in Memoria ---------- */
function mount(){var P=D.getElementById("mmPanel");if(!P)return false;var s=D.getElementById("mmAtlas");
  if(!s){s=mk("section","mm-atlas");s.id="mmAtlas";s.setAttribute("data-mm","knows");s.setAttribute("aria-label","What Ingenium knows: the atlas");P.insertBefore(s,P.firstChild);
    try{if(W.IngMemoria)IngMemoria.show(IngMemoria.room(),false);}catch(e){}paint();}
  else if(s.parentNode!==P){P.insertBefore(s,P.firstChild);}
  return true;}
/* Memoria's line under its room cards says what the room is; the atlas says it itself */
function knowsRoom(){var pg=D.getElementById("page-memoria"),t=D.getElementById("mmT-knows");if(pg)pg.classList.toggle("ma-knows",!!(t&&t.getAttribute("aria-selected")==="true"));}
/* r390 draws its room again after every change to the store: the atlas follows */
function follow(){var kr=D.getElementById("knRoom");if(!kr||kr.__r406)return;kr.__r406=1;var t=0;
  try{new MutationObserver(function(){clearTimeout(t);t=setTimeout(function(){var a=D.activeElement;if(a&&a.closest&&a.closest("#mmAtlas textarea"))return;paint();},60);}).observe(kr,{childList:true});}catch(e){}}
/* the head's stars and its two keys open the atlas's plates */
function headKeys(){[].forEach.call(D.querySelectorAll("#knHead .kh-keys button"),function(b){if(b.__r406)return;var t=b.textContent.trim();
    if(/^Waiting for you$/.test(t)){b.__r406=1;b.addEventListener("click",function(){choose("wait",null);reveal();},true);}
    else if(/^Find a fact$/.test(t)){b.__r406=1;b.addEventListener("click",function(){reveal();setTimeout(function(){var f=D.getElementById("mmbFind");if(f)try{f.focus({preventScroll:true});}catch(e){}},420);},true);}});}
function reveal(){var a=D.getElementById("mmAtlas");if(a)try{a.scrollIntoView({block:"start",behavior:D.body.getAttribute("data-motion")==="minimal"?"auto":"smooth"});}catch(e){}}
function wrapOpen(){var KN=W.IngKnow;if(!KN||KN.__r406o||typeof KN.open!=="function")return;var o=KN.open;KN.open=function(about){var r=o.apply(this,arguments);
    setTimeout(function(){mount();if(about&&plates().some(function(p){return p.k===about;}))choose(about,null);else paint();reveal();},180);return r;};KN.__r406o=1;}
function tick(){try{mount();follow();headKeys();knowsRoom();guard();gate();folderGate();wrapOpen();}catch(e){}}
var lastTheme=null;
function themeWatch(){try{new MutationObserver(function(){var t=D.body.getAttribute("data-theme");if(t!==lastTheme){lastTheme=t;paint();}}).observe(D.body,{attributes:true,attributeFilter:["data-theme"]});}catch(e){}}
(function start(){var n=0;(function w2(){if(W.__ingReady===true&&W.IngKnow&&W.state){lastTheme=D.body.getAttribute("data-theme");tick();themeWatch();setInterval(tick,1500);return;}if(++n<400)setTimeout(w2,500);})();})();
W.IngAtlas={open:function(k){choose(k,null);return OPEN;},plate:function(){return OPEN;},focus:function(id){FOCUS=id;paint();},find:function(q){if(OPEN!=="find")PREV=OPEN;Q=String(q||"");OPEN=Q.trim()?"find":(PREV||"me");paint();},
  flip:flip,mode:function(){return MODE;},paint:paint,uses:uses,readers:readers,allowed:allowed,blocked:function(t){return NEVER_RE.test(String(t||""));},
  leaveOut:function(id,on){var k=K();if(!k)return false;var f=null;k.facts.forEach(function(y){if(y.id===id)f=y;});if(!f)return false;if(on===false)delete f.off;else f.off=true;save();paint();return true;}};
try{window.__ingParts["p406"]="running";}catch(_){}
})();
</script>
