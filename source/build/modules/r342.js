<style id="r342-css">
/* ============ R342 · FABRICA, STAGE 3, PART TWO: CHERRY-PICK AND CHANGES PUT ASIDE (Ingenium 7.53, 20 November 2026) ============
   Her word on its ten pictures (20 November 2026, source/previews/fabrica_stage3b): "I approve of your previews and recommendations,
   please commit and push them everywhere and continue working on the rest of my requests." 
   Her plan (Fabrica's audit, 19 November 2026, approved in full: "I want them all implemented into Ingenium in the proposed order"):
   "11. Cherry-pick, stash and submodules. On repositories kept in Ingenium and on your drives." This part: cherry-pick and stash, as git
   2.43 does them (checked in the session: git cherry-pick -x, git stash), on repositories kept in Ingenium (modules/r110.js: cherryPick,
   stashPush, stashList, stashApply, stashDrop). On a drive, and submodules, come next; until then a repository on a drive shows neither.
   - Ideas: an idea other than the one she works on has Pick its versions: a sheet of its versions that the idea she is on does not hold
     yet, newest first, each with Bring it here (a new version on her idea, with its own words, author and time, and git's own line
     "(cherry picked from commit <id>)"; the other idea is not changed). A version that joined two ideas is said so, and cannot be picked
     by itself. Both versions in a file: Changes holds them between git's marks, as a merge's, until she keeps the version. Rules before
     main (r285) hold it as they hold a version kept.
   - Changes: Put aside, beside Keep this version, keeps what waits out of the files (in git's own shape), the words written for the version
     naming it; Put aside lists them, newest first, with Bring back (onto files with nothing waiting; taken out of the list once back, kept
     in it if a file came back with both versions) and Drop (asked first: what is put aside is in no version).
   Drawn with Fabrica's parts and tokens: raised, lifting under the pointer, sinking when pressed; minimal or reduced motion keeps them still. */
#fb .r342-aside{margin-top:14px;animation:fbRise .32s cubic-bezier(.34,1.35,.64,1) backwards}
#fb .r342-aside .r342-lead{margin:4px 0 10px;font-size:12.5px;line-height:1.45;color:var(--f-ink3)}
#fb .r342-row,#fb .r342-v{display:flex;align-items:center;gap:12px;padding:10px 12px;margin-top:8px;border-radius:12px;background:linear-gradient(var(--f-a),var(--f-b));
  border:1px solid var(--f-hair);box-shadow:var(--f-pill);transition:transform .16s cubic-bezier(.34,1.35,.64,1),box-shadow .2s}
