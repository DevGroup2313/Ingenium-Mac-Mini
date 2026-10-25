<style id="r173-css">
/* ============ R173 · SETTINGS, MODELS AND BLEND IN ROOMS (Ingenium 6.7, 25 October 2026) ============
   The owner's words (24 October 2026): "The models page is too long to scroll. I want tabs added in and for the model studio
   to be better accessible, right now I can't even locate the new page to use it." And: "The Settings page is another page
   that has endless scrolling, I want it redesigned and reformatted with AuDHD accessibility in mind, right now its just too
   much scrolling and its all at once, it is entirely overwhelming. The Blend and Models page need to be redesigned with that
   in mind as well."
   Measured on 6.6 at 1440 x 900: Settings 6,558 pixels tall (16 cards in one column), Models 6,278 (ten cards, the
   catalogue alone 2,815), Blend's one setup card 1,995. So each page now has rooms, as Fabrica has (the owner approved
   its four rooms, each showing only its own part with a line saying what it holds), drawn as the family's raised keys:
   - a row of room tabs under the page's opening line, the chosen one filled violet, a short plain line under them saying
     what the room holds, and only that room's cards below (the WAI-ARIA tabs pattern: arrows, Home and End);
   - Settings: Everyday, Calm and focus, Models and AI, Your data, Ownership, a Find a setting box above them that finds a
     setting in any room by its words, and a key to show every setting at once for those who prefer one long page.
     Support's groups fold, one open at a time;
   - Models: Your models, Ingenium's models, More models (the catalogue has a room of its own: with Ingenium's models it
     made a room of 4,700 pixels), the Studio (train a model, your own AIs, convert a model), named and offered beside the
     page's opening line so it is seen at once, and the Engine;
   - Blend: New blend as four steps (choose, combine, ask, answers), one step at a time, beside the answers; Ready-made
     blends, Your blend houses and Earlier blends each in a room of its own.
   The cards are moved, never copied: every id and handler stays. A card that comes later is filed by its id, then by the
   words of its heading, or in a last room, More, shown only when it holds something. A room with nothing in it (a card
   absent from an edition) hides its tab. Anything that scrolls to, focuses or rings a card in another room opens that room
   first (IngRooms.reveal, and quietly from scrollIntoView, focus, the tour's ring and Help's Show me). */
