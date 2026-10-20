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
def edit(old, new, label, times=1):
    EDITS.append((old, new, label, times))

# ---- R123: a window of its own (#ingapp=...) shows one app and never writes Ingenium's own desk, so it can never
#      put an older copy of the desk over the newer one the main window keeps ----
edit('function saveState(){try{\n  state.__deskAt=Date.now();',
     'function saveState(){if(/[#&]ingapp=/.test(location.hash||""))return;try{\n  state.__deskAt=Date.now();', "R123 lite window never saves")

# ---- R125: the chaptered tour opens again. The 3.12 page's short feature tour (seven cards) declared its own
#      tourStart(i) and tourEnd() at the top level, after the chaptered tour's, so it replaced them: the door's tour key,
#      Home's, and every chapter in the Chapters menu opened the seven cards instead of the chaptered tour, and the
#      chaptered tour's End called the short tour's. The short tour keeps its cards under names of its own. ----
edit('function tourStart(i){i=i||0;var s=TOUR[i];if(!s){tourEnd();return;}',
     'function featTourStart(i){i=i||0;var s=TOUR[i];if(!s){featTourEnd();return;}', "R125 short tour start")
edit('sk.onclick=tourEnd;', 'sk.onclick=featTourEnd;', "R125 short tour close")
edit('bk.onclick=function(){tourStart(i-1);};', 'bk.onclick=function(){featTourStart(i-1);};', "R125 short tour back")
edit('nx.onclick=function(){tourStart(i+1);};', 'nx.onclick=function(){featTourStart(i+1);};', "R125 short tour next")
edit('function tourEnd(){var ov=$("tourOv");', 'function featTourEnd(){var ov=$("tourOv");', "R125 short tour end")
edit('if(e.key==="Escape"&&$("tourOv"))tourEnd();', 'if(e.key==="Escape"&&$("tourOv"))featTourEnd();', "R125 short tour escape")

# ---- R125: the short tour's ring rule (a fixed box with a page-wide shade) is kept to its own overlay. The chaptered
#      tour marks the element it describes with the same class, tour-ring, so every element it rang was lifted out of
#      the page (position: fixed) and laid over its neighbours, with a shade round it: Lector's app tiles over the line
#      below them, a reply's thinking over the reply. ----
edit('.tour-ring{position:fixed;border-radius:14px;box-shadow:0 0 0 4px var(--accent),0 0 0 9999px rgba(20,12,36,.42);transition:all .25s ease}',
     '#tourOv .tour-ring{position:fixed;border-radius:14px;box-shadow:0 0 0 4px var(--accent),0 0 0 9999px rgba(20,12,36,.42);transition:all .25s ease}',
     "R125 short tour ring kept to its overlay")

# ---- R125: the tour's example conversation shows again. Opening the Chat page now chooses the conversation the page
#      remembers (ccEnter, in the Chat and Code pages), which came after the tour had chosen its example, so the cards
#      "A reply arrives" and "Reading its thinking" showed an empty page. The example is chosen once the page is open;
#      what the page remembers is left alone. ----
edit('  state.activeChat=c.id;go("chat");\n  if(done&&!c.messages.length){',
     '  go("chat");state.activeChat=c.id;\n  if(done&&!c.messages.length){', "R125 tour example chat")

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

# ---- R133 (18 October 2026): a conversation opened from elsewhere is the one the Chat page shows. Since R112 the Chat
#      page opens on the conversation it last showed (ccState().activeChat), so the pages that start a conversation of
#      their own tell it first, as R131 does: Decode a message and Draft a reply (their text had gone into whichever
#      conversation was open, under its title), a chat with one's own AI, and a blend carried on in the chat ----
edit('state.chats.push(c);state.activeChat=c.id;saveState();go("chat");try{renderChat();}catch(e){}\n  var ci=$("chatInput");',
     'state.chats.push(c);state.activeChat=c.id;try{ccState().activeChat=c.id;}catch(_){}saveState();go("chat");try{renderChat();}catch(e){}\n  var ci=$("chatInput");',
     "R133 Decode a message and Draft a reply open their own conversation")
