<style id="r339-css">
/* ============ R339 · FABRICA, STAGE 3, PART ONE: REVIEWERS, CODE OWNERS AND SUGGESTED CHANGES (Ingenium 7.49, held for her preview) ============
   Her plan (Fabrica's audit, 19 November 2026, approved in full: "I want them all implemented into Ingenium in the proposed order"):
   "9. Requested reviewers and code owners. A pull request can ask a person, or your own model, for a review; a CODEOWNERS file is read as
   GitHub reads it." "10. Suggested changes in a review. A comment can propose new lines, and one press applies them as a version."
   GitHub's own documentation was read at its source (the github/docs repository, commit 16d03dd, 19 November 2026): about-code-owners.md,
   requesting-a-pull-request-review.md, commenting-on-a-pull-request.md, incorporating-feedback-in-your-pull-request.md.
   - Reviewers. A pull request has a third chip beside People and Milestone (r282): Reviewers. It asks a person known in the repository,
     Someone else, or your own model (Lector's choice) for a review. Each one asked stands in a row of pills under the chips, with what they
     did since they were asked (r141's own kinds): waiting, approved, asked for changes, commented. A pill asks again, or no longer. Your
     model's review is written by it and kept in the conversation as a comment: a model never approves.
   - Code owners. The CODEOWNERS file of the pull request's base idea is read as GitHub reads it: .github/CODEOWNERS, then CODEOWNERS, then
     docs/CODEOWNERS, the first found; not when it is 3 MB or more; gitignore's patterns, but no !, no [ ] and no \# at the start; a line
     that cannot be read is skipped; owners are @name, @organisation/team or an email address; the last line that matches a file names
     its owners, and a line with no owners leaves its files with none; docs/* owns only the files directly in docs. The owners of the files
     a pull request changes are asked for a review, each with the line that named them, and the merge box says who owns what and whether
     one of them has approved. Nothing is held back by it: on GitHub, code owners hold a merge only when its own rule asks for them.
   - Suggested changes. A comment on a line of the pull request's own idea (r282) offers Suggest a change: the line as it is, to rewrite
     (or to empty, which takes it away). Its thread shows the change, with Commit suggestion and Add suggestion to batch; Commit suggestions
     keeps a batch as one version on the pull request's own idea, its message naming who suggested each change. A suggestion whose line
     (or a line beside it) has changed since is out of date, and is never applied.
   GitHub's exact text for a suggestion inside a comment is not shown in the pages read, so a suggestion is kept in a field of its own here,
   and a suggestion made on GitHub's site arrives as an ordinary comment. GitHub names those who suggested as co-authors by their email;
   Ingenium's people have no email, so they are named in the version's message instead. Drawn with Fabrica's parts and tokens: raised,
   lifting under the pointer, sinking when pressed; minimal or reduced motion keeps them still. */
#fb .r339-mk{cursor:pointer;transition:transform .16s cubic-bezier(.34,1.35,.64,1),box-shadow .2s}
#fb .r339-mk:hover{transform:translateY(-2px);box-shadow:var(--f-pophi)}
#fb .r339-mk:active{transform:translateY(1px);transition-duration:.06s}
#fb .r339-mk:focus-visible{outline:2px solid var(--f-ring);outline-offset:2px}
#fb .r339-mk svg{width:13px;height:13px;fill:none;stroke:var(--f-acc);stroke-width:1.9;stroke-linecap:round;stroke-linejoin:round;flex:0 0 auto}
#fb .r339-mk b{font-weight:700;color:var(--f-ink1)}
#fb .r339-revs{padding-top:0;flex-wrap:wrap;gap:6px}
/* an entry animation that keeps no frame after it ends: the lift under the pointer is a transition, and is never held back by it */
#fb .r339-revs .r339-mk{animation:fbRise .32s cubic-bezier(.34,1.35,.64,1) backwards}
#fb .r339-revs .r339-mk small{font:500 11px var(--f-sans);color:var(--f-ink3)}
#fb .r339-revs .r339-mk[data-s="wait"] .d{background:transparent;box-shadow:inset 0 0 0 1.5px var(--f-warn)}
#fb .r339-revs .r339-mk[data-s="reading"] .d{animation:r339Beat 1.1s ease-in-out infinite}
@keyframes r339Beat{0%,100%{transform:scale(.7);opacity:.55}50%{transform:scale(1.15);opacity:1}}
#fb .r339-sk svg{width:13px;height:13px;fill:none;stroke:currentColor;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;margin-right:5px;vertical-align:-2px}
#fb .r339-sugbox{margin-top:8px}
#fb .r339-sugbox label{display:block;font:600 11.5px var(--f-sans);color:var(--f-ink3);margin:0 0 4px}
#fb .r282-lcta.r339-sugta{font:12px/1.55 var(--f-mono);white-space:pre;overflow-x:auto;scrollbar-width:none;min-height:44px}
#fb .r339-sugta::-webkit-scrollbar{display:none}
#fb .r339-sug{margin-top:8px;border-radius:10px;overflow:hidden;background:var(--f-code);box-shadow:var(--f-pill);animation:fbRise .28s cubic-bezier(.34,1.35,.64,1) backwards}
#fb .r339-sug-h{display:flex;align-items:center;gap:8px;padding:6px 10px;font:600 11.5px var(--f-sans);color:var(--f-ink2);border-bottom:1px solid var(--f-hair2)}
#fb .r339-sug-h .r339-tag{margin-left:auto}
#fb .r339-sug.r339-ok .r339-tag{color:var(--f-ok)}
#fb .r339-sug.r339-old .r339-tag{color:var(--f-warn)}
#fb .r339-sug pre.f-dcode{min-height:0;flex:none;padding:4px 0 6px;overflow:auto;scrollbar-width:none}
#fb .r339-sug pre.f-dcode::-webkit-scrollbar{display:none}
#fb .r339-sug .f-dl i{width:40px}
#fb .r339-sug .r282-lck{margin:0;padding:6px 10px 8px;border-top:1px solid var(--f-hair2)}
#fb .r339-sug .r339-why{padding:6px 10px 8px;font-size:12px;line-height:1.45;color:var(--f-ink3);border-top:1px solid var(--f-hair2)}
#fb .r282-thread.r282-done .r339-sug{display:none}
/* A pull request's Files changed: the change panel grows with its threads, so a comment or a suggestion under a line is read in full (it
   was held to its least height, 120px, under a long head; line comments were cut off the same way). The view scrolls as a whole; a
   file folded as Viewed stays folded. Shown to her in the preview as a change of its own. */
