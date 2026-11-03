<script>try{(window.__ingParts=window.__ingParts||{})["p212"]="started";}catch(_){}
/* ============ R212 · MORE MODELS FOR EVERY DEVICE, AND QUICKER REPLIES (6.10.3, 3 November 2026) ============
   Her words (3 November 2026): "I want better, stronger and faster models and more options for my fire tablet app and for the
   iphone and iPad apps. I want that for all of my devices, the Mac mini, the MacBook Pro, and the windows laptops as well."
   Read from Hugging Face on 3 November 2026, each file's name, size and SHA-256 as its repository lists them, and each model's kind
   read from its own file's first bytes (all are kinds the engine of this release, llama.cpp b11321, lists):
   1. four models as further choices, never as a house's own pick (each house's list is also the order in which it picks, so a model
      added there would quietly replace today's pick on some memory sizes; these sit on a list of their own, "more", which the
      Models page shows under each house with what each needs, and from which she can install and choose):
        MiniCPM5 1B (OpenBMB, May 2026, Apache 2.0)          phones and tablets from 3 GB: Velox and Scriba
        Ministral 3 3B Instruct (Mistral AI, Apache 2.0)     every device from 6 GB (phones) or 8 GB (computers): Velox, Magister
        Nemotron 3.5 Bolt E4B (NVIDIA, October 2026)         computers from 12 GB, iPads from 12 GB: Scriba and Magister; with its
                                                              speed-up file
        Ministral 3 14B Reasoning (Mistral AI, Apache 2.0)   computers with 16 GB: Magister
      Today's picks stay as they were: each maker measures its model against different rivals, so these cannot be ranked above them
      on one scale. She can try each beside the one she has;
   2. quicker replies on a computer with a graphics chip: speed-up files (R73's mechanism, which the engine reads by their kind) for
      MiniCPM5 2B (its maker's DSpark), LFM2.5 8B-A1B and 24B-A2B (Liquid AI's DSpark), Qwen3.8 27B and its Best copy (DFlash,
      from llama.cpp's own publishers) and Nemotron 3.5 Bolt E4B (DFlash). As before, a speed-up file is used only on a graphics chip, where it was measured to help (R73), and how
      much quicker it makes a reply on her computers was not measured here;
   3. each new model runs on its card's own settings. */
