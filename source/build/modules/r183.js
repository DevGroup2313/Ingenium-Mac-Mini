<script>try{(window.__ingParts=window.__ingParts||{})["p104"]="started";}catch(_){}
/* ============ R183 · A DOCUMENT IS SAVED AS IT IS SHOWN (Ingenium 6.8.1, 27 October 2026) ============
   The owner's words (27 October 2026): "When documents are developed by AI in any chat, there's a depreciation of formatting
   quality when it is coverted into a PDF or Word document. Adjust it so that any document prepared keeps the exact same
   formatting when it is downloaded. The formatting shown must always match the document that is downloaded."
   Before, a document was drawn three times: on the page in the device's own fonts, in the PDF again from the Markdown in the
   PDF reader's Times, in Word again in Calibri or Times with Word's own spacing. Now it is drawn once, by the browser, and the
   PDF and the Word file are read off that drawing.
   - The page: a document is shown as the A4 pages it will print on, each page whole, in typefaces the page carries
     (build/docfont: Gelasio, drawn to Georgia's measures; Liberation Serif, Sans and Mono, drawn to Times New Roman's,
     Arial's and Courier New's; a font of signs for anything they lack; all under open licences). On a narrow panel the
     pages are made smaller whole, never re-set.
   - The PDF: the browser sets the document in a frame no one sees; every word is written where the browser put it, in the
     face it used (the part of the font the document needs, carried in the file), every fill, rule, border and picture
     where the browser drew it, each link kept; its pages break where the page shows them. A character none of the fonts
     has (an emoji, Chinese) is drawn as the browser drew it, as a picture.
   - The Word file: read off the same drawing, paragraph by paragraph: each one's typeface (Georgia, Times New Roman, Arial
     or Courier New, whose measures the page's own match, so Word's lines fall as the page's), size, weight, colour,
     spacing (the space the page leaves above it, to the point), indents, borders, fills, tables at the page's column
     widths, pictures, links. Word sets its own lines, so a line may now and then break a word sooner or later there.
   - Nothing in any of them names a program: no producer, no creator, no generator; a title, and that is all. */
