"""Makes 7.31's modules/r314.js from 7.30's: the stone chosen as a family of gemstones and a shade, each with its night (see the script's
own note), the stones drawn from the purple stone's frames (stones.json from cap_purple.js and cut.py), the depth slider gone.
    python3 -I assemble_r314.py <r314.js in> <stones.json> <SRC json> <r314.js out>"""
import sys, json, os
HERE = os.path.dirname(os.path.abspath(__file__))
src, stones, srcj, out = sys.argv[1:5]
s = open(src, encoding="utf-8").read()
START = '<script>try{(window.__ingParts=window.__ingParts||{})["p314"]="started";}catch(_){}'
i = s.index(START)
css, scr = s[:i], s[i:]


def rep(t, a, b, n=1):
    c = t.count(a)
    if c != n:
        sys.exit("expected %d, found %d: %r" % (n, c, a[:90]))
    return t.replace(a, b)


# ---- the style ----
css = rep(css, "/* ============ R314 · THE DIAMOND'S COLOURS, WITHIN REACH (Ingenium 7.29; refined in 7.30, 17 November 2026) ============\n",
          "/* ============ R314 · THE DIAMOND'S COLOURS, WITHIN REACH (Ingenium 7.29; refined in 7.30; its families in 7.31, 17 November 2026) ============\n"
          "   7.31: the stone is chosen as a family of gemstones (Ingenium's purple, Sky blue from Carpe Diem's sticky notes, Sapphire, Aqua,\n"
          "   Emerald, Citrine, Amber, Rose, Ruby, the Clear crystal, or a colour of her own) and a shade (By the hour, Pastel, Medium, Deep), each\n"
          "   family with a night shade of its own that the night theme shows, as Carpe Diem's sticky notes have a night paper each; the northern\n"
          "   lights behind the stone take the family's colour (modules/r292.js family()). Her words are in the script below.\n")
css = rep(css, "/* her own colour: eight cut stones and any colour, in a well; how deep */",
          "/* 7.31: the families, two rows of six on their glass shelves; the shades, four and the night's own (in a dark well, for the night\n"
          "   theme shows it by itself); her own colour, picked in a well */\n"
          ".dmc-fams .dmc-c{min-height:92px}\n"
          ".dmc-fams.dmc-shelf::after{content:\"\";position:absolute;left:6px;right:6px;top:144px;height:8px;border-radius:4px;pointer-events:none;\n"
          "  background:linear-gradient(180deg,rgba(255,255,255,.42),rgba(255,255,255,0));box-shadow:inset 0 1px 0 rgba(255,255,255,.85),0 1px 0 rgba(60,40,100,.06)}\n"
          "body[data-theme=\"night\"] .dmc-fams.dmc-shelf::after{background:linear-gradient(180deg,rgba(255,255,255,.10),rgba(255,255,255,.02));box-shadow:inset 0 1px 0 rgba(255,255,255,.14),0 1px 0 rgba(0,0,0,.4),0 6px 12px rgba(0,0,0,.3)}\n"
          ".dmc-shades{grid-template-columns:repeat(5,minmax(0,1fr))}\n"
          ".dmc-night{cursor:default}\n"
          ".dmc-night .dmc-g{border-radius:16px;background:radial-gradient(120% 90% at 50% 40%,#2c2142,#120c1e 72%);box-shadow:inset 0 1px 3px rgba(0,0,0,.5),inset 0 -1px 0 rgba(255,255,255,.06),0 1px 0 rgba(255,255,255,.55)}\n"
          "body[data-theme=\"night\"] .dmc-night .dmc-g{background:radial-gradient(120% 90% at 50% 40%,#231a36,#0b0714 72%);box-shadow:inset 0 1px 3px rgba(0,0,0,.6),0 1px 0 rgba(255,255,255,.05)}\n"
          ".dmc-night .dmc-g::after{display:none}\n"
          ".dmc-night .dmc-n{color:var(--dmc-ink3);font-weight:500}\n"
          ".dmc-pick{display:grid;grid-template-columns:auto minmax(0,1fr);gap:12px;align-items:center}\n"
          ".dmc-pick .dmc-any{width:66px;height:46px;--sw:58px;border-radius:14px}\n"
          ".dmc-pickt b{display:block;font-size:12.5px;font-weight:600;color:var(--dmc-ink2)}\n"
          ".dmc-pickt small{display:block;margin-top:2px;font-size:11.5px;color:var(--dmc-ink3)}\n"
          "#dmcCard .dmc-fams{grid-template-columns:repeat(6,minmax(0,110px))}\n"
          "#dmcCard .dmc-shades{grid-template-columns:repeat(5,minmax(0,110px))}\n"
          "/* the band's own colour: eight cut stones and any colour, in a well */")
# the depth slider is gone
lines = css.split("\n")
css = "\n".join(l for l in lines if not l.startswith(".dmc-depth"))
assert ".dmc-depth" not in css
# ---- the script ----
head0 = scr.index("/* ---------- Adamas's head: the key in its corner")
head1 = scr.index("/* ---------- Settings, Everyday: \"The diamond on Adamas\" ---------- */")
headpart = scr[head0:head1]
first = scr[:scr.index("(function(){var D=document,W=window;")]
first = rep(first, "/* R314 (7.29, refined in 7.30): the diamond's colours, from a key in the corner of Adamas's head and in Settings, kept with Ingenium's settings */",
            "/* R314 (7.29, refined in 7.30, its families in 7.31): the diamond's colours, from a key in the corner of Adamas's head and in Settings, kept with Ingenium's settings */")
body = open(os.path.join(HERE, "r314_script.js"), encoding="utf-8").read()
tail = open(os.path.join(HERE, "r314_tail.js"), encoding="utf-8").read()
st = json.load(open(stones))
SPR = {"frames": st["frames"], "img": st["img"]}
need = ["stone_clear", "stone_lavender", "stone_purple", "stone_night", "stone_nightT", "band_violet", "band_ruby", "band_rose", "band_amber",
        "band_citrine", "band_emerald", "band_aqua", "band_sapphire", "band_amethyst"]
miss = [k for k in need if k not in st["img"]]
if miss:
    sys.exit("stones.json lacks " + ", ".join(miss))
body = rep(body, "__SRC__", json.dumps(json.load(open(srcj))))
body = rep(body, "__SPR__", json.dumps(SPR, separators=(",", ":")))
body = rep(body, "__REST__\n", headpart + tail)
res = css + first + body + ';try{window.__ingParts["p314"]="running";}catch(_){}\n</script>\n'
open(out, "w", encoding="utf-8").write(res)
print("r314 written", out, len(res))
