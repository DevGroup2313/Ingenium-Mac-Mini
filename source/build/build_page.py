"""Build the new ingenium.html from the pristine 3.12 page: exact source edits
(each must match exactly once), then the new modules before the last script."""
import sys, os, re, glob, json
HERE = os.path.dirname(os.path.abspath(__file__))
_bp = os.path.join(HERE, "base312.html")
if os.path.exists(_bp):
    base = open(_bp, encoding="utf-8").read()
else:  # the repository keeps the 3.12 base gzipped (source/build/base312.html.gz)
    import gzip
    base = gzip.open(_bp + ".gz", "rt", encoding="utf-8").read()
out = base
EDITS = []
def edit(old, new, label):
    EDITS.append((old, new, label))

# ---- R123: a window of its own (#ingapp=...) shows one app and never writes Ingenium's own desk, so it can never
#      put an older copy of the desk over the newer one the main window keeps ----
edit('function saveState(){try{\n  state.__deskAt=Date.now();',
     'function saveState(){if(/[#&]ingapp=/.test(location.hash||""))return;try{\n  state.__deskAt=Date.now();', "R123 lite window never saves")

# ---- R101: the reply keeps at most half the memory; her request is never the part cut ----
edit('  return Math.max(1500,(ctx-replyTokens()-256)*3);}',
     '  /* R101: the reply keeps at most half of the memory, so a document or a change never leaves 1,500 characters for everything else */\n'
     '  return Math.max(1500,(ctx-Math.min(replyTokens(),Math.floor(ctx*0.5))-256)*3);}', "chatBudget")
edit('      if(wantNote&&x.rulesNote)body+=x.rulesNote;}',
     '      if(wantNote&&x.rulesNote)body+=x.rulesNote;if(x.makeNote)body+=x.makeNote;}', "makeNote")
edit('  function size(m){return typeof m.content==="string"?m.content.length:m.content.reduce(function(a,p){return a+(p.text?p.text.length:1200);},0);}',
     '  function size(m){return typeof m.content==="string"?m.content.length:m.content.reduce(function(a,p){return a+(p.text?p.text.length:1200);},0);}\n'
     '  /* R101: what she wrote (with the notes that follow it) is the end of her message; the files and findings come before it */\n'
     '  var tails=hist.map(function(x){return x.role==="me"?String(x.text||"")+(wantNote&&x.rulesNote?x.rulesNote:"")+(x.makeNote||""):"";});', "tails")
edit('  if(used>budget){while(msgs.length>1&&used>budget*0.66){used-=size(msgs.shift());hist.shift();moved=true;}}\n'
     '  while(msgs.length>1&&msgs[0].role==="assistant"){used-=size(msgs.shift());hist.shift();moved=true;}',
     '  if(used>budget){while(msgs.length>1&&used>budget*0.66){used-=size(msgs.shift());hist.shift();tails.shift();moved=true;}}\n'
     '  while(msgs.length>1&&msgs[0].role==="assistant"){used-=size(msgs.shift());hist.shift();tails.shift();moved=true;}', "shift tails")
edit('  if(used>budget&&msgs.length&&typeof msgs[0].content==="string"){var keep=Math.max(800,msgs[0].content.length-(used-budget));\n'
     '    msgs[0].content=msgs[0].content.slice(0,keep)+"\\n[the rest was left out to fit the model\'s memory]";msgs.cut=true;}',
     '  /* R101: when it is still too long, her attached text is shortened in its middle; her request, at the end, is kept whole,\n'
     '     and nothing says "left out" when nothing was */\n'
     '  if(used>budget&&msgs.length&&typeof msgs[0].content==="string"){var over=used-budget,c0=msgs[0].content,tl=tails[0]||"";\n'
     '    if(tl&&c0.length>tl.length+400&&c0.slice(c0.length-tl.length)===tl){var lead=c0.slice(0,c0.length-tl.length),kl=Math.max(600,lead.length-over);\n'
     '      if(kl<lead.length){var hd=Math.floor(kl*0.7);msgs[0].content=lead.slice(0,hd)+"\\n[… part of the attached text was left out here to fit the model\'s memory …]\\n"+lead.slice(lead.length-(kl-hd))+tl;msgs.cut=true;}}\n'
     '    else{var keep=Math.max(800,c0.length-over);if(keep<c0.length){msgs[0].content=c0.slice(0,keep)+"\\n[the rest was left out to fit the model\'s memory]";msgs.cut=true;}}}', "cut")
edit('if(f.media)o.media=f.media;return o;})',
     'if(f.media)o.media=f.media;if(f.docx)o.docx=f.docx;return o;})', "docx ref")
edit('("You are "+n+", a private AI assistant running entirely on the person\'s own device."),',
     '("You are "+n+", a private AI assistant running entirely on the person\'s own device."),\n'
     '    "- You can make and change files here: Ingenium turns what you write into Word and PDF documents, web pages and apps, spreadsheets and slides, and applies your changes to the person\'s own files. Never say that you cannot create, edit or save files.",', "core capability")
edit('    if(p.thinking!=null)body.chat_template_kwargs={enable_thinking:!!p.thinking};',
     '    if(p.thinking!=null)body.chat_template_kwargs={enable_thinking:!!p.thinking};\n'
     '    /* R101: thinking has a budget (llama.cpp ends the thoughts there and the answer begins) */\n'
     '    if(p.thinking&&p.thinking_budget>0){body.thinking_budget_tokens=p.thinking_budget;body.reasoning_budget_message="\\n\\nI have thought enough. Now I write the answer.\\n";}', "thinking budget")

