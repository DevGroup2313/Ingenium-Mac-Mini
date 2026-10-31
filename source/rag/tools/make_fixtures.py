#!/usr/bin/env python3
# INGENIUM  |  Copyright (c) 2026 Yannie D. Forest. All rights reserved.
# NO LICENCE IS GRANTED. See LICENCE.txt.
"""The folder search's test corpus (rag/fixtures/), written by this one file, standard library only, byte for byte repeatable.

    python3 rag/tools/make_fixtures.py [OUT_DIR]          (default: rag/fixtures beside this tools folder)

Three folders, 72 files in the seven types the folder search reads (.txt .md .html .json .csv .pdf .docx):

    historian_archive/   a historian's archive: the papers of a Bristol sugar house, 1780s to 1790s (letters, diaries, finding aids,
                         ledgers, offprints, draft chapters, and one ship's logbook transcription of about 4 MB)
    lab_notes/           a soil and fungi laboratory's notes (protocols, notebook pages, instrument logs, reports, minutes)
    household_papers/    a household's papers (insurance, bills, letters, recipes, manuals). Its facts exist only there: it is the
                         folder the permissions test takes away from the second user.

FACTS.json lists the facts that the golden questions (phase 5) are drawn from: each is stated in exactly one file, with a needle (an
exact phrase of that file, as the folder search's readers extract it), the question, the answer, and for a PDF the page. MANIFEST.json
lists every file with its size and SHA-256. The people, firms, ships and figures are invented; places are real.

The .pdf files are written by a small PDF writer in this file (pages of text in the standard fonts, a running head and a page number
on every page; "line" mode draws a line at a time, "words" mode a word at a time, leaving the spaces to the gaps between the words).
The .docx files are written as zipped XML (styles named as Word names them, lists, tables). Both are read by pdf.js and mammoth, the
readers the folder search ships. Some files are written as Windows writes them (a byte order mark, CRLF line ends, Windows-1252).
"""
import hashlib
import json
import os
import random
import re
import shutil
import sys

import re
import zlib
import zipfile
from xml.sax.saxutils import escape as _xml_escape

# ---------------------------------------------------------------------------------------------------------------- PDF
# Helvetica advance widths (1/1000 em) for the printable ASCII range, from the Adobe core-14 metrics.
_HELV = [278, 278, 355, 556, 556, 889, 667, 191, 333, 333, 389, 584, 278, 333, 278, 278,
         556, 556, 556, 556, 556, 556, 556, 556, 556, 556, 278, 278, 584, 584, 584, 556,
         1015, 667, 667, 722, 722, 667, 611, 778, 722, 278, 500, 667, 556, 833, 722, 778,
         667, 778, 722, 667, 611, 722, 667, 944, 667, 667, 611, 278, 278, 278, 469, 556,
         333, 556, 556, 500, 556, 556, 278, 556, 556, 222, 222, 500, 222, 833, 556, 556,
         556, 556, 333, 500, 278, 556, 500, 722, 500, 500, 500, 334, 260, 334, 584]


def _width(text, size, bold=False, serif=False):
    w = 0
    for ch in text:
        o = ord(ch)
        if 32 <= o <= 126:
            c = _HELV[o - 32]
        else:
            c = 556
        w += c
    k = 1.12 if bold else (0.93 if serif else 1.0)
    return w * k * size / 1000.0


def _cp1252(text):
    """Text as WinAnsi bytes; characters outside it become plain look-alikes."""
    swap = {"−": "-", "≤": "<=", "≥": ">=", "→": "->", " ": " ", " ": " ", " ": " ",
            "‑": "-", "‐": "-", "μ": "µ", "−": "-"}
    out = []
    for ch in text:
        ch = swap.get(ch, ch)
        try:
            ch.encode("cp1252")
            out.append(ch)
        except UnicodeEncodeError:
            out.append("?")
    return "".join(out).encode("cp1252", "replace")


def _pdf_string(b):
    r = []
    for x in b:
        if x in (0x28, 0x29, 0x5C):
            r.append("\\" + chr(x))
        elif 32 <= x < 127:
            r.append(chr(x))
        else:
            r.append("\\%03o" % x)
    return "(" + "".join(r) + ")"


def _wrap(text, width_pt, size, bold=False, serif=False):
    words = text.split()
    lines, cur = [], ""
    for w in words:
        t = (cur + " " + w) if cur else w
        if cur and _width(t, size, bold, serif) > width_pt:
            lines.append(cur)
            cur = w
        else:
            cur = t
    if cur:
        lines.append(cur)
    return lines


class PdfBuilder:
    """Elements: ("title", text) ("h1", text) ("h2", text) ("p", text) ("li", text) ("gap", points).
    build() returns the bytes; .pages is, after build(), the list of lists of lines per page (for finding a text's page)."""

    PAGE_W, PAGE_H, MARGIN = 612, 792, 72

    def __init__(self, title, running_head="", body_size=10.5, mode="line", serif=False, compress=True):
        self.title, self.running_head = title, running_head
        self.size, self.mode, self.serif, self.compress = body_size, mode, serif, compress
        self.pages = []

    # -- layout -------------------------------------------------------------------------------------------------
    def _layout(self, elements):
        S, W, M = self.size, self.PAGE_W - 2 * self.MARGIN, self.MARGIN
        top, bottom = self.PAGE_H - M, M + 10
        pages, cur, y = [], [], top

        def newpage():
            nonlocal cur, y
            if cur:
                pages.append(cur)
            cur, y = [], top

        def need(h):
            if y - h < bottom:
                newpage()

        for kind, val in elements:
            if kind == "gap":
                y -= val
                continue
            if kind == "pagebreak":
                newpage()
                continue
            if kind in ("title", "h1", "h2"):
                size, bold, before, after = {"title": (20, True, 0, 14), "h1": (15, True, 12, 7), "h2": (12.5, True, 8, 5)}[kind]
                lines = _wrap(val, W, size, True)
                need(before + size * 1.25 * len(lines) + after + S * 1.45 * 3)
                if cur:
                    y -= before
                for ln in lines:
                    y -= size * 1.25
                    cur.append(dict(x=M, y=y, size=size, bold=True, text=ln, kind=kind))
                y -= after
                continue
            indent, lead = (0, S * 1.42) if kind == "p" else (18, S * 1.42)
            lines = _wrap(val, W - indent, S, False, self.serif)
            first = True
            for ln in lines:
                need(lead)
                y -= lead
                if kind == "li" and first:
                    cur.append(dict(x=M + 6, y=y, size=S, bold=False, text="•", kind="bullet"))
                cur.append(dict(x=M + indent, y=y, size=S, bold=False, text=ln, kind=kind))
                first = False
            y -= S * 0.7
        if cur:
            pages.append(cur)
        return pages

    # -- file ---------------------------------------------------------------------------------------------------
    def build(self, elements):
        pages = self._layout(elements)
        self.pages = [[ln["text"] for ln in pg if ln["kind"] != "bullet"] for pg in pages]
        objs = []  # object bodies, object number = index + 1

        def add(body):
            objs.append(body)
            return len(objs)

        cat, pagesroot = add(b""), add(b"")
        fonts = []
        for name, base in (("F1", "Helvetica"), ("F2", "Helvetica-Bold"), ("F3", "Times-Roman")):
            fonts.append((name, add(("<< /Type /Font /Subtype /Type1 /BaseFont /%s /Encoding /WinAnsiEncoding >>" % base).encode())))
        fontres = "<< " + " ".join("/%s %d 0 R" % (n, o) for n, o in fonts) + " >>"
        kids = []
        n = len(pages)
        for i, pg in enumerate(pages):
            cs = []
            # running head and page number
            if self.running_head:
                cs.append("BT /F1 8.5 Tf 0.35 g 1 0 0 1 %d %d Tm %s Tj ET" % (self.MARGIN, self.PAGE_H - 44, _pdf_string(_cp1252(self.running_head))))
                cs.append("0.6 G 0.5 w %d %d m %d %d l S" % (self.MARGIN, self.PAGE_H - 50, self.PAGE_W - self.MARGIN, self.PAGE_H - 50))
            num = "- %d -" % (i + 1)
            cs.append("BT /F1 9 Tf 0.35 g 1 0 0 1 %.2f %d Tm %s Tj ET" % (self.PAGE_W / 2 - _width(num, 9) / 2, 38, _pdf_string(_cp1252(num))))
            cs.append("0 g")
            for ln in pg:
                fname = "F2" if ln["bold"] else ("F3" if self.serif and ln["kind"] in ("p", "li") else "F1")
                size = ln["size"]
                if self.mode == "words" and ln["kind"] not in ("bullet",):
                    x = ln["x"]
                    sp = _width(" ", size, ln["bold"], fname == "F3") + 0.12 * size   # a clear gap: a reader works the space out from it
                    for w in ln["text"].split():
                        cs.append("BT /%s %s Tf 1 0 0 1 %.2f %.2f Tm %s Tj ET" % (fname, ("%g" % size), x, ln["y"], _pdf_string(_cp1252(w))))
                        x += _width(w, size, ln["bold"], fname == "F3") + sp
                else:
                    cs.append("BT /%s %s Tf 1 0 0 1 %.2f %.2f Tm %s Tj ET" % (fname, ("%g" % size), ln["x"], ln["y"], _pdf_string(_cp1252(ln["text"]))))
            data = "\n".join(cs).encode("latin-1")
            if self.compress:
                comp = zlib.compress(data, 9)
                cobj = add(b"<< /Length %d /Filter /FlateDecode >>\nstream\n" % len(comp) + comp + b"\nendstream")
            else:
                cobj = add(b"<< /Length %d >>\nstream\n" % len(data) + data + b"\nendstream")
            pobj = add(("<< /Type /Page /Parent %d 0 R /MediaBox [0 0 %d %d] /Resources << /Font %s >> /Contents %d 0 R >>"
                        % (pagesroot, self.PAGE_W, self.PAGE_H, fontres, cobj)).encode())
            kids.append(pobj)
        objs[pagesroot - 1] = ("<< /Type /Pages /Kids [%s] /Count %d >>" % (" ".join("%d 0 R" % k for k in kids), n)).encode()
        objs[cat - 1] = ("<< /Type /Catalog /Pages %d 0 R >>" % pagesroot).encode()
        info = add(("<< /Title %s /Producer (Ingenium test corpus) >>" % _pdf_string(_cp1252(self.title))).encode())
        out = bytearray(b"%PDF-1.4\n%\xe2\xe3\xcf\xd3\n")
        offs = []
        for i, body in enumerate(objs):
            offs.append(len(out))
            out += b"%d 0 obj\n" % (i + 1) + body + b"\nendobj\n"
        xref = len(out)
        out += b"xref\n0 %d\n" % (len(objs) + 1)
        out += b"0000000000 65535 f \n"
        for o in offs:
            out += b"%010d 00000 n \n" % o
        out += b"trailer\n<< /Size %d /Root %d 0 R /Info %d 0 R >>\nstartxref\n%d\n%%%%EOF\n" % (len(objs) + 1, cat, info, xref)
        return bytes(out)

    def page_of(self, needle):
        """1-based page whose text (lines joined by a space) holds needle; None when no page does."""
        norm = lambda s: re.sub(r"\s+", " ", s)
        hits = [i + 1 for i, pg in enumerate(self.pages) if norm(needle) in norm(" ".join(pg))]
        return hits[0] if len(hits) == 1 else (None if not hits else -1)


# --------------------------------------------------------------------------------------------------------------- DOCX
_W = "http://schemas.openxmlformats.org/wordprocessingml/2006/main"
_R = "http://schemas.openxmlformats.org/officeDocument/2006/relationships"

_STYLES = """<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:styles xmlns:w="%(w)s">
<w:docDefaults><w:rPrDefault><w:rPr><w:rFonts w:ascii="Calibri" w:hAnsi="Calibri" w:cs="Calibri"/><w:sz w:val="22"/><w:szCs w:val="22"/><w:lang w:val="en-GB"/></w:rPr></w:rPrDefault>
<w:pPrDefault><w:pPr><w:spacing w:after="120" w:line="264" w:lineRule="auto"/></w:pPr></w:pPrDefault></w:docDefaults>
<w:style w:type="paragraph" w:default="1" w:styleId="Normal"><w:name w:val="Normal"/><w:qFormat/></w:style>
<w:style w:type="paragraph" w:styleId="Title"><w:name w:val="Title"/><w:basedOn w:val="Normal"/><w:next w:val="Normal"/><w:qFormat/><w:pPr><w:spacing w:after="240"/></w:pPr><w:rPr><w:b/><w:sz w:val="48"/></w:rPr></w:style>
<w:style w:type="paragraph" w:styleId="Heading1"><w:name w:val="heading 1"/><w:basedOn w:val="Normal"/><w:next w:val="Normal"/><w:qFormat/><w:pPr><w:keepNext/><w:spacing w:before="320" w:after="120"/><w:outlineLvl w:val="0"/></w:pPr><w:rPr><w:b/><w:sz w:val="34"/></w:rPr></w:style>
<w:style w:type="paragraph" w:styleId="Heading2"><w:name w:val="heading 2"/><w:basedOn w:val="Normal"/><w:next w:val="Normal"/><w:qFormat/><w:pPr><w:keepNext/><w:spacing w:before="240" w:after="100"/><w:outlineLvl w:val="1"/></w:pPr><w:rPr><w:b/><w:sz w:val="28"/></w:rPr></w:style>
<w:style w:type="paragraph" w:styleId="Heading3"><w:name w:val="heading 3"/><w:basedOn w:val="Normal"/><w:next w:val="Normal"/><w:qFormat/><w:pPr><w:keepNext/><w:spacing w:before="200" w:after="80"/><w:outlineLvl w:val="2"/></w:pPr><w:rPr><w:b/><w:i/><w:sz w:val="24"/></w:rPr></w:style>
<w:style w:type="paragraph" w:styleId="ListParagraph"><w:name w:val="List Paragraph"/><w:basedOn w:val="Normal"/><w:qFormat/><w:pPr><w:ind w:left="720"/><w:contextualSpacing/></w:pPr></w:style>
<w:style w:type="paragraph" w:styleId="Quote"><w:name w:val="Quote"/><w:basedOn w:val="Normal"/><w:qFormat/><w:pPr><w:ind w:left="567" w:right="567"/></w:pPr><w:rPr><w:i/></w:rPr></w:style>
<w:style w:type="table" w:default="1" w:styleId="TableNormal"><w:name w:val="Normal Table"/><w:uiPriority w:val="99"/><w:semiHidden/><w:tblPr><w:tblInd w:w="0" w:type="dxa"/><w:tblCellMar><w:top w:w="0" w:type="dxa"/><w:left w:w="108" w:type="dxa"/><w:bottom w:w="0" w:type="dxa"/><w:right w:w="108" w:type="dxa"/></w:tblCellMar></w:tblPr></w:style>
<w:style w:type="table" w:styleId="TableGrid"><w:name w:val="Table Grid"/><w:basedOn w:val="TableNormal"/><w:tblPr><w:tblBorders><w:top w:val="single" w:sz="4" w:space="0" w:color="808080"/><w:left w:val="single" w:sz="4" w:space="0" w:color="808080"/><w:bottom w:val="single" w:sz="4" w:space="0" w:color="808080"/><w:right w:val="single" w:sz="4" w:space="0" w:color="808080"/><w:insideH w:val="single" w:sz="4" w:space="0" w:color="808080"/><w:insideV w:val="single" w:sz="4" w:space="0" w:color="808080"/></w:tblBorders></w:tblPr></w:style>
</w:styles>""" % {"w": _W}

