<style id="r200-css">
/* ============ R200 · DATASETS FROM HER OWN WORK (Ingenium 6.9.x, 31 October 2026) ============
   The owner's words (31 October 2026): "I want to expand on the parameters of what Ingenium can do as a serious coding and
   creating workbench with and without AI. I want to be able to create and train all kinds of AI models, even Frontier level
   AI models inside of the app."
   Training starts with the text, and until now the trainer took a paste, files, the Tabula page, the sticky notes and the
   Claude history, each in one piece, with nothing reviewed. The Studio's Data room now makes datasets from her own work,
   kept in a store of their own on this device (IndexedDB "ingenium_datasets", beside r131's "ingenium_claude"): the sources
   are her chats (and the conversations carried over from other assistants, r160), the conversations brought in from Claude
   (r131), the reading page's documents (r147's list, their texts in the device's larger store), the notes kept with her
   sources in Fontes, the Tabula page, the sticky notes and the files of her projects. She names a dataset, chooses its
   sources, then reviews every piece: keep, edit or drop, with where it came from on each; exact duplicates are removed
   (whitespace and case aside); emails and phone numbers are hidden in what goes out when she asks; a tenth (or a fifth) is
   held back by the hash of its text, the same pieces every time, so that a model can be measured on text it never trains
   on; the size is counted in characters and in pieces (an estimate: four characters a piece). It goes out as plain text
   (what the trainer reads), as chat lines (JSON Lines, the shape r131 writes, one conversation a line), or as question-and-
   answer pairs a model drafts from the kept pieces (through the page's own ask path: the connection in use, or the model
   loaded here) and she reviews one by one before any is kept. Train on it hands the dataset to Train a small model as its
   text on a computer; in a browser or on a phone it offers the learning workbench (r201).
   The computer's side (desktop/app_data_692.py, feature-detected): a dataset of any length reaches the trainer as a file,
   handed over a megabyte at a time (train_text_put), which lifts the 8 MB cap of one string over the bridge; and a long
   training goes one pass at a time, the model saved after each, so a run the app's closing cut short can go on (train_resume)
   or be let go. Without that side, the page works as before: one string, up to 8 MB, and a run that ends with the app. */