# ---- R102: the chat's grip resizes within the window ----
edit('    function mv(ev){var h=Math.max(320,Math.min(4000,Math.round(h0+ev.clientY-y0)));document.documentElement.style.setProperty("--chat-h",h+"px");}',
     '    function mv(ev){var h=Math.max(320,Math.min(4000,Math.round(h0+ev.clientY-y0)));if(window.r2Grip){r2Grip(h,false);return;}document.documentElement.style.setProperty("--chat-h",h+"px");}', "grip move")
edit('  g.addEventListener("keydown",function(e){if(e.key!=="ArrowUp"&&e.key!=="ArrowDown")return;e.preventDefault();var h=Math.round(wrap.getBoundingClientRect().height)+(e.key==="ArrowDown"?40:-40);h=Math.max(320,Math.min(4000,h));',
     '  g.addEventListener("keydown",function(e){if(e.key!=="ArrowUp"&&e.key!=="ArrowDown")return;e.preventDefault();var h=Math.round(wrap.getBoundingClientRect().height)+(e.key==="ArrowDown"?40:-40);h=Math.max(320,Math.min(4000,h));if(window.r2Grip){r2Grip(h,true);return;}', "grip keys")

# ---- R105: coding models for every device ----
edit('reasons before it writes code."}},\n  /* per device:',
     'reasons before it writes code."},\n    /* R105 (16 October 2026): coding models for every device, her word: "build into Ingenium some really strong, fast and\n       accurate and really powerful local models for coding ... the best models per devices ... for me to choose from".\n       Each file\'s name, size and SHA-256 were read from Hugging Face by .github/workflows/lineup-sources.yml on the day,\n       and each downloads without signing in. Scores are the makers\' own, from their model cards. */\n    "mellum2.1-12b-thinking":{name:"Mellum2.1 12B Thinking",maker:"JetBrains",params:12,thinks:true,\n      file:"Mellum2.1-12B-A2.5B-Thinking-Q4_K_M.gguf",size:8071295264,sha256:"ecc4d5b8107fc219e23c494b2d107552137637b6c6002ee713e0ba8af7fa2755",\n      url:"https://huggingface.co/JetBrains/Mellum2.1-12B-A2.5B-Thinking-GGUF/resolve/main/Mellum2.1-12B-A2.5B-Thinking-Q4_K_M.gguf",\n      page:"https://huggingface.co/JetBrains/Mellum2.1-12B-A2.5B-Thinking",licence:"Apache 2.0",licenceUrl:"https://www.apache.org/licenses/LICENSE-2.0",\n      why:"JetBrains\' coding model, updated on 7 October 2026. In its maker\'s tests it scores 82 on LiveCodeBench v6, 91.5 on HumanEval+ and 47 on SWE-bench Verified, well ahead of Mellum2. Only about 2.5B of its 12B parameters work on each word, so it writes quickly, and it reasons before it writes code."},\n    "gemma-4-12b":{name:"Gemma 4 12B",maker:"Google",params:12,thinks:true,\n      file:"gemma-4-12b-it-qat-q4_0.gguf",size:6975879296,sha256:"93567e57a8fe10b23569b9d9ec38cd005deedf71e29477c421a4b83f418a538b",\n      url:"https://huggingface.co/google/gemma-4-12B-it-qat-q4_0-gguf/resolve/main/gemma-4-12b-it-qat-q4_0.gguf",\n      page:"https://huggingface.co/google/gemma-4-12B-it",licence:"Apache 2.0",licenceUrl:"https://www.apache.org/licenses/LICENSE-2.0",\n      why:"Google\'s model of May 2026, in Google\'s own 4-bit form: 72% on LiveCodeBench v6 in its maker\'s tests, with broad knowledge besides code and a long memory (256K tokens). It can also read pictures.",\n      vision:{repos:["google/gemma-4-12B-it-qat-q4_0-gguf"],prefer:["mmproj-gemma-4-12b-it-qat-q4_0.gguf"]}},\n    "gemma-4-26b-a4b":{name:"Gemma 4 26B A4B",maker:"Google",params:26,thinks:true,\n      file:"gemma-4-26B_q4_0-it.gguf",size:14439363584,sha256:"3eca3b8f6d7baf218a7dd6bba5fb59a56ee25fe2d567b6f5f589b4f697eca51d",\n      url:"https://huggingface.co/google/gemma-4-26B-A4B-it-qat-q4_0-gguf/resolve/main/gemma-4-26B_q4_0-it.gguf",\n      page:"https://huggingface.co/google/gemma-4-26B-A4B-it-qat-q4_0-gguf",licence:"Apache 2.0",licenceUrl:"https://www.apache.org/licenses/LICENSE-2.0",\n      why:"Google\'s mixture-of-experts Gemma 4: 77.1% on LiveCodeBench v6 in its maker\'s tests, and only about 3.8B of its 25B parameters work on each word, so it answers almost as fast as a 4B model. For computers with about 24 GB of memory or more."},\n    "gemma-4-e4b":{name:"Gemma 4 E4B",maker:"Google",params:4,thinks:true,\n      file:"gemma-4-E4B_q4_0-it.gguf",size:5154941280,sha256:"676c35070db6dbe52f93e9c864ee0fba4eddea94b9c875d9cb10daff453fbaee",\n      url:"https://huggingface.co/google/gemma-4-E4B-it-qat-q4_0-gguf/resolve/main/gemma-4-E4B_q4_0-it.gguf",\n      page:"https://huggingface.co/google/gemma-4-E4B-it-qat-q4_0-gguf",licence:"Apache 2.0",licenceUrl:"https://www.apache.org/licenses/LICENSE-2.0",\n      why:"Google\'s Gemma 4 for phones and tablets: 4.5B parameters at work (52% on LiveCodeBench v6 in its maker\'s tests). For devices with about 12 GB of memory or more."},\n    "gemma-4-e2b":{name:"Gemma 4 E2B",maker:"Google",params:2,thinks:true,\n      file:"gemma-4-E2B_q4_0-it.gguf",size:3349516256,sha256:"fa401b55b07ee70a54c6dae3903c783a6e65064312529ea57175cb5f8dec6634",\n      url:"https://huggingface.co/google/gemma-4-E2B-it-qat-q4_0-gguf/resolve/main/gemma-4-E2B_q4_0-it.gguf",\n      page:"https://huggingface.co/google/gemma-4-E2B-it-qat-q4_0-gguf",licence:"Apache 2.0",licenceUrl:"https://www.apache.org/licenses/LICENSE-2.0",\n      why:"The smallest Gemma 4: 2.3B parameters at work, and 44% on LiveCodeBench v6 in its maker\'s tests, a large step for its size. For phones and tablets with about 8 GB of memory."},\n    "lfm2.5-8b-a1b":{name:"LFM2.5 8B-A1B",maker:"Liquid AI",params:8,thinks:true,\n      file:"LFM2.5-8B-A1B-Q4_K_M.gguf",size:5155564768,sha256:"4923ec14f06b968b74d663e5949867d2d9c3bf13a20b8be1a9f9af39989b2bb0",\n      url:"https://huggingface.co/LiquidAI/LFM2.5-8B-A1B-GGUF/resolve/main/LFM2.5-8B-A1B-Q4_K_M.gguf",\n      page:"https://huggingface.co/LiquidAI/LFM2.5-8B-A1B",licence:"LFM Open License v1.0",licenceUrl:"https://huggingface.co/LiquidAI/LFM2.5-8B-A1B/raw/main/LICENSE",\n      why:"Liquid AI\'s mixture-of-experts model: of its 8.3B parameters only 1.5B work on each word, so it answers quickly even on a processor alone, and it reasons before it answers."},\n    "lfm2.5-24b-a2b":{name:"LFM2.5 24B-A2B",maker:"Liquid AI",params:24,thinks:true,\n      file:"LFM2.5-24B-A2B-Q4_K_M.gguf",size:14526258464,sha256:"d3334405b96228eb9908cdebb5c6194908f2da64282bda852afc3a3910c64e7d",\n      url:"https://huggingface.co/LiquidAI/LFM2.5-24B-A2B-GGUF/resolve/main/LFM2.5-24B-A2B-Q4_K_M.gguf",\n      page:"https://huggingface.co/LiquidAI/LFM2.5-24B-A2B",licence:"LFM Open License v1.0",licenceUrl:"https://huggingface.co/LiquidAI/LFM2.5-24B-A2B/raw/main/LICENSE",\n      why:"Liquid AI\'s largest model (9 October 2026), made for agents and tool use: about 2.4B of its 24B parameters work on each word, and in its maker\'s tests it beats Qwen3.6 35B-A3B on agentic work. For computers with about 24 GB of memory or more."},\n    "granite-4.2-3b":{name:"Granite 4.2 3B",maker:"IBM",params:3,thinks:false,\n      file:"granite-4.2-3b-Q4_K_M.gguf",size:2244011552,sha256:"e0406663965846ae22a403456eb826ccce5f450840491f71952f18a7cb78e7d5",\n      url:"https://huggingface.co/ibm-granite/granite-4.2-3b-GGUF/resolve/main/granite-4.2-3b-Q4_K_M.gguf",\n      page:"https://huggingface.co/ibm-granite/granite-4.2-3b",licence:"Apache 2.0",licenceUrl:"https://www.apache.org/licenses/LICENSE-2.0",\n      why:"IBM\'s small model of August 2026, made for work and code, with a 128K memory. For tablets and phones with about 6 GB of memory or more."},\n    "qwen3-coder-30b-a3b":{name:"Qwen3-Coder 30B-A3B",maker:"Qwen (Alibaba)",params:30,thinks:false,\n      file:"Qwen3-Coder-30B-A3B-Instruct-Q4_K_M.gguf",size:18556689568,sha256:"fadc3e5f8d42bf7e894a785b05082e47daee4df26680389817e2093056f088ad",\n      url:"https://huggingface.co/unsloth/Qwen3-Coder-30B-A3B-Instruct-GGUF/resolve/main/Qwen3-Coder-30B-A3B-Instruct-Q4_K_M.gguf",\n      page:"https://huggingface.co/Qwen/Qwen3-Coder-30B-A3B-Instruct",licence:"Apache 2.0",licenceUrl:"https://huggingface.co/Qwen/Qwen3-Coder-30B-A3B-Instruct/raw/main/LICENSE",\n      why:"Qwen\'s coding model for whole programs and whole code bases: 30.5B parameters with 3.3B at work on each word, and a 256K memory. It answers without stopping to think. For computers with about 32 GB of memory or more."},\n    "qwen2.5-coder-1.5b":{name:"Qwen2.5-Coder 1.5B",maker:"Qwen (Alibaba)",params:1.5,thinks:false,\n      file:"qwen2.5-coder-1.5b-instruct-q4_k_m.gguf",size:1117320768,sha256:"cc324af070c2ecbfd324a30884d2f951a7ff756aba85cb811a6ec436933bb046",\n      url:"https://huggingface.co/Qwen/Qwen2.5-Coder-1.5B-Instruct-GGUF/resolve/main/qwen2.5-coder-1.5b-instruct-q4_k_m.gguf",\n      page:"https://huggingface.co/Qwen/Qwen2.5-Coder-1.5B-Instruct",licence:"Apache 2.0",licenceUrl:"https://huggingface.co/Qwen/Qwen2.5-Coder-1.5B-Instruct/raw/main/LICENSE",\n      why:"Qwen\'s small coding model: quick on a tablet with little memory, for short pieces of code, checking and explaining. It knows far less than the larger models."}},\n  /* per device:',
     'R105 coding models')
