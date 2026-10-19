<script>try{(window.__ingParts=window.__ingParts||{})["p51"]="started";}catch(_){}
/* R120 · THE FORGE AND INKWELL, CARRIED INSIDE INGENIUM
   Her request (17 October 2026): "update its copies of the Forge and Inkwell since they have been updated recently."
   Ingenium now carries The Forge and Inkwell inside its own page, compressed, with each page's size and SHA-256
   fingerprint (source/build/apps/builtin, written by apps/update_builtin.py from the apps' own repositories).
   Soon after the app opens, when the app library holds no copy of one, or an older one, the built-in page is unpacked,
   checked against its size and fingerprint, and kept on this device; the copy before it stays one step back. A copy
   she added herself that is newer, or that Ingenium cannot place in order, is never replaced without her say: the
   card offers the built-in copy instead. Lector reads them, Fabrica opens them and the chat attaches them, as before.
   The Forge is named by its pass (630) as its BUILD_INFO names it; its stamp (9s62) is kept as the build.
   R122 (18 October 2026), at the owner's word, "add Carpe Diem into Ingenium as well to finish the Offline Project":
   Carpe Diem (the committee demo's standalone page, 1052) is carried and kept the same way, named by its pass.
   And the same day: "I want for Ingenium to also have an updated copy of itself to ready and work on to complete the
   Offline Project apps." A page cannot carry itself inside itself, so each new version keeps its own page instead:
   on first start it reads the page it was opened from, checks that the page names the version that is running, and
   keeps it in the app library beside the others, where Lector reads it and Fabrica opens it. A newer Ingenium added
   by hand is never replaced. Where the page was opened as a file and cannot read itself, the card says so. */
