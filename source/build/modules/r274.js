<style id="r274-css">
/* ============ R274 · SHARING MODELS BETWEEN HER DEVICES, MADE SIMPLE (Ingenium 6.81, 11 November 2026) ============
   Her words (9 November 2026): "I think that the process of sharing models between my devices is really convulated and not always
   straightforward. I want that process to be streamlined and simplified. I want it to be easy to do and for it to work everytime and with
   no issues"; on the live preview (11 November 2026): "I approve of this design but I think that the symbols next to HP laptop and MacBook
   Pro could be improved. Please push this everywhere", "please include the mac mini, the iPad, the iPhone and Fire Tablet as well and any
   other devices that I may purchase in the future", and of the drawn icons: "I approve of the new design, please push it everywhere".
   Measured on 6.79 (R74, R96, R97, r205): every device typed the lending computer's address and its code by hand; when that failed, a second
   way with another code; one address was kept, so a new address from the router broke it; connecting replaced the connected service
   (state.cloudPrev kept one); the Fire tablet, the iPhone and the iPad could not look for the computer at all.
   Now, in Settings, Models and AI, Your devices (the card #linkCard, its old parts kept in the page but hidden):
   - a computer that lends: one switch; its code in raised tiles, typed once on each device; its addresses; the models it lends as lenses;
     the devices using them, by name and kind, each with Remove (build/desktop/app_lend_681.py);
   - any device: Find my computers (the computer apps, the Fire and Android app, the iPhone and iPad app; a browser types the address once),
     the code typed once, then the computer is remembered (state.lend, so Ingenium Cloud carries it to her other devices) with every
     address it gave; it is found again by itself when Ingenium opens, when the network comes back, and before a message if it has not
     answered for a minute; a computer that changed its code or removed the device asks for the code again, once;
   - who answers: this device, each paired computer and each connected service, side by side; choosing the computer keeps the service
     (IngConnections.remember) and choosing the service keeps the computer; the top bar's menu lists the paired computers' models too;
   - each device and computer drawn by its kind: laptop, desktop, a computer without a screen of its own (Mac mini), tablet, phone, browser.
   Every card, lens and key is raised, leans toward the pointer, lifts and sinks (r271's .mr-pop; keys sound, r176). Nothing is redrawn while
   the page is left alone: the lender's card is drawn again only when what it says changes. */
#linkCard.ld-on{--mr-pp:2200px;border-radius:26px;border:0;background:radial-gradient(ellipse 80% 90% at 70% 30%,var(--mr-slab0) 0%,var(--mr-slab1) 82%);
  box-shadow:inset 0 1px 0 var(--mr-hi),0 0 0 1px var(--mr-ring),0 6px 0 var(--mr-slabEdge),0 22px 38px var(--mr-amb2),0 4px 10px var(--mr-amb2);padding:22px 20px;color:var(--mr-ink1)}
#linkCard.ld-on > :not(.ld-root):not(h2){display:none !important}
#linkCard.ld-on > h2{font:600 30px/1.1 var(--serif);margin:0 0 4px;color:var(--mr-ink1);text-shadow:0 1px 0 var(--mr-hi),0 2px 2px var(--mr-amb2);border:0;padding:0}
#linkCard .ld-root{display:grid;gap:16px}
#linkCard .ld-say{margin:0;color:var(--mr-ink2);font-size:13.5px;max-width:70ch}
#linkCard .ld-cols{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:22px;align-items:start}
#linkCard .ld-col{display:grid;gap:14px;min-width:0;align-content:start}
#linkCard .ld-eye{font:600 11px/1.2 var(--sans);letter-spacing:.24em;text-transform:uppercase;color:var(--mr-ink3)}
#linkCard .ld-eye b{color:var(--mr-acc);font-weight:600;margin-right:9px}
#linkCard .ld-head{display:flex;align-items:center;gap:12px;min-width:0}
#linkCard .ld-head h3{margin:0;font:600 25px/1.15 var(--serif);color:var(--mr-ink1);overflow-wrap:anywhere}
.ld-coin{width:50px;height:50px;border-radius:16px;display:grid;place-items:center;flex:0 0 auto;background:linear-gradient(var(--mr-keyA),var(--mr-keyB));box-shadow:var(--mr-sh-key);color:var(--mr-acc)}
.ld-coin svg{width:31px;height:31px;filter:drop-shadow(0 1px 0 var(--mr-hi))}
.ld-coin.ld-s{width:38px;height:38px;border-radius:12px}.ld-coin.ld-s svg{width:25px;height:25px}
#linkCard .ld-plate{display:grid;gap:11px;padding:15px;border-radius:19px}
#linkCard .ld-lbl{font:600 10.5px/1.25 var(--sans);letter-spacing:.17em;text-transform:uppercase;color:var(--mr-ink3)}
#linkCard .ld-sw{display:grid;grid-template-columns:auto minmax(0,1fr);gap:3px 14px;align-items:start;padding:13px 15px;border-radius:16px}
#linkCard .ld-sw b{font:600 13.5px/1.3 var(--sans);padding-top:3px}
#linkCard .ld-sw small{grid-column:2;color:var(--mr-ink3);font-size:12px;line-height:1.45}
#linkCard .ld-tog{grid-row:1 / span 2;position:relative;width:52px;height:30px;border:0;padding:0;border-radius:999px;cursor:pointer;background:var(--mr-sunk);box-shadow:var(--mr-sh-well);transition:background-color .25s}
#linkCard .ld-tog[aria-checked="true"]{background:linear-gradient(var(--mr-pa),var(--mr-pb));box-shadow:inset 0 2px 5px rgba(20,6,50,.4),inset 0 0 0 1px var(--mr-pedge)}
#linkCard .ld-tog i{--kx:0px;--ky:0px;position:absolute;left:3px;top:3px;width:24px;height:24px;border-radius:999px;background:linear-gradient(var(--mr-keyA),var(--mr-keyB));
  box-shadow:inset 0 1px 0 var(--mr-hi),0 0 0 1px var(--mr-hair),0 2px 0 var(--mr-edge),0 3px 6px var(--mr-amb1);transform:translate(var(--kx),var(--ky));
  transition:transform .42s cubic-bezier(.34,1.55,.6,1),width .2s ease}
#linkCard .ld-tog[aria-checked="true"] i{--kx:22px}
#linkCard .ld-tog:hover i{--ky:-1.5px}
#linkCard .ld-tog:active i{width:30px}
#linkCard .ld-tog[aria-checked="true"]:active i{--kx:16px}
#linkCard .ld-tiles{display:flex;flex-wrap:wrap;gap:6px;align-items:center}
#linkCard .ld-tile{display:inline-grid;place-items:center;width:34px;height:42px;border-radius:10px;background:linear-gradient(var(--mr-keyA),var(--mr-keyB));box-shadow:var(--mr-sh-key);
  font:700 19px/1 ui-monospace,"SF Mono",Menlo,Consolas,monospace;color:var(--mr-ink1)}
