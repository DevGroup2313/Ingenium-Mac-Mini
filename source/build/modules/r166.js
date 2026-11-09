<style id="r166-css">
/* ============ R166 · KEYS AS THE APP MAKES THEM, AND FABRICA CALM (Ingenium 6.3, 23 October 2026) ============
   The owner's words: "I don't like how you made every button wide and flat, please fix them and match them to the rest of the
   app's look. It's an issue with every new page and section of the app". Each key that was stretched across its row, or lay
   flat, is now popped out like the rest of Ingenium's keys and as wide as its words: the tour's levels (on the Guide, in Help
   and in Settings), the Guide's chapters (the tour's own list of chapters stays flat, as the owner asked on 22 October), Lector's
   Start reading, and the Models page's Show them anyway. On the first start, the levels' words sit at the left, all three
   alike. The Guide's Take the tour key has room above the tour's card. Fabrica's calmer arrangement is shared with the Forge
   (thoughts/fabrica_rooms.html, written in just before this part). */
.ih-lv .ih-lvk{flex:0 1 auto}
.ih-lv .ih-lvk.wrap:not(#ih-z){max-width:340px}
.ih-pickg .ih-k:not(#ih-z){justify-content:flex-start;text-align:left}
/* 6.50 (7 November 2026). Her words: "The "New to this", "Some experience", and "Expert" cards are all different sizes and length
   and they look really weird on the "Help and the guided tour" section of the Settings page, please fix this." Measured on 6.49 at
   1440 by 900: Settings drew them as wide as their words (340, 260 and 340 pixels) and as tall as their lines (67, 51 and 67); the
   tour's first card drew them one width but three heights (69, 52 and 52). Now the three are one card size wherever they stand as
   cards: one width and one height (the tallest's), in a column, their words at the left. Her second word, the same day: "The cards
   are still too wide." So on Settings the width is 260 pixels, the width Some experience had: the narrowest at which none of the
   three needs a third line (at 250 New to this takes three and all three grow from 67 to 84 pixels tall). On a narrow screen the
   column narrows and the three stay alike. The tour's first card keeps its three as wide as the card, as a dialog's choices. */
#ihSetCard .ih-lv{display:grid;grid-template-columns:minmax(0,260px);grid-auto-rows:1fr;gap:8px}
#ihSetCard .ih-lv .ih-lvk.wrap:not(#ih-z){width:100%;max-width:none;height:auto;margin:0;align-self:stretch;justify-self:stretch;justify-content:flex-start;text-align:left}
#ingTour .ih-pickg{display:grid;grid-template-columns:minmax(0,1fr);grid-auto-rows:1fr;gap:9px}
#ingTour .ih-pickg .ih-k:not(#ih-z){width:100%;height:auto;margin:0;align-self:stretch;justify-self:stretch}
#guideTour .tour-entry-chaps{display:flex;flex-wrap:wrap;gap:10px}
#guideTour .tour-entry-chaps .tour-entry-chap.ih-k:not(#ih-z){flex:0 0 auto;width:auto;justify-content:flex-start;gap:9px;padding:8px 14px}
#guideTour .tour-entry-chap .tour-mi-n{font-size:11px;font-weight:700;color:var(--ih-ink3);min-width:14px}
#page-guide > #tourGo{margin:2px 0 16px}
#lx7 #l7BriefF{justify-content:center}
#lx7 #l7BriefF .l-btn.pri.wide{flex:0 1 auto;min-width:190px}
.cat-list > .cat-more{align-self:flex-start;width:auto}
</style>
<script>try{(window.__ingParts=window.__ingParts||{})["p87"]="started";}catch(_){}
/* R166 · its styles above; Fabrica's rooms come from the shared part before it */
(function(){try{if(!window.fbRooms)console.warn("R166: Fabrica's rooms (thoughts/fabrica_rooms.html) are missing");}catch(e){}})();
;try{window.__ingParts["p87"]="running";}catch(_){}
</script>