edit('faber:["lfm2.5-2.6b","qwen3.5-2b","lfm2.5-1.2b-thinking"]}},',
     'faber:["gemma-4-e4b","gemma-4-e2b","lfm2.5-2.6b","granite-4.2-3b","qwen3.5-2b","qwen2.5-coder-1.5b","lfm2.5-1.2b-thinking"]}},',
     'R105 android faber')
edit('magister:["qwen3.5-4b","lfm2.5-2.6b"],faber:"lfm2.5-2.6b"}},',
     'magister:["qwen3.5-4b","lfm2.5-2.6b"],faber:["gemma-4-12b","lfm2.5-8b-a1b","gemma-4-e4b","gemma-4-e2b","lfm2.5-2.6b","granite-4.2-3b","qwen2.5-coder-1.5b"]}},',
     'R105 ios faber')
edit('faber:["mellum2-12b-thinking","lfm2.5-2.6b"]},\n      cpuOnly:{magister:"qwen3.5-4b"}},',
     'faber:["qwen3-coder-30b-a3b","gemma-4-26b-a4b","lfm2.5-24b-a2b","mellum2.1-12b-thinking","gemma-4-12b","lfm2.5-8b-a1b","mellum2-12b-thinking","lfm2.5-2.6b"]},\n      cpuOnly:{magister:"qwen3.5-4b"}},',
     'R105 desktop faber')
