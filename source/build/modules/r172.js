<style id="r172-css">
/* ============ R172 · EVERY DROP-DOWN IN INGENIUM'S OWN DRESS (Ingenium 6.7, 25 October 2026) ============
   The owner's words: "the drop down menu to choose the model on the Lector page is ineligible on dark mode" and "I want the
   drop down menus all over the app, especially on the Settings page reformatted to fit Ingenium's colour palette and design
   instead of the pale grey colour that they have that makes them ineligible on dark mode."
   Measured on 6.6: by night every select had a see-through face and near-white words, and the list the system drew when it
   opened was pale grey or white, so its words could not be read. Each select now opens Ingenium's own list (the script below):
   an opaque plum card by night, a white card by day, the line under the pointer or the keys lit in lavender with a violet edge,
   the chosen line ticked. On a phone the list rises from the foot of the screen as a sheet. The select itself stays in the page,
   unseen, laid over its field (so the help's rings and What is this? still find it), and still holds the value, so everything that
   reads or sets it works as before.
   The last rules are a safety net for a select left as the system draws it (a list of several lines, or if the script never
   ran): opaque lines and readable words by day and by night, and the page told it is dark by night. */
select.r172-native{position:absolute !important;left:var(--r172-x,auto) !important;top:var(--r172-y,auto) !important;right:auto !important;bottom:auto !important;
  width:var(--r172-w,1px) !important;height:var(--r172-hh,1px) !important;min-width:0 !important;max-width:none !important;min-height:0 !important;max-height:none !important;
  margin:0 !important;padding:0 !important;border:0 !important;opacity:0 !important;pointer-events:none !important;overflow:hidden !important;
  box-shadow:none !important;transform:none !important;transition:none !important;animation:none !important}
