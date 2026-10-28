<style id="r153-css">
/* ============ R153 · THE REMINDERS IN INGENIUM'S OWN AMETHYST CARD ============
   The owner's words (21 October 2026): "I want the time reminders that show up on the screen to be in a blue card or a
   better colour that matches the app better instead of the black colour it currently is, please make the fix."
   What was black, measured: the two-minute chip by night (#20242a, the support module's grey, in no colour of
   Ingenium's); the rest of what comes at a time (a thought that asked to come back, the gentle notices at the bottom
   left, Custodia's "A pause, earned") came in the page's own card: white by day, and by night a plum so dark it reads
   as black (#2a2239).
   Ingenium's colour is amethyst, not blue: blue is the Forge's and Carpe Diem's, so a blue card here would blur which
   app is which. So each reminder now comes in Ingenium's jewel: its deep amethyst (#4e2c8a to #43277a, the fill its
   violet keys are made of, "deep in both themes so white text passes"), its antique gold rim (#caa24a) and its
   lilac-white ink (#f3eefb), by day and by night, in the same place and at the same size as before. The shared modules
   draw their part (SupportCore and ThoughtCloud, .reminders(look)); the notices and Custodia are dressed here.
   6.8 (27 October 2026), the owner's words: "The little 'Thoughts' reminders from Ingenium look 2D and almost childlike and
   does not match the look of the rest of the app. I want full parity with Carpe Diem's 'Thoughts' reminder cloud popups [...]
   but match it to Ingenium's look and colour palette." A thought that comes back is no longer laid in the flat amethyst card:
   it is the raised card the thoughts share with Carpe Diem and the Forge (its paper with a lit edge and a wall beneath, the
   small clouds trailing to the 💭, keys that stand up and press down), in Ingenium's colours: by day Ingenium's paper with its
   violet key, by night Ingenium's amethyst with the gold edge, never a plum that reads as black. The other timed reminders
   keep the amethyst card. */
/* a thought that comes back, by night: the shared raised card, its face Ingenium's amethyst, greyed and deepened (6.8.1: her
   words, "the purple colour is too bight and harsh on both light and dark mode"), still purple, never a plum that reads as
   black; its keys a soft lavender. By day the keys take the same quieter amethyst as every popup card (r184). */
