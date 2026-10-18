"""R128 (18 October 2026): Tabula's paragraphs run on across pages, and a note no longer lays out the whole thesis
again, by Inkwell 7.45's recipe ("GAP1" and "CITE1").

The owner's words: "Inkwell's newer Tabula has improvements [...] Should I port them into the Tabula of Ingenium, the
Forge and Carpe Diem in the releases I am about to make?" "Yes, in these releases."

Inkwell's notes (INKWELL_HANDOFF_v7p45.txt) and what they mean for this Tabula, which is its own code (R127 carried
Inkwell's measured recipe into it, not Inkwell's code):

  GAP1. "A paragraph runs on to the next page as in Word, so a long paragraph no longer leaves a blank gap at the foot of a
  page. A style rule shapes each paragraph's lines around the page break; the document is never touched." Tabula moved a
  paragraph that did not fit to the next page whole, leaving the foot of the page blank, and a paragraph longer than a page
  ran on with no page break drawn at all. Now a paragraph of text that meets the foot of a page is cut there: an invisible
  float at its head (::before) carries a shape, a band from the page's last line to the next page's first, and the lines
  flow around it, so the paragraph's text and markup are not changed. Word's rule for widows and orphans is kept: at least
  two lines stay at the foot, and at least two go over; a paragraph that cannot keep it moves whole, as before. A heading,
  a list, a table, a paragraph with a picture, a drop capital or a float, text in columns, and line numbers keep the old
  way (each moves whole).

  CITE1. Placing a footnote took 3.5 s in Inkwell, then 0.3 s: "The page layout keeps every page whose text is unchanged,
  wherever it now begins [...] and a page whose text changed only in its figures is measured at its old fit." Here a
  footnote or endnote laid out every page of the document again (R127: "a note inserted lay out everything"), because
  renumbering may change the figures of every later note. Now renumbering writes only the figures that change, records the
  paragraphs they stand in, and the layout starts at the earliest edit and runs past the last paragraph whose height those
  figures changed, then stops where the pages stand as before (R127's layout by need). A note placed from the Insert menu
  goes the same way. Inkwell's other CITE1 items concern its own note syntax and its checker; Tabula has neither.

patch(text) returns the patched Tabula page; apply it after tabula_big_patch.py (R127). Usage on its own:
  python3 -I tabula_flow_patch.py tabula.html OUT.html   (tabula.html already carrying R124 and R127)
"""
import sys

MARK = "R128-TABULA-FLOW"

CSS = (".editor p{margin:0 0 12px;}\n"
       "  /* R128-TABULA-FLOW · the band a paragraph's lines flow around at a page break (the text itself is not changed) */\n"
       "  .editor:not(.linenums) > [data-pgcut]::before{content:\"\";float:left;width:100%;height:var(--pg-h,0px);shape-outside:var(--pg-shape,none);"
       "pointer-events:none;-webkit-user-select:none;user-select:none}")