_NUMBERING = """<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:numbering xmlns:w="%(w)s">
<w:abstractNum w:abstractNumId="0"><w:multiLevelType w:val="hybridMultilevel"/><w:lvl w:ilvl="0"><w:start w:val="1"/><w:numFmt w:val="bullet"/><w:lvlText w:val="&#8226;"/><w:lvlJc w:val="left"/><w:pPr><w:ind w:left="720" w:hanging="360"/></w:pPr></w:lvl></w:abstractNum>
<w:abstractNum w:abstractNumId="1"><w:multiLevelType w:val="hybridMultilevel"/><w:lvl w:ilvl="0"><w:start w:val="1"/><w:numFmt w:val="decimal"/><w:lvlText w:val="%%1."/><w:lvlJc w:val="left"/><w:pPr><w:ind w:left="720" w:hanging="360"/></w:pPr></w:lvl></w:abstractNum>
<w:num w:numId="1"><w:abstractNumId w:val="0"/></w:num>
<w:num w:numId="2"><w:abstractNumId w:val="1"/></w:num>
</w:numbering>""" % {"w": _W}


def _runs(text):
    """**bold** and *italic* in a paragraph's text as Word runs."""
    out = []
    for part in re.split(r"(\*\*[^*]+\*\*|\*[^*]+\*)", text):
        if not part:
            continue
        rpr = ""
        if part.startswith("**") and part.endswith("**") and len(part) > 4:
            part, rpr = part[2:-2], "<w:rPr><w:b/></w:rPr>"
        elif part.startswith("*") and part.endswith("*") and len(part) > 2:
            part, rpr = part[1:-1], "<w:rPr><w:i/></w:rPr>"
        out.append('<w:r>%s<w:t xml:space="preserve">%s</w:t></w:r>' % (rpr, _xml_escape(part)))
    return "".join(out)


def _para(text, style=None, num=None):
    ppr = ""
    if style or num:
        ppr = "<w:pPr>"
        if style:
            ppr += '<w:pStyle w:val="%s"/>' % style
        if num:
            ppr += '<w:numPr><w:ilvl w:val="0"/><w:numId w:val="%d"/></w:numPr>' % num
        ppr += "</w:pPr>"
    return "<w:p>%s%s</w:p>" % (ppr, _runs(text))


def _table(rows, widths=None):
    cols = max(len(r) for r in rows)
    widths = widths or [int(9000 / cols)] * cols
    x = ['<w:tbl><w:tblPr><w:tblStyle w:val="TableGrid"/><w:tblW w:w="0" w:type="auto"/></w:tblPr><w:tblGrid>']
    x += ['<w:gridCol w:w="%d"/>' % w for w in widths]
    x.append("</w:tblGrid>")
    for ri, row in enumerate(rows):
        x.append("<w:tr>")
        for ci, cell in enumerate(row):
            txt = "**%s**" % cell if ri == 0 and cell else cell
            x.append('<w:tc><w:tcPr><w:tcW w:w="%d" w:type="dxa"/></w:tcPr>%s</w:tc>' % (widths[ci], _para(txt)))
        x.append("</w:tr>")
    x.append("</w:tbl>")
    return "".join(x)


def build_docx(title, elements):
    """Elements: ("title"|"h1"|"h2"|"h3"|"p"|"quote"|"li"|"ol"|"pagebreak", text) and ("table", rows)."""
    body = []
    for kind, val in elements:
        if kind == "title":
            body.append(_para(val, "Title"))
        elif kind in ("h1", "h2", "h3"):
            body.append(_para(val, "Heading" + kind[1]))
        elif kind == "p":
            body.append(_para(val))
        elif kind == "quote":
            body.append(_para(val, "Quote"))
        elif kind == "li":
            body.append(_para(val, "ListParagraph", 1))
        elif kind == "ol":
            body.append(_para(val, "ListParagraph", 2))
        elif kind == "table":
            body.append(_table(val))
            body.append("<w:p/>")
        elif kind == "pagebreak":
            body.append('<w:p><w:r><w:br w:type="page"/></w:r></w:p>')
        else:
            raise ValueError(kind)
    doc = ('<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n<w:document xmlns:w="%s" xmlns:r="%s"><w:body>%s'
           '<w:sectPr><w:pgSz w:w="11906" w:h="16838"/><w:pgMar w:top="1440" w:right="1440" w:bottom="1440" w:left="1440" w:header="708" w:footer="708" w:gutter="0"/></w:sectPr>'
           '</w:body></w:document>') % (_W, _R, "".join(body))
    types = ('<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">'
             '<Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/>'
             '<Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/>'
             '<Override PartName="/word/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.styles+xml"/>'
             '<Override PartName="/word/numbering.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.numbering+xml"/>'
             '<Override PartName="/docProps/core.xml" ContentType="application/vnd.openxmlformats-package.core-properties+xml"/></Types>')
    rels = ('<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">'
            '<Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/>'
            '<Relationship Id="rId2" Type="http://schemas.openxmlformats.org/package/2006/relationships/metadata/core-properties" Target="docProps/core.xml"/></Relationships>')
    docrels = ('<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">'
               '<Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/>'
               '<Relationship Id="rId2" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/numbering" Target="numbering.xml"/></Relationships>')
    core = ('<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n<cp:coreProperties xmlns:cp="http://schemas.openxmlformats.org/package/2006/metadata/core-properties" '
            'xmlns:dc="http://purl.org/dc/elements/1.1/"><dc:title>%s</dc:title></cp:coreProperties>') % _xml_escape(title)
    import io
    buf = io.BytesIO()
    with zipfile.ZipFile(buf, "w", zipfile.ZIP_DEFLATED, compresslevel=9) as z:
        for name, data in (("[Content_Types].xml", types), ("_rels/.rels", rels), ("word/document.xml", doc),
                           ("word/_rels/document.xml.rels", docrels), ("word/styles.xml", _STYLES),
                           ("word/numbering.xml", _NUMBERING), ("docProps/core.xml", core)):
            zi = zipfile.ZipInfo(name, date_time=(2026, 10, 31, 12, 0, 0))
            zi.compress_type = zipfile.ZIP_DEFLATED
            zi.external_attr = 0o644 << 16
            z.writestr(zi, data.encode("utf-8"))
    return buf.getvalue()


# =============================================================================================================== THE FACTS
# Every fact is stated in exactly one file. NEEDLE is an exact phrase of that file as the folder search's readers extract it
# (white space and case do not matter); the prose below puts it in with <<ID>>. The golden questions of phase 5 are these.
SPEC = [
    # id, folder, file, question, answer, needle
    ("H01", "historian_archive", "letters/1784-03-02_grieve_to_wren.txt",
     "How many hogsheads of sugar did the Mary Ann carry from Kingston in February 1784?",
     "412 hogsheads of sugar (with 38 puncheons of rum)", "412 hogsheads of sugar"),
    ("H02", "historian_archive", "letters/1785-07-19_wren_to_hollis.txt",
     "At what price did Wren agree to buy staves from the Redcliff Back cooper Ambrose Tilley?",
     "Eleven shillings the hundred (six hundred staves)", "Ambrose Tilley, the cooper of Redcliff Back"),
    ("H03", "historian_archive", "diaries/josiah_hollis_diary_1786.md",
     "What did the ship Hester cost to build?", "£2,140 (163 tons burthen)", "she measured 163 tons burthen and cost £2,140 to build"),
    ("H04", "historian_archive", "letters/1787-01-11_grieve_to_wren.txt",
     "Where and when did Captain Carew die, and of what?", "At Port Royal on 3 December 1786, of the yellow fever",
     "Captain Carew died of the yellow fever at Port Royal on the 3rd of December"),
    ("H05", "historian_archive", "articles/sugar_duties_1787.pdf",
     "What was the duty on muscovado sugar imported into Bristol in 1787?", "15 shillings the hundredweight", "15 shillings the hundredweight"),
    ("H06", "historian_archive", "finding_aids/wren_collection_guide.html",
     "What does the Wren collection hold, and who deposited it?", "214 letters, 9 account books and 31 loose maps, deposited by Eleanor Marsh in 1962",
     "214 letters, 9 account books and 31 loose maps"),
    ("H07", "historian_archive", "ledgers/wages_roll_hester_1788.csv",
     "What monthly wage was the boatswain Silas Pennock paid on the Hester in 1788?", "£3 15s 0d", "Silas Pennock,Boatswain,£3 15s 0d"),
    ("H08", "historian_archive", "chapters/chapter3_the_cooper_trade.docx",
     "How much did the firm owe the Lisbon wine merchant Joaquim da Cunha by the winter of 1790?", "£1,386 11s 4d", "£1,386 11s 4d"),
    ("H09", "historian_archive", "logbook/ship_logbooks_1781-1802.txt",
     "Who was the carpenter killed in a fall from the fore-topsail yard?", "Daniel Roke", "the carpenter, Daniel Roke, fell from the fore-topsail yard"),
    ("H10", "historian_archive", "logbook/ship_logbooks_1781-1802.txt",
     "Which Danish snow did the ship speak off Corvo?", "The Frederikke of Altona", "the Frederikke of Altona"),
    ("H11", "historian_archive", "ledgers/voyages_1781-1795.json",
     "What port dues did the Providence pay at Bristol on 8 May 1790?", "£86 4s 9d (receipt no. 7731)",
     "Paid £86 4s 9d to the Port Officer on 8 May 1790, receipt no. 7731"),
    ("H12", "historian_archive", "articles/hotwells_shipyards_1780s.pdf",
     "What was the largest vessel built at Thomas Boyd's Hotwells yard between 1781 and 1790?", "The 280-ton Africa Packet", "the 280-ton Africa Packet"),
    ("H13", "historian_archive", "diaries/dorothea_pell_journal_1789.md",
     "How much cane was lost at Pell's Rest in the storm of 17 August 1789?", "40 acres", "flattened 40 acres of cane at Pell's Rest"),
    ("H14", "historian_archive", "finding_aids/people_index.html",
     "For how long was Alexander Grieve the firm's factor at Kingston?", "From 1779 until his death in 1795",
     "served as the firm's Kingston factor from 1779 until his death in 1795"),
    ("L01", "lab_notes", "protocols/spore_germination_assay.md",
     "At what temperature and for how long are the spore germination plates incubated?", "24.5 °C for 72 hours, in the dark",
     "Incubate the plates at 24.5 °C for 72 h in the dark"),
    ("L02", "lab_notes", "protocols/autoclave_cycle.md",
     "What autoclave cycle is used for liquid volumes over 1 litre?", "121 °C at 15 psi for 35 minutes", "121 °C at 15 psi for 35 minutes"),
    ("L03", "lab_notes", "notebook/2026-03-09_batch17.txt",
     "What dry mycelium yield did batch 17 give?", "3.82 g, from 2.0 L of potato dextrose broth", "Batch 17 yielded 3.82 g of dry mycelium"),
    ("L04", "lab_notes", "notebook/2026-04-22_contamination.txt",
     "What contaminant was found on 22 April, in which flask, and how many flasks were thrown away?", "Trichoderma in flask C-14; 11 flasks",
     "contamination by Trichoderma in flask C-14"),
    ("L05", "lab_notes", "instruments/incubator_b_log_2026-05.csv",
     "What happened to Incubator B on the night of 17 May 2026?", "It reached 37.8 °C; the night porter M. Dlamini found the door ajar",
     "door found ajar (night porter M. Dlamini)"),
    ("L06", "lab_notes", "protocols/ph_meter_calibration.md",
     "Which pH electrode was replaced on 3 June 2026?", "Serial EL-40917", "Electrode serial EL-40917 was replaced on 3 June 2026"),
    ("L07", "lab_notes", "data/strain_registry.json",
     "Where was strain FX-208 isolated from?", "Beech litter at Hayley Wood (accession 2025-0173)",
     "Isolated from beech litter at Hayley Wood, accession 2025-0173"),
    ("L08", "lab_notes", "reports/q2_report_2026.pdf",
     "What did the lab spend on consumables in the second quarter of 2026?", "£14,206.50 (8% under budget)", "£14,206.50"),
    ("L09", "lab_notes", "reports/q2_report_2026.pdf",
     "How many samples were moved after the G.12 freezer failed on 5 June?", "214 samples, within 40 minutes, to room G.14", "214 samples were moved"),
    ("L10", "lab_notes", "reports/safety_audit_2026.docx",
     "What did the February 2026 safety audit find in the prep room?", "Three expired fire extinguishers, all replaced by 20 February",
     "three expired fire extinguishers"),
    ("L11", "lab_notes", "meetings/lab_meeting_2026-06-18.html",
     "Which second centrifuge did the lab decide to buy on 18 June 2026, and at what price?", "The Hettich Rotanta 460, £6,480 plus VAT", "Hettich Rotanta 460"),
    ("L12", "lab_notes", "protocols/dna_extraction.md",
     "What volume of buffer EB is used to elute the DNA, and at what temperature?", "50 µL, prewarmed to 55 °C", "Elute in 50 µL of buffer EB prewarmed to 55 °C"),
    ("L13", "lab_notes", "notebook/2026-07-02_poster_day.txt",
     "Who presented a dissertation poster on 2 July 2026, and what prize did she win?", "Priya Venkataraman; second prize",
     "Priya Venkataraman presented her dissertation poster"),
    ("R01", "household_papers", "insurance/home_policy_schedule.pdf",
     "What is the buildings sum insured on the home insurance policy?", "£385,000", "Buildings sum insured: £385,000"),
    ("R02", "household_papers", "finance/utility_bills_2025.csv",
     "Why was the March 2025 electricity bill higher than usual?", "A heat pump trial began on 12 March", "new heat pump trial from 12 March"),
    ("R03", "household_papers", "letters/plumber_quote_2025-11-03.docx",
     "Who quoted to replace the boiler, and for how much?", "Halvorsen Plumbing, £3,940", "Halvorsen Plumbing has quoted £3,940 to replace the boiler"),
    ("R04", "household_papers", "letters/school_letter_2025-03.txt",
     "Where and when is the Year 5 parents' evening?", "Thursday 13 March 2025 at 5.40 pm in Room 14", "from 5.40 pm in Room 14"),
    ("R05", "household_papers", "home/boiler_manual_notes.html",
     "What should the boiler pressure gauge read when the system is cold?", "Between 1.0 and 1.5 bar", "between 1.0 and 1.5 bar"),
    ("R06", "household_papers", "recipes/cardamom_buns.md",
     "At what temperature and for how long are the cardamom buns baked?", "200 °C for 9 minutes", "Bake at 200 °C for 9 minutes"),
    ("R07", "household_papers", "finance/mortgage_schedule.json",
     "Until when is the mortgage rate fixed, and at what rate?", "4.19% until 30 June 2028", "Fixed at 4.19% until 30 June 2028"),
    ("R08", "household_papers", "insurance/car_policy.pdf",
     "What is the registration number of the insured car?", "KX19 OPD", "registration KX19 OPD"),
    ("R09", "household_papers", "home/warranty_notes.txt",
     "Until when does the dishwasher's warranty run?", "14 August 2027", "warranty runs until 14 August 2027"),
    ("R10", "household_papers", "home/passport_reminders.txt",
     "When does Adaeze's passport expire?", "9 November 2027", "passport expires on 9 November 2027"),
]
NEEDLE = {s[0]: s[5] for s in SPEC}
FOLDERS = ["historian_archive", "lab_notes", "household_papers"]
RESTRICTED_FOLDER = "household_papers"


