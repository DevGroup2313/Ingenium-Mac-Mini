<style id="r205-css">
/* ============ R205 · MODELS LENT BETWEEN HER DEVICES (Ingenium 6.9.3, 1 November 2026) ============
   The sharing card gains a block for the computer that lends (how much memory a lent model gets, which chip works, which models
   suit this computer, what to do before lending from a laptop), a line under Connect on the device that borrows, and a word beside
   each lent model in the model menu. Nothing is added to the top bar. */
.lk-lend{margin-top:12px;padding-top:10px;border-top:1px solid var(--hairline);line-height:1.55}
.lk-lend-row{display:flex;align-items:center;gap:10px;flex-wrap:wrap;margin:8px 0 2px}
.lk-lend-row label{font-weight:600;color:var(--ink-1)}
.lk-lend-row select{min-height:34px;padding:4px 8px;border-radius:9px;border:1px solid var(--hairline);background:var(--card);color:var(--ink-1);font:inherit}
.lk-lend-d{margin-top:10px}
.lk-lend-d>summary{cursor:pointer;color:var(--ink-1);font-weight:600}
.lk-lend-d ol{margin:8px 0 0 18px;padding:0}
.lk-lend-d li{margin:5px 0}
.lk-suit-g{margin-top:9px;font-weight:600;color:var(--ink-1)}
.lk-suit-r{padding:2px 0 2px 10px;color:var(--ink-2)}
.lk-adv{font-size:11.5px;color:var(--ink-3);margin-left:6px}
.lk-adv.quick{color:var(--ok)}
.lk-adv.slow,.lk-adv.big{color:var(--warn)}
#lkLenderNote{margin-top:4px;line-height:1.5}
#lkAddrHint{margin-top:6px;line-height:1.5}
</style>
<script>try{(window.__ingParts=window.__ingParts||{})["p205"]="started";}catch(_){}
/* ============ R205 · MODELS LENT BETWEEN HER DEVICES (Ingenium 6.9.3, 1 November 2026) ============
   The owner's words (31 October 2026): "I have two 16 GB RAM HP laptops, I want to be able to use it as a server of sorts for my
   macbook pro and run its stronger models on the macbook pro or my fire tablet. The graphics of one of the HP laptop is not the
   greatest so I would really love to be able to still use its stronger RAM and storage but on my macbook pro instead."
   Lending was already here: the HP thinks in its own memory from its own disk, and the MacBook and the Fire only send words and show
   the reply. What spoiled it was that nobody was told the truth. This part makes the page say it (the lender's side is
   desktop/app_lend_693.py):
   1. the memory a lent model really has: the window and longest reply each model is offered with are kept (info.ctx and info.out,
      beside lineup, file and size), the chat's window never goes above it, the list is read again when a chat starts and after a
      "too long" refusal, and that refusal is said in plain words;
   2. a reply that reached its limit says so, and a reply that stopped because the connection ended says that (never a silent cut);
      an error that arrives inside the stream reads "HTTP 400 ..." like every other, so it is not answered with "check that the
      computer is on"; the Fire and iPhone show a refusal's reason (the edits in build_page.py, R205);
   3. a long wait is not a silence: the lender sends how it is doing (waiting for another device, loading the model, reading the
      message with a percent), the chat says so, and the page waits ten minutes for a lender's first word, not two;
   4. the default pick for a connected lender is the strongest model that is quick on that computer (lkBestAdvised), and each
      lent model carries a word in the model menu;
   5. the computer that lends: Memory for lent models, Graphics (Automatic, Processor only, Graphics chip) with what it is doing
      right now and why, which models suit this computer, a number address for the Fire and iPhone, and the steps to take on a laptop
      before lending (plain words; Windows' own settings named where they differ).
   The words are for a reader who wants short, kind, exact sentences: what is, what to do, nothing more. */
