<style id="r239-css">
/* ============ R239 · EVERY APP'S OWN LOGO, IN 3D (Ingenium 6.41, 6 November 2026) ============
   Her words (6 November 2026): "I want Fabrica to automatically load the apps' icons and logos with the same animated popped out 3D look
   and effects. I want that for any app that is made inside of Ingenium and its pages, especially Fabrica and Lector. When the app clearly
   has a logo icon, it should replace Ingenium's placeholder empty slot and show the app's actual 3D logo animated and active and swaying
   back and forth the same way that it does for Carpe Diem, The Forge, Ingenium, Inkwell and the Offline Project's app icons."
   window.IngAppIcon finds an app's logo in its own files and draws it as the four seals are drawn: in layers at depth (its edge behind it,
   the logo, a sheen in front), with a cast shadow, swaying, turning toward the pointer, lifting and sinking when pressed.
   - Where the logo is looked for, in this order: the icons its page names (<link rel="icon">, apple-touch-icon, the largest first), the
     icons of the manifest its page names, a Windows tile image, then files named as icons are named (icon, logo, apple-touch-icon,
     favicon, in an icons folder). A logo written into the page (a data address) and a file of the app's own are read; nothing is ever
     fetched from the internet. "Clearly has a logo": a picture that loads, square or nearly (a banner is not a logo), and an SVG or at
     least 64 pixels across; a page that names none keeps Ingenium's placeholder.
   - Its layers are drawn once on a canvas: a logo on its own square (opaque corners) becomes a tile with rounded corners; a logo with
     a clear background keeps its own shape; the edge is the same shape, darkened, behind it; the sheen is the same shape, lit from above.
   - Minimal motion and the system's reduced motion keep it still, as every seal is kept. */
.ia-l{position:absolute;inset:0;width:100%;height:100%;display:block;max-width:none;pointer-events:none;backface-visibility:hidden;-webkit-user-drag:none;user-select:none}
/* Fabrica's seals and logos stand still with minimal motion too, as Lector's seals and the crests do (they stopped only for the
   system's reduced motion until 6.41) */