edit('state.activeChat=c.id;aiChooseFor(ai,{quiet:true});go("chat");',
     'state.activeChat=c.id;try{ccState().activeChat=c.id;}catch(_){}aiChooseFor(ai,{quiet:true});go("chat");',
     "R133 a chat with one's own AI opens on it")
edit('state.activeChat=c.id;saveState();go("chat");try{renderChat();}catch(e){}}\n/* repaint only the card that changed',
     'state.activeChat=c.id;try{ccState().activeChat=c.id;}catch(_){}saveState();go("chat");try{renderChat();}catch(e){}}\n/* repaint only the card that changed',
     "R133 a blend carried on in the chat opens on it")

# ---- R132 (18 October 2026): room to grow. The owner's words: "I want for the local storage limits for all of my apps to
#      be expanded please." The desk said whether this view's small store (about 5 MB) took it, and modules/r132.js keeps
#      a desk that store refused in this device's larger store (IndexedDB); the store a page keeps, and the steps back
#      the code keeps, are allowed more room ----
edit('catch(e1){try{SNAPRING.forEach(function(k){localStorage.removeItem(k);});localStorage.setItem(KEY,raw);}catch(e2){ingStoreFull();}}}\n  else memStore[KEY]=raw;',
     'catch(e1){try{SNAPRING.forEach(function(k){localStorage.removeItem(k);});localStorage.setItem(KEY,raw);}catch(e2){lsOk=false;ingStoreFull();}}}\n  else memStore[KEY]=raw;\n'
     '  /* R132: a desk the small store refused (or a view with none) is kept in the larger store on this device */\n'
     '  try{if(window.__deskOverflow)window.__deskOverflow(raw,HAS_LS&&lsOk);}catch(e){}',
     "R132 the desk says whether the small store took it")
edit('  if(HAS_LS){try{localStorage.setItem(KEY,raw);ingNoteSnapshot(raw);}',
     '  var lsOk=true;\n  if(HAS_LS){try{localStorage.setItem(KEY,raw);ingNoteSnapshot(raw);}',
     "R132 the small store's answer")
edit('if(txt.length>16*1024*1024){if(!cur.said){cur.said=1;csPush("warn","Ingenium keeps up to 16 MB of what a page stores; this page has stored more, so its newest changes are kept only while it is open.");}return;}',
     'if(txt.length>256*1024*1024){if(!cur.said){cur.said=1;csPush("warn","Ingenium keeps up to 256 MB of what a page stores; this page has stored more, so its newest changes are kept only while it is open.");}return;}',
     "R132 a page's own store: 256 MB")
edit('/* the steps back that are kept: a large app keeps fewer (each step is a whole copy of the file), about 150 MB a file */',
     '/* the steps back that are kept: a large app keeps fewer (each step is a whole copy of the file), about 600 MB a file (R132; it was 150 MB) */',
     "R132 steps back: the note")
edit('keep=Math.max(5,Math.min(80,Math.floor(150*1024*1024/size)));',
     'keep=Math.max(5,Math.min(200,Math.floor(600*1024*1024/size)));',
     "R132 steps back: 600 MB a file, 200 steps")
edit('if(pr.versions.length>200)pr.versions.splice(0,pr.versions.length-200);',
     'if(pr.versions.length>500)pr.versions.splice(0,pr.versions.length-500);',
     "R132 steps back: 500 in a project")

# ---- R131 (18 October 2026): the trainer can open with a text already given (modules/r131.js hands it the history the
#      owner brought in from Claude) ----
edit('var w={name:"My first model",text:"",size:"tiny",passes:8,fromModel:modelId||null},step=watch?3:(modelId?2:0),poll=null,cores=4,done=null,prevActive=null;',
     'var w={name:"My first model",text:"",size:"tiny",passes:8,fromModel:modelId||null},step=watch?3:(modelId?2:0),poll=null,cores=4,done=null,prevActive=null;\n'
     '  if(window.__trainPreset){var _tp=window.__trainPreset;window.__trainPreset=null;if(_tp.text)w.text=String(_tp.text);if(_tp.name)w.name=String(_tp.name).slice(0,60);if(!watch&&w.text)step=1;}',
     "R131 the trainer opens with a text already given")

