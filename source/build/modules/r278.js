<style id="r278-css">
/* ============ R278 · SETTINGS AS ONE CONSOLE, EVERY CARD IN ONE ANATOMY (Ingenium 6.84, 12 November 2026) ============
   Her words (11 November 2026): "all of those lone buttons from the Settings page, the tabs could the entire Setting page could use a
   better organising and a slight redesign to keep things looking tidy and cohesive to match the rest of Ingenium"; on the preview,
   after three rounds ("I don't like it. It looks exactly the same with the smooth effect and it looks slow and rigid ... the drop down
   menus are out of template with the rest of the app"): "I approve of the preview, please push it everywhere."
   Drawn in the app's own surfaces only (the preview measured them from the built page): the app's card, the app's keys (a crisp edge,
   up 2 px under the pointer in 0.16 s, down 1 px when pressed), the app's own list for a longer choice (modules/r172.js); nothing tilts.
   - One console: Find a setting with Show every setting at once beside it, the room keys, and under them the room's line, or, in
     Models and AI and in Your data, the section keys and the section's line. Before, these were three loose rows and a key far off.
   - Every card: its title with a small icon, then each setting as a row, its name on the left and its control on the right.
   - Theme and Motion: three pills each, the chosen one filled violet, as Effort is in the top bar's menu. A longer choice keeps the
     app's own list, its face a key at the row's end.
   - A setting that was a checkbox is a switch, as Keep working's is; Sounds is a switch.
   - Help's three levels side by side.
   The cards are not moved and nothing is copied: every id, every select and every handler stays where it was (the pills and the
   switch set the select or press the key that was there). Find a setting, Help's Show me and the tour find what they found before. */
#setConsole{position:relative;margin:6px 0 18px;padding:14px 16px 0;border:0.5px solid var(--hairline);border-radius:14px;
  background:linear-gradient(180deg,var(--card-hi),var(--card));
  box-shadow:inset 0 1px 0 rgba(255,255,255,.58),0 1px 0 rgba(40,20,70,.05),0 8px 18px rgba(40,20,70,.06)}
body[data-theme="night"] #setConsole{box-shadow:inset 0 1px 0 rgba(255,255,255,.05),0 1px 0 rgba(0,0,0,.4),0 8px 18px rgba(0,0,0,.34)}
#setConsole #rmBar-settings{margin:0}
#setConsole .rm-find{display:flex;flex-wrap:wrap;align-items:center;gap:10px;margin:0}
#setConsole .rm-find-lab{position:absolute !important;width:1px !important;height:1px !important;overflow:hidden !important;clip:rect(0 0 0 0) !important;white-space:nowrap !important}
#setConsole .rm-find-box{flex:1 1 260px;min-width:0;margin:0}
#setConsole .rm-find .rm-out{flex:1 0 100%}
#setConsole .rm-allkey{margin-left:0}
#setConsole .rm-row{margin-top:12px}
#setConsole .rm-tabs{padding-bottom:14px}
#setTier{margin:0 -16px;padding:11px 16px 13px;border-top:0.5px solid var(--hairline);border-radius:0 0 14px 14px;background:var(--rm-wellbg,rgba(34,26,46,.035));
  display:flex;flex-wrap:wrap;align-items:center;gap:10px 16px;min-height:52px}
#setTier:empty{display:none}
#setTier .rm-says,#setTier .dx-says{margin:0;flex:1 1 300px;min-width:0;font-size:13px;line-height:1.5;color:var(--ink-2);max-width:72ch}
#setTier .dx-bar{margin:0;flex:0 1 auto}
#setTier .dx-bar,#setTier .dx-says{display:none}
#setConsole[data-room="ai"] #dxB-ai,#setConsole[data-room="data"] #dxB-data{display:flex}
#setConsole[data-room="ai"] #dxSays-ai,#setConsole[data-room="data"] #dxSays-data{display:block}
#setConsole[data-room="ai"] #rmSays-settings,#setConsole[data-room="data"] #rmSays-settings{display:none}
#page-settings.rm-all #setTier .dx-bar,#page-settings.rm-all #setTier .dx-says{display:none !important}
#page-settings.rm-all #setTier .rm-says{display:none}
#page-settings.rm-all #setTier{display:none}
#page-settings.rm-all #setConsole .rm-row{padding-bottom:2px}
/* the card's title with its icon */
#page-settings .card h2.sec .st-ic{display:inline-grid;place-items:center;width:28px;height:28px;margin:-3px 9px 0 0;vertical-align:middle;border-radius:8px;
  background:rgba(106,63,181,.10);color:var(--accent);flex:0 0 auto}
