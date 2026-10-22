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
   draw their part (SupportCore and ThoughtCloud, .reminders(look)); the notices and Custodia are dressed here. */
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
/* the support module (R121) and the thoughts panel (R119): each takes the card once it is there */
function give(n){var s=window.IngSupport&&window.IngSupport.sc,t=window.IngInbox&&window.IngInbox.tc,done=0;
  if(s&&typeof s.reminders==="function"&&!s.__r153){s.reminders(LOOK);s.__r153=1;}
  if(t&&typeof t.reminders==="function"&&!t.__r153){t.reminders(LOOK);t.__r153=1;}
  if(s&&s.__r153)done++;if(t&&t.__r153)done++;
  if(done<2&&n<150)setTimeout(function(){give(n+1);},200);}
give(0);
window.IngReminders={look:LOOK};
})();
;try{window.__ingParts["p74"]="running";}catch(_){}
</script>
