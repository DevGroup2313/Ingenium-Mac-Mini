<style id="r343-css">
/* ============ R343 · PURPLE WORDS THAT CAN BE PRESSED ARE UNDERLINED (Ingenium 7.53, 20 November 2026) ============
   Her words (20 November 2026): "On thing that annoys me is the purple clickable word buttons on Ingenium that do not have an
   underline, they look naked without being underlined when they are in purple and are clearly supposed to be clickable especially from
   your last preview and the rest of the app." Kept as her rule: purple words that can be pressed are underlined.
   Found by a scan of every page and each of its rooms, by day and by night, on 7.52's release page (elements one can press, drawn as
   purple words with no fill, no border and no shadow, and no underline), by walking the guided tour, and by the rules that paint such
   keys violet over no fill: Lector's quiet keys, its compare toggle and "Why this model"; Fabrica's quiet keys, its crumbs, "more"
   under Needs you and its GitHub "more"; Home's quiet keys ("See all"); Vocatio's quiet keys ("Another side of me", "Someone else");
   Folders' crumb key; the composer's own lines under a chat (r245); the long message's "Show the whole message"; the folder search's
   citations; Adamas's "Hide" and "Show"; the disclosures "Thinking" and the preview's own; the Security question's quiet key.
   Left as they are, on purpose: keys with a fill, a border or a shadow; the strips' choices (Lector's "A job", Fabrica's "Ship": the
   segments of a strip, not words); the active row of the left menu; the tour's chapter rows (only their number is violet).
   Only the underline is added: a thin line in the word's own colour, a little below it; each part keeps its colour, weight, size and
   its motion under the pointer. */
#lx7 .l-btn.quiet,#lx7 .l-cmp-h .l-cmp-tg,#lx7 .l-model summary,
#fb .f-btn.quiet,#fb .h-crumbs button,#fb .r298-needs .r298-more,#fb .f-gh-more summary,
.hx-btn.quiet,#cs .c-btn.quiet,#page-folders .fld-crumbk,.cmp-last button,.cmp-foot button,
#chatScroll .msg-act.msg-long-btn,.msg .md a.rag-cite,#hideEditor,#showEditor,.ps-prev summary,.bl-think summary,#secAsk .sc-key.quiet{
  text-decoration-line:underline;text-decoration-style:solid;text-decoration-color:currentColor;text-decoration-thickness:1px;text-underline-offset:3px}
/* 7.56 (20 November 2026): the keys the list above does not name. A scan of 7.55's release page, every page by day and by night, still
   found purple word keys without their line: "Take the guided tour", the model names on the Models page, and disclosures such as "About
   this model". So each key or link drawn as bare purple words (no fill, border or shadow of its own, nor on its ::before, ::after or
   children) and not underlined by the list is given .ing-ul as it is drawn, before the page is painted (the script below), and looked at
   again when the theme changes, so a key added later has its line too. The same line as the list's, and nothing else: no colour, size,
   weight or motion changes. The same parts as the list are left as they are: keys with a face, the strips' choices and tabs (they say
   they are pressed or chosen), menus and their rows, chips, the left menu. The line holds against a part's own "no underline". */
.ing-ul{text-decoration-line:underline!important;text-decoration-style:solid!important;text-decoration-color:currentColor!important;
  text-decoration-thickness:1px!important;text-underline-offset:3px!important}
