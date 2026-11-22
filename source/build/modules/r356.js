<style id="r356-css">
/* ============ R356 · YOUR APPS' CODE SCRAMBLED (Ingenium 7.67, 22 November 2026) ============
   The Security room's promise (modules/r318.js, approved on the live preview of 18 November 2026): "The shipped code shrunk and its
   names scrambled: much slower to read or copy, never impossible. Your sources stay as you wrote them." Her request (18 November
   2026): "my data is protected and also my code is protected and anything that I build inside of Ingenium"; her answers that day named
   her code "signed and tamper-evident, scrambled". Her choice (21 November 2026), of the three protections approved and not yet built:
   "Scrambled code", then "Keep going with the scramble code please." Shown to her as eight pictures one by one at full size
   (previews/scramble), and her word (22 November 2026): "I approve of the previews, please commit and push it everywhere and continue
   working on my requests." Her approval came before the pictures reached her; asked again once she had them: "Yes, release 7.67".
   - Package details (Fabrica, Ship), where there is a Fabrica: Scrambled code, on for every app unless she turns it off for one. Ingenium
     itself is never scrambled (its copy stays as she wrote it, and its own release signature is over that code).
   - Every package made from the app's page (the one page, the download, the APK, the IPA, the Mac and Windows apps, the build kits, the
     web app, a release's attachments, an app sent to her devices) carries its code scrambled: each script of the page (none with src,
     none of another type) shrunk and the names inside it scrambled by Terser (build/terser, BSD-2-Clause), in a worker so the window
     stays free; comments go, but a licence or copyright note and a build's marker (one word in capitals) stay; strings keep their own
     quotes, so a version written in the code reads as before. The names the parts of a page share with one another, and those its
     markup calls, stay as written, so the app keeps working; everything inside them is scrambled.
   - The pages an app carries packed inside it (Carpe Diem its own page and The Forge's, The Forge the Desk's five apps: written in
     base64, gzipped or not) are opened, scrambled the same way and packed again as they were, three levels deep. Data of any other
     kind (JSON, pictures) stays as it is.
   - Before anything is made, the scrambled copy is run in a quiet window beside the one she wrote (Fabrica's own test window,
     IngShip._.quietRun), and so is each page it carries; one that shows an error the one she wrote does not, or whose version reads
     differently, and the package carries her code as written, and Ingenium says so. A script the scrambler cannot read is left as
     written, and Ingenium says how many.
   - The code is scrambled before the door of an app for its owner alone (r354) is written in and before the page is signed (r349),
     so the signature is over the code as shipped. Run, a version opened apart and Fabrica's own measures are never scrambled.
   - The Ship card: a Scrambled chip on what was made scrambled, and the package's line says so. The Security room: its state and
     words. A copy without Fabrica says Off, and why, without naming it.
   window.IngScramble: ships(id, opt), wanted(id), onePage(id, x, opt), page(html), packageRow(box, r, pref), lineFor(id),
   madeNote(notes, k), state(), well(chip) */
