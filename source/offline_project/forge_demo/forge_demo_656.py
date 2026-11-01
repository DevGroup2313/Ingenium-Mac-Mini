"""The demonstration of The Forge, made from Forge 656 (as 653's was made from 653): the whole workshop, live on the
visitor's own device, which shows every step of making an app and makes none. It carries one of Carpe Diem's own
demonstrations, and no other app.

The owner's words (18 October 2026): "I also want you to provide me with the demo version of the Forge." It follows the
way Carpe Diem's two demonstrations are made (the Public sample and the Committee demo, pass 1048's lock):

  1. The build line names the edition: "Demo" (French "Démo"), after the pass and stamp.
  2. A DEMO key sits in the lower left corner, as on Carpe Diem's demonstrations. It opens a short card that says what
     the demonstration is, with the guided tour one press away.
  3. The Forge makes no app and no install package here. The twelve controls that make one (the ten of step 5,
     "Download the app", the Files room's download of an edited app, and Bake) answer with that card instead, and step 5
     says so in its own words. Everything else works: the Editor, the preview, the rooms, the tour, the Guidebook.
  4. (656) Which apps it carries depends on where it is shown. The owner's words (1 November 2026): "The Forge's demo
     inside of the Offline Project can show Carpe Diem, the Forge, Ingenium and Inkwell's demos. The other variation of
     the Offline Project without Inkwell should have the Forge's demo load up all of the other apps except Inkwell. I
     only want the standalone Forge's demo that is on its own website and not included in the Offline's Project master
     demo to only show Carpe Diem, The Forge's public sample demos and 'Another App'". So it always carries Carpe Diem's
     Public sample and its own page (the demonstration, carrying nothing: its "copy of itself", as the full Forge
     carries its lean page), and also Ingenium's demo edition (--ingenium) and Inkwell (--inkwell) when they are given:
       the Offline Project's site of four apps   --ingenium and --inkwell: Carpe Diem, The Forge, Inkwell, Ingenium
       its site of three, without Inkwell        --ingenium:              Carpe Diem, The Forge, Ingenium
       the demonstration on its own website      neither:                  Carpe Diem, The Forge
     The Editor's switch offers those, then Another app; the keys of the apps it does not carry are hidden.
  5. (656) The words that list the apps the full Forge carries (the Guidebook's Editor steps and "Your four apps", the
     Editor's own help card, the tour's two Editor cards, the Editor's card for an app not kept yet, the DEMO card) name
     the apps this demonstration carries, in English and French, and the Guidebook's articles on editing Inkwell and
     Ingenium are left out when it does not carry them. (Before 1 November it carried Carpe Diem's alone, at the owner's
     words of 25 October.)
  6. (639) Fabrica is there too, the Forge's own GitHub: a visitor keeps versions, branches, merges and tests them. Its
     controls that make an app, a package or a copy (the targets, Make the chosen, the copies' Save, Save a copy, the
     whole history as a git bundle from its key or from the More menu, and Download as an app) answer with the card.
  7. (653) It keeps its storage under a name of its own. The owner's words (27 October 2026): "Please make sure that all of
     my handdrawn signatures samples and personal informations are also removed from the apps ribbons of Ingenium and the
     Forge's demos." Nothing of hers is written into the demonstration, but a browser keeps one store for every page of one
     address (every GitHub Pages site of an account shares one, and pages opened from the disk share one too), so the
     demonstration opened where her own Forge is kept would read her Forge's library, her signatures, marks, letterheads
     and documents in Tabula, Abacus and Imago. Ingenium's own storage shim (../build/storage_shim.py), with the prefix
     "forge-demo:", runs first in the page, in each app the Forge carries in its own page (cd-src-*), and in the Carpe
     Diem page the demonstration carries: every name they store goes under it, in localStorage and IndexedDB.
  8. (653) Tabula, Abacus and Imago wear no seal (the owner's words: "only the master(owner's version) has the seal or app
     logo in the apps ribbons, the demos and gift builds should not have them. They should only give the option to upload
     your own seal or company logo"): their house (window.__ingHouse, ../build/apps/house_patch.py) is the Forge with no
     seal and no wordmark, so their Seals & letterheads group offers Your own.
  9. (656) No signature of hers. The owner's copy of the Forge seeds her own hand-drawn signature and three sample hands
     into the signatures that Tabula, Abacus and Imago keep (cd-owner-sign-js), and 653's storage of its own did not stop
     that: the demonstration seeded them into its own store. The demonstration leaves that script out, takes those
     signatures out of its own list if an earlier visit kept them (by their exact names, so a signature the visitor makes,
     typed, uploaded or drawn, stays), no longer names itself the owner's personal copy in its checks, and the author's
     name field suggests "Your name" in place of hers.

usage: forge_demo_656.py FORGE656_LEAN.html CARPE_DIEM_DEMO.html OUT_DIR [--ingenium INGENIUM_DEMO.html] [--inkwell INKWELL.html]
       writes OUT_DIR/the_forge_demo.html
CARPE_DIEM_DEMO.html is one of Carpe Diem's demonstrations that opens without an access code (its Public sample), and
carries nothing personal."""
import base64, gzip, hashlib, json, os, re, sys

