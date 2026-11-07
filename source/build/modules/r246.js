<style id="r246-css">
/* ============ R246 · THE OFFLINE PROJECT, MADE FROM HER APPS, IN FABRICA (Ingenium 6.48, 7 November 2026; the master edition alone) ============
   Her words, choosing how the Offline Project is built into her master edition (7 November 2026): in Fabrica she chooses all four apps
   or the variation without Inkwell, and Ingenium builds it fresh from her current apps, to try it and to package it; both variations
   are listed with her apps, each built fresh when opened. And (6 November 2026): "Yes, the app library stop keeping saved copies of the
   Offline Project's page": nothing of it is kept as a copy (6.45, modules/r240.js).
   Measured on 6.47: the Offline Project was made only by source/offline_project/master_demo/build_master_demo.py, a Python program run
   by hand on a computer with the four apps' demonstrations beside it; the master edition could show its crest (6.40) and the set of
   apps it gathers (Lector, 6.43), but not make it.
   Now Fabrica's list of apps opens with The Offline Project, wearing its live crest. Its work shows the two variations (all four apps;
   Carpe Diem, The Forge and Ingenium, without Inkwell), each room with the copy of its app the library holds now (the earlier copy can
   be chosen where one is kept, and what each is is said: Ingenium's room holds this copy, the master edition, unless another copy of
   Ingenium is kept), and Make it: the one-file app of build_master_demo.py's app mode, made here, in this window: the hall (site.html,
   carried in source/build/op_make.json with the devices' pictures and the icons drawn from the master seal), and each app's page with
   the three things that program adds at its top (its own corner of the storage, the key back to the hall, no scroll bars), compressed
   inside the page. Open tries it in a window of its own; Save keeps the file where she chooses. Only the window's memory holds it while
   she works: nothing is kept in the app library. */
