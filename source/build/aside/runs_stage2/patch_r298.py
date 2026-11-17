"""Stage 2 of Fabrica's runs on her other computers, in modules/r298.js (Fabrica's Runs, Workflows and Machines), as her approved
phase 3 preview has them (source/previews/fabrica_p3/app.js: MACHINES, machines(), runSheet()):
  - her other computers (paired in Settings, Your devices, with Run Fabrica's jobs for my devices on: modules/r274.js) are machines:
    each with its tools (GET /ingenium/runs/tools), Ready, Asleep, Runs off there, or Type its code again; Check it again; How to add
    what is missing; Add a machine;
  - the run sheet: As the workflow says (each job on a computer of the system it names: this one, or a paired one), Only on this
    computer, Only on <a paired computer>, and Only on GitHub's machines (in a coming release);
  - a run on another computer goes through the same calls as a run here (runs_new, runs_put, runs_go, runs_get, runs_log, runs_file,
    runs_stop, runs_forget), sent to that computer (build/desktop/app_runs_728.py); its id here is "m:<computer>:<run>", so every view
    that follows a run follows it there; it says where it ran;
  - a device that runs nothing itself (the Fire tablet, the iPhone, the iPad, a browser) sends its runs to her computers;
  - a run on another computer, once ended, is kept here too (record, every log, every file) when this is a computer app
    (runs_keep_copy, runs_keep_log, runs_keep_file), and the copy then stands for it.
    python3 -I patch_r298.py <modules folder>"""
import sys, os
p = os.path.join(sys.argv[1], "r298.js")
s = open(p, encoding="utf-8").read()


def rep(a, b, n=1):
    global s
    c = s.count(a)
    if c != n:
        sys.exit("r298: expected %d, found %d: %r" % (n, c, a[:110]))
    s = s.replace(a, b)


if "function others(" in s:
    sys.exit("r298 already patched")