STAMP, PASS, DATE = "9s88", "656", "2026-10-28"
import argparse
ap = argparse.ArgumentParser(usage=__doc__.split("usage: ")[1])
ap.add_argument("lean"); ap.add_argument("cd"); ap.add_argument("out")
ap.add_argument("--ingenium", help="Ingenium's demo edition (build_page.py with ING_EDITION=demo), to carry too")
ap.add_argument("--inkwell", help="Inkwell's page, to carry too")
A = ap.parse_args()
lean_p, cd_p, out_dir = A.lean, A.cd, A.out
s = open(lean_p, encoding="utf-8").read()
if 'id="forge-bi-meta"' in s or 'id="forge-demo-639"' in s or 'id="room-fabrica"' not in s:
    raise SystemExit("give the Forge 656 lean page (it carries no apps, and is not the demonstration already)")
if 'pass:"656"' not in s:
    raise SystemExit("this is not the Forge 656")


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
  /* 639: Fabrica's controls that make an app, a package or a copy; 656: also its More menu's items (the whole history as a
     git bundle, Download as an app) and a sheet's "Save its history first", which are not f-btn keys */
  function fabMakes(el) { try { if (!el.classList || el.tagName !== 'BUTTON' || !el.closest('#fb')) return false; var w = (el.textContent || '').trim();
    if (/^Save a copy$|^Save the whole history|^Save its history first$|Download as an app/.test(w)) return true;
    if (!el.classList.contains('f-btn')) return false;
    return el.id === 'fbMakeAll' || !!el.closest('#fbTargets') || (!!el.closest('#fbCopies') && /^Save( the bundle)?$/.test(w)); } catch (e) { return false; } }
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
# 4 and 5 (656). THE APPS IT CARRIES, AND THE WORDS THAT NAME THEM: Carpe Diem and the Forge always; Ingenium and Inkwell
# when they are given
CARRY = [k for k in ("cd", "forge", "inkwell", "ingenium") if k in ("cd", "forge") or (k == "inkwell" and A.inkwell) or (k == "ingenium" and A.ingenium)]
HIDE = [k for k in ("ingenium", "forge", "inkwell") if k not in CARRY]
EN = {"cd": "Carpe Diem", "forge": "The Forge", "inkwell": "Inkwell", "ingenium": "Ingenium"}
FR = {"cd": "Carpe Diem", "forge": "La Forge", "inkwell": "Inkwell", "ingenium": "Ingenium"}
TOUR_EN = dict(EN, forge="the Forge itself")
TOUR_FR = dict(FR, forge="la Forge elle-même")


def join(names, last):
    return names[0] if len(names) == 1 else ", ".join(names[:-1]) + " " + last + " " + names[-1]