#linkCard .ld-dash{width:10px;height:3px;border-radius:2px;background:var(--mr-ink3);opacity:.6}
#linkCard .ld-addr{display:flex;flex-wrap:wrap;gap:7px;align-items:center;font-size:12.5px;color:var(--mr-ink2)}
#linkCard .ld-addr code{font:600 12px/1.4 ui-monospace,"SF Mono",Menlo,Consolas,monospace;padding:3px 8px;border-radius:8px;background:var(--mr-sunk);box-shadow:var(--mr-sh-well);color:var(--mr-ink1)}
#linkCard .ld-row{display:flex;flex-wrap:wrap;gap:9px;align-items:center}
#linkCard .ld-lenses{display:flex;flex-wrap:wrap;gap:12px;align-items:flex-start}
#linkCard .ld-lens{display:grid;justify-items:center;gap:5px;border:0;background:none;padding:6px 4px 4px;border-radius:14px;cursor:pointer;color:var(--mr-ink1);font:600 12px/1.2 var(--sans);max-width:110px;text-align:center}
#linkCard .ld-lens .ld-glass{width:52px;height:52px;border-radius:50%;
  background:radial-gradient(circle at 34% 30%,rgba(255,255,255,.75) 0%,rgba(255,255,255,0) 30%),radial-gradient(circle at 50% 58%,var(--lc,#b9a0ee) 0%,var(--lc2,#6a3fb5) 72%,var(--lc3,#2c1658) 100%);
  box-shadow:inset 0 -3px 6px rgba(0,0,0,.25),0 0 0 3px var(--mr-keyA),0 0 0 4px var(--mr-hair),0 4px 0 var(--mr-edge),0 8px 14px var(--mr-amb1);transition:box-shadow .25s ease}
#linkCard .ld-lens span:last-child{overflow-wrap:anywhere}
#linkCard .ld-lens small{font-weight:500;color:var(--mr-ink3);font-size:10.5px}
#linkCard .ld-lens.mr-ph .ld-glass{box-shadow:inset 0 -3px 6px rgba(0,0,0,.25),0 0 0 3px var(--mr-keyA),0 0 0 4px var(--mr-hair),0 6px 0 var(--mr-edge),0 12px 18px var(--mr-amb1)}
#linkCard .ld-lens.mr-pd .ld-glass{box-shadow:inset 0 2px 6px rgba(0,0,0,.35),0 0 0 3px var(--mr-keyA),0 0 0 4px var(--mr-hair),0 1px 0 var(--mr-edge)}
#linkCard .ld-lens.on .ld-glass{box-shadow:inset 0 -3px 6px rgba(0,0,0,.25),0 0 0 3px var(--mr-pa),0 0 0 5px var(--mr-keyA),0 4px 0 var(--mr-edge),0 8px 14px var(--mr-amb1)}
#linkCard .ld-lens.on b{color:var(--mr-acc)}
#linkCard .ld-users{display:grid;gap:9px}
#linkCard .ld-user{display:grid;grid-template-columns:auto minmax(0,1fr) auto;gap:2px 11px;align-items:center;padding:9px 11px;border-radius:14px;background:linear-gradient(var(--mr-card2),var(--mr-keyB));box-shadow:var(--mr-sh-small)}
#linkCard .ld-user.mr-ph{box-shadow:var(--mr-sh-smallhi)}
#linkCard .ld-user b,#linkCard .ld-comp b{font:600 13px/1.3 var(--sans)}
#linkCard .ld-user small,#linkCard .ld-comp small{display:block;color:var(--mr-ink3);font-size:11.5px}
#linkCard .ld-comp{display:grid;gap:12px;padding:14px;border-radius:18px}
#linkCard .ld-comp-h{display:grid;grid-template-columns:auto minmax(0,1fr) auto;gap:3px 11px;align-items:center}
#linkCard .ld-chip{display:inline-flex;align-items:center;gap:7px;padding:5px 11px;border-radius:999px;background:linear-gradient(var(--mr-keyA),var(--mr-keyB));box-shadow:var(--mr-sh-small);
  font:600 11.5px/1.25 var(--sans);color:var(--mr-ink2);max-width:100%}
#linkCard .ld-chip i{width:8px;height:8px;border-radius:50%;background:var(--mr-ink3);flex:0 0 auto}
#linkCard .ld-chip.ok{color:var(--mr-ok)}#linkCard .ld-chip.ok i{background:var(--mr-ok)}
#linkCard .ld-chip.re{color:var(--mr-warn)}#linkCard .ld-chip.re i{background:var(--mr-warn);animation:ldBlink 1s ease-in-out infinite}
#linkCard .ld-chip.bad{color:var(--mr-warn)}#linkCard .ld-chip.bad i{background:var(--mr-warn)}
@keyframes ldBlink{50%{opacity:.3}}
#linkCard .ld-scan{position:relative;display:grid;place-items:center;height:110px;border-radius:17px;background:var(--mr-sunk);box-shadow:var(--mr-sh-well);overflow:hidden}
#linkCard .ld-scan i{position:absolute;width:30px;height:30px;border-radius:50%;border:2px solid var(--mr-acc);opacity:0;animation:ldPing 1.6s ease-out infinite}
#linkCard .ld-scan i:nth-child(2){animation-delay:.5s}#linkCard .ld-scan i:nth-child(3){animation-delay:1s}
#linkCard .ld-scan span{position:relative;font:600 12.5px/1.3 var(--sans);color:var(--mr-ink2);background:var(--mr-keyA);padding:6px 11px;border-radius:10px;box-shadow:var(--mr-sh-small)}
@keyframes ldPing{0%{transform:scale(.4);opacity:.9}100%{transform:scale(6);opacity:0}}
#linkCard .ld-found{display:grid;grid-template-columns:auto minmax(0,1fr) auto;gap:3px 12px;align-items:center;padding:12px 13px;border-radius:16px;border:0;width:100%;text-align:left;cursor:pointer;color:var(--mr-ink1)}
#linkCard .ld-found b{font:600 13.5px/1.3 var(--sans)}
#linkCard .ld-found small{display:block;color:var(--mr-ink3);font-size:11.5px}
#linkCard .ld-code{display:flex;gap:9px;align-items:center;flex-wrap:wrap;padding:12px;border-radius:16px}
#linkCard .ld-code label{flex:1 1 100%;font:600 12.5px/1.4 var(--sans);color:var(--mr-ink2)}
#linkCard .ld-well{flex:1 1 170px;min-width:0;border-radius:12px;background:var(--mr-sunk);box-shadow:var(--mr-sh-well);padding:0 12px}
#linkCard .ld-well:focus-within{box-shadow:var(--mr-sh-well),0 0 0 2px var(--mr-acc)}
#linkCard .ld-well input{width:100%;min-height:38px;border:0;outline:0;background:transparent;color:var(--mr-ink1);font:600 14px/1.2 var(--sans)}
#linkCard .ld-well input.ld-codein{font:700 17px/1 ui-monospace,"SF Mono",Menlo,Consolas,monospace;letter-spacing:.16em;text-transform:uppercase}
#linkCard .ld-err{flex:1 1 100%;margin:0;font-size:12.5px;line-height:1.45;color:var(--mr-warn)}
#linkCard .ld-who{display:grid;gap:8px}
#linkCard .ld-who .mr-key{justify-content:flex-start;width:100%;min-height:42px;padding:0 13px;gap:10px}
#linkCard .ld-who .mr-key small{margin-left:auto;font-weight:500;color:var(--mr-ink3);overflow:hidden;text-overflow:ellipsis;white-space:nowrap;max-width:55%}
#linkCard .ld-who .mr-key[aria-pressed="true"]{background:linear-gradient(var(--mr-pa),var(--mr-pb));color:#fff;box-shadow:var(--mr-sh-pkey)}
#linkCard .ld-who .mr-key[aria-pressed="true"] small{color:rgba(255,255,255,.88)}
#linkCard details.ld-fix{padding:12px 15px;border-radius:16px}
#linkCard details.ld-fix summary{cursor:pointer;font:600 13.5px/1.3 var(--sans)}
#linkCard details.ld-fix ol{margin:10px 0 4px;padding-left:20px;display:grid;gap:7px;color:var(--mr-ink2);font-size:13px}
#linkCard details.ld-fix .ld-old{margin-top:10px;display:grid;gap:10px}
#linkCard details.ld-fix .ld-old .lk-subpart,#linkCard details.ld-fix .ld-old .lk-lend:not([hidden]){display:block !important}
#linkCard .ld-warn{padding:11px 13px;border-radius:14px;background:linear-gradient(var(--mr-warnA),var(--mr-warnB));color:var(--mr-warn);font-size:12.5px;line-height:1.45;
  box-shadow:inset 0 1px 0 var(--mr-hi),0 0 0 1px var(--mr-hair2),0 2px 0 var(--mr-warnedge)}