body[data-motion="minimal"] #fb .f-ls-idle,body[data-motion="minimal"] #fb .f-ls.flat img,body[data-motion="minimal"] #fb .f-ls.new span{animation:none !important}
body[data-motion="minimal"] #fb .f-ls-tilt{transition:none !important}
</style>
<script>try{(window.__ingParts=window.__ingParts||{})["p239"]="started";}catch(_){}
(function r239(){
"use strict";
if(window.IngAppIcon)return;
var W=window,D=document;
var MIME={png:"image/png",jpg:"image/jpeg",jpeg:"image/jpeg",webp:"image/webp",svg:"image/svg+xml",gif:"image/gif"};
function ext(p){var m=/\.([a-z0-9]+)(?:[?#].*)?$/i.exec(String(p||""));return m?m[1].toLowerCase():"";}
function dirOf(p){p=String(p||"");var i=p.lastIndexOf("/");return i<0?"":p.slice(0,i+1);}
function join(base,rel){rel=String(rel||"").replace(/[?#].*$/,"");if(rel.charAt(0)==="/"){rel=rel.slice(1);base="";}
  var out=[];(String(base||"")+rel).split("/").forEach(function(x){if(!x||x===".")return;if(x==="..")out.pop();else out.push(x);});
  var s=out.join("/");try{return decodeURIComponent(s);}catch(e){return s;}}
function attr(tag,name){var m=new RegExp("\\b"+name+"\\s*=\\s*(\"([^\"]*)\"|'([^']*)'|([^\\s>]+))","i").exec(tag);return m?(m[2]!=null?m[2]:m[3]!=null?m[3]:m[4]):null;}
function sizeOf(s){s=String(s||"");if(/any/i.test(s))return 1024;var best=0,re=/(\d+)\s*x\s*(\d+)/gi,m;while((m=re.exec(s)))best=Math.max(best,Math.min(+m[1],+m[2]));return best;}

/* ---------- what the page names ---------- */
function named(html){var head=String(html||"").slice(0,3000000),list=[],man=null,re=/<link\b[^>]*>/gi,m;
  while((m=re.exec(head))){var t=m[0],rel=(attr(t,"rel")||"").toLowerCase(),href=attr(t,"href");if(!href)continue;
    if(/(^|\s)manifest(\s|$)/.test(rel)){if(!man)man=href;continue;}
    if(/mask-icon/.test(rel)||!/(^|\s)(icon|apple-touch-icon|apple-touch-icon-precomposed)(\s|$)/.test(rel))continue;
    var n=sizeOf(attr(t,"sizes"));if(!n&&/apple-touch-icon/.test(rel))n=180;
    list.push({href:href,n:n,svg:/svg/i.test(attr(t,"type")||"")||/^data:image\/svg/i.test(href)||ext(href)==="svg",dark:/dark/i.test(attr(t,"media")||"")});}
  var mt=/<meta\b[^>]*name\s*=\s*["']msapplication-TileImage["'][^>]*>/i.exec(head);if(mt){var c=attr(mt[0],"content");if(c)list.push({href:c,n:144});}
  return {list:list,manifest:man};}
/* files named as icons are named, when the page names none that loads */
var FILE_RE=/(^|\/)(apple-touch-icon|app-icon|appicon|icon|logo|favicon)([-_.]?(\d+)(x\d+)?)?\.(png|svg|webp|jpe?g)$/i,DIR_RE=/(^|\/)(icons?|logos?)\/[^\/]+\.(png|svg|webp)$/i;
function fileGuesses(paths){var out=[];(paths||[]).forEach(function(p){var m=FILE_RE.exec(p);if(m||DIR_RE.test(p)){var n=m&&m[4]?+m[4]:(/512/.test(p)?512:/256/.test(p)?256:/192/.test(p)?192:0);
    out.push({href:"/"+p,n:n||(ext(p)==="svg"?1024:96),svg:ext(p)==="svg"});}});return out;}

/* ---------- reading one: a data address as it is; a file of the app's own as a picture address; never the network ---------- */
var URLS=[];
function srcOf(href,base,read){href=String(href||"").trim();
  if(/^data:image\/(png|jpeg|webp|gif|svg\+xml)[;,]/i.test(href))return Promise.resolve(href);
  if(!read||/^(https?:)?\/\//i.test(href)||/^[a-z][a-z0-9+.-]*:/i.test(href))return Promise.resolve(null);
  var path=join(base,href),mime=MIME[ext(path)];if(!mime)return Promise.resolve(null);
  return Promise.resolve().then(function(){return read(path);}).then(function(u8){if(!u8||!u8.length)return null;
    var u=URL.createObjectURL(new Blob([u8],{type:mime}));URLS.push(u);return u;},function(){return null;});}
function load(src){return new Promise(function(res){var im=new Image();im.decoding="async";im.onload=function(){res(im);};im.onerror=function(){res(null);};im.src=src;});}
/* a clear logo: it loads, it is square or nearly, and it is drawn to scale (an SVG) or at least 64 pixels across */
function clear(im,svg){if(!im)return false;var w=im.naturalWidth||0,h=im.naturalHeight||0;if(svg&&(!w||!h))return true;if(!w||!h)return false;
  var r=w/h;if(r<0.6||r>1.67)return false;return svg||Math.min(w,h)>=64;}

/* ---------- the layers, drawn once ---------- */
function rr(x,s,r){x.beginPath();x.moveTo(r,0);x.lineTo(s-r,0);x.quadraticCurveTo(s,0,s,r);x.lineTo(s,s-r);x.quadraticCurveTo(s,s,s-r,s);x.lineTo(r,s);x.quadraticCurveTo(0,s,0,s-r);x.lineTo(0,r);x.quadraticCurveTo(0,0,r,0);x.closePath();}
function layersOf(im,src){var N=256,c=D.createElement("canvas");c.width=N;c.height=N;var x=c.getContext("2d");
  var w=im.naturalWidth||N,h=im.naturalHeight||N,s=Math.min(N/w,N/h),dw=w*s,dh=h*s,dx=(N-dw)/2,dy=(N-dh)/2;
  try{x.drawImage(im,dx,dy,dw,dh);var d=x.getImageData(0,0,N,N).data;var a=function(px,py){return d[(py*N+px)*4+3];};
    var tile=[a(3,3),a(N-4,3),a(3,N-4),a(N-4,N-4)].every(function(v){return v>200;})&&dw>N*.9&&dh>N*.9;
    var face=D.createElement("canvas");face.width=N;face.height=N;var f=face.getContext("2d");
    if(tile){rr(f,N,N*.22);f.clip();}f.drawImage(im,dx,dy,dw,dh);
    var side=D.createElement("canvas");side.width=N;side.height=N;var sd=side.getContext("2d");sd.drawImage(face,0,0);sd.globalCompositeOperation="source-atop";sd.fillStyle="rgba(24,12,36,.6)";sd.fillRect(0,0,N,N);
    var gl=D.createElement("canvas");gl.width=N;gl.height=N;var g=gl.getContext("2d");g.drawImage(face,0,0);g.globalCompositeOperation="source-in";
    var gr=g.createLinearGradient(0,0,N*.45,N);gr.addColorStop(0,"rgba(255,255,255,.55)");gr.addColorStop(.38,"rgba(255,255,255,.12)");gr.addColorStop(.6,"rgba(255,255,255,0)");g.fillStyle=gr;g.fillRect(0,0,N,N);
    return {tile:tile,layers:[{src:side.toDataURL("image/png"),z:-.03,side:true},{src:face.toDataURL("image/png"),z:0},{src:gl.toDataURL("image/png"),z:.035}]};}
  catch(e){return {tile:false,layers:[{src:src,z:0}]};}}

/* ---------- finding it: the page's own names, its manifest's, then the files named as icons ---------- */
function find(o){o=o||{};var html=o.html||"",base=o.base||"",read=o.read||null,N=named(html),cands=N.list.slice();
  var man=N.manifest&&read&&!/^(https?:)?\/\//i.test(N.manifest)?join(base,N.manifest):null;
  var step=man?Promise.resolve().then(function(){return read(man);}).then(function(u8){if(!u8)return;var j=null;try{j=JSON.parse(new TextDecoder().decode(u8));}catch(e){return;}
      (j&&j.icons||[]).forEach(function(ic){if(!ic||!ic.src)return;var pur=String(ic.purpose||"any");if(!/any/.test(pur)&&/maskable|monochrome/.test(pur))return;
        cands.push({href:"/"+join(dirOf(man),ic.src),n:sizeOf(ic.sizes)||(/svg/.test(ic.type||"")?1024:96),svg:/svg/.test(ic.type||"")||ext(ic.src)==="svg"});});},function(){}):Promise.resolve();
  return step.then(function(){if(read&&o.files)cands=cands.concat(fileGuesses(o.files));
    /* the best first: a drawing to scale, then the largest; a night icon after its day one */
    cands.sort(function(a,b){return (b.svg?2048:b.n)-(a.svg?2048:a.n)||(a.dark?1:0)-(b.dark?1:0);});
    var seen={},i=0;
    function next(){while(i<cands.length&&seen[cands[i].href])i++;if(i>=cands.length)return Promise.resolve(null);var c=cands[i++];seen[c.href]=1;
      return srcOf(c.href,base,read).then(function(src){if(!src)return next();return load(src).then(function(im){if(!clear(im,c.svg||/^data:image\/svg/i.test(src)))return next();
        var L=layersOf(im,src);return {src:src,svg:!!c.svg,w:im.naturalWidth||0,h:im.naturalHeight||0,tile:L.tile,layers:L.layers,from:/^data:/i.test(c.href)?"the page":c.href.replace(/^\//,"")};});});}
    return next();});}

/* ---------- an app kept in Fabrica: its main page, its files; kept until it changes ---------- */
var CACHE={},DONE={};
function mainOf(paths,name){var html=paths.filter(function(p){return /\.html?$/i.test(p);});if(!html.length)return null;
  var idx=html.filter(function(p){return /(^|\/)index\.html?$/i.test(p);}).sort(function(a,b){return a.split("/").length-b.split("/").length;})[0];if(idx)return idx;
  var slug=String(name||"").toLowerCase().replace(/[^a-z0-9]+/g,"");var own=html.filter(function(p){return p.split("/").pop().toLowerCase().replace(/[^a-z0-9]+/g,"").indexOf(slug.slice(0,8))===0;})[0];if(slug&&own)return own;
  return html.sort(function(a,b){return a.split("/").length-b.split("/").length||a.length-b.length;})[0];}
function repoKey(r){return r?"r:"+r.id+":"+(r.head||"")+":"+(r.changed||0):"";}
function forRepo(r){if(!r||!W.IngRepo)return Promise.resolve(null);var key=repoKey(r);if(CACHE[key])return CACHE[key];
  CACHE[key]=IngRepo.files(r.id).then(function(fs){var paths=(fs||[]).map(function(f){return f.path;}),main=mainOf(paths,r.name),read=function(p){return IngRepo.read(r.id,p);};
      return (main?IngRepo.readText(r.id,main):Promise.resolve("")).then(function(html){return find({html:html||"",base:dirOf(main||""),read:read,files:paths});});})
    .then(function(ic){DONE[key]=ic||false;return ic;},function(){DONE[key]=false;return null;});
  return CACHE[key];}
/* what is known now, without waiting: the logo, false (looked, none), or undefined (not looked yet) */
function known(r){var k=repoKey(r);return Object.prototype.hasOwnProperty.call(DONE,k)?DONE[k]:undefined;}
/* a single page (a page in the app library, a page made in a chat): what its page names, written into it */
function forPage(html,id){var key="p:"+(id||"")+":"+String(html||"").length;if(CACHE[key])return CACHE[key];
  CACHE[key]=find({html:html}).then(function(ic){DONE[key]=ic||false;return ic;},function(){DONE[key]=false;return null;});return CACHE[key];}

/* 6.42: the layers of a picture already in hand (a seal of an app's initials, modules/r240.js), drawn as a logo's are */
function layersFrom(src){return load(src).then(function(im){return im?layersOf(im,src):null;});}
W.IngAppIcon={find:find,forRepo:forRepo,forPage:forPage,known:known,named:named,mainOf:mainOf,layersFrom:layersFrom};
})();
;try{window.__ingParts["p239"]="running";}catch(_){}
</script>
