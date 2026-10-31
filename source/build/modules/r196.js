<style id="r196-css">
/* ============ R196 · THE CARDS' KEYS IN THE APP'S OWN AMETHYST, AND "WHERE YOU WERE" REDRAWN (Ingenium 6.9.1, 31 October 2026) ============
   The owner's words (31 October 2026): "The close button from the About panel is a different shade of purple from the rest
   of the app, please fix it. Also, I don't love the look of the "Where you were" card, please fix it."
   r184 (6.8.1) gave every raised card's primary key a quieter, greyed amethyst, so About's Close stood apart from every
   other key on the page (Save, Go on, Word, Ask Lector are the app's own amethyst, lit with the gold ring). The keys in the
   raised cards (About, Help, Display, the tour, the dialogs) and in the support notes are the app's own primary key again,
   by day and by night, and the quiet keys beside them are the app's raised ghost keys, not a fine outline.
   "Where you were" (the card that meets her after time away): its lines wore type glyphs in a faint ring, one of them the
   dotted circle (◌) that read as an empty hole; its keys were flat outlines; the card was wide and bare. Now each line has a
   drawn mark on a lit amethyst disc (a step, a conversation, a timer, a parked thought), the title sits on a fine rule, the
   card is as wide as its words, and it arrives as the other raised cards do. */
body #modalBox .btn.primary,body #ihPanel .btn.primary,body #displayPanel .btn.primary,body .tour-card .btn.primary,body #ing-export-choice .btn.primary,
body .isc-box .btn.primary,body #lxRx .rx-card .btn.primary,body .pres-menu .btn.primary,body #supNotice .sup-note .btn.primary,body #custodiaOverlay .cust-card .btn.primary{
  color:#fff !important;border:1px solid #4b2a86 !important;text-shadow:0 1px 1px rgba(30,10,60,.35);
  background:linear-gradient(180deg,#7348be 0%,#5d37a1 100%) !important;
  box-shadow:inset 0 1px 0 rgba(255,255,255,.16),0 2px 0 #3a2070,0 4px 6px rgba(var(--fam-rgb),.24),0 9px 16px rgba(var(--fam-rgb),.16) !important;
  transition:transform .16s ease,box-shadow .16s ease,filter .16s ease}
body #modalBox .btn.primary:hover,body #ihPanel .btn.primary:hover,body #displayPanel .btn.primary:hover,body .tour-card .btn.primary:hover,body #ing-export-choice .btn.primary:hover,
body .isc-box .btn.primary:hover,body #lxRx .rx-card .btn.primary:hover,body .pres-menu .btn.primary:hover,body #supNotice .sup-note .btn.primary:hover,body #custodiaOverlay .cust-card .btn.primary:hover{
  transform:translateY(-2px);background:linear-gradient(180deg,#7348be 0%,#5d37a1 100%) !important;
  box-shadow:inset 0 1px 0 rgba(255,255,255,.18),0 3px 0 #3a2070,0 6px 9px rgba(var(--fam-rgb),.26),0 13px 22px rgba(var(--fam-rgb),.18) !important}
body #modalBox .btn.primary:active,body #ihPanel .btn.primary:active,body #displayPanel .btn.primary:active,body .tour-card .btn.primary:active,body #supNotice .sup-note .btn.primary:active,body #custodiaOverlay .cust-card .btn.primary:active{
  transform:translateY(1px);box-shadow:inset 0 2px 6px rgba(20,8,40,.45),0 1px 1px rgba(var(--fam-rgb),.2) !important}
body[data-theme="night"] #modalBox .btn.primary,body[data-theme="night"] #ihPanel .btn.primary,body[data-theme="night"] #displayPanel .btn.primary,body[data-theme="night"] .tour-card .btn.primary,
body[data-theme="night"] #ing-export-choice .btn.primary,body[data-theme="night"] .isc-box .btn.primary,body[data-theme="night"] #lxRx .rx-card .btn.primary,body[data-theme="night"] .pres-menu .btn.primary,
body[data-theme="night"] #supNotice .sup-note .btn.primary,body[data-theme="night"] #custodiaOverlay .cust-card .btn.primary{
  border-color:#2c1956 !important;background:linear-gradient(180deg,#7a56c8 0%,#5b3aa1 100%) !important;
  box-shadow:inset 0 1px 0 rgba(255,255,255,.14),0 2px 0 #170b30,0 4px 6px rgba(0,0,0,.50),0 9px 16px rgba(0,0,0,.36) !important}