body.ih-asking select.r172-native{pointer-events:auto !important;z-index:3 !important}
.r172-cb{position:relative;display:inline-flex;align-items:center;box-sizing:border-box;max-width:100%;min-width:0;
  min-height:var(--r172-h,36px);margin:0;padding:6px 38px 6px 12px;vertical-align:middle;
  font-family:var(--sans);font-size:13.5px;font-weight:500;line-height:1.3;letter-spacing:normal;text-align:left;text-transform:none;
  color:var(--ink-1,#221a2e);background-color:var(--cl-solid,#fff);
  background-image:linear-gradient(180deg,var(--card-hi,#fff),var(--cl-solid,#fff));
  border:1px solid rgba(var(--accent-line-rgb,106,63,181),.28);border-radius:var(--radius,12px);
  box-shadow:inset 0 1px 0 rgba(255,255,255,.75),0 1px 0 rgba(40,20,70,.07),0 2px 6px rgba(40,20,70,.08);
  cursor:pointer;user-select:none;-webkit-user-select:none;-webkit-tap-highlight-color:transparent;outline:none;
  transition:border-color .16s ease,box-shadow .16s ease,transform .16s ease}
body[data-theme="night"] .r172-cb{box-shadow:inset 0 1px 0 rgba(255,255,255,.07),0 1px 0 rgba(0,0,0,.45),0 3px 9px rgba(0,0,0,.32)}
.r172-cb[hidden]{display:none !important}
.r172-cb:not([aria-disabled="true"]):hover{border-color:rgba(var(--accent-line-rgb,106,63,181),.55);box-shadow:var(--pop)}
body:not([data-motion="minimal"]) .r172-cb:not([aria-disabled="true"]):not([aria-expanded="true"]):hover{transform:translateY(-1px)}
.r172-cb:focus-visible,.r172-cb.r172-kb:focus{outline:2px solid var(--accent,#6a3fb5);outline-offset:2px}
.r172-cb[aria-expanded="true"]{border-color:var(--accent,#6a3fb5);transform:none}
.r172-cb[aria-disabled="true"]{opacity:.62;cursor:not-allowed;box-shadow:none;transform:none}
.r172-cb r172-t{display:block;flex:1 1 auto;min-width:0;margin:0;padding:0}
.r172-cb r172-v{display:block;margin:0;padding:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;color:inherit;font:inherit}
.r172-cb r172-t::after{content:attr(data-sz);content:attr(data-sz) / "";display:block;height:0;overflow:hidden;visibility:hidden;white-space:nowrap}
.r172-cb r172-c{position:absolute;right:15px;top:50%;width:8px;height:8px;margin-top:-6px;box-sizing:border-box;
  border-right:2px solid var(--accent,#6a3fb5);border-bottom:2px solid var(--accent,#6a3fb5);transform:rotate(45deg);
  transition:transform .2s var(--spring,ease),margin-top .2s ease}
.r172-cb[aria-expanded="true"] r172-c{transform:rotate(225deg);margin-top:-2px}
@media (max-width:520px),(pointer:coarse){.r172-cb{min-height:44px}}

.r172-pop{position:fixed;z-index:2147483640;box-sizing:border-box;left:0;top:0;margin:0;padding:6px;overflow-x:hidden;overflow-y:auto;
  overscroll-behavior:contain;-webkit-overflow-scrolling:touch;
  font-family:var(--sans);font-size:14px;line-height:1.35;color:var(--ink-1,#221a2e);text-align:left;
  background:var(--cl-solid,#fff);border:1px solid rgba(var(--accent-line-rgb,106,63,181),.30);border-radius:var(--radius,12px);
  box-shadow:0 2px 6px rgba(40,20,70,.10),0 14px 34px rgba(40,20,70,.20);outline:none;user-select:none;-webkit-user-select:none}
body[data-theme="night"] .r172-pop{box-shadow:0 2px 8px rgba(0,0,0,.45),0 16px 38px rgba(0,0,0,.55)}
.r172-pop.r172-in{animation:r172-in .14s ease-out}
.r172-pop.r172-up.r172-in{animation-name:r172-inup}
@keyframes r172-in{from{opacity:0;transform:translateY(-4px)}to{opacity:1;transform:none}}
@keyframes r172-inup{from{opacity:0;transform:translateY(4px)}to{opacity:1;transform:none}}
.r172-opt{position:relative;display:flex;align-items:center;box-sizing:border-box;min-height:40px;margin:0;padding:8px 36px 8px 13px;
  border-radius:8px;color:var(--ink-1,#221a2e);cursor:pointer;overflow-wrap:anywhere;-webkit-tap-highlight-color:transparent}
.r172-opt r172-t{display:block;flex:1 1 auto;min-width:0}
.r172-opt.r172-act{background:var(--accent-soft,rgba(106,63,181,.14));box-shadow:inset 3px 0 0 var(--accent,#6a3fb5)}
.r172-opt[aria-selected="true"]{font-weight:650}
.r172-opt[aria-selected="true"]::after{content:"";position:absolute;right:15px;top:50%;width:6px;height:11px;margin-top:-8px;box-sizing:border-box;
  border-right:2px solid var(--accent,#6a3fb5);border-bottom:2px solid var(--accent,#6a3fb5);transform:rotate(45deg)}
.r172-opt[aria-disabled="true"]{color:var(--ink-3,#6c6579);cursor:default}
.r172-grp{margin:0;padding:0}
.r172-grp + .r172-grp,.r172-opt + .r172-grp{margin-top:4px;border-top:1px solid var(--hairline,rgba(34,26,46,.1));padding-top:2px}
.r172-gl{margin:0;padding:9px 13px 4px;font-size:11.5px;font-weight:700;letter-spacing:.05em;text-transform:uppercase;color:var(--ink-2,#4a4358)}
.r172-empty{padding:10px 13px;color:var(--ink-2,#4a4358)}
@media (pointer:coarse){.r172-opt{min-height:48px}}

.r172-scrim{position:fixed;left:0;top:0;right:0;bottom:0;z-index:2147483630;background:rgba(24,14,40,.44);touch-action:none}
body[data-theme="night"] .r172-scrim{background:rgba(0,0,0,.58)}
.r172-sheet{position:fixed;left:0;right:0;bottom:0;z-index:2147483640;box-sizing:border-box;display:flex;flex-direction:column;margin:0;
  max-height:calc(100vh - env(safe-area-inset-top,0px) - 20px);max-height:calc(100dvh - env(safe-area-inset-top,0px) - 20px);
  padding:4px max(14px,env(safe-area-inset-right,0px)) calc(12px + env(safe-area-inset-bottom,0px)) max(14px,env(safe-area-inset-left,0px));
  font-family:var(--sans);font-size:16px;line-height:1.35;color:var(--ink-1,#221a2e);text-align:left;
  background:var(--cl-solid,#fff);border-top:1px solid rgba(var(--accent-line-rgb,106,63,181),.30);border-radius:20px 20px 0 0;
  box-shadow:0 -6px 30px rgba(40,20,70,.22);user-select:none;-webkit-user-select:none;touch-action:none}
body[data-theme="night"] .r172-sheet{box-shadow:0 -8px 34px rgba(0,0,0,.6)}
.r172-sheet.r172-in{animation:r172-rise .22s cubic-bezier(.2,.8,.3,1)}
.r172-scrim.r172-in{animation:r172-fade .2s ease-out}
@keyframes r172-rise{from{transform:translateY(100%)}to{transform:none}}
@keyframes r172-fade{from{opacity:0}to{opacity:1}}
.r172-grip{display:block;width:40px;height:5px;margin:6px auto 4px;border-radius:3px;background:rgba(var(--accent-line-rgb,106,63,181),.30)}
.r172-head{display:flex;align-items:center;justify-content:space-between;gap:12px;padding:4px 2px 10px;border-bottom:1px solid var(--hairline,rgba(34,26,46,.1))}
.r172-title{flex:1 1 auto;min-width:0;margin:0;font-family:var(--serif);font-size:19px;font-weight:600;line-height:1.25;color:var(--ink-1,#221a2e)}
.r172-close{flex:0 0 auto;min-width:76px;min-height:44px;margin:0;padding:8px 16px;font:600 15px var(--sans);color:var(--ink-1,#221a2e);
  background:linear-gradient(180deg,var(--card-hi,#fff),var(--card-lo,#eee8f4));border:1px solid rgba(var(--accent-line-rgb,106,63,181),.30);
  border-radius:var(--radius,12px);box-shadow:var(--pop);cursor:pointer;-webkit-tap-highlight-color:transparent}
.r172-close:focus-visible{outline:2px solid var(--accent,#6a3fb5);outline-offset:2px}
.r172-sheet .r172-list{position:relative;flex:1 1 auto;min-height:0;margin:0;padding:8px 0 2px;overflow-x:hidden;overflow-y:auto;touch-action:pan-y;
  overscroll-behavior:contain;-webkit-overflow-scrolling:touch;outline:none;border-radius:10px}
.r172-sheet .r172-list:focus-visible{box-shadow:inset 0 0 0 2px var(--accent,#6a3fb5)}
.r172-sheet .r172-opt{min-height:52px;padding:12px 40px 12px 14px;font-size:16px;border-radius:12px}
.r172-sheet .r172-opt[aria-selected="true"]::after{right:18px}
body[data-motion="minimal"] .r172-pop,body[data-motion="minimal"] .r172-sheet,body[data-motion="minimal"] .r172-scrim{animation:none !important}
body[data-motion="minimal"] .r172-cb,body[data-motion="minimal"] .r172-cb r172-c{transition:none}
body[data-motion="calm"] .r172-sheet.r172-in{animation-name:r172-fade;animation-duration:.24s}
@media (prefers-reduced-motion:reduce){.r172-pop,.r172-sheet,.r172-scrim{animation:none !important}.r172-cb,.r172-cb r172-c{transition:none}}
r172-probe{position:fixed;left:0;top:0;width:0;height:0;visibility:hidden;pointer-events:none;
  padding:env(safe-area-inset-top,0px) env(safe-area-inset-right,0px) env(safe-area-inset-bottom,0px) env(safe-area-inset-left,0px)}

/* the safety net, for a select the system still draws */
select option,select optgroup{background-color:var(--cl-solid,#fff);color:var(--ink-1,#221a2e)}
select option:disabled{color:var(--ink-3,#6c6579)}
body[data-theme="night"] select option,body[data-theme="night"] select optgroup{background-color:var(--cl-solid,#241d31);color:var(--ink-1,#f3eefb)}
body[data-theme="night"] select:not(.r172-native){background-color:var(--cl-solid,#241d31)}
html.r172-dark{color-scheme:dark}
@supports selector(:has(a)){html:has(> body[data-theme="night"]){color-scheme:dark}}
</style>
<script>try{(window.__ingParts=window.__ingParts||{})["p93"]="started";}catch(_){}
/* R172 · every drop-down in Ingenium's own dress: see the note at the top of its styles.
   How it is built: the select-only combobox of the WAI-ARIA Authoring Practices. Beside each select stands a field with the role
   combobox (its name from the select's label); pressed, it opens a listbox of options (groups shown as headings that cannot be
   chosen). Keys: Enter, Space, Alt+Down and Down open; the arrows, Home, End, Page Up and Page Down move; letters jump to the
   line that begins with them; Enter or Space chooses; Escape closes and keeps the value; Tab chooses and moves on. The select
   stays the one source of the value: a choice sets it and sends input and change, as a person's choice would, so every part of
   the page that listens to it runs unchanged; and a value, an option or a state set by code shows in the field at once. */
(function(){"use strict";
if(window.__r172)return;window.__r172=1;
var D=document,W=window,NATIVE="r172-native",NARROW=520,N=0,ALL=[],OPEN=null,LASTFOCUS=null,KB=false;
var PD_VAL=Object.getOwnPropertyDescriptor(HTMLSelectElement.prototype,"value");
var PD_IDX=Object.getOwnPropertyDescriptor(HTMLSelectElement.prototype,"selectedIndex");
var HAS_PTR=!!W.PointerEvent;
var RO=null;try{if(W.ResizeObserver)RO=new ResizeObserver(function(es){fitAll(es.map(function(e){return e.target.__r172i;}).filter(Boolean));});}catch(_){}
var SPEC=["width","minWidth","maxWidth","flexGrow","flexShrink","flexBasis","alignSelf","justifySelf","order","gridColumnStart","gridColumnEnd",
  "gridRowStart","gridRowEnd","marginTop","marginRight","marginBottom","marginLeft","verticalAlign","position","top","right","bottom","left","zIndex"];
var SPEC_DEF={width:"auto",minWidth:"auto",maxWidth:"none",flexGrow:"0",flexShrink:"1",flexBasis:"auto",alignSelf:"auto",justifySelf:"auto",order:"0",
  gridColumnStart:"auto",gridColumnEnd:"auto",gridRowStart:"auto",gridRowEnd:"auto",marginTop:"0px",marginRight:"0px",marginBottom:"0px",
  marginLeft:"0px",verticalAlign:"baseline",position:"static",top:"auto",right:"auto",bottom:"auto",left:"auto",zIndex:"auto"};
var ATTRS=["disabled","hidden","style","class","label","selected","aria-label","aria-labelledby","aria-describedby","title","required","multiple","size","value","aria-invalid","id"];

function warn(e){try{console.warn("Drop-downs:",e&&e.message||e);}catch(_){}}
function mk(tag,cls,attrs){var e=D.createElement(tag);if(cls)e.className=cls;if(attrs)for(var k in attrs)if(attrs.hasOwnProperty(k))e.setAttribute(k,attrs[k]);return e;}
function narrow(){return (W.innerWidth||D.documentElement.clientWidth||1024)<=NARROW;}
function motion(){var m="full";try{m=D.body.getAttribute("data-motion")||"full";if(W.matchMedia&&W.matchMedia("(prefers-reduced-motion: reduce)").matches)m="minimal";}catch(_){}return m;}
function clean(t){return String(t==null?"":t).replace(/\s+/g," ").trim();}
function labelOf(o){if(!o)return "";var l=o.getAttribute("label");return clean(l!=null&&l!==""?l:o.text);}
function eligible(s){return !!s&&s.tagName==="SELECT"&&s.ownerDocument===D&&!s.__r172&&!s.multiple&&!(s.size>1)&&!s.hasAttribute("data-ing-native")&&s.isConnected;}
function idx(s){return PD_IDX.get.call(s);}

/* ---- the safe areas of a phone with a notch, read from the page's own env() values ---- */
var probe=null;
function insets(){try{if(!probe||!probe.isConnected){probe=D.createElement("r172-probe");probe.setAttribute("aria-hidden","true");D.body.appendChild(probe);}
  var c=getComputedStyle(probe);return {t:parseFloat(c.paddingTop)||0,r:parseFloat(c.paddingRight)||0,b:parseFloat(c.paddingBottom)||0,l:parseFloat(c.paddingLeft)||0};}
  catch(_){return {t:0,r:0,b:0,l:0};}}

/* ---- the field's name, from the select's own label, aria-label or aria-labelledby ---- */
function textWithout(node,skip){var out="";for(var c=node.firstChild;c;c=c.nextSibling){
  if(c.nodeType===3)out+=c.nodeValue;else if(c.nodeType===1){if(skip.indexOf(c)>=0||c.getAttribute("aria-hidden")==="true"||c.tagName==="SCRIPT"||c.tagName==="STYLE")continue;out+=" "+textWithout(c,skip)+" ";}}
  return out;}
function nameOf(inst){var s=inst.sel,lb=s.getAttribute("aria-labelledby");
  if(lb&&clean(lb))return {ids:clean(lb)};
  var al=s.getAttribute("aria-label");if(al&&clean(al))return {text:clean(al)};
  var labs=[];try{labs=s.labels?[].slice.call(s.labels):[];}catch(_){}
  var ids=[],txt=[];
  labs.forEach(function(L){if(L.contains(s))txt.push(clean(textWithout(L,[s,inst.combo])));else{if(!L.id)L.id=inst.id+"-lab"+ids.length;ids.push(L.id);}});
  txt=txt.filter(Boolean);
  if(ids.length&&!txt.length)return {ids:ids.join(" ")};
  if(txt.length)return {text:clean(ids.map(function(i){var e=D.getElementById(i);return e?e.textContent:"";}).concat(txt).join(" "))};
  if(s.title)return {text:clean(s.title)};
  return {text:"Choose one"};}
function nameText(nm){if(nm.text)return nm.text;return clean(nm.ids.split(/\s+/).map(function(i){var e=D.getElementById(i);return e?e.textContent:"";}).join(" "))||"Choose one";}
function putName(el,nm){if(nm.ids){if(el.getAttribute("aria-labelledby")!==nm.ids)el.setAttribute("aria-labelledby",nm.ids);if(el.hasAttribute("aria-label"))el.removeAttribute("aria-label");}
  else{if(el.getAttribute("aria-label")!==nm.text)el.setAttribute("aria-label",nm.text);if(el.hasAttribute("aria-labelledby"))el.removeAttribute("aria-labelledby");}}

/* ---- the widest line, for a select whose width follows its options (as the system's own does) ---- */
var cvx=null;
function widest(inst){try{if(!cvx)cvx=D.createElement("canvas").getContext("2d");var c=getComputedStyle(inst.combo);
  cvx.font=c.fontStyle+" "+c.fontWeight+" "+c.fontSize+" "+c.fontFamily;var best="",bw=-1,o=inst.sel.options;
  for(var i=0;i<o.length;i++){var t=labelOf(o[i]),w=cvx.measureText(t).width;if(w>bw){bw=w;best=t;}}return best;}catch(_){return "";}}

/* ---- how the select stood in its row (its width, its share of a flex row, its margins), read with it set aside ---- */
var selObs=null;
function measure(list){var pend=selObs?selObs.takeRecords():[];
  list.forEach(function(inst){inst.sel.classList.remove(NATIVE);});
  var rows=list.map(function(inst){var s=inst.sel;
    return {inst:inst,disp:getComputedStyle(s).display,v:s.style.getPropertyValue("display"),p:s.style.getPropertyPriority("display")};});
  rows.forEach(function(r){r.inst.sel.style.setProperty("display","none","important");});
  rows.forEach(function(r){var c=getComputedStyle(r.inst.sel),sp={};SPEC.forEach(function(k){sp[k]=c[k];});
    sp.fontSize=c.fontSize;sp.fontFamily=c.fontFamily;sp.fontWeight=c.fontWeight;
    var fs=parseFloat(c.fontSize)||13.5,h=fs*1.25+(parseFloat(c.paddingTop)||0)+(parseFloat(c.paddingBottom)||0)+(parseFloat(c.borderTopWidth)||0)+(parseFloat(c.borderBottomWidth)||0);
    sp.h=Math.max(30,Math.min(48,Math.round(h)));sp.display=r.disp;r.sp=sp;});
  rows.forEach(function(r){var s=r.inst.sel;if(r.v)s.style.setProperty("display",r.v,r.p);else s.style.removeProperty("display");
    if(!s.getAttribute("style"))s.removeAttribute("style");s.classList.add(NATIVE);r.inst.apply(r.sp);r.inst.styleSig=s.getAttribute("style");});
  /* the widest line, read for all at once, then written */
  var sz=rows.map(function(r){return r.inst.sizeFor?widest(r.inst):"";});
  rows.forEach(function(r,i){r.inst.putSize(sz[i]);});
  if(selObs){selObs.takeRecords();if(pend.length)onSelRecords(pend);}}

/* ================= one drop-down ================= */
function Inst(sel){var self=this;this.sel=sel;this.n=++N;this.id="r172-"+this.n;this.sig=null;this.lab=null;this.disabled=false;this.spec=null;
  var c=this.combo=mk("div","r172-cb",{role:"combobox","aria-haspopup":"listbox","aria-expanded":"false",tabindex:"0"});
  c.id=sel.id?sel.id+"-dd":this.id+"-cb";if(D.getElementById(c.id))c.id=this.id+"-cb";
  this.txt=mk("r172-t");this.val=mk("r172-v");this.txt.appendChild(this.val);c.appendChild(this.txt);
  var ch=mk("r172-c",null,{"aria-hidden":"true"});c.appendChild(ch);
  c.__r172i=this;sel.__r172=this;
  this.was={hidden:sel.getAttribute("aria-hidden"),tab:sel.getAttribute("tabindex")};
  sel.setAttribute("aria-hidden","true");sel.setAttribute("tabindex","-1");
  sel.parentNode.insertBefore(c,sel.nextSibling);
  c.addEventListener("click",function(e){e.preventDefault();if(self.disabled)return;if(OPEN&&OPEN.inst===self){close(true);return;}
    KB=false;c.classList.remove("r172-kb");try{c.focus({preventScroll:true});}catch(_){c.focus();}open(self,null);});
  c.addEventListener("keydown",function(e){if(OPEN&&OPEN.inst===self)return;comboKey(self,e);});
  c.addEventListener("focus",function(){LASTFOCUS=self;if(KB)c.classList.add("r172-kb");self.sync();self.fit();});
  c.addEventListener("mouseenter",function(){self.fit();});
  if(RO)try{RO.observe(c);}catch(_){}
  c.addEventListener("blur",function(){c.classList.remove("r172-kb");setTimeout(function(){if(!c.isConnected)return;
    if(D.activeElement!==c){if(LASTFOCUS===self)LASTFOCUS=null;if(OPEN&&OPEN.inst===self&&!OPEN.sheet)close(false);}},0);});
  /* a label pressed, or code that focuses the select: the field takes the focus, as the select would have */
  sel.addEventListener("focus",function(){if(!c.hidden&&!self.disabled&&c.isConnected){try{c.focus();}catch(_){}}});
  sel.addEventListener("change",function(){self.sync();});
  sel.addEventListener("input",function(){self.sync();});
  /* code that sets the value or the index: the field follows at once */
  try{Object.defineProperty(sel,"value",{configurable:true,enumerable:true,get:function(){return PD_VAL.get.call(this);},set:function(v){PD_VAL.set.call(this,v);self.syncValue();}});
    Object.defineProperty(sel,"selectedIndex",{configurable:true,enumerable:true,get:function(){return PD_IDX.get.call(this);},set:function(v){PD_IDX.set.call(this,v);self.syncValue();}});}catch(e){warn(e);}
  if(selObs)selObs.observe(sel,{childList:true,subtree:true,attributes:true,attributeOldValue:true,characterData:true,attributeFilter:ATTRS});
  ALL.push(this);}
Inst.prototype.apply=function(sp){var c=this.combo,st=c.style;this.spec=sp;
  SPEC.forEach(function(k){var v=sp[k];if(k==="position"&&v==="static")v="";
    if(v==null||v===SPEC_DEF[k]||v==="")st[k]="";else st[k]=v;});
  if(sp.position==="static"||!sp.position){st.top=st.right=st.bottom=st.left=st.zIndex="";}
  st.fontSize=sp.fontSize||"";st.fontFamily=sp.fontFamily||"";st.fontWeight=sp.fontWeight&&+sp.fontWeight>=500?sp.fontWeight:"";
  st.setProperty("--r172-h",sp.h+"px");
  st.display=/^(block|flex|grid|table|list-item)$/.test(sp.display)?"flex":"";
  this.sizeFor=sp.width==="auto";};
/* the unseen select lies exactly over its field: what measures it (the help's list, its rings, What is this?) finds the field */
Inst.prototype.fitRead=function(){var s=this.sel,c=this.combo;try{
  if(c.hidden||!c.isConnected||!s.classList.contains(NATIVE))return null;var cr=c.getBoundingClientRect();if(!cr.width||!cr.height)return null;
  var sr=s.getBoundingClientRect(),cs=getComputedStyle(s),l=parseFloat(cs.left)||0,t=parseFloat(cs.top)||0;
  var nl=Math.round((l+cr.left-sr.left)*10)/10,nt=Math.round((t+cr.top-sr.top)*10)/10,w=Math.round(cr.width*10)/10,h=Math.round(cr.height*10)/10;
  if(Math.abs(cr.left-sr.left)<0.6&&Math.abs(cr.top-sr.top)<0.6&&Math.abs(sr.width-w)<0.6&&Math.abs(sr.height-h)<0.6)return null;
  return [nl,nt,w,h];}catch(e){warn(e);return null;}};
Inst.prototype.fitWrite=function(g){if(!g)return;var s=this.sel;
  s.style.setProperty("--r172-x",g[0]+"px");s.style.setProperty("--r172-y",g[1]+"px");s.style.setProperty("--r172-w",g[2]+"px");s.style.setProperty("--r172-hh",g[3]+"px");
  this.styleSig=s.getAttribute("style");};
Inst.prototype.fit=function(){this.fitWrite(this.fitRead());};
function fitAll(list){var g=list.map(function(I){return I.fitRead();});list.forEach(function(I,i){I.fitWrite(g[i]);});}
function syncAll(list){var r=list.map(function(I){try{return I.read();}catch(e){warn(e);return null;}});
  list.forEach(function(I,i){try{if(r[i])I.write(r[i]);}catch(e){warn(e);}});}
Inst.prototype.mirror=function(){var on=this.sel.classList.contains("ih-ring");if(this.combo.classList.contains("ih-ring")!==on)this.combo.classList.toggle("ih-ring",on);};
Inst.prototype.putSize=function(w){w=w||"";if(this.txt.getAttribute("data-sz")!==w)this.txt.setAttribute("data-sz",w);};
Inst.prototype.sizer=function(){this.putSize(this.sizeFor?widest(this):"");};
Inst.prototype.signature=function(){var o=this.sel.options,a=[];for(var i=0;i<o.length;i++)a.push(o[i].value+"\u0001"+labelOf(o[i])+"\u0001"+(o[i].disabled?1:0)+(o[i].hidden?1:0)+(o[i].parentNode&&o[i].parentNode.tagName==="OPTGROUP"?"g"+(o[i].parentNode.label||""):""));return a.join("\u0002");};
Inst.prototype.syncValue=function(){var s=this.sel,i=idx(s),lab=i>=0?labelOf(s.options[i]):"";
  if(lab!==this.lab){this.lab=lab;this.val.textContent=lab;}
  if(OPEN&&OPEN.inst===this)OPEN.items.forEach(function(it){var on=it.o.selected?"true":"false";if(it.el.getAttribute("aria-selected")!==on)it.el.setAttribute("aria-selected",on);});};
/* read first (the select's state as the page shows it), then write: many fields at once cost one look at the page's styles */
Inst.prototype.read=function(){var s=this.sel;if(!s.isConnected)return null;
  if(s.multiple||s.size>1)return {gone:true};
  var cs=getComputedStyle(s),hide=cs.display==="none"||s.hidden,vis=cs.visibility==="hidden"&&!(s.parentElement&&getComputedStyle(s.parentElement).visibility==="hidden");
  var dis=false;try{dis=s.matches(":disabled");}catch(_){dis=s.disabled;}
  /* the name is looked up again when the select's naming changes, and every few seconds (a label's words may change) */
  var now=Date.now();if(!this.nm||this.nmDirty||now-(this.nmAt||0)>4000){this.nmFresh=nameOf(this);this.nmAt=now;this.nmDirty=false;}
  return {hide:hide,vis:vis,dis:dis,nm:this.nmFresh,sig:this.signature()};};
Inst.prototype.sync=function(){var r=this.read();if(r)this.write(r);};
Inst.prototype.write=function(r){var s=this.sel,c=this.combo;
  if(r.gone){this.destroy();return;}
  if(c.previousSibling!==s&&s.parentNode){s.parentNode.insertBefore(c,s.nextSibling);}
  if(c.hidden!==r.hide)c.hidden=r.hide;
  var vv=r.vis?"hidden":"";if(c.style.visibility!==vv)c.style.visibility=vv;
  var dis=r.dis;
  if(dis!==this.disabled){this.disabled=dis;if(dis){c.setAttribute("aria-disabled","true");c.setAttribute("tabindex","-1");if(OPEN&&OPEN.inst===this)close(false);}
    else{c.removeAttribute("aria-disabled");c.setAttribute("tabindex","0");}}
  var nm=r.nm;putName(c,nm);this.nm=nm;
  var t=s.getAttribute("title");if(t){if(c.getAttribute("title")!==t)c.setAttribute("title",t);}else if(c.hasAttribute("title"))c.removeAttribute("title");
  ["aria-describedby","aria-invalid"].forEach(function(a){var v=s.getAttribute(a);if(v){if(c.getAttribute(a)!==v)c.setAttribute(a,v);}else if(c.hasAttribute(a))c.removeAttribute(a);});
  if(s.required)c.setAttribute("aria-required","true");else if(c.hasAttribute("aria-required"))c.removeAttribute("aria-required");
  var sig=r.sig;
  if(sig!==this.sig){var first=this.sig===null;this.sig=sig;if(!first)this.sizer();if(OPEN&&OPEN.inst===this)rebuild();}
  this.syncValue();};
Inst.prototype.destroy=function(){var s=this.sel,c=this.combo;if(OPEN&&OPEN.inst===this)close(false);
  if(c.parentNode)c.parentNode.removeChild(c);
  s.classList.remove(NATIVE);
  if(this.was.hidden==null)s.removeAttribute("aria-hidden");else s.setAttribute("aria-hidden",this.was.hidden);
  if(this.was.tab==null)s.removeAttribute("tabindex");else s.setAttribute("tabindex",this.was.tab);
  try{delete s.value;delete s.selectedIndex;}catch(_){}
  s.__r172=null;var k=ALL.indexOf(this);if(k>=0)ALL.splice(k,1);if(LASTFOCUS===this)LASTFOCUS=null;};

function enhanceAll(list){var fresh=[];
  for(var i=0;i<list.length;i++){var s=list[i];
    if(s&&s.__r172){var I=s.__r172;if(I.combo.previousSibling!==s&&s.parentNode)s.parentNode.insertBefore(I.combo,s.nextSibling);continue;}
    if(!eligible(s)||!s.parentNode)continue;
    try{fresh.push(new Inst(s));}catch(e){warn(e);}}
  if(!fresh.length)return fresh;
  try{measure(fresh);}catch(e){warn(e);}
  syncAll(fresh);fitAll(fresh);
  return fresh;}
function enhance(s){if(!s)return null;if(s.__r172)return s.__r172;var f=enhanceAll([s]);return f[0]||null;}

/* ================= the list, opened ================= */
function buildList(inst,list){list.textContent="";var s=inst.sel,items=[];
  function addOpt(o,parent,gdis){if(o.hidden)return;var dis=!!(o.disabled||gdis),el=mk("div","r172-opt",{role:"option",id:inst.id+"-o"+items.length,"aria-selected":o.selected?"true":"false"});
    if(dis)el.setAttribute("aria-disabled","true");var t=mk("r172-t");t.textContent=labelOf(o)||"\u00a0";el.appendChild(t);
    el.__k=items.length;items.push({el:el,o:o,dis:dis,label:labelOf(o)});parent.appendChild(el);}
  for(var c=s.firstElementChild;c;c=c.nextElementSibling){
    if(c.tagName==="OPTION")addOpt(c,list,false);
    else if(c.tagName==="OPTGROUP"){var g=mk("div","r172-grp",{role:"group"}),gid=inst.id+"-g"+items.length,gl=mk("div","r172-gl",{role:"presentation",id:gid});
      gl.textContent=clean(c.label)||"\u00a0";g.setAttribute("aria-labelledby",gid);g.appendChild(gl);
      for(var o=c.firstElementChild;o;o=o.nextElementSibling)if(o.tagName==="OPTION")addOpt(o,g,c.disabled);list.appendChild(g);}}
  if(!items.length){var e=mk("div","r172-empty",{role:"presentation"});e.textContent="Nothing to choose yet.";list.appendChild(e);}
  return items;}
function firstOn(items,from,step){for(var k=from;k>=0&&k<items.length;k+=step)if(!items[k].dis)return k;return -1;}
function setActive(k,scroll){var o=OPEN;if(!o||k<0||k>=o.items.length)return;
  if(o.act>=0&&o.items[o.act])o.items[o.act].el.classList.remove("r172-act");o.act=k;var el=o.items[k].el;el.classList.add("r172-act");
  o.holder.setAttribute("aria-activedescendant",el.id);
  if(scroll!==false){var L=o.scroller,top=0,n=el;while(n&&n!==L){top+=n.offsetTop;n=n.offsetParent;if(n&&n!==L&&!L.contains(n)){top=el.offsetTop;break;}}
    if(top<L.scrollTop+4)L.scrollTop=Math.max(0,top-6);else if(top+el.offsetHeight>L.scrollTop+L.clientHeight-4)L.scrollTop=top+el.offsetHeight-L.clientHeight+6;}}
function move(step){var o=OPEN;if(!o||!o.items.length)return;var k=o.act;
  if(k<0){k=firstOn(o.items,step>0?0:o.items.length-1,step>0?1:-1);setActive(k);return;}
  var n=Math.abs(step),dir=step>0?1:-1,t=k;
  for(var i=0;i<n;i++){var nx=firstOn(o.items,t+dir,dir);if(nx<0)break;t=nx;}
  setActive(t);}
function rebuild(){var o=OPEN;if(!o)return;var keep=o.act>=0&&o.items[o.act]?o.items[o.act].o:null;
  o.items=buildList(o.inst,o.list);var k=-1;o.items.forEach(function(it,i){if(it.o===keep)k=i;});
  if(k<0)k=selectedK(o.items);o.act=-1;if(k>=0)setActive(k);if(!o.sheet)place();}
function selectedK(items){for(var i=0;i<items.length;i++)if(items[i].o.selected&&!items[i].dis)return i;return firstOn(items,0,1);}

/* type-ahead: letters typed close together find the next line that begins with them */
var TA={s:"",t:0};
function taLive(){return TA.s&&Date.now()-TA.t<800;}
function fold(t){t=String(t||"").toLowerCase();try{t=t.normalize("NFD").replace(/[\u0300-\u036f]/g,"");}catch(_){}
  return t.replace(/^[^a-z0-9\u00c0-\uffff]+/i,"").replace(/^[\u2000-\u2bff\ud800-\udfff\ufe0f\s]+/,"");}
function typeAhead(ch){var o=OPEN;if(!o||!o.items.length)return;var now=Date.now();if(now-TA.t>800)TA.s="";TA.t=now;TA.s+=String(ch).toLowerCase();
  var q=TA.s,same=q.split("").every(function(x){return x===q[0];});if(same&&q.length>1)q=q[0];
  var n=o.items.length,start=o.act<0?0:o.act,from=(q.length===1)?start+1:start;
  for(var i=0;i<n;i++){var k=(from+i)%n,it=o.items[k];if(!it.dis&&fold(it.label).indexOf(q)===0){setActive(k);return;}}}

function place(){var o=OPEN;if(!o||o.sheet)return;var c=o.inst.combo,p=o.box,r=c.getBoundingClientRect(),ins=insets();
  var vw=W.innerWidth||D.documentElement.clientWidth,vh=W.innerHeight||D.documentElement.clientHeight,gap=6,edge=8;
  if(!r.width&&!r.height){close(false);return;}
  if(r.bottom<ins.t||r.top>vh-ins.b){close(false);return;}
  var maxW=Math.max(160,vw-ins.l-ins.r-2*edge),w=Math.min(maxW,Math.max(r.width,180));
  p.style.maxHeight="none";p.style.width="auto";p.style.minWidth=Math.round(w)+"px";p.style.maxWidth=Math.round(Math.max(w,Math.min(maxW,420)))+"px";
  var pw=Math.min(p.offsetWidth,maxW),need=p.scrollHeight+2;
  var below=vh-ins.b-r.bottom-gap-edge,above=r.top-ins.t-gap-edge,cap=Math.min(380,Math.max(below,above));
  var up=need>below&&above>below,mh=Math.max(96,Math.min(need,up?above:below,Math.max(cap,96)));
  var left=Math.min(Math.max(r.left,ins.l+edge),vw-ins.r-edge-pw),top=up?r.top-gap-Math.min(need,mh):r.bottom+gap;
  p.style.maxHeight=Math.round(mh)+"px";p.style.left=Math.round(left)+"px";p.style.top=Math.round(top)+"px";
  p.classList.toggle("r172-up",up);
  /* a parent that moves fixed things (a transform) would carry the list away: measured and put back */
  var q=p.getBoundingClientRect(),dx=q.left-left,dy=q.top-top;
  if(Math.abs(dx)>1||Math.abs(dy)>1){p.style.left=Math.round(left-dx)+"px";p.style.top=Math.round(top-dy)+"px";}}

function open(inst,how){if(OPEN)close(false);try{inst.sync();}catch(e){warn(e);}
  if(inst.disabled||inst.combo.hidden||!inst.sel.isConnected)return;
  var sheet=narrow(),o={inst:inst,sheet:sheet,act:-1,items:[]},nm=inst.nm||nameOf(inst),lid=inst.id+"-lb",anim=motion()!=="minimal";
  if(sheet){var scrim=mk("div","r172-scrim",{"aria-hidden":"true"}),tid=inst.id+"-st";
    var dlg=mk("div","r172-sheet",{role:"dialog","aria-modal":"true","aria-labelledby":tid});
    var grip=mk("r172-grip","r172-grip",{"aria-hidden":"true"}),head=mk("div","r172-head"),title=mk("div","r172-title",{id:tid});title.textContent=nameText(nm);
    var cl=mk("button","r172-close",{type:"button"});cl.textContent="Close";head.appendChild(title);head.appendChild(cl);
    var list=mk("div","r172-list",{role:"listbox",id:lid,tabindex:"0","aria-labelledby":tid});
    dlg.appendChild(grip);dlg.appendChild(head);dlg.appendChild(list);
    o.scrim=scrim;o.box=dlg;o.list=list;o.scroller=list;o.holder=list;o.closeBtn=cl;
    scrim.addEventListener("click",function(e){e.preventDefault();close(true);});
    cl.addEventListener("click",function(e){e.preventDefault();close(true);});
    if(anim){scrim.classList.add("r172-in");dlg.classList.add("r172-in");}
    D.body.appendChild(scrim);D.body.appendChild(dlg);}
  else{var pop=mk("div","r172-pop r172-list",{role:"listbox",id:lid,tabindex:"-1"});putName(pop,nm);
    o.box=pop;o.list=pop;o.scroller=pop;o.holder=inst.combo;if(anim)pop.classList.add("r172-in");D.body.appendChild(pop);}
  o.box.addEventListener("mousedown",function(e){if(e.target!==o.closeBtn)e.preventDefault();});
  o.list.addEventListener("click",function(e){var el=e.target.closest?e.target.closest(".r172-opt"):null;if(!el||!o.list.contains(el))return;e.preventDefault();choose(el.__k);});
  o.list.addEventListener(HAS_PTR?"pointermove":"mousemove",function(e){if(e.pointerType&&e.pointerType!=="mouse")return;var el=e.target.closest?e.target.closest(".r172-opt"):null;
    if(el&&el.__k!==OPEN.act&&!OPEN.items[el.__k].dis)setActive(el.__k,false);});
  OPEN=o;o.items=buildList(inst,o.list);
  inst.combo.setAttribute("aria-controls",lid);inst.combo.setAttribute("aria-expanded","true");
  var k=selectedK(o.items);if(how==="first")k=firstOn(o.items,0,1);else if(how==="last")k=firstOn(o.items,o.items.length-1,-1);
  if(!sheet)place();
  if(OPEN!==o)return;
  if(k>=0)setActive(k);
  if(sheet){try{o.list.focus({preventScroll:true});}catch(_){o.list.focus();}}
  W.addEventListener("keydown",openKey,true);
  D.addEventListener(HAS_PTR?"pointerdown":"mousedown",outside,true);if(!HAS_PTR)D.addEventListener("touchstart",outside,true);
  D.addEventListener("focusin",trap,true);
  W.addEventListener("scroll",onScroll,true);W.addEventListener("resize",onResize);
  o.iv=setInterval(watch,250);}
function close(refocus){var o=OPEN;if(!o)return;OPEN=null;TA.s="";
  W.removeEventListener("keydown",openKey,true);D.removeEventListener(HAS_PTR?"pointerdown":"mousedown",outside,true);if(!HAS_PTR)D.removeEventListener("touchstart",outside,true);
  D.removeEventListener("focusin",trap,true);W.removeEventListener("scroll",onScroll,true);W.removeEventListener("resize",onResize);clearInterval(o.iv);
  [o.box,o.scrim].forEach(function(e){if(e&&e.parentNode)e.parentNode.removeChild(e);});
  var c=o.inst.combo;c.setAttribute("aria-expanded","false");c.removeAttribute("aria-activedescendant");c.removeAttribute("aria-controls");
  if(refocus&&c.isConnected&&!c.hidden){try{c.focus({preventScroll:true});}catch(_){c.focus();}}
  return o;}
function commit(inst,opt){var s=inst.sel;if(!opt||!s.contains(opt)||opt.disabled)return false;
  var before=idx(s);if(opt.selected&&before===opt.index)return false;opt.selected=true;inst.syncValue();
  if(idx(s)===before)return false;
  try{s.dispatchEvent(new Event("input",{bubbles:true}));}catch(e){warn(e);}
  try{s.dispatchEvent(new Event("change",{bubbles:true}));}catch(e){warn(e);}
  try{if(inst.sel.isConnected)inst.sync();}catch(_){}
  return true;}
function choose(k){var o=OPEN;if(!o)return;var it=o.items[k];if(!it||it.dis)return;var inst=o.inst;close(true);commit(inst,it.o);}

function isChar(e){return !!e.key&&e.key.length===1&&!e.ctrlKey&&!e.metaKey;}
function comboKey(inst,e){if(inst.disabled||e.ctrlKey||e.metaKey)return;if(D.body.classList.contains("ih-asking"))return;var k=e.key;KB=true;inst.combo.classList.add("r172-kb");
  if(k==="ArrowDown"||k==="Down"||k==="ArrowUp"||k==="Up"||k==="Enter"||k===" "||k==="Spacebar"){e.preventDefault();e.stopPropagation();open(inst,null);return;}
  if(k==="Home"){e.preventDefault();e.stopPropagation();open(inst,"first");return;}
  if(k==="End"){e.preventDefault();e.stopPropagation();open(inst,"last");return;}
  if(k==="ArrowLeft"||k==="ArrowRight"||k==="PageUp"||k==="PageDown"){e.stopPropagation();e.preventDefault();return;}
  if(isChar(e)&&!e.altKey){e.preventDefault();e.stopPropagation();open(inst,null);typeAhead(k);}}
function openKey(e){var o=OPEN;if(!o)return;var t=e.target,inst=o.inst;
  if(!(t===inst.combo||o.box.contains(t)))return;
  if(e.ctrlKey||e.metaKey)return;KB=true;
  var k=e.key,done=true;
  if(o.closeBtn&&t===o.closeBtn&&(k==="Enter"||k===" "||k==="Spacebar")){e.preventDefault();e.stopPropagation();close(true);return;}
  switch(k){
    case "ArrowDown":case "Down":move(1);break;
    case "ArrowUp":case "Up":if(e.altKey)choose(o.act);else move(-1);break;
    case "Home":setActive(firstOn(o.items,0,1));break;
    case "End":setActive(firstOn(o.items,o.items.length-1,-1));break;
    case "PageDown":move(10);break;
    case "PageUp":move(-10);break;
    case "Enter":choose(o.act);break;
    case " ":case "Spacebar":if(taLive())typeAhead(" ");else choose(o.act);break;
    case "Escape":case "Esc":close(true);break;
    case "Tab":
      if(o.sheet){e.preventDefault();e.stopPropagation();var nx=(t===o.closeBtn)?o.list:o.closeBtn;try{nx.focus({preventScroll:true});}catch(_){nx.focus();}return;}
      var it=o.items[o.act];close(false);if(it&&!it.dis)commit(inst,it.o);return;
    default:if(isChar(e)&&!e.altKey)typeAhead(k);else done=false;}
  if(done){e.preventDefault();e.stopPropagation();if(e.stopImmediatePropagation)e.stopImmediatePropagation();}}
function outside(e){var o=OPEN;if(!o)return;var t=e.target;if(o.inst.combo.contains(t)||o.box.contains(t)||t===o.scrim)return;close(false);}
function trap(e){var o=OPEN;if(!o||!o.sheet)return;var t=e.target;if(o.box.contains(t))return;try{o.list.focus({preventScroll:true});}catch(_){}}
var rq=0;
function onScroll(e){var o=OPEN;if(!o||o.sheet)return;if(e&&e.target&&o.box.contains&&(e.target===o.box||o.box.contains(e.target)))return;
  if(!rq)rq=(W.requestAnimationFrame||setTimeout)(function(){rq=0;place();});}
function onResize(){var o=OPEN;if(!o)return;if(narrow()!==o.sheet){var inst=o.inst,keep=o.items[o.act]?o.items[o.act].o:null;close(true);open(inst,null);
    if(OPEN&&keep)OPEN.items.forEach(function(it,i){if(it.o===keep)setActive(i);});return;}
  if(!o.sheet)place();}
/* the list follows its select: gone (a part of the page drawn again), hidden, or turned off, it closes, or opens again on the new one */
function watch(){var o=OPEN;if(!o)return;var inst=o.inst;
  if(!inst.sel.isConnected||!inst.combo.isConnected){reattach();return;}
  if(inst.combo.hidden||!inst.combo.getClientRects().length||inst.disabled){close(false);return;}
  var sig=inst.signature();if(sig!==inst.sig)inst.sync();}
function twinOf(inst){var s=inst.sel;
  if(s.id){var t=D.getElementById(s.id);if(t&&t!==s&&t.tagName==="SELECT"&&t.isConnected)return t;}
  var nm=inst.nm?nameText(inst.nm):"",vals=[].map.call(s.options,function(x){return x.value;}).join("\u0001");if(!nm)return null;
  var all=D.getElementsByTagName("select");
  for(var i=0;i<all.length;i++){var x=all[i];if(x===s||!x.isConnected)continue;if([].map.call(x.options,function(y){return y.value;}).join("\u0001")!==vals)continue;
    var I=x.__r172||null;if(I){if(nameText(I.nm||nameOf(I))===nm)return x;}else{var tmp={sel:x,id:"r172-tw",combo:null};try{if(nameText(nameOf(tmp))===nm)return x;}catch(_){}}}
  return null;}
function reattach(){var o=OPEN;if(!o)return;var inst=o.inst,keep=o.items[o.act]?o.items[o.act].o.value:null,sheet=o.sheet;close(false);
  var tw=twinOf(inst),ti=tw?enhance(tw):null;if(!ti||ti.combo.hidden){return;}
  if(!sheet){try{ti.combo.focus({preventScroll:true});}catch(_){}}
  open(ti,null);if(OPEN&&keep!=null)OPEN.items.forEach(function(it,i){if(it.o.value===keep&&!it.dis)setActive(i);});}

/* ================= finding every select, now and later ================= */
function onSelRecords(recs){var seen=[],again=[];
  for(var i=0;i<recs.length;i++){var r=recs[i],n=r.target;while(n&&n.tagName!=="SELECT")n=n.parentNode;
    if(!n||!n.__r172)continue;if(seen.indexOf(n)<0)seen.push(n);
    if(r.target===n&&r.type==="attributes"&&/^(aria-label|aria-labelledby|title|id)$/.test(r.attributeName))n.__r172.nmDirty=true;
    if(r.target===n&&r.type==="attributes"&&again.indexOf(n.__r172)<0){
      if(r.attributeName==="class"){n.__r172.mirror();if(!/(^|\s)(ih-ring)(\s|$)/.test(String(r.oldValue||""))&&!n.classList.contains("ih-ring"))again.push(n.__r172);}
      else if(r.attributeName==="style"&&n.getAttribute("style")!==n.__r172.styleSig)again.push(n.__r172);}}
  if(again.length){try{measure(again);}catch(e){warn(e);}}
  syncAll(seen.map(function(s){return s.__r172;}).filter(Boolean));}
function prune(){for(var i=ALL.length-1;i>=0;i--){var I=ALL[i];if(!I)continue;
    if(!I.sel.isConnected){if(OPEN&&OPEN.inst===I)continue;if(I.combo.parentNode)I.combo.parentNode.removeChild(I.combo);
      I.sel.__r172=null;ALL.splice(i,1);if(LASTFOCUS===I){refocusTwin(I);}continue;}
    if(I.combo.previousSibling!==I.sel&&I.sel.parentNode)I.sel.parentNode.insertBefore(I.combo,I.sel.nextSibling);}}
function refocusTwin(I){LASTFOCUS=null;var a=D.activeElement;if(a&&a!==D.body&&a!==D.documentElement)return;
  var tw=twinOf(I),ti=tw?enhance(tw):null;if(ti&&!ti.combo.hidden&&!ti.disabled){try{ti.combo.focus({preventScroll:true});}catch(_){}}}
function onBody(recs){var found=[],removed=false;
  for(var i=0;i<recs.length;i++){var r=recs[i],an=r.addedNodes;
    for(var j=0;j<an.length;j++){var n=an[j];if(n.nodeType!==1)continue;
      if(n.tagName==="SELECT")found.push(n);else if(n.firstElementChild&&n.tagName!=="OPTION"&&n.tagName!=="OPTGROUP"){var q=n.getElementsByTagName("select");for(var k=0;k<q.length;k++)found.push(q[k]);}}
    if(r.removedNodes.length)removed=true;}
  if(found.length)enhanceAll(found);
  if(removed){if(OPEN&&!OPEN.inst.sel.isConnected)reattach();prune();}}
function scan(){var all=D.getElementsByTagName("select"),list=[];for(var i=0;i<all.length;i++)if(!all[i].__r172&&eligible(all[i]))list.push(all[i]);if(list.length)enhanceAll(list);}
var tickN=0;
function tick(){if(D.hidden)return;tickN++;try{prune();scan();
  var want=[],seen=[];for(var i=0;i<ALL.length;i++){var I=ALL[i];if(!I.sel.isConnected)continue;var vis=I.combo.offsetParent!==null;if(tickN%5===0||vis)want.push(I);if(vis)seen.push(I);}
  syncAll(want);fitAll(seen);}catch(e){warn(e);}}
var rz=0;
function remeasure(){rz=0;var live=ALL.filter(function(I){return I.sel.isConnected;});if(live.length)try{measure(live);}catch(e){warn(e);}}

/* the page told it is dark by night, for any list the system still draws (engines without :has) */
function darkRoot(){try{D.documentElement.classList.toggle("r172-dark",D.body.getAttribute("data-theme")==="night");}catch(_){}}

function start(){
  try{selObs=new MutationObserver(onSelRecords);}catch(e){warn(e);}
  scan();
  try{new MutationObserver(onBody).observe(D.body,{childList:true,subtree:true});}catch(e){warn(e);}
  setInterval(tick,1000);
  W.addEventListener("resize",function(){if(rz)clearTimeout(rz);rz=setTimeout(remeasure,220);});
  D.addEventListener("keydown",function(e){if(e.key==="Tab")KB=true;},true);
  D.addEventListener(HAS_PTR?"pointerdown":"mousedown",function(){KB=false;},true);
  var hasHas=false;try{hasHas=!!(W.CSS&&CSS.supports&&CSS.supports("selector(:has(a))"));}catch(_){}
  if(!hasHas){darkRoot();try{new MutationObserver(darkRoot).observe(D.body,{attributes:true,attributeFilter:["data-theme"]});}catch(_){}}
  W.IngSelect={version:1,enhance:enhance,of:function(s){return s&&s.__r172||null;},refresh:function(s){if(s&&s.__r172)s.__r172.sync();else tick();},
    open:function(s){var I=enhance(s);if(I)open(I,null);return !!OPEN;},close:function(){close(true);},isOpen:function(){return !!OPEN;},count:function(){return ALL.length;}};}
try{start();}catch(e){warn(e);}
})();
;try{window.__ingParts["p93"]="running";}catch(_){}
</script>
