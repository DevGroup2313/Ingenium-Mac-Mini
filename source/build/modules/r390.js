<style id="r390-css">
/* ============ R390 · WHAT INGENIUM KNOWS: ONE STORE, KEPT WITH HER, USED EVERYWHERE (Ingenium 7.88, 25 November 2026) ============
   Her words (25 November 2026): "I want you to build a knowledge graph into Ingenium and I want Ingenium's memory in Settings to be
   connected to the Ingenia page and the rest of the app ... I want the folders in Ingenia to be automatically updated ... I want the memory
   of Ingenium to really be used and accurately be updated"; then, of the recommendations: "I approve of all your recommendations, please
   build them into the app". Stage 1 of them (the map's 3D head waits for her choice among the designs):
   - One store (state.know, so it goes with every backup and with Ingenium Cloud as the rest of her work does): facts about each app (its
     folder), about her (her memories, read where they are kept), with where each came from, when, and who gave it: her, a folder's notes,
     Fabrica, a chat. Her own facts come first and are never overwritten; a fact that names a system or device hers do not is shown as
     disagreeing with hers, for her to settle.
   - It learns, asking first: a new decision in a folder's notes and a version Fabrica keeps (the folder's log) each wait for her (Keep,
     Not this); with asking off they are kept at once. What she leaves out is not suggested again.
   - Folders bring themselves up to date: when Ingenium is open and she has not typed for three minutes, a folder with conversations not
     yet read is brought up to date with her chosen model, one at a time; the notes as they were are kept, and the folder offers Undo.
   - Used everywhere: a chat draws the facts that fit what is asked (hers first), and a chat in an app's folder all of that app's facts;
     under the reply, Used N facts lists them.
   - Seen in two places: Settings, Your data, Memory (Waiting for you, Find a fact, each app's facts, the switches) and each app's folder
     in Ingenia (What Ingenium knows about it, its links, its timeline). Every card, row and key stands raised and answers the pointer. */
.kn-card{display:grid;gap:12px}
.kn-sec{display:grid;gap:8px}
.kn-sec>h4{margin:6px 0 0;font:600 12px/1.2 var(--sans,system-ui,sans-serif);letter-spacing:.14em;text-transform:uppercase;color:var(--ink-3)}
.kn-chips{display:flex;flex-wrap:wrap;gap:8px}
.kn-chip{display:inline-flex;align-items:center;gap:6px;font:600 12px/1 var(--sans,system-ui,sans-serif);border-radius:999px;padding:6px 10px;background:rgba(106,63,181,.10);color:var(--accent);
  box-shadow:inset 0 1px 0 rgba(255,255,255,.7),0 2px 0 rgba(96,62,150,.22),0 5px 10px rgba(60,34,110,.12);transition:transform .2s cubic-bezier(.2,.9,.3,1.3),box-shadow .2s}
