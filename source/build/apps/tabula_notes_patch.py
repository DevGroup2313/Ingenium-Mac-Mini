"""R130 (18 October 2026): Tabula's footnotes as Word sets them, by Inkwell 7.48's recipe: each page's notes at its foot,
a note written where it stands, the numbers set as Word sets them, real footnotes in Word files, and notes that travel
through copy and paste.

The owner's words: "Inkwell's newest build is 7pv48, please update the Forge and Ingenium. I also want you to apply the
new footnotes addition to all of the other Tabula to keep full parity across Tabula."

Inkwell's notes for 7.48 (INKWELL_HANDOFF_v7p48.txt), on its Tabula: "The notes stay in #footnotes (saved, sent,
exported; shown at the end in print), hidden on the screen, and each page shows its notes at its foot (#cd-fnpages,
fnPrep, fnDraw): the pagination leaves their room (a line that cites a note goes on with it); a note is written where it
stands; Insert footnote takes the pen to the foot (no more prompt box); the number in the text is set as Word sets it, in
the text's colour, without opening its line." And: "Tabula's Save as .docx (cdBuildDocx) wrote each number as a plain
digit and left the notes out; it now writes footnotes and endnotes as Word's own, with their italics [...]. The other
writer (buildDocx, the ribbon's Save .docx) keeps note formatting and names the separators in settings.xml." And the
clipboard (INKFNCLIP): "A selection with notes is copied with them: HTML in Word's own footnote form [...]. A paste reads
notes from that form, from LibreOffice (sdfootnote), from Google Docs (ftnt) and from any page whose reference and note
link to each other."

This Tabula and Inkwell's grew from one page, so most of 7.48 goes in as Inkwell wrote it (COPIED below, each change
found once, or the patch stops). Two parts are this Tabula's own:

  1. The pages. This Tabula lays its pages out by R127 (by need, from the edit, stopping where the pages stand as before)
     and R128 (a paragraph runs on across a page foot); Inkwell's pagination is its own. Here each page keeps the room of
     its notes in both layouts: a block's notes are counted with it (a short rule, then each note); a block moved to the
     next page takes its notes with it; a paragraph cut at a page foot keeps each line with the notes it cites (a line
     goes over when it and its notes no longer fit). Each block records the notes' room already used on its page when it
     began (__pgNH) and the notes it placed (__fnPl), so the layout by need starts with the right room and stops only
     where both the place and the room match, and its pages are a full layout's pages.
  2. The cost. A note's height is measured once and kept by its text (a thesis's notes are not measured again at every
     keystroke); editing a note lays out from the paragraph that cites it, not the whole document; and the pen is taken to
     a new note once its page is drawn, however long the layout takes.

Left as in Inkwell 7.48: endnotes stay at the end and still ask for their text in a box; a note longer than the room left
moves its line on, and is not continued on the next page as Word would; find does not show hits inside the page-foot
notes. Inkwell's autosave change is not needed here: since R124 this Tabula's autosave keeps #footnotes with the text.

patch(text) returns the patched Tabula page; apply it after tabula_look_patch.py (R129). Usage on its own:
  python3 -I tabula_notes_patch.py tabula.html OUT.html
"""
import os
import sys

MARK = "R130-TABULA-FOOTNOTES"
HERE = os.path.dirname(os.path.abspath(__file__))

