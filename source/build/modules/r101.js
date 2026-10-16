<script>try{(window.__ingParts=window.__ingParts||{})["p33"]="started";}catch(_){}
/* ============ R101 · FILES MADE EVERY TIME, AND HER OWN FILES CHANGED IN PLACE ============
   Her report of 15 October, the same words as on the 14th: "the local models cannot make edits directly to the
   uploaded documents or generate and produce new documents, HTML files, or anything except for text for me to copy
   and paste". 3.7 told every model what it could make; tested here with the built-in Scriba (Qwen3.5 2B) on the
   computer engine, as her Macs run it, that was not enough:
   - asked for a cover letter "as a Word document", it wrote the letter without the document tags. At 110 words it
     fell under the 120 words a loose document needed, so no card came: text to copy, as she said;
   - asked to change a date and a heading in an attached Word file, it answered "I cannot edit files on your device
     directly", then wrote a new document that invented a weekday and replaced a section with bullets of its own.
     Nothing was applied to her file, whose headings had been flattened to plain lines when it was read;
   - both times the model read "[the rest was left out to fit the model's memory]" under her whole message: a
     document or a change keeps 7,680 tokens for the reply out of a memory of 8,192, which left 1,500 characters for
     everything else, and with a longer file attached it was her request, which comes last, that was cut;
   - the change took 13 minutes on this computer: Scriba thought for more than 4,000 tokens before writing.
   So, here:
   1. Memory: a model on a computer loads with as much memory as the computer can give it (up to 32,768 tokens),
      unless she set it herself; the reply never keeps more than half of it; her request is never the part cut.
   2. What she asks for is worked out when she sends it (a document, a page or app, a spreadsheet, slides, a change
      to her file, a conversion), or she says it with Make in the + menu. A short note at the very end of her
      message, where a small model attends most, says how to write it. The reply then becomes the file whether or
      not the model used the tags; a page written without its fence is still run.
   3. A change to her file: the model writes the whole revised text (small models do this far better than edit
      blocks); Ingenium compares it with her file part by part and applies only what changed to the file itself. A
      Word file keeps its styles, fonts, lists and tables, and saves as a Word file again. Parts the model dropped
      without being asked are kept, and each change can be read and switched off before saving.
   4. Turning her file into a PDF, a Word file, a web page or text is done here, at once, without the model.
   5. A reply that says it cannot make or change files, when it just did, loses that sentence; one that refused
      and made nothing is asked once more, plainly, and says so.
   6. Thinking has a budget fitted to the model and the task, so a change is not 4,000 tokens of thought. */
var R1={stash:{}};

/* ---------- 1. memory sized to the device ---------- */
function r1AutoCtx(m,A){if(!m)return 8192;
  var desk=A===DeskAdapter,nat=A===NativeAdapter,ram=deviceMemGB(),top=(+m.ctxLen>0)?+m.ctxLen:(desk?131072:32768);
  if(nat)top=Math.min(top,(typeof nativeInfo!=="undefined"&&nativeInfo&&nativeInfo.maxCtx)||8192);
  var steps=desk?[32768,24576,16384,12288,8192]:[16384,12288,8192];
  if(!ram)return Math.min(top,desk?16384:8192);
  var usable=ram*(desk?0.7:0.55);
  for(var i=0;i<steps.length;i++){var c=Math.min(steps[i],top);if(estimateNeedGB(Object.assign({},m,{ctx:c}))<=usable)return c;}
  return Math.min(top,8192);}
(function r1Loads(){function wrap(A){if(!A||typeof A.load!=="function")return;var o=A.load;
    A.load=function(job){try{var m=job&&job.model;
        if(m&&!m.ctxUser&&(!m.ctx||m.ctx===8192||m.ctx===4096||m.ctx===m.ctxAuto)){var a=r1AutoCtx(m,A);if(a&&a!==m.ctx){m.ctx=a;m.ctxAuto=a;try{saveState();}catch(e){}}}}catch(e){}
      return o.apply(this,arguments);};}
  try{wrap(DeskAdapter);}catch(e){}try{wrap(NativeAdapter);}catch(e){}
  var c=$("ctlCtx");if(c)c.addEventListener("input",function(){var m=state.models.filter(function(x){return x.id===state.activeModelId;})[0];if(m){m.ctxUser=true;delete m.ctxAuto;}});
  /* a memory set in a model's own settings is hers too */
  document.addEventListener("click",function(e){var t=e.target;if(!t||t.id!=="emSave")return;var before={};state.models.forEach(function(m){before[m.id]=m.ctx;});
    setTimeout(function(){state.models.forEach(function(m){if(before[m.id]!==m.ctx){m.ctxUser=true;delete m.ctxAuto;}});},0);},true);})();

