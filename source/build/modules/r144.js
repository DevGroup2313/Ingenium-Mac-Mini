<style id="r144-css">
/* ============ R144 · THE GUIDED TOUR BY SKILL LEVEL, HELP WHERE IT IS NEEDED, AND THE TOUR'S KEYS ============
   The owner's words (20 October 2026): "The buttons on the Guided Tour panel needs to have the same animated popped out 3D
   look and effect." and "Enhance the walkthrough feature to adapt to user skill level and provide contextual help."
   The tour's keys are Fabrica's keys now (r112): a light top face, a darker bottom edge and layered shadows; they lift on
   hover, sink when pressed and settle with a spring, by day and by night. The tour asks once how well the person knows apps
   like this (New to this, Some experience, Expert): the answer decides which cards show and how they are worded, and it can
   be changed on the tour card, on any help card and in Settings. A Help key in the top bar, on every page, opens help about
   that page (what it is for, what most people do there, tips for the level, a way into the tour's chapter), and its
   What is this? key explains the next control pressed. F1 opens help; Shift+F1 explains the control in focus. */
#ingTour,#tourMenu,#guideTour,#tourGo,#ihPanel,#ihBubble,#ihAsk,#ihSetCard,#ingHelpKey{
  --ih-acc:#6a3fb5;--ih-accs:rgba(106,63,181,.12);--ih-ring:rgba(106,63,181,.55);
  --ih-ink1:#221a2e;--ih-ink2:#4a4358;--ih-ink3:#6c6579;--ih-hair:rgba(34,26,46,.10);
  --ih-a:#ffffff;--ih-b:#f6f2fb;--ih-card:#faf8fc;--ih-well:rgba(34,26,46,.035);--ih-gold:#7d5d22;--ih-golds:rgba(202,162,74,.14);
  --ih-slab:inset 0 1px 0 rgba(255,255,255,.85),inset 0 -1px 0 rgba(40,22,68,.05),0 1px 0 rgba(40,22,68,.10),0 3px 0 rgba(40,22,68,.05),0 6px 12px rgba(40,22,68,.07),0 18px 36px rgba(40,22,68,.10);
  --ih-pop:inset 0 -1.5px 0 rgba(40,22,68,.13),0 2px 0 rgba(40,22,68,.25),0 4px 5px rgba(40,22,68,.16),0 9px 14px rgba(40,22,68,.10);
  --ih-pophi:inset 0 -1.5px 0 rgba(40,22,68,.13),0 3px 0 rgba(40,22,68,.25),0 6px 8px rgba(40,22,68,.18),0 13px 20px rgba(40,22,68,.12);
  --ih-press:inset 0 2px 5px rgba(40,22,68,.22),0 1px 1px rgba(40,22,68,.18);
  --ih-pa:#7348be;--ih-pb:#5d37a1;--ih-pedge:#4b2a86;--ih-pledge:#3a2070;
  --ih-psh:inset 0 1px 0 rgba(255,255,255,.16),0 2px 0 var(--ih-pledge),0 4px 6px rgba(40,22,68,.24),0 9px 16px rgba(40,22,68,.16);
  --ih-pshhi:inset 0 1px 0 rgba(255,255,255,.18),0 3px 0 var(--ih-pledge),0 6px 9px rgba(40,22,68,.26),0 13px 22px rgba(40,22,68,.18);
  --ih-ppress:inset 0 2px 6px rgba(20,8,40,.45),0 1px 1px rgba(40,22,68,.2);
  --ih-spring:cubic-bezier(.34,1.35,.64,1);
  --ih-serif:var(--serif,"Iowan Old Style","Palatino Linotype",Palatino,Georgia,serif);--ih-sans:var(--sans,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif)}
body[data-theme="night"] #ingTour,body[data-theme="night"] #tourMenu,body[data-theme="night"] #guideTour,body[data-theme="night"] #tourGo,body[data-theme="night"] #ihPanel,
body[data-theme="night"] #ihBubble,body[data-theme="night"] #ihAsk,body[data-theme="night"] #ihSetCard,body[data-theme="night"] #ingHelpKey{
  --ih-acc:#b79ce6;--ih-accs:rgba(183,156,230,.16);--ih-ring:rgba(183,156,230,.55);
  --ih-ink1:#f3eefb;--ih-ink2:#d3c9e3;--ih-ink3:#a99cc1;--ih-hair:rgba(205,184,240,.12);
  --ih-a:#2a2239;--ih-b:#231c30;--ih-card:#1c1626;--ih-well:rgba(10,6,18,.35);--ih-gold:#e3c58a;--ih-golds:rgba(216,180,106,.14);
  --ih-slab:inset 0 1px 0 rgba(255,255,255,.06),inset 0 -1px 0 rgba(0,0,0,.35),0 1px 0 rgba(0,0,0,.6),0 3px 0 rgba(0,0,0,.28),0 6px 12px rgba(0,0,0,.35),0 18px 36px rgba(0,0,0,.45);
  --ih-pop:inset 0 1px 0 rgba(255,255,255,.07),inset 0 -2px 0 rgba(0,0,0,.45),0 2px 0 rgba(0,0,0,.75),0 4px 5px rgba(0,0,0,.50),0 9px 14px rgba(0,0,0,.36);
  --ih-pophi:inset 0 1px 0 rgba(255,255,255,.08),inset 0 -2px 0 rgba(0,0,0,.45),0 3px 0 rgba(0,0,0,.75),0 6px 8px rgba(0,0,0,.52),0 13px 20px rgba(0,0,0,.40);
  --ih-press:inset 0 2px 6px rgba(0,0,0,.6),0 1px 1px rgba(0,0,0,.4);
  --ih-pa:#7a56c8;--ih-pb:#5b3aa1;--ih-pedge:#2c1956;--ih-pledge:#170b30;
  --ih-psh:inset 0 1px 0 rgba(255,255,255,.14),0 2px 0 var(--ih-pledge),0 4px 6px rgba(0,0,0,.5),0 9px 16px rgba(0,0,0,.36);
  --ih-pshhi:inset 0 1px 0 rgba(255,255,255,.16),0 3px 0 var(--ih-pledge),0 6px 9px rgba(0,0,0,.52),0 13px 22px rgba(0,0,0,.4);
  --ih-ppress:inset 0 2px 7px rgba(0,0,0,.65),0 1px 1px rgba(0,0,0,.4)}

/* ---------- the tour's panel where R74 meant it: a raised card at the foot of the page, at the head when what it rings
   sits low. The 3.12 page's short tour styled every .tour-card and .tour-ov as its own fixed boxes, so the chaptered
   tour's card was pinned to the top at 360 pixels and its Chapters list opened underneath it. Kept to the ids here. ---------- */
#ingTour.tour-ov{position:fixed;left:0;right:0;top:auto;bottom:0;z-index:2000;display:flex;justify-content:center;align-items:flex-end;padding:0 16px 18px;pointer-events:none}
#ingTour.tour-ov.top{top:64px;bottom:auto;align-items:flex-start}
#ingTour .tour-card,#tourMenu .tour-card{position:relative;width:100%;max-width:460px;box-sizing:border-box;border-radius:18px;padding:16px 18px 14px;pointer-events:auto;
  border:1px solid var(--ih-hair);color:var(--ih-ink1);box-shadow:var(--ih-slab)}
#tourMenu.tour-menu-back{z-index:2010}
#tourMenu .tour-card{max-height:min(64vh,620px);overflow:auto}
#ingTour .tour-card:focus{outline:none}
#ingTour .tour-top{gap:8px}
.ih-topkeys{display:flex;gap:6px;align-items:center;flex:none}
#ingTour .tour-left{gap:8px;flex-wrap:wrap}
#ingTour .tour-row{gap:10px;margin-top:14px}
#ingTour .tour-tries{gap:9px}

/* ---------- the keys: popped out, they lift on hover, sink when pressed and settle with a spring ---------- */
.ih-k:not(#ih-z){position:relative;display:inline-flex;align-items:center;justify-content:center;gap:6px;box-sizing:border-box;margin:0;
  border:1px solid var(--ih-hair);background:linear-gradient(var(--ih-a),var(--ih-b));border-radius:10px;padding:7px 13px;min-height:34px;
  font:600 13px/1.3 var(--ih-sans);letter-spacing:0;text-transform:none;color:var(--ih-ink1);text-align:center;white-space:nowrap;cursor:pointer;
  box-shadow:var(--ih-pop);text-shadow:none;-webkit-tap-highlight-color:transparent;
  transition:transform .16s var(--ih-spring),box-shadow .16s ease,background-color .15s,color .15s,border-color .15s,opacity .2s}