# ---- R134: the version shows without a date (the owner's words, 19 October 2026: "I want you to remove the dates from the
#      apps, keep only the build number please"): "Version 5.9", with its build number when the page was stamped by a
#      build, and no longer "page of 19 October 2026" when it was not. The date stays in ING_PAGE_DATE, unshown. ----
edit('function ingVersionLine(){var n=ingBuildNo();return "Version "+ING_VERSION+(n?" · build "+n:" · page of "+ING_PAGE_DATE);}',
     'function ingVersionLine(){var n=ingBuildNo();return "Version "+ING_VERSION+(n?" · build "+n:"");}', "R134 the version line names no date")

# ---- 6.1 (20 October 2026): no watermarks. The owner's words: "I don't want any watermarks on its documents or hidden in
#      its texts." Lector's notes and analysis no longer close with a line naming the model, Ingenium and the date; a Word file
#      no longer names Ingenium as its author or as the program that made it; a PDF no longer names Ingenium as its producer
#      and creator. The author of a Word file is the owner's name where Lector knows it, and otherwise left empty. ----
edit('var md="# "+title+"\\n\\n"+pieces.join("\\n\\n")+"\\n\\n---\\n*Drafted by "+lxModelName(run)+" in Ingenium\'s Lector on "+lxDate()+(opts.all?", from its readings of your apps":", from a full reading of "+run.name)+". The measures are exact; the rest is a draft: check every statement before you use it.*";',
     'var md="# "+title+"\\n\\n"+pieces.join("\\n\\n");', "6.1 no closing line on the analysis")
edit('<dc:creator>Ingenium</dc:creator>', '<dc:creator></dc:creator>', "6.1 a Word file names no author it was not given", 3)
edit('lxX(author||"Ingenium")', 'lxX(author||"")', "6.1 Lector's Word file: the owner as author, or none")
edit('<Application>Ingenium</Application>', '', "6.1 a Word file names no program", 3)
edit('<Application>Ingenium Lector</Application>', '', "6.1 Lector's Word file names no program")
edit('" /Producer (Ingenium) /Creator (Ingenium) >>"', '" >>"', "6.1 a PDF names no producer")

# ---- R151 (Ingenium 6.1, 20 October 2026): the loading page and the Refresh key. The owner's words: "I want a refresh button
#      added to Ingenium and the Forge, that refreshed the app if it glitches or freezes. I also want a loading page added to
#      the apps that informs the user that the page is still being painted instead of letting a user think that the app has
#      crashed or is lagging and glitching." The loading page (boot/splash.html) is the first thing in the body, so it is
#      painted before the rest is read; its seal is the page's large icon made small here. The key's own work (saving first,
#      asking when a reply is still being written, the keys F5 and Ctrl+R or Command+R) is in modules/r151.js; its press
#      reloads the page even when that module never ran. ----
import io as _io, base64 as _b64s
def _small_seal(uri, px=208):
    try:
        from PIL import Image as _Im
        _im = _Im.open(_io.BytesIO(_b64s.b64decode(uri.split(",", 1)[1]))).convert("RGBA").resize((px, px), _Im.LANCZOS)
        _bo = _io.BytesIO(); _im.save(_bo, "PNG", optimize=True)
        return "data:image/png;base64," + _b64s.b64encode(_bo.getvalue()).decode("ascii")
    except ImportError:  # no Pillow on this machine: the large icon itself, only heavier
        return uri
_PI0 = json.load(open(os.path.join(HERE, "..", "icon", "new", "out", "page_icons.json")))
_splash = open(os.path.join(HERE, "boot", "splash.html"), encoding="utf-8").read().strip("\n")
_splash = _splash.replace("ING_BOOT_SEAL_DAY", _small_seal(_PI0["big"]["day"])).replace("ING_BOOT_SEAL_NIGHT", _small_seal(_PI0["big"]["night"]))
edit('<body data-theme="day" data-motion="full">\n',
     '<body data-theme="day" data-motion="full">\n' + _splash + '\n', "R151 the loading page, first in the body")