/* ---------- 2. what she asks to be made ---------- */
var R1_CHANGE=/\b(edit|change|fix|correct|update|revise|rewrite|re-?word|rephrase|proof-?read|polish|improve|shorten|lengthen|expand|tighten|trim|rename|replace|remove|delete|add|insert|move|reorder|restructure|reformat|format|translate|tweak|adjust|amend|modify|swap|capitali[sz]e|bold|italici[sz]e|merge|split)\b|\bmake (it|this|that|the \w+) (more|less|shorter|longer|clearer|simpler|formal|informal|concise|friendlier|warmer|stronger)\b/i;
var R1_ASKING=/^\s*(how|what|why|when|where|who|which|whose|is|are|was|were|does|do|did|should|would|could|explain|tell me about|describe)\b/i;
var R1_IMPER=/\b(can you|could you|would you|will you|please|i want|i need|i'd like|make me|build me|write me|create me|give me)\b/i;
var R1_FMT=[["pdf",/\bpdf\b/i],["docx",/\b(word|docx|\.doc|ms word)\b/i],["html",/\b(html|web ?page|website)\b/i],["md",/\b(markdown|\.md)\b/i],["txt",/\b(plain text|\.txt|text file)\b/i]];
function r1Fmt(t){for(var i=0;i<R1_FMT.length;i++)if(R1_FMT[i][1].test(t))return R1_FMT[i][0];return null;}
function r1DocLike(n){return /\.(docx|doc|odt|rtf|md|markdown|txt|text)$/i.test(String(n||""));}
/* the file a change is for: one attached to this message, else the newest in the conversation */
function r1FileFor(rec){var fs=(rec&&rec.files)||[];if(fs.length)return fs[fs.length-1].name;
  var names=edChatFiles();return names.length?names[names.length-1]:null;}
function r1Want(rec){var t=String((rec&&rec.text)||""),mode=rec&&rec.makeMode,fmt=r1Fmt(t),file=r1FileFor(rec),own=!!(rec&&rec.files&&rec.files.length);
  if(mode&&mode!=="auto"){if(mode==="change")return file?{kind:"change",file:file,fmt:fmt,asked:true}:{kind:"doc",fmt:fmt,asked:true};
    return {kind:mode,fmt:mode==="doc"?(rec.makeFmt||fmt):fmt,asked:true};}
  if(!t.trim())return null;
  var question=R1_ASKING.test(t)&&!R1_IMPER.test(t);
  /* a conversion of her file, done here without the model */
  var conv=/\b(convert|turn|export|save|change|make|put)\b[^.?!\n]{0,60}?\b(in)?to\s+(a\s+|an\s+)?(pdf|word( document| file)?|docx|html|web ?page|markdown|plain text|text file)\b|\b(as|in)\s+(a\s+)?(pdf|docx)\b\s*[.!?]?\s*$/i;
  if(file&&fmt&&conv.test(t)&&!/\b(fix|correct|rewrite|revise|improve|shorten|add|remove|translate|proofread|polish|edit)\b/i.test(t))return {kind:"convert",file:file,fmt:fmt};
  var make=MK_MAKE.test(t)||R1_IMPER.test(t);
  if(/\b(slides?|slide ?deck|presentation|power ?point|pptx|keynote)\b/i.test(t)&&make)return {kind:"slides",fmt:fmt};
  if(/\b(spreadsheet|excel|xlsx|csv|workbook)\b/i.test(t)&&make)return {kind:"sheet",fmt:fmt};
  if(file&&(own||/\b(it|this|that|the (file|document|doc|letter|page|app|cv|essay|text|statement|draft|code))\b/i.test(t))&&R1_CHANGE.test(t)&&!(MK_WANT_DOC.test(t)&&/\b(write|draft|compose|create)\s+(a|an|my|me)\b/i.test(t)))
    return {kind:"change",file:file,fmt:fmt};
  if(question)return null;
  if(MK_WANT_APP.test(t)&&make&&!/\b(app|application)s? (store|settings)\b/i.test(t))return {kind:"page",fmt:"html"};
  if((MK_WANT_DOC.test(t)&&make)||((fmt==="pdf"||fmt==="docx")&&make))return {kind:"doc",fmt:fmt};
  return null;}
/* the source of a change, as it is now (the newest version made in this conversation, else hers as attached) */
function r1Size(name,before){return edSource(name,before).then(function(s){return s;});}
function r1WholeOK(src,budget){return !!src&&src.text.length<=Math.min(30000,Math.floor((budget||40000)*0.42));}
/* the note at the end of her message: how to write what she asked for */
function r1Note(rec,src){var w=rec.want;if(!w)return "";var strong=rec.r1Strong?" The person asked for this plainly, and it is possible here: write it now.":"";
  var never=" You can make files here, so never say that you cannot.";
  if(w.kind==="doc")return "\n\n(Ingenium: write the complete "+(w.what||"document")+" now, in Markdown (# for the title, ## for sections), between <document title=\"A short title\"> and </document>. Ingenium turns it into "+
    (w.fmt==="pdf"?"the PDF the person asked for (and Word and web-page files)":w.fmt==="html"?"the web page the person asked for (and Word and PDF files)":"the Word file"+(w.fmt==="docx"?" the person asked for":"")+" (and PDF and web-page files)")+" for them to save."+never+strong+")";
  if(w.kind==="page")return "\n\n(Ingenium: write the complete app or page now as one HTML file, its CSS and JavaScript inside it and nothing loaded from the internet, in a single ```html code block. Ingenium runs it beside the chat and saves it as a file."+never+strong+")";
  if(w.kind==="sheet")return "\n\n(Ingenium: write the table now in one ```csv code block, the first row naming the columns. Ingenium makes the Excel workbook and CSV file from it."+never+strong+")";
  if(w.kind==="slides")return "\n\n(Ingenium: write the slides now between <slides title=\"Its title\"> and </slides>, each slide starting with ## and its title, slides parted by a line holding only ---. Ingenium makes the PowerPoint file from it."+never+strong+")";
  if(w.kind==="change"){var nm=(src&&src.name)||w.file||"the file";
    if(src&&src.kind==="page"&&src.text.length<=40000)return "\n\n(Ingenium: you can change \""+nm+"\" here. Write the whole changed page in a single ```html code block, every part the request does not touch kept exactly as it is. Ingenium shows it beside the chat and keeps each version. Never say that you cannot edit files: here you can."+strong+")";
    if(src&&(src.kind==="doc"||src.kind==="text")&&r1WholeOK(src,R1.budget))return "\n\n(Ingenium: you can change \""+nm+"\" here. Write the whole revised file between <document title=\""+nm.replace(/"/g,"'")+"\"> and </document>, with every part the request does not change copied exactly as it is, word for word. Ingenium applies your changes to the person's original file and keeps its formatting. Never say that you cannot edit files: here you can."+strong+")";
    return "\n\n(Ingenium: you can change \""+nm+"\" here. For each change write an edit block: <edit file=\""+nm.replace(/"/g,"'")+"\">, then a line <<<<<<< FIND, the lines exactly as they are in the file now, a line =======, the lines that replace them, a line >>>>>>> REPLACE, then </edit>. Ingenium applies them to the file. Never say that you cannot edit files: here you can."+strong+")";}
  return "";}
/* her message: what it asks for is worked out once, when it goes (and again when she changes it) */
(function r1Send(){var os=sendChat;
  sendChat=function(){var mode=state.makeNext||null,fmt=state.makeFmt||null;var r=os.apply(this,arguments);
    if(mode){var ms=curMsgs(),u=null;for(var i=ms.length-1;i>=0;i--)if(ms[i].role==="me"){u=ms[i];break;}
      if(u&&!u.makeMode){u.makeMode=mode;if(fmt)u.makeFmt=fmt;delete u.want;}delete state.makeNext;delete state.makeFmt;saveState();try{paintChips();}catch(e){}}
    return r;};window.sendChat=sendChat;
  var or=sendRec;
  sendRec=function(rec){var self=this,args=arguments;
    try{if(rec&&rec.role==="me"&&(rec.wantFor!==String(rec.text||"")||rec.want===undefined)){rec.want=r1Want(rec)||null;rec.wantFor=String(rec.text||"");delete rec.makeNote;}
      if(rec&&rec.want&&rec.want.kind==="convert"&&r1Convert(rec))return;
      /* the note is written once for each version of her message; a change first finds the file as it is now */
      if(rec&&rec.role==="me"&&rec.makeNote===undefined){try{R1.budget=chatBudget();}catch(e){R1.budget=40000;}
        if(rec.want&&rec.want.kind==="change"){var at=curMsgs().indexOf(rec),nxt=curMsgs()[at+1]||null;
          return edSource(rec.want.file,nxt).then(function(src){if(rec.makeNote===undefined)rec.makeNote=r1Note(rec,src);},function(){if(rec.makeNote===undefined)rec.makeNote=r1Note(rec,null);})
            .then(function(){return or.apply(self,args);});}
        rec.makeNote=r1Note(rec,null);}}catch(e){try{console.error("R101 want",e);}catch(_){}}
    return or.apply(this,arguments);};window.sendRec=sendRec;})();
try{MK_CTX.push("makeNote");}catch(e){}

/* ---------- 3. thinking with a budget ---------- */
(function r1Params(){var o=replyParams;
  replyParams=function(m,base){var p=o.apply(this,arguments);try{
      var ms=curMsgs(),u=null;for(var i=ms.length-1;i>=0;i--)if(ms[i].role==="me"){u=ms[i];break;}
      var w=u&&u.want,pb=+(m&&m.paramB)||0,eff=+$("ctlEffort").value||3,file=!!(w&&w.kind&&w.kind!=="convert");
      if(p.thinking){var b=pb&&pb<=4.5?(file?768:1536):pb&&pb<=10?(file?1536:3072):(file?3072:6144);if(eff>=4)b*=2;if(eff<=1)b=Math.round(b/2);
        if(u&&u.r1Strong){p.thinking=false;}else p.thinking_budget=b;}}catch(e){}
    return p;};})();

/* ---------- 4. her Word file, opened whole ---------- */
var R1W="http://schemas.openxmlformats.org/wordprocessingml/2006/main";
function r1Kids(n,local){var out=[];for(var c=n.firstChild;c;c=c.nextSibling)if(c.nodeType===1&&c.localName===local&&c.namespaceURI===R1W)out.push(c);return out;}
function r1Kid(n,local){return r1Kids(n,local)[0]||null;}
function r1Val(n){return n?(n.getAttributeNS(R1W,"val")||n.getAttribute("w:val")||""):"";}
function r1Unzip(u8){var ents=libZipEntries(u8);if(!ents)return Promise.reject(new Error("This is not a Word file Ingenium can open."));
  var names=Object.keys(ents),out={};
  return names.reduce(function(p,n){return p.then(function(){return libZipData(u8,ents[n]).then(function(d){out[n]=d;});});},Promise.resolve()).then(function(){return {order:names,files:out};});}
function r1Text(u8){return new TextDecoder().decode(u8);}
/* the styles that are headings: their ids, by level */
function r1Styles(xml){var by={},lv={};if(!xml)return {lv:lv,id:by};
  var d=new DOMParser().parseFromString(xml,"application/xml");
  Array.prototype.forEach.call(d.getElementsByTagNameNS(R1W,"style"),function(s){var id=s.getAttributeNS(R1W,"styleId")||s.getAttribute("w:styleId"),nm=r1Val(r1Kid(s,"name")).toLowerCase(),l=null,m;
    if(nm==="title")l=1;else if((m=/^heading\s*([1-9])$/.exec(nm)))l=+m[1]+1;
    var ppr=r1Kid(s,"pPr"),ol=ppr&&r1Kid(ppr,"outlineLvl");if(l==null&&ol)l=+r1Val(ol)+2;
    if(l!=null&&id){lv[id]=l;if(!by[l])by[l]=id;}});
  return {lv:lv,id:by};}
function r1RunsOf(p){var out=[];(function walk(n){for(var c=n.firstChild;c;c=c.nextSibling){if(c.nodeType!==1)continue;
    if(c.namespaceURI===R1W&&c.localName==="r")out.push(c);
    else if(c.namespaceURI===R1W&&/^(hyperlink|ins|smartTag|sdt|sdtContent|fldSimple|customXml)$/.test(c.localName))walk(c);}})(p);return out;}
function r1RunText(r){var t="";for(var c=r.firstChild;c;c=c.nextSibling){if(c.nodeType!==1||c.namespaceURI!==R1W)continue;
    if(c.localName==="t")t+=c.textContent;else if(c.localName==="tab")t+="\t";else if(c.localName==="br"||c.localName==="cr")t+="\n";else if(c.localName==="noBreakHyphen")t+="-";}
  return t;}
function r1On(rpr,tag){var x=rpr&&r1Kid(rpr,tag);if(!x)return false;var v=r1Val(x);return v!=="0"&&v!=="false";}
function r1ParaText(p,md){var runs=r1RunsOf(p),s="";runs.forEach(function(r){var t=r1RunText(r);if(!t)return;
    if(md){var rp=r1Kid(r,"rPr"),b=r1On(rp,"b"),i=r1On(rp,"i");if(t.trim()&&(b||i)){var lead=/^\s*/.exec(t)[0],tail=/\s*$/.exec(t)[0],core=t.trim();t=lead+(b&&i?"***"+core+"***":b?"**"+core+"**":"*"+core+"*")+tail;}}
    s+=t;});
  return md?s.replace(/\*\*\*\*/g,"").replace(/\*\*(\s*)\*\*/g,"$1"):s;}
/* the parts of the document in order: paragraphs, and each row of a table */
function r1Units(doc,st){var body=doc.getElementsByTagNameNS(R1W,"body")[0],units=[];if(!body)return units;
  function para(p){var ppr=r1Kid(p,"pPr"),sid=r1Val(ppr&&r1Kid(ppr,"pStyle")),lvl=st.lv[sid]||0,ol=ppr&&r1Kid(ppr,"outlineLvl"),list=!!(ppr&&r1Kid(ppr,"numPr"));
    if(!lvl&&ol&&r1Val(ol)!=="9")lvl=+r1Val(ol)+2;
    var t=r1ParaText(p,true).replace(/\n/g," ").replace(/[ \t]+$/,""),plain=r1ParaText(p,false);
    var md=lvl?(new Array(Math.min(lvl,6)+1).join("#")+" "+t.replace(/^\*+|\*+$/g,"")):list?"- "+t:t;
    units.push({el:p,kind:"p",lvl:lvl,list:list,plain:plain,md:md});}
  function walk(n){for(var c=n.firstChild;c;c=c.nextSibling){if(c.nodeType!==1||c.namespaceURI!==R1W)continue;
      if(c.localName==="p")para(c);
      else if(c.localName==="tbl"){var rows=r1Kids(c,"tr");rows.forEach(function(tr,ri){var cells=r1Kids(tr,"tc").map(function(tc){return r1Kids(tc,"p").map(function(p){return r1ParaText(p,false);}).join(" ").trim();});
          units.push({el:tr,kind:"row",cells:cells,plain:cells.join(" | "),md:"| "+cells.map(function(x){return x.replace(/\|/g,"/");}).join(" | ")+" |",head:ri===0,tbl:c,rows:rows.length});});}
      else if(c.localName==="sdt"){var sc=r1Kid(c,"sdtContent");if(sc)walk(sc);}}}
  walk(body);return units;}
function r1UnitsMd(units){var out=[];units.forEach(function(u,i){var prev=units[i-1];
    if(u.kind==="row"){if(!prev||prev.kind!=="row"||prev.tbl!==u.tbl)out.push("");out.push(u.md);
      if(u.head&&u.rows>1)out.push("|"+u.cells.map(function(){return " --- ";}).join("|")+"|");return;}
    if(prev&&prev.kind==="row")out.push("");
    if(!u.plain.trim()){out.push("");return;}
    if(u.list&&prev&&prev.list)out.push(u.md);else{out.push("");out.push(u.md);}});
  return out.join("\n").replace(/\n{3,}/g,"\n\n").trim();}
function r1DocxRead(u8){return r1Unzip(u8).then(function(z){var dx=z.files["word/document.xml"];if(!dx)throw new Error("This Word file has no document part.");
  var st=r1Styles(z.files["word/styles.xml"]?r1Text(z.files["word/styles.xml"]):"");
  var doc=new DOMParser().parseFromString(r1Text(dx),"application/xml");
  if(doc.getElementsByTagName("parsererror").length)throw new Error("This Word file's text could not be read.");
  var units=r1Units(doc,st);return {zip:z,doc:doc,st:st,units:units,md:r1UnitsMd(units)};});}
function r1B64(u8){var s="",k=0x8000;for(var i=0;i<u8.length;i+=k)s+=String.fromCharCode.apply(null,u8.subarray(i,i+k));return btoa(s);}
/* a Word file she adds keeps its own bytes, and the model reads it with its headings, lists, emphasis and tables */
(function r1ReadDocx(){var o=readAsText;
  readAsText=function(f){if(!fileIsDocx(f)||typeof DecompressionStream==="undefined"&&typeof ingInflateGzip!=="function")return o.apply(this,arguments);
    return libReadBuf(f).then(function(buf){var u8=new Uint8Array(buf);
      return r1DocxRead(u8).then(function(r){var id=IngBig.newId();IngBig.put(id,r1B64(u8));R1.stash[f.name+"|"+f.size]=id;R1.stash["name|"+f.name]=id;return r.md||"(an empty Word document)";});},
      function(){return o.call(this,f);}).catch(function(){return o.call(null,f);});};
  var ost=stageText;
  stageText=function(name,t,pasted){var sf=ost.apply(this,arguments);try{var id=R1.stash["name|"+name];if(id&&sf&&!sf.docx){sf.docx=id;delete R1.stash["name|"+name];}}catch(e){}return sf;};})();

/* ---------- 5. changes worked out part by part ---------- */
function r1Key(s){return String(s||"").replace(/[*_`#>|]/g," ").replace(/^\s*(?:[-+•]|\d+[.)])\s+/,"").replace(/\s+/g," ").trim().toLowerCase();}
function r1Sim(a,b){a=r1Key(a);b=r1Key(b);if(a===b)return 1;if(!a||!b)return 0;
  var A={},n=0,hit=0;a.split(" ").forEach(function(w){A[w]=(A[w]||0)+1;n++;});b.split(" ").forEach(function(w){if(A[w]){A[w]--;hit++;}});return 2*hit/(n+b.split(" ").length);}
/* the blocks of a Markdown text: a heading, a list item, a table row, a paragraph */
function r1Blocks(md){var L=String(md||"").replace(/\r/g,"").split("\n"),out=[],para=[],code=null;
  function flush(){if(para.length){out.push({md:para.join(" ").trim(),kind:"p"});para=[];}}
  L.forEach(function(l){if(code){code.push(l);if(/^\s*```/.test(l)){out.push({md:code.join("\n"),kind:"code"});code=null;}return;}
    if(/^\s*```/.test(l)){flush();code=[l];return;}
    if(!l.trim()){flush();return;}
    if(/^\s*\|(\s*:?-{2,}:?\s*\|)+\s*$/.test(l))return;
    if(/^\s*\|.*\|\s*$/.test(l)){flush();out.push({md:l.trim(),kind:"row",cells:l.trim().replace(/^\||\|$/g,"").split("|").map(function(c){return c.trim();})});return;}
    if(/^\s*#{1,6}\s/.test(l)){flush();var hm=/^\s*(#{1,6})\s+(.*)$/.exec(l);out.push({md:l.trim(),kind:"h",lvl:hm[1].length,text:hm[2]});return;}
    if(/^\s*(?:[-*•+]|\d+[.)])\s+/.test(l)){flush();out.push({md:l.trim(),kind:"li"});return;}
    para.push(l.trim());});
  if(code)out.push({md:code.join("\n"),kind:"code"});flush();return out;}
/* old and new, lined up: the longest run of parts that are the same, then the rest paired by likeness */
function r1Align(oldK,newK){var n=oldK.length,m=newK.length,i,j,L=[],seq=[];
  /* the common parts stay put at both ends; the table is made only for the middle */
  var a=0;while(a<n&&a<m&&oldK[a]===newK[a])a++;var z=0;while(z<n-a&&z<m-a&&oldK[n-1-z]===newK[m-1-z])z++;
  var on=n-a-z,nm=m-a-z;
  if(on*nm>8e6){for(i=0;i<a;i++)seq.push(["s",i,i]);for(i=a;i<n-z;i++)seq.push(["d",i]);for(j=a;j<m-z;j++)seq.push(["a",j]);}
  else{for(i=0;i<=on;i++)L.push(new Int32Array(nm+1));
    for(i=on-1;i>=0;i--)for(j=nm-1;j>=0;j--)L[i][j]=oldK[a+i]===newK[a+j]?L[i+1][j+1]+1:Math.max(L[i+1][j],L[i][j+1]);
    for(i=0;i<a;i++)seq.push(["s",i,i]);i=0;j=0;
    while(i<on&&j<nm){if(oldK[a+i]===newK[a+j]){seq.push(["s",a+i,a+j]);i++;j++;}else if(L[i+1][j]>=L[i][j+1]){seq.push(["d",a+i]);i++;}else{seq.push(["a",a+j]);j++;}}
    while(i<on){seq.push(["d",a+i]);i++;}while(j<nm){seq.push(["a",a+j]);j++;}}
  for(i=0;i<z;i++)seq.push(["s",n-z+i,m-z+i]);
  var ops=[],g=null,oi=0,nj=0;
  seq.forEach(function(s){if(s[0]==="s"){if(g){ops.push(g);g=null;}ops.push({op:"same",o:s[1],n:s[2]});oi=s[1]+1;nj=s[2]+1;return;}
    if(!g)g={op:"gap",o:oi,oe:oi,n:nj,ne:nj};
    if(s[0]==="d"){g.oe=s[1]+1;oi=s[1]+1;}else{g.ne=s[1]+1;nj=s[1]+1;}});
  if(g)ops.push(g);return ops;}
/* the changes: each one says which of her parts it replaces, or where a new part goes */
function r1Num(md){var m=/^\s*#*\s*(\d+(?:\.\d+)*)[.)]?\s/.exec(String(md||""));return m?m[1]:null;}
function r1Score(a,b){var s=r1Sim(a,b),na=r1Num(a);if(na&&na===r1Num(b)&&r1Kind(a)===r1Kind(b))s+=0.5;return s;}
function r1Diff(oldMd,newMd,dropOK){var O=oldMd.map(r1Key),N=newMd.map(r1Key),ops=r1Align(O,N),out=[],kept=0;
  function gone(a){if(!O[a])return;if(dropOK)out.push({op:"del",o:a});else kept++;}
  ops.forEach(function(g){if(g.op==="same")return;
    var olds=[],news=[];for(var a=g.o;a<g.oe;a++)olds.push(a);for(var b=g.n;b<g.ne;b++)news.push(b);
    /* each new part, in order, finds the old part it rewrites (never crossing one already paired); the rest are new */
    var oi=0;news.forEach(function(nb,ni){var best=-1,bs=0;
      for(var k=oi;k<olds.length;k++){if(!O[olds[k]])continue;var sc=r1Score(oldMd[olds[k]],newMd[nb]);if(sc>bs){bs=sc;best=k;}}
      if(best>=0&&bs>=0.25){for(var q=oi;q<best;q++)gone(olds[q]);out.push({op:"set",o:olds[best],n:nb});oi=best+1;return;}
      while(oi<olds.length&&!O[olds[oi]])oi++;
      /* the same kind of part in the same place, when the counts left agree: that part, rewritten (a renamed heading shares no word) */
      if(oi<olds.length&&olds.length-oi===news.length-ni&&r1Kind(oldMd[olds[oi]])===r1Kind(newMd[nb])){out.push({op:"set",o:olds[oi],n:nb});oi++;return;}
      out.push({op:"add",after:oi>0?olds[oi-1]:g.o-1,n:nb});});
    for(var r=oi;r<olds.length;r++)gone(olds[r]);});
  return {ops:out,kept:kept};}
/* a part the model wrote, as it goes into her Word file */
function r1MdInline(s){var out=[],re=/(\*\*\*[^*]+\*\*\*|\*\*[^*]+\*\*|\*[^*\s][^*]*\*|_[^_\s][^_]*_)/g,last=0,m;s=String(s||"").replace(/\[([^\]]+)\]\((https?:[^)\s]+)\)/g,"$1 ($2)");
  while((m=re.exec(s))){if(m.index>last)out.push({t:s.slice(last,m.index)});var x=m[0];
    if(/^\*\*\*/.test(x))out.push({t:x.slice(3,-3),b:1,i:1});else if(/^\*\*/.test(x))out.push({t:x.slice(2,-2),b:1});else out.push({t:x.slice(1,-1),i:1});last=re.lastIndex;}
  if(last<s.length)out.push({t:s.slice(last)});return out.filter(function(x){return x.t;});}
function r1Kind(md){md=String(md||"");return /^\s*#{1,6}\s/.test(md)?"h":/^\s*\|.*\|\s*$/.test(md)?"row":/^\s*(?:[-*•+]|\d+[.)])\s+/.test(md)?"li":"p";}
/* the words of a part: without its heading marks; a list's own marker goes only where Word numbers the list itself */
function r1Plain(md,list){md=String(md||"").replace(/^\s*#{1,6}\s+/,"").replace(/^\s*>\s?/,"");return list?md.replace(/^\s*(?:[-*•+]|\d+[.)])\s+/,""):md.replace(/^\s*[-*+]\s+/,"");}
function r1El(doc,tag){return doc.createElementNS(R1W,"w:"+tag);}
function r1SetW(doc,parent,tag,attrs){var e=r1El(doc,tag);Object.keys(attrs||{}).forEach(function(k){e.setAttributeNS(R1W,"w:"+k,attrs[k]);});parent.appendChild(e);return e;}
function r1FillPara(doc,p,md,isHead,isList){var keep=[],base=null,runs=r1RunsOf(p);
  for(var i=0;i<runs.length&&!base;i++){if(r1RunText(runs[i]).trim())base=r1Kid(runs[i],"rPr");}
  if(!base&&runs[0])base=r1Kid(runs[0],"rPr");
  for(var c=p.firstChild;c;){var nx=c.nextSibling;if(!(c.nodeType===1&&c.namespaceURI===R1W&&/^(pPr|bookmarkStart|bookmarkEnd)$/.test(c.localName)))p.removeChild(c);c=nx;}
  var segs=r1MdInline(isHead?r1Plain(md).replace(/^\*+|\*+$/g,""):r1Plain(md,isList));
  segs.forEach(function(sg){var r=r1El(doc,"r"),rp=base?base.cloneNode(true):null;
    if(sg.b){if(!rp)rp=r1El(doc,"rPr");if(!r1Kid(rp,"b"))rp.insertBefore(r1El(doc,"b"),rp.firstChild);}
    if(sg.i){if(!rp)rp=r1El(doc,"rPr");if(!r1Kid(rp,"i"))rp.appendChild(r1El(doc,"i"));}
    if(rp)r.appendChild(rp);
    String(sg.t).split(/(\t|\n)/).forEach(function(piece){if(piece==="\t")r1SetW(doc,r,"tab");else if(piece==="\n")r1SetW(doc,r,"br");else if(piece){var t=r1El(doc,"t");t.setAttributeNS("http://www.w3.org/XML/1998/namespace","xml:space","preserve");t.textContent=piece;r.appendChild(t);}});
    p.appendChild(r);});}
function r1NewPara(doc,ref,blk,st){var p=r1El(doc,"p"),rp=ref&&ref.kind==="p"?r1Kid(ref.el,"pPr"):null,ppr=rp?rp.cloneNode(true):null;
  var head=blk.kind==="h",li=blk.kind==="li";
  if(ppr){var ps=r1Kid(ppr,"pStyle"),np=r1Kid(ppr,"numPr");
    if(head){var sid=st.id[Math.min(blk.lvl,9)]||st.id[blk.lvl+1]||null;if(sid){if(!ps){ps=r1El(doc,"pStyle");ppr.insertBefore(ps,ppr.firstChild);}ps.setAttributeNS(R1W,"w:val",sid);}if(np)ppr.removeChild(np);}
    else{if(ps&&ref&&ref.lvl)ppr.removeChild(ps);if(np&&!li)ppr.removeChild(np);}}
  else if(head){var sid2=st.id[Math.min(blk.lvl,9)];if(sid2){ppr=r1El(doc,"pPr");r1SetW(doc,ppr,"pStyle",{val:sid2});}}
  if(ppr)p.appendChild(ppr);
  if(li&&!(ppr&&r1Kid(ppr,"numPr")))blk={md:"• "+r1Plain(blk.md,true),kind:"p",bul:1};
  r1FillPara(doc,p,blk.md,head,li&&!blk.bul);
  /* emphasis that was the reference's own (a bold heading) is not carried into a new body paragraph */
  return p;}
function r1SetRow(doc,tr,cells){r1Kids(tr,"tc").forEach(function(tc,i){if(i>=cells.length)return;var ps=r1Kids(tc,"p");if(!ps.length){ps=[r1El(doc,"p")];tc.appendChild(ps[0]);}
    r1FillPara(doc,ps[0],cells[i],false);for(var k=1;k<ps.length;k++)tc.removeChild(ps[k]);});}
/* the changes, applied to her Word file; only the ones she keeps (all, unless she switched some off) */
function r1ApplyDocx(b64,ops,newBlocks,off){var u8=b64ToBytes(b64);
  return r1DocxRead(u8).then(function(R){var doc=R.doc,units=R.units,st=R.st,addsAfter={};
    ops.forEach(function(op,k){if(off&&off[k])return;var u=op.o!=null?units[op.o]:null,b=newBlocks[op.n];
      if(op.op==="set"&&u){if(u.kind==="row"&&b.kind==="row")r1SetRow(doc,u.el,b.cells);else if(u.kind==="p")r1FillPara(doc,u.el,b.md,!!u.lvl,u.list);}
      else if(op.op==="del"&&u){if(u.kind==="row"){if(u.el.parentNode)u.el.parentNode.removeChild(u.el);}else if(u.el.parentNode)u.el.parentNode.removeChild(u.el);}
      else if(op.op==="add"){(addsAfter[op.after]=addsAfter[op.after]||[]).push(b);}});
    Object.keys(addsAfter).forEach(function(k){var at=+k,ref=units[at]||null,refP=ref;
      if(ref&&ref.kind==="row"){ref=null;for(var q=at;q>=0;q--)if(units[q].kind==="p"){refP=units[q];break;}}
      var anchor=units[at]?(units[at].kind==="row"?units[at].tbl:units[at].el):null;
      var nextRef=units[at+1]||null;
      addsAfter[k].forEach(function(b){var p=r1NewPara(doc,(refP&&refP.kind==="p")?refP:(nextRef&&nextRef.kind==="p"?nextRef:null),b,st);
        if(anchor&&anchor.parentNode){anchor.parentNode.insertBefore(p,anchor.nextSibling);anchor=p;}
        else{var body=doc.getElementsByTagNameNS(R1W,"body")[0],first=units[0]?(units[0].kind==="row"?units[0].tbl:units[0].el):null;
          if(first&&first.parentNode===body)body.insertBefore(p,first);else body.insertBefore(p,r1Kid(body,"sectPr"));anchor=p;}});});
    var xml=new XMLSerializer().serializeToString(doc);if(!/^<\?xml/.test(xml))xml='<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n'+xml;
    var files=R.zip.order.map(function(n){return {name:n,data:n==="word/document.xml"?new TextEncoder().encode(xml):R.zip.files[n]};});
    return makeZip(files);});}
/* the text of a changed plain or Markdown file */
function r1ApplyText(oldBlocks,newBlocks,ops,off){var out=oldBlocks.map(function(b){return [b.md];});var head=[];
  ops.forEach(function(op,k){if(off&&off[k])return;var b=newBlocks[op.n];
    if(op.op==="set")out[op.o]=[b.md];else if(op.op==="del")out[op.o]=[];else if(op.op==="add"){if(op.after<0)head.push(b.md);else out[op.after].push(b.md);}});
  return head.concat([].concat.apply([],out)).join("\n\n");}

/* ---------- 6. a reply that is the changed file: applied to her file ---------- */
function r1DocxOf(name,before){var ms=curMsgs(),at=ms.indexOf(before);if(at<0)at=ms.length;var want=edBase(name);
  for(var k=at-1;k>=0;k--){var x=ms[k];
    if(x.role==="bot"&&x.edits){var hit=x.edits.filter(function(e){return e.ref&&edBase(e.file)===want;}).pop();if(hit)return hit.docx||null;}
    if(x.role==="me"&&x.files){var f=x.files.filter(function(f){return edBase(f.name)===want;})[0];if(f)return f.docx||null;}}
  return null;}
function r1LooseDoc(text){var t=String(text||"").replace(/\r/g,"").trim();if(!t)return null;
  t=t.replace(/^```(?:markdown|md|text|txt)?\s*\n([\s\S]*?)\n```\s*$/i,"$1");
  var L=t.split("\n"),s=0,e=L.length;
  while(s<e&&s<3&&/^\s*(sure|certainly|of course|here(?:'s| is| are)|below is|i (?:have|'ve)|okay|ok|great|absolutely|the (?:revised|updated|corrected|edited)|i can(?:no|')t|i cannot|i'm unable|i am unable|however)\b/i.test(L[s])&&!/^\s*#/.test(L[s]))s++;
  while(e>s&&(!L[e-1].trim()||/^\s*(let me know|would you like|i hope|feel free|if you('d| would) like|shall i|do you want|note:|i changed|i have changed|changes made|summary of changes)/i.test(L[e-1])))e--;
  var md=L.slice(s,e).join("\n").trim();return md?{title:mkTitleOf(md),md:md,done:true,loose:true}:null;}
function r1ChangeFrom(mm,u,w){var text=String(mm.text||""),docs=mkDocsOf(text,true),d=docs[0]||null;
  return edSource(w.file,mm).then(function(src){if(!src)return false;
    var isPage=src.kind==="page",newText=null,title=src.name;
    if(isPage){var html=chatArtifactOf(text);if(!html||html.length<Math.min(200,src.text.length*0.3))return false;newText=html;}
    else{if(!d){d=r1LooseDoc(text);if(!d||mkWords(d.md)<Math.min(15,mkWords(src.text)*0.5))return false;}newText=d.md;}
    var dropOK=R1_DROP.test(String(u.text||""));
    if(isPage){var ob=src.text.split("\n"),nb=newText.split("\n");var oK=ob.map(function(x){return x.trim();}),nK=nb.map(function(x){return x.trim();});
      var ops=r1Align(oK,nK),pairs=[],n=0;ops.forEach(function(g){if(g.op!=="gap")return;n++;pairs.push({find:ob.slice(g.o,g.oe).join("\n").slice(0,4000),repl:nb.slice(g.n,g.ne).join("\n").slice(0,4000)});});
      if(!n)return false;var id=IngBig.newId();return IngBig.put(id,newText).then(function(){
        mm.edits=[{file:src.name,kind:"page",ok:n,bad:[],loose:0,pairs:pairs,chars:newText.length,ref:id,whole:true}];return true;});}
    var oldBlocks,docxRef=src.kind==="doc"?r1DocxOf(src.name,mm):null;
    var getOld=docxRef?IngBig.load(docxRef).then(function(b64){if(!b64){docxRef=null;return r1Blocks(src.text);}return r1DocxRead(b64ToBytes(b64)).then(function(R){
        return R.units.map(function(un){return {md:un.md,kind:un.kind==="row"?"row":(un.lvl?"h":(un.list?"li":"p")),cells:un.cells,lvl:un.lvl,plain:un.plain};});});}):Promise.resolve(r1Blocks(src.text));
    return getOld.then(function(ob){oldBlocks=ob;var nb=r1Blocks(newText).filter(function(b){return b.kind!=="code"||!docxRef;});
      /* an empty paragraph of hers lines up with nothing the model writes: it simply stays */
      var oMd=oldBlocks.map(function(b){return b.md;}),nMd=nb.map(function(b){return b.md;});
      var D=r1Diff(oMd,nMd,dropOK),ops=D.ops.filter(function(op){return !(op.op==="del"&&!r1Key(oMd[op.o]));});
      if(!ops.length){mm.r1same=1;return false;}
      var pairs=ops.map(function(op){return {find:op.o!=null?oMd[op.o]:(op.after>=0?"(after) "+oMd[op.after]:"(at the start)"),repl:op.op==="del"?"(removed)":nMd[op.n],op:op.op};});
      /* a change she did not ask for (a small model rewrites a paragraph it was told to leave) is switched off, and shown */
      var off={},un=0;ops.forEach(function(op,k){if(r1Unasked(String(u.text||""),op.o!=null?oMd[op.o]:"",op.op==="del"?"":nMd[op.n],op.op)){off[k]=true;pairs[k].unasked=1;un++;}});
      if(un===ops.length){off={};un=0;pairs.forEach(function(p){delete p.unasked;});}
      var e={file:src.name,kind:src.kind==="doc"?"doc":src.kind,ok:ops.length,bad:[],loose:0,pairs:pairs,whole:true,ops:ops,kept:D.kept,off:un?off:null,unasked:un,nb:nb.map(function(b){return {md:b.md,kind:b.kind,cells:b.cells,lvl:b.lvl};}),ob:docxRef?null:oldBlocks.map(function(b){return {md:b.md,kind:b.kind};})};
      return r1Build(e,docxRef).then(function(){mm.edits=[e];return true;});});});}
var R1_DROP=/\b(remove|delete|cut|drop|shorten|trim|condense|take out|get rid of|leave out|omit)\b/i;
/* her request names what is to change: a change that shares none of its words, when the request is not about the whole
   text (improve, proofread, a tone…), was not asked for */
var R1_WHOLE_ASK=/\b(improve|polish|proof-?read|rewrite|revise|edit|tone|formal|informal|shorten|tighten|condense|translate|all|whole|every|everything|throughout|entire|style|grammar|spelling|typos?|punctuation|clearer|simpler|better|fix it|consistent|consistency|british|american)\b/i;
var R1_STOP={};("the and for with that this from into onto your yours mine our ours their them they then than there here have has had was were are is be been being its it's not but can could should would will shall may might must please make made change changes changed rename renamed section sections paragraph paragraphs heading headings title subtitle line lines part parts document file text word words also just very more less").split(" ").forEach(function(w){R1_STOP[w]=1;});
function r1Words(s){var o={};String(s||"").toLowerCase().replace(/[*_#`>|]/g," ").split(/[^a-z0-9À-￿]+/).forEach(function(w){if(w&&(w.length>=3||/\d/.test(w))&&!R1_STOP[w])o[w]=1;});return o;}
function r1Unasked(req,oldMd,newMd,op){if(!req||R1_WHOLE_ASK.test(req))return false;if(op==="add"&&/\b(add|insert|include|append|write|new|extra|another|expand|more)\b/i.test(req))return false;
  if(op==="del"&&R1_DROP.test(req))return false;
  var R=r1Words(req),A=r1Words(oldMd),B=r1Words(newMd),hit=false;
  Object.keys(B).forEach(function(w){if(!A[w]&&R[w])hit=true;});Object.keys(A).forEach(function(w){if(!B[w]&&R[w])hit=true;});
  /* the part she named by its words (the section she quoted, a date) */
  if(!hit)Object.keys(R).forEach(function(w){if(A[w]&&w.length>=4&&/[a-z]/.test(w)&&String(req).toLowerCase().indexOf("\""+w)>=0)hit=true;});
  return !hit;}
/* the changed file, made again from her original and the changes she keeps */
function r1Build(e,docxRef){var off=e.off||null;
  if(docxRef||e.base){e.base=e.base||docxRef;return IngBig.load(e.base).then(function(b64){if(!b64)throw new Error("Your original Word file is no longer kept on this device.");
      return r1ApplyDocx(b64,e.ops,e.nb,off);}).then(function(bytes){return r1DocxRead(bytes).then(function(R){var did=IngBig.newId(),tid=IngBig.newId();
        return Promise.all([IngBig.put(did,r1B64(bytes)),IngBig.put(tid,R.md)]).then(function(){e.docx=did;e.ref=tid;e.chars=R.md.length;});});});}
  var t=r1ApplyText(e.ob,e.nb,e.ops,off),id=IngBig.newId();e.chars=t.length;return IngBig.put(id,t).then(function(){e.ref=id;});}

/* ---------- 7. turning her file into another kind, here ---------- */
function r1Convert(rec){var w=rec.want,name=w.file;if(!name)return false;
  var bot={role:"bot",text:"",live:true,local:true};curMsgs().push(bot);trimChat();saveState();renderChat();
  edSource(name,bot).then(function(src){delete bot.live;
    if(!src){bot.text="I could not find \""+name+"\" in this conversation. Attach it again, then ask once more.";saveState();renderChat();return;}
    var title=String(src.name||name).replace(/\.[^.]+$/,""),md=src.kind==="page"?null:(src.kind==="code"?"```\n"+src.text+"\n```":src.text);
    var label={pdf:"a PDF",docx:"a Word document",html:"a web page",md:"Markdown",txt:"plain text"}[w.fmt]||w.fmt;
    if(src.kind==="page"){bot.text="\""+src.name+"\" is a web page already. Save it with the preview's Download key, or press Save page under its card.";saveState();renderChat();return;}
    bot.doc={title:title,md:md,fmt:w.fmt};bot.text="Here is \""+src.name+"\" as "+label+". It was made on this device, without the model; press "+({pdf:"PDF",docx:"Word",html:"Web page",md:"Markdown",txt:"Text"}[w.fmt]||"a key")+" below to save it."+
      (src.kind==="doc"&&/\.docx$/i.test(src.name)?" Its text, headings, lists and tables are carried over; pictures inside the Word file are not.":"");
    bot.at=Date.now();bot.done=Date.now();bot.r1=1;saveState();renderChat();try{mkOpenDoc(bot,bot.doc,0);}catch(e){}},
    function(e){delete bot.live;bot.text="The file could not be read: "+(e&&e.message||e);saveState();renderChat();});
  return true;}

/* ---------- 8. every finished reply: the file it is, made whole ---------- */
var R1_REFUSE=/[^.!?\n]*\b(?:i\s+(?:can(?:'|’)?t|cannot|can not|am (?:not able|unable)|'m (?:not able|unable)|do(?: not|n't|n’t) have (?:the )?(?:ability|capability|access))|as an ai|as a (?:language|text)[- ]based|i'm (?:only )?a text|i am (?:only )?a text)\b[^.!?\n]*\b(?:create|generate|produce|make|edit|modify|change|open|save|attach|send|access|download|upload|export|write (?:to|into)|deliver)\b[^.!?\n]*\b(?:files?|documents?|docx|word|pdf|html|attachments?|your (?:device|computer)|directly|apps?)\b[^.!?\n]*[.!?]?[ \t]*/gi;
function r1Refused(t){R1_REFUSE.lastIndex=0;return R1_REFUSE.test(String(t||""));}
function r1Scrub(mm){var t=String(mm.text||"");R1_REFUSE.lastIndex=0;var c=t.replace(R1_REFUSE,"").replace(/^\s*(however|but),?\s*/i,"").replace(/\n{3,}/g,"\n\n").trim();
  if(c!==t){mm.rawText=t;mm.text=c?c.charAt(0).toUpperCase()+c.slice(1):c;}}
function r1Made(mm){var t=String(mm.text||"");return !!(mm.doc||mm.edits&&mm.edits.some(function(e){return e.ref;})||mkDocsOf(t,true).length||chatArtifactOf(t)||/```csv/i.test(t)||/<slides\b/i.test(t)||edBlocksOf(t).length);}
function r1LooseHtml(t){var m=/<!doctype html[\s\S]*<\/html>|<html[\s>][\s\S]*<\/html>/i.exec(String(t||""));return m?m[0]:null;}
function r1Finish(mm){var u=mkPrevMe(mm),w=u&&u.want;mm.r1=1;
  /* only a reply to a message sent with this build: an older conversation is left exactly as it was */
  if(!u||u.want===undefined)return Promise.resolve(false);
  var last=curMsgs()[curMsgs().length-1]===mm,fresh=last&&Date.now()-(mm.done||mm.at||0)<120000;
  var text=String(mm.text||""),p=Promise.resolve(false);
  if(w&&w.kind==="change"&&!edBlocksOf(text).length)p=r1ChangeFrom(mm,u,w).catch(function(e){try{console.error("R101 change",e);}catch(_){}mm.r1err=String(e&&e.message||e);return false;});
  return p.then(function(changed){
    if(!changed&&w&&(w.kind==="doc"||(w.kind==="change"&&!mm.edits))&&!mkDocsOf(text,true).length&&!mm.doc&&!chatArtifactOf(text)){var d=r1LooseDoc(text);
      if(d&&(mkWords(d.md)>=20||w.asked)&&!(r1Refused(d.md)&&mkWords(d.md)<60)){mm.doc={title:d.title,md:d.md,fmt:w.fmt||null};}}
    if(w&&w.kind==="page"&&!chatArtifactOf(text)){var h=r1LooseHtml(text);if(h){var i=text.indexOf(h);mm.text=(text.slice(0,i).trim()+"\n\n```html\n"+h+"\n```\n\n"+text.slice(i+h.length).trim()).trim();}}
    if(mm.doc&&w&&w.fmt&&!mm.doc.fmt)mm.doc.fmt=w.fmt;
    if(r1Made(mm))r1Scrub(mm);
    else if(fresh&&w&&w.kind&&w.kind!=="convert"&&r1Refused(text)&&!u.r1Strong){u.r1Strong=1;mm.note="The model said it could not do this, but here it can, so Ingenium asked it once more.";
      saveState();setTimeout(function(){try{mkTryAgain(mm);}catch(e){}},400);}
    if(u&&u.r1Strong&&!mm.note&&r1Made(mm))mm.note="Asked a second time: the first reply said it could not make files.";
    saveState();
    /* what was made opens beside the chat at once, as a page does */
    if(fresh)setTimeout(function(){try{if(curMsgs()[curMsgs().length-1]!==mm)return;
        var e0=(mm.edits||[]).filter(function(e){return e.ref&&e.whole;})[0];if(e0){if(e0.kind!=="page")edOpen(e0);return;}
        var dc=mm.doc||mkDocsOf(mm.text,true)[0];if(dc&&!(csCur&&csCur.msg===mm))mkOpenDoc(mm,dc,0);}catch(e){}},120);
    return true;});}
(function r1Hook(){var orig=fillMsg;
  fillMsg=function(d,mm,keep){orig(d,mm,keep);try{
      if(mm.role!=="bot"||mm.preview||mm.live||!mm.text)return;
      if(!mm.r1&&!R1.busy.has(mm)){R1.busy.add(mm);r1Finish(mm).then(function(){R1.busy.delete(mm);renderChat();},function(e){R1.busy.delete(mm);try{console.error("R101",e);}catch(_){}});return;}
      /* a document made for her change is shown as her changed file, not as a new document */
      if(mm.edits&&mm.edits.some(function(e){return e.whole;}))d.querySelectorAll(".mk-doc").forEach(function(c){c.remove();});
      /* the format she asked for comes first, and stands out */
      var fmt=(mm.doc&&mm.doc.fmt)||null;if(!fmt){var u=mkPrevMe(mm);fmt=u&&u.want&&u.want.fmt;}
      var lab={pdf:"PDF",docx:"Word",html:"Web page",md:"Markdown",txt:"Text"}[fmt];
      if(lab)d.querySelectorAll(".mk-doc .mk-card-acts").forEach(function(row){var b=[].filter.call(row.querySelectorAll(".msg-act"),function(x){return (x.getAttribute("data-mk-l")||x.textContent.trim())===lab;})[0];
        if(b){b.classList.add("r1-first");row.insertBefore(b,row.firstChild);}});
      /* an app's whole code is folded under its card, as Claude shows one: the bar stays, with Copy, Save and Show code */
      if(chatArtifactOf(mm.text))d.querySelectorAll("pre").forEach(function(pre){var bar=pre.querySelector(".md-bar"),code=pre.querySelector("code");if(!bar||!code||bar.querySelector(".r1-show"))return;
        var n=String(code.textContent||"").split("\n").length;if(n<26)return;var open=R1.open.has(mm);pre.classList.toggle("r1-folded",!open);
        var b=el("button","md-copy r1-show",open?"Hide code":"Show code ("+n.toLocaleString()+" lines)");b.type="button";b.title="Show or hide the code; the app itself runs in the preview";
        b.onclick=function(ev){ev.stopPropagation();if(R1.open.has(mm))R1.open.delete(mm);else R1.open.add(mm);var on=R1.open.has(mm);pre.classList.toggle("r1-folded",!on);b.textContent=on?"Hide code":"Show code ("+n.toLocaleString()+" lines)";};
        bar.insertBefore(b,bar.firstChild.nextSibling);});
      /* a changed Word file saves as a Word file, with her formatting */
      d.querySelectorAll(".ed-card").forEach(function(card,ix){var e=(mm.edits||[])[ix];if(!e||!e.whole)return;r1Card(card,mm,e);});}catch(e){try{console.error("R101 card",e);}catch(_){}}};
  window.fillMsg=fillMsg;})();
R1.busy=typeof WeakSet==="function"?new WeakSet():{has:function(){return false;},add:function(){},delete:function(){}};
R1.open=typeof WeakSet==="function"?new WeakSet():{has:function(){return false;},add:function(){},delete:function(){}};

/* ---------- 9. the card of her changed file ---------- */
function r1Card(card,mm,e){var sub=card.querySelector(".mk-card-sub"),on=e.ops?e.ops.length-(e.off?Object.keys(e.off).filter(function(k){return e.off[k];}).length:0):e.ok;
  if(sub)sub.textContent=on+" of "+e.ok+" change"+(e.ok===1?"":"s")+" applied to your file"+(e.docx?" (Word, formatting kept)":"")+
    (e.unasked?" · "+e.unasked+" you did not ask for left off (see Changes)":"")+(e.kept?" · "+e.kept+" part"+(e.kept===1?"":"s")+" the model left out kept as they were":"")+" · press to open it";
  var row=card.querySelector(".mk-card-acts");if(!row)return;
  [].forEach.call(row.querySelectorAll(".msg-act"),function(b){var l=b.getAttribute("data-mk-l")||b.textContent.trim();
    if(l==="Changes"){b.onclick=function(){r1Review(mm,e);};b.title="Read each change, and switch off any you do not want";}
    if(l==="Save"&&e.docx){b.onclick=function(){IngBig.load(e.docx).then(function(b64){if(!b64){ingToast("The changed file is no longer kept on this device.");return;}
        saveFileNative(e.file,"application/vnd.openxmlformats-officedocument.wordprocessingml.document",b64ToBytes(b64));});};b.title="Save the changed Word file, with its formatting";}});
  if(!row.querySelector(".r1-more")&&(e.kind==="doc"||e.kind==="text")){
    [["PDF",function(){IngBig.load(e.ref).then(function(t){if(t!=null)mkSavePdf({title:e.file.replace(/\.[^.]+$/,""),md:t});});},"Save the changed text as a PDF"],
     ["Web page",function(){IngBig.load(e.ref).then(function(t){if(t!=null){var ti=e.file.replace(/\.[^.]+$/,"");saveFileNative(mkDocFileName(ti)+".html","text/html",mkDocPage(ti,t));}});},"Save the changed text as a web page"]]
    .forEach(function(a){var b=el("button","msg-act r1-more",a[0]);b.type="button";b.title=a[2];b.onclick=a[1];row.appendChild(b);});
    try{mkQuiet(card);}catch(x){}}}
function r1Review(mm,e){var box=$("modalBox");box.classList.remove("pomo-card");e.off=e.off||{};
  box.innerHTML='<h3>Changes to '+esc(e.file)+'</h3><p class="small muted" style="margin-top:0">Each change the model made, as Ingenium applied it to your file. Red is what was there; green is what is there now. Switch off any change you do not want, then press Apply.'+(e.kept?' '+e.kept+' part'+(e.kept===1?'':'s')+' the model left out of its reply were kept as they were, since you did not ask to remove anything.':'')+'</p>'+
    '<div class="ed-diffs">'+e.pairs.map(function(p,i){var ok=!e.off[i];
      return '<div class="ed-diff r1-diff'+(ok?"":" off")+'"><label class="ed-n r1-pick"><input type="checkbox" data-i="'+i+'"'+(ok?" checked":"")+'> '+(i+1)+' · '+({set:"changed",add:"added",del:"removed"}[p.op]||"changed")+(p.unasked?' <span class="r1-unasked">not asked for: left off unless you switch it on</span>':'')+'</label>'+
        (p.op==="add"?'':'<pre class="ed-old">'+esc(p.find)+'</pre>')+(p.op==="del"?'':'<pre class="ed-new">'+esc(p.repl)+'</pre>')+'</div>';}).join("")+'</div>'+
    '<div style="display:flex;gap:8px;justify-content:flex-end;margin-top:14px"><button class="btn ghost" id="r1Cancel">Close</button><button class="btn primary" id="r1Apply">Apply</button></div>';
  [].forEach.call(box.querySelectorAll(".r1-pick input"),function(c){c.onchange=function(){var i=+c.getAttribute("data-i");e.off[i]=!c.checked;c.closest(".r1-diff").classList.toggle("off",!c.checked);};});
  box.querySelector("#r1Cancel").onclick=closeModal;
  box.querySelector("#r1Apply").onclick=function(){var b=this;b.disabled=true;b.textContent="Applying…";
    r1Build(e,null).then(function(){saveState();closeModal();renderChat();ingToast("Applied. Save the changed file from its card.");},
      function(err){b.disabled=false;b.textContent="Apply";ingToast("The changes could not be applied: "+(err&&err.message||err));});};
  openModal();}

/* ---------- 10. Make, in the + menu: she says what the reply should be ---------- */
var R1_MAKE=[["doc","A document","Word, PDF or a web page: a letter, CV, report, dossier…"],["page","An app or web page","It runs beside the chat and saves as one file"],
  ["sheet","A spreadsheet","An Excel workbook or a CSV file"],["slides","Slides","A PowerPoint deck or a slideshow"],["change","A change to my file","Applied to the file in this conversation, formatting kept"]];
function r1MakeLabel(k){var x=R1_MAKE.filter(function(r){return r[0]===k;})[0];return x?x[1]:k;}
(function r1Plus(){var op=paintPlus;
  paintPlus=function(view){if(view==="make"){var m=$("chatPlusMenu");m.innerHTML="";pmItem(m,null,"‹ Back","",function(){paintPlus();}).classList.add("pm-back");
      pmItem(m,null,"Auto","Ingenium works it out from your message",function(){delete state.makeNext;delete state.makeFmt;saveState();paintChips();closePlus();}).querySelector(".pm-check").textContent=state.makeNext?"":"✓";
      R1_MAKE.forEach(function(r){var b=pmItem(m,null,r[1],r[2],function(){state.makeNext=r[0];delete state.makeFmt;saveState();paintChips();closePlus();try{$("chatInput").focus();}catch(e){}});b.querySelector(".pm-check").textContent=state.makeNext===r[0]?"✓":"";});
      m.appendChild(el("div","ctx-note","The model writes it; Ingenium makes the file, so every model can, on every device."));return;}
    op.apply(this,arguments);
    if(!view){var m2=$("chatPlusMenu"),first=m2.querySelector(".pm-sep");
      var b=pmItem(m2,"file","Make",state.makeNext?r1MakeLabel(state.makeNext):"A document, an app, a spreadsheet, slides or a change",function(){paintPlus("make");},'<span class="pm-arw">›</span>');
      if(first)m2.insertBefore(b,first);}};
  window.paintPlus=paintPlus;
  var oc=paintChips;
  paintChips=function(){oc.apply(this,arguments);var box=$("chatChips");if(!box||!state.makeNext)return;
    var c=el("span","cchip acc r1-chip");c.title="The next message asks for this: Ingenium makes the file from the reply";c.appendChild(el("span","nm","📄 Make: "+r1MakeLabel(state.makeNext)));
    var x=el("button","cx","✕");x.type="button";x.title="Let Ingenium work it out";x.onclick=function(e){e.stopPropagation();delete state.makeNext;delete state.makeFmt;saveState();paintChips();};c.appendChild(x);box.insertBefore(c,box.firstChild);};
  window.paintChips=paintChips;})();
(function r1Css(){var s=document.createElement("style");s.id="r101-css";s.textContent=
  ".mk-card-acts .msg-act.r1-first{background:var(--fill-mid,#6a3fb5);color:#fff;border-color:transparent}"+
  ".mk-card-acts .msg-act.r1-first::before{filter:brightness(0) invert(1)}"+
  ".r1-diff .r1-pick{display:flex;align-items:center;gap:7px;cursor:pointer;font-weight:700}"+
  ".r1-diff.off pre{opacity:.38;text-decoration:line-through}"+
  ".r1-chip .nm{font-weight:700}"+
  ".r1-unasked{font-weight:600;font-size:11.5px;color:var(--warn,#b8791f);margin-left:4px}"+
  "pre.r1-folded>code{display:none}pre.r1-folded{padding-bottom:0}";document.head.appendChild(s);})();
window.IngR101={unasked:r1Unasked,want:r1Want,note:r1Note,docxRead:r1DocxRead,applyDocx:r1ApplyDocx,diff:r1Diff,blocks:r1Blocks,looseDoc:r1LooseDoc,refused:r1Refused,autoCtx:r1AutoCtx,changeFrom:r1ChangeFrom,build:r1Build};
;try{window.__ingParts["p33"]="running";}catch(_){}
</script>
