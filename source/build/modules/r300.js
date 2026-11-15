<style id="r300-css">
/* ============ R300 · FOLDERS WITHOUT ENDLESS SCROLLING (Ingenium 7.10, 15 November 2026) ============
   Her words (15 November 2026): "The Folders page and the apps pages inside of the Folders page are really long and I have to scroll
   endlessly, please fix that as you continue working on my requests." Then: "I approve of the compact page design for the Folders page,
   I want you to give any other long pages inside of Ingenium the same treament that would significantly improve the app's visuals and
   accessibility design." And on the live preview (https://claude.ai/artifact/4m4wnK9mduJpf7XazDLVH7, version 1): "I approve of your
   recommendation for rge Folders Without Scrolling preview, please push it everywhere."
   Measured on 7.09 at 1440 by 900 with an invented library of six apps and 144 notes: the Folders page 2.9 screens, a folder of 24 notes
   open 4.8 (the drawer of apps 480 px above every folder; How it was built with every drawer open, a row a note, 2,362 px; the six ways
   of bringing in work at full size, 741 px). On the preview: 2.0 and 1.7.
   What this module does, on the page r208 draws and r263 and r258 dress (from 760 pixels wide, where r263 sets .fd-on):
   - the Folders page (fw-home): Your apps in one row without the "+ A folder for another app" card (the head holds that key), the build
     library and How I work side by side, the six envelopes in one row, each with its instructions in a raised sheet in the window when
     the envelope is pressed (no film over the page; the sheet's keys press the envelope's own keys);
   - a folder open (fw-open): the drawer of apps folds to its front (pressing the front unfolds it); the folder's papers get divider
     tabs (How it was built, Decisions, Conversations, GitHub, Words), one paper at a time; in How it was built one drawer stands open at
     a time and shows about eight cards, the rest flipped through inside it with the wheel, its scroll bar hidden.
   Nothing is taken away. Its marks are added inside the papers, never among #fldBody's own children, which r263 watches; the paper and
   drawer chosen in a folder are kept for the session and given back when r208 draws the folder again. Still under Minimal motion and
   the system's reduced motion. Every key lifts, sinks and sounds (r176: [role="tab"] and .btn; the envelope with IngSound "keys"). */