edit('faber:["mellum2-12b-thinking","lfm2.5-2.6b"]}}}};',
     'faber:["qwen3-coder-30b-a3b","gemma-4-26b-a4b","lfm2.5-24b-a2b","mellum2.1-12b-thinking","gemma-4-12b","lfm2.5-8b-a1b","mellum2-12b-thinking","lfm2.5-2.6b"]}}}};',
     'R105 mac faber')
edit('"mellum2":{temperature:0.6,top_p:0.95,top_k:20,min_p:0,repeat_penalty:1}};',
     '"mellum2":{temperature:0.6,top_p:0.95,top_k:20,min_p:0,repeat_penalty:1},\n  /* R105: Google\'s for Gemma, Qwen\'s for Qwen3-Coder, and Liquid AI\'s for its reasoning models */\n  "gemma4":{temperature:1.0,top_k:64,top_p:0.95,min_p:0,repeat_penalty:1},\n  "qwen3-coder":{temperature:0.7,top_p:0.8,top_k:20,min_p:0,repeat_penalty:1.05},\n  "lfm2.5-moe":{temperature:0.1,top_k:50,top_p:1,min_p:0,repeat_penalty:1.05}};',
     'R105 sampling')
edit('  if(/lfm2\\.?5/.test(txt)){if(/thinking/.test(txt))return "lfm2.5-1.2b-thinking";',
     '  if(/lfm2\\.?5/.test(txt)&&/8b-a1b|24b-a2b/.test(txt))return "lfm2.5-moe";\n  if(/gemma-?4/.test(txt))return "gemma4";\n  if(/qwen3-coder/.test(txt))return "qwen3-coder";\n  if(/lfm2\\.?5/.test(txt)){if(/thinking/.test(txt))return "lfm2.5-1.2b-thinking";',
     'R105 families')


# ---- R107 (16 October 2026): the master seal she approved goes on the documents about all four apps; a set's own name ----
edit('var seals=personal?[]:apps.filter(function(k){return ING_SEALS[k]&&k!=="master";}).slice(0,4);',
     '/* R107: a document about all four apps carries the master seal of The Offline Project, alone */\n'
     '  var seals=personal?[]:((meta.master||apps.length>=4)&&ING_SEALS.master?["master"]:apps.filter(function(k){return ING_SEALS[k]&&k!=="master";}).slice(0,4));', "R107 master seal")
edit("seals.map(function(k,i){return lxhImage(k,i,1.2)", "seals.map(function(k,i){return lxhImage(k,i,k===\"master\"?1.55:1.2)", "R107 master size")
edit('var name=personal?(author||String(heading||title).split(/·/)[0].trim()):(apps.length?apps.map(function(k){return LXH_NAMES[k];}).join(" and "):String(heading||title).split(/·/)[0].trim());',
     'var name=meta.name||(personal?(author||String(heading||title).split(/·/)[0].trim()):(apps.length?apps.map(function(k){return LXH_NAMES[k];}).join(" and "):String(heading||title).split(/·/)[0].trim()));', "R107 set name")


# ---- R108: an app whose copy was lost (a store cleared) is kept again when its file is added again ----
edit('if(cur&&cur.sha256===meta.sha256)return Promise.resolve("same");',
     '/* R108: the same app again: "unchanged" only if its copy is really still here; a copy that was lost is kept again */\n'
     '  if(cur&&cur.sha256===meta.sha256)return libText(key).then(function(t){if(t)return "same";return libPut(cur.ref,u8,text).then(function(){return "kept";});},function(){return libPut(cur.ref,u8,text).then(function(){return "kept";});});', "R108 relink")

