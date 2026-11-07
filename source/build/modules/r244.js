<style id="r244-css">
/* ============ R244 · WHO ANSWERS, AT HAND: EVERY CONNECTION ONE PRESS AWAY, A SERVICE CONNECTED IN THREE STEPS (Ingenium 6.46, 7 November 2026) ============
   Her words (6 November 2026): "Switching between providers and connections in Ingenium is really tedious and the whole setting is hidden
   and not very visible or accessible to new users. I want that process to be improved and be more acessible to me, its a bit flawed right now."
   Measured on 6.45 before this part:
   - connecting a service took Settings, then Models and AI, then Connections, then a form of five fields (the provider, an address,
     the key, a model's name typed or listed, and a switch); going back to this device took Controls;
   - beside the message box, with nothing set up, the model menu said only "No models yet. Add them on the Models page.": nothing told
     a newcomer that Claude, OpenAI's models, Gemini, Kimi or Ollama could answer;
   - the top bar's model key named the model on this device even while a connection answered, and opened the Models page;
   - the key beside the message box showed the device model's colour beside a connection's model, and did not say whose model it was;
   - Controls' A connection, with nothing set up, said to go to Settings and come back;
   - the key field was drawn without the page's look: the page styled text fields only, not key (password), email or address fields.
   Now:
   - Connect a service, in three steps (choose the service, paste the key or the address, pick a model from the list the service
     gives), from the model menu, the top bar, Controls, Settings and an empty chat; plain words when a key is refused or a service
     does not answer, and where to get a key;
   - the model menu opens on who answers: this device and each connection kept, one press each, then the models; Find a model searches
     every model of every connection; Connect a service at its foot;
   - the top bar's key names who answers and opens Who answers, to switch from any page without leaving it;
   - the key beside the message box names the service beside the model; with nothing to answer it says Choose who answers;
   - Settings' Connections card opens on Connect a service and the connections kept; the form by hand folds away under them;
   - key, email and address fields have the page's look everywhere.
   Which models exist is still each service's to say: Ingenium shows the names each one gives, and invents none. Keys stay on this device
   and go only to their own service, as before (r191). */
:where(input[type=password],input[type=email],input[type=url]){font-family:inherit;font-size:13.5px;color:var(--ink-1);background:var(--input-bg);
  border:1px solid var(--hairline);border-radius:9px;padding:8px 10px;width:100%;box-sizing:border-box;box-shadow:inset 0 1px 2px rgba(40,20,70,.05)}
:where(input[type=password],input[type=email],input[type=url]):focus{outline:none;border-color:rgba(var(--accent-line-rgb),.65);box-shadow:0 0 0 3px rgba(var(--accent-line-rgb),.16)}

