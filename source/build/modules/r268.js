<script>try{(window.__ingParts=window.__ingParts||{})["p268"]="started";}catch(_){}
/* ============ R268 · THE DEMONSTRATIONS THE MASTER EDITION CARRIES (Ingenium 6.77, 10 November 2026; the master edition alone) ============
   Her words (10 November 2026): "I want the Offline Project apps to only contain the apps demos and never the full version, I just
   installed the mac app after shipping it inside of Ingenium's Fabrica and it had the full versions of all 4 apps and not the demos,
   please make the fix." And: "I also want the different demos of all of my apps built into Ingenium and made available to me on there."
   Measured on 6.71: The Offline Project made in Fabrica (modules/r246.js) took each room from the app library, which holds her full
   apps; Ingenium's room held this very copy, the master edition, with her Author Studio. Her own site of The Offline Project
   (1 November 2026) holds, room by room: Carpe Diem's Public sample, The Forge's demonstration (which carries the same
   demonstrations in its Editor), Ingenium's demo edition, and Inkwell's own page (its one edition).
   window.IngDemos gives each of those, whole and checked, from what this page carries (build_page.py, apps/demos):
   - Carpe Diem's Public sample, as it stands in her public repository, checked against its size and fingerprint;
   - Inkwell's page, the one Ingenium carries for the app library, checked the same way;
   - Ingenium's demo edition of this same version, put together from its recipe (demo_recipe.py): its own text, and the large blocks
     this page already holds (the picture reader, the engines, the typefaces, the kit store), read from the page itself; the whole is
     checked against the demo edition's fingerprint, the one editions/README.txt lists, before anything is made from it;
   - The Forge's demonstration, made here by her own recipe for it (offline_project/forge_demo/forge_demo_656.py): its page is the
     lean Forge this page carries with what differs put in (apps/demos/make_demos.py), checked against its fingerprint; then each
     demonstration it carries is given its own corner of the storage (forge-demo:), compressed, and listed with its size and
     fingerprint, as that recipe does, so the Forge keeps them on its first start, each checked.
   IngDemos.check(key, page) says whether a page is a demonstration (it names its edition and carries nothing of hers): the Offline
   Project is made from pages that pass it, and from no other.
   Where a part is missing it says so in plain words: a test build carries no demo edition unless it is given one; the phone and
   tablet apps leave the engine out of their page, so Ingenium's demo edition cannot be put together there. */
