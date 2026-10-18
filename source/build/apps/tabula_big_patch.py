"""R127 (18 October 2026): Tabula holds a thesis of 100,000 words, by Inkwell's recipe (Inkwell 7.44, "BIG2").

The owner's words: "Inkwell has already implemented the 100,000 word fix to Tabula, please copy that recipe and apply it
to the other Tabulas." Inkwell's fix is in its own writing desk; its recipe, measured there, is: pages laid out by need
(after an edit, from the page before it to the first page break that lines up with an old one), the notes walked only
when they change, and a long document kept in IndexedDB, a far larger store than localStorage. Tabula had the same
faults, measured in Chromium with a thesis of 100,000 words, 337 pages and 303 footnotes (rig/t_tabula_big.js):

  - every key let go re-laid every page from page one (layout, 442 ms), so a keystroke took about 460 ms;
  - the word count read innerText, which lays the page out once more;
  - every pause renumbered all the notes, looking each one up among all the others;
  - autosave and File > Save kept the whole document in localStorage, which this page shares with the app around it.

This patch:
  1. lays the pages out by need. A full layout records, on each paragraph, where it stood and the page it began in. After
     an edit, layout starts at the paragraph before the first one edited and stops at the first paragraph that stands
     where it stood before with the same page above it: everything after it is as it was. Opening a document, a pasted
     page, the window resized and a note inserted lay out everything, as before;
  2. lays nothing out when a key is let go (the layout already follows each change, once the typing pauses);
  3. counts words from each paragraph's own text, with no extra layout;
  4. renumbers the notes only when they changed (their order, or the notes box);
  5. keeps a long document (over 300,000 characters), or any document once localStorage is full, in IndexedDB, with a
     small marker in localStorage; it is read back on opening, and File > Save waits for the saved documents to be read
     before it writes, so a save can never replace them with fewer.

patch(text) returns the patched Tabula page; apply it after tabula_patch.py. Ingenium's build and the Forge's pass 635 use
it. Usage on its own:  python3 -I tabula_big_patch.py tabula.html OUT.html
"""
import sys

MARK = "R127-TABULA-THESIS"

STORE = r"""/* R127-TABULA-THESIS · the store for long documents: IndexedDB, with a small marker in localStorage */
  var TS=(function(){var SMALL=300000,cache={},db=null,opening=null,waits={};
    var can=false;try{can=!!window.indexedDB;}catch(e){}
    function open(){if(opening)return opening;opening=new Promise(function(res){if(!can){res(null);return;}try{var rq=indexedDB.open('tabula-big',1);rq.onupgradeneeded=function(){try{rq.result.createObjectStore('kv');}catch(e){}};rq.onsuccess=function(){db=rq.result;res(db);};rq.onerror=function(){res(null);};rq.onblocked=function(){res(null);};}catch(e){res(null);}});return opening;}
    function tx(mode,fn){return open().then(function(d){if(!d)return null;return new Promise(function(res){try{var t=d.transaction('kv',mode),st=t.objectStore('kv'),out={v:null};fn(st,out);t.oncomplete=function(){res(out.v===null&&mode==='readwrite'?true:out.v);};t.onerror=t.onabort=function(){res(mode==='readwrite'?false:null);};}catch(e){res(mode==='readwrite'?false:null);}});});}
    function put(k,v){return tx('readwrite',function(st){st.put(v,k);});}
    function get(k){return tx('readonly',function(st,out){var r=st.get(k);r.onsuccess=function(){out.v=(r.result===undefined)?null:r.result;};});}
    function del(k){return tx('readwrite',function(st){st['delete'](k);});}
    function ptr(v){if(typeof v!=='string'||v.length>400||v.indexOf('__tabIdb')<0)return null;try{var o=JSON.parse(v);return o&&o.__tabIdb?o:null;}catch(e){return null;}}
    function raw(k){try{return localStorage.getItem(k);}catch(e){return null;}}
    var api={idb:can,
      ptr:ptr,
      /* the document as kept: from memory once read, else localStorage (a marker if it is in IndexedDB and not read yet) */
      get:function(k){if(Object.prototype.hasOwnProperty.call(cache,k))return cache[k];return raw(k);},
      pending:function(k){return !Object.prototype.hasOwnProperty.call(cache,k)&&!!ptr(raw(k));},
      ready:function(k){if(!api.pending(k))return Promise.resolve();if(!waits[k])waits[k]=get(k).then(function(v){if(v!=null&&!Object.prototype.hasOwnProperty.call(cache,k))cache[k]=v;delete waits[k];});return waits[k];},
      preload:function(keys){return Promise.all(keys.map(function(k){return api.ready(k);}));},
      /* true: kept in localStorage; 'idb': being written to IndexedDB (done(ok) says how it went); false: nowhere to keep it */
      set:function(k,v,done){var p=(typeof v==='string')?v:JSON.stringify(v);cache[k]=p;
        if(p.length<=SMALL){try{localStorage.setItem(k,p);if(can)del(k);if(done)done(true);return true;}catch(e){}}
        if(!can){if(done)done(false);return false;}
        try{localStorage.setItem(k,JSON.stringify({__tabIdb:1,len:p.length,ts:Date.now()}));}catch(e){}
        put(k,p).then(function(ok){if(done)done(!!ok);});return 'idb';}};
    return api;})();
  window.__tabStore=TS;
  """