#fb .f-diff.r339-files{flex:none;height:auto;min-height:0}
#fb .f-diff.r339-files pre.f-dcode:not(.r282-folded){flex:none;height:auto;min-height:0;overflow-y:visible}
#fb .r339-batch{position:sticky;bottom:14px;z-index:4;display:flex;align-items:center;gap:8px;flex-wrap:wrap;justify-content:flex-end;margin:12px 0 0;padding:8px 10px 8px 14px;
  border-radius:14px;background:linear-gradient(var(--f-a),var(--f-b));border:1px solid var(--f-hair);box-shadow:var(--f-pophi);animation:fbRise .32s cubic-bezier(.34,1.35,.64,1) backwards}
#fb .r339-batch span{margin-right:auto;font:600 12.5px var(--f-sans);color:var(--f-ink2)}
#fb .r339-own{margin:8px 0 0;font-size:12.5px;line-height:1.45;color:var(--f-ink2)}
#fb .r339-own b{color:var(--f-ink1)}
#fb .r339-own.ok{color:var(--f-ok)}
#fb .r339-own small{display:block;margin-top:3px;font-size:11.5px;color:var(--f-ink3)}
body[data-motion="minimal"] #fb .r339-mk{transition:none}
body[data-motion="minimal"] #fb .r339-revs .r339-mk,body[data-motion="minimal"] #fb .r339-sug,body[data-motion="minimal"] #fb .r339-batch,body[data-motion="minimal"] #fb .r339-revs .r339-mk[data-s="reading"] .d{animation:none}
@media (prefers-reduced-motion:reduce){#fb .r339-mk{transition:none}#fb .r339-revs .r339-mk,#fb .r339-sug,#fb .r339-batch,#fb .r339-revs .r339-mk[data-s="reading"] .d{animation:none}}
</style>
<script>try{(window.__ingParts=window.__ingParts||{})["p339"]="started";}catch(_){}
/* window.IngReview {parse, match, owners, state}: see the stylesheet above. */
(function r339(){
"use strict";
if(window.IngReview||!window.IngPlans||!window.IngRepo)return;
var W=window,D=document,IR=W.IngRepo,P=W.IngPlans;
function H(){return W.fbHub||null;}
function X(){return W.fbHubHost||null;}
function el(tag,cls,html){var e=D.createElement(tag);if(cls)e.className=cls;if(html!=null)e.innerHTML=html;return e;}
function esc(s){return String(s==null?"":s).replace(/[&<>"']/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c];});}
function toast(m){var x=X();if(x&&x.toast)x.toast(m);}
function fail(e){var x=X();if(x&&x.fail)x.fail(e);else toast(String(e&&e.message||e));}
function who(){try{var a=IR.author&&IR.author();if(a&&a.name)return a.name;}catch(e){}return "You";}
function when(t){var x=X();if(x&&x.when)return x.when(t);return t?new Date(t).toLocaleString("en-GB"):"";}
function keep(rec){var h=H();return h&&h.keep?Promise.resolve(h.keep(rec)):Promise.resolve();}
function repaint(){var h=H();if(h&&h.repaint)h.repaint();}
function save(rec){return keep(rec).then(repaint,fail);}
function list(anchor,groups,onPick){var k=W.IngDisk;if(k&&k.openList)return k.openList(anchor,groups,onPick);}
function sheet(title,lead){var x=X();return x&&x.sheet?x.sheet(title,lead):null;}
function names(a){a=a||[];return a.length<3?a.join(" and "):a.slice(0,-1).join(", ")+" and "+a[a.length-1];}
function plural(n,w){return n+" "+w+(n===1?"":"s");}
function norm(s){return String(s||"").trim().replace(/^@/,"").toLowerCase();}
function lines(t){return String(t).replace(/\r\n?/g,"\n").split("\n");}
/* the hub drawn again from what the repository holds now (as r141's again) */
function again(){var x=X();if(!x||!x.refresh)return Promise.resolve();try{x.C.diff={};x.C.files={};x.C.log={};}catch(e){}return x.refresh().then(function(){x.paint();});}
function key(r,p){return r.id+"#"+p.n;}
/* the version two ideas last shared (as r280's) */
function lca(r,a,b){return Promise.all([IR.log(r.id,{ref:a,max:600}),IR.log(r.id,{ref:b,max:600})]).then(function(x){var seen={};x[1].forEach(function(c){seen[c.oid]=1;});
  for(var i=0;i<x[0].length;i++)if(seen[x[0][i].oid])return x[0][i].oid;return null;});}

/* ================= CODEOWNERS, as GitHub reads it ================= */
var PLACES=[".github/CODEOWNERS","CODEOWNERS","docs/CODEOWNERS"],MAXB=3*1024*1024;
var USER=/^@[A-Za-z0-9](?:[A-Za-z0-9._-]*[A-Za-z0-9_])?$/,TEAM=/^@[A-Za-z0-9][A-Za-z0-9._-]*\/[A-Za-z0-9][A-Za-z0-9._-]*$/,MAIL=/^[^@\s]+@[^@\s]+\.[^@\s]+$/;
/* a pattern as gitignore reads it: a slash at its start or in its middle ties it to the top of the repository; a slash at its end names
   a folder; *, ? and ** as in gitignore; a match on a folder owns all inside it, but a pattern ending in /* owns only what is directly in
   its folder (GitHub's own example: docs/* owns docs/getting-started.md, not docs/build-app/troubleshooting.md) */
function patRx(pat){var top=pat.charAt(0)==="/"||pat.replace(/\/+$/,"").indexOf("/")>=0,dir=/\/$/.test(pat),kids=/\/\*$/.test(pat),
    p=pat.replace(/^\/+/,"").replace(/\/+$/,""),out="",i=0;
  while(i<p.length){
    if(p.substr(i,3)==="**/"){out+="(?:.*/)?";i+=3;continue;}
    if(p.substr(i,3)==="/**"&&i+3===p.length){out+="/.*";i+=3;continue;}
    if(p.substr(i,2)==="**"){out+=".*";i+=2;continue;}
    var ch=p.charAt(i);
    if(ch==="\\"&&i+1<p.length){out+=p.charAt(i+1).replace(/[.*+?^${}()|[\]\\]/g,"\\$&");i+=2;continue;}
    out+=ch==="*"?"[^/]*":ch==="?"?"[^/]":ch.replace(/[.+^${}()|[\]\\]/g,"\\$&");i++;}
  return new RegExp((top?"^":"^(?:.*/)?")+out+(kids?"$":dir?"/.*$":"(?:/.*)?$"));}
function parse(text){var rules=[],skipped=[];
  lines(text).forEach(function(raw,i){var n=i+1,l=raw.trim();if(!l||l.charAt(0)==="#")return;
    if(/^\\#/.test(l)){skipped.push({line:n,why:"a pattern that begins with \\# is not read"});return;}
    var t=l.split(/\s+/),pat=t[0],own=[];for(var k=1;k<t.length;k++){if(t[k].charAt(0)==="#")break;own.push(t[k]);}
    if(pat.charAt(0)==="!"){skipped.push({line:n,why:"! (leaving files out) does not work in CODEOWNERS"});return;}
    if(/[\[\]]/.test(pat)){skipped.push({line:n,why:"[ ] (a range of letters) does not work in CODEOWNERS"});return;}
    var bad=own.filter(function(o){return !(USER.test(o)||TEAM.test(o)||MAIL.test(o));});
    if(bad.length){skipped.push({line:n,why:"“"+bad[0]+"” is not an owner (an owner is @name, @organisation/team or an email address)"});return;}
    var rx;try{rx=patRx(pat);}catch(e){skipped.push({line:n,why:"its pattern cannot be read"});return;}
    rules.push({line:n,pat:pat,owners:own,rx:rx});});
  return {rules:rules,skipped:skipped};}
/* the last line that matches a file names its owners */
function lastHit(co,path){var hit=null;co.rules.forEach(function(r){if(r.rx.test(path))hit=r;});return hit;}
var COC=new Map(),CFC=new Map();
function remember(m,k,v){m.set(k,v);if(m.size>24)m.delete(m.keys().next().value);return v;}
/* on the pull request's base idea: GitHub reads CODEOWNERS there */
function readCO(r,tip){var k=r.id+"|"+tip;if(COC.has(k))return COC.get(k);
  return remember(COC,k,IR.files(r.id,tip).then(function(fs){var by={};fs.forEach(function(f){by[f.path]=f;});
    var f=null;for(var i=0;i<PLACES.length&&!f;i++)f=by[PLACES[i]]||null;if(!f)return null;
    if(f.size!=null&&f.size>=MAXB)return {path:f.path,big:true,rules:[],skipped:[]};
    return IR.readText(r.id,f.path,tip).then(function(t){if(t==null)return null;var o=parse(t);o.path=f.path;return o;});},function(){return null;}));}
/* the files a pull request changes, since its idea parted from the base (a file moved counts at both of its places) */
function changed(r,p,head,to){var k=r.id+"|"+head+"|"+to;if(CFC.has(k))return CFC.get(k);
  return remember(CFC,k,(p.lastHead===head&&p.lastBase?Promise.resolve(p.lastBase):lca(r,head,to)).then(function(base){return IR.diff(r.id,{from:base||to,to:head,namesOnly:true});})
    .then(function(items){var s={};items.forEach(function(c){s[c.path]=1;if(c.from)s[c.from]=1;});return Object.keys(s).sort();},function(){return null;}));}
function owners(r,p){if(!r||!p||(r.branches||[]).indexOf(p.to)<0||(r.branches||[]).indexOf(p.from)<0)return Promise.resolve(null);
  return Promise.all([IR.resolve(r.id,"refs/heads/"+p.from),IR.resolve(r.id,"refs/heads/"+p.to)]).then(function(t){if(!t[0]||!t[1])return null;
    return Promise.all([readCO(r,t[1]),changed(r,p,t[0],t[1])]).then(function(x){var co=x[0],paths=x[1];if(!co)return null;
      var out={path:co.path,big:!!co.big,skipped:co.skipped||[],groups:[]};if(co.big||!paths)return out;var g={};
      paths.forEach(function(path){var h=lastHit(co,path);if(!h||!h.owners.length)return;(g[h.line]=g[h.line]||{line:h.line,pat:h.pat,owners:h.owners.slice(),paths:[]}).paths.push(path);});
      out.groups=Object.keys(g).map(function(k){return g[k];}).sort(function(a,b){return a.line-b.line;});return out;});});}

/* ================= reviewers ================= */
var ICR='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M2.5 12s3.6-6.5 9.5-6.5S21.5 12 21.5 12s-3.6 6.5-9.5 6.5S2.5 12 2.5 12z"/><circle cx="12" cy="12" r="2.8"/></svg>';
var SAY={wait:"waiting",approved:"approved",changes:"asked for changes",commented:"commented",reading:"reading…"},RUN={},AUTO={};
function revs(p){if(!Array.isArray(p.reviewers))p.reviewers=[];return p.reviewers;}
function findRev(p,name,model){var k=norm(name);return revs(p).filter(function(v){return model?!!v.model:!v.model&&norm(v.name)===k;})[0]||null;}
function label(v){return v.model?"Your model":v.name;}
/* what each one asked did since they were asked: their newest review (r141's kinds) */
function stateOf(r,p,v){if(v.model&&RUN[key(r,p)])return "reading";var last=null,k=norm(v.name);
  (p.comments||[]).forEach(function(c){if((c.at||0)<(v.at||0))return;if(v.model?!!c.model:(!c.model&&norm(c.by)===k))last=c.kind||"comment";});
  return last==="approve"?"approved":last==="changes"?"changes":last?"commented":"wait";}
function people(rec){var seen={},out=[];function add(n){n=String(n||"").trim();if(n&&!seen[n.toLowerCase()]){seen[n.toLowerCase()]=1;out.push(n);}}
  add(who());(rec.people||[]).forEach(add);(rec.issues||[]).concat(rec.pulls||[]).forEach(function(i){(i.people||[]).forEach(add);});return out;}
function ask(r,p,name,o){o=o||{};var v=o.model?findRev(p,"",true):findRev(p,name),now=Date.now();
  if(v)v.at=now;else{v={name:o.model?"Your model":name,at:now};if(o.model)v.model=true;if(o.line){v.from="codeowners";v.line=o.line;v.paths=(o.paths||[]).slice(0,8);}revs(p).push(v);}
  if(Array.isArray(p.reviewersOff))p.reviewersOff=p.reviewersOff.filter(function(x){return norm(x)!==norm(v.name);});
  p.events.push({at:now,kind:"review",who:[v.name],model:!!o.model,again:!!o.again,line:o.line||null});p.updated=now;return v;}
/* asked no longer; a code owner taken away by hand is not asked again by CODEOWNERS */
function unask(p,vs){var now=Date.now();p.reviewers=revs(p).filter(function(x){return vs.indexOf(x)<0;});
  vs.forEach(function(v){if(v.from==="codeowners")p.reviewersOff=(p.reviewersOff||[]).concat([v.name]);});
  p.events.push({at:now,kind:"unreview",who:vs.map(label)});p.updated=now;}
function chipRow(r,rec,p,w){var row=w.querySelector('.r282-meta[data-n="'+p.n+'"]');if(!row)return;var vs=revs(p);
  var c=el("button","f-chip r339-mk");c.type="button";c.id="r339Rev";c.title="Reviewers";c.setAttribute("data-k","reviewers");c.setAttribute("aria-haspopup","listbox");
  c.innerHTML=ICR+"<span>Reviewers: <b>"+esc(vs.length?names(vs.map(label)):"No one")+"</b></span>";
  c.onclick=function(e){e.preventDefault();e.stopPropagation();pick(c,r,rec,p);};row.appendChild(c);
  if(!vs.length)return;var strip=el("div","h-meta h-blk r339-revs");strip.id="r339Revs";strip.setAttribute("role","list");strip.setAttribute("aria-label","Who is asked for a review, and what they did");
  vs.forEach(function(v,i){var s=stateOf(r,p,v),b=el("button","f-chip r339-mk"+(s==="approved"?" ok":s==="changes"?" warn":s==="commented"||s==="reading"?" live":""));b.type="button";
    b.setAttribute("role","listitem");b.setAttribute("data-s",s);b.setAttribute("data-who",label(v));b.style.animationDelay=Math.min(i,8)*0.04+"s";
    b.innerHTML='<span class="d"></span><span>'+esc(label(v))+" <small>"+esc(SAY[s])+"</small></span>"+(v.from==="codeowners"?"<small>· CODEOWNERS line "+esc(v.line)+"</small>":"");
    b.title=v.from==="codeowners"?"Asked because line "+v.line+" of CODEOWNERS names "+v.name+(v.paths&&v.paths.length?", for "+names(v.paths.slice(0,3))+(v.paths.length>3?" and more":""):""):"Asked "+when(v.at);
    b.onclick=function(e){e.preventDefault();e.stopPropagation();pickOne(b,r,rec,p,v);};strip.appendChild(b);});
  row.parentNode.insertBefore(strip,row.nextSibling);}
function pick(b,r,rec,p){var vs=revs(p),m=findRev(p,"",true),busy=!!RUN[key(r,p)],mn=modelName(),ps=people(rec).filter(function(n){return norm(n)!==norm(p.by||"");});
  list(b,[{label:"Ask for a review",items:ps.map(function(n){var on=!!findRev(p,n);return {kind:"p",name:n,label:n+(on?" · asked":""),on:on};})},
    {label:"",items:[{kind:"model",label:"Your model"+(mn?", "+mn:"")+(mn&&!local()?" (not on this computer)":"")+(busy?" · reading…":m?" · asked":""),on:!!m},{kind:"else",label:"Someone else…"},{kind:"none",label:"No one",on:!vs.length}]}],function(x){
    if(x.kind==="none"){if(vs.length){unask(p,vs.slice());save(rec);}return;}
    if(x.kind==="else"){askName(function(n){if(!Array.isArray(rec.people))rec.people=[];if(!rec.people.some(function(y){return norm(y)===norm(n);}))rec.people.push(n);if(findRev(p,n))return;ask(r,p,n,{});return save(rec);});return;}
    if(x.kind==="model"){if(!busy)askModel(r,rec,p,!!m);return;}
    var v=findRev(p,x.name);if(v)unask(p,[v]);else ask(r,p,x.name,{});save(rec);});}
function pickOne(b,r,rec,p,v){if(stateOf(r,p,v)==="reading")return;
  list(b,[{label:label(v),items:[{kind:"again",label:v.model?"Ask your model again":"Ask "+v.name+" again"},{kind:"off",label:"No longer ask "+(v.model?"your model":v.name)}]}],function(x){
    if(x.kind==="off"){unask(p,[v]);save(rec);return;}
    if(v.model){askModel(r,rec,p,true);return;}
    ask(r,p,v.name,{again:true});save(rec);});}
function askName(fn){var sh=sheet("Someone else","Their name, as you would call them. It is kept with this repository, on this computer.");if(!sh)return;var inp=el("input");inp.type="text";inp.setAttribute("aria-label","Their name");inp.maxLength=60;sh.box.appendChild(inp);
  var end=el("div","end"),ok=el("button","f-btn pri","Ask them for a review");ok.type="button";ok.onclick=function(){var v=inp.value.trim();if(!v){inp.focus();return;}ok.disabled=true;Promise.resolve(fn(v)).then(sh.close,function(e){ok.disabled=false;fail(e);});};
  end.appendChild(ok);sh.box.appendChild(end);inp.onkeydown=function(e){if(e.key==="Enter")ok.click();if(e.key==="Escape")sh.close();};setTimeout(function(){inp.focus();},60);}
/* code owners of the changed files are asked when the pull request is first seen open, each once (r282's people are not touched) */
function autoOwners(r,rec,p){var k=key(r,p);if(AUTO[k])return;AUTO[k]=1;
  owners(r,p).then(function(o){delete AUTO[k];if(!o||!o.groups.length||p.state!=="open")return;var off=(p.reviewersOff||[]).map(norm),n=0,now=Date.now();
    o.groups.forEach(function(g){g.owners.forEach(function(name){if(findRev(p,name)||off.indexOf(norm(name))>=0)return;
      revs(p).push({name:name,at:now,from:"codeowners",line:g.line,paths:g.paths.slice(0,8)});p.events.push({at:now,kind:"review",who:[name],line:g.line});n++;});});
    if(n){p.updated=now;save(rec);}},function(){delete AUTO[k];});}
/* the merge box says who owns what (it holds nothing back) */
function ownNote(r,p,box){if(!p||p.state!=="open"||!box)return;owners(r,p).then(function(o){if(!o||!box.isConnected||box.querySelector(".r339-own"))return;
  var n=el("p","r339-own");n.id="r339Own";
  if(o.big)n.textContent="Code owners: "+o.path+" is 3 MB or more, so it is not read (GitHub does not load it either).";
  else if(!o.groups.length){if(!o.skipped.length)return;n.textContent="Code owners: no file this pull request changes has an owner in "+o.path+".";}
  else{var wait=[],done=[];o.groups.forEach(function(g){var by=null;(p.comments||[]).forEach(function(c){if(c.kind==="approve"&&!c.model&&g.owners.some(function(x){return norm(x)===norm(c.by);}))by=c.by;});
      var what=g.paths.length===1?g.paths[0]:plural(g.paths.length,"file");if(by)done.push(what+", approved by "+by);else wait.push(what+" ("+names(g.owners)+", line "+g.line+")");});
    if(wait.length)n.innerHTML="<b>Code owners</b> ("+esc(o.path)+"): waiting for a review of "+esc(wait.join("; "))+". On GitHub, when code owners' reviews are required, one approval from any owner of a file is enough.";
    else{n.className="r339-own ok";n.innerHTML="<b>Code owners</b>: an owner has approved each file they own ("+esc(done.join("; "))+").";}}
  if(o.skipped.length)n.appendChild(el("small",null,esc(o.skipped.length===1?"Line "+o.skipped[0].line+" of "+o.path+" is skipped: "+o.skipped[0].why+".":
    plural(o.skipped.length,"line")+" of "+o.path+" are skipped, as GitHub skips them (lines "+o.skipped.map(function(x){return x.line;}).slice(0,8).join(", ")+").")));
  box.appendChild(n);});}

/* ================= your model, asked for a review (written by it, kept as a comment; it never approves) ================= */
function plan(){try{return W.IngLector&&W.IngLector.plan?W.IngLector.plan():null;}catch(e){return null;}}
function modelName(){var o=plan();try{if(o&&(o.cloud||o.link)&&typeof W.lxCloudName==="function")return W.lxCloudName()||"";if(o&&o.chosen)return o.chosen.customName||o.chosen.name||"";}catch(e){}return "";}
function local(){var o=plan();return !!(o&&o.chosen&&!o.cloud&&!o.link);}
function room(){var ctx=8192,o=plan();try{if(o&&(o.chosen||o.cloud)&&typeof W.lxCtx==="function")ctx=W.lxCtx(o.chosen)||ctx;}catch(e){}return Math.max(7000,(ctx-2200)*3);}
function cut(s,n){s=String(s||"");return s.length<=n?s:s.slice(0,Math.max(0,n-60))+"\n[… the rest is left out: it is longer than your model can read at once …]";}
var MANNER="You help me with my own app's repository. Plain words, short sentences, no jargon. Use only what is given here: never a file, a change, a version or a reason it does not show. If something is not clear from it, say so.";
function askModel(r,rec,p,re){var o=plan();if(typeof W.lxAsk!=="function"||!o||!(o.chosen||o.cloud||o.link)){toast("Choose a model in Lector first: a review from your model is written by it.");return;}
  if((r.branches||[]).indexOf(p.from)<0||(r.branches||[]).indexOf(p.to)<0){toast("The ideas of #"+p.n+" are not both here, so there is nothing for your model to read.");return;}
  var k=key(r,p);ask(r,p,"",{model:true,again:re});RUN[k]=1;save(rec);
  Promise.all([IR.resolve(r.id,"refs/heads/"+p.from),IR.resolve(r.id,"refs/heads/"+p.to)]).then(function(t){return lca(r,t[0],t[1]).then(function(base){return IR.diff(r.id,{from:base||t[1],to:t[0],text:true});});})
    .then(function(items){var parts=[],adds=0,dels=0;items.forEach(function(it){adds+=it.adds||0;dels+=it.dels||0;parts.push(it.binary?"(a binary file: "+it.path+", "+it.kind+")":(it.text||("("+it.kind+": "+it.path+")")));});
      return W.lxAsk({modelId:o.chosen?o.chosen.id:null},[{role:"system",content:MANNER},{role:"user",content:"THE APP: "+r.name+"\nTHE PULL REQUEST #"+p.n+": "+p.title+" ("+p.from+" into "+p.to+")\nWHAT IT SAYS:\n"+(p.body||"(nothing)")+
        "\n\nITS CHANGES ("+items.length+" files, +"+adds+" −"+dels+" lines):\n"+cut(parts.join("\n"),room()-2500)+"\n\nReview it for me as a careful reader would: does it do what it says; anything that looks wrong or risky, with the file and the line; one or two tests worth adding. Short points."}],900,0.2,function(){});})
    .then(function(t){delete RUN[k];t=String(t||"").trim();if(!t){toast("Your model gave no review.");repaint();return;}var nm=modelName()||"Your model";
      p.comments.push({at:Date.now(),by:nm,kind:"comment",model:true,body:t+"\n\n*Written by your model, "+nm+(local()?", on this computer.":". It does not run on this computer: what it read was sent to it.")+" Read it before you use it.*"});p.updated=Date.now();
      return keep(rec).then(function(){toast("Your model's review is in the conversation of #"+p.n+".");repaint();});},
      function(e){delete RUN[k];fail(new Error("your model could not review it: "+String(e&&e.message||e)));repaint();});}

/* ================= suggested changes ================= */
var ICS='<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3.5" y="3" width="17" height="18" rx="3"/><path d="M12 6.8v6.4M8.8 10h6.4M8.8 17h6.4"/></svg>';
var PEND=null,BATCH={},LASTW=null;
function findC(p,id){var a=p.lines||[];for(var i=0;i<a.length;i++)if(a[i].id===id)return a[i];return null;}
/* the line, and the lines either side of it, still as they were when it was suggested */
function fits(ls,c){var i=c.line-1,s=c.sug;return i>=0&&i<ls.length&&ls[i]===s.was&&(s.before==null||ls[i-1]===s.before)&&(s.after==null||ls[i+1]===s.after);}
function current(r,p,c){if((r.branches||[]).indexOf(p.from)<0)return Promise.resolve(false);
  return IR.readText(r.id,c.path,"refs/heads/"+p.from).then(function(t){return t!=null&&fits(lines(t),c);},function(){return false;});}
function batchOf(r,p){var k=key(r,p);return BATCH[k]||(BATCH[k]=[]);}
/* r282's comment box on a line of the pull request's own idea: Suggest a change */
function offer(r,rec,p,q,path,box){if(box.__r339)return;box.__r339=1;var line=box.previousElementSibling;
  if(p.state!=="open"||!line||!line.classList.contains("f-dl")||line.getAttribute("data-side")!=="new")return;var n=+line.getAttribute("data-line")||0,keys=box.querySelector(".r282-lck");if(!n||!keys)return;
  var sk=el("button","f-btn quiet sm r339-sk",ICS+"Suggest a change");sk.type="button";sk.setAttribute("aria-pressed","false");keys.insertBefore(sk,keys.firstChild);
  sk.onclick=function(e){e.preventDefault();e.stopPropagation();var open=box.querySelector(".r339-sugbox");
    if(open){open.remove();box.__sug=null;sk.setAttribute("aria-pressed","false");sk.innerHTML=ICS+"Suggest a change";return;}
    sk.disabled=true;IR.readText(r.id,path,q.head).then(function(t){sk.disabled=false;if(t==null)throw new Error("“"+path+"” is not in this version");var ls=lines(t);if(n>ls.length)throw new Error("line "+n+" is not in “"+path+"”");
      box.__sug={path:path,line:n,was:ls[n-1],before:n>1?ls[n-2]:null,after:n<ls.length?ls[n]:null,head:q.head};
      var sb=el("div","r339-sugbox");sb.innerHTML='<label for="r339Sta'+n+'">Line '+n+", as you would have it (empty takes it away)</label>";
      var ta=el("textarea","r282-lcta r339-sugta");ta.id="r339Sta"+n;ta.rows=2;ta.spellcheck=false;ta.setAttribute("aria-label","Line "+n+", as you would have it");ta.value=ls[n-1];sb.appendChild(ta);
      keys.parentNode.insertBefore(sb,keys);sk.setAttribute("aria-pressed","true");sk.innerHTML=ICS+"No suggestion";
      setTimeout(function(){try{ta.focus({preventScroll:true});ta.setSelectionRange(ta.value.length,ta.value.length);}catch(_){}},30);}).catch(function(e){sk.disabled=false;fail(e);});};
  /* before r282 keeps the comment: the suggestion goes with it (attached as the record is kept, below) */
  box.addEventListener("click",function(e){var x=e.target.closest&&e.target.closest('[data-x="go"]'),ta=box.querySelector(".r339-sugta");if(!x||!box.__sug||!ta)return;
    var text=ta.value.replace(/\r\n?/g,"\n").replace(/\n$/,"");
    if(text===box.__sug.was){e.preventDefault();e.stopPropagation();e.stopImmediatePropagation();toast("The suggestion is the line as it is: change it first, or press No suggestion.");ta.focus();return;}
    var words=box.querySelector("textarea:not(.r339-sugta)");if(words&&!words.value.trim())words.value="A suggested change.";
    var s=box.__sug;PEND={path:s.path,line:s.line,at:Date.now(),sug:{text:text,was:s.was,before:s.before,after:s.after,head:s.head}};},true);}
/* r282 pushes the new comment, then keeps the record at once: the suggestion is set on it as it is kept */
(function(){var h=H();if(!h||typeof h.keep!=="function"||h.keep.__r339)return;var k0=h.keep;
  h.keep=function(rec){try{if(PEND&&Date.now()-PEND.at>5000)PEND=null;if(PEND&&rec)(rec.pulls||[]).forEach(function(p){(p.lines||[]).forEach(function(c){
    if(PEND&&!c.sug&&c.side==="new"&&c.path===PEND.path&&c.line===PEND.line&&(c.at||0)>=PEND.at-50){c.sug=PEND.sug;PEND=null;}});});}catch(e){}return k0.apply(this,arguments);};h.keep.__r339=1;})();
/* a thread whose comment carries a suggestion: the change, drawn as Fabrica draws changes, with its keys */
function dress(r,rec,p,th){if(th.__r339)return;var c=findC(p,th.getAttribute("data-c"));if(!c||!c.sug)return;th.__r339=1;
  var box=el("div","r339-sug");box.setAttribute("data-c",c.id);box.appendChild(el("div","r339-sug-h",'<span>Suggested change</span><span class="r339-tag"></span>'));
  var pre=el("pre","f-dcode"),d=el("div","f-dl del");d.innerHTML="<i>"+c.line+"</i><s>−</s>"+esc(c.sug.was);pre.appendChild(d);
  (c.sug.text===""?[]:c.sug.text.split("\n")).forEach(function(l,i){var a=el("div","f-dl add");a.innerHTML="<i>"+(c.line+i)+"</i><s>+</s>"+esc(l);pre.appendChild(a);});box.appendChild(pre);
  var first=th.querySelector(".h-cmt");if(first&&first.nextSibling)th.insertBefore(box,first.nextSibling);else th.appendChild(box);drawState(r,rec,p,c,box);}
function drawState(r,rec,p,c,box){var tag=box.querySelector(".r339-tag");[].forEach.call(box.querySelectorAll(".r282-lck,.r339-why"),function(x){x.remove();});box.classList.remove("r339-ok","r339-old");
  function why(t){var w=el("div","r339-why");w.textContent=t;box.appendChild(w);}
  if(c.sug.applied){var a=c.sug.applied;box.classList.add("r339-ok");tag.textContent="Committed";why("Kept as version "+String(a.commit||"").slice(0,7)+" on "+(a.on||p.from)+" by "+(a.by||who())+", "+when(a.at)+".");return;}
  if(p.state!=="open"){tag.textContent="";why(p.state==="merged"?"The pull request is merged: a suggestion is committed while it is open.":"The pull request is closed: reopen it to commit a suggestion.");return;}
  current(r,p,c).then(function(ok){if(!box.isConnected)return;
    if(!ok){box.classList.add("r339-old");tag.textContent="Out of date";why("Line "+c.line+" of "+c.path+" on "+p.from+" (or a line beside it) has changed since this was suggested, so it is not applied.");return;}
    var on=batchOf(r,p).indexOf(c.id)>=0,keys=el("div","r282-lck"),ab=el("button","f-btn sm",on?"Take it out of the batch":"Add suggestion to batch"),cb=el("button","f-btn pri sm","Commit suggestion");
    ab.type=cb.type="button";ab.setAttribute("data-k","batch");cb.setAttribute("data-k","commit");if(on)tag.textContent="In the batch";
    ab.onclick=function(e){e.preventDefault();e.stopPropagation();toggle(r,rec,p,c);};cb.onclick=function(e){e.preventDefault();e.stopPropagation();commitSheet(r,rec,p,[c]);};
    keys.appendChild(ab);keys.appendChild(cb);box.appendChild(keys);});}
function toggle(r,rec,p,c){var b=batchOf(r,p),i=b.indexOf(c.id);
  if(i>=0)b.splice(i,1);else{if(b.some(function(id){var o=findC(p,id);return o&&o.path===c.path&&o.line===c.line;})){toast("A suggestion for line "+c.line+" of "+c.path+" is already in the batch.");return;}b.push(c.id);}
  redraw(r,rec,p);}
function redraw(r,rec,p){[].forEach.call(D.querySelectorAll("#fb .r339-sug[data-c]"),function(box){var c=findC(p,box.getAttribute("data-c"));if(c)drawState(r,rec,p,c,box);});bar(r,rec,p,LASTW);}
/* the batch, kept as one version */
function bar(r,rec,p,w){if(!w||!w.isConnected)return;var k=key(r,p),b=batchOf(r,p).filter(function(id){var c=findC(p,id);return c&&c.sug&&!c.sug.applied;}),el0=w.querySelector("#r339Batch");BATCH[k]=b;
  if(!b.length){if(el0)el0.remove();return;}
  if(!el0){el0=el("div","r339-batch");el0.id="r339Batch";el0.setAttribute("role","region");el0.setAttribute("aria-label","Suggestions gathered, to commit together");w.appendChild(el0);}
  el0.innerHTML="";el0.appendChild(el("span",null,esc(plural(b.length,"suggestion")+" gathered, to be kept as one version on "+p.from)));
  var cl=el("button","f-btn quiet sm","Clear the batch"),go=el("button","f-btn pri sm","Commit suggestions ("+b.length+")");cl.type=go.type="button";go.id="r339BatchGo";
  cl.onclick=function(){BATCH[k]=[];redraw(r,rec,p);};go.onclick=function(){commitSheet(r,rec,p,b.map(function(id){return findC(p,id);}));};el0.appendChild(cl);el0.appendChild(go);}
function commitSheet(r,rec,p,cs){cs=cs.filter(function(c){return c&&c.sug&&!c.sug.applied;});var n=cs.length;if(!n)return;
  var sh=sheet(n===1?"Commit the suggestion":"Commit "+n+" suggestions","Kept as one version on "+p.from+", the pull request's own idea, naming who suggested "+(n===1?"it":"each change")+". No other file is touched.");if(!sh)return;
  var inp=el("input");inp.type="text";inp.setAttribute("aria-label","What the version says");inp.maxLength=200;inp.value=n===1?"Apply a suggestion from the review of #"+p.n:"Apply "+n+" suggestions from the review of #"+p.n;sh.box.appendChild(inp);
  var end=el("div","end"),ok=el("button","f-btn pri","Commit");ok.type="button";ok.id="r339Commit";
  ok.onclick=function(){var m=inp.value.trim();if(!m){inp.focus();return;}ok.disabled=true;apply(r,rec,p,cs,m).then(function(oid){sh.close();toast((n===1?"The suggestion is":"The "+n+" suggestions are")+" kept as version "+String(oid).slice(0,7)+" on "+p.from+".");},function(e){ok.disabled=false;fail(e);});};
  end.appendChild(ok);sh.box.appendChild(end);inp.onkeydown=function(e){if(e.key==="Enter")ok.click();if(e.key==="Escape")sh.close();};setTimeout(function(){try{inp.focus();inp.select();}catch(_){}},60);}
/* each line checked first, all of them, then written; one version on the pull request's own idea: beside the folder's files (IngRepo.commitTo)
   or, when that idea is the one open in Changes, through the folder, only when nothing else waits there */
function apply(r,rec,p,cs,msg){if(p.state!=="open")return Promise.reject(new Error("only an open pull request takes a suggestion"));
  if((r.branches||[]).indexOf(p.from)<0)return Promise.reject(new Error("the idea “"+p.from+"” is no longer here"));
  var ref="refs/heads/"+p.from,by={},seen={},out=false;
  for(var i=0;i<cs.length;i++){var c=cs[i],k=c.path+"|"+c.line;if(seen[k])return Promise.reject(new Error("two suggestions are for line "+c.line+" of "+c.path+": commit one of them"));seen[k]=1;(by[c.path]=by[c.path]||[]).push(c);}
  var paths=Object.keys(by).sort();
  return Promise.all(paths.map(function(path){return IR.readText(r.id,path,ref).then(function(t){if(t==null)throw new Error("“"+path+"” is no longer on "+p.from);
      var crlf=/\r\n/.test(t),ls=lines(t);
      by[path].forEach(function(c){if(!fits(ls,c))throw new Error("line "+c.line+" of "+path+" on "+p.from+" has changed since it was suggested, so nothing was committed");});
      by[path].slice().sort(function(a,b){return b.line-a.line;}).forEach(function(c){Array.prototype.splice.apply(ls,[c.line-1,1].concat(c.sug.text===""?[]:c.sug.text.split("\n")));});
      var data=ls.join("\n");if(crlf)data=data.replace(/\n/g,"\r\n");return {path:path,data:data};});}))
  .then(function(ch){return IR.info(r.id).then(function(s){out=!s.detached&&s.branch===p.from;return ch;});})
  .then(function(ch){var sg=[];cs.forEach(function(c){var b=c.by||who();if(sg.indexOf(b)<0)sg.push(b);});var text=msg+"\n\nSuggested in the review of pull request #"+p.n+" by "+names(sg)+".";
    if(!out)return IR.commitTo(r.id,p.from,ch,text);
    return IR.status(r.id).then(function(st){if(st.merging)throw new Error("finish or stop the merge under Changes first");
      if(!st.clean)throw new Error("“"+p.from+"” is the idea open in Changes, and some changes there are not kept yet: keep or put them back first, so the suggestion is a version of its own");
      return ch.reduce(function(q,x){return q.then(function(){return IR.put(r.id,x.path,x.data);});},Promise.resolve()).then(function(){return IR.commit(r.id,text);});});})
  .then(function(oid){var at=Date.now(),me=who(),b=batchOf(r,p);cs.forEach(function(c){c.sug.applied={commit:oid,at:at,by:me,on:p.from};var j=b.indexOf(c.id);if(j>=0)b.splice(j,1);});
    p.events.push({at:at,kind:"suggested",n:cs.length,commit:oid,on:p.from,paths:paths});p.updated=at;
    return keep(rec).then(function(){if(!out){try{H().kept(r.id,oid);}catch(e){}}return again();}).then(function(){return oid;});});}
function sugFiles(r,rec,p,w,q){var dv=w.querySelector(".f-diff"),pre=dv&&dv.querySelector("pre.f-dcode"),hd=dv&&dv.querySelector(".f-diff-h");LASTW=w;if(!pre||!hd||pre.__r339)return;pre.__r339=1;dv.classList.add("r339-files");
  var path=((hd.querySelector("b")||{}).textContent||"").trim();if(!path)return;
  [].forEach.call(dv.querySelectorAll(".r282-thread[data-c]"),function(th){dress(r,rec,p,th);});
  new MutationObserver(function(ms){ms.forEach(function(m){[].forEach.call(m.addedNodes,function(n){if(n.nodeType!==1)return;
    if(n.classList.contains("r282-new"))offer(r,rec,p,q,path,n);else if(n.classList.contains("r282-thread"))dress(r,rec,p,n);});});}).observe(pre,{childList:true});
  bar(r,rec,p,w);}

/* ================= points of connection: r282's chips, files and timeline; r285's merge note ================= */
var meta0=P.meta,files0=P.files,ev0=P.evText;
P.meta=function(r,rec,it,w){var res=meta0.apply(this,arguments);try{if(it&&rec&&it.from&&it.to&&(rec.pulls||[]).indexOf(it)>=0){chipRow(r,rec,it,w);if(it.state==="open")autoOwners(r,rec,it);}}catch(e){try{console.warn("Fabrica reviewers",e);}catch(_){}}return res;};
P.files=function(r,rec,p,w,q){var res=files0.apply(this,arguments);try{sugFiles(r,rec,p,w,q||{});}catch(e){try{console.warn("Fabrica suggestions",e);}catch(_){}}return res;};
P.evText=function(ev){if(ev&&ev.kind==="review")return "Asked "+(ev.model?"your model":names(ev.who||[]))+(ev.again?" again":"")+" for a review"+(ev.line?", as line "+ev.line+" of CODEOWNERS says":"");
  if(ev&&ev.kind==="unreview")return "No longer waiting for a review from "+names(ev.who||[]);
  if(ev&&ev.kind==="suggested")return (ev.n===1?"A suggestion was":ev.n+" suggestions were")+" kept as version "+String(ev.commit||"").slice(0,7)+" on "+ev.on+(ev.paths&&ev.paths.length?" ("+names(ev.paths.slice(0,3))+(ev.paths.length>3?" and more":"")+")":"");
  return ev0?ev0.apply(this,arguments):"";};
if(W.IngGuard&&typeof W.IngGuard.mergeNote==="function"&&!W.IngGuard.mergeNote.__r339){var mn0=W.IngGuard.mergeNote;
  W.IngGuard.mergeNote=function(r,rec,p,box){var res=mn0.apply(this,arguments);try{ownNote(r,p,box);}catch(e){}return res;};W.IngGuard.mergeNote.__r339=1;}

W.IngReview={parse:function(t){var o=parse(t);return {rules:o.rules.map(function(r){return {line:r.line,pat:r.pat,owners:r.owners.slice(),rx:String(r.rx)};}),skipped:o.skipped};},
  match:function(text,path){var h=lastHit(parse(text),path);return h?{line:h.line,owners:h.owners.slice()}:null;},
  owners:function(id,n){return IR.info(id).then(function(r){var h=H();return h.record(id).then(function(rec){var p=(rec.pulls||[]).filter(function(x){return x.n===n;})[0];return owners(r,p);});});},
  state:function(){var b={};Object.keys(BATCH).forEach(function(k){if(BATCH[k].length)b[k]=BATCH[k].slice();});return {batch:b,reading:Object.keys(RUN),codeowners:COC.size,pending:!!PEND};}};
try{window.__ingParts["p339"]="running";}catch(_){}
})();
</script>
