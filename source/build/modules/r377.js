<style id="r377-css">
/* ============ R377 · THE GUIDED TOUR, STAGE 3: INGENIA, FABRICA AND VOCATIO (Ingenium 7.79, 25 November 2026) ============
   Her request (24 November 2026): "I want live demonstrations added to the Guided Tour to showcase all of Ingenium's pages ...
   specifically curated to showcase each page being used to complete a specific task". 7.77 gave Chat and Code theirs (r222), 7.78
   Adamas, Concordia, Lector and the Engine panel (r376). This module gives the last three pages theirs, following the small breathing
   app the tour builds in Code from one page to the next:
   - Ingenia: the app gets a folder of its own, with its conversation in it; Bring it up to date is played as Ingenia does it (its
     status line while reading, then Where we left off, the decisions, what is open next, and a way of working seen in her own words,
     for her to keep or drop). Played, not run: no model is asked, and the card says so.
   - Fabrica: a real repository of the tour's own, with two real versions of the app kept (each with its build number and a small
     self-test), chosen in Your apps, its tree drawn; then Fabrica's own Test is pressed and runs its five real checks on the second
     version. The repository is removed when the tour ends.
   - Vocatio: an example posting is brought in through Vocatio's own way (its title, who offers it and its closing date read from the
     text), and kept in Applications with its stage and the days left. No model reads it against her profile: that waits for her own
     press, on her own postings. The tour's application is removed when the tour ends.
   Each card is added only where its page is in this copy (the gift and the demo editions have no Fabrica and no Vocatio). What was
   hers (the folder she had open, the app chosen in Fabrica, the room open in Vocatio) is kept in state.tour.r377 while the tour runs
   and put back when it ends, or the next time Ingenium starts if the tour was left by closing the app. */