.r356-row[disabled] .tr{opacity:.45}
</style>
<script>try{(window.__ingParts=window.__ingParts||{})["p356"]="started";}catch(_){}
/* R356 · your apps' code scrambled: see the note at the top of its styles */
(function r356(){
"use strict";
var W=window,D=document,TE=new TextEncoder();
if(W.IngScramble||!W.IngShip)return;
var ENGINE="Terser 5.51.2";
function esc(s){return String(s==null?"":s).replace(/[&<>"']/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c];});}
function toast(m){try{if(typeof W.ingToast==="function")W.ingToast(m);else if(typeof W.toast==="function")W.toast(m);}catch(e){}}
function fabrica(){return !!D.getElementById("page-fabrica");}
function libEl(){return D.getElementById("ing-terser");}
function FBS(){try{return W.fbHubHost&&fbHubHost.FBS?fbHubHost.FBS():null;}catch(e){return null;}}
function prefs(){var f=FBS();return (f&&f.ship)||{};}
function repos(){try{return (W.fbHubHost&&fbHubHost.C&&fbHubHost.C.repos)||[];}catch(e){return [];}}
function repoOf(id){return repos().filter(function(r){return r&&r.id===id;})[0]||null;}
function nameOf(id,x){var r=repoOf(id);return (x&&x.recipe&&x.recipe.name)||(r&&r.name)||"This app";}
/* Ingenium itself, as Fabrica knows it (r178's own test): never scrambled */
function isIngenium(id,html){var r=repoOf(id);if(r&&r.app==="ingenium")return true;var h=String(html||"");return h.indexOf("var ING_EDITION")>=0&&h.indexOf("__ingParts")>=0;}
function wanted(id){if(!fabrica()||!libEl())return false;var r=repoOf(id);if(r&&r.app==="ingenium")return false;return (prefs()[id]||{}).scramble!==false;}
function keyOf(opt){opt=opt||{};return String(opt.target||opt.ship||"");}
function ships(id,opt){return !!keyOf(opt)&&wanted(id);}

/* ---------- the scrambler: Terser, carried deflated in the page (build_page.py), run in a worker, else in the page ---------- */
function b64bytes(s){var b=atob(s),u=new Uint8Array(b.length);for(var i=0;i<b.length;i++)u[i]=b.charCodeAt(i);return u;}
function bytesB64(u8){var s="";for(var i=0;i<u8.length;i+=32768)s+=String.fromCharCode.apply(null,u8.subarray(i,i+32768));return btoa(s);}
function streamAll(u8,ts){return new Response(new Blob([u8]).stream().pipeThrough(ts)).arrayBuffer().then(function(b){return new Uint8Array(b);});}
var LIB=null;
function libText(){if(LIB)return Promise.resolve(LIB);var el=libEl();if(!el)return Promise.reject(new Error("this copy of Ingenium carries no scrambler"));
  var z=b64bytes(el.textContent.replace(/\s+/g,"")),size=+el.getAttribute("data-bytes")||0,R=W.IngRepo&&IngRepo.core,p=null;
  try{if(R&&typeof R.inflateZ==="function")p=Promise.resolve(R.inflateZ(z,0,size).data);}catch(e){p=null;}
  if(!p){if(typeof DecompressionStream!=="function")return Promise.reject(new Error("this window cannot unpack the scrambler"));p=streamAll(z,new DecompressionStream("deflate"));}
  return p.then(function(b){if(size&&b.length>size)b=b.subarray(0,size);if(size&&b.length!==size)throw new Error("the scrambler came out at the wrong size");LIB=new TextDecoder().decode(b);return LIB;});}
/* what is kept of the comments: a licence or copyright note, and a build's marker (one word in capitals, as strip_comments.js keeps) */
function keepComment(n,c){var v=String(c&&c.value||"");return /@license|@preserve|@cc_on|^\s*!|copyright|\(c\)\s*(19|20)\d\d|SPDX-License|licensed under|all rights reserved/i.test(v)||/^\s*[A-Z][A-Z0-9_]*\s*$/.test(v);}
/* one script: shrunk, and the names inside it scrambled; nothing else of it changes (no compression of its logic), its strings keep their quotes */
function scrambleOne(T,it){return T.minify_sync(it.code,{compress:false,mangle:true,module:!!it.module,format:{comments:keepComment,quote_style:3}}).code;}
function workerMain(){var T=self.Terser;self.onmessage=function(e){var d=e.data,out=[],left=[];for(var i=0;i<d.list.length;i++){try{out.push(scrambleOne(T,d.list[i]));}
  catch(err){out.push(null);left.push({i:i,why:String(err&&err.message||err).slice(0,160)});}}self.postMessage({id:d.id,out:out,left:left});};}
var HELPERS=String(keepComment)+"\n"+String(scrambleOne)+"\n";
var worker=null,off=false,seq=0,wait={};
function makeWorker(){if(worker||off)return Promise.resolve(worker);
  return libText().then(function(L){if(worker||off)return worker;
    try{var u=URL.createObjectURL(new Blob([L+"\n;"+HELPERS+"("+String(workerMain)+")();"],{type:"text/javascript"}));worker=new Worker(u);setTimeout(function(){try{URL.revokeObjectURL(u);}catch(e){}},60000);
      worker.onmessage=function(e){var d=e.data||{},w=wait[d.id];if(!w)return;delete wait[d.id];w.yes(d);};
      worker.onerror=function(e){quit("the worker stopped: "+((e&&e.message)||e));};}
    catch(e){quit(String((e&&e.message)||e));}
    return worker;});}
function quit(why){off=true;try{if(worker)worker.terminate();}catch(_){}worker=null;Object.keys(wait).forEach(function(id){var w=wait[id];delete wait[id];w.no(new Error(why));});}
function viaWorker(list){return makeWorker().then(function(w){if(!w)throw new Error("no worker");return new Promise(function(yes,no){var id=++seq;wait[id]={yes:yes,no:no};w.postMessage({id:id,list:list});});});}
var HERE=null;
function onPage(){if(HERE)return Promise.resolve(HERE);
  return libText().then(function(L){var s=D.createElement("script");
    s.text="(function(){"+L+"\n;"+HELPERS+"window.__ingScr356={T:window.Terser,one:scrambleOne};try{delete window.Terser;}catch(e){window.Terser=undefined;}})();";
    (D.head||D.documentElement).appendChild(s);s.remove();HERE=W.__ingScr356||null;try{delete W.__ingScr356;}catch(e){}
    if(!HERE||!HERE.T)throw new Error("the scrambler did not start");return HERE;});}
function viaPage(list){return onPage().then(function(P){var out=[],left=[],i=0;
  return new Promise(function(res){(function next(){var t=Date.now();
    while(i<list.length&&Date.now()-t<40){try{out.push(P.one(P.T,list[i]));}catch(err){out.push(null);left.push({i:i,why:String((err&&err.message)||err).slice(0,160)});}i++;}
    if(i<list.length)setTimeout(next,0);else res({out:out,left:left});})();});});}
function run(list){if(!list.length)return Promise.resolve({out:[],left:[]});return viaWorker(list).catch(function(){return viaPage(list);});}

/* ---------- a page read as HTML: its scripts, and the pages it carries packed inside ---------- */
var JSTYPE=/^(?:(?:application|text)\/(?:x-)?(?:java|ecma)script|text\/javascript1\.[0-5]|text\/jscript|text\/livescript|module)$/i;
function attr(a,n){var m=new RegExp("(?:^|\\s)"+n+"\\s*=\\s*(?:\"([^\"]*)\"|'([^']*)'|([^\\s\"'>]+))","i").exec(a);return m?(m[1]!=null?m[1]:m[2]!=null?m[2]:m[3]):null;}
function hasAttr(a,n){return new RegExp("(?:^|\\s)"+n+"(?:\\s*=|\\s|$)","i").test(a);}
var OPEN=new RegExp("<!-"+"-|<(script|style|textarea|title|xmp)\\b([^>]*)>","gi"),SHUT="-"+"->";
/* every script element outside comments and the elements whose text is not markup: where its text starts and ends, and its attributes */
function scripts(html){var out=[],m;OPEN.lastIndex=0;
  while((m=OPEN.exec(html))){if(!m[1]){var e=html.indexOf(SHUT,m.index+4);if(e<0)break;OPEN.lastIndex=e+3;continue;}
    var tag=m[1].toLowerCase(),cl=new RegExp("<\\/"+tag+"\\s*>","gi");cl.lastIndex=OPEN.lastIndex;var c=cl.exec(html);if(!c)break;
    if(tag==="script")out.push({a:m[2]||"",s:OPEN.lastIndex,e:c.index});OPEN.lastIndex=c.index+c[0].length;}
  return out;}
/* a page packed inside: base64 of a gzipped page, or of the page itself */
function packedKind(text){if(text.length<100)return null;var t=text.replace(/\s+/g,"");
  if(!/^[A-Za-z0-9+\/]+={0,2}$/.test(t))return null;if(t.slice(0,4)==="H4sI")return "gz";
  if(/^(PCFET0NUWVBF|PCFkb2N0eXBl|PCFET0NUWVBl|PGh0bWw|PEhUTUw)/.test(t))return "b64";return null;}
function gunzipJS(u){var R=W.IngRepo&&IngRepo.core;if(!R||typeof R.inflateRaw!=="function")throw new Error("this window cannot unpack it");
  if(u[0]!==31||u[1]!==139||u[2]!==8)throw new Error("it is not gzipped");var f=u[3],p=10;
  if(f&4)p+=2+(u[p]|(u[p+1]<<8));if(f&8){while(p<u.length&&u[p++]);}if(f&16){while(p<u.length&&u[p++]);}if(f&2)p+=2;
  var n=u.length,size=(u[n-4]|(u[n-3]<<8)|(u[n-2]<<16)|(u[n-1]<<24))>>>0,d=R.inflateRaw(u,p,size).data;return d.length>size?d.subarray(0,size):d;}
function gunzip(u8){if(typeof DecompressionStream==="function"){try{return streamAll(u8,new DecompressionStream("gzip"));}catch(e){}}
  try{return Promise.resolve(gunzipJS(u8));}catch(e){return Promise.reject(e);}}
function gzip(u8){if(typeof CompressionStream==="function"){try{return streamAll(u8,new CompressionStream("gzip"));}catch(e){}}
  var R=W.IngRepo&&IngRepo.core;if(!R||typeof R.deflateZ!=="function"||typeof R.crc32!=="function")return Promise.reject(new Error("this window cannot pack it"));
  return Promise.resolve(R.deflateZ(u8)).then(function(z){var raw=z.subarray(2,z.length-4),c=R.crc32(u8)>>>0,n=u8.length>>>0,out=new Uint8Array(18+raw.length),o=10+raw.length;
    out.set([31,139,8,0,0,0,0,0,0,255]);out.set(raw,10);
    out[o]=c&255;out[o+1]=(c>>>8)&255;out[o+2]=(c>>>16)&255;out[o+3]=(c>>>24)&255;out[o+4]=n&255;out[o+5]=(n>>>8)&255;out[o+6]=(n>>>16)&255;out[o+7]=(n>>>24)&255;return out;});}
function unpack(kind,text){var u=b64bytes(text.replace(/\s+/g,""));
  return (kind==="gz"?gunzip(u):Promise.resolve(u)).then(function(b){var s;try{s=new TextDecoder("utf-8",{fatal:true,ignoreBOM:true}).decode(b);}catch(e){return null;}
    var head=s.slice(0,600).replace(/^\ufeff/,"");return /^\s*(<!doctype html|<html)/i.test(head)&&s.indexOf("<scr"+"ipt")>=0?s:null;});}
function pack(kind,s){var u=TE.encode(s);return (kind==="gz"?gzip(u):Promise.resolve(u)).then(bytesB64);}
/* one page, and the pages it carries (three levels): what came out, how many scripts, how many left as written and why, how many pages */
function page(html,depth,acc,memo){depth=depth||0;memo=memo||{};acc=acc||{scripts:0,left:[],pages:0,before:0,after:0,checks:[]};
  var code=[],packs=[];
  scripts(html).forEach(function(x){var k=String(attr(x.a,"type")||"").split(";")[0].trim(),body=html.slice(x.s,x.e);
    if((!k||JSTYPE.test(k))&&!hasAttr(x.a,"src")){if(body.trim())code.push({x:x,code:body,module:/^module$/i.test(k)});}
    else if(depth<3){var kind=packedKind(body);if(kind)packs.push({x:x,kind:kind,body:body});}});
  /* a script met before (Carpe Diem's own copy carries the same scripts as Carpe Diem) is scrambled once */
  var ask=[],askAt={};code.forEach(function(c){var k=(c.module?"m":"s")+c.code;if(memo[k]==null&&askAt[k]==null){askAt[k]=ask.length;ask.push({code:c.code,module:c.module});}});
  return run(ask).then(function(r){var whyAt={};r.left.forEach(function(l){whyAt[l.i]=l.why;});
    Object.keys(askAt).forEach(function(k){var i=askAt[k];memo[k]=r.out[i]==null?{why:whyAt[i]||"it could not be read"}:{t:r.out[i]};});
    var rep=[];
    code.forEach(function(c){var m=memo[(c.module?"m":"s")+c.code];if(m.t==null){acc.left.push(m.why);return;}
      rep.push({s:c.x.s,e:c.x.e,t:m.t});acc.scripts++;acc.before+=c.code.length;acc.after+=m.t.length;});
    var chain=Promise.resolve();
    packs.forEach(function(p){chain=chain.then(function(){return unpack(p.kind,p.body).then(function(inner){if(inner==null)return;
        return page(inner,depth+1,acc,memo).then(function(res){if(res.html===inner)return;acc.pages++;acc.checks.push({orig:inner,scr:res.html});
          return pack(p.kind,res.html).then(function(t){rep.push({s:p.x.s,e:p.x.e,t:t});});});})
      .catch(function(e){acc.left.push("a page it carries could not be opened ("+((e&&e.message)||e)+")");});});});
    return chain.then(function(){rep.sort(function(a,b){return a.s-b.s;});var out=[],last=0;
      rep.forEach(function(q){out.push(html.slice(last,q.s),q.t);last=q.e;});out.push(html.slice(last));return {html:out.join(""),acc:acc};});});}

/* ---------- before anything is made: the scrambled copy run beside the one she wrote ---------- */
/* both at once for a page under 4 MB, one after the other for a larger one (two large pages at once weigh on a tablet) */
function check(orig,scr){var Q=W.IngShip&&IngShip._&&IngShip._.quietRun;if(typeof Q!=="function")return Promise.resolve(null);
  var both=orig.length<4e6?Promise.all([Q(orig,4),Q(scr,4)]):Q(orig,4).then(function(a){return Q(scr,4).then(function(b){return [a,b];});});
  return both.then(function(r){var a=r[0],b=r[1];if(b.errors.length<=a.errors.length)return null;
    var extra=b.errors.filter(function(m){return a.errors.indexOf(m)<0;});return {why:plainWhy(extra[0]||b.errors[0])};});}
/* the app's own words of an error, without the browser's (Uncaught, TypeError:, its line) */
function plainWhy(m){return String(m||"").replace(/^Uncaught\s+/i,"").replace(/^[A-Za-z]*Error:\s*/,"").replace(/\s*\(line \d+\)\s*$/,"").trim().slice(0,160)||"an error";}
function sha(s){return crypto.subtle.digest("SHA-256",TE.encode(s)).then(function(b){return [].map.call(new Uint8Array(b),function(x){return ("0"+x.toString(16)).slice(-2);}).join("");});}
function scramble(id,x,name){name=name||nameOf(id,x);var orig=x.html,t0=Date.now();
  if(orig.length>2e6)toast("Scrambling "+name+"'s code before it is made…");
  return page(orig).then(function(res){var acc=res.acc;
    if(!acc.scripts&&!acc.pages)return {html:null,quiet:true,why:"it has no code of its own to scramble"};
    var N=IngShip._&&IngShip._.numberOf,rec=x.recipe||{};
    if(typeof N==="function"&&String(N(orig,rec)||"")!==String(N(res.html,rec)||""))return {html:null,why:"its version read differently once scrambled"};
    var list=[{orig:orig,scr:res.html}].concat(acc.checks),chain=Promise.resolve(null);
    list.forEach(function(c){chain=chain.then(function(bad){return bad||check(c.orig,c.scr);});});
    return chain.then(function(bad){if(bad)return {html:null,why:"the scrambled copy showed an error that yours does not: “"+bad.why+"”"};
      return {html:res.html,info:{at:Date.now(),scripts:acc.scripts,pages:acc.pages,left:acc.left.length,leftWhy:acc.left.slice(0,3),before:acc.before,after:acc.after,ms:Date.now()-t0,engine:ENGINE}};});})
  .catch(function(e){return {html:null,why:"the scrambler could not run here ("+String((e&&e.message)||e).slice(0,120)+")"};});}
var CACHE=[],SAID={};
function note(id,commit,key,val){if(!commit||!key||!W.IngRepo||typeof IngRepo.setNote!=="function")return Promise.resolve();
  return Promise.resolve(IngRepo.setNote(id,commit,"scrambled_"+key,val)).catch(function(){});}
/* what Fabrica ships: the page every package is made from, with its code scrambled (r349 asks, before the door and the signature) */
/* 7.68 (modules/r357.js): the version a scrambled page was made from, named inside it (signed with it), so her own Fabrica can open
   that version as written when the copy comes back to her: the app's name in small letters and the version's id, nothing of its code */
function markIn(html,slug,commit){slug=String(slug||"").toLowerCase().replace(/[^a-z0-9._-]+/g,"-").replace(/^[^a-z0-9]+/,"").slice(0,80);
  if(!slug||!/^[0-9a-f]{40}$/.test(String(commit||"")))return html;var tag='<meta name="ingenium-source" content="'+slug+' '+commit+'">';
  return /<head(\s[^>]*)?>/i.test(html.slice(0,1<<20))?html.replace(/<head(\s[^>]*)?>/i,function(m){return m+"\n"+tag;}):tag+"\n"+html;}
function infoOf(id){try{return W.IngRepo&&typeof IngRepo.info==="function"?Promise.resolve(IngRepo.info(id)).catch(function(){return null;}):Promise.resolve(null);}catch(e){return Promise.resolve(null);}}
function onePage(id,x,opt){opt=opt||{};var key=keyOf(opt);if(!key||!x||typeof x.html!=="string")return Promise.resolve(x);
  if(!wanted(id)||isIngenium(id,x.html))return note(id,x.commit,key,{off:true,at:Date.now()}).then(function(){return x;});
  return infoOf(id).then(function(info){if(info&&info.app==="ingenium")return note(id,x.commit,key,{off:true,at:Date.now()}).then(function(){return x;});
    var name=(x.recipe&&x.recipe.name)||(info&&info.name)||nameOf(id,x);
  return sha(x.html).then(function(h){var k=id+"|"+h,c=CACHE.filter(function(e){return e.k===k;})[0];
      if(!c){c={k:k,p:scramble(id,x,name)};CACHE.push(c);if(CACHE.length>3)CACHE.shift();}return c.p.then(function(res){return {res:res,k:k};});})
    .then(function(o){var res=o.res;
      if(!res.html){if(!res.quiet&&!SAID[o.k]){SAID[o.k]=1;toast("Made with "+name+"'s code as written: "+res.why+".");}
        return note(id,x.commit,key,{off:true,at:Date.now(),why:res.why}).then(function(){return x;});}
      if(res.info.left&&!SAID[o.k]){SAID[o.k]=1;toast(res.info.left+" of "+name+"'s scripts could not be read by the scrambler, and "+(res.info.left===1?"is":"are")+" left as written.");}
      x.html=markIn(res.html,(info&&info.slug)||name,x.commit);x.bytes=TE.encode(x.html);x.scrambled=res.info;
      return note(id,x.commit,key,res.info).then(function(){return x;});});});}

/* ---------- Package details, the Ship card and the Security room ---------- */
function packageRow(box,r,pref){if(!fabrica()||!libEl())return null;var ing=!!(r&&r.app==="ingenium"),on=!ing&&pref.scramble!==false;
  var b=D.createElement("button");b.type="button";b.className="r349-row r356-row";b.setAttribute("role","switch");b.setAttribute("aria-checked",String(on));
  b.innerHTML='<span class="t"><b>Scrambled code</b><small>'+esc(ing?"Ingenium itself is never scrambled: its copy stays as you wrote it, and its own release signature is over that code."
    :"Every package carries this app's code shrunk and the names inside it scrambled, and the pages it carries inside too: much slower to read or copy. Your sources in Fabrica stay as you wrote them. The scrambled copy is run beside yours first; if it shows an error yours does not, the package carries your code as written, and Ingenium says so.")+'</small></span><span class="tr"></span>';
  if(ing)b.disabled=true;else b.onclick=function(){on=!on;b.setAttribute("aria-checked",String(on));};
  box.appendChild(b);return {on:function(){return on;},fixed:ing};}
function lineFor(id){if(!fabrica()||!libEl())return "";return wanted(id)?"its code scrambled":"its code as written";}
function madeNote(n,k){var v=n&&n["scrambled_"+k];return !!(v&&!v.off&&(v.scripts||v.pages));}
function counts(){var p=prefs(),total=0,offN=0;repos().forEach(function(r){if(!r||r.app==="ingenium")return;total++;if((p[r.id]||{}).scramble===false)offN++;});return {total:total,off:offN};}
function state(){if(!fabrica()||!libEl())return "off";var c=counts();return c.total&&c.off>=c.total?"off":"on";}
function well(chip){var st=state();
  if(!fabrica())return '<div class="sc-well"><div class="sc-wh"><b>Scrambled code</b>'+chip("off")+'</div><p>'+esc("Off in this copy: what you make here is shipped as you wrote it.")+'</p></div>';
  if(!libEl())return '<div class="sc-well"><div class="sc-wh"><b>Scrambled code</b>'+chip("off")+'</div><p>'+esc("Off: this copy of Ingenium carries no scrambler, so every package carries its code as written.")+'</p></div>';
  var c=counts(),p=st==="on"?"On: every package Fabrica makes carries its code shrunk and the names inside it scrambled, and the pages it carries inside too, before it is signed: much slower to read or copy, never impossible. Your sources in Fabrica stay as you wrote them. The scrambled copy is run beside yours first; if it shows an error yours does not, the package carries your code as written, and Ingenium says so."
      +(c.off?" Turned off for "+c.off+(c.off===1?" app":" apps")+" in Package details.":"")
    :"Off: it is turned off for every app in Package details, so every package carries its code as written.";
  return '<div class="sc-well"><div class="sc-wh"><b>Scrambled code</b>'+chip(st)+'</div><p>'+esc(p+(W.IngReadable&&st==="on"?" A scrambled copy of one of your apps that comes back to you opens as written, from Fabrica.":""))+'</p><p class="sc-fine">'+esc("The names the parts of a page share with one another, and those its markup calls, stay as written, so the app keeps working; everything inside them is scrambled. Data it carries, such as JSON, stays as it is. Ingenium itself is never scrambled.")+'</p></div>';}
W.IngScramble={ships:ships,wanted:wanted,onePage:onePage,page:function(html){return page(String(html||"")).then(function(r){return {html:r.html,scripts:r.acc.scripts,pages:r.acc.pages,left:r.acc.left.slice(),before:r.acc.before,after:r.acc.after};});},
  packageRow:packageRow,lineFor:lineFor,madeNote:madeNote,state:state,well:well,engine:ENGINE,_scripts:scripts,_packedKind:packedKind};
})();
;try{window.__ingParts["p356"]="running";}catch(_){}
</script>