COPIED = [
    # Inkwell 7.48 (its Tabula's line 155): the note's number as Word sets it
    ('  .editor sup.fn-ref{color:var(--blue);font-weight:600;}',
     "  /* 7.48: a note's number as Word sets it: in the text's own colour and\n     weight, small and raised, without opening its line wider */\n  .editor sup.fn-ref{color:inherit;font-weight:inherit;font-size:.68em;line-height:1;vertical-align:baseline;position:relative;top:-.52em;}"),
    # Inkwell 7.48 (its Tabula's line 175): the page-foot notes, and #footnotes hidden on the screen (shown at the end in print)
    ('  #footnotes .h,#biblio .h{font-size:11px;letter-spacing:.05em;text-transform:uppercase;color:var(--ink-3);margin-bottom:8px;}\n',
     "  #footnotes .h,#biblio .h{font-size:11px;letter-spacing:.05em;text-transform:uppercase;color:var(--ink-3);margin-bottom:8px;}\n  #cd-fnpages{position:absolute;left:0;top:0;width:0;height:0;z-index:3;pointer-events:none;}\n  html.cd-dark .editor sup.fn-ref{color:inherit;}\n  .cd-fnpage{position:absolute;pointer-events:auto;font-family:'Times New Roman',Times,serif;font-size:13.3px;line-height:1.35;color:var(--ink);text-align:left;padding-top:12px;box-sizing:border-box;}\n  .cd-fnprobe{visibility:hidden;pointer-events:none;}\n  .cd-fnrule{width:33%;max-width:2in;border-top:1px solid currentColor;opacity:.6;margin:0 0 4px;}\n  .cd-fnp{padding:0 0 1px;}\n  .cd-fnpn{font-size:.72em;line-height:1;position:relative;top:-.5em;vertical-align:baseline;margin-right:.28em;cursor:pointer;}\n  .cd-fnpt{outline:none;border-radius:2px;}\n  .cd-fnpt:focus{box-shadow:0 0 0 2px rgba(27,107,147,.28);background:rgba(27,107,147,.06);}\n  .cd-fnpt:empty::after{content:'Type the note';color:var(--ink-3);}\n  #footnotes.cd-fn-atfoot{position:absolute !important;visibility:hidden !important;height:0 !important;overflow:hidden !important;margin:0 !important;padding:0 !important;border:0 !important;pointer-events:none !important;}\n  @media print{#cd-fnpages{display:none !important;}#footnotes.cd-fn-atfoot{position:static !important;visibility:visible !important;height:auto !important;overflow:visible !important;margin-top:24px !important;padding-top:12px !important;border-top:1px solid #999 !important;}}\n"),
    # Inkwell 7.48 (its Tabula's line 536): Insert footnote: the number at the pen, the pen at the foot (no prompt box)
    ("  $('insFoot').addEventListener('click',function(){var t=prompt('Footnote text');if(t===null)return;addFootnote(escapeHtml(t));});",
     "  $('insFoot').addEventListener('click',function(){cdInsertFootnote();});"),
    # Inkwell 7.48 (its Tabula's line 790): a click on a number in the text opens its note at the foot
    ('[data-nid="\'+nid+\'"]\');if(!entry)return;ev.preventDefault();entry.scrollIntoView',
     '[data-nid="\'+nid+\'"]\');if(!entry)return;ev.preventDefault();if(kind===\'foot\'&&window.cdFnFocus&&window.cdFnFocus(nid,true))return;entry.scrollIntoView'),
    # Inkwell 7.48 (its Tabula's line 809): a paste that brings notes (Word, LibreOffice, Google Docs, Inkwell, Tabula) makes them Tabula's own
    ("d('insertText',false,text);layout();return;}if(html&&window.cdPasteDecide&&windo",
     "d('insertText',false,text);layout();return;}if(html&&window.INKFNCLIP){var __P=null;try{__P=INKFNCLIP.parse(html);}catch(_){}if(__P&&__P.notes.length&&cdPasteNotes(__P,cleanHTML))return;}if(html&&window.cdPasteDecide&&windo"),
    # Inkwell 7.48 (its Tabula's line 3668): Save as .docx: a note's number is Word's own footnote or endnote reference
    ("      if(t.nodeType===1){ if(t.nodeName==='BR')toks.push({br:t}); continue; }",
     "      if(t.nodeType===1){ if(t.nodeName==='BR')toks.push({br:t});\n        /* 7.48: a note's number is Word's own footnote (or endnote)\n           reference; until now it went into Word as a plain figure and the\n           notes were left out */\n        else if(t.nodeName==='SUP'&&t.classList&&t.classList.contains('fn-ref')&&t.getAttribute('data-note'))toks.push({fn:t});\n        continue; }\n      if(t.parentNode&&t.parentNode.closest&&t.parentNode.closest('sup.fn-ref'))continue;"),
    # Inkwell 7.48 (its Tabula's line 3677): (the same)
    ('      if(tk.br){var bt=tk.br.getAttribute(\'data-w-brtype\')||\'\';runs+=\'<w:r><w:br\'+(bt?\' w:type="\'+bt+\'"\':\'\')+\'/></w:r>\';return;}\n',
     '      if(tk.br){var bt=tk.br.getAttribute(\'data-w-brtype\')||\'\';runs+=\'<w:r><w:br\'+(bt?\' w:type="\'+bt+\'"\':\'\')+\'/></w:r>\';return;}\n      if(tk.fn){runs+=noteRefXml(tk.fn);return;}\n'),
    # Inkwell 7.48 (its Tabula's line 3683): (the same): the notes parts
    ('\n  function sectPr(idx,kind){',
     '\n  /* the notes met while the body is written: foot and end, in order */\n  var FNC={foot:[],end:[]};\n  function noteRefXml(ref){\n    var kind=ref.getAttribute(\'data-note\')===\'end\'?\'end\':\'foot\',nid=ref.getAttribute(\'data-nid\');\n    var box=document.getElementById(kind===\'end\'?\'endnotes\':\'footnotes\'),en=box&&nid?box.querySelector(\'.fn[data-nid="\'+nid+\'"]\'):null;\n    if(!en)return \'<w:r><w:rPr><w:vertAlign w:val="superscript"/></w:rPr><w:t>\'+esc(ref.textContent)+\'</w:t></w:r>\';\n    var cl=en.cloneNode(true),sp=cl.querySelector(\'sup\');if(sp&&sp===cl.firstElementChild)sp.remove();\n    var runs=\'\',w=document.createTreeWalker(cl,NodeFilter.SHOW_TEXT,null),n,first=true;\n    while((n=w.nextNode())){if(first){n.nodeValue=n.nodeValue.replace(/^\\s+/,\'\');if(!n.nodeValue)continue;first=false;}runs+=runXml(n);}\n    FNC[kind].push(runs);var id=FNC[kind].length;\n    return kind===\'end\'?\'<w:r><w:rPr><w:rStyle w:val="EndnoteReference"/></w:rPr><w:endnoteReference w:id="\'+id+\'"/></w:r>\'\n      :\'<w:r><w:rPr><w:rStyle w:val="FootnoteReference"/></w:rPr><w:footnoteReference w:id="\'+id+\'"/></w:r>\';}\n  /* Word\'s notes parts: the two separators, then each note in the Footnote\n     (Endnote) Text style, opening with its number */\n  function notesPartXml(kind){\n    var tag=kind===\'end\'?\'endnote\':\'footnote\',St=kind===\'end\'?\'Endnote\':\'Footnote\';\n    var x=\'<?xml version="1.0" encoding="UTF-8" standalone="yes"?><w:\'+tag+\'s xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">\'\n      +\'<w:\'+tag+\' w:type="separator" w:id="-1"><w:p><w:pPr><w:spacing w:after="0" w:line="240" w:lineRule="auto"/></w:pPr><w:r><w:separator/></w:r></w:p></w:\'+tag+\'>\'\n      +\'<w:\'+tag+\' w:type="continuationSeparator" w:id="0"><w:p><w:pPr><w:spacing w:after="0" w:line="240" w:lineRule="auto"/></w:pPr><w:r><w:continuationSeparator/></w:r></w:p></w:\'+tag+\'>\';\n    FNC[kind].forEach(function(runs,i){x+=\'<w:\'+tag+\' w:id="\'+(i+1)+\'"><w:p><w:pPr><w:pStyle w:val="\'+St+\'Text"/></w:pPr>\'\n      +\'<w:r><w:rPr><w:rStyle w:val="\'+St+\'Reference"/></w:rPr><w:\'+tag+\'Ref/></w:r><w:r><w:t xml:space="preserve"> </w:t></w:r>\'+runs+\'</w:p></w:\'+tag+\'>\';});\n    return x+\'</w:\'+tag+\'s>\';}\n  function sectPr(idx,kind){'),
    # Inkwell 7.48 (its Tabula's line 3690): (the same)
    ("    var body='';",
     "    var body='';FNC={foot:[],end:[]};"),
    # Inkwell 7.48 (its Tabula's line 3714): (the same): the page's own type and spacing, and Word's note styles
    ('      +\'<w:style w:type="paragraph" w:default="1" w:styleId="Normal"><w:name w:val="Normal"/></w:style>\'',
     '      /* 7.48: the page\'s own type (Times New Roman, 12 pt), so Word sets the\n         text as Tabula shows it and the notes smaller than it */\n      +\'<w:docDefaults><w:rPrDefault><w:rPr><w:rFonts w:ascii="Times New Roman" w:hAnsi="Times New Roman" w:cs="Times New Roman"/><w:sz w:val="24"/><w:szCs w:val="24"/></w:rPr></w:rPrDefault></w:docDefaults>\'\n      /* and its own spacing: lines at 1.7, 9 pt after a paragraph (a Word\n         file\'s own spacing still comes back on each of its paragraphs) */\n      +\'<w:style w:type="paragraph" w:default="1" w:styleId="Normal"><w:name w:val="Normal"/><w:pPr><w:spacing w:after="180" w:line="408" w:lineRule="auto"/></w:pPr></w:style>\'\n      +\'<w:style w:type="paragraph" w:styleId="FootnoteText"><w:name w:val="footnote text"/><w:basedOn w:val="Normal"/><w:uiPriority w:val="99"/><w:unhideWhenUsed/><w:pPr><w:spacing w:after="0" w:line="240" w:lineRule="auto"/></w:pPr><w:rPr><w:sz w:val="20"/><w:szCs w:val="20"/></w:rPr></w:style>\'\n      +\'<w:style w:type="character" w:styleId="FootnoteReference"><w:name w:val="footnote reference"/><w:uiPriority w:val="99"/><w:unhideWhenUsed/><w:rPr><w:vertAlign w:val="superscript"/></w:rPr></w:style>\'\n      +\'<w:style w:type="paragraph" w:styleId="EndnoteText"><w:name w:val="endnote text"/><w:basedOn w:val="Normal"/><w:uiPriority w:val="99"/><w:unhideWhenUsed/><w:pPr><w:spacing w:after="0" w:line="240" w:lineRule="auto"/></w:pPr><w:rPr><w:sz w:val="20"/><w:szCs w:val="20"/></w:rPr></w:style>\'\n      +\'<w:style w:type="character" w:styleId="EndnoteReference"><w:name w:val="endnote reference"/><w:uiPriority w:val="99"/><w:unhideWhenUsed/><w:rPr><w:vertAlign w:val="superscript"/></w:rPr></w:style>\''),
    # Inkwell 7.48 (its Tabula's line 3842): (the same)
    ("    var parts=[], rels='', ctOver='';\n",
     "    var parts=[], rels='', ctOver='';\n    var DOCXML=null;\n"),
    # Inkwell 7.48 (its Tabula's line 3868): (the same): footnotes.xml, endnotes.xml, settings.xml
    ("   parts.push({name:'word/media/cdwatermark.png',data:__cdWmSt.png}); }\n",
     '   parts.push({name:\'word/media/cdwatermark.png\',data:__cdWmSt.png}); }\n /* 7.48: the body is written first, so its notes are known */\n    DOCXML=documentXml();\n    var nF=FNC.foot.length,nE=FNC.end.length;\n    if(nF){parts.push({name:\'word/footnotes.xml\',data:notesPartXml(\'foot\')});\n      rels+=\'<Relationship Id="rIdFn" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/footnotes" Target="footnotes.xml"/>\';\n      ctOver+=\'<Override PartName="/word/footnotes.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.footnotes+xml"/>\';}\n    if(nE){parts.push({name:\'word/endnotes.xml\',data:notesPartXml(\'end\')});\n      rels+=\'<Relationship Id="rIdEn" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/endnotes" Target="endnotes.xml"/>\';\n      ctOver+=\'<Override PartName="/word/endnotes.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.endnotes+xml"/>\';}\n    if(nF||nE){parts.push({name:\'word/settings.xml\',data:\'<?xml version="1.0" encoding="UTF-8" standalone="yes"?><w:settings xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">\'\n        +(nF?\'<w:footnotePr><w:footnote w:id="-1"/><w:footnote w:id="0"/></w:footnotePr>\':\'\')+(nE?\'<w:endnotePr><w:endnote w:id="-1"/><w:endnote w:id="0"/></w:endnotePr>\':\'\')+\'</w:settings>\'});\n      rels+=\'<Relationship Id="rIdSet" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/settings" Target="settings.xml"/>\';\n      ctOver+=\'<Override PartName="/word/settings.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.settings+xml"/>\';}\n'),
    # Inkwell 7.48 (its Tabula's line 3874): (the same)
    ("      {name:'word/document.xml',data:documentXml()},",
     "      {name:'word/document.xml',data:DOCXML},"),
    # Inkwell 7.48 (its Tabula's line 5198): the ribbon's Save .docx: a note keeps its italics and the rest
    ('   state.notes.push((function(){ try{ var nid=ch.getAttribute(\'data-nid\'); if(ch.classList&&ch.classList.contains(\'fn-ref\')&&nid){ var en=document.querySelector(\'#footnotes .fn[data-nid="\'+nid+\'"]\'); if(en){ var cl=en.cloneNode(true); var sp=cl.querySelector(\'sup\'); if(sp)sp.remove(); return cl.textContent.trim(); } } }catch(e){} return ch.getAttribute(\'data-note\'); })());',
     '   /* 7.48: a note keeps its own italics, bold and the rest in Word (it was\n      written as plain text) */\n   state.notes.push((function(){ try{ var nid=ch.getAttribute(\'data-nid\'); if(ch.classList&&ch.classList.contains(\'fn-ref\')&&nid){ var en=document.querySelector(\'#footnotes .fn[data-nid="\'+nid+\'"]\'); if(en){ var cl=en.cloneNode(true); var sp=cl.querySelector(\'sup\'); if(sp)sp.remove(); if(cl.firstChild&&cl.firstChild.nodeType===3)cl.firstChild.nodeValue=cl.firstChild.nodeValue.replace(/^\\s+/,\'\'); return {text:cl.textContent.trim(),node:cl}; } } }catch(e){} return {text:ch.getAttribute(\'data-note\')||\'\',node:null}; })());'),
    # Inkwell 7.48 (its Tabula's line 5300): (the same): the separators leave the section's properties
    ('  +(NOTES.length?\'<w:footnotePr><w:footnote w:id="-1"/><w:footnote w:id="0"/></w:footnotePr>\':\'\')\n',
     ''),
    # Inkwell 7.48 (its Tabula's line 5335): (the same): settings.xml
    ('/vnd.openxmlformats-officedocument.wordprocessingml.footnotes+xml"/>\':\'\')+(USED_',
     '/vnd.openxmlformats-officedocument.wordprocessingml.footnotes+xml"/><Override PartName="/word/settings.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.settings+xml"/>\':\'\')+(USED_'),
    # Inkwell 7.48 (its Tabula's line 5347): (the same)
    ('fficeDocument/2006/relationships/footnotes" Target="footnotes.xml"/>\'; if(USED_N',
     'fficeDocument/2006/relationships/footnotes" Target="footnotes.xml"/><Relationship Id="rIdSettings" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/settings" Target="settings.xml"/>\'; if(USED_N'),
    # Inkwell 7.48 (its Tabula's line 5370): (the same)
    ('  NOTES.forEach(function(text,i){',
     '  NOTES.forEach(function(nt,i){\n   var text=(nt&&typeof nt===\'object\')?nt.text:String(nt||\'\'),runs=\'\';\n   try{if(nt&&nt.node)runs=runsFrom(nt.node,{b:false,i:false,u:false,imgs:IMGS,rev:1,notes:[],comments:[]});}catch(e){runs=\'\';}\n   if(!runs)runs=\'<w:r><w:t xml:space="preserve">\'+esc(text)+\'</w:t></w:r>\';'),
    # Inkwell 7.48 (its Tabula's line 5373): (the same)
    ('    +\'<w:r><w:t xml:space="preserve"> \'+esc(text)+\'</w:t></w:r></w:p></w:footnote>\';',
     '    +\'<w:r><w:t xml:space="preserve"> </w:t></w:r>\'+runs+\'</w:p></w:footnote>\';'),
    # Inkwell 7.48 (its Tabula's line 5377): (the same): the separators named in settings.xml
    ("  entries.push({name:'word/footnotes.xml',text:fx});\n",
     '  entries.push({name:\'word/footnotes.xml\',text:fx});\n  /* 7.48: the two separator notes are named in the settings, as Word\'s own\n     files name them (they stood in the section\'s properties, where Word\'s\n     schema has no place for them) */\n  entries.push({name:\'word/settings.xml\',text:XH+\'<w:settings xmlns:w="\'+W+\'"><w:footnotePr><w:footnote w:id="-1"/><w:footnote w:id="0"/></w:footnotePr></w:settings>\'});\n'),
]

