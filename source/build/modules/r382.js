<style id="r382-css">
/* ============ R382 · VOCATIO: THE SUBMISSION PACK, AND ITS DATES IN VESTA (Ingenium 7.83, 25 November 2026) ============
   Her approval of the live preview (https://claude.ai/artifact/G3YPubJyRy9pe9DphJH62R, 25 November 2026): "I approve of the previews but
   I want the "Your submission pack" cards to also have the animated effect and lift of hover and I want the same effect for the "Against
   the posting's criteria" section as well". Recommendations 2 and 3 of 24 November (before her Cambridge deadline of 8 December):
   - The submission pack, at the top of an application's "What you send" (r188's stepSend calls IngPack.paint): what the posting asks
     her to send (the checklist's own items, each with the posting's words), one card each: its limit (r188's limitFor) with a gauge of
     the words written, the file name the portal expects (from her profile's name; hers to change), and a lever of four notches, To write,
     Drafted, Checked, Final (Final ticks the checklist item, and the checklist's tick sets Final). A final check: her name the same
     everywhere, the dates against her CV, the referees told, the files the portal takes, and no square brackets left (this one read by
     Vocatio itself in every document). Export the pack only when every item is final and every check ticked: each document as the Word
     file the portal will receive, named as it expects, in one folder. Folded under one raised bar, so the step shows one thing first.
   - Its dates in Vesta's Today (r121's todayRows, through W.__ingTodayRows): each application's closing date within a fortnight, with its
     next step, and each referee's or person's follow-up due (r188's personStep); a week, three days and a day before a closing date,
     a reminder rings once (state.reminders), quietly.
   The cards lift under the pointer and sink when pressed, in Vocatio's own tokens (#cs, r188), by day and by night. */
#cs .vp{display:grid;gap:10px;margin:0 0 14px}
#cs .vp-bar{display:flex;align-items:center;gap:12px;width:100%;text-align:left;border:1px solid var(--c-hair);border-radius:14px;background:linear-gradient(var(--c-a),var(--c-b));padding:12px 14px;cursor:pointer;color:var(--c-ink1);
  box-shadow:var(--c-pop);transition:transform .2s cubic-bezier(.2,.9,.3,1.3),box-shadow .2s;font:inherit}
#cs .vp-bar:hover{transform:translateY(-2px);box-shadow:var(--c-pophi)}
#cs .vp-bar:active{transform:translateY(1px) scale(.995);box-shadow:var(--c-press);transition-duration:.06s}
#cs .vp-bar:focus-visible{outline:2.5px solid var(--c-ring);outline-offset:3px}
#cs .vp-bar b{font-family:"Cormorant Garamond",Georgia,serif;font-size:20px;font-weight:600}
#cs .vp-bar .vp-sum{margin-left:auto;display:flex;gap:8px;align-items:center;flex-wrap:wrap;justify-content:flex-end}
#cs .vp-bar .vp-car{width:9px;height:9px;border-right:2px solid var(--c-ink3);border-bottom:2px solid var(--c-ink3);transform:rotate(45deg);transition:transform .25s;margin-left:4px}
#cs .vp.open .vp-bar .vp-car{transform:rotate(-135deg)}
#cs .vp-body{display:none;grid-template-columns:minmax(0,1.35fr) minmax(0,.85fr);gap:14px}
#cs .vp.open .vp-body{display:grid;animation:vpIn .35s cubic-bezier(.2,.9,.3,1) both}
@keyframes vpIn{from{opacity:0;transform:translateY(-6px)}to{opacity:1;transform:none}}
@media (max-width:900px){#cs .vp.open .vp-body{grid-template-columns:minmax(0,1fr)}}
#cs .vp-col{display:grid;gap:10px;align-content:start;min-width:0}
#cs .vp-chip{display:inline-flex;align-items:center;gap:6px;font-size:12px;font-weight:600;border-radius:999px;padding:5px 10px;background:var(--c-accs);color:var(--c-acc);white-space:nowrap}
#cs .vp-chip i{width:7px;height:7px;border-radius:50%;background:currentColor;display:block}
#cs .vp-chip.ok{background:var(--c-oks);color:var(--c-ok)}#cs .vp-chip.warn{background:var(--c-warns);color:var(--c-warn)}#cs .vp-chip.bad{background:var(--c-bads);color:var(--c-bad)}
/* each thing to send: a card that lifts under the pointer (her change) */
#cs .vp-item{display:grid;grid-template-columns:minmax(0,1fr) minmax(150px,.55fr);gap:10px 14px;align-items:center;border:1px solid var(--c-hair);border-radius:14px;background:linear-gradient(var(--c-a),var(--c-b));padding:12px 14px;
  box-shadow:var(--c-pill,var(--c-pop));transition:transform .2s cubic-bezier(.2,.9,.3,1.3),box-shadow .2s}
