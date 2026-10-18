"""Fabrica for the Forge (pass 639): Ingenium's own offline GitHub, carried into the Forge without any model.

The owner's words (18 October 2026): "Please update the Forge with Ingenium's 5.6 fixes and bring the Forge up to
Ingenium's level, as a full offline mini GitHub without AI."

The engines are Ingenium's, read from source/build/modules as Ingenium builds them, so a fix there reaches the Forge at
its next pass: R110 (each app a repository of real git objects, with branches, tags, a three-way merge, a revert, a
history never written over, and the folder, bundle and zip any git reads), R111 (five checks on a version, and the app
as one page or as a web app), R112 (the Fabrica page) and R114 (GitHub, only when switched on). What changes here, each
change found exactly once or the pass stops:
  - the store is the Forge's own (forge_repos), and Fabrica keeps its settings under a key of its own
    (fabrica:state), outside the Forge's backup, so a GitHub token never travels in a backup file;
  - where Ingenium hands an app to Code (a model), the Forge has a file editor in Fabrica itself, and its own Editor
    for the apps it knows, whose edits come back as changes to keep;
  - the app library is the Forge's own (window.__forgeLib), and the Editor's open app can be brought in;
  - the install packages are the Forge's own five (Mac, Mac mini, Windows, iPhone and iPad, Fire), made by its packager;
  - the colours are the Forge's blue, by day and by night;
  - the page is a room of the Forge (room-fabrica), opened from the rail; it is not a page of Ingenium.
usage (from forge639.py): block() returns the styles and scripts to put before the page's </body>."""
import os, re

MODS = os.path.normpath(os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "..", "build", "modules"))


class Src:
    def __init__(self, name):
        self.name = name
        self.s = open(os.path.join(MODS, name + ".js"), encoding="utf-8").read()

    def rep(self, a, b, count=1):
        n = self.s.count(a)
        if n != count:
            raise SystemExit("%s: expected %d, found %d: %r" % (self.name, count, n, a[:110]))
        self.s = self.s.replace(a, b)

    def cut(self, start, end, new):
        """replace the text from start up to (not including) end, each found once"""
        i = self.s.find(start)
        if i < 0 or self.s.count(start) != 1:
            raise SystemExit("%s: start not found once: %r" % (self.name, start[:90]))
        j = self.s.find(end, i)
        if j < 0:
            raise SystemExit("%s: end not found after start: %r" % (self.name, end[:90]))
        self.s = self.s[:i] + new + self.s[j:]


KEEP = r'''<script>/* PASS 639 · Fabrica's own keeping in the Forge: one key of its own, outside the Forge's backup (whose keys
   begin forge:, cd- or cd_, or name Carpe Diem), so a GitHub token signed in here never travels in a backup file */
(function(){var K="fabrica:state",S=null,t=0;
window.__fbState=function(){if(S)return S;try{S=JSON.parse(localStorage.getItem(K)||"{}")||{};}catch(e){S={};}if(!S||typeof S!=="object")S={};return S;};
window.__fbSave=function(){clearTimeout(t);t=setTimeout(function(){try{localStorage.setItem(K,JSON.stringify(window.__fbState()));}catch(e){}},120);};})();
</script>'''

LOCAL_STATE = 'var state=window.__fbState();function saveState(){window.__fbSave();}'

