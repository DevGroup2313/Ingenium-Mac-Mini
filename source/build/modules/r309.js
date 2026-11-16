<style id="r309-css">
/* ============ R309 · THE PUBLISHING NAME (Ingenium 7.25 and 7.26, 16 November 2026) ============
   Her requests of 16 November 2026, in her words in source/README.md (7.25, 7.26): her own name built in only in the master edition,
   which she can change; every other edition starts with none; Fabrica asks every time, in every edition, never assuming, with a
   choice not to be asked again. 7.26's question is her approved preview (https://claude.ai/artifact/BPunHpyUHFr3uJMJoyYqmq: "Publish
   it as...", the name on a raised plate), with a third choice she added, Publish with a new name, and the same plate in Download as an
   app.
   One publishing name, kept with Ingenium's own settings (state.publisher: name, decided, quiet; saved and backed up with them). The
   master edition starts with the owner's name; the other editions with none (editions.py takes the built-in name out of this module).
   Before Fabrica makes anything that carries the name (a Mac app, a Windows app, a web app, build kits: r112 makeOne, once for a whole
   Make the chosen or Make the missing ones) it asks "Publish <app> as...": the name on its plate, where it shows (a Mac, Windows, the
   kits), and three choices: as the name kept, with a new name, with no name. Cancel or the cross makes nothing. "Don't ask me again"
   stops the asking; Change in the Ship part edits the name and that choice. The makers read it (r170 ownerLine, r178 ownerName). */
.r309-sheet .r309-top{display:grid;grid-template-columns:auto minmax(0,1fr);grid-gap:16px;gap:16px;align-items:center;padding:4px 40px 2px 2px}
.r309-sheet .r309-eye{font:600 11px/1 var(--f-ui,inherit);letter-spacing:.26em;text-transform:uppercase;color:var(--f-ink3)}
#fb .f-sheet.r309-sheet h3.r309-t{font:600 30px/1.08 "Home Cormorant","Cormorant Garamond",Cormorant,Georgia,serif;margin:6px 0 0;letter-spacing:0;color:var(--f-ink1)}
.r309-sheet .r309-seal{position:relative;width:64px;height:64px;flex:none;perspective:400px}
.r309-sheet .r309-seal .r309-idle{position:absolute;top:0;right:0;bottom:0;left:0;display:grid;place-items:center;animation:r309sway 7s ease-in-out infinite;transform-style:preserve-3d;
  filter:drop-shadow(0 6px 8px rgba(40,22,68,.28)) drop-shadow(0 1px 0 rgba(0,0,0,.18))}
.r309-sheet .r309-seal .r309-cast{position:absolute;left:12%;right:12%;bottom:-12px;height:10px;border-radius:50%;background:radial-gradient(closest-side,rgba(40,22,68,.28),transparent);animation:r309cast 7s ease-in-out infinite}
@keyframes r309sway{0%,100%{transform:rotateX(4deg) rotateY(-7deg) translateY(0)}50%{transform:rotateX(-3deg) rotateY(7deg) translateY(-3px)}}
@keyframes r309cast{0%,100%{transform:scaleX(1);opacity:1}50%{transform:scaleX(.9);opacity:.75}}
.r309-sheet .r309-body{display:grid;grid-gap:14px;gap:14px;margin-top:14px}
.r309-sheet .r309-foot{display:flex;flex-wrap:wrap;justify-content:flex-end;align-items:center;margin:16px -18px -16px;padding:14px 18px;border-top:1px solid var(--f-hair);
  background:linear-gradient(var(--f-hi),var(--f-lo));border-radius:0 0 16px 16px}
