"""Pass 632 of the Forge: her apps carried inside its own page, as Ingenium carries them (no app library file), its own
copy of itself, and the shared thoughts panel and support module at their current versions, and Tabula keeps every part of a document
when it autosaves or moves to another window.

The owner's words (18 October 2026): "I want for the Forge to load its app the same way that Ingenium does so that I
don't have any dependencies on an external zip folder", and, asked how two apps that carry each other should do it,
"Lean copies": a carried copy of Ingenium comes without the apps Ingenium carries, and the Forge's copy of itself without
the apps the Forge carries, since a page cannot hold a full copy of an app that holds a full copy of it back.

usage:
  forge632.py FORGE631.html OUT_DIR
      writes OUT_DIR/the_forge_632_lean.html: the Forge 632 page that carries no apps (Ingenium carries this one)
  forge632.py FORGE631.html OUT_DIR INGENIUM_LEAN.html CARPE_DIEM.html INKWELL.html
      also writes OUT_DIR/the_forge.html: the full page, carrying Ingenium (lean), Carpe Diem and Inkwell, and its own
      lean page as its copy of itself
The thoughts panel and the support module are read from ../../build/thoughts/ (the shared files)."""
import base64, gzip, hashlib, json, os, re, sys

HERE = os.path.dirname(os.path.abspath(__file__))
CORE = os.path.normpath(os.path.join(HERE, "..", "..", "build", "thoughts"))
STAMP, PASS, DATE = "9s64", "632", "2026-10-18"
src, out_dir = sys.argv[1], sys.argv[2]
apps_in = sys.argv[3:6]
s = open(src, encoding="utf-8").read()


def rep(a, b, count=1):
    global s
    n = s.count(a)
    if n != count:
        raise SystemExit("expected %d, found %d: %r" % (count, n, a[:120]))
    s = s.replace(a, b)


# 1. THE BUILD STAMP
rep('window.CD_BUILD={date:"2026-10-17",pass:"631",stamp:"9s63"};',
    'window.CD_BUILD={date:"%s",pass:"%s",stamp:"%s"};' % (DATE, PASS, STAMP))

# 2. THE SHARED MODULES, at their current versions: the thoughts panel follows day and night while open, and the support
#    module's version 2 (single cards, the keyboard on a sheet's main key, routine dots in the app's own accent)
for old_name, new_name in (("thought_cloud.pre123.html", "thought_cloud.html"), ("support_core.v1.html", "support_core.html")):
    old = open(os.path.join(HERE, "previous", old_name), encoding="utf-8").read().rstrip("\n")
    new = open(os.path.join(CORE, new_name), encoding="utf-8").read().rstrip("\n")
    rep(old, new)

# 2b. TABULA KEEPS EVERY PART when it autosaves or moves to another window (the same fix as Ingenium 5.0 and Carpe
#     Diem 1053: source/build/apps/tabula_patch.py), in the Tabula the Forge carries
import importlib.util as _ilu
_tp = _ilu.spec_from_file_location("tabula_patch", os.path.normpath(os.path.join(HERE, "..", "..", "build", "apps", "tabula_patch.py")))
_tpm = _ilu.module_from_spec(_tp); _tp.loader.exec_module(_tpm)
_tm = re.search(r'(<script type="text/plain" id="cd-src-tabula">)([A-Za-z0-9+/=\s]+)(</script>)', s)
if not _tm:
    raise SystemExit("no Tabula in the Forge")
_tab = _tpm.patch(base64.b64decode(_tm.group(2).strip()).decode("utf-8"))
s = s[:_tm.start(2)] + base64.b64encode(_tab.encode("utf-8")).decode("ascii") + s[_tm.end(2):]

# 3. THE APP LIBRARY: filled from the copies the page carries, never from a zip
L0 = s.find('<script id="cd-applib-js">')
L1 = s.find("</script>", L0)
lib = s[L0:L1]


def lrep(a, b, count=1):
    global lib
    n = lib.count(a)
    if n != count:
        raise SystemExit("library: expected %d, found %d: %r" % (count, n, a[:120]))
    lib = lib.replace(a, b)


