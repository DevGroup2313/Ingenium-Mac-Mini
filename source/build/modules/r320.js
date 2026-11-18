<style id="r320-css">
/* ============ R320 · TERMS AND PRIVACY, IN SETTINGS, OWNERSHIP (Ingenium 7.37, 18 November 2026) ============
   Her request (18 November 2026): "I want Ingenium to have a Terms and Conditions and a Privacydiclosure or something of that nature to
   protect me and my app and future company and anything else that it might be needing." Her answers: the maker's name, "My own name";
   the law, "Both the US and the UK."; the contact, "I want to be able to fill it in later inside of the app." Her word on the live
   preview (https://claude.ai/artifact/1kH45upUM246ucJN89phJm, source/previews/terms): "I approve of the preview, please commit and push
   it everywhere."
   A card beside the licence (modules/r173.js lists it in Ownership): In short, the Privacy notice, the Terms of use, and in the master
   edition Your contact. Every statement was checked against the code (the 7.36 handoff's privacy facts). It is a first draft, not legal
   advice: a lawyer in the US and the UK reads it before it is final, so the master edition says Draft. Also: one line on the welcome
   (By using Ingenium you accept its terms, with a key to read them), and Settings, Security links to the Privacy notice.
   The same text travels as TERMS.txt and PRIVACY.txt beside LICENCE.txt in the apps' repositories. */
#termsCard{--sc-lav-t:rgba(106,63,181,.14);--sc-lav-c:#6a3fb5;--sc-sky-t:rgba(74,160,240,.16);--sc-sky-c:#2f6fd0;--sc-amb-t:rgba(232,144,42,.16);--sc-amb-c:#b4600f;--sc-emr-t:rgba(31,157,99,.14);--sc-emr-c:#1a7f50;--sc-rub-t:rgba(200,20,60,.1);--sc-rub-c:#b8433f;
  --sc-ck:inset 0 1.5px 0 rgba(255,255,255,.95),inset 0 -3px 5px rgba(60,30,90,.16),0 1px 1px rgba(40,20,70,.3),0 3px 4px rgba(40,20,70,.24),0 6px 9px rgba(40,20,70,.18),0 12px 20px rgba(40,20,70,.12);
  --sc-ckhi:inset 0 1.5px 0 #fff,inset 0 -3px 5px rgba(60,30,90,.14),0 3px 4px rgba(40,20,70,.24),0 9px 16px rgba(40,20,70,.2),0 16px 26px rgba(40,20,70,.14);
  --sc-well:rgba(34,26,46,.035);--sc-line:var(--hairline,rgba(34,26,46,.1));--sc-hi:0 2px 0 rgba(40,22,68,.08),0 8px 16px rgba(40,22,68,.1),0 18px 38px rgba(40,22,68,.12)}
body[data-theme="night"] #termsCard{--sc-lav-t:rgba(183,156,230,.15);--sc-lav-c:#b79ce6;--sc-sky-t:rgba(124,196,255,.15);--sc-sky-c:#7cc4ff;--sc-amb-t:rgba(240,176,96,.15);--sc-amb-c:#f0b060;--sc-emr-t:rgba(64,192,128,.15);--sc-emr-c:#6fd8a2;--sc-rub-t:rgba(240,120,120,.14);--sc-rub-c:#f08a86;
  --sc-ck:inset 0 1.5px 0 rgba(255,255,255,.16),inset 0 -3px 5px rgba(0,0,0,.45),0 1px 1px rgba(0,0,0,.65),0 3px 4px rgba(0,0,0,.55),0 6px 9px rgba(0,0,0,.45),0 12px 20px rgba(0,0,0,.32);
  --sc-ckhi:inset 0 1.5px 0 rgba(255,255,255,.2),inset 0 -3px 5px rgba(0,0,0,.4),0 3px 4px rgba(0,0,0,.6),0 9px 16px rgba(0,0,0,.5),0 16px 26px rgba(0,0,0,.4);
  --sc-well:rgba(10,6,18,.35);--sc-hi:0 2px 0 rgba(0,0,0,.45),0 10px 20px rgba(0,0,0,.42),0 20px 40px rgba(0,0,0,.4)}
