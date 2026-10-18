"""The Offline Project's master demonstration: one site whose opening is the master seal (its layered depth swaying, each
quarter moving as its own app's seal moves), and whose four seals open the four apps' live demonstrations.

The owner's words (18 October 2026): "I want the master shield seal to open up the site with its layered depth swaying 3D
animation and as well as the apps own animations inside of their quadrants [...] I want to be able to click on each app's
seal inside of the master seal quadrant and have that open up the page that shows that app's live demonstration demo."
And: "I want a live interactive preview of the master Offline Project demo so I can [see] everything before you ship."

What it writes, into OUT_DIR:
  index.html                      the site (site.html beside this file): the hall with the crest, the four rooms, the devices
  assets/seals/<app>[N].png       the four seals by day and night, taken from the approved preview of the master seal
  assets/devices/<device>_<day|night>.jpg   the crest on each device, from the owner's images
  apps/<slug>.html                each app's live demonstration, as it is, with two things added at the top of its page:
                                  its character set, and a shim that keeps its storage in a corner of its own (op:<app>:),
                                  because the four now share one web address, and Carpe Diem and the Forge use the same names.
                                  The shim also stops a service worker from being installed: one app's worker would answer
                                  for the others.
  A page larger than --max-file (the private preview's limit is 16 MB a file) is written as a small page that fetches
  its parts (apps/<slug>.partN.txt) and writes them into itself, so the app runs exactly as it is.

The owner's words, on the approved preview: "I only want the committee tour features for Carpe Diem and I want an alternate
version of the Offline project that does not have Inkwell." So --cd-sample is optional (the site gives Carpe Diem's room the
Committee demo alone), and so is --inkwell: without it the site has three rooms, the gilt book of the boss stands in
Inkwell's quarter of the crest and opens the list of the apps, the words say three, and the devices, whose pictures show
all four seals, stay out.

--mode preview  writes index.html without its document skeleton (the Artifact host adds one) and shows a Preview chip
--mode site     writes a whole document, for a web host such as GitHub Pages, and never splits a page (--max-file 0)

usage: build_master_demo.py --seal SEAL_PREVIEW.html --images DIR [--cd-sample F] --cd-committee F --forge-demo F
                            --ingenium F [--inkwell F [--inkwell-vendor DIR]] --out DIR [--mode preview|site] [--max-file BYTES]"""
import argparse, base64, io, json, os, re, shutil

from PIL import Image

HERE = os.path.dirname(os.path.abspath(__file__))
ap = argparse.ArgumentParser()
for a in ("seal", "images", "cd-committee", "forge-demo", "ingenium", "out"):
    ap.add_argument("--" + a, required=True)
ap.add_argument("--cd-sample", help="Carpe Diem's Public sample, offered beside the Committee demo (left out: the Committee demo alone)")
ap.add_argument("--inkwell", help="Inkwell's page (left out: the site of three apps)")
ap.add_argument("--inkwell-vendor", help="Inkwell's vendor folder (its word lists, citation styles and PDF reader), copied to apps/vendor")
ap.add_argument("--mode", choices=("preview", "site"), default="preview")
ap.add_argument("--max-file", type=int, default=None)
A = ap.parse_args()
if A.inkwell_vendor and not A.inkwell:
    raise SystemExit("--inkwell-vendor is for a site that carries Inkwell")
MAX = A.max_file if A.max_file is not None else (15000000 if A.mode == "preview" else 0)
OUT = A.out
for d in ("assets/seals", "assets/devices", "apps"):
    os.makedirs(os.path.join(OUT, d), exist_ok=True)
OUTSIDE = re.compile(r"<script[^>]+src=[\"']https?://[^\"']*(claude\.ai|claudeusercontent\.com)", re.I)

# 1. THE SEALS, from the approved preview of the master seal (its FLAT table of the four seals, day and night)
seal_src = open(A.seal, encoding="utf-8").read()
m = re.search(r"var FLAT = (\{.*?\});", seal_src, re.S)
if not m:
    raise SystemExit("the preview of the master seal does not hold its table of seals (var FLAT)")