lrep("""   opened when the switch first comes into view. The page itself carries no copy of any app. */""",
     """   opened when the switch first comes into view.
   PASS 632 (18 October 2026, her word: "I want for the Forge to load its app the same way that Ingenium does so that I
   don't have any dependencies on an external zip folder"): the page now carries her apps, as Ingenium does: Ingenium,
   Carpe Diem and Inkwell, each compressed, and its own page as its copy of itself (forge-bi-meta names each with its
   size and fingerprint). On the first start of each new Forge, a few seconds in, they are kept in the store above,
   checked as the library file's apps were, and never over a newer copy she keeps. The copies are lean (her choice):
   Ingenium comes without the apps Ingenium carries, and the Forge's copy of itself without the apps it carries, since a
   page cannot hold a full copy of an app that holds a full copy of it back. No app library file is needed any more. */""")
# the copies it carries count as the library's did: never over a newer copy, and her own version of the same build stays
lrep("""  if(how!=='library' && ear && ear.sha256===m.sha256 && cur && cmpVer(m.version,cur.version)<=0) return {same:'earlier', cur:cur};""",
     """  if(how!=='library' && how!=='builtin' && ear && ear.sha256===m.sha256 && cur && cmpVer(m.version,cur.version)<=0) return {same:'earlier', cur:cur};""")
lrep("""    if(how==='library'){ if(c<0) return {older:true, cur:cur};
      if(c===0 && cur.source!=='library'){""",
     """    if(how==='library'||how==='builtin'){ if(c<0) return {older:true, cur:cur};
      if(c===0 && cur.source!=='library' && cur.source!=='builtin' && cur.source!=='self'){""")
lrep("""  var src = m.source==='library' ? T('from the app library, kept on '+d, 'de la bibliothèque d’apps, gardée le '+d)""",
     """  var src = m.source==='builtin' ? T('carried inside the Forge, kept on '+d, 'portée dans la Forge, gardée le '+d)
          : m.source==='self' ? T('the Forge’s own page, kept on '+d, 'la page même de la Forge, gardée le '+d)
          : m.source==='library' ? T('from the app library, kept on '+d, 'de la bibliothèque d’apps, gardée le '+d)""")
# the line under the switch when no copy is kept yet: keep the copies the Forge carries, or choose the app's own file
lrep("""    if(!cur){ if(CLOSED[a]){ cls='closed'; html='<span class="edlib-t">'+T('No copy of '+esc(the(a))+' is kept on this device yet.','Aucune copie '+esc(of(a))+' n’est encore gardée sur cet appareil.')+'</span> '+btn('import',T('📚 Open the app library file','📚 Ouvrir le fichier de la bibliothèque')); }""",
     """    if(!cur){ var carries=biHas(a);
      if(CLOSED[a]){ cls='closed'; html='<span class="edlib-t">'+T('No copy of '+esc(the(a))+' is kept on this device yet.','Aucune copie '+esc(of(a))+' n’est encore gardée sur cet appareil.')+'</span> '+(carries?btn('seed',T('📥 Keep the copy the Forge carries','📥 Garder la copie que porte la Forge')):btn('choose',T('📂 Choose '+esc(of(a))+' own file','📂 Choisir le fichier '+esc(of(a))))); }""")
lrep("""        +'<p>'+T('Open the app library file once, and the Forge keeps your four apps here: Carpe Diem, the Forge, Inkwell and Ingenium. After that, choosing an app above opens it at once.','Ouvrez une fois le fichier de la bibliothèque d’apps : la Forge garde alors ici vos quatre apps, Carpe Diem, la Forge, Inkwell et Ingenium. Ensuite, choisir une app ci-dessus l’ouvre aussitôt.')+'</p>'
        +'<div class="edlib-b">'+btn('import',T('📚 Open the app library file','📚 Ouvrir le fichier de la bibliothèque'),true)+btn('choose',T('📂 Or choose '+esc(of(a))+' own file','📂 Ou choisir le fichier '+esc(of(a))))+'</div>'
        +'<p class="edlib-s">'+T('The file is called <code>'+LIB_FILE+'</code>. Look in Downloads on the Fire tablet, in Files on the iPhone and iPad, and in the Downloads folder on the Mac and on Windows.','Le fichier s’appelle <code>'+LIB_FILE+'</code>. Cherchez dans Téléchargements sur la tablette Fire, dans Fichiers sur l’iPhone et l’iPad, et dans le dossier Téléchargements sur le Mac et sur Windows.')+'</p>'; } }""",
     """        +(carries ? '<p>'+T('The Forge carries your four apps inside it (Carpe Diem, the Forge, Inkwell and Ingenium) and keeps them on this device on its first start. Keep them now, and choosing an app above opens it at once.','La Forge porte en elle vos quatre apps (Carpe Diem, la Forge, Inkwell et Ingenium) et les garde sur cet appareil à son premier démarrage. Gardez-les maintenant : choisir une app ci-dessus l’ouvrira aussitôt.')+'</p>'
            +'<div class="edlib-b">'+btn('seed',T('📥 Keep the apps the Forge carries','📥 Garder les apps que porte la Forge'),true)+btn('choose',T('📂 Or choose '+esc(of(a))+' own file','📂 Ou choisir le fichier '+esc(of(a))))+'</div>'
          : '<p>'+T('This copy of the Forge carries no apps (it is the lean copy that Ingenium carries). Choose '+esc(of(a))+' own file, and the Forge keeps it here.','Cette copie de la Forge ne porte aucune app (c’est la copie légère que porte Ingenium). Choisissez le fichier '+esc(of(a))+' : la Forge le garde ici.')+'</p>'
            +'<div class="edlib-b">'+btn('choose',T('📂 Choose '+esc(of(a))+' own file','📂 Choisir le fichier '+esc(of(a))),true)+'</div>'); } }""")