#linkCard .ld-warn .mr-key{margin-top:8px}
/* the top bar's menu: the paired computers' models, in the 6.78 rows (r270) */
#waPop .ld-sec{margin:4px 0 2px;padding-top:4px;border-top:1px solid var(--hairline)}
#waPop .ld-sec .tl-row svg{width:24px;height:24px;flex:0 0 auto;color:var(--accent)}
#waPop .ld-sec .tl-row.on svg{color:#fff}
@media (max-width:1100px){#linkCard .ld-cols{grid-template-columns:minmax(0,1fr)}}
@media (max-width:520px){#linkCard.ld-on{padding:18px 13px;border-radius:22px}#linkCard .ld-comp-h,#linkCard .ld-user,#linkCard .ld-found{grid-template-columns:auto minmax(0,1fr)}
  #linkCard .ld-comp-h > :last-child,#linkCard .ld-user > :last-child,#linkCard .ld-found > :last-child{grid-column:1 / -1;justify-self:start}}
@media (prefers-reduced-motion:reduce){#linkCard .ld-scan i,#linkCard .ld-chip.re i{animation:none}#linkCard .ld-tog i{transition:none}}
body[data-motion="minimal"] #linkCard .ld-scan i,body[data-motion="minimal"] #linkCard .ld-chip.re i{animation:none}
@media (forced-colors:active){#linkCard.ld-on,#linkCard .ld-plate,#linkCard .ld-comp{border:1px solid CanvasText}}
</style>
<script>try{(window.__ingParts=window.__ingParts||{})["p274"]="started";}catch(_){}
(function(){"use strict";var W=window,D=document;
if(W.IngLend||typeof W.netFetch!=="function"){try{W.__ingParts["p274"]="running";}catch(_){}return;}
function $(id){return D.getElementById(id);}
function mk(t,c,x){var e=D.createElement(t);if(c)e.className=c;if(x!=null)e.textContent=x;return e;}
function still(){try{return W.matchMedia("(prefers-reduced-motion: reduce)").matches||D.body.getAttribute("data-motion")==="minimal";}catch(e){return false;}}
function save(){try{W.saveState();}catch(e){}}
function toast(t){try{W.ingToast(t);}catch(e){}}
function plural(n,one,many){return n+" "+(n===1?one:many);}
function shell(){try{return (W.pywebview&&W.pywebview.api)||null;}catch(e){return null;}}
function nat(){try{return W.INB||null;}catch(e){return null;}}
function key(txt,cls,fn,label){var b=mk("button","mr-key mr-pop"+(cls?" "+cls:""),txt);b.type="button";if(label)b.setAttribute("aria-label",label);b.addEventListener("click",fn);return b;}

/* ---------- each device drawn by its kind ---------- */
var ICON={laptop:'<path d="M4.6 5.4c0-1 .8-1.8 1.8-1.8h11.2c1 0 1.8.8 1.8 1.8v9.8H4.6z" fill="currentColor" fill-opacity=".16"/><path d="M7 6h10v6.9H7z" fill="currentColor" fill-opacity=".12" stroke-width="1.2"/><path d="M2.4 17.2h19.2l-1 1.8c-.3.5-.9.9-1.5.9H4.9c-.6 0-1.2-.4-1.5-.9z" fill="currentColor" fill-opacity=".3"/><path d="M10.3 17.2h3.4"/>',
  desktop:'<rect x="2.6" y="3.4" width="18.8" height="12.6" rx="1.8" fill="currentColor" fill-opacity=".16"/><rect x="4.6" y="5.4" width="14.8" height="8.6" rx=".8" fill="currentColor" fill-opacity=".12" stroke-width="1.2"/><path d="M10 16v3.4M14 16v3.4"/><path d="M7.4 20.2h9.2"/>',
  box:'<rect x="3" y="8.2" width="18" height="7.6" rx="2.8" fill="currentColor" fill-opacity=".2"/><path d="M6.8 12h.01"/><path d="M5.2 18.6h13.6" stroke-opacity=".6"/>',
  tablet:'<rect x="5.2" y="2.4" width="13.6" height="19.2" rx="2.6" fill="currentColor" fill-opacity=".16"/><rect x="7.2" y="4.6" width="9.6" height="12.6" rx="1" fill="currentColor" fill-opacity=".12" stroke-width="1.2"/><path d="M10.7 19.3h2.6"/>',
  phone:'<rect x="7" y="2.2" width="10" height="19.6" rx="2.6" fill="currentColor" fill-opacity=".16"/><rect x="8.7" y="5" width="6.6" height="12" rx=".9" fill="currentColor" fill-opacity=".12" stroke-width="1.2"/><path d="M11 19.4h2"/>',
  browser:'<rect x="2.8" y="4" width="18.4" height="16" rx="2.4" fill="currentColor" fill-opacity=".14"/><path d="M2.8 8.6h18.4"/><path d="M5.6 6.3h.01M7.8 6.3h.01M10 6.3h.01"/>'};
function svg(kind){return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">'+(ICON[kind]||ICON.laptop)+'</svg>';}
function coin(kind,small){var c=mk("span","ld-coin"+(small?" ld-s":""));c.setAttribute("aria-hidden","true");c.innerHTML=svg(kind);return c;}
var KIND_WORD={laptop:"laptop",desktop:"desktop computer",box:"computer",tablet:"tablet",phone:"phone",browser:"web browser"};

/* ---------- this device: its id (this device only), its kind and its name (by its kind, never its owner's name) ---------- */
var DEVK="ing.lend.device",ME=null;
function guess(){var ua=navigator.userAgent||"";
  if(/iPad/.test(ua)||(/Macintosh/.test(ua)&&navigator.maxTouchPoints>1&&nat()))return {kind:"tablet",name:"iPad"};
  if(/iPhone/.test(ua))return {kind:"phone",name:"iPhone"};
  if(/\bKF[A-Z]{2,5}\b|Silk\//.test(ua))return {kind:"tablet",name:"Fire tablet"};
  if(/Android/.test(ua))return /Mobile/.test(ua)?{kind:"phone",name:"Android phone"}:{kind:"tablet",name:"Android tablet"};
  if(shell())return {kind:/Mac/.test(ua)?"laptop":"laptop",name:"This computer"};
  return {kind:"browser",name:"A web browser"};}
function me(){if(ME)return ME;var d=null;try{d=JSON.parse(W.localStorage.getItem(DEVK)||"null");}catch(e){d=null;}
  if(!d||!/^[A-Za-z0-9_-]{6,40}$/.test(String(d.id||""))){d={id:"d"+Math.random().toString(36).slice(2,10)+Date.now().toString(36).slice(-5),kind:"",name:""};}
  if(!d.kind||!d.name){var g=guess();d.kind=d.kind||g.kind;d.name=d.name||g.name;}
  ME=d;keepMe();return d;}
function keepMe(){try{W.localStorage.setItem(DEVK,JSON.stringify(ME));}catch(e){}}
function devHeader(){var d=me();return "id="+encodeURIComponent(d.id)+";kind="+encodeURIComponent(d.kind||"")+";name="+encodeURIComponent(d.name||"");}
/* the apps say better what they are: the computer its name and kind, the Fire, iPhone and iPad apps their kind */
function learnMe(){var a=shell(),n=nat();
  if(a&&typeof a.share_status==="function")Promise.resolve().then(function(){return a.share_status();}).then(function(st){if(!st)return;var d=me(),ch=false;
    if(st.computer&&d.name!==st.computer){d.name=String(st.computer).slice(0,40);ch=true;}if(st.kind&&ICON[st.kind]&&d.kind!==st.kind){d.kind=st.kind;ch=true;}if(ch){keepMe();paint();}},function(){});
  else if(n&&typeof n.call==="function")Promise.resolve().then(function(){return n.call("deviceInfo",{});}).then(function(r){if(!r)return;var d=me(),ch=false;
    if(r.name&&d.name!==r.name){d.name=String(r.name).slice(0,40);ch=true;}if(r.kind&&ICON[r.kind]&&d.kind!==r.kind){d.kind=r.kind;ch=true;}if(ch){keepMe();paint();}},function(){});}

/* ---------- the computers this device uses (state.lend: Ingenium Cloud carries it to her other devices) ---------- */
function L(){var s=W.state;if(!s.lend||typeof s.lend!=="object")s.lend={};if(!Array.isArray(s.lend.computers))s.lend.computers=[];return s.lend;}
function comps(){return L().computers;}
function byId(id){var a=comps(),i;for(i=0;i<a.length;i++)if(a[i].id===id)return a[i];return null;}
function base(addr){try{if(typeof W.lkBase==="function")return W.lkBase(addr);}catch(e){}var a=String(addr||"").trim().replace(/^https?:\/\//i,"").replace(/\/.*$/,"");if(!a)return "";if(!/:\d+$/.test(a))a+=":17860";return "http://"+a;}
function codeOf(c){try{if(typeof W.lkCode==="function")return W.lkCode(c);}catch(e){}return String(c||"").toUpperCase().replace(/[^A-Z0-9]/g,"").replace(/^(.{4})(.+)$/,"$1-$2");}
function merge(){var out=[],seen={};[].slice.call(arguments).forEach(function(l){(l||[]).forEach(function(b){b=String(b||"").replace(/\/v1\/?$/,"").replace(/\/+$/,"");if(b&&/^http:\/\//.test(b)&&!seen[b]){seen[b]=1;out.push(b);}});});return out.slice(0,10);}
function hostOf(b){return String(b||"").replace(/^http:\/\//,"").replace(/:17860$/,"");}
function active(){try{var c=W.state.cloud||{},src=typeof W.chatSource==="function"?W.chatSource():W.state.chatSource;if(src!=="cloud"||!c.on||c.provider!=="ingenium")return null;
  if(c.lendId&&byId(c.lendId))return byId(c.lendId);var b=String(c.base||"").replace(/\/v1$/,"");return comps().filter(function(x){return x.base===b||(x.addrs||[]).indexOf(b)>=0;})[0]||null;}catch(e){return null;}}
/* a computer paired before 6.81 (R74's Connect) is kept as one of hers */
function adopt(){try{var c=W.state.cloud||{};if(c.provider!=="ingenium"||!c.key||!c.base||/\/ingenium\/via\//.test(c.base))return;var b=String(c.base).replace(/\/v1$/,"");
    if(comps().some(function(x){return x.base===b||(x.addrs||[]).indexOf(b)>=0;}))return;
    comps().push({id:"addr:"+hostOf(b),name:c.computer||"Your computer",kind:"laptop",code:codeOf(c.key),base:b,addrs:[b],models:(c.models||[]).slice(0,60),info:c.info||{},pair:0,model:c.model||"",at:Date.now()});save();}catch(e){}}

/* ---------- every request to a paired computer names this device (a browser only to a computer of 6.81 or later, which allows it) ---------- */
function wantsHeader(url){var u=String(url||"");var a=comps();for(var i=0;i<a.length;i++){var c=a[i];if(!(c.pair||!/^web$/.test(mode())))continue;
    var bs=[c.base].concat(c.addrs||[]);for(var j=0;j<bs.length;j++){if(bs[j]&&u.indexOf(bs[j]+"/")===0)return true;}}return false;}
function mode(){try{return typeof W.netMode==="function"?W.netMode():"web";}catch(e){return "web";}}
(function wrapNet(){var o=W.netFetch;if(typeof o!=="function"||o.__r274)return;
  var n=function(url,opt){try{if(wantsHeader(url)){opt=Object.assign({},opt||{});opt.headers=Object.assign({},opt.headers||{},{"X-Ingenium-Device":devHeader()});}}catch(e){}return o.call(this,url,opt);};
  try{Object.keys(o).forEach(function(k){n[k]=o[k];});}catch(e){}n.__r274=true;W.netFetch=n;try{netFetch=n;}catch(e){}})();
function get(b,path,code,t){var h={};if(code)h.Authorization="Bearer "+codeOf(code);return W.netFetch(b+path,{headers:h,timeout:t||6});}
function hello(b,t){return get(b,"/ingenium/hello",null,t||4).then(function(r){if(!r.ok)throw new Error("answered "+r.status);return r.json();});}
function errOf(r){return Promise.resolve().then(function(){return r.json();}).catch(function(){return null;}).then(function(j){var e=new Error((j&&j.error&&j.error.message)||("The computer answered "+r.status+"."));
  e.status=r.status;e.removed=!!(j&&j.error&&j.error.removed);throw e;});}
function models(b,code){return get(b,"/v1/models",code,10).then(function(r){if(!r.ok)return errOf(r);return r.json();}).then(function(d){return ((d&&d.data)||[]).filter(function(m){return m&&m.name;});});}
function infoOf(list){var info={};list.forEach(function(m){try{info[m.name]=typeof W.lkInfoOf==="function"?W.lkInfoOf(m):{lineup:m.lineup||"",file:m.file||"",size:m.size||0};}catch(e){info[m.name]={};}});return info;}
function bestOf(list){try{var b=typeof W.lkBestAdvised==="function"?W.lkBestAdvised(list):"";if(b)return b;}catch(e){}try{if(typeof W.lkBest==="function")return W.lkBest(list);}catch(e){}return (list[0]||{}).name||"";}
function why(e,b){var m=String(e&&e.message||e||"");if(e&&e.status===401)return e.removed?"This device was removed on that computer. Type its code again.":"The code is not the one that computer shows. Check it there, in Settings, Your devices.";
  if(e&&e.status===429)return "Too many wrong codes were tried from this device. Wait ten minutes, then try again.";
  try{if(typeof W.lkWhy0==="function")return W.lkWhy0(e,b);}catch(x){}return m||"It could not be reached.";}

/* ---------- finding the computers on this Wi-Fi ---------- */
function canFind(){var a=shell(),n=nat();return !!((a&&typeof a.share_find==="function")||(n&&typeof n.call==="function"));}
var FIND={busy:false,list:null,err:""};
function find(){var a=shell(),n=nat();if(FIND.busy)return FIND.busy;
  var p=Promise.resolve().then(function(){if(a&&typeof a.share_find==="function")return a.share_find();if(n)return n.call("findLenders",{});return {found:[]};})
    .then(function(r){r=r||{};var f=(r.found||[]).filter(function(x){return x&&x.address&&x.lends!==false;}),seen={},out=[];
      f.forEach(function(x){var k=x.id||x.address;if(seen[k])return;seen[k]=1;out.push(x);});
      FIND.err=!out.length?(r.error==="LOCALNET"?"LOCALNET":(r.error==="NONET"?"NONET":"")):"";
      out.forEach(function(x){var c=x.id?byId(x.id):null;if(c){c.addrs=merge(c.addrs,[base(x.address)],(x.addresses||[]).map(base));}});
      FIND.list=out;return out;},function(e){FIND.err=String(e&&e.message||e);FIND.list=[];return [];})
    .then(function(v){FIND.busy=false;return v;});
  FIND.busy=p;return p;}

/* ---------- pairing once ---------- */
function pair(addr,code,known){var b=base(addr),c=codeOf(code),h0=null,p0=null;
  if(!b)return Promise.reject(new Error("Type the address that the computer shows."));
  if(c.replace(/-/g,"").length<8)return Promise.reject(new Error("Type the eight-letter code that the computer shows."));
  return hello(b,8).catch(function(e){throw new Error(why(e,b));}).then(function(h){if(!h||h.app!=="Ingenium")throw new Error("Something answered at that address, but it is not Ingenium.");h0=h;
      if(!h.pair)return null;
      return W.netFetch(b+"/ingenium/pair",{method:"POST",headers:{"Authorization":"Bearer "+c,"Content-Type":"application/json","X-Ingenium-Device":devHeader()},
        body:JSON.stringify({id:me().id,kind:me().kind,name:me().name}),timeout:15}).then(function(r){if(!r.ok)return errOf(r);return r.json();});})
    .then(function(p){p0=p;if(h0.lends===false)throw new Error((h0.computer||"That computer")+" is not lending its models now. Switch on Lend my models to my devices there.");return models(b,c);})
    .then(function(list){if(!list.length)throw new Error("Paired, but that computer has no models yet. Install one on it first.");
      var id=(p0&&p0.id)||h0.id||("addr:"+hostOf(b)),comp=byId(id)||(known&&byId(known))||null;
      if(!comp){comp={id:id};comps().push(comp);}
      if(comp.id!==id)comp.id=id;
      comp.name=String((p0&&p0.computer)||h0.computer||comp.name||"Your computer").slice(0,60);comp.kind=ICON[(p0&&p0.kind)||h0.kind]?((p0&&p0.kind)||h0.kind):(comp.kind||"laptop");
      comp.code=c;comp.base=b;comp.addrs=merge([b],comp.addrs,((p0&&p0.addresses)||h0.addresses||[]).map(base));comp.pair=h0.pair?1:0;
      comp.models=list.map(function(m){return m.name;}).slice(0,60);comp.info=infoOf(list);if(!comp.model||comp.models.indexOf(comp.model)<0)comp.model=bestOf(list);
      delete comp.removed;comp.at=Date.now();OK[comp.id]=Date.now();setSt(comp.id,"ok");save();return comp;},function(e){throw new Error(e&&e.status?why(e,b):String(e&&e.message||e));});}

/* ---------- found again by itself: at every address it gave, then by looking on the Wi-Fi ---------- */
var ST={},OK={},CHK={};
function setSt(id,s,msg){var o=ST[id];if(o&&o.s===s&&o.msg===(msg||""))return;ST[id]={s:s,msg:msg||""};paintSoon();}
function reach(comp){var list=merge([comp.base],comp.addrs),i=0;
  function next(){if(i>=list.length)return Promise.resolve(null);var b=list[i++];
    return hello(b,4).then(function(h){if(h&&h.app==="Ingenium"&&(!h.id||/^addr:/.test(comp.id)||h.id===comp.id))return {b:b,h:h};return next();},function(){return next();});}
  return next();}
function check(comp,opt){opt=opt||{};if(!comp)return Promise.resolve(false);if(CHK[comp.id])return CHK[comp.id];var id=comp.id;
  if(!ST[id]||ST[id].s!=="ok"||opt.loud)setSt(id,"re");
  var p=reach(comp).then(function(r){if(r||!opt.find||!canFind())return r;return find().then(function(list){var f=list.filter(function(x){return x.id&&x.id===comp.id;})[0];
        if(!f)return null;comp.addrs=merge(comp.addrs,[base(f.address)],(f.addresses||[]).map(base));return reach(comp);});})
    .then(function(r){if(!r){setSt(id,"away");return false;}
      var was=comp.base;comp.base=r.b;comp.addrs=merge([r.b],comp.addrs,(r.h.addresses||[]).map(base));if(r.h.computer)comp.name=String(r.h.computer).slice(0,60);if(r.h.kind&&ICON[r.h.kind])comp.kind=r.h.kind;comp.pair=r.h.pair?1:0;
      if(r.h.id&&/^addr:/.test(comp.id)&&!byId(r.h.id)){if(W.state.cloud&&W.state.cloud.lendId===comp.id)W.state.cloud.lendId=r.h.id;comp.id=r.h.id;}
      if(r.h.lends===false){setSt(comp.id,"off");save();return false;}
      return models(r.b,comp.code).then(function(list){comp.models=list.map(function(m){return m.name;}).slice(0,60);comp.info=infoOf(list);delete comp.removed;OK[comp.id]=Date.now();
          follow(comp,was);setSt(comp.id,"ok");save();paintSoon();return true;},
        function(e){if(e&&e.status===401){comp.removed=e.removed?1:0;setSt(comp.id,"code");}else setSt(comp.id,"away",why(e,r.b));save();return false;});})
    .then(function(v){delete CHK[id];return v;},function(){delete CHK[id];setSt(comp.id,"away");return false;});
  CHK[id]=p;return p;}
/* the chat's connection follows the computer to its new address */
function follow(comp,was){try{var c=W.state.cloud||{};if(c.provider!=="ingenium")return;var b=String(c.base||"").replace(/\/v1$/,"");
  if(c.lendId===comp.id||b===was||(comp.addrs||[]).indexOf(b)>=0){c.base=comp.base+"/v1";c.addr=hostOf(comp.base)+(/:\d+$/.test(hostOf(comp.base))?"":"");c.key=comp.code;c.lendId=comp.id;c.computer=comp.name;
    c.models=(comp.models||[]).slice();c.info=comp.info||c.info;try{W.lkSyncCx();}catch(e){}}}catch(e){}}

/* ---------- who answers: this device, each paired computer, each connected service, side by side ---------- */
function repaintChat(){try{W.paintSrc();}catch(e){}try{W.paintChatTop();}catch(e){}try{W.renderEngineCtl();}catch(e){}try{W.lkSyncCx();}catch(e){}try{if(W.IngConnections)W.IngConnections.paint();}catch(e){}}
function use(comp,model){if(!comp)return;if(ST[comp.id]&&ST[comp.id].s==="code"){toast("Type "+comp.name+"'s code first, once.");return;}
  try{if(W.IngConnections&&W.IngConnections.remember)W.IngConnections.remember();}catch(e){}   /* the service in use is kept, one press away */
  var c=W.state.cloud||{};if(c.provider&&c.provider!=="ingenium"){try{W.state.cloudPrev=JSON.parse(JSON.stringify(c));}catch(e){}}
  var m=model&&comp.models.indexOf(model)>=0?model:(comp.model&&comp.models.indexOf(comp.model)>=0?comp.model:(comp.models[0]||""));comp.model=m;
  W.state.cloud={provider:"ingenium",base:comp.base+"/v1",key:comp.code,model:m,models:(comp.models||[]).slice(),info:comp.info||{},on:true,computer:comp.name,addr:hostOf(comp.base),lendId:comp.id};
  W.state.chatSource="cloud";try{var cc=W.curChat();if(cc)cc.cx={source:"cloud"};}catch(e){}save();repaintChat();paint();
  toast((m||"Its model")+" on "+comp.name+" answers your chats.");if(!OK[comp.id]||Date.now()-OK[comp.id]>60000)check(comp,{find:true});}
function useDevice(){W.state.chatSource="local";try{var cc=W.curChat();if(cc)cc.cx={source:"local"};}catch(e){}save();repaintChat();paint();toast("This device's own model answers. Your computers stay paired.");}
function useKept(k){try{W.IngConnections.use(k,k.model);}catch(e){}paint();}
function localName(){try{var m=(W.state.models||[]).filter(function(x){return x.id===W.state.activeModelId;})[0];return m?(m.customName||m.name||""):"";}catch(e){return "";}}
function forget(comp){var a=comps(),i=a.indexOf(comp);if(i<0)return;a.splice(i,1);if(active()===comp||(W.state.cloud&&W.state.cloud.lendId===comp.id)){W.state.chatSource="local";if(W.state.cloud)W.state.cloud.on=false;}
  save();repaintChat();paint();toast("This device forgot "+comp.name+". Pair again with its code.");}

/* ---------- before a message: a computer that has not answered for a minute is found first ---------- */
var SENDING=false;
(function wrapSend(){var o=W.sendChat;if(typeof o!=="function"||o.__r274)return;
  var n=function(){var self=this,a=arguments,c=active();if(!c||SENDING||(OK[c.id]&&Date.now()-OK[c.id]<60000))return o.apply(self,a);
    SENDING=true;var done=false,t=setTimeout(function(){if(!done)toast("Finding "+c.name+" on this Wi-Fi…");},700);
    function go(){if(done)return;done=true;clearTimeout(t);SENDING=false;o.apply(self,a);}
    check(c,{find:true}).then(go,go);setTimeout(go,12000);};
  try{Object.keys(o).forEach(function(k){n[k]=o[k];});}catch(e){}n.__r274=true;W.sendChat=n;try{sendChat=n;}catch(e){}})();
W.addEventListener("online",function(){var c=active();if(c)check(c,{find:true});});

/* ---------- the card: Settings, Models and AI, Your devices ---------- */
var LS=null,LSIG="",PT=0,UI={adding:false,code:{},addr:"",acode:"",err:{},busy:{},scan:false};
function card(){return $("linkCard");}
function keptSig(){var L=[];try{L=(W.IngConnections&&W.IngConnections.kept())||[];}catch(e){}return L.filter(function(k){return k&&k.provider&&k.provider!=="ingenium";}).slice(0,4).map(function(k){return [k.id||"",k.provider,k.base||"",k.model||""];});}   /* a service kept or forgotten elsewhere shows here at once */
function paintSoon(){if(PT)return;PT=setTimeout(function(){PT=0;paint();},0);}
function lensEl(name,comp,on){var b=mk("button","ld-lens mr-pop");b.type="button";var g=mk("span","ld-glass");g.setAttribute("aria-hidden","true");
  var col=colorOf(name);if(col){b.style.setProperty("--lc",col[0]);b.style.setProperty("--lc2",col[1]);b.style.setProperty("--lc3",col[2]);}
  var inf=comp&&comp.info?comp.info[name]:null;b.append(g,mk("b",null,short(name)));if(inf&&(inf.size||inf.advice)){var sm=mk("small",null,[inf.size?gb(inf.size):"",inf.advice&&W.lkAdvWord?W.lkAdvWord(inf.advice):""].filter(Boolean).join(" · "));b.appendChild(sm);}
  b.classList.toggle("on",!!on);b.setAttribute("aria-pressed",on?"true":"false");b.title=name;
  if(comp){b.setAttribute("aria-label","Use "+name+" from "+comp.name);b.addEventListener("click",function(){use(comp,name);});}
  else{b.setAttribute("aria-label",name+", lent by this computer");b.addEventListener("click",function(){toast(name+" is one of the models this computer lends.");});}
  return b;}
function short(n){n=String(n||"");return n.length>22?n.slice(0,21)+"…":n;}
function gb(n){n=+n||0;return n>=1e9?(n/1e9).toFixed(1)+" GB":Math.max(1,Math.round(n/1e6))+" MB";}
var PAL=[["#b9a0ee","#6a3fb5","#2c1658"],["#a9c8f0","#3b6ea8","#16304f"],["#f2bccf","#a8476b","#4a1428"],["#bfe6d2","#3f9a6c","#174a31"],["#f0d2b0","#b0743a","#4f2e10"]];
function colorOf(name){var h=0,s=String(name||"");for(var i=0;i<s.length;i++)h=(h*31+s.charCodeAt(i))>>>0;return PAL[h%PAL.length];}
function sw(id,title,says,on,fn){var w=mk("div","ld-sw mr-c3 mr-pop");var b=mk("button","ld-tog");b.type="button";b.id=id;b.setAttribute("role","switch");b.setAttribute("aria-checked",on?"true":"false");
  var t=mk("b",null,title);t.id=id+"T";b.setAttribute("aria-labelledby",t.id);b.appendChild(mk("i"));b.addEventListener("click",function(){fn(b.getAttribute("aria-checked")!=="true");});
  w.append(b,t,mk("small",null,says));return w;}
function ago(t){var s=Math.max(0,(Date.now()/1000)-(+t||0));if(!t)return "";if(s<120)return "just now";var d0=new Date(),d1=new Date(t*1000);
  if(d0.toDateString()===d1.toDateString())return "today";var y=new Date(Date.now()-86400000);if(y.toDateString()===d1.toDateString())return "yesterday";return Math.round(s/86400)+" days ago";}

/* the computer that lends (a computer app only) */
function lenderCol(col){var a=shell();if(!(a&&typeof a.share_status==="function"))return;var st=LS;
  var head=mk("div","ld-head");head.append(coin(st&&st.kind||"laptop"),mk("h3",null,(st&&st.computer)||"This computer"));col.append(mk("div","ld-eye"),head);col.firstChild.innerHTML="<b>Lends its models</b>This computer";
  col.appendChild(sw("ldShare","Lend my models to my devices",st&&st.on?"On. This computer stays awake while it lends (its screen may turn off), and it lends again by itself when Ingenium opens.":"Off. Switch it on, and your other devices on this Wi-Fi find this computer by themselves.",!!(st&&st.on),function(on){
    var i=$("ldShare");if(i)i.setAttribute("aria-checked",on?"true":"false");Promise.resolve().then(function(){return a.share_set(on);}).then(function(s){LS=s;paint();toast(on?"This computer lends its models now.":"This computer stopped lending.");},function(e){toast("It could not change: "+(e&&e.message||e));});}));
  if(!st||!st.on){if(st&&st.error){var w=mk("div","ld-warn",st.error);col.appendChild(w);}return;}
  var f=st.firewall;if(f&&f.on&&f.blocked&&typeof a.share_firewall_allow==="function"){var fw=mk("div","ld-warn",f.block_all?"This Mac's firewall blocks every call that comes in, so your other devices cannot reach Ingenium here.":"This computer's firewall has not been told to let Ingenium accept calls from your other devices.");
    fw.appendChild(D.createElement("br"));fw.appendChild(key("Let Ingenium through","",function(){Promise.resolve().then(function(){return a.share_firewall_allow();}).then(function(r){if(r&&r.ok){LS=r;paint();toast("Ingenium may now accept calls from your other devices.");}else toast((r&&r.error)||"The firewall was not changed.");});}));col.appendChild(fw);}
  var p=mk("div","ld-plate mr-c3 mr-pop");p.setAttribute("data-lean",".6");p.appendChild(mk("div","ld-lbl","Its code, typed once on each device"));var ti=mk("div","ld-tiles");ti.setAttribute("aria-label","Pairing code "+st.code);
  String(st.code||"").split("").forEach(function(ch){ti.appendChild(ch==="-"?mk("span","ld-dash"):mk("span","ld-tile",ch));});p.appendChild(ti);
  var ad=mk("div","ld-addr");ad.appendChild(mk("span",null,"On this Wi-Fi at"));(st.addresses||[]).slice(0,4).forEach(function(x){ad.appendChild(mk("code",null,String(x).replace(/:17860$/,"")));});p.appendChild(ad);
  var r=mk("div","ld-row");r.appendChild(key("Make a new code","",function(){Promise.resolve().then(function(){return a.share_renew_code();}).then(function(s){LS=s;paint();toast("A new code. Devices that used the old one type the new one, once.");});}));p.appendChild(r);col.appendChild(p);
  var names=st.model_names||[];var m=mk("div","ld-plate mr-c3 mr-pop");m.appendChild(mk("div","ld-lbl",names.length?"The models it lends":"No model to lend yet: install one on this computer first"));
  if(names.length){var ls=mk("div","ld-lenses");names.slice(0,12).forEach(function(n){ls.appendChild(lensEl(n,null,false));});m.appendChild(ls);}col.appendChild(m);
  var u=mk("div","ld-plate mr-c3 mr-pop");u.appendChild(mk("div","ld-lbl","Devices using its models"));var ul=mk("div","ld-users");var devs=st.devices||[];
  if(!devs.length)ul.appendChild(mk("div","mr-empty","None yet. A device that pairs shows here by its name, and you can remove it."));
  devs.forEach(function(d){var row=mk("div","ld-user mr-pop"),tx=mk("div");tx.append(mk("b",null,d.name||KIND_WORD[d.kind]||"A device"),mk("small",null,[KIND_WORD[d.kind]||"",ago(d.last)].filter(Boolean).join(" · ")));
    row.append(coin(ICON[d.kind]?d.kind:"browser",true),tx);if(typeof a.share_device_remove==="function")row.appendChild(key("Remove","",function(){Promise.resolve().then(function(){return a.share_device_remove(d.id);}).then(function(s){LS=s;paint();toast((d.name||"That device")+" is removed. It needs the code again to use this computer's models.");});},"Remove "+(d.name||"this device")));
    ul.appendChild(row);});u.appendChild(ul);col.appendChild(u);
  /* 6.9.3's settings (r205): memory for lent models, graphics, which models suit this computer, before lending from a laptop */
  var lb=$("lkLend");if(lb){var dl=mk("details","ld-fix mr-c3 mr-pop");dl.appendChild(mk("summary",null,"How this computer lends"));var hold=mk("div","ld-old");hold.appendChild(lb);dl.appendChild(hold);col.appendChild(dl);}}

/* the device that uses its computers' models (every device) */
function chip(comp){var s=(ST[comp.id]||{}).s||"",c=mk("span","ld-chip "+(s==="ok"?"ok":s==="re"?"re":(s==="away"||s==="code"||s==="off")?"bad":""));c.appendChild(mk("i"));
  c.appendChild(D.createTextNode(s==="ok"?"Connected at "+hostOf(comp.base):s==="re"?"Finding it on this Wi-Fi…":s==="away"?"Not found now: is Ingenium open there, on this Wi-Fi?":s==="off"?"It is not lending now":s==="code"?(comp.removed?"Removed there: type its code again":"Its code changed: type the new one"):"Paired"));
  c.setAttribute("role","status");return c;}
function codeRow(id,label,onPair){var w=mk("div","ld-code mr-c3 mr-pop");var lab=mk("label",null,label);var wl=mk("div","ld-well"),inp=mk("input","ld-codein");inp.id="ldCode-"+id.replace(/[^A-Za-z0-9_-]/g,"_");lab.htmlFor=inp.id;
  inp.autocomplete="off";inp.spellcheck=false;inp.maxLength=9;inp.placeholder="K7QM-4HXP";inp.setAttribute("autocapitalize","characters");inp.value=UI.code[id]||"";
  inp.addEventListener("input",function(){var v=inp.value.toUpperCase().replace(/[^A-Z0-9]/g,"").slice(0,8);if(v.length>4)v=v.slice(0,4)+"-"+v.slice(4);inp.value=v;UI.code[id]=v;});
  inp.addEventListener("keydown",function(e){if(e.key==="Enter"){e.preventDefault();onPair(inp.value);}});wl.appendChild(inp);
  var go=key(UI.busy[id]?"Pairing…":"Pair","mr-primary",function(){onPair(inp.value);});if(UI.busy[id])go.setAttribute("aria-disabled","true");w.append(lab,wl,go);
  if(UI.err[id])w.appendChild(mk("p","ld-err",UI.err[id]));return w;}
function doPair(id,addr,code,known){if(UI.busy[id])return;UI.busy[id]=1;delete UI.err[id];paint();
  pair(addr,code,known).then(function(comp){delete UI.busy[id];delete UI.code[id];UI.adding=false;UI.addr="";FIND.list=(FIND.list||[]).filter(function(x){return x.id!==comp.id&&base(x.address)!==comp.base;});
      paint();toast("Paired. This "+(me().name||"device")+" remembers "+comp.name+" and finds it again by itself.");if(!active())use(comp,comp.model);},
    function(e){delete UI.busy[id];UI.err[id]=String(e&&e.message||e);paint();});}
function borrowerCol(col){var d=me(),head=mk("div","ld-head");head.append(coin(d.kind),mk("h3",null,d.name||"This device"));col.append(mk("div","ld-eye"),head);col.firstChild.innerHTML="<b>Uses its computers' models</b>This "+(KIND_WORD[d.kind]||"device");
  var act=active();
  comps().forEach(function(comp){var s=(ST[comp.id]||{}).s||"",box=mk("div","ld-comp mr-c3 mr-pop");box.setAttribute("data-lean",".5");var h=mk("div","ld-comp-h"),tx=mk("div");
    tx.append(mk("b",null,comp.name),mk("small",null,plural((comp.models||[]).length,"model","models")+" · "+(KIND_WORD[comp.kind]||"computer")));h.append(coin(comp.kind,true),tx,key("Forget","",function(){forget(comp);},"Forget "+comp.name));box.appendChild(h);
    var r=mk("div","ld-row");r.appendChild(chip(comp));if(s==="away"||s==="off")r.appendChild(key("Look again","",function(){check(comp,{find:true,loud:true});}));box.appendChild(r);
    if(s==="code")box.appendChild(codeRow(comp.id,"Type the code "+comp.name+" shows (Settings, Your devices). You type it once.",function(v){doPair(comp.id,comp.base,v,comp.id);}));
    else if((comp.models||[]).length){var ls=mk("div","ld-lenses");comp.models.slice(0,12).forEach(function(n){ls.appendChild(lensEl(n,comp,act===comp&&(W.state.cloud||{}).model===n));});box.appendChild(ls);}
    col.appendChild(box);});
  /* adding a computer */
  var add=mk("div","ld-plate mr-c3 mr-pop");add.appendChild(mk("div","ld-lbl",comps().length?"Add another computer":"Use your computer's models"));
  if(!comps().length)add.appendChild(mk("p","ld-say",canFind()?"Ingenium looks on this Wi-Fi for your computers that lend their models. No address to type.":"In a web browser, type the address your computer shows once; Ingenium keeps it and every other address of that computer."));
  var r=mk("div","ld-row");if(canFind())r.appendChild(key(UI.scan?"Looking…":"Find my computers","mr-primary",function(){if(UI.scan)return;UI.scan=true;paint();find().then(function(){UI.scan=false;paint();});}));
  r.appendChild(key(UI.adding?"Hide the address":"Type its address instead","",function(){UI.adding=!UI.adding;paint();}));add.appendChild(r);
  if(UI.scan){var sc=mk("div","ld-scan");sc.append(mk("i"),mk("i"),mk("i"),mk("span",null,"Looking on this Wi-Fi…"));add.appendChild(sc);}
  else if(FIND.list){var fl=FIND.list.filter(function(x){return !(x.id&&byId(x.id));});
    if(!fl.length)add.appendChild(mk("div","mr-empty",FIND.err==="LOCALNET"?why({message:"LOCALNET"},""):FIND.err==="NONET"?"This device does not seem to be on a Wi-Fi network.":
      (nat()&&/iPhone|iPad/.test(me().name)?"No computer lending its models was found. If iOS asked whether Ingenium may find devices on your local network, choose Allow, then look again. On the computer, switch on Lend my models to my devices.":"No computer lending its models was found on this Wi-Fi. On the computer, switch on Lend my models to my devices, keep Ingenium open, then look again.")));
    fl.forEach(function(x){var id="f:"+(x.id||x.address),f=mk("button","ld-found mr-c3 mr-pop");f.type="button";var t=mk("div");t.append(mk("b",null,x.computer||x.address),mk("small",null,plural(x.models||0,"model","models")+" to lend · at "+String(x.address).replace(/:17860$/,"")));
      f.append(coin(ICON[x.kind]?x.kind:"laptop",true),t,mk("span","ld-chip",UI.code[id]!=null?"Type its code":"Press to pair"));f.addEventListener("click",function(){if(UI.code[id]==null){UI.code[id]="";paint();setTimeout(function(){var i=$("ldCode-"+id.replace(/[^A-Za-z0-9_-]/g,"_"));if(i)i.focus();},60);}});add.appendChild(f);
      if(UI.code[id]!=null)add.appendChild(codeRow(id,"Type the code "+(x.computer||"the computer")+" shows. You type it once: this "+(KIND_WORD[me().kind]||"device")+" remembers it.",function(v){doPair(id,x.address,v,null);}));});}
  if(UI.adding){var w=mk("div","ld-code mr-c3 mr-pop");var lab=mk("label",null,"The address your computer shows (Settings, Your devices), then its code");var wl=mk("div","ld-well"),inp=mk("input");inp.id="ldAddr";lab.htmlFor="ldAddr";
    inp.placeholder="for example 192.168.1.23 or Mac-mini.local";inp.autocomplete="off";inp.spellcheck=false;inp.setAttribute("autocapitalize","off");inp.value=UI.addr;inp.addEventListener("input",function(){UI.addr=inp.value;});
    wl.appendChild(inp);w.append(lab,wl);add.appendChild(w);add.appendChild(codeRow("typed","Its code",function(v){doPair("typed",UI.addr,v,null);}));}
  col.appendChild(add);
  /* who answers */
  var who=mk("div","ld-plate mr-c3 mr-pop");who.appendChild(mk("div","ld-lbl","Who answers your chats (also in the top bar, on every page)"));var wl2=mk("div","ld-who");
  var src=(typeof W.chatSource==="function"?W.chatSource():W.state.chatSource),cl=W.state.cloud||{};
  var dv=key("","",useDevice);dv.append(svgSpan(d.kind),D.createTextNode("This "+(KIND_WORD[d.kind]||"device")),mk("small",null,localName()||"its own model"));dv.setAttribute("aria-pressed",src!=="cloud"?"true":"false");wl2.appendChild(dv);
  comps().forEach(function(comp){var b=key("","",function(){use(comp,comp.model);});b.append(svgSpan(comp.kind),D.createTextNode(comp.name),mk("small",null,comp.model||"choose a model above"));b.setAttribute("aria-pressed",act===comp?"true":"false");wl2.appendChild(b);});
  var kept=[];try{kept=(W.IngConnections&&W.IngConnections.kept())||[];}catch(e){}
  kept.filter(function(k){return k&&k.provider&&k.provider!=="ingenium";}).slice(0,4).forEach(function(k){var b=key("","",function(){useKept(k);});var lab2="";try{lab2=W.IngConnections.label(k);}catch(e){lab2=k.provider;}
    var on=src==="cloud"&&cl.on&&cl.provider===k.provider&&String(cl.base||"").replace(/\/+$/,"").toLowerCase()===String(k.base||"").replace(/\/+$/,"").toLowerCase();
    b.append(svgSpan("browser"),D.createTextNode(lab2),mk("small",null,(W.ingModelLabel?W.ingModelLabel(k.model):k.model)||"your connected service"));b.setAttribute("aria-pressed",on?"true":"false");wl2.appendChild(b);});
  who.appendChild(wl2);col.appendChild(who);
  /* when it cannot reach the computer: plain causes; R97's call-in, between two computers, kept here */
  var fx=mk("details","ld-fix mr-c3 mr-pop");fx.appendChild(mk("summary",null,"If it cannot reach the computer"));var ol=mk("ol");
  ["The computer's firewall: Ingenium on that computer says so in Settings, Your devices, with one key, Let Ingenium through.",
   "This Mac's Local Network permission: System Settings, Privacy and Security, Local Network: switch Ingenium on, then open Ingenium again.",
   "Another Wi-Fi, or the computer asleep with Ingenium closed: join the computer's Wi-Fi, or open Ingenium there; this device finds it again by itself."].forEach(function(t){ol.appendChild(mk("li",null,t));});fx.appendChild(ol);
  var old=mk("div","ld-old");[$("lkCallinBox"),$("lkOut")].forEach(function(x){if(x&&shell()){old.appendChild(x);}});if(old.childNodes.length){fx.appendChild(mk("p","ld-say","Between two computers, when one still cannot reach the other, the other one can call it:"));fx.appendChild(old);}
  col.appendChild(fx);}
function svgSpan(kind){var s=mk("span");s.setAttribute("aria-hidden","true");s.style.cssText="display:inline-grid;width:22px;height:22px;flex:0 0 auto";s.innerHTML=svg(kind);return s;}

var LAST="";
function paint(){var c=card();if(!c)return;c.classList.add("ld-on");var root=c.querySelector(":scope > .ld-root");
  if(!root){root=mk("div","ld-root");c.appendChild(root);}
  var sig=JSON.stringify([LS&&{on:LS.on,code:LS.code,ad:LS.addresses,m:LS.model_names,d:(LS.devices||[]).map(function(d){return [d.id,d.name,d.kind,ago(d.last)];}),fw:LS.firewall,er:LS.error,c:LS.computer,k:LS.kind},
    comps().map(function(x){return [x.id,x.name,x.kind,x.base,x.models,x.model,(ST[x.id]||{}).s,x.removed];}),me(),UI,FIND.list,FIND.err,(W.state.cloud||{}).model,(W.state.cloud||{}).lendId,(W.state.cloud||{}).provider,
    (typeof W.chatSource==="function"?W.chatSource():W.state.chatSource),localName(),keptSig()]);
  if(sig===LAST&&root.firstChild)return;LAST=sig;
  var focus=D.activeElement&&root.contains(D.activeElement)?D.activeElement.id:"";
  [$("lkCallinBox"),$("lkOut"),$("lkLend")].forEach(function(x){if(x&&root.contains(x))c.appendChild(x);});   /* R97's and r205's parts go back before the redraw */
  while(root.firstChild)root.removeChild(root.firstChild);   /* 6.80: an older web view has no replaceChildren */root.appendChild(mk("p","ld-say","Pair a device once with your computer's code. From then on it finds the computer by itself, at any address, and Claude or any other service stays as it is."));
  var cols=mk("div","ld-cols"),A=mk("div","ld-col"),B=mk("div","ld-col");if(shell()&&typeof shell().share_status==="function"){lenderCol(A);cols.appendChild(A);}borrowerCol(B);cols.appendChild(B);root.appendChild(cols);
  if(focus){var f=$(focus);if(f)try{f.focus({preventScroll:true});}catch(e){}}}
function lenderRefresh(){var a=shell();if(!(a&&typeof a.share_status==="function"))return;Promise.resolve().then(function(){return a.share_status();}).then(function(st){var s=JSON.stringify(st&&[st.on,st.code,st.addresses,st.model_names,(st.devices||[]).map(function(d){return [d.id,d.name,d.kind,ago(d.last)];}),st.firewall,st.error]);
  LS=st;if(s!==LSIG){LSIG=s;try{if(typeof W.lkHostPaint==="function")W.lkHostPaint(st);}catch(e){}paint();}},function(){});}

/* ---------- the top bar's menu: the paired computers' models, as rows ---------- */
function pop(){var p=$("waPop");return p&&!p.hidden?p:null;}
function menuSection(p){if(!p||p.querySelector(".ld-sec")||!comps().length)return;var sec=mk("div","ld-sec");sec.setAttribute("role","group");sec.setAttribute("aria-label","Your computers' models");
  sec.appendChild(mk("div","tl-h","Your computers"));sec.appendChild(mk("p","tl-say","Their models, lent over this Wi-Fi. One press to use one."));var list=mk("div","tl-list"),act=active();
  comps().forEach(function(comp){(comp.models||[]).slice(0,4).forEach(function(n){var on=act===comp&&(W.state.cloud||{}).model===n,b=mk("button","tl-row"+(on?" on":""));b.type="button";b.setAttribute("role","menuitem");
    var ic=mk("span");ic.setAttribute("aria-hidden","true");ic.style.display="inline-grid";ic.innerHTML=svg(comp.kind);var tx=mk("span","tl-txt");tx.append(mk("span",null,short(n)),mk("span","tl-sub",comp.name+((ST[comp.id]||{}).s==="away"?" · not found now":"")));
    b.append(ic,tx);if(on)b.appendChild(mk("span","tl-on","Answering"));b.addEventListener("click",function(){use(comp,n);var q=pop();if(q){var s=q.querySelector(".ld-sec");if(s)s.remove();menuSection(q);}});list.appendChild(b);});});
  sec.appendChild(list);var after=p.querySelector(".tl-sec");if(after&&after.nextSibling)p.insertBefore(sec,after.nextSibling);else p.appendChild(sec);}
function watchMenu(){var p=$("waPop");if(!p||p.__r274)return;p.__r274=1;
  try{new MutationObserver(function(){var q=pop();if(q&&!q.querySelector(".ld-sec"))menuSection(q);}).observe(p,{attributes:true,attributeFilter:["hidden"],childList:true});}catch(e){}
  var q=pop();if(q)menuSection(q);}
D.addEventListener("click",function(ev){var t=ev.target;if(t&&t.closest&&t.closest("#activeModelPill"))setTimeout(watchMenu,0);},true);

/* ---------- start ---------- */
var LP=0;
function boot(){me();learnMe();adopt();var c=card();if(c){paint();
    /* R74's own refresh of its hidden card rewrote it every ten seconds: this card is drawn again only when what it says changes */
    try{if(W.lkPoll){clearInterval(W.lkPoll);}W.lkPoll=1;}catch(e){}
    if(shell()&&typeof shell().share_status==="function"&&!LP){lenderRefresh();LP=setInterval(function(){var pg=$("page-settings");if(pg&&pg.classList.contains("active")&&card()&&card().offsetParent)lenderRefresh();},10000);}}
  var a=active();if(a)check(a,{find:true});comps().forEach(function(x){if(x!==a)check(x,{find:false});});watchMenu();}
(function wait(n){if(W.__ingReady===true&&card()){boot();return;}if(n<240)setTimeout(function(){wait(n+1);},500);else if(card())boot();})(0);
W.IngLend={state:function(){return {me:me(),computers:comps().map(function(x){return {id:x.id,name:x.name,kind:x.kind,base:x.base,addrs:(x.addrs||[]).slice(),models:(x.models||[]).slice(),model:x.model,status:(ST[x.id]||{}).s||""};}),
    active:(active()||{}).id||null,found:FIND.list,lender:LS};},pair:pair,use:function(id,m){use(byId(id),m);},useDevice:useDevice,check:function(id,o){return check(byId(id),o||{find:true});},find:find,paint:paint,refresh:lenderRefresh,forget:function(id){forget(byId(id));}};
try{window.__ingParts["p274"]="running";}catch(_){}
})();
</script>