(function(){"use strict";
if(window.IngDoc)return;
if(!document.getElementById("ing-docfonts"))return;
var D=document,PX=0.75,PW=595.28,PH=841.89,ML=68,MT=72,MB=72,PGW=PW/PX,PGH=PH/PX,PADX=ML/PX,PADY=MT/PX,AREA=(PH-MT-MB)/PX,CW=PGW-2*PADX;
var FOOT={size:12,lh:16,bottom:40,color:"#8a8494"};
var SERIF='"Gelasio","Liberation Serif","Doc Symbols",Georgia,serif',MONO='"Liberation Mono","Doc Symbols","Courier New",monospace';
function esc(s){return String(s==null?"":s).replace(/[&<>"]/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c];});}

/* ---------- the typefaces: each file's measures, read from the file itself ---------- */
/* 6.8.1: the typefaces travel as a block of their own at the end of the page (build/tail.py), read the first time they are
   wanted, so the page need not read them before it can be used */
var FACES=[],FAM={},FD=null;
function load(){if(FD)return true;var e=typeof ingTake==="function"?ingTake("ing-docfonts"):D.getElementById("ing-docfonts");
  if(!e||e.getAttribute("data-defer"))return false;try{FD=JSON.parse(e.textContent);}catch(x){FD=null;}if(!FD||!FD.faces){FD=null;return false;}
  FACES=FD.faces;FACES.forEach(function(f,i){f.id=i;var k=f.family.toLowerCase();(FAM[k]=FAM[k]||[]).push(f);});return true;}
function fontsReady(){if(load())return Promise.resolve();return (typeof ingFill==="function"?ingFill("ing-docfonts"):Promise.resolve()).then(function(){
  if(!load())throw new Error("the typefaces of a document are not in this copy of Ingenium");});}
function faceCss(list){load();return (list||FACES).map(function(f){return '@font-face{font-family:"'+f.family+'";src:url(data:font/ttf;base64,'+f.ttf+') format("truetype");font-weight:'+f.weight+';font-style:'+f.style+';font-display:block}';}).join("\n");}
function bytes(f){if(!f.u8){var b=atob(f.ttf),u=new Uint8Array(b.length);for(var i=0;i<b.length;i++)u[i]=b.charCodeAt(i);f.u8=u;}return f.u8;}
function u16(u,o){return (u[o]<<8)|u[o+1];}
function i16(u,o){var v=u16(u,o);return v&0x8000?v-0x10000:v;}
function u32(u,o){return u[o]*16777216+(u[o+1]<<16)+(u[o+2]<<8)+u[o+3];}
function info(f){if(f.m)return f.m;var u=bytes(f),n=u16(u,4),T={};
  for(var k=0;k<n;k++){var o=12+16*k;T[String.fromCharCode(u[o],u[o+1],u[o+2],u[o+3])]={off:u32(u,o+8),len:u32(u,o+12)};}
  var h=T.head.off,hh=T.hhea.off,os=T["OS/2"],po=T.post,hm=T.hmtx.off,m={T:T};
  m.upm=u16(u,h+18);m.bbox=[i16(u,h+36),i16(u,h+38),i16(u,h+40),i16(u,h+42)];m.locf=i16(u,h+50);m.ng=u16(u,T.maxp.off+4);m.nh=u16(u,hh+34);
  m.asc=i16(u,hh+4);m.desc=i16(u,hh+6);m.cap=os&&os.len>=90?i16(u,os.off+88):m.asc;
  m.ital=po?i16(u,po.off+4)+u16(u,po.off+6)/65536:0;m.ulPos=po?i16(u,po.off+8):-Math.round(m.upm/10);m.ulTh=po?i16(u,po.off+10):Math.round(m.upm/20);
  m.mono=po?u32(u,po.off+12)!==0:false;
  m.adv=function(g){return u16(u,hm+4*Math.min(g,m.nh-1));};
  return f.m=m;}
function cmap(f){if(f.cm)return f.cm;var u=bytes(f),c=info(f).T.cmap.off,n=u16(u,c+2),best=null,bq=-1,M=new Map();
  for(var k=0;k<n;k++){var pid=u16(u,c+4+8*k),eid=u16(u,c+6+8*k),off=c+u32(u,c+8+8*k),fmt=u16(u,off),q=-1;
    if(fmt===12&&(pid===3&&eid===10||pid===0))q=3;else if(fmt===4&&(pid===3&&eid===1||pid===0))q=2;
    if(q>bq){bq=q;best={fmt:fmt,off:off};}}
  if(best&&best.fmt===12){var o=best.off,ng=u32(u,o+12);for(var g=0;g<ng;g++){var a=u32(u,o+16+12*g),b=u32(u,o+20+12*g),s=u32(u,o+24+12*g);for(var cp=a;cp<=b;cp++)M.set(cp,s+cp-a);}}
  else if(best){var o4=best.off,seg=u16(u,o4+6)/2,E=o4+14,S=E+2*seg+2,Dl=S+2*seg,R=Dl+2*seg;
    for(var j=0;j<seg;j++){var e=u16(u,E+2*j),st=u16(u,S+2*j),dl=u16(u,Dl+2*j),ro=u16(u,R+2*j);
      for(var c2=st;c2<=e&&c2<0xFFFF;c2++){var gid;if(!ro)gid=(c2+dl)&0xFFFF;else{gid=u16(u,R+2*j+ro+2*(c2-st));if(gid)gid=(gid+dl)&0xFFFF;}if(gid)M.set(c2,gid);}}}
  return f.cm=M;}

/* which face the browser uses for a character: the first family of the element's list that has it, its face chosen as CSS
   chooses (the documents never let the browser make a bold or an italic up, so the face found is the face drawn) */
function famList(s){var out=[],cur="",q=null;s=String(s||"");
  for(var i=0;i<s.length;i++){var c=s[i];if(q){if(c===q)q=null;else cur+=c;}else if(c==='"'||c==="'")q=c;else if(c===","){out.push(cur.trim().toLowerCase());cur="";}else cur+=c;}
  if(cur.trim())out.push(cur.trim().toLowerCase());return out;}
function pick(list,w,it){var st=list.filter(function(f){return (f.style==="italic")===it;});if(!st.length)st=list;
  var ex=st.filter(function(f){return f.weight===w;});if(ex.length)return ex[0];
  var hi=st.filter(function(f){return f.weight>w;}).sort(function(a,b){return a.weight-b.weight;}),lo=st.filter(function(f){return f.weight<w;}).sort(function(a,b){return b.weight-a.weight;});
  if(w>=400&&w<=500){var mid=hi.filter(function(f){return f.weight<=500;});return mid[0]||lo[0]||hi[0];}
  return w<400?(lo[0]||hi[0]):(hi[0]||lo[0]);}
var CH={};
function chain(cs){var w=parseInt(cs.fontWeight,10)||400,it=cs.fontStyle!=="normal",k=cs.fontFamily+"|"+w+"|"+it;if(CH[k])return CH[k];
  var out=[];famList(cs.fontFamily).forEach(function(n){var L=FAM[n];if(L){var f=pick(L,w,it);if(f&&out.indexOf(f)<0)out.push(f);}});return CH[k]=out;}
function faceFor(cp,cs){var c=chain(cs);for(var i=0;i<c.length;i++){if(cmap(c[i]).has(cp))return c[i];}return null;}
/* the faces a text needs: every face of the families it is set in, and of the fallback families the first that holds each
   character those lack */
function facesFor(text,prim,fb){load();var out=[],has={};function addFam(n){if(has[n])return;has[n]=1;(FAM[n.toLowerCase()]||[]).forEach(function(f){out.push(f);});}
  prim.forEach(addFam);var base=out.slice(),cps=new Set();for(var ch of String(text||""))cps.add(ch.codePointAt(0));
  cps.forEach(function(cp){if(cp<=32||base.some(function(f){return cmap(f).has(cp);}))return;
    for(var i=0;i<(fb||[]).length;i++){var L=FAM[fb[i].toLowerCase()]||[];if(L.some(function(f){return cmap(f).has(cp);})){addFam(fb[i]);return;}}});
  return out;}

/* ---------- reading the drawing ---------- */
function col(s){var m=String(s||"").match(/rgba?\(([^)]+)\)/);if(!m)return null;var p=m[1].split(/[\s,\/]+/).filter(Boolean).map(parseFloat);
  var a=p.length>3?p[3]:1;if(!(a>0))return null;return {c:[p[0]/255,p[1]/255,p[2]/255],a:a};}
function over(x,bg){if(!x)return null;if(x.a>=0.999||!bg)return x.c;return [0,1,2].map(function(i){return x.c[i]*x.a+bg[i]*(1-x.a);});}
function pf(v){return parseFloat(v)||0;}
function tt(s,v){if(v==="uppercase")return s.toUpperCase();if(v==="lowercase")return s.toLowerCase();
  if(v==="capitalize")return s.replace(/(^|[^\p{L}\p{N}'\u2019])(\p{L})/gu,function(m,a,b){return a+b.toUpperCase();});return s;}
var PB={};
/* where the baseline lies, below the top of the text's box and below the top of a line of a given height */
function probe(doc,cs,lh){var k=cs.fontStyle+"|"+cs.fontWeight+"|"+cs.fontSize+"|"+cs.fontFamily+"|"+(lh||"");if(PB[k])return PB[k];
  var d=doc.createElement("div");d.style.cssText="position:absolute;left:0;top:0;visibility:hidden;white-space:nowrap;margin:0;padding:0;border:0";
  d.style.fontFamily=cs.fontFamily;d.style.fontSize=cs.fontSize;d.style.fontWeight=cs.fontWeight;d.style.fontStyle=cs.fontStyle;d.style.lineHeight=lh?lh+"px":"normal";
  var t=doc.createTextNode("x"),ib=doc.createElement("span");ib.style.cssText="display:inline-block;width:0;height:0;vertical-align:baseline";
  d.appendChild(t);d.appendChild(ib);doc.body.appendChild(d);var r=doc.createRange();r.selectNodeContents(t);
  var b=ib.getBoundingClientRect().bottom,v={text:b-r.getBoundingClientRect().top,box:b-d.getBoundingClientRect().top};d.remove();return PB[k]=v;}
function under(el,root,W){for(var e=el;e&&e!==root.parentElement;e=e.parentElement){var c=W.getComputedStyle(e);if(/underline/.test(c.textDecorationLine))return e;}return null;}
function pixels(doc,src,w,h){var c=doc.createElement("canvas");c.width=w;c.height=h;var x=c.getContext("2d");
  try{src(x,w,h);var d=x.getImageData(0,0,w,h).data,rgb=new Uint8Array(w*h*3),al=new Uint8Array(w*h),op=true;
    for(var i=0,j=0,k=0;i<d.length;i+=4){var a=d[i+3];al[k++]=a;if(a<255)op=false;rgb[j++]=d[i];rgb[j++]=d[i+1];rgb[j++]=d[i+2];}
    return {w:w,h:h,rgb:rgb,a:op?null:al};}catch(e){return null;}}

/* ::before and ::after made real, so they are read like the rest (the page looks the same: each copies its own style) */
function materialise(doc,root){var W=doc.defaultView,st=doc.createElement("style");st.textContent=".ing-mat::before,.ing-mat::after{content:none !important}";doc.head.appendChild(st);
  var todo=[];
  [].forEach.call(root.querySelectorAll("*"),function(e){var made=[];
    ["::before","::after"].forEach(function(p){var ps=W.getComputedStyle(e,p),c=ps.content;if(!c||c==="none"||c==="normal")return;
      var m=/^"([\s\S]*)"$/.exec(c);if(!m)return;var s=doc.createElement("span");
      for(var i=0;i<ps.length;i++){var n=ps[i];if(n!=="content")s.style.setProperty(n,ps.getPropertyValue(n));}
      s.textContent=m[1].replace(/\\"/g,'"').replace(/\\\\/g,"\\");made.push([p,s]);});
    if(made.length)todo.push([e,made]);});
  todo.forEach(function(x){var e=x[0];x[1].forEach(function(y){if(y[0]==="::before")e.insertBefore(y[1],e.firstChild);else e.appendChild(y[1]);});e.classList.add("ing-mat");});}

function frameOf(doc,root){var W=doc.defaultView,r=root.getBoundingClientRect(),c=W.getComputedStyle(root);
  var x=r.left+pf(c.borderLeftWidth)+pf(c.paddingLeft),y=r.top+pf(c.borderTopWidth)+pf(c.paddingTop);
  return {x:x,y:y,w:r.right-pf(c.borderRightWidth)-pf(c.paddingRight)-x,h:r.bottom-pf(c.borderBottomWidth)-pf(c.paddingBottom)-y,cs:c};}

/* a paper's own texture, as its style draws it: fine lines across it at a fixed step (a repeating gradient upward) and a soft
   shading from its head (a radial gradient), read so the PDF draws them on each page where they fall on the paper */
function texOf(cs,F,r){var bi=cs.backgroundImage||"";if(!bi||bi==="none")return null;var t={off:F.y-r.top,H:r.height},m;
  if((m=/repeating-linear-gradient\(0deg,\s*(rgba?\([^)]*\))\s+0px,\s*rgba?\([^)]*\)\s+([\d.]+)px,\s*rgba?\([^)]*\)\s+[\d.]+px,\s*rgba?\([^)]*\)\s+([\d.]+)px\)/.exec(bi)))t.lines={c:col(m[1]),w:+m[2],p:+m[3]};
  if((m=/radial-gradient\([\d.]+% ([\d.]+)% at [\d.]+% ([\d.]+)%((?:,\s*rgba?\([^)]*\)\s*[\d.]+%)+)\)/.exec(bi))){var st=[],q,re=/(rgba?\([^)]*\))\s*([\d.]+)%/g;
    while((q=re.exec(m[3])))st.push([+q[2]/100,over(col(q[1]),[1,1,1])]);if(st.length>1)t.rad={ry:+m[1]/100*r.height,cy:+m[2]/100*r.height,st:st};}
  return t.lines||t.rad?t:null;}
function texAt(t,y){var d=Math.min(1,Math.abs(y-t.rad.cy)/t.rad.ry),st=t.rad.st;if(d<=st[0][0])return st[0][1];
  for(var i=1;i<st.length;i++)if(d<=st[i][0]){var a=st[i-1],b=st[i],k=(d-a[0])/Math.max(1e-6,b[0]-a[0]);return [0,1,2].map(function(j){return a[1][j]+(b[1][j]-a[1][j])*k;});}
  return st[st.length-1][1];}
function read(doc,root,o){o=o||{};var W=doc.defaultView,F=frameOf(doc,root),ox=F.x,oy=F.y,skip=o.skip||"";
  var pageBg=o.bg||over(col(F.cs.backgroundColor),[1,1,1])||[1,1,1],BG=new Map(),VS=new Map();
  function bgOf(el){if(!el||el===root||!root.contains(el))return pageBg;if(BG.has(el))return BG.get(el);var c=col(W.getComputedStyle(el).backgroundColor),v=c&&c.a>=0.999?c.c:(c?over(c,bgOf(el.parentElement)):bgOf(el.parentElement));BG.set(el,v);return v;}
  function vis(el){if(!el||el===root)return true;if(VS.has(el))return VS.get(el);var c=W.getComputedStyle(el),v=!(c.display==="none"||c.visibility==="hidden"||+c.opacity===0)&&vis(el.parentElement);VS.set(el,v);return v;}
  var M={w:F.w,h:F.h,segs:[],boxes:[],imgs:[],bg:pageBg,tex:texOf(F.cs,F,root.getBoundingClientRect())},rg=doc.createRange(),tw=doc.createTreeWalker(root,4,null),n,ug=0,UG=new Map(),base=null;
  function put(s,r,f){var sg={t:s,x:r.left-ox,y:r.top-oy,w:r.right-r.left,h:r.bottom-r.top,base:r.top-oy+base.pb,face:f,size:base.size,ls:base.ls,c:base.c,href:base.href,ul:base.ul,ulc:base.ulc,prim:base.prim};
    if(!f){/* no font here has it: the browser's own drawing of it, as a picture */
      var S=4,pw=Math.max(1,Math.ceil(sg.w*S)),ph=Math.max(1,Math.ceil(sg.h*S)),bb=base;
      sg.px=pixels(doc,function(x){x.scale(S,S);x.font=bb.font;x.fillStyle="rgb("+bb.c.map(function(v){return Math.round(v*255);}).join(",")+")";x.textBaseline="alphabetic";
        try{x.letterSpacing=bb.ls+"px";}catch(e){}x.fillText(s,0,bb.pb);},pw,ph);}
    M.segs.push(sg);}
  while((n=tw.nextNode())){var t=n.nodeValue;if(!/\S/.test(t))continue;var el=n.parentElement;if(!el||!vis(el)||(skip&&el.closest(skip)))continue;
    var cs=W.getComputedStyle(el),tr=cs.textTransform,a=el.closest("a[href]"),ue=under(el,root,W);
    if(ue&&!UG.has(ue))UG.set(ue,++ug);
    base={size:pf(cs.fontSize),ls:pf(cs.letterSpacing),pb:probe(doc,cs).text,c:over(col(cs.color),bgOf(el))||[0,0,0],href:a&&root.contains(a)?a.href:"",ul:ue?UG.get(ue):0,
      ulc:ue?over(col(W.getComputedStyle(ue).textDecorationColor),bgOf(el)):null,prim:chain(cs)[0]||null,font:cs.fontStyle+" "+cs.fontWeight+" "+cs.fontSize+" "+cs.fontFamily};
    var re=/\S+/g,m;
    while((m=re.exec(t))){var s=m[0],i0=m.index;rg.setStart(n,i0);rg.setEnd(n,i0+s.length);var rects=rg.getClientRects();if(!rects.length)continue;
      var dw=tr==="none"?s:tt(s,tr),same=dw.length===s.length,cps=[],fs=[],one=true;
      for(var k=0;k<dw.length;){var cp=dw.codePointAt(k),l=cp>0xFFFF?2:1,f=faceFor(cp,cs);cps.push([k,l]);fs.push(f);if(f!==fs[0])one=false;k+=l;}
      if(rects.length===1&&one||!same){put(dw,rects.length===1?rects[0]:rg.getBoundingClientRect(),fs[0]);continue;}
      /* a word that a line break or a change of face cuts: piece by piece */
      var cur="",cr=null,cf=null;
      for(var p=0;p<cps.length;p++){rg.setStart(n,i0+cps[p][0]);rg.setEnd(n,i0+cps[p][0]+cps[p][1]);var c=rg.getBoundingClientRect(),ch=dw.substr(cps[p][0],cps[p][1]);
        if(cr&&Math.abs(c.top-cr.top)<1&&fs[p]===cf){cur+=ch;cr={left:cr.left,top:cr.top,right:c.right,bottom:Math.max(cr.bottom,c.bottom)};}
        else{if(cr)put(cur,cr,cf);cur=ch;cf=fs[p];cr={left:c.left,top:c.top,right:c.right,bottom:c.bottom};}}
      if(cr)put(cur,cr,cf);}}
  [].forEach.call(root.querySelectorAll("*"),function(e){if(!vis(e)||(skip&&e.closest(skip)))return;var cs=W.getComputedStyle(e),tag=e.tagName;
    if(tag==="IMG"){if(!e.complete||!e.naturalWidth)return;var r=e.getBoundingClientRect(),nw=e.naturalWidth,nh=e.naturalHeight,dx=r.left,dy=r.top,dw2=r.width,dh=r.height;
      if(cs.objectFit==="contain"){var s=Math.min(dw2/nw,dh/nh);dx+=(dw2-nw*s)/2;dy+=(dh-nh*s)/2;dw2=nw*s;dh=nh*s;}
      var sc=Math.min(1,Math.max(dw2,dh)*3/Math.max(nw,nh)),iw=Math.max(1,Math.round(nw*sc)),ih=Math.max(1,Math.round(nh*sc));
      var px=pixels(doc,function(x,w,h){x.drawImage(e,0,0,w,h);},iw,ih);if(px)M.imgs.push({x:dx-ox,y:dy-oy,w:dw2,h:dh,px:px});return;}
    var bg=col(cs.backgroundColor),sides=["Top","Right","Bottom","Left"].map(function(sd){var w=pf(cs["border"+sd+"Width"]),s=cs["border"+sd+"Style"],c=over(col(cs["border"+sd+"Color"]),bgOf(e.parentElement));
      return w>0&&s!=="none"&&s!=="hidden"&&c?{w:w,s:s,c:c}:null;});
    if(!bg&&!sides.some(Boolean))return;
    var inl=cs.display==="inline",rs=inl?e.getClientRects():[e.getBoundingClientRect()],coll=(tag==="TD"||tag==="TH")&&W.getComputedStyle(e.closest("table")).borderCollapse==="collapse";
    var rad=pf(cs.borderTopLeftRadius),even=cs.borderTopLeftRadius===cs.borderTopRightRadius&&cs.borderTopLeftRadius===cs.borderBottomLeftRadius&&cs.borderTopLeftRadius===cs.borderBottomRightRadius;
    var ring=even&&rad>0&&sides.every(function(x){return x&&sides[0]&&x.w===sides[0].w&&x.s===sides[0].s&&String(x.c)===String(sides[0].c);});
    [].forEach.call(rs,function(r,j){if(r.width<0.01&&r.height<0.01)return;var x=r.left-ox,y=r.top-oy;
      if(bg)M.boxes.push({k:"fill",x:x,y:y,w:r.width,h:r.height,c:over(bg,bgOf(e.parentElement)),r:even?rad:0});
      if(ring){M.boxes.push({k:"ring",x:x,y:y,w:r.width,h:r.height,r:rad,b:sides[0]});return;}
      sides.forEach(function(b,i){if(!b)return;if(inl&&(i===3&&j>0||i===1&&j<rs.length-1))return;M.boxes.push({k:"edge",s:i,x:x,y:y,w:r.width,h:r.height,b:b,mid:coll});});});});
  return M;}

/* ---------- where the pages break: whole lines, whole table rows and pictures, a heading kept with what follows ---------- */
function atomsOf(doc,root,sel){var W=doc.defaultView,rr=root.getBoundingClientRect(),rs=W.getComputedStyle(root),oy=rr.top+(parseFloat(rs.borderTopWidth)||0)+(parseFloat(rs.paddingTop)||0);
  var at=[],rg=doc.createRange(),hard="tr,img,hr,svg,[data-atom]"+(sel?","+sel:""),lines={};
  [].forEach.call(root.querySelectorAll(hard),function(e){if(e.parentElement&&e.parentElement.closest(hard))return;var r=e.getBoundingClientRect();if(r.height>0||r.width>0)at.push({t:r.top-oy,b:r.bottom-oy,h:false});});
  var tw=doc.createTreeWalker(root,4,null),n;
  while((n=tw.nextNode())){if(!/\S/.test(n.nodeValue))continue;var el=n.parentElement;if(!el||el.closest(hard))continue;
    var blk=el.closest("p,li,h1,h2,h3,h4,h5,h6,blockquote,pre,dt,dd,td,th,div")||el,hd=!!el.closest("h1,h2,h3,h4,h5,h6");
    rg.selectNodeContents(n);[].forEach.call(rg.getClientRects(),function(r){if(r.width<0.5||r.height<0.5)return;var k=Math.round(r.top-oy)+"|"+blk.tagName,L=lines[k];
      if(!L)lines[k]={t:r.top-oy,b:r.bottom-oy,h:hd};else{L.t=Math.min(L.t,r.top-oy);L.b=Math.max(L.b,r.bottom-oy);}});}
  Object.keys(lines).forEach(function(k){at.push(lines[k]);});
  at.sort(function(a,b){return a.t-b.t||a.b-b.b;});
  var out=[];at.forEach(function(a){var p=out[out.length-1];if(p&&a.t<p.b-1){p.b=Math.max(p.b,a.b);p.h=p.h&&a.h;}else out.push({t:a.t,b:a.b,h:a.h});});
  return out;}
function breaksOf(at,H){var st=[0],cur=0;
  for(var i=0;i<at.length;i++){var a=at[i];if(a.b-cur<=H+0.5)continue;
    var y=a.t,p=i;while(p>0&&at[p-1].h&&at[p-1].t>cur+0.5)p--;if(p<i)y=at[p].t;
    if(y<=cur+0.5)y=a.t;if(y<=cur+0.5)y=cur+H;
    st.push(y);cur=y;while(a.b-cur>H+0.5){cur+=H;st.push(cur);}}
  return st;}
function rangesOf(st,H){var out=[];for(var i=0;i<st.length;i++){var y1=i+1<st.length?st[i+1]:Math.max(H,st[i]);if(!out.length||y1>st[i]+0.5)out.push([st[i],y1]);}return out;}

/* ---------- the PDF ---------- */
function enc(s){return new TextEncoder().encode(s);}
function cat(parts){var n=0;parts.forEach(function(p){n+=p.length;});var out=new Uint8Array(n),q=0;parts.forEach(function(p){out.set(p,q);q+=p.length;});return out;}
function deflate(u8){if(typeof CompressionStream==="undefined")return Promise.resolve(null);
  try{var s=new CompressionStream("deflate"),w=s.writable.getWriter();w.write(u8);w.close();
    return new Response(s.readable).arrayBuffer().then(function(b){return new Uint8Array(b);},function(){return null;});}catch(e){return Promise.resolve(null);}}
function hex4(n){return ("000"+n.toString(16)).slice(-4).toUpperCase();}
function num(v){v=Math.round(v*1000)/1000;return (v===0?0:v).toString();}
function pstr(s){return "("+String(s).replace(/[\\()]/g,"\\$&").replace(/[\r\n]/g," ")+")";}
function utf16(s){var h="FEFF";for(var i=0;i<s.length;i++)h+=hex4(s.charCodeAt(i));return "<"+h+">";}
function rgbOp(c,k){return c.map(num).join(" ")+" "+k;}

/* the part of a font the document uses: every other glyph emptied, their numbers kept */
function subset(f,used){var u=bytes(f),m=info(f),T=m.T,keep=new Set([0]),lo=T.loca.off,gl=T.glyf.off;
  used.forEach(function(g){keep.add(g);});
  function at(g){return m.locf?u32(u,lo+4*g):2*u16(u,lo+2*g);}
  var st=Array.from(keep);while(st.length){var g=st.pop(),a=at(g),b=at(g+1);if(b>a&&i16(u,gl+a)<0){var p=gl+a+10;
    for(;;){var fl=u16(u,p),gi=u16(u,p+2);if(!keep.has(gi)){keep.add(gi);st.push(gi);}p+=4+(fl&1?4:2)+(fl&8?2:fl&0x40?4:fl&0x80?8:0);if(!(fl&0x20))break;}}}
  var n=m.ng,loca=new Uint8Array(4*(n+1)),dv=new DataView(loca.buffer),parts=[],off=0;
  for(var g2=0;g2<n;g2++){dv.setUint32(4*g2,off);if(keep.has(g2)){var a2=at(g2),b2=at(g2+1);if(b2>a2){var len=b2-a2,pad=(4-len%4)%4;parts.push(u.subarray(gl+a2,gl+b2));if(pad)parts.push(new Uint8Array(pad));off+=len+pad;}}}
  dv.setUint32(4*n,off);var glyf=cat(parts);
  var head=u.slice(T.head.off,T.head.off+T.head.len);head[8]=head[9]=head[10]=head[11]=0;head[50]=0;head[51]=1;
  var tabs={head:head,hhea:u.subarray(T.hhea.off,T.hhea.off+T.hhea.len),maxp:u.subarray(T.maxp.off,T.maxp.off+T.maxp.len),hmtx:u.subarray(T.hmtx.off,T.hmtx.off+T.hmtx.len),loca:loca,glyf:glyf};
  ["cvt ","fpgm","prep","OS/2","cmap"].forEach(function(k){if(T[k])tabs[k]=u.subarray(T[k].off,T[k].off+T[k].len);});
  if(T.post){var po=u.slice(T.post.off,T.post.off+32);po[0]=0;po[1]=3;po[2]=po[3]=0;tabs.post=po;}
  var tags=Object.keys(tabs).sort(),nt=tags.length,es=Math.floor(Math.log2(nt)),sr=16*Math.pow(2,es),hd=new Uint8Array(12+16*nt),hv=new DataView(hd.buffer),body=[],o2=hd.length;
  hv.setUint32(0,0x00010000);hv.setUint16(4,nt);hv.setUint16(6,sr);hv.setUint16(8,es);hv.setUint16(10,nt*16-sr);
  function sum(b){var s=0,i=0;for(;i+3<b.length;i+=4)s=(s+((b[i]<<24)>>>0)+(b[i+1]<<16)+(b[i+2]<<8)+b[i+3])>>>0;var r=0;for(var k=0;i<b.length;i++,k++)r+=b[i]*Math.pow(2,24-8*k);return (s+r)>>>0;}
  tags.forEach(function(t,i){var b=tabs[t],pad=(4-b.length%4)%4;for(var k=0;k<4;k++)hd[12+16*i+k]=t.charCodeAt(k);hv.setUint32(16+16*i,sum(b));hv.setUint32(20+16*i,o2);hv.setUint32(24+16*i,b.length);
    body.push(b);if(pad)body.push(new Uint8Array(pad));o2+=b.length+pad;});
  return cat([hd].concat(body));}
function psName(f){var w=f.weight>=600?"Bold":f.weight===500?"Medium":"",i=f.style==="italic"?"Italic":"";return (f.family.replace(/[^A-Za-z0-9]/g,"")||"Font")+"-"+(w+i||"Regular");}

/* G: pw, ph (points); ml, mt (points: where the content's top left lies); ranges [[y0,y1],…] in px; bg; frame; foot; title */
function pdfOf(M,G){var objs=[],jobs=[],used={},imgs=[],pageObjs=[],N=G.ranges.length;
  function add(o){objs.push(o);return objs.length;}
  var catalog=add(null),pagesId=add(null),infoId=add("<< /Title "+utf16(String(G.title||"Document"))+" >>");
  function image(px){var id=add(null),sm=0;if(px.a){sm=add(null);jobs.push({id:sm,data:px.a,dict:"/Type /XObject /Subtype /Image /Width "+px.w+" /Height "+px.h+" /ColorSpace /DeviceGray /BitsPerComponent 8"});}
    jobs.push({id:id,data:px.rgb,dict:"/Type /XObject /Subtype /Image /Width "+px.w+" /Height "+px.h+" /ColorSpace /DeviceRGB /BitsPerComponent 8"+(sm?" /SMask "+sm+" 0 R":"")});
    imgs.push(id);return "Im"+imgs.length;}
  function glyphs(f,s){var cm=cmap(f),m=info(f),g=[],w=0;(used[f.id]=used[f.id]||{});for(var ch of s){var cp=ch.codePointAt(0),gid=cm.get(cp)||0;g.push(gid);used[f.id][gid]=used[f.id][gid]||ch;w+=m.adv(gid);}return {g:g,w:w/m.upm};}
  var x0=G.ml,ytop=G.ph-G.mt;
  G.ranges.forEach(function(R,p){var y0=R[0],y1=R[1],ops=[],xo={},links=[];
    function X(x){return x0+x*PX;}function Y(y){return ytop-(y-y0)*PX;}
    if(G.bg&&G.bg.join(",")!=="1,1,1")ops.push(rgbOp(G.bg,"rg")+" 0 0 "+num(G.pw)+" "+num(G.ph)+" re f");
    var tx=M.tex,top=y0-G.mt/PX,hp=G.ph/PX;
    if(tx){var py=function(v){return v+tx.off;};
      if(tx.rad)for(var bi=0;bi<48;bi++){var by=top+bi*hp/48;ops.push(rgbOp(texAt(tx,py(by+hp/96)),"rg")+" 0 "+num(G.ph-(bi+1)*hp/48*PX)+" "+num(G.pw)+" "+num(hp/48*PX+0.05)+" re f");}
      if(tx.lines&&tx.lines.p>0){var L=tx.lines;for(var ly=tx.H-L.w-Math.floor((tx.H-py(top))/L.p)*L.p;ly<py(top+hp);ly+=L.p){if(ly+L.w<py(top))continue;
        var under=tx.rad?texAt(tx,ly):(G.bg||[1,1,1]);ops.push(rgbOp(over(L.c,under),"rg")+" 0 "+num(G.ph-(ly-tx.off-top+L.w)*PX)+" "+num(G.pw)+" "+num(L.w*PX)+" re f");}}}
    if(G.frame){var fr=G.frame;ops.push(rgbOp(fr.c,"RG")+" "+num(fr.lw)+" w "+num(fr.x)+" "+num(G.ph-fr.y-fr.h)+" "+num(fr.w)+" "+num(fr.h)+" re S");}
    ops.push("q 0 "+num(Y(y1+1))+" "+num(G.pw)+" "+num((y1-y0+2)*PX)+" re W n");
    function rr(x,y,w,h,r){var k=0.5523*r;return num(x+r)+" "+num(y)+" m "+num(x+w-r)+" "+num(y)+" l "+num(x+w-r+k)+" "+num(y)+" "+num(x+w)+" "+num(y+r-k)+" "+num(x+w)+" "+num(y+r)+" c "+
      num(x+w)+" "+num(y+h-r)+" l "+num(x+w)+" "+num(y+h-r+k)+" "+num(x+w-r+k)+" "+num(y+h)+" "+num(x+w-r)+" "+num(y+h)+" c "+num(x+r)+" "+num(y+h)+" l "+
      num(x+r-k)+" "+num(y+h)+" "+num(x)+" "+num(y+h-r+k)+" "+num(x)+" "+num(y+h-r)+" c "+num(x)+" "+num(y+r)+" l "+num(x)+" "+num(y+r-k)+" "+num(x+r-k)+" "+num(y)+" "+num(x+r)+" "+num(y)+" c h";}
    function dash(b){return b.s==="dashed"?"["+num(3*b.w*PX)+" "+num(3*b.w*PX)+"] 0 d 0 J ":b.s==="dotted"?"[0 "+num(2*b.w*PX)+"] 0 d 1 J ":"[] 0 d 0 J ";}
    M.boxes.forEach(function(b){if(b.y>y1+1||b.y+b.h<y0-1)return;
      if(b.k==="fill"){var r=Math.min(b.r||0,b.w/2,b.h/2)*PX;ops.push(rgbOp(b.c,"rg")+" "+(r>0.3?rr(X(b.x),Y(b.y+b.h),b.w*PX,b.h*PX,r)+" f":num(X(b.x))+" "+num(Y(b.y+b.h))+" "+num(b.w*PX)+" "+num(b.h*PX)+" re f"));return;}
      if(b.k==="ring"){var t=b.b.w,r2=Math.max(0,Math.min(b.r,b.w/2,b.h/2)-t/2)*PX;ops.push(dash(b.b)+rgbOp(b.b.c,"RG")+" "+num(t*PX)+" w "+rr(X(b.x+t/2),Y(b.y+b.h-t/2),(b.w-t)*PX,(b.h-t)*PX,r2)+" S");return;}
      var bw=b.b.w,h=b.mid?0:bw/2,s=dash(b.b)+rgbOp(b.b.c,"RG")+" "+num(bw*PX)+" w ";
      if(b.s===0)ops.push(s+num(X(b.x))+" "+num(Y(b.y+h))+" m "+num(X(b.x+b.w))+" "+num(Y(b.y+h))+" l S");
      else if(b.s===2)ops.push(s+num(X(b.x))+" "+num(Y(b.y+b.h-h))+" m "+num(X(b.x+b.w))+" "+num(Y(b.y+b.h-h))+" l S");
      else if(b.s===3)ops.push(s+num(X(b.x+h))+" "+num(Y(b.y))+" m "+num(X(b.x+h))+" "+num(Y(b.y+b.h))+" l S");
      else ops.push(s+num(X(b.x+b.w-h))+" "+num(Y(b.y))+" m "+num(X(b.x+b.w-h))+" "+num(Y(b.y+b.h))+" l S");});
    ops.push("[] 0 d 0 J");
    M.imgs.forEach(function(im){if(im.y>y1+1||im.y+im.h<y0-1)return;var nm=im.nm||(im.nm=image(im.px));xo[nm]=1;
      ops.push("q "+num(im.w*PX)+" 0 0 "+num(im.h*PX)+" "+num(X(im.x))+" "+num(Y(im.y+im.h))+" cm /"+nm+" Do Q");});
    var ul=[];
    M.segs.forEach(function(s){if(s.y<y0-0.5||s.y>=y1-0.5)return;
      if(!s.face){if(s.px){var nm=s.nm||(s.nm=image(s.px));xo[nm]=1;ops.push("q "+num(s.px.w/4*PX)+" 0 0 "+num(s.px.h/4*PX)+" "+num(X(s.x))+" "+num(Y(s.y+s.px.h/4))+" cm /"+nm+" Do Q");}}
      else{var G2=glyphs(s.face,s.t),nat=G2.w*s.size+G2.g.length*s.ls,tz=nat>0&&Math.abs(nat-s.w)>0.35?100*s.w/nat:100;
        ops.push("BT /F"+s.face.id+" "+num(s.size*PX)+" Tf "+num(s.ls*PX)+" Tc "+num(tz)+" Tz "+rgbOp(s.c,"rg")+" 1 0 0 1 "+num(X(s.x))+" "+num(Y(s.base))+" Tm <"+G2.g.map(hex4).join("")+"> Tj ET");}
      if(s.ul||s.href){var last=ul[ul.length-1];
        if(last&&last.ul===s.ul&&last.href===s.href&&Math.abs(last.base-s.base)<0.6)last.x2=s.x+s.w;
        else ul.push({ul:s.ul,href:s.href,x:s.x,x2:s.x+s.w,base:s.base,y:s.y,h:s.h,size:s.size,c:s.ulc||s.c,prim:s.prim||s.face});}});
    ul.forEach(function(u){if(u.ul){var m=u.prim?info(u.prim):null,pos=m?-m.ulPos/m.upm*u.size:u.size*0.1,th=Math.max(1,m?m.ulTh/m.upm*u.size:u.size/16);
        ops.push(rgbOp(u.c,"rg")+" "+num(X(u.x))+" "+num(Y(u.base+pos+th/2))+" "+num((u.x2-u.x)*PX)+" "+num(th*PX)+" re f");}
      if(u.href&&/^(https?:|mailto:)/i.test(u.href))links.push([X(u.x),Y(u.y+u.h),X(u.x2),Y(u.y),u.href]);});
    ops.push("Q");
    if(G.foot&&N>1){var f=G.foot,t=String(p+1),g3=glyphs(f.face,t),w=g3.w*f.size;
      ops.push("BT /F"+f.face.id+" "+num(f.size*PX)+" Tf 0 Tc 100 Tz "+rgbOp(f.c,"rg")+" 1 0 0 1 "+num((G.pw/PX-w)/2*PX)+" "+num((f.bottom+f.lh-f.base)*PX)+" Tm <"+g3.g.map(hex4).join("")+"> Tj ET");}
    pageObjs.push({ops:ops.join("\n"),xo:Object.keys(xo),links:links});});
  var fontRef={};
  Object.keys(used).forEach(function(id){var f=FACES[id],m=info(f),sc=1000/m.upm,gids=Object.keys(used[id]).map(Number).sort(function(a,b){return a-b;});
    var tag="";for(var q=0;q<6;q++)tag+=String.fromCharCode(65+((+id*7+q*5+gids.length*(q+1))%26));var nm=tag+"+"+psName(f);
    var Wd="["+gids.map(function(g){return g+" ["+Math.round(m.adv(g)*sc)+"]";}).join(" ")+"]";
    var cm="/CIDInit /ProcSet findresource begin\n12 dict begin\nbegincmap\n/CIDSystemInfo << /Registry (Adobe) /Ordering (UCS) /Supplement 0 >> def\n/CMapName /Adobe-Identity-UCS def\n/CMapType 2 def\n1 begincodespacerange\n<0000> <FFFF>\nendcodespacerange\n",ps=gids.filter(Boolean);
    for(var i=0;i<ps.length;i+=100){var ch=ps.slice(i,i+100);cm+=ch.length+" beginbfchar\n"+ch.map(function(g){var s=used[id][g],h="";for(var j=0;j<s.length;j++)h+=hex4(s.charCodeAt(j));return "<"+hex4(g)+"> <"+h+">";}).join("\n")+"\nendbfchar\n";}
    cm+="endcmap\nCMapName currentdict /CMap defineresource pop\nend\nend";
    var file=add(null),tu=add(null),fl=(m.mono?1:0)+(f.family==="Liberation Sans"||f.family==="Doc Symbols"?0:2)+32+(f.style==="italic"?64:0);
    var desc=add("<< /Type /FontDescriptor /FontName /"+nm+" /Flags "+fl+" /FontBBox ["+m.bbox.map(function(v){return Math.round(v*sc);}).join(" ")+"] /ItalicAngle "+num(m.ital)+
      " /Ascent "+Math.round(m.asc*sc)+" /Descent "+Math.round(m.desc*sc)+" /CapHeight "+Math.round(m.cap*sc)+" /StemV "+(f.weight>=600?140:80)+" /FontFile2 "+file+" 0 R >>");
    var cid=add("<< /Type /Font /Subtype /CIDFontType2 /BaseFont /"+nm+" /CIDSystemInfo << /Registry (Adobe) /Ordering (Identity) /Supplement 0 >> /FontDescriptor "+desc+" 0 R /W "+Wd+" /CIDToGIDMap /Identity >>");
    fontRef["F"+id]=add("<< /Type /Font /Subtype /Type0 /BaseFont /"+nm+" /Encoding /Identity-H /DescendantFonts ["+cid+" 0 R] /ToUnicode "+tu+" 0 R >>");
    var sub=subset(f,gids);jobs.push({id:file,data:sub,dict:"/Length1 "+sub.length});jobs.push({id:tu,data:enc(cm),dict:""});});
  var fres=Object.keys(fontRef).map(function(n){return "/"+n+" "+fontRef[n]+" 0 R";}).join(" "),kids=[];
  pageObjs.forEach(function(pg){var c=add(null);jobs.push({id:c,data:enc(pg.ops),dict:""});
    var an=pg.links.map(function(l){return add("<< /Type /Annot /Subtype /Link /Rect ["+l.slice(0,4).map(num).join(" ")+"] /Border [0 0 0] /A << /S /URI /URI "+pstr(l[4])+" >> >>");});
    var res="<< /Font << "+fres+" >>"+(pg.xo.length?" /XObject << "+pg.xo.map(function(n){return "/"+n+" "+imgs[+n.slice(2)-1]+" 0 R";}).join(" ")+" >>":"")+" >>";
    kids.push(add("<< /Type /Page /Parent "+pagesId+" 0 R /MediaBox [0 0 "+num(G.pw)+" "+num(G.ph)+"] /Resources "+res+" /Contents "+c+" 0 R"+(an.length?" /Annots ["+an.map(function(a){return a+" 0 R";}).join(" ")+"]":"")+" >>"));});
  objs[catalog-1]="<< /Type /Catalog /Pages "+pagesId+" 0 R >>";
  objs[pagesId-1]="<< /Type /Pages /Kids ["+kids.map(function(k){return k+" 0 R";}).join(" ")+"] /Count "+kids.length+" >>";
  return Promise.all(jobs.map(function(j){return deflate(j.data).then(function(z){var d=z||j.data;objs[j.id-1]={dict:"<< /Length "+d.length+(z?" /Filter /FlateDecode":"")+(j.dict?" "+j.dict:"")+" >>",data:d};});}))
  .then(function(){var parts=[enc("%PDF-1.7\n%\u00e2\u00e3\u00cf\u00d3\n")],off=parts[0].length,xref=[];
    objs.forEach(function(o,i){xref.push(off);var head=enc((i+1)+" 0 obj\n"+(typeof o==="string"?o+"\nendobj\n":o.dict+"\nstream\n"));parts.push(head);off+=head.length;
      if(typeof o!=="string"){var tail=enc("\nendstream\nendobj\n");parts.push(o.data,tail);off+=o.data.length+tail.length;}});
    parts.push(enc("xref\n0 "+(objs.length+1)+"\n0000000000 65535 f \n"+xref.map(function(v){return ("000000000"+v).slice(-10)+" 00000 n \n";}).join("")+
      "trailer\n<< /Size "+(objs.length+1)+" /Root "+catalog+" 0 R /Info "+infoId+" 0 R >>\nstartxref\n"+off+"\n%%EOF\n"));
    return cat(parts);});}

/* ---------- the Word file, read off the same drawing ---------- */
function wx(s){return String(s==null?"":s).replace(/[&<>"]/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c];}).replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f\ufffe\uffff]/g,"");}
function hx(c){return (c||[0,0,0]).map(function(v){return ("0"+Math.round(Math.max(0,Math.min(1,v))*255).toString(16)).slice(-2);}).join("").toUpperCase();}
function tw(px){return Math.max(0,Math.round(px*15));}
function guid(){var a=new Uint8Array(16),h="";crypto.getRandomValues(a);for(var i=0;i<16;i++)h+=("0"+a[i].toString(16)).slice(-2);h=h.toUpperCase();
  return "{"+h.slice(0,8)+"-"+h.slice(8,12)+"-"+h.slice(12,16)+"-"+h.slice(16,20)+"-"+h.slice(20)+"}";}
function odttf(f,g){var k=g.replace(/[{}-]/g,""),key=[],u=new Uint8Array(bytes(f));for(var i=0;i<16;i++)key.push(parseInt(k.substr(30-2*i,2),16));for(var j=0;j<32;j++)u[j]^=key[j%16];return u;}
function b64u8(s){var b=atob(s),u=new Uint8Array(b.length);for(var i=0;i<b.length;i++)u[i]=b.charCodeAt(i);return u;}
function docxOf(doc,root,G){var W=doc.defaultView,F=frameOf(doc,root),body=[],rels=[],media=[],ids=0,heads={},EMB={};
  var pageBg=over(col(F.cs.backgroundColor),[1,1,1])||[1,1,1],BG=new Map();
  function bgOf(el){if(!el||el===root||!root.contains(el))return pageBg;if(BG.has(el))return BG.get(el);var c=col(W.getComputedStyle(el).backgroundColor),v=c&&c.a>=0.999?c.c:(c?over(c,bgOf(el.parentElement)):bgOf(el.parentElement));BG.set(el,v);return v;}
  function cs(e){return W.getComputedStyle(e);}
  function hidden(e){var c=cs(e);return c.display==="none"||c.visibility==="hidden"||+c.opacity===0;}
  function block(e){var d=cs(e).display;return !/^inline/.test(d)&&d!=="none"&&d!=="contents";}
  function abs(e){var p=cs(e).position;return p==="absolute"||p==="fixed";}
  function isPara(e){var c=cs(e);if(/flex|grid/.test(c.display)&&!/column/.test(c.flexDirection))return true;
    for(var k=e.firstElementChild;k;k=k.nextElementSibling)if(!hidden(k)&&!abs(k)&&block(k))return false;return true;}
  function rel(type,target,ext){var id="rId"+(10+rels.length);rels.push('<Relationship Id="'+id+'" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/'+type+'" Target="'+wx(target)+'"'+(ext?' TargetMode="External"':"")+"/>");return id;}
  function box(e){var c=cs(e),r=e.getBoundingClientRect();
    return {r:r,c:c,pt:pf(c.paddingTop),pr:pf(c.paddingRight),pb:pf(c.paddingBottom),pl:pf(c.paddingLeft),bt:pf(c.borderTopWidth),br:pf(c.borderRightWidth),bb:pf(c.borderBottomWidth),bl:pf(c.borderLeftWidth)};}
  function side(c,sd,bgEl){var w=pf(c["border"+sd+"Width"]),s=c["border"+sd+"Style"],k=over(col(c["border"+sd+"Color"]),bgOf(bgEl));
    if(!(w>0)||s==="none"||s==="hidden"||!k)return null;return {sz:Math.max(2,Math.min(96,Math.round(w*6))),v:s==="dashed"?"dashed":s==="dotted"?"dotted":s==="double"?"double":"single",c:hx(k)};}
  function bdr(bd,sp,tag){return ["top","left","bottom","right"].map(function(s,i){var x=bd[i];return x?'<w:'+s+' w:val="'+x.v+'" w:sz="'+x.sz+'" w:space="'+(sp?Math.min(31,Math.round((sp[i]||0)*PX)):0)+'" w:color="'+x.c+'"/>':(tag?'<w:'+s+' w:val="nil"/>':"");}).join("");}
  function fontOf(c,text){var cp=null;for(var ch of String(text||""))if(/\S/.test(ch)){cp=ch.codePointAt(0);break;}
    var f=cp!=null?faceFor(cp,c):null;if(!f)f=chain(c)[0];if(f&&f.word)return f.word;var l=famList(c.fontFamily);return l.length?l[0].replace(/\b\w/g,function(x){return x.toUpperCase();}):"Georgia";}
  function rpr(c,el,text,face,own){var f=face||null,fn=wx(face!==undefined?wordOf(face):fontOf(c,text)),w=parseInt(c.fontWeight,10)||400,it=c.fontStyle!=="normal",sz=Math.round(pf(c.fontSize)*1.5),ls=pf(c.letterSpacing),ue=under(el,root,W);
    var k=over(col(c.color),bgOf(el))||[0,0,0],bold=f&&f.embed?!!f.bold:w>=600,box="";
    if(f&&f.embed){var e=EMB[f.word]=EMB[f.word]||{};e[f.style==="italic"?(f.bold?"BoldItalic":"Italic"):(f.bold?"Bold":"Regular")]=f;}
    if(own&&own!==root){var oc=W.getComputedStyle(own),fill=col(oc.backgroundColor),bs=side(oc,"Top",own.parentElement);
      if(bs)box+='<w:bdr w:val="'+bs.v+'" w:sz="'+bs.sz+'" w:space="'+Math.min(31,Math.round(pf(oc.paddingLeft)*PX))+'" w:color="'+bs.c+'"/>';if(fill)box+='<w:shd w:val="clear" w:color="auto" w:fill="'+hx(over(fill,bgOf(own.parentElement)))+'"/>';}
    return "<w:rPr>"+'<w:rFonts w:ascii="'+fn+'" w:hAnsi="'+fn+'" w:cs="'+fn+'" w:eastAsia="'+fn+'"/>'+(bold?"<w:b/><w:bCs/>":"")+(it?"<w:i/><w:iCs/>":"")+(c.textTransform==="uppercase"?"<w:caps/>":"")+
      '<w:color w:val="'+hx(k)+'"/>'+(ls?'<w:spacing w:val="'+Math.round(ls*15)+'"/>':"")+'<w:sz w:val="'+sz+'"/><w:szCs w:val="'+sz+'"/>'+(ue?'<w:u w:val="single"/>':"")+box+"</w:rPr>";}
  function pic(img){var src=img.currentSrc||img.src,m=/^data:image\/png;base64,(.*)$/.exec(src),png=null,r=img.getBoundingClientRect();
    if(m)png=b64u8(m[1]);else{try{var cv=doc.createElement("canvas");cv.width=img.naturalWidth;cv.height=img.naturalHeight;cv.getContext("2d").drawImage(img,0,0);png=b64u8(cv.toDataURL("image/png").split(",")[1]);}catch(e){png=null;}}
    if(!png||!r.width)return "";var n=media.length+1;media.push({name:"word/media/image"+n+".png",data:png});var id=rel("image","media/image"+n+".png"),cx=Math.round(r.width*9525),cy=Math.round(r.height*9525),d=++ids;
    return '<w:r><w:drawing><wp:inline distT="0" distB="0" distL="0" distR="0"><wp:extent cx="'+cx+'" cy="'+cy+'"/><wp:docPr id="'+d+'" name="Picture '+d+'"/><a:graphic xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main"><a:graphicData uri="http://schemas.openxmlformats.org/drawingml/2006/picture"><pic:pic xmlns:pic="http://schemas.openxmlformats.org/drawingml/2006/picture"><pic:nvPicPr><pic:cNvPr id="'+d+'" name="image'+n+'.png"/><pic:cNvPicPr/></pic:nvPicPr><pic:blipFill><a:blip r:embed="'+id+'"/><a:stretch><a:fillRect/></a:stretch></pic:blipFill><pic:spPr><a:xfrm><a:off x="0" y="0"/><a:ext cx="'+cx+'" cy="'+cy+'"/></a:xfrm><a:prstGeom prst="rect"><a:avLst/></a:prstGeom></pic:spPr></pic:pic></a:graphicData></a:graphic></wp:inline></w:drawing></w:r>';}
  /* a text cut where the page changes face: Greek the page sets in Liberation Serif goes to Word as Times New Roman, a sign
     from the font of signs as Segoe UI Symbol, a character no font here has (an emoji) as Segoe UI Emoji; Word on a Mac finds
     its own for those two */
  function wordOf(f){return f?(f.word||(f.family==="Doc Symbols"?"Segoe UI Symbol":f.family)):"Segoe UI Emoji";}
  function pieces(t,c){var out=[],cur="",cf;
    for(var ch of t){var f=/\s/.test(ch)?undefined:faceFor(ch.codePointAt(0),c);
      if(f===undefined||cf===undefined&&!cur||f===cf){cur+=ch;if(f!==undefined)cf=f;}else{out.push([cur,cf]);cur=ch;cf=f;}}
    if(cur)out.push([cur,cf===undefined?(chain(c)[0]||null):cf]);return out;}
  /* the words of a paragraph, as runs, the white space the browser folded folded the same way */
  function runsOf(e){var out=[],sp=true,img=false,ec=cs(e),gap=/flex|grid/.test(ec.display)?pf(ec.columnGap):0,gs=0;
    (function walk(nd){[].forEach.call(nd.childNodes,function(c){
      /* the room a row of pieces leaves between them, as spaces of the paragraph's own size */
      if(nd===e&&gap>0&&c.nodeType===1&&!hidden(c)&&!abs(c)&&/\S/.test(c.textContent||"")){if(gs++)out.push("<w:r>"+rpr(ec,e," ")+'<w:t xml:space="preserve">'+" ".repeat(Math.max(1,Math.round(gap/(pf(ec.fontSize)*0.25))))+"</w:t></w:r>");sp=false;}
      if(c.nodeType===3){var el=c.parentElement,k=cs(el),t=c.nodeValue,pre=/^pre/.test(k.whiteSpace)||k.whiteSpace==="break-spaces";if(!t)return;
        if(!pre){t=t.replace(/[\t\n\r ]+/g," ");if(sp)t=t.replace(/^ /,"");if(!t)return;sp=/ $/.test(t);}else sp=false;
        if(k.textTransform!=="none"&&k.textTransform!=="uppercase")t=tt(t,k.textTransform);
        var a=el.closest("a[href]"),x="";
        var own=el!==e&&(col(k.backgroundColor)||pf(k.borderTopWidth))?el:null;
        pieces(t,k).forEach(function(pc){var pr=rpr(k,el,pc[0],pc[1],own);
          pc[0].split(/(\n|\t)/).forEach(function(p){if(p==="\n")x+="<w:r>"+pr+"<w:br/></w:r>";else if(p==="\t")x+="<w:r>"+pr+"<w:tab/></w:r>";else if(p)x+="<w:r>"+pr+'<w:t xml:space="preserve">'+wx(p)+"</w:t></w:r>";});});
        if(a&&root.contains(a)&&/^(https?:|mailto:)/i.test(a.href))x='<w:hyperlink r:id="'+rel("hyperlink",a.href,1)+'">'+x+"</w:hyperlink>";
        out.push(x);return;}
      if(c.nodeType!==1||hidden(c))return;
      if(c.classList.contains("mk")||abs(c))return;
      if(c.tagName==="BR"){out.push('<w:r><w:br/></w:r>');sp=true;return;}
      if(c.tagName==="IMG"){var p2=pic(c);if(p2){out.push(p2);img=true;sp=false;}return;}
      walk(c);});})(e);
    var s=out.join("").replace(/ (<\/w:t><\/w:r>(?:<\/w:hyperlink>)?)$/,"$1");return {x:s,img:img};}
  function pPr(o){var b=o.bd?bdr(o.bd,o.sp,false):"";
    return "<w:pPr>"+(o.style?'<w:pStyle w:val="'+o.style+'"/>':"")+(o.keep?"<w:keepNext/>":"")+(b?"<w:pBdr>"+b+"</w:pBdr>":"")+(o.tabs||"")+
      '<w:spacing w:before="'+tw(o.before)+'" w:after="0" w:line="'+(o.line?tw(o.line):240)+'" w:lineRule="'+(o.line?(o.img?"atLeast":"exact"):"auto")+'"/>'+
      '<w:ind w:left="'+tw(o.l)+'" w:right="'+tw(o.r)+'"'+(o.hang?' w:hanging="'+tw(o.hang)+'"':o.first?' w:firstLine="'+tw(o.first)+'"':"")+"/>"+(o.jc?'<w:jc w:val="'+o.jc+'"/>':"")+"</w:pPr>";}
  function spacer(h){return '<w:p><w:pPr><w:spacing w:before="0" w:after="0" w:line="'+Math.max(1,tw(h))+'" w:lineRule="exact"/><w:rPr><w:sz w:val="2"/></w:rPr></w:pPr></w:p>';}
  function gapBefore(r,ctx,out){var gap=Math.max(0,r.top-ctx.prev);if(gap>0.4||(out.length&&/<\/w:tbl>$/.test(out[out.length-1])))out.push(spacer(gap));}
  /* ctx: the box the paragraphs are set in (its left and right, in the page's px) and the foot of what came before */
  function para(e,ctx,out,own){var B=box(e),c=B.c,r=B.r,top=r.top+B.bt+B.pt,bot=r.bottom-B.bb-B.pb,ru=runsOf(e);
    var mk=null;for(var k=e.firstElementChild;k;k=k.nextElementSibling)if(k.classList.contains("mk")){mk=k;break;}
    var bd=own?[null,null,null,null]:[side(c,"Top",e.parentElement),side(c,"Left",e.parentElement),side(c,"Bottom",e.parentElement),side(c,"Right",e.parentElement)];
    if(!ru.x&&!mk&&!bd.some(Boolean))return;
    var ta=c.textAlign,jc=ta==="center"?"center":(ta==="right"||ta==="end")?"right":ta==="justify"?"both":"";
    if(/flex/.test(c.display)&&/center/.test(c.justifyContent))jc="center";
    var l=r.left+B.bl+B.pl-ctx.l,rt=ctx.r-(r.right-B.br-B.pr);
    if(jc==="center"&&e.parentElement&&/flex/.test(cs(e.parentElement).display)){l=0;rt=0;}
    var lh=c.lineHeight==="normal"?null:pf(c.lineHeight),o={before:Math.max(0,top-ctx.prev),l:l,r:rt,line:lh,img:ru.img,jc:jc,first:pf(c.textIndent)>0?pf(c.textIndent):0,keep:/^H[1-6]$/.test(e.tagName)};
    if(o.keep){var lv=+e.tagName.charAt(1);o.style="Heading"+lv;heads[lv]=1;}
    if(bd.some(Boolean)){o.bd=bd;o.sp=[B.pt,B.pl,B.pb,B.pr];}
    var x=ru.x;
    if(mk){var mr=mk.getBoundingClientRect(),mc=cs(mk),mt=(mk.textContent||"").trim(),ml=mr.left-ctx.l,right=mc.textAlign==="right"||mc.textAlign==="end";
      o.hang=Math.max(0,l-ml);var mrun="<w:r>"+rpr(mc,mk,mt)+'<w:t xml:space="preserve">'+wx(mt)+"</w:t></w:r>",tab="<w:r><w:tab/></w:r>";
      if(right){o.tabs='<w:tabs><w:tab w:val="right" w:pos="'+tw(mr.right-ctx.l)+'"/></w:tabs>';x=tab+mrun+tab+x;}else x=mrun+tab+x;}
    if(!x){o.line=Math.max(0.5,r.height);o.before=Math.max(0,r.top-ctx.prev);o.sp=[0,0,0,0];bot=r.bottom;}
    out.push("<w:p>"+pPr(o)+x+"</w:p>");ctx.prev=bot;}
  function cellXml(e,w,B,fill,inner){var bd=["Top","Left","Bottom","Right"].map(function(s){return side(B.c,s,e.parentElement);}),cell=[];inner(cell);if(!cell.length)cell.push(spacer(1));
    return '<w:tc><w:tcPr><w:tcW w:w="'+tw(w)+'" w:type="dxa"/>'+((e.colSpan||1)>1?'<w:gridSpan w:val="'+e.colSpan+'"/>':"")+"<w:tcBorders>"+bdr(bd,null,true)+"</w:tcBorders>"+
      (fill?'<w:shd w:val="clear" w:color="auto" w:fill="'+hx(fill)+'"/>':"")+'<w:tcMar><w:top w:w="'+tw(B.pt+B.bt/2)+'" w:type="dxa"/><w:left w:w="'+tw(Math.max(0,B.pl-1.5))+'" w:type="dxa"/><w:bottom w:w="'+tw(B.pb+B.bb/2)+'" w:type="dxa"/><w:right w:w="'+tw(Math.max(0,B.pr-1.5))+'" w:type="dxa"/></w:tcMar>'+
      (B.c.verticalAlign==="middle"?'<w:vAlign w:val="center"/>':B.c.verticalAlign==="bottom"?'<w:vAlign w:val="bottom"/>':"")+"</w:tcPr>"+cell.join("")+"</w:tc>";}
  function tblPr(w,ind){return '<w:tblPr><w:tblW w:w="'+tw(w)+'" w:type="dxa"/><w:tblInd w:w="'+Math.round(ind*15)+'" w:type="dxa"/><w:tblLayout w:type="fixed"/><w:tblCellMar><w:top w:w="0" w:type="dxa"/><w:left w:w="0" w:type="dxa"/><w:bottom w:w="0" w:type="dxa"/><w:right w:w="0" w:type="dxa"/></w:tblCellMar></w:tblPr>';}
  /* a box with a fill, or with a rule and room inside it (a quotation): a table of one cell, its padding the cell's margins */
  function shell(e,ctx,out){var B=box(e),r=B.r;gapBefore(r,ctx,out);var fill=over(col(B.c.backgroundColor),bgOf(e.parentElement));
    out.push("<w:tbl>"+tblPr(r.width,r.left-ctx.l)+'<w:tblGrid><w:gridCol w:w="'+tw(r.width)+'"/></w:tblGrid><w:tr>'+
      cellXml(e,r.width,B,fill,function(cell){var sub={l:r.left+B.bl+B.pl,r:r.right-B.br-B.pr,prev:r.top+B.bt+B.pt};if(isPara(e))para(e,sub,cell,1);else flow(e,sub,cell);})+"</w:tr></w:tbl>");
    ctx.prev=r.bottom;}
  function table(t,ctx,out){var r=t.getBoundingClientRect(),rows=[].slice.call(t.rows);if(!rows.length)return;gapBefore(r,ctx,out);
    var grid=[],x0=null;[].forEach.call(rows[0].cells,function(c){var cr=c.getBoundingClientRect(),n=c.colSpan||1;if(x0==null)x0=cr.left;for(var i=0;i<n;i++)grid.push(cr.width/n);});
    var tot=grid.reduce(function(a,v){return a+v;},0),xml="<w:tbl>"+tblPr(tot,(x0==null?r.left:x0)-ctx.l)+"<w:tblGrid>"+grid.map(function(v){return '<w:gridCol w:w="'+tw(v)+'"/>';}).join("")+"</w:tblGrid>";
    rows.forEach(function(row){xml+="<w:tr><w:trPr><w:cantSplit/></w:trPr>";[].forEach.call(row.cells,function(c){var B=box(c),cr=B.r,fill=over(col(B.c.backgroundColor),bgOf(c.parentElement));
      xml+=cellXml(c,cr.width,B,fill,function(cell){var sub={l:cr.left+B.bl+B.pl,r:cr.right-B.br-B.pr,prev:cr.top+B.bt+B.pt};if(isPara(c))para(c,sub,cell,1);else flow(c,sub,cell);});});xml+="</w:tr>";});
    out.push(xml+"</w:tbl>");ctx.prev=r.bottom;}
  function flow(el,ctx,out){[].forEach.call(el.children,function(c){if(hidden(c)||abs(c))return;one(c,ctx,out);});}
  function one(c,ctx,out){var k=cs(c);
    if(c.tagName==="TABLE"||k.display==="table"){table(c,ctx,out);return;}
    if(!block(c))return;
    var only=c.children.length===1&&c.firstElementChild.tagName==="TABLE"&&!/\S/.test(c.textContent.replace(c.firstElementChild.textContent,""));
    if(only&&!col(k.backgroundColor)){table(c.firstElementChild,ctx,out);return;}
    var B=box(c),ruled=(B.bt||B.br||B.bb||B.bl)&&(B.pt||B.pr||B.pb||B.pl);
    if(col(k.backgroundColor)||ruled){shell(c,ctx,out);return;}
    if(isPara(c))para(c,ctx,out);else flow(c,ctx,out);}
  var ctx={l:F.x,r:F.x+F.w,prev:F.y};flow(root,ctx,body);if(!body.length||/<\/w:tbl>$/.test(body[body.length-1]))body.push(spacer(1));
  /* the page as the PDF's: A4, its margins those of the PDF, the page's own colour, its number at the foot when there is more than one */
  var R="http://schemas.openxmlformats.org/",NS='xmlns:w="'+R+'wordprocessingml/2006/main" xmlns:r="'+R+'officeDocument/2006/relationships" xmlns:wp="'+R+'drawingml/2006/wordprocessingDrawing"';
  var mr=G.pw-G.ml-F.w*PX,rootFont=fontOf(F.cs,"a"),rsz=Math.round(pf(F.cs.fontSize)*1.5),foot="";
  if(G.pages>1&&G.foot){var fid=rel("footer","footer1.xml"),fp=G.foot,fsz=Math.round(fp.size*1.5),rp='<w:rPr><w:rFonts w:ascii="'+wx(fp.word)+'" w:hAnsi="'+wx(fp.word)+'"/><w:color w:val="'+hx(fp.c)+'"/><w:sz w:val="'+fsz+'"/></w:rPr>';
    foot='<w:footerReference w:type="default" r:id="'+fid+'"/>';
    media.push({name:"word/footer1.xml",ct:"application/vnd.openxmlformats-officedocument.wordprocessingml.footer+xml",data:'<?xml version="1.0" encoding="UTF-8" standalone="yes"?><w:ftr '+NS+'><w:p><w:pPr><w:spacing w:before="0" w:after="0" w:line="'+tw(fp.lh)+'" w:lineRule="exact"/><w:jc w:val="center"/></w:pPr>'+
      "<w:r>"+rp+'<w:fldChar w:fldCharType="begin"/></w:r><w:r>'+rp+'<w:instrText xml:space="preserve"> PAGE </w:instrText></w:r><w:r>'+rp+'<w:fldChar w:fldCharType="separate"/></w:r><w:r>'+rp+"<w:t>1</w:t></w:r><w:r>"+rp+'<w:fldChar w:fldCharType="end"/></w:r></w:p></w:ftr>'});}
  var fonts="",fr=[],ek=Object.keys(EMB);
  if(ek.length){fonts='<?xml version="1.0" encoding="UTF-8" standalone="yes"?><w:fonts '+NS+'>'+ek.map(function(n){var e=EMB[n];return '<w:font w:name="'+wx(n)+'"><w:charset w:val="00"/><w:family w:val="roman"/><w:pitch w:val="variable"/>'+
      ["Regular","Bold","Italic","BoldItalic"].filter(function(sl){return e[sl];}).map(function(sl){var g=guid(),i=fr.length+1;fr.push('<Relationship Id="rIdF'+i+'" Type="'+R+'officeDocument/2006/relationships/font" Target="fonts/font'+i+'.odttf"/>');
        media.push({name:"word/fonts/font"+i+".odttf",data:odttf(e[sl],g)});return '<w:embed'+sl+' r:id="rIdF'+i+'" w:fontKey="'+g+'"/>';}).join("")+"</w:font>";}).join("")+"</w:fonts>";
    rel("fontTable","fontTable.xml");media.push({name:"word/fontTable.xml",data:fonts,ct:"application/vnd.openxmlformats-officedocument.wordprocessingml.fontTable+xml"});
    media.push({name:"word/_rels/fontTable.xml.rels",data:'<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="'+R+'package/2006/relationships">'+fr.join("")+"</Relationships>"});}
  /* a frame the paper draws inside its edge: a page border, as far from the type */
  var pgb="";if(G.frame){var fm=G.frame,bsz=Math.max(2,Math.min(96,Math.round(fm.lw*8))),fc=hx(fm.c),sp=[G.mt-fm.y,G.ml-fm.x,fm.y+fm.h-(G.ph-G.mb),fm.x+fm.w-(G.ml+F.w*PX)].map(function(v){return Math.max(0,Math.min(31,Math.round(v)));});
    pgb='<w:pgBorders w:offsetFrom="text">'+["top","left","bottom","right"].map(function(sd,i){return '<w:'+sd+' w:val="single" w:sz="'+bsz+'" w:space="'+sp[i]+'" w:color="'+fc+'"/>';}).join("")+"</w:pgBorders>";}
  var bgx=pageBg.join(",")!=="1,1,1"?'<w:background w:color="'+hx(pageBg)+'"/>':"";
  var docx='<?xml version="1.0" encoding="UTF-8" standalone="yes"?><w:document '+NS+'>'+bgx+'<w:body>'+body.join("")+'<w:sectPr>'+foot+'<w:pgSz w:w="'+Math.round(G.pw*20)+'" w:h="'+Math.round(G.ph*20)+'"/><w:pgMar w:top="'+Math.round(G.mt*20)+'" w:right="'+Math.max(0,Math.round(mr*20))+'" w:bottom="'+Math.round(G.mb*20)+'" w:left="'+Math.round(G.ml*20)+'" w:header="720" w:footer="'+(G.foot?Math.round(G.foot.bottom*PX*20):720)+'" w:gutter="0"/>'+pgb+'</w:sectPr></w:body></w:document>';
  var styles='<?xml version="1.0" encoding="UTF-8" standalone="yes"?><w:styles '+NS+'><w:docDefaults><w:rPrDefault><w:rPr><w:rFonts w:ascii="'+wx(rootFont)+'" w:hAnsi="'+wx(rootFont)+'" w:cs="'+wx(rootFont)+'" w:eastAsia="'+wx(rootFont)+'"/><w:color w:val="'+hx(over(col(F.cs.color),pageBg))+'"/><w:sz w:val="'+rsz+'"/><w:szCs w:val="'+rsz+'"/><w:lang w:val="en-GB"/></w:rPr></w:rPrDefault><w:pPrDefault><w:pPr><w:spacing w:before="0" w:after="0"/></w:pPr></w:pPrDefault></w:docDefaults>'+
    '<w:style w:type="paragraph" w:default="1" w:styleId="Normal"><w:name w:val="Normal"/><w:qFormat/></w:style>'+
    Object.keys(heads).map(function(n){return '<w:style w:type="paragraph" w:styleId="Heading'+n+'"><w:name w:val="heading '+n+'"/><w:basedOn w:val="Normal"/><w:next w:val="Normal"/><w:qFormat/><w:pPr><w:keepNext/><w:outlineLvl w:val="'+(n-1)+'"/></w:pPr></w:style>';}).join("")+"</w:styles>";
  var ct='<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Types xmlns="'+R+'package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Default Extension="png" ContentType="image/png"/><Default Extension="odttf" ContentType="application/vnd.openxmlformats-officedocument.obfuscatedFont"/>'+
    '<Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/><Override PartName="/word/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.styles+xml"/><Override PartName="/word/settings.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.settings+xml"/><Override PartName="/docProps/core.xml" ContentType="application/vnd.openxmlformats-package.core-properties+xml"/>'+
    media.filter(function(m){return m.ct;}).map(function(m){return '<Override PartName="/'+m.name+'" ContentType="'+m.ct+'"/>';}).join("")+"</Types>";
  var files=[{name:"[Content_Types].xml",data:ct},
    {name:"_rels/.rels",data:'<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="'+R+'package/2006/relationships"><Relationship Id="rId1" Type="'+R+'officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/><Relationship Id="rId2" Type="'+R+'package/2006/relationships/metadata/core-properties" Target="docProps/core.xml"/></Relationships>'},
    {name:"word/_rels/document.xml.rels",data:'<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="'+R+'package/2006/relationships"><Relationship Id="rId1" Type="'+R+'officeDocument/2006/relationships/styles" Target="styles.xml"/><Relationship Id="rId2" Type="'+R+'officeDocument/2006/relationships/settings" Target="settings.xml"/>'+rels.join("")+"</Relationships>"},
    {name:"word/document.xml",data:docx},{name:"word/styles.xml",data:styles},
    {name:"word/settings.xml",data:'<?xml version="1.0" encoding="UTF-8" standalone="yes"?><w:settings '+NS+'>'+(bgx?"<w:displayBackgroundShape/>":"")+(ek.length?"<w:embedTrueTypeFonts/>":"")+'<w:defaultTabStop w:val="720"/><w:compat><w:compatSetting w:name="compatibilityMode" w:uri="http://schemas.microsoft.com/office/word" w:val="15"/></w:compat></w:settings>'},
    {name:"docProps/core.xml",data:'<?xml version="1.0" encoding="UTF-8" standalone="yes"?><cp:coreProperties xmlns:cp="'+R+'package/2006/metadata/core-properties" xmlns:dc="http://purl.org/dc/elements/1.1/"><dc:title>'+wx(G.title||"")+"</dc:title></cp:coreProperties>"}]
    .concat(media.map(function(m){return {name:m.name,data:m.data};}));
  return makeZip(files);}

/* ---------- a document laid out where no one sees it ---------- */
function laid(html,width){return new Promise(function(res,rej){
  var f=D.createElement("iframe");f.setAttribute("aria-hidden","true");f.tabIndex=-1;f.title="";
  f.style.cssText="position:fixed;left:-30000px;top:0;width:"+Math.ceil(width)+"px;height:1400px;border:0;opacity:0;pointer-events:none;color-scheme:light";
  var t=setTimeout(function(){f.remove();rej(new Error("the document took too long to lay out"));},90000);
  f.onload=function(){var d=f.contentDocument,fl=d&&d.fonts;if(!d||d.URL!=="about:srcdoc")return;
    Promise.resolve(fl?Promise.all(Array.from(fl).map(function(x){return x.load().catch(function(){});})).then(function(){return fl.ready;}):0)
    .then(function(){return Promise.all([].map.call(d.images,function(im){return im.complete?0:new Promise(function(r){im.onload=im.onerror=r;});}));})
    .then(function(){requestAnimationFrame(function(){requestAnimationFrame(function(){clearTimeout(t);res(f);});});},function(e){clearTimeout(t);f.remove();rej(e);});};
  f.srcdoc=html;D.body.appendChild(f);});}
function footFor(doc,fam){var f=pick(FAM[String(fam).toLowerCase()]||FAM.gelasio,400,false),cs={fontStyle:"normal",fontWeight:"400",fontSize:FOOT.size+"px",fontFamily:'"'+f.family+'"'},b=probe(doc,cs,FOOT.lh);
  var h=FOOT.color.replace("#","");return {face:f,size:FOOT.size,lh:FOOT.lh,bottom:FOOT.bottom,base:b.box,c:[0,2,4].map(function(i){return parseInt(h.substr(i,2),16)/255;}),word:f.word||f.family};}
/* a fine frame inside a paper (its ::before, set in from its edge): on every page, as far from the type as on the paper */
function beforeFrame(d,root,G){var W=d.defaultView,ps=W.getComputedStyle(root,"::before"),c=col(ps.borderTopColor),w=pf(ps.borderTopWidth);
  if(!ps.content||ps.content==="none"||!c||!(w>0)||ps.position!=="absolute")return null;
  var F=frameOf(d,root),r=root.getBoundingClientRect(),pl=F.x-r.left-pf(ps.left),pr=r.right-(F.x+F.w)-pf(ps.right),pt=F.y-r.top-pf(ps.top),pb=r.bottom-(F.y+F.h)-pf(ps.bottom);
  return {x:G.ml-(pl-w/2)*PX,y:G.mt-(pt-w/2)*PX,w:(F.w+pl+pr-w)*PX,h:(G.ph-G.mt-G.mb)+(pt+pb-w)*PX,c:over(c,over(col(F.cs.backgroundColor),[1,1,1])||[1,1,1]),lw:w*PX};}
/* the one road to a file: the HTML, the element that is the document, its page; then the PDF or the Word file */
function make(kind,html,o){return fontsReady().then(function(){return laid(html,o.width);}).then(function(f){var d=f.contentDocument,out;
  try{var root=d.querySelector(o.root);if(!root)throw new Error("the document could not be found");if(o.prepare)o.prepare(d,root);
    var Fm=frameOf(d,root),area=(PH-o.mt-o.mb)/PX,R=rangesOf(breaksOf(atomsOf(d,root,o.atoms||""),area),Fm.h),ml=o.ml!=null?o.ml:(PW-Fm.w*PX)/2;
    var G={pw:PW,ph:PH,ml:ml,mt:o.mt,mb:o.mb,ranges:R,pages:R.length,title:o.title,foot:footFor(d,o.footFamily||"Gelasio")};
    if(o.frame)G.frame=o.frame(d,root,G);
    if(kind==="pdf"){var M=read(d,root,o);G.bg=M.bg;out=pdfOf(M,G).then(function(b){return {bytes:b,pages:R.length};});}
    else out={bytes:docxOf(d,root,G),pages:R.length};}
  finally{f.remove();}
  return out;});}

/* ---------- a document from a chat: its page ---------- */
function body(md){var out=[],list=null;
  function inl(t){return lxInline(t,esc);}
  function flushL(){if(!list)return;var n=list.start||1;
    out.push("<"+list.t+(list.t==="ol"&&n>1?' start="'+n+'"':"")+">"+list.items.map(function(x,i){
      return '<li><span class="mk" aria-hidden="true">'+(list.t==="ol"?(x.n||n+i)+".":"\u2022")+"</span>"+inl(x.t)+"</li>";}).join("")+"</"+list.t+">");list=null;}
  lxBlocks(md).forEach(function(b){
    if(b.k==="ul"||b.k==="ol"){var key=b.k+(b.list||"");if(!list||list.key!==key){flushL();list={t:b.k,key:key,items:[],start:b.start};}list.items.push({t:b.t,n:b.n});return;}
    flushL();
    if(b.k==="p")out.push("<p>"+inl(b.t)+"</p>");
    else if(b.k==="h"){var lv=Math.min(4,b.lv+1);out.push("<h"+lv+">"+inl(b.t)+"</h"+lv+">");}
    else if(b.k==="hr")out.push("<hr>");
    else if(b.k==="quote")out.push("<blockquote>"+inl(b.t)+"</blockquote>");
    else if(b.k==="code")out.push("<pre><code>"+esc(b.lines.join("\n"))+"</code></pre>");
    else if(b.k==="table")out.push("<table>"+b.rows.map(function(r,i){return "<tr>"+r.map(function(c){return (i?"<td>":"<th>")+inl(c)+(i?"</td>":"</th>");}).join("")+"</tr>";}).join("")+"</table>");});
  flushL();return out.join("\n");}
var CSS=[
 'html{background:#efedf2}body{margin:0;padding:24px 0 40px}',
 '#wrap{position:relative}#sheet{position:relative;width:'+PGW+'px;margin:0 auto;transform-origin:0 0}',
 '.page{box-sizing:border-box;width:'+PGW+'px;padding:'+PADY+'px '+PADX+'px;background:#fff}',
 '#flow{position:absolute;left:0;top:0;opacity:0;pointer-events:none}',
 '.card{position:relative;box-sizing:border-box;width:'+PGW+'px;height:'+PGH+'px;padding:'+PADY+'px '+PADX+'px;margin:0 0 24px;background:#fff;box-shadow:0 1px 2px rgba(0,0,0,.08),0 8px 28px rgba(0,0,0,.10);border-radius:2px}',
 '.card .clip{position:relative;margin-top:-1px;clip-path:inset(0 -400px)}.doc.copy{position:relative}',
 '.card .pf{position:absolute;left:0;right:0;bottom:'+FOOT.bottom+'px;height:'+FOOT.lh+'px;font:'+FOOT.size+'px/'+FOOT.lh+'px "Gelasio";color:'+FOOT.color+';text-align:center}',
 '.doc{display:flow-root;width:'+CW+'px;font-family:'+SERIF+';font-size:16px;line-height:26px;color:#1d1d1f;text-align:left;overflow-wrap:break-word;',
 'font-kerning:none;font-variant-ligatures:none;font-feature-settings:"kern" 0,"liga" 0,"clig" 0,"calt" 0;font-synthesis:none;-webkit-font-smoothing:antialiased}',
 '.doc *{font-kerning:none;font-variant-ligatures:none;font-synthesis:none}',
 '.doc h2,.doc h3,.doc h4{font-weight:700;margin:0}',
 '.doc h2{font-size:28px;line-height:36px;margin:0 0 18px}',
 '.doc h3{font-size:20px;line-height:28px;margin:26px 0 8px;color:#1b3a5c}',
 '.doc h4{font-size:18px;line-height:26px;margin:20px 0 6px}',
 '.doc p{margin:0 0 12px}',
 '.doc ul,.doc ol{margin:0 0 12px;padding:0 0 0 24px}.doc li{position:relative;margin:4px 0;list-style:none}',
 '.doc .mk{position:absolute;left:-24px;width:18px;text-align:right}',
 '.doc blockquote{margin:12px 0;padding:0 0 0 16px;border-left:3px solid #d8d2c6;color:#4a4358;font-style:italic}',
 '.doc pre{margin:0 0 12px;padding:8px 12px;background:#f6f4f0;font:13.333px/20px '+MONO+';white-space:pre-wrap;overflow-wrap:anywhere}',
 '.doc code{font-family:'+MONO+';font-size:14.667px}.doc pre code{font-size:inherit}',
 '.doc table{border-collapse:collapse;margin:10px 0 16px;font-size:14px;line-height:20px}',
 '.doc th,.doc td{border:1px solid #c9c4ba;padding:5px 9px;text-align:left;vertical-align:top}.doc th{background:#f1ede6;font-weight:700}',
 '.doc hr{border:0;border-top:1px solid #d8d2c6;margin:20px 0;height:0}',
 '.doc a{color:#1b3a5c;text-decoration:underline}.doc b,.doc strong{font-weight:700}.doc i,.doc em{font-style:italic}',
 'html.measure,html.measure body{background:#fff}html.measure body{padding:0}html.measure #flow{position:static;opacity:1}html.measure #sheet{margin:0}',
 '@media (prefers-color-scheme:dark){html:not(.measure){background:#17141d}}',
 '@page{size:A4;margin:0}',
 '@media print{html,body{background:#fff !important;padding:0 !important;margin:0}#sheet{transform:none !important;margin:0 !important}#wrap{height:auto !important}#flow{visibility:hidden}.card{margin:0;box-shadow:none;border-radius:0;break-after:page}}'].join("\n");
/* the page cuts itself into its pages where the PDF will (the same reading, above), and makes them smaller whole on a narrow panel */
function pageScript(){return "<script>("+function(AREA,PGW,atomsOf,breaksOf,rangesOf){var d=document.documentElement,doc=document.getElementById("doc");
  window.__ingPages=function(){return rangesOf(breaksOf(atomsOf(document,doc,""),AREA),doc.getBoundingClientRect().height);};
  if(d.classList.contains("measure"))return;
  var pages=document.getElementById("pages"),sh=document.getElementById("sheet"),wrap=document.getElementById("wrap"),last="";
  function build(){var R=window.__ingPages(),key=JSON.stringify(R);if(key===last)return fit();last=key;pages.textContent="";
    R.forEach(function(r,i){var c=document.createElement("div");c.className="card";c.setAttribute("aria-hidden","true");
      var clip=document.createElement("div");clip.className="clip";clip.style.height=(r[1]-r[0]+2)+"px";
      var cp=doc.cloneNode(true);cp.removeAttribute("id");cp.className="doc copy";cp.style.top=(1-r[0])+"px";clip.appendChild(cp);c.appendChild(clip);
      if(R.length>1){var f=document.createElement("div");f.className="pf";f.textContent=String(i+1);c.appendChild(f);}
      pages.appendChild(c);});fit();}
  function fit(){var cw=d.clientWidth,s=Math.min(1,(cw-24)/PGW);
    sh.style.transform=s<1?"scale("+s+")":"";sh.style.margin=s<1?"0 0 0 "+Math.max(12,(cw-PGW*s)/2)+"px":"";wrap.style.height=s<1?Math.ceil(pages.offsetHeight*s)+"px":"";}
  build();addEventListener("resize",fit);addEventListener("load",build);if(document.fonts&&document.fonts.ready)document.fonts.ready.then(build);
}+")("+AREA+","+PGW+","+atomsOf+","+breaksOf+","+rangesOf+");<\/script>";}
function page(title,md,measure){var b=body(md),plain=b.replace(/<[^>]+>/g," ").replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&quot;/g,'"').replace(/&amp;/g,"&");
  var need=facesFor(plain+"\u2022",["Gelasio"].concat(/<code>/.test(b)?["Liberation Mono"]:[]),["Liberation Serif","Doc Symbols"]);
  return '<!doctype html>\n<html lang="en"'+(measure?' class="measure"':"")+'><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="color-scheme" content="light"><title>'+esc(title)+'</title><style>'+
  faceCss(need)+"\n"+CSS+'</style></head><body><div id="wrap"><div id="sheet"><div class="page" id="flow"><div class="doc" id="doc">'+b+'</div></div><div id="pages"></div></div></div>'+pageScript()+'</body></html>';}
var CHAT={root:"#doc",width:PGW+40,ml:ML,mt:MT,mb:MB,footFamily:"Gelasio"};
function chatPdf(title,md){return fontsReady().then(function(){return make("pdf",page(title,md,true),Object.assign({title:title},CHAT));});}
function chatDocx(title,md){return fontsReady().then(function(){return make("docx",page(title,md,true),Object.assign({title:title},CHAT));});}

/* ---------- where the chat's documents go ---------- */
window.IngDoc={ready:fontsReady,faceCss:faceCss,facesFor:facesFor,make:make,beforeFrame:beforeFrame,laid:laid,read:read,materialise:materialise,atomsOf:atomsOf,breaksOf:breaksOf,rangesOf:rangesOf,
  page:page,pdf:chatPdf,docx:chatDocx,PW:PW,PH:PH,MT:MT,MB:MB,PX:PX};
Object.defineProperty(window.IngDoc,"faces",{enumerable:true,get:function(){load();return FACES;}});
(function soon(n){if(window.__ingReady===true){setTimeout(function(){fontsReady().catch(function(){});},2500);return;}if(n<240)setTimeout(function(){soon(n+1);},500);})(0);
window.mkDocPage=function(title,md){return page(title,md,false);};
window.mkSavePdf=function(doc){var name=mkDocFileName(doc.title)+".pdf";ingToast("Making the PDF, as the page shows it…");
  return chatPdf(doc.title,doc.md).then(function(r){return saveFileNative(name,"application/pdf",r.bytes);},function(e){ingToast("The PDF could not be made: "+(e&&e.message||e));});};
window.lxSaveWord=function(title,md){return chatDocx(title,md).then(function(r){return saveFileNative(lxFileName(title)+".docx","application/vnd.openxmlformats-officedocument.wordprocessingml.document",r.bytes);},
  function(e){ingToast("The Word file could not be made: "+(e&&e.message||e));});};
})();
;try{window.__ingParts["p104"]="running";}catch(_){}
</script>
