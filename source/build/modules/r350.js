<style id="r350-css">
/* ============ R350 · THE PRACTICE STUDIO: INGENIUM SHOWN WHILE NO ONE IS SIGNED IN (Ingenium 7.61, 21 November 2026) ============
   Her words (20 November 2026): "I want a practice page built into Ingenium or a Guest page built into the app that users are able to
   view when they are signed out of their account and want to show the app. Basically, I want the similar option as the Lakay app's
   "Practice Store" or some variation of that."
   As Lakay's practice store does (its own books, sample goods, opened from the door with no sign-in, a mark that never lets it be taken
   for the real store, Start again, Leave), the practice studio is Ingenium itself with sample work in it:
   - Where it opens: only where no one is signed in. On the sign-in's card, after its note ("Nothing in it opens without it."), a key
     "Open the practice studio"; on Who is using Ingenium (after Sign out, or Someone else? Choose a profile), a line and the same key.
   - What it is: its own stores, as a profile's are ("@practice", build/boot/profiles_boot.js), so nothing sealed is opened and no key is
     in memory (the page starts again to enter it, as a change of profile does); none of the owner's own parts run in it (it is another
     person's profile: build_page.py's _OWNER_ONLY, r336); it runs as the full edition on her master copy, as that profile does.
   - What it holds: sample conversations, a sample app's folder on Ingenia with its files, all invented, each sample reply marked so.
   - What it never changes, since it opens without a password (boot/profiles_boot.js, in the practice studio only): the names the
     device shares are read and never written (the models' record, the device's protection, the graphics measure, the list of profiles);
     the device's shared databases are read-only (the models' files and the engine, the device's pairing, the training lab's models) and
     never deleted; the computer app refuses, before they reach it, the calls that would change the device (its models and engine, its
     sharing and pairing, its drives and repositories, its runs and tools, its training, the folders the folder search reads, the page it
     opens, its own sign-in key, its signatures, the Cloud, the clipboard). Settings, Security says so in the practice studio. A sign-in
     is not offered in it (IngLock.setup says why).
   - Its mark: a key in the top bar, "Practice studio", that opens the Status panel; a strip at the head of Home; in the Status panel, in
     place of the profiles, Start again and Leave the practice studio.
   - It ends when it is left, or when Ingenium closes (a new session opens at the door it was entered from), and everything tried in it
     is taken away: its stores, and its files on the computer app's disk (profile_drop).
   Every surface is raised and answers the pointer, of the kind it sits in (the doors' own keys, the bar's keys, the panel's rows, the
   p3 card); in Ingenium's own colours, a soft lilac for the practice studio's mark (no gold); Minimal or reduced motion keeps all still.
   Shown to her as twelve pictures one by one at full size (previews/practice: nine by day, three by night), and her word (20 November
   2026): "I approve of the previews, please commit and push it everywhere and continue working on my requests." rig/t_759_practice.js.
   window.IngPractice: on(), enter(), leave(), again(), sample() */