# ---------- 1. the calls: here, or on another of her computers ----------
rep('''function call(name,args){var a=A();if(!a||typeof a[name]!=="function")return Promise.reject(new Error(NOHERE));
  return Promise.resolve(a[name].apply(a,args||[])).then(function(x){if(!x||x.ok===false)throw new Error((x&&x.error)||"It could not be done.");return x;});}''',
'''/* 7.30: a call goes here (the computer app) or, for a run on another of her computers, to that computer (modules/r274.js,
   IngLend.request; build/desktop/app_runs_728.py). A run there is known here as "m:<computer>:<run>". */
function call(name,args,mid){args=args||[];
  if(!mid&&isRemote(args[0])){var sp=split(args[0]);mid=sp.mid;args=[sp.rid].concat(args.slice(1));}
  if(mid&&mid!=="here")return remote(mid,name,args).then(function(x){return tag(x,mid,name);});
  var a=A();if(!a||typeof a[name]!=="function")return Promise.reject(new Error(NOHERE));
  return Promise.resolve(a[name].apply(a,args)).then(function(x){if(!x||x.ok===false)throw new Error((x&&x.error)||"It could not be done.");return x;});}
/* ---------- 7.30: her other computers, paired in Settings, Your devices, each running Fabrica's jobs for her devices ---------- */
var MC={};
function LEND(){return W.IngLend&&typeof W.IngLend.request==="function"?W.IngLend:null;}
function others(){var l=LEND();if(!l)return [];try{return (l.state().computers||[]).filter(function(c){return c.runs;});}catch(e){return [];}}
function paired(){var l=LEND();if(!l)return [];try{return l.state().computers||[];}catch(e){return [];}}
function byMid(mid){var a=paired();for(var i=0;i<a.length;i++)if(a[i].id===mid)return a[i];return {id:mid,name:"your other computer",kind:"laptop"};}
function canRun(){return !!A()||others().length>0;}
function isRemote(id){return typeof id==="string"&&id.indexOf("m:")===0;}
function rid0(mid,rid){return "m:"+encodeURIComponent(mid)+":"+rid;}
function split(id){var s=String(id).slice(2),i=s.indexOf(":");return {mid:decodeURIComponent(s.slice(0,i)),rid:s.slice(i+1)};}
function enc(v){return encodeURIComponent(v==null?"":String(v));}
var RQ={runs_tools:function(a){return ["GET","/ingenium/runs/tools"+(a[0]?"?fresh=1":"")];},runs_list:function(){return ["GET","/ingenium/runs/list"];},
  runs_get:function(a){return ["GET","/ingenium/runs/get?rid="+enc(a[0])];},runs_log:function(a){return ["GET","/ingenium/runs/log?rid="+enc(a[0])+"&job="+enc(a[1])+"&offset="+(+a[2]||0)];},
  runs_file:function(a){return ["GET","/ingenium/runs/file?rid="+enc(a[0])+"&art="+enc(a[1])+"&path="+enc(a[2])+"&offset="+(+a[3]||0)+"&size="+(+a[4]||4194304)];},
  runs_new:function(a){return ["POST","/ingenium/runs/new",{spec:a[0]}];},runs_put:function(a){return ["POST","/ingenium/runs/put",{rid:a[0],path:a[1],b64:a[2],mode:a[3],append:!!a[4]}];},
  runs_go:function(a){return ["POST","/ingenium/runs/go",{rid:a[0]}];},runs_stop:function(a){return ["POST","/ingenium/runs/stop",{rid:a[0]}];},runs_forget:function(a){return ["POST","/ingenium/runs/forget",{rid:a[0]}];}};
function remote(mid,name,args){var l=LEND(),f=RQ[name];if(!l)return Promise.reject(new Error("This copy of Ingenium cannot reach your other computers."));
  if(!f)return Promise.reject(new Error("That is done on the computer that ran it, "+byMid(mid).name+"."));var q=f(args);
  return l.request(mid,q[0],q[1],q[2],name==="runs_put"||name==="runs_file"?180:40).then(function(x){if(!x||x.ok===false)throw new Error((x&&x.error)||"It could not be done.");if(MC[mid])MC[mid].s="ok";return x;},
    function(e){mcFail(mid,e);throw e;});}
function tag(x,mid,name){var m=byMid(mid);function t(run){if(run&&run.id&&!isRemote(run.id)){run.id=rid0(mid,run.id);run.remote={id:mid,computer:m.name,kind:m.kind};}return run;}
  if(x&&x.run)t(x.run);if(x&&Array.isArray(x.runs))x.runs.forEach(t);if(name==="runs_new"&&x&&x.id&&!isRemote(x.id))x.id=rid0(mid,x.id);return x;}
function mcFail(mid,e){var st=e&&e.status,m=MC[mid]||(MC[mid]={});m.at=Date.now();m.msg=String(e&&e.message||e||"");
  m.s=st===403?"off":st===401?"code":st?"err":"away";}
function rtools(mid,fresh){var m=MC[mid];if(!fresh&&m&&m.tools&&m.s==="ok"&&Date.now()-m.at<120000)return Promise.resolve(m.tools);
  return call("runs_tools",[!!fresh],mid).then(function(t){MC[mid]={tools:t,s:"ok",at:Date.now(),msg:""};return t;});}''')

# ---------- 2. the list: the runs here, and the runs she sent to her other computers ----------
rep('''function list(force){if(!A())return Promise.resolve([]);if(!force&&Date.now()-ST.listAt<1500)return Promise.resolve(ST.runs);
  return call("runs_list").then(function(x){ST.runs=x.runs||[];ST.here=x.here||ST.here;ST.listAt=Date.now();return ST.runs;},function(){return ST.runs;});}''',
'''function list(force){if(!canRun())return Promise.resolve([]);if(!force&&Date.now()-ST.listAt<1500)return Promise.resolve(ST.runs);
  ST.rem=ST.rem||{};
  var loc=A()?call("runs_list").then(function(x){ST.here=x.here||ST.here;ST.loc=x.runs||[];return ST.loc;},function(){return ST.loc||[];}):Promise.resolve([]);
  var rem=others().filter(function(c){var m=MC[c.id];return !m||m.s==="ok"||Date.now()-(m.at||0)>60000;}).map(function(c){
    return call("runs_list",[],c.id).then(function(x){ST.rem[c.id]=x.runs||[];if(!MC[c.id])MC[c.id]={s:"ok",at:Date.now()};return ST.rem[c.id];},function(){return ST.rem[c.id]||[];});});
  return Promise.all([loc].concat(rem)).then(function(all){var local=all[0]||[],kept={};
    /* a run kept here from another computer stands for it there */
    local.forEach(function(x){if(x.remote&&x.remote.rid)kept[x.remote.id+"|"+x.remote.rid]=1;});
    var far=[];Object.keys(ST.rem).forEach(function(k){(ST.rem[k]||[]).forEach(function(x){var sp=split(x.id);if(!kept[sp.mid+"|"+sp.rid])far.push(x);});});
    ST.runs=local.concat(far).sort(function(a,b){return (b.started||b.at||0)-(a.started||a.at||0);});ST.listAt=Date.now();keepCopies();return ST.runs;});}''')
