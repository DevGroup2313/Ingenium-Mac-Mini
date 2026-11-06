<style id="r217-css">
/* ============ R217 · NEWER MODELS, FOUND ONLINE WHEN SHE ASKS (Ingenium 6.11.2, 4 November 2026) ============
   Her words (4 November 2026): "I want a path built into Ingenium's models page that goes online when I click on the button to check
   and download and install newer models for Ingenium instead of having to continuously do it myself or having you do it on this chat.
   That way I can always have and install the fastest, strongest and newer models for all of my devices when they are released."
   One key on the Models page asks Hugging Face, at that moment, for the newest GGUF files of the publishers Ingenium trusts. For each
   it reads, from Hugging Face's own records, the file's size and fingerprint (SHA-256), the model's kind (its architecture) and its
   size in parameters; it offers only what this device's engine can load and what fits this device's memory, and installs it with the
   same checked download as Ingenium's own models. What it cannot know before she tries a model is how well it answers: it says so.
   Ingenium reaches the internet only when she asks: the weekly look is a switch, off until she turns it on. */
/* 6.35: a card of its own, in the Models page's room "Newer models" (modules/r173.js); until then it sat at the foot of the long card
   of the four houses, out of sight. Her words (4 November 2026): the path to check, download and install newer models, "the existing
   section to be redesigned and be visible". */