FORGE_CSS = r'''<style id="forge-fabrica-css">
/* PASS 639 · Fabrica in the Forge's colours: Ingenium's keys and slabs, the Forge's blue; its room has the whole width */
#room-fabrica .room-body{padding-top:4px}
/* the room's own head names it once; Fabrica keeps only its four steps there */
#room-fabrica #fb .f-head > div:first-child{display:none}
#fb{--f-bg:#f3f6f8;--f-card:#f8fafc;--f-lo:#e7eef3;--f-b:#f6f9fb;
  --f-ink1:#15212b;--f-ink2:#3e4c58;--f-ink3:#62717d;--f-hair:rgba(21,33,43,.11);--f-hair2:rgba(21,33,43,.06);
  --f-acc:#17577A;--f-accs:rgba(23,87,122,.12);--f-ring:rgba(23,87,122,.5);
  --f-pa:#1f6a92;--f-pb:#154f70;--f-pedge:#0f3d57;--f-pledge:#0a2c40;--f-code:#f5f8fa;--f-codeink:#1d2a34}
body[data-theme="night"] #fb{--f-bg:#0d141a;--f-card:#141d25;--f-hi:#17212a;--f-lo:#1f2c37;--f-a:#1f2c37;--f-b:#1a2630;
  --f-ink1:#eaf3f9;--f-ink2:#c8d8e3;--f-ink3:#9db3c2;--f-hair:rgba(170,205,230,.12);--f-hair2:rgba(170,205,230,.07);
  --f-acc:#86c1de;--f-accs:rgba(134,193,222,.16);--f-ring:rgba(134,193,222,.45);
  --f-pa:#2a77a0;--f-pb:#1b5a7c;--f-pedge:#0e3348;--f-pledge:#071c28;--f-code:#111a21;--f-codeink:#e2edf4}
/* the file editor: a sheet wide enough to write in */
#fb .f-sheet.f-edit{width:min(1080px,96%);max-width:none;max-height:94%;display:flex;flex-direction:column}
#fb .f-edit-bar{margin:0 0 8px}
#fb .f-edit-bar select{font:600 13px var(--f-mono);padding:6px 10px;border-radius:9px;border:1px solid var(--f-hair);background:var(--f-hi);color:var(--f-ink1);max-width:100%}
#fb .f-edit-ta{flex:1 1 auto;min-height:320px;height:52vh;width:100%;resize:vertical;font:13px/1.5 var(--f-mono);color:var(--f-codeink);background:var(--f-code);
  border:1px solid var(--f-hair);border-radius:10px;padding:10px 12px;box-shadow:var(--f-well);tab-size:2;white-space:pre;overflow:auto}
#fb .f-edit-report{max-height:9em;overflow:auto;font:12px/1.45 var(--f-mono);white-space:pre-wrap;background:var(--f-wellbg);border:1px solid var(--f-hair2);border-radius:9px;padding:8px 10px;margin:0 0 10px;color:var(--f-ink2)}
</style>'''