#cs .vp-item:hover{transform:translateY(-3px);box-shadow:var(--c-pophi)}
#cs .vp-item>.vp-lv{grid-column:1/-1;justify-self:start}
@media (max-width:760px){#cs .vp-item{grid-template-columns:minmax(0,1fr)}}
#cs .vp-item h4{margin:0;font-family:"Cormorant Garamond",Georgia,serif;font-size:18px;font-weight:600;color:var(--c-ink1)}
#cs .vp-q{font-size:12.5px;color:var(--c-ink2);border-left:3px solid var(--c-accs);padding-left:8px;margin-top:5px}
#cs .vp-fn{margin-top:6px;width:100%;max-width:340px;font:500 12px/1.3 ui-monospace,"SF Mono",Menlo,Consolas,monospace;color:var(--c-ink2);background:var(--c-wellbg);border:1px solid var(--c-hair2);border-radius:8px;padding:6px 8px;box-shadow:var(--c-well)}
#cs .vp-fn:focus{outline:2px solid var(--c-ring);outline-offset:1px}
#cs .vp-w{display:grid;gap:5px;font-size:12.5px;color:var(--c-ink3);min-width:0}
#cs .vp-w b.over{color:var(--c-bad)}
#cs .vp-m{height:9px;border-radius:999px;background:var(--c-wellbg);box-shadow:var(--c-well);overflow:hidden}
#cs .vp-m span{display:block;height:100%;border-radius:999px;background:linear-gradient(90deg,#8d68d3,var(--c-acc))}
#cs .vp-m.over span{background:linear-gradient(90deg,#d16a76,var(--c-bad))}
/* the lever: four notches in a slot; the one set stands raised */
#cs .vp-lv{display:inline-grid;grid-template-columns:repeat(4,auto);gap:2px;background:var(--c-wellbg);border-radius:11px;padding:3px;box-shadow:var(--c-well)}
#cs .vp-lv button{appearance:none;border:0;background:none;color:var(--c-ink3);font:600 12px/1 Inter,system-ui,sans-serif;padding:8px 9px;border-radius:8px;cursor:pointer;transition:transform .18s,box-shadow .18s,color .18s}
#cs .vp-lv button:hover{transform:translateY(-1px);color:var(--c-ink1)}
#cs .vp-lv button[aria-checked="true"]{background:linear-gradient(var(--c-a),var(--c-b));color:var(--c-ink1);box-shadow:var(--c-pop)}
#cs .vp-lv button[aria-checked="true"][data-v="3"]{background:linear-gradient(var(--rm-pa,#7348be),var(--rm-pb,#5d37a1));color:#fff}
#cs .vp-lv button:focus-visible{outline:2px solid var(--c-ring);outline-offset:1px}
/* the final check: ticks that lift and sink */
#cs .vp-tick{display:flex;gap:10px;align-items:flex-start;width:100%;text-align:left;appearance:none;border:1px solid var(--c-hair);background:linear-gradient(var(--c-a),var(--c-b));color:var(--c-ink1);border-radius:12px;padding:9px 12px;cursor:pointer;font:500 13px/1.4 Inter,system-ui,sans-serif;
  box-shadow:var(--c-pop);transition:transform .2s cubic-bezier(.2,.9,.3,1.3),box-shadow .2s}
