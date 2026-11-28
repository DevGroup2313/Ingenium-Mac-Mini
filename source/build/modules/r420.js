<style id="r420-css">
/* ============ R420 · EVERY EDITION OF HER APPS, FOR EVERY DEVICE, MADE IN FABRICA (Ingenium 8.11, 28 November 2026; the master edition alone) ============
   Her words (28 November 2026): "I want all of the editions of all of my apps built into the master edition for all of my devices, not
   just the master edition. I want full authorship and agency over all of the editions. ... I tried to make the Full edition Windows app
   from my master edition on my macbook pro and it only showed me one edition and downloaded the master edition only. ... I want to be
   able to choose between the different editions of all of my apps and devices in Ingenium, not just the master edition."
   Fabrica made every package from the version kept, so Ingenium's packages were always the master edition. Now each of her apps with
   more than one edition carried in this page offers its editions in Fabrica's Ship (under the package line) and in Download as an app:
   - Ingenium: the master edition (the version kept), and its Full, Gift and Demo editions of this same version, each put together from
     its recipe and checked against its fingerprint (modules/r268.js, build/demo_recipe.py);
   - Carpe Diem: its full edition (the version kept) and its Public sample; The Forge: itself and its demonstration.
   The edition chosen is the page every package carries, for every device (the Mac, Windows, iPhone and iPad, Fire and Android, the web,
   one page, the kits), before it is scrambled or signed (modules/r111.js, IngShip.onePage), and it never carries her owner's door
   (modules/r349.js). The Full edition keeps the master's app id, so on a device it installs over the master in place and keeps the work
   there (the full edition asks once to bring it in, modules/r332.js); the Gift and Demo editions take ids of their own and never open her
   work. Each package's name says its edition. The keys are Fabrica's own; in Download as an app, the panel's own list. */
