"""6.7 (security audit, 25 October 2026): markup a carried app takes in from outside goes through the strict sanitiser.

The five carried apps run at Ingenium's own origin. modules/r118.js puts the shared sanitiser (build/safe_html.js) first in
each app's frame as window.IngSafe: its frame-wide guard ("defuse") takes out whatever could run code from every way the
app turns text into markup. That guard leaves the rest of the markup as it is, so a document brought in could still carry
a form that posts to another site, a password field, or a style or stylesheet that loads from another site. Here every
place where an app takes markup from a file, a stored or restored document or another window is cut down to formatting
only (IngSafe.html: a safe list of elements and attributes, parsed where nothing loads or runs):

  Tabula   the .html and .doc import, the three .docx readers, saved documents, the autosave (small and large stores),
           Recent documents, the handover from Ingenium or Carpe Diem, and the parts kept with a document (header, footer,
           notes);
  Imago    every slide's text as it is drawn (so a deck file, a .pptx, a saved or restored deck all pass), its shapes'
           colours and its background (a colour only);
  Scriba   the notepad as kept, as it comes back from another window, and as it is handed over; the recordings' scratchpad;
  Fontes   a formatted bibliography entry;
  Abacus   takes no markup (its cells are text); a stored workbook's column widths are numbers and a cell's fill is a
           colour, so neither can load anything.

The app's own templates and its own editing keep the frame-wide guard alone. patch(name, text) returns the app's page;
for Tabula apply it after tabula_room_patch.py (R132). Each change must find its text exactly as many times as it says, or
the build stops.
"""
import sys

MARK = "6.7-SAFE-IMPORT"
S = "IngSafe.html"

REPS = {
    "tabula": [
        # the .html and .doc import: tidied (Word's spacing) between two strict passes, so the tidy itself reads only
        # formatting and what it hands back is formatting only
        ("editor.innerHTML=cdTidyWord(b||t);", "editor.innerHTML=" + S + "(cdTidyWord(" + S + "(b||t)));", 1),
        # the .docx reader that builds nodes (the Open key and the file field)
        ("var res=docxToFrag(files);",
         "var res=docxToFrag(files);try{res.frag=IngSafe.nodes(res.frag);res.header=" + S + "(res.header||'');res.footer=" + S + "(res.footer||'');"
         "(res.fnEntries||[]).forEach(function(x){x.html=" + S + "(x.html||'');});(res.enEntries||[]).forEach(function(x){x.html=" + S + "(x.html||'');});"
         "}catch(__e){res.frag=document.createDocumentFragment();res.header=res.footer='';res.fnEntries=[];res.enEntries=[];}", 1),
        # the .docx reader that writes markup (the ribbon's Open .docx, a file handed over from Carpe Diem)
        ("async function importDocx(file){",
         "async function importDocx(file){return " + S + "(await __ingImportDocxRaw(file));}async function __ingImportDocxRaw(file){", 1),
        # saved documents, the handover, the autosave in the small and the large store, Recent documents, a page sent in
        ("editor.innerHTML=docs[k].html||'';", "editor.innerHTML=" + S + "(docs[k].html||'');", 1),
        ("editor.innerHTML=__ho.html;", "editor.innerHTML=" + S + "(__ho.html);", 1),
        ("editor.innerHTML=__inc.html;", "editor.innerHTML=" + S + "(__inc.html);", 1),
        ("editor.innerHTML=__as.html;", "editor.innerHTML=" + S + "(__as.html);", 1),
        ("editor.innerHTML=v.html;", "editor.innerHTML=" + S + "(v.html);", 1),
        ("ed.innerHTML=src.html;", "ed.innerHTML=" + S + "(src.html);", 1),
        ("wrap.innerHTML=pk.html;", "wrap.innerHTML=" + S + "(pk.html);", 1),
        # the parts kept with a document: header, footer, notes
        ("n.innerHTML=a?(a.h||''):'';", "n.innerHTML=" + S + "(a?(a.h||''):'');", 1),
        ("n.innerHTML=a.h||'';", "n.innerHTML=" + S + "(a.h||'');", 1),
    ],
    "slides": [
        ('d.innerHTML=(slide.f&&slide.f[r.field])?slide.f[r.field]:"";',
         'd.innerHTML=' + S + '((slide.f&&slide.f[r.field])?slide.f[r.field]:"");', 1),
        ('tx.innerHTML=o.html||"";', 'tx.innerHTML=' + S + '(o.html||"");', 1),
        ('var f=o.fill||"#7A2530", st=o.stroke||"none", sw=(o.sw==null?0:o.sw);',
         'var __c=function(v,d){v=String(v==null?"":v);return /^[#a-zA-Z0-9(),.% -]{1,40}$/.test(v)?v:d;};'
         'var f=__c(o.fill,"#7A2530"), st=__c(o.stroke,"none"), sw=(isFinite(+o.sw)?+o.sw:0);', 1),
        ('node.style.setProperty("--s-bg",(slide&&slide.bg)?slide.bg:t.bg);',
         'node.style.setProperty("--s-bg",(slide&&slide.bg&&IngSafe.cleanStyle("background:"+slide.bg))?slide.bg:t.bg);', 1),
    ],
    "scriba": [
        ("if (saved) pad.innerHTML = saved;", "if (saved) pad.innerHTML = " + S + "(saved);", 1),
        ("if (v != null && v !== pad.innerHTML) pad.innerHTML = v;",
         "if (v != null) v = " + S + "(v); if (v != null && v !== pad.innerHTML) pad.innerHTML = v;", 2),
        ("pad.innerHTML=__h.html;", "pad.innerHTML=" + S + "(__h.html);", 1),
        ('var d = document.createElement("div"); d.innerHTML = html || "";',
         'var d = document.createElement("div"); d.innerHTML = ' + S + '(html || "");', 1),
    ],
    "fontes": [
        ("if (useCSL) ref.innerHTML = CSLF.bib[s.id];", "if (useCSL) ref.innerHTML = " + S + "(CSLF.bib[s.id]);", 1),
    ],
    "abacus": [
        ("(colw[_cn]?' style=\"min-width:'+colw[_cn]+'px;width:'+colw[_cn]+'px\"':'')",
         "(colw[_cn]?' style=\"min-width:'+(parseFloat(colw[_cn])||0)+'px;width:'+(parseFloat(colw[_cn])||0)+'px\"':'')", 1),
        ("td.style.background=st.bg||'';", "td.style.background=(st.bg&&IngSafe.cleanStyle('background:'+st.bg))?st.bg:'';", 1),
    ],
}


def patch(name, text):
    if MARK in text:
        return text
    reps = REPS.get(name)
    if not reps:
        return text
    for old, new, times in reps:
        n = text.count(old)
        if n != times:
            sys.exit("safe_import_patch (%s): expected %d of %r, found %d" % (name, times, old[:80], n))
        text = text.replace(old, new)
    # a marker, so the patch is never applied twice
    i = text.find("<head>")
    if i < 0:
        sys.exit("safe_import_patch (%s): no <head>" % name)
    return text[:i + 6] + "<!-- " + MARK + " -->" + text[i + 6:]


if __name__ == "__main__":
    if len(sys.argv) != 4:
        sys.exit("usage: python3 -I safe_import_patch.py NAME IN.html OUT.html")
    src = open(sys.argv[2], encoding="utf-8").read()
    open(sys.argv[3], "w", encoding="utf-8").write(patch(sys.argv[1], src))
