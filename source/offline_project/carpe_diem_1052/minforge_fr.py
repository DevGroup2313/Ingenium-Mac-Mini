"""Hook used by cd1052.py: puts the French layer into the copy of the Forge that Carpe Diem carries (the mini Forge).
It speaks French only while Carpe Diem around it is in French, so the Forge on its own stays English."""
import json,re,importlib.util
S='/tmp/claude-0/-home-user/a024c340-a8a3-5ff0-9d28-ffbf4ac4c179/scratchpad/'
def _load(name):
    spec=importlib.util.spec_from_file_location(name,S+'fr/dict/'+name+'.py'); m=importlib.util.module_from_spec(spec); spec.loader.exec_module(m); return m
def _dict():
    W=json.load(open(S+'fr/mf_work.json',encoding='utf-8'))
    D={}
    for part,key in [('mf_a','ui'),('mf_b','ui'),('mf_c','ui'),('mfg_a','guide'),('mfg_b','guide')]:
        for i,fr in _load(part).T.items(): D[re.sub(r'\s+',' ',W[key][i]).strip()]=fr
    LAST=json.load(open(S+'fr/mf_last.json',encoding='utf-8'))
    for i,fr in _load('mf_last').T.items(): D[re.sub(r'\s+',' ',LAST[i]).strip()]=fr
    D["Apply to this app"]="Appliquer à cette app"
    D.update({"three terms, twelve modules, 24 lessons":"trois trimestres, douze modules, 24 leçons","each lesson can be tried on the right":"chaque leçon peut être essayée à droite","read, predict, then check":"lire, prédire, puis vérifier",
      "Settings":"Réglages","Guidebook":"Guide","Workshop":"Atelier","Files":"Fichiers","Library":"Bibliothèque","Projects":"Projets","Editor":"Éditeur","Bakery":"Boulangerie","Curriculum":"Cursus","Assessments":"Évaluations","Apps":"Apps","Fold the rail, or open it":"Replier la barre, ou l’ouvrir","Fold the rail":"Replier la barre",
      "Focus":"Concentration","Today in the Forge":"Aujourd’hui dans la Forge"})
    return D
def patch(raw):
    D=_dict()
    engine=open(S+'fr/fr_engine.js',encoding='utf-8').read()
    js='''<script id="cd-mini-forge-fr-1052">
/* CARPE DIEM PASS 1052 · THE MINI FORGE IN FRENCH. This copy of the Forge rides inside Carpe Diem, which is bilingual,
   so while Carpe Diem is in French the Forge's rooms, controls and Guidebook are shown in French too. On its own, the
   Forge stays English, as its owner asked. The code lessons keep their English for now. */
'''+engine+'''
(function () {
  'use strict';
  /* this frame is sealed from Carpe Diem around it, so Carpe Diem tells it the language in a message, and only a
     message from that parent is listened to; on its own, with no parent, the Forge stays English */
  var CUR = 'en';
  window.addEventListener('message', function (e) { try { if (e.source !== window.parent || window.parent === window) return; var d = e.data; if (d && typeof d === 'object' && (d.cdLang === 'fr' || d.cdLang === 'en')) { if (CUR !== d.cdLang) { CUR = d.cdLang; if (window.__cdMiniForgeFr) window.__cdMiniForgeFr.tick(); } } } catch (x) {} });
  try { if (window.parent !== window) window.parent.postMessage({ cdLangAsk: 1 }, '*'); } catch (e) {}
  function lang() { return CUR; }
  var D = '''+json.dumps(D,ensure_ascii=False,separators=(',',':'))+''';
  var P = [
    [/^(\\d+) controls?$/, function (m) { return CDFR.pl(m[1], 'commande', 'commandes'); }],
    [/^(\\d+) of (\\d+) read$/, '$1 sur $2 lues'],
    [/^(\\d+) read$/, function (m) { return m[1] + (+m[1] === 1 ? ' lue' : ' lues'); }],
    [/^(\\d+) of (\\d+) lessons read$/, '$1 sur $2 leçons lues'],
    [/^(\\d+) of (\\d+) modules with their questions answered$/, '$1 sur $2 modules avec leurs questions répondues'],
    [/^Year (\\d+)$/, 'Année $1'],
    [/^Term (\\d+)$/, 'Trimestre $1'],
    [/^brief (\\d+)$/, 'consigne $1'],
    [/^Build (\\d{4}-\\d{2}-\\d{2}) · (\\d+) · (\\w+)$/, 'Édition $1 · $2 · $3'],
    [/^(January|February|March|April|May|June|July|August|September|October|November|December) (\\d{4})$/, function (m) { var M = { January: 'Janvier', February: 'Février', March: 'Mars', April: 'Avril', May: 'Mai', June: 'Juin', July: 'Juillet', August: 'Août', September: 'Septembre', October: 'Octobre', November: 'Novembre', December: 'Décembre' }; return M[m[1]] + ' ' + m[2]; }]
  ];
  window.__cdMiniForgeFr = CDFR.make({ dict: D, patterns: P, lang: lang, dialogs: true,
    roots: function () { return document.body ? [document.body] : []; } });
})();
</script>
'''
    k=raw.rfind('</body>')
    if k<0: raise SystemExit('mini forge has no body end')
    print('mini forge French:', len(D), 'entries')
    return raw[:k]+js+raw[k:]