#fb .r420-ed{flex:1 1 100%;display:flex;flex-wrap:wrap;align-items:center;gap:6px;margin:4px 0 0}
#fb .r420-ed .r420-lab{font-size:12px;font-weight:600;color:var(--f-ink2);margin-right:2px}
#fb .r420-ed .f-btn{margin-left:0}
#fb .r420-ed .r420-note{flex:1 1 100%;margin:2px 0 0;font-size:12px;line-height:1.45;color:var(--f-ink2)}
.dl-id .r420-sel{min-width:14em}
</style>
<script>try{(window.__ingParts=window.__ingParts||{})["p420"]="started";}catch(_){}
(function r420(){"use strict";
var W=window,D=document;
if(W.IngEditions)return;
var dec=new TextDecoder();
function H(){return W.fbHubHost||null;}
function M(){return W.IngDemos||null;}
function ver(){try{return String(ING_VERSION);}catch(e){return "";}}
function appKey(r){var h=H();try{return h&&h.appOf&&r?h.appOf(r):null;}catch(e){return null;}}
function repoOf(id){var h=H();try{return (h.C.repos||[]).filter(function(r){return r.id===id;})[0]||null;}catch(e){return null;}}

/* the editions of each of her apps that this page can give; the first is always the version kept in Fabrica */
var SHORT={full:"Full",gift:"Gift",demo:"Demo",sample:"Sample",fdemo:"Demo"};
function editionsOf(app){var m=M();if(!m)return [];var v=ver();
  if(app==="ingenium"){var out=[{k:"master",name:"Master edition",says:"The version you kept in Fabrica: your own master edition, with everything in it."}];
    [["full","Full edition","For a person close to you: every page and the five apps, without the Author Studio, your owner's key or any of your apps and information."],
     ["gift","Gift edition","The public edition, for friends and family: Chat, Code, Folders, Memoria, Focus, Models, Blend, Build, the Guide, Custodia and Settings."],
     ["demo","Demo edition","The public demonstration: the Gift edition's pages, keeping its work under a name of its own."]]
      .forEach(function(e){if(m.carries&&m.carries(e[0]))out.push({k:e[0],name:e[1],says:e[2]+(v?" Ingenium "+v+", from this copy.":"")});});
    return out.length>1?out:[];}
  if(app==="cd"&&m.meta&&m.meta.cd&&D.getElementById("ing-demo-cd"))
    return [{k:"master",name:"Full edition",says:"The version you kept in Fabrica."},
            {k:"sample",name:"Public sample",says:"Carpe Diem "+m.meta.cd.version+"'s public demonstration, as its own public repository has it."}];
  if(app==="forge"&&m.meta&&m.meta.forge&&D.getElementById("ing-demo-forge"))
    return [{k:"master",name:"The Forge",says:"The version you kept in Fabrica."},
            {k:"fdemo",name:"Demonstration",says:"The Forge "+m.meta.forge.version+"'s demonstration, with your apps' demonstrations in its Editor."}];
  return [];}

/* her choice, kept with the app's other shipping choices in Fabrica */
function prefs(r){var h=H();if(!h||!r)return {};var f=h.FBS();if(!f.ship)f.ship={};return f.ship[r.id]||(f.ship[r.id]={});}
function chosen(r){var k=prefs(r).edition||"master";return editionsOf(appKey(r)).some(function(e){return e.k===k;})?k:"master";}
function choose(r,k){prefs(r).edition=k;var h=H();try{h.saveSoon();}catch(e){}}

/* the page of an edition, put together and checked (modules/r268.js) */
function pageFor(app,k){var m=M();if(!m)return Promise.reject(new Error("This copy carries no other editions."));
  if(app==="ingenium")return m.edition(k);
  if(app==="cd"&&k==="sample")return m.cd();
  if(app==="forge"&&k==="fdemo")return m.forge("4");
  return Promise.reject(new Error("This copy has no such edition of that app."));}
function versionOf(app,k){var m=M();if(app==="ingenium")return ver();if(app==="cd"&&k==="sample")return m&&m.meta.cd.version;if(app==="forge"&&k==="fdemo")return m&&m.meta.forge.version;return "";}

/* IngShip.onePage (modules/r111.js) asks here: the page every package of this app carries is the edition she chose */
function substitute(id,x,opt){var r=repoOf(id),app=appKey(r),k=r?chosen(r):"master";if(!r||k==="master"||!x)return Promise.resolve(x);
  return pageFor(app,k).then(function(d){x.bytes=d.u8;x.html=dec.decode(d.u8);x.edition=k;x.editionVersion=d.version||versionOf(app,k);
    x.inlined=0;x.missing=[];return x;});}

/* the package's name, id and version for the edition chosen (Fabrica's pkgOf asks here) */
function pkg(r,P){var k=chosen(r);if(!P||k==="master")return P;var app=appKey(r),base=String(P.title||"App").replace(/\s+(Full|Gift|Demo|Sample)$/,"");
  P.title=(base+" "+SHORT[k]).slice(0,50);
  if(k!=="full"&&!new RegExp("\\."+(k==="fdemo"?"demo":k)+"$").test(String(P.id||"")))P.id=String(P.id||"")+"."+(k==="fdemo"?"demo":k);
  var v=versionOf(app,k);if(v)P.version=v;P.edition=k;
  P.note=(P.note?P.note+" ":"")+(k==="full"?"The Full edition keeps the master's id, so on a device it installs over the master in place and keeps the work there."
    :"This edition has an id of its own, so it installs beside your own copy and never opens your work.");
  return P;}

function noteFor(app,k,e){var v=versionOf(app,k);
  if(k==="master")return "Every package below carries the version you kept"+(app==="ingenium"?": your master edition.":".");
  var what=(app==="ingenium"?"Ingenium's ":app==="cd"?"Carpe Diem's ":"The Forge's ")+e.name+(v?" ("+v+")":"");
  return "Every package below carries "+what+", put together from this copy and checked against its fingerprint. "+
    (k==="full"?"It keeps the master's app id, so on a device it installs over the master in place and keeps the work there.":"It takes an app id of its own, so it installs beside your own copy and never opens your work.");}

/* Fabrica's Ship: the editions as Fabrica's own keys, under the package line */
function row(host,r,o){o=o||{};var h=H(),app=appKey(r),list=editionsOf(app);if(!h||!host||!list.length)return null;var k=chosen(r);
  var box=D.createElement("div");box.className="r420-ed";box.setAttribute("role","group");box.setAttribute("aria-label","Which edition every package carries");
  var lab=D.createElement("span");lab.className="r420-lab";lab.textContent="Edition";box.appendChild(lab);
  list.forEach(function(e){var b=h.btn("sm"+(e.k===k?" pri":""),e.name,function(){if(e.k===chosen(r))return;choose(r,e.k);if(typeof o.onChange==="function")o.onChange(e.k);else{try{h.paint();}catch(_){}}});
    b.setAttribute("aria-pressed",e.k===k?"true":"false");b.setAttribute("data-edition",e.k);b.title=e.says;box.appendChild(b);});
  var n=D.createElement("p");n.className="r420-note";n.textContent=noteFor(app,k,list.filter(function(e){return e.k===k;})[0]);box.appendChild(n);
  host.appendChild(box);return box;}

/* Download as an app (modules/r139.js): the editions as the panel's own list, beside the app's name and id */
function select(idb,r,o){o=o||{};var app=appKey(r),list=editionsOf(app);if(!idb||!list.length)return null;var k=chosen(r);
  var l=D.createElement("label");l.appendChild(D.createTextNode("Edition"));var s=D.createElement("select");s.className="r420-sel";s.setAttribute("data-r420","1");
  list.forEach(function(e){var op=D.createElement("option");op.value=e.k;op.textContent=e.name;op.title=e.says;if(e.k===k)op.selected=true;s.appendChild(op);});
  s.onchange=function(){choose(r,s.value);if(typeof o.onChange==="function")o.onChange(s.value);};
  l.appendChild(s);idb.insertBefore(l,idb.firstChild);return l;}

W.IngEditions={list:editionsOf,chosen:chosen,choose:choose,pageFor:pageFor,substitute:substitute,pkg:pkg,row:row,select:select};
try{W.__ingParts["p420"]="running";}catch(_){}
})();
</script>
