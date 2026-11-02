<style id="r158-css">
/* ============ R158 · ROOM TO GROW: LARGE APPS, QUICK WITH THE MODELS ============
   The owner's words (22 and 23 October 2026): edit apps twice Ingenium's size, and the Offline Project and its demos, in
   Chat, Code and Build; "I want for Ingenium's capacity to be more than 120 MB. It needs to work smoothly, efficiently and
   fast with the models without crashing." Measured on 6.2 before this part, with an app of 107 MB (rig/t_62_capacity.js):
   - a file over 120 MB was refused;
   - the data an app carries the way Ingenium carries its own (base64 in script blocks) was read as code: the model was
     handed the first 64 MB of it, and getting a message ready held the page for more than ten minutes, because the
     passages that match a message were found by reading every file again, part by part, for every message;
   - every large text Ingenium kept (the app, and each changed copy of it) stayed in memory for the whole session;
   - Build ran the whole app as one attribute of the preview frame (the way that froze the Mac in October).
   Now:
   - a file of up to 400 MB is taken on a computer, 200 MB on a tablet or a phone;
   - embedded data in script blocks (and long runs of encoded data anywhere) is named and left out of what a model
     reads, as pictures in data: addresses already were; the page itself keeps it, whole;
   - the passages of each file are indexed once, a little at a time so the page keeps answering, and every later message
     reuses the index; the parts of a file are worked out once;
   - large texts stay in the device's store once safely written, and only the most recently used stay in memory (never
     one the open conversation reads, never one not yet written);
   - Build runs a large app from a file of its own, as the stage beside the chat does. */