def T(s):
    """Prose with <<H01>>-style marks: each is replaced by that fact's needle."""
    return re.sub(r"<<([A-Z]\d\d)>>", lambda m: NEEDLE[m.group(1)], s)


def norm(s):
    return re.sub(r"\s+", " ", s.replace(" ", " ")).strip().lower()


# =========================================================================================================== THE REGISTRY
FILES = {}   # "folder/rel" -> {"data": bytes, "plain": str}
PDFS = {}    # "folder/rel" -> the PdfBuilder that wrote it (to find a fact's page)


def _put(folder, rel, data, plain):
    key = folder + "/" + rel
    if key in FILES:
        raise SystemExit("written twice: " + key)
    FILES[key] = {"data": data, "plain": plain}


def put_text(folder, rel, text, plain=None, bom=False, crlf=False, enc="utf-8"):
    t = text.replace("\r\n", "\n")
    if crlf:
        t = t.replace("\n", "\r\n")
    data = t.encode(enc, "strict")
    if bom and enc == "utf-8":
        data = b"\xef\xbb\xbf" + data
    _put(folder, rel, data, plain if plain is not None else text)


def put_pdf(folder, rel, title, elements, running_head, mode="line", serif=False, compress=True):
    b = PdfBuilder(title, running_head=running_head, mode=mode, serif=serif, compress=compress)
    data = b.build(elements)
    PDFS[folder + "/" + rel] = b
    _put(folder, rel, data, "\n".join(v for k, v in elements if isinstance(v, str) and k not in ("gap", "pagebreak")))


def put_docx(folder, rel, title, elements):
    data = build_docx(title, elements)
    plain = []
    for k, v in elements:
        if k == "table":
            plain.extend(" | ".join(r) for r in v)
        elif isinstance(v, str) and k != "pagebreak":
            plain.append(v.replace("**", ""))
    _put(folder, rel, data, "\n".join(plain))


def rng_for(key):
    return random.Random(int(hashlib.sha256(key.encode()).hexdigest()[:12], 16))


# ================================================================================================================== PROSE
# Sentence banks: a template with {slot} (a list in VOCAB or a function of the generator) or {n:lo-hi}. They fill the long files
# with plausible, varied sentences; the facts themselves are written by hand. A sentence that would hold a needle is drawn again.
MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]


def _ord(n):
    return "%d%s" % (n, "th" if 10 <= n % 100 <= 20 else {1: "st", 2: "nd", 3: "rd"}.get(n % 10, "th"))


def _money(r):
    return "£%d %ds %dd" % (r.randint(11, 78), r.randint(1, 19), r.randint(0, 11))


def _bigmoney(r):
    return "£%d %ds" % (r.randint(101, 899), r.randint(1, 19))


VOCAB = {
    "vessel": ["Mary Ann", "Providence", "Betsey", "Charming Sally", "Industry", "Union", "Amity", "Hester"],
    "port": ["Kingston", "Port Royal", "Montego Bay", "Savanna-la-Mar", "Lisbon", "Cork", "Waterford", "Liverpool", "Falmouth", "Madeira", "Bristol"],
    "commodity": ["muscovado sugar", "rum", "molasses", "cotton", "ginger", "logwood", "pimento", "coffee", "indigo", "mahogany", "Madeira wine",
                  "salt beef", "butter", "herring", "staves", "hoops", "iron bars", "cordage", "linen", "candles"],
    "unit": ["hogshead", "puncheon", "cask", "bale", "barrel", "ton", "bundle", "chest"],
    "person": ["Mr. Gadsden", "Mr. Fuller", "Mrs. Anstey", "Mr. Hale", "Messrs. Lyle & Pountney", "Mr. Withers", "Capt. Lyle", "Mr. Cranmer", "Mr. Alleyne", "Mrs. Dunning"],
    "season": ["spring", "summer", "autumn", "winter", "Christmas", "Lady Day", "Michaelmas", "midsummer"],
    "city": ["London", "Bath", "Gloucester", "Liverpool", "Exeter", "Cork", "Dublin", "Glasgow"],
    "weather": ["fresh breezes and fair weather", "light airs and a heavy swell", "squally with rain", "a strong gale from the west", "calm and hazy", "moderate and cloudy"],
    "money": _money, "bigmoney": _bigmoney,
    "pct": ["two", "three", "four", "five", "six", "seven", "ten", "twelve"],
    "adj": ["damp", "sound", "indifferent", "excellent", "poor", "middling", "very fair"],
    # the laboratory
    "organism": ["Trichoderma", "Penicillium", "Aspergillus", "Mucor", "Fusarium", "Rhizopus", "Cladosporium"],
    "medium": ["potato dextrose agar", "malt extract agar", "potato dextrose broth", "corn meal agar", "Czapek agar"],
    "labperson": ["Imani", "Priya", "Tom", "Marcus", "Dr. Okoye", "Hana", "Sven"],
    "equip": ["the plate reader", "the centrifuge", "Incubator A", "Incubator B", "the laminar flow cabinet", "the autoclave", "the pH meter", "the balance in G.14"],
    "temp": ["22", "25", "28", "30", "37"],
    "hours": ["24", "36", "48", "96"],
    "room": ["G.10", "G.12", "G.14", "G.16", "the prep room", "the cold room"],
    "sample": ["beech litter", "leaf litter", "forest soil", "compost", "peat", "root washings"],
    # the household
    "day": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    "room_h": ["kitchen", "hall", "back bedroom", "bathroom", "utility room", "garage", "loft", "garden shed"],
    "tradesman": ["the electrician", "the roofer", "the window cleaner", "the gas engineer", "the gardener", "the carpenter"],
    "household": ["Adaeze", "Lars", "Kaito", "Sigrid", "Grandma Nkechi", "Uncle Bjorn"],
}
BANKS = {
    "trade": [
        "The price of {commodity} in the Bristol market stood at {money} the hundredweight when the {vessel} came up the Avon, and I doubt it will hold.",
        "Freight to {port} is now {freight} the ton, and the underwriters at the Exchange ask {pct} per cent for the voyage.",
        "I cannot tell you how the {commodity} will sell until the {season} fleet is in, for the grocers of {city} are buying from hand to mouth.",
        "Your account of the {commodity} is noted, but the sample you sent was {adj}, and I would not take more than {n:20-90} {unit}s on those terms.",
        "We have drawn on you at sixty days for {bigmoney}, which I beg you will honour, and charge the same to the cargo of the {vessel}.",
        "The cooper reports that the casks of the last lot were green and weeping, and that {n:3-19} of them had to be re-hooped before the lighter would take them.",
        "A letter from {person} at {city} says that {commodity} will be taken only at a discount of {pct} per cent, which I have declined.",
        "The {vessel} lay {n:4-19} days in the river waiting for a wind, and her master asks that his demurrage be allowed.",
        "It is the opinion of the underwriters that the risk to {port} is not increased by the late news, and I have insured accordingly.",
        "Be so good as to send by the next conveyance a statement of what stands to our credit with {person}, for the half-yearly balance is close at hand.",
        "I have seen {person} at the Exchange, and payment for the {commodity} is promised before {season}.",
        "The warehouse in Queen Square is full of {commodity}, and until the {vessel} is cleared I cannot receive any more.",
        "The wharfinger asks {money} for the landing of the {commodity}, which I think too much, and I have told him so.",
        "The clerk has copied the bill of lading twice, as {person} would not accept the first for the want of a seal.",
        "If the {commodity} is damp on arrival we shall claim upon the underwriters, and I beg you to have a surveyor's certificate ready.",
        "I enclose the account of sales of the {commodity}, from which you will see that the net proceeds were {bigmoney} after all charges.",
    ],
    "voyage": [
        "The {vessel} sailed from {port} on the {n:2-27}th with {commodity} and {commodity}, and has not since been heard of.",
        "Captain {master} reports {weather} all the way from the Lizard, and the ship making {n:2-9} knots.",
        "Her people were employed in scraping the decks, overhauling the rigging and stowing the {unit}s, and none was sick.",
        "Spoke a brig bound for {port}, whose master told us that {commodity} was dear there and the roads full of shipping.",
        "At noon we observed in latitude {n:18-49} degrees north, and the ship was by account {n:100-600} leagues from the land.",
        "The pumps were worked an hour in every watch, the ship being somewhat leaky in the upper works.",
        "Served the people their allowance of beef and pork, with a pint of rum between four, as is the custom of the voyage.",
        "Made sail at daylight with a fair wind; the {vessel} came to anchor in {port} roads in the afternoon.",
        "Captain {master} thought the {vessel} sailed best with a little weather helm and her topsails reefed.",
        "The mate mustered the people at four bells and found every man present, which had not happened since leaving {port}.",
    ],
    "history": [
        "The sugar trade of the eighteenth century rested upon credit, and credit rested upon the character of the man who gave it.",
        "A merchant of Bristol who lost a ship in the autumn might find that his factors in {port} had already drawn upon him for the whole of the spring crop.",
        "The correspondence shows a house that was careful rather than bold, and which seldom put more than a third of its capital into any one voyage.",
        "Historians have long debated how far the Bristol houses depended upon the Jamaica planters, and how far the planters upon them.",
        "Insurance was dear, and the underwriters of the Exchange coffee house were slow to pay a claim that touched upon the capture of a vessel.",
        "What survives is uneven: whole years are missing, and the letters that remain were kept, as often as not, because they recorded a debt.",
        "The reader who comes to these papers expecting the great questions of the age will find instead a very close attention to casks, hoops and freight.",
        "The firm's books were kept in the Italian manner, but the clerks of the period were not always consistent in their treatment of the discount.",
        "The wages of seamen were fixed by the month, and a man discharged abroad had a claim to his pay up to the day of his discharge.",
        "It is the small entries, the cost of a boat or the loan of a lantern, that tell us most about the daily life of the quay.",
        "No account of the trade can ignore the part played by the factors, who stood between the planter and the merchant and took a commission from both.",
        "Freight rates moved with the season and with the news from Europe, and a rumour of war could double the cost of a voyage within a week.",
        "The river Avon, with its great tidal range, shaped the working day of every merchant in the city; ships could move only at the top of the tide.",
        "The cooper's trade was as important as the shipwright's, for a cask that leaked was a cargo lost, and the cost fell on the owner.",
        "Letters took from five to eight weeks to cross the Atlantic, so that every decision was made on information that was already out of date.",
        "The partners wrote to each other even when they lived a mile apart, partly from habit and partly because a letter was a record that could be shown to a court.",
        "Where the surviving accounts can be checked against the port books, they are in general remarkably accurate, if rarely complete.",
        "Seen from the counting house, the abolition debates of the period were at first a distant noise, and only later a matter of direct concern.",
        "The chapter that follows rests chiefly upon the letters of the years 1783 to 1790, which are the most complete in the collection.",
        "The volume of trade can be estimated from the duties paid, though the figures need to be read with care, since cargoes were often entered at a round number.",
        "A ship's master was at once a navigator, a trader and a disciplinarian, and the owners trusted him with a good deal more than the sailing of the vessel.",
        "Credit was extended for months at a time, and a house that called in its debts too sharply would soon find itself without correspondents.",
        "Some of the most revealing documents in the collection are the least formal: a note about a wet cargo, or a list of things to be bought for a ship.",
        "The Hotwells yards, a short distance below the city, were able to build for owners from Bristol, Liverpool and London alike.",
    ],
    "lab_method": [
        "Plates were incubated at {temp} °C for {hours} h before counting, and each count was made by two people.",
        "{labperson} prepared {n:6-24} replicates of {medium} and logged the lot numbers in the notebook.",
        "The {sample} was sieved through a 2 mm mesh, homogenised, and stored at 4 °C until the extraction.",
        "{equip} was checked before the run and showed no drift against the reference.",
        "Samples were thawed on ice, vortexed for {n:10-60} s, and spun at {n:2000-12000} g for {n:3-15} minutes.",
        "Negative controls were run with every batch; none showed growth, and the blanks read within the usual range.",
        "A 10-fold dilution series to 10^-6 was plated in triplicate on {medium}.",
        "The pellet was resuspended in {n:50-500} µL of sterile water and transferred to a clean tube.",
        "All media were autoclaved and poured in {room}, and the plates were dried for {n:15-45} minutes in the cabinet.",
        "Colony counts were entered into the shared sheet the same day, with the plate identifiers written as on the lids.",
        "The {sample} came from three sites, and each site was sampled at {n:3-9} points along a transect.",
        "Absorbance was read at 600 nm after shaking for {n:5-30} seconds, and blanks were subtracted before analysis.",
        "{labperson} repeated the assay on a second day to check that the result did not depend on the batch of medium.",
        "Cultures were inspected daily under the dissecting microscope, and any plate with a foreign colony was discarded.",
    ],
    "lab_admin": [
        "{labperson} will order the {medium} and the pipette tips for next month, and asked everyone to put requests in the sheet by Friday.",
        "The booking sheet for {equip} was reorganised so that overnight runs are marked clearly.",
        "{labperson} reminded the group that waste from {room} goes into the yellow bins and sharps into the rigid containers.",
        "Training on the new plate reader is arranged for the first week of the month; {labperson} will run it.",
        "The cold room in {room} will be defrosted over the weekend, so nothing should be left on the floor shelves.",
        "A reminder that all new strains need an accession number from {labperson} before they go into the freezer.",
        "The department asked for the equipment inventory to be updated; {labperson} has the spreadsheet.",
        "{labperson} will cover the weekend checks of {equip} until the end of the month.",
        "The shared fridge in {room} was cleared out, and anything unlabelled was thrown away.",
        "Visitors to {room} must sign the book and be accompanied at all times.",
    ],
    "house": [
        "{tradesman} came on {day} and said the {room_h} would need another visit, which he will confirm by message.",
        "{household} has put the bins out on {day}; the recycling goes out on alternate weeks.",
        "The {room_h} was repainted over the weekend, and the old colour sample is kept in the cupboard in the hall.",
        "We should call {tradesman} before the end of the {season} to see whether the gutters have been cleared.",
        "{household} noted that the smoke alarm in the {room_h} chirped again and needs a new battery.",
        "The postman left a card on {day}; the parcel is at the sorting office until the end of the week.",
        "A reminder that the council collects garden waste on {day}, and the brown bin must be out by seven.",
        "{household} will phone about the quote before {day}, and we agreed to compare it with at least one other.",
        "The {room_h} light has been flickering since {day}; {tradesman} thinks it is the switch and not the wiring.",
        "Keep all receipts for work on the {room_h} in the blue folder with the guarantees.",
    ],
}
VOCAB.update({
    "freight": ["£3 10s", "£4 5s", "£4 15s", "£5 0s", "£6 10s", "£7 5s", "£8 0s"],
    "master": ["Carew", "Ainsley", "Pryce", "Kemp", "Lyle", "Voss"],
})


