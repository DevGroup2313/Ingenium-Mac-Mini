#!/usr/bin/env python3
# INGENIUM  |  Copyright (c) 2026 Yannie D. Forest. All rights reserved.
# NO LICENCE IS GRANTED. See LICENCE.txt.
"""Small writers for the folder search's test corpus (rag/tools/make_fixtures.py uses them): a PDF writer and a .docx
writer, standard library only, byte-for-byte repeatable (no dates, no random ids).

PDF: pages of text in the standard fonts (Helvetica, Helvetica-Bold, Times-Roman, WinAnsi), a running head and a page number
on every page, text wrapped to the page, headings in larger type. The text is drawn one line at a time ("line" mode) or one
word at a time ("words" mode, which leaves the spaces to the gaps between the words, as many word processors do), so that a
reader has to work out the lines and the spaces from the positions, as it does with a real file.

DOCX: the parts Word writes for a plain document (content types, relationships, styles with the names mammoth knows
("heading 1" ...), numbering for bullet and numbered lists, tables).
"""
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
    k = 1.06 if bold else (0.93 if serif else 1.0)
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
                    sp = _width(" ", size, ln["bold"], fname == "F3")
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