#fb .r342-row:hover,#fb .r342-v:hover{transform:translateY(-2px);box-shadow:var(--f-pophi)}
#fb .r342-row:active,#fb .r342-v:active{transform:translateY(1px);transition-duration:.06s}
#fb .r342-row .t,#fb .r342-v .t{flex:1 1 auto;min-width:0;display:flex;flex-direction:column;gap:2px}
#fb .r342-row .t b,#fb .r342-v .t b{font:600 13px/1.35 var(--f-sans);color:var(--f-ink1);overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
#fb .r342-row .t small,#fb .r342-v .t small{font:500 11.5px/1.35 var(--f-sans);color:var(--f-ink3)}
#fb .r342-v .t small .id{font-family:var(--f-mono)}
#fb .r342-keys{display:flex;gap:8px;flex:0 0 auto;flex-wrap:wrap;justify-content:flex-end}
#fb .r342-v.r342-done{opacity:.72}
#fb .r342-v.r342-done .r342-tag{color:var(--f-ok);font:600 12px var(--f-sans)}
#fb .r342-v .r342-tag{font:600 12px var(--f-sans);color:var(--f-ink3)}
#fb .r342-list{max-height:min(56vh,520px);overflow:auto;scrollbar-width:none;padding:2px 4px 6px;margin:0 -4px}
#fb .r342-list::-webkit-scrollbar{display:none}
body[data-motion="minimal"] #fb .r342-aside{animation:none}
body[data-motion="minimal"] #fb .r342-row,body[data-motion="minimal"] #fb .r342-v{transition:none}
@media (prefers-reduced-motion:reduce){#fb .r342-aside{animation:none}#fb .r342-row,#fb .r342-v{transition:none}}
</style>
<script>try{(window.__ingParts=window.__ingParts||{})["p342"]="started";}catch(_){}
/* window.IngPickAside {state}: see the stylesheet above. */
(function r342(){
"use strict";
if(window.IngPickAside||!window.IngRepo||typeof IngRepo.cherryPick!=="function"||typeof IngRepo.stashPush!=="function")return;
var W=window,D=document,IR=W.IngRepo;
function X(){return W.fbHubHost||null;}
function el(tag,cls,html){var e=D.createElement(tag);if(cls)e.className=cls;if(html!=null)e.innerHTML=html;return e;}
function esc(s){return String(s==null?"":s).replace(/[&<>"']/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c];});}
function toast(m){var x=X();if(x&&x.toast)x.toast(m);}
function fail(e){var x=X();if(x&&x.fail)x.fail(e);else toast(String(e&&e.message||e));}
function sheet(t,l){var x=X();return x&&x.sheet?x.sheet(t,l):null;}
function cur(){var x=X();try{return x&&x.cur?x.cur():null;}catch(e){return null;}}
function view(){var x=X();return x&&x.S?x.S.view:null;}
function when(t){var x=X();return x&&x.when?x.when(t):new Date(t).toLocaleString("en-GB");}
function plural(n,w){return n+" "+w+(n===1?"":"s");}
/* 7.57: a repository on a drive takes both too (desktop/app_pick_757.py, routed by r280), unless it is known to be bare (it has no folder of
   files, so no Changes; the hub's first, lighter record may not say yet, and the computer app refuses a bare one in plain words) */
function disk(r){try{if(!(W.IngDisk&&IngDisk.isDisk&&IngDisk.isDisk(r.id)))return false;var d=r.disk||{};return d.bare===true||d.worktree===false;}catch(e){return false;}}
/* 7.57: after a pick that stopped on lines changed both ways, the words box holds the version's words with git's own last line, as git
   cherry-pick --continue offers them (her own words, if she wrote any, stay) */
function prefill(msg){if(!msg)return;[300,900,1800].forEach(function(t){setTimeout(function(){var mm=D.getElementById("fbMsg");
  if(mm&&!String(mm.value||"").trim()){mm.value=msg;try{mm.dispatchEvent(new Event("input",{bubbles:true}));}catch(e){}}},t);});}
function again(){var x=X();if(!x||!x.refresh)return Promise.resolve();try{x.C.diff={};x.C.files={};x.C.log={};}catch(e){}return x.refresh().then(function(){x.paint();});}
function askYes(title,text,yes){try{if(typeof W.ingAsk==="function")return Promise.resolve(W.ingAsk({title:title,text:text,yes:yes,no:"Keep them"}));}catch(e){}return Promise.resolve(false);}
function here(r){return r.detached?null:(r.branch||null);}

/* ================= Ideas: Pick its versions ================= */
function ideas(){var r=cur();if(!r||view()!=="ideas"||disk(r)||!here(r))return;
  [].forEach.call(D.querySelectorAll("#fbWorkBody .f-idea"),function(e){if(e.__r342||e.classList.contains("on"))return;e.__r342=1;
    var b=e.querySelector("b"),n=b&&b.firstChild&&b.firstChild.nodeType===3?b.firstChild.nodeValue.trim():"",acts=e.querySelector(".f-acts");if(!n||!acts)return;
    var k=el("button","f-btn sm","Pick its versions");k.type="button";k.setAttribute("data-r342","pick");k.title="Bring some of “"+n+"”'s versions into “"+here(r)+"”, one by one";
    k.onclick=function(ev){ev.stopPropagation();pick(r,n);};acts.insertBefore(k,acts.children[1]||null);});}
/* the versions of idea n that the idea out does not hold yet, newest first */
function missing(r,n){return Promise.all([IR.log(r.id,{ref:"refs/heads/"+n,max:400}),IR.log(r.id,{ref:"HEAD",max:5000})]).then(function(x){var have={};x[1].forEach(function(c){have[c.oid]=1;});
  return x[0].filter(function(c){return !have[c.oid];}).slice(0,60);});}
function pick(r,n){var to=here(r),sh=sheet("Pick versions of “"+n+"”","Each one you bring in becomes a new version on “"+to+"”, with its own words, author and time, as git's cherry-pick makes it. “"+n+"” is not changed.");if(!sh)return;
  var box=el("div","r342-list");box.setAttribute("role","list");box.setAttribute("aria-label","Versions of "+n+" not in "+to);box.appendChild(el("p","r342-lead","Reading its versions…"));sh.box.appendChild(box);
  missing(r,n).then(function(l){box.innerHTML="";
    if(!l.length){box.appendChild(el("p","r342-lead",esc("Every version of “"+n+"” is in “"+to+"” already.")));return;}
    l.forEach(function(c){var row=el("div","r342-v");row.setAttribute("role","listitem");row.setAttribute("data-oid",c.oid);
      var who=c.author&&c.author.name?c.author.name:"";
      row.innerHTML='<div class="t"><b>'+esc(c.title)+'</b><small><span class="id">'+esc(c.short)+"</span> · "+esc((who?who+", ":"")+when(c.when))+"</small></div>";
      var keys=el("div","r342-keys");
      if(c.parents.length>1){keys.appendChild(el("span","r342-tag","Joined two ideas: not on its own"));}
      else{var go=el("button","f-btn sm pri","Bring it here");go.type="button";go.setAttribute("data-r342","bring");
        go.onclick=function(){go.disabled=true;IR.cherryPick(r.id,c.oid).then(function(m){
          if(m.kind==="conflicts"){sh.close();prefill(m.msg);toast("Both versions are in "+plural(m.conflicts.length,"file")+": choose under Changes, keep one of each, then keep the version.");try{X().S.view="changes";}catch(e){}return again();}
          try{if(W.fbHub&&typeof fbHub.kept==="function")fbHub.kept(r.id,m.commit);}catch(e){}
          row.classList.add("r342-done");keys.innerHTML="";keys.appendChild(el("span","r342-tag",esc("Brought in as "+String(m.commit).slice(0,7))));toast("Brought into “"+to+"” as version "+String(m.commit).slice(0,7)+".");
          return again();},function(e){go.disabled=false;fail(e);});};
        keys.appendChild(go);}
      row.appendChild(keys);box.appendChild(row);});},function(e){box.innerHTML="";box.appendChild(el("p","r342-lead",esc(String(e&&e.message||e))));});}

/* ================= Changes: Put aside, and what is put aside ================= */
var LISTING=0;
function changes(){var r=cur();if(!r||view()!=="changes"||disk(r))return;var foot=D.getElementById("fbWorkFoot"),body=D.getElementById("fbWorkBody");if(!foot||!body)return;
  var row=foot.querySelector(".f-keep .f-row");
  if(row&&!row.querySelector('[data-r342="aside"]')){var b=el("button","f-btn sm","Put aside");b.type="button";b.setAttribute("data-r342","aside");b.title="Keep these changes out of the files for now, to bring them back later";
    b.onclick=function(){var m=D.getElementById("fbMsg"),words=m?String(m.value||"").split("\n")[0].trim():"";b.disabled=true;
      IR.stashPush(r.id,words).then(function(x){toast("Put aside: "+plural(x.files,"file")+". The files are as the last version holds them; bring them back from Put aside.");return again();},function(e){b.disabled=false;fail(e);});};
    var keep=row.querySelector("#fbKeep");row.insertBefore(b,keep||null);}
  if(body.querySelector(".r342-aside")||LISTING)return;LISTING=1;
  IR.stashList(r.id).then(function(l){LISTING=0;if(!l.length||view()!=="changes"||!body.isConnected||body.querySelector(".r342-aside"))return;
    var box=el("section","h-box h-blk r342-aside");box.id="r342Aside";box.setAttribute("aria-label","Changes put aside");box.appendChild(el("b","h-big","Put aside"));
    box.appendChild(el("p","r342-lead","Changes kept out of the files, newest first. Bring one back onto the files when nothing else waits, or drop it."));
    l.forEach(function(s){var it=el("div","r342-row");it.setAttribute("data-n",s.n);
      it.innerHTML='<div class="t"><b>'+esc(String(s.msg).replace(/^(WIP on|On) [^:]+: /,""))+"</b><small>"+esc("on "+s.branch+" · "+plural(s.files.length,"file")+" · "+when(s.at))+"</small></div>";
      var keys=el("div","r342-keys"),dd=el("button","f-btn quiet sm","Drop"),bb=el("button","f-btn sm pri","Bring back");dd.type=bb.type="button";dd.setAttribute("data-r342","drop");bb.setAttribute("data-r342","back");
      bb.onclick=function(){bb.disabled=true;IR.stashApply(r.id,s.n,{drop:true}).then(function(x){
        toast(x.kind==="conflicts"?"Back, with both versions in "+plural(x.conflicts.length,"file")+": choose under Changes. It stays under Put aside until you drop it.":"Back on the files, and taken out of Put aside.");return again();},function(e){bb.disabled=false;fail(e);});};
      dd.onclick=function(){askYes("Drop these changes?","They are in no version, so once dropped they cannot be brought back.","Drop them").then(function(y){if(!y)return;
        return IR.stashDrop(r.id,s.n).then(function(){toast("Dropped.");return again();});}).catch(fail);};
      keys.appendChild(dd);keys.appendChild(bb);it.appendChild(keys);box.appendChild(it);});
    body.appendChild(box);},function(){LISTING=0;});}

/* ================= drawn each time Fabrica draws its work panel ================= */
var T=0,MO=null,BODY=null,FOOT=null;
function all(){T=0;try{ideas();}catch(e){}try{changes();}catch(e){}}
function soon(){if(!T)T=setTimeout(all,0);}
function watch(){var b=D.getElementById("fbWorkBody"),f=D.getElementById("fbWorkFoot");if(!b||!f)return;if(b===BODY&&f===FOOT)return;
  if(MO)MO.disconnect();BODY=b;FOOT=f;MO=new MutationObserver(soon);MO.observe(b,{childList:true});MO.observe(f,{childList:true});soon();}
setInterval(watch,1200);watch();

W.IngPickAside={state:function(){return {watching:!!MO,listing:LISTING};},ideas:ideas,changes:changes};
try{window.__ingParts["p342"]="running";}catch(_){}
})();
</script>
