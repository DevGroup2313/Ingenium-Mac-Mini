"""6.8.1 · the typefaces a document is set in, carried in the page so that the page shown, its PDF and its Word file agree.

The owner's words (27 October 2026): "When documents are developed by AI in any chat, there's a depreciation of formatting quality
when it is coverted into a PDF or Word document. Adjust it so that any document prepared keeps the exact same formatting when it is
downloaded. The formatting shown must always match the document that is downloaded."

A PDF can only show a typeface it carries, and the browser can only give it one the page carries; so a document is set in these,
and nothing else. Each but the last two is drawn to the measures of a typeface every copy of Word has, so a Word file names that
one and its lines fall as the page's do:
  Gelasio            Gelasio (SIL OFL 1.1), Georgia's measures                 Word: Georgia
  Liberation Serif   Liberation Serif 2.1.5 (SIL OFL 1.1), Times New Roman's   Word: Times New Roman
  Liberation Sans    Liberation Sans 2.1.5, Arial's                             Word: Arial
  Liberation Mono    Liberation Mono 2.1.5, Courier New's                       Word: Courier New
  Doc Symbols        the signs and shapes of DejaVu Sans, renamed (its licence)  for any character the others lack
  Cormorant, Cinzel  Inkwell's and The Offline Project's papers (SIL OFL 1.1); no copy of Word has them, so a Word file
                     carries them inside it, renamed Doc Garamond and Doc Capitals (the names Word finds them by)
The families keep the typefaces' own names, so neither a file nor a saved page names Ingenium.
The licences are beside this file. build_page.py writes data() where modules/r183.js says /*R183_FONTS*/null; the page reads
each file's measures itself.

    python3 docfont.py            lists the faces"""
import base64
import os

HERE = os.path.dirname(os.path.abspath(__file__))
# family, weight, style, file, the typeface a Word file names for it (with "+": the file goes inside the Word file, under that name;
# "*" after it: Word's bold is that family's bold face)
FACES = [
    ("Gelasio", 400, "normal", "Gelasio-Regular.ttf", "Georgia"),
    ("Gelasio", 700, "normal", "Gelasio-Bold.ttf", "Georgia"),
    ("Gelasio", 400, "italic", "Gelasio-Italic.ttf", "Georgia"),
    ("Gelasio", 700, "italic", "Gelasio-BoldItalic.ttf", "Georgia"),
    ("Liberation Serif", 400, "normal", "LiberationSerif-Regular.ttf", "Times New Roman"),
    ("Liberation Serif", 700, "normal", "LiberationSerif-Bold.ttf", "Times New Roman"),
    ("Liberation Serif", 400, "italic", "LiberationSerif-Italic.ttf", "Times New Roman"),
    ("Liberation Serif", 700, "italic", "LiberationSerif-BoldItalic.ttf", "Times New Roman"),
    ("Liberation Sans", 400, "normal", "LiberationSans-Regular.ttf", "Arial"),
    ("Liberation Sans", 700, "normal", "LiberationSans-Bold.ttf", "Arial"),
    ("Liberation Mono", 400, "normal", "LiberationMono-Regular.ttf", "Courier New"),
    ("Doc Symbols", 400, "normal", "DocSymbols.ttf", ""),
    ("Cormorant", 500, "normal", "Cormorant-500.ttf", "+Doc Garamond"),
    ("Cormorant", 600, "normal", "Cormorant-600.ttf", "+Doc Garamond SemiBold"),
    ("Cormorant", 700, "normal", "Cormorant-700.ttf", "+Doc Garamond*"),
    ("Cormorant", 500, "italic", "Cormorant-500Italic.ttf", "+Doc Garamond"),
    ("Cinzel", 600, "normal", "Cinzel-600.ttf", "+Doc Capitals"),
]


def data():
    out = []
    for fam, w, st, f, word in FACES:
        b = open(os.path.join(HERE, f), "rb").read()
        if b[:4] not in (b"\x00\x01\x00\x00", b"true"):
            raise SystemExit("docfont: %s is not a TrueType file" % f)
        e = {"family": fam, "weight": w, "style": st, "word": word.lstrip("+").rstrip("*"), "ttf": base64.b64encode(b).decode("ascii")}
        if word.startswith("+"):
            e["embed"] = 1
            e["bold"] = 1 if word.endswith("*") else 0
        out.append(e)
    return {"faces": out}


if __name__ == "__main__":
    for fam, w, st, f, word in FACES:
        print("%-17s %d %-6s %-32s %7d bytes  Word: %s" % (fam, w, st, f, os.path.getsize(os.path.join(HERE, f)), word or "(any)"))
