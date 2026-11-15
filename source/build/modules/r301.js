<style id="r301-css">
/* ============ R301 · THE TOP BAR, TIDIED (Ingenium 7.14, 15 November 2026) ============
   Her words (15 November 2026): "I need you to neaten and tidy up the top bar and its buttons, it might slightly" (the message ended
   there). On the live preview (https://claude.ai/artifact/Ewwa5ypsZWVGAkYDm5mYd4, version 1), which recommended one capsule for the
   readings, 28 pixel keys and the INGENIUM plate raised: "I approve of your recommendations, please push it everywhere and continue
   working on my requests."
   Measured on 7.13: at 1440 and 1280 pixels one bar held three heights (30, 20 and 21 px), three corners (9 px, 5 px, round) and three
   type sizes (13.3, 13 and 11 px), with 2 to 4 px between keys; on a phone the keys were 30 by 28 px. When the bar was short of room the
   seal was squeezed: with a model's name filling its key, on a 390 pixel phone it ran 7 px off the left edge and 9 px under the first
   key; with no model chosen, at 360 px (2.4 off, 4.5 under); in a window 720 px wide, 4.5 px off the edge. The INGENIUM plate was the
   one key without a raised body.
   What this module does:
   - every key of the bar one height (28 px), one round shape (the hide key too), one type size (12 px; 11.5 px at 1100 px and less),
     six pixels apart (four at 1100 px and less), spaced by margins: Chrome 83 has no gap in a flex row, so there the keys touched;
   - the four readings (status, engine, model, clock) joined in one raised capsule with fine dividers; the script below marks the first
     and last reading shown (tb-seg-first, tb-seg-last), so the capsule closes on whichever is hidden (the clock on a phone);
   - a wider space between the readings and the actions (16 px; 12 px at 1100 and less; 10 px on a phone);
   - the seal never shrinks: when the keys need more room, r174's fitting takes its next step, in this order: the name INGENIUM, then the
     engine's words (ing-tb-eng, new in r174 for 7.14), then the keys' words (Studio shows its pencil alone there; its word stays in the
     key for screen readers, too small to see), and last a long model's name shortens with an ellipsis, down to the 56 px r174 keeps
     before it shows the model's dot alone;
   - the INGENIUM plate raised, lifting under the pointer and sinking when pressed; with the seal alone, the seal is its own key.
   Nothing else changes: every key keeps its place, its sound and what it does. Still under Minimal motion and reduced motion (r176). */
body{--tbh:28px;--tbpad:12px;--tbfs:12px;--tbsp:6px;--tbsep:16px}
@media (max-width:1100px){body{--tbpad:9px;--tbfs:11.5px;--tbsp:4px;--tbsep:12px}}
@media (max-width:760px){body{--tbsep:10px}}

/* 1. one height, one shape, one type size, even spaces (margins, not gap) */
body #topTools{gap:0;padding:2px 0}
body #topTools>*{margin-left:var(--tbsp)}
body #topTools>:first-child{margin-left:0}
body #topTools .cl-key{height:var(--tbh);padding:0 var(--tbpad);font-size:var(--tbfs)}
body #topTools #displayBtn{margin-left:var(--tbsep)}
/* the hide key: round, with the keys' own rim and depth */
body #topTools #topChevron{flex:0 0 var(--tbh);width:var(--tbh);height:var(--tbh);border-radius:999px;font-size:14px;
  border-color:rgba(106,63,181,.5);color:var(--ink-2,#4a4358);
  box-shadow:inset 0 1px 0 rgba(255,255,255,.6),inset 0 -1.5px 0 rgba(40,20,70,.10),0 1px 0 rgba(40,20,70,.12),0 3px 5px rgba(40,20,70,.09);
  transition:transform .1s cubic-bezier(.34,1.35,.64,1),box-shadow .12s ease,border-color .12s ease,color .12s ease}
body[data-theme="night"] #topTools #topChevron{border-color:rgba(183,156,230,.45);color:var(--ink-2,#cfc6dc);
  box-shadow:inset 0 1px 0 rgba(255,255,255,.09),inset 0 -1.5px 0 rgba(0,0,0,.4),0 1px 0 rgba(0,0,0,.5),0 3px 5px rgba(0,0,0,.4)}
body #topTools #topChevron:hover{transform:translateY(-2px);border-color:var(--accent);color:var(--accent);
  box-shadow:inset 0 -1.5px 0 rgba(40,20,70,.10),0 2px 0 rgba(40,20,70,.14),0 5px 5px rgba(40,20,70,.10),0 10px 14px rgba(40,20,70,.07)}