or_en, and_en = join([EN[k] for k in CARRY], "or"), join([EN[k] for k in CARRY], "and")
or_fr, and_fr = join([FR[k] for k in CARRY], "ou"), join([FR[k] for k in CARRY], "et")
for a, b in (('button:is([data-app="ingenium"],[data-app="forge"])', 'button:is(%s)' % (",".join('[data-app="%s"]' % k for k in HIDE) or '[data-app="-"]')),
             ("/^(ingenium|forge)$/", "/^(%s)$/" % ("|".join(HIDE) or "-")),
             ("change a word or a colour in Carpe Diem or Inkwell, and watch", "change a word or a colour in %s, and watch" % or_en),
             ("changez un mot ou une couleur dans Carpe Diem ou Inkwell, et regardez", "changez un mot ou une couleur dans %s, et regardez" % or_fr),
             ("/* the demonstration carries Carpe Diem and Inkwell: the Editor offers those two.", "/* the demonstration carries %s: the Editor offers them, then Another app." % and_en)):
    if DEMO.count(a) != 1:
        raise SystemExit("the demonstration's apps: %r not found once" % a)
    DEMO = DEMO.replace(a, b)
k = s.rfind("</body>")
s = s[:k] + DEMO + "\n" + s[k:]
for a, b in (
        ("<li>Choose the app at the top (Editing): Carpe Diem, The Forge, Inkwell or Ingenium. The Forge carries all four inside it "
         "and keeps them on this device on its first start, so choosing one opens it at once.</li>",
         "<li>Choose the app at the top (Editing): %s, or Another app for a page of your own. The demonstration carries %s inside it "
         "and keeps them on this device on its first start, so choosing one opens it at once.</li>" % (or_en, and_en)),
        ("<li>Choisissez l’app en haut (Édition) : Carpe Diem, La Forge, Inkwell ou Ingenium. La Forge les porte toutes les quatre en "
         "elle et les garde sur cet appareil à son premier démarrage : en choisir une l’ouvre aussitôt.</li>",
         "<li>Choisissez l’app en haut (Édition) : %s, ou Une autre app pour une page à vous. La démonstration porte en elle %s et les "
         "garde sur cet appareil à son premier démarrage : en choisir une l’ouvre aussitôt.</li>" % (or_fr, and_fr)),
        ('["Choose the app at the top (Editing): Carpe Diem, The Forge, Inkwell or Ingenium. The Forge carries all four inside it and '
         'keeps them on this device on its first start, so choosing one opens it at once.", ',
         '["Choose the app at the top (Editing): %s, or Another app for a page of your own. The demonstration carries %s inside it and '
         'keeps them on this device on its first start, so choosing one opens it at once.", ' % (or_en, and_en)),
        ('["Choisissez l’app en haut (Édition) : Carpe Diem, La Forge, Inkwell ou Ingenium. La Forge les porte toutes les quatre en elle '
         'et les garde sur cet appareil à son premier démarrage : en choisir une l’ouvre aussitôt.", ',
         '["Choisissez l’app en haut (Édition) : %s, ou Une autre app pour une page à vous. La démonstration porte en elle %s et les '
         'garde sur cet appareil à son premier démarrage : en choisir une l’ouvre aussitôt.", ' % (or_fr, and_fr)),
        ("<h4>Your four apps</h4><p>The Forge carries Carpe Diem, Inkwell and Ingenium inside it, with a copy of itself. On its first "
         "start on each device it keeps them in the Editor, each checked against its fingerprint. No other file is needed.</p>",
         "<h4>The apps it carries</h4><p>The demonstration carries %s inside it. On its first start on each device it keeps them in the "
         "Editor, each checked against its fingerprint. No other file is needed.</p>" % and_en),
        ("<h4>Vos quatre apps</h4><p>La Forge porte en elle Carpe Diem, Inkwell et Ingenium, avec une copie d’elle-même. À son premier "
         "démarrage sur chaque appareil, elle les garde dans l’Éditeur, chacune vérifiée par son empreinte. Aucun autre fichier n’est nécessaire.</p>",
         "<h4>Les apps qu’elle porte</h4><p>La démonstration porte en elle %s. À son premier démarrage sur chaque appareil, elle les garde "
         "dans l’Éditeur, chacune vérifiée par son empreinte. Aucun autre fichier n’est nécessaire.</p>" % and_fr),
        ("It opens one of your apps, Carpe Diem, the Forge itself, Inkwell or Ingenium, or any other page, and lets you",
         "It opens %s, or any other page you bring it, and lets you" % join([TOUR_EN[k] for k in CARRY], "or")),
        ("Elle ouvre l’une de vos apps, Carpe Diem, la Forge elle-même, Inkwell ou Ingenium, ou toute autre page, et vous laisse",
         "Elle ouvre %s, ou toute autre page que vous lui apportez, et vous laisse" % join([TOUR_FR[k] for k in CARRY], "ou")),
        ("The switch comes stocked: the Forge carries Carpe Diem, Inkwell and Ingenium inside its own page, with a copy of itself, and "
         "keeps them on this device on its first start, each checked against its fingerprint, so choosing one opens it at once.",
         "The switch comes stocked: the demonstration carries %s inside its page, and keeps them on this device on its first start, "
         "each checked against its fingerprint, so choosing one opens it at once." % and_en),
        ("Le sélecteur arrive garni : la Forge porte Carpe Diem, Inkwell et Ingenium dans sa propre page, avec une copie d’elle-même, "
         "et les garde sur cet appareil à son premier démarrage, chacune vérifiée par son empreinte ; en choisir une l’ouvre aussitôt.",
         "Le sélecteur arrive garni : la démonstration porte %s dans sa page, et les garde sur cet appareil à son premier démarrage, "
         "chacune vérifiée par son empreinte ; en choisir une l’ouvre aussitôt." % and_fr),
        ("The Forge carries your four apps inside it (Carpe Diem, the Forge, Inkwell and Ingenium) and keeps them on this device on "
         "its first start. Keep them now, and choosing an app above opens it at once.",
         "The demonstration carries %s inside it and keeps them on this device on its first start. Keep them now, and choosing an "
         "app above opens it at once." % and_en),
        ("La Forge porte en elle vos quatre apps (Carpe Diem, la Forge, Inkwell et Ingenium) et les garde sur cet appareil à son "
         "premier démarrage. Gardez-les maintenant : choisir une app ci-dessus l’ouvrira aussitôt.",
         "La démonstration porte en elle %s et les garde sur cet appareil à son premier démarrage. Gardez-les maintenant : choisir "
         "une app ci-dessus l’ouvrira aussitôt." % and_fr)):
    rep(a, b)

