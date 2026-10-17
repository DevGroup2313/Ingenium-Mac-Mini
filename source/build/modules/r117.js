<style id="r117-css">
/* ============ R117 · THE STUDIO, CARED FOR: BLENDS JUDGED AND READY-MADE, NEW TOUR CHAPTERS, THE EXPORT WHOLE ============
   Her list (17 October): "Blend weighted outputs", "try new blends", "data export tool", "focus mode pausing
   non-essentials", "tutorial system", "recovery shelf with version diffs".
   What R99 began goes further: Blend gains a Judge strategy (each answer scored for accuracy, completeness and clarity,
   with the reason, before the final answer is written) and five ready-made blends built from the houses on this device;
   the tour gains chapters for Lector, Fabrica, scholarship and the models' quality and health; the export now carries
   Lector's documents and Fabrica's repositories; the shelf accounts for Lector's sets and Fontes' collections and says
   what it does not touch; and a focus session quiets Ingenium's own asides as well as the web. */
.bl-presets{display:grid;grid-template-columns:repeat(auto-fill,minmax(210px,1fr));gap:8px;margin:4px 0 14px}
.bl-preset{border:.5px solid var(--hairline-soft);border-radius:12px;padding:10px 12px;background:var(--card);display:flex;flex-direction:column;gap:5px;box-shadow:var(--pop)}
.bl-preset b{font-size:13px}.bl-preset .small{line-height:1.4}
.bl-preset .bl-pm{display:flex;flex-wrap:wrap;gap:4px}.bl-pm span{font:600 10.5px/1 var(--sans);padding:3px 7px;border-radius:999px;background:var(--accent-soft,rgba(106,63,181,.10));color:var(--ink-2)}
.bl-preset .btn{align-self:flex-start;margin-top:2px}
.bl-score{display:flex;flex-wrap:wrap;gap:5px;align-items:center;margin:6px 0 2px}
.bl-score span{font:600 10.5px/1 var(--sans);padding:4px 8px;border-radius:999px;background:var(--accent-soft,rgba(106,63,181,.10));color:var(--ink-2)}
.bl-score span.best{background:rgba(47,122,85,.14);color:#2f7a55}.bl-score .bl-why{font:12px/1.4 var(--sans);color:var(--ink-3);flex:1 1 100%;padding:0}
.ex-note{font-size:12px;color:var(--ink-3);margin-top:8px}
.shelf-note{font-size:12px;color:var(--ink-3);margin-top:10px;line-height:1.45}
body[data-theme="night"] .bl-score span.best{color:#8fd0a9}
</style>
<script>try{(window.__ingParts=window.__ingParts||{})["p48"]="started";}catch(_){}
/* R117 · the studio, cared for: see the note at the top of its styles */
(function r117Studio(){
"use strict";
function $(id){return document.getElementById(id);}
function nameOf(m){return m?(m.customName||m.name||"Model"):"";}

/* ---------- 1. Blend: a judge scores every answer before the final one is written ---------- */
if(Array.isArray(STRATS)&&!STRATS.some(function(s){return s.id==="judge";}))
  STRATS.push({id:"judge",name:"Judge and decide",desc:"Every model answers on its own. Then a judge (the model you weight highest, or the strongest) scores each answer for accuracy, completeness and clarity, says why, and writes the final answer from what held up."});
function judgePrompt(r,good,task){var parts=good.map(function(a,k){return "Answer "+(k+1)+" (from "+a.name+"):\n"+a.text;}).join("\n\n---\n\n");
  return "You are the judge of several answers to the same question. First score each answer, one line per answer, in exactly this form and nothing else on the line:\n"
    +"Answer 1: accuracy 4/5, completeness 3/5, clarity 5/5. Reason: one sentence saying what is right, missing or wrong.\n"
    +"Score accuracy by whether the claims are true and supported; completeness by whether the question is answered in full; clarity by whether a careful reader follows it at once. Be strict: a confident claim that is wrong costs accuracy; padding and promotional words cost clarity.\n"
    +"Then write a line that says only THE ANSWER: and, below it, the single best answer to the question: keep what the better answers got right, drop what was wrong or unsupported, and keep it as long as the question needs and no longer. Do not mention the answers, the models or the scores in it.\n\n"
    +"Question:\n"+task+"\n\n"+parts;}
function parseJudge(text,n){var scores={},t=String(text||""),re=/^\s*\**Answer\s+(\d+)\s*\**\s*:(.*)$/gim,m;
  function num(rest,key){var x=new RegExp(key+"\\s*:?\\s*(\\d)(?:\\s*\\/\\s*5)?","i").exec(rest);return x?+x[1]:null;}
  while((m=re.exec(t))){var i=+m[1]-1,rest=m[2];if(i<0||i>=n)continue;var acc=num(rest,"accuracy"),comp=num(rest,"completeness"),clar=num(rest,"clarity");if(acc==null||comp==null||clar==null)continue;
    var w=/Reason\s*:\s*(.*)$/i.exec(rest);scores[i]={acc:acc,comp:comp,clar:clar,why:w?w[1].trim().replace(/\s*\.$/,""):""};}
  var k=t.search(/THE ANSWER\s*:/i),final=k>=0?t.slice(k).replace(/^THE ANSWER\s*:\s*/i,"").trim():"";
  if(!final){final=t.replace(/^\s*\**Answer\s+\d+\s*\**\s*:[^\n]*\n?/gim,"").trim();}
  return {scores:scores,final:final};}
function judgeOf(r,models){return (typeof blJudge==="function")?blJudge(r,models):models.slice().sort(function(x,y){return blSize(y)-blSize(x);})[0];}
/* the run, with the judge's way beside the three (and the weights) R99 gave it */
blendRun=function(){var b=blState();
  if(BL.run&&BL.run.status==="running"){blPaintNote("A blend is running: its answers are on the right. Stop it first to start another.","bad");return;}
  var task=($("blendTask").value||"").trim(),chosen=blChosen(),ready=chosen.filter(blCanRun);
  if(chosen.length<2){blPaintNote("Choose two or more models above.","bad");return;}
  if(ready.length<2){blPaintNote("At least two of the chosen models must be ready on this device (see the Models page).","bad");return;}
  if(!task){blPaintNote("Write the question first.","bad");$("blendTask").focus();return;}
  if(liveBot||Engine.status==="busy"||Engine.status==="loading"){blPaintNote("The engine is busy (a chat reply or Lector). Let it finish, then run the blend.","bad");return;}
  try{if(window.Lector&&Lector.LX&&Lector.LX.busy){blPaintNote("Lector is using the engine. Let it finish or stop it on the Lector page first.","bad");return;}}catch(e){}
  var r={id:"b"+Date.now().toString(36),at:Date.now(),task:task,strategy:b.strategy,think:!!b.think,weights:Object.assign({},b.weights||{}),status:"running",
    answers:ready.map(function(m){return {id:m.id,name:nameOf(m),color:m.color||"",state:"waiting",text:"",think:""};})};
  BL.run=r;BL.stop=false;b.runs.unshift(r);b.runs=b.runs.slice(0,10);b.draft="";saveState();blPaintNote();blShow(r);
  var idx=0;
  function next(){if(BL.stop)return Promise.reject(new Error("Stopped."));if(idx>=ready.length)return Promise.resolve();
    var i=idx++,m=ready[i],a=r.answers[i],prompt=task;
    if(r.strategy==="refine"&&i>0){var prev=r.answers.slice(0,i).filter(function(x){return x.text&&x.state==="done";}).pop();
      if(prev)prompt="Below is a question and a draft answer written by another model. Write a better answer: correct anything wrong, fill what is missing, keep what is right, and keep it as concise as the question allows. Give only the improved answer, with no remarks about the draft.\n\nQuestion:\n"+task+"\n\nDraft:\n"+prev.text;}
    return blAsk(r,a,m,blMsgs(prompt),a).then(function(){saveState();return next();},function(e){if(BL.stop)throw e;saveState();return next();});}
  next().then(function(){var good=r.answers.filter(function(a){return a.state==="done"&&a.text;});
      if(!good.length)throw new Error("No model gave an answer.");
      if(r.strategy==="refine"){var last=good[good.length-1];r.final={text:last.text,by:last.name};return;}
      if(r.strategy==="vote")return;
      if(good.length===1){r.final={text:good[0].text,by:good[0].name};return;}
      var judge=judgeOf(r,ready);r.combining=true;r.combineBy=nameOf(judge);
      var hold={text:"",think:""},fa={state:"loading"};
      var into={set text(v){hold.text=v;r.combineText=v;},get text(){return hold.text;},set think(v){hold.think=v;r.combineThink=v;},get think(){return hold.think;}};
      if(r.strategy==="judge"){
        return blAsk(r,fa,judge,blMsgs(judgePrompt(r,good,task)),into).then(function(t){var pj=parseJudge(t,good.length);
          r.scores={};good.forEach(function(a,k){var ix=r.answers.indexOf(a);if(pj.scores[k])r.scores[ix]=pj.scores[k];});
          var tot=function(s){return s.acc+s.comp+s.clar;},best=-1,bi=-1;Object.keys(r.scores).forEach(function(ix){var v=tot(r.scores[ix]);if(v>best){best=v;bi=+ix;}});if(bi>=0)r.scores[bi].best=true;
          r.combineText=pj.final;r.final={text:pj.final||t,by:r.combineBy,judged:true,sheet:t};});}
      /* compare and combine: the strongest chosen model writes the one answer */
      return blAsk(r,fa,judge,blMsgs(blCombinePrompt(r,good,task)),into).then(function(t){r.final={text:t,by:r.combineBy};});})
    .then(function(){r.status="done";},function(e){r.status=BL.stop?"stopped":"done";if(!BL.stop&&!r.final&&r.strategy!=="vote")r.error=String(e&&e.message||e);})
    .then(function(){r.done=Date.now();r.combining=false;BL.run=null;BL.stop=false;
      var keepIt=Engine.modelId&&Engine.modelId===state.activeModelId;
      (keepIt?Promise.resolve(Engine.setStatus("ready")):Engine.unload()).then(null,function(){}).then(function(){try{renderEngineCtl();renderModels();}catch(e){}});
      saveState();blShow(r);blPaintNote(r.status==="stopped"?"Stopped. What was written is kept below.":(r.error?r.error:(r.strategy==="vote"?"Done. Keep the answer you like best.":(r.strategy==="judge"?"Done. Each answer carries the judge's scores; the judged answer is at the foot of the results.":"Done. The blended answer is at the foot of the results."))),r.error?"bad":"");blPaintEarlier();});};
window.blendRun=blendRun;(function rebind(){var k=$("blendRun");if(k)k.onclick=blendRun;})();
/* the scores on each card, and the judged answer named as such */
(function cards(){var oc=blCard;blCard=function(r,a,ix){var c=oc.apply(this,arguments);try{var s=r&&r.scores&&r.scores[ix];if(s){var row=el("div","bl-score"+(s.best?" best":""));
      row.appendChild(el("span",s.best?"best":"","Accuracy "+s.acc+"/5"));row.appendChild(el("span",s.best?"best":"","Completeness "+s.comp+"/5"));row.appendChild(el("span",s.best?"best":"","Clarity "+s.clar+"/5"));
      if(s.best)row.appendChild(el("span","best","the judge's choice"));if(s.why)row.appendChild(el("div","bl-why","The judge: "+s.why+"."));
      var body=c.querySelector(".bl-body");if(body)c.insertBefore(row,body);else c.appendChild(row);}}catch(e){}return c;};window.blCard=blCard;
  var of=blFinalCard;blFinalCard=function(r){var c=of.apply(this,arguments);try{if(r&&r.strategy==="judge"){var h=c.querySelector(".bl-card-h b");if(h)h.textContent="The judged answer";var by=c.querySelector(".bl-card-h .small");if(by&&r.combineBy)by.textContent=" · judged and written by "+r.combineBy;
      if(r.final&&r.final.sheet&&r.scores&&!Object.keys(r.scores).length){c.appendChild(el("div","small muted","The judge did not score the answers in the form asked; its whole reply is kept as the answer."));}}}catch(e){}return c;};window.blFinalCard=blFinalCard;
  var os=blShow;blShow=function(r){var v=os.apply(this,arguments);try{if(r&&r.strategy==="judge"&&r.status==="running"&&r.combining&&!r.final){var out=$("blendOut");if(out&&!out.querySelector(".bl-final"))out.appendChild(blFinalCard(r));}}catch(e){}return v;};window.blShow=blShow;})();

/* ---------- 2. ready-made blends from the houses on this device ---------- */
var PRESETS=[
  {id:"second",name:"Second opinion",tiers:["scriba","magister"],strategy:"judge",think:false,line:"Two models answer; the stronger judges both, scores them, and writes the answer that held up."},
  {id:"scholar",name:"Scholar's desk",tiers:["magister","scriba"],weights:{magister:3,scriba:1},strategy:"synth",think:true,line:"For essays and arguments: both think first, the stronger counts for three, and one careful answer is written."},
  {id:"code",name:"Careful code",tiers:["faber","magister"],strategy:"refine",think:true,line:"Faber drafts the code; Magister reads it and improves it. The improved draft is the answer."},
  {id:"quick",name:"Quick draft, careful edit",tiers:["velox","magister"],strategy:"refine",think:false,line:"Velox drafts at once; Magister improves the draft."},
  {id:"three",name:"Best of three",tiers:["velox","scriba","magister"],strategy:"vote",think:false,line:"Three answers side by side; you keep the one you like best."}];
function presetRecs(p){var out=[],seen={},w={};p.tiers.forEach(function(t){var rec=null;try{rec=lineupRec(lineupKeyFor(t));}catch(e){}if(!rec||seen[rec.id])return;seen[rec.id]=1;out.push({tier:t,rec:rec});if(p.weights&&p.weights[t])w[rec.id]=p.weights[t];});return {recs:out,weights:w};}
function presetMissing(p){var miss=[];p.tiers.forEach(function(t){var rec=null;try{rec=lineupRec(lineupKeyFor(t));}catch(e){}if(!rec){var sp=tierSpec(t);miss.push(sp?sp.name:t);}});return miss;}
function paintPresets(){var setup=document.querySelector("#page-blend .bl-setup");if(!setup)return;var old=$("blPresets");if(old)old.remove();
  var box=el("div");box.id="blPresets";var h=el("h2","sec");h.innerHTML='<span class="bl-n">✦</span> Ready-made blends';box.appendChild(h);
  box.appendChild(el("p","small muted","Built from the houses installed on this device. One press sets the models, the way they are brought together, their weights and thinking; then write the question and run. Save any of them as a house to use in the chat."));
  var grid=el("div","bl-presets");
  PRESETS.forEach(function(p){var pr=presetRecs(p),card=el("div","bl-preset");card.appendChild(el("b",null,p.name));card.appendChild(el("div","small",p.line));
    var marks=el("div","bl-pm");pr.recs.forEach(function(x){var sp=tierSpec(x.tier);marks.appendChild(el("span",null,(sp?sp.name:x.tier)+": "+nameOf(x.rec)+(pr.weights[x.rec.id]?" ×"+pr.weights[x.rec.id]:"")));});card.appendChild(marks);
    var st=(STRATS.filter(function(s){return s.id===p.strategy;})[0]||{}).name||p.strategy;card.appendChild(el("div","small muted",st+(p.think?" · thinking first":"")));
    var k=el("button","btn small primary","Use this blend");k.type="button";
    if(pr.recs.length<2){k.disabled=true;var miss=presetMissing(p);card.appendChild(el("div","small muted",miss.length?"Needs "+miss.join(" and ")+" installed (Models page)."+(pr.recs.length===1?" Its houses share one model here.":""):"Its houses share one model on this device, so there is nothing to blend yet."));}
    else k.onclick=function(){var b=blState();b.ids=pr.recs.map(function(x){return x.rec.id;});b.strategy=p.strategy;b.think=!!p.think;b.weights=Object.assign({},pr.weights);saveState();renderBlend();
      blPaintNote(p.name+": "+pr.recs.map(function(x){return nameOf(x.rec);}).join(", ")+" · "+st+". Write the question below and run.");var t=$("blendTask");if(t)t.focus();};
    card.appendChild(k);grid.appendChild(card);});
  box.appendChild(grid);setup.insertBefore(box,setup.firstChild);}
(function presetsHook(){var o=renderBlend;renderBlend=function(){var r=o.apply(this,arguments);try{paintPresets();}catch(e){}return r;};window.renderBlend=renderBlend;})();
window.IngBlendPresets={list:PRESETS,recs:presetRecs,paint:paintPresets,parse:parseJudge,prompt:judgePrompt};

/* ---------- 3. the tour's new chapters ---------- */
(function chapters(){if(!Array.isArray(ING_TOUR))return;if(ING_TOUR.some(function(s){return s.chap==="Lector";}))return;
  var models=[
    {chap:"Models",sub:"Quality and health",go:function(){go("models");},ring:["#lineupGrid .lu-q","#lineupGrid"],
     t:"🎚 Fast, Balanced, Best",b:"Each house offers the qualities its maker published. Fast is the smallest file and the quickest replies; Best is nearly the original quality at about twice the size. The size and fingerprint of each file are the ones Hugging Face listed, and the app refuses a file whose fingerprint differs.",
     tip:"On a phone or a tablet, Fast is the sound choice. On a computer with memory to spare, try Best for careful work."},
    {chap:"Models",go:function(){go("models");},ring:["#healthBox"],
     t:"🩺 Health",b:"The Health card shows the memory this device has for a model, what is loaded, and a line for each installed model: whether its file is the size its listing gives, whether it fits, and how fast it has been answering, with the engine's own count where the engine gives one.",
     tip:"A pace under two tokens a second tires. The card says which smaller house or quality answers sooner."},
    {chap:"Models",go:function(){go("models");},ring:["#catBox"],
     t:"📚 More models",b:"Thirty-four strong, open models, grouped by what fits this device, with filters for those that answer at once, think first, write code or read pictures. Any installed one can serve a house or join a Blend."}];
  var lector=[
    {chap:"Lector",sub:"The brief",go:function(){go("lector");},ring:["#l7Bf","#l7Brief"],
     t:"📖 Lector",b:"Lector reads one of your apps or a long document from end to end, thinks aloud as it goes, and writes the documents you need from it: a dossier, a portfolio piece, a cover letter, an appendix. Everything stays on this device.",
     tip:"Give it the whole app or the whole document. It reads part by part, so nothing is skipped."},
    {chap:"Lector",sub:"The right model",go:function(){go("lector");},ring:["#l7Model"],
     t:"🎓 The best model for the work",b:"Lector names the model it will use and says when a stronger one is ready on this device; one press takes it. Examine each section is on by default: an examiner's pass holds every figure to the measures and every claim to the material, and Ingenium's own check sets spelling to British and strikes promotional words.",
     tip:"For a doctoral standard, use the strongest model this device holds and leave the examiner on."},
    {chap:"Lector",go:function(){go("lector");},ring:["#l7Cite","#l7Bf"],
     t:"📑 Your sources, cited",b:"With Cite my sources on, Lector gives the writer the sources kept in Fontes, numbered, with your notes. A document that cites them ends with a References list in your chosen style, and no source that is not yours is ever invented."}];
  var fabrica=[
    {chap:"Fabrica",sub:"Your apps as repositories",go:function(){go("fabrica");},ring:["#fbRepos","#fbApps"],
     t:"🏗 Fabrica",b:"Fabrica keeps each of your apps as a real git repository on this device: every version, line by line, with branches, tags and undo by a new version. Bring an app in from its page, its zip or its folder; nothing leaves the device unless you send it.",
     tip:"Keep a version after each piece of work, with a line saying what changed. The history is yours to read later."},
    {chap:"Fabrica",sub:"Work, test and ship",go:function(){go("fabrica");},ring:["#fbWork","#fbPanels"],
     t:"🧪 The work, tested",b:"The work panel shows what changed since the last version. Test runs the app's own checks; Ship makes the one-page app, the web app and the installers, ready for download, from the version you choose."},
    {chap:"Fabrica",sub:"GitHub inside",go:function(){go("fabrica");},ring:["#fbShip","#fbPanels"],
     t:"🌐 GitHub, when you want it",b:"Sign in with a token and each repository can be sent to GitHub and brought back, version for version, with the same identities. Releases, builds and their installers are reached from here. Without a token, Fabrica works entirely on this device."}];
  var scholar=[
    {chap:"Scholarship",sub:"Every search vetted",go:function(){go("settings");},ring:["#srchPeer","#srchScholar"],
     t:"🔍 Searches you can trust",b:"Web search and Research look in the scholarly indexes first (OpenAlex, Crossref, Europe PMC, arXiv) and vet every source: a journal article with peer review confirmed, a preprint named as such, an encyclopaedia, a university page or an unvetted website. Peer-reviewed only keeps replies to journal articles, reviews and scholarly books.",
     tip:"Retracted work is left out. Each source under a reply says what was checked."},
    {chap:"Scholarship",sub:"Fontes",go:function(){go("chat");},ring:["#chatImgBtn"],
     t:"📚 Fontes, your reference database",b:"My sources, in the + menu, keeps your references on this device: add one by its DOI or ISBN, paste BibTeX or RIS, or bring in a whole .bib, .ris or CSL-JSON file from Zotero. Find within it, sort it into collections, write a note on each, and send the sources with your message to write from and to cite."}];
  function insertAfterChap(chap,steps){var at=-1;ING_TOUR.forEach(function(s,i){if(s.chap===chap)at=i;});if(at<0)at=ING_TOUR.length-1;Array.prototype.splice.apply(ING_TOUR,[at+1,0].concat(steps));}
  insertAfterChap("Models",models);insertAfterChap("Making things",fabrica);insertAfterChap("Making things",lector);insertAfterChap("Fabrica",scholar);
  try{if(typeof ING_TOUR_TEASERS==="object"){ING_TOUR_TEASERS.Lector=ING_TOUR_TEASERS.Lector||"the reader that writes your documents.";ING_TOUR_TEASERS.Fabrica=ING_TOUR_TEASERS.Fabrica||"your apps as repositories, tested and shipped.";ING_TOUR_TEASERS.Scholarship=ING_TOUR_TEASERS.Scholarship||"searches vetted, and your own reference database.";}}catch(e){}})();

/* ---------- 4. the export carries Lector's documents and Fabrica's repositories ---------- */
function exLectorDocs(){var out=[];try{var sets=(lxState().sets)||{};Object.keys(sets).forEach(function(k){var S=sets[k]||{},docs=S.docs||{};Object.keys(docs).forEach(function(kind){var d=docs[kind];if(d&&d.ref)out.push({ref:d.ref,title:d.title||kind,kind:kind,made:d.made});});});}catch(e){}
  return Promise.all(out.map(function(d){return IngBig.load(d.ref).then(function(md){if(!md)return null;var name="lector/"+exSafeName(d.title)+".docx";var bytes=null;try{bytes=lxDocx(d.title,String(md));}catch(e){}
      var files=[{name:name.replace(/\.docx$/,".md"),data:String(md)}];if(bytes)files.push({name:name,data:bytes});return files;},function(){return null;});})).then(function(L){var files=[];L.forEach(function(x){if(x)x.forEach(function(f){files.push(f);});});return files;});}
function exFabrica(){if(!window.IngRepo||typeof IngRepo.list!=="function")return Promise.resolve([]);
  return IngRepo.list().then(function(repos){return Promise.all((repos||[]).map(function(r){return IngRepo.bundle(r.id).then(function(b){return {name:"fabrica/"+exSafeName(r.slug||r.name||r.id)+".bundle",data:b};},function(){return null;});}));}).then(function(L){return L.filter(Boolean);},function(){return [];});}
/* the whole Tabula and Abacus keep their own stores (localStorage keys of their own); the export carries them as JSON */
function exAppStores(){var out={tabula:null,abacus:null},T={},A={};try{for(var i=0;i<localStorage.length;i++){var k=localStorage.key(i)||"";if(/^(tabula_|cd_letterheads|cd_marks|cd_signatures|cd_sign_prefs|cd_cite_style)/.test(k))T[k]=localStorage.getItem(k);else if(/^abacus_/.test(k))A[k]=localStorage.getItem(k);}}catch(e){}
  if(Object.keys(T).length)out.tabula=JSON.stringify(T,null,1);if(Object.keys(A).length)out.abacus=JSON.stringify(A,null,1);return out;}
openExport=function(){var box=modalOpen('<h3>Export your data</h3><p class="small muted" style="margin-top:0">Choose what goes in the file. It is made on this device and saved where you choose; nothing is sent anywhere.</p>'
    +'<div class="ex-list">'
    +'<label><input type="checkbox" id="exChats" checked> Conversations, each as a readable Markdown file (with times and references)</label>'
    +'<label><input type="checkbox" id="exChatsJson" checked> Conversations as data (JSON), to bring back into Ingenium</label>'
    +'<label><input type="checkbox" id="exNotes" checked> Notes, parked thoughts and reminders</label>'
    +'<label><input type="checkbox" id="exDocs" checked> Tabula document and Abacus sheets</label>'
    +'<label><input type="checkbox" id="exLector" checked> Lector\'s documents, each as a Word file and as Markdown</label>'
    +'<label><input type="checkbox" id="exFabrica" checked> Fabrica\'s repositories, each as a git bundle <span class="small muted">(git clone name.bundle opens it anywhere)</span></label>'
    +'<label><input type="checkbox" id="exApps" checked> Tabula\'s documents and Abacus\'s workbooks (the whole apps\' own stores, as JSON)</label>'
    +'<label><input type="checkbox" id="exSources" checked> My sources (BibTeX, RIS and CSL-JSON) and blend houses</label>'
    +'<label><input type="checkbox" id="exSettings" checked> Settings and the list of models (not the model files)</label>'
    +'<label><input type="checkbox" id="exKeys"> Include connection keys and tokens <span class="small muted">(only if the file stays with you)</span></label>'
    +'<label><input type="checkbox" id="exWhole"> The whole desk, as one backup file (the same as Export a backup)</label></div>'
    +'<div class="ex-note" id="exNote"></div>'
    +'<div style="display:flex;gap:8px;justify-content:flex-end;margin-top:12px"><button class="btn ghost" id="exCancel">Cancel</button><button class="btn primary" id="exGo">Make the file</button></div>');
  box.querySelector("#exCancel").onclick=closeModal;var note=box.querySelector("#exNote");
  try{var nL=0;Object.keys((lxState().sets)||{}).forEach(function(k){nL+=Object.keys(((lxState().sets[k]||{}).docs)||{}).length;});var parts=[];if(nL)parts.push(nL+" Lector document"+(nL===1?"":"s"));
    var p=window.IngRepo&&IngRepo.list?IngRepo.list().then(function(R){if(R&&R.length)parts.push(R.length+" Fabrica repositor"+(R.length===1?"y":"ies"));note.textContent=parts.length?"On this device: "+parts.join(" and ")+".":"";}):null;if(!p)note.textContent=parts.length?"On this device: "+parts.join(" and ")+".":"";}catch(e){}
  box.querySelector("#exGo").onclick=function(){var go_=this;var on=function(id){return box.querySelector("#"+id).checked;},files=[],day=new Date().toISOString().slice(0,10);
    var strip=function(o){return JSON.parse(JSON.stringify(o,function(k,v){if(k==="_handle")return undefined;if(!on("exKeys")&&/^(key|apiKey|token|braveKey|secret|password)$/i.test(k))return undefined;return v;}));};
    var chats=state.chats||[];
    if(on("exChats"))chats.forEach(function(c,i){files.push({name:"conversations/"+String(i+1).padStart(3,"0")+" "+exSafeName(c.title)+".md",data:exMd(c)});});
    if(on("exChatsJson"))files.push({name:"conversations.json",data:JSON.stringify(strip(chats),null,1)});
    if(on("exNotes"))files.push({name:"notes.json",data:JSON.stringify(strip({notes:state.notes||[],parked:state.parked||[],reminders:state.reminders||[]}),null,1)});
    if(on("exDocs"))files.push({name:"documents.json",data:JSON.stringify(strip({tabula:state.tabulaDoc||null,abacus:state.abacus||null}),null,1)});
    if(on("exSources")){var it=(state.fontes&&state.fontes.items)||[];files.push({name:"sources/my-sources.json",data:JSON.stringify(it,null,1)});
      if(window.FONTES&&it.length){try{files.push({name:"sources/my-sources.bib",data:FONTES.toBibTeX(it)});files.push({name:"sources/my-sources.ris",data:FONTES.toRIS(it)});}catch(e){}}
      files.push({name:"blend-houses.json",data:JSON.stringify(state.blendHouses||[],null,1)});}
    if(on("exSettings")){var s2=strip(state);["chats","notes","parked","reminders","tabulaDoc","abacus","fontes","blendHouses","perf"].forEach(function(k){delete s2[k];});files.push({name:"settings.json",data:JSON.stringify(s2,null,1)});}
    if(on("exWhole"))files.push({name:"ingenium-desk-backup.json",data:JSON.stringify(strip(state))});
    if(on("exApps")){var ap=exAppStores();if(ap.tabula)files.push({name:"apps/tabula-store.json",data:ap.tabula});if(ap.abacus)files.push({name:"apps/abacus-store.json",data:ap.abacus});}
    var wantL=on("exLector"),wantF=on("exFabrica");
    if(!files.length&&!wantL&&!wantF){ingToast("Tick at least one thing to export.");return;}
    go_.disabled=true;go_.textContent="Gathering…";
    Promise.all([wantL?exLectorDocs():[],wantF?exFabrica():[]]).then(function(rs){rs[0].forEach(function(f){files.push(f);});rs[1].forEach(function(f){files.push(f);});
      if(!files.length){ingToast("Nothing to export yet.");go_.disabled=false;go_.textContent="Make the file";return;}
      files.push({name:"README.txt",data:"Ingenium "+ING_VERSION+", exported "+new Date().toString()+".\nConversations are in Markdown (readable anywhere) and JSON. Sources open in Zotero (BibTeX or RIS). Lector's documents are Word files, with the same text as Markdown beside each. apps/ holds Tabula's and Abacus's own stores as JSON. A Fabrica repository is a git bundle: git clone <name>.bundle opens it with its whole history. The whole-desk backup is read back in Settings, Import a backup.\n"});
      saveFileNative("Ingenium-export-"+day+".zip","application/zip",makeZip(files));closeModal();ingToast(files.length+" files exported.");},
      function(e){go_.disabled=false;go_.textContent="Make the file";ingToast("The export stopped: "+(e&&e.message||e));});};};
window.openExport=openExport;(function rewire(){var k=$("exPick");if(k)k.onclick=openExport;})();

/* ---------- 5. the shelf's account: Lector's sets, Fontes' collections, and what it leaves alone ---------- */
(function shelf(){if(typeof shelfSummary!=="function")return;var o=shelfSummary;
  shelfSummary=function(st){var s=o.apply(this,arguments);st=st||{};try{var lx=st.lector||{};s.sets=lx.sets?Object.keys(lx.sets).length:0;s.colls=st.fontes&&Array.isArray(st.fontes.colls)?st.fontes.colls.length:0;s.houses=st.lineupQuality?Object.keys(st.lineupQuality).length:0;}catch(e){}return s;};window.shelfSummary=shelfSummary;
  var od=shelfDiff;shelfDiff=function(a,b){var d=od.apply(this,arguments);try{var L={sets:"Lector set",colls:"Fontes collection",houses:"quality choice"};Object.keys(L).forEach(function(k){var x=(a[k]||0)-(b[k]||0);if(x)d.lines.push((x>0?"+":"−")+Math.abs(x)+" "+L[k]+(Math.abs(x)===1?"":"s"));});}catch(e){}return d;};window.shelfDiff=shelfDiff;
  var or=recoverShow;recoverShow=function(){var r=or.apply(this,arguments);try{var host=$("snapList");if(host&&!host.parentNode.querySelector(".shelf-note"))host.after(el("div","shelf-note","Returning to a moment changes the desk: conversations, notes, settings and the lists kept there. Lector's readings and documents, Fabrica's repositories, Tabula's and Abacus's own stores and the model files live in this device's own store and are left as they are."));}catch(e){}return r;};window.recoverShow=recoverShow;})();

/* ---------- 6. quiet in a focus session: Ingenium's own asides wait with the web ---------- */
(function quiet(){if(typeof perfWarn==="function"){var o=perfWarn;perfWarn=function(p){try{if(typeof focusPauseOn==="function"&&focusPauseOn())return;}catch(e){}return o.apply(this,arguments);};window.perfWarn=perfWarn;}
  try{var sw=$("focusPauseSw");if(sw){var d=sw.closest(".sch-set");var t=d&&d.querySelector(".small.muted");if(t&&!/own asides/.test(t.textContent))t.textContent+=" Ingenium's own asides (a note that a model is slow, a tip) wait too.";}}catch(e){}})();
})();
;try{window.__ingParts["p48"]="running";}catch(_){}
</script>