body[data-theme="night"] #page-settings .card h2.sec .st-ic{background:rgba(183,156,230,.14)}
#page-settings .card h2.sec .st-ic svg{width:15px;height:15px;stroke:currentColor;fill:none;stroke-width:1.8;stroke-linecap:round;stroke-linejoin:round}
/* a choice as a row: its name on the left, its control at the row's end */
#page-settings label.field.st-row{display:flex;align-items:center;justify-content:space-between;gap:8px 14px;flex-wrap:wrap;padding:10px 0;margin:0;border-top:0.5px solid var(--hairline)}
#page-settings label.field.st-row > span:first-child{flex:1 1 200px;min-width:0;font-weight:600;color:var(--ink-1);font-size:13px}
#page-settings label.field.st-row .r172-cb{width:auto !important;min-width:150px;max-width:100%;flex:0 1 auto}
#page-settings .ps-grid{display:block}
/* pills: the app's own (Effort's) */
.st-pills{display:flex;flex-wrap:wrap;gap:6px;justify-content:flex-end}
.st-pill{display:inline-flex;align-items:center;min-height:28px;padding:5px 13px;border-radius:999px;border:1px solid var(--hairline);cursor:pointer;
  background:linear-gradient(180deg,var(--card-hi),var(--card-lo,var(--card)));box-shadow:var(--pop);color:var(--ink-2);font:600 12.5px/1.2 var(--sans);
  -webkit-tap-highlight-color:transparent;touch-action:manipulation;transition:transform .16s var(--spring),box-shadow .16s ease,color .15s}
.st-pill:hover{transform:translateY(-2px);box-shadow:var(--pop-hi,var(--pop));color:var(--ink-1)}
.st-pill:active{transform:translateY(1px);transition-duration:.06s}
.st-pill[aria-checked="true"]{color:#fff;background:linear-gradient(180deg,var(--rm-pa,#7348be),var(--rm-pb,#5d37a1));border-color:var(--rm-pedge,#4b2a86);box-shadow:var(--rm-psh);text-shadow:0 1px 1px rgba(30,10,60,.32)}
.st-pill:focus-visible,.st-sw:focus-visible{outline:2.5px solid var(--rm-focus,var(--accent));outline-offset:3px}
#page-settings label.field.st-pilled .r172-cb{display:none !important}
/* switches: the app's own (Keep working's), for every checkbox that was a box */
#page-settings label.fx-sw,#page-settings label.ps-sw{display:flex;flex-direction:row-reverse;align-items:center;justify-content:space-between;gap:14px;cursor:pointer}
#page-settings .ps-switches{display:flex;flex-direction:column;gap:0;margin:8px 0 6px}
#page-settings label.ps-sw{padding:10px 0;border-top:0.5px solid var(--hairline);font-size:13px;font-weight:600;color:var(--ink-1)}
#page-settings label.fx-sw input[type=checkbox],#page-settings label.ps-sw input[type=checkbox]{-webkit-appearance:none;appearance:none;position:relative;flex:0 0 auto;
  width:40px;height:23px;margin:0;border:0;border-radius:999px;background:rgba(120,105,150,.4);box-shadow:inset 0 1px 3px rgba(40,20,70,.22);cursor:pointer;transition:background .15s ease}