body[data-theme="night"] #modalBox .btn.primary:hover,body[data-theme="night"] #ihPanel .btn.primary:hover,body[data-theme="night"] #displayPanel .btn.primary:hover,body[data-theme="night"] .tour-card .btn.primary:hover,
body[data-theme="night"] #supNotice .sup-note .btn.primary:hover,body[data-theme="night"] #custodiaOverlay .cust-card .btn.primary:hover{
  background:linear-gradient(180deg,#7a56c8 0%,#5b3aa1 100%) !important;box-shadow:inset 0 1px 0 rgba(255,255,255,.16),0 3px 0 #170b30,0 6px 9px rgba(0,0,0,.52),0 13px 22px rgba(0,0,0,.40) !important}
/* the quiet keys of the support notes: the app's raised ghost key, as in the rest of the page */
body #supNotice .sup-note .btn:not(.primary),body #custodiaOverlay .cust-card .btn:not(.primary){
  color:var(--ink-1);background:linear-gradient(180deg,var(--card-hi),var(--card-lo));border:1px solid var(--hairline);box-shadow:var(--pop);text-shadow:none}
body #supNotice .sup-note .btn:not(.primary):hover,body #custodiaOverlay .cust-card .btn:not(.primary):hover{background:linear-gradient(180deg,var(--card-hi),var(--card-lo));box-shadow:var(--pop-hi);transform:translateY(-3px);border-color:var(--hairline)}
body[data-theme="night"] #supNotice .sup-note .btn:not(.primary),body[data-theme="night"] #custodiaOverlay .cust-card .btn:not(.primary){color:#ece6f6}
/* "Where you were": the card, as wide as its words, its title on a fine rule, each line with a drawn mark */
body #supNotice{width:min(440px,calc(100vw - 96px))}
body #supNotice .sup-note.big{padding:14px 16px 13px;border-radius:14px;width:max-content;max-width:100%;box-sizing:border-box;animation:rcIn .46s cubic-bezier(.22,.8,.3,1) both}
body[data-motion="minimal"] #supNotice .sup-note.big{animation:none}
@media (prefers-reduced-motion:reduce){body #supNotice .sup-note.big{animation:none}}
body #supNotice .sup-note.big .sup-note-title{font:600 15.5px/1.3 var(--serif);letter-spacing:.04em;margin:0 0 8px;padding-bottom:7px;border-bottom:.5px solid var(--hairline);color:var(--ink-1)}
body[data-theme="night"] #supNotice .sup-note.big .sup-note-title{color:#ece6f6;border-bottom-color:rgba(205,184,240,.18)}
body #supNotice .sup-note.big .sup-line{display:flex;gap:10px;align-items:center;margin:7px 0;font-size:13.5px;line-height:1.45}
body #supNotice .sup-note.big .fx-ico{width:26px;height:26px;flex:none;border-radius:50%;display:inline-flex;align-items:center;justify-content:center;
  color:#fff !important;background:linear-gradient(180deg,var(--fill-hi),var(--fill-lo)) !important;box-shadow:inset 0 1px 0 rgba(255,255,255,.3),0 1px 0 rgba(40,20,70,.3),0 2px 5px rgba(40,20,70,.18);font-size:12px}
body #supNotice .sup-note.big .fx-ico svg{width:14px;height:14px;display:block;stroke:#fff;fill:none;stroke-width:1.9;stroke-linecap:round;stroke-linejoin:round}
body #supNotice .sup-note.big .sup-note-acts{display:flex;gap:8px;flex-wrap:wrap;margin-top:12px;justify-content:flex-end}
body #supNotice .sup-note.big .sup-note-acts .btn.small{padding:7px 13px;font-size:12.5px}
</style>
<script>try{(window.__ingParts=window.__ingParts||{})["p196"]="started";}catch(_){}
/* R196: the marks on "Where you were": see the note at the top of its styles */
(function(){"use strict";
if(window.__r196)return;window.__r196=1;
var S='<svg viewBox="0 0 24 24" aria-hidden="true">';
/* a step, a conversation, a timer, a parked thought: drawn marks in place of the type glyphs */
var MARK={"→":S+'<path d="M5 12h13M13 6l6 6-6 6"/></svg>',
  "✎":S+'<path d="M4 20h16"/><path d="M14.5 4.5l5 5L9 20H4v-5z"/></svg>',
  "◷":S+'<circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/></svg>',
  "◌":S+'<path d="M7 16.5a3.5 3.5 0 0 1-.6-6.9A5 5 0 0 1 16 8a4 4 0 0 1 1.5 7.7"/><circle cx="7" cy="19.5" r="1"/><circle cx="4.5" cy="21.5" r=".6"/></svg>'};
function dress(node){if(!node||node.__r196)return;node.__r196=1;
  [].forEach.call(node.querySelectorAll(".fx-ico"),function(ic){var g=(ic.textContent||"").trim();if(MARK[g]){ic.setAttribute("data-mark",g);ic.innerHTML=MARK[g];}});}
if(typeof window.supNotice==="function"&&!window.supNotice.__r196){var o=window.supNotice;
  window.supNotice=supNotice=function(){var r=o.apply(this,arguments);try{if(r&&r.node)dress(r.node);}catch(e){}return r;};window.supNotice.__r196=1;}
window.IngNoteMarks={dress:dress,marks:MARK};
})();
;try{window.__ingParts["p196"]="running";}catch(_){}
</script>