# 9 (656). NO SIGNATURE OF HERS: the owner's seeding script out, and her signatures out of the demonstration's own list
UNSIGN = r"""<script id="forge-demo-unsign">/* 656: the demonstration carries no hand-drawn signature of the owner's, nor her sample hands. Any
   that an earlier visit kept in the demonstration's own list of signatures is taken out, in the page and in its rooms, by
   its exact name: a signature the visitor makes (typed, uploaded or drawn) stays. */
(function(){var KEY="cd_signatures_v1",GONE=["sg-owner-hand","sg-hand-nancy-bousquet","sg-hand-jane-smith-a","sg-hand-jane-smith-b",
"sg-hand-nora-charles","sg-hand-franck-lewis","sg-hand-robert","sg-hand-lucy","sg-sample-1","sg-sample-2","sg-sample-3","sg-gen-cursive",
"sg-gen-copper","sg-gen-roundhand","sg-gen-looped","sg-gen-quick","sg-gen-upright","sg-gen-typed"];
function clean(w){try{if(!w||!w.localStorage)return;var v=w.localStorage.getItem(KEY);if(!v)return;var l=JSON.parse(v);if(!Array.isArray(l))return;
var k=l.filter(function(x){return !(x&&GONE.indexOf(String(x.id||""))>=0);});if(k.length===l.length)return;w.localStorage.setItem(KEY,JSON.stringify(k));
try{if(w.cdSign&&typeof w.cdSign.refresh==="function")w.cdSign.refresh();}catch(e){}}catch(e){}}
function tick(){clean(window);var fs=document.querySelectorAll("iframe");for(var i=0;i<fs.length;i++){try{clean(fs[i].contentWindow);}catch(e){}}}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",tick);else tick();setInterval(tick,1500);})();</script>"""
m = list(re.finditer(r'<script id="cd-owner-sign-js">.*?</script>', s, re.S))
if len(m) != 1 or "sg-owner-hand" not in m[0].group(0):
    raise SystemExit("the owner's signature script: found %d times, 1 expected" % len(m))
