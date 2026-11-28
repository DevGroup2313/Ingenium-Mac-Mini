# Phaistos: the four logos she kept, made again as layered objects (28 November 2026). Her words: "I like the Golden tripod, the Phaistos
# disc, the Minoan column, and the Carved Phi logo design recommendations but they look plain and fake and does not have my apps true 3D
# animated popped out layered depth look and effect. These designs you gave me are not elevated, elegant and refined, please redo them."
# Each logo is a list of layers, back to front, each with its depth (z, a share of the logo's size, as Ingenium's seal has them) and one
# drawing on the shared 120 by 120 plan, so all stand in register at rest; art/phl.js mounts them. A solid part (the clay disc, the
# letter) has slices of its own body behind its face, so its side shows as it turns. Lit from the upper left throughout.
import json, os, math

def lin(gid, stops, x1=0, y1=0, x2=1, y2=0, user=None):
    u = ' gradientUnits="userSpaceOnUse"' if user else ""
    if user:
        x1, y1, x2, y2 = user
    return '<linearGradient id="%s" x1="%s" y1="%s" x2="%s" y2="%s"%s>%s</linearGradient>' % (
        gid, x1, y1, x2, y2, u, "".join('<stop offset="%s" stop-color="%s"%s/>' % (o, c, (' stop-opacity="%s"' % a) if a is not None else "") for o, c, a in stops))

def rad(gid, stops, cx=.5, cy=.5, r=.5):
    return '<radialGradient id="%s" cx="%s" cy="%s" r="%s">%s</radialGradient>' % (
        gid, cx, cy, r, "".join('<stop offset="%s" stop-color="%s"%s/>' % (o, c, (' stop-opacity="%s"' % a) if a is not None else "") for o, c, a in stops))

# polished gold seen on a rounded surface: the shaded edge, a bright reflection, the warm body, a dark band, a softer second reflection
GOLD_ROUND = [(0, "#6f4e0e", None), (.1, "#a57a1d", None), (.24, "#f2d27a", None), (.33, "#fff6d6", None), (.42, "#eccb6c", None), (.6, "#b8892a", None),
              (.74, "#8a6214", None), (.86, "#d6ad4e", None), (1, "#6a4a0c", None)]
GOLD_FLAT = [(0, "#fff7dc", None), (.18, "#f4d985", None), (.45, "#d8ae48", None), (.7, "#a97b1f", None), (1, "#6f4e0e", None)]

def svg(body, defs=""):
    return '<svg viewBox="0 0 120 120" aria-hidden="true"><defs>%s</defs>%s</svg>' % (defs, body)

LOGOS = {}

# =============== 1. The Golden Tripod (Hephaestus; Iliad 18.373-377: tripods on golden wheels that go of themselves) ===============
def leg(x0, y0, x1, y1, wt, wb, gid, collar=True):
    L = math.hypot(x1 - x0, y1 - y0); ang = math.degrees(math.atan2(-(x1 - x0), (y1 - y0)))
    c = .44 * L
    p = ('M%.2f 0 L%.2f 0 L%.2f %.2f Q%.2f %.2f %.2f %.2f L%.2f %.2f Q%.2f %.2f %.2f %.2f Z' %
         (-wt, wt, wb, L - 3.2, wb + .4, L - 1.1, wb + 1.9, L, -(wb + 1.9), L, -(wb + .4), L - 1.1, -wb, L - 3.2))
    wc = wt - (wt - wb) * .44
    g = ('<g transform="translate(%.2f %.2f) rotate(%.2f)"><path d="%s" fill="url(#%s)"/>' % (x0, y0, ang, p, gid) +
         '<path d="M%.2f 1 L%.2f %.2f" stroke="#fff4cc" stroke-width=".7" stroke-linecap="round" opacity=".85"/>' % (-wt * .35, -wb * .35, L - 3.6))
    if collar:
        g += ('<rect x="%.2f" y="%.2f" width="%.2f" height="2.6" rx="1.3" fill="url(#%s)"/><rect x="%.2f" y="%.2f" width="%.2f" height=".7" rx=".35" fill="#fff4cc" opacity=".9"/>'
              % (-(wc + 1.1), c - 1.3, 2 * (wc + 1.1), gid, -(wc + .6), c - .9, 2 * (wc + .6) * .55))
    return g + "</g>"