(function r212(){
"use strict";
if(typeof ING_LINEUP==="undefined"||!ING_LINEUP.models||!ING_LINEUP.devices)return;
var M=ING_LINEUP.models,D=ING_LINEUP.devices,HF="https://huggingface.co/",APACHE="https://www.apache.org/licenses/LICENSE-2.0";

/* ---------- 1. the models ---------- */
var NEW={
"minicpm5-1b":{name:"MiniCPM5 1B",maker:"OpenBMB",params:1.08,thinks:true,
  file:"MiniCPM5-1B-Q4_K_M.gguf",size:688065920,sha256:"81b64d05a23b17b34c475f42b3e72fbde62d4b92cc34541f7a8031d0752deafa",
  url:HF+"openbmb/MiniCPM5-1B-GGUF/resolve/main/MiniCPM5-1B-Q4_K_M.gguf",page:HF+"openbmb/MiniCPM5-1B",licence:"Apache 2.0",licenceUrl:APACHE,
  why:"OpenBMB's MiniCPM5 1B (May 2026), under Apache 2.0: 1.08B parameters and a memory of 131,072 tokens. It can think first or answer at once (the Thinking key), and Ingenium uses its card's settings for each: temperature 0.9 and top_p 0.95 when it thinks, 0.7 and 0.95 when it answers at once. 656 MB (Q4_K_M), needing about 1.4 GB of memory: for a phone or tablet with 3 GB or more."},
"ministral-3-3b":{name:"Ministral 3 3B",maker:"Mistral AI",params:3.4,thinks:false,
  file:"Ministral-3-3B-Instruct-2512-Q4_K_M.gguf",size:2147023008,sha256:"9ed150d4367e68df0ac8e1540f6ddc65b42d0ee26378329d1ecbca60f93fc5f8",
  url:HF+"mistralai/Ministral-3-3B-Instruct-2512-GGUF/resolve/main/Ministral-3-3B-Instruct-2512-Q4_K_M.gguf",page:HF+"mistralai/Ministral-3-3B-Instruct-2512",
  licence:"Apache 2.0",licenceUrl:APACHE,vision:{repos:["mistralai/Ministral-3-3B-Instruct-2512-GGUF"],prefer:["Ministral-3-3B-Instruct-2512-BF16-mmproj.gguf"]},
  why:"Mistral AI's Ministral 3 3B Instruct (December 2025), under Apache 2.0: 3.4B parameters, a memory of 262,144 tokens, and it reads pictures. It answers at once, without a thinking pass; its card recommends a temperature of 0.1 for everyday use, which Ingenium uses. 2.0 GB (Q4_K_M), needing about 2.9 GB of memory: for a computer with 8 GB, or a phone or tablet with 6 GB or more."},
"nemotron-3.5-bolt-e4b":{name:"Nemotron 3.5 Bolt E4B",maker:"NVIDIA",params:7.5,thinks:true,
  file:"NVIDIA-Nemotron-3.5-Bolt-E4B-UD-Q4_K_XL.gguf",size:5060482240,sha256:"84ff34f5834b929043f5ae74799e8d562d4056998f6a5923ceb44831e8ad84d6",
  url:HF+"unsloth/NVIDIA-Nemotron-3.5-Bolt-E4B-GGUF/resolve/main/NVIDIA-Nemotron-3.5-Bolt-E4B-UD-Q4_K_XL.gguf",page:HF+"nvidia/NVIDIA-Nemotron-3.5-Bolt-E4B-BF16",
  licence:"Other: NVIDIA's OpenMDW 1.1 (read it on its page)",licenceUrl:"https://openmdw.ai/license/1-1/",
  vision:{repos:["unsloth/NVIDIA-Nemotron-3.5-Bolt-E4B-GGUF"],prefer:["mmproj-F16.gguf","mmproj-BF16.gguf","mmproj-Q8_0.gguf"]},
  drafter:{name:"Nemotron 3.5 Bolt E4B DFlash",size:398892256,sha256:"9a63662ae8395b8bfc1a1b00d7a9ef354120f172704bd6ba88d3870cf22d4d03",file:"dflash-NVIDIA-Nemotron-3.5-Bolt-E4B-Q8_0.gguf",
    url:HF+"unsloth/NVIDIA-Nemotron-3.5-Bolt-E4B-GGUF/resolve/main/dflash-NVIDIA-Nemotron-3.5-Bolt-E4B-Q8_0.gguf"},
  why:"NVIDIA's Nemotron 3.5 Bolt E4B (October 2026), post-trained by NVIDIA on Google's Gemma 4 E4B: about 8B parameters of which 4B are effective, a memory of 131,072 tokens, and it reads pictures. Its card says its use is governed by NVIDIA's OpenMDW 1.1 licence, and the Gemma 4 model it was built on by Apache 2.0. Thinking is switched by the Thinking key; Ingenium uses its card's settings (temperature 1.0, top_p 0.95). On a computer with a graphics chip a speed-up file (DFlash) can be added. 4.7 GB (Unsloth's dynamic 4-bit, UD-Q4_K_XL), needing about 6.0 GB of memory: for a computer with 12 GB or more."},
"ministral-3-14b-reasoning":{name:"Ministral 3 14B Reasoning",maker:"Mistral AI",params:13.5,thinks:true,
  file:"Ministral-3-14B-Reasoning-2512-Q4_K_M.gguf",size:8239591488,sha256:"fe08ca2158cd7438211ec6a4e5256d31bc980f016e3f5b635fe91fe6848d461c",
  url:HF+"mistralai/Ministral-3-14B-Reasoning-2512-GGUF/resolve/main/Ministral-3-14B-Reasoning-2512-Q4_K_M.gguf",page:HF+"mistralai/Ministral-3-14B-Reasoning-2512",
  licence:"Apache 2.0",licenceUrl:APACHE,vision:{repos:["mistralai/Ministral-3-14B-Reasoning-2512-GGUF"],prefer:["Ministral-3-14B-Reasoning-2512-BF16-mmproj.gguf"]},
  why:"Mistral AI's Ministral 3 14B Reasoning (December 2025), under Apache 2.0: a dense model of 13.5B parameters that reasons before it answers, a memory of 262,144 tokens, and it reads pictures. Its card recommends temperature 1 and top_p 0.95, which Ingenium uses. All of its parameters work on each word, so it is slower than a mixture-of-experts model. 7.7 GB (Q4_K_M), needing about 9.3 GB of memory: for a computer with 16 GB or more."}};
Object.keys(NEW).forEach(function(k){if(!M[k])M[k]=NEW[k];});

/* ---------- 2. the speed-up files for models already in the lineup (used only on a graphics chip: R73) ---------- */
var QDF={name:"Qwen3.8 27B DFlash",size:1094346080,sha256:"0a994382adf17c720c9e5d4292f57344f3b445f058d3e9d5b0f601ae7d6ca3c4",file:"dflash-Qwen3.8-27B-Q4_0.gguf",
  url:HF+"ggml-org/Qwen3.8-27B-GGUF/resolve/main/dflash-Qwen3.8-27B-Q4_0.gguf"};
["qwen3.8-27b","qwen3.8-27b-best"].forEach(function(k){if(M[k]&&!M[k].drafter)M[k].drafter=Object.assign({},QDF);});
if(M["minicpm5-2b"]&&!M["minicpm5-2b"].drafter)M["minicpm5-2b"].drafter={name:"MiniCPM5 2B DSpark",size:652730240,sha256:"57df08640f0534a1aac075d1c8bdacdb2b7e5815da6f4e5cfd39ecac3a3f0c26",
  file:"MiniCPM5-2.6B-DSpark.gguf",url:HF+"openbmb/MiniCPM5-2B-DSpark-GGUF/resolve/main/MiniCPM5-2.6B-DSpark.gguf"};
/* Liquid AI's own DSpark files for the two LFM2.5 mixture-of-experts models in Faber's list (as for LFM2.5 1.2B and 2.6B, R73);
   the 24B's is published in 16-bit numbers only */
if(M["lfm2.5-8b-a1b"]&&!M["lfm2.5-8b-a1b"].drafter)M["lfm2.5-8b-a1b"].drafter={name:"LFM2.5 8B-A1B DSpark",size:199679840,sha256:"017278ec4409671890f2722a690a52dba59f5f02eff604f0c1e79cf52f7c4ae8",
  file:"LFM2.5-8B-A1B-DSpark-Q4_K_M.gguf",url:HF+"LiquidAI/LFM2.5-8B-A1B-DSpark-GGUF/resolve/main/LFM2.5-8B-A1B-DSpark-Q4_K_M.gguf"};
if(M["lfm2.5-24b-a2b"]&&!M["lfm2.5-24b-a2b"].drafter)M["lfm2.5-24b-a2b"].drafter={name:"LFM2.5 24B-A2B DSpark",size:663691296,sha256:"0cd847ca049aeabf53cb41d62091ae20eb50245cf89594c75af204784a1b1a0f",
  file:"LFM2.5-24B-A2B-DSpark-F16.gguf",url:HF+"LiquidAI/LFM2.5-24B-A2B-DSpark-GGUF/resolve/main/LFM2.5-24B-A2B-DSpark-F16.gguf"};

/* ---------- 3. the further choices: a list of their own, never the order a house picks in ---------- */
var MORE={
  android:{velox:["minicpm5-1b","ministral-3-3b"],scriba:["minicpm5-1b"],magister:["ministral-3-3b"]},
  ios:{velox:["minicpm5-1b","ministral-3-3b"],scriba:["minicpm5-1b","nemotron-3.5-bolt-e4b"],magister:["ministral-3-3b","nemotron-3.5-bolt-e4b"]},
  "mac-arm":{velox:["ministral-3-3b"],scriba:["nemotron-3.5-bolt-e4b"],magister:["ministral-3-14b-reasoning","nemotron-3.5-bolt-e4b"]},
  desktop:{velox:["ministral-3-3b"],scriba:["nemotron-3.5-bolt-e4b"],magister:["ministral-3-14b-reasoning","nemotron-3.5-bolt-e4b"]}};
Object.keys(MORE).forEach(function(dv){var d=D[dv];if(!d)return;d.more=d.more||{};
  Object.keys(MORE[dv]).forEach(function(t){var have=[].concat((d.tiers&&d.tiers[t])||[]);
    d.more[t]=[].concat(d.more[t]||[]).concat(MORE[dv][t].filter(function(k){return M[k]&&have.indexOf(k)<0;})).filter(function(k,i,a){return a.indexOf(k)===i;});});});
/* a further choice she picked is the house's model; the house's own list is read as before otherwise */
(function picks(){var lk=lineupKeyFor;
  lineupKeyFor=function(tier,dev){try{var me=lineupDevice(),d=D[dev||me]||D.desktop,more=d&&d.more&&d.more[tier],pk=state.tierPick&&state.tierPick[tier];
      if(pk&&more&&more.indexOf(pk)>=0&&(!dev||dev===me)&&M[pk])return pk;}catch(e){}
    return lk.apply(this,arguments);};
  window.lineupKeyFor=lineupKeyFor;})();

/* ---------- 4. sampling: the settings each card gives ---------- */
ING_SAMPLING["minicpm5-1b"]={think:{temperature:0.9,top_p:0.95},plain:{temperature:0.7,top_p:0.95}};
ING_SAMPLING["ministral-3-instruct"]={temperature:0.1};
ING_SAMPLING["ministral-3-reasoning"]={temperature:1.0,top_p:0.95};
(function families(){var sf=samplingFamily;
  samplingFamily=function(m){if(!m)return null;
    var key=(typeof lineupKeyOfRec==="function"&&lineupKeyOfRec(m))||"";
    var txt=(key+" "+(m.fileName||"")+" "+(m.customName||"")+" "+((m.meta&&(m.meta.name||m.meta.basename))||"")).toLowerCase();
    if(/minicpm-?5-?1b/.test(txt))return "minicpm5-1b";
    if(/ministral-3-\d+b-reasoning/.test(txt))return "ministral-3-reasoning";
    if(/ministral-3-\d+b/.test(txt))return "ministral-3-instruct";
    return sf.apply(this,arguments);};
  window.samplingFamily=samplingFamily;})();

/* ---------- 5. Velox's choices are shown too (Scriba and Magister's by R203, Faber's by R105) ---------- */
(function hook(){if(typeof renderLineup!=="function")return;var o=renderLineup;
  renderLineup=function(){var r=o.apply(this,arguments);try{if(window.IngR203&&IngR203.options)IngR203.options("velox");}catch(e){}return r;};
  window.renderLineup=renderLineup;})();

window.IngR212={keys:Object.keys(NEW),more:MORE};
})();
;try{window.__ingParts["p212"]="running";}catch(_){}
</script>
