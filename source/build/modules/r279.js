<style id="r279-css">
/* ============ R279 · FOLDERS: THE DRAWER'S PULLS, YOUR APPS' LOGOS AS LECTOR'S, ANY APP'S LOGO (Ingenium 6.85, 12 November 2026) ============
   Her words (12 November 2026): "I want the apps seals on the "your apps" section to be animated and interactive and clickable, I like the
   effect. I also want the 3D folders for the apps at the top of the page to be able to filtered, and reorderd by alphabetical order, and
   date but do no change the existing page design, just build it in as part of the 3D drawer. I want the Folders page to read and accept
   any app icon/logo and not be limited my apps." On the live preview: "The animation of the apps logos on the "Your apps" section is
   really weird and not what I asked for. I want you to replicate the same animations from the Lector page for these the apps logos on the
   "Your apps" section, please push this everywhere. I approve pf the preview with those changes."
   - The drawer's two pulls are its keys, in the drawer's own grooves (the drawer's design is unchanged): the left one finds a folder as she
     types, by its name or its parts (Escape clears it); the right one turns through Used last, A to Z, Z to A, Newest and Oldest (Shift
     turns back), kept for next time. The label between them says how many folders there are and in what order, or how many match. Six
     stand in the drawer at a time, the first in that order in front.
   - Your apps: each card's logo is Lector's layered seal, moving as it does on Lector (modules/r107.js, r108.js): it turns slowly in 3D
     with its layers apart, turns toward the pointer, lifts under it and sinks when the card is pressed; the card opens its folder, as
     before. The Offline Project wears its live crest with its quarters moving, as on Lector; any other app its own logo, in the same motion.
   - 6.86 (her words, 12 November 2026: "Also by "filtered", I meant both options"): the drawer's label is a key too: pressed, the drawer
     holds only the folders with conversations not read yet (Not read yet), pressed again every folder; kept for next time, and it works
     with the left pull's word and the right pull's order.
   - An opened folder takes any app's logo: Choose a picture (PNG, JPEG, WebP, GIF, SVG, ICO, AVIF, or a Mac app's icon file, .icns), From
     the app's page (the icon the page names), or either dropped on its cover. A picture that cannot be read is refused, never kept. Its own
     logo again gives back the app's own. Every logo is drawn whole; an app with no logo has a quiet disc, never a letter. */
/* the drawer's pulls: the grooves keep their size and their look, and become keys */
#page-folders.fd-on .fd-dfront .fd-handle.fd-find,#page-folders.fd-on .fd-dfront .fd-handle.fd-order{position:relative;display:grid;place-items:center;padding:0;margin:0;border:0;
  font:inherit;color:inherit;cursor:pointer;-webkit-tap-highlight-color:transparent;transition:transform .16s cubic-bezier(.34,1.35,.64,1)}
#page-folders.fd-on .fd-dfront .fd-handle.fd-find::after,#page-folders.fd-on .fd-dfront .fd-handle.fd-order::after{content:"";position:absolute;inset:-10px -6px}
#page-folders.fd-on .fd-dfront .fd-handle.fd-find:hover,#page-folders.fd-on .fd-dfront .fd-handle.fd-order:hover{transform:translateY(-1.5px)}
#page-folders.fd-on .fd-dfront .fd-handle.fd-order:active{transform:translateY(1px);transition-duration:.06s}
#page-folders.fd-on .fd-dfront .fd-eng,#page-folders.fd-on .fd-dfront .fd-find input::placeholder{font:600 10px/1 var(--sans,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif);
  letter-spacing:.18em;text-transform:uppercase;color:rgba(40,22,68,.48);text-shadow:0 1px 0 rgba(255,255,255,.6);opacity:1}
body[data-theme="night"] #page-folders.fd-on .fd-dfront .fd-eng,body[data-theme="night"] #page-folders.fd-on .fd-dfront .fd-find input::placeholder{color:rgba(225,212,248,.55);text-shadow:0 -1px 0 rgba(0,0,0,.6)}
#page-folders.fd-on .fd-dfront .fd-eng{position:relative;z-index:1;white-space:nowrap;pointer-events:none}
#page-folders.fd-on .fd-dfront .fd-find input{position:relative;z-index:1;width:100%;height:100%;box-sizing:border-box;margin:0;padding:0 12px;border:0;border-radius:999px;background:transparent;
  text-align:center;outline:none;font:600 11.5px/1 var(--sans,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif);color:var(--ink-1);-webkit-appearance:none;appearance:none;box-shadow:none}