.r309-sheet .r309-foot .f-btn{margin-left:10px}
/* the name plate: the name as it will read, engraved on a raised plate that tilts toward the pointer (Fabrica and Download as an app) */
.r309-pl{position:relative;border-radius:18px;padding:14px 18px 12px;color:#221a2e;overflow:hidden;transform-style:preserve-3d;
  background:linear-gradient(160deg,#f1ebf8,#e4dbf0);box-shadow:inset 0 -1.5px 0 rgba(40,22,68,.13),0 3px 0 rgba(40,22,68,.25),0 6px 8px rgba(40,22,68,.18),0 13px 20px rgba(40,22,68,.12),inset 0 0 0 1px rgba(34,26,46,.10);
  transition:transform .45s cubic-bezier(.22,1,.36,1)}
.r309-pl::after{content:"";position:absolute;top:0;right:0;bottom:0;left:0;background:linear-gradient(115deg,transparent 30%,rgba(255,255,255,.35) 48%,transparent 62%);transform:translateX(-120%);animation:r309gleam 6s ease-in-out infinite;pointer-events:none}
@keyframes r309gleam{0%,62%{transform:translateX(-120%)}82%,100%{transform:translateX(120%)}}
.r309-pl .r309-lab{font:600 10.5px/1 system-ui,-apple-system,"Segoe UI",sans-serif;letter-spacing:.24em;text-transform:uppercase;color:#6c6579}
.r309-pl .r309-who{display:flex;flex-wrap:wrap;align-items:baseline;justify-content:space-between;margin-top:8px}
.r309-pl .r309-nm{font:600 30px/1.1 "Home Cormorant","Cormorant Garamond",Cormorant,Georgia,serif;text-shadow:0 1px 0 rgba(255,255,255,.9);overflow-wrap:anywhere;min-width:0;margin-right:12px}
.r309-pl .r309-nm.none{color:#6c6579;font-style:italic;font-weight:500}
.r309-pl input,#fb .r309-pl input{-webkit-appearance:none;appearance:none;display:block;box-sizing:border-box;width:100%;margin-top:8px;padding:8px 12px;border:0;border-radius:12px;outline:none;
  font:600 26px/1.2 "Home Cormorant","Cormorant Garamond",Cormorant,Georgia,serif;color:#221a2e;background:rgba(34,26,46,.035);box-shadow:inset 0 1px 2.5px rgba(40,22,68,.08),0 0 0 2px rgba(106,63,181,.5)}
.r309-pl input::placeholder,#fb .r309-pl input::placeholder{color:#6c6579;font-style:italic;font-weight:500}
.r309-pl .r309-end{display:flex;justify-content:flex-end;margin-top:8px}
.r309-lnk,#fb .r309-lnk{-webkit-appearance:none;appearance:none;border:0;background:none;padding:0;cursor:pointer;color:#6a3fb5;font:500 13.5px system-ui,-apple-system,"Segoe UI",sans-serif;
  text-decoration:underline;text-decoration-thickness:1px;text-underline-offset:3px;display:inline-block;transition:transform .18s cubic-bezier(.34,1.35,.64,1),text-underline-offset .18s ease,color .18s ease}
.r309-lnk:hover,#fb .r309-lnk:hover{transform:translateY(-2px);text-decoration-thickness:2px;text-underline-offset:5px;color:#7348be}
.r309-lnk:active{transform:translateY(1px)}
body[data-theme="night"] .r309-pl{color:#f3eefb;background:linear-gradient(160deg,#251d33,#2f2542);
  box-shadow:inset 0 1px 0 rgba(255,255,255,.08),inset 0 -2px 0 rgba(0,0,0,.45),0 3px 0 rgba(0,0,0,.75),0 6px 8px rgba(0,0,0,.52),0 13px 20px rgba(0,0,0,.40),inset 0 0 0 1px rgba(205,184,240,.11)}
body[data-theme="night"] .r309-pl::after{background:linear-gradient(115deg,transparent 30%,rgba(183,156,230,.14) 48%,transparent 62%)}
body[data-theme="night"] .r309-pl .r309-lab,body[data-theme="night"] .r309-pl .r309-nm.none{color:#a99cc1}
body[data-theme="night"] .r309-pl .r309-nm{text-shadow:0 1px 0 rgba(0,0,0,.55)}
body[data-theme="night"] .r309-pl input,body[data-theme="night"] #fb .r309-pl input{color:#f3eefb;background:rgba(10,6,18,.35);box-shadow:inset 0 1px 3px rgba(0,0,0,.4),0 0 0 2px rgba(183,156,230,.45)}
body[data-theme="night"] .r309-pl input::placeholder,body[data-theme="night"] #fb .r309-pl input::placeholder{color:#a99cc1}
body[data-theme="night"] .r309-lnk,body[data-theme="night"] #fb .r309-lnk{color:#b79ce6}
body[data-theme="night"] .r309-lnk:hover,body[data-theme="night"] #fb .r309-lnk:hover{color:#c9b3f2}
/* where it shows: three small raised tiles, each as that place reads it */
.r309-sheet .r309-where{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));grid-gap:8px;gap:8px}
@media (max-width:560px){.r309-sheet .r309-where{grid-template-columns:minmax(0,1fr)}}
.r309-sheet .r309-tile{display:grid;grid-gap:4px;gap:4px;padding:10px 12px;border-radius:14px;background:linear-gradient(var(--f-hi),var(--f-card));box-shadow:var(--f-pop);font-size:12.5px;line-height:1.35;color:var(--f-ink2);
  transition:transform .18s cubic-bezier(.34,1.35,.64,1),box-shadow .18s ease;min-width:0}
.r309-sheet .r309-tile:hover{transform:translateY(-2px);box-shadow:var(--f-pophi)}
.r309-sheet .r309-tile b{font-weight:600;font-size:10.5px;line-height:1;letter-spacing:.18em;text-transform:uppercase;color:var(--f-ink3)}
.r309-sheet .r309-tile span{color:var(--f-ink1);overflow-wrap:anywhere}
.r309-sheet .r309-tile span.none{color:var(--f-ink3);font-style:italic}
/* choices: raised tiles; the chosen one lifts, ringed and glowing, as the approved installer's */
.r309-sheet .r309-opts{display:grid;grid-gap:10px;gap:10px}
.r309-sheet .r309-opt{position:relative;display:grid;grid-template-columns:24px minmax(0,1fr);grid-gap:12px;gap:12px;padding:12px 14px;border-radius:16px;background:linear-gradient(var(--f-hi),var(--f-card));
  box-shadow:var(--f-pop);cursor:pointer;transition:transform .18s cubic-bezier(.34,1.35,.64,1),box-shadow .18s ease;outline:none}
.r309-sheet .r309-opt:hover{transform:translateY(-2px);box-shadow:var(--f-pophi)}
.r309-sheet .r309-opt.on{transform:translateY(-3px);box-shadow:var(--f-pophi),0 0 0 2px var(--f-ring),0 12px 26px var(--f-accs);animation:r309chosen .5s cubic-bezier(.34,1.56,.64,1)}
.r309-sheet .r309-opt.on::after{content:"";position:absolute;top:-2px;right:-2px;bottom:-2px;left:-2px;border-radius:18px;pointer-events:none;box-shadow:0 0 18px 2px var(--f-accs);animation:r309breathe 4.5s ease-in-out infinite}
.r309-sheet .r309-gem{width:20px;height:20px;border-radius:50%;margin-top:1px;background:var(--f-lo);box-shadow:var(--f-well);display:grid;place-items:center}
.r309-sheet .r309-opt.on .r309-gem::after{content:"";width:12px;height:12px;border-radius:50%;background:radial-gradient(circle at 35% 30%,#c9b3f2,var(--f-pa) 55%,var(--f-pb));box-shadow:0 1px 2px rgba(40,22,68,.4);animation:r309pip .35s cubic-bezier(.34,1.56,.64,1)}
.r309-sheet .r309-opt b{font-weight:600;font-size:14px;color:var(--f-ink1)}
.r309-sheet .r309-opt small{display:block;color:var(--f-ink3);font-size:12.5px;margin-top:1px}
@keyframes r309chosen{0%{transform:translateY(0) scale(.985)}55%{transform:translateY(-5px) scale(1.012)}100%{transform:translateY(-3px) scale(1)}}
@keyframes r309breathe{0%,100%{opacity:.35}50%{opacity:1}}
@keyframes r309pip{from{transform:scale(.2)}to{transform:scale(1)}}
/* the tick: a raised box that lifts, sinks when pressed, its tick popping in */
.r309-sheet .r309-chk{display:flex;align-items:center;font-size:14px;cursor:pointer;justify-self:start;border-radius:10px;color:var(--f-ink1);outline:none}
.r309-sheet .r309-chk .r309-c{width:22px;height:22px;flex:none;margin-right:12px;border-radius:7px;background:linear-gradient(var(--f-hi),var(--f-card));box-shadow:var(--f-pop);display:grid;place-items:center;color:#fff;font-size:13px;
  transition:transform .18s cubic-bezier(.34,1.35,.64,1),box-shadow .18s ease}
.r309-sheet .r309-chk:hover .r309-c{transform:translateY(-2px);box-shadow:var(--f-pophi)}
.r309-sheet .r309-chk:active .r309-c{transform:translateY(1px);box-shadow:var(--f-press)}
.r309-sheet .r309-chk .r309-c.on{background:linear-gradient(var(--f-pa),var(--f-pb));box-shadow:var(--f-psh);animation:r309tick .4s cubic-bezier(.34,1.56,.64,1)}
.r309-sheet .r309-chk small{display:block;color:var(--f-ink3);font-size:12.5px}
@keyframes r309tick{0%{transform:scale(.6)}60%{transform:scale(1.15)}100%{transform:scale(1)}}
/* the Ship part's line, as a raised chip */
.r309-line{display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;margin:12px 0 2px;padding:12px 14px;border-radius:16px;background:linear-gradient(var(--f-hi),var(--f-card));box-shadow:var(--f-pop)}
.r309-line .r309-who2{font-size:13.5px;color:var(--f-ink1);min-width:0;margin-right:10px}
.r309-line .r309-who2 b{font:600 18px "Home Cormorant","Cormorant Garamond",Cormorant,Georgia,serif}
.r309-line .r309-who2 small{display:block;color:var(--f-ink3);font-size:12.5px}
/* Download as an app: the same plate below its fields */
.r309-dl{margin:0 0 12px}
@media (prefers-reduced-motion: reduce){.r309-sheet *,.r309-pl,.r309-pl::after,.r309-line{animation:none !important;transition:none !important}}
</style>
<style id="r309-focus">
.r309-sheet .r309-opt:focus-visible,.r309-sheet .r309-chk:focus-visible,.r309-lnk:focus-visible{outline:2px solid #6a3fb5;outline-offset:3px}
</style>
<script>try{(window.__ingParts=window.__ingParts||{})["p309"]="started";}catch(_){}
(function(){"use strict";
var W=window,D=document;if(W.IngPublisher)return;
var BUILT_IN="Yannie D. Forest";
/* what a make carries the name in: the Mac and Windows apps, the web app's licence, the build kits (Fabrica's and Download as an app's) */
var CARRIES={mac:1,win:1,web:1,kits:1,kit:1};
function master(){try{return typeof ING_EDITION!=="undefined"&&ING_EDITION==="master";}catch(e){return false;}}
function st(){try{return typeof state!=="undefined"&&state?state:null;}catch(e){return null;}}
function clean(n){return String(n==null?"":n).replace(/[\u0000-\u001f\u007f]+/g," ").replace(/\s+/g," ").trim().slice(0,80);}
function esc(t){return String(t==null?"":t).replace(/[&<>"]/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c];});}
/* what is kept, else what the edition starts with: the owner's name in the master edition, nothing chosen in the others */
function rec(){var s=st(),r=s&&s.publisher;if(r&&typeof r==="object"&&r.decided)return r;
  return master()&&BUILT_IN?{name:BUILT_IN,decided:true,builtIn:true}:{name:"",decided:false};}
function name(){return clean(rec().name);}
function decided(){return !!rec().decided;}
function quiet(){var r=rec();return !!(r.decided&&r.quiet);}
function set(n,q){var s=st(),v=clean(n);if(s){s.publisher={name:v,decided:true,quiet:q===undefined?quiet():!!q,at:Date.now()};try{if(typeof saveState==="function")saveState();}catch(e){}}paintLine();return v;}
function X(){return W.fbHubHost||null;}
function year(){return new Date().getFullYear();}
/* the plate tilts toward the pointer */
function tilt(pl){pl.onpointermove=function(e){if(pl.querySelector("input"))return;var r=pl.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;
    pl.style.transform="perspective(700px) rotateY("+(x*8).toFixed(1)+"deg) rotateX("+(-y*8).toFixed(1)+"deg) translateY(-2px)";};
  pl.onpointerleave=function(){pl.style.transform="";};}
/* the question, in the approved look. o.make: the app about to be made (its title), o.rec its record (for its seal), o.then after a
   choice, o.cancel when it is closed unanswered (nothing is made then). Without o.make it edits the name and the choice only. */
function sheet(o){o=o||{};var x=X();if(!x||!x.sheet){if(o.then)o.then();return null;}
  var mk=!!o.make,app=o.make||"",answered=false,q=quiet(),cur=name(),choice=cur?"name":"new",typed=cur?"":"";
  var sh=x.sheet("","");sh.box.classList.add("r309-sheet");sh.box.setAttribute("data-r309",mk?"make":"edit");
  [].forEach.call(sh.box.querySelectorAll(":scope > h3, :scope > p"),function(e){e.parentNode.removeChild(e);});
  var top=D.createElement("div");top.className="r309-top";
  var seal=D.createElement("div");seal.className="r309-seal";var idle=D.createElement("div");idle.className="r309-idle";
  try{if(o.rec&&x.sealEl&&x.iconOf)idle.appendChild(x.sealEl(x.iconOf(o.rec),56,o.rec));else if(o.rec&&x.sealEl)idle.appendChild(x.sealEl(null,56,o.rec));}catch(e){}
  seal.appendChild(idle);var cast=D.createElement("div");cast.className="r309-cast";seal.appendChild(cast);
  var hd=D.createElement("div");hd.innerHTML='<div class="r309-eye">'+(mk?"Before "+esc(app)+" is made":"Fabrica · your publishing name")+'</div><h3 class="r309-t">'+(mk?"Publish "+esc(app)+" as…":"Publish your apps as…")+"</h3>";
  if(idle.firstChild)top.appendChild(seal);else top.style.gridTemplateColumns="minmax(0,1fr)";top.appendChild(hd);
  var body=D.createElement("div");body.className="r309-body";
  var foot=D.createElement("div");foot.className="r309-foot";
  sh.box.appendChild(top);sh.box.appendChild(body);sh.box.appendChild(foot);
  function eff(){return choice==="none"?"":choice==="new"?clean(typed):cur;}
  function whereHtml(){var n=eff();
    return '<div class="r309-where" aria-label="Where the name shows">'+
      '<div class="r309-tile"><b>On a Mac</b>'+(n?"<span>© "+year()+" "+esc(n)+"</span>":'<span class="none">No rights line</span>')+"</div>"+
      '<div class="r309-tile"><b>On Windows</b>'+(n?"<span>Publisher: "+esc(n)+"</span>":'<span class="none">No publisher</span>')+"</div>"+
      '<div class="r309-tile"><b>Build kits</b>'+(n?"<span>© "+year()+" "+esc(n)+"</span>":"<span>© "+year()+" "+esc(app||"the app")+"</span>")+"</div></div>";}
  function opt(k,t1,t2){return '<div class="r309-opt'+(choice===k?" on":"")+'" data-c="'+k+'" role="radio" aria-checked="'+(choice===k)+'" tabindex="0"><span class="r309-gem"></span><div><b>'+t1+"</b><small>"+t2+"</small></div></div>";}
  function paint(focusNew){
    var plate=choice==="new"?'<div class="r309-pl" id="r309Plate"><div class="r309-lab">Published as</div><input id="r309Name" type="text" maxlength="80" autocomplete="name" placeholder="Type the new name" value="'+esc(typed)+'"></div>':
      '<div class="r309-pl" id="r309Plate"><div class="r309-lab">Published as</div><div class="r309-who"><span class="r309-nm'+(choice==="none"?" none":"")+'">'+(choice==="none"?"No name":esc(cur))+"</span>"+
        (choice==="none"?"":'<button type="button" class="r309-lnk" id="r309ChangeName">Change</button>')+"</div></div>";
    body.innerHTML=plate+whereHtml()+'<div class="r309-opts" role="radiogroup" aria-label="Publish as">'+
      (cur?opt("name","Publish as "+esc(cur),"The name on the plate goes on "+esc(app||"your apps")+"."):"")+
      opt("new","Publish with a new name",cur?"Type it on the plate; it is kept for the next app too.":"Type it on the plate; it is kept for the next app too.")+
      opt("none","Publish with no name",esc(app||"The app")+" names no one.")+"</div>"+
      '<div class="r309-chk" id="r309Quiet" role="checkbox" aria-checked="'+q+'" tabindex="0"><span class="r309-c'+(q?" on":"")+'">'+(q?"✓":"")+"</span><span>Don’t ask me again<small>Turn it back on in Fabrica’s Ship room.</small></span></div>";
    var pl=D.getElementById("r309Plate");if(pl)tilt(pl);
    var ch=D.getElementById("r309ChangeName");if(ch)ch.onclick=function(){choice="new";typed=cur;paint(true);};
    var inp=D.getElementById("r309Name");if(inp){inp.oninput=function(){typed=inp.value;var w=body.querySelector(".r309-where");if(w)w.outerHTML=whereHtml();};
      inp.onkeydown=function(e){if(e.key==="Enter")ok.click();};if(focusNew)setTimeout(function(){try{inp.focus();inp.select();}catch(e){}},40);}
    [].forEach.call(body.querySelectorAll(".r309-opt"),function(el){var pick=function(){var c=el.getAttribute("data-c");if(c===choice)return;choice=c;if(c==="new")typed="";paint(c==="new");
        if(c!=="new"){var n=body.querySelector('.r309-opt[data-c="'+c+'"]');if(n)n.focus();}};
      el.onclick=pick;el.onkeydown=function(e){if(e.key==="Enter"||e.key===" "){e.preventDefault();pick();}};});
    var qk=D.getElementById("r309Quiet");var tq=function(){q=!q;paint();var n=D.getElementById("r309Quiet");if(n)n.focus();};qk.onclick=tq;qk.onkeydown=function(e){if(e.key==="Enter"||e.key===" "){e.preventDefault();tq();}};}
  var c0=sh.close;sh.close=function(){c0();if(!answered&&o.cancel)o.cancel();};
  var cancel=x.btn("","Cancel",function(){sh.close();});cancel.id="r309Cancel";
  var ok=x.btn("pri",mk?"Make "+app:"Save",function(){
    if(choice==="new"&&!clean(typed)){var i=D.getElementById("r309Name");if(i)i.focus();return;}
    var v=eff();answered=true;set(v,q);sh.close();try{x.toast(v?(mk?app+" is published as "+v+".":"Your apps are published as "+v+"."):(mk?app+" names no one.":"Your apps name no one."));}catch(e){}if(o.then)o.then();});
  ok.id="r309Save";foot.appendChild(cancel);foot.appendChild(ok);
  paint(choice==="new");
  /* the keys reach the sheet at once (Escape closes it, the arrows and Enter move through it): the chosen choice has the focus */
  if(choice!=="new")setTimeout(function(){var n=body.querySelector(".r309-opt.on");if(n)try{n.focus({preventScroll:true});}catch(e){n.focus();}},40);
  return sh;}
/* before a make: asked every time, unless "Don't ask me again" was chosen; closed unanswered, nothing is made */
function confirm(what,title,then,cancel,r){if(what&&!CARRIES[what]){then();return;}
  if(quiet()){then();return;}
  if(D.querySelector('[data-r309="make"]')){if(cancel)cancel();return;}
  sheet({make:clean(title)||"this app",rec:r||null,then:then,cancel:cancel});}
/* the Ship part's line: the name, whether it is asked, and a key to change it */
function paintLine(){var x=X(),pk=D.getElementById("fbPkg");if(!x||!pk||!pk.parentNode)return;
  var L=D.getElementById("r309Line");if(!L){L=D.createElement("div");L.id="r309Line";L.className="r309-line";pk.parentNode.insertBefore(L,pk.nextSibling);}
  var n=name(),dec=decided(),qu=quiet();
  L.innerHTML='<span class="r309-who2">'+(dec&&n?"Published as <b>"+esc(n)+"</b>":dec?"Published with <b>no name</b>":"<b>No name yet</b>")+
    "<small>"+(qu?"Used each time, without asking.":"Fabrica asks each time an app is made.")+"</small></span>";
  var k=x.btn("","Change",function(){sheet({});});k.id="r309Change";L.appendChild(k);}
/* Download as an app (r139): the same plate below its fields; Change turns it into a field in place. value() is what is on it. */
function plateFor(){var cur=name(),editing=false,typed=cur;var el=D.createElement("div");el.className="r309-pl r309-dl";el.id="r309DlPlate";
  function paint(){el.innerHTML=editing?'<div class="r309-lab">Published as</div><input id="r309DlName" type="text" maxlength="80" autocomplete="name" placeholder="Your name, or your studio’s (empty: no name)" value="'+esc(typed)+'"><div class="r309-end"><button type="button" class="r309-lnk" id="r309DlDone">Done</button></div>':
      '<div class="r309-lab">Published as</div><div class="r309-who"><span class="r309-nm'+(clean(typed)?"":" none")+'">'+(clean(typed)?esc(clean(typed)):"No name")+'</span><button type="button" class="r309-lnk" id="r309DlChange">Change</button></div>';
    var c=el.querySelector("#r309DlChange");if(c)c.onclick=function(){editing=true;paint();var i=el.querySelector("input");if(i){i.focus();i.select();}};
    var i=el.querySelector("input");if(i){i.oninput=function(){typed=i.value;};i.onkeydown=function(e){if(e.key==="Enter"){e.preventDefault();done();}};}
    var d=el.querySelector("#r309DlDone");if(d)d.onclick=done;}
  function done(){editing=false;set(typed);paint();}
  tilt(el);paint();
  return {el:el,value:function(){return clean(typed);},keep:function(){set(typed);}};}
function hook(){var L=W.fbAfterPaint=W.fbAfterPaint||[];L.push(paintLine);}
if(D.readyState==="loading")D.addEventListener("DOMContentLoaded",hook);else hook();
W.IngPublisher={name:name,decided:decided,quiet:quiet,set:set,confirm:confirm,plate:plateFor,carries:function(w){return !!CARRIES[w];},
  edit:function(){return sheet({});},builtIn:function(){return master()?BUILT_IN:"";}};
try{window.__ingParts["p309"]="running";}catch(_){}
})();
</script>
