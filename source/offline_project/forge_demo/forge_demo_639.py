"""The demonstration of The Forge, made from Forge 639: the whole workshop, live on the visitor's own device, which shows
every step of making an app and makes none.

The owner's words (18 October 2026): "I also want you to provide me with the demo version of the Forge." It follows the
way Carpe Diem's two demonstrations are made (the Public sample and the Committee demo, pass 1048's lock):

  1. The build line names the edition: "Demo" (French "Démo"), after the date, pass and stamp.
  2. A DEMO key sits in the lower left corner, as on Carpe Diem's demonstrations. It opens a short card that says what
     the demonstration is, with the guided tour one press away.
  3. The Forge makes no app and no install package here. The twelve controls that make one (the ten of step 5,
     "Download the app", the Files room's download of an edited app, and Bake) answer with that card instead, and step 5
     says so in its own words. Everything else works: the Editor, the preview, the rooms, the tour, the Guidebook.
  4. It carries two apps to work on, inside its page, as the full Forge does: Carpe Diem's Public sample (its own
     demonstration, which carries nothing personal) and Inkwell. Ingenium (20 MB) and the Forge's copy of itself are
     left out to keep the page light, and their keys are hidden in the Editor.

  5. (638) It can be made without Inkwell, for the site of three apps: the owner's words, "I want an alternate version of
     the Offline project that does not have Inkwell." Then it carries Carpe Diem's Public sample alone, the Editor offers
     Carpe Diem alone, and the card names Carpe Diem alone.

  6. (639) Fabrica is there too, the Forge's own GitHub: a visitor keeps versions, branches, merges and tests them. Its
     controls that make an app, a package or a copy (the three targets, Make them all, the copies' Save, Save a copy and
     Save the whole history) answer with the card, as the rest of the lock does.

usage: forge_demo_639.py FORGE639_LEAN.html CARPE_DIEM_PUBLIC_SAMPLE.html INKWELL.html|- OUT_DIR
       writes OUT_DIR/the_forge_demo.html (with "-" for Inkwell: the demonstration that carries Carpe Diem alone)"""
import base64, gzip, hashlib, json, os, re, sys

STAMP, PASS, DATE = "9s71", "639", "2026-10-18"
lean_p, cd_p, ink_p, out_dir = sys.argv[1:5]
NO_INK = ink_p == "-"
s = open(lean_p, encoding="utf-8").read()
if 'id="forge-bi-meta"' in s or 'id="forge-demo-639"' in s or 'id="room-fabrica"' not in s:
    raise SystemExit("give the Forge 639 lean page (it carries no apps, and is not the demonstration already)")


def outside(t):
    return re.search(r"<script[^>]+src=[\"']https?://[^\"']*claude\.ai", t)


if outside(s):
    raise SystemExit("the Forge page carries a script from outside that does not belong")


def rep(a, b, count=1):
    global s
    n = s.count(a)
    if n != count:
        raise SystemExit("expected %d, found %d: %r" % (count, n, a[:120]))
    s = s.replace(a, b)


# 1. THE EDITION, ON THE BUILD LINE AND IN THE TAB'S TITLE
rep('window.CD_BUILD={date:"%s",pass:"%s",stamp:"%s"};' % (DATE, PASS, STAMP),
    'window.CD_BUILD={date:"%s",pass:"%s",stamp:"%s",edition:"Demo",editionFr:"D\\u00e9mo"};' % (DATE, PASS, STAMP))
rep("<title>The Forge</title>", "<title>The Forge · Demo</title>")

