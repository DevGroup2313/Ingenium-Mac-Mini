"""6.8.1 (27 October 2026): Tabula's PDF and Word files no longer carry the words "Header" and "Footer".

The owner's words: "It also writes out the words "header" and "footer" in the repective words positions when downloading a
PDF, please remove that requirement."

When the header or the footer is shown, Tabula puts a small label on its dashed line, as Word does ("Header", "Footer", or
"Header -Section 2-", and "Same as Previous"): two spans (.hf-tab, .hf-same) inside the header and the footer themselves.
Tabula's own keeping of a section already takes them out (hfCapture), but its PDF (buildPdf) and its Word file read the
header's and the footer's whole text, labels and all, so a document with an empty header printed "Header" at the top of
every page, and one with words in it printed "Header" after them. Both now read the words alone, the way hfCapture does,
and on paper (the system's own print) the labels and the dashed lines are not drawn.

patch(text) returns the patched Tabula page; apply it after tabula_room_patch.py (R132). Usage on its own:
  python3 -I tabula_hf_patch.py tabula.html OUT.html
"""
import sys

MARK = "TABULA-HF-681"

PDF_OLD = ("var HDR=(document.getElementById('docheader')||{}).textContent||''; HDR=HDR.replace(/\\s+/g,' ').trim();\n    "
           "var FTR=(document.getElementById('docfooter')||{}).textContent||''; FTR=FTR.replace(/\\s+/g,' ').trim();")
PDF_NEW = ("var HDR=window.cdHFWords(document.getElementById('docheader')); HDR=HDR.replace(/\\s+/g,' ').trim();\n    "
           "var FTR=window.cdHFWords(document.getElementById('docfooter')); FTR=FTR.replace(/\\s+/g,' ').trim();")
DOCX_OLD = "var hTxt=head?(head.textContent||'').trim():'', fTxt=foot?(foot.textContent||'').trim():'';"
DOCX_NEW = "var hTxt=window.cdHFWords(head).trim(), fTxt=window.cdHFWords(foot).trim();"

# the words of a header or a footer without the labels on its dashed line; defined in the page's head, before any part reads them
HELPER = ("<script id=\"tab-hf-words\">/* " + MARK + " · the words of a header or footer, without its labels */\n"
          "window.cdHFWords=function(el){try{if(!el)return '';var d=el.cloneNode(true);"
          "[].forEach.call(d.querySelectorAll('.hf-tab,.hf-same'),function(x){x.remove();});return d.textContent||'';}catch(e){return '';}};\n"
          "</script>\n"
          "<style id=\"tab-hf-print\">/* " + MARK + " · on paper: no labels, no dashed lines, and an empty header or footer takes no room */\n"
          "@media print{#docheader .hf-tab,#docheader .hf-same,#docfooter .hf-tab,#docfooter .hf-same{display:none !important}"
          "#docheader.hf-on,#docfooter.hf-on{border:0 !important;padding:0 !important}"
          "#docheader.tab-hf-empty,#docfooter.tab-hf-empty{display:none !important}}\n"
          "</style>\n"
          "<script id=\"tab-hf-empty\">/* " + MARK + " · before printing, an empty header or footer is marked so the print leaves it out */\n"
          "window.addEventListener('beforeprint',function(){['docheader','docfooter'].forEach(function(id){var e=document.getElementById(id);"
          "if(e)e.classList.toggle('tab-hf-empty',!window.cdHFWords(e).trim());});});\n"
          "</script>\n")


def patch(text):
    if MARK in text:
        return text
    for old, new in ((PDF_OLD, PDF_NEW), (DOCX_OLD, DOCX_NEW)):
        n = text.count(old)
        if n != 1:
            raise SystemExit("tabula_hf_patch: expected one of %r, found %d" % (old[:60], n))
        text = text.replace(old, new)
    i = text.find("</head>")
    if i < 0:
        raise SystemExit("tabula_hf_patch: no </head>")
    return text[:i] + HELPER + text[i:]


if __name__ == "__main__":
    src, out = sys.argv[1:3]
    open(out, "w", encoding="utf-8").write(patch(open(src, encoding="utf-8").read()))