# THE NOTES AT THE PAGE FOOT: Inkwell 7.48's functions (its layer, its notes, writing a note where it stands, the clipboard,
# the handoff), with this Tabula's own measure (kept by each note's text) and its own drawing (from what each block placed)
NOTES = r"""/* R130-TABULA-FOOTNOTES · Word's footnotes at the foot of each page (Inkwell 7.48). The pages show the notes of
     #footnotes (which stays the document's own store, hidden on the screen, shown at the end in print) in a layer of their
     own over the paper: a short rule, then each note with its number raised, in smaller type, single spaced. A note is
     written where it stands. */
  var FN,__fnH,__fnW,__fnSep;
  function fnLayer(){var paper=editor.closest('.paper');var L=document.getElementById('cd-fnpages');if(!L){L=document.createElement('div');L.id='cd-fnpages';}if(paper&&L.parentNode!==paper)paper.appendChild(L);return L;}
  function fnNoteHTML(e){var c=e.cloneNode(true);var sp=c.querySelector('sup');if(sp&&sp===c.firstElementChild)sp.remove();return c.innerHTML.replace(/^(\s|&nbsp;)+/,'');}
  function fnItem(r){return '<div class="cd-fnp" data-nid="'+r.id+'"><sup class="cd-fnpn" contenteditable="false" title="Back to the text">'+r.n+'</sup><span class="cd-fnpt" contenteditable="true" spellcheck="true">'+r.html+'</span></div>';}
  /* the notes the text cites, each with its height: measured once and kept by its text and the page's width */
  function fnPrep(){
    var refs=editor.querySelectorAll('sup.fn-ref[data-note="foot"]'),L0=document.getElementById('cd-fnpages');
    FN={has:false,byId:{},sep:0};
    if(!refs.length||!fnBox){if(fnBox)fnBox.classList.remove('cd-fn-atfoot');if(L0)L0.innerHTML='';return FN;}
    var notes={};Array.prototype.forEach.call(fnBox.querySelectorAll('.fn[data-nid]'),function(e){notes[e.getAttribute('data-nid')]=e;});
    var w=editor.clientWidth;if(w!==__fnW||!__fnH){__fnH={};__fnW=w;__fnSep=0;}
    var list=[],miss=[];
    for(var i=0;i<refs.length;i++){var id=refs[i].getAttribute('data-nid'),e=notes[id];if(!e||FN.byId[id])continue;var html=fnNoteHTML(e),r={id:id,n:refs[i].textContent,html:html,key:id+'\u0001'+html};r.h=__fnH[r.key];FN.byId[id]=r;list.push(r);if(r.h==null)miss.push(r);}
    if(!list.length){fnBox.classList.remove('cd-fn-atfoot');if(L0)L0.innerHTML='';return FN;}
    if(miss.length||!__fnSep){var pr=document.createElement('div');pr.className='cd-fnpage cd-fnprobe';pr.style.width=w+'px';var probe=miss.length?miss:[list[0]];
      pr.innerHTML='<div class="cd-fnrule"></div>'+probe.map(fnItem).join('');fnLayer().appendChild(pr);
      var items=pr.querySelectorAll('.cd-fnp'),k=tabK(),sum=0;
      for(var j=0;j<items.length;j++){var h=items[j].getBoundingClientRect().height/k;sum+=h;if(miss.length){miss[j].h=h;__fnH[miss[j].key]=h;}}
      __fnSep=pr.getBoundingClientRect().height/k-sum;pr.remove();}
    FN.sep=__fnSep;FN.has=true;fnBox.classList.add('cd-fn-atfoot');return FN;}
  /* the notes a block cites, in order; the room they take on a page that already holds nh of notes */
  function fnOf(b){if(!FN||!FN.has||!b.querySelectorAll)return null;var rs=b.querySelectorAll('sup.fn-ref[data-note="foot"]');if(!rs.length)return null;
    var out=[];for(var i=0;i<rs.length;i++){var r=FN.byId[rs[i].getAttribute('data-nid')];if(r)out.push({id:r.id,h:r.h,ref:rs[i]});}return out.length?out:null;}
  function fnNeed(list,nh){if(!list)return 0;var h=nh?0:FN.sep;for(var q=0;q<list.length;q++)h+=list[q].h;return h;}
  /* the notes of a paragraph by the line that cites them */
  function fnLR(b,list,L){var br=b.getBoundingClientRect(),k=tabK(),LR=[];
    list.forEach(function(x){var rc=x.ref.getBoundingClientRect(),y=((rc.top+rc.bottom)/2-br.top)/k,j=0;while(j<L.length-1&&y>L[j].b)j++;var o=LR[j]||(LR[j]={h:0,list:[]});o.h+=x.h;o.list.push(x);});return LR;}
  function fnCaret(el,off){try{el.focus({preventScroll:true});}catch(e){el.focus();}
    var w=document.createTreeWalker(el,NodeFilter.SHOW_TEXT,null),n,left=(off==null?1e9:off),s=window.getSelection(),r=document.createRange();
    while((n=w.nextNode())){if(left<=n.data.length){r.setStart(n,left);r.collapse(true);s.removeAllRanges();s.addRange(r);return;}left-=n.data.length;}
    r.selectNodeContents(el);r.collapse(false);s.removeAllRanges();s.addRange(r);}
  /* each page's notes at its foot, from the notes each block placed on its pages (__fnPl), with today's numbers */
  function fnDraw(INNER){
    var L=document.getElementById('cd-fnpages');
    if(!FN||!FN.has){if(L)L.innerHTML='';return;}
    L=fnLayer();
    /* the pen stays where it was in a note being written */
    var act=document.activeElement,keep=null;
    if(act&&act.classList&&act.classList.contains('cd-fnpt')&&L.contains(act)){var off=0;try{var sel=window.getSelection(),rg=document.createRange();rg.selectNodeContents(act);rg.setEnd(sel.anchorNode,sel.anchorOffset);off=rg.toString().length;}catch(e){}keep={id:act.parentNode.getAttribute('data-nid'),off:off};}
    var nums={};Array.prototype.forEach.call(editor.querySelectorAll('sup.fn-ref[data-note="foot"]'),function(r){nums[r.getAttribute('data-nid')]=r.textContent;});
    var pages=[],at={},kids=editor.children,i,j;
    for(i=0;i<kids.length;i++){var pl=kids[i].__fnPl;if(!pl)continue;
      for(j=0;j<pl.length;j++){var key=pl[j][0].toFixed(2),pg=at[key];if(!pg){pg=at[key]={ps:pl[j][0],list:[]};pages.push(pg);}
        pl[j][1].forEach(function(x){var r=FN.byId[x.id];if(r&&nums[x.id]!=null)pg.list.push(r);});}}
    var top=editor.offsetTop,left=editor.offsetLeft,w=editor.offsetWidth,html='';
    pages.forEach(function(pg){if(!pg.list.length)return;var nh=FN.sep;pg.list.forEach(function(r){nh+=r.h;});
      html+='<div class="cd-fnpage" style="top:'+(top+pg.ps+INNER-nh).toFixed(2)+'px;left:'+left+'px;width:'+w+'px"><div class="cd-fnrule"></div>'+pg.list.map(function(r){return fnItem({id:r.id,n:nums[r.id],html:r.html});}).join('')+'</div>';});
    L.innerHTML=html;
    if(keep){var t=L.querySelector('.cd-fnp[data-nid="'+keep.id+'"] .cd-fnpt');if(t)fnCaret(t,keep.off);}}
  function fnFocus(uid,atEnd){var t=document.querySelector('#cd-fnpages .cd-fnp[data-nid="'+uid+'"] .cd-fnpt');if(!t)return false;
    try{t.scrollIntoView({block:'center',behavior:'smooth'});}catch(e){t.scrollIntoView(false);}fnCaret(t,atEnd?null:0);return true;}
  window.cdFnFocus=fnFocus;
  /* back to a note's place in the text, the pen after its number */
  function fnBack(uid){var ref=editor.querySelector('sup.fn-ref[data-nid="'+uid+'"]');if(!ref)return;
    try{ref.scrollIntoView({block:'center'});}catch(e){}editor.focus();var r=document.createRange();r.setStartAfter(ref);r.collapse(true);var s=window.getSelection();s.removeAllRanges();s.addRange(r);}
  /* Insert footnote: the number at the pen, the pen at the foot of the page, once the page is drawn */
  function cdInsertFootnote(){var uid='fn'+noteSeq;addFootnote('');var n=0;(function go(){if(fnFocus(uid,true))return;if(++n<80)setTimeout(go,50);})();}
  window.cdInsertFootnote=cdInsertFootnote;
  /* the notes travel with the text: what comes in with Inkwell's hidden box of notes (from Inkwell's desk, or a page it
     saved) has its notes taken into the Notes; what leaves can carry them the same way */
  function cdNotesHTML(){var out='';
    [[fnBox,'foot'],[enBox,'end']].forEach(function(b){if(!b[0])return;[].slice.call(b[0].querySelectorAll('.fn[data-nid]')).forEach(function(e){var c=e.cloneNode(true);c.setAttribute('data-kind',b[1]);out+=c.outerHTML;});});
    return out?'<div data-ink-notes="1" style="display:none">'+out+'</div>':'';}
  window.cdNotesHTML=cdNotesHTML;
  function cdTakeNotes(){var bx=editor.querySelector('[data-ink-notes]');if(!bx)return false;
    [].slice.call(bx.querySelectorAll('.fn[data-nid]')).forEach(function(e){var end=e.getAttribute('data-kind')==='end',box=end?enBox:fnBox;if(!box)return;e.removeAttribute('data-kind');
      if(box.querySelector('.fn[data-nid="'+e.getAttribute('data-nid')+'"]'))return;
      if(!box.querySelector('.h')){box.innerHTML='<div class="h">'+(end?'Endnotes':'Notes')+'</div>';}
      box.appendChild(e);box.style.display='block';});
    bx.remove();try{restoreNoteSeq();}catch(e){}try{renumberNotes();}catch(e){}return true;}
  window.cdTakeNotes=cdTakeNotes;
  /* pasted HTML that brings footnotes (Word, LibreOffice, Google Docs, Inkwell, Tabula): each becomes a note of
     Tabula's own, numbered in place */
  function cdPasteNotes(P,clean){
    var body=String(P.html).replace(/<sup data-fnk="(\d+)"[^>]*>[\s\S]*?<\/sup>/g,function(m,i){return ''+i+'';});
    try{document.execCommand('insertHTML',false,clean?clean(body):body);}catch(e){}
    var w=document.createTreeWalker(editor,NodeFilter.SHOW_TEXT,null),n,hits=[];
    while((n=w.nextNode()))if(n.nodeValue.indexOf('')>=0)hits.push(n);
    hits.forEach(function(tn){var parts=tn.nodeValue.split(/(\d+)/),frag=document.createDocumentFragment();
      parts.forEach(function(pt){var m=/^(\d+)$/.exec(pt);if(!m){if(pt)frag.appendChild(document.createTextNode(pt));return;}
        var note=P.notes[+m[1]-1];if(!note)return;var uid='fn'+(noteSeq++);
        var sp=document.createElement('sup');sp.className='fn-ref';sp.setAttribute('data-note','foot');sp.setAttribute('data-nid',uid);sp.textContent='0';frag.appendChild(sp);
        if(fnBox.style.display!=='block'||!fnBox.querySelector('.h')){fnBox.style.display='block';if(!fnBox.querySelector('.h'))fnBox.innerHTML='<div class="h">Notes</div>';}
        var d=document.createElement('div');d.className='fn';d.setAttribute('data-nid',uid);d.innerHTML='<sup></sup> '+(clean?clean(note.html):note.html);fnBox.appendChild(d);});
      tn.parentNode.replaceChild(frag,tn);});
    window.__tabDirty='all';renumberNotes();layout();return hits.length>0;}
  window.cdPasteNotes=cdPasteNotes;
  /* copying a stretch that holds notes: the notes go with it, as Word writes its own footnotes (and in plain text as
     Inkwell's desk keeps them) */
  function cdClipNotes(ev,cut){
    var sel=window.getSelection();if(!sel||!sel.rangeCount||sel.isCollapsed||!window.INKFNCLIP)return;
    var rg=sel.getRangeAt(0);if(!editor.contains(rg.commonAncestorContainer))return;
    var frag=rg.cloneContents(),refs=frag.querySelectorAll('sup.fn-ref[data-note="foot"][data-nid]');if(!refs.length)return;
    var notes=[],plainNotes=[];
    [].forEach.call(refs,function(r,i){var e=fnBox&&fnBox.querySelector('.fn[data-nid="'+r.getAttribute('data-nid')+'"]'),c=e?e.cloneNode(true):document.createElement('div');var sp=c.querySelector('sup');if(sp&&sp===c.firstElementChild)sp.remove();
      notes.push({html:c.innerHTML.replace(/^(\s|&nbsp;)+/,'')});plainNotes.push(INKFNCLIP.noteText(c));
      var k=document.createElement('sup');k.setAttribute('data-fnk',String(i+1));k.textContent=String(i+1);r.parentNode.replaceChild(k,r);});
    var box=document.createElement('div');box.appendChild(frag);
    var html=INKFNCLIP.wordHTML(box.innerHTML,notes);
    box.querySelectorAll('sup[data-fnk]').forEach(function(k){k.replaceWith('[^'+k.getAttribute('data-fnk')+']');});
    box.style.cssText='position:fixed;left:-99999px;top:0;white-space:normal';document.body.appendChild(box);var plain=box.innerText;box.remove();
    plain=plain.replace(/\s+$/,'')+'\n\n'+plainNotes.map(function(x,i){return '[^'+(i+1)+']: '+x;}).join('\n');
    try{ev.clipboardData.setData('text/html',html);ev.clipboardData.setData('text/plain',plain);ev.preventDefault();}catch(e){return;}
    if(cut){try{document.execCommand('delete');}catch(e){}renumberNotes();layout();}}
  editor.addEventListener('copy',function(ev){cdClipNotes(ev,false);});
  editor.addEventListener('cut',function(ev){if(!tracking)cdClipNotes(ev,true);});
  (function(){
    var T=null,A=null;
    /* a note written at the foot goes into #footnotes as it is typed; the pages are laid out again from the paragraph that
       cites it (its height may have changed), and the document is saved soon after */
    document.addEventListener('input',function(ev){var t=ev.target;if(!t||!t.classList||!t.classList.contains('cd-fnpt'))return;
      var id=t.parentNode.getAttribute('data-nid'),e=fnBox&&fnBox.querySelector('.fn[data-nid="'+id+'"]');
      if(e){var sup=e.querySelector('sup');e.innerHTML=(sup?sup.outerHTML:'<sup></sup>')+' '+t.innerHTML;}
      try{var ref=editor.querySelector('sup.fn-ref[data-nid="'+id+'"]'),blk=ref;while(blk&&blk.parentNode!==editor)blk=blk.parentNode;
        if(blk&&window.__tabDirty!=='all'){window.__tabDirty=tabEarlier(window.__tabDirty,blk);window.__tabDirtyLast=tabLater(window.__tabDirtyLast,blk);}}catch(_){window.__tabDirty='all';}
      clearTimeout(T);T=setTimeout(function(){try{if(window.cdScheduleLayout)window.cdScheduleLayout(60);else layout();}catch(_){}},240);
      clearTimeout(A);A=setTimeout(function(){try{if(window.__tabAutosaveNow)window.__tabAutosaveNow();}catch(_){}},1200);},true);
    document.addEventListener('keydown',function(ev){var t=ev.target;if(!t||!t.classList||!t.classList.contains('cd-fnpt'))return;
      if(ev.key==='Escape'||(ev.key==='Enter'&&!ev.shiftKey)){ev.preventDefault();fnBack(t.parentNode.getAttribute('data-nid'));}},true);
    document.addEventListener('mousedown',function(ev){var n=ev.target&&ev.target.closest&&ev.target.closest('.cd-fnpn');if(!n)return;ev.preventDefault();fnBack(n.parentNode.getAttribute('data-nid'));},true);
    document.addEventListener('paste',function(ev){var t=ev.target&&ev.target.closest&&ev.target.closest('.cd-fnpt');if(!t)return;
      ev.preventDefault();var x='';try{x=ev.clipboardData.getData('text/plain')||'';}catch(_){}try{document.execCommand('insertText',false,x.replace(/\s*\n\s*/g,' '));}catch(_){}},true);
    editor.addEventListener('keydown',function(ev){if((ev.ctrlKey||ev.metaKey)&&ev.altKey&&ev.code==='KeyF'){ev.preventDefault();cdInsertFootnote();}});
  })();
  """