rep('''function tools(fresh){if(!A())return Promise.resolve(null);''', '''function tools(fresh){if(!A())return Promise.resolve(null);   /* this computer's own; rtools(mid) for another's */''')

# ---------- 3. where a run ran ----------
rep('''function where(run){var m=run&&run.machine||{};return "this computer"+(m.os?" ("+m.os+")":"");}''',
'''function where(run){var m=run&&run.machine||{},rm=run&&run.remote;if(rm)return (rm.computer||"your other computer")+(m.os?" ("+m.os+")":"")+(rm.kept?", kept here too":"");return "this computer"+(m.os?" ("+m.os+")":"");}''')

# ---------- 4. a device that runs nothing itself sends its runs to her computers ----------
rep('''  if(!A()){body.appendChild(el("div","f-empty","<b>Runs happen on a computer</b>"+esc(NOHERE)+" Your workflows are under Workflows, to read here."));
    f.appendChild(key("","Workflows",function(){go("workflows");}));return;}''',
'''  if(!canRun()){body.appendChild(el("div","f-empty","<b>Runs happen on a computer</b>"+esc(NOHERE)+" Pair one of your computers under Machines, Add a machine, and this device sends its runs there. Your workflows are under Workflows, to read here."));
    f.appendChild(key("pri","Machines",function(){go("machines");}));f.appendChild(key("","Workflows",function(){go("workflows");}));return;}''')
rep('''Choose a workflow under Workflows and press Run it now; it runs here, on this computer."));''',
'''Choose a workflow under Workflows and press Run it now; it runs here, or on another of your computers, as you choose."));''')
rep('''  body.appendChild(el("p","f-hint","Every run is kept with its whole log and every file it made, on this computer, until you remove it: no expiry, and no minutes counted."));''',
'''  body.appendChild(el("p","f-hint","Every run is kept with its whole log and every file it made, on the computer that ran it and, in the computer apps, here too, until you remove it: no expiry, and no minutes counted."));''')
rep('''var WATCH=0;function watch(){clearTimeout(WATCH);if(!A())return;''', '''var WATCH=0;function watch(){clearTimeout(WATCH);if(!canRun())return;''')

