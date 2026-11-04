<style id="r220-css">
/* ============ R220 · CONNECTORS: TOOLS FROM OUTSIDE SERVICES, IN CHAT AND IN CODE (Ingenium 6.14, 4 November 2026) ============
   Her words (3 November 2026): "I want connectors added"; and (4 November) "I want full parity with Claude's Code chat ... and so much
   more". Claude's connectors are servers that speak MCP, the Model Context Protocol: each offers tools (search a service, read a
   record, create one), and the model uses them while it answers. Ingenium now does the same:
   - Settings, Connectors (and the + menu, and the Code session's column): she adds a connector by its address, the server's MCP
     endpoint, with a token when the server asks for one (kept on this device, sent only to that server). Ingenium asks the server
     what it is and lists its tools, saying which only read and which change something.
   - In any conversation where a connector is on (all of them, unless she turns it off there), the model is offered its tools, in
     Chat as in Code, through Ingenium's working loop (modules/r190.js), on a connected model or one on this device.
   - A tool that only reads runs when the model asks for it. A tool that changes something waits for her: Allow once, Always allow it,
     or Not now. Each use is a step under the reply: which tool, which connector, and whether it reported a problem.
   - The transport is MCP's Streamable HTTP (JSON-RPC 2.0 over POST, answered as JSON or as a stream of server-sent events), with the
     session a server keeps (Mcp-Session-Id), started again once when the server has forgotten it. The computer apps carry the requests
     themselves (the browser's rule against other sites does not apply there); in a plain browser, a server that does not allow pages
     from elsewhere cannot be reached, and Ingenium says so.
   What it does not do yet, and says: a server that only takes its provider's own sign-in page (OAuth) needs a token instead; a server
   on this computer run as a program (stdio) is not started by Ingenium. */
