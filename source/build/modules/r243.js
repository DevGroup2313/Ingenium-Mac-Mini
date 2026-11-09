<style id="r243-css">
/* ============ R243 · THE GUIDE'S START HERE, IN TWO CALM PARTS (Ingenium 6.45, 6 November 2026) ============
   Her words (6 November 2026): "The guided tour page looks so off as a page especially with all of these buttons just clustered
   together all in one area, it really bugs me and triggers my sensory issues, please redesign the Guide page to fix this. This
   request is only for the Start here tab page inside of the Guide page." The tour's card held its sentence, its key, three level
   keys and sixteen chapter keys of every width in one run (modules/r166.js had them wrap as they came). Now it has two parts side
   by side, each named: Take the tour (the sentence, the key, and the three levels stacked, each with its line) and The chapters
   (how many are seen, on a slim bar, and the sixteen as a book's contents: flat rows in two columns read downwards, a number, the
   name, a hairline between rows, a soft lilac tint under the pointer and a tick at the same edge for each one seen; her second
   word on it: "I don't like the look of the Chapters area, it still has that many clustered 3D buttons look that I said that I
   didn't like", so no raised faces, no lift and no shadow there). Below about 1,050 pixels the two parts stand one above the
   other, and on a phone the contents are one column. 6.49: the rows at the app's one scale (13.5 px letters, 38 px tall at most;
   rig/t_638_scale.js), where 6.45 had them at 14 px and 40 px. 6.50: the three level cards one height too (the tallest's), as on Settings
   and the tour's first card (modules/r166.js), where a one-line card stood shorter than the two-line ones; and 270 pixels wide at most,
   the narrowest at which none needs a third line (her word: "The cards are still too wide"). Nothing the card does has changed: the same keys, in the same order for the
   keyboard and for a screen reader. */
