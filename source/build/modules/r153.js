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
/* a thought that comes back, by night: the shared raised card, its face Ingenium's amethyst */
.tc-el.tc-nudge[data-tc-app="ingenium"][data-tc-night="1"]{--tc-face-a:#4e2c8a;--tc-face-b:#43277a;--tc-wall:#24123f;--tc-lip:rgba(255,255,255,.16);
  --tc-rim:rgba(202,162,74,.75);--tc-ink:#f3eefb;--tc-soft:rgba(243,238,251,.82);--tc-acc:#f3eefb;--tc-acc-hi:#ffffff;--tc-acc-lo:#e3d8f6;
  --tc-acc-edge:#8f78c4;--tc-on-acc:#3a2168}
/* and by day its close mark in Ingenium's second ink (the shared faint grey read at 2.65 to 1 on the paper) */
.tc-el.tc-nudge[data-tc-app="ingenium"]:not([data-tc-night="1"]) .tc-nudge-x{color:#6c6579}
#supNotice .sup-note,body:not([data-depth="flat"]) #supNotice .sup-note{background:linear-gradient(180deg,#4e2c8a,#43277a);color:#f3eefb;
  border-color:#caa24a;box-shadow:0 2px 0 rgba(20,8,40,.30),0 10px 26px rgba(20,8,40,.30)}
#supNotice .sup-note .sup-note-title,#supNotice .sup-note .sup-note-body{color:#f3eefb}
#supNotice .sup-note .fx-ico{color:#f3eefb;background:rgba(243,238,251,.14)}
#custodiaOverlay .cust-card,body[data-theme="night"] #custodiaOverlay .cust-card{background:linear-gradient(180deg,#4e2c8a,#43277a);color:#f3eefb;
  border:1px solid #caa24a;box-shadow:0 2px 0 rgba(20,8,40,.30),0 20px 60px rgba(0,0,0,.34)}
#custodiaOverlay .cust-card > div{color:#f3eefb !important}
#custodiaOverlay .cust-card > div:last-child{color:rgba(243,238,251,.82) !important}
/* the keys on the card: the first in lilac-white with amethyst ink, the others drawn in a fine line */
#supNotice .sup-note .btn,#custodiaOverlay .cust-card .btn{color:#f3eefb;background:transparent;border:1px solid rgba(243,238,251,.48);box-shadow:none;text-shadow:none}
#supNotice .sup-note .btn:hover,#custodiaOverlay .cust-card .btn:hover{background:rgba(255,255,255,.10);border-color:#f3eefb}
#supNotice .sup-note .btn.primary,#custodiaOverlay .cust-card .btn.primary,
body[data-theme="night"] #supNotice .sup-note .btn.primary,body[data-theme="night"] #custodiaOverlay .cust-card .btn.primary{
  color:#43277a;background:#f3eefb;border-color:#f3eefb;box-shadow:0 2px 0 rgba(20,8,40,.35)}
#supNotice .sup-note .btn.primary:hover,#custodiaOverlay .cust-card .btn.primary:hover{background:#fbf8ff}
#supNotice .sup-note .btn:focus-visible,#custodiaOverlay .cust-card .btn:focus-visible{outline:3px solid #f3eefb;outline-offset:2px}
/* the word at the end of the two minutes came in Ingenium's own toast; in its card now, it keeps that toast's place and
   size (bottom 22px, its type and padding), so it covers no more of the page than before */
#sc-toast[data-sc-look="1"]{bottom:22px;max-width:min(560px,calc(100vw - 32px));padding:9px 14px;border-radius:11px;font:600 12.5px/1.45 var(--sans)}
</style>
<script>try{(window.__ingParts=window.__ingParts||{})["p74"]="started";}catch(_){}
/* R153 · the reminders in Ingenium's own amethyst card: see the note at the top of its styles */
(function(){"use strict";
if(window.__r153)return;window.__r153=1;
/* Ingenium's jewel, the same by day and by night */
var LOOK={face:"linear-gradient(180deg,#4e2c8a,#43277a)",ink:"#f3eefb",soft:"rgba(243,238,251,.82)",rim:"#caa24a",line:"rgba(243,238,251,.48)",
  key:"#f3eefb",keyInk:"#43277a",track:"rgba(243,238,251,.22)"};
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
