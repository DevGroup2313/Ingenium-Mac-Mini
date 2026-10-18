<script>try{(window.__ingParts=window.__ingParts||{})["p55"]="started";}catch(_){}
/* R131 · FROM CLAUDE
   The owner's words (18 October 2026): "I want to be able to import my data from Claude to Ingenium's chats so that it
   has the necessary context and be easier to continue working inside of the app. Please make sure that Ingenium has
   that capability and is able to take the information, read it and train my local models on it so that it is a smooth
   and seamless transition."
   What the export is: Anthropic's help page (support.claude.com/en/articles/9450526) says an export is asked for in
   Claude's Settings, Privacy, Export data, on the web or the desktop app (not the phone apps); a link comes by email and
   lasts 24 hours; it holds "conversation data and the user data for your account". The page does not describe the
   files, so nothing here depends on their names: every JSON file in the zip is read and recognised by its shape (a list
   of conversations with their messages, a list of projects with their documents, the account's own details), and what
   is not recognised is named, not guessed at.
   1. Bringing it in. The .zip as it came (or its .json files) is read on this device; nothing is sent anywhere. The
      conversations go to this device's larger store (IndexedDB, "ingenium_claude"), not the desk, so a long history
      does not crowd the desk. Claude projects become Ingenium projects, with their instructions and documents. The
      account's own details (email, name) are not read. Bringing in a newer export again adds what is new and updates
      what changed.
   2. Continuing here. Each conversation is listed under From Claude (the + key in Chat, the Conversations menu,
      Settings) and opens as an Ingenium conversation, with its files, ready to go on with any model on the device.
   3. Context in every chat. With "Draw on my Claude history" on, each message brings the passages of the whole history
      that match it (the same ranking as R36's long files), so a model on this device can answer from earlier work.
      It is not sent to a connection (a cloud model) unless the owner switches that on as well.
   4. A personal AI from it (every device): instructions from the Claude projects, examples of how the owner works
      chosen from the history, a list of every conversation, and the history drawn on in its chats. This changes what
      a model is given, not its weights.
   5. Training (Mac and Windows): the history as plain dialogue goes to Ingenium's trainer (llama.cpp's llama-finetune,
      R78), to train a small model from zero or train further one trained here. Honest limits, from llama.cpp's own
      notes on its trainer: it works for full-precision (FP32) models and is still being developed; its authors report a
      1B model needing about 24 GB of memory. So the trainer here trains Ingenium's own small models, which learn the
      history's words and patterns, not Claude's knowledge. For a larger model, "Training data (.jsonl)" writes the
      history in the chat format many fine-tuning tools read (each tool's own documentation says what it takes). */
