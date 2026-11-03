<style id="r203-css">
/* ============ R203 · THE MODEL LINEUP OF 6.9.2 ============ */
.lu-lend{font-size:12.5px;line-height:1.45;color:var(--ink-2);margin-top:8px}
.cat-need{font-size:12px;line-height:1.4;color:var(--ink-3);margin-top:3px}
.cat-need.no{color:#b4483c}
body[data-theme="night"] .cat-need.no{color:#f0a097}
.lu-opts>summary{cursor:pointer;list-style:none}
.lu-opts>summary::-webkit-details-marker{display:none}
.lu-opts>summary::before{content:"▸ ";color:var(--accent)}
.lu-opts[open]>summary::before{content:"▾ "}
.lu-opts>.lu-opt-rows{display:grid;gap:8px;margin-top:8px}
</style>
<script>try{(window.__ingParts=window.__ingParts||{})["p203"]="started";}catch(_){}
/* ============ R203 · THE MODEL LINEUP OF 6.9.2 (31 October 2026) ============
   The owner's words (31 October 2026): "I also want you to add better, faster and stronger models to Ingenium for all of the
   houses. I want the app to really be upgraded and be operating up to standards." Her devices: a MacBook Pro with 8 GB, a Mac
   mini with Apple silicon and 16 GB, two Windows laptops with 16 GB (one with weak graphics), a Fire tablet, an iPhone and an
   iPad; and, planned, a Mac with 64 GB: "I still want the strong models to be provided as options in Ingenium ... I want the
   option that would work really fast and well on my machines."
   What this module does, on the lineup the page already holds (the base, build_page.py's R105 and modules/r105.js, r116.js):
   1. adds the models that round 7 of .github/workflows/lineup-sources.yml read from Hugging Face on 31 October 2026 (each file's
      name, size and SHA-256 are the ones its repository listed; build/lineup_quants.json has the other qualities of each),
      and the compact and best copies a house may use, made from those qualities;
   2. gives every kind of device its houses by memory (each list: the first model the device has the memory for; a computer
      with no graphics chip the engine can use has its own lists; a device that cannot tell its memory takes the smallest);
   3. gives each new model the sampling settings its own card gives, thinking and plain answers apart, and Granite 4.2 the
      thinking its card describes (it thinks first unless the Thinking key is off);
   4. lists the models of Scriba and Magister as options, folded under one line (Faber's list, R105, already lists its models), each with
      what it needs and what the device has to spare, and in More models, which also gets the other strong models;
   5. says in one plain line where a house cannot get stronger for lack of memory, and where a larger computer's models can be
      borrowed. The memory rule is not changed: lineupNeedGB, lineupUsableGB. */
(function r203Lineup(){
"use strict";
if(typeof ING_LINEUP==="undefined"||!ING_LINEUP.models||!ING_LINEUP.devices)return;
var M=ING_LINEUP.models,D=ING_LINEUP.devices,Q=(window.IngQuality&&window.IngQuality.table)||{};

/* ---------- 1. the new models: every field the other entries have ---------- */
var NEW={
"minicpm5-2b":{name:"MiniCPM5 2B",maker:"OpenBMB",params:2,thinks:true,
  file:"MiniCPM5-2B-Q4_K_M.gguf",size:1561318368,sha256:"ec2d5801640099e97d8d7e8003ad4d81f336e757811f03a26173dddf386602fd",
  url:"https://huggingface.co/openbmb/MiniCPM5-2B-GGUF/resolve/main/MiniCPM5-2B-Q4_K_M.gguf",
  page:"https://huggingface.co/openbmb/MiniCPM5-2B",licence:"Apache 2.0",licenceUrl:"https://github.com/OpenBMB/MiniCPM/blob/main/LICENSE",
  why:"OpenBMB's small model of September 2026, under Apache 2.0: 2.5B parameters and a memory of 131,072 tokens. Its card's example turns thinking on, so it can reason before it answers, and Ingenium uses the settings its maker gives (temperature 1.0, top-p 0.95, no minimum-probability filter). For tablets and phones with about 4.5 GB of memory or more, and for computers with 8 GB."},
"qwen3.8-27b":{name:"Qwen3.8 27B",maker:"Qwen (Alibaba)",params:27,thinks:true,
  file:"Qwen3.8-27B-Q4_K_M.gguf",size:18973870528,sha256:"c600de0300ae8a0eb3a6c0b8b5561b8b96f16bd2c863c2a66c42de29d391a747",
  url:"https://huggingface.co/ggml-org/Qwen3.8-27B-GGUF/resolve/main/Qwen3.8-27B-Q4_K_M.gguf",
  page:"https://huggingface.co/Qwen/Qwen3.8-27B",licence:"Apache 2.0",licenceUrl:"https://www.apache.org/licenses/LICENSE-2.0",
  why:"Qwen's dense 27B of August 2026, under Apache 2.0, with a memory of 262,144 tokens. It thinks first by default and the Thinking key turns that off, as its card describes; Ingenium uses the card's settings for each. Every one of its 27B parameters works on each word, so it is slower than a mixture-of-experts model; Ingenium chooses it for hard questions on a computer that can hold it. For computers with about 32 GB of memory or more.",vision:{"repos": ["unsloth/Qwen3.8-27B-GGUF", "ggml-org/Qwen3.8-27B-GGUF"], "prefer": ["mmproj-F16.gguf", "mmproj-BF16.gguf", "mmproj-F32.gguf"]}},
"qwen3.6-35b-a3b":{name:"Qwen3.6 35B-A3B",maker:"Qwen (Alibaba)",params:35,thinks:true,
  file:"Qwen3.6-35B-A3B-UD-Q4_K_M.gguf",size:22134528992,sha256:"ac0e2c1189e055faa36eff361580e79c5bd6f8e76bffb4ce547f167d53e31a61",
  url:"https://huggingface.co/unsloth/Qwen3.6-35B-A3B-GGUF/resolve/main/Qwen3.6-35B-A3B-UD-Q4_K_M.gguf",
  page:"https://huggingface.co/Qwen/Qwen3.6-35B-A3B",licence:"Apache 2.0",licenceUrl:"https://huggingface.co/Qwen/Qwen3.6-35B-A3B/blob/main/LICENSE",
  why:"Qwen's mixture-of-experts of April 2026, under Apache 2.0: 35B parameters of which 3B work on each word, so it answers much faster than a dense model of its size. It has a memory of 262,144 tokens and can read pictures. It thinks first by default and the Thinking key turns that off, as its card describes. For computers with about 48 GB of memory or more.",vision:{"repos": ["unsloth/Qwen3.6-35B-A3B-GGUF"], "prefer": ["mmproj-F16.gguf", "mmproj-BF16.gguf", "mmproj-F32.gguf"]}},
"gemma-4-31b":{name:"Gemma 4 31B",maker:"Google",params:31,thinks:true,
  file:"gemma-4-31B_q4_0-it.gguf",size:17651001568,sha256:"179cfb99212709597eae5929112cfca677e1bbf566178b479ae1da0c4772874b",
  url:"https://huggingface.co/google/gemma-4-31B-it-qat-q4_0-gguf/resolve/main/gemma-4-31B_q4_0-it.gguf",
  page:"https://huggingface.co/google/gemma-4-31B-it-qat-q4_0-gguf",licence:"Apache 2.0",licenceUrl:"https://www.apache.org/licenses/LICENSE-2.0",
  why:"Google's largest Gemma 4, a dense 31B in Google's own 4-bit form: 80.0% on LiveCodeBench v6 in its maker's tests (77.1% for the 26B-A4B), and a memory of 256K tokens. All of its parameters work on each word, so it is slower than Gemma 4 26B-A4B. For computers with about 32 GB of memory or more."},
"granite-4.2-8b":{name:"Granite 4.2 8B",maker:"IBM",params:8,thinks:true,
  file:"granite-4.2-8b-Q4_K_M.gguf",size:5347917952,sha256:"16a9369d0805f80b7377d25d87f937a90c05dc04ad79173a52001e42c9aab311",
  url:"https://huggingface.co/ibm-granite/granite-4.2-8b-GGUF/resolve/main/granite-4.2-8b-Q4_K_M.gguf",
  page:"https://huggingface.co/ibm-granite/granite-4.2-8b",licence:"Apache 2.0",licenceUrl:"https://www.apache.org/licenses/LICENSE-2.0",
  why:"IBM's 8B Granite 4.2 (August 2026), under Apache 2.0, with a memory of 131,072 tokens. Like the 3B it thinks first by default and the Thinking key turns that off, and IBM asks for temperature 1.0 and top-p 0.95 for every kind of task. Its usual file needs about 6.3 GB of memory; on a computer with 8 GB, Ingenium uses its compact copy."}
};
Object.keys(NEW).forEach(function(k){if(!M[k])M[k]=NEW[k];});
/* Granite 4.2 thinks first unless thinking is switched off (IBM's card: enable_thinking, thinking is the default) */
if(M["granite-4.2-3b"]){M["granite-4.2-3b"].thinks=true;
  M["granite-4.2-3b"].why="IBM's small model of August 2026, made for work and code, with a memory of 131,072 tokens. It thinks first by default and the Thinking key turns that off, as IBM's card describes; IBM asks for temperature 1.0 and top-p 0.95 for every kind of task, and Ingenium uses them. For computers with about 5 GB of memory or more and for phones with about 6 GB or more.";}
/* the compact and best copies: the same model, another file of its table (build/lineup_quants.json). A house list names them;
   the first-fit rule then gives a copy only where the usual file does not fit and the copy does (compact), or where the best
   file fits with room to spare (best). */
function q4(of){return Q[of]&&Q[of].Q4_K_M;}
var DERIVED=[
  {key:"granite-4.2-8b-compact",of:"granite-4.2-8b",q:"Q3_K_M",tag:"Compact",
   lead:"IBM's 8B Granite 4.2 (August 2026): it thinks first by default, the Thinking key turns that off, and its memory is 131,072 tokens.",
   say:function(b,v){return "This is the compact copy: its numbers in 3 bits (Q3_K_M), "+fmtBytes(v.size)+" instead of "+fmtBytes(b.size)+", for a computer with 8 GB of memory. It is a little less exact than the usual file. Ingenium gives it to a house only where it is the larger model that fits: more than twice the size of the smaller model beside it, which keeps its usual file.";}},
  {key:"qwen3.5-9b-compact",of:"qwen3.5-9b",q:"Q3_K_M",tag:"Compact",
   lead:"Qwen3.5 9B, the strongest of its family that a computer with 16 GB of memory holds; it can think step by step.",
   say:function(b,v){return "This is the compact copy: its numbers in 3 bits (Q3_K_M), "+fmtBytes(v.size)+" instead of "+fmtBytes(b.size)+". It is a little less exact than the usual file. Ingenium gives it to a house only where the usual file does not fit and the copy does, because it is then stronger than the 4B at its usual quality.";}},
  {key:"qwen3.8-27b-best",of:"qwen3.8-27b",q:"Q8_0",tag:"Best",
   lead:"Qwen's dense 27B of August 2026: it thinks first by default (the Thinking key turns that off), reads pictures, and has a memory of 262,144 tokens.",
   say:function(b,v){return "This is its Best quality (Q8_0): nearly the original, "+fmtBytes(v.size)+" instead of "+fmtBytes(b.size)+". Ingenium gives it to a house on a computer that holds it with room to spare; replies are slower than with the usual file.";}}];
DERIVED.forEach(function(x){var b=M[x.of],base=q4(x.of),v=Q[x.of]&&Q[x.of][x.q];if(!b||!base||!v||M[x.key])return;
  var s=Object.assign({},b);delete s.base;delete s.quality;delete s.drafter;
  s.name=b.name+" · "+x.tag;s.file=v.file;s.size=v.size;s.sha256=v.sha256;s.url=v.url;s.variantOf=x.of;s.variantQuality=x.q;
  s.why=x.lead+" "+x.say(base,v);M[x.key]=s;});

/* ---------- 2. the houses, by device and memory ---------- */
/* Phones and tablets: Scriba is MiniCPM5 2B where the device has about 4.5 GB, then what it was. */
D.android.tiers.scriba=["minicpm5-2b","lfm2.5-1.2b-thinking"];
D.ios.tiers.scriba=["minicpm5-2b","qwen3.5-2b"];
/* Computers: the strong models first, down to what an 8 GB computer holds. Scriba is quick (mixture-of-experts from 24 GB),
   Magister is the strongest that fits (Qwen3.8 27B from 32 GB, in its Best quality from 48 GB), and Faber has Qwen3.6 35B-A3B
   from 48 GB. A compact copy comes just after the usual file of a model more than twice the size of the smaller model that follows. */
var SCRIBA=["qwen3.6-35b-a3b","gemma-4-26b-a4b","gemma-4-e4b","minicpm5-2b","qwen3.5-2b"];
var MAGISTER=["qwen3.8-27b-best","qwen3.8-27b","gemma-4-31b","gemma-4-26b-a4b","qwen3.5-9b","qwen3.5-9b-compact","qwen3.5-4b"];
var FABER_TAIL=["gemma-4-26b-a4b","lfm2.5-24b-a2b","mellum2.1-12b-thinking","gemma-4-12b","lfm2.5-8b-a1b","mellum2-12b-thinking","granite-4.2-8b","granite-4.2-8b-compact","granite-4.2-3b","lfm2.5-2.6b"];
["desktop","mac-arm"].forEach(function(dv){D[dv].tiers.scriba=SCRIBA.slice();D[dv].tiers.magister=MAGISTER.slice();});
/* Macs with Apple silicon: the dense 27B comes before Qwen3-Coder; on Windows and Intel computers the quick mixture-of-experts
   models come first, so that a laptop with an integrated graphics chip is never given the dense 27B or 31B at 32 GB */
D["mac-arm"].tiers.faber=["qwen3.6-35b-a3b","qwen3.8-27b","gemma-4-31b","qwen3-coder-30b-a3b"].concat(FABER_TAIL);
D.desktop.tiers.faber=["qwen3.6-35b-a3b","qwen3-coder-30b-a3b","qwen3.8-27b","gemma-4-31b"].concat(FABER_TAIL);
/* A computer whose engine runs on its processor alone: only the models that are quick there (mixture-of-experts, or small) */
D.desktop.cpuOnly={
  scriba:["qwen3.6-35b-a3b","gemma-4-26b-a4b","minicpm5-2b","qwen3.5-2b"],
  magister:["qwen3.6-35b-a3b","gemma-4-26b-a4b","qwen3.5-4b"],
  faber:["qwen3.6-35b-a3b","qwen3-coder-30b-a3b","gemma-4-26b-a4b","lfm2.5-24b-a2b","mellum2.1-12b-thinking","lfm2.5-8b-a1b","granite-4.2-3b","lfm2.5-2.6b"]};

/* ---------- 3. sampling: the settings each model's own card gives ---------- */
/* MiniCPM5: temperature 1.0, top_p 0.95, min_p 0.0 (llama.cpp's own default min_p of 0.05 can make it repeat); Granite 4.2: temperature 1.0
   and top_p 0.95 for every task; Qwen3.6: its card's thinking, precise-coding and plain sets; Qwen3.8: its card's thinking and plain sets.
   Gemma 4 31B uses the Gemma 4 family that is already there (temperature 1.0, top_k 64, top_p 0.95 are its card's). */
ING_SAMPLING["minicpm5"]={temperature:1.0,top_p:0.95,min_p:0,repeat_penalty:1};
ING_SAMPLING["granite-4.2"]={temperature:1.0,top_p:0.95,min_p:0,repeat_penalty:1};
ING_SAMPLING["qwen3.6"]={think:{temperature:1.0,top_p:0.95,top_k:20,min_p:0,presence_penalty:1.5,repeat_penalty:1},
  plain:{temperature:0.7,top_p:0.8,top_k:20,min_p:0,presence_penalty:1.5,repeat_penalty:1}};
ING_SAMPLING["qwen3.6-code"]={temperature:0.6,top_p:0.95,top_k:20,min_p:0,presence_penalty:0,repeat_penalty:1};
ING_SAMPLING["qwen3.8"]={think:{temperature:1.0,top_p:0.95,top_k:20,min_p:0,presence_penalty:0,repeat_penalty:1},
  plain:{temperature:0.7,top_p:0.8,top_k:20,min_p:0,presence_penalty:1.5,repeat_penalty:1}};
(function families(){var sf=samplingFamily;
  samplingFamily=function(m){if(!m)return null;
    var key=(typeof lineupKeyOfRec==="function"&&lineupKeyOfRec(m))||"";
    var txt=(key+" "+(m.fileName||"")+" "+(m.customName||"")+" "+((m.meta&&(m.meta.name||m.meta.basename))||"")).toLowerCase();
    if(/minicpm-?5/.test(txt))return "minicpm5";
    if(/granite-?4\.2/.test(txt))return "granite-4.2";
    if(/qwen3\.6/.test(txt))return "qwen3.6";
    if(/qwen3\.8/.test(txt))return "qwen3.8";
    return sf.apply(this,arguments);};
  window.samplingFamily=samplingFamily;
  var ms=modelSampling;
  /* Faber with Qwen3.6 thinking: the card's set for precise coding tasks (temperature 0.6, no presence penalty) */
  modelSampling=function(m,effort,think){var fam=samplingFamily(m);
    if(fam==="qwen3.6"&&think&&activeTierFor(m)==="faber"){var o=Object.assign({},ING_SAMPLING["qwen3.6-code"]);
      o.temperature=Math.round(Math.min(1.2,o.temperature*(EFFORT_TEMP[effort]||1))*1000)/1000;o.family="qwen3.6-code";return o;}
    return ms.apply(this,arguments);};
  window.modelSampling=modelSampling;})();

/* ---------- 4. a model installed by its file belongs to every list that names that file ---------- */
/* A strong model can be installed from a house or from More models; the file is the same, so either place finds it. */
(function twin(){var r=lineupRec;
  lineupRec=function(key){var x=r.apply(this,arguments);if(x||!key)return x;var sp=M[key];if(!sp||!sp.file)return null;var f=String(sp.file).toLowerCase();
    return (state.models||[]).filter(function(m){return m.fileState==="ready"&&String(m.fileName||"").toLowerCase()===f;})[0]||null;};
  window.lineupRec=lineupRec;})();

/* ---------- 5. the Models page: the models of Scriba and Magister as options, and the plain line ---------- */
function kind(){var d=lineupDevice();return d==="web"?"desktop":d;}
function whose(){var d=kind();return d==="android"?"this tablet":d==="ios"?"this iPhone or iPad":"this computer";}
/* 6.10.3 (r212): a device's further choices (d.more) follow its own list: shown and chosen here, never the order a house picks in */
function houseList(tier){var d=D[kind()],v=d&&d.tiers&&d.tiers[tier],more=d&&d.more&&d.more[tier],seen={};
  return (v?[].concat(v):[]).concat(more||[]).filter(function(k){if(seen[k]||!M[k])return false;seen[k]=1;return true;});}
function houseName(id){var t=tierSpec(id);return t?t.name:id;}
function choose(tier,k){state.tierPick=state.tierPick||{};
  if(k===lineupKeyFor(tier)&&!state.tierPick[tier])return;
  state.tierPick[tier]=k;saveState();try{lineupTag();}catch(e){}
  if(lineupRec(k)){try{lineupUse(tier);}catch(e){}}
  renderLineup();try{renderModels();}catch(e){}try{paintChatTop();}catch(e){}}
function back(tier){if(state.tierPick)delete state.tierPick[tier];saveState();try{lineupTag();}catch(e){}renderLineup();try{paintChatTop();}catch(e){}}
function optJob(k){var job=lineupJobs[k];if(!job)return;
  [].slice.call(document.querySelectorAll('.lu-cd[data-od$=":'+k+'"]')).forEach(function(row){
    var bar=row.querySelector(".lu-bar i"),txt=row.querySelector(".lu-prog"),f=job.total?Math.max(0,Math.min(1,job.received/job.total)):0;
    if(bar)bar.style.width=(f*100).toFixed(1)+"%";
    if(txt)txt.textContent=job.phase==="verify"?"Checking its fingerprint…":(fmtBytes(job.received)+" of "+fmtBytes(job.total)+" · "+Math.round(f*100)+"%");});}
function paintOpts(tier){var tile=document.querySelector('#lineupGrid .lu-tile[data-tier="'+tier+'"]');if(!tile||tile.querySelector('.lu-coders[data-opts="'+tier+'"]'))return;
  var ks=houseList(tier);if(ks.length<2)return;
  var web=lineupDevice()==="web",use=null;try{use=web?null:lineupUsableGB();}catch(e){}
  var cur=lineupKeyFor(tier,web?"desktop":undefined),picked=state.tierPick&&state.tierPick[tier],hn=houseName(tier);
  /* folded under one line, so the page stays short: a press opens the list (it is open when the person has chosen one of its models) */
  var box=el("div","lu-coders"),det=document.createElement("details"),hd=document.createElement("summary"),rows=el("div","lu-opt-rows");box.setAttribute("data-opts",tier);
  det.className="lu-opts";if(picked)det.open=true;hd.className="lu-coders-h";
  hd.appendChild(el("b",null,"Models for "+hn+" on "+whose()));
  hd.appendChild(el("span",null,use!=null?"about "+use.toFixed(1)+" GB of memory to spare":"in the order Ingenium suggests"));
  det.appendChild(hd);det.appendChild(rows);box.appendChild(det);
  var big=null,nBig=ks.filter(function(k){return use!=null&&lineupNeedGB(M[k])>use&&k!==cur&&!lineupRec(k);}).length;
  ks.forEach(function(k){var sp=M[k],rec=web?null:lineupRec(k),job=lineupJobs[k],need=lineupNeedGB(sp),fits=use==null||need<=use;
    var row=el("div","lu-cd"+(k===cur?" on":""));row.setAttribute("data-od",tier+":"+k);
    var t=el("div","lu-cd-t");t.appendChild(el("div","lu-cd-name",sp.name));
    t.appendChild(el("div","lu-cd-meta",sp.maker+" · "+fmtBytes(sp.size)+(sp.thinks?" · reasons first":"")));
    t.appendChild(el("div","lu-cd-fit"+(fits?"":" no"),use==null?"Needs about "+need.toFixed(1)+" GB of memory.":fits?"Needs about "+need.toFixed(1)+" GB: fits here.":"Needs about "+need.toFixed(1)+" GB: more than "+whose()+" has to spare. It may not load."));
    row.appendChild(t);
    var a=el("div","lu-cd-acts");
    if(web){var pg=el("a","btn xs","Model page");pg.href=sp.page;pg.target="_blank";pg.rel="noopener noreferrer";a.appendChild(pg);}
    else if(k===cur&&rec)a.appendChild(el("span","lu-cd-now",hn+" now"));
    else if(job&&job.state==="running"){var p=el("div","lu-progress");var bar=el("div","lu-bar");bar.appendChild(el("i"));p.appendChild(bar);p.appendChild(el("div","lu-prog",""));a.appendChild(p);
      var cb=el("button","btn xs ghost","Cancel");cb.type="button";cb.onclick=function(){lineupCancel(k);};a.appendChild(cb);}
    else if(rec){var ub=el("button","btn xs primary","Use for "+hn);ub.type="button";ub.onclick=function(){choose(tier,k);};a.appendChild(ub);}
    else{var ib=el("button","btn xs"+(fits?" primary":""),"Install · "+fmtBytes(sp.size));ib.type="button";
      ib.onclick=function(){lineupInstall(k).then(function(){if(k!==lineupKeyFor(tier))choose(tier,k);},function(){});};a.appendChild(ib);
      if(k===cur)a.appendChild(el("span","lu-cd-now",hn+"'s choice"));}
    row.appendChild(a);
    if(k===cur)row.appendChild(el("div","lu-cd-why",sp.why));
    else{var mo=document.createElement("details");mo.className="lu-cd-more";var su=document.createElement("summary");su.textContent="About this model";mo.appendChild(su);mo.appendChild(el("div","lu-cd-why",sp.why));row.appendChild(mo);}
    if(job&&job.state==="error")row.appendChild(el("div","lu-cd-fit no","The install stopped: "+job.error));
    if(!fits&&k!==cur&&!rec&&!(job&&job.state==="running")&&nBig){if(!big){big=document.createElement("details");big.className="lu-big";
        var bs=document.createElement("summary");bs.textContent=nBig+" larger model"+(nBig===1?"":"s")+", for "+(kind()==="android"||kind()==="ios"?"devices":"computers")+" with more memory";big.appendChild(bs);}
      big.appendChild(row);}
    else rows.appendChild(row);});
  if(big)rows.appendChild(big);
  if(picked&&!web){var bk=el("button","lu-cd-back","Back to Ingenium's choice for "+whose());bk.type="button";bk.onclick=function(){back(tier);};rows.appendChild(bk);}
  tile.appendChild(box);
  ks.forEach(function(k){if(lineupJobs[k]&&lineupJobs[k].state==="running")optJob(k);});}
/* one plain line where a house cannot get stronger for lack of memory (the stronger model in its list does not fit this computer) */
function lendLines(){var d=lineupDevice();if(d!=="desktop"&&d!=="mac-arm")return;
  var use=null;try{use=lineupUsableGB();}catch(e){}if(use==null)return;
  ING_LINEUP.tiers.forEach(function(t){var tile=document.querySelector('#lineupGrid .lu-tile[data-tier="'+t.id+'"]');if(!tile||tile.querySelector(".lu-lend"))return;
    var st=lineupStronger(t.id),sp=st&&M[st];if(!sp)return;var need=lineupNeedGB(sp);if(need<=use)return;
    var line=el("div","lu-why lu-lend",t.name+" cannot get stronger on this computer: its memory is the limit. A computer with more memory can lend a stronger model over your home Wi-Fi: Settings, Your models on every device.");
    line.setAttribute("data-lend",t.id);
    var before=tile.querySelector(".lu-coders");if(before)tile.insertBefore(line,before);else tile.appendChild(line);});}
(function hook(){var o=renderLineup;
  renderLineup=function(){var r=o.apply(this,arguments);
    try{paintOpts("scriba");paintOpts("magister");lendLines();}catch(e){try{console.error("Ingenium: the lineup's options could not be listed",e);}catch(_){}}return r;};
  window.renderLineup=renderLineup;
  var oj=lineupPaintJob;lineupPaintJob=function(k){var r=oj.apply(this,arguments);try{optJob(k);}catch(e){}return r;};window.lineupPaintJob=lineupPaintJob;})();

/* ---------- 6. More models: the strong models, each with what it needs and what this device has to spare ---------- */
if(typeof ING_CATALOG!=="undefined"&&Array.isArray(ING_CATALOG)&&typeof CAT_Q!=="undefined"){
  [{id:"Q3_K_M",label:"Compact",bpw:3.9,line:"A compact copy: its numbers in about 3 bits. The smallest of the usual files, a little less exact."},
   {id:"Q4_0",label:"As released",bpw:4.5,line:"The 4-bit file its maker released it in."}].forEach(function(x){if(!CAT_Q.some(function(q){return q.id===x.id;}))CAT_Q.push(x);});
  var PREFER=["mmproj-F16.gguf","mmproj-BF16.gguf","mmproj-F32.gguf"];
  var CATNEW=[
    {key:"qwen3.8-27b",name:"Qwen3.8 27B",maker:"Qwen (Alibaba)",params:27,thinks:true,licence:"Apache 2.0",strong:true,eyes:true,
     repos:["ggml-org/Qwen3.8-27B-GGUF","unsloth/Qwen3.8-27B-GGUF","lmstudio-community/Qwen3.8-27B-GGUF"],known:{"Q4_K_M":18973870528,"Q5_K_M":19771509664,"Q8_0":28595763648},
     why:"Qwen's dense 27B of August 2026: it thinks first by default (the Thinking key turns that off), reads pictures, and has a memory of 262,144 tokens. All of its parameters work on each word, so it is slower than a mixture-of-experts model. 17.7 GB at Fast and 26.6 GB at Best, needing about 20.5 and 30.5 GB of memory: for a 32 GB computer (Fast) or a 48 GB one (Best)."},
    {key:"gemma-4-31b",name:"Gemma 4 31B",maker:"Google",params:31,thinks:true,licence:"Apache 2.0",strong:true,
     repos:["google/gemma-4-31B-it-qat-q4_0-gguf"],quants:["Q4_0"],known:{"Q4_0":17651001568},
     why:"Google's dense 31B Gemma 4 in Google's own 4-bit form: 80.0% on LiveCodeBench v6 in its maker's tests, and a memory of 256K tokens. About 16.4 GB, needing about 19.1 GB of memory: for a 32 GB computer or more."},
    {key:"granite-4.2-8b",name:"Granite 4.2 8B",maker:"IBM",params:8,thinks:true,licence:"Apache 2.0",strong:true,
     repos:["ibm-granite/granite-4.2-8b-GGUF"],quants:["Q3_K_M","Q4_K_M","Q5_K_M","Q8_0"],known:{"Q3_K_M":4347052160,"Q4_K_M":5347917952,"Q5_K_M":6253887616,"Q8_0":9345613952},
     why:"IBM's 8B Granite 4.2 (August 2026): it thinks first by default, has a memory of 131,072 tokens, and is under Apache 2.0. Compact is the 3-bit copy, 4.0 GB, for a computer with 8 GB of memory; Fast is 5.0 GB."},
    {key:"granite-4.2-30b",name:"Granite 4.2 30B",maker:"IBM",params:30,thinks:true,licence:"Apache 2.0",strong:true,
     repos:["ibm-granite/granite-4.2-30b-GGUF"],known:{"Q4_K_M":17721455328,"Q5_K_M":20775957216,"Q8_0":31111705312},
     why:"IBM's largest Granite 4.2 (August 2026), a dense 30B (29.3B parameters): it thinks first by default and has a memory of 131,072 tokens. All of its parameters work on each word, so it is slow. About 16.5 GB at Fast, needing about 19.2 GB of memory: for a 32 GB computer or more."},
    {key:"nemotron-3.5-lightning-30b-a3b",name:"Nemotron 3.5 Lightning 30B-A3B",maker:"NVIDIA",params:31,thinks:false,licence:"Other: NVIDIA's own licence, read it on its page",strong:true,
     repos:["ggml-org/NVIDIA-Nemotron-3.5-Lightning-30B-A3B-GGUF","unsloth/NVIDIA-Nemotron-3.5-Lightning-30B-A3B-GGUF"],known:{"Q4_K_M":25266255936,"Q5_K_M":30215272512,"Q8_0":33585495616},
     why:"NVIDIA's mixture-of-experts of August 2026: about 31B parameters, named for the 3B that work on each word, with a memory of 1,048,576 tokens. About 23.5 GB at Fast, needing about 27.1 GB of memory: for a 48 GB computer or more."},
    {key:"muse-glimmer-30b",name:"Muse Glimmer 30B",maker:"Meta (meta-models)",params:30,thinks:false,licence:"Apache 2.0",strong:true,
     repos:["meta-models/Muse-Glimmer-30B-GGUF"],quants:["Q4_K_M"],known:{"Q4_K_M":16756683904},
     why:"Muse Glimmer 30B of August 2026, 27.9B parameters with a memory of 131,072 tokens; its repository gives the Apache 2.0 licence. About 15.6 GB, needing about 18.2 GB of memory: for a 32 GB computer."}];
  var have={};ING_CATALOG.forEach(function(e){have[e.key]=1;});
  CATNEW.forEach(function(e){if(have[e.key])return;if(e.eyes)e.vision={repos:e.repos.slice(),prefer:PREFER.slice()};ING_CATALOG.push(e);});
  /* the entry that was there: Qwen3.6 35B-A3B needs about 23.8 GB by the app's rule, so a 48 GB computer, not a 32 GB one */
  ING_CATALOG.forEach(function(e){if(e.key==="qwen3.6-35b-a3b"){e.strong=true;e.known={"Q4_K_M":22134528992,"Q5_K_M":26456194016,"Q8_0":36903140320};
    e.why="Qwen's newest mixture-of-experts: about 3B of its 35B parameters work on each word, and it reads pictures. About 20.6 GB at Fast, needing about 23.8 GB of memory: for a 48 GB computer or more.";}});
  /* a speed-up or projector file is never the model: the catalogue takes the model's own file; Google's 4-bit file is named _q4_0-it.gguf */
  var cp=catPick;
  catPick=function(list,qn){var l=(list||[]).filter(function(f){return !/(^|\/)(mtp|dflash)-/i.test(String(f.path||""));});
    var f=cp.call(this,l,qn);
    if(!f&&qn==="Q4_0")f=l.filter(function(x){var p=String(x.path||"");return x.type==="file"&&/_q4_0-it\.gguf$/i.test(p)&&!/mmproj/i.test(p);})[0]||null;
    return f;};
  window.catPick=catPick;try{if(window.IngCatalog)window.IngCatalog.pick=catPick;}catch(_){}
  function paintNeeds(){var host=document.getElementById("catBox");if(!host)return;var by={};ING_CATALOG.forEach(function(e){by[e.name]=e;});
    var use=null;try{use=lineupUsableGB();}catch(_){}
    [].slice.call(host.querySelectorAll(".cat-row")).forEach(function(row){if(row.querySelector(".cat-need"))return;
      var b=row.querySelector(".cat-t b"),e=b&&by[b.textContent];if(!e||!(e.strong||e.params>=20))return;
      var qs=catQuants(e),qn=CAT_UI.q[e.key]||qs[0];if(qs.indexOf(qn)<0)qn=qs[0];
      var spec=catState()[catKey(e,qn)],bytes=spec?spec.size:catEstimate(e,qn),need=lineupNeedGB({size:bytes}),c=row.querySelector(".cat-c");if(!c)return;
      var fits=use==null||need<=use;
      c.appendChild(el("div","cat-need"+(fits?"":" no"),"Needs about "+need.toFixed(1)+" GB of memory"+(use!=null?"; this device has about "+use.toFixed(1)+" GB to spare.":".")));});}
  var rc=renderCatalog;renderCatalog=function(){var r=rc.apply(this,arguments);try{paintNeeds();}catch(e){}return r;};
  window.renderCatalog=renderCatalog;try{if(window.IngCatalog)window.IngCatalog.render=renderCatalog;}catch(_){}
}
window.IngR203={derived:DERIVED.map(function(x){return x.key;}),families:["minicpm5","granite-4.2","qwen3.6","qwen3.8"],options:paintOpts,lend:lendLines};
})();
;try{window.__ingParts["p203"]="running";}catch(_){}
</script>