.ih-k:not(#ih-z):hover:not(:disabled){transform:translateY(-2px);box-shadow:var(--ih-pophi);color:var(--ih-ink1)}
.ih-k:not(#ih-z):active:not(:disabled),.ih-k.is-down:not(#ih-z){transform:translateY(1px) scale(.985);box-shadow:var(--ih-press);transition-duration:.06s}
.ih-k:not(#ih-z):focus-visible{outline:2px solid var(--ih-acc);outline-offset:2px}
.ih-k:not(#ih-z):disabled{opacity:.5;cursor:default}
.ih-k.pri:not(#ih-z){background:linear-gradient(var(--ih-pa),var(--ih-pb));border-color:var(--ih-pedge);color:#fff;box-shadow:var(--ih-psh);text-shadow:0 1px 1px rgba(30,10,60,.35);min-width:88px}
.ih-k.pri:not(#ih-z):hover:not(:disabled){box-shadow:var(--ih-pshhi);color:#fff}
.ih-k.pri:not(#ih-z):active:not(:disabled),.ih-k.pri.is-down:not(#ih-z){box-shadow:var(--ih-ppress)}
.ih-k.sm:not(#ih-z){padding:5px 11px;min-height:28px;font-size:12px;border-radius:999px}
.ih-k.quiet:not(#ih-z){color:var(--ih-ink2)}
.ih-k.wrap:not(#ih-z){white-space:normal;text-align:left;justify-content:flex-start}
.ih-k.ih-pop{animation:ihPop .55s var(--ih-spring)}
@keyframes ihPop{0%{transform:translateY(6px) scale(.94);opacity:.4}60%{transform:translateY(-2px) scale(1.02);opacity:1}100%{transform:none}}
#ingTour .tour-tries .ih-k{justify-content:flex-start;text-align:left;width:100%}
#ingTour .tour-act.ih-k{margin-top:10px}
/* the Chapters key opens a list: a raised pill with its caret, as the Forge's is */
.ih-k.tour-chap .ih-caret{font-size:10px;line-height:1;opacity:.75;margin-left:1px}
.ih-k.tour-chap[aria-expanded="true"]:not(#ih-z){transform:translateY(1px);box-shadow:var(--ih-press)}
/* the chapter lists are flat, as the Forge's and Carpe Diem's are (the owner's words, 22 October 2026: "I don't like the raised
   chapters list look, make them flat. I only want buttons and collapsible toggles made 3d animated."): each chapter a row
   with a fine rim on the card's face, the one you are in ringed in the accent; its parts plain lines under it. Nothing lifts or
   sinks; a row only takes a tint on hover. */
#tourMenu .tour-mi.ih-flat:not(#ih-z){display:flex;align-items:center;gap:10px;width:100%;box-sizing:border-box;margin:0 0 6px;padding:10px 12px;
  text-align:left;white-space:normal;border:1px solid var(--ih-hair);border-radius:10px;background:var(--ih-card);box-shadow:none;transform:none;
  font:500 14px/1.3 var(--ih-sans);color:var(--ih-ink1);cursor:pointer;transition:background-color .15s,border-color .15s,color .15s}
#tourMenu .tour-mi.ih-flat:not(#ih-z):hover{background:var(--ih-accs);border-color:var(--ih-ring)}
#tourMenu .tour-mi.ih-flat.on:not(#ih-z){box-shadow:inset 0 0 0 1.5px var(--ih-acc);color:var(--ih-acc);font-weight:600}
#tourMenu .tour-mi.ih-flat .tour-mi-n{font-size:11px;font-weight:700;color:var(--ih-ink3);min-width:16px}
#tourMenu .tour-mi.ih-flat.on .tour-mi-n{color:var(--ih-acc)}
#tourMenu .tour-mi .tour-mi-ok{margin-left:auto}
#tourMenu .ih-subs{display:block;margin:-3px 0 6px}
#tourMenu .tour-ms.ih-flat:not(#ih-z){display:block;width:100%;box-sizing:border-box;margin:0 0 2px;padding:4px 12px 4px 40px;text-align:left;white-space:normal;
  border:0;border-radius:8px;background:transparent;box-shadow:none;transform:none;font:400 12.5px/1.5 var(--ih-sans);color:var(--ih-ink3);cursor:pointer;
  transition:background-color .15s,color .15s}
#tourMenu .tour-ms.ih-flat:not(#ih-z):hover{color:var(--ih-ink1);background:var(--ih-well)}
#tourMenu .tour-ms.ih-flat.on:not(#ih-z){color:var(--ih-acc);font-weight:600}
#tourMenu .tour-mi.ih-flat:focus-visible,#tourMenu .tour-ms.ih-flat:focus-visible{outline:2px solid var(--ih-acc);outline-offset:2px}
#tourMenu .tour-card > .tour-link.ih-k{display:flex;margin:12px auto 0}
#guideTour .tour-entry-row{gap:10px}

/* ---------- the level, wherever it is chosen ---------- */
.ih-lv{display:flex;flex-wrap:wrap;gap:8px;margin:6px 0 4px}
.ih-lv .ih-lvk{flex:1 1 120px}
.ih-lvk .ih-lvi{font-size:15px;line-height:1}
.ih-lvk .ih-lvt{display:flex;flex-direction:column;align-items:flex-start;gap:1px;text-align:left;white-space:normal}
.ih-lvk .ih-lvd{font-weight:500;font-size:12px;line-height:1.4;color:var(--ih-ink3)}
.ih-lvk[aria-checked="true"]:not(#ih-z){color:var(--ih-acc);background:linear-gradient(var(--ih-b),var(--ih-a));box-shadow:var(--ih-press),inset 0 0 0 1.5px var(--ih-acc);transform:translateY(1px)}
.ih-lvk[aria-checked="true"]:not(#ih-z):hover{transform:translateY(1px)}
.ih-lvk[aria-checked="true"] .ih-lvd{color:var(--ih-ink2)}
.ih-lvcap{font-size:12px;color:var(--ih-ink3);margin:2px 0 0}
.ih-pickg{display:flex;flex-direction:column;gap:9px;margin:12px 0 2px}
.ih-pickg .ih-k{justify-content:flex-start;text-align:left;white-space:normal;padding:10px 14px;border-radius:14px;gap:12px}
.ih-pickg .ih-lvi{font-size:22px}
.ih-pickg .ih-lvn{font-size:14px}
.ih-lvrow{margin:8px 0 2px;padding:8px 10px;border-radius:12px;background:var(--ih-well);border:1px solid var(--ih-hair)}
.ih-lvrow .ih-lvrow-h{font-size:12px;font-weight:600;color:var(--ih-ink3);margin:0 0 4px}

/* ---------- the tour's words for each level ---------- */
.ih-words{margin-top:10px;padding:8px 10px;border-radius:10px;background:var(--ih-golds);font-size:12.5px;line-height:1.5;color:var(--ih-ink2)}
.ih-words b{color:var(--ih-gold);font-weight:700}
.ih-words p{margin:2px 0}
.ih-xline{display:flex;gap:6px;margin-top:10px;font-size:12px;line-height:1.5;color:var(--ih-ink2)}
.ih-more:not(#ih-z){margin-left:4px;vertical-align:baseline}

/* ---------- the Help key, in the top bar on every page (it stays when the other keys are folded away) ---------- */
#ingHelpKey{display:inline-flex;align-items:center;gap:5px}
body.top-collapsed .topbar-tools #ingHelpKey{display:inline-flex}
#ingHelpKey .ih-q{display:inline-flex;align-items:center;justify-content:center;width:15px;height:15px;border-radius:50%;font:700 10.5px/1 var(--ih-sans);
  color:#fff;background:linear-gradient(var(--ih-pa),var(--ih-pb));box-shadow:inset 0 1px 0 rgba(255,255,255,.2),0 1px 0 var(--ih-pledge)}
#ingHelpKey[aria-expanded="true"]{color:var(--ih-acc);border-color:var(--ih-acc)}
html.ing-lite #ingHelpKey,html.ing-lite #ihPanel,html.ing-lite #ihAsk,html.ing-lite #ihBubble{display:none !important}

/* ---------- the help card ---------- */
#ihPanel{position:fixed;z-index:2100;top:58px;right:14px;bottom:14px;width:min(410px,calc(100vw - 28px));box-sizing:border-box;display:flex;flex-direction:column;
  border-radius:18px;border:1px solid var(--ih-hair);background:linear-gradient(var(--ih-a),var(--ih-card));color:var(--ih-ink1);box-shadow:var(--ih-slab);
  font:14px/1.55 var(--ih-sans);overflow:hidden}
#ihPanel[hidden]{display:none !important}
#ihPanel.lively{animation:ihIn .34s var(--ih-spring)}
@keyframes ihIn{from{opacity:0;transform:translateX(18px) scale(.985)}to{opacity:1;transform:none}}
#ihPanel .ih-head{display:flex;align-items:flex-start;gap:10px;padding:14px 16px 10px;border-bottom:1px solid var(--ih-hair)}
#ihPanel .ih-head > div{flex:1;min-width:0}
#ihPanel .ih-eye{font-size:11.5px;font-weight:700;letter-spacing:.5px;text-transform:uppercase;color:var(--ih-acc)}
#ihPanel h2{margin:2px 0 0;font:600 20px/1.25 var(--ih-serif);color:var(--ih-ink1)}
#ihPanel h2:focus{outline:none}
#ihPanel h2:focus-visible{outline:2px solid var(--ih-acc);outline-offset:3px;border-radius:4px}
#ihPanel .ih-x:not(#ih-z){width:34px;min-width:34px;padding:0;font-size:18px;line-height:1}
#ihPanel .ih-body{flex:1;overflow:auto;padding:12px 16px 16px;overscroll-behavior:contain}
#ihPanel h3{margin:14px 0 6px;font:700 11.5px/1.3 var(--ih-sans);letter-spacing:.5px;text-transform:uppercase;color:var(--ih-ink3)}
#ihPanel p{margin:0 0 6px;color:var(--ih-ink2)}
#ihPanel ol.ih-dos{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:8px}
#ihPanel .ih-do:not(#ih-z){display:flex;flex-direction:column;align-items:flex-start;width:100%;white-space:normal;text-align:left;border-radius:12px;padding:9px 12px;gap:2px}
#ihPanel .ih-do .ih-dt{font-weight:600;font-size:13.5px}
#ihPanel .ih-do .ih-dd{font-weight:400;font-size:12.5px;color:var(--ih-ink2);line-height:1.45}
#ihPanel .ih-do .ih-show{font-weight:600;font-size:11.5px;color:var(--ih-acc)}
#ihPanel ul.ih-tips{margin:0;padding:0 0 0 18px;color:var(--ih-ink2)}
#ihPanel ul.ih-tips li{margin:0 0 5px}
#ihPanel .ih-keys{display:flex;flex-wrap:wrap;gap:8px;margin:14px 0 4px}
#ihPanel .ih-ctls{margin-top:6px}
#ihPanel .ih-ctl{margin:0 0 6px}
#ihPanel .ih-ctl-t{margin:4px 2px 2px 12px;font-size:12.5px;color:var(--ih-ink2)}
#ihPanel .ih-ctl-t[hidden]{display:none}
#ihPanel .ih-note{font-size:12px;color:var(--ih-ink3)}

/* ---------- What is this? ---------- */
body.ih-asking,body.ih-asking *{cursor:help !important}
#ihAsk{position:fixed;z-index:2200;top:56px;left:50%;transform:translateX(-50%);max-width:calc(100vw - 24px);box-sizing:border-box;display:flex;align-items:center;gap:10px;flex-wrap:wrap;
  padding:8px 10px 8px 14px;border-radius:999px;border:1px solid var(--ih-hair);background:linear-gradient(var(--ih-a),var(--ih-b));color:var(--ih-ink1);box-shadow:var(--ih-slab);font:600 13px/1.4 var(--ih-sans)}
#ihAsk[hidden]{display:none !important}
#ihAsk .ih-asknote{font-weight:500;color:var(--ih-ink2)}
#ihAsk .ih-k{cursor:pointer !important}
#ihBubble{position:fixed;z-index:2200;width:min(340px,calc(100vw - 24px));box-sizing:border-box;padding:12px 14px;border-radius:14px;border:1px solid var(--ih-hair);
  background:linear-gradient(var(--ih-a),var(--ih-card));color:var(--ih-ink1);box-shadow:var(--ih-slab);font:13.5px/1.55 var(--ih-sans)}
#ihBubble[hidden]{display:none !important}
#ihBubble.lively{animation:ihBub .3s var(--ih-spring)}
@keyframes ihBub{from{opacity:0;transform:translateY(6px) scale(.97)}to{opacity:1;transform:none}}
#ihBubble .ih-eye{font-size:11px;font-weight:700;letter-spacing:.5px;text-transform:uppercase;color:var(--ih-acc)}
#ihBubble h4{margin:2px 0 4px;font:600 16px/1.3 var(--ih-serif)}
#ihBubble p{margin:0;color:var(--ih-ink2)}
#ihBubble .ih-keys{display:flex;gap:8px;justify-content:flex-end;margin-top:10px;flex-wrap:wrap}
#ihBubble *{cursor:auto !important}
#ihBubble .ih-k{cursor:pointer !important}
.ih-ring{outline:3px solid var(--ih-ring,rgba(106,63,181,.55)) !important;outline-offset:3px;border-radius:10px}
body:not([data-motion="minimal"]) .ih-ring{animation:ihRing 1.1s ease-out 2}
@keyframes ihRing{0%{outline-offset:9px;outline-color:rgba(106,63,181,0)}100%{outline-offset:3px}}
.ih-sr{position:absolute !important;width:1px;height:1px;margin:-1px;padding:0;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap;border:0}

/* ---------- Settings ---------- */
#ihSetCard .ih-row{display:flex;flex-wrap:wrap;gap:9px;margin:12px 0 8px}
#ihSetCard .ih-lv{margin-top:10px}

/* ---------- a phone: the help card rises from the foot ---------- */
@media (max-width:640px){
  #ihPanel{top:auto;left:8px;right:8px;bottom:8px;width:auto;max-height:78vh}
  #ingHelpKey .kl{display:none}
  #ingTour.tour-ov{padding:0 10px 10px}
  #ingTour.tour-ov.top{top:56px}
  #ihAsk{border-radius:16px}
}
/* ---------- less motion: nothing lifts, sinks or slides; the shadows still say what is pressed ---------- */
@media (prefers-reduced-motion:reduce){
  .ih-k:not(#ih-z),#ihPanel,#ihBubble,.ih-ring{transition:none !important;animation:none !important}
  .ih-k:not(#ih-z):hover:not(:disabled),.ih-k:not(#ih-z):active:not(:disabled),.ih-k.is-down:not(#ih-z),.ih-lvk[aria-checked="true"]:not(#ih-z){transform:none}
}
body[data-motion="minimal"] .ih-k:not(#ih-z),body[data-motion="minimal"] #ihPanel,body[data-motion="minimal"] #ihBubble{transition:none !important;animation:none !important}
body[data-motion="minimal"] .ih-k:not(#ih-z):hover:not(:disabled),body[data-motion="minimal"] .ih-k:not(#ih-z):active:not(:disabled),body[data-motion="minimal"] .ih-k.is-down:not(#ih-z){transform:none}
</style>
<script>try{(window.__ingParts=window.__ingParts||{})["p65"]="started";}catch(_){}
/* R144 · the tour by skill level, help on every page, and What is this? (see the note at the head of the style above) */
(function(){"use strict";
var W=window,D=document;
if(!Array.isArray(W.ING_TOUR)||typeof W.tourRender!=="function"||typeof W.tourStart!=="function")return;
var T=W.ING_TOUR;

/* ---------- small helpers of this part's own ---------- */
function $i(id){return D.getElementById(id);}
function mk(tag,cls,text,attrs){var n=D.createElement(tag);if(cls)n.className=cls;if(text!=null)n.textContent=text;
  if(attrs)Object.keys(attrs).forEach(function(k){if(attrs[k]!=null)n.setAttribute(k,attrs[k]);});return n;}
function key(text,cls,attrs){var b=mk("button","ih-k"+(cls?" "+cls:""),text,attrs);b.type="button";return b;}
function lively(){if(D.body.getAttribute("data-motion")==="minimal")return false;
  try{if(W.matchMedia&&W.matchMedia("(prefers-reduced-motion: reduce)").matches)return false;}catch(e){}return true;}
function toast(m){try{if(typeof W.ingToast==="function")W.ingToast(m);}catch(e){}}
function save(){try{if(typeof W.saveState==="function")W.saveState();}catch(e){}}
function warn(e){try{console.warn("Help and the tour:",e&&e.message||e);}catch(_){}}
function seen(n){if(!n||!n.getBoundingClientRect)return false;var r=n.getBoundingClientRect();return r.width>2&&r.height>2;}
function typing(){var a=D.activeElement;return !!a&&(/^(INPUT|TEXTAREA|SELECT)$/.test(a.tagName)||a.isContentEditable);}
function firstSentence(t){var m=String(t||"").match(/^[\s\S]*?[.!?](?=\s|$)/);return m?m[0]:String(t||"");}
function sentences(t){return String(t||"").match(/[^.!?]+(?:[.!?]+["'”)]*|$)\s*/g)||[String(t||"")];}

/* a live line for screen readers: what changed, said once */
var live=null;
function announce(msg){try{if(!live){live=mk("div","ih-sr",null,{id:"ihLive",role:"status","aria-live":"polite"});D.body.appendChild(live);}
  live.textContent="";setTimeout(function(){live.textContent=msg;},40);}catch(e){}}

/* ---------- the level ---------- */
var ORDER=["new","some","expert"];
var LV={
  "new":{name:"New to this",icon:"🌱",line:"Every step explained in plain words, and new words made clear."},
  some:{name:"Some experience",icon:"🧭",line:"The main things, without the basics."},
  expert:{name:"Expert",icon:"⚡",line:"The short version: the essentials and the shortcuts."}};
function S(){var st=W.state;if(!st||typeof st!=="object")return {};st.v61=st.v61||{};st.v61.tour=st.v61.tour||{};return st.v61.tour;}
function level(){var l=S().level;return LV[l]?l:null;}
function lvNow(){return level()||"some";}
var onLevel=[];
function setLevel(l){if(!LV[l])return;var s=S(),was=s.level;s.level=l;s.asked=true;save();paintLevels();
  if(was!==l){announce("Your level is now "+LV[l].name+". "+LV[l].line);onLevel.forEach(function(f){try{f(l);}catch(e){warn(e);}});}}
/* a radio group: the arrows move and choose, as a radio group does; the chosen key sits pressed in */
function levelGroup(label,withLines){var g=mk("div","ih-lv",null,{role:"radiogroup","aria-label":label||"Your level"});
  ORDER.forEach(function(k){var L=LV[k],b=key(null,"ih-lvk wrap",{role:"radio","data-lv":k,"aria-checked":"false"});
    b.appendChild(mk("span","ih-lvi",L.icon,{"aria-hidden":"true"}));var tx=mk("span","ih-lvt");tx.appendChild(mk("span","ih-lvn",L.name));
    if(withLines)tx.appendChild(mk("span","ih-lvd",L.line));else b.title=L.line;b.appendChild(tx);
    b.addEventListener("click",function(){setLevel(k);});g.appendChild(b);});
  g.addEventListener("keydown",function(e){var ks=[].slice.call(g.querySelectorAll(".ih-lvk")),i=ks.indexOf(D.activeElement);if(i<0)return;
    var d=/^(ArrowRight|ArrowDown)$/.test(e.key)?1:/^(ArrowLeft|ArrowUp)$/.test(e.key)?-1:0,to=-1;
    if(d)to=(i+d+ks.length)%ks.length;else if(e.key==="Home")to=0;else if(e.key==="End")to=ks.length-1;
    if(to<0)return;e.preventDefault();e.stopPropagation();ks[to].focus();ks[to].click();});
  markGroup(g);return g;}
function markGroup(g){var l=lvNow(),set=!!level();[].forEach.call(g.querySelectorAll(".ih-lvk"),function(b){var on=b.getAttribute("data-lv")===l;
  b.setAttribute("aria-checked",on&&set?"true":"false");b.tabIndex=on?0:-1;});}
function paintLevels(){[].forEach.call(D.querySelectorAll(".ih-lv[role=radiogroup]"),markGroup);
  [].forEach.call(D.querySelectorAll(".ih-lvcap"),function(c){c.textContent=level()?LV[lvNow()].line:"Not chosen yet: help speaks as for some experience.";});}

/* ---------- which cards each level sees ----------
   New to this: every card. Some experience: not the basics (what a model is, the doors from Home, a reply arriving, the
   seal, About). Expert: the first card of each part of a chapter and a few that matter to anyone, not the basics and not
   the slow demonstrations. A card may say for itself, with levels:[...]. The last card always shows. */
var SOME_SKIP=/^(What a model is|The doors from Home|A reply arrives|The seal|About)$/;
var EXPERT_SKIP=/^(Home|Writing to the model|Reading its thinking|Notes|Done, and the next|Support|Your Ingenium)$/;
var EXPERT_KEEP=/^(Choosing the model|Controls|Health|Catch, quiet, and out of the way|What is running|Display|Your sources, cited|Your data stays here|Help, wherever you are)$/;
function bare(t){return String(t||"").replace(/^[^A-Za-z]+/,"").trim();}
function shownAt(i,lv){var s=T[i];if(!s)return false;if(!lv||lv==="new")return true;
  if(Array.isArray(s.levels))return s.levels.indexOf(lv)>=0;
  if(i===T.length-1)return true;
  var t=bare(s.t);if(SOME_SKIP.test(t))return false;if(lv==="some")return true;
  if(EXPERT_SKIP.test(t))return false;if(EXPERT_KEEP.test(t))return true;
  if(s.sub)return true;var p=T[i-1];return !p||p.chap!==s.chap;}
function vis(i){return shownAt(i,level());}
function nextVis(i){for(var k=i+1;k<T.length;k++)if(vis(k))return k;return -1;}
function prevVis(i){for(var k=i-1;k>=0;k--)if(vis(k))return k;return -1;}
function cardsFor(lv){var out=[];T.forEach(function(s,k){if(shownAt(k,lv))out.push(k);});return out;}

/* ---------- the tour's own new card: help, wherever you are ---------- */
(function helpCard(){try{if(T.some(function(s){return s&&s.r144;}))return;var at=-1;T.forEach(function(s,i){if(s.chap==="Welcome")at=i;});
  T.splice(at+1,0,{r144:1,chap:"Welcome",sub:"Help, wherever you are",levels:["new","some","expert"],go:function(){W.go("home");},ring:"#ingHelpKey",
    t:"❓ Help, wherever you are",
    b:"The Help key at the top right opens help about the page you are on: what it is for, what most people do there, and tips for your level. Its What is this? key explains the next control you press.",
    tip:"Help speaks the way you chose: New to this, Some experience or Expert. Change it on any help card or in Settings."});}catch(e){warn(e);}})();

/* ---------- the keys of the tour's panel, popped out like Fabrica's ---------- */
function keyify(root){if(!root)return;[].forEach.call(root.querySelectorAll("button"),function(b){if(b.classList.contains("ih-k")||b.classList.contains("ih-flat"))return;
  /* a chapter in the tour's list is a row, not a key: flat, as in the Forge's and Carpe Diem's tours; the Guide's chapters are
     keys (R166) */
  if(b.classList.contains("tour-mi")||b.classList.contains("tour-ms")){b.classList.add("ih-flat");return;}
  b.classList.add("ih-k");
  if(b.classList.contains("primary"))b.classList.add("pri");
  if(b.classList.contains("tour-chap")){b.classList.add("sm");b.setAttribute("aria-haspopup","dialog");b.setAttribute("aria-expanded",$i("tourMenu")?"true":"false");
    if(!b.querySelector(".ih-caret"))b.appendChild(mk("span","ih-caret","\u25BE",{"aria-hidden":"true"}));}
  if(b.classList.contains("tour-link"))b.classList.add("quiet");});}

/* ---------- the tour, by level: the original functions stay; these choose among the cards ---------- */
var o={render:W.tourRender,start:W.tourStart,inter:W.tourInterstitial,finale:W.tourFinale,menu:W.tourMenu,entry:W.tourPaintEntry};
W.tourChapList=function(){var out=[],had={};T.forEach(function(s,k){if(!vis(k)||had[s.chap])return;had[s.chap]=1;out.push({chap:s.chap,start:k});});return out;};
W.tourChapSubs=function(start){var s0=T[start];if(!s0)return [];var chap=s0.chap,first=start,out=[],cur=null,k;
  while(first>0&&T[first-1].chap===chap)first--;
  for(k=first;k<T.length&&T[k].chap===chap;k++){if(T[k].sub)cur={sub:T[k].sub,start:-1};if(cur&&cur.start<0&&vis(k)){cur.start=k;out.push(cur);}}
  return out;};
W.tourBounds=function(i){var chap=T[i].chap,v=[];T.forEach(function(s,k){if(s.chap===chap&&(vis(k)||k===i))v.push(k);});return {pos:v.indexOf(i)+1,n:v.length};};
W.tourNext=function(){var i=W.tourI,n=nextVis(i);if(n<0){W.tourFinale();return;}
  var cur=T[i].chap,nc=T[n].chap;
  if(nc!==cur){var st=W.state;st.tour=st.tour||{};st.tour.seen=st.tour.seen||{};st.tour.seen[cur]=true;}
  if(nc!==cur&&cur!=="Welcome"){W.tourInterstitial(n);return;}
  W.tourI=n;W.tourRender();};
W.tourBack=function(){var p=prevVis(W.tourI);if(p>=0){W.tourI=p;W.tourRender();}};
W.tourRender=function(){var i=W.tourI;if(!vis(i)){var n=nextVis(i);if(n<0)n=prevVis(i);if(n>=0)W.tourI=n;}
  var r=o.render.apply(this,arguments);try{decorate();}catch(e){warn(e);}return r;};
W.tourInterstitial=function(){var r=o.inter.apply(this,arguments);try{var c=D.querySelector("#ingTour .tour-card");keyify(c);label(c);popPrimary(c);}catch(e){warn(e);}return r;};
W.tourFinale=function(){var r=o.finale.apply(this,arguments);try{var c=D.querySelector("#ingTour .tour-card");keyify(c);label(c);popPrimary(c);}catch(e){warn(e);}return r;};
W.tourMenu=function(){var r=o.menu.apply(this,arguments);try{menuDress();}catch(e){warn(e);}return r;};
W.tourStart=function(at){closeHelp(true);closeBubble();stopAsk(true);gloss={};
  if(!level()){picker(at);return;}return o.start.apply(this,arguments);};
if(typeof o.entry==="function")W.tourPaintEntry=function(){var r=o.entry.apply(this,arguments);try{entryDress();}catch(e){warn(e);}return r;};

/* the dialog is named by its own title and described by its words, so a screen reader reads the card when it opens */
function label(card){if(!card)return;var t=card.querySelector(".tour-title"),b=card.querySelector(".tour-body");
  if(t){t.id="ihTourT";card.setAttribute("aria-labelledby","ihTourT");card.removeAttribute("aria-label");}
  if(b){b.id="ihTourB";card.setAttribute("aria-describedby","ihTourB");}}
function popPrimary(card){var p=card&&card.querySelector(".ih-k.pri");if(p&&lively()){p.classList.remove("ih-pop");void p.offsetWidth;p.classList.add("ih-pop");}}

/* the words for each level: new words made clear for someone new; the short version, and the keyboard, for an expert */
var GLOSS=[
  [/\bmodels?\b/i,"Model","the part that writes the answers: one large file, kept on this device."],
  [/\bengine\b/i,"Engine","the program that runs a model on this device."],
  [/\bGGUF\b/,"GGUF","the kind of file most models come in."],
  [/\bAIs?\b/,"AI","a program that answers and writes in everyday words."],
  [/\bthink(s|ing)?\b/i,"Thinking","some models work a question through before they answer; you can read how."],
  [/Fast, Balanced, Best|\bQ[458]\b/,"Fast, Balanced, Best","how tightly a model is packed. Smaller is quicker; larger is closer to the original."],
  [/system prompt|instructions/i,"Instructions","standing words the model reads before every message."],
  [/repositor/i,"Repository","an app's folder that keeps every version it has had."],
  [/GitHub/,"GitHub","a website where people keep and share code. Here it is optional."],
  [/\bzip\b/i,"Zip","one file that holds a whole folder, for sharing."],
  [/\bcloud\b/i,"Cloud model","one that runs on a company's computers and is reached over the internet."],
  [/web search/i,"Web search","looking things up online. It only happens when you switch it on."],
  [/\bcit(e|ed|es|ation|ations)\b/i,"Citation","a note saying where an idea or a quotation came from."],
  [/Markdown/,"Markdown","plain text with simple marks for headings and lists."],
  [/\brepositories\b|\bversion(s)?\b/i,"Version","the app as it was at one moment; each one is kept."]];
var gloss={};
function terms(text){var out=[];GLOSS.forEach(function(g){if(out.length>=2||gloss[g[1]])return;if(g[0].test(text)){gloss[g[1]]=1;out.push(g);}});return out;}
var XLINE={
  Welcome:"F1 opens help on any page; Shift+F1 explains the control in focus. The arrow keys move through the tour and Esc ends it.",
  Chat:"Enter sends; Shift+Enter starts a new line. The system prompt, effort and context length are under Controls.",
  Models:"Drop any .gguf file on the Models page to bring it in; Health checks the file and how it runs here.",
  Focus:"Enter in the Inbox box catches a thought without leaving what you are doing.",
  "Your devices":"Another computer serves its models over your home network with its address and a code.",
  "Making things":"Build runs as you type; a zip from Package can be brought into Fabrica.",
  Lector:"Save gives Word, PDF, a web page or Markdown; the dividers between the panels remember where you leave them.",
  Fabrica:"Each app keeps every version on this device, in git's own format.",
  Scholarship:"Fontes keeps your references; a search goes online only when you switch it on.",
  "The side buttons":"The side buttons follow you to every page; the chevron lays them down.",
  "The top bar":"Refresh starts Ingenium again with your work saved first: F5, or Command+R on a Mac.",
  Settings:"Export a backup to move everything to another device in one file."};
function firstInChap(i){var p=prevVis(i);return p<0||T[p].chap!==T[i].chap;}
function addAfterTip(card,node){var at=card.querySelector(".tour-act")||card.querySelector(".tour-row");if(at)card.insertBefore(node,at);else card.appendChild(node);}
var refocusChip=false;
function decorate(){var ov=$i("ingTour"),card=ov&&ov.querySelector(".tour-card"),i=W.tourI,s=T[i];if(!card||!s)return;
  var lv=lvNow();card.classList.add("ih-at-"+lv);label(card);
  var top=card.querySelector(".tour-top"),chap=top&&top.querySelector(".tour-chap"),chip=null;
  if(top){chip=key(LV[lv].icon+" "+LV[lv].name,"sm ih-lvchip",{"aria-expanded":"false","aria-label":"Tour level: "+LV[lv].name+". Press to change it"});
    var grp=mk("div","ih-topkeys");grp.appendChild(chip);if(chap){top.insertBefore(grp,chap);grp.appendChild(chap);}else top.appendChild(grp);
    chip.addEventListener("click",function(){toggleLvRow(card,top,chip);});}
  var body=card.querySelector(".tour-body");
  if(lv==="expert"){if(body){var full=body.textContent,ss=sentences(full);
      if(ss.length>2){body.textContent=ss.slice(0,2).join("").trim()+" ";var more=key("Read more","sm quiet ih-more",{"aria-label":"Read the whole card"});
        more.addEventListener("click",function(){body.textContent=full;try{body.focus();}catch(e){}});body.appendChild(more);}}
    var tip=card.querySelector(".tour-tip");if(tip)tip.hidden=true;
    if(XLINE[s.chap]&&firstInChap(i)){var xl=mk("div","ih-xline");xl.appendChild(mk("span",null,"⌨️",{"aria-hidden":"true"}));xl.appendChild(mk("span",null,XLINE[s.chap]));addAfterTip(card,xl);}}
  if(lv==="new"){var ws=terms((s.t||"")+" "+(body?body.textContent:"")+" "+(s.tip||""));
    if(ws.length){var box=mk("div","ih-words",null,{role:"note","aria-label":"New words"});ws.forEach(function(g){var p=mk("p");p.appendChild(mk("b",null,g[1]+": "));p.appendChild(D.createTextNode(g[2]));box.appendChild(p);});addAfterTip(card,box);}}
  var pri=card.querySelector(".btn.primary");
  if(pri&&nextVis(i)<0&&/^Next$/.test(pri.textContent.trim())){pri.textContent="Finish";pri.onclick=function(){W.tourFinale();};}
  keyify(card);popPrimary(card);
  if(refocusChip&&chip){refocusChip=false;try{chip.focus({preventScroll:true});}catch(e){}}}
function toggleLvRow(card,top,chip){var row=card.querySelector(".ih-lvrow");if(row){row.remove();chip.setAttribute("aria-expanded","false");chip.focus();return;}
  row=mk("div","ih-lvrow");row.appendChild(mk("div","ih-lvrow-h","How much should the tour show?"));
  var g=levelGroup("Tour level");row.appendChild(g);top.after(row);chip.setAttribute("aria-expanded","true");
  var on=g.querySelector('[tabindex="0"]');if(on)on.focus();}
/* a level chosen on the tour card shows the tour again at once, at the new level */
onLevel.push(function(){if($i("ingTour")&&!D.querySelector("#ingTour .ih-pick")&&!D.querySelector("#ingTour .chapter,#ingTour .finale")){refocusChip=true;W.tourRender();}
  try{if($i("guideTour")&&typeof W.tourPaintEntry==="function")W.tourPaintEntry();}catch(e){}});

/* the chapters list: a key for each chapter, its parts as small keys under it */
function menuDress(){var m=$i("tourMenu");if(!m)return;var p=m.querySelector(".tour-card");if(!p)return;
  p.setAttribute("role","dialog");p.setAttribute("aria-label","Chapters of the tour");
  var kids=[].slice.call(p.children),box=null;
  var chapOf=null;kids.forEach(function(n){if(n.classList.contains("tour-mi"))chapOf=n;
    if(n.classList.contains("tour-ms")){if(!box){box=mk("div","ih-subs",null,{role:"group"});if(chapOf)box.setAttribute("aria-label","Parts of "+chapOf.textContent.replace(/^\d+/,"").trim());n.before(box);}box.appendChild(n);}else box=null;});
  keyify(p);
  /* the part of the chapter you are in, marked as the Forge marks it */
  try{var onRow=p.querySelector(".tour-mi.on"),i=W.tourI,subs=W.tourChapSubs(i),here=null;subs.forEach(function(su){if(su.start>=0&&su.start<=i)here=su.sub;});
    var g=onRow&&onRow.nextElementSibling;if(here&&g&&g.classList.contains("ih-subs"))[].forEach.call(g.querySelectorAll(".tour-ms"),function(b){if(b.textContent.trim()===here){b.classList.add("on");b.setAttribute("aria-current","step");}});}catch(e){warn(e);}
  var on=p.querySelector(".tour-mi.on")||p.querySelector(".tour-mi");if(on)try{on.focus({preventScroll:true});
    /* the list opens where you are: the chapter you are in, near the middle of the list */
    if(p.scrollHeight>p.clientHeight){var pr=p.getBoundingClientRect(),orr=on.getBoundingClientRect();p.scrollTop+=orr.top-pr.top-(p.clientHeight-orr.height)/2+40;}}catch(e){}
  setChapKey(true);
  try{var mo=new MutationObserver(function(){if(!D.body.contains(m)){mo.disconnect();setChapKey(false);}});mo.observe(D.body,{childList:true,subtree:false});}catch(e){}}
function setChapKey(open){var c=D.querySelector("#ingTour .tour-chap");if(c)c.setAttribute("aria-expanded",open?"true":"false");}
/* the Guide's start of the tour: the level is shown and changed there too */
function entryDress(){var g=$i("guideTour");if(!g)return;keyify(g);var go=$i("tourGo");if(go&&!go.classList.contains("ih-k")){go.classList.add("ih-k","pri");}
  if(!g.querySelector(".ih-lv")){var w=mk("div","ih-entrylv");w.appendChild(mk("p","small muted","How much the tour shows: choose your level."));
    w.appendChild(levelGroup("Tour level"));var row=g.querySelector(".tour-entry-row");if(row)row.after(w);else g.appendChild(w);}
  paintLevels();}

/* ---------- asked once, when the tour starts ---------- */
function picker(at){try{if(typeof W.hideIntro==="function")W.hideIntro();}catch(e){}
  var card=W.tourCard();D.body.classList.add("touring");card.classList.add("ih-pick");
  card.setAttribute("aria-labelledby","ihPickT");card.setAttribute("aria-describedby","ihPickB");card.removeAttribute("aria-label");
  var top=mk("div","tour-top");top.appendChild(mk("div","tour-meta","Before we begin"));card.appendChild(top);
  card.appendChild(mk("div","tour-title","How well do you know apps like this?",{id:"ihPickT"}));
  card.appendChild(mk("div","tour-body","Your answer decides how much the tour shows, and help speaks the same way. Change it whenever you like, on any help card or in Settings.",{id:"ihPickB"}));
  var g=mk("div","ih-pickg",null,{role:"group","aria-label":"Your level"});
  ORDER.forEach(function(k){var L=LV[k],b=key(null,"ih-lvk",{"data-lv":k});b.appendChild(mk("span","ih-lvi",L.icon,{"aria-hidden":"true"}));
    var tx=mk("span","ih-lvt");tx.appendChild(mk("span","ih-lvn",L.name));tx.appendChild(mk("span","ih-lvd",L.line));b.appendChild(tx);
    b.addEventListener("click",function(){setLevel(k);var ov=$i("ingTour");if(ov)ov.remove();o.start.call(W,typeof at==="number"?at:0);});g.appendChild(b);});
  card.appendChild(g);
  var row=mk("div","tour-row"),l=mk("div","tour-left"),end=key("Not now","quiet");end.addEventListener("click",closePicker);l.appendChild(end);row.appendChild(l);card.appendChild(row);
  try{W.tourStaggered(card);}catch(e){}try{W.tourPlace();}catch(e){}
  var f=g.querySelector(".ih-lvk");if(f)try{f.focus({preventScroll:true});}catch(e){}
  announce("The guided tour. How well do you know apps like this? Choose New to this, Some experience or Expert.");}
function closePicker(){var ov=$i("ingTour");if(ov)ov.remove();D.body.classList.remove("touring");try{W.tourPaintEntry();}catch(e){}}
function pickerOpen(){return !!D.querySelector("#ingTour .ih-pick");}

/* ---------- help about each page ----------
   For each page: what it is for (a plainer sentence more for someone new; the first sentence alone for an expert), what
   most people do there (each one rings the control it means), tips for the level, and the tour's chapter. */
var PG={
  home:{name:"Home",tour:["Home"],
    what:"Home is where Ingenium opens. It shows your next useful step, the rooms where you make things, and where you left off.",
    plain:"If you ever feel lost, come back here: the large key at the top always points to one small next step.",
    dos:[["Take your next step","The large key: bring in a model, load it, or start a chat.","#heroNext"],
      ["Open a room","Chat, Code, Build, Fabrica, Lector and Focus each have a card.",".hx-work, .hx-key"],
      ["Pick up where you left off","Your latest conversations, apps and documents, one press away.",".hx-recent"],
      ["Open an app","Tabula, Abacus, Imago, Scriba and Fontes open in a window of their own.",".hx-appsec, .hx-app"]],
    tips:{"new":["Not sure what to do? Press the large purple key. It always points to one small step.","The guided tour shows every room in short chapters. Stop whenever you like."],
      some:["Each room keeps what you did there, so you can always carry on.","The side buttons on the right follow you to every page: notes, the focus clock, reminders and the quiet screen."],
      expert:["F1 opens help on any page; Shift+F1 explains the control in focus.","The seal at the top left opens the introduction again."]}},
  chat:{name:"Chat",tour:["Chat"],
    what:"Chat is where you talk with a model: ask, write, and make documents and pages.",
    plain:"Write as you would to a person. The model writes back word by word, and what you write stays on this device.",
    dos:[["Write a message","Type in the box at the foot and press Enter to send.","#chatInput"],
      ["Choose the model","The key beside the send arrow chooses which model answers.","#chatModelBtn"],
      ["Add a file or a picture","The + key adds a file to read, a photo, or a web search when you switch it on.","#chatImgBtn"],
      ["Find an older conversation","The list key at the top left shows every conversation.","#ccSideBtn"]],
    tips:{"new":["Be specific: say who it is for and how long it should be.","If no model is loaded yet, the key beside the send arrow helps you choose one."],
      some:["Controls sets the effort, the length of answers and how much of the conversation the model keeps in mind.","Fast answers at once, without thinking first: good for quick questions."],
      expert:["Enter sends; Shift+Enter starts a new line.","The system prompt and context length are under Controls; a cloud model can be connected in Settings."]}},
  code:{name:"Code",tour:["Chat"],
    what:"Code is where you build an app with the model and watch it run beside the conversation.",
    plain:"Describe what you want in everyday words. The model writes the code, and the preview shows the app working.",
    dos:[["Choose an app","Pick one of your apps to work on, or start a new one.","#page-chat .cc-hello .btn.primary, #ccSideBtn"],
      ["Describe a change","Say what to add or fix, then press Enter.","#chatInput"],
      ["Choose the model","A model that writes code does this best.","#chatModelBtn"],
      ["Save it, or make it an app","The More key saves the app or downloads it as an app for your devices.","#chatMoreBtn"]],
    tips:{"new":["Ask for one change at a time, and look at the preview after each one.","Nothing is lost: each app keeps its versions."],
      some:["Small, clear requests work best: one feature or one fix per message.","Apps made here can be kept in Fabrica, with every version."],
      expert:["Enter sends; Shift+Enter starts a new line.","Expand gives the chat and the live preview the whole window."]}},
  focus:{name:"Focus",tour:["Focus"],
    what:"Focus is your support room: one step at a time, time you can see, and calm when you need it.",
    plain:"Write what you need to do and Focus breaks it into small steps, then shows only the next one.",
    dos:[["Break a task into steps","Write it in the box and press Break it down.","#fxTaskIn"],
      ["Start a timer","Just start runs for two minutes; longer ones are there too.","#fxTimeCard"],
      ["Catch a thought for later","Write it and press Enter; it waits in the Inbox.","#fxParkIn, #fxParkCard"],
      ["Ask for quiet","A calm screen when everything feels like too much.","#fxCalmCard"]],
    tips:{"new":["Write what you need to do, then press Break it down. You will only see the next small step.","If everything feels like too much, I need quiet covers the page with a calm screen."],
      some:["Just start runs a two minute timer: often enough to get going.","Catch a thought keeps a stray idea for later without leaving what you are doing."],
      expert:["Press Enter in the Inbox box to catch a thought.","Each support can be switched off in Your supports."]}},
  models:{name:"Models",tour:["Models"],
    what:"Models holds the models that write the answers: Ingenium's own, in four houses, and any you bring.",
    plain:"A model is one large file. Bigger ones know more but need more memory; the page says which suit this device.",
    dos:[["Get one of Ingenium's models","Choose a size, then get it.","#lineupGrid"],
      ["Bring your own","Drop a .gguf file on the page, or press to choose one.","#dropzone"],
      ["Check a model's health","See that its file is whole and how well it runs here.","#healthBox"],
      ["Build your own AI","A model with its own instructions and name.","#aiCard"]],
    tips:{"new":["Start with the smallest model; you can bring in a stronger one later.","The page says which models suit this device."],
      some:["Fast is quickest; Best is closest to the original and about twice the size.","Health checks a model's file and how well it runs here."],
      expert:["Drop any .gguf file on the page to bring it in.","Your own AIs keep a model with its own instructions and name."]}},
  blend:{name:"Blend",tour:["Making things","Blend"],
    what:"Blend asks several modes at once and joins their answers into one.",
    plain:"Choose a ready blend, write your question once, and every mode in it answers.",
    dos:[["Choose a ready blend","Press Use this blend on the one that fits.",".bl-presets, .bl-preset"],
      ["Write the task once","Every chosen mode answers it.","#blendTask"],
      ["Run it","The answers are joined into one.","#blendRun"],
      ["Keep it as a house","Choose it later like a model.","#blendSave"]],
    tips:{"new":["Start with a ready blend: press Use this blend, then write your task.","A blend takes longer than one model, because several answer."],
      some:["Save a blend you like as a house and choose it like a model."],
      expert:["Think first lets each mode reason before it answers; it is slower."]}},
  lector:{name:"Lector",tour:["Lector"],
    what:"Lector reads your apps and writes the documents you need from them: a dossier, an appendix, a portfolio.",
    plain:"It works in order: add your apps, say what the documents are for, then start reading. Everything stays on this device.",
    dos:[["Add your apps","The apps Lector reads and measures.",".l-apps"],
      ["Fill in the brief","Who the documents are for, and what for.","#l7Brief, #l7Bf"],
      ["Choose the model","Lector suggests the best one this device holds.","#l7Model"],
      ["Save the document","As Word, PDF, a web page or Markdown.","#l7Save, #l7Doc"]],
    tips:{"new":["Go in order: add your apps, fill in the brief, then Start reading.","Nothing is sent anywhere: Lector reads and writes on this device."],
      some:["The recipe holds Lector's rules for writing and the sources it may cite.","Save gives Word, PDF, a web page or Markdown."],
      expert:["The dividers between the panels can be dragged, and remember where you leave them.","Each panel folds away to give the others room."]}},
  build:{name:"Build",tour:["Making things","Build"],
    what:"Build is a page that runs as you type: write or paste a page on the left, see it on the right, and save it as an app.",
    plain:"You do not need to know code to try it: Load a sample, change a word, and watch the preview change.",
    dos:[["Open an app or a sample","Your apps, Ingenium itself, an app in Fabrica, or a sample.","#bdOpenBtn, #sampleBtn"],
      ["Run it","See the page in the preview.","#runBtn"],
      ["Save the page","One HTML file you can open anywhere.","#downloadBuild"],
      ["Make it an app for your devices","Each device row makes its kit; or make every kit at once.","#shipAll, .ship-row"]],
    tips:{"new":["Press Load a sample, change a word, and watch the preview.","Save this page keeps it as one file you can open anywhere."],
      some:["Package makes a zip you can share or bring into Fabrica.","Each device row makes the kit that becomes the app on that device."],
      expert:["For large pages, switch off running as you type and press Run when ready.","Float the preview to keep it beside the code at any size."]}},
  fabrica:{name:"Fabrica",tour:["Fabrica"],
    what:"Fabrica keeps your apps as repositories: every version kept, tested and shipped, all on this device.",
    plain:"Think of it as a careful cupboard for your apps: nothing is thrown away, and you can always go back.",
    dos:[["Add an app","Start a new one, or bring one in.","#fbNew, #fbBring"],
      ["See the work","Four rooms: Now, Story, Plans and Care; each shows only its own tabs.","#fbRooms, #fbWork"],
      ["Test this version","Run the checks before you ship it.","#fbTest"],
      ["Ship to your devices","Choose the devices, then make them.","#fbMakeAll, #fbShip"]],
    tips:{"new":["Each app keeps every version, so you can always go back.","Test this version before you ship it to your devices."],
      some:["The work has four rooms: Now (changes, files, code), Story (history, compare, releases), Plans and Care.","Everything works on this device, with no connection."],
      expert:["Every app is a real git repository here, with issues, pull requests and compare.","Make the chosen builds each chosen device's package, one after another."]}},
  notes:{name:"Notes",tour:["The side buttons"],
    what:"Notes keeps short notes on this device, and Schedae opens them beside any page.",
    plain:"Write anything you want to keep: a list, an idea, a number to remember.",
    dos:[["Write a new note","Starts an empty note.","#addNote"],["Open the notes panel","Keeps your notes beside any page.","#openSchedaeBtn"]],
    tips:{"new":["The notes side button opens your notes from any page."],some:["Notes stay on this device and go into your backups."],expert:["Schedae sits beside any page, so notes and work stay side by side."]}},
  guide:{name:"Guide",tour:["Welcome"],
    what:"The Guide holds the guided tour and short notes on how Ingenium works.",
    plain:"The tour shows each room in short chapters. Stop whenever you like; it remembers where you were.",
    dos:[["Take the tour","At your level, from the start or where you stopped.","#tourGo, #guideTour .btn.primary"],
      ["Open one chapter","Go straight to the room you want to learn.",".tour-entry-chaps, .tour-entry-chap"],
      ["Read a short note","Each one opens and folds again.",".tip-fold-btn"]],
    tips:{"new":["The tour can be stopped at any card; it remembers where you were."],some:["Open any chapter on its own from the list."],
      expert:["The tour follows your level: Expert shows the essentials, briefly."]}},
  settings:{name:"Settings",tour:["Settings"],
    what:"Settings make Ingenium yours: your name, the supports, how it writes to you, the look, connections and your data.",
    plain:"Changes save on this device as you make them. Nothing here leaves the device unless you connect something.",
    dos:[["Set how it writes to you","Your name, the length, the tone and your own instructions.","#personaCard"],
      ["Choose the supports","Reminders, timers, text size and more.","#supCard"],
      ["Change the look","Day or night, and how much things move.","#setTheme, #setMotion"],
      ["Back up your data","Everything in one file you can keep or move.","#exportApp"]],
    tips:{"new":["Changes save as you make them; there is no Save key to find.","Export a backup now and then, and keep the file somewhere safe."],
      some:["Your Ingenium sets how replies are written to you: the length, the tone and your own instructions.","Help and the guided tour sets your level here."],
      expert:["A cloud or server model is optional; with None, nothing leaves the device.","Recover an earlier moment brings Ingenium back as it was."]}}};
var APPN={tabula:"Tabula",abacus:"Abacus",slides:"Imago",scriba:"Scriba",fontes:"Fontes"};
var APPW={tabula:"Tabula is the writing app: documents with pages, footnotes and room for a thesis.",abacus:"Abacus is the tables app: sheets with formulas and charts.",
  slides:"Imago makes slides.",scriba:"Scriba records what is said and writes it down.",fontes:"Fontes is your reference database: sources, citations and their styles."};
function appHelp(a){return {name:APPN[a]||"The app",tour:["Making things","Tabula and Abacus"],
  what:(APPW[a]||"One of the apps Ingenium carries.")+" It runs inside Ingenium, and what you make there is kept.",
  plain:"Use it as you would any app. When you are done, the side list on the left brings you back to Ingenium.",
  dos:[["Switch between open apps","Each open app has a tab at the top.","#ing-deskbar"],
    ["Work in the app","The app itself, full size.","#ing-desk iframe.on"],
    ["Come back to Ingenium","Press any page in the side list.",".nav-btn[data-page=\"home\"]"]],
  tips:{"new":["What you make in an app is kept. Come back to it from Home or the side list."],some:["Open apps have tabs at the top; switch between them there."],
    expert:["An app can open in a window of its own, beside Ingenium."]}};}
function pageNow(){var b=D.body;if(b.classList.contains("ing-desk-on")){var f=D.querySelector("#ing-desk iframe.on"),a=f&&f.getAttribute("data-app");if(a)return "app:"+a;}
  var s=D.querySelector(".section.active"),id=s?s.id.replace(/^page-/,""):"home";
  try{if(id==="chat"&&typeof W.CC!=="undefined"&&W.CC&&W.CC.mode==="code")return "code";}catch(e){}
  try{if(id==="chat"&&typeof CC!=="undefined"&&CC&&CC.mode==="code")return "code";}catch(e){}
  return PG[id]?id:(PG.home&&id==="home"?"home":id);}
function helpFor(k){if(/^app:/.test(k))return appHelp(k.slice(4));return PG[k]||{name:(k.charAt(0).toUpperCase()+k.slice(1)),tour:null,
  what:"This page has no help of its own yet.",dos:[],tips:{"new":["The guided tour shows every room; press Take the tour."],some:[],expert:[]}};}
function scopeOf(k){if(/^app:/.test(k))return D.body;return D.querySelector(".section.active")||D.body;}
function findIn(sel,scope){var list=String(sel||"").split(/\s*,\s*/),i,n;for(i=0;i<list.length;i++){try{n=[].filter.call((scope||D).querySelectorAll(list[i]),seen)[0];}catch(e){n=null;}if(n)return n;}
  if(scope&&scope!==D.body)return findIn(sel,D.body);return null;}

/* ---------- What is this? : explanations for the main controls of every page ----------
   [selector, name, what it does, more for someone new, more for an expert] */
var WHAT=[
  ["#ingHelpKey","Help","Opens help about the page you are on: what it is for, what most people do there, and tips for your level.","Its What is this? key explains the next control you press.","F1 on any page; Shift+F1 explains the control in focus."],
  ["#brandSealBtn","The seal","Opens the introduction again, the door you saw when Ingenium opened."],
  ["#topChevron","Fold the controls","Folds the keys in the top bar away for a quieter screen, or brings them back. The Help key stays."],
  ["#statusPill","Your status","Says whether you are at the desk, on a break or away. Press it to change it, link it to Clepsydra or see the time report."],
  ["#enginePill","The engine","Shows whether the engine that runs models on this device is ready. Press it to open Models.","The engine is the program that runs a model; it needs no internet."],
  ["#activeModelPill","The model in use","Names the model that answers right now. Press it to open Models and choose another."],
  ["#clockPill","The time","The time of day. Press it to open Focus."],
  ["#refreshBtn","Refresh","Starts Ingenium again if it glitches or stops answering. Your work is saved first.",null,"F5 or Ctrl+R; Command+R on a Mac."],
  ["#displayBtn","Display","Changes the look: day or night, depth, the navigation, the frame and how much things move."],
  ["#aboutBtn","About","Shows which version of Ingenium this is and what it carries."],
  ["#navChevron","Fold the side list","Folds the list of pages on the left away to give the work more room, or opens it again."],
  ['.nav-btn[data-page="home"]',"Home","Where Ingenium opens: your next step and the rooms."],
  ['.nav-btn[data-page="chat"]',"Chat","Talk with a model: ask, write, and make documents."],
  ['.nav-btn[data-page="code"]',"Code","Build an app with the model and watch it run."],
  ['.nav-btn[data-page="focus"]',"Focus","Support for attention, time and calm."],
  ['.nav-btn[data-page="models"]',"Models","The models that write the answers: get one, bring your own, or choose another."],
  ['.nav-btn[data-page="blend"]',"Blend","Ask several modes at once and join their answers."],
  ['.nav-btn[data-page="lector"]',"Lector","Reads your apps and writes the documents you need from them."],
  ['.nav-btn[data-page="build"]',"Build","A page that runs as you type, ready to save as an app."],
  ['.nav-btn[data-page="fabrica"]',"Fabrica","Your apps as repositories: every version kept, tested and shipped."],
  ['.nav-btn[data-page="tabula"]',"Tabula","The writing app: documents with pages and footnotes."],
  ['.nav-btn[data-page="abacus"]',"Abacus","The tables app: sheets with formulas."],
  ['.nav-btn[data-page="slides"]',"Imago","The slides app."],
  ['.nav-btn[data-page="scriba"]',"Scriba","Records what is said and writes it down."],
  ['.nav-btn[data-page="fontes"]',"Fontes","Your reference database of sources and citations."],
  ['.nav-btn[data-page="guide"]',"Guide","The guided tour and short notes on how things work."],
  ['.nav-btn[data-page="settings"]',"Settings","Make Ingenium yours: your name, the supports, the look and your data."],
  ["#fabBell","Reminders","Sets a reminder, or shows the ones waiting."],
  ["#fabTheme","Day or night","Switches between the day look and the night look."],
  ["#fabTimer","Clepsydra, the focus clock","Opens the water clock: time you can see running down."],
  ["#fabNote","Schedae, quick notes","Opens a small notes panel beside any page."],
  ["#fabPark","Catch a thought","Writes down a stray thought for later, without leaving what you are doing. It waits in the Inbox in Focus."],
  ["#fabQuiet","Quiet screen","Covers the page with a calm screen when everything feels like too much."],
  ["#railChevron","Lay the side buttons down","Folds the side buttons away, or raises them again."],
  ["#heroNext","Your next step","The one useful thing to do next: bring in a model, load it, or start a chat.","Press it whenever you are unsure what to do."],
  ["#homeTour","The guided tour","A walk through every room in short chapters, at your level."],
  ["#hxModelsKey","Bring in a model","Opens the Models page, where you get a model or bring your own."],
  [".hx-key","A room","Opens that room. Each card says what is waiting there."],
  [".hx-app","An app","Opens one of the apps Ingenium carries, in a window of its own."],
  [".hx-recent","Where you left off","Your latest conversations, apps and documents. Press one to go straight back."],
  ["#ccSideBtn","The list","Shows every conversation (in Code, every app), so you can open an older one or start a new one."],
  ["#ccTitle","The title","The name of this conversation. Press it to rename it."],
  ["#chatCtlBtn","Controls","Sets how much effort the model puts in, how long its answers may be, and how much of the conversation it keeps in mind.",null,"The system prompt is here too."],
  ["#chatExpand","Expand","Gives the chat and the live preview the whole window. Press again to go back."],
  ["#chatMoreBtn","More","More for this conversation: save it, copy it, download it as an app, or remove it."],
  [".cc-idea","An idea to start","Puts this example in the message box, ready to send or change."],
  ["#cpJump","The newest message","Scrolls down to the newest message."],
  ["#chatInput","The message box","Write your message here, in everyday words.","When you are ready, press Enter or the round arrow to send it.","Enter sends; Shift+Enter starts a new line."],
  ["#chatImgBtn","The + key","Adds more to a message: a file to read, a photo, a screenshot, a project or skills. A web search too, but only when you switch it on."],
  ["#chatMicBtn","Dictate","Listens and writes what you say into the message box. The listening happens on this device."],
  ["#cpFast","Fast","Answers at once, without thinking first. Good for quick questions."],
  ["#chatModelBtn","Choose the model","Chooses which model answers, and loads it."],
  ["#chatSend","Send","Sends your message to the model.",null,"Enter does the same."],
  [".chat-grip","Make the chat taller","Drag it to make the chat longer or shorter."],
  ["#chatScroll .think-box","The thinking","What the model worked through before it answered. Press it to read it or fold it."],
  ["#page-chat .cc-hello .btn.primary","Choose an app","Picks the app you want to work on in Code, or starts a new one."],
  ["#fxTaskIn","The task box","Write a task here; Break it down turns it into small steps."],
  ["#fxNowCard","Now","What you are doing right now, and the next step."],
  ["#fxStepsCard","Steps","Your task as small steps. Tick one off and the next appears."],
  ["#fxTimeCard","Time","Timers you can see: Just start for two minutes, or a longer stretch."],
  ["#fxParkIn","Catch a thought","Write a stray thought and press Enter; it waits in the Inbox."],
  ["#fxParkCard","The Inbox","Thoughts you caught for later, kept until you deal with them."],
  ["#fxCalmCard","Calm","The quiet screen and a low energy day, for when things feel like too much."],
  ["#fxWordsCard","Clear words","Decodes a message that is hard to read, or helps draft a reply."],
  ["#fxRoutinesHost","Routines","Routines you repeat, one step at a time."],
  ["#fxTodayHost","Today asks of you","What today asks of you, in one list."],
  ["#fxSupportsHost","Your supports","Switch each support on or off, so Focus fits how you work."],
  ["#lineupGrid .seg-btn","Size and quality","How tightly the model is packed: the first is smallest and quickest, the last is closest to the original and about twice the size."],
  ["#lineupGrid","Ingenium's own models","Ingenium's models in four houses, each for a kind of work. The page says which suit this device."],
  ["#dropzone","Bring your own","Drop a model file (.gguf) here, or press to choose one."],
  ["#aiNew","Build a new AI","Makes an AI of your own: a model with its own instructions and name."],
  ["#aiImport","Add an AI from a file","Brings in an AI saved as an Ingenium AI file (.json)."],
  ["#aiCard","Your own AIs","AIs you made: a model with its own instructions and name."],
  ["#trainCard","Train a small model","Trains a very small model from zero on this device, to see how it is done."],
  ["#healthBox","Health","Checks that a model's file is whole and how well it runs here."],
  ["#catBox","More models","A catalogue of other models you can bring in."],
  ["#engineFetch","The engine","The program that runs models on this device. It is kept here."],
  [".bl-preset","A ready blend","A set of modes chosen for one kind of work. Use this blend picks it."],
  ["#blendTask","The task","Write the question or task once; every chosen mode answers it."],
  ["#blendRun","Run blend","Asks every chosen mode and joins the answers into one."],
  ["#blendSave","Save as a house","Keeps this blend so you can choose it like a model."],
  ["#blendThink","Think first","Lets the modes think before they answer. It is slower."],
  [".l-apps","Your apps","The apps Lector reads. Add yours, and Lector measures them from their files."],
  ["#lxRxSec","The recipe","Lector's rules for writing, and the verified sources it may cite."],
  ["#l7Model","The model","The model Lector writes with. Lector suggests the best one this device holds."],
  ["#l7Cite","Citations","How your sources are cited in the documents."],
  ["#l7Save","Save","Saves the document in the format chosen beside it."],
  ["#l7Copy","Copy","Copies the document's text."],
  ["#l7Code","The code window","Shows the code Lector is reading, line by line."],
  ["#l7Doc","The document","The document as it is written. Choose a format, then Save."],
  ["#l7Brief","The brief","Who the documents are for and what they are for: a portfolio, a job, a programme."],
  [".l-fold","Fold","Folds this panel away; press again to open it."],
  [".l-gut, #l7Vg","A divider","Drag it to share the room between the panels. It remembers where you leave it."],
  ["#runBtn","Run","Runs the page in the preview."],
  ["#autoRun","Run as you type","When on, the preview follows your typing."],
  ["#bdOpenBtn","Open","Opens your apps, Ingenium itself, an app in Fabrica, or a file."],
  ["#sampleBtn","Load a sample","Puts a small example page in the editor to try things with."],
  ["#clearBuild","Clear","Empties the editor."],
  ["#downloadBuild","Save this page","Saves the page as one HTML file."],
  ["#downloadZip","Package","Packages this app as a zip folder you can share or bring into Fabrica."],
  ["#codeEditor","The editor","Write or paste the page here: HTML, CSS and JavaScript."],
  ["#buildHandle","Resize","Drag to share the width between the code and the preview."],
  ["#hideEditor","Hide the code","Hides the code and gives the preview the width."],
  ["#viewPrev, #viewCode","Preview or code","Shows the running page, or its code."],
  ["#zoomOut, #zoomIn, #zoomFit","Zoom","Shows the preview smaller, larger, or fitted to the panel."],
  ["#dimPreview","Dim","Dims the preview for night work."],
  ["#foldPreview","Fold the preview","Rolls the preview up to its bar, or opens it again."],
  ["#fullPreview","Fill the screen","Fills the whole screen with the preview."],
  ["#floatPreview","Float","Floats the preview as a window you can drag and resize."],
  ["#closePreview","Close the preview","Closes the preview; the code takes the width."],
  ["#copyPreview","Copy the source","Copies the page's source."],
  ["#openPreview","Open in a new window","Opens the page in a window or tab of its own."],
  ["#dlPreview","Download","Downloads the page as an HTML file."],
  [".ship-row","A device","Makes this device's kit: the project that becomes the app there."],
  ["#shipAll","Every kit","Makes every device's kit, one zip each, saved one after another."],
  ["#fbNew","New app","Starts a new app as a repository on this device."],
  ["#fbBring","Bring one in","Brings in an app from a file, a folder or a zip."],
  ["#fbMore","More","Rename the app, edit a file, change its package details, or remove it."],
  ["#fbTest","Test this version","Runs the app's checks on this version before you ship it."],
  [".f-tg","A device to ship to","Press to choose this device for Make the chosen."],
  ["#fbMakeAll","Make the chosen","Makes the package for every device you chose, one after another."],
  [".f-fold, .f-secfold","Fold","Folds this part away; press again to open it."],
  [".f-split","A divider","Drag it to give one panel more room."],
  ["#fbApps, #fbRepos","Your apps","Every app Fabrica keeps. Choose one to work on it."],
  ["#fbWork","The work","The chosen app: its changes, files, history, releases and more, under tabs."],
  ["#fbShip","Test and ship","Test, Ship or Copies, one part at a time, chosen at its top."],
  ["#tourGo","Take the tour","Starts the guided tour, at your level."],
  [".tour-entry-chap","A chapter","Opens the tour at this chapter."],
  [".tip-fold-btn","A short note","Opens a short note; press again to fold it."],
  ["#setAppName","The app's name","What Ingenium calls itself on this device."],
  ["#ihSetCard","Help and the guided tour","Your level: how much the tour shows and how help is worded."],
  ["#supCard","Support","Switches for the supports: reminders, timers, text size and more."],
  ["#lkConnect","Connect","Connects to another computer's models with its address and code."],
  ["#linkCard","Your models on every device","Use a stronger computer's models from another device at home."],
  ["#psCustom","Your own instructions","Standing instructions every reply follows, such as British spelling."],
  ["#personaCard","Your Ingenium","How Ingenium writes to you: your name, the length, the tone, and your own instructions."],
  ["#cxProvider","A cloud or server model","Optional: connect a model run elsewhere. With None, everything stays offline."],
  ["#cxKey","Your key","The key for that service, kept on this device."],
  ["#srchKey","Search key","Your own key for web search, kept on this device."],
  ["#setTheme","Theme","Day, night, or follow the system."],
  ["#setMotion","Motion","How much things move. Calm or Minimal can be easier to work in."],
  ["#exportApp","Export a backup","Saves everything in one file you can keep, or move to another device."],
  ["#exPick","Choose what to export","Exports only the parts you choose."],
  ["#importApp","Import a backup","Replaces what is here with a backup file's contents, then starts again."],
  ["#recoverSnap","Recover an earlier moment","Brings Ingenium back as it was at an earlier moment."],
  ["#r132Keep","Keep the data","Asks the browser to keep Ingenium's data even when space runs low."],
  ["#clSetKey","Bring in conversations","Brings in conversations you exported from another assistant."],
  ["#resetAll","Reset everything","Clears everything on this device and starts fresh. It cannot be undone."],
  ["#addNote","New note","Starts an empty note."],
  ["#openSchedaeBtn","Open the panel","Opens your notes in a panel beside any page."],
  ["#ing-deskbar","Open apps","Each open app has a tab here. Press one to switch to it."],
  ["#ing-desk iframe","The app","The app itself, running inside Ingenium. What you make there is kept."]];
var INTERACTIVE='button,a[href],input,select,textarea,summary,iframe,[role=button],[role=tab],[role=switch],[role=radio],[role=checkbox],[role=menuitem],[role=slider],[role=separator],[tabindex]:not([tabindex="-1"])';
function entryOf(n){for(var i=0;i<WHAT.length;i++){try{if(n.matches(WHAT[i][0]))return WHAT[i];}catch(e){}}return null;}
function labelOf(n){if(!n)return "";var t=n.getAttribute("aria-label")||n.getAttribute("title")||n.getAttribute("placeholder")||"";
  if(!t&&n.id){try{var l=D.querySelector('label[for="'+n.id+'"]');if(l)t=l.textContent;}catch(e){}}
  if(!t&&n.closest("label"))t=n.closest("label").textContent;if(!t)t=n.textContent||"";return String(t).replace(/\s+/g," ").trim().slice(0,70);}
function wordsOf(e,lv){var t=e[2];if(lv==="expert")return firstSentence(t)+(e[4]?" "+e[4]:"");if(lv==="new"&&e[3])return t+" "+e[3];return t;}
/* the deepest control with an explanation; a control without one inside an explained part says what part it sits in */
function match(target){var ctl=target&&target.closest?target.closest(INTERACTIVE):null,n=target,e;
  while(n&&n!==D.body&&n.nodeType===1){e=entryOf(n);if(e){
      if(ctl&&ctl!==n&&n.contains(ctl)&&!entryOf(ctl)){var lb=labelOf(ctl);if(lb)return {el:ctl,e:[null,lb,"Part of "+e[1]+". "+e[2]]};}
      return {el:n,e:e};}
    n=n.parentElement;}
  if(ctl){var lab=labelOf(ctl);return {el:ctl,e:[null,lab||"This control",lab?"This control is labelled “"+lab+"”. The help for this page may say more about it.":"The help for this page may say more about it."]};}
  return null;}

/* ---------- the Help key, in the top bar ---------- */
var hk=null;
function ensureKey(){hk=$i("ingHelpKey");if(hk)return hk;var host=$i("topTools")||D.querySelector(".topbar");if(!host)return null;
  hk=mk("button","cl-key ih-help",null,{id:"ingHelpKey","aria-haspopup":"dialog","aria-expanded":"false","aria-keyshortcuts":"F1"});hk.type="button";
  hk.appendChild(mk("span","ih-q","?",{"aria-hidden":"true"}));hk.appendChild(mk("span","kl","Help"));
  hk.addEventListener("click",function(){toggleHelp();});host.appendChild(hk);nameKey();return hk;}
function nameKey(){if(!hk)return;var n=helpFor(pageNow()).name;hk.setAttribute("aria-label","Help with "+n);
  hk.title="Help with "+n+" (F1): what it is for, what people do here, and What is this? for any control";}

/* ---------- the help card ---------- */
var panel=null,back=null,cur=null;
function buildPanel(){panel=mk("aside",null,null,{id:"ihPanel",role:"dialog","aria-modal":"false","aria-labelledby":"ihTitle"});panel.hidden=true;
  var head=mk("div","ih-head"),hd=mk("div");hd.appendChild(mk("div","ih-eye","Help"));hd.appendChild(mk("h2",null,"",{id:"ihTitle",tabindex:"-1"}));head.appendChild(hd);
  var x=key("×","ih-x",{"aria-label":"Close help"});x.addEventListener("click",function(){closeHelp();});head.appendChild(x);panel.appendChild(head);
  panel.appendChild(mk("div","ih-body",null,{id:"ihBody"}));D.body.appendChild(panel);if(hk)hk.setAttribute("aria-controls","ihPanel");return panel;}
function fill(k){cur=k;var P=helpFor(k),lv=lvNow(),body=$i("ihBody");$i("ihTitle").textContent=P.name;body.innerHTML="";
  body.appendChild(mk("h3",null,"How help speaks to you"));body.appendChild(levelGroup("Your level for help and the tour"));
  body.appendChild(mk("p","ih-lvcap"));
  body.appendChild(mk("h3",null,"What it is for"));
  body.appendChild(mk("p",null,lv==="expert"?firstSentence(P.what):P.what+(lv==="new"&&P.plain?" "+P.plain:"")));
  if(P.dos&&P.dos.length){body.appendChild(mk("h3",null,lv==="expert"?"What people do here":"What most people do here"));var ol=mk("ol","ih-dos");
    P.dos.forEach(function(d){var li=mk("li"),b=key(null,"ih-do");b.appendChild(mk("span","ih-dt",d[0]));if(lv!=="expert")b.appendChild(mk("span","ih-dd",d[1]));
      b.appendChild(mk("span","ih-show","Show me",{"aria-hidden":"true"}));b.setAttribute("aria-label",d[0]+". "+d[1]+" Press to show it on the page.");
      b.addEventListener("click",function(){showMe(d[2],k,d[0]);});li.appendChild(b);ol.appendChild(li);});body.appendChild(ol);}
  var tips=(P.tips&&P.tips[lv])||[];if(tips.length){body.appendChild(mk("h3",null,lv==="new"?"Tips for someone new":lv==="expert"?"Shortcuts and tips":"Tips"));
    var ul=mk("ul","ih-tips");tips.forEach(function(t){ul.appendChild(mk("li",null,t));});body.appendChild(ul);}
  var keys=mk("div","ih-keys"),ask=key("What is this?","pri",{"aria-label":"What is this? Press it, then press any control to hear what it does"});ask.addEventListener("click",startAsk);keys.appendChild(ask);
  var at=tourIndex(P.tour),tk=key(at>=0?"Tour this page":"Take the guided tour");tk.addEventListener("click",function(){closeHelp(true);W.tourStart(at>=0?at:0);});keys.appendChild(tk);
  if(k!=="guide"){var gk=key("The short guide","quiet");gk.addEventListener("click",function(){closeHelp(true);W.go("guide");});keys.appendChild(gk);}
  body.appendChild(keys);
  /* every control on this page that has an explanation, each one opening its words in place */
  var list=controlsHere(k);if(list.length){var det=mk("details","ih-ctls"),sm=mk("summary",null,"Every control here, explained ("+list.length+")");det.appendChild(sm);
    list.forEach(function(h,j){var wrap=mk("div","ih-ctl"),b=key(h.e[1],"sm",{"aria-expanded":"false","aria-controls":"ihCtl"+j}),t=mk("p","ih-ctl-t",wordsOf(h.e,lv),{id:"ihCtl"+j});t.hidden=true;
      b.addEventListener("click",function(){var open=t.hidden;t.hidden=!open;b.setAttribute("aria-expanded",open?"true":"false");if(open)ring(h.el,true);});
      wrap.appendChild(b);wrap.appendChild(t);det.appendChild(wrap);});
    det.appendChild(mk("p","ih-note","The top bar, the side list and the side buttons are explained the same way: press What is this?, then press them."));body.appendChild(det);}
  paintLevels();}
function controlsHere(k){var scope=/^app:/.test(k)?$i("ing-desk"):D.querySelector(".section.active"),out=[],had={};if(!scope)return out;
  WHAT.forEach(function(e){if(had[e[1]])return;var n=null;try{n=[].filter.call(scope.querySelectorAll(e[0]),seen)[0];}catch(_){}if(n){had[e[1]]=1;out.push({el:n,e:e});}});
  if(/^app:/.test(k)){var bar=$i("ing-deskbar");if(bar&&seen(bar))out.unshift({el:bar,e:WHAT.filter(function(e){return e[0]==="#ing-deskbar";})[0]});}
  return out;}
function tourIndex(t){if(!t)return -1;var chap=t[0],sub=t[1],k,s,insub=!sub;
  for(k=0;k<T.length;k++){s=T[k];if(s.chap!==chap)continue;if(sub&&s.sub)insub=s.sub===sub;if(insub&&vis(k))return k;}
  for(k=0;k<T.length;k++)if(T[k].chap===chap&&vis(k))return k;return -1;}
function openHelp(k){closeBubble();stopAsk(true);ensureKey();if(!panel)buildPanel();var was=!panel.hidden;
  if(!was)back=D.activeElement;fill(k||pageNow());panel.hidden=false;
  panel.classList.remove("lively");if(!was&&lively()){void panel.offsetWidth;panel.classList.add("lively");}
  if(hk)hk.setAttribute("aria-expanded","true");try{$i("ihTitle").focus({preventScroll:true});}catch(e){}}
function closeHelp(quiet){if(!panel||panel.hidden)return;panel.hidden=true;if(hk)hk.setAttribute("aria-expanded","false");
  if(!quiet&&back&&back.focus&&D.contains(back))try{back.focus({preventScroll:true});}catch(e){}back=null;}
function toggleHelp(){if(panel&&!panel.hidden)closeHelp();else openHelp();}
onLevel.push(function(){if(panel&&!panel.hidden){var f=D.activeElement,lvk=f&&f.closest&&f.closest("#ihPanel .ih-lvk");fill(cur||pageNow());
  if(lvk){var n=panel.querySelector('.ih-lvk[data-lv="'+lvNow()+'"]');if(n)n.focus();}}});
function showMe(sel,k,name){var n=findIn(sel,scopeOf(k));if(!n){toast(name+" is not on the screen just now.");announce(name+" is not on the screen just now.");return;}ring(n,true);announce(name+" is ringed on the page.");}
var ringT=null,ringed=null;
function ring(n,scroll){if(ringed)ringed.classList.remove("ih-ring");clearTimeout(ringT);if(!n)return;
  if(scroll&&!n.closest(".topbar")&&!n.closest(".rail-btn"))try{n.scrollIntoView({block:"center",behavior:lively()?"smooth":"auto"});}catch(e){}
  n.classList.add("ih-ring");ringed=n;ringT=setTimeout(function(){n.classList.remove("ih-ring");ringed=null;},2600);}

/* ---------- What is this? : the next press on a control explains it, and does nothing else ---------- */
var asking=false,askBar=null,bubble=null,bubbleFor=null;
function buildAsk(){askBar=mk("div",null,null,{id:"ihAsk",role:"status","aria-live":"polite"});askBar.hidden=true;
  askBar.appendChild(mk("span","ih-asktitle","What is this?"));askBar.appendChild(mk("span","ih-asknote","Press any control to hear what it does."));
  var st=key("Stop","sm",{"aria-label":"Stop What is this?"});st.addEventListener("click",function(){stopAsk();});askBar.appendChild(st);D.body.appendChild(askBar);}
function startAsk(){closeHelp(true);closeBubble(true);if(!askBar)buildAsk();asking=true;D.body.classList.add("ih-asking");askBar.hidden=false;
  askBar.querySelector(".ih-asknote").textContent="Press any control to hear what it does. Esc stops.";
  announce("What is this? is on. Press any control, or move to it and press Enter, to hear what it does. Escape stops.");}
function stopAsk(quiet){if(!asking)return;asking=false;D.body.classList.remove("ih-asking");if(askBar)askBar.hidden=true;if(!quiet)announce("What is this? is off.");}
function mine(t){return !!(t&&t.closest&&(t.closest("#ihAsk")||t.closest("#ihBubble")));}
function explain(target,byKey){var h=match(target);
  if(!h){if(askBar)askBar.querySelector(".ih-asknote").textContent="That part is not a control. Press a key, a box or a switch.";announce("That part is not a control.");return false;}
  stopAsk(true);showBubble(h.el,h.e,byKey);return true;}
function closeBubble(quiet){if(!bubble||bubble.hidden)return;bubble.hidden=true;var f=bubbleFor;bubbleFor=null;
  if(!quiet&&f&&f.focus&&D.contains(f)&&f.matches(INTERACTIVE))try{f.focus({preventScroll:true});}catch(e){}}
function showBubble(n,e,byKey){if(!bubble){bubble=mk("div",null,null,{id:"ihBubble",role:"dialog","aria-labelledby":"ihBubT","aria-describedby":"ihBubP"});bubble.hidden=true;D.body.appendChild(bubble);}
  var lv=lvNow();bubble.innerHTML="";bubble.appendChild(mk("div","ih-eye","What is this?"));bubble.appendChild(mk("h4",null,e[1],{id:"ihBubT"}));
  bubble.appendChild(mk("p",null,wordsOf(e,lv),{id:"ihBubP"}));
  var ks=mk("div","ih-keys"),again=key("Explain another","sm"),done=key("Close","sm pri");
  again.addEventListener("click",function(){closeBubble(true);startAsk();});done.addEventListener("click",function(){closeBubble();});ks.appendChild(again);ks.appendChild(done);bubble.appendChild(ks);
  bubbleFor=n;bubble.hidden=false;ring(n,false);
  var r=n.getBoundingClientRect(),vw=W.innerWidth||1024,vh=W.innerHeight||768,bw=bubble.offsetWidth,bh=bubble.offsetHeight,
    left=Math.max(12,Math.min(vw-bw-12,r.left+r.width/2-bw/2)),top=r.bottom+12;
  if(top+bh>vh-12)top=r.top-bh-12;if(top<12)top=Math.max(12,Math.min(vh-bh-12,r.top+12));
  bubble.style.left=Math.round(left)+"px";bubble.style.top=Math.round(top)+"px";
  bubble.classList.remove("lively");if(lively()){void bubble.offsetWidth;bubble.classList.add("lively");}
  announce(e[1]+". "+wordsOf(e,lv));try{(byKey?done:again).focus({preventScroll:true});}catch(_){}}
/* while asking, a press reaches no control: it is caught before anything else hears it */
function swallow(ev){if(!asking||mine(ev.target))return;ev.preventDefault();ev.stopPropagation();if(ev.stopImmediatePropagation)ev.stopImmediatePropagation();}
["pointerdown","mousedown","pointerup","mouseup","dblclick","contextmenu"].forEach(function(t){W.addEventListener(t,swallow,true);});
W.addEventListener("click",function(ev){if(bubble&&!bubble.hidden&&!mine(ev.target)&&!asking){closeBubble(true);}
  if(!asking||mine(ev.target))return;ev.preventDefault();ev.stopPropagation();if(ev.stopImmediatePropagation)ev.stopImmediatePropagation();explain(ev.target,false);},true);
/* a press inside an app's own window cannot be caught; the window itself is explained instead */
W.addEventListener("blur",function(){setTimeout(function(){var a=D.activeElement;if(asking&&a&&a.tagName==="IFRAME")explain(a,false);},0);});

/* ---------- the keyboard: F1, Shift+F1 and ? ; Escape closes what this part opened, nearest first ---------- */
W.addEventListener("keydown",function(e){
  if(asking){if(e.key==="Escape"){e.preventDefault();e.stopPropagation();stopAsk();return;}
    if((e.key==="Enter"||e.key===" ")&&!mine(e.target)){var a=D.activeElement;if(a&&a!==D.body&&a!==D.documentElement){e.preventDefault();e.stopPropagation();if(e.stopImmediatePropagation)e.stopImmediatePropagation();explain(a,true);}}
    return;}
  if(pickerOpen()){if(e.key==="Escape"){e.preventDefault();e.stopPropagation();closePicker();return;}
    if(/^Arrow(Left|Right|Up|Down)$/.test(e.key)){var ks=[].slice.call(D.querySelectorAll("#ingTour .ih-pickg .ih-lvk")),i=ks.indexOf(D.activeElement);
      e.preventDefault();e.stopPropagation();if(i<0){if(ks[0])ks[0].focus();return;}var d=/Right|Down/.test(e.key)?1:-1;ks[(i+d+ks.length)%ks.length].focus();return;}}
  if(e.key==="Escape"){
    if(bubble&&!bubble.hidden){e.preventDefault();e.stopPropagation();closeBubble();return;}
    var m=$i("tourMenu");if(m){e.preventDefault();e.stopPropagation();m.remove();var ch=D.querySelector("#ingTour .tour-chap");if(ch)ch.focus();return;}
    var lr=D.querySelector("#ingTour .ih-lvrow");if(lr&&lr.contains(D.activeElement)){e.preventDefault();e.stopPropagation();var c=D.querySelector("#ingTour .ih-lvchip");lr.remove();if(c){c.setAttribute("aria-expanded","false");c.focus();}return;}
    if(panel&&!panel.hidden){e.preventDefault();e.stopPropagation();closeHelp();return;}
    return;}
  if(e.key==="F1"){e.preventDefault();e.stopPropagation();if(e.shiftKey){var f=D.activeElement;if(f&&f!==D.body&&!mine(f)&&!(panel&&panel.contains(f))){explain(f,true);return;}}toggleHelp();return;}
  if(e.key==="?"&&!e.ctrlKey&&!e.metaKey&&!e.altKey&&!typing()){e.preventDefault();toggleHelp();}},true);
/* the card the bubble explains moves away: the bubble goes with it */
W.addEventListener("resize",function(){closeBubble(true);});
W.addEventListener("scroll",function(){if(bubble&&!bubble.hidden&&bubbleFor){var r=bubbleFor.getBoundingClientRect();if(r.bottom<0||r.top>(W.innerHeight||800))closeBubble(true);}},true);

/* ---------- Settings: the level, a way into the tour and into What is this? ---------- */
function ensureSetCard(){var sup=$i("supCard");if(!sup||$i("ihSetCard"))return;
  var c=mk("div","card",null,{id:"ihSetCard"});c.appendChild(mk("h2","sec","Help and the guided tour"));
  c.appendChild(mk("p","small muted","How much the tour shows and how help is worded. The tour asks once when it starts; change it here whenever you like."));
  c.appendChild(levelGroup("Your level for help and the tour",true));
  var row=mk("div","ih-row"),t=key("Take the tour at this level","pri");t.addEventListener("click",function(){W.tourStart(0);});
  var w=key("What is this?");w.addEventListener("click",startAsk);row.appendChild(t);row.appendChild(w);c.appendChild(row);
  c.appendChild(mk("p","small muted","Help is on every page: the Help key at the top right, or F1. Shift+F1 explains the control in focus."));
  sup.after(c);paintLevels();}

/* ---------- each page change: the key says which page it helps with, and an open help card follows ---------- */
var og=W.go;if(typeof og==="function"){W.go=function(){var r=og.apply(this,arguments);
  setTimeout(function(){try{nameKey();ensureSetCard();if(panel&&!panel.hidden)fill(pageNow());}catch(e){warn(e);}},90);return r;};}

/* ---------- start: only the key and the Settings card; everything else is made when it is first wanted ---------- */
function boot(){try{ensureKey();ensureSetCard();paintLevels();if($i("guideTour")&&!$i("guideTour").querySelector(".ih-lv"))entryDress();}catch(e){warn(e);}}
if(D.readyState==="loading")D.addEventListener("DOMContentLoaded",boot);else boot();

W.IngHelp={open:openHelp,close:closeHelp,toggle:toggleHelp,ask:startAsk,stopAsk:stopAsk,explain:function(n){return explain(n,true);},page:pageNow,
  level:level,setLevel:setLevel,levels:LV,visible:vis,cardsFor:cardsFor,shownAt:shownAt,pages:PG,map:WHAT,controlsHere:controlsHere,tourIndex:tourIndex};
})();
;try{window.__ingParts["p65"]="running";}catch(_){}
</script>