LAYOUT = r"""/* R127-TABULA-THESIS · pages laid out by need (Inkwell 7.44's recipe): after an edit, from the paragraph before the
     first one edited to the first paragraph that stands where it stood, with the same page above it */
  function tabWords(){var kids=editor.children,t=[],i;for(i=0;i<kids.length;i++)t.push(kids[i].textContent||'');var text=t.join('\n');return {w:(text.trim().match(/\S+/g)||[]).length,c:text.replace(/\s/g,'').length};}
  function tabGuides(seps){var g=$('pageguides');if(!g)return;var top=editor.offsetTop,frag=document.createDocumentFragment(),i;g.innerHTML='';
    for(i=0;i<seps.length;i++){var y=top+seps[i];var sep=document.createElement('div');sep.className='pg-sep';sep.style.top=y+'px';frag.appendChild(sep);var lab=document.createElement('div');lab.className='pg-num';lab.style.top=y+'px';lab.textContent='Page '+(i+2);frag.appendChild(lab);}
    g.appendChild(frag);var n=seps.length+1;
    try{var paper=document.querySelector('[data-panel="write"] .paper');if(paper)paper.style.minHeight=(top+editor.scrollHeight+120)+'px';}catch(e){}
    var wc=tabWords();$('wcWords').textContent=wc.w+(wc.w===1?' word':' words');$('wcChars').textContent=wc.c+' characters';$('wcPages').textContent='Page 1 of '+n;}
  /* a long ripple of page breaks is laid out in slices of about 25 ms (as Inkwell checks a long document), and typing
     stops it at once: it starts again from the earliest paragraph not yet laid out, so the pages come out the same */
  var __job=null;
  function tabEarlier(a,b){if(!a||!a.isConnected)return b;if(!b||!b.isConnected)return a;return (a.compareDocumentPosition(b)&Node.DOCUMENT_POSITION_PRECEDING)?b:a;}
  function tabLater(a,b){if(!a||!a.isConnected)return b;if(!b||!b.isConnected)return a;return (a.compareDocumentPosition(b)&Node.DOCUMENT_POSITION_FOLLOWING)?b:a;}
  function layoutStop(){if(!__job)return;var at=__job.b,must=__job.must;__job=null;window.__tabLayoutBusy=false;
    if(at&&at.isConnected){var d=window.__tabDirty;if(d!=='all'){window.__tabDirty=tabEarlier(d,at);window.__tabDirtyLast=tabLater(tabLater(window.__tabDirtyLast,at),must);}}
    else window.__tabDirty='all';}
  window.__tabLayoutStop=layoutStop;
  function layout(from,last){
    if(!editor||!$('pageguides'))return;
    layoutStop();
    if(!from||!from.parentNode||from.parentNode!==editor||!window.__tabLaidOut)return layoutFull();
    var kids=editor.children,idx=Array.prototype.indexOf.call(kids,from);if(idx<0)return layoutFull();
    var r=idx>0?idx-1:0;if(kids[r].__pgS==null)return layoutFull();
    var must=(last&&last.isConnected&&last.parentNode===editor&&last!==from)?last:null;
    var job={b:kids[r],edit:from,must:must,pastEdit:false,pastMust:!must,past:false,pageStart:kids[r].__pgS,touched:0,t0:performance.now()};__job=job;window.__tabLayoutBusy=true;
    (function step(){if(__job!==job)return;var PAGE_GAP=100,PAGE_TOP=54,INNER=PAGE_H-PAGE_GAP,t=performance.now(),b=job.b,pageStart=job.pageStart;
      while(b){
        if(job.past&&b.__pgS===pageStart&&b.__pgY!=null&&b.offsetTop===b.__pgY){b=null;break;}
        if(b.hasAttribute&&b.hasAttribute('data-pgpush')){b.style.marginTop=b.getAttribute('data-pgpush');b.removeAttribute('data-pgpush');b.__pgPush=null;}
        else if(b.__pgPush!=null){b.style.marginTop=b.__pgPush;b.__pgPush=null;}
        b.__pgS=pageStart;b.__pgSep=null;job.touched++;
        var bTop=b.offsetTop,hgt=b.offsetHeight,bBot=bTop+hgt,limit=pageStart+INNER;
        if(hgt&&bBot>limit){
          if(hgt<=INNER&&bTop>pageStart){b.__pgPush=(b.style.marginTop||'');try{b.setAttribute('data-pgpush',b.__pgPush);}catch(e){}
            var cm=0;try{cm=parseFloat(getComputedStyle(b).marginTop)||0;}catch(e){}
            b.style.marginTop=(cm+(limit-bTop)+PAGE_GAP+PAGE_TOP)+'px';bTop=b.offsetTop;b.__pgSep=bTop-PAGE_TOP-(PAGE_GAP/2);pageStart=bTop;}
          else{var over=Math.max(1,Math.ceil((bBot-pageStart)/INNER));pageStart=pageStart+over*INNER;}}
        b.__pgY=bTop;if(b===job.edit)job.pastEdit=true;if(b===job.must)job.pastMust=true;job.past=job.pastEdit&&job.pastMust;b=b.nextElementSibling;
        if(b&&performance.now()-t>25){job.b=b;job.pageStart=pageStart;setTimeout(step,0);return;}}
      __job=null;window.__tabLayoutBusy=false;
      var kids2=editor.children,seps=[],i;for(i=0;i<kids2.length;i++){if(kids2[i].__pgSep!=null)seps.push(kids2[i].__pgSep);}
      window.__tabLayoutTouched=job.touched;window.__tabLayoutMs=Math.round(performance.now()-job.t0);tabGuides(seps);})();}
  function layoutFull(){layoutStop();"""