# ---- R2i (17 October 2026): her word, "give Inkwell's documents the Inkwell colour palette and design and the same for the
# Forge and Carpe Diem". The Word file keeps her house hand (Times New Roman at 12 points, her margins, numbered sections)
# and takes each app's own palette and its door's design: the title in the app's own ink and face, the small capitals
# between two fine gilt lines, "Prepared for" in the app's colour, a gilt rule under the cover, tables ruled in the
# app's colour; a document about two or more apps is set as The Offline Project (vellum ink and the master seal's gilt) ----
edit('var LXH_THEMES={cd:{accent:"1B6B93",sub:"454549",fill:"EAF2F7"},forge:{accent:"17577A",sub:"8A6A22",fill:"F6F0E2"},\n'
     '  ingenium:{accent:"6A3FB5",sub:"4B3A6E",fill:"F1ECFA"},inkwell:{accent:"1F4F68",sub:"8A6526",fill:"F4EFE3"},neutral:{accent:"2B2B33",sub:"454549",fill:"F2F2F4"}};',
     'var LXH_THEMES={cd:{accent:"1B6B93",sub:"145671",fill:"EAF2F7",title:"121218",line:"B88A3A",caps:"1B6B93",ink:"1D1D1F",ink2:"454549",font:"Georgia",rule:"1B6B93",roman:1,frame:"8DB5CA"},\n'
     '  forge:{accent:"17577A",sub:"A55A22",fill:"EEF1F4",title:"121619",line:"A55A22",caps:"1B6B93",ink:"121619",ink2:"39424C",font:"Georgia",rule:"39424C",roman:1,frame:"B4BEC8"},\n'
     '  ingenium:{accent:"6A3FB5",sub:"4B3A6E",fill:"F1ECFA",title:"4E2C8A",line:"B9A6DD",caps:"6A3FB5",ink:"1D1D1F",ink2:"454549",font:null,rule:"4A405A",upper:1,orn:1},\n'
     '  inkwell:{accent:"1F4F68",sub:"8A6526",fill:"F3ECDA",title:"1F4F68",line:"A97E2C",caps:"8A6526",ink:"231D15",ink2:"5F5646",font:"Georgia",rule:"A97E2C",frame:"D6C08E"},\n'
     '  family:{accent:"23364A",sub:"7A5F2E",fill:"F4EEDF",title:"1F2A36",line:"A8843C",caps:"8A6A2C",ink:"1F2A36",ink2:"4A4A52",font:"Georgia",rule:"A8843C",frame:"D2BC86"},\n'
     '  neutral:{accent:"2B2B33",sub:"454549",fill:"F2F2F4",title:"2B2B33",line:"8A7650",caps:"8A7650",ink:"1D1D1F",ink2:"454549",font:null,rule:"4A405A"}};', "R2i themes")
edit("function lxhRun(t,o){o=o||{};return '<w:r><w:rPr><w:rFonts w:ascii=\"Times New Roman\" w:hAnsi=\"Times New Roman\" w:cs=\"Times New Roman\"/>'+(o.b?\"<w:b/>\":\"\")+(o.i?\"<w:i/>\":\"\")+(o.color?'<w:color w:val=\"'+o.color+'\"/>':\"\")+(o.sz?",
     "function lxhRun(t,o){o=o||{};var f=o.font||\"Times New Roman\";return '<w:r><w:rPr><w:rFonts w:ascii=\"'+f+'\" w:hAnsi=\"'+f+'\" w:cs=\"'+f+'\"/>'+(o.b?\"<w:b/>\":\"\")+(o.i?\"<w:i/>\":\"\")+(o.caps?\"<w:caps/>\":\"\")+(o.color?'<w:color w:val=\"'+o.color+'\"/>':\"\")+(o.caps?'<w:spacing w:val=\"'+o.caps+'\"/>':\"\")+(o.sz?", "R2i run face")
edit('var personal=kind==="cv"||kind==="cover",th=LXH_THEMES[personal?"neutral":(apps[0]||"neutral")];',
     'var personal=kind==="cv"||kind==="cover",th=LXH_THEMES[personal?"neutral":(apps.length>1?"family":(apps[0]||"neutral"))]||LXH_THEMES.neutral;', "R2i theme of the set")
