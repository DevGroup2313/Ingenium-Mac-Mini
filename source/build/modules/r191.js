<style id="r191-css">
/* ============ R191 · EVERY CONNECTION AT HAND, AND EACH CONVERSATION KEEPS ITS MODEL (Ingenium 6.8.11) ============
   The owner's words (28 October 2026): "I want to be able to run any of Claude's models like Sonnet, Haiku, Opus and Fable
   as well as Ollama's models and Kimi K3 on Ingenium's own chat rooms."
   Ingenium kept one connection at a time: to go from Claude to Kimi, or to Ollama, she typed the other service's address
   and key again in Settings. Now every connection she sets up is remembered on this device (as the one connection was,
   key and all, never sent anywhere but to its own service), and the model menu beside the message box lists the models of
   all of them, by service: Claude's (Fable, Opus, Sonnet, Haiku, as Anthropic lists them for her key), Kimi's (Moonshot or
   OpenRouter list theirs), Ollama's on this computer, another one or its cloud, and the others. Choosing one switches to its
   service at once. Each conversation keeps the model that last answered it: going back to it brings that model back, and
   says so. Settings lists the connections kept, each with Use and Forget. Which models exist is the service's to say:
   Ingenium shows the names each one gives, and invents none. */
#cxKept{margin-top:14px;padding-top:12px;border-top:.5px solid var(--hairline)}
#cxKept h3{margin:0 0 6px;font-size:13px;font-weight:700;color:var(--ink-1)}
#cxKept .cxk-row{display:flex;flex-wrap:wrap;align-items:center;gap:8px;padding:6px 0;border-bottom:.5px solid var(--hairline)}
#cxKept .cxk-row:last-child{border-bottom:0}
#cxKept .cxk-name{font-weight:600;color:var(--ink-1)}
#cxKept .cxk-sub{flex:1 1 200px;font-size:12px;color:var(--ink-3)}
#cxKept .cxk-on{font-size:11.5px;font-weight:600;color:var(--ok,#2f7a55)}
.cxm-more{font-size:12px;color:var(--ink-3);padding:4px 12px 6px}
</style>
<script>try{(window.__ingParts=window.__ingParts||{})["p191"]="started";}catch(_){}
(function(){"use strict";
if(window.IngConnections)return;
var NAME={"ingenium":"Ingenium on your other computer","ollama-local":"Ollama on this computer","ollama-lan":"Ollama on another computer","ollama-cloud":"Ollama Cloud",
  "lmstudio":"LM Studio on this computer","anthropic":"Claude (Anthropic)","openai":"OpenAI","moonshot":"Kimi (Moonshot AI)","openrouter":"OpenRouter","gemini":"Gemini (Google)","openai-compat":"Another service"};
var MAX=12,SHOW=14;
function kept(){if(!Array.isArray(state.cxKept))state.cxKept=[];return state.cxKept;}
function idOf(c){return String(c.provider||"")+"|"+String((c.base||"")).replace(/\/+$/,"").toLowerCase();}
function host(b){try{return new URL(b).host;}catch(e){return "";}}
function label(k){var n=NAME[k.provider]||k.provider;if((k.provider==="openai-compat"||k.provider==="ollama-lan")&&host(k.base))n+=" · "+host(k.base);return n;}
/* Claude's model names as Anthropic writes them: claude-opus-5-5 is Claude Opus 5.5 */
function nice(id){var m=/^claude-(fable|mythos|opus|sonnet|haiku)-(\d+)(?:-(\d{1,2}))?(?:-\d{8})?$/.exec(String(id||""));
  if(!m)return String(id||"");return "Claude "+m[1].charAt(0).toUpperCase()+m[1].slice(1)+" "+m[2]+(m[3]?"."+m[3]:"");}
/* a connection is kept once it is whole: a service, and a model or a list of them */
function remember(){try{var c=state.cloud;if(!c||!c.provider||c.provider==="ingenium")return;var models=(c.models&&c.models.length)?c.models.slice(0,200):(c.model?[c.model]:[]);if(!models.length)return;
  var L=kept(),id=idOf(c),k=L.filter(function(x){return x.id===id;})[0];
  if(!k){k={id:id};L.unshift(k);if(L.length>MAX)L.length=MAX;}
  if(k.provider===c.provider&&k.base===(c.base||"")&&k.key===(c.key||"")&&k.model===c.model&&JSON.stringify(k.models)===JSON.stringify(models))return;
  k.provider=c.provider;k.base=c.base||"";k.key=c.key||"";k.model=c.model||models[0];k.models=models;k.at=Date.now();}catch(e){}}
function current(){var c=state.cloud;return c&&c.provider?idOf(c):"";}
/* switch to a kept connection and one of its models */
function use(k,model,quiet){var c=state.cloud=state.cloud||{};
  var same=current()===k.id;
  if(!same){state.cloudPrev=Object.assign({},c);c.provider=k.provider;c.base=k.base;c.key=k.key;c.models=(k.models||[]).slice();delete c.info;}
  c.model=model||k.model||(k.models||[])[0]||"";c.on=true;state.chatSource="cloud";k.model=c.model;
  var cc=curChat();if(cc)cc.cx={id:k.id,model:c.model,source:"cloud"};
  saveState();try{paintChatTop();}catch(e){}try{paintSrc();}catch(e){}try{if(typeof paintCx==="function")paintCx();}catch(e){}paintKept();
  var st=$("cxState");if(st)st.textContent="Connected · "+c.model;
  if(!quiet){try{ingToast(nice(c.model)+" answers now, through "+label(k)+".");}catch(e){}}}
/* the model menu: every kept connection, by service; the one in use first */
function augment(){var m=$("chatModelMenu");if(!m||m.querySelector("[data-r191]"))return;var L=kept();if(!L.length)return;
  /* the menu's own section for the connection in use is replaced by this one, which holds it too */
  var heads=[].slice.call(m.querySelectorAll(".chat-menu-head"));heads.forEach(function(h){if(/^Connection: /.test(h.textContent)){var n=h;while(n){var nx=n.nextSibling;var sep=n.classList&&n.classList.contains("ctx-sep");n.remove();if(sep)break;n=nx;}}});
  var cur=current(),onCloud=state.chatSource==="cloud"&&state.cloud&&state.cloud.on;
  var order=L.slice().sort(function(a,b){return (b.id===cur)-(a.id===cur);});
  var box=document.createElement("div");box.setAttribute("data-r191","1");
  order.forEach(function(k){var head=el("div","chat-menu-head",label(k)+(k.id===cur&&onCloud?" · in use":""));box.appendChild(head);
    var ms=(k.models||[]).slice(),pick=k.id===cur?(state.cloud.model||""):"";
    /* the one answering first, then the rest as the service lists them */
    if(pick&&ms.indexOf(pick)>0){ms.splice(ms.indexOf(pick),1);ms.unshift(pick);}
    ms.slice(0,SHOW).forEach(function(nm){var b=el("button","menu-btn");b.type="button";b.title=nm;
      var r=el("div");r.style.cssText="display:flex;align-items:center;gap:8px";var d=el("span");d.style.cssText="width:9px;height:9px;border-radius:50%;flex:0 0 auto;background:var(--accent)";r.appendChild(d);
      var t=el("span",null,nice(nm));t.style.cssText="overflow:hidden;text-overflow:ellipsis;white-space:nowrap";r.appendChild(t);
      if(onCloud&&k.id===cur&&nm===pick){var on=el("span","ctx-hint","answering now");on.style.cssText="margin-left:auto;color:var(--ok)";r.appendChild(on);}
      b.appendChild(r);b.onclick=function(){try{closeChatMenus();}catch(e){}use(k,nm);};box.appendChild(b);});
    if(ms.length>SHOW)box.appendChild(el("div","cxm-more","and "+(ms.length-SHOW)+" more: Settings, Connect, lists them all"));});
  box.appendChild(el("div","ctx-sep"));
  m.insertBefore(box,m.firstChild);}
/* each conversation keeps the model that last answered it */
var lastChat=null;
function restore(){try{var c=curChat();if(!c||c.id===lastChat)return;lastChat=c.id;var x=c.cx;if(!x)return;
  if(x.source==="local"){if(state.chatSource!=="local"){state.chatSource="local";saveState();try{paintChatTop();}catch(e){}try{paintSrc();}catch(e){}}return;}
  var k=kept().filter(function(y){return y.id===x.id;})[0];if(!k)return;
  if(current()===k.id&&state.cloud.model===x.model&&state.chatSource==="cloud")return;
  use(k,x.model,true);try{ingToast("This conversation goes on with "+nice(x.model)+", as before.");}catch(e){}}catch(e){}}
function noteSend(){try{var c=curChat();if(!c)return;if(state.chatSource==="cloud"&&state.cloud&&state.cloud.on&&state.cloud.provider)c.cx={id:current(),model:state.cloud.model||"",source:"cloud"};
  else c.cx={source:"local"};}catch(e){}}
/* Settings: the connections kept, each with Use and Forget */
function paintKept(){try{var cxOn=$("cxOn");if(!cxOn)return;var card=cxOn.closest(".card");if(!card)return;var box=$("cxKept");
  var L=kept();if(!box){box=document.createElement("div");box.id="cxKept";card.appendChild(box);}
  box.innerHTML="";box.hidden=!L.length;if(!L.length)return;
  box.appendChild(el("h3",null,"Connections kept on this device"));
  box.appendChild(el("p","small muted","Each one you set up is kept here, so you can move between them from the model menu beside the message box. Its key stays on this device and goes only to its own service."));
  var cur=current();
  L.forEach(function(k){var r=el("div","cxk-row");r.appendChild(el("span","cxk-name",label(k)));
    r.appendChild(el("span","cxk-sub",(k.models||[]).length+" model"+((k.models||[]).length===1?"":"s")+" · last chosen: "+nice(k.model)));
    if(k.id===cur)r.appendChild(el("span","cxk-on","in use"));
    var u=el("button","btn small ghost","Use");u.type="button";u.onclick=function(){use(k,k.model);};r.appendChild(u);
    var f=el("button","btn small ghost","Forget");f.type="button";f.title="Remove this connection and its key from this device";
    f.onclick=function(){var L2=kept(),i=L2.indexOf(k);if(i>=0)L2.splice(i,1);saveState();paintKept();try{ingToast(label(k)+" is forgotten on this device.");}catch(e){}};r.appendChild(f);
    box.appendChild(r);});}catch(e){}}
function hook(){
  if(typeof window.saveState==="function"&&!window.saveState.__r191){var os=window.saveState;window.saveState=function(){remember();return os.apply(this,arguments);};window.saveState.__r191=1;}
  if(typeof window.paintModelMenu==="function"&&!window.paintModelMenu.__r191){var op=window.paintModelMenu;window.paintModelMenu=function(){var r=op.apply(this,arguments);augment();return r;};window.paintModelMenu.__r191=1;}
  if(typeof window.renderChat==="function"&&!window.renderChat.__r191){var orc=window.renderChat;window.renderChat=function(){restore();return orc.apply(this,arguments);};window.renderChat.__r191=1;}
  if(typeof window.sendRec==="function"&&!window.sendRec.__r191){var osr=window.sendRec;window.sendRec=function(){noteSend();return osr.apply(this,arguments);};window.sendRec.__r191=1;}
  /* the key beside the send arrow names Claude's models as the menu does */
  if(typeof window.paintChatTop==="function"&&!window.paintChatTop.__r191){var opt=window.paintChatTop;window.paintChatTop=function(){var r=opt.apply(this,arguments);
    try{var nm=$("chatModelName"),c=state.cloud;if(nm&&c&&c.model&&nm.textContent===c.model){nm.textContent=nice(c.model);var k=$("chatModelBtn");if(k)k.setAttribute("data-model-id",c.model);}}catch(e){}return r;};window.paintChatTop.__r191=1;}
  if(typeof window.paintCx==="function"&&!window.paintCx.__r191){var opc=window.paintCx;window.paintCx=function(){var r=opc.apply(this,arguments);paintKept();return r;};window.paintCx.__r191=1;}
  remember();paintKept();try{lastChat=curChat()&&curChat().id;}catch(e){}try{paintChatTop();}catch(e){}}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",hook);else hook();
window.addEventListener("load",function(){hook();setTimeout(hook,1500);});
window.IngConnections={kept:kept,use:use,remember:remember,nice:nice,label:label,paint:paintKept};
})();
;try{window.__ingParts["p191"]="running";}catch(_){}
</script>
