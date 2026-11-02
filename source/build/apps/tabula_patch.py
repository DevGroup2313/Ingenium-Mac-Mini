"""R124 (18 October 2026): Tabula keeps every part of a document when it saves itself or moves between windows.

Measured in Chromium on Ingenium 5.0's page: Tabula's autosave, and its hand-over when it moves to another window
(Carpe Diem's and Ingenium's floating windows and windows of their own), carried only the main text. The footnotes,
endnotes, bibliography, header, footer and contents (the parts File > Save always kept) were left behind, so a page
restored after a crash, or moved into a floating window, kept its note numbers and lost the notes themselves. Autosave
also stopped without a word once a document grew past four million characters or the device's storage was full (a line
only a developer would see). This patch carries every part everywhere, and says plainly, on the page, when autosave
cannot keep a document and how to keep a copy. Two faults found on the way are mended too: a header or footer came back
hidden (and so was left out of exports) even when it had been shown, and a page restored before Tabula's sections had
started lost its header and footer to the empty sections they started with.

patch(text) returns the patched Tabula page. Ingenium's build, Carpe Diem's pass 1053 and the Forge's pass 632 use it.
Usage on its own:  python3 -I tabula_patch.py tabula.html OUT.html
"""
import sys

MARK = "R124-TABULA-KEEPS-EVERY-PART"


