"""Pass 1054 of Carpe Diem: the tour says what Tabula's autosave now keeps.

The owner's words (18 October 2026): "I also want you to update the tours for all of the apps and their demos so that
everything is cohesive and describe the latest versions of the apps." Pass 1053 made Tabula's autosave, and its hand-over
to a floating window, keep every part of a document (the footnotes, endnotes, bibliography, header, footer and contents),
and made it say on the page when it cannot keep a document; the tour still said nothing of either. One card now follows
"Real files, saved to your device", in English and French, added as the page opens in the way the later passes add and
reorder cards (the tour's own array is left as it was written). Nothing else in the page changes but the build stamp and
the page's photograph of itself.
usage: cd1054.py IN_1053.html OUT.html"""
import os, re, sys, importlib.util

HERE = os.path.dirname(os.path.abspath(__file__))
src, dst = sys.argv[1], sys.argv[2]
s = open(src, encoding="utf-8").read()


def load(name, path):
    spec = importlib.util.spec_from_file_location(name, path)
    mod = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(mod)
    return mod


selfsrc = load("selfsrc", os.path.join(HERE, "..", "carpe_diem_1052", "selfsrc.py"))

# 1. THE CARD (Tabula's autosave: cdAutosave runs 1.2 seconds after the last keystroke and every 20 seconds; pass 1053's
#    tabula_patch.py carries the notes, bibliography, header, footer and contents, and cdSaveWarn says when it cannot)
CARD = r'''<script id="cd1054-tour">/* CARPE DIEM PASS 1054: the tour says what Tabula's autosave keeps (pass 1053) */
(function () {
  function add() {
    try {
      var T = window.DEMO_TOUR; if (!Array.isArray(T)) return false;
      if (T.some(function (c) { return c && c.cd1054; })) return true;
      var i = -1; T.forEach(function (c, k) { if (c && c.en && /Real files, saved to your device/.test(c.en.t || "")) i = k; });
      if (i < 0) return false;
      var base = T[i];
      T.splice(i + 1, 0, {
        cd1054: 1, chap: base.chap, chapFr: base.chapFr,
        sub: "Autosave keeps the whole document", subFr: "L’enregistrement automatique garde tout le document",
        avoid: "#frame-tabula >>> #editor", cardPos: "br",
        go: function () { try { if (typeof openExt === "function") openExt("tabula"); } catch (e) {} try { demoTourSpot(null); } catch (e) {} },
        en: { t: "\u{1F6DF} Autosave keeps the whole document",
              b: "As you write, Tabula keeps your page on this device a moment after you stop typing and every twenty seconds, and not only the text: the footnotes and endnotes, the bibliography, the header and footer, and the contents travel with it. A page moved into a floating window, or opened again after a restart, comes back whole. If a document ever grows past what this device lets Tabula keep, a notice says so on the page and offers a copy as .docx or PDF, so nothing is lost in silence.",
              tip: "Autosave is a safety net, not a filing cabinet. Save a copy to your device at the end of any session that mattered." },
        fr: { t: "\u{1F6DF} L’enregistrement automatique garde tout le document",
              b: "Pendant que vous écrivez, Tabula garde votre page sur cet appareil, un instant après votre dernière frappe et toutes les vingt secondes, et pas seulement le texte : les notes de bas de page et de fin, la bibliographie, l’en-tête et le pied de page, et la table des matières voyagent avec lui. Une page envoyée dans une fenêtre flottante, ou rouverte après un redémarrage, revient entière. Si un document dépasse un jour ce que cet appareil laisse garder à Tabula, un avis le dit sur la page et propose une copie en .docx ou en PDF : rien ne se perd en silence.",
              tip: "L’enregistrement automatique est un filet de sécurité, pas un classeur. Enregistrez une copie sur votre appareil à la fin de toute séance qui compte." }
      });
      return true;
    } catch (e) { return false; }
  }
  if (!add()) { var n = 0, iv = setInterval(function () { if (add() || ++n > 40) clearInterval(iv); }, 250); }
})();
</script>
'''
k = s.rfind("</body>")
if k < 0 or "cd1054-tour" in s:
    raise SystemExit("no body end, or the card is already in")
s = s[:k] + CARD + s[k:]

# 2. THE BUILD STAMP (its edition stays)
m = re.search(r'CD_BUILD=\{date:"2026-10-18",pass:"1053",stamp:"528171053"', s)
if not m:
    raise SystemExit("no CD_BUILD 1053")
s = s.replace(m.group(0), 'CD_BUILD={date:"2026-10-18",pass:"1054",stamp:"528171054"')

# 3. THE PAGE'S PHOTOGRAPH OF ITSELF, taken again, so a copy, a room window and Edit this app all carry 1054
s = selfsrc.rephoto(s)
if re.search(r"<script[^>]+src=[\"']https?://[^\"']*claude\.ai", s[:200000]):
    raise SystemExit("a script from outside that does not belong")
open(dst, "w", encoding="utf-8").write(s)
print("written", dst, len(s.encode("utf-8")))
