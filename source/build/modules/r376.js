<style id="r376-css">
/* ============ R376 · THE GUIDED TOUR, STAGE 2: A TASK DONE ON EACH PAGE (Ingenium 7.78, 24 November 2026) ============
   Her words (24 November 2026): "I want live demonstrations added to the Guided Tour to showcase all of Ingenium's pages ...
   specifically curated to showcase each page being used to complete a specific task". 7.77 gave Chat its meal plan and Code its
   breathing app (r222). This module gives the next pages theirs, each played through the page's own drawing, so what she sees is
   the page as it is, and each leaving nothing behind when the tour ends:
   - Adamas: a page that splits a bill is written into the editor, line by line, and the preview runs it as it grows; then a
     request in plain words ("round each share up") is answered as a model's request is (its steps: read, changed, ran), and the
     page and its preview change. Her own page comes back when the tour ends. Where Adamas holds a large app or an app from Fabrica,
     the tour leaves it alone and says so on the card instead.
   - Concordia: Pass and refine, watched: the first model drafts a notice for a shared building's hallway, the second reads the
     draft and improves it, and the refined answer comes last, with what was changed. The run is the tour's own: it is drawn by
     Concordia's own answer view (r218), never kept among her blends, and labelled as an example.
   - Lector: the tour's breathing app is read in two parts, a note kept on each, and a guide for its users is written onto Lector's
     paper, section by section, with every fact read from the code; the pages are measured into sheets as Lector's own are (r108).
   - The Engine panel (r374): the top bar's card no longer says the Engine key opens Mentes (it has opened the panel since 7.77), and a
     card of its own opens the panel and points in turn to the state, the models, and Load and Unload. The tour changes nothing in it.
   What was hers (the page in Adamas, the question in Concordia) is kept in state.tour.r376 while the tour runs, so that even a tour
   left by closing the app gives it back the next time Ingenium starts. */