# 2 and 3. THE DEMO KEY, ITS CARD, AND THE LOCK ON MAKING APPS AND PACKAGES
DEMO = r"""<style id="forge-demo-639">
/* THE FORGE'S DEMONSTRATION (made from 639): the DEMO key and its card wear the Forge's own key */
#fg-demo-key{position:fixed;left:14px;bottom:14px;z-index:2147483000;font:800 12px/1 var(--cd-sans,system-ui,sans-serif);letter-spacing:.16em;
  padding:10px 15px;border-radius:999px;cursor:pointer;background:var(--fk-face,#F7F8FA);color:var(--accent,#17577A);border:1px solid var(--fk-rim,rgba(23,87,122,.26));
  box-shadow:var(--fk-key,0 2px 0 rgba(10,30,46,.30),0 4px 5px rgba(10,30,46,.20),0 9px 14px rgba(10,30,46,.13));
  transition:transform .1s cubic-bezier(.34,1.35,.64,1),box-shadow .12s;animation:fgDemoFloat 3.4s ease-in-out infinite}
#fg-demo-key:hover{animation:none;transform:translateY(-2px);box-shadow:var(--fk-key-up,0 3px 0 rgba(10,30,46,.30),0 6px 8px rgba(10,30,46,.22),0 13px 20px rgba(10,30,46,.15))}
#fg-demo-key:active{animation:none;transform:translateY(1px);box-shadow:var(--fk-key-down,inset 0 2px 5px rgba(10,30,46,.24))}
#fg-demo-key:focus-visible{outline:2px solid var(--accent,#17577A);outline-offset:3px}
@keyframes fgDemoFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-3px)}}
body[data-motion="minimal"] #fg-demo-key{animation:none}
@media (prefers-reduced-motion:reduce){#fg-demo-key{animation:none;transition:none}}
#fg-demo-back{position:fixed;inset:0;z-index:2147483001;display:none;align-items:center;justify-content:center;padding:16px;background:rgba(8,14,20,.38)}
#fg-demo-back[data-open="1"]{display:flex}
#fg-demo-card{max-width:440px;width:100%;background:var(--panel,#fff);color:var(--ink,#121619);border:1px solid var(--fk-card-rim,rgba(23,87,122,.22));border-radius:16px;
  padding:20px 22px 18px;box-shadow:0 24px 60px rgba(0,0,0,.28),0 6px 16px rgba(0,0,0,.16);font:400 14px/1.55 var(--cd-sans,system-ui,sans-serif)}
#fg-demo-card h2{margin:0 0 8px;font:700 17px/1.3 var(--cd-serif,Georgia,serif);color:var(--accent-deep,var(--accent,#17577A))}
#fg-demo-card p{margin:0 0 10px}
#fg-demo-card .fg-demo-why{display:none;padding:8px 11px;border-left:3px solid var(--accent,#17577A);background:var(--accent-softer,rgba(23,87,122,.06));border-radius:0 8px 8px 0}
#fg-demo-card[data-why="1"] .fg-demo-why{display:block}
#fg-demo-card .fg-demo-row{display:flex;gap:10px;justify-content:flex-end;flex-wrap:wrap;margin-top:14px}
#fg-demo-card button{font:600 13px/1.2 var(--cd-sans,system-ui,sans-serif);padding:8px 15px;border-radius:999px;cursor:pointer;background:var(--fk-face,#F7F8FA);color:var(--fk-ink,#121619);
  border:1px solid var(--fk-rim,rgba(23,87,122,.26));box-shadow:var(--fk-key,0 2px 0 rgba(10,30,46,.30),0 4px 5px rgba(10,30,46,.20));transition:transform .1s cubic-bezier(.34,1.35,.64,1),box-shadow .12s}
#fg-demo-card button.fg-demo-go{background:var(--accent,#17577A);color:var(--fk-on-accent,#F4EFE4);border-color:var(--fk-primary-rim,var(--accent,#17577A))}
#fg-demo-card button:hover{transform:translateY(-2px)}
#fg-demo-card button:active{transform:translateY(1px)}
.fg-demo-note{margin:0 0 10px;padding:8px 11px;border-left:3px solid var(--accent,#17577A);background:var(--accent-softer,rgba(23,87,122,.06));border-radius:0 8px 8px 0;font-size:13px;line-height:1.45}
/* the demonstration carries Carpe Diem and Inkwell: the Editor offers those two. The rule stands one id above 9s62's
   own rule for these keys (cd-9s62-appseals-css), the Forge's way of placing a later rule over an earlier one */
html:not(#fd1):not(#fd2):not(#fd3):not(#fd4):not(#fd5):not(#fd6):not(#fd7):not(#fd8) body #edAppSeg#edAppSeg > button:is([data-app="ingenium"],[data-app="forge"]){display:none !important}
</style>
<script id="forge-demo-639-js">
/* THE FORGE'S DEMONSTRATION. It shows every step of making an app and makes none: the controls that would make an app
   or an install package answer with a card that says so. The same lock Carpe Diem's demonstrations keep (pass 1048). */
(function () {
  window.FORGE_DEMO = true;
  window.cdLocked = function () { return true; };
  var fr = function () { return document.body && document.body.getAttribute('data-lang') === 'fr'; };
  var W = {
    en: { key: 'DEMO', h: 'The Forge, a demonstration',
      p1: 'Everything you see works, here on your own device, and nothing leaves it: open the Editor, change a word or a colour in Carpe Diem or Inkwell, and watch the preview answer.',
      p2: 'The demonstration makes no app and no install package. The full Forge makes both, for the Mac, Windows, the iPhone and iPad, and the Fire tablet.',
      why: 'This step makes a finished app or its install packages. In the demonstration it is shown, not made.',
      tour: 'Take the guided tour', close: 'Close',
      note: 'In the demonstration, this step shows what the Forge makes, and makes nothing. The full Forge saves the edited app and makes its install packages here.' },
    fr: { key: 'DÉMO', h: 'La Forge, une démonstration',
      p1: 'Tout ce que vous voyez fonctionne, ici sur votre appareil, et rien n’en sort : ouvrez l’Éditeur, changez un mot ou une couleur dans Carpe Diem ou Inkwell, et regardez l’aperçu répondre.',
      p2: 'La démonstration ne fabrique ni app ni paquet d’installation. La Forge complète fabrique les deux, pour le Mac, Windows, l’iPhone et l’iPad, et la tablette Fire.',
      why: 'Cette étape fabrique une app finie ou ses paquets d’installation. Dans la démonstration, elle est montrée, pas faite.',
      tour: 'Suivre la visite guidée', close: 'Fermer',
      note: 'Dans la démonstration, cette étape montre ce que la Forge fabrique, et ne fabrique rien. La Forge complète enregistre ici l’app modifiée et fabrique ses paquets d’installation.' }
  };
  var LOCKED = ['shipHtml', 'shipMac', 'shipMacMini', 'shipWin', 'shipIos', 'shipFire', 'shipWeb', 'shipAllBtn', 'shipRepoFile', 'shipRepoZip', 'fsDl', 'bakeBtn'];
  window.FORGE_DEMO_LOCKED = LOCKED.slice();
  var key, back, card;
  function words() { return fr() ? W.fr : W.en; }
  function paint() {
    var w = words();
    if (key) { key.textContent = w.key; key.setAttribute('aria-label', w.h); }
    if (card) {
      card.querySelector('h2').textContent = w.h;
      card.querySelector('.fg-demo-p1').textContent = w.p1;
      card.querySelector('.fg-demo-p2').textContent = w.p2;
      card.querySelector('.fg-demo-why').textContent = w.why;
      card.querySelector('.fg-demo-go').textContent = w.tour;
      card.querySelector('.fg-demo-x').textContent = w.close;
    }
    var n = document.getElementById('fg-demo-shipnote'); if (n) n.textContent = w.note;
  }
  function open(why) { if (!back) build(); paint(); card.setAttribute('data-why', why ? '1' : '0'); back.setAttribute('data-open', '1'); try { card.querySelector(why ? '.fg-demo-x' : '.fg-demo-go').focus(); } catch (e) {} }
  function shut() { if (back) back.setAttribute('data-open', '0'); try { key.focus(); } catch (e) {} }
  window.forgeDemoCard = open;
  function build() {
    key = document.createElement('button'); key.type = 'button'; key.id = 'fg-demo-key';
    key.addEventListener('click', function () { open(false); });
    back = document.createElement('div'); back.id = 'fg-demo-back';
    back.innerHTML = '<div id="fg-demo-card" role="dialog" aria-modal="true" aria-labelledby="fg-demo-h"><h2 id="fg-demo-h"></h2><p class="fg-demo-why"></p><p class="fg-demo-p1"></p><p class="fg-demo-p2"></p><div class="fg-demo-row"><button type="button" class="fg-demo-x"></button><button type="button" class="fg-demo-go"></button></div></div>';
    card = back.firstChild;
    back.addEventListener('click', function (e) { if (e.target === back) shut(); });
    card.querySelector('.fg-demo-x').addEventListener('click', shut);
    card.querySelector('.fg-demo-go').addEventListener('click', function () {
      shut();
      try { if (typeof window.cdCloseDoor === 'function' && document.getElementById('cd-door')) window.cdCloseDoor(); } catch (e) {}
      setTimeout(function () { try { if (typeof window.forgeStartTour === 'function') window.forgeStartTour(); } catch (e) {} }, 350);
    });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && back.getAttribute('data-open') === '1') shut(); });
    document.body.appendChild(key); document.body.appendChild(back); paint();
  }
  /* the lock: a press on any control that makes an app or a package stops here, before the control hears it */
  /* 639: Fabrica's controls that make an app, a package or a copy */
  function fabMakes(el) { try { if (!el.classList || !el.classList.contains('f-btn') || !el.closest('#fb')) return false; var w = (el.textContent || '').trim();
    return el.id === 'fbMakeAll' || !!el.closest('#fbTargets') || (!!el.closest('#fbCopies') && /^Save( the bundle)?$/.test(w)) || /^Save a copy$|^Save the whole history/.test(w); } catch (e) { return false; } }
  function locked(t) { for (var el = t; el && el !== document; el = el.parentNode) { if (el.id && LOCKED.indexOf(el.id) >= 0) return el; if (fabMakes(el)) return el; } return null; }
  window.addEventListener('click', function (e) {
    var hit = locked(e.target); if (!hit) return;
    e.preventDefault(); e.stopPropagation(); e.stopImmediatePropagation();
    open(true);
  }, true);
  /* step 5 says so in its own words */
  function noteShip() {
    var body = document.querySelector('#fold-ship .fold-body'); if (!body || document.getElementById('fg-demo-shipnote')) return;
    var n = document.createElement('p'); n.id = 'fg-demo-shipnote'; n.className = 'fg-demo-note'; body.insertBefore(n, body.firstChild); paint();
  }
  /* the Editor opens on Carpe Diem when it would open on an app the demonstration does not carry */
  function pickCarried() {
    try {
      var on = document.querySelector('#edAppSeg button[aria-pressed="true"]');
      if (on && /^(ingenium|forge)$/.test(on.getAttribute('data-app') || '')) { var cd = document.querySelector('#edAppSeg button[data-app="cd"]'); if (cd) cd.click(); }
    } catch (e) {}
  }
  /* the tab says it is the demonstration: the Forge names its tab again as it starts and as its language changes */
  function title() { try { var t = document.title || 'The Forge'; if (!/D[eé]mo/.test(t)) document.title = t + (fr() ? ' · Démo' : ' · Demo'); } catch (e) {} }
  function start() { build(); noteShip(); pickCarried(); title(); try { var te = document.querySelector('head > title'); if (te) new MutationObserver(title).observe(te, { childList: true, characterData: true, subtree: true }); } catch (e) {} }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start); else start();
  window.addEventListener('load', function () { noteShip(); title(); setTimeout(pickCarried, 1500); setTimeout(pickCarried, 5000); setTimeout(title, 1500); setTimeout(title, 5000); });
  new MutationObserver(function () { paint(); title(); }).observe(document.body || document.documentElement, { attributes: true, attributeFilter: ['data-lang'] });
})();
</script>"""
if NO_INK:
    # the demonstration carries Carpe Diem alone: the Editor offers it alone, and the card names it alone
    for a, b in (('button:is([data-app="ingenium"],[data-app="forge"])', 'button:is([data-app="ingenium"],[data-app="forge"],[data-app="inkwell"])'),
                 ("/^(ingenium|forge)$/", "/^(ingenium|forge|inkwell)$/"),
                 ("change a word or a colour in Carpe Diem or Inkwell, and watch", "change a word or a colour in Carpe Diem, and watch"),
                 ("changez un mot ou une couleur dans Carpe Diem ou Inkwell, et regardez", "changez un mot ou une couleur dans Carpe Diem, et regardez"),
                 ("/* the demonstration carries Carpe Diem and Inkwell: the Editor offers those two.", "/* the demonstration carries Carpe Diem alone: the Editor offers it alone.")):
        if DEMO.count(a) != 1:
            raise SystemExit("the demonstration without Inkwell: %r not found once" % a)
        DEMO = DEMO.replace(a, b)