def _fill(r, t):
    def rep(m):
        name = m.group(1)
        if ":" in name:
            lo, hi = name.split(":")[1].split("-")
            return str(r.randint(int(lo), int(hi)))
        v = VOCAB[name]
        return r.choice(v) if isinstance(v, list) else v(r)
    return re.sub(r"\{([^{}]+)\}", rep, t)


_BAD = [norm(s[5]) for s in SPEC]


def sent(r, bank):
    for _ in range(40):
        s = _fill(r, r.choice(BANKS[bank]))
        s = s[0].upper() + s[1:]
        if not any(b in norm(s) for b in _BAD):
            return s
    raise SystemExit("could not draw a sentence from " + bank)


def para(r, bank, lo=3, hi=6):
    return " ".join(sent(r, bank) for _ in range(r.randint(lo, hi)))


def paras(r, bank, n, lo=3, hi=6):
    return [para(r, bank, lo, hi) for _ in range(n)]


# ====================================================================================================== HISTORIAN'S ARCHIVE
H = "historian_archive"


def letter(rel, place, addressee, paras_, close, signer, bom=False, crlf=False, bank_paras=0):
    r = rng_for(rel)
    body = list(paras_)
    for p in paras(r, "trade", bank_paras, 3, 5):
        body.insert(r.randint(1, len(body)), p)
    text = place + "\n\n" + addressee + "\n\nSir,\n\n" + "\n\n".join(body) + "\n\n" + close + "\n\n" + signer + "\n"
    put_text(H, rel, text, bom=bom, crlf=crlf)


def build_letters():
    letter("letters/1783-11-04_wren_to_grieve.txt", "Bristol, Queen Square, 4th November 1783.", "Mr. Alexander Grieve,\nMerchant at Kingston, in the Island of Jamaica.",
           ["I have yours of the 2nd of August by the Betsey, Capt. Lyle, with the account of the crop and the particulars of the shipments you have made on our joint account. "
            "I am obliged to you for the care you have taken, and I am glad to learn that the sugars of the present year are better coloured than those of the last, for the grocers "
            "here pay a full price for a bright sugar and complain loudly of a dark one.",
            "My partner Mr. Hollis and I have resolved to send out the Mary Ann again after Christmas, and to put on board her such goods as you advise: the iron, the coarse linens, "
            "the salt beef and butter from Cork, and as many hoops and staves as the cooper can supply. You will please to have her loaded with all despatch on her arrival, since "
            "every day she lies in your harbour costs us in wages and provisions what a hogshead of sugar would fetch at home."],
           "I remain, Sir, your most obedient humble servant,", "Tobias Wren", bank_paras=3)
    letter("letters/1784-03-02_grieve_to_wren.txt", "Kingston, Jamaica, 2nd March 1784.", "Mr. Tobias Wren,\nMerchant in Bristol.",
           [T("I have the pleasure to inform you that the Mary Ann cleared Kingston on the 14th of February with <<H01>> and 38 puncheons of rum, being as full as she could swim, "
              "and that her master, Capt. Carew, expressed himself well satisfied with the stowage. The sugars are of a good grain and colour, and I have no doubt they will do you credit "
              "in the Bristol market. The rum is of the usual proof; I would not recommend you to hold it long, for the price here has already begun to fall."),
            "You will find enclosed the bills of lading, the invoice, and my account current to the end of January, by which you will see a balance of some £212 in your favour after "
            "the charges of wharfage, lighterage and commission have been deducted. I have drawn on you for nothing beyond the ordinary.",
            "The Providence, Capt. Ainsley, is expected from Cork within the fortnight with the butter and beef; and I shall endeavour to have her sail for England before the hurricane months, "
            "though the planters are slow, as they always are, in getting their crops down to the wharves."],
           "I am, Sir, with great regard, your obliged servant,", "Alex. Grieve", bank_paras=4)
    letter("letters/1785-07-19_wren_to_hollis.txt", "Bristol, 19th July 1785.", "Mr. Josiah Hollis,\nat the counting house in Queen Square.",
           [T("Since you are to be from town until Michaelmas I put down in writing what has been settled with the cooper, lest either of us forget it. I have agreed with Mr. <<H02>>, to supply "
              "six hundred staves at eleven shillings the hundred, to be delivered at the quay before Michaelmas and not a day later, the wood to be sound oak, seasoned at least a year, "
              "and free of sap. He has asked to be paid a third in advance, which I have refused, offering instead to pay on delivery in cash and not by bill."),
            "I must beg you to look carefully at the hoops when they come. The last lot was too thin to hold, and I will not again pay for iron that gives way at the first roll. "
            "If Mr. Tilley complains, remind him that he gave his word on the matter in the presence of Capt. Carew."],
           "Your affectionate friend and partner,", "T. Wren", bank_paras=3)
    letter("letters/1786-12-30_hollis_to_wren.txt", "Bristol, 30th December 1786.", "Mr. Tobias Wren,\nat Clifton.",
           ["The Hester lies at the Hotwells quay with her masts stepped and her standing rigging set up, and Mr. Boyd's foreman tells me that she will be ready for her stores by the middle of January. "
            "I have engaged Capt. Pryce as her master on the terms we discussed, and he has already begun to look about him for a mate and a boatswain who know the Jamaica trade.",
            "I have not yet had the Kingston letters by the December packet, and I am uneasy at their delay. If you hear anything at Clifton, let me know by the next post, for I will not "
            "write to the underwriters until I am certain of the facts."],
           "Ever yours,", "J. Hollis", bank_paras=4, crlf=True)
    letter("letters/1787-01-11_grieve_to_wren.txt", "Kingston, Jamaica, 11th January 1787.", "Mr. Tobias Wren,\nMerchant in Bristol.",
           [T("It is my painful duty to acquaint you that <<H04>>, after an illness of only four days. He was buried the next morning in the churchyard of St. Peter, and "
              "the officers of the Port Royal station were pleased to attend. I have taken possession of his chest and papers, which I will send by the first safe conveyance, "
              "and have paid the mate, Mr. Kemp, his wages to the day, in the presence of two witnesses."),
            "The ship is not damaged, and her cargo is safe in my warehouse. Mr. Kemp is a steady man, but I do not think him fit to take her home, and I should be glad of your orders as to whether "
            "you would have me engage a master here, or wait until you can send one from England. I have sounded Capt. Ainsley, who is willing to take her at the usual terms."],
           "I am, with sincere regret, Sir, your obedient servant,", "Alex. Grieve", bank_paras=3)
    letter("letters/1788-05-23_crew_petition_hester.txt", "On board the ship Hester, lying at Kingston, 23rd May 1788.", "To Messrs. Wren and Hollis, Merchants,\nof the City of Bristol.",
           ["We the undersigned, being the seamen of the ship Hester, beg leave humbly to represent that the allowance of provisions on the passage out was short of what was promised "
            "in the articles, the bread being full of weevils and the beef so salt that it could not be eaten without a quantity of water, which we were not always allowed.",
            "We do not complain of the master, who has been a just man, but of the steward, who sold part of the stores at Cork, as we believe, and we pray that an inquiry may be made. "
            "We have all of us served the owners faithfully, and hope that this petition will be received in the spirit in which it is made."],
           "We are, Gentlemen, your humble servants,", "(signed with their marks by fourteen of the crew)", crlf=True, bank_paras=2)
    letter("letters/1790-02-08_wren_to_cork_contractor.txt", "Bristol, 8th February 1790.", "Mr. Henry Alleyne,\nProvision merchant at Cork.",
           ["I write to confirm the contract for the supply of salt beef and butter for the Providence and the Hester for the present year. The beef is to be of the best mess quality, "
            "packed in new barrels of the Cork pattern, and the butter in firkins of not less than sixty-four pounds, the whole to be inspected by the sworn brander before it is shipped.",
            "The price we have discussed is satisfactory to me, but I must insist upon prompt delivery, for the ships will not wait. If you cannot supply the quantity in the time, I shall "
            "be obliged to apply elsewhere, and I should regret that, since we have dealt together a good many years."],
           "I am, Sir, your most obedient servant,", "Tobias Wren", bom=True, crlf=True, bank_paras=3)
    letter("letters/1795-09-14_wren_to_hollis_accounts.txt", "Clifton, 14th September 1795.", "Mr. Josiah Hollis,\nQueen Square, Bristol.",
           ["I have gone through the half-yearly accounts with the clerk and find them correct, with one exception, which is the item for the repairs of the Providence in the spring. "
            "The shipwright's bill is for nearly twice what he told me to expect, and I wish you to see him and ask him to explain the difference before we pay it.",
            "As to the future, I have been thinking a good deal of late of retiring from active business, and I would be glad to talk it over with you when you are next at Clifton. "
            "I do not wish to leave you with more than you can manage, and I think we might arrange for Mr. Fuller to come into the firm."],
           "Believe me, dear Hollis, your affectionate friend,", "Tobias Wren", bank_paras=4)


def diary_hollis_1786():
    r = rng_for("diary1786")
    out = ["# Journal of Josiah Hollis, 1786", "",
           "Kept at the counting house in Queen Square and at Hotwells. Transcribed from the original volume in the Wren collection.", ""]
    for m in ["January", "February", "March", "April", "May", "June", "July", "August"]:
        out += ["## " + m, ""]
        out += paras(r, "history", 2, 3, 5) + [""]
        out += [para(r, "voyage", 3, 5), ""]
    out += ["## September", "",
            "The shipwrights have worked all month, and the Hester is nearly ready for launching. I give the days as they happened.", "",
            "### 12 September 1786", "", para(r, "trade", 2, 4), "",
            "### 20 September 1786", "", para(r, "history", 2, 3), "",
            "### 27 September 1786", "",
            T("Launched the Hester at Hotwells this morning on the top of the tide, in the presence of Mr. Wren, Mr. Boyd and a great crowd from the quay. <<H03>>, "
              "which is some £140 more than Mr. Boyd's estimate, owing to the price of oak. The christening was performed by Mrs. Wren, and the men were given a barrel of beer."), "",
            "### 30 September 1786", "", para(r, "trade", 2, 3), "",
            "## October", ""]
    out += paras(r, "history", 3, 3, 5) + [""]
    out += ["## November", ""] + paras(r, "voyage", 2, 3, 5) + [""]
    out += ["## December", ""] + paras(r, "trade", 2, 3, 6) + [""]
    put_text(H, "diaries/josiah_hollis_diary_1786.md", "\n".join(out) + "\n")


def diary_hollis_1788():
    r = rng_for("diary1788")
    out = ["# Journal of Josiah Hollis, 1788", ""]
    for m in ["Spring", "Summer", "Autumn"]:
        out += ["## " + m + " term", ""]
        out += paras(r, "history", 5, 4, 6) + [""]
        out += ["### The accounts", ""] + [para(r, "trade", 3, 5), ""]
        out += ["### The ships", ""] + [para(r, "voyage", 3, 5), ""]
    out += ["Setext heading: the winter", "---------------------------", ""] + paras(r, "history", 2, 3, 5) + [""]
    put_text(H, "diaries/josiah_hollis_diary_1788.md", "\n".join(out) + "\n", crlf=True)


def diary_pell_1789():
    r = rng_for("pell1789")
    out = ["# Journal kept at Pell's Rest, St. Elizabeth, Jamaica, 1789", "",
           "Dorothea Pell, widow, kept this journal for her nephew in England. The spelling is modernised.", "",
           "## The weather", ""]
    out += paras(r, "voyage", 2, 3, 4) + [""]
    out += ["### The storm of August", "",
            T("The great storm of 17 August 1789 came in the night with a wind from the south-east such as no one living here had known. By morning it had <<H13>> and carried off the roof of the boiling house; "
              "the negro houses on the lower side were flooded, and the road to the bay was impassable for a week. My overseer, Mr. Marlow, thinks that we shall make scarcely half our usual crop."), "",
            "## The estate", ""]
    out += paras(r, "history", 6, 3, 5) + [""]
    out += ["## Correspondence", ""] + paras(r, "trade", 3, 3, 5) + [""]
    put_text(H, "diaries/dorothea_pell_journal_1789.md", "\n".join(out) + "\n")


def memoranda_wren():
    r = rng_for("memoranda")
    out = ["# Memoranda of Tobias Wren", "", "A commonplace book of lists and reminders, 1784 to 1792.", "",
           "## Things to be done before the fleet sails", ""]
    for _ in range(6):
        out.append("- " + sent(r, "trade"))
    out += ["", "## Order of the day at the counting house", ""]
    for i, _ in enumerate(range(5), 1):
        out.append("%d. %s" % (i, sent(r, "voyage")))
    out += ["", "## Prices current at Bristol, October 1786", "",
            "| Article | Unit | Price |", "|---|---|---|"]
    for a, u in [("Muscovado sugar", "cwt"), ("Rum", "gallon"), ("Cotton", "lb"), ("Ginger", "cwt"), ("Logwood", "ton"), ("Oak staves", "hundred"), ("Salt beef", "barrel"), ("Cork butter", "firkin")]:
        out.append("| %s | %s | %s |" % (a, u, _money(r)))
    out += ["", "## Notes on the law of insurance", "", "```", "premium = value x rate", "rate: 4 to 7 per cent in peace, 12 to 20 in war", "```", ""]
    out += paras(r, "history", 2, 3, 4)
    put_text(H, "diaries/tobias_wren_memoranda.md", "\n".join(out) + "\n")