#page-settings,#page-models,#page-blend{--rm-pa:#7348be;--rm-pb:#5d37a1;--rm-pedge:#4b2a86;--rm-pledge:#3a2070;
  --rm-psh:inset 0 1px 0 rgba(255,255,255,.24),0 1px 0 #3a2070,0 3px 6px rgba(52,24,100,.26),0 8px 14px rgba(52,24,100,.12);
  --rm-well:inset 0 1px 2.5px rgba(40,22,68,.09);--rm-wellbg:rgba(34,26,46,.035);--rm-ring:rgba(106,63,181,.55);--rm-ok:#2a7444;--rm-oks:rgba(45,154,82,.14);
  --rm-focus:var(--accent,#6a3fb5);--rm-flash:rgba(106,63,181,.42)}
body[data-theme="night"] #page-settings,body[data-theme="night"] #page-models,body[data-theme="night"] #page-blend{--rm-pa:#7a56c8;--rm-pb:#5b3aa1;--rm-pedge:#2c1956;--rm-pledge:#170b30;
  --rm-psh:inset 0 1px 0 rgba(255,255,255,.14),0 1px 0 #170b30,0 3px 6px rgba(0,0,0,.45),0 8px 14px rgba(0,0,0,.3);
  --rm-well:inset 0 1px 3px rgba(0,0,0,.42);--rm-wellbg:rgba(10,6,18,.35);--rm-ring:rgba(201,178,242,.6);--rm-ok:#8fdcaa;--rm-oks:rgba(92,200,130,.16);
  --rm-focus:var(--accent-bright,#c9b2f2);--rm-flash:rgba(201,178,242,.4)}
.rm-sr{position:absolute !important;width:1px !important;height:1px !important;padding:0 !important;margin:-1px !important;overflow:hidden !important;clip:rect(0 0 0 0) !important;white-space:nowrap !important;border:0 !important}
.rm-bar{margin:6px 0 4px;min-width:0;max-width:100%}
.rm-row{display:flex;flex-wrap:wrap;align-items:center;gap:10px 14px;min-width:0}
.rm-tabs{display:flex;flex-wrap:wrap;gap:8px;min-width:0;flex:1 1 auto}
.rm-tabs[hidden]{display:none !important}
.rm-tab{position:relative;display:inline-flex;align-items:center;gap:8px;min-height:40px;margin:0;padding:8px 16px 8px 12px;border-radius:12px;border:1px solid var(--hairline);
  background:linear-gradient(180deg,var(--card-hi),var(--card-lo));box-shadow:var(--pop);color:var(--ink-2);font:600 13.5px/1.25 var(--sans);letter-spacing:.005em;
  cursor:pointer;text-align:left;white-space:nowrap;-webkit-tap-highlight-color:transparent;touch-action:manipulation;
  transition:transform .16s var(--spring),box-shadow .16s ease,color .15s ease,border-color .15s ease}
.rm-tab[hidden]{display:none !important}
.rm-tab svg{flex:0 0 auto;width:17px;height:17px;color:var(--accent)}
.rm-tab.rm-star svg{color:var(--gold-ink,var(--accent))}
.rm-tab:hover{transform:translateY(-2px);box-shadow:var(--pop-hi,var(--pop));color:var(--ink-1)}
.rm-tab:active{transform:translateY(1px);transition-duration:.06s}
.rm-tab[aria-selected="true"]{color:#fff;background:linear-gradient(180deg,var(--rm-pa),var(--rm-pb));border-color:var(--rm-pedge);box-shadow:var(--rm-psh);text-shadow:0 1px 1px rgba(30,10,60,.32);transform:none}
.rm-tab[aria-selected="true"] svg{color:#fff}
.rm-tab:focus-visible,.rm-key:focus-visible,.rm-allkey:focus-visible,.rm-step:focus-visible,.rm-fold:focus-visible{outline:2.5px solid var(--rm-focus);outline-offset:3px}
.rm-says{margin:10px 2px 0;font-size:13.5px;line-height:1.5;color:var(--ink-2);max-width:72ch}
.rm-says[hidden]{display:none !important}
.rm-allkey,.rm-key{display:inline-flex;align-items:center;gap:7px;min-height:38px;margin:0;padding:7px 14px 7px 11px;border-radius:12px;border:1px solid var(--hairline);
  background:linear-gradient(180deg,var(--card-hi),var(--card-lo));box-shadow:var(--pop);color:var(--ink-1);font:600 13px/1.2 var(--sans);cursor:pointer;
  -webkit-tap-highlight-color:transparent;touch-action:manipulation;transition:transform .16s var(--spring),box-shadow .16s ease}
.rm-allkey{margin-left:auto;font-weight:500;color:var(--ink-2)}
.rm-allkey svg,.rm-key svg{flex:0 0 auto;width:16px;height:16px;color:var(--accent)}
.rm-key.rm-star svg{color:var(--gold-ink,var(--accent))}
.rm-allkey:hover,.rm-key:hover{transform:translateY(-2px);box-shadow:var(--pop-hi,var(--pop));color:var(--ink-1)}
.rm-allkey:active,.rm-key:active{transform:translateY(1px);transition-duration:.06s}
.rm-panel{margin-top:16px;min-width:0}
.rm-panel[hidden]{display:none !important}
.rm-panel > *{scroll-margin-top:84px}
.rm-roomh{display:none}
#page-settings.rm-all .rm-roomh{display:flex;align-items:center;gap:9px;margin:30px 2px 12px;padding-bottom:8px;border-bottom:1px solid var(--hairline);font:600 16px/1.3 var(--serif);color:var(--ink-1)}
#page-settings.rm-all .rm-panel:first-of-type .rm-roomh{margin-top:6px}
.rm-roomh svg{width:18px;height:18px;color:var(--accent)}
body:not([data-motion="minimal"]) .rm-panel.rm-in{animation:rmIn .26s var(--spring) both}
@keyframes rmIn{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:none}}
/* the studio's line beside the Models page's opening words */
.rm-hint{display:flex;flex-wrap:wrap;align-items:center;gap:8px 12px;margin:-2px 0 12px;font-size:14px;line-height:1.45;color:var(--ink-2)}
/* Find a setting */
.rm-find{margin:0 0 14px;max-width:680px}
.rm-find-lab{display:block;margin:0 2px 6px;font:600 13px/1.3 var(--sans);color:var(--ink-1)}
.rm-find-box{position:relative}
.rm-find-box svg{position:absolute;left:13px;top:50%;width:18px;height:18px;margin-top:-9px;color:var(--ink-3);pointer-events:none}
.rm-find-box input{display:block;width:100%;box-sizing:border-box;min-height:42px;margin:0;padding:9px 14px 9px 40px;border-radius:12px;border:1px solid var(--hairline);
  background:var(--cl-solid,var(--card-hi));box-shadow:var(--rm-well);color:var(--ink-1);font:500 15px/1.3 var(--sans)}
.rm-find-box input::placeholder{color:var(--ink-3);opacity:1}
.rm-find-box input:focus{outline:2.5px solid var(--rm-focus);outline-offset:2px}
.rm-out{margin-top:8px;padding:6px;border:1px solid var(--hairline);border-radius:14px;background:var(--cl-solid,var(--card-hi));box-shadow:var(--pop)}
.rm-out[hidden]{display:none !important}
.rm-hits{list-style:none;margin:0;padding:0}
.rm-hit{display:flex;flex-direction:column;align-items:flex-start;gap:2px;width:100%;min-height:44px;margin:0;padding:8px 12px;border:0;border-radius:10px;background:transparent;
  color:var(--ink-1);font:600 14px/1.35 var(--sans);text-align:left;cursor:pointer;box-shadow:none}
.rm-hit span{font-weight:500;font-size:12.5px;color:var(--ink-2)}
.rm-hit:hover,.rm-hit:focus-visible{background:var(--accent-soft)}
.rm-hit:focus-visible{outline:2px solid var(--rm-focus);outline-offset:-2px}
.rm-none{padding:10px 12px;font-size:13.5px;line-height:1.45;color:var(--ink-2)}
/* a setting found, or a card reached: a brief violet glow */
.rm-flash{outline:3px solid var(--rm-focus) !important;outline-offset:4px;border-radius:12px}
body:not([data-motion="minimal"]) .rm-flash{animation:rmGlow 1.1s ease-out 2}
@keyframes rmGlow{0%{box-shadow:0 0 0 0 var(--rm-flash)}100%{box-shadow:0 0 0 16px rgba(106,63,181,0)}}
/* a heading or the answers given focus so a screen reader starts there: the glow shows where, so no second ring */
.rm-panel :is(h2,h3)[tabindex="-1"]:focus:not(:focus-visible),.rm-panel :is(h2,h3)[tabindex="-1"].rm-q:focus,#page-blend .bl-setup > h2[tabindex="-1"]:focus,#blendOut[tabindex="-1"]:focus{outline:none}
/* Support's groups fold, one open at a time */
#supRows .sup-group-title > .rm-fold{display:flex;align-items:center;gap:10px;width:100%;min-height:36px;margin:0;padding:4px 2px;border:0;background:transparent;box-shadow:none;
  color:inherit;font:inherit;letter-spacing:inherit;text-transform:inherit;text-align:left;cursor:pointer}
#supRows .rm-fold > span{flex:1 1 auto}
#supRows .rm-fold > i{flex:0 0 auto;display:inline-grid;place-items:center;width:28px;height:28px;border-radius:9px;border:1px solid var(--hairline);
  background:linear-gradient(180deg,var(--card-hi),var(--card-lo));box-shadow:var(--pop);color:var(--ink-2);transition:transform .2s var(--spring)}
#supRows .rm-fold > i svg{width:13px;height:13px;transition:transform .25s var(--spring)}
#supRows .rm-fold:hover > i{transform:translateY(-2px)}
#supRows .sup-group.rm-shut .rm-fold > i svg{transform:rotate(-90deg)}
#supRows .sup-group.rm-shut > :not(.sup-group-title){display:none !important}
/* Blend: the rooms are views of its one setup card and the answers beside it */
#page-blend .bl-grid[role="tabpanel"]{margin-top:16px}
#page-blend.rm-on[data-rm-room="new"] .bl-setup > :is(#blPresets,#bhBox,#blendEarlier){display:none !important}
#page-blend.rm-on:not([data-rm-room="new"]) .bl-setup > :is([data-rm-step],.rm-steps,.rm-stepnav){display:none !important}
#page-blend.rm-on[data-rm-room="ready"] .bl-setup > :not(#blPresets),
#page-blend.rm-on[data-rm-room="houses"] .bl-setup > :not(#bhBox),
#page-blend.rm-on[data-rm-room="earlier"] .bl-setup > :not(#blendEarlier){display:none !important}
#page-blend.rm-on:is([data-rm-room="ready"],[data-rm-room="houses"]) #blendOut{display:none !important}
#page-blend.rm-on:is([data-rm-room="ready"],[data-rm-room="houses"]) .bl-grid{grid-template-columns:minmax(0,1fr)}
#page-blend.rm-on[data-rm-room="ready"] .bl-presets{grid-template-columns:repeat(auto-fill,minmax(250px,1fr));gap:12px}
#page-blend.rm-on:not([data-rm-room="new"]) .bl-setup > :is(#bhBox,#blendEarlier){margin-top:0}
#page-blend.rm-on[data-rm-room="new"][data-rm-step="1"] .bl-setup > [data-rm-step]:not([data-rm-step="1"]),
#page-blend.rm-on[data-rm-room="new"][data-rm-step="2"] .bl-setup > [data-rm-step]:not([data-rm-step="2"]),
#page-blend.rm-on[data-rm-room="new"][data-rm-step="3"] .bl-setup > [data-rm-step]:not([data-rm-step="3"]){display:none !important}
#page-blend.rm-on[data-rm-room="new"] .bl-setup > h2.sec[data-rm-step]{margin-top:0}
#page-blend .bl-setup{container-type:inline-size}
.rm-steps{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:6px;list-style:none;margin:0 0 16px;padding:0}
.rm-steps li{margin:0;padding:0;min-width:0}
.rm-step{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:4px;width:100%;min-height:52px;margin:0;padding:6px 4px;border-radius:12px;border:1px solid var(--hairline);
  background:linear-gradient(180deg,var(--card-hi),var(--card-lo));box-shadow:var(--pop);color:var(--ink-2);font:600 12.5px/1.15 var(--sans);cursor:pointer;
  -webkit-tap-highlight-color:transparent;touch-action:manipulation;transition:transform .16s var(--spring),box-shadow .16s ease,color .15s,border-color .15s}
.rm-step i{font-style:normal;display:inline-grid;place-items:center;width:21px;height:21px;border-radius:50%;font-size:11px;font-weight:700;background:var(--rm-wellbg);box-shadow:var(--rm-well);color:var(--ink-2)}
.rm-step:hover{transform:translateY(-2px);box-shadow:var(--pop-hi,var(--pop));color:var(--ink-1)}
.rm-step.rm-done i{background:var(--rm-oks);color:var(--rm-ok);box-shadow:none}
.rm-step[aria-current="step"]{color:var(--ink-1);border-color:var(--rm-ring);box-shadow:var(--pop-hi,var(--pop)),inset 0 0 0 1px var(--rm-ring);transform:translateY(-1px)}
.rm-step[aria-current="step"] i{background:linear-gradient(180deg,var(--rm-pa),var(--rm-pb));color:#fff;box-shadow:0 1px 0 var(--rm-pledge)}
@container (min-width:400px){.rm-step{flex-direction:row;gap:7px;min-height:40px;border-radius:999px;padding:5px 8px}}
.rm-stepnav{display:flex;flex-wrap:wrap;align-items:center;gap:8px 10px;margin-top:16px;padding-top:12px;border-top:1px solid var(--hairline)}
.rm-stepnav .rm-next{margin-left:auto}
.rm-stepnav .rm-navhint{flex:1 1 160px;font-size:12.5px;line-height:1.4;color:var(--ink-2)}
.rm-stepnav [hidden]{display:none !important}
/* the Health card's green tags by day, a shade darker to read clearly (4.2 to 5.2 against their tint): seen once a model is installed */
body:not([data-theme="night"]) .hm-tag.ok{color:#236b49}
/* and the judge's best scores in Blend's answers, by day: 4.3 to 5.3 against their tint */
body:not([data-theme="night"]) .bl-score span.best{color:#236b49}
/* and its answers' state by night (a model done, failed or stopped): the day's greens and reds read at 2 to 1 on a night card */
body[data-theme="night"] .bl-st-done{background:rgba(92,200,130,.16);color:#8fdcaa}
body[data-theme="night"] :is(.bl-st-failed,.bl-st-stopped){background:rgba(224,120,106,.16);color:#f0a89e}
/* a phone, or any narrow window: the tabs in two columns, every one in reach and whole */
@media (max-width:600px){
  .rm-bar{display:flex;flex-direction:column}
  .rm-row{display:contents}
  .rm-find{order:0}.rm-tabs{order:1}.rm-says{order:2}
  .rm-tabs{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px}
  .rm-tab{min-height:44px;padding:8px 10px;white-space:normal;line-height:1.2}
  .rm-allkey{order:3;align-self:flex-start;margin:12px 0 0;min-height:44px}
  .rm-find{max-width:none}
  .rm-hint{margin-bottom:10px}
}
@media (pointer:coarse){.rm-tab,.rm-key,.rm-allkey,.rm-hit,.rm-find-box input,.rm-stepnav .btn{min-height:44px}.rm-step{min-height:48px}#supRows .sup-group-title > .rm-fold{min-height:44px}}
@media (max-width:360px){.rm-step{padding:6px 2px;font-size:11.5px}}
@media (prefers-reduced-motion:reduce){.rm-tab,.rm-key,.rm-allkey,.rm-step,#supRows .rm-fold > i,#supRows .rm-fold > i svg{transition:none !important}.rm-panel.rm-in,.rm-flash{animation:none !important}}
body[data-motion="minimal"] .rm-tab,body[data-motion="minimal"] .rm-key,body[data-motion="minimal"] .rm-allkey,body[data-motion="minimal"] .rm-step{transition:none !important}
</style>
<script>try{(window.__ingParts=window.__ingParts||{})["p94"]="started";}catch(_){}
/* R173 · Settings, Models and Blend in rooms: see the note at the top of its styles.
   window.IngRooms: open(page, room), reveal(element, options), roomOf(element), current(page), rooms(page), cards(page),
   step(n) for Blend, all(on) for Settings, find(words) for Settings. */
(function r173(){"use strict";
if(window.IngRooms)return;
var W=window,D=document;
function $(id){return D.getElementById(id);}
function mk(tag,cls,txt){var e=D.createElement(tag);if(cls)e.className=cls;if(txt!=null)e.textContent=txt;return e;}
function att(e,o){for(var k in o)if(Object.prototype.hasOwnProperty.call(o,k))e.setAttribute(k,o[k]);return e;}
function warn(e){try{console.warn("Ingenium rooms:",e&&e.message||e);}catch(_){}}
function lively(){try{if(D.body&&D.body.getAttribute("data-motion")==="minimal")return false;return !(W.matchMedia&&W.matchMedia("(prefers-reduced-motion: reduce)").matches);}catch(e){return false;}}
function norm(s){s=String(s||"").toLowerCase();try{s=s.normalize("NFD").replace(/[\u0300-\u036f]/g,"");}catch(e){}return s.replace(/[\u2018\u2019]/g,"'").replace(/\s+/g," ").trim();}
function clean(s){return String(s||"").replace(/\s+/g," ").trim();}
/* the words of an element with a space between its parts, so "replies" and "Uses" in two lines never run together */
function words(e){var out=[];(function walk(n){for(var c=n.firstChild;c;c=c.nextSibling){if(c.nodeType===3)out.push(c.nodeValue);
  else if(c.nodeType===1&&!/^(script|style|svg|select|option|template)$/i.test(c.tagName))walk(c);}})(e);return clean(out.join(" "));}
function svg(d){return '<svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">'+d+'</svg>';}
var STAR='<path d="M12 2.6c.7 4.9 3.3 7.5 8.6 9.4-5.3 1.9-7.9 4.5-8.6 9.4-.7-4.9-3.3-7.5-8.6-9.4 5.3-1.9 7.9-4.5 8.6-9.4z"/>';
var IC={
  day:svg('<circle cx="12" cy="12" r="4"/><path d="M12 2.8v2.2M12 19v2.2M2.8 12H5M19 12h2.2M5.5 5.5l1.6 1.6M16.9 16.9l1.6 1.6M5.5 18.5l1.6-1.6M16.9 7.1l1.6-1.6"/>'),
  calm:svg('<path d="M5 19.5c0-8.4 5.2-13.6 14.5-14.5-.9 9.3-6.1 14.5-14.5 14.5z"/><path d="M5 19.5l7.5-7.5"/>'),
  ai:svg('<path d="M10.5 3.5l1.6 4.6 4.6 1.6-4.6 1.6-1.6 4.6-1.6-4.6-4.6-1.6 4.6-1.6z"/><path d="M17.5 13.5l.9 2.4 2.4.9-2.4.9-.9 2.4-.9-2.4-2.4-.9 2.4-.9z"/>'),
  data:svg('<rect x="3.5" y="4" width="17" height="5" rx="1.5"/><path d="M5 9v9.5A1.5 1.5 0 0 0 6.5 20h11a1.5 1.5 0 0 0 1.5-1.5V9"/><path d="M10 13h4"/>'),
  own:svg('<circle cx="8" cy="15.5" r="4"/><path d="M11 12.5l8.5-8.5M16.2 7.3l2.4 2.4M13.8 9.7l1.8 1.8"/>'),
  more:svg('<circle cx="6" cy="12" r="1.4"/><circle cx="12" cy="12" r="1.4"/><circle cx="18" cy="12" r="1.4"/>'),
  yours:svg('<path d="M12 3.5l8.5 4.3-8.5 4.3-8.5-4.3z"/><path d="M3.5 12.2l8.5 4.3 8.5-4.3"/><path d="M3.5 16.4l8.5 4.3 8.5-4.3"/>'),
  get:svg('<path d="M4 10.8L12 4.3l8 6.5V20H4z"/><path d="M12 9.8v6.4M9.4 13.7l2.6 2.6 2.6-2.6"/>'),
  cat:svg('<rect x="3.5" y="3.5" width="7" height="7" rx="1.6"/><rect x="13.5" y="3.5" width="7" height="7" rx="1.6"/><rect x="3.5" y="13.5" width="7" height="7" rx="1.6"/><rect x="13.5" y="13.5" width="7" height="7" rx="1.6"/>'),
  studio:svg(STAR),
  engine:svg('<circle cx="12" cy="12" r="3.2"/><path d="M12 2.8v2.6M12 18.6v2.6M2.8 12h2.6M18.6 12h2.6M5.5 5.5l1.8 1.8M16.7 16.7l1.8 1.8M5.5 18.5l1.8-1.8M16.7 7.3l1.8-1.8"/>'),
  fresh:svg('<circle cx="9" cy="10" r="5.5"/><circle cx="15" cy="14" r="5.5"/>'),
  ready:svg('<path d="M4.5 19.5L15 9"/><path d="M14.5 4v2.2M19.8 9.3h-2.2M18.4 5.4l-1.5 1.5M18.6 13.6v1.8M9.6 3.8v1.8"/>'),
  houses:svg('<path d="M4 11.2L12 4.6l8 6.6"/><path d="M6 9.6V20h12V9.6"/><path d="M10 20v-5h4v5"/>'),
  earlier:svg('<circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/>'),
  find:svg('<circle cx="11" cy="11" r="6.5"/><path d="M20 20l-4.3-4.3"/>'),
  rows:svg('<path d="M4 6h16M4 12h16M4 18h16"/>')};
var CHEV='<i aria-hidden="true">'+svg('<path d="M6 9l6 6 6-6"/>')+'</i>';

/* ---------- the rooms of each page ---------- */
var CONF={
  settings:{label:"Settings, in rooms",find:true,all:true,rooms:[
    {k:"everyday",t:"Everyday",i:"day",says:"Everyday things: the app's name, day or night, sound, and help. A refresh key is here too, for when the app glitches.",
      ids:["ing-refresh-card",/^name$/,/^look and feel/,"ingSoundCard",/^sounds?\b/,"ihSetCard"]},
    {k:"calm",t:"Calm and focus",i:"calm",says:"Support for focus, time and a calmer screen. One group opens at a time.",ids:["supCard"]},
    {k:"ai",t:"Models and AI",i:"ai",says:"How Ingenium writes to you, and the models it may use. Web search and Ingenium's eyes are here too.",
      ids:["personaCard",/^connect a cloud/,/^web search/,"linkCard","ingEyesCard"]},
    {k:"data",t:"Your data",i:"data",says:"Your chats, your backups, and the room Ingenium takes on this device.",
      ids:["ingImportCard","bkCard","stxCard",/^data on this device/]},
    {k:"own",t:"Ownership",i:"own",says:"Who owns Ingenium, its licence, and the permissions kept on this device.",ids:["ingPermitCard"]}],
    words:[[/sound|audio|volume|look|theme|appearance|name|help|tour|refresh/,"everyday"],[/support|calm|focus|sensory|routine/,"calm"],
      [/model|cloud|server|search|eyes|persona|device/,"ai"],[/data|backup|storage|import|export|chats|moving/,"data"],[/licen|permission|owner/,"own"]]},
  models:{label:"Models, in rooms",rooms:[
    {k:"yours",t:"Your models",i:"yours",says:"The models on this device and how well they run. Add a model file you already have.",ids:["healthBox","yourModelsCard",/^add a model/]},
    {k:"get",t:"Ingenium's models",i:"get",says:"Ingenium's own models, in four houses. Choose a size and get one.",ids:["lineupCard",/^the four houses/]},
    {k:"catalogue",t:"More models",i:"cat",says:"A wider choice of strong, open models. They are sorted by what fits this device.",ids:["catBox"]},
    {k:"studio",t:"Studio",i:"studio",star:true,says:"The Studio: make and train your own models. Give a model its own name and instructions, or convert a model's file.",
      ids:["trainCard","aiCard","convCard"]},
    {k:"engine",t:"Engine",i:"engine",says:"The engine that runs your models on this device.",ids:[/^the engine/]}],
    words:[[/train|studio|convert|own ai|your own/,"studio"],[/engine/,"engine"],[/catalog|more models/,"catalogue"],[/house|lineup|ingenium's/,"get"],[/model|health|add/,"yours"]]},
  blend:{label:"Blend, in rooms",view:true,rooms:[
    {k:"new",t:"New blend",i:"fresh",says:"Make a blend in four steps: choose the models, choose how they work together, ask, then read the answers."},
    {k:"ready",t:"Ready-made",i:"ready",says:"Blends ready to use. One press sets the models and how they work together."},
    {k:"houses",t:"Your houses",i:"houses",says:"Blends you kept as houses. Choose one in the chat, as you would a model."},
    {k:"earlier",t:"Earlier",i:"earlier",says:"Your earlier blends. Press one to read its answers again."}]}};
var MORE={k:"more",t:"More",i:"more",says:"Everything else on this page, added after the rest."};
var STEPS=[{t:"Choose",next:"Next: how they work together"},{t:"Combine",next:"Next: your question"},{t:"Ask"},{t:"Answers"}];
/* the words a person might use for each setting, besides the words on the card */
var KEYS=[
  ["ing-refresh-card","refresh reload restart glitch glitches frozen stuck stops answering start again"],
  [/^name$/,"name app name title called rename"],
  [/^look and feel/,"look theme dark night day light mode colour color colours appearance motion animation movement"],
  ["ingSoundCard","sound sounds audio volume chime click clicks quiet mute noise"],
  ["ihSetCard","help tour guided level beginner expert guide tips explain"],
  ["supCard","support focus time timer break reminder reminders sensory calm text size font larger line spacing clear answers routines read aloud voice"],
  ["personaCard","persona tone length answers instructions style language rules what to call you about you"],
  [/^connect a cloud/,"cloud server online remote api key token address connect connection"],
  [/^web search/,"web search internet online sources scholar academic peer reviewed"],
  ["linkCard","devices phone tablet computer share sharing every device link"],
  ["ingEyesCard","eyes pictures picture images photos vision see"],
  ["ingImportCard","import chats bring conversations other assistants transcript history"],
  ["bkCard","backup back up export import restore move moving copy zip file password keys new device carry"],
  ["stxCard","storage space room disk quota limit clean clear library memory full"],
  [/^data on this device/,"data export import reset erase delete wipe recover earlier moment backup"],
  ["ingPermitCard","licence license licensing permission permissions owner ownership key copyright rights terms legal"]];

/* ---------- what the person chose last, kept on this device (all is well without it) ---------- */
var KEY="ing.rooms.v1",PREF={};
try{var raw=W.localStorage.getItem(KEY);PREF=raw?JSON.parse(raw):{};}catch(e){PREF={};}
if(!PREF||typeof PREF!=="object")PREF={};
function pref(pk){var o=PREF[pk];if(!o||typeof o!=="object")o=PREF[pk]={};return o;}
function keep(){try{W.localStorage.setItem(KEY,JSON.stringify(PREF));}catch(e){}}

var P={};  /* page key -> its rooms as built */
var oSIV=Element.prototype.scrollIntoView,oFocus=HTMLElement.prototype.focus;
function scrollTo_(el,block){try{oSIV.call(el,{block:block||"start",behavior:lively()?"smooth":"auto"});}catch(e){try{oSIV.call(el);}catch(_){}}}
function focusQuiet(el){try{oFocus.call(el,{preventScroll:true});}catch(e){}}
function activePage(){var s=D.querySelector(".section.active");return s&&s.id?s.id.replace(/^page-/,""):"";}
function roomDef(R,k){for(var i=0;i<R.rooms.length;i++)if(R.rooms[i].k===k)return R.rooms[i];return null;}
function first(R){for(var i=0;i<R.rooms.length;i++){var t=R.tabs[R.rooms[i].k];if(t&&!t.hidden)return R.rooms[i].k;}return null;}
function pick(R){var k=pref(R.pk).room;return k&&R.tabs[k]&&!R.tabs[k].hidden?k:first(R);}
var NT=0;function nudge(R){if(!R.sec.classList.contains("active"))return;cancelAnimationFrame(NT);
  /* the parts that measure themselves (a sliding thumb, a meter) measure again now that they are seen */
  NT=requestAnimationFrame(function(){try{W.dispatchEvent(new Event("resize"));}catch(e){}});}

/* ---------- cards: which room each belongs to ---------- */
/* the rooms' own parts (a card lit for a moment, class rm-flash, is still a card) */
var MINE=/(^|\s)rm-(bar|panel|hint|roomh|steps|stepnav)(\s|$)/;
function isCard(e){if(!e||e.nodeType!==1)return false;if(/^(H1|STYLE|SCRIPT|TEMPLATE|LINK|META|INPUT|NOSCRIPT)$/.test(e.tagName))return false;
  var c=typeof e.className==="string"?e.className:"";if(MINE.test(c))return false;
  if(e.classList.contains("page-title")||e.classList.contains("lede"))return false;
  return e.classList.contains("card")||!!e.querySelector("h2,h3");}
function headEl(c){return c.querySelector("h2,h3,[id$='-h'],b,strong");}
function headText(c){var h=headEl(c);return h?clean(h.textContent):"";}
function ruleOf(R,c){var h=norm(headText(c)),rs=R.c.rooms,i,j,s;
  for(i=0;i<rs.length;i++){var ids=rs[i].ids||[];for(j=0;j<ids.length;j++){s=ids[j];if(typeof s==="string"?c.id===s:s.test(h))return {k:rs[i].k,rank:j};}}
  var ws=R.c.words||[];for(i=0;i<ws.length;i++)if(ws[i][0].test(h))return {k:ws[i][1],rank:500};
  return {k:"more",rank:500};}
function fileCard(R,c){var r=ruleOf(R,c),p=R.panels[r.k];c.__rmRank=r.rank;if(!p||c.parentNode===p)return false;
  /* a card nobody named, already set beside another in a room by the part that made it, stays where it was put */
  if(r.k==="more"&&c.parentNode&&c.parentNode.classList&&c.parentNode.classList.contains("rm-panel"))return false;
  var before=null,kids=p.children;for(var i=0;i<kids.length;i++){var e=kids[i];if(!isCard(e)||e===c)continue;var rk=e.__rmRank==null?ruleOf(R,e).rank:e.__rmRank;if(rk>r.rank){before=e;break;}}
  p.insertBefore(c,before);return true;}
function fileAll(R){if(R.view)return;
  [].slice.call(R.sec.children).forEach(function(e){if(isCard(e))fileCard(R,e);});
  R.rooms.forEach(function(rm){[].slice.call(R.panels[rm.k].children).forEach(function(e){if(!isCard(e))return;var r=ruleOf(R,e);if(r.k!==rm.k&&r.k!=="more")fileCard(R,e);});});
  shown(R);}
function has(R,k){var p=R.panels[k];if(!p)return false;for(var i=0;i<p.children.length;i++){var e=p.children[i];
  if(isCard(e)&&!e.hidden){var d="";try{d=getComputedStyle(e).display;}catch(_){}if(d!=="none")return true;}}return false;}
function shown(R){var changed=false;R.rooms.forEach(function(rm){var on=R.view?blendHas(R,rm.k):has(R,rm.k),t=R.tabs[rm.k];if(t.hidden===on){t.hidden=!on;changed=true;}});
  if(!R.cur||R.tabs[R.cur].hidden)show(R,first(R),{});else if(changed&&R.all)show(R,R.cur,{});}
function cardsOf(R){var out=[];if(R.view)return out;R.rooms.forEach(function(rm){[].forEach.call(R.panels[rm.k].children,function(e){if(isCard(e))out.push(e);});});return out;}

/* ---------- showing a room ---------- */
function show(R,k,o){o=o||{};if(!k||!R.tabs[k]||R.tabs[k].hidden)k=first(R);if(!k)return;var was=R.cur;R.cur=k;R.sec.setAttribute("data-rm-room",k);
  R.rooms.forEach(function(rm){var on=rm.k===k,t=R.tabs[rm.k];t.setAttribute("aria-selected",on?"true":"false");t.tabIndex=on?0:-1;
    if(!R.view){var p=R.panels[rm.k],vis=R.all?!t.hidden:on;if(p.hidden===vis)p.hidden=!vis;
      if(on&&!R.all&&was&&was!==k&&lively()){p.classList.remove("rm-in");void p.offsetWidth;p.classList.add("rm-in");}}});
  var rm=roomDef(R,k);if(rm&&R.says.textContent!==rm.says)R.says.textContent=rm.says;
  if(R.view)blendShow(R,k);
  if(o.keep){pref(R.pk).room=k;keep();}
  if(o.focus){try{R.tabs[k].focus();}catch(e){}}
  if(was!==k)nudge(R);}
function tabKeys(R,e){var k=e.key;if(k!=="ArrowLeft"&&k!=="ArrowRight"&&k!=="Home"&&k!=="End")return;
  var bs=R.rooms.map(function(rm){return R.tabs[rm.k];}).filter(function(b){return !b.hidden;}),i=bs.indexOf(D.activeElement);if(i<0)return;
  e.preventDefault();var j=k==="Home"?0:k==="End"?bs.length-1:(i+(k==="ArrowRight"?1:-1)+bs.length)%bs.length;
  show(R,bs[j].getAttribute("data-room"),{keep:true,focus:true});}
function makeBar(R){var pk=R.pk,c=R.c,bar=mk("div","rm-bar");bar.id="rmBar-"+pk;
  if(c.find)bar.appendChild(findBox(R));
  var row=mk("div","rm-row"),tl=att(mk("div","rm-tabs"),{role:"tablist","aria-label":c.label});tl.id="rmTabs-"+pk;R.tl=tl;
  var says=att(mk("p","rm-says"),{id:"rmSays-"+pk,"aria-live":"polite"});R.says=says;
  R.rooms.forEach(function(rm){var t=att(mk("button","rm-tab"+(rm.star?" rm-star":"")),{type:"button",role:"tab",id:"rmT-"+pk+"-"+rm.k,"aria-selected":"false","data-room":rm.k});
    t.tabIndex=-1;t.innerHTML=IC[rm.i]||"";t.appendChild(mk("span",null,rm.t));t.title=rm.says;
    t.addEventListener("click",function(){show(R,rm.k,{keep:true});});tl.appendChild(t);R.tabs[rm.k]=t;});
  tl.addEventListener("keydown",function(e){tabKeys(R,e);});
  row.appendChild(tl);
  if(c.all){var ak=att(mk("button","rm-allkey"),{type:"button"});ak.id="rmAll-"+pk;ak.innerHTML=IC.rows;ak.appendChild(mk("span"));
    ak.addEventListener("click",function(){setAll(R,!R.all,true);});row.appendChild(ak);R.ak=ak;}
  bar.appendChild(row);bar.appendChild(says);return bar;}
function afterLede(sec,el){var at=null,l=sec.querySelector(":scope > .lede")||sec.querySelector(":scope > .page-title");if(l){at=l.nextSibling;while(at&&at.nodeType===1&&/(^|\s)rm-hint/.test(at.className||""))at=at.nextSibling;}
  sec.insertBefore(el,at||(l?null:sec.firstChild));}

/* ---------- Settings and Models: the cards moved into their rooms ---------- */
function buildMove(pk){var sec=$("page-"+pk);if(!sec)return null;if(sec.__rm)return sec.__rm;
  var c=CONF[pk],R={pk:pk,c:c,sec:sec,tabs:{},panels:{},heads:{},rooms:c.rooms.concat([MORE]),cur:null,all:false,view:false};sec.__rm=R;P[pk]=R;
  if(pk==="models")studioHint(R);
  var bar=makeBar(R);afterLede(sec,bar);R.bar=bar;
  var ref=bar.nextSibling;
  R.rooms.forEach(function(rm){var t=R.tabs[rm.k];t.setAttribute("aria-controls","rmP-"+pk+"-"+rm.k);
    var p=att(mk("div","rm-panel"),{role:"tabpanel",id:"rmP-"+pk+"-"+rm.k,"aria-labelledby":t.id,"aria-describedby":R.says.id,"data-room":rm.k});p.hidden=true;
    var hd=att(mk("p","rm-roomh"),{id:"rmH-"+pk+"-"+rm.k});hd.innerHTML=IC[rm.i]||"";hd.appendChild(mk("span",null,rm.t));p.appendChild(hd);
    R.panels[rm.k]=p;R.heads[rm.k]=hd;sec.insertBefore(p,ref);});
  sec.classList.add("rm-on");
  fileAll(R);
  if(c.all)setAll(R,!!pref(pk).all,false);
  show(R,pick(R),{});
  /* a card that comes later (another part of Ingenium adds it when the page is first opened) goes to its room */
  var T=0;function soon(){if(T)return;T=setTimeout(function(){T=0;try{fileAll(R);}catch(e){warn(e);}},0);}
  try{var mo=new MutationObserver(soon);mo.observe(sec,{childList:true});R.rooms.forEach(function(rm){mo.observe(R.panels[rm.k],{childList:true});});}catch(e){}
  return R;}
function setAll(R,on,remember){R.all=!!on;R.sec.classList.toggle("rm-all",R.all);R.tl.hidden=R.all;R.says.hidden=R.all;
  if(R.ak){R.ak.querySelector("span").textContent=R.all?"Show the settings in rooms":"Show every setting at once";
    R.ak.title=R.all?"Back to one room at a time":"For those who prefer one long page";}
  R.rooms.forEach(function(rm){var p=R.panels[rm.k];
    if(R.all){p.setAttribute("role","region");p.setAttribute("aria-labelledby",R.heads[rm.k].id);p.removeAttribute("aria-describedby");}
    else{p.setAttribute("role","tabpanel");p.setAttribute("aria-labelledby",R.tabs[rm.k].id);p.setAttribute("aria-describedby",R.says.id);}});
  show(R,R.cur||pick(R),{});
  if(remember){pref(R.pk).all=R.all;keep();}}
function studioHint(R){var sec=R.sec,l=sec.querySelector(":scope > .lede");if(!l||sec.querySelector(".rm-hint"))return;
  var h=mk("p","rm-hint");h.id="rmStudioHint";h.appendChild(mk("span",null,"Make and train your own models in the Studio."));
  var k=att(mk("button","rm-key rm-star"),{type:"button"});k.id="rmStudioKey";k.innerHTML=IC.studio;k.appendChild(mk("span",null,"Open the Studio"));
  k.addEventListener("click",function(){show(R,"studio",{keep:true});if(R.cur!=="studio")return;try{scrollTo_(R.bar,"start");}catch(e){}focusQuiet(R.tabs.studio);});
  h.appendChild(k);l.parentNode.insertBefore(h,l.nextSibling);}

/* ---------- Find a setting ---------- */
function findBox(R){var w=att(mk("div","rm-find"),{role:"search"});
  var lab=att(mk("label","rm-find-lab","Find a setting"),{"for":"rmFind"});w.appendChild(lab);
  var box=mk("div","rm-find-box");box.innerHTML=IC.find;
  var inp=att(mk("input"),{type:"search",id:"rmFind",autocomplete:"off",spellcheck:"false",placeholder:"For example: backup or theme","aria-controls":"rmFindOut","enterkeyhint":"search"});
  box.appendChild(inp);w.appendChild(box);
  var say=att(mk("p","rm-sr"),{id:"rmFindSay",role:"status","aria-live":"polite"});w.appendChild(say);
  var out=mk("div","rm-out");out.id="rmFindOut";out.hidden=true;var list=att(mk("ul","rm-hits"),{"aria-label":"Settings found"});out.appendChild(list);w.appendChild(out);
  var F=R.find={inp:inp,say:say,out:out,list:list,hits:[]};var T=0;
  inp.addEventListener("input",function(){clearTimeout(T);T=setTimeout(function(){paintHits(R,inp.value);},110);});
  inp.addEventListener("keydown",function(e){if(e.key==="ArrowDown"){var b=list.querySelector(".rm-hit");if(b){e.preventDefault();b.focus();}}
    else if(e.key==="Enter"){e.preventDefault();clearTimeout(T);paintHits(R,inp.value);if(F.hits[0])goHit(R,F.hits[0]);}
    else if(e.key==="Escape"&&inp.value){e.preventDefault();inp.value="";paintHits(R,"");}});
  return w;}
function keyWords(c){var h=norm(headText(c)),out="";KEYS.forEach(function(k){if(typeof k[0]==="string"?c.id===k[0]:k[0].test(h))out+=" "+k[1];});return out;}
var ITEMS="h2,h3,h4,legend,summary,label,.sup-group-title,b,strong,button,[role='tab'],[role='radio']";
function reach(e,c){for(var n=e;n&&n!==c;n=n.parentElement){if(n.hidden)return false;var d="";try{d=getComputedStyle(n).display;}catch(_){}
    if(d==="none"&&!(n.parentElement&&n.parentElement.classList.contains("rm-shut")))return false;}return true;}
function itemTitle(e){var t=e.querySelector(".fx-sw-label,b,strong");var s=words(t&&t!==e&&words(t)?t:e);return s.length>72?s.slice(0,70).replace(/\s+\S*$/,"")+"\u2026":s;}
function search(R,q){var ws=norm(q).split(" ").filter(Boolean);if(!ws.length)return [];
  function all(t){t=norm(t);for(var i=0;i<ws.length;i++)if(t.indexOf(ws[i])<0)return false;return true;}
  var out=[],o=0;
  cardsOf(R).forEach(function(c){var head=headEl(c);if(!head)return;var ht=headText(c),p=c.parentNode,room=p&&p.getAttribute("data-room"),rm=roomDef(R,room);if(!rm)return;
    var base={card:c,room:room,roomName:rm.t,cardTitle:ht};
    function add(el,s,title,isHead){var h={};for(var k in base)h[k]=base[k];h.el=el;h.s=s;h.title=title;h.head=isHead;h.o=o++;out.push(h);}
    if(all(ht)){add(head,3,ht,true);return;}
    var its=c.querySelectorAll(ITEMS),got=[],n=0;
    for(var i=0;i<its.length&&n<3;i++){var e=its[i];if(e===head||head.contains(e))continue;
      if(got.some(function(g){return g.contains(e)||e.contains(g);}))continue;
      var t=words(e);if(!t||t.length>160||!all(t)||!reach(e,c))continue;got.push(e);add(e,2,itemTitle(e),false);n++;}
    if(n)return;
    if(all(ht+" "+keyWords(c)))add(head,1.5,ht,true);
    else if(all(c.textContent))add(head,1,ht,true);});
  out.sort(function(a,b){return b.s-a.s||a.o-b.o;});return out.slice(0,8);}
function paintHits(R,q){var F=R.find;F.list.innerHTML="";q=clean(q);var hs=q?search(R,q):[];F.hits=hs;
  if(!q){F.out.hidden=true;F.say.textContent="";return;}
  F.out.hidden=false;
  if(!hs.length){F.list.appendChild(mk("li","rm-none","Nothing found for \u201c"+q+"\u201d. Try another word, such as backup or theme."));F.say.textContent="Nothing found.";return;}
  hs.forEach(function(h,i){var li=mk("li"),b=att(mk("button","rm-hit"),{type:"button"});b.appendChild(mk("b",null,h.title));
    b.appendChild(mk("span",null,(h.head?"":h.cardTitle+" \u00b7 ")+"in "+h.roomName));
    b.addEventListener("click",function(){goHit(R,h);});
    b.addEventListener("keydown",function(e){var bs=[].slice.call(F.list.querySelectorAll(".rm-hit")),j=bs.indexOf(b);
      if(e.key==="ArrowDown"&&j<bs.length-1){e.preventDefault();bs[j+1].focus();}
      else if(e.key==="ArrowUp"){e.preventDefault();if(j>0)bs[j-1].focus();else F.inp.focus();}
      else if(e.key==="Escape"){e.preventDefault();F.out.hidden=true;F.inp.focus();}});
    li.appendChild(b);F.list.appendChild(li);});
  F.say.textContent=hs.length===1?"One setting found.":hs.length+" settings found.";}
function goHit(R,h){var F=R.find;if(F)F.out.hidden=true;
  if(!R.all)show(R,h.room,{keep:true});openFolds(h.el,true);
  var tgt=h.head?h.card:h.el;scrollTo_(tgt,h.head?"start":"center");flash(tgt);
  var f=h.card.querySelector("h2,h3")||headEl(h.card);if(f){if(!f.hasAttribute("tabindex"))f.setAttribute("tabindex","-1");f.classList.add("rm-q");focusQuiet(f);}
  if(F)F.say.textContent=h.title+", in "+h.roomName+".";}
var FT=null,FL=null;function flash(el){if(!el)return;if(FL)FL.classList.remove("rm-flash");clearTimeout(FT);el.classList.add("rm-flash");FL=el;
  FT=setTimeout(function(){el.classList.remove("rm-flash");FL=null;},2600);}

/* ---------- Support's groups fold, one open at a time ---------- */
function gtitle(g){var t=g.querySelector(":scope > .sup-group-title");return t?clean(t.textContent):"";}
function foldSup(){var rows=$("supRows");if(!rows)return;var gs=[].filter.call(rows.children,function(g){return g.classList&&g.classList.contains("sup-group");});if(gs.length<2)return;
  var want=pref("settings").sup,titles=gs.map(gtitle);if(typeof want!=="string"||(want!==""&&titles.indexOf(want)<0))want=titles[0];
  gs.forEach(function(g){var t=g.querySelector(":scope > .sup-group-title");if(!t)return;var b=t.querySelector(":scope > .rm-fold");
    if(!b){var txt=clean(t.textContent);b=att(mk("button","rm-fold"),{type:"button"});b.appendChild(mk("span",null,txt));b.insertAdjacentHTML("beforeend",CHEV);
      t.textContent="";t.appendChild(b);
      b.addEventListener("click",function(){var opening=g.classList.contains("rm-shut");pref("settings").sup=opening?gtitle(g):"";keep();foldSup();});}
    var on=gtitle(g)===want;if(g.classList.contains("rm-shut")===on)g.classList.toggle("rm-shut",!on);
    if(b.getAttribute("aria-expanded")!==(on?"true":"false"))b.setAttribute("aria-expanded",on?"true":"false");});}
function openFolds(el,details){try{var g=el.closest&&el.closest("#supRows .sup-group.rm-shut");if(g){pref("settings").sup=gtitle(g);keep();foldSup();}
  if(details){for(var d=el.closest("details:not([open])");d;d=d.parentElement&&d.parentElement.closest("details:not([open])"))d.open=true;}}catch(e){}}
function watchSup(){var rows=$("supRows");if(!rows||rows.__rm)return;rows.__rm=1;foldSup();var T=0;
  try{new MutationObserver(function(){if(T)return;T=setTimeout(function(){T=0;foldSup();},0);}).observe(rows,{childList:true});}catch(e){}}

/* ---------- Blend: four rooms over its one setup card, and a new blend in four steps ---------- */
function blendHas(R,k){if(k==="new")return true;if(k==="ready")return !!$("blPresets");
  var e=k==="houses"?$("bhBox"):k==="earlier"?$("blendEarlier"):null;return !!(e&&!e.hidden&&R.setup.contains(e));}
function tagSteps(R){var cur=0;[].forEach.call(R.setup.children,function(e){if(e.id==="blPresets"||e.id==="bhBox"||e.id==="blendEarlier")return;
    if(MINE.test(typeof e.className==="string"?e.className:""))return;
    if(e.matches("h2.sec")){var n=parseInt(clean((e.querySelector(".bl-n")||{}).textContent),10);if(n>=1&&n<=3)cur=n;}
    if(cur&&e.getAttribute("data-rm-step")!==String(cur))e.setAttribute("data-rm-step",String(cur));});}
function buildBlend(){var sec=$("page-blend");if(!sec)return null;if(sec.__rm)return sec.__rm;var grid=sec.querySelector(".bl-grid"),setup=grid&&grid.querySelector(".bl-setup");if(!setup)return null;
  var R={pk:"blend",c:CONF.blend,sec:sec,tabs:{},rooms:CONF.blend.rooms,cur:null,all:false,view:true,grid:grid,setup:setup,step:1};sec.__rm=R;P.blend=R;
  var bar=makeBar(R);afterLede(sec,bar);R.bar=bar;
  if(!grid.id)grid.id="rmP-blend";grid.setAttribute("role","tabpanel");grid.setAttribute("aria-describedby",R.says.id);
  R.rooms.forEach(function(rm){R.tabs[rm.k].setAttribute("aria-controls",grid.id);});
  /* the steps, at the top of the card, and Back and Next at the foot of each step */
  var ol=att(mk("ol","rm-steps"),{"aria-label":"The steps of a new blend"});R.stepKeys=[];
  STEPS.forEach(function(s,i){var li=mk("li"),b=att(mk("button","rm-step"),{type:"button","data-step":String(i+1)});
    b.appendChild(mk("span","rm-sr","Step "));b.appendChild(mk("i",null,String(i+1)));b.appendChild(mk("span","rm-sr",": "));b.appendChild(mk("span",null,s.t));
    var dn=mk("span","rm-sr rm-dn","");b.appendChild(dn);
    b.addEventListener("click",function(){stepGo(R,i+1,"strip");});li.appendChild(b);ol.appendChild(li);R.stepKeys.push(b);});
  var h1=setup.querySelector(":scope > h2.sec");setup.insertBefore(ol,h1||setup.firstChild);R.strip=ol;
  var nav=mk("div","rm-stepnav"),back=att(mk("button","btn ghost rm-back","Back"),{type:"button"}),hint=mk("span","rm-navhint"),next=att(mk("button","btn primary rm-next"),{type:"button"});
  back.addEventListener("click",function(){stepGo(R,Math.max(1,R.step-1),"nav");});next.addEventListener("click",function(){stepGo(R,Math.min(3,R.step+1),"nav");});
  nav.appendChild(back);nav.appendChild(hint);nav.appendChild(next);R.nav={el:nav,back:back,next:next,hint:hint};
  var note=$("blendNote");if(note&&note.parentNode===setup)setup.insertBefore(nav,note.nextSibling);else{var bh=$("bhBox"),be=$("blendEarlier");setup.insertBefore(nav,(bh&&bh.parentNode===setup?bh:null)||(be&&be.parentNode===setup?be:null));}
  tagSteps(R);sec.classList.add("rm-on");sec.setAttribute("data-rm-step","1");
  shown(R);show(R,pick(R),{});paintSteps(R);
  var T=0;function soon(){if(T)return;T=setTimeout(function(){T=0;try{tagSteps(R);shown(R);paintSteps(R);}catch(e){warn(e);}},30);}
  try{new MutationObserver(soon).observe(setup,{childList:true,attributes:true,attributeFilter:["hidden"],subtree:true});
    var out=$("blendOut");if(out)new MutationObserver(soon).observe(out,{childList:true});}catch(e){}
  setup.addEventListener("input",soon);setup.addEventListener("change",soon);
  /* an earlier blend pressed: on a narrow screen its answers are below the list, so they are brought into view */
  setup.addEventListener("click",function(e){var k=e.target&&e.target.closest&&e.target.closest(".bl-earl");if(!k)return;
    setTimeout(function(){try{var cols=getComputedStyle(grid).gridTemplateColumns.split(" ").length,o=$("blendOut");if(cols<2&&o)scrollTo_(o,"start");}catch(_){}},60);});
  return R;}
function blendShow(R,k){R.grid.setAttribute("aria-labelledby",R.tabs[k].id);
  if(k==="earlier"){var d=$("blendEarlier");if(d&&!d.open)d.open=true;}
  if(k==="houses"){var h=$("bhBox");if(h&&!h.open)h.open=true;}}
function stepState(R){var s=R.setup,t=$("blendTask");return [false,s.querySelectorAll("#blendPick input:checked").length>=2,!!s.querySelector("#blendStrats .blend-strat.on"),
  !!(t&&clean(t.value)),!!D.querySelector("#blendOut .bl-card")];}
function paintSteps(R){if(!R.stepKeys)return;var st=stepState(R);
  R.stepKeys.forEach(function(b,i){var n=i+1,now=n===R.step,done=st[n]&&!now;
    if(now)b.setAttribute("aria-current","step");else b.removeAttribute("aria-current");b.classList.toggle("rm-done",done);
    var dn=b.querySelector(".rm-dn");if(dn&&dn.textContent!==(done?", done":""))dn.textContent=done?", done":"";});
  var N=R.nav;if(!N)return;N.back.hidden=R.step<=1;N.next.hidden=R.step>=3;if(R.step<3)N.next.textContent=STEPS[R.step-1].next;
  /* (with fewer than two models on the device, the list itself says to add them on the Models page) */
  var few=(W.state&&Array.isArray(W.state.models)?W.state.models.length:2)<2,hn=R.step===1&&!st[1]&&!few?"Choose at least two models to blend.":"";
  if(N.hint.textContent!==hn)N.hint.textContent=hn;}
function stepGo(R,n,how){if(n===4){answers(R,how);return;}
  if(R.cur!=="new")show(R,"new",{keep:!!how});R.step=n;R.sec.setAttribute("data-rm-step",String(n));paintSteps(R);
  if(how==="nav"){var h=R.setup.querySelector(':scope > h2.sec[data-rm-step="'+n+'"]');if(h){if(!h.hasAttribute("tabindex"))h.setAttribute("tabindex","-1");focusQuiet(h);}
    try{if(R.setup.getBoundingClientRect().top<60)scrollTo_(R.setup,"start");}catch(e){}}}
function answers(R,how){if(R.cur!=="new"&&R.cur!=="earlier")show(R,"new",{keep:!!how});var o=$("blendOut");if(!o)return;
  if(!o.hasAttribute("tabindex"))o.setAttribute("tabindex","-1");scrollTo_(o,"start");flash(o);focusQuiet(o);}

/* ---------- where an element is, and opening its room ---------- */
function blendWhere(R,el){if(el.closest("#blPresets"))return {k:"ready"};if(el.closest("#bhBox"))return {k:"houses"};if(el.closest("#blendEarlier"))return {k:"earlier"};
  var s=el.closest("[data-rm-step]");if(s&&s.parentNode===R.setup)return {k:"new",step:+s.getAttribute("data-rm-step")};
  if(el.closest("#blendOut"))return {k:R.cur==="earlier"?"earlier":"new"};return null;}
function where(el){if(!el||el.nodeType!==1||!el.closest)return null;var sec=el.closest("#page-settings,#page-models,#page-blend");if(!sec||!sec.__rm)return null;var R=sec.__rm,w;
  if(R.view)w=blendWhere(R,el);else{var p=el.closest(".rm-panel");w=p&&p.parentNode===sec?{k:p.getAttribute("data-room")}:null;}
  if(w)w.R=R;return w;}
/* quietly, for scrollIntoView, focus, the tour's ring and Help's Show me: the room opens, and nothing else changes */
function autoReveal(el){var w=where(el);if(!w)return null;var R=w.R;
  if(!R.all&&w.k!==R.cur&&R.tabs[w.k]&&!R.tabs[w.k].hidden)show(R,w.k,{});
  if(R.view&&w.k==="new"&&w.step&&w.step!==R.step)stepGo(R,w.step,"");
  openFolds(el,false);return w.k;}
function reveal(el,o){o=o||{};var w=where(el);if(!w)return null;var R=w.R;
  if(activePage()!==R.pk){try{W.go(R.pk);}catch(e){}}
  if(!R.all&&w.k!==R.cur)show(R,w.k,{keep:!!o.keep});if(R.view&&w.k==="new"&&w.step&&w.step!==R.step)stepGo(R,w.step,"");
  openFolds(el,true);if(o.scroll!==false)scrollTo_(el,o.block||"start");if(o.flash)flash(el);return w.k;}
function revealSel(sel){String(sel||"").split(/\s*,\s*/).some(function(q){var n=null;try{n=D.querySelector(q);}catch(e){}if(n&&where(n)){autoReveal(n);return true;}return false;});}

/* the browser's own scrollIntoView and focus, and Chromium's scrollIntoViewIfNeeded: a card in a closed room opens its
   room first. Only elements inside these three pages are looked at (one closest() each), so it costs next to nothing. */
(function wrap(){try{var EP=Element.prototype;if(!EP.scrollIntoView.__r173){var nS=function(){try{autoReveal(this);}catch(e){}return oSIV.apply(this,arguments);};nS.__r173=1;EP.scrollIntoView=nS;}
  var oIf=EP.scrollIntoViewIfNeeded;if(typeof oIf==="function"&&!oIf.__r173){var nI=function(){try{autoReveal(this);}catch(e){}return oIf.apply(this,arguments);};nI.__r173=1;EP.scrollIntoViewIfNeeded=nI;}
  var HP=HTMLElement.prototype;if(!HP.focus.__r173){var nF=function(){try{if(this.isConnected)autoReveal(this);}catch(e){}return oFocus.apply(this,arguments);};nF.__r173=1;HP.focus=nF;}}catch(e){warn(e);}})();
/* the guided tour rings an element: its room opens before the ring looks for it */
function wrapTour(){var o=W.tourRing;if(typeof o!=="function"||o.__r173)return;
  var n=function(sel){try{var s=Array.isArray(sel)?sel:[sel];for(var i=0;i<s.length;i++){var e=null;try{e=D.querySelector(s[i]);}catch(_){}if(e&&where(e)){autoReveal(e);break;}}}catch(e){}return o.apply(this,arguments);};
  n.__r173=1;try{Object.keys(o).forEach(function(k){n[k]=o[k];});}catch(e){}W.tourRing=n;}
/* and each of the tour's pages that rings something: its room opens as the page is turned to, before the ring is drawn */
function wrapSteps(){var T=null;try{T=typeof ING_TOUR!=="undefined"?ING_TOUR:null;}catch(e){}if(!Array.isArray(T))return;
  T.forEach(function(s){if(!s||!s.ring||typeof s.go!=="function"||s.go.__r173)return;var g=s.go,rs=Array.isArray(s.ring)?s.ring:[s.ring];
    var n=function(){var r=g.apply(this,arguments);try{revealSel(rs.join(","));}catch(e){}return r;};n.__r173=1;s.go=n;});}
/* Help's Show me: the room of what it shows opens before Help looks for it; and Help's Models page points to the Studio */
function helpHooks(){var H=W.IngHelp;try{var m=H&&H.pages&&H.pages.models;if(m&&Array.isArray(m.dos)&&!m.dos.some(function(d){return d[2]==="#trainCard";}))
  m.dos.push(["Make and train your own model","The Studio trains a model on your own text.","#trainCard"]);}catch(e){}}
D.addEventListener("click",function(e){try{var b=e.target&&e.target.closest&&e.target.closest("#ihPanel button");if(!b||!b.querySelector(".ih-show"))return;
  var H=W.IngHelp;if(!H||!H.pages)return;var lab=b.getAttribute("aria-label")||"",ks=[H.page&&H.page()].concat(Object.keys(H.pages));
  for(var j=0;j<ks.length;j++){var pg=H.pages[ks[j]];if(!pg||!pg.dos)continue;for(var i=0;i<pg.dos.length;i++)if(lab.indexOf(pg.dos[i][0]+".")===0){revealSel(pg.dos[i][2]);return;}}}catch(err){}},true);
/* Home's Bring in a model, and its next step when that leads to Models: the room that holds Add a model */
D.addEventListener("click",function(e){var b=e.target&&e.target.closest&&e.target.closest("#hxModelsKey,#heroNext");if(!b)return;
  setTimeout(function(){var R=P.models;if(R&&activePage()==="models"&&R.tabs.yours&&!R.tabs.yours.hidden)show(R,"yours",{});},0);},true);

/* ---------- arriving on a page: the room last chosen there ---------- */
function build(pk){try{return pk==="blend"?buildBlend():buildMove(pk);}catch(e){warn(e);return null;}}
function arrive(pk){var R=P[pk]||build(pk);if(!R)return;try{if(R.view){tagSteps(R);shown(R);paintSteps(R);}else fileAll(R);if(pk==="settings")watchSup();show(R,pick(R),{});}catch(e){warn(e);}}
function wrapGo(){var og=W.go;if(typeof og!=="function"||og.__r173)return;
  var ng=function(p){var was=activePage(),r=og.apply(this,arguments);try{if(CONF[p]&&p!==was)arrive(p);}catch(e){warn(e);}return r;};
  try{Object.keys(og).forEach(function(k){ng[k]=og[k];});}catch(e){}ng.__r173=true;W.go=ng;}

function boot(){["settings","models","blend"].forEach(build);watchSup();wrapGo();wrapTour();wrapSteps();helpHooks();
  var a=activePage();if(CONF[a])arrive(a);}
try{boot();}catch(e){warn(e);}
if(D.readyState==="loading")D.addEventListener("DOMContentLoaded",function(){try{boot();}catch(e){warn(e);}});
(function later(){var n=0;(function wait(){if(W.__ingReady===true){try{boot();["settings","models","blend"].forEach(function(pk){var R=P[pk];if(R){if(R.view)shown(R);else fileAll(R);}});}catch(e){warn(e);}return;}
  if(++n<400)setTimeout(wait,500);})();})();

W.IngRooms={version:1,
  /* opened by other code (Help, the tour, a key elsewhere): the room the person chose last stays the one kept, unless
     the caller says this was the person's own choice (remember) */
  open:function(pk,k,remember){var R=P[pk]||build(pk);if(!R)return false;if(activePage()!==pk){try{W.go(pk);}catch(e){}}
    if(!R.tabs[k]||R.tabs[k].hidden)return false;show(R,k,{keep:!!remember});return true;},
  reveal:function(el,o){return reveal(el,o);},
  roomOf:function(el){var w=where(el);return w?w.k:null;},
  current:function(pk){var R=P[pk];return R?R.cur:null;},
  rooms:function(pk){var R=P[pk];return R?R.rooms.map(function(rm){return {key:rm.k,name:rm.t,says:rm.says,shown:!R.tabs[rm.k].hidden};}):[];},
  cards:function(pk){var R=P[pk];return R?cardsOf(R):[];},
  step:function(n){var R=P.blend;if(!R)return 0;if(n)stepGo(R,n,"api");return R.step;},
  all:function(on){var R=P.settings;if(!R)return false;if(on!=null)setAll(R,!!on,true);return R.all;},
  find:function(q){var R=P.settings;return R?search(R,q).map(function(h){return {title:h.title,room:h.room,card:h.card.id||h.cardTitle,go:function(){goHit(R,h);}};}):[];}};
})();
;try{window.__ingParts["p94"]="running";}catch(_){}
</script>
