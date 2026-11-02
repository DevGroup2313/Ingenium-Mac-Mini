"""Builds fp/cd_studio_fr.html: the French layer for the Author Studio (and the mini Forge panel's own frame in Carpe Diem)."""
import json,re,importlib.util
S='/tmp/claude-0/-home-user/a024c340-a8a3-5ff0-9d28-ffbf4ac4c179/scratchpad/'
def load(name):
    spec=importlib.util.spec_from_file_location(name,S+'fr/dict/'+name+'.py'); m=importlib.util.module_from_spec(spec); spec.loader.exec_module(m); return m
keep=json.load(open(S+'fr/studio_work.json'))['keep']
D={}
for part in ['studio_a','studio_b','studio_c']:
    for i,fr in load(part).T.items():
        en=re.sub(r'\s+',' ',keep[i]).strip()
        D[en]=fr
for en,fr in load('studio_extra').E.items(): D[re.sub(r'\s+',' ',en).strip()]=fr
try:
    for en,fr in load('panel_extra').E.items(): D[re.sub(r'\s+',' ',en).strip()]=fr
except FileNotFoundError: pass
engine=open(S+'fr/fr_engine.js',encoding='utf-8').read()
js='''<script id="cd-studio-fr-1052">
'''+engine+'''
/* the Author Studio's own words in French; its rooms, its prompts and its messages */
(function () {
  'use strict';
  var D = '''+json.dumps(D,ensure_ascii=False,separators=(',',':'))+''';
  function n(m) { return +m; }
  var P = [
    [/^Card (\\d+) of (\\d+)$/, 'Carte $1 sur $2'],
    [/^Chapter (\\d+) of (\\d+)$/, 'Chapitre $1 sur $2'],
    [/^(\\d+) words?$/, function (m) { return CDFR.pl(m[1], 'mot', 'mots'); }],
    [/^(\\d+) items? · built-in$/, function (m) { return CDFR.pl(m[1], 'élément', 'éléments') + ' · d’origine'; }],
    [/^(\\d+) lessons? · Course ([IVXLC]+)$/, function (m) { return CDFR.pl(m[1], 'leçon', 'leçons') + ' · Cours ' + m[2]; }],
    [/^(\\d+) questions?$/, function (m) { return CDFR.pl(m[1], 'question', 'questions'); }],
    [/^(\\d+) changes? from the built-in state$/, function (m) { return CDFR.pl(m[1], 'changement', 'changements') + ' par rapport à l’état d’origine'; }],
    [/^(\\d+) changes?$/, function (m) { return CDFR.pl(m[1], 'changement', 'changements'); }],
    [/^(\\d+) changes logged$/, function (m) { return m[1] + ' changements notés'; }],
    [/^(\\d+) kept$/, function (m) { return m[1] + (n(m[1]) === 1 ? ' gardée' : ' gardées'); }],
    [/^(\\d+) changed$/, function (m) { return m[1] + (n(m[1]) === 1 ? ' modifiée' : ' modifiées'); }],
    [/^(\\d+) saved$/, function (m) { return m[1] + (n(m[1]) === 1 ? ' enregistré' : ' enregistrés'); }],
    [/^(\\d+) notes?$/, function (m) { return CDFR.pl(m[1], 'note', 'notes'); }],
    [/^(\\d+) backups?$/, function (m) { return CDFR.pl(m[1], 'sauvegarde', 'sauvegardes'); }],
    [/^(\\d+) rewritten · (\\d+) hidden$/, function (m) { return m[1] + (n(m[1]) === 1 ? ' réécrit' : ' réécrits') + ' · ' + m[2] + (n(m[2]) === 1 ? ' masqué' : ' masqués'); }],
    [/^(\\d+) chapters?$/, function (m) { return CDFR.pl(m[1], 'chapitre', 'chapitres'); }],
    [/^(\\d+) cards?$/, function (m) { return CDFR.pl(m[1], 'carte', 'cartes'); }],
    [/^(\\d+) parts?$/, function (m) { return CDFR.pl(m[1], 'partie', 'parties'); }],
    [/^(\\d+) of 3 on$/, '$1 sur 3 activés'],
    [/^(\\d+) things? to look at$/, function (m) { return n(m[1]) === 1 ? 'Une chose à regarder' : m[1] + ' choses à regarder'; }],
    [/^(\\d+) note taken in\\.$/, '$1 note reprise.'],
    [/^(\\d+) notes taken in\\.$/, '$1 notes reprises.'],
    [/^(\\d+) letters done\\.$/, '$1 lettres faites.'],
    [/^Term (\\d+) · (.+)$/, function (m, sub) { return 'Trimestre ' + m[1] + ' · ' + sub(m[2]); }],
    [/^t(\\d+) · (.+)$/, function (m, sub) { return 't' + m[1] + ' · ' + sub(m[2]); }],
    [/^↳ (.+)$/, function (m, sub) { return '↳ ' + sub(m[1]); }],
    [/^Kept a copy: (.+)$/, 'Copie gardée : $1'],
    [/^Magister is now (.+)$/, 'Magister s’appelle désormais $1'],
    [/^(.+) is now (.+)$/, null],
    [/^Undone · (.+)$/, function (m, sub) { return 'Annulé · ' + sub(m[1]); }],
    [/^Before restoring “(.+)”$/, 'Avant de restaurer « $1 »'],
    [/^today at (.+)$/, 'aujourd’hui à $1'],
    [/^Nothing found for “(.+)”\\. It may be worded differently, or it may live in a part of the app this copy does not carry\\.$/, 'Rien trouvé pour « $1 ». La formulation est peut-être différente, ou cela se trouve dans une partie de l’app que cette copie ne porte pas.'],
    [/^This copy was prepared for (.+)$/, 'Cette copie a été préparée pour $1'],
    [/^Prepared for (.+)$/, 'Préparée pour $1'],
    [/^Build (\d{4}-\d{2}-\d{2}) · (\d+) · (\d+) · (.+)$/, function (m, sub) { var ed = m[4]; try { if (typeof CD_BUILD !== 'undefined' && CD_BUILD.edition === ed && CD_BUILD.editionFr) ed = CD_BUILD.editionFr; } catch (e) {} return 'Édition ' + m[1] + ' · ' + m[2] + ' · ' + m[3] + ' · ' + ed; }]
  ].filter(function (p) { return p[1] != null; });
  window.__cdStudioFr = CDFR.make({ dict: D, patterns: P, dialogs: true,
    lang: function () { try { return state.lang; } catch (e) { return 'en'; } },
    roots: function () {
      var r = [], a = document.getElementById('cd-author'); if (a) r.push(a);
      var fp = document.getElementById('cd-forge-panel'); if (fp) r.push(fp);
      var mr = document.getElementById('modal-root'); if (mr) r.push(mr);   /* the Guidebook, and the app's own panels */
      [].forEach.call(document.querySelectorAll('body > [class*="au-"], body > [id^="cd-au-"]'), function (e) { if (!/^(SCRIPT|STYLE|LINK)$/.test(e.tagName)) r.push(e); });
      return r;
    },
    known: function (x) {
      try { CURRICULUM.terms.forEach(function (t) {
        if (typeof TERM_TITLES_FR !== 'undefined' && TERM_TITLES_FR[t.id]) x[t.title] = TERM_TITLES_FR[t.id];
        (t.modules || []).forEach(function (m) { if (typeof MODULE_TITLES_FR !== 'undefined' && MODULE_TITLES_FR[m.id]) x[m.title] = MODULE_TITLES_FR[m.id]; });
      }); } catch (e) {}
      try { (window.DEMO_TOUR || []).forEach(function (c) {
        if (!c || !c.en || !c.fr) return;
        ['t', 'b', 'tip'].forEach(function (k) { if (c.en[k] && c.fr[k] && c.en[k] !== c.fr[k]) x[String(c.en[k]).replace(/\\s+/g, ' ').trim()] = c.fr[k]; });
        if (c.chap && c.chapFr) x[c.chap] = c.chapFr; if (c.sub && c.subFr) x[c.sub] = c.subFr;
      }); } catch (e) {}
    } });
})();
/* the mini Forge is sealed in its own frame: it is told Carpe Diem's language in a message, and asks for it when it opens */
(function () {
  function L() { try { return state.lang === 'fr' ? 'fr' : 'en'; } catch (e) { return 'en'; } }
  function send() { var fs = document.querySelectorAll('#cd-forge-panel iframe'); for (var i = 0; i < fs.length; i++) { try { fs[i].contentWindow.postMessage({ cdLang: L() }, '*'); } catch (e) {} } }
  setInterval(send, 1000);
  window.addEventListener('message', function (e) { try { var d = e.data; if (d && typeof d === 'object' && d.cdLangAsk && e.source) e.source.postMessage({ cdLang: L() }, '*'); } catch (x) {} });
})();
</script>
'''
open(S+'fp/cd_studio_fr.html','w',encoding='utf-8').write(js)
print('studio dictionary', len(D), 'entries;', len(js), 'bytes')