(function(){
  var CL=window.IngClaude={};
  var DBN="ingenium_claude",dbp=null;
  function db(){if(dbp)return dbp;
    dbp=new Promise(function(res,rej){try{var rq=indexedDB.open(DBN,1);
      rq.onupgradeneeded=function(){var d=rq.result;try{if(!d.objectStoreNames.contains("conv"))d.createObjectStore("conv",{keyPath:"id"});if(!d.objectStoreNames.contains("meta"))d.createObjectStore("meta");}catch(e){}};
      rq.onsuccess=function(){res(rq.result);};rq.onerror=function(){rej(rq.error);};rq.onblocked=function(){rej(new Error("blocked"));};}catch(e){rej(e);}});
    dbp.catch(function(){dbp=null;});return dbp;}
  function tx(stores,mode,fn){return db().then(function(d){return new Promise(function(res,rej){var t=d.transaction(stores,mode),out={};fn(t,out);
    t.oncomplete=function(){res(out.v);};t.onerror=t.onabort=function(){rej(t.error||new Error("this device's store refused it (it may be full)"));};});});}
  function metaGet(k){return tx(["meta"],"readonly",function(t,o){var r=t.objectStore("meta").get(k);r.onsuccess=function(){o.v=r.result;};}).catch(function(){return null;});}
  function convGet(id){return tx(["conv"],"readonly",function(t,o){var r=t.objectStore("conv").get(id);r.onsuccess=function(){o.v=r.result||null;};}).catch(function(){return null;});}
  function convAll(){return tx(["conv"],"readonly",function(t,o){var r=t.objectStore("conv").getAll();r.onsuccess=function(){o.v=r.result||[];};}).catch(function(){return [];});}

  /* ---------- reading an export ---------- */
  function bufOf(f){return (typeof libReadBuf==="function")?libReadBuf(f):f.arrayBuffer();}
  function readFiles(list){var out=[],other=[],chain=Promise.resolve();
    [].slice.call(list||[]).forEach(function(f){chain=chain.then(function(){return bufOf(f).then(function(buf){var u8=new Uint8Array(buf);
      if(u8.length>3&&u8[0]===0x50&&u8[1]===0x4b){var ents=libZipEntries(u8);if(!ents)throw new Error(f.name+" is a zip this app cannot read");
        var names=Object.keys(ents),c2=Promise.resolve(),dec=new TextDecoder();
        names.forEach(function(n){if(/\/$/.test(n))return;if(!/\.json$/i.test(n)){other.push(n);return;}
          c2=c2.then(function(){return libZipData(u8,ents[n]).then(function(b){out.push({name:n,text:dec.decode(b)});},function(){other.push(n+" (could not be unpacked)");});});});
        return c2;}
      out.push({name:f.name,text:new TextDecoder().decode(u8)});});});});
    return chain.then(function(){return {files:out,other:other};});}
  function arr(x){return Array.isArray(x)?x:[];}
  function isConv(o){return o&&typeof o==="object"&&(Array.isArray(o.chat_messages)||Array.isArray(o.messages));}
  function isProj(o){return o&&typeof o==="object"&&!isConv(o)&&(Array.isArray(o.docs)||typeof o.prompt_template==="string")&&(o.name||o.uuid);}
  function isUser(o){return o&&typeof o==="object"&&(("email_address" in o)||("full_name" in o)||("verified_phone_number" in o));}
  function blockText(b){if(!b||typeof b!=="object")return typeof b==="string"?b:"";
    if(b.type==="text"&&typeof b.text==="string")return b.text;
    if(b.type==="tool_use"&&b.name)return "[used a tool: "+b.name+"]";
    return "";}
  function msgText(m){var t="";if(Array.isArray(m.content)){t=m.content.map(blockText).filter(Boolean).join("\n\n");}
    else if(typeof m.content==="string")t=m.content;
    if(!t.trim()&&typeof m.text==="string")t=m.text;
    return String(t||"").replace(/\r\n/g,"\n").trim();}
  function msgRole(m){var r=String(m.sender||m.role||(m.author&&m.author.role)||"").toLowerCase();
    return (r==="human"||r==="user")?"me":((r==="assistant"||r==="claude"||r==="model")?"bot":"");}
  function hashId(s){var h=2166136261;for(var i=0;i<s.length;i++){h^=s.charCodeAt(i);h=Math.imul(h,16777619);}return (h>>>0).toString(36);}
  function normConv(c){var ms=arr(c.chat_messages).length?c.chat_messages:arr(c.messages),out=[];
    ms.forEach(function(m){var r=msgRole(m);if(!r)return;var t=msgText(m),files=[];
      arr(m.attachments).forEach(function(a){var tx2=a&&(a.extracted_content||a.content);if(typeof tx2==="string"&&tx2.trim())files.push({name:String(a.file_name||a.name||"attachment.txt").slice(0,120),text:tx2});});
      var named=arr(m.files).map(function(x){return x&&(x.file_name||x.name);}).filter(Boolean);
      if(!t&&!files.length&&!named.length)return;
      out.push({r:r,t:t,at:String(m.created_at||m.create_time||""),files:files,named:named.slice(0,20)});});
    var first=out.filter(function(x){return x.r==="me"&&x.t;})[0];
    var title=String(c.name||c.title||"").trim()||(first?first.t.slice(0,60):"A conversation with Claude");
    var raw=String(c.uuid||c.id||(title+"|"+(c.created_at||"")));
    var chars=out.reduce(function(a,x){return a+x.t.length+x.files.reduce(function(b,f){return b+f.text.length;},0);},0);
    return {id:"cl_"+raw.replace(/[^A-Za-z0-9_-]+/g,"").slice(0,64)||"cl_"+hashId(raw),title:title.slice(0,140),created:String(c.created_at||c.create_time||""),
      updated:String(c.updated_at||c.update_time||c.created_at||""),project:String(c.project_uuid||(c.project&&(c.project.uuid||c.project.id))||""),msgs:out,n:out.length,chars:chars};}
  function normProj(p){return {uuid:String(p.uuid||p.id||hashId(String(p.name||""))),name:String(p.name||"A Claude project").slice(0,80),
      instructions:String(p.prompt_template||p.instructions||"").trim(),description:String(p.description||"").trim(),
      docs:arr(p.docs).map(function(d){return {name:String(d.filename||d.name||"document.txt").slice(0,120),text:String(d.content||d.text||"")};}).filter(function(d){return d.text.trim();})};}
  function parse(files){var convs=[],projs=[],notes=[],seen={};
    files.forEach(function(f){var j;try{j=JSON.parse(f.text);}catch(e){notes.push(f.name+": not JSON that this app can read");return;}
      var list=Array.isArray(j)?j:(j&&Array.isArray(j.conversations)?j.conversations:(j&&Array.isArray(j.projects)?j.projects:[j]));
      var c=0,p=0,u=0;
      list.forEach(function(o){if(isConv(o)){var k=normConv(o);if(k.n&&!seen[k.id]){seen[k.id]=1;convs.push(k);c++;}}else if(isProj(o)){projs.push(normProj(o));p++;}else if(isUser(o))u++;});
      if(u&&!c&&!p)notes.push(f.name+": your account's own details, which are not read");
      else if(!c&&!p)notes.push(f.name+": not recognised as conversations or projects, so it was left out");});
    return {convs:convs,projs:projs,notes:notes};}

  /* ---------- keeping it ---------- */
  function st(){state.claude=state.claude||{use:true,cloud:false};return state.claude;}
  function projFor(uuid){return (state.projects||[]).filter(function(p){return p.fromClaude===uuid;})[0]||null;}
  function keepProjects(projs){var added=0,more=0;state.projects=state.projects||[];
    projs.forEach(function(p){var ex=projFor(p.uuid),cap=(typeof FILE_MAX_CHARS==="number"?FILE_MAX_CHARS:1000000);
      var docs=p.docs.map(function(d){return {name:d.name,text:d.text.slice(0,cap)};});
      if(!ex){var ins=p.instructions+(p.description&&p.instructions.indexOf(p.description)<0?(p.instructions?"\n\n":"")+"About this project: "+p.description:"");
        state.projects.push({id:"pj"+uid(),name:p.name,instructions:ins.slice(0,20000),files:docs,fromClaude:p.uuid});added++;}
      else{/* a project already here keeps the owner's edits; only documents it does not have yet are added */
        var have={};(ex.files||[]).forEach(function(f){have[f.name]=1;});
        docs.forEach(function(d){if(!have[d.name]){ex.files=(ex.files||[]).concat([d]);more++;}});}});
    return {added:added,more:more};}
  CL.importFiles=function(list,say){say=say||function(){};
    if(!window.indexedDB)return Promise.reject(new Error("this browser keeps no larger store here (a private window, or storage switched off)"));
    say("Reading the export…");
    return readFiles(list).then(function(r){say("Reading "+r.files.length+" file"+(r.files.length===1?"":"s")+"…");
      var p=parse(r.files);
      if(!p.convs.length&&!p.projs.length)throw new Error("no conversations or projects were found in it"+(p.notes.length?" ("+p.notes.join("; ")+")":""));
      return metaGet("list").then(function(old){old=arr(old);var byId={};old.forEach(function(x){byId[x.id]=x;});var fresh=0,upd=0;
        var stores=[],i=0;
        function batch(){var part=p.convs.slice(i,i+40);if(!part.length)return Promise.resolve();
          say("Keeping the conversations: "+Math.min(i+part.length,p.convs.length)+" of "+p.convs.length+"…");
          return tx(["conv"],"readwrite",function(t){part.forEach(function(c){t.objectStore("conv").put(c);});}).then(function(){i+=part.length;return batch();});}
        return batch().then(function(){
          p.convs.forEach(function(c){if(byId[c.id])upd++;else fresh++;byId[c.id]={id:c.id,title:c.title,created:c.created,updated:c.updated,n:c.n,chars:c.chars,project:c.project};});
          var lst=Object.keys(byId).map(function(k){return byId[k];}).sort(function(a,b){return String(b.updated).localeCompare(String(a.updated));});
          var pk=keepProjects(p.projs);
          var tot=lst.reduce(function(a,x){return a+(x.chars||0);},0),msgs=lst.reduce(function(a,x){return a+(x.n||0);},0);
          var rec={at:Date.now(),convs:lst.length,msgs:msgs,chars:tot,projects:(state.projects||[]).filter(function(x){return x.fromClaude;}).length,other:r.other.slice(0,40),notes:p.notes};
          return tx(["meta"],"readwrite",function(t){t.objectStore("meta").put(lst,"list");t.objectStore("meta").put(rec,"info");}).then(function(){
            var s=st();s.n=lst.length;s.msgs=msgs;s.chars=tot;s.at=rec.at;saveState();IDX=null;
            try{if(navigator.storage&&navigator.storage.persist&&!/Firefox\//.test(navigator.userAgent))navigator.storage.persist().catch(function(){});}catch(e){}
            return {fresh:fresh,updated:upd,convs:lst.length,msgs:msgs,chars:tot,projAdded:pk.added,projDocs:pk.more,notes:p.notes,other:r.other};});});});});};
  CL.list=function(){return metaGet("list").then(arr);};
  CL.info=function(){return metaGet("info");};
  CL.get=convGet;
  CL.forget=function(){return tx(["conv","meta"],"readwrite",function(t){t.objectStore("conv").clear();t.objectStore("meta").clear();}).then(function(){var s=st();delete s.n;delete s.msgs;delete s.chars;delete s.at;saveState();IDX=null;});};

  /* ---------- continuing a conversation here ---------- */
  function fileBlock(files){return files.map(function(f){return "<file name=\""+String(f.name).replace(/"/g,"'")+"\">\n"+f.text+"\n</file>";}).join("\n\n");}
  CL.open=function(id){var ex=(state.chats||[]).filter(function(c){return c.fromClaude===id;})[0];
    if(ex){show(ex);return Promise.resolve(ex);}
    return convGet(id).then(function(c){if(!c)throw new Error("that conversation is no longer in this device's store");
      var pj=c.project?projFor(c.project):null;
      var chat={id:"c"+Date.now().toString(36)+Math.random().toString(36).slice(2,5),title:c.title,messages:[],fromClaude:c.id};
      if(pj)chat.projectId=pj.id;
      c.msgs.forEach(function(m){var x={role:m.r,text:m.t||""};
        if(m.r==="me"&&m.files&&m.files.length){x.attach=fileBlock(m.files);x.files=m.files.map(function(f){return {name:f.name,chars:f.text.length};});}
        if(m.named&&m.named.length&&!(m.files&&m.files.length))x.text=(x.text?x.text+"\n\n":"")+"[Files sent in Claude, not in the export: "+m.named.join(", ")+"]";
        chat.messages.push(x);});
      chat.messages.push({role:"bot",preview:true,text:"This conversation came from Claude ("+c.n+" message"+(c.n===1?"":"s")+"). Go on with it here: the model in use reads its latest part, and your Claude history is drawn on where it matches."});
      try{ingBigMigrate({chats:[chat]});}catch(e){}
      state.chats=state.chats||[];state.chats.push(chat);show(chat);return chat;});};
  /* the Chat page opens on the conversation it last showed (R112), so it is told which one first */
  function show(c){state.activeChat=c.id;try{if(typeof ccState==="function")ccState().activeChat=c.id;}catch(e){}saveState();try{go("chat");}catch(e){}try{renderChat();}catch(e){}}

  /* ---------- the history as context ---------- */
  var IDX=null,building=null;
  function phone(){return /Android|iPhone|iPad|iPod|Silk|Kindle/i.test(navigator.userAgent||"");}
  CL.build=function(){if(IDX)return Promise.resolve(IDX);if(building)return building;
    building=Promise.all([CL.list(),convAll()]).then(function(r){var lst=r[0],all=r[1],by={};all.forEach(function(c){by[c.id]=c;});
      var cap=phone()?12000000:60000000,used=0,convs=[],pass=[],post=Object.create(null),lens=[],total=0;
      lst.forEach(function(s){var c=by[s.id];if(!c||used>=cap)return;var ci=convs.length;convs.push({id:c.id,title:c.title,date:String(c.updated||c.created||"").slice(0,10)});
        var text=c.msgs.map(function(m){var f=m.files&&m.files.length?"\n[files: "+m.files.map(function(x){return x.name;}).join(", ")+"]":"";return (m.r==="me"?"Me: ":"Claude: ")+m.t+f;}).join("\n\n");
        used+=text.length;docSplit(text).forEach(function(ch){pass.push({c:ci,t:ch.text});});});
      var i=0;
      return new Promise(function(res){(function step(){var end=Math.min(pass.length,i+1500);
        for(;i<end;i++){var terms=docTerms(pass[i].t),tf=Object.create(null);terms.forEach(function(w){tf[w]=(tf[w]||0)+1;});
          for(var w in tf){var pl=post[w]||(post[w]=[]);pl.push(i,tf[w]);}lens.push(terms.length||1);total+=terms.length;}
        if(i<pass.length)setTimeout(step,0);else res();})();}).then(function(){
        IDX={convs:convs,pass:pass,post:post,lens:lens,avg:total/Math.max(1,pass.length)||1,cut:used>=cap,chars:used};building=null;return IDX;});});
    building.catch(function(){building=null;});return building;};
  CL.passages=function(query,room){var q=docTerms(query);if(!q.length||room<400)return Promise.resolve("");
    return CL.build().then(function(I){var N=I.pass.length;if(!N)return "";var sc=new Float64Array(N),hit=[],uq={};q.forEach(function(w){uq[w]=1;});
      Object.keys(uq).forEach(function(w){var pl=I.post[w];if(!pl)return;var df=pl.length/2,idf=Math.log(1+(N-df+0.5)/(df+0.5));
        for(var k=0;k<pl.length;k+=2){var p=pl[k],f=pl[k+1];if(!sc[p])hit.push(p);sc[p]+=idf*f*2.2/(f+1.2*(0.25+0.75*I.lens[p]/I.avg));}});
      if(!hit.length)return "";hit.sort(function(a,b){return sc[b]-sc[a];});
      var top=sc[hit[0]],keep=[],per={},used=0;
      for(var j=0;j<hit.length&&j<400;j++){var p=hit[j],c=I.pass[p].c;if(sc[p]<top*0.3)break;if((per[c]||0)>=2)continue;var t=I.pass[p].t.trim();if(used+t.length>room){if(keep.length)continue;t=t.slice(0,room);}
        keep.push({p:p,c:c,t:t});per[c]=(per[c]||0)+1;used+=t.length;if(used>=room*0.95)break;}
      return "[From the person's earlier conversations with Claude, brought into Ingenium: the passages that match this message. They are the person's own past work: use them where they help, say when an answer draws on them, and never claim more was said than they show.]\n"+
        keep.map(function(k){var cv=I.convs[k.c];return "<passage chat=\""+String(cv.title).replace(/"/g,"'")+"\""+(cv.date?" date=\""+cv.date+"\"":"")+">\n"+k.t+"\n</passage>";}).join("\n");});};
  function useHistory(){var s=state.claude;return !!(s&&s.n&&s.use!==false);}
  var opPrep=chatPrepare;
  chatPrepare=function(rec,bot){var self=this,args=arguments;
    return opPrep.apply(self,args).then(function(prep){
      try{if(!useHistory()||!rec||rec.webCtx)return prep;
        if(chatSource()==="cloud"&&!state.claude.cloud)return prep;
        var q=String(rec.text||"").trim();if(q.length<8)return prep;
        var room=Math.max(800,Math.min(6000,Math.floor(chatBudget()*0.2)));
        if(bot&&bot.live){bot.status="Looking through your Claude history…";try{renderChat();}catch(e){}}
        return CL.passages(q,room).then(function(h){if(bot)bot.status="";if(!h)return prep;var p={};for(var k in (prep||{}))p[k]=prep[k];
          p.context=(p.context?p.context+"\n\n":"")+h;return p;},function(){if(bot)bot.status="";return prep;});}catch(e){return prep;}});};
  window.chatPrepare=chatPrepare;

  /* ---------- a personal AI made from the history ---------- */
  function pickExamples(all,max){var cands=[];
    all.forEach(function(c){for(var i=0;i+1<c.msgs.length;i++){var a=c.msgs[i],b=c.msgs[i+1];
      if(a.r==="me"&&b.r==="bot"&&a.t.length>=40&&a.t.length<=1500&&b.t.length>=200&&b.t.length<=4000)cands.push({c:c.id,u:c.updated||"",q:a.t,a:b.t});}});
    cands.sort(function(x,y){return String(y.u).localeCompare(String(x.u));});
    var out=[],seen={};for(var i=0;i<cands.length&&out.length<max;i++){if(seen[cands[i].c])continue;seen[cands[i].c]=1;out.push({q:cands[i].q.slice(0,4000),a:cands[i].a.slice(0,8000)});}
    return out;}
  CL.makeAI=function(){return Promise.all([CL.list(),convAll()]).then(function(r){var lst=r[0],all=r[1];if(!all.length)throw new Error("bring in a Claude export first");
    var cap=(typeof FILE_MAX_CHARS==="number"?FILE_MAX_CHARS:1000000),files=[];
    var titles=lst.map(function(x){return String(x.updated||x.created||"").slice(0,10)+"  "+x.title+" ("+x.n+" messages)";}).join("\n");
    files.push({name:"My Claude conversations (list).txt",text:("Every conversation brought in from Claude, newest first:\n"+titles).slice(0,cap)});
    var pj=(state.projects||[]).filter(function(p){return p.fromClaude;});
    if(pj.length)files.push({name:"My Claude projects (instructions).txt",text:pj.map(function(p){return "## "+p.name+"\n"+(p.instructions||"(no instructions)");}).join("\n\n").slice(0,cap)});
    var ai={id:"ai"+uid(),name:"From my Claude work",emoji:"✦",color:"#6a3fb5",
      purpose:"Goes on with the person's work from their conversations with Claude, which were brought into Ingenium on this device.",
      role:"A careful assistant who knows the person's past conversations and projects through the passages and files it is given.",
      method:"When passages from the person's Claude conversations come with a message, use them, and say when an answer draws on them (for example: In your earlier conversation \"...\"). When they do not cover a question, say so and answer from what you know. Never claim a conversation said more than its passages show.",
      tone:"",format:"",always:"",never:"Invent what was said in an earlier conversation.",
      examples:pickExamples(all,typeof AI_MAX_EXAMPLES==="number"?AI_MAX_EXAMPLES:12),lessons:[],habits:{},files:files.slice(0,typeof AI_MAX_FILES==="number"?AI_MAX_FILES:6),
      settings:{},tools:{},baseName:"",baseFile:"",fromClaude:true};
    if(state.activeModelId)ai.base=state.activeModelId;
    state.ownAIs=(state.ownAIs||[]).filter(function(x){return !x.fromClaude;}).concat([ai]);st().use=true;saveState();try{renderOwnAIs();}catch(e){}
    return ai;});};

  /* ---------- training data ---------- */
  CL.jsonl=function(){return convAll().then(function(all){return all.map(function(c){var msgs=[];
      c.msgs.forEach(function(m){var content=m.t+(m.files&&m.files.length?"\n\n"+fileBlock(m.files):"");if(!content.trim())return;
        var role=m.r==="me"?"user":"assistant";if(msgs.length&&msgs[msgs.length-1].role===role)msgs[msgs.length-1].content+="\n\n"+content;else msgs.push({role:role,content:content});});
      while(msgs.length&&msgs[0].role!=="user")msgs.shift();
      return msgs.length>=2?JSON.stringify({messages:msgs}):"";}).filter(Boolean).join("\n")+"\n";});};
  CL.plain=function(max){max=max||8*1024*1024;return Promise.all([CL.list(),convAll()]).then(function(r){var by={};r[1].forEach(function(c){by[c.id]=c;});var out=[],n=0;
    r[0].some(function(s){var c=by[s.id];if(!c)return false;var t="# "+c.title+"\n\n"+c.msgs.map(function(m){return (m.r==="me"?"### Me\n":"### Claude\n")+m.t;}).join("\n\n")+"\n\n";
      if(n+t.length>max){if(!out.length)out.push(t.slice(0,max));return true;}out.push(t);n+=t.length;return false;});
    return out.join("");});};
  CL.train=function(fromId){var a=(typeof trainApi==="function")?trainApi():null;if(!a)return Promise.reject(new Error("training runs in the Ingenium app on a Mac or Windows computer"));
    return CL.plain().then(function(t){if(t.length<2000)throw new Error("the history is too short to train on (it needs at least 2,000 characters)");
      window.__trainPreset={name:"Trained on my Claude chats",text:t};openTrainer(fromId||null);});};

  /* ---------- the panel ---------- */
  function n0(x){try{return Number(x||0).toLocaleString("en-GB");}catch(e){return String(x||0);}}
  function when(t){try{return new Date(t).toLocaleDateString("en-GB",{day:"numeric",month:"long",year:"numeric"});}catch(e){return "";}}
  CL.openPanel=function(){var box=modalOpen('<div class="cl-panel"><h3>From Claude</h3><div id="clBody"></div></div>');box.classList.add("cl-box");paintPanel(box);return box;};
  function paintPanel(box){var b=box.querySelector("#clBody");if(!b)return;
    Promise.all([CL.info(),CL.list()]).then(function(r){var info=r[0],lst=r[1],s=st(),train=(typeof trainApi==="function")&&trainApi();
      var h='<p class="small muted">Bring your conversations with Claude into Ingenium, to go on with them here, to have them drawn on in every chat, and to make a personal AI from them. It is read on this device; nothing is sent anywhere.</p>'
        +'<details class="cl-how"'+(lst.length?'':' open')+'><summary>How to get your Claude export</summary><ol class="small"><li>In Claude on the web or the desktop app (the phone apps cannot export), open Settings, then Privacy, then Export data.</li><li>Anthropic sends a download link by email. It lasts 24 hours.</li><li>Choose the .zip here as it came. Nothing needs unpacking.</li></ol></details>'
        +'<div class="cl-drop" id="clDrop" tabindex="0" role="button"><b>Choose your Claude export</b><span class="small muted">the .zip, or its .json files · or drop them here</span><input type="file" id="clIn" accept=".zip,.json,application/zip,application/json" multiple hidden></div>'
        +'<div class="small" id="clSay" role="status"></div>';
      if(lst.length){
        h+='<div class="cl-sum small">'+n0(lst.length)+' conversation'+(lst.length===1?'':'s')+' · '+n0(info&&info.msgs)+' messages · '+(typeof fmtBytes==="function"?fmtBytes(info&&info.chars||0):"")+' of text'
          +((info&&info.projects)?' · '+info.projects+' project'+(info.projects===1?'':'s'):'')+(info&&info.at?' · brought in on '+when(info.at):'')+'</div>'
          +'<label class="cl-sw"><input type="checkbox" id="clUse"'+(s.use!==false?' checked':'')+'><span><b>Draw on my Claude history in chats</b><br><span class="small muted">Each message brings the passages of your history that match it, for the model on this device.</span></span></label>'
          +'<label class="cl-sw"><input type="checkbox" id="clCloud"'+(s.cloud?' checked':'')+'><span><b>Also for a connection</b><br><span class="small muted">Off: your history is never sent to a cloud model you have connected.</span></span></label>'
          +'<div class="cl-acts"><button class="btn small" id="clAI">Make a personal AI from it</button>'
          +(train?'<button class="btn small" id="clTrain">Train a model on it</button>':'')
          +'<button class="btn small ghost" id="clJsonl">Training data (.jsonl)</button><button class="btn small ghost" id="clText">As plain text (.txt)</button></div>'
          +(train?'':'<p class="small muted">Training runs in the Ingenium app on a Mac or Windows computer. On this device the personal AI and the history in every chat do the work.</p>')
          +'<input type="search" id="clQ" placeholder="Find a conversation" class="cl-q"><div class="cl-list" id="clList"></div>'
          +'<div class="cl-foot"><button class="btn small ghost danger" id="clForget">Remove the Claude history from this device</button></div>';}
      h+='<div style="display:flex;justify-content:flex-end;margin-top:12px"><button class="btn" id="clX">Close</button></div>';
      b.innerHTML=h;
      var say=function(t,bad){var e=b.querySelector("#clSay");if(e){e.textContent=t||"";e.className="small"+(bad?" cl-bad":"");}};
      var inp=b.querySelector("#clIn"),drop=b.querySelector("#clDrop");
      function take(files){if(!files||!files.length)return;CL.importFiles(files,say).then(function(r){
          var t="Brought in "+n0(r.convs)+" conversation"+(r.convs===1?"":"s")+" ("+n0(r.fresh)+" new, "+n0(r.updated)+" updated; "+n0(r.msgs)+" messages)"+(r.projAdded?", and "+r.projAdded+" project"+(r.projAdded===1?"":"s"):"")+(r.projDocs?", with "+r.projDocs+" new document"+(r.projDocs===1?"":"s")+" for projects already here":"")+".";
          if(r.notes&&r.notes.length)t+=" Not read: "+r.notes.join("; ")+".";
          if(r.other&&r.other.length)t+=" Left aside (not conversation text): "+r.other.slice(0,6).join(", ")+(r.other.length>6?" and "+(r.other.length-6)+" more":"")+".";
          ingToast("Your Claude history is here: "+n0(r.convs)+" conversations.");paintPanel(box);setTimeout(function(){say(t);},60);
          CL.build().catch(function(){});},function(e){say("That could not be brought in: "+(e&&e.message?e.message:e)+".",true);});}
      inp.onchange=function(){var f=inp.files;take(f);inp.value="";};
      drop.onclick=function(){inp.click();};drop.onkeydown=function(e){if(e.key==="Enter"||e.key===" "){e.preventDefault();inp.click();}};
      drop.ondragover=function(e){e.preventDefault();drop.classList.add("on");};drop.ondragleave=function(){drop.classList.remove("on");};
      drop.ondrop=function(e){e.preventDefault();drop.classList.remove("on");take(e.dataTransfer&&e.dataTransfer.files);};
      b.querySelector("#clX").onclick=closeModal;
      if(!lst.length)return;
      b.querySelector("#clUse").onchange=function(){s.use=this.checked;saveState();};
      b.querySelector("#clCloud").onchange=function(){s.cloud=this.checked;saveState();};
      b.querySelector("#clAI").onclick=function(){CL.makeAI().then(function(ai){var c=curChat();c.aiId=ai.id;saveState();try{paintChips();}catch(e){}
        say(ai.name+" is made, with "+ai.examples.length+" examples of how you work and "+ai.files.length+" file"+(ai.files.length===1?"":"s")+", on "+(aiBaseRec(ai)?aiBaseRec(ai).customName:"the model in use")+". It answers in this conversation now; Models, Your AIs holds it.");},function(e){say(String(e&&e.message||e),true);});};
      var tb=b.querySelector("#clTrain");if(tb)tb.onclick=function(){var tm=(state.models||[]).filter(function(m){return m.trained;});
        var from=null;if(tm.length&&confirm("Train further "+tm[tm.length-1].customName+" (trained here before)? Cancel trains a new small model from zero."))from=tm[tm.length-1].id;
        CL.train(from).catch(function(e){say(String(e&&e.message||e),true);});};
      b.querySelector("#clJsonl").onclick=function(){say("Writing the training data…");CL.jsonl().then(function(t){saveFileNative("claude-history-chat.jsonl","application/jsonl",t);say("Written: one conversation per line, in the chat format (a list of user and assistant messages) that many fine-tuning tools read. Check your tool's own documentation for what it takes.");});};
      b.querySelector("#clText").onclick=function(){CL.plain(64*1024*1024).then(function(t){saveFileNative("claude-history.txt","text/plain",t);});};
      b.querySelector("#clForget").onclick=function(){if(!confirm("Remove the Claude history from this device? Conversations you opened here, the projects it made and the personal AI stay."))return;CL.forget().then(function(){paintPanel(box);});};
      var q=b.querySelector("#clQ"),L=b.querySelector("#clList");
      function list(){var t=String(q.value||"").toLowerCase().trim(),k=0;L.innerHTML="";
        lst.forEach(function(x){if(t&&String(x.title).toLowerCase().indexOf(t)<0)return;if(++k>300)return;
          var row=el("div","cl-row"),here=(state.chats||[]).some(function(c){return c.fromClaude===x.id;});
          row.innerHTML='<span class="cl-t">'+esc(x.title)+'<span class="small muted">'+esc(String(x.updated||x.created||"").slice(0,10))+' · '+x.n+' message'+(x.n===1?'':'s')+'</span></span>';
          var go2=el("button","btn small",here?"Open":"Continue here");go2.onclick=function(){CL.open(x.id).then(function(){closeModal();},function(e){say(String(e&&e.message||e),true);});};
          row.appendChild(go2);L.appendChild(row);});
        if(k>300)L.appendChild(el("div","small muted","Showing 300 of "+n0(k)+": type a few words to find one."));
        if(!k)L.appendChild(el("div","small muted","No conversation has that in its title."));}
      q.oninput=list;list();});}

  /* ---------- the ways in ---------- */
  PM_ICONS.claude=PM_ICONS.claude||'<path d="M12 3v11"/><path d="M8 10l4 4 4-4"/><path d="M4 15v3a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-3"/>';
  var opPlus=paintPlus;
  paintPlus=function(view){var r=opPlus.apply(this,arguments);if(view)return r;
    try{var m=$("chatPlusMenu"),gh=null;[].slice.call(m.querySelectorAll(".pm-item")).forEach(function(b){if(/Add from GitHub/.test(b.textContent))gh=b;});
      var tmp=document.createElement("div"),s=state.claude||{};
      pmItem(tmp,"claude","From Claude",s.n?(n0(s.n)+" conversations here"+(s.use!==false?", drawn on in chats":"")):"Bring in your Claude conversations",function(){closePlus();CL.openPanel();});
      var it=tmp.firstElementChild;if(gh&&gh.nextSibling)m.insertBefore(it,gh.nextSibling);else m.appendChild(it);}catch(e){}
    return r;};
  window.paintPlus=paintPlus;
  var opConv=paintConvMenu;
  paintConvMenu=function(){var r=opConv.apply(this,arguments);try{var m=$("chatConvMenu"),b=el("button","menu-btn","From Claude…");
      b.onclick=function(){closeChatMenus();CL.openPanel();};m.appendChild(b);}catch(e){}return r;};
  window.paintConvMenu=paintConvMenu;
  function settingsKey(){var ex=document.getElementById("exportApp");if(!ex||document.getElementById("clSetKey"))return;
    var k=el("button","btn small ghost","Bring in your Claude data");k.id="clSetKey";k.onclick=function(){CL.openPanel();};ex.parentNode.insertBefore(k,ex.nextSibling);}
  settingsKey();setTimeout(settingsKey,1500);
  /* the tour: the chat card says Claude conversations come in (5.5, R131) */
  try{if(typeof ING_TOUR!=="undefined"&&Array.isArray(ING_TOUR))ING_TOUR.forEach(function(c){if(c&&c.chap==="Chat"&&c.sub==="Choosing and adding"&&typeof c.b==="string"&&c.b.indexOf("From Claude")<0)
    c.b+=" From Claude, under the + key, brings in your Claude export: each conversation can be continued here, and the passages of your history that match a message come with it to the model on this device.";});}catch(e){}
})();
;try{window.__ingParts["p55"]="running";}catch(_){}
</script>
<style id="r131-css">
.cl-box{max-width:720px}
.cl-panel h3{margin-bottom:6px}
.cl-how{margin:6px 0 10px}.cl-how summary{cursor:pointer;font-weight:600;font-size:13.5px}.cl-how ol{margin:6px 0 0 18px;line-height:1.55}
.cl-drop{display:flex;flex-direction:column;gap:3px;align-items:center;justify-content:center;padding:18px 14px;border-radius:14px;border:1.5px dashed var(--hairline,rgba(0,0,0,.18));background:var(--card-hi,#fff);cursor:pointer;text-align:center;box-shadow:0 1px 0 rgba(255,255,255,.6) inset,0 6px 16px rgba(40,20,70,.08);transition:transform .18s ease,box-shadow .18s ease}
.cl-drop:hover,.cl-drop.on{transform:translateY(-2px);box-shadow:0 1px 0 rgba(255,255,255,.6) inset,0 12px 24px rgba(40,20,70,.14)}
.cl-drop:active{transform:translateY(1px)}
#clSay{min-height:18px;margin:8px 0 4px;line-height:1.5}#clSay.cl-bad{color:var(--danger,#b3261e)}
.cl-sum{font-weight:600;margin:6px 0 8px}
.cl-sw{display:flex;gap:10px;align-items:flex-start;margin:6px 0;cursor:pointer}.cl-sw input{margin-top:4px}
.cl-acts{display:flex;flex-wrap:wrap;gap:8px;margin:10px 0}
.cl-q{width:100%;margin:6px 0;padding:8px 11px;border-radius:10px;border:1px solid var(--hairline,rgba(0,0,0,.15));background:var(--card,#fff);color:inherit;font:inherit}
.cl-list{max-height:min(46vh,420px);overflow:auto;border-top:1px solid var(--hairline-soft,rgba(0,0,0,.07))}
.cl-row{display:flex;align-items:center;gap:10px;padding:8px 2px;border-bottom:1px solid var(--hairline-soft,rgba(0,0,0,.07))}
.cl-t{flex:1;min-width:0;display:flex;flex-direction:column;gap:2px;overflow-wrap:anywhere;font-size:13.5px}
.cl-foot{margin-top:10px}
@media (max-width:640px){.cl-row{flex-wrap:wrap}.cl-row .btn{margin-left:auto}}
@media (prefers-reduced-motion:reduce){.cl-drop{transition:none}}
</style>