def wheel(cx, cy, r, gid, cls="phl-t-wheel"):
    spokes = "".join('<path d="M%.2f %.2f L%.2f %.2f"/>' % (cx + math.cos(a) * 1.1, cy + math.sin(a) * 1.1, cx + math.cos(a) * (r - .8), cy + math.sin(a) * (r - .8))
                     for a in [i * math.pi / 3 for i in range(6)])
    return ('<g class="%s" style="transform-origin:%.2fpx %.2fpx">' % (cls, cx, cy) +
            '<circle cx="%.2f" cy="%.2f" r="%.2f" fill="none" stroke="url(#%s)" stroke-width="1.7"/>' % (cx, cy, r, gid) +
            '<g stroke="#9c741c" stroke-width=".65" stroke-linecap="round">%s</g>' % spokes +
            '<circle cx="%.2f" cy="%.2f" r="1.15" fill="url(#%s)"/>' % (cx, cy, gid) +
            '<path d="M%.2f %.2f A%.2f %.2f 0 0 1 %.2f %.2f" fill="none" stroke="#fff4cc" stroke-width=".6" stroke-linecap="round" opacity=".9"/>'
            % (cx - r * .7, cy - r * .7, r, r, cx + r * .1, cy - r) + "</g>")

def beads(cx, cy, rx, ry, n, t0, t1, rb):
    out = []
    for i in range(n):
        t = t0 + (t1 - t0) * i / (n - 1)
        x, y = cx + rx * math.cos(t), cy + ry * math.sin(t)
        out.append('<circle cx="%.2f" cy="%.2f" r="%.2f" fill="#c99a33"/><circle cx="%.2f" cy="%.2f" r="%.2f" fill="#fff3c6"/>' % (x, y, rb, x - rb * .3, y - rb * .35, rb * .42))
    return "".join(out)

tri_defs = (lin("tg", GOLD_ROUND) + lin("tf", GOLD_FLAT, 0, 0, 1, 1) +
            lin("ti", [(0, "#9a7522", None), (.45, "#5e440f", None), (1, "#261a03", None)], 0, 0, 0, 1) +
            lin("tsh", [(0, "#000", 0), (.55, "#000", .05), (1, "#000", .38)], 0, 0, 0, 1) +
            lin("tfl", [(0, "#fff8dc", None), (.35, "#ffe07a", None), (.75, "#f8b445", None), (1, "#ee8f2e", None)], 0, 1, 0, 0) +
            lin("tfc", [(0, "#ffffff", None), (1, "#fff1b0", None)], 0, 1, 0, 0) +
            lin("tr", [(0, "#fff7dc", None), (.3, "#f0cf70", None), (.62, "#a87a1e", None), (1, "#5f430b", None)], user=(30, 17, 50, 38)) +
            lin("tr2", [(0, "#fff7dc", None), (.3, "#f0cf70", None), (.62, "#a87a1e", None), (1, "#5f430b", None)], user=(69, 17, 89, 38)) +
            lin("tw", [(0, "#fff1c2", None), (.45, "#d6a843", None), (1, "#7d5913", None)], 0, 0, 1, 1))
