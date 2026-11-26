<style id="r405-css">
/* ============ R405 · MEMORIA: WHAT IT KNOWS, DEEPENED AND MADE AGAIN (Ingenium 7.99, 26 November 2026; held for her word on its pictures) ============
   Her words (26 November 2026): "the Memoria page looks super plain and basic and detracts from the rest of the app. I need you to expand on
   that page and really deepen it to improve the app. I also want it to be redesigned to look better, apart from the 3D header, the page is
   plain and ugly." And, the same day: "While you redesign the Memoria page, I want you to also do a deeper pass on the page and truly deepen
   and expand its functions and features."
   Measured on 7.97: under the head and its four room cards, What it knows was one long card of plain parts: two chips, a paragraph, a
   search field, then each app's name over a list and an input, then three checkboxes.
   Now the room is drawn again on the same store (r390's state.know, with her memories, r271), working as before:
   - At a glance: four tiles (what it knows, what waits for her, her apps, what it remembered from her chats), each pressed to go to it;
   - Find a fact, large, with filters: everything, about her, her apps, waiting, her own words;
   - Waiting for you: each fact with where it came from, Keep or Not this, and Keep all;
   - one index card for her and one for each app: each fact with its source (her own words, a chat, a folder's notes, Fabrica, a memory)
     and its date, Change and Forget under the pointer, and a line to add a fact;
   - beside them: How it is kept (the three switches as raised plates), Never kept (what Ingenium leaves out of what it learns, as she
     answered: passwords, codes and keys, the committee code, money, other people's details; what it learns from chats leaves them out
     (r271's own instruction), and a fact from any other source that holds a password, a code, a key, or a card or account number is
     let go at once and never suggested again; what she writes herself is kept as she wrote it), and Which models may read it (as she
     answered: all may, and she chooses; a model she turns off is given no memory and no fact when it answers: the memory layer, r271
     and r390, and a folder's facts, r390, pass through this part first).
   Every tile, row and plate lies flat at rest and pops out under the pointer, as she chose for Health (7.97); keys are raised; Minimal
   motion and reduced motion keep everything still. By day in Memoria's own colours, by night in its dark academia. */