# ---------- 5. the run sheet: where each job runs ----------
rep('''function runSheet(r,o){var x=X();if(!A()){toast(NOHERE);return;}var p0=null;try{p0=CORE.plan(o.doc,{os:ST.here||"macOS",file:o.path});}catch(e){fail(e);return;}
  var sh=x.sheet("Run "+p0.name,"It runs here, on this computer, at the version you kept last"+(r.head?" ("+String(r.head).slice(0,7)+")":"")+": each job in a folder of its own, every step and the whole log kept.");''',
'''/* 7.30: her computers are checked first (a minute's knowledge is enough), so the sheet knows which are ready */
function runSheet(r,o){var os=others();if(!os.length||os.every(function(c){return MC[c.id]&&Date.now()-(MC[c.id].at||0)<60000;}))return runSheet0(r,o);
  var x=X();x.busy&&x.busy("Checking your computers…");Promise.all(os.map(function(c){return rtools(c.id,false).catch(function(){return null;});})).then(function(){x.unbusy&&x.unbusy();runSheet0(r,o);});}
function runSheet0(r,o){var x=X();if(!canRun()){toast(NOHERE+" Pair one of your computers under Machines, Add a machine.");return;}var p0=null;try{p0=CORE.plan(o.doc,{os:ST.here||"macOS",file:o.path});}catch(e){fail(e);return;}
  var sh=x.sheet("Run "+p0.name,"It runs at the version you kept last"+(r.head?" ("+String(r.head).slice(0,7)+")":"")+": each job in a folder of its own, every step and the whole log kept, on the computer that runs it.");
  /* 7.30: where it runs, as her approved preview has it: as the workflow says, only here, only on one of her computers, or (later) GitHub's */
  var ready=others().filter(function(c){return MC[c.id]&&MC[c.id].s==="ok";}),target=ready.length?"auto":(A()?"here":"");
  if(others().length){var wp=el("div","r298-pick");sh.box.appendChild(el("span","f-lab","Where it runs"));
    var wopts=[["auto","▣","As the workflow says","Each job on one of your computers with the system it names"+(ready.length?": "+(A()?"this computer, ":"")+ready.map(function(c){return c.name;}).join(", "):"")+". Your own machines count no minutes."]];
    if(A())wopts.push(["here","⌂","Only on this computer","Every job here, as before"]);
    others().forEach(function(c){var m=MC[c.id]||{};wopts.push([c.id,"◆","Only on "+c.name,m.s==="ok"?((m.tools&&m.tools.os)||"Ready")+", on your Wi-Fi":m.s==="off"?"Its runs are off there: turn on Run Fabrica's jobs for my devices on it":m.s==="code"?"Type its code again, in Settings, Your devices":"Asleep or away: it runs once it is awake with Ingenium open"]);});
    wopts.push(["gh","◇","Only on GitHub's machines","In a coming release: GitHub's macOS, Windows and Linux machines, with your sign-in"]);
    wopts.forEach(function(it){var b=el("button","f-opt");b.type="button";b.innerHTML='<span class="ic">'+it[1]+"</span><span><b>"+esc(it[2])+"</b><small>"+esc(it[3])+"</small></span>";
      var off=it[0]==="gh"||(it[0]!=="auto"&&it[0]!=="here"&&!(MC[it[0]]&&MC[it[0]].s==="ok"))||(it[0]==="auto"&&!ready.length);if(off){b.disabled=true;b.setAttribute("aria-disabled","true");}
      b.setAttribute("aria-pressed",it[0]===target?"true":"false");b.addEventListener("click",function(){if(off)return;target=it[0];[].forEach.call(wp.children,function(c){c.setAttribute("aria-pressed",c===b?"true":"false");});});wp.appendChild(b);});
    sh.box.appendChild(wp);sh.box.appendChild(el("span","f-lab","A job for another system"));}''')
rep('''    start(r,o,{anyway:chosen==="exact"?false:chosen,inputs:inputs,why:"by you, by hand"}).then(function(){sh.close();},function(e){go1.disabled=false;fail(e);});});''',
'''    if(!target){go1.disabled=false;toast("None of your computers is ready now: wake one with Ingenium open, then Check it again under Machines.");return;}
    var how={anyway:chosen==="exact"?false:chosen,inputs:inputs,why:"by you, by hand"};if(target!=="here"&&target!=="auto")how.machine=target;
    (target==="auto"?startAuto(r,o,how):start(r,o,how)).then(function(){sh.close();},function(e){go1.disabled=false;fail(e);});});''')

# ---------- 6. a run, here or on another computer; and as the workflow says, each job where its system is ----------
rep('''function start(r,o,opt){opt=opt||{};var x=X();
  return Promise.all([tools(),list(true)]).then(function(z){var t=z[0]||{},have={},need={};(t.tools||[]).forEach(function(k){if(k.ok)have[k.key]=k.version||true;need[k.key]=k.need;});
    var n=1;ST.runs.forEach(function(y){if(y.repo===r.id&&y.n>=n)n=y.n+1;});''',
'''function start(r,o,opt){opt=opt||{};var x=X(),mid=opt.machine&&opt.machine!=="here"?opt.machine:null,mname=mid?byMid(mid).name:"";
  return Promise.all([mid?rtools(mid,false):tools(),list(true)]).then(function(z){var t=z[0]||{},have={},need={};(t.tools||[]).forEach(function(k){if(k.ok)have[k.key]=k.version||true;need[k.key]=k.need;});
    var n=opt.n||1;if(!opt.n)ST.runs.forEach(function(y){if(y.repo===r.id&&y.n>=n)n=y.n+1;});''')