LOGOS["tripod"] = dict(root="Hephaestus", name="The Golden Tripod",
  says="Hephaestus's tripod from the Iliad, in polished gold on its golden wheels, a quiet flame in its bowl: the first maker's helpers that move by themselves.",
  layers=[
    dict(z=-.08, svg=svg(leg(60, 66, 60, 99.5, 2.1, 1.5, "tg", collar=False) + wheel(60, 103.4, 3.4, "tw"), tri_defs)),
    dict(z=-.03, svg=svg(
      '<ellipse cx="60" cy="42" rx="31" ry="6.2" fill="url(#tf)"/><ellipse cx="60" cy="42" rx="27.4" ry="4.6" fill="url(#ti)"/>'
      '<path d="M32.6 41.6 A27.4 4.6 0 0 1 87.4 41.6" fill="none" stroke="#3a2a06" stroke-width=".6" opacity=".7"/>'
      '<path d="M31.4 40.4 A30 5.4 0 0 1 60 36.4" fill="none" stroke="#fff8e0" stroke-width=".8" stroke-linecap="round" opacity=".9"/>', tri_defs)),
    dict(z=-.012, svg=svg(
      '<g class="phl-t-flame"><path d="M60 43.4 C52.6 39.2 52.4 31.6 56.6 25.4 C58.4 22.6 59.4 19 60.6 14.6 C63.2 19.8 67.4 25 67 31.8 C66.6 38.2 63.6 41.6 60 43.4 Z" fill="url(#tfl)"/>'
      '<path d="M60 42.6 C56.8 40.2 56.6 35.4 58.7 31.2 C59.5 29.6 60 27.8 60.6 25.6 C62 28.8 64 31.8 63.6 35.8 C63.3 39.2 62 41.4 60 42.6 Z" fill="url(#tfc)"/></g>', tri_defs)),
    dict(z=.022, svg=svg(
      '<path d="M29 42 A31 6.2 0 0 0 91 42 C91 58.2 78.6 70.6 60 70.6 C41.4 70.6 29 58.2 29 42 Z" fill="url(#tg)"/>'
      '<path d="M29 42 A31 6.2 0 0 0 91 42 C91 58.2 78.6 70.6 60 70.6 C41.4 70.6 29 58.2 29 42 Z" fill="url(#tsh)"/>'
      '<path d="M30.2 47.2 A29.8 5.9 0 0 0 89.8 47.2" fill="none" stroke="#6f4e0e" stroke-width=".55" opacity=".8"/>'
      '<path d="M30.2 47.8 A29.8 5.9 0 0 0 89.8 47.8" fill="none" stroke="#fff4cc" stroke-width=".45" opacity=".7"/>'
      '<path d="M31.6 53.4 A28.4 5.6 0 0 0 88.4 53.4" fill="none" stroke="#6f4e0e" stroke-width=".55" opacity=".8"/>'
      '<path d="M31.6 54 A28.4 5.6 0 0 0 88.4 54" fill="none" stroke="#fff4cc" stroke-width=".45" opacity=".7"/>'
      + beads(60, 50.2, 29.2, 5.7, 19, math.pi * .07, math.pi * .93, .95) +
      '<path d="M34 50.6 C36.6 59.6 43 66.2 51.6 68.8" fill="none" stroke="#fffbe8" stroke-width="2.4" stroke-linecap="round" opacity=".55"/>'
      '<path d="M29 42 A31 6.2 0 0 0 91 42 L87.4 42 A27.4 4.6 0 0 1 32.6 42 Z" fill="url(#tf)"/>'
      '<path d="M29.6 42.6 A30.6 6 0 0 0 52 47.8" fill="none" stroke="#fffbe8" stroke-width=".9" stroke-linecap="round"/>', tri_defs)),
    dict(z=.07, svg=svg(leg(45.4, 62.6, 33.4, 101.2, 2.7, 1.8, "tg") + leg(74.6, 62.6, 86.6, 101.2, 2.7, 1.8, "tg") +
                        wheel(33.4, 105.6, 4.4, "tw") + wheel(86.6, 105.6, 4.4, "tw"), tri_defs)),
    dict(z=.13, svg=svg(
      '<rect x="39.1" y="36.4" width="2.8" height="5" rx="1" fill="url(#tf)"/><rect x="78.1" y="36.4" width="2.8" height="5" rx="1" fill="url(#tf)"/>'
      '<circle cx="40.5" cy="27" r="9.6" fill="none" stroke="url(#tr)" stroke-width="3.2"/><circle cx="79.5" cy="27" r="9.6" fill="none" stroke="url(#tr2)" stroke-width="3.2"/>'
      '<path d="M32.4 23.4 A9.6 9.6 0 0 1 41.6 17.5" fill="none" stroke="#fffbe8" stroke-width="1" stroke-linecap="round"/>'
      '<path d="M71.4 23.4 A9.6 9.6 0 0 1 80.6 17.5" fill="none" stroke="#fffbe8" stroke-width="1" stroke-linecap="round"/>'
      '<path d="M45.6 32.4 A7.8 7.8 0 0 1 39 34.6" fill="none" stroke="#fff1c2" stroke-width=".7" stroke-linecap="round" opacity=".8"/>'
      '<path d="M84.6 32.4 A7.8 7.8 0 0 1 78 34.6" fill="none" stroke="#fff1c2" stroke-width=".7" stroke-linecap="round" opacity=".8"/>'
      '<circle cx="40.5" cy="16.2" r="1.7" fill="url(#tf)"/><circle cx="79.5" cy="16.2" r="1.7" fill="url(#tf)"/>', tri_defs))],
  css=".phl-t-flame{transform-box:fill-box;transform-origin:50% 100%;animation:phlFlick 2.9s ease-in-out infinite}"
      "@keyframes phlFlick{0%,100%{transform:scaleY(1) skewX(-2deg)}35%{transform:scaleY(1.07) skewX(2.5deg)}70%{transform:scaleY(.97) skewX(-1deg)}}"
      ".phl-t-wheel{animation:phlRoll 9s ease-in-out infinite}@keyframes phlRoll{0%,100%{transform:rotate(-30deg)}50%{transform:rotate(30deg)}}")

