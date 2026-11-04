<style id="r216-css">
/* ============ R216 · HER LIST OF 4 NOVEMBER: INGENIUM'S OWN POP-UPS, AND DOCUMENTS IN A CHAT THAT OPEN (Ingenium 6.11.1) ============
   Her words (4 November 2026): "Ingenium's in app popups look weird in this random basic dark gray format and completely detracts
   from the rest of the app, please redesign these popups all over the app that are the same dark grey and match them to Ingenium's
   colour palette and animated popped out 3D look and animation"; and "The documents uploaded inside of the chats of Ingenium are not
   clickable or offer a preview when you hover over it, the HTML single file is clickable but not the documents, please fix that."
   The grey box is the browser's own (window.prompt, confirm and alert, drawn by the Mac app's web view). Every one the page used is now
   asked in Ingenium's own dialog (the raised amethyst card of modules/r137.js, with its spring), through ingConfirm, ingPromptThen,
   ingChoose and ingAlert below; build_page.py and modules r115, r131, r188 and r215 call them. */
.ing-ask .ing-ask-keys .btn{min-width:84px}
/* a question asked from inside another dialog (Fontes, the earlier desks) opens over it, and leaves it as it was */
.ing-dlg-root{position:fixed;top:0;right:0;bottom:0;left:0;z-index:900;display:flex;align-items:center;justify-content:center;padding:20px;background:rgba(20,12,30,.30)}
body[data-theme="night"] .ing-dlg-root{background:rgba(9,6,15,.5)}
.ing-dlg-root > .ing-dlg-card{width:min(460px,100%);max-height:88vh;overflow:auto;box-sizing:border-box;animation:rcIn .46s cubic-bezier(.22,.8,.3,1) both}
body[data-motion="minimal"] .ing-dlg-root > .ing-dlg-card,body.calm .ing-dlg-root > .ing-dlg-card{animation:none}
.ing-ask.ing-note p{white-space:pre-wrap}
/* a document in a message: a key that opens it, and a card that shows its first lines */
button.msg-file.r216-doc{cursor:pointer;display:inline-flex;align-items:center;gap:5px}
button.msg-file.r216-doc .op{color:var(--accent,#6a3fb5);font-weight:700}
.r216-peek{position:fixed;z-index:660;width:min(380px,calc(100vw - 20px));max-height:280px;overflow:hidden;padding:11px 13px 12px;border-radius:12px;
  background:var(--surface,#fff);border:1px solid var(--accent-soft,rgba(106,63,181,.35));box-shadow:0 2px 0 rgba(40,22,68,.08),0 12px 28px rgba(40,22,68,.18);
  font:12.5px/1.5 var(--sans,system-ui,sans-serif);color:var(--ink-2);pointer-events:none;animation:r216In .14s ease-out}
.r216-peek[hidden]{display:none}
.r216-peek b{display:block;color:var(--ink-1);font-size:13px;margin-bottom:2px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.r216-peek .meta{color:var(--ink-3);font-size:11.5px;margin-bottom:6px}
.r216-peek pre{margin:0;white-space:pre-wrap;word-break:break-word;font:12px/1.5 var(--sans,system-ui,sans-serif);color:var(--ink-2);max-height:200px;overflow:hidden;
  -webkit-mask-image:linear-gradient(#000 70%,transparent);mask-image:linear-gradient(#000 70%,transparent)}
.r216-peek pre.code{font:11.5px/1.5 ui-monospace,"SF Mono",Menlo,Consolas,monospace}
body[data-theme="night"] .r216-peek{background:#241d31;border-color:rgba(205,184,240,.2);box-shadow:0 2px 0 rgba(0,0,0,.5),0 12px 28px rgba(0,0,0,.5)}
@keyframes r216In{from{opacity:0;transform:translateY(4px)}to{opacity:1;transform:none}}
body[data-motion="minimal"] .r216-peek,body.calm .r216-peek{animation:none}
</style>
<script>try{(window.__ingParts=window.__ingParts||{})["p216"]="started";}catch(_){}
(function r216(){
"use strict";
if(window.__r216)return;window.__r216=1;
var W=window;
function $id(i){return document.getElementById(i);}
function mk(tag,cls,txt){var e=document.createElement(tag);if(cls)e.className=cls;if(txt!=null)e.textContent=txt;return e;}

/* ================= 1. Ingenium's own pop-ups ================= */
/* the dialog's frame (#modalBox) when it is free; a layer over it when another dialog holds it, so that one stays as it was */
function stacked(html){var root=$id("modalRoot");
  if(!root||!root.classList.contains("open")){var box=modalOpen(html),fns=[];
    try{var mo=new MutationObserver(function(){if(!root.classList.contains("open")||!box.contains(box.__key)){mo.disconnect();fns.forEach(function(f){f();});}});mo.observe(root,{attributes:true,attributeFilter:["class"],childList:true,subtree:true});}catch(e){}
    return {box:box,close:function(){try{closeModal();}catch(e){}},closed:function(f){fns.push(f);}};}
  var r=mk("div","ing-dlg-root"),card=mk("div","modal ing-dlg-card"),fns2=[],gone=false;card.setAttribute("role","dialog");card.setAttribute("aria-modal","true");card.innerHTML=html;r.appendChild(card);document.body.appendChild(r);
  function close(){if(gone)return;gone=true;if(r.parentNode)r.remove();document.removeEventListener("keydown",kd,true);}
  function kd(e){if(e.key==="Escape"){e.preventDefault();e.stopPropagation();close();fns2.forEach(function(f){f();});}}
  document.addEventListener("keydown",kd,true);r.addEventListener("mousedown",function(e){if(e.target===r){close();fns2.forEach(function(f){f();});}});
  return {box:card,close:close,closed:function(f){fns2.push(f);}};}
/* ingAsk({title, text, yes, no, danger}) -> true or false, in either place */
function ingAsk2(o){o=o||{};return new Promise(function(res){var done=false,d;function end(v){if(done)return;done=true;try{d.close();}catch(e){}res(v);}
  try{d=stacked('<div class="ing-ask"><h3></h3><p></p><div class="ing-ask-keys"></div></div>');}catch(e){res(W.confirm(o.text||o.title));return;}
  var box=d.box;box.querySelector("h3").textContent=o.title||"";var pp=box.querySelector("p");if(o.text)pp.textContent=o.text;else pp.remove();var k=box.querySelector(".ing-ask-keys");
  var no=mk("button","btn ghost",o.no||"Keep it");no.type="button";no.onclick=function(){end(false);};var yes=mk("button","btn primary"+(o.danger?" ing-danger":""),o.yes||"Yes");yes.type="button";yes.onclick=function(){end(true);};
  k.appendChild(no);k.appendChild(yes);box.__key=yes;d.closed(function(){end(false);});setTimeout(function(){try{yes.focus();}catch(e){}},60);});}
/* ingPrompt({title, text, value, yes, empty}) -> the words written, or null */
function ingPrompt2(o){o=o||{};return new Promise(function(res){var done=false,d;function end(v){if(done)return;done=true;try{d.close();}catch(e){}res(v);}
  try{d=stacked('<div class="ing-ask"><h3></h3><p></p><input type="text" class="ing-ask-in" maxlength="300"><div class="ing-ask-keys"></div></div>');}catch(e){res(null);return;}
  var box=d.box;box.querySelector("h3").textContent=o.title||"";var pp=box.querySelector("p");if(o.text)pp.textContent=o.text;else pp.remove();
  var inp=box.querySelector("input");inp.value=o.value==null?"":String(o.value);if(o.placeholder)inp.placeholder=o.placeholder;inp.setAttribute("aria-label",o.title||"Name");
  var k=box.querySelector(".ing-ask-keys"),no=mk("button","btn ghost",o.no||"Cancel");no.type="button";no.onclick=function(){end(null);};
  var yes=mk("button","btn primary",o.yes||"Keep it");yes.type="button";yes.onclick=function(){var v=inp.value.trim();if(!v&&!o.empty){try{inp.focus();}catch(e){}return;}end(v);};
  inp.addEventListener("keydown",function(e){if(e.key==="Enter"){e.preventDefault();yes.click();}else if(e.key==="Escape"){e.preventDefault();e.stopPropagation();end(null);}});
  k.appendChild(no);k.appendChild(yes);box.__key=yes;d.closed(function(){end(null);});setTimeout(function(){try{inp.focus();inp.select();}catch(e){}},60);});}
W.ingAsk=ingAsk2;W.ingPrompt=ingPrompt2;
/* a long question becomes a short title and the rest beneath it */
function split(q){q=String(q==null?"":q).trim();if(q.length<=80)return {title:q,text:""};
  var m=/^(.{20,120}?[.?:!])\s+([\s\S]+)$/.exec(q);return m?{title:m[1],text:m[2]}:{title:q.slice(0,80)+"…",text:q};}
/* ingConfirm(question, onYes, {yes, no, danger, text}) -> a promise of true or false; onYes runs on yes */
function ingConfirm(q,yes,o){o=o||{};var t=split(q);
  var ask=W.ingAsk?W.ingAsk({title:t.title,text:o.text||t.text,yes:o.yes||(o.danger===false?"Yes":"Yes, do it"),no:o.no||"Keep it",danger:o.danger!==false}):Promise.resolve(W.confirm(String(q)));
  return Promise.resolve(ask).then(function(ok){if(ok&&typeof yes==="function")yes();return !!ok;});}
/* ingPromptThen(question, value, onWords, {empty}) -> fn runs with the words written (empty allowed when empty:true), never on Cancel */
function ingPromptThen(q,v,fn,o){o=o||{};var t=split(q);
  var p=W.ingPrompt?W.ingPrompt({title:t.title,text:t.text,value:v,empty:!!o.empty,yes:o.yes||"Keep it"}):Promise.resolve(W.prompt(String(q),v==null?"":String(v)));
  return Promise.resolve(p).then(function(w){if(w===null||w===undefined)return null;if(typeof fn==="function")fn(String(w));return w;});}
/* ingChoose({title, text, choices:[{label, value, primary}]}) -> the value chosen, or null when closed */
function ingChoose(o){o=o||{};return new Promise(function(res){var done=false,d;function end(v){if(done)return;done=true;try{d.close();}catch(e){}res(v);}
  var box;try{d=stacked('<div class="ing-ask"><h3></h3><p></p><div class="ing-ask-keys"></div></div>');box=d.box;}catch(e){res(null);return;}
  box.querySelector("h3").textContent=o.title||"";var pp=box.querySelector("p");if(o.text)pp.textContent=o.text;else pp.remove();var k=box.querySelector(".ing-ask-keys"),first=null,prim=null;
  var no=mk("button","btn ghost",o.cancel||"Not now");no.type="button";no.onclick=function(){end(null);};k.appendChild(no);
  (o.choices||[]).forEach(function(c){var b=mk("button","btn "+(c.primary?"primary":"ghost"),c.label);b.type="button";b.onclick=function(){end(c.value);};k.appendChild(b);if(!first)first=b;if(c.primary)prim=b;});
  box.__key=no;d.closed(function(){end(null);});setTimeout(function(){try{(prim||first||no).focus();}catch(e){}},60);});}
/* ingAlert(text or {title, text}) -> a promise, resolved when it is closed */
function ingAlert(o){if(typeof o!=="object"||!o)o={text:String(o==null?"":o)};var t=o.title?{title:o.title,text:o.text||""}:split(o.text);
  return new Promise(function(res){var done=false,d;function end(){if(done)return;done=true;try{d.close();}catch(e){}res();}
    var box;try{d=stacked('<div class="ing-ask ing-note"><h3></h3><p></p><div class="ing-ask-keys"></div></div>');box=d.box;}catch(e){try{W.__r216alert(String(o.text||o.title||""));}catch(_){}res();return;}
    box.querySelector("h3").textContent=t.title;var pp=box.querySelector("p");if(t.text)pp.textContent=t.text;else pp.remove();
    var ok=mk("button","btn primary","OK");ok.type="button";ok.onclick=end;box.querySelector(".ing-ask-keys").appendChild(ok);box.__key=ok;d.closed(end);setTimeout(function(){try{ok.focus();}catch(e){}},60);});}
W.ingConfirm=ingConfirm;W.ingPromptThen=ingPromptThen;W.ingChoose=ingChoose;W.ingAlert=ingAlert;
/* a notice the page shows with window.alert comes in Ingenium's dialog too (an alert answers nothing, so nothing waits on it) */
W.__r216alert=W.alert;W.alert=function(m){try{ingAlert(String(m==null?"":m));}catch(e){try{W.__r216alert(m);}catch(_){}}};

/* ================= 1b. the same, inside the apps Ingenium carries (Tabula, Abacus, Imago, Scriba, Fontes) ================= */
/* Their code asks with the browser's alert, confirm and prompt about a hundred and twenty times, in many shapes (two questions inside
   one sum, a question inside a try). This layer, put first into each app's frame (modules/r118.js), answers in Ingenium's own dialog
   without changing their code: a notice is shown and nothing waits on it; a question stops the app's handler where it asks (as
   pressing Cancel would, but before anything after it runs), asks in the dialog, and, once she answers, puts back the selection she
   had and repeats the press or key that asked, so the app's own code runs again and receives her answer at that point. Cancel
   repeats nothing. With no press to repeat (a question asked by a timer), the browser's own box is used. */
W.IngDialogShim='(function(){if(window.__ingDlg)return;window.__ingDlg=1;var W=window,D=document,A0=W.alert,C0=W.confirm,P0=W.prompt,last=null,answers=null,showing=0,justThrew=0;'+
  '["click","keydown","change","submit"].forEach(function(t){D.addEventListener(t,function(e){if(e.isTrusted)last={type:t,target:e.target,ev:e};},true);});'+
  'function css(){if(D.getElementById("ing-dlg-css"))return;var st=D.createElement("style");st.id="ing-dlg-css";st.textContent='+
  '".ing-dlg-scrim{position:fixed;inset:0;z-index:2147483000;display:flex;align-items:center;justify-content:center;background:rgba(20,12,30,.42);animation:ingDlgFade .16s ease-out}"+'+
  '".ing-dlg{box-sizing:border-box;width:min(440px,calc(100vw - 32px));padding:20px 22px 18px;border-radius:16px;background:linear-gradient(#fdfbff,#f6f1fd);color:#221a2e;border:1px solid rgba(106,63,181,.22);"+'+
  '"box-shadow:inset 0 2px 0 rgba(255,255,255,.75),inset 2px 0 0 rgba(255,255,255,.4),0 3px 0 rgba(106,63,181,.18),0 18px 44px rgba(40,22,68,.30);font:14px/1.5 -apple-system,BlinkMacSystemFont,\\"Segoe UI\\",system-ui,sans-serif;animation:ingDlgPop .22s cubic-bezier(.34,1.4,.64,1)}"+'+
  '".ing-dlg h3{margin:0 0 8px;font:600 17px/1.3 Georgia,\\"Times New Roman\\",serif;color:#221a2e;white-space:pre-wrap}.ing-dlg p{margin:0 0 12px;color:#4a4358;white-space:pre-wrap}"+'+
  '".ing-dlg input{display:block;width:100%;box-sizing:border-box;margin:0 0 14px;padding:9px 11px;border-radius:10px;border:1px solid rgba(34,26,46,.22);background:#fff;color:#221a2e;font:14px/1.4 inherit;box-shadow:inset 0 1px 2px rgba(40,22,68,.06)}"+'+
  '".ing-dlg input:focus{outline:none;border-color:#6a3fb5;box-shadow:0 0 0 3px rgba(106,63,181,.16)}.ing-dlg .k{display:flex;justify-content:flex-end;gap:8px;flex-wrap:wrap}"+'+
  '".ing-dlg button{min-width:84px;padding:8px 16px;border-radius:11px;border:1px solid rgba(34,26,46,.16);background:linear-gradient(#ffffff,#f1ecf8);color:#221a2e;font:600 13.5px/1.2 inherit;cursor:pointer;box-shadow:inset 0 1px 0 #fff,0 2px 0 rgba(40,22,68,.14);transition:transform .12s cubic-bezier(.34,1.3,.64,1)}"+'+
  '".ing-dlg button:hover{transform:translateY(-1px)}.ing-dlg button:active{transform:translateY(1px);box-shadow:inset 0 1px 2px rgba(40,22,68,.2)}"+'+
  '".ing-dlg button.ok{background:linear-gradient(#7348be,#5d37a1);color:#fff;border-color:#4b2a86;box-shadow:inset 0 1px 0 rgba(255,255,255,.25),0 2px 0 #3d2270}"+'+
  '".ing-dlg button:focus-visible{outline:2px solid #6a3fb5;outline-offset:2px}"+'+
  '"html.cd-dark .ing-dlg-scrim{background:rgba(9,6,15,.62)}html.cd-dark .ing-dlg{background:linear-gradient(#2d2540,#241d31);color:#f3eefb;border-color:rgba(205,184,240,.18);box-shadow:inset 0 2px 0 rgba(255,255,255,.08),0 3px 0 rgba(0,0,0,.5),0 18px 44px rgba(0,0,0,.55)}"+'+
  '"html.cd-dark .ing-dlg h3{color:#f3eefb}html.cd-dark .ing-dlg p{color:#d3c9e3}html.cd-dark .ing-dlg input{background:#1d1728;border-color:rgba(205,184,240,.22);color:#f3eefb}"+'+
  '"html.cd-dark .ing-dlg button{background:linear-gradient(#3a3050,#2e2640);color:#f3eefb;border-color:rgba(205,184,240,.2);box-shadow:inset 0 1px 0 rgba(255,255,255,.08),0 2px 0 rgba(0,0,0,.5)}html.cd-dark .ing-dlg button.ok{background:linear-gradient(#8a63d2,#6a3fb5);border-color:#b79ce6}"+'+
  '"@keyframes ingDlgPop{from{opacity:0;transform:translateY(8px) scale(.96)}to{opacity:1;transform:none}}@keyframes ingDlgFade{from{opacity:0}to{opacity:1}}"+'+
  '"@media (prefers-reduced-motion:reduce){.ing-dlg,.ing-dlg-scrim{animation:none}}";(D.head||D.documentElement).appendChild(st);}'+
  'function show(kind,msg,def){css();showing++;return new Promise(function(res){var sc=D.createElement("div");sc.className="ing-dlg-scrim";var bx=D.createElement("div");bx.className="ing-dlg";bx.setAttribute("role",kind==="alert"?"alertdialog":"dialog");bx.setAttribute("aria-modal","true");'+
  'var m=String(msg==null?"":msg),i=m.search(/[.?:!]\\s/),h=D.createElement("h3"),p=null;if(m.length>90&&i>15&&i<120){h.textContent=m.slice(0,i+1);p=D.createElement("p");p.textContent=m.slice(i+2);}else h.textContent=m;bx.appendChild(h);if(p)bx.appendChild(p);'+
  'var inp=null;if(kind==="prompt"){inp=D.createElement("input");inp.type="text";inp.value=def==null?"":String(def);inp.setAttribute("aria-label",m.slice(0,80));bx.appendChild(inp);}'+
  'var k=D.createElement("div");k.className="k";var no=null;if(kind!=="alert"){no=D.createElement("button");no.type="button";no.textContent="Cancel";k.appendChild(no);}var ok=D.createElement("button");ok.type="button";ok.className="ok";ok.textContent="OK";k.appendChild(ok);bx.appendChild(k);sc.appendChild(bx);'+
  'var done=false;function end(v){if(done)return;done=true;showing--;D.removeEventListener("keydown",kd,true);sc.remove();res(v);}'+
  'function kd(e){if(e.key==="Escape"){e.preventDefault();e.stopPropagation();end(kind==="alert"?undefined:(kind==="confirm"?false:null));}else if(e.key==="Enter"&&(kind!=="confirm"||D.activeElement!==no)){e.preventDefault();e.stopPropagation();ok.click();}}'+
  'D.addEventListener("keydown",kd,true);ok.onclick=function(){end(kind==="prompt"?inp.value:(kind==="confirm"?true:undefined));};if(no)no.onclick=function(){end(kind==="confirm"?false:null);};'+
  '(D.body||D.documentElement).appendChild(sc);setTimeout(function(){try{(inp||ok).focus();if(inp)inp.select();}catch(e){}},30);});}'+
  'W.alert=function(m){if(justThrew)return;show("alert",m,"");};'+
  'function ask(kind,msg,def){var key=kind+"\\u0000"+msg;if(answers&&Object.prototype.hasOwnProperty.call(answers,key))return answers[key];'+
  'if(!last)return kind==="confirm"?C0.call(W,msg):P0.call(W,msg,def);var g=last,A=answers||{},sel=null,act=D.activeElement;try{var s=W.getSelection();if(s&&s.rangeCount){sel=[];for(var i=0;i<s.rangeCount;i++)sel.push(s.getRangeAt(i).cloneRange());}}catch(e){}'+
  'show(kind,msg,def).then(function(v){if((kind==="confirm"&&!v)||(kind==="prompt"&&v===null)){if(!showing)answers=null;return;}A[key]=v;answers=A;replay(g,sel,act);});'+
  'justThrew++;setTimeout(function(){justThrew=0;},0);var err=new Error("Ingenium asks this in its own dialog first");err.__ingDialog=true;throw err;}'+
  'function replay(g,sel,act){var t=g.target;if(!t||!t.isConnected){answers=null;return;}try{if(act&&act.focus&&act!==D.body)act.focus({preventScroll:true});}catch(e){}'+
  'try{if(sel){var s=W.getSelection();s.removeAllRanges();sel.forEach(function(r){s.addRange(r);});}}catch(e){}'+
  'try{var o=g.ev;if(g.type==="click"){t.dispatchEvent(new MouseEvent("click",{bubbles:true,cancelable:true,view:W,detail:1}));}'+
  'else if(g.type==="keydown"){t.dispatchEvent(new KeyboardEvent("keydown",{key:o.key,code:o.code,ctrlKey:o.ctrlKey,metaKey:o.metaKey,shiftKey:o.shiftKey,altKey:o.altKey,bubbles:true,cancelable:true}));}'+
  'else{t.dispatchEvent(new Event(g.type,{bubbles:true,cancelable:true}));}}catch(e){}finally{if(!showing)answers=null;}}'+
  'W.confirm=function(m){return ask("confirm",String(m==null?"":m),"");};W.prompt=function(m,d){return ask("prompt",String(m==null?"":m),d==null?"":String(d));};'+
  'W.addEventListener("error",function(e){if(e&&e.error&&e.error.__ingDialog){e.preventDefault();e.stopImmediatePropagation();}},true);'+
  'W.addEventListener("unhandledrejection",function(e){if(e&&e.reason&&e.reason.__ingDialog)e.preventDefault();});})();';

/* ================= 2. a document in a message opens, and shows its first lines on hover ================= */
var CODE_EXT=/\.(js|mjs|cjs|ts|tsx|jsx|py|rb|php|java|kt|swift|go|rs|c|h|cpp|hpp|cc|cs|sh|bash|zsh|ps1|sql|json|xml|yaml|yml|toml|ini|cfg|css|scss|less|r|m|pl|lua|dart|vue|svelte)$/i;
var LANG={js:"javascript",mjs:"javascript",cjs:"javascript",ts:"typescript",tsx:"tsx",jsx:"jsx",py:"python",rb:"ruby",sh:"bash",bash:"bash",zsh:"bash",yml:"yaml",cs:"csharp",kt:"kotlin",rs:"rust",md:"markdown"};
function blockOf(mm){if(typeof mm.attach==="string")return Promise.resolve(mm.attach);if(mm.attachRef){try{return Promise.resolve(IngBig.load(mm.attachRef)).then(function(t){return typeof t==="string"?t:"";});}catch(e){}}return Promise.resolve("");}
/* the text of one file in the block a message carries: <file name="...">\n…\n</file> */
function textIn(block,name){var nm=String(name).replace(/"/g,"'"),open='<file name="'+nm+'">\n',i=block.indexOf(open);if(i<0)return null;i+=open.length;
  var j=block.indexOf("\n</file>",i);var t=j<0?block.slice(i):block.slice(i,j);
  return t.replace(/\n\[the rest of this file was left out: it is very long\]$/,"\n\n(The rest of this file was left out of the chat: it is very long.)");}
function docText(mm,f){return blockOf(mm).then(function(b){return b?textIn(b,f.name):null;});}
function asMarkdown(f,t){var ext=(/\.([a-z0-9]+)$/i.exec(f.name)||[])[1]||"";
  if(/^(md|markdown)$/i.test(ext))return t;
  if(CODE_EXT.test(f.name))return "```"+(LANG[ext.toLowerCase()]||ext.toLowerCase())+"\n"+t+"\n```";
  if(/^(csv|tsv)$/i.test(ext))return "```\n"+t+"\n```";
  /* prose (a Word document, a PDF's text, plain text): its paragraphs as they are; a line starting with # or > is kept as words */
  return t.split(/\n/).map(function(l){return l.replace(/^(\s*)([#>]|\d+\.\s|[-*+]\s)/,"$1\\$2");}).join("\n");}
function openDoc(mm,f){docText(mm,f).then(function(t){if(t==null){try{ingToast("This file's words are no longer kept in this conversation.");}catch(e){}return;}
  var md=asMarkdown(f,t);try{csShow({kind:"doc",html:mkDocPage(f.name,md),name:f.name,md:md,docTitle:f.name},{user:true});}catch(e){try{ingToast("It could not be opened here: "+(e&&e.message||e));}catch(_){}}});}
var peek=null,peekT=null,peekFor=null;
function showPeek(btn,mm,f){clearTimeout(peekT);peekFor=btn;peekT=setTimeout(function(){docText(mm,f).then(function(t){if(peekFor!==btn||t==null)return;
    if(!peek){peek=mk("div","r216-peek");peek.id="r216Peek";peek.setAttribute("role","tooltip");peek.hidden=true;document.body.appendChild(peek);}
    peek.innerHTML="";peek.appendChild(mk("b",null,f.name));var words=(t.match(/\S+/g)||[]).length;
    peek.appendChild(mk("div","meta",(f.chars?fmtSafe(f.chars)+" · ":"")+words.toLocaleString("en-GB")+" word"+(words===1?"":"s")+" · press to open it beside the chat"));
    var pre=mk("pre",CODE_EXT.test(f.name)?"code":null,t.slice(0,900));peek.appendChild(pre);peek.hidden=false;
    try{var r=btn.getBoundingClientRect(),w=peek.offsetWidth||380,h=peek.offsetHeight||200,left=Math.max(8,Math.min(r.left,innerWidth-w-8)),top=r.bottom+8;if(top+h>innerHeight-8)top=Math.max(8,r.top-h-8);
      peek.style.left=Math.round(left)+"px";peek.style.top=Math.round(top)+"px";}catch(e){}btn.setAttribute("aria-describedby","r216Peek");});},280);}
function hidePeek(){clearTimeout(peekT);peekFor=null;if(peek)peek.hidden=true;}
function fmtSafe(n){try{return fmtBytes(n);}catch(e){return n+" characters";}}
function upgrade(d,mm){if(!mm||!mm.files||!mm.files.length||!(mm.attach||mm.attachRef))return;var fl=d.querySelector(".msg-files");if(!fl)return;
  var chips=[].slice.call(fl.children);mm.files.forEach(function(f,i){var c=chips[i];if(!c||f.page||c.tagName==="BUTTON")return;
    var b=mk("button","msg-file r216-doc");b.type="button";b.textContent=c.textContent;b.appendChild(mk("span","op","▸ Open"));
    b.title="";b.setAttribute("aria-label","Open "+f.name+" beside the chat");
    b.onclick=function(e){e.stopPropagation();hidePeek();openDoc(mm,f);};
    b.addEventListener("mouseenter",function(){showPeek(b,mm,f);});b.addEventListener("mouseleave",hidePeek);
    b.addEventListener("focus",function(){showPeek(b,mm,f);});b.addEventListener("blur",hidePeek);
    fl.replaceChild(b,c);});}
function keepMarks(n,o){try{Object.keys(o).forEach(function(k){if(/^__r\d+$/.test(k)&&n[k]===undefined)n[k]=o[k];});}catch(e){}return n;}
function hook(){if(typeof W.fillMsg==="function"&&!W.fillMsg.__r216){var of=W.fillMsg;W.fillMsg=function(d,mm){of.apply(this,arguments);try{upgrade(d,mm);}catch(e){}};keepMarks(W.fillMsg,of);W.fillMsg.__r216=1;}}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",hook);else hook();
window.addEventListener("load",function(){hook();setTimeout(hook,1600);});
document.addEventListener("scroll",hidePeek,true);
W.IngR216={split:split,textIn:textIn,asMarkdown:asMarkdown,openDoc:openDoc};
})();
;try{window.__ingParts["p216"]="running";}catch(_){}
</script>
