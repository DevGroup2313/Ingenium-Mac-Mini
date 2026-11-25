<style id="r384-css">
/* ============ R384 · VOCATIO: YOUR PROFILE, READ ONCE (Ingenium 7.85, 25 November 2026) ============
   Recommendation 1 of 24 November, before her Cambridge deadline of 8 December, approved with the live preview (25 November 2026,
   https://claude.ai/artifact/G3YPubJyRy9pe9DphJH62R): "I approve of the previews". Until now a reading either cut the profile to fit
   (the parts that bear on the task) or, Step by step, everything, read the whole of it in parts afresh for every task (r188's
   partByPart). Now Vocatio reads it once, part by part, with partByPart's own instruction less the task: every entry of Your entries,
   the CV in sections, the LinkedIn summary, each document and each app as Lector read it. It keeps the facts each part gives, each with
   the part it came from; a fact whose numbers or names are not in its part is dropped (counted, and said). A part already read is not
   read again: when an entry changes, only that entry is. While the digest covers the whole profile, a reading starts from it (r188's
   profileBlock), the facts most relevant to the task first; Step by step, everything stays as it was.
   In Your profile, a part of its own, Read once: where it stands (up to date, or how many parts changed), the facts with where each comes
   from, and keys to read it now or read the changed parts again. Its rows lift under the pointer, in Vocatio's own tokens. */
#cs .vd{display:grid;gap:12px}
#cs .vd-out{padding:14px 16px 16px}
#cs .vd-m{height:9px;border-radius:999px;background:var(--c-wellbg);box-shadow:var(--c-well);overflow:hidden}
#cs .vd-m span{display:block;height:100%;border-radius:999px;background:linear-gradient(90deg,#8d68d3,var(--c-acc))}
#cs .vd-top{display:flex;justify-content:space-between;gap:10px;flex-wrap:wrap;font-size:12.5px;color:var(--c-ink3)}
#cs .vd-chip{display:inline-flex;align-items:center;gap:6px;font-size:12px;font-weight:600;border-radius:999px;padding:5px 10px;background:var(--c-accs);color:var(--c-acc);white-space:nowrap}
#cs .vd-chip i{width:7px;height:7px;border-radius:50%;background:currentColor;display:block}
#cs .vd-chip.ok{background:var(--c-oks);color:var(--c-ok)}#cs .vd-chip.warn{background:var(--c-warns);color:var(--c-warn)}
#cs .vd-facts{display:grid;gap:8px;margin:0;padding:0;list-style:none}
#cs .vd-facts li{display:grid;grid-template-columns:minmax(0,1fr) auto;gap:10px;align-items:start;border:1px solid var(--c-hair);border-radius:12px;background:linear-gradient(var(--c-a),var(--c-b));padding:10px 12px;
  box-shadow:var(--c-pill,var(--c-pop));transition:transform .2s cubic-bezier(.2,.9,.3,1.3),box-shadow .2s;color:var(--c-ink1);font-size:13.5px}