# =============== 2. The Phaistos Disc, its signs pressed into the clay, held in a gold stand ===============
G = {}
G["head"] = '<path d="M-1.5 2C-2 .5-1.5-1 0-1.2 1.2-1.2 1.8-.2 1.6 1L.7 2Z"/><path d="M-1.4-1.1-1.9-2.5M-.6-1.4-.7-2.9M.3-1.4.5-2.9M1.1-1.1 1.7-2.4" fill="none" stroke-width=".55" stroke-linecap="round"/>'
G["shield"] = '<circle r="2" fill="none" stroke-width=".55"/>' + "".join('<circle cx="%.2f" cy="%.2f" r=".36"/>' % (1.25 * math.cos(a), 1.25 * math.sin(a)) for a in [i * math.pi / 3 for i in range(6)]) + '<circle r=".36"/>'
G["man"] = '<circle cy="-1.9" r=".55"/><path d="M0-1.3V.6M0 .6-.9 2.1M0 .6.9 2.1M-1-.5 1-.7" fill="none" stroke-width=".55" stroke-linecap="round"/>'
G["fish"] = '<path d="M-2 0C-1.1-1.1.6-1.1 1.2 0 .6 1.1-1.1 1.1-2 0ZM1.1 0 2.1-.9V.9Z"/>'
G["bird"] = '<path d="M-2 .5C-.8-.6.6-.7 1.4-.2L2.1-.6 1.8.2C1 1-.6 1.2-2 .5Z"/><path d="M-.4-.1-.9-1.7" fill="none" stroke-width=".5" stroke-linecap="round"/>'
G["hide"] = '<path d="M-1.6-1.9-.6-1.4 0-2 .6-1.4 1.6-1.9 1.3 0 1.7 1.9.6 1.5 0 2-.6 1.5-1.7 1.9-1.3 0Z"/>'
G["rosette"] = "".join('<circle cx="%.2f" cy="%.2f" r=".62"/>' % (1.25 * math.cos(a), 1.25 * math.sin(a)) for a in [i * math.pi / 4 for i in range(8)]) + '<circle r=".55"/>'
G["boomerang"] = '<path d="M-1.9 1.4C-1.4-.6.2-1.8 1.9-1.6 .3-.9-.6.3-.9 1.9Z"/>'
ORDER = ["head", "shield", "man", "fish", "bird", "hide", "rosette", "boomerang", "head", "shield", "bird", "man"]

def disc_pattern():
    a, b = 4.5, 30.5 / (2 * math.pi * 4.3)  # r = a + b*theta: about four and a third turns from the centre to the rim
    tmax = 2 * math.pi * 4.3
    pts = ["%.2f %.2f" % ((a + b * t) * math.cos(t), (a + b * t) * math.sin(t)) for t in [i * .05 for i in range(int(tmax / .05) + 1)]]
    spiral = "M" + " L".join(pts)
    signs, dividers, k, t, n = [], [], 0, 2 * math.pi + .35, 0
    while t < tmax - .25:
        r_mid = a + b * t - b * math.pi
        x, y = r_mid * math.cos(t), r_mid * math.sin(t)
        gname = ORDER[k % len(ORDER)]; k += 1
        sc = max(.62, min(1.05, r_mid / 26))
        signs.append('<g transform="translate(%.2f %.2f) rotate(%.1f) scale(%.2f)">%s</g>' % (x, y, math.degrees(t) + 90, sc, G[gname]))
        n += 1
        step = 6.4 / max(r_mid, 6)
        if n % 3 == 0:
            tt = t + step / 2
            r1, r2 = a + b * (tt - 2 * math.pi), a + b * tt
            dividers.append("M%.2f %.2f L%.2f %.2f" % (r1 * math.cos(tt), r1 * math.sin(tt), r2 * math.cos(tt), r2 * math.sin(tt)))
        t += step
    return spiral, " ".join(dividers), "".join(signs)

