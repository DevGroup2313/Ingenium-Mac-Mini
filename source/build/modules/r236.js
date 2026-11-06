<style id="r236-css">
/* ============ R236 · THE AUTHOR STUDIO, THE ROOM BEHIND THE ROOMS (Ingenium 6.37, 6 November 2026; the master edition only) ============
   Her words (6 November 2026): "The Author Studio looks pitiful and does look like it will allow me to make any edits or changes to
   Ingenium. It does not look like Carpe Diem's Author Studio, I want to actually be able to make edits and changes to Ingenium."
   What it was (6.25, modules/r226.js and r227.js): a room of Settings holding four cards: Check Ingenium, Errors, Your layers (pages,
   sections, scripts, styles, cards hidden) and Your page. Carpe Diem's Author Studio (1058, carried in Ingenium) is a studio of its
   own: a top bar (All changes kept, Export all, Import all, Reset all overrides, Close), a rail of rooms, an Editor that asks what
   you are changing and hands you the room, every word the app says open to rewriting, one change log, every change undoable.
   Now Ingenium's is built the same way, in Ingenium's colours:
   - a studio over the whole window (or docked at the right, with Ingenium live beside it), opened from Settings' Author Studio room,
     from the pen in the top bar, and from go("workshop") or go("author");
   - its top bar: All changes kept (with the count, and a flash on every save), Show Ingenium beside, Export all, Import all, Reset
     all, Close; its rail: The Editor, Words, Names, Look, Checks and additions, Change log;
   - Words: Edit words on the page (press any words in Ingenium and rewrite them; the change is made on that page, or everywhere when
     chosen), Find words (every sentence of every page, searched), and Your words (each rewrite, its page, Rewrite and Restore).
     A rewrite is kept as the words it replaces and the words that replace them; it is applied as Ingenium starts and whenever a page
     draws them again, and never inside what is hers (her chats and messages, notes, Tabula, Code's editor, fields and editable text);
   - Names: Ingenium's own name, and for each page its name in the side bar, its title and its first line;
   - Look: the accent colour (its shades made from it, for day and night), the font of the headings and of the text, and the depth
     of the raised keys and cards, with ready looks; everything changes at once, behind the studio;
   - Checks and additions: what the Workshop held (Check Ingenium, Errors, Your layers, Your page), moved into the studio whole;
   - Change log: every change, newest first, each with Undo; Export all writes the studio's changes and the layers to one file,
     Import all reads one back, Reset all returns Ingenium to how it was built (the log keeps the reset).
   Kept in the desk (state.author): on every device that has her data, in her backups, sealed with the lock when it is on. */
#ingAuthor{position:fixed;inset:0;z-index:785;display:flex;flex-direction:column;background:var(--bg);color:var(--ink-1);font:13px/1.55 var(--sans)}
#ingAuthor[hidden]{display:none}
#ingAuthor.au-dock{left:auto;width:min(480px,100vw);border-left:1px solid var(--hairline);box-shadow:-12px 0 32px rgba(30,16,60,.12)}
html.au-docked main.main{margin-right:min(480px,100vw)}
/* 6.38, her words: "Everything inside the Author Studio looks big and chunky, very bulky and does not match the rest of the app". Its
   measures are now Ingenium's own, read from the page: the top bar's small pills (11 to 11.5 px, 21 to 24 px tall), the side bar's
   flat keys (13 px, 8 by 12 px, no shadow; the chosen one in the accent) for the rail, a card's 16 px, 14 px corners and soft shadow,
   its 16.5 px serif heading and 12 px notes, the 13 px keys */
#ingAuthor .au-top{display:flex;flex-wrap:wrap;align-items:center;gap:6px 10px;min-height:44px;padding:8px 18px;border-bottom:1px solid var(--hairline);background:var(--glass-strong,var(--card-hi))}
#ingAuthor .au-brand{display:flex;align-items:center;gap:9px;margin-right:auto}
#ingAuthor .au-seal{display:inline-flex;width:24px;height:24px;align-items:center;justify-content:center;border-radius:7px;color:#fff;background:linear-gradient(180deg,var(--fill-hi),var(--fill-lo))}
#ingAuthor .au-seal svg{width:14px;height:14px}
#ingAuthor .au-title{font:600 16.5px/1.2 var(--serif);letter-spacing:.02em}
#ingAuthor .au-kept{display:inline-flex;align-items:center;gap:6px;height:22px;padding:0 9px;border-radius:999px;border:1px solid rgba(63,143,94,.28);background:rgba(63,143,94,.07);font:600 11px/1 var(--sans);color:var(--ink-2);transition:background .3s ease}
#ingAuthor .au-kept i{width:6px;height:6px;border-radius:50%;background:var(--ok)}
#ingAuthor .au-kept span{font-weight:400;color:var(--ink-3)}
#ingAuthor .au-kept.flash{background:rgba(63,143,94,.2)}
#ingAuthor .au-top .au-keys{display:flex;flex-wrap:wrap;gap:6px}
#ingAuthor .au-pill{display:inline-flex;align-items:center;height:24px;padding:0 10px;border-radius:999px;border:1px solid var(--hairline);background:var(--card-hi);color:var(--ink-2);font:600 11.5px/1 var(--sans);cursor:pointer;
  box-shadow:inset 0 1px 0 rgba(255,255,255,.6),inset 0 -1.5px 0 rgba(40,20,70,.08),0 1px 0 rgba(40,20,70,.1);transition:transform .12s ease}
#ingAuthor .au-pill:hover{color:var(--ink-1);transform:translateY(-1px)}
#ingAuthor .au-pill:focus-visible,#ingAuthor .au-room:focus-visible,#ingAuthor .au-kind:focus-visible{outline:2px solid var(--accent);outline-offset:2px}
#ingAuthor .au-pill.prim{background:var(--fill-mid);border-color:var(--fill-lo);color:#fff}
#ingAuthor .au-pill.bad{color:var(--bad)}
#ingAuthor .au-shell{flex:1 1 auto;display:flex;min-height:0}
#ingAuthor .au-rail{flex:0 0 200px;display:flex;flex-direction:column;gap:2px;padding:14px 10px;overflow:auto;border-right:1px solid var(--hairline)}
#ingAuthor .au-room{display:flex;align-items:center;gap:9px;width:100%;padding:8px 12px;border:0;border-radius:9px;background:transparent;color:var(--ink-2);font:500 13px/1.25 var(--sans);text-align:left;cursor:pointer}
#ingAuthor .au-room:hover{background:var(--accent-softer);color:var(--ink-1)}
#ingAuthor .au-room svg{width:16px;height:16px;flex:0 0 auto;color:var(--ink-3)}
#ingAuthor .au-room[aria-selected="true"]{color:var(--accent);font-weight:700;background:var(--accent-softer)}
#ingAuthor .au-room[aria-selected="true"] svg{color:var(--accent)}
#ingAuthor .au-room .n{margin-left:auto;min-width:18px;padding:1px 6px;border-radius:999px;background:var(--accent-soft);color:var(--accent-deep);font:600 10.5px/1.5 var(--sans);text-align:center}
#ingAuthor .au-room .n:empty{display:none}
#ingAuthor .au-pane{flex:1 1 auto;min-width:0;overflow:auto;padding:22px 32px 56px}
#ingAuthor .au-mast{max-width:960px;margin:0 auto 14px}
#ingAuthor .au-kick{font:700 10.5px/1.4 var(--sans);letter-spacing:.14em;text-transform:uppercase;color:var(--accent)}
#ingAuthor .au-h{margin:2px 0 4px;font:600 21px/1.3 var(--serif)}
#ingAuthor .au-sub{margin:0;max-width:78ch;color:var(--ink-2);font-size:13.5px;line-height:1.55}
#ingAuthor .au-room-body{max-width:960px;margin:0 auto;display:flex;flex-direction:column;gap:14px}
#ingAuthor .au-card{padding:16px;border-radius:14px;border:1px solid var(--hairline-soft);background:var(--card-hi);box-shadow:0 1px 0 rgba(40,22,68,.06),0 2px 6px rgba(40,22,68,.05),0 12px 30px rgba(40,22,68,.07)}
#ingAuthor .au-card h3{margin:0 0 2px;font:600 16.5px/1.5 var(--serif)}
#ingAuthor .au-card > p{margin:0 0 10px;color:var(--ink-3);font-size:12px;line-height:1.55}
#ingAuthor .au-kinds{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px}
#ingAuthor .au-kind{display:flex;flex-direction:column;align-items:flex-start;gap:3px;padding:11px 13px;border-radius:12px;border:1px solid var(--hairline);background:var(--card-hi);box-shadow:0 1px 0 rgba(40,22,68,.05),0 2px 5px rgba(40,22,68,.05);
  text-align:left;cursor:pointer;color:var(--ink-1);font:inherit;transition:transform .16s var(--spring),box-shadow .16s ease;animation:auRise .38s cubic-bezier(.2,.8,.2,1) backwards;animation-delay:calc(var(--i,0)*50ms)}
