<style id="r301-css">
/* ============ R301 · THE TOP BAR, ORGANISED (Ingenium 7.14, 15 November 2026; as 7.13's again in 7.15, the same day) ============
   Her words (15 November 2026): "I need you to neaten and tidy up the top bar and its buttons, it might slightly be overcrowded".
   7.14 made every key 28 pixels tall and wider, joined the four readings in one capsule and raised a plate behind the seal and the name.
   Her words on 7.14: "I hate the conneted raised bar that holds Ingenium's engine button logo and the Ingenium title, it looks stupid
   and and the engine button is skewed to the right anyway leaving a weird space on the left. I dislike it and want it removed and the
   old separated look of the engine button logo and the title. As far as the top bar itself, you made all of the buttons flat which I
   hate and made then wider and longer which is very irritating ... I only wanted the top bad tidied up and be more organised ... You
   need it to fix it and restore the animated popped out 3D look of the top bar's buttons."
   So, from 7.15: the seal and the name stand apart again, with no plate; every key has its 7.13 size, face, depth and motion (each its
   own raised key that lifts under the pointer and sinks when pressed); nothing is joined. Organised only: the keys evenly spaced, the
   readings (where you are, the engine, the model, the clock) a little apart from the actions (Display, Studio, About, Help), and the
   hide key as tall as its neighbours, round and raised as they are. Never larger, never wider, never flat.
   Kept from 7.14, unseen until the bar is short of room: the seal never shrinks under the first key (on a 390 pixel phone with a long
   model's name it ran 7 pixels off the edge and 9 under the key); r174's steps come first: the name INGENIUM, then the engine's words,
   then the keys' words (Studio its pencil alone, its word kept for screen readers), and a long model's name shortens with an ellipsis.
   The keys are spaced by margins: Chrome 83 has no gap in a flex row, so there they touched. */

/* 1. even spaces (margins, not gap), the readings a little apart from the actions */
body #topTools{gap:0}
body #topTools>*{margin-left:3px}
body #topTools>:first-child{margin-left:0}
body #topTools #displayBtn{margin-left:9px}
@media (max-width:640px){body #topTools>*{margin-left:4px}body #topTools>:first-child{margin-left:0}body #topTools #displayBtn{margin-left:8px}}
/* the hide key: as tall as its neighbours, round, raised as they are, lifting and sinking as they do */
body #topTools #topChevron{flex:0 0 21px;width:21px;height:21px;border-radius:999px;font-size:12.5px;line-height:1;
  border:1px solid rgba(106,63,181,.5);background:var(--card-hi,#fff);color:var(--ink-2,#4a4358);
  box-shadow:inset 0 1px 0 rgba(255,255,255,.6),inset 0 -1.5px 0 rgba(40,20,70,.10),0 1px 0 rgba(40,20,70,.12),0 3px 5px rgba(40,20,70,.09);
  transition:transform .1s cubic-bezier(.34,1.35,.64,1),box-shadow .12s ease,border-color .12s ease,color .12s ease}
body[data-theme="night"] #topTools #topChevron{border-color:rgba(183,156,230,.45);color:var(--ink-2,#cfc6dc);
  box-shadow:inset 0 1px 0 rgba(255,255,255,.09),inset 0 -1.5px 0 rgba(0,0,0,.4),0 1px 0 rgba(0,0,0,.5),0 3px 5px rgba(0,0,0,.4)}
body #topTools #topChevron:hover{transform:translateY(-2px);border-color:var(--accent);color:var(--accent);
  box-shadow:inset 0 -1.5px 0 rgba(40,20,70,.10),0 2px 0 rgba(40,20,70,.14),0 5px 5px rgba(40,20,70,.10),0 10px 14px rgba(40,20,70,.07)}
body #topTools #topChevron:active{transform:translateY(1px);transition-duration:.05s;box-shadow:inset 0 2px 5px rgba(40,20,70,.24)}
/* at 760 pixels and less the app's keys are 28 pixels tall (its narrow layout): the hide key with them */
@media (max-width:760px){body #topTools #topChevron{flex-basis:28px;width:28px;height:28px}}

/* 2. the steps when the bar is short of room (r174 sets the classes on <html>), each key keeping its 7.13 size */
/* the engine's long words go first: its coloured dot stays, its words stay in its title */
html.ing-tb-eng body #engineText{display:none}
html.ing-tb-eng body .topbar #topTools #enginePill{padding:0;width:30px;min-width:30px;justify-content:center}
/* the keys' signs alone: Studio shows its pencil alone too, as Display and About show their signs (its word stays for screen readers) */
html.ing-tb-icons body .topbar #topTools #auTopKey{width:30px;min-width:30px;padding:0;gap:0;font-size:0;justify-content:center}
/* and a long model's name shortens with an ellipsis to the room there is, before r174 gives it its dot alone (under 56 px) */
html.ing-tb-icons body .topbar #topTools{flex:0 1 auto;min-width:0}
html.ing-tb-icons body .topbar #topTools>*{flex-shrink:0}
html.ing-tb-icons body .topbar #topTools #activeModelPill{flex-shrink:1;min-width:0}
html.ing-tb-icons body .topbar #activeModelPill .nm{flex:0 1 auto;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
/* the seal never gives way to the keys */
body .topbar #brandSealBtn{flex-shrink:0}

/* Minimal motion and the system's reduced motion: the hide key still changes, without moving */
body[data-motion="minimal"] #topTools #topChevron:hover,body[data-motion="minimal"] #topTools #topChevron:active{transform:none}
@media (prefers-reduced-motion:reduce){body #topTools #topChevron:hover,body #topTools #topChevron:active{transform:none}}
</style>
<script>try{(window.__ingParts=window.__ingParts||{})["p301"]="started";}catch(_){}
/* R301 · the top bar, organised: see the note at the top of its styles. 7.15: nothing is joined any more, so nothing is marked; the
   marks 7.14 wrote on the readings (tb-seg) are taken off a page that kept them */
(function(){"use strict";
if(window.__r301)return;window.__r301=1;
try{["statusPill","enginePill","activeModelPill","clockPill"].forEach(function(id){var e=document.getElementById(id);if(e)e.classList.remove("tb-seg","tb-seg-first","tb-seg-last");});}catch(e){}
try{window.__ingParts["p301"]="running";}catch(_){}
})();
</script>