SP, DV, SG = disc_pattern()
def pressed(inner, dark="#6b5526", light="#fff6dc"):
    # a sign pressed into the clay: its lit lower wall shows below and to the right, its shaded floor and upper wall above
    return ('<g fill="%s" stroke="%s" transform="translate(.32 .34)" opacity=".85">%s</g><g fill="%s" stroke="%s" opacity=".86">%s</g>'
            % (light, light, inner, dark, dark, inner))
disc_defs = (rad("dc", [(0, "#fdf6e0", None), (.55, "#efdcab", None), (1, "#cdb174", None)], .38, .32, .78) +
             rad("dh", [(0, "#ffffff", .7), (1, "#ffffff", 0)], .32, .22, .5) +
             lin("ds", [(0, "#000", 0), (.6, "#000", 0), (1, "#3a2a08", .22)], 0, 0, 1, 1) +
             '<filter id="dn" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency=".85" numOctaves="2" seed="5"/>'
             '<feColorMatrix type="saturate" values="0"/><feComponentTransfer><feFuncA type="table" tableValues="0 .55"/></feComponentTransfer>'
             '<feComposite in2="SourceGraphic" operator="in"/></filter>'
             '<clipPath id="dk"><ellipse cx="60" cy="50" rx="37.6" ry="35.2"/></clipPath>' +
             lin("dg", GOLD_ROUND) + lin("dgf", GOLD_FLAT, 0, 0, 1, 1) +
             lin("dga", [(0, "#fff7dc", None), (.3, "#f0cf70", None), (.62, "#a87a1e", None), (1, "#5f430b", None)], user=(20, 64, 100, 100)))
SLICES = []
for i, z in enumerate([-.07, -.056, -.042, -.028, -.014]):
    shade = ["#8a6e3e", "#977a47", "#a38550", "#ae8f59", "#b89a62"][i]
    extra = '<ellipse cx="60" cy="52.6" rx="40.5" ry="38" fill="%s"/>' % shade if i == 0 else ""
    SLICES.append(dict(z=z, flat=True, svg=svg(extra + '<ellipse cx="60" cy="50" rx="40.5" ry="38" fill="%s"/>' % shade)))