body #topTools #topChevron:active{transform:translateY(1px);transition-duration:.05s;box-shadow:inset 0 2px 5px rgba(40,20,70,.24)}
/* a phone (640 px and less, where the app shows these keys' signs alone): true circles */
@media (max-width:640px){
  body #topTools #statusPill,body #topTools #enginePill,body #topTools #displayBtn,body #topTools #aboutBtn,body #topTools #ingHelpKey{padding:0;width:var(--tbh);min-width:var(--tbh);justify-content:center}
}

/* 2. the steps when the bar is short of room (r174 sets the classes on <html>) */
/* the engine's long words go first: its coloured dot stays, its words stay in its title */
html.ing-tb-eng body #engineText{display:none}
html.ing-tb-eng body .topbar #topTools #enginePill{padding:0;width:var(--tbh);min-width:var(--tbh);justify-content:center}
/* the keys' signs alone: true circles; Studio shows its pencil alone, as Display and About show their signs */
html.ing-tb-icons body .topbar #topTools #statusPill,html.ing-tb-icons body .topbar #topTools #enginePill,html.ing-tb-icons body .topbar #topTools #displayBtn,
html.ing-tb-icons body .topbar #topTools #aboutBtn,html.ing-tb-icons body .topbar #topTools #ingHelpKey{width:var(--tbh);min-width:var(--tbh)}
html.ing-tb-icons body .topbar #topTools #auTopKey{width:var(--tbh);min-width:var(--tbh);padding:0;gap:0;font-size:0;justify-content:center}
/* and a long model's name shortens with an ellipsis to the room there is, before r174 gives it its dot alone (under 56 px) */
html.ing-tb-icons body .topbar #topTools{flex:0 1 auto;min-width:0}
html.ing-tb-icons body .topbar #topTools>*{flex-shrink:0}
html.ing-tb-icons body .topbar #topTools #activeModelPill{flex-shrink:1;min-width:0}
html.ing-tb-icons body .topbar #activeModelPill .nm{flex:0 1 auto;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
/* the seal never gives way to the keys */
body .topbar #brandSealBtn{flex-shrink:0}

/* 3. one capsule for the readings: joined, fine dividers, raised as one; the sides of each part's shadow that would fall on its
   neighbour are clipped, so the capsule's shadow runs unbroken; a reading under the pointer rises out of it with its shadow whole */
body #topTools .tb-seg{border-radius:0;margin-left:0;-webkit-clip-path:inset(-14px 0 -14px 0);clip-path:inset(-14px 0 -14px 0)}
body #topTools .tb-seg-first{border-radius:999px 0 0 999px;margin-left:var(--tbsp);-webkit-clip-path:inset(-14px 0 -14px -14px);clip-path:inset(-14px 0 -14px -14px);padding-left:calc(var(--tbpad) + 2px)}
body #topTools .tb-seg-last{border-radius:0 999px 999px 0;-webkit-clip-path:inset(-14px -14px -14px 0);clip-path:inset(-14px -14px -14px 0);padding-right:calc(var(--tbpad) + 2px)}
body #topTools .tb-seg-first.tb-seg-last{border-radius:999px;-webkit-clip-path:none;clip-path:none}
body #topTools>.tb-seg-first:first-child{margin-left:0}
body #topTools .tb-seg:not(.tb-seg-first){border-left-width:0 !important}
body #topTools .tb-seg:not(.tb-seg-last){border-right-color:rgba(106,63,181,.2) !important}
body[data-theme="night"] #topTools .tb-seg:not(.tb-seg-last){border-right-color:rgba(183,156,230,.2) !important}
body #topTools .tb-seg:hover{-webkit-clip-path:none;clip-path:none;z-index:1}
body #topTools .tb-seg:not(.tb-seg-first):hover{border-left-width:1px !important;margin-left:-1px}
body #topTools .tb-seg:focus{-webkit-clip-path:none;clip-path:none;z-index:2}