# the Forge's own ways in and out, in place of Ingenium's Code (a model): a file editor here, the Forge's Editor for the
# apps it knows (their edits come back as changes to keep), the Forge's app library, and the Forge's mount
FORGE_JS = r'''/* ---------- PASS 639 · the Forge changes an app's files itself, with no model: a file editor here, and the Forge's
   Editor for the apps it knows, whose edits come back here as changes to keep ---------- */
function isText(path,u8){if(/\.(png|jpe?g|gif|webp|ico|woff2?|ttf|otf|pdf|zip|gz|wasm|mp3|mp4|m4a|ogg|wav|webm|avif|jks|keystore|p12)$/i.test(path))return false;var n=Math.min(u8.length,4096);for(var i=0;i<n;i++)if(u8[i]===0)return false;return true;}
function editorApp(){try{return window.FORGE&&FORGE.fab&&FORGE.fab.editorApp?FORGE.fab.editorApp():null;}catch(e){return null;}}
function edLinks(){var f=FBS();if(!f.edLinks)f.edLinks={};return f.edLinks;}
function fromEditor(ed,into){var page=(ed.name||"index.html").split("/").pop();if(!/\.html?$/i.test(page))page+=".html";busy("Bringing "+page+" in…");
  var files=[{path:page,data:ed.html}],p=into?IngRepo.putMany(into.id,files).then(function(){return {id:into.id};}):IngRepo.fromFiles(files,{name:page.replace(/\.html?$/i,"").replace(/[_-]+/g," "),app:ed.app&&APPS[ed.app]?ed.app:undefined,msg:"Brought in from the Editor"+(ed.edited?", with its edits":"")});
  p.then(function(x){edLinks()[x.id]={path:page,name:ed.name||""};FBS().sel=x.id;saveSoon();S.view=into?"changes":"history";C.diff={};C.files={};C.log={};return refresh();}).then(function(){unbusy();paint();toast(page+" is here"+(into?", as changes to keep.":", with its first version."));},function(e){unbusy();fail(e);});}
/* the Editor's edits come back as changes to keep, while the Editor still holds the page this app sent it */
function syncFromCode(r){var L=r&&edLinks()[r.id],ed=L?editorApp():null;if(!L||!ed||!ed.html||(L.name&&ed.name&&L.name!==ed.name))return Promise.resolve(false);
  return IngRepo.readText(r.id,L.path).then(function(t){if(t===ed.html)return false;return IngRepo.put(r.id,L.path,ed.html).then(function(){C.diff={};C.files={};return true;});}).then(function(changed){
    if(!changed)return false;return refresh().then(function(){if(cur()&&cur().id===r.id&&S.view!=="changes"){S.view="changes";S.cmp=null;S.file=0;}paint();toast("Your edits in the Editor are here, as changes to keep.");return true;});}).catch(function(){return false;});}
function openInEditor(r,path,text){var a="any",nm=path.split("/").pop();try{a=window.__forgeEd.detect(text)||"any";}catch(e){}
  try{window.__forgeEd.open(text,nm,a==="any"?undefined:a);}catch(e){fail(e);return;}
  edLinks()[r.id]={path:path,name:nm};saveSoon();try{FORGE.openRoom("editor");}catch(e){}}
/* the file editor: any text file of the app, written here and saved as a change; a new file, a new name, or none */
function openInCode(r,path,report){busy("Reading "+r.name+"’s files…");
  IngRepo.files(r.id).then(function(list){unbusy();var texts=list.filter(function(f){return !/\.(png|jpe?g|gif|webp|ico|woff2?|ttf|otf|pdf|zip|gz|wasm|mp3|mp4|m4a|ogg|wav|webm|avif|jks|keystore|p12)$/i.test(f.path);});
    var want=path||(texts.filter(function(f){return /\.html?$/i.test(f.path)&&f.path.indexOf("/")<0;})[0]||texts[0]||{}).path||"index.html";sheetEdit(r,texts,want,report);},function(e){unbusy();fail(e);});}
function sheetEdit(r,texts,path,report){var sh=sheet("Edit "+r.name,null);sh.box.classList.add("f-edit");sh.box.id="fbEdit";
  if(report){var rp=h("pre","f-edit-report");rp.textContent=report;sh.box.appendChild(rp);}
  var bar=h("div","f-row f-edit-bar"),pick=h("select");pick.id="fbEdFile";pick.setAttribute("aria-label","The file");
  function opts(){pick.innerHTML="";var have=texts.map(function(f){return f.path;});if(have.indexOf(path)<0)have.push(path);have.sort().forEach(function(p){var o=document.createElement("option");o.value=p;o.textContent=p;if(p===path)o.selected=true;pick.appendChild(o);});}
  opts();bar.appendChild(pick);
  var ta=h("textarea","f-edit-ta");ta.id="fbEdText";ta.spellcheck=false;ta.setAttribute("aria-label","The file's text");
  var info=h("p","f-hint"),dirty=false,orig="";
  var openBtn=btn("quiet sm","Open it in the Editor",function(){if(dirty){toast("Save your change first, or close without it.");return;}sh.close();openInEditor(r,path,ta.value);});
  function load(p){path=p;ta.disabled=true;info.textContent="Reading "+p+"…";IngRepo.readText(r.id,p).then(function(t){orig=t==null?"":t;ta.value=orig;ta.disabled=false;dirty=false;
      info.textContent=t==null?"A new file: it is made when you save it.":orig.split("\n").length.toLocaleString("en-GB")+" lines. Saved here, it waits under Changes until you keep a version.";openBtn.hidden=t==null||!/\.html?$/i.test(p);},function(e){ta.disabled=false;fail(e);});}
  pick.onchange=function(){if(dirty&&!window.confirm("Leave your change to "+path+" unsaved?")){pick.value=path;return;}load(pick.value);};
  ta.oninput=function(){dirty=ta.value!==orig;};
  bar.appendChild(btn("quiet sm","New file",function(){sheetName("A new file","Its path in the app: notes.md, css/room.css.",function(p){p=String(p).replace(/^\/+/,"");if(!p)return;texts.push({path:p});path=p;opts();load(p);});}));
  bar.appendChild(openBtn);sh.box.appendChild(bar);sh.box.appendChild(ta);sh.box.appendChild(info);
  var end=h("div","end"),saveBtn=btn("pri","Save the change",function(){saveBtn.disabled=true;IngRepo.put(r.id,path,ta.value).then(function(){orig=ta.value;dirty=false;saveBtn.disabled=false;C.diff={};C.files={};
      if(!texts.some(function(f){return f.path===path;}))texts.push({path:path});toast("Saved: "+path+". It waits under Changes until you keep a version.");return refresh();}).then(function(){S.view="changes";paint();},function(e){saveBtn.disabled=false;fail(e);});});
  saveBtn.id="fbEdSave";
  end.appendChild(btn("quiet","Take it away",function(){if(!window.confirm("Take "+path+" away? It goes when you keep the next version; the history keeps it."))return;IngRepo.del(r.id,path).then(function(){sh.close();C.diff={};C.files={};toast(path+" is taken away, as a change to keep.");return refresh();}).then(function(){S.view="changes";paint();},fail);}));
  end.appendChild(btn("quiet","Rename",function(){sheetName("A new name for "+path,"Its new path in the app.",function(p){p=String(p).replace(/^\/+/,"");if(!p||p===path)return;return IngRepo.move(r.id,path,p).then(function(){sh.close();C.diff={};C.files={};toast(path+" is now "+p+", as a change to keep.");return refresh();}).then(function(){S.view="changes";paint();});});}));
  end.appendChild(btn("","Close",function(){if(dirty&&!window.confirm("Close without saving your change to "+path+"?"))return;sh.close();}));end.appendChild(saveBtn);sh.box.appendChild(end);
  ta.addEventListener("keydown",function(e){if((e.ctrlKey||e.metaKey)&&(e.key==="s"||e.key==="S")){e.preventDefault();e.stopPropagation();saveBtn.click();return;}
    if(e.key==="Tab"&&!e.shiftKey&&!e.ctrlKey&&!e.metaKey&&!e.altKey){e.preventDefault();var s0=ta.selectionStart,e0=ta.selectionEnd;ta.value=ta.value.slice(0,s0)+"  "+ta.value.slice(e0);ta.selectionStart=ta.selectionEnd=s0+2;ta.oninput();}});
  load(path);setTimeout(function(){try{ta.focus();}catch(e){}},80);}

/* ---------- PASS 639 · Fabrica in the Forge: its room, opened from the rail; the room calls it when it opens ---------- */
function render(){if(!$("fb")){build();}refresh().then(function(){paint();layoutSoon();var r=cur();if(r)syncFromCode(r);},function(e){paint();fail(e);});}
function roomOn(){var rm=$("room-fabrica");return !!(rm&&rm.getAttribute("data-on")==="1");}
window.__forgeFabricaMount=function(){try{S.panel="apps";render();if(one())setPanel("apps");setTimeout(fit,120);setTimeout(fit,500);}catch(e){try{console.error("Fabrica",e);}catch(_){}}};
window.addEventListener("resize",function(){if($("fb")&&roomOn())layoutSoon();});
/* what stands above the room in the Forge (a note, the help card folded or opened) moves it after it opened: the frame follows */
var lastTop=null;setInterval(function(){var r=$("fb");if(!r||!roomOn())return;var se=document.scrollingElement||document.documentElement,top=Math.round(r.getBoundingClientRect().top+(se?se.scrollTop:0));if(top!==lastTop){lastTop=top;fit();}},700);
try{new MutationObserver(function(){if($("fb")&&roomOn())paint();}).observe(document.body,{attributes:true,attributeFilter:["data-theme"]});}catch(e){}
try{if(roomOn())window.__forgeFabricaMount();}catch(e){}
window.fbRender=render;window.fbSync=syncFromCode;
/* R114's Troubleshoot: the last test's report, shown beside the app's files in the file editor */
window.fbOpenInCode=function(r,path){openInCode(r,path);};
window.fbEditWithReport=function(r,report){openInCode(r,null,report);};
})();'''


