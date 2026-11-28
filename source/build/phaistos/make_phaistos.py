"""Phaistos (28 November 2026): her app for her parents, made from Ingenium's Gift edition.

Her words: "I want to make a simplified version of Ingenium for my parents that contains less features and pages and just has the chat
pages and the mentes and possibly the Concordia page"; "Phastos is the baby of Ingenium. It is a lighter and much more simplified and
user-friendly version"; "I don't want any mention of Ingenium, this is an entirely new app with its own look and identity"; "I want for
Phaistos to have a sign-in/sign-out system that Ingenium has but redesigned and repurposed for Phaistos. Please give me full and exact
parity with Ingenium"; "it needs its own unique sign-in page that is not the same Orbit as Ingenium".

The Gift edition carries nothing of its owner's (no plans, rules, devices, apps or owner functions), so Phaistos carries nothing of hers
either. What this adds, at build time and nothing more:
  - its colours: the white and lemon mist she loved, a true soft yellow (look.css; every purple of the page moved to that palette by its
    lightness, the lettering a plain dark grey), by day and by night;
  - its name, its icons and its layered 3D logo (logos3.json, phl.js), its wordmark (wordmark.svg);
  - its pages (Chat and Code, Mentes and Concordia, the Guide and Settings; the Guide's chapters its own), its welcome words;
  - its own sign-in, the Courtyard (court.css): the same sign-in, sign-out, profiles, guest, record and second person as Ingenium's,
    drawn as Phaistos's own; window.ING_ORBIT_ADD gives the second person's tablet.

    python3 make_phaistos.py <ingenium_gift.html> <phaistos.html> [logo key, default tripod]
"""
import base64, colorsys, hashlib, json, os, re, sys

HERE = os.path.dirname(os.path.abspath(__file__))
VERSION = "1"
LEDE = ("Your quiet place on this device to talk, write code and choose the minds that help you. Your conversations stay here. It goes online "
        "only when you ask for something that needs it: a cloud model, a search, a download or Dictate.")
INK, INK2, INK3, SHADE = "#2e2e29", "#55554d", "#76766b", "48,48,40"
P = dict(bg="#fbf7e2", side="#f9f5dc", top="#fdfcf7", card="#ffffff", key="#f5ecbf", edge="#ded091")  # "Soft Yellow", hue 50 to 52


def rgb(h):
    h = h.lstrip("#"); return tuple(int(h[i:i + 2], 16) for i in (0, 2, 4))
def rgbs(h):
    return "%d,%d,%d" % rgb(h)
def mix(a, b, t):
    a, b = rgb(a), rgb(b); return "#%02x%02x%02x" % tuple(max(0, min(255, round(a[i] + (b[i] - a[i]) * t))) for i in range(3))


def variables(p):
    W, bg, card, key, edge = "#ffffff", p["bg"], p["card"], p["key"], p["edge"]
    d = {"serif": "-apple-system,BlinkMacSystemFont,\"Segoe UI\",Inter,\"Helvetica Neue\",Arial,sans-serif", "accent": INK, "accent-deep": "#1f1f1b", "accent-bright": INK2,
         "accent-soft": "rgba(%s,0.35)" % rgbs(key), "accent-softer": "rgba(%s,0.2)" % rgbs(key), "accent-line-rgb": rgbs(edge),
         "fill-hi": mix(key, W, .35), "fill-mid": key, "fill-lo": mix(key, edge, .4),
         "bg": bg, "bg-2": mix(bg, key, .35), "card": card, "card-hi": "#ffffff", "card-lo": mix(card, p["side"], .6), "cl-solid": mix(card, W, .4),
         "ink-1": INK, "ink-2": INK2, "ink-3": INK3, "ink-body": INK, "hairline": "rgba(%s,0.12)" % SHADE, "hairline-soft": "rgba(%s,0.07)" % SHADE,
         "glass": "rgba(%s,0.86)" % rgbs(card), "glass-strong": "rgba(%s,0.95)" % rgbs(card), "glass-border": "rgba(%s,0.10)" % SHADE,
         "input-bg": "rgba(255,255,255,0.32)", "input-bg-hi": "rgba(255,255,255,0.45)", "face-a": mix(card, W, .6), "face-b": card,
         "rim-a": "rgba(255,255,255,.7)", "rim-m": "rgba(%s,.10)" % SHADE, "rim-b": "rgba(%s,.16)" % SHADE, "glint": "rgba(255,255,255,.9)",
         "glint-lo": "rgba(%s,.05)" % SHADE, "well-a": "rgba(%s,.10)" % SHADE, "well-b": "rgba(255,255,255,.75)", "cast-rgb": SHADE, "fam-rgb": SHADE,
         "jewel-a": mix(key, W, .3), "jewel-m": key, "jewel-b": edge, "jewel-rim-a": "rgba(255,255,255,.9)", "jewel-rim-b": "rgba(%s,.35)" % SHADE,
         "gold-ink": edge, "gold-line": edge, "gold-ring": "rgba(%s,.4)" % rgbs(edge), "gold-soft": "rgba(%s,.2)" % rgbs(key),
         "ph-key": key, "ph-keyhi": mix(key, W, .4), "ph-keylo": key, "ph-edge": edge, "ph-keyink": INK, "ph-word": INK, "ph-acc": INK2, "ph-top": p["top"], "ph-side": p["side"]}
    nbg = "#1d1d19"
    n = {"accent": key, "accent-deep": edge, "accent-bright": mix(key, W, .4), "accent-soft": "rgba(%s,0.16)" % rgbs(key), "accent-softer": "rgba(%s,0.08)" % rgbs(key),
         "accent-line-rgb": rgbs(key), "fill-hi": mix(key, W, .2), "fill-mid": key, "fill-lo": edge, "bg": nbg, "bg-2": "#22221d", "card": "#26261f",
         "card-hi": "#2c2c24", "card-lo": "#1a1a16", "cl-solid": "#29291f", "ink-1": "#f8f5dc", "ink-2": "#dedac0", "ink-3": "#b4b098", "ink-body": "#f2efd6",
         "hairline": "rgba(255,255,240,0.10)", "hairline-soft": "rgba(255,255,240,0.06)", "glass": "rgba(38,38,31,0.82)", "glass-strong": "rgba(38,38,31,0.95)",
         "glass-border": "rgba(255,255,240,0.09)", "input-bg": "rgba(0,0,0,0.3)", "input-bg-hi": "rgba(0,0,0,0.4)", "face-a": "#303027", "face-b": "#24241e",
         "cast-rgb": "0,0,0", "ph-key": key, "ph-keyhi": mix(key, W, .35), "ph-keylo": key, "ph-edge": mix(edge, "#000000", .35), "ph-keyink": INK,
         "ph-word": "#f6efb4", "ph-acc": "#dedac0", "ph-top": nbg, "ph-side": nbg}
    return d, n


