<script>try{(window.__ingParts=window.__ingParts||{})["p41"]="started";}catch(_){}
/* R109 · LECTOR'S PDF, MADE ON THE DEVICE
   Her word: "I want for Lector to generate Word docx, docs, and other types of files, PDFs and even HTML files". A PDF
   is written here byte by byte, with no library and no connection: A4 in her house style (Times at 12 points, the
   app's colour in the headings, numbered sections, tables ruled above and below with a tinted header row), the cover
   with the seals for a dossier, an appendix or a portfolio piece (none on a CV or a letter), a running head and a
   page count. The fonts are the PDF reader's own Times and Courier, measured with their published widths so the lines
   break where they should. */
var LxPdf=(function(){
var WID=/*R109_WIDTHS*/null;
var FACE={r:"Times-Roman",b:"Times-Bold",i:"Times-Italic",bi:"Times-BoldItalic",c:"Courier"},FID={r:"F1",b:"F2",i:"F3",bi:"F4",c:"F5"};
var HI={8364:128,8218:130,402:131,8222:132,8230:133,8224:134,8225:135,710:136,8240:137,352:138,8249:139,338:140,381:142,8216:145,8217:146,8220:147,8221:148,8226:149,8211:150,8212:151,732:152,8482:153,353:154,8250:155,339:156,382:158,376:159};
var ALT={8239:" ",8201:" ",8202:" ",8203:"",8722:"-",8594:"->",8592:"<-",8804:"<=",8805:">=",8800:"!=",10003:"v",10007:"x",9675:"o",9679:"*",8471:"(P)",8467:"l",8304:"0",185:"1",8320:"0"};
var THEMES={cd:["1B6B93","454549","EAF2F7"],forge:["17577A","8A6A22","F6F0E2"],ingenium:["6A3FB5","4B3A6E","F1ECFA"],inkwell:["1F4F68","8A6526","F4EFE3"],neutral:["2B2B33","454549","F2F2F4"]};
var NAMES={cd:"Carpe Diem",forge:"The Forge",ingenium:"Ingenium",inkwell:"Inkwell"};
var PW=595.28,PH=841.89,ML=72,MR=72,MT=72,MB=64,TW=PW-ML-MR;
function code(ch){var c=ch.charCodeAt(0);if(c>=32&&c<127)return c;if(c>=160&&c<=255)return c;if(HI[c])return HI[c];if(c===9)return 32;return null;}
/* text in WinAnsi bytes; anything else becomes its plain equivalent */
function enc(s){var out="";s=String(s||"");try{s=s.normalize("NFC");}catch(e){}
  for(var i=0;i<s.length;i++){var ch=s.charAt(i),k=code(ch);if(k!=null){out+=String.fromCharCode(k);continue;}var a=ALT[s.charCodeAt(i)];
    if(a!=null){out+=a;continue;}try{var d=ch.normalize("NFD").charAt(0);if(code(d)!=null&&d!==ch){out+=d;continue;}}catch(e){}out+="?";}
  return out;}
function width(bytes,f,size){var w=WID[FACE[f]],t=0;for(var i=0;i<bytes.length;i++){var c=bytes.charCodeAt(i);t+=c>=32?(w[c-32]||500):0;}return t*size/1000;}
function pstr(bytes){return "("+bytes.replace(/\\/g,"\\\\").replace(/\(/g,"\\(").replace(/\)/g,"\\)")+")";}
function rgb(hex){hex=String(hex||"000000").replace("#","");return [parseInt(hex.slice(0,2),16)/255,parseInt(hex.slice(2,4),16)/255,parseInt(hex.slice(4,6),16)/255].map(function(v){return v.toFixed(3);}).join(" ");}
/* the inline marks: bold, italic, code, links, and the places left for her to fill */
var EM=/\*\*(?=\S)([^*\n]+?)\*\*|(^|[^\w*\\])\*(?=\S)([^*\n]*?\S)\*(?![\w*])|(^|[^\w\\])_(?=\S)([^_\n]*?\S)_(?!\w)|`([^`\n]+)`/g;
function runs(s,base){base=base||{};var out=[],last=0,m,re=new RegExp(EM.source,"g");s=String(s||"").replace(/\[([^\]]+)\]\((https?:[^)\s]+)\)/g,"$1");
  function plain(t){var re2=/\[((?:your|to fill|the reader|the post|the years|the date|the organisation)[^\]]{0,70})\]/gi,l=0,mm;
    while((mm=re2.exec(t))){if(mm.index>l)out.push({t:t.slice(l,mm.index),b:base.b,i:base.i,col:base.col});out.push({t:"["+mm[1]+"]",i:1,b:base.b,col:"8A6526"});l=re2.lastIndex;}
    if(l<t.length)out.push({t:t.slice(l),b:base.b,i:base.i,col:base.col});}
  while((m=re.exec(s))){if(m[1]!=null){plain(s.slice(last,m.index));out.push({t:m[1],b:1,i:base.i,col:base.col});}
    else if(m[3]!=null){plain(s.slice(last,m.index)+m[2]);out.push({t:m[3],i:1,b:base.b,col:base.col});}
    else if(m[5]!=null){plain(s.slice(last,m.index)+m[4]);out.push({t:m[5],i:1,b:base.b,col:base.col});}
    else{plain(s.slice(last,m.index));out.push({t:m[6],c:1,col:base.col});}
    last=re.lastIndex;}
  plain(s.slice(last));return out;}
function face(r){return r.c?"c":r.b&&r.i?"bi":r.b?"b":r.i?"i":"r";}
/* words with their faces, broken into lines no wider than w */
function lines(rs,size,w,first){var words=[];rs.forEach(function(r){var f=face(r),parts=enc(r.t).split(/( +)/);parts.forEach(function(p){if(p==="")return;words.push({t:p,f:f,col:r.col,sp:/^ +$/.test(p),sz:r.c?size*.88:size});});});
  var L=[],cur=[],cw=0,lim=first!=null?first:w;
  function push(){while(cur.length&&cur[cur.length-1].sp)cur.pop();L.push({items:cur,w:cw});cur=[];cw=0;lim=w;}
  words.forEach(function(x){var ww=width(x.t,x.f,x.sz);if(x.sp){if(!cur.length)return;cur.push({t:x.t,f:x.f,col:x.col,w:ww,sz:x.sz});cw+=ww;return;}
    if(cw+ww>lim&&cur.length){push();}
    if(ww>lim){var s=x.t,piece="";for(var i=0;i<s.length;i++){var t2=piece+s.charAt(i);if(width(t2,x.f,x.sz)>lim&&piece){cur.push({t:piece,f:x.f,col:x.col,w:width(piece,x.f,x.sz),sz:x.sz});cw+=width(piece,x.f,x.sz);push();piece=s.charAt(i);}else piece=t2;}
      if(piece){cur.push({t:piece,f:x.f,col:x.col,w:width(piece,x.f,x.sz),sz:x.sz});cw+=width(piece,x.f,x.sz);}return;}
    cur.push({t:x.t,f:x.f,col:x.col,w:ww,sz:x.sz});cw+=ww;});
  if(cur.length)push();return L;}
function drawLine(ops,line,x,y,dflt){var cx=x;line.items.forEach(function(it){if(/^ +$/.test(it.t)){cx+=it.w;return;}
    ops.push("BT /"+FID[it.f]+" "+it.sz.toFixed(2)+" Tf "+rgb(it.col||dflt)+" rg "+cx.toFixed(2)+" "+y.toFixed(2)+" Td "+pstr(it.t)+" Tj ET");cx+=it.w;});}

/* ---------- the document laid out into pages ---------- */
function make(title,md,meta){meta=meta||{};var kind=meta.kind||"dossier",personal=kind==="cv"||kind==="cover",apps=(meta.apps||[]).filter(function(k){return THEMES[k];});
  var th=THEMES[personal?"neutral":(apps[0]||"neutral")],seals=personal?[]:(meta.seals||[]);
  return Promise.all(seals.map(function(s){return image(s.src,meta);})).then(function(imgs){
    var pages=[],ops=null,y=0,blocks=lxBlocks(md),name=meta.name||(personal?(meta.author||""):(apps.map(function(k){return NAMES[k];}).join(" and ")||title)),label=meta.subtitle||"";
    if(blocks.length&&blocks[0].k==="h"&&blocks[0].lv===1)blocks.shift();
    var note=null;if(blocks.length>1&&blocks[blocks.length-2].k==="hr"&&blocks[blocks.length-1].k==="p"){note=blocks.pop().t.replace(/^\*|\*$/g,"");blocks.pop();}
    function page(){ops=[];pages.push(ops);y=PH-MT-(pages.length>1&&!personal?14:0);}
    function room(h){if(y-h<MB+18){page();return true;}return false;}
    /* a paragraph: ind moves every line in, hang moves the lines after the first in, a bullet or number stands in the margin before it */
    function para(rs,size,lead,o){o=o||{};var x=ML+(o.ind||0),w=TW-(o.ind||0)-(o.right||0),hang=o.hang||0,L=lines(rs,size,w-hang,hang?w:null);
      L.forEach(function(l,i){room(size*lead);var lx=x+(i>0?hang:0);if(o.center)lx=ML+(TW-l.w)/2;if(o.right2)lx=ML+TW-l.w;y-=size*lead;drawLine(ops,l,lx,y,o.col||"1D1D1F");
        if(i===0&&o.bullet)ops.push("BT /"+FID.r+" "+size+" Tf "+rgb(th[0])+" rg "+(x-(o.bulletW||14)).toFixed(2)+" "+y.toFixed(2)+" Td "+pstr(enc(o.bullet))+" Tj ET");});}
    page();
    /* the cover */
    if(!personal){if(imgs.length){var hgt=kind&&imgs.length===1&&seals[0].key==="master"?150:86,gap=22,ws=imgs.map(function(im){return im?hgt*im.w/im.h:0;}),tot=ws.reduce(function(a,b){return a+b;},0)+gap*(imgs.length-1),x0=ML+(TW-tot)/2;
        y-=hgt;imgs.forEach(function(im,i){if(!im)return;ops.push("q "+ws[i].toFixed(2)+" 0 0 "+hgt.toFixed(2)+" "+x0.toFixed(2)+" "+y.toFixed(2)+" cm /Im"+i+" Do Q");x0+=ws[i]+gap;});y-=14;}
      para([{t:name,b:1,col:th[0]}],21,1.25,{center:1});y-=2;
      if(label)para([{t:label,i:1,col:"454549"}],13,1.35,{center:1});
      if(meta.forText)para([{t:"Prepared for "+meta.forText,col:"454549"}],11,1.4,{center:1});
      if(meta.author)para([{t:meta.author+"  ·  "+(meta.month||""),col:"454549"}],11,1.4,{center:1});
      y-=12;ops.push("0.6 w "+rgb("C8C8CC")+" RG "+(ML+60)+" "+y.toFixed(2)+" m "+(PW-MR-60)+" "+y.toFixed(2)+" l S");y-=18;}
    else if(kind==="cover"){para([{t:meta.author||"",b:1}],13,1.3,{right2:1});para([{t:meta.date||new Date().toLocaleDateString("en-GB",{day:"numeric",month:"long",year:"numeric"}),col:"454549"}],11,1.4,{right2:1});y-=18;}
    /* the body */
    var n=0,refs=false,lettered=blocks.some(function(b){return b.k==="h"&&b.lv===2&&/^[A-H][.)]\s/.test(b.t);}),cur=th;
    blocks.forEach(function(b,bi){
      if(b.k==="h"){var t=b.t.trim();if(b.lv<=2){refs=/^(works cited|references|bibliography|sources)$/i.test(t);var own=apps.length>1?apps.filter(function(k){return new RegExp(NAMES[k].replace(/^The /,"(The )?"),"i").test(t);}):[];
          cur=own.length===1?THEMES[own[0]]:th;if(!refs&&!lettered&&!/^(\d+|[A-H])[.)]\s/.test(t))t=(++n)+". "+t;
          if(y-14*1.3*3<MB+18)page();y-=12;para(runs(t,{b:1,col:cur[0]}),14,1.3,{});y-=4;}
        else{if(y-12*1.3*3<MB+18)page();y-=6;para(runs(t,{b:1,i:1,col:cur[1]}),12,1.3,{});y-=2;}return;}
      if(b.k==="p"){if(refs){para(runs(b.t),10.5,1.35,{hang:22});y-=4;}else{para(runs(b.t),12,1.42,{});y-=8;}return;}
      if(b.k==="ul"||b.k==="ol"){para(runs(b.t),12,1.36,{ind:22,bullet:b.k==="ul"?"•":String(b.n)+".",bulletW:b.k==="ul"?12:18});y-=3;var nx=blocks[bi+1];if(!nx||(nx.k!=="ul"&&nx.k!=="ol"))y-=5;return;}
      if(b.k==="quote"){para(runs(b.t,{i:1,col:"454549"}),11.5,1.4,{ind:28,right:12});y-=8;return;}
      if(b.k==="hr"){room(10);y-=6;ops.push("0.5 w "+rgb("C8C8CC")+" RG "+ML+" "+y.toFixed(2)+" m "+(PW-MR)+" "+y.toFixed(2)+" l S");y-=8;return;}
      if(b.k==="code"){b.lines.forEach(function(l){var L=lines([{t:l||" ",c:1}],10.8,TW-12);L.forEach(function(x){room(12.5);y-=12.5;ops.push(rgb("F4F2F6")+" rg "+ML+" "+(y-3).toFixed(2)+" "+TW+" 12.5 re f");drawLine(ops,x,ML+6,y,"2A2236");});});y-=8;return;}
      if(b.k==="table"){table(b.rows,cur);y-=10;return;}});
    if(note){y-=6;para(runs(note,{i:1,col:"454549"}),10.5,1.35,{});}
    function table(rows,c){var cols=Math.max.apply(null,rows.map(function(r){return r.length;})),pad=4,size=10.5;
      var need=[],minw=[];for(var j=0;j<cols;j++){var mx=0,mn=0;rows.forEach(function(r,i){var t=enc(String(r[j]||"").replace(/\*\*/g,""));var f=i?"r":"b";mx=Math.max(mx,width(t,f,size));t.split(/\s+/).forEach(function(w){mn=Math.max(mn,width(w,f,size));});});need.push(mx+pad*2);minw.push(Math.min(mn+pad*2,TW/cols));}
      var tot=need.reduce(function(a,b){return a+b;},0),W;if(tot<=TW)W=need.map(function(x){return x*TW/tot;});
      else{var base=minw.reduce(function(a,b){return a+b;},0),extra=Math.max(0,TW-base),want=need.map(function(x,j){return Math.max(0,x-minw[j]);}),ws=want.reduce(function(a,b){return a+b;},0)||1;W=minw.map(function(m,j){return m+extra*want[j]/ws;});}
      function rowH(r,i){var hh=0;r.forEach(function(cell,j){var L=lines(runs(String(cell||""),{b:i===0?1:0}),size,W[j]-pad*2);hh=Math.max(hh,L.length*size*1.3);});return hh+pad*2;}
      function drawRow(r,i){var hh=rowH(r,i);if(y-hh<MB+18){page();if(i>0){drawRow(rows[0],0);}}var x=ML,top=y;
        if(i===0){ops.push(rgb(c[2])+" rg "+ML+" "+(top-hh).toFixed(2)+" "+TW+" "+hh.toFixed(2)+" re f");ops.push("1 w "+rgb("4A405A")+" RG "+ML+" "+top.toFixed(2)+" m "+(PW-MR)+" "+top.toFixed(2)+" l S");}
        r.forEach(function(cell,j){var L=lines(runs(String(cell||""),{b:i===0?1:0}),size,W[j]-pad*2),yy=top-pad;L.forEach(function(l){yy-=size*1.3;drawLine(ops,l,x+pad,yy+2,"1D1D1F");});x+=W[j];});
        y=top-hh;ops.push((i===0?"1 w "+rgb("4A405A"):"0.5 w "+rgb("C8C8CC"))+" RG "+ML+" "+y.toFixed(2)+" m "+(PW-MR)+" "+y.toFixed(2)+" l S");}
      room(size*3);rows.forEach(drawRow);}
    /* the running head and the page count */
    var N=pages.length;pages.forEach(function(o,i){if(i>0&&!personal){var hd=enc(name+(label?"  ·  "+label:""));o.push("BT /F1 9 Tf "+rgb("6E6E73")+" rg "+ML+" "+(PH-MT+10).toFixed(2)+" Td "+pstr(hd)+" Tj ET");o.push("0.4 w "+rgb("C8C8CC")+" RG "+ML+" "+(PH-MT+4).toFixed(2)+" m "+(PW-MR)+" "+(PH-MT+4).toFixed(2)+" l S");}
      if(i>0||personal){var pg=enc("Page "+(i+1)+" of "+N);o.push("BT /F1 9 Tf "+rgb("6E6E73")+" rg "+ML+" 36 Td "+pstr(enc(meta.author||""))+" Tj ET");o.push("BT /F1 9 Tf "+rgb("6E6E73")+" rg "+(PW-MR-width(pg,"r",9)).toFixed(2)+" 36 Td "+pstr(pg)+" Tj ET");}});
    return write(pages,imgs,title,meta);});}

/* ---------- a picture: its colours and its transparency, each squeezed ---------- */
function deflate(u8,meta){if(meta&&meta.deflate)return meta.deflate(u8);
  try{if(typeof CompressionStream==="function")return new Response(new Blob([u8]).stream().pipeThrough(new CompressionStream("deflate"))).arrayBuffer().then(function(b){return new Uint8Array(b);});}catch(e){}
  return Promise.resolve(null);}
function image(src,meta){var dec=meta&&meta.decode?meta.decode(src):new Promise(function(res){var im=new Image();im.onload=function(){var w=im.naturalWidth,h=im.naturalHeight,k=Math.min(1,600/Math.max(w,h));w=Math.max(1,Math.round(w*k));h=Math.max(1,Math.round(h*k));
      var c=document.createElement("canvas");c.width=w;c.height=h;var g=c.getContext("2d");g.drawImage(im,0,0,w,h);res({w:w,h:h,rgba:g.getImageData(0,0,w,h).data});};im.onerror=function(){res(null);};im.src=src;});
  return dec.then(function(d){if(!d)return null;var n=d.w*d.h,rgbB=new Uint8Array(n*3),a=new Uint8Array(n);for(var i=0;i<n;i++){rgbB[i*3]=d.rgba[i*4];rgbB[i*3+1]=d.rgba[i*4+1];rgbB[i*3+2]=d.rgba[i*4+2];a[i]=d.rgba[i*4+3];}
    return Promise.all([deflate(rgbB,meta),deflate(a,meta)]).then(function(z){return {w:d.w,h:d.h,rgb:z[0]||rgbB,a:z[1]||a,flate:!!(z[0]&&z[1])};});});}

/* ---------- the file itself: objects, the cross-reference table and the trailer, with exact byte offsets ---------- */
function bytesOf(s){var u=new Uint8Array(s.length);for(var i=0;i<s.length;i++)u[i]=s.charCodeAt(i)&255;return u;}
function utf16(s){var h="FEFF";for(var i=0;i<s.length;i++)h+=("000"+s.charCodeAt(i).toString(16).toUpperCase()).slice(-4);return "<"+h+">";}
function write(pages,imgs,title,meta){
  return Promise.all(pages.map(function(o){var s=o.join("\n");return deflate(bytesOf(s),meta).then(function(z){return z?{d:z,f:1}:{d:bytesOf(s),f:0};});})).then(function(streams){
    var chunks=[],off=[],pos=0,objs=[];function add(x){if(typeof x==="string")x=bytesOf(x);chunks.push(x);pos+=x.length;}
    function obj(id,body,stream){off[id]=pos;add(id+" 0 obj\n"+body);if(stream){add("\nstream\n");add(stream);add("\nendstream");}add("\nendobj\n");}
    add("%PDF-1.4\n%âãÏÓ\n");
    var id=1,CAT=id++,PAGES=id++,INFO=id++,F0=id;id+=5;var IM=[];imgs.forEach(function(im){if(im){IM.push({rgb:id++,a:id++,im:im});}else IM.push(null);});
    var PG=[];pages.forEach(function(){PG.push({page:id++,cont:id++});});
    obj(CAT,"<< /Type /Catalog /Pages "+PAGES+" 0 R >>");
    obj(PAGES,"<< /Type /Pages /Kids ["+PG.map(function(p){return p.page+" 0 R";}).join(" ")+"] /Count "+PG.length+" >>");
    var d=new Date(),ds="D:"+d.getFullYear()+("0"+(d.getMonth()+1)).slice(-2)+("0"+d.getDate()).slice(-2)+("0"+d.getHours()).slice(-2)+("0"+d.getMinutes()).slice(-2)+("0"+d.getSeconds()).slice(-2);
    obj(INFO,"<< /Title "+utf16(title||"")+" /Author "+utf16((meta&&meta.author)||"")+" /Producer (Ingenium Lector) /CreationDate ("+ds+") >>");
    ["Times-Roman","Times-Bold","Times-Italic","Times-BoldItalic","Courier"].forEach(function(f,i){obj(F0+i,"<< /Type /Font /Subtype /Type1 /BaseFont /"+f+" /Encoding /WinAnsiEncoding >>");});
    IM.forEach(function(x){if(!x)return;var fl=x.im.flate?" /Filter /FlateDecode":"";
      obj(x.a,"<< /Type /XObject /Subtype /Image /Width "+x.im.w+" /Height "+x.im.h+" /ColorSpace /DeviceGray /BitsPerComponent 8"+fl+" /Length "+x.im.a.length+" >>",x.im.a);
      obj(x.rgb,"<< /Type /XObject /Subtype /Image /Width "+x.im.w+" /Height "+x.im.h+" /ColorSpace /DeviceRGB /BitsPerComponent 8 /SMask "+x.a+" 0 R"+fl+" /Length "+x.im.rgb.length+" >>",x.im.rgb);});
    var res="<< /Font << /F1 "+F0+" 0 R /F2 "+(F0+1)+" 0 R /F3 "+(F0+2)+" 0 R /F4 "+(F0+3)+" 0 R /F5 "+(F0+4)+" 0 R >>"+(IM.some(Boolean)?" /XObject << "+IM.map(function(x,i){return x?"/Im"+i+" "+x.rgb+" 0 R":"";}).join(" ")+" >>":"")+" >>";
    PG.forEach(function(p,i){var s=streams[i];obj(p.page,"<< /Type /Page /Parent "+PAGES+" 0 R /MediaBox [0 0 "+PW+" "+PH+"] /Resources "+res+" /Contents "+p.cont+" 0 R >>");
      obj(p.cont,"<< /Length "+s.d.length+(s.f?" /Filter /FlateDecode":"")+" >>",s.d);});
    var xref=pos,total=id;add("xref\n0 "+total+"\n0000000000 65535 f \n");for(var k=1;k<total;k++)add(("000000000"+(off[k]||0)).slice(-10)+" 00000 n \n");
    add("trailer\n<< /Size "+total+" /Root "+CAT+" 0 R /Info "+INFO+" 0 R >>\nstartxref\n"+xref+"\n%%EOF\n");
    var out=new Uint8Array(pos),p0=0;chunks.forEach(function(c){out.set(c,p0);p0+=c.length;});return out;});}
return {make:make,runs:runs,lines:lines,enc:enc};
})();
window.LxPdf=LxPdf;
;try{window.__ingParts["p41"]="running";}catch(_){}
</script>