FLAT = json.loads(m.group(1))
IMG = {"seals": {}, "devices": {}}
for k in ("cd", "cdN", "forge", "forgeN", "ingenium", "ingeniumN", "inkwell", "inkwellN"):
    v = FLAT.get(k, "")
    if not v.startswith("data:image/png;base64,"):
        raise SystemExit("the seal %s is missing from the preview" % k)
    im = Image.open(io.BytesIO(base64.b64decode(v.split(",", 1)[1]))).convert("RGBA")
    if im.size[0] > 640:
        im = im.resize((640, 640), Image.LANCZOS)
    im.save(os.path.join(OUT, "assets/seals/%s.png" % k), optimize=True)
    # the same seal inside the page itself (a viewer that cannot reach the files beside the page still shows it)
    buf = io.BytesIO(); im.resize((512, 512), Image.LANCZOS).save(buf, "WEBP", quality=92, method=6)
    IMG["seals"][k] = "data:image/webp;base64," + base64.b64encode(buf.getvalue()).decode("ascii")

# 2. THE DEVICES, from the owner's images (only the pictures named for a device; the banner stays out)
DEVICES = ("iphone", "ipad", "macbook_pro", "mac_mini_4k", "windows", "fire_hd10_upright", "fire_hd10_sideways")
for dv in DEVICES:
    for t in ("day", "night"):
        p = os.path.join(A.images, "the_offline_project_%s_%s.jpg" % (dv, t))
        im = Image.open(p).convert("RGB")
        if im.size[1] > 720:
            im = im.resize((round(im.size[0] * 720 / im.size[1]), 720), Image.LANCZOS)
        dp = os.path.join(OUT, "assets/devices/%s_%s.jpg" % (dv, t))
        im.save(dp, quality=84, optimize=True, progressive=True)
        IMG["devices"]["%s_%s" % (dv, t)] = "data:image/jpeg;base64," + base64.b64encode(open(dp, "rb").read()).decode("ascii")