lrep("""    if(k==='import') el('edLibFile').click();""",
     """    if(k==='import') el('edLibFile').click();
    else if(k==='seed') seed(true);""")
lrep("""if(e&&e.code==='gone') note(T('That copy is no longer on this device. Open the app library file again to bring it back.','Cette copie n’est plus sur cet appareil. Ouvrez de nouveau le fichier de la bibliothèque pour la retrouver.'),true);""",
     """if(e&&e.code==='gone') note(T('That copy is no longer on this device. Keep the apps the Forge carries again to bring it back.','Cette copie n’est plus sur cet appareil. Gardez de nouveau les apps que porte la Forge pour la retrouver.'),true);""")
lrep("""  if(LIB_APPS.indexOf(a)>=0 && META && !META[a+':newest']) want=T(cap(the(a))+' has no copy on this device yet: open the app library file once, in the Editor on the left.', 'Aucune copie '+of(a)+' sur cet appareil : ouvrez une fois le fichier de la bibliothèque d’apps, dans l’Éditeur à gauche.');""",
     """  if(LIB_APPS.indexOf(a)>=0 && META && !META[a+':newest']) want=(SEEDP ? T('The Forge is keeping the apps it carries on this device…','La Forge garde sur cet appareil les apps qu’elle porte…') : T(cap(the(a))+' has no copy on this device yet: keep the apps the Forge carries, in the Editor on the left.', 'Aucune copie '+of(a)+' sur cet appareil : gardez les apps que porte la Forge, dans l’Éditeur à gauche.'));""")