/* 1. a folder open: the head folds to the drawer's front */
#page-folders.fd-on.fw-open:not(.fw-unfold) .fd-head{min-height:0;padding:20px 30px 20px 40px;align-items:center}
#page-folders.fd-on.fw-open:not(.fw-unfold) .fd-head .lede,
#page-folders.fd-on.fw-open:not(.fw-unfold) .fd-head .fd-holds,
#page-folders.fd-on.fw-open:not(.fw-unfold) .fd-head .fd-hint{display:none}
#page-folders.fd-on.fw-open:not(.fw-unfold) .fd-head .page-title{margin-bottom:12px}
#page-folders.fd-on.fw-open:not(.fw-unfold) .fd-drawer{height:118px}
#page-folders.fd-on.fw-open:not(.fw-unfold) .fd-drawer .fd-box,
#page-folders.fd-on.fw-open:not(.fw-unfold) .fd-drawer .fd-files{opacity:0;visibility:hidden;-webkit-transform:translateY(60px);transform:translateY(60px)}
#page-folders.fd-on.fw-open .fd-drawer .fd-box,#page-folders.fd-on.fw-open .fd-drawer .fd-files{transition:opacity .45s ease,transform .6s cubic-bezier(.22,1,.36,1),visibility 0s linear .45s}
#page-folders.fd-on.fw-open.fw-unfold .fd-drawer .fd-box,#page-folders.fd-on.fw-open.fw-unfold .fd-drawer .fd-files{transition:opacity .45s ease,transform .6s cubic-bezier(.22,1,.36,1),visibility 0s}
#page-folders.fd-on.fw-open .fd-dfront{cursor:pointer}
#page-folders .fw-unfoldnote{display:none}
#page-folders.fd-on.fw-open .fw-unfoldnote{display:block;position:absolute;left:0;right:0;bottom:-24px;text-align:center;font-family:inherit;font-size:11.5px;font-weight:500;line-height:1.3;letter-spacing:.02em;color:var(--ink-3,#6c6579);pointer-events:none}
#page-folders.fd-on.fw-open.fw-unfold .fw-unfoldnote{visibility:hidden}
/* 2. a folder open: divider tabs, one paper at a time */
#page-folders .fw-dividers{display:none}
#page-folders.fd-on.fw-tabs .fw-dividers{display:flex;flex-wrap:wrap;align-items:flex-end;margin:-4px -4px 16px;padding:8px 4px 0;border-bottom:1.5px solid var(--fd-margin,rgba(106,63,181,.28))}
#page-folders .fw-div{-webkit-appearance:none;appearance:none;border:0;cursor:pointer;font-family:inherit;font-size:13px;font-weight:600;line-height:1.2;color:var(--ink-2,#4a4358);
  margin:0 6px 0 0;padding:10px 15px 9px;border-radius:11px 11px 0 0;position:relative;background:linear-gradient(180deg,var(--fd-cover0,#f6f0fd),var(--fd-cover1,#e6daf6));
  box-shadow:inset 0 1px 0 rgba(255,255,255,.75),inset 0 0 0 1px var(--fd-edge,rgba(106,63,181,.18)),0 -1px 2px rgba(40,22,68,.10),0 -7px 14px -8px rgba(40,22,68,.22);
  -webkit-transform:translateY(4px);transform:translateY(4px);transition:transform .18s cubic-bezier(.2,.8,.2,1),box-shadow .18s,color .18s}
#page-folders .fw-div small{font-weight:500;opacity:.68;margin-left:5px}
#page-folders .fw-div:hover{-webkit-transform:translateY(0);transform:translateY(0)}
#page-folders .fw-div:focus-visible{-webkit-transform:translateY(0);transform:translateY(0)}
#page-folders .fw-div:active{-webkit-transform:translateY(5px);transform:translateY(5px);transition-duration:.08s}
#page-folders .fw-div[aria-selected="true"]{-webkit-transform:translateY(1.5px);transform:translateY(1.5px);color:var(--accent,#6a3fb5);background:var(--fd-paper,#fbf8ff);z-index:2;
  box-shadow:inset 0 2px 0 var(--accent,#6a3fb5),inset 0 0 0 1px var(--fd-edge,rgba(106,63,181,.22)),0 -2px 5px rgba(40,22,68,.12),0 -12px 20px -8px rgba(40,22,68,.24)}
body[data-theme="night"] #page-folders .fw-div{color:var(--ink-2,#cfc6dc);box-shadow:inset 0 1px 0 rgba(255,255,255,.07),inset 0 0 0 1px rgba(255,255,255,.07),0 -1px 2px rgba(0,0,0,.5),0 -8px 16px -8px rgba(0,0,0,.6)}
body[data-theme="night"] #page-folders .fw-div[aria-selected="true"]{box-shadow:inset 0 2px 0 var(--accent,#b79ce6),inset 0 0 0 1px rgba(255,255,255,.08),0 -2px 6px rgba(0,0,0,.5),0 -12px 22px -8px rgba(0,0,0,.65)}
#page-folders.fd-on.fw-tabs .fd-right>.card:not(.fw-on){display:none}
#page-folders.fd-on.fw-tabs .fd-right>.card.fw-on.fw-new{-webkit-animation:fwPaper .42s cubic-bezier(.22,1,.36,1);animation:fwPaper .42s cubic-bezier(.22,1,.36,1)}
@-webkit-keyframes fwPaper{from{opacity:0;-webkit-transform:translateY(10px) rotate(-.3deg)}to{opacity:1;-webkit-transform:none}}
@keyframes fwPaper{from{opacity:0;transform:translateY(10px) rotate(-.3deg)}to{opacity:1;transform:none}}
/* 3. a folder open: one drawer at a time, about eight cards showing, the rest flipped through inside it */
#page-folders.fd-on.fw-one .cdw[data-open="1"] .cdw-box{max-height:372px;overflow-y:auto;overscroll-behavior:contain;scrollbar-width:none}
#page-folders.fd-on.fw-one .cdw[data-open="1"] .cdw-box::-webkit-scrollbar{display:none}
#page-folders.fd-on.fw-one .cdw .cdw-box{transition:max-height .55s cubic-bezier(.22,1,.36,1),padding-top .55s cubic-bezier(.22,1,.36,1)}
#page-folders.fd-on.fw-one .cdw-front{cursor:pointer}
#page-folders .fw-flip{display:none}
#page-folders.fd-on.fw-one .cdw.fw-more[data-open="1"] .fw-flip{display:block;position:absolute;left:0;right:0;top:-30px;z-index:1000;text-align:center;pointer-events:none;
  font-family:inherit;font-size:11px;font-weight:600;line-height:1;letter-spacing:.06em;text-transform:uppercase;color:var(--accent,#6a3fb5);opacity:.85}
/* 4. the Folders page, compact: every part still on the page and seen at once */
#page-folders.fd-on.fw-home #fldBody{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);grid-auto-flow:row dense;grid-column-gap:22px;align-items:start}
#page-folders.fd-on.fw-home #fldBody>*{grid-column:1/-1;min-width:0}
#page-folders.fd-on.fw-home #fldBody>.card.fd-libcard,#page-folders.fd-on.fw-home #fldBody>.card.fw-how{grid-column:auto}
#page-folders.fd-on.fw-home .fld-grid{grid-template-columns:repeat(auto-fill,minmax(168px,1fr));grid-gap:12px}
#page-folders.fd-on.fw-home .fld-grid>.fld-new{display:none}
#page-folders.fd-on.fw-home .fld-ways.fd-tray{grid-template-columns:repeat(6,minmax(0,1fr));grid-gap:12px;padding:12px}
#page-folders.fd-on.fd-mid.fw-home .fld-ways.fd-tray{grid-template-columns:repeat(3,minmax(0,1fr))}
#page-folders.fd-on.fw-home .fd-env{cursor:pointer;min-height:0}
#page-folders.fd-on.fw-home .fd-env>p{display:none}
#page-folders.fd-on.fw-home .fd-env .fld-acts{flex-wrap:wrap;justify-content:center}
#page-folders .fw-how2{display:none}
#page-folders.fd-on.fw-home .fd-env .fw-how2{display:block;margin:6px 0 0;font-family:"Home Cormorant","Cormorant Garamond",Georgia,serif;font-style:italic;font-size:14px;line-height:1.2;color:var(--ink-3,#6c6579);text-align:center}
#page-folders.fd-on.fw-home .fd-libcard .fd-book{-webkit-transform:scale(.84);transform:scale(.84);-webkit-transform-origin:50% 100%;transform-origin:50% 100%}
#page-folders.fd-on.fd-mid.fw-home #fldBody{display:block}
#page-folders.fd-on.fd-phone.fw-home .fld-ways.fd-tray{grid-template-columns:repeat(2,minmax(0,1fr))}
#page-folders.fd-on.fd-phone.fw-open:not(.fw-unfold) .fd-head{padding:16px}
#page-folders.fd-on.fd-phone.fw-open:not(.fw-unfold) .fd-drawer{height:auto;min-height:96px}
/* the raised sheet that holds an envelope's instructions, in the window, with no film over the page */
.fw-sheet{position:fixed;left:50%;top:50%;z-index:5000;width:520px;max-width:calc(100vw - 32px);max-height:calc(100vh - 64px);overflow:auto;scrollbar-width:none;
  -webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%);padding:22px 24px 20px;border-radius:18px;background:var(--fd-paper,#fbf8ff);color:var(--ink-1,#221a2e);
  box-shadow:inset 0 0 0 1px var(--fd-edge,rgba(106,63,181,.18)),0 2px 0 rgba(40,22,68,.10),0 14px 30px rgba(40,22,68,.18),0 34px 60px rgba(40,22,68,.16);
  -webkit-animation:fwRise .45s cubic-bezier(.22,1,.36,1);animation:fwRise .45s cubic-bezier(.22,1,.36,1)}
.fw-sheet::-webkit-scrollbar{display:none}
body[data-theme="night"] .fw-sheet{background:var(--fd-paper,#211b2b);color:var(--ink-1,#efe9f6);box-shadow:inset 0 0 0 1px rgba(255,255,255,.08),0 2px 0 rgba(0,0,0,.5),0 14px 30px rgba(0,0,0,.5),0 34px 60px rgba(0,0,0,.45)}
.fw-sheet .fw-st{display:block;font-family:"Home Cormorant","Cormorant Garamond",Georgia,serif;font-size:22px;font-weight:600;line-height:1.25;margin:6px 34px 8px 0}
.fw-sheet p{margin:0 0 14px;line-height:1.55;font-size:14px}
.fw-sheet .fw-x{position:absolute;right:14px;top:14px}
.fw-sheet .fld-acts{display:flex;flex-wrap:wrap}
.fw-sheet .fld-acts .btn{margin:0 8px 8px 0}
@-webkit-keyframes fwRise{from{opacity:0;-webkit-transform:translate(-50%,-46%) scale(.97)}to{opacity:1;-webkit-transform:translate(-50%,-50%)}}
@keyframes fwRise{from{opacity:0;transform:translate(-50%,-46%) scale(.97)}to{opacity:1;transform:translate(-50%,-50%)}}
@media (prefers-reduced-motion:reduce){#page-folders .fw-div,#page-folders .fd-right>.card,.fw-sheet,#page-folders .cdw-box{-webkit-animation:none!important;animation:none!important;transition-duration:.001ms!important}}
body[data-motion="minimal"] #page-folders .fw-div,body[data-motion="minimal"] #page-folders .fd-right>.card,body[data-motion="minimal"] .fw-sheet{-webkit-animation:none!important;animation:none!important}
</style>
<script>try{(window.__ingParts=window.__ingParts||{})["p300"]="started";}catch(_){}
/* R300 · Folders without endless scrolling: see the note at the top of its styles */
(function r300(){
"use strict";
var W=window,D=document,body=null,mo=null,papers={},chosen={},flipT=0,lastKey=null,queued=false;
function el(t,c,x){var e=D.createElement(t);if(c)e.className=c;if(x!=null)e.textContent=x;return e;}
function pg(){return D.getElementById("page-folders");}
function cls(e,c,on){if(e&&e.classList.contains(c)!==!!on)e.classList.toggle(c,!!on);}
function att(e,a,v){if(e&&e.getAttribute(a)!==v)e.setAttribute(a,v);}
function kids(n,cls){return [].filter.call(n.children,function(c){return c.classList.contains(cls);});}
function key(){try{return String((W.state&&state.folders&&state.folders.ui&&state.folders.ui.open)||"");}catch(e){return "";}}
function click(){try{if(W.IngSound&&IngSound.play)IngSound.play("keys");}catch(e){}}
function shortName(h){var t=(h&&h.textContent||"").replace(/\s+/g," ").trim(),m=/^(.*?)\s*\((\d+)\)$/.exec(t),name=m?m[1]:t;
  name=name.replace(/, and what is open$/,"").replace(/^A GitHub repository$/,"GitHub").replace(/^The words that mark it$/,"Words");return {name:name,n:m?m[2]:""};}
function setOpen(d,on){var v=on?"1":"0";if(d.getAttribute("data-open")!==v)d.setAttribute("data-open",v);var pl=d.querySelector(".cdw-pull");
  if(pl){att(pl,"aria-expanded",on?"true":"false");var lb=(d.querySelector(".cdw-label .bl-sub")||{}).textContent||"";if(lb)att(pl,"aria-label",(on?"Shut":"Open")+" the drawer: "+lb);}}
function flips(){clearTimeout(flipT);flipT=setTimeout(function(){var p=pg();if(!p)return;[].forEach.call(p.querySelectorAll(".fd-right .cdw"),function(d){var b=d.querySelector(".cdw-box"),more=!!b&&d.getAttribute("data-open")==="1"&&b.scrollHeight>b.clientHeight+6;
  cls(d,"fw-more",more);});},620);}
function paper(p,right,k){var cards=kids(right,"card");if(!cards.length)return;var row=null;[].forEach.call(right.children,function(c){if(c.classList.contains("fw-dividers"))row=c;});
  if(!row){row=el("div","fw-dividers");row.setAttribute("role","tablist");row.setAttribute("aria-label","The folder's papers");
    cards.forEach(function(c,i){var s=shortName(c.querySelector("h2")),b=el("button","fw-div",s.name);b.type="button";b.setAttribute("role","tab");b.setAttribute("data-i",String(i));if(s.n)b.appendChild(el("small",null,s.n));row.appendChild(b);});
    right.insertBefore(row,right.firstChild);}
  var i=papers[k]||0;if(i>=cards.length)i=0;
  cards.forEach(function(c,j){cls(c,"fw-on",j===i);att(c,"role","tabpanel");});
  [].forEach.call(row.querySelectorAll(".fw-div"),function(b){var on=+b.getAttribute("data-i")===i;att(b,"aria-selected",String(on));att(b,"tabindex",on?"0":"-1");});
  cls(p,"fw-tabs",true);}
function drawers(p,right,k){var ds=[].slice.call(right.querySelectorAll(".cdw"));if(!ds.length){cls(p,"fw-one",false);return;}
  cls(p,"fw-one",true);var c=(k in chosen)?chosen[k]:0;
  ds.forEach(function(d,i){setOpen(d,i===c);var f=d.querySelector(".cdw-front");if(f&&!f.querySelector(".fw-flip"))f.appendChild(el("span","fw-flip","Turn the wheel to flip through them all"));});flips();}
function dress(){var p=pg();if(!p)return;var on=p.classList.contains("fd-on"),spread=on?p.querySelector(".fd-spread"):null,k=key();
  cls(p,"fw-open",!!spread);
  if(!spread||k!==lastKey)cls(p,"fw-unfold",false);lastKey=k;
  cls(p,"fw-home",on&&!spread);
  var drw=p.querySelector(".fd-head .fd-drawer");if(drw&&!drw.querySelector(".fw-unfoldnote"))drw.appendChild(el("div","fw-unfoldnote","Press the drawer to see all your apps"));
  if(spread){var right=spread.querySelector(".fd-right");if(right){paper(p,right,k);drawers(p,right,k);}}
  else{cls(p,"fw-tabs",false);cls(p,"fw-one",false);
    var b=p.querySelector("#fldBody");if(b)kids(b,"card").forEach(function(c){var h=c.querySelector("h2");if(h&&/^How I work, on every app/.test(h.textContent.trim()))cls(c,"fw-how",true);});
    [].forEach.call(p.querySelectorAll(".fd-env"),function(e){if(!e.querySelector(".fw-how2"))e.appendChild(el("span","fw-how2","Press for how"));});}}
function closeSheet(){var s=D.querySelector(".fw-sheet");if(s&&s.parentNode)s.parentNode.removeChild(s);}
function sheet(env){closeSheet();var t=env.querySelector("b"),s=el("div","fw-sheet");s.setAttribute("role","dialog");s.setAttribute("aria-label",t?t.textContent:"How to bring it in");
  var x=el("button","btn small fw-x","✕");x.type="button";x.setAttribute("aria-label","Close");x.addEventListener("click",closeSheet);s.appendChild(x);
  var orb=env.querySelector(".fdo");if(orb)s.appendChild(orb.cloneNode(true));s.appendChild(el("b","fw-st",t?t.textContent:""));
  var pp=null;[].forEach.call(env.children,function(c){if(c.tagName==="P")pp=c;});if(pp)s.appendChild(el("p",null,pp.textContent));
  var acts=el("div","fld-acts");[].forEach.call(env.querySelectorAll(".fld-acts button"),function(o){var b=el("button",o.className,o.textContent);b.type="button";
    b.addEventListener("click",function(){closeSheet();o.click();});acts.appendChild(b);});s.appendChild(acts);D.body.appendChild(s);try{x.focus();}catch(e){}}
D.addEventListener("click",function(e){var t=e.target,p=pg();if(!p||!t||!t.closest)return;
  if(D.querySelector(".fw-sheet")&&!t.closest(".fw-sheet"))closeSheet();
  if(!p.contains(t)||!p.classList.contains("fd-on"))return;
  var dv=t.closest(".fw-dividers .fw-div");if(dv){var k=key();papers[k]=+dv.getAttribute("data-i");var right=dv.closest(".fd-right");
    kids(right,"card").forEach(function(c){cls(c,"fw-new",false);});var cards=kids(right,"card"),c=cards[papers[k]];cls(c,"fw-new",true);paper(p,right,k);flips();return;}
  var fr=t.closest(".fd-right .cdw-front");if(fr&&p.classList.contains("fw-one")){var d=fr.closest(".cdw"),right2=d.closest(".fd-right"),ds=[].slice.call(right2.querySelectorAll(".cdw")),i=ds.indexOf(d),k2=key();
    if(!t.closest(".cdw-pull")){var pl=d.querySelector(".cdw-pull");if(pl){pl.click();return;}}
    var open=d.getAttribute("data-open")==="1";chosen[k2]=open?i:-1;ds.forEach(function(x,j){if(j!==i)setOpen(x,false);});setOpen(d,open);flips();return;}
  var df=t.closest(".fd-head .fd-dfront");if(df&&p.classList.contains("fw-open")&&!t.closest("input,label,button,.fd-handle")){p.classList.toggle("fw-unfold");click();return;}
  var env=t.closest(".fd-env");if(env&&p.classList.contains("fw-home")&&!t.closest("button,a,input")){click();sheet(env);}},false);
D.addEventListener("keydown",function(e){if(e.key==="Escape"&&D.querySelector(".fw-sheet")){closeSheet();return;}
  var t=e.target;if(!t||!t.classList||!t.classList.contains("fw-div")||(e.key!=="ArrowRight"&&e.key!=="ArrowLeft"))return;var bs=[].slice.call(t.parentNode.querySelectorAll(".fw-div")),i=bs.indexOf(t),n=bs[(i+(e.key==="ArrowRight"?1:bs.length-1))%bs.length];
  if(n){e.preventDefault();n.click();try{n.focus();}catch(x){}}});
function hook(){var p=pg();body=p&&p.querySelector("#fldBody");if(!body){setTimeout(hook,700);return;}
  /* r258 builds the drawers a moment after r208 draws a folder, inside its paper: the whole of #fldBody is watched for nodes added or
     taken away (never attributes), the changes of one moment gathered into one dressing, and the records of its own marks dropped */
  var soon=function(){if(queued)return;queued=true;Promise.resolve().then(function(){queued=false;dress();if(mo)mo.takeRecords();});};
  try{mo=new MutationObserver(soon);mo.observe(body,{childList:true,subtree:true});}catch(e){}
  try{new MutationObserver(function(){dress();}).observe(p,{attributes:true,attributeFilter:["class"]});}catch(e){}
  dress();}
if(D.readyState==="loading")D.addEventListener("DOMContentLoaded",function(){setTimeout(hook,0);});else setTimeout(hook,0);
W.IngFoldersCompact={dress:dress,state:function(){var p=pg();return {home:!!p&&p.classList.contains("fw-home"),open:!!p&&p.classList.contains("fw-open"),unfold:!!p&&p.classList.contains("fw-unfold"),
  tabs:!!p&&p.classList.contains("fw-tabs"),one:!!p&&p.classList.contains("fw-one"),paper:papers[key()]||0,drawer:(key() in chosen)?chosen[key()]:0};}};
try{window.__ingParts["p300"]="running";}catch(_){}
})();
</script>
