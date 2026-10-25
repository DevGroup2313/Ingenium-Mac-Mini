/* safe_html.js · 6.7 (security audit, 25 October 2026). One sanitiser for markup that comes from outside Ingenium's own
   code: a file opened in one of the carried apps, the clipboard, a backup or desk file brought in, a search provider's
   answer. ingSafeMake(win) gives, for that window:
     html(s)     the markup cut down to a safe list of formatting elements and attributes. It is parsed in a document that
                 has no window, so nothing in it loads or runs while it is read;
     text(s)     its words alone, read the same way;
     box(s)      a div in that windowless document, holding html(s), for code that tidies the markup further;
     defuse(s)   the markup with only what can run code taken out (scripts, frames, plug-ins, event attributes,
                 javascript: addresses), returned unchanged, character for character, when it holds none of these;
     install(o)  o.sinks: defuse stands in front of every way the window's own code turns text into markup;
                 o.clipboard: HTML read from the clipboard or a drop is cut down by html();
                 o.links: a javascript: link or window is refused, and a link to another site opens in a new window
                 (noopener, noreferrer) instead of taking this one away.
   The same source runs in Ingenium's own page (build_page.py writes it in place of the 3.12 page's unused sanitizeHtml)
   and, as text, at the head of each carried app's frame (modules/r118.js puts it first in the frame). */