# the copies it carries: read from the page, unpacked by the browser, checked, and kept
lrep("""/* ---------- importing the library file once ---------- */""",
     r"""/* ---------- PASS 632: the apps the Forge carries, kept on this device ---------- */
var BIMETA, SEEDP=null, SEEDK='forge_bi_kept';
function biMeta(){ if(BIMETA!==undefined) return BIMETA; BIMETA=null; try{ var n=el('forge-bi-meta'); if(n){ var m=JSON.parse(n.textContent); if(m && m.format==='forge-builtin' && Array.isArray(m.apps)) BIMETA=m; } }catch(e){} return BIMETA; }
function biList(){ var m=biMeta(); return m ? m.apps.filter(function(x){ return x && LIB_APPS.indexOf(x.key)>=0 && el(x.id); }) : []; }
function biHas(a){ return biList().some(function(x){ return x.key===a; }); }
function biBytes(x){ var n=el(x.id); if(!n) return Promise.reject(err('gone',x.key));
  if(!canGunzip()) return Promise.reject(err('nostream',x.key));
  var bin=atob(n.textContent.replace(/\s+/g,'')), u8=new Uint8Array(bin.length); for(var i=0;i<bin.length;i++) u8[i]=bin.charCodeAt(i); bin=null;
  return new Response(new Blob([u8]).stream().pipeThrough(new DecompressionStream('gzip'))).arrayBuffer().then(function(b){ return new Uint8Array(b); }, function(e){ throw err('broken',x.key,e); }); }
function canGunzip(){ try{ if(typeof DecompressionStream!=='function' || typeof Response!=='function' || !Blob.prototype.stream) return false; new DecompressionStream('gzip'); return true; }catch(e){ return false; } }
/* kept already for this build? (a copy cleared by the device since is kept again) */
function seedNeeded(){ var m=biMeta(), list=biList(); if(!m || !list.length) return Promise.resolve(false);
  var mark=null; try{ mark=localStorage.getItem(SEEDK); }catch(e){}
  return metaAll().then(function(M){ return mark!==m.sig || list.some(function(x){ return !M[x.key+':newest']; }); }, function(){ return false; }); }
function seed(manual){ if(SEEDP) return SEEDP; var m0=biMeta(), list=biList(); if(!m0 || !list.length) return Promise.resolve(null);
  var kept=[], same=[], hers=[], older=[], failed=null, total=list.length, t0=Date.now(), seen=function(){ var p=el('edLib'); return manual || (p && !p.hidden); };
  SEEDP=metaAll().then(function(){ return persistOnce(); }).then(function(){ var i=0;
    function next(){ if(i>=list.length) return null; var x=list[i++];
      if(seen()){ BUSY={html:T('Keeping the apps the Forge carries… '+esc(the(x.key))+' ('+i+' of '+total+')','La Forge garde les apps qu’elle porte… '+esc(of(x.key))+' ('+i+' sur '+total+')'), max:total, val:i-1}; paint(); }
      return biBytes(x).then(function(b){ if(b.length!==x.size) throw err('broken',x.key);
        return sha256(b).then(function(h){ if(h!==String(x.sha256||'').toLowerCase()) throw err('broken',x.key);
          var txt=new TextDecoder().decode(b), d='any'; try{ d=B().detect(txt); }catch(e){} txt=null; if(d!==x.key) throw err('broken',x.key);
          return decide(x.key, b, {app:x.key, title:x.title, version:String(x.version||''), build:String(x.build||''), date:x.date||'', name:x.name, size:x.size, sha256:h, source:x.self?'self':'builtin'}, 'builtin'); }); })
      .then(function(r){ var lab=esc(nm(x.key)+' '+x.version); if(r.kept) kept.push(lab); else if(r.same) same.push(lab); else if(r.hers) hers.push({lab:lab, behind:!!r.behind, a:x.key}); else if(r.older) older.push({lab:lab, cur:r.cur}); },
            function(e){ if(!failed) failed=e; })
      .then(next); }
    return next(); })
  .catch(function(e){ failed=failed||e; })
  .then(function(){ BUSY=null; SEEDP=null; var lines=[], warn=false;
    window.__forgeBiLast={ms:Date.now()-t0, kept:kept.length, same:same.length, hers:hers.length, older:older.length, failed:failed?(failed.code||String(failed)):''};
    if(!failed){ try{ localStorage.setItem(SEEDK, m0.sig); }catch(e){} }
    if(kept.length) lines.push(T('Kept on this device: ','Gardées sur cet appareil : ')+kept.join(', ')+'.');
    if(same.length && manual) lines.push(T('Already kept, unchanged: ','Déjà gardées, inchangées : ')+same.join(', ')+'.');
    hers.forEach(function(h){ lines.push(T('Your own version of '+esc(the(h.a))+' stays the newest copy'+(h.behind?'; the one the Forge carries, '+h.lab+', is kept one step back.':'.'),'Votre propre version '+esc(of(h.a))+' reste la copie la plus récente'+(h.behind?' ; celle que porte la Forge, '+h.lab+', est gardée un pas en arrière.':'.'))); });
    older.forEach(function(o){ lines.push(T(o.lab+', which the Forge carries, is older than the copy kept here ('+esc(o.cur.version)+'), so the kept copy stays.', o.lab+', que porte la Forge, est plus ancienne que la copie gardée ici ('+esc(o.cur.version)+') : la copie gardée reste.')); });
    if(failed){ warn=true; var c=failed.code||'', who=failed.app?nm(failed.app):'';
      if(c==='nostream') lines.push(T('This device’s browser cannot unpack the apps the Forge carries. Choose each app’s own file in step 1 below instead; the Forge keeps it just the same.','Le navigateur de cet appareil ne sait pas déballer les apps que porte la Forge. Choisissez plutôt le fichier de chaque app à l’étape 1 ci-dessous ; la Forge le garde de la même façon.'));
      else if(c==='broken') lines.push(T(esc(who)+' did not unpack whole (its fingerprint does not match), so it was not kept.', esc(who)+' n’a pas été déballée entière (son empreinte ne correspond pas) : elle n’a pas été gardée.'));
      else if(c==='noidb') lines.push(T('This device does not let the Forge keep copies here (its storage is switched off or refused). You can still choose each app’s own file in step 1 below.','Cet appareil ne laisse pas la Forge garder des copies ici (son stockage est éteint ou refusé). Vous pouvez toujours choisir le fichier de chaque app à l’étape 1 ci-dessous.'));
      else if(isFull(failed)) lines.push(T('This device has no room left to keep '+(esc(who)||'the apps')+'. What was kept before is still here. Free some space, then keep them again.','Cet appareil n’a plus de place pour garder '+(esc(who)||'les apps')+'. Ce qui était gardé est toujours là. Libérez un peu de place, puis gardez-les de nouveau.'));
      else lines.push(T('The apps the Forge carries could not all be kept here. What was kept before is still here.','Les apps que porte la Forge n’ont pas toutes pu être gardées ici. Ce qui était gardé est toujours là.')); }
    else if(manual || kept.length){ lines.unshift(T('Done.','C’est fait.')); }
    if(lines.length && (manual || failed || seen())) note(lines.join(' '), warn); else paintSoon();
    if(!failed && kept.length){ try{ B().teach('libKept',{n:kept.length+same.length+hers.length}); }catch(e){} }
    /* the app she stands on opens at once, unless one of its files is already open */
    var a0=curApp(), o=openState(a0); if(manual && META && META[a0+':newest'] && !(o && o.app===a0)){ var keepNote=NOTE; openCopy(a0,'newest').then(function(){ if(!NOTE){ NOTE=keepNote; paint(); } }); }
    return window.__forgeBiLast; });
  return SEEDP; }
function seedSoon(){ seedNeeded().then(function(n){ if(n) seed(false); }); }

/* ---------- importing the library file once ---------- */""")
lrep("""  window.__forgeLib={ meta:function(){ META=null; return metaAll(); }, open:openCopy, importFile:importLibrary, keep:keepText, paint:paint, file:LIB_FILE,""".lstrip(),
     """window.__forgeLib={ meta:function(){ META=null; return metaAll(); }, open:openCopy, importFile:importLibrary, keep:keepText, paint:paint, file:LIB_FILE,
  carried:function(){ return biList().map(function(x){ return {key:x.key, version:x.version, size:x.size, sha256:x.sha256, self:!!x.self}; }); }, seed:seed, seedNeeded:seedNeeded,""")
