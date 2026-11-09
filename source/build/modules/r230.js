<style id="r230-css">
/* ============ R230 · THE GUIDE, IN ROOMS, AND WHAT'S NEW IN A KEY (Ingenium 6.26, 5 November 2026) ============
   Her words (5 November 2026): "Please make the "What is new card on the Guide collapsible from view and folded inside of a cute popped
   out animated 3D button rather than this long list that is taking up half the page and overwhelming me. In fact, the entire Guide page
   looks like a very long document that does not match the rest of Ingenium and its graphics and designs. I want it rededesigned and
   reorganised to better fit the app. I want to see sections and animated 3D styling, I want it to match the app that it is describing
   and not be plain and boring. It does not even look organised, it looks offputing and overwhelming at the moment."
   Measured on 6.25 at 1440 x 900: the Guide was 6,408 pixels tall, eighteen cards in one column, What is new (two dozen lines) the
   second card from the top.
   Now:
   - Rooms, as Settings and Models have them (modules/r173.js, CONF.guide): Start here, Chat and Code, Models and devices, Making and
     study, and Around the app, each with its line saying what it holds; Find in the guide; and Show the whole guide at once, for those
     who prefer one long page.
   - In each room the topics are raised tiles in a grid. A tile shows its mark, its title and its first sentence; pressed, it opens in
     place across the room, its contents rising in, and the topic open before it closes, so one topic is open at a time. The tour's own
     card stays open, across the room, as the first thing in Start here.
   - What's new is folded into a key beside the page's title, in the family of the page's other raised keys (her words, the same day:
     "The "What's new" button is way too bulky and looks too bright and odd against the rest of the app on both light and dark
     mode"): the card's own face, rim and shadow, lifting under the pointer, with a small gold spark that turns now and then, the
     newest version in a quiet chip, and a small gold dot while that version has not been opened here. Pressed, a card springs out of
     it with the versions grouped, the newest open and each earlier one a line that opens when pressed. Escape, its close key or a press
     outside folds it away and gives the focus back to the key. On a phone the card rises from the foot of the screen.
   - Anything that points at a part inside a folded topic (the tour's ring, Help's Show me, Find in the guide, the focus moving into it)
     opens that topic, and r173 opens its room.
   - Still with motion set to minimal, and under prefers-reduced-motion. Every id and handler of the cards stays: a card is never copied,
     only given a head key and folded. */
