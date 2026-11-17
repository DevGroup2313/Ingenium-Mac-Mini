"""Stage 2 of Fabrica's runs on her other computers, in modules/r274.js (sharing with her devices):
  - a computer that runs Fabrica's jobs but lends no models pairs too (its hello says runs: 1), and is kept with runs: 1;
  - IngLend.request(id, method, path, body, seconds): a request to a paired computer, with its code and this device's name,
    at each address it gave until one answers (a refusal with a status is final: a wrong code is not tried elsewhere);
  - IngLend.state().computers say runs;
  - the lending computer's card has a second switch, Run Fabrica's jobs for my devices (share_runs_set), shown even while it lends
    nothing, as stage 1's own message says ("Settings, Your devices, Run Fabrica's jobs for my devices").
    python3 -I patch_r274.py <modules folder>"""
import sys, os
p = os.path.join(sys.argv[1], "r274.js")
s = open(p, encoding="utf-8").read()


def rep(a, b, n=1):
    global s
    c = s.count(a)
    if c != n:
        sys.exit("r274: expected %d, found %d: %r" % (n, c, a[:100]))
    s = s.replace(a, b)


if "IngLend.request" in s or "function request(id," in s:
    sys.exit("r274 already patched")
# pairing: a computer that runs jobs and lends no models
rep('.then(function(p){p0=p;if(h0.lends===false)throw new Error((h0.computer||"That computer")+" is not lending its models now. Switch on Lend my models to my devices there.");return models(b,c);})',
    '.then(function(p){p0=p;if(h0.lends===false){if(h0.runs)return [];throw new Error((h0.computer||"That computer")+" is not lending its models now. Switch on Lend my models to my devices there, or Run Fabrica\'s jobs for my devices.");}return models(b,c);})')
rep('.then(function(list){if(!list.length)throw new Error("Paired, but that computer has no models yet. Install one on it first.");',
    '.then(function(list){if(!list.length&&!h0.runs)throw new Error("Paired, but that computer has no models yet. Install one on it first.");')
rep('comp.code=c;comp.base=b;', 'comp.code=c;comp.base=b;comp.runs=h0.runs?1:0;   /* 7.30: it runs Fabrica\'s jobs for her devices */\n      ')
# found again: what it says of runs is kept
rep('comp.pair=r.h.pair?1:0;\n', 'comp.pair=r.h.pair?1:0;comp.runs=r.h.runs?1:0;\n')
# the state says runs
rep('models:(x.models||[]).slice(),model:x.model,status:(ST[x.id]||{}).s||""};}),',
    'models:(x.models||[]).slice(),model:x.model,runs:x.runs?1:0,status:(ST[x.id]||{}).s||""};}),')
# a request to a paired computer
REQ = r'''
/* ---------- 7.30: a request to a paired computer, for Fabrica's runs there (modules/r298.js): its code and this device's name, at each
   address it gave until one answers; a refusal with a status is the computer's own answer and is not tried elsewhere ---------- */
function request(id,method,path,body,t){var comp=byId(id);if(!comp)return Promise.reject(new Error("That computer is not paired with this device."));
  var list=merge([comp.base],comp.addrs),i=0,last=null;
  function one(b){var h={"Authorization":"Bearer "+codeOf(comp.code),"X-Ingenium-Device":devHeader()},o={method:method||"GET",headers:h,timeout:t||20};
    if(body!=null){h["Content-Type"]="application/json";o.body=JSON.stringify(body);}
    return W.netFetch(b+path,o).then(function(r){if(!r.ok)return errOf(r);if(b!==comp.base){comp.base=b;save();}return r.json();});}
  function next(){if(i>=list.length)return Promise.reject(last||new Error((comp.name||"That computer")+" could not be reached."));var b=list[i++];
    return one(b).catch(function(e){if(e&&e.status){if(e.status===401){comp.removed=e.removed?1:0;setSt(comp.id,"code");}throw e;}last=e;return next();});}
  return next();}
'''
rep('\n/* ---------- found again by itself: at every address it gave, then by looking on the Wi-Fi ---------- */',
    REQ + '\n/* ---------- found again by itself: at every address it gave, then by looking on the Wi-Fi ---------- */')
rep('W.IngLend={state:function(){', 'W.IngLend={request:request,state:function(){')
# the second switch on the lending computer's card, shown whether or not it lends models
rep('''  if(!st||!st.on){if(st&&st.error){var w=mk("div","ld-warn",st.error);col.appendChild(w);}return;}''',
    '''  /* 7.30: the computer runs Fabrica's jobs for her devices (build/desktop/app_runs_728.py), off until she turns it on */
  if(typeof a.share_runs_set==="function")col.appendChild(sw("ldRuns","Run Fabrica's jobs for my devices",st&&st.runs_on?"On. Your other devices can send their Fabrica runs here; each sees only its own runs, and every log is kept here too.":"Off. Switch it on, and your other devices can run their Fabrica workflows on this computer, as they would on GitHub's machines.",!!(st&&st.runs_on),function(on){
    var i=$("ldRuns");if(i)i.setAttribute("aria-checked",on?"true":"false");Promise.resolve().then(function(){return a.share_runs_set(on);}).then(function(s){LS=s;paint();toast(on?"This computer runs Fabrica's jobs for your devices now.":"This computer stopped running jobs for your devices.");},function(e){toast("It could not change: "+(e&&e.message||e));});}));
  if(!st||!st.on){if(st&&st.error){var w=mk("div","ld-warn",st.error);col.appendChild(w);}return;}''')
open(p, "w", encoding="utf-8").write(s)
print("r274 patched")