/* 4. the INGENIUM plate raised, as every key is: it lifts under the pointer and sinks when pressed (the seal keeps its own motion) */
body .topbar button.brand{background:linear-gradient(180deg,var(--card-hi,#fff),var(--card,#faf8fc));padding:3px 14px 3px 4px;border-radius:999px;
  box-shadow:inset 0 0 0 1px rgba(106,63,181,.24),inset 0 1px 0 rgba(255,255,255,.6),inset 0 -1.5px 0 rgba(40,20,70,.08),0 1px 0 rgba(40,20,70,.10),0 3px 6px rgba(40,20,70,.08);
  transition:transform .12s cubic-bezier(.34,1.35,.64,1),box-shadow .12s ease}
body .topbar button.brand:hover{background:linear-gradient(180deg,var(--card-hi,#fff),var(--card,#faf8fc));transform:translateY(-1px);
  box-shadow:inset 0 0 0 1px rgba(106,63,181,.4),inset 0 -1.5px 0 rgba(40,20,70,.08),0 2px 0 rgba(40,20,70,.12),0 6px 10px rgba(40,20,70,.10)}
body .topbar button.brand:active{transform:translateY(1px);transition-duration:.05s;box-shadow:inset 0 0 0 1px rgba(106,63,181,.3),inset 0 2px 5px rgba(40,20,70,.2)}
body[data-theme="night"] .topbar button.brand{box-shadow:inset 0 0 0 1px rgba(183,156,230,.22),inset 0 1px 0 rgba(255,255,255,.07),inset 0 -1.5px 0 rgba(0,0,0,.4),0 1px 0 rgba(0,0,0,.5),0 3px 6px rgba(0,0,0,.4)}
body[data-theme="night"] .topbar button.brand:hover{box-shadow:inset 0 0 0 1px rgba(183,156,230,.4),inset 0 -1.5px 0 rgba(0,0,0,.4),0 2px 0 rgba(0,0,0,.5),0 6px 10px rgba(0,0,0,.45)}
/* the seal alone (a phone, a narrow window): no plate behind it */
html.ing-tb-seal body .topbar button.brand,html.ing-tb-seal body .topbar button.brand:hover,html.ing-tb-seal body .topbar button.brand:active{background:transparent;box-shadow:none}
/* Minimal motion and the system's reduced motion: the keys still change, without moving */
body[data-motion="minimal"] #topTools #topChevron:hover,body[data-motion="minimal"] #topTools #topChevron:active,
body[data-motion="minimal"] .topbar button.brand:hover,body[data-motion="minimal"] .topbar button.brand:active{transform:none}
@media (prefers-reduced-motion:reduce){
  body #topTools #topChevron:hover,body #topTools #topChevron:active,body .topbar button.brand:hover,body .topbar button.brand:active{transform:none}
}
</style>
<script>try{(window.__ingParts=window.__ingParts||{})["p301"]="started";}catch(_){}
/* R301 · the top bar, tidied: see the note at the top of its styles */
(function(){"use strict";
if(window.__r301)return;window.__r301=1;
var D=document,W=window,READ=["statusPill","enginePill","activeModelPill","clockPill"];
function shown(e){if(!e||!e.isConnected)return false;var c=getComputedStyle(e);return c.display!=="none"&&c.visibility!=="hidden";}
/* a class written only when it changes, so the watchers below never wake themselves */
function cls(e,c,on){if(e.classList.contains(c)===on)return false;if(on)e.classList.add(c);else e.classList.remove(c);return true;}
/* the capsule: the readings shown, the first and the last marked */
function segs(){var v=[],ch=false;
  READ.forEach(function(id){var e=D.getElementById(id);if(e&&shown(e))v.push(e);});
  READ.forEach(function(id){var e=D.getElementById(id);if(!e)return;var i=v.indexOf(e);
    if(cls(e,"tb-seg",i>=0))ch=true;
    if(cls(e,"tb-seg-first",i===0))ch=true;
    if(cls(e,"tb-seg-last",i>=0&&i===v.length-1))ch=true;});
  return ch;}
/* when the capsule changed, r174 measures the bar again (its widths changed with it) */
function look(){try{if(segs()&&W.IngPhone&&IngPhone.fit)IngPhone.fit();}catch(e){}}
var due=0;function soon(){if(due)return;due=1;setTimeout(function(){due=0;look();},40);}
function watch(){try{var mo=new MutationObserver(soon);
    READ.forEach(function(id){var e=D.getElementById(id);if(e)mo.observe(e,{attributes:true,attributeFilter:["hidden","style"]});});
    mo.observe(D.body,{attributes:true,attributeFilter:["class","data-focus","data-text","data-nav"]});
    mo.observe(D.documentElement,{attributes:true,attributeFilter:["class"]});}catch(e){}
  W.addEventListener("resize",soon);
  try{W.addEventListener("orientationchange",function(){setTimeout(look,260);});}catch(e){}}
function start(){look();watch();setTimeout(look,500);}
if(D.readyState==="loading")D.addEventListener("DOMContentLoaded",start);else start();
try{W.addEventListener("load",look);}catch(e){}
W.IngTopBar={look:look,segs:function(){return READ.map(function(id){var e=D.getElementById(id);return e?e.className:"";});}};
try{window.__ingParts["p301"]="running";}catch(_){}
})();
</script>