(function r268(){"use strict";
if(window.IngDemos)return;
var W=window,D=document,DM=/*R268_DEMOS*/null;
if(!DM)return;
var NAME={cd:"Carpe Diem",forge:"The Forge",ingenium:"Ingenium",inkwell:"Inkwell"};
var enc=new TextEncoder();
function el(id){return D.getElementById(id);}
function fail(m){return Promise.reject(new Error(m));}
function can(){return typeof CompressionStream!=="undefined"&&typeof DecompressionStream!=="undefined"&&typeof Response!=="undefined"&&!!Blob.prototype.stream;}

/* ---------- bytes ---------- */
function b64bytes(b64){var bin=atob(b64),u=new Uint8Array(bin.length);for(var i=0;i<bin.length;i++)u[i]=bin.charCodeAt(i);return u;}
function bytesb64(u8){var CH=0x8000,out=[];for(var i=0;i<u8.length;i+=CH*48){var bin="",end=Math.min(u8.length,i+CH*48);for(var j=i;j<end;j+=CH)bin+=String.fromCharCode.apply(null,u8.subarray(j,Math.min(end,j+CH)));out.push(btoa(bin));}
  /* each piece is a whole number of three-byte groups, so the pieces join as one text */return out.join("");}
function gunzip(u8){return new Response(new Blob([u8]).stream().pipeThrough(new DecompressionStream("gzip"))).arrayBuffer().then(function(b){return new Uint8Array(b);});}
function gzip(parts){return new Response(new Blob(parts).stream().pipeThrough(new CompressionStream("gzip"))).arrayBuffer().then(function(b){return new Uint8Array(b);});}
function join(parts){return new Blob(parts).arrayBuffer().then(function(b){return new Uint8Array(b);});}
function sha(u8){return typeof W.libSha==="function"?W.libSha(u8):crypto.subtle.digest("SHA-256",u8).then(function(b){var x=new Uint8Array(b),s="";for(var i=0;i<x.length;i++)s+=(x[i]<16?"0":"")+x[i].toString(16);return s;});}
function text(u8){return new TextDecoder().decode(u8);}
/* where a short run of plain letters first (or last) stands in a page's bytes */
function find(u8,word,from,to){var n=word.length,end=Math.min(u8.length,to==null?u8.length:to)-n;outer:for(var i=from||0;i<=end;i++){for(var j=0;j<n;j++)if(u8[i+j]!==word.charCodeAt(j))continue outer;return i;}return -1;}
/* the page's text from where a run of plain letters first stands, a few hundred characters of it (a page is never read as text whole) */
function around(u8,word,len){var i=find(u8,word,0);return i<0?"":text(u8.subarray(i,Math.min(u8.length,i+(len||300))));}
function has(u8,word){return find(u8,word,0)>=0;}
function findLast(u8,word){var n=word.length;outer:for(var i=u8.length-n;i>=0;i--){for(var j=0;j<n;j++)if(u8[i+j]!==word.charCodeAt(j))continue outer;return i;}return -1;}

/* ---------- a block this page carries, here or at its end or with the app (tail.py, ingFill) ---------- */
function blockText(id,what){var e=el(id);if(!e)return fail(what+" is not in this copy's page.");
  return Promise.resolve(typeof W.ingFill==="function"?W.ingFill(id):null).then(function(){var t=e.textContent;if(!t||!t.trim())throw new Error(what+" is not in this copy's page.");return t;},
    function(x){throw new Error(what+" could not be read from this copy ("+(x&&x.message||x)+").");});}
function packed(id,what,m){return blockText(id,what).then(function(t){return gunzip(b64bytes(t.trim()));})
  /* 6.82: an app carried without its own copy of itself (Carpe Diem) has it put back first (modules/r275.js) */
  .then(function(u8){return typeof W.ingBuiltinWhole==="function"?W.ingBuiltinWhole(id,u8):u8;}).then(function(u8){
    if(m&&u8.length!==m.size)throw new Error(what+" did not unpack whole (its size differs).");
    if(!m)return u8;return sha(u8).then(function(h){if(h!==m.sha256)throw new Error(what+" did not unpack whole (its fingerprint differs).");return u8;});});}

/* ---------- 1. Carpe Diem's Public sample, and Inkwell's page ---------- */
var KEEP={};
function once(k,fn){if(!KEEP[k]){KEEP[k]=fn();KEEP[k].catch(function(){delete KEEP[k];});}return KEEP[k];}
/* Carpe Diem's Public sample: what differs from the Carpe Diem this page carries (apps/demos/make_cd_demo.py), put together and checked */
function cd(){return once("cd",function(){if(!DM.cd.recipe||!DM.cd.base)return fail("This copy does not carry Carpe Diem's Public sample.");
  return Promise.all([packed("ing-demo-cd","Carpe Diem's Public sample",DM.cd.recipe),packed("ing-builtin-cd","The Carpe Diem this copy carries",DM.cd.base)]).then(function(x){
    var R=JSON.parse(text(x[0])),base=x[1];x[0]=null;if(!R||R.v!==1||!R.ops)throw new Error("Carpe Diem's Public sample: its recipe could not be read.");
    var out=new Uint8Array(DM.cd.size),at=0;
    R.ops.forEach(function(op){var b=typeof op==="string"?enc.encode(op):base.subarray(op[0],op[0]+op[1]);if(at+b.length>out.length)throw new Error("Carpe Diem's Public sample did not come out whole.");out.set(b,at);at+=b.length;});
    if(at!==out.length)throw new Error("Carpe Diem's Public sample did not come out whole (its size differs).");
    return sha(out).then(function(h){if(h!==DM.cd.sha256)throw new Error("Carpe Diem's Public sample did not come out whole (its fingerprint differs).");
      return {key:"cd",u8:out,version:DM.cd.version,edition:DM.cd.edition,what:"Carpe Diem "+DM.cd.version+" · "+DM.cd.edition};});});});}
function inkwell(){return once("inkwell",function(){if(!DM.inkwell)return fail("This copy carries no page of Inkwell.");
  return packed("ing-builtin-inkwell","Inkwell's page",DM.inkwell).then(function(u8){return {key:"inkwell",u8:u8,version:DM.inkwell.version,edition:"",what:"Inkwell "+DM.inkwell.version};});});}
function lean(){return once("lean",function(){return packed("ing-builtin-forge","The lean Forge",DM.forge.base);});}

/* ---------- 2. Ingenium's demo edition, from its recipe ---------- */
var SLOT="ing-demo-ingenium";
function carriesIngenium(){var e=el(SLOT);return !!e&&!!(e.getAttribute("data-defer")||e.textContent.trim());}
function ingenium(){return once("ingenium",function(){
  if(!carriesIngenium())return fail("This copy carries no demo edition of Ingenium (a test build carries none unless it is given one).");
  return blockText(SLOT,"Ingenium's demo edition").then(function(t){return gunzip(b64bytes(t.trim()));}).then(function(u8){var rec=JSON.parse(text(u8));u8=null;
    if(!rec||rec.v!==2||!rec.srcs||!rec.ops)throw new Error("Ingenium's demo edition: its recipe could not be read.");
    /* the parts of this page it copies from (demo_recipe.py): a block by its id (fetched first where it is carried for later), and the
       page's own code by its id, or else by its length and fingerprint */
    var bytes=[],codes=null,p=Promise.resolve();
    function stale(){return new Error("A part of Ingenium is no longer as this copy was built. Reload Ingenium and make it again.");}
    function byPrint(s){if(!codes)codes=[].slice.call(D.querySelectorAll("script,style")).filter(function(e){return !e.id;});
      var c=codes.filter(function(e){return e.textContent.length===s.len;}),i=0;
      return (function next(){if(i>=c.length)throw stale();var b=enc.encode(c[i++].textContent);return sha(b).then(function(h){return h===s.sha?b:next();});})();}
    rec.srcs.forEach(function(s,i){p=p.then(function(){
      if(!s.id)return byPrint(s);
      if(!el(s.id))throw new Error("Ingenium's demo edition needs a part this copy's page does not hold ("+s.id+"). The phone and tablet apps leave the engine and the kit store out of their page: make it in the computer app, or from the page in a browser.");
      return blockText(s.id,"A part of Ingenium ("+s.id+")").then(function(tx){if(tx.length!==s.len)throw stale();return enc.encode(tx);});}).then(function(b){bytes[i]=b;});});
    return p.then(function(){var out=new Uint8Array(rec.size),at=0;codes=null;
      rec.ops.forEach(function(op){var b=typeof op==="string"?enc.encode(op):bytes[op[0]].subarray(op[1],op[1]+op[2]);
        if(at+b.length>out.length)throw new Error("Ingenium's demo edition did not come back whole.");out.set(b,at);at+=b.length;});
      bytes=null;if(at!==rec.size)throw new Error("Ingenium's demo edition did not come back whole (its size differs).");
      return sha(out).then(function(h){if(h!==rec.sha256)throw new Error("Ingenium's demo edition did not come back whole (its fingerprint differs).");
        return {key:"ingenium",u8:out,version:rec.version,edition:"demo",sha256:rec.sha256,what:"Ingenium "+rec.version+" · demo edition"};});});});});}

/* ---------- 3. The Forge's demonstration, made by her recipe ---------- */
function recipe(){return once("recipe",function(){return packed("ing-demo-forge","The Forge's demonstration",{size:DM.forge.size,sha256:DM.forge.sha256}).then(function(u8){var r=JSON.parse(text(u8));
  if(!r||r.v!==1||!r.variants||!r.pool)throw new Error("The Forge's demonstration: its recipe could not be read.");return r;});});}
/* its own page for a set of apps: the lean Forge with what differs put in */
function ownPage(set){return Promise.all([recipe(),lean()]).then(function(x){var R=x[0],base=x[1],V=R.variants[set];if(!V)throw new Error("The Forge's demonstration has no page for that set of apps.");
  if(base.length!==R.base.size)throw new Error("The lean Forge this copy carries is not the one the demonstration is made from.");
  var out=new Uint8Array(V.size),at=0;
  V.ops.forEach(function(op){if(typeof op==="number"){var b=enc.encode(R.pool[op]);if(at+b.length>out.length)throw new Error("The Forge's demonstration did not come out whole.");out.set(b,at);at+=b.length;}
    else{if(at+op[1]>out.length)throw new Error("The Forge's demonstration did not come out whole.");out.set(base.subarray(op[0],op[0]+op[1]),at);at+=op[1];}});
  if(at!==V.size)throw new Error("The Forge's demonstration did not come out whole (its size differs).");
  return sha(out).then(function(h){if(h!==V.sha256)throw new Error("The Forge's demonstration did not come out whole (its fingerprint differs).");return {R:R,V:V,own:out};});});}
/* a carried page keeps its storage under the demonstration's own name: the shim, first in its <head> */
function ownStore(u8,shim,what){var i=find(u8,"<head>",0,4000);if(i<0)throw new Error(what+": its <head> was not found near its start");return [u8.subarray(0,i+6),shim,u8.subarray(i+6)];}
function carried(meta,parts,id){return join(parts).then(function(b){return Promise.all([sha(b),gzip([b])]).then(function(x){
    var m={};Object.keys(meta).forEach(function(k){m[k]=meta[k];});m.id=id;m.size=b.length;m.sha256=x[0];m.gz=x[1].length;
    return {meta:m,block:'<script type="forge/b64" id="'+id+'">'+bytesb64(x[1])+"<\/script>"};});});}
function forge(set,say){set=String(set||"4");say=say||function(){};
  return once("forge"+set,function(){return ownPage(set).then(function(o){var R=o.R,V=o.V,own=o.own,shim=enc.encode(R.shim),metas=[],blocks=[],p=Promise.resolve();
    V.carry.forEach(function(k){p=p.then(function(){say("The Forge's demonstration takes "+(k==="forge"?"a copy of itself":NAME[k]+"'s demonstration")+"…");
        if(k==="forge"){var fm={};Object.keys(R.forge).forEach(function(n){fm[n]=R.forge[n];});return carried(fm,[own],"forge-bi-self").then(function(c){c.meta.self=true;return c;});}
        if(k==="ingenium")return ingenium().then(function(d){var m=/^var ING_VERSION="([0-9.]+)",ING_PAGE_DATE="([^"]*)";/.exec(around(d.u8,'var ING_VERSION="',160));
          if(!m||check("ingenium",d.u8))throw new Error("Ingenium: not its demo edition");
          return carried({key:"ingenium",title:"Ingenium",version:m[1],build:"",date:m[2],name:"ingenium.html"},ownStore(d.u8,shim,"Ingenium"),"forge-bi-ingenium");});
        if(k==="cd")return cd().then(function(d){var m=/^window\.CD_BUILD=\{date:"([^"]*)",pass:"(\d+)",stamp:"([^"]*)",edition:"(Public sample|Committee demo)"/.exec(around(d.u8,"window.CD_BUILD={",300));
          if(!m||check("cd",d.u8))throw new Error("Carpe Diem: not one of its demonstrations");
          return carried({key:"cd",title:"Carpe Diem",version:m[2],build:m[3],date:m[1],name:"carpe_diem.html"},ownStore(d.u8,shim,"Carpe Diem"),"forge-bi-cd");});
        if(k==="inkwell")return inkwell().then(function(d){var h=text(d.u8.subarray(0,4000)),m=/<!-- BUILD='([\d.]+)'/.exec(h.slice(0,2000));
          if(!m||h.indexOf("Inkwell")<0)throw new Error("Inkwell: not its page");
          return carried({key:"inkwell",title:"Inkwell",version:m[1],build:"",date:R.forge.date,name:"Inkwell.html"},ownStore(d.u8,shim,"Inkwell"),"forge-bi-inkwell");});
        throw new Error("The Forge's demonstration names an app this copy does not know: "+k);})
      .then(function(c){metas.push(c.meta);blocks.push(c.block);});});
    return p.then(function(){return sha(enc.encode(R.forge.build+"|"+metas.map(function(m){return m.sha256;}).join("|")));}).then(function(h){
      var list=JSON.stringify({format:"forge-builtin",stamp:R.forge.build,sig:h.slice(0,24),apps:metas}).replace(/<\//g,"<\\/");
      var k=findLast(own,"</body>");if(k<0)throw new Error("The Forge's demonstration: the end of its page was not found");
      var mid="\n<!-- THE FORGE'S DEMONSTRATION · the apps it carries ("+V.apps+") -->\n"+'<script type="application/json" id="forge-bi-meta">'+list+"<\/script>\n"+blocks.join("\n")+"\n";blocks=null;
      return join([own.subarray(0,k),mid,own.subarray(k)]);})
    .then(function(u8){return {key:"forge",u8:u8,version:R.forge.version,edition:"Demo",carries:V.carry.slice(),what:"The Forge "+R.forge.version+" · Demo"};});});});}

/* ---------- 4. is this page a demonstration? ---------- */
/* a full app, or a copy that carries anything of hers, is refused: The Offline Project is made from pages that pass, and no other */
function check(k,u8){if(typeof u8==="string")u8=enc.encode(u8);
  if(k==="cd"){if(!/^window\.CD_BUILD=\{[^}]*edition:"(Public sample|Committee demo)"/.test(around(u8,"window.CD_BUILD={",300))||has(u8,'id="section-forge"')||has(u8,'id="cd-owner-sign"'))return "Carpe Diem: this page is not one of its demonstrations (the Public sample or the Committee demo).";return "";}
  if(k==="forge"){if(!/^window\.CD_BUILD=\{[^}]*edition:"Demo"/.test(around(u8,"window.CD_BUILD={",300))||!has(u8,"window.FORGE_DEMO = true")||has(u8,'id="cd-owner-sign"')||has(u8,'id: "sg-owner-hand"'))return "The Forge: this page is not its demonstration.";return "";}
  if(k==="ingenium"){if(!has(u8,'var ING_EDITION="demo"')||has(u8,'id="ing-builtin-')||has(u8,'id="ing-tail:ing-builtin-')||has(u8,"sg-owner-hand"))return "Ingenium: this page is not its demo edition.";return "";}
  if(k==="inkwell"){var h=text(u8.subarray(0,4000));if(!/<!-- BUILD='[\d.]+'/.test(h.slice(0,2000))||h.indexOf("Inkwell")<0)return "Inkwell: this page is not Inkwell's.";return "";}
  return "This copy does not know that app.";}
/* the page of one room, checked */
function page(k,four,say){var p=k==="cd"?cd():k==="inkwell"?inkwell():k==="ingenium"?ingenium():k==="forge"?forge(four?"4":"3",say):fail("This copy does not know that app.");
  return p.then(function(d){var no=check(k,d.u8);if(no)throw new Error(no);return d;});}
/* what each room will hold, said before anything is unpacked; and why it cannot be made here, when it cannot */
function plan(four){var v="";try{v=String(ING_VERSION);}catch(e){}
  var rows={cd:"Carpe Diem "+DM.cd.version+" · its "+DM.cd.edition,forge:"The Forge "+DM.forge.version+" · its demonstration, which carries "+(four?"the four demonstrations":"the three demonstrations")+" in its Editor",
    ingenium:"Ingenium "+v+" · its demo edition, never this master edition",inkwell:DM.inkwell?"Inkwell "+DM.inkwell.version+" · its own page (Inkwell has one edition)":""};
  return rows;}
function why(four){if(!can())return "This window cannot compress pages (it lacks CompressionStream): the computer app or a newer browser can make it.";
  if(!el("ing-demo-cd")||!el("ing-builtin-cd")||!el("ing-demo-forge")||!el("ing-builtin-forge"))return "This copy does not carry the demonstrations.";
  if(four&&!el("ing-builtin-inkwell"))return "This copy carries no page of Inkwell.";
  if(!carriesIngenium())return "This copy carries no demo edition of Ingenium (a test build carries none unless it is given one), so The Offline Project cannot be made from it.";
  if(!el("ingenium-engine-wasm"))return "The phone and tablet apps leave the engine and the kit store out of their page, so Ingenium's demo edition cannot be put together here. Make The Offline Project in the computer app, or from the page in a browser.";
  return "";}
function release(){KEEP={};}
W.IngDemos={meta:DM,can:can,why:why,plan:plan,page:page,check:check,cd:cd,inkwell:inkwell,ingenium:ingenium,forge:forge,ownPage:ownPage,release:release,
  bytes:{gzip:gzip,gunzip:gunzip,b64:bytesb64,unb64:b64bytes,sha:sha,join:join,find:find}};
try{W.__ingParts["p268"]="running";}catch(_){}
})();
</script>