# THE LAYOUTS (R127's by need and in full, with R128's cut): each page keeps the room of its notes
LAYOUT = [
    # the cut keeps each line with the notes it cites: a line goes over when it and its notes no longer fit
    ("  function tabCut(b,bTop,pageStart,INNER,GAP,TOP){\n    var L=tabLines(b),n=L.length;if(n<4)return null;",
     "  function tabCut(b,bTop,pageStart,INNER,GAP,TOP,NB){\n    var L=tabLines(b),n=L.length;if(n<4)return null;\n"
     "    /* R130: the notes each line cites, the room they take, and the notes placed on each page */\n"
     "    var LR=(NB&&NB.list)?fnLR(b,NB.list,L):null,nh=NB?NB.nh:0,pl=[];\n"
     "    function need(i,nh0,ex){var o=LR&&LR[i];return o?((nh0||ex)?0:FN.sep)+o.h:0;}\n"
     "    function place(a,z,ps0){var l=[];for(var j=a;j<z;j++)if(LR&&LR[j])l.push.apply(l,LR[j].list);if(l.length)pl.push([ps0,l]);}"),
    ("      var limit=ps+INNER,k=-1,i;\n      for(i=k0;i<n;i++){if(bTop+L[i].b+hl(i)+shift>limit){k=i;break;}}",
     "      var limit=ps+INNER,k=-1,i,ex=0;\n      for(i=k0;i<n;i++){var nd=need(i,nh,ex);if(bTop+L[i].b+hl(i)+shift>limit-nh-ex-nd){k=i;break;}ex+=nd;}"),
    ("      bands.push([A+1,B]);seps.push(target-TOP-(GAP/2));shift+=B-A;ps=target;k0=k;",
     "      place(k0,k,ps);bands.push([A+1,B]);seps.push(target-TOP-(GAP/2));shift+=B-A;ps=target;k0=k;nh=0;"),
    ("    if(!bands.length)return null;\n    var pts=[];",
     "    if(!bands.length)return null;\n    place(k0,n,ps);var e2=0;for(var j2=k0;j2<n;j2++)e2+=need(j2,nh,e2);\n    var pts=[];"),
    ("    b.__pgCut=bands;return {pageStart:ps,seps:seps};}",
     "    b.__pgCut=bands;return {pageStart:ps,seps:seps,pl:pl,nh:nh+e2};}"),
    # the layout by need: it takes in notes that came with the text, measures the notes, starts with the room of notes its
    # first block's page already held, and stops only where the place and the room both match
    ("    if(!editor||!$('pageguides'))return;\n    layoutStop();\n    if(!from||",
     "    if(!editor||!$('pageguides'))return;\n    layoutStop();\n    try{if(cdTakeNotes())from=null;}catch(e){}\n    if(!from||"),
    ("var r=idx>0?idx-1:0;if(kids[r].__pgS==null)return layoutFull();",
     "var r=idx>0?idx-1:0;if(kids[r].__pgS==null||kids[r].__pgNH==null)return layoutFull();fnPrep();"),
    ("pageStart:kids[r].__pgS,touched:0,", "pageStart:kids[r].__pgS,pageNH:kids[r].__pgNH,touched:0,"),
    ("b=job.b,pageStart=job.pageStart;", "b=job.b,pageStart=job.pageStart,pageNH=job.pageNH;"),
    ("if(job.past&&b.__pgS===pageStart&&b.__pgYf!=null&&Math.abs(tabTop(b)-b.__pgYf)<0.02){b=null;break;}",
     "if(job.past&&b.__pgS===pageStart&&b.__pgYf!=null&&Math.abs(tabTop(b)-b.__pgYf)<0.02&&b.__pgNH!=null&&Math.abs(b.__pgNH-pageNH)<0.01){b=null;break;}"),
    ("tabCutClear(b);b.__pgS=pageStart;b.__pgSep=null;job.touched++;",
     "tabCutClear(b);b.__pgS=pageStart;b.__pgNH=pageNH;b.__fnPl=null;b.__pgSep=null;job.touched++;"),
    ("        var __cut=(hgt&&bBot>limit&&tabCanCut(b))?tabCut(b,bTop,pageStart,INNER,PAGE_GAP,PAGE_TOP):null;\n"
     "        if(__cut){pageStart=__cut.pageStart;b.__pgSeps=__cut.seps;}\n        else if(hgt&&bBot>limit){",
     "        var __bn=hgt?fnOf(b):null,__need=fnNeed(__bn,pageNH),__lim=limit-pageNH-__need;\n"
     "        var __cut=(hgt&&bBot>__lim&&tabCanCut(b))?tabCut(b,bTop,pageStart,INNER,PAGE_GAP,PAGE_TOP,{nh:pageNH,list:__bn}):null;\n"
     "        if(__cut){pageStart=__cut.pageStart;b.__pgSeps=__cut.seps;b.__fnPl=__cut.pl;pageNH=__cut.nh;}\n        else if(hgt&&bBot>__lim){"),
    ("b.__pgSep=__tg-PAGE_TOP-(PAGE_GAP/2);pageStart=__tg;}",
     "b.__pgSep=__tg-PAGE_TOP-(PAGE_GAP/2);pageStart=__tg;pageNH=0;if(__bn){b.__fnPl=[[__tg,__bn]];pageNH=fnNeed(__bn,0);}}"),
    ("else{var over=Math.max(1,Math.ceil((bBot-pageStart)/INNER));pageStart=pageStart+over*INNER;}}",
     "else{if(__bn)b.__fnPl=[[pageStart,__bn]];var over=Math.max(1,Math.ceil((bBot-pageStart)/INNER));pageStart=pageStart+over*INNER;pageNH=0;}}\n"
     "        else if(__bn){b.__fnPl=[[pageStart,__bn]];pageNH+=__need;}"),
    ("if(b&&performance.now()-t>25){job.b=b;job.pageStart=pageStart;setTimeout(step,0);return;}}",
     "if(b&&performance.now()-t>25){job.b=b;job.pageStart=pageStart;job.pageNH=pageNH;setTimeout(step,0);return;}}"),
    ("window.__tabLayoutTouched=job.touched;window.__tabLayoutMs=Math.round(performance.now()-job.t0);tabGuides(seps);})();}",
     "window.__tabLayoutTouched=job.touched;window.__tabLayoutMs=Math.round(performance.now()-job.t0);tabGuides(seps);try{fnDraw(INNER);}catch(e){}})();}"),
    # the full layout: the same
    ("  var g=$('pageguides'); if(!g||!editor) return; g.innerHTML='';\n  var kids=editor.children,i,b;",
     "  var g=$('pageguides'); if(!g||!editor) return; g.innerHTML='';\n  try{cdTakeNotes();}catch(e){}\n  var kids=editor.children,i,b;"),
    ("  var pageStart=0, seps=[];\n", "  var pageStart=0, seps=[];\n  fnPrep(); var pageNH=0;\n"),
    ("    b.__pgS=pageStart; b.__pgSep=null;", "    b.__pgS=pageStart; b.__pgNH=pageNH; b.__fnPl=null; b.__pgSep=null;"),
    ("    var __cut=(bBot>limit&&tabCanCut(b))?tabCut(b,bTop,pageStart,INNER,PAGE_GAP,PAGE_TOP):null;\n"
     "    if(__cut){ pageStart=__cut.pageStart; b.__pgSeps=__cut.seps; seps.push.apply(seps,__cut.seps); }\n    else if(bBot>limit){",
     "    var __bn=fnOf(b), __need=fnNeed(__bn,pageNH), __lim=limit-pageNH-__need;\n"
     "    var __cut=(bBot>__lim&&tabCanCut(b))?tabCut(b,bTop,pageStart,INNER,PAGE_GAP,PAGE_TOP,{nh:pageNH,list:__bn}):null;\n"
     "    if(__cut){ pageStart=__cut.pageStart; b.__pgSeps=__cut.seps; seps.push.apply(seps,__cut.seps); b.__fnPl=__cut.pl; pageNH=__cut.nh; }\n    else if(bBot>__lim){"),
    ("        seps.push(__tg-PAGE_TOP-(PAGE_GAP/2)); b.__pgSep=__tg-PAGE_TOP-(PAGE_GAP/2);\n        pageStart=__tg;",
     "        seps.push(__tg-PAGE_TOP-(PAGE_GAP/2)); b.__pgSep=__tg-PAGE_TOP-(PAGE_GAP/2);\n        pageStart=__tg; pageNH=0; if(__bn){ b.__fnPl=[[__tg,__bn]]; pageNH=fnNeed(__bn,0); }"),
    ("        pageStart=pageStart+over*INNER;\n      }\n    }\n    b.__pgY=bTop; b.__pgH=b.offsetHeight;",
     "        if(__bn) b.__fnPl=[[pageStart,__bn]];\n        pageStart=pageStart+over*INNER; pageNH=0;\n      }\n    }\n"
     "    else if(__bn){ b.__fnPl=[[pageStart,__bn]]; pageNH+=__need; }\n    b.__pgY=bTop; b.__pgH=b.offsetHeight;"),
    ("  var n=seps.length+1;\n  try{var paper=document.querySelector('[data-panel=\"write\"] .paper');",
     "  try{fnDraw(INNER);}catch(e){}\n  var n=seps.length+1;\n  try{var paper=document.querySelector('[data-panel=\"write\"] .paper');"),
    # a note written at the foot is saved soon after (the autosave otherwise hears only the text)
    ("var __asT=null;function cdAutosave(){", "var __asT=null;window.__tabAutosaveNow=function(){cdAutosave();};function cdAutosave(){"),
]