#foundCard{margin-top:14px}
#foundCard .fd-head{padding-bottom:2px}
#foundCard .fd-head .btn{min-height:38px;padding:8px 16px;font-weight:700}
#foundCard .fd-sum{margin:2px 0 8px;font:600 13px/1.45 var(--sans,system-ui,sans-serif);color:var(--ink-1)}
#foundCard .fd-empty{margin:4px 0 6px;padding:12px 14px;border:1px dashed var(--hairline,rgba(34,26,46,.18));border-radius:12px;font:12.8px/1.55 var(--sans,system-ui,sans-serif);color:var(--ink-2)}
#foundCard .fd-row{box-shadow:var(--pop,0 1px 2px rgba(40,22,68,.08));transition:transform .16s ease,box-shadow .16s ease}
#foundCard .fd-row:hover{transform:translateY(-1px)}
body[data-motion="minimal"] #foundCard .fd-row{transition:none}body[data-motion="minimal"] #foundCard .fd-row:hover{transform:none}
@media (prefers-reduced-motion:reduce){#foundCard .fd-row{transition:none}#foundCard .fd-row:hover{transform:none}}
#foundCard .fd-head{display:flex;align-items:center;gap:10px;flex-wrap:wrap}
#foundCard .fd-head h3{margin:0;flex:1 1 auto;font:700 15px/1.3 var(--sans,system-ui,sans-serif);color:var(--ink-1)}
#foundCard .fd-note{margin:6px 0 10px;font:12.5px/1.55 var(--sans,system-ui,sans-serif);color:var(--ink-3)}
#foundCard .fd-status{font:12.5px/1.45 var(--sans,system-ui,sans-serif);color:var(--ink-2);margin:4px 0 8px}
#foundCard .fd-list{display:grid;gap:8px}
#foundCard .fd-row{border:1px solid var(--hairline,rgba(34,26,46,.12));border-radius:12px;padding:10px 12px;background:var(--card-hi,rgba(255,255,255,.6));display:grid;grid-template-columns:1fr auto;gap:4px 12px;align-items:start}
#foundCard .fd-row b{font:700 13.5px/1.35 var(--sans,system-ui,sans-serif);color:var(--ink-1);word-break:break-word}
#foundCard .fd-row .fd-meta{grid-column:1;font:12px/1.5 var(--sans,system-ui,sans-serif);color:var(--ink-3)}
#foundCard .fd-row .fd-keys{grid-column:2;grid-row:1 / span 2;display:flex;flex-direction:column;gap:6px;align-items:flex-end}
#foundCard .fd-row .ok{color:#2f7a55}
#foundCard .fd-row .no{color:#a8423e}
#foundCard .fd-row .fd-new{display:inline-block;margin-left:6px;padding:0 6px;border-radius:6px;background:var(--accent-softer,rgba(106,63,181,.1));color:var(--accent,#6a3fb5);font:700 10.5px/1.6 var(--sans,system-ui,sans-serif);vertical-align:1px}
#foundCard details{margin-top:10px}
#foundCard summary{cursor:pointer;font:600 12.5px/1.4 var(--sans,system-ui,sans-serif);color:var(--accent,#6a3fb5)}
#foundCard .fd-skip{font:12px/1.55 var(--sans,system-ui,sans-serif);color:var(--ink-3);margin:6px 0 0;padding-left:16px}
#foundCard label.fd-sw{display:inline-flex;align-items:center;gap:6px;font:12.5px/1.3 var(--sans,system-ui,sans-serif);color:var(--ink-2);cursor:pointer}
@media (max-width:560px){#foundCard .fd-row{grid-template-columns:1fr}#foundCard .fd-row .fd-keys{grid-column:1;grid-row:auto;flex-direction:row;align-items:center}}
</style>
<script>try{(window.__ingParts=window.__ingParts||{})["p217"]="started";}catch(_){}
(function r217(){
"use strict";
if(window.__r217)return;window.__r217=1;
var W=window,HF="https://huggingface.co/";
function $id(i){return document.getElementById(i);}
function mk(tag,cls,txt){var e=document.createElement(tag);if(cls)e.className=cls;if(txt!=null)e.textContent=txt;return e;}
function fmtGB(b){return (b/1073741824).toFixed(b>=10737418240?0:1)+" GB";}
/* the kinds of model the engine loads: llama.cpp b11321 (every Ingenium app), read from its src/llama-arch.cpp; and those only the newer
   engine (b12000) adds, loadable on a computer whose copy carries it (modules/r214.js asks the computer app) */
var KINDS=["afmoe","apertus","arcee","arctic","arwkv7","baichuan","bailingmoe","bailingmoe2","bailingmoe3","bert","bitnet","bloom","chameleon","chatglm","clip","codeshell","cogvlm","cohere2","cohere2moe","command-r","dbrx","deci","deepseek","deepseek2","deepseek2-ocr","deepseek32","deepseek4","dflash","dots1","dots3note","dream","eagle3","ernie4_5","ernie4_5-moe","eurobert","exaone","exaone-moe","exaone4","falcon","falcon-h1","gemma","gemma-embedding","gemma2","gemma3","gemma3n","gemma4","gemma4-assistant","glm-dsa","glm4","glm4moe","glm5-next","gpt-oss","gpt2","gptj","gptneox","granite","granite_swa","granitehybrid","granitemoe","graniteswitch","grok","grovemoe","hrm_text","hunyuan-dense","hunyuan-moe","hunyuan_vl","hy_v3","hy_v4","internlm2","jais","jais2","jamba","jina-bert-v2","jina-bert-v3","kimi-k3","kimi-linear","laguna","lfm2","lfm2moe","llada","llada-moe","llama","llama-embed","llama4","maincoder","mamba","mamba2","maple","mellum","mimo2","minicpm","minicpm3","minimax-01","minimax-m2","minimax-m3","mistral3","mistral4","modern-bert","mpt","muse-glimmer","nanbeige","nemotron","nemotron_h","nemotron_h_moe","neo-bert","nomic-bert","nomic-bert-moe","olmo","olmo2","olmoe","openelm","orion","paddleocr","pangu-embedded","phi2","phi3","phimoe","plamo","plamo2","plamo3","plm","pockettts","qwen","qwen2","qwen2moe","qwen2vl","qwen3","qwen35","qwen35moe","qwen3moe","qwen3next","qwen3tts","qwen3vl","qwen3vlmoe","qwen4exp","refact","rnd1","rwkv6","rwkv6qwen2","rwkv7","seed_oss","smallthinker","smollm3","spark2_5","stablelm","starcoder","starcoder2","step35","t5","t5encoder","talkie","wavtokenizer-dec","xverse"];   /* 153 kinds, read 4 November 2026 */
var KINDS_NEWER=["beam","clef","deepseek41","flint","gemma-embedding2","k2-horizon","kolibri1","lfm3","limite","maion-coder","mistral-large4","muse-spark","sensenova_u1","vllm-decision2"];
/* the publishers whose GGUF files Ingenium reads: the engine's own makers, the makers of the models, and the best-known converters */
var PUBLISHERS=["ggml-org","unsloth","bartowski","lmstudio-community","Qwen","LiquidAI","mistralai","google","ibm-granite","nvidia","openbmb","microsoft"];
var QUANTS=["Q4_K_M","UD-Q4_K_XL","Q4_K_XL","Q4_K_S","IQ4_XS","Q5_K_M","Q4_0","Q3_K_M","Q6_K","Q8_0"];
var SKIP=/mmproj|imatrix|dflash|dspark|eagle|[-_]mtp[-_.]|draft|embed|rerank|vae|lora/i;
function st(){if(!state.found||typeof state.found!=="object")state.found={};var f=state.found;f.models=f.models||{};f.list=f.list||[];return f;}
function net(url){return Promise.resolve(netFetch(url,{headers:{"Accept":"application/json"},timeout:40})).then(function(r){if(!r.ok)throw new Error("Hugging Face answered "+r.status+" for "+url.replace(HF,""));return r.text();}).then(function(t){return JSON.parse(t);});}
function knownRepos(){var o={};try{Object.keys(ING_LINEUP.models).forEach(function(k){var u=String(ING_LINEUP.models[k].url||""),m=/huggingface\.co\/([^\/]+\/[^\/]+)\/resolve\//.exec(u);if(m)o[m[1].toLowerCase()]=1;});}catch(e){}return o;}
var newerKinds=null;
function loadable(arch){if(!arch)return null;arch=String(arch).toLowerCase();if(KINDS.indexOf(arch)>=0)return "proven";if(newerKinds&&newerKinds.indexOf(arch)>=0)return "newer";return "";}
function readNewer(){var a=null;try{a=typeof deskApi==="function"?deskApi():null;}catch(e){}if(!a||typeof a.engine_choice!=="function")return Promise.resolve();
  return Promise.resolve(a.engine_choice()).then(function(r){newerKinds=r&&r.newer&&r.newer.available?KINDS_NEWER.slice():null;},function(){});}
function house(name,params){var n=String(name).toLowerCase();if(/coder|code|devstral|codestral/.test(n))return "faber";if(/think|reason|r1\b|qwq|magistral/.test(n))return "scriba";return params&&params<=4.5?"velox":"magister";}
var HOUSE={velox:"Velox",scriba:"Scriba",magister:"Magister",faber:"Faber"};
/* the file of a repository to install: the first quant on the list that fits, whole or in parts */
function pickFile(tree,usable){var files=tree.filter(function(x){return x&&x.type==="file"&&/\.gguf$/i.test(x.path)&&!SKIP.test(x.path)&&x.lfs&&x.lfs.oid;});
  var groups={};files.forEach(function(x){var base=x.path.split("/").pop(),q=null;for(var i=0;i<QUANTS.length;i++){if(base.toUpperCase().indexOf(QUANTS[i].toUpperCase())>=0&&!(QUANTS[i]==="Q4_K_XL"&&/UD-Q4_K_XL/i.test(base))){q=QUANTS[i];break;}}
    if(!q)return;(groups[q]=groups[q]||[]).push(x);});
  var tooBig=null;
  for(var i=0;i<QUANTS.length;i++){var g=groups[QUANTS[i]];if(!g||!g.length)continue;
    var parts=g.filter(function(x){return /-\d{5}-of-\d{5}\.gguf$/i.test(x.path);}).sort(function(a,b){return a.path<b.path?-1:1;});
    var set=parts.length?parts:[g.slice().sort(function(a,b){return a.size-b.size;})[0]];
    if(parts.length){var m=/-(\d{5})-of-(\d{5})\.gguf$/i.exec(parts[0].path);if(!m||+m[2]!==parts.length)continue;}
    var total=set.reduce(function(a,x){return a+(+x.lfs.size||+x.size||0);},0),need=lineupNeedGB({size:total});
    var pick={quant:QUANTS[i],files:set,size:total,need:need};
    if(usable==null||need<=usable)return pick;if(!tooBig||total<tooBig.size)tooBig=pick;}
  return tooBig?Object.assign(tooBig,{tooBig:true}):null;}
function lic(info){var c=info.cardData||{},l=c.license||"";if(!l)(info.tags||[]).forEach(function(t){if(/^license:/.test(t))l=t.slice(8);});return l?String(l):"";}
/* look: the newest repositories of each publisher, then each one's own record (kind, parameters) and its files (sizes, fingerprints) */
var busy=false;
function check(manual){if(busy)return Promise.resolve();busy=true;var f=st(),usable=null,dev=lineupDevice();try{usable=lineupUsableGB();}catch(e){}
  say("Asking Hugging Face for the newest models of "+PUBLISHERS.length+" publishers…");
  var known=knownRepos(),since=Date.now()-120*864e5,seen={};
  return readNewer().then(function(){return Promise.all(PUBLISHERS.map(function(a){
      return net(HF+"api/models?author="+encodeURIComponent(a)+"&search=GGUF&sort=lastModified&direction=-1&limit=25").then(function(L){return (Array.isArray(L)?L:[]).map(function(x){x.__pub=a;return x;});},function(){return [];});}));})
  .then(function(lists){var all=[];lists.forEach(function(L){L.forEach(function(x){var id=String(x.id||x.modelId||"");if(!id||seen[id.toLowerCase()])return;seen[id.toLowerCase()]=1;
        if(!/gguf/i.test(id)&&(x.tags||[]).indexOf("gguf")<0)return;if(SKIP.test(id))return;if(known[id.toLowerCase()])return;
        var t=Date.parse(x.createdAt||x.lastModified||"")||0;if(t&&t<since)return;all.push({id:id,pub:x.__pub,at:t,likes:+x.likes||0,downloads:+x.downloads||0});});});
      all.sort(function(a,b){return b.at-a.at;});all=all.slice(0,18);
      say("Reading "+all.length+" newer repositories: their kinds, sizes and fingerprints…");
      return Promise.all(all.map(function(c){return Promise.all([net(HF+"api/models/"+c.id),net(HF+"api/models/"+c.id+"/tree/main")]).then(function(r){c.info=r[0]||{};c.tree=Array.isArray(r[1])?r[1]:[];return c;},function(e){c.err=String(e&&e.message||e);return c;});}));})
  .then(function(cands){var list=[],before=f.at||0;
      cands.forEach(function(c){var info=c.info||{},g=info.gguf||{},arch=g.architecture||"",params=+g.total?Math.round(+g.total/1e8)/10:null,name=c.id.split("/")[1].replace(/[-_]GGUF$/i,"");
        var row={id:c.id,name:name,pub:c.pub,at:c.at,arch:arch,params:params,licence:lic(info),likes:c.likes,downloads:c.downloads,isNew:c.at>before,why:""};
        if(c.err){row.skip="could not be read ("+c.err+")";list.push(row);return;}
        var can=loadable(arch);row.engine=can;
        if(!arch){row.skip="its kind (architecture) is not stated in its record, so Ingenium cannot say this engine loads it";list.push(row);return;}
        if(!can){row.skip="its kind, "+arch+", is not one this device's engine loads"+(KINDS_NEWER.indexOf(arch)>=0?" (the newer engine does, on a computer whose copy carries it)":"");list.push(row);return;}
        var p=pickFile(c.tree,usable);if(!p){row.skip="no file of a quantisation Ingenium uses (Q4_K_M and its neighbours) with a fingerprint";list.push(row);return;}
        row.quant=p.quant;row.size=p.size;row.need=p.need;row.files=p.files.map(function(x){return {file:x.path.split("/").pop(),path:x.path,size:+x.lfs.size||+x.size,sha256:x.lfs.oid};});
        if(p.tooBig){row.skip="too large for this device: the smallest suitable file is "+fmtGB(p.size)+" and needs about "+p.need.toFixed(1)+" GB of memory";list.push(row);return;}
        row.house=house(name,params);row.ok=true;list.push(row);});
      f.at=Date.now();f.dev=dev;f.list=list;try{saveState();}catch(e){}busy=false;paint();
      var n=list.filter(function(x){return x.ok;}).length;say(n?n+" newer model"+(n===1?"":"s")+" for this device, and "+(list.length-n)+" that are not (each says why).":"Nothing newer that this device can take, among "+list.length+" looked at.");})
  .catch(function(e){busy=false;say("Hugging Face could not be reached: "+String(e&&e.message||e)+". Nothing was changed.");});}
/* a found model becomes a lineup entry of its own (kept with her data), then installs as Ingenium's own do: fingerprint checked */
function keyOf(row){return "found:"+row.id.toLowerCase().replace(/[^a-z0-9]+/g,"-")+":"+row.quant.toLowerCase();}
function specOf(row){var first=row.files[0],url=function(x){return HF+row.id+"/resolve/main/"+x.path.split("/").map(encodeURIComponent).join("/");};
  var sp={name:row.name+" ("+row.quant+")",maker:row.pub,params:row.params||0,thinks:false,file:first.file,size:row.size,sha256:first.sha256,url:url(first),page:HF+row.id,
    licence:row.licence||"see its page",licenceUrl:HF+row.id,found:true,
    why:"Found on Hugging Face on "+new Date().toLocaleDateString("en-GB",{day:"numeric",month:"long",year:"numeric"})+", from "+row.pub+": "+(row.params?row.params+"B parameters, ":"")+"its kind "+row.arch+", "+fmtGB(row.size)+" ("+row.quant+"), needing about "+row.need.toFixed(1)+" GB of memory. Not part of Ingenium's own reviewed lineup: try it before you rely on it."};
  if(row.files.length>1){sp.parts=row.files.map(function(x){return {file:x.file,size:x.size,sha256:x.sha256,url:url(x)};});sp.sha256=first.sha256;sp.size=row.size;}
  return sp;}
function adopt(key,sp,hs){ING_LINEUP.models[key]=sp;var dev=lineupDevice(),d=ING_LINEUP.devices[dev==="web"?"desktop":dev];
  if(d&&hs){d.more=d.more||{};d.more[hs]=[].concat(d.more[hs]||[]);if(d.more[hs].indexOf(key)<0)d.more[hs].push(key);}}
function install(row,btn){if(row.files.length>1&&lineupDevice()!=="mac-arm"&&lineupDevice()!=="desktop"){say("A model in parts installs on a computer only.");return;}
  var key=keyOf(row),sp=specOf(row),f=st();f.models[key]={spec:sp,house:row.house};adopt(key,sp,row.house);try{saveState();}catch(e){}
  if(btn){btn.disabled=true;btn.textContent="Installing…";}
  Promise.resolve(lineupInstall(key)).then(function(){f.models[key].installed=Date.now();try{saveState();}catch(e){}paint();
      say(sp.name+" is installed, its file checked against Hugging Face's fingerprint. Make it "+HOUSE[row.house]+"'s model below, or choose it in the chat's model key.");},
    function(e){if(btn){btn.disabled=false;btn.textContent="Install";}say(sp.name+" was not installed: "+String(e&&e.message||e));});}
function makeHouse(row){var key=keyOf(row);state.tierPick=state.tierPick||{};state.tierPick[row.house]=key;try{saveState();lineupTag();renderLineup();}catch(e){}
  say(row.name+" is now "+HOUSE[row.house]+"'s model on this device. The house's own choice comes back from its card's menu.");}
/* the card */
var statusLine="";
function say(t){statusLine=t;var s=$id("foundStatus");if(s)s.textContent=t;}
function card(){var c=$id("foundCard");if(c)return c;var host=$id("lineupCard");if(!host||!host.parentNode)return null;
  c=mk("div","card");c.id="foundCard";var h=mk("div","fd-head");h.appendChild(mk("h3",null,"Newer models, found online"));
  var go=mk("button","btn small primary","Check for newer models");go.type="button";go.id="foundGo";go.onclick=function(){if(lineupDevice()==="web"){say("A web browser cannot install models: the Ingenium app for this device can.");return;}check(true);};h.appendChild(go);
  c.appendChild(h);
  c.appendChild(mk("p","fd-note","Asks Hugging Face, when you press it, for the newest GGUF files of "+PUBLISHERS.join(", ")+". For each, Ingenium reads from Hugging Face's own records the file's size and fingerprint (SHA-256), the model's kind and its size in parameters, and offers only what this device's engine can load and what fits its memory. It installs with the same checked download as Ingenium's own models. It cannot know before you try a model how well it answers: try a new one before you rely on it."));
  var sw=mk("label","fd-sw"),cb=document.createElement("input");cb.type="checkbox";cb.id="foundWeekly";cb.checked=!!st().weekly;cb.onchange=function(){st().weekly=cb.checked;try{saveState();}catch(e){}};
  sw.appendChild(cb);sw.appendChild(document.createTextNode("Look once a week when Ingenium opens (it only lists; it installs nothing without your press)"));c.appendChild(sw);
  var s=mk("div","fd-status");s.id="foundStatus";s.setAttribute("role","status");s.setAttribute("aria-live","polite");c.appendChild(s);
  var sm=mk("p","fd-sum");sm.id="foundSum";sm.hidden=true;c.appendChild(sm);
  var l=mk("div");l.id="foundList";c.appendChild(l);host.parentNode.insertBefore(c,host.nextSibling);return c;}
function paint(){var c=card();if(!c)return;var f=st(),box=$id("foundList");box.innerHTML="";var sum=$id("foundSum");
  if(!statusLine&&f.at)say("Looked on "+new Date(f.at).toLocaleString("en-GB",{day:"numeric",month:"short",hour:"2-digit",minute:"2-digit"})+".");
  var ok=f.list.filter(function(x){return x.ok;}),no=f.list.filter(function(x){return !x.ok;});
  /* 6.35: what the last look found, in one line, or what pressing Check does when nothing was looked at yet */
  if(sum){var nw=ok.filter(function(x){return x.isNew;}).length;sum.hidden=!f.at;
    sum.textContent=!f.at?"":ok.length?ok.length+" model"+(ok.length===1?"":"s")+" this device can run"+(nw?", "+nw+" new since the look before":"")+".":"Nothing new this device can run was found at the last look.";}
  if(!f.at&&!f.list.length){box.appendChild(mk("div","fd-empty","Nothing has been looked for yet. Press Check for newer models: Ingenium asks Hugging Face once, and lists only the models this device can load and hold, each with its size, its fingerprint and its licence. Nothing is installed until you press Install."));return;}
  if(ok.length){var L=mk("div","fd-list");ok.forEach(function(row){var r=mk("div","fd-row"),t=mk("b",null,row.name);if(row.isNew)t.appendChild(mk("span","fd-new","new"));r.appendChild(t);
      var key=keyOf(row),have=null;try{have=lineupRec(key);}catch(e){}
      var meta=[row.pub,row.at?new Date(row.at).toLocaleDateString("en-GB",{day:"numeric",month:"short",year:"numeric"}):"",row.params?row.params+"B parameters":"",row.quant+", "+fmtGB(row.size)+(row.files.length>1?" in "+row.files.length+" parts":""),
        "needs about "+row.need.toFixed(1)+" GB","its kind: "+row.arch+(row.engine==="newer"?" (the newer engine)":""),row.licence?"licence: "+row.licence:"","for "+HOUSE[row.house]+" (a guess from its name and size)"].filter(Boolean).join(" · ");
      r.appendChild(mk("div","fd-meta",meta));var k=mk("div","fd-keys");
      if(have){var u=mk("button","btn xs",state.tierPick&&state.tierPick[row.house]===key?HOUSE[row.house]+"'s model":"Make it "+HOUSE[row.house]+"'s model");u.type="button";u.onclick=function(){makeHouse(row);paint();};k.appendChild(u);}
      else{var b=mk("button","btn xs primary","Install");b.type="button";b.onclick=function(){install(row,b);};k.appendChild(b);}
      var pg=mk("a","small",null);pg.href=HF+row.id;pg.target="_blank";pg.rel="noopener";pg.textContent="Its page";k.appendChild(pg);r.appendChild(k);L.appendChild(r);});box.appendChild(L);}
  if(no.length){var d=mk("details"),sm=mk("summary",null,no.length+" looked at and not offered for this device, with the reason");d.appendChild(sm);var ul=mk("ul","fd-skip");
    no.forEach(function(x){ul.appendChild(mk("li",null,x.id+": "+x.skip+"."));});d.appendChild(ul);box.appendChild(d);}}
/* at start: found models she installed keep their entries; the weekly look, only when she has switched it on */
function restore(){var f=st();Object.keys(f.models).forEach(function(k){var m=f.models[k];if(m&&m.spec)adopt(k,m.spec,m.house);});}
function hook(){restore();
  if(typeof W.renderLineup==="function"&&!W.renderLineup.__r217){var o=W.renderLineup;W.renderLineup=function(){var r=o.apply(this,arguments);try{paint();}catch(e){}return r;};W.renderLineup.__r217=1;try{renderLineup=W.renderLineup;}catch(e){}}
  try{paint();}catch(e){}
  var f=st();if(f.weekly&&lineupDevice()!=="web"&&(!f.at||Date.now()-f.at>7*864e5))setTimeout(function(){check(false);},8000);}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",hook);else setTimeout(hook,0);
window.addEventListener("load",function(){setTimeout(function(){try{restore();paint();}catch(e){}},1200);});
W.IngFound={check:check,pickFile:pickFile,specOf:specOf,keyOf:keyOf,loadable:loadable,kinds:function(){return KINDS.slice();},publishers:PUBLISHERS,install:install,house:house};
})();
;try{window.__ingParts["p217"]="running";}catch(_){}
</script>
