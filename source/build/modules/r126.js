<script>try{(window.__ingParts=window.__ingParts||{})["p54"]="started";}catch(_){}
/* R126 · LECTOR'S RECIPE
   The owner's request (18 October 2026), in the owner's words: "give the models inside of Ingenium the same capabilities to replicate
   that process flawlessly with no issues and keep that recipe in its code and memory so that it can continue to
   generate new documents for every app after every update so that the project dossiers for the apps and my resumes,
   cover letters and Linkedin kits and other apps' related documents are always updated and always reflect the latest
   builds." And: "I need Ingenium's Lector to be more than capable of doing that inside of the app, I built it for that
   purpose, first and foremost."
   The recipe is the process the owner's documents of 18 October 2026 were made by, kept here as code (recipe/recipe.json, written
   by gen_recipe.py) and as memory (state.recipe, and the owner's documents in Ingenium's own store on this device):
   1. Measure. Each app is opened from the copy kept on this device, in a hidden frame that has no storage of Ingenium's
      and a policy that lets nothing leave the device: every request it tries is refused and written down. Its figures
      are read from the app itself (build, tour, tutor, models...), with the size, lines and fingerprint of the copy.
      Each measurement is kept beside the ones before it, so that what a new build changed can be named.
   2. Keep. The owner's documents (Word, PDF, text) are kept on this device, the Word file itself too, never sent anywhere.
   3. Check. Every figure a new build has made untrue is found where it stands in the owner's words, with the figure that
      replaces it; and every sentence that breaks one of the owner's rules is marked (Lector in an academic document; Ingenium
      or Inkwell in a sociology one; "no request" where the app checks its own helper; a dash; an unverified source).
   4. Update. The figures the owner ticks are changed in the Word file itself, run by run, so the owner's layout and
      words stay as they were; the version before is kept. A sentence that needs new words can be offered to the model, with the rules
      and the measures, and is checked before the owner sees it.
   5. Write by the recipe. When Lector writes, the rules and the latest measures travel with every section, and the
      verified sources can be put in My sources, each with a note on the one claim it supports, so that Lector cites
      them (and only them, with the owner's own) in the style the owner chooses.
   Nothing personal is in the code: no name, no programme. The owner's documents stay on the owner's device. */
