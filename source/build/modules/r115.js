<style id="r115-css">
/* ============ R115 · ACADEMIC SAFEGUARDS: FONTES AS A REFERENCE DATABASE, EVERY SEARCH VETTED ============
   Her word (17 October): "add robust academic safeguards to Ingenium, it is lacking in explicit scholarly features such as
   citations management (Fontes), reference databases, or peer reviewed content integration. I want for Ingenium's 'Web
   search' capabilities to be tailored to academic sources and thoroughly thoroughly vetted everytime."
   What R99 began (the scholarly indexes, the vetting, Fontes) now goes the whole way: every search vetted, with or without
   the indexes; a Peer-reviewed only switch; Fontes as a database (collections, notes, search within it, a whole .bib or
   .ris brought in); and Lector citing her sources in the documents, with a References list in her chosen style. */
.fo-tools{display:flex;gap:6px;align-items:center;flex-wrap:wrap;margin:6px 0 2px}
.fo-tools input[type=search]{flex:1 1 160px;min-width:120px;padding:6px 10px;border-radius:999px;border:.5px solid var(--hairline);background:var(--card);color:var(--ink-1);font:13px var(--sans)}
.fo-tools select{padding:6px 10px;border-radius:999px;border:.5px solid var(--hairline);background:var(--card);color:var(--ink-1);font:13px var(--sans);max-width:200px}
.fo-count{font-size:12px;color:var(--ink-3);margin:2px 0 4px}
.fo-row .fo-side{display:flex;flex-direction:column;gap:4px;min-width:0;flex:1}
.fo-meta{display:flex;gap:6px;flex-wrap:wrap;align-items:center}
.fo-tag{font:600 10.5px/1 var(--sans);padding:3px 8px;border-radius:999px;background:var(--accent-soft,rgba(106,63,181,.12));color:var(--accent,#6a3fb5)}
.fo-tag.peer{background:rgba(47,122,85,.12);color:#2f7a55}
.fo-note{font:12.5px/1.4 var(--sans);color:var(--ink-2);white-space:pre-wrap}
.fo-note-in{width:100%;min-height:52px;font:12.5px/1.4 var(--sans);margin-top:4px}
.fo-bar label.small{display:inline-flex;align-items:center;gap:6px}
.fo-bar #foStyle{width:auto;max-width:240px}
.fo-k{font:600 11px/1 var(--sans);padding:4px 8px;border-radius:999px;border:.5px solid var(--hairline);background:var(--card);color:var(--ink-2);cursor:pointer}
</style>
<script>try{(window.__ingParts=window.__ingParts||{})["p46"]="started";}catch(_){}
/* R115 · academic safeguards: see the note at the top of its styles */
(function r115Academic(){
"use strict";
function $(id){return document.getElementById(id);}
/* ---------- Peer-reviewed only ---------- */
function schPeerOnly(){var s=state.search||{};return !!s.peerOnly;}
function schIsPeer(x){if(!x||x.kind!=="scholarly"||x.preprint||x.retracted)return false;
  return x.venueType==="journal"||x.type==="article"||x.type==="review"||/journal-article|book|chapter|monograph/.test(String(x.type||""));}
window.schPeerOnly=schPeerOnly;window.schIsPeer=schIsPeer;
(function wireSettings(){var c=$("srchPeer");if(!c)return;state.search=state.search||{};c.checked=!!state.search.peerOnly;
  c.onchange=function(){state.search.peerOnly=c.checked;if(c.checked){state.search.scholar=true;var s=$("srchScholar");if(s)s.checked=true;}saveState();};})();

/* ---------- Fontes as a reference database ---------- */
function fontesColls(){var st=fontesState();if(!Array.isArray(st.colls))st.colls=[];return st.colls;}
function peerOf(c){return /article-journal|^review/.test(String(c.type||""));}
function kindOf(c){var t=String(c.type||"");if(/article-journal|review/.test(t))return "journal";if(/book|chapter|monograph/.test(t))return "book";if(/article|paper-conference/.test(t))return "paper";if(/webpage|post/.test(t))return "web";return "other";}
function hay(c){return [c.title,(c.author||[]).map(function(a){return a.literal||[a.family,a.given].filter(Boolean).join(" ");}).join(" "),c["container-title"],c.issued&&c.issued["date-parts"]&&c.issued["date-parts"][0]&&c.issued["date-parts"][0][0],c.DOI,c.ingColl,c.ingNote].filter(Boolean).join(" ").toLowerCase();}
function openFontesDb(){var st=fontesState();fontesColls();
  var box=modalOpen('<h3>My sources <span class="small muted" style="font-weight:400">· Fontes</span></h3>'
    +'<p class="small muted" style="margin-top:0">Your reference database, kept on this device. Add a source by its DOI or ISBN (one a line), paste BibTeX or RIS, or bring in a whole .bib, .ris or CSL-JSON file from Zotero, Mendeley or EndNote. Ingenium formats them with citeproc-js, the engine Zotero uses; Lector cites them in your documents.</p>'
    +'<div class="fo-add"><textarea id="foIn" rows="3" placeholder="10.1093/oso/9780198250128.001.0001&#10;978-0-19-953955-6&#10;or paste BibTeX or RIS"></textarea><div style="display:flex;flex-direction:column;gap:6px"><button class="btn primary" id="foAdd">Add</button><button class="btn ghost" id="foFile">Bring in a file</button></div></div>'
    +'<div class="small muted" id="foNote" style="min-height:18px"></div>'
    +'<div class="fo-tools"><input type="search" id="foFind" placeholder="Find in my sources: a word, a name, a year" aria-label="Find in my sources"><select id="foColl" aria-label="Collection"></select><button class="fo-k" id="foNewColl">＋ Collection</button><button class="fo-k" id="foPut">Put ticked in…</button></div>'
    +'<div class="fo-count" id="foCount"></div>'
    +'<div class="fo-bar"><label class="small">Style <select id="foStyle"></select></label><span class="fo-sp"></span>'
    +'<button class="btn ghost" id="foAll">Tick all</button><button class="btn ghost" id="foDel">Remove ticked</button></div>'
    +'<div id="foList" class="fo-list"></div>'
    +'<div class="fo-bar fo-out"><button class="btn" id="foCopy">Copy the references</button><button class="btn" id="foChat">Send with my message</button><button class="btn ghost" id="foBib">BibTeX</button><button class="btn ghost" id="foRis">RIS</button><button class="btn ghost" id="foJson">CSL-JSON</button><span class="fo-sp"></span><button class="btn ghost" id="foClose">Close</button></div>');
  var sel=box.querySelector("#foStyle"),list=box.querySelector("#foList"),note=box.querySelector("#foNote"),find=box.querySelector("#foFind"),collSel=box.querySelector("#foColl"),count=box.querySelector("#foCount");
  fontesStyles().forEach(function(s){var o=document.createElement("option");o.value=s[0];o.textContent=s[1];sel.appendChild(o);});sel.value=st.style||"apa";
  var view={q:"",coll:""};
  function paintColls(){collSel.innerHTML="";var o0=document.createElement("option");o0.value="";o0.textContent="All collections";collSel.appendChild(o0);
    fontesColls().forEach(function(n){var o=document.createElement("option");o.value=n;o.textContent=n+" ("+st.items.filter(function(c){return c.ingColl===n;}).length+")";collSel.appendChild(o);});
    var on=document.createElement("option");on.value="\u0000none";on.textContent="Not in a collection";collSel.appendChild(on);collSel.value=view.coll;}
  function shown(){var q=view.q.trim().toLowerCase();return st.items.filter(function(c){if(view.coll==="\u0000none"&&c.ingColl)return false;if(view.coll&&view.coll!=="\u0000none"&&c.ingColl!==view.coll)return false;return !q||hay(c).indexOf(q)>=0;});}
  function ticked(){var ids={};[].slice.call(list.querySelectorAll("input:checked")).forEach(function(c){ids[c.value]=1;});var t=st.items.filter(function(c){return ids[String(c.id)];});return t.length?t:shown();}
  function paint(){paintColls();var rows0=shown(),kinds={};st.items.forEach(function(c){var k=kindOf(c);kinds[k]=(kinds[k]||0)+1;});
    count.textContent=st.items.length?st.items.length+" source"+(st.items.length===1?"":"s")+(kinds.journal?" · "+kinds.journal+" journal article"+(kinds.journal===1?"":"s"):"")+(kinds.book?" · "+kinds.book+" book"+(kinds.book===1?"":"s")+" or chapter"+(kinds.book===1?"":"s"):"")+(kinds.paper?" · "+kinds.paper+" paper"+(kinds.paper===1?"":"s"):"")+(kinds.web?" · "+kinds.web+" web page"+(kinds.web===1?"":"s"):"")+(rows0.length!==st.items.length?" · "+rows0.length+" shown":""):"";
    list.innerHTML="";if(!st.items.length){list.appendChild(el("div","small muted","No sources yet. Add one above, bring in a file, or press Add to my sources under a reply's references."));return;}
    if(!rows0.length){list.appendChild(el("div","small muted","Nothing here matches."));return;}
    list.appendChild(el("div","small muted","Formatting…"));
    fontesFormat(rows0,sel.value).then(function(rows){list.innerHTML="";var by={};rows.forEach(function(r){by[String(r.id)]=r.text;});
      rows0.forEach(function(c){var row=el("label","fo-row");var cb=document.createElement("input");cb.type="checkbox";cb.value=String(c.id);row.appendChild(cb);
        var side=el("div","fo-side");side.appendChild(el("span","fo-txt",by[String(c.id)]||fontesPlain(c)));
        var meta=el("div","fo-meta");if(peerOf(c))meta.appendChild(el("span","fo-tag peer","Peer-reviewed journal"));if(c.ingColl)meta.appendChild(el("span","fo-tag",c.ingColl));if(c.DOI)meta.appendChild(el("span","small muted","doi:"+c.DOI));
        var nk=el("button","fo-k",c.ingNote?"Note":"＋ Note");nk.type="button";nk.onclick=function(e){e.preventDefault();e.stopPropagation();var ex=side.querySelector(".fo-note-in");if(ex){ex.remove();return;}var ta=document.createElement("textarea");ta.className="fo-note-in";ta.value=c.ingNote||"";ta.placeholder="Your note on this source: what it argues, what you take from it, the page.";
          ta.onclick=function(ev){ev.stopPropagation();};ta.onchange=function(){c.ingNote=ta.value.trim();saveState();if(c.ingNote){if(!nd){nd=el("div","fo-note","");side.appendChild(nd);}nd.textContent=c.ingNote;}else if(nd){nd.remove();nd=null;}nk.textContent=c.ingNote?"Note":"＋ Note";ta.remove();};side.appendChild(ta);ta.focus();};meta.appendChild(nk);
        side.appendChild(meta);var nd=null;if(c.ingNote){nd=el("div","fo-note",c.ingNote);side.appendChild(nd);}
        row.appendChild(side);list.appendChild(row);});});}
  sel.onchange=function(){st.style=sel.value;saveState();paint();};
  find.oninput=function(){view.q=find.value;paint();};collSel.onchange=function(){view.coll=collSel.value;paint();};
  box.querySelector("#foNewColl").onclick=function(){var n=prompt("A name for the collection (a project, a chapter, a course):","");if(!n)return;n=n.trim().slice(0,60);if(!n)return;if(fontesColls().indexOf(n)<0)fontesColls().push(n);var t=ticked();if(t.length&&t.length<st.items.length)t.forEach(function(c){c.ingColl=n;});view.coll=n;saveState();paint();};
  box.querySelector("#foPut").onclick=function(){var cs=fontesColls();if(!cs.length){ingToast("Make a collection first (＋ Collection).");return;}var ids={};[].slice.call(list.querySelectorAll("input:checked")).forEach(function(c){ids[c.value]=1;});var t=st.items.filter(function(c){return ids[String(c.id)];});if(!t.length){ingToast("Tick the sources to put in a collection.");return;}
    var n=prompt("Which collection? "+cs.join(", ")+"\n(Leave empty to take them out of their collection.)",view.coll&&view.coll!=="\u0000none"?view.coll:cs[0]);if(n===null)return;n=n.trim();if(n&&cs.indexOf(n)<0){cs.push(n);}t.forEach(function(c){if(n)c.ingColl=n;else delete c.ingColl;});saveState();paint();};
  box.querySelector("#foAdd").onclick=function(){var b=this;b.disabled=true;note.textContent="Looking it up…";
    fontesLookup(box.querySelector("#foIn").value).then(function(items){if(view.coll&&view.coll!=="\u0000none")items.forEach(function(c){c.ingColl=view.coll;});var n=fontesAdd(items);box.querySelector("#foIn").value="";
      note.textContent=(n?n+" added.":"Nothing new to add.")+(items.errors&&items.errors.length?" Not found: "+items.errors.join("; "):"");paint();},
      function(e){note.textContent=e.message||String(e);}).then(function(){b.disabled=false;});};
  box.querySelector("#foFile").onclick=function(){var i=document.createElement("input");i.type="file";i.accept=".bib,.ris,.json,.txt";i.multiple=true;i.style.display="none";document.body.appendChild(i);
    i.onchange=function(){var fs=[].slice.call(i.files||[]);i.remove();if(!fs.length)return;note.textContent="Reading "+fs.length+" file"+(fs.length===1?"":"s")+"…";
      Promise.all(fs.map(function(f){return f.text();})).then(function(texts){return Promise.all(texts.map(function(t){return fontesLookup(t).catch(function(e){return Object.assign([],{errors:[e.message]});});}));}).then(function(lists){var all=[],errs=[];lists.forEach(function(l){(l||[]).forEach(function(c){all.push(c);});if(l&&l.errors)errs=errs.concat(l.errors);});
        if(view.coll&&view.coll!=="\u0000none")all.forEach(function(c){c.ingColl=view.coll;});var n=fontesAdd(all);note.textContent=(n?n+" brought in.":"Nothing new in the file"+(fs.length===1?"":"s")+".")+(errs.length?" "+errs.join("; "):"");paint();},function(e){note.textContent=e.message||String(e);});};i.click();};
  box.querySelector("#foAll").onclick=function(){[].slice.call(list.querySelectorAll("input[type=checkbox]")).forEach(function(c){c.checked=true;});};
  box.querySelector("#foDel").onclick=function(){var ids={};[].slice.call(list.querySelectorAll("input:checked")).forEach(function(c){ids[c.value]=1;});
    var before=st.items.length;st.items=st.items.filter(function(c){return !ids[String(c.id)];});saveState();note.textContent=(before-st.items.length)+" removed.";paint();};
  box.querySelector("#foCopy").onclick=function(){var b=this;fontesFormat(ticked(),sel.value).then(function(rows){csCopyText(rows.map(function(r){return r.text;}).join("\n"),b);});};
  box.querySelector("#foChat").onclick=function(){var t=ticked();fontesFormat(t,sel.value).then(function(rows){
      var txt="My sources, to write from and to cite (formatted in "+(sel.options[sel.selectedIndex]||{}).textContent+"):\n\n"+rows.map(function(r,i){var c=t[i]||{};return "["+(i+1)+"] "+r.text+(c.ingNote?"\n    My note: "+c.ingNote:"")+(c.abstract?"\n    Abstract: "+String(c.abstract).replace(/<[^>]+>/g,"").slice(0,1200):"");}).join("\n")
        +"\n\nCite these by number. Use only these sources for factual claims, and say where they do not answer the question.";
      stageText("My sources.txt",txt,false);paintChips();closeModal();ingToast(t.length+" source"+(t.length===1?"":"s")+" will go with your next message.");});};
  function dl(name,mime,text){try{saveFileNative(name,mime,text);}catch(e){}}
  box.querySelector("#foBib").onclick=function(){dl("my-sources.bib","application/x-bibtex",window.FONTES?FONTES.toBibTeX(ticked()):"");};
  box.querySelector("#foRis").onclick=function(){dl("my-sources.ris","application/x-research-info-systems",window.FONTES?FONTES.toRIS(ticked()):"");};
  box.querySelector("#foJson").onclick=function(){dl("my-sources.json","application/json",JSON.stringify(ticked(),null,2));};
  box.querySelector("#foClose").onclick=closeModal;paint();}
if(typeof fontesState==="function"&&typeof modalOpen==="function"){openFontes=openFontesDb;window.openFontes=openFontesDb;try{if(window.IngScholar&&IngScholar.fontes)IngScholar.fontes.open=openFontesDb;}catch(e){}}
})();
;try{window.__ingParts["p46"]="running";}catch(_){}
</script>
