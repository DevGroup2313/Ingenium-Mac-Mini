"""INGENIUM | Copyright (c) 2026 Yannie D. Forest. All rights reserved. NO LICENCE IS GRANTED.
The Forge 647's makers on their own, for the machines its apps run on (.github/workflows/forge-makers-check.yml): one page
with exactly the code and the shells the Forge carries (forge_fabrica_647.py: R136 and R170 in the Forge's words, the four
shells), an app to make (Tide Clock, with the test icons), and a few lines that make its APK, IPA, Mac app and Windows app
one after another and save each where the window can: the shell's own save (ShellNative, in the Mac shell and the iPhone
and iPad shell, whose engine is the one the Forge's iPhone app uses), pywebview's (as the Forge's Mac and Windows apps), or
a download. It reports whether the window is a secure one with Web Crypto, which signing needs, and what each maker made.
    python3 maker_page.py <out.html>"""
import base64, json, os, sys

HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, os.path.join(HERE, ".."))
import forge_fabrica_647 as ff  # noqa: E402

ICONS = os.path.normpath(os.path.join(HERE, "..", "..", "..", "shells", "test", "icons"))


def icons():
    out = {"android": {}, "ios": {}, "mac": {}, "win": {}}
    for f in sorted(os.listdir(ICONS)):
        kind, size = f[:-4].split("-", 1)
        out[kind][size] = base64.b64encode(open(os.path.join(ICONS, f), "rb").read()).decode("ascii")
    return out


APP = ('<!doctype html><html><head><meta charset="utf-8"><title>Tide Clock</title><meta name="ingenium-build" content="1.4"></head>'
       '<body><h1>Tide Clock</h1><script>document.body.insertAdjacentHTML("beforeend","<p>ok</p>");</script></body></html>')

DRIVER = r'''<script>
(function(){
function b64d(s){var b=atob(s),u=new Uint8Array(b.length);for(var i=0;i<b.length;i++)u[i]=b.charCodeAt(i);return u;}
var ICONS=JSON.parse(document.getElementById("mk-icons").textContent),PAGE=new TextDecoder().decode(b64d(document.getElementById("mk-page").textContent.trim()));
function b64e(u){var s="",CH=0x8000;for(var i=0;i<u.length;i+=CH)s+=String.fromCharCode.apply(null,u.subarray(i,i+CH));return btoa(s);}
function log(line){try{window.webkit.messageHandlers.shellLog.postMessage(line);}catch(e){}try{if(window.pywebview&&pywebview.api&&pywebview.api.log)pywebview.api.log(line);}catch(e){}try{console.log(line);}catch(e){}}
function save(name,mime,u8){var b=b64e(u8);
  if(window.ShellNative&&ShellNative.saveFile){ShellNative.saveFile(name,mime,b);return Promise.resolve("the shell's own save");}
  if(window.pywebview&&pywebview.api&&pywebview.api.save_file)return Promise.resolve(pywebview.api.save_file(name,mime,b)).then(function(){return "pywebview's save";});
  var a=document.createElement("a");a.href=URL.createObjectURL(new Blob([u8],{type:mime}));a.download=name;document.body.appendChild(a);a.click();return Promise.resolve("a download");}
function set(kind,keys){var o={};keys.forEach(function(k){o[k]=b64d(ICONS[kind][String(k)]);});return o;}
function one(what,name,mime,fn){var t0=Date.now();return Promise.resolve().then(fn).then(function(r){return save(name,mime,r.bytes).then(function(how){
    return {what:what,ok:true,file:name,size:r.size,sha256:r.sha256,ms:Date.now()-t0,saved:how};});},function(e){return {what:what,ok:false,error:String((e&&e.message)||e).slice(0,300),ms:Date.now()-t0};});}
window.__mkRun=function(){
  var html=new TextEncoder().encode(PAGE),base={html:html,page:"index.html",title:"Tide Clock",id:"com.yannieforest.tideclock",bridges:["CarpeNative"]};
  var st={secure:window.isSecureContext===true,subtle:!!(window.crypto&&crypto.subtle),origin:location.origin,shells:{apk:!!document.getElementById("ing-android-shell"),ipa:!!(window.IngIpa&&IngIpa.has()),mac:!!(window.IngMac&&IngMac.has()),win:!!(window.IngWin&&IngWin.has())},made:[]};
  log("FORGE_MAKERS START "+JSON.stringify(st));
  var dens=IngApk.core.DENSITIES.map(function(d){return d[0];}),ios=IngIpa.icons.map(function(x){return x[1];});
  return one("APK","forge-check.apk","application/vnd.android.package-archive",function(){return IngApk.make(Object.assign({},base,{versionName:"1.4",icons:set("android",dens),background:"#f5f3f7"}));})
    .then(function(r){st.made.push(r);log("FORGE_MAKERS MADE "+JSON.stringify(r));return one("IPA","forge-check.ipa","application/octet-stream",function(){return IngIpa.make(Object.assign({},base,{versionName:"1.4",build:"14",icons:set("ios",ios)}));});})
    .then(function(r){st.made.push(r);log("FORGE_MAKERS MADE "+JSON.stringify(r));return one("Mac app","forge-check-mac.zip","application/zip",function(){return IngMac.make(Object.assign({},base,{versionName:"1.4",build:"14",icons:set("mac",IngMac.sizes)}));});})
    .then(function(r){st.made.push(r);log("FORGE_MAKERS MADE "+JSON.stringify(r));return one("Windows app","forge-check-windows.zip","application/zip",function(){return IngWin.make(Object.assign({},base,{versionName:"1.4",icons:set("win",IngWin.sizes)}));});})
    .then(function(r){st.made.push(r);log("FORGE_MAKERS MADE "+JSON.stringify(r));
      return (indexedDB.databases?indexedDB.databases():Promise.resolve([])).then(function(d){st.stores=(d||[]).map(function(x){return x.name;});},function(){st.stores=null;});})
    .then(function(){st.ok=st.made.length===4&&st.made.every(function(m){return m.ok;});var j=JSON.stringify(st);log("FORGE_MAKERS DONE "+j);
      try{if(window.pywebview&&pywebview.api&&pywebview.api.done)pywebview.api.done(j);}catch(e){}return st;});};
if(!/[?&]manual=1/.test(location.search))setTimeout(function(){window.__mkRun();},2500);
})();
</script>'''


def page():
    parts = ['<!doctype html><html><head><meta charset="utf-8"><title>Forge Makers Check</title></head><body><h1>The Forge 647: its makers</h1>',
             '<script type="application/json" id="mk-icons">%s</script>' % json.dumps(icons()),
             '<script type="text/plain" id="mk-page">%s</script>' % base64.b64encode(APP.encode("utf-8")).decode("ascii"),
             ff.r136(), ff.r170()] + ff.shells() + [DRIVER, "</body></html>"]
    return "\n".join(parts)


if __name__ == "__main__":
    t = page()
    open(sys.argv[1], "w", encoding="utf-8").write(t)
    print("%s: %d bytes" % (sys.argv[1], len(t.encode("utf-8"))))