body{--r350-dot:#a78bdb;--r350-ring:rgba(167,139,219,.22);--r350-edge:#b9a3e8;--r350-tile-a:#e6dafa;--r350-tile-b:#c9b3ee;--r350-tile-c:#3b2266}
body[data-theme="night"]{--r350-dot:#c4b0ee;--r350-ring:rgba(196,176,238,.18);--r350-edge:#8a6fc6;--r350-tile-a:#4a3a6e;--r350-tile-b:#33275a;--r350-tile-c:#efe6ff}
/* the top bar: a key of the bar's own kind (.cl-key), beside the status */
#r350Pill{font-weight:600}
#r350Pill .pdot{width:8px;height:8px;border-radius:50%;flex:none;background:var(--r350-dot);box-shadow:0 0 0 3px var(--r350-ring)}
@media (max-width:640px){#r350Pill .r350-t{display:none}#r350Pill{width:30px;padding:0;justify-content:center}}
/* a small round tile with an easel on it: the practice studio's own, in the profiles' pastel family */
.r350-mk{--s:34px;width:var(--s);height:var(--s);flex:none;display:inline-grid;place-items:center;border-radius:50%;color:var(--r350-tile-c);
  background:radial-gradient(circle at 34% 28%,rgba(255,255,255,.75),rgba(255,255,255,0) 46%),linear-gradient(160deg,var(--r350-tile-a),var(--r350-tile-b));
  box-shadow:inset 0 1px 0 rgba(255,255,255,.6),inset 0 -2px 3px rgba(40,22,68,.16),0 2px 0 rgba(40,22,68,.16),0 5px 10px rgba(40,22,68,.14);
  transition:transform .35s var(--p3-spring,cubic-bezier(.2,.9,.25,1.2))}
.r350-mk svg{width:58%;height:58%;fill:none;stroke:currentColor;stroke-width:1.7;stroke-linecap:round;stroke-linejoin:round}
body[data-theme="night"] .r350-mk{box-shadow:inset 0 1px 0 rgba(255,255,255,.16),inset 0 -2px 3px rgba(0,0,0,.4),0 2px 0 rgba(0,0,0,.5),0 5px 10px rgba(0,0,0,.4)}
/* Home: the strip at its head */
.r350-strip{display:flex;align-items:center;flex-wrap:wrap;gap:12px 18px;margin:0 0 16px;padding:14px 16px 14px 20px;border-radius:16px;border:1px solid var(--p3-line);
  background:var(--p3-card);color:var(--p3-ink2);box-shadow:inset 4px 0 0 var(--r350-edge),var(--p3-card-sh);
  font:14px/1.5 -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif;
  transition:transform .35s var(--p3-spring),box-shadow .3s;animation:r350Rise .45s var(--p3-spring) backwards}
.r350-strip:hover{transform:translateY(-2px);box-shadow:inset 4px 0 0 var(--r350-edge),var(--p3-card-hi)}
.r350-strip:hover .r350-mk{transform:rotate(-6deg) scale(1.06)}
.r350-strip .r350-words{flex:1 1 300px;min-width:0}
.r350-strip h3{margin:0;font:600 21px/1.2 var(--p3-serif);color:var(--p3-ink1)}
.r350-strip p{margin:3px 0 0;font-size:13.3px;color:var(--p3-ink2)}
.r350-strip .r350-keys{display:flex;gap:10px;flex-wrap:wrap;margin-left:auto}
.r350-strip .r331-k{font:600 12.8px/1 inherit;min-height:34px;padding:0 14px;border-radius:10px;cursor:pointer;transition:transform .2s var(--p3-bounce),box-shadow .2s}
@keyframes r350Rise{from{opacity:0;transform:translateY(8px)}}
/* Settings, Security, inside the practice studio: one raised line before the room's card, in ink */
.r350-sec{display:flex;align-items:center;gap:10px;margin:0 0 12px;padding:10px 14px;border-radius:14px;border:1px solid var(--p3-line);background:var(--p3-card);color:var(--p3-ink2);
  box-shadow:inset 3px 0 0 var(--r350-edge),var(--p3-card-sh);font-size:13px;line-height:1.45;transition:transform .3s var(--p3-spring),box-shadow .3s}
.r350-sec:hover{transform:translateY(-2px);box-shadow:inset 3px 0 0 var(--r350-edge),var(--p3-card-hi)}
.r350-sec .r350-mk{--s:24px}
body[data-motion="minimal"] .r350-sec{transition:none}body[data-motion="minimal"] .r350-sec:hover{transform:none}
@media (prefers-reduced-motion:reduce){.r350-sec{transition:none}.r350-sec:hover{transform:none}}
/* the doors: on Who is using Ingenium, a line in ink and the door's own quiet key */
.r350-door{display:flex;flex-direction:column;align-items:center;gap:8px;width:100%;margin-top:2px;padding-top:12px;border-top:1px solid var(--p3-line)}
.r350-door p{margin:0;font-size:12.8px;color:var(--p3-ink3);max-width:420px}
.r350-door .r331-k{cursor:pointer;font:600 12.8px/1 inherit;transition:transform .2s var(--p3-bounce),box-shadow .2s}
.r350-door .r331-k .r350-mk{--s:20px;box-shadow:inset 0 1px 0 rgba(255,255,255,.6),inset 0 -1px 2px rgba(40,22,68,.16)}
#ingLockDoor #ildPractice{white-space:nowrap}
/* the welcome door, inside the practice studio: its mark in the card's top-left corner, where the little lock stands elsewhere (a pill
   of the theme switch's own kind, its twin across the card) */
body.r350-on #introDoor .intro-corner-l:not(.r350-corner){display:none}
.r350-chip{display:inline-flex;align-items:center;gap:7px;padding:3px 11px 3px 4px;font:600 11.5px/1 var(--sans,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif);letter-spacing:.02em;color:var(--ink-2,#4a4358);cursor:default}
.r350-chip .r350-mk{--s:20px;box-shadow:inset 0 1px 0 rgba(255,255,255,.6),inset 0 -1px 2px rgba(40,22,68,.16)}
/* the Status panel: the practice studio's lines, of the panel's own kind */
.pres-menu .r350-say{padding:2px 12px 6px;font-size:12px;line-height:1.45;opacity:.8;max-width:290px}
.pres-menu .r350-row .r350-mk{--s:22px;margin:0 2px 0 -2px}
.pres-menu .r350-row .pres-ico{width:22px;margin:0 2px 0 -2px;text-align:center}
body[data-motion="minimal"] .r350-strip,body[data-motion="minimal"] .r350-mk,body[data-motion="minimal"] .r350-door *{animation:none!important;transition:none!important}
body[data-motion="minimal"] .r350-strip:hover,body[data-motion="minimal"] .r350-strip:hover .r350-mk{transform:none!important}
@media (prefers-reduced-motion:reduce){.r350-strip,.r350-mk,.r350-door *{animation:none!important;transition:none!important}.r350-strip:hover,.r350-strip:hover .r350-mk{transform:none!important}}
</style>
<script>try{(window.__ingParts=window.__ingParts||{})["p350"]="started";}catch(_){}
/* R350 · the practice studio: see the note at the top of its styles. window.IngPractice */
(function r350(){"use strict";
var W=window,D=document;if(W.IngPractice)return;
var X=W.__ingProfiles||null,P=X&&X.practice||null,ON=!!(P&&W.__ingPractice);
var EASEL='<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="4.5" y="3.5" width="15" height="10.5" rx="1.6"/><path d="M8 7.5h5M8 10.5h8M12 14v3M8 21l4-4 4 4"/></svg>';
var NOTE="A sample reply, written for the practice studio.";
function $(id){return D.getElementById(id);}
function mk(t,c,x){var e=D.createElement(t);if(c)e.className=c;if(x!=null)e.textContent=x;return e;}
function warn(e){try{console.warn("r350",e&&e.message||e);}catch(_){}}
function snd(n){try{if(W.IngSound)IngSound.play(n);}catch(e){}}
function toast(t){try{if(typeof W.ingToast==="function")W.ingToast(t);else if(typeof W.toast==="function")W.toast(t);}catch(e){}}
function ask(o){try{if(typeof W.ingAsk==="function")return Promise.resolve(W.ingAsk(o));}catch(e){}return Promise.resolve(W.confirm(o.text));}
function api(){try{return (W.pywebview&&W.pywebview.api)||null;}catch(e){return null;}}
/* the computer app: the practice studio's files on its disk taken away (only ever the practice studio's own) */
function appDrop(){var a=api();if(!a||typeof a.profile_drop!=="function")return Promise.resolve(true);
  return Promise.resolve(a.profile_drop("practice")).then(function(){return true;},function(){return true;});}
/* 7.61: since 7.59 each profile has its own folder search index (rag-<id>.sqlite3, rag/main.js); the practice studio's goes with it */
function ragDrop(wait){var t0=Date.now();return new Promise(function(res){(function t(){var R=W.IngRag;
    if(R&&typeof R.dropProfile==="function"){Promise.resolve(R.dropProfile("practice")).then(function(){res(true);},function(){res(false);});return;}
    if(Date.now()-t0<wait)setTimeout(t,500);else res(false);})();});}
function mark(){var m=mk("span","r350-mk");m.setAttribute("aria-hidden","true");m.innerHTML=EASEL;return m;}

/* ---------- the sample work: invented, nothing of anyone's ---------- */
function sample(night){var now=Date.now(),H=3600000,day=24*H;
  function talk(id,title,q,a,when){return {id:id,title:title,messages:[{role:"me",text:q,at:when},{role:"bot",text:a,at:when+40000,done:when+40000,note:NOTE}]};}
  return {introSeen:false,theme:night?"night":"day",__deskAt:now,persona:{name:"Guest"},__practice:{v:1,made:now,folders:false},
    chats:[
      talk("cpr-reading","Planning a reading week","Help me plan a calm reading week: three short books, about an hour a day, with one day to rest.",
        "Here is a gentle plan, an hour a day:\n\n- **Monday and Tuesday:** the first book, a chapter or two each day.\n- **Wednesday:** finish it, and write three lines on what stayed with you.\n- **Thursday and Friday:** the second book.\n- **Saturday:** the third book, read slowly, out of doors if you can.\n- **Sunday:** rest. Look back over your three notes.\n\nIf a day goes wrong, move on to the next one: the plan bends, it does not break.",now-2*day),
      talk("cpr-tides","Tides, explained simply","Explain, in plain words, why most coasts have two high tides a day.",
        "The Moon pulls on the whole Earth, but a little more strongly on the side nearer to it. The sea on that side is drawn towards the Moon, and the sea on the far side is left behind a little, so the water stands higher in two places at once: one facing the Moon, one facing away.\n\nAs the Earth turns once a day, a coast passes under both of those swells, so it has two high tides and two low tides. Because the Moon moves along its own path meanwhile, the tides come about fifty minutes later each day.",now-day-3*H),
      talk("cpr-note","A kind note to a neighbour","Write a short, friendly note asking my neighbour to keep the shared hallway clear of bicycles.",
        "Hello, neighbour,\n\nI hope you are well. Could I ask a small favour? The bicycles in our shared hallway make it hard to get past with shopping, and I worry someone might trip in the dark. Would it be possible to keep them in the bike store, or against the far wall?\n\nThank you so much. Do knock if I can ever return the favour.\n\nWith best wishes, from number 4",now-5*H)],
    activeChat:"cpr-reading"};}
/* a sample app's folder on Ingenia, with its files, made once the page's own parts are there (so its record is theirs) */
var FOLDER={name:"Tide Clock",words:["tides","harbour","clock"],files:[
  ["Tide Clock, what it is.md","# Tide Clock\n\nA sample app for the practice studio: a small clock that shows the next high and low tide for one harbour. Nothing here is real.\n\n## What it does\n\n- Shows the time of the next high tide and the next low tide.\n- Draws the day's tide as a gentle curve.\n- Works with no connection, from a tide table kept on the device.\n"],
  ["Tide Clock, ideas.md","# Ideas for Tide Clock\n\n- A quiet chime at high tide, with a way to turn it off.\n- A night face in deep blue.\n- A second harbour for travel.\n- Large, clear numbers that can be read from across a room.\n"]]};
function seedFolder(){var s=W.state;if(!s||!s.__practice||s.__practice.folders)return Promise.resolve(false);
  var F=W.IngFolders;if(!F||typeof F.make!=="function"||typeof W.ccPut!=="function")return Promise.resolve(false);
  var p=null;try{p=F.make(FOLDER.name,FOLDER.words);}catch(e){warn(e);}if(!p)return Promise.resolve(false);
  if(!Array.isArray(p.files))p.files=[];
  return FOLDER.files.reduce(function(q,f){return q.then(function(){if(p.files.some(function(x){return x&&x.name===f[0];}))return;var x={name:f[0],ref:null,size:0};p.files.push(x);return Promise.resolve(W.ccPut(x,f[1]));});},Promise.resolve())
    .then(function(){(s.chats||[]).forEach(function(c){if(c&&c.id==="cpr-tides")c.projectId=p.id;});s.__practice.folders=true;try{saveState();}catch(e){}
      try{if(typeof F.paint==="function")F.paint();}catch(e){}return true;},function(e){warn(e);return false;});}

/* ---------- entering, from a door ---------- */
var BUSY=false;
function doorNight(){var l=$("ingLockDoor");if(l&&!l.hidden&&l.classList.contains("ild-night"))return true;var d=$("profDoor");if(d&&!d.hidden&&d.classList.contains("r344-night"))return true;
  return D.body.getAttribute("data-theme")==="night";}
function enter(){if(BUSY||!P||ON)return Promise.resolve(false);BUSY=true;snd("cards");var night=doorNight();
  try{if(typeof W.saveState==="function")W.saveState();}catch(e){}   /* an open profile behind the door keeps its work; a sealed one writes nothing */
  return appDrop().then(function(){return Promise.race([ragDrop(0),new Promise(function(r){setTimeout(r,2000);})]);}).then(function(){P.clear();var desk=JSON.stringify(sample(night));
      if(!P.put("ingenium_v4",desk)||!P.enter())throw new Error("This browser's store refused the practice studio.");
      W.__ingResetting=true;setTimeout(function(){location.reload();},120);return true;})
    .then(null,function(e){BUSY=false;warn(e);toast("The practice studio could not open here: "+(e&&e.message||"the browser's store refused it")+" Nothing was changed.");return false;});}
/* ---------- leaving, and starting again ---------- */
function leave(){if(!ON||BUSY)return Promise.resolve(false);
  return ask({title:"Leave the practice studio?",text:"What was tried here is taken away, and Ingenium returns to the door it was opened from. Nothing of anyone's is touched.",yes:"Leave",no:"Stay"}).then(function(yes){
    if(!yes)return false;BUSY=true;snd("cards");W.__ingResetting=true;P.leave();setTimeout(function(){location.reload();},120);return true;});}
function again(){if(!ON||BUSY)return Promise.resolve(false);
  return ask({title:"Start the practice studio again?",text:"Its sample work comes back as it was, and what was tried here is taken away. Nothing of anyone's is touched.",yes:"Start again",no:"Keep it"}).then(function(yes){
    if(!yes)return false;BUSY=true;snd("cards");W.__ingResetting=true;var night=D.body.getAttribute("data-theme")==="night";
    P.clear();P.put("ingenium_v4",JSON.stringify(sample(night)));P.fresh();
    setTimeout(function(){location.reload();},120);return true;});}

/* ---------- the doors: only where no one is signed in ---------- */
function onLock(){var l=$("ingLockDoor");if(!l||l.hidden||$("ildPractice"))return;var f=l.querySelector("#ildSign");if(!f)return;
  var card=l.querySelector(".ild-card"),note=card&&[].filter.call(card.querySelectorAll(".ild-note"),function(n){return !n.closest("form");})[0];if(!note)return;
  var b=mk("button","ild-link","Open the practice studio");b.type="button";b.id="ildPractice";b.title="Ingenium with sample work, to show it or to try it. Nothing of anyone's is in it, and nothing stays.";
  b.addEventListener("click",function(e){e.preventDefault();enter();});note.appendChild(D.createTextNode(" "));note.appendChild(b);}
function onProf(){var d=$("profDoor");if(!d||d.hidden)return;var box=d.querySelector(".r331-door");if(!box||box.querySelector(".r350-door"))return;
  var w=mk("div","r350-door");w.appendChild(mk("p",null,"Showing Ingenium to someone? The practice studio has sample work to try. Nothing of anyone's is in it, and nothing stays."));
  var b=mk("button","r331-k");b.type="button";b.id="r350Open";b.appendChild(mark());b.appendChild(D.createTextNode("Open the practice studio"));
  b.addEventListener("click",function(e){e.preventDefault();e.stopPropagation();enter();});w.appendChild(b);box.appendChild(w);}
function doors(){try{onLock();}catch(e){warn(e);}try{onProf();}catch(e){warn(e);}}

/* ---------- inside: the top bar's key, Home's strip, the Status panel ---------- */
function pill(){if($("r350Pill"))return;var st=$("statusPill");if(!st||!st.parentNode)return;
  var k=mk("span","cl-key");k.id="r350Pill";k.setAttribute("role","button");k.tabIndex=0;k.title="The practice studio: sample work, to try every room. Nothing here is anyone's, and nothing stays. Press for Start again and Leave.";
  k.appendChild(mk("span","pdot"));k.appendChild(mk("span","r350-t","Practice studio"));
  function open(e){if(e){e.preventDefault();e.stopPropagation();}try{W.openPresenceMenu();}catch(x){}}
  k.addEventListener("click",open);k.addEventListener("keydown",function(e){if(e.key==="Enter"||e.key===" ")open(e);});
  st.parentNode.insertBefore(k,st);}
function strip(){var home=$("page-home");if(!home||home.querySelector(".r350-strip"))return;
  var s=mk("div","r350-strip");s.setAttribute("role","note");s.appendChild(mark());
  var w=mk("div","r350-words");w.appendChild(mk("h3",null,"Welcome to the practice studio"));
  w.appendChild(mk("p",null,"Sample conversations and a sample app's folder, so that you can try every room. Nothing here is anyone's own work, and it is all taken away when you leave."));s.appendChild(w);
  var ks=mk("div","r350-keys"),a=mk("button","r331-k","Start again"),l=mk("button","r331-k pri","Leave the practice studio");a.type=l.type="button";a.id="r350Again";l.id="r350Leave";
  a.addEventListener("click",function(){again();});l.addEventListener("click",function(){leave();});ks.appendChild(a);ks.appendChild(l);s.appendChild(ks);
  home.insertBefore(s,home.firstChild);}
/* the Status panel: in place of the profiles (no one is signed in here), the practice studio's own two rows */
function dress(menu){if(!menu||menu.querySelector(".r350-row"))return;
  [].forEach.call(menu.querySelectorAll(".r338-who,#r344Out"),function(n){n.remove();});
  [].forEach.call(menu.querySelectorAll(".pres-head"),function(h){if(h.textContent==="Who is using Ingenium"){var r=h.previousElementSibling;if(r&&r.classList.contains("pres-rule"))r.remove();h.remove();}});
  menu.appendChild(mk("div","pres-rule"));menu.appendChild(mk("div","pres-head","Practice studio"));
  menu.appendChild(mk("div","r350-say","Sample work, to try every room. Nothing here is anyone's own, and nothing stays."));
  function row(id,txt,fn){var b=mk("button","pres-row pres-opt r350-row");b.type="button";b.id=id;b.appendChild(id==="r350RowLeave"?mark():mk("span","pres-ico","\u21ba"));b.appendChild(mk("span","pres-name",txt));
    b.onclick=function(){try{W.closePresenceMenu();}catch(e){}fn();};menu.appendChild(b);}
  row("r350RowAgain","Start again",again);row("r350RowLeave","Leave the practice studio",leave);}
function wrapPanel(){var o=W.openPresenceMenu;if(typeof o!=="function"||o.__r350)return;
  W.openPresenceMenu=function(){var r=o.apply(this,arguments);try{dress(D.querySelector(".pres-menu"));}catch(e){warn(e);}return r;};W.openPresenceMenu.__r350=1;}
/* a sign-in is not offered here: the practice studio keeps nothing, so it has nothing to seal */
function noSetup(){var L=W.IngLock;if(!L||typeof L.setup!=="function"||L.setup.__r350)return;var o=L.setup;
  L.setup=function(){toast("The practice studio has no sign-in: nothing in it is kept. Leave it to sign in to your own profile.");return false;};L.setup.__r350=1;L.__setup350=o;}

/* ---------- start ---------- */
function corner(){var card=D.querySelector("#introDoor .intro-card");if(!card||card.querySelector(".r350-corner"))return;
  var c=mk("div","intro-corner intro-corner-l r350-corner"),chip=mk("span","seg intro-theme r350-chip");chip.setAttribute("role","note");
  chip.title="The practice studio: sample work, to show Ingenium or to try it. Nothing of anyone's is in it, and nothing stays.";
  chip.appendChild(mark());chip.appendChild(mk("span",null,"Practice studio"));c.appendChild(chip);card.appendChild(c);}
function secNote(){var c=$("secCard");if(!c||!c.parentNode)return;var prev=c.previousElementSibling;if(prev&&prev.classList&&prev.classList.contains("r350-sec"))return;
  var n=mk("p","r350-sec");n.appendChild(mark());n.appendChild(mk("span",null,"In the practice studio, this device's protection can be read but not changed, and there is no sign-in: nothing here is kept."));
  c.parentNode.insertBefore(n,c);}
function inside(){pill();strip();corner();secNote();wrapPanel();noSetup();seedFolder();}
function start(){
  if(!P)return;
  if(!ON){/* the computer app's leftover practice files, once its window was closed while the practice studio was open, or after Leave */
    if(P.appDue&&P.appDue())appDrop().then(function(){return ragDrop(60000);}).then(function(){try{P.appDone();}catch(e){}});
    doors();var T=0;try{new MutationObserver(function(){if(T)return;T=setTimeout(function(){T=0;doors();},120);}).observe(D.body,{childList:true,subtree:true,attributes:true,attributeFilter:["hidden","class"]});}catch(e){}
    return;}
  D.body.classList.add("r350-on");try{corner();}catch(e){}
  /* ended in another window (one opened afresh ends it there): this one stops writing and opens at the door too */
  function ended(){var r=null;try{r=X.reg();}catch(e){}if(r&&r.cur!=="practice"&&!BUSY){BUSY=true;W.__ingResetting=true;try{P.clear();}catch(e){}location.reload();}}
  try{W.addEventListener("storage",function(e){if(!e||e.key==null||e.key==="ingenium_profiles")ended();});}catch(e){}setInterval(ended,3000);
  (function wait(n){if(W.__ingReady===true&&W.state){inside();setInterval(function(){pill();strip();corner();secNote();},2000);
      var k=0;(function f(){seedFolder().then(function(ok){if(!ok&&W.state&&W.state.__practice&&!W.state.__practice.folders&&++k<40)setTimeout(f,750);});})();return;}
    if(n<480)setTimeout(function(){wait(n+1);},250);})(0);}
if(D.readyState==="loading")D.addEventListener("DOMContentLoaded",start);else start();
W.IngPractice={on:function(){return ON;},enter:enter,leave:leave,again:again,sample:sample};
})();
;try{window.__ingParts["p350"]="running";}catch(_){}
</script>