rep('''    if(opt.anyway==="unix")p.jobs.forEach(function(j){if(/it runs on Linux/.test(j.skip||"")&&(t.os||ST.here)==="macOS")j.skip="";});
    var disk=IngRepo.isDisk&&IngRepo.isDisk(r.id);''',
'''    if(opt.anyway==="unix")p.jobs.forEach(function(j){if(/it runs on Linux/.test(j.skip||"")&&(t.os||ST.here)==="macOS")j.skip="";});
    /* 7.30: as the workflow says, the jobs another computer runs are not run here, and a job whose needs run elsewhere says so */
    if(opt.away){p.jobs.forEach(function(j){if(opt.away[j.key]&&!j.skip)j.skip=opt.away[j.key];});
      p.jobs.forEach(function(j){if(j.skip)return;var far=(j.needs||[]).filter(function(k){return opt.away[k];});if(far.length)j.steps.unshift({name:"Its needs run elsewhere",kind:"note",done:true,text:"This job needs "+far.join(", ")+", which run"+(far.length>1?"":"s")+" on another of your computers; here it starts without waiting for "+(far.length>1?"them":"it")+"."});});}
    var disk=!mid&&IngRepo.isDisk&&IngRepo.isDisk(r.id);''')
rep('''    var spec={app:r.name,repo:r.id,version:r.head,label:r.branch||"",workflow:p.name,file:o.path,why:opt.why||"by you",n:n,event:"workflow_dispatch",disk:disk?r.id:"",jobs:''',
'''    var spec={app:r.name,repo:r.id,version:r.head,label:r.branch||"",workflow:p.name,file:o.path,why:opt.why||"by you",n:n,event:"workflow_dispatch",disk:disk?r.id:"",group:opt.group||"",jobs:''')
rep('''    return call("runs_new",[spec]).then(function(made){var rid=made.id;if(disk)return rid;
      x.busy&&x.busy("Putting the app's files in the run's folder…");''',
'''    if(!p.jobs.some(function(j){return !j.skip;}))throw new Error((mid?mname:"This computer")+" runs none of its jobs: "+(p.jobs[0]&&p.jobs[0].skip||"each names another system")+".");
    return call("runs_new",[spec],mid).then(function(made){var rid=made.id;if(disk)return rid;
      x.busy&&x.busy(mid?"Sending the app's files to "+mname+"…":"Putting the app's files in the run's folder…");''')