PAGE_TOP = """<!DOCTYPE html>
<html lang="en"><head><meta charset="utf-8"><title>%s</title>
<style>body{font-family:Georgia,serif;margin:2em}nav a{margin-right:1em}</style>
<script>window.dataLayer = []; function track() { return "<h1>not part of the page</h1>"; }</script></head>
<body>
<nav><a href="/">Home</a> <a href="/collections">Collections</a> <a href="/visit">Visit</a> <a href="/contact">Contact the archive</a></nav>
"""
PAGE_END = "\n<footer><p>&copy; the Archive. Page last updated 31 October 2026.</p></footer>\n</body></html>\n"


def html_page(title, inner):
    return (PAGE_TOP % title) + inner + PAGE_END


def finding_aids():
    r = rng_for("findingaid")
    inner = """<header><h1>The Wren Papers: a guide to the collection</h1></header>
<main>
<h2>Scope and content</h2>
<p>The papers of the Bristol sugar house of Wren &amp; Hollis, 1779&ndash;1802. %s, deposited at Bristol Archives by Eleanor Marsh in 1962.</p>
<p>%s</p>
<h2>Arrangement</h2>
<p>The collection is arranged in five series, listed here with their references and extent.</p>
<table>
<tr><th>Series</th><th>Reference</th><th>Dates</th><th>Extent</th></tr>
<tr><td>Letters received and copied</td><td>WP/1</td><td>1779&ndash;1798</td><td>3 boxes</td></tr>
<tr><td>Account books and ledgers</td><td>WP/2</td><td>1780&ndash;1796</td><td>9 volumes</td></tr>
<tr><td>Ships' papers and logbooks</td><td>WP/3</td><td>1781&ndash;1802</td><td>2 boxes</td></tr>
<tr><td>Maps and plans</td><td>WP/4</td><td>1770&ndash;1800</td><td>31 items</td></tr>
<tr><td>Personal papers</td><td>WP/5</td><td>1785&ndash;1803</td><td>1 box</td></tr>
</table>
<h2>Access</h2>
<h3>Reading room</h3>
<p>The papers may be consulted in the reading room by appointment. Some volumes are fragile and are issued only in the presence of a member of staff.</p>
<h3>Copying</h3>
<p>Photography is allowed without flash. Copies of individual items can be ordered, and the archive asks that users acknowledge the collection as <em>Bristol Archives, Wren Papers</em>.</p>
<h2>Provenance</h2>
<p>%s</p>
<ul><li>The letters were kept by the firm's clerks in bundles tied by year.</li><li>The account books came with the letters from the same house.</li><li>The maps were found rolled in a tin trunk.</li></ul>
<h2>Related material</h2>
<p>%s</p>
<h2>Administrative history</h2>
%s
</main>""" % (T("The collection comprises <<H06>>"), para(r, "history", 3, 4), para(r, "history", 3, 4), para(r, "history", 2, 3), "\n".join("<p>%s</p>" % para(r, "history", 4, 6) for _ in range(6)))
    put_text(H, "finding_aids/wren_collection_guide.html", html_page("The Wren Papers: a guide", inner))
    people = [("Wren, Tobias", "senior partner", "Merchant of Queen Square; retired to Clifton in 1796."),
              ("Hollis, Josiah", "junior partner", "Kept the journals; took over the firm in 1796."),
              ("Grieve, Alexander", "factor at Kingston", T("Grieve <<H14>>.")),
              ("Carew, Edmund", "master of the Mary Ann", "Master from 1781 to 1786."),
              ("Pryce, Nathaniel", "master of the Hester", "Master from 1787."),
              ("Ainsley, Hugh", "master of the Providence", "Also sailed in the Cork trade."),
              ("Tilley, Ambrose", "cooper", "Supplied staves and hoops from Redcliff Back."),
              ("Boyd, Thomas", "shipbuilder", "Yard at Hotwells."),
              ("Pell, Dorothea", "planter", "Widow; estate in St. Elizabeth parish."),
              ("Kemp, Samuel", "mate", "Served on the Mary Ann and the Hester."),
              ("Marsh, Eleanor", "archivist", "Deposited the collection; keeper of the city's records in the 1960s."),
              ("Fuller, John", "clerk and later partner", "Joined the firm in 1796."),
              ("Alleyne, Henry", "provision merchant", "Of Cork; contractor for beef and butter.")]
    rows = "\n".join("<tr><td>%s</td><td>%s</td><td>%s</td></tr>" % p for p in people)
    inner = """<h1>People in the Wren Papers</h1>
<p>An index of the people named most often. Dates are those of the papers, not of the lives.</p>
<table><thead><tr><th>Name</th><th>Role</th><th>Notes</th></tr></thead><tbody>
%s
</tbody></table>
<h2>How to use this index</h2>%s""" % (rows, "\n".join("<p>%s</p>" % para(r, "history", 4, 6) for _ in range(6)))
    put_text(H, "finding_aids/people_index.html", html_page("People in the Wren Papers", inner))
    ships = [("Mary Ann", "brig", "Bristol", "1779", "Carew, then Kemp"), ("Providence", "snow", "Bristol", "1783", "Ainsley"), ("Hester", "ship", "Hotwells", "1786", "Pryce"),
             ("Betsey", "brig", "Liverpool", "1775", "Lyle (chartered)")]
    rows = "\n".join("<tr><td>%s</td><td>%s</td><td>%s</td><td>%s</td><td>%s</td></tr>" % s for s in ships)
    inner = """<h1>Ships and voyages</h1>
<p>The vessels named in the papers and where they were built. The voyages are listed in the ledgers.</p>
<table><tr><th>Vessel</th><th>Rig</th><th>Built at</th><th>Year</th><th>Masters</th></tr>
%s</table>
<h2>Voyages</h2>%s
<ol><li>%s</li><li>%s</li><li>%s</li></ol>""" % (rows, "<p>" + para(r, "voyage", 3, 4) + "</p>", sent(r, "voyage"), sent(r, "voyage"), sent(r, "trade"))
    put_text(H, "finding_aids/ships_and_voyages.html", html_page("Ships and voyages", inner))


def _csv(rows):
    def cell(c):
        c = str(c)
        return '"%s"' % c.replace('"', '""') if any(x in c for x in ',"\n') else c
    return "\n".join(",".join(cell(c) for c in r) for r in rows) + "\n"


def ledgers():
    r = rng_for("ledgers")
    # the cargo of the Mary Ann, 1784
    rows = [["Date", "Commodity", "Quantity", "Unit", "Consignee", "Notes"]]
    items = [("muscovado sugar", "hogshead", 40), ("rum", "puncheon", 30), ("molasses", "cask", 12), ("ginger", "bag", 15), ("pimento", "bag", 9), ("logwood", "ton", 6), ("cotton", "bale", 8)]
    for i in range(62):
        com, unit, mx = r.choice(items)
        rows.append(["1784-02-%02d" % (1 + i % 14), com, r.randint(2, mx), unit, r.choice(["Wren & Hollis", "Messrs. Lyle & Pountney", "Mr. Gadsden", "Mr. Fuller", "Mrs. Anstey"]),
                     r.choice(["", "", "", "damaged in the hold", "re-coopered at Kingston", "marked W&H", "on deck"])])
    put_text(H, "ledgers/cargo_manifest_maryann_1784.csv", _csv(rows))
    # the wages roll of the Hester, 1788
    ranks = [("Master", "£8 0s 0d"), ("Mate", "£4 10s 0d"), ("Boatswain", "£3 15s 0d"), ("Carpenter", "£4 0s 0d"), ("Cook", "£2 5s 0d"), ("Seaman", "£2 0s 0d"), ("Boy", "£0 15s 0d")]
    first = ["Thomas", "William", "John", "James", "Robert", "Henry", "George", "Samuel", "Joseph", "Edward", "Richard", "Charles", "David", "Peter", "Isaac"]
    last = ["Hale", "Cox", "Price", "Webb", "Gould", "Sully", "Tuck", "Voss", "Neale", "Pardoe", "Heath", "Ludlow", "Crane", "Rudge", "Ellis", "Bray", "Hurd", "Pound"]
    rows = [["Name", "Rank", "Monthly wage", "Signed"], ["Nathaniel Pryce", "Master", "£8 0s 0d", "N. Pryce"], ["Samuel Kemp", "Mate", "£4 10s 0d", "S. Kemp"]]
    names = set()
    while len(rows) < 27:
        nm = r.choice(first) + " " + r.choice(last)
        if nm in names or nm == "Silas Pennock":
            continue
        names.add(nm)
        rk = r.choice(ranks[3:])
        rows.append([nm, rk[0], rk[1], r.choice(["X his mark", "X his mark", nm.split()[1][0] + "." + nm.split()[1]])])
    rows.insert(4, ["Silas Pennock", "Boatswain", "£3 15s 0d", "S. Pennock"])
    put_text(H, "ledgers/wages_roll_hester_1788.csv", _csv(rows).replace("Silas Pennock,Boatswain", "Silas Pennock,Boatswain"), crlf=True)
    # port duties
    rows = [["Date", "Vessel", "Entered from", "Duty", "Receipt no."]]
    n = 7300
    for i in range(78):
        n += r.randint(1, 9)
        rows.append(["%d-%02d-%02d" % (r.randint(1787, 1790), r.randint(1, 12), r.randint(1, 28)), r.choice(["Mary Ann", "Providence", "Hester", "Betsey", "Industry"]),
                     r.choice(["Kingston", "Cork", "Lisbon", "Montego Bay", "Madeira"]), _money(r), n if n != 7731 else 7732])
    rows.sort(key=lambda x: x[0] if x[0] != "Date" else "")
    put_text(H, "ledgers/port_duties_1787-1790.csv", _csv(rows))
    # voyages (JSON)
    voyages = []
    names = [("Mary Ann", "Carew"), ("Providence", "Ainsley"), ("Hester", "Pryce"), ("Mary Ann", "Kemp")]
    for i in range(14):
        v, m = names[i % 4]
        y = 1781 + i
        rec = {"id": "V%02d" % (i + 1), "vessel": v, "master": m, "departed": "%d-%02d-%02d" % (y, r.randint(1, 12), r.randint(1, 28)),
               "ports": r.sample(["Bristol", "Kingston", "Port Royal", "Cork", "Lisbon", "Madeira", "Montego Bay"], 3),
               "cargo": {"sugar_hogsheads": r.randint(180, 520), "rum_puncheons": r.randint(10, 60), "other": r.choice(["ginger", "logwood", "cotton", "pimento"])},
               "crew": r.randint(12, 24), "notes": para(r, "voyage", 1, 2)}
        voyages.append(rec)
    voyages[8]["vessel"], voyages[8]["master"] = "Providence", "Ainsley"
    voyages[8]["notes"] = T("<<H11>>. The vessel was cleared the same afternoon.")
    doc = {"collection": "Wren Papers, WP/2", "compiled": "2026-10-31", "voyages": voyages, "totals": {"voyages": len(voyages), "note": "Figures are as the clerks entered them."}}
    put_text(H, "ledgers/voyages_1781-1795.json", json.dumps(doc, indent=1, ensure_ascii=False) + "\n")
    # catalogue export
    recs = []
    for i in range(1, 61):
        series = ["WP/1", "WP/2", "WP/3", "WP/4", "WP/5"][i % 5]
        recs.append({"ref": "%s/%d" % (series, i), "title": sent(r, "history")[:70].rstrip(".") + ".", "dates": "%d-%d" % (1779 + i % 12, 1780 + i % 12 + 1), "extent": "%d item%s" % (1 + i % 4, "" if i % 4 == 0 else "s")})
    put_text(H, "ledgers/catalogue_export.json", json.dumps({"series": ["WP/1", "WP/2", "WP/3", "WP/4", "WP/5"], "records": recs}, indent=2, ensure_ascii=False) + "\n", crlf=True)


def pdf_article(folder, rel, title, sections, running_head, mode="line", serif=False, subtitle=None):
    els = [("title", title)]
    if subtitle:
        els.append(("p", subtitle))
    for h, items in sections:
        if h:
            els.append(("h1", h))
        for it in items:
            if isinstance(it, tuple):
                els.append(it)
            else:
                els.append(("p", it))
    put_pdf(folder, rel, title, els, running_head, mode=mode, serif=serif)


def articles():
    r = rng_for("articles")
    pdf_article(H, "articles/sugar_duties_1787.pdf", "The Sugar Duties of 1787 and the Bristol Refiners",
                [("Introduction", paras(r, "history", 4, 4, 6)),
                 ("The structure of the duties", paras(r, "history", 6, 4, 6) + [("li", sent(r, "history")), ("li", sent(r, "history")), ("li", sent(r, "trade"))]),
                 ("The rate in 1787", [T("In 1787 the duty on muscovado sugar imported into Bristol stood at <<H05>>, and the Treasury did not raise it until the spring of 1789. "
                                         "The refiners, who had expected a reduction after the Treaty of Versailles, complained to the Customs that the rate fell most heavily upon the coarser sorts.")]
                  + paras(r, "history", 4, 4, 6)),
                 ("The effect on the Bristol trade", paras(r, "trade", 4, 4, 6) + paras(r, "history", 2, 4, 5)),
                 ("Conclusion", paras(r, "history", 2, 4, 5)),
                 ("Notes", [sent(r, "history"), sent(r, "history"), sent(r, "trade")])],
                "Offprint series | The Wren Papers in Context | Sugar duties")
    pdf_article(H, "articles/hotwells_shipyards_1780s.pdf", "The Hotwells Shipyards in the 1780s",
                [("Introduction", paras(r, "history", 5, 4, 6)),
                 ("The yards on the Avon", paras(r, "history", 9, 4, 6)),
                 ("The yard of Thomas Boyd", [T("The yard of Thomas Boyd at Hotwells built eleven vessels between 1781 and 1790, the largest of them <<H12>>. "
                                                 "The smaller craft, brigs and snows for the Jamaica and Cork trades, were built on the same slip in the winter months, when the demand for repairs was low.")]
                  + paras(r, "history", 4, 4, 6)),
                 ("Costs and credit", paras(r, "trade", 4, 4, 6) + paras(r, "history", 2, 3, 5)),
                 ("Conclusion", paras(r, "history", 3, 3, 5))],
                "Offprint series | The Wren Papers in Context | Shipbuilding")
    pdf_article(H, "articles/the_coopers_of_redcliff.pdf", "The Coopers of Redcliff Back", [
        ("Introduction", paras(r, "history", 4, 4, 6)), ("Staves and hoops", paras(r, "trade", 7, 4, 6)), ("The trade at home and abroad", paras(r, "history", 7, 4, 6)),
        ("Conclusion", paras(r, "history", 3, 3, 5))], "Offprint series | The Wren Papers in Context | Cooperage", serif=True)
    pdf_article(H, "articles/guide_for_visitors.pdf", "A Visitor's Guide to the Reading Room", [
        ("Before you come", paras(r, "history", 6, 3, 5)), ("In the reading room", [("li", "Pencils only, and no bags at the tables."), ("li", "Handle volumes on the foam supports provided."),
                                                                                  ("li", "Ask a member of staff before you open any bound volume wider than a right angle.")] + paras(r, "history", 2, 3, 4)),
        ("Copying and photography", paras(r, "history", 3, 3, 4))], "Visitors | Bristol Archives guide", mode="words")