#page-settings label.fx-sw input[type=checkbox]::before,#page-settings label.ps-sw input[type=checkbox]::before{content:"";position:absolute;left:3px;top:3px;width:17px;height:17px;border-radius:50%;
  background:#fff;box-shadow:0 1px 3px rgba(40,20,70,.4);transition:transform .16s var(--spring)}
#page-settings label.fx-sw input[type=checkbox]:checked,#page-settings label.ps-sw input[type=checkbox]:checked{background:var(--accent)}
#page-settings label.fx-sw input[type=checkbox]:checked::before,#page-settings label.ps-sw input[type=checkbox]:checked::before{transform:translateX(17px)}
#page-settings label.fx-sw input[type=checkbox]:focus-visible,#page-settings label.ps-sw input[type=checkbox]:focus-visible{outline:2.5px solid var(--rm-focus,var(--accent));outline-offset:3px}
/* Sounds: a switch in place of On and Off (the keys stay, unseen, and are pressed for it) */
.st-sw{position:relative;display:inline-block;width:40px;height:23px;flex:0 0 auto;padding:0;border:0;border-radius:999px;cursor:pointer;background:rgba(120,105,150,.4);
  box-shadow:inset 0 1px 3px rgba(40,20,70,.22);transition:background .15s ease;-webkit-tap-highlight-color:transparent}