rep('''      .then(function(rid){ST.open=rid;ST.job=null;markSeen(rid);return list(true).then(function(){nav("runs");watch();needs(true);counts();toast(p.name+": run #"+n+" started here, on this computer.");});});});}''',
'''      .then(function(rid){if(opt.quiet)return {rid:rid,n:n,name:p.name,jobs:p.jobs.filter(function(j){return !j.skip;}).map(function(j){return j.name;})};
        ST.open=rid;ST.job=null;markSeen(rid);return list(true).then(function(){nav("runs");watch();needs(true);counts();toast(p.name+": run #"+n+" started "+(mid?"on "+mname+".":"here, on this computer."));return rid;});});});}
/* 7.30: as the workflow says: each job on one of her computers whose system it names (this one first), a job with the jobs it needs where
   that computer can run it; one run on each computer used, under one number; a job no computer of hers runs now is said */
function startAuto(r,o,opt){opt=opt||{};var ms=(A()?[{id:"here",name:"this computer"}]:[]).concat(others().filter(function(c){return MC[c.id]&&MC[c.id].s==="ok";}).map(function(c){return {id:c.id,name:c.name};}));
  return Promise.all(ms.map(function(m){return (m.id==="here"?tools():rtools(m.id,false)).then(function(t){m.t=t||{};return m;},function(){return null;});})).then(function(ms){ms=ms.filter(Boolean);
    if(!ms.length)throw new Error("None of your computers can run it now: pair one under Machines, or wake one with Ingenium open.");
    ms.forEach(function(m){var t=m.t,have={},need={};(t.tools||[]).forEach(function(k){if(k.ok)have[k.key]=k.version||true;need[k.key]=k.need;});m.unix=t.os==="macOS";
      m.p=CORE.plan(o.doc,{os:t.os||"macOS",arch:/arm|aarch/i.test(t.arch||"")?"ARM64":"X64",sha:r.head,branch:r.branch||"main",repo:r.name,n:1,inputs:opt.inputs,anyway:m.unix?"unix":false,tools:have,need:need,file:o.path});
      if(m.unix)m.p.jobs.forEach(function(j){if(/it runs on Linux/.test(j.skip||""))j.skip="";});});
    var at={},jobs=ms[0].p.jobs,runs=function(m,key){var pj=m.p.jobs.filter(function(x){return x.key===key;})[0];return pj&&!pj.skip;};
    /* a Linux job goes to a Linux computer before a Mac running it with bash */
    jobs.forEach(function(j){var with_=(j.needs||[]).map(function(k){return at[k];}).filter(Boolean)[0],cand=ms.filter(function(m){return runs(m,j.key);});
      var exact=cand.filter(function(m){var pj=m.p.jobs.filter(function(x){return x.key===j.key;})[0];return !(m.unix&&/linux|ubuntu/i.test(String(pj&&pj.runsOn||"")));});
      at[j.key]=(with_&&runs(with_,j.key))?with_:(exact[0]||cand[0]||null);});
    var used=ms.filter(function(m){return jobs.some(function(j){return at[j.key]===m;});});
    var none=jobs.filter(function(j){return !at[j.key];});
    if(!used.length)throw new Error("None of your computers runs its jobs now: "+(jobs[0]&&ms[0].p.jobs[0].skip||"each names another system")+".");
    var n=1;ST.runs.forEach(function(y){if(y.repo===r.id&&y.n>=n)n=y.n+1;});var gid=String(Date.now().toString(36))+Math.random().toString(36).slice(2,6),done=[],q=Promise.resolve();
    used.forEach(function(m){var away={};jobs.forEach(function(j){if(at[j.key]!==m)away[j.key]=at[j.key]?"it runs on "+at[j.key].name+" (the same run, #"+n+")":"no computer of yours runs it now";});
      q=q.then(function(){return start(r,o,{machine:m.id==="here"?null:m.id,n:n,group:gid,inputs:opt.inputs,why:opt.why,anyway:m.unix?"unix":false,away:away,quiet:true}).then(function(x){done.push([m,x]);});});});
    return q.then(function(){var first=done[0]&&done[0][1];ST.open=first?first.rid:null;ST.job=null;if(first)markSeen(first.rid);
      return list(true).then(function(){nav("runs");watch();needs(true);counts();
        toast(o.doc&&first?first.name+": run #"+n+" started: "+done.map(function(d){return d[1].jobs.join(", ")+" on "+(d[0].id==="here"?"this computer":d[0].name);}).join("; ")+"."+(none.length?" Not run: "+none.map(function(j){return j.name;}).join(", ")+" (no computer of yours runs its system now).":""):"Started.");});});});}
/* 7.30: a run on another of her computers, once ended, kept here too (its record, every log and every file), in a computer app */
var KEEP={};
function keepCopies(){var a=A();if(!a||typeof a.runs_keep_copy!=="function")return;
  ST.runs.forEach(function(run){if(!isRemote(run.id)||run.state==="running"||run.state==="ready"||KEEP[run.id])return;KEEP[run.id]=1;keepOne(run).then(function(){return list(true);}).then(function(){repaint();},function(){delete KEEP[run.id];});});}
function keepOne(run){var a=A(),sp=split(run.id),m=byMid(sp.mid);
  return call("runs_get",[run.id]).then(function(g){var rec=JSON.parse(JSON.stringify(g.run));rec.id=sp.rid;delete rec.remote;
    return Promise.resolve(a.runs_keep_copy(rec,{id:m.id,name:m.name,kind:m.kind})).then(function(k){if(!k||!k.ok)throw new Error((k&&k.error)||"not kept");var kid=k.id,q=Promise.resolve();
      (rec.jobs||[]).forEach(function(j){var off=0,first=true;function more(){return call("runs_log",[run.id,j.key,off]).then(function(lg){var t=lg.text||"",ap=!first;first=false;off=lg.offset||0;
          return Promise.resolve(a.runs_keep_log(kid,j.key,t,ap)).then(function(){if(t&&off<(lg.size||0))return more();});});}q=q.then(more);});
      (rec.artifacts||[]).forEach(function(art){(art.files||[]).forEach(function(fl){var path=fl.path||fl,off=0,first=true;
        function more(){return call("runs_file",[run.id,art.name,path,off,4194304]).then(function(pp){var ap=!first;first=false;off=pp.offset;
            return Promise.resolve(a.runs_keep_file(kid,art.name,path,pp.b64||"",ap)).then(function(){if(off<pp.size)return more();});});}q=q.then(more);});});
      return q;});});}''')