# the switch waits for copies being kept; the store is first opened when the switch shows, and a new build keeps its
# copies a few seconds after it starts
lrep("""    metaAll().then(function(M){ var o=openState(a); if(M[a+':newest'] && !(o && o.app===a)) openCopy(a,'newest'); else paint(); }).catch(function(){ paint(); }); }); });""",
     """    (SEEDP||Promise.resolve()).then(function(){ return metaAll(); }).then(function(M){ var o=openState(a); if(M[a+':newest'] && !(o && o.app===a)) openCopy(a,'newest'); else paint(); }).catch(function(){ paint(); }); }); });""")
lrep("""  var row=el('edAppRow'), first=function(){ metaAll().then(paint, paint); };""",
     """  var row=el('edAppRow'), first=function(){ metaAll().then(paint, paint); seedSoon(); };
  setTimeout(function(){ try{ (window.requestIdleCallback||function(f){ f(); })(seedSoon); }catch(e){ seedSoon(); } }, 6000);""")
s = s[:L0] + lib + s[L1:]

# 4. THE WORDS ELSEWHERE: the Guidebook, the room help, the walk-through, the glossary, Troubleshoot
rep('''Choose the app at the top (Editing): Carpe Diem, The Forge, Inkwell or Ingenium. If no copy is kept on this device yet, press "📚 Open the app library file" once.''',
    '''Choose the app at the top (Editing): Carpe Diem, The Forge, Inkwell or Ingenium. The Forge carries all four inside it and keeps them on this device on its first start, so choosing one opens it at once.''')
rep('''Choisissez l’app en haut (Édition) : Carpe Diem, La Forge, Inkwell ou Ingenium. Si aucune copie n’est encore gardée sur cet appareil, appuyez une fois sur « 📚 Ouvrir le fichier de la bibliothèque ».''',
    '''Choisissez l’app en haut (Édition) : Carpe Diem, La Forge, Inkwell ou Ingenium. La Forge les porte toutes les quatre en elle et les garde sur cet appareil à son premier démarrage : en choisir une l’ouvre aussitôt.''', 2)
