<style id="r385-css">
/* ============ R385 · INKLING 2, THE ORACLE HOUSE, AND FIND MODELS (Ingenium 7.86, 25 November 2026) ============
   Her words (24 November 2026): "I want the new Inkling model added to our models catalogue and any other newer and better models out
   there"; on the Oracle tier: "I want to see choices for it too even if my device can't run it yet, it should still be offered as options
   for future stronger devices that are powerful enough to run them". The live preview was approved on 25 November 2026 ("I approve of the
   previews, please commit and push it everywhere").
   Every fact below was read at its source on 25 November 2026 (Hugging Face's API and model cards; llama.cpp's own code):
   - Inkling 2 Mini (Thinking Machines; ggml-org/Inkling-2-Mini-GGUF, commit e8a2cecf0e): its kind is "inkling2_loop", first read by
     llama.cpp b12600. Inkling 2 Small (unsloth/Inkling-2-Small-GGUF, commit 42593c6392): kind "inkling2", first read by b12599. The
     first Inkling's kind, "inkling", is read by no llama.cpp build, b12723 included: it is left out, and the Oracle house says so.
   - The computer apps' newer engine is llama.cpp b12723 (7.86's Mac builds); it stays in a copy only when its self-test answers, and the
     app then lists the kinds only it reads (deskApi().engine_choice().newer.only, from the engine's own llama-arch.cpp). An Inkling 2
     model is offered to install only where that list has its kind and her engine choice is not "the proven engine only". Windows and the
     phones carry b11321 alone, so there it waits under Oracle, saying why.
   - Its makers: "Support for looped models in local runtimes is new", and it "sometimes became stuck in long reasoning loops ... We
     recommend setting limits on output tokens". So Inkling 2 never writes more than 8,192 tokens in one reply, whatever is asked. */
#lineupGrid .lu-tile.lu-oracle{position:relative}
#lineupGrid .lu-oracle .lu-name::after{content:"New";margin-left:8px;font:700 10px/1 var(--sans,system-ui,sans-serif);letter-spacing:.1em;text-transform:uppercase;color:var(--gold,#b88a3a);vertical-align:middle}
#lineupGrid .lu-oracle .lu-left{margin-top:8px;font-size:12px;line-height:1.5;color:var(--ink-3)}
#lineupGrid .lu-cd .ink-new{font:700 10px/1 var(--sans,system-ui,sans-serif);letter-spacing:.1em;text-transform:uppercase;color:var(--gold,#b88a3a);margin-left:6px}
#lineupGrid .lu-cd-wait{display:inline-flex;align-items:center;gap:6px;font:600 12px/1 var(--sans,system-ui,sans-serif);border-radius:999px;padding:6px 10px;white-space:nowrap;background:rgba(232,144,42,.15);color:#8a5a12}
#lineupGrid .lu-cd-wait::before{content:"";width:7px;height:7px;border-radius:50%;background:currentColor}
body[data-theme="night"] #lineupGrid .lu-cd-wait{background:rgba(230,180,90,.15);color:#e6b45a}
/* Find models: a card of its own, every part raised and answering the pointer */
#fmCard .fm-grid{display:grid;grid-template-columns:minmax(0,1.15fr) minmax(0,.85fr);gap:16px;align-items:start}
@media (max-width:900px){#fmCard .fm-grid{grid-template-columns:minmax(0,1fr)}}
#fmCard .fm-bar{display:flex;flex-wrap:wrap;gap:10px;align-items:center;margin:10px 0}
#fmCard .fm-q{flex:1 1 220px;min-width:0;font:500 14px var(--sans,system-ui,sans-serif);color:var(--ink-1);background:var(--well,rgba(106,63,181,.06));border:1px solid var(--hairline,rgba(106,63,181,.18));border-radius:12px;padding:10px 12px;box-shadow:inset 0 1px 3px rgba(60,34,110,.14)}
#fmCard .fm-q:focus{outline:2px solid var(--accent);outline-offset:1px}
#fmCard .fm-status{font-size:12.8px;line-height:1.5;color:var(--ink-2);min-height:1.2em}
#fmCard .fm-list{display:grid;gap:8px;margin:8px 0 0;padding:0;list-style:none}
#fmCard .fm-row,#fmCard .fm-src{display:grid;gap:4px;background:var(--card-hi,rgba(255,255,255,.6));border:1px solid var(--hairline,rgba(106,63,181,.16));border-radius:12px;padding:10px 12px;
  box-shadow:0 2px 0 rgba(96,62,150,.14),0 6px 14px rgba(60,34,110,.08);transition:transform .2s cubic-bezier(.2,.9,.3,1.3),box-shadow .2s}