def chapters():
    r = rng_for("chapters")
    els = [("title", "Chapter Three: The Cooper Trade"),
           ("p", "Draft of 12 June 2026. Not for quotation."),
           ("h1", "The staves"), ("p", para(r, "history", 5, 7)), ("p", para(r, "trade", 5, 7)), ("p", para(r, "history", 5, 7)), ("p", para(r, "history", 5, 7)), ("p", para(r, "trade", 4, 6)),
           ("h1", "The credit of the firm"),
           ("p", para(r, "history", 4, 6)),
           ("p", T("By the winter of 1790 the firm owed the Lisbon wine merchant Joaquim da Cunha the sum of <<H08>>, a debt that Hollis privately thought could not be cleared before the next vintage.")),
           ("p", para(r, "trade", 3, 5)),
           ("h2", "Where the firm stood in January 1790"),
           ("table", [["Creditor", "Place", "Owed (£)"], ["Lyle & Pountney", "Bristol", "412"], ["H. Alleyne", "Cork", "298"], ["A. Tilley", "Redcliff Back", "57"], ["T. Boyd", "Hotwells", "630"]]),
           ("p", para(r, "history", 3, 5)),
           ("h2", "What the partners said to each other"),
           ("li", "Wren wished to sell the Providence and settle the Lisbon debt in one season."), ("li", "Hollis preferred to borrow against the next crop."), ("li", "The clerk, Fuller, advised delay."),
           ("p", para(r, "history", 5, 7)), ("p", para(r, "history", 5, 7)),
           ("h1", "Conclusion"), ("p", para(r, "history", 5, 7))]
    put_docx(H, "chapters/chapter3_the_cooper_trade.docx", "Chapter Three: The Cooper Trade", els)
    els = [("title", "Chapter Five: Fever on the Kingston Run"), ("h1", "The disease"), ("p", para(r, "history", 5, 7)), ("p", para(r, "voyage", 4, 6)), ("p", para(r, "history", 5, 7)), ("p", para(r, "history", 5, 7)), ("p", para(r, "history", 5, 7)),
           ("h1", "The ships"), ("p", para(r, "voyage", 4, 6)), ("h2", "The Mary Ann"), ("p", para(r, "history", 3, 5)), ("h2", "The Hester"), ("p", para(r, "history", 3, 5)),
           ("li", "Fever struck most often in the weeks after arrival."), ("li", "Masters preferred to sail before the rains."), ("p", para(r, "trade", 3, 5)),
           ("h1", "The owners' response"), ("p", para(r, "history", 5, 7))]
    put_docx(H, "chapters/chapter5_yellow_fever.docx", "Chapter Five", els)
    els = [("title", "Introduction (draft)"), ("p", para(r, "history", 4, 6)), ("h1", "Sources"), ("p", para(r, "history", 3, 5)),
           ("ol", "The letters of the firm, 1779 to 1798."), ("ol", "The ships' logbooks, 1781 to 1802."), ("ol", "The ledgers and port duties."),
           ("h1", "Method"), ("p", para(r, "history", 4, 6)), ("quote", sent(r, "history")), ("p", para(r, "history", 3, 5))]
    put_docx(H, "chapters/introduction_draft.docx", "Introduction (draft)", els)


# --- the ship's logbook transcription, about 4 MB
_DIRS = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"]
_SKY = ["fair weather", "cloudy", "hazy", "clear", "rainy", "squally", "thick fog", "dark and gloomy", "a clear sky", "frequent showers"]
_WIND = ["Fresh breezes", "Light airs", "Moderate gales", "Strong gales", "Little wind", "Variable winds", "Steady trades", "Fresh gales", "Calms", "Gentle breezes"]
_WORK = ["scraping and tarring the standing rigging", "overhauling the running rigging", "mending the main topsail", "airing the bedding between decks", "stowing the boats",
         "washing and scrubbing the decks", "making points and gaskets", "setting up the lower rigging", "knotting yarns", "splicing the cable", "caulking the quarter-deck",
         "fishing the main yard", "working the pumps", "bending a new foresail", "shifting the ballast"]
_SEEN = ["a sail to windward standing to the eastward", "a brig on the larboard bow", "a ship of war on the starboard tack", "several porpoises about the ship", "a school of flying fish",
         "a shoal of dolphins", "a large turtle asleep on the water", "Portuguese men-of-war in great numbers", "a bird like a gannet", "a floating cask, much weathered", "a whale blowing to leeward",
         "the loom of land to the southward", "gulf weed in large patches"]
_RATION = ["Served the people their allowance of beef and pork.", "Served a pint of rum to each mess.", "Served bread and cheese to the people.", "Served pease and oatmeal.",
           "Opened a cask of beef, which proved sound.", "Opened a cask of pork, which was found rusty.", "Gave the people fresh fish for dinner."]
_INCID = ["The pumps were worked an hour in every watch.", "Split the main topgallant sail in a squall; bent another.", "The cook scalded his arm and was laid up two days.",
          "Punished one of the boys for neglect of duty.", "Mustered the people and found all well.", "The long boat was washed from her chocks and recovered with some damage.",
          "Lost a handspike overboard.", "Heard a noise in the hold and found a cask started; secured it.", "The steward reported the water getting low and put the people on a short allowance.",
          "The mate had a touch of the ague.", "Read the articles of war to the people.", "Examined the casks and found three leaking."]
_FIRST = ["John", "William", "Thomas", "James", "Robert", "George", "Richard", "Henry", "Peter", "Isaac", "Joseph", "Samuel", "Daniel", "Edward", "Hugh", "Nathaniel", "David", "Abel", "Silas", "Josiah"]
_LAST = ["Marsh", "Cole", "Farrant", "Gwynne", "Pike", "Bowen", "Moss", "Lacey", "Yeo", "Tarr", "Dodd", "Trott", "Bevan", "Nash", "Rowe", "Slade", "Venn", "Wills", "Yates", "Orme", "Gale", "Hine"]
_DEATH = ["died of a fever", "died of the flux", "died of a decline", "was lost overboard in the night", "died after a short illness"]


def _logbook_entry(r, date, pos):
    import datetime
    wd = date.strftime("%A")
    d = date.day
    lead = wd + " " + (_ord(d) if d != 1 else _ord(d) + " " + date.strftime("%B")) + "."
    parts = [lead, "%s from the %s and %s." % (r.choice(_WIND), r.choice(_DIRS), r.choice(_SKY))]
    parts.append("People employed in %s." % r.choice(_WORK))
    pos[0] = min(55.0, max(5.0, pos[0] + r.uniform(-1.2, 1.6)))
    pos[1] = min(80.0, max(3.0, pos[1] + r.uniform(-0.4, 1.9)))
    parts.append("At noon lat. %d\u00b0 %d' N, long. %d\u00b0 %d' W." % (int(pos[0]), int((pos[0] % 1) * 60), int(pos[1]), int((pos[1] % 1) * 60)))
    if r.random() < 0.55:
        parts.append("Saw %s." % r.choice(_SEEN))
    if r.random() < 0.45:
        parts.append(r.choice(_RATION))
    if r.random() < 0.40:
        parts.append(r.choice(_INCID))
    if r.random() < 0.006:
        parts.append("%s %s, seaman, %s, and was buried with the usual ceremony." % (r.choice(_FIRST), r.choice(_LAST), r.choice(_DEATH)))
    return " ".join(parts)


def logbook(target=4215000):
    import datetime
    r = rng_for("logbook")
    shipmasters = [("Brig MARY ANN", "E. Carew"), ("Snow PROVIDENCE", "H. Ainsley"), ("Ship HESTER", "N. Pryce"), ("Brig MARY ANN", "S. Kemp"), ("Snow PROVIDENCE", "J. Voss")]
    outs = [("Bristol", "Kingston, Jamaica"), ("Kingston, Jamaica", "Bristol"), ("Bristol", "Cork"), ("Cork", "Kingston, Jamaica"), ("Bristol", "Lisbon"), ("Lisbon", "Bristol")]
    paras_ = []
    total = 0
    n = 0
    year, month = 1781, 3
    entries = []
    voy = 0
    while total < target:
        voy += 1
        ship, master = shipmasters[voy % len(shipmasters)] if year < 1787 else shipmasters[(voy + 2) % len(shipmasters)]
        a, b = outs[voy % len(outs)]
        start = datetime.date(year, month, r.randint(1, 27))
        head = "VOYAGE %d. %s, Capt. %s, from %s towards %s. Sailed %s %d %s %d." % (voy, ship, master, a, b, start.strftime("%A"), start.day, start.strftime("%B"), start.year)
        entries.append(head); total += len(head) + 2
        pos = [r.uniform(10, 50), r.uniform(5, 70)]
        for k in range(r.randint(88, 118)):
            e = _logbook_entry(r, start + datetime.timedelta(days=k), pos)
            entries.append(e); total += len(e) + 2
            n += 1
        month += r.randint(2, 4)
        if month > 12:
            month -= 12; year += 1
        if year > 1802:
            year = 1802
    # the two facts, buried
    idx = [i for i, e in enumerate(entries) if not e.startswith("VOYAGE")]
    i1, i2 = idx[int(len(idx) * 0.58)], idx[int(len(idx) * 0.83)]
    e1 = entries[i1].split(" At noon")[0]
    entries[i1] = T(e1 + " Fresh gales from the WSW and squally. At noon <<H09>> and was killed; we committed him to the sea at 41\u00b0 12' N, the colours at half-mast.")
    e2 = entries[i2].split(" At noon")[0]
    entries[i2] = T(e2 + " Fair weather. At daylight sighted the island of Corvo bearing ESE. Spoke a Danish snow, <<H10>>, from Lisbon for Copenhagen with salt; she reported all well.")
    text = "\n\n".join(entries) + "\n"
    data = text.encode("utf-8")
    # a three-byte-free file, but with two-byte characters (the degree sign) that fall across the 1 MiB pieces the page reads
    for boundary in (1048576, 2 * 1048576, 3 * 1048576):
        idx_ = data.rfind(b"\xc2\xb0", 0, boundary)
        pad = (boundary - 1) - idx_
        start_line = data.rfind(b"\n", 0, idx_) + 1
        spaces = [i for i in range(start_line, idx_) if data[i:i + 1] == b" "]
        ba = bytearray(data)
        per, extra = divmod(pad, len(spaces))
        for j, pos in enumerate(reversed(spaces)):
            ba[pos:pos + 1] = b" " * (1 + per + (1 if j < extra else 0))
        data = bytes(ba)
        assert data[boundary - 1:boundary + 1] == b"\xc2\xb0", boundary
    assert 4000000 <= len(data) <= 4400000, len(data)
    _put(H, "logbook/ship_logbooks_1781-1802.txt", data, data.decode("utf-8"))


# ============================================================================================================ LAB NOTES
LB = "lab_notes"


def lab_protocols():
    r = rng_for("protocols")
    put_text(LB, "protocols/spore_germination_assay.md", T("""# Spore germination assay

Version 4, March 2026. Owner: Dr. Imani Okoye. Applies to all Trichoderma and Penicillium strains held in the collection.

## Purpose

To measure the proportion of spores that germinate within a fixed time on a defined medium, so that strains and batches can be compared. %s

## Materials

- Potato dextrose agar plates, poured in G.10 and dried for 30 minutes in the cabinet
- Sterile water with 0.05%% Tween 80
- Haemocytometer and a phase-contrast microscope
- Spore suspension adjusted to 1 x 10^6 spores per mL

## Procedure

1. Label six plates per strain with the strain number, the date and your initials.
2. Spread 100 µL of the suspension on each plate with a sterile spreader and let the surface dry.
3. Seal the plates with film and place them lid down in the incubator.
4. <<L01>>. Do not open the incubator door during the first 24 hours.
5. After the incubation, count 100 spores in each of three fields per plate and record germinated and ungerminated spores separately.

### Counting

A spore counts as germinated when the germ tube is at least as long as the spore is wide. %s

### Recording

Enter the counts in the shared sheet the same day. %s

## Troubleshooting

- If the control plates show contamination, discard the batch and repeat with fresh medium.
- If germination is under 40%% on the reference strain, check the age of the stock before anything else.
""" % (para(r, "lab_method", 2, 3), para(r, "lab_method", 2, 3), para(r, "lab_admin", 1, 2))))
    put_text(LB, "protocols/autoclave_cycle.md", T("""# Autoclave cycles

Owner: Tom Brightwell (lab manager). Last reviewed April 2026.

## Choosing a cycle

Use the cycle that matches the load, not the one that happens to be on the display. The cycles in use are listed here.

| Cycle | Load | Temperature | Time |
|---|---|---|---|
| Liquid | media, buffers | 121 °C | see below |
| Dry | glassware, tips | 134 °C | 10 minutes |
| Waste | contaminated plastics | 121 °C | 60 minutes |

## Liquid cycle

Liquid cycle for volumes over 1 litre: <<L02>>, then a slow exhaust. For volumes of 1 litre or less, a 20 minute hold is enough. Never fill a bottle more than two thirds, and always loosen the caps.

## Before you start

%s

## After the run

%s
""") % (para(r, "lab_method", 2, 3), para(r, "lab_admin", 2, 3)))
    put_text(LB, "protocols/dna_extraction.md", T("""# DNA extraction from fungal mycelium

Version 2, February 2026. Based on a commercial spin-column kit with two changes made by this lab.

## Overview

%s

## Steps

1. Freeze 100 mg of mycelium in liquid nitrogen and grind it to a fine powder.
2. Add 400 µL of lysis buffer and 4 µL of RNase A, vortex, and incubate for 10 minutes at 65 °C.
3. Add 130 µL of neutralising buffer, mix, and place on ice for 5 minutes.
4. Spin at 14,000 g for 5 minutes and transfer the supernatant to a spin column.
5. Wash twice with 500 µL of wash buffer.
6. <<L12>> and incubate for 5 minutes before the final spin.

## Quality check

Measure the concentration and the 260/280 ratio. A ratio between 1.8 and 2.0 is good. %s
""") % (para(r, "lab_method", 3, 4), para(r, "lab_method", 1, 2)))
    put_text(LB, "protocols/ph_meter_calibration.md", T("""# pH meter calibration

Owner: Marcus Dlamini. Calibrate before every use, with fresh buffers.

## Calibration

Use the pH 4.01, 7.00 and 10.01 buffers in that order, rinsing the electrode with distilled water between buffers. The slope should be between 95%% and 102%%.

%s

## Electrode log

The electrode in use is kept in storage solution, never in water. <<L06>> after the slope fell below 95%%; the old electrode went to the bin. The new electrode needs a day in storage solution before it is used for anything that matters.

## If the reading drifts

%s
""") % (para(r, "lab_method", 2, 3), para(r, "lab_admin", 1, 2)))
    put_text(LB, "protocols/media_recipes.md", """# Media recipes

Quantities are for 1 litre. Autoclave according to the liquid cycle.

## Potato dextrose agar (PDA)

| Ingredient | Amount |
|---|---|
| Potato infusion | 200 g |
| Dextrose | 20 g |
| Agar | 15 g |

## Malt extract agar (MEA)

```
malt extract   20 g
peptone         1 g
glucose        20 g
agar           20 g
```

## Notes

%s

Check the pH after autoclaving and adjust only with sterile acid or base.
""" % para(r, "lab_method", 3, 4))