#ingAuthor .au-kind:hover{transform:translateY(-2px);box-shadow:0 2px 0 rgba(40,22,68,.06),0 8px 18px rgba(40,22,68,.1)}
#ingAuthor .au-kind b{font:600 14px/1.35 var(--serif)}
#ingAuthor .au-kind span{color:var(--ink-3);font-size:12px;line-height:1.5}
#ingAuthor .au-kind em{margin-top:2px;font:600 11.5px/1.4 var(--sans);color:var(--accent)}
#ingAuthor .au-room-body .au-keys{display:flex;flex-wrap:wrap;gap:8px}
#ingAuthor .au-row{display:flex;flex-wrap:wrap;align-items:center;gap:6px 10px;padding:8px 0;border-top:1px solid var(--hairline-soft);font-size:13px}
#ingAuthor .au-row:first-of-type{border-top:0}
#ingAuthor .au-row .w{flex:1 1 260px;min-width:0}
#ingAuthor .au-row .from{color:var(--ink-3);text-decoration:line-through;text-decoration-color:rgba(184,67,63,.5);word-break:break-word}
#ingAuthor .au-row .to{color:var(--ink-1);font-weight:600;word-break:break-word}
#ingAuthor .au-row .where{display:inline-block;margin-right:7px;padding:0 7px;border-radius:999px;background:var(--accent-softer);color:var(--accent-deep);font:600 10.5px/1.7 var(--sans)}
#ingAuthor .au-row .when{font-size:11px;color:var(--ink-3)}
#ingAuthor .au-row.undone{opacity:.55}
#ingAuthor .au-field{display:grid;grid-template-columns:160px minmax(0,1fr);gap:4px 12px;align-items:center;margin:5px 0}
#ingAuthor .au-field label{font-size:12px;color:var(--ink-2)}
#ingAuthor .au-field input[type=text],#ingAuthor .au-field select{width:100%;box-sizing:border-box;height:32px;padding:5px 10px;border-radius:9px;border:1px solid var(--hairline);background:var(--input-bg);color:var(--ink-1);font:13px var(--sans)}
#ingAuthor .au-field input[type=color]{width:46px;height:28px;padding:2px;border-radius:7px;border:1px solid var(--hairline);background:var(--card-hi)}
#ingAuthor .au-names{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px}
#ingAuthor .au-names .au-card{box-shadow:none;padding:12px 14px;background:var(--card)}
#ingAuthor .au-names .au-card h3{font-size:14.5px}
#ingAuthor .au-search{width:100%;box-sizing:border-box;height:34px;padding:6px 12px;border-radius:10px;border:1px solid var(--hairline);background:var(--input-bg);color:var(--ink-1);font:13px var(--sans)}
#ingAuthor .au-hits{max-height:420px;overflow:auto;margin-top:6px}
#ingAuthor .au-presets{display:flex;flex-wrap:wrap;gap:6px}
#ingAuthor .au-swatch{display:inline-flex;align-items:center;gap:7px;height:26px;padding:0 11px;border-radius:999px;border:1px solid var(--hairline);background:var(--card-hi);box-shadow:inset 0 1px 0 rgba(255,255,255,.6),0 1px 0 rgba(40,20,70,.1);cursor:pointer;font:600 12px/1 var(--sans);color:var(--ink-1)}
#ingAuthor .au-swatch:hover{transform:translateY(-1px)}
#ingAuthor .au-swatch i{width:11px;height:11px;border-radius:50%}
#ingAuthor .au-note{font-size:12px;color:var(--ink-3);margin:6px 0 0}
#ingAuthor.au-dock .au-rail{flex-basis:52px;padding:10px 6px}
#ingAuthor.au-dock .au-room{justify-content:center;padding:8px}
#ingAuthor.au-dock .au-room span:not(.n),#ingAuthor.au-dock .au-room .n{display:none}
#ingAuthor.au-dock .au-pane{padding:14px 14px 50px}
#ingAuthor.au-dock .au-kinds,#ingAuthor.au-dock .au-names{grid-template-columns:minmax(0,1fr)}
#ingAuthor.au-dock .au-field{grid-template-columns:minmax(0,1fr)}
#ingAuthor.au-dock .au-top{padding:8px 12px}
#ingAuthor.au-dock .au-kept span{display:none}
#ingAuthor #wsBody{max-width:none}
@keyframes auRise{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}
body[data-motion="minimal"] #ingAuthor *,body[data-calm="1"] #ingAuthor *{animation:none !important;transition:none !important}
@media (prefers-reduced-motion:reduce){#ingAuthor *{animation:none !important;transition:none !important}}
@media (max-width:820px){#ingAuthor .au-rail{flex-basis:52px;padding:10px 6px}#ingAuthor .au-room{justify-content:center;padding:8px}#ingAuthor .au-room span:not(.n),#ingAuthor .au-room .n{display:none}
  #ingAuthor .au-kinds,#ingAuthor .au-names{grid-template-columns:minmax(0,1fr)}#ingAuthor .au-field{grid-template-columns:minmax(0,1fr)}#ingAuthor .au-pane{padding:14px 12px 50px}#ingAuthor .au-top{padding:8px 10px}}
/* picking words on the page */
html.au-picking body *{cursor:text !important}
#auHi{position:fixed;z-index:784;pointer-events:none;border:1.5px solid var(--accent);border-radius:5px;background:rgba(106,63,181,.06);display:none}
#auPickBar{position:fixed;left:50%;bottom:16px;transform:translateX(-50%);z-index:786;display:flex;align-items:center;gap:10px;padding:7px 8px 7px 14px;border-radius:12px;background:var(--fill-lo);color:#fff;box-shadow:0 8px 24px rgba(30,16,60,.3);font:600 12.5px/1.4 var(--sans)}
#auPickBar[hidden]{display:none}
#auPickBar button{height:26px;border:1px solid rgba(255,255,255,.4);background:rgba(255,255,255,.14);color:#fff;border-radius:999px;padding:0 12px;font:600 11.5px var(--sans);cursor:pointer}
html.au-docked #auPickBar{left:calc((100vw - min(480px,100vw)) / 2)}
#auPop{position:fixed;z-index:787;width:min(400px,calc(100vw - 24px));padding:14px;border-radius:14px;border:1px solid var(--hairline);background:var(--card-hi);color:var(--ink-1);box-shadow:0 1px 0 rgba(40,22,68,.06),0 16px 40px rgba(30,16,60,.22);font:13px/1.5 var(--sans)}
#auPop[hidden]{display:none}
#auPop h4{margin:0 0 2px;font:600 15px/1.35 var(--serif)}
#auPop .au-note{font-size:11.5px;color:var(--ink-3);margin:0 0 6px}
#auPop .orig{margin:0 0 8px;padding:6px 9px;border-radius:8px;background:var(--input-bg);color:var(--ink-2);font-size:12px;word-break:break-word}
#auPop textarea{width:100%;box-sizing:border-box;min-height:64px;padding:7px 9px;border-radius:9px;border:1px solid var(--hairline);background:var(--card);color:var(--ink-1);font:13px/1.5 var(--sans);resize:vertical}
#auPop label{display:flex;align-items:center;gap:7px;margin:7px 0;font-size:12px;color:var(--ink-2)}
#auPop .k{display:flex;flex-wrap:wrap;gap:6px;justify-content:flex-end;margin-top:4px}
/* the door, in Settings' Author Studio room: a card of Settings */
#wsStudio .au-door{display:flex;flex-wrap:wrap;align-items:center;gap:10px 18px}
#wsStudio .au-door .t{flex:1 1 380px;min-width:0}
#wsStudio .au-door h2{margin:0 0 2px}
#wsStudio .au-door p{margin:0}
#wsStudio .au-door .k{display:flex;flex-wrap:wrap;gap:8px}
#wsStudio > .as-banner,#wsStudio > .ws-wrap{display:none !important}
#auTopKey{display:inline-flex;align-items:center;gap:5px}
#auTopKey svg{width:12px;height:12px}
</style>
<script>try{(window.__ingParts=window.__ingParts||{})["p236"]="started";}catch(_){}
/* R236 · The Author Studio, the room behind the rooms: see the note at the top of its styles. window.IngAuthor */
(function r236(){"use strict";
if(window.IngAuthor)return;
var W=window,D=document;
function $(id){return D.getElementById(id);}
function mk(tag,cls,txt){var e=D.createElement(tag);if(cls)e.className=cls;if(txt!=null)e.textContent=txt;return e;}
function key(cls,txt,fn,title){var b=mk("button","btn "+(cls||"ghost"),txt);b.type="button";if(title)b.title=title;b.addEventListener("click",function(e){e.preventDefault();fn(b,e);});return b;}
function pill(cls,txt,fn,title){var b=mk("button","au-pill"+(cls?" "+cls:""),txt);b.type="button";if(title)b.title=title;b.addEventListener("click",function(e){e.preventDefault();fn(b,e);});return b;}
function svg(d){return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">'+d+'</svg>';}
function uid(){return "a"+Date.now().toString(36)+Math.random().toString(36).slice(2,6);}
function when(t){try{return new Date(t).toLocaleString([], {day:"numeric",month:"short",hour:"2-digit",minute:"2-digit"});}catch(e){return "";}}
function clean(s){return String(s==null?"":s).replace(/\s+/g," ").trim();}
function toast(t){try{W.ingToast(t);}catch(e){}}
var PEN=svg('<path d="M4 20l4.2-1 10.6-10.6a2.1 2.1 0 0 0-3-3L5.2 16 4 20z"/><path d="M14.3 6.9l2.8 2.8"/>');

/* ---------- the store: state.author, in the desk ---------- */
function A(){var s=W.state;if(!s)return null;var a=s.author;if(!a||typeof a!=="object")a=s.author={};
  if(!Array.isArray(a.words))a.words=[];if(!a.names||typeof a.names!=="object")a.names={};if(!a.look||typeof a.look!=="object")a.look={};if(!Array.isArray(a.log))a.log=[];a.v=1;return a;}
var kept=0;
function save(){try{W.saveState();}catch(e){}kept++;var k=$("auKept");if(k){k.classList.add("flash");setTimeout(function(){k.classList.remove("flash");},700);paintKept();}}
function count(){var a=A();if(!a)return 0;var n=a.words.length+Object.keys(a.look).length;Object.keys(a.names).forEach(function(p){n+=Object.keys(a.names[p]||{}).length;});return n;}
function paintKept(){var k=$("auKept");if(!k)return;var n=count();k.querySelector("b").textContent=n?"All changes kept · "+n+(n===1?" change":" changes"):"All changes kept";}
/* every change goes into one log, each undoable: {id, at, kind, key, label, before, after, undone} */
function log(kind,k,label,before,after){var a=A();if(!a)return;a.log.unshift({id:uid(),at:Date.now(),kind:kind,key:k,label:label,before:before===undefined?null:before,after:after===undefined?null:after});if(a.log.length>400)a.log.length=400;}

/* ---------- words: what she rewrote, applied wherever Ingenium draws them, and never inside what is hers ---------- */
var DENY='textarea,input,select,option,script,style,noscript,pre,code,svg,iframe,[contenteditable=""],[contenteditable="true"],[contenteditable="plaintext-only"],.msg,#chatScroll,#chatDrawer,#notesLayer,#tabulaHost,#codeEditor,#ingAuthor,#auPop,#auPickBar,#ingLockDoor,[data-au-skip]';
var INDEX=new Map(),CHANGED=[],ORIG=new WeakMap(),OBS=null,PEND=[],PT=0;
function scopeOf(el){if(!el||!el.closest)return "other";var sec=el.closest("section.section");if(sec&&sec.id)return sec.id;if(el.closest("nav.dock"))return "nav";if(el.closest(".topbar,header,#topBar,.top-bar"))return "top";return "other";}
function scopeName(sc){if(sc==="all")return "Everywhere";if(sc==="nav")return "The side bar";if(sc==="top")return "The top bar";if(sc==="other")return "Other places";
  var p=String(sc).replace(/^page-/,"");var b=D.querySelector('.nav-btn[data-page="'+p+'"]');var t=b?clean(b.textContent):"";if(t)return t;var h=D.querySelector("#"+sc+" .page-title");return h?clean(h.textContent):p;}
function rebuild(){INDEX=new Map();var a=A();if(!a)return;a.words.forEach(function(w){if(!w||!w.from)return;var L=INDEX.get(w.from);if(!L)INDEX.set(w.from,L=[]);L.push(w);});
  if(INDEX.size&&!OBS){try{OBS=new MutationObserver(onMut);OBS.observe(D.body,{childList:true,subtree:true,characterData:true});}catch(e){}}
  if(!INDEX.size&&OBS){try{OBS.disconnect();}catch(e){}OBS=null;}}
function pick(t,el){var L=INDEX.get(t);if(!L)return null;var sc=scopeOf(el);for(var i=0;i<L.length;i++)if(L[i].scope===sc)return L[i];for(var j=0;j<L.length;j++)if(L[j].scope==="all")return L[j];return null;}
function doText(n){var raw=n.nodeValue;if(!raw)return;var t=clean(raw);if(!t||t.length>600)return;var el=n.parentElement;if(!el||el.closest(DENY))return;
  var o=ORIG.get(n),lead,tail;
  if(o){/* a node rewritten before: while it still shows the rewrite, the rewrite is checked (kept, changed, or taken back); anything
           else the page has written into it since is read afresh */
    if(t===clean(o.to)){var w0=pick(clean(o.raw),el);if(w0&&clean(w0.to)===t)return;
      if(!w0){n.nodeValue=o.raw;ORIG.delete(n);return;}lead=o.raw.match(/^\s*/)[0];tail=o.raw.match(/\s*$/)[0];o.to=w0.to;n.nodeValue=lead+w0.to+tail;return;}
    ORIG.delete(n);}
  var w=pick(t,el);if(!w)return;lead=raw.match(/^\s*/)[0];tail=raw.match(/\s*$/)[0];
  ORIG.set(n,{raw:raw,to:w.to});n.nodeValue=lead+w.to+tail;CHANGED.push(n);}
function doAttr(el){if(!el.getAttribute)return;var v=el.getAttribute("placeholder");if(!v)return;var t=clean(v);if(!INDEX.has(t))return;if(el.closest("#ingAuthor,#auPop"))return;var w=pick(t,el);if(!w)return;
  if(!el.__auPh)el.__auPh=v;el.setAttribute("placeholder",w.to);}
function walk(root){if(!root||!INDEX.size)return;if(root.nodeType===3){doText(root);return;}if(root.nodeType!==1)return;if(root.closest&&root.closest(DENY))return;
  try{var tw=D.createTreeWalker(root,NodeFilter.SHOW_TEXT,null),n;while((n=tw.nextNode()))doText(n);}catch(e){}
  try{if(root.matches&&root.matches("[placeholder]"))doAttr(root);[].forEach.call(root.querySelectorAll("[placeholder]"),doAttr);}catch(e){}}
function onMut(list){for(var i=0;i<list.length;i++){var m=list[i];if(m.type==="characterData")PEND.push(m.target);else for(var j=0;j<m.addedNodes.length;j++)PEND.push(m.addedNodes[j]);}
  if(!PT)PT=setTimeout(flush,0);}
function flush(){PT=0;var p=PEND;PEND=[];if(!INDEX.size)return;var seen=new Set();for(var i=0;i<p.length;i++){var n=p[i];if(seen.has(n)||!n.isConnected)continue;seen.add(n);walk(n);}}
/* a rewrite taken back: every node it changed gets its own words again, then the rest are applied afresh */
function restoreAll(){CHANGED.forEach(function(n){var o=ORIG.get(n);if(o&&n.isConnected){n.nodeValue=o.raw;}ORIG.delete(n);});CHANGED=[];
  [].forEach.call(D.querySelectorAll("[placeholder]"),function(el){if(el.__auPh){el.setAttribute("placeholder",el.__auPh);el.__auPh=null;}});}
function applyWords(){restoreAll();rebuild();if(INDEX.size)walk(D.body);}
function wordsSet(from,to,scope,quiet){var a=A();if(!a)return null;from=clean(from);to=String(to==null?"":to).replace(/\s+/g," ").trim();if(!from)return null;scope=scope||"all";
  var old=a.words.filter(function(w){return w.from===from&&w.scope===scope;})[0]||null,before=old?{from:old.from,to:old.to,scope:old.scope}:null;
  if(!to||to===from){if(!old)return null;a.words=a.words.filter(function(w){return w!==old;});if(!quiet)log("words",from+"|"+scope,"Restored “"+short(from)+"” ("+scopeName(scope)+")",before,null);}
  else if(old){if(old.to===to)return old;old.to=to;old.at=Date.now();if(!quiet)log("words",from+"|"+scope,"Rewrote “"+short(from)+"” as “"+short(to)+"” ("+scopeName(scope)+")",before,{from:from,to:to,scope:scope});}
  else{old={id:uid(),from:from,to:to,scope:scope,at:Date.now()};a.words.push(old);if(!quiet)log("words",from+"|"+scope,"Rewrote “"+short(from)+"” as “"+short(to)+"” ("+scopeName(scope)+")",null,{from:from,to:to,scope:scope});}
  applyWords();save();return old;}
function short(s){s=clean(s);return s.length>60?s.slice(0,57)+"…":s;}

/* ---------- names: Ingenium's own, and each page's name in the side bar, its title and its first line ---------- */
var BUILT={};
function navText(btn){for(var i=btn.childNodes.length-1;i>=0;i--){var n=btn.childNodes[i];if(n.nodeType===3&&clean(n.nodeValue))return n;}return null;}
function pagesList(){return [].slice.call(D.querySelectorAll("nav.dock .nav-btn[data-page]")).map(function(b){return b.getAttribute("data-page");}).filter(function(p,i,arr){return p&&arr.indexOf(p)===i&&$("page-"+p);});}
function builtOf(p){if(BUILT[p])return BUILT[p];var b=D.querySelector('nav.dock .nav-btn[data-page="'+p+'"]'),sec=$("page-"+p),t=sec&&sec.querySelector(":scope > .page-title"),l=sec&&sec.querySelector(":scope > .lede");
  var nt=b&&navText(b);BUILT[p]={nav:nt?clean(nt.nodeValue):"",title:t?clean(t.textContent):"",lede:l?clean(l.textContent):""};return BUILT[p];}
function applyNames(){var a=A();if(!a)return;pagesList().forEach(function(p){var bo=builtOf(p),nm=a.names[p]||{};
  var b=D.querySelector('nav.dock .nav-btn[data-page="'+p+'"]'),nt=b&&navText(b);if(nt){var v=nm.nav||bo.nav;if(clean(nt.nodeValue)!==v)nt.nodeValue=v;}
  var sec=$("page-"+p),t=sec&&sec.querySelector(":scope > .page-title"),l=sec&&sec.querySelector(":scope > .lede");
  if(t){var vt=nm.title||bo.title;if(clean(t.textContent)!==vt&&t.children.length===0)t.textContent=vt;}
  if(l){var vl=nm.lede||bo.lede;if(clean(l.textContent)!==vl&&l.children.length===0)l.textContent=vl;}});}
function nameSet(p,field,val,quiet){var a=A();if(!a)return;val=clean(val);var nm=a.names[p]||(a.names[p]={}),before=nm[field]||null,bo=builtOf(p);
  if(!val||val===bo[field]){if(!nm[field])return;delete nm[field];}else{if(nm[field]===val)return;nm[field]=val;}if(!Object.keys(nm).length)delete a.names[p];
  if(!quiet)log("names",p+"|"+field,(val&&val!==bo[field]?"Named ":"Gave back its own ")+({nav:"side bar name",title:"title",lede:"first line"})[field]+" of "+(bo.nav||p)+(val&&val!==bo[field]?": “"+short(val)+"”":""),before,nm[field]||null);
  applyNames();save();}
function appNameSet(v,quiet){var s=W.state;if(!s)return;v=clean(v);var before=s.appName||"";if(before===v)return;s.appName=v;try{W.applyBrand();}catch(e){}if(!quiet)log("appname","app",v?"Named Ingenium “"+short(v)+"”":"Gave Ingenium its own name back",before||null,v||null);save();}

/* ---------- look: the accent, the fonts, the depth ---------- */
function hexRgb(h){h=String(h||"").replace("#","");if(h.length===3)h=h.split("").map(function(c){return c+c;}).join("");var n=parseInt(h,16);if(!/^[0-9a-f]{6}$/i.test(h))return null;return [(n>>16)&255,(n>>8)&255,n&255];}
function rgbHex(r){return "#"+r.map(function(v){v=Math.max(0,Math.min(255,Math.round(v)));return (v<16?"0":"")+v.toString(16);}).join("");}
function mix(a,b,t){return [a[0]+(b[0]-a[0])*t,a[1]+(b[1]-a[1])*t,a[2]+(b[2]-a[2])*t];}
var FONTS={serif:{"":"Ingenium's own (Iowan Old Style, Palatino)",georgia:"Georgia","palatino":"Palatino","baskerville":"Baskerville",garamond:"Garamond",sans:"The same as the text"},
  sans:{"":"Ingenium's own (the system's)",avenir:"Avenir Next, Segoe UI",helvetica:"Helvetica Neue, Arial",georgia:"Georgia (a serif)",verdana:"Verdana, Tahoma"}};
var STACK={georgia:'Georgia,"Times New Roman",serif',palatino:'Palatino,"Palatino Linotype","Book Antiqua",Georgia,serif',baskerville:'Baskerville,"Baskerville Old Face","Libre Baskerville",Georgia,serif',
  garamond:'Garamond,"EB Garamond","Adobe Garamond Pro",Georgia,serif',avenir:'"Avenir Next",Avenir,"Segoe UI",Roboto,Helvetica,Arial,sans-serif',helvetica:'"Helvetica Neue",Helvetica,Arial,sans-serif',verdana:'Verdana,Tahoma,Geneva,sans-serif'};
var PRESETS=[["Ingenium's own",{}],["Carpe Diem blue",{accent:"#1f5f9e"}],["Forest",{accent:"#2f6b4f",serif:"garamond"}],["Ink",{accent:"#2c3e66",serif:"baskerville",depth:"soft"}],["Rose",{accent:"#a2456a"}],["Amber",{accent:"#a0661c",serif:"palatino"}]];
function lookCss(L){var css="";var ac=hexRgb(L.accent);
  if(ac){var deep=rgbHex(mix(ac,[0,0,0],0.26)),bright=rgbHex(mix(ac,[255,255,255],0.22)),night=rgbHex(mix(ac,[255,255,255],0.45)),nightDeep=rgbHex(mix(ac,[255,255,255],0.25)),rgb=ac.join(",");
    css+=":root{--accent:"+L.accent+";--accent-deep:"+deep+";--accent-bright:"+bright+";--accent-soft:rgba("+rgb+",0.14);--accent-softer:rgba("+rgb+",0.06);--accent-line-rgb:"+rgb+";--fill-hi:"+bright+";--fill-mid:"+L.accent+";--fill-lo:"+deep+"}\n";
    css+="body[data-theme=\"night\"]{--accent:"+night+";--accent-deep:"+nightDeep+";--accent-bright:"+night+"}\n";
    css+="#page-settings,#page-models,#page-blend,#page-guide,#page-focus{--rm-pa:"+bright+";--rm-pb:"+deep+";--rm-pedge:"+rgbHex(mix(ac,[0,0,0],0.4))+"}\n";}
  if(L.serif){var s=L.serif==="sans"?"var(--sans)":STACK[L.serif];if(s)css+=":root{--serif:"+s+"}\n";}
  if(L.sans&&STACK[L.sans])css+=":root{--sans:"+STACK[L.sans]+"}\nbody{font-family:var(--sans)}\n";
  if(L.depth==="soft")css+=":root{--pop:inset 0 1px 0 rgba(255,255,255,.7),0 1px 0 rgba(40,20,70,.08),0 3px 8px rgba(40,20,70,.08);--pop-hi:inset 0 1px 0 rgba(255,255,255,.8),0 2px 0 rgba(40,20,70,.08),0 6px 14px rgba(40,20,70,.1)}\n";
  if(L.depth==="deep")css+=":root{--pop:inset 0 1px 0 rgba(255,255,255,.85),inset 0 -2px 0 rgba(40,20,70,.1),0 3.5px 0 rgba(40,20,70,.18),0 10px 18px rgba(40,20,70,.16),0 22px 34px rgba(40,20,70,.12);--pop-hi:inset 0 1px 0 rgba(255,255,255,.9),0 5px 0 rgba(40,20,70,.16),0 14px 24px rgba(40,20,70,.2),0 28px 44px rgba(40,20,70,.14)}\n";
  return css;}
function applyLook(){var a=A();if(!a)return;var st=$("auLook");if(!st){st=mk("style");st.id="auLook";D.head.appendChild(st);}var css=lookCss(a.look);if(st.textContent!==css)st.textContent=css;}
function lookSet(k,v,quiet){var a=A();if(!a)return;var before=a.look[k]||null;if(!v){if(!a.look[k])return;delete a.look[k];}else{if(a.look[k]===v)return;a.look[k]=v;}
  if(!quiet)log("look",k,(v?"Set ":"Gave back ")+({accent:"the accent colour",serif:"the headings' font",sans:"the text's font",depth:"the depth"})[k]+(v?": "+(k==="accent"?v:(FONTS[k]&&FONTS[k][v])||v):""),before,v||null);applyLook();save();}
function lookPreset(L){var a=A();if(!a)return;var before=JSON.parse(JSON.stringify(a.look));a.look=JSON.parse(JSON.stringify(L||{}));log("lookall","look","Chose a look: "+(lookName(a.look)),before,JSON.parse(JSON.stringify(a.look)));applyLook();save();}
function lookName(L){for(var i=0;i<PRESETS.length;i++)if(JSON.stringify(PRESETS[i][1])===JSON.stringify(L))return PRESETS[i][0];return "your own";}

/* ---------- undo, export, import, reset ---------- */
function undo(id){var a=A();if(!a)return;var e=a.log.filter(function(x){return x.id===id;})[0];if(!e||e.undone)return;
  if(e.kind==="words"){var p=String(e.key).split("|"),from=p[0],sc=p.slice(1).join("|");if(e.before)wordsSet(e.before.from,e.before.to,e.before.scope,true);else wordsSet(from,"",sc,true);}
  else if(e.kind==="names"){var q=String(e.key).split("|");nameSet(q[0],q[1],e.before||"",true);}
  else if(e.kind==="appname"){appNameSet(e.before||"",true);}
  else if(e.kind==="look"){lookSet(e.key,e.before||"",true);}
  else if(e.kind==="lookall"){a.look=JSON.parse(JSON.stringify(e.before||{}));applyLook();}
  else if(e.kind==="reset"||e.kind==="import"){var b=e.before||{};a.words=b.words||[];a.names=b.names||{};a.look=b.look||{};if(W.state&&b.layers)W.state.layers=b.layers;if(b.appName!==undefined)appNameSet(b.appName||"",true);applyAll();}
  e.undone=Date.now();save();paintRoom();toast("Undone: "+e.label);}
function snapshot(){var a=A();return {words:JSON.parse(JSON.stringify(a.words)),names:JSON.parse(JSON.stringify(a.names)),look:JSON.parse(JSON.stringify(a.look)),layers:W.state&&W.state.layers?JSON.parse(JSON.stringify(W.state.layers)):null,appName:(W.state&&W.state.appName)||""};}
function exportAll(){var a=A();if(!a)return;var data={kind:"ingenium-author",v:1,made:new Date().toISOString(),version:(function(){try{return W.ING_VERSION||"";}catch(e){return "";}})(),author:{words:a.words,names:a.names,look:a.look},appName:(W.state&&W.state.appName)||"",layers:(W.state&&W.state.layers)||null};
  var text=JSON.stringify(data,null,1),d=new Date(),name="Ingenium author studio "+d.getFullYear()+"-"+String(d.getMonth()+1).padStart(2,"0")+"-"+String(d.getDate()).padStart(2,"0")+".json";
  try{if(typeof W.saveFileNative==="function"){Promise.resolve(W.saveFileNative(name,"application/json",text)).then(function(){toast("Exported: "+name);});return text;}}catch(e){}
  var l=mk("a");l.href=URL.createObjectURL(new Blob([text],{type:"application/json"}));l.download=name;D.body.appendChild(l);l.click();setTimeout(function(){URL.revokeObjectURL(l.href);l.remove();},4000);return text;}
function importText(text){var d=null;try{d=JSON.parse(text);}catch(e){}if(!d||d.kind!=="ingenium-author"||!d.author){toast("This file is not an Author Studio export.");return false;}
  var a=A(),before=snapshot();a.words=Array.isArray(d.author.words)?d.author.words.filter(function(w){return w&&w.from&&w.to;}):[];a.names=d.author.names&&typeof d.author.names==="object"?d.author.names:{};a.look=d.author.look&&typeof d.author.look==="object"?d.author.look:{};
  if(d.layers&&W.state)W.state.layers=d.layers;if(typeof d.appName==="string")appNameSet(d.appName,true);
  log("import","all","Imported the studio's changes from a file ("+a.words.length+" words, "+Object.keys(a.names).length+" pages named, "+Object.keys(a.look).length+" looks)",before,null);applyAll();save();paintRoom();return true;}
function importAll(){var f=mk("input");f.type="file";f.accept=".json,application/json";f.style.display="none";D.body.appendChild(f);f.addEventListener("change",function(){var file=f.files&&f.files[0];f.remove();if(!file)return;
  var r=new FileReader();r.onload=function(){if(importText(String(r.result||"")))toast("Imported. Every change from the file is in place.");};r.readAsText(file);});f.click();}
function resetAll(){var a=A();if(!a)return;var go=function(){var before=snapshot();a.words=[];a.names={};a.look={};appNameSet("",true);log("reset","all","Reset all: Ingenium as it was built",before,null);applyAll();save();paintRoom();toast("Ingenium is as it was built. Undo is in the change log.");};
  try{if(W.ingConfirm){Promise.resolve(W.ingConfirm("Reset all of the studio's changes? Every rewritten word, name and look goes back to how Ingenium was built. Your layers stay. The change log keeps the reset, and Undo brings it all back.",null,{yes:"Reset all",no:"Keep them"})).then(function(ok){if(ok)go();});return;}}catch(e){}
  if(W.confirm("Reset all of the studio's changes? Undo in the change log brings them back."))go();}
function applyAll(){try{applyLook();}catch(e){}try{applyNames();}catch(e){}try{applyWords();}catch(e){}try{if(W.IngWorkshop&&IngWorkshop.apply)IngWorkshop.apply();}catch(e){}}

/* ---------- the studio ---------- */
var ROOMS=[
  {k:"editor",t:"The Editor",i:svg('<path d="M4 7h16M4 12h10M4 17h7"/><circle cx="18" cy="16" r="3"/>'),h:"The Editor",s:"Where to begin: choose what you are changing, and the Editor hands you the room that changes it."},
  {k:"words",t:"Words",i:svg('<path d="M5 6h14M9 6v12M15 10h4M17 10v8"/>'),h:"Words",s:"Every word Ingenium says is yours to change. Press words on the page and rewrite them, or find them here; restoring always brings back the words it was built with."},
  {k:"names",t:"Names",i:svg('<path d="M20 12l-8 8-8-8V4h8z"/><circle cx="8.5" cy="8.5" r="1.5"/>'),h:"Names",s:"Ingenium's own name, and each page's name in the side bar, its title and the line under it."},
  {k:"look",t:"Look",i:svg('<circle cx="12" cy="12" r="8.5"/><circle cx="8.5" cy="10" r="1.3"/><circle cx="12" cy="7.5" r="1.3"/><circle cx="15.5" cy="10" r="1.3"/><path d="M12 20.5a2.5 2.5 0 0 1 0-5h1.5"/>'),h:"Look",s:"The colour that runs through Ingenium, the fonts it writes in, and how deep its keys and cards stand. Everything changes at once, behind the studio."},
  {k:"checks",t:"Checks and additions",i:svg('<path d="M9 12l2 2 4-4"/><path d="M12 3l7 3v5c0 4.5-3 8.3-7 10-4-1.7-7-5.5-7-10V6z"/>'),h:"Checks and additions",s:"Check Ingenium from end to end, the errors since it started, your own layers (pages, sections, scripts, styles, hidden cards) and Ingenium's own page, changed by you or a model."},
  {k:"log",t:"Change log",i:svg('<path d="M12 7v5l3 2"/><circle cx="12" cy="12" r="8.5"/>'),h:"Change log",s:"Every change, newest first. Each one can be undone; nothing here is lost."}];
var CUR="editor";
function build(){if($("ingAuthor"))return $("ingAuthor");var r=mk("div");r.id="ingAuthor";r.hidden=true;r.setAttribute("role","dialog");r.setAttribute("aria-modal","true");r.setAttribute("aria-label","Author Studio");
  var top=mk("div","au-top"),brand=mk("div","au-brand"),seal=mk("span","au-seal");seal.innerHTML=PEN;brand.appendChild(seal);brand.appendChild(mk("span","au-title","Author Studio"));top.appendChild(brand);
  var kp=mk("span","au-kept");kp.id="auKept";kp.appendChild(mk("i"));kp.appendChild(mk("b",null,"All changes kept"));kp.appendChild(mk("span",null,"· on this device"));top.appendChild(kp);
  var keys=mk("div","au-keys");var dock=pill("","Show Ingenium beside",function(){setDock(!r.classList.contains("au-dock"));});dock.id="auDockKey";keys.appendChild(dock);
  keys.appendChild(pill("","Export all",function(){exportAll();},"Every rewritten word, name and look, and your layers, in one file"));keys.appendChild(pill("","Import all",function(){importAll();},"Brings back an export"));
  keys.appendChild(pill("bad","Reset all",function(){resetAll();},"Ingenium as it was built; Undo is in the change log"));keys.appendChild(pill("prim","Close",function(){close();}));top.appendChild(keys);r.appendChild(top);
  var shell=mk("div","au-shell"),rail=mk("nav","au-rail");rail.id="auRail";rail.setAttribute("role","tablist");rail.setAttribute("aria-label","The studio's rooms");rail.setAttribute("aria-orientation","vertical");
  ROOMS.forEach(function(R){var b=mk("button","au-room");b.type="button";b.id="auR-"+R.k;b.setAttribute("role","tab");b.setAttribute("data-room",R.k);b.innerHTML=R.i;b.appendChild(mk("span",null,R.t));var n=mk("span","n");n.id="auN-"+R.k;b.appendChild(n);b.setAttribute("data-t",R.t);
    b.addEventListener("click",function(){room(R.k);});rail.appendChild(b);});
  rail.addEventListener("keydown",function(e){if(e.key!=="ArrowDown"&&e.key!=="ArrowUp")return;var bs=[].slice.call(rail.querySelectorAll(".au-room")),i=bs.indexOf(D.activeElement);if(i<0)return;e.preventDefault();var j=(i+(e.key==="ArrowDown"?1:-1)+bs.length)%bs.length;room(bs[j].getAttribute("data-room"));bs[j].focus();});
  var pane=mk("div","au-pane");pane.id="auPane";var mast=mk("div","au-mast");mast.appendChild(mk("div","au-kick","Author Studio"));var h=mk("h2","au-h");h.id="auH";mast.appendChild(h);var s=mk("p","au-sub");s.id="auSub";mast.appendChild(s);pane.appendChild(mast);
  var body=mk("div","au-room-body");body.id="auRoom";pane.appendChild(body);shell.appendChild(rail);shell.appendChild(pane);r.appendChild(shell);
  /* what the Workshop held (Check Ingenium, Errors, Your layers, Your page) lives in its own room, whole */
  var hold=mk("div");hold.id="auChecksHold";hold.hidden=true;r.appendChild(hold);
  r.addEventListener("keydown",function(e){if(e.key==="Escape"&&!$("auPop").hidden){return;}if(e.key==="Escape"&&!PICK){e.preventDefault();close();}});
  D.body.appendChild(r);
  var pop=mk("div");pop.id="auPop";pop.hidden=true;pop.setAttribute("role","dialog");pop.setAttribute("aria-label","Rewrite these words");D.body.appendChild(pop);
  var hi=mk("div");hi.id="auHi";D.body.appendChild(hi);
  var bar=mk("div");bar.id="auPickBar";bar.hidden=true;bar.appendChild(mk("span",null,"Press any words in Ingenium to rewrite them. Esc, or Done, to stop."));var done=mk("button",null,"Done");done.type="button";done.onclick=function(){pickMode(false);};bar.appendChild(done);D.body.appendChild(bar);
  return r;}
/* a room's name shows as a tip under the pointer only when the rail is narrowed to its icons (docked, or a narrow window);
   with the names written beside the icons a tip would only say them again */
function railTips(){var r=$("ingAuthor");if(!r)return;var narrow=r.classList.contains("au-dock");try{narrow=narrow||W.matchMedia("(max-width:820px)").matches;}catch(e){}
  [].forEach.call(r.querySelectorAll(".au-room"),function(b){var t=b.getAttribute("data-t")||"";if(narrow&&t)b.title=t;else b.removeAttribute("title");});}
try{var MQ=W.matchMedia("(max-width:820px)");if(MQ.addEventListener)MQ.addEventListener("change",railTips);else if(MQ.addListener)MQ.addListener(railTips);}catch(e){}
function setDock(on){var r=build();r.classList.toggle("au-dock",!!on);D.documentElement.classList.toggle("au-docked",!!on);var k=$("auDockKey");if(k)k.textContent=on?"The whole studio":"Show Ingenium beside";railTips();}
function open(rm){var r=build();if(rm)CUR=rm;r.hidden=false;railTips();D.documentElement.classList.add("au-open");room(CUR);paintKept();try{setTimeout(function(){var b=$("auR-"+CUR);if(b)b.focus();},30);}catch(e){}}
function close(){pickMode(false);var r=$("ingAuthor");if(!r)return;r.hidden=true;setDock(false);D.documentElement.classList.remove("au-open");popClose();putBack();}
/* the Workshop's body (modules/r226.js paints it by its id, wherever it is) */
/* the Workshop's own styles were written under #wsStudio (its room of Settings): the same rules are given to the studio's Checks room */
function wsStyles(){if($("r236-ws"))return;var css="";["r226-css","r227-css"].forEach(function(id){var st=$(id);if(st)css+=st.textContent.replace(/#wsStudio\b/g,"#auChecks")+"\n";});if(!css)return;var s=mk("style");s.id="r236-ws";s.textContent=css;D.head.appendChild(s);}
function takeChecks(host){var b=$("wsBody");hookChecks();wsStyles();var w=$("auChecks");if(!w){w=mk("div");w.id="auChecks";}if(w.parentNode!==host)host.appendChild(w);if(b&&b.parentNode!==w){w.appendChild(b);}try{if(b&&!b.firstChild&&W.IngWorkshop&&IngWorkshop.paint)IngWorkshop.paint();}catch(e){}}
function putBack(){var b=$("wsBody"),h=$("auChecksHold");if(b&&h&&b.parentNode!==h)h.appendChild(b);}
/* Find and fix with a model opens Code: the studio steps aside first, so Code is seen with the report in its message box */
function hookChecks(){var b=$("wsBody");if(b&&!b.__au){b.__au=1;b.addEventListener("click",function(e){var t=e.target&&e.target.closest&&e.target.closest("button");if(t&&/^Find and fix/.test(clean(t.textContent)))close();},true);}
  try{var I=W.IngWorkshop;if(I&&typeof I.fix==="function"&&!I.fix.__r236){var of=I.fix;I.fix=function(){close();return of.apply(this,arguments);};I.fix.__r236=1;}}catch(e){}}
function room(k){CUR=k;var R=ROOMS.filter(function(x){return x.k===k;})[0]||ROOMS[0];[].forEach.call(D.querySelectorAll("#auRail .au-room"),function(b){var on=b.getAttribute("data-room")===R.k;b.setAttribute("aria-selected",on?"true":"false");b.tabIndex=on?0:-1;});
  $("auH").textContent=R.h;$("auSub").textContent=R.s;paintRoom();var p=$("auPane");if(p)p.scrollTop=0;}
function counts(){var a=A();if(!a)return;var n={words:a.words.length,names:Object.keys(a.names).reduce(function(s,p){return s+Object.keys(a.names[p]).length;},0)+((W.state&&W.state.appName)?1:0),look:Object.keys(a.look).length,log:a.log.filter(function(e){return !e.undone;}).length};
  Object.keys(n).forEach(function(k){var e=$("auN-"+k);if(e)e.textContent=n[k]?String(n[k]):"";});}
function paintRoom(){var body=$("auRoom");if(!body)return;putBack();body.innerHTML="";counts();paintKept();
  if(CUR==="editor")paintEditor(body);else if(CUR==="words")paintWords(body);else if(CUR==="names")paintNames(body);else if(CUR==="look")paintLook(body);else if(CUR==="checks")takeChecks(body);else if(CUR==="log")paintLog(body);}
function card(title,lede){var c=mk("div","au-card");if(title)c.appendChild(mk("h3",null,title));if(lede)c.appendChild(mk("p",null,lede));return c;}
function paintEditor(body){var c=card("What are you changing","Choose the kind of change, and the Editor opens the room that makes it. Every room is also in the rail on the left, so when you know where to go, go straight there.");
  var g=mk("div","au-kinds");[["words","The words it says","Every sentence Ingenium speaks: its pages, its keys, its help. Press them on the page, or find them."],["names","Its names","Ingenium's own name, and the name of each page, its title and its first line."],
    ["look","The way it looks","Its colour, its fonts and how deep its keys stand, with ready looks to start from."],["checks","How it works inside","Check it from end to end, read its errors, add your own pages, sections, scripts and styles, or change its own page with a model."]].forEach(function(x,i){
    var b=mk("button","au-kind");b.type="button";b.style.setProperty("--i",i);b.appendChild(mk("b",null,x[1]));b.appendChild(mk("span",null,x[2]));b.appendChild(mk("em",null,"Open "+(ROOMS.filter(function(R){return R.k===x[0];})[0].t)+" ›"));b.addEventListener("click",function(){room(x[0]);});g.appendChild(b);});
  c.appendChild(g);body.appendChild(c);
  var q=card("Straight to the page","Ingenium stands beside the studio, and every word you press can be rewritten where it is.");var k=mk("div","au-keys");k.appendChild(key("primary","Edit words on the page",function(){pickMode(true);}));q.appendChild(k);body.appendChild(q);
  var a=A(),recent=a?a.log.slice(0,5):[];var l=card("Lately",recent.length?null:"No changes yet. Whatever you change will be listed here and in the change log, each with Undo.");recent.forEach(function(e){l.appendChild(logRow(e));});body.appendChild(l);}
function logRow(e){var r=mk("div","au-row"+(e.undone?" undone":""));var w=mk("div","w");w.appendChild(mk("div",null,e.label));w.appendChild(mk("div","when",when(e.at)+(e.undone?" · undone "+when(e.undone):"")));r.appendChild(w);
  if(!e.undone)r.appendChild(key("small ghost","Undo",function(){undo(e.id);}));return r;}
function paintWords(body){var a=A();var top=card("Rewrite words","Press Edit words on the page: Ingenium stands beside the studio, and any words you press open here to be rewritten, on that page or everywhere. Or find them below, across every page.");
  var k=mk("div","au-keys");k.appendChild(key("primary","Edit words on the page",function(){pickMode(true);}));top.appendChild(k);body.appendChild(top);
  var f=card("Find words","Every sentence on every page of Ingenium, its keys and its help. Your own writing (chats, notes, documents) is not searched and never changed.");var inp=mk("input","au-search");inp.type="search";inp.placeholder="Words to find, for example: Break it down";inp.id="auFind";
  var hits=mk("div","au-hits");hits.id="auHits";var T=0;inp.addEventListener("input",function(){clearTimeout(T);T=setTimeout(function(){findPaint(inp.value,hits);},180);});f.appendChild(inp);f.appendChild(hits);body.appendChild(f);
  var y=card("Your words",a&&a.words.length?null:"None yet. Each rewrite stays here with where it is made; Restore brings back the words Ingenium was built with.");y.id="auYours";
  (a?a.words.slice().sort(function(x,z){return (z.at||0)-(x.at||0);}):[]).forEach(function(w){var r=mk("div","au-row"),d=mk("div","w");var wh=mk("span","where",scopeName(w.scope));d.appendChild(wh);d.appendChild(mk("span","from",w.from));d.appendChild(D.createTextNode(" → "));d.appendChild(mk("span","to",w.to));r.appendChild(d);
    r.appendChild(key("small ghost","Rewrite",function(){popOpen(w.from,w.scope,null,w.to);}));r.appendChild(key("small ghost","Restore",function(){wordsSet(w.from,"",w.scope);paintRoom();}));y.appendChild(r);});body.appendChild(y);}
/* every sentence Ingenium draws, page by page, searched; what is hers is left out */
function findPaint(q,host){host.innerHTML="";q=clean(q).toLowerCase();if(q.length<2)return;var seen={},out=[];
  [].forEach.call(D.querySelectorAll("section.section, nav.dock"),function(root){try{var tw=D.createTreeWalker(root,NodeFilter.SHOW_TEXT,null),n;while((n=tw.nextNode())){var t=clean(n.nodeValue);if(t.length<2||t.length>400)continue;if(t.toLowerCase().indexOf(q)<0)continue;
    var el=n.parentElement;if(!el||el.closest(DENY))continue;var sc=scopeOf(el),orig=(ORIG.get(n)||{}).raw;var from=orig?clean(orig):t,kk=sc+"|"+from;if(seen[kk])continue;seen[kk]=1;out.push({from:from,now:t,scope:sc});if(out.length>=80)break;}}catch(e){}});
  if(!out.length){host.appendChild(mk("p","au-note","Nothing on Ingenium's pages says that."));return;}
  out.forEach(function(h){var r=mk("div","au-row"),d=mk("div","w");d.appendChild(mk("span","where",scopeName(h.scope)));d.appendChild(mk("span",null,h.now));r.appendChild(d);r.appendChild(key("small ghost","Rewrite",function(){popOpen(h.from,h.scope,null,h.now!==h.from?h.now:"");}));host.appendChild(r);});}
function paintNames(body){var s=W.state||{};var c=card("Ingenium's name","Its name in the top bar, the window and the welcome door. Empty brings back Ingenium.");
  var f=mk("div","au-field");f.appendChild(mk("label",null,"The app's name"));var i=mk("input");i.type="text";i.id="auAppName";i.value=s.appName||"";i.placeholder="Ingenium";i.addEventListener("change",function(){appNameSet(i.value);paintKept();counts();});f.appendChild(i);c.appendChild(f);body.appendChild(c);
  var p=card("Each page","Its name in the side bar, its title, and the line under the title. Empty brings back the words it was built with.");var g=mk("div","au-names");var a=A();
  pagesList().forEach(function(pg){var bo=builtOf(pg),nm=(a&&a.names[pg])||{},box=mk("div","au-card");box.style.boxShadow="none";box.appendChild(mk("h3",null,bo.nav||pg));
    [["nav","In the side bar"],["title","Its title"],["lede","The line under it"]].forEach(function(fd){if(fd[0]!=="nav"&&!bo[fd[0]])return;var row=mk("div","au-field");row.appendChild(mk("label",null,fd[1]));var x=mk("input");x.type="text";x.value=nm[fd[0]]||"";x.placeholder=bo[fd[0]];x.setAttribute("data-page",pg);x.setAttribute("data-field",fd[0]);
      x.addEventListener("change",function(){nameSet(pg,fd[0],x.value);counts();});row.appendChild(x);box.appendChild(row);});g.appendChild(box);});p.appendChild(g);body.appendChild(p);}
function paintLook(body){var a=A();var L=(a&&a.look)||{};var pc=card("Ready looks","A look to start from; each part can be changed below. Ingenium's own brings back the look it was built with.");var ps=mk("div","au-presets");
  PRESETS.forEach(function(P){var b=mk("button","au-swatch");b.type="button";var dot=mk("i");dot.style.background=P[1].accent||"#6a3fb5";b.appendChild(dot);b.appendChild(D.createTextNode(P[0]));b.addEventListener("click",function(){lookPreset(P[1]);paintRoom();});ps.appendChild(b);});pc.appendChild(ps);body.appendChild(pc);
  var c=card("Colour, fonts and depth",null);
  var f1=mk("div","au-field");f1.appendChild(mk("label",null,"The accent colour"));var col=mk("input");col.type="color";col.id="auAccent";col.value=L.accent||"#6a3fb5";col.addEventListener("change",function(){lookSet("accent",col.value.toLowerCase()==="#6a3fb5"?"":col.value);counts();});f1.appendChild(col);c.appendChild(f1);
  [["serif","The headings' font"],["sans","The text's font"]].forEach(function(x){var f=mk("div","au-field");f.appendChild(mk("label",null,x[1]));var s=mk("select");s.id="auF-"+x[0];Object.keys(FONTS[x[0]]).forEach(function(k){var o=mk("option",null,FONTS[x[0]][k]);o.value=k;if((L[x[0]]||"")===k)o.selected=true;s.appendChild(o);});
    s.addEventListener("change",function(){lookSet(x[0],s.value);counts();});f.appendChild(s);c.appendChild(f);});
  var f3=mk("div","au-field");f3.appendChild(mk("label",null,"Depth of keys and cards"));var d=mk("select");d.id="auDepth";[["","Ingenium's own"],["soft","Soft"],["deep","Deep"]].forEach(function(x){var o=mk("option",null,x[1]);o.value=x[0];if((L.depth||"")===x[0])o.selected=true;d.appendChild(o);});
  d.addEventListener("change",function(){lookSet("depth",d.value);counts();});f3.appendChild(d);c.appendChild(f3);
  c.appendChild(mk("p","au-note","The colour's darker and lighter shades are made from it, for the day and the night looks. Text size and spacing are in Display and in Settings, under Support."));body.appendChild(c);}
function paintLog(body){var a=A();var c=card(null,a&&a.log.length?null:"No changes yet.");if(a&&a.log.length){var k=mk("div","au-keys");var last=a.log.filter(function(e){return !e.undone;})[0];if(last)k.appendChild(key("ghost","Undo the last change",function(){undo(last.id);}));c.appendChild(k);}
  (a?a.log:[]).forEach(function(e){c.appendChild(logRow(e));});body.appendChild(c);}

/* ---------- picking words on the page, and the small editor ---------- */
var PICK=false,PEL=null;
function textNodeOf(el){if(!el||el.closest(DENY))return null;var best=null;for(var i=0;i<el.childNodes.length;i++){var n=el.childNodes[i];if(n.nodeType===3&&clean(n.nodeValue).length>=1&&(!best||clean(n.nodeValue).length>clean(best.nodeValue).length))best=n;}return best;}
function target(x,y){var el=D.elementFromPoint(x,y);for(var d=0;el&&d<6;d++,el=el.parentElement){if(el.closest&&el.closest("#ingAuthor,#auPop,#auPickBar"))return null;var n=textNodeOf(el);if(n)return {el:el,n:n};}return null;}
function onMove(e){if(!PICK)return;var t=target(e.clientX,e.clientY),hi=$("auHi");if(!t){hi.style.display="none";PEL=null;return;}PEL=t;var r=t.el.getBoundingClientRect();hi.style.display="block";hi.style.left=(r.left-3)+"px";hi.style.top=(r.top-3)+"px";hi.style.width=(r.width+6)+"px";hi.style.height=(r.height+6)+"px";}
function onClick(e){if(!PICK)return;if(e.target&&e.target.closest&&e.target.closest("#ingAuthor,#auPop,#auPickBar"))return;e.preventDefault();e.stopPropagation();if(e.stopImmediatePropagation)e.stopImmediatePropagation();
  var t=target(e.clientX,e.clientY);if(!t)return;var o=ORIG.get(t.n),now=clean(t.n.nodeValue),from=o?clean(o.raw):now;popOpen(from,scopeOf(t.el),t.el,from!==now?now:"");}
function onKey(e){if(e.key==="Escape"&&PICK&&$("auPop").hidden){e.preventDefault();pickMode(false);}}
function swallow(e){if(!PICK)return;if(e.target&&e.target.closest&&e.target.closest("#ingAuthor,#auPop,#auPickBar"))return;e.preventDefault();e.stopPropagation();if(e.stopImmediatePropagation)e.stopImmediatePropagation();}
function pickMode(on){on=!!on;if(on===PICK)return;PICK=on;var bar=$("auPickBar"),hi=$("auHi");build();
  if(on){setDock(true);D.documentElement.classList.add("au-picking");$("auPickBar").hidden=false;D.addEventListener("mousemove",onMove,true);D.addEventListener("click",onClick,true);D.addEventListener("mousedown",swallow,true);D.addEventListener("mouseup",swallow,true);D.addEventListener("keydown",onKey,true);}
  else{D.documentElement.classList.remove("au-picking");if(bar)bar.hidden=true;if(hi)hi.style.display="none";D.removeEventListener("mousemove",onMove,true);D.removeEventListener("click",onClick,true);D.removeEventListener("mousedown",swallow,true);D.removeEventListener("mouseup",swallow,true);D.removeEventListener("keydown",onKey,true);}}
function popOpen(from,scope,el,cur){var p=$("auPop")||(build(),$("auPop"));p.innerHTML="";var a=A(),ex=a.words.filter(function(w){return w.from===from&&(w.scope===scope||w.scope==="all");})[0];
  p.appendChild(mk("h4",null,"Rewrite these words"));p.appendChild(mk("div","au-note",scope==="all"?"Everywhere they appear":"On "+scopeName(scope)+(ex&&ex.scope==="all"?" (rewritten everywhere now)":"")));
  p.appendChild(mk("div","orig",from));var ta=mk("textarea");ta.id="auPopText";ta.value=(ex&&ex.to)||cur||from;ta.setAttribute("aria-label","The new words");p.appendChild(ta);
  var lb=mk("label"),cb=mk("input");cb.type="checkbox";cb.id="auPopAll";cb.checked=!!(ex&&ex.scope==="all")||scope==="all";lb.appendChild(cb);lb.appendChild(D.createTextNode("Everywhere these exact words appear, on every page"));p.appendChild(lb);
  var k=mk("div","k");if(ex)k.appendChild(key("ghost","Restore the original",function(){wordsSet(from,"",ex.scope);popClose();paintRoom();}));k.appendChild(key("ghost","Cancel",function(){popClose();}));
  k.appendChild(key("primary","Keep it",function(){var sc=cb.checked?"all":(scope==="all"?"all":scope);if(ex&&ex.scope!==sc)wordsSet(from,"",ex.scope,true);wordsSet(from,ta.value,sc);popClose();paintRoom();toast("Kept: the new words are in place.");}));p.appendChild(k);
  p.hidden=false;var r=el&&el.getBoundingClientRect?el.getBoundingClientRect():null,w=Math.min(440,innerWidth-24),x=r?Math.min(Math.max(12,r.left),innerWidth-w-12):(innerWidth-w)/2,y=r?(r.bottom+10+230>innerHeight?Math.max(12,r.top-250):r.bottom+10):innerHeight*0.25;
  p.style.left=x+"px";p.style.top=y+"px";setTimeout(function(){try{ta.focus();ta.select();}catch(e){}},20);
  p.onkeydown=function(e){if(e.key==="Escape"){e.preventDefault();e.stopPropagation();popClose();}if(e.key==="Enter"&&(e.metaKey||e.ctrlKey)){e.preventDefault();k.lastChild.click();}};}
function popClose(){var p=$("auPop");if(p)p.hidden=true;}

/* ---------- the door in Settings, the pen in the top bar, and go("workshop") ---------- */
function door(){var st=$("wsStudio");if(!st||st.querySelector(".au-door"))return;var d=mk("div","card au-door"),t=mk("div","t");t.appendChild(mk("h2","sec","The Author Studio"));
  t.appendChild(mk("p","small muted","The room behind the rooms. Every word Ingenium says, its names, its colour and fonts, its checks, your own pages and scripts, and its own page are yours to change there; every change is kept, listed and undoable."));d.appendChild(t);
  var k=mk("div","k");var o=key("primary","Open the Author Studio",function(){open("editor");});o.id="auOpenKey";k.appendChild(o);k.appendChild(key("ghost","Edit words on the page",function(){open("words");pickMode(true);}));d.appendChild(k);st.insertBefore(d,st.firstChild);}
function topKey(){if($("auTopKey"))return;var help=null;[].forEach.call(D.querySelectorAll("button"),function(b){if(!help&&/^Help/.test(clean(b.textContent))&&b.offsetParent&&b.getBoundingClientRect().top<60)help=b;});if(!help||!help.parentNode)return;
  var b=mk("button",help.className);b.type="button";b.id="auTopKey";b.title="The Author Studio: change Ingenium's words, names and look";b.innerHTML=PEN;b.appendChild(D.createTextNode("Studio"));b.addEventListener("click",function(){open();});help.parentNode.insertBefore(b,help);}
function wrapGo(){var og=W.go;if(typeof og!=="function"||og.__r236)return;var ng=function(p){if(p==="workshop"||p==="author"){try{var s=og.call(this,"settings");}catch(e){}open(p==="workshop"?"checks":undefined);return s;}var r=og.apply(this,arguments);try{if(p==="settings")door();applyNames();}catch(e){}return r;};
  try{Object.keys(og).forEach(function(k){ng[k]=og[k];});}catch(e){}ng.__r236=true;W.go=go=ng;}
function boot(){try{build();}catch(e){}try{door();}catch(e){}try{hookChecks();}catch(e){}try{topKey();}catch(e){}try{wrapGo();}catch(e){}try{var h=$("auChecksHold"),b=$("wsBody"),r=$("ingAuthor");if(h&&b&&r&&b.parentNode!==h&&(r.hidden||CUR!=="checks"))h.appendChild(b);}catch(e){}try{applyAll();}catch(e){}}
if(D.readyState==="loading")D.addEventListener("DOMContentLoaded",boot);else boot();
(function later(){var n=0;(function wait(){boot();if(W.__ingReady===true){setTimeout(boot,800);setTimeout(applyAll,2500);return;}if(++n<400)setTimeout(wait,500);})();})();
W.IngAuthor={open:open,close:close,room:function(k){open(k);},pick:pickMode,dock:setDock,
  words:{set:wordsSet,list:function(){var a=A();return a?a.words.slice():[];},apply:applyWords},names:{set:nameSet,app:appNameSet,apply:applyNames,built:builtOf},look:{set:lookSet,preset:lookPreset,apply:applyLook,css:function(){var a=A();return a?lookCss(a.look):"";}},
  log:function(){var a=A();return a?a.log.slice():[];},undo:undo,exportAll:exportAll,importText:importText,resetAll:resetAll,applyAll:applyAll,count:count,scopeOf:scopeOf};
})();
;try{window.__ingParts["p236"]="running";}catch(_){}
</script>