LOGOS["disc"] = dict(root="The Phaistos Disc", name="The Phaistos Disc",
  says="The fired clay disc of Phaistos, its spiral of signs pressed into the clay as the potter stamped them, standing in a slender gold stand; it turns very slowly, as a reader follows the spiral.",
  layers=SLICES + [
    dict(z=0, svg=svg(
      '<ellipse cx="60" cy="50" rx="40.5" ry="38" fill="url(#dc)"/>'
      '<ellipse cx="60" cy="50" rx="40.5" ry="38" fill="#000" filter="url(#dn)" opacity=".13"/>'
      '<g clip-path="url(#dk)"><g transform="translate(60 50) scale(1 .938)"><g class="phl-d-turn"><circle r="40" fill="none"/>'
      '<path d="%s" fill="none" stroke="#fff6dc" stroke-width="1" stroke-linecap="round" transform="translate(.34 .36)" opacity=".85"/>'
      '<path d="%s" fill="none" stroke="#6b5526" stroke-width=".9" stroke-linecap="round" opacity=".8"/>'
      '<path d="%s" fill="none" stroke="#fff6dc" stroke-width=".8" transform="translate(.3 .3)" opacity=".8"/>'
      '<path d="%s" fill="none" stroke="#6b5526" stroke-width=".7" opacity=".75"/>%s</g></g></g>'
      '<ellipse cx="60" cy="50" rx="38.6" ry="36.2" fill="none" stroke="#6b5526" stroke-width=".7" opacity=".55"/>'
      '<ellipse cx="60.3" cy="50.4" rx="38.6" ry="36.2" fill="none" stroke="#fff6dc" stroke-width=".6" opacity=".7"/>'
      '<ellipse cx="60" cy="50" rx="40.5" ry="38" fill="url(#dh)"/><ellipse cx="60" cy="50" rx="40.5" ry="38" fill="url(#ds)"/>'
      '<path d="M24.6 33.4C31 19.8 44 12.6 59.2 12" fill="none" stroke="#fffdf4" stroke-width="1.6" stroke-linecap="round" opacity=".7"/>'
      % (SP, SP, DV, DV, pressed(SG)), disc_defs)),
    dict(z=.06, svg=svg(
      '<path d="M58.6 91.2C46 92.4 30.4 87.2 23.8 73.2" fill="none" stroke="url(#dga)" stroke-width="2.6" stroke-linecap="round"/>'
      '<path d="M61.4 91.2C74 92.4 89.6 87.2 96.2 73.2" fill="none" stroke="url(#dga)" stroke-width="2.6" stroke-linecap="round"/>'
      '<path d="M23.8 73.2C24.4 70.8 26.2 69.6 28.4 69.8" fill="none" stroke="url(#dgf)" stroke-width="2" stroke-linecap="round"/>'
      '<path d="M96.2 73.2C95.6 70.8 93.8 69.6 91.6 69.8" fill="none" stroke="url(#dgf)" stroke-width="2" stroke-linecap="round"/>'
      '<path d="M57.4 89.6h5.2l-.6 9.6h-4z" fill="url(#dg)"/><ellipse cx="60" cy="94.4" rx="3.6" ry="2.3" fill="url(#dg)"/>'
      '<path d="M27.6 80.8C34.6 88.6 45.4 91.6 55.4 91" fill="none" stroke="#fffbe8" stroke-width=".7" stroke-linecap="round" opacity=".85"/>', disc_defs)),
    dict(z=.09, svg=svg(
      '<path d="M41 104.4A19 3.6 0 0 0 79 104.4V107.6A19 3.6 0 0 1 41 107.6Z" fill="url(#dg)"/><ellipse cx="60" cy="104.4" rx="19" ry="3.6" fill="url(#dgf)"/>'
      '<path d="M45.6 99.6A14.4 2.8 0 0 0 74.4 99.6V103A14.4 2.8 0 0 1 45.6 103Z" fill="url(#dg)"/><ellipse cx="60" cy="99.6" rx="14.4" ry="2.8" fill="url(#dgf)"/>'
      '<path d="M46.4 99.2A13.6 2.4 0 0 1 60 96.9" fill="none" stroke="#fffbe8" stroke-width=".7" stroke-linecap="round"/>', disc_defs))],
  css=".phl-d-turn{transform-box:fill-box;transform-origin:50% 50%;animation:phlTurn 160s linear infinite}@keyframes phlTurn{to{transform:rotate(360deg)}}")

# =============== 3. The Minoan Column, as at Phaistos and Knossos ===============
col_defs = (lin("cg", GOLD_ROUND) + lin("cgf", GOLD_FLAT, 0, 0, 1, 1) +
            lin("cb", [(0, "#77776d", None), (.18, "#2b2b26", None), (.55, "#121210", None), (.8, "#3a3a34", None), (1, "#0b0b09", None)], 0, 0, 0, 1) +
            lin("cbh", [(0, "#fff", 0), (.5, "#fff", .55), (1, "#fff", 0)], 0, 0, 1, 0) +
            lin("cm", [(0, "#d5cfba", None), (.28, "#ffffff", None), (.62, "#f2efe4", None), (1, "#bfb8a0", None)]) +
            lin("cmt", [(0, "#ffffff", None), (1, "#ebe6d6", None)], 0, 0, 0, 1) +
            lin("cs", [(0, "#000", 0), (.7, "#000", .06), (1, "#000", .28)], 0, 0, 0, 1))