#cs .vd-facts li:hover{transform:translateY(-2px);box-shadow:var(--c-pophi)}
#cs .vd-src{font-size:12px;color:var(--c-ink3);margin-top:3px}#cs .vd-src b{color:var(--c-acc);font-weight:600}
#cs .vd-note{font-size:12.5px;color:var(--c-ink3);margin:0}
@media (prefers-reduced-motion:reduce){#cs .vd-facts li{transition:none}#cs .vd-facts li:hover{transform:none}}
body[data-motion="minimal"] #cs .vd-facts li:hover{transform:none}
</style>
<script>try{(window.__ingParts=window.__ingParts||{})["p384"]="started";}catch(_){}
/* R384 · Your profile, read once: see the note at the top of its styles. window.IngDigest: {parts, ready, block, line, panel, read, verify} */
(function(){"use strict";var W=window,D=document;
function h(tag,cls,txt){var e=D.createElement(tag);if(cls)e.className=cls;if(txt!=null)e.textContent=txt;return e;}
function S(){try{return IngCareer.state();}catch(e){return null;}}
function store(){var s=S();if(!s||!s.profile)return null;var P=s.profile;if(!P.digest||typeof P.digest!=="object")P.digest={parts:{},at:0,model:"",dropped:0};if(!P.digest.parts||typeof P.digest.parts!=="object")P.digest.parts={};return P.digest;}
function hash(t){var h1=5381,h2=52711,i=0,s=String(t);for(;i<s.length;i++){var c=s.charCodeAt(i);h1=(h1*33)^c;h2=(h2*33)^c;}return (h1>>>0).toString(36)+(h2>>>0).toString(36)+s.length.toString(36);}
/* the profile's parts, as a reading gathers them (r188's gatherProfile0): each entry, the CV in sections, LinkedIn, each document, each app */
function chunks(t,size){t=String(t||"").trim();if(!t)return [];var out=[],rest=t;while(rest.length){if(rest.length<=size){out.push(rest);break;}var c=rest.slice(0,size),p=Math.max(c.lastIndexOf("\n\n"),c.lastIndexOf("\n- "));if(p<size*0.5)p=c.lastIndexOf("\n");if(p<size*0.3)p=size;out.push(rest.slice(0,p).trim());rest=rest.slice(p).trim();}return out;}
function partsOf(G){var out=[];if(!G)return out;var sect="";
  String(G.items||"").split(/\n(?=## |- )/).forEach(function(b){b=b.trim();if(!b)return;var m=/^## (.+)$/m.exec(b);if(/^## /.test(b)){sect=m?m[1].trim():"";b=b.replace(/^## .+\n?/,"").trim();if(!b)return;}
    if(/^- /.test(b)){var first=b.split("\n")[0].replace(/^- /,"").split(",")[0].trim();out.push({src:(sect?sect+" · ":"")+first,text:b,kind:"entry"});}});
  chunks(G.cv,2400).forEach(function(c,i,a){out.push({src:"Your CV"+(a.length>1?", part "+(i+1)+" of "+a.length:""),text:c,kind:"cv"});});
  if(G.linkedin)out.push({src:"Your LinkedIn summary",text:String(G.linkedin).slice(0,4000),kind:"linkedin"});
  (G.files||[]).forEach(function(f){chunks(f.text,2400).forEach(function(c,i,a){out.push({src:f.name+(a.length>1?", part "+(i+1)+" of "+a.length:""),text:c,kind:"file"});});});
  (G.apps||[]).forEach(function(a){chunks(a.text,2400).forEach(function(c,i,L){out.push({src:a.name+", as Lector read it"+(L.length>1?", part "+(i+1):""),text:c,kind:"app"});});});
  out.forEach(function(p){p.key=hash(p.kind+"\n"+p.src+"\n"+p.text);});return out;}
/* a fact is kept only if its numbers and names stand in its part */
function verify(fact,text){var T=String(text||""),nums=String(fact).match(/\d[\d,.]*\d|\d/g)||[],names=String(fact).match(/\b[A-Z][A-Za-zÀ-ſ'-]{2,}\b/g)||[];
  var tn=T.replace(/(\d),(\d)/g,"$1$2");for(var i=0;i<nums.length;i++){var n=nums[i].replace(/(\d),(\d)/g,"$1$2").replace(/\.$/,"");if(tn.indexOf(n)<0)return false;}
  var COMMON=/^(The|This|That|These|Those|She|Her|Hers|His|They|Their|And|But|With|From|For|Into|Built|Designed|Made|Worked|Led|Taught|Studied|Wrote|Created|Developed|Managed|Published|Holds|Has|Had|Was|Were|Is|Are|Its|Also|Some|Each|Every|Both|Since|Until|During|Between|After|Before|Over|Under|About)$/;
  for(var j=0;j<names.length;j++){if(COMMON.test(names[j]))continue;if(T.indexOf(names[j])<0)return false;}return true;}
function factsOf(t,text){var kept=[],dropped=0;String(t||"").replace(/<think>[\s\S]*?<\/think>/gi,"").replace(/^[\s\S]*<\/think>/i,"").split(/\n+/).forEach(function(l){l=l.replace(/^\s*(?:[-*•]|\d+[.)])\s*/,"").trim();if(!l||/^NONE\.?$/i.test(l)||l.length<6||/^(here|these|the facts|facts|part \d)/i.test(l))return;
    if(verify(l,text))kept.push(l.slice(0,300));else dropped++;});return {facts:kept,dropped:dropped};}
function state(G){var D0=store(),ps=partsOf(G),have=ps.filter(function(p){return D0&&D0.parts[p.key];});return {parts:ps,read:have.length,total:ps.length,changed:ps.length-have.length,any:!!(D0&&Object.keys(D0.parts).length)};}
var LAST=null;/* the last gathered profile, so the list's line can say where the digest stands without gathering again */
function ready(G){if(!G)return false;LAST=G;var st=state(G);return st.total>0&&st.changed===0;}
function block(G,R,ctx){if(!ready(G))return null;var D0=store(),lines=[];state(G).parts.forEach(function(p){var e=D0.parts[p.key];(e.facts||[]).forEach(function(f){lines.push("- "+f+" ["+p.src+"]");});});
  if(!lines.length)return null;if(ctx&&ctx.byRelevance)lines=ctx.byRelevance(lines,function(x){return x;});var away=ctx&&ctx.away;var body=lines.join("\n");if(away)body=away(body);
  var out=[];if(ctx&&ctx.wants)out.push(ctx.wants);out.push("THE PROFILE, READ ONCE (every fact below was copied from my profile, CV, documents and apps' readings, and names where it comes from in square brackets; nothing else is a fact about me):"+(ctx&&ctx.name?"\nName: "+ctx.name:"")+"\n\n"+(body.length>R*0.9?body.slice(0,Math.floor(R*0.9)).replace(/\n[^\n]*$/,""):body));
  return out.join("\n\n");}
function line(){var D0=store();if(!D0||!Object.keys(D0.parts).length)return "Not read yet";if(LAST){var st=state(LAST);if(st.changed)return st.changed+" part"+(st.changed===1?"":"s")+" to read again";}
  return "Read "+(D0.at?new Date(D0.at).toLocaleDateString("en-GB",{day:"numeric",month:"long"}):"")+" · "+Object.keys(D0.parts).length+" parts";}
/* read the parts not yet read, one at a time, with partByPart's own instruction less the task */
var BUSY=false;
function read(A){if(BUSY)return Promise.resolve();if(A.busyNow()||A.needModel())return Promise.resolve();BUSY=true;
  return A.gather().then(function(G){LAST=G;var D0=store(),st=state(G),todo=st.parts.filter(function(p){return !D0.parts[p.key];}),keep={};st.parts.forEach(function(p){keep[p.key]=1;});
    Object.keys(D0.parts).forEach(function(k){if(!keep[k])delete D0.parts[k];});
    if(!todo.length){BUSY=false;A.save();A.render();return;}A.begin(null,"Reading your profile once, part by part ("+todo.length+" part"+(todo.length===1?"":"s")+")");var dropped=0;
    return todo.reduce(function(pr,p,i){return pr.then(function(){A.progress(i+1,todo.length,p.src);
        return A.ask1(function(){return [{role:"system",content:"You read one part of a person's profile, on their own device, in "+A.english()+". List every fact in this part: posts, studies, dates, skills, results, publications, apps and their features, copied exactly as written (names, titles, dates and numbers unchanged). Write only what this part shows. Do not judge or advise. One fact to a line. Begin at once with the first fact; no preamble, no reasoning. If this part holds no fact about the person, write NONE."},
            {role:"user",content:"PART "+(i+1)+" OF "+todo.length+" OF MY PROFILE ("+p.src+"):\n"+p.text}];},700,0.1)
          .then(function(t){var r=factsOf(t,p.text);dropped+=r.dropped;D0.parts[p.key]={src:p.src,kind:p.kind,facts:r.facts,at:Date.now()};D0.at=Date.now();A.save();});});},Promise.resolve())
      .then(function(){D0.dropped=dropped;D0.model=A.model();BUSY=false;A.save();A.end();},function(e){BUSY=false;A.save();A.failed(e);});},function(e){BUSY=false;throw e;});}
/* the part of Your profile */
function panel(A){var R=A.panel("csWork","Your profile, read once"),D0=store(),box=h("div","vd vd-out");R.body.appendChild(box);
  box.appendChild(h("p","vd-note","Vocatio reads your profile once, part by part, and keeps the facts each part gives, each with where it came from. A reading then starts from these facts, and only a part you change is read again. A fact whose numbers or names are not in its part is left out."));
  var host=h("div","vd");box.appendChild(host);host.appendChild(h("p","vd-note","Looking at your profile…"));
  A.gather().then(function(G){LAST=G;host.innerHTML="";var st=state(G),chip=h("span","vd-chip "+(st.any&&!st.changed?"ok":st.any?"warn":""));chip.appendChild(h("i"));chip.appendChild(D.createTextNode(!st.any?"Not read yet":st.changed?st.changed+" to read again":"Up to date"));
    var top=h("div","vd-top");top.appendChild(h("span",null,st.read+" of "+st.total+" parts read"+(D0&&D0.dropped?" · "+D0.dropped+" fact"+(D0.dropped===1?"":"s")+" left out, not found in their part":"")));top.appendChild(chip);host.appendChild(top);
    var m=h("div","vd-m"),f=h("span");f.style.width=(st.total?Math.round(st.read/st.total*100):0)+"%";m.appendChild(f);host.appendChild(m);
    var ul=h("ul","vd-facts"),n=0;st.parts.forEach(function(p){var e=D0&&D0.parts[p.key];if(!e)return;(e.facts||[]).slice(0,4).forEach(function(fx){if(n>=40)return;n++;var li=h("li"),d=h("div",null,fx),s=h("div","vd-src");s.appendChild(D.createTextNode("From "));s.appendChild(h("b",null,p.src));d.appendChild(s);li.appendChild(d);
        if(p.kind==="entry")li.appendChild(A.button("sm","Open the entry",function(){A.openEntries();}));ul.appendChild(li);});});
    if(n)host.appendChild(ul);else if(st.any)host.appendChild(h("p","vd-note","No facts were kept yet."));
    R.foot.appendChild(h("span","c-grow"));R.foot.appendChild(A.button("pri",!st.any?"Read it now":st.changed?"Read the "+st.changed+" changed part"+(st.changed===1?"":"s")+" again":"Read it again",function(){if(!st.changed&&st.any){var D1=store();D1.parts={};}read(A);}));});
  return R;}
W.IngDigest={version:1,parts:partsOf,ready:ready,block:block,line:line,panel:panel,read:read,verify:verify,facts:factsOf,store:store};
try{window.__ingParts["p384"]="running";}catch(_){}
})();
</script>