k = s.rfind("</body>")
s = s[:k] + DEMO + "\n" + s[k:]


# 4. THE APPS IT CARRIES (Carpe Diem's Public sample, and Inkwell unless it is left out), each checked as it goes in
def carpediem(t):
    m = re.search(r'window\.CD_BUILD=\{date:"([^"]*)",pass:"(\d+)",stamp:"([^"]*)",edition:"Public sample"', t)
    if not m or 'id="section-forge"' in t or 'id="cd-owner-sign"' in t:
        raise SystemExit("Carpe Diem: not its Public sample (the demonstration carries nothing personal)")
    return {"key": "cd", "title": "Carpe Diem", "version": m.group(2), "build": m.group(3), "date": m.group(1), "name": "carpe_diem.html"}


def inkwell(t):
    m = re.search(r"<!-- BUILD='([\d.]+)'", t[:2000])
    if not m or "Inkwell" not in t[:4000]:
        raise SystemExit("Inkwell: not its page")
    return {"key": "inkwell", "title": "Inkwell", "version": m.group(1), "build": "", "date": DATE, "name": "Inkwell.html"}


blocks, metas = [], []


def carry(meta, raw, block_id):
    if outside(raw):
        raise SystemExit(meta["title"] + ": carries a script from outside that does not belong")
    b = raw.encode("utf-8")
    z = gzip.compress(b, 9, mtime=0)
    metas.append(dict(meta, id=block_id, size=len(b), sha256=hashlib.sha256(b).hexdigest(), gz=len(z)))
    blocks.append('<script type="forge/b64" id="%s">%s</script>' % (block_id, base64.b64encode(z).decode("ascii")))