#page-guide{position:relative}
#page-guide .gd-newwrap{position:absolute;top:2px;right:0;z-index:300}
/* 6.38 (one scale): as tall and as round as the rooms' keys beside it, which now take the app's key size (35px, 11px corners) */
.gd-newkey{position:relative;display:inline-flex;align-items:center;gap:8px;min-height:35px;margin:0;padding:6px 12px 6px 10px;border-radius:11px;
  border:1px solid var(--hairline);background:linear-gradient(180deg,var(--card-hi,#fff),var(--card-lo,#f6f2fb));box-shadow:var(--pop);color:var(--ink-1);
  font:600 13px/1.2 var(--sans);cursor:pointer;-webkit-tap-highlight-color:transparent;touch-action:manipulation;
  transition:transform .16s var(--spring,cubic-bezier(.2,.8,.2,1)),box-shadow .16s ease}
.gd-newkey:hover{transform:translateY(-2px);box-shadow:var(--pop-hi,var(--pop))}
.gd-newkey:active{transform:translateY(1px);transition-duration:.06s}
.gd-newkey[aria-expanded="true"]{transform:translateY(1px);box-shadow:inset 0 1px 3px rgba(40,22,68,.16)}
body[data-theme="night"] .gd-newkey[aria-expanded="true"]{box-shadow:inset 0 1px 3px rgba(0,0,0,.5)}
.gd-newkey:focus-visible{outline:2.5px solid var(--accent,#6a3fb5);outline-offset:3px}
.gd-newkey .gd-spark{position:relative;display:grid;place-items:center;width:18px;height:18px;color:var(--gold-ink,#a77a1f)}
body[data-theme="night"] .gd-newkey .gd-spark{color:#e2bf63}
.gd-newkey .gd-spark svg{width:17px;height:17px;transform-origin:50% 50%;animation:gdTwinkle 4.8s ease-in-out infinite}
.gd-newkey .gd-ver{padding:3px 7px;border-radius:7px;background:var(--accent-soft,rgba(106,63,181,.14));color:var(--accent,#6a3fb5);font:700 11px/1 var(--mono,ui-monospace,monospace)}
body[data-theme="night"] .gd-newkey .gd-ver{color:#d4c2f4}
.gd-newkey .gd-dot{position:absolute;top:4px;left:22px;width:7px;height:7px;border-radius:50%;background:#e2b54e;box-shadow:0 0 0 2px var(--card-hi,#fff);animation:gdPulse 2.8s ease-in-out infinite}
body[data-theme="night"] .gd-newkey .gd-dot{box-shadow:0 0 0 2px #2a2238}
.gd-newkey .gd-dot[hidden]{display:none}
@keyframes gdTwinkle{0%,100%{transform:rotate(0) scale(1)}42%{transform:rotate(16deg) scale(1.12)}58%{transform:rotate(0) scale(1)}}
@keyframes gdPulse{0%,100%{transform:scale(1);opacity:1}50%{transform:scale(1.3);opacity:.7}}
/* the card that springs out of the key */
.gd-pop{position:absolute;top:calc(100% + 12px);right:0;width:min(560px,calc(100vw - 32px));max-height:min(72vh,680px);display:flex;flex-direction:column;
  border-radius:18px;border:1px solid var(--hairline);background:linear-gradient(180deg,var(--card-hi,#fff),var(--card-lo,#f7f3fc));color:var(--ink-1);
  box-shadow:inset 0 1px 0 rgba(255,255,255,.65),5px 7px 0 -2px rgba(70,36,128,.10),0 24px 52px rgba(40,20,80,.30);transform-origin:top right;z-index:300;text-align:left}
.gd-pop:not([hidden]){animation:gdPop .36s cubic-bezier(.2,1.3,.4,1) both}
.gd-pop[hidden]{display:none}
body[data-theme="night"] .gd-pop{background:linear-gradient(180deg,#2a2238,#211a2d);box-shadow:inset 0 1px 0 rgba(255,255,255,.07),5px 7px 0 -2px rgba(0,0,0,.35),0 24px 52px rgba(0,0,0,.55)}
@keyframes gdPop{from{opacity:0;transform:translateY(-10px) scale(.88)}to{opacity:1;transform:none}}
.gd-pop-h{display:flex;align-items:center;gap:11px;padding:15px 14px 6px 16px}
.gd-pop-h .gd-spark{display:grid;place-items:center;width:30px;height:30px;border-radius:50%;color:#5d3a00;background:radial-gradient(circle at 35% 30%,#fff8dc 0%,#ecc96d 52%,#b8892c 100%);box-shadow:inset 0 1px 0 rgba(255,255,255,.75),0 1px 2px rgba(40,16,0,.35)}
.gd-pop-h .gd-spark svg{width:17px;height:17px}
.gd-pop-h h2{flex:1;margin:0;font:600 18px/1.2 var(--serif,Georgia,serif);color:var(--ink-1)}
.gd-pop-x{display:grid;place-items:center;width:34px;height:34px;margin:0;border-radius:50%;border:1px solid var(--hairline);background:linear-gradient(180deg,var(--card-hi,#fff),var(--card,#faf8fd));
  color:var(--ink-2);cursor:pointer;box-shadow:var(--pop);transition:transform .15s}
.gd-pop-x:hover{transform:translateY(-2px)}.gd-pop-x:active{transform:translateY(1px)}
.gd-pop-x svg{width:15px;height:15px}
.gd-pop-sub{margin:0 16px 10px;font-size:12.5px;line-height:1.45;color:var(--ink-3)}
.gd-pop-list{overflow:auto;padding:2px 12px 14px;display:flex;flex-direction:column;gap:7px;overscroll-behavior:contain}
.gd-v{border-radius:13px;border:1px solid var(--hairline);background:var(--card-hi,#fff);box-shadow:var(--pop)}
body[data-theme="night"] .gd-v{background:#2c2439}
.gd-vh{display:flex;align-items:center;gap:10px;width:100%;margin:0;padding:9px 12px;border:0;background:transparent;cursor:pointer;color:var(--ink-1);font:600 13px/1.3 var(--sans);text-align:left;border-radius:13px}
.gd-vh:focus-visible{outline:2.5px solid var(--accent,#6a3fb5);outline-offset:1px}
.gd-vh b{display:inline-grid;place-items:center;min-width:46px;padding:4px 8px;border-radius:8px;background:var(--accent-soft,rgba(106,63,181,.14));color:var(--accent,#6a3fb5);font:700 12px/1 var(--mono,ui-monospace,monospace)}
body[data-theme="night"] .gd-vh b{color:#d4c2f4}
.gd-vh .n{flex:1;min-width:0;color:var(--ink-2);font-weight:500}
.gd-vh i{display:grid;place-items:center;color:var(--ink-3);transition:transform .22s}
.gd-vh i svg{width:15px;height:15px}
.gd-v.open .gd-vh i{transform:rotate(180deg)}
.gd-v ul{display:none;margin:0;padding:0 14px 11px 16px;list-style:none}
.gd-v.open ul{display:block}
.gd-v.open li{animation:gdIn .28s cubic-bezier(.2,.8,.2,1) both}
.gd-v li{position:relative;padding:4px 0 4px 15px;font-size:13px;line-height:1.52;color:var(--ink-2)}
.gd-v li::before{content:"";position:absolute;left:1px;top:11px;width:6px;height:6px;border-radius:50%;background:var(--accent,#6a3fb5);box-shadow:0 0 0 2px var(--accent-soft,rgba(106,63,181,.14))}
.gd-run{margin:0;padding:10px 16px 13px;border-top:1px solid var(--hairline);font-size:12px;line-height:1.45;color:var(--ink-3)}
.gd-run b{color:var(--ink-2);font-weight:600}
.gd-earlier{margin:6px 2px 0;font:600 11px/1.3 var(--sans);letter-spacing:.07em;text-transform:uppercase;color:var(--ink-3)}
/* the rooms' tiles */
#page-guide.rm-on .rm-panel{display:grid;grid-template-columns:repeat(auto-fill,minmax(min(330px,100%),1fr));gap:14px;align-items:start}
#page-guide.rm-on .rm-panel[hidden]{display:none}
#page-guide.rm-on .rm-panel > .rm-roomh{grid-column:1/-1}
#page-guide.rm-on .rm-panel > .card{margin:0}
#page-guide .gd-feature{grid-column:1/-1}
/* (backwards, not both: an animation that held its last frame would outweigh the lift under the pointer) */
#page-guide .gd-tile{padding:0;overflow:hidden;transition:transform .2s cubic-bezier(.2,.8,.2,1),box-shadow .2s;animation:gdRise .44s cubic-bezier(.2,.8,.2,1) backwards;animation-delay:calc(var(--gd-i,0) * 55ms)}
#page-guide.rm-on .rm-panel > .gd-feature{animation:gdRise .44s cubic-bezier(.2,.8,.2,1) backwards}
#page-guide .gd-tile.gd-open{grid-column:1/-1}
#page-guide .gd-tile > .gd-orig{display:none}
#page-guide .gd-tile:not(.gd-open) > :not(.gd-head){display:none !important}
#page-guide .gd-tile > :not(.gd-head){margin-left:18px;margin-right:18px}
#page-guide .gd-tile > :not(.gd-head):last-child{margin-bottom:18px}
#page-guide .gd-tile.gd-open > :not(.gd-head){animation:gdIn .34s cubic-bezier(.2,.8,.2,1) backwards}
#page-guide .gd-tile:not(.gd-open):hover{transform:translateY(-3px);box-shadow:var(--raise),0 14px 26px rgba(52,24,100,.12)}
#page-guide .gd-tile:not(.gd-open):active{transform:translateY(1px)}
body[data-theme="night"] #page-guide .gd-tile:not(.gd-open):hover{box-shadow:var(--raise),0 14px 26px rgba(0,0,0,.4)}
#page-guide .gd-head{display:grid;grid-template-columns:auto minmax(0,1fr) auto;column-gap:14px;row-gap:3px;align-items:center;width:100%;margin:0;padding:16px 16px 16px 18px;
  border:0;border-radius:0;background:transparent;color:inherit;font:inherit;text-align:left;cursor:pointer;-webkit-tap-highlight-color:transparent;touch-action:manipulation}
#page-guide .gd-head:focus-visible{outline:2.5px solid var(--accent,#6a3fb5);outline-offset:-4px;border-radius:14px}
#page-guide .gd-mark{grid-row:1/3;display:grid;place-items:center;width:44px;height:44px;border-radius:14px;color:#fff;
  background:linear-gradient(160deg,#8f6ad9,#5b369e);box-shadow:inset 0 1px 0 rgba(255,255,255,.32),inset 0 -2px 0 rgba(40,16,80,.28),0 2px 0 #3a2070,0 6px 13px rgba(52,24,100,.24);transition:transform .25s cubic-bezier(.2,1.4,.4,1)}
#page-guide .gd-mark svg{width:22px;height:22px}
#page-guide .gd-tile:not(.gd-open):hover .gd-mark{transform:rotate(-7deg) scale(1.07)}
#page-guide .gd-t{grid-column:2;font:600 15.5px/1.3 var(--serif,Georgia,serif);color:var(--ink-1)}
#page-guide .gd-s{grid-column:2;font-size:12.8px;line-height:1.45;color:var(--ink-3);display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}
#page-guide .gd-open .gd-s{display:none}
#page-guide .gd-chev{grid-row:1/3;grid-column:3;display:grid;place-items:center;width:32px;height:32px;border-radius:50%;border:1px solid var(--hairline);color:var(--accent,#6a3fb5);
  background:linear-gradient(180deg,var(--card-hi,#fff),var(--card,#faf8fd));box-shadow:var(--pop);transition:transform .28s cubic-bezier(.2,.8,.2,1)}
#page-guide .gd-chev svg{width:15px;height:15px}
#page-guide .gd-open .gd-chev{transform:rotate(180deg)}
body[data-theme="night"] #page-guide .gd-chev{color:#d4c2f4}
@keyframes gdRise{from{opacity:0;transform:translateY(12px) scale(.985)}to{opacity:1;transform:none}}
@keyframes gdIn{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:none}}
@media (max-width:760px){
  #page-guide .gd-newwrap{position:static;margin:2px 0 12px}
  .gd-pop{position:fixed;left:10px;right:10px;top:auto;bottom:calc(10px + env(safe-area-inset-bottom,0px));width:auto;max-height:78vh;transform-origin:bottom center}
  #page-guide .gd-head{padding:14px 12px 14px 14px;column-gap:12px}
  #page-guide .gd-mark{width:38px;height:38px;border-radius:12px}
}
body[data-motion="minimal"] .gd-newkey .gd-spark svg,body[data-motion="minimal"] .gd-newkey .gd-dot,
body[data-motion="minimal"] .gd-pop,body[data-motion="minimal"] .gd-v li,body[data-motion="minimal"] #page-guide .gd-tile,body[data-motion="minimal"] #page-guide .gd-tile > *{animation:none !important}
body[data-motion="minimal"] #page-guide .gd-tile,body[data-motion="minimal"] .gd-newkey,body[data-motion="minimal"] #page-guide .gd-mark,body[data-motion="minimal"] #page-guide .gd-chev{transition:none !important}
@media (prefers-reduced-motion:reduce){.gd-newkey .gd-spark svg,.gd-newkey .gd-dot,.gd-pop,.gd-v li,#page-guide .gd-tile,#page-guide .gd-tile > *{animation:none !important}
  #page-guide .gd-tile,.gd-newkey,#page-guide .gd-mark,#page-guide .gd-chev{transition:none !important}}
</style>
<script>try{(window.__ingParts=window.__ingParts||{})["p230"]="started";}catch(_){}
/* R230 · the Guide, in rooms, and What's new in a key: see the note at the top of its styles. window.IngGuide */
(function r230(){"use strict";
if(window.IngGuide)return;
var W=window,D=document;
function $(id){return D.getElementById(id);}
function mk(tag,cls,txt){var e=D.createElement(tag);if(cls)e.className=cls;if(txt!=null)e.textContent=txt;return e;}
function svg(d){return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">'+d+'</svg>';}
function lively(){try{if(D.body.getAttribute("data-motion")==="minimal")return false;return !(W.matchMedia&&W.matchMedia("(prefers-reduced-motion: reduce)").matches);}catch(e){return true;}}
var SPARK=svg('<path d="M12 2.8c.6 4.4 2.9 6.7 7.6 8.4-4.7 1.7-7 4-7.6 8.4-.6-4.4-2.9-6.7-7.6-8.4 4.7-1.7 7-4 7.6-8.4z" fill="currentColor" stroke="none"/><path d="M19 3.5v3M17.5 5h3" />');
var CHEV=svg('<path d="M6 9l6 6 6-6"/>'),CLOSE=svg('<path d="M6 6l12 12M18 6L6 18"/>');
var IC={
  star:svg('<path d="M12 2.6c.7 4.9 3.3 7.5 8.6 9.4-5.3 1.9-7.9 4.5-8.6 9.4-.7-4.9-3.3-7.5-8.6-9.4 5.3-1.9 7.9-4.5 8.6-9.4z"/>'),
  limits:svg('<path d="M12 3.5v17M5 20.5h14"/><path d="M5.5 7.5h13"/><path d="M5.5 7.5L3 13.5h5zM18.5 7.5L16 13.5h5z"/>'),
  gauge:svg('<path d="M4.5 16.5a8 8 0 1 1 15 0"/><path d="M12 13l4-4"/><circle cx="12" cy="13" r="1.4"/>'),
  plug:svg('<path d="M9 3.5v4M15 3.5v4"/><path d="M6.5 7.5h11v3a5.5 5.5 0 0 1-11 0z"/><path d="M12 16v4.5"/>'),
  cloud:svg('<path d="M7 18.5h10.5a4 4 0 0 0 .6-7.95A6 6 0 0 0 6.6 9.2 4.7 4.7 0 0 0 7 18.5z"/>'),
  branch:svg('<circle cx="6.5" cy="5.5" r="2"/><circle cx="6.5" cy="18.5" r="2"/><circle cx="17.5" cy="7.5" r="2"/><path d="M6.5 7.5v9M17.5 9.5c0 4-4.5 3.5-9 6.8"/>'),
  layers:svg('<path d="M12 3.5l8.5 4.3-8.5 4.3-8.5-4.3z"/><path d="M3.5 12.2l8.5 4.3 8.5-4.3"/><path d="M3.5 16.4l8.5 4.3 8.5-4.3"/>'),
  device:svg('<rect x="6.5" y="2.8" width="11" height="18.4" rx="2.4"/><path d="M10.5 18h3"/>'),
  devices:svg('<rect x="2.8" y="4.5" width="13" height="9.5" rx="1.6"/><path d="M6 17.5h6.5"/><rect x="16.8" y="8" width="4.4" height="9.5" rx="1.2"/>'),
  blend:svg('<circle cx="9" cy="10" r="5.5"/><circle cx="15" cy="14" r="5.5"/>'),
  folder:svg('<path d="M3.5 7.5A1.5 1.5 0 0 1 5 6h4l2 2.2h8A1.5 1.5 0 0 1 20.5 9.7v8.3a1.5 1.5 0 0 1-1.5 1.5H5A1.5 1.5 0 0 1 3.5 18z"/>'),
  brief:svg('<rect x="3.5" y="7.5" width="17" height="12" rx="2"/><path d="M8.5 7.5V5.8A1.3 1.3 0 0 1 9.8 4.5h4.4a1.3 1.3 0 0 1 1.3 1.3v1.7M3.5 12.5h17"/>'),
  focus:svg('<circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="4.5"/><circle cx="12" cy="12" r="1"/>'),
  rail:svg('<rect x="3.5" y="4" width="17" height="16" rx="2"/><path d="M15.5 4v16M17.8 8h.4M17.8 12h.4M17.8 16h.4"/>'),
  dial:svg('<circle cx="12" cy="13" r="7.5"/><path d="M12 13V9M12 3.5v2M8.2 4.6l.9 1.6M15.8 4.6l-.9 1.6"/>'),
  pen:svg('<path d="M12 19l7-7 3 3-7 7-3-3z"/><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/><path d="M2 2l7.586 7.586"/><circle cx="11" cy="11" r="2"/>'),
  book:svg('<path d="M4 5.5A1.5 1.5 0 0 1 5.5 4H11v15.5H5.5A1.5 1.5 0 0 0 4 21z"/><path d="M20 5.5A1.5 1.5 0 0 0 18.5 4H13v15.5h5.5A1.5 1.5 0 0 1 20 21z"/>')};
/* each topic's mark, by its id, then by the words of its title */
var MARKS=[["guideEffortCard","gauge"],["cnGuide","plug"],["envGuide","cloud"],["ghxGuide","branch"],["mdGuide","layers"],["blxGuide","blend"],["fdGuide","folder"],
  ["csGuide","brief"],["wsGuide","pen"],[/^what ingenium is/,"star"],[/^honest limits/,"limits"],[/^focus/,"focus"],[/^ingenium as an app/,"devices"],
  [/^how much model/,"device"],[/^the right rail/,"rail"],[/^the instruments/,"dial"],[/effort|ultracode/,"gauge"],[/connector/,"plug"],[/environment/,"cloud"],
  [/github/,"branch"],[/model|engine/,"layers"],[/blend/,"blend"],[/folder/,"folder"],[/career/,"brief"],[/author|workshop/,"pen"]];
function markOf(c,title){var t=String(title||"").toLowerCase();for(var i=0;i<MARKS.length;i++){var m=MARKS[i][0];if(typeof m==="string"?c.id===m:m.test(t))return MARKS[i][1];}return "book";}
function words(el){var out=[];(function walk(n){for(var c=n.firstChild;c;c=c.nextSibling){if(c.nodeType===3)out.push(c.nodeValue);
    else if(c.nodeType===1&&!/^(SCRIPT|STYLE|BUTTON|SVG)$/i.test(c.tagName)&&!(c.classList&&c.classList.contains("tip-mark")))walk(c);}})(el);return out.join(" ").replace(/\s+/g," ").trim();}
function firstSentence(c){var el=null,kids=c.children;
  for(var i=0;i<kids.length;i++){var k=kids[i];if(k.classList.contains("gd-head")||k.classList.contains("gd-orig")||/^H[1-6]$/.test(k.tagName))continue;
    if(k.tagName==="P"||k.tagName==="DIV"){el=k;break;}}
  var t=el?words(el):"";
  if(!t){var tip=c.querySelector(".tip div,.kv .v,dd,li");t=tip?words(tip):"";}
  var m=t.match(/^.{12,200}?[.!?](?=\s|$)/);return m?m[0]:(t.length>170?t.slice(0,167).replace(/\s+\S*$/,"")+"…":t);}

/* ---------- the tiles ---------- */
var N=0;
function isTopic(c){return !!(c&&c.nodeType===1&&c.classList&&c.classList.contains("card")&&c.id!=="wnGuide");}
function tile(c){if(!isTopic(c)||c.__gd)return;
  if(c.id==="guideTourCard"){c.__gd=1;c.classList.add("gd-feature");return;}
  var h=c.querySelector(":scope > h2, :scope > h3");var title=h?String(h.textContent||"").replace(/\s+/g," ").trim():"";if(!title)return;
  c.__gd=1;c.classList.add("gd-tile");h.classList.add("gd-orig");
  var b=mk("button","gd-head");b.type="button";b.setAttribute("aria-expanded","false");if(!c.id)c.id="gdTopic"+(++N);
  b.innerHTML='<span class="gd-mark">'+IC[markOf(c,title)]+'</span><span class="gd-t"></span><span class="gd-s"></span><span class="gd-chev">'+CHEV+'</span>';
  b.querySelector(".gd-t").textContent=title;b.querySelector(".gd-s").textContent=firstSentence(c);
  b.title=title+": press to open";
  b.addEventListener("click",function(){toggle(c);});
  c.insertBefore(b,c.firstChild);if(all())setOpen(c,true);}
function stagger(){var s=$("page-guide");if(!s)return;[].forEach.call(s.querySelectorAll(".rm-panel"),function(p){var i=0;[].forEach.call(p.children,function(e){if(e.classList&&(e.classList.contains("gd-tile")||e.classList.contains("gd-feature"))){var k=String(i++);if(e.style.getPropertyValue("--gd-i")!==k)e.style.setProperty("--gd-i",k);}});});}
function all(){var s=$("page-guide");return !!(s&&s.classList.contains("rm-all"));}
function setOpen(c,on){c.classList.toggle("gd-open",!!on);var b=c.querySelector(":scope > .gd-head");if(b){b.setAttribute("aria-expanded",on?"true":"false");b.title=(b.querySelector(".gd-t")||{}).textContent+(on?": press to fold it away":": press to open");}}
function toggle(c,on){var open=on==null?!c.classList.contains("gd-open"):!!on;
  if(open&&!all()&&c.parentNode)[].forEach.call(c.parentNode.children,function(o){if(o!==c&&o.classList&&o.classList.contains("gd-open"))setOpen(o,false);});
  setOpen(c,open);try{if(W.IngSound&&W.IngSound.play)W.IngSound.play("cards");}catch(e){}
  if(open){try{var r=c.getBoundingClientRect(),h=W.innerHeight||800;if(r.top<70||r.top>h*0.55)c.scrollIntoView({block:"start",behavior:lively()?"smooth":"auto"});}catch(e){}}}
/* opened from elsewhere: the topic that holds this element */
function openFor(el){try{if(!el||!el.closest)return false;var c=el.closest("#page-guide .gd-tile");if(!c||c.classList.contains("gd-open"))return !!c;
  if(el===c||el.classList&&el.classList.contains("gd-head"))return true;toggle(c,true);return true;}catch(e){return false;}}
function tileAll(){var s=$("page-guide");if(!s)return;[].forEach.call(s.querySelectorAll(".card"),function(c){if(c.closest(".gd-pop"))return;tile(c);});stagger();syncAll();}
/* Show the whole guide at once (r173): every topic open, one long page; back in rooms, every topic folded */
var WASALL=null;
function syncAll(){var a=all();if(a===WASALL)return;WASALL=a;var s=$("page-guide");if(!s)return;[].forEach.call(s.querySelectorAll(".gd-tile"),function(c){setOpen(c,a);});}

/* ---------- What's new, in a key ---------- */
var SEEN="ing.guide.seen.v1";
function wnItems(){var c=$("wnGuide");if(!c)return [];var out=[];[].forEach.call(c.querySelectorAll(".wn-list li"),function(li){var b=li.querySelector("b");var v=b?String(b.textContent||"").trim():"";
  var t=String(li.textContent||"").replace(/\s+/g," ").trim();if(v&&t.indexOf(v)===0)t=t.slice(v.length).trim();if(t)out.push({v:v||"",t:t});});return out;}
function groups(){var g=[],at={};wnItems().forEach(function(x){var k=x.v||"·";if(!at[k]){at[k]={v:k,items:[]};g.push(at[k]);}at[k].items.push(x.t);});return g;}
/* 6.45: the newest version is the first entry's; the key no longer reads every entry of every version to learn it (her words, 6 November
   2026: "Everything is moving slower inside of the app ... please fix this"; measured: 0.6 to 0.8 seconds over eight presses on a
   computer a quarter as fast, every entry read again on each change) */
function newest(){var c=$("wnGuide"),b=c?c.querySelector(".wn-list li b"):null,v=b?String(b.textContent||"").trim():"";
  return v||(typeof ING_VERSION!=="undefined"?String(ING_VERSION):"");}
function seen(){try{return W.localStorage.getItem(SEEN)||"";}catch(e){return "";}}
function markSeen(v){try{W.localStorage.setItem(SEEN,v);}catch(e){}}
var POP=null,KEY=null;
function build(){var s=$("page-guide");if(!s)return;
  var wrap=$("gdNewWrap");if(!wrap){wrap=mk("div","gd-newwrap");wrap.id="gdNewWrap";wrap.setAttribute("data-rm-skip","");
    KEY=mk("button","gd-newkey");KEY.id="gdNewKey";KEY.type="button";KEY.setAttribute("aria-haspopup","dialog");KEY.setAttribute("aria-expanded","false");KEY.setAttribute("aria-controls","gdNewPop");
    KEY.innerHTML='<span class="gd-spark">'+SPARK+'</span><span class="gd-lab">What’s new</span><span class="gd-ver"></span><span class="gd-dot" hidden></span>';
    KEY.addEventListener("click",function(e){e.stopPropagation();if(POP&&!POP.hidden)close(true);else open();});
    wrap.appendChild(KEY);
    POP=mk("div","gd-pop");POP.id="gdNewPop";POP.hidden=true;POP.setAttribute("role","dialog");POP.setAttribute("aria-modal","false");POP.setAttribute("aria-labelledby","gdNewTitle");
    POP.addEventListener("click",function(e){e.stopPropagation();});
    POP.addEventListener("keydown",function(e){if(e.key==="Escape"){e.preventDefault();e.stopPropagation();close(true);}});
    wrap.appendChild(POP);
    var t=s.querySelector(":scope > .page-title");if(t&&t.nextSibling)s.insertBefore(wrap,t.nextSibling);else s.insertBefore(wrap,s.firstChild);
    D.addEventListener("click",function(e){if(POP&&!POP.hidden&&!wrap.contains(e.target))close(false);},true);
    D.addEventListener("keydown",function(e){if(e.key==="Escape"&&POP&&!POP.hidden){close(true);}});}
  else{KEY=$("gdNewKey");POP=$("gdNewPop");}
  /* the page's own words, as it now reads */
  var h1=s.querySelector(":scope > .page-title");if(h1&&h1.textContent!=="Guide")h1.textContent="Guide";
  var le=s.querySelector(":scope > .lede");var lw="Ingenium, room by room. Each topic opens when you press it, and folds away again; the tour walks you through it all.";if(le&&le.textContent!==lw)le.textContent=lw;
  refreshKey();}
/* 6.51: each part is written only when it changes. Its number was written every time, and that change woke the Guide's own watcher,
   which painted the key again at once, and so on: about 170 rewrites a second while the Guide was open */
function refreshKey(){if(!KEY)return;var v=newest(),ve=KEY.querySelector(".gd-ver");if(ve.textContent!==v)ve.textContent=v;var dot=KEY.querySelector(".gd-dot"),dh=!v||seen()===v;if(dot.hidden!==dh)dot.hidden=dh;
  var al="What’s new"+(v?", version "+v:"")+(v&&seen()!==v?", not opened yet":"");if(KEY.getAttribute("aria-label")!==al)KEY.setAttribute("aria-label",al);
  /* What is new lives in the key now: its card leaves the rooms (kept, folded, for anything that still reads it) */
  var c=$("wnGuide");if(c&&POP&&c.parentNode!==POP){c.hidden=true;POP.appendChild(c);}
  var gf=D.querySelector("#page-guide > .guide-foot");if(gf&&POP){gf.hidden=true;POP.appendChild(gf);}}
function paintPop(){if(!POP)return;var g=groups(),v=g.length?g[0].v:newest();
  POP.querySelectorAll(".gd-pop-h,.gd-pop-sub,.gd-pop-list,.gd-run").forEach(function(e){e.remove();});
  var h=mk("div","gd-pop-h");h.innerHTML='<span class="gd-spark">'+SPARK+'</span><h2 id="gdNewTitle">What’s new</h2>';
  var x=mk("button","gd-pop-x");x.type="button";x.setAttribute("aria-label","Close What’s new");x.innerHTML=CLOSE;x.addEventListener("click",function(){close(true);});h.appendChild(x);
  var sub=mk("p","gd-pop-sub","The latest versions, newest first. Open any of them to read what changed.");
  var list=mk("div","gd-pop-list");
  g.forEach(function(grp,i){var sec=mk("section","gd-v"+(i===0?" open":""));var b=mk("button","gd-vh");b.type="button";b.setAttribute("aria-expanded",i===0?"true":"false");
    b.innerHTML='<b></b><span class="n"></span><i>'+CHEV+'</i>';b.querySelector("b").textContent=grp.v;
    b.querySelector(".n").textContent=i===0?"The newest":(grp.items.length===1?grp.items[0].replace(/^(.{0,64}\S*).*$/,"$1")+(grp.items[0].length>64?"…":""):grp.items.length+" changes");
    var ul=mk("ul");grp.items.forEach(function(t){ul.appendChild(mk("li",null,t));});
    b.addEventListener("click",function(){var on=!sec.classList.contains("open");sec.classList.toggle("open",on);b.setAttribute("aria-expanded",on?"true":"false");});
    sec.appendChild(b);sec.appendChild(ul);if(i===1)list.appendChild(mk("p","gd-earlier","Earlier versions"));list.appendChild(sec);});
  if(!g.length)list.appendChild(mk("p","gd-pop-sub","Nothing listed yet."));
  POP.insertBefore(list,POP.firstChild);POP.insertBefore(sub,list);POP.insertBefore(h,sub);
  var gb=$("guideBuild"),gw=$("guideWhere"),run=POP.querySelector(".gd-run");if(run)run.remove();
  if(gb&&String(gb.textContent||"").trim()){run=mk("p","gd-run");run.appendChild(D.createTextNode("You are running "));run.appendChild(mk("b",null,String(gb.textContent).trim()));
    var wt=gw?String(gw.textContent||"").trim():"";if(wt)run.appendChild(D.createTextNode(" \u00b7 "+wt));list.parentNode.insertBefore(run,list.nextSibling);}}
function open(){build();if(!POP)return;paintPop();POP.hidden=false;KEY.setAttribute("aria-expanded","true");var v=newest();if(v)markSeen(v);refreshKey();
  try{if(W.IngSound&&W.IngSound.play)W.IngSound.play("cards");}catch(e){}
  setTimeout(function(){try{var f=POP.querySelector(".gd-vh");(f||POP.querySelector(".gd-pop-x")).focus({preventScroll:true});}catch(e){}},30);}
function close(focusKey){if(!POP||POP.hidden)return;POP.hidden=true;if(KEY){KEY.setAttribute("aria-expanded","false");if(focusKey)try{KEY.focus({preventScroll:true});}catch(e){}}}

/* ---------- start, and later ---------- */
function apply(){try{build();}catch(e){}try{tileAll();}catch(e){}try{refreshKey();}catch(e){}}
/* 6.45: changes made to the Guide while it is out of sight are taken in when it is shown (go("guide") runs apply), not as they happen */
var DIRTY=false;
function shown(){var s=$("page-guide");return !!(s&&s.classList.contains("active")&&!s.hidden);}
function watch(){var s=$("page-guide");if(!s||s.__gdWatch)return;s.__gdWatch=1;var T=0;
  try{new MutationObserver(function(){if(!shown()){DIRTY=true;return;}if(T)return;T=setTimeout(function(){T=0;DIRTY=false;apply();},0);}).observe(s,{childList:true,subtree:true});}catch(e){}
  try{new MutationObserver(function(){syncAll();}).observe(s,{attributes:true,attributeFilter:["class"]});}catch(e){}
  /* the focus moving into a folded topic (a key, Find in the guide) opens it */
  s.addEventListener("focusin",function(e){var t=e.target;if(t&&t.closest&&!t.classList.contains("gd-head"))openFor(t);});}
function boot(){apply();watch();}
if(D.readyState==="loading")D.addEventListener("DOMContentLoaded",boot);else boot();
(function later(){var n=0;(function wait(){if(W.__ingReady===true){boot();return;}if(++n<400)setTimeout(wait,500);})();})();
(function wrapGo(){var og=W.go;if(typeof og!=="function"||og.__r230)return;
  var ng=function(p){var r=og.apply(this,arguments);try{if(p==="guide")apply();else close(false);}catch(e){}return r;};
  try{Object.keys(og).forEach(function(k){ng[k]=og[k];});}catch(e){}ng.__r230=true;W.go=go=ng;})();
/* the tour's ring, Help's Show me and Find in the guide reach a part inside a folded topic: r173 opens the room, this opens the topic */
W.__rmRevealHook=(function(prev){return function(el){try{openFor(el);}catch(e){}if(typeof prev==="function")try{prev(el);}catch(e){}};})(W.__rmRevealHook);
W.IngGuide={open:open,close:close,toggle:function(id,on){var c=$(id);if(c)toggle(c,on);},openFor:openFor,groups:groups,newest:newest,apply:apply};
})();
;try{window.__ingParts["p230"]="running";}catch(_){}
</script>