FLOW = r"""/* R128-TABULA-FLOW · a paragraph runs on to the next page, as in Word (Inkwell 7.45's GAP1) */
  /* a block's top to the fraction of a pixel (offsetTop rounds), so a page's first line lands exactly where the page begins,
     and what stands before it can no longer move what follows by a fraction (the layout by need then stops where a full
     layout would, and both make the same pages) */
  /* the page's scale is Tabula's own zoom, exactly: a scale read from a rounded height drifts by a fraction of a pixel per thousand */
  function tabK(){return (typeof zoom==='number'&&zoom>0&&isFinite(zoom))?zoom:1;}
  function tabTop(b){var er=editor.getBoundingClientRect(),br=b.getBoundingClientRect(),k=tabK();return (br.top-er.top)/k-(editor.clientTop||0);}
  function tabLand(b,cm,target){var m=cm+(target-tabTop(b));b.style.marginTop=m.toFixed(3)+'px';var r=target-tabTop(b);if(Math.abs(r)>0.01){m+=r;b.style.marginTop=m.toFixed(3)+'px';}return m;}
  function tabCutClear(b){if(b.__pgCut||(b.hasAttribute&&b.hasAttribute('data-pgcut'))){try{b.removeAttribute('data-pgcut');b.style.removeProperty('--pg-h');b.style.removeProperty('--pg-shape');if(!b.getAttribute('style'))b.removeAttribute('style');}catch(e){}b.__pgCut=null;}b.__pgSeps=null;}
  function tabCanCut(b){try{if(editor.classList.contains('linenums')||(editor.style.columnCount&&editor.style.columnCount!=='1'))return false;var t=b.tagName;if(t!=='P'&&t!=='DIV'&&t!=='BLOCKQUOTE')return false;if(b.classList.contains('pagebreak'))return false;
    if(b.querySelector('.dropcap,img,table,figure,svg,canvas,iframe,video,ul,ol,h1,h2,h3,h4,h5,h6,.pagebreak,[style*="float"]'))return false;return true;}catch(e){return false;}}
  /* the paragraph's lines, from its own rectangles: each line's top and the height of its body text (a raised note figure is smaller) */
  function tabLines(b){var rg=document.createRange();rg.selectNodeContents(b);var rs=rg.getClientRects(),br=b.getBoundingClientRect(),k=tabK(),arr=[],out=[],i;
    for(i=0;i<rs.length;i++){var r=rs[i];if(r.height>=2&&r.width>=0.5)arr.push({t:(r.top-br.top)/k,b:(r.bottom-br.top)/k,h:r.height/k});}
    arr.sort(function(x,y){return x.t-y.t;});
    for(i=0;i<arr.length;i++){var a=arr[i],l=out[out.length-1];if(l&&a.t<l.b-3){if(a.h>l.h+0.5){l.t=a.t;l.h=a.h;}l.b=Math.max(l.b,a.b);}else out.push({t:a.t,b:a.b,h:a.h});}
    return out;}
  /* cuts the paragraph at each page foot it meets: returns the page it ends on and its page breaks, or null to move it whole */
  function tabCut(b,bTop,pageStart,INNER,GAP,TOP){
    var L=tabLines(b),n=L.length;if(n<4)return null;
    var cs=null;try{cs=getComputedStyle(b);}catch(e){}var lh=cs?parseFloat(cs.lineHeight):NaN,off=cs?((parseFloat(cs.borderTopWidth)||0)+(parseFloat(cs.paddingTop)||0)):0;
    function hl(i){return isFinite(lh)?Math.max(0,(lh-L[i].h)/2):0;}
    var bands=[],seps=[],shift=0,ps=pageStart,k0=0,guard=0,h0=b.offsetHeight;
    while(guard++<400){
      var limit=ps+INNER,k=-1,i;
      for(i=k0;i<n;i++){if(bTop+L[i].b+hl(i)+shift>limit){k=i;break;}}
      if(k<0)break;
      if(n-k<2)k=n-2;
      /* two lines stay and two go over; a paragraph that fits a page moves whole instead (as before), and one longer
         than a page that cannot leave two lines at this foot begins on the next page and is cut from there */
      if(k-k0<2){if(bands.length)k=k0+1;else if(h0<=INNER)return null;else k=0;}
      if(bands.length&&k<=k0)return null;
      var A=L[k].t-hl(k)+shift-off,target=limit+GAP+TOP,B=target-tabTop(b)-off;
      if(!(B>A+1))return null;
      bands.push([A+1,B]);seps.push(target-TOP-(GAP/2));shift+=B-A;ps=target;k0=k;
    }
    if(!bands.length)return null;
    var pts=[];bands.forEach(function(q){pts.push('0px '+q[0].toFixed(3)+'px','100% '+q[0].toFixed(3)+'px','100% '+q[1].toFixed(3)+'px','0px '+q[1].toFixed(3)+'px');});
    try{b.setAttribute('data-pgcut',String(bands.length));b.style.setProperty('--pg-h',bands[bands.length-1][1].toFixed(3)+'px');b.style.setProperty('--pg-shape','polygon('+pts.join(',')+')');}catch(e){return null;}
    /* a browser that cannot shape the lines (no CSS Shapes) gets the old way: the paragraph moves whole */
    if(Math.abs(b.offsetHeight-(h0+shift))>3*bands.length+2){tabCutClear(b);return null;}
    b.__pgCut=bands;return {pageStart:ps,seps:seps};}
  /* CITE1: the paragraphs whose note figures changed, so the layout runs past them and no further than it must */
  window.__tabNoteParas=window.__tabNoteParas||[];
  function tabNoteMoved(r){var n=r;while(n&&n.parentNode!==editor)n=n.parentNode;if(n)(window.__tabNoteParas=window.__tabNoteParas||[]).push(n);}
  """