# 3. THE APPS, each with its character set and its own corner of the storage
SHIM = r"""<script id="op-shim">/* THE OFFLINE PROJECT'S MASTER DEMONSTRATION: the four apps share one web address here, so each keeps its storage in
   a corner of its own (keys and databases named op:<app>:), and none installs a service worker that would answer for the others.
   The frames an app makes inside itself (from text, or blank and filled from outside) are given the same corner, as they share
   the app's own storage at home. */
(function S(P){var H=Object.prototype.hasOwnProperty;
function wrap(real){if(!real)return real;function own(){var o=[];for(var j=0;j<real.length;j++){var k=real.key(j);if(k&&k.indexOf(P)===0)o.push(k.slice(P.length));}return o;}
var api={getItem:function(k){return real.getItem(P+k);},setItem:function(k,v){real.setItem(P+k,String(v));},removeItem:function(k){real.removeItem(P+k);},clear:function(){own().forEach(function(k){real.removeItem(P+k);});},key:function(i){var o=own();return i>=0&&i<o.length?o[i]:null;}};
return new Proxy(api,{get:function(t,p){if(p==="length")return own().length;if(typeof p!=="string")return undefined;if(H.call(api,p))return api[p];var v=real.getItem(P+p);return v===null?undefined:v;},
set:function(t,p,v){if(typeof p==="string"&&!H.call(api,p))real.setItem(P+p,String(v));return true;},deleteProperty:function(t,p){if(typeof p==="string")real.removeItem(P+p);return true;},
has:function(t,p){return typeof p==="string"&&(H.call(api,p)||p==="length"||real.getItem(P+p)!==null);},ownKeys:function(){return own();},
getOwnPropertyDescriptor:function(t,p){if(typeof p==="string"&&!H.call(api,p)){var v=real.getItem(P+p);if(v!==null)return{value:v,writable:true,enumerable:true,configurable:true};}return undefined;}});}
function install(W){
try{if(!W||W.__opShimP===P)return;Object.defineProperty(W,"__opShimP",{value:P,configurable:true});}catch(e){return;}
try{var L=wrap(W.localStorage);Object.defineProperty(W,"localStorage",{get:function(){return L;},configurable:true});}catch(e){}
try{var SS=wrap(W.sessionStorage);Object.defineProperty(W,"sessionStorage",{get:function(){return SS;},configurable:true});}catch(e){}
try{var I=W.indexedDB;if(I){var o=I.open.bind(I),d=I.deleteDatabase.bind(I);I.open=function(n,v){return v===undefined?o(P+n):o(P+n,v);};I.deleteDatabase=function(n){return d(P+n);};
if(I.databases){var ds=I.databases.bind(I);I.databases=function(){return ds().then(function(a){return a.filter(function(x){return x&&x.name&&x.name.indexOf(P)===0;}).map(function(x){return{name:x.name.slice(P.length),version:x.version};});});};}}}catch(e){}
try{var C=W.caches;if(C){var co=C.open.bind(C),cx=C["delete"].bind(C),ch=C.has.bind(C),ck=C.keys.bind(C);C.open=function(n){return co(P+n);};C["delete"]=function(n){return cx(P+n);};C.has=function(n){return ch(P+n);};
C.keys=function(){return ck().then(function(a){return a.filter(function(x){return x.indexOf(P)===0;}).map(function(x){return x.slice(P.length);});});};}}catch(e){}
try{if(W.navigator.serviceWorker)W.navigator.serviceWorker.register=function(){return new Promise(function(){});};}catch(e){}
try{var IP=W.HTMLIFrameElement&&W.HTMLIFrameElement.prototype;if(IP&&!H.call(IP,"__opP")){Object.defineProperty(IP,"__opP",{value:P});
var F=Object.getOwnPropertyDescriptor(IP,"srcdoc"),CW=Object.getOwnPropertyDescriptor(IP,"contentWindow"),CD=Object.getOwnPropertyDescriptor(IP,"contentDocument");
if(F&&F.set){var TAG="<scr"+"ipt>("+S.toString()+")("+JSON.stringify(P)+");</scr"+"ipt>";Object.defineProperty(IP,"srcdoc",{configurable:true,enumerable:F.enumerable,get:F.get,set:function(v){v=String(v);if(v.indexOf("function S(P)")<0){var m=/^\s*<!doctype[^>]*>/i.exec(v);v=m?v.slice(0,m[0].length)+TAG+v.slice(m[0].length):TAG+v;}F.set.call(this,v);}});}
if(CW&&CW.get)Object.defineProperty(IP,"contentWindow",{configurable:true,enumerable:CW.enumerable,get:function(){var w=CW.get.call(this);if(w)install(w);return w;}});
if(CD&&CD.get)Object.defineProperty(IP,"contentDocument",{configurable:true,enumerable:CD.enumerable,get:function(){var d=CD.get.call(this);try{if(d&&d.defaultView)install(d.defaultView);}catch(e){}return d;}});}}catch(e){}}
install(window);
})("op:__APP__:");</script>"""