#page-folders.fd-on .fd-dfront .fd-find input::-webkit-search-cancel-button,#page-folders.fd-on .fd-dfront .fd-find input::-webkit-search-decoration{-webkit-appearance:none;display:none}
#page-folders.fd-on .fd-dfront .fd-find:focus-within,#page-folders.fd-on .fd-dfront .fd-order:focus-visible{outline:2px solid var(--accent);outline-offset:3px}
#page-folders.fd-on .fd-dfront .fd-order:focus:not(:focus-visible){outline:0}
/* 6.86: the label is a key: pressed, only the folders not read yet; it rises and sinks as the pulls do, and wears the accent's ring while it filters */
#page-folders.fd-on .fd-dfront .fd-label.fd-keyed{position:relative;cursor:pointer;-webkit-tap-highlight-color:transparent;user-select:none;transition:transform .16s cubic-bezier(.34,1.35,.64,1),box-shadow .2s ease}
#page-folders.fd-on .fd-dfront .fd-label.fd-keyed:hover{transform:translateY(-1.5px)}
#page-folders.fd-on .fd-dfront .fd-label.fd-keyed:active{transform:translateY(1px);transition-duration:.06s}
#page-folders.fd-on .fd-dfront .fd-label.fd-keyed:focus-visible{outline:2px solid var(--accent);outline-offset:3px}
#page-folders.fd-on .fd-dfront .fd-label.fd-keyed:focus:not(:focus-visible){outline:0}
#page-folders.fd-on .fd-dfront .fd-label.fd-keyed[aria-pressed="true"]{box-shadow:inset 0 0 0 1.5px var(--accent),inset 0 2px 4px rgba(40,22,68,.12)}
#page-folders.fd-on .fd-dfront .fd-label.fd-keyed[aria-pressed="true"] b{color:var(--accent)}
#page-folders.fd-on.fd-phone .fd-dfront .fd-handle.fd-find,#page-folders.fd-on.fd-phone .fd-dfront .fd-handle.fd-order{width:150px;height:calc(20px / var(--fd-k,1))}
#page-folders.fd-on.fd-phone .fd-dfront .fd-eng,#page-folders.fd-on.fd-phone .fd-dfront .fd-find input,#page-folders.fd-on.fd-phone .fd-dfront .fd-find input::placeholder{font-size:calc(11px / var(--fd-k,1))}
/* Your apps: each logo as Lector's layered seal (the same measures as #lx7 .ls in modules/r107.js) */
#page-folders.fd-on .fd-ls{position:relative;display:inline-block;width:var(--S,44px);height:var(--S,44px);perspective:calc(var(--S,44px) * 4);--rx:0deg;--ry:0deg;--lift:0px;--sc:1;flex:0 0 auto}
#page-folders.fd-on .fd-ls .ls-tilt{position:absolute;inset:0;display:block;transform-style:preserve-3d;transform:rotateX(var(--rx)) rotateY(var(--ry)) translateY(var(--lift)) scale(var(--sc));transition:transform .35s cubic-bezier(.2,.8,.2,1)}
#page-folders.fd-on .fd-ls .ls-idle{position:absolute;inset:0;display:block;transform-style:preserve-3d;animation:fdLsSway 7s ease-in-out infinite}
#page-folders.fd-on .fd-ls .ls-l{position:absolute;inset:0;width:100%;height:100%;display:block;max-width:none;margin:0;pointer-events:none;object-fit:contain;backface-visibility:hidden;
  -webkit-user-drag:none;user-select:none;transform:translateZ(calc(var(--S,44px) * var(--z,0))) scale(calc(1 - var(--z,0) / 4))}
#page-folders.fd-on .fd-ls .ls-l.side{transform:translateZ(calc(var(--S,44px) * -.03)) translateY(2.5%) scale(1.0075)}
#page-folders.fd-on .fd-ls .ls-l.ing-logo-wait{box-sizing:border-box}
#page-folders.fd-on .fd-ls .ls-cast{position:absolute;left:14%;right:14%;bottom:-9%;height:14%;border-radius:50%;display:block;background:radial-gradient(closest-side,rgba(42,20,80,.26),rgba(42,20,80,0));
  filter:blur(1.5px);transform:translateZ(calc(var(--S,44px) * -.08))}