#termsCard .sc-sub{display:inline-flex;align-items:center;gap:6px;border:1px solid var(--sc-line);background:linear-gradient(var(--card-hi,#fff),var(--card-lo,#f9f7fc));box-shadow:var(--pop,0 2px 0 rgba(40,22,68,.25));color:var(--ink-2,#4a4358);font:600 12.8px/1.2 var(--sans,system-ui);padding:6px 13px;border-radius:12px;cursor:pointer;transition:transform .16s cubic-bezier(.34,1.35,.64,1),box-shadow .16s}
#termsCard .sc-sub:hover{transform:translateY(-2px);box-shadow:var(--pop-hi,var(--pop))}
#termsCard .sc-sub[aria-selected="true"]{color:#fff;background:linear-gradient(180deg,#7348be,#5d37a1);border-color:#4b2a86;box-shadow:inset 0 1px 0 rgba(255,255,255,.24),0 1px 0 #3a2070,0 3px 6px rgba(52,24,100,.26),0 8px 14px rgba(52,24,100,.12)}
#termsCard .sc-chip{display:inline-flex;align-items:center;font:600 11.5px/1 var(--sans,system-ui);padding:5px 9px;border-radius:999px;background:var(--sc-lav-t);color:var(--sc-lav-c);white-space:nowrap}
#termsCard .sc-chip.ok{background:var(--sc-emr-t);color:var(--sc-emr-c)} #termsCard .sc-chip.off{background:var(--sc-rub-t);color:var(--sc-rub-c)} #termsCard .sc-chip.soon{background:var(--sc-well);color:var(--ink-3,#6c6579);border:1px solid var(--sc-line)}
#termsCard .sc-well{border:1px solid var(--sc-line);border-radius:11px;background:var(--sc-well);padding:10px 12px;display:flex;flex-direction:column;gap:7px;transition:transform .2s cubic-bezier(.2,.9,.25,1.2),box-shadow .2s}
#termsCard .sc-well:hover{transform:translateY(-1.5px);box-shadow:var(--sc-hi)}
#termsCard .sc-wh{display:flex;justify-content:space-between;gap:8px;align-items:center;flex-wrap:wrap} #termsCard .sc-wh b{color:var(--ink-1,#221a2e);font-size:13.5px}
#termsCard .sc-well p,#termsCard .sc-pb > p{margin:0;font-size:12.8px;line-height:1.55;color:var(--ink-2,#4a4358)}
#termsCard .sc-fine{font-size:12px;color:var(--ink-3,#6c6579)}
#termsCard .sc-key{display:inline-flex;align-items:center;gap:6px;border:1px solid transparent;font:600 12.5px/1.3 var(--sans,system-ui);padding:6px 11px;border-radius:7px;white-space:nowrap;cursor:pointer;box-shadow:var(--sc-ck);transition:transform .16s cubic-bezier(.34,1.35,.64,1),box-shadow .16s}
#termsCard .sc-key:hover{transform:translateY(-3px);box-shadow:var(--sc-ckhi)} #termsCard .sc-key:active{transform:translateY(1px)}
#termsCard .sc-key.lav{background:var(--sc-lav-t);border-color:var(--sc-lav-t);color:var(--sc-lav-c)} #termsCard .sc-key.sky{background:var(--sc-sky-t);border-color:var(--sc-sky-t);color:var(--sc-sky-c)}
#termsCard .sc-key.amb{background:var(--sc-amb-t);border-color:var(--sc-amb-t);color:var(--sc-amb-c)} #termsCard .sc-key.emr{background:var(--sc-emr-t);border-color:var(--sc-emr-t);color:var(--sc-emr-c)}
#termsCard .sc-key.pri{background:linear-gradient(180deg,#7348be,#5d37a1);border-color:#4b2a86;color:#fff;border-radius:10px;padding:8px 14px;box-shadow:inset 0 1px 0 rgba(255,255,255,.24),0 1px 0 #3a2070,0 3px 6px rgba(52,24,100,.26),0 8px 14px rgba(52,24,100,.12)}
#termsCard .tp-head{display:flex;gap:12px;align-items:flex-start}
#termsCard .tp-coin{width:44px;height:44px;border-radius:14px;display:grid;place-items:center;flex:0 0 auto;background:linear-gradient(var(--card-hi,#fff),var(--card-lo,#f9f7fc));box-shadow:var(--sc-ck);color:var(--accent,#6a3fb5);transition:transform .45s cubic-bezier(.2,.9,.25,1.2)}
#termsCard .tp-coin:hover{transform:rotate(-6deg) scale(1.05)}
#termsCard .tp-coin svg{width:24px;height:24px;fill:none;stroke:currentColor;stroke-width:1.6;stroke-linecap:round;stroke-linejoin:round}
#termsCard .tp-sub{margin:2px 0 0;color:var(--ink-2,#4a4358);font-size:13.3px;max-width:68ch}
#termsCard .tp-chips{display:flex;gap:6px;flex-wrap:wrap;margin:12px 0 10px}
#termsCard .tp-parts{display:flex;gap:8px;flex-wrap:wrap;margin:4px 0 14px}
#termsCard .tp-shorts{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:10px}
@media (max-width:900px){#termsCard .tp-shorts{grid-template-columns:repeat(2,minmax(0,1fr))}}
@media (max-width:520px){#termsCard .tp-shorts{grid-template-columns:minmax(0,1fr)}}
#termsCard .tp-short{border-radius:14px;padding:13px 14px;background:var(--sc-well);border:1px solid var(--sc-line);transition:transform .35s cubic-bezier(.2,.9,.25,1.2),box-shadow .25s}
#termsCard .tp-short:hover{transform:translateY(-3px);box-shadow:var(--sc-hi)}
#termsCard .tp-short b{display:block;color:var(--ink-1,#221a2e);font:600 14px/1.35 var(--serif,Georgia,serif);margin-bottom:3px}
#termsCard .tp-short span{color:var(--ink-2,#4a4358);font-size:13px}
#termsCard .tp-doc{max-width:74ch;display:grid;gap:4px}
#termsCard .tp-sec{border-radius:12px;padding:10px 12px;transition:background-color .2s,transform .3s cubic-bezier(.2,.9,.25,1.2)}
#termsCard .tp-sec:hover{background:var(--sc-well);transform:translateX(2px)}
#termsCard .tp-sec h3{margin:0 0 3px;font:600 15px/1.35 var(--serif,Georgia,serif);color:var(--ink-1,#221a2e)}
#termsCard .tp-sec p,#termsCard .tp-sec li{margin:0;color:var(--ink-body,var(--ink-2,#2b2438));font-size:13.8px;line-height:1.6}
#termsCard .tp-sec ul{margin:3px 0 4px;padding-left:20px;display:grid;gap:3px}
#termsCard .tp-blank{background:var(--sc-amb-t);color:var(--sc-amb-c);border-radius:6px;padding:0 5px;font-weight:600}
#termsCard .tp-field{display:grid;gap:6px;max-width:460px}
#termsCard .tp-field label{font:600 12px/1.2 var(--sans,system-ui);color:var(--ink-2,#4a4358)}
#termsCard .tp-field input{font:14px/1.4 var(--sans,system-ui);padding:9px 12px;border-radius:11px;border:1px solid var(--sc-line);background:var(--card-hi,#fff);color:var(--ink-1,#221a2e);box-shadow:inset 0 2px 5px rgba(40,22,68,.08)}
#termsCard .tp-keys{display:flex;gap:8px;flex-wrap:wrap;margin-top:10px}
#introTerms{margin:10px 0 0;font-size:12.5px;line-height:1.5;opacity:.85}
#introTerms button{all:unset;cursor:pointer;text-decoration:underline;text-underline-offset:2px;font-weight:600}
#introTerms button:focus-visible{outline:2px solid currentColor;outline-offset:2px;border-radius:3px}
body.ing-minimal #termsCard *{transition:none!important}
@media (prefers-reduced-motion:reduce){#termsCard *{transition:none!important;animation:none!important}#termsCard *:hover{transform:none!important}}
</style>
<script>try{(window.__ingParts=window.__ingParts||{})["p320"]="started";}catch(_){}
/* R320 · Terms and privacy: see the note at the top of its styles. window.IngTerms */
(function(){"use strict";
var W=window,D=document;if(W.IngTerms)return;
var VERSION="Version 1, 18 November 2026";
var CONTACT0="";   /* the contact carried by every copy of a release (her own, written in at a release when she gives it) */
function ed(){try{return typeof ING_EDITION==="string"?ING_EDITION:"master";}catch(e){return "master";}}
function mine(){return ed()==="master";}
function hasPg(id){return !!D.getElementById("page-"+id);}
function esc(s){return String(s==null?"":s).replace(/[&<>"]/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c];});}
function toast(m){try{(W.ingToast||W.toast)(m);}catch(e){}}
function contact(){var c="";try{c=(W.state&&state.terms&&state.terms.contact)||"";}catch(e){}return String(c||CONTACT0||"").trim();}
function ct(){var c=contact();return c?'<b>'+esc(c)+'</b>':'<span class="tp-blank">the contact its maker adds</span>';}
var PRIV=[["1. Who this notice is from",function(){return "<p>Ingenium is made by Yannie D. Forest. Questions about this notice: "+ct()+".</p>";}],
 ["2. What Ingenium keeps, and where","<p>Your work stays on the device you use Ingenium on: chats, notes, memory, settings, projects, apps you make and their versions, documents, your career profile, signing keys, your sign-ins to services you link, and the keys you give it for online models. In a browser, in its own storage for Ingenium's page; in the computer apps, also in files in Ingenium's own folder; on a phone or tablet, in the app's own storage. None of it is sent to its maker.</p>"],
 ["3. Sealed with your password","<p>With protection on (Settings, Security), what Ingenium keeps is sealed with a key made from your password (AES-GCM, 256-bit), and backups are sealed whole. You also receive ten recovery words. If every way back in is lost, no one can open what is sealed. Settings, Security shows each protection's true state.</p>"],
 ["4. When Ingenium goes online","<p>Only when you use one of these, and only for that use:</p><ul><li>Downloading a model: Hugging Face.</li><li>An online model, with your own key: the provider you choose (for example Anthropic, OpenAI, Google or Moonshot AI).</li><li>A link to GitHub: GitHub.</li><li>Research and search tools: the services you ask, such as Crossref, OpenAlex, Europe PMC, arXiv, Open Library, Wikipedia, DuckDuckGo or Brave Search.</li><li>A job posting by its link: the posting's own site.</li><li>Dictation, on a copy without its speech files: those files, fetched once.</li></ul><p>Each service handles what it receives under its own privacy policy. Settings, Security, Offline only holds back every request to the internet until you allow it.</p>"],
 ["5. Between your own devices","<p>Your paired devices talk over your home network. Each device that pairs agrees on a key of its own with your computer, and you confirm four words on both screens; then everything between them is sealed end to end. A device paired before, or one that cannot seal, is guarded by the pairing code alone until it pairs again, and Settings shows which.</p>"],
 ["6. Your choices","<p>Its maker holds no data about you from Ingenium, so it is all in your hands on your device: see it, export it (Settings, Your data, Backup), delete it (Reset everything). For data an outside service holds, ask that service.</p>"],
 ["7. Children","<p>Ingenium is not made for children under <span class=\"tp-blank\">the age the lawyer sets</span>.</p>"],
 ["8. Changes","<p>A new version of this notice comes with a new release of Ingenium, with its date.</p>"]];
var TERMS=[["1. These terms and the licence","<p>These terms say how Ingenium may be used. Who owns it, and who may use, copy or share it, is set out in its licence (beside this card). If they ever differ, the licence applies.</p>"],
 ["2. Who may use Ingenium","<p>Its owner, and a person the owner has given a permission or a gift copy to, as the licence says.</p>"],
 ["3. What you make is yours","<p>Your writing, your apps and all else you make with Ingenium are yours (licence, clause 3.6). You are responsible for what you make and for having the right to use what you bring in.</p>"],
 ["4. Answers from AI models","<p>The models in Ingenium can be wrong, out of date, or invent facts, sources and quotes. Check what matters before you rely on it. Nothing a model writes is professional advice: not legal, medical, financial, immigration, admissions or career advice. Drafts made for you are yours to read, correct and send.</p>"],
 ["5. Models and services made by others","<p>Each model comes under its own licence (the Models page names it); each outside service has its own terms. Using one, you accept its terms.</p>"],
 ["6. Fair use","<p>Do not use Ingenium to break the law, to harm others, or to get around the protection of anyone else's copy or work.</p>"],
 ["7. Your password and your backups","<p>Keep your password and recovery words safe: they cannot be recovered for you. Keep your own backups.</p>"],
 ["8. No warranty and no liability","<p>Ingenium is provided as it is, as the licence says (clauses 11 and 12).</p>"],
 ["9. Ending, changes and the law","<p>A permission ends as the licence says (clause 7). These terms may change with a new release. The law that governs them is in the licence (clause 18), as settled for the United States and the United Kingdom.</p>"],
 ["10. Contact",function(){return "<p>"+ct()+"</p>";}]];
var SHORT=[["Your work stays on your device","Chats, notes, apps, documents and your profile are kept where you use Ingenium."],
 ["Nothing goes to its maker","No account with Yannie D. Forest, no analytics, no usage reports, no automatic update check."],
 ["Online only when you ask","A model download, an online model with your own key, GitHub, a search: only that service receives what you send it."],
 ["Sealed with your password","With protection on, what Ingenium keeps is sealed. Without your password or recovery words, no one can open it."],
 ["Sealed between your devices","Your paired devices talk with a key of their own: anyone else on the Wi-Fi sees only noise."],
 ["What you make is yours","Your writing and your apps belong to you (licence, clause 3.6). Check what a model writes before you rely on it."]];
function docHtml(list){return '<div class="tp-doc">'+list.map(function(x){var b=typeof x[1]==="function"?x[1]():x[1];return '<div class="tp-sec"><h3>'+esc(x[0])+'</h3>'+b+'</div>';}).join("")+'</div>';}
var VIEW="short";
function card(){var c=D.getElementById("termsCard");if(c)return c;var page=D.getElementById("page-settings");if(!page)return null;
  c=D.createElement("div");c.className="card";c.id="termsCard";var host=D.getElementById("ingPermitCard");
  if(host&&host.parentNode)host.parentNode.insertBefore(c,host.nextSibling);else page.appendChild(c);return c;}
function paint(){var c=card();if(!c)return;
  var parts=[["short","In short"],["privacy","Privacy notice"],["terms","Terms of use"]].concat(mine()?[["contact","Your contact"]]:[]);if(!mine()&&VIEW==="contact")VIEW="short";
  var h='<div class="tp-head"><span class="tp-coin" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M12 2.8l7.5 3v5.6c0 4.6-3.2 8.4-7.5 9.8-4.3-1.4-7.5-5.2-7.5-9.8V5.8z"/><path d="M9 11.5h6M9 14.5h4"/></svg></span><div><h2 class="sec" style="margin:0">Terms and privacy</h2><p class="tp-sub">What Ingenium does with your data, and the terms of using it. '+VERSION+'.</p></div></div>'
    +'<div class="tp-chips"><span class="sc-chip ok">Nothing sent to its maker</span><span class="sc-chip" style="background:var(--sc-sky-t);color:var(--sc-sky-c)">Works offline</span><span class="sc-chip" style="background:var(--sc-lav-t);color:var(--sc-lav-c)">Sealed with your password</span>'+(mine()?'<span class="sc-chip" style="background:var(--sc-amb-t);color:var(--sc-amb-c)">Draft: a lawyer reads it before it is final</span>':'')+'</div>'
    +'<div class="tp-parts" role="tablist" aria-label="Terms and privacy">'+parts.map(function(p){return '<button type="button" class="sc-sub" role="tab" data-p="'+p[0]+'" aria-selected="'+(VIEW===p[0])+'">'+p[1]+'</button>';}).join("")+'</div>';
  if(VIEW==="short")h+='<div class="tp-shorts">'+SHORT.map(function(s){return '<div class="tp-short"><b>'+esc(s[0])+'</b><span>'+esc(s[1])+'</span></div>';}).join("")+'</div>';
  else if(VIEW==="privacy")h+=docHtml(PRIV);
  else if(VIEW==="terms")h+=docHtml(TERMS);
  else h+='<div class="tp-field"><label for="tpContact">Your contact, for questions about these terms</label><input id="tpContact" type="text" autocomplete="off" placeholder="An email address or a web page" value="'+esc(contact())+'"></div>'
    +'<p class="sc-fine" style="margin-top:6px">Shown in the Privacy notice and the Terms in this copy. The gift and demo copies and the apps carry it from the next release made after you save it.</p>'
    +'<div class="tp-keys"><button type="button" class="sc-key pri" data-a="save">Save</button><button type="button" class="sc-key" data-a="clear">Clear</button></div>';
  c.innerHTML=h;
  [].forEach.call(c.querySelectorAll(".tp-parts .sc-sub"),function(t){t.onclick=function(){VIEW=t.getAttribute("data-p");paint();};});
  [].forEach.call(c.querySelectorAll("[data-a]"),function(k){k.onclick=function(){var a=k.getAttribute("data-a"),v=a==="save"?String((D.getElementById("tpContact")||{}).value||"").trim().slice(0,200):"";
    try{state.terms=state.terms||{};state.terms.contact=v;saveState();}catch(e){}toast(v?"Saved. The Privacy notice and the Terms now show it.":"Cleared.");paint();};});}
function show(v){VIEW=v||"privacy";try{go("settings");}catch(e){}try{IngRooms.open("settings","own",true);}catch(e){}paint();
  setTimeout(function(){var c=D.getElementById("termsCard");if(c)try{c.scrollIntoView({block:"start",behavior:"smooth"});}catch(e){}},300);}
/* the welcome: one line, with a key to read them */
function intro(){var d=D.getElementById("introDoor");if(!d||D.getElementById("introTerms"))return;var anchor=D.getElementById("introEnter");
  var p=D.createElement("p");p.id="introTerms";p.innerHTML='By using Ingenium you accept its terms. <button type="button">Read them</button>';
  p.querySelector("button").onclick=function(){var k=D.getElementById("introEnter");if(k)k.click();setTimeout(function(){show("short");},400);};
  var row=anchor&&anchor.parentNode;if(row&&row.parentNode)row.parentNode.insertBefore(p,row.nextSibling);else d.appendChild(p);}
W.IngTerms={paint:paint,show:show,contact:contact,version:VERSION};
function boot(){paint();intro();}
if(D.readyState==="loading")D.addEventListener("DOMContentLoaded",boot);else boot();
W.addEventListener("load",function(){setTimeout(boot,600);});
})();
try{window.__ingParts["p320"]="running";}catch(_){}
</script>
