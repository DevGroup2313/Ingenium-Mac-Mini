<style id="r223-css">
/* ============ R223 · A CODE SESSION'S ENVIRONMENT, AS IN CLAUDE'S (Ingenium 6.16, 4 November 2026) ============
   Her words (4 November 2026): "When I click on the Settings button for the Environment section on the Coding chat inside of Ingenium,
   it just opens up the Controls panel, it does not open the settings for the editing the Environment unlike Claude's coding chat
   settings, please make the fix to bridge that gap as well. I want full parity please."
   Claude's dialog (her picture): Edit cloud environment, its Name (the Default one cannot be renamed), Network access, Network secrets,
   a Setup script and Environment variables. Ingenium's apps run here, in the preview beside the conversation, so its environment is
   where the app runs, and each setting has a real effect there:
   - Network access: Full (as before), Listed sites only, or None, enforced by the browser itself (a content security policy put first
     in the app's page): requests, scripts, styles, pictures, fonts and frames from a site not allowed are refused, and the preview's
     console says which was refused and why. A window the app opens to another site is not stopped.
   - Network secrets: a value (a key, a token) added as a header to the app's requests to one site she names, so it need not be
     written into the app's code. Never shown to the model, never written into the app's files, its versions or GitHub.
   - Setup script: JavaScript run in the preview before the app's own scripts, each time it loads (sample data, a flag, a stand-in).
   - Environment variables: NAME=value lines the app reads as window.ENV.NAME; the model is told their names, not their values.
   An environment serves every Code session that uses it; the Default one serves any session until another is chosen. The gear's
   former task (the engine and the connection, in Controls) is the dialog's last row. Values are kept on this device (sealed with
   her data when the sign-in is on); a backup she exports carries them, as it carries her connections' keys. */