rep(r'''Choose the app at the top (Editing): Carpe Diem, The Forge, Inkwell or Ingenium. If no copy is kept on this device yet, press \"📚 Open the app library file\" once.''',
    '''Choose the app at the top (Editing): Carpe Diem, The Forge, Inkwell or Ingenium. The Forge carries all four inside it and keeps them on this device on its first start, so choosing one opens it at once.''')
rep('''<h4>Your four apps</h4><p>On each device, open the Forge, then the Editor, and press "📚 Open the app library file" once. The Forge keeps Carpe Diem, the Forge, Inkwell and Ingenium from then on.</p>''',
    '''<h4>Your four apps</h4><p>The Forge carries Carpe Diem, Inkwell and Ingenium inside it, with a copy of itself. On its first start on each device it keeps them in the Editor, each checked against its fingerprint. No other file is needed.</p>''')
rep('''<h4>Vos quatre apps</h4><p>Sur chaque appareil, ouvrez la Forge, puis l’Éditeur, et appuyez une fois sur « 📚 Ouvrir le fichier de la bibliothèque ». La Forge garde ensuite Carpe Diem, la Forge, Inkwell et Ingenium.</p>''',
    '''<h4>Vos quatre apps</h4><p>La Forge porte en elle Carpe Diem, Inkwell et Ingenium, avec une copie d’elle-même. À son premier démarrage sur chaque appareil, elle les garde dans l’Éditeur, chacune vérifiée par son empreinte. Aucun autre fichier n’est nécessaire.</p>''')
rep('''Several files packed into one, to send or keep together. Your app library file is a zip holding your four apps.''',
    '''Several files packed into one, to send or keep together. A backup of the Forge is a zip.''')
rep('''Plusieurs fichiers réunis en un seul, pour les envoyer ou les garder ensemble. Votre fichier de bibliothèque est un zip qui contient vos quatre apps.''',
    '''Plusieurs fichiers réunis en un seul, pour les envoyer ou les garder ensemble. Une sauvegarde de la Forge est un zip.''')
rep(r'''"en": "Step 1. In the Editor, choose <b>Carpe Diem</b> in the Editing switch. If no copy is kept yet, press \"📚 Open the app library file\" and choose the_forge_app_library file.", "fr": "Étape 1. Dans l’Éditeur, choisissez <b>Carpe Diem</b> dans le sélecteur Édition. Si aucune copie n’est gardée, appuyez sur « 📚 Ouvrir le fichier de la bibliothèque » et choisissez le fichier the_forge_app_library."''',
    '''"en": "Step 1. In the Editor, choose <b>Carpe Diem</b> in the Editing switch. The Forge carries it inside, so it opens at once.", "fr": "Étape 1. Dans l’Éditeur, choisissez <b>Carpe Diem</b> dans le sélecteur Édition. La Forge la porte en elle : elle s’ouvre aussitôt."''')
rep("""T('not asked by this browser; the store may be cleared under pressure, the library file brings the apps back','non demandé par ce navigateur ; le stockage peut être effacé sous pression, le fichier de bibliothèque ramène les apps')""",
    """T('not asked by this browser; the store may be cleared under pressure, and the Forge then keeps the apps it carries again','non demandé par ce navigateur ; le stockage peut être effacé sous pression, et la Forge garde alors de nouveau les apps qu’elle porte')""")
rep("""T('not yet (the Forge asks when the library file is opened)','pas encore (la Forge le demande à l’ouverture de la bibliothèque)')""",
    """T('not yet (the Forge asks when it keeps the apps it carries)','pas encore (la Forge le demande quand elle garde les apps qu’elle porte)')""")
rep("""T('Unpacking a zip (DecompressionStream)','Déballer un zip (DecompressionStream)'), function(){ if(typeof DecompressionStream!=='function') throw new Error(T('missing: the app library file cannot be unpacked here; choose each app’s own file instead','manquant : le fichier de bibliothèque ne peut pas être déballé ici ; choisissez le fichier de chaque app')); new DecompressionStream('deflate-raw');""",
    """T('Unpacking (DecompressionStream)','Déballer (DecompressionStream)'), function(){ if(typeof DecompressionStream!=='function') throw new Error(T('missing: the apps the Forge carries cannot be unpacked here; choose each app’s own file instead','manquant : les apps que porte la Forge ne peuvent pas être déballées ici ; choisissez le fichier de chaque app')); new DecompressionStream('deflate-raw'); new DecompressionStream('gzip');""")