edit("""  body.push(lxhPara(lxhRun(name,{b:1,sz:personal?22:20,color:th.accent}),{center:1,after:5,line:1.25}));
  body.push(lxhPara(lxhRun(meta.subtitle||label,{i:1,sz:12,color:"454549"}),{center:1,after:8,line:1.25}));
  if(meta.forText)body.push(lxhPara(lxhRun("Prepared for "+meta.forText,{sz:11,color:"454549"}),{center:1,after:4,line:1.25}));
  if(author&&!personal)body.push(lxhPara(lxhRun(author+"  ·  "+lxhMonth(),{sz:11,color:"454549"}),{center:1,after:4,line:1.25}));
  body.push(lxhPara(lxhRun("",{}),{after:10}));""",
     """  if(personal){body.push(lxhPara(lxhRun(name,{b:1,sz:22,color:th.accent}),{center:1,after:5,line:1.25}));
    body.push(lxhPara(lxhRun(meta.subtitle||label,{i:1,sz:12,color:"454549"}),{center:1,after:8,line:1.25}));
    if(meta.forText)body.push(lxhPara(lxhRun("Prepared for "+meta.forText,{sz:11,color:"454549"}),{center:1,after:4,line:1.25}));
    body.push(lxhPara(lxhRun("",{}),{after:10}));}
  else{/* R2i: the cover in the app's own design: its title, its small capitals between two fine lines, then for whom and by whom */
    var rom=function(n){var v=[[1000,"M"],[900,"CM"],[500,"D"],[400,"CD"],[100,"C"],[90,"XC"],[50,"L"],[40,"XL"],[10,"X"],[9,"IX"],[5,"V"],[4,"IV"],[1,"I"]],r="";v.forEach(function(p){while(n>=p[0]){r+=p[1];n-=p[0];}});return r;},dd=new Date(),
      LAT=["IANVARII","FEBRVARII","MARTII","APRILIS","MAII","IVNII","IVLII","AVGVSTI","SEPTEMBRIS","OCTOBRIS","NOVEMBRIS","DECEMBRIS"];
    /* Carpe Diem and The Forge carry the date as their doors write it (XVII\u00b7OCTOBRIS\u00b7MMXXVI), Ingenium its title in spaced capitals */
    body.push(lxhPara(lxhRun(name,{b:1,sz:th.upper?20:23,color:th.title||th.accent,font:th.font,caps:th.upper?70:0}),{center:1,after:6,line:1.2}));
    body.push(lxhPara(lxhRun("\\u2014\\u2014   ",{sz:9.5,color:th.line})+lxhRun(th.roman?rom(dd.getDate())+"\\u00b7"+LAT[dd.getMonth()]+"\\u00b7"+rom(dd.getFullYear()):(meta.subtitle||label),{b:1,sz:9.5,color:th.caps,caps:44})+lxhRun("   \\u2014\\u2014",{sz:9.5,color:th.line}),{center:1,after:th.roman?4:9,line:1.2}));
    if(th.roman)body.push(lxhPara(lxhRun(meta.subtitle||label,{i:1,sz:13,color:th.accent,font:th.font}),{center:1,after:8,line:1.25}));
    if(meta.forText)body.push(lxhPara(lxhRun("Prepared for "+meta.forText,{i:1,sz:12,color:th.accent}),{center:1,after:4,line:1.25}));
    if(author)body.push(lxhPara(lxhRun(author+"  ·  "+lxhMonth(),{sz:11,color:th.ink2||"454549"}),{center:1,after:4,line:1.25}));
    if(th.orn)body.push(lxhPara(lxhRun("\\u2014\\u2014\\u2014\\u2014\\u2014\\u2014   ",{sz:10,color:th.line})+lxhRun("\\u2726",{sz:13,color:th.accent})+lxhRun("   \\u2014\\u2014\\u2014\\u2014\\u2014\\u2014",{sz:10,color:th.line}),{center:1,before:6,after:18,line:1.2}));
    else body.push('<w:p><w:pPr><w:pBdr><w:bottom w:val="single" w:sz="6" w:space="1" w:color="'+th.line+'"/></w:pBdr><w:spacing w:before="120" w:after="360"/><w:ind w:left="1700" w:right="1700"/></w:pPr></w:p>');}""", "R2i cover")
# the frame of the app's door around the cover page (first page only)
edit("""+'<w:pgMar w:top="1195" w:right="1181" w:bottom="1094" w:left="1181" w:header="567" w:footer="567" w:gutter="0"/><w:titlePg/></w:sectPr></w:body></w:document>';""",
     """+'<w:pgMar w:top="1195" w:right="1181" w:bottom="1094" w:left="1181" w:header="567" w:footer="567" w:gutter="0"/>'
    +(!personal&&th.frame?'<w:pgBorders w:offsetFrom="page" w:display="firstPage">'+["top","left","bottom","right"].map(function(e){return '<w:'+e+' w:val="single" w:sz="4" w:space="28" w:color="'+th.frame+'"/>';}).join("")+'</w:pgBorders>':'')
    +'<w:titlePg/></w:sectPr></w:body></w:document>';""", "R2i frame")
edit("""    if(b.k==="p"){body.push(refs?lxhPara(lxhInline(b.t,{sz:10.5,color:"1D1D1F"}),{after:4,line:1.3,ind:[432,432]}):lxhPara(lxhInline(b.t,{sz:12,color:"1D1D1F"}),{after:10,line:1.5}));return;}
    if(b.k==="ul"){body.push(lxhPara(lxhRun("•\\t",{sz:12,color:cur.accent})+lxhInline(b.t,{sz:12,color:"1D1D1F"}),{after:5,line:1.35,ind:[432,288]}));return;}
    if(b.k==="ol"){body.push(lxhPara(lxhRun(b.n+".\\t",{sz:12,color:cur.accent})+lxhInline(b.t,{sz:12,color:"1D1D1F"}),{after:5,line:1.35,ind:[432,288]}));return;}
    if(b.k==="quote"){body.push(lxhPara(lxhInline(b.t,{i:1,sz:11.5,color:"454549"}),{after:10,line:1.4,ind:[567,0]}));return;}""",
     """    var INK=th.ink||"1D1D1F",INK2=th.ink2||"454549";
    if(b.k==="p"){body.push(refs?lxhPara(lxhInline(b.t,{sz:10.5,color:INK}),{after:4,line:1.3,ind:[432,432]}):lxhPara(lxhInline(b.t,{sz:12,color:INK}),{after:10,line:1.5}));return;}
    if(b.k==="ul"){body.push(lxhPara(lxhRun("•\\t",{sz:12,color:cur.accent})+lxhInline(b.t,{sz:12,color:INK}),{after:5,line:1.35,ind:[432,288]}));return;}
    if(b.k==="ol"){body.push(lxhPara(lxhRun(b.n+".\\t",{sz:12,color:cur.accent})+lxhInline(b.t,{sz:12,color:INK}),{after:5,line:1.35,ind:[432,288]}));return;}
    if(b.k==="quote"){body.push(lxhPara(lxhInline(b.t,{i:1,sz:11.5,color:INK2}),{after:10,line:1.4,ind:[567,0]}));return;}""", "R2i ink")