def patch(s):
    if MARK in s:
        return s
    if "R127-TABULA-THESIS" not in s:
        raise SystemExit("apply tabula_big_patch.py (R127) first")

    def rep(a, b, count=1):
        nonlocal s
        n = s.count(a)
        if n != count:
            raise SystemExit("tabula_flow_patch: expected %d, found %d: %r" % (count, n, a[:110]))
        s = s.replace(a, b)

    # the band's style rule
    rep(".editor p{margin:0 0 12px;}", CSS)
    # the helpers, before R127's layout by need
    rep("  /* R127-TABULA-THESIS · pages laid out by need (Inkwell 7.44's recipe)", "  " + FLOW + "/* R127-TABULA-THESIS · pages laid out by need (Inkwell 7.44's recipe)")

    # THE LAYOUT BY NEED: clears a paragraph's cut with its push, cuts a paragraph of text at the page foot, and keeps every break
    rep("        else if(b.__pgPush!=null){b.style.marginTop=b.__pgPush;b.__pgPush=null;}\n        b.__pgS=pageStart;b.__pgSep=null;job.touched++;",
        "        else if(b.__pgPush!=null){b.style.marginTop=b.__pgPush;b.__pgPush=null;}\n        tabCutClear(b);b.__pgS=pageStart;b.__pgSep=null;job.touched++;")
    rep("        if(hgt&&bBot>limit){\n          if(hgt<=INNER&&bTop>pageStart){",
        "        var __cut=(hgt&&bBot>limit&&tabCanCut(b))?tabCut(b,bTop,pageStart,INNER,PAGE_GAP,PAGE_TOP):null;\n"
        "        if(__cut){pageStart=__cut.pageStart;b.__pgSeps=__cut.seps;}\n"
        "        else if(hgt&&bBot>limit){\n          if(hgt<=INNER&&bTop>pageStart){")
    rep("b.style.marginTop=(cm+(limit-bTop)+PAGE_GAP+PAGE_TOP)+'px';bTop=b.offsetTop;b.__pgSep=bTop-PAGE_TOP-(PAGE_GAP/2);pageStart=bTop;}",
        "var __tg=limit+PAGE_GAP+PAGE_TOP;tabLand(b,cm,__tg);bTop=b.offsetTop;b.__pgSep=__tg-PAGE_TOP-(PAGE_GAP/2);pageStart=__tg;}")
    rep("        b.__pgY=bTop;if(b===job.edit)job.pastEdit=true;",
        "        b.__pgY=bTop;b.__pgH=b.offsetHeight;b.__pgYf=tabTop(b);b.__pgHf=b.getBoundingClientRect().height/tabK();if(b===job.edit)job.pastEdit=true;")
    rep("        if(job.past&&b.__pgS===pageStart&&b.__pgY!=null&&b.offsetTop===b.__pgY){b=null;break;}",
        "        if(job.past&&b.__pgS===pageStart&&b.__pgYf!=null&&Math.abs(tabTop(b)-b.__pgYf)<0.02){b=null;break;}")
    rep("      var kids2=editor.children,seps=[],i;for(i=0;i<kids2.length;i++){if(kids2[i].__pgSep!=null)seps.push(kids2[i].__pgSep);}",
        "      var kids2=editor.children,seps=[],i;for(i=0;i<kids2.length;i++){var __q=kids2[i];if(__q.__pgSeps)seps.push.apply(seps,__q.__pgSeps);else if(__q.__pgSep!=null)seps.push(__q.__pgSep);}")

    # THE FULL LAYOUT: the same
    rep("for(i=0;i<kids.length;i++){ b=kids[i]; if(b.hasAttribute&&b.hasAttribute('data-pgpush')){",
        "for(i=0;i<kids.length;i++){ b=kids[i]; tabCutClear(b); if(b.hasAttribute&&b.hasAttribute('data-pgpush')){")
    rep("    if(!hgt){ b.__pgY=bTop; continue; }\n    if(bBot>limit){\n      if(hgt<=INNER && bTop>pageStart){",
        "    if(!hgt){ b.__pgY=bTop; b.__pgH=0; b.__pgHf=0; b.__pgYf=tabTop(b); continue; }\n"
        "    var __cut=(bBot>limit&&tabCanCut(b))?tabCut(b,bTop,pageStart,INNER,PAGE_GAP,PAGE_TOP):null;\n"
        "    if(__cut){ pageStart=__cut.pageStart; b.__pgSeps=__cut.seps; seps.push.apply(seps,__cut.seps); }\n"
        "    else if(bBot>limit){\n      if(hgt<=INNER && bTop>pageStart){")
    rep("        var __b0=bTop; b.__pgCm=cm; b.__pgExtra=(limit-bTop)+PAGE_GAP+PAGE_TOP; b.style.marginTop=(cm+b.__pgExtra)+'px';\n        bTop=b.offsetTop; b.__pgEff=bTop-__b0;\n        seps.push(bTop-PAGE_TOP-(PAGE_GAP/2)); b.__pgSep=bTop-PAGE_TOP-(PAGE_GAP/2);\n        pageStart=bTop;",
        "        var __b0=bTop, __tg=limit+PAGE_GAP+PAGE_TOP; b.__pgCm=cm; b.__pgExtra=tabLand(b,cm,__tg)-cm;\n        bTop=b.offsetTop; b.__pgEff=bTop-__b0;\n        seps.push(__tg-PAGE_TOP-(PAGE_GAP/2)); b.__pgSep=__tg-PAGE_TOP-(PAGE_GAP/2);\n        pageStart=__tg;")
    rep("        pageStart=pageStart+over*INNER;\n      }\n    }\n    b.__pgY=bTop;\n  }\n  window.__tabLaidOut=true;",
        "        pageStart=pageStart+over*INNER;\n      }\n    }\n    b.__pgY=bTop; b.__pgH=b.offsetHeight; b.__pgYf=tabTop(b); b.__pgHf=b.getBoundingClientRect().height/tabK();\n  }\n  window.__tabLaidOut=true;")

    # CITE1: renumbering writes only the figures that change, and records where they stand
    rep("    Array.prototype.forEach.call(refs,function(r,i){var n=prefix+(i+1);r.textContent=n;valid[r.getAttribute('data-nid')]=n;});",
        "    Array.prototype.forEach.call(refs,function(r,i){var n=prefix+(i+1);if(r.textContent!==n){r.textContent=n;tabNoteMoved(r);}valid[r.getAttribute('data-nid')]=n;});")
    # a note placed from the Insert menu is laid out from its paragraph, past the figures it moved
    rep("try{var s2=window.getSelection();var r3=document.createRange();r3.setStartAfter(sp);r3.collapse(true);s2.removeAllRanges();s2.addRange(r3);}catch(e){}}",
        "try{var s2=window.getSelection();var r3=document.createRange();r3.setStartAfter(sp);r3.collapse(true);s2.removeAllRanges();s2.addRange(r3);}catch(e){}"
        "try{tabNoteMoved(sp);var __p=window.__tabNoteParas[window.__tabNoteParas.length-1];if(__p){var __d=window.__tabDirty;if(__d!=='all')window.__tabDirty=(__d&&__d.isConnected)?tabEarlier(__d,__p):__p;}}catch(e){}return sp;}")
    rep("d.innerHTML='<sup></sup> '+html;fnBox.appendChild(d);renumberNotes();layout();}",
        "d.innerHTML='<sup></sup> '+html;fnBox.appendChild(d);if(window.cdLayoutNow&&window.__tabLaidOut)window.cdLayoutNow();else{renumberNotes();layout();}}")
    rep("d.innerHTML='<sup></sup> '+E(t);enBox.appendChild(d);renumberNotes();layout();editor.focus();",
        "d.innerHTML='<sup></sup> '+E(t);enBox.appendChild(d);if(window.cdLayoutNow&&window.__tabLaidOut)window.cdLayoutNow();else{renumberNotes();layout();}editor.focus();")
    # the pause: a change of notes lays out from the edit past the paragraphs whose height the new figures changed
    rep("try{if(d&&d!=='all'&&d.isConnected&&!window.__tabNotesChanged)layout(d,dl);else layout();}catch(e){}",
        "try{var __np=window.__tabNoteParas||[];window.__tabNoteParas=[];"
        "if(window.__tabNotesChanged&&d!=='all'){var __f=null,__l=null;for(var __i=0;__i<__np.length;__i++){var __q=__np[__i];if(!__q||!__q.isConnected||__q.parentNode!==editor)continue;if(__q.__pgHf==null||Math.abs(__q.getBoundingClientRect().height/tabK()-__q.__pgHf)>0.02){__f=tabEarlier(__f,__q);__l=tabLater(__l,__q);}}"
        "if(__f){d=(d&&d.isConnected)?tabEarlier(d,__f):__f;dl=tabLater((dl&&dl.isConnected)?dl:null,__l);}window.__tabNoteRelaid=__f?1:0;"
        "if(d&&d.isConnected)layout(d,dl);else layout();}"
        "else if(d&&d!=='all'&&d.isConnected)layout(d,dl);else layout();}catch(e){}")
    return s


if __name__ == "__main__":
    src, out = sys.argv[1], sys.argv[2]
    open(out, "w", encoding="utf-8").write(patch(open(src, encoding="utf-8").read()))
    print("written", out)
