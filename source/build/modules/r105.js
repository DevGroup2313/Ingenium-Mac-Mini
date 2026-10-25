<style id="r105-css">
/* ============ R105 · CODING MODELS TO CHOOSE FROM ============ */
.lu-coders{margin-top:12px;padding-top:12px;border-top:1px solid var(--hairline,rgba(0,0,0,.08));display:grid;gap:8px}
.lu-coders-h{display:flex;align-items:baseline;justify-content:space-between;gap:10px;flex-wrap:wrap}
.lu-coders-h b{font:600 12px var(--sans);letter-spacing:.07em;text-transform:uppercase;color:var(--ink-3)}
.lu-coders-h span{font-size:12px;color:var(--ink-3)}
.lu-cd{display:grid;grid-template-columns:minmax(0,1fr) auto;gap:4px 12px;align-items:center;padding:9px 11px;border-radius:12px;border:1px solid var(--hairline,rgba(0,0,0,.08));background:var(--card-hi,transparent)}
.lu-cd.on{border-color:rgba(var(--accent-line-rgb,106,63,181),.6);box-shadow:inset 0 0 0 1px rgba(var(--accent-line-rgb,106,63,181),.22)}
.lu-cd-t{min-width:0}
.lu-cd-name{font-weight:600;color:var(--ink-1)}
.lu-cd-meta{font-size:12px;color:var(--ink-3);margin-top:1px}
.lu-cd-fit{font-size:12px;margin-top:2px;color:var(--ink-2)}
.lu-cd-fit.no{color:#b4483c}
body[data-theme="night"] .lu-cd-fit.no{color:#f0a097}
.lu-cd-why{grid-column:1/-1;font-size:12.5px;line-height:1.45;color:var(--ink-2)}
.lu-cd-acts{display:flex;gap:6px;align-items:center;flex-wrap:wrap;justify-content:flex-end}
.lu-cd-now{font:600 11.5px var(--sans);color:var(--accent);padding:4px 10px;border-radius:999px;background:var(--accent-softer,rgba(106,63,181,.08))}
.lu-cd .lu-progress{min-width:150px}
.lu-cd-more{grid-column:1/-1}
.lu-cd-more summary{cursor:pointer;font-size:12px;color:var(--accent);width:fit-content;list-style:none}
.lu-cd-more summary::-webkit-details-marker{display:none}
.lu-cd-more summary::before{content:"▸ ";}
.lu-cd-more[open] summary::before{content:"▾ ";}
.lu-cd-more .lu-cd-why{margin-top:4px}
.lu-big{display:grid;gap:8px}
.lu-big>summary{cursor:pointer;font-size:12.5px;color:var(--ink-2);padding:6px 2px;list-style:none}
.lu-big>summary::-webkit-details-marker{display:none}
.lu-big>summary::before{content:"▸ ";color:var(--accent)}
.lu-big[open]>summary::before{content:"▾ ";}
/* the list says what the old note under Faber said ("its stronger model … try it anyway"), so the note steps aside */
.lu-tile[data-tier="faber"].lu-has-coders .lu-share{display:none}
@media (max-width:560px){.lu-cd{grid-template-columns:1fr}.lu-cd-acts{justify-content:flex-start}}
</style>
<script>try{(window.__ingParts=window.__ingParts||{})["p37"]="started";}catch(_){}
/* ============ R105 · CODING MODELS TO CHOOSE FROM ============
   Her word (16 October 2026): "build into Ingenium some really strong, fast and accurate and really powerful local
   models for coding. I want to get the best models per devices made available on the app for me to choose from."
   Faber, the house for code, now has a list of coding models for each kind of device, in an order Ingenium chose (written
   into the lineup; every file read from Hugging Face on the day with its size and SHA-256). Faber takes the first on that
   list that this device's memory holds, as before (6.7: each maker's scores come from its own tests, so they cannot rank
   the list on one scale); under Faber on the Models page every model on the list can be installed
   and chosen instead, with what it needs and what this device has to spare. */
(function r5Coders(){
  function dev(){var d=lineupDevice();return d==="web"?"desktop":d;}
  function list(){var d=ING_LINEUP.devices[dev()],v=d&&d.tiers&&d.tiers.faber,seen={};
    return (v?[].concat(v):[]).filter(function(k){if(seen[k]||!ING_LINEUP.models[k])return false;seen[k]=1;return true;});}
  function label(){var d=dev();return d==="android"?"this tablet":d==="ios"?"this iPhone or iPad":"this computer";}
  function choose(k){state.tierPick=state.tierPick||{};
    if(k===lineupKeyFor("faber")&&!state.tierPick.faber)return;
    state.tierPick.faber=k;saveState();try{lineupTag();}catch(e){}
    if(lineupRec(k)){try{lineupUse("faber");}catch(e){}}
    renderLineup();try{renderModels();}catch(e){}try{paintChatTop();}catch(e){}}
  function back(){if(state.tierPick)delete state.tierPick.faber;saveState();try{lineupTag();}catch(e){}renderLineup();try{paintChatTop();}catch(e){}}
  function paint(){var tile=document.querySelector('#lineupGrid .lu-tile[data-tier="faber"]');if(!tile)return;
    var ks=list();if(ks.length<2)return;
    var web=lineupDevice()==="web",use=web?null:lineupUsableGB(),cur=lineupKeyFor("faber",web?"desktop":undefined),picked=state.tierPick&&state.tierPick.faber;
    var box=el("div","lu-coders"),hd=el("div","lu-coders-h");
    hd.appendChild(el("b",null,"Coding models for "+label()));
    hd.appendChild(el("span",null,use!=null?"about "+use.toFixed(1)+" GB of memory to spare":"in the order Ingenium suggests"));
    box.appendChild(hd);
    var big=null,nBig=ks.filter(function(k){return use!=null&&lineupNeedGB(ING_LINEUP.models[k])>use&&k!==cur&&!lineupRec(k);}).length;
    ks.forEach(function(k){var sp=ING_LINEUP.models[k],rec=web?null:lineupRec(k),job=lineupJobs[k],need=lineupNeedGB(sp),fits=use==null||need<=use;
      var row=el("div","lu-cd"+(k===cur?" on":""));row.setAttribute("data-cd",k);
      var t=el("div","lu-cd-t");t.appendChild(el("div","lu-cd-name",sp.name));
      t.appendChild(el("div","lu-cd-meta",sp.maker+" · "+fmtBytes(sp.size)+(sp.thinks?" · reasons first":"")));
      t.appendChild(el("div","lu-cd-fit"+(fits?"":" no"),use==null?"Needs about "+need.toFixed(1)+" GB of memory.":fits?"Needs about "+need.toFixed(1)+" GB: fits here.":"Needs about "+need.toFixed(1)+" GB: more than "+label()+" has to spare. It may not load."));
      row.appendChild(t);
      var a=el("div","lu-cd-acts");
      if(web){var pg=el("a","btn xs","Model page");pg.href=sp.page;pg.target="_blank";pg.rel="noopener noreferrer";a.appendChild(pg);}
      else if(k===cur&&rec)a.appendChild(el("span","lu-cd-now","Faber now"));
      else if(job&&job.state==="running"){var p=el("div","lu-progress");var bar=el("div","lu-bar");bar.appendChild(el("i"));p.appendChild(bar);p.appendChild(el("div","lu-prog",""));a.appendChild(p);
        var cb=el("button","btn xs ghost","Cancel");cb.type="button";cb.onclick=function(){lineupCancel(k);};a.appendChild(cb);}
      else if(rec){var ub=el("button","btn xs primary","Use for Faber");ub.type="button";ub.onclick=function(){choose(k);};a.appendChild(ub);}
      else{var ib=el("button","btn xs"+(fits?" primary":""),"Install · "+fmtBytes(sp.size));ib.type="button";
        ib.onclick=function(){lineupInstall(k).then(function(){if(k!==lineupKeyFor("faber"))choose(k);},function(){});};a.appendChild(ib);
        if(k===cur)a.appendChild(el("span","lu-cd-now","Faber's choice"));}
      row.appendChild(a);
      /* what the model is: shown for Faber's model, a press away for the others */
      if(k===cur)row.appendChild(el("div","lu-cd-why",sp.why));
      else{var mo=document.createElement("details");mo.className="lu-cd-more";var su=document.createElement("summary");su.textContent="About this model";mo.appendChild(su);mo.appendChild(el("div","lu-cd-why",sp.why));row.appendChild(mo);}
      if(job&&job.state==="error")row.appendChild(el("div","lu-cd-fit no","The install stopped: "+job.error));
      /* the models this device cannot hold wait under one line, folded */
      if(!fits&&k!==cur&&!rec&&!(job&&job.state==="running")&&nBig){if(!big){big=document.createElement("details");big.className="lu-big";
          var bs=document.createElement("summary");bs.textContent=nBig+" larger model"+(nBig===1?"":"s")+", for "+(dev()==="android"||dev()==="ios"?"devices":"computers")+" with more memory";big.appendChild(bs);}
        big.appendChild(row);}
      else box.appendChild(row);});
    if(big)box.appendChild(big);
    if(picked&&!web){var bk=el("button","btn xs ghost","Back to Ingenium's choice for "+label());bk.type="button";bk.onclick=back;box.appendChild(bk);}
    tile.appendChild(box);tile.classList.add("lu-has-coders");
    ks.forEach(function(k){if(lineupJobs[k]&&lineupJobs[k].state==="running")paintJob(k);});}
  function paintJob(k){var job=lineupJobs[k],row=document.querySelector('.lu-cd[data-cd="'+k+'"]');if(!job||!row)return;
    var bar=row.querySelector(".lu-bar i"),txt=row.querySelector(".lu-prog"),f=job.total?Math.max(0,Math.min(1,job.received/job.total)):0;
    if(bar)bar.style.width=(f*100).toFixed(1)+"%";
    if(txt)txt.textContent=job.phase==="verify"?"Checking its fingerprint…":(fmtBytes(job.received)+" of "+fmtBytes(job.total)+" · "+Math.round(f*100)+"%");}
  var o=renderLineup;renderLineup=function(){var r=o.apply(this,arguments);try{paint();}catch(e){try{console.error("Ingenium: the coding models could not be listed",e);}catch(_){}}return r;};window.renderLineup=renderLineup;
  var oj=lineupPaintJob;lineupPaintJob=function(k){var r=oj.apply(this,arguments);try{paintJob(k);}catch(e){}return r;};window.lineupPaintJob=lineupPaintJob;
  window.IngR105={list:list,choose:choose};
})();
;try{window.__ingParts["p37"]="running";}catch(_){}
</script>