edit("""  var b=function(k,on){return '<w:'+k+(on?' w:val="single" w:sz="4" w:space="0" w:color="C8C8CC"/>':' w:val="nil"/>');};""",
     """  var b=function(k,on){return '<w:'+k+(on?' w:val="single" w:sz="'+(k==="insideH"?4:8)+'" w:space="0" w:color="'+(k==="insideH"?"D5D2CC":(th.rule||"C8C8CC"))+'"/>':' w:val="nil"/>');};""", "R2i table rules")
edit("""      +lxhPara(lxhInline(c,{sz:11,b:i===0||k===0,color:i===0?th.accent:"1D1D1F"}),{after:2,line:1.2})+'</w:tc>';});x+='</w:tr>';});""",
     """      +lxhPara(lxhInline(c,{sz:11,b:i===0||k===0,color:i===0?th.accent:(th.ink||"1D1D1F")}),{after:2,line:1.2})+'</w:tc>';});x+='</w:tr>';});""", "R2i table ink")
edit("""  if(note)body.push(lxhPara(lxhInline(note,{i:1,sz:10.5,color:"454549"}),{before:12,after:6,line:1.3}));""",
     """  if(note)body.push(lxhPara(lxhInline(note,{i:1,sz:10.5,color:th.ink2||"454549"}),{before:12,after:6,line:1.3}));""", "R2i note")

# ---- R115 (17 October 2026): every search vetted, with or without the scholarly indexes; Peer-reviewed only ----
edit('    if(!sch&&!(w.web&&w.research))return orig.apply(this,arguments);\n',
     '    /* R115: every search is vetted the same way, with or without the scholarly indexes */\n', "R115 vet every search")
edit('"🎓 Searching scholarly sources and the web…"',
     '(sch?"🎓 Searching scholarly sources and the web…":"🌐 Searching the web; each source is checked…")', "R115 status")
edit('      wb.sort(schRank);var all=sc.concat(wb.slice(0,deep?4:3));',
     '      wb.sort(schRank);var all=(typeof schPeerOnly==="function"&&schPeerOnly())?sc.filter(schIsPeer):sc.concat(wb.slice(0,deep?4:3));\n'
     '      if(!all.length&&typeof schPeerOnly==="function"&&schPeerOnly())throw new Error("no peer-reviewed source was found for this; switch Peer-reviewed only off in Settings to allow preprints, books and web pages");',
     "R115 peer-reviewed only")
edit('Retracted work is left out, preprints are named as such, and each source shows what was checked.</div></div></div>',
     'Retracted work is left out, preprints are named as such, and each source shows what was checked.</div></div></div>\n'
     '        <div class="sch-set"><label class="eswitch"><input type="checkbox" id="srchPeer"><span class="etrack"></span></label>\n'
     '          <div><b>Peer-reviewed only</b><div class="small muted">Replies rest on journal articles, reviews and scholarly books alone: no preprints, no encyclopaedias, no web pages. A journal listed in DOAJ is marked as peer review confirmed; others as journal articles whose review is not independently confirmed.</div></div></div>',
     "R115 peer-reviewed switch")

# ---- R119 (17 October 2026): the Inbox, Carpe Diem's 💭; its words on the Focus page, in the guide and on the button ----
edit('<h2 class="sec">Parked thoughts</h2></div>\n          <p class="small muted">Something popped into your head? Park it here and carry on. It waits until you are ready. The 💭 button at the side parks one from any page.</p>\n          <div class="fx-park-in"><input type="text" id="fxParkIn" placeholder="Park a thought, then press Enter" maxlength="500"></div>',
     '<h2 class="sec">💭 The Inbox</h2></div>\n          <p class="small muted">Something popped into your head? Catch it and carry on: Ctrl and the full stop anywhere, or the 💭 at the side. It waits here until you send it where it belongs.</p>\n          <div class="fx-park-in"><input type="text" id="fxParkIn" placeholder="Catch a thought, then press Enter" maxlength="2000"></div>',
     "R119 Focus card")
edit('<b>Park a thought.</b> 💭 at the side keeps a stray thought for later, from any page, so it does not pull you away from what you are doing.',
     '<b>Catch a thought.</b> Ctrl and the full stop, or the 💭 at the side, keeps a stray thought in the Inbox, from any page, so it does not pull you away from what you are doing. Sort it later: to a note, to Tabula, into steps, to the chat, to a reminder, or done.',
     "R119 guide tip")
edit('<div>The thought bubble parks a stray thought for later. It waits on the Focus page.</div>',
     '<div>The thought bubble catches a stray thought (Ctrl and the full stop do the same). It waits in the Inbox, on the Focus page.</div>',
     "R119 guide side tip")
edit('<button class="rail-btn" id="fabPark" title="Park a thought" aria-label="Park a thought">',
     '<button class="rail-btn" id="fabPark" title="Catch a thought" aria-label="Catch a thought">',
     "R119 side button")

for old, new, label in EDITS:
    n = out.count(old)
    if n != 1:
        sys.exit("edit %r: found %d times" % (label, n))
    out = out.replace(old, new)

# ---- R104: the icons are the layered seal standing still (drawn by icon/gen_icons.py) ----
PI = json.load(open(os.path.join(HERE, "..", "icon", "new", "out", "page_icons.json")))
_fav = re.compile(r'var I=\{"day": \[.*?\]\}\[dark\?"night":"day"\];', re.S)
if len(_fav.findall(out)) != 1:
    sys.exit("edit tab icons: not found once")
out = _fav.sub(lambda m: 'var I=' + json.dumps(PI["tab"]) + '[dark?"night":"day"];', out)