LOADER = """<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>__TITLE__</title>
<style>html,body{height:100%;margin:0}body{display:grid;place-items:center;font:15px/1.5 -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif;background:#f5f3f7;color:#221a2e}
@media (prefers-color-scheme:dark){body{background:#110d18;color:#f3eefb}}.w{text-align:center;padding:16px}.b{width:220px;height:4px;border-radius:2px;background:rgba(127,127,127,.25);overflow:hidden;margin:12px auto 0}
.b i{display:block;height:100%;width:0;background:#b08a3e;transition:width .25s}.e{max-width:36ch;margin:10px auto 0;color:#a33}</style></head>
<body><div class="w"><div>__TITLE__</div><div class="b"><i id="b"></i></div><div class="e" id="e" hidden></div></div>
<script>
/* This demonstration is larger than one file of the host allows, so it travels in parts: they are fetched, joined and
   written into this page, and the app then runs exactly as it is. */
(function(){window.__opLoader=true;var parts=__PARTS__,sizes=__SIZES__,total=__TOTAL__,got=0,txt=[];
function step(i){if(i>=parts.length){window.__opLoader=false;var h=txt.join("");txt=null;document.open();document.write(h);document.close();return;}
fetch(parts[i]).then(function(r){if(!r.ok)throw new Error("part "+(i+1)+": "+r.status);return r.text();}).then(function(s){txt.push(s);got+=sizes[i];document.getElementById("b").style.width=Math.round(100*got/total)+"%";step(i+1);})
.catch(function(e){var x=document.getElementById("e");x.hidden=false;x.textContent="This demonstration could not be opened here ("+(e&&e.message||e)+").";});}
step(0);})();
</script></body></html>
"""

APPS = [
    ("carpe-diem", "cd", A.cd_sample, "Carpe Diem · Public sample", {"en": "Public sample", "fr": "Échantillon public"}),
    ("carpe-diem-committee", "cd", A.cd_committee, "Carpe Diem · Committee demo", {"en": "Committee demo", "fr": "Démo du comité"}),
    ("the-forge", "forge", A.forge_demo, "The Forge · Demo", None),
    ("ingenium", "ingenium", A.ingenium, "Ingenium", None),
    ("inkwell", "inkwell", A.inkwell, "Inkwell", None),
]
CHECK = {"carpe-diem": 'edition:"Public sample"', "carpe-diem-committee": 'edition:"Committee demo"', "the-forge": 'edition:"Demo"',
         "ingenium": "ING_VERSION=\"", "inkwell": "<!-- BUILD='"}
APPS = [x for x in APPS if x[2]]
build = {"preview": A.mode == "preview", "apps": {}}
if not A.inkwell:
    build["without"] = ["inkwell"]