function ingSafeMake(win){"use strict";
var doc=win.document,EP=win.Element.prototype;
var IH=Object.getOwnPropertyDescriptor(EP,"innerHTML")||Object.getOwnPropertyDescriptor(win.HTMLElement.prototype,"innerHTML");
var inert=null;
function inertDoc(){if(!inert)inert=doc.implementation.createHTMLDocument("");return inert;}
function str(v){return v==null?"":String(v);}
/* a template in the windowless document: its contents never load or run */
function parse(s){var t=inertDoc().createElement("template");IH.set.call(t,str(s));return t;}
function set(list){var o={};list.split(" ").forEach(function(k){o[k]=1;});return o;}
var KEEP=set("a abbr acronym address article aside b bdi bdo big blockquote br caption center cite code col colgroup dd del dfn div dl dt em figcaption figure font footer h1 h2 h3 h4 h5 h6 header hgroup hr i img ins kbd li main mark nav ol p pre q rp rt ruby s samp section small span strike strong sub sup table tbody td tfoot th thead time tr tt u ul var wbr");
/* gone with all they hold; any other element not kept is unwrapped (its words stay) */
var DROP=set("script style link meta base title head template noscript xmp iframe frame frameset object embed applet param noembed noframes plaintext listing textarea select option optgroup datalist input button svg math canvas audio video source track picture map area portal fencedframe dialog slot marquee keygen output progress meter");
var ATTR=set("class style title lang dir id contenteditable spellcheck translate role align valign width height bgcolor color face size href name alt src colspan rowspan headers scope abbr nowrap span start type reversed value cite datetime border cellpadding cellspacing summary rules hspace vspace clear noshade");
var WS=/[\u0000-\u0020\u007f-\u00a0\u1680\u180e\u2000-\u200f\u2028\u2029\u205f\u3000\ufeff]+/g;
function scheme(v){var s=str(v).replace(WS,"").toLowerCase(),m=/^([a-z][a-z0-9+.-]*):/.exec(s);return {s:s,sc:m?m[1]:""};}
function okHref(v){var x=scheme(v);if(!x.sc)return true;return x.sc==="http"||x.sc==="https"||x.sc==="mailto"||x.sc==="tel";}
function okSrc(v){var x=scheme(v);if(!x.sc)return !!x.s;if(x.sc==="http"||x.sc==="https"||x.sc==="blob")return true;
  return x.sc==="data"&&/^data:image\/(png|jpe?g|gif|webp|bmp|avif|x-icon|vnd\.microsoft\.icon|svg\+xml)[;,]/.test(x.s);}
/* a style keeps the properties that only change how words look; nothing that loads, positions over the page, or hides */
var STYLE_NO=/^(position|z-index|top|left|right|bottom|inset|inset-.*|behavior|-moz-binding|content|cursor|pointer-events|filter|backdrop-filter|mask|mask-.*|-webkit-mask.*|clip-path|offset.*|anchor-.*|position-.*)$/;
var STYLE_BAD=/url\s*\(|image-set|image\s*\(|element\s*\(|cross-fade|paint\s*\(|expression|javascript|vbscript|@import|\\|attr\s*\(|\/\*|[<>]/i;
function cleanStyle(v){var out=[];str(v).split(";").forEach(function(d){var i=d.indexOf(":");if(i<1)return;var p=d.slice(0,i).trim().toLowerCase(),val=d.slice(i+1).trim();
    if(!/^[a-z][a-z-]*$/.test(p)||STYLE_NO.test(p)||!val||val.length>400||STYLE_BAD.test(val))return;out.push(p+":"+val);});
  return out.join(";");}
function cleanAttrs(e,tag){var at=e.attributes;for(var i=at.length-1;i>=0;i--){var a=at[i],nm=a.name.toLowerCase(),v=a.value,keep=false;
    if(nm.slice(0,2)==="on")keep=false;
    else if(/^data-[a-z0-9_.:-]+$/.test(nm)||/^aria-[a-z]+$/.test(nm))keep=true;
    else if(ATTR[nm]){
      if(nm==="href")keep=okHref(v);
      else if(nm==="src")keep=tag==="img"&&okSrc(v);
      else if(nm==="cite")keep=okHref(v);
      else if(nm==="style"){var cs=cleanStyle(v);if(cs){if(cs!==v)e.setAttribute(a.name,cs);keep=true;}}
      else if(nm==="contenteditable")keep=/^false$/i.test(v);
      else if(nm==="id")keep=/^[A-Za-z_][\w:.-]{0,120}$/.test(v);
      else if(nm==="name")keep=tag==="a"&&/^[\w:.-]{1,120}$/.test(v);
      else if(nm==="type")keep=(tag==="ol"||tag==="ul"||tag==="li")&&/^([1aAiI]|disc|circle|square)$/.test(v);
      else if(nm==="value")keep=tag==="li"&&/^-?\d{1,9}$/.test(v);
      else keep=v.length<=2000;}
    if(!keep)e.removeAttribute(a.name);}}
function strict(root){(function walk(n){var k=n.firstChild;while(k){var nx=k.nextSibling;
    if(k.nodeType===1){var tag=String(k.localName).toLowerCase();
      if(k.namespaceURI!=="http://www.w3.org/1999/xhtml"||DROP[tag])n.removeChild(k);
      else{walk(k);if(KEEP[tag]){cleanAttrs(k,tag);if(tag==="img"&&!k.hasAttribute("src"))n.removeChild(k);}
        else{while(k.firstChild)n.insertBefore(k.firstChild,k);n.removeChild(k);}}}
    else if(k.nodeType!==3)n.removeChild(k);
    k=nx;}})(root);return root;}
function html(s){var t=parse(s);strict(t.content);return IH.get.call(t);}
function text(s){var t=parse(s);return t.content.textContent||"";}
function box(s){var d=inertDoc().createElement("div");IH.set.call(d,html(s));return d;}
/* ---------- what can run code, and nothing else ---------- */
var DEFUSE=set("script iframe frame frameset object embed applet param base meta noscript xmp noembed noframes plaintext listing portal fencedframe");
var URLISH=set("href src action formaction xlink:href data poster background ping codebase cite dynsrc lowsrc to from values by srcset");
var RISKY=/on[a-z]{3,}\s*=|<\s*\/?\s*(script|iframe|frame|object|embed|applet|param|base|meta|noscript|xmp|noembed|noframes|plaintext|listing|portal|fencedframe|animate|set)\b|j\s*a\s*v\s*a\s*s\s*c\s*r\s*i\s*p\s*t|v\s*b\s*s\s*c\s*r\s*i\s*p\s*t|l\s*i\s*v\s*e\s*s\s*c\s*r\s*i\s*p\s*t|data\s*:\s*(text|application)|srcdoc|&#|&colon|&tab|&newline/i;
function badUrl(v,tag,nm){var x=scheme(v);if(x.sc==="javascript"||x.sc==="vbscript"||x.sc==="livescript")return true;
  if(nm==="srcset")return /(^|,)\s*(javascript|vbscript):/.test(x.s);
  return x.sc==="data"&&tag!=="img"&&/^data:(text\/html|application\/(x-)?xhtml|image\/svg\+xml|text\/xml|application\/xml)/.test(x.s);}
function defuseTree(root){var changed=false;
  (function walk(n){var k=n.firstChild;while(k){var nx=k.nextSibling;
    if(k.nodeType===1){var tag=String(k.localName).toLowerCase();
      if(DEFUSE[tag]||(/^(animate|set|animatetransform|animatemotion)$/.test(tag)&&/^(on|href$|xlink:href$)/i.test(k.getAttribute("attributeName")||k.getAttribute("attributename")||""))){n.removeChild(k);changed=true;}
      else{var at=k.attributes;for(var i=at.length-1;i>=0;i--){var a=at[i],nm=a.name.toLowerCase();
          if(nm.slice(0,2)==="on"||nm==="srcdoc"||(URLISH[nm]&&badUrl(a.value,tag,nm))){k.removeAttribute(a.name);changed=true;}}
        if(tag==="template"&&k.content)walk(k.content);walk(k);}}
    k=nx;}})(root);
  return changed;}
function risky(s){return RISKY.test(str(s));}
/* the defused markup as nodes of the live document, or null when there is nothing to take out (then the markup goes in
   exactly as it was written). Nodes, not text read again, so markup cannot change its meaning on a second reading. */
function defusedNodes(s,owner){s=str(s);if(!RISKY.test(s))return null;var t=parse(s);if(!defuseTree(t.content))return null;return (owner||doc).importNode(t.content,true);}
function defuse(s){s=str(s);if(!RISKY.test(s))return s;var t=parse(s);if(!defuseTree(t.content))return s;var out=IH.get.call(t),t2=parse(out);
  return defuseTree(t2.content)?str(text(s)).replace(/[&<>]/g,function(c){return c==="&"?"&amp;":c==="<"?"&lt;":"&gt;";}):out;}
/* ---------- the guards ---------- */
function editableOf(t){if(t&&t.nodeType!==1)t=t.parentElement;return t&&t.isContentEditable?t:null;}
function install(o){o=o||{};var did=win.__ingSafeOn||(win.__ingSafeOn={});
  if(o.sinks&&!did.sinks){did.sinks=1;
    var RAW=set("script style textarea title xmp iframe noembed noframes noscript plaintext");
    Object.defineProperty(EP,"innerHTML",{configurable:true,enumerable:IH.enumerable,get:IH.get,set:function(v){var s=v===null?"":String(v);
      if(!RAW[String(this.localName).toLowerCase()]){var f=defusedNodes(s,this.ownerDocument);if(f){IH.set.call(this,"");(this.localName==="template"&&this.content?this.content:this).appendChild(f);return;}}
      IH.set.call(this,s);}});
    var OH=Object.getOwnPropertyDescriptor(EP,"outerHTML");
    if(OH&&OH.set)Object.defineProperty(EP,"outerHTML",{configurable:true,enumerable:OH.enumerable,get:OH.get,set:function(v){var s=v===null?"":String(v),f=this.parentNode?defusedNodes(s,this.ownerDocument):null;if(f){this.replaceWith(f);return;}OH.set.call(this,s);}});
    var IAH=EP.insertAdjacentHTML;
    EP.insertAdjacentHTML=function(pos,v){var s=str(v),f=defusedNodes(s,this.ownerDocument);if(!f)return IAH.call(this,pos,s);var p=String(pos).toLowerCase();
      if(p==="beforebegin")this.before(f);else if(p==="afterbegin")this.prepend(f);else if(p==="beforeend")this.append(f);else if(p==="afterend")this.after(f);else return IAH.call(this,pos,"");};
    var RP=win.Range&&win.Range.prototype,CCF=RP&&RP.createContextualFragment;
    if(CCF)RP.createContextualFragment=function(v){var s=str(v),f=defusedNodes(s);return f||CCF.call(this,s);};
    var DP=win.Document.prototype,EC=DP.execCommand;
    DP.execCommand=function(c,u,v){if(/^inserthtml$/i.test(String(c))&&v!=null)v=defuse(v);return EC.call(this,c,u,v);};
    ["write","writeln"].forEach(function(k){var W=DP[k];if(W)DP[k]=function(){return W.call(this,defuse([].join.call(arguments,"")));};});
    var PP=win.DOMParser&&win.DOMParser.prototype,PFS=PP&&PP.parseFromString;
    if(PFS)PP.parseFromString=function(s,type){var d=PFS.call(this,s,type);try{if(/html/i.test(String(type))&&RISKY.test(str(s)))defuseTree(d);}catch(e){}return d;};
    var SHU=EP.setHTMLUnsafe;if(SHU)EP.setHTMLUnsafe=function(v){return SHU.call(this,defuse(v));};
    var PHU=win.Document.parseHTMLUnsafe;if(PHU)win.Document.parseHTMLUnsafe=function(v){var d=PHU.call(win.Document,v);try{defuseTree(d);}catch(e){}return d;};}
  if(o.clipboard&&!did.clipboard){did.clipboard=1;
    var DT=win.DataTransfer&&win.DataTransfer.prototype,GD=DT&&DT.getData;
    if(GD)DT.getData=function(t){var v=GD.call(this,t);try{if(v&&/html/i.test(String(t)))v=html(v);}catch(e){v="";}return v;};
    var CI=win.ClipboardItem&&win.ClipboardItem.prototype,GT=CI&&CI.getType;
    if(GT)CI.getType=function(t){var p=GT.call(this,t);if(!/html/i.test(String(t)))return p;return p.then(function(b){return b.text().then(function(s){return new win.Blob([html(s)],{type:b.type||"text/html"});});});};
    /* a paste or a drop the app itself does not take: if its HTML holds anything that can run, only its formatting goes in */
    function intake(e,dt,drop){try{if(e.defaultPrevented||!dt||!GD||!editableOf(e.target))return;var raw=GD.call(dt,"text/html");if(!raw||!RISKY.test(raw))return;e.preventDefault();
        if(drop&&doc.caretRangeFromPoint){var r=doc.caretRangeFromPoint(e.clientX,e.clientY);if(r){var sel=win.getSelection();sel.removeAllRanges();sel.addRange(r);}}
        doc.execCommand("insertHTML",false,html(raw));}catch(x){}}
    win.addEventListener("paste",function(e){intake(e,e.clipboardData,false);},false);
    win.addEventListener("drop",function(e){intake(e,e.dataTransfer,true);},false);}
  if(o.links&&!did.links){did.links=1;
    var WO=win.open,pend=null;
    win.open=function(u){var x=scheme(u);if(x.sc==="javascript"||x.sc==="vbscript"||x.sc==="livescript"||(x.sc==="data"&&!/^data:image\//.test(x.s)))return null;
      if(pend&&u!=null){try{if(new win.URL(String(u),doc.baseURI).href===pend)pend=null;}catch(e){}}
      return WO.apply(win,arguments);};
    win.addEventListener("click",function(e){try{if(e.button>1)return;var t=e.target;if(t&&t.nodeType!==1)t=t.parentElement;var a=t&&t.closest?t.closest("a,area"):null;if(!a)return;
        var raw=a.getAttribute("href");if(raw==null)raw=a.getAttribute("xlink:href");if(raw==null)return;
        var x=scheme(raw);if(x.sc==="javascript"||x.sc==="vbscript"||x.sc==="livescript"||x.sc==="data"){if(!editableOf(a))e.preventDefault();return;}
        if(editableOf(a)||a.hasAttribute("download"))return;
        var u=new win.URL(raw,doc.baseURI);if(u.protocol!=="http:"&&u.protocol!=="https:")return;
        var selfHttp=win.location.protocol==="http:"||win.location.protocol==="https:";if(selfHttp&&u.origin===win.origin)return;if(!selfHttp&&!/^https?:/i.test(raw))return;
        var tg=str(a.getAttribute("target")).toLowerCase();if(tg&&!/^_(self|top|parent|blank)$/.test(tg))return;
        e.preventDefault();var href=u.href;pend=href;
        /* after every other handler has had the click: if one of them opened the link itself, it is not opened twice */
        win.setTimeout(function(){if(pend!==href)return;pend=null;try{WO.call(win,href,"_blank","noopener,noreferrer");}catch(x2){}},0);}catch(x){}},true);}
  return api;}
var api={html:html,text:text,box:box,defuse:defuse,risky:risky,okHref:okHref,okSrc:okSrc,cleanStyle:cleanStyle,install:install};
return api;}
