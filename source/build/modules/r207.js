<style id="r207-css">
/* ============ R207 · SOURCES ONLY WHEN THEY BELONG TO THE REPLY (Ingenium 6.9.4, 3 November 2026) ============ */
.msg-sources[hidden],.msg-sources li[hidden]{display:none !important}
</style>
<script>try{(window.__ingParts=window.__ingParts||{})["p207"]="started";}catch(_){}
/* ============ R207 · SOURCES ONLY WHEN THEY BELONG TO THE REPLY (Ingenium 6.9.4, 3 November 2026) ============
   The owner's words (3 November 2026): "The scholarly sources all nonsense and keep on showing up with every reply, I want that
   removed, I only want real and accurate sources and only when they pertain to the reply do I want them cited and provided."
   Measured on 6.9.3 before this part:
   - "Scholarly sources first" counted as on unless it had been switched off, so with Web search on every reply first searched
     OpenAlex, Crossref, Europe PMC and arXiv, a question about code or a recipe included;
   - a record was kept when a third of the question's longer words appeared anywhere in its title or abstract;
   - the References list under a reply showed every record the search returned, whether the reply cited it or not.
   Now (with the R207 edits in build_page.py):
   - Scholarly sources first is off until the person switches it on (in the chat's + menu, or in Settings);
   - a scholarly record is kept only when half of the question's words are in its title and abstract, and one at least in its
     title;
   - under a reply, the list shows only the sources the reply cites ([2], [2, 4] or [2–4], outside code), each under the number
     the reply gives it; a reply that cites none shows no list; Copy the references and Keep copy only those cited;
   - while a reply is still being written, no list is shown. */
(function(){"use strict";
if(window.__r207)return;window.__r207=1;
var W=window;
function wrap(o,f){try{Object.keys(o).forEach(function(k){if(!(k in f))f[k]=o[k];});}catch(e){}return f;}
/* the numbers a reply cites: [1], [2, 4], [3–5] (a range of at most 30), outside fenced and inline code */
function cited(text){var t=String(text||"").replace(/```[\s\S]*?(```|$)/g," ").replace(/`[^`\n]*`/g," "),set={},m,re=/\[(\d{1,3}(?:\s*[,;–—-]\s*\d{1,3})*)\]/g;
  while((m=re.exec(t))){m[1].split(/\s*[,;]\s*/).forEach(function(part){var r=/^(\d+)\s*[–—-]\s*(\d+)$/.exec(part);
    if(r){var a=+r[1],b=+r[2];if(b>=a&&b-a<=30)for(var i=a;i<=b;i++)set[i]=1;}else if(/^\d+$/.test(part)&&+part>0)set[+part]=1;});}
  return set;}
W.ingCitedNumbers=cited;
function citedSources(mm){var set=cited(mm&&mm.text),out=[];(mm&&mm.sources||[]).forEach(function(x,i){if(set[i+1])out.push({n:i+1,x:x});});return out;}
W.ingCitedSources=citedSources;
function refOf(x){try{return x.ref||(typeof schRefText==="function"?schRefText(x):(x.title||x.url||""));}catch(e){return x&&(x.title||x.url)||"";}}
function trim(d,mm){if(!d||!mm||mm.role!=="bot"||!mm.sources||!mm.sources.length)return;
  var boxes=[].slice.call(d.querySelectorAll(".msg-sources"));if(!boxes.length)return;
  var set=cited(mm.text),any=Object.keys(set).length>0;
  boxes.forEach(function(box){
    if(mm.live||!any){box.hidden=true;return;}
    var ol=box.querySelector("ol");if(!ol){box.hidden=true;return;}
    var shown=0;[].slice.call(ol.children).forEach(function(li,i){if(li.tagName!=="LI")return;if(set[i+1]){li.hidden=false;li.value=i+1;shown++;}else li.hidden=true;});
    box.hidden=!shown;
    /* the keys under the list act on what is shown */
    [].slice.call(box.querySelectorAll("button")).forEach(function(b){var t=(b.textContent||"").trim();
      if(/^Copy the references$/.test(t)&&!b.__r207){b.__r207=1;b.onclick=function(){var txt=citedSources(mm).map(function(c){return "["+c.n+"] "+refOf(c.x);}).join("\n");try{csCopyText(txt,b);}catch(e){}};}
      else if(/^Keep them all in my sources$/.test(t)&&!b.__r207){b.__r207=1;b.textContent=shown===1?"Keep it in my sources":"Keep these in my sources";
        b.onclick=function(){try{fontesAdd(citedSources(mm).map(function(c){return schToCSL(c.x);}));b.textContent="Kept";b.disabled=true;}catch(e){}};}});});}
W.ingTrimSources=trim;   /* for the tests */
if(typeof W.fillMsg==="function"){var oFill=W.fillMsg;
  W.fillMsg=wrap(oFill,function(d,mm){var r=oFill.apply(this,arguments);try{trim(d,mm);}catch(e){}return r;});}
})();
;try{window.__ingParts["p207"]="running";}catch(_){}
</script>