def lab_notebook():
    r = rng_for("notebook")

    def page(rel, title, parts, **kw):
        put_text(LB, rel, title + "\n\n" + "\n\n".join(parts) + "\n", **kw)
    page("notebook/2026-02-12_audit_prep.txt", "12 February 2026. Audit preparation.",
         [para(r, "lab_admin", 3, 4), para(r, "lab_method", 2, 3), "Tom walked round with the checklist and noted that the labels on two waste containers had faded. " + para(r, "lab_admin", 2, 3)])
    page("notebook/2026-03-09_batch17.txt", "9 March 2026. Batch 17, harvest.",
         [para(r, "lab_method", 3, 4), T("Dry weight after 48 h at 60 °C: <<L03>> from 2.0 L of potato dextrose broth, which is about 8% better than batch 16."),
          para(r, "lab_method", 3, 5), "Marcus wants the same medium for batch 18; Imani prefers to try malt extract. We will run both."], crlf=True)
    page("notebook/2026-04-22_contamination.txt", "22 April 2026. Contamination.",
         [T("Imani found <<L04>> when she opened the incubator at 09:10, and discarded 11 flasks from the shelf. The affected flasks were autoclaved without opening, and the shelf was wiped down with 70% ethanol."),
          para(r, "lab_method", 3, 4), "Cabinet airflow was checked by Tom in the afternoon and was within specification. " + para(r, "lab_admin", 1, 2)])
    page("notebook/2026-05-17_incubator_alarm.txt", "17 May 2026. Incubator B alarm.",
         ["The overnight alarm on Incubator B went off at about three in the morning, and the porter phoned Tom, who came in at once. The shelves were cleared into Incubator A by half past four. "
          "No cultures were lost, but the plates on the top shelf will be recounted. " + para(r, "lab_method", 2, 3), para(r, "lab_admin", 2, 3)], bom=True, crlf=True)
    page("notebook/2026-06-05_freezer_failure.txt", "5 June 2026. Freezer G.12.",
         ["The alarm on the ultra-low freezer in G.12 rang at 14:05. The compressor had stopped. Everyone who was in the building helped to move the boxes into the spare freezer next door, "
          "and Hana wrote down the box numbers as they went. " + para(r, "lab_admin", 2, 3), para(r, "lab_method", 2, 3)])
    page("notebook/2026-07-02_poster_day.txt", "2 July 2026. Poster day.",
         [T("The department's poster day was held in the atrium from ten until one. <<L13>> on spore dispersal in beech litter to the department and won second prize."),
          para(r, "lab_admin", 3, 4), para(r, "lab_method", 2, 3)])


