<style id="r352-css">
/* ============ R352 · YOUR APPS SIGNED WHEN SHIPPED, PART TWO (Ingenium 7.62, 21 November 2026) ============
   Her words (21 November 2026), on the list's next item: "Yes, please start on the signing card and continue working on my requests."
   Part one (modules/r349.js, 7.60) signs every package Fabrica makes with her owner key; the web app already checks its own files.
   Part two, as the Security room promised it (approved on the live preview of 18 November 2026: "a changed file is caught, and the app
   refuses to open and says so"):
   - Each app Fabrica makes for a device checks its page against the signature every time it starts, before anything of it runs: the
     Mac app, the Windows app, the Fire tablet's and Android's APK, the iPhone and iPad's IPA. The check is compiled into each shell
     (source/shells: mac, ios, windows, android), with the owner's public keys every copy of Ingenium carries; a page that is not as it
     was signed is never shown: the shell shows its own page instead (source/shells/common/refused.html, r349's approved refusal, compiled
     into the shell so a changed copy cannot change it), saying which file and why. The package says it was signed (shell.json's
     "signature", or shell.txt's signature= on Windows), so a page whose signature was taken away is refused too.
   - An app brought into her library is checked as it comes in: Lector's app library (Add your apps, the app library file, one app's
     page) and Fabrica's Bring one in (a page or a zip). Signed and as it was signed: kept, marked Signed by you. Not signed: kept as
     before, marked Not signed. Changed, or signed with a key that is not the owner's: a card of r349's own kind says so and asks; Leave
     it out is the key it opens on, and Keep it anyway keeps it marked Changed. Copies kept before 7.62 are checked once, quietly.
   The marks are small raised chips under each app's name and version on Lector's tiles of her apps (and the older card of the app
   library, where it is drawn); they never move. Minimal or reduced motion keeps
   the card still, as r349's.
   window.IngAppSign gains: cameIn(u8, name) -> {go, r, s}, brief(r), libChip(s) */