(function r120(){
var BI=/*R120_BUILTIN*/null;
if(!BI||typeof libKeep!=="function"||typeof libState!=="function")return;
var KEYS=["inkwell","forge","cd"].filter(function(k){return BI[k];}),DONE={},RUN=null;

/* ---------- versions: a pass (630), a dotted version (7.42) or a Forge stamp (9s62); unlike kinds are not compared ---------- */
function parts(v){v=String(v||"").trim();var m;
  if((m=/^(\d+)s(\d+)$/.exec(v)))return {t:"stamp",n:[+m[1],+m[2]]};
  if(/^\d+(\.\d+)*$/.test(v))return {t:"num",n:v.split(".").map(Number)};
  return null;}
function cmp(a,b){var x=parts(a),y=parts(b);if(!x||!y||x.t!==y.t)return null;
  for(var i=0;i<Math.max(x.n.length,y.n.length);i++){var p=x.n[i]||0,q=y.n[i]||0;if(p!==q)return p>q?1:-1;}return 0;}
/* how the kept copy stands against the built-in one */
function standing(k){var b=BI[k],m=libState().apps[k];if(!b)return "absent";if(!m||!m.ref)return "none";
  if(String(m.sha256||"").toLowerCase()===b.sha256)return "same";
  var pairs=[[b.version,m.version],[b.build,m.version],[b.version,m.build],[b.build,m.build]];
  for(var i=0;i<pairs.length;i++){var c=cmp(pairs[i][0],pairs[i][1]);if(c!==null)return c>0?"older":(c<0?"newer":"other");}
  return "other";}

/* ---------- the built-in page: decoded, inflated, and checked before it is kept ---------- */
function bytesOf(k){var el=document.getElementById("ing-builtin-"+k);if(!el)return Promise.reject(new Error("this page carries no copy of "+LIB_NAMES[k]));
  return new Promise(function(res){var s=atob(el.textContent.trim()),u=new Uint8Array(s.length);for(var i=0;i<s.length;i++)u[i]=s.charCodeAt(i);res(u);})
    .then(function(gz){try{if(typeof DecompressionStream==="function")
        return new Response(new Blob([gz]).stream().pipeThrough(new DecompressionStream("gzip"))).arrayBuffer().then(function(b){return new Uint8Array(b);},function(){return ingInflateGzip(gz);});}catch(e){}
      return ingInflateGzip(gz);});}
function unpack(k){var b=BI[k];
  return bytesOf(k).then(function(u8){if(u8.length!==b.size)throw new Error(LIB_NAMES[k]+" did not unpack whole (its size differs)");
    return libSha(u8).then(function(h){if(h!==b.sha256)throw new Error(LIB_NAMES[k]+" did not unpack whole (its fingerprint differs)");return u8;});});}
function keep(k){var b=BI[k];
  return unpack(k).then(function(u8){var text=new TextDecoder().decode(u8);
    return libKeep(k,{title:b.title,version:b.version,build:b.build||"",date:b.date||"",size:b.size,sha256:b.sha256,name:b.name,source:"built in"},u8,text);});}
/* a kept copy whose bytes are gone from this device is kept again */
function present(m){if(!m||!m.ref)return Promise.resolve(false);
  return libTx("readonly",function(s){return s.count(m.ref);}).then(function(n){if(n>0)return true;
    return libText(m.key||"").then(function(t){return !!t;},function(){return false;});},function(){return true;});}

/* ---------- the quiet first start: once per opening, when nothing else is busy ---------- */
function seed(opts){opts=opts||{};if(RUN)return RUN;if(typeof libOn==="function"&&!libOn())return Promise.resolve({});
  var out={},kept=[],t0=Date.now();
  RUN=KEYS.reduce(function(p,k){return p.then(function(){var st=standing(k);if(st==="absent"){out[k]="absent";return;}
      var m=libState().apps[k];
      var check=st==="same"?present(Object.assign({key:k},m)).then(function(ok){return ok?"same":"lost";}):Promise.resolve(st);
      return check.then(function(s){out[k]=s;if(s!=="none"&&s!=="older"&&s!=="lost")return;
        return keep(k).then(function(r){out[k]=s==="lost"?"kept again":"kept";kept.push(LIB_NAMES[k]+" "+BI[k].version);},function(e){out[k]="failed: "+(e&&e.message||e);});});});},Promise.resolve())
  .then(function(){return selfSeed().then(function(st){out.ingenium=st;if(st==="kept"||st==="kept again")kept.push("Ingenium "+selfVersion()+" (this copy)");});})
  .then(function(){DONE=out;window.__ingBuiltin={states:out,ms:Date.now()-t0};
    if(kept.length&&!LIB.busy){LIB.warn=false;LIB.note="Kept on this device from inside Ingenium: "+kept.join(", ")+". Each was checked against its fingerprint.";}
    repaint();RUN=null;return out;});
  return RUN;}
function useBuiltin(k,btn){if(LIB.busy)return;if(btn){btn.disabled=true;btn.textContent="Keeping…";}LIB.busy="Keeping the built-in "+LIB_NAMES[k]+" "+BI[k].version+"…";libPaint();
  keep(k).then(function(r){LIB.busy=null;LIB.warn=false;DONE[k]="kept";
      LIB.note=(r==="same"?"Already kept, unchanged: ":"Kept on this device: ")+LIB_NAMES[k]+" "+BI[k].version+" (built in). The copy before it stays one step back.";},
    function(e){LIB.busy=null;LIB.warn=true;LIB.note=String(e&&e.message||e);})
  .then(repaint);}
function repaint(){try{libPaint();}catch(e){}
  try{if(typeof lxRender==="function"&&document.getElementById("l7Bf"))lxRender();}catch(e){}
  try{var c=$("libCard");if(c){var n=document.createElement("div");n.innerHTML=libCardHtml();if(n.firstChild){c.replaceWith(n.firstChild);libWire();}}}catch(e){}}

/* ---------- the Your apps card says what Ingenium carries, and offers it where her copy differs ---------- */
/* R134: the apps it carries are named by version alone, with no date (the owner's words: "keep only the build number") */
function also(a){return a.length<2?a.join(""):a.slice(0,-1).join(", ")+" and "+a[a.length-1];}
function line(){var names=KEYS.slice().reverse().filter(function(k){return BI[k];}).map(function(k){var b=BI[k];return esc(LIB_NAMES[k]+" "+b.version);});
  var keys=KEYS.slice().reverse().filter(function(k){var s=standing(k);return BI[k]&&(s==="newer"||s==="other");}).map(function(k){var s=standing(k);
    return '<button class="btn small ghost" type="button" data-bi-use="'+k+'" title="'+(s==="newer"?"Your kept copy is newer; this goes back to the built-in one, and yours stays one step back":"Your kept copy is a different build; yours stays one step back")+'">Use the built-in '+esc(LIB_NAMES[k]+" "+BI[k].version)+'</button>';});
  return '<p class="small muted lib-builtin" id="libBuiltin">Built into this Ingenium: '+also(names)+'. They are kept here on first start, checked against their fingerprints. A newer copy you add yourself always stays.'+selfLine()+'</p>'
    +(keys.length?'<div class="lx-row lib-builtin-keys">'+keys.join("")+'</div>':"");}
/* the same, in the Your apps section of Lector's page */
function lectorLine(busy){var wrap=document.createElement("div");wrap.className="lib-builtin-wrap";wrap.id="libBuiltin";
  var tmp=document.createElement("div");tmp.innerHTML=line();var p=tmp.querySelector("p");if(p){p.className="l-hint lib-builtin";p.removeAttribute("id");wrap.appendChild(p);}
  var ks=tmp.querySelectorAll("[data-bi-use]");if(ks.length){var row=document.createElement("div");row.className="l-keys";
    [].forEach.call(ks,function(b){var k=b.getAttribute("data-bi-use"),x=document.createElement("button");x.type="button";x.className="l-btn quiet";x.textContent=b.textContent;x.title=b.title;x.setAttribute("data-bi-use",k);
      x.onclick=function(){if(busy){ingToast("Lector is at work on a set. Pause it first.");return;}useBuiltin(k,x);};row.appendChild(x);});wrap.appendChild(row);}
  return wrap;}
(function wrapCard(){var oh=libCardHtml;libCardHtml=function(){var h=oh.apply(this,arguments);if(!h)return h;
    var i=h.indexOf('<div class="lx-row">');return i>=0?h.slice(0,i)+line()+h.slice(i):h;};
  var ow=libWire;libWire=function(){var r=ow.apply(this,arguments);
    document.querySelectorAll("[data-bi-use]").forEach(function(b){b.onclick=function(){useBuiltin(b.getAttribute("data-bi-use"),b);};});return r;};})();

/* ---------- the Forge named by its pass, as its own BUILD_INFO names it ---------- */
(function(){var o=libVersionOf;libVersionOf=function(key,text){var m;
  if(key==="forge"&&(m=/window\.CD_BUILD=\{date:"[^"]*",pass:"(\d+)"/.exec(String(text||""))))return m[1];
  return o.apply(this,arguments);};})();

/* ---------- Ingenium's own copy of itself, as it is now ---------- */
var SELF={state:null};
function selfVersion(){try{return String(typeof ING_VERSION!=="undefined"?ING_VERSION:"");}catch(e){return "";}}
function selfStanding(){var v=selfVersion(),m=libState().apps.ingenium;if(!v)return "absent";if(!m||!m.ref)return "none";
  var c=cmp(v,m.version);if(c===null)return "other";return c>0?"older":(c<0?"newer":"same");}
/* the page this copy was opened from: fetched, or read the older way where a fetch is refused */
function selfBytes(){var url=location.href.split("#")[0];
  /* R131: a page written into a frame (about:srcdoc, as a website shows Ingenium in a room) has no address to read back */
  if(!/^(https?|file):/i.test(location.protocol))return Promise.reject(new Error("this copy has no address of its own to read back"));
  return fetch(url,{cache:"no-store"}).then(function(r){if(!r.ok)throw new Error("no");return r.arrayBuffer();})
    .catch(function(){return new Promise(function(res,rej){try{var x=new XMLHttpRequest();x.open("GET",url,true);x.responseType="arraybuffer";
      x.onload=function(){if((x.status===200||x.status===0)&&x.response&&x.response.byteLength)res(x.response);else rej(new Error("no"));};x.onerror=function(){rej(new Error("no"));};x.send();}catch(e){rej(e);}});})
    .then(function(b){return new Uint8Array(b);});}
/* the version the page names, read from its bytes without turning the whole page into text */
function namedVersion(u8){var pat='ING_VERSION="',p=[];for(var i=0;i<pat.length;i++)p.push(pat.charCodeAt(i));
  for(var k=0,n=u8.length-p.length;k<n;k++){if(u8[k]!==p[0])continue;var j=1;while(j<p.length&&u8[k+j]===p[j])j++;
    if(j===p.length){var e=k+j,v="";while(e<u8.length&&u8[e]!==34&&v.length<20)v+=String.fromCharCode(u8[e++]);return v;}}
  return "";}
function keepSelf(){var v=selfVersion();
  return selfBytes().then(function(u8){var head=new TextDecoder().decode(u8.subarray(0,Math.min(u8.length,400000)));
      if(libDetect(head)!=="ingenium")throw new Error("the page read back is not Ingenium's");
      var nv=namedVersion(u8);if(nv!==v)throw new Error("the page read back names "+(nv||"no version")+", not "+v);
      return libSha(u8).then(function(h){var text=libShell()?new TextDecoder().decode(u8):"";
        return libKeep("ingenium",{title:"Ingenium",version:v,build:"",date:"",size:u8.length,sha256:h,name:"ingenium.html",source:"this copy"},u8,text);});});}
function selfSeed(){var st=selfStanding();if(st==="absent"||st==="newer"||st==="other"){SELF.state=st;return Promise.resolve(st);}
  var m=libState().apps.ingenium,check=st==="same"?present(Object.assign({key:"ingenium"},m)).then(function(ok){return ok?"same":"lost";}):Promise.resolve(st);
  return check.then(function(s){if(s==="same"){SELF.state="same";return "same";}
    return keepSelf().then(function(r){SELF.state=s==="lost"?"kept again":"kept";return SELF.state;},
      function(e){SELF.state="unread";SELF.why=String(e&&e.message||e);return "unread";});});}
function selfLine(){var v=selfVersion();if(!v)return "";var st=SELF.state,m=libState().apps.ingenium;
  if(st==="unread")return ' This copy, Ingenium '+esc(v)+', could not read its own page here ('+(/^(https?|file):/i.test(location.protocol)?'it was opened as a file':'it was written into a frame')+'), so it is not kept beside them: add Ingenium’s page with Add your apps.';
  if(m&&m.ref&&cmp(v,m.version)===0)return ' Ingenium '+esc(v)+' keeps a copy of itself beside them, ready for Lector and Fabrica.';
  if(m&&m.ref&&cmp(v,m.version)<0)return ' A newer Ingenium ('+esc(m.version)+') that you added stays as it is.';
  return ' Ingenium '+esc(v)+' keeps a copy of itself beside them on first start.';}

/* ---------- when: after the app is ready and the page is idle ---------- */
function later(){var go=function(){if(LIB.busy){setTimeout(later,15000);return;}seed();};
  if(typeof requestIdleCallback==="function")requestIdleCallback(go,{timeout:20000});else setTimeout(go,500);}
(function start(){if(/[#&]ingapp=/.test(location.hash||""))return;/* R123: a window of its own keeps nothing */var tries=0;(function wait(){if(window.__ingReady===true){setTimeout(later,9000);return;}if(++tries<240)setTimeout(wait,500);})();})();
/* R125 (18 October 2026), the owner's word: "update the tours for all of the apps ... so that everything is cohesive and
   describe the latest versions of the apps". The tour names the apps Ingenium carries, where Lector keeps them. */
(function tourCard(){try{if(!Array.isArray(ING_TOUR)||ING_TOUR.some(function(s){return s.r125;}))return;var at=-1;
  ING_TOUR.forEach(function(s,i){if(s.chap==="Lector"&&s.sub==="The brief")at=i;});if(at<0)return;
  ING_TOUR.splice(at+1,0,{r125:1,chap:"Lector",sub:"Your apps",go:function(){go("lector");},ring:[".l-apps"],
    t:"📦 Your apps, carried inside",b:"Your apps, on Lector's page, holds the family's apps. The Forge, Inkwell and Carpe Diem travel inside Ingenium and are kept on this device on its first start, each checked against its fingerprint, beside a copy of this Ingenium itself. Lector reads any of them from end to end, and Fabrica opens them as repositories. A newer copy you add yourself always stays.",
    tip:"Nothing needs downloading: each version of Ingenium brings the builds of its sister apps that it was made with."});}catch(e){}})();
window.IngBuiltin={lectorLine:lectorLine,meta:BI,standing:standing,seed:seed,keep:keep,unpack:unpack,use:useBuiltin,cmp:cmp,states:function(){return DONE;},
  self:{version:selfVersion,standing:selfStanding,keep:keepSelf,seed:selfSeed,state:function(){return SELF;},namedVersion:namedVersion}};
})();
;try{window.__ingParts["p51"]="running";}catch(_){}
</script>