edit('    <button class="cl-key" id="displayBtn" title="Display: theme, depth, navigation, frame, motion" aria-label="Display">',
     '    <button class="cl-key" id="refreshBtn" title="Refresh: start Ingenium again if it glitches or stops answering. Your work is saved first. (F5 or Ctrl+R; Command+R on a Mac)" aria-label="Refresh Ingenium" onclick="(window.ingRefresh||function(){location.reload();})()"><svg class="kico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M19.5 12a7.5 7.5 0 1 1-2.2-5.3"/><path d="M19.6 4.2v4.6H15"/></svg><span class="kl">Refresh</span></button>\n'
     '    <button class="cl-key" id="displayBtn" title="Display: theme, depth, navigation, frame, motion" aria-label="Display">',
     "R151 the Refresh key in the top bar")

for old, new, label, times in EDITS:
    n = out.count(old)
    if n != times:
        sys.exit("edit %r: found %d times, not %d" % (label, n, times))
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
    if _name == "tabula":  # R124: Tabula keeps every part of a document when it autosaves or moves (apps/tabula_patch.py)
        import importlib.util as _ilu
        _tp = _ilu.spec_from_file_location("tabula_patch", os.path.join(HERE, "apps", "tabula_patch.py"))
        _tpm = _ilu.module_from_spec(_tp); _tp.loader.exec_module(_tpm)
        _html = _tpm.patch(_html)
        # R127: and holds a thesis of 100,000 words, by Inkwell 7.44's recipe (apps/tabula_big_patch.py)
        _tb = _ilu.spec_from_file_location("tabula_big_patch", os.path.join(HERE, "apps", "tabula_big_patch.py"))
        _tbm = _ilu.module_from_spec(_tb); _tb.loader.exec_module(_tbm)
        _html = _tbm.patch(_html)
        # R128: its paragraphs run on across pages, and a note no longer lays out the whole thesis, by Inkwell 7.45's recipe
        # (apps/tabula_flow_patch.py)
        _tf = _ilu.spec_from_file_location("tabula_flow_patch", os.path.join(HERE, "apps", "tabula_flow_patch.py"))
        _tfm = _ilu.module_from_spec(_tf); _tf.loader.exec_module(_tfm)
        _html = _tfm.patch(_html)
        # R129: and keeps its raised pages and 3D notes key when it stands alone (apps/tabula_look_patch.py)
        _tl = _ilu.spec_from_file_location("tabula_look_patch", os.path.join(HERE, "apps", "tabula_look_patch.py"))
        _tlm = _ilu.module_from_spec(_tl); _tl.loader.exec_module(_tlm)
        _html = _tlm.patch(_html)
        # R130: its footnotes as Word sets them, at each page's foot, by Inkwell 7.48's recipe (apps/tabula_notes_patch.py)
        _tn = _ilu.spec_from_file_location("tabula_notes_patch", os.path.join(HERE, "apps", "tabula_notes_patch.py"))
        _tnm = _ilu.module_from_spec(_tn); _tn.loader.exec_module(_tnm)
        _html = _tnm.patch(_html)
        # R132: room to grow: autosave up to 256 MB in the larger store, the small store left to the desk (apps/tabula_room_patch.py)
        _tr = _ilu.spec_from_file_location("tabula_room_patch", os.path.join(HERE, "apps", "tabula_room_patch.py"))
        _trm = _ilu.module_from_spec(_tr); _tr.loader.exec_module(_trm)
        _html = _trm.patch(_html)
    _apps += '<script type="text/plain" id="ing-app-' + _name + '">' + _b64.b64encode(_html.encode("utf-8")).decode("ascii") + '</script>\n'
# ---- R120 (17 October 2026): The Forge and Inkwell, carried inside the page (apps/builtin, from apps/update_builtin.py);
#      each is checked here against its own size and fingerprint before it rides along ----
import gzip as _gz, hashlib as _hl
_bi = json.load(open(os.path.join(HERE, "apps", "builtin", "builtin.json")))
# R124: ING_LEAN=1 builds the lean copy that The Forge carries: the same page without the apps Ingenium carries (a page
# cannot hold a full copy of an app that holds a full copy of it back)
if os.environ.get("ING_LEAN") == "1":
    _bi = {}