/* its own row above her apps (not one of the repositories: their list stays theirs) */
#fb #fbOpRow{padding-bottom:0}
#fb .f-repo.op-tile{--app:#9a7a32}
#fb.op-on .f-views{display:none !important}
.op-work{display:flex;flex-direction:column;gap:12px;padding:4px 2px 10px}
.op-lede{font-size:13px;line-height:1.55;color:var(--ink-2);margin:0;max-width:72ch}
.op-seg{display:inline-flex;border:1px solid var(--hairline);border-radius:999px;padding:3px;gap:3px;background:var(--card-lo,transparent);align-self:flex-start;flex-wrap:wrap}
.op-seg button{border:0;background:transparent;border-radius:999px;padding:6px 14px;font:600 12.5px/1.2 var(--sans);color:var(--ink-2);cursor:pointer}
.op-seg button[aria-pressed="true"]{background:var(--accent-softer);color:var(--accent-deep,var(--accent));box-shadow:inset 0 0 0 1px rgba(var(--accent-line-rgb),.45)}
.op-rooms{display:flex;flex-direction:column;border:1px solid var(--hairline);border-radius:12px;overflow:hidden}
.op-room{display:flex;align-items:center;gap:12px;padding:10px 12px;border-top:.5px solid var(--hairline)}
.op-room:first-child{border-top:0}
.op-room img{width:34px;height:34px;object-fit:contain;flex:0 0 auto}
.op-room .t{flex:1 1 auto;min-width:0}
.op-room .t b{display:block;font-size:13px;color:var(--ink-1)}
.op-room .t span{display:block;font-size:12px;color:var(--ink-3);line-height:1.4}
.op-room .t span.warn{color:var(--warn,#a35a00)}
.op-room select{max-width:210px;font-size:12px !important;padding:5px 8px !important}
.op-keys{display:flex;gap:8px;flex-wrap:wrap;align-items:center}
.op-state{font-size:12.5px;color:var(--ink-2);line-height:1.5;min-height:1.5em}
.op-state.ok{color:var(--ok,#2f7a55)}
.op-state.bad{color:var(--danger,#b3261e)}
.op-bar{height:5px;border-radius:999px;background:rgba(var(--accent-line-rgb),.14);overflow:hidden;max-width:420px}
.op-bar i{display:block;height:100%;width:0;background:#9a7a32;transition:width .25s}
</style>
<script>try{(window.__ingParts=window.__ingParts||{})["p246"]="started";}catch(_){}
(function(){"use strict";
if(window.IngOffline)return;
var W=window,D=document;
function $(id){return D.getElementById(id);}
function mk(t,c,x){var e=D.createElement(t);if(c)e.className=c;if(x!=null)e.textContent=x;return e;}
function btn(c,t,fn,title){var b=mk("button",c,t);b.type="button";if(title)b.title=title;b.addEventListener("click",function(e){e.stopPropagation();fn(e,b);});return b;}
function toast(t){try{ingToast(t);}catch(e){}}
function warn(e){try{console.warn("Ingenium offline project:",e);}catch(_){}}
var DATA=null;
function data(){if(DATA)return DATA;var el=$("op-make-data");if(!el)return null;try{DATA=JSON.parse(el.textContent);}catch(e){DATA=null;}return DATA;}
var KEYS4=["cd","forge","ingenium","inkwell"],KEYS3=["cd","forge","ingenium"];
var SLUG={cd:"carpe-diem",forge:"the-forge",ingenium:"ingenium",inkwell:"inkwell"};
var NAME={cd:"Carpe Diem",forge:"The Forge",ingenium:"Ingenium",inkwell:"Inkwell"};

/* ---------- 1. bytes, compressed and written as text ---------- */
function b64bytes(b64){var bin=atob(b64),u=new Uint8Array(bin.length);for(var i=0;i<bin.length;i++)u[i]=bin.charCodeAt(i);return u;}
function bytesb64(u8){var CH=0x8000,out=[];for(var i=0;i<u8.length;i+=CH*48){var bin="";var end=Math.min(u8.length,i+CH*48);for(var j=i;j<end;j+=CH)bin+=String.fromCharCode.apply(null,u8.subarray(j,Math.min(end,j+CH)));out.push(btoa(bin));}
  /* each piece is a whole number of three-byte groups (CH*48 is), so the pieces join as one text */return out.join("");}
function can(){return typeof CompressionStream!=="undefined"&&typeof DecompressionStream!=="undefined";}
function gz(text){var cs=new CompressionStream("gzip"),w=cs.writable.getWriter();w.write(new TextEncoder().encode(text));w.close();return new Response(cs.readable).arrayBuffer().then(function(b){return new Uint8Array(b);});}
function gunzip64(b64){var ds=new DecompressionStream("gzip"),w=ds.writable.getWriter();w.write(b64bytes(b64));w.close();return new Response(ds.readable).text();}

/* ---------- 2. what each room holds: the copy of its app the library keeps (or the earlier one) ---------- */
function lib(){try{return libState().apps||{};}catch(e){return {};}}
function copyOf(k,slot){var m=lib()[k];if(!m)return null;if(slot==="earlier")return m.earlier&&m.earlier.ref?m.earlier:null;return m.ref?m:null;}
function what(k,m){if(!m)return "";var v=m.version?" "+m.version:"",src=m.source==="this copy"?"this copy, the master edition":m.source==="built in"?"the copy Ingenium carries":m.source==="file"?"a copy you added"+(m.name?" ("+m.name+")":""):"kept in the app library";return NAME[k]+v+" · "+src;}
function versionOf(k,s,m){var r=null;if(k==="cd"||k==="forge")r=/window\.CD_BUILD=\{date:"[^"]*",pass:"(\d+)"/.exec(s);else if(k==="ingenium")r=/ING_VERSION="([0-9.]+)"/.exec(s);else r=/<\!-- BUILD='([\d.]+)'/.exec(s);  /* not the four characters that open a comment: inside a script they would swallow its end */
  return r?r[1]:(m&&m.version)||"";}
/* build_master_demo.py, section 3: the character set, the storage's own corner (op:<app>:), the key back to the hall (none: in the
   one-file app the hall opened it), no scroll bars, all at the top of the page */
function prep(k,s){var X=data(),d=/^\s*<!doctype html>/i.exec(s),at=d?d[0].length:0;
  /* a page taken out of an Offline Project already has the shim at its top (the master edition carries its words further down, in this part) */
  if(/^\s*(<!doctype html>)?\s*<meta charset="utf-8"><script id="op-shim">/i.test(s.slice(0,400)))throw new Error(NAME[k]+": this copy was taken out of an Offline Project (it already carries the shim at its top)");
  return s.slice(0,at)+'\n<meta charset="utf-8">'+X.tags.shim.replace("__APP__",k)+X.tags.home.replace("__HOME__","null")+X.tags.nobars+s.slice(at);}
function seals(){var S=W.ING_SEALS||{},o={};KEYS4.forEach(function(k){var x=S[k];if(x&&x.b64){var u=(/^iVBOR/.test(x.b64)?"data:image/png;base64,":/^UklG/.test(x.b64)?"data:image/webp;base64,":"data:image/jpeg;base64,")+x.b64;o[k]=u;o[k+"N"]=u;}});return o;}
function iconLinks(X){return '\n<link rel="icon" href="'+X.icons.day.ico+'" sizes="16x16 32x32 48x48" data-op-icon="ico">'+'\n<link rel="icon" type="image/png" sizes="32x32" href="'+X.icons.day["32"]+'" data-op-icon="32">'+
  '\n<link rel="icon" type="image/png" sizes="192x192" href="'+X.icons.day["192"]+'" data-op-icon="192">'+'\n<link rel="apple-touch-icon" href="'+X.touch+'">';}
function hall(){return gunzip64(data().site);}

/* ---------- 3. made: the one-file app (build_master_demo.py --mode app), in this window ---------- */
function make(opts){opts=opts||{};var four=opts.four!==false,X=data(),say=opts.say||function(){};
  if(!X)return Promise.reject(new Error("This copy does not carry what the Offline Project is made from."));
  if(!can())return Promise.reject(new Error("This window cannot compress pages (it lacks CompressionStream): open Ingenium in a newer browser or the computer app."));
  var ks=four?KEYS4:KEYS3,use=opts.use||{},build={preview:false,apps:{},app:true},versions={},inside=[],total=0,done=0;
  if(!four)build.without=["inkwell"];
  ks.forEach(function(k){var m=copyOf(k,use[k]);total+=+(m&&m.size)||1;});
  var p=Promise.resolve();
  ks.forEach(function(k,i){p=p.then(function(){var slot=use[k]==="earlier"?"earlier":"",m=copyOf(k,slot);
      if(!m)throw new Error(NAME[k]+" is not kept in the app library here: add it with Add your apps, then make it again.");
      say("Reading "+NAME[k]+"…",done/total);
      return Promise.resolve(libText(k,slot)).then(function(s){if(!s)throw new Error(NAME[k]+": its copy could not be read back from the app library.");
        versions[k]=versionOf(k,s,m);if(k==="cd")build.cdEdition=/edition:"Public sample"/.test(s)?"Public sample":"Committee demo";
        var page=prep(k,s);s=null;say("Packing "+NAME[k]+" into the page…",(done+0.5*(+m.size||1))/total);
        return gz(page).then(function(z){var slug=SLUG[k];inside.push('<script type="op/gz64" id="op-app-'+slug+'">'+bytesb64(z)+"<\/script>");
          build.apps[slug]=[{file:"apps/"+slug+".html",mb:Math.round(page.length/1e5)/10,inside:"op-app-"+slug}];done+=+m.size||1;page=null;});});});});
  return p.then(function(){say("Putting the hall together…",0.97);
    build.versions=versions;build.line="Carpe Diem "+versions.cd+" · The Forge "+versions.forge+" · Ingenium "+versions.ingenium+(four?" · Inkwell "+versions.inkwell:"");
    build.img={seals:seals(),devices:X.devices};build.icons={day:X.icons.day,night:X.icons.night};
    return (opts.hall?Promise.resolve(opts.hall):hall()).then(function(site){
      if(site.indexOf("/*@@BUILD@@*/{}")<0||site.indexOf('/*@@LOADSEAL@@*/""')<0||site.indexOf("<title>The Offline Project</title>")<0||site.indexOf('<div id="app">')<0)
        throw new Error("The hall's page has lost one of the places the build fills.");
      site=site.replace("/*@@BUILD@@*/{}",function(){return JSON.stringify(build).replace(/<\//g,"<\\/");});
      site=site.replace('/*@@LOADSEAL@@*/""',function(){return JSON.stringify(X.loadseal);});
      site=site.replace("<title>The Offline Project</title>",function(){return "<title>The Offline Project</title>"+iconLinks(X);});
      if(!four)site=site.replace('content="Carpe Diem, The Forge, Ingenium and Inkwell: four apps that live on your own device, each with its live demonstration."','content="Carpe Diem, The Forge and Ingenium: three apps that live on your own device, each with its live demonstration."');
      var head='<!doctype html>\n<html lang="en">\n<head>\n<meta charset="utf-8">\n<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">\n<meta name="theme-color" content="#f5f3f7" media="(prefers-color-scheme: light)">\n<meta name="theme-color" content="#110d18" media="(prefers-color-scheme: dark)">\n<meta name="application-name" content="The Offline Project">\n';
      site=head+site.replace('<div id="app">',function(){return '</head>\n<body>\n<div id="app">';});
      var parts=[site,"\n"];inside.forEach(function(x){parts.push(x,"\n");});parts.push("</body>\n</html>\n");inside=null;
      var blob=new Blob(parts,{type:"text/html"});say("",1);
      return {blob:blob,name:four?"The Offline Project.html":"The Offline Project (without Inkwell).html",line:build.line,versions:versions,size:blob.size,four:four};});});}

/* ---------- 4. Fabrica: The Offline Project at the head of her apps ---------- */
function opState(){if(!state.opMake||typeof state.opMake!=="object")state.opMake={four:true,use:{}};if(!state.opMake.use)state.opMake.use={};return state.opMake;}
function save(){try{saveState();}catch(e){}}
var LAST=null,BUSY=false,ON=false,STATE={text:"",cls:"",pc:0};
function sig(){var o=opState(),ks=o.four!==false?KEYS4:KEYS3;return (o.four!==false?"4":"3")+"|"+ks.map(function(k){var m=copyOf(k,o.use[k]);return k+":"+(m?m.sha256||m.ref:"none");}).join(",");}
function H(){return W.fbHubHost||null;}
function crest(four,size){try{if(W.IngSeal&&IngSeal.el){var set=four?KEYS4.slice():KEYS3.slice(),ar=IngSeal.aspect?IngSeal.aspect(set)||1.3333:1.3333;var ce=IngSeal.el(set,{live:true,quarters:true,size:Math.round(size/ar),alt:""});if(ce){ce.setAttribute("aria-hidden","true");return ce;}}}catch(e){}
  var im=mk("img");try{im.src="data:image/png;base64,"+W.ING_SEALS.master.b64;}catch(e){}im.alt="";im.style.cssText="width:"+size+"px;height:"+size+"px;object-fit:contain";return im;}
function tile(){var box=$("fbRepos");if(!box||!data())return;var row=$("fbOpRow");
  if(!row){row=mk("div","f-repos op-row");row.id="fbOpRow";box.parentNode.insertBefore(row,box);}
  if(row.querySelector(".op-tile"))return;
  var b=mk("button","f-repo wide op-tile");b.type="button";b.setAttribute("aria-pressed",ON?"true":"false");b.title="The Offline Project, made fresh from the apps your library holds now";
  b.appendChild(crest(opState().four!==false,42));
  var tx=mk("span","tx");tx.appendChild(mk("span","nm","The Offline Project"));var st=mk("span","stl");st.appendChild(mk("span",null,"Made from your apps, fresh each time"));tx.appendChild(st);b.appendChild(tx);
  b.addEventListener("click",function(){openWork();});row.appendChild(b);}
function openWork(){ON=true;var h=H();try{if(h&&h.one&&h.one())h.setPanel("work");}catch(e){}paintWork();
  [].forEach.call(D.querySelectorAll("#fbRepos .f-repo"),function(x){x.setAttribute("aria-pressed","false");});var t=D.querySelector("#fbOpRow .op-tile");if(t)t.setAttribute("aria-pressed","true");}
function room(k,o){var r=mk("div","op-room");var im=mk("img");try{im.src="data:image/png;base64,"+W.ING_SEALS[k].b64;}catch(e){}im.alt="";r.appendChild(im);
  var cur=copyOf(k,""),ear=copyOf(k,"earlier"),pick=o.use[k]==="earlier"&&ear?"earlier":"",m=pick?ear:cur;
  var t=mk("div","t");t.appendChild(mk("b",null,NAME[k]));
  if(!m)t.appendChild(mk("span","warn","Not kept in the app library yet: add it with Add your apps (Settings, Your data, or Lector)."));
  else{t.appendChild(mk("span",null,what(k,m)));
    if(k==="ingenium"&&m.source==="this copy")t.appendChild(mk("span","warn","This copy is your master edition, with your Author Studio. To make one to share, keep Ingenium's demo edition in the app library: it is used in its place."));}
  r.appendChild(t);
  if(cur&&ear){var sel=mk("select");sel.setAttribute("aria-label","The copy of "+NAME[k]+" to use");
    [["","The copy kept now"+(cur.version?" ("+cur.version+")":"")],["earlier","The earlier copy"+(ear.version?" ("+ear.version+")":"")]].forEach(function(x){var op=mk("option",null,x[1]);op.value=x[0];sel.appendChild(op);});
    sel.value=pick;sel.addEventListener("change",function(){o.use[k]=sel.value;save();LAST=null;paintWork();});r.appendChild(sel);}
  return r;}
function setState(text,cls,pc){STATE={text:text||"",cls:cls||"",pc:pc==null?STATE.pc:pc};var s=D.querySelector(".op-work .op-state"),b=D.querySelector(".op-work .op-bar i");
  if(s){s.textContent=STATE.text;s.className="op-state"+(STATE.cls?" "+STATE.cls:"");}if(b)b.style.width=Math.round(Math.max(0,Math.min(1,STATE.pc||0))*100)+"%";}
function views(show){var fb=$("fb");if(fb)fb.classList.toggle("op-on",!show);}
function paintWork(){if(!ON)return;var w=$("fbWorkBody"),f=$("fbWorkFoot");if(!w)return;w.innerHTML="";if(f)f.innerHTML="";views(false);  /* an app's views (Now, Story, Changes, Files) are not this one's */
  try{var nm=$("fbWhName");if(nm)nm.textContent="The Offline Project";var ws=$("fbWhSeal");if(ws){var ce=crest(opState().four!==false,34);ce.id="fbWhSeal";ws.replaceWith(ce);}
    ["fbBranch","fbRun"].forEach(function(id){var x=$(id);if(x)x.hidden=true;});var chip=$("fbWorkChip");if(chip){chip.className="f-chip";chip.textContent="Made fresh";}
    var vs=$("fbViews");if(vs)[].forEach.call(vs.querySelectorAll("button"),function(b){b.setAttribute("aria-selected","false");});}catch(e){}
  var o=opState(),four=o.four!==false,box=mk("div","op-work");box.setAttribute("data-op","work");
  box.appendChild(mk("p","op-lede","Made here, fresh each time, from the apps your library holds now: the hall with its crest, and each app's live page inside it, in one file that opens on any device with no connection. Nothing of it is kept in the app library."));
  var seg=mk("div","op-seg");seg.setAttribute("role","group");seg.setAttribute("aria-label","The variation");
  [[true,"All four apps"],[false,"Without Inkwell"]].forEach(function(x){var b=btn("",x[1],function(){o.four=x[0];save();LAST=null;paintWork();});b.setAttribute("aria-pressed",String(four===x[0]));b.setAttribute("data-four",x[0]?"1":"0");seg.appendChild(b);});
  box.appendChild(seg);
  var rooms=mk("div","op-rooms");(four?KEYS4:KEYS3).forEach(function(k){rooms.appendChild(room(k,o));});box.appendChild(rooms);
  var missing=(four?KEYS4:KEYS3).filter(function(k){return !copyOf(k,o.use[k]);});
  var keys=mk("div","op-keys");
  var mkB=btn("btn primary",BUSY?"Making…":"Make and open",function(){run("open");},"Makes it now, then opens it in a window of its own");mkB.id="opMakeOpen";
  var svB=btn("btn",BUSY?"Making…":"Save the app",function(){run("save");},"Makes it now (or uses the one just made), then saves the file");svB.id="opSave";
  mkB.disabled=svB.disabled=BUSY||!!missing.length||!can();keys.appendChild(mkB);keys.appendChild(svB);box.appendChild(keys);
  var st=mk("div","op-state");box.appendChild(st);var bar=mk("div","op-bar");bar.appendChild(mk("i"));box.appendChild(bar);
  if(!can())STATE={text:"This window cannot compress pages (it lacks CompressionStream): the computer app or a newer browser can make it.",cls:"bad",pc:0};
  else if(missing.length&&!BUSY)STATE={text:"Missing from the app library: "+missing.map(function(k){return NAME[k];}).join(", ")+".",cls:"bad",pc:0};
  else if(!BUSY&&LAST&&LAST.sig===sig())STATE={text:"Made: "+LAST.r.name+", "+(Math.round(LAST.r.size/1e5)/10)+" MB · "+LAST.r.line+". It lives only in this window until you save it.",cls:"ok",pc:1};
  else if(!BUSY)STATE={text:"",cls:"",pc:0};
  w.appendChild(box);setState(STATE.text,STATE.cls,STATE.pc);}
function made(){var s=sig();if(LAST&&LAST.sig===s)return Promise.resolve(LAST.r);var o=opState();
  return make({four:o.four!==false,use:o.use,say:function(t,pc){if(t)setState(t,"",pc);}}).then(function(r){LAST={sig:s,r:r};return r;});}
/* the window is opened at the press itself (a window opened after the making, which takes a while, is refused as a pop-up), says
   that it is being made, and is given the page when it is ready */
function run(what){if(BUSY)return;var win=null;
  if(what==="open"){try{win=W.open("","_blank");}catch(e){win=null;}
    if(win)try{win.document.write('<!doctype html><meta charset="utf-8"><title>The Offline Project</title><body style="margin:0;display:grid;place-items:center;height:100vh;font:15px/1.5 -apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif;background:#f5f3f7;color:#221a2e">Making the Offline Project from your apps\u2026</body>');win.document.close();}catch(e){}}
  BUSY=true;paintWork();setState("Getting ready…","",0.02);
  made().then(function(r){BUSY=false;paintWork();if(what==="open")openMade(r,win);else saveMade(r);return r;},
    function(e){BUSY=false;paintWork();setState(String(e&&e.message||e),"bad",0);warn(e);try{if(win&&!win.closed)win.close();}catch(_){}});}
function openMade(r,win){var u=URL.createObjectURL(r.blob);
  if(!win||win.closed){try{win=W.open(u,"_blank");}catch(e){win=null;}if(!win){toast("This window cannot open it here, so it is saved instead.");saveMade(r);return;}}
  else{try{win.location.href=u;}catch(e){toast("This window cannot open it here, so it is saved instead.");saveMade(r);return;}}
  setTimeout(function(){try{URL.revokeObjectURL(u);}catch(e){}},600000);
  toast("The Offline Project opens in a window of its own: "+r.line+".");}
function saveMade(r){var h=H();Promise.resolve(r.blob.arrayBuffer()).then(function(buf){var u8=new Uint8Array(buf);
    if(h&&typeof h.saveBytes==="function")return h.saveBytes(r.name,"text/html",u8);
    try{if(typeof saveFileNative==="function")return saveFileNative(r.name,"text/html",u8);}catch(e){}
    var u=URL.createObjectURL(r.blob),a=mk("a");a.href=u;a.download=r.name;D.body.appendChild(a);a.click();setTimeout(function(){a.remove();URL.revokeObjectURL(u);},4000);})
    .then(function(){toast(r.name+" is saved ("+(Math.round(r.size/1e5)/10)+" MB).");},function(e){toast("It could not be saved: "+String(e&&e.message||e));});}
/* Fabrica paints its list and its work afresh: The Offline Project keeps its place at the head, and its work while it is chosen */
function watch(){var box=$("fbRepos"),wb=$("fbWorkBody");if(!box||box.__op)return;box.__op=1;
  box.addEventListener("click",function(e){var b=e.target&&e.target.closest&&e.target.closest(".f-repo");if(b){ON=false;views(true);var t=D.querySelector("#fbOpRow .op-tile");if(t)t.setAttribute("aria-pressed","false");}},true);
  if(wb)try{new MutationObserver(function(){if(ON&&!wb.querySelector(".op-work"))setTimeout(function(){if(ON&&!wb.querySelector(".op-work"))paintWork();},0);}).observe(wb,{childList:true});}catch(e){}
  tile();}
function boot(){if(!data())return;var n=0;(function again(){if($("fbRepos")){watch();return;}if(++n<240)setTimeout(again,500);})();}
if(D.readyState==="loading")D.addEventListener("DOMContentLoaded",boot);else boot();
W.addEventListener("load",function(){setTimeout(boot,1200);});
try{var og=W.go;if(typeof og==="function"&&!og.__r246){var ng=function(p){var r=og.apply(this,arguments);try{if(p==="fabrica")setTimeout(function(){watch();tile();if(ON)paintWork();},60);}catch(e){}return r;};ng.__r246=1;W.go=ng;try{go=ng;}catch(e){}}}catch(e){}
W.IngOffline={make:make,open:openWork,rooms:function(four){return (four===false?KEYS3:KEYS4).map(function(k){var o=opState();return {key:k,copy:copyOf(k,o.use[k]),earlier:copyOf(k,"earlier")};});},can:can,data:data,last:function(){return LAST&&LAST.r;},hall:hall,prep:prep,unpack:gunzip64};
})();
;try{window.__ingParts["p246"]="running";}catch(_){}
</script>