#cs .vp-tick:hover{transform:translateY(-2px);box-shadow:var(--c-pophi)}
#cs .vp-tick:active{transform:translateY(1px);box-shadow:var(--c-press)}
#cs .vp-tick[disabled]{cursor:default}#cs .vp-tick[disabled]:hover{transform:none;box-shadow:var(--c-pop)}
#cs .vp-box{flex:0 0 18px;height:18px;border-radius:5px;border:1.5px solid var(--c-hair);background:var(--c-card);margin-top:1px;display:grid;place-items:center;box-shadow:var(--c-well)}
#cs .vp-tick[aria-checked="true"] .vp-box{background:var(--c-ok);border-color:var(--c-ok)}
#cs .vp-tick[aria-checked="true"] .vp-box::after{content:"";width:9px;height:5px;border:2px solid #fff;border-top:0;border-right:0;transform:rotate(-45deg) translate(1px,-1px)}
#cs .vp-tick small{display:block;color:var(--c-ink3);font-size:11.5px;margin-top:2px}
#cs .vp-note{font-size:12.5px;color:var(--c-ink3);margin:0}
#cs .vp-col>.c-btn{justify-self:start}
@media (prefers-reduced-motion:reduce){#cs .vp-bar,#cs .vp-item,#cs .vp-tick,#cs .vp-lv button{transition:none}#cs .vp-bar:hover,#cs .vp-item:hover,#cs .vp-tick:hover{transform:none}#cs .vp.open .vp-body{animation:none}}
body[data-motion="minimal"] #cs .vp-item:hover,body[data-motion="minimal"] #cs .vp-bar:hover,body[data-motion="minimal"] #cs .vp-tick:hover{transform:none}
</style>
<script>try{(window.__ingParts=window.__ingParts||{})["p382"]="started";}catch(_){}
/* R382 · Vocatio's submission pack and its dates in Vesta: see the note at the top of its styles. window.IngPack: {paint, of, todayRows} */
(function(){"use strict";var W=window,D=document;
function h(tag,cls,txt){var e=D.createElement(tag);if(cls)e.className=cls;if(txt!=null)e.textContent=txt;return e;}
function S(){try{return IngCareer.state();}catch(e){return null;}}
function snd(){try{if(W.IngSound&&IngSound.play)IngSound.play("keys");}catch(e){}}
var STATES=["To write","Drafted","Checked","Final"];
var OPEN={};/* which applications have their pack unfolded, while Ingenium is open */
function packOf(o){if(!o.pack||typeof o.pack!=="object")o.pack={};var P=o.pack;if(!P.items||typeof P.items!=="object")P.items={};if(!P.final||typeof P.final!=="object")P.final={};return P;}
function itemsOf(o){var C=o.check;if(!C||!Array.isArray(C.items))return [];return C.items.filter(function(x){return x&&x.text;});}
/* her surname and first name, from her profile: "Ada Lovelace" gives Lovelace_Ada */
function nameBit(prof){var n=String((prof&&prof.name)||"").replace(/[^A-Za-zÀ-ſ' -]/g," ").trim().split(/\s+/).filter(function(w){return w.length>1||/^[A-Z]$/.test(w)===false;});
  if(!n.length)return "Surname_Firstname";var first=n[0],last=n[n.length-1];return n.length>1?last+"_"+first:first;}
/* the posting's own word for a thing (the checklist's): "Your CV" is CV, "A research proposal" is Research proposal */
function label(it){return String(it.text||"").replace(/^(?:a|an|the|your)\s+/i,"").replace(/\s*\([^)]*\)\s*$/,"").replace(/\s+of your degrees?$/i,"").replace(/^./,function(c){return c.toUpperCase();});}
function title(it){return String(it.text||"").replace(/^(?:a|an|the)\s+/i,"").replace(/^./,function(c){return c.toUpperCase();});}
function fileFor(it,A,prof){if(it.doc==="ref")return "";var w=label(it).replace(/[^A-Za-z0-9À-ſ ]+/g," ").trim().split(/\s+/).slice(0,5).map(function(x){return x.charAt(0).toUpperCase()+x.slice(1);}).join("_");
  return nameBit(prof)+"_"+(w||"Document")+".pdf";}
/* where a thing stands: hers when she set it; else read from Vocatio (a document written, then examined; a checklist tick is Final) */
function stateOf(o,it){var P=packOf(o),s=P.items[it.id];if(s&&typeof s.s==="number")return s.s;if(it.done)return 3;var d=it.doc&&o.docs&&o.docs[it.doc];if(!d)return 0;return d.chk&&d.chk.exam!=null?2:1;}
function setState(o,it,v,A){var P=packOf(o);P.items[it.id]=Object.assign(P.items[it.id]||{},{s:v,at:Date.now()});it.done=v===3;A.save();}
function placeholders(t){var m=String(t||"").match(/\[[^\]\n]{1,80}\]/g)||[];return m.filter(function(x){return !/^\[\d+(?:\s*[,–-]\s*\d+)*\]$/.test(x);});}
var CHECKS=[["name","Your name is spelt the same in every document"],["dates","Every date matches your CV"],["refs","Your referees have the posting and its closing date"],["files","Each file is in the form the portal takes, under its size"]];
function paint(o,P,A){if(!o||!P||!P.body||!A)return;var items=itemsOf(o);var box=h("section","vp"+(OPEN[o.id]?" open":""));box.setAttribute("aria-label","Your submission pack");
  var bar=h("button","vp-bar");bar.type="button";bar.setAttribute("aria-expanded",String(!!OPEN[o.id]));bar.appendChild(h("b",null,"Your submission pack"));var sum=h("span","vp-sum");bar.appendChild(sum);bar.appendChild(h("span","vp-car"));
  bar.addEventListener("click",function(){OPEN[o.id]=!OPEN[o.id];box.classList.toggle("open",!!OPEN[o.id]);bar.setAttribute("aria-expanded",String(!!OPEN[o.id]));snd();});box.appendChild(bar);
  var body=h("div","vp-body"),L=h("div","vp-col"),R=h("div","vp-col");body.appendChild(L);body.appendChild(R);box.appendChild(body);P.body.appendChild(box);
  if(!items.length){sum.appendChild(h("span","vp-chip","Find what it asks for first"));L.appendChild(h("p","vp-note","The pack is made from the checklist: what the posting asks you to send, in its own words. Open 3 Checklist and press Find what it asks for."));return;}
  var prof=A.profile?A.profile():null,texts={};
  function chips(){sum.innerHTML="";var fin=items.filter(function(it){return stateOf(o,it)===3;}).length,c=h("span","vp-chip "+(fin===items.length?"ok":"warn"));c.appendChild(h("i"));c.appendChild(D.createTextNode(fin+" of "+items.length+" final"));sum.appendChild(c);
    var over=items.filter(function(it){return it.__over;}).length;if(over){var b=h("span","vp-chip bad");b.appendChild(h("i"));b.appendChild(D.createTextNode(over+" over its limit"));sum.appendChild(b);}}
  L.appendChild(h("p","vp-note","What this posting asks you to send, found in its own words. Set each one as it moves along; its limit and the file name the portal expects stay beside it."));
  Promise.resolve(A.postText?A.postText(o):"").then(function(post){
    items.forEach(function(it){var card=h("div","vp-item"),a=h("div"),w=h("div","vp-w"),pk=packOf(o).items[it.id]||{};
      a.appendChild(h("h4",null,title(it)));if(it.quote)a.appendChild(h("div","vp-q","“"+it.quote+"”"));
      if(it.doc==="ref")a.appendChild(h("div","vp-q","Asked of your referees through the portal; Vocatio's referees list keeps who and when."));
      else{var fn=h("input","vp-fn");fn.type="text";fn.value=pk.f||fileFor(it,A,prof);fn.setAttribute("aria-label",(it.text||"This document")+": the file name the portal expects");
        fn.addEventListener("change",function(){var P0=packOf(o);P0.items[it.id]=Object.assign(P0.items[it.id]||{},{f:fn.value.trim()});A.save();});a.appendChild(fn);}
      var lim=it.doc&&A.limitFor?A.limitFor(post,it.doc):null,d=it.doc&&o.docs&&o.docs[it.doc];
      function words(n){w.innerHTML="";if(lim&&lim.words){var over=n>lim.words;it.__over=over;var s=h("span");s.appendChild(D.createTextNode(n.toLocaleString("en-GB")+" of "+lim.words.toLocaleString("en-GB")+" words"));
          if(over){s.appendChild(D.createTextNode(" · "));s.appendChild(h("b","over",(n-lim.words).toLocaleString("en-GB")+" over"));}w.appendChild(s);var m=h("div","vp-m"+(over?" over":"")),f=h("span");f.style.width=Math.min(100,n/lim.words*100).toFixed(0)+"%";m.appendChild(f);w.appendChild(m);}
        else if(lim&&lim.pages)w.appendChild(h("span",null,"Up to "+lim.pages+" page"+(lim.pages>1?"s":"")+(n?"; "+n.toLocaleString("en-GB")+" words written":"")));
        else w.appendChild(h("span",null,d?(n?n.toLocaleString("en-GB")+" words; no limit given":"Written"):it.doc&&it.doc!=="ref"?"Not written yet":"No word limit given"));chips();}
      words(0);if(d&&d.ref&&A.loadText)A.loadText(d.ref).then(function(t){texts[it.id]=t;words(A.wordCount?A.wordCount(t):String(t||"").split(/\s+/).length);ph();});
      var lv=h("div","vp-lv");lv.setAttribute("role","radiogroup");lv.setAttribute("aria-label",(it.text||"This item")+": where it stands");
      function paintLv(){var cur=stateOf(o,it);[].forEach.call(lv.children,function(b,j){b.setAttribute("aria-checked",String(j===cur));b.tabIndex=j===cur?0:-1;});}
      STATES.forEach(function(st,j){var b=h("button",null,st);b.type="button";b.setAttribute("role","radio");b.setAttribute("data-v",String(j));
        b.addEventListener("click",function(){setState(o,it,j,A);paintLv();chips();ready();snd();});
        b.addEventListener("keydown",function(e){var k=e.key==="ArrowRight"?1:e.key==="ArrowLeft"?-1:0;if(!k)return;e.preventDefault();var v=Math.max(0,Math.min(3,stateOf(o,it)+k));setState(o,it,v,A);paintLv();chips();ready();lv.children[v].focus();});lv.appendChild(b);});
      paintLv();card.appendChild(a);card.appendChild(w);card.appendChild(lv);L.appendChild(card);});
    chips();});
  /* the final check */
  R.appendChild(h("h4","c-h3","The final check"));var fin=packOf(o).final,ticks=[];
  CHECKS.forEach(function(c){var b=h("button","vp-tick");b.type="button";b.setAttribute("role","checkbox");b.setAttribute("aria-checked",String(!!fin[c[0]]));b.appendChild(h("span","vp-box"));b.appendChild(h("span",null,c[1]));
    b.addEventListener("click",function(){fin[c[0]]=!fin[c[0]];b.setAttribute("aria-checked",String(!!fin[c[0]]));A.save();ready();snd();});ticks.push(b);R.appendChild(b);});
  var auto=h("button","vp-tick");auto.type="button";auto.disabled=true;auto.setAttribute("role","checkbox");auto.appendChild(h("span","vp-box"));var at=h("span",null,"No square brackets left in any document");var as=h("small",null,"Vocatio reads each document for you.");at.appendChild(as);auto.appendChild(at);R.appendChild(auto);
  function ph(){var left=[];items.forEach(function(it){var p=placeholders(texts[it.id]);if(p.length)left.push(title(it)+": "+p.slice(0,2).join(", "));});
    auto.setAttribute("aria-checked",String(!left.length));as.textContent=left.length?"Still to fill: "+left.join("; ")+".":"Vocatio read each document: none left.";if(ex)ready();}
  var ex=null;
  ex=A.button?A.button("pri","Export the pack",function(){exportPack(o,A,prof,items);}):h("button","c-btn c-pri","Export the pack");if(!A.button){ex.type="button";ex.addEventListener("click",function(){exportPack(o,A,prof,items);});}
  R.appendChild(ex);var note=h("p","vp-note");R.appendChild(note);
  function ready(){var notFinal=items.filter(function(it){return stateOf(o,it)!==3;}),unticked=CHECKS.filter(function(c){return !fin[c[0]];}),bracket=auto.getAttribute("aria-checked")!=="true";
    var ok=!notFinal.length&&!unticked.length&&!bracket;ex.disabled=!ok;
    if(!ex||!note)return;note.textContent=ok?"Every item is final and every check ticked: the pack is ready.":"The pack exports when "+[notFinal.length?(notFinal.length===1?"one item is":notFinal.length+" items are")+" not final yet":"",unticked.length?(unticked.length===1?"one check is":unticked.length+" checks are")+" not ticked":"",bracket?"a document still has square brackets":""].filter(Boolean).join(", and ")+".";}
  ph();}
/* the pack, as the folder the portal will receive: each document as its Word file, named as the portal expects */
function exportPack(o,A,prof,items){if(!A.exportPack){try{IngCareer.say&&IngCareer.say("This copy of the page cannot make the folder.");}catch(e){}return;}
  var list=items.filter(function(it){return it.doc&&it.doc!=="ref"&&o.docs&&o.docs[it.doc];}).map(function(it){var pk=packOf(o).items[it.id]||{};return {kind:it.doc,name:String(pk.f||fileFor(it,A,prof)).replace(/\.pdf$/i,"")};});
  var others=items.filter(function(it){return !(it.doc&&o.docs&&o.docs[it.doc]);}).map(function(it){return it.text;});
  return A.exportPack(o,list,"Your submission pack for "+(o.title||"this application")+".\n\nEach document is here as the PDF the portal will receive, named as it expects, made as Save as PDF makes it; the same document is in Word/ as a Word file, to keep writing.\n"+
    (others.length?"\nNot in this folder, as they are not documents Vocatio writes: "+others.join("; ")+".\n":"")+"\nNothing here was sent anywhere: the files were made on this device.");}

/* ---------- its dates in Vesta's Today ---------- */
function days(d){if(!d)return null;var a=new Date(String(d).slice(0,10)+"T12:00:00"),t=new Date();if(isNaN(a))return null;t.setHours(12,0,0,0);return Math.round((a-t)/864e5);}
function when(n){return n<0?"closed "+(-n)+" day"+(n===-1?"":"s")+" ago":n===0?"closes today":n===1?"closes tomorrow":"closes in "+n+" days";}
/* the closing date: Vocatio keeps it in o.due (a date, set in Track or read from the posting); o.closes holds the posting's own words */
function dueOf(o){var d=String(o.due||"");if(/^\d{4}-\d{2}-\d{2}/.test(d))return d.slice(0,10);var c=String(o.closes||"");return /^\d{4}-\d{2}-\d{2}/.test(c)?c.slice(0,10):"";}
/* only an application still to send: considering or preparing */
var OPEN_ST={considering:1,preparing:1};
function dateWords(d){try{return new Date(String(d).slice(0,10)+"T12:00:00").toLocaleDateString("en-GB",{weekday:"long",day:"numeric",month:"long"});}catch(e){return d;}}
function openApp(o){try{var s=S();s.ui.room="apps";s.ui.open=o.id;s.ui.show="work";go("career");IngCareer.render();}catch(e){}}
var RING=[7,3,1];
function ring(o,n){if(n==null||n<0)return;var R=o.vesta&&typeof o.vesta==="object"?o.vesta:(o.vesta={});RING.forEach(function(t){if(n<=t&&!R[t]&&n>=0){R[t]=Date.now();
    var txt=(t===7?"A week before":t===3?"Three days before":"The day before")+": "+(o.title||"An application")+(o.org?", "+o.org:"")+" closes "+dateWords(dueOf(o))+".";
    try{if(!Array.isArray(state.reminders))state.reminders=[];state.reminders.unshift({id:"vr"+o.id+t,text:txt,at:Date.now(),from:"vocatio"});if(typeof bellRefresh==="function")bellRefresh();}catch(e){}
    try{saveState();}catch(e){}}});}
function todayRows(){var s=S();if(!s||!Array.isArray(s.opps))return [];var rows=[];
  s.opps.filter(function(o){return o&&dueOf(o)&&(!o.stage||OPEN_ST[o.stage]);}).map(function(o){return {o:o,n:days(dueOf(o))};})
    .filter(function(x){return x.n!=null&&x.n>=0&&x.n<=14;}).sort(function(a,b){return a.n-b.n;}).slice(0,4).forEach(function(x){ring(x.o,x.n);
      rows.push({ico:"📅",essential:x.n<=3,text:(x.o.title||"An application")+(x.o.org?", "+x.o.org:"")+" "+when(x.n)+" ("+dateWords(dueOf(x.o))+").",acts:[["Open it",function(){openApp(x.o);}]]});});
  /* a referee asked ten days ago or more, and not yet heard from (r188's own rule, line 2030) */
  s.opps.forEach(function(o){(o.refs||[]).forEach(function(r){if(r&&r.status==="asked"&&r.asked&&Date.now()-r.asked>=10*864e5)rows.push({ico:"✉️",text:"Follow up with "+(r.name||"your referee")+", asked "+Math.floor((Date.now()-r.asked)/864e5)+" days ago for "+(o.title||"an application")+".",acts:[["Open it",function(){openApp(o);}]]});});});
  try{var steps=IngCareer.peopleSteps?IngCareer.peopleSteps():[];steps.filter(function(p){var n=days(p.due);return n!=null&&n<=0;}).slice(0,3).forEach(function(p){rows.push({ico:"✉️",text:p.text+(days(p.due)<0?" (it was due "+dateWords(p.due)+")":", today")+".",acts:[["Open People",function(){try{var s2=S();s2.ui.room="people";go("career");IngCareer.render();}catch(e){}}]]});});}catch(e){}
  return rows;}
try{(W.__ingTodayRows=W.__ingTodayRows||[]).push(todayRows);}catch(e){}
W.IngPack={version:1,paint:paint,of:packOf,stateOf:stateOf,fileFor:function(it,docs,prof){return fileFor(it,{docs:docs},prof);},todayRows:todayRows,placeholders:placeholders};
try{window.__ingParts["p382"]="running";}catch(_){}
})();
</script>