def patch(s):
    if MARK in s:
        return s
    edits = [
        # the parts the Documents tab keeps, reachable by the autosave and the hand-over
        ("var AUX_IDS=['docheader','toc','footnotes','biblio','endnotes','docfooter'];",
         "var AUX_IDS=['docheader','toc','footnotes','biblio','endnotes','docfooter'];"
         "/* " + MARK + " */window.__tabulaAuxGet=function(){return getAux();};"
         "window.__tabulaAuxSet=function(a){setAux(a||null);try{restoreNoteSeq();}catch(e){}try{renumberNotes();}catch(e){}try{layout();}catch(e){}};"),
        # a header and footer come back as they were, shown or not, and the sections they belong to wait for the part of
        # Tabula that keeps sections when a page is restored before that part has started
        ("if(id==='docheader'||id==='docfooter'){n.innerHTML=a?(a.h||''):'';}",
         "if(id==='docheader'||id==='docfooter'){n.innerHTML=a?(a.h||''):'';n.style.display=(a&&a.show)?'block':'none';}"),
        ("try{if(window.__cdSectionsApply)window.__cdSectionsApply(aux.sections);}catch(e){}",
         "try{if(window.__cdSectionsApply)window.__cdSectionsApply(aux.sections);else window.__cdSectionsPending=aux.sections||null;}catch(e){}"),
        ("window.__cdSectionsApply=function(v){window.__cdSections=(v&&v.length)?JSON.parse(JSON.stringify(v)):[{h:'',f:'',link:false}];sectStore();hfRefresh();};",
         "window.__cdSectionsApply=function(v){window.__cdSections=(v&&v.length)?JSON.parse(JSON.stringify(v)):[{h:'',f:'',link:false}];sectStore();hfRefresh();};"
         "if(window.__cdSectionsPending){var __sp=window.__cdSectionsPending;window.__cdSectionsPending=null;try{window.__cdSectionsApply(__sp);}catch(e){}}"),
        # a page handed over by another window brings its notes with it
        ("if(__ho.html){editor.innerHTML=__ho.html;restoreNoteSeq();",
         "if(__ho.html){editor.innerHTML=__ho.html;if(__ho.aux)setAux(__ho.aux);restoreNoteSeq();"),
        # the autosaved page, restored at start, brings its notes with it
        ("editor.innerHTML=__as.html;restoreNoteSeq();",
         "editor.innerHTML=__as.html;if(__as.aux)setAux(__as.aux);restoreNoteSeq();window.__cdAsPrevAux=__as.aux?JSON.stringify(__as.aux):'';"),
        # the autosave: every part, saved when any part changes, and never a silent stop
        ("function cdAutosave(){try{var h=ed.innerHTML;if(h===window.__cdAsPrev)return;",
         "function cdAutosave(){try{var h=ed.innerHTML,ax=null,axs='';try{if(window.__tabulaAuxGet){ax=window.__tabulaAuxGet();axs=JSON.stringify(ax);}}catch(e){}"
         "if(h===window.__cdAsPrev&&axs===(window.__cdAsPrevAux||''))return;"),
        ("if(h.length>4000000){if(!window.__cdAsBig){window.__cdAsBig=true;try{console.warn('Tabula autosave paused: document too large for local storage. Use File > Save.');}catch(e2){}}return;}window.__cdAsBig=false;",
         "if(h.length+axs.length>4000000){if(!window.__cdAsBig){window.__cdAsBig=true;cdSaveWarn('big');}return;}window.__cdAsBig=false;"),
        ("localStorage.setItem('tabula_autosave'+__CDI,JSON.stringify({html:h,title:(ti&&ti.value)||'Untitled',ts:Date.now()}));window.__cdAsPrev=h;}catch(qe){if(!window.__cdAsQuota){window.__cdAsQuota=true;try{console.warn('Tabula autosave could not write: storage is full. Existing autosave kept.');}catch(e3){}}}}catch(e){}}",
         "localStorage.setItem('tabula_autosave'+__CDI,JSON.stringify({html:h,aux:ax,title:(ti&&ti.value)||'Untitled',ts:Date.now()}));window.__cdAsPrev=h;window.__cdAsPrevAux=axs;window.__cdAsQuota=false;cdSaveWarn('');}catch(qe){if(!window.__cdAsQuota){window.__cdAsQuota=true;cdSaveWarn('full');}}}catch(e){}}"
         "function cdSaveWarn(kind){try{var bar=document.getElementById('cdSaveWarn');if(!kind){if(bar)bar.remove();return;}"
         "if(!bar){bar=document.createElement('div');bar.id='cdSaveWarn';bar.setAttribute('role','alert');"
         "bar.style.cssText='position:fixed;left:50%;bottom:16px;transform:translateX(-50%);z-index:2147483000;max-width:min(640px,calc(100vw - 24px));box-sizing:border-box;padding:12px 14px;border-radius:12px;background:#fff6f2;border:1px solid #c9826e;color:#5b2416;font:13px/1.5 Georgia,serif;box-shadow:0 10px 28px rgba(60,20,10,.22)';"
         "document.body.appendChild(bar);}"
         "var why=kind==='big'?'This document has grown larger than the room this device gives Tabula for autosaving.':'This device has no room left for Tabula to autosave.';"
         "bar.innerHTML='<b>Autosave cannot keep this document here.</b> '+why+' Nothing on the page is lost. Keep a copy on your device now, and keep saving copies as you write. '"
         "+'<span style=\"display:inline-flex;gap:8px;margin-top:8px\"><button type=\"button\" data-w=\"docx\" style=\"font:600 12.5px Georgia,serif;padding:6px 12px;border-radius:9px;border:1px solid #8a3a2f;background:#8a3a2f;color:#fff;cursor:pointer\">Save as .docx</button>'"
         "+'<button type=\"button\" data-w=\"pdf\" style=\"font:600 12.5px Georgia,serif;padding:6px 12px;border-radius:9px;border:1px solid #c9826e;background:#fff;color:#5b2416;cursor:pointer\">Save as PDF</button>'"
         "+'<button type=\"button\" data-w=\"x\" aria-label=\"Close this message\" style=\"font:600 12.5px Georgia,serif;padding:6px 10px;border-radius:9px;border:1px solid #e3c2b8;background:transparent;color:#5b2416;cursor:pointer\">Close</button></span>';"
         "Array.prototype.forEach.call(bar.querySelectorAll('[data-w]'),function(b){b.onclick=function(){var w=b.getAttribute('data-w');if(w==='docx'){try{window.cdSaveDocx();}catch(e){}}else if(w==='pdf'){try{window.cdSavePdf();}catch(e){}}else bar.remove();};});}catch(e){}}"),
        # edits in the notes, the header and the footer are autosaved too
        ("try{ed.addEventListener('input',function(){clearTimeout(__asT);__asT=setTimeout(cdAutosave,1200);});setInterval(cdAutosave,20000);}catch(e){}",
         "try{ed.addEventListener('input',function(){clearTimeout(__asT);__asT=setTimeout(cdAutosave,1200);});setInterval(cdAutosave,20000);"
         "['docheader','docfooter','footnotes','endnotes','biblio','toc'].forEach(function(id){var n=document.getElementById(id);if(n)n.addEventListener('input',function(){clearTimeout(__asT);__asT=setTimeout(cdAutosave,1200);});});}catch(e){}"),
        # what another window takes with it when this one lets the page go
        ("window.__tabulaCapture=function(){try{var ti=document.querySelector('.titlebar input');return {html:ed.innerHTML,title:(ti&&ti.value)||'Untitled'};}catch(e){return null;}};",
         "window.__tabulaCapture=function(){try{var ti=document.querySelector('.titlebar input'),ax=null;try{if(window.__tabulaAuxGet)ax=window.__tabulaAuxGet();}catch(e){}return {html:ed.innerHTML,aux:ax,title:(ti&&ti.value)||'Untitled'};}catch(e){return null;}};"),
        # Recent documents reopens a page with its notes
        ("return {t:d.title||k,ts:d.ts||d.savedAt||0,html:d.html||''};",
         "return {t:d.title||k,ts:d.ts||d.savedAt||0,html:d.html||'',aux:d.aux||null};"),
        ("if(src&&src.html){ed.innerHTML=src.html;}try{cdCloseModal();}catch(e){}",
         "if(src&&src.html){ed.innerHTML=src.html;try{if(window.__tabulaAuxSet)window.__tabulaAuxSet(src.aux||null);}catch(e){}}try{cdCloseModal();}catch(e){}"),
    ]
    for a, b in edits:
        n = s.count(a)
        if n != 1:
            raise SystemExit("tabula_patch: expected one, found %d: %r" % (n, a[:100]))
        s = s.replace(a, b)
    return s


if __name__ == "__main__":
    t = open(sys.argv[1], encoding="utf-8").read()
    open(sys.argv[2], "w", encoding="utf-8").write(patch(t))
    print("patched", sys.argv[2])