/* the model menu: who answers, first */
#chatModelMenu .wa-head{position:sticky;top:-6px;z-index:2;margin:-6px -6px 4px;padding:9px 9px 7px;background:var(--card-hi);border-bottom:.5px solid var(--hairline);border-radius:13px 13px 0 0}
.wa-cap{font:800 10.5px/1 var(--sans);letter-spacing:.07em;text-transform:uppercase;color:var(--ink-3);margin:0 2px 6px}
.wa-chips{display:flex;flex-wrap:wrap;gap:5px}
.wa-chip{display:inline-flex;align-items:center;gap:6px;max-width:100%;padding:4px 10px 4px 8px;border-radius:999px;border:1px solid var(--hairline);
  background:var(--card-lo,transparent);font:600 12px/1.25 var(--sans);color:var(--ink-1);cursor:pointer;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.wa-chip:hover{border-color:rgba(var(--accent-line-rgb),.55);color:var(--accent-deep,var(--accent))}
.wa-chip .wa-dot{width:8px;height:8px;border-radius:50%;flex:0 0 auto;background:var(--accent)}
.wa-chip.dev .wa-dot{background:var(--ok,#2f7a55)}
.wa-chip[aria-pressed="true"]{background:var(--accent-softer);border-color:rgba(var(--accent-line-rgb),.7);color:var(--accent-deep,var(--accent))}
.wa-chip[aria-pressed="true"]::after{content:"✓";font-weight:800;margin-left:1px}
.wa-chip.add{border-style:dashed;color:var(--accent)}
.wa-find{display:block;width:100%;box-sizing:border-box;margin-top:7px;font-size:12.5px !important;min-height:30px;padding:5px 9px !important}
.wa-results .wa-none{font-size:12px;color:var(--ink-3);padding:8px 10px}
.wa-empty{padding:8px 10px 6px;font-size:12px;line-height:1.45;color:var(--ink-2)}
.wa-empty b{display:block;color:var(--ink-1);font-size:12.5px;margin-bottom:3px}
.wa-empty .wa-two{display:flex;gap:6px;flex-wrap:wrap;margin-top:7px}
.chat-menu .menu-btn.wa-add{color:var(--accent);font-weight:700}

/* the key beside the message box */
#chatModelBtn .wa-where{font:700 9.5px/1 var(--sans);letter-spacing:.04em;text-transform:uppercase;padding:3px 6px;border-radius:999px;
  background:var(--accent-softer);color:var(--accent-deep,var(--accent));white-space:nowrap}
#chatModelBtn.wa-attn{border-color:rgba(var(--accent-line-rgb),.75);box-shadow:0 0 0 3px rgba(var(--accent-line-rgb),.14)}
#chatModelBtn.wa-attn .nm{color:var(--accent-deep,var(--accent));font-weight:700}

/* Who answers, under the top bar's key */
.wa-pop{position:fixed;z-index:400;min-width:250px;max-width:min(360px,calc(100vw - 16px));max-height:min(460px,70vh);overflow:auto;padding:6px;
  background:var(--card-hi);border:1px solid var(--glass-border,var(--hairline));border-radius:13px;box-shadow:0 12px 32px rgba(40,20,70,.18)}
.wa-pop[hidden]{display:none}
.wa-pop-h{font:800 10.5px/1 var(--sans);letter-spacing:.07em;text-transform:uppercase;color:var(--ink-3);padding:7px 10px 5px}
.wa-row{display:flex;align-items:center;gap:9px;width:100%;text-align:left;padding:7px 10px;margin-top:2px;border:1px solid transparent;border-radius:9px;
  background:transparent;cursor:pointer;color:var(--ink-1);font:600 12.5px/1.3 var(--sans)}
.wa-row:hover,.wa-row:focus-visible{background:var(--accent-softer);border-color:var(--hairline);outline:none}
.wa-row .wa-dot{width:9px;height:9px;border-radius:50%;flex:0 0 auto;background:var(--accent)}
.wa-row.dev .wa-dot{background:var(--ok,#2f7a55)}
.wa-row .wa-txt{display:flex;flex-direction:column;min-width:0;flex:1 1 auto}
.wa-row .wa-sub{font-weight:500;font-size:11px;color:var(--ink-3);overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.wa-row .wa-on{font-size:10.5px;font-weight:700;color:var(--ok,#2f7a55);white-space:nowrap}
.wa-row.key{color:var(--accent);font-weight:700}
.wa-sep{border-top:.5px solid var(--hairline);margin:6px 2px}

/* Connect a service */
.wa-sheet h3{margin:0 0 4px}
.wa-steps{display:flex;gap:6px;list-style:none;margin:6px 0 12px;padding:0;flex-wrap:wrap}
.wa-steps li{font-size:11.5px;font-weight:600;color:var(--ink-3);padding:3px 9px;border-radius:999px;border:1px solid var(--hairline)}
.wa-steps li.on{color:var(--accent-deep,var(--accent));border-color:rgba(var(--accent-line-rgb),.7);background:var(--accent-softer)}
.wa-steps li.done{color:var(--ok,#2f7a55)}
.wa-lede{font-size:12.5px;color:var(--ink-2);margin:0 0 10px;line-height:1.5}
.wa-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:7px}
@media (max-width:520px){.wa-grid{grid-template-columns:1fr}}
.wa-svc{display:flex;gap:9px;align-items:flex-start;text-align:left;padding:9px 10px;border-radius:11px;border:1px solid var(--hairline);background:var(--card-lo,transparent);cursor:pointer;color:var(--ink-1)}
.wa-svc:hover,.wa-svc:focus-visible{border-color:rgba(var(--accent-line-rgb),.65);background:var(--accent-softer);outline:none}
.wa-mono{width:30px;height:30px;border-radius:9px;flex:0 0 auto;display:grid;place-items:center;font:800 14px/1 var(--sans);color:#fff;background:var(--accent)}
.wa-svc.priv .wa-mono{background:var(--ok,#2f7a55)}
.wa-svc b{display:block;font-size:13px}
.wa-svc .wa-by{font-size:11px;color:var(--ink-3)}
.wa-svc .wa-says{display:block;font-size:11.5px;color:var(--ink-2);margin-top:2px;line-height:1.35}
.wa-tag{display:inline-block;margin-top:4px;font-size:10px;font-weight:700;letter-spacing:.03em;text-transform:uppercase;padding:2px 6px;border-radius:999px;background:var(--accent-softer);color:var(--accent-deep,var(--accent))}
.wa-svc.priv .wa-tag{background:rgba(47,122,85,.12);color:var(--ok,#2f7a55)}
.wa-kept{font-size:12px;color:var(--ink-3);margin:10px 0 0}
.wa-f{display:block;margin:0 0 10px}
.wa-f>span{display:block;font-size:12px;font-weight:600;color:var(--ink-2);margin-bottom:4px}
.wa-keyrow{display:flex;gap:6px;align-items:center}
.wa-keyrow input{flex:1 1 auto;min-width:0}
.wa-note{font-size:12px;color:var(--ink-3);margin:0 0 8px;line-height:1.45}
.wa-note.ok{color:var(--ok,#2f7a55)}
.wa-note.warn{color:var(--warn,#a35a00)}
.wa-err{font-size:12.5px;line-height:1.45;color:var(--danger,#b3261e);background:rgba(179,38,30,.07);border:1px solid rgba(179,38,30,.25);border-radius:9px;padding:8px 10px;margin:4px 0 10px}
.wa-foot{display:flex;gap:8px;justify-content:flex-end;align-items:center;margin-top:12px;flex-wrap:wrap}
.wa-foot .wa-grow{flex:1 1 auto}
.wa-models{max-height:min(300px,45vh);overflow:auto;border:1px solid var(--hairline);border-radius:10px;padding:4px}
.wa-model{display:flex;align-items:center;gap:8px;width:100%;text-align:left;padding:7px 9px;border-radius:8px;border:1px solid transparent;background:transparent;cursor:pointer;color:var(--ink-1);font:600 12.5px/1.3 var(--sans)}
.wa-model:hover{background:var(--accent-softer)}
.wa-model[aria-checked="true"]{background:var(--accent-softer);border-color:rgba(var(--accent-line-rgb),.6)}
.wa-model .wa-sug{margin-left:auto;font-size:10.5px;font-weight:700;color:var(--ok,#2f7a55)}

/* Settings: Connect a service first */
.wa-hero{display:flex;flex-wrap:wrap;gap:10px;align-items:center;justify-content:space-between;margin:4px 0 12px;padding:12px 14px;border-radius:12px;
  background:var(--accent-softer);border:1px solid rgba(var(--accent-line-rgb),.35)}
.wa-hero p{margin:0;flex:1 1 260px;font-size:12.5px;line-height:1.5;color:var(--ink-2)}
details.wa-hand{margin-top:12px;border-top:.5px solid var(--hairline);padding-top:10px}
details.wa-hand>summary{cursor:pointer;font-size:12.5px;font-weight:700;color:var(--ink-2);margin-bottom:8px}
/* an empty chat: who answers */
.wa-hello{margin:16px auto 0;max-width:460px;padding:12px 14px;border-radius:12px;border:1px dashed rgba(var(--accent-line-rgb),.55);text-align:center;font-size:12.5px;color:var(--ink-2);line-height:1.5}
.wa-hello .wa-two{display:flex;gap:8px;justify-content:center;flex-wrap:wrap;margin-top:8px}
</style>
<script>try{(window.__ingParts=window.__ingParts||{})["p244"]="started";}catch(_){}
(function(){"use strict";
if(window.IngWho)return;
var W=window,D=document;
function $(id){return D.getElementById(id);}
function mk(tag,cls,txt){var e=D.createElement(tag);if(cls)e.className=cls;if(txt!=null)e.textContent=txt;return e;}
function btn(cls,txt,fn,title){var b=mk("button",cls,txt);b.type="button";if(title)b.title=title;b.addEventListener("click",function(e){e.stopPropagation();fn(e);});return b;}
function C(){return W.IngConnections||null;}
function kept(){try{return C()?C().kept().filter(function(k){return k&&k.provider;}):[];}catch(e){return [];}}
function nice(id){try{return C()?C().nice(id):String(id||"");}catch(e){return String(id||"");}}
function label(k){try{return C()?C().label(k):String(k.provider||"");}catch(e){return String(k.provider||"");}}
function idOf(p,b){return String(p||"")+"|"+String(b||"").replace(/\/+$/,"").toLowerCase();}
function curId(){var c=state.cloud||{};return c.provider?idOf(c.provider,c.base):"";}
function onCloud(){try{return chatSource()==="cloud"&&!!(state.cloud&&state.cloud.on&&state.cloud.provider);}catch(e){return false;}}
function localModel(){try{return state.models.filter(function(x){return x.id===state.activeModelId;})[0]||null;}catch(e){return null;}}
function host(b){try{return new URL(b).host;}catch(e){return "";}}
function toast(t){try{ingToast(t);}catch(e){}}
function web(){try{return typeof netMode==="function"&&netMode()==="web";}catch(e){return false;}}
var SHORT={"anthropic":"Claude","openai":"OpenAI","gemini":"Gemini","moonshot":"Kimi","openrouter":"OpenRouter","ollama-local":"Ollama","ollama-cloud":"Ollama Cloud","lmstudio":"LM Studio","ingenium":"Your other computer"};
function short(k){var p=k&&k.provider;if(p==="ollama-lan")return "Ollama · "+(host(k.base)||"another computer");if(p==="openai-compat")return host(k.base)||"Another service";return SHORT[p]||String(p||"");}

/* ---------- the services, as Settings has always listed them ---------- */
var SVC=[
  {p:"anthropic",n:"Claude",by:"Anthropic",says:"Fable, Opus, Sonnet and Haiku",key:1,get:"https://console.anthropic.com/settings/keys",site:"console.anthropic.com",mono:"C"},
  {p:"openai",n:"OpenAI",by:"OpenAI",says:"ChatGPT's models",key:1,get:"https://platform.openai.com/api-keys",site:"platform.openai.com",mono:"O"},
  {p:"gemini",n:"Gemini",by:"Google",says:"Google's Gemini models",key:1,get:"https://aistudio.google.com/apikey",site:"aistudio.google.com",mono:"G"},
  {p:"moonshot",n:"Kimi",by:"Moonshot AI",says:"Kimi's models",key:1,get:"https://platform.moonshot.ai/console/api-keys",site:"platform.moonshot.ai",mono:"K"},
  {p:"openrouter",n:"OpenRouter",by:"OpenRouter",says:"Many makers with one key: Kimi, DeepSeek, Qwen, Llama and more",key:1,get:"https://openrouter.ai/keys",site:"openrouter.ai",mono:"R"},
  {p:"ollama-local",n:"Ollama",by:"on this computer",says:"Free models that run on this computer",priv:1,local:1,get:"https://ollama.com/download",site:"ollama.com",mono:"o"},
  {p:"ollama-lan",n:"Ollama",by:"on another computer",says:"A stronger computer on this Wi-Fi answers",priv:1,addr:1,mono:"o",ph:"http://192.168.1.20:11434"},
  {p:"ollama-cloud",n:"Ollama Cloud",by:"Ollama",says:"Large open models on Ollama's servers",key:1,get:"https://ollama.com/settings/keys",site:"ollama.com",mono:"o"},
  {p:"lmstudio",n:"LM Studio",by:"on this computer",says:"The models LM Studio runs on this computer",priv:1,local:1,get:"https://lmstudio.ai",site:"lmstudio.ai",mono:"L"},
  {p:"ingenium",n:"Ingenium",by:"on your other computer",says:"Your other computer lends you its models",priv:1,special:1,mono:"✦"},
  {p:"openai-compat",n:"Another service",by:"of OpenAI's form",says:"Any service with an address of OpenAI's form",addr:1,key:1,keyOpt:1,mono:"…",ph:"https://…/v1"}];
function svcOf(p){return SVC.filter(function(s){return s.p===p;})[0]||null;}
/* a service named in a sentence: Claude (Anthropic), OpenAI, Ollama on another computer */
function full(s){return s.by===s.n?s.n:(/^(on|of) /.test(s.by)?s.n+" "+s.by:s.n+" ("+s.by+")");}
function base0(p){try{return typeof cloudDefaultBase==="function"?cloudDefaultBase(p):"";}catch(e){return "";}}

/* ---------- the models a service lists (the same requests as Settings' List key) ---------- */
function listModels(p,base,key){base=String(base||base0(p)).replace(/\/+$/,"");var url,h={"content-type":"application/json"},parse;
  if(/^ollama/.test(p)){url=base+"/api/tags";if(key)h.Authorization="Bearer "+key;parse=function(d){return (d.models||[]).map(function(x){return x.name||x.model;});};}
  else if(p==="anthropic"){url=base+"/v1/models?limit=100";h["x-api-key"]=key;h["anthropic-version"]="2023-06-01";h["anthropic-dangerous-direct-browser-access"]="true";parse=function(d){return (d.data||[]).map(function(x){return x.id;});};}
  else{url=base+"/models";if(key)h.Authorization="Bearer "+key;parse=function(d){return (d.data||d.models||[]).map(function(x){return x.id||x.name;});};}
  if(typeof cxFetch!=="function")return Promise.reject(new Error("no request route"));
  return cxFetch(url,{headers:h}).then(function(r){if(!r.ok)return r.text().then(function(t){var e=new Error("HTTP "+r.status+" "+String(t||"").slice(0,240));e.status=r.status;throw e;});return r.json();})
    .then(function(d){return parse(d||{}).filter(Boolean).map(String);});}
/* OpenAI and Google list models that do not chat (speech, pictures, embeddings): left out when chat models remain */
function chatOnly(p,names){var f=names;
  if(p==="openai")f=names.filter(function(n){return /^(gpt|o\d|chatgpt)/i.test(n)&&!/(audio|realtime|transcribe|tts|image|search|embedding|moderation|instruct)/i.test(n);});
  else if(p==="gemini")f=names.filter(function(n){return /gemini|gemma/i.test(n)&&!/(embedding|image|tts|aqa|vision)/i.test(n);});
  return f.length?f:names;}
/* the model suggested first: the strongest the service lists, by its own names */
function best(p,names){var P={anthropic:[/^claude-opus-5-5/,/^claude-opus/,/^claude-sonnet/],openai:[/^gpt-5(\.\d+)?$/,/^gpt-5/,/^gpt-4\.1$/,/^gpt-4o$/],
    gemini:[/gemini-[\d.]+-pro$/,/gemini.*pro/,/gemini.*flash/],moonshot:[/kimi-k\d/i,/kimi/i]}[p]||[];
  for(var i=0;i<P.length;i++)for(var j=0;j<names.length;j++)if(P[i].test(String(names[j]).replace(/^models\//,"")))return names[j];
  return names[0]||"";}
function why(s,e){var m=String(e&&e.message||e||""),st=+(e&&e.status)||+((/HTTP (\d{3})/.exec(m)||[])[1])||0;
  if(st===401||st===403)return s.p==="ingenium"?"Your other computer refused the code.":s.n+" refused the key. Check that it was copied whole, with nothing before or after it, and that it is still active on "+(s.site||"the service's website")+".";
  if(st===404)return "Nothing answered at that address in the way Ingenium expects. Check the address"+(s.p==="openai-compat"?" (it usually ends in /v1).":".");
  if(st===429)return s.n+" says the key has reached its limit for the moment. Wait a minute and connect again.";
  if(st>=500)return s.n+" is not answering properly at the moment ("+st+"). Try again in a minute.";
  if(s.local||s.p==="ollama-lan"){var t=s.n+" does not answer at "+(s.p==="ollama-lan"?"that address":base0(s.p))+".";
    t+=s.p==="ollama-lan"?" Check that the other computer is on, that Ollama is open there and lets your network in (OLLAMA_HOST=0.0.0.0), and that both are on the same Wi-Fi.":" Is it open? Start "+s.n+", then connect again.";
    if(web()&&/^ollama/.test(s.p))t+=" In a browser, Ollama must also allow this page: start it with OLLAMA_ORIGINS set to allow it. The installed apps need nothing.";
    return t;}
  if(web())return "The browser could not reach "+s.n+". Many services refuse pages from elsewhere in a browser; the installed apps reach them. ("+m.replace(/^HTTP /,"").slice(0,120)+")";
  return "It could not connect: "+m.replace(/^HTTP /,"").slice(0,160)+".";}

/* ---------- switching ---------- */
function repaint(){try{paintChatTop();}catch(e){}try{paintSrc();}catch(e){}try{if(C())C().paint();}catch(e){}try{if(typeof lkSyncCx==="function")lkSyncCx();}catch(e){}paintPill();hello();}
function menuOpen(){var m=$("chatModelMenu");return !!(m&&!m.hidden);}
function refreshMenu(){if(menuOpen()){try{paintModelMenu();}catch(e){}}}
function useDevice(quiet){state.chatSource="local";try{var cc=curChat();if(cc)cc.cx={source:"local"};}catch(e){}try{saveState();}catch(e){}repaint();refreshMenu();
  if(!quiet){var lm=localModel();toast(lm?("Answers come from this device now: "+lm.customName+"."):"Answers come from this device now. Choose its model in the menu beside the message box, or on the Models page.");}}
function useConn(k,model){if(!k||!C())return;C().use(k,model||k.model);repaint();refreshMenu();}
/* a connection made in the sheet: kept (r191 keeps it as saveState runs), then used as any kept one */
function apply(s,base,key,names,model){var c=state.cloud=state.cloud||{},nb=String(base||base0(s.p)).replace(/\/+$/,"");
  if(idOf(c.provider,c.base)!==idOf(s.p,nb)){state.cloudPrev=Object.assign({},c);delete c.info;delete c.window;}
  c.provider=s.p;c.base=nb;c.key=key||"";c.models=names.slice(0,200);c.model=model;c.on=true;state.chatSource="cloud";
  try{saveState();}catch(e){}
  var k=kept().filter(function(x){return x.id===idOf(s.p,nb);})[0];
  if(k&&C())C().use(k,model,true);else{try{var cc=curChat();if(cc)cc.cx={id:idOf(s.p,nb),model:model,source:"cloud"};saveState();}catch(e){}}
  repaint();toast(nice(model)+" answers now, through "+(k?label(k):full(s))+".");}

/* ---------- Connect a service ---------- */
var SH=null;
function openConnect(p){var s=p?svcOf(p):null;SH={step:s?2:1,svc:s,base:s?base0(s.p):"",key:"",names:[],model:"",err:"",busy:false,find:""};if(s)prefill();paint();try{openModal();}catch(e){}
  setTimeout(function(){var f=D.querySelector(".wa-sheet .wa-svc, .wa-sheet input");if(f)try{f.focus();}catch(_){}},60);}
/* a service connected before keeps its key and address: connecting again needs nothing typed */
function prefill(){var s=SH.svc,k=kept().filter(function(x){return x.provider===s.p;})[0];if(k){SH.key=k.key||"";if(k.base)SH.base=k.base;}}
function paint(){var box=$("modalBox");if(!box||!SH)return;box.classList.remove("pomo-card");box.innerHTML="";var w=mk("div","wa-sheet");box.appendChild(w);
  w.appendChild(mk("h3",null,"Connect a service"));
  var st=mk("ol","wa-steps");["Choose a service",SH.svc&&!SH.svc.key&&!SH.svc.addr?"Find it":(SH.svc&&SH.svc.addr&&!SH.svc.key?"Its address":"Your key"),"Pick a model"].forEach(function(t,i){st.appendChild(mk("li",SH.step===i+1?"on":(SH.step>i+1?"done":""),t));});w.appendChild(st);
  if(SH.step===1)stepChoose(w);else if(SH.step===2)stepKey(w);else stepPick(w);}
function stepChoose(w){w.appendChild(mk("p","wa-lede","Who should answer your messages? A service online, with your own key, or a program on this computer or another one at home. Your key stays on this device and goes only to the service you choose."));
  var g=mk("div","wa-grid");
  SVC.forEach(function(s){var t=btn("wa-svc"+(s.priv?" priv":""),"",function(){choose(s);});t.setAttribute("data-p",s.p);
    var mo=mk("span","wa-mono",s.mono);mo.setAttribute("aria-hidden","true");t.appendChild(mo);
    var tx=mk("span");var b=mk("b",null,s.n);tx.appendChild(b);tx.appendChild(mk("span","wa-by",s.by));tx.appendChild(mk("span","wa-says",s.says));
    tx.appendChild(mk("span","wa-tag",s.priv?"Private":"Online"));t.appendChild(tx);g.appendChild(t);});
  w.appendChild(g);
  var L=kept();if(L.length)w.appendChild(mk("p","wa-kept","Already connected: "+L.map(short).join(", ")+". Switch between them from the model key beside the message box, or the top bar."));
  var f=mk("div","wa-foot");f.appendChild(btn("btn ghost","Close",function(){closeModal();}));w.appendChild(f);}
function choose(s){if(s.special){closeModal();openDevices();return;}
  SH.svc=s;SH.base=base0(s.p);SH.key="";SH.err="";prefill();SH.step=2;paint();
  if(s.local&&!s.key)connect();   /* a program on this computer: looked for at once */
  setTimeout(function(){var f=D.querySelector(".wa-sheet input");if(f)try{f.focus();}catch(_){}},40);}
function stepKey(w){var s=SH.svc;
  var hd=mk("p","wa-lede");hd.appendChild(mk("b",null,full(s)+". "));hd.appendChild(D.createTextNode(typeof CX_WHERE!=="undefined"&&CX_WHERE[s.p]?CX_WHERE[s.p]:""));w.appendChild(hd);
  if(s.addr){var fa=mk("label","wa-f");fa.appendChild(mk("span",null,s.p==="ollama-lan"?"The other computer's address":"The service's address"));
    var ia=mk("input");ia.type="text";ia.id="waAddr";ia.placeholder=s.ph||"";ia.value=SH.base||"";ia.autocomplete="off";ia.spellcheck=false;ia.oninput=function(){SH.base=ia.value.trim();};
    ia.onkeydown=function(e){if(e.key==="Enter"){e.preventDefault();connect();}};fa.appendChild(ia);w.appendChild(fa);
    if(s.p==="ollama-lan")w.appendChild(mk("p","wa-note","On that computer, let your network in once: quit Ollama, then start it with OLLAMA_HOST=0.0.0.0 (on Windows, set OLLAMA_HOST to 0.0.0.0 first). Its address is that computer's address on your Wi-Fi with :11434 after it."));}
  if(s.key){var fk=mk("label","wa-f");fk.appendChild(mk("span",null,s.keyOpt?"Its key, if it asks for one":"Your API key"));var row=mk("div","wa-keyrow");
    var ik=mk("input");ik.type="password";ik.id="waKey";ik.placeholder=s.keyOpt?"optional":"paste it here";ik.value=SH.key||"";ik.autocomplete="off";ik.spellcheck=false;
    ik.oninput=function(){SH.key=ik.value.trim();};ik.onkeydown=function(e){if(e.key==="Enter"){e.preventDefault();connect();}};row.appendChild(ik);
    var sh=btn("btn small ghost","Show",function(){ik.type=ik.type==="password"?"text":"password";sh.textContent=ik.type==="password"?"Show":"Hide";});sh.setAttribute("aria-controls","waKey");row.appendChild(sh);
    fk.appendChild(row);w.appendChild(fk);
    if(s.get){var n=mk("p","wa-note");n.appendChild(D.createTextNode("No key yet? Make one at "));var a=mk("a",null,s.site);a.href=s.get;a.target="_blank";a.rel="noopener noreferrer";n.appendChild(a);
      n.appendChild(D.createTextNode(", then paste it here. It stays on this device and goes only to "+s.by+"."));w.appendChild(n);}}
  if(s.local&&!s.key){var nl=mk("p","wa-note","Ingenium looks for "+s.n+" at "+base0(s.p)+". ");if(s.get){var al=mk("a",null,"Get "+s.n);al.href=s.get;al.target="_blank";al.rel="noopener noreferrer";nl.appendChild(al);nl.appendChild(D.createTextNode(" if it is not on this computer yet."));}w.appendChild(nl);}
  if(SH.busy)w.appendChild(mk("p","wa-note","Connecting…"));
  if(SH.err){var er=mk("div","wa-err",SH.err);er.setAttribute("role","alert");w.appendChild(er);}
  var f=mk("div","wa-foot");f.appendChild(btn("btn ghost","Back",function(){SH.step=1;SH.err="";paint();}));f.appendChild(mk("span","wa-grow"));
  var go=btn("btn primary",SH.busy?"Connecting…":(SH.err&&s.local&&!s.key?"Look again":"Connect"),function(){connect();});go.disabled=!!SH.busy;go.id="waGo";f.appendChild(go);w.appendChild(f);}
function connect(){var s=SH&&SH.svc;if(!s||SH.busy)return;var base=String(SH.base||base0(s.p)).trim(),key=String(SH.key||"").trim();
  if(s.addr&&!base){SH.err="Write the address first.";paint();return;}
  if(s.addr&&!/^https?:\/\//i.test(base)){base="http://"+base;SH.base=base;}
  if(s.key&&!s.keyOpt&&!key){SH.err="Paste your key first.";paint();return;}
  SH.busy=true;SH.err="";paint();var me=SH;
  listModels(s.p,base,key).then(function(names){if(SH!==me)return;SH.busy=false;names=chatOnly(s.p,names);
      if(!names.length){SH.err=/^ollama/.test(s.p)?"Ollama answered, but has no models yet. On that computer, fetch one first (for example: ollama pull llama3.2), then connect again.":s.n+" answered, but listed no models for this key.";paint();return;}
      SH.names=names;SH.model=best(s.p,names);SH.base=base;SH.key=key;SH.step=3;SH.find="";paint();},
    function(e){if(SH!==me)return;SH.busy=false;SH.err=why(s,e);paint();});}
function stepPick(w){var s=SH.svc,names=SH.names;
  w.appendChild(mk("p","wa-note ok","Connected to "+full(s)+": "+names.length+" model"+(names.length===1?"":"s")+". Choose the one that answers; the others stay a press away in the menu beside the message box."));
  if(names.length>12){var fi=mk("input","wa-find");fi.type="search";fi.placeholder="Find a model";fi.value=SH.find||"";fi.setAttribute("aria-label","Find a model");
    fi.oninput=function(){SH.find=fi.value;fillList();};w.appendChild(fi);}
  var list=mk("div","wa-models");list.setAttribute("role","radiogroup");list.setAttribute("aria-label","Models");w.appendChild(list);
  var sug=best(s.p,names);
  function fillList(){list.innerHTML="";var q=String(SH.find||"").trim().toLowerCase();
    var order=[sug].concat(names.filter(function(n){return n!==sug;}));
    order.filter(function(n){return !q||n.toLowerCase().indexOf(q)>=0||nice(n).toLowerCase().indexOf(q)>=0;}).slice(0,400).forEach(function(n){
      var b=btn("wa-model","",function(){SH.model=n;[].forEach.call(list.querySelectorAll(".wa-model"),function(x){x.setAttribute("aria-checked",x.getAttribute("data-m")===n?"true":"false");});var u=$("waUse");if(u)u.textContent="Use "+nice(n);});
      b.setAttribute("role","radio");b.setAttribute("data-m",n);b.setAttribute("aria-checked",n===SH.model?"true":"false");b.title=n;
      b.appendChild(mk("span",null,nice(n)));if(n===sug)b.appendChild(mk("span","wa-sug","suggested"));list.appendChild(b);});
    if(!list.children.length)list.appendChild(mk("div","wa-note","No model's name holds those letters."));}
  fillList();
  var f=mk("div","wa-foot");f.appendChild(btn("btn ghost","Back",function(){SH.step=2;paint();}));f.appendChild(mk("span","wa-grow"));
  var u=btn("btn primary","Use "+nice(SH.model),function(){var m=SH.model||sug;apply(s,SH.base,SH.key,names,m);SH=null;closeModal();});u.id="waUse";f.appendChild(u);w.appendChild(f);}

/* ---------- elsewhere in the app ---------- */
function openSettingsConn(){try{go("settings");}catch(e){}setTimeout(function(){try{if(W.IngRooms)IngRooms.open("settings","ai",true);}catch(e){}try{if(W.IngSettingsParts)IngSettingsParts.show("ai","conn",true);}catch(e){}
  var c=$("waHero")||$("cxProvider");if(c)try{c.scrollIntoView({block:"start",behavior:"smooth"});}catch(e){}},80);}
function openDevices(){try{go("settings");}catch(e){}setTimeout(function(){try{if(W.IngRooms)IngRooms.open("settings","ai",true);}catch(e){}try{if(W.IngSettingsParts)IngSettingsParts.show("ai","devices",true);}catch(e){}
  var c=$("linkCard");if(c)try{c.scrollIntoView({block:"start",behavior:"smooth"});}catch(e){}},80);}

/* ---------- the model menu: who answers, first ---------- */
function chip(name,title,on,dev,fn){var b=btn("wa-chip"+(dev?" dev":""),"",fn,title);b.setAttribute("aria-pressed",on?"true":"false");b.appendChild(mk("span","wa-dot"));b.appendChild(mk("span",null,name));return b;}
function footStart(m){var ms=[].slice.call(m.children),i=-1;for(var j=ms.length-1;j>=0;j--){if(/^Manage models/.test((ms[j].textContent||"").trim())){i=j;break;}}if(i<0)return null;
  while(i>0&&(/^Settings for /.test((ms[i-1].textContent||"").trim())||ms[i-1].classList.contains("ctx-sep")))i--;return ms[i];}
function emptyBlock(){var e=mk("div","wa-empty");e.appendChild(mk("b",null,"Nothing answers yet."));
  e.appendChild(D.createTextNode("Get a model for this device (free, and private), or connect a service you have a key for, such as Claude, OpenAI, Gemini, Kimi or Ollama."));
  var two=mk("div","wa-two");two.appendChild(btn("btn small primary","Connect a service",function(){closeChatMenus();openConnect();}));two.appendChild(btn("btn small ghost","Get a model",function(){closeChatMenus();go("models");}));e.appendChild(two);return e;}
function augment(){var m=$("chatModelMenu");if(!m||m.querySelector(".wa-head"))return;
  var L=kept(),cur=curId(),cloud=onCloud(),lm=localModel();
  /* the connection's own section of the menu (when r191 has none to put in its place): its models answer through it */
  [].forEach.call(m.querySelectorAll(".chat-menu-head"),function(h){if(/^Connection: /.test(h.textContent)){var n=h.nextSibling;while(n&&!(n.classList&&n.classList.contains("ctx-sep"))){if(n.classList&&n.classList.contains("menu-btn"))n.setAttribute("data-wa-cloud","1");n=n.nextSibling;}}});
  var body=mk("div","wa-body");while(m.firstChild)body.appendChild(m.firstChild);
  var head=mk("div","wa-head");head.appendChild(mk("div","wa-cap","Who answers"));
  var chips=mk("div","wa-chips");chips.setAttribute("role","group");chips.setAttribute("aria-label","Who answers");
  chips.appendChild(chip("This device",lm?("Answers with "+lm.customName+", on this device"):"A model on this device",!cloud&&!!lm,true,function(){useDevice();}));
  L.forEach(function(k){chips.appendChild(chip(short(k),"Answers with "+nice(k.model)+", through "+label(k),cloud&&k.id===cur,false,function(){useConn(k);}));});
  if(cloud&&!L.some(function(k){return k.id===cur;}))chips.appendChild(chip(short(state.cloud),"Answers with "+nice(state.cloud.model),true,false,function(){}));
  var add=btn("wa-chip add","＋ Connect",function(){closeChatMenus();openConnect();},"Connect Claude, OpenAI, Gemini, Kimi, OpenRouter or Ollama");chips.appendChild(add);
  head.appendChild(chips);
  var nModels=body.querySelectorAll(".menu-btn").length+L.reduce(function(a,k){return a+Math.max(0,(k.models||[]).length-14);},0);
  var res=mk("div","wa-results");res.hidden=true;
  if(nModels>12){var fi=mk("input","wa-find");fi.type="search";fi.placeholder="Find a model";fi.setAttribute("aria-label","Find a model");
    fi.addEventListener("click",function(e){e.stopPropagation();});fi.addEventListener("keydown",function(e){if(e.key==="Escape"){e.stopPropagation();if(fi.value){fi.value="";find(body,res,"");}else closeChatMenus();}});
    fi.addEventListener("input",function(){find(body,res,fi.value);});head.appendChild(fi);}
  m.appendChild(head);m.appendChild(body);m.appendChild(res);
  /* the place answering comes first: with this device answering, the connections come after its models */
  if(!cloud){var bx=body.querySelector("[data-r191]");if(bx){var fs=footStart(body);if(fs)body.insertBefore(bx,fs);else body.appendChild(bx);}}
  [].forEach.call(body.querySelectorAll(".ctx-note"),function(nt){if(/^No models yet/.test(nt.textContent||""))nt.parentNode.replaceChild(emptyBlock(),nt);});
  if(!L.length&&!cloud&&!lm&&!body.querySelector(".wa-empty"))body.insertBefore(emptyBlock(),body.firstChild);
  if(!body.querySelector(".wa-empty"))body.appendChild(btn("menu-btn wa-add","＋ Connect a service",function(){closeChatMenus();openConnect();}));
  if(L.length)body.appendChild(btn("menu-btn","Connections in Settings",function(){closeChatMenus();openSettingsConn();}));
  /* a model on this device chosen here answers from this device */
  if(!m.__wa){m.__wa=1;m.addEventListener("click",function(e){var b=e.target&&e.target.closest&&e.target.closest(".menu-btn");if(!b||!m.contains(b))return;
      if(b.closest("[data-r191]")||b.closest(".wa-head")||b.closest(".wa-results")||b.hasAttribute("data-wa-cloud")||b.classList.contains("wa-add")||b.classList.contains("menu-key"))return;
      if(/^(Settings for |Manage models|Connections in Settings)/.test((b.textContent||"").trim()))return;
      if(state.chatSource!=="local"){state.chatSource="local";try{var cc=curChat();if(cc)cc.cx={source:"local"};}catch(_){}try{saveState();}catch(_){}setTimeout(repaint,0);}},true);}}
/* Find a model: every model of every connection kept (not only the first fourteen the menu shows) and of this device */
function find(body,res,q){q=String(q||"").trim().toLowerCase();res.innerHTML="";if(!q){res.hidden=true;body.hidden=false;return;}
  body.hidden=true;res.hidden=false;var n=0,cur=curId(),cloud=onCloud();
  kept().forEach(function(k){var hits=(k.models||[]).filter(function(x){return x.toLowerCase().indexOf(q)>=0||nice(x).toLowerCase().indexOf(q)>=0;});if(!hits.length)return;
    res.appendChild(mk("div","chat-menu-head",label(k)));hits.slice(0,60).forEach(function(x){n++;var b=btn("menu-btn","",function(){closeChatMenus();useConn(k,x);});b.title=x;
      var r=mk("div");r.style.cssText="display:flex;align-items:center;gap:8px";var d=mk("span");d.style.cssText="width:9px;height:9px;border-radius:50%;flex:0 0 auto;background:var(--accent)";r.appendChild(d);
      r.appendChild(mk("span",null,nice(x)));if(cloud&&k.id===cur&&x===state.cloud.model){var on=mk("span","ctx-hint","answering now");on.style.cssText="margin-left:auto;color:var(--ok)";r.appendChild(on);}b.appendChild(r);res.appendChild(b);});});
  var loc=(state.models||[]).filter(function(x){var t=String(x.customName||"").toLowerCase();return t.indexOf(q)>=0;});
  if(loc.length){res.appendChild(mk("div","chat-menu-head","On this device"));loc.slice(0,40).forEach(function(x){n++;var b=btn("menu-btn","",function(){closeChatMenus();try{setActive(x.id,{fromUser:true});}catch(e){}useDevice(true);try{paintChatTop();}catch(e){}});
      var r=mk("div");r.style.cssText="display:flex;align-items:center;gap:8px";var d=mk("span");d.style.cssText="width:9px;height:9px;border-radius:50%;flex:0 0 auto;background:"+(x.color||"var(--ok)");r.appendChild(d);r.appendChild(mk("span",null,x.customName));b.appendChild(r);res.appendChild(b);});}
  if(!n)res.appendChild(mk("div","wa-none","No model's name holds those letters."));}

/* ---------- the key beside the message box ---------- */
function paintKey(){var b=$("chatModelBtn"),nm=$("chatModelName"),sw=$("chatModelSw");if(!b||!nm)return;
  var cloud=onCloud(),lm=localModel(),wh=b.querySelector(".wa-where");
  if(!wh){wh=mk("span","wa-where");var chev=b.querySelector(".chev");b.insertBefore(wh,chev||null);}
  /* 6.52: each part is written only when it changes (this is painted every 1.5 s, and each write wakes the page's watchers) */
  if(cloud){var c=state.cloud,k=kept().filter(function(x){return x.id===curId();})[0]||c;tx(wh,short(k));hid(wh,false);if(sw&&sw.style.background!=="var(--accent)")sw.style.background="var(--accent)";b.classList.toggle("wa-attn",false);
    sa(b,"title","Answering through "+label(k)+": "+nice(c.model)+". Press to choose another model, another service or this device.");}
  else{hid(wh,true);
    if(!lm){tx(nm,"Choose who answers");b.classList.toggle("wa-attn",true);sa(b,"title","Nothing answers yet. Press to choose a model for this device, or to connect a service such as Claude, OpenAI, Gemini or Ollama.");}
    else{b.classList.toggle("wa-attn",false);if(!/Press to choose who answers/.test(b.title||""))b.title=(b.title?b.title+" ":"")+"Press to choose who answers: a model on this device or a service you connected.";}}}
function sa(e,k,v){if(e&&e.getAttribute(k)!==v)e.setAttribute(k,v);}
function hid(e,h){if(e&&e.hidden!==h)e.hidden=h;}
function tx(e,t){if(e&&e.textContent!==t)e.textContent=t;}

/* ---------- the top bar's key: who answers, from any page ---------- */
function paintPill(){var p=$("activeModelPill"),nm=$("activeModelName");if(!p||!nm)return;var sw=p.querySelector(".swatch");
  if(onCloud()){var t=nice(state.cloud.model||state.cloud.provider);tx(nm,t);if(sw){if(sw.style.background!=="var(--accent)")sw.style.background="var(--accent)";sw.classList.toggle("ing-running",false);}
    var k=kept().filter(function(x){return x.id===curId();})[0]||state.cloud;sa(p,"title","Answering: "+t+", through "+label(k)+". Press to choose who answers.");}
  else{var lm=localModel();sa(p,"title","Answering: "+(lm?lm.customName+", on this device":"nothing yet")+". Press to choose who answers.");}
  sa(p,"aria-haspopup","true");sa(p,"aria-expanded",POP&&!POP.hidden?"true":"false");}
var POP=null;
function row(name,sub,dev,on,fn){var b=btn("wa-row"+(dev?" dev":""),"",fn);b.setAttribute("role","menuitemradio");b.setAttribute("aria-checked",on?"true":"false");
  b.appendChild(mk("span","wa-dot"));var t=mk("span","wa-txt");t.appendChild(mk("span",null,name));t.appendChild(mk("span","wa-sub",sub));b.appendChild(t);if(on)b.appendChild(mk("span","wa-on","answering"));return b;}
function openPop(){var p=$("activeModelPill");if(!p)return;
  if(!POP){POP=mk("div","wa-pop");POP.id="waPop";POP.setAttribute("role","menu");POP.setAttribute("aria-label","Who answers");POP.hidden=true;D.body.appendChild(POP);
    D.addEventListener("click",function(e){if(!POP||POP.hidden)return;var t=e.target;if(t&&t.closest&&(t.closest("#waPop")||t.closest("#activeModelPill")))return;closePop();},true);
    D.addEventListener("keydown",function(e){if(!POP||POP.hidden)return;if(e.key==="Escape"){closePop();try{$("activeModelPill").focus();}catch(_){}}
      if(e.key==="ArrowDown"||e.key==="ArrowUp"){var it=[].slice.call(POP.querySelectorAll("button")),i=it.indexOf(D.activeElement);e.preventDefault();var j=i<0?0:(i+(e.key==="ArrowDown"?1:-1)+it.length)%it.length;if(it[j])it[j].focus();}});
    W.addEventListener("resize",function(){if(POP&&!POP.hidden)place();});}
  POP.innerHTML="";POP.appendChild(mk("div","wa-pop-h","Who answers"));
  var cloud=onCloud(),cur=curId(),lm=localModel();
  POP.appendChild(row("This device",lm?lm.customName:"No model chosen yet",true,!cloud,function(){closePop();useDevice();}));
  kept().forEach(function(k){POP.appendChild(row(label(k),nice(k.model),false,cloud&&k.id===cur,function(){closePop();useConn(k);}));});
  POP.appendChild(mk("div","wa-sep"));
  POP.appendChild(btn("wa-row","Choose another model…",function(){closePop();try{go("chat");}catch(e){}setTimeout(function(){var b=$("chatModelBtn");if(b&&!menuOpen())b.click();},150);}));
  POP.appendChild(btn("wa-row key","＋ Connect a service",function(){closePop();openConnect();}));
  POP.appendChild(btn("wa-row","Models on this device",function(){closePop();try{go("models");}catch(e){}}));
  /* 6.52: How it answers (Effort, Longest reply, Context), kept for each model and service (modules/r249.js) */
  try{if(W.IngGen&&typeof W.IngGen.section==="function")W.IngGen.section(POP);}catch(e){}
  POP.hidden=false;place();paintPill();var f=POP.querySelector("button");if(f)try{f.focus({preventScroll:true});}catch(e){}}
function place(){var p=$("activeModelPill");if(!p||!POP)return;var r=p.getBoundingClientRect(),w=POP.offsetWidth||280;
  POP.style.top=Math.round(r.bottom+6)+"px";POP.style.left=Math.round(Math.max(8,Math.min(W.innerWidth-w-8,r.right-w)))+"px";}
function closePop(){if(POP){POP.hidden=true;paintPill();}}
function togglePop(){if(POP&&!POP.hidden)closePop();else openPop();}

/* ---------- Settings: Connect a service first ---------- */
function settingsCard(){var P=$("cxProvider");if(!P)return;var card=P.closest(".card");if(!card||card.__wa)return;card.__wa=1;
  var h2=card.querySelector("h2"),lead=h2&&h2.nextElementSibling;
  var hero=mk("div","wa-hero");hero.id="waHero";
  hero.appendChild(mk("p",null,"Connect Claude, OpenAI's models, Gemini, Kimi, OpenRouter or Ollama in three steps: choose the service, paste your key, pick a model. Then move between them and this device with one press, from the key beside the message box or the top bar."));
  hero.appendChild(btn("btn primary","＋ Connect a service",function(){openConnect();}));
  if(lead&&lead.parentNode===card&&lead.tagName==="P")card.insertBefore(hero,lead.nextSibling);else card.insertBefore(hero,h2?h2.nextSibling:card.firstChild);
  var kb=$("cxKept");if(kb)card.insertBefore(kb,hero.nextSibling);
  var fb=card.querySelector(":scope > .tip-fold-btn");
  if(fb&&h2){var ht=String(h2.textContent||"").trim();[].forEach.call(fb.querySelectorAll("*"),function(x){if(x.children.length===0&&String(x.textContent||"").trim()===ht)x.textContent="How a connection behaves";});
    [].forEach.call(fb.childNodes,function(x){if(x.nodeType===3&&String(x.textContent||"").trim()===ht)x.textContent="How a connection behaves";});}
  var parts=[fb,card.querySelector(":scope > .tip-fold-body"),card.querySelector(":scope > .tip"),card.querySelector(".cx-grid"),$("cxModelList"),$("cxList")&&$("cxList").parentNode,$("cxOn")&&$("cxOn").closest("div")]
    .filter(function(x,i,a){return x&&x.parentNode===card&&a.indexOf(x)===i;});
  if(!parts.length)return;
  parts.sort(function(a,b){return (a.compareDocumentPosition(b)&4)?-1:1;});
  var det=mk("details","wa-hand");det.id="waHand";det.appendChild(mk("summary",null,"Set up a connection by hand"));
  card.insertBefore(det,parts[0]);parts.forEach(function(x){det.appendChild(x);});
  var c=state.cloud||{};det.open=!!(c.provider&&!kept().some(function(k){return k.id===curId();}));}
/* r191 makes the list of connections kept at the card's end the first time: it is kept under Connect a service */
function keepKeptUp(){var kb=$("cxKept"),hero=$("waHero");if(kb&&hero&&kb.previousSibling!==hero)hero.parentNode.insertBefore(kb,hero.nextSibling);}

/* ---------- an empty chat: who answers ---------- */
function hello(){try{var sc=$("chatScroll");if(!sc)return;var h=sc.querySelector(".cc-hello");if(!h)return;var old=h.querySelector(".wa-hello");
  if(onCloud()||localModel()||(D.body.getAttribute("data-chatmode")==="code"&&typeof ccProj==="function"&&!ccProj())){if(old)old.remove();return;}if(old)return;
  var w=mk("div","wa-hello");w.appendChild(mk("div",null,"Nothing answers yet: choose a model for this device, or connect a service such as Claude, OpenAI, Gemini or Ollama."));
  var two=mk("div","wa-two");two.appendChild(btn("btn small primary","Connect a service",function(){openConnect();}));two.appendChild(btn("btn small ghost","Get a model",function(){go("models");}));w.appendChild(two);h.appendChild(w);}catch(e){}}

/* ---------- hooks ---------- */
function wrapFn(name,after,flag){var f=W[name];if(typeof f!=="function"||f[flag])return;var g=function(){var r=f.apply(this,arguments);try{after.apply(this,arguments);}catch(e){}return r;};
  try{Object.keys(f).forEach(function(k){if(!(k in g))g[k]=f[k];});}catch(e){}g[flag]=1;W[name]=g;}
function hook(){
  wrapFn("paintModelMenu",augment,"__r244");
  wrapFn("paintChatTop",function(){paintKey();paintPill();},"__r244");
  wrapFn("renderChat",hello,"__r244");
  wrapFn("paintSrc",function(){var n=$("srcNote");if(n&&/^No connection is set up/.test(n.textContent||"")){n.innerHTML="";n.appendChild(D.createTextNode("No service is connected yet. "));
      var a=mk("span",null,"Connect a service");a.setAttribute("role","button");a.tabIndex=0;a.style.cssText="color:var(--accent);cursor:pointer;font-weight:700";a.onclick=function(){openConnect();};
      a.onkeydown=function(e){if(e.key==="Enter"||e.key===" "){e.preventDefault();openConnect();}};n.appendChild(a);}},"__r244");
  /* Controls' A connection: the last connection kept, or Connect a service when there is none */
  var sc=$("srcCloud");if(sc&&!sc.__r244){sc.__r244=1;var o=sc.onclick;sc.onclick=function(e){var c=state.cloud||{};if(!(c.on&&c.provider)){var L=kept();if(L.length){useConn(L[0]);return;}openConnect();return;}return o?o.apply(this,arguments):undefined;};}
  var p=$("activeModelPill");if(p&&!p.__r244){p.__r244=1;p.onclick=function(e){e.preventDefault();togglePop();};p.onkeydown=function(e){if(e.key==="Enter"||e.key===" "){e.preventDefault();togglePop();}};}
  settingsCard();keepKeptUp();paintKey();paintPill();}
if(D.readyState==="loading")D.addEventListener("DOMContentLoaded",hook);else hook();
W.addEventListener("load",function(){hook();setTimeout(hook,1600);});
/* the base page and other parts write the top bar's key: it names who answers again (only when it changed) */
setInterval(function(){try{paintPill();keepKeptUp();var b=$("chatModelBtn");if(b&&b.offsetParent)paintKey();}catch(e){}},1500);
W.IngWho={open:openConnect,useDevice:useDevice,useConn:useConn,list:listModels,best:best,chatOnly:chatOnly,services:function(){return SVC.map(function(s){return s.p;});},pop:openPop};
})();
;try{window.__ingParts["p244"]="running";}catch(_){}
</script>