.tc-el.tc-nudge[data-tc-app="ingenium"][data-tc-night="1"]{--tc-face-a:#3a2e55;--tc-face-b:#32274a;--tc-wall:#18111f;--tc-lip:rgba(255,255,255,.09);
  --tc-rim:rgba(202,162,74,.42);--tc-ink:#ece6f6;--tc-soft:rgba(236,230,246,.76);--tc-acc:#7867a3;--tc-acc-hi:#8574b0;--tc-acc-lo:#6a5994;
  --tc-acc-edge:#2f2547;--tc-on-acc:#ffffff}
/* 6.8.2: by night the words of the plain keys (Later, Done), a chosen chip and a suggestion are soft lavender: the deep accent
   read at 2.6 to 1 on the night card (rig/t_reminder_cards.js); the raised key keeps its own face */
.tc-el.tc-nudge[data-tc-app="ingenium"][data-tc-night="1"] .tc-key:not(.tc-keep),.tc-el[data-tc-app="ingenium"][data-tc-night="1"] .tc-chip[aria-pressed="true"],
.tc-el[data-tc-app="ingenium"][data-tc-night="1"] .tc-sug b{color:#d4c8f2}
.tc-el[data-tc-app="ingenium"][data-tc-night="1"] .tc-key:focus-visible{outline-color:#d4c8f2}
.tc-el[data-tc-app="ingenium"]:not([data-tc-night="1"]){--tc-acc:#5b4690;--tc-acc-hi:#6a56a0;--tc-acc-lo:#4c3a7c;--tc-acc-edge:#352858}
/* and by day its close mark in Ingenium's second ink (the shared faint grey read at 2.65 to 1 on the paper) */
.tc-el.tc-nudge[data-tc-app="ingenium"]:not([data-tc-night="1"]) .tc-nudge-x{color:#6c6579}
/* 6.8.2: the support notes ("Where you were", a break offered) and the time guard's card, raised and quieter, as every popup
   card is (r184); they kept the bright amethyst face. Her words (28 October 2026): "The continue where you left off popup card
   when I first opened the app after install is still that bright ugly purple colour that I requested changed". By day the
   card's paper face and its quiet amethyst key; by night the deep, greyed amethyst face and the soft lavender key. */
#supNotice .sup-note,body:not([data-depth="flat"]) #supNotice .sup-note,#custodiaOverlay .cust-card,body[data-theme="night"] #custodiaOverlay .cust-card{
  background:linear-gradient(180deg,var(--rc-face-a,#fff),var(--rc-face-b,#f7f5fa) 62%,color-mix(in srgb,var(--rc-face-b,#f7f5fa) 93%,var(--rc-wall,#d3cbe0)));
  color:var(--rc-ink,#221a2e);border:1px solid transparent;box-shadow:var(--rc-slab,0 2px 3px rgba(40,22,68,.10),0 10px 26px rgba(40,22,68,.16))}
#supNotice .sup-note .sup-note-title,#supNotice .sup-note .sup-note-body{color:var(--rc-ink,#221a2e)}
#supNotice .sup-note .fx-ico{color:var(--rc-acc,#5b4690);background:rgba(var(--rc-fam,40,22,68),.08)}
body[data-theme="night"] #supNotice .sup-note .fx-ico{color:#c9b8ee;background:rgba(255,255,255,.08)}
body #custodiaOverlay .cust-card > div{color:var(--rc-ink,#221a2e) !important}
body #custodiaOverlay .cust-card > div:last-child{color:var(--rc-soft,rgba(70,58,92,.74)) !important}
/* the keys: the first raised in the quiet amethyst, the others drawn in a fine line */
#supNotice .sup-note .btn,#custodiaOverlay .cust-card .btn{color:var(--rc-ink,#221a2e);background:transparent;border:1px solid var(--rc-line,rgba(91,70,144,.40));box-shadow:none;text-shadow:none}
#supNotice .sup-note .btn:hover,#custodiaOverlay .cust-card .btn:hover{background:rgba(var(--rc-fam,40,22,68),.06);border-color:var(--rc-acc,#5b4690)}
#supNotice .sup-note .btn.primary,#custodiaOverlay .cust-card .btn.primary,
body[data-theme="night"] #supNotice .sup-note .btn.primary,body[data-theme="night"] #custodiaOverlay .cust-card .btn.primary{
  color:var(--rc-on-acc,#fff);background:linear-gradient(180deg,var(--rc-acc-hi,#6a56a0),var(--rc-acc-lo,#4c3a7c));border:0;box-shadow:var(--rc-key,0 2px 0 #352858)}
#supNotice .sup-note .btn.primary:hover,#custodiaOverlay .cust-card .btn.primary:hover{background:linear-gradient(180deg,var(--rc-acc-hi,#6a56a0),var(--rc-acc-lo,#4c3a7c));transform:translateY(-1.5px);box-shadow:var(--rc-key-hi,0 3px 0 #352858)}
#supNotice .sup-note .btn:focus-visible,#custodiaOverlay .cust-card .btn:focus-visible{outline:2px solid var(--rc-acc,#5b4690);outline-offset:2px}
/* the word at the end of the two minutes came in Ingenium's own toast; in its card now, it keeps that toast's place and
   size (bottom 22px, its type and padding), so it covers no more of the page than before */
#sc-just[data-sc-look="1"]{box-shadow:var(--rc-slab,0 2px 0 rgba(0,0,0,.16),0 6px 20px rgba(0,0,0,.22)) !important}
#sc-just[data-sc-look="1"] button:hover{background:rgba(var(--rc-fam,40,22,68),.07)}
#sc-toast[data-sc-look="1"]{bottom:22px;max-width:min(560px,calc(100vw - 32px));padding:9px 14px;border-radius:11px;font:600 12.5px/1.45 var(--sans)}
</style>
<script>try{(window.__ingParts=window.__ingParts||{})["p74"]="started";}catch(_){}
/* R153 · the reminders in Ingenium's own amethyst card: see the note at the top of its styles */
(function(){"use strict";
if(window.__r153)return;window.__r153=1;
/* 6.8.2: the timed reminders take the raised card's faces (r184), never the bright amethyst: by day the paper face with the
   quiet amethyst, by night the deep, greyed amethyst with soft lavender */
var LOOK={face:"linear-gradient(180deg,#ffffff,#f7f5fa)",ink:"#221a2e",soft:"rgba(70,58,92,.74)",rim:"#5b4690",line:"rgba(91,70,144,.40)",
  key:"#5b4690",keyInk:"#ffffff",track:"rgba(91,70,144,.16)",
  night:{face:"linear-gradient(180deg,#342a4c,#2c2341)",ink:"#ece6f6",soft:"rgba(236,230,246,.72)",rim:"#a594d4",line:"rgba(190,170,230,.34)",
    key:"#6b5a96",keyInk:"#ffffff",track:"rgba(236,230,246,.16)"}};
/* the support module (R121) takes the card once it is there; a thought that comes back (R119) keeps the raised card it
   shares with Carpe Diem and the Forge (6.8) */
function give(n){var s=window.IngSupport&&window.IngSupport.sc;
  if(s&&typeof s.reminders==="function"&&!s.__r153){s.reminders(LOOK);s.__r153=1;}
  if(!(s&&s.__r153)&&n<150)setTimeout(function(){give(n+1);},200);}
give(0);
/* the end of the two minutes and Ingenium's own note share the foot of the page: the newer one is shown, as in 6.1,
   when both were the one note */
(function(){var o=window.ingToast;if(typeof o!=="function"||o.__r153)return;
  var w=function(){try{var s=document.getElementById("sc-toast");if(s)s.classList.remove("show");}catch(e){}return o.apply(this,arguments);};
  /* the marks earlier wrappers left on it (storage's __r142) stay, so none of them wraps it a second time */
  Object.keys(o).forEach(function(p){try{w[p]=o[p];}catch(e){}});
  w.__r153=1;window.ingToast=w;})();
function seat(){var s=document.getElementById("sc-toast");if(!s||s.__r153)return!!s;s.__r153=1;
  try{new MutationObserver(function(){if(s.classList.contains("show")){var n=document.getElementById("ingToast");if(n)n.style.display="none";}})
    .observe(s,{attributes:true,attributeFilter:["class"]});}catch(e){}return true;}
(function wait(n){if(!seat()&&n<300)setTimeout(function(){wait(n+1);},500);})(0);
window.IngReminders={look:LOOK};
})();
;try{window.__ingParts["p74"]="running";}catch(_){}
</script>