versions = {}
for slug, key, path, title, label in APPS:
    if not A.cd_sample and slug == "carpe-diem-committee":
        label = None  # the Committee demo alone: no choice to offer
    s = open(path, encoding="utf-8").read()
    if CHECK[slug] not in s:
        raise SystemExit("%s: not the page expected (%s)" % (slug, CHECK[slug]))
    if OUTSIDE.search(s):
        raise SystemExit("%s: carries a script from outside that does not belong" % slug)
    if 'id="op-shim"' in s:
        raise SystemExit("%s: already carries the shim" % slug)
    d = re.match(r"\s*<!doctype html>", s, re.I)
    at = d.end() if d else 0
    s = s[:at] + '\n<meta charset="utf-8">' + SHIM.replace("__APP__", key if slug != "carpe-diem-committee" else "cdc") + s[at:]
    if slug.startswith("carpe-diem"):
        versions["cd"] = re.search(r'window\.CD_BUILD=\{date:"[^"]*",pass:"(\d+)"', s).group(1)
    if slug == "the-forge":
        versions["forge"] = re.search(r'window\.CD_BUILD=\{date:"[^"]*",pass:"(\d+)"', s).group(1)
    if slug == "ingenium":
        versions["ingenium"] = re.search(r'ING_VERSION="([0-9.]+)"', s).group(1)
    if slug == "inkwell":
        versions["inkwell"] = re.search(r"<!-- BUILD='([\d.]+)'", s).group(1)
    b = s.encode("utf-8")
    page = os.path.join(OUT, "apps", slug + ".html")
    for old in os.listdir(os.path.join(OUT, "apps")):
        if old.startswith(slug + ".part"):
            os.remove(os.path.join(OUT, "apps", old))
    if MAX and len(b) > MAX:
        n = -(-len(b) // MAX)
        step = -(-len(s) // n)
        names, sizes = [], []
        for i in range(n):
            chunk = s[i * step:(i + 1) * step].encode("utf-8")
            nm = "%s.part%d.txt" % (slug, i + 1)
            open(os.path.join(OUT, "apps", nm), "wb").write(chunk)
            names.append(nm)
            sizes.append(len(chunk))
            if len(chunk) > 16000000:
                raise SystemExit("%s: a part is still too large" % slug)
        open(page, "w", encoding="utf-8").write(LOADER.replace("__TITLE__", title).replace("__PARTS__", json.dumps(names))
                                                 .replace("__SIZES__", json.dumps(sizes)).replace("__TOTAL__", str(sum(sizes))))
        how = "%d parts" % n
        parts = ["apps/" + x for x in names]
    else:
        open(page, "wb").write(b)
        how = "one page"
        parts = None
    entry = {"file": "apps/%s.html" % slug, "mb": round(len(b) / 1e6, 1)}
    if parts:
        entry["parts"] = parts
    if label:
        entry["label"] = label
    group = "carpe-diem" if slug.startswith("carpe-diem") else slug
    build["apps"].setdefault(group, []).append(entry)
    print("  %-22s %10d bytes, %s" % (slug, len(b), how))
build["line"] = "Carpe Diem %s · The Forge %s · Ingenium %s" % (versions["cd"], versions["forge"], versions["ingenium"]) + (" · Inkwell %s" % versions["inkwell"] if A.inkwell else "")

# 3b. INKWELL'S VENDOR FILES: its page asks for vendor/<file> beside itself (the dictionary for spelling, the word lists
#     for verb forms and meanings, the citation styles, the PDF reader). The neural grammar engine (ort-wasm, 21 MB, and
#     transformers.min.js, which needs it) is left out: no file of the private preview may pass 16 MB, and Inkwell
#     works without it, as it does in a browser that cannot run it.
if A.inkwell_vendor:
    VD = os.path.join(OUT, "apps", "vendor")
    if os.path.isdir(VD):
        shutil.rmtree(VD)
    keep = ("scowl-words.txt", "verb-form-vocab.txt", "wordnet-lex.txt", "citeproc.js", "pdf.min.js", "pdf.worker.min.js",
            "SCOWL-LICENCE.txt", "WORDNET-LICENCE.txt", "PDFJS-LICENCE.txt", "GECTOR-LICENCE.txt")
    os.makedirs(VD)
    for f in keep:
        shutil.copyfile(os.path.join(A.inkwell_vendor, f), os.path.join(VD, f))
    shutil.copytree(os.path.join(A.inkwell_vendor, "csl"), os.path.join(VD, "csl"))
    print("  inkwell vendor          %10d bytes" % sum(os.path.getsize(os.path.join(r, f)) for r, _, fs in os.walk(VD) for f in fs))

# 4. THE SITE
site = open(os.path.join(HERE, "site.html"), encoding="utf-8").read()
if site.count("/*@@BUILD@@*/{}") != 1:
    raise SystemExit("site.html: the place for the build was not found")
build["img"] = IMG
site = site.replace("/*@@BUILD@@*/{}", json.dumps(build, ensure_ascii=False).replace("</", "<\\/"))
if not A.inkwell:
    d0 = 'content="Carpe Diem, The Forge, Ingenium and Inkwell: four apps that live on your own device, each with its live demonstration."'
    if site.count(d0) != 1:
        raise SystemExit("site.html: the description was not found")
    site = site.replace(d0, 'content="Carpe Diem, The Forge and Ingenium: three apps that live on your own device, each with its live demonstration."')
if A.mode == "site":
    site = ('<!doctype html>\n<html lang="en">\n<head>\n<meta charset="utf-8">\n<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">\n'
            + site.replace("<div id=\"app\">", "</head>\n<body>\n<div id=\"app\">", 1) + "\n</body>\n</html>\n")
open(os.path.join(OUT, "index.html"), "w", encoding="utf-8").write(site)
print("site", A.mode, len(site.encode("utf-8")), "bytes;", build["line"])