body[data-theme="night"] #page-folders.fd-on .fd-ls .ls-cast{background:radial-gradient(closest-side,rgba(0,0,0,.5),rgba(0,0,0,0))}
@keyframes fdLsSway{0%,100%{transform:rotateY(-18deg) rotateX(5deg)}50%{transform:rotateY(18deg) rotateX(-5deg)}}
#page-folders.fd-on .fd-ls.hov{--lift:calc(var(--S,44px) * -.06);--sc:1.04}
#page-folders.fd-on .fd-ls.down{--lift:calc(var(--S,44px) * .02);--sc:.97}
#page-folders.fd-on .fld-card .fd-lscrest{flex:0 0 auto}
body[data-motion="minimal"] #page-folders.fd-on .fd-ls .ls-idle{animation:none !important}
@media (prefers-reduced-motion:reduce){#page-folders.fd-on .fd-ls .ls-idle{animation:none}#page-folders.fd-on .fd-ls .ls-tilt,#page-folders.fd-on .fd-dfront .fd-handle{transition:none}}
/* an opened folder: its logo, chosen or read from the app's page, or dropped on its cover */
#page-folders.fd-on .fd-logorow{display:flex;flex-wrap:wrap;align-items:center;gap:8px;flex:1 0 100%;min-width:0;margin:2px 0 4px}
#page-folders.fd-on .fd-logorow .fd-loglab{font-size:12px;font-weight:600;letter-spacing:.04em;color:var(--ink-3)}
#page-folders.fd-on .fd-logorow .fd-lognote{font-size:12px;color:var(--ink-3);min-width:0}
#page-folders.fd-on .fd-oh.fd-drop{outline:2px dashed var(--accent);outline-offset:6px;border-radius:12px}
</style>
<script>try{(window.__ingParts=window.__ingParts||{})["p279"]="started";}catch(_){}
/* R279 · Folders: the drawer's pulls, Your apps' logos as Lector's, any app's logo: see the note at the top of its styles.
   window.IngFolderView {view(folders, {lastUsed}), dressed(page, body, inside), orders, state(), setFind(text), setOrder(key), readLogo(file), take(name, file)} */
(function r279(){
"use strict";
if(window.IngFolderView)return;
var W=window,D=document;
var ORDERS=[["used","Used last"],["az","A to Z"],["za","Z to A"],["new","Newest"],["old","Oldest"]],FIND="",MAXKEEP=180000;
/* 6.86: what the drawer holds: every folder, or only those with conversations not read yet (the label's key) */
var FILTERS=[["all","Your apps"],["unread","Not read yet"]];
var BAD="That picture could not be read: choose another.",
    KINDS="Choose a picture (PNG, JPEG, WebP, GIF, SVG, ICO or AVIF), a Mac app's icon file (.icns), or the app's own page.";
function mk(t,c,h){var e=D.createElement(t);if(c)e.className=c;if(h!=null)e.textContent=h;return e;}
function say(t){try{W.ingToast(t);}catch(e){}}
function save(){try{W.saveState();}catch(e){}}
function night(){try{return D.body.getAttribute("data-theme")==="night";}catch(e){return false;}}
function still(){var m="calm";try{m=D.body.getAttribute("data-motion")||"calm";}catch(e){}try{if(W.matchMedia&&matchMedia("(prefers-reduced-motion: reduce)").matches)return true;}catch(e){}return m==="minimal";}
function clamp(v,a,b){return Math.max(a,Math.min(b,v));}
function G(){var s=W.state;if(!s.folders||typeof s.folders!=="object")s.folders={how:"",ui:{}};if(!s.folders.ui)s.folders.ui={};return s.folders;}
function folders(){try{return W.IngFolders&&typeof IngFolders.folders==="function"?IngFolders.folders():[];}catch(e){return [];}}
function L(){return W.IngAppLogo||null;}
function keyOf(name){try{return L()?IngAppLogo.key(name):null;}catch(e){return null;}}
function own(name){try{return L()&&IngAppLogo.own?IngAppLogo.own(name):"";}catch(e){return "";}}
function partsOf(p){var w=(p.app&&p.app.words)||[];return w.length>1?w.slice(1).join(", "):"";}
function convs(p){try{return (W.state.chats||[]).filter(function(c){return c&&c.projectId===p.id;});}catch(e){return [];}}
function stamp(c){var s=c.imported?(c.imported.created||c.imported.updated):(c.made||c.at||c.updated);var t=+new Date(s);return isFinite(t)?t:0;}
/* when a folder was made: its own date (folders made since 6.31 keep it), else the moment written into its name of record, else its first conversation */
function made(p){var a=p.app||{},t=+a.made||0;if(t>0)return t;var m=/^pj([0-9a-z]{8})/.exec(String(p.id||""));if(m){var x=parseInt(m[1],36);if(x>1.5e12&&x<4.2e12)return x;}
  var first=0;convs(p).forEach(function(c){var y=stamp(c);if(y&&(!first||y<first))first=y;});return first;}
function ordIndex(){var o=G().ui.order;for(var i=0;i<ORDERS.length;i++)if(ORDERS[i][0]===o)return i;return 0;}
function filt(){return G().ui.filter==="unread"?"unread":"all";}
function unreadN(p){try{return W.IngFolders&&typeof IngFolders.unread==="function"?IngFolders.unread(p).length:0;}catch(e){return 0;}}
function refresh(){try{if(W.IngFoldersLook&&typeof IngFoldersLook.refresh==="function")IngFoldersLook.refresh();}catch(e){}}
function repaint(){try{if(W.IngFolders&&typeof IngFolders.paint==="function")IngFolders.paint();}catch(e){}refresh();}

/* ---------- the drawer: which folders stand in it, and in what order (modules/r263.js draws them) ---------- */
function view(fs,o){o=o||{};var lu=typeof o.lastUsed==="function"?o.lastUsed:function(){return 0;},q=FIND.trim(),ql=q.toLowerCase(),oi=ordIndex(),k=ORDERS[oi][0],all=fs.length;
  var fk=filt(),pool=fs.map(function(p,i){return {p:p,i:i};});if(fk==="unread")pool=pool.filter(function(x){return unreadN(x.p)>0;});var base=pool.length;
  var rows=pool.filter(function(x){return !ql||(x.p.name+" "+partsOf(x.p)).toLowerCase().indexOf(ql)>=0;});
  rows.forEach(function(x){x.t=lu(x.p)||0;x.m=made(x.p)||0;});
  var byName=function(a,b){return String(a.p.name).localeCompare(String(b.p.name),undefined,{sensitivity:"base",numeric:true})||(a.i-b.i);};
  rows.sort(k==="az"?byName:k==="za"?function(a,b){return byName(b,a);}:k==="new"?function(a,b){return (b.m-a.m)||(a.i-b.i);}:k==="old"?function(a,b){return (a.m-b.m)||(a.i-b.i);}:function(a,b){return (b.t-a.t)||(a.i-b.i);});
  var n=rows.length,ol=ORDERS[oi][1].toLowerCase(),label,none=null;
  if(fk==="unread"){label=q?(n?n+" of "+base+" not read yet match “"+q+"”":"None not read yet matches “"+q+"”"):base?base+" of "+all+" not read yet, "+ol+(base>6?", the first six":""):"Every folder is read";
    if(!n)none=q?"No folder not read yet matches “"+q+"”. Clear the left pull, or press the label to see every folder.":"Every conversation in your folders is read. Press the label to see every folder.";}
  else{label=q?(n?n+" of "+all+" match “"+q+"”":"No folder matches “"+q+"”"):all?all+" folder"+(all===1?"":"s")+", "+ol+(all>6?", the first six":""):"No folders yet";
    if(q&&!n)none="No folder matches “"+q+"”. Clear the left pull to see them all.";}
  return {list:rows.map(function(x){return x.p;}),sig:k+"|"+fk+"|"+ql,label:label,none:none};}
function setFind(t){FIND=String(t==null?"":t).slice(0,80);var i=D.getElementById("fdFindIn");if(i&&i.value!==FIND)i.value=FIND;refresh();}
function setOrder(k){var i=0;for(;i<ORDERS.length;i++)if(ORDERS[i][0]===k)break;if(i>=ORDERS.length)return false;G().ui.order=k;save();paintOrder();refresh();return true;}
function setFilter(k){if(k!=="all"&&k!=="unread")return false;G().ui.filter=k;save();paintFilter();refresh();return true;}
function flip(){var k=filt()==="unread"?"all":"unread";setFilter(k);say(k==="unread"?"The drawer: only the folders with conversations not read yet.":"The drawer: every folder.");}
function paintFilter(){var lb=D.querySelector("#page-folders .fd-dfront .fd-label.fd-keyed");if(!lb)return;var on=filt()==="unread",b=lb.querySelector("b"),t=on?FILTERS[1][1]:FILTERS[0][1];
  if(b&&b.textContent!==t)b.textContent=t;var pr=on?"true":"false";if(lb.getAttribute("aria-pressed")!==pr)lb.setAttribute("aria-pressed",pr);
  var al=(on?"Showing only the folders with conversations not read yet":"Showing every folder")+". Press to "+(on?"show every folder":"show only the folders not read yet")+".";if(lb.getAttribute("aria-label")!==al)lb.setAttribute("aria-label",al);
  var ti=on?"Show every folder":"Show only the folders with conversations not read yet";if(lb.title!==ti)lb.title=ti;}
function turn(back){var i=(ordIndex()+(back?ORDERS.length-1:1))%ORDERS.length;setOrder(ORDERS[i][0]);say("The drawer: "+ORDERS[i][1].toLowerCase()+".");}
function paintOrder(){var b=D.getElementById("fdOrderKey");if(!b)return;var o=ORDERS[ordIndex()][1],t=b.querySelector(".fd-eng");if(t&&t.textContent!==o)t.textContent=o;
  var al="The order of the folders: "+o+". Press for the next.";if(b.getAttribute("aria-label")!==al)b.setAttribute("aria-label",al);}
function fitPulls(page){var front=page&&page.querySelector(".fd-drawer > .fd-dfront");if(!front||front.querySelector(".fd-find"))return;
  var hs=front.querySelectorAll(":scope > .fd-handle");if(hs.length!==2)return;front.removeAttribute("aria-hidden");
  var sm=front.querySelector(".fd-label small");if(sm&&!sm.id)sm.id="fdDrawerCount";
  var fl=mk("label","fd-handle fd-find");fl.title="Find a folder by its name or its parts";var inp=mk("input");inp.type="search";inp.id="fdFindIn";inp.placeholder="Find";
  inp.setAttribute("aria-label","Find a folder");if(sm)inp.setAttribute("aria-describedby",sm.id);inp.autocomplete="off";inp.spellcheck=false;inp.value=FIND;fl.appendChild(inp);
  var ob=mk("button","fd-handle fd-order");ob.type="button";ob.id="fdOrderKey";ob.title="Put the folders in order";ob.appendChild(mk("span","fd-eng",ORDERS[ordIndex()][1]));
  front.replaceChild(fl,hs[0]);front.replaceChild(ob,hs[1]);paintOrder();
  var lab=front.querySelector(".fd-label");if(lab&&!lab.classList.contains("fd-keyed")){lab.classList.add("fd-keyed");lab.setAttribute("role","button");lab.tabIndex=0;
    lab.addEventListener("click",function(e){e.preventDefault();flip();});
    lab.addEventListener("keydown",function(e){if(e.key==="Enter"||e.key===" "){e.preventDefault();flip();}});paintFilter();}
  inp.addEventListener("input",function(){FIND=inp.value.slice(0,80);refresh();});
  inp.addEventListener("keydown",function(e){if(e.key==="Escape"){e.preventDefault();e.stopPropagation();inp.value="";FIND="";refresh();inp.blur();}});
  ob.addEventListener("click",function(e){e.preventDefault();turn(e.shiftKey);});}

/* ---------- Your apps: each card's logo as Lector's layered seal ---------- */
function flatSrc(name,k,nt){var m=own(name);if(m)return m;
  if(k&&/^(cd|forge|ingenium|inkwell)$/.test(k)&&W.IngSeal&&typeof IngSeal.url==="function"){try{var u=IngSeal.url([k],{night:nt});if(u)return u;}catch(e){}}
  try{return L()&&IngAppLogo.src?IngAppLogo.src(name)||"":"";}catch(e){return "";}}
function layer(idle,src,z,side){var im=new Image();im.alt="";im.draggable=false;im.decoding="async";im.className="ls-l"+(side?" side":"");im.style.setProperty("--z",String(z||0));im.src=src;idle.appendChild(im);}
function fill(root){var name=root.__fdName,idle=root.querySelector(".ls-idle");if(!idle)return;[].slice.call(idle.querySelectorAll(".ls-l")).forEach(function(x){x.remove();});
  var mine=own(name),k=keyOf(name),nt=night(),A=W.LX7_LAYERS||{},ls=!mine&&k&&k!=="master"?(nt&&A[k+"N"]?A[k+"N"]:A[k]):null;root.__fdNight=nt;
  root.setAttribute("data-fd-seal",mine?"own":(k||"app"));
  if(ls&&ls.length){ls.forEach(function(L1){layer(idle,L1.src,L1.z,L1.side);});root.setAttribute("data-fd-layers",String(ls.length));return;}
  root.removeAttribute("data-fd-layers");var s=flatSrc(name,k,nt);if(s){layer(idle,s,0);return;}
  /* no logo known yet: a quiet disc in the same motion, never a letter, until the app's logo is found (modules/r277.js) */
  var d=mk("span","ls-l ing-logo-wait");d.style.setProperty("--z","0");idle.appendChild(d);
  try{if(L()&&IngAppLogo.find)IngAppLogo.find(name).then(function(f){if(f&&root.isConnected)fill(root);},function(){});}catch(e){}}
var SWAYN=0;
function lsFor(name,S){var k=keyOf(name);
  /* the Offline Project wears its live crest, its quarters moving, as on Lector (modules/r108.js sealEl) */
  if(k==="master"&&!own(name)&&W.IngSeal&&typeof IngSeal.el==="function"){try{var set=["cd","forge","ingenium","inkwell"],ar=(IngSeal.aspect&&IngSeal.aspect(set))||1.3333;
      var ce=IngSeal.el(set,{live:true,quarters:true,size:Math.round(S/ar),alt:""});if(ce){ce.classList.add("fd-lscrest");ce.setAttribute("aria-hidden","true");ce.setAttribute("data-fd-seal","master");return ce;}}catch(e){}}
  var root=mk("span","fd-ls");root.setAttribute("aria-hidden","true");root.style.setProperty("--S",S+"px");root.__fdName=name;
  var tilt=mk("span","ls-tilt"),idle=mk("span","ls-idle");
  /* as on Lector, the four never sway in step; any other app takes its own moment from its name */
  var dl={cd:0,forge:1.7,ingenium:3.4,inkwell:5.1}[k];if(dl==null){var h=0,s=String(name);for(var q=0;q<s.length;q++)h=(h*31+s.charCodeAt(q))>>>0;dl=(h%70)/10;}
  idle.style.animationDelay=(-dl)+"s";idle.appendChild(mk("i","ls-cast"));tilt.appendChild(idle);root.appendChild(tilt);fill(root);SWAYN++;return root;}
function dressCards(body){[].forEach.call(body.querySelectorAll(".fld-card:not(.fld-new)"),function(c){var nm=c.querySelector(".fld-name");if(!nm)return;
    if(nm.querySelector(":scope > .fd-ls,:scope > .fd-lscrest"))return;var name=nm.textContent.trim();if(!name)return;
    var old=nm.querySelector(":scope > .fd-seal,:scope > .fd-coin"),ls=lsFor(name,44);if(old)nm.replaceChild(ls,old);else nm.insertBefore(ls,nm.firstChild);});}
/* as on Lector: the seal under the pointer turns toward it and lifts; pressed, it sinks */
var wired=false;
function wire(page){if(wired||!page)return;wired=true;
  function off(x){x.classList.remove("hov","down");x.style.removeProperty("--rx");x.style.removeProperty("--ry");}
  page.addEventListener("pointermove",function(e){var t=e.target&&e.target.closest?e.target.closest(".fld-card"):null,ls=t&&t.querySelector(".fd-ls");
    [].forEach.call(page.querySelectorAll(".fd-ls.hov"),function(x){if(x!==ls)off(x);});
    if(!ls||e.pointerType==="touch"||still())return;var r=ls.getBoundingClientRect();if(!r.width)return;var px=(e.clientX-r.left)/r.width-.5,py=(e.clientY-r.top)/r.height-.5;ls.classList.add("hov");
    ls.style.setProperty("--ry",(clamp(px,-.8,.8)*30).toFixed(1)+"deg");ls.style.setProperty("--rx",(-clamp(py,-.8,.8)*24).toFixed(1)+"deg");},{passive:true});
  page.addEventListener("pointerleave",function(){[].forEach.call(page.querySelectorAll(".fd-ls.hov,.fd-ls.down"),off);},{passive:true});
  page.addEventListener("pointerdown",function(e){var t=e.target&&e.target.closest?e.target.closest(".fld-card"):null,ls=t&&t.querySelector(".fd-ls");if(ls&&!still())ls.classList.add("down");},{passive:true});
  ["pointerup","pointercancel"].forEach(function(n){page.addEventListener(n,function(){[].forEach.call(page.querySelectorAll(".fd-ls.down"),function(x){x.classList.remove("down");});},{passive:true});});}
/* by night the night layers, by day the day ones, as the Display changes */
try{new MutationObserver(function(){var nt=night();[].forEach.call(D.querySelectorAll("#page-folders .fd-ls"),function(r){if(r.__fdNight!==nt)fill(r);});}).observe(D.body,{attributes:true,attributeFilter:["data-theme"]});}catch(e){}

/* ---------- any app's logo: read from a picture, a Mac app's icon file or the app's own page ---------- */
function b64(u8){var s="",CH=0x8000;for(var i=0;i<u8.length;i+=CH)s+=String.fromCharCode.apply(null,u8.subarray(i,i+CH));return btoa(s);}
function readAs(file,how){return new Promise(function(res,rej){var fr=new FileReader();fr.onload=function(){res(fr.result);};fr.onerror=function(){rej(new Error(BAD));};
  if(how==="text")fr.readAsText(file);else if(how==="url")fr.readAsDataURL(file);else fr.readAsArrayBuffer(file);});}
/* a Mac app's icon file (.icns) holds its pictures one after another; the modern ones are PNG: the smallest at 256 pixels or more, else the largest */
function icnsPng(buf){var u=new Uint8Array(buf);if(u.length<16||String.fromCharCode(u[0],u[1],u[2],u[3])!=="icns")return null;var i=8,big=null,bigW=0,fit=null,fitW=1e9;
  while(i+8<=u.length){var len=((u[i+4]<<24)|(u[i+5]<<16)|(u[i+6]<<8)|u[i+7])>>>0;if(len<8||i+len>u.length)break;var d=u.subarray(i+8,i+len);
    if(d.length>24&&d[0]===0x89&&d[1]===0x50&&d[2]===0x4e&&d[3]===0x47){var w=((d[16]<<24)|(d[17]<<16)|(d[18]<<8)|d[19])>>>0;if(w>bigW){bigW=w;big=d;}if(w>=256&&w<fitW){fitW=w;fit=d;}}
    i+=len;}
  var pick=fit||big;return pick?"data:image/png;base64,"+b64(pick):null;}
/* an SVG logo is drawn in its own proportions (its viewBox, else its width and height), not in the 300 by 150 a browser gives one with no size */
function svgRatio(src){try{var t=String(src),i=t.indexOf(","),head=t.slice(0,i),body=t.slice(i+1);t=/;base64/i.test(head)?atob(body):decodeURIComponent(body);
    var m=/<svg\b[^>]*>/i.exec(t);if(!m)return 1;var tag=m[0],vb=/viewBox\s*=\s*["']\s*[-\d.]+[\s,]+[-\d.]+[\s,]+([\d.]+)[\s,]+([\d.]+)/i.exec(tag);
    if(vb&&+vb[1]>0&&+vb[2]>0)return Math.max(.25,Math.min(4,+vb[2]/+vb[1]));var w=/\bwidth\s*=\s*["']([\d.]+)/i.exec(tag),h=/\bheight\s*=\s*["']([\d.]+)/i.exec(tag);
    return w&&h&&+w[1]>0&&+h[1]>0?Math.max(.25,Math.min(4,+h[1]/+w[1])):1;}catch(e){return 1;}}
/* every logo kept is drawn once onto a canvas of at most 256 pixels a side: its true picture, small enough to keep, and proven readable */
function normalise(src){return new Promise(function(res,rej){var im=new Image(),svg=/^data:image\/svg/i.test(src);im.decoding="async";
  im.onload=function(){var w=im.naturalWidth,h=im.naturalHeight,r=svg?svgRatio(src):0;if(r){w=256;h=Math.round(256*r);}if(!w||!h){rej(new Error(BAD));return;}
    var out=null;for(var side=256;side>=96&&!out;side-=64){var k=Math.min(1,side/Math.max(w,h)),cw=Math.max(1,Math.round(w*k)),ch=Math.max(1,Math.round(h*k));
      try{var c=D.createElement("canvas");c.width=cw;c.height=ch;var x=c.getContext("2d");try{x.imageSmoothingQuality="high";}catch(e){}x.drawImage(im,0,0,cw,ch);
        var u=c.toDataURL("image/png");if(u.length<=MAXKEEP)out=u;}catch(e){break;}}
    if(out)res(out);else if(src.length<=MAXKEEP)res(src);else rej(new Error("That picture is too large to keep as a logo: choose a smaller one."));};
  im.onerror=function(){rej(new Error(BAD));};im.src=src;});}
function readLogo(file){if(!file)return Promise.reject(new Error(KINDS));var name=String(file.name||"").toLowerCase(),type=String(file.type||"").toLowerCase();
  if(/\.(html?|xhtml)$/.test(name)||type==="text/html"){return readAs(file.slice(0,3000000),"text").then(function(html){var s=L()&&IngAppLogo.iconOf?IngAppLogo.iconOf(html):null;
      if(s)return normalise(s);if(/<link\b[^>]*\brel\s*=\s*["'][^"']*\b(?:icon|apple-touch-icon)\b/i.test(html))throw new Error("That page's logo is a file beside it, not inside it: choose that picture.");
      throw new Error("That page names no logo of its own.");});}
  if(/\.icns$/.test(name)||type==="image/x-icns"||type==="image/icns"){return readAs(file,"bytes").then(function(buf){var s=icnsPng(buf);if(!s)throw new Error("That icon file holds no picture this page can read: choose a PNG of the icon.");return normalise(s);});}
  if(/^image\//.test(type)||/\.(png|jpe?g|webp|gif|svg|ico|avif|bmp)$/.test(name)){if(file.size>20*1024*1024)return Promise.reject(new Error("That picture is too large to keep as a logo: choose a smaller one."));
    return readAs(file,"url").then(function(u){u=String(u||"");var ext=(/\.([a-z0-9]+)$/.exec(name)||[])[1]||"",mt={png:"image/png",jpg:"image/jpeg",jpeg:"image/jpeg",webp:"image/webp",gif:"image/gif",svg:"image/svg+xml",ico:"image/x-icon",avif:"image/avif",bmp:"image/bmp"}[ext];
      /* a picture whose kind the system did not name is named by its ending */
      if(mt&&!/^data:image\//i.test(u)&&u.indexOf(",")>0)u="data:"+mt+";base64,"+u.split(",")[1];return normalise(u);});}
  return Promise.reject(new Error(KINDS));}
function take(name,file){return readLogo(file).then(function(src){if(!(L()&&IngAppLogo.setOwn&&IngAppLogo.setOwn(name,src)))throw new Error(BAD);repaint();
    say(name+" wears its own logo now: on its folder in the drawer, its card and its cover.");return src;},function(e){say(e&&e.message||BAD);throw e;});}
function giveBack(name){if(L()&&IngAppLogo.clearOwn&&IngAppLogo.clearOwn(name)){repaint();say(name+" wears its own logo again.");}}
function openP(){var id=G().ui.open,p=null;folders().forEach(function(f){if(f.id===id)p=f;});return p;}
function logoRow(hd){if(!hd||hd.querySelector(":scope > .fd-logorow"))return;var oh=hd.querySelector(":scope > .fd-oh"),p=openP();if(!oh||!p)return;var name=p.name;
  var row=mk("div","fd-logorow");row.setAttribute("role","group");row.setAttribute("aria-label",name+": its logo");row.appendChild(mk("span","fd-loglab","Its logo"));
  var fin=mk("input");fin.type="file";fin.hidden=true;fin.id="fdLogoFile";fin.setAttribute("aria-hidden","true");fin.tabIndex=-1;
  function keyB(t,fn,title){var b=mk("button","btn small",t);b.type="button";if(title)b.title=title;b.addEventListener("click",function(e){e.preventDefault();fn();});row.appendChild(b);return b;}
  keyB("Choose a picture",function(){fin.accept="image/png,image/jpeg,image/webp,image/gif,image/svg+xml,image/x-icon,image/vnd.microsoft.icon,image/avif,.png,.jpg,.jpeg,.webp,.gif,.svg,.ico,.avif,.icns";fin.click();},
    "A picture of the logo, or a Mac app's icon file (.icns)");
  keyB("From the app's page",function(){fin.accept=".html,.htm,text/html";fin.click();},"The app's own page: Ingenium reads the logo it names");
  if(own(name))keyB("Its own logo again",function(){giveBack(name);},"Puts back the logo "+name+" had before");
  fin.addEventListener("change",function(){var f=fin.files&&fin.files[0];fin.value="";if(f)take(name,f).catch(function(){});});row.appendChild(fin);
  row.appendChild(mk("span","fd-lognote","Or drop a picture or the app's page on its logo."));hd.appendChild(row);
  oh.addEventListener("dragover",function(e){if(e.dataTransfer&&[].indexOf.call(e.dataTransfer.types||[],"Files")>=0){e.preventDefault();oh.classList.add("fd-drop");}});
  oh.addEventListener("dragleave",function(){oh.classList.remove("fd-drop");});
  oh.addEventListener("drop",function(e){oh.classList.remove("fd-drop");var f=e.dataTransfer&&e.dataTransfer.files&&e.dataTransfer.files[0];if(!f)return;e.preventDefault();take(name,f).catch(function(){});});}

/* ---------- after Folders is dressed (modules/r263.js calls this each time) ---------- */
function dressed(page,body,inside){if(!page||!body)return;fitPulls(page);paintOrder();paintFilter();wire(page);
  if(inside)logoRow(body.querySelector(".fd-spread .fd-left > .fld-h")||body.querySelector(".fld-h"));else dressCards(body);}
W.IngFolderView={view:view,dressed:dressed,orders:ORDERS.map(function(o){return o[0];}),filters:FILTERS.map(function(o){return o[0];}),setFind:setFind,setOrder:setOrder,setFilter:setFilter,readLogo:readLogo,take:take,giveBack:giveBack,icnsPng:icnsPng,
  state:function(){return {find:FIND,order:ORDERS[ordIndex()][0],orderLabel:ORDERS[ordIndex()][1],filter:filt()};}};
/* Folders drawn before this part arrived: dress it again now */
refresh();
try{window.__ingParts["p279"]="running";}catch(_){}
})();
</script>