def patch(s):
    if MARK in s:
        return s
    if "R124-TABULA-KEEPS-EVERY-PART" not in s:
        raise SystemExit("apply tabula_patch.py first")

    def rep(a, b):
        nonlocal s
        n = s.count(a)
        if n != 1:
            raise SystemExit("tabula_big_patch: expected one, found %d: %r" % (n, a[:110]))
        s = s.replace(a, b)

    # 5. THE STORE, before Tabula's own load() and save()
    rep("function load(k,d){try{var v=localStorage.getItem(k);if(v!=null)return JSON.parse(v);}catch(e){}return (mem[k]!==undefined)?mem[k]:d;}",
        STORE + "function load(k,d){try{var v=(k==='tabula_docs')?TS.get(k):localStorage.getItem(k);if(v!=null&&!TS.ptr(v))return JSON.parse(v);}catch(e){}return (mem[k]!==undefined)?mem[k]:d;}")

    # 1 and 3. PAGES BY NEED; the old layout stays as the full one, and records where each paragraph stood
    rep("  function layout(){\n  var g=$('pageguides'); if(!g||!editor) return; g.innerHTML='';",
        "  " + LAYOUT + "\n  var g=$('pageguides'); if(!g||!editor) return; g.innerHTML='';")
    rep("    var bTop=b.offsetTop, hgt=b.offsetHeight, bBot=bTop+hgt, limit=pageStart+INNER;\n    if(!hgt) continue;",
        "    b.__pgS=pageStart; b.__pgSep=null; b.__pgCm=null; b.__pgExtra=null; b.__pgEff=null;\n    var bTop=b.offsetTop, hgt=b.offsetHeight, bBot=bTop+hgt, limit=pageStart+INNER;\n    if(!hgt){ b.__pgY=bTop; continue; }")
    rep("        b.style.marginTop=(cm+(limit-bTop)+PAGE_GAP+PAGE_TOP)+'px';\n        bTop=b.offsetTop;",
        "        var __b0=bTop; b.__pgCm=cm; b.__pgExtra=(limit-bTop)+PAGE_GAP+PAGE_TOP; b.style.marginTop=(cm+b.__pgExtra)+'px';\n        bTop=b.offsetTop; b.__pgEff=bTop-__b0;")
    rep("b.__pgEff=bTop-__b0;\n        seps.push(bTop-PAGE_TOP-(PAGE_GAP/2));\n        pageStart=bTop;",
        "b.__pgEff=bTop-__b0;\n        seps.push(bTop-PAGE_TOP-(PAGE_GAP/2)); b.__pgSep=bTop-PAGE_TOP-(PAGE_GAP/2);\n        pageStart=bTop;")
    rep("        pageStart=pageStart+over*INNER;\n      }\n    }\n  }",
        "        pageStart=pageStart+over*INNER;\n      }\n    }\n    b.__pgY=bTop;\n  }\n  window.__tabLaidOut=true; window.__tabLayoutTouched=kids.length;")
    rep("  var text=editor.innerText||'';\n  var words=(text.trim().match(/\\S+/g)||[]).length;\n  var chars=text.replace(/\\s/g,'').length;\n  $('wcWords').textContent=words+(words===1?' word':' words');\n  $('wcChars').textContent=chars+' characters';",
        "  var __wc=tabWords(), words=__wc.w, chars=__wc.c;\n  $('wcWords').textContent=words+(words===1?' word':' words');\n  $('wcChars').textContent=chars+' characters';")

    # 2. NOTHING LAID OUT WHEN A KEY IS LET GO; the edit's first paragraph is marked, and the pause lays out from it
    rep("  editor.addEventListener('keyup',function(){syncState();layout();});",
        "  editor.addEventListener('keyup',function(){syncState();});\n"
        "  (function(){function top(n){while(n&&n.parentNode!==editor)n=n.parentNode;return n||null;}\n"
        "    function mark(){try{if(window.__tabDirty==='all')return;var s=window.getSelection();if(!s||!s.rangeCount){window.__tabDirty='all';return;}var rg=s.getRangeAt(0),b=top(rg.startContainer),e2=top(rg.endContainer)||b;if(!b){window.__tabDirty='all';return;}var d=window.__tabDirty;if(!d||!d.isConnected||(b.compareDocumentPosition(d)&Node.DOCUMENT_POSITION_FOLLOWING))window.__tabDirty=b;var l=window.__tabDirtyLast;if(!l||!l.isConnected||(e2.compareDocumentPosition(l)&Node.DOCUMENT_POSITION_PRECEDING))window.__tabDirtyLast=e2;}catch(e){window.__tabDirty='all';}}\n"
        "    editor.addEventListener('beforeinput',function(){try{if(window.__tabLayoutStop)window.__tabLayoutStop();}catch(e){}mark();});editor.addEventListener('input',mark);editor.addEventListener('paste',function(){window.__tabDirty='all';});editor.addEventListener('drop',function(){window.__tabDirty='all';});})();")
    rep("    function runLayout(){pend=null;idle=null;try{renumberNotes();}catch(e){}try{layout();}catch(e){}}",
        "    function runLayout(){pend=null;idle=null;var d=window.__tabDirty,dl=window.__tabDirtyLast;window.__tabDirty=null;window.__tabDirtyLast=null;window.__tabNotesChanged=false;try{renumberNotes();}catch(e){}"
        "var __t0=(window.performance&&performance.now)?performance.now():0;try{if(d&&d!=='all'&&d.isConnected&&!window.__tabNotesChanged)layout(d,dl);else layout();}catch(e){}"
        "try{window.__tabLayoutMs=Math.round(performance.now()-__t0);}catch(e){}}")

    # 4. THE NOTES RENUMBERED ONLY WHEN THEY CHANGED
    rep("    var sig=Array.prototype.map.call(refs,function(r){return r.getAttribute('data-nid');}).join('|');box._noteSig=sig;",
        "    var sig=Array.prototype.map.call(refs,function(r){return r.getAttribute('data-nid');}).join('|');"
        "var bsig=box.children.length+':'+box.innerHTML.length;if(box._noteSig===sig&&box._noteBox===bsig&&box._noteN===refs.length)return;"
        "window.__tabNotesChanged=true;box._noteSig=sig;")
    rep("    box.style.display=box.querySelector('.fn[data-nid]')?'block':'none';\n  }",
        "    box.style.display=box.querySelector('.fn[data-nid]')?'block':'none';\n    box._noteBox=box.children.length+':'+box.innerHTML.length;box._noteN=refs.length;\n  }")

    # 5. FILE > SAVE: waits for the saved documents to be read, and keeps a long one in IndexedDB
    rep("var docs=load('tabula_docs',{});docs[name]={html:editor.innerHTML,aux:getAux(),when:new Date().toLocaleString()};",
        "if(TS.pending('tabula_docs')){var __nm=name;TS.ready('tabula_docs').then(function(){$('docTitle').value=__nm;saveDoc(false);});return;}"
        "var docs=load('tabula_docs',{});docs[name]={html:editor.innerHTML,aux:getAux(),when:new Date().toLocaleString()};")
    rep("    try{ localStorage.setItem('tabula_docs', JSON.stringify(docs)); }\n    catch(err){ ok=false; }",
        "    try{ if(TS.set('tabula_docs', JSON.stringify(docs), function(done){ if(!done){ try{ modal('This document could not be saved','<p style=\"font-size:13px;line-height:1.6;color:#5a616b\">There is no longer room to keep it inside Tabula. Nothing has been lost from the page in front of you, but it is not saved. <b>Save a copy to your device now.</b></p>'); }catch(e){} } })===false) ok=false; }\n    catch(err){ ok=false; }")
    rep("function renderDocs(){var docs=load('tabula_docs',{});",
        "function renderDocs(){if(TS.pending('tabula_docs')){var __c=$('docList');if(__c)__c.innerHTML='<div style=\"font-size:13px;color:#868d96;padding:8px 0\">Reading your documents\\u2026</div>';TS.ready('tabula_docs').then(renderDocs);return;}var docs=load('tabula_docs',{});")

    # the autosave block is a script of its own: it reaches the store through window.__tabStore (localStorage alone if absent)
    rep("var ed=document.getElementById('editor'); if(!ed) return;try{var _ub=",
        "var ed=document.getElementById('editor'); if(!ed) return;var TS=window.__tabStore||{idb:false,pending:function(){return false;},ready:function(){return Promise.resolve();},preload:function(){return Promise.resolve();},get:function(k){try{return localStorage.getItem(k);}catch(e){return null;}},ptr:function(){return null;},set:function(k,v,done){try{localStorage.setItem(k,v);if(done)done(true);return true;}catch(e){if(done)done(false);return false;}}};try{var _ub=")
    # 5. AUTOSAVE: a long document goes to IndexedDB, and it may grow far past four million characters there
    rep("if(h.length+axs.length>4000000){",
        "if(h.length+axs.length>(TS.idb?80000000:4000000)){")
    rep("try{localStorage.setItem('tabula_autosave'+__CDI,JSON.stringify({html:h,aux:ax,title:(ti&&ti.value)||'Untitled',ts:Date.now()}));window.__cdAsPrev=h;window.__cdAsPrevAux=axs;window.__cdAsQuota=false;cdSaveWarn('');}catch(qe){if(!window.__cdAsQuota){window.__cdAsQuota=true;cdSaveWarn('full');}}",
        "try{var __k=TS.set('tabula_autosave'+__CDI,JSON.stringify({html:h,aux:ax,title:(ti&&ti.value)||'Untitled',ts:Date.now()}),function(ok){if(ok){window.__cdAsQuota=false;cdSaveWarn('');}else if(!window.__cdAsQuota){window.__cdAsQuota=true;window.__cdAsPrev=null;cdSaveWarn('full');}});"
        "if(__k===false)throw new Error('full');window.__cdAsPrev=h;window.__cdAsPrevAux=axs;}catch(qe){if(!window.__cdAsQuota){window.__cdAsQuota=true;cdSaveWarn('full');}}")
    rep("window.cdShowRecent=function(){try{var a=null;try{a=JSON.parse(localStorage.getItem('tabula_autosave'+__CDI)||'null');}catch(e){}var docs={};try{docs=JSON.parse(localStorage.getItem('tabula_docs')||'{}')||{};}catch(e){}",
        "window.cdShowRecent=function(){if(TS.pending('tabula_autosave'+__CDI)||TS.pending('tabula_docs')){TS.preload(['tabula_autosave'+__CDI,'tabula_docs']).then(function(){window.cdShowRecent();});return;}"
        "try{var a=null;try{a=JSON.parse(TS.get('tabula_autosave'+__CDI)||'null');}catch(e){}var docs={};try{docs=JSON.parse(TS.get('tabula_docs')||'{}')||{};}catch(e){}")

    # 5. OPENING: an autosaved document kept in IndexedDB comes back when it has been read
    rep("window.__cdAsPrev=__as.html;try{renumberNotes();}catch(e){}try{layout();}catch(e){}}}catch(e){}\n  layout();",
        "window.__cdAsPrev=__as.html;try{renumberNotes();}catch(e){}try{layout();}catch(e){}}}catch(e){}\n"
        "  try{TS.preload(['tabula_docs']);if(!window.__cdHandled&&TS.pending('tabula_autosave'+__CDI)){TS.ready('tabula_autosave'+__CDI).then(function(){var v=null;try{v=JSON.parse(TS.get('tabula_autosave'+__CDI)||'null');}catch(e){}"
        "if(v&&v.html&&!window.__cdHandled&&!editor.textContent.trim()&&!editor.querySelector('img,table')){editor.innerHTML=v.html;if(v.aux)setAux(v.aux);restoreNoteSeq();window.__cdAsPrevAux=v.aux?JSON.stringify(v.aux):'';if(v.title&&$('docTitle'))$('docTitle').value=v.title;window.__cdAsPrev=v.html;try{renumberNotes();}catch(e){}try{layout();}catch(e){}}});}}catch(e){}\n"
        "  layout();")
    return s


if __name__ == "__main__":
    src, out = sys.argv[1], sys.argv[2]
    open(out, "w", encoding="utf-8").write(patch(open(src, encoding="utf-8").read()))
    print("written", out)
