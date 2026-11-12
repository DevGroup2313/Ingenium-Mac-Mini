<style id="r282-css">
/* ============ R282 · FABRICA: PEOPLE AND MILESTONES, A COMMENT ON ANY LINE, TEMPLATES (Ingenium 6.89, 12 November 2026) ============
   Her words, on the preview of phase 2's second stage (https://claude.ai/artifact/VNwsz2ywj3XkXaCq8gws1o, version 4, with the pieces
   commit 9287840 added): "I approve of the preview, please push it everywhere." As the preview drew them, in Fabrica's own parts:
   - An issue or a pull request has, under its first line, two chips: People and Milestone. Each opens Ingenium's own list (r172's look,
     as the branch key's): the people known in this repository (yours, and those who came with it from GitHub), Someone else, No one;
     the milestones with their date and how many of their issues are done, A new milestone, No milestone. Kept on this computer, said in
     the conversation ("Given to Ada", "Added to the milestone v3.3") and in the lists.
   - In a pull request's files, every line of the changes has a + key at its start (shown under the pointer, always on a touch screen):
     a comment on that line, kept with the pull request, its thread under the line, with Reply and Resolve (a resolved thread folds to one
     line). Viewed folds a file away until it changes again. The comments GitHub kept on lines come with a repository brought from
     GitHub (modules/r276.js).
   - A new issue or pull request offers the repository's own templates (.github/ISSUE_TEMPLATE/, ISSUE_TEMPLATE.md,
     PULL_REQUEST_TEMPLATE.md, as GitHub reads them): one press fills its title, words and labels; a single pull request template fills
     a new pull request at once, as GitHub does.
   Drawn with Fabrica's tokens and parts (--f-*, .f-chip, .f-btn, .h-cmt); nothing tilts or glows. */
#fb .r282-meta{padding-top:0;flex-wrap:wrap}
#fb .r282-meta .r282-mk{cursor:pointer;transition:transform .16s cubic-bezier(.34,1.35,.64,1),box-shadow .2s}
#fb .r282-meta .r282-mk:hover{transform:translateY(-2px);box-shadow:var(--f-pophi)}
#fb .r282-meta .r282-mk:active{transform:translateY(1px);transition-duration:.06s}
#fb .r282-meta .r282-mk:focus-visible{outline:2px solid var(--f-ring);outline-offset:2px}
#fb .r282-meta .r282-mk svg{width:13px;height:13px;fill:none;stroke:var(--f-acc);stroke-width:1.9;stroke-linecap:round;stroke-linejoin:round;flex:0 0 auto}
#fb .r282-meta .r282-mk b{font-weight:700;color:var(--f-ink1)}
#fb .f-dcode.r282-on .f-dl{position:relative}
#fb .f-dcode .r282-lc{position:absolute;left:2px;top:50%;width:18px;height:18px;margin-top:-9px;padding:0;border:0;border-radius:6px;cursor:pointer;
  font:700 13px/18px var(--f-sans);color:#fff;background:linear-gradient(var(--f-acc),var(--f-acc));box-shadow:var(--f-pill);opacity:0;transform:scale(.8);
  transition:opacity .14s ease,transform .16s cubic-bezier(.34,1.35,.64,1);user-select:none;-webkit-user-select:none}
