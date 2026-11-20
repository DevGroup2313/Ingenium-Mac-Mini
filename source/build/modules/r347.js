<style id="r347-css">
/* ============ R347 · OTHER REPOSITORIES INSIDE ONE (git's submodules), SHOWN IN FABRICA'S FILES (Ingenium 7.57, 20 November 2026) ============
   Fabrica's plan, stage 3, part two's last piece (the audit's recommendation 11, approved in full on 19 November 2026): "Cherry-pick,
   stash and submodules". From 7.57 every version Fabrica makes keeps a repository's submodules (modules/r110.js); here they are shown.
   In Files, each submodule in the folder shown is one more row of the tree, of the tree's own kind (.f-node): its name, then "another
   repository" and the short name of the version it stands at; pressed, the line under the tree says what it is, where it comes from (its
   address in .gitmodules) and that Fabrica keeps it at that version in every version it makes. Nothing else of the view changes. Its
   rows lift and sink as the tree's do (they are .f-node); Minimal or reduced motion keeps them still, as the tree's.
   Shown to her as four pictures one by one at full size (previews/submodules: the row, pressed, and both by night), and her word
   (20 November 2026): "I approve of your preview, please continue working on my requests." */
#fb .f-node.r347-sub .ic{font-size:12px;opacity:.85}
#fb .f-node.r347-sub .sz{font-family:var(--f-mono,ui-monospace,monospace)}
#fb .r347-say b{color:var(--f-ink1);font-family:var(--f-mono,ui-monospace,monospace)}
</style>
<script>try{(window.__ingParts=window.__ingParts||{})["p347"]="started";}catch(_){}
(function r347(){
"use strict";
if(window.IngSubmodules||!window.IngRepo||typeof IngRepo.links!=="function")return;
var W=window,D=document,CACHE={};
function X(){return W.fbHubHost||null;}
function cur(){var x=X();try{return x&&x.cur?x.cur():null;}catch(e){return null;}}
function view(){var x=X();try{return x&&x.S?x.S.view:"";}catch(e){return "";}}
function esc(s){return String(s==null?"":s).replace(/[&<>"']/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c];});}
/* .gitmodules, as git writes it: [submodule "name"] then path = ... and url = ... */
function modules(text){var out={},cur=null;String(text||"").split(/\r?\n/).forEach(function(l){var m=/^\s*\[submodule\s+"([^"]*)"\]\s*$/.exec(l);if(m){cur={name:m[1]};return;}
  var kv=/^\s*(path|url|branch)\s*=\s*(.*?)\s*$/.exec(l);if(cur&&kv){cur[kv[1]]=kv[2];if(kv[1]==="path")out[kv[2]]=cur;}});return out;}
function read(r){var key=r.id+"|"+(r.head||"");if(CACHE[key])return CACHE[key];
  CACHE[key]=Promise.all([IngRepo.links(r.id),IngRepo.readText(r.id,".gitmodules").catch(function(){return "";})]).then(function(x){return {links:x[0]||{},mods:modules(x[1])};},function(){return {links:{},mods:{}};});
  return CACHE[key];}
function draw(){var r=cur();if(!r||view()!=="files")return;var tree=D.querySelector("#fbWorkBody .f-tree");if(!tree||tree.querySelector(".r347-sub")||tree.__r347)return;tree.__r347=1;
  read(r).then(function(got){var t=D.querySelector("#fbWorkBody .f-tree");if(t!==tree||!tree.isConnected)return;var dir="";try{dir=X().S.dir||"";}catch(e){}
    var paths=Object.keys(got.links).filter(function(p){return p.indexOf(dir)===0;}).sort();if(!paths.length)return;
    paths.forEach(function(p){var oid=got.links[p],m=got.mods[p]||{},n=D.createElement("button");n.type="button";n.className="f-node r347-sub";n.setAttribute("data-r347",p);
      n.innerHTML='<span class="ic" aria-hidden="true">⧉</span><span class="nm">'+esc(p.slice(dir.length))+'</span><span class="sz">another repository · '+esc(oid.slice(0,7))+'</span>';
      n.title=p+" is another repository inside this one (a submodule), at "+oid.slice(0,7);
      n.onclick=function(){[].forEach.call(tree.querySelectorAll(".f-node"),function(x){x.setAttribute("aria-pressed",x===n?"true":"false");});
        var say=D.querySelector("#fbWorkBody .f-sec .f-hint");if(!say)return;say.classList.add("r347-say");
        say.innerHTML="<b>"+esc(p)+"</b> is another repository inside this one (a submodule)"+(m.url?", from <b>"+esc(m.url)+"</b>":"")+", at the version "+esc(oid.slice(0,7))+
          ". Every version Fabrica makes keeps it at that version; to change it, work on it in its own repository.";};
      tree.appendChild(n);});});}
var T=0,MO=null,BODY=null;
function soon(){if(!T)T=setTimeout(function(){T=0;try{draw();}catch(e){}},0);}
function watch(){var b=D.getElementById("fbWorkBody");if(!b||b===BODY)return;if(MO)MO.disconnect();BODY=b;MO=new MutationObserver(soon);MO.observe(b,{childList:true});soon();}
setInterval(watch,1200);watch();
W.IngSubmodules={draw:draw,modules:modules};
})();
;try{window.__ingParts["p347"]="running";}catch(_){}
</script>