</style>
<script>try{(window.__ingParts=window.__ingParts||{})["p79"]="started";}catch(_){}
/* R158 · room to grow: see the note at the top of its styles */
(function(){"use strict";
if(window.__r158)return;window.__r158=1;
var W=window;
var SMALL=(typeof INB!=="undefined"&&INB)||(navigator.deviceMemory&&navigator.deviceMemory<=4)||/Android|iPhone|iPad|Silk|Kindle/i.test(navigator.userAgent||"");

/* ---------- 1. the limits ---------- */
try{if(typeof CHAT_FILE_MAX_MB==="number")CHAT_FILE_MAX_MB=Math.max(CHAT_FILE_MAX_MB,SMALL?200:400);}catch(e){}

/* ---------- 2. embedded data, left out of what a model reads ---------- */
var B64N=/[^A-Za-z0-9+\/=\r\n]/g;
function endOf(re,t,i){re.lastIndex=i;var m=re.exec(t);return m?m.index:t.length;}
function size(n){try{return fmtBytes(n);}catch(e){return Math.round(n/1048576)+" MB";}}
/* a run of encoded data that is the whole content of an element (a script block of plain text, a template, a text area),
   4,000 characters or more; and any run of 20,000 or more, its lines broken or not */
function more(text){var cuts=[],m,s,e,re=/>[\t ]*[A-Za-z0-9+\/=]{4000}/g;
  while((m=re.exec(text))){s=m.index+1;while(text.charCodeAt(s)===32||text.charCodeAt(s)===9)s++;e=endOf(B64N,text,s);var k=e;
    while(k<text.length&&/\s/.test(text.charAt(k)))k++;
    if(text.charCodeAt(k)===60&&e-s>=4000)cuts.push([s,e]);re.lastIndex=Math.max(e,re.lastIndex);}
  var re2=/[A-Za-z0-9+\/=]{20000}/g;
  while((m=re2.exec(text))){s=m.index;e=endOf(B64N,text,s);cuts.push([s,e]);re2.lastIndex=e;}
  if(!cuts.length)return null;cuts.sort(function(a,b){return a[0]-b[0];});
  var out=[],last=0,n=0,bytes=0;
  cuts.forEach(function(c){if(c[0]<last)return;out.push(text.slice(last,c[0]),"[encoded data, "+size(c[1]-c[0])+", left out here]");bytes+=c[1]-c[0];last=c[1];n++;});
  out.push(text.slice(last));return {text:out.join(""),n:n,bytes:bytes};}
if(typeof W.ingStripMedia==="function"){var oStrip=W.ingStripMedia;
  W.ingStripMedia=ingStripMedia=function(text){var r=oStrip.apply(this,arguments);try{var x=more(r.text);if(x)return {text:x.text,n:r.n+x.n,bytes:r.bytes+x.bytes};}catch(e){}return r;};}

/* ---------- 3. texts worked out once: a file's code without its data, its parts, its index ---------- */
/* kept by the text itself, the most recently used first, up to a bound */
function Cache(bound){this.m=new Map();this.bound=bound;this.n=0;}
Cache.prototype.get=function(k){var v=this.m.get(k);if(v===undefined)return undefined;this.m.delete(k);this.m.set(k,v);return v;};
Cache.prototype.set=function(k,v,w){if(this.m.has(k)){this.n-=this.m.get(k).w;this.m.delete(k);}this.m.set(k,{v:v,w:w});this.n+=w;
  var it=this.m.keys();while(this.n>this.bound&&this.m.size>1){var o=it.next().value;this.n-=this.m.get(o).w;this.m.delete(o);}};
Cache.prototype.val=function(k){var e=this.get(k);return e?e.v:undefined;};
/* about one large file each: a file's older copies are let go as its newer ones come */
var LEAN=new Cache(SMALL?60e6:260e6),PARTS=new Cache(SMALL?30e6:120e6),INDEX=new Cache(SMALL?20e6:80e6);
var CODEISH=/\.(html?|xhtml|svg|js|mjs|cjs|jsx|tsx?|css|json)$/i;
/* what a model reads of a long page or script: its code, without the data it carries */
function lean(name,text){if(typeof text!=="string"||text.length<262144)return text;if(!CODEISH.test(name||"")&&!/^\s*(<!doctype html|<html[\s>])/i.test(text.slice(0,2000)))return text;
  var v=LEAN.val(text);if(v!==undefined)return v;var r=text;try{var s=ingStripMedia(text);if(s&&s.n)r=s.text+"\n[left out above: "+s.n+" blocks of embedded data, "+size(s.bytes)+" in all; the file itself keeps them]";}catch(e){}
  LEAN.set(text,r,text.length);return r;}
if(typeof W.docSources==="function"){var oSources=W.docSources;
  W.docSources=docSources=function(){var out=oSources.apply(this,arguments);try{out.forEach(function(d){d.text=lean(d.name,d.text);});}catch(e){}return out;};}
/* the parts of a text, as R73 cuts them (about a thousand characters, at a paragraph, a line or a sentence where one falls
   in the second half), looked for within each part only: the search for a break used to run back over the whole text
   before it, every part, so a page of encoded data with no breaks in it took hours */
function split(text){var out=[],i=0,n=text.length,C=(typeof DOC_CHUNK==="number"?DOC_CHUNK:1000);
  while(i<n){var end=Math.min(n,i+C);
    if(end<n){var lo=i+Math.ceil(C*0.5),w=text.slice(lo,end+2),f=end-lo,k=w.lastIndexOf("\n\n",f);if(k<0)k=w.lastIndexOf("\n",f);if(k<0)k=w.lastIndexOf(". ",f);if(k>=0)end=lo+k+1;}
    out.push({at:i,text:text.slice(i,end)});i=end;}
  return out;}
if(typeof W.docSplit==="function"){
  W.docSplit=docSplit=function(text){text=String(text==null?"":text);if(text.length<200000)return split(text);
    var v=PARTS.val(text);if(v)return v;v=split(text);PARTS.set(text,v,text.length);return v;};}
/* a file's overview, wherever it is asked for (the project's files in the standing instructions too), is of its code */
if(typeof W.docOverview==="function"){var oOver=W.docOverview;
  W.docOverview=docOverview=function(name,text,room){return oOver.call(this,name,lean(name,text),room);};}
/* the index of one text: its parts, the words of each, and in how many parts each word is */
function indexNow(text){var ch=docSplit(text),chunks=new Array(ch.length),df=new Map(),total=0;
  for(var i=0;i<ch.length;i++)chunks[i]=one(ch[i],df);
  chunks.forEach(function(c){total+=c.len;});return {chunks:chunks,df:df,total:total};}
function one(c,df){var terms=docTerms(c.text),tf=new Map();for(var j=0;j<terms.length;j++)tf.set(terms[j],(tf.get(terms[j])||0)+1);
  tf.forEach(function(_,w){df.set(w,(df.get(w)||0)+1);});return {text:c.text,tf:tf,len:terms.length||1};}
var tick=typeof MessageChannel==="function"?(function(){var ch=new MessageChannel(),q=[];ch.port1.onmessage=function(){var f=q.shift();if(f)f();};return function(f){q.push(f);ch.port2.postMessage(0);};})():function(f){setTimeout(f,0);};
/* built a little at a time: the page answers between the slices */
var BUILDING=new Map();
function indexLater(text){var have=INDEX.val(text);if(have)return Promise.resolve(have);if(BUILDING.has(text))return BUILDING.get(text);
  var p=new Promise(function(res){var ch=docSplit(text),chunks=new Array(ch.length),df=new Map(),i=0,total=0;
    (function slice(){var t0=Date.now();while(i<ch.length&&Date.now()-t0<12){chunks[i]=one(ch[i],df);total+=chunks[i].len;i++;}
      if(i<ch.length){tick(slice);return;}var ix={chunks:chunks,df:df,total:total};INDEX.set(text,ix,text.length);BUILDING.delete(text);res(ix);})();});
  BUILDING.set(text,p);return p;}
function indexOf(text){var ix=INDEX.val(text);if(ix)return ix;if(text.length>1500000)return null;ix=indexNow(text);INDEX.set(text,ix,text.length);return ix;}
/* the passages that best match a message: as before (BM25 over the parts of every file), from the indexes */
if(typeof W.docRetrieve==="function"){var oRetrieve=W.docRetrieve;
  W.docRetrieve=docRetrieve=function(docs,query,room){try{var q=docTerms(query);if(!q.length||room<400)return "";
      var all=[],df=new Map(),total=0,N=0,skipped=[];
      docs.forEach(function(d,di){var ix=indexOf(d.text);if(!ix){skipped.push(d.name);indexLater(d.text);return;}
        ix.chunks.forEach(function(c,ci){all.push({d:di,i:ci,n:ix.chunks.length,c:c});});ix.df.forEach(function(v,w){df.set(w,(df.get(w)||0)+v);});total+=ix.total;N+=ix.chunks.length;});
      if(skipped.length)try{console.warn("Ingenium: still indexing",skipped.join(", "));}catch(e){}
      if(!all.length)return "";
      var avg=total/N||1,uq=[];q.forEach(function(w){if(uq.indexOf(w)<0)uq.push(w);});
      all.forEach(function(x){var sc=0,c=x.c;for(var k=0;k<uq.length;k++){var f=c.tf.get(uq[k]);if(!f)continue;var dw=df.get(uq[k]);
          sc+=Math.log(1+(N-dw+0.5)/(dw+0.5))*f*2.2/(f+1.2*(0.25+0.75*c.len/avg));}x.score=sc;});
      var best=all.filter(function(x){return x.score>0&&!(docs[x.d].shown&&docs[x.d].shown[x.i]);}).sort(function(a,b){return b.score-a.score;});
      if(!best.length)return "";
      var top=best[0].score,keep=[],used=0;
      for(var i=0;i<best.length&&i<4000;i++){var x=best[i];if(x.score<top*0.25)break;if(used+x.c.text.length>room)continue;keep.push(x);used+=x.c.text.length;}
      keep.sort(function(a,b){return a.d-b.d||a.i-b.i;});
      return "[Passages from the files that match this message (the files are longer than the model's memory, so these were chosen for it):]\n"+
        keep.map(function(x){return "<passage file=\""+String(docs[x.d].name).replace(/"/g,"'")+"\" part=\""+(x.i+1)+" of "+x.n+"\">\n"+x.c.text.trim()+"\n</passage>";}).join("\n");}
    catch(e){try{console.warn("Ingenium passages:",e);}catch(_){}return oRetrieve.apply(this,arguments);}};}
/* before a reply: the files the conversation draws on are made lean and indexed, a little at a time */
function ready(){var docs=[];try{docs=docSources(4000,40000);}catch(e){}
  return docs.reduce(function(p,d){return p.then(function(){return d.text&&d.text.length>20000?indexLater(d.text):null;});},Promise.resolve());}
if(typeof W.chatPrepare==="function"){var oPrep=W.chatPrepare;
  W.chatPrepare=chatPrepare=function(rec,bot){var self=this,args=arguments;
    return Promise.resolve().then(function(){return W.ingBigEnsureChat?ingBigEnsureChat():null;}).then(function(){return ready();}).catch(function(){})
      .then(function(){return oPrep.apply(self,args);});};}

/* ---------- 4. Build runs a large app from a file of its own ---------- */
var RUNURL=null;
function based(doc,html){if(/<base[\s>]/i.test(String(html).slice(0,40000)))return doc;var href=String(location.href).split("#")[0].replace(/"/g,"%22"),tag='<base href="'+href+'">',m=/^(﻿?\s*<!doctype[^>]*>)/i.exec(doc);
  return m?m[1]+tag+doc.slice(m[1].length):tag+doc;}
W.ingRunInFrame=function(frame,html,seed){if(!frame)return;if(RUNURL&&frame.__ingRun===RUNURL){try{URL.revokeObjectURL(RUNURL);}catch(e){}RUNURL=null;}
  var doc=ingStageDoc(html,seed);
  if(doc.length>2000000){frame.removeAttribute("srcdoc");RUNURL=URL.createObjectURL(new Blob([based(doc,html)],{type:"text/html"}));frame.__ingRun=RUNURL;frame.src=RUNURL;}
  else{if(frame.getAttribute("src"))frame.removeAttribute("src");frame.srcdoc=doc;}};

W.IngRoom={small:!!SMALL,lean:lean,index:indexLater,more:more,caches:function(){return {lean:LEAN.m.size,parts:PARTS.m.size,index:INDEX.m.size,building:BUILDING.size};}};
})();
;try{window.__ingParts["p79"]="running";}catch(_){}
</script>