#cnCard .cn-row{display:flex;flex-wrap:wrap;align-items:center;gap:8px 12px;padding:10px 0;border-bottom:.5px solid var(--hairline,rgba(34,26,46,.12))}
#cnCard .cn-row:last-child{border-bottom:0}
#cnCard .cn-t{flex:1 1 240px;min-width:0}
#cnCard .cn-t b{display:block;color:var(--ink-1);font-weight:650}
#cnCard .cn-t span{display:block;font-size:12.5px;line-height:1.45;color:var(--ink-3);overflow-wrap:anywhere}
#cnCard .cn-t span.bad{color:#b4483c}body[data-theme="night"] #cnCard .cn-t span.bad{color:#f0a097}
#cnCard .cn-k{display:flex;flex-wrap:wrap;gap:6px;align-items:center}
#cnCard .cn-none{font-size:13px;color:var(--ink-3);margin:6px 0 10px}
.cn-sheet .cn-tools{list-style:none;margin:8px 0;padding:0;display:flex;flex-direction:column;gap:6px;max-height:min(46vh,420px);overflow:auto}
.cn-sheet .cn-tools li{display:flex;gap:10px;align-items:flex-start;font-size:12.5px;line-height:1.45;color:var(--ink-2);padding:6px 8px;border-radius:9px;border:1px solid var(--hairline,rgba(34,26,46,.10))}
.cn-sheet .cn-tools li b{color:var(--ink-1);font:600 12.5px/1.4 var(--mono,ui-monospace,monospace);overflow-wrap:anywhere}
.cn-sheet .cn-tools li .tx{flex:1 1 auto;min-width:0}
.cn-sheet .cn-tag{display:inline-block;font:600 10.5px/1 var(--sans);padding:3px 7px;border-radius:999px;margin-left:6px;vertical-align:1px;background:rgba(47,122,85,.13);color:#2f7a55}
.cn-sheet .cn-tag.act{background:rgba(184,116,46,.14);color:#8a5a1a}
body[data-theme="night"] .cn-sheet .cn-tag{color:#8fd0a9}body[data-theme="night"] .cn-sheet .cn-tag.act{color:#f0c27a}
.cn-sheet .cn-say{font-size:12.5px;line-height:1.5;color:var(--ink-2);margin:6px 0;min-height:1.2em}
.cn-sheet .cn-say.bad{color:#b4483c}
.cn-sheet .cn-keys{display:flex;gap:8px;justify-content:flex-end;flex-wrap:wrap;margin-top:12px}
#ccPanel .cnx{display:flex;flex-direction:column;gap:6px}
#ccPanel .cnx-row{display:flex;align-items:center;gap:8px;font-size:12.5px;line-height:1.45;color:var(--ink-2)}
#ccPanel .cnx-row .nm{flex:1 1 auto;min-width:0;overflow-wrap:anywhere}
#ccPanel .cnx-row .nm b{color:var(--ink-1);font-weight:650}
#ccPanel .cnx-keys{display:flex;gap:6px;flex-wrap:wrap}
#ccPanel .cnx-keys .btn{font-size:12px;padding:4px 10px;min-height:28px}
.cn-sw{position:relative;flex:0 0 auto;width:34px;height:20px;border-radius:10px;border:0;background:var(--hairline,rgba(34,26,46,.2));cursor:pointer;padding:0}
.cn-sw::after{content:"";position:absolute;left:3px;top:3px;width:14px;height:14px;border-radius:50%;background:#fff;box-shadow:0 1px 2px rgba(0,0,0,.25);transition:transform .15s ease}
.cn-sw[aria-checked="true"]{background:var(--accent,#6a3fb5)}.cn-sw[aria-checked="true"]::after{transform:translateX(14px)}
.cn-sw:focus-visible{outline:2px solid var(--accent,#6a3fb5);outline-offset:2px}
body[data-motion="minimal"] .cn-sw::after{transition:none}
</style>
<script>try{(window.__ingParts=window.__ingParts||{})["p220"]="started";}catch(_){}
/* R220 · connectors: see the note at the top of its styles.
   window.IngConnectors: list(), add(o), test(c), remove(id), call(id, tool, args), activeFor(chat), namesFor(chat), enabledFor(chat, c),
   setFor(chat, id, on), sheet(), register() */
(function r220(){"use strict";
if(window.IngConnectors)return;
var W=window,D=document;
function $(id){return D.getElementById(id);}
function mk(tag,cls,txt){var e=D.createElement(tag);if(cls)e.className=cls;if(txt!=null)e.textContent=txt;return e;}
function toast(t){try{ingToast(t);}catch(e){}}
function save(){try{saveState();}catch(e){}}
function warn(e){try{console.warn("Ingenium connectors:",e&&e.message||e);}catch(_){}}
function escH(s){return String(s==null?"":s).replace(/[&<>"']/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c];});}
function host(u){try{return new URL(u).host;}catch(e){return String(u||"");}}
function cur(){try{return curChat();}catch(e){return null;}}

/* ================= 1. the connectors she keeps ================= */
function L(){if(!Array.isArray(state.connectors))state.connectors=[];return state.connectors;}
function byId(id){return L().filter(function(c){return c.id===id;})[0]||null;}
function slug(s){return String(s||"").toLowerCase().normalize("NFKD").replace(/[̀-ͯ]/g,"").replace(/[^a-z0-9]+/g,"_").replace(/^_+|_+$/g,"")||"connector";}

/* ================= 2. MCP over HTTP (Streamable HTTP: JSON-RPC 2.0 over POST, answered as JSON or as server-sent events) ================= */
var PROTO="2025-06-18",SESS={},N=0;
function httpError(st,text){var j=null;try{j=JSON.parse(text);}catch(e){}var m=j&&(j.error&&(j.error.message||j.error_description||j.error)||j.message)||String(text||"").slice(0,200);
  var e=new Error(st===401||st===403?"The connector refused: it needs a sign-in. Give it a token (its server's instructions say how to make one). A server that only takes its provider's own sign-in page cannot be reached from Ingenium yet.":
    st===404?"The connector's address answered “not found”: is it the server's MCP endpoint (it often ends in /mcp)?":"The connector answered "+st+(m?": "+String(typeof m==="string"?m:JSON.stringify(m)).slice(0,240):"")+".");
  e.status=st;return e;}
function parse(text,ct,id){var t=String(text||"");
  if(/event-stream/i.test(ct||"")||/^\s*(event|data|id):/m.test(t)&&t.trim().charAt(0)!=="{"){var got=null;
    t.split(/\r?\n\r?\n/).forEach(function(block){var data=block.split(/\r?\n/).filter(function(l){return /^data:/.test(l);}).map(function(l){return l.slice(5).replace(/^ /,"");}).join("\n");
      if(!data||got)return;try{var j=JSON.parse(data);if(j&&j.id===id&&(j.result!==undefined||j.error))got=j;}catch(e){}});
    if(!got)throw new Error("The connector's stream ended without an answer to the request.");return rpc(got);}
  var j;try{j=JSON.parse(t);}catch(e){throw new Error("The connector did not answer in MCP's form. Is the address the server's MCP endpoint (it often ends in /mcp)?");}
  if(Array.isArray(j))j=j.filter(function(x){return x&&x.id===id;})[0];if(!j)throw new Error("The connector answered without a result.");return rpc(j);}
function rpc(j){if(j.error){var e=new Error("The connector reported: "+String(j.error.message||j.error.code||"an error").slice(0,300));e.rpc=j.error;throw e;}return j.result;}
function post(c,msg,o){o=o||{};var S=SESS[c.id]||(SESS[c.id]={}),h={"Content-Type":"application/json","Accept":"application/json, text/event-stream"};
  if(c.token)h["Authorization"]="Bearer "+c.token;if(S.sid)h["Mcp-Session-Id"]=S.sid;if(S.proto)h["MCP-Protocol-Version"]=S.proto;
  return netFetch(c.url,{method:"POST",headers:h,body:JSON.stringify(msg),timeout:o.timeout||120}).then(function(r){
    try{var sid=r.headers&&r.headers.get&&r.headers.get("Mcp-Session-Id");if(sid)S.sid=sid;}catch(e){}
    if(!r.ok)return r.text().then(function(t){throw httpError(r.status,t);});
    if(msg.id==null)return null;return r.text().then(function(t){return parse(t,r.contentType,msg.id);});});}
function init(c){var S=SESS[c.id]={};S.ready=post(c,{jsonrpc:"2.0",id:++N,method:"initialize",params:{protocolVersion:PROTO,capabilities:{},clientInfo:{name:"Ingenium",version:String(W.ING_VERSION||"")}}})
    .then(function(res){S.proto=(res&&res.protocolVersion)||PROTO;S.info=res&&res.serverInfo||null;S.instructions=res&&res.instructions||"";
      return post(c,{jsonrpc:"2.0",method:"notifications/initialized"}).then(null,function(){}).then(function(){return res;});});
  S.ready.then(null,function(){if(SESS[c.id]===S)delete SESS[c.id];});return S.ready;}
function ensure(c){var S=SESS[c.id];return S&&S.ready?S.ready:init(c);}
function request(c,method,params,o){var again=false;
  function go(){return ensure(c).then(function(){return post(c,{jsonrpc:"2.0",id:++N,method:method,params:params||{}},o);}).then(null,function(e){
      /* a server that has forgotten the session answers 404: a new one, once */
      if(!again&&e&&e.status===404&&SESS[c.id]&&SESS[c.id].sid){again=true;delete SESS[c.id];return go();}throw e;});}
  return go();}
function listTools(c){var all=[],pages=0;function page(cursor){return request(c,"tools/list",cursor?{cursor:cursor}:{}).then(function(res){(res&&res.tools||[]).forEach(function(t){if(t&&t.name)all.push(t);});
    if(res&&res.nextCursor&&++pages<20)return page(res.nextCursor);return all;});}return page(null);}
function resultText(res){var parts=[];(res&&res.content||[]).forEach(function(p){if(!p)return;
    if(p.type==="text")parts.push(String(p.text==null?"":p.text));else if(p.type==="image")parts.push("[an image ("+(p.mimeType||"image")+") the tool returned]");
    else if(p.type==="audio")parts.push("[a sound the tool returned]");else if(p.type==="resource"&&p.resource)parts.push((p.resource.uri?"["+p.resource.uri+"]\n":"")+(p.resource.text!=null?String(p.resource.text):"[binary content]"));
    else if(p.type==="resource_link")parts.push("[a link: "+(p.name||p.title||"")+" "+(p.uri||"")+"]");});
  if(!parts.length&&res&&res.structuredContent!=null)parts.push(JSON.stringify(res.structuredContent,null,1));
  var t=parts.join("\n\n");if(t.length>30000)t=t.slice(0,30000)+"\n[… the rest left out]";return {text:t||"(the tool returned nothing)",isError:!!(res&&res.isError)};}
function call(c,name,args){return request(c,"tools/call",{name:name,arguments:args||{}},{timeout:300}).then(resultText);}

/* ================= 3. connecting: what the server is, and its tools ================= */
function shape(t,old){var a=t.annotations||{},ro=a.readOnlyHint===true,prev=(old||[]).filter(function(x){return x.name===t.name;})[0];
  return {name:t.name,title:t.title||a.title||"",description:String(t.description||"").slice(0,1500),inputSchema:t.inputSchema&&typeof t.inputSchema==="object"?t.inputSchema:{type:"object",properties:{}},
    ro:ro,destructive:a.destructiveHint===true,off:prev?!!prev.off:false};}
function test(c){delete SESS[c.id];return init(c).then(function(res){c.server=res&&res.serverInfo?{name:String(res.serverInfo.name||""),version:String(res.serverInfo.version||"")}:null;c.proto=SESS[c.id]&&SESS[c.id].proto||PROTO;
      c.instructions=String(res&&res.instructions||"").slice(0,2000);return listTools(c);})
    .then(function(tools){c.tools=tools.slice(0,128).map(function(t){return shape(t,c.tools);});c.more=Math.max(0,tools.length-128);c.ok=true;c.err="";c.at=Date.now();save();register();paintAll();return c;},
      function(e){c.ok=false;c.err=String(e&&e.message||e);c.at=Date.now();save();paintAll();throw e;});}
function add(o){var c={id:"cn"+Date.now().toString(36)+Math.random().toString(36).slice(2,4),name:String(o.name||host(o.url)||"Connector").slice(0,60),url:String(o.url||"").trim(),token:String(o.token||"").trim(),on:o.on!==false,allow:{},tools:[],made:Date.now()};
  return test(c).then(function(){L().push(c);save();register();paintAll();return c;});}
function remove(id){state.connectors=L().filter(function(c){return c.id!==id;});delete SESS[id];(state.chats||[]).forEach(function(ch){if(ch.connectors)delete ch.connectors[id];});save();paintAll();}

/* ================= 4. which conversations have which ================= */
function enabledFor(chat,c){if(!c||!c.ok)return false;var m=chat&&chat.connectors;if(m&&m[c.id]!==undefined)return !!m[c.id];return c.on!==false;}
function activeFor(chat){return L().some(function(c){return enabledFor(chat,c)&&(c.tools||[]).some(function(t){return !t.off;});});}
function namesFor(chat){return L().filter(function(c){return enabledFor(chat,c);}).map(function(c){return c.name;});}
function setFor(chat,id,on){if(!chat)return;chat.connectors=chat.connectors||{};chat.connectors[id]=!!on;save();paintAll();}

/* ================= 5. the tools, lent to the working loop, and her yes before a tool that changes something ================= */
var REG={};
function tname(c,t){var base="mcp_"+slug(c.name).slice(0,18)+"_"+String(t.name).replace(/[^A-Za-z0-9_-]/g,"_"),n=base.slice(0,64),k=2;
  while(REG[n]&&!(REG[n].cid===c.id&&REG[n].tool===t.name)){n=(base.slice(0,60)+"_"+k++).slice(0,64);}return n;}
function permit(c,t,args){if(t.ro||(c.allow&&c.allow[t.name]))return Promise.resolve(true);
  var shown="";try{shown=JSON.stringify(args||{});}catch(e){shown="";}if(shown.length>500)shown=shown.slice(0,500)+"…";
  var o={title:"Let the model use “"+(t.title||t.name)+"” ("+c.name+")?",text:(t.description?t.description.split(/\n/)[0].slice(0,220)+" ":"")+"It can change something"+(t.destructive?", and may delete or overwrite":"")+". With: "+(shown||"nothing"),
    choices:[{label:"Always allow it",value:"always"},{label:"Allow once",value:"once",primary:true}],cancel:"Not now"};
  var ask=typeof W.ingChoose==="function"?W.ingChoose(o):Promise.resolve(W.confirm(o.title+"\n\n"+o.text)?"once":null);
  return Promise.resolve(ask).then(function(v){if(v==="always"){c.allow=c.allow||{};c.allow[t.name]=true;save();}return !!v;});}
function handler(cid,tool){return function(ws,a){var c=byId(cid),t=c&&(c.tools||[]).filter(function(x){return x.name===tool;})[0];
    if(!c||!t)return {text:"That connector or tool is no longer here.",err:true,step:{i:"!",t:"A connector's tool that is no longer here",bad:true}};
    var label=(t.title||t.name)+" ("+c.name+")";
    return permit(c,t,a).then(function(ok){if(!ok)return {text:"She did not allow "+label+" now. Answer without it, or ask her.",step:{i:"⚡",t:"She kept "+label+" for later",you:true}};
      return call(c,t.name,a).then(function(r){return {text:r.text,err:r.isError,step:{i:"⚡",t:"Used "+label+(r.isError?" · it reported a problem":""),bad:r.isError}};},
        function(e){return {text:"The connector could not answer: "+(e&&e.message||e),err:true,step:{i:"!",t:"Could not use "+label+": "+String(e&&e.message||e).slice(0,100),bad:true}};});});};}
function register(){var A=W.IngAgent;if(!A||typeof A.addTool!=="function")return false;
  L().forEach(function(c){(c.tools||[]).forEach(function(t){var n=tname(c,t);REG[n]={cid:c.id,tool:t.name};var sc=t.inputSchema&&typeof t.inputSchema==="object"?t.inputSchema:{type:"object",properties:{}};if(sc.type!=="object")sc={type:"object",properties:{}};
      A.addTool({name:n,description:((c.name+": "+(t.title?t.title+". ":"")+(t.description||t.name))+(t.ro?"":" (It changes something: the person is asked first.)")).slice(0,1024),input_schema:sc},handler(c.id,t.name),
        {ro:t.ro,when:function(){var cc=byId(c.id),tt=cc&&(cc.tools||[]).filter(function(x){return x.name===t.name;})[0];return !!(cc&&tt&&!tt.off&&enabledFor(cur(),cc));}});});});
  return true;}

/* ================= 6. the sheets: add a connector, and one connector's tools ================= */
function sheet(html){var box=modalOpen('<div class="cn-sheet">'+html+'</div>');return box.querySelector(".cn-sheet");}
function toolsList(c,host,editable){host.innerHTML="";(c.tools||[]).forEach(function(t){var li=mk("li");
    if(editable){var sw=mk("button","cn-sw");sw.type="button";sw.setAttribute("role","switch");sw.setAttribute("aria-checked",String(!t.off));sw.setAttribute("aria-label","Offer "+t.name+" to the model");
      sw.onclick=function(){t.off=!t.off;sw.setAttribute("aria-checked",String(!t.off));save();};li.appendChild(sw);}
    var tx=mk("div","tx");var b=mk("b",null,t.name);tx.appendChild(b);tx.appendChild(D.createTextNode(" "));var tag=mk("span","cn-tag"+(t.ro?"":" act"),t.ro?"only reads":(t.destructive?"may delete: asks first":"changes something: asks first"));tx.appendChild(tag);
    if(c.allow&&c.allow[t.name]&&!t.ro){tx.appendChild(D.createTextNode(" "));tx.appendChild(mk("span","cn-tag","always allowed"));}
    if(t.description)tx.appendChild(mk("div",null,t.description.split(/\n/)[0].slice(0,240)));li.appendChild(tx);host.appendChild(li);});
  if(!(c.tools||[]).length)host.appendChild(mk("li",null,"This connector offers no tools."));if(c.more)host.appendChild(mk("li",null,c.more+" more tools are not offered (at most 128 a connector)."));}
function addSheet(){var s=sheet('<h3>Add a connector</h3><p class="small muted" style="margin-top:0">A connector is a server that speaks MCP (the Model Context Protocol) over HTTP, as Claude\'s connectors do. Its address is the server\'s MCP endpoint (it often ends in /mcp). A token, when the server asks for one, is kept on this device and sent only to that server.</p>'
    +'<label class="field"><span>Name</span><input type="text" id="cnName" maxlength="60" placeholder="My notes"></label>'
    +'<label class="field"><span>Address (URL)</span><input type="url" id="cnUrl" placeholder="https://example.com/mcp" autocomplete="off"></label>'
    +'<label class="field"><span>Token <span class="muted small">(if the server asks for one)</span></span><input type="password" id="cnTok" autocomplete="off"></label>'
    +'<div class="cn-say" id="cnSay" role="status"></div><ul class="cn-tools" id="cnTools" hidden></ul>'
    +'<div class="cn-keys"><button class="btn ghost" type="button" id="cnNo">Cancel</button><button class="btn primary" type="button" id="cnGo">Connect</button></div>');
  var nm=s.querySelector("#cnName"),url=s.querySelector("#cnUrl"),tok=s.querySelector("#cnTok"),say=s.querySelector("#cnSay"),go=s.querySelector("#cnGo"),tl=s.querySelector("#cnTools");
  s.querySelector("#cnNo").onclick=closeModal;
  go.onclick=function(){var u=url.value.trim();if(!/^https?:\/\/[^\s/]+/i.test(u)){say.className="cn-say bad";say.textContent="Write the server's address, beginning with https://";url.focus();return;}
    if(/^http:\/\//i.test(u)&&!/^http:\/\/(127\.0\.0\.1|localhost)(:|\/|$)/i.test(u)){say.className="cn-say bad";say.textContent="Use https:// for a server on the internet, so the token and what the model sends cannot be read on the way.";return;}
    go.disabled=true;say.className="cn-say";say.textContent="Asking "+host(u)+" what it is and which tools it has…";
    add({name:nm.value.trim()||host(u),url:u,token:tok.value}).then(function(c){say.className="cn-say";say.textContent="Connected"+(c.server&&c.server.name?" to "+c.server.name:"")+": "+c.tools.length+" tool"+(c.tools.length===1?"":"s")+", "+c.tools.filter(function(t){return t.ro;}).length+" that only read. It is on in your conversations; turn it off in any of them from the + menu.";
        tl.hidden=false;toolsList(c,tl,false);go.textContent="Done";go.disabled=false;go.onclick=closeModal;},
      function(e){go.disabled=false;say.className="cn-say bad";say.textContent=String(e&&e.message||e);});};
  setTimeout(function(){nm.focus();},40);}
function detailSheet(c){var s=sheet('<h3>'+escH(c.name)+'</h3><p class="small muted" style="margin-top:0">'+escH(c.url)+(c.server&&c.server.name?' · '+escH(c.server.name+(c.server.version?" "+c.server.version:"")):"")+'. The tools switched on are offered to the model where this connector is on.</p>'
    +'<ul class="cn-tools" id="cnTools"></ul><div class="cn-say" id="cnSay" role="status"></div>'
    +'<div class="cn-keys"><button class="btn ghost" type="button" id="cnDel">Remove the connector</button>'+(c.allow&&Object.keys(c.allow).length?'<button class="btn ghost" type="button" id="cnAsk">Ask again before every change</button>':'')+'<button class="btn ghost" type="button" id="cnTest">Test again</button><button class="btn primary" type="button" id="cnOk">Done</button></div>');
  var tl=s.querySelector("#cnTools"),say=s.querySelector("#cnSay");toolsList(c,tl,true);
  s.querySelector("#cnOk").onclick=function(){closeModal();register();paintAll();};
  s.querySelector("#cnTest").onclick=function(){say.className="cn-say";say.textContent="Asking "+host(c.url)+"…";test(c).then(function(){say.textContent="It answers: "+c.tools.length+" tools.";toolsList(c,tl,true);},function(e){say.className="cn-say bad";say.textContent=String(e&&e.message||e);});};
  var ak=s.querySelector("#cnAsk");if(ak)ak.onclick=function(){c.allow={};save();toolsList(c,tl,true);ak.remove();say.textContent="Every tool that changes something asks again.";};
  s.querySelector("#cnDel").onclick=function(){closeModal();Promise.resolve(typeof W.ingAsk==="function"?W.ingAsk({title:"Remove "+c.name+"?",text:"Its tools are no longer offered, and its token is forgotten on this device. Nothing changes on the server.",yes:"Remove it",danger:true}):W.confirm("Remove "+c.name+"?")).then(function(ok){if(ok){remove(c.id);toast(c.name+" is removed.");}});};}

/* ================= 7. where it shows: Settings, the + menu, the Code session's column ================= */
function sw(on,label,fn){var b=mk("button","cn-sw");b.type="button";b.setAttribute("role","switch");b.setAttribute("aria-checked",String(!!on));b.setAttribute("aria-label",label);b.onclick=function(e){e.stopPropagation();fn(b);};return b;}
function paintCard(){var page=$("page-settings");if(!page)return;var card=$("cnCard");
  if(!card){card=mk("div","card");card.id="cnCard";card.innerHTML='<h2 class="sec">Connectors</h2><p class="small muted" style="margin-top:0">Tools from outside services that the model can use in Chat and in Code, as Claude\'s connectors: servers that speak MCP. Ingenium sends a connector only what the model asks of it, and asks you first before any tool that changes something.</p><div id="cnList"></div><div class="cn-k"><button class="btn primary" type="button" id="cnAddKey">Add a connector</button></div>';
    var cx=$("cxOn"),anchor=cx&&cx.closest(".card");if(anchor&&anchor.parentNode)anchor.parentNode.insertBefore(card,anchor.nextSibling);else page.appendChild(card);
    card.querySelector("#cnAddKey").onclick=addSheet;}
  var list=card.querySelector("#cnList");list.innerHTML="";
  if(!L().length){list.appendChild(mk("p","cn-none","No connector yet."));return;}
  L().forEach(function(c){var row=mk("div","cn-row"),t=mk("div","cn-t");t.appendChild(mk("b",null,c.name));t.appendChild(D.createTextNode(" "));
    var n=(c.tools||[]).length,ro=(c.tools||[]).filter(function(x){return x.ro;}).length;
    t.appendChild(mk("span",c.ok?"":"bad",c.ok?(host(c.url)+" · "+n+" tool"+(n===1?"":"s")+" ("+ro+" only read)"):(host(c.url)+" · not connected: "+(c.err||"not tested"))));row.appendChild(t);
    var k=mk("div","cn-k");var s1=sw(c.on!==false,"On in new conversations",function(b){c.on=!(c.on!==false);b.setAttribute("aria-checked",String(c.on!==false));save();paintAll();});k.appendChild(s1);k.appendChild(mk("span","small muted","on in conversations"));
    var tk=mk("button","btn small ghost","Tools…");tk.type="button";tk.onclick=function(){detailSheet(c);};k.appendChild(tk);row.appendChild(k);list.appendChild(row);});}
(function wrapPlus(){var o=W.paintPlus;if(typeof o!=="function")return;W.paintPlus=paintPlus=function(view){var m=$("chatPlusMenu");
    if(view==="connectors"&&m){m.innerHTML="";pmItem(m,null,"‹ Back","",function(){paintPlus();}).classList.add("pm-back");var c=cur();
      L().forEach(function(x){var on=enabledFor(c,x);var b=pmItem(m,"plug",x.name,x.ok?((x.tools||[]).length+" tools"+(on?" · on here":" · off here")):"not connected: open Settings, Connectors",function(){if(!x.ok){closePlus();go("settings");return;}setFor(c,x.id,!on);paintPlus("connectors");},x.ok?pmSwitch(on):"");});
      if(!L().length)m.appendChild(mk("div","ctx-note","No connector yet. A connector lends the model tools from an outside service (MCP)."));
      m.appendChild(mk("div","pm-sep"));pmItem(m,"plug","Add a connector…","A server's MCP address",function(){closePlus();addSheet();});return;}
    var r=o.apply(this,arguments);
    try{if(!view&&m){var after=m.querySelector('.pm-item[data-k="plug"]'),c2=cur(),n=L().filter(function(x){return enabledFor(c2,x);}).length;
        var holder=mk("div");var it=pmItem(holder,"plug","Connectors",L().length?(n?n+" on in this conversation":"none on here"):"Tools from outside services (optional)",function(){paintPlus("connectors");},'<span class="pm-arw">›</span>');it.setAttribute("data-k","connectors");
        if(after&&after.parentNode)after.parentNode.insertBefore(it,after.nextSibling);else m.appendChild(it);}}catch(e){warn(e);}
    return r;};})();
function paintPanel(){var h=$("ccPanel");if(!h)return;var envSec=h.querySelector('section[data-sec="session"]');if(!envSec)return;var old=h.querySelector('section[data-sec="connectors"]');if(old)old.remove();
  var S=mk("section","ccp-sec");S.setAttribute("data-sec","connectors");S.appendChild(mk("div","ccp-hd","Connectors"));var inner=mk("div","ccp-in cnx");S.appendChild(inner);
  var c=cur();L().forEach(function(x){var r=mk("div","cnx-row"),nm=mk("span","nm");nm.innerHTML="<b>"+escH(x.name)+"</b> · "+(x.ok?(x.tools||[]).length+" tools":"not connected");r.appendChild(nm);
    if(x.ok)r.appendChild(sw(enabledFor(c,x),"Use "+x.name+" in this session",function(b){setFor(c,x.id,!enabledFor(c,x));}));inner.appendChild(r);});
  if(!L().length)inner.appendChild(mk("div","ccp-empty","Tools from outside services (MCP), as Claude's connectors. None yet."));
  var k=mk("div","cnx-keys");var b=mk("button","btn small ghost",L().length?"Add another":"Add a connector");b.type="button";b.onclick=function(){addSheet();};k.appendChild(b);
  if(L().length){var m2=mk("button","btn small ghost","Manage");m2.type="button";m2.onclick=function(){try{go("settings");setTimeout(function(){var cd=$("cnCard");if(cd){try{if(W.IngRooms&&IngRooms.reveal)IngRooms.reveal(cd);}catch(_){}cd.scrollIntoView({block:"start",behavior:"smooth"});}},150);}catch(e){}};k.appendChild(m2);}
  inner.appendChild(k);envSec.parentNode.insertBefore(S,envSec.nextSibling);}
function watchPanel(){var h=$("ccPanel");if(!h||h.__cnx)return;h.__cnx=1;try{new MutationObserver(function(){if(h.querySelector('section[data-sec="session"]')&&!h.querySelector('section[data-sec="connectors"]'))paintPanel();}).observe(h,{childList:true,subtree:true});}catch(e){}paintPanel();}
function paintAll(){try{paintCard();}catch(e){warn(e);}try{paintPanel();}catch(e){}}

/* ================= 7b. the Guide ================= */
function guideCard(){var page=$("page-guide");if(!page||$("cnGuide"))return;var c=mk("div","card blx-guide");c.id="cnGuide";
  c.innerHTML='<h3>Connectors</h3><p class="small muted" style="margin-top:0">Tools from outside services that the model can use while it answers, in Chat and in Code, as Claude\'s connectors.</p>';
  var dl=mk("dl");function row(t,d){dl.appendChild(mk("dt",null,t));dl.appendChild(mk("dd",null,d));}
  row("What one is","A server that speaks MCP (the Model Context Protocol) over HTTP. It offers tools: search a service, read a record, make one. Many services publish one; its address usually ends in /mcp.");
  row("Adding one","Settings, Connectors, Add a connector (or the + menu, or the Code session's column). Give its name, its address, and a token if it asks for one: the token is kept on this device and sent only to that server.");
  row("Where it works","In every conversation, unless you turn it off there: the + menu, Connectors, has a switch for each, and so has the Code session's column. A conversation with a connector on can use its tools even with no files.");
  row("Your yes","A tool that only reads runs when the model asks for it. A tool that changes something asks you first: Allow once, Always allow it, or Not now. Each use is a step under the reply.");
  row("What it cannot do yet","A server that only takes its provider's own sign-in page needs a token instead. A server run as a program on this computer (stdio) is not started by Ingenium. In a plain browser, a server that refuses pages from elsewhere cannot be reached; the Mac and Windows apps carry the request themselves.");
  c.appendChild(dl);var anchor=$("ghxGuide")||$("blxGuide")||$("guideEffortCard")||page.querySelector(".card:last-of-type");if(anchor&&anchor.parentNode)anchor.parentNode.insertBefore(c,anchor.nextSibling);else page.appendChild(c);}

/* ================= 8. start ================= */
function boot(){try{register();}catch(e){warn(e);}try{paintCard();}catch(e){}try{watchPanel();}catch(e){}try{guideCard();}catch(e){}}
if(D.readyState==="loading")D.addEventListener("DOMContentLoaded",boot);else boot();
(function later(){var n=0;(function wait(){if(W.__ingReady===true){boot();var k=0;(function again(){watchPanel();if(++k<40&&!($("ccPanel")&&$("ccPanel").__cnx))setTimeout(again,1500);})();return;}if(++n<400)setTimeout(wait,500);})();})();
(function wrapGo(){var og=W.go;if(typeof og!=="function"||og.__r220)return;var ng=function(p){var r=og.apply(this,arguments);try{if(p==="settings")paintCard();if(p==="guide")guideCard();}catch(e){}return r;};
  try{Object.keys(og).forEach(function(k){ng[k]=og[k];});}catch(e){}ng.__r220=true;W.go=go=ng;})();
W.IngConnectors={list:L,add:add,test:test,remove:remove,call:function(id,tool,args){var c=byId(id);return c?call(c,tool,args):Promise.reject(new Error("No such connector."));},
  activeFor:activeFor,namesFor:namesFor,enabledFor:enabledFor,setFor:setFor,sheet:addSheet,detail:detailSheet,register:register,toolName:tname,_sess:SESS};
})();
;try{window.__ingParts["p220"]="running";}catch(_){}
</script>