LOGOS["column"] = dict(root="Phaistos, the palace", name="The Minoan Column",
  says="A column of the Cretan palaces, widening as it rises: polished gold under a glossy black cushion and an ivory abacus, crowned with the gold horns of consecration, on stepped ivory marble.",
  layers=[
    dict(z=-.03, svg=svg(
      '<path d="M45 52.4H75L70.6 92.6H49.4Z" fill="url(#cg)"/><path d="M45 52.4H75L70.6 92.6H49.4Z" fill="url(#cs)"/>'
      '<path d="M50.4 54.2 53.2 91" stroke="#fffbe8" stroke-width="1.5" stroke-linecap="round" opacity=".75"/>'
      '<path d="M49 88.6H71" stroke="#6f4e0e" stroke-width=".6" opacity=".6"/><path d="M49.2 89.3H70.8" stroke="#fff4cc" stroke-width=".5" opacity=".7"/>'
      '<rect x="47.6" y="89.6" width="24.8" height="3.4" rx="1.6" fill="url(#cgf)"/>', col_defs)),
    dict(z=.05, svg=svg(
      '<rect x="44" y="92.8" width="32" height="4.4" rx=".8" fill="url(#cm)"/><rect x="44" y="92.8" width="32" height="1.1" rx=".5" fill="url(#cmt)"/>'
      '<rect x="37" y="97.2" width="46" height="5.2" rx=".8" fill="url(#cm)"/><rect x="37" y="97.2" width="46" height="1.2" rx=".5" fill="url(#cmt)"/>'
      '<rect x="30" y="102.4" width="60" height="6.2" rx=".8" fill="url(#cm)"/><rect x="30" y="102.4" width="60" height="1.3" rx=".5" fill="url(#cmt)"/>'
      '<path d="M30 108.6H90M37 102.4H83M44 97.2H76" stroke="rgba(46,46,41,.3)" stroke-width=".7"/>'
      '<path d="M35 105.6C41 104.8 45 106.4 51 105.4S60 104.6 66 105.6M58 99.6C63 99 67 100.2 72 99.4" fill="none" stroke="rgba(150,138,104,.32)" stroke-width=".55"/>', col_defs)),
    dict(z=.085, svg=svg(
      '<rect x="42.6" y="49.8" width="34.8" height="3.4" rx="1.7" fill="url(#cgf)"/><path d="M43.4 50.5H76.6" stroke="#fffbe8" stroke-width=".6"/>'
      '<path d="M37.2 40.4H82.8C86 40.4 87.6 42.8 87.6 45.2S86 50 82.8 50H37.2C34 50 32.4 47.6 32.4 45.2S34 40.4 37.2 40.4Z" fill="url(#cb)"/>'
      '<path d="M37.4 42.2C48 41.2 72 41.2 82.6 42.2" fill="none" stroke="url(#cbh)" stroke-width="1.2" stroke-linecap="round"/>'
      '<rect x="34.6" y="32.6" width="50.8" height="7.9" rx=".9" fill="url(#cm)"/><rect x="34.6" y="32.6" width="50.8" height="1.4" rx=".6" fill="url(#cmt)"/>'
      '<path d="M34.6 40.5H85.4" stroke="rgba(46,46,41,.32)" stroke-width=".7"/>', col_defs)),
    dict(z=.135, svg=svg(
      '<rect x="45.4" y="27" width="29.2" height="5.8" rx=".8" fill="url(#cgf)"/>'
      '<path d="M44.4 27.2C42.8 21.2 40.8 15.2 39.6 9.4L43.8 8.8C45.8 16.4 49.8 22.4 56.2 23.6H63.8C70.2 22.4 74.2 16.4 76.2 8.8L80.4 9.4C79.2 15.2 77.2 21.2 75.6 27.2Z" fill="url(#cg)"/>'
      '<path d="M41 10.6C42.2 16.4 44 21.6 46.4 25.4M74.2 12.6C73.4 15.4 72.4 17.8 71.2 19.8" fill="none" stroke="#fffbe8" stroke-width=".9" stroke-linecap="round"/>'
      '<path d="M45.4 32.8H74.6" stroke="#6f4e0e" stroke-width=".7" opacity=".6"/>', col_defs))],
  css="")

# =============== 4. The Carved Phi: the first letter of Phaistos, cut as a sculptor cuts gold ===============
BOWL_O, BOWL_I = (31, 26.5), (20.5, 19.5)
MID = ((BOWL_O[0] + BOWL_I[0]) / 2, (BOWL_O[1] + BOWL_I[1]) / 2)
def ring(o, i, cx=60, cy=60):
    return ("M%.2f %.2fa%.2f %.2f 0 1 0 %.2f 0a%.2f %.2f 0 1 0 %.2f 0Z M%.2f %.2fa%.2f %.2f 0 1 1 %.2f 0a%.2f %.2f 0 1 1 %.2f 0Z"
            % (cx - o[0], cy, o[0], o[1], 2 * o[0], o[0], o[1], -2 * o[0], cx - i[0], cy, i[0], i[1], 2 * i[0], i[0], i[1], -2 * i[0]))