def fixed(p):
    """the purples the page uses most, moved first: the purples to the dark grey lettering, the purple-tinted shades to neutral ones,
    the pale lilacs to yellows"""
    W, key, edge, bg, card = "#ffffff", p["key"], p["edge"], p["bg"], p["card"]
    return [("#6a3fb5", INK), ("#6A3FB5", INK), ("106,63,181", rgbs(edge)), ("106, 63, 181", rgbs(edge)), ("#4e2c8a", "#1f1f1b"), ("#8a63d2", INK2),
            ("#7348be", key), ("#5d37a1", mix(key, edge, .5)), ("#4b2a86", edge), ("#3a2070", mix(edge, "#000000", .25)), ("#9a7ddc", mix(key, W, .3)),
            ("#7a56c8", key), ("179,155,234", rgbs(mix(key, W, .3))), ("#b39bea", mix(key, W, .3)), ("42,20,80", SHADE), ("40,22,68", SHADE), ("34,26,46", SHADE),
            ("60,30,110", SHADE), ("59,32,102", SHADE), ("71,43,127", SHADE), ("#221a2e", INK), ("#2b2438", INK), ("#4a4358", INK2), ("#6c6579", INK3),
            ("#f5f3f7", bg), ("#efeaf4", mix(bg, key, .35)), ("#faf8fc", card), ("#eee8f4", mix(card, bg, .5)), ("#f4f0fa", card), ("#f9f7fc", mix(card, W, .3)),
            ("#fbfafd", mix(card, W, .5)), ("#efe9f7", mix(bg, key, .3)), ("#f3eefb", mix(card, W, .4))]


def by_lightness(p, L):
    W = "#ffffff"
    if L >= 0.90: return mix(p["card"], W, min(1, (L - 0.90) / 0.10))
    if L >= 0.78: return mix(p["key"], p["card"], (L - 0.78) / 0.12)
    if L >= 0.55: return mix(p["edge"], p["key"], (L - 0.55) / 0.23)
    if L >= 0.30: return mix(INK3, p["edge"], (L - 0.30) / 0.25 * 0.4)
    return mix("#141411", INK, L / 0.30)


def purple(r, g, b):
    H, L, S = colorsys.rgb_to_hls(r / 255, g / 255, b / 255)
    return (0.64 <= H <= 0.88 and S > 0.12), L


def all_purples(s, p):
    def hx(m):
        h = m.group(0); r, g, b = int(h[1:3], 16), int(h[3:5], 16), int(h[5:7], 16)
        ok, L = purple(r, g, b)
        return by_lightness(p, L) if ok else h
    s = re.sub(r"#[0-9a-fA-F]{6}\b", hx, s)
    def tr(m):
        r, g, b = int(m.group(2)), int(m.group(3)), int(m.group(4))
        ok, L = purple(r, g, b)
        if not ok: return m.group(0)
        return m.group(1) + rgbs(by_lightness(p, L)).replace(",", ", " if ", " in m.group(0) else ",")
    return re.sub(r"(rgba?\(\s*)(\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})", tr, s)


def once(s, old, new, what):
    n = s.count(old)
    if n != 1:
        sys.exit("make_phaistos.py: %s: found %d times, not once" % (what, n))
    return s.replace(old, new)