# ---------- 7. Machines: this computer, each of her other computers, and GitHub's ----------
rep('''function paintMachines(r,w,f){var body=el("div","r298-pad");w.appendChild(body);var box=el("div","r298-mcs");body.appendChild(box);
  if(!A()){box.appendChild(el("div","f-empty","<b>This device runs no workflows</b>"+esc(NOHERE)));}''',
'''function paintMachines(r,w,f){var body=el("div","r298-pad");w.appendChild(body);var box=el("div","r298-mcs");body.appendChild(box);
  if(!A()){box.appendChild(el("div","f-empty","<b>This device runs no workflows itself</b>"+esc(NOHERE)+(others().length?" It sends its runs to your computers below.":" Pair one of your computers (Add a machine, below), and this device sends its runs there.")));}''')
rep('''  var later=el("div","r298-mc later");later.innerHTML='<span class="ic">'+ICON.mac+'</span><div><b>Your other computers</b><small>Your Mac mini and your HP laptop</small></div><span class="f-chip st">Coming next</span>';
  later.appendChild(el("div","can","Each pairs once with a code this computer shows, as your devices do for models, and runs the jobs for its own system, with every log kept here. They join in a coming release."));box.appendChild(later);''',
'''  /* 7.30: her other computers, each as the computer it is: its tools, and whether it is ready now */
  others().forEach(function(cp){box.appendChild(machineCard(cp));});
  paired().filter(function(cp){return !cp.runs;}).forEach(function(cp){var c=el("div","r298-mc later");c.innerHTML='<span class="ic">'+ICON.mac+"</span><div><b>"+esc(cp.name||"Your computer")+"</b><small>Paired for its models</small></div>"+'<span class="f-chip st">Runs off there</span>';
    c.appendChild(el("div","can","To run your workflows on it: on that computer, Settings, Your devices, turn on Run Fabrica's jobs for my devices. It shows here as Ready."));box.appendChild(c);});
  if(!paired().length){var later=el("div","r298-mc later");later.innerHTML='<span class="ic">'+ICON.mac+'</span><div><b>Your other computers</b><small>Your Mac mini, your HP laptop, any computer of yours with Ingenium</small></div><span class="f-chip st">Not paired yet</span>';
    later.appendChild(el("div","can","Each pairs once with the code it shows, as your devices do for models, and runs the jobs for its own system: a Mac job on a Mac, a Windows job on the HP laptop. Add a machine says how."));box.appendChild(later);}''')