.r352-sig{align-self:flex-start;display:inline-flex;align-items:center;gap:5px;font:600 11px/1 var(--sans,system-ui,sans-serif);padding:4px 9px 4px 6px;border-radius:999px;margin:2px 0 4px;
  background:rgba(31,157,99,.13);color:#1a7f50;box-shadow:inset 0 1px 0 rgba(255,255,255,.65),0 1px 1px rgba(40,22,68,.14),0 2px 5px rgba(40,22,68,.09);white-space:nowrap;letter-spacing:0;text-transform:none}
.r352-sig svg{width:12px;height:12px;flex:0 0 auto;fill:none;stroke:currentColor;stroke-width:2.2;stroke-linecap:round;stroke-linejoin:round}
.r352-sig.bad{background:rgba(200,20,60,.1);color:#b8433f}
.r352-sig.none{background:rgba(34,26,46,.06);color:#6c6579}
#lx7 .l-app .r352-sig{align-self:center;margin:1px 0 0}
body[data-theme="night"] .r352-sig{background:rgba(64,192,128,.15);color:#6fd8a2;box-shadow:inset 0 1px 0 rgba(255,255,255,.08),0 1px 2px rgba(0,0,0,.45),0 2px 5px rgba(0,0,0,.3)}
body[data-theme="night"] .r352-sig.bad{background:rgba(240,120,120,.14);color:#f08a8a}
body[data-theme="night"] .r352-sig.none{background:rgba(255,255,255,.08);color:#b9b0c8}
#r349Ask .r352-why b{font-weight:700;color:inherit}
#r349Ask .r352-after{font-size:12.8px}
</style>
<script>try{(window.__ingParts=window.__ingParts||{})["p352"]="started";}catch(_){}
/* R352 · your apps signed when shipped, part two: see the note at the top of its styles */
(function r352(){
"use strict";
var W=window,D=document;
if(W.__r352||!W.IngAppSign)return;W.__r352=1;
var A=W.IngAppSign;
function edition(){try{return typeof ING_EDITION==="string"?ING_EDITION:"master";}catch(e){return "master";}}
function master(){return edition()==="master";}
function esc(s){return String(s==null?"":s).replace(/[&<>"']/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c];});}
var MONTHS=["January","February","March","April","May","June","July","August","September","October","November","December"];
function day(iso){var m=/^(\d{4})-(\d\d)-(\d\d)/.exec(String(iso||""));return m?(+m[3])+" "+MONTHS[+m[2]-1]+" "+m[1]:"";}
function you(){return master()?"you":"its maker";}
var TICK='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12.5l4.2 4.2L19 7"/></svg>';
var WARN='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3.8l8.6 15.4H3.4z"/><path d="M12 10v4.2"/><path d="M12 17h.01"/></svg>';
var DASH='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 12h10"/></svg>';

/* ---------- what a check found, kept with the copy, and its mark ---------- */
function brief(r){r=r||{};var rel=r.release||{};
  return {state:r.state||"unsigned",kid:r.kid||"",made:rel.made||"",version:rel.version||"",name:rel.name||"",app:rel.app||"",
    changed:(r.changed||[]).map(function(c){return String(c.name);}).slice(0,6),at:Date.now()};}
function chipOf(s){if(!s)return "";var d=day(s.made);
  if(s.state==="signed")return '<span class="r352-sig" title="'+esc("Signed with "+(master()?"your owner key":"its maker's key")+(d?" on "+d:"")+": as it was signed.")+'">'+TICK+(master()?"Signed by you":"Signed")+'</span>';
  if(s.state==="changed")return '<span class="r352-sig bad" title="'+esc("Not as it was signed"+(d?" on "+d:"")+(s.changed.length?": "+s.changed.join(", ")+" changed":"")+". Kept, as you chose.")+'">'+WARN+'Changed</span>';
  if(s.state==="foreign")return '<span class="r352-sig bad" title="'+esc("Its signature is not the owner's. Kept, as you chose.")+'">'+WARN+'Not the owner\'s</span>';
  return '<span class="r352-sig none" title="'+esc("It carries no signature: made before your signatures, or elsewhere.")+'">'+DASH+'Not signed</span>';}

/* ---------- a copy that is not as it was signed: r349's own card, which opens on Leave it out ---------- */
var ASKING=Promise.resolve();
function askKeep(name,r){var go=ASKING.then(function(){return new Promise(function(res){var old=D.getElementById("r349Ask");if(old)old.remove();
  var rel=r.release||{},d=day(rel.made),changed=r.state==="changed",w=D.createElement("div");
  w.id="r349Ask";w.setAttribute("role","alertdialog");w.setAttribute("aria-modal","true");w.setAttribute("aria-labelledby","r349AskH");w.setAttribute("aria-describedby","r352Why");
  var why=changed?"After "+you()+" signed it"+(d?" on "+esc(d):"")+": "+(r.changed||[]).map(function(c){return "<b>"+esc(c.name)+"</b> "+(c.why==="missing"?"is missing":c.why==="added"?"was added":"changed");}).join(", ")+"."
    :esc(r.why||"Its signature is not the owner's.");
  w.innerHTML='<div class="sa-card"><div class="eye">Checked as it comes in</div>'
    +'<h2 id="r349AskH">'+(changed?esc(name)+" is not as "+you()+" signed it":esc(name)+": its signature is not "+(master()?"yours":"the owner's"))+'</h2>'
    +'<span class="r349-state bad">'+(changed?"Changed":"Not the owner's")+'</span><p class="r352-why" id="r352Why">'+why+'</p>'
    +(rel.app||rel.name?'<dl class="r349-rows"><dt>App</dt><dd>'+esc(rel.name||rel.app)+'</dd>'+(rel.version?'<dt>Version</dt><dd>'+esc(rel.version)+'</dd>':'')+(r.kid?'<dt>Key</dt><dd class="r349-fp">'+esc(r.kid)+'</dd>':'')+'</dl>':'')
    +'<p class="r352-after">Left out, nothing of it is kept. Kept anyway, it is marked '+(changed?"Changed":"Not the owner's")+' wherever it is listed.</p>'
    +'<div class="sa-keys"><button type="button" class="sc-key quiet" id="r352Keep">Keep it anyway</button><button type="button" class="sc-key pri" id="r352Leave">Leave it out</button></div></div>';
  D.body.appendChild(w);var done=false;
  function end(v){if(done)return;done=true;w.remove();try{if(W.IngSound)IngSound.play(v?"keys":"soft");}catch(e){}res(v);}
  D.getElementById("r352Leave").onclick=function(){end(false);};D.getElementById("r352Keep").onclick=function(){end(true);};
  w.addEventListener("keydown",function(e){if(e.key==="Escape"){e.preventDefault();end(false);}});
  setTimeout(function(){try{D.getElementById("r352Leave").focus();}catch(e){}},60);});});
  ASKING=go.then(function(){},function(){});return go;}
/* checked as it comes in: {go: bring it in, r: what the check found, s: brief(r)} */
function cameIn(u8,name){return Promise.resolve().then(function(){return A.check(u8);}).then(null,function(e){return {state:"unsigned",why:"It could not be checked: "+((e&&e.message)||e)};})
  .then(function(r){if(r.state==="changed"||r.state==="foreign")return askKeep(name||"This app",r).then(function(keep){return {go:keep,r:r,s:brief(r)};});
    return {go:true,r:r,s:brief(r)};});}
A.cameIn=cameIn;A.brief=brief;A.libChip=chipOf;

/* ---------- Lector's app library: every copy kept is checked first, and keeps what was found ---------- */
var LEFT=[];
function leftError(label){var e=new Error("Left out, as you chose: "+label+" is not as "+you()+" signed it.");e.ingLeft=label;return e;}
if(typeof W.libKeep==="function"){var oKeep=W.libKeep;
  W.libKeep=function(key,meta,u8,text){var self=this,args=arguments;if(!u8||!u8.length)return oKeep.apply(self,args);
    var label=String((meta&&(meta.title||meta.name))||key).replace(/\.html?$/i,"");
    return cameIn(u8,label).then(function(x){if(!x.go){LEFT.push(label);throw leftError(label);}
      /* 7.68 (modules/r357.js): a scrambled copy of one of her apps whose version her Fabrica holds is kept as written */
      var aw=x.asWritten;if(aw){u8=new TextEncoder().encode(aw.html);text=aw.html;try{if(typeof W.ingToast==="function")W.ingToast(label+" is a scrambled copy of your own app: kept as written, from Fabrica (version "+aw.commit.slice(0,7)+").");}catch(e){}}
      return Promise.resolve(oKeep.call(self,key,Object.assign({},meta,{sig:aw&&x.s2?x.s2:x.s}),u8,text)).then(function(r){
        /* the same copy, kept before 7.62: what was found is added to it */
        try{var m=W.libState().apps[key];if(r==="same"&&m&&!m.sig){m.sig=x.s;if(typeof W.saveState==="function")W.saveState();}}catch(e){}return r;});});};}
/* Add your apps: what she left out is said as such, never as a page that could not be read */
if(typeof W.libAddFiles==="function"){var oAdd=W.libAddFiles;
  W.libAddFiles=function(){LEFT=[];return Promise.resolve(oAdd.apply(this,arguments)).then(function(v){setTimeout(sweep,400);if(!LEFT.length){repaint();return v;}
    try{var last=W.__libLastAdd||{},fails=last.fail||[],kept=fails.filter(function(f){return f.indexOf("Left out, as you chose")<0;}),note=String((W.LIB&&LIB.note)||"");
      var was=fails.length?"Could not be read: "+fails.join("; ")+".":"",now=(kept.length?"Could not be read: "+kept.join("; ")+". ":"")+"Left out, as you chose: "+LEFT.join(", ")+" (not as "+you()+" signed "+(LEFT.length>1?"them":"it")+").";
      LIB.note=was&&note.indexOf(was)>=0?note.replace(was,now):(note?note+" ":"")+now;last.fail=kept;last.left=LEFT.slice();W.__libLastAdd=last;
      if(typeof W.libPaint==="function")W.libPaint();repaint();}catch(e){}
    return v;});};}
/* the card on Lector's page: each copy's mark under its version */
function cssKey(k){try{return CSS.escape(k);}catch(e){return String(k).replace(/[^\w-]/g,"\\$&");}}
var LATER={},LATER_T=0;
function repaintCard(){try{var c=D.getElementById("libCard");if(c&&typeof W.libCardHtml==="function"){var n=D.createElement("div");n.innerHTML=W.libCardHtml();if(n.firstChild){c.replaceWith(n.firstChild);if(typeof W.libWire==="function")W.libWire();}}}catch(e){}}
if(typeof W.libCardHtml==="function"){var oCard=W.libCardHtml;
  W.libCardHtml=function(){var h=oCard.apply(this,arguments);if(!h)return h;
    try{var apps=W.libState().apps,box=D.createElement("div"),any=false;box.innerHTML=h;
      Object.keys(apps).forEach(function(k){var m=apps[k];if(!m||!m.ref)return;var tile=box.querySelector(".lib-app.lib-"+cssKey(k));if(!tile||tile.querySelector(".r352-sig"))return;
        if(!m.sig){LATER[k]=1;return;}var t=D.createElement("span");t.innerHTML=chipOf(m.sig);var v=tile.querySelector(".lib-ver")||tile.querySelector(".lib-name");
        if(t.firstChild){if(v)v.insertAdjacentElement("afterend",t.firstChild);else tile.insertBefore(t.firstChild,tile.firstChild);any=true;}});
      if(Object.keys(LATER).length){clearTimeout(LATER_T);LATER_T=setTimeout(checkLater,1500);}
      return any?box.innerHTML:h;}catch(e){return h;}};}
/* copies kept before 7.62: each checked once, quietly, one after another, once the page is ready and after every Add your apps */
function bytesOf(key){var m=W.libState().apps[key];if(!m||!m.ref)return Promise.resolve(null);var id=m.ref;
  return Promise.resolve().then(function(){return typeof W.libTx==="function"?W.libTx("readonly",function(s){return s.get(id);}):null;}).then(null,function(){return null;})
    .then(function(b){if(b)return b instanceof Uint8Array?b:new Uint8Array(b);
      return typeof W.libText==="function"?W.libText(key).then(function(t){return t?new TextEncoder().encode(t):null;}):null;});}
var CHECKING=false;
function sweep(){try{var apps=W.libState().apps;Object.keys(apps).forEach(function(k){if(apps[k]&&apps[k].ref&&!apps[k].sig)LATER[k]=1;});}catch(e){}checkLater();}
function checkLater(){if(CHECKING)return;var keys=Object.keys(LATER);if(!keys.length)return;CHECKING=true;var changed=false,i=0;
  function next(){if(i>=keys.length)return Promise.resolve();var k=keys[i++];delete LATER[k];
    return bytesOf(k).then(function(u8){if(!u8)return;return Promise.resolve(A.check(u8)).then(function(r){var m=W.libState().apps[k];if(m&&!m.sig){m.sig=brief(r);changed=true;}});})
      .then(null,function(){}).then(next);}
  next().then(function(){CHECKING=false;if(changed){try{if(typeof W.saveState==="function")W.saveState();}catch(e){}repaint();}});}
function repaint(){repaintCard();try{var pg=D.getElementById("page-lector");if(pg&&!pg.classList.contains("hidden")&&W.IngLector&&typeof IngLector.render==="function")IngLector.render();}catch(e){}}
setTimeout(function wait(){if(W.__ingReady===true&&!W.__ingLocked)setTimeout(sweep,3000);else setTimeout(wait,1500);},1500);
})();
;try{window.__ingParts["p352"]="running";}catch(_){}
</script>
