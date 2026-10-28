"""6.8.5: the apps on Home as Carpe Diem's and the Forge's cut stones. The owner's words (28 October 2026): "I want the
'Your apps' section to actually show the brick jewelled sparkling pill look of the apps original button designs from Carpe
Diem and the Forge instead of this random button design that you've subtituted for them in Ingenium."

cd_stones.json holds Carpe Diem's own stones as it paints them on its app keys (its cd-jewel-js, the table cut: a flat top,
facets only at the edges), and cd_star.json its spark (a small white four-pointed star). Tabula, Abacus, Imago, Scriba and
Fontes take their own stones; Clepsydra takes Carpe Diem's gold workspace stone; Schedae, which has no stone in Carpe
Diem, takes Scriba's stone turned to Ingenium's amethyst (each colour's hue turned, its lightness kept; the gilt kept).
    python3 make_jewels.py  ->  jewels.css beside it (build_page.py writes it in place of /*R147_JEWELS*/)"""
import base64, colorsys, json, os, re

HERE = os.path.dirname(os.path.abspath(__file__))
ST = json.load(open(os.path.join(HERE, "cd_stones.json")))
STAR = json.load(open(os.path.join(HERE, "cd_star.json")))["star"]
GILT = {"#c98a3a", "#c9a15a", "#e8c785", "#fff6d8"}


def amethyst(svg):
    def turn(m):
        c = m.group(1).lower()
        if c in GILT:
            return m.group(0)
        r, g, b = (int(c[i:i + 2], 16) / 255 for i in (1, 3, 5))
        h, l, s = colorsys.rgb_to_hls(r, g, b)
        h = (h + 44 / 360) % 1
        s = min(1, s * 1.3)
        r, g, b = colorsys.hls_to_rgb(h, l, s)
        return 'fill="#%02x%02x%02x"' % (round(r * 255), round(g * 255), round(b * 255))
    return re.sub(r'fill="(#[0-9a-fA-F]{6})"', turn, svg)


def uri(svg):
    return "data:image/svg+xml;base64," + base64.b64encode(svg.encode("utf-8")).decode("ascii")


STONES = {"tabula": ST["tabula-btn"], "abacus": ST["abacus-btn"], "slides": ST["imago-btn"], "scriba": ST["scriba-app-btn"],
          "fontes": ST["fontes-btn"], "clepsydra": ST["curric-ws-btn"], "schedae": amethyst(ST["scriba-app-btn"])}
# each stone on its own slow clock, so no two catch the light together (Carpe Diem's own timings)
CLOCK = {"tabula": (0, 9.5), "abacus": (.9, 10.5), "slides": (1.8, 10), "scriba": (2.6, 11.5), "fontes": (3.4, 10.2),
         "clepsydra": (1.3, 11), "schedae": (4.1, 10.8)}
out = []
for k, svg in STONES.items():
    d, n = CLOCK[k]
    out.append('.hx-app[data-app="%s"] .hx-stone{background-image:url("%s")}' % (k, uri(svg)))
    out.append('.hx-app[data-app="%s"] .hx-stone::before{animation-delay:%ss;animation-duration:%ss}' % (k, d, n))
out.append('.hx-app .hx-stone::before{background-image:%s}' % ",".join(['url("%s")' % STAR] * 6))
open(os.path.join(HERE, "jewels.css"), "w").write("\n".join(out) + "\n")
print("jewels.css", sum(len(x) for x in out), "characters;", ", ".join(STONES))