#fmCard .fm-row{grid-template-columns:minmax(0,1fr) auto;align-items:center}
#fmCard .fm-row:hover,#fmCard .fm-src:hover{transform:translateY(-2px);box-shadow:0 4px 0 rgba(96,62,150,.14),0 10px 18px rgba(60,34,110,.14)}
#fmCard .fm-src{text-decoration:none;color:var(--ink-1);margin-bottom:8px}
#fmCard .fm-src span,#fmCard .fm-why{font-size:12.5px;line-height:1.5;color:var(--ink-2)}
#fmCard .fm-row b{font-weight:700;word-break:break-word}
#fmCard .fm-chips{display:flex;flex-wrap:wrap;gap:6px;margin-top:4px}
#fmCard .fm-chip{display:inline-flex;align-items:center;gap:6px;font:600 12px/1 var(--sans,system-ui,sans-serif);border-radius:999px;padding:6px 10px;background:rgba(106,63,181,.10);color:var(--accent)}
#fmCard .fm-chip::before{content:"";width:7px;height:7px;border-radius:50%;background:currentColor}
#fmCard .fm-chip.ok{background:rgba(46,138,87,.13);color:#2e7a50}#fmCard .fm-chip.warn{background:rgba(232,144,42,.15);color:#8a5a12}#fmCard .fm-chip.bad{background:rgba(196,60,72,.12);color:#a8323e}
body[data-theme="night"] #fmCard .fm-chip.ok{color:#6fd39a}body[data-theme="night"] #fmCard .fm-chip.warn{color:#e6b45a}body[data-theme="night"] #fmCard .fm-chip.bad{color:#f08a95}
#fmCard .fm-steps{margin:6px 0 0;padding-left:20px;display:grid;gap:6px;font-size:13px;line-height:1.5;color:var(--ink-2)}#fmCard .fm-steps b{color:var(--ink-1)}
#fmCard h3{margin:0 0 8px}#fmCard .fm-acts{display:flex;flex-direction:column;gap:6px;align-items:flex-end}
/* 7.86, her words (25 November 2026), of the sites' cards: "there is no prompting that says it ... Please add a little card or button on
   each card for HuggingFace, Ollama and LM Studio and a card for any other provider as well ... that says where to click and that it will
   take you straight to the websites and even prompt you to login to their account". Each site is a card with two keys of its own: Open the
   site, and Sign in (each sign-in page read on 25 November 2026: huggingface.co/login, ollama.com/signin, lmstudio.ai/login); a site whose
   sign-in page was not confirmed says to sign in from its own page. Another site: any link she gives, and sites she keeps. */
#fmCard .fm-src{cursor:default}
#fmCard .fm-src-h{display:flex;align-items:center;gap:8px;flex-wrap:wrap}
#fmCard .fm-src-h b{font-weight:700}
#fmCard .fm-go{display:flex;flex-wrap:wrap;gap:8px;margin-top:6px}
#fmCard .fm-k{display:inline-flex;align-items:center;gap:6px;text-decoration:none;font:600 12.5px/1 var(--sans,system-ui,sans-serif);padding:8px 12px;border-radius:10px;border:1px solid var(--hairline,rgba(106,63,181,.2));
  background:linear-gradient(180deg,#ffffff,#f1ebfa);color:var(--ink-1);box-shadow:inset 0 1px 0 rgba(255,255,255,.85),0 3px 0 rgba(96,62,150,.26),0 7px 14px rgba(60,34,110,.16);
  transform:translateY(0);transition:transform .2s cubic-bezier(.2,.9,.3,1.3),box-shadow .2s;white-space:nowrap;cursor:pointer}
#fmCard .fm-k:hover{transform:translateY(-3px);box-shadow:inset 0 1px 0 rgba(255,255,255,.85),0 6px 0 rgba(96,62,150,.26),0 13px 22px rgba(60,34,110,.16)}
#fmCard .fm-k:active{transform:translateY(2px);box-shadow:inset 0 1px 0 rgba(255,255,255,.85),0 1px 0 rgba(96,62,150,.26),0 3px 6px rgba(60,34,110,.16);transition-duration:.06s}
#fmCard .fm-k.pri{background:linear-gradient(180deg,#7d52ca,#5a35a0);color:#fff;border-color:#3f2477;box-shadow:inset 0 1px 0 rgba(255,255,255,.25),0 3px 0 #3f2477,0 8px 16px rgba(52,24,100,.28)}
#fmCard .fm-k.pri:hover{box-shadow:inset 0 1px 0 rgba(255,255,255,.25),0 6px 0 #3f2477,0 14px 24px rgba(52,24,100,.3)}
#fmCard .fm-k:focus-visible{outline:2.5px solid var(--accent);outline-offset:3px}
#fmCard .fm-k i{font-style:normal;font-size:11px;opacity:.8}
body[data-theme="night"] #fmCard .fm-k:not(.pri){background:linear-gradient(180deg,#3b2f54,#2c2342);color:#efe9f6;border-color:rgba(183,156,230,.2);box-shadow:inset 0 1px 0 rgba(255,255,255,.1),0 3px 0 rgba(0,0,0,.55),0 7px 14px rgba(0,0,0,.45)}
#fmCard .fm-hint{font-size:12px;line-height:1.45;color:var(--ink-3)}
#fmCard .fm-other{display:grid;gap:8px}
#fmCard .fm-other .fm-q{flex:1 1 200px}
#fmCard .fm-x{border:0;background:none;color:var(--ink-3);font:600 12px var(--sans,system-ui,sans-serif);cursor:pointer;padding:4px 6px;border-radius:8px}
#fmCard .fm-x:hover{color:var(--ink-1)}
/* 7.86, her words (25 November 2026), of the small light purple cards with a dot: "I want to give the little light purple flat card ...
   the signature lift 3D design and animation that the sticky notes and the Live Preview panel has, I don't want it to just be motionless
   and flat ... It should be set as a rule for my preference for that style". Every such chip here stands raised on an edge, lifts under the
   pointer and sinks when pressed. */
#fmCard .fm-chip,#lineupGrid .lu-cd-wait,.vd-chip,.ep-chip{box-shadow:inset 0 1px 0 rgba(255,255,255,.7),0 2px 0 rgba(96,62,150,.22),0 5px 10px rgba(60,34,110,.12);
  transform:translateY(0);transition:transform .2s cubic-bezier(.2,.9,.3,1.3),box-shadow .2s}