s = s[:m[0].start()] + UNSIGN + s[m[0].end():]
rep('<style id="cd-owner-sign">', '<style id="cd-sign-look">')  # its rules stay; its name marked the owner's personal copy
rep("nameIn.placeholder = 'e.g. Yannie D. Forest';", "nameIn.placeholder = 'e.g. Your name';")
if "sg-owner-hand\", name" in s or 'id: "sg-owner-hand"' in s:
    raise SystemExit("the owner's signature is still seeded somewhere in the page")

# the Guidebook's articles on editing Inkwell and Ingenium, when the demonstration does not carry them
for app in [x for x in ("inkwell", "ingenium") if x not in CARRY]:
    m = list(re.finditer(r'<article data-on="0" data-group="The Forge" data-app="%s">.*?</article>' % app, s, re.S))
    if len(m) != 1:
        raise SystemExit("the Guidebook's article on editing %s: found %d times, 1 expected" % (app, len(m)))
    s = s[:m[0].start()] + s[m[0].end():]


# 4b (653). ITS OWN STORAGE, AND THE APPS' HOUSE WITHOUT A SEAL
sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "..", "build"))
import storage_shim
SHIM = storage_shim.shim("demo").replace('"ing-demo:"', '"forge-demo:"').replace('id="ing-own-store"', 'id="forge-own-store"')
if SHIM.count('"forge-demo:"') != 1:
    raise SystemExit("the storage shim: its prefix was not found once")


def own_store(page, what):
    """the shim first in the page's <head>, before every script (several come before a page's character set line)"""
    i = page.find("<head>")
    if i < 0 or i > 4000:
        raise SystemExit(what + ": its <head> was not found near its start")
    return page[:i + 6] + SHIM + page[i + 6:]


s = own_store(s, "the Forge")
HOUSE = {"name": "The Forge", "word": "", "accent": "#17577A", "tag": "", "png": None}
for key in ("tabula", "abacus", "slides", "scriba", "fontes"):
    found = list(re.finditer(r'(<script type="text/plain" id="cd-src-%s"[^>]*>)(.*?)(</script>)' % key, s, re.S))
    if len(found) != 1:
        raise SystemExit("cd-src-%s: found %d times" % (key, len(found)))
    m = found[0]
    page = base64.b64decode(m.group(2).strip()).decode("utf-8")
    page = own_store(page, "cd-src-" + key)
    if key in ("tabula", "abacus", "slides"):
        page, n = re.subn(r'(<script id="ing-house">/\* ING-HOUSE-681 · the app these studios are carried in \*/window\.__ingHouse=)(.*?)(;</script>)',
                          lambda g: g.group(1) + json.dumps(HOUSE, separators=(",", ":")) + g.group(3), page, count=1, flags=re.S)
        if n != 1:
            raise SystemExit("cd-src-%s: its house was not found" % key)
    s = s[:m.start(2)] + base64.b64encode(page.encode("utf-8")).decode("ascii") + s[m.end(2):]
print("its own storage (forge-demo:) in the page, its five apps, and the pages it carries; the apps' house without a seal")