cd_t = open(cd_p, encoding="utf-8").read()
carry(carpediem(cd_t), cd_t, "forge-bi-cd")
if not NO_INK:
    ink_t = open(ink_p, encoding="utf-8").read()
    carry(inkwell(ink_t), ink_t, "forge-bi-inkwell")
sig = hashlib.sha256((STAMP + "|" + "|".join(m["sha256"] for m in metas)).encode()).hexdigest()[:24]
meta_block = '<script type="application/json" id="forge-bi-meta">%s</script>' % json.dumps(
    {"format": "forge-builtin", "stamp": STAMP, "sig": sig, "apps": metas}, separators=(",", ":")).replace("</", "<\\/")
k = s.rfind("</body>")
s = s[:k] + "\n<!-- THE FORGE'S DEMONSTRATION · the apps it carries (Carpe Diem's Public sample" + ("" if NO_INK else ", Inkwell") + ") -->\n" + meta_block + "\n" + "\n".join(blocks) + "\n" + s[k:]
os.makedirs(out_dir, exist_ok=True)
open(os.path.join(out_dir, "the_forge_demo.html"), "w", encoding="utf-8").write(s)
print("demo", len(s.encode("utf-8")), hashlib.sha256(s.encode("utf-8")).hexdigest())
for m in metas:
    print("  carries", m["title"], m["version"], m["size"], "bytes,", m["gz"], "compressed")
