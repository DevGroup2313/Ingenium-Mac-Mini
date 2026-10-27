"""6.8.1 (27 October 2026): inside Ingenium, Tabula, Abacus and Imago wear Ingenium's seal, not Carpe Diem's, and only the
owner's own copy wears it at all.

The owner's words: "Carpe Diem's seal logo should not be inside of Ingenium's seal section on the apps ribbons, it should be
all be replaced with Ingenium's app logo, the same for the Forge. Please make sure each seal section on the apps ribbons are
reflecting the correct app. Also, please make sure that only the master(owner's version) has the seal or app logo in the apps
ribbons, the demos and gift builds should not have them. They should only give the option to upload your own seal or company
logo and etc."

The three apps are the files Carpe Diem carries, and each draws Carpe Diem's seal itself (its "seal studio": the Seals &
letterheads group on the Insert ribbon, its letterheads, the watermark and the seal set by a signature), with the words
CARPE DIEM and Carpe Diem's blue. Here each takes the house it is carried in, written into it as window.__ingHouse:
  - the master edition: the house's seal (a picture, so the letterheads, the watermark and a signed page show it), its
    name in capitals as the wordmark, its colour;
  - every other edition: no seal and no wordmark. The group keeps "Your own" (a seal, logo or letterhead from a picture
    on the device, kept on it), and the key that opened the house's letterheads opens that instead.
And what the files say: a Word file's watermark is named "Watermark", a tracked change's author "Author" (Carpe Diem was
named in both); Tabula's warning names the app it is in.

patch(name, html, house) -> html; house = {"name", "word", "png" (a data: URL or None), "accent"}."""
import json

MARK = "ING-HOUSE-681"


def _one(text, old, new, what):
    n = text.count(old)
    if n != 1:
        raise SystemExit("house_patch: %s: expected one of %r, found %d" % (what, old[:70], n))
    return text.replace(old, new)


def _all(text, old, new, what, least=1):
    n = text.count(old)
    if n < least:
        raise SystemExit("house_patch: %s: expected %r, found %d" % (what, old[:70], n))
    return text.replace(old, new)


SVG = r"""  function svg(px, mode) {
    /* ING-HOUSE-681: the seal of the app this studio is carried in (window.__ingHouse), a picture set in an SVG so every
       design takes it as it took the drawn seal; in one ink for black or white; none at all where the house gives none */
    var H = window.__ingHouse || {};
    if (!H.png) return '';
    var k = 'ings' + (svg.n = (svg.n || 0) + 1);
    var f = mode === 'ink' ? '0 0 0 0 0.114  0 0 0 0 0.114  0 0 0 0 0.122  0 0 0 1 0' : (mode === 'light' ? '0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 1 0' : '');
    return '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="' + px + '" height="' + px + '" viewBox="0 0 100 100" role="img" aria-label="'
      + String(H.name || '').replace(/[<&"]/g, '') + ' seal">' + (f ? '<defs><filter id="' + k + '"><feColorMatrix type="matrix" values="' + f + '"/></filter></defs>' : '')
      + '<image width="100" height="100" preserveAspectRatio="xMidYMid meet" href="' + H.png + '" xlink:href="' + H.png + '"' + (f ? ' filter="url(#' + k + ')"' : '') + '/></svg>';
  }
"""