# ---- R107: the master seal's picture (the approved crest, by day, for documents printed on white) ----
_ms = json.load(open(os.path.join(HERE, "master_seal.json")))
_sd = re.compile(r'(<script type="application/json" id="ing-seals-data">)(.*?)(</script>)', re.S)
_m = _sd.search(out)
if not _m:
    sys.exit("seal data: not found")
_seals = json.loads(_m.group(2))
_seals["master"] = _ms["day"]
out = out[:_m.start(2)] + json.dumps(_seals) + out[_m.end(2):]

MARK = '<script>/* R95: every part has now wrapped'
assert out.count(MARK) == 1
# ---- R118 (17 October 2026): the full Tabula and Abacus, her own single-page apps (the same files Carpe Diem carries),
#      ride inside the page as base64 text and open in a frame on their pages ----
import base64 as _b64
_apps = ""
for _name in ("tabula", "abacus", "slides", "scriba", "fontes"):  # R123: Imago (slides), Scriba and Fontes too
    _html = open(os.path.join(HERE, "apps", _name + ".html"), encoding="utf-8").read()
    _apps += '<script type="text/plain" id="ing-app-' + _name + '">' + _b64.b64encode(_html.encode("utf-8")).decode("ascii") + '</script>\n'
# ---- R120 (17 October 2026): The Forge and Inkwell, carried inside the page (apps/builtin, from apps/update_builtin.py);
#      each is checked here against its own size and fingerprint before it rides along ----
import gzip as _gz, hashlib as _hl
_bi = json.load(open(os.path.join(HERE, "apps", "builtin", "builtin.json")))
for _k in [k for k in ("forge", "inkwell", "cd") if k in _bi]:  # R122: Carpe Diem rides along too
    _z = open(os.path.join(HERE, "apps", "builtin", _k + ".html.gz"), "rb").read()
    _raw = _gz.decompress(_z)
    if len(_raw) != _bi[_k]["size"] or _hl.sha256(_raw).hexdigest() != _bi[_k]["sha256"]:
        sys.exit("built-in " + _k + ": its size or fingerprint does not match builtin.json")
    _apps += '<script type="text/plain" id="ing-builtin-' + _k + '">' + _b64.b64encode(_z).decode("ascii") + '</script>\n'
out = out.replace(MARK, _apps + MARK, 1)
mods = sorted(glob.glob(os.path.join(HERE, "modules", "*.js")))
# ---- R121: the shared thought cloud (thoughts/thought_cloud.html, the same file the Forge and Carpe Diem carry) is
#      written in just before the Inbox module that uses it, and the shared support module (thoughts/support_core.html)
#      just before Ingenium's part of it (modules/r121.js) ----
def _modtext(m):
    t = open(m, encoding="utf-8").read().rstrip("\n")
    if os.path.basename(m) == "r119.js":
        t = open(os.path.join(HERE, "thoughts", "thought_cloud.html"), encoding="utf-8").read().rstrip("\n") + "\n" + t
    if os.path.basename(m) == "r121.js":  # R121: the shared support module, before Ingenium's own part of it
        t = open(os.path.join(HERE, "thoughts", "support_core.html"), encoding="utf-8").read().rstrip("\n") + "\n" + t
    return t
blob = "\n".join(_modtext(m) for m in mods) + "\n"
blob = blob.replace("/*R104_ICON*/null", json.dumps(PI["big"]))
if "/*R109_WIDTHS*/null" in blob:
    _w = json.load(open(os.path.join(HERE, "pdf_widths.json")))
    blob = blob.replace("/*R109_WIDTHS*/null", json.dumps({k: v[32:] for k, v in _w.items()}, separators=(",", ":")))
if "/*R108_FONTS*/null" in blob:
    blob = blob.replace("/*R108_FONTS*/null", open(os.path.join(HERE, "lx_fonts.json")).read())
if "/*R118_CDPREP*/" in blob:
    blob = blob.replace("/*R118_CDPREP*/", open(os.path.join(HERE, "apps", "cd_prep.js"), encoding="utf-8").read().strip())
if "/*R118_DARK*/null" in blob:
    blob = blob.replace("/*R118_DARK*/null", open(os.path.join(HERE, "apps", "dark.json")).read().strip())
if "/*R123_INJECT*/null" in blob:  # R123: Carpe Diem's dress for the apps' frames (apps/harvest_cd_dress.js)
    _inj = json.dumps(json.load(open(os.path.join(HERE, "apps", "cd_inject.json"), encoding="utf-8")), separators=(",", ":"))
    blob = blob.replace("/*R123_INJECT*/null", _inj.replace("</", "<\\/").replace("<!--", "<\\u0021--"))
if "/*R120_BUILTIN*/null" in blob:
    blob = blob.replace("/*R120_BUILTIN*/null", json.dumps(_bi))
if "/*R116_QUANTS*/null" in blob:
    blob = blob.replace("/*R116_QUANTS*/null", open(os.path.join(HERE, "lineup_quants.json")).read().strip())
if "/*R107_LAYERS*/null" in blob:
    blob = blob.replace("/*R107_LAYERS*/null", open(os.path.join(HERE, "lx_layers.json")).read())
if "/*R107_MASTER*/null" in blob:
    blob = blob.replace("/*R107_MASTER*/null", json.dumps({"night": "data:image/png;base64," + _ms["night"]["b64"]}))  # by day the page uses ING_SEALS.master
out = out.replace(MARK, blob + MARK)
dest = sys.argv[1] if len(sys.argv) > 1 else os.path.join(HERE, "ingenium.html")
open(dest, "w", encoding="utf-8").write(out)
print("built", dest, len(out), "bytes;", len(EDITS), "edits;", len(mods), "modules")