</style>
<script>try{(window.__ingParts=window.__ingParts||{})["p343"]="started";}catch(_){}
(function(){"use strict";
if(window.IngUnderline)return;
var W=window,D=document;
/* never a word key: the left menu, tabs, menus, lists to choose from, strips, chips, code */
var AROUND='nav.dock,[role="tablist"],[role="menu"],[role="menubar"],[role="listbox"],[role="radiogroup"],.seg,.chips,.ic-wrap,.cm-editor';
var SELF='[role="tab"],[role="option"],[role="menuitem"],[role="menuitemradio"],[role="menuitemcheckbox"],[role="switch"],[aria-pressed],[aria-selected],[aria-current],.nav-btn,.seg-btn,.menu-btn,.rail-btn,.effort-opt,.dmc-c,.fr-part';
var KEYS='a,button,summary,[role="button"]';
function hsl(c){var m=String(c).match(/rgba?\(([\d.]+),\s*([\d.]+),\s*([\d.]+)(?:,\s*([\d.]+))?/);if(!m)return null;var r=m[1]/255,g=m[2]/255,b=m[3]/255,a=m[4]==null?1:+m[4];
  var mx=Math.max(r,g,b),mn=Math.min(r,g,b),h=0,s=0,l=(mx+mn)/2;if(mx!==mn){var d=mx-mn;s=l>0.5?d/(2-mx-mn):d/(mx+mn);h=mx===r?(g-b)/d+(g<b?6:0):mx===g?(b-r)/d+2:(r-g)/d+4;h*=60;}return {h:h,s:s,l:l,a:a};}
/* Ingenium's violet, by day (#6a3fb5 and its kin) and by night (#b79ce6, #c9b8ee): not its grey inks, nor the night's near white ink */
function violet(c){var x=hsl(c);return !!x&&x.a>=0.6&&x.h>=245&&x.h<=300&&x.s>=0.25&&x.l>=0.3&&x.l<=0.82;}
function faced(cs){var bg=hsl(cs.backgroundColor);if(bg&&bg.a>=0.08)return true;if(cs.backgroundImage&&cs.backgroundImage!=="none")return true;
  if(cs.boxShadow&&cs.boxShadow!=="none"&&!/^(rgba\(0, 0, 0, 0\)[^,]*,?\s*)+$/.test(cs.boxShadow))return true;
  var sides=["Top","Right","Bottom","Left"];for(var i=0;i<4;i++){var s=sides[i];if(parseFloat(cs["border"+s+"Width"])>0.4&&cs["border"+s+"Style"]!=="none"){var bc=hsl(cs["border"+s+"Color"]);if(bc&&bc.a>0.12)return true;}}return false;}
function pseudoFaced(e){var ps=["::before","::after"];for(var i=0;i<2;i++){var q=getComputedStyle(e,ps[i]);if(q.content&&q.content!=="none"&&q.content!=="normal"&&faced(q))return true;}return false;}
function kidFaced(e){var k=e.firstElementChild,n=0;while(k&&n<8){if(faced(getComputedStyle(k)))return true;k=k.nextElementSibling;n++;}return false;}
/* a word key: words (not a mark alone), small type, Ingenium's violet, and nothing drawn around them */
function wordKey(e){if(e.closest(AROUND)||e.matches(SELF))return false;
  var t=(e.textContent||"").replace(/\s+/g," ").trim();if(!t||t.length>60||!/[A-Za-zÀ-ɏ]{2}/.test(t))return false;
  var cs=getComputedStyle(e);if(cs.display==="contents")return false;if(!violet(cs.color))return false;if(parseFloat(cs.fontSize)>19)return false;
  if(faced(cs)||pseudoFaced(e)||kidFaced(e))return false;return true;}
var SEEN=new WeakSet();
function look(e,again){if(!again&&SEEN.has(e))return;SEEN.add(e);
  try{var mine=e.classList.contains("ing-ul");
    if(wordKey(e)){if(!mine){if(/underline/.test(getComputedStyle(e).textDecorationLine))return;   /* the list above, or its own part, has lined it */
        e.classList.add("ing-ul");}}
    else if(mine)e.classList.remove("ing-ul");}catch(x){}}
function sweep(root,again){if(!root||root.nodeType!==1)return;if(root.matches(KEYS))look(root,again);
  var l=root.querySelectorAll(KEYS);for(var i=0;i<l.length;i++)look(l[i],again);}
/* each key is looked at once, as it is drawn: the observer answers before the page is painted, so no key shows bare first */
var mo=new MutationObserver(function(recs){for(var i=0;i<recs.length;i++){var r=recs[i];
  if(r.type==="attributes"){if(r.target===D.body)again();continue;}
  var a=r.addedNodes;for(var j=0;j<a.length;j++)if(a[j].nodeType===1)sweep(a[j],false);}});
/* by night the violet is lighter: every key is looked at again when the theme changes */
function again(){SEEN=new WeakSet();sweep(D.body,true);}
function start(){if(!D.body){D.addEventListener("DOMContentLoaded",start,{once:true});return;}
  sweep(D.body,false);mo.observe(D.body,{childList:true,subtree:true,attributes:true,attributeFilter:["data-theme"]});}
start();
W.IngUnderline={again:again,isWordKey:function(e){try{return wordKey(e);}catch(x){return false;}}};
})();
;try{window.__ingParts["p343"]="running";}catch(_){}
</script>