for _k in [k for k in ("forge", "inkwell", "cd") if k in _bi]:  # R122: Carpe Diem rides along too
    _z = open(os.path.join(HERE, "apps", "builtin", _k + ".html.gz"), "rb").read()
    _raw = _gz.decompress(_z)
    if len(_raw) != _bi[_k]["size"] or _hl.sha256(_raw).hexdigest() != _bi[_k]["sha256"]:
        sys.exit("built-in " + _k + ": its size or fingerprint does not match builtin.json")
    _apps += '<script type="text/plain" id="ing-builtin-' + _k + '">' + _b64.b64encode(_z).decode("ascii") + '</script>\n'
# ---- R136 (Ingenium 6.0, 20 October 2026): the shells Fabrica fills to make an APK and an IPA on the device (source/shells).
#      The Android shell is compiled by shells/android/build_dex.sh; the iPhone and iPad shell by GitHub's Macs
#      (.github/workflows/build-shells.yml), checked here against the fingerprint that build wrote beside it ----
_shells = os.path.normpath(os.path.join(HERE, "..", "shells", "out"))
_ios_rec = os.path.join(_shells, "ios-shell.json")
for _sid, _sf in (("ing-android-shell", "android-shell.dex"), ("ing-ios-shell", "ios-shell.zip")):
    _sp = os.path.join(_shells, _sf)
    if not os.path.isfile(_sp):
        print("no " + _sf + ": this page will make no " + ("APK" if "android" in _sid else "IPA"))
        continue
    _sb = open(_sp, "rb").read()
    if _sf == "ios-shell.zip" and os.path.isfile(_ios_rec):
        _rec = json.load(open(_ios_rec))["device"]
        if len(_sb) != _rec["bytes"] or _hl.sha256(_sb).hexdigest() != _rec["sha256"]:
            sys.exit("ios-shell.zip: its size or fingerprint does not match ios-shell.json")
    _apps += '<script type="ingenium/b64" id="' + _sid + '">' + _b64.b64encode(_sb).decode("ascii") + '</script>\n'
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
if "/*R126_RECIPE*/null" in blob:  # R126: Lector's recipe (recipe/recipe.json, written by gen_recipe.py): her rules, the verified sources, her kinds of document
    _rx = json.dumps(json.load(open(os.path.join(HERE, "recipe", "recipe.json"), encoding="utf-8")), ensure_ascii=False, separators=(",", ":"))
    blob = blob.replace("/*R126_RECIPE*/null", _rx.replace("</", "<\\/").replace("<!--", "<\\u0021--"))
if "/*R120_BUILTIN*/null" in blob:
    blob = blob.replace("/*R120_BUILTIN*/null", json.dumps(_bi))
if "/*R116_QUANTS*/null" in blob:
    blob = blob.replace("/*R116_QUANTS*/null", open(os.path.join(HERE, "lineup_quants.json")).read().strip())
if "/*R107_LAYERS*/null" in blob:
    blob = blob.replace("/*R107_LAYERS*/null", open(os.path.join(HERE, "lx_layers.json")).read())
if "/*R107_MASTER*/null" in blob:
    blob = blob.replace("/*R107_MASTER*/null", json.dumps({"night": "data:image/png;base64," + _ms["night"]["b64"]}))  # by day the page uses ING_SEALS.master
out = out.replace(MARK, blob + MARK)
# ---- R151: where each of the page's scripts begins, in thousandths of the page, for the loading page's bar. The page is
#      walked as the browser reads it: a script ends at the first "</script" after it opens, so text inside a script that
#      only looks like a tag is not counted ----
def _script_map(text):
    marks, pos, low = [], 0, text.lower()
    while True:
        i = low.find("<script", pos)
        if i < 0:
            break
        marks.append(i)
        j = low.find("</script", i + 7)
        if j < 0:
            break
        pos = j + 8
    return [min(999, int(m * 1000 / len(text))) for m in marks]
_bm = "/*ING_BOOT_MAP*/[]"
if out.count(_bm) != 1:
    sys.exit("the loading page's map: its place was not found once")
out = out.replace(_bm, "/*ING_BOOT_MAP*/" + json.dumps(_script_map(out), separators=(",", ":")))
dest =sys.argv[1] if len(sys.argv) > 1 else os.path.join(HERE, "ingenium.html")
open(dest, "w", encoding="utf-8").write(out)
print("built", dest, len(out), "bytes;", len(EDITS), "edits;", len(mods), "modules")