def lab_instruments():
    r = rng_for("instruments")
    import datetime
    rows = [["timestamp", "temp_c", "humidity_pct", "note"]]
    t0 = datetime.datetime(2026, 5, 10, 0, 0)
    for i in range(700):
        t = t0 + datetime.timedelta(minutes=15 * i)
        temp = 30.0 + r.uniform(-0.25, 0.25)
        note = ""
        stamp = t.strftime("%Y-%m-%dT%H:%M")
        if stamp == "2026-05-17T03:00":
            temp, note = 33.4, "door alarm"
        elif stamp == "2026-05-17T03:15":
            temp, note = 37.8, T("ALARM: over-temperature 37.8 C, <<L05>>")
        elif stamp == "2026-05-17T03:30":
            temp, note = 36.1, "cooling"
        elif r.random() < 0.01:
            note = r.choice(["door opened", "door opened", "defrost cycle", "logger restarted"])
        rows.append([stamp, "%.2f" % temp, "%.1f" % (55 + r.uniform(-2, 3)), note])
    put_text(LB, "instruments/incubator_b_log_2026-05.csv", _csv(rows), bom=True, crlf=True)
    rows = [["date", "rotor", "rpm", "minutes", "operator"]]
    for i in range(90):
        rows.append(["2026-%02d-%02d" % (1 + i // 15, 1 + (i * 2) % 28), r.choice(["F-45-30-11", "F-45-24-11", "S-24-11-aT"]), r.choice([3000, 5000, 8000, 12000, 14000]), r.choice([3, 5, 10, 15]), r.choice(["Imani", "Priya", "Tom", "Marcus", "Hana"])])
    put_text(LB, "instruments/centrifuge_runs.csv", _csv(rows))
    rows = [["plate", "well", "od600", "sample"]]
    for p in range(1, 4):
        for rw in "ABCDEFGH":
            for c in range(1, 13):
                rows.append(["P%d" % p, "%s%d" % (rw, c), "%.3f" % r.uniform(0.04, 0.92), r.choice(["blank", "FX-101", "FX-117", "FX-208", "FX-233", "control"])])
    put_text(LB, "instruments/plate_reader_od600.csv", _csv(rows))
    rows = [["timestamp", "temp_c", "status"]]
    for h in range(10 * 24):
        t = datetime.datetime(2026, 6, 1) + datetime.timedelta(hours=h)
        temp = -80 + r.uniform(-1.5, 1.5)
        status = "ok"
        if datetime.datetime(2026, 6, 5, 14) <= t < datetime.datetime(2026, 6, 5, 18):
            temp, status = -80 + (t - datetime.datetime(2026, 6, 5, 13)).seconds / 3600 * 11, "compressor fault"
        rows.append([t.strftime("%Y-%m-%dT%H:00"), "%.1f" % temp, status])
    put_text(LB, "instruments/freezer_g12_temps.csv", _csv(rows))


def lab_data():
    r = rng_for("labdata")
    genera = ["Trichoderma", "Penicillium", "Aspergillus", "Fusarium", "Mucor"]
    recs = []
    for i in range(1, 41):
        n = 200 + i
        o = r.choice(["forest soil", "compost", "peat", "root washings", "leaf litter"]) + " at " + r.choice(["Monks Wood", "Wicken Fen", "Hayley Wood", "Thetford Forest"])
        recs.append({"strain": "FX-%d" % n, "genus": r.choice(genera), "origin": "Isolated from %s, accession 2025-%04d" % (o, 100 + i), "isolated": "2025-%02d-%02d" % (r.randint(1, 12), r.randint(1, 28)), "frozen": r.choice([True, True, False])})
    recs[7] = {"strain": "FX-208", "genus": "Trichoderma", "origin": T("<<L07>>"), "isolated": "2025-09-18", "frozen": True}
    for q in recs:
        if q["strain"] != "FX-208" and "beech litter at Hayley Wood" in q["origin"]:
            q["origin"] = q["origin"].replace("beech litter at Hayley Wood", "oak litter at Monks Wood")
    put_text(LB, "data/strain_registry.json", json.dumps({"registry": "Okoye lab strain collection", "updated": "2026-06-30", "strains": recs}, indent=2, ensure_ascii=False) + "\n")
    meta = {"experiment": "E-2026-03", "title": "Medium comparison for batch cultures", "investigators": ["Imani Okoye", "Marcus Dlamini"],
            "design": {"factors": {"medium": ["PDB", "MEA broth"], "temperature_c": [25, 28]}, "replicates": 6, "duration_h": 48},
            "status": {"state": "complete", "notes": para(r, "lab_method", 1, 2)}, "files": ["batch17.csv", "batch18.csv"]}
    put_text(LB, "data/experiment_metadata.json", json.dumps(meta, indent=2, ensure_ascii=False) + "\n")
    inv = {"freezers": [{"room": "G.12", "temp_c": -80, "boxes": [{"id": "B%03d" % i, "strains": ["FX-%d" % (200 + i), "FX-%d" % (201 + i)]} for i in range(1, 31)]},
                        {"room": "G.14", "temp_c": -80, "boxes": [{"id": "B%03d" % (100 + i), "strains": ["FX-%d" % (240 + i)]} for i in range(1, 9)]}]}
    put_text(LB, "data/sample_inventory.json", json.dumps(inv, indent=1) + "\n")


def lab_reports():
    r = rng_for("labreports")
    pdf_article(LB, "reports/q2_report_2026.pdf", "Okoye Laboratory: Quarterly Report, April to June 2026",
                [("Summary", paras(r, "lab_method", 5, 3, 5) + paras(r, "lab_admin", 3, 3, 4)),
                 ("Finance", [T("Consumables spending in the second quarter was <<L08>>, which is 8% under budget. Equipment repairs came to £1,930.00, mostly for the plate reader's lamp.")]
                  + paras(r, "lab_admin", 3, 3, 5)),
                 ("Research progress", paras(r, "lab_method", 9, 3, 5)),
                 ("Equipment and incidents", [T("The ultra-low freezer in room G.12 failed on 5 June and <<L09>> to the freezer in room G.14 within 40 minutes. "
                                                "No samples were lost. A replacement compressor was fitted on 12 June.")] + paras(r, "lab_admin", 3, 3, 5)),
                 ("Plans for the third quarter", paras(r, "lab_admin", 3, 3, 5))],
                "Okoye Laboratory | Q2 2026 report")
    pdf_article(LB, "reports/q1_report_2026.pdf", "Okoye Laboratory: Quarterly Report, January to March 2026",
                [("Summary", paras(r, "lab_method", 4, 3, 5)),
                 ("Finance", ["Consumables spending in the first quarter was £15,880.20, which is 3% over budget, chiefly because of the extra agar bought in January."] + paras(r, "lab_admin", 3, 3, 5)),
                 ("Research progress", paras(r, "lab_method", 5, 3, 5)), ("Plans", paras(r, "lab_admin", 3, 3, 5))], "Okoye Laboratory | Q1 2026 report")
    pdf_article(LB, "reports/methods_summary.pdf", "Methods Summary for the Thesis Committee",
                [("Culture methods", paras(r, "lab_method", 7, 3, 5)), ("Molecular methods", paras(r, "lab_method", 6, 3, 5)), ("Statistics", paras(r, "lab_method", 4, 3, 5))],
                "Okoye Laboratory | Methods", serif=True, mode="words")
    els = [("title", "Safety Audit, February 2026"), ("p", "Prepared by Tom Brightwell for the departmental safety committee."),
           ("h1", "Scope"), ("p", para(r, "lab_admin", 3, 4)),
           ("h1", "Findings"), ("p", T("The audit of 12 February 2026 found <<L10>> in the prep room; all three were replaced by 20 February. The first-aid kits in G.10 and G.12 were complete.")),
           ("table", [["Area", "Finding", "Action"], ["Prep room", "Expired extinguishers", "Replaced 20 Feb"], ["G.10", "None", "None"], ["Cold room", "Door seal worn", "Ordered"]]),
           ("h1", "Recommendations"), ("li", "Check extinguisher dates each term."), ("li", "Add the door seal to the maintenance list."), ("p", para(r, "lab_admin", 2, 3))]
    put_docx(LB, "reports/safety_audit_2026.docx", "Safety Audit, February 2026", els)
    els = [("title", "Student Handbook: Laboratory Extract"), ("h1", "Working hours"), ("p", para(r, "lab_admin", 3, 4)), ("h1", "Waste"), ("p", para(r, "lab_method", 2, 3)),
           ("ol", "Sharps go in the rigid containers."), ("ol", "Cultures are autoclaved before disposal."), ("ol", "Chemical waste is labelled with the contents."),
           ("h1", "Who to ask"), ("p", para(r, "lab_admin", 2, 3))]
    put_docx(LB, "reports/student_handbook_extract.docx", "Student Handbook: Laboratory Extract", els)


def lab_meeting():
    r = rng_for("meeting")
    inner = """<header><h1>Lab meeting, 18 June 2026</h1><p>Present: Imani, Priya, Tom, Marcus, Hana, Sven.</p></header>
<main><h2>1. Matters arising</h2><p>%s</p>
<h2>2. Equipment</h2><h3>Centrifuge</h3><p>%s</p>
<h3>Plate reader</h3><p>%s</p>
<h2>3. Any other business</h2><ul><li>%s</li><li>%s</li></ul>
<h2>Actions</h2><table><tr><th>Who</th><th>Action</th><th>By</th></tr><tr><td>Tom</td><td>Order the centrifuge</td><td>30 June</td></tr><tr><td>Priya</td><td>Update the strain sheet</td><td>25 June</td></tr></table></main>
""" % (para(r, "lab_admin", 2, 3), T("Decided to buy a second centrifuge, the <<L11>>, quoted at £6,480 plus VAT, to be paid from the equipment fund. ") + para(r, "lab_admin", 1, 2), para(r, "lab_admin", 2, 3), sent(r, "lab_admin"), sent(r, "lab_admin"))
    put_text(LB, "meetings/lab_meeting_2026-06-18.html", html_page("Lab meeting, 18 June 2026", inner))


# ====================================================================================================== HOUSEHOLD PAPERS
HH = "household_papers"


def household_pdfs():
    r = rng_for("household")
    els = [("title", "Home Insurance: Policy Schedule"), ("p", "Policy number HX-4471-0928. Period of insurance: 1 February 2025 to 31 January 2026."),
           ("h1", "Cover and sums insured"),
           ("p", "Insured: Adaeze Okafor and Lars Lindqvist, 14 Alder Close."),
           ("li", T("<<R01>>")), ("li", "Contents sum insured: £62,000"), ("li", "Accidental damage excess: £250"), ("li", "Escape of water excess: £500"),
           ("h1", "What is covered"), ("p", para(r, "house", 3, 5)), ("p", para(r, "house", 3, 5)),
           ("h1", "What is not covered"), ("p", "Wear and tear, gradual damage, and damage caused by vermin are not covered. " + para(r, "house", 2, 3)),
           ("h1", "Making a claim"), ("p", "Report any loss or damage as soon as you can on the claims line, and keep the damaged item. " + para(r, "house", 2, 3)),
           ("p", para(r, "house", 4, 6)), ("h1", "Cancellation"), ("p", para(r, "house", 3, 4))]
    put_pdf(HH, "insurance/home_policy_schedule.pdf", "Home Insurance: Policy Schedule", els, "Northgate Mutual | Home policy HX-4471-0928")
    els = [("title", "Car Insurance: Certificate and Schedule"), ("p", "Policy number MC-90817. Comprehensive cover."),
           ("h1", "Important information"), ("p", para(r, "house", 5, 7)), ("p", para(r, "house", 5, 7)), ("p", para(r, "house", 5, 7)), ("p", para(r, "house", 5, 7)),
           ("p", para(r, "house", 5, 7)), ("p", para(r, "house", 5, 7)), ("h1", "Your car"),
           ("p", T("Insured vehicle: Skoda Octavia, <<R08>>, first registered in 2019.")), ("p", "Annual mileage: 8,000. Use: social, domestic and pleasure, and commuting."),
           ("h1", "Drivers"), ("li", "Adaeze Okafor, policyholder, no-claims discount of 7 years"), ("li", "Lars Lindqvist, named driver"),
           ("h1", "Your rights"), ("p", para(r, "house", 3, 5)), ("p", para(r, "house", 3, 5))]
    put_pdf(HH, "insurance/car_policy.pdf", "Car Insurance: Certificate and Schedule", els, "Northgate Mutual | Motor policy MC-90817", mode="words")


def household_finance():
    r = rng_for("hhfinance")
    rows = [["Month", "Utility", "Amount", "Note"]]
    for m in range(1, 13):
        for u, base in (("Electricity", 118), ("Gas", 96), ("Water", 41)):
            note = ""
            amt = base + r.uniform(-18, 22)
            if m == 3 and u == "Electricity":
                amt, note = 142.67, T("Higher than usual: <<R02>>")
            rows.append(["2025-%02d" % m, u, "%.2f" % amt, note])
    put_text(HH, "finance/utility_bills_2025.csv", _csv(rows))
    rows = [["Category", "Month", "Planned", "Actual"]]
    for c in ["Groceries", "Transport", "Insurance", "Children", "Home repairs", "Savings"]:
        for m in range(1, 13):
            p = r.randint(80, 600)
            rows.append([c, "2025-%02d" % m, p, p + r.randint(-40, 80)])
    put_text(HH, "finance/household_budget_2025.csv", _csv(rows), crlf=True)
    sched = [{"payment": i, "date": "2025-%02d-01" % (1 + (i - 1) % 12), "interest": round(r.uniform(560, 640), 2), "capital": round(r.uniform(310, 380), 2)} for i in range(1, 25)]
    doc = {"account": "Mortgage 00481127", "lender": "Fenland Building Society", "balance_start": 268400.0,
           "rate_note": T("<<R07>>, then the lender's standard variable rate."), "term_years": 25, "schedule": sched}
    put_text(HH, "finance/mortgage_schedule.json", json.dumps(doc, indent=1, ensure_ascii=False) + "\n")
    els = [("title", "Tax Summary 2024-25"), ("h1", "Income"), ("p", para(r, "house", 2, 3)),
           ("table", [["Source", "Amount (£)"], ["Salary (Adaeze)", "41,200"], ["Salary (Lars)", "38,750"], ["Savings interest", "212"]]),
           ("h1", "Allowances"), ("li", "Personal allowances for both of us."), ("li", "Gift Aid donations of £480."), ("p", para(r, "house", 2, 3)), ("h1", "Deadlines"), ("p", para(r, "house", 2, 3))]
    put_docx(HH, "finance/tax_summary_2024-25.docx", "Tax Summary 2024-25", els)


def household_letters():
    r = rng_for("hhletters")
    els = [("title", "Quote for boiler replacement"), ("p", "3 November 2025. To: Adaeze Okafor and Lars Lindqvist, 14 Alder Close."), ("h1", "The work"),
           ("p", T("<<R03>>, with work to start on 19 January 2026 and to take two days. The quote includes the new boiler, the flue, a new thermostat and the removal of the old unit.")),
           ("p", para(r, "house", 2, 3)), ("h1", "Terms"), ("li", "A deposit of ten per cent is due on acceptance."), ("li", "The balance is due on completion."), ("li", "The quote is valid for thirty days."),
           ("p", para(r, "house", 2, 3))]
    put_docx(HH, "letters/plumber_quote_2025-11-03.docx", "Quote for boiler replacement", els)
    els = [("title", "Emergency contacts"), ("h1", "Family"), ("table", [["Who", "Phone", "Relation"], ["Grandma Nkechi", "01632 960 014", "grandmother"], ["Uncle Bjorn", "01632 960 233", "uncle"]]),
           ("h1", "Home"), ("p", "The stopcock is under the kitchen sink and the gas isolation valve is by the meter in the hall. " + para(r, "house", 2, 3)),
           ("h1", "Doctors"), ("p", para(r, "house", 2, 3))]
    put_docx(HH, "letters/emergency_contacts.docx", "Emergency contacts", els)
    put_text(HH, "letters/school_letter_2025-03.txt", T("""St. Edmund's Primary School
Church Lane

3 March 2025

Dear Parent or Carer,

Parents' evening for Year 5 will be held on Thursday 13 March 2025 <<R04>>. Each appointment is ten minutes long, and you can book through the school office or on the form that came home in the book bag. There will be tea and coffee in the hall, and a café run by the Year 6 pupils.

The school is also collecting for the spring fair. %s

Yours sincerely,

Mrs. P. Hargreaves
Headteacher
""") % para(r, "house", 2, 3), enc="cp1252")
    put_text(HH, "letters/neighbour_note_hedge.txt", "Hello Adaeze and Lars,\n\nSorry to bother you with a note. The hedge between our back gardens has grown a good deal this year and now blocks most of the light from our kitchen window. "
             "Would you mind if we asked a gardener to cut it back in the autumn, at our expense? " + para(r, "house", 2, 3) + "\n\nBest wishes,\nMargaret from number 16\n")
    put_text(HH, "letters/council_tax_letter.txt", "Alder District Council\nCouncil Tax Service\n\nYour council tax bill for 2025-26 is enclosed. The instalments are due on the first of each month from April to January. "
             + para(r, "house", 3, 4) + "\n\nIf your circumstances change you must tell us within 21 days. Dr. J. Mortimer, Revenues Manager.\n", crlf=True)


def household_misc():
    r = rng_for("hhmisc")
    put_text(HH, "recipes/cardamom_buns.md", T("""# Cardamom buns

Lars's mother's recipe. Makes 16.

## Dough

- 500 g strong white flour
- 75 g sugar
- 12 g fresh yeast
- 3 dl warm milk
- 1 tsp ground cardamom
- 75 g soft butter

## Method

1. Mix the dough and knead for ten minutes. Let it rise for an hour.
2. Roll it out, spread with butter, cardamom and sugar, fold and cut into strips.
3. Twist the strips into knots and let them rise again for forty minutes.
4. <<R06>>. Brush with egg and sprinkle with pearl sugar as they come out.

## Notes

%s
""") % para(r, "house", 1, 2))
    put_text(HH, "recipes/fish_soup.md", "# Fish soup\n\n## Ingredients\n\n- 600 g white fish\n- 1 leek\n- 2 potatoes\n- 1 litre of stock\n- dill\n\n## Method\n\nSweat the leek, add the potatoes and stock, and simmer for fifteen minutes. Add the fish and cook until it flakes. " + para(r, "house", 1, 2) + "\n")
    put_text(HH, "recipes/sunday_roast.md", "# Sunday roast\n\n## Chicken\n\nRoast at 190 °C for 1 hour 20 minutes, resting for twenty minutes before carving. " + para(r, "house", 2, 3) + "\n\n## Potatoes\n\nParboil for eight minutes, shake in the pan, and roast in hot fat. " + para(r, "house", 1, 2) + "\n")
    inner = """<h1>Boiler notes</h1><h2>Pressure</h2><p>%s</p>
<h2>Service</h2><p>The boiler needs a service every October. %s</p>
<h2>Fault codes</h2><table><tr><th>Code</th><th>Meaning</th></tr><tr><td>E1</td><td>Low water pressure</td></tr><tr><td>E3</td><td>Overheat</td></tr><tr><td>E7</td><td>Ignition failure</td></tr></table>""" % (
        T("With the heating off and the system cold the pressure gauge should read <<R05>>. If it falls below 1.0, top it up with the filling loop and close the loop again."), para(r, "house", 2, 3))
    put_text(HH, "home/boiler_manual_notes.html", html_page("Boiler notes", inner))
    put_text(HH, "home/warranty_notes.txt", T("Warranties\n\nThe Bosch dishwasher bought on 14 August 2022 has a five-year guarantee. The <<R09>>. Keep the receipt in the blue folder.\n\n")
             + para(r, "house", 2, 3) + "\n\nThe washing machine is guaranteed for two years from the date of delivery.\n")
    put_text(HH, "home/appliance_serials.txt", "Appliance serial numbers\n\nDishwasher: FD 9602 4417\nWashing machine: WM 3320 1185\nFridge-freezer: KF 7714 0039\nOven: OV 5090 2216\n\n" + para(r, "house", 2, 3) + "\n")
    put_text(HH, "home/passport_reminders.txt", T("Passport reminders\n\nAdaeze's <<R10>>, so the renewal form must go in before the end of May 2027. Lars's passport is valid until 2031. The children's passports were renewed last year.\n\n")
             + para(r, "house", 2, 3) + "\n")
    put_text(HH, "home/garden_plan.md", "# Garden plan 2026\n\n## Front\n\nReplace the lavender. " + para(r, "house", 2, 3) + "\n\n## Back\n\nThe vegetable bed goes along the south fence. " + para(r, "house", 2, 3) + "\n\n### Shed\n\nNew roof felt in spring.\n")
    put_text(HH, "home/holiday_plans_2026.txt", "Holiday plans 2026\n\nEaster: Grandma Nkechi's.\nSummer: two weeks on the coast, the second half of July.\nOctober half term: Bjorn's cabin.\n\n" + para(r, "house", 3, 4) + "\n")


# ======================================================================================================= CHECKS AND OUTPUT
def check_and_describe():
    """Each fact's needle is in its file and in no other; the folders and the file count are as promised."""
    problems = []
    plain = {k: norm(v["plain"]) for k, v in FILES.items()}
    facts = []
    for fid, folder, rel, q, a, needle in SPEC:
        key = folder + "/" + rel
        n = norm(needle)
        if key not in FILES:
            problems.append("%s: no file %s" % (fid, key))
            continue
        where = [k for k, p in plain.items() if n in p]
        if where != [key]:
            problems.append("%s: needle %r found in %s, wanted only %s" % (fid, needle, where, key))
        f = {"id": fid, "folder": folder, "file": rel, "path": key, "type": rel.rsplit(".", 1)[1], "question": q, "answer": a, "needle": needle}
        if key in PDFS:
            pg = PDFS[key].page_of(needle)
            if pg in (None, -1):
                problems.append("%s: needle is not on exactly one page of %s (%s)" % (fid, key, pg))
            f["page"] = pg
        facts.append(f)
    # facts of the restricted folder appear nowhere else (already implied by the check above), and there are enough of them
    if sum(1 for f in facts if f["folder"] == RESTRICTED_FOLDER) < 8:
        problems.append("too few facts in the restricted folder")
    if len(facts) < 25:
        problems.append("fewer than 25 facts")
    for f in FOLDERS:
        n = sum(1 for k in FILES if k.startswith(f + "/"))
        if n < 15:
            problems.append("folder %s has %d files" % (f, n))
    if not 60 <= len(FILES) <= 80:
        problems.append("%d files in all" % len(FILES))
    exts = {k.rsplit(".", 1)[1] for k in FILES}
    if exts != {"txt", "md", "html", "json", "csv", "pdf", "docx"}:
        problems.append("types: %s" % sorted(exts))
    return facts, problems


def main(argv):
    here = os.path.dirname(os.path.abspath(__file__))
    out = os.path.abspath(argv[0]) if argv else os.path.join(here, "..", "fixtures")
    out = os.path.normpath(out)
    build_letters(); diary_hollis_1786(); diary_hollis_1788(); diary_pell_1789(); memoranda_wren(); finding_aids(); ledgers(); articles(); chapters(); logbook()
    lab_protocols(); lab_notebook(); lab_instruments(); lab_data(); lab_reports(); lab_meeting()
    household_pdfs(); household_finance(); household_letters(); household_misc()
    facts, problems = check_and_describe()
    if problems:
        print("\n".join("PROBLEM " + p for p in problems), file=sys.stderr)
        return 1
    for f in FOLDERS:
        shutil.rmtree(os.path.join(out, f), ignore_errors=True)
    os.makedirs(out, exist_ok=True)
    manifest = []
    for key in sorted(FILES):
        path = os.path.join(out, key)
        os.makedirs(os.path.dirname(path), exist_ok=True)
        data = FILES[key]["data"]
        with open(path, "wb") as fh:
            fh.write(data)
        manifest.append({"path": key, "size": len(data), "sha256": hashlib.sha256(data).hexdigest()})
    with open(os.path.join(out, "FACTS.json"), "w", encoding="utf-8") as fh:
        json.dump({"about": "Facts of the folder search's test corpus: each is stated in exactly one file (the needle is an exact phrase of it, as the readers extract the text). "
                            "The golden questions of phase 5 are drawn from these. The restricted folder's facts exist only in that folder.",
                   "folders": FOLDERS, "restricted_folder": RESTRICTED_FOLDER, "facts": facts}, fh, indent=1, ensure_ascii=False)
        fh.write("\n")
    with open(os.path.join(out, "MANIFEST.json"), "w", encoding="utf-8") as fh:
        json.dump({"files": manifest}, fh, indent=1)
        fh.write("\n")
    with open(os.path.join(out, "README.md"), "w", encoding="utf-8") as fh:
        fh.write("# The folder search's test corpus\n\nWritten by `rag/tools/make_fixtures.py` (run it again to rewrite every file byte for byte). %d files in three folders:\n\n" % len(FILES))
        for f in FOLDERS:
            ks = [k for k in FILES if k.startswith(f + "/")]
            fh.write("- `%s/`: %d files (%s)\n" % (f, len(ks), ", ".join(sorted({k.rsplit('.', 1)[1] for k in ks}))))
        fh.write("\n`FACTS.json` lists %d facts, each stated in exactly one file; `%s` is the folder whose facts exist only there (the permissions test). "
                 "`MANIFEST.json` lists every file with its size and SHA-256. The people, firms and figures are invented.\n" % (len(facts), RESTRICTED_FOLDER))
    tot = sum(len(v["data"]) for v in FILES.values())
    print("wrote %d files (%.2f MB), %d facts, to %s" % (len(FILES), tot / 1e6, len(facts), out))
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