# 4. THE APPS IT CARRIES (one of Carpe Diem's demonstrations that opens without a code; Ingenium's demo edition and Inkwell
#    when they are given; its own page), each checked as it goes in
def carpediem(t):
    m = re.search(r'window\.CD_BUILD=\{date:"([^"]*)",pass:"(\d+)",stamp:"([^"]*)",edition:"(Public sample|Committee demo)"', t)
    if not m or 'id="section-forge"' in t or 'id="cd-owner-sign"' in t:
        raise SystemExit("Carpe Diem: not one of its demonstrations (the demonstration carries nothing personal)")
    global CD_EDITION
    CD_EDITION = m.group(4)
    return {"key": "cd", "title": "Carpe Diem", "version": m.group(2), "build": m.group(3), "date": m.group(1), "name": "carpe_diem.html"}


blocks, metas = [], []


def carry(meta, raw, block_id):
    if outside(raw):
        raise SystemExit(meta["title"] + ": carries a script from outside that does not belong")
    b = raw.encode("utf-8")
    z = gzip.compress(b, 9, mtime=0)
    metas.append(dict(meta, id=block_id, size=len(b), sha256=hashlib.sha256(b).hexdigest(), gz=len(z)))
    blocks.append('<script type="forge/b64" id="%s">%s</script>' % (block_id, base64.b64encode(z).decode("ascii")))


def ingenium(t):
    m = re.search(r'var ING_VERSION="([0-9.]+)",ING_PAGE_DATE="([^"]*)";', t)
    if not m or 'var ING_EDITION="demo"' not in t or re.search(r'id="(ing-tail:)?ing-builtin-', t) or "sg-owner-hand" in t:
        raise SystemExit("Ingenium: not its demo edition (a version, ING_EDITION demo, no apps carried, no signature of hers)")
    return {"key": "ingenium", "title": "Ingenium", "version": m.group(1), "build": "", "date": m.group(2), "name": "ingenium.html"}


def inkwell(t):
    m = re.search(r"<!-- BUILD='([\d.]+)'", t[:2000])
    if not m or "Inkwell" not in t[:4000]:
        raise SystemExit("Inkwell: not its page")
    return {"key": "inkwell", "title": "Inkwell", "version": m.group(1), "build": "", "date": DATE, "name": "Inkwell.html"}


own_page = s  # the demonstration's own page, carrying nothing: the copy of itself it offers in the Editor
if A.ingenium:
    ing_t = open(A.ingenium, encoding="utf-8").read()
    carry(ingenium(ing_t), own_store(ing_t, "Ingenium"), "forge-bi-ingenium")
cd_t = open(cd_p, encoding="utf-8").read()
cd_m = carpediem(cd_t)
carry(cd_m, own_store(cd_t, "Carpe Diem"), "forge-bi-cd")
if A.inkwell:
    ink_t = open(A.inkwell, encoding="utf-8").read()
    carry(inkwell(ink_t), own_store(ink_t, "Inkwell"), "forge-bi-inkwell")
carry({"key": "forge", "title": "The Forge", "version": PASS, "build": STAMP, "date": DATE, "name": "the_forge.html"}, own_page, "forge-bi-self")
metas[-1]["self"] = True
sig = hashlib.sha256((STAMP + "|" + "|".join(m["sha256"] for m in metas)).encode()).hexdigest()[:24]
meta_block = '<script type="application/json" id="forge-bi-meta">%s</script>' % json.dumps(
    {"format": "forge-builtin", "stamp": STAMP, "sig": sig, "apps": metas}, separators=(",", ":")).replace("</", "<\\/")
k = s.rfind("</body>")
s = s[:k] + "\n<!-- THE FORGE'S DEMONSTRATION · the apps it carries (" + and_en.replace("Carpe Diem", "Carpe Diem's " + CD_EDITION) + ") -->\n" + meta_block + "\n" + "\n".join(blocks) + "\n" + s[k:]
os.makedirs(out_dir, exist_ok=True)
open(os.path.join(out_dir, "the_forge_demo.html"), "w", encoding="utf-8").write(s)
print("demo", len(s.encode("utf-8")), hashlib.sha256(s.encode("utf-8")).hexdigest())
for m in metas:
    print("  carries", m["title"], m["version"], m["size"], "bytes,", m["gz"], "compressed")