def in_head(s, old, new, what):
    """once, in the page's own head (the same line can stand again further on, inside a copy the page keeps of itself)"""
    k = s.find("</head>")
    n = s[:k].count(old)
    if n != 1:
        sys.exit("make_phaistos.py: %s: found %d times in the head, not once" % (what, n))
    return s[:k].replace(old, new) + s[k:]


def data_png(name):
    return "data:image/png;base64," + base64.b64encode(open(os.path.join(HERE, "icons", name), "rb").read()).decode("ascii")


def build(gift, out, key="tripod"):
    s = open(gift, encoding="utf-8").read()
    m = re.search(r'var ING_EDITION="(\w+)"', s)
    if not m or m.group(1) != "gift":
        sys.exit("make_phaistos.py: Phaistos is made from the Gift edition alone (this page is %r)" % (m.group(1) if m else None))
    v = re.search(r'var ING_VERSION="([0-9.]+)"', s).group(1)
    if "ING_ORBIT_ADD" not in s:
        print("make_phaistos.py: this Gift edition (%s) is older than 8.13: no tablet for a second person yet" % v)
    # colours
    for a, b in fixed(P):
        s = s.replace(a, b)
    s = all_purples(s, P)
    d, n = variables(P)
    css = "html:root{" + ";".join("--%s:%s" % kv for kv in d.items()) + "}" + 'html body[data-theme="night"]{' + ";".join("--%s:%s" % kv for kv in n.items()) + "}"
    look = open(os.path.join(HERE, "look.css"), encoding="utf-8").read()
    court = open(os.path.join(HERE, "court.css"), encoding="utf-8").read()
    logos = json.load(open(os.path.join(HERE, "logos3.json"), encoding="utf-8"))
    if key not in logos:
        sys.exit("make_phaistos.py: no logo named %r (%s)" % (key, ", ".join(logos)))
    L = logos[key]
    word = open(os.path.join(HERE, "wordmark.svg"), encoding="utf-8").read().strip()
    phl = open(os.path.join(HERE, "phl.js"), encoding="utf-8").read()
    run = open(os.path.join(HERE, "runtime.js"), encoding="utf-8").read()
    run = (run.replace("/*PHX_LOGO*/null", json.dumps(L)).replace('/*PHX_WORD*/""', json.dumps(word)).replace('/*PHX_LEDE*/""', json.dumps(LEDE)))
    # its name, its icons, its colour in the window's frame
    s = once(s, "document.write('<link rel=\"icon\" type=\"image/png\" sizes=\"64x64\" href=\"'+I[0]+'\"><link rel=\"apple-touch-icon\" sizes=\"180x180\" href=\"'+I[1]+'\">');",
             "", "Ingenium's own icons")
    icons = ('<link rel="icon" type="image/png" sizes="64x64" href="%s"><link rel="icon" type="image/png" sizes="512x512" href="%s">'
             '<link rel="apple-touch-icon" sizes="180x180" href="%s">' % (data_png("icon_64.png"), data_png("icon_512.png"), data_png("icon_180.png")))
    s = once(s, '<meta name="theme-color" content="#6a3fb5">' if '<meta name="theme-color" content="#6a3fb5">' in s else '<meta name="theme-color" content="%s">' % INK,
             '<meta name="theme-color" content="%s">' % P["bg"], "the window's colour")
    s = in_head(s, '<meta name="apple-mobile-web-app-title" content="Ingenium">', '<meta name="apple-mobile-web-app-title" content="Phaistos">', "the home screen's name")
    s = in_head(s, '<meta name="application-name" content="Ingenium">', '<meta name="application-name" content="Phaistos">', "the app's name")
    s = in_head(s, "<title>Ingenium</title>", "<title>Phaistos</title>", "the title")
    s = in_head(s, '<meta name="ingenium-build" content="">',
             '<meta name="ingenium-build" content=""><meta name="version" content="%s"><meta name="phaistos-build" content="%s">' % (VERSION, VERSION) + icons, "the build's mark")
    # before anything of the page runs: what it is, and that it asks for the second person's tablet
    s = in_head(s, '<meta charset="utf-8">', '<meta charset="utf-8">\n<script id="phaistos-boot">window.ING_APP="phaistos";window.ING_ORBIT_ADD=true;</script>', "the page's first line")
    i = s.find("</head>")
    s = s[:i] + '<style id="phaistos-look">' + css + "\n" + look + "\n" + court + "</style>\n" + s[i:]
    i = s.rfind("</body>")
    s = s[:i] + '<script id="phaistos-phl">' + phl.replace("</", "<\\/") + "</script>\n<script id=\"phaistos-run\">" + run.replace("</script", "<\\/script") + "</script>\n" + s[i:]
    open(out, "w", encoding="utf-8").write(s)
    h = hashlib.sha256(s.encode("utf-8")).hexdigest()
    print("Phaistos %s from the Gift edition of Ingenium %s: %s, %d bytes, sha256 %s, logo %s" % (VERSION, v, out, len(s.encode("utf-8")), h, L["name"]))
    return h


if __name__ == "__main__":
    if len(sys.argv) < 3:
        sys.exit(__doc__)
    build(sys.argv[1], sys.argv[2], sys.argv[3] if len(sys.argv) > 3 else "tripod")