#l7Stream .r376-th .tag{background:var(--accent-soft,rgba(120,90,180,.14))}
#l7Stream .r376-th .body{white-space:pre-wrap}
</style>
<script>try{(window.__ingParts=window.__ingParts||{})["p376"]="started";}catch(_){}
/* R376 · the guided tour, stage 2: see the note at the top of its styles. window.IngTour376: {added(), clear()} */
(function r376(){"use strict";
if(window.IngTour376)return;
var W=window,D=document;
function $(id){return D.getElementById(id);}
function mk(tag,cls,txt){var e=D.createElement(tag);if(cls)e.className=cls;if(txt!=null)e.textContent=txt;return e;}
function touring(){return D.body.classList.contains("touring")||!!$("ingTour");}
function lively(){try{return typeof tourLively==="function"?tourLively():true;}catch(e){return true;}}
function goPage(p){try{W.go(p);}catch(e){}}
/* a page is opened only when it is not the one showing: opening it again scrolls it to its top a frame later (the base page's go) */
function onPage(p){var s=$("page-"+p);if(!(s&&s.classList.contains("active")))goPage(p);}
/* brought into view after that frame, and once more a moment later, so the page's own scroll to its top comes first */
function reveal(el,block){if(!el)return;var f=function(){try{el.scrollIntoView({block:block||"start",behavior:lively()?"smooth":"auto"});}catch(e){}};later(f,90);later(f,700);}
function later(fn,ms){try{return tourLater(fn,ms);}catch(e){return setTimeout(fn,ms);}}
function every(fn,ms){var iv=setInterval(function(){try{fn();}catch(e){clearInterval(iv);}},ms);try{tourTimers.push(iv);}catch(e){}return iv;}
function save(){try{saveState();}catch(e){}}
/* the demonstrations follow the clock, not the count of ticks: on a busy machine fewer steps are drawn, and each ends on time */
function play(total,ms,tick,end){if(!lively()||total<=0){tick(total);if(end)end();return;}var t0=Date.now(),last=-1;
  every(function(){var n=Math.min(total,Math.floor((Date.now()-t0)/ms)+1);if(n!==last){last=n;tick(n);}if(n>=total){if(end)end();throw 0;}},Math.max(16,Math.min(ms,60)));}
function typeInto(el,text,ms,end){play(text.length,ms,function(n){el.value=text.slice(0,n);},end);}
function words(text){return text.split(/(\s+)/);}
/* what was hers, kept while the tour shows its own */
function bk(){state.tour=state.tour||{};return state.tour.r376||(state.tour.r376={});}
function had(){return !!(state.tour&&state.tour.r376&&Object.keys(state.tour.r376).length);}

/* ================= 1. Adamas: a page written and run, then changed at a request ================= */
var APP1=['<!doctype html>','<html lang="en">','<head>','<meta charset="utf-8">','<title>Split the bill</title>','<style>',
  '  body{margin:0;min-height:100vh;display:grid;place-items:center;font-family:system-ui,sans-serif;color:#2c2540;background:linear-gradient(160deg,#efe7fb,#e4eefa)}',
  '  .card{width:280px;padding:24px 28px;border-radius:18px;background:#fff;box-shadow:0 14px 34px rgba(80,60,130,.18)}',
  '  h1{margin:0 0 12px;font:600 20px/1.2 Georgia,serif}',
  '  label{display:flex;justify-content:space-between;align-items:center;margin:10px 0;font-size:14px}',
  '  input{width:110px;padding:7px 9px;border:1px solid #d6cdea;border-radius:9px;font:inherit;text-align:right}',
  '  .each{margin-top:16px;padding-top:14px;border-top:1px solid #eee6f7;font-size:15px}',
  '  .each b{display:block;margin-top:4px;font-size:30px;color:#5b3fa0}',
  '</style>','</head>','<body>','<div class="card">','  <h1>Split the bill</h1>',
  '  <label>Bill (£) <input id="bill" type="number" value="64.80" step="0.01"></label>',
  '  <label>Tip (%) <input id="tip" type="number" value="12.5" step="0.5"></label>',
  '  <label>People <input id="people" type="number" value="3" min="1"></label>',
  '  <div class="each">Each person pays <b id="share">£0.00</b></div>','</div>','<script>',
  '  function update(){',
  '    var bill=+document.getElementById("bill").value||0;',
  '    var tip=+document.getElementById("tip").value||0;',
  '    var people=Math.max(1,+document.getElementById("people").value||1);',
  '    var share=bill*(1+tip/100)/people;',
  '    document.getElementById("share").textContent="£"+share.toFixed(2);',
  '  }',
  '  document.querySelectorAll("input").forEach(function(i){i.oninput=update;});',
  '  update();','<\/script>','</body>','</html>'];
/* the change asked for: a switch under People, on at first, and the share rounded up while it is on */
var ROUND_ROW='  <label>Round up <input id="round" type="checkbox" checked style="width:auto"></label>';
var ROUND_JS='    if(document.getElementById("round").checked)share=Math.ceil(share);';
function app2Lines(){var L=APP1.slice(),a=L.indexOf('  <label>People <input id="people" type="number" value="3" min="1"></label>');L.splice(a+1,0,ROUND_ROW);
  var b=L.indexOf('    var share=bill*(1+tip/100)/people;');L.splice(b+1,0,ROUND_JS);return {lines:L,row:a+2,js:b+2};}
var ASK_Q="Add a switch that rounds each share up to the next whole pound.";
var ASK_A="Done. A **Round up** switch now sits under People, on at first. While it is on, each share is rounded up to the next whole pound, so £24.30 becomes £25.00; turned off, the exact share shows again.";
function adamasFree(){try{if(W.IngBuild&&typeof IngBuild.large==="function"&&IngBuild.large())return false;}catch(e){}
  var d=state.buildDoc;if(d&&d.repo)return false;return !!$("codeEditor");}
function edSet(t){var ce=$("codeEditor");if(!ce)return;ce.value=t;try{ce.dispatchEvent(new Event("input",{bubbles:true}));}catch(e){}}
function stage(t){var f=$("previewFrame");if(!f)return;try{f.srcdoc=ingStageDoc(t);var fw=$("frameWrap");if(fw)fw.setAttribute("data-lived","1");}catch(e){}}
function keepBuild(){var b=bk();if(b.build===undefined){var ce=$("codeEditor");b.build=ce?ce.value:String(state.build||"");save();}
  var s=$("agBuild");if(s&&b.agIn===undefined){var i=s.querySelector(".agb-in");b.agIn=i?i.value:"";}}
function putBuild(){var b=state.tour&&state.tour.r376;if(!b)return false;var did=false;
  if(b.build!==undefined){var t=b.build;delete b.build;edSet(t);state.build=t;try{runBuild();}catch(e){}did=true;}
  var s=$("agBuild");if(s){var o=s.querySelector(".agb-out");if(o&&o.querySelector(".r376-ask"))o.innerHTML="";var i=s.querySelector(".agb-in");if(i&&b.agIn!==undefined)i.value=b.agIn;}
  delete b.agIn;return did;}
/* while the tour types, Run as I type is held off (its box only, not saved): a half-written script is never run; the tour runs the
   page itself where it is whole (its look, its words, the end) */
var autoWas=null;function holdAuto(){var a=$("autoRun");if(a&&autoWas===null){autoWas=a.checked;a.checked=false;}}
function freeAuto(){var a=$("autoRun");if(a&&autoWas!==null)a.checked=autoWas;autoWas=null;}
function toEditor(){reveal($("buildGrid"),"start");}
function demoAdamas(){onPage("build");if(!adamasFree())return;keepBuild();toEditor();
  var L=APP1,shown=0,marks=[L.indexOf("</style>")+1,L.indexOf("</div>")+1];holdAuto();edSet("");stage("");
  play(L.length,85,function(n){var t=L.slice(0,n).join("\n");edSet(t);
    /* the preview runs as the page grows: once its look is written, once its words are, and at the end */
    while(shown<marks.length&&n>=marks[shown]){stage(t);shown++;}},function(){freeAuto();try{runBuild();}catch(e){}});}
function demoAdamasAsk(){onPage("build");if(!adamasFree())return;keepBuild();var s=$("agBuild");
  var one=APP1.join("\n");edSet(one);try{runBuild();}catch(e){}
  if(!s)return;reveal(s,"center");
  var inp=s.querySelector(".agb-in"),out=s.querySelector(".agb-out"),live=lively();if(!inp||!out)return;
  out.innerHTML="";inp.value="";
  typeInto(inp,ASK_Q,28,function(){later(function(){inp.value="";var two=app2Lines(),wrap=mk("div","r376-ask"),ul=mk("ul","ag-steps"),reply=mk("div","agb-reply");wrap.appendChild(ul);wrap.appendChild(reply);out.innerHTML="";out.appendChild(wrap);
    var steps=[["¶","Read page.html, lines 1–"+APP1.length],["✎","Changed page.html at line "+two.row],["✎","Changed page.html at line "+two.js],["▶","Ran the app · no errors"]],i=0;
    play(steps.length,700,function(n){while(i<n){var li=mk("li");li.appendChild(mk("span","ag-i",steps[i][0]));li.appendChild(D.createTextNode(steps[i][1]));ul.appendChild(li);
        if(i===2){edSet(two.lines.join("\n"));try{runBuild();}catch(e){}}i++;}},
      function(){later(function(){try{reply.innerHTML=chatMd(ASK_A);}catch(e){reply.textContent=ASK_A.replace(/\*\*/g,"");}},live?700:1);});},live?500:1);});}

/* ================= 2. Concordia: Pass and refine, watched ================= */
var BL_Q="Write a short notice for the hallway of a shared building, asking neighbours to keep the stairwell clear of bicycles and boxes, because it is the way out in a fire.";
var BL_A1="**Please keep the stairwell clear**\n\nBicycles and boxes have been left on the stairs. The stairwell is our way out in a fire, so please keep them somewhere else.\n\nThank you.";
var BL_A2="**Please keep the stairwell clear**\n\nThe stairwell is everyone's way out in a fire. A bicycle or a box on the steps can trip someone hurrying down in the dark or in smoke.\n\nPlease keep bicycles and boxes in your own flat or storage space, not on the stairs or the landings.\n\nThank you for helping to keep all of us safe.\n\n*Your neighbours*";
var BL_CHANGED="the reason first, what to do instead, and a kinder close";
var BL_NOTE="An example played by the guided tour: no model ran, and it is not kept among your blends.";
function blendNow(){onPage("blend");try{if(W.IngRooms){IngRooms.open("blend","new");IngRooms.step(3);}}catch(e){}}
function draw(r){try{blShow(r);}catch(e){return;}var h=D.querySelector("#blendOut .bl-head");if(h&&!h.querySelector(".r376-ex")){var p=mk("div","small muted r376-ex",BL_NOTE);h.appendChild(p);}}
function stream(st,full,r,done){var w=words(full),t0=Date.now();st.state="writing";
  play(w.length,28,function(n){st.text=w.slice(0,n).join("");draw(r);},function(){st.state="done";st.ms=Date.now()-t0+900;draw(r);done();});}
function demoBlend(){blendNow();var ta=$("blendTask"),b=bk();if(ta&&b.blend===undefined){b.blend=ta.value;save();}
  var live=lively();if(ta)ta.value="";
  function answers(){var now=Date.now(),r={v:2,id:"b-tour-376",at:now,task:BL_Q,strategy:"refine",chose:"",eff:{lv:2},effSet:2,writer:"t2",writerName:"Magister",weights:{},status:"running",
      notes:[],steps:[],parts:[{pid:"t1",name:"Velox",kind:"local",color:"#a08ad8"},{pid:"t2",name:"Magister",kind:"local",color:"#6a4caf"}],__tour:true};
    var s1={id:1,k:"answer",pid:"t1",name:"Velox",kind:"local",color:"#a08ad8",state:"loading",text:""},s2={id:2,k:"draft",pid:"t2",name:"Magister",kind:"local",color:"#6a4caf",state:"waiting",text:""};
    r.steps=[s1,s2];draw(r);reveal($("blendOut"),"center");
    later(function(){stream(s1,BL_A1,r,function(){s2.state="loading";draw(r);
      later(function(){stream(s2,BL_A2,r,function(){s2.changed=BL_CHANGED;r.account=[{k:"changed",t:"Magister: "+BL_CHANGED,from:"refine"}];
        r.final={text:BL_A2,by:"Magister",pid:"t2",step:2};r.status="done";r.done=Date.now();draw(r);});},live?700:1);});},live?600:1);}
  if(ta)typeInto(ta,BL_Q,18,function(){later(answers,live?400:1);});else answers();}
function putBlend(){var b=state.tour&&state.tour.r376;var o=$("blendOut");
  if(o&&o.getAttribute("data-run")==="b-tour-376"){try{var bs=blState();blShow((bs.runs||[])[0]||null);}catch(e){o.innerHTML="";}}
  if(b&&b.blend!==undefined){var ta=$("blendTask");if(ta)ta.value=b.blend;delete b.blend;}}

/* ================= 3. Lector: a guide for the breathing app's users, read from its code ================= */
var LX_NOTES=[["Part 1 of 2 · the page and its look (lines 1 to 21)","One HTML page, its styles inside it. A circle 120 pixels across, in a violet gradient, stands in the middle of a pale lilac page, with a word inside it and a key under it. Its size changes by a transition, not by drawing."],
  ["Part 2 of 2 · the script (lines 22 to 31)","Two functions take turns: breatheIn grows the circle to 1.9 times its size over 4 seconds and says Breathe in; breatheOut brings it back over 6 seconds and says Breathe out; each starts the other by a timer. The key starts and pauses them, and shows Paused when stopped. A timer presses Start 600 milliseconds after the page opens."]];
var LX_DOC="# Breathe · A guide for its users\n\n## What it does\n\nBreathe is a one-page app that paces slow breathing. A circle in the middle of the page grows while you breathe in and shrinks while you breathe out, and the word inside it says which: Breathe in, or Breathe out.\n\n## The pace\n\nEach breath in lasts four seconds and each breath out six, so one full breath takes ten seconds: six breaths a minute. As you breathe in, the circle grows to nearly twice its size; as you breathe out, it returns to its first size.\n\n## Starting and pausing\n\nThe key under the circle starts the breathing and pauses it. The app starts by itself a moment after it opens, so the first breath can be followed at once. When it is paused, the word reads Paused and no new breath begins; Start begins again with a breath in.\n\n## What it needs\n\nBreathe is a single page with nothing fetched from outside it, so it works offline in a current web browser, and it keeps nothing about you.\n\n---\n\n*Written by Lector from the app's own code, for the guided tour: every fact above is read from the page.*";
var LX_META={apps:[],name:"Breathe",label:"A guide for its users",forText:""};
function lectorOk(){return !!($("l7Desk")&&W.IngLector&&typeof IngLector.paper==="function");}
function lxPaint(md,live){var desk=$("l7Desk");if(!desk)return;var html="";try{html=IngLector.paper("dossier",md,LX_META);}catch(e){return;}
  desk.innerHTML=html;desk.setAttribute("data-r376","1");
  /* the tour wrote it, not she: no byline */[].forEach.call(desk.querySelectorAll(".cv .by"),function(x){x.remove();});if(live){var pp=desk.querySelector(".l-paper");if(pp){var c=mk("span","l-caret");var last=pp.lastElementChild||pp;last.appendChild(c);}desk.scrollTop=desk.scrollHeight;}
  else{try{if(W.IngLectorPaper&&IngLectorPaper.marks)IngLectorPaper.marks();}catch(e){}desk.scrollTop=0;}}
function lxNote(st,head,text,liveNow){var c=mk("div","l-th open r376-th"),w=mk("div","where");w.appendChild(mk("span","tag"+(liveNow?" live":""),liveNow?"Writing now":"Note"));w.appendChild(mk("span","lbl",head));c.appendChild(w);
  var b=mk("div","body",text);c.appendChild(b);st.appendChild(c);st.scrollTop=st.scrollHeight;return b;}
function demoLector(){onPage("lector");if(!lectorOk())return;var st=$("l7Stream"),live=lively();
  try{if(IngLector.midTab)IngLector.midTab("rd");}catch(e){}
  reveal($("l7Desk"),"center");
  if(st){[].forEach.call(st.querySelectorAll(".r376-th"),function(x){x.remove();});var em=st.querySelector(".l-empty");if(em)em.remove();}
  lxPaint("# Breathe",false);
  var ni=0;
  function nextNote(){if(ni>=LX_NOTES.length){write();return;}var n=LX_NOTES[ni++];if(!st){nextNote();return;}var body=lxNote(st,n[0],"",true),w=words(n[1]);
    play(w.length,24,function(k){body.textContent=w.slice(0,k).join("");st.scrollTop=st.scrollHeight;},
      function(){var tag=body.parentNode.querySelector(".tag");if(tag){tag.textContent="Note";tag.classList.remove("live");}later(nextNote,live?300:1);});}
  function write(){var w=words(LX_DOC);play(w.length,14,function(k){lxPaint(w.slice(0,k).join(""),true);},function(){lxPaint(LX_DOC,false);});}
  later(nextNote,live?400:1);}
function putLector(){var st=$("l7Stream");if(st)[].forEach.call(st.querySelectorAll(".r376-th"),function(x){x.remove();});
  var d=$("l7Desk");if(d&&d.getAttribute("data-r376")){d.removeAttribute("data-r376");try{IngLector.render();}catch(e){}}}

/* ================= 4. the Engine panel ================= */
function engineOpen(){try{if(W.IngEnginePanel)IngEnginePanel.open();}catch(e){}}
function engineClose(){try{if(W.IngEnginePanel&&IngEnginePanel.isOpen())IngEnginePanel.close();}catch(e){}}
function demoEngine(){engineOpen();var live=lively(),seq=["#ingEngine .ie-st","#ingEngine .ie-list","#ingEngine .ie-keys"],i=0;
  function ringOne(){if(i>=seq.length)return;var q=seq[i++];try{tourRing(q,6);}catch(e){}parkSoon();if(i<seq.length)later(ringOne,live?2600:20);}
  later(ringOne,live?900:20);}

/* ================= 5. the cards ================= */
var NEWSOME=["new","some"];
var S={
  adamas1:{r376:1,r376at:"left",chap:"Making things",sub:"Adamas",go:function(){onPage("build");toEditor();},ring:"#buildGrid",demo:"r376Adamas",
    t:"💎 Adamas: a page, written and running",
    b:"Adamas makes small apps and web pages: write the code yourself, or ask a model to write or change it, and the preview beside it runs the page as it is written. Watch: the tour writes a small page that splits a bill between friends, and the preview runs it as it grows. Your own page comes back when the tour ends.",
    tip:"Run as I type keeps the preview in step with every line."},
  adamas2:{r376:1,levels:NEWSOME,chap:"Making things",go:function(){onPage("build");reveal($("agBuild"),"center");},ring:"#agBuild",demo:"r376AdamasAsk",
    t:"🛠️ Asking for a change",
    b:"Ask a model to change this page takes a request in plain words. The model reads the page, makes the change, runs the app and says what it did; Step by step with me shows each change first and waits for your yes. Watch: the tour asks for a switch that rounds each share up, and the page and its preview change."},
  blend3:{r376:1,r376at:"left",levels:NEWSOME,chap:"Making things",go:blendNow,ring:"#blendOut",demo:"r376Blend",
    t:"🤝 A blend, watched",
    b:"Watch Pass and refine at work: the question is written once; the first model drafts a notice for a shared building's hallway, the second reads that draft and improves it, and the refined answer comes last, with what was changed. From there it can go to a conversation, be copied, or be saved as a Word file. This example is the tour's own and is not kept among your blends."},
  lector2:{r376:1,levels:NEWSOME,chap:"Lector",go:function(){onPage("lector");},ring:"#l7Desk",demo:"r376Lector",
    t:"📄 A document, read and written",
    b:"Watch: Lector reads a small breathing app in two parts and keeps a note on each, then writes a guide for the app's users onto real pages, section by section, every fact taken from the code. With your own apps, choose them in the brief and press Start reading. The tour's guide is gone when the tour ends."},
  engine:{r376:1,r376e:1,r376at:"left",chap:"The top bar",go:function(){goPage("home");engineOpen();},ring:"#ingEngine",demo:"r376Engine",
    t:"⚙️ The Engine panel",
    b:"The Engine key opens the engine's own panel: the one model every page writes with, chosen from the models ready on this device or lent by your other computers. Its state and gauge show whether it is running and how much of this device's memory its file takes; Load and Unload are here, with the model's Reply, Memory and Effort, which stay the same in every place. The tour only points: it changes nothing here.",
    tip:"Unload frees the memory a model holds when you need it for something else; Load brings the same model back."}};
var RUNNING_B="These show the engine, the part that runs models, and who answers. A green dot means ready. The Engine key opens the engine's panel, shown next; the second key lets you choose who answers, a model on this device or a service you connected, from any page.";

function bare(t){return String(t||"").replace(/^[^A-Za-z]+/,"").trim();}
function idx(fn){for(var i=0;i<ING_TOUR.length;i++)if(fn(ING_TOUR[i]))return i;return -1;}
function insertAfter(i,steps){if(i<0||!steps.length)return false;Array.prototype.splice.apply(ING_TOUR,[i+1,0].concat(steps));return true;}
function lastOf(chap){var k=-1;ING_TOUR.forEach(function(s,i){if(s.chap===chap)k=i;});return k;}
function apply(){if(touring()||!Array.isArray(W.ING_TOUR))return;var did=false;
  /* Adamas: its card becomes the first demonstration, and the request follows it */
  if(!ING_TOUR.some(function(s){return s===S.adamas1;})&&$("page-build")){var a=idx(function(s){return s.chap==="Making things"&&s.sub==="Adamas";});
    if(a>=0){ING_TOUR.splice(a,1,S.adamas1);insertAfter(a,[S.adamas2]);did=true;}}
  /* Concordia: after Ways to blend (or its own card) */
  if(ING_TOUR.indexOf(S.blend3)<0&&$("page-blend")&&typeof W.blShow==="function"){var w=idx(function(s){return s.chap==="Making things"&&/^Ways to blend/.test(bare(s.t));});
    if(w<0)w=idx(function(s){return s.chap==="Making things"&&s.sub==="Concordia";});if(w>=0)did=insertAfter(w,[S.blend3])||did;}
  /* Lector: after its first card, where this copy has Lector */
  if(ING_TOUR.indexOf(S.lector2)<0&&$("page-lector")&&W.IngLector){var l=idx(function(s){return s.chap==="Lector"&&s.sub==="The brief";});if(l>=0)did=insertAfter(l,[S.lector2])||did;}
  /* the top bar: the Engine key opens its panel (r374), no longer Mentes */
  if(ING_TOUR.indexOf(S.engine)<0&&W.IngEnginePanel){var e=idx(function(s){return s.chap==="The top bar"&&/^What is running/.test(bare(s.t));});
    if(e>=0){if(/opens the Mentes page/.test(String(ING_TOUR[e].b)))ING_TOUR[e].b=RUNNING_B;did=insertAfter(e,[S.engine])||did;}}
  if(did)try{tourPaintEntry();}catch(e){}}

/* ================= 6. where the tour's card stands on these cards ================= */
/* Where what is shown fills the middle (Adamas's code and preview, Concordia's answers, the Engine panel at the right), the card stands
   at the foot of the window on the left, as if moved there: the base tour, r367 and a drag all respect a card that was moved. A card
   she moves herself stays where she puts it. */
function park(){var s=null;try{s=ING_TOUR[tourI];}catch(e){}if(!s||!s.r376at)return;var ov=$("ingTour"),card=ov&&ov.querySelector(".tour-card");if(!card)return;
  if(card.__r376own)return;
  if(!card.__r376w){card.__r376w=1;card.addEventListener("pointerdown",function(e){if(!e.target.closest("button,a,input,select,textarea"))card.__r376own=1;});}
  var main=D.querySelector("main.main")||D.querySelector(".main"),mr=main?main.getBoundingClientRect():null;
  card.style.transform="";var r=card.getBoundingClientRect();if(!r.width)return;
  var x=Math.round(Math.max(16,(mr?mr.left:0)+16)-r.left),y=Math.round((innerHeight-18-r.height)-r.top);
  card.style.transform="translate("+x+"px,"+y+"px)";try{tourDrag.x=x;tourDrag.y=y;}catch(e){}}
function parkSoon(){[60,400,1200,2200].forEach(function(ms){later(park,ms);});}

/* ================= 7. the demonstrations, run and cleared through the tour's own ================= */
var RUN={r376Adamas:demoAdamas,r376AdamasAsk:demoAdamasAsk,r376Blend:demoBlend,r376Lector:demoLector,r376Engine:demoEngine};
(function wrapDemo(){var o=W.tourDemoRun;if(typeof o!=="function"||o.__r376)return;
  var n=function(name){if(RUN[name]){try{RUN[name]();}catch(e){try{console.warn("Ingenium tour:",e);}catch(_){}}return;}return o.apply(this,arguments);};n.__r376=1;W.tourDemoRun=tourDemoRun=n;})();
function clearAll(){var any=false;freeAuto();try{if(putBuild())any=true;}catch(e){}try{putBlend();}catch(e){}try{putLector();}catch(e){}engineClose();
  try{if(state.tour&&state.tour.r376){delete state.tour.r376;any=true;}}catch(e){}if(any)save();}
(function wrapClear(){var o=W.tourDemoClear;if(typeof o!=="function"||o.__r376)return;
  var n=function(){var r=o.apply(this,arguments);clearAll();return r;};n.__r376=1;W.tourDemoClear=tourDemoClear=n;})();
/* the Engine panel is open only on its own card */
(function wrapRender(){var o=W.tourRender;if(typeof o!=="function"||o.__r376)return;
  var n=function(){try{var s=ING_TOUR[tourI];if(!(s&&s.r376e))engineClose();}catch(e){}var r=o.apply(this,arguments);try{if(ING_TOUR[tourI]&&ING_TOUR[tourI].r376at)parkSoon();}catch(e){}return r;};
  try{Object.keys(o).forEach(function(k){n[k]=o[k];});}catch(e){}n.__r376=1;W.tourRender=tourRender=n;})();

/* ================= 8. start ================= */
function leftovers(){if(touring()||!had())return;clearAll();}
function boot(){try{leftovers();}catch(e){}try{apply();}catch(e){try{console.warn("Ingenium tour (r376):",e);}catch(_){}}}
if(D.readyState==="loading")D.addEventListener("DOMContentLoaded",boot);else boot();
(function wait(){var n=0;(function w(){if(W.__ingReady===true){boot();setTimeout(boot,2500);setTimeout(boot,6000);return;}if(++n<400)setTimeout(w,500);})();})();
(function wrapGo(){var og=W.go;if(typeof og!=="function"||og.__r376)return;
  var ng=function(p){var r=og.apply(this,arguments);try{if(!touring())apply();}catch(e){}return r;};
  try{Object.keys(og).forEach(function(k){ng[k]=og[k];});}catch(e){}ng.__r376=true;W.go=go=ng;})();
W.IngTour376={added:function(){return (W.ING_TOUR||[]).filter(function(s){return s.r376;}).map(function(s){return s.chap+": "+bare(s.t);});},clear:clearAll};
})();
;try{window.__ingParts["p376"]="running";}catch(_){}
</script>