#ingDataCard .ds-list{display:grid;gap:8px;margin:10px 0 0}
#ingDataCard .ds-row{display:flex;flex-wrap:wrap;align-items:center;gap:8px 12px;padding:10px 12px;border:1px solid var(--hairline);border-radius:12px;background:linear-gradient(180deg,var(--card-hi),var(--card-lo));box-shadow:var(--pop)}
#ingDataCard .ds-row .ds-name{flex:1 1 220px;min-width:0;display:flex;flex-direction:column;gap:2px}
#ingDataCard .ds-row .ds-name b{font-size:14px;color:var(--ink-1);overflow-wrap:anywhere}
#ingDataCard .ds-row .ds-name span{font-size:12.5px;color:var(--ink-2)}
#ingDataCard .ds-row .ds-acts{display:flex;flex-wrap:wrap;gap:6px}
#ingDataCard .ds-none{margin-top:8px;font-size:13px;color:var(--ink-2)}
#ingDataCard .ds-foot{margin-top:12px;display:flex;flex-wrap:wrap;gap:8px;align-items:center}
#ingDataCard .ds-resume,#trainCard .ds-resume{margin-top:10px;padding:10px 12px;border:1px solid var(--hairline);border-radius:12px;background:var(--rm-wellbg,rgba(34,26,46,.035));font-size:13px;line-height:1.5;color:var(--ink-1)}
#trainCard .ds-resume .ds-acts{display:flex;flex-wrap:wrap;gap:6px;margin-top:8px}
.ds-box{max-width:820px}
.ds-box .aib-body{max-height:none}
.ds-src{display:grid;gap:6px;margin-top:6px}
.ds-src label{display:flex;align-items:flex-start;gap:10px;padding:8px 10px;border:1px solid var(--hairline);border-radius:10px;background:var(--card);cursor:pointer}
.ds-src label input{margin-top:3px}
.ds-src label span{display:flex;flex-direction:column;gap:1px;font-size:13.5px}
.ds-src label span small{font-size:12px;color:var(--ink-2)}
.ds-src label.off{opacity:.55;cursor:default}
.ds-sum{margin:8px 0;font-size:13px;line-height:1.5;color:var(--ink-2)}
.ds-sum b{color:var(--ink-1)}
.ds-tools{display:flex;flex-wrap:wrap;gap:8px 14px;align-items:center;margin:8px 0}
.ds-tools label{display:inline-flex;align-items:center;gap:6px;font-size:13px}
.ds-q{flex:1 1 180px;min-width:0;padding:7px 10px;border-radius:10px;border:1px solid var(--hairline);background:var(--card);color:inherit;font:inherit;font-size:13px}
.ds-items{max-height:min(52vh,520px);overflow:auto;border:1px solid var(--hairline);border-radius:12px;padding:4px 8px;background:var(--card)}
.ds-item{padding:8px 2px;border-bottom:1px solid var(--hairline-soft,rgba(0,0,0,.07))}
.ds-item:last-child{border-bottom:0}
.ds-item .ds-head{display:flex;flex-wrap:wrap;align-items:center;gap:6px 10px}
.ds-item .ds-tag{font:700 10.5px/1.6 var(--sans);letter-spacing:.05em;text-transform:uppercase;color:var(--accent);background:var(--bg);border:1px solid var(--hairline);border-radius:999px;padding:0 8px;white-space:nowrap}
.ds-item .ds-tag.held{color:var(--ink-3)}
.ds-item .ds-t{flex:1 1 160px;min-width:0;font-size:13.5px;font-weight:600;color:var(--ink-1);overflow-wrap:anywhere}
.ds-item .ds-n{font-size:12px;color:var(--ink-2);white-space:nowrap}
.ds-item .ds-keys{display:flex;gap:4px}
.ds-item .ds-keys .btn{padding:3px 9px;font-size:12px;min-height:26px}
.ds-item .ds-pre{margin:6px 0 0;font-size:12.5px;line-height:1.5;color:var(--ink-2);white-space:pre-wrap;max-height:4.6em;overflow:hidden}
.ds-item.open .ds-pre{max-height:none}
.ds-item textarea{width:100%;box-sizing:border-box;margin-top:6px;min-height:120px;font:13px/1.5 var(--sans);padding:8px 10px;border-radius:10px;border:1px solid var(--hairline);background:var(--card);color:inherit}
.ds-item.drop .ds-t,.ds-item.drop .ds-pre{text-decoration:line-through;opacity:.55}
.ds-qa .ds-item label{display:block;font-size:12px;color:var(--ink-2);margin-top:6px}
.ds-qa .ds-item textarea{min-height:56px}
.ds-note{min-height:18px;margin:8px 0 4px;font-size:13px;line-height:1.5}
.ds-note.bad{color:var(--danger,#b3261e)}
@media (max-width:600px){.ds-items{max-height:50vh}.ds-item .ds-n{white-space:normal}}
</style>
<script>try{(window.__ingParts=window.__ingParts||{})["p200"]="started";}catch(_){}
/* R200 · datasets from her own work: see the note at the top of its styles.
   window.IngData: sources(), gather(kinds), create(name, items, opts), list(), get(id), update(item), remove(id), text(id, opts),
   jsonl(id, opts), scrub(text, opts), tokens(chars), hash(text), draftQA(id, opts), keepQA(id, pairs), toTrainer(id),
   open(), review(id), wrapApi(api), hookTrainApi(), paintResume(). */
(function r200(){"use strict";
if(window.IngData)return;
var W=window,D=document,DBN="ingenium_datasets",dbp=null,CHUNK=1024*1024;
function $(id){return D.getElementById(id);}
function mk(tag,cls,txt){var e=D.createElement(tag);if(cls)e.className=cls;if(txt!=null)e.textContent=txt;return e;}
function att(e,o){for(var k in o)if(Object.prototype.hasOwnProperty.call(o,k))e.setAttribute(k,o[k]);return e;}
function warn(e){try{console.warn("Ingenium datasets:",e&&e.message||e);}catch(_){}}
function n0(x){try{return Number(x||0).toLocaleString("en-GB");}catch(e){return String(x||0);}}
function when(t){try{return new Date(t).toLocaleDateString("en-GB",{day:"numeric",month:"long",year:"numeric"});}catch(e){return "";}}
function uidd(p){return (p||"ds")+Date.now().toString(36)+Math.random().toString(36).slice(2,7);}
function toast(t){try{ingToast(t);}catch(e){}}
function ask(title,text,yes,danger){try{if(typeof W.ingAsk==="function")return Promise.resolve(W.ingAsk({title:title,text:text,yes:yes||"Yes",no:"Keep it",danger:!!danger}));}catch(e){}return Promise.resolve(W.confirm(title+"\n\n"+text));}
function plain(html){var d=D.createElement("div");try{d.innerHTML=(W.IngSafe&&IngSafe.html)?IngSafe.html(String(html||"")):String(html||"").replace(/<[^>]*>/g," ");}catch(e){d.textContent=String(html||"");}return (d.innerText||d.textContent||"").replace(/\u00a0/g," ").trim();}
function unthink(t){return String(t||"").replace(/<think>[\s\S]*?<\/think>/gi,"").replace(/^[\s\S]*<\/think>/i,"").trim();}

/* ---------- the store ---------- */
function db(){if(dbp)return dbp;
  dbp=new Promise(function(res,rej){try{if(!W.indexedDB)throw new Error("this browser keeps no larger store here (a private window, or storage switched off)");var rq=indexedDB.open(DBN,1);
    rq.onupgradeneeded=function(){var d=rq.result;try{if(!d.objectStoreNames.contains("sets"))d.createObjectStore("sets",{keyPath:"id"});
      if(!d.objectStoreNames.contains("items")){var s=d.createObjectStore("items",{keyPath:"id"});s.createIndex("set","set",{unique:false});}}catch(e){}};
    rq.onsuccess=function(){res(rq.result);};rq.onerror=function(){rej(rq.error||new Error("the store could not be opened"));};rq.onblocked=function(){rej(new Error("blocked"));};}catch(e){rej(e);}});
  dbp.catch(function(){dbp=null;});return dbp;}
function tx(stores,mode,fn){return db().then(function(d){return new Promise(function(res,rej){var t=d.transaction(stores,mode),out={};fn(t,out);
  t.oncomplete=function(){res(out.v);};t.onerror=t.onabort=function(){rej(t.error||new Error("this device's store refused it (it may be full)"));};});});}
function setsAll(){return tx(["sets"],"readonly",function(t,o){var r=t.objectStore("sets").getAll();r.onsuccess=function(){o.v=r.result||[];};}).then(function(l){return l.sort(function(a,b){return (b.updated||0)-(a.updated||0);});},function(){return [];});}
function setGet(id){return tx(["sets"],"readonly",function(t,o){var r=t.objectStore("sets").get(id);r.onsuccess=function(){o.v=r.result||null;};}).catch(function(){return null;});}
function itemsOf(id){return tx(["items"],"readonly",function(t,o){var r=t.objectStore("items").index("set").getAll(id);r.onsuccess=function(){o.v=r.result||[];};}).then(function(l){return l.sort(function(a,b){return (a.o||0)-(b.o||0);});},function(){return [];});}
function putMany(set,items){var i=0;function batch(){var part=items.slice(i,i+60);if(!part.length)return Promise.resolve();
    return tx(["items"],"readwrite",function(t){part.forEach(function(x){t.objectStore("items").put(x);});}).then(function(){i+=part.length;return batch();});}
  return batch().then(function(){return tx(["sets"],"readwrite",function(t){t.objectStore("sets").put(set);});});}
function summarise(set,items){var kept=items.filter(function(x){return x.keep!==false;}),held=kept.filter(function(x){return x.held;});
  var chars=kept.reduce(function(a,x){return a+textOf(x).length;},0);set.n=items.length;set.kept=kept.length;set.heldN=held.length;set.chars=chars;set.tokens=tokens(chars);set.qa=kept.filter(function(x){return x.kind==="qa";}).length;set.updated=Date.now();return set;}

/* ---------- the text of a piece, its hash, its size ---------- */
function textOf(x){if(!x)return "";if(x.kind==="qa")return "Q: "+String(x.q||"").trim()+"\nA: "+String(x.a||"").trim();return String(x.text||"");}
function hash(t){var s=String(t||"").toLowerCase().replace(/\s+/g," ").trim(),h=2166136261;for(var i=0;i<s.length;i++){h^=s.charCodeAt(i);h=Math.imul(h,16777619);}return (h>>>0).toString(36);}
function tokens(chars){return Math.round((+chars||0)/4);}
var EMAIL=/[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/g,PHONE=/(^|[^\w.])((?:\+?\d{1,3}[ .-]?)?(?:\(\d{2,4}\)|\d{2,4})[ .-]?\d{3,4}[ .-]?\d{3,4})(?![\w.])/g;
function scrub(t,o){o=o||{};t=String(t||"");var n={emails:0,phones:0};
  if(o.emails)t=t.replace(EMAIL,function(){n.emails++;return "[email]";});
  if(o.phones)t=t.replace(PHONE,function(m,pre,num){if(num.replace(/\D/g,"").length<7)return m;n.phones++;return pre+"[phone]";});
  return o.count?{text:t,found:n}:t;}
function found(items){var e=0,p=0;items.forEach(function(x){if(x.keep===false)return;var t=textOf(x);e+=(t.match(EMAIL)||[]).length;p+=(scrub(t,{phones:true,count:true}).found.phones);});return {emails:e,phones:p};}
function heldBy(h,frac){if(!frac)return false;var n=parseInt(String(h).slice(-6),36);return frac>=0.2?n%5===0:n%10===0;}

/* ---------- the sources ---------- */
function chatText(msgs,who){var out=[];(msgs||[]).forEach(function(m){var r=m.role||m.r,t=unthink(m.text||m.t||"");if(m.preview)return;if(!t&&!(m.files&&m.files.length))return;
  var f=m.files&&m.files.length?" [files: "+m.files.map(function(x){return x.name;}).join(", ")+"]":"";out.push((r==="me"?"### Me\n":"### "+(who||"Ingenium")+"\n")+t+f);});return out.join("\n\n");}
function chatMsgs(msgs){var out=[];(msgs||[]).forEach(function(m){var r=m.role||m.r,t=unthink(m.text||m.t||"");if(m.preview||!t)return;var role=r==="me"?"user":"assistant";
  if(out.length&&out[out.length-1].role===role)out[out.length-1].content+="\n\n"+t;else out.push({role:role,content:t});});
  while(out.length&&out[0].role!=="user")out.shift();return out;}
function loadMsgs(c){if(c.imported&&!c.imported.adopted&&c.imported.ref&&W.IngBig)return IngBig.load(c.imported.ref).then(function(t){var a=[];try{a=JSON.parse(t||"[]");}catch(e){}return a.concat((c.messages||[]).filter(function(x){return !x.imported;}));},function(){return c.messages||[];});
  return Promise.resolve(c.messages||[]);}
function chatsSrc(){var all=(W.state&&state.chats)||[];return {own:all.filter(function(c){return !c.imported||c.imported.adopted;}),imp:all.filter(function(c){return c.imported&&!c.imported.adopted;})};}
var SRC=[
  {k:"chats",name:"Your chats",what:"The conversations on the Chat page, as dialogue (Me and Ingenium). Attached files are named, not copied.",
    count:function(){return Promise.resolve(chatsSrc().own.filter(function(c){return (c.messages||[]).some(function(m){return !m.preview&&(m.text||"").trim();});}).length);},
    gather:function(){var out=[];return Promise.all(chatsSrc().own.map(function(c){return loadMsgs(c).then(function(ms){var t=chatText(ms);if(t.trim().length<20)return;
      out.push({kind:"chat",src:{kind:"chats",id:c.id,title:c.title||"A conversation",when:c.made||0},title:c.title||"A conversation",text:t,msgs:chatMsgs(ms)});});})).then(function(){return out;});}},
  {k:"imported",name:"Conversations carried over from other assistants",what:"Those brought in from ChatGPT, Gemini, Grok and the rest (Settings, Bring in your chats), as dialogue.",
    count:function(){return Promise.resolve(chatsSrc().imp.length);},
    gather:function(){var out=[];return Promise.all(chatsSrc().imp.map(function(c){return loadMsgs(c).then(function(ms){var who=c.imported&&c.imported.from||"Assistant",t=chatText(ms,who);if(t.trim().length<20)return;
      out.push({kind:"chat",src:{kind:"imported",id:c.id,title:c.title||"A conversation",from:who,when:c.imported&&c.imported.updated||c.made||0},title:c.title||"A conversation",text:t,msgs:chatMsgs(ms)});});})).then(function(){return out;});}},
  {k:"claude",name:"Conversations brought in from Claude",what:"The Claude export kept on this device (From Claude), as dialogue.",
    count:function(){try{return W.IngClaude?IngClaude.list().then(function(l){return l.length;}):Promise.resolve(0);}catch(e){return Promise.resolve(0);}},
    gather:function(){if(!W.IngClaude)return Promise.resolve([]);return IngClaude.list().then(function(lst){var out=[],ch=Promise.resolve();
      lst.forEach(function(s){ch=ch.then(function(){return IngClaude.get(s.id);}).then(function(c){if(!c)return;var ms=(c.msgs||[]).map(function(m){return {role:m.r,text:m.t,files:m.files};}),t=chatText(ms,"Claude");if(t.trim().length<20)return;
        out.push({kind:"chat",src:{kind:"claude",id:c.id,title:c.title,when:c.updated||c.created||0},title:c.title,text:t,msgs:chatMsgs(ms)});});});return ch.then(function(){return out;});});}},
  {k:"reading",name:"The reading page's documents",what:"The documents the reading page wrote from your apps (a dossier, a portfolio piece, a cover letter), as text.",
    count:function(){try{return Promise.resolve(typeof lectorDocs==="function"?lectorDocs().length:0);}catch(e){return Promise.resolve(0);}},
    gather:function(){var ds=[];try{ds=typeof lectorDocs==="function"?lectorDocs():[];}catch(e){}var KN={dossier:"Project dossier",appendix:"Appendix",portfolio:"Portfolio piece",cover:"Cover letter",cv:"CV entry",functions:"Every function"},out=[];
      return Promise.all(ds.map(function(d){var ref=d.set&&d.set.docs&&d.set.docs[d.kind]&&d.set.docs[d.kind].ref;if(!ref||!W.IngBig)return;return IngBig.load(ref).then(function(t){t=String(t||"").trim();if(t.length<20)return;
        var apps=(d.set.apps||[]).join(", ");out.push({kind:"text",src:{kind:"reading",id:d.key+"/"+d.kind,title:(KN[d.kind]||d.kind)+(apps?" · "+apps:""),when:d.made||0},title:(KN[d.kind]||d.kind)+(apps?": "+apps:""),text:t});},function(){});})).then(function(){return out;});}},
  {k:"fontes",name:"Notes on your sources (Fontes)",what:"Each source's title and authors with its abstract and your note, where there is one.",
    count:function(){return Promise.resolve(fontesPieces().length);},
    gather:function(){return Promise.resolve(fontesPieces());}},
  {k:"tabula",name:"The Tabula page",what:"The page's text as it stands now.",
    count:function(){return Promise.resolve(plain(W.state&&state.tabulaDoc&&state.tabulaDoc.body||"").length>=20?1:0);},
    gather:function(){var t=plain(W.state&&state.tabulaDoc&&state.tabulaDoc.body||"");if(t.length<20)return Promise.resolve([]);
      return Promise.resolve([{kind:"text",src:{kind:"tabula",id:"tabula",title:(state.tabulaDoc&&state.tabulaDoc.title)||"The Tabula page",when:Date.now()},title:(state.tabulaDoc&&state.tabulaDoc.title)||"The Tabula page",text:t}]);}},
  {k:"notes",name:"Sticky notes",what:"Each note with words in it, one piece a note.",
    count:function(){return Promise.resolve(((W.state&&state.notes)||[]).filter(function(n){return noteText(n).length>=3;}).length);},
    gather:function(){return Promise.resolve(((W.state&&state.notes)||[]).map(function(n){var t=noteText(n);if(t.length<3)return null;return {kind:"text",src:{kind:"notes",id:n.id||"",title:"A sticky note",when:n.ts||n.at||0},title:t.split("\n")[0].slice(0,60),text:t};}).filter(Boolean));}},
  {k:"projects",name:"Project files",what:"The instructions and the files of your projects, one piece a file.",
    count:function(){var n=0;((W.state&&state.projects)||[]).forEach(function(p){if((p.instructions||"").trim().length>=20)n++;n+=(p.files||[]).filter(function(f){return f&&String(f.text||"").trim().length>=20;}).length;});return Promise.resolve(n);},
    gather:function(){var out=[];((W.state&&state.projects)||[]).forEach(function(p){if((p.instructions||"").trim().length>=20)out.push({kind:"text",src:{kind:"projects",id:p.id,title:p.name+" · instructions",when:0},title:p.name+": instructions",text:String(p.instructions).trim()});
      (p.files||[]).forEach(function(f){var t=String(f&&f.text||"").trim();if(t.length<20)return;out.push({kind:"text",src:{kind:"projects",id:p.id+"/"+f.name,title:p.name+" · "+f.name,when:0},title:p.name+": "+f.name,text:t});});});return Promise.resolve(out);}}];
function noteText(n){try{return (W.IngSafe&&IngSafe.text?IngSafe.text(n.text||""):String(n.text||"").replace(/<[^>]*>/g," ")).trim();}catch(e){return String(n&&n.text||"").trim();}}
function fontesPieces(){var it=(W.state&&state.fontes&&state.fontes.items)||[],out=[];it.forEach(function(c){if(!c||!c.title)return;var note=String(c.ingNote||c.note||c.notes||c.annotation||"").trim(),abs=plain(String(c.abstract||"")).trim();if(!note&&!abs)return;
  var au=Array.isArray(c.author)?c.author.map(function(a){return a.literal||[a.given,a.family].filter(Boolean).join(" ");}).filter(Boolean).join(", "):String(c.author||""),yr=c.issued&&c.issued["date-parts"]?c.issued["date-parts"][0][0]:(c.year||"");
  var t="Source: "+c.title+(au?" ("+au+(yr?", "+yr:"")+")":(yr?" ("+yr+")":""))+"."+(abs?"\nAbstract: "+abs:"")+(note?"\nMy note: "+note:"");
  out.push({kind:"text",src:{kind:"fontes",id:c.id||c.DOI||c.title,title:c.title,when:c.ingAdded||0},title:c.title,text:t});});return out;}
function sources(){return Promise.all(SRC.map(function(s){return s.count().then(function(n){return {kind:s.k,name:s.name,what:s.what,n:n};},function(){return {kind:s.k,name:s.name,what:s.what,n:0};});}));}
function gather(kinds){var want=SRC.filter(function(s){return !kinds||kinds.indexOf(s.k)>=0;});
  return Promise.all(want.map(function(s){return s.gather().catch(function(e){warn(e);return [];});})).then(function(r){var out=[];r.forEach(function(l){out=out.concat(l);});return out;});}

/* ---------- making, keeping, changing ---------- */
function create(name,items,opts){opts=opts||{};var set={id:uidd("ds"),name:String(name||"My dataset").slice(0,80),made:Date.now(),updated:Date.now(),held:opts.held==null?0.1:+opts.held,scrub:{emails:!!(opts.scrub&&opts.scrub.emails),phones:!!(opts.scrub&&opts.scrub.phones)},sources:opts.sources||[],dupes:+opts.dupes||0};
  var seen={},rows=[],o=0;(items||[]).forEach(function(x){var t=textOf(x);if(!t.trim())return;var h=hash(t);if(seen[h]){set.dupes++;return;}seen[h]=1;
    rows.push({id:uidd("di"),set:set.id,o:o++,kind:x.kind||"text",src:x.src||{kind:"paste"},title:String(x.title||"").slice(0,140),text:x.kind==="qa"?"":String(x.text||""),q:x.q,a:x.a,msgs:x.msgs||null,keep:x.keep!==false,edited:false,hash:h,held:heldBy(h,set.held)});});
  summarise(set,rows);return putMany(set,rows).then(function(){return set;});}
function update(item){item.hash=hash(textOf(item));return setGet(item.set).then(function(set){if(set){item.held=item.held&&heldBy(item.hash,set.held)?true:heldBy(item.hash,set.held);}
  return tx(["items"],"readwrite",function(t){t.objectStore("items").put(item);}).then(function(){return refreshSet(item.set);});});}
function refreshSet(id){return Promise.all([setGet(id),itemsOf(id)]).then(function(r){if(!r[0])return null;summarise(r[0],r[1]);return tx(["sets"],"readwrite",function(t){t.objectStore("sets").put(r[0]);}).then(function(){return r[0];});});}
function setOpts(id,o){return setGet(id).then(function(set){if(!set)return null;if(o.held!=null)set.held=+o.held;if(o.scrub)set.scrub=Object.assign({},set.scrub,o.scrub);if(o.name)set.name=String(o.name).slice(0,80);
  return itemsOf(id).then(function(items){if(o.held!=null)items.forEach(function(x){x.held=heldBy(x.hash,set.held);});summarise(set,items);return putMany(set,items).then(function(){return set;});});});}
function remove(id){return tx(["items","sets"],"readwrite",function(t){var ix=t.objectStore("items").index("set").getAllKeys(id);ix.onsuccess=function(){(ix.result||[]).forEach(function(k){t.objectStore("items").delete(k);});};t.objectStore("sets").delete(id);});}
function get(id){return Promise.all([setGet(id),itemsOf(id)]).then(function(r){return r[0]?{set:r[0],items:r[1]}:null;});}
function pick(items,set,o){o=o||{};var split=o.split||"train";return items.filter(function(x){if(x.keep===false)return false;if(split==="all")return true;return split==="held"?!!x.held:!x.held;});}
function text(id,o){o=o||{};return get(id).then(function(r){if(!r)throw new Error("that dataset is no longer on this device");var sc=o.scrub||r.set.scrub||{};
  return pick(r.items,r.set,o).map(function(x){return scrub(textOf(x),sc);}).join("\n\n")+"\n";});}
function jsonl(id,o){o=o||{};return get(id).then(function(r){if(!r)throw new Error("that dataset is no longer on this device");var sc=o.scrub||r.set.scrub||{},lines=[];
  pick(r.items,r.set,o).forEach(function(x){if(x.kind==="qa")lines.push(JSON.stringify({messages:[{role:"user",content:scrub(String(x.q||""),sc)},{role:"assistant",content:scrub(String(x.a||""),sc)}]}));
    else if(x.kind==="chat"&&x.msgs&&x.msgs.length>=2)lines.push(JSON.stringify({messages:x.msgs.map(function(m){return {role:m.role,content:scrub(m.content,sc)};})}));
    else lines.push(JSON.stringify({text:scrub(textOf(x),sc)}));});return lines.join("\n")+(lines.length?"\n":"");});}

/* ---------- question-and-answer pairs, drafted by a model and reviewed by her ---------- */
function isCloud(){try{return chatSource()==="cloud"&&!!(state.cloud&&state.cloud.on&&state.cloud.provider);}catch(e){return false;}}
function askOnce(prompt,maxTok){var msgs=[{role:"system",content:"You help a person make a small question-and-answer dataset from their own writing. Use only the passage given. Answer in the exact form asked, nothing else."},{role:"user",content:prompt}];
  if(isCloud()){var keep=state.thinking,ab=null,out="";try{ab=netAbortable();}catch(e){ab=null;}state.thinking=false;
    return Promise.resolve().then(function(){return typeof ensureCloudModel==="function"?ensureCloudModel():null;}).then(function(){return cloudChat(msgs,function(t){out+=t;},function(){},ab);})
      .then(function(){state.thinking=keep;return unthink(out);},function(e){state.thinking=keep;throw e;});}
  if(typeof supAsk==="function")return supAsk(prompt,maxTok||700).then(unthink);
  return Promise.reject(new Error("no model is at hand"));}
function qaPrompt(t,n){return "From the passage below, write "+n+" question-and-answer pairs. Each question must be answerable from the passage alone; each answer must use only what the passage says, in one to three sentences. Write them exactly as:\nQ: the question\nA: the answer\n\nPASSAGE:\n"+t+"\n\nWrite the "+n+" pairs now.";}
function parseQA(txt){var out=[],cur=null;String(txt||"").split(/\r?\n/).forEach(function(l){var m=/^\s*(?:\d+[.)]\s*)?(?:\*\*)?(Q|Question)\s*(?:\d+)?\s*(?:\*\*)?[:.]\s*(.+)$/i.exec(l);if(m){if(cur&&cur.q&&cur.a)out.push(cur);cur={q:m[2].trim(),a:""};return;}
    var a=/^\s*(?:\*\*)?(A|Answer)\s*(?:\d+)?\s*(?:\*\*)?[:.]\s*(.+)$/i.exec(l);if(a&&cur){cur.a=(cur.a?cur.a+"\n":"")+a[2].trim();return;}
    if(cur&&cur.a&&l.trim())cur.a+="\n"+l.trim();});if(cur&&cur.q&&cur.a)out.push(cur);
  return out.map(function(p){return {q:p.q.replace(/\*\*/g,"").trim().slice(0,1000),a:p.a.replace(/\*\*/g,"").trim().slice(0,4000)};}).filter(function(p){return p.q.length>3&&p.a.length>1;});}
var QA_STOP=false;
function draftQA(id,o){o=o||{};QA_STOP=false;var max=o.max||6,per=o.per||3,say=o.say||function(){};
  return get(id).then(function(r){if(!r)throw new Error("that dataset is no longer on this device");
    var cand=r.items.filter(function(x){return x.keep!==false&&x.kind!=="qa"&&!x.held&&textOf(x).trim().length>=200;}).slice(0,max),drafts=[],ch=Promise.resolve(),i=0;
    if(!cand.length)throw new Error("no kept piece is long enough (200 characters or more) to draft from");
    cand.forEach(function(x){ch=ch.then(function(){if(QA_STOP)return;say("Asking the model about piece "+(++i)+" of "+cand.length+"…");var t=scrub(textOf(x),r.set.scrub).slice(0,6000);
      return askOnce(qaPrompt(t,per),700).then(function(ans){parseQA(ans).slice(0,per).forEach(function(p){drafts.push({q:p.q,a:p.a,from:x.id,title:x.title});});},function(e){say("The model could not answer for \u201c"+x.title+"\u201d: "+(e&&e.message||e));});});});
    return ch.then(function(){return drafts;});});}
function keepQA(id,pairs){return get(id).then(function(r){if(!r)throw new Error("that dataset is no longer on this device");var o=r.items.length,rows=[],seen={};r.items.forEach(function(x){seen[x.hash]=1;});
  (pairs||[]).forEach(function(p){if(!p||!String(p.q||"").trim()||!String(p.a||"").trim())return;var h=hash("Q: "+p.q.trim()+"\nA: "+p.a.trim());if(seen[h])return;seen[h]=1;
    rows.push({id:uidd("di"),set:id,o:o++,kind:"qa",src:{kind:"qa",id:p.from||"",title:"Drafted by a model from \u201c"+(p.title||"a piece")+"\u201d, reviewed by you",when:Date.now()},title:String(p.q).trim().slice(0,140),text:"",q:String(p.q).trim(),a:String(p.a).trim(),keep:true,edited:!!p.edited,hash:h,held:heldBy(h,r.set.held)});});
  summarise(r.set,r.items.concat(rows));return putMany(r.set,rows).then(function(){return rows.length;});});}

/* ---------- to the trainer, and the computer's newer side ---------- */
function api(){try{return typeof trainApi==="function"?trainApi():null;}catch(e){return null;}}
function toTrainer(id){return get(id).then(function(r){if(!r)throw new Error("that dataset is no longer on this device");return text(id,{split:"train"}).then(function(t){
  if(!api()){if(W.IngLab&&typeof IngLab.open==="function"){IngLab.open("chars",{text:t,name:r.set.name});return {lab:true,chars:t.length};}
    throw new Error("training with llama.cpp runs in the Ingenium app on a Mac or Windows computer; on this device the learning workbench (Train) trains a small model in the page");}
  if(t.length<2000)throw new Error("the dataset's training part is too short to train on (it needs at least 2,000 characters; it has "+n0(t.length)+")");
  W.__trainPreset={name:("Trained on "+r.set.name).slice(0,60),text:t};try{closeModal();}catch(e){}openTrainer(null);return {trainer:true,chars:t.length};});});}
/* the dataset reaches the trainer as a file, a megabyte at a time, where the app's side has train_text_put (app_data_692.py) */
function putText(a,textAll){var i=0,first=true,path="";function next(){if(i>=textAll.length)return Promise.resolve({ok:true,path:path,chars:textAll.length});var part=textAll.slice(i,i+CHUNK);i+=CHUNK;
    return Promise.resolve(a.train_text_put(part,first)).then(function(r){first=false;if(!r||!r.ok)throw new Error((r&&r.error)||"the text could not be handed to the trainer");path=r.path||path;return next();});}
  return next();}
function wrapApi(a){if(!a||typeof a.train_text_put!=="function"||typeof a.train_start!=="function")return a;if(a.__r200w)return a.__r200w;var w=Object.create(a);
  w.train_start=function(spec){spec=Object.assign({},spec||{});var t=String(spec.text||"");if(!t)return a.train_start(spec);
    return putText(a,t).then(function(r){delete spec.text;spec.text_path=r.path;spec.chars=r.chars;return a.train_start(spec);},function(e){return {ok:false,error:String(e&&e.message||e)};});};
  w.__r200wrapped=true;try{Object.defineProperty(a,"__r200w",{value:w,enumerable:false,configurable:true});}catch(e){a.__r200w=w;}return w;}
function hookTrainApi(){var o=W.trainApi;if(typeof o!=="function"||o.__r200)return;var n=function(){var a=o.apply(this,arguments);try{return wrapApi(a);}catch(e){return a;}};n.__r200=1;n.__inner=o;W.trainApi=n;try{if(typeof trainApi!=="undefined")trainApi=n;}catch(e){}}
/* a training the app's closing cut short: the trainer card says so and offers to go on (train_resume) or to let it go */
function paintResume(){var card=$("trainCard"),a=api();if(!card)return;var old=card.querySelector(".ds-resume");
  if(!a||typeof a.train_resume!=="function"){if(old)old.remove();return;}
  Promise.resolve(a.train_status()).then(function(st){old=card.querySelector(".ds-resume");var r=st&&st.state!=="running"&&st.resumable;if(!r){if(old)old.remove();return;}
    var box=old||mk("div","ds-resume");box.innerHTML="";box.appendChild(mk("b",null,"A training was cut short when the app closed. "));
    box.appendChild(D.createTextNode((r.name||"The model")+": "+(r.done||0)+" of "+(r.passes||"?")+" pass"+(r.passes===1?"":"es")+" done and saved"+(r.chars?", on "+n0(r.chars)+" characters":"")+". It can go on from the pass it reached, one pass at a time, or be let go."));
    var acts=mk("div","ds-acts"),go=att(mk("button","btn small primary","Go on with it"),{type:"button"}),let_=att(mk("button","btn small ghost","Let it go"),{type:"button"});
    go.onclick=function(){go.disabled=true;Promise.resolve(a.train_resume()).then(function(x){if(!x||!x.ok){toast((x&&x.error)||"It could not go on.");go.disabled=false;return;}box.remove();try{trainWatch();}catch(e){}try{openTrainer(null,true);}catch(e){}},function(e){toast(String(e&&e.message||e));go.disabled=false;});};
    let_.onclick=function(){Promise.resolve(typeof a.train_discard==="function"?a.train_discard():{ok:true}).then(function(){box.remove();toast("Let go. Nothing of it is kept.");});};
    acts.appendChild(go);acts.appendChild(let_);box.appendChild(acts);if(!old)card.appendChild(box);},function(){});}
function hookTrainCard(){var o=W.renderTrainCard;if(typeof o!=="function"||o.__r200)return;var n=function(){var r=o.apply(this,arguments);try{paintResume();}catch(e){}return r;};n.__r200=1;W.renderTrainCard=n;try{renderTrainCard=n;}catch(e){}}

/* ---------- the card ---------- */
function card(){var c=$("ingDataCard");if(c)return c;c=att(mk("div","card"),{id:"ingDataCard",role:"region","aria-labelledby":"ingDataH"});
  var h=mk("h2","sec","Datasets from your own work");h.id="ingDataH";c.appendChild(h);
  c.appendChild(mk("p","small muted","A dataset is the text a model learns from. Make one from your chats, the conversations you brought in, the reading page's documents, your notes on sources, the Tabula page, your sticky notes and your project files; review every piece before it is kept; then train on it here, or take it out as a file. Everything stays on this device."));
  c.appendChild(att(mk("div","ds-list"),{id:"ingDataList"}));
  var foot=mk("div","ds-foot"),k=att(mk("button","btn primary","Make a dataset"),{type:"button",id:"ingDataNew"});k.onclick=function(){open();};foot.appendChild(k);
  foot.appendChild(att(mk("span","small muted"),{id:"ingDataSay",role:"status","aria-live":"polite"}));c.appendChild(foot);
  var host=$("rmP-models-studio")||$("page-models");if(host){var tc=$("trainCard");if(tc&&tc.parentNode===host)host.insertBefore(c,tc);else host.appendChild(c);}
  try{if(W.IngStudio)IngStudio.fileCard(c);}catch(e){}return c;}
function paintList(){var c=card(),L=c.querySelector("#ingDataList");if(!L)return;
  setsAll().then(function(sets){L.innerHTML="";if(!sets.length){L.appendChild(mk("div","ds-none","No dataset yet. Make a dataset gathers your work, shows you every piece, and keeps what you choose."));return;}
    sets.forEach(function(s){var row=mk("div","ds-row"),nm=mk("div","ds-name");nm.appendChild(mk("b",null,s.name));
      nm.appendChild(mk("span",null,n0(s.kept)+" of "+n0(s.n)+" pieces kept"+(s.qa?" ("+n0(s.qa)+" question-and-answer)":"")+" · "+n0(s.chars)+" characters, about "+n0(s.tokens)+" pieces of text · "+n0(s.heldN)+" held back · made "+when(s.made)));
      row.appendChild(nm);var acts=mk("div","ds-acts");
      var rv=att(mk("button","btn small","Review"),{type:"button"});rv.onclick=function(){review(s.id);};acts.appendChild(rv);
      var tr=att(mk("button","btn small primary",api()?"Train on it":"Train on it here"),{type:"button"});tr.onclick=function(){toTrainer(s.id).then(function(r){if(r&&r.lab)say("Handed to the learning workbench: "+n0(r.chars)+" characters.");},function(e){say(String(e&&e.message||e),true);});};acts.appendChild(tr);
      var ex=att(mk("button","btn small ghost","Export…"),{type:"button"});ex.onclick=function(){exportMenu(s);};acts.appendChild(ex);
      var rm=att(mk("button","btn small ghost danger","Remove"),{type:"button"});rm.onclick=function(){ask("Remove the dataset \u201c"+s.name+"\u201d?","It is removed from this device. Your chats, notes and documents themselves stay.","Remove it",true).then(function(yes){if(yes)remove(s.id).then(paintList);});};acts.appendChild(rm);
      row.appendChild(acts);L.appendChild(row);});});}
function say(t,bad){var e=$("ingDataSay");if(e){e.textContent=t||"";e.className="small"+(bad?" ds-bad cl-bad":" muted");}}
function exportMenu(s){var box=modalOpen('<div class="ds-box"><h3>Export \u201c'+esc(s.name)+'\u201d</h3><p class="small muted">Each export is a file you hold. The training part leaves out the held-back pieces; the held-back part is for measuring a model on text it never trained on.'+(s.scrub&&(s.scrub.emails||s.scrub.phones)?' Emails and phone numbers are hidden in these files, as you asked.':'')+'</p>'
    +'<div class="ds-tools"><button class="btn small" id="dxTxt">Plain text (training part)</button><button class="btn small ghost" id="dxHeld">Plain text (held-back part)</button><button class="btn small ghost" id="dxJsonl">Chat lines (.jsonl)</button><button class="btn small ghost" id="dxQa">Question-and-answer lines (.jsonl)</button></div>'
    +'<p class="small muted">Plain text is what Train a small model reads. Chat lines carry one conversation a line as a list of user and assistant messages, the shape many fine-tuning tools read; a piece that is not a conversation is written as {"text": …}. The question-and-answer file holds only the pairs you kept.</p>'
    +'<div class="ds-note" id="dxNote" role="status"></div><div style="display:flex;justify-content:flex-end;margin-top:12px"><button class="btn" id="dxX">Close</button></div></div>');
  var base=s.name.replace(/[^\w.-]+/g,"-").replace(/^-+|-+$/g,"").slice(0,40)||"dataset",note=function(t){box.querySelector("#dxNote").textContent=t;};
  box.querySelector("#dxTxt").onclick=function(){text(s.id,{split:"train"}).then(function(t){saveFileNative(base+"-train.txt","text/plain",t);note("Written: "+n0(t.length)+" characters, about "+n0(tokens(t.length))+" pieces of text.");});};
  box.querySelector("#dxHeld").onclick=function(){text(s.id,{split:"held"}).then(function(t){saveFileNative(base+"-held-back.txt","text/plain",t);note("Written: "+n0(t.length)+" characters held back.");});};
  box.querySelector("#dxJsonl").onclick=function(){jsonl(s.id,{split:"all"}).then(function(t){saveFileNative(base+"-chat.jsonl","application/jsonl",t);note("Written: "+n0(t.split("\n").filter(Boolean).length)+" lines.");});};
  box.querySelector("#dxQa").onclick=function(){get(s.id).then(function(r){var sc=r.set.scrub||{},ls=r.items.filter(function(x){return x.keep!==false&&x.kind==="qa";}).map(function(x){return JSON.stringify({messages:[{role:"user",content:scrub(x.q,sc)},{role:"assistant",content:scrub(x.a,sc)}]});});
    if(!ls.length){note("No question-and-answer pairs are kept in this dataset yet: Review, then Draft questions and answers.");return;}saveFileNative(base+"-qa.jsonl","application/jsonl",ls.join("\n")+"\n");note("Written: "+ls.length+" pairs.");});};
  box.querySelector("#dxX").onclick=closeModal;}

/* ---------- the wizard: name and sources, review, kept ---------- */
var STEPS=[{t:"Name and sources",why:"Choose where the text comes from. Each source is listed with how many pieces it holds; nothing is read from anywhere but this device."},
  {t:"Review",why:"Every piece, with where it came from. Keep, edit or drop each. Exact duplicates were removed. A tenth is held back by the hash of its text, so a model can be measured on text it never trains on."},
  {t:"Kept",why:"The dataset is kept on this device. Train on it, draft questions and answers from it with a model, or take it out as a file."}];
function open(){var w={name:"My dataset",kinds:[],items:[],held:0.1,scrub:{emails:false,phones:false},set:null,q:"",filter:""},step=0;
  var box=modalOpen('<div class="aib ds-box"><div class="aib-head"><h3 id="dsTitle"></h3><button class="cl-chev" id="dsX" aria-label="Close">\u00d7</button></div><ol class="aib-steps" id="dsSteps"></ol><div class="aib-why" id="dsWhy"></div><div class="aib-body" id="dsBody"></div><div class="ds-note" id="dsNote" role="status"></div>'
    +'<div class="aib-foot"><button class="btn ghost" id="dsBack">Back</button><span style="flex:1"></span><button class="btn primary" id="dsNext">Next</button></div></div>');
  box.classList.add("aib-box");
  function note(t,bad){var e=box.querySelector("#dsNote");if(e){e.textContent=t||"";e.className="ds-note"+(bad?" bad":"");}}
  function paint(){var b=box.querySelector("#dsBody");b.innerHTML="";note("");box.querySelector("#dsTitle").textContent="Make a dataset \u00b7 step "+(step+1)+" of "+STEPS.length;
    var sl=box.querySelector("#dsSteps");sl.innerHTML="";STEPS.forEach(function(s,i){var li=mk("li",(i===step?"on":(i<step?"done":""))+(i<step||i===step?"":" lock"),s.t);if(i<step&&step<2)li.onclick=function(){step=i;paint();};sl.appendChild(li);});
    box.querySelector("#dsWhy").textContent=STEPS[step].why;var back=box.querySelector("#dsBack"),next=box.querySelector("#dsNext");back.disabled=step===0||step===2;back.style.visibility=step===2?"hidden":"";
    if(step===0){var lab=mk("label","field");lab.appendChild(mk("span",null,"Name of the dataset"));var nm=mk("input");nm.type="text";nm.maxLength=80;nm.value=w.name;nm.oninput=function(){w.name=nm.value;};lab.appendChild(nm);b.appendChild(lab);
      var fs=mk("div","field");fs.appendChild(mk("span",null,"Sources"));var grid=mk("div","ds-src");grid.id="dsSources";grid.appendChild(mk("div","small muted","Counting…"));fs.appendChild(grid);b.appendChild(fs);
      sources().then(function(list){grid.innerHTML="";list.forEach(function(s){var l=mk("label",s.n?"":"off"),inp=mk("input");inp.type="checkbox";inp.value=s.kind;inp.disabled=!s.n;inp.checked=!!s.n&&(w.kinds.length?w.kinds.indexOf(s.kind)>=0:true);
          inp.onchange=function(){w.kinds=[].slice.call(grid.querySelectorAll("input:checked")).map(function(x){return x.value;});};l.appendChild(inp);var sp=mk("span");sp.appendChild(mk("b",null,s.name+(s.n?" \u00b7 "+n0(s.n)+" piece"+(s.n===1?"":"s"):" \u00b7 nothing yet")));sp.appendChild(mk("small",null,s.what));l.appendChild(sp);grid.appendChild(l);});
        w.kinds=[].slice.call(grid.querySelectorAll("input:checked")).map(function(x){return x.value;});});
      next.textContent="Gather and review";}
    if(step===1){var tools=mk("div","ds-tools"),q=att(mk("input","ds-q"),{type:"search",placeholder:"Find a piece by its words","aria-label":"Find a piece"});q.value=w.q;q.oninput=function(){w.q=q.value;list();};tools.appendChild(q);
      var selF=mk("select");selF.setAttribute("aria-label","Show");[["","Every source"]].concat(SRC.map(function(s){return [s.k,s.name];})).forEach(function(o){var op=mk("option",null,o[1]);op.value=o[0];selF.appendChild(op);});selF.value=w.filter;selF.onchange=function(){w.filter=selF.value;list();};tools.appendChild(selF);
      b.appendChild(tools);
      var sum=mk("div","ds-sum");sum.id="dsSum";b.appendChild(sum);
      var opts=mk("div","ds-tools");var hl=mk("label");hl.appendChild(mk("span",null,"Held back: "));var hs=mk("select");hs.setAttribute("aria-label","How much is held back");[[0,"none"],[0.1,"one piece in ten"],[0.2,"one in five"]].forEach(function(o){var op=mk("option",null,o[1]);op.value=String(o[0]);hs.appendChild(op);});hs.value=String(w.held);hs.onchange=function(){w.held=+hs.value;w.items.forEach(function(x){x.held=heldBy(x.hash,w.held);});list();};hl.appendChild(hs);opts.appendChild(hl);
      var fd=found(w.items);["emails","phones"].forEach(function(k){var l=mk("label"),c=mk("input");c.type="checkbox";c.checked=!!w.scrub[k];c.onchange=function(){w.scrub[k]=c.checked;};l.appendChild(c);l.appendChild(mk("span",null,"Hide "+(k==="emails"?"emails":"phone numbers")+" in what goes out ("+n0(fd[k])+" found)"));opts.appendChild(l);});
      b.appendChild(opts);
      var L=mk("div","ds-items");L.id="dsItems";L.setAttribute("role","list");b.appendChild(L);
      function list(){L.innerHTML="";var qq=w.q.toLowerCase().trim(),n=0;w.items.forEach(function(x){if(w.filter&&x.src.kind!==w.filter)return;if(qq&&(x.title+" "+textOf(x)).toLowerCase().indexOf(qq)<0)return;if(++n>400)return;L.appendChild(itemRow(x,function(){sumUp();}));});
        if(n>400)L.appendChild(mk("div","small muted","Showing 400 of "+n0(n)+": type a few words to find one."));if(!n)L.appendChild(mk("div","small muted","No piece matches."));sumUp();}
      function sumUp(){var kept=w.items.filter(function(x){return x.keep!==false;}),chars=kept.reduce(function(a,x){return a+textOf(x).length;},0),held=kept.filter(function(x){return x.held;}).length;
        sum.innerHTML="";sum.appendChild(mk("b",null,n0(kept.length)+" of "+n0(w.items.length)+" pieces kept"));sum.appendChild(D.createTextNode(" \u00b7 "+n0(chars)+" characters, about "+n0(tokens(chars))+" pieces of text (an estimate: four characters a piece) \u00b7 "+n0(held)+" held back"+(w.dupes?" \u00b7 "+n0(w.dupes)+" exact duplicate"+(w.dupes===1?"":"s")+" removed":"")+"."));}
      list();next.textContent="Keep this dataset";}
    if(step===2){var s=w.set;if(!s){b.appendChild(mk("p",null,"Nothing was kept."));next.textContent="Close";return;}
      var p1=mk("p");p1.appendChild(mk("b",null,s.name));p1.appendChild(D.createTextNode(": "+n0(s.kept)+" pieces kept, "+n0(s.chars)+" characters (about "+n0(s.tokens)+" pieces of text), "+n0(s.heldN)+" held back."+(s.dupes?" "+n0(s.dupes)+" exact duplicate"+(s.dupes===1?"":"s")+" removed.":"")));b.appendChild(p1);
      var row=mk("div","ds-tools");var tr=att(mk("button","btn primary",api()?"Train on it":"Train on it here"),{type:"button"});tr.onclick=function(){toTrainer(s.id).then(function(r){if(r&&r.lab){closeModal();}},function(e){note(String(e&&e.message||e),true);});};row.appendChild(tr);
      var qa=att(mk("button","btn","Draft questions and answers with a model"),{type:"button"});qa.onclick=function(){qaReview(s.id,function(){paintList();});};row.appendChild(qa);
      var ex=att(mk("button","btn ghost","Export…"),{type:"button"});ex.onclick=function(){exportMenu(s);};row.appendChild(ex);b.appendChild(row);
      b.appendChild(mk("p","small muted",(api()?"Train on it hands the training part to Train a small model as its text. ":"On this device the learning workbench trains a small character model on it in the page; llama.cpp's trainer runs in the computer app. ")+"Drafting asks the model in use (your connection, or the model loaded here) for question-and-answer pairs from the kept pieces; you review each before any is kept. What a small model learns from a dataset is its manner and form, not reliable facts."));
      next.textContent="Done";}}
  box.querySelector("#dsBack").onclick=function(){if(step>0&&step<2){step--;paint();}};
  box.querySelector("#dsNext").onclick=function(){if(step===0){if(!w.kinds.length){note("Choose at least one source.",true);return;}note("Gathering…");
      gather(w.kinds).then(function(items){if(!items.length){note("Nothing with words in it was found in those sources.",true);return;}var seen={},rows=[],d=0;items.forEach(function(x){var h=hash(textOf(x));if(seen[h]){d++;return;}seen[h]=1;x.hash=h;x.keep=true;x.held=heldBy(h,w.held);rows.push(x);});
        w.items=rows;w.dupes=d;step=1;paint();},function(e){note(String(e&&e.message||e),true);});return;}
    if(step===1){var kept=w.items.filter(function(x){return x.keep!==false;});if(!kept.length){note("Keep at least one piece.",true);return;}
      create(w.name,w.items,{held:w.held,scrub:w.scrub,sources:w.kinds,dupes:w.dupes}).then(function(s){w.set=s;step=2;paint();paintList();},function(e){note(String(e&&e.message||e),true);});return;}
    closeModal();paintList();};
  box.querySelector("#dsX").onclick=function(){closeModal();paintList();};
  paint();return box;}
function itemRow(x,onChange){var row=mk("div","ds-item"+(x.keep===false?" drop":""));row.setAttribute("role","listitem");var head=mk("div","ds-head");
  head.appendChild(mk("span","ds-tag",srcName(x.src)));if(x.held)head.appendChild(mk("span","ds-tag held","held back"));if(x.edited)head.appendChild(mk("span","ds-tag held edited","edited"));
  head.appendChild(mk("span","ds-t",x.title||"(untitled)"));head.appendChild(mk("span","ds-n",n0(textOf(x).length)+" ch."));
  var keys=mk("div","ds-keys"),kb=att(mk("button","btn small"+(x.keep===false?" ghost":""),x.keep===false?"Keep":"Drop"),{type:"button"}),eb=att(mk("button","btn small ghost","Edit"),{type:"button"});
  kb.onclick=function(){x.keep=x.keep===false;row.classList.toggle("drop",x.keep===false);kb.textContent=x.keep===false?"Keep":"Drop";kb.classList.toggle("ghost",x.keep===false);onChange&&onChange(x,"keep");};
  var pre=mk("div","ds-pre",textOf(x).slice(0,600)+(textOf(x).length>600?" […]":""));pre.onclick=function(){row.classList.toggle("open");};
  eb.onclick=function(){var ta=row.querySelector("textarea");if(ta){var v=ta.value;if(x.kind==="qa"){var m=/^Q:\s*([\s\S]*?)\nA:\s*([\s\S]*)$/.exec(v);if(m){x.q=m[1].trim();x.a=m[2].trim();}}else x.text=v;x.edited=true;if(!head.querySelector(".ds-tag.edited"))head.insertBefore(mk("span","ds-tag held edited","edited"),head.querySelector(".ds-t"));ta.remove();pre.textContent=textOf(x).slice(0,600);pre.hidden=false;eb.textContent="Edit";onChange&&onChange(x,"edit");return;}
    ta=mk("textarea");ta.value=textOf(x);ta.setAttribute("aria-label","The text of this piece");pre.hidden=true;row.appendChild(ta);eb.textContent="Save";ta.focus();};
  keys.appendChild(kb);keys.appendChild(eb);head.appendChild(keys);row.appendChild(head);row.appendChild(pre);return row;}
function srcName(s){var k=s&&s.kind;var n={chats:"chat",imported:(s&&s.from)||"carried over",claude:"Claude",reading:"reading page",fontes:"Fontes",tabula:"Tabula",notes:"sticky note",projects:"project",qa:"Q & A",paste:"paste"}[k]||k||"piece";return n;}
function review(id){get(id).then(function(r){if(!r){toast("That dataset is no longer on this device.");return;}var s=r.set,items=r.items;
  var box=modalOpen('<div class="ds-box"><div class="aib-head"><h3>'+esc(s.name)+'</h3><button class="cl-chev" id="drX" aria-label="Close">\u00d7</button></div><div class="ds-sum" id="drSum"></div><div class="ds-tools" id="drTools"></div><div class="ds-items" id="drItems" role="list"></div><div class="ds-note" id="drNote" role="status"></div>'
    +'<div class="ds-tools" style="justify-content:flex-end"><button class="btn" id="drQa">Draft questions and answers with a model</button><button class="btn ghost" id="drExp">Export…</button><button class="btn primary" id="drTrain">'+(api()?"Train on it":"Train on it here")+'</button></div></div>');
  var sum=box.querySelector("#drSum"),L=box.querySelector("#drItems"),tools=box.querySelector("#drTools");
  function sumUp(){var kept=items.filter(function(x){return x.keep!==false;}),chars=kept.reduce(function(a,x){return a+textOf(x).length;},0);sum.innerHTML="";sum.appendChild(mk("b",null,n0(kept.length)+" of "+n0(items.length)+" pieces kept"));
    sum.appendChild(D.createTextNode(" \u00b7 "+n0(chars)+" characters, about "+n0(tokens(chars))+" pieces of text \u00b7 "+n0(kept.filter(function(x){return x.held;}).length)+" held back \u00b7 made "+when(s.made)+"."));}
  var hl=mk("label");hl.appendChild(mk("span",null,"Held back: "));var hs=mk("select");[[0,"none"],[0.1,"one piece in ten"],[0.2,"one in five"]].forEach(function(o){var op=mk("option",null,o[1]);op.value=String(o[0]);hs.appendChild(op);});hs.value=String(s.held||0);
  hs.onchange=function(){setOpts(s.id,{held:+hs.value}).then(function(ns){s=ns;return itemsOf(s.id);}).then(function(l){items=l;list();paintList();});};hl.appendChild(hs);tools.appendChild(hl);
  var fd=found(items);["emails","phones"].forEach(function(k){var l=mk("label"),c=mk("input");c.type="checkbox";c.checked=!!(s.scrub&&s.scrub[k]);c.onchange=function(){var o={};o[k]=c.checked;setOpts(s.id,{scrub:o}).then(function(ns){s=ns;});};l.appendChild(c);l.appendChild(mk("span",null,"Hide "+(k==="emails"?"emails":"phone numbers")+" in what goes out ("+n0(fd[k])+" found)"));tools.appendChild(l);});
  function list(){L.innerHTML="";items.forEach(function(x,i){if(i>=400)return;L.appendChild(itemRow(x,function(it){update(it).then(function(){sumUp();paintList();});}));});sumUp();}
  list();
  box.querySelector("#drX").onclick=function(){closeModal();paintList();};
  box.querySelector("#drQa").onclick=function(){qaReview(s.id,function(){get(s.id).then(function(r2){items=r2.items;s=r2.set;list();paintList();});});};
  box.querySelector("#drExp").onclick=function(){exportMenu(s);};
  box.querySelector("#drTrain").onclick=function(){toTrainer(s.id).then(function(r){if(r&&r.lab)closeModal();},function(e){box.querySelector("#drNote").textContent=String(e&&e.message||e);box.querySelector("#drNote").className="ds-note bad";});};});}
function qaReview(id,done){var box=modalOpen('<div class="ds-box ds-qa"><div class="aib-head"><h3>Questions and answers, drafted for you to review</h3><button class="cl-chev" id="dqX" aria-label="Close">\u00d7</button></div>'
    +'<p class="small muted">The model in use is asked, piece by piece, for questions a reader could answer from that piece alone, with the answers. Read each pair: keep it, change it, or drop it. Nothing is kept until you say so.</p><div class="ds-tools"><label><span>Pieces to draft from: </span><select id="dqMax" aria-label="How many pieces"><option value="3">3</option><option value="6" selected>6</option><option value="12">12</option></select></label><button class="btn primary" id="dqGo">Draft</button><button class="btn ghost" id="dqStop" hidden>Stop</button></div>'
    +'<div class="ds-note" id="dqNote" role="status"></div><div class="ds-items" id="dqItems" role="list" hidden></div><div class="ds-tools" style="justify-content:flex-end"><button class="btn primary" id="dqKeep" hidden>Keep the pairs I marked</button></div></div>');
  var drafts=[],note=function(t,bad){var e=box.querySelector("#dqNote");e.textContent=t||"";e.className="ds-note"+(bad?" bad":"");},L=box.querySelector("#dqItems");
  function list(){L.hidden=false;L.innerHTML="";drafts.forEach(function(p){var row=mk("div","ds-item"+(p.keep===false?" drop":"")),head=mk("div","ds-head");head.appendChild(mk("span","ds-tag","from \u201c"+(p.title||"a piece")+"\u201d"));
      var keys=mk("div","ds-keys"),kb=att(mk("button","btn small"+(p.keep===false?" ghost":""),p.keep===false?"Keep":"Drop"),{type:"button"});kb.onclick=function(){p.keep=p.keep===false;row.classList.toggle("drop",p.keep===false);kb.textContent=p.keep===false?"Keep":"Drop";kb.classList.toggle("ghost",p.keep===false);};keys.appendChild(kb);head.appendChild(mk("span","ds-t",""));head.appendChild(keys);row.appendChild(head);
      var lq=mk("label",null,"Question"),tq=mk("textarea");tq.value=p.q;tq.oninput=function(){p.q=tq.value;p.edited=true;};row.appendChild(lq);row.appendChild(tq);var la=mk("label",null,"Answer"),ta=mk("textarea");ta.value=p.a;ta.oninput=function(){p.a=ta.value;p.edited=true;};row.appendChild(la);row.appendChild(ta);L.appendChild(row);});
    box.querySelector("#dqKeep").hidden=!drafts.length;}
  box.querySelector("#dqGo").onclick=function(){var go=this;go.disabled=true;box.querySelector("#dqStop").hidden=false;note("Asking…");
    draftQA(id,{max:+box.querySelector("#dqMax").value,say:function(t){note(t);}}).then(function(d){drafts=d.map(function(p){p.keep=true;return p;});go.disabled=false;box.querySelector("#dqStop").hidden=true;
      note(drafts.length?drafts.length+" pair"+(drafts.length===1?"":"s")+" drafted. Read each; keep, change or drop it.":"The model drafted nothing it could answer from the pieces. Try again, or write pairs yourself.");list();},
      function(e){go.disabled=false;box.querySelector("#dqStop").hidden=true;note(String(e&&e.message||e),true);});};
  box.querySelector("#dqStop").onclick=function(){QA_STOP=true;try{if(W._cloudAb&&W._cloudAb.abort)W._cloudAb.abort();}catch(e){}note("Stopping after this piece…");};
  box.querySelector("#dqKeep").onclick=function(){var kept=drafts.filter(function(p){return p.keep!==false;});keepQA(id,kept).then(function(n){note(n+" pair"+(n===1?"":"s")+" kept in the dataset.");box.querySelector("#dqKeep").hidden=true;drafts=[];L.hidden=true;done&&done();},function(e){note(String(e&&e.message||e),true);});};
  box.querySelector("#dqX").onclick=function(){QA_STOP=true;closeModal();done&&done();};return box;}

/* ---------- putting it together ---------- */
function helpEntries(){try{var H=W.IngHelp,P=H&&H.pages&&H.pages.models;if(!P||!P.dos||P.dos.__data)return;
  P.dos.push(["Make a dataset from your own work","Gathers your chats, documents and notes, and lets you review every piece before it is kept.","#ingDataCard"]);P.dos.__data=1;
  if(Array.isArray(H.map))H.map.push(["#ingDataCard","Datasets from your own work","Text a model can learn from, made from your own chats, documents, notes and pages. You review every piece; exact duplicates are removed; emails and phone numbers can be hidden; a part is held back for measuring."]);}catch(e){warn(e);}}
function setup(){try{card();paintList();}catch(e){warn(e);}hookTrainApi();hookTrainCard();helpEntries();try{paintResume();}catch(e){}}
function wrapGo(){var og=W.go;if(typeof og!=="function"||og.__r200)return;var ng=function(p){var r=og.apply(this,arguments);try{if(p==="models")setTimeout(function(){paintList();paintResume();},0);}catch(e){}return r;};
  try{Object.keys(og).forEach(function(k){ng[k]=og[k];});}catch(e){}ng.__r200=true;W.go=ng;}
setup();wrapGo();
if(D.readyState==="loading")D.addEventListener("DOMContentLoaded",setup);
(function later(){var n=0;(function wait(){if(W.__ingReady===true){setup();return;}if(++n<400)setTimeout(wait,500);})();})();

W.IngData={version:1,sources:sources,gather:gather,create:create,list:setsAll,get:get,update:update,setOpts:setOpts,remove:remove,text:text,jsonl:jsonl,scrub:scrub,tokens:tokens,hash:hash,
  draftQA:draftQA,parseQA:parseQA,keepQA:keepQA,toTrainer:toTrainer,open:open,review:review,qaReview:qaReview,wrapApi:wrapApi,hookTrainApi:hookTrainApi,paintResume:paintResume,paint:paintList,CHUNK:CHUNK};
})();
;try{window.__ingParts["p200"]="running";}catch(_){}
</script>