.st-sw::before{content:"";position:absolute;left:3px;top:3px;width:17px;height:17px;border-radius:50%;background:#fff;box-shadow:0 1px 3px rgba(40,20,70,.4);transition:transform .16s var(--spring)}
.st-sw[aria-checked="true"]{background:var(--accent)}
.st-sw[aria-checked="true"]::before{transform:translateX(17px)}
#ingSoundCard .snd-row.st-sndrow{justify-content:space-between}
#ingSoundCard .snd-row.st-sndrow .seg{display:none !important}
/* Help's three levels side by side, the card across both columns of Everyday */
@media (min-width:1100px){#page-settings:not(.rm-all) #rmP-settings-everyday.dx-two > #ihSetCard{column-span:all;-webkit-column-span:all}}
#ihSetCard .ih-lv{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:10px}
#ihSetCard .ih-lv .ih-lvk{width:auto;max-width:none;margin:0}
@media (max-width:760px){#ihSetCard .ih-lv{grid-template-columns:1fr}#setConsole .rm-tabs{flex-wrap:nowrap;overflow-x:auto;scrollbar-width:none;padding:2px 2px 16px}#setConsole .rm-tabs::-webkit-scrollbar{display:none}
  #page-settings label.field.st-row .r172-cb{min-width:0}}
@media (prefers-reduced-motion:reduce){.st-pill,.st-sw::before{transition:none}}
</style>
<script>try{(window.__ingParts=window.__ingParts||{})["p278"]="started";}catch(_){}
(function(){"use strict";var W=window,D=document;
function $(id){return D.getElementById(id);}
function mk(t,c){var e=D.createElement(t);if(c)e.className=c;return e;}
function svg(d){return '<svg viewBox="0 0 24 24" aria-hidden="true">'+d+'</svg>';}
/* ---------- the icons of the cards (the same line icons as the room and section keys) ---------- */
var IC={
  look:'<circle cx="12" cy="12" r="8.5"/><path d="M12 3.5v17"/>',
  sound:'<path d="M4 9.5v5h3.5L12 18.5v-13L7.5 9.5z"/><path d="M15.5 9a4.2 4.2 0 0 1 0 6M18 6.5a7.6 7.6 0 0 1 0 11"/>',
  help:'<circle cx="12" cy="12" r="8.5"/><path d="M9.6 9.5a2.4 2.4 0 1 1 3.4 2.2c-.7.4-1 .9-1 1.8M12 16.5h.01"/>',
  calm:'<path d="M5 19.5c0-8.4 5.2-13.6 14.5-14.5-.9 9.3-6.1 14.5-14.5 14.5z"/><path d="M5 19.5l7.5-7.5"/>',
  you:'<circle cx="12" cy="8.5" r="3.5"/><path d="M5 20c1.2-3.6 3.9-5.5 7-5.5s5.8 1.9 7 5.5"/>',
  conn:'<path d="M9 3.5v4M15 3.5v4"/><path d="M6.5 7.5h11v3a5.5 5.5 0 0 1-11 0z"/><path d="M12 16v4.5"/>',
  tools:'<path d="M14.5 6.5a3.5 3.5 0 0 0 4.3 4.3l-8 8a1.9 1.9 0 0 1-2.7-2.7l8-8a3.5 3.5 0 0 0-1.6-1.6z"/>',
  eyes:'<path d="M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6z"/><circle cx="12" cy="12" r="3"/>',
  ears:'<path d="M12 3.5a4 4 0 0 1 4 4v5a4 4 0 0 1-8 0v-5a4 4 0 0 1 4-4z"/><path d="M5.5 12.5a6.5 6.5 0 0 0 13 0M12 19v2.5"/>',
  web:'<circle cx="12" cy="12" r="8.5"/><path d="M3.5 12h17M12 3.5c3 3 3 14 0 17M12 3.5c-3 3-3 14 0 17"/>',
  devices:'<rect x="2.8" y="4.5" width="13" height="9.5" rx="1.6"/><path d="M6 17.5h6.5"/><rect x="16.8" y="8" width="4.4" height="9.5" rx="1.2"/>',
  awake:'<path d="M12 3.5v2M4.6 7.1l1.4 1.4M19.4 7.1L18 8.5"/><path d="M6 17.5a6 6 0 1 1 12 0z"/><path d="M4 20.5h16"/>',
  in:'<path d="M12 4v11"/><path d="M7.5 10.5L12 15l4.5-4.5"/><path d="M4.5 19.5h15"/>',
  mem:'<path d="M12 4.5c-3.6 0-6.5 2.6-6.5 6 0 2.2 1.2 3.9 3 4.9V19h7v-3.6c1.8-1 3-2.7 3-4.9 0-3.4-2.9-6-6.5-6z"/><path d="M10 10.5h4M12 8.5v4"/>',
  box:'<rect x="3.5" y="4" width="17" height="5" rx="1.5"/><path d="M5 9v9.5A1.5 1.5 0 0 0 6.5 20h11a1.5 1.5 0 0 0 1.5-1.5V9"/><path d="M10 13h4"/>',
  cloud:'<path d="M7 18.5h10a4 4 0 0 0 .6-7.96A5.5 5.5 0 0 0 7.1 9.6 4.5 4.5 0 0 0 7 18.5z"/><path d="M12 15.5v-4M10 13.5l2-2 2 2"/>',
  store:'<path d="M4 7.5h16v9H4z"/><path d="M7.5 12h.01M11 12h6"/>',
  lock:'<rect x="5" y="10.5" width="14" height="10" rx="2"/><path d="M8.5 10.5V7.8a3.5 3.5 0 0 1 7 0v2.7"/>',
  own:'<circle cx="8" cy="15.5" r="4"/><path d="M11 12.5l8.5-8.5M16.2 7.3l2.4 2.4M13.8 9.7l1.8 1.8"/>',
  author:'<path d="M12 19l7-7 3 3-7 7-3-3z"/><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/><path d="M2 2l7.586 7.586"/><circle cx="11" cy="11" r="2"/>',
  card:'<rect x="4" y="5" width="16" height="14" rx="2"/><path d="M8 10h8M8 14h5"/>'};
/* a card's icon: by its id, then by the words of its title */
var BYID={ingSoundCard:"sound",ihSetCard:"help",supCard:"calm",personaCard:"you",cnCard:"tools",ingEyesCard:"eyes",ingEarsCard:"ears",awakeCard:"awake",linkCard:"devices",
  ingImportCard:"in",memRoomCard:"mem",bkCard:"box",cloudCard:"cloud",stxCard:"store",ingLockCard:"lock",ingPermitCard:"own",ragCard:"find"};
IC.find='<circle cx="11" cy="11" r="6.5"/><path d="M20 20l-4.3-4.3"/>';
var BYWORD=[[/^look and feel/i,"look"],[/^connect a cloud/i,"conn"],[/^web search/i,"web"],[/^data on this device/i,"box"],[/author studio/i,"author"],[/memory/i,"mem"],[/^ownership/i,"own"]];
function iconFor(c,h){var k=BYID[c.id];if(!k){var t=(h.textContent||"").trim();for(var i=0;i<BYWORD.length;i++)if(BYWORD[i][0].test(t)){k=BYWORD[i][1];break;}}return IC[k||"card"];}
function icons(){var pg=$("page-settings");if(!pg)return;[].forEach.call(pg.querySelectorAll(".card > h2.sec"),function(h){if(h.querySelector(":scope > .st-ic"))return;
  var s=mk("span","st-ic");s.setAttribute("aria-hidden","true");s.innerHTML=svg(iconFor(h.parentNode,h));h.insertBefore(s,h.firstChild);});}
/* ---------- the console ---------- */
function room(){var t=D.querySelector('#rmTabs-settings .rm-tab[aria-selected="true"]');return t?t.getAttribute("data-room"):"";}
function consoleUp(){var pg=$("page-settings"),bar=$("rmBar-settings");if(!pg||!bar)return false;
  var sc=$("setConsole");if(!sc){sc=mk("div");sc.id="setConsole";sc.setAttribute("data-rm-skip","");sc.setAttribute("role","group");sc.setAttribute("aria-label","Find a setting and choose a room");bar.parentNode.insertBefore(sc,bar);sc.appendChild(bar);
    var tier=mk("div");tier.id="setTier";sc.appendChild(tier);
    try{new MutationObserver(function(){mark();}).observe($("rmTabs-settings")||bar,{attributes:true,subtree:true,attributeFilter:["aria-selected"]});}catch(e){}}
  else if(bar.parentNode!==sc)sc.insertBefore(bar,sc.firstChild);
  var tier=$("setTier"),find=bar.querySelector(".rm-find"),all=$("rmAll-settings");
  if(find&&all&&all.parentNode!==find){var out=$("rmFindOut");if(out&&out.parentNode===find)find.insertBefore(all,out);else find.appendChild(all);}
  var inp=$("rmFind");if(inp&&!inp.__r278){inp.__r278=1;inp.placeholder="Find a setting: backup, theme, sound, memory";}
  var says=$("rmSays-settings");if(says&&says.parentNode!==tier)tier.appendChild(says);
  ["ai","data"].forEach(function(r){var b=$("dxB-"+r),s=$("dxSays-"+r);if(b&&b.parentNode!==tier)tier.insertBefore(b,says&&says.parentNode===tier?says:null);if(s&&s.parentNode!==tier)tier.insertBefore(s,says&&says.parentNode===tier?says:null);});
  mark();return true;}
function mark(){var sc=$("setConsole");if(!sc)return;var r=room();if(sc.getAttribute("data-room")!==r)sc.setAttribute("data-room",r);}
/* ---------- a choice as a row; Theme and Motion as pills ---------- */
var PILLS={setTheme:1,setMotion:1};
function rows(){var pg=$("page-settings");if(!pg)return;
  [].forEach.call(pg.querySelectorAll("label.field"),function(l){var s=l.querySelector("select");if(!s||l.classList.contains("st-row"))return;if(l.closest(".stx-lin,.bk-field"))return;l.classList.add("st-row");});
  Object.keys(PILLS).forEach(function(id){var s=$(id);if(!s||s.__r278)return;var l=s.closest("label.field");if(!l)return;s.__r278=1;
    var g=mk("div","st-pills");g.setAttribute("role","radiogroup");var lab=l.querySelector(":scope > span");g.setAttribute("aria-label",lab?lab.childNodes[0].textContent.trim():id);
    [].forEach.call(s.options,function(o){var b=mk("button","st-pill");b.type="button";b.setAttribute("role","radio");b.setAttribute("data-v",o.value);b.textContent=o.textContent;
      b.addEventListener("click",function(e){e.preventDefault();if(s.value===o.value)return;s.value=o.value;try{s.dispatchEvent(new Event("input",{bubbles:true}));}catch(x){}
        try{s.dispatchEvent(new Event("change",{bubbles:true}));}catch(x){}sync(s,g);});g.appendChild(b);});
    g.addEventListener("keydown",function(e){var k=e.key;if(k!=="ArrowLeft"&&k!=="ArrowRight")return;e.preventDefault();var bs=[].slice.call(g.children),i=bs.indexOf(D.activeElement);if(i<0)return;var j=(i+(k==="ArrowRight"?1:-1)+bs.length)%bs.length;bs[j].click();bs[j].focus();});
    l.appendChild(g);l.classList.add("st-pilled");sync(s,g);
    s.addEventListener("change",function(){sync(s,g);});
    var v=l.querySelector("r172-v");if(v)try{new MutationObserver(function(){sync(s,g);}).observe(v,{childList:true,characterData:true,subtree:true});}catch(x){}});}
function sync(s,g){[].forEach.call(g.children,function(b){var on=b.getAttribute("data-v")===s.value;if(b.getAttribute("aria-checked")!==(on?"true":"false"))b.setAttribute("aria-checked",on?"true":"false");b.tabIndex=on?0:-1;});}
/* ---------- Sounds as a switch ---------- */
function soundSwitch(){var seg=$("setSndOn");if(!seg||seg.__r278)return;var row=seg.closest(".snd-row");if(!row)return;seg.__r278=1;
  var on=seg.querySelector('[data-snd-on="1"]'),off=seg.querySelector('[data-snd-on="0"]');if(!on||!off)return;
  var sw=mk("button","st-sw");sw.type="button";sw.id="setSndSw";sw.setAttribute("role","switch");sw.setAttribute("aria-labelledby","setSndOnL");
  function put(){var v=on.getAttribute("aria-pressed")==="true";if(sw.getAttribute("aria-checked")!==(v?"true":"false"))sw.setAttribute("aria-checked",v?"true":"false");}
  sw.addEventListener("click",function(){(sw.getAttribute("aria-checked")==="true"?off:on).click();put();});
  row.appendChild(sw);row.classList.add("st-sndrow");put();
  try{new MutationObserver(put).observe(seg,{attributes:true,subtree:true,attributeFilter:["aria-pressed"]});}catch(e){}}
/* ---------- start, and whenever Settings is opened ---------- */
function apply(){try{consoleUp();}catch(e){}try{icons();}catch(e){}try{rows();}catch(e){}try{soundSwitch();}catch(e){}}
if(D.readyState==="loading")D.addEventListener("DOMContentLoaded",apply);else apply();
(function later(){var n=0;(function wait(){apply();if(W.__ingReady===true){setTimeout(apply,700);setTimeout(apply,2500);return;}if(++n<400)setTimeout(wait,500);})();})();
(function wrapGo(){var og=W.go;if(typeof og!=="function"||og.__r278)return;var ng=function(p){var r=og.apply(this,arguments);try{if(p==="settings")apply();}catch(e){}return r;};
  try{Object.keys(og).forEach(function(k){ng[k]=og[k];});}catch(e){}ng.__r278=true;W.go=ng;try{go=ng;}catch(e){}})();
/* a room chosen: its cards get their icon and rows (a card made later is met here, at Settings' opening and at the first starts above;
   nothing watches the page itself, so a card that redraws itself, as Storage's does, is never drawn again for it) */
(function rooms(){var t=$("rmTabs-settings");if(!t){setTimeout(rooms,800);return;}
  try{new MutationObserver(function(){apply();}).observe(t,{attributes:true,subtree:true,attributeFilter:["aria-selected"]});}catch(e){}})();
W.IngSettingsLook={apply:apply,room:room};
try{window.__ingParts["p278"]="running";}catch(_){}
})();
</script>