STEM = "M55 13.6H65V106.4H55Z"
SERIFS = "M45.6 8.4H74.4L71 13.6H49Z M45.6 111.6H74.4L71 106.4H49Z"
LETTER = ring(BOWL_O, BOWL_I) + " " + STEM + " " + SERIFS
phi_defs = (lin("po", [(0, "#fff6d4", None), (.35, "#f0cd6a", None), (.62, "#c0922c", None), (1, "#6c4b0c", None)], user=(30, 34, 90, 86)) +
            lin("pi", [(0, "#6c4b0c", None), (.4, "#b3852a", None), (.7, "#ecc764", None), (1, "#fff3cc", None)], user=(40, 41, 80, 79)) +
            lin("psl", [(0, "#fff4cc", None), (.5, "#efcd6e", None), (1, "#cfa144", None)], 0, 0, 0, 1) +
            lin("psr", [(0, "#b7882a", None), (1, "#7a5711", None)], 0, 0, 0, 1) +
            lin("pst", [(0, "#fff6d4", None), (1, "#e2b955", None)], 0, 0, 0, 1) +
            lin("psb", [(0, "#a87a1e", None), (1, "#6c4b0c", None)], 0, 0, 0, 1))
def slab(z, path, colour):
    return dict(z=z, flat=True, svg=svg('<path fill-rule="evenodd" d="%s" fill="%s"/>' % (path, colour)))
PHI_LAYERS = [slab(z, LETTER, c) for z, c in zip([-.075, -.062, -.049, -.036, -.023, -.011], ["#4f3608", "#5c3f0a", "#68480c", "#73510f", "#7d5912", "#876116"])]
PHI_LAYERS.append(dict(z=0, svg=svg(
    '<path fill-rule="evenodd" d="%s" fill="url(#po)"/>' % ring(BOWL_O, MID) +
    '<path fill-rule="evenodd" d="%s" fill="url(#pi)"/>' % ring(MID, BOWL_I) +
    '<ellipse cx="60" cy="60" rx="%.2f" ry="%.2f" fill="none" stroke="#fffbe8" stroke-width=".55" opacity=".8"/>' % MID +
    '<path d="M31.6 52.4C34.8 42.4 44.6 34.2 58 33.6" fill="none" stroke="#fffdf2" stroke-width="1.1" stroke-linecap="round" opacity=".9"/>', phi_defs)))
STEM_SIL = STEM + " " + SERIFS
PHI_LAYERS += [slab(z, STEM_SIL, c) for z, c in zip([.012, .022, .032, .042], ["#6a4a0c", "#76530f", "#815c13", "#8c6617"])]
PHI_LAYERS.append(dict(z=.052, svg=svg(
    '<path d="M55 13.6H60V106.4H55Z" fill="url(#psl)"/><path d="M60 13.6H65V106.4H60Z" fill="url(#psr)"/>'
    '<path d="M60 14.4V105.6" stroke="#fffbe8" stroke-width=".5" opacity=".85"/><path d="M55.6 15V105" stroke="#fffdf2" stroke-width=".6" opacity=".7"/>'
    '<path d="M45.6 8.4H74.4L72.7 11H47.3Z" fill="url(#pst)"/><path d="M47.3 11H72.7L71 13.6H49Z" fill="url(#psb)"/>'
    '<path d="M45.6 111.6H74.4L72.7 109H47.3Z" fill="url(#psb)"/><path d="M47.3 109H72.7L71 106.4H49Z" fill="url(#pst)"/>'
    '<path d="M46.4 8.9H73.6" stroke="#fffdf2" stroke-width=".55"/><path d="M48 108.9H72" stroke="#fffbe8" stroke-width=".45" opacity=".8"/>', phi_defs)))
LOGOS["phi"] = dict(root="The letter Phi", name="The Carved Phi",
  says="The first letter of Phaistos cut in polished gold as a sculptor would cut it: each stroke with two facets meeting at a sharp ridge, its stem standing proud of its bowl, a solid letter whose depth shows as it turns.",
  layers=PHI_LAYERS, css="")

if __name__ == "__main__":
    out = os.path.join(os.path.dirname(os.path.abspath(__file__)), "logos3.json")
    json.dump(LOGOS, open(out, "w"), indent=1)
    print("written", [(k, len(v["layers"])) for k, v in LOGOS.items()], os.path.getsize(out), "bytes")
