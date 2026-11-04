<style id="r224-css">
/* ============ R224 · NO SCROLL BAR IN SIGHT (Ingenium 6.16, 4 November 2026) ============
   Her words (4 November 2026): "Please add this rule to Ingenium, all scroll bars unless explicitly stated are to be hidden from view
   while keeping the scrolling functionality intact. I don't like seeing them in view, they detract from the look of the app."
   Earlier she asked it part by part (the Career Studio's Learn panel in 6.10.4, the Code page's Plan and session column in 6.15); now
   it is one rule for the whole of Ingenium's own page: every part scrolls as before, by wheel, trackpad, touch, the keys (the arrows,
   Page Up and Page Down, Home, End, the space bar) and by dragging a selection, with no bar to see. The rule is the page's last word
   (!important), so a part that drew its own bar earlier (a thin one, a coloured thumb) follows it too.
   The exception, for a bar she asks to see: an element marked data-scrollbar="shown" (IngScrollbars.show(el)) keeps a slim bar in the
   app's colours. Pages that Ingenium shows inside a frame keep their own look, as they are pages of their own: the app being built, in
   the Code preview, and the apps on the Desk (Tabula, Abacus, Imago, Scriba, Fontes). */
html,*{scrollbar-width:none !important;-ms-overflow-style:none !important}
*::-webkit-scrollbar{display:none !important;width:0 !important;height:0 !important;background:transparent !important}
[data-scrollbar="shown"]{scrollbar-width:thin !important;scrollbar-color:rgba(106,63,181,.40) transparent !important;-ms-overflow-style:auto !important}
[data-scrollbar="shown"]::-webkit-scrollbar{display:block !important;width:8px !important;height:8px !important}
[data-scrollbar="shown"]::-webkit-scrollbar-thumb{background:rgba(106,63,181,.40) !important;border-radius:8px !important}
</style>
<script>try{(window.__ingParts=window.__ingParts||{})["p224"]="started";}catch(_){}
/* R224 · no scroll bar in sight: see the note at the top of its styles. window.IngScrollbars: show(el), hide(el), rule */
(function r224(){"use strict";
if(window.IngScrollbars)return;
window.IngScrollbars={rule:"hidden, unless marked data-scrollbar=\"shown\"",
  show:function(el){if(el&&el.setAttribute)el.setAttribute("data-scrollbar","shown");return el;},
  hide:function(el){if(el&&el.removeAttribute)el.removeAttribute("data-scrollbar");return el;}};
})();
;try{window.__ingParts["p224"]="running";}catch(_){}
</script>