if "the_forge_app_library" in s.replace("LIB_FILE='the_forge_app_library_9s58.zip'", ""):
    raise SystemExit("a mention of the app library file is left")
lean = s
os.makedirs(out_dir, exist_ok=True)
open(os.path.join(out_dir, "the_forge_632_lean.html"), "w", encoding="utf-8").write(lean)
print("lean", len(lean), hashlib.sha256(lean.encode("utf-8")).hexdigest())
if not apps_in:
    sys.exit(0)

# 5. THE APPS IT CARRIES (the full page only), each checked here as it goes in
def ingenium(t):
    m = re.search(r'var ING_VERSION="([0-9.]+)",ING_PAGE_DATE="([^"]*)";', t)
    if not m or "var BI={};" not in t or 'id="ing-builtin-' in t:
        raise SystemExit("Ingenium: not its lean page (a version, and no apps of its own carried)")
    return {"key": "ingenium", "title": "Ingenium", "version": m.group(1), "build": "", "date": m.group(2), "name": "ingenium.html"}


def carpediem(t):
    m = re.search(r'window\.CD_BUILD=\{date:"([^"]*)",pass:"(\d+)",stamp:"([^"]*)"', t)
    if not m or 'id="section-forge"' in t or not re.search(r"<title>[^<]*Carpe Diem", t[:400000]):
        raise SystemExit("Carpe Diem: not its page")
    return {"key": "cd", "title": "Carpe Diem", "version": m.group(2), "build": m.group(3), "date": m.group(1), "name": "carpe_diem.html"}


def inkwell(t):
    m = re.search(r"<!-- BUILD='([\d.]+)'", t[:2000])
    if not m or "Inkwell" not in t[:4000]:
        raise SystemExit("Inkwell: not its page")
    return {"key": "inkwell", "title": "Inkwell", "version": m.group(1), "build": "", "date": DATE, "name": "Inkwell.html"}


blocks, metas = [], []


def carry(meta, raw, block_id, self_copy=False):
    if re.search(r"<script[^>]+src=[\"']https?://[^\"']*claude\.ai", raw[:20000]):
        raise SystemExit(meta["title"] + ": carries a script from outside that does not belong")
    b = raw.encode("utf-8")
    z = bytearray(gzip.compress(b, 9, mtime=0))
    meta = dict(meta, id=block_id, size=len(b), sha256=hashlib.sha256(b).hexdigest(), gz=len(z))
    if self_copy:
        meta["self"] = True
    metas.append(meta)
    blocks.append('<script type="forge/b64" id="%s">%s</script>' % (block_id, base64.b64encode(bytes(z)).decode("ascii")))


ing_t, cd_t, ink_t = (open(p, encoding="utf-8").read() for p in apps_in)
carry(ingenium(ing_t), ing_t, "forge-bi-ingenium")
carry(carpediem(cd_t), cd_t, "forge-bi-cd")
carry(inkwell(ink_t), ink_t, "forge-bi-inkwell")
carry({"key": "forge", "title": "The Forge", "version": PASS, "build": STAMP, "date": DATE, "name": "the_forge.html"}, lean, "forge-bi-self", True)
sig = hashlib.sha256((STAMP + "|" + "|".join(m["sha256"] for m in metas)).encode()).hexdigest()[:24]
meta_block = '<script type="application/json" id="forge-bi-meta">%s</script>' % json.dumps(
    {"format": "forge-builtin", "stamp": STAMP, "sig": sig, "apps": metas}, separators=(",", ":")).replace("</", "<\\/")
k = lean.rfind("</body>")
full = lean[:k] + "\n<!-- PASS 632 · the apps the Forge carries (lean copies), and its own page -->\n" + meta_block + "\n" + "\n".join(blocks) + "\n" + lean[k:]
open(os.path.join(out_dir, "the_forge.html"), "w", encoding="utf-8").write(full)
print("full", len(full), hashlib.sha256(full.encode("utf-8")).hexdigest())
for m in metas:
    print("  carries", m["title"], m["version"], m["size"], "bytes,", m["gz"], "compressed")