/* the + is drawn, not written: a line's text stays the code itself (copied, read or searched) */
#fb .f-dcode .r282-lc::before{content:"+"}
#fb .f-dcode .f-dl:hover .r282-lc,#fb .f-dcode .r282-lc:focus-visible{opacity:1;transform:scale(1)}
#fb .f-dcode .r282-lc:hover{transform:translateY(-1px) scale(1.06)}
#fb .f-dcode .r282-lc:active{transform:translateY(1px) scale(.96);transition-duration:.06s}
@media (hover:none){#fb .f-dcode .r282-lc{opacity:.8;transform:scale(1)}}
#fb .r282-lcbox{white-space:normal;margin:6px 10px 8px 46px;padding:10px 12px;border-radius:12px;background:var(--f-hi);box-shadow:var(--f-pill);font:13px/1.45 var(--f-sans);color:var(--f-ink2);animation:fbRise .28s cubic-bezier(.34,1.35,.64,1) both}
#fb .r282-lcta{display:block;width:100%;box-sizing:border-box;min-height:54px;resize:vertical;border-radius:10px;border:1px solid var(--f-hair);background:var(--f-wellbg);box-shadow:var(--f-well);color:var(--f-ink1);font:13px/1.45 var(--f-sans);padding:7px 10px}
#fb .r282-lcta:focus-visible{outline:2px solid var(--f-acc);outline-offset:2px}
#fb .r282-lck{display:flex;gap:8px;justify-content:flex-end;margin-top:8px;flex-wrap:wrap}
#fb .r282-thread .h-cmt{margin:0}
#fb .r282-thread .h-cmt + .h-cmt{margin-top:8px}
#fb .r282-thread.r282-done{opacity:.62}
#fb .r282-thread.r282-done .h-md,#fb .r282-thread.r282-done .r282-reply{display:none}
#fb .r282-reply{margin-top:8px}
#fb .r282-viewed{margin-left:auto;display:inline-flex;align-items:center;gap:8px;font:600 12px var(--f-sans);color:var(--f-ink2);cursor:pointer}
#fb .r282-viewed .f-sw{margin:0}
#fb .f-dcode.r282-folded{max-height:0;overflow:hidden;padding-top:0;padding-bottom:0;min-height:0}
#fb .r282-old{margin:8px 12px 0;font-size:12.5px;color:var(--f-ink3)}
#fb .r282-tpl{display:flex;align-items:center;gap:8px;flex-wrap:wrap;margin:2px 0 4px;font-size:12.5px;color:var(--f-ink2)}
#fb .r282-tpl .f-chip{cursor:pointer;transition:transform .16s cubic-bezier(.34,1.35,.64,1),box-shadow .2s}
#fb .r282-tpl .f-chip:hover{transform:translateY(-2px);box-shadow:var(--f-pophi)}
#fb .r282-tpl .f-chip:active{transform:translateY(1px);transition-duration:.06s}
#fb .r282-tpl .f-chip[aria-pressed="true"]{color:var(--f-acc);border-color:var(--f-ring)}
#fb .r282-ms label{display:flex;flex-direction:column;gap:4px;margin:0 0 10px;font-size:12.5px;color:var(--f-ink2)}
@media (prefers-reduced-motion:reduce){#fb .r282-meta .r282-mk,#fb .r282-tpl .f-chip,#fb .f-dcode .r282-lc{transition:none}#fb .r282-lcbox{animation:none}}
@media (forced-colors:active){#fb .f-dcode .r282-lc{opacity:1;border:1px solid CanvasText}}
</style>
<script>try{(window.__ingParts=window.__ingParts||{})["p282"]="started";}catch(_){}
/* window.IngPlans {meta, files, templates, evText, rowNote, state}: see the stylesheet above. */
(function r282(){
"use strict";
if(window.IngPlans)return;
var W=window,D=document;
function H(){return W.fbHub||null;}
function X(){return W.fbHubHost||null;}
function el(tag,cls,html){var e=D.createElement(tag);if(cls)e.className=cls;if(html!=null)e.innerHTML=html;return e;}
function esc(s){return String(s==null?"":s).replace(/[&<>"']/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c];});}
function toast(m){var x=X();if(x&&x.toast)x.toast(m);}
function fail(e){var x=X();if(x&&x.fail)x.fail(e);else toast(String(e&&e.message||e));}
function who(){try{var a=W.IngRepo&&IngRepo.author&&IngRepo.author();if(a&&a.name)return a.name;}catch(e){}return "You";}
function when(t){var x=X();if(x&&x.when)return x.when(t);return t?new Date(t).toLocaleString("en-GB"):"";}
function md(s){var h=H();try{return h&&h.md?h.md(s,{breaks:true}):esc(s);}catch(e){return esc(s);}}
function keep(rec){var h=H();return h&&h.keep?Promise.resolve(h.keep(rec)):Promise.resolve();}
function repaint(){var h=H();if(h&&h.repaint)h.repaint();}
function list(anchor,groups,onPick){var k=W.IngDisk;if(k&&k.openList)return k.openList(anchor,groups,onPick);}
/* asked in Ingenium's own words, as r141 asks */
function askYes(title,text,yes){try{if(typeof W.ingAsk==="function")return Promise.resolve(W.ingAsk({title:title,text:text,yes:yes,no:"Keep what I wrote"}));}catch(e){}return Promise.resolve(W.confirm(title+"\n\n"+text));}
var MONTHS=["January","February","March","April","May","June","July","August","September","October","November","December"];
function dayOf(ms){var d=new Date(ms);return d.getDate()+" "+MONTHS[d.getMonth()]+(d.getFullYear()!==new Date().getFullYear()?" "+d.getFullYear():"");}
function names(a){a=a||[];return a.length<3?a.join(" and "):a.slice(0,-1).join(", ")+" and "+a[a.length-1];}

/* ================= people and a milestone ================= */
var ICP='<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="8.5" r="3.5"/><path d="M5 20c1.2-3.6 3.9-5.5 7-5.5s5.8 1.9 7 5.5"/></svg>',
    ICM='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 21V4"/><path d="M6 4h11l-2.5 4L17 12H6"/></svg>';
function people(rec){var seen={},out=[];function add(n){n=String(n||"").trim();if(n&&!seen[n.toLowerCase()]){seen[n.toLowerCase()]=1;out.push(n);}}
  add(who());(rec.people||[]).forEach(add);rec.issues.concat(rec.pulls).forEach(function(i){(i.people||[]).forEach(add);});return out;}
function msDone(rec,t){var all=rec.issues.concat(rec.pulls).filter(function(i){return i.milestone===t;}),done=all.filter(function(i){return i.state!=="open";}).length;return [done,all.length];}
function chip(ic,label,val,fn){var b=el("button","f-chip r282-mk");b.type="button";b.title=label;b.setAttribute("data-k",label.toLowerCase());b.setAttribute("aria-haspopup","listbox");b.innerHTML=ic+"<span>"+esc(label)+": <b>"+esc(val)+"</b></span>";
  b.onclick=function(e){e.preventDefault();e.stopPropagation();fn(b);};return b;}
function meta(r,rec,it,w){if(!it)return;if(!Array.isArray(it.people))it.people=[];if(!Array.isArray(rec.milestones))rec.milestones=[];
  var row=el("div","h-meta h-blk r282-meta");row.setAttribute("data-n",it.n);
  row.appendChild(chip(ICP,"People",it.people.length?names(it.people):"No one",function(b){pickPeople(b,r,rec,it);}));
  row.appendChild(chip(ICM,"Milestone",it.milestone||"No milestone",function(b){pickMilestone(b,r,rec,it);}));
  w.appendChild(row);}
function changed(rec,it,ev){it.events.push(ev);it.updated=Date.now();return keep(rec).then(repaint,fail);}
function pickPeople(b,r,rec,it){var ps=people(rec);
  list(b,[{label:"Give it to",items:ps.map(function(n){return {kind:"p",name:n,label:n+(it.people.indexOf(n)>=0?" · given":""),on:it.people.indexOf(n)>=0};})},
    {label:"",items:[{kind:"else",label:"Someone else…"},{kind:"none",label:"No one",on:!it.people.length}]}],function(x){
    if(x.kind==="none"){if(!it.people.length)return;var del=it.people.slice();it.people=[];changed(rec,it,{at:Date.now(),kind:"people",add:[],del:del});return;}
    if(x.kind==="else"){askName(function(n){if(!Array.isArray(rec.people))rec.people=[];if(rec.people.indexOf(n)<0)rec.people.push(n);if(it.people.indexOf(n)>=0)return;it.people.push(n);return changed(rec,it,{at:Date.now(),kind:"people",add:[n],del:[]});});return;}
    var i=it.people.indexOf(x.name);if(i>=0){it.people.splice(i,1);changed(rec,it,{at:Date.now(),kind:"people",add:[],del:[x.name]});}else{it.people.push(x.name);changed(rec,it,{at:Date.now(),kind:"people",add:[x.name],del:[]});}});}
function sheet(title,lead){var x=X();return x&&x.sheet?x.sheet(title,lead):null;}
function askName(fn){var sh=sheet("Someone else","Their name, as you would call them. It is kept with this repository, on this computer.");if(!sh)return;var inp=el("input");inp.type="text";inp.setAttribute("aria-label","Their name");inp.maxLength=60;sh.box.appendChild(inp);
  var end=el("div","end"),ok=el("button","f-btn pri","Give it to them");ok.type="button";ok.onclick=function(){var v=inp.value.trim();if(!v){inp.focus();return;}ok.disabled=true;Promise.resolve(fn(v)).then(sh.close,function(e){ok.disabled=false;fail(e);});};
  end.appendChild(ok);sh.box.appendChild(end);inp.onkeydown=function(e){if(e.key==="Enter")ok.click();if(e.key==="Escape")sh.close();};setTimeout(function(){inp.focus();},60);}
function pickMilestone(b,r,rec,it){var ms=rec.milestones||[],open=ms.filter(function(m){return m.state!=="closed";}),shut=ms.filter(function(m){return m.state==="closed";});
  function item(m){var d=msDone(rec,m.title);return {kind:"m",m:m,label:m.title+(m.due?" · due "+dayOf(m.due):"")+" · "+d[0]+" of "+d[1]+" done",on:it.milestone===m.title};}
  list(b,[{label:"Milestones",items:open.map(item)},{label:"Closed",items:shut.map(item)},{label:"",items:[{kind:"new",label:"A new milestone…"},{kind:"none",label:"No milestone",on:!it.milestone}]}],function(x){
    if(x.kind==="none"){if(!it.milestone)return;var was=it.milestone;it.milestone=null;changed(rec,it,{at:Date.now(),kind:"milestone",from:was,to:null});return;}
    if(x.kind==="new"){newMilestone(rec,function(m){var was=it.milestone||null;it.milestone=m.title;return changed(rec,it,{at:Date.now(),kind:"milestone",from:was,to:m.title});});return;}
    if(it.milestone===x.m.title)return;var was2=it.milestone||null;it.milestone=x.m.title;changed(rec,it,{at:Date.now(),kind:"milestone",from:was2,to:x.m.title});});}
function newMilestone(rec,then){var sh=sheet("A new milestone","A name, and the day it is due if it has one. Its issues and pull requests are counted as they close.");if(!sh)return;
  var box=el("div","r282-ms");box.innerHTML='<label>Its name<input type="text" maxlength="80" aria-label="The milestone\'s name" placeholder="v3.3"></label><label>Due (if it has a day)<input type="date" aria-label="The day it is due"></label>';sh.box.appendChild(box);
  var nm=box.querySelector('input[type="text"]'),due=box.querySelector('input[type="date"]');
  var end=el("div","end"),ok=el("button","f-btn pri","Make it");ok.type="button";ok.onclick=function(){var t=nm.value.trim();if(!t){nm.focus();return;}
    if((rec.milestones||[]).some(function(m){return m.title.toLowerCase()===t.toLowerCase();})){toast("There is already a milestone called “"+t+"”.");nm.focus();return;}
    var d=due.value?Date.parse(due.value+"T12:00:00"):null,m={title:t.slice(0,80),due:isFinite(d)?d:null,state:"open",desc:""};rec.milestones=(rec.milestones||[]).concat([m]);ok.disabled=true;
    Promise.resolve(then(m)).then(sh.close,function(e){ok.disabled=false;fail(e);});};end.appendChild(ok);sh.box.appendChild(end);setTimeout(function(){nm.focus();},60);}
function evText(ev){if(!ev)return "";
  if(ev.kind==="people"){var a=ev.add||[],d=ev.del||[];return (a.length?"Given to "+names(a):"")+(a.length&&d.length?"; ":"")+(d.length?(a.length?"taken from ":"Taken from ")+names(d):"");}
  if(ev.kind==="milestone")return ev.from&&ev.to?"Moved from the milestone “"+ev.from+"” to “"+ev.to+"”":ev.to?"Added to the milestone “"+ev.to+"”":"Taken out of the milestone “"+(ev.from||"")+"”";
  if(ev.kind==="line")return "Commented on line "+ev.line+" of "+ev.path;
  if(ev.kind==="resolved")return (ev.open?"Opened again":"Resolved")+" a comment on line "+ev.line+" of "+ev.path;
  return "";}
function rowNote(x){return (x.milestone?" · "+x.milestone:"")+(x.people&&x.people.length?" · "+names(x.people):"");}

/* ================= a comment on any line of a pull request's changes ================= */
var OIDS=new Map();
/* the git name of a file at a version: Viewed lasts until the file changes again */
function oidAt(r,ref,path){var k=r.id+"|"+ref;if(!OIDS.has(k))OIDS.set(k,IngRepo.files(r.id,ref).then(function(fs){var m={};fs.forEach(function(f){m[f.path]=f.oid;});return m;},function(){return {};}));
  if(OIDS.size>24)OIDS.delete(OIDS.keys().next().value);return OIDS.get(k).then(function(m){return m[path]||null;});}
function lineNo(line){var i=line.querySelector("i");return i?+String(i.textContent||"").replace(/[^0-9]/g,"")||0:0;}
function sideOf(line){var s=line.querySelector("s");return s&&/[−-]/.test(s.textContent||"")?"old":"new";}
function files(r,rec,p,w,q){var dv=w.querySelector(".f-diff"),pre=dv&&dv.querySelector("pre.f-dcode"),hd=dv&&dv.querySelector(".f-diff-h");if(!pre||!hd||pre.__r282)return;pre.__r282=1;
  var path=((hd.querySelector("b")||{}).textContent||"").trim();if(!path)return;if(!Array.isArray(p.lines))p.lines=[];if(!p.viewed||typeof p.viewed!=="object")p.viewed={};
  /* Viewed: folded away until the file changes again */
  var vw=el("label","r282-viewed",'<span>Viewed</span><span class="f-sw"><input type="checkbox" aria-label="Viewed: fold this file away until it changes again"></span>'),cb=vw.querySelector("input");hd.appendChild(vw);
  oidAt(r,q.head,path).then(function(oid){var on=!!(oid&&p.viewed[path]===oid);cb.checked=on;pre.classList.toggle("r282-folded",on);
    cb.onchange=function(){if(cb.checked&&oid)p.viewed[path]=oid;else delete p.viewed[path];pre.classList.toggle("r282-folded",cb.checked);keep(rec);toast(cb.checked?"Marked as viewed: it folds away until it changes again.":"Not viewed yet.");};});
  pre.classList.add("r282-on");
  [].forEach.call(pre.querySelectorAll(".f-dl:not(.hunk)"),function(line){var n=lineNo(line),side=sideOf(line);if(!n)return;line.setAttribute("data-side",side);line.setAttribute("data-line",n);
    var plus=el("button","r282-lc");plus.type="button";plus.title="Comment on line "+n;plus.setAttribute("aria-label","Comment on line "+n);line.insertBefore(plus,line.firstChild);
    plus.onclick=function(e){e.preventDefault();e.stopPropagation();var nx=line.nextElementSibling;if(nx&&nx.classList.contains("r282-new"))return;openBox(r,rec,p,line,path,side,n);};});
  var away=[];p.lines.filter(function(c){return c.path===path;}).forEach(function(c){var at=pre.querySelector('.f-dl[data-side="'+c.side+'"][data-line="'+c.line+'"]'),th=thread(r,rec,p,c);
    if(at&&!c.outdated){var after=at;while(after.nextElementSibling&&after.nextElementSibling.classList.contains("r282-thread"))after=after.nextElementSibling;after.parentNode.insertBefore(th,after.nextSibling);}else away.push(th);});
  if(away.length){var box=el("div","r282-old");box.appendChild(el("p",null,"On lines that changed since, or that this file no longer shows:"));away.forEach(function(t){t.style.marginLeft="0";box.appendChild(t);});dv.insertBefore(box,pre);}}
function openBox(r,rec,p,line,path,side,n){var box=el("div","r282-lcbox r282-new");
  box.innerHTML='<textarea class="r282-lcta" rows="2" placeholder="A comment on line '+n+'" aria-label="A comment on line '+n+'"></textarea><div class="r282-lck"><button class="f-btn quiet sm" type="button" data-x="no">Cancel</button><button class="f-btn pri sm" type="button" data-x="go">Comment on line '+n+'</button></div>';
  line.parentNode.insertBefore(box,line.nextSibling);var ta=box.querySelector("textarea");setTimeout(function(){try{ta.focus({preventScroll:true});}catch(e){}},30);
  box.onclick=function(e){var x=e.target.closest&&e.target.closest("[data-x]");if(!x)return;e.preventDefault();e.stopPropagation();if(x.getAttribute("data-x")==="no"){box.remove();return;}
    var t=ta.value.trim();if(!t){ta.focus();toast("A few words first.");return;}
    var c={id:"c"+Date.now().toString(36)+Math.random().toString(36).slice(2,6),path:path,side:side,line:n,body:t,by:who(),at:Date.now(),resolved:false,replies:[]};
    p.lines.push(c);p.events.push({at:c.at,kind:"line",path:path,line:n});p.updated=c.at;x.disabled=true;
    keep(rec).then(function(){box.replaceWith(thread(r,rec,p,c));toast("Your comment is kept with the pull request, on line "+n+".");},function(e){x.disabled=false;fail(e);});};}
function card(c,head){var a=el("article","h-cmt"),hd=el("div","h-cmt-h");hd.innerHTML="<b>"+esc(c.by||who())+"</b><span>"+esc(head)+"</span><span>"+esc(when(c.at))+"</span>";a.appendChild(hd);var b=el("div","h-md");b.innerHTML=md(c.body||"");a.appendChild(b);return a;}
function thread(r,rec,p,c){var th=el("div","r282-lcbox r282-thread"+(c.resolved?" r282-done":""));th.setAttribute("data-c",c.id);
  th.appendChild(card(c,"on line "+c.line+(c.side==="old"?" (as it was)":"")));(c.replies||[]).forEach(function(x){th.appendChild(card(x,"replied"));});
  var keys=el("div","r282-lck"),rp=el("button","f-btn quiet sm r282-replyk","Reply"),rs=el("button","f-btn quiet sm","Resolve");rp.type=rs.type="button";rs.setAttribute("data-r","1");rs.textContent=c.resolved?"Unresolve":"Resolve";
  rp.onclick=function(e){e.preventDefault();e.stopPropagation();if(th.querySelector(".r282-reply"))return;var bx=el("div","r282-reply");
    bx.innerHTML='<textarea class="r282-lcta" rows="2" placeholder="A reply" aria-label="A reply"></textarea><div class="r282-lck"><button class="f-btn quiet sm" type="button" data-y="no">Cancel</button><button class="f-btn pri sm" type="button" data-y="go">Reply</button></div>';
    th.insertBefore(bx,keys);var ta=bx.querySelector("textarea");setTimeout(function(){try{ta.focus({preventScroll:true});}catch(_){}},30);
    bx.onclick=function(ev){var y=ev.target.closest&&ev.target.closest("[data-y]");if(!y)return;ev.preventDefault();ev.stopPropagation();if(y.getAttribute("data-y")==="no"){bx.remove();return;}
      var t=ta.value.trim();if(!t){ta.focus();return;}var x={by:who(),at:Date.now(),body:t};c.replies=(c.replies||[]).concat([x]);p.updated=x.at;y.disabled=true;
      keep(rec).then(function(){bx.replaceWith(card(x,"replied"));},function(er){y.disabled=false;fail(er);});};};
  rs.onclick=function(e){e.preventDefault();e.stopPropagation();c.resolved=!c.resolved;c.resolvedAt=c.resolved?Date.now():null;p.events.push({at:Date.now(),kind:"resolved",path:c.path,line:c.line,open:!c.resolved});
    th.classList.toggle("r282-done",c.resolved);rs.textContent=c.resolved?"Unresolve":"Resolve";keep(rec);toast(c.resolved?"Resolved: the thread folds away, kept with the pull request.":"Open again.");};
  keys.appendChild(rp);keys.appendChild(rs);th.appendChild(keys);return th;}

/* ================= templates for a new issue or pull request ================= */
var TPL=new Map(),USED={};
function tplPaths(kind){return kind==="pr"?[/^(\.github\/|docs\/)?pull_request_template\.(md|markdown)$/i,/^\.github\/pull_request_template\/[^/]+\.(md|markdown)$/i]
  :[/^\.github\/issue_template\/[^/]+\.(md|markdown)$/i,/^(\.github\/|docs\/)?issue_template\.(md|markdown)$/i];}
/* GitHub's front matter: name, about, title, labels (a list or words with commas) */
function parse(path,text){var m=/^---\s*\n([\s\S]*?)\n---\s*\n?([\s\S]*)$/.exec(String(text).replace(/\r\n/g,"\n")),o={path:path,name:"",about:"",title:"",labels:[],body:String(text)};
  if(m){o.body=m[2];m[1].split("\n").forEach(function(l){var k=/^([A-Za-z_]+):\s*(.*)$/.exec(l);if(!k)return;var key=k[1].toLowerCase(),val=k[2].trim().replace(/^["']|["']$/g,"");
    if(key==="name")o.name=val;else if(key==="about")o.about=val;else if(key==="title")o.title=val;
    else if(key==="labels")o.labels=val.replace(/^\[|\]$/g,"").split(",").map(function(x){return x.trim().replace(/^["']|["']$/g,"");}).filter(Boolean);});}
  if(!o.name)o.name=path.split("/").pop().replace(/\.(md|markdown)$/i,"").replace(/[-_]+/g," ").replace(/^./,function(c){return c.toUpperCase();});
  if(/^(issue|pull request) template$/i.test(o.name))o.name="The template";return o;}
function readTemplates(r,kind){var k=r.id+"|"+(r.head||"")+"|"+kind;if(TPL.has(k))return TPL.get(k);
  var pr=IngRepo.files(r.id,r.head||"HEAD").then(function(fs){var res=tplPaths(kind),hits=fs.filter(function(f){return res.some(function(x){return x.test(f.path);})&&(f.size==null||f.size<262144);}).slice(0,12);
    return Promise.all(hits.map(function(f){return IngRepo.readText(r.id,f.path,r.head||"HEAD").then(function(t){return t==null?null:parse(f.path,t);},function(){return null;});}));})
    .then(function(a){return a.filter(Boolean).sort(function(x,y){return x.name.localeCompare(y.name);});},function(){return [];});
  TPL.set(k,pr);if(TPL.size>24)TPL.delete(TPL.keys().next().value);return pr;}
function templates(r,rec,kind,form,o){if(!r||!r.head||!form)return;
  readTemplates(r,kind).then(function(ts){if(!ts.length||!form.isConnected||form.querySelector(".r282-tpl"))return;
    var row=el("div","r282-tpl");row.setAttribute("role","group");row.setAttribute("aria-label","Start from a template");row.appendChild(el("span",null,"Start from"));
    var uk=r.id+"|"+kind,used=null;
    /* drawn again with the words of the template chosen before: that one is still the one chosen */
    var cur0=o.body&&o.body.get?o.body.get().trim():"";if(USED[uk]&&cur0&&cur0===USED[uk].body.trim())used=USED[uk];
    function fill(t,b){used=t;USED[uk]=t;if(o.title&&t.title&&(!o.title.value.trim()||o.title.__r282)){o.title.value=t.title;o.title.__r282=1;}
      if(o.body&&o.body.ta){o.body.ta.value=t.body;try{o.body.ta.dispatchEvent(new Event("input",{bubbles:true}));}catch(e){}}
      if(kind==="issue"&&o.labels&&t.labels.length)t.labels.forEach(function(l){if(rec.labels.some(function(x){return x.name===l;})&&o.labels.indexOf(l)<0)o.labels.push(l);});
      if(o.keep)o.keep(o.title?o.title.value:"",t.body);[].forEach.call(row.querySelectorAll(".f-chip"),function(x){x.setAttribute("aria-pressed",x===b?"true":"false");});
      if(kind==="issue"&&t.labels.length)repaint();}
    ts.forEach(function(t){var b=el("button","f-chip",esc(t.name));b.type="button";b.setAttribute("aria-pressed",used&&used.path===t.path?"true":"false");b.title=t.about||t.path;
      b.onclick=function(e){e.preventDefault();var body=o.body&&o.body.get?o.body.get().trim():"";
        if(!body||(used&&body===used.body.trim())){fill(t,b);return;}
        askYes("Start from “"+t.name+"”?","Its words take the place of what you wrote.","Use the template").then(function(y){if(y)fill(t,b);});};row.appendChild(b);});
    var h3=form.querySelector("h3");form.insertBefore(row,h3?h3.nextSibling:form.firstChild);
    /* a single pull request template fills a new pull request at once, as GitHub does */
    if(kind==="pr"&&ts.length===1&&o.body&&o.body.get&&!o.body.get().trim())fill(ts[0],row.querySelector(".f-chip"));});}

W.IngPlans={meta:meta,files:files,templates:templates,evText:evText,rowNote:rowNote,_parse:parse,state:function(){return {oids:OIDS.size,templates:TPL.size};}};
try{window.__ingParts["p282"]="running";}catch(_){}
})();
</script>