(function r126Recipe(){
var RX=/*R126_RECIPE*/null;
if(!RX||!Array.isArray(RX.refs))return;
var KEYS=["cd","forge","ingenium","inkwell"],NAME={cd:"Carpe Diem",forge:"The Forge",ingenium:"Ingenium",inkwell:"Inkwell"};
var M=["January","February","March","April","May","June","July","August","September","October","November","December"];
function st(){if(!state.recipe||typeof state.recipe!=="object")state.recipe={};var s=state.recipe;
  if(!s.facts||typeof s.facts!=="object")s.facts={};if(!Array.isArray(s.docs))s.docs=[];if(!Array.isArray(s.extra))s.extra=[];if(s.on===undefined)s.on=true;return s;}
function save(){try{saveState();}catch(e){}}
function el(tag,cls,text){var e=document.createElement(tag);if(cls)e.className=cls;if(text!=null)e.textContent=text;return e;}
function nf(n){return String(n).replace(/\B(?=(\d{3})+(?!\d))/g,",");}
function day(t){var d=new Date(t||Date.now());return d.getDate()+" "+M[d.getMonth()]+" "+d.getFullYear();}
function isoDay(s){var m=/^(\d{4})-(\d{2})-(\d{2})/.exec(String(s||""));return m?(+m[3])+" "+M[+m[2]-1]+" "+m[1]:"";}
var ONES=["zero","one","two","three","four","five","six","seven","eight","nine","ten","eleven","twelve","thirteen","fourteen","fifteen","sixteen","seventeen","eighteen","nineteen"],
  TENS=["","","twenty","thirty","forty","fifty","sixty","seventy","eighty","ninety"];
function word(n){n=+n;if(!(n>=0&&n<100)||n%1)return null;if(n<20)return ONES[n];return TENS[Math.floor(n/10)]+(n%10?"-"+ONES[n%10]:"");}
function cap(s){return s?s.charAt(0).toUpperCase()+s.slice(1):s;}
function toast(t){try{ingToast(t);}catch(e){}}

/* ================= 1. MEASURE ================= */
var CSP="default-src 'none'; script-src 'unsafe-inline' 'unsafe-eval' 'wasm-unsafe-eval' blob: data:; style-src 'unsafe-inline' blob: data:; img-src blob: data:; font-src blob: data:; media-src blob: data:; worker-src blob: data:; child-src blob: data:; frame-src blob: data: about:; connect-src blob: data:; manifest-src 'none'; form-action 'none'";
/* what runs first inside the frame: the record of requests, storage of its own (in memory, so the app never touches
   Ingenium's), and, once the app has settled, its figures, read from the app's own names */
var PROBE=String(function(TOK){var REQ=[],sent=0;
  function add(u,how){u=String(u||"");if(!u||/^(data|blob|about|javascript):/i.test(u))return;for(var i=0;i<REQ.length;i++)if(REQ[i].u===u)return;REQ.push({u:u,how:String(how||"")});}
  document.addEventListener("securitypolicyviolation",function(e){add(e.blockedURI,e.violatedDirective);},true);
  var mem={},S={getItem:function(k){return Object.prototype.hasOwnProperty.call(mem,k)?mem[k]:null;},setItem:function(k,v){mem[k]=String(v);},removeItem:function(k){delete mem[k];},clear:function(){mem={};},key:function(i){return Object.keys(mem)[i]||null;}};
  Object.defineProperty(S,"length",{get:function(){return Object.keys(mem).length;}});
  ["localStorage","sessionStorage"].forEach(function(n){try{window[n].getItem("x");}catch(e){try{Object.defineProperty(window,n,{value:S,configurable:true});}catch(e2){}}});
  try{indexedDB.open("x");}catch(e){try{Object.defineProperty(window,"indexedDB",{value:undefined,configurable:true});}catch(e2){}}
  try{navigator.serviceWorker;}catch(e){try{Object.defineProperty(navigator,"serviceWorker",{value:{register:function(){return Promise.reject(new Error("sandboxed"));},getRegistrations:function(){return Promise.resolve([]);},getRegistration:function(){return Promise.resolve(undefined);},addEventListener:function(){},removeEventListener:function(){},controller:null,ready:new Promise(function(){})},configurable:true});}catch(e2){}}
  var ERR=0;window.addEventListener("error",function(e){ERR++;try{e.preventDefault();}catch(x){}},true);window.addEventListener("unhandledrejection",function(e){ERR++;try{e.preventDefault();}catch(x){}});
  function measure(){var o={};function sh(k,f){try{var v=f();if(v!==undefined&&v!==null)o[k]=v;}catch(e){}}
    /* Carpe Diem */
    sh("cdBuild",function(){return JSON.parse(JSON.stringify(CD_BUILD));});sh("cdTour",function(){return DEMO_TOUR.length;});
    sh("cdTutor",function(){return Object.keys(MAGISTER_CHARACTERS).length;});sh("cdConcepts",function(){return CONCEPTS.length;});
    sh("cdConceptsDescribed",function(){return Object.keys(CONCEPT_INFO).length;});sh("cdGuiding",function(){return Object.keys(MODULE_GUIDING).length;});
    sh("cdQuizzes",function(){return Object.keys(ALL_QUIZZES).length;});sh("cdCourses",function(){return ASC_COURSES.length;});
    sh("cdGuide",function(){return GUIDE_NAV.length;});sh("cdStyles",function(){return FONTES.STYLES.length;});
    sh("cdApps",function(){var n=0,k=0;["TABULA_SRC","ABACUS_SRC","SLIDES_SRC","SCRIBA_SRC","FONTES_SRC"].forEach(function(x){try{var s=(0,eval)(x);if(typeof s==="string"){k++;n+=Math.floor(s.length*3/4)-((/=+$/.exec(s)||[""])[0].length);}}catch(e){}});return k===5?n:undefined;});
    /* The Forge */
    sh("forgeTour",function(){return FORGE_TOUR.length;});
    sh("forgeBuild",function(){var e=document.querySelector("#aboutStamp .build");return e?e.textContent.trim():undefined;});
    sh("forgeCarried",function(){return JSON.parse(document.getElementById("forge-bi-meta").textContent).apps.map(function(a){return {title:a.title,version:String(a.version),size:a.size,sha256:a.sha256,self:!!a.self};});});
    /* Ingenium */
    sh("ingVersion",function(){return ING_VERSION;});sh("ingTour",function(){return ING_TOUR.length;});
    sh("ingLineup",function(){var L=ING_LINEUP.models||{},C=ING_CATALOG||[],mk={},hm={},names={},ps=[],pin=0;
      Object.keys(L).forEach(function(k){var m=L[k];if(m.maker){mk[String(m.maker).replace(/ \(.*\)/,"")]=1;hm[String(m.maker).replace(/ \(.*\)/,"")]=1;}if(m.params)ps.push(+m.params);if(/^[0-9a-f]{64}$/.test(m.sha256||""))pin++;names[String(m.name).toLowerCase()]=1;});
      C.forEach(function(m){if(m.maker)mk[String(m.maker).replace(/ \(.*\)/,"")]=1;if(m.params)ps.push(+m.params);names[String(m.name).toLowerCase()]=1;});
      return {house:Object.keys(L).length,pinned:pin,catalog:C.length,models:Object.keys(names).length,makers:Object.keys(mk).length,houseMakers:Object.keys(hm).length,pmin:Math.min.apply(null,ps),pmax:Math.max.apply(null,ps)};});
    sh("ingPages",function(){var n=document.querySelectorAll(".nav-btn[data-page]").length;return n||undefined;});
    /* Inkwell */
    sh("inkBuild",function(){return BUILD;});sh("inkTour",function(){return TOUR.length;});
    sh("title",function(){return document.title;});return o;}
  function send(){if(sent)return;sent=1;var f={};try{f=measure();}catch(e){}try{parent.postMessage({recipe:TOK,facts:f,req:REQ,errors:ERR},"*");}catch(e){}}
  window.addEventListener("load",function(){setTimeout(send,6500);});setTimeout(send,32000);});
function inject(html,tok){var r='<meta http-equiv="Content-Security-Policy" content="'+CSP+'"><script>('+PROBE+')("'+tok+'");<\/script>';
  var m=/<head[^>]*>/i.exec(html.slice(0,20000));return m?html.slice(0,m.index+m[0].length)+r+html.slice(m.index+m[0].length):r+html;}
function frameMeasure(text){return new Promise(function(res){var tok="rx"+Date.now().toString(36)+Math.random().toString(36).slice(2),done=false;
  var fr=document.createElement("iframe");fr.setAttribute("sandbox","allow-scripts");fr.setAttribute("aria-hidden","true");fr.tabIndex=-1;
  fr.style.cssText="position:fixed;left:-12000px;top:0;width:1280px;height:820px;border:0;pointer-events:none";
  var url=URL.createObjectURL(new Blob([inject(text,tok)],{type:"text/html"}));
  function fin(r){if(done)return;done=true;window.removeEventListener("message",on);try{fr.remove();}catch(e){}setTimeout(function(){URL.revokeObjectURL(url);},1000);res(r);}
  function on(e){if(e.source===fr.contentWindow&&e.data&&e.data.recipe===tok)fin(e.data);}
  window.addEventListener("message",on);setTimeout(function(){fin(null);},45000);fr.src=url;document.body.appendChild(fr);});}
function sha(u8){if(window.crypto&&crypto.subtle&&crypto.subtle.digest)return crypto.subtle.digest("SHA-256",u8).then(function(b){return Array.from(new Uint8Array(b)).map(function(x){return x.toString(16).padStart(2,"0");}).join("");});
  return Promise.resolve(typeof libShaJS==="function"?libShaJS(u8):"");}
function sortReq(req,base){var out={outside:[],loopback:[],own:[]};(req||[]).forEach(function(r){var u=r.u;
    if(/^https?:\/\/(127\.0\.0\.1|localhost|\[::1\])(:\d+)?\//i.test(u))out.loopback.push(u);else if(/^https?:/i.test(u))out.outside.push(u);else out.own.push(u.replace(/^.*\//,""));});return out;}
/* the figures, from what the frame read and from the copy itself */
function factsOf(key,text,r,label){var u8=new TextEncoder().encode(text),f=(r&&r.facts)||{},v={};
  v.bytes=u8.length;v.mb=(u8.length/1e6).toFixed(1);v.lines=text.split("\n").length;
  if(key==="cd"&&f.cdBuild){v.pass=String(f.cdBuild.pass||"");v.stamp=String(f.cdBuild.stamp||"");v.date=String(f.cdBuild.date||"");v.edition=String(f.cdBuild.edition||"");}
  if(key==="cd"){["Tour","Tutor","Concepts","ConceptsDescribed","Guiding","Quizzes","Courses","Guide","Styles","Apps"].forEach(function(k){if(f["cd"+k]!=null)v[k.charAt(0).toLowerCase()+k.slice(1)]=f["cd"+k];});}
  if(key==="forge"){var b=/(\d{4}-\d{2}-\d{2})\s*·\s*(\d+)\s*·\s*(\S+)/.exec(f.forgeBuild||"");if(b){v.date=b[1];v.pass=b[2];v.stamp=b[3];}if(f.forgeTour!=null)v.tour=f.forgeTour;if(f.forgeCarried)v.carried=f.forgeCarried;}
  if(key==="ingenium"){if(f.ingVersion)v.version=String(f.ingVersion);if(f.ingTour!=null)v.tour=f.ingTour;if(f.ingPages)v.pages=f.ingPages;
    var L=f.ingLineup;if(L){v.house=L.house;v.pinned=L.pinned;v.catalog=L.catalog;v.models=L.models;v.makers=L.makers;v.houseMakers=L.houseMakers;v.pmin=L.pmin;v.pmax=L.pmax;}}
  if(key==="inkwell"){var ib=/^([\d.]+)/.exec(String(f.inkBuild||""));if(ib)v.version=ib[1];if(f.inkTour!=null)v.tour=f.inkTour;}
  v.requests=r?sortReq(r.req):null;v.read=!!(r&&r.facts&&Object.keys(r.facts).length>1);v.title=f.title||"";
  return sha(u8).then(function(h){v.sha=h;return v;});}
var BUSY=null;
function keptKeys(){var L={};try{L=libState().apps||{};}catch(e){}return KEYS.filter(function(k){return L[k]&&L[k].ref;});}
/* measure one kept app, or an extra copy the owner added (an edition: the committee demo, the full edition...) */
function measureOne(key,o){o=o||{};var get=o.text?Promise.resolve(o.text):(typeof libText==="function"?libText(key):Promise.resolve(null));
  return get.then(function(text){if(!text)throw new Error(NAME[key]+" is not kept on this device yet.");
    return frameMeasure(text).then(function(r){return factsOf(key,text,r,o.label);});})
  .then(function(v){var S=st(),meta=null;try{meta=libState().apps[key]||null;}catch(e){}
    var rec={at:Date.now(),copy:o.label||(meta&&meta.source==="built in"?"the copy Ingenium carries":meta&&meta.source==="this copy"?"this copy of Ingenium":"the copy kept on this device"),v:v};
    var slot=o.extraId?("x:"+o.extraId):key;var H=S.facts[slot]=S.facts[slot]||[];
    if(H.length&&H[0].v&&H[0].v.sha===v.sha)H[0]=rec;else{H.unshift(rec);while(H.length>6)H.pop();}save();return rec;});}
function measureEdition(key,text,ed,label,fileName){var S=st(),x=ed?S.extra.filter(function(e){return e.app===key&&e.edition===ed;})[0]:null;
  var id=x?x.id:"e"+Date.now().toString(36);label=label||(ed?edName(ed):fileName)||"another copy";
  return measureOne(key,{text:text,label:label,extraId:id}).then(function(rec){if(x){x.label=label;x.name=fileName||x.name;x.at=Date.now();}
      else S.extra.push({id:id,app:key,edition:ed||"",label:label,name:fileName||"",at:Date.now()});save();return rec;});}
function measureAll(onStep){if(BUSY)return BUSY;var ks=keptKeys(),out={},i=0;
  BUSY=(function next(){if(i>=ks.length)return Promise.resolve(out);var k=ks[i++];if(onStep)onStep(k,i,ks.length);
    return measureOne(k).then(function(r){out[k]=r;},function(e){out[k]={error:String(e&&e.message||e)};}).then(next);})()
    .then(function(r){BUSY=null;st().measured=Date.now();save();return r;},function(e){BUSY=null;throw e;});return BUSY;}
function latest(slot){var H=st().facts[slot];return H&&H[0]?H[0]:null;}
/* EDITIONS (the owner's word, 18 October 2026: "update the figures of Carpe Diem to reflect the full version of the latest
   build"). A copy measured as an edition keeps its own history, and a figure the owner's words give to that edition ("27.6 MB
   in the full edition") is checked against that copy alone: never against the demonstration Ingenium carries. */
var EDITIONS=[{id:"full",name:"Full edition",re:/\bfull edition\b/gi},{id:"committee",name:"Committee demonstration",re:/\bcommittee (?:demonstration|demo)\b/gi},{id:"sample",name:"Public sample",re:/\bpublic sample\b/gi}];
function edName(id){var e=EDITIONS.filter(function(x){return x.id===id;})[0];return e?e.name:"";}
function edGuess(s){s=String(s||"").toLowerCase();return /full/.test(s)?"full":/committee|comit/.test(s)?"committee":/sample|chantillon/.test(s)?"sample":"";}
function edCopy(key,ed){var S=st(),x=S.extra.filter(function(e){return e.app===key&&e.edition===ed;})[0];return x&&latest("x:"+x.id)?x:null;}
/* the edition a figure belongs to: the nearest edition named after it in its clause (within a short reach), else the nearest
   before it; a clause ends at a semicolon or a full stop */
function edAt(s,i,len){var a=i,b=i+len;while(a>0&&s.charAt(a-1)!==";"&&!(s.charAt(a-1)===" "&&s.charAt(a-2)==="."))a--;
  while(b<s.length&&s.charAt(b)!==";"&&!(s.charAt(b)==="."&&(b+1>=s.length||s.charAt(b+1)===" ")))b++;
  var after=null,before=null;EDITIONS.forEach(function(E){var re=new RegExp(E.re.source,"gi"),m,c=s.slice(a,b);while((m=re.exec(c))){var at=a+m.index;
      if(at>=i+len&&at-(i+len)<=90&&(!after||at<after.at))after={id:E.id,at:at};if(at+m[0].length<=i&&i-(at+m[0].length)<=60&&(!before||at>before.at))before={id:E.id,at:at};}});
  return after?after.id:before?before.id:null;}

/* ================= the figures, and how each stands in the owner's words ================= */
/* each figure: its key, its label, how it was measured, and the forms it takes in prose (the same template filled with
   the old value and with the new one, so that a match is replaced by its own form) */
function F(k,label,how,forms,ctx){return {k:k,label:label,how:how,forms:forms,ctx:ctx};}
var BUILDCTX=1;
var FIG={
  cd:[F("pass","Build (pass)","read from the app (CD_BUILD)",function(v){return ["Carpe Diem build "+v,"Carpe Diem "+v,"build counter now reads "+v,"builds "+v,"build "+v,"Build "+v,"pass "+v];},BUILDCTX),
    F("stamp","Build stamp","read from the app",function(v){return ["stamp "+v,"· "+v];}),
    F("tour","Guided tour, cards","counted in the app (DEMO_TOUR)",function(v){return ["tour of "+v+" cards",v+" cards"];}),
    F("tutor","Tutor entries","counted in the app",function(v){return [v+"-entry",v+" entries",v+" character entries"];}),
    F("concepts","Concept entries","counted in the app",function(v){return [v+" concept entries","of the "+v+" concept"];}),
    F("conceptsDescribed","Concepts described in this copy","counted in the app",function(v){return ["describes "+v];}),
    F("guide","Guidebook chapters","counted in the app",function(v){return [v+" guidebook chapters",v+" chapters"];}),
    F("styles","Citation styles in Fontes","counted in the app",function(v){var w=word(v);return [v+" styles"].concat(w?[w+" styles"]:[]);}),
    F("courses","Ascensus courses in this copy","counted in the app",function(v){var w=word(v);return [v+" of the thirteen courses"].concat(w?[w+" of the thirteen courses"]:[]);}),
    F("apps","The five apps inside, decoded (bytes)","decoded in the app",function(v){return [nf(v)+" bytes"];}),
    F("bytes","Size of the copy (bytes)","counted from the file",function(v){return [nf(v)+" bytes"];}),
    F("mb","Size of the copy (MB)","from the byte count",function(v){return [v+" MB",v+" megabytes"];}),
    F("lines","Lines in the copy","counted from the file",function(v){return [nf(v)+" lines"];})],
  forge:[F("pass","Build (pass)","read from its About panel",function(v){return ["The Forge build "+v,"Forge build "+v,"The Forge "+v,"builds "+v,"build "+v,"Build "+v,"pass "+v];},BUILDCTX),
    F("stamp","Build stamp","read from its About panel",function(v){return ["stamp "+v,"· "+v];}),
    F("tour","Guided tour, cards","counted in the app (FORGE_TOUR)",function(v){return ["tour of "+v+" cards",v+" cards"];}),
    F("bytes","Size of the copy (bytes)","counted from the file",function(v){return [nf(v)+" bytes"];}),
    F("mb","Size of the copy (MB)","from the byte count",function(v){return [v+" MB",v+" megabytes"];}),
    F("lines","Lines in the copy","counted from the file",function(v){return [nf(v)+" lines"];})],
  ingenium:[F("version","Version","read from the app (ING_VERSION)",function(v){return ["Ingenium version "+v,"Ingenium "+v,"version "+v,"Version "+v];},BUILDCTX),
    F("tour","Guided tour, cards","counted in the app (ING_TOUR)",function(v){return ["tour of "+v+" cards",v+" cards"];}),
    F("house","House models","counted in the app",function(v){var w=word(v);return w?[w+" house models",cap(w)+" house models","its own "+w+" models","Its own "+w+" models",cap(w)+" are Ingenium’s own house models",w+" models from",cap(w)+" models from"]:[v+" house models"];}),
    F("catalog","Catalogue models","counted in the app",function(v){var w=word(v);return w?["catalogue of "+w,w+" further models",cap(w)+" further models",w+" more",cap(w)+" strong, open models"]:["catalogue of "+v];}),
    F("models","Models in all, distinct","counted in the app",function(v){var w=word(v);return w?[cap(w)+" open-weight models",w+" open-weight models",cap(w)+" models",w+" models"]:[v+" models"];}),
    F("makers","Makers in all","counted in the app",function(v){var w=word(v);return w?["from "+w+" makers"]:["from "+v+" makers"];}),
    F("houseMakers","Makers of the house models","counted in the app",function(v){var w=word(v);return w?["from "+w+" makers",w+" makers"]:["from "+v+" makers"];}),
    F("pages","Pages","counted in the app",function(v){var w=word(v);return w?["its "+w+" pages",w+" pages",cap(w)+" pages",cap(w)+", with a guided tour"]:[v+" pages"];}),
    F("bytes","Size of the copy (bytes)","counted from the file",function(v){return [nf(v)+" bytes"];}),
    F("mb","Size of the copy (MB)","from the byte count",function(v){return [v+" MB",v+" megabytes"];}),
    F("lines","Lines in the copy","counted from the file",function(v){return [nf(v)+" lines"];})],
  inkwell:[F("version","Version","read from the app (BUILD)",function(v){return ["Inkwell version "+v,"Inkwell "+v,"version "+v,"Version "+v];},BUILDCTX),
    F("tour","Guided tour, cards","counted in the app (TOUR)",function(v){return ["tour of "+v+" cards",v+" cards"];}),
    F("bytes","Size of the copy (bytes)","counted from the file",function(v){return [nf(v)+" bytes"];}),
    F("mb","Size of the copy (MB)","from the byte count",function(v){return [v+" MB",v+" megabytes"];}),
    F("lines","Lines in the copy","counted from the file",function(v){return [nf(v)+" lines"];})]};
/* the values a document may still carry: every earlier measurement, and the builds the recipe was written for */
function olds(key){var S=st(),H=S.facts[key]||[],cur=H[0]?H[0].v:null,o={};if(!cur)return {cur:null,old:{}};
  function add(k,val){if(val==null||val==="")return;if(String(val)===String(cur[k]))return;(o[k]=o[k]||[]);if(o[k].indexOf(String(val))<0)o[k].push(String(val));}
  H.slice(1).forEach(function(h){Object.keys(h.v||{}).forEach(function(k){if(typeof h.v[k]!=="object")add(k,h.v[k]);});});
  var B=RX.base&&RX.base.apps&&RX.base.apps[key];if(B)Object.keys(B).forEach(function(k){add(k,B[k]);});
  return {cur:cur,old:o};}
function oldsEd(key,x){var H=st().facts["x:"+x.id]||[],cur=H[0]?H[0].v:null,o={};if(!cur)return {cur:null,old:{}};
  function add(k,val){if(val==null||val===""||typeof val==="object")return;if(String(val)===String(cur[k]))return;(o[k]=o[k]||[]);if(o[k].indexOf(String(val))<0)o[k].push(String(val));}
  H.slice(1).forEach(function(h){Object.keys(h.v||{}).forEach(function(k){add(k,h.v[k]);});});
  var B=RX.base&&RX.base.editions&&RX.base.editions[key]&&RX.base.editions[key][x.edition];if(B)Object.keys(B).forEach(function(k){add(k,B[k]);});
  return {cur:cur,old:o};}

/* ================= 2. KEEP: the owner's documents, on this device ================= */
function b64(u8){var s="",i,CH=0x8000;for(i=0;i<u8.length;i+=CH)s+=String.fromCharCode.apply(null,u8.subarray(i,i+CH));return btoa(s);}
function unb64(s){var bin=atob(s),u8=new Uint8Array(bin.length);for(var i=0;i<bin.length;i++)u8[i]=bin.charCodeAt(i);return u8;}
function bufOf(f){return f.arrayBuffer?f.arrayBuffer():new Promise(function(res,rej){var r=new FileReader();r.onload=function(){res(r.result);};r.onerror=function(){rej(r.error);};r.readAsArrayBuffer(f);});}
function guessTpl(name,text){var f=String(name||"").toLowerCase().replace(/[_\-.]+/g," "),t=String(text||"").slice(0,600).toLowerCase();
  function F(w){return f.indexOf(w)>=0;}function T(w){return t.indexOf(w)>=0;}
  var cd=F("carpe")||F("carpediem"),fg=F("forge"),ing=F("ingenium"),ink=F("inkwell");
  /* the owner's file names say what a document is; its opening words only when the name does not */
  if(F("linkedin"))return "kit";if(F("send where")||F("which documents"))return "guide";
  if(/\bcv\b/.test(f)&&!F("summary")){if(F("sociology"))return "cv-soc";if(F("digital")||F("academic"))return "cv-dh";return "cv-pro";}
  if(F("summary")){if(ink)return "summary-ink";if(ing&&!cd)return "summary-ing";return "summary-cd";}
  if(ink)return F("appendix")?"appendix-ink":"dossier-ink";
  if(F("supplement"))return "supplement-ing";
  if(ing&&!cd)return F("appendix")?"appendix-ing":"dossier-ing";
  if(fg&&!cd)return F("appendix")?"appendix-forge":"dossier-forge";
  if(F("appendix"))return "appendix-dh";if(F("dossier"))return "dossier-soc";
  if(T("curriculum vitae"))return T("sociology")&&!T("digital")?"cv-soc":T("digital humanities")?"cv-dh":"cv-pro";
  if(T("companion to my cv")||T("project summary"))return T("inkwell")?"summary-ink":T("ingenium")&&!T("carpe diem")?"summary-ing":"summary-cd";
  if(T("linkedin positioning")||T("linkedin kit"))return "kit";
  if(T("supplement"))return "supplement-ing";if(T("appendix"))return "appendix-dh";if(T("dossier"))return "dossier-soc";return "";}
function tplOf(d){return RX.docs.filter(function(t){return t.id===(d&&d.tpl);})[0]||null;}
function addDocs(files){var S=st();return Promise.all([].slice.call(files||[]).map(function(f){
    var isDocx=/\.docx$/i.test(f.name),ref=IngBig.newId(),bin=isDocx?IngBig.newId():null;
    return bufOf(f).then(function(buf){var u8=new Uint8Array(buf);
      var text=isDocx?docxParas(u8).then(function(P){return P.map(function(p){return p.text;}).join("\n");}):readAsText(f);
      return text.then(function(t){t=String(t||"").replace(/\r/g,"");if(t.trim().length<20)throw new Error(f.name+" holds no text that could be read.");
        return Promise.all([IngBig.put(ref,t),bin?IngBig.put(bin,b64(u8)):null]).then(function(){
          var d={id:"rd"+Date.now().toString(36)+Math.random().toString(36).slice(2,6),name:f.name,ref:ref,bin:bin,chars:t.length,at:Date.now(),tpl:guessTpl(f.name,t),ver:[],found:null};
          S.docs.push(d);return d;});});}).catch(function(e){toast(String(e&&e.message||e));return null;});}))
  .then(function(ds){ds=ds.filter(Boolean);save();return ds;});}
function dropDoc(id){var S=st(),d=S.docs.filter(function(x){return x.id===id;})[0];if(!d)return;
  [d.ref,d.bin].concat((d.ver||[]).map(function(v){return v.ref;}),(d.ver||[]).map(function(v){return v.bin;})).forEach(function(r){if(r)try{IngBig.del(r);}catch(e){}});
  S.docs=S.docs.filter(function(x){return x.id!==id;});save();}

/* ================= the Word file: paragraphs and their runs ================= */
var DEC={"&amp;":"&","&lt;":"<","&gt;":">","&quot;":'"',"&apos;":"'"};
function dec(s){return s.replace(/&(amp|lt|gt|quot|apos);/g,function(m){return DEC[m];}).replace(/&#(\d+);/g,function(m,n){return String.fromCharCode(+n);}).replace(/&#x([0-9a-f]+);/gi,function(m,n){return String.fromCharCode(parseInt(n,16));});}
function enc(s){return String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");}
function zipRead(u8){var E=libZipEntries(u8);if(!E||!E["word/document.xml"])return Promise.reject(new Error("This Word file could not be opened."));
  var names=Object.keys(E);return Promise.all(names.map(function(n){return libZipData(u8,E[n]);})).then(function(ds){var o={};names.forEach(function(n,i){o[n]=ds[i];});return o;});}
/* each paragraph of the document's body, with its text runs: [{s,e (in the XML), raw, text}] */
function parasOfXml(xml){var out=[],re=/<w:p[ >][\s\S]*?<\/w:p>|<w:p\/>/g,m;while((m=re.exec(xml))){var p=m[0],base=m.index,runs=[],tr=/<w:t(?:\s[^>]*)?>([^<]*)<\/w:t>/g,t,txt="";
    while((t=tr.exec(p))){var open=t[0].slice(0,t[0].indexOf(">")+1),s=base+t.index+open.length,raw=t[1];runs.push({s:s,e:s+raw.length,open:base+t.index,openLen:open.length,raw:raw,text:dec(raw),at:txt.length});txt+=dec(raw);}
    out.push({text:txt,runs:runs});}return out;}
function docxParas(u8){var E=libZipEntries(u8);if(!E||!E["word/document.xml"])return Promise.reject(new Error("This Word file could not be opened."));
  return libZipData(u8,E["word/document.xml"]).then(function(x){return parasOfXml(new TextDecoder().decode(x));});}
/* change the document's XML: each edit is {p: paragraph index, at, len, to}, applied run by run so that formatting holds */
function editXml(xml,edits){var P=parasOfXml(xml),by={},ops=[];
  edits.forEach(function(ed){var f=ed.from!=null?ed.from:null,t=String(ed.to),a=ed.at,len=ed.len;
    /* only what differs: "320-entry" to "323-entry" changes one digit, so the runs around it keep their own formatting */
    if(f!=null&&f.length===len){var k=0;while(k<f.length&&k<t.length&&f.charAt(k)===t.charAt(k))k++;var z=0;while(z<f.length-k&&z<t.length-k&&f.charAt(f.length-1-z)===t.charAt(t.length-1-z))z++;
      a+=k;len=f.length-k-z;t=t.slice(k,t.length-z);if(!len&&!t)return;}
    (by[ed.p]=by[ed.p]||[]).push({at:a,len:len,to:t});});
  Object.keys(by).forEach(function(pi){var p=P[+pi];if(!p)return;var cur=p.runs.map(function(r){return r.text;});
    by[pi].sort(function(x,y){return y.at-x.at;}).forEach(function(ed){var a=ed.at,b=ed.at+ed.len,first=true;
      p.runs.forEach(function(r,ri){var rs=r.at,re2=r.at+r.text.length;var touches=ed.len?(re2>a&&rs<b):(a>=rs&&a<=re2&&first);if(!touches)return;
        var c=cur[ri];cur[ri]=c.slice(0,Math.max(0,a-rs))+(first?ed.to:"")+c.slice(Math.max(0,b-rs));first=false;});});
    p.runs.forEach(function(r,ri){if(cur[ri]!==r.text)ops.push({s:r.s,e:r.e,open:r.open,openLen:r.openLen,to:enc(cur[ri])});});});
  ops.sort(function(x,y){return y.s-x.s;});
  ops.forEach(function(o){xml=xml.slice(0,o.s)+o.to+xml.slice(o.e);
    var tag=xml.slice(o.open,o.open+o.openLen);if(tag.indexOf("xml:space")<0&&/^\s|\s$/.test(dec(o.to)))xml=xml.slice(0,o.open)+tag.replace(/^<w:t/,'<w:t xml:space="preserve"')+xml.slice(o.open+o.openLen);});
  return xml;}

/* ================= 3. CHECK ================= */
var GUARD=/(last measured|as measured|since|from|earlier|before|until|introduced|replaced|older|previous|prior to|up to|added|added at)\s+(at\s+)?(build|pass|version|Carpe Diem|The Forge|Ingenium|Inkwell)?\s*$/i;
function edge(s,i,len){var b=s.charAt(i-1),a=s.charAt(i+len);return !/[A-Za-z0-9]/.test(b)&&!/[0-9]/.test(a)&&!(/[A-Za-z]/.test(a)&&/[A-Za-z]$/.test(s.substr(i,len)));}
function figFinds(paras,tpl){var out=[],taken={};
  KEYS.forEach(function(key){if(tpl&&tpl.apps&&tpl.apps.indexOf(key)<0)return;
    /* the copy Ingenium keeps answers for figures that name no edition, or an edition with no copy of its own that is
       made from the same build (a demonstration); the full edition holds more, so only its own copy answers for it */
    var srcs=[];var O0=olds(key);if(O0.cur)srcs.push({O:O0,ed:null,L:latest(key)});
    EDITIONS.forEach(function(E){var xc=edCopy(key,E.id);if(xc)srcs.push({O:oldsEd(key,xc),ed:E.id,L:latest("x:"+xc.id),x:xc});});
    function mine(src,ed){if(src.ed)return ed===src.ed;if(!ed)return true;if(ed==="full")return false;return !edCopy(key,ed);}
    srcs.forEach(function(src){var O=src.O;
    FIG[key].forEach(function(fd){var olist=O.old[fd.k];if(!olist||O.cur[fd.k]==null)return;var nowForms=fd.forms(O.cur[fd.k]);
      olist.forEach(function(ov){var oldForms=fd.forms(ov);
        oldForms.forEach(function(form,fi){if(!form||nowForms[fi]==null||form===nowForms[fi])return;
          paras.forEach(function(p,pi){var s=p.text,i=-1;while((i=s.indexOf(form,i+1))>=0){if(!edge(s,i,form.length))continue;
              if(!mine(src,edAt(s,i,form.length)))continue;
              var over=false;for(var j=i;j<i+form.length;j++)if(taken[pi+":"+j]){over=true;break;}if(over)continue;for(var j2=i;j2<i+form.length;j2++)taken[pi+":"+j2]=1;
              var before=s.slice(Math.max(0,i-60),i),guarded=fd.ctx===BUILDCTX&&GUARD.test(before);
              /* "as last measured at build 1051" said of an edition that has now been measured again is true only with the new build */
              var remeasured=guarded&&!!src.ed&&/last measured/i.test(before);if(remeasured)guarded=false;
              var whose=src.ed?src.L.copy+" ("+edName(src.ed).toLowerCase()+")":src.L.copy;
              out.push({kind:"figure",app:key,edition:src.ed||"",fact:fd.k,label:NAME[key]+(src.ed?", "+edName(src.ed).toLowerCase():"")+": "+fd.label,p:pi,at:i,len:form.length,from:form,to:nowForms[fi],on:!guarded,
                why:guarded?"Its sentence speaks of an earlier build on purpose (“"+before.trim().slice(-40)+"”), so it is left as it is unless you tick it.":remeasured?"This edition was measured again on "+day(src.L.at)+", from "+whose+": the build it was last measured at is now "+O.cur[fd.k]+".":"Measured "+day(src.L.at)+" from "+whose+".",ctx:s});}});});});});});});
  return out;}
var RULES=[
  {id:"lector",test:function(t,tpl){return tpl&&tpl.academic;},re:/\bLector\b/g,msg:"An academic document names Lector. Your rule: Lector stays out of dossiers, appendices, supplements and academic CVs."},
  {id:"sociology",test:function(t,tpl){return tpl&&tpl.sociology;},re:/\b(Ingenium|Inkwell)\b/g,msg:"A sociology document names Ingenium or Inkwell. Your rule: sociology documents describe Carpe Diem and The Forge only."},
  {id:"scope",test:function(){return true;},skip:function(t,tpl){var names=["Carpe Diem","Ingenium","Inkwell"].filter(function(n){return t.indexOf(n)>=0;});
      if(names.length)return false;if(/The Forge|\bForge\b/.test(t))return true;return !!(tpl&&tpl.apps&&tpl.apps.length===1&&tpl.apps[0]==="forge");},re:/\b(makes|made|make) no (network )?requests?\b(?! to any outside)|\bno network request\b|\bNo request is made\b/g,msg:"This says the app makes no request at all. Where an app checks its own helper at the device’s loopback address, your rule is to write “no request to any outside service” and to name that check."},
  {id:"dash",test:function(){return true;},find:function(t){var out=[],i=-1;while((i=t.indexOf("\u2014",i+1))>=0)out.push({at:i,len:1});
      i=-1;while((i=t.indexOf(" \u2013 ",i+1))>=0){var b=t.charAt(i-1),a=t.charAt(i+3);if(/[\d\]\)]/.test(b)&&/[\d\[(A-Z]/.test(a))continue;if(/^present\b/.test(t.slice(i+3,i+12)))continue;out.push({at:i,len:3});}return out;},
    msg:"A dash in prose. Your style has none: a full stop, a colon or a comma does the work."},
  {id:"parity",test:function(){return true;},re:/\b(parity with|as good as|on a par with|better than) (Grammarly|ChatGPT|Word|Google Docs|Zotero)\b/gi,msg:"A claim of parity with a product that was not measured. Your rule: no claim beyond the measure."},
  {id:"pronoun",test:function(t,tpl){return tpl&&tpl.academic&&tpl.kind!=="cv";},re:/\b(she|her|hers|herself|he|him|his|himself)\b/gi,msg:"A pronoun in an academic document. Your style there is “the applicant” rather than a pronoun; check whom it names."}];
var RTITLE={dash:"style",pronoun:"style"};function rlabel(id){var r=RX.rules.filter(function(x){return x.id===(RTITLE[id]||id);})[0];return "Your rule: "+(r?r.title:id);}
function you(s){return String(s).replace(/\bthe owner's\b/g,"your").replace(/\bThe owner's\b/g,"Your").replace(/\bthe owner\b/g,"you");}
function ruleFinds(paras,tpl){var out=[];
  /* the References list quotes titles as their publishers set them, so the rules of the owner's prose stop at its heading */
  var refAt=paras.length;paras.forEach(function(p,pi){if(refAt===paras.length&&/^(references|bibliography|works cited|the works)$/i.test(p.text.trim()))refAt=pi;});
  RULES.forEach(function(R){if(!R.test(null,tpl))return;paras.forEach(function(p,pi){if(pi>=refAt)return;if(R.skip&&R.skip(p.text,tpl))return;
      if(R.find){R.find(p.text).forEach(function(m){out.push({kind:"rule",rule:R.id,label:rlabel(R.id),p:pi,at:m.at,len:m.len,from:p.text.substr(m.at,m.len),to:null,on:false,why:R.msg,ctx:p.text});});return;}
      var re=new RegExp(R.re.source,R.re.flags),m;
      while((m=re.exec(p.text))){out.push({kind:"rule",rule:R.id,label:rlabel(R.id),p:pi,at:m.index,len:m[0].length,from:m[0],to:null,on:false,why:R.msg,ctx:p.text});if(!re.global)break;}});});
  /* a preprint cited as if it were peer reviewed */
  var all=paras.map(function(p){return p.text;}).join("\n");
  RX.refs.forEach(function(r){if(!r.caution)return;var fam=(r.csl.author&&r.csl.author[0]&&(r.csl.author[0].family||r.csl.author[0].literal))||"";if(!fam)return;
    var re=new RegExp("\\("+fam+"[^)]*\\d{4}\\)","g");paras.forEach(function(p,pi){var m;while((m=re.exec(p.text))){var near=p.text.slice(Math.max(0,m.index-400),m.index+40).toLowerCase();
        var ok=/preprint/.test(r.caution.toLowerCase())?/preprint/.test(near):/correlat|association|associated|cannot establish/.test(near);
        if(!ok)out.push({kind:"rule",rule:"sources",label:rlabel("sources"),p:pi,at:m.index,len:m[0].length,from:m[0],to:null,on:false,why:r.caution,ctx:p.text});}});});
  /* a source in the References that is neither verified nor in My sources */
  var known=RX.refs.map(function(r){return (r.csl.DOI||"").toLowerCase();}).filter(Boolean),titles=RX.refs.map(function(r){return r.csl.title.toLowerCase().slice(0,40);});
  try{(fontesItems()||[]).forEach(function(c){if(c.DOI)known.push(String(c.DOI).toLowerCase());if(c.title)titles.push(String(c.title).toLowerCase().slice(0,40));});}catch(e){}
  var inRefs=false;paras.forEach(function(p,pi){var t=p.text.trim();if(/^(references|bibliography|works cited|the works)$/i.test(t)){inRefs=true;return;}
    if(!inRefs||t.length<30||!/\d{4}/.test(t))return;var low=t.toLowerCase(),doi=(/10\.\d{4,9}\/[^\s)\]]+/i.exec(t)||[""])[0].replace(/[.,]$/,"").toLowerCase();
    var ok=(doi&&known.indexOf(doi)>=0)||titles.some(function(x){return x.length>12&&low.indexOf(x)>=0;});
    if(!ok)out.push({kind:"rule",rule:"sources",label:rlabel("sources"),p:pi,at:0,len:t.length,from:t,to:null,on:false,why:"This source is neither on the verified list nor in My sources. Check it against its publisher before sending, or add it to My sources once checked.",ctx:p.text});});
  return out;}
/* older builds named in the owner's words that no earlier measurement explains: offered, not ticked */
function olderFinds(paras,tpl,already){var out=[];function covered(pi,a,len){return already.some(function(f){return f.p===pi&&f.at<a+len&&a<f.at+f.len;});}
  var pats={cd:/\b(build|Build|builds|pass|reads)\s+(1\d{3})\b/g,forge:/\b(The Forge(?: build)?|Forge build)\s+(\d{3})\b/g,ingenium:/\b(Ingenium(?: version)?)\s+(\d+\.\d+)\b/g,inkwell:/\b(Inkwell(?: version)?)\s+(\d+\.\d+)\b/g};
  /* each pattern names its app (Carpe Diem's builds are the only four-figure ones), so any document is searched for all four */
  KEYS.forEach(function(key){var L=latest(key);if(!L)return;var now=key==="cd"||key==="forge"?L.v.pass:L.v.version;if(!now)return;
    paras.forEach(function(p,pi){var re=new RegExp(pats[key].source,"g"),m;while((m=re.exec(p.text))){var val=m[2];if(val===String(now))continue;
        var older=key==="cd"||key==="forge"?(+val<+now):(parseFloat(val)<parseFloat(now));if(!older)continue;var at=m.index+m[0].length-val.length;if(covered(pi,at,val.length))continue;
        if(key==="cd"&&/The Forge|Forge/.test(p.text.slice(Math.max(0,m.index-30),m.index)))continue;
        var before=p.text.slice(Math.max(0,at-60),at),onPurpose=GUARD.test(before.replace(/\s*\d*$/,""))||GUARD.test(before);
        out.push({kind:"figure",app:key,fact:key==="cd"||key==="forge"?"pass":"version",label:NAME[key]+": an earlier build named",p:pi,at:at,len:val.length,from:val,to:String(now),on:false,
          why:onPurpose?"Its sentence speaks of an earlier build on purpose (\u201c"+before.trim().slice(-40)+"\u201d), so it is left as it is unless you tick it.":"Your words name "+NAME[key]+" "+val+"; the copy measured on "+day(L.at)+" is "+now+". Tick it if the sentence means the current build.",ctx:p.text});}});});
  return out;}
function paragraphsOf(d){if(d.bin)return IngBig.load(d.bin).then(function(s){return docxParas(unb64(s));});
  return IngBig.load(d.ref).then(function(t){return String(t||"").split("\n").map(function(x){return {text:x};});});}
function check(d){return paragraphsOf(d).then(function(P){var tpl=tplOf(d),a=figFinds(P,tpl),b=olderFinds(P,tpl,a),c=ruleFinds(P,tpl);
    d.found=a.concat(b,c).sort(function(x,y){return (x.p-y.p)||(x.at-y.at);});d.checkedAt=Date.now();save();return d.found;});}

/* ================= 4. UPDATE ================= */
function apply(d){var picks=(d.found||[]).filter(function(f){return f.on&&f.to!=null;});if(!picks.length)return Promise.resolve(null);
  var edits=picks.map(function(f){return {p:f.p,at:f.at,len:f.len,to:f.to,from:f.from};});
  var keepOld={ref:d.ref,bin:d.bin,at:d.at,name:d.name};
  if(d.bin){return IngBig.load(d.bin).then(function(s){var u8=unb64(s);return zipRead(u8).then(function(files){var xml=new TextDecoder().decode(files["word/document.xml"]),nx=editXml(xml,edits);
        files["word/document.xml"]=new TextEncoder().encode(nx);
        var list=Object.keys(files).sort(function(a,b){return a==="[Content_Types].xml"?-1:b==="[Content_Types].xml"?1:0;}).map(function(n){return {name:n,data:files[n]};});
        var out=makeZip(list),u=out instanceof Uint8Array?out:new Uint8Array(out);
        return docxParas(u).then(function(P){var text=P.map(function(p){return p.text;}).join("\n"),nr=IngBig.newId(),nb=IngBig.newId();
          return Promise.all([IngBig.put(nr,text),IngBig.put(nb,b64(u))]).then(function(){return finish(nr,nb,text.length,picks.length);});});});});}
  return IngBig.load(d.ref).then(function(t){var L=String(t||"").split("\n");edits.sort(function(a,b){return (b.p-a.p)||(b.at-a.at);}).forEach(function(e){var s=L[e.p]||"";L[e.p]=s.slice(0,e.at)+e.to+s.slice(e.at+e.len);});
    var text=L.join("\n"),nr=IngBig.newId();return IngBig.put(nr,text).then(function(){return finish(nr,null,text.length,picks.length);});});
  function finish(nr,nb,chars,n){d.ver=[keepOld].concat(d.ver||[]);while(d.ver.length>3){var x=d.ver.pop();if(x.ref)IngBig.del(x.ref);if(x.bin)IngBig.del(x.bin);}
    d.ref=nr;d.bin=nb;d.chars=chars;d.at=Date.now();d.updated=(d.updated||0)+1;d.found=null;save();return n;}}
function saveDoc(d){var base=d.name.replace(/\.(docx|txt|md|pdf)$/i,""),stamp=" (updated "+day(d.at)+")";
  if(d.bin)return IngBig.load(d.bin).then(function(s){return saveFileNative(base+stamp+".docx","application/vnd.openxmlformats-officedocument.wordprocessingml.document",unb64(s));});
  return IngBig.load(d.ref).then(function(t){return saveFileNative(base+stamp+".md","text/markdown",String(t||""));});}
function undo(d){var v=(d.ver||[])[0];if(!v)return;[d.ref,d.bin].forEach(function(r){if(r)IngBig.del(r);});d.ref=v.ref;d.bin=v.bin;d.at=v.at;d.ver=d.ver.slice(1);d.found=null;save();}

/* the model, for a sentence that needs new words: given the rules and the measures, checked before the owner sees it */
function modelId(){try{return (lxState().brief||{}).modelId||null;}catch(e){return null;}}
function figuresIn(s){return (String(s).replace(/(\d),(\d{3})/g,"$1$2").match(/\d+(?:\.\d+)?/g)||[]);}
function suggest(d,f){var para=f.ctx,facts=factsText(),rule=(RX.rules.filter(function(r){return r.id===f.rule;})[0]||{});
  var msgs=[{role:"system",content:"You revise one paragraph of the owner's document so that it follows the owner's rules, changing as few words as you can. Keep the owner's voice and sentences and every figure that is still true. Use only the measured facts given. Never invent a fact, a name, a number or a source. British spelling; no dashes; no lists. Return only the revised paragraph."+layerRules()},
    {role:"user",content:"THE OWNER'S RULE TO FOLLOW: "+(rule.title?rule.title+". "+rule.text:f.why)+"\n\nWHAT WAS FOUND: "+f.why+"\n\nMEASURED FACTS:\n"+facts+"\n\nTHE PARAGRAPH:\n"+para}];
  return lxAsk({modelId:modelId()},msgs,700,0.2).then(function(t){t=String(t||"").replace(/<think>[\s\S]*?<\/think>/g,"").trim().replace(/^["“]|["”]$/g,"");
    if(!t||t.length<20)throw new Error("The model gave no paragraph.");
    var ok=figuresIn(para).concat(figuresIn(facts)),bad=figuresIn(t).filter(function(x){return ok.indexOf(x)<0&&+x>12;});
    if(bad.length)throw new Error("The model wrote figures that are not in the paragraph or the measures ("+bad.slice(0,4).join(", ")+"), so its version was set aside.");
    if(/—/.test(t))t=t.replace(/\s*—\s*/g,", ");
    return {kind:"figure",app:f.app||"",fact:"words",label:"New words for: "+f.label,p:f.p,at:0,len:para.length,from:para,to:t,on:true,why:"Written by the model under your rules and checked: every figure in it is in the paragraph or the measures.",ctx:para};});}

/* ================= 5. WRITE BY THE RECIPE ================= */
function factsText(){var out=[];KEYS.forEach(function(k){var L=latest(k);if(!L)return;var v=L.v,bits=[];
    if(k==="cd")bits.push("build "+v.pass+(v.date?", dated "+isoDay(v.date):"")+(v.edition?" ("+v.edition+")":""),"guided tour of "+v.tour+" cards","tutor of "+v.tutor+" entries",v.concepts+" concept entries ("+v.conceptsDescribed+" described in this copy)",v.guide+" guidebook chapters",v.styles+" citation styles in Fontes");
    if(k==="forge")bits.push("build "+v.pass+(v.stamp?" (stamp "+v.stamp+")":"")+(v.date?", dated "+isoDay(v.date):""),"guided tour of "+v.tour+" cards",v.carried?("carries "+v.carried.map(function(a){return a.title+" "+a.version;}).join(", ")):"");
    if(k==="ingenium")bits.push("version "+v.version,"guided tour of "+v.tour+" cards",v.house+" house models from "+v.houseMakers+" makers, "+v.pinned+" pinned by SHA-256",v.catalog+" catalogue models",v.models+" models in all from "+v.makers+" makers",v.pages+" pages");
    if(k==="inkwell")bits.push("version "+v.version,"guided tour of "+v.tour+" cards");
    bits.push(v.mb+" MB ("+nf(v.bytes)+" bytes) and "+nf(v.lines)+" lines in "+L.copy);
    var R=v.requests;if(R)bits.push("requests on opening in Ingenium’s measuring frame, where none can leave the device: "+(R.outside.length?R.outside.length+" to outside services ("+R.outside.slice(0,3).join(", ")+")":"none to outside services")+(R.loopback.length?"; "+R.loopback.length+" to the device’s own loopback address":"")+(R.own.length?"; "+R.own.length+" to a file in its own folder":""));
    out.push("- "+NAME[k]+" (measured "+day(L.at)+"): "+bits.filter(Boolean).join("; ")+".");
    EDITIONS.forEach(function(E){var xc=edCopy(k,E.id);if(!xc)return;var XL=latest("x:"+xc.id),xv=XL.v,xb=[];
      if(xv.pass)xb.push("build "+xv.pass+(xv.date?", dated "+isoDay(xv.date):""));if(xv.tour!=null)xb.push("guided tour of "+xv.tour+" cards");if(xv.tutor!=null)xb.push("tutor of "+xv.tutor+" entries");
      if(xv.courses!=null)xb.push(xv.courses+" Ascensus courses");xb.push(xv.mb+" MB ("+nf(xv.bytes)+" bytes) and "+nf(xv.lines)+" lines");
      out.push("- "+NAME[k]+", "+E.name.toLowerCase()+" (measured "+day(XL.at)+" from "+XL.copy+"; give these figures to this edition only): "+xb.join("; ")+".");});});
  Object.keys(RX.devrec||{}).forEach(function(k){var D=RX.devrec[k];out.push("- "+NAME[k]+", from "+D.source+" (attribute these; they were not measured on this device): "+D.items.map(function(x){return x[0]+": "+x[1];}).join("; ")+".");});
  return out.join("\n");}
function layerRules(short){return "\n\nTHE OWNER'S RULES (the recipe kept in Ingenium):\n"+RX.rules.map(function(r){return "- "+r.title+(short?"":": "+r.text);}).join("\n");}
/* a small model with a short memory gets the rules by their titles, and the measures whole */
function layer(short){var f=factsText();return layerRules(short)+(f?"\n\nMEASURED BY THE RECIPE (use these figures exactly, with the build and date they belong to):\n"+f:"")+
  "\n\nVERIFIED SOURCES: where the owner's sources are given, cite only those, each only for the claim its note says it supports; a source whose note says preprint or correlational is named so in the sentence that cites it.";}
(function hook(){var tries=0;(function wait(){if(typeof window.lxAsk!=="function"){if(++tries<80)setTimeout(wait,250);return;}if(window.lxAsk.__recipe)return;
  var orig=window.lxAsk,w=function(run,msgs,maxTok,temp,onPiece){try{if(st().on!==false&&Array.isArray(msgs)&&msgs[0]&&msgs[0].role==="system"&&/^You are Lector, writing/.test(String(msgs[0].content||""))&&String(msgs[0].content).indexOf("THE OWNER'S RULES (the recipe")<0){
      var short=false;try{var cx=(typeof lxCtx==="function"&&typeof lxModel==="function")?lxCtx(lxModel(run)):0;short=cx>0&&cx<8192;}catch(e){}
      msgs=msgs.slice();msgs[0]=Object.assign({},msgs[0],{content:msgs[0].content+layer(short)});}}catch(e){}return orig.call(this,run,msgs,maxTok,temp,onPiece);};
  w.__recipe=1;window.lxAsk=w;})();})();
function sourcesToFontes(){if(typeof fontesAdd!=="function"){toast("My sources is not in this copy of Ingenium.");return 0;}
  return fontesAdd(RX.refs.map(function(r){return Object.assign(JSON.parse(JSON.stringify(r.csl)),{ingNote:"Verified for the recipe: "+r.supports+(r.caution?" Caution: "+r.caution:""),ingRecipe:r.key});}));}
function recipeMd(){var L=["# The recipe","","Kept in Ingenium, "+RX.date+". The process your documents are made and kept true by.","","## Your rules",""];
  RX.rules.forEach(function(r,i){L.push((i+1)+". **"+you(r.title)+".** "+you(r.text));});
  L.push("","## The steps","","1. Measure each app from the copy kept on the device, in a frame from which nothing can leave; keep each measurement beside the ones before.","2. Keep your documents on the device, the Word file itself too.","3. Check every figure a new build has changed, and every rule a sentence breaks.","4. Update your Word file in place, run by run; keep the version before.","5. Write by the rules, with the measures and only verified sources.","","## Your kinds of document","");
  RX.docs.forEach(function(t){L.push("### "+t.title,"For: "+t.audience+(t.academic?" (academic: no Lector)":"")+(t.sociology?" (sociology: Carpe Diem and The Forge only)":""),"Outline: "+t.outline.join("; ")+".",t.refs.length?"Cites: "+t.refs.join(", ")+".":"","");});
  L.push("## Verified sources","");RX.refs.forEach(function(r){L.push("- "+r.cite.replace(/\[([^\]]+)\]\([^)]+\)/g,"$1"),"  Supports: "+r.supports+(r.caution?" Caution: "+r.caution:""));});
  return L.join("\n");}

/* ================= the page ================= */
function rowsFor(key,slot){var H=st().facts[slot||key]||[],cur=H[0],prev=H[1];if(!cur)return [];var B=(RX.base.apps||{})[key]||{};
  if(slot&&slot.indexOf("x:")===0){var xe=st().extra.filter(function(e){return "x:"+e.id===slot;})[0];B=(xe&&xe.edition&&RX.base.editions&&RX.base.editions[key]&&RX.base.editions[key][xe.edition])||{};}
  return FIG[key].filter(function(fd){return cur.v[fd.k]!=null;}).map(function(fd){var was=prev?prev.v[fd.k]:B[fd.k];
    return {label:fd.label,now:String(cur.v[fd.k]),was:was!=null&&String(was)!==String(cur.v[fd.k])?String(was):"",how:fd.how};});}
function sec(){var s=el("div","l-sec rx-sec");s.id="lxRxSec";s.appendChild(el("h3",null,"The recipe"));
  s.appendChild(el("p","rx-lead","Keeps your documents true to each new build: it measures your apps here, finds every figure an update has changed in your own words, and updates your Word files in place, keeping each version. Lector writes by the same rules."));
  var S=st(),line=el("div","rx-status");var bits=KEYS.map(function(k){var L=latest(k);return L?NAME[k]+" "+(L.v.pass||L.v.version||"?"):null;}).filter(Boolean);
  line.textContent=bits.length?"Measured "+day(S.measured||latest(keptKeys()[0]||"cd")&&latest(keptKeys()[0]||"cd").at)+": "+bits.join(" · "):"Not measured yet on this device.";s.appendChild(line);
  var due=S.docs.filter(function(d){return (d.found||[]).some(function(f){return f.on&&f.to!=null;});}).length;
  if(S.docs.length)s.appendChild(el("div","rx-status",S.docs.length+" of your documents kept here"+(due?"; "+due+" with figures to update":"")+"."));
  var keys=el("div","rx-keys");var o=el("button","l-btn pri","Open the recipe");o.type="button";o.onclick=function(){openSheet("facts");};keys.appendChild(o);
  var m=el("button","l-btn",BUSY?"Measuring…":"Measure now");m.type="button";m.disabled=!!BUSY;m.onclick=function(){runMeasure(m);};keys.appendChild(m);s.appendChild(keys);
  var lab=el("label","rx-sw"),cb=el("input");cb.type="checkbox";cb.checked=S.on!==false;cb.onchange=function(){st().on=cb.checked;save();};lab.appendChild(cb);lab.appendChild(el("span",null,"Lector writes by the recipe"));s.appendChild(lab);
  return s;}
function runMeasure(btn){if(BUSY)return;if(btn){btn.disabled=true;btn.textContent="Measuring…";}
  measureAll(function(k,i,n){if(btn)btn.textContent="Measuring "+NAME[k]+" ("+i+" of "+n+")…";var sh=document.getElementById("lxRx");if(sh)paintSheet();})
  .then(function(r){var bad=Object.keys(r).filter(function(k){return r[k]&&r[k].error;});toast(bad.length?"Measured, except "+bad.map(function(k){return NAME[k];}).join(", ")+".":"Your apps are measured.");
    var S=st();return Promise.all(S.docs.map(function(d){return check(d).catch(function(){});}));})
  .then(function(){place(true);if(document.getElementById("lxRx"))paintSheet();},function(e){toast(String(e&&e.message||e));place(true);});}
function place(force){var box=document.getElementById("l7Bf");if(!box)return;var have=document.getElementById("lxRxSec");if(have&&!force)return;
  var s=sec();if(have)have.replaceWith(s);else{var first=box.querySelector(".l-sec");if(first&&first.nextSibling)box.insertBefore(s,first.nextSibling);else box.appendChild(s);}}
var SHEET={tab:"facts",open:{}};
function openSheet(tab){SHEET.tab=tab||SHEET.tab;var host=document.getElementById("lx7")||document.body,sh=document.getElementById("lxRx");
  if(!sh){sh=el("div");sh.id="lxRx";sh.setAttribute("role","dialog");sh.setAttribute("aria-modal","true");sh.setAttribute("aria-label","The recipe");
    sh.onclick=function(e){if(e.target===sh)closeSheet();};host.appendChild(sh);document.addEventListener("keydown",esc1,true);}
  paintSheet();}
function esc1(e){if(e.key==="Escape"&&document.getElementById("lxRx")){e.stopPropagation();closeSheet();}}
function closeSheet(){var sh=document.getElementById("lxRx");if(sh)sh.remove();document.removeEventListener("keydown",esc1,true);place(true);}
function paintSheet(){var sh=document.getElementById("lxRx");if(!sh)return;var keepScroll=sh.querySelector(".rx-body")?sh.querySelector(".rx-body").scrollTop:0;sh.innerHTML="";
  var card=el("div","rx-card"),head=el("div","rx-head");head.appendChild(el("h2",null,"The recipe"));
  var tabs=el("div","rx-tabs");[["facts","Your apps, measured"],["docs","Your documents"],["recipe","The recipe itself"]].forEach(function(t){var b=el("button","rx-tab"+(SHEET.tab===t[0]?" on":""),t[1]);b.type="button";b.setAttribute("aria-pressed",SHEET.tab===t[0]?"true":"false");b.onclick=function(){SHEET.tab=t[0];paintSheet();};tabs.appendChild(b);});
  head.appendChild(tabs);var x=el("button","rx-x","✕");x.type="button";x.setAttribute("aria-label","Close");x.onclick=closeSheet;head.appendChild(x);card.appendChild(head);
  var body=el("div","rx-body");card.appendChild(body);sh.appendChild(card);
  if(SHEET.tab==="facts")paintFacts(body);else if(SHEET.tab==="docs")paintDocs(body);else paintRecipe(body);body.scrollTop=keepScroll;}
function btnq(label,on,cls){var b=el("button","l-btn"+(cls?" "+cls:""),label);b.type="button";b.onclick=on;return b;}
function paintFacts(body){var S=st();
  body.appendChild(el("p","rx-note","Each app is opened from the copy kept on this device, in a hidden frame with no access to Ingenium’s storage and a policy that refuses every request: what it tries is written down, and nothing leaves the device. Its figures are read from the app itself; size, lines and the SHA-256 fingerprint from the copy."));
  var keys=el("div","rx-keys");var mb=btnq(BUSY?"Measuring…":"Measure now",function(){runMeasure(mb);},"pri");mb.disabled=!!BUSY;keys.appendChild(mb);
  keys.appendChild(btnq("Measure another copy…",function(){var i=document.createElement("input");i.type="file";i.accept=".html,.htm";i.onchange=function(){var f=i.files&&i.files[0];if(!f)return;
      var form=el("div","rx-app rx-form");form.appendChild(el("h3",null,"Another copy: "+f.name));form.appendChild(el("div","rx-sub","An edition you keep outside Ingenium, such as a committee demonstration or a full edition. It is measured the same way and kept beside the others; measured again after an update, it keeps its history, and the figures your documents give to that edition are checked against it alone."));
      var sel=el("select","rx-sel");sel.setAttribute("aria-label","Which app it is a copy of");KEYS.forEach(function(k){var o=el("option",null,NAME[k]);o.value=k;sel.appendChild(o);});
      sel.value=/forge/i.test(f.name)?"forge":/ingenium/i.test(f.name)?"ingenium":/inkwell/i.test(f.name)?"inkwell":"cd";
      var es=el("select","rx-sel");es.setAttribute("aria-label","Which edition it is");[["full","Full edition"],["committee","Committee demonstration"],["sample","Public sample"],["","Another copy"]].forEach(function(o){var op=el("option",null,o[1]);op.value=o[0];es.appendChild(op);});
      es.value=edGuess(f.name);
      var nm=el("input","rx-sel");nm.type="text";nm.value=f.name.replace(/\.html?$/i,"");nm.setAttribute("aria-label","A name for this copy");nm.style.minWidth="220px";
      var row=el("div","rx-keys");row.appendChild(sel);row.appendChild(es);row.appendChild(nm);
      var go2=btnq("Measure it",function(){var key=sel.value,label=nm.value.trim()||f.name;go2.disabled=true;go2.textContent="Measuring…";
        bufOf(f).then(function(b){var text=new TextDecoder().decode(new Uint8Array(b));
          return measureEdition(key,text,es.value,label,f.name).then(function(){paintSheet();toast(label+" is measured.");});})
        .catch(function(e){toast(String(e&&e.message||e));go2.disabled=false;go2.textContent="Measure it";});},"pri");
      row.appendChild(go2);row.appendChild(btnq("Cancel",function(){form.remove();},"quiet"));form.appendChild(row);keys.parentNode.insertBefore(form,keys.nextSibling);};i.click();}));
  body.appendChild(keys);
  var any=false;KEYS.concat(S.extra.map(function(x){return "x:"+x.id;})).forEach(function(slot){var key=slot.indexOf("x:")===0?(S.extra.filter(function(x){return "x:"+x.id===slot;})[0]||{}).app:slot;if(!key)return;
    var H=S.facts[slot];if(!H||!H[0])return;any=true;var L=H[0],box=el("div","rx-app");box.style.setProperty("--app",{cd:"#1B6B93",forge:"#17577A",ingenium:"#6A3FB5",inkwell:"#1F4F68"}[key]);
    var xe=slot.indexOf("x:")===0?S.extra.filter(function(e){return "x:"+e.id===slot;})[0]:null;
    var t=el("h3",null,NAME[key]+(xe?" · "+(xe.edition?edName(xe.edition)+(L.copy&&L.copy!==edName(xe.edition)?" ("+L.copy+")":""):L.copy):""));box.appendChild(t);
    box.appendChild(el("div","rx-sub","Measured "+day(L.at)+" from "+L.copy+(L.v.read?"":" · the app’s own figures could not be read in the frame; size and fingerprint only")+" · SHA-256 "+String(L.v.sha||"").slice(0,16)+"…"));
    var tb=el("table","rx-t"),tr=el("tr");["Figure","Now","Before","How"].forEach(function(hh){tr.appendChild(el("th",null,hh));});tb.appendChild(tr);
    rowsFor(key,slot).forEach(function(r){var row=el("tr");row.appendChild(el("td",null,r.label));row.appendChild(el("td","n",r.now));row.appendChild(el("td","w",r.was));row.appendChild(el("td","h",r.how));tb.appendChild(row);});
    var R=L.v.requests;if(R){var row=el("tr");row.appendChild(el("td",null,"Requests on opening"));row.appendChild(el("td","n",R.outside.length?R.outside.length+" outside":"none outside"));
      row.appendChild(el("td","w",""));row.appendChild(el("td","h",(R.loopback.length?R.loopback.length+" to its loopback helper ("+R.loopback[0].replace(/^https?:\/\//,"")+"); ":"")+(R.own.length?R.own.length+" to its own folder; ":"")+"refused in the frame, so none left the device. A page opened another way (from a web address, or the desktop app) may ask for more."));tb.appendChild(row);}
    if(key==="forge"&&L.v.carried){var row2=el("tr");row2.appendChild(el("td",null,"Carries"));row2.appendChild(el("td","n",L.v.carried.length+" apps"));row2.appendChild(el("td","w",""));
      row2.appendChild(el("td","h",L.v.carried.map(function(a){return a.title+" "+a.version+" ("+nf(a.size)+" bytes)";}).join("; ")));tb.appendChild(row2);}
    box.appendChild(tb);body.appendChild(box);});
  if(!any)body.appendChild(el("p","rx-note","Nothing is measured yet. Measure now reads each app kept on this device; it takes about ten seconds an app."));
  var D=RX.devrec||{};Object.keys(D).forEach(function(k){var b=el("div","rx-app");b.appendChild(el("h3",null,NAME[k]+": figures from elsewhere"));b.appendChild(el("div","rx-sub","Not measured on this device: from "+D[k].source+". Documents attribute them so."));
    var tb=el("table","rx-t");D[k].items.forEach(function(x){var r=el("tr");r.appendChild(el("td",null,x[0]));r.appendChild(el("td","n",x[1]));tb.appendChild(r);});b.appendChild(tb);body.appendChild(b);});}
function paintDocs(body){var S=st();
  body.appendChild(el("p","rx-note","Your documents stay on this device: the Word file itself, and its text. Check finds every figure an update has changed, where it stands in your words, and every sentence that breaks one of your rules. Update changes only what you tick, in the Word file itself, so your layout and your words stay yours; the version before is kept."));
  var keys=el("div","rx-keys");keys.appendChild(btnq("Add your documents…",function(){var i=document.createElement("input");i.type="file";i.multiple=true;i.accept=".docx,.pdf,.txt,.md";
      i.onchange=function(){addDocs(i.files).then(function(ds){return Promise.all(ds.map(function(d){return check(d).catch(function(){});}));}).then(function(){paintSheet();place(true);});};i.click();},"pri"));
  if(S.docs.length)keys.appendChild(btnq("Check them all",function(){Promise.all(S.docs.map(function(d){return check(d).catch(function(e){toast(d.name+": "+(e&&e.message||e));});})).then(function(){paintSheet();place(true);});}));
  body.appendChild(keys);
  if(!S.docs.length){body.appendChild(el("p","rx-note","None kept yet. Add your dossiers, appendices, project summaries, CVs, cover letters and your LinkedIn kit: Word files keep their layout when they are updated."));return;}
  if(!keptKeys().some(function(k){return latest(k);}))body.appendChild(el("p","rx-warn","Measure your apps first (the first tab): the check compares your words with the measures."));
  S.docs.forEach(function(d){var box=el("div","rx-doc"),tpl=tplOf(d),hd=el("div","rx-dh");hd.appendChild(el("b",null,d.name));
    var sel=el("select","rx-sel");sel.setAttribute("aria-label","Which kind of document this is");var o0=el("option",null,"Which kind of document?");o0.value="";sel.appendChild(o0);
    RX.docs.forEach(function(t){var o=el("option",null,t.title);o.value=t.id;if(t.id===d.tpl)o.selected=true;sel.appendChild(o);});sel.onchange=function(){d.tpl=sel.value;save();check(d).then(paintSheet);};hd.appendChild(sel);box.appendChild(hd);
    var F=d.found,todo=F?F.filter(function(f){return f.to!=null;}):[],rules=F?F.filter(function(f){return f.kind==="rule";}):[];
    box.appendChild(el("div","rx-sub",(d.bin?"Word file":"Text")+" · kept "+day(d.at)+(d.updated?" · updated "+d.updated+" time"+(d.updated>1?"s":""):"")+(F?" · "+todo.filter(function(f){return f.on;}).length+" figure"+(todo.filter(function(f){return f.on;}).length===1?"":"s")+" to update"+(todo.some(function(f){return !f.on;})?" ("+todo.filter(function(f){return !f.on;}).length+" more offered)":"")+", "+rules.length+" sentence"+(rules.length===1?"":"s")+" to look at":" · not checked yet")+(tpl?" · "+tpl.audience:"")));
    var acts=el("div","rx-keys");acts.appendChild(btnq("Check",function(){check(d).then(paintSheet,function(e){toast(String(e&&e.message||e));});}));
    var ap=btnq("Update what is ticked",function(){ap.disabled=true;apply(d).then(function(n){toast(n?n+" change"+(n>1?"s":"")+" made; the version before is kept.":"Nothing is ticked.");return check(d);}).then(function(){paintSheet();place(true);},function(e){toast(String(e&&e.message||e));paintSheet();});},"pri");
    ap.disabled=!(F&&F.some(function(f){return f.on&&f.to!=null;}));acts.appendChild(ap);
    acts.appendChild(btnq(d.bin?"Save as Word":"Save",function(){saveDoc(d);}));if((d.ver||[]).length)acts.appendChild(btnq("Undo the last update",function(){undo(d);check(d).then(paintSheet);},"quiet"));
    var rm=btnq("Remove",function(){if(rm.dataset.sure!=="1"){rm.dataset.sure="1";rm.textContent="Press again to remove it and its versions";setTimeout(function(){if(rm.isConnected){rm.dataset.sure="";rm.textContent="Remove";}},5000);return;}dropDoc(d.id);paintSheet();place(true);},"quiet");
    acts.appendChild(rm);box.appendChild(acts);
    if(F&&F.length){var list=el("div","rx-finds");F.forEach(function(f,fi){var r=el("div","rx-f "+(f.kind==="rule"?"rule":"fig"));
        if(f.to!=null){var cb=el("input");cb.type="checkbox";cb.checked=!!f.on;cb.setAttribute("aria-label","Change this");cb.onchange=function(){f.on=cb.checked;save();ap.disabled=!F.some(function(g){return g.on&&g.to!=null;});};r.appendChild(cb);}
        else r.appendChild(el("span","rx-dot","!"));
        var tx=el("div","rx-ft");tx.appendChild(el("b",null,f.label));var q=el("div","rx-q"),s=f.ctx||"",a=Math.max(0,f.at-70),z=Math.min(s.length,f.at+f.len+70);
        q.appendChild(document.createTextNode((a>0?"…":"")+s.slice(a,f.at)));var mk=el("mark",null,f.kind==="figure"&&f.fact==="words"?"[the paragraph]":s.substr(f.at,f.len));q.appendChild(mk);
        if(f.to!=null&&f.fact!=="words"){q.appendChild(el("span","rx-arrow"," → "));q.appendChild(el("ins",null,f.to));}q.appendChild(document.createTextNode(s.slice(f.at+f.len,z)+(z<s.length?"…":"")));tx.appendChild(q);
        if(f.fact==="words")tx.appendChild(el("div","rx-q rx-new",f.to));
        tx.appendChild(el("div","rx-why",f.why));
        if(f.kind==="rule"&&f.rule!=="sources"){var sg=btnq("Suggest new words",function(){sg.disabled=true;sg.textContent="The model is writing…";
            suggest(d,f).then(function(nf2){F.splice(fi+1,0,nf2);save();paintSheet();},function(e){sg.disabled=false;sg.textContent="Suggest new words";toast(String(e&&e.message||e));});},"quiet");tx.appendChild(sg);}
        r.appendChild(tx);list.appendChild(r);});box.appendChild(list);}
    else if(F)box.appendChild(el("div","rx-ok","Nothing to change: every figure the recipe knows matches the latest measures, and no rule is broken."));
    body.appendChild(box);});}
function paintRecipe(body){body.appendChild(el("p","rx-note","The recipe is kept in Ingenium’s own code (written "+RX.date+") and in its memory on this device. It is the process your documents are made and kept true by. Lector follows it when it writes"+(st().on!==false?" (on)":" (off: switch it on in Lector’s brief)")+"."));
  var keys=el("div","rx-keys");keys.appendChild(btnq("Put the verified sources in My sources",function(){var n=sourcesToFontes();if(n!==0)paintSheet();},"pri"));
  keys.appendChild(btnq("Use Chicago author-date in My sources",function(){try{fontesState().style="chicago-author-date";save();toast("My sources now formats citations in Chicago, author-date.");}catch(e){}}));
  keys.appendChild(btnq("Save the recipe",function(){saveFileNative("The recipe.md","text/markdown",recipeMd());}));body.appendChild(keys);
  body.appendChild(el("h3","rx-h","Your rules"));var ol=el("ol","rx-rules");RX.rules.forEach(function(r){var li=el("li");li.appendChild(el("b",null,you(r.title)+". "));li.appendChild(document.createTextNode(you(r.text)));ol.appendChild(li);});body.appendChild(ol);
  body.appendChild(el("h3","rx-h","Your kinds of document"));RX.docs.forEach(function(t){var d=el("details","rx-kind"),s=el("summary",null,t.title);d.appendChild(s);
    d.appendChild(el("div","rx-sub","For "+t.audience+(t.academic?" · academic: Lector is not named":"")+(t.sociology?" · sociology: Carpe Diem and The Forge only":"")+(t.employment?" · employment: first person":"")));
    d.appendChild(el("div","rx-q","Outline: "+t.outline.join(" · ")));if(t.refs.length)d.appendChild(el("div","rx-q","Cites: "+t.refs.length+" verified sources"));body.appendChild(d);});
  body.appendChild(el("h3","rx-h","The verified sources ("+RX.refs.length+")"));body.appendChild(el("p","rx-note","Each was checked against Crossref, the arXiv record, Open Library or the issuing body, and each carries the one claim it was verified to support."));
  RX.refs.forEach(function(r){var d=el("div","rx-ref");d.appendChild(el("div","rx-cite",r.cite.replace(/\*([^*]+)\*/g,"$1").replace(/\[([^\]]+)\]\([^)]+\)/g,"$1")));
    d.appendChild(el("div","rx-why","Supports: "+r.supports+(r.caution?" Caution: "+r.caution:"")));body.appendChild(d);});}

/* keep the section in Lector's brief, whatever repaints it */
(function watch(){var tries=0;(function wait(){var box=document.getElementById("l7Bf");if(!box){if(++tries<240)setTimeout(wait,500);return;}place();
  try{new MutationObserver(function(){if(!document.getElementById("lxRxSec"))place();}).observe(box,{childList:true});}catch(e){}})();})();
/* the tour: a card after Lector's "Your apps" */
try{if(typeof ING_TOUR!=="undefined"&&Array.isArray(ING_TOUR)&&!ING_TOUR.some(function(c){return c&&c.r126;})){var at=-1;ING_TOUR.forEach(function(c,i){if(c&&c.chap==="Lector"&&c.sub==="Your apps")at=i;});
  if(at<0)ING_TOUR.forEach(function(c,i){if(c&&c.chap==="Lector")at=i;});
  if(at>=0)ING_TOUR.splice(at+1,0,{r126:1,chap:"Lector",sub:"The recipe",go:function(){go("lector");},ring:["#lxRxSec"],t:"🧾 The recipe",
    b:"The recipe keeps your documents true to each new build. Measure now opens each of your apps in a frame from which nothing can leave this device and reads its figures. Then, in Your documents, Check finds every figure an update has changed in your own words, and every sentence that breaks one of your rules, and Update changes your Word file itself, keeping the version before.",
    tip:"After an update arrives, press Measure now, then Check. Your dossiers, CVs and kit catch up in a minute."});}}catch(e){}
/* the tour: the apps card says Tabula holds a thesis (5.3, R127: apps/tabula_big_patch.py) */
try{if(typeof ING_TOUR!=="undefined"&&Array.isArray(ING_TOUR))ING_TOUR.forEach(function(c){if(c&&c.sub==="Tabula and Abacus"&&typeof c.b==="string"&&c.b.indexOf("100,000")<0)
  c.b+=" Tabula holds a thesis of 100,000 words: a keystroke is answered at once, because only the pages an edit moves are laid out again, and a long document is kept in the browser's larger store, so it is not lost.";});}catch(e){}

window.IngRecipe={data:RX,measureAll:measureAll,measureOne:measureOne,measureEdition:measureEdition,edAt:edAt,latest:latest,addDocs:addDocs,check:check,apply:apply,saveDoc:saveDoc,undo:undo,factsText:factsText,layer:layer,
  docxParas:docxParas,editXml:editXml,parasOfXml:parasOfXml,word:word,open:openSheet,close:closeSheet,sourcesToFontes:sourcesToFontes,recipeMd:recipeMd,state:st,frameMeasure:frameMeasure};
})();
;try{window.__ingParts["p54"]="running";}catch(_){}
</script>
<style id="r126-css">
/* ============ R126 · LECTOR'S RECIPE: the section in the brief, and its sheet ============ */
#lx7 .rx-sec .rx-lead{margin:2px 0 8px;font-size:13px;line-height:1.45;color:var(--ink-2)}
#lx7 .rx-sec .rx-status{font-size:12.5px;color:var(--ink-3);margin:2px 0}
#lx7 .rx-keys{display:flex;flex-wrap:wrap;gap:8px;margin:10px 0 6px;align-items:center}
#lx7 .rx-sw{display:flex;align-items:center;gap:8px;font-size:13px;color:var(--ink-2);margin-top:6px;cursor:pointer}
#lxRx{position:fixed;inset:0;z-index:9000;background:rgba(20,12,36,.42);display:flex;align-items:center;justify-content:center;padding:max(16px,var(--sat,0px)) 16px max(16px,var(--sab,0px))}
#lxRx .rx-card{background:var(--card-hi);color:var(--ink-1);border:1px solid var(--hairline);border-radius:16px;box-shadow:var(--pop-hi);width:min(980px,100%);max-height:100%;display:flex;flex-direction:column;overflow:hidden}
#lxRx .rx-head{display:flex;align-items:center;gap:12px;padding:14px 16px;border-bottom:1px solid var(--hairline);flex-wrap:wrap}
#lxRx .rx-head h2{margin:0;font:600 19px var(--serif,Georgia,serif);color:var(--accent-deep)}
body[data-theme="night"] #lxRx .rx-head h2{color:var(--accent-bright)}
#lxRx .rx-tabs{display:flex;gap:6px;flex-wrap:wrap;flex:1}
#lxRx .rx-tab{border:1px solid var(--hairline);background:var(--card);color:var(--ink-2);border-radius:999px;padding:6px 12px;font-size:13px;cursor:pointer}
#lxRx .rx-tab.on{background:var(--accent-soft);color:var(--ink-1);border-color:rgba(var(--accent-line-rgb),.45);font-weight:600}
#lxRx .rx-x{border:0;background:transparent;color:var(--ink-3);font-size:18px;cursor:pointer;padding:4px 8px;border-radius:8px}
#lxRx .rx-x:hover{background:var(--accent-softer);color:var(--ink-1)}
#lxRx .rx-body{overflow:auto;padding:14px 18px 22px;-webkit-overflow-scrolling:touch}
#lxRx .rx-note{font-size:13.5px;line-height:1.5;color:var(--ink-2);margin:4px 0 8px}
#lxRx .rx-warn{font-size:13.5px;color:var(--warn);margin:6px 0}
#lxRx .rx-app,#lxRx .rx-doc{border:1px solid var(--hairline);border-left:4px solid var(--app,var(--accent));border-radius:12px;padding:10px 12px;margin:12px 0;background:var(--card)}
#lxRx .rx-doc{border-left-color:var(--gold-line)}
#lxRx .rx-app h3,#lxRx .rx-h{margin:2px 0 4px;font:600 15px var(--serif,Georgia,serif)}
#lxRx .rx-h{margin-top:16px;color:var(--accent-deep)}
body[data-theme="night"] #lxRx .rx-h{color:var(--accent-bright)}
#lxRx .rx-sub{font-size:12.5px;color:var(--ink-3);margin:2px 0 6px;line-height:1.4}
#lxRx .rx-t{width:100%;border-collapse:collapse;font-size:13px}
#lxRx .rx-t th{text-align:left;font-weight:600;color:var(--ink-3);border-bottom:1px solid var(--hairline);padding:5px 6px;font-size:12px}
#lxRx .rx-t td{border-bottom:1px solid var(--hairline-soft);padding:5px 6px;vertical-align:top}
#lxRx .rx-t td.n{font-weight:600;white-space:nowrap}
#lxRx .rx-t td.w{color:var(--ink-3);text-decoration:line-through;white-space:nowrap}
#lxRx .rx-t td.h{color:var(--ink-3);font-size:12px}
#lxRx .rx-dh{display:flex;gap:10px;align-items:center;flex-wrap:wrap;justify-content:space-between}
#lxRx .rx-sel{max-width:100%;font-size:13px;padding:4px 6px;border-radius:8px;border:1px solid var(--hairline);background:var(--input-bg);color:var(--ink-1)}
#lxRx .rx-finds{margin-top:6px;display:flex;flex-direction:column;gap:6px}
#lxRx .rx-f{display:flex;gap:10px;align-items:flex-start;border-top:1px solid var(--hairline-soft);padding-top:6px}
#lxRx .rx-f input{margin-top:3px;flex:0 0 auto}
#lxRx .rx-dot{flex:0 0 auto;width:18px;height:18px;border-radius:50%;background:var(--warn);color:#fff;font:700 12px/18px sans-serif;text-align:center;margin-top:1px}
#lxRx .rx-ft{flex:1;min-width:0;font-size:13px}
#lxRx .rx-q{color:var(--ink-2);line-height:1.5;margin:2px 0;overflow-wrap:anywhere}
#lxRx .rx-q mark{background:rgba(202,162,74,.32);color:inherit;border-radius:3px;padding:0 2px}
#lxRx .rx-f.fig .rx-q mark{text-decoration:line-through}
#lxRx .rx-q ins{background:rgba(63,143,94,.22);text-decoration:none;border-radius:3px;padding:0 2px;font-weight:600}
#lxRx .rx-new{border-left:3px solid var(--ok);padding-left:8px}
#lxRx .rx-why{color:var(--ink-3);font-size:12.5px;line-height:1.45}
#lxRx .rx-ok{color:var(--ok);font-size:13px;margin-top:6px}
#lxRx .rx-rules{margin:4px 0 8px 18px;padding:0;font-size:13.5px;line-height:1.5}
#lxRx .rx-rules li{margin:4px 0}
#lxRx .rx-kind{border-top:1px solid var(--hairline-soft);padding:6px 0}
#lxRx .rx-kind summary{cursor:pointer;font-weight:600;font-size:13.5px}
#lxRx .rx-ref{border-top:1px solid var(--hairline-soft);padding:6px 0}
#lxRx .rx-cite{font-size:13px;line-height:1.45;padding-left:22px;text-indent:-22px;overflow-wrap:anywhere}
#lxRx .l-btn{font-size:13px}
@media (max-width:640px){#lxRx{padding:0}#lxRx .rx-card{border-radius:0;height:100%}#lxRx .rx-t td.h{display:none}#lxRx .rx-t th:last-child{display:none}}
@media (prefers-reduced-motion:reduce){#lxRx *{transition:none!important}}
</style>