def patch(s):
    if MARK in s:
        return s
    if "R129-TABULA-LOOK" not in s or "R128-TABULA-FLOW" not in s:
        raise SystemExit("apply tabula_flow_patch.py (R128) and tabula_look_patch.py (R129) first")

    def rep(a, b):
        nonlocal s
        n = s.count(a)
        if n != 1:
            raise SystemExit("tabula_notes_patch: expected 1, found %d: %r" % (n, a[:110]))
        s = s.replace(a, b)

    for a, b in COPIED:
        rep(a, b)
    for a, b in LAYOUT:
        rep(a, b)
    rep("  function layout(from,last){", "  " + NOTES + "function layout(from,last){")
    clip = open(os.path.join(HERE, "tabula_fnclip.js"), encoding="utf-8").read()
    if "root.INKFNCLIP" not in clip or "</script" in clip.lower():
        raise SystemExit("tabula_notes_patch: tabula_fnclip.js is not Inkwell's INKFNCLIP")
    i = s.rfind("</body>")
    if i < 0 or s.count("</body>\n</html>") != 1 or s.find("</body>\n</html>") != i:
        raise SystemExit("tabula_notes_patch: the page's own </body> was not found")
    s = s[:i] + "<script id=\"tab-fnclip\">/* " + MARK + " · footnotes through the clipboard (Inkwell 7.48's INKFNCLIP) */\n" + clip + "</script>\n" + s[i:]
    return s


if __name__ == "__main__":
    src, out = sys.argv[1], sys.argv[2]
    open(out, "w", encoding="utf-8").write(patch(open(src, encoding="utf-8").read()))
    print("written", out)