#page-memoria #knRoom.r405-off{display:none!important}
#mmAtlas{display:grid;gap:18px;padding:22px 24px 24px;border-radius:22px;background:linear-gradient(180deg,var(--sk-hi,#fff),var(--sk-lo,#faf8fc));
  box-shadow:var(--sk-slab,0 6px 18px rgba(40,22,68,.08));color:var(--sk-ink1,#221a2e)}
#mmAtlas .mm-hd{display:flex;align-items:baseline;gap:12px;flex-wrap:wrap}
#mmAtlas .mm-hd h3{margin:0;font:600 30px/1.1 var(--sk-serif,Georgia,serif);letter-spacing:.005em}
#mmAtlas .mm-hd p{margin:0;flex:1 1 320px;font-size:13.5px;line-height:1.5;color:var(--sk-ink2,#4a4358)}
/* the tiles at a glance */
#mmAtlas .mm-glance{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:12px}
#mmAtlas .mm-tile{position:relative;z-index:0;display:grid;gap:4px;text-align:left;border:0;cursor:pointer;padding:14px 16px;border-radius:16px;font:inherit;color:inherit;
  background:var(--sk-paper2,#f3eef8);box-shadow:inset 0 0 0 1px var(--sk-hair2,rgba(34,26,46,.06));transition:transform .32s cubic-bezier(.34,1.35,.64,1),box-shadow .22s}
#mmAtlas .mm-tile::before,#mmAtlas .mm-row::before,#mmAtlas .mm-plate::before{content:"";position:absolute;inset:0;border-radius:inherit;z-index:-1;pointer-events:none;
  background:linear-gradient(180deg,var(--sk-hi,#fff),var(--sk-lo,#faf8fc));opacity:0;transition:opacity .22s}
#mmAtlas .mm-tile:hover,#mmAtlas .mm-row:hover,#mmAtlas .mm-plate:hover{transform:translateY(-3px);box-shadow:var(--sk-keyhi,0 6px 14px rgba(40,22,68,.14))}
#mmAtlas .mm-tile:hover::before,#mmAtlas .mm-row:hover::before,#mmAtlas .mm-plate:hover::before{opacity:1}
#mmAtlas .mm-tile:active{transform:translateY(0);transition-duration:.08s}
#mmAtlas .mm-tile b{font:600 30px/1 var(--sk-serif,Georgia,serif);color:var(--sk-acc,#6a3fb5);font-variant-numeric:lining-nums;font-feature-settings:"lnum" 1}
#mmAtlas .mm-tile span{font:600 11px/1.2 var(--sans,system-ui,sans-serif);letter-spacing:.14em;text-transform:uppercase;color:var(--sk-ink3,#6c6579)}
#mmAtlas .mm-tile small{font-size:12.5px;color:var(--sk-ink2,#4a4358)}
#mmAtlas .mm-tile.warm b{color:#a0601c}
/* the two columns */
#mmAtlas .mm-grid{display:grid;grid-template-columns:minmax(0,1fr) 300px;gap:18px;align-items:start}
#mmAtlas .mm-main,#mmAtlas .mm-side{display:grid;gap:16px;min-width:0}
#mmAtlas .mm-side{position:sticky;top:72px}
/* find a fact */
#mmAtlas .mm-find{display:grid;gap:10px}
#mmAtlas .mm-q{width:100%;box-sizing:border-box;font:500 15px var(--sans,system-ui,sans-serif);color:var(--sk-ink1,#221a2e);padding:13px 16px 13px 42px;border-radius:14px;border:0;
  background:var(--sk-paper2,#f3eef8) url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='18' height='18' viewBox='0 0 24 24' fill='none' stroke='%236a3fb5' stroke-width='2' stroke-linecap='round'%3E%3Ccircle cx='11' cy='11' r='7'/%3E%3Cpath d='M20 20l-3.5-3.5'/%3E%3C/svg%3E") no-repeat 15px 50%;
  box-shadow:inset 0 2px 4px rgba(40,22,68,.10),inset 0 0 0 1px var(--sk-hair2,rgba(34,26,46,.06))}
#mmAtlas .mm-q:focus{outline:2px solid var(--sk-acc,#6a3fb5);outline-offset:2px}
#mmAtlas .mm-filters{display:flex;flex-wrap:wrap;gap:8px}
#mmAtlas .mm-f{border:0;cursor:pointer;font:600 12.5px/1 var(--sans,system-ui,sans-serif);padding:8px 12px;border-radius:999px;color:var(--sk-ink2,#4a4358);
  background:linear-gradient(var(--sk-keyA,#fff),var(--sk-keyB,#f6f2fb));box-shadow:var(--sk-key,0 2px 0 rgba(40,22,68,.2));transition:transform .3s cubic-bezier(.34,1.35,.64,1),box-shadow .2s}
#mmAtlas .mm-f:hover{transform:translateY(-2px);box-shadow:var(--sk-keyhi,0 4px 8px rgba(40,22,68,.2))}
#mmAtlas .mm-f:active{transform:translateY(1px);box-shadow:var(--sk-press,inset 0 2px 4px rgba(40,22,68,.2))}
#mmAtlas .mm-f[aria-pressed="true"]{color:var(--sk-acc,#6a3fb5);box-shadow:var(--sk-press,inset 0 2px 4px rgba(40,22,68,.2))}
/* a card of facts */
#mmAtlas .mm-card{display:grid;gap:8px;padding:16px 16px 14px;border-radius:18px;background:var(--sk-paper,#fdfbf8);box-shadow:inset 0 0 0 1px var(--sk-rule,rgba(106,63,181,.08))}
#mmAtlas .mm-card h4{display:flex;align-items:center;gap:10px;margin:0 0 2px;font:600 20px/1.2 var(--sk-serif,Georgia,serif);color:var(--sk-paperink,#2f2640)}
#mmAtlas .mm-card h4 i{font:600 11px/1 var(--sans,system-ui,sans-serif);font-style:normal;letter-spacing:.12em;text-transform:uppercase;color:var(--sk-ink3,#6c6579)}
#mmAtlas .mm-card h4 .mm-dot{width:26px;height:26px;border-radius:50%;flex:0 0 auto;display:grid;place-items:center;font:700 12px/1 var(--sk-serif,Georgia,serif);color:#fff;
  background:radial-gradient(circle at 35% 30%,#a283dc,#5d37a1 70%);box-shadow:inset 0 1px 0 rgba(255,255,255,.45),0 2px 4px rgba(40,22,68,.25)}
#mmAtlas .mm-card.wait{background:linear-gradient(180deg,var(--sk-paper,#fdfbf8),rgba(232,144,42,.06))}
#mmAtlas .mm-list{list-style:none;margin:0;padding:0;display:grid;gap:6px}
#mmAtlas .mm-row{position:relative;z-index:0;display:grid;grid-template-columns:minmax(0,1fr) auto;gap:3px 12px;align-items:center;padding:10px 12px;border-radius:12px;
  box-shadow:inset 0 0 0 1px var(--sk-hair2,rgba(34,26,46,.06));transition:transform .32s cubic-bezier(.34,1.35,.64,1),box-shadow .22s}
#mmAtlas .mm-row p{margin:0;font-size:14px;line-height:1.45;color:var(--sk-ink1,#221a2e);overflow-wrap:anywhere}
#mmAtlas .mm-row .mm-meta{grid-column:1;display:flex;flex-wrap:wrap;gap:6px;align-items:center;font-size:12px;color:var(--sk-ink3,#6c6579)}
#mmAtlas .mm-src{display:inline-flex;align-items:center;gap:5px;font:600 11px/1 var(--sans,system-ui,sans-serif);padding:4px 8px;border-radius:999px;background:rgba(106,63,181,.09);color:var(--sk-acc,#6a3fb5)}
#mmAtlas .mm-src::before{content:"";width:6px;height:6px;border-radius:50%;background:currentColor}
#mmAtlas .mm-src.her{background:rgba(70,140,100,.12);color:#2f6e4b}
#mmAtlas .mm-src.fab{background:rgba(60,100,170,.12);color:#2f5596}
#mmAtlas .mm-src.mem{background:rgba(190,120,60,.13);color:#8a5320}
#mmAtlas .mm-clash{grid-column:1/-1;font-size:12px;color:#a8323e}
#mmAtlas .mm-acts{grid-column:2;grid-row:1/span 2;display:flex;gap:6px;opacity:0;transition:opacity .2s}
#mmAtlas .mm-row:hover .mm-acts,#mmAtlas .mm-row:focus-within .mm-acts,#mmAtlas .mm-card.wait .mm-acts{opacity:1}
#mmAtlas .mm-k{border:0;cursor:pointer;font:600 12px/1 var(--sans,system-ui,sans-serif);padding:7px 11px;border-radius:10px;color:var(--sk-ink1,#221a2e);
  background:linear-gradient(var(--sk-keyA,#fff),var(--sk-keyB,#f6f2fb));box-shadow:var(--sk-key,0 2px 0 rgba(40,22,68,.2));transition:transform .3s cubic-bezier(.34,1.35,.64,1),box-shadow .2s}
#mmAtlas .mm-k:hover{transform:translateY(-2px);box-shadow:var(--sk-keyhi,0 4px 8px rgba(40,22,68,.2))}
#mmAtlas .mm-k:active{transform:translateY(1px);box-shadow:var(--sk-press,inset 0 2px 4px rgba(40,22,68,.2))}
#mmAtlas .mm-k.pri{color:#fff;background:linear-gradient(var(--sk-pa,#7a50c6),var(--sk-pb,#5d37a1))}
#mmAtlas .mm-add{display:flex;gap:8px;align-items:center;margin-top:2px}
#mmAtlas .mm-add input{flex:1 1 auto;min-width:0;font:500 13.5px var(--sans,system-ui,sans-serif);color:var(--sk-ink1,#221a2e);padding:9px 12px;border-radius:12px;border:0;
  background:var(--sk-paper2,#f3eef8);box-shadow:inset 0 1px 3px rgba(40,22,68,.10),inset 0 0 0 1px var(--sk-hair2,rgba(34,26,46,.06))}
#mmAtlas .mm-none{margin:0;font-size:13px;color:var(--sk-ink3,#6c6579);font-style:italic}
/* the side: plates */
#mmAtlas .mm-box{display:grid;gap:8px;padding:14px;border-radius:18px;background:var(--sk-paper2,#f3eef8);box-shadow:inset 0 0 0 1px var(--sk-hair2,rgba(34,26,46,.06))}
#mmAtlas .mm-box h5{margin:0 0 2px;font:600 11px/1.2 var(--sans,system-ui,sans-serif);letter-spacing:.14em;text-transform:uppercase;color:var(--sk-ink3,#6c6579)}
#mmAtlas .mm-box p{margin:0;font-size:12.5px;line-height:1.45;color:var(--sk-ink2,#4a4358)}
#mmAtlas .mm-plate{position:relative;z-index:0;display:grid;grid-template-columns:minmax(0,1fr) auto;gap:10px;align-items:center;padding:10px 12px;border-radius:12px;cursor:pointer;
  box-shadow:inset 0 0 0 1px var(--sk-hair2,rgba(34,26,46,.06));transition:transform .32s cubic-bezier(.34,1.35,.64,1),box-shadow .22s;font-size:13px;line-height:1.35;color:var(--sk-ink1,#221a2e)}
#mmAtlas .mm-sw{width:40px;height:22px;border-radius:999px;position:relative;background:rgba(34,26,46,.16);box-shadow:inset 0 1px 3px rgba(40,22,68,.25);transition:background .2s}
#mmAtlas .mm-sw::after{content:"";position:absolute;top:2px;left:2px;width:18px;height:18px;border-radius:50%;background:linear-gradient(#fff,#f1edf7);box-shadow:0 1px 2px rgba(40,22,68,.35);transition:left .25s cubic-bezier(.34,1.35,.64,1)}
#mmAtlas .mm-plate[aria-checked="true"] .mm-sw{background:linear-gradient(var(--sk-pa,#7a50c6),var(--sk-pb,#5d37a1))}
#mmAtlas .mm-plate[aria-checked="true"] .mm-sw::after{left:20px}
#mmAtlas .mm-guard ul{list-style:none;margin:0;padding:0;display:grid;gap:6px}
#mmAtlas .mm-guard li{display:flex;align-items:center;gap:8px;font-size:13px;color:var(--sk-ink1,#221a2e)}
#mmAtlas .mm-guard li::before{content:"";width:14px;height:14px;flex:0 0 auto;background:no-repeat center/14px url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%236a3fb5' stroke-width='2.2' stroke-linecap='round' stroke-linejoin='round'%3E%3Crect x='5' y='11' width='14' height='10' rx='2'/%3E%3Cpath d='M8 11V8a4 4 0 0 1 8 0v3'/%3E%3C/svg%3E")}
/* by night: Memoria's dark academia */
body[data-theme="night"] #mmAtlas .mm-tile.warm b{color:#f0b65c}
body[data-theme="night"] #mmAtlas .mm-src.her{background:rgba(110,190,140,.16);color:#9fe0b8}
body[data-theme="night"] #mmAtlas .mm-src.fab{background:rgba(110,150,230,.16);color:#a9c4f5}
body[data-theme="night"] #mmAtlas .mm-src.mem{background:rgba(220,160,90,.16);color:#f0c88f}
body[data-theme="night"] #mmAtlas .mm-clash{color:#f08a95}
body[data-theme="night"] #mmAtlas .mm-sw{background:rgba(255,255,255,.14)}
body[data-theme="night"] #mmAtlas .mm-sw::after{background:linear-gradient(#e9e1f6,#cfc3e4)}
@media (max-width:1100px){#mmAtlas .mm-grid{grid-template-columns:minmax(0,1fr)}#mmAtlas .mm-glance{grid-template-columns:repeat(2,minmax(0,1fr))}}
body[data-motion="minimal"] #mmAtlas *{transition:none!important;transform:none!important}
@media (prefers-reduced-motion:reduce){#mmAtlas *{transition:none!important;transform:none!important}}
</style>
<script>try{(window.__ingParts=window.__ingParts||{})["p405"]="started";}catch(_){}
/* R405 · Memoria: what it knows, deepened and made again: see the note at the top of its styles. window.IngAtlas */
(function r405(){
"use strict";
if(window.IngAtlas)return;
var W=window,D=document,Q="",F="all",T=0;
var NEVER=["Passwords and codes","Keys of every kind","The committee code","Money","Other people's details"];
/* what reads as one of them (refused unless she writes it herself) */
var NEVER_RE=/\b(pass(word|code|phrase)s?|pin code|one-time code|verification code|api[ -]?keys?|secret keys?|private keys?|recovery words|sk-[a-z0-9]{8,}|iban|sort code|account number|card number|cvv|committee code)\b/i;
function mk(t,c,x){var e=D.createElement(t);if(c)e.className=c;if(x!=null)e.textContent=x;return e;}
function K(){try{return W.IngKnow&&IngKnow.store?IngKnow.store():null;}catch(e){return null;}}
function apps(){try{return W.IngFolders&&IngFolders.folders?IngFolders.folders():[];}catch(e){return [];}}
function mems(){try{var m=W.memState?W.memState():null;return (m&&m.items||[]).map(function(it){return {id:"mem:"+it.id,about:"me",t:it.text,src:{k:"memory"},at:it.at||0,st:"kept",mem:true};});}catch(e){return [];}}
function norm(s){return String(s||"").trim().toLowerCase().replace(/\s+/g," ");}
function day(t){try{return t?new Date(t).toLocaleDateString("en-GB",{day:"numeric",month:"short",year:"numeric"}):"";}catch(e){return "";}}
function srcOf(f){var k=(f.src&&f.src.k)||"chat";return k==="her"?["her","Your words"]:k==="fabrica"?["fab","Fabrica"]:k==="folder"?["","A folder's notes"]:k==="memory"?["mem","A memory"]:["","A chat"];}
function nameOf(about){if(about==="me")return "You";return String(about||"").replace(/^app:/,"").replace(/\b\w/g,function(c){return c.toUpperCase();});}
function appName(about){var n=norm(String(about||"").replace(/^app:/,""));var A=apps();for(var i=0;i<A.length;i++)if(norm(A[i].name)===n)return A[i].name;return nameOf(about);}
function key(t,cls,f){var b=mk("button","mm-k"+(cls?" "+cls:""),t);b.type="button";b.addEventListener("click",function(e){e.stopPropagation();f(b);});return b;}
function row(f,wait){var li=mk("li","mm-row");li.setAttribute("data-fact",f.id);li.tabIndex=0;li.appendChild(mk("p",null,f.t));
  var m=mk("div","mm-meta"),s=srcOf(f),c=mk("span","mm-src"+(s[0]?" "+s[0]:""),s[1]);m.appendChild(c);if(wait)m.appendChild(mk("span",null,"about "+appName(f.about)));if(f.at)m.appendChild(mk("span",null,day(f.at)));li.appendChild(m);
  if(f.clash)li.appendChild(mk("div","mm-clash","It disagrees with what you said: "+f.clash));
  var a=mk("div","mm-acts");
  if(wait){a.appendChild(key("Keep","pri",function(){IngKnow.keep(f.id);}));a.appendChild(key("Not this","",function(){IngKnow.drop(f.id);}));}
  else if(!f.mem){a.appendChild(key("Change","",function(){var p=li.querySelector("p");var inp=mk("input");inp.value=f.t;inp.className="mm-q";inp.style.padding="8px 10px";inp.style.backgroundImage="none";p.replaceWith(inp);inp.focus();
      inp.addEventListener("keydown",function(e){if(e.key==="Enter"){IngKnow.edit(f.id,inp.value);}if(e.key==="Escape")paint();});}));
    a.appendChild(key("Forget","",function(){IngKnow.drop(f.id);}));}
  li.appendChild(a);return li;}
function card(title,sub,facts,about,dot){var c=mk("section","mm-card");var h=mk("h4");if(dot!=null){var d=mk("span","mm-dot",dot);h.appendChild(d);}h.appendChild(D.createTextNode(title));h.appendChild(mk("i",null,sub));c.appendChild(h);
  var ul=mk("ul","mm-list");facts.forEach(function(f){ul.appendChild(row(f,false));});if(!facts.length)c.appendChild(mk("p","mm-none",Q?"Nothing here matches.":"Nothing kept yet."));else c.appendChild(ul);
  if(about&&!Q){var ad=mk("div","mm-add"),i=mk("input");i.placeholder=about==="me"?"Something Ingenium should know about you":"A fact about "+title;i.setAttribute("aria-label",i.placeholder);
    var b=key("Add","",function(){var t=i.value.trim();if(!t)return;IngKnow.add(about,t,{k:"her",label:"yours"});i.value="";});i.addEventListener("keydown",function(e){if(e.key==="Enter")b.click();});ad.appendChild(i);ad.appendChild(b);c.appendChild(ad);}
  return c;}
function match(f){if(Q&&norm(f.t+" "+appName(f.about)).indexOf(norm(Q))<0)return false;
  if(F==="me")return f.about==="me";if(F==="apps")return f.about!=="me";if(F==="her")return f.src&&f.src.k==="her";if(F==="wait")return f.st==="waiting";return true;}
function plate(label,on,set){var p=mk("div","mm-plate");p.setAttribute("role","switch");p.setAttribute("aria-checked",on?"true":"false");p.tabIndex=0;p.appendChild(mk("span",null,label));p.appendChild(mk("span","mm-sw"));
  function flip(){var v=p.getAttribute("aria-checked")!=="true";p.setAttribute("aria-checked",v?"true":"false");set(v);}
  p.addEventListener("click",flip);p.addEventListener("keydown",function(e){if(e.key===" "||e.key==="Enter"){e.preventDefault();flip();}});return p;}
function save(){try{W.saveState();}catch(e){}}
function models(){try{return (W.state.models||[]).filter(function(m){return m&&(m.fileState==="ready"||m.nativeId||m.builtinDesk||m.shellStored);});}catch(e){return [];}}
function readers(){var k=K();if(!k)return {};k.opts=k.opts||{};if(!k.opts.readers||typeof k.opts.readers!=="object")k.opts.readers={};return k.opts.readers;}
function paint(){var host=D.getElementById("knRoom");if(!host||!host.parentNode)return;var k=K();if(!k)return;sweep();
  host.classList.add("r405-off");var c=D.getElementById("mmAtlas");if(!c){c=mk("section","mm-atlas");c.id="mmAtlas";c.setAttribute("aria-label","What Ingenium knows");host.parentNode.insertBefore(c,host.nextSibling);}
  /* Memoria shows one room at a time by the room each card names (r396, data-mm): this one is in the room of What it knows */
  if(host.hasAttribute("data-mm"))c.setAttribute("data-mm",host.getAttribute("data-mm"));c.classList.toggle("fxp-on",host.classList.contains("fxp-on"));c.classList.toggle("fxp-off",host.classList.contains("fxp-off"));
  var keepFocus=D.activeElement&&D.activeElement.id==="mmQ",caret=keepFocus?D.activeElement.selectionStart:0;
  c.innerHTML="";var A=apps(),facts=k.facts.slice(),M=mems(),all=facts.concat(M),wait=facts.filter(function(f){return f.st==="waiting";}),kept=all.filter(function(f){return f.st==="kept";});
  var hd=mk("div","mm-hd");hd.appendChild(mk("h3",null,"What Ingenium knows"));hd.appendChild(mk("p",null,"About you and about each of your apps, every fact with where it came from and when. Your own words come first, and nothing it learns is kept until you say so."));c.appendChild(hd);
  /* at a glance */
  var g=mk("div","mm-glance");
  function tile(n,label,say,go,warm){var t=mk("button","mm-tile"+(warm?" warm":""));t.type="button";t.appendChild(mk("b",null,String(n)));t.appendChild(mk("span",null,label));t.appendChild(mk("small",null,say));t.addEventListener("click",go);g.appendChild(t);}
  tile(kept.length,"Facts kept",kept.filter(function(f){return f.src&&f.src.k==="her";}).length+" in your own words",function(){F="all";Q="";paint();});
  tile(wait.length,"Waiting for you",wait.length?"Keep or let go, one press each":"Nothing waits",function(){F="wait";paint();},wait.length>0);
  tile(A.length,"Your apps",A.length?A.slice(0,3).map(function(a){return a.name;}).join(", ")+(A.length>3?"…":""):"No folders yet",function(){F="apps";paint();});
  tile(M.length,"From your chats",M.length?"Remembered as you talked":"It learns as you chat",function(){F="me";paint();});
  c.appendChild(g);
  var grid=mk("div","mm-grid"),main=mk("div","mm-main"),side=mk("div","mm-side");grid.appendChild(main);grid.appendChild(side);c.appendChild(grid);
  /* find a fact */
  var fd=mk("div","mm-find"),q=mk("input","mm-q");q.id="mmQ";q.type="search";q.placeholder="Find a fact: a word, an app, a decision";q.value=Q;q.setAttribute("aria-label","Find a fact");
  q.addEventListener("input",function(){Q=q.value;clearTimeout(T);T=setTimeout(paint,160);});fd.appendChild(q);
  var fl=mk("div","mm-filters");[["all","Everything"],["me","About you"],["apps","Your apps"],["wait","Waiting"],["her","Your own words"]].forEach(function(x){var b=mk("button","mm-f",x[1]);b.type="button";b.setAttribute("aria-pressed",String(F===x[0]));
    b.addEventListener("click",function(){F=x[0];paint();});fl.appendChild(b);});fd.appendChild(fl);main.appendChild(fd);
  /* waiting */
  var W1=wait.filter(match);if(W1.length&&(F==="all"||F==="wait")){var wc=mk("section","mm-card wait"),wh=mk("h4",null,"Waiting for you");wh.appendChild(mk("i",null,W1.length+" to look at"));wc.appendChild(wh);
    var wl=mk("ul","mm-list");W1.forEach(function(f){wl.appendChild(row(f,true));});wc.appendChild(wl);
    if(W1.length>1){var ka=mk("div","mm-add");ka.appendChild(key("Keep all","pri",function(){W1.forEach(function(f){IngKnow.keep(f.id);});}));wc.appendChild(ka);}main.appendChild(wc);}
  /* you, then each app */
  if(F!=="apps"&&F!=="wait"){var you=all.filter(function(f){return f.about==="me"&&f.st==="kept"&&match(f);}).sort(function(a,b){return ((b.src&&b.src.k==="her")-(a.src&&a.src.k==="her"))||(b.at-a.at);});
    main.appendChild(card("You",you.length+" kept",you,"me","Y"));}
  if(F!=="me"&&F!=="wait")A.forEach(function(p){var ab=IngKnow.appKey(p.name),L=all.filter(function(f){return f.about===ab&&f.st==="kept"&&match(f);});
    if(Q&&!L.length)return;main.appendChild(card(p.name,L.length+" kept",L,ab,(p.name||"?").charAt(0).toUpperCase()));});
  /* how it is kept */
  var o=k.opts||{},hp=mk("section","mm-box");hp.appendChild(mk("h5",null,"How it is kept"));
  hp.appendChild(plate("Learn from my folders and from Fabrica",o.learn!==false,function(v){o.learn=v;save();}));
  hp.appendChild(plate("Ask me before keeping what it learns",o.ask!==false,function(v){o.ask=v;save();}));
  hp.appendChild(plate("Bring my folders up to date by themselves while I am away",o.auto!==false,function(v){o.auto=v;save();}));side.appendChild(hp);
  /* never kept */
  var gp=mk("section","mm-box mm-guard");gp.appendChild(mk("h5",null,"Never kept"));var gl=mk("ul");NEVER.forEach(function(x){gl.appendChild(mk("li",null,x));});gp.appendChild(gl);
  gp.appendChild(mk("p",null,"What it learns from your chats leaves these out, and a fact from a folder or Fabrica that holds a password, a code, a key, or a card or account number is let go at once. Only what you write here yourself is kept as you wrote it."));side.appendChild(gp);
  /* which models may read it */
  var R=readers(),mp=mk("section","mm-box");mp.appendChild(mk("h5",null,"Which models may read it"));var ML=models();
  if(!ML.length)mp.appendChild(mk("p",null,"Your models appear here once one is ready on this device."));
  ML.forEach(function(m){mp.appendChild(plate(m.customName||m.name||m.fileName||"A model",R[m.id]!==false,function(v){R[m.id]=v;save();}));});
  mp.appendChild(mk("p",null,"A model you turn off is given no fact and no memory when it answers."));side.appendChild(mp);
  if(keepFocus){var nq=D.getElementById("mmQ");if(nq){nq.focus();try{nq.setSelectionRange(caret,caret);}catch(e){}}}}
/* a fact that reads as a password, a code, a key, or a card or account number, from any source but her, is let go (and never suggested again) */
function sweep(){var k=K();if(!k)return;k.facts.filter(function(f){return !(f.src&&f.src.k==="her")&&NEVER_RE.test(f.t||"");}).forEach(function(f){try{IngKnow.drop(f.id);}catch(e){}});}
/* which models may read it: the memory layer (her memories and the facts, r271 and r390) and a folder's facts are given only to a model she has not turned off */
function curModel(){try{return (W.Engine&&Engine.modelId)||(W.state&&W.state.activeModelId)||"";}catch(e){return "";}}
function allowed(){var R=readers(),id=curModel();return !(id&&R[id]===false);}
function gate(){if(typeof W.memLayer==="function"&&!W.memLayer.__r405){var o=W.memLayer,n=function(){if(!allowed())return "";return o.apply(this,arguments);};n.__r405=1;n.__r390=o.__r390;W.memLayer=n;try{memLayer=n;}catch(e){}}
  var FF=W.IngFolderFab;if(FF&&typeof FF.lines==="function"&&!FF.__r405){var ol=FF.lines;FF.lines=function(){var r=ol.apply(this,arguments)||"";if(!allowed()){var i=r.indexOf("What Ingenium knows about ");if(i>=0)r=r.slice(0,i).replace(/\s+$/,"");}return r;};FF.__r405=1;}}
/* r390 draws its room again after every change: the atlas follows it */
function watch(){var host=D.getElementById("knRoom");if(!host||host.__r405)return !!host;host.__r405=1;try{new MutationObserver(function(){if(!(D.activeElement&&D.activeElement.closest&&D.activeElement.closest("#mmAtlas .mm-row input")))paint();}).observe(host,{childList:true});}catch(e){}
  try{new MutationObserver(function(){var c=D.getElementById("mmAtlas");if(!c)return;if(host.hasAttribute("data-mm"))c.setAttribute("data-mm",host.getAttribute("data-mm"));c.classList.toggle("fxp-on",host.classList.contains("fxp-on"));c.classList.toggle("fxp-off",host.classList.contains("fxp-off"));}).observe(host,{attributes:true,attributeFilter:["class","data-mm"]});}catch(e){}paint();return true;}
/* what she never wants kept: a fact that reads as one is refused, unless she writes it herself */
function guard(){var KN=W.IngKnow;if(!KN||KN.__r405)return;var oAdd=KN.add;KN.add=function(about,t,src){if(!(src&&src.k==="her")&&NEVER_RE.test(String(t||"")))return null;return oAdd.apply(KN,arguments);};KN.__r405=1;}
(function wait(n){gate();if(W.IngKnow){guard();if(watch())return;}if(n<240)setTimeout(function(){wait(n+1);},500);})(0);
setInterval(gate,4000);
W.IngAtlas={paint:paint,never:NEVER,blocked:function(t){return NEVER_RE.test(String(t||""));},readers:readers,allowed:allowed};
try{window.__ingParts["p405"]="running";}catch(_){}
})();
</script>