(function(){"use strict";
if(window.__r205)return;window.__r205=1;
var W=window;
function $(id){return document.getElementById(id);}
function wrap(o,f){try{Object.keys(o).forEach(function(k){if(!(k in f))f[k]=o[k];});}catch(e){}return f;}
function num(n){try{return Number(n).toLocaleString("en-US");}catch(e){return String(n);}}
/* a token is about three quarters of a word */
function wordsOf(tokens){return Math.max(100,Math.round(tokens*0.75/100)*100);}
function wps(tps){return Math.max(1,Math.round(tps*0.75));}
function lender(){var c=state.cloud||{};return (c.provider==="ingenium"&&c.on)?c:null;}
function who(){var c=state.cloud||{};return c.computer||"the other computer";}

/* ---------- 1. what a lent model is offered with: its window and its longest reply, kept per model ---------- */
W.lkInfoOf=function(m){var o={lineup:m.lineup||"",file:m.file||"",size:m.size||0},c=+m.context_length||0,x=+m.max_tokens||0;
  if(c>0)o.ctx=c;if(x>0)o.out=x;if(m.advice)o.advice=String(m.advice);if(+m.tps>0){o.tps=+m.tps;o.tpsM=!!m.tps_measured;}return o;};
/* the chat's window never goes above what the lender holds for this model */
if(typeof W.ingCloudWindow==="function"){var oWin=W.ingCloudWindow;
  W.ingCloudWindow=wrap(oWin,function(){var w=oWin.apply(this,arguments);
    try{var c=state.cloud||{};if(c.provider==="ingenium"){var inf=(c.info||{})[c.model]||{};if(+inf.ctx>0&&w>+inf.ctx)w=+inf.ctx;}}catch(e){}return w;});}
if(typeof W.ingReplyMax==="function"){var oRep=W.ingReplyMax;
  W.ingReplyMax=wrap(oRep,function(m){var r=oRep.apply(this,arguments);
    try{var c=lender();if(c){var inf=(c.info||{})[c.model]||{};if(+inf.out>0)return Math.max(256,Math.min(r,Math.floor(+inf.out/128)*128));}}catch(e){}return r;});}
function repaintAll(){try{if(W.IngMemory&&IngMemory.paint)IngMemory.paint();}catch(e){}try{renderEngineCtl();}catch(e){}try{paintChatTop();}catch(e){}notePaint();}
/* the list again (GET /v1/models, and /ingenium/info for the machine): when a chat starts, and after a refusal for being too long;
   a failure is ignored. At most once in 30 seconds unless it is forced. */
var ref={at:0,busy:null};
function refresh(force){var c=lender();if(!c)return Promise.resolve(false);
  var now=Date.now();if(ref.busy)return ref.busy;if(!force&&now-ref.at<30000)return Promise.resolve(false);ref.at=now;
  var root=lkBase(String(c.base||"").replace(/\/v1$/,"")),h={"Authorization":"Bearer "+lkCode(c.key)};
  var p=netFetch(root+"/v1/models",{headers:h,timeout:8}).then(function(r){return r.ok?r.json():null;}).then(function(d){
      var list=((d&&d.data)||[]).filter(function(m){return m&&m.name;}),cc=state.cloud||{};
      if(!list.length||cc.provider!=="ingenium")return false;
      var info={};list.forEach(function(m){info[m.name]=W.lkInfoOf(m);});cc.info=info;cc.models=list.map(function(m){return m.name;});
      try{saveState();}catch(e){}return true;},function(){return false;})
    .then(function(ok){if(!ok||/\/ingenium\/via\//.test(root))return ok;
      return netFetch(root+"/ingenium/info",{headers:h,timeout:6}).then(function(r){return r.ok?r.json():null;}).then(function(j){
        if(j&&state.cloud&&state.cloud.provider==="ingenium")state.cloud.lender=j;return ok;},function(){return ok;});})
    .then(function(ok){if(ok)repaintAll();return ok;},function(){return false;});
  ref.busy=p;p.then(function(){ref.busy=null;},function(){ref.busy=null;});return p;}
W.lkRefresh=refresh;
if(typeof W.chatPrepare==="function"){var oPrep=W.chatPrepare;
  W.chatPrepare=chatPrepare=wrap(oPrep,function(){var self=this,args=arguments;
    try{if(lender()&&(typeof chatSource==="function"?chatSource():state.chatSource)==="cloud")return Promise.race([refresh(false),new Promise(function(res){setTimeout(res,4000);})]).then(function(){return oPrep.apply(self,args);},function(){return oPrep.apply(self,args);});}catch(e){}
    return oPrep.apply(self,args);});}

/* ---------- 2. what a reply ended with, and what an error says ---------- */
W.lkInband=function(e){var m=(e&&(e.message||e))||"the connection reported an error";if(typeof m!=="string")m=JSON.stringify(m);
  var code=e&&e.code;return (/^\d{3}$/.test(String(code||""))?"HTTP "+code+" ":"")+m;};
W.lkTail=function(seen,got){
  if(seen&&seen.fin==="length")return "\n\n_The reply reached its limit. Say “continue” to go on._";
  if(seen&&!seen.done&&!seen.fin&&got)return "\n\n_The reply stopped early: the connection to "+who()+" ended. Ask again._";
  return "";};
/* a refusal for being too long, in plain words; the list is read again, so the next message is fitted to the right window */
W.lkChatError=function(err){var m=String(err&&err.message||err||"");
  var x=/exceeds the available context size \((\d[\d,]*) tokens\)/i.exec(m);
  if(/HTTP 400/.test(m)&&x){refresh(true);var n=+String(x[1]).replace(/,/g,"");
    return {whole:"This conversation is longer than "+who()+"'s memory for this model ("+num(n)+" tokens). Start a new conversation, or raise Memory for lent models on "+who()+"."};}
  return {text:m};};

/* ---------- 3. a long wait is not a silence ---------- */
W.lkStatus=function(s){var b=W.liveBot;if(!b||!b.live||b.text||!s)return;var t="",w=who();
  if(s.state==="queued")t=(!(s.ahead>0)?"":s.ahead>1?"Waiting: "+s.ahead+" devices are ahead of you on "+w+".":"Waiting: "+w+" is answering another device first.");
  else if(s.state==="loading")t=w+" is loading "+(s.model||"the model")+(s.seconds>4?" ("+s.seconds+" seconds so far)":"")+"…";
  else if(s.state==="reading")t=w+" is reading your message"+(s.percent!=null?": "+s.percent+"%":"")+"…";
  if(s.note)t+=(t?" ":"")+String(s.note);
  if(t!==(b.status||"")){b.status=t;try{renderChatLive(b);}catch(e){}}};

/* ---------- 4. the default pick, and a word beside each lent model ---------- */
var LK_ADV=["qwen3.5-9b","lfm2.5-8b-a1b","qwen3.5-4b","lfm2.5-2.6b","qwen3.5-2b","lfm2.5-1.2b-thinking","lfm2.5-1.2b-instruct"];
/* the strongest general model that is quick on that computer, else one that is a little slower, else the largest of either; "" when the
   lender sends no advice (an older one), and the caller then makes its old choice */
W.lkBestAdvised=function(list){try{
  if(!list||!list.some(function(m){return m&&m.advice;}))return "";
  function gen(a){for(var i=0;i<LK_ADV.length;i++){var f=list.filter(function(m){return m.lineup===LK_ADV[i]&&m.advice===a;})[0];if(f)return f.name;}return "";}
  function any(a){var b=list.filter(function(m){return m.advice===a;}).sort(function(x,y){return (y.size||0)-(x.size||0);})[0];return b?b.name:"";}
  return gen("quick")||gen("ok")||any("quick")||any("ok")||gen("slow")||any("slow")||"";}catch(e){return "";}};
var ADV={"quick":["quick","quick"],"ok":["a little slower",""],"slow":["slow","slow"],"too big":["too big for it","big"]};
W.lkAdvWord=function(a){return (ADV[a]||[""])[0];};
function menuNotes(){var c=lender();if(!c)return;var m=$("chatModelMenu");if(!m)return;
  m.querySelectorAll(".menu-btn").forEach(function(b){var row=b.firstChild;if(!row||!row.children||row.children.length<2)return;
    var nm=row.children[1].textContent,inf=(c.info||{})[nm];if(!inf||!inf.advice||row.querySelector(".lk-adv"))return;
    var w=ADV[inf.advice]||[inf.advice,""],s=document.createElement("span");s.className="lk-adv "+w[1];s.textContent=w[0];
    s.title=(inf.advice==="quick"?"Quick":inf.advice==="ok"?"A little slower":inf.advice==="slow"?"Slow":"Too big")+" on "+who()+
      (inf.tps?(": "+(inf.tpsM?"measured ":"about ")+wps(inf.tps)+" words a second"):"")+(inf.ctx?". It holds about "+num(wordsOf(inf.ctx))+" words of a conversation at once.":"");
    row.insertBefore(s,row.children[2]||null);});}
if(typeof W.paintModelMenu==="function"){var oPM=W.paintModelMenu;
  W.paintModelMenu=paintModelMenu=wrap(oPM,function(){var r=oPM.apply(this,arguments);try{menuNotes();}catch(e){}return r;});}

/* ---------- 5a. the device that borrows: what it is connected to ---------- */
function notePaint(){var st=$("lkState");if(!st)return;var n=$("lkLenderNote");
  if(!n){n=document.createElement("div");n.id="lkLenderNote";n.className="small muted";st.parentNode.insertBefore(n,st.nextSibling);}
  var c=lender();if(!c||!c.lender){n.textContent="";n.hidden=true;return;}
  var L=c.lender,w=who(),bits=[],inf=(c.info||{})[c.model]||{};
  if(L.ram_gb)bits.push(w+" has "+Math.round(L.ram_gb)+" GB of memory and works with "+(L.cpu_only?"its processor, so a long answer takes a while.":"its graphics chip."));
  if(inf.ctx)bits.push("With "+c.model+" it holds about "+num(wordsOf(inf.ctx))+" words of this conversation at once.");
  if(inf.advice)bits.push("That model is "+(inf.advice==="quick"?"quick":inf.advice==="ok"?"a little slower than the quick ones":inf.advice==="slow"?"slow":"too big for it")+" there"+(inf.tps?" (about "+wps(inf.tps)+" words a second"+(inf.tpsM?", measured":"")+")":"")+".");
  if(L.busy||L.queued)bits.push(w+" is answering another device now"+(L.queued?" ("+L.queued+" waiting)":"")+".");
  n.textContent=bits.join(" ");n.hidden=!bits.length;}
if(typeof W.lkPaintClient==="function"){var oPC=W.lkPaintClient;
  W.lkPaintClient=lkPaintClient=wrap(oPC,function(msg,kind){var r=oPC.apply(this,arguments);
    try{notePaint();if(!msg&&kind!=="bad"&&lender())refresh(true);}catch(e){}return r;});}
/* the Fire and the iPhone type a number: they cannot always find a computer by its name */
(function(){var a=$("lkAddr");if(!a)return;var native=false;try{native=netMode()==="native";}catch(e){}
  if(!native)return;a.placeholder="for example 192.168.1.23";
  var grid=a.closest(".cx-grid");if(!grid||$("lkAddrHint"))return;var h=document.createElement("div");h.id="lkAddrHint";h.className="small muted";
  h.textContent="Type the computer's number address, like 192.168.1.23 (it is shown on the computer that lends). This device may not find a computer by its name. The port is added for you.";
  grid.parentNode.insertBefore(h,grid.nextSibling);})();

/* ---------- 5b. the computer that lends ---------- */
var BEFORE_WIN='<li><b>Plug it in and keep it awake.</b> In Windows, open Settings, System, Power, and set sleep when plugged in to Never. In Control Panel, Power Options, Choose what closing the lid does, pick Do nothing when plugged in. Otherwise the laptop sleeps when the lid shuts, and the lending stops.</li>'
  +'<li><b>Use your home Wi-Fi, not a guest one.</b> In Settings, Network and internet, Wi-Fi, your network, set Network profile type to Private network.</li>'
  +'<li><b>Let Ingenium through the firewall, for private networks only.</b> When Windows asks, tick Private networks, leave Public off, and press Allow access. If the question went away: Windows Security, Firewall and network protection, Allow an app through firewall, Change settings, and tick Private for Ingenium.</li>';
var BEFORE_MAC='<li><b>Plug it in.</b> While sharing is on, this Mac does not go to sleep by itself, but a Mac that runs on its battery will stop sooner or later.</li>'
  +'<li><b>Use your home Wi-Fi, not a guest one.</b> If the Mac asks whether Ingenium may accept incoming network connections, choose Allow.</li>';
var BEFORE_ALL='<li><b>Leave Ingenium open.</b> You can minimise it. Closing its window ends the lending.</li>'
  +'<li><b>Use the same model on every device.</b> If another device asks for a different model, this computer puts the first one away and loads the other, so the device that asked second waits for its turn.</li>'
  +'<li><b>Ask your router for a fixed address for this computer</b> (it may be called a reserved or static address), so the number you type on your other devices does not change.</li>';
var lend={st:null,suitAt:0};
function isWin(o){return /^win/i.test(String((o&&o.platform)||""))||(!(o&&o.platform)&&/win/i.test(navigator.platform||navigator.userAgent||""));}
function lendEnsure(){var box=$("lkLend");if(box)return box;var info=$("lkHostInfo");if(!info)return null;
  box=document.createElement("div");box.id="lkLend";box.className="lk-lend small";box.hidden=true;
  box.innerHTML='<div><b>How this computer lends</b></div>'
    +'<div class="lk-lend-row"><label for="lkCtxSel">Memory for lent models</label><select id="lkCtxSel"><option value="auto">Automatic</option><option value="8192">8,192</option><option value="16384">16,384</option><option value="32768">32,768</option><option value="65536">65,536</option></select></div>'
    +'<div class="muted" id="lkCtxNote"></div>'
    +'<div class="lk-lend-row"><label for="lkGpuSel">Graphics</label><select id="lkGpuSel"><option value="auto">Automatic</option><option value="cpu">Processor only</option><option value="gpu">Graphics chip</option></select></div>'
    +'<div id="lkGpuNow"></div>'
    +'<div class="muted" id="lkLendLive"></div>'
    +'<div id="lkFireLine" class="muted" hidden></div>'
    +'<details class="lk-lend-d" id="lkSuit"><summary>Which models suit this computer</summary><div id="lkSuitList" class="small muted">Looking…</div></details>'
    +'<details class="lk-lend-d" id="lkBefore"><summary>Before you lend from a laptop</summary><ol id="lkBeforeBody"></ol></details>';
  var anchor=$("lkFw")||info;anchor.parentNode.insertBefore(box,anchor.nextSibling);
  function setOpt(key,sel){var a=shellApi();if(!a||typeof a.share_option_set!=="function")return;
    Promise.resolve().then(function(){return a.share_option_set(key,sel.value);}).then(function(r){
      if(r&&r.ok===false){ingToast(r.error||"That could not be changed.");return;}
      if(r)W.lkHostPaint(r);ingToast("Saved. It applies the next time a model is loaded.");suitFill();},function(e){ingToast(String(e&&e.message||e));});}
  $("lkCtxSel").onchange=function(){setOpt("ctx",this);};
  $("lkGpuSel").onchange=function(){setOpt("gpu",this);};
  $("lkSuit").addEventListener("toggle",function(){if(this.open)suitFill();});
  return box;}
function lendPaint(st){var box=lendEnsure();if(!box)return;var o=st&&st.options;
  if(!o){box.hidden=true;return;}box.hidden=false;lend.st=st;
  var cs=$("lkCtxSel"),gs=$("lkGpuSel");
  if(cs&&document.activeElement!==cs)cs.value=String(o.ctx);
  if(gs&&document.activeElement!==gs)gs.value=o.gpu||"auto";
  var ram=o.ram_gb?("This computer has "+Math.round(o.ram_gb)+" GB of memory"+(o.ram_free_gb?" ("+o.ram_free_gb+" GB free just now)":"")+". "):"";
  $("lkCtxNote").textContent=ram+"This is how much of a conversation a lent model can hold at once. Automatic gives each model the most this computer's memory allows. A bigger number needs more memory and makes the first answer slower. A change applies the next time a model is loaded.";
  var g=o.gpu_now||{};
  $("lkGpuNow").textContent="Right now: "+(g.using==="gpu"?"the graphics chip":"the processor only")+(g.running?"":" (nothing is loaded yet)")+". "+(g.why||"");
  var live=[];if(st.queued)live.push(st.queued+" waiting for "+(st.queued===1?"its":"their")+" turn.");$("lkLendLive").textContent=live.join(" ");$("lkLendLive").hidden=!live.length;
  var fl=$("lkFireLine"),ip="";(st.addresses||[]).forEach(function(a){if(!ip&&/^\d+\.\d+\.\d+\.\d+:\d+$/.test(a))ip=a.replace(/:\d+$/,"");});
  if(fl){fl.hidden=!(st.on&&ip);if(st.on&&ip){fl.innerHTML="";fl.appendChild(document.createTextNode("For a Fire tablet or an iPhone, type the number: "));
    var b=document.createElement("b");b.textContent=ip;fl.appendChild(b);fl.appendChild(document.createTextNode(" (the port is added for you). "));
    var cp=document.createElement("button");cp.type="button";cp.className="btn ghost small";cp.textContent="Copy";
    cp.onclick=function(){try{navigator.clipboard.writeText(ip).then(function(){ingToast("Copied.");},function(){ingToast("It could not be copied.");});}catch(e){ingToast("It could not be copied.");}};fl.appendChild(cp);}}
  var bb=$("lkBeforeBody");if(bb&&!bb.getAttribute("data-w")){bb.setAttribute("data-w","1");bb.innerHTML=(isWin(o)?BEFORE_WIN:BEFORE_MAC)+BEFORE_ALL;}
  if($("lkSuit")&&$("lkSuit").open&&!lend.suitAt)suitFill();}
/* which models suit this computer: the page's own lineup, rated by the lender's rule (share_advise) */
function suitFill(){var a=shellApi(),box=$("lkSuitList");if(!box)return;
  if(!(a&&typeof a.share_advise==="function")||typeof ING_LINEUP==="undefined"||!ING_LINEUP.models){box.textContent="This copy of Ingenium cannot rate models for this computer.";return;}
  var keys=Object.keys(ING_LINEUP.models).filter(function(k){var sp=ING_LINEUP.models[k];return sp&&sp.size&&!/-(dspark|mmproj)$/.test(k);});
  var rows=keys.map(function(k){var sp=ING_LINEUP.models[k],rec=null;try{rec=lineupRec(k);}catch(e){}
    return {id:rec?String(rec.id):"",name:sp.name,file:sp.file||"",size:sp.size,lineup:k,have:!!rec};});
  lend.suitAt=Date.now();
  Promise.resolve().then(function(){return a.share_advise(rows.map(function(r){return {id:r.id,name:r.name,file:r.file,size:r.size,lineup:r.lineup};}));}).then(function(res){
    var o=(lend.st&&lend.st.options)||{},g={quick:[],ok:[],slow:[],"too big":[]};
    rows.forEach(function(r,i){var x=res&&res[i];if(x&&x.advice&&g[x.advice])g[x.advice].push({r:r,x:x});});
    Object.keys(g).forEach(function(k){g[k].sort(function(p,q){return (q.r.size||0)-(p.r.size||0);});});
    box.innerHTML="";
    var h=document.createElement("div");h.textContent="On this computer"+(o.ram_gb?" ("+Math.round(o.ram_gb)+" GB of memory, "+(o.cpu_only?"processor only":"graphics chip")+")":"")+":";box.appendChild(h);
    [["quick","Quick","about 6 words a second or more",6],["ok","A little slower","about 3 to 6 words a second",4],["slow","Slow","under 3 words a second: for patient work",3]].forEach(function(t){
      var list=g[t[0]];if(!list.length)return;var gh=document.createElement("div");gh.className="lk-suit-g";gh.textContent=t[1]+" ("+t[2]+")";box.appendChild(gh);
      list.slice(0,t[3]).forEach(function(e){var d=document.createElement("div");d.className="lk-suit-r";
        d.textContent=e.r.name+" · "+fmtBytes(e.r.size)+" · "+(e.x.tps_measured?"measured ":"about ")+wps(e.x.tps)+" words a second"+(e.r.have?" · on this computer":"");box.appendChild(d);});
      if(list.length>t[3]){var m=document.createElement("div");m.className="lk-suit-r";m.textContent="and "+(list.length-t[3])+" more";box.appendChild(m);}});
    if(g["too big"].length){var tb=document.createElement("div");tb.className="lk-suit-g";tb.textContent="Too big for this computer: "+g["too big"].slice(0,4).map(function(e){return e.r.name;}).join(", ")+(g["too big"].length>4?" and "+(g["too big"].length-4)+" more":"")+".";box.appendChild(tb);}
    var n=document.createElement("div");n.className="muted";n.style.marginTop="8px";
    n.textContent="These speeds are guesses until a model has answered here. After that, the speed measured on this computer is shown.";box.appendChild(n);},
    function(e){box.textContent="The models could not be rated: "+(e&&e.message||e);});}
if(typeof W.lkHostPaint==="function"){var oHP=W.lkHostPaint;
  W.lkHostPaint=lkHostPaint=wrap(oHP,function(st){var r=oHP.apply(this,arguments);try{lendPaint(st);}catch(e){}return r;});}
/* a paint that was waiting before this part ran */
try{var hi=$("lkHostInfo");if(hi&&$("linkHost")&&!$("linkHost").hidden)lkHostRefresh();}catch(e){}
try{notePaint();}catch(e){}
})();
;try{window.__ingParts["p205"]="running";}catch(_){}
</script>
