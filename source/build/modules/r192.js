<style id="r192-css">
/* ============ R192 · THE CHOSEN KEYS IN THE DISPLAY PANEL, RAISED LIKE THE OTHERS (Ingenium 6.9, 30 October 2026) ============
   The owner's words (30 October 2026): "The "On" button for the Sounds feature and the "Ingenium" button on the Chat panel look
   really flat compared to the rest of the buttons on the display panel, please make the fix so that they match the rest of
   the other pressed buttons inside of the Display panel."
   Why they were flat: the Display panel is one of the raised cards r184 dresses, and r184 gives anything in a card that says
   aria-pressed="true" a quiet, pressed-in ring. The panel's older keys (Day, Raised, Side bar, Calm, ...) mark their choice
   with the class "on" alone, so they kept the raised amethyst key of .seg-btn.on; the Sound keys (r176) and the Chat look
   keys say aria-pressed="true" as well, as a screen reader wants, and so took the ring. A segmented key that is chosen now
   looks the same whichever way it says so, in every raised card, by day and by night. */
#displayPanel .seg-btn[aria-pressed="true"],#ihPanel .seg-btn[aria-pressed="true"],#modalBox .seg-btn[aria-pressed="true"],
.isc-box .seg-btn[aria-pressed="true"],.pres-menu .seg-btn[aria-pressed="true"],#ing-export-choice .seg-btn[aria-pressed="true"],
#lxRx .rx-card .seg-btn[aria-pressed="true"],.tour-card .seg-btn[aria-pressed="true"]{
  color:#fff !important;border-color:#4b2a86 !important;
  background:linear-gradient(180deg,#7348be,#5d37a1) !important;
  box-shadow:inset 0 1px 0 rgba(255,255,255,.14),0 2px 0 #3a2070,0 4px 6px rgba(var(--fam-rgb),.22),0 8px 13px rgba(var(--fam-rgb),.14) !important}
body[data-theme="night"] #displayPanel .seg-btn[aria-pressed="true"],body[data-theme="night"] #ihPanel .seg-btn[aria-pressed="true"],
body[data-theme="night"] #modalBox .seg-btn[aria-pressed="true"],body[data-theme="night"] .isc-box .seg-btn[aria-pressed="true"],
body[data-theme="night"] .pres-menu .seg-btn[aria-pressed="true"],body[data-theme="night"] #ing-export-choice .seg-btn[aria-pressed="true"],
body[data-theme="night"] #lxRx .rx-card .seg-btn[aria-pressed="true"],body[data-theme="night"] .tour-card .seg-btn[aria-pressed="true"]{
  background:linear-gradient(180deg,#7a56c8,#5b3aa1) !important;border-color:#2c1956 !important;
  box-shadow:inset 0 1px 0 rgba(255,255,255,.12),0 2px 0 #170b30,0 4px 6px rgba(0,0,0,.5),0 8px 13px rgba(0,0,0,.34) !important}
/* under the pointer it lifts as the others do; pressed, it seats */
#displayPanel .seg-btn[aria-pressed="true"]:hover,#ihPanel .seg-btn[aria-pressed="true"]:hover,#modalBox .seg-btn[aria-pressed="true"]:hover,
.isc-box .seg-btn[aria-pressed="true"]:hover{color:#fff !important}
</style>
<script>try{(window.__ingParts=window.__ingParts||{})["p192"]="started";}catch(_){}
/* R192: the keys above are style alone; this part only says it ran, so the loading page can count it. */
;try{window.__ingParts["p192"]="running";}catch(_){}
</script>