.env-sheet h3{margin:0 0 4px}
.env-sheet .env-lede{margin:0 0 12px;font-size:13px;line-height:1.5;color:var(--ink-3)}
.env-sheet .env-top{display:flex;flex-wrap:wrap;gap:10px;align-items:flex-end;margin:0 0 12px}
.env-sheet .env-top .field{flex:1 1 200px;margin:0}
.env-sheet .env-name-note{font-size:12.5px;line-height:1.45;color:var(--ink-3);margin:6px 0 12px}
.env-sheet .env-rows{display:flex;flex-direction:column;gap:10px;margin:4px 0 6px;padding:2px}
.env-sheet .env-row{display:flex;align-items:center;gap:12px;width:100%;box-sizing:border-box;text-align:left;padding:13px 16px;border-radius:14px;border:1px solid var(--hairline,rgba(34,26,46,.14));
  background:linear-gradient(180deg,var(--card-hi,#fff),var(--card-lo,#f6f2fb));box-shadow:var(--pop,0 2px 0 rgba(40,22,68,.10),0 6px 14px rgba(40,22,68,.10));cursor:pointer;color:var(--ink-1);
  font:600 14.5px/1.3 var(--sans);transition:transform .14s cubic-bezier(.34,1.35,.64,1),box-shadow .14s ease}
.env-sheet .env-row:hover{transform:translateY(-2px);box-shadow:var(--pop-hi,0 3px 0 rgba(40,22,68,.12),0 12px 24px rgba(40,22,68,.16))}
.env-sheet .env-row:active{transform:translateY(1px);box-shadow:inset 0 2px 6px rgba(40,20,70,.22)}
.env-sheet .env-row:focus-visible{outline:2px solid var(--accent,#6a3fb5);outline-offset:2px}
.env-sheet .env-row .env-t{flex:1 1 auto;min-width:0;display:flex;flex-direction:column;gap:3px}
.env-sheet .env-row .env-v{font:400 13px/1.4 var(--sans);color:var(--ink-3);overflow-wrap:anywhere}
.env-sheet .env-row .env-chev{flex:0 0 auto;color:var(--ink-3);font-size:18px;line-height:1}
.env-sheet .env-keys{display:flex;flex-wrap:wrap;gap:8px;justify-content:flex-end;align-items:center;margin-top:14px}
.env-sheet .env-keys .env-gap{flex:1 1 auto}
.env-sheet .env-back{display:inline-flex;align-items:center;gap:6px;border:0;background:transparent;color:var(--accent,#6a3fb5);font:600 13px/1 var(--sans);cursor:pointer;padding:4px 0;margin:0 0 6px}
.env-sheet .env-opts{display:flex;flex-direction:column;gap:8px;margin:8px 0}
.env-sheet .env-opt{display:flex;gap:10px;align-items:flex-start;padding:11px 14px;border-radius:12px;border:1px solid var(--hairline,rgba(34,26,46,.14));background:var(--card,#fff);cursor:pointer}
.env-sheet .env-opt input{margin-top:3px;accent-color:var(--accent,#6a3fb5)}
.env-sheet .env-opt b{display:block;font:600 14px/1.35 var(--sans);color:var(--ink-1)}
.env-sheet .env-opt span{display:block;font-size:12.5px;line-height:1.45;color:var(--ink-3)}
.env-sheet .env-opt.on{border-color:var(--accent,#6a3fb5);box-shadow:inset 0 0 0 1px var(--accent,#6a3fb5)}
.env-sheet textarea{width:100%;box-sizing:border-box;min-height:120px;font:12.5px/1.5 var(--mono,ui-monospace,monospace);padding:10px 12px;border-radius:12px;border:1px solid var(--hairline,rgba(34,26,46,.16));background:var(--card,#fff);color:var(--ink-1);resize:vertical}
.env-sheet textarea:disabled{opacity:.55}
.env-sheet .env-note{font-size:12.5px;line-height:1.5;color:var(--ink-3);margin:8px 0}
.env-sheet .env-bad{font-size:12.5px;line-height:1.45;color:#b4483c;margin:6px 0}
body[data-theme="night"] .env-sheet .env-bad{color:#f0a097}
.env-sheet .env-sec{display:grid;grid-template-columns:1.2fr 1fr 1.4fr auto;gap:8px;align-items:end;margin:8px 0;padding:10px;border-radius:12px;border:1px solid var(--hairline,rgba(34,26,46,.12));background:var(--card,#fff)}
.env-sheet .env-sec label{display:flex;flex-direction:column;gap:4px;font-size:12px;color:var(--ink-3);min-width:0}
.env-sheet .env-sec input{min-width:0;width:100%;box-sizing:border-box;min-height:36px;padding:6px 10px;border-radius:10px;border:1px solid var(--hairline,rgba(34,26,46,.16));background:var(--card,#fff);color:var(--ink-1);font:13px/1.3 var(--sans)}
@media (max-width:640px){.env-sheet .env-sec{grid-template-columns:1fr}}
body[data-motion="minimal"] .env-sheet .env-row{transition:none}body[data-motion="minimal"] .env-sheet .env-row:hover{transform:none}
@media (prefers-reduced-motion:reduce){.env-sheet .env-row{transition:none}.env-sheet .env-row:hover{transform:none}}
#ccPanel .env-pick{display:flex;align-items:center;gap:8px;width:100%;box-sizing:border-box;text-align:left;border:0;background:transparent;padding:4px 0;cursor:pointer;color:var(--ink-2);font:13px/1.4 var(--sans,system-ui,sans-serif)}
#ccPanel .env-pick .ccp-ic{font:13px/1 var(--sans,system-ui,sans-serif)}
#ccPanel .env-pick .nm b{font-weight:650;color:var(--ink-1)}
#ccPanel .env-pick:hover .nm b{color:var(--accent,#6a3fb5)}
#ccPanel .env-pick .nm{min-width:0;white-space:normal;overflow-wrap:anywhere}
#ccPanel .env-pick .nm span{color:var(--ink-3)}
#ccPanel .env-pick:focus-visible{outline:2px solid var(--accent,#6a3fb5);outline-offset:2px;border-radius:6px}
</style>
<script>try{(window.__ingParts=window.__ingParts||{})["p223"]="started";}catch(_){}
/* R223 · a Code session's environment: see the note at the top of its styles. window.IngEnv */
(function r223(){"use strict";
if(window.IngEnv)return;
var W=window,D=document;
function $(id){return D.getElementById(id);}
function mk(tag,cls,txt){var e=D.createElement(tag);if(cls)e.className=cls;if(txt!=null)e.textContent=txt;return e;}
function escH(s){return String(s==null?"":s).replace(/[&<>"']/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#39;"}[c];});}
function save(){try{saveState();}catch(e){}}
function toast(t){try{ingToast(t);}catch(e){}}
function uid(){return "env"+Date.now().toString(36)+Math.random().toString(36).slice(2,6);}

/* ================= 1. the environments, kept with her data ================= */
var NET={full:"Full",list:"Listed sites only",none:"None"};
function blank(id,name){return {id:id,name:name,net:"full",hosts:[],secrets:[],setup:"",vars:[]};}
function S(){var st=W.state;st.ccEnv=st.ccEnv||{};var E=st.ccEnv;if(!Array.isArray(E.list))E.list=[];if(!E.use||typeof E.use!=="object")E.use={};
  if(!E.list.some(function(e){return e.id==="default";}))E.list.unshift(blank("default","Default"));
  E.list.forEach(function(e){if(!NET[e.net])e.net="full";["hosts","secrets","vars"].forEach(function(k){if(!Array.isArray(e[k]))e[k]=[];});if(typeof e.setup!=="string")e.setup="";});return E;}
function byId(id){return S().list.filter(function(e){return e.id===id;})[0]||null;}
function forChat(c){if(!c)return byId("default");var id=S().use[c.id];return byId(id)||byId("default");}
function curCode(){try{var c=curChat();return c&&ccIsCode(c)?c:null;}catch(e){return null;}}

/* ================= 2. what each setting means, in the app's page ================= */
function cleanHost(h){h=String(h||"").trim().replace(/^[a-z]+:\/\//i,"").replace(/[\/?#].*$/,"").toLowerCase();
  if(/^(localhost|127\.0\.0\.1)(:\d{1,5})?$/.test(h))return h;
  return /^(\*\.)?([a-z0-9-]+\.)+[a-z0-9-]+(:\d{1,5})?$/.test(h)&&h.length<=253?h:"";}
function local(h){return /^(localhost|127\.0\.0\.1|\[::1\])(:\d+)?$/.test(h);}
function srcOf(h){return local(h)?"http://"+h+" ws://"+h+" https://"+h+" wss://"+h:"https://"+h+" wss://"+h;}
function csp(e){if(e.net==="full")return "";var X=e.net==="list"?" "+e.hosts.map(srcOf).join(" "):"";
  return "default-src 'none'; script-src 'unsafe-inline' 'unsafe-eval' data: blob:"+X+"; style-src 'unsafe-inline' data: blob:"+X+"; img-src data: blob:"+X+"; font-src data: blob:"+X
    +"; media-src data: blob:"+X+"; connect-src data: blob:"+X+"; frame-src data: blob: about:"+X+"; worker-src blob: data:"+X+"; manifest-src data: blob:; form-action"+(X||" 'none'")+"; base-uri 'none'";}
function js(v){return JSON.stringify(v).replace(/</g,"\\u003c").replace(/\u2028/g,"\\u2028").replace(/\u2029/g,"\\u2029");}
function sc(code){return "<scr"+"ipt>"+code.replace(/<\/script/gi,"<\\/script")+"<\/scr"+"ipt>";}
/* first in the page: the policy, the values, the headers for sites, and a word in the console when the policy refuses something */
function early(e){var out="",pol=csp(e);
  if(pol)out+='<meta http-equiv="Content-Security-Policy" content="'+escH(pol)+'">';
  var env={};e.vars.forEach(function(v){env[v.k]=v.v;});
  var code="window.ENV=Object.freeze("+js(env)+");";
  if(e.net!=="full")code+="document.addEventListener('securitypolicyviolation',function(ev){try{console.warn('The environment refused '+(ev.blockedURI||'a request')+' ('+ev.violatedDirective+'): its network access is "+NET[e.net]+(e.net==="list"?" ("+e.hosts.join(", ").replace(/'/g,"")+")":"")+".');}catch(_){}});";
  var sec=e.secrets.filter(function(s){return s.host&&s.value;});
  if(sec.length&&e.net!=="none")code+="(function(S){function host(u){try{return new URL(u,document.baseURI).host.toLowerCase();}catch(_){return '';}}"
    +"function hit(h){if(!h)return null;for(var i=0;i<S.length;i++){var s=S[i].host;if(s===h||(s.indexOf('*.')===0&&h.length>s.length-1&&h.slice(-(s.length-1))===s.slice(1)))return S[i];}return null;}"
    +"var F=window.fetch;if(F)window.fetch=function(input,init){try{var u=typeof input==='string'?input:(input&&input.url)||String(input),m=hit(host(u));"
    +"if(m){init=Object.assign({},init||{});var hd=new Headers(init.headers||(input&&input.headers)||{});if(!hd.has(m.header))hd.set(m.header,m.value);init.headers=hd;}}catch(_){}return F.call(this,input,init);};"
    +"var X=XMLHttpRequest.prototype,O=X.open,SD=X.send;X.open=function(meth,url){try{this.__ingH=host(url);}catch(_){}return O.apply(this,arguments);};"
    +"X.send=function(){var m=hit(this.__ingH||'');if(m){try{this.setRequestHeader(m.header,m.value);}catch(_){}}return SD.apply(this,arguments);};})("+js(sec.map(function(s){return {host:s.host,header:s.header||"Authorization",value:s.value};}))+");";
  return out+sc(code);}
function setupTag(e){var t=String(e.setup||"").trim();return t?sc("try{\n"+t+"\n}catch(err){console.error('The environment\\'s setup script failed: '+(err&&err.message||err));}"):"";}
function plain(e){return e.net==="full"&&!e.vars.length&&!e.secrets.length&&!String(e.setup||"").trim();}
/* the app's page as the preview runs it: the environment's part first, its setup script just before the app */
(function wrapDoc(){var o=W.ingStageDoc;if(typeof o!=="function"||o.__r223)return;
  var n=function(html,seed){var pg=null;try{pg=W.csCur;}catch(_){}
    var e=null;try{if(pg&&pg.kind==="file"&&/^code:/.test(String(pg.sid||""))&&html===pg.html){var c=(W.state.chats||[]).filter(function(x){return x.id===pg.chat;})[0];if(c&&ccIsCode(c))e=forChat(c);}}catch(_){}
    if(!e||plain(e))return o.apply(this,arguments);
    var h=String(html||""),st=setupTag(e),m=/^(﻿?\s*<!doctype[^>]*>)/i.exec(h);if(st)h=m?m[1]+st+h.slice(m[1].length):st+h;
    var out=o.call(this,h,seed),ad=early(e),mm=/^(﻿?\s*<!doctype[^>]*>)/i.exec(out);
    return mm?mm[1]+ad+out.slice(mm[1].length):ad+out;};
  n.__r223=1;W.ingStageDoc=ingStageDoc=n;})();
/* a change runs the app again, if it is the one shown */
function rerun(){try{var pg=W.csCur;if(pg&&/^code:/.test(String(pg.sid||""))){pg._ran=null;csRender();}}catch(e){}}

/* ================= 3. the model is told what it needs, never a value ================= */
function noteFor(c){var e=forChat(c);if(!e||plain(e))return "";
  var t="This Code session's app runs in the environment \""+e.name+"\". Network access: "+(e.net==="full"?"full":e.net==="none"?"none (requests, scripts, styles, pictures and fonts from other sites are refused; use only what the app's own files hold)":"only these sites: "+e.hosts.join(", ")+" (anything else is refused)")+".";
  if(e.vars.length)t+=" Environment variables the app reads as window.ENV.NAME: "+e.vars.map(function(v){return v.k;}).join(", ")+". Their values are not shown to you; never write a value into the code, read it from window.ENV.";
  var sec=e.secrets.filter(function(s){return s.host;});
  if(sec.length)t+=" Secrets are added as headers to the app's requests to "+sec.map(function(s){return s.host+" ("+(s.header||"Authorization")+")";}).join(", ")+": call those sites without any key in the code.";
  if(String(e.setup||"").trim())t+=" A setup script she wrote runs before the app's own scripts each time it loads.";
  return t;}
(function wrapSys(){var o=W.chatSystemPrompt;if(typeof o!=="function")return;W.chatSystemPrompt=chatSystemPrompt=function(){var s=o.apply(this,arguments);
    try{var c=curCode(),t=c?noteFor(c):"";if(t&&typeof s==="string")s+="\n\n"+t;}catch(e){}return s;};})();

/* ================= 4. the dialog ================= */
function summary(e){var p=[NET[e.net]+(e.net==="list"?" ("+e.hosts.length+")":"")];if(e.vars.length)p.push(e.vars.length+" variable"+(e.vars.length===1?"":"s"));
  if(e.secrets.length)p.push(e.secrets.length+" secret"+(e.secrets.length===1?"":"s"));if(String(e.setup||"").trim())p.push("a setup script");return p.join(" · ");}
function parseVars(t){var out=[],bad=[],seen={};String(t||"").split(/\r?\n/).forEach(function(line,i){var l=line.trim();if(!l||l.charAt(0)==="#")return;
    var m=/^(?:export\s+)?([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)$/.exec(l);if(!m){bad.push("Line "+(i+1)+" is not NAME=value.");return;}
    var v=m[2];if(/^".*"$/.test(v)||/^'.*'$/.test(v))v=v.slice(1,-1);if(seen[m[1]])bad.push(m[1]+" is given twice: the last one is kept.");seen[m[1]]=1;
    out=out.filter(function(x){return x.k!==m[1];});out.push({k:m[1],v:v});});return {vars:out,bad:bad};}
function varsText(e){return e.vars.map(function(v){return v.k+"="+v.v;}).join("\n");}
function modelName(){try{var cl=state.cloud&&state.cloud.on&&typeof chatSource==="function"&&chatSource()==="cloud";
    if(cl)return (W.ingModelLabel||String)(state.cloud.model||"a connected model");var m=(state.models||[]).filter(function(x){return x.id===state.activeModelId;})[0];return m?(m.customName||m.name):"No model chosen";}catch(e){return "";}}
var draft=null,drC=null;
function open(chatId){var c=null;try{c=chatId?(state.chats||[]).filter(function(x){return x.id===chatId;})[0]:curCode();}catch(e){}if(!c){c=curCode();}
  drC=c;var e=forChat(c);draft={use:e.id,envs:JSON.parse(JSON.stringify(S().list)),open:true};main();}
function dEnv(){return draft.envs.filter(function(e){return e.id===draft.use;})[0]||draft.envs[0];}
function sheet(html){var box=modalOpen('<div class="env-sheet" role="document">'+html+'</div>');box.classList.add("env-box");return box.querySelector(".env-sheet");}
function main(){var e=dEnv(),def=e.id==="default";
  var s=sheet('<h3>Environment</h3><p class="env-lede">Where this session\'s app runs, in the preview beside the conversation: what it may reach on the internet, the values it is given, and what runs before it. One environment can serve many sessions.</p>'
    +'<div class="env-top"><label class="field"><span>This session uses</span><select id="envUse"></select></label><button class="btn ghost" type="button" id="envNew">New environment</button></div>'
    +'<label class="field" style="margin:0"><span>Name</span><input type="text" id="envName" maxlength="60" autocomplete="off"></label>'
    +'<div class="env-name-note" id="envNameNote"></div>'
    +'<div class="env-rows" role="list"></div>'
    +'<div class="env-keys"><button class="btn ghost" type="button" id="envDel">Remove this environment</button><span class="env-gap"></span><button class="btn ghost" type="button" id="envNo">Cancel</button><button class="btn primary" type="button" id="envOk">Save changes</button></div>');
  var sel=s.querySelector("#envUse");draft.envs.forEach(function(x){var o=mk("option",null,x.name+(x.id==="default"?" (default)":""));o.value=x.id;sel.appendChild(o);});sel.value=e.id;
  sel.onchange=function(){draft.use=sel.value;main();};
  s.querySelector("#envNew").onclick=function(){var n=blank(uid(),"New environment "+draft.envs.length);draft.envs.push(n);draft.use=n.id;main();setTimeout(function(){var i=$("envName");if(i){i.focus();i.select();}},30);};
  var nm=s.querySelector("#envName");nm.value=e.name;nm.disabled=def;nm.oninput=function(){e.name=nm.value.slice(0,60);};
  s.querySelector("#envNameNote").textContent=def?"The default environment cannot be renamed or removed. A session uses it until you choose another.":"Its name, as it shows in the Session column.";
  var del=s.querySelector("#envDel");del.hidden=def;del.onclick=function(){draft.envs=draft.envs.filter(function(x){return x.id!==e.id;});draft.use="default";main();};
  var rows=s.querySelector(".env-rows");
  function row(title,val,fn,id){var b=mk("button","env-row");b.type="button";if(id)b.id=id;b.setAttribute("role","listitem");var t=mk("span","env-t");t.appendChild(mk("span",null,title));t.appendChild(mk("span","env-v",val));b.appendChild(t);
    var ch=mk("span","env-chev","›");ch.setAttribute("aria-hidden","true");b.appendChild(ch);b.onclick=fn;rows.appendChild(b);}
  row("Network access",NET[e.net]+(e.net==="list"?": "+(e.hosts.length?e.hosts.join(", "):"no site listed yet"):""),netView,"envNet");
  row("Network secrets",e.secrets.length?e.secrets.map(function(x){return x.host||"(no site)";}).join(", "):"None",secView,"envSec");
  row("Setup script",String(e.setup||"").trim()?String(e.setup).trim().split(/\n/).length+" line"+(String(e.setup).trim().split(/\n/).length===1?"":"s"):"Not set",setupView,"envSetup");
  row("Environment variables",e.vars.length?e.vars.map(function(v){return v.k;}).join(", "):"None for this environment",varsView,"envVars");
  row("The model and its engine",(modelName()||"")+" · in Controls",function(){closeModal();setTimeout(function(){var k=$("chatCtlBtn");if(k&&k.getAttribute("aria-expanded")!=="true")k.click();},40);},"envModel");
  s.querySelector("#envNo").onclick=function(){draft=null;closeModal();};
  s.querySelector("#envOk").onclick=commit;
  setTimeout(function(){try{sel.focus({preventScroll:true});}catch(_){}},30);}
function sub(title,body){var s=sheet('<button class="env-back" type="button" id="envBack">‹ '+escH(dEnv().name)+'</button><h3>'+escH(title)+'</h3>'+body
    +'<div class="env-keys"><span class="env-gap"></span><button class="btn primary" type="button" id="envDone">Done</button></div>');
  s.querySelector("#envBack").onclick=function(){if(s.__keep)s.__keep();main();};s.querySelector("#envDone").onclick=function(){if(s.__keep&&s.__keep()===false)return;main();};return s;}
function netView(){var e=dEnv();
  var s=sub("Network access",'<p class="env-lede">What the app in the preview may reach on the internet. The browser itself holds to it: what is not allowed is refused, and the preview\'s console says what was refused.</p><div class="env-opts" role="radiogroup" aria-label="Network access">'
    +[["full","Full","The app may reach any site, as a page in a browser can. As before."],["list","Listed sites only","Only the sites you list below: requests, scripts, styles, pictures, fonts and frames from any other site are refused."],["none","None","Nothing outside this device: everything the app needs must be in its own files."]]
      .map(function(o){return '<label class="env-opt'+(e.net===o[0]?" on":"")+'"><input type="radio" name="envNetR" value="'+o[0]+'"'+(e.net===o[0]?" checked":"")+'><div><b>'+o[1]+'</b><span>'+o[2]+'</span></div></label>';}).join("")+'</div>'
    +'<label class="field" style="margin:0"><span>The sites allowed, one per line (such as api.example.com or *.jsdelivr.net)</span><textarea id="envHosts" spellcheck="false" placeholder="api.example.com&#10;*.jsdelivr.net"></textarea></label>'
    +'<div class="env-bad" id="envHostBad" role="alert"></div>'
    +'<p class="env-note">This is for the app as it runs here, and the checks run in it. The model\'s own web search and connectors are set in the conversation, with the + key. A window the app opens to another site is not stopped.</p>');
  var ta=s.querySelector("#envHosts");ta.value=e.hosts.join("\n");
  function paint(){var v=(s.querySelector('input[name="envNetR"]:checked')||{}).value||"full";ta.disabled=v!=="list";[].forEach.call(s.querySelectorAll(".env-opt"),function(l){l.classList.toggle("on",!!l.querySelector("input:checked"));});}
  [].forEach.call(s.querySelectorAll('input[name="envNetR"]'),function(r){r.onchange=paint;});paint();
  s.__keep=function(){var v=(s.querySelector('input[name="envNetR"]:checked')||{}).value||"full",bad=[],hs=[];
    ta.value.split(/[\r\n,]+/).forEach(function(x){if(!x.trim())return;var h=cleanHost(x);if(h){if(hs.indexOf(h)<0)hs.push(h);}else bad.push(x.trim());});
    if(bad.length){s.querySelector("#envHostBad").textContent="Not a site name: "+bad.slice(0,4).join(", ")+". Write a name such as api.example.com.";return false;}
    if(v==="list"&&!hs.length){s.querySelector("#envHostBad").textContent="List at least one site, or choose None.";return false;}
    e.net=v;e.hosts=hs;return true;};}
function secView(){var e=dEnv(),L=JSON.parse(JSON.stringify(e.secrets));
  var s=sub("Network secrets",'<p class="env-lede">A value, such as a key or a token, added as a header to the app\'s requests to one site, so it need not be written into the app\'s code.</p><div id="envSecs"></div>'
    +'<button class="btn ghost" type="button" id="envSecAdd">Add a secret</button><div class="env-bad" id="envSecBad" role="alert"></div>'
    +'<p class="env-note">Kept on this device (sealed with your data when the sign-in is on); never shown to the model, never written into the app\'s files, its versions or GitHub. It is sent only with requests to its site. Code running in the preview can still use it by calling that site, as any code in the app could. With network access None, it is not sent at all.</p>');
  var host=s.querySelector("#envSecs");
  function draw(){host.innerHTML="";if(!L.length){host.appendChild(mk("p","env-note","No secret yet."));return;}
    L.forEach(function(x,i){var r=mk("div","env-sec");
      r.innerHTML='<label>Site<input type="text" data-k="host" placeholder="api.example.com" spellcheck="false"></label><label>Header<input type="text" data-k="header" placeholder="Authorization" spellcheck="false"></label><label>Value<input type="password" data-k="value" placeholder="Bearer …" autocomplete="off"></label>';
      ["host","header","value"].forEach(function(k){var inp=r.querySelector('[data-k="'+k+'"]');inp.value=x[k]||"";inp.oninput=function(){x[k]=inp.value;};inp.setAttribute("aria-label",(k==="host"?"Site":k==="header"?"Header":"Value")+" of secret "+(i+1));});
      var rm=mk("button","btn ghost","Remove");rm.type="button";rm.onclick=function(){L.splice(i,1);draw();};r.appendChild(rm);host.appendChild(r);});}
  draw();s.querySelector("#envSecAdd").onclick=function(){L.push({host:"",header:"Authorization",value:""});draw();var ins=host.querySelectorAll('[data-k="host"]');if(ins.length)ins[ins.length-1].focus();};
  s.__keep=function(){var out=[],bad=[];L.forEach(function(x,i){if(!String(x.host||"").trim()&&!String(x.value||"").trim())return;var h=cleanHost(x.host),hd=String(x.header||"Authorization").trim()||"Authorization";
      if(!h){bad.push("Secret "+(i+1)+": write its site, such as api.example.com.");return;}if(!/^[A-Za-z0-9-]{1,64}$/.test(hd)){bad.push("Secret "+(i+1)+": a header name has letters, digits and dashes only.");return;}
      if(!String(x.value||"")){bad.push("Secret "+(i+1)+": its value is empty.");return;}out.push({host:h,header:hd,value:String(x.value)});});
    if(bad.length){s.querySelector("#envSecBad").textContent=bad.join(" ");return false;}e.secrets=out;return true;};}
function setupView(){var e=dEnv();
  var s=sub("Setup script",'<p class="env-lede">JavaScript that runs in the preview before the app\'s own scripts, each time the app loads: to fill in sample data, set a flag, or stand in for a service.</p>'
    +'<textarea id="envSetupT" spellcheck="false" placeholder="localStorage.setItem(\'plants\', JSON.stringify([\'fern\', \'ivy\']));" style="min-height:180px"></textarea>'
    +'<p class="env-note">An error in it shows in the preview\'s console and the app still loads. It is not one of the app\'s files: it is not pushed to GitHub or kept in the app\'s versions.</p>');
  var ta=s.querySelector("#envSetupT");ta.value=e.setup||"";s.__keep=function(){e.setup=ta.value.slice(0,20000);return true;};}
function varsView(){var e=dEnv();
  var s=sub("Environment variables",'<p class="env-lede">Values the app reads as <b>window.ENV.NAME</b>, one NAME=value per line, as in a .env file.</p>'
    +'<textarea id="envVarsT" spellcheck="false" placeholder="API_BASE=https://api.example.com&#10;GREETING=Hello"></textarea><div class="env-bad" id="envVarsBad" role="alert"></div>'
    +'<p class="env-note">The model is told their names, not their values. They are kept on this device, never written into the app\'s files or GitHub. A value that must stay hidden from the app\'s own code belongs in Network secrets.</p>');
  var ta=s.querySelector("#envVarsT");ta.value=varsText(e);
  s.__keep=function(){var r=parseVars(ta.value);var hard=r.bad.filter(function(b){return /^Line/.test(b);});if(hard.length){s.querySelector("#envVarsBad").textContent=hard.slice(0,3).join(" ");return false;}e.vars=r.vars;return true;};}
function commit(){if(!draft)return;var E=S();E.list=draft.envs.map(function(x){var n=blank(x.id,x.id==="default"?"Default":(String(x.name||"").trim()||"Unnamed environment"));
    n.net=NET[x.net]?x.net:"full";n.hosts=x.hosts||[];n.secrets=x.secrets||[];n.setup=x.setup||"";n.vars=x.vars||[];return n;});
  Object.keys(E.use).forEach(function(k){if(!byId(E.use[k]))delete E.use[k];});
  if(drC){if(draft.use==="default")delete E.use[drC.id];else E.use[drC.id]=draft.use;}
  draft=null;save();closeModal();rerun();try{IngR215.paintPanel();}catch(e){}var e=forChat(drC);toast("Environment "+e.name+" saved: "+summary(e)+".");}

/* ================= 5. in the Session column: its name, and the gear ================= */
function row(c){var e=forChat(c),b=mk("button","ccp-row env-pick");b.type="button";b.title="Edit the environment: network access, secrets, the setup script and its variables";
  b.appendChild(mk("span","ccp-ic","☁"));var n=mk("span","nm");n.appendChild(mk("b",null,e.name));n.appendChild(mk("span",null," · "+summary(e)));b.appendChild(n);b.onclick=function(){open(c&&c.id);};return b;}

/* ================= 6. the Guide, and help ================= */
function guideCard(){var page=$("page-guide");if(!page||$("envGuide"))return;var c=mk("div","card blx-guide");c.id="envGuide";
  c.innerHTML='<h3>A Code session\'s environment</h3><p class="small muted" style="margin-top:0">Where the app runs, in the preview beside the conversation, as a Claude session has its environment. The gear beside Environment, in the Session column, opens it.</p>';
  var dl=mk("dl");[["Network access","Full, Listed sites only, or None. The browser itself refuses what is not allowed, and the preview's console says what was refused. A window the app opens to another site is not stopped."],
    ["Network secrets","A key or a token added as a header to the app's requests to one site, so it is never written into the code. Never shown to the model, never pushed to GitHub."],
    ["Setup script","JavaScript run before the app's own scripts, each time the app loads."],
    ["Environment variables","NAME=value lines the app reads as window.ENV.NAME. The model is told the names, not the values."],
    ["Several environments","The Default serves every session until you choose another; each environment can serve many sessions."]].forEach(function(r){dl.appendChild(mk("dt",null,r[0]));dl.appendChild(mk("dd",null,r[1]));});
  c.appendChild(dl);var at=$("ghxGuide")||$("cnGuide")||$("guideEffortCard");if(at&&at.parentNode)at.parentNode.insertBefore(c,at.nextSibling);else page.appendChild(c);}
function help(){try{var P=W.IngHelp&&IngHelp.pages&&IngHelp.pages.code;if(P&&Array.isArray(P.dos)&&!P.dos.some(function(d){return d[0]==="Set the environment";}))
    P.dos.push(["Set the environment","The gear beside Environment: network access, secrets for sites, a setup script and variables for the app.","#ccPanel .ccp-gear, #ccpSessKey"]);}catch(e){}}
function boot(){try{S();}catch(e){}help();try{guideCard();}catch(e){}}
if(D.readyState==="loading")D.addEventListener("DOMContentLoaded",boot);else boot();
(function later(){var n=0;(function wait(){if(W.__ingReady===true){boot();return;}if(++n<400)setTimeout(wait,500);})();})();
(function wrapGo(){var og=W.go;if(typeof og!=="function"||og.__r223)return;var ng=function(p){var r=og.apply(this,arguments);try{if(p==="guide")guideCard();}catch(e){}return r;};
  try{Object.keys(og).forEach(function(k){ng[k]=og[k];});}catch(e){}ng.__r223=true;W.go=go=ng;})();

W.IngEnv={open:open,forChat:forChat,list:function(){return S().list;},summary:summary,row:row,note:noteFor,csp:csp,parseVars:parseVars,
  use:function(chatId,envId){var E=S();if(envId==="default")delete E.use[chatId];else if(byId(envId))E.use[chatId]=envId;save();rerun();}};
})();
;try{window.__ingParts["p223"]="running";}catch(_){}
</script>