rep('''  f.appendChild(key("","Workflows",function(){go("workflows");}));}
function builds(t){''',
'''  f.appendChild(key("pri","Add a machine",function(){addMachine();}));f.appendChild(key("","Workflows",function(){go("workflows");}));}
function machineCard(cp){var m=MC[cp.id],c=el("div","r298-mc"),t=m&&m.tools;
  if(!m||(!t&&m.s==="ok")){rtools(cp.id,false).then(repaint,function(){repaint();});}
  var os=t&&t.os,ic=os==="Windows"?ICON.win:os==="Linux"?ICON.linux:ICON.mac,st=!m?"Checking":m.s==="ok"?"Ready":m.s==="off"?"Runs off there":m.s==="code"?"Type its code again":m.s==="err"?"It answered with an error":"Asleep";
  var sub=t?(os+(t.release?" "+t.release:"")+(t.arch?" · "+(/arm|aarch/i.test(t.arch)?"Apple silicon or ARM":t.arch):"")+" · on your Wi-Fi"):(m&&m.s==="away"?"Not answering: asleep, away, or Ingenium closed there":"Paired with this device");
  c.innerHTML='<span class="ic">'+ic+"</span><div><b>"+esc(cp.name||"Your computer")+"</b><small>"+esc(sub)+'</small></div><span class="f-chip st'+(m&&m.s==="ok"?" ok":"")+'">'+esc(st)+"</span>";
  if(t){var ok=el("div","r298-tools"),miss=el("div","r298-tools miss");(t.tools||[]).forEach(function(k){var d=el("div","r298-tool "+(k.ok?"ok":"no"));d.innerHTML="<i>"+(k.ok?"✓":"○")+"</i><span>"+esc(k.name+(k.ok&&k.version?" "+String(k.version).replace(/^v/,""):""))+(k.ok?"":": for "+esc(k["for"])+"; "+esc(k.need))+"</span>";d.title="For "+k["for"];(k.ok?ok:miss).appendChild(d);});
    c.appendChild(ok);if(miss.children.length)c.appendChild(miss);c.appendChild(el("div","can","<b>Builds there:</b> "+esc(builds(t))));}
  if(m&&m.s!=="ok"&&m.msg)c.appendChild(el("div","can",esc(m.s==="away"?"A computer runs jobs only while it is awake with Ingenium open; its screen may sleep. Runs sent to it wait for it here.":m.msg)));
  var k=el("div","k");k.appendChild(key("sm","Check it again",function(e,b){b.disabled=true;rtools(cp.id,true).then(function(){repaint();toast(cp.name+": every tool checked again just now.");},function(er){b.disabled=false;repaint();toast(cp.name+": "+(er&&er.message||er));});}));
  if(t&&(t.tools||[]).some(function(x){return !x.ok;}))k.appendChild(key("sm quiet","How to add what is missing",function(){toast((t.tools||[]).filter(function(x){return !x.ok;}).map(function(x){return x.name+": "+x.need;}).join(". ")+".");}));
  c.appendChild(k);return c;}
/* 7.30: Add a machine, as her approved preview says, with the switch stage 1 gave the computer */
function addMachine(){var x=X(),sh=x.sheet("Add a machine","Your Mac mini, your HP laptop or any computer of yours with Ingenium's app runs your workflows for this device, once paired.");
  var ol=el("ol","r298-steps");[["On that computer","Open Ingenium: Settings, Models and AI, Your devices. Turn on Run Fabrica's jobs for my devices. It shows its code (and lends its models too, if you like)."],
    ["Here","Settings, Your devices: Find my computers (or type its address), then type that code, once. Ingenium Cloud carries the pairing to your other devices."],
    ["Then","It shows under Machines with its tools, checked, and the run sheet offers it. It runs jobs while it is awake with Ingenium open; its screen may sleep."]].forEach(function(s){var li=el("li",null,"<b>"+esc(s[0])+"</b> "+esc(s[1]));ol.appendChild(li);});
  sh.box.appendChild(ol);var end=el("div","end");end.appendChild(key("pri","Open Your devices",function(){sh.close();try{go0("settings");}catch(e){}setTimeout(function(){var c=D.getElementById("linkCard");try{if(W.IngRooms&&c)W.IngRooms.reveal(c,{scroll:true,flash:true});}catch(e){}},200);}));
  end.appendChild(key("","Done",function(){sh.close();}));sh.box.appendChild(end);}
function go0(p){if(typeof W.go==="function")W.go(p);}
function builds(t){''')
rep('''.r298-mc .k{''', '''.r298-steps{margin:4px 0 12px;padding-left:20px;display:grid;gap:8px;font-size:13.5px;line-height:1.5}
.r298-steps b{display:block}
.r298-mc .k{''')

# ---------- 8. the workflow's own key, the start, and Needs you say where ----------
rep('''kk.appendChild(key("sm pri","Run it now",function(){runSheet(r,o);},A()?"Runs here, on this computer, at the version kept last":NOHERE));if(!A())kk.lastChild.disabled=true;''',
    '''kk.appendChild(key("sm pri","Run it now",function(){runSheet(r,o);},canRun()?(others().length?"Runs here or on another of your computers, at the version kept last":"Runs here, on this computer, at the version kept last"):NOHERE+" Pair one of your computers under Machines."));if(!canRun())kk.lastChild.disabled=true;''')
rep('''  if(A()){tools(false).catch(function(){});list(true).then(function(){watch();counts();});}}''',
    '''  if(A()){tools(false).catch(function(){});list(true).then(function(){watch();counts();});}
  /* 7.30: her other computers are known once Settings' pairing has loaded (modules/r274.js) */
  setTimeout(function(){if(others().length)list(true).then(function(){watch();counts();needs(true);},function(){});},4000);}''')
rep('''s:(run.n?"#"+run.n+" · ":"")+"on this computer · "+ago((run.started||run.at)*1000)''', '''s:(run.n?"#"+run.n+" · ":"")+"on "+where(run)+" · "+ago((run.started||run.at)*1000)''')
rep('''s:(run.n?"#"+run.n+" · ":"")+(fj?fj.name+", ":"")+"on this computer"''', '''s:(run.n?"#"+run.n+" · ":"")+(fj?fj.name+", ":"")+"on "+where(run)''')
open(p, "w", encoding="utf-8").write(s)
print("r298 patched")
