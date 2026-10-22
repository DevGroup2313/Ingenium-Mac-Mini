<script>try{(window.__ingParts=window.__ingParts||{})["p77"]="started";}catch(_){}
/* ============ R156 · THE STAGE LETS GO ============
   The owner's words (22 October 2026): "The live preview panel still show the HTML app even after I remove it from the chat
   box and never send the message, that crashes the app until I force quit it and even the Command+R refresh shortcut does
   nothing for the app. I have to Force Quit it, this was my issue when I tried to work on the Offline Project master demo
   app on my macbook."
   Measured on 6.1: an app sent as a file is a chip in the message box; pressed, it runs in the stage beside the chat. The
   chip's ✕ took the file out of the message and deleted its stored copy, but the stage was never told: it went on running the
   page (18 MB of Carpe Diem in the test; the Offline Project's master demonstration is about 60 MB, every app inside it).
   Closing the stage only hid it: the page went on running unseen. And the page was handed to the frame as one srcdoc
   attribute, a second whole copy of it that WebKit must store and parse in the page's own thread, which is what keeps a Mac
   from answering, Command+R included.
   Now: the ✕ on the chip takes the page off the stage too and lets it go; closing the stage stops a large page (opened
   again, it starts afresh, with what it kept); a large page (over 2 MB) reaches the frame as a file of its own (a blob), not
   as an attribute; and a very large one (over 16 MB) asks first. */
(function(){"use strict";
if(window.__r156)return;window.__r156=1;
var BIG=2000000,ASK=16000000,url=null;
function $(id){return document.getElementById(id);}
function fr(){return $("csFrame");}
function size(n){try{return fmtBytes(n);}catch(e){return Math.round(n/1048576)+" MB";}}
/* the frame stops running what it had */
function release(){var f=fr();if(url){try{URL.revokeObjectURL(url);}catch(e){}url=null;}
  if(f&&f.getAttribute("src")){f.removeAttribute("src");try{f.contentWindow&&f.contentWindow.location.replace("about:blank");}catch(e){}}}
function letGo(close){try{window.csCur=null;window.csStoreCur=null;}catch(e){}release();var f=fr();if(f)f.removeAttribute("srcdoc");
  try{csRender();csPaintKey();}catch(e){}if(close)try{if(csIsOn())csOpen(false);}catch(e){}}

/* a page given as srcdoc resolves its relative names against Ingenium's own address; a blob has none of its own, so the
   page is given Ingenium's as its base (unless it names one itself), and names resolve exactly as before */
function based(doc,html){if(/<base[\s>]/i.test(String(html).slice(0,40000)))return doc;
  var href=String(location.href).split("#")[0].replace(/"/g,"%22"),tag='<base href="'+href+'">',m=/^(\ufeff?\s*<!doctype[^>]*>)/i.exec(doc);
  return m?m[1]+tag+doc.slice(m[1].length):tag+doc;}
/* a large page reaches the frame as a file of its own */
if(typeof window.csRender==="function"){var oRender=window.csRender;
  window.csRender=function(){var c=window.csCur;
    if(c&&!c.live&&window.csMode==="preview"&&c._ran!==c.html&&c.html&&c.html.length>BIG){var pg=c;pg._ran=pg.html;
      var r=oRender.apply(this,arguments);
      try{var key=csStoreKey(pg);csLines=0;var cp=$("csConsole");if(cp){cp.innerHTML="";cp.classList.remove("has");}csName();
        csStoreLoad(key).then(function(seed){if(window.csCur!==pg)return;window.csStoreCur={key:key,data:seed,t:0};
          var f=fr();if(!f)return;release();f.removeAttribute("srcdoc");
          url=URL.createObjectURL(new Blob([based(ingStageDoc(pg.html,seed),pg.html)],{type:"text/html"}));f.src=url;});}catch(e){try{console.warn("Ingenium stage:",e);}catch(_){}}
      return r;}
    var out=oRender.apply(this,arguments);
    /* the page left the stage, or a small one took its place: the large one is let go */
    if(!window.csCur||(window.csCur._ran===window.csCur.html&&!(window.csCur.html.length>BIG)&&url))release();
    return out;};
  try{csRender=window.csRender;}catch(e){}}

/* closing the stage stops a large page; opened again, it starts afresh */
if(typeof window.csOpen==="function"){var oOpen=window.csOpen;
  window.csOpen=function(on){var r=oOpen.apply(this,arguments);
    if(!on){var c=window.csCur;if(c&&c.html&&c.html.length>BIG){release();var f=fr();if(f)f.removeAttribute("srcdoc");c._ran=null;}}
    else{var c2=window.csCur;if(c2&&c2._ran==null&&c2.html)try{csRender();}catch(e){}}
    return r;};
  try{csOpen=window.csOpen;}catch(e){}}

/* a file's page knows which stored copy it came from, and a very large one asks first */
if(typeof window.csOpenFile==="function"){
  window.csOpenFile=function(f){if(!f||!f.page)return;
    IngBig.load(f.page).then(function(html){if(!html){ingToast("This page is no longer kept on this device.");return;}
      function run(){csShow({kind:"file",html:html,name:f.name,ref:f.page},{user:true});}
      if(html.length<=ASK||typeof window.ingAsk!=="function"){run();return;}
      ingAsk({title:"Run "+f.name+" beside the chat?",yes:"Run it here",no:"Not now",
        text:"This page is "+size(html.length)+". It can run in the stage, but a page this large keeps Ingenium busy while it starts. It still goes with your message either way."})
        .then(function(y){if(y)run();});});};
  try{csOpenFile=window.csOpenFile;}catch(e){}}

/* the ✕ on a file's chip takes its page off the stage too */
if(typeof window.unstageFile==="function"){var oUn=window.unstageFile;
  window.unstageFile=function(i){var f=(window.stagedFiles||[])[i],c=window.csCur,on=!!(f&&f.page&&c&&c.kind==="file"&&c.ref===f.page);
    var r=oUn.apply(this,arguments);if(on)letGo(true);return r;};
  try{unstageFile=window.unstageFile;}catch(e){}}

window.IngStage={release:release,letGo:letGo,big:BIG,ask:ASK,usesBlob:function(){return !!url;}};
})();
;try{window.__ingParts["p77"]="running";}catch(_){}
</script>