def patch(name, html, house):
    if MARK in html:
        return html
    start = html.find('<script id="cd-seal-studio">')
    if start < 0:
        raise SystemExit("house_patch: %s has no seal studio" % name)
    end = html.find("</script>", start)
    mod = html[start:end]
    # the drawn seal gives way to the house's own
    a = mod.find("  function svg(px, mode) {")
    b = mod.find("\n  }\n", a)
    if a < 0 or b < 0:
        raise SystemExit("house_patch: %s: the seal's drawing was not found" % name)
    mod = mod[:a] + SVG + mod[b + len("\n  }\n"):]
    mod = _one(mod, "    return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg(px, mode));",
               "    var s = svg(px, mode);\n    return s ? 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(s) : '';", name + " uri")
    mod = _all(mod, '">CARPE DIEM</', '">\' + ((window.__ingHouse && window.__ingHouse.word) || \'\') + \'</', name + " wordmark", 3)
    mod = _all(mod, "A study of one\\u2019s own</div>", "' + ((window.__ingHouse && window.__ingHouse.tag) || '') + '</div>", name + " tagline")
    mod = _one(mod, "  var BLUE = '#1B6B93', GOLD = '#C6A668', GOLDPALE = '#d4c39a', INK = '#1D1D1F';",
               "  var BLUE = (window.__ingHouse && window.__ingHouse.accent) || '#1B6B93', GOLD = '#C6A668', GOLDPALE = '#d4c39a', INK = '#1D1D1F';", name + " colour")
    mod = _one(mod, "var pen = function (m) { return (m === 'ink') ? INK : BLUE; };",
               "var pen = function (m) { return (m === 'ink') ? INK : ((window.__ingHouse && window.__ingHouse.accent) || BLUE); };", name + " ink")
    for old, new in (('alt="Carpe Diem seal"', 'alt="Seal"'), ("'Carpe Diem seal'", "'Seal'"),
                     ("'All Carpe Diem letterheads, with previews, and the seal to copy'", "'All letterheads, with previews, and the seal to copy'"),
                     ("'All Carpe Diem letterheads'", "'All letterheads'"), ("'Carpe Diem seal and letterheads'", "'Seal and letterheads'"),
                     ("'Carpe Diem letterheads'", "'Letterheads'"), ("['blue', 'Carpe Diem blue']", "['blue', 'In colour']")):
        mod = mod.replace(old, new)
    # with no house seal, the key beside the group opens "Your own" (a seal or logo from a picture on this device)
    mod = _one(mod, "  function openPicker(anchor) {\n",
               "  function openPicker(anchor) {\n    if (!(window.__ingHouse && window.__ingHouse.png)) { try { if (typeof cdAddOwnMark === 'function') cdAddOwnMark(function () { remountGallery(); }); } catch (e) {} return; }\n",
               name + " picker")
    # the panel opens under its group: its caret is hidden on these ribbons, and a hidden button's box is the window's
    # corner, so the panel used to open there, at the top left of the ribbon
    mod = _one(mod, "    var r = anchor.getBoundingClientRect();\n",
               "    var r = anchor.getBoundingClientRect();\n    if (!(r.width || r.height)) { var gp = document.getElementById('cd-seal-group'); if (gp) r = gp.getBoundingClientRect(); }\n", name + " panel place")
    html = html[:start] + mod + html[end:]
    cfg = ('<script id="ing-house">/* ' + MARK + ' · the app these studios are carried in */window.__ingHouse='
           + json.dumps(house, separators=(",", ":")).replace("</", "<\\/") + ';</script>\n')
    html = html[:start] + cfg + html[start:]
    # what the files say, and the house's name where Carpe Diem was named
    html = html.replace("['#1B6B93', 'Carpe Diem blue']", "['#1B6B93', 'Deep blue']")
    if name == "tabula":
        html = _one(html, "      w.textContent='CARPE DIEM'; d.appendChild(w); }",
                    "      w.style.color=(window.__ingHouse&&window.__ingHouse.accent)||'#1B6B93';w.textContent=(window.__ingHouse&&window.__ingHouse.word)||''; d.appendChild(w); }", "tabula wordmark")
        html = _one(html, """    ['The Carpe Diem seal', function(){ put(sealMark(false)); }],
    ['The seal and the wordmark', function(){ put(sealMark(true)); }],
    ['CARPE DIEM, diagonally', function(){ put(words('CARPE DIEM')); }],
""", """  ].concat((window.__ingHouse&&window.__ingHouse.png)?[
    ['The seal', function(){ put(sealMark(false)); }],
    ['The seal and the wordmark', function(){ put(sealMark(true)); }],
    [window.__ingHouse.word+', diagonally', function(){ put(words(window.__ingHouse.word)); }]]:[]).concat([
""", "tabula watermark menu")
        html = _one(html, "  var items=[\n  ].concat(", "  var items=[\n  ].concat(", "tabula watermark menu head")
        html = _one(html, """    ['Remove the watermark', function(){ var o=p.querySelector('.watermark'); if(o) p.removeChild(o); }]
  ];""", """    ['Remove the watermark', function(){ var o=p.querySelector('.watermark'); if(o) p.removeChild(o); }]
  ]);""", "tabula watermark menu foot")
        html = _one(html, "g.fillText('CARPE DIEM', S/2, Math.round(S*0.98));",
                    "g.fillText(((window.__ingHouse&&window.__ingHouse.word)||''), S/2, Math.round(S*0.98));", "tabula watermark picture")
        html = _all(html, 'name="Carpe Diem watermark"', 'name="Watermark"', "tabula watermark name", 2)
        html = _one(html, 'descr="Carpe Diem watermark"', 'descr="Watermark"', "tabula watermark description")
        html = _one(html, "author:ch.getAttribute('data-author')||'Carpe Diem'", "author:ch.getAttribute('data-author')||'Author'", "tabula change author")
        html = _all(html, 'w:author="Carpe Diem"', 'w:author="Author"', "tabula Word author", 2)
        html = _one(html, "if the Carpe Diem application is closed", "if the " + house["name"] + " application is closed", "tabula warning")
        html = _one(html, "a cream style in the Carpe Diem palette", "a cream style in the house palette", "tabula help, tables")
        html = _one(html, "The palettes are Carpe Diem\\'s own: the theme row", "The palettes: the theme row", "tabula help, colours")
    return html
