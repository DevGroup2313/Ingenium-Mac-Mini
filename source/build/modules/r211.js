<style id="r211-css">
/* ============ R211 · THREE FIXES SHE ASKED FOR (Ingenium 6.10.2, 3 November 2026) ============
   1. Home's Scriba and Fontes stones wear their marks, as the side rail's do (r193), 4 pixels from the name, with no other gap.
   2. Your models on a phone: the card is no longer one row. Its three keys kept their full width and pressed the details into a
      strip about 40 pixels wide; now the name and the details take the card's width and the keys sit beneath them, in a row.
   3. Build's code: long lines wrap inside the panel (r164), and the panel's head has the key that turns it on and off. */
/* 1. the marks on Home's stones */
.hx-apps .hx-app .hx-stone{gap:4px}
.hx-apps .hx-app[data-app="scriba"] .hx-stone{padding-left:12px}
.hx-apps .hx-app .hx-stone svg.hx-sym{position:relative;z-index:3;display:inline-block;flex:none;width:12px;height:12px;margin:0}
.hx-apps .hx-app[data-app="scriba"] .hx-stone svg.hx-sym{width:13px;height:13px}
/* 2. the cards of Your models, where the list is narrow (a phone, or a narrow window) */
#modelList{container-type:inline-size;container-name:ingmodels}
@container ingmodels (max-width:600px){
  #modelList .model-row{flex-wrap:wrap;align-items:flex-start;gap:8px 10px;padding:12px 12px 10px}
  #modelList .model-row .swatch{margin-top:4px}
  #modelList .model-row .minfo{flex:1 1 0;min-width:0}
  #modelList .model-row .mname{line-height:1.35}
  #modelList .model-row .mmeta{overflow-wrap:anywhere;line-height:1.45}
  #modelList .model-row .mact{flex:1 0 100%;display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:6px;justify-content:stretch;padding-top:9px;border-top:1px solid var(--hairline)}
  #modelList .model-row .mact .btn{width:100%;min-width:0;justify-content:center;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}}
@supports not (container-type:inline-size){
  @media (max-width:640px){
    #modelList .model-row{flex-wrap:wrap;align-items:flex-start;gap:8px 10px;padding:12px 12px 10px}
    #modelList .model-row .swatch{margin-top:4px}
    #modelList .model-row .minfo{flex:1 1 0;min-width:0}
    #modelList .model-row .mmeta{overflow-wrap:anywhere;line-height:1.45}
    #modelList .model-row .mact{flex:1 0 100%;display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:6px;padding-top:9px;border-top:1px solid var(--hairline)}
    #modelList .model-row .mact .btn{width:100%;min-width:0;justify-content:center;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}}}
/* 3. the key in the code panel's head */
#editorPane .pane-head .ing-wrapkey{margin-left:8px;flex:none}
</style>
<script>try{(window.__ingParts=window.__ingParts||{})["p211"]="started";}catch(_){}
/* R211: see the note at the top of its styles. Her words (3 November 2026): "only the Scriba and Fontes buttons on the side
   navigation bar received their proper symbols, the ones from the home page of Ingenium is still left bare, please fix that and
   give them their symbols as well and make sure that there is no weird space between the text on the buttons and the symbols";
   "The 'Your models' cards looks distorted on the Iphone screen, please rewrite the models cards and their details in a better
   way instead of in a compact column like a weird narrow strip and leave the rest of the card's space empty"; "The code inside of
   the 'Your code' panel of the Build page does not fit to the panel and needs the panel expanded or for me to scroll to side to see
   the full line, please recommend a better alternative or fix for this." */
(function r211(){
"use strict";
if(window.__r211)return;window.__r211=1;
/* ---------- 1. Home's stones: the same marks as the rail's ---------- */
function marks(){var S=window.IngStones&&window.IngStones.sym;if(!S)return;
  [].forEach.call(document.querySelectorAll(".hx-apps .hx-app[data-app]"),function(b){var k=b.getAttribute("data-app"),st=b.querySelector(".hx-stone"),nm=st&&st.querySelector(".hx-an");
    if(!S[k]||!st||!nm||st.querySelector("svg.hx-sym"))return;
    var t=document.createElement("template");t.innerHTML=S[k];var sv=t.content.firstElementChild;if(!sv)return;
    sv.classList.add("hx-sym");sv.setAttribute("aria-hidden","true");sv.setAttribute("focusable","false");st.insertBefore(sv,nm);});}
marks();setTimeout(marks,500);setTimeout(marks,1600);
try{var home=document.getElementById("page-home")||document.body;new MutationObserver(function(){marks();}).observe(home,{childList:true,subtree:true});}catch(e){}

/* ---------- 3. Build: the Wrap key in the code panel's head, and her choice kept ---------- */
function box(){return document.querySelector("#editorPane .ic-wrapbox");}
function paintKey(){var k=document.querySelector("#editorPane .ing-wrapkey"),b=box();if(!k||!b)return;
  k.setAttribute("aria-pressed",b.checked?"true":"false");k.classList.toggle("primary",!!b.checked);
  k.textContent=b.checked?"Long lines wrap":"Long lines scroll";
  k.title=b.checked?"Long lines wrap inside the panel. Press to keep each line on one row and scroll sideways instead.":"Each line stays on one row. Press to wrap long lines inside the panel.";}
function keep(on){try{state.buildWrap=!!on;saveState();}catch(e){}}
function wire(){var head=document.querySelector("#editorPane .pane-head"),b=box();if(!head||!b)return false;
  if(!b.__ingKept){b.__ingKept=1;b.addEventListener("change",function(){keep(b.checked);paintKey();});}
  if(!head.querySelector(".ing-wrapkey")){var k=document.createElement("button");k.type="button";k.className="btn small ing-wrapkey";
    k.onclick=function(){var x=box();if(!x)return;x.checked=!x.checked;try{x.dispatchEvent(new Event("change",{bubbles:true}));}catch(e){}};
    head.appendChild(k);}
  paintKey();return true;}
(function tryWire(n){if(wire()||n>40)return;setTimeout(function(){tryWire(n+1);},250);})(0);
try{var ep=document.getElementById("editorPane");if(ep)new MutationObserver(function(){if(!document.querySelector("#editorPane .ing-wrapkey")||!(box()&&box().__ingKept))wire();}).observe(ep,{childList:true});}catch(e){}

/* ---------- 4. the phone and tablet app that came without its models: its own two, one press away ----------
   Her words (3 November 2026): "I've also been unable to download and install the Ingenium Android Fire APK app on my Fire Tablet
   with the models for a while now, no matter what I do it keeps on failling and I have to install the one without the models".
   The full app is about 1.5 GB; installing it needs room for the downloaded file and for the copy Android makes of it, on the
   tablet's own storage (a memory card does not count). The small app (57 MB) installs; now, when it has neither its own models
   nor a built-in one, the Models page offers the same two (Velox and Scriba for this device) with one press: fetched inside the app
   from Hugging Face, carried on where a download stopped, and kept only when each matches its fingerprint (the app's own install). */
function ownCard(){try{
  if(typeof INB==="undefined"||!INB)return;var card=document.getElementById("lineupCard");if(!card)return;
  var bi=(typeof nativeInfo!=="undefined"&&nativeInfo&&nativeInfo.builtin)||null,built=!!(bi&&bi.available!==false&&!bi.hidden);
  var keys=[];["velox","scriba"].forEach(function(t){var k=lineupKeyFor(t);if(k&&ING_LINEUP.models[k]&&keys.indexOf(k)<0)keys.push(k);});
  var missing=keys.filter(function(k){return !lineupRec(k);}),old=card.querySelector(".ing-own");
  if(built||!missing.length){if(old)old.remove();return;}
  var bytes=missing.reduce(function(t,k){return t+(ING_LINEUP.models[k].size||0);},0),names=missing.map(function(k){return ING_LINEUP.models[k].name;});
  var busy=missing.some(function(k){return lineupJobs[k]&&lineupJobs[k].state==="running";});
  var box=old||document.createElement("div");box.className="tip ing-own";box.style.margin="0 0 12px";box.innerHTML="";
  var mk=document.createElement("span");mk.className="tip-mark";mk.textContent="i";box.appendChild(mk);
  var tx=document.createElement("div");
  var p=document.createElement("div");p.innerHTML="<b>This copy came without its own models.</b> ";
  var two=missing.length>1;
  p.appendChild(document.createTextNode("Install "+names.join(" and ")+" here"+(two?", the two models the larger download carries: "+fmtBytes(bytes)+" in all":", which the larger download also carries: "+fmtBytes(bytes))
    +", fetched inside the app on Wi-Fi, carried on if the connection drops, and kept only when "+(two?"each matches its":"it matches its")+" fingerprint."));
  tx.appendChild(p);
  var b=document.createElement("button");b.type="button";b.className="btn small primary";b.style.marginTop="8px";
  b.textContent=busy?"Installing…":"Install "+(missing.length>1?"both":"it")+" · "+fmtBytes(bytes);b.disabled=busy;
  b.onclick=function(){b.disabled=true;b.textContent="Installing…";
    missing.reduce(function(pr,k){return pr.then(function(){return lineupInstall(k);});},Promise.resolve())
      .then(function(){try{renderLineup();renderModels();}catch(e){}},function(e){b.disabled=false;b.textContent="Try again";try{ingSay("The install stopped: "+(e&&e.message?e.message:String(e)));}catch(_){}});};
  tx.appendChild(b);box.appendChild(tx);
  if(!old){var n=document.getElementById("lineupNote");if(n&&n.parentNode===card)card.insertBefore(box,n.nextSibling);else card.insertBefore(box,card.firstChild);}
}catch(e){try{console.error("Ingenium: the offer of the app's own models could not be shown",e);}catch(_){}}}
(function hook(){if(typeof renderLineup!=="function")return;var o=renderLineup;
  renderLineup=function(){var r=o.apply(this,arguments);ownCard();return r;};window.renderLineup=renderLineup;})();
/* ---------- 5. a phone: the side buttons start laid down, so they do not cover the page ----------
   Seen while checking her iPhone's Models page (3 November 2026): the side buttons (the bell, the theme, the timer, the note,
   park and quiet) float over the right edge of the cards and hide words. On a narrow screen they now start laid down (only the
   key that raises them shows) until she raises or lays them down herself; from then on her own choice holds. */
(function rail(){try{var ch=document.getElementById("railChevron");if(!ch||typeof applyCollapse!=="function")return;
  var o=ch.onclick;ch.onclick=function(){try{state.railChosen=true;}catch(e){}return o?o.apply(this,arguments):undefined;};
  var narrow=!!(window.matchMedia&&matchMedia("(max-width: 640px)").matches);
  if(narrow&&!state.railChosen&&!state.railCollapsed){state.railCollapsed=true;applyCollapse();}
}catch(e){}})();
window.IngR211={marks:marks,wrapKey:wire,own:ownCard};
})();
;try{window.__ingParts["p211"]="running";}catch(_){}
</script>
