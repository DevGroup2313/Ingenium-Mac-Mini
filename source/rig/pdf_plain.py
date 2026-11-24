# Ingenium 7.73: a PDF's text read the plainest way a copy can read it: each piece of text in the file's order, through its font's
# ToUnicode map, joined with nothing added between the pieces (no spaces guessed from gaps, no line breaks). Words survive such a copy
# only when the file itself carries the spaces. Prints the text as one JSON string.   python3 -I rig/pdf_plain.py <file.pdf>
import json
import re
import sys

import pypdf
from pypdf.generic import ContentStream


def tounicode(font):
    m = {}
    tu = font.get('/ToUnicode')
    if tu is None:
        return m
    d = tu.get_object().get_data().decode('latin1')
    for blk in re.findall(r'beginbfchar(.*?)endbfchar', d, re.S):
        for a, b in re.findall(r'<([0-9A-Fa-f]+)>\s*<([0-9A-Fa-f]+)>', blk):
            m[a.upper()] = bytes.fromhex(b).decode('utf-16-be', 'replace')
    for blk in re.findall(r'beginbfrange(.*?)endbfrange', d, re.S):
        for a, b, c in re.findall(r'<([0-9A-Fa-f]+)>\s*<([0-9A-Fa-f]+)>\s*<([0-9A-Fa-f]+)>', blk):
            lo, hi, base = int(a, 16), int(b, 16), int(c, 16)
            for i in range(lo, hi + 1):
                m['%0*X' % (len(a), i)] = chr(base + i - lo)
    return m


def main(path):
    r = pypdf.PdfReader(path)
    out = []
    for pg in r.pages:
        fonts = {k: tounicode(f.get_object()) for k, f in pg['/Resources']['/Font'].items()}
        cur = {}
        for operands, op in ContentStream(pg.get_contents(), r).operations:
            if op == b'Tf':
                cur = fonts.get(operands[0], {})
            elif op == b'Tj':
                s = operands[0]
                raw = s.get_original_bytes() if hasattr(s, 'get_original_bytes') else bytes(s)
                h = raw.hex().upper()
                out.append(''.join(cur.get(h[i:i + 4], '') for i in range(0, len(h), 4)))
    print(json.dumps(''.join(out)))


if __name__ == '__main__':
    main(sys.argv[1])