def block():
    # R110, the repository engine: the Forge's own store
    r110 = Src("r110")
    r110.rep('indexedDB.open("ingenium_repos",1)', 'indexedDB.open("forge_repos",1)')
    r110.rep('/* R110 · HER REPOSITORIES, KEPT ON THE DEVICE', '/* PASS 639: Ingenium\'s R110, as Ingenium builds it, its store named for the Forge (forge_repos).\n   R110 · HER REPOSITORIES, KEPT ON THE DEVICE')
    r110.rep('"a pack version Ingenium does not read"', '"a pack version Fabrica does not read"')
    r110.rep('is packed in a way Ingenium does not read"', 'is packed in a way Fabrica does not read"')
    r110.rep('"Ingenium reads a zip or a git bundle here"', '"Fabrica reads a zip or a git bundle here"')
    # R111, the ship engine: as Ingenium builds it; what it writes into an app says the Forge made it
    r111 = Src("r111")
    r111.rep('(made by Ingenium) */', '(made by the Forge) */')
    r111.rep('Made by Ingenium from version', 'Made by the Forge from version')

    # R112, the page
    p = Src("r112")
    p.rep('#page-fabrica.fb-page > .page-title,#page-fabrica.fb-page > .lede{display:none !important}\n', '')
    p.rep('body.fb-on .main{padding-bottom:10px !important}\n', '')
    p.rep('body.fb-on .foot{display:none !important}\n', '')
    p.rep('if(typeof IngRepo==="undefined"||typeof IngShip==="undefined"||typeof go!=="function")return;',
          'if(typeof IngRepo==="undefined"||typeof IngShip==="undefined")return;\n' + LOCAL_STATE)
    p.rep("Your own GitHub, on this device: each of your apps kept with every version, changed, tested and shipped from here. GitHub is there only when you want it.",
          "Your own GitHub, in the Forge: each of your apps kept with every version, changed, tested and shipped from here, with no model and no connection. GitHub is there only when you want it.")
    # the work: written here, or in the Forge's Editor, not by a model
    p.rep('"<b>A new app, ready for its first page</b>Describe it in Chat or open it in Code: every change the model makes, and every save of yours, lands here as a change to keep. Or bring in a page you already have."',
          '"<b>A new app, ready for its first page</b>Write its first page here, or bring in a page you already have. Every save of yours lands here as a change to keep."')
    p.rep('f.appendChild(btn("pri","Open it in Code",function(){openInCode(r);}));f.appendChild(btn("","Bring a page in",function(){sheetBring(r);}));return;}',
          'f.appendChild(btn("pri","Write its first page",function(){openInCode(r,"index.html");}));f.appendChild(btn("","Bring a page in",function(){sheetBring(r);}));return;}')
    p.rep('"<b>Nothing changed since the last version</b>Every change you or the model make in Chat or Code appears here first, file by file, with exactly what changed. You keep it as a version when it is right."',
          '"<b>Nothing changed since the last version</b>Every change you save here, or bring back from the Editor, appears here first, file by file, with exactly what changed. You keep it as a version when it is right."')
    p.rep('f.appendChild(btn("","Open it in Code",function(){openInCode(r);}));return;}',
          'f.appendChild(btn("","Edit a file",function(){openInCode(r);}));return;}')
    p.rep('Open them in Code, keep one of each, then keep this version.', 'Edit them here, keep one of each, then keep this version.')
    p.rep('open them in Code, keep one of each, then keep this version.', 'edit them here, keep one of each, then keep this version.')
    p.rep('f.appendChild(btn("","Open it in Code",function(){openInCode(r,selp?selp.path:null);}));',
          'f.appendChild(btn("",selp?"Edit this file":"Edit a file",function(){openInCode(r,selp?selp.path:null);}));')
    # a file saved by the desktop shells' own dialog where there is one, else downloaded
    p.rep('if(typeof saveFileNative==="function")return saveFileNative(name,mime,data);',
          'if(typeof window.cdSaveBytesToHost==="function"&&window.cdSaveBytesToHost(name,mime,data))return true;')
    # the install packages are the Forge's own five
    p.rep('["kits","Build kits","Six kits: Fire, iPhone, iPad, Mac mini, MacBook, Windows (.zip)",',
          '["kits","Install packages","Five: Mac, Mac mini, Windows, iPhone and iPad, Fire (.zip)",')
    p.rep('function kitsHere(){return typeof kitStore==="function"&&typeof kitAssemble==="function"&&typeof makeZip==="function"&&!!document.getElementById("ingenium-kit-bundle");}',
          'function kitsHere(){try{return !!(window.FORGE&&FORGE.fab&&FORGE.fab.kits&&FORGE.fab.hasKits());}catch(e){return false;}}')
    p.rep('"The kits are made on a computer: this build of Ingenium carries no kit store."', '"This copy of the Forge carries no install packages."')
    p.cut('/* the six build kits, as the Build page makes them', '/* ---------- running the app ---------- */',
          '/* the five install packages, made by the Forge\'s own packager from the version kept (PASS 639) */\n'
          'function makeKits(r){return IngShip.onePage(r.id).then(function(x){var base=(r.slug||r.name||"app").replace(/[^\\w.-]+/g,"_");\n'
          '  return FORGE.fab.kits(x.html,base,function(i,n){if(S.making){S.making.prog.kits=Math.round(10+85*i/n);paintShip();}}).then(function(list){if(!list.length)throw new Error("this copy of the Forge carries no install packages");\n'
          '    var total=0,made=[];list.forEach(function(k){total+=k.size;made.push({name:k.name,size:k.size});saveBytes(k.name,"application/zip",k.bytes);});\n'
          '    return IngRepo.setNote(r.id,x.commit,"kits",{at:Date.now(),size:total,made:made}).then(function(){return total;});});});}\n\n')
    p.rep('URL.revokeObjectURL(u);if(typeof csShow==="function"){go("chat");csShow({kind:"file",html:html,name:x.page||(r.slug+".html")},{user:true});}else toast("This build cannot open a window; save the one page and open it.");',
          'URL.revokeObjectURL(u);saveBytes(x.page||(r.slug+".html"),"text/html",new TextEncoder().encode(html));toast("This window cannot open another, so the one page is saved instead: open it to run "+r.name+".");')
    # bringing apps in: the Forge's app library and its Editor; no Code
    p.cut('function libList(){', 'function sheetLibrary(lib,into){',
          'function libList(){try{var L=window.__forgeLib;if(!L||typeof L.meta!=="function")return Promise.resolve([]);\n'
          '  return L.meta().then(function(m){return Object.keys(m||{}).filter(function(k){return /:newest$/.test(k);}).map(function(k){var x=m[k];return {key:x.app,version:x.version,title:x.name||x.title||"",size:x.size,id:k};});},function(){return [];});}catch(e){return Promise.resolve([]);}}\n'
          'function libText(k){var L=window.__forgeLib;if(!L||typeof L.bytes!=="function")return Promise.resolve(null);return L.bytes(k+":newest").then(function(b){return b?new TextDecoder().decode(new Uint8Array(b)):null;});}\n'
          'function sheetBring(into){var sh=sheet("Bring an app in","Whatever you bring keeps its history if it has one; if not, it starts with a first version."),lib=[];\n'
          '  var lo=opt("♦","From your app library","Reading the copies kept on this device…",function(){if(!lib.length){toast("No app is kept on this device yet: the Forge keeps the apps it carries on its first start. Or bring a file in here.");return;}sh.close();sheetLibrary(lib,into);});sh.box.appendChild(lo);\n'
          '  libList().then(function(l){lib=l;var sm=lo.querySelector("small");if(sm)sm.textContent=l.length?l.map(function(m){return (APPS[m.key]?APPS[m.key].name:m.key)+(m.version?" "+m.version:"");}).join(", "):"Nothing is kept there yet";});\n'
          '  var ed=editorApp();sh.box.appendChild(opt("✎","From the Editor",ed?(ed.name||"The app open in the Editor")+(ed.edited?", with your edits":""):"No app is open in the Editor yet",function(){if(!ed){toast("Open an app in the Editor first.");return;}sh.close();fromEditor(ed,into);}));\n'
          '  sh.box.appendChild(opt("⇩","A page, or a zip of its files","Your app\'s own .html, its install package, or GitHub\'s Download ZIP",function(){sh.close();pickFile(".html,.htm,.zip",function(f){importFile(f,into);});}));\n'
          '  sh.box.appendChild(opt("⎇","A git bundle, or a folder with its .git (zipped)","Its whole history comes with it, branch for branch",function(){sh.close();pickFile(".bundle,.zip",function(f){importFile(f,into);});}));\n'
          '  var end=h("div","end");end.appendChild(btn("","Close",sh.close));sh.box.appendChild(end);}\n')
    p.rep('"The copies Lector keeps on this device. Each comes in as a repository with a first version."',
          '"The copies the Forge keeps on this device. Each comes in as a repository with a first version."')
    p.cut('function sheetProjects(prs,into){', 'function sheetNew(){', '')
    p.rep('"Its name. Then give it its first page in Chat or Code, or bring one in."', '"Its name. Then write its first page here, or bring one in."')
    p.rep('toast("A new app, "+name+": give it its first page in Chat or Code, or bring one in.");', 'toast("A new app, "+name+": write its first page here, or bring one in.");')
    # in place of Code and the Ingenium page: the Forge's file editor, its Editor, and its room
    p.cut('/* ---------- Code and Fabrica keep the same files ---------- */', ';try{window.__ingParts["p44"]="running";}catch(_){}', FORGE_JS + "\n")
    js112 = p.s
    if re.search(r"\bccMakeProject\(|\bccNewSession\(|\bccLoadAll\(|\bgo\(\"(?:code|chat)\"\)|kitStore\(|libApps\(", js112):
        raise SystemExit("r112: a way into Code or Ingenium's kits is still there")

    # R114, GitHub: the Forge's keeping; its Troubleshoot opens the file editor with the report
    g = Src("r114")
    g.rep('(function r114GitHub(){\nif(typeof IngRepo==="undefined")return;', '(function r114GitHub(){\nif(typeof IngRepo==="undefined")return;\n' + LOCAL_STATE)
    g.rep('btn("sm pri","Fix it in Code",function(){fixInCode(r,report,X);})', 'btn("sm pri","Look at the files",function(){fixInCode(r,report,X);})')
    g.cut('/* the test\'s report, taken to Code with the app open there */', 'function ',
          '/* the test\'s report, shown beside the app\'s files in the file editor (PASS 639: the Forge has no model) */\n'
          'function fixInCode(r,report,X){try{if(typeof window.fbEditWithReport==="function"){window.fbEditWithReport(r,report);return;}}catch(e){}\n'
          '  X.toast("The report is copied: paste it beside the files.");try{if(navigator.clipboard)navigator.clipboard.writeText(report);}catch(e){}}\n')
    # the old fixInCode is gone: its three lines followed the comment
    g.s = re.sub(r'function fixInCode\(r,report,X\)\{try\{if\(typeof window\.fbOpenInCode==="function"\)\{.*?\n  X\.toast\("Code is not in this build; the report is copied below\."\);[^\n]*\n', '', g.s, count=1, flags=re.S)
    if g.s.count("function fixInCode(") != 1:
        raise SystemExit("r114: fixInCode not replaced once")
    if "Code is not in this build" in g.s:
        raise SystemExit("r114: the old Code route is still there")

    # the Forge's colours come after Ingenium's styles, so they win
    return "\n".join([KEEP, r110.s, r111.s, js112, g.s, FORGE_CSS])


if __name__ == "__main__":
    out = block()
    print(len(out), "characters")
