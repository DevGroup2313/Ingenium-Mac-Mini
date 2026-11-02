<style id="r187-css">
/* ============ R187 · WHAT CHANGED BETWEEN TWO VERSIONS OF AN APP IN THE LIBRARY (Ingenium 6.8.2) ============
   From her list of next steps: "Implement a version comparison tool to help users understand changes between app versions."
   Fabrica compares any two versions of a project (R141); the library, which keeps several versions of each app (Carpe Diem,
   The Forge, Inkwell, her own, R142), could only list them. Each app there with two versions or more now has Compare
   versions: two versions chosen, a plain summary first (how many places changed, the lines added and taken away, how the
   size moved), then each changed place, named and folded, its lines shown when opened. A block of several megabytes on one
   line (an app carried inside another, a picture) is compared by its fingerprint, and said to have changed or not. */
.r187{max-width:min(860px,92vw)}
.r187 h3{margin:0 0 6px}
.r187 .r187-pick{display:flex;gap:10px;flex-wrap:wrap;align-items:end;margin:8px 0 10px}
.r187 .r187-pick label{display:flex;flex-direction:column;gap:4px;font-size:12px;color:var(--ink-3)}
.r187 .r187-pick select{font:500 13px var(--sans,system-ui);padding:5px 8px;border-radius:8px;border:1px solid var(--line,rgba(0,0,0,.18));background:var(--paper,#fff);color:var(--ink,#222)}
.r187 .r187-sum{font-size:13.5px;line-height:1.55;margin:6px 0 10px}
.r187 .r187-list{max-height:52vh;overflow:auto;border-top:1px solid var(--line,rgba(0,0,0,.1))}
.r187 details{border-bottom:1px solid var(--line,rgba(0,0,0,.1));padding:6px 2px}
.r187 summary{cursor:pointer;font-size:13px;display:flex;gap:8px;flex-wrap:wrap;align-items:baseline}
.r187 summary b{font-weight:600;overflow-wrap:anywhere}
.r187 summary .n{font-size:12px;color:var(--ink-3)}
.r187 summary .n .add{color:#2f6b3a}.r187 summary .n .del{color:#9a2f2f}
.r187 pre{margin:6px 0 2px;font:12px/1.45 ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;white-space:pre-wrap;overflow-wrap:anywhere;max-height:40vh;overflow:auto;background:var(--paper-2,rgba(0,0,0,.03));border-radius:8px;padding:6px 8px}
.r187 pre .add{background:rgba(47,107,58,.13);display:block}.r187 pre .del{background:rgba(154,47,47,.12);display:block}
.r187 .r187-keys{display:flex;gap:8px;justify-content:flex-end;margin-top:12px}
html.cd-dark .r187 summary .n .add,body[data-theme="night"] .r187 summary .n .add{color:#8fd19e}
html.cd-dark .r187 summary .n .del,body[data-theme="night"] .r187 summary .n .del{color:#f0a3a3}
</style>
<script>try{(window.__ingParts=window.__ingParts||{})["p107"]="started";}catch(_){}
(function r187Compare(){"use strict";
var W=window,D=document,BIG=100000;
function esc(t){return String(t==null?"":t).replace(/[&<>"]/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c];});}
function B(n){try{return fmtBytes(n);}catch(e){return Math.round(n/1024)+" KB";}}
function num(n){try{return Number(n).toLocaleString("en-GB");}catch(e){return String(n);}}
function day(t){try{return new Date(t).toLocaleDateString("en-GB",{day:"numeric",month:"long",year:"numeric"});}catch(e){return "";}}
function name(k){try{return (W.LIB_NAMES&&LIB_NAMES[k])||k;}catch(e){return k;}}
function label(v){return (v.version?v.version:"Unnamed")+" · kept "+day(v.at);}
/* a kept version's text, from the store, or from the computer app's copy when the store has lost it (as libText reads) */
function readVer(ref){return W.libTx("readonly",function(s){return s.get(ref);}).catch(function(){return null;}).then(function(b){
  if(b)return new TextDecoder().decode(b instanceof Uint8Array?b:new Uint8Array(b));
  var a=typeof W.libShell==="function"?W.libShell():null;if(!a||typeof a.big_get!=="function")return null;
  return Promise.resolve(a.big_get(ref)).then(function(r){return r&&r.ok&&typeof r.text==="string"?r.text:null;},function(){return null;});});}
/* a line of several megabytes stands for a carried block: compared by its fingerprint, shown by its size */
function digest(s){var e=new TextEncoder().encode(s);return crypto.subtle.digest("SHA-256",e).then(function(h){return [].map.call(new Uint8Array(h),function(x){return ("0"+x.toString(16)).slice(-2);}).join("").slice(0,12);});}
/* each line's place: the nearest part above it that names itself (worked out in one pass, before the blocks are folded) */
function header(l){l=l.length>400?l.slice(0,400):l;
  var m=/<(script|style|div|section|template)\b[^>]*\bid="([^"]+)"/.exec(l);if(m)return (m[1]==="style"?"Styles ":m[1]==="script"?"Script ":"Part ")+m[2];
  m=/\/\*\s*=*\s*(R\d+ ·[^*]{0,80})/.exec(l);if(m)return m[1].replace(/=+\s*$/,"").trim();
  m=/^\s*(?:async\s+)?function\s+([\w$]+)\s*\(/.exec(l);if(m)return "Function "+m[1];
  m=/<h[12][^>]*>([^<]{2,80})</.exec(l);if(m)return "Heading “"+m[1].trim()+"”";return null;}
function linesOf(text){var L=W.IngRepo.core.splitLines(text),names=new Array(L.length),cur="The start of the page",big=[];
  for(var i=0;i<L.length;i++){var h=header(L[i]);if(h)cur=h;names[i]=cur;if(L[i].length>BIG)big.push(i);}
  return Promise.all(big.map(function(i){return digest(L[i]);})).then(function(h){big.forEach(function(i,j){
    L[i]="« a block of "+B(L[i].length)+", fingerprint "+h[j]+" »";});return {lines:L,names:names};});}
function compare(ta,tb){return Promise.all([linesOf(ta),linesOf(tb)]).then(function(x){var a=x[0].lines,b=x[1].lines,R=W.IngRepo.core.lineDiff(a,b),groups=[],by={},add=0,del=0,blocks=0,MAX=400;
    function g(nm){var t=by[nm];if(!t){t=by[nm]={name:nm,add:0,del:0,show:[]};groups.push(t);}return t;}
    R.forEach(function(r){var i,t;
      for(i=r.a0;i<r.a1;i++){t=g(x[0].names[i]);t.del++;del++;if(t.show.length<MAX)t.show.push(["-",a[i]]);}
      for(i=r.b0;i<r.b1;i++){t=g(x[1].names[i]);t.add++;add++;if(t.show.length<MAX)t.show.push(["+",b[i]]);if(b[i].charAt(0)==="«")blocks++;}});
    return {groups:groups,add:add,del:del,blocks:blocks};});}
function linesHtml(res,g){var out=g.show.map(function(x){return '<span class="'+(x[0]==="+"?"add":"del")+'">'+x[0]+" "+esc(x[1].slice(0,2000))+"</span>";});
  var total=g.add+g.del;if(total>g.show.length)out.push("… and "+num(total-g.show.length)+" more lines in this place.");
  return out.join("");}
function open(key,back){var vs=(W.IngStore&&W.IngStore.versions)?W.IngStore.versions(key):[];if(vs.length<2||typeof W.modalOpen!=="function")return;
  var box=W.modalOpen('<div class="r187"><h3 id="r187H">What changed in '+esc(name(key))+'</h3><p class="small muted" style="margin:0">Two versions kept in your library, side by side: the places that changed, and their lines.</p>'+
    '<div class="r187-pick"><label>From<select id="r187A"></select></label><label>To<select id="r187B"></select></label><button class="btn primary" type="button" id="r187Go">Compare</button></div>'+
    '<div class="r187-sum" id="r187Sum" role="status" aria-live="polite"></div><div class="r187-list" id="r187List"></div><div class="r187-keys"><button class="btn ghost" type="button" id="r187Close">Close</button></div></div>');
  try{box.setAttribute("role","dialog");box.setAttribute("aria-modal","true");box.setAttribute("aria-labelledby","r187H");}catch(e){}
  var A=D.getElementById("r187A"),Bs=D.getElementById("r187B");
  vs.forEach(function(v,i){var o1=D.createElement("option");o1.value=String(i);o1.textContent=label(v);A.appendChild(o1);var o2=o1.cloneNode(true);Bs.appendChild(o2);});
  A.value="1";Bs.value="0";
  D.getElementById("r187Close").onclick=function(){W.closeModal();if(back&&back.focus)try{back.focus();}catch(e){}};
  function run(){var va=vs[+A.value],vb=vs[+Bs.value],sum=D.getElementById("r187Sum"),list=D.getElementById("r187List");list.innerHTML="";
    if(va===vb){sum.textContent="Choose two different versions.";return;}
    sum.textContent="Comparing "+label(va)+" with "+label(vb)+"…";
    Promise.all([readVer(va.ref),readVer(vb.ref)]).then(function(t){if(t[0]==null||t[1]==null){sum.textContent="One of these versions could not be read from the library.";return null;}
      return new Promise(function(r){setTimeout(r,30);}).then(function(){return compare(t[0],t[1]);}).then(function(res){res.sizeA=t[0].length;res.sizeB=t[1].length;return res;});})
    .then(function(res){if(!res)return;var grow=res.sizeB-res.sizeA;
      if(!res.groups.length){sum.textContent="These two versions are the same, line for line.";return;}
      sum.innerHTML="<b>"+esc(name(key))+" "+esc(vb.version||"")+"</b> against "+esc(va.version||"the earlier copy")+": "+num(res.groups.length)+" place"+(res.groups.length===1?"":"s")+" changed, "+
        num(res.add)+" line"+(res.add===1?"":"s")+" added and "+num(res.del)+" taken away"+(res.blocks?", "+num(res.blocks)+" carried block"+(res.blocks===1?"":"s")+" new or changed":"")+
        ". The page "+(grow===0?"kept its size":(grow>0?"grew":"shrank")+" by "+B(Math.abs(grow)))+" ("+B(res.sizeA)+" → "+B(res.sizeB)+").";
      res.groups.forEach(function(g){var d=D.createElement("details"),s=D.createElement("summary");
        s.innerHTML="<b>"+esc(g.name)+"</b><span class=\"n\"><span class=\"add\">+"+num(g.add)+"</span> · <span class=\"del\">−"+num(g.del)+"</span></span>";d.appendChild(s);
        d.addEventListener("toggle",function(){if(d.open&&!d.querySelector("pre")){var pre=D.createElement("pre");pre.innerHTML=linesHtml(res,g);d.appendChild(pre);}});list.appendChild(d);});})
    .catch(function(e){sum.textContent="The comparison stopped: "+((e&&e.message)||e)+".";});}
  D.getElementById("r187Go").onclick=run;setTimeout(function(){try{D.getElementById("r187Go").focus();}catch(e){}},40);run();}
/* the key, on each app of the library that keeps two versions or more (Settings, Your data, Storage) */
function keys(){var box=D.getElementById("stxApps");if(!box||!W.IngStore)return;
  [].forEach.call(box.querySelectorAll(".stx-app"),function(app){if(app.querySelector(".r187-key"))return;var pin=app.querySelector("[data-app]");if(!pin)return;var k=pin.getAttribute("data-app");
    if((W.IngStore.versions(k)||[]).length<2)return;var b=D.createElement("button");b.className="btn small ghost r187-key";b.type="button";b.textContent="Compare versions";
    b.setAttribute("aria-label","Compare two versions of "+name(k));b.onclick=function(){open(k,b);};var h=app.querySelector("h4");if(h)h.appendChild(b);else app.insertBefore(b,app.firstChild);});}
W.ingCompareVersions={open:open,compare:compare};
(function watch(n){var box=D.getElementById("stxApps");if(!box){if(n<60)setTimeout(function(){watch(n+1);},1000);return;}
  keys();try{new MutationObserver(function(){keys();}).observe(box,{childList:true});}catch(e){}})(0);
})();
try{window.__ingParts["p107"]="running";}catch(_){}
</script>
