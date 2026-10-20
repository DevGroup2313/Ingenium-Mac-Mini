<script>try{(window.__ingParts=window.__ingParts||{})["p69"]="started";}catch(_){}
/* ============ R148 · LECTOR WRITES CLEANLY: NO LOOPS, NO MACHINE'S TELLS ============
   The owner's words (20 October 2026): "The Lector page glitched while creating a portfolio document for the Forge, it just
   started writing "The Forge" as a long list where it was supposed to say where it does next, please fix this issue as well. I
   really need the Lector page to be functioning properly, its writing needs to be accurate and precise with no hint of AI."
   A local model can fall into a loop: the same name or line again and again until its allowance runs out. Every piece Lector
   asks for (lxAsk) is now watched as it is written. When it starts to repeat itself, the writing is stopped at once and asked
   for again with a firmer hand against repetition (a higher repeat penalty and presence penalty, a little more warmth); if it
   loops again, what came before the loop is kept, cut at the last whole sentence, and nothing of the loop. The finished text
   is tidied too: a sentence or line given twice in a row is given once. And the writing keeps to the owner's own manner: the
   instructions ask for no dash used as punctuation and none of the phrases that mark text as a machine's, and the few that
   still come through are taken out where that can be done without changing the meaning. */
(function(){"use strict";
if(typeof lxAsk!=="function")return;

/* ---------- a loop, found while it is written ---------- */
function norm(t){return String(t||"").replace(/\s+/g," ");}
/* the place in t where a run of the same words begins, or -1: a unit of 3 to 160 characters given 5 times or more in a row at
   the end; the same line 4 times among the last 10; or one pair of words making up more than a third of the last 90 words */
function loopAt(t){t=String(t||"");if(t.length<60)return -1;var tail=norm(t.slice(-2400)),n=tail.length,L,c,u;
  for(L=3;L<=160&&L*5<=n;L++){u=tail.slice(n-L);if(!/\S/.test(u))continue;c=1;while(c*L+L<=n&&tail.slice(n-(c+1)*L,n-c*L)===u)c++;
    if(c>=5&&c*L>=40)return cutPoint(t,u.trim());}
  var lines=t.split("\n").map(function(x){return x.trim();}).filter(function(x){return x.length>=3;}).slice(-10),seen={},k;
  for(k=0;k<lines.length;k++){var key=lines[k].toLowerCase();seen[key]=(seen[key]||0)+1;if(seen[key]>=4)return cutPoint(t,lines[k]);}
  var w=tail.toLowerCase().replace(/[^\p{L}\p{N}' ]+/gu," ").split(" ").filter(Boolean).slice(-90);
  if(w.length>=60){var bg={},best="",bn=0;for(k=0;k+1<w.length;k++){var b=w[k]+" "+w[k+1];bg[b]=(bg[b]||0)+1;if(bg[b]>bn){bn=bg[b];best=b;}}
    if(bn*2>=w.length/3&&bn>=12){var re=new RegExp(best.split(" ").map(function(x){return x.replace(/[.*+?^${}()|[\]\\]/g,"\\$&");}).join("\\W+"),"i"),m=re.exec(t.slice(-2400));
      return m?t.length-Math.min(t.length,2400)+m.index:t.length-400;}}
  return -1;}
/* where the run began: walk back from the end over the repeats themselves (with the spaces, commas and line breaks between
   them), so all of them go and a sentence before them that only names the same thing stays */
function cutPoint(t,unit){if(!unit)return t.length;var u=unit.toLowerCase(),n=u.length,low=t.toLowerCase(),pos=t.length,runs=0;
  while(pos>0){var q=pos;while(q>0&&/[\s,;:·\-–—]/.test(t.charAt(q-1)))q--;if(q>=n&&low.slice(q-n,q)===u){pos=q-n;runs++;}else break;}
  if(runs>=2)return pos;
  var i=low.lastIndexOf(u);return i>=0?i:Math.max(0,t.length-n*5);}
/* the text before a loop, ending at its last whole sentence */
function beforeLoop(t,at){var s=String(t||"").slice(0,Math.max(0,at)),m=/[\s\S]*[.!?](["'”’)\]]*)(?=\s|$)/.exec(s);s=m?m[0]:s;return s.replace(/[\s,;:]+$/,"").trim();}

/* ---------- the writing, tidied ---------- */
var TELLS=[
  [/(^|[.!?]\s+|\n)(It is (?:important|worth|crucial) (?:to note|noting|to remember|to mention) that )([a-z])/g,function(a,p,x,c){return p+c.toUpperCase();}],
  [/(^|[.!?]\s+|\n)((?:In conclusion|In summary|To summari[sz]e|Overall|Ultimately|In essence|At its core|All in all),\s+)([a-z])/g,function(a,p,x,c){return p+c.toUpperCase();}],
  [/\b(?:a|an) testament to\b/gi,"evidence of"],
  [/\bplays a (?:crucial|pivotal|vital|key) role in\b/gi,"matters to"],
  [/\bdelves? into\b/gi,function(a){return /^D/.test(a)?"Examines":"examines";}],
  [/\bseamlessly\b/gi,""]];
function tidy(t){var s=String(t||"");if(!s)return s;
  /* a dash used as punctuation becomes a comma (a hyphen inside a word is left alone) */
  s=s.replace(/\s+[—–]\s+/g,", ").replace(/([\p{L}\p{N}])—([\p{L}\p{N}])/gu,"$1, $2");
  TELLS.forEach(function(x){s=s.replace(x[0],x[1]);});
  s=s.replace(/ {2,}/g," ").replace(/ ,/g,",");
  /* a line, or a sentence, given twice in a row is given once */
  var out=[],prev=null;s.split("\n").forEach(function(line){var k=line.trim().toLowerCase();if(k&&k===prev)return;out.push(line);prev=k||prev;});s=out.join("\n");
  s=s.replace(/([^.!?\n]{12,}[.!?])(\s+\1)+/g,"$1");
  return s;}

/* ---------- what every piece is asked to do ---------- */
var MANNER="\n\nTHE OWNER'S MANNER. Write as the owner writes, in plain, exact sentences. Never use a dash (— or –) as punctuation: use a comma, a colon, a semicolon or a full stop. Do not use these phrases or words: it is important to note, it is worth noting, in conclusion, in summary, overall (to open a sentence), ultimately, at its core, a testament to, plays a crucial role, pivotal, intricate, multifaceted, nuanced, landscape, navigate, foster, embark, underscore, showcase, seamless, delve, ever-evolving, in today's world. Do not repeat a name, a phrase or a sentence you have already written unless the sense needs it; refer back with a pronoun or a shorter name. Write each idea once.";
function withManner(msgs){if(!Array.isArray(msgs)||!msgs.length)return msgs;var m=msgs.slice(),i=0;
  if(m[0]&&m[0].role==="system"&&typeof m[0].content==="string"&&m[0].content.indexOf("THE OWNER'S MANNER")<0)m[0]=Object.assign({},m[0],{content:m[0].content+MANNER});
  else if(!(m[0]&&m[0].role==="system"))m.unshift({role:"system",content:MANNER.trim()});
  return m;}

/* ---------- a firmer hand against repetition, for the asking again ---------- */
var boost=0;
if(window.Engine&&typeof Engine.generate==="function"&&!Engine.__lxBoost){var og=Engine.generate;Engine.__lxBoost=true;
  Engine.generate=function(job){try{if(boost&&job&&job.params){var p=job.params;job=Object.assign({},job,{params:Object.assign({},p,{
      repeat_penalty:Math.max(p.repeat_penalty||1,1.1+0.08*boost),presence_penalty:Math.max(p.presence_penalty||0,0.35*boost),
      temperature:Math.min(1,(p.temperature==null?0.3:p.temperature)+0.12*boost)})});}}catch(e){}return og.apply(this,arguments.length>1?[job].concat([].slice.call(arguments,1)):[job]);};}

function stopNow(){try{if(window.LX&&LX.cloudAb&&typeof LX.cloudAb.abort==="function")LX.cloudAb.abort();}catch(e){}try{if(typeof cloudAbort==="function")cloudAbort();}catch(e){}try{if(window.Engine&&typeof Engine.abort==="function")Engine.abort();}catch(e){}}

var oAsk=lxAsk;
lxAsk=function(run,msgs,maxTok,temp,onPiece){var tries=0,best="";
  function once(){var looped=-1,seen=0,text="";
    return oAsk(run,withManner(msgs),maxTok,temp,function(t){text=t;if(looped<0&&t.length-seen>=160){seen=t.length;var at=loopAt(t);if(at>=0){looped=at;stopNow();}}
        if(onPiece)onPiece(looped>=0?t.slice(0,looped):t);})
      .then(function(out){out=String(out||"");if(looped<0){var at=loopAt(out);if(at>=0)looped=at;}return {text:looped>=0?(text||out):out,looped:looped};},
        function(e){if(looped>=0)return {text:text,looped:looped};throw e;});}
  function go(){return once().then(function(r){if(r.looped<0){boost=0;return tidy(r.text);}
      var kept=beforeLoop(r.text,r.looped);if(kept.length>best.length)best=kept;
      try{console.warn("Lector: the writing began to repeat itself ("+(++tries)+"); asked again with a firmer hand against repetition");}catch(_){}
      if(tries<=2){boost=tries;return new Promise(function(res){setTimeout(res,400);}).then(go);}
      boost=0;return tidy(best);},function(e){boost=0;throw e;});}
  return go();};
window.lxAsk=lxAsk;
window.IngWrite={loopAt:loopAt,beforeLoop:beforeLoop,tidy:tidy,manner:MANNER};
})();
;try{window.__ingParts["p69"]="running";}catch(_){}
</script>