.kn-chip:hover{transform:translateY(-2px);box-shadow:inset 0 1px 0 rgba(255,255,255,.7),0 4px 0 rgba(96,62,150,.22),0 10px 18px rgba(60,34,110,.16)}
.kn-chip::before{content:"";width:7px;height:7px;border-radius:50%;background:currentColor}
.kn-chip.warn{background:rgba(232,144,42,.15);color:#8a5a12}body[data-theme="night"] .kn-chip.warn{color:#e6b45a}
.kn-list{list-style:none;margin:0;padding:0;display:grid;gap:8px}
.kn-row{display:grid;grid-template-columns:minmax(0,1fr) auto;gap:4px 12px;align-items:center;background:var(--card-hi,rgba(255,255,255,.6));border:1px solid var(--hairline,rgba(106,63,181,.16));border-radius:12px;padding:10px 12px;
  box-shadow:0 2px 0 rgba(96,62,150,.14),0 6px 14px rgba(60,34,110,.08);transition:transform .2s cubic-bezier(.2,.9,.3,1.3),box-shadow .2s}
.kn-row:hover{transform:translateY(-2px);box-shadow:0 4px 0 rgba(96,62,150,.14),0 10px 18px rgba(60,34,110,.14)}
.kn-row.wait{background:linear-gradient(180deg,var(--card-hi,rgba(255,255,255,.6)),rgba(232,144,42,.08))}
.kn-row.her b::after{content:"yours";margin-left:8px;font:700 9.5px/1 var(--sans,system-ui,sans-serif);letter-spacing:.12em;text-transform:uppercase;color:var(--gold,#a87a2c)}
.kn-row b{font-weight:600;color:var(--ink-1);word-break:break-word}
.kn-row small{grid-column:1;font-size:12px;color:var(--ink-3)}
.kn-row .kn-clash{grid-column:1 / -1;font-size:12px;color:#a8323e}body[data-theme="night"] .kn-row .kn-clash{color:#f08a95}
.kn-acts{grid-column:2;grid-row:1 / span 2;display:flex;gap:6px;flex-wrap:wrap;justify-content:flex-end}
.kn-add{display:flex;flex-wrap:wrap;gap:8px;align-items:center}
.kn-in{flex:1 1 220px;min-width:0;font:500 13.5px var(--sans,system-ui,sans-serif);color:var(--ink-1);background:var(--well,rgba(106,63,181,.06));border:1px solid var(--hairline,rgba(106,63,181,.18));border-radius:12px;padding:9px 11px;box-shadow:inset 0 1px 3px rgba(60,34,110,.14)}
.kn-in:focus{outline:2px solid var(--accent);outline-offset:1px}
.kn-sw{display:flex;align-items:center;gap:10px;font-size:13.5px;color:var(--ink-2)}
.kn-sw input{accent-color:var(--accent);width:18px;height:18px}
.kn-links{display:flex;flex-wrap:wrap;gap:8px}
.kn-time{list-style:none;margin:0;padding:0;display:grid;gap:6px}
.kn-time li{display:grid;grid-template-columns:7.5em minmax(0,1fr);gap:10px;font-size:13px;color:var(--ink-2);padding:6px 10px;border-radius:10px;transition:transform .2s cubic-bezier(.2,.9,.3,1.3),background .2s}
.kn-time li:hover{transform:translateX(3px);background:rgba(106,63,181,.06)}
.kn-time time{color:var(--ink-3);font-variant-numeric:tabular-nums}
.kn-used{margin-top:6px;font:600 12px/1.4 var(--sans,system-ui,sans-serif);color:var(--ink-3)}
.kn-used button{appearance:none;border:0;background:none;color:var(--accent);font:inherit;cursor:pointer;padding:0;text-decoration:underline;text-underline-offset:2px}
.kn-undo{font-size:12.5px;color:var(--ink-2)}
body[data-motion="minimal"] .kn-row,body[data-motion="minimal"] .kn-chip,body[data-motion="minimal"] .kn-time li{transition:none}
body[data-motion="minimal"] .kn-row:hover,body[data-motion="minimal"] .kn-chip:hover,body[data-motion="minimal"] .kn-time li:hover{transform:none}
@media (prefers-reduced-motion:reduce){.kn-row,.kn-chip,.kn-time li{transition:none}.kn-row:hover,.kn-chip:hover,.kn-time li:hover{transform:none}}
</style>
<script>try{(window.__ingParts=window.__ingParts||{})["p390"]="started";}catch(_){}
(function r390(){"use strict";
if(window.IngKnow)return;var W=window,D=document;
function mk(t,c,x){var e=D.createElement(t);if(c)e.className=c;if(x!=null)e.textContent=x;return e;}
function key(t,f,pri){var b=mk("button","btn small"+(pri?" primary":""),t);b.type="button";b.onclick=function(e){e.stopPropagation();f(b);};return b;}
function day(t){try{return new Date(t).toLocaleDateString("en-GB",{day:"numeric",month:"short",year:"numeric"});}catch(e){return "";}}
function save(){try{saveState();}catch(e){}}
function norm(s){return String(s||"").trim().toLowerCase().replace(/\s+/g," ");}
function hash(s){var h=5381;s=norm(s);for(var i=0;i<s.length;i++)h=((h<<5)+h+s.charCodeAt(i))|0;return (h>>>0).toString(36);}
/* ---------- the store ---------- */
function K(){var s=W.state;if(!s.know||typeof s.know!=="object")s.know={};var k=s.know;k.facts=Array.isArray(k.facts)?k.facts:[];k.seen=k.seen||{};k.dropped=k.dropped||{};k.undo=k.undo||{};
  k.opts=k.opts||{};if(k.opts.learn==null)k.opts.learn=true;if(k.opts.ask==null)k.opts.ask=true;if(k.opts.auto==null)k.opts.auto=true;return k;}
function apps(){try{return W.IngFolders&&IngFolders.folders?IngFolders.folders():[];}catch(e){return [];}}
function appKey(name){return "app:"+norm(name);}
function appOf(about){var n=String(about||"").replace(/^app:/,"");var A=apps();for(var i=0;i<A.length;i++)if(norm(A[i].name)===n)return A[i];return null;}
function nameOf(about){if(about==="me")return "You";var p=appOf(about);return p?p.name:String(about||"").replace(/^app:/,"");}
var SYS=/\b(windows|mac(os)?|iphone|ipad|ios|android|fire tablet|linux|web|browser|all devices|every device)\b/gi;
function systems(t){var m=String(t||"").toLowerCase().match(SYS)||[];return m.map(function(x){return x.replace(/^mac(os)?$/,"mac");});}
/* a fact that names a system her own facts about that app do not name disagrees with hers */
function clash(f){if(f.src&&f.src.k==="her")return null;var mine=K().facts.filter(function(x){return x.about===f.about&&x.st==="kept"&&x.src&&x.src.k==="her";});if(!mine.length)return null;
  var hs=[].concat.apply([],mine.map(function(x){return systems(x.t);}));if(!hs.length)return null;var fs=systems(f.t);if(!fs.length)return null;
  var all=hs.some(function(s){return /all devices|every device/.test(s);});var off=fs.filter(function(s){return hs.indexOf(s)<0&&!/all devices|every device/.test(s);});
  if(!off.length&&!(all&&fs.length))return null;if(all&&!off.length)return null;var h=mine.filter(function(x){return systems(x.t).length;})[0];return h?h.t:null;}
function add(about,t,src,opt){t=String(t||"").trim();if(!t)return null;var k=K(),h=hash(about+"|"+t);if(k.dropped[h]&&!(src&&src.k==="her"))return null;
  if(k.facts.some(function(x){return x.about===about&&norm(x.t)===norm(t);}))return null;
  var her=src&&src.k==="her",f={id:"kf"+Date.now().toString(36)+Math.random().toString(36).slice(2,6),about:about,t:t.slice(0,600),src:src||{k:"chat"},at:Date.now(),st:her||!k.opts.ask||(opt&&opt.kept)?"kept":"waiting"};
  var c=clash(f);if(c){f.clash=c;f.st="waiting";}k.facts.push(f);save();soon();return f;}
function keep(id){var f=byId(id);if(!f)return;f.st="kept";delete f.clash;f.keptAt=Date.now();save();soon();}
function drop(id){var k=K(),f=byId(id);if(!f)return;k.dropped[hash(f.about+"|"+f.t)]=1;k.facts=k.facts.filter(function(x){return x.id!==id;});save();soon();}
function edit(id,t){var f=byId(id);if(!f||!String(t||"").trim())return;f.t=String(t).trim().slice(0,600);f.src={k:"her",label:"changed by you"};f.st="kept";delete f.clash;f.at=Date.now();save();soon();}
function byId(id){var F=K().facts;for(var i=0;i<F.length;i++)if(F[i].id===id)return F[i];return null;}
function of(about,st){return K().facts.filter(function(f){return f.about===about&&(!st||f.st===st);}).sort(function(a,b){return (b.src&&b.src.k==="her")-(a.src&&a.src.k==="her")||a.at-b.at;});}
function waiting(){return K().facts.filter(function(f){return f.st==="waiting";});}
/* her memories (state.memory, r271) are facts about her: read where they are kept, so there is one place to change them */
function memFacts(){try{var m=W.memState?W.memState():null;return (m&&m.items||[]).map(function(it){return {id:"mem:"+it.id,about:"me",t:it.text,src:{k:"memory",label:"a memory"},at:it.at||0,st:"kept",mem:true};});}catch(e){return [];}}
/* ---------- her facts of r386 come into the store, and r386 reads them from here ---------- */
function bridge(){var A=W.IngAppFacts;if(!A||A.__r390)return;var F=W.state.appFacts||{};
  Object.keys(F).forEach(function(n){(F[n]||[]).forEach(function(x){var f=add(appKey(n),x.t,{k:"her",label:x.her?"your words":"yours",at:x.at});if(f&&x.at)f.at=Date.parse(x.at)||f.at;});});
  var oAdd=A.add;A.add=function(n,t){var r=oAdd?oAdd.apply(A,arguments):false;add(appKey(n),t,{k:"her",label:"yours"});return r;};
  A.of=function(n){return of(appKey(n),"kept").filter(function(f){return f.src&&f.src.k==="her";}).map(function(f){return {t:f.t,src:"her",at:day(f.at)};});};
  A.block=function(n){var L=of(appKey(n),"kept");if(!L.length)return "";return "WHAT THE APP IS, AS I HAVE SAID IT AND AS INGENIUM KNOWS IT (what I said is true above everything else here; never name a system, device or platform these facts do not name):\n"+
    L.map(function(f){return "- "+f.t+(f.src&&f.src.k==="her"?" (mine)":"");}).join("\n");};A.__r390=1;}
/* ---------- learning, asking first: new decisions in a folder's notes, and what Fabrica writes in its log ---------- */
function learn(){var k=K();if(!k.opts.learn)return 0;var n=0;
  apps().forEach(function(p){var a=p.app||{},s=k.seen[p.id]=k.seen[p.id]||{d:{},l:{},first:true},ab=appKey(p.name),first=s.first;
    (a.decisions||[]).forEach(function(d){var h=hash(d);if(s.d[h])return;s.d[h]=1;if(first)return;if(add(ab,d,{k:"folder",label:"its folder's decisions",at:Date.now()}))n++;});
    (a.log||[]).slice(0,30).forEach(function(x){var h=hash((x.at||"")+x.t);if(s.l[h])return;s.l[h]=1;if(first)return;if(/\b(version|kept|shipped|released|tagged|merged)\b/i.test(x.t)&&add(ab,x.t,{k:"fabrica",label:"Fabrica",at:x.at}))n++;});
    s.first=false;});
  if(n)save();return n;}
/* ---------- folders bring themselves up to date: idle three minutes, one folder at a time, the notes as they were kept for Undo ---------- */
var lastKey=Date.now();D.addEventListener("keydown",function(){lastKey=Date.now();},true);D.addEventListener("pointerdown",function(){lastKey=Date.now();},true);
function busy(){try{return !!(W.IngFolders&&IngFolders.run&&IngFolders.run.busy);}catch(e){return true;}}
function autoTick(){var k=K();if(!k.opts.auto||D.hidden||Date.now()-lastKey<180000||busy())return;
  var p=apps().filter(function(x){try{return IngFolders.unread(x).length>0&&!(k.undo[x.id]&&Date.now()-k.undo[x.id].at<600000);}catch(e){return false;}})[0];if(!p)return;
  var a=p.app||{};k.undo[p.id]={brief:a.brief||"",decisions:(a.decisions||[]).slice(),open:(a.open||[]).slice(),briefAt:a.briefAt||0,at:Date.now(),done:false};save();
  Promise.resolve(IngFolders.bringUp(p)).then(function(r){var u=k.undo[p.id];if(r&&u){u.done=true;u.doneAt=Date.now();}else delete k.undo[p.id];save();learn();soon();},function(){delete k.undo[p.id];save();});}
function undo(p){var k=K(),u=k.undo[p.id];if(!u)return;var a=p.app;a.brief=u.brief;a.decisions=u.decisions;a.open=u.open;a.briefAt=u.briefAt;delete k.undo[p.id];save();try{IngFolders.paint();}catch(e){}soon();}
/* ---------- used everywhere: a chat draws the facts that fit; a chat in an app's folder, all of that app's ---------- */
function toks(t){return (String(t||"").toLowerCase().match(/[a-z0-9À-ɏ]{3,}/g)||[]);}
function fit(q,cap){var Q={};toks(q).forEach(function(w){Q[w]=1;});var A=apps(),names=A.filter(function(p){return toks(p.name).some(function(w){return Q[w];});}).map(function(p){return appKey(p.name);});
  var F=K().facts.filter(function(f){return f.st==="kept";}).map(function(f){var s=toks(f.t).filter(function(w){return Q[w];}).length+(names.indexOf(f.about)>=0?3:0)+(f.src&&f.src.k==="her"?1:0);return {f:f,s:s};})
    .filter(function(x){return x.s>=2;}).sort(function(a,b){return b.s-a.s;});var out=[],n=0;F.forEach(function(x){var line="- "+nameOf(x.f.about)+": "+x.f.t;if(n+line.length>cap)return;out.push(x.f);n+=line.length;});return out;}
function wrapMem(){if(typeof W.memLayer!=="function"||W.memLayer.__r390)return;var o=W.memLayer;
  var nm=function(budget){var r=o.apply(this,arguments)||"";try{var msgs=W.curMsgs?W.curMsgs():[],q=msgs.filter(function(m){return m.role==="me";}).slice(-2).map(function(m){return m.text||"";}).join("\n");
      var cap=Math.max(300,Math.min(1600,Math.floor((+budget||6000)*0.08))),L=fit(q,cap);var last=msgs[msgs.length-1],live=last&&last.role==="bot"&&last.live?last:null;
      if(live&&live.know==null)live.know=L.map(function(f){return f.id;});
      if(L.length)r=(r?r+"\n\n":"")+"What Ingenium knows (facts kept on this device, each from the person, a folder or Fabrica; what the person said is true above anything else):\n"+L.map(function(f){return "- "+nameOf(f.about)+": "+f.t;}).join("\n");}catch(e){}return r;};
  nm.__r390=1;W.memLayer=nm;try{memLayer=nm;}catch(e){}}
/* a chat in an app's folder: all of that app's kept facts go with the folder's notes (r208 asks IngFolderFab for its lines) */
function wrapFolder(){var F=W.IngFolderFab;if(!F){F=W.IngFolderFab={lines:function(){return "";}};}if(F.__r390)return;var ol=F.lines,oc=F.card;
  F.lines=function(p){var r=ol?ol.apply(this,arguments):"";try{var L=of(appKey(p.name),"kept");if(L.length)r=(r?r+"\n\n":"")+"What Ingenium knows about "+p.name+" (what I said is true above everything else):\n"+L.map(function(f){return "- "+f.t+(f.src&&f.src.k==="her"?" (mine)":"");}).join("\n");}catch(e){}return r;};
  F.card=function(p,host,ui){var r=oc?oc.apply(this,arguments):undefined;try{folderCard(p,host,ui);}catch(e){try{console.warn("r390 folder card",e);}catch(_){}}return r;};F.__r390=1;}
/* ---------- under a reply: Used N facts ---------- */
function wrapMsg(){if(typeof W.fillMsg!=="function"||W.fillMsg.__r390)return;var o=W.fillMsg;
  var nf=function(d,mm){var r=o.apply(this,arguments);try{if(mm&&mm.role==="bot"&&!mm.live&&mm.know&&mm.know.length&&d&&!d.querySelector(".kn-used")){var L=mm.know.map(byId).filter(Boolean);if(L.length){
      var u=mk("div","kn-used");u.appendChild(D.createTextNode("Used "+L.length+" fact"+(L.length===1?"":"s")+" Ingenium knows: "));var b=mk("button",null,"see them");b.type="button";b.title=L.map(function(f){return nameOf(f.about)+": "+f.t;}).join("\n");
      b.onclick=function(){open(L[0].about);};u.appendChild(b);d.appendChild(u);}}}catch(e){}return r;};nf.__r390=1;W.fillMsg=nf;try{fillMsg=nf;}catch(e){}}
/* ---------- a row ---------- */
function row(f,ctx){var li=mk("li","kn-row"+(f.st==="waiting"?" wait":"")+(f.src&&f.src.k==="her"?" her":""));li.appendChild(mk("b",null,(ctx==="all"?nameOf(f.about)+": ":"")+f.t));
  var from=f.mem?"A memory · in Memory above":(f.src&&f.src.k==="her"?"Yours":"From "+((f.src&&f.src.label)||"a chat"))+" · "+day(f.src&&f.src.at||f.at);li.appendChild(mk("small",null,from));
  if(f.clash)li.appendChild(mk("div","kn-clash","Disagrees with what you said: “"+f.clash+"”. Keep it only if it is right."));
  var acts=mk("div","kn-acts");
  if(f.mem){acts.appendChild(key("Open in Memory",function(){try{W.IngChatMemory.open();}catch(e){}}));}
  else if(f.st==="waiting"){acts.appendChild(key("Keep",function(){keep(f.id);},true));acts.appendChild(key("Change",function(){chg(li,f);}));acts.appendChild(key("Not this",function(){drop(f.id);}));}
  else{acts.appendChild(key("Change",function(){chg(li,f);}));acts.appendChild(key("Forget",function(){drop(f.id);}));}
  li.appendChild(acts);return li;}
function chg(li,f){li.innerHTML="";var w=mk("div","kn-add"),i=mk("input","kn-in");i.type="text";i.value=f.t;i.setAttribute("aria-label","The fact, in your words");w.appendChild(i);
  w.appendChild(key("Keep it so",function(){edit(f.id,i.value);},true));w.appendChild(key("Cancel",function(){soon();}));li.appendChild(w);setTimeout(function(){try{i.focus();}catch(e){}},20);
  i.addEventListener("keydown",function(e){if(e.key==="Enter"){e.preventDefault();edit(f.id,i.value);}if(e.key==="Escape")soon();});}
function adder(about,label){var w=mk("div","kn-add"),i=mk("input","kn-in");i.type="text";i.placeholder=label;i.setAttribute("aria-label",label);w.appendChild(i);
  var go=function(){if(add(about,i.value,{k:"her",label:"yours"}))i.value="";};w.appendChild(key("Add a fact",go));i.addEventListener("keydown",function(e){if(e.key==="Enter"){e.preventDefault();go();}});return w;}
/* ---------- in an app's folder: what Ingenium knows about it, its links, its timeline ---------- */
function folderCard(p,host,ui){var ab=appKey(p.name),c=ui&&ui.card?ui.card("What Ingenium knows",null):mk("section","card");c.classList.add("kn-card");c.id="knFolder";c.setAttribute("data-kn-app",p.name);
  var k=K(),u=k.undo[p.id];if(u&&u.done){var un=mk("div","kn-add");un.appendChild(mk("span","kn-undo","Brought up to date by itself "+day(u.doneAt)+", while you were away from the keyboard."));un.appendChild(key("Undo",function(){undo(p);}));c.appendChild(un);}
  var L=of(ab),ul=mk("ul","kn-list");L.forEach(function(f){ul.appendChild(row(f));});if(!L.length)c.appendChild(mk("p","small muted","Nothing yet. Add what is true of "+p.name+" in your own words; Ingenium also suggests what it learns from this folder and from Fabrica, and asks you first."));c.appendChild(ul);
  c.appendChild(adder(ab,"A fact about "+p.name+", in your words"));
  var lk=mk("div","kn-sec");lk.appendChild(mk("h4",null,"Linked to it"));var lw=mk("div","kn-links");var conv=(W.state.chats||[]).filter(function(x){return x&&x.projectId===p.id;});
  lw.appendChild(mk("span","kn-chip",conv.length+" conversation"+(conv.length===1?"":"s")));if(p.app&&p.app.log&&p.app.log.length)lw.appendChild(mk("span","kn-chip",p.app.log.length+" event"+(p.app.log.length===1?"":"s")+" from Fabrica"));
  if(p.app&&p.app.decisions&&p.app.decisions.length)lw.appendChild(mk("span","kn-chip",p.app.decisions.length+" decision"+(p.app.decisions.length===1?"":"s")));
  var mem=key("Open in Memory",function(){open(ab);});lw.appendChild(mem);lk.appendChild(lw);c.appendChild(lk);
  var T=[];conv.forEach(function(x){var t=x.updated||x.made||(x.imported&&(x.imported.updated||x.imported.at))||0;if(t)T.push({at:t,t:"Conversation: "+(x.title||"untitled")});});
  (p.app&&p.app.log||[]).forEach(function(x){if(x.at)T.push({at:x.at,t:"Fabrica: "+x.t});});if(p.app&&p.app.briefAt)T.push({at:p.app.briefAt,t:"Its notes brought up to date"});
  L.forEach(function(f){if(f.st==="kept")T.push({at:f.keptAt||f.at,t:"Kept: "+f.t});});T.sort(function(a,b){return b.at-a.at;});
  if(T.length){var ts=mk("div","kn-sec");ts.appendChild(mk("h4",null,"Its timeline"));var tl=mk("ul","kn-time");T.slice(0,10).forEach(function(x){var li=mk("li");li.appendChild(mk("time",null,day(x.at)));li.appendChild(mk("span",null,x.t));tl.appendChild(li);});ts.appendChild(tl);c.appendChild(ts);}
  host.appendChild(c);}
/* ---------- in Settings, Your data, Memory: the whole of what Ingenium knows ---------- */
var Q="",FOCUS="";
function roomCard(){var mem=D.getElementById("memRoomCard");if(!mem||!mem.parentNode)return null;var c=D.getElementById("knRoom");if(c&&c.parentNode===mem.parentNode)return c;
  c=mk("section","card kn-card");c.id="knRoom";c.setAttribute("aria-label","What Ingenium knows");mem.parentNode.insertBefore(c,mem.nextSibling);return c;}
function paintRoom(){var c=roomCard();if(!c)return;var k=K(),A=apps(),W1=waiting();c.innerHTML="";
  var hd=mk("div","kn-add");var h=mk("h3",null,"What Ingenium knows");h.style.margin="0";h.style.flex="1 1 auto";hd.appendChild(h);c.appendChild(hd);
  var kept=k.facts.filter(function(f){return f.st==="kept";}).length,mems=memFacts().length;var ch=mk("div","kn-chips");ch.appendChild(mk("span","kn-chip",A.length+" apps · "+(kept+mems)+" facts"));
  ch.appendChild(mk("span","kn-chip"+(W1.length?" warn":""),W1.length?W1.length+" wait for you":"Nothing waits"));c.appendChild(ch);
  c.appendChild(mk("p","small muted","One place for what Ingenium knows about your apps and about you, each fact with where it came from. Chats draw on it, and a chat in an app's folder starts from it. It is kept on this device, goes with your backups, and travels with Ingenium Cloud when you use it."));
  if(W1.length){var ws=mk("div","kn-sec");ws.appendChild(mk("h4",null,"Waiting for you"));var wl=mk("ul","kn-list");W1.forEach(function(f){wl.appendChild(row(f,"all"));});ws.appendChild(wl);c.appendChild(ws);}
  var fs=mk("div","kn-sec");fs.appendChild(mk("h4",null,"Find a fact"));var fi=mk("input","kn-in");fi.type="search";fi.id="knFind";fi.placeholder="A word, an app, a decision";fi.value=Q;fi.setAttribute("aria-label","Find a fact");fs.appendChild(fi);
  var fl=mk("ul","kn-list");fs.appendChild(fl);c.appendChild(fs);
  function find(){Q=fi.value;fl.innerHTML="";var q=norm(Q);if(!q)return;k.facts.concat(memFacts()).filter(function(f){return norm(f.t+" "+nameOf(f.about)).indexOf(q)>=0;}).slice(0,30).forEach(function(f){fl.appendChild(row(f,"all"));});
    if(!fl.children.length)fl.appendChild(mk("li","small muted","Nothing Ingenium knows matches “"+Q+"”."));}
  fi.addEventListener("input",find);find();
  A.forEach(function(p){var ab=appKey(p.name),L=of(ab,"kept");var s=mk("div","kn-sec");s.setAttribute("data-kn-about",ab);s.appendChild(mk("h4",null,p.name));var ul=mk("ul","kn-list");L.forEach(function(f){ul.appendChild(row(f));});
    if(!L.length)ul.appendChild(mk("li","small muted","Nothing kept yet."));s.appendChild(ul);s.appendChild(adder(ab,"A fact about "+p.name));c.appendChild(s);});
  var sw=mk("div","kn-sec");sw.appendChild(mk("h4",null,"How it is kept"));[["learn","Learn from my folders and from Fabrica"],["ask","Ask me before keeping what it learns"],["auto","Bring my folders up to date by themselves while I am away from the keyboard"]].forEach(function(x){
    var l=mk("label","kn-sw"),cb=mk("input");cb.type="checkbox";cb.id="knOpt-"+x[0];cb.checked=!!k.opts[x[0]];cb.onchange=function(){k.opts[x[0]]=cb.checked;save();};l.appendChild(cb);l.appendChild(D.createTextNode(x[1]));sw.appendChild(l);});c.appendChild(sw);
  if(FOCUS){var t=c.querySelector('[data-kn-about="'+FOCUS+'"]');FOCUS="";if(t)setTimeout(function(){try{t.scrollIntoView({block:"center",behavior:"smooth"});}catch(e){}},60);}}
function open(about){FOCUS=about||"";try{W.IngChatMemory.open();}catch(e){try{W.go("settings");}catch(_){}}setTimeout(paintRoom,120);}
/* ---------- painting, soon after anything changes ---------- */
var T0=0;function soon(){if(T0)return;T0=setTimeout(function(){T0=0;try{paintRoom();}catch(e){}try{var fc=D.getElementById("knFolder");if(fc&&W.IngFolders)IngFolders.paint();}catch(e){}},30);}
function watch(){var mem=D.getElementById("memRoomCard");if(mem&&!mem.__r390){mem.__r390=1;paintRoom();}}
(function start(){var n=0;(function w(){if(W.__ingReady===true&&W.IngFolders&&W.state){K();bridge();wrapMem();wrapFolder();wrapMsg();learn();try{IngFolders.paint();}catch(e){}
      setInterval(function(){try{bridge();learn();watch();autoTick();}catch(e){}},20000);setInterval(watch,1500);return;}if(++n<400)setTimeout(w,500);})();})();
W.IngKnow={add:add,keep:keep,drop:drop,edit:edit,of:of,waiting:waiting,fit:fit,learn:learn,open:open,undo:undo,autoTick:autoTick,store:K,appKey:appKey,clash:clash,paint:paintRoom};
})();
;try{window.__ingParts["p390"]="running";}catch(_){}
</script>