#page-guide #guideTour.gt2{display:grid;grid-template-columns:minmax(280px,360px) minmax(0,1fr);gap:20px 28px;align-items:start;margin-top:4px}
@media (max-width:1050px){#page-guide #guideTour.gt2{grid-template-columns:minmax(0,1fr)}}
#page-guide #guideTour.gt2 .gt2-start,#page-guide #guideTour.gt2 .gt2-chaps{display:flex;flex-direction:column;gap:12px;padding:18px 18px 20px;border-radius:16px;min-width:0}
#page-guide #guideTour.gt2 .gt2-start{background:linear-gradient(180deg,var(--accent-softer,rgba(106,63,181,.06)),rgba(106,63,181,0) 92%);border:1px solid rgba(106,63,181,.16)}
#page-guide #guideTour.gt2 .gt2-chaps{background:var(--card-hi,#fff);border:1px solid var(--hairline-soft,rgba(40,20,70,.08));box-shadow:0 1px 0 rgba(40,22,68,.05),0 4px 14px rgba(40,22,68,.05)}
body[data-theme="night"] #page-guide #guideTour.gt2 .gt2-start{border-color:rgba(183,156,230,.22)}
body[data-theme="night"] #page-guide #guideTour.gt2 .gt2-chaps{box-shadow:0 1px 0 rgba(0,0,0,.35),0 4px 14px rgba(0,0,0,.25)}
#page-guide #guideTour.gt2 .gt2-h{margin:0;font:600 16.5px/1.25 var(--serif);color:var(--ink-1)}
#page-guide #guideTour.gt2 .gt2-sub{margin:-4px 0 0;font-size:13px;line-height:1.45;color:var(--ink-3)}
#page-guide #guideTour.gt2 .gt2-start > p:not(.gt2-sub){margin:0;font-size:14px;line-height:1.55;color:var(--ink-2)}
#page-guide #guideTour.gt2 .tour-entry-row{margin:2px 0 0}
#page-guide #guideTour.gt2 .ih-entrylv{display:flex;flex-direction:column;gap:10px;margin:4px 0 0;padding-top:14px;border-top:1px solid var(--hairline-soft,rgba(40,20,70,.08))}
#page-guide #guideTour.gt2 .ih-entrylv .ih-lv{display:grid;grid-template-columns:minmax(0,270px);grid-auto-rows:1fr;gap:8px;margin:0}
#page-guide #guideTour.gt2 .ih-entrylv .ih-lv .ih-lvk:not(#ih-z){flex:0 0 auto;width:100%;max-width:none;height:auto;margin:0;align-self:stretch;justify-content:flex-start;align-items:center;text-align:left;gap:12px;padding:10px 12px}
#page-guide #guideTour.gt2 .ih-entrylv .ih-lvi{flex:0 0 26px;text-align:center;font-size:19px}
#page-guide #guideTour.gt2 .gt2-chh{display:flex;align-items:baseline;justify-content:space-between;gap:12px;flex-wrap:wrap}
#page-guide #guideTour.gt2 .gt2-count{font:600 12.5px/1.3 var(--sans);color:var(--accent,#6a3fb5)}
#page-guide #guideTour.gt2 .gt2-bar{height:6px;border-radius:999px;background:var(--accent-soft,rgba(106,63,181,.14));overflow:hidden;margin-top:-2px}
#page-guide #guideTour.gt2 .gt2-bar i{display:block;height:100%;border-radius:inherit;background:linear-gradient(90deg,#9b74df,var(--accent,#6a3fb5))}
#page-guide #guideTour.gt2 .tour-entry-chaps{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));grid-template-rows:repeat(var(--gt2-rows,8),auto);grid-auto-flow:column;column-gap:30px;row-gap:0;margin:2px 0 0}
@media (max-width:640px){#page-guide #guideTour.gt2 .tour-entry-chaps{grid-template-columns:minmax(0,1fr);grid-template-rows:none;grid-auto-flow:row}}
#page-guide #guideTour.gt2 .tour-entry-chaps .tour-entry-chap,#page-guide #guideTour.gt2 .tour-entry-chaps .tour-entry-chap.ih-k:not(#ih-z){display:flex;align-items:center;justify-content:flex-start;gap:12px;
  width:100%;min-height:38px;margin:0;padding:8px 10px;border:0;border-bottom:1px solid var(--hairline-soft,rgba(40,20,70,.09));border-radius:0;background:transparent;box-shadow:none;transform:none;
  text-align:left;font:500 13.5px/1.35 var(--sans);color:var(--ink-1);text-shadow:none;transition:background-color .15s ease,color .15s ease}
#page-guide #guideTour.gt2 .tour-entry-chaps .tour-entry-chap.ih-k:not(#ih-z):hover:not(:disabled),#page-guide #guideTour.gt2 .tour-entry-chaps .tour-entry-chap:hover{transform:none;box-shadow:none;background:var(--accent-softer,rgba(106,63,181,.06));color:var(--accent,#6a3fb5)}
#page-guide #guideTour.gt2 .tour-entry-chaps .tour-entry-chap.ih-k:not(#ih-z):active:not(:disabled),#page-guide #guideTour.gt2 .tour-entry-chaps .tour-entry-chap.ih-k.is-down:not(#ih-z){transform:none;box-shadow:none;background:var(--accent-soft,rgba(106,63,181,.14))}
#page-guide #guideTour.gt2 .tour-entry-chaps .tour-entry-chap.ih-k:not(#ih-z):focus-visible{outline:2px solid var(--accent,#6a3fb5);outline-offset:-2px}
#page-guide #guideTour.gt2 .tour-entry-chap .tour-mi-n{flex:0 0 22px;min-width:22px;text-align:right;font:600 12.5px/1 var(--sans);font-variant-numeric:tabular-nums;color:var(--accent,#6a3fb5);background:none;border-radius:0}
#page-guide #guideTour.gt2 .tour-entry-chap .tour-mi-ok{margin-left:auto;padding-left:6px;color:var(--accent,#6a3fb5);font-weight:700;font-size:13px}
</style>
<script>try{(window.__ingParts=window.__ingParts||{})["p243"]="started";}catch(_){}
/* R243 · the Guide's Start here: the tour's card in two named parts (the styles above say why) */
(function r243(){
"use strict";
if(window.__r243)return;window.__r243=1;
var W=window,D=document;
function mk(t,c,x){var e=D.createElement(t);if(c)e.className=c;if(x!=null)e.textContent=x;return e;}
/* after the card is drawn (the base page draws it again whenever the tour moves on, and the help adds the levels) */
function dress(){var g=D.getElementById("guideTour");if(!g||g.querySelector(":scope > .gt2-start"))return;
  var p=g.querySelector(":scope > p"),row=g.querySelector(":scope > .tour-entry-row"),lv=g.querySelector(":scope > .ih-entrylv"),ch=g.querySelector(":scope > .tour-entry-chaps");
  if(!row||!ch)return;
  var L=mk("div","gt2-start"),R=mk("div","gt2-chaps");
  L.appendChild(mk("h3","gt2-h","Take the tour"));if(p)L.appendChild(p);L.appendChild(row);
  if(lv){var lp=lv.querySelector(":scope > p");lv.insertBefore(mk("h3","gt2-h","Your level"),lv.firstChild);if(lp)lp.classList.add("gt2-sub");L.appendChild(lv);}
  var n=ch.querySelectorAll(".tour-entry-chap").length,seen=ch.querySelectorAll(".tour-mi-ok").length;
  var hd=mk("div","gt2-chh");hd.appendChild(mk("h3","gt2-h","The chapters"));hd.appendChild(mk("span","gt2-count",seen?seen+" of "+n+" seen":n+" chapters"));R.appendChild(hd);
  var bar=mk("div","gt2-bar"),fill=mk("i");bar.setAttribute("role","progressbar");bar.setAttribute("aria-label","Chapters seen");bar.setAttribute("aria-valuemin","0");
  bar.setAttribute("aria-valuemax",String(n));bar.setAttribute("aria-valuenow",String(seen));fill.style.width=(n?Math.round(seen/n*100):0)+"%";bar.appendChild(fill);R.appendChild(bar);
  ch.style.setProperty("--gt2-rows",String(Math.max(1,Math.ceil(n/2))));R.appendChild(ch);g.appendChild(L);g.appendChild(R);g.classList.add("gt2");}
(function wrap(){var o=W.tourPaintEntry;if(typeof o!=="function"||o.__r243)return;
  var n=function(){var r=o.apply(this,arguments);try{dress();}catch(e){}return r;};
  try{Object.keys(o).forEach(function(k){if(n[k]===undefined)n[k]=o[k];});}catch(e){}n.__r243=1;W.tourPaintEntry=n;try{tourPaintEntry=n;}catch(e){}})();
try{dress();}catch(e){}
(function later(){var k=0;(function wait(){try{dress();}catch(e){}if(W.__ingReady===true||++k>120)return;setTimeout(wait,500);})();})();
W.IngGuideStart={dress:dress};
})();
;try{window.__ingParts["p243"]="running";}catch(_){}
</script>