#fmCard .fm-chip:hover,#lineupGrid .lu-cd-wait:hover,.vd-chip:hover,.ep-chip:hover{transform:translateY(-2px);box-shadow:inset 0 1px 0 rgba(255,255,255,.7),0 4px 0 rgba(96,62,150,.22),0 10px 18px rgba(60,34,110,.16)}
#fmCard .fm-chip:active,#lineupGrid .lu-cd-wait:active,.vd-chip:active,.ep-chip:active{transform:translateY(1px);box-shadow:inset 0 1px 0 rgba(255,255,255,.7),0 1px 0 rgba(96,62,150,.22),0 2px 4px rgba(60,34,110,.12);transition-duration:.06s}
body[data-theme="night"] #fmCard .fm-chip,body[data-theme="night"] #lineupGrid .lu-cd-wait,body[data-theme="night"] .vd-chip,body[data-theme="night"] .ep-chip{box-shadow:inset 0 1px 0 rgba(255,255,255,.08),0 2px 0 rgba(0,0,0,.5),0 5px 10px rgba(0,0,0,.35)}
body[data-motion="minimal"] #fmCard .fm-chip,body[data-motion="minimal"] #lineupGrid .lu-cd-wait,body[data-motion="minimal"] .vd-chip,body[data-motion="minimal"] .ep-chip,body[data-motion="minimal"] #fmCard .fm-k{transition:none}
body[data-motion="minimal"] #fmCard .fm-chip:hover,body[data-motion="minimal"] #lineupGrid .lu-cd-wait:hover,body[data-motion="minimal"] .vd-chip:hover,body[data-motion="minimal"] .ep-chip:hover,body[data-motion="minimal"] #fmCard .fm-k:hover{transform:none}
@media (prefers-reduced-motion:reduce){#fmCard .fm-chip,#lineupGrid .lu-cd-wait,.vd-chip,.ep-chip,#fmCard .fm-k{transition:none}#fmCard .fm-chip:hover,#lineupGrid .lu-cd-wait:hover,.vd-chip:hover,.ep-chip:hover,#fmCard .fm-k:hover{transform:none}}
body[data-motion="minimal"] #fmCard .fm-row,body[data-motion="minimal"] #fmCard .fm-src{transition:none}
body[data-motion="minimal"] #fmCard .fm-row:hover,body[data-motion="minimal"] #fmCard .fm-src:hover{transform:none}
@media (prefers-reduced-motion:reduce){#fmCard .fm-row,#fmCard .fm-src{transition:none}#fmCard .fm-row:hover,#fmCard .fm-src:hover{transform:none}}
</style>
<script>try{(window.__ingParts=window.__ingParts||{})["p385"]="started";}catch(_){}
(function r385(){
"use strict";
if(window.__r385)return;window.__r385=1;
var W=window,D=document,HF="https://huggingface.co/",APACHE="https://www.apache.org/licenses/LICENSE-2.0";
if(typeof ING_LINEUP==="undefined"||!ING_LINEUP.models)return;
var M=ING_LINEUP.models,DV=ING_LINEUP.devices;
function mk(t,c,x){var e=D.createElement(t);if(c)e.className=c;if(x!=null)e.textContent=x;return e;}
function gb(b){return b>=1e12?(b/1e12).toFixed(2)+" TB":(b/1e9).toFixed(1)+" GB";}
function dev(){var d="web";try{d=lineupDevice();}catch(e){}return d;}

/* ---------- 1. the two Inkling 2 models, as Hugging Face lists their files (sizes and SHA-256 from its lfs records) ---------- */
var MINI_REPO="ggml-org/Inkling-2-Mini-GGUF",MINI_AT="e8a2cecf0e78914f07cc27b9be711a9b2c7561d9",SMALL_REPO="unsloth/Inkling-2-Small-GGUF",SMALL_AT="42593c63926d23380ea03d643ab2cde742427608";
var SMALL_PARTS=[["00001",11953184,"5f3ae4ac82efed35d34c644a09a8a3f5eb942cc686ccf1b08d0ce677a47cfe03"],["00002",49921555968,"19b197c8c81a31d02c5409ce392ddd3bf1584d910942e2dc399ba033c503dc9a"],
  ["00003",49719599968,"0357bfe92126a63be70cdabc9f852bbdbdc181ae2ebc040ca3b5876e1bd3a853"],["00004",48147903744,"1a82555a6a2f2e6c996ade4bccff267bbafe2524428cbc62752144a6352dd889"],
  ["00005",23927736640,"33e69c30c265e327cefc6ec64b04cbafcb70d8630474ba28ef6bbe3d04e433d5"]].map(function(p){var f="Inkling-2-Small-UD-IQ1_S-"+p[0]+"-of-00005.gguf";
    return {file:f,size:p[1],sha256:p[2],url:HF+SMALL_REPO+"/resolve/"+SMALL_AT+"/UD-IQ1_S/"+f};});
var INK={
 "inkling-2-mini":{name:"Inkling 2 Mini",maker:"Thinking Machines",params:26.2,active:3.4,thinks:true,file:"Inkling-2-Mini-IQ4_NL.gguf",size:17627940768,
  sha256:"cbdf3fa9dc50a4124977980f37da4f1fa764b0cfe800d275cd43d26ce2a81af4",url:HF+MINI_REPO+"/resolve/"+MINI_AT+"/Inkling-2-Mini-IQ4_NL.gguf",
  page:HF+"thinkingmachines/Inkling-2-Mini",licence:"Apache 2.0",licenceUrl:APACHE,kind:"inkling2_loop",minEngine:"llama.cpp b12600",inkling:true,
  vision:{repos:[MINI_REPO],prefer:["mmproj-Inkling-2-Mini-Q8_0.gguf"]},
  why:"Thinking Machines' Inkling 2 Mini (20 November 2026), under Apache 2.0: 26.2B parameters, 3.4B at work on each word, and a looped design: the middle 12 of its 24 layers run three times. It reasons before it answers and reads pictures (its 0.35 GB eyes come with it). 17.6 GB at 4 bits (IQ4_NL, from ggml-org), needing about 19.1 GB of memory: for a computer with 32 GB or more. Its makers say support for looped models in local engines is new and that it can get stuck in long reasoning, so Ingenium stops each of its replies at 8,192 tokens. It needs the newer engine (llama.cpp b12600 or later)."},
 "inkling-2-small":{name:"Inkling 2 Small",maker:"Thinking Machines",thinks:true,file:SMALL_PARTS[0].file,size:SMALL_PARTS.reduce(function(a,p){return a+p.size;},0),
  sha256:SMALL_PARTS[0].sha256,url:SMALL_PARTS[0].url,parts:SMALL_PARTS,page:HF+"thinkingmachines/Inkling-2-Small",licence:"Apache 2.0",licenceUrl:APACHE,
  kind:"inkling2",minEngine:"llama.cpp b12599",inkling:true,large:true,
  why:"Thinking Machines' Inkling 2 Small (4 November 2026), under Apache 2.0, its full weights 393.5 GB. Its smallest copy (unsloth's UD-IQ1_S, five parts) is 171.7 GB, needing about 180 GB of memory, so it is for a far larger computer than most. Like Inkling 2 Mini, each reply stops at 8,192 tokens. It needs the newer engine (llama.cpp b12599 or later)."}};
Object.keys(INK).forEach(function(k){if(!M[k])M[k]=INK[k];});
function isInk(m){if(!m)return false;var k="";try{k=lineupKeyOfRec(m)||"";}catch(e){}if(INK[k])return true;return /inkling[-_ ]?2/i.test(String(m.fileName||"")+" "+String(m.customName||""));}

/* ---------- 2. the gate: what this device's engine reads, as the computer app reports it ---------- */
var GATE={asked:false,at:0,choice:"",newer:false,version:"",only:[]};
function reads(kind){return !!(GATE.newer&&GATE.choice!=="proven"&&GATE.only.indexOf(kind)>=0);}
function ask(){var a=null;try{a=typeof deskApi==="function"?deskApi():null;}catch(e){}
  if(!a||typeof a.engine_choice!=="function"){GATE.asked=true;return Promise.resolve(false);}
  return Promise.resolve(a.engine_choice()).then(function(r){var was=JSON.stringify([GATE.newer,GATE.choice,GATE.only]);
      GATE.asked=true;GATE.at=Date.now();GATE.choice=String(r&&r.choice||"auto");GATE.newer=!!(r&&r.newer&&r.newer.available);
      GATE.version=String(r&&r.newer&&r.newer.version||"");GATE.only=(r&&r.newer&&Array.isArray(r.newer.only))?r.newer.only.map(String):[];
      return was!==JSON.stringify([GATE.newer,GATE.choice,GATE.only]);},function(){GATE.asked=true;return false;});}

/* ---------- 3. Inkling 2 Mini in Magister and Faber on a computer, after the larger models, only where it can load ---------- */
var PLACED=["magister","faber"];
function place(){var on=reads(INK["inkling-2-mini"].kind);
  ["desktop","mac-arm"].forEach(function(dv){var t=DV[dv]&&DV[dv].tiers;if(!t)return;
    PLACED.forEach(function(h){var v=[].concat(t[h]||[]).filter(function(k){return k!=="inkling-2-mini";});
      if(on){var i=0;while(i<v.length&&M[v[i]]&&M[v[i]].large)i++;v.splice(i,0,"inkling-2-mini");}
      t[h]=v;});});
  return on;}

/* ---------- 4. the Oracle house: the strongest open models there are, on every device, smallest first ---------- */
var ORACLE=["qwen3.8-flash-next","glm-5.3-flash-compact","deepseek-v4-flash","inkling-2-small","glm-5.3-flash","qwen3.5-397b-a17b","minimax-m3.1-flash","glm-5.3",
  "qwen3.8-2.4t-a95b","deepseek-v4-pro","kimi-k3","kimi-k3-best"];
function oracleKeys(){var ks=ORACLE.filter(function(k){return !!M[k];});
  /* Inkling 2 Mini waits here where it is not in the houses: this engine cannot read it, or this device is too small */
  var u=null;try{u=lineupUsableGB();}catch(e){}
  var miniIn=reads(INK["inkling-2-mini"].kind)&&(dev()==="desktop"||dev()==="mac-arm")&&(u==null||lineupNeedGB(M["inkling-2-mini"])<=u);
  if(!miniIn)ks.push("inkling-2-mini");
  return ks.sort(function(a,b){return M[a].size-M[b].size;});}
function devWord(){var d=dev();return d==="android"?"this tablet":d==="ios"?"this iPhone or iPad":d==="web"?"a computer":"this computer";}
function engineWhy(sp){var d=dev();
  if(d==="android"||d==="ios")return "Its kind ("+sp.kind+") needs "+sp.minEngine+" or later; this app's engine is older. It is for a computer.";
  if(d==="web")return "Its kind ("+sp.kind+") needs "+sp.minEngine+" or later: the Ingenium app for Mac carries that engine.";
  if(GATE.newer&&GATE.choice==="proven")return "Its kind ("+sp.kind+") is read only by the newer engine, and the Engine room is set to the proven engine only.";
  return "Its kind ("+sp.kind+") needs "+sp.minEngine+" or later; this computer's copy does not carry it yet.";}
function row(k,use,web,cur){var sp=M[k],rec=web?null:lineupRec(k),job=lineupJobs[k],need=lineupNeedGB(sp),fits=use==null||need<=use,eng=!sp.inkling||reads(sp.kind);
  var r=mk("div","lu-cd"+(k===cur?" on":""));r.setAttribute("data-cd",k);var t=mk("div","lu-cd-t"),n=mk("div","lu-cd-name",sp.name);
  if(sp.inkling)n.appendChild(mk("span","ink-new","new"));t.appendChild(n);
  t.appendChild(mk("div","lu-cd-meta",sp.maker+(sp.params?" · "+(sp.params>=1000?(sp.params/1000).toFixed(1)+"T":sp.params+"B")+" parameters"+(sp.active?", "+sp.active+"B at work":""):"")+" · smallest copy "+gb(sp.size)));
  t.appendChild(mk("div","lu-cd-fit"+(fits&&eng?"":" no"),!eng?engineWhy(sp):use==null?"Needs about "+need.toFixed(1)+" GB of memory.":fits?"Needs about "+need.toFixed(1)+" GB: fits here.":"Needs about "+need.toFixed(1)+" GB: more than "+devWord()+" has to spare."));
  r.appendChild(t);var a=mk("div","lu-cd-acts");
  if(web){var pg=mk("a","btn xs","Model page");pg.href=sp.page;pg.target="_blank";pg.rel="noopener noreferrer";a.appendChild(pg);}
  else if(rec)a.appendChild(mk("span","lu-cd-now","Installed · in the chat's model key"));
  else if(job&&job.state==="running"){var p=mk("div","lu-progress"),bar=mk("div","lu-bar");bar.appendChild(mk("i"));p.appendChild(bar);p.appendChild(mk("div","lu-prog",""));a.appendChild(p);
    var cb=mk("button","btn xs ghost","Cancel");cb.type="button";cb.onclick=function(){lineupCancel(k);};a.appendChild(cb);}
  else if(fits&&eng&&(dev()==="desktop"||dev()==="mac-arm")){var ib=mk("button","btn xs primary","Install · "+gb(sp.size));ib.type="button";ib.onclick=function(){lineupInstall(k).then(null,function(){});};a.appendChild(ib);}
  else a.appendChild(mk("span","lu-cd-wait",!eng?"Needs the newer engine":"Needs a stronger computer"));
  r.appendChild(a);
  var mo=D.createElement("details");mo.className="lu-cd-more";var su=D.createElement("summary");su.textContent="About this model";mo.appendChild(su);mo.appendChild(mk("div","lu-cd-why",sp.why));r.appendChild(mo);
  if(job&&job.state==="error")r.appendChild(mk("div","lu-cd-fit no","The install stopped: "+job.error));
  return r;}
function oracleTile(){var g=D.getElementById("lineupGrid");if(!g)return;var old=g.querySelector('.lu-tile[data-tier="oracle"]');if(old)old.parentNode.removeChild(old);
  var web=dev()==="web",use=null;try{use=web?null:lineupUsableGB();}catch(e){}
  var ks=oracleKeys(),fit=ks.filter(function(k){return (use==null||lineupNeedGB(M[k])<=use)&&(!M[k].inkling||reads(M[k].kind));}),cur=fit.length?fit[fit.length-1]:null;
  var tile=mk("div","lu-tile lu-oracle");tile.setAttribute("data-tier","oracle");if(cur)tile.setAttribute("data-key",cur);
  var hd=mk("div","lu-head");hd.appendChild(mk("span","lu-name","Oracle"));hd.appendChild(mk("span","lu-role","The strongest there are"));
  hd.appendChild(mk("span","lu-state",use==null?ks.length+" models":fit.length+" of "+ks.length+" fit"));tile.appendChild(hd);
  tile.appendChild(mk("div","lu-line","The strongest open models there are, shown on every device with the memory each needs, so a stronger computer can use them later."));
  var md=mk("div","lu-model");
  if(cur){var al=mk("a",null,M[cur].name);al.href=M[cur].page;al.target="_blank";al.rel="noopener noreferrer";md.appendChild(al);md.appendChild(D.createTextNode(" · the largest that fits "+devWord()));}
  else md.textContent=use==null?"Smallest first, from "+gb(M[ks[0]].size)+" to "+gb(M[ks[ks.length-1]].size):"None fits "+devWord()+" yet: each waits for a stronger computer";
  tile.appendChild(md);
  tile.appendChild(mk("div","lu-why","Each is installed as Ingenium's own are: from Hugging Face, every part checked against its fingerprint. A model that fits can be installed from its row; once installed, it is in the chat's model key."));
  var box=mk("div","lu-coders"),h=mk("div","lu-coders-h");h.appendChild(mk("b",null,"Oracle's models"));h.appendChild(mk("span",null,use!=null?"about "+use.toFixed(1)+" GB of memory to spare":"smallest first"));box.appendChild(h);
  ks.forEach(function(k){box.appendChild(row(k,use,web,cur));});tile.appendChild(box);tile.classList.add("lu-has-coders");
  tile.appendChild(mk("div","lu-left","Left out: the first Inkling (July 2026). Its files declare a kind, \"inkling\", that no llama.cpp build reads, not even the newest (b12723), so it could not load."));
  g.appendChild(tile);}

/* ---------- 5. a firm limit on how long Inkling 2 writes (its makers' advice) ---------- */
var CAP=8192;
function capped(job,m){if(!isInk(m))return job;var p=Object.assign({},job&&job.params||{});p.max_tokens=Math.min(+p.max_tokens||512,CAP);return Object.assign({},job,{params:p});}
if(typeof DeskAdapter!=="undefined"&&DeskAdapter&&typeof DeskAdapter._generate2==="function"&&!DeskAdapter._generate2.__r385){
  var g2=DeskAdapter._generate2;DeskAdapter._generate2=function(job){return g2.call(this,capped(job,this._m));};DeskAdapter._generate2.__r385=1;}

/* ---------- 6. Find models: search where new models appear; four checks before anything is downloaded ---------- */
var FM={busy:false,q:"",rows:[],say:""};
function fmSay(t){FM.say=t;var s=D.getElementById("fmStatus");if(s)s.textContent=t;}
function net(url){return Promise.resolve(netFetch(url,{headers:{"Accept":"application/json"},timeout:40})).then(function(r){if(!r.ok)throw new Error("Hugging Face answered "+r.status);return r.text();}).then(function(t){return JSON.parse(t);});}
var SKIP=/mmproj|imatrix|draft|embed|rerank|lora/i;
function kindsProven(){try{return W.IngFound&&IngFound.kinds?IngFound.kinds():[];}catch(e){return [];}}
function canRun(arch){if(!arch)return "";arch=String(arch).toLowerCase();if(kindsProven().indexOf(arch)>=0)return "proven";if(reads(arch))return "newer";
  return arch==="inkling2_loop"||arch==="inkling2"?"later":"";}
function licOf(info){var c=info.cardData||{},l=c.license||"";if(!l)(info.tags||[]).forEach(function(t){if(/^license:/.test(t))l=t.slice(8);});return l?String(l):"";}
function search(){if(FM.busy)return;var q=(D.getElementById("fmQ")||{}).value||"";q=String(q).trim();if(!q){fmSay("Type a model's name, for example Inkling 2 Mini.");return;}
  FM.busy=true;FM.q=q;FM.rows=[];paintFm();var use=null;try{use=dev()==="web"?null:lineupUsableGB();}catch(e){}
  fmSay("Asking Hugging Face for GGUF files that match “"+q+"”…");
  ask().then(function(){return net(HF+"api/models?search="+encodeURIComponent(q)+"&sort=downloads&direction=-1&limit=40");})
  .then(function(L){var c=(Array.isArray(L)?L:[]).filter(function(x){var id=String(x.id||x.modelId||"");return id&&!SKIP.test(id)&&(/gguf/i.test(id)||(x.tags||[]).indexOf("gguf")>=0);}).slice(0,8);
      if(!c.length){FM.busy=false;fmSay("Hugging Face has no GGUF files matching “"+q+"”. GGUF is the kind of file Ingenium's engine runs; try the model's maker or a shorter name.");paintFm();return;}
      fmSay("Reading "+c.length+" repositories: each one's kind, size, licence and fingerprints…");
      return Promise.all(c.map(function(x){var id=String(x.id||x.modelId);return Promise.all([net(HF+"api/models/"+id),net(HF+"api/models/"+id+"/tree/main")]).then(function(r){return {id:id,info:r[0]||{},tree:Array.isArray(r[1])?r[1]:[]};},function(e){return {id:id,err:String(e&&e.message||e)};});}))
      .then(function(all){FM.rows=all.map(function(c){var row={id:c.id,name:c.id.split("/")[1].replace(/[-_]GGUF$/i,""),pub:c.id.split("/")[0],at:Date.now()};
          if(c.err){row.skip="could not be read: "+c.err;return row;}
          var g=c.info.gguf||{};row.arch=String(g.architecture||"");row.params=+g.total?Math.round(+g.total/1e8)/10:null;row.licence=licOf(c.info);row.engine=canRun(row.arch);
          var p=null;try{p=W.IngFound&&IngFound.pickFile?IngFound.pickFile(c.tree,use):null;}catch(e){p=null;}
          if(p){row.quant=p.quant;row.size=p.size;row.need=p.need;row.tooBig=!!p.tooBig;row.files=p.files.map(function(x){return {file:x.path.split("/").pop(),path:x.path,size:+x.lfs.size||+x.size,sha256:x.lfs.oid};});}
          try{row.house=W.IngFound&&IngFound.house?IngFound.house(row.name,row.params):"magister";}catch(e){row.house="magister";}
          return row;});FM.busy=false;var n=FM.rows.filter(function(r){return r.engine&&r.engine!=="later"&&r.files&&!r.tooBig;}).length;
        fmSay(n?n+" of "+FM.rows.length+" can run on "+devWord()+" as it is; each row says why or why not.":"None of the "+FM.rows.length+" found can run on "+devWord()+" as it is; each row says why.");paintFm();});})
  .catch(function(e){FM.busy=false;fmSay("Hugging Face could not be reached: "+String(e&&e.message||e)+". Nothing was changed.");paintFm();});}
function chip(cls,t){return mk("span","fm-chip "+cls,t);}
function paintFm(){var L=D.getElementById("fmList"),go=D.getElementById("fmGo");if(go){go.disabled=FM.busy;go.textContent=FM.busy?"Searching…":"Search";}if(!L)return;L.innerHTML="";
  FM.rows.forEach(function(r){var li=mk("li","fm-row"),t=mk("div");var a=mk("a",null,r.id);a.href=HF+r.id;a.target="_blank";a.rel="noopener noreferrer";var b=mk("b");b.appendChild(a);t.appendChild(b);
    var cs=mk("div","fm-chips");
    if(r.skip){cs.appendChild(chip("bad",r.skip));}
    else{cs.appendChild(chip(r.engine==="proven"||r.engine==="newer"?"ok":r.engine==="later"?"warn":"bad","Kind: "+(r.arch||"not stated")));
      cs.appendChild(chip(!r.files?"bad":r.tooBig?"warn":"ok",!r.files?"No file of a size Ingenium uses":gb(r.size)+" ("+r.quant+") · needs about "+r.need.toFixed(1)+" GB"));
      cs.appendChild(chip(r.licence?"ok":"warn",r.licence?"Licence: "+r.licence:"Licence not stated"));
      if(r.files)cs.appendChild(chip("ok","Fingerprint on record"));}
    t.appendChild(cs);
    var why=r.skip?"":(!r.arch?"Its record does not state its kind, so Ingenium cannot say this engine runs it.":r.engine==="proven"?"This engine reads its kind.":r.engine==="newer"?"Only the newer engine reads its kind; Ingenium sends it there.":r.engine==="later"?"Its kind is read from llama.cpp "+(r.arch==="inkling2"?"b12599":"b12600")+" on: on a Mac whose copy carries the newer engine.":"No engine Ingenium carries reads its kind ("+r.arch+").");
    if(!r.skip&&r.files&&r.tooBig)why+=" It is larger than "+devWord()+" can hold.";
    if(why)t.appendChild(mk("div","fm-why",why));li.appendChild(t);
    var acts=mk("div","fm-acts"),ok=!r.skip&&r.files&&!r.tooBig&&(r.engine==="proven"||r.engine==="newer");
    if(dev()==="web"){var pg=mk("a","btn xs","Model page");pg.href=HF+r.id;pg.target="_blank";pg.rel="noopener noreferrer";acts.appendChild(pg);}
    else{var k=mk("button","btn xs"+(ok?" primary":""),ok?"Install":"Cannot run here");k.type="button";k.disabled=!ok;
      if(ok)k.onclick=function(){try{IngFound.install(r,k);fmSay("Installing "+r.name+": every part is checked against Hugging Face's fingerprint as it arrives.");}catch(e){fmSay(r.name+" was not installed: "+String(e&&e.message||e));}};acts.appendChild(k);}
    li.appendChild(acts);L.appendChild(li);});}
/* the sites: each card says what it is and has its own keys: Open the site, and Sign in. Each address was opened on 25 November 2026. */
var SITES=[
 {name:"Hugging Face",open:"https://huggingface.co/models?library=gguf&sort=trending",openLabel:"Open Hugging Face",signin:"https://huggingface.co/login",
  line:"Where most open models are published, with their cards, licences and files. The search on the left reads its catalogue directly."},
 {name:"Ollama",open:"https://ollama.com/library",openLabel:"Open Ollama's library",signin:"https://ollama.com/signin",
  line:"A library of models packaged for Ollama. Ingenium already brings in chats from the Ollama app."},
 {name:"LM Studio",open:"https://lmstudio.ai/models",openLabel:"Open LM Studio's models",signin:"https://lmstudio.ai/login",
  line:"Its catalogue of models, each linked to the same files on Hugging Face."},
 {name:"ModelScope",open:"https://www.modelscope.cn/models",openLabel:"Open ModelScope",signin:"",
  line:"Alibaba's library of open models, where many Qwen models appear first. Sign in from its own page."},
 {name:"Kaggle Models",open:"https://www.kaggle.com/models",openLabel:"Open Kaggle Models",signin:"",
  line:"Google's library of pre-trained models, Gemma among them. Sign in from its own page."}];
function oSt(){try{state.findSites=Array.isArray(state.findSites)?state.findSites:[];return state.findSites;}catch(e){return [];}}
function keyA(href,label,pri,aria){var a=mk("a","fm-k"+(pri?" pri":""));a.href=href;a.target="_blank";a.rel="noopener noreferrer";a.appendChild(D.createTextNode(label));a.appendChild(mk("i",null,"↗"));if(aria)a.setAttribute("aria-label",aria);return a;}
function site(x,own){var c=mk("div","fm-src"),h=mk("div","fm-src-h");h.appendChild(mk("b",null,x.name));
  if(own){var del=mk("button","fm-x","Remove");del.type="button";del.title="Remove "+x.name+" from your sites";del.onclick=function(){var L=oSt(),i=L.indexOf(x);if(i>=0)L.splice(i,1);try{saveState();}catch(e){}paintSites();};h.appendChild(del);}
  c.appendChild(h);if(x.line)c.appendChild(mk("span",null,x.line));
  var go=mk("div","fm-go");go.appendChild(keyA(x.open,x.openLabel||("Open "+x.name),true,(x.openLabel||("Open "+x.name))+": opens the site in your browser"));
  if(x.signin)go.appendChild(keyA(x.signin,"Sign in",false,"Sign in to "+x.name+": opens its sign-in page in your browser"));c.appendChild(go);
  c.appendChild(mk("div","fm-hint",x.signin?"Each key opens the site in your browser. Signing in happens on the site itself: Ingenium never sees your password.":"The key opens the site in your browser."));
  return c;}
function okUrl(u){try{var x=new URL(String(u).trim());return x.protocol==="https:"?x.href:"";}catch(e){return "";}}
function hfRepo(u){var m=/^https:\/\/huggingface\.co\/([^\/?#]+\/[^\/?#]+)/.exec(u||"");return m&&!/^(models|datasets|spaces|docs|login|join|settings)\//.test(m[1])?m[1]:"";}
function other(){var c=mk("div","fm-src fm-other");c.appendChild(mk("b",null,"Another site"));
  c.appendChild(mk("span",null,"Any other place that publishes models: paste a link to it, or to a model's own page. A Hugging Face model's link is read here with the four checks; any other opens in your browser, and you can keep the site among your own."));
  var bar=mk("div","fm-bar"),q=D.createElement("input");q.type="url";q.className="fm-q";q.id="fmOtherUrl";q.placeholder="https://… a site or a model's page";q.setAttribute("aria-label","A link to another site or a model's page");
  var go=mk("button","fm-k pri","Open it");go.type="button";var keep=mk("button","fm-k","Keep this site");keep.type="button";
  function val(){var u=okUrl(q.value);if(!u)fmSay("That link does not start with https://, so Ingenium does not open it.");return u;}
  go.onclick=function(){var u=val();if(!u)return;var repo=hfRepo(u);if(repo){var s=D.getElementById("fmQ");if(s)s.value=repo;search();return;}try{W.open(u,"_blank","noopener");}catch(e){}};
  keep.onclick=function(){var u=val();if(!u)return;var host="";try{host=new URL(u).hostname.replace(/^www\./,"");}catch(e){}var L=oSt();if(!L.some(function(x){return x.open===u;}))L.push({name:host||u,open:u,openLabel:"Open "+(host||"the site"),signin:"",line:"A site you keep. Sign in from its own page."});
    try{saveState();}catch(e){}q.value="";paintSites();fmSay((host||"The site")+" is kept among your sites.");};
  q.addEventListener("keydown",function(e){if(e.key==="Enter"){e.preventDefault();go.onclick();}});
  bar.appendChild(q);bar.appendChild(go);bar.appendChild(keep);c.appendChild(bar);return c;}
function paintSites(){var box=D.getElementById("fmSites");if(!box)return;box.innerHTML="";SITES.forEach(function(x){box.appendChild(site(x,false));});oSt().forEach(function(x){box.appendChild(site(x,true));});box.appendChild(other());}
function fmCard(){var c=D.getElementById("fmCard");if(c)return c;var anchor=D.getElementById("foundCard")||D.getElementById("lineupCard");if(!anchor||!anchor.parentNode)return null;
  c=mk("div","card");c.id="fmCard";var gr=mk("div","fm-grid"),l=mk("div"),r=mk("div");
  l.appendChild(mk("h3",null,"Find a new model"));
  l.appendChild(mk("p","fm-why","Search the places new models appear. Before anything is downloaded, Ingenium checks four things, and says each in plain words. It goes online only when you press Search."));
  var bar=mk("div","fm-bar"),q=D.createElement("input");q.type="search";q.id="fmQ";q.className="fm-q";q.placeholder="A model's name, for example Inkling 2 Mini";q.setAttribute("aria-label","Search for a model");
  q.addEventListener("keydown",function(e){if(e.key==="Enter"){e.preventDefault();search();}});
  var go=mk("button","btn small primary","Search");go.type="button";go.id="fmGo";go.onclick=search;bar.appendChild(q);bar.appendChild(go);l.appendChild(bar);
  var st=mk("div","fm-status");st.id="fmStatus";st.setAttribute("role","status");st.setAttribute("aria-live","polite");l.appendChild(st);
  var ul=mk("ul","fm-list");ul.id="fmList";l.appendChild(ul);
  r.appendChild(mk("h3",null,"Where new models appear"));
  var sites=mk("div");sites.id="fmSites";r.appendChild(sites);
  r.appendChild(mk("h3",null,"The four checks"));
  var ol=mk("ol","fm-steps");[["Its kind.","Read from its record on Hugging Face: can this device's engine run it?"],["Its size.","Against this device's memory, with room to work."],["Its licence.","From its own card."],["Its fingerprint.","Every file is checked against its SHA-256 as it arrives."]].forEach(function(x){var li=mk("li");li.appendChild(mk("b",null,x[0]));li.appendChild(D.createTextNode(" "+x[1]));ol.appendChild(li);});
  r.appendChild(ol);gr.appendChild(l);gr.appendChild(r);c.appendChild(gr);
  anchor.parentNode.insertBefore(c,anchor.nextSibling);paintSites();fmSay(FM.say);paintFm();return c;}

/* ---------- hooks: after the page draws its houses; and once the computer app has said what its engine reads ---------- */
function paint(){try{oracleTile();}catch(e){try{console.error("Ingenium: the Oracle house could not be drawn",e);}catch(_){}}try{fmCard();}catch(e){}}
function hook(){if(typeof W.renderLineup==="function"&&!W.renderLineup.__r385){var o=W.renderLineup;W.renderLineup=function(){var r=o.apply(this,arguments);paint();return r;};W.renderLineup.__r385=1;try{renderLineup=W.renderLineup;}catch(e){}}
  if(typeof W.lineupPaintJob==="function"&&!W.lineupPaintJob.__r385){var oj=W.lineupPaintJob;W.lineupPaintJob=function(k){var r=oj.apply(this,arguments);try{if(ORACLE.indexOf(k)>=0||INK[k]){var job=lineupJobs[k],rw=D.querySelector('.lu-oracle .lu-cd[data-cd="'+k+'"]');
      if(job&&rw){var bar=rw.querySelector(".lu-bar i"),f=job.total?Math.max(0,Math.min(1,job.received/job.total)):0;if(bar)bar.style.width=(f*100).toFixed(1)+"%";}}}catch(e){}return r;};W.lineupPaintJob.__r385=1;try{lineupPaintJob=W.lineupPaintJob;}catch(e){}}
  try{fmCard();}catch(e){}
  ask().then(function(changed){place();if(changed){try{renderLineup();}catch(e){}}else paint();});}
if(D.readyState==="loading")D.addEventListener("DOMContentLoaded",hook);else setTimeout(hook,0);
W.addEventListener("load",function(){setTimeout(function(){ask().then(function(ch){place();if(ch){try{renderLineup();}catch(e){}}});},1500);});
/* her engine choice changed in the Engine room: ask again */
D.addEventListener("click",function(e){var t=e.target&&e.target.closest&&e.target.closest("#page-models");if(!t)return;if(Date.now()-GATE.at<4000)return;
  setTimeout(function(){ask().then(function(ch){place();if(ch){try{renderLineup();}catch(x){}}});},600);},true);
W.IngR385={keys:Object.keys(INK),oracle:function(){return oracleKeys();},gate:function(){return Object.assign({},GATE);},reads:reads,place:place,ask:ask,cap:CAP,capped:capped,isInk:isInk,search:search,rows:function(){return FM.rows.slice();}};
})();
;try{window.__ingParts["p385"]="running";}catch(_){}
</script>