</style>
<script>try{(window.__ingParts=window.__ingParts||{})["p377"]="started";}catch(_){}
/* R377 · the guided tour, stage 3: see the note at the top of its styles. window.IngTour377: {added(), clear()} */
(function r377(){"use strict";
if(window.IngTour377)return;
var W=window,D=document;
function $(id){return D.getElementById(id);}
function touring(){return D.body.classList.contains("touring")||!!$("ingTour");}
function lively(){try{return typeof tourLively==="function"?tourLively():true;}catch(e){return true;}}
function goPage(p){try{W.go(p);}catch(e){}}
function onPage(p){var s=$("page-"+p);if(!(s&&s.classList.contains("active")))goPage(p);}
function later(fn,ms){try{return tourLater(fn,ms);}catch(e){return setTimeout(fn,ms);}}
function every(fn,ms){var iv=setInterval(function(){try{fn();}catch(e){clearInterval(iv);}},ms);try{tourTimers.push(iv);}catch(e){}return iv;}
function save(){try{saveState();}catch(e){}}
function play(total,ms,tick,end){if(!lively()||total<=0){tick(total);if(end)end();return;}var t0=Date.now(),last=-1;
  every(function(){var n=Math.min(total,Math.floor((Date.now()-t0)/ms)+1);if(n!==last){last=n;tick(n);}if(n>=total){if(end)end();throw 0;}},Math.max(16,Math.min(ms,60)));}
function reveal(el,block){if(!el)return;var f=function(){try{el.scrollIntoView({block:block||"start",behavior:lively()?"smooth":"auto"});}catch(e){}};later(f,90);later(f,700);}
function bk(){state.tour=state.tour||{};return state.tour.r377||(state.tour.r377={});}
function had(){return !!(state.tour&&state.tour.r377&&Object.keys(state.tour.r377).length);}
function words(t){return String(t).split(/(\s+)/);}

/* the breathing app, as the tour's Code chapter wrote it (r222), in two versions; each carries its build number and a self-test that
   Fabrica's test reads (modules/r111.js: the meta ingenium-build, and a console line with INGENIUM_SELFTEST) */
function appPage(build,count){return ['<!doctype html>','<html lang="en">','<head>','<meta charset="utf-8">','<meta name="viewport" content="width=device-width, initial-scale=1">',
  '<meta name="ingenium-build" content="'+build+'">','<title>Breathe</title>','<style>',
  'body{margin:0;min-height:100vh;display:grid;place-items:center;background:linear-gradient(180deg,#f4f0f8,#e9e2f2);font-family:Georgia,serif;color:#3b2a5c}',
  '.wrap{display:grid;justify-items:center;gap:22px}',
  '.circle{width:120px;height:120px;border-radius:50%;display:grid;place-items:center;background:radial-gradient(circle at 35% 30%,#fff,#c9b6ee 55%,#8d66d6);box-shadow:0 10px 30px rgba(93,55,161,.35);transition:transform 4s ease-in-out}',
  'button{font:600 15px/1 system-ui,sans-serif;padding:11px 22px;border-radius:999px;border:1px solid #4b2a86;color:#fff;cursor:pointer;background:linear-gradient(180deg,#7348be,#5d37a1)}',
  '</style>','</head>','<body>','<div class="wrap">','  <div class="circle" id="c"><span id="w">Ready</span></div>','  <button id="go" type="button">Start</button>'].concat(count?['  <p id="n" aria-live="polite">Breaths: 0</p>']:[]).concat([
  '</div>','<script>','var c=document.getElementById("c"),w=document.getElementById("w"),go=document.getElementById("go"),on=false,t=0'+(count?',n=0':'')+';',
  'function breatheIn(){if(!on)return;w.textContent="Breathe in";c.style.transitionDuration="4s";c.style.transform="scale(1.9)";t=setTimeout(breatheOut,4000);}',
  'function breatheOut(){if(!on)return;w.textContent="Breathe out";c.style.transitionDuration="6s";c.style.transform="scale(1)";t=setTimeout(function(){'+(count?'n++;document.getElementById("n").textContent="Breaths: "+n;':'')+'breatheIn();},6000);}',
  'go.onclick=function(){on=!on;go.textContent=on?"Pause":"Start";if(on)breatheIn();else{clearTimeout(t);w.textContent="Paused";}};',
  '/* its own check, read by Fabrica\'s test */',
  'console.log("INGENIUM_SELFTEST "+(c&&w&&go'+(count?'&&document.getElementById("n")':'')+'?"PASS: the circle, its word and its key are there":"FAIL: a part is missing"));',
  '<\/script>','</body>','</html>']).join("\n");}

/* ================= 1. Ingenia: a folder, brought up to date ================= */
var FOLD_ID="pj-tour-breathe",FOLD_CHAT="c-tour-fold";
var FOLD_MSGS=[["me","Build me a small breathing app: a circle that grows as I breathe in for four seconds and shrinks as I breathe out for six, with the words in the middle and a key to start and pause."],
  ["bot","I will build it as one page: the circle and its words, the timing of each breath, and the key. It is ready: breathe with the circle, in as it grows for four seconds, out as it shrinks for six. Pause stops it where it is."],
  ["me","Keep it to one page with nothing fetched from outside, so it works offline. Next, I would like it to count the breaths."],
  ["bot","Agreed: it stays one page, with nothing fetched from outside. A count of the breaths is a good next step; it can sit under the key, and be read out by a screen reader as it changes."]];
var FOLD_BRIEF="Breathe is a one-page app that paces slow breathing: a circle grows for four seconds as you breathe in and shrinks for six as you breathe out, with the word in the middle and a key to start and pause. The page is written and runs. Next, it is to count the breaths.";
var FOLD_DEC=["One page, with nothing fetched from outside, so it works offline (asked in the conversation).","In for four seconds, out for six (the first request)."];
var FOLD_OPEN=["Count the breaths under the key, read out as it changes."];
var FOLD_HOW=["Keep it to one page with nothing fetched from outside, so it works offline."];
function F(){var s=state;if(!s.folders||typeof s.folders!=="object")s.folders={how:"",ui:{}};if(!s.folders.ui)s.folders.ui={};return s.folders;}
function foldersOk(){return !!($("page-folders")&&W.IngFolders&&typeof IngFolders.paint==="function");}
function folder(){state.projects=state.projects||[];var p=state.projects.filter(function(x){return x.id===FOLD_ID;})[0];var now=Date.now();
  if(!p){p={id:FOLD_ID,name:"Breathe",instructions:"",files:[],kind:"app",__tour:true,app:{words:["Breathe","breathing app"],how:"",brief:"",briefAt:0,model:"",read:{},decisions:[],open:[],sugg:[],made:now}};state.projects.push(p);}
  else{p.app.brief="";p.app.briefAt=0;p.app.read={};p.app.decisions=[];p.app.open=[];p.app.sugg=[];}
  state.chats=state.chats||[];var c=state.chats.filter(function(x){return x.id===FOLD_CHAT;})[0];
  if(!c){c={id:FOLD_CHAT,title:"Building Breathe",projectId:FOLD_ID,__tour:true,made:now,messages:FOLD_MSGS.map(function(m,i){return {role:m[0],text:m[1],at:now-60000*(4-i)};})};state.chats.push(c);}
  return p;}
function paintFolders(){try{IngFolders.paint();}catch(e){}}
function demoFolder(){onPage("folders");if(!foldersOk())return;var b=bk(),G=F();if(b.fold===undefined){b.fold=G.ui.open||null;save();}
  var p=folder(),live=lively(),RUN=IngFolders.run||{};G.ui.open=p.id;paintFolders();reveal($("fldBody")||$("page-folders"),"start");
  later(function(){RUN.busy=true;RUN.of=p.id;RUN.what="Reading 1 conversation… (the tour's example: no model is asked)";paintFolders();
    later(function(){var w=words(FOLD_BRIEF),step=6;
      play(Math.ceil(w.length/step),150,function(n){p.app.brief=w.slice(0,n*step).join("");paintFolders();},function(){
        p.app.decisions=FOLD_DEC.slice();p.app.open=FOLD_OPEN.slice();p.app.sugg=FOLD_HOW.slice();p.app.briefAt=Date.now();p.app.model="";
        var c=(state.chats||[]).filter(function(x){return x.id===FOLD_CHAT;})[0];if(c)p.app.read[c.id]=c.made;
        RUN.busy=false;RUN.what="";paintFolders();});},live?1400:1);},live?900:1);}
function putFolder(){var b=state.tour&&state.tour.r377;try{var RUN=W.IngFolders&&IngFolders.run;if(RUN&&RUN.of===FOLD_ID){RUN.busy=false;RUN.what="";RUN.of=null;}}catch(e){}
  var any=false;if(state.projects&&state.projects.some(function(p){return p.id===FOLD_ID;})){state.projects=state.projects.filter(function(p){return p.id!==FOLD_ID;});any=true;}
  if(state.chats&&state.chats.some(function(c){return c.id===FOLD_CHAT;})){state.chats=state.chats.filter(function(c){return c.id!==FOLD_CHAT;});any=true;}
  var G=F();if(b&&b.fold!==undefined){G.ui.open=b.fold;delete b.fold;any=true;}else if(G.ui.open===FOLD_ID){G.ui.open=null;any=true;}
  if(any)paintFolders();return any;}

/* ================= 2. Fabrica: two versions kept, and its own test ================= */
function fabOk(){return !!($("page-fabrica")&&W.IngRepo&&W.fbHubHost&&typeof fbHubHost.refresh==="function");}
function fabPaint(){try{return fbHubHost.refresh().then(function(){try{fbHubHost.paint();}catch(e){}});}catch(e){return Promise.resolve();}}
function demoFabrica(){onPage("fabrica");if(!fabOk())return;var b=bk(),H=fbHubHost,live=lively();if(b.fabSel===undefined){b.fabSel=H.FBS().sel||null;save();}
  var made=b.fabRepo?Promise.resolve(b.fabRepo).then(function(id){return IngRepo.info(id).then(function(){return id;},function(){return null;});}):Promise.resolve(null);
  made.then(function(id){if(id)return id;return IngRepo.create({name:"Breathe",desc:"The guided tour's example: removed when the tour ends."}).then(function(r){b.fabRepo=r.id;save();return r.id;});})
    .then(function(id){return IngRepo.head(id).then(function(h){if(h)return id;
        return IngRepo.put(id,"index.html",appPage(1,false)).then(function(){return IngRepo.commit(id,"The breathing circle: in for four seconds, out for six");})
          .then(function(){return IngRepo.put(id,"index.html",appPage(2,true));}).then(function(){return IngRepo.commit(id,"Count the breaths under the key");}).then(function(){return id;});});})
    .then(function(id){H.FBS().sel=id;return fabPaint().then(function(){reveal($("fb")||$("page-fabrica"),"start");
      /* Fabrica's own Test, pressed as she would press it */
      /* pressed once the key stands ready for the tour's own app (Fabrica may still be keeping or drawing): tried for up to ten seconds */
      var tries=0;(function press(){var k=$("fbTest"),c=null;try{c=H.cur();}catch(e){}
        if(k&&!k.disabled&&k.offsetParent&&c&&c.id===id&&c.head&&!(H.S&&H.S.testing)){try{k.scrollIntoView({block:"center",behavior:live?"smooth":"auto"});}catch(e){}later(function(){try{k.click();}catch(e){}},live?700:1);return;}
        if(++tries<20)later(press,500);})();});})
    .catch(function(e){try{console.warn("Ingenium tour (Fabrica):",e);}catch(_){}});}
function putFabrica(){var b=state.tour&&state.tour.r377;if(!b)return Promise.resolve(false);var id=b.fabRepo,sel=b.fabSel,any=id!==undefined||sel!==undefined;
  delete b.fabRepo;delete b.fabSel;
  var gone=id&&W.IngRepo?IngRepo.remove(id).then(null,function(){}):Promise.resolve();
  return gone.then(function(){try{if(W.fbHubHost){var f=fbHubHost.FBS();if(sel!==undefined)f.sel=sel;else if(f.sel===id)f.sel=null;try{fbHubHost.S.testing=null;}catch(e){}fabPaint();}}catch(e){}return any;});}

/* ================= 3. Vocatio: an application kept, with its date ================= */
function vocOk(){return !!($("page-career")&&W.IngCareer&&typeof IngCareer.newOpp==="function"&&typeof IngCareer.state==="function");}
function closingIn(days){var d=new Date(Date.now()+days*864e5);return d.getDate()+" "+["January","February","March","April","May","June","July","August","September","October","November","December"][d.getMonth()]+" "+d.getFullYear();}
function posting(){return ["Learning and Access Officer","Example City Museum","An example posting made for Ingenium's guided tour: no such post is offered.","",
  "We are looking for someone to plan and lead our learning programme for schools, families and community groups.","",
  "What you will do:","- Plan and lead school visits and family workshops in the galleries","- Make the galleries welcoming to visitors with access needs",
  "- Work with teachers, volunteers and community groups","","What we are looking for:","- Experience of teaching, or of learning work in a museum, library or school",
  "- Clear writing and a calm, friendly manner with visitors of every age","","Closing date: "+closingIn(21)].join("\n");}
function demoVocatio(){onPage("career");if(!vocOk())return;var S=IngCareer.state(),b=bk(),live=lively();
  if(b.voc===undefined){b.voc={room:S.ui.room,open:S.ui.open,show:S.ui.show};save();}
  S.opps=(S.opps||[]).filter(function(o){return !o.__tour;});S.ui.room="apps";S.ui.open="new";S.ui.show="work";try{IngCareer.render();}catch(e){}
  reveal($("cs")||$("page-career"),"start");
  /* the posting, pasted where she would paste it */
  later(function(){var ta=D.querySelector("#cs textarea");var text=posting();
    var done=function(){IngCareer.newOpp("job",text,"the guided tour").then(function(o){o.__tour=true;try{saveState();}catch(e){}try{IngCareer.render();}catch(e){}
      later(function(){var o2=D.querySelector("#cs .c-opp[aria-current=true]")||D.querySelector("#cs .c-opp");if(o2)try{tourRing("#cs .c-opp[aria-current=true]",6);}catch(e){}},live?400:1);});};
    if(!ta){done();return;}try{ta.focus({preventScroll:true});}catch(e){}
    var w=words(text),step=4;play(Math.ceil(w.length/step),110,function(n){ta.value=w.slice(0,n*step).join("");ta.scrollTop=ta.scrollHeight;},function(){later(done,live?500:1);});},live?900:1);}
function putVocatio(){var b=state.tour&&state.tour.r377,any=false;if(!W.IngCareer||typeof IngCareer.state!=="function")return false;var S;try{S=IngCareer.state();}catch(e){return false;}
  var mine=(S.opps||[]).filter(function(o){return o.__tour;});if(mine.length){mine.forEach(function(o){try{if(o.ref&&W.IngBig)IngBig.del(o.ref);}catch(e){}});S.opps=S.opps.filter(function(o){return !o.__tour;});any=true;}
  if(b&&b.voc){S.ui.room=b.voc.room;S.ui.open=b.voc.open;S.ui.show=b.voc.show;delete b.voc;any=true;}
  else if(S.ui.open==="new"&&mine.length)S.ui.open=null;
  if(any)try{IngCareer.render();}catch(e){}return any;}

/* ================= 4. the cards ================= */
var NEWSOME=["new","some"];
var S={
  folders3:{r377:1,levels:NEWSOME,go:function(){onPage("folders");},ring:"#fldBody",demo:"r377Folder",
    t:"🗂️ A folder, brought up to date",
    b:"Watch: the small breathing app gets a folder of its own, with its conversation in it. Bring it up to date reads that conversation once and writes where things stand: what the app is, the decisions, what is open next, and a way of working seen in your own words, for you to keep or drop. The next conversation in this folder starts from these lines. Here it is played as an example, with no model asked; the folder is removed when the tour ends."},
  fabrica3:{r377:1,r377at:"left",levels:NEWSOME,go:function(){onPage("fabrica");},ring:"#fbTest",demo:"r377Fabrica",
    t:"🧪 Kept, then tested",
    b:"Watch: the breathing app is kept in Fabrica as a real repository, in two versions (the circle, then a count of the breaths), and Fabrica's own Test runs on the second: the page reads cleanly, every file it names is there, it opens with no errors, its own small check passes, and its build number moved forward. The tree in the header grows a version for each. The tour's repository is removed when the tour ends."},
  career4:{r377:1,levels:NEWSOME,go:function(){onPage("career");},ring:"#cs",demo:"r377Vocatio",
    t:"📌 An application, kept",
    b:"Watch: an example posting is pasted in. Vocatio reads its title, who offers it and its closing date from the text, and keeps it in Petitiones with its stage and the days left, so Diurna can put the next step in front of you. Reading it against your profile waits for your own press, on your own postings: the tour asks no model. The example is removed when the tour ends."}};

function bare(t){return String(t||"").replace(/^[^A-Za-z]+/,"").trim();}
function idx(fn){for(var i=0;i<ING_TOUR.length;i++)if(fn(ING_TOUR[i]))return i;return -1;}
function insertAfter(i,steps){if(i<0||!steps.length)return false;steps.forEach(function(s){s.chap=ING_TOUR[i].chap;});Array.prototype.splice.apply(ING_TOUR,[i+1,0].concat(steps));return true;}
function lastWhere(fn){var k=-1;ING_TOUR.forEach(function(s,i){if(fn(s))k=i;});return k;}
function apply(){if(touring()||!Array.isArray(W.ING_TOUR))return;var did=false;
  if(ING_TOUR.indexOf(S.folders3)<0&&foldersOk()){var f=idx(function(s){return s.sub==="A folder for each app";});if(f>=0)did=insertAfter(f,[S.folders3])||did;}
  if(ING_TOUR.indexOf(S.fabrica3)<0&&fabOk()){var w=idx(function(s){return s.chap==="Fabrica"&&s.sub==="Work, test and ship";});if(w>=0)did=insertAfter(w,[S.fabrica3])||did;}
  if(ING_TOUR.indexOf(S.career4)<0&&vocOk()){var v=lastWhere(function(s){return s.chap==="Vocatio";});if(v>=0)did=insertAfter(v,[S.career4])||did;}
  if(did)try{tourPaintEntry();}catch(e){}}

/* ================= 5. the tour's card, run and clear ================= */
function park(){var s=null;try{s=ING_TOUR[tourI];}catch(e){}if(!s||!s.r377at)return;var ov=$("ingTour"),card=ov&&ov.querySelector(".tour-card");if(!card||card.__r376own||card.__r377own)return;
  if(!card.__r377w){card.__r377w=1;card.addEventListener("pointerdown",function(e){if(!e.target.closest("button,a,input,select,textarea"))card.__r377own=1;});}
  var main=D.querySelector("main.main")||D.querySelector(".main"),mr=main?main.getBoundingClientRect():null;card.style.transform="";var r=card.getBoundingClientRect();if(!r.width)return;
  var x=Math.round(Math.max(16,(mr?mr.left:0)+16)-r.left),y=Math.round((innerHeight-18-r.height)-r.top);card.style.transform="translate("+x+"px,"+y+"px)";try{tourDrag.x=x;tourDrag.y=y;}catch(e){}}
(function wrapRender(){var o=W.tourRender;if(typeof o!=="function"||o.__r377)return;
  var n=function(){var r=o.apply(this,arguments);try{if(ING_TOUR[tourI]&&ING_TOUR[tourI].r377at)[60,400,1200,2200].forEach(function(ms){later(park,ms);});}catch(e){}return r;};
  try{Object.keys(o).forEach(function(k){n[k]=o[k];});}catch(e){}n.__r377=1;W.tourRender=tourRender=n;})();
var RUN={r377Folder:demoFolder,r377Fabrica:demoFabrica,r377Vocatio:demoVocatio};
(function wrapDemo(){var o=W.tourDemoRun;if(typeof o!=="function"||o.__r377)return;
  var n=function(name){if(RUN[name]){try{RUN[name]();}catch(e){try{console.warn("Ingenium tour:",e);}catch(_){}}return;}return o.apply(this,arguments);};n.__r377=1;W.tourDemoRun=tourDemoRun=n;})();
function clearAll(){var any=false;try{if(putFolder())any=true;}catch(e){}try{if(putVocatio())any=true;}catch(e){}
  var fab=putFabrica();try{if(state.tour&&state.tour.r377){delete state.tour.r377;any=true;}}catch(e){}if(any)save();return fab;}
(function wrapClear(){var o=W.tourDemoClear;if(typeof o!=="function"||o.__r377)return;
  var n=function(){var r=o.apply(this,arguments);clearAll();return r;};n.__r377=1;W.tourDemoClear=tourDemoClear=n;})();

/* ================= 6. start ================= */
function leftovers(){if(touring())return;var stray=(state.projects||[]).some(function(p){return p.id===FOLD_ID;})||(state.chats||[]).some(function(c){return c.id===FOLD_CHAT;});
  try{if(!stray&&W.IngCareer&&typeof IngCareer.state==="function")stray=(IngCareer.state().opps||[]).some(function(o){return o.__tour;});}catch(e){}
  if(had()||stray)clearAll();}
function boot(){try{leftovers();}catch(e){}try{apply();}catch(e){try{console.warn("Ingenium tour (r377):",e);}catch(_){}}}
if(D.readyState==="loading")D.addEventListener("DOMContentLoaded",boot);else boot();
(function wait(){var n=0;(function w(){if(W.__ingReady===true){boot();setTimeout(boot,2500);setTimeout(boot,6000);return;}if(++n<400)setTimeout(w,500);})();})();
(function wrapGo(){var og=W.go;if(typeof og!=="function"||og.__r377)return;
  var ng=function(p){var r=og.apply(this,arguments);try{if(!touring())apply();}catch(e){}return r;};
  try{Object.keys(og).forEach(function(k){ng[k]=og[k];});}catch(e){}ng.__r377=true;W.go=go=ng;})();
W.IngTour377={added:function(){return (W.ING_TOUR||[]).filter(function(s){return s.r377;}).map(function(s){return s.chap+": "+bare(s.t);});},clear:clearAll,page:appPage};
})();
;try{window.__ingParts["p377"]="running";}catch(_){}
</script>
