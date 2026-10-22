<style id="r108-62-css">
/* 6.2 · LECTOR: HOW IT READS IN VIEW, ASK LECTOR BESIDE THE THINKING, EVERY FUNCTION.
   The owner's words (22 October 2026): "I used to be able to select the type of reading I wanted done on Lector, I could
   choose between a quick reading and a more deeper and thorough analysis alongside the models that would be doing the
   reading, I want that restored into the Lector page"; "I want the compose text to send to Lector to further refine the
   documents to actually be read by Lector and actually adjust the documents"; "The Ask Lector section does not work and
   should probable be moved to another section on the page and be better intergrated"; "have Lector conduct a deep and
   thorough analysis of every app and alll of their functions". */
#lx7 .l-vh{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap}
#lx7 .l-how{display:flex;flex-direction:column;gap:7px}
#lx7 .l-how .l-doc input[type=radio]{accent-color:var(--l-acc);width:16px;height:16px;flex:0 0 auto;margin:0}
#lx7 .l-how .l-doc[aria-checked="true"],#lx7 .l-how .l-doc:has(input:checked){border-color:var(--l-ring);box-shadow:var(--l-pill),inset 0 0 0 1px var(--l-ring)}
#lx7 .l-how .l-doc .t small{display:block}
#lx7 .l-how-model{display:flex;flex-direction:column;gap:5px;margin-top:4px}
#lx7 .l-how-model > span{font-size:12px;font-weight:600;color:var(--l-ink2)}
#lx7 .l-how-model select{font:600 13px var(--l-sans);color:var(--l-ink1);background:linear-gradient(var(--l-a),var(--l-b));border:1px solid var(--l-hair);border-radius:10px;padding:7px 9px;box-shadow:var(--l-pill);max-width:100%}
#lx7 .l-how .l-sw{font-size:12.5px}
/* the middle panel's two tabs: the thinking, and Ask Lector */
#lx7 .l-mid{display:inline-flex;gap:2px;padding:3px;border-radius:11px;background:var(--l-wellbg);box-shadow:var(--l-well);border:1px solid var(--l-hair2);flex:0 0 auto}
#lx7 .l-mid button{border:0;background:transparent;color:var(--l-ink2);font:600 13px/1 var(--l-serif);letter-spacing:.04em;padding:7px 11px;border-radius:8px;cursor:pointer;display:inline-flex;align-items:center;gap:6px}
#lx7 .l-mid button[aria-selected="true"]{background:linear-gradient(var(--l-a),var(--l-b));color:var(--l-ink1);box-shadow:var(--l-pill)}
#lx7 .l-mid button:focus-visible{outline:2px solid var(--l-ring);outline-offset:1px}
#lx7 .l-mid .n{font:700 11px var(--l-sans);color:var(--l-acc)}
#lx7 #l7Read[data-mid="ask"] .l-codefold{display:none}
#lx7 .l-rd[hidden],#lx7 #l7Read[data-mid="ask"] > .l-rd{display:none !important}
/* Ask Lector, the whole of the middle panel */
#lx7 .l-cmp.l-askpane{flex:1 1 0;border-top:0;min-height:0}
#lx7 .l-cmp.l-askpane[hidden]{display:none}
#lx7 .l-askpane .l-cmp-intro{padding:10px 14px 0;font-size:12.5px;line-height:1.5;color:var(--l-ink3)}
#lx7 .l-askpane .l-cmp-reqs-h{padding:8px 14px 0;font-size:12px;font-weight:600;color:var(--l-ink2)}
#lx7 .l-askpane .l-cmp-th{flex:1 1 0;max-height:none;min-height:80px}
#lx7 .l-askpane .l-cmp-empty{flex:1 1 0;display:flex;align-items:center;justify-content:center;text-align:center;padding:18px;color:var(--l-ink3);font-size:13px;line-height:1.55}
#lx7 .l-askpane .l-cmp-m.lx .live{display:block;margin-top:6px;padding-top:6px;border-top:1px dashed var(--l-hair);color:var(--l-ink2);max-height:12em;overflow:auto;font-size:12.5px}
#lx7 .l-askdoc{margin-left:auto}
</style>
<script>try{(window.__ingParts=window.__ingParts||{})["p40"]="started";}catch(_){}
/* R108 · LECTOR'S NEW PAGE, AND WHAT IT CAN NOW DO
   Her requests, in her words (16 October and before): three live panels side by side, "so I can see the thinking
   and writing of the model as it reads the apps", "click and review its live code in the thinking panel"; "pick two
   apps or three apps ... and have it create documents that merge and speaks of the apps that I chose"; "a master
   project dossier or master project appendix that includes all four apps"; "upload a job posting and then have the
   documents be generated for that specific role ... the same thing for academic programmes"; "written with my own
   prose"; "Word docx ... PDFs and even HTML files"; "Their seals should not however, [be] placed on my resumes or
   cover letters"; "the best model ... for each device".
   What does not change: Lector's own reading (R86): the parts sized to the model, a note kept after every part, the
   notes joined, the analysis written section by section, everything resumable after a pause or a power cut.
   What is new: a set of one to four of her apps, read one after another (a reading already finished is used again);
   the documents written for the set, section by section, each from only the parts of the analysis it needs (the old
   writer cut the analysis short and lost its last sections); the posting or the programme, her CV, her own writing
   and her past letters, kept on this device and used in every document; a check of every figure against the
   measures; each document kept (the three before it too), never written over; and saving as Word, a web page,
   Markdown and PDF. */
(function r108Lector(){
if(typeof lxRender!=="function"||!document.getElementById("page-lector"))return;

/* ---------------- the apps, the documents ---------------- */
var APPS={cd:{name:"Carpe Diem",abbr:"CD",color:"#1B6B93",fill:"#EAF2F7",sub:"#454549"},forge:{name:"The Forge",abbr:"Forge",color:"#17577A",fill:"#F6F0E2",sub:"#8A6A22"},
  ingenium:{name:"Ingenium",abbr:"Ingenium",color:"#6A3FB5",fill:"#F1ECFA",sub:"#4B3A6E"},inkwell:{name:"Inkwell",abbr:"Inkwell",color:"#1F4F68",fill:"#F4EFE3",sub:"#8A6526"}};
var ORDER=["cd","forge","ingenium","inkwell"];
var KINDS=[["dossier","Project dossier","The full account, section by section"],["appendix","Appendix","Measured tables and the evidence"],
  ["portfolio","Portfolio piece","Two pages for your catalogue"],["cover","Cover letter","Fitted to the posting"],["cv","CV entry","Your projects, for your CV"],
  ["functions","Every function","Each app's screens, keys and functions, measured from its own code"]];
var HOUSE={dossier:"dossier",appendix:"appendix",portfolio:"summary",cover:"cover",cv:"cv",analysis:"summary",functions:"appendix"};
function nm(k){return APPS[k]?APPS[k].name:k;}
function sorted(a){return ORDER.filter(function(k){return (a||[]).indexOf(k)>=0;});}
function listNames(ks){var n=ks.map(nm);if(n.length<2)return n[0]||"";if(n.length===2)return n[0]+" and "+n[1];return n.slice(0,-1).join(", ")+" and "+n[n.length-1];}
function setName(a){a=sorted(a);return a.length===4?"The Offline Project":listNames(a);}
/* 6.1: the owner's words (20 October 2026): "two apps together is a duo, any trios should be presented as a variation of the offline project" */
function setKind(a){var n=sorted(a).length;return n===4?"all four":n===3?"a trio of The Offline Project":n===2?"a duo":n===1?"on its own":"";}
function docLabel(kind,a,purpose){var all=sorted(a).length===4;
  return {dossier:all?"Master project dossier":"Project dossier",appendix:all?"Master appendix":"Appendix",portfolio:"Portfolio piece",
    cover:purpose==="programme"?"Cover letter for the programme":"Cover letter",cv:"CV entry",analysis:"Notes and analysis",functions:all?"Every function, all four apps":"Every function"}[kind]||kind;}
function sealed(kind){return kind==="dossier"||kind==="appendix"||kind==="portfolio"||kind==="functions";}
function author(){try{return lxhAuthor()||"";}catch(e){return "";}}
function month(){try{return lxhMonth();}catch(e){return "";}}
function today(){try{return new Date().toLocaleDateString("en-GB",{day:"numeric",month:"long",year:"numeric"});}catch(e){return "";}}
function appOfText(t){try{var a=IngHouseDocs.apps(t);return a.length===1?a[0]:null;}catch(e){return null;}}

/* ---------------- the paper of each app (her word, 17 October): "give Inkwell's documents the Inkwell colour palette and
   design and the same for the Forge and Carpe Diem", and "the documents on the Lector page to have a dark mode look and
   not be white on dark mode". A document about one app is set in that app's own hand and colours, as its door shows
   them: Carpe Diem white with its ocean blue and gilt, The Forge cool white with its steel blue and the ember of its
   forge, Inkwell on warm laid paper in ink navy and brass, set in Cormorant as Inkwell is, Ingenium in amethyst. A
   document about two, three or all four is set as The Offline Project: vellum, ink and the master seal's gilt, each
   app's own sections in its own colour. Her CV and her letters stay plain. By night each paper is the app's own night:
   Carpe Diem's slate and sky blue, The Forge's charcoal and ember, Inkwell's midnight ink and brass, with the seals as
   each app shows them by night. Printed, a page is always the day paper. ---------------- */
var LX7_FONTS=/*R108_FONTS*/null;
/* 6.1: the fonts are shared with the new Home page (r147), so the page carries them once */
try{window.LX7_FONTS=LX7_FONTS;}catch(e){}
var SANS='-apple-system,BlinkMacSystemFont,"SF Pro Text","Segoe UI",Roboto,Helvetica,Arial,sans-serif',TIMES='"Times New Roman",Times,serif',GEORGIA='Georgia,"Iowan Old Style","Times New Roman",serif',
  CORM='"Lector Cormorant","Cormorant Garamond",Cormorant,Garamond,Georgia,serif',CINZEL='"Lector Cinzel",Cinzel,"Trajan Pro",Optima,Georgia,serif',IOWAN='"Iowan Old Style","Palatino Linotype",Palatino,"Book Antiqua",Georgia,serif';
var PT={
  neutral:{body:TIMES,disp:TIMES,caps:TIMES,h2:TIMES,fs:15,h1:24,h1w:700,h1ls:"0",capsw:600,capsls:".18em",capsfs:11.5,h2w:700,h2ls:"0",h2fs:16,
    day:{desk:"#efeaf4",bg:"#ffffff",tex:"none",ink:"#1e1828",ink2:"#454549",acc:"#2b2b33",title:"#1e1828",sub:"#454549",gold:"#8a7650",caps:"#8a7650",tint:"#f2f2f4",hair:"rgba(30,24,40,.14)",line:"rgba(30,24,40,.14)",rule:"#4a405a",code:"#f4f2f6",fill:"#8a6526",chk:"#b0302f",frame:"transparent",qbg:"transparent",qink:"#454549"},
    night:{desk:"#121016",bg:"#1e1c23",tex:"none",ink:"#ece9f1",ink2:"#b9b3c4",acc:"#e8e3ef",title:"#f4f1f8",sub:"#c9c2d4",gold:"#c9b07a",caps:"#c9b07a",tint:"rgba(255,255,255,.05)",hair:"rgba(255,255,255,.12)",line:"rgba(255,255,255,.12)",rule:"rgba(255,255,255,.42)",code:"rgba(255,255,255,.05)",fill:"#d9b77a",chk:"#e88a8a",frame:"transparent",qbg:"transparent",qink:"#b9b3c4"}},
  ingenium:{upper:1,orn:1,keys:1,body:TIMES,disp:IOWAN,caps:SANS,h2:TIMES,fs:15,h1:26,h1w:600,h1ls:".03em",capsw:700,capsls:".2em",capsfs:10.5,h2w:700,h2ls:"0",h2fs:16,
    day:{desk:"#efeaf4",bg:"#ffffff",tex:"none",ink:"#1e1828",ink2:"#4a4358",acc:"#6a3fb5",title:"#4e2c8a",sub:"#4b3a6e",gold:"#b88a3a",caps:"#6a3fb5",tint:"#f1ecfa",hair:"rgba(34,26,46,.12)",line:"rgba(106,63,181,.22)",rule:"#4a405a",code:"#f6f3fa",fill:"#8a6526",chk:"#b0302f",frame:"transparent",qbg:"#f6f2fc",qink:"#3d2f5c"},
    night:{desk:"#120e19",bg:"#221b2e",tex:"none",ink:"#ece6f6",ink2:"#c3b8d6",acc:"#c4a8f0",title:"#dccbff",sub:"#b7a5d6",gold:"#d8b46a",caps:"#c4a8f0",tint:"rgba(183,156,230,.10)",hair:"rgba(205,184,240,.13)",line:"rgba(196,168,240,.28)",rule:"rgba(205,184,240,.45)",code:"rgba(255,255,255,.05)",fill:"#e0be78",chk:"#f08f8f",frame:"transparent",qbg:"rgba(183,156,230,.08)",qink:"#d9cdee"}},
  cd:{roman:1,h3caps:1,body:GEORGIA,disp:GEORGIA,caps:SANS,h2:GEORGIA,fs:14.5,h1:27,h1w:700,h1ls:".02em",capsw:700,capsls:".22em",capsfs:10.5,h2w:700,h2ls:".01em",h2fs:16,
    day:{desk:"#f5f5f7",bg:"#ffffff",tex:"none",ink:"#1d1d1f",ink2:"#454549",acc:"#1b6b93",title:"#121218",sub:"#145671",gold:"#b88a3a",caps:"#1b6b93",tint:"#eaf2f7",hair:"rgba(27,107,147,.14)",line:"rgba(184,138,58,.55)",rule:"#1b6b93",code:"#f2f6f8",fill:"#8a6526",chk:"#b0302f",frame:"rgba(27,107,147,.40)",qbg:"#e9eff2",qink:"#173f53"},
    night:{desk:"#121013",bg:"#20262e",tex:"none",ink:"#e8e8ea",ink2:"#a9b0b8",acc:"#5baedb",title:"#f0ede6",sub:"#8fc4e6",gold:"#d9b45a",caps:"#5baedb",tint:"rgba(91,174,219,.10)",hair:"rgba(255,255,255,.10)",line:"rgba(217,180,90,.45)",rule:"rgba(91,174,219,.6)",code:"rgba(255,255,255,.05)",fill:"#e0be78",chk:"#e07a7a",frame:"rgba(91,174,219,.38)",qbg:"#1a2630",qink:"#dbe8f1"}},
  forge:{roman:1,body:GEORGIA,disp:GEORGIA,caps:SANS,h2:GEORGIA,fs:14.5,h1:27,h1w:700,h1ls:".02em",capsw:700,capsls:".22em",capsfs:10.5,h2w:700,h2ls:".01em",h2fs:16,
    day:{desk:"#e9ecef",bg:"#fbfcfd",tex:"none",ink:"#121619",ink2:"#39424c",acc:"#17577a",title:"#121619",sub:"#a55a22",gold:"#b88a3a",caps:"#1b6b93",tint:"#eef1f4",hair:"rgba(10,30,46,.13)",line:"rgba(165,90,34,.45)",rule:"#39424c",code:"#eef1f4",fill:"#8a6526",chk:"#b0302f",frame:"rgba(10,30,46,.24)",qbg:"#eef1f4",qink:"#2a333d"},
    night:{desk:"#0a0c0f",bg:"#1d232b",tex:"none",ink:"#e2e6ea",ink2:"#a3adb7",acc:"#5baedb",title:"#f0ede6",sub:"#cf8a52",gold:"#d9b45a",caps:"#5baedb",tint:"rgba(207,138,82,.10)",hair:"rgba(255,255,255,.09)",line:"rgba(207,138,82,.5)",rule:"rgba(255,255,255,.38)",code:"rgba(255,255,255,.05)",fill:"#e0be78",chk:"#e07a7a",frame:"rgba(255,255,255,.13)",qbg:"rgba(207,138,82,.08)",qink:"#ead7c6"}},
  inkwell:{body:CORM,disp:CORM,caps:CORM,h2:CORM,fs:17.5,h1:36,h1w:600,h1ls:".01em",capsw:600,capsls:".32em",capsfs:12,h2w:700,h2ls:".01em",h2fs:20,
    day:{desk:"#efe9db",bg:"#fffdf6",tex:"repeating-linear-gradient(0deg,rgba(110,90,50,.035) 0 1px,transparent 1px 5px),radial-gradient(120% 80% at 50% 0%,#fffef9 0%,#fffdf6 55%,#f8f1df 100%)",ink:"#231d15",ink2:"#5f5646",acc:"#1f4f68",title:"#1f4f68",sub:"#8a6526",gold:"#a97e2c",caps:"#8a6526",tint:"#f3ecda",hair:"#e3d9c2",line:"rgba(169,126,44,.6)",rule:"#a97e2c",code:"#f5efe0",fill:"#8a6526",chk:"#b0302f",frame:"rgba(169,126,44,.38)",qbg:"#f6efdf",qink:"#3a3020"},
    night:{desk:"#070b10",bg:"#101821",tex:"repeating-linear-gradient(0deg,rgba(255,240,200,.02) 0 1px,transparent 1px 5px),radial-gradient(120% 80% at 50% 0%,#152230 0%,#101821 60%,#0c131b 100%)",ink:"#ebe3cf",ink2:"#b3a88c",acc:"#d4bc86",title:"#ebe3cf",sub:"#c9a964",gold:"#c9a964",caps:"#c9a964",tint:"#16202b",hair:"#1f2c39",line:"rgba(201,169,100,.55)",rule:"rgba(201,169,100,.7)",code:"#0c131b",fill:"#d4bc86",chk:"#e88a8a",frame:"rgba(201,169,100,.32)",qbg:"#0c131b",qink:"#dcd2bb"}},
  family:{body:GEORGIA,disp:CINZEL,caps:CINZEL,h2:CINZEL,fs:14.5,h1:25,h1w:600,h1ls:".08em",capsw:600,capsls:".26em",capsfs:11,h2w:600,h2ls:".05em",h2fs:15,
    day:{desk:"#f6f1e6",bg:"#fffdf8",tex:"radial-gradient(120% 80% at 50% 0%,#fffefb 0%,#fffdf8 55%,#f9f3e4 100%)",ink:"#1f2a36",ink2:"#4a4a52",acc:"#23364a",title:"#1f2a36",sub:"#7a5f2e",gold:"#a8843c",caps:"#8a6a2c",tint:"#f4eedf",hair:"rgba(60,45,20,.15)",line:"rgba(168,132,60,.6)",rule:"#a8843c",code:"#f6f1e6",fill:"#8a6526",chk:"#b0302f",frame:"rgba(168,132,60,.42)",qbg:"#f6f0e2",qink:"#2c3a48"},
    night:{desk:"#0d1218",bg:"#141c25",tex:"radial-gradient(120% 80% at 50% 0%,#18222d 0%,#141c25 60%,#10171f 100%)",ink:"#f1ead8",ink2:"#cfc6b2",acc:"#e2c98f",title:"#f1ead8",sub:"#d8b46a",gold:"#d8b46a",caps:"#d8b46a",tint:"rgba(216,180,106,.10)",hair:"rgba(220,190,120,.15)",line:"rgba(216,180,106,.55)",rule:"rgba(216,180,106,.65)",code:"rgba(255,255,255,.04)",fill:"#e0c27c",chk:"#e88a8a",frame:"rgba(216,180,106,.36)",qbg:"rgba(216,180,106,.07)",qink:"#e8dfc9"}}};
/* in a document about several apps, each app's own sections in its own colour, by day and by night */
var OWN={day:{cd:"#1b6b93",forge:"#17577a",ingenium:"#6a3fb5",inkwell:"#1f4f68"},night:{cd:"#5baedb",forge:"#cf8a52",ingenium:"#c4a8f0",inkwell:"#d4bc86"}};
function roman(n){var v=[[1000,"M"],[900,"CM"],[500,"D"],[400,"CD"],[100,"C"],[90,"XC"],[50,"L"],[40,"XL"],[10,"X"],[9,"IX"],[5,"V"],[4,"IV"],[1,"I"]],r="";v.forEach(function(p){while(n>=p[0]){r+=p[1];n-=p[0];}});return r;}
var LATIN=["IANVARII","FEBRVARII","MARTII","APRILIS","MAII","IVNII","IVLII","AVGVSTI","SEPTEMBRIS","OCTOBRIS","NOVEMBRIS","DECEMBRIS"];
/* the date as Carpe Diem and The Forge write it on their doors: XVII·OCTOBRIS·MMXXVI */
function romanDate(d){d=d||new Date();return roman(d.getDate())+"\u00b7"+LATIN[d.getMonth()]+"\u00b7"+roman(d.getFullYear());}
function themeOf(kind,apps){if(kind==="cover"||kind==="cv")return "neutral";apps=apps||[];if(apps.length>1)return "family";return PT[apps[0]]?apps[0]:"neutral";}
/* the paper's rules, for the page (night follows Ingenium's own switch) or for a saved web page (night follows the reader's device; printed, always day) */
function paperCss(forPage){var S=forPage?"#lx7 ":"",out=[];
  function vars(v){return "--p-frame:"+v.frame+";--p-qbg:"+v.qbg+";--p-qink:"+v.qink+";--p-desk:"+v.desk+";--p-bg:"+v.bg+";--p-tex:"+v.tex+";--p-ink:"+v.ink+";--p-ink2:"+v.ink2+";--p-acc:"+v.acc+";--p-title:"+v.title+";--p-sub:"+v.sub+";--p-gold:"+v.gold+";--p-caps:"+v.caps+";--p-tint:"+v.tint+";--p-hair:"+v.hair+";--p-line:"+v.line+";--p-rule:"+v.rule+";--p-code:"+v.code+";--p-fill:"+v.fill+";--p-chk:"+v.chk;}
  function own(m){return Object.keys(OWN[m]).map(function(k){return "--c-"+k+":"+OWN[m][k];}).join(";");}
  var DAYSH="0 1px 0 rgba(40,22,68,.06),0 3px 8px rgba(40,22,68,.08),0 18px 40px rgba(40,22,68,.12)",NIGHTSH="0 0 0 1px rgba(255,255,255,.05),0 1px 0 rgba(0,0,0,.45),0 4px 10px rgba(0,0,0,.38),0 20px 44px rgba(0,0,0,.5)";
  Object.keys(PT).forEach(function(k){var t=PT[k];
    out.push(S+".th-"+k+"{--p-body:"+t.body+";--p-disp:"+t.disp+";--p-capsf:"+t.caps+";--p-h2f:"+t.h2+";--p-fs:"+t.fs+"px;--p-h1:"+t.h1+"px;--p-h1w:"+t.h1w+";--p-h1ls:"+t.h1ls+";--p-capsw:"+t.capsw+";--p-capsls:"+t.capsls+";--p-capsfs:"+t.capsfs+"px;--p-h2w:"+t.h2w+";--p-h2ls:"+t.h2ls+";--p-h2fs:"+t.h2fs+"px;"+vars(t.day)+";"+own("day")+";--p-sh:"+DAYSH+"}");
    var nightRule=".th-"+k+"{"+vars(t.night)+";"+own("night")+";--p-sh:"+NIGHTSH+"}";
    if(forPage)out.push('body[data-theme="night"] #lx7 '+nightRule);else out.push("@media screen and (prefers-color-scheme:dark){"+nightRule+"}");});
  var P=S+".l-paper";
  out.push(P+"{max-width:640px;margin:0 auto;background-color:var(--p-bg);background-image:var(--p-tex);color:var(--p-ink);border-radius:3px;box-shadow:var(--p-sh);padding:46px 52px 52px;font:var(--p-fs)/1.62 var(--p-body);text-align:left}",
    P+" + .l-paper{margin-top:16px}",
    P+" .cv{display:flex;flex-direction:column;align-items:center;gap:9px;padding:10px 0 18px;border-bottom:1px solid var(--p-line);margin-bottom:24px;text-align:center}",
    P+" .cv .seals{display:flex;gap:14px;justify-content:center;flex-wrap:wrap;margin-bottom:2px}",
    P+" .cv .seals img,"+P+" .cv .seals .sn{width:84px;height:84px;object-fit:contain}",
    P+" .cv .seals img.master,"+P+" .cv .seals .sn.master{width:118px;height:auto}",
    /* 6.1: a set's crest (IngSeal, r140): the shield as wide as the master seal stood, the pair wider */
    P+" .cv .seals img.crest{width:122px;height:auto;object-fit:contain}",P+" .cv .seals img.crest.c-duo{width:236px}",
    P+" .cv .seals .sn{position:relative;display:inline-block}",
    P+" .cv .seals .sn img{position:absolute;inset:0;width:100%;height:100%;object-fit:contain}",
    P+" .cv h1{font:var(--p-h1w) var(--p-h1)/1.18 var(--p-disp);letter-spacing:var(--p-h1ls);margin:6px 0 0;color:var(--p-title)}",
    P+" .cv .caps{display:flex;align-items:center;gap:12px;font:var(--p-capsw) var(--p-capsfs)/1.3 var(--p-capsf);letter-spacing:var(--p-capsls);text-transform:uppercase;color:var(--p-caps);max-width:100%}",
    P+" .cv .caps i{display:block;width:44px;height:1px;background:var(--p-line);flex:0 1 44px}",
    P+" .cv .sub{font:italic var(--p-fs)/1.45 var(--p-body);color:var(--p-acc)}",
    P+" .cv .for,"+P+" .cv .by{font:calc(var(--p-fs) - 1.5px)/1.4 var(--p-body);color:var(--p-ink2)}",
    P+" h2{font:var(--p-h2w) var(--p-h2fs)/1.3 var(--p-h2f);letter-spacing:var(--p-h2ls);margin:24px 0 9px;color:var(--p-acc)}",
    P+" h2.own-cd{color:var(--c-cd)}"+P+" h2.own-forge{color:var(--c-forge)}"+P+" h2.own-ingenium{color:var(--c-ingenium)}"+P+" h2.own-inkwell{color:var(--c-inkwell)}",
    P+" h3{font:italic 700 calc(var(--p-fs) + .5px)/1.3 var(--p-body);margin:16px 0 6px;color:var(--p-sub)}",
    P+" p{margin:0 0 10px}",P+" ul,"+P+" ol{margin:0 0 10px;padding-left:22px}",P+" li{margin:0 0 4px}",P+" li::marker{color:var(--p-acc)}",
    P+" hr{border:0;border-top:1px solid var(--p-line);margin:18px 0}",
    P+" blockquote{margin:0 0 10px 18px;padding-left:12px;border-left:2px solid var(--p-line);font-style:italic;color:var(--p-ink2)}",
    P+" pre{background:var(--p-code);color:var(--p-ink);padding:8px 10px;border-radius:4px;border:1px solid var(--p-hair);font:12px/1.5 ui-monospace,\"SF Mono\",Menlo,Consolas,monospace;white-space:pre-wrap;word-break:break-word}",
    P+" table{width:100%;border-collapse:collapse;font:calc(var(--p-fs) - 2px)/1.45 var(--p-body);margin:8px 0 14px;display:block;overflow-x:auto}",
    P+" th,"+P+" td{border-bottom:1px solid var(--p-hair);padding:5px 6px;text-align:left;vertical-align:top}",
    P+" th{font-weight:700;color:var(--p-acc);border-top:1.5px solid var(--p-rule);border-bottom:1.5px solid var(--p-rule);background:var(--p-tint)}",
    P+" .note{font-style:italic;font-size:calc(var(--p-fs) - 2px);color:var(--p-ink2);border-top:1px solid var(--p-line);padding-top:10px;margin-top:18px}",
    P+" .wait{color:var(--p-ink2);opacity:.8;font-style:italic;font-size:calc(var(--p-fs) - 1.5px)}",
    P+" .fill{color:var(--p-fill);font-style:italic;border-bottom:1.5px dotted var(--p-gold)}",
    P+" .chk{border-bottom:1.5px dotted var(--p-chk);cursor:help}",
    P+" .lhead{text-align:right;font:calc(var(--p-fs) - 2px)/1.5 var(--p-body);color:var(--p-ink2);margin-bottom:22px}",
    P+" .lhead b{display:block;font:700 calc(var(--p-fs) + 1px)/1.3 var(--p-disp);color:var(--p-title)}",
    P+" a{color:var(--p-acc)}",P+" [data-live] .l-caret{background:var(--p-acc)}",
    /* a fine frame inset in the page, as each door has one (Carpe Diem's blue, The Forge's steel, Inkwell's brass, the set's gilt) */
    P+"{position:relative}",P+"::before{content:\"\";position:absolute;inset:12px;border:1px solid var(--p-frame);border-radius:2px;pointer-events:none}",
    P+" blockquote{background:var(--p-qbg);color:var(--p-qink);padding:8px 12px;border-radius:0 6px 6px 0}",
    P+" .cv .tag{font:italic calc(var(--p-fs) + 1.5px)/1.4 var(--p-disp);color:var(--p-acc);margin-top:-2px}",
    P+" h2 .no{font-variant-numeric:lining-nums}",
    /* Carpe Diem: its small headings in its own spaced blue capitals */
    S+".th-cd h3{font:700 11.5px/1.4 "+SANS+";letter-spacing:.14em;text-transform:uppercase;color:var(--p-acc);margin:18px 0 7px}",
    /* Ingenium: the title in spaced capitals, as its wordmark; a four-pointed star set in the rule under the cover; each section's number on a small lilac key */
    S+".th-ingenium .cv h1{text-transform:uppercase;letter-spacing:.16em;font-size:calc(var(--p-h1) - 3px)}",
    S+".th-ingenium .cv{border-bottom:0;position:relative;padding-bottom:26px}",
    S+".th-ingenium .cv::before{content:\"\";position:absolute;bottom:0;left:12%;right:12%;height:1px;background:var(--p-line)}",
    S+".th-ingenium .cv::after{content:\"\\2726\";position:absolute;bottom:-10px;left:50%;transform:translateX(-50%);padding:0 10px;font:15px/20px "+SANS+";color:var(--p-acc);background-color:var(--p-bg)}",
    S+".th-ingenium h2{display:flex;align-items:baseline;gap:9px}",
    S+".th-ingenium h2 .no{flex:0 0 auto;display:inline-grid;place-items:center;min-width:22px;height:22px;padding:0 5px;border-radius:6px;background:var(--p-tint);border:1px solid var(--p-line);font:700 12px/1 "+SANS+";color:var(--p-acc);transform:translateY(-2px)}",
    S+".th-ingenium h2 .dot{display:none}");
  if(forPage)out.push("#lx7 .l-desk[class*=\"th-\"]{background:var(--p-desk)}");
  else out.push("body{margin:0;background:var(--p-desk)}",".l-paper{max-width:720px;margin:28px auto;padding:56px 64px 64px}",
    "@media (max-width:760px){.l-paper{margin:0;padding:28px 20px;border-radius:0}}",
    "@media print{body{background:#fff}.l-paper{box-shadow:none;margin:0;max-width:none;padding:0;background-image:none}}","@page{size:A4;margin:25mm 25mm 22mm}");
  return out.join("\n");}
/* the faces the papers are set in (Inkwell's Cormorant, Cinzel for The Offline Project), both under the SIL Open Font Licence */
function fontCss(which){var F=LX7_FONTS||{},out=[];function face(fam,key,w,st){if(F[key])out.push('@font-face{font-family:"'+fam+'";font-style:'+st+';font-weight:'+w+';font-display:swap;src:url('+F[key]+') format("woff2")}');}
  if(!which||which==="inkwell"){face("Lector Cormorant","cormorant-500-normal",500,"normal");face("Lector Cormorant","cormorant-600-normal",600,"normal");face("Lector Cormorant","cormorant-700-normal",700,"normal");face("Lector Cormorant","cormorant-500-italic",500,"italic");}
  if(!which||which==="family")face("Lector Cinzel","cinzel-600-normal",600,"normal");
  return out.join("\n");}
function paperStyle(){if(document.getElementById("l7PaperCss"))return;var st=document.createElement("style");st.id="l7PaperCss";st.textContent=fontCss()+"\n"+paperCss(true);document.head.appendChild(st);}
/* a seal on the paper, flat: by day its picture; by night the app's own night seal, its layers laid one on another */
function paperSeal(k,mode){var L=LX7_LAYERS||{};
  if(k==="master"){var src=masterSrc(mode==="night");return '<img class="master'+(mode?" s"+mode.charAt(0):"")+'" src="'+src+'" alt="The master seal of The Offline Project">';}
  if(mode==="night"&&L[k+"N"])return '<span class="sn" role="img" aria-label="'+esc(nm(k))+'\'s seal">'+L[k+"N"].filter(function(x){return !x.side;}).map(function(x){return '<img src="'+x.src+'" alt="">';}).join("")+'</span>';
  return '<img'+(mode?' class="sd"':'')+' src="'+flatSrc(k)+'" alt="'+esc(nm(k))+'\'s seal">';}
/* 6.1 · the crest of a set on the paper, flat (the paper never moves): the master seal for all four, The Offline Project's
   shield for any three, the pair for two, by day or by night as the page is. A page saved to a file carries both, each
   as a picture of its own (crestPng, drawn before it is saved), and shows the night one on a device set to dark. */
function crestPaper(a,ck,mode,o){a=sorted(a);var P=(o&&o.crestPng)||{};
  function one(nt,cls){var src=nt?P.night:P.day;if(!src)src=mode==="both"?IngSeal.dataUrl(a,{night:nt}):IngSeal.url(a,{night:nt});
    return '<img class="crest c-'+ck+(cls?" "+cls:"")+'" src="'+src+'" alt="'+esc(IngSeal.label(a,nt))+'">';}
  return mode==="both"?one(false,"sd")+one(true,"sn"):one(mode==="night");}
function appOf(run){return run&&(run.app||appOfText((run.name||"")+" "+(run.file||"")))||null;}

/* ---------------- what Lector keeps ---------------- */
function L7(){var s=lxState();
  if(!s.brief||typeof s.brief!=="object")s.brief={apps:[],purpose:"portfolio",docs:{dossier:true,appendix:true,portfolio:false,cover:false,cv:false},depth:"overview",fmt:"docx",modelId:null};
  if(!Array.isArray(s.brief.apps))s.brief.apps=[];if(!s.brief.docs)s.brief.docs={dossier:true};
  if(!s.me||typeof s.me!=="object")s.me={cv:null,writing:[],letters:[],voice:true,cite:true};
  if(!Array.isArray(s.me.writing))s.me.writing=[];if(!Array.isArray(s.me.letters))s.me.letters=[];
  if(!s.posts||typeof s.posts!=="object")s.posts={job:null,programme:null};
  if(!s.sets||typeof s.sets!=="object")s.sets={};
  if(!s.ui||typeof s.ui!=="object")s.ui={};
  return s;}
var saveT=0;function saveSoon(){clearTimeout(saveT);saveT=setTimeout(function(){try{saveState();}catch(e){}},400);}
function kept(k){try{var m=libState().apps[k];return m&&m.ref?m:null;}catch(e){return null;}}
function appRuns(k){return lxState().runs.filter(function(r){return r.kind==="app"&&appOf(r)===k;});}
function runFor0(k,depth){var rs=appRuns(k),meta=kept(k);
  function deep(r){return depth!=="thorough"||r.depth==="thorough";}
  function same(r){return meta&&r.sha&&r.sha===meta.sha256?1:0;}
  var done=rs.filter(function(r){return r.status==="done"&&deep(r);}).sort(function(a,b){return (same(b)-same(a))||((b.finished||b.updated||0)-(a.finished||a.updated||0));});
  if(done.length)return done[0];
  var open=rs.filter(function(r){return r.status!=="done"&&r.depth===(depth||"overview")&&(!r.sha||!meta||r.sha===meta.sha256);});
  return open[0]||null;}
/* R120: a reading made from an earlier copy of the app, now that a newer copy is kept (one she added, or the one built
   into Ingenium). Documents written from it would describe the app as it was, so Lector reads the new copy afresh,
   unless she chooses to keep the earlier reading (a choice that holds only for the copy kept now). */
/* the reading Lector goes by: the earlier copy's reading counts only when she chose to keep it */
function runFor(k,depth){var f=runFor0(k,depth),meta=kept(k);if(f&&f.status==="done"&&meta&&f.sha&&meta.sha256&&f.sha!==meta.sha256&&!useEarlier(k))return freshFor(k,depth);return f;}
function staleRun(k,depth){var f=runFor0(k,depth),meta=kept(k);if(!f||f.status!=="done"||!meta||!f.sha||!meta.sha256||f.sha===meta.sha256)return null;return f;}
function useEarlier(k){var B=L7().brief,meta=kept(k);return !!(B.useEarlier&&meta&&B.useEarlier[k]===meta.sha256);}
function freshFor(k,depth){var meta=kept(k);return appRuns(k).filter(function(r){return r.status!=="done"&&r.depth===(depth||"overview")&&(!r.sha||!meta||r.sha===meta.sha256);})[0]||null;}
function setKey(apps,purpose){var p=purpose||"portfolio",post=p!=="portfolio"&&L7().posts[p]?L7().posts[p].id:"";return sorted(apps).join("+")+"|"+p+(post?"|"+post:"");}
function job(){return L7().job||null;}
var R7={running:false,parts:{},notes:{},seen:{},src:{},nl:{},ev:[],pin:null,follow:true,panel:null,live:null,doc:null,step:"",prepNote:"",docMd:{},chk:{},w:0,built:false};
function stopErr(){var e=new Error("paused");e.stopped=true;return e;}

/* ---------------- the model: Ingenium's choice for this device ---------------- */
function readyModels(){return (state.models||[]).filter(function(m){return m.fileState==="ready";});}
function modelById(id){return id?(state.models||[]).filter(function(m){return m.id===id;})[0]||null:null;}
function modelPlan(){var o={link:false,key:null,spec:null,rec:null,chosen:null,need:null,spare:null,dev:"web"};
  try{o.link=supUsesLink();}catch(e){}
  try{o.dev=lineupDevice();o.key=lineupKeyFor("magister");o.spec=o.key&&ING_LINEUP.models[o.key]||null;o.rec=o.key?lineupRec(o.key):null;o.spare=lineupUsableGB();}catch(e){}
  var b=L7().brief,c=null;
  if(b.modelId){c=modelById(b.modelId);if(c&&c.fileState!=="ready")c=null;}
  if(!c)c=o.rec;
  if(!c){try{var rid=recommendedId();c=modelById(rid);}catch(e){}if(c&&c.fileState!=="ready")c=null;}
  if(!c){var a=supModel();if(a&&a.fileState==="ready")c=a;}
  if(!c)c=readyModels()[0]||null;
  o.chosen=c;
  try{if(c===o.rec&&o.spec)o.need=lineupNeedGB(o.spec);else if(c)o.need=fitVerdict(c).need;else if(o.spec)o.need=lineupNeedGB(o.spec);}catch(e){}
  /* R113: the best model for each task. Writing takes the strongest model here; reading may take the quicker Scriba when she
     asks for it; and when a stronger model than the one chosen is ready on this device, the brief says so. */
  o.stronger=null;o.readRec=null;o.readKey=null;
  try{var cs=strength(c);readyModels().forEach(function(m){if(c&&m.id===c.id)return;var s=strength(m);if(s>cs*1.25&&s>0&&(!o.stronger||s>strength(o.stronger)))o.stronger=m;});}catch(e){}
  try{var rk=lineupKeyFor("scriba");var rr=rk?lineupRec(rk):null;if(rr&&c&&rr.id!==c.id&&strength(rr)<strength(c)){o.readKey=rk;o.readRec=rr;}}catch(e){}
  o.reader=(b.fastRead&&o.readRec)?o.readRec:c;
  return o;}
/* how strong a model is, for choosing between those here: the lineup's parameter count, else its size on disk */
function strength(m){if(!m)return 0;try{var k=lineupKeyOfRec(m);if(k&&ING_LINEUP.models[k]&&ING_LINEUP.models[k].params)return ING_LINEUP.models[k].params;}catch(e){}
  var b=m.sizeBytes||m.fileSize||m.bytes||m.size||0;return b>1e6?b/7e8:(m.params||0);}
function devName(d){return {"mac-arm":"this Mac","desktop":"this computer","android":"this tablet","ios":"this iPhone or iPad"}[d]||"this device";}
function partsOf(k,depth,m){var p=R7.prep[k];if(!p||!p.P)return null;try{return lxPartsFor(p.P,depth,m).length;}catch(e){return null;}}
R7.prep={};
/* her apps measured once each, in the background, so the brief can say how many parts a reading takes */
var prepQ=Promise.resolve();
function prepare(k){var meta=kept(k);if(!meta)return;var p=R7.prep[k];if(p&&p.sha===meta.sha256)return;R7.prep[k]={sha:meta.sha256,P:null};
  prepQ=prepQ.then(function(){if(LX.busy||R7.running)return;return libText(k).then(function(text){if(!text)return;
      return lxPrepare(meta.name||(nm(k)+".html"),text,function(){}).then(function(P){R7.prep[k]={sha:meta.sha256,P:P};paintModel();});});}).catch(function(){});}

/* ---------------- the seals on the page: each app's own layers, swaying (never on the paper) ---------------- */
function night(){return document.body.getAttribute("data-theme")==="night";}
function flatSrc(k){var s=ING_SEALS&&ING_SEALS[k];return s?"data:image/png;base64,"+s.b64:"";}
function masterSrc(n){if(n&&LX7_MASTER&&LX7_MASTER.night)return LX7_MASTER.night;return flatSrc("master");}
/* 6.1 · a set of two, three or four of her apps wears one crest (window.IngSeal, module r140) in place of its seals one by
   one. The owner's words (20 October 2026): "I want the Offline Project's seal without Inkwell to be added into the Lector
   page and replace the three apps stacked individually template that it gives its documents for the Offline Project and I
   want variations of the shield master seal that reflects my selection of different combination of apps for my documents."
   "" when the set has no crest (one app, or IngSeal missing): then the seals are as they were. */
function crestKind(apps){try{var k=window.IngSeal&&IngSeal.kind(sorted(apps));return k==="master"||k==="trio"||k==="duo"?k:"";}catch(e){return "";}}
/* the set's crest beside its name in the brief, live; kept while the set stays the same, so it rises only when the set changes */
function setCrest(apps,ck){var key=sorted(apps).join("+"),c=R7.crest;
  if(!c||c.key!==key||!c.el){var e=IngSeal.el(sorted(apps),{live:true,size:ck==="duo"?88:ck==="master"?42:46});e.classList.add("l-crest");R7.crest=c={key:key,el:e};}
  try{IngSeal.prepare(sorted(apps));}catch(e2){}
  return c.el;}
function crestWords(ck){return {master:"The master seal",trio:"The Offline Project’s seal for these three",duo:"The duo’s seal"}[ck]||"";}
function sealEl(k){var L=LX7_LAYERS||{},key=night()&&L[k+"N"]?k+"N":k,ls=L[key];
  if(!ls){var im=new Image();im.src=flatSrc(k);im.alt="";im.width=56;im.height=56;return im;}
  var root=document.createElement("span");root.className="ls";root.setAttribute("aria-hidden","true");
  var tilt=document.createElement("span");tilt.className="ls-tilt";var idle=document.createElement("span");idle.className="ls-idle";
  idle.style.animationDelay=(-({cd:0,forge:1.7,ingenium:3.4,inkwell:5.1}[k]||0))+"s";
  var cast=document.createElement("i");cast.className="ls-cast";idle.appendChild(cast);
  ls.forEach(function(L1){var im=new Image();im.src=L1.src;im.alt="";im.className="ls-l"+(L1.side?" side":"");im.style.setProperty("--z",String(L1.z));idle.appendChild(im);});
  tilt.appendChild(idle);root.appendChild(tilt);return root;}

/* ---------------- the frame of the page ---------------- */
function h(tag,cls,html){var e=document.createElement(tag);if(cls)e.className=cls;if(html!=null)e.innerHTML=html;return e;}
function btn(cls,label,on){var b=h("button","l-btn"+(cls?" "+cls:""));b.type="button";b.textContent=label;if(on)b.onclick=on;return b;}
function build(){var host=$("lxHost");if(!host)return null;var pg=$("page-lector");if(pg)pg.classList.add("lx7-page");
  if($("lx7")&&$("lx7").parentNode===host)return $("lx7");
  host.innerHTML='<div id="lx7">'+
   '<div class="l-head"><div><h1>Lector</h1><p>Reads your apps part by part, thinks out loud as it goes, and writes the documents you need from them. Everything stays on this device.</p></div>'+
   '<ol class="l-steps" id="l7Steps" aria-label="Where Lector is"><li data-s="choose"><i>1</i><span>Choose</span></li><li class="sep" aria-hidden="true"></li><li data-s="read"><i>2</i><span>Read</span></li><li class="sep" aria-hidden="true"></li><li data-s="write"><i>3</i><span>Write</span></li><li class="sep" aria-hidden="true"></li><li data-s="done"><i>4</i><span>Save</span></li></ol></div>'+
   '<div class="l-tabs" id="l7Tabs" role="tablist" aria-label="Lector\'s panels"><span class="l-thumb"></span><button type="button" role="tab" data-p="brief">The brief</button><button type="button" role="tab" data-p="read">Thinking <span class="d" id="l7TabLive" hidden></span></button><button type="button" role="tab" data-p="doc">The document</button></div>'+
   '<div class="l-panels" id="l7Panels">'+
    '<section class="l-pn" id="l7Brief" aria-label="The brief"><div class="l-pn-h"><h2>The brief</h2><span class="l-chip" id="l7BriefChip">Ready</span><button class="l-fold" type="button" data-f="brief" aria-expanded="true" title="Fold the brief away; press again to open it"><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M10 3.5L5.5 8l4.5 4.5"/></svg></button></div><div class="l-pn-b"><div class="l-bf" id="l7Bf"></div></div><div class="l-pn-f" id="l7BriefF"></div></section>'+
    '<div class="l-gut" id="l7G1" role="separator" aria-orientation="vertical" tabindex="0" title="Drag to make the brief wider or narrower · press twice to put it back"><i></i></div>'+
    '<section class="l-pn" id="l7Read" aria-label="Thinking and Ask Lector" data-mid="rd"><div class="l-pn-h"><h2 class="l-vh">Thinking and Ask Lector</h2><div class="l-mid" id="l7Mid" role="tablist" aria-label="Thinking or Ask Lector"><button type="button" role="tab" id="l7MidRd" aria-controls="l7Rd" aria-selected="true">Thinking</button><button type="button" role="tab" id="l7MidAsk" aria-controls="l7Ask" aria-selected="false" tabindex="-1">Ask Lector <span class="n" id="l7AskN"></span></button></div><span class="l-chip" id="l7ReadChip">Waiting</span><button class="l-codefold" type="button" id="l7CodeFold" aria-expanded="true" title="Fold the code window away">Code</button><button class="l-fold" type="button" data-f="read" aria-expanded="true" title="Fold the thinking away; press again to open it"><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M10 3.5L5.5 8l4.5 4.5"/></svg></button></div>'+
     '<div class="l-rd" id="l7Rd" role="tabpanel" aria-labelledby="l7MidRd"><div class="l-now" id="l7Now"><div class="l-now-h" id="l7NowH"></div><pre class="l-code" id="l7Code" aria-label="The part Lector is reading"></pre></div>'+
     '<div class="l-vg" id="l7Vg" role="separator" aria-orientation="horizontal" tabindex="0" title="Drag to make the code window taller or shorter · press twice to put it back"><i></i></div>'+
     '<div class="l-stream" id="l7Stream" aria-live="polite"></div></div>'+
     /* 6.2: Ask Lector, its own tab beside the thinking (paintAsk) */
     '<div class="l-cmp l-askpane" id="l7Ask" role="tabpanel" aria-labelledby="l7MidAsk" hidden></div>'+
     '<div class="l-pn-f"><div class="l-prog"><div class="lbl"><b id="l7ProgA"></b><span id="l7ProgB"></span></div><div class="l-bar" id="l7Bar"><i id="l7BarI"></i></div></div><span id="l7ReadKey"></span></div></section>'+
    '<div class="l-gut" id="l7G2" role="separator" aria-orientation="vertical" tabindex="0" title="Drag to share the room between the thinking and the document · press twice to put it back"><i></i></div>'+
    '<section class="l-pn" id="l7Doc" aria-label="The document"><div class="l-pn-h"><h2>The document</h2><span class="l-chip" id="l7DocChip"></span><button type="button" class="l-btn sm l-askdoc" id="l7AskDoc" title="Ask Lector to change this document">Ask Lector</button><button class="l-fold" type="button" data-f="doc" aria-expanded="true" title="Fold the document away; press again to open it"><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M10 3.5L5.5 8l4.5 4.5"/></svg></button></div>'+
     '<div class="l-drow"><div class="l-dtabs" id="l7Dtabs" role="tablist" aria-label="Documents"></div>'+
     /* 6.1: the document's size: smaller, fit to the panel, larger */
     '<div class="l-zoom" id="l7Zoom" role="group" aria-label="The document\'s size"><button type="button" data-z="-" aria-label="Smaller" title="Smaller">−</button><button type="button" data-z="fit" aria-pressed="true" title="Fit the page to the panel">Fit</button><button type="button" data-z="+" aria-label="Larger" title="Larger">+</button><span class="pc" aria-live="polite"></span></div></div>'+
     '<div class="l-outline" id="l7Outline" aria-label="Sections"></div><div class="l-desk" id="l7Desk" tabindex="0" role="region" aria-label="The document, as it will be saved"></div>'+

     '<div class="l-pn-f"><div class="l-fmt"><span>Save as</span><div class="l-seg" id="l7Fmt"><span class="l-thumb"></span><button type="button" data-v="docx">Word</button><button type="button" data-v="pdf">PDF</button><button type="button" data-v="html">Web page</button><button type="button" data-v="md">Markdown</button></div></div>'+
     '<span style="margin-left:auto;display:flex;gap:6px;align-items:center"><button type="button" class="l-btn quiet" id="l7Copy">Copy</button><button type="button" class="l-btn pri" id="l7Save">Save</button></span></div></section>'+
   '</div></div>';
  wireFrame();wireMid();return $("lx7");}
/* 6.2: the middle panel shows the thinking or Ask Lector; the document panel's key opens Ask Lector on the document shown */
function midTab(which,focus){var rd=$("l7Rd"),ak=$("l7Ask"),pn=$("l7Read");if(!rd||!ak)return;R7.mid=which;var a=which==="ask";
  rd.hidden=a;ak.hidden=!a;if(pn)pn.setAttribute("data-mid",a?"ask":"rd");
  [["l7MidRd",!a],["l7MidAsk",a]].forEach(function(x){var b=$(x[0]);if(b){b.setAttribute("aria-selected",x[1]?"true":"false");b.tabIndex=x[1]?0:-1;}});
  if(a){try{paintAsk();}catch(e){}if(focus){var ta=ak.querySelector("textarea");if(ta)try{ta.focus();}catch(e){}}}else{try{layoutSoon();}catch(e){}}}
function wireMid(){var m=$("l7Mid");if(!m||m.__w)return;m.__w=1;
  $("l7MidRd").onclick=function(){midTab("rd");};$("l7MidAsk").onclick=function(){midTab("ask",true);};
  m.addEventListener("keydown",function(e){if(e.key!=="ArrowLeft"&&e.key!=="ArrowRight"&&e.key!=="Home"&&e.key!=="End")return;e.preventDefault();
    var to=(e.key==="ArrowLeft"||e.key==="Home")?"rd":"ask";midTab(to);$(to==="rd"?"l7MidRd":"l7MidAsk").focus();});
  var k=$("l7AskDoc");if(k)k.onclick=function(){if(one())setPanel("read");midTab("ask",true);var sel=$("l7Ask").querySelector("select");if(sel&&stored(R7.doc||"analysis"))sel.value="auto";};
  midTab(R7.mid||"rd");}

/* ---------------- painting ---------------- */
function render(){var root=build();if(!root)return;L7();paintBrief();paintSteps();paintMain();paintProgress();paintTabs();paintDoc();if(!R7.built){R7.built=true;paintStream();showSomething();}
  /* 6.1: the crests of the sets kept here are drawn ahead, when the page is quiet, so a Word file made from any of them
     (here, or in a backup) carries its crest */
  if(!R7.crestsAhead&&window.IngSeal){R7.crestsAhead=true;try{var SS=L7().sets;Object.keys(SS).forEach(function(k){var x=SS[k];if(x&&x.apps&&crestKind(x.apps))IngSeal.prepare(sorted(x.apps));});}catch(e){}}
  layoutSoon();}
function paintAll(){if(!$("lx7"))return;paintBrief();paintSteps();paintMain();paintProgress();paintTabs();paintDoc();}
/* 6.1: the compose area follows the document shown (paintDoc is wrapped once, below, by the Ask Lector part) */

/* 6.2: how Lector reads: a quick reading or a deep, thorough analysis, and the model that reads and writes */
function howCard(busy){var B=L7().brief,o=modelPlan(),c=o.chosen,s=sec("How Lector reads");s.id="l7How";var g=h("div","l-how");g.setAttribute("role","radiogroup");g.setAttribute("aria-label","How Lector reads");
  function parts(depth){var tot=0,known=true;B.apps.forEach(function(k){var r=runFor(k,depth);if(r&&r.status==="done")return;var n=partsOf(k,depth,c);if(n==null)known=false;else tot+=n;});return known?tot:null;}
  var docs=KINDS.filter(function(d){return B.docs[d[0]];}).length;
  [["overview","Quick reading","Its screens, its words, the notes in its code and how it is built."],
   ["thorough","Deep, thorough analysis","All of that, and every function and every line of its own code, for the deepest documents. With it, Every function is written too."]].forEach(function(x){
    var row=h("label","l-doc"),r=document.createElement("input");r.type="radio";r.name="l7Depth";r.value=x[0];r.checked=(B.depth||"overview")===x[0];r.disabled=busy;
    r.onchange=function(){if(R7.running||!r.checked)return;B.depth=x[0];if(x[0]==="thorough"&&B.docs.functions==null)B.docs.functions=true;saveSoon();paintBrief();paintTabs();paintDoc();};
    row.appendChild(r);var t=h("span","t");t.appendChild(h("b",null,esc(x[1])));var n=parts(x[0]),est=n?estimate(c,n,docs):"";
    t.appendChild(h("small",null,esc(x[2]+(n==null?" Measuring your apps…":n?" "+n+" part"+(n===1?"":"s")+" to read"+(est?"; "+est.replace(/\.$/,"").toLowerCase():"")+".":" Already read: Lector writes from that reading."))));
    row.appendChild(t);g.appendChild(row);});
  s.appendChild(g);
  var mw=h("label","l-how-model");mw.appendChild(h("span",null,"Read and written by"));var sel=document.createElement("select");sel.id="l7HowModel";sel.disabled=busy;
  var o0=document.createElement("option");o0.value="";o0.textContent="Ingenium's choice"+(o.rec?" ("+o.rec.customName+")":o.spec?" ("+o.spec.name+", when you have it)":"");sel.appendChild(o0);
  readyModels().forEach(function(m){var op=document.createElement("option");op.value=m.id;op.textContent=m.customName+(o.rec&&m.id===o.rec.id?" · recommended":"");if(B.modelId===m.id)op.selected=true;sel.appendChild(op);});
  sel.onchange=function(){B.modelId=sel.value||null;saveSoon();paintBrief();};mw.appendChild(sel);s.appendChild(mw);
  if(!readyModels().length)s.appendChild(h("p","l-hint",esc("No model is on this device yet. "+(o.spec?"Ingenium's choice here is "+o.spec.name+": get it below, under Who reads and writes, or on the Models page.":"Bring one in on the Models page."))));
  var sw1=h("label","l-sw"),c1=document.createElement("input");c1.type="checkbox";c1.id="l7Metic";c1.checked=B.meticulous!==false;c1.disabled=busy;c1.onchange=function(){B.meticulous=c1.checked;saveSoon();paintModel();};
  sw1.appendChild(c1);sw1.appendChild(document.createTextNode("Examine each section against the material (doctoral standard; about twice the writing time)"));s.appendChild(sw1);
  if(o.readRec){var sw2=h("label","l-sw"),c2=document.createElement("input");c2.type="checkbox";c2.id="l7FastRead";c2.checked=!!B.fastRead;c2.disabled=busy;c2.onchange=function(){B.fastRead=c2.checked;saveSoon();paintModel();};
    sw2.appendChild(c2);sw2.appendChild(document.createTextNode("Faster reading: "+o.readRec.customName+" takes the notes; "+(c?c.customName:"the model above")+" writes"));s.appendChild(sw2);}
  return s;}
/* the brief */
function sec(title){var s=h("div","l-sec");s.appendChild(h("h3",null,esc(title)));return s;}
function paintBrief(){var box=$("l7Bf");if(!box)return;var S=L7(),B=S.brief,busy=R7.running||LX.busy;
  var keepOpen={};[].forEach.call(box.querySelectorAll("details[open]"),function(d){keepOpen[d.getAttribute("data-k")]=1;});
  var scroll=box.parentNode.scrollTop;box.innerHTML="";
  if(!B.apps.length){var first=ORDER.filter(kept)[0];if(first){B.apps=[first];saveSoon();}}
  /* your apps */
  var s1=sec("Your apps"),grid=h("div","l-apps");
  ORDER.forEach(function(k){var on=B.apps.indexOf(k)>=0,meta=kept(k),run=runFor(k,B.depth);
    var b=h("button","l-app"+(meta?"":" none"));b.type="button";b.style.setProperty("--app",APPS[k].color);b.setAttribute("aria-pressed",on?"true":"false");b.setAttribute("data-k",k);
    b.appendChild(sealEl(k));b.appendChild(h("span","nm",esc(nm(k))));
    var old=meta?staleRun(k,B.depth):null,fresh=old&&!useEarlier(k)?freshFor(k,B.depth):null;
    var st=!meta?"Not added yet":old&&!useEarlier(k)?(fresh?"Read in part: "+(fresh.done||0)+" of "+(fresh.total||0):"Read from "+(old.version||"an earlier copy")):run&&run.status==="done"?"Read "+lxDate(run.finished||run.updated):run?"Read in part: "+(run.done||0)+" of "+(run.total||0):"Not read yet";
    b.appendChild(h("span","st",esc(st+(meta&&meta.version?" · "+meta.version:""))));
    b.onclick=function(){if(busy){ingToast("Lector is at work on a set. Pause it to change the brief.");return;}
      if(!kept(k)){ingToast(nm(k)+" is not on this device yet. Add your apps first.");return;}
      var i=B.apps.indexOf(k);if(i>=0){if(B.apps.length>1)B.apps.splice(i,1);}else B.apps.push(k);B.apps=sorted(B.apps);saveSoon();prepare(k);paintBrief();paintModel();paintTabs();paintDoc();paintMain();};
    grid.appendChild(b);});
  s1.appendChild(grid);
  var sn=h("div","l-setname"),ck=crestKind(B.apps);
  if(ck){try{sn.appendChild(setCrest(B.apps,ck));sn.classList.add("has-crest");}catch(e){}}
  else if(B.apps.length===4&&ING_SEALS.master){var mi=new Image();mi.src=masterSrc(night());mi.alt="";sn.appendChild(mi);}
  var sk=setKind(B.apps);sn.appendChild(h("b",null,esc(setName(B.apps)||"Choose at least one app")));
  if(B.apps.length)sn.appendChild(h("span",null,sn.classList.contains("has-crest")?esc(sk.charAt(0).toUpperCase()+sk.slice(1)):"· "+esc(sk)));
  if(B.apps.length<4&&ORDER.filter(kept).length===4&&!busy)sn.appendChild(btn("quiet","Choose all four",function(){B.apps=ORDER.slice();saveSoon();ORDER.forEach(prepare);paintBrief();paintModel();paintTabs();paintDoc();}));
  s1.appendChild(sn);
  var row=h("div","l-keys");row.appendChild(btn("sm"+(ORDER.filter(kept).length?"":" pri"),"＋ Add your apps",function(){try{libPickFiles();}catch(e){}}));
  if(!kept("ingenium")&&location.protocol!=="file:")row.appendChild(btn("quiet","Keep this copy of Ingenium",function(){try{libKeepSelf();}catch(e){}}));
  s1.appendChild(row);
  /* R120: a chosen app read from an earlier copy: Lector says so, and she chooses */
  try{B.apps.forEach(function(k){var old=staleRun(k,B.depth),meta=kept(k);if(!old||!meta)return;var ue=useEarlier(k);
    s1.appendChild(h("p","l-hint l-stale",esc(nm(k))+(ue?" is written about from its reading of "+esc(old.version||"an earlier copy")+", as you chose. The copy kept now is "+esc(meta.version||"newer")+"."
      :" was read from an earlier copy ("+esc(old.version||"its version was not named")+", "+esc(lxDate(old.finished||old.updated))+"). The copy kept now is "+esc(meta.version||"newer")+": Lector reads it afresh when you start, so the documents describe it as it is now.")));
    var kr=h("div","l-keys");kr.appendChild(btn("quiet",ue?"Read "+(meta.version||"the new copy")+" afresh instead":"Keep the earlier reading",function(){if(busy)return;B.useEarlier=B.useEarlier||{};if(ue)delete B.useEarlier[k];else B.useEarlier[k]=meta.sha256;saveSoon();paintBrief();paintModel();paintTabs();paintDoc();paintMain();}));s1.appendChild(kr);});}catch(e){}
  /* R120: what Ingenium carries inside it, and the built-in copy offered where hers differs */
  try{if(window.IngBuiltin&&IngBuiltin.lectorLine){var bl=IngBuiltin.lectorLine(busy);if(bl)s1.appendChild(bl);}}catch(e){}
  var ln=h("p","l-libnote"+(LIB&&LIB.warn?" warn":""));ln.id="libNote";ln.setAttribute("aria-live","polite");ln.textContent=(LIB&&(LIB.busy||LIB.note))||"";ln.hidden=!(LIB&&(LIB.busy||LIB.note));s1.appendChild(ln);
  if(!ORDER.filter(kept).length)s1.appendChild(h("p","l-hint","Add your apps from the files you already have: each app's own page (.html), or the zip you install it from. Each is checked and kept on this device; nothing is sent anywhere."));
  box.appendChild(s1);
  /* 6.2: how Lector reads, and with which model, in view at the top of the brief */
  box.appendChild(howCard(busy));
  /* what it is for */
  var s2=sec("What it is for"),pseg=h("div","l-seg");pseg.innerHTML='<span class="l-thumb"></span>';
  [["portfolio","My portfolio"],["job","A job"],["programme","A programme"]].forEach(function(p){var b=h("button");b.type="button";b.textContent=p[1];b.setAttribute("data-v",p[0]);b.setAttribute("aria-pressed",B.purpose===p[0]?"true":"false");
    b.onclick=function(){if(busy)return;B.purpose=p[0];saveSoon();paintBrief();paintDoc();paintTabs();};pseg.appendChild(b);});
  s2.appendChild(pseg);s2.appendChild(postCard(B.purpose));box.appendChild(s2);
  /* documents */
  var s3=sec("Documents"),dl=h("div","l-docs");
  KINDS.forEach(function(d){var row=h("label","l-doc"),c=document.createElement("input");c.type="checkbox";c.checked=!!B.docs[d[0]];c.disabled=busy;
    c.onchange=function(){B.docs[d[0]]=c.checked;saveSoon();paintTabs();paintDoc();paintModel();};row.appendChild(c);
    var t=h("span","t");t.textContent=docLabel(d[0],B.apps,B.purpose);t.appendChild(h("small",null,esc(d[0]==="cover"&&B.purpose==="portfolio"?"A letter of introduction, for any reader":d[2])));row.appendChild(t);
    row.appendChild(sealMark(d[0],B.apps));dl.appendChild(row);});
  s3.appendChild(dl);s3.appendChild(h("p","l-hint",(ck==="master"?"The master seal goes on the master dossier, the master appendix and the portfolio piece.":ck?crestWords(ck)+" goes on the dossier, the appendix and the portfolio piece.":B.apps.length===4?"The master seal goes on the master dossier, the master appendix and the portfolio piece.":"Seals go on dossiers, appendices and portfolio pieces.")+" Your CV and cover letters stay plain."));
  box.appendChild(s3);
  /* facts and voice */
  box.appendChild(meCard());
  /* who reads and writes */
  var s5=sec("Who reads and writes"),mc=h("div","l-model");mc.id="l7Model";s5.appendChild(mc);box.appendChild(s5);paintModel();
  /* the readings kept */
  var runs=lxState().runs;if(runs.length){var d=h("details","l-more");d.setAttribute("data-k","runs");if(keepOpen.runs)d.open=true;
    d.appendChild(h("summary",null,"Readings kept ("+runs.length+")"));var sh=h("div","l-shelf");
    runs.forEach(function(r){var row=h("div","r");row.appendChild(h("span",null,esc(r.name+" · "+(r.depth==="thorough"?"every line":"overview")+" · "+lxStatusWord(r)+" · "+(r.done||0)+" of "+(r.total||0)+" parts · "+lxDate(r.created))));
      var del=btn("quiet","Delete",null);del.onclick=function(){if(R7.running||LX.busy){ingToast("Pause Lector before you delete a reading.");return;}
        if(del.dataset.armed!=="1"){del.dataset.armed="1";del.textContent="Delete? Press again";setTimeout(function(){if(del.isConnected){del.dataset.armed="";del.textContent="Delete";}},5000);return;}
        lxDelete(r.id);};row.appendChild(del);sh.appendChild(row);});
    d.appendChild(sh);var s6=h("div","l-sec");s6.appendChild(d);box.appendChild(s6);}
  var s7=h("div","l-sec");var od=h("details","l-more");od.setAttribute("data-k","doc");if(keepOpen.doc||(typeof LX_PICK!=="undefined"&&LX_PICK))od.open=true;od.appendChild(h("summary",null,"Or read a long document"));
  od.appendChild(h("p","l-hint","A thesis, an article or a report: Word, PDF or text. Lector reads all of it and writes its notes and analysis."));
  var dk=h("div","l-keys");dk.appendChild(btn("sm","Choose a document",function(){var i=document.createElement("input");i.type="file";i.accept=".docx,.pdf,.txt,.md,.html,.htm";i.onchange=function(){if(i.files&&i.files[0])lxPick(i.files[0]);};i.click();}));od.appendChild(dk);
  if(typeof LX_PICK!=="undefined"&&LX_PICK){var pk=h("div","l-card");pk.appendChild(h("b",null,esc(LX_PICK.name)));
    if(LX_PICK.state==="ready"){var n0=0;try{n0=lxPartsFor(LX_PICK.P,"overview",modelPlan().chosen).length;}catch(e){}pk.appendChild(h("span","org",esc(n0+" parts at this model's memory")));
      var kk=h("div","l-keys");kk.appendChild(btn("sm pri","Read it",beginDoc));kk.appendChild(btn("quiet","Choose another",function(){LX_PICK=null;paintBrief();}));pk.appendChild(kk);}
    else if(LX_PICK.state==="error")pk.appendChild(h("span","org",esc("It could not be opened: "+LX_PICK.err)));
    else pk.appendChild(h("span","org",esc(LX_PICK.note||"Opening…")));
    od.appendChild(pk);}
  s7.appendChild(od);box.appendChild(s7);
  box.parentNode.scrollTop=scroll;segThumbs(box);}
function sealMark(kind,apps){var m=h("span","l-mark");if(!sealed(kind)){m.className="l-mark none";m.textContent="No seal";return m;}
  /* 6.1: the set's one picture (its crest, or one app's own seal), by night the night one. The owner's words (20 October
     2026): "The seals on the "Documents" section of the Lector page still have the Light mode look on Dark mode, please fix that." */
  var a=sorted(apps);
  if(a.length&&window.IngSeal){try{var ck=IngSeal.kind(a),im=IngSeal.el(a,{live:false,alt:""});if(im){im.classList.add("l-mk");im.title=crestWords(ck)||(nm(a[0])+"’s seal");m.classList.add("k-"+ck);m.appendChild(im);return m;}}catch(e){}}
  if(sorted(apps).length===4&&ING_SEALS.master){var i=new Image();i.src=flatSrc("master");i.className="ms";i.alt="";i.title="The master seal";m.appendChild(i);return m;}
  sorted(apps).forEach(function(k){var i=new Image();i.src=flatSrc(k);i.alt="";i.title=nm(k)+"'s seal";m.appendChild(i);});return m;}

/* the posting or the programme */
function postCard(p){var wrap=h("div");if(p==="portfolio"){wrap.appendChild(h("p","l-hint","For your professional catalogue: written for any reader, with no posting in mind."));return wrap;}
  var P=L7().posts[p],what=p==="job"?"the posting":"the programme's call";
  if(P){var c=h("div","l-card");c.appendChild(h("b",null,esc(P.title||P.name)));if(P.org)c.appendChild(h("span","org",esc(P.org)));
    if(P.asks&&P.asks.length){var as=h("div","l-asks");P.asks.forEach(function(t){as.appendChild(h("span","l-ask",esc(t)));});c.appendChild(as);}
    var r=h("div","l-row");r.appendChild(h("span",null,esc(P.closes||(fmtBytes(P.chars||0)+" of text, kept on this device"))));var ks=h("span");
    ks.appendChild(btn("quiet","Change",function(){pickPost(p);}));ks.appendChild(btn("quiet","Remove",function(){IngBig.del(P.ref);L7().posts[p]=null;saveSoon();paintBrief();}));r.appendChild(ks);c.appendChild(r);wrap.appendChild(c);return wrap;}
  var c2=h("div","l-card");c2.appendChild(h("b",null,p==="job"?"Add the posting":"Add the programme's call"));
  c2.appendChild(h("span","org",esc("Lector draws out what they ask for and fits every document to it. A file (Word, PDF, text or a saved web page), or the text pasted in.")));
  var ks2=h("div","l-keys");ks2.appendChild(btn("sm","Choose a file",function(){pickPost(p);}));
  var ta=null;ks2.appendChild(btn("sm","Paste the text",function(){if(ta){ta.focus();return;}ta=document.createElement("textarea");ta.className="l-paste";ta.placeholder="Paste "+what+" here";c2.appendChild(ta);
    var kp=h("div","l-keys");kp.appendChild(btn("sm pri","Keep it",function(){keepPost(p,ta.value,"Pasted text");}));c2.appendChild(kp);ta.focus();}));
  c2.appendChild(ks2);wrap.appendChild(c2);return wrap;}
function pickPost(p){var i=document.createElement("input");i.type="file";i.accept=".docx,.pdf,.txt,.md,.html,.htm,.rtf";
  i.onchange=function(){var f=i.files&&i.files[0];if(!f)return;readAsText(f).then(function(t){if(/\.html?$/i.test(f.name))t=lxUnTag(t);keepPost(p,t,f.name);},function(e){ingToast("It could not be read: "+(e&&e.message||e));});};i.click();}
function keepPost(p,text,name){text=String(text||"").replace(/\r/g,"").trim();if(text.length<40){ingToast("That is too short to be "+(p==="job"?"a posting":"a programme's call")+".");return;}
  var meta=parsePost(text),ref=IngBig.newId(),old=L7().posts[p];
  IngBig.put(ref,text).then(function(){if(old&&old.ref)IngBig.del(old.ref);L7().posts[p]=Object.assign({id:"p"+Date.now().toString(36),ref:ref,name:name,chars:text.length,at:Date.now()},meta);saveState();paintBrief();});}
function parsePost(text){var L=text.split("\n").map(function(s){return s.trim();}).filter(Boolean);
  var title=(L[0]||"").replace(/^#+\s*/,"").slice(0,90),org=(L[1]&&L[1].length<110?L[1]:"").replace(/^#+\s*/,"").slice(0,90);
  var asks=L.filter(function(s){return /^([-•*·▪●◦–]|\d+[.)])\s+/.test(s);}).map(function(s){return s.replace(/^([-•*·▪●◦–]|\d+[.)])\s+/,"");}).filter(function(s){return s.length>8;})
    .slice(0,6).map(function(s){return s.length>64?s.slice(0,61).replace(/\s+\S*$/,"")+"…":s;});
  var closes=(L.filter(function(s){return /(clos(es|ing)|deadline|apply by|applications? (are )?due)/i.test(s)&&s.length<120;})[0]||"").slice(0,80);
  return {title:title,org:org,asks:asks,closes:closes};}

/* her facts and her voice */
function meCard(){var s=sec("Your facts and your voice"),M=L7().me,f=h("div","l-facts");
  function row(ic,title,sub,acts){var r=h("div","l-fact");r.appendChild(h("span","ic",ic));var t=h("div","tx");t.appendChild(h("span",null,esc(title)));t.appendChild(h("small",null,esc(sub)));
    if(acts){var a=h("div","acts");acts.forEach(function(x){a.appendChild(x);});t.appendChild(a);}r.appendChild(t);return r;}
  f.appendChild(row("✓","Your CV",M.cv?M.cv.name+" · "+fmtBytes(M.cv.chars||0)+" of text, the one source of facts about you":"Your names, dates and posts come from it; nothing about you is invented",
    [btn("quiet",M.cv?"Replace":"Add your CV",function(){addMe("cv");})].concat(M.cv?[btn("quiet","Remove",function(){IngBig.del(M.cv.ref);M.cv=null;saveSoon();paintBrief();})]:[])));
  f.appendChild(row("¶","Your own writing",M.writing.length?M.writing.length+" piece"+(M.writing.length>1?"s":"")+" of your prose, so it writes as you do":"A few pieces of your prose: essays, statements, articles",
    [btn("quiet","Add",function(){addMe("writing");})].concat(M.writing.length?[btn("quiet","Remove all",function(){M.writing.forEach(function(x){IngBig.del(x.ref);});M.writing=[];saveSoon();paintBrief();})]:[])));
  f.appendChild(row("✉","Your past cover letters",M.letters.length?M.letters.length+" letter"+(M.letters.length>1?"s":"")+", for their shape and tone":"Letters you have written before, as templates",
    [btn("quiet","Add",function(){addMe("letters");})].concat(M.letters.length?[btn("quiet","Remove all",function(){M.letters.forEach(function(x){IngBig.del(x.ref);});M.letters=[];saveSoon();paintBrief();})]:[])));
  /* R115: her sources, kept in Fontes, cited in the documents */
  var nSrc=0;try{nSrc=(typeof fontesItems==="function"?fontesItems():[]).length;}catch(e){}
  f.appendChild(row("❝","Your sources (Fontes)",nSrc?nSrc+" source"+(nSrc===1?"":"s")+" kept"+(M.cite!==false?", cited by number in the dossier and the portfolio piece, with a References list in your chosen style":", not cited"):"Add sources in Fontes (My sources) and the documents can cite them",
    [btn("quiet","Open Fontes",function(){try{openFontes();}catch(e){ingToast("Fontes is not in this build.");}})]));
  var sw=h("label","l-sw");var c=document.createElement("input");c.type="checkbox";c.checked=M.voice!==false;c.onchange=function(){M.voice=c.checked;saveSoon();};sw.appendChild(c);sw.appendChild(document.createTextNode("Write in my own voice"));f.appendChild(sw);
  var sw2=h("label","l-sw");var c2=document.createElement("input");c2.type="checkbox";c2.id="l7Cite";c2.checked=M.cite!==false;c2.onchange=function(){M.cite=c2.checked;saveSoon();paintBrief();};sw2.appendChild(c2);sw2.appendChild(document.createTextNode("Cite my sources in the documents"));f.appendChild(sw2);
  s.appendChild(f);s.appendChild(h("p","l-hint","Kept on this device. Lector never invents a fact about you: anything it cannot find in your CV is left in square brackets for you to fill."));return s;}
function addMe(which){var i=document.createElement("input");i.type="file";i.accept=".docx,.pdf,.txt,.md";i.multiple=which!=="cv";
  i.onchange=function(){var fs=[].slice.call(i.files||[]);if(!fs.length)return;var M=L7().me;
    Promise.all(fs.map(function(f){return readAsText(f).then(function(t){t=String(t||"").trim();if(!t)return null;var ref=IngBig.newId();return IngBig.put(ref,t).then(function(){return {ref:ref,name:f.name,chars:t.length,at:Date.now()};});},function(){ingToast(f.name+" could not be read.");return null;});}))
    .then(function(items){items=items.filter(Boolean);if(!items.length)return;if(which==="cv"){if(M.cv&&M.cv.ref)IngBig.del(M.cv.ref);M.cv=items[0];}else M[which]=M[which].concat(items).slice(-8);saveState();paintBrief();});};i.click();}

/* the model */
function paintModel(){var box=$("l7Model");if(!box)return;var o=modelPlan(),B=L7().brief;box.innerHTML="";
  if(o.link){box.appendChild(h("b",null,esc("Your other computer reads and writes")));box.appendChild(h("div","need",esc("Lector uses "+(state.cloud&&state.cloud.model||"its model")+" on "+(state.cloud&&state.cloud.computer||"the computer you linked")+", the stronger model, and this device only watches.")));}
  else{var c=o.chosen,isRec=c&&o.rec&&c.id===o.rec.id,name=c?c.customName:(o.spec?o.spec.name:"Magister");
    var reader=o.reader||c,twoModels=reader&&c&&reader.id!==c.id;
    box.appendChild(h("b",null,esc(twoModels?"Reading: "+reader.customName+" · Writing: "+name+(isRec?" (Magister)":""):(isRec?"Ingenium's choice: Magister · ":"Reading and writing: ")+name)));
    if(o.stronger){var sg=h("div","need");sg.appendChild(document.createTextNode("A stronger model is ready on "+devName(o.dev)+": "+o.stronger.customName+". For a doctoral standard, use it. "));
      sg.appendChild(btn("quiet","Use "+o.stronger.customName,function(){B.modelId=o.stronger.id;saveSoon();paintModel();}));box.appendChild(sg);}
    var tot=0,known=true;B.apps.forEach(function(k){var r=runFor(k,B.depth);if(r&&r.status==="done")return;var n=partsOf(k,B.depth,c);if(n==null)known=false;else tot+=n;});
    var docs=KINDS.filter(function(d){return B.docs[d[0]];}).length,line=[];
    if(o.need&&o.spare)line.push("Needs about "+o.need.toFixed(1)+" GB of the "+o.spare.toFixed(1)+" GB "+devName(o.dev)+" can spare.");
    line.push(known?(tot?"Reading "+tot+" parts":"Nothing left to read")+" and writing "+docs+" document"+(docs===1?"":"s")+".":"Measuring your apps…");
    var est=estimate(c,tot,docs);if(est)line.push(est);
    box.appendChild(h("div","need",esc(line.join(" "))));
    if(o.need&&o.spare){var m=h("div","l-meter"),i=document.createElement("i");var f=Math.min(1,o.need/o.spare);i.style.width=Math.round(f*100)+"%";if(f>.85)i.className="tight";m.appendChild(i);box.appendChild(m);}
    if(!c&&o.spec){var gk=h("div","l-keys");gk.appendChild(btn("sm pri","Get "+o.spec.name+" ("+fmtBytes(o.spec.size)+")",function(){try{lineupInstall(o.key).then(function(){paintModel();},function(e){ingToast("It could not be fetched: "+(e&&e.message||e));});ingToast("Fetching "+o.spec.name+". Lector is ready to start when it arrives.");}catch(e){go("models");}}));box.appendChild(gk);}
    else if(o.spec&&!isRec&&!B.modelId){box.appendChild(h("div","need",esc("Ingenium's choice for Lector here is "+o.spec.name+" (Magister, the strongest this device can hold). Get it on the Models page; until then Lector uses "+name+".")));}
    var det=document.createElement("details");det.appendChild(h("summary",null,"Why this model"));
    det.appendChild(h("div",null,esc(o.spec?(o.spec.why||"")+" Lector reads best with the strongest model "+devName(o.dev)+" holds; a smaller one reads faster.":"A larger model writes a better analysis; a smaller one reads faster.")));
    /* 6.2: the model, the depth and the two switches stand at the top of the brief now (How Lector reads); this keeps the reasons */
    det.appendChild(h("div","need","A quick reading takes its screens, its words, the notes in its code and how it is built. A deep, thorough analysis takes all of that and every line of its own code, for the deepest documents; this can take hours on a small model."));
    det.appendChild(h("div","need","Ingenium chooses the strongest model this device holds for the writing, because a doctoral standard needs it; the notes may be taken by a quicker model when time matters more than nuance."));
    box.appendChild(det);segThumbs(box);}}
function estimate(m,parts,docs){if(!m)return "";var avg=null;if(LX.times&&LX.times.length)avg=LX.times.reduce(function(a,b){return a+b;},0)/LX.times.length;
  if(avg==null){try{var p=paceEstimate(m);if(p&&p.lo>0){var tps=(p.lo+p.hi)/2,ctx=lxCtx(m),inTok=lxBudget(ctx,700,false)/3.2;avg=700/tps+inTok/(tps*8);}}catch(e){}}
  if(avg==null)return "The time appears after the first part.";
  var secs=parts*avg+docs*10*avg*1.3*(meticulous()?1.9:1);return "About "+lxDur(secs)+(LX.times&&LX.times.length?".":", as a rough guide until the first part is read.");}

/* the steps and the main key */
function phase(){var j=job();if(!j)return "choose";if(j.status==="done")return "done";if(j.status==="writing")return "write";return "read";}
function paintSteps(){var order=["choose","read","write","done"],ix=order.indexOf(phase()),box=$("l7Steps");if(!box)return;
  [].forEach.call(box.querySelectorAll("li[data-s]"),function(li){var j=order.indexOf(li.getAttribute("data-s")),cls=j<ix?"done":j===ix?"now":"";if(li.className!==cls)li.className=cls;li.querySelector("i").textContent=j<ix?"✓":String(j+1);});}
function paintMain(){var f=$("l7BriefF"),chip=$("l7BriefChip");if(!f)return;f.innerHTML="";var j=job(),B=L7().brief;
  if(R7.running){f.appendChild(btn("wide","Pause",function(){LX.stop=true;try{lxPause();}catch(e){}try{if(LX.inFlight)Engine.abort();}catch(e){}R7.step="Pausing after this moment…";paintProgress();}));chip.textContent="In use";chip.className="l-chip live";}
  else if(j&&(j.status==="paused"||j.status==="error"||j.status==="reading"||j.status==="writing")){f.appendChild(btn("pri wide next","Go on",r7Run));f.appendChild(btn("quiet","Start again",function(){L7().job=null;saveState();paintAll();}));chip.textContent=j.status==="error"?"Stopped":"Paused";chip.className="l-chip";}
  else if(j&&j.status==="done"){f.appendChild(btn("wide","Start a new set",function(){L7().job=null;saveState();R7.ev=[];paintStream();paintAll();setPanel("brief");}));chip.textContent="Used for this set";chip.className="l-chip ok";}
  else{var allRead=B.apps.length&&B.apps.every(function(k){var r=runFor(k,B.depth);return r&&r.status==="done";});
    f.appendChild(btn("pri wide next",allRead?"Write the documents":"Start reading",r7Go));chip.textContent="Ready";chip.className="l-chip";}}

/* progress */
function paintProgress(){var a=$("l7ProgA"),b=$("l7ProgB"),bar=$("l7Bar"),bi=$("l7BarI"),rc=$("l7ReadChip"),key=$("l7ReadKey");if(!a)return;var j=job();
  if(!j){a.textContent="Not started";var B=L7().brief;b.textContent=B.apps.length?setName(B.apps):"";bi.style.width="0%";bar.classList.remove("live");rc.className="l-chip";rc.textContent="Waiting";if($("l7TabLive"))$("l7TabLive").hidden=true;key.innerHTML="";return;}
  var running=R7.running,frac=0,lab="",sub="";
  if(j.status==="done"){lab="Finished · "+j.kinds.length+" document"+(j.kinds.length===1?"":"s")+" ready";sub="checked against the measures";frac=1;}
  else if(phase()==="write"){var done=j.kinds.filter(function(k){return j.made[k];}).length,live=R7.live,secFrac=live&&live.of?(live.i||0)/live.of:0;
    frac=(done+secFrac)/Math.max(1,j.kinds.length);lab=R7.step||("Writing · "+done+" of "+j.kinds.length+" documents");sub=done+" of "+j.kinds.length+" documents";}
  else{var tot=0,dn=0;(j.apps||[]).forEach(function(k){var r=runFor(k,j.depth);if(r){tot+=r.total||0;dn+=r.status==="done"?(r.total||0):(r.done||0);}});
    if(j.doc){var dr=lxRun(j.doc);if(dr){tot=dr.total||0;dn=dr.status==="done"?tot:(dr.done||0);}}
    frac=tot?dn/tot*.85:0;lab=R7.step||R7.prepNote||(running?"Reading…":"Paused");var run=LX.runId?lxRun(LX.runId):null;sub=running&&run&&run.status==="reading"?lxEta(run).replace(/^About /,"about "):(dn+" of "+tot+" parts read");}
  if(!running&&j.status!=="done"){lab=j.status==="error"?"Stopped: "+(j.err||"an error"):"Paused · "+(phase()==="write"?"writing":"reading");}
  a.textContent=lab;b.textContent=sub;bi.style.width=(Math.max(0,Math.min(1,frac))*100).toFixed(1)+"%";bar.classList.toggle("live",running);
  rc.className="l-chip"+(running?" live":j.status==="done"?" ok":"");rc.innerHTML=running?'<span class="pulse"></span>'+(phase()==="write"?"Writing":"Reading"):j.status==="done"?"✓ Done":"Paused";
  if($("l7TabLive"))$("l7TabLive").hidden=!running;
  key.innerHTML="";if(running)key.appendChild(btn("","Pause",function(){LX.stop=true;try{lxPause();}catch(e){}try{if(LX.inFlight)Engine.abort();}catch(e){}}));
  else if(j.status!=="done")key.appendChild(btn("pri","Go on",r7Run));}

/* ---------------- the thinking: the code being read, and Lector's notes as it goes ---------------- */
var KW=/\b(var|let|const|function|return|if|else|for|while|try|catch|new|this|true|false|null|async|await|of|in|typeof|class|import|export)\b/g;
function hl(line){var out="",i=0,re=/(\/\*.*?\*\/|\/\/.*$)|("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*')|\b(\d+(?:\.\d+)?)\b/g,m;
  while((m=re.exec(line))){out+=esc(line.slice(i,m.index)).replace(KW,'<span class="kw">$1</span>');
    if(m[1])out+='<span class="cm">'+esc(m[1])+'</span>';else if(m[2])out+='<span class="st">'+esc(m[2])+'</span>';else out+='<span class="nu">'+m[3]+'</span>';i=re.lastIndex;}
  return out+esc(line.slice(i)).replace(KW,'<span class="kw">$1</span>');}
function getParts(run){if(R7.parts[run.id])return Promise.resolve(R7.parts[run.id]);return lxJSON(run.partsRef,[]).then(function(p){R7.parts[run.id]=p;return p;});}
/* where a part's lines stand in the app's own file, by their own line numbers */
function srcOf(run){var k=appOf(run),meta=k&&kept(k);if(!k||!meta)return Promise.resolve(null);if(run.sha&&meta.sha256&&run.sha!==meta.sha256)return Promise.resolve(null);
  if(R7.src[k])return Promise.resolve(R7.src[k]);
  return libText(k).then(function(t){if(!t)return null;var nl=[],i=-1;while((i=t.indexOf("\n",i+1))>=0)nl.push(i);R7.src={};R7.src[k]={text:t,nl:nl};return R7.src[k];},function(){return null;});}
function lineAt(src,pos){var a=0,b=src.nl.length;while(a<b){var mid=(a+b)>>1;if(src.nl[mid]<pos)a=mid+1;else b=mid;}return a+1;}
function lineNums(src,lines){var out=[],last=0,global=0;
  for(var i=0;i<lines.length;i++){var s=lines[i].trim();if(s.length<6){out.push(null);continue;}var probe=s.length>120?s.slice(0,120):s;
    var p=src.text.indexOf(probe,last);if(p<0&&global<60){global++;p=src.text.indexOf(probe);}
    if(p>=0){out.push(lineAt(src,p));last=p+probe.length;}else out.push(null);}
  return out;}
function showPart(runId,i,how){var run=lxRun(runId);if(!run)return;R7.code={runId:runId,i:i,how:how};
  getParts(run).then(function(parts){var p=parts[i];if(!p||!R7.code||R7.code.runId!==runId||R7.code.i!==i)return;paintCode(run,p,i,parts.length,how,null);
    srcOf(run).then(function(src){if(!src||!R7.code||R7.code.runId!==runId||R7.code.i!==i)return;var lines=String(p.x||"").split("\n").slice(0,400);paintCode(run,p,i,parts.length,how,lineNums(src,lines));});});}
function paintCode(run,p,i,n,how,nums){var H=$("l7NowH"),code=$("l7Code");if(!H||!code)return;H.innerHTML="";
  H.appendChild(h("span",null,esc(how==="now"?"Now reading · ":"Looking back at · ")));H.appendChild(h("b",null,esc(run.name)));
  H.appendChild(h("span",null,esc(" · part "+(i+1)+" of "+n+" · "+(p.t||"")+(p.of>1?" ("+p.k+" of "+p.of+")":"")+(nums&&nums.filter(Boolean).length?" · line "+nums.filter(Boolean)[0].toLocaleString("en-GB")+" on":""))));
  if(how!=="now"&&R7.running)H.appendChild(btn("quiet","Back to now",function(){R7.pin=null;markPinned();showCurrentPart();}));
  var lines=String(p.x||"").split("\n"),more=lines.length>400;lines=lines.slice(0,400);var frag=document.createDocumentFragment();
  lines.forEach(function(l,ix){var d=h("div","ln"),num=nums&&nums[ix];d.appendChild(h("i",null,num?num.toLocaleString("en-GB"):"·"));var sp=document.createElement("span");
    var t=l.length>400?l.slice(0,400)+"…":l;sp.innerHTML=p.code?hl(t):esc(t);d.appendChild(sp);frag.appendChild(d);});
  code.innerHTML="";code.appendChild(frag);if(more)code.appendChild(h("div","empty","… and "+(String(p.x).split("\n").length-400).toLocaleString("en-GB")+" more lines in this part."));code.scrollTop=0;}
function showCurrentPart(){if(R7.pin!=null)return;var id=LX.runId;if(!id||!R7.notes[id])return;var i=R7.notes[id].findIndex(function(x){return !x;});if(i>=0)showPart(id,i,"now");}
function codeIdle(text){var H=$("l7NowH"),code=$("l7Code");if(!H)return;H.innerHTML="";H.appendChild(h("span",null,esc(text.head)));code.innerHTML='<div class="empty">'+esc(text.body)+'</div>';}

/* the stream of cards */
function addEv(ev){ev.id=(R7.evN=(R7.evN||0)+1);ev.at=Date.now();R7.ev.push(ev);if(R7.ev.length>120)R7.ev.shift();var st=$("l7Stream");if(!st)return;
  var e=st.querySelector(".l-empty");if(e)e.remove();var live=$("l7LiveCard");st.insertBefore(card(ev),live&&live.parentNode===st?live:st.querySelector(".l-jump"));
  var cards=st.querySelectorAll(".l-th:not(#l7LiveCard)");if(cards.length>120)cards[0].remove();if(R7.follow)st.scrollTop=st.scrollHeight;}
function card(ev){var c=h("div","l-th");c.tabIndex=0;c.setAttribute("role","button");c.setAttribute("data-ev",ev.id);
  var w=h("div","where"),tag={note:"Note kept",check:"Checked",step:"Lector",done:"Written",live:"Writing now"}[ev.k]||"Lector";
  w.appendChild(h("span","tag"+(ev.k==="note"?" note":ev.k==="check"?" check":ev.k==="live"?" live":""),tag));w.appendChild(h("span",null,esc((ev.app?nm(ev.app)+" · ":"")+(ev.label||""))));c.appendChild(w);
  var b=h("div","body");b.textContent=ev.text||"";c.appendChild(b);
  if(ev.runId!=null&&ev.part!=null)c.appendChild(h("div","see","Show the code it came from · part "+(ev.part+1)));
  c.onclick=function(){if(ev.runId!=null&&ev.part!=null){R7.pin=ev.id;markPinned();showPart(ev.runId,ev.part,"back");if(one())setPanel("read");}else c.classList.toggle("open");};
  c.onkeydown=function(e){if(e.key==="Enter"||e.key===" "){e.preventDefault();c.onclick();}};
  if(R7.pin===ev.id)c.classList.add("on");return c;}
function markPinned(){[].forEach.call(document.querySelectorAll("#l7Stream .l-th"),function(c){c.classList.toggle("on",+c.getAttribute("data-ev")===R7.pin);});}
function paintStream(){var st=$("l7Stream");if(!st)return;st.innerHTML="";
  if(!R7.ev.length){var e=h("div","l-empty");var B=L7().brief;e.innerHTML="<b>Ready when you are</b>Lector will read "+esc(setName(B.apps)||"your apps")+", part by part. You can watch it here, and press any note to see the part of the app it came from.";st.appendChild(e);}
  R7.ev.forEach(function(ev){st.appendChild(card(ev));});paintLive();st.scrollTop=st.scrollHeight;}
var liveRaf=0;function paintLiveSoon(){if(liveRaf)return;liveRaf=(window.requestAnimationFrame||setTimeout)(function(){liveRaf=0;paintLive();});}
function paintLive(){var st=$("l7Stream");if(!st)return;var txt=LX.live||"",busy=R7.running&&(LX.busy||LX.writing);var c=$("l7LiveCard");
  if(!busy||!txt){if(c)c.remove();paintPaperLive();return;}
  if(!c){c=h("div","l-th");c.id="l7LiveCard";var w=h("div","where");w.appendChild(h("span","tag live","Writing now"));w.appendChild(h("span","lbl"));c.appendChild(w);var b=h("div","body");c.appendChild(b);c.classList.add("open");st.appendChild(c);}
  c.querySelector(".lbl").textContent=R7.step||"";var b2=c.querySelector(".body");b2.textContent=txt.length>3000?"…"+txt.slice(-3000):txt;var car=h("span","l-caret");b2.appendChild(car);
  if(R7.follow)st.scrollTop=st.scrollHeight;paintPaperLive();}
(function(){var pl=paintLive;paintLive=function(){var r=pl.apply(this,arguments);try{if(ASK.busy){var lv=document.querySelector('#l7Ask .l-cmp-m.lx.wait [data-live]'),t=LX.live||"";
  if(!lv&&t){paintAsk();return r;}if(lv){lv.textContent=t.length>1200?"…"+t.slice(-1200):t;}}}catch(e){}return r;};})();
function watchFollow(){var st=$("l7Stream");if(!st||st.__w)return;st.__w=1;st.addEventListener("scroll",function(){var atEnd=st.scrollHeight-st.scrollTop-st.clientHeight<28;R7.follow=atEnd;
  var j=st.querySelector(".l-jump");if(!atEnd&&!j&&R7.running){j=btn("pri sm l-jump","↓ Back to now",function(){R7.follow=true;R7.pin=null;markPinned();showCurrentPart();st.scrollTop=st.scrollHeight;j.remove();});st.appendChild(j);}
  else if(atEnd&&j)j.remove();},{passive:true});}
function showSomething(){var j=job(),B=L7().brief;
  if(R7.running)return;
  var runs=(j?j.apps:B.apps).map(function(k){return runFor(k,(j||B).depth);}).filter(Boolean);
  if(j&&j.doc){var dr=lxRun(j.doc);if(dr)runs=[dr];}
  if(!runs.length){codeIdle({head:"The code Lector reads appears here",body:"As Lector reads, the part in front of it shows here, with the app's own line numbers. Press any note in the thinking to see the part it came from."});return;}
  /* after a restart: the last notes kept from these readings */
  Promise.all(runs.map(function(r){return Promise.all([getParts(r),lxJSON(r.notesRef,[])]).then(function(x){return {r:r,parts:x[0],notes:x[1]};});})).then(function(all){
    if(R7.ev.length||R7.running)return;all.forEach(function(o){var idx=[];o.notes.forEach(function(x,i){if(x)idx.push(i);});idx.slice(-6).forEach(function(i){
      R7.ev.push({id:(R7.evN=(R7.evN||0)+1),k:"note",app:appOf(o.r),label:"Part "+(i+1)+" of "+o.parts.length+(o.parts[i]?" · "+o.parts[i].t:""),text:o.notes[i],runId:o.r.id,part:i,at:0});});});
    paintStream();var last=all[all.length-1];if(last){var li=-1;last.notes.forEach(function(x,i){if(x)li=i;});if(li>=0)showPart(last.r.id,li,"back");}});}

/* ---------------- the document panel ---------------- */
function tabsList(){var j=job(),B=L7().brief,src=j&&!R7.editing?j:B;var t=["analysis"];
  if(j&&j.doc)return t;KINDS.forEach(function(d){if(j?j.kinds.indexOf(d[0])>=0:B.docs[d[0]])t.push(d[0]);});return t;}
function curKey(){var j=job();return j?j.key:setKey(L7().brief.apps,L7().brief.purpose);}
function curApps(){var j=job();return j?(j.apps||[]):L7().brief.apps;}
function curPurpose(){var j=job();return j?j.purpose:L7().brief.purpose;}
function stored(kind){var s=L7().sets[curKey()];return s&&s.docs&&s.docs[kind]||null;}
function paintTabs(){var box=$("l7Dtabs");if(!box)return;var tabs=tabsList();if(!R7.doc||tabs.indexOf(R7.doc)<0)R7.doc=tabs.length>1&&!(job()&&job().doc)?tabs[1]:tabs[0];
  box.innerHTML="";tabs.forEach(function(k){var b=h("button");b.type="button";b.setAttribute("role","tab");b.setAttribute("aria-selected",k===R7.doc?"true":"false");
    var live=R7.live&&R7.live.kind===k,done=k==="analysis"?curApps().length&&curApps().every(function(a){var r=runFor(a,(job()||L7().brief).depth);return r&&r.status==="done";}):!!stored(k);
    b.appendChild(h("span","dot"+(live?" live":done?" done":"")));b.appendChild(document.createTextNode(k==="analysis"?"Notes and analysis":docLabel(k,curApps(),curPurpose()).replace("Cover letter for the programme","Cover letter")));
    b.onclick=function(){R7.doc=k;paintTabs();paintDoc();};box.appendChild(b);});
  var dc=$("l7DocChip"),j=job();if(dc){dc.className="l-chip"+(j&&j.status==="done"?" ok":"");dc.textContent=!j?"What you will get":R7.running?(phase()==="write"?"Written as you watch":"Notes as it reads"):j.status==="done"?"Ready to save":"Kept so far";}}
var paperRaf=0;function paintPaperLive(){if(!R7.live||R7.live.kind!==R7.doc)return;if(paperRaf)return;paperRaf=(window.requestAnimationFrame||setTimeout)(function(){paperRaf=0;var p=document.querySelector("#l7Desk [data-live]");
  if(!p){paintDoc();return;}p.textContent=LX.live||"";p.appendChild(h("span","l-caret"));});}
function paintDoc(){var desk=$("l7Desk"),ol=$("l7Outline");if(!desk)return;var kind=R7.doc||"analysis",apps=sorted(curApps()),j=job();
  paperStyle();desk.className="l-desk th-"+themeOf(kind,apps);
  var keepScroll=desk.__kind===kind?desk.scrollTop:0;desk.__kind=kind;
  var meta={apps:apps,name:j&&j.doc?(lxRun(j.doc)||{}).name:setName(apps),label:docLabel(kind,apps,curPurpose()),forText:kind==="analysis"?"":forText(curPurpose())};
  if(kind==="analysis"){analysisMd(j).then(function(md){if(R7.doc!=="analysis")return;if(!md){desk.innerHTML='<div class="l-paper th-'+themeOf("analysis",apps)+'"><p class="wait">The notes and the analysis appear here as Lector reads: a note after every part, then the analysis, one section at a time.</p></div>';ol.innerHTML="";return;}
      desk.innerHTML=paper("analysis",md,meta);outline(md,null);desk.scrollTop=keepScroll;});return;}
  if(R7.live&&R7.live.kind===kind){var md=R7.docMd[kind]||"";desk.innerHTML=(sealed(kind)?"":rule(kind))+paper(kind,md,Object.assign({},meta,{live:true}));outline(md,R7.live);desk.scrollTop=desk.scrollHeight;return;}
  var s=stored(kind);
  if(!s){desk.innerHTML=(sealed(kind)?"":rule(kind))+paper(kind,"",Object.assign({},meta,{wait:true}));outline("",null);return;}
  IngBig.load(s.ref).then(function(md){if(R7.doc!==kind)return;R7.cur={kind:kind,md:md||"",meta:meta,chk:s.chk};desk.innerHTML=(sealed(kind)?"":rule(kind))+paper(kind,md||"",Object.assign({},meta,{chk:s.chk,made:s.made}));outline(md||"",null);desk.scrollTop=keepScroll;
    if(s.chk&&s.chk.unmatched&&s.chk.unmatched.length){var dc=$("l7DocChip");if(dc){dc.className="l-chip";dc.textContent=s.chk.unmatched.length+" figure"+(s.chk.unmatched.length>1?"s":"")+" to check";}}});}
function rule(kind){return '<div class="l-rule"><span class="i">○</span>'+(kind==="cover"?"No seal on cover letters: your letters stay plain, as you asked.":kind==="cv"?"No seal on your CV.":"")+'</div>';}
function forText(p){var P=p&&p!=="portfolio"&&L7().posts[p];if(!P)return "";return [P.title,P.org].filter(Boolean).join(" · ");}
function outline(md,live){var ol=$("l7Outline");if(!ol)return;ol.innerHTML="";var blocks=lxBlocks(md),n=0;if(blocks.length&&blocks[0].k==="h"&&blocks[0].lv===1)blocks.shift();
  var hs=blocks.filter(function(b){return b.k==="h"&&b.lv<=2;});
  hs.forEach(function(b,i){var st=live&&i===hs.length-1&&live.writingSection?"live":"done";var x=h("button",st);x.type="button";x.innerHTML='<span class="m">'+(st==="done"?"✓":"●")+"</span>"+esc(b.t.length>34?b.t.slice(0,32)+"…":b.t);
    /* 6.1: measured on the screen, so the heading is found whatever the page's size (its offsetTop counts from the paper, not the desk) */
    x.onclick=function(){var dk=$("l7Desk"),t=dk.querySelector('[data-h="'+i+'"]');if(t)dk.scrollTo({top:dk.scrollTop+t.getBoundingClientRect().top-dk.getBoundingClientRect().top-14,behavior:"smooth"});};ol.appendChild(x);});
  if(live&&live.plan)live.plan.slice(hs.length).forEach(function(t){var x=h("button","wait");x.type="button";x.innerHTML='<span class="m">○</span>'+esc(t);ol.appendChild(x);});}
function analysisMd(j){var runs=[];if(j&&j.doc){var dr=lxRun(j.doc);if(dr)runs=[dr];}else{var B=j||L7().brief;runs=(j?j.apps:B.apps).map(function(k){return runFor(k,B.depth);}).filter(Boolean);}
  if(!runs.length)return Promise.resolve("");
  return Promise.all(runs.map(function(r){return Promise.all([lxJSON(r.analysisRef,{}),lxJSON(r.notesRef,[])]).then(function(x){return {r:r,a:x[0],notes:x[1]};});})).then(function(all){
    var out=["# Notes and analysis"];all.forEach(function(o){var r=o.r,secs=lxSections(r).filter(function(s){return o.a[s[0]];});
      out.push("## "+r.name);out.push(lxFactsText(r).replace(/^Facts measured from the file \(exact\):\n/,"").trim());
      if(secs.length)secs.forEach(function(s){out.push("### "+s[0]);out.push(o.a[s[0]]);});
      else{var kept0=o.notes.map(function(x,i){return x?{i:i,x:x}:null;}).filter(Boolean);out.push("### Notes so far ("+kept0.length+" of "+(r.total||o.notes.length)+" parts)");
        kept0.slice(-12).forEach(function(n){out.push("**Part "+(n.i+1)+"**\n\n"+n.x);});}});
    return out.join("\n\n");});}
/* the paper: as printed. Flat seals on the cover, numbered sections, the placeholders and any figure to check marked */
function inl(t,chk){var s=lxInline(t,esc);s=s.replace(/\[((?:your|to fill|the reader|the post|the years|the date)[^\]<]{0,70})\]/gi,'<span class="fill">[$1]</span>');
  if(chk&&chk.unmatched&&chk.unmatched.length)chk.unmatched.forEach(function(f){var re=new RegExp("(^|[^\\w.,])("+f.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")+")(?![\\w])","g");
    s=s.replace(re,'$1<span class="chk" title="Not found in the measures, the analysis, your CV or the posting: check it">$2</span>');});
  return s;}
function paper(kind,md,o){md=unmark(md);var personal=kind==="cover"||kind==="cv",a=o.apps||[],th=themeOf(kind,a),mode=o.both?"both":(night()?"night":"day");
  var open='<div class="l-paper th-'+th+'">';
  var out=[],blocks=lxBlocks(md);if(blocks.length&&blocks[0].k==="h"&&blocks[0].lv===1)blocks.shift();
  var note=null;if(blocks.length>1&&blocks[blocks.length-2].k==="hr"&&blocks[blocks.length-1].k==="p"){note=blocks.pop().t;blocks.pop();}
  function seal(k){return mode==="both"?paperSeal(k,"day")+paperSeal(k,"night"):paperSeal(k,mode==="night"?"night":"");}
  if(!personal&&kind!=="analysis"){var ck=crestKind(a),sh="";
    /* 6.1: two, three or four apps: their crest; one app: its own seal, as before */
    if(ck){try{sh=crestPaper(a,ck,mode,o);}catch(e){sh="";}}
    if(!sh){var ks=a.length===4&&ING_SEALS.master?["master"]:a;sh=ks.map(seal).join("");}
    var T=PT[th]||{};
    out.push('<div class="cv">'+(sh?'<div class="seals">'+sh+'</div>':'')+'<h1>'+esc(o.name||"")+'</h1>'+
      '<div class="caps"><i></i><span>'+esc(T.roman?romanDate(o.made?new Date(o.made):null):(o.label||""))+'</span><i></i></div>'+(T.roman&&o.label?'<div class="tag">'+esc(o.label)+'</div>':'')+
      (o.forText?'<div class="sub">Prepared for '+esc(o.forText)+'</div>':'')+(author()?'<div class="by">'+esc(author()+"  ·  "+month())+'</div>':'')+'</div>');}
  else if(kind==="analysis")out.push('<div class="cv"><h1>'+esc(o.name||"")+'</h1><div class="caps"><i></i><span>Notes and analysis</span><i></i></div></div>');
  if(kind==="cover")out.push('<div class="lhead"><b>'+esc(author()||"")+'</b>'+esc(today())+'</div>');
  if(o.wait){out.push('<p class="wait">'+(job()?"Written after the reading, section by section, as you watch.":"Written after the reading. Press Start reading in the brief.")+'</p>');return open+out.join("")+'</div>';}
  var n=0,hi=0,refs=false,lettered=blocks.some(function(b){return b.k==="h"&&b.lv===2&&/^[A-H][.)]\s/.test(b.t);}),list=null;
  function flush(){if(list){out.push("<"+list.t+">"+list.items.join("")+"</"+list.t+">");list=null;}}
  blocks.forEach(function(b){if(b.k==="ul"||b.k==="ol"){var t=b.k;if(!list||list.t!==t){flush();list={t:t,items:[]};}list.items.push("<li>"+inl(b.t,o.chk)+"</li>");return;}flush();
    if(b.k==="h"){var t2=b.t.trim();if(b.lv<=2){refs=/^(works cited|references|bibliography|sources)$/i.test(t2);if(!refs&&!lettered&&!/^(\d+|[A-H])[.)]\s/.test(t2)&&kind!=="analysis")t2=(++n)+". "+t2;
        var own=a.length>1?(IngHouseDocs.apps(t2).filter(function(k){return a.indexOf(k)>=0;})):[],nm2=/^(\d+|[A-H])([.)])\s+([\s\S]*)$/.exec(t2);
        out.push('<h2 data-h="'+(hi++)+'"'+(own.length===1?' class="own-'+own[0]+'"':'')+'>'+(nm2?'<span class="no">'+nm2[1]+'</span><span class="dot">'+nm2[2]+' </span><span>'+inl(nm2[3])+'</span>':inl(t2))+'</h2>');}
      else out.push('<h3>'+inl(t2)+'</h3>');return;}
    if(b.k==="p")out.push("<p>"+inl(b.t,o.chk)+"</p>");else if(b.k==="quote")out.push("<blockquote>"+inl(b.t,o.chk)+"</blockquote>");else if(b.k==="hr")out.push("<hr>");
    else if(b.k==="code")out.push("<pre>"+esc(b.lines.join("\n"))+"</pre>");
    else if(b.k==="table")out.push("<table>"+b.rows.map(function(r,i){return "<tr>"+r.map(function(c){return (i?"<td>":"<th>")+inl(c,o.chk)+(i?"</td>":"</th>");}).join("")+"</tr>";}).join("")+"</table>");});
  flush();
  if(o.live)out.push('<p data-live="1">'+esc(LX.live||"")+'<span class="l-caret"></span></p>');
  if(note)out.push('<p class="note">'+inl(note.replace(/^\*|\*$/g,""))+'</p>');
  return open+out.join("")+'</div>';}

/* ---------------- reading a set ---------------- */
function r7Go(){if(R7.running||LX.busy){ingToast("Lector is busy. Wait for it, or pause it first.");return;}
  var B=L7().brief,apps=sorted(B.apps);
  if(!apps.length){ingToast("Choose at least one of your apps first.");return;}
  var missing=apps.filter(function(k){return !kept(k);});if(missing.length){ingToast(listNames(missing)+(missing.length>1?" are":" is")+" not on this device yet. Add your apps first.");return;}
  var kinds=KINDS.map(function(d){return d[0];}).filter(function(k){return B.docs[k];});
  if(!kinds.length){ingToast("Choose at least one document in the brief.");return;}
  var o=modelPlan();if(!o.link&&!o.chosen){ingToast("No model is ready on this device yet. Ingenium's choice for Lector is "+(o.spec?o.spec.name:"Magister")+": get it in the brief, or on the Models page.");return;}
  if((kinds.indexOf("cover")>=0)&&B.purpose!=="portfolio"&&!L7().posts[B.purpose])ingToast("No "+(B.purpose==="job"?"posting":"programme's call")+" was added, so the letter is written for any reader. Add it in the brief to fit the letter to it.");
  if(o.stronger&&B.modelId)ingToast("A stronger model is ready here ("+o.stronger.customName+"). Lector writes with "+o.chosen.customName+", as you chose; change it in the brief for a stronger draft.");
  L7().job={key:setKey(apps,B.purpose),apps:apps,purpose:B.purpose,kinds:kinds,depth:B.depth||"overview",modelId:o.chosen?o.chosen.id:null,readModelId:(o.reader&&o.chosen&&o.reader.id!==o.chosen.id)?o.reader.id:null,meticulous:B.meticulous!==false,status:"reading",at:Date.now(),made:{},err:""};
  saveState();R7.ev=[];R7.pin=null;paintStream();paintAll();if(one())setPanel("read");try{midTab("rd");}catch(e){}r7Run();}
function beginDoc(){if(R7.running||LX.busy||typeof LX_PICK==="undefined"||!LX_PICK||!LX_PICK.P)return;var o=modelPlan();if(!o.link&&!o.chosen){ingToast("No model is ready on this device yet.");return;}
  var m=o.chosen,P=LX_PICK.P,parts=lxPartsFor(P,"overview",m);
  var run={id:"lx_"+Date.now().toString(36),name:LX_PICK.name,file:LX_PICK.name,kind:"doc",depth:"overview",modelId:m?m.id:null,created:Date.now(),updated:Date.now(),status:"reading",done:0,total:parts.length,facts:P.facts,
    partsRef:IngBig.newId(),notesRef:IngBig.newId(),mergeRef:IngBig.newId(),analysisRef:IngBig.newId(),writings:{}};
  Promise.all([lxPutJSON(run.partsRef,parts),lxPutJSON(run.notesRef,parts.map(function(){return "";}))]).then(function(){var s=lxState();s.runs.unshift(run);s.active=run.id;LX_PICK=null;
    L7().job={key:"doc:"+run.id,apps:[],doc:run.id,purpose:"portfolio",kinds:[],depth:"overview",modelId:run.modelId,status:"reading",at:Date.now(),made:{},err:""};saveState();R7.ev=[];paintStream();R7.doc="analysis";paintAll();if(one())setPanel("read");r7Run();});}
function ensureRun(k,j){var f=runFor(k,j.depth),old=staleRun(k,j.depth);
  if(old&&!useEarlier(k)){var mk=kept(k);
    if(!R7.ev.some(function(e){return e.k==="step"&&e.app===k&&e.label==="A newer copy";}))addEv({k:"step",app:k,label:"A newer copy",text:nm(k)+" was read from an earlier copy ("+(old.version||"its version was not named")+", on "+lxDate(old.finished||old.updated)+"). The copy kept now is "+(mk&&mk.version||"newer")+", so Lector reads it afresh and the documents describe it as it is now. The earlier reading stays kept."});}
  /* a reading left half-way keeps going from where it stopped, unless its parts were lost (a store cleared): then it starts again */
  if(f&&f.status!=="done")return lxJSON(f.partsRef,[]).then(function(p){if(p&&p.length)return f;
    var s=lxState();s.runs=s.runs.filter(function(r){return r.id!==f.id;});if(s.active===f.id)s.active=null;saveState();return ensureRun(k,j);});
  if(f)return Promise.resolve(f);
  addEv({k:"step",app:k,label:"Measuring",text:"Measuring "+nm(k)+" before it is read: its size, the words on its screens, the sentences it says, the notes in its code and how it is built. This takes a moment and needs no model."});
  return libText(k).then(function(text){if(!text)throw new Error(nm(k)+" is no longer on this device. Add it again (Your apps).");var meta=kept(k);
    return lxPrepare(meta.name||(nm(k)+".html"),text,function(s){R7.prepNote=nm(k)+": "+s;paintProgress();}).then(function(P){R7.prepNote="";
      var m=modelById(j.readModelId||j.modelId),parts=lxPartsFor(P,j.depth,m);
      var run={id:"lx_"+Date.now().toString(36),name:nm(k),app:k,sha:meta.sha256||"",version:meta.version||"",file:meta.name||"",kind:"app",depth:j.depth,modelId:m?m.id:null,created:Date.now(),updated:Date.now(),
        status:"reading",done:0,total:parts.length,facts:P.facts,partsRef:IngBig.newId(),notesRef:IngBig.newId(),mergeRef:IngBig.newId(),analysisRef:IngBig.newId(),writings:{}};
      R7.src={};var nl=[],i=-1;while((i=text.indexOf("\n",i+1))>=0)nl.push(i);R7.src[k]={text:text,nl:nl};R7.parts[run.id]=parts;
      return Promise.all([lxPutJSON(run.partsRef,parts),lxPutJSON(run.notesRef,parts.map(function(){return "";}))]).then(function(){var s=lxState();s.runs.unshift(run);s.active=run.id;saveState();return run;});});});}
function readRun(run){if(run.status==="done")return Promise.resolve();
  if(job()&&(job().readModelId||job().modelId)&&!run.modelId)run.modelId=job().readModelId||job().modelId;
  return new Promise(function(res,rej){lxStart(run.id);var waited=0;
    var t=setInterval(function(){waited++;if(LX.busy&&LX.runId===run.id)return;if(run.status==="done"){clearInterval(t);res();return;}
      if(LX.yielded===run.id&&!LX.stop)return;  /* paused for a message in the chat: it carries on by itself */
      if(LX.busy)return;clearInterval(t);rej(run.status==="error"?new Error(run.err||"stopped by an error"):stopErr());},700);});}
function r7Run(){var j=job();if(!j||R7.running)return;if(LX.busy){ingToast("Lector is busy. Wait a moment.");return;}
  R7.running=true;LX.stop=false;j.err="";if(j.status!=="writing")j.status="reading";saveState();paintAll();watchFollow();
  var i=0,apps=j.doc?[]:j.apps;
  function nextApp(){if(LX.stop)return Promise.reject(stopErr());if(j.doc){var dr=lxRun(j.doc);return dr?readRun(dr):Promise.reject(new Error("That reading is no longer kept."));}
    if(i>=apps.length)return Promise.resolve();var k=apps[i++];
    return ensureRun(k,j).then(function(run){if(run.status==="done"){if(!R7.ev.some(function(e){return e.k==="step"&&e.app===k;}))addEv({k:"step",app:k,label:"Read before",text:nm(k)+" was read in full on "+lxDate(run.finished||run.updated)+(run.depth==="thorough"?", every line of its code":"")+". Lector uses that reading."+(staleRun(k,j.depth)?" It is the reading of an earlier copy ("+(run.version||"its version was not named")+"), as you chose.":"")});return nextApp();}
      return readRun(run).then(function(){addEv({k:"done",app:k,label:"Read in full",text:"All "+(run.total||0)+" parts of "+run.name+" are read, the notes joined and the analysis written."});paintBrief();return nextApp();});});}
  var p=j.status==="writing"?Promise.resolve():nextApp();
  p.then(function(){if(LX.stop)throw stopErr();if(j.doc)return;j.status="writing";saveState();paintAll();return writeAll(j);})
   .then(function(){if(LX.stop)throw stopErr();j.status="done";j.finished=Date.now();R7.step="";
     addEv({k:"done",label:"Finished",text:j.doc?"The analysis is written.":"Every document is written and checked: "+j.kinds.map(function(k){return docLabel(k,j.apps,j.purpose);}).join(", ")+". Choose one in the document panel and press Save."});
     ingToast(j.doc?"Lector has finished the analysis.":"Lector has finished. Your documents are ready to save.");if(one())setPanel("doc");})
   .catch(function(e){if(e&&e.stopped||LX.stop)j.status="paused";else{j.status="error";j.err=String(e&&e.message||e);addEv({k:"step",label:"Stopped",text:"Lector stopped: "+j.err+" Press Go on to try again from where it stopped."});}})
   .then(function(){R7.running=false;R7.live=null;R7.step="";LX.writing=null;if(LX.busy&&!LX.runId)LX.busy=false;saveState();paintAll();paintLive();paintBrief();
     try{if(R7.pin==null){var last=null;R7.ev.forEach(function(e){if(e.k==="note")last=e;});if(last)showPart(last.runId,last.part,"back");}}catch(e){}});}

/* ---------------- writing for the set ---------------- */
var A_IN="In brief",A_PUR="Purpose and the person it serves",A_DOES="What it does",A_FOC="Design for focus and well-being",A_BUILT="How it is built",A_RES="Research and scholarly value",A_SK="Skills it shows",A_MADE="How it was made",A_LIM="Limits and next steps";
var PLAN={dossier:[["Title and summary","Begin with one title line in bold; then a summary of about 150 words.",[A_IN,A_PUR,A_SK],230],
    ["Context and motivation","Why the work began and the gap it answers.",[A_PUR,A_IN],280],["Aims","What the work sets out to do.",[A_PUR,A_DOES],220],
    ["Design and methods","How it was designed and made: the approach, the choices and the iterations.",[A_MADE,A_FOC],320],
    ["What it does","Its features, grouped by area.",[A_DOES],340],["Accessibility and AuDHD-informed design","How it supports focus, calm, executive function and different ways of working.",[A_FOC],300],
    ["Technical implementation","Architecture, technologies, devices, offline work and data.",[A_BUILT],320],["Evaluation and evidence","What shows that it works: testing, revisions, use.",[A_MADE,A_LIM],260],
    ["Contribution and significance","What it adds to research, practice or teaching.",[A_RES,A_SK],280],["Limitations and future work","Honest limits and the next steps.",[A_LIM],220]],
  portfolio:[["What it is","",[A_IN,A_DOES],180],["What it shows of my work","",[A_SK,A_RES],180],["How it was made","",[A_MADE,A_BUILT],160],["Where it goes next","",[A_LIM],120]]};
/* R113 (17 October 2026), her word: "I want the output from Lector to be well written and be up to Oxbridge DPhil standards and be
   extremely meticulous." The charter below is given to the model for every piece it writes, and each section is then examined
   against the material a second time (the Examine switch in the brief), before Ingenium's own checks of figures and style. */
var CHARTER="\n\nTHE STANDARD. Write as a doctoral candidate writes for an Oxford or Cambridge examiner. Each paragraph carries one idea: a topic sentence first, the evidence next (a measured fact or a passage of the analysis, named in the sentence), and a closing sentence that ties it to the aim of the section. Prefer the specific to the general, the concrete figure to the adjective, the plain word to the grand one. Every evaluative claim rests on something in the material; where the material is silent, say nothing rather than guess. Calibrate every hedge: what is measured is stated plainly, what is inferred is marked as inferred (\"the measures suggest\", \"on this reading\"), and nothing is called proven. No superlative without a measure beside it. Name each app exactly as the material names it, and use one term for one thing throughout. Define a technical term the first time it is needed, in a few words, and avoid jargon the examiner would have to look up. British spelling and punctuation; the formal register throughout; no contractions, no rhetorical questions, no exclamation marks, no lists or bullet points in prose sections, no sentence beyond about thirty words unless its structure needs it. Do not open with a generality about the world or close with a cliché; begin with the matter in hand. Do not repeat what another section is for: a dossier's Aims are not its Methods. Quote nothing that is not in the material. Where a list of her sources is given, cite a source by its number in square brackets only where it supports the sentence, and cite nothing that is not on that list.";
var BANNED=["leverage","seamless","robust","cutting-edge","passionate","delve","tapestry","showcase","innovative","empower","harness","unlock","journey","testament","realm","game-changing","world-class","state-of-the-art","revolutionary","unparalleled","best-in-class","groundbreaking","synergy","holistic","paradigm","elevate","transformative","dynamic","vibrant"];
function sysW(){var me=author()||"the owner";return "You are Lector, writing on the owner's own device for "+me+", who designed and built these apps alone. Write in British English, in the first person as her, in clear, exact prose of the standard expected in an Oxford or Cambridge doctoral application: precise, measured, specific and unhurried, never promotional. Use only what the material given shows: the measured facts, the analysis, her CV and the posting. Never invent a fact, a number, a name, a date, a post, a qualification or a quotation. Where a fact about her is needed and is not in the material, write a short placeholder in square brackets, such as [your current role]. Keep every figure exactly as given. Do not use these words: "+BANNED.join(", ")+". Do not repeat the heading you are given, and add no headings of your own unless asked."+CHARTER+askStanding();}
function meticulous(){var B=L7().brief;return B.meticulous!==false;}
/* the examiner's pass: the draft of a section, read against the material a second time, and revised */
function review(kind,title,body,G,o){if(!meticulous()||!body||body.length<80)return Promise.resolve(body);
  var label=docLabel(kind,G.apps,G.purpose).toLowerCase();setLive(kind,o.plan||[title],o.i||0,"Examining the "+label+(o.plan?" · "+title:"")+" against the material");
  return ask(function(sc){var u="Below is the draft of "+(o.plan?"the section \""+title+"\" of ":"")+"a "+label+" about "+about(G)+forLine(G)+". Examine it as an Oxford or Cambridge doctoral examiner would, against the material that follows, and return the revised text.\n"+
      "1. Strike, or mark as inferred, every claim the material does not support; keep every claim it does support.\n2. Make every figure exactly what the material gives; take out any figure the material does not give.\n3. One idea to a paragraph, the topic sentence first; take out filler, repetition and promotional words; prefer the concrete to the general.\n4. British English, the formal register, no contractions"+(o.prose!==false?", no bullet points":"")+"; sentences of a reasonable length.\n5. Keep the first person and her voice, and the placeholders in square brackets where they stand.\n6. Keep it close to "+(o.words||300)+" words.\n"+(o.extra||"")+
      (G.sources&&G.sources.length?"7. Keep each citation in square brackets where it stands when the source supports the sentence; take it out where it does not; add none that is not on the list of her sources.\n":"")+
      "Return only the revised text: no heading, no notes on what you changed, no commentary.\n\n"+context(G,sc,{keys:o.keys,anShare:0.4,post:true,postShare:0.1,cv:!!o.cv,cvShare:0.1,voice:false,letters:false,sources:!!(G.sources&&G.sources.length)})+"\n\nTHE DRAFT:\n"+body;
    return [{role:"system",content:sysW()+" You are now the examiner of a draft, and you return the revised text and nothing else."},{role:"user",content:u}];},Math.max(LX_OUT_SECTION,Math.round(body.length/3.2)+200),0.25)
  .then(function(x){var r=clean(x,title);if(!r||r.length<body.length*0.4||/^(the draft|here is|revised)/i.test(r.slice(0,24)))return body;
    var ch=wordsChanged(body,r);addEv({k:"check",label:"Examined · "+(o.plan?title:docLabel(kind,G.apps,G.purpose)),text:ch?Math.round(ch*100)+"% of the words were changed in the examiner's pass; the figures were held to the measures and the claims to the material.":"The examiner's pass left the draft as it was."});return r;},function(){return body;});}
/* the share of words that differ between the draft and the revision: those taken away and those added, over the draft's count */
function wordsChanged(a,b){var A={},n=0,added=0,left=0;String(a).toLowerCase().split(/\W+/).forEach(function(w){if(w){A[w]=(A[w]||0)+1;n++;}});
  String(b).toLowerCase().split(/\W+/).forEach(function(w){if(!w)return;if(A[w]>0)A[w]--;else added++;});Object.keys(A).forEach(function(w){left+=A[w];});
  return n?Math.min(1,(added+left)/n):0;}
/* Ingenium's own pass over the finished text: British spellings set right, and what remains for her to look at */
var SPELL=[["color","colour"],["colors","colours"],["colored","coloured"],["organize","organise"],["organized","organised"],["organizes","organises"],["organizing","organising"],["organization","organisation"],["organizations","organisations"],["recognize","recognise"],["recognized","recognised"],["recognizes","recognises"],["realize","realise"],["realized","realised"],["realizes","realises"],["analyze","analyse"],["analyzed","analysed"],["analyzes","analyses"],["analyzing","analysing"],["behavior","behaviour"],["behaviors","behaviours"],["favor","favour"],["favorite","favourite"],["favorites","favourites"],["honor","honour"],["labor","labour"],["center","centre"],["centers","centres"],["centered","centred"],["defense","defence"],["catalog","catalogue"],["modeling","modelling"],["modeled","modelled"],["traveled","travelled"],["traveling","travelling"],["canceled","cancelled"],["labeled","labelled"],["labeling","labelling"],["fulfill","fulfil"],["enrollment","enrolment"],["gray","grey"],["theater","theatre"],["meter","metre"],["meters","metres"],["liter","litre"],["liters","litres"],["optimize","optimise"],["optimized","optimised"],["optimizing","optimising"],["optimization","optimisation"],["customize","customise"],["customized","customised"],["summarize","summarise"],["summarized","summarised"],["emphasize","emphasise"],["emphasized","emphasised"],["prioritize","prioritise"],["prioritized","prioritised"],["minimize","minimise"],["minimized","minimised"],["maximize","maximise"],["maximized","maximised"],["utilize","utilise"],["utilized","utilised"],["practicing","practising"],["licensed","licenced"],["program","programme"],["programs","programmes"]];
var CONTR=/\b(?:don't|doesn't|didn't|can't|cannot't|won't|wouldn't|couldn't|shouldn't|isn't|aren't|wasn't|weren't|haven't|hasn't|hadn't|it's|that's|there's|I'm|I've|I'd|I'll|we're|we've|they're|you're|let's)\b/gi;
function styleFix(md){var fixed={},parts=md.split(/(```[\s\S]*?```|`[^`\n]*`|https?:\/\/\S+|\[[^\]]*\]\([^)]*\))/);
  for(var i=0;i<parts.length;i+=2){var t=parts[i];
    SPELL.forEach(function(p){var re=new RegExp("\\b"+p[0]+"\\b","gi");t=t.replace(re,function(w){var out=p[1];if(w===w.toUpperCase()&&w.length>1)out=out.toUpperCase();else if(w.charAt(0)===w.charAt(0).toUpperCase())out=out.charAt(0).toUpperCase()+out.slice(1);fixed[p[0]+" → "+p[1]]=(fixed[p[0]+" → "+p[1]]||0)+1;return out;});});
    parts[i]=t;}
  var out=parts.join(""),body=out.split("\n---\n")[0],prose=body.split("\n").filter(function(l){return l.trim()&&!/^\s*(#|\||[-*]\s|\d+[.)]\s)/.test(l);}).join(" ");
  var contr=(prose.match(CONTR)||[]).length,promo=0;BANNED.forEach(function(w){var m=prose.match(new RegExp("\\b"+w.replace(/-/g,"[- ]")+"\\b","gi"));if(m)promo+=m.length;});
  var longS=prose.split(/(?<=[.!?])\s+(?=[A-Z\[])/).filter(function(s){return s.split(/\s+/).length>45;}).length;
  var fx=Object.keys(fixed);return {md:out,fixed:fx,contractions:contr,promo:promo,long:longS,
    line:(fx.length?fx.length+" spelling"+(fx.length===1?"":"s")+" set to British ("+fx.slice(0,4).join(", ")+(fx.length>4?"…":"")+").":"")+
      ((contr||promo||longS)?" Left for you to look at: "+[contr?contr+" contraction"+(contr===1?"":"s"):"",promo?promo+" promotional word"+(promo===1?"":"s"):"",longS?longS+" sentence"+(longS===1?"":"s")+" of more than 45 words":""].filter(Boolean).join(", ")+".":(fx.length?"":" Style: no contractions, no promotional words, no over-long sentences."))};}
function cut(t,n){t=String(t||"");if(n<=0)return "";if(t.length<=n)return t;var c=t.slice(0,n),p=Math.max(c.lastIndexOf(". "),c.lastIndexOf("\n"));return (p>n*0.6?c.slice(0,p+1):c)+" […]";}
function factsShort(r){var f=r.facts||{};return "- "+r.name+(r.version?" (version "+r.version+")":"")+": "+fmtBytes(f.chars||0)+" in one file; "+fmtBytes(f.jsChars||0)+" of its own scripts; "+(f.functions||0)+" named functions; "+(f.headings||0)+" headings on its screens; "+(f.sayings||0)+" sentences in English"+(f.sayingsFr?" and "+f.sayingsFr+" in French":"")+"; "+(f.comments||0)+" notes left in its code"+(f.passes?"; "+f.passes+" numbered passes ("+f.passFirst+" to "+f.passLast+")":"")+".";}
function gather(j){var runs=j.apps.map(function(k){return runFor(k,j.depth);}).filter(Boolean),M=L7().me,P=j.purpose!=="portfolio"?L7().posts[j.purpose]:null;
  return Promise.all([Promise.all(runs.map(function(r){return lxJSON(r.analysisRef,{});})),M.cv?IngBig.load(M.cv.ref):null,
      Promise.all(M.writing.map(function(x){return IngBig.load(x.ref);})),Promise.all(M.letters.map(function(x){return IngBig.load(x.ref);})),P?IngBig.load(P.ref):null])
    .then(function(r){var G={runs:runs,an:r[0],cv:r[1]||"",writing:(r[2]||[]).filter(Boolean),letters:(r[3]||[]).filter(Boolean),voice:M.voice!==false,post:P?Object.assign({},P,{text:r[4]||""}):null,apps:j.apps,purpose:j.purpose,sources:[]};
      /* R115: her sources from Fontes, formatted in her chosen style, numbered for the model to cite */
      if(M.cite===false||typeof fontesItems!=="function")return G;var items=[];try{items=fontesItems().slice(0,40);}catch(e){}if(!items.length)return G;
      var style=(state.fontes&&state.fontes.style)||"apa";
      return fontesFormat(items,style).then(function(rows){var by={};rows.forEach(function(x){by[String(x.id)]=x.text;});
        G.sources=items.map(function(c,i){return {n:i+1,text:by[String(c.id)]||(typeof fontesPlain==="function"?fontesPlain(c):String(c.title||"")),title:c.title||"",abstract:String(c.abstract||"").replace(/<[^>]+>/g,"").slice(0,600),peer:/article-journal|review/.test(c.type||""),note:c.ingNote||""};});
        G.style=style;return G;},function(){return G;});});}
function clean(t,title){t=String(t||"").replace(/<think>[\s\S]*?<\/think>/g,"").trim();var L=t.split("\n");
  while(L.length&&(/^#{1,6}\s/.test(L[0])||(title&&L[0].replace(/[*#:]/g,"").trim().toLowerCase()===String(title).toLowerCase())))L.shift();
  return L.join("\n").trim();}
function ask(build,max,temp){var scale=1,tries=0,busyN=0;
  return new Promise(function(res,rej){(function go1(){if(LX.stop){rej(stopErr());return;}var msgs=build(scale);LX.live="";paintLiveSoon();
    lxAsk({modelId:(job()&&job().modelId)||R7.askModel},msgs,max,temp,function(t){LX.live=t;paintLiveSoon();}).then(function(t){res(t);},function(e){var m=String(e&&e.message||e);
      if(LX.stop){rej(stopErr());return;}
      if(m==="busy"&&busyN++<400){setTimeout(go1,1500);return;}
      if(lxIsCtxError(e)&&scale>0.3){scale*=0.7;setTimeout(go1,300);return;}
      if(++tries<=2){setTimeout(go1,2000);return;}rej(e);});})();});}
function room(){var m=modelById((job()&&job().modelId)||R7.askModel);var ctx=lxCtx(m);return lxBudget(ctx,LX_OUT_SECTION,false);}
function material(G,keys,cap){var per=Math.floor(cap/Math.max(1,G.runs.length));
  return G.runs.map(function(r,i){var a=G.an[i]||{};var t=keys.filter(function(k){return a[k];}).map(function(k){return "("+k+") "+a[k];}).join("\n\n");return "### "+r.name+"\n"+cut(t,per);}).join("\n\n");}
function context(G,scale,o){var R=room()*scale,parts=[];var many=G.runs.length>1;
  parts.push("FACTS MEASURED FROM THE FILES (exact):\n"+(many?G.runs.map(factsShort).join("\n"):lxFactsText(G.runs[0])));
  if(o.keys)parts.push("ANALYSIS"+(many?" (each app in turn)":"")+":\n"+material(G,o.keys,Math.floor(R*(o.anShare||0.5))));
  if(G.post&&o.post)parts.push((G.purpose==="programme"?"THE PROGRAMME'S CALL":"THE POSTING")+" (fit what you write to what it asks for, where the material allows; never claim what it does not show):\n"+cut(G.post.text,Math.floor(R*(o.postShare||0.1))));
  if(o.cv&&G.cv)parts.push("HER CV (the only source of facts about her: names, dates, posts, qualifications):\n"+cut(G.cv,Math.floor(R*(o.cvShare||0.12))));
  if(o.voice&&G.voice&&G.writing.length)parts.push("HER OWN WRITING (match its voice, rhythm and vocabulary; do not copy its content):\n"+cut(G.writing.join("\n\n---\n\n"),Math.floor(R*0.08)));
  if(o.letters&&G.letters.length)parts.push("HER PAST COVER LETTERS (for their shape and tone only; their facts may be out of date):\n"+cut(G.letters.join("\n\n---\n\n"),Math.floor(R*0.1)));
  /* R115: her sources, to cite by number where they bear on a claim; never a source that is not here */
  if(o.sources&&G.sources&&G.sources.length)parts.push("HER SOURCES (kept in Fontes; cite one by its number in square brackets, like [2], only where it supports the sentence; use no source that is not on this list and invent none; a source marked peer-reviewed may carry more weight):\n"+
    cut(G.sources.map(function(s){return "["+s.n+"] "+s.text+(s.peer?" [peer-reviewed journal]":"")+(s.note?"\n    Her note: "+s.note:"")+(s.abstract?"\n    Abstract: "+s.abstract:"");}).join("\n"),Math.floor(R*(o.srcShare||0.14))));
  return parts.join("\n\n");}
function about(G){var n=G.runs.length;return n===4?"the four apps of The Offline Project ("+listNames(G.apps)+"), as one body of work":n>1?listNames(G.apps)+", together, as one body of work":G.runs[0].name;}
function forLine(G){if(!G.post)return G.purpose==="programme"?" for a doctoral or academic application":G.purpose==="job"?" for a job application":" for my professional portfolio";
  return " for "+(G.purpose==="programme"?"an application to ":"an application for ")+[G.post.title,G.post.org].filter(Boolean).join(" · ");}
function sectionMsgs(G,kind,s,scale){var many=G.runs.length>1,t=s[0];if(many&&t==="What it does")t="What the apps do";
  var u="Write the section \""+t+"\" of a "+docLabel(kind,G.apps,G.purpose).toLowerCase()+" about "+about(G)+forLine(G)+". "+(s[1]||"")+
    (many&&s[0]==="What it does"?" Give each app its own paragraph, beginning with its name in bold.":"")+(many&&s[0]!=="What it does"?" Write about the apps together, naming each where it matters.":"")+
    " Use only what the material shows; where it says nothing on a point, leave the point out rather than guess. About "+s[3]+" words, in paragraphs.\n\n"+
    context(G,scale,{keys:s[2],anShare:0.52,post:true,postShare:0.1,cv:/Title|Contribution|Context/.test(s[0]),cvShare:0.08,voice:true,sources:/Context|Research|Contribution|Accessibility|Design and methods|Limitations|What it shows/.test(s[0])});
  return [{role:"system",content:sysW()},{role:"user",content:u}];}
function setLive(kind,plan,i,label){R7.live={kind:kind,plan:plan,i:i,of:plan?plan.length:1,writingSection:true};R7.step=label;paintProgress();paintLive();if(R7.doc===kind)paintDoc();else paintTabs();}
function writeAll(j){var kinds=j.kinds.filter(function(k){return !j.made[k];}),i=0;
  return gather(j).then(function(G){if(!G.runs.length)throw new Error("None of the apps in this set has been read in full yet.");
    function next(){if(LX.stop)return Promise.reject(stopErr());if(i>=kinds.length)return Promise.resolve();var kind=kinds[i++];
      LX.busy=true;LX.runId=null;LX.writing=kind;R7.docMd[kind]="# "+setName(G.apps)+" · "+docLabel(kind,G.apps,G.purpose)+"\n\n";
      addEv({k:"step",label:docLabel(kind,G.apps,G.purpose),text:"Writing the "+docLabel(kind,G.apps,G.purpose).toLowerCase()+" for "+setName(G.apps)+(G.post?", fitted to "+(G.post.title||"the posting"):"")+(G.voice&&G.writing.length?", in your own voice":"")+"."});
      R7.doc=kind;
      return (kind==="functions"?atlasDoc(G):writeDoc(kind,G)).then(function(md){return keepDoc(j,kind,md,G);}).then(function(){j.made[kind]=true;LX.writing=null;R7.live=null;saveState();paintAll();return next();},
        function(e){LX.writing=null;LX.busy=false;R7.live=null;throw e;});}
    return next().then(function(){LX.busy=false;LX.writing=null;});});}
function writeDoc(kind,G){var label=docLabel(kind,G.apps,G.purpose),head="# "+setName(G.apps)+" · "+label+"\n\n",pieces=[];
  function put(md){R7.docMd[kind]=head+pieces.concat(md?[md]:[]).join("\n\n");}
  if(kind==="dossier"||kind==="portfolio"){var plan=PLAN[kind],k=0,titles=plan.map(function(s){return G.runs.length>1&&s[0]==="What it does"?"What the apps do":s[0];});
    return (function next(){if(LX.stop)return Promise.reject(stopErr());if(k>=plan.length)return Promise.resolve();var s=plan[k++],t=titles[k-1];setLive(kind,titles,k-1,"Writing the "+label.toLowerCase()+" · "+t+" ("+k+" of "+plan.length+")");
      return ask(function(sc){return sectionMsgs(G,kind,s,sc);},LX_OUT_SECTION,0.45).then(function(x){var draft=clean(x,t);
        addEv({k:"done",label:label+" · "+t,text:draft.length>420?draft.slice(0,420)+"…":draft});
        return review(kind,t,draft,G,{plan:titles,i:k-1,keys:s[2],words:s[3],cv:/Title|Contribution|Context/.test(s[0])});}).then(function(body){pieces.push("## "+t+"\n"+body);put();return next();});})()
      .then(function(){var cited=citedIn(pieces.join("\n"),G);if(cited.length)pieces.push("## References\n"+cited.map(function(s){return "["+s.n+"] "+s.text;}).join("\n\n"));if(kind==="dossier")pieces.push(references(G).replace(/^## References\n/,cited.length?"## The works\n":"## References\n"));return finish();});}
  if(kind==="appendix"){setLive(kind,["Introduction","A. Measures","B. Technologies","C. Features","D. Design for focus and well-being","E. Development history","F. Web addresses"],0,"Writing the "+label.toLowerCase()+" · its introduction");
    return ask(function(sc){return [{role:"system",content:sysW()},{role:"user",content:"Write a short introduction, about 90 words, to the technical appendix of "+about(G)+forLine(G)+". Say what the tables that follow show: measures taken from the files themselves, the technologies found in the code, and passages from the analysis. No headings.\n\n"+context(G,sc,{})}];},300,0.3)
      .then(function(intro){pieces.push(clean(intro));tables(G).forEach(function(t){pieces.push(t);});put();return finish();});}
  if(kind==="cover"){setLive(kind,["The letter"],0,"Writing the "+label.toLowerCase());
    var to=G.post?(G.purpose==="programme"?"an application to this programme: ":"the post of ")+[G.post.title,G.post.org].filter(Boolean).join(", "):"any reader of my portfolio, introducing my work (use placeholders such as [the post] and [the organisation] where a letter names them)";
    return ask(function(sc){return [{role:"system",content:sysW()},{role:"user",content:"Write a cover letter, for "+to+". Four or five paragraphs. Begin with \"Dear [the reader's name],\" unless the posting names the reader. The opening says what I am applying for and why in one or two sentences. The middle paragraphs set my work on "+about(G)+" against what the "+(G.purpose==="programme"?"programme":"post")+" asks for, with concrete details from the material. The closing is brief and courteous. End with \"Yours sincerely,\" and my name on its own line. Names, posts and dates come only from my CV; leave anything else in square brackets. No headings, no address block.\n\n"+
      context(G,sc,{keys:[A_IN,A_SK,A_DOES,A_RES],anShare:0.36,post:true,postShare:0.2,cv:true,cvShare:0.16,voice:true,letters:true})}];},1200,0.5)
      .then(function(x){return review(kind,"The letter",clean(x),G,{keys:[A_IN,A_SK,A_DOES,A_RES],words:380,cv:true,extra:"7. Keep the letter's shape: the greeting, four or five paragraphs, the close. It must fit what the "+(G.purpose==="programme"?"programme":"post")+" asks for where the material allows, and claim nothing the material does not show.\n"});}).then(function(body){pieces.push(body);put();return finish();});}
  if(kind==="cv"){setLive(kind,["Projects"],0,"Writing the "+label.toLowerCase());
    return ask(function(sc){return [{role:"system",content:sysW()},{role:"user",content:"Write the Projects section of my CV for "+about(G)+forLine(G)+". For each app: a title line in bold (its name, what it is in a few words, and [the years] unless my CV gives them), then 3 to 5 bullet points, each starting with a strong verb, naming concrete features or results and using the exact figures given. After the apps, one line beginning \"Skills:\" with the skills they show together. Match the style of my CV where it is given. No other headings.\n\n"+
      context(G,sc,{keys:[A_IN,A_DOES,A_SK,A_BUILT],anShare:0.5,post:true,postShare:0.08,cv:true,cvShare:0.14})}];},1100,0.4)
      .then(function(x){return review(kind,"Projects",clean(x,"Projects"),G,{keys:[A_IN,A_DOES,A_SK,A_BUILT],words:260,cv:true,prose:false,extra:"7. Keep the CV's shape: a bold title line for each app, then its bullet points, each beginning with a strong verb and giving an exact figure where the material gives one.\n"});}).then(function(body){pieces.push("## Projects\n"+body);put();return finish();});}
  return Promise.reject(new Error("Lector does not know how to write that document."));
  /* 6.1: the document ends with its own last word. The owner's words (20 October 2026): "I don't want any watermarks on its
     documents or hidden in its texts." It no longer closes with a line naming the model, Ingenium and the date; what was
     checked, and what is left to check, is said in the Thinking panel instead. */
  function finish(){var md=head+pieces.join("\n\n");R7.docMd[kind]=md;return md;}}
/* 6.1: a document kept before 6.1 still ends with that line: it is left out wherever the document is shown, copied or saved */
function unmark(md){return String(md==null?"":md).replace(/\n*(?:-{3,}|\*{3,})\s*\n+\*Drafted by [^\n]*?(?:Lector|Ingenium)[^\n]*\*\s*$/,"");}
/* R115: the sources the text cites, in the order of their numbers; a number that matches no source is left to the check */
function citedIn(text,G){var S=G.sources||[],used={};String(text).replace(/\[(\d+(?:\s*[,–-]\s*\d+)*)\]/g,function(all,inner){inner.split(/[,–-]/).forEach(function(n){n=+String(n).trim();if(n>=1&&n<=S.length)used[n]=1;});return all;});
  return S.filter(function(s){return used[s.n];});}
function references(G){var a=author(),parts=a.trim().split(/\s+/),sur=parts.pop()||a,ini=parts.map(function(p){return p.charAt(0).toUpperCase()+".";}).join(" ");
  return "## References\n"+G.runs.map(function(r){var meta=kept(appOf(r))||{};var y=(meta.date&&String(meta.date).slice(0,4))||String(new Date().getFullYear());
    return (a?sur+", "+ini+" ":"")+"("+y+") *"+r.name+"*"+(r.version||meta.version?", version "+(r.version||meta.version):"")+" [software]. Offline application, kept on the owner's devices.";}).join("\n\n");}
function tables(G){var out=[],runs=G.runs,many=runs.length>1,F=runs.map(function(r){return r.facts||{};});
  function row(lbl,fn){return [lbl].concat(F.map(fn));}
  var head=["Measure"].concat(runs.map(function(r){return r.name;}));
  var rows=[head,row("Version",function(f,i){return String(runs[i].version||(kept(appOf(runs[i]))||{}).version||"–");}),row("Size of the file",function(f){return fmtBytes(f.chars||0);}),
    row("Embedded pictures and files",function(f){return (f.mediaN||0)+" ("+fmtBytes(f.mediaBytes||0)+")";}),row("Its own scripts",function(f){return fmtBytes(f.jsChars||0)+" in "+(f.scripts||0)+" blocks";}),
    row("Its own styles",function(f){return fmtBytes(f.cssChars||0);}),row("Named functions",function(f){return String(f.functions||0);}),row("Headings on its screens",function(f){return String(f.headings||0);}),
    row("Buttons (about)",function(f){return String(f.controls||0);}),row("Sentences it says, English",function(f){return String(f.sayings||0);}),row("Sentences it says, French",function(f){return String(f.sayingsFr||0);}),
    row("Notes left in its code",function(f){return String(f.comments||0);}),row("Numbered passes recorded",function(f){return f.passes?f.passes+(f.passFirst?" ("+f.passFirst+" to "+f.passLast+")":""):"0";}),
    row("Theme variables, animations, screen rules",function(f){return (f.cssVars||0)+", "+(f.keyframes||0)+", "+(f.mediaQueries||0);})];
  out.push("## A. Measures of the files\n"+lxTable(rows));
  var tech={};F.forEach(function(f,i){(f.inventory||[]).forEach(function(r){tech[r[0]]=tech[r[0]]||runs.map(function(){return 0;});tech[r[0]][i]=r[1];});});
  var tk=Object.keys(tech);if(tk.length)out.push("## B. Technologies found in the code\n"+lxTable([["Technology"].concat(runs.map(function(r){return r.name;}))].concat(tk.map(function(k){return [k].concat(tech[k].map(String));}))));
  [["C. Features",A_DOES],["D. Design for focus and well-being",A_FOC],["E. Development history",A_MADE]].forEach(function(p){var parts=[];runs.forEach(function(r,i){var a=G.an[i]||{};if(a[p[1]])parts.push((many?"### "+r.name+"\n":"")+a[p[1]]);});if(parts.length)out.push("## "+p[0]+"\n"+parts.join("\n\n"));});
  var doms=[];runs.forEach(function(r,i){var d=F[i].domains||[];if(d.length)doms.push((many?"### "+r.name+"\n":"")+d.map(function(x){return "- "+x[0]+" ("+x[1]+")";}).join("\n"));});if(doms.length)out.push("## F. Web addresses named in the code\n"+doms.join("\n\n"));
  return out;}
/* every figure in the document, looked for in what it was written from */
function check(md,G){var src=[];G.runs.forEach(function(r,i){src.push(lxFactsText(r),factsShort(r),JSON.stringify(r.facts||{}),JSON.stringify(G.an[i]||{}),String(r.version||""));});src.push(G.cv||"",G.post&&G.post.text||"");
  var hay=src.join("\n").replace(/(\d),(\d{3})/g,"$1$2");var body=md.split("\n---\n")[0];var seen={},figures=0,unmatched=[];
  /* R115: a citation's number is not a figure, and the References list is not checked for figures */
  body=body.split(/\n## References\n/)[0].replace(/\[(\d+(?:\s*[,–-]\s*\d+)*)\]/g,"");
  var re=/(?:\d{1,3}(?:,\d{3})+|\d+)(?:\.\d+)?/g,m;
  body.split("\n").forEach(function(line){if(/^\|/.test(line.trim()))return;var l=line.replace(/^#+\s*\d+[.)]\s*/,"").replace(/^\s*\d+[.)]\s+/,"");
    while((m=re.exec(l))){var f=m[0],n=f.replace(/,/g,"");if(+n<=12&&!/\./.test(n))continue;if(seen[f])continue;seen[f]=1;figures++;if(hay.indexOf(n)<0)unmatched.push(f);}});
  var fills=(body.match(/\[(?:your|to fill|the reader|the post|the years|the date|the organisation)[^\]]*\]/gi)||[]).length;
  return {figures:figures,unmatched:unmatched.slice(0,24),fills:fills};}
/* 6.2 · EVERY FUNCTION: a deep reading of each app's own code, measured, with no model. For each app: its screens and rooms,
   its keys, and every named function in its own scripts, part by part (each part named by the note at its head), with the
   line it begins on and the note written above it. A library carried whole and minified is counted, not listed. */
function atlasOf(name,text){var nl=[],i=-1;while((i=text.indexOf("\n",i+1))>=0)nl.push(i);function line(pos){var a=0,b=nl.length;while(a<b){var m=(a+b)>>1;if(nl[m]<pos)a=m+1;else b=m;}return a+1;}
  var A={name:name,lines:nl.length+1,screens:[],keys:[],parts:[],fns:0,libs:0,libFns:0};
  /* screens and rooms: sections, pages and rooms with an id, and the heading inside each */
  var re=/<(section|div|main|article)\b[^>]*\bid="((?:page|room|section|screen|view|tab)-[\w-]+|[\w-]*(?:-page|-room|-screen|-view))"[^>]*>/gi,m;
  while((m=re.exec(text))){var near=text.slice(m.index,m.index+4000),hm=/<h[1-3][^>]*>([\s\S]*?)<\/h[1-3]>/i.exec(near),t=hm?hm[1].replace(/<[^>]+>/g," ").replace(/\s+/g," ").trim():"";
    if(A.screens.length<400)A.screens.push({id:m[2],title:t.slice(0,90),line:line(m.index)});}
  /* keys written in the page itself (the ones the scripts draw are named in their parts) */
  var kr=/<button\b([^>]*)>([\s\S]{0,400}?)<\/button>/gi;
  while((m=kr.exec(text))){var at=m[1],lab=(/aria-label="([^"]{1,120})"/i.exec(at)||/title="([^"]{1,120})"/i.exec(at)||[])[1]||m[2].replace(/<[^>]+>/g," ").replace(/\s+/g," ").trim(),idm=/\bid="([^"]{1,60})"/i.exec(at);
    if(lab&&!/^[\s\W]*$/.test(lab)&&A.keys.length<1500)A.keys.push({label:lab.slice(0,80),id:idm?idm[1]:"",line:line(m.index)});}
  /* every script of its own, part by part */
  var sr=/<script\b([^>]*)>([\s\S]*?)<\/script>/gi,n=0;
  while((m=sr.exec(text))){var attrs=m[1],code=m[2];if(/\bsrc=/i.test(attrs))continue;var ty=(/\btype="([^"]*)"/i.exec(attrs)||[])[1]||"";
    if(ty&&!/^(text\/javascript|module|application\/javascript)$/i.test(ty))continue;if(code.length<40)continue;n++;
    var start=m.index+m[0].indexOf(">")+1,L0=line(start),lines=code.split("\n").length,avg=code.length/Math.max(1,lines);
    var head=((/^\s*(?:try\{[^}]*\}catch\(_\)\{\})?\s*\/\*\s*([^\n*]{4,120})/.exec(code)||/^\s*\/\/\s*([^\n]{4,120})/.exec(code)||[])[1]||((/\bid="([^"]+)"/i.exec(attrs)||[])[1]?"Script “"+(/\bid="([^"]+)"/i.exec(attrs)||[])[1]+"”":"Script "+n)).trim();
    var fr=/(?:\bfunction\s+([A-Za-z_$][\w$]*)\s*\(|(?:^|[;{}\n,]\s*)(?:var|let|const)\s+([A-Za-z_$][\w$]*)\s*=\s*(?:async\s+)?(?:function\b|\([^()]*\)\s*=>|[A-Za-z_$][\w$]*\s*=>)|(?:^|[;{}\n])\s*((?:window|W|self)\.[A-Za-z_$][\w$]*|[A-Za-z_$][\w$]*\.prototype\.[A-Za-z_$][\w$]*)\s*=\s*function\b)/g,f,list=[];
    while((f=fr.exec(code))){var nmF=f[1]||f[2]||f[3];if(!nmF||nmF.length<3)continue;var pos=f.index,before=code.slice(Math.max(0,pos-360),pos);
      var note=(/\/\*([^*]|\*(?!\/)){3,320}\*\/\s*$/.exec(before)||/(?:^|\n)\s*\/\/([^\n]{3,200})\n?\s*$/.exec(before)||[""])[0].replace(/^\s*\/\*+|\*+\/\s*$|^\s*\/\//g,"").replace(/\s+/g," ").trim();
      list.push({name:nmF,line:L0+code.slice(0,pos).split("\n").length-1+(code.charAt(pos)==="\n"?1:0),note:note.slice(0,170)});}
    if(avg>420&&lines<60){A.libs++;A.libFns+=list.length;A.parts.push({title:head,line:L0,lines:lines,lib:true,count:list.length});continue;}
    A.fns+=list.length;if(list.length)A.parts.push({title:head,line:L0,lines:lines,fns:list});}
  return A;}
function atlasMd(G,atl){var md=["Measured from each app's own page on "+today()+": every screen and room, every key written in the page, and every named function in its own code, with the line it begins on and the note written above it. Nothing here was written by a model; the counts are exact."];
  function cell(t){return String(t==null?"":t).replace(/\|/g,"\\|").replace(/\n/g," ");}
  atl.forEach(function(A){
    md.push("## "+A.name+": in brief\n| Measure | Count |\n|---|---|\n| Lines in its page | "+A.lines.toLocaleString("en-GB")+" |\n| Screens and rooms | "+A.screens.length+" |\n| Keys written in the page | "+A.keys.length+" |\n| Parts of its own code | "+A.parts.filter(function(p){return !p.lib;}).length+" |\n| Named functions in its own code | "+A.fns.toLocaleString("en-GB")+" |"+(A.libs?"\n| Libraries carried whole (minified) | "+A.libs+", with "+A.libFns.toLocaleString("en-GB")+" functions |":""));
    if(A.screens.length)md.push("## "+A.name+": its screens and rooms\n| Screen | Its heading | Line |\n|---|---|---|\n"+A.screens.map(function(x){return "| `"+cell(x.id)+"` | "+cell(x.title||"·")+" | "+x.line+" |";}).join("\n"));
    if(A.keys.length)md.push("## "+A.name+": its keys\n| Key | Name in the code | Line |\n|---|---|---|\n"+A.keys.map(function(x){return "| "+cell(x.label)+" | "+(x.id?"`"+cell(x.id)+"`":"·")+" | "+x.line+" |";}).join("\n"));
    md.push("## "+A.name+": its functions, part by part");
    A.parts.forEach(function(p){if(p.lib){md.push("### "+cell(p.title)+" (line "+p.line+")\nA library carried whole and minified: "+p.count+" functions, counted and not listed.");return;}
      md.push("### "+cell(p.title)+" (lines "+p.line+" to "+(p.line+p.lines-1)+", "+p.fns.length+" function"+(p.fns.length===1?"":"s")+")\n| Function | Line | The note above it |\n|---|---|---|\n"+p.fns.map(function(f){return "| `"+cell(f.name)+"` | "+f.line+" | "+cell(f.note||"·")+" |";}).join("\n"));});});
  return md.join("\n\n");}
function atlasDoc(G){var label=docLabel("functions",G.apps,G.purpose),head="# "+setName(G.apps)+" · "+label+"\n\n",atl=[],i=0;
  return (function next(){if(LX.stop)return Promise.reject(stopErr());if(i>=G.apps.length)return Promise.resolve();var k=G.apps[i++];
    setLive("functions",G.apps.map(nm),i-1,"Measuring every function of "+nm(k)+" ("+i+" of "+G.apps.length+")");
    return libText(k).then(function(text){if(!text)throw new Error(nm(k)+" is no longer on this device. Add it again (Your apps).");
      return new Promise(function(res){setTimeout(function(){var A=atlasOf(nm(k),text);atl.push(A);
        addEv({k:"done",label:"Every function · "+nm(k),text:A.fns.toLocaleString("en-GB")+" named functions in "+A.parts.filter(function(p){return !p.lib;}).length+" parts of its own code, "+A.screens.length+" screens and rooms, "+A.keys.length+" keys written in the page"+(A.libs?"; "+A.libs+" librar"+(A.libs===1?"y":"ies")+" carried whole":"")+"."});
        R7.docMd.functions=head+atlasMd(G,atl);res();},30);});}).then(next);})()
    .then(function(){return head+atlasMd(G,atl);});}
function keepDoc(j,kind,md,G){var key=j.key,S=L7().sets[key]=L7().sets[key]||{apps:j.apps.slice(),purpose:j.purpose,docs:{},older:{}};S.docs=S.docs||{};S.older=S.older||{};
  /* 6.2: Every function is measured, not written: its numbers are lines and counts, so it is neither restyled nor checked */
  var sf=kind==="functions"?{md:md,line:""}:styleFix(md);md=sf.md;R7.docMd[kind]=md;
  var chk=kind==="functions"?{figures:0,unmatched:[],fills:0}:check(md,G),ref=IngBig.newId();
  addEv({k:"check",label:docLabel(kind,G.apps,G.purpose),text:(sf.line?sf.line+" ":"")+(chk.figures?(chk.unmatched.length?chk.unmatched.length+" of "+chk.figures+" figures were not found in the measures, the analysis, your CV or the posting, and are marked for you to check: "+chk.unmatched.slice(0,6).join(", ")+(chk.unmatched.length>6?"…":"")+".":"Every figure ("+chk.figures+") was found in the measures, the analysis, your CV or the posting."):"No figures to check.")+
    (chk.fills?" "+chk.fills+" place"+(chk.fills>1?"s are":" is")+" left for you to fill, in square brackets.":"")+(sealed(kind)?" "+(crestKind(G.apps)?crestWords(crestKind(G.apps))+" is on its cover.":G.runs.length===4?"The master seal is on its cover.":"Its seal"+(G.runs.length>1?"s are":" is")+" on its cover."):" No seal, as you asked.")});
  return IngBig.put(ref,md).then(function(){var old=S.docs[kind];if(old){S.older[kind]=[old].concat(S.older[kind]||[]);while(S.older[kind].length>3){var x=S.older[kind].pop();if(x&&x.ref)IngBig.del(x.ref);}}
    S.docs[kind]={ref:ref,made:Date.now(),model:lxModelName({modelId:j.modelId}),title:setName(j.apps)+" · "+docLabel(kind,j.apps,j.purpose),chk:chk};saveState();});}

/* ---------------- saving ---------------- */
function curDoc(){var kind=R7.doc||"analysis";if(kind==="analysis")return analysisMd(job()).then(function(md){return md?{kind:kind,md:unmark(md)}:null;});
  var s=stored(kind);if(!s)return Promise.resolve(null);return IngBig.load(s.ref).then(function(md){return md?{kind:kind,md:unmark(md),chk:s.chk}:null;});}
function save(){curDoc().then(function(d){if(!d){ingToast("There is nothing to save yet: this document is written after the reading.");return;}
  var apps=sorted(curApps()),j=job(),name=j&&j.doc?(lxRun(j.doc)||{}).name:setName(apps),label=docLabel(d.kind,apps,curPurpose()),title=name+" · "+label,file=lxFileName(title),fmt=L7().brief.fmt||"docx";
  var meta={kind:HOUSE[d.kind]||"dossier",apps:apps,subtitle:label,name:sealed(d.kind)||d.kind==="analysis"?name:undefined,forText:d.kind==="analysis"?"":forText(curPurpose()),master:apps.length===4&&sealed(d.kind)};
  if(d.kind==="cover"||d.kind==="cv")meta.name=undefined;
  /* 6.1: the crest of the set is drawn first (a picture made on this device, by day for Word and PDF, by day and by night
     for a web page), then the file is made with it on its cover */
  crestFor(sealed(d.kind)?crestKind(apps):"",apps,fmt).then(function(cr){
  if(fmt==="docx"){var m2=Object.assign({},meta);if(cr&&cr.doc)m2.crest=cr.doc;var bytes=IngHouseDocs.docx(title,d.md,m2);saveFileNative(file+".docx","application/vnd.openxmlformats-officedocument.wordprocessingml.document",bytes);}
  else if(fmt==="md"){lxSaveMd(title,d.md);}
  else if(fmt==="html"){saveFileNative(file+".html","text/html",htmlDoc(d.kind,d.md,{apps:apps,name:name,label:label,forText:meta.forText,title:title,crestPng:cr&&cr.html}));}
  else if(fmt==="pdf"){if(window.LxPdf&&typeof LxPdf.make==="function"){LxPdf.make(title,d.md,{kind:meta.kind,apps:apps,name:sealed(d.kind)?name:(d.kind==="analysis"?name:""),subtitle:label,forText:meta.forText,author:author(),month:month(),
      seals:sealed(d.kind)?(cr&&cr.doc?[{key:"master",src:cr.doc.src}]:apps.length===4&&ING_SEALS.master?[{key:"master",src:flatSrc("master")}]:apps.map(function(k){return {key:k,src:flatSrc(k)};})):[]}).then(function(u8){saveFileNative(file+".pdf","application/pdf",u8);},function(e){ingToast("The PDF could not be made: "+(e&&e.message||e));});}
    else ingToast("PDF is not available in this copy of Ingenium. Save it as Word, and open it in Pages or Word to keep a PDF.");}});});}
/* the crest for a file: for Word and PDF the day picture at a printer's size (the PDF sets it as tall as the master seal);
   for a web page a picture by day and one by night. If it cannot be drawn here, the file carries each app's own seal, and says so */
function crestFor(ck,apps,fmt){if(!ck||!window.IngSeal||fmt==="md")return Promise.resolve(null);
  var p=fmt==="html"?Promise.all([IngSeal.png(apps,{night:false,width:ck==="duo"?520:300}),IngSeal.png(apps,{night:true,width:ck==="duo"?520:300})]).then(function(x){return {html:{day:x[0],night:x[1]}};})
    :IngSeal.docPicture(apps).then(function(dp){return dp?{doc:dp}:null;});
  return p.catch(function(e){ingToast("The set’s seal could not be drawn on this device, so the document carries each app’s own seal. "+(e&&e.message||""));return null;});}
function htmlDoc(kind,md,o){var th=themeOf(kind,o.apps),css=fontCss(th==="inkwell"?"inkwell":th==="family"?"family":"none")+"\n"+paperCss(false)+
  "\n.l-paper .cv .seals .sn{display:none}@media screen and (prefers-color-scheme:dark){.l-paper .cv .seals .sd{display:none}.l-paper .cv .seals .sn{display:inline-block}}@media print{.l-paper .cv .seals .sn{display:none !important}.l-paper .cv .seals .sd{display:inline-block !important}}";
  return '<!doctype html>\n<html lang="en-GB"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="color-scheme" content="light dark"><title>'+esc(o.title)+'</title><style>'+css+'</style></head><body class="th-'+th+'">'+paper(kind,md,Object.assign({},o,{both:true}))+'</body></html>';}

/* ---------------- 6.1 · ASK LECTOR: THE OWNER'S OWN REQUESTS ----------------
   The owner's words (20 October 2026): "I also want a compose text chat area for the Lector page so I can write and send my
   more specific requests." At the foot of the document, a box to write in and a key to send. A request can:
   · change the document shown: Lector finds the section the request names (or the whole document when it is short, or
     the section in view), rewrites only that, from the same material, and keeps the version before so it can be put back;
   · change one chosen section, or the whole document;
   · be kept for everything Lector writes for this set: it then goes with every section, every examination and every letter;
   · or be answered in the conversation, for a line to copy elsewhere.
   Every rewrite keeps to the material as the first writing did: no fact, figure, name or date is invented. */
var ASKS_MAX=40;
function askThread(){var S=L7();if(!S.asks||typeof S.asks!=="object")S.asks={};var k=curKey();if(!Array.isArray(S.asks[k]))S.asks[k]=[];return S.asks[k];}
function askReqs(){var S=L7();if(!S.reqs||typeof S.reqs!=="object")S.reqs={};var k=curKey();if(!Array.isArray(S.reqs[k]))S.reqs[k]=[];return S.reqs[k];}
/* the standing requests, for the instructions every piece is written with */
function askStanding(){var r=[];try{r=askReqs();}catch(e){}if(!r.length)return "";
  return "\n\nTHE OWNER'S OWN REQUESTS FOR THIS SET. Follow each one wherever it applies, before any general rule above, except the rule never to invent a fact:\n"+r.map(function(x,i){return (i+1)+". "+x.text;}).join("\n");}
function askWords(t){return (String(t||"").match(/[\p{L}\p{N}][\p{L}\p{N}'’-]*/gu)||[]).length;}
/* a document in its parts: what comes before the first "##" heading, then each section with its heading */
function askParts(md){md=unmark(md);var head=[],parts=[],cur=null;
  md.split("\n").forEach(function(l){var m=/^##(?!#)\s*(.+?)\s*$/.exec(l);if(m){cur={title:m[1],lines:[]};parts.push(cur);}else if(cur)cur.lines.push(l);else head.push(l);});
  return {head:head.join("\n").replace(/\s+$/,""),parts:parts.map(function(p){return {title:p.title,body:p.lines.join("\n").trim()};})};}
function askJoin(d){return [d.head].concat(d.parts.map(function(p){return "## "+p.title+"\n"+p.body;})).filter(function(x){return String(x).trim();}).join("\n\n");}
/* a letter has no sections: its text after the title is one part */
function askBodyOnly(d){var hm=/^(#\s[^\n]*\n*)([\s\S]*)$/.exec(d.head);return hm?{title:hm[1].replace(/\s+$/,""),body:hm[2].trim()}:{title:"",body:d.head.trim()};}
function askKeys(kind,title){var plan=PLAN[kind]||PLAN.dossier,all=[];plan.forEach(function(x){(x[2]||[]).forEach(function(k){if(all.indexOf(k)<0)all.push(k);});});
  var t=String(title||"").toLowerCase().replace("what the apps do","what it does");for(var i=0;i<plan.length;i++)if(plan[i][0].toLowerCase()===t)return plan[i][2];return all;}
/* the section a request names: the most of its title's words found in the request */
function askNamed(text,parts){var q=" "+String(text||"").toLowerCase().replace(/[^\p{L}\p{N}]+/gu," ")+" ",best=-1,bs=0;
  parts.forEach(function(p,i){var t=String(p.title).toLowerCase().replace(/[^\p{L}\p{N}]+/gu," ").trim();if(!t)return;
    if(q.indexOf(" "+t+" ")>=0){if(100>bs){bs=100;best=i;}return;}
    var ws=t.split(" ").filter(function(w){return w.length>=4&&!/^(what|with|from|that|this|their|about|which|where|apps)$/.test(w);}),hit=ws.filter(function(w){return q.indexOf(" "+w+" ")>=0;}).length;
    var sc=ws.length?hit/ws.length*10+hit:0;if(hit&&(hit>=2||ws.length===1)&&sc>bs){bs=sc;best=i;}});
  return best;}
/* the section the owner is reading: the last heading above the middle of the desk */
function askInView(parts){var dk=$("l7Desk");if(!dk)return -1;var hs=[].slice.call(dk.querySelectorAll("[data-h]")),mid=dk.getBoundingClientRect().top+dk.clientHeight*0.4,at=-1;
  hs.forEach(function(e){var i=+e.getAttribute("data-h");if(e.getBoundingClientRect().top<=mid)at=i;});return at>=0&&at<parts.length?at:(parts.length?0:-1);}
function askJob(){var j=job();if(j&&j.key===curKey()&&!j.doc)return j;var B=L7().brief,o=modelPlan();
  return {key:curKey(),apps:curApps(),purpose:curPurpose(),depth:B.depth||"overview",modelId:o.chosen?o.chosen.id:null};}
function askNoMaterial(G){return !G||!G.runs||!G.runs.length;}
function askContext(G,sc,kind,title){if(askNoMaterial(G))return "There is no other material for this set on this device now: use only what the document itself says.";
  return context(G,sc,{keys:askKeys(kind,title),anShare:0.4,post:true,postShare:0.08,cv:true,cvShare:0.08,voice:true,letters:kind==="cover",sources:true});}
var ASK_RULES="Keep every fact and figure exactly as the material gives it; never invent a fact, a figure, a name, a date or a quotation; where my request needs a fact the material does not give, leave a short place for it in square brackets. Keep my voice and the first person.";
/* what the set is, in words: from its readings, or from the apps' names when no reading is kept on this device */
function askAbout(G){return G&&G.runs&&G.runs.length?about(G):(listNames(G&&G.apps||[])||"my work");}
function askMsgs(mode,o,G,sc){var label=docLabel(o.kind,G.apps,G.purpose).toLowerCase(),me="MY REQUEST:\n"+o.text+"\n\n";
  if(mode==="sec")return [{role:"system",content:sysW()},{role:"user",content:"Below is "+(o.title?"the section \""+o.title+"\" of ":"")+"my "+label+" about "+askAbout(G)+forLine(G)+". Rewrite it as I ask, and change nothing I have not asked you to change.\n\n"+me+
    (o.title?"THE SECTION AS IT STANDS:\n":"THE TEXT AS IT STANDS:\n")+o.body+"\n\nReturn only the rewritten text: no heading, no note on what you changed, no remark before or after it. "+ASK_RULES+"\n\n"+askContext(G,sc,o.kind,o.title)}];
  /* 6.2: a request for every document, applied a section at a time: a section it does not bear on comes back as it was */
  if(mode==="every")return [{role:"system",content:sysW()},{role:"user",content:"Below is "+(o.title?"the section \""+o.title+"\" of ":"")+"my "+label+" about "+askAbout(G)+forLine(G)+". I want this request followed in every document I have, wherever it applies.\n\n"+me+
    (o.title?"THE SECTION AS IT STANDS:\n":"THE TEXT AS IT STANDS:\n")+o.body+"\n\nIf my request does not bear on this text, reply with the single word UNCHANGED and nothing else. Otherwise return only the rewritten text: no heading, no note on what you changed, no remark before or after it. Change nothing I have not asked you to change. "+ASK_RULES+"\n\n"+askContext(G,sc,o.kind,o.title)}];
  if(mode==="whole")return [{role:"system",content:sysW()},{role:"user",content:"Below is my "+label+" about "+askAbout(G)+forLine(G)+", whole. Rewrite it as I ask, and change nothing I have not asked you to change.\n\n"+me+
    "THE DOCUMENT AS IT STANDS:\n"+o.body+"\n\nReturn the whole document, every section with its heading line (## and its title) as it stands unless I ask to change it, and nothing before or after it. "+ASK_RULES+"\n\n"+askContext(G,sc,o.kind,"")}];
  return [{role:"system",content:sysW()},{role:"user",content:me+"Answer it directly, in plain prose and no longer than it needs, from the material below"+(o.body?" and from my "+label+" as it stands":"")+". "+ASK_RULES+(o.body?"\n\nMY "+label.toUpperCase()+" AS IT STANDS:\n"+cut(o.body,Math.floor(room()*sc*0.3)):"")+"\n\n"+askContext(G,sc,o.kind||"dossier","")}];}
/* a new version of the document, the one before kept so it can be put back */
function askKeep(kind,md,G){var S=L7().sets[curKey()];if(!S||!S.docs||!S.docs[kind])return Promise.reject(new Error("This document is no longer kept on this device."));
  var prev=S.docs[kind],ref=IngBig.newId(),chk=askNoMaterial(G)?prev.chk:check(md,G);
  return IngBig.put(ref,md).then(function(){S.older=S.older||{};S.older[kind]=[prev].concat(S.older[kind]||[]);while(S.older[kind].length>3){var x=S.older[kind].pop();if(x&&x.ref)IngBig.del(x.ref);}
    S.docs[kind]=Object.assign({},prev,{ref:ref,made:Date.now(),chk:chk,asked:(prev.asked||0)+1});saveState();return {prevRef:prev.ref,newRef:ref,chk:chk};});}
/* put back a version kept: the one shown now takes its place among the versions kept */
function askUse(kind,ref){var S=L7().sets[curKey()];if(!S||!S.docs||!S.docs[kind]||!S.older||!S.older[kind])return false;var i=-1;
  S.older[kind].forEach(function(x,k){if(x&&x.ref===ref)i=k;});if(i<0)return false;var back=S.older[kind].splice(i,1)[0];S.older[kind].unshift(S.docs[kind]);S.docs[kind]=back;saveState();return true;}
function askCopy(t){try{if(navigator.clipboard&&navigator.clipboard.writeText){navigator.clipboard.writeText(t).then(function(){ingToast("Copied.");},function(){askCopy2(t);});return;}}catch(e){}askCopy2(t);}
function askCopy2(t){var a=document.createElement("textarea");a.value=t;a.style.cssText="position:fixed;left:-9999px;top:0";document.body.appendChild(a);a.select();try{document.execCommand("copy");ingToast("Copied.");}catch(e){ingToast("It could not be copied here.");}a.remove();}
var ASK={busy:false,entry:null};
/* 6.2: the documents written for this set, in the order of the brief */
function askWritten(){var S=L7().sets[curKey()];if(!S||!S.docs)return [];return KINDS.map(function(d){return d[0];}).filter(function(k){return S.docs[k]&&k!=="functions";});}
/* 6.2: a request followed in every document already written, a section at a time, and kept for all writing from now on */
function askEvery(text,e,G){var kinds=askWritten(),done=[],i=0;e.multi=[];
  return (function nextDoc(){if(LX.stop)return Promise.reject(stopErr());if(i>=kinds.length)return Promise.resolve();var kind=kinds[i++],st=stored(kind),label=docLabel(kind,G.apps,G.purpose);
    return IngBig.load(st.ref).then(function(m){var md=unmark(m||""),d=askParts(md),changed=0,k=0,parts=d.parts.length?d.parts:null;
      function piece(title,body,put){R7.step="Following your request in the "+label.toLowerCase()+(title?" · "+title:"")+" ("+i+" of "+kinds.length+")";paintProgress();paintAsk();
        return ask(function(sc){return askMsgs("every",{text:text,kind:kind,title:title,body:body},G,sc);},Math.min(3200,Math.ceil(body.length/3)+600),0.4).then(function(x){var nb=clean(x,title);
          if(!nb||/^\W*UNCHANGED\W*$/i.test(nb))return;put(nb);changed++;});}
      var chain=Promise.resolve();
      if(!parts){var b=askBodyOnly(d);chain=piece(null,b.body,function(nb){md=(b.title?b.title+"\n\n":"")+nb;});}
      else parts.forEach(function(p,idx){if(/^(References|The works)$/i.test(p.title))return;chain=chain.then(function(){if(LX.stop)throw stopErr();return piece(p.title,p.body,function(nb){d.parts[idx]={title:p.title,body:nb};});});});
      return chain.then(function(){if(!changed){done.push(label+" (it already followed it)");return;}var nmd=parts?askJoin(d):md;
        return askKeep(kind,nmd,G).then(function(r){e.multi.push({kind:kind,prevRef:r.prevRef,newRef:r.newRef});done.push(label+" ("+changed+" section"+(changed===1?"":"s")+" changed)");});});}).then(nextDoc);})()
    .then(function(){return done;});}
function askSend(text,target){text=String(text||"").trim();if(!text)return;var kind=R7.doc||"analysis",th=askThread();
  var e={id:"q"+Date.now().toString(36),at:Date.now(),text:text,kind:kind,target:target,status:"working",reply:""};
  if(target==="all"){askReqs().push({id:e.id,text:text,at:e.at});e.status="kept";e.reply="Kept. Lector follows it in everything it writes for "+(setName(curApps())||"this set")+" from now on"+(LX.busy&&LX.writing?", beginning with the next section it writes":"")+". It shows above this box, where you can take it away.";
    th.push(e);askTrim();saveState();paintAsk();return;}
  if(target==="every"&&!askWritten().length){target="all";e.target="all";askReqs().push({id:e.id,text:text,at:e.at});e.status="kept";
    e.reply="No document is written for "+(setName(curApps())||"this set")+" yet, so Lector keeps the request and follows it in everything it writes. Press Start reading in the brief.";th.push(e);askTrim();saveState();paintAsk();return;}
  if(ASK.busy||LX.busy||R7.running){e.status="error";e.reply="Lector is at work on this set now. Send the request again when it has finished, or keep it for the writing so every piece written from now on follows it.";e.offerKeep=true;th.push(e);askTrim();saveState();paintAsk();return;}
  var o=modelPlan();if(!o.chosen){e.status="error";e.reply="No model is ready on this device yet, so Lector cannot write. Bring one in on the Models page, then send the request again.";th.push(e);askTrim();saveState();paintAsk();return;}
  th.push(e);askTrim();saveState();ASK.busy=true;ASK.entry=e;LX.busy=true;LX.stop=false;R7.askModel=o.chosen.id;paintAsk();
  var j=askJob(),md=R7.cur&&R7.cur.kind===kind?R7.cur.md:null,st=kind!=="analysis"?stored(kind):null;
  var load=st?(md!=null?Promise.resolve(md):IngBig.load(st.ref)):kind==="analysis"?analysisMd(job()).then(function(x){return x||"";}):Promise.resolve("");
  var G0;
  load.then(function(m){md=unmark(m||"");return gather(j).catch(function(){return {runs:[],an:[],cv:"",writing:[],letters:[],voice:true,post:null,apps:j.apps,purpose:j.purpose,sources:[]};});})
  .then(function(G){G0=G;var d=askParts(md);
    if(target==="every"){e.mode="every";askReqs().push({id:e.id,text:text,at:e.at});saveState();
      return askEvery(text,e,G).then(function(done){e.status="done";e.reply="Kept for everything Lector writes for "+(setName(G.apps)||"this set")+" from now on, and followed in the documents already written: "+done.join("; ")+".";});}
    if(target==="answer"||!st){e.mode="answer";R7.step="Answering your request";paintProgress();
      return ask(function(sc){return askMsgs("answer",{text:text,kind:kind==="analysis"?"dossier":kind,body:md},G,sc);},1400,0.5).then(function(x){e.reply=clean(x);e.status="done";});}
    var whole=target==="whole",idx=-1,title=null;
    if(!d.parts.length){var b=askBodyOnly(d);e.mode="sec";e.title=docLabel(kind,G.apps,G.purpose);
      R7.step="Rewriting the "+e.title.toLowerCase()+" as you asked";paintProgress();
      return ask(function(sc){return askMsgs("sec",{text:text,kind:kind,title:null,body:b.body},G,sc);},Math.min(4000,Math.ceil(b.body.length/3)+600),0.45).then(function(x){var nb=clean(x);if(!nb)throw new Error("The model gave back no text.");
        var nmd=(b.title?b.title+"\n\n":"")+nb;e.before=askWords(b.body);e.after=askWords(nb);return askKeep(kind,nmd,G).then(function(r){e.prevRef=r.prevRef;e.newRef=r.newRef;e.status="done";
          e.reply="Rewrote the "+e.title.toLowerCase()+" as you asked ("+e.after+" words; it had "+e.before+").";});});}
    if(/^sec:\d+$/.test(target))idx=+target.slice(4);
    else if(!whole){idx=askNamed(text,d.parts);if(idx<0){if(md.length<=room()*0.3)whole=true;else{idx=askInView(d.parts);e.inView=true;}}}
    if(whole){e.mode="whole";R7.step="Rewriting the whole document as you asked";paintProgress();
      return ask(function(sc){return askMsgs("whole",{text:text,kind:kind,body:askJoin({head:"",parts:d.parts})},G,sc);},Math.min(6000,Math.ceil(md.length/3)+800),0.45).then(function(x){
        var nd=askParts(clean(x));if(nd.parts.length<Math.max(1,Math.ceil(d.parts.length/2)))throw new Error("The model gave back the document without most of its sections, so nothing was changed.");
        var nmd=askJoin({head:d.head,parts:nd.parts});e.before=askWords(md);e.after=askWords(nmd);
        return askKeep(kind,nmd,G).then(function(r){e.prevRef=r.prevRef;e.newRef=r.newRef;e.status="done";e.reply="Rewrote the whole document as you asked ("+e.after+" words; it had "+e.before+").";});});}
    var p=d.parts[idx];if(!p)throw new Error("Lector could not tell which part of the document the request is for. Choose a section in the list beside the box and send it again.");
    e.mode="sec";e.title=p.title;R7.step="Rewriting “"+p.title+"” as you asked";paintProgress();
    return ask(function(sc){return askMsgs("sec",{text:text,kind:kind,title:p.title,body:p.body},G,sc);},Math.min(3000,Math.ceil(p.body.length/3)+600),0.45).then(function(x){var nb=clean(x,p.title);if(!nb)throw new Error("The model gave back no text.");
      e.before=askWords(p.body);e.after=askWords(nb);d.parts[idx]={title:p.title,body:nb};var nmd=askJoin(d);
      return askKeep(kind,nmd,G).then(function(r){e.prevRef=r.prevRef;e.newRef=r.newRef;e.status="done";
        e.reply="Rewrote “"+p.title+"” as you asked ("+e.after+" words; it had "+e.before+")."+(e.inView?" Your request named no section, so Lector took the one you were reading.":"")+
          (r.chk&&r.chk.unmatched&&r.chk.unmatched.length?" "+r.chk.unmatched.length+" figure"+(r.chk.unmatched.length>1?"s are":" is")+" marked for you to check.":"");});});})
  .then(null,function(err){e.status=err&&err.stopped?"stopped":"error";e.reply=err&&err.stopped?"Stopped. Nothing was changed.":"It could not be done: "+String(err&&err.message||err)+" Nothing was changed.";})
  .then(function(){ASK.busy=false;ASK.entry=null;LX.busy=false;LX.stop=false;LX.live="";R7.step="";R7.askModel=null;saveState();paintProgress();paintBrief();paintDoc();paintAsk();});}
function askTrim(){var th=askThread();while(th.length>ASKS_MAX)th.shift();}
function paintAsk(){var box=$("l7Ask");if(!box)return;var kind=R7.doc||"analysis",st=kind!=="analysis"?stored(kind):null,th=askThread(),reqs=askReqs();
  if(!box.__built){box.__built=true;box.innerHTML=
    '<div class="l-cmp-intro">Ask for a change to a document, or for something Lector follows in everything it writes. Lector keeps to your recipe, your facts and the material; it changes only what you ask, and every change can be put back.</div>'+
    '<div class="l-cmp-reqs-h" hidden>Lector follows these in everything it writes for this set:</div>'+
    '<div class="l-cmp-reqs" role="group" aria-label="Requests kept for the writing"></div>'+
    '<div class="l-cmp-h"><span class="n"></span><button type="button" class="l-cmp-tg" aria-expanded="true">Hide the conversation</button></div>'+
    '<div class="l-cmp-th" role="log" aria-live="polite" aria-label="Your requests and Lector\'s answers"></div>'+
    '<div class="l-cmp-empty">Nothing asked yet. Write a request below: for example, “Make the summary shorter and plainer”, or “Name Fabrica in every document”.</div>'+
    '<form class="l-cmp-f"><div class="l-cmp-in"><textarea rows="1" aria-label="Your request to Lector" placeholder="Write your request to Lector…" aria-describedby="l7AskHint"></textarea></div>'+
    '<button type="submit" class="l-btn pri l-cmp-send" aria-label="Send the request" title="Send (Enter)"><svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 16V4"/><path d="M5 9l5-5 5 5"/></svg></button></form>'+
    '<div class="l-cmp-row"><label><span>For</span> <select aria-label="What the request is for"></select></label>'+
    '<span class="l-cmp-hint" id="l7AskHint" title="Lector changes only what you ask, keeps every fact to the material, and each change can be put back.">Enter sends · Shift and Enter, a new line</span></div>';
    var ta=box.querySelector("textarea"),f=box.querySelector("form"),sel=box.querySelector("select");
    function grow(){if(!ta.value){ta.style.height="";return;}ta.style.height="auto";ta.style.height=Math.min(ta.scrollHeight,150)+"px";}
    ta.addEventListener("input",grow);
    ta.addEventListener("keydown",function(ev){if(ev.key==="Enter"&&!ev.shiftKey&&!ev.isComposing){ev.preventDefault();f.requestSubmit?f.requestSubmit():f.dispatchEvent(new Event("submit",{cancelable:true}));}});
    f.addEventListener("submit",function(ev){ev.preventDefault();var t=ta.value.trim();if(!t){ta.focus();return;}if(ASK.busy){ingToast("Lector is still answering your last request.");return;}
      ta.value="";grow();askSend(t,sel.value);});
    box.querySelector(".l-cmp-tg").onclick=function(){var S=L7();S.askShut=!S.askShut;saveSoon();paintAsk();};}
  var S=L7(),shut=!!S.askShut,tg=box.querySelector(".l-cmp-tg"),thb=box.querySelector(".l-cmp-th");
  box.querySelector(".n").textContent=th.length?th.length+" request"+(th.length>1?"s":""):"";
  var an=$("l7AskN");if(an)an.textContent=ASK.busy?"…":th.length?String(th.length):"";
  tg.hidden=!th.length;tg.textContent=shut?"Show the conversation":"Hide the conversation";tg.setAttribute("aria-expanded",shut?"false":"true");thb.hidden=shut||!th.length;
  box.querySelector(".l-cmp-empty").hidden=!!th.length;box.querySelector(".l-cmp-reqs-h").hidden=!reqs.length;
  /* the requests kept for the writing */
  var rb=box.querySelector(".l-cmp-reqs");rb.innerHTML="";rb.hidden=!reqs.length;
  reqs.forEach(function(r){var c=h("span","l-cmp-req");c.title=r.text;c.appendChild(h("span",null,esc(r.text)));var x=document.createElement("button");x.type="button";x.textContent="×";x.setAttribute("aria-label","Stop following: "+r.text);
    x.onclick=function(){var a=askReqs(),i=a.indexOf(r);if(i>=0)a.splice(i,1);saveState();paintAsk();};c.appendChild(x);rb.appendChild(c);});
  /* what a request can be for, with the document shown */
  var sel=box.querySelector("select"),was=sel.value,opts=[];
  var written=askWritten().length;
  if(st&&kind!=="functions"){opts.push(["auto","This document: Lector finds the place"]);opts.push(["whole","The whole document"]);
    var md=R7.cur&&R7.cur.kind===kind?R7.cur.md:"";askParts(md).parts.forEach(function(p,i){if(/^(References|The works)$/i.test(p.title))return;opts.push(["sec:"+i,"Only “"+(p.title.length>48?p.title.slice(0,46)+"…":p.title)+"”"]);});}
  /* 6.2: a request for everything is followed in the documents already written too, not only in the writing to come */
  if(written)opts.push(["every","Every document written ("+written+"), and all writing from now on"]);
  opts.push(["all","Only the writing from now on"]);opts.push(["answer","Just answer me"]);
  sel.innerHTML="";opts.forEach(function(o){var op=document.createElement("option");op.value=o[0];op.textContent=o[1];sel.appendChild(op);});
  sel.value=opts.some(function(o){return o[0]===was;})?was:(st&&kind!=="functions"?"auto":written?"every":"all");
  var ta=box.querySelector("textarea");ta.placeholder=st?"Write your request to Lector…":kind==="analysis"?"A request to keep for the writing, or a question…":"A request for the writing, or a question…";
  box.querySelector(".l-cmp-send").disabled=ASK.busy;
  /* the conversation */
  if(shut||!th.length){thb.innerHTML="";return;}
  thb.innerHTML="";th.forEach(function(e){var me=h("div","l-cmp-m me");me.appendChild(document.createTextNode(e.text));
    var forTxt=e.target==="all"?"For everything written for this set":e.target==="answer"?"To answer":e.title?"For “"+e.title+"”":e.target==="whole"?"For the whole document":"For "+(e.kind==="analysis"?"the notes and analysis":docLabel(e.kind,curApps(),curPurpose()).toLowerCase());
    me.appendChild(h("span","for",esc(forTxt)));thb.appendChild(me);
    var lx=h("div","l-cmp-m lx"+(e.status==="error"||e.status==="stopped"?" err":e.status==="working"?" wait":""));
    if(e.status==="working"){lx.appendChild(document.createTextNode(R7.step?R7.step+"…":"Working…"));
      /* 6.2: the words as Lector writes them, here in the conversation */
      var lv=h("span","live");lv.setAttribute("data-live","1");var t0=LX.live||"";lv.textContent=t0?(t0.length>1200?"…"+t0.slice(-1200):t0):"";if(t0)lx.appendChild(lv);
      var a0=h("div","acts"),stp=btn("quiet","Stop",function(){LX.stop=true;try{if(window.Engine&&Engine.abort)Engine.abort();}catch(x){}try{if(typeof cloudAbort==="function")cloudAbort();}catch(x){}});a0.appendChild(stp);lx.appendChild(a0);}
    else lx.appendChild(document.createTextNode(e.reply||""));
    var acts=h("div","acts");
    if(e.status==="done"&&e.mode==="answer")acts.appendChild(btn("quiet","Copy",function(){askCopy(e.reply);}));
    if(e.status==="done"&&e.multi&&e.multi.length){acts.appendChild(btn("quiet",e.undone?"Use the rewrites again":"Put back the versions before",function(){
      if(ASK.busy||LX.busy){ingToast("Lector is busy. Wait a moment.");return;}var miss=0;
      e.multi.forEach(function(x){if(!askUse(x.kind,e.undone?x.newRef:x.prevRef))miss++;});if(miss)ingToast(miss+" of them "+(miss===1?"is":"are")+" no longer kept: Lector keeps the last three versions.");
      e.undone=!e.undone;saveState();paintDoc();}));}
    if(e.status==="done"&&e.prevRef&&e.kind===kind){acts.appendChild(btn("quiet",e.undone?"Use the rewrite again":"Put back the version before",function(){
      if(ASK.busy||LX.busy){ingToast("Lector is busy. Wait a moment.");return;}
      if(!askUse(e.kind,e.undone?e.newRef:e.prevRef)){ingToast("That version is no longer kept: Lector keeps the last three.");return;}e.undone=!e.undone;saveState();paintDoc();}));
      if(e.title)acts.appendChild(btn("quiet","Show it",function(){var dk=$("l7Desk"),hs=[].slice.call(dk.querySelectorAll("[data-h]")),t=hs.filter(function(x){return String(x.textContent||"").trim()===e.title;})[0];
        if(t)dk.scrollTo({top:dk.scrollTop+t.getBoundingClientRect().top-dk.getBoundingClientRect().top-14,behavior:"smooth"});}));}
    if(e.offerKeep&&e.status==="error")acts.appendChild(btn("quiet","Keep it for the writing",function(){e.offerKeep=false;askSend(e.text,"all");}));
    if(acts.childNodes.length)lx.appendChild(acts);thb.appendChild(lx);});
  thb.scrollTop=thb.scrollHeight;}
(function(){var pd=paintDoc;paintDoc=function(){var r=pd.apply(this,arguments);try{paintAsk();}catch(e){try{console.warn("Lector: the request box could not be drawn",e);}catch(_){}}return r;};})();
/* the document is loaded after paintDoc returns: the list of its sections follows once it is there */
(function(){var last=null;setInterval(function(){try{if(!$("l7Ask"))return;var c=R7.cur&&(R7.cur.kind+":"+(R7.cur.md||"").length);if(c!==last){last=c;paintAsk();}}catch(e){}},700);})();

/* ---------------- layout: the height of the window, the panels, the grips, the tabs ---------------- */
function one(){var r=$("lx7");return !!(r&&r.classList.contains("l-one"));}
function setPanel(p){R7.panel=p;var tabs=$("l7Tabs");if(tabs)[].forEach.call(tabs.querySelectorAll("button"),function(b){b.setAttribute("aria-selected",b.getAttribute("data-p")===p?"true":"false");});
  ["Brief","Read","Doc"].forEach(function(n,i){var e=$("l7"+n);if(e)e.classList.toggle("show",["brief","read","doc"][i]===p);});segThumbs($("lx7"));applyZoom();}
/* 6.1 · the document's size on a large display. The owner's words (20 October 2026): "Ingenium still does not properly fit
   my large desktop screen when I try to expand it to fill the screen, especially on the Lector page, the document remains
   the same size in the middle even though the Document panel itself is spread out to fill the screen."
   The page keeps its own measure (640 points wide, as printed) and is zoomed as a whole, so it keeps its proportions and its
   type is set again at the larger size, sharp. Fit makes it as wide as the panel, never smaller than its own size (a phone
   or a narrow panel reads it as before, the page narrowing to fit) and never more than three times it; the keys beside Fit
   make it smaller or larger, in steps.
   The choice is kept with her other settings (state.v61.seals.zoom: "fit" or a number). */
var ZSTEPS=[.5,.6,.7,.8,.9,1,1.1,1.25,1.5,1.75,2,2.25,2.5,3,3.5,4,5,6];
/* Fit stops at three times the page's own size: past that (a panel more than 1,900 points wide, the others folded away) a page
   becomes a poster, a heading to a screen; the + key still takes it further for whoever wants it */
var FITMAX=3;
function zoomPref(){try{var S=state.v61&&state.v61.seals;var z=S&&S.zoom;return z==null||z==="fit"?"fit":clamp(+z||1,ZSTEPS[0],ZSTEPS[ZSTEPS.length-1]);}catch(e){return "fit";}}
function setZoomPref(z){try{var V=state.v61=state.v61||{},S=V.seals=V.seals||{};S.zoom=z;saveSoon();}catch(e){}applyZoom();}
function fitZoom(){var desk=$("l7Desk");if(!desk||!desk.clientWidth)return 1;var cs=getComputedStyle(desk),w=desk.clientWidth-(parseFloat(cs.paddingLeft)||0)-(parseFloat(cs.paddingRight)||0);
  return clamp(Math.floor(w/640*100)/100,1,FITMAX);}
function curZoom(){var p=zoomPref();return p==="fit"?fitZoom():p;}
function applyZoom(){var desk=$("l7Desk");if(!desk)return;var p=zoomPref(),z=curZoom(),was=parseFloat(desk.style.getPropertyValue("--l-zoom"))||1;
  if(Math.abs(was-z)>.001){var r=desk.scrollHeight>desk.clientHeight?desk.scrollTop/desk.scrollHeight:0;desk.style.setProperty("--l-zoom",String(z));if(r)desk.scrollTop=r*desk.scrollHeight;}
  else if(!desk.style.getPropertyValue("--l-zoom"))desk.style.setProperty("--l-zoom",String(z));
  var box=$("l7Zoom");if(!box)return;var pct=Math.round(z*100)+"%";
  var f=box.querySelector('[data-z="fit"]');if(f){f.setAttribute("aria-pressed",p==="fit"?"true":"false");f.title=p==="fit"?"The page fits the panel ("+pct+")":"Fit the page to the panel";}
  var pc=box.querySelector(".pc");if(pc)pc.textContent=pct;
  var mi=box.querySelector('[data-z="-"]'),pl=box.querySelector('[data-z="+"]');if(mi)mi.disabled=z<=ZSTEPS[0]+.001;if(pl)pl.disabled=z>=ZSTEPS[ZSTEPS.length-1]-.001;}
function stepZoom(dir){var z=curZoom(),nz;if(dir>0)nz=ZSTEPS.filter(function(s){return s>z+.004;})[0]||ZSTEPS[ZSTEPS.length-1];
  else{var lo=ZSTEPS.filter(function(s){return s<z-.004;});nz=lo.length?lo[lo.length-1]:ZSTEPS[0];}setZoomPref(nz);}
function wireZoom(){var box=$("l7Zoom");if(!box||box.__w)return;box.__w=1;
  [].forEach.call(box.querySelectorAll("button"),function(b){b.onclick=function(){var v=b.getAttribute("data-z");if(v==="fit")setZoomPref(zoomPref()==="fit"?1:"fit");else stepZoom(v==="+"?1:-1);};});
  applyZoom();}
function fit(){var root=$("lx7");if(!root||!root.offsetParent)return;var r=root.getBoundingClientRect(),se=document.scrollingElement||document.documentElement,top=r.top+(se?se.scrollTop:0);
  var hgt=Math.max(420,Math.floor(window.innerHeight-top-12));root.style.setProperty("--l-h",hgt+"px");
  var w=r.width,isOne=w<900,isPhone=w<540;if(root.classList.contains("l-one")!==isOne||root.classList.contains("l-phone")!==isPhone){root.classList.toggle("l-one",isOne);root.classList.toggle("l-phone",isPhone);
    if(isOne)setPanel(R7.panel||(R7.running?"read":job()&&job().status==="done"?"doc":"brief"));}
  applySizes();segThumbs(root);}
var fitT=0;function layoutSoon(){clearTimeout(fitT);fitT=setTimeout(fit,30);}
function clamp(v,a,b){return Math.max(a,Math.min(b,v));}
/* 6.1 · a panel folds away to a narrow strip that keeps its name, and the others take its room; the code window folds too
   (the owner's words, 20 October 2026: "I want to be able to collapse sections of the Fabrica and Lector pages so that I can
   hide them from view and see the other panels and their contents better") */
var FOLDS=[["brief","l7Brief","The brief"],["read","l7Read","Thinking"],["doc","l7Doc","The document"]];
function folds(){var U=L7().ui;return U.fold&&typeof U.fold==="object"?U.fold:{};}
function applyFolds(){var P=$("l7Panels");if(!P)return;var F=one()?{}:folds(),open=FOLDS.filter(function(x){return !F[x[0]];}).length;
  FOLDS.forEach(function(x){var pn=$(x[1]);if(!pn)return;var on=!!F[x[0]];pn.classList.toggle("is-folded",on);var k=pn.querySelector(".l-fold");
    if(k){k.setAttribute("aria-expanded",on?"false":"true");k.title=on?"Open "+x[2].toLowerCase()+" again":"Fold "+x[2].toLowerCase()+" away; press again to open it";k.setAttribute("aria-label",k.title);}});
  if(!(F.brief||F.read||F.doc))P.style.removeProperty("grid-template-columns");
  else P.style.gridTemplateColumns=[F.brief?"44px":(open>1?"var(--w1,300px)":"minmax(0,1fr)"),"16px",F.read?"44px":(F.doc?"minmax(240px,1fr)":"minmax(240px,var(--w2,1fr))"),"16px",F.doc?"44px":(F.read?"minmax(280px,1fr)":"minmax(280px,1.18fr)")].join(" ");
  var g1=$("l7G1"),g2=$("l7G2");if(g1)g1.classList.toggle("off",!!(F.brief||F.read));if(g2)g2.classList.toggle("off",!!(F.read||F.doc));
  var U=L7().ui,cf=$("l7CodeFold"),nw=$("l7Now"),vg=$("l7Vg");if(cf&&nw&&vg){nw.hidden=!!U.codeShut;vg.hidden=!!U.codeShut;cf.setAttribute("aria-expanded",U.codeShut?"false":"true");cf.title=U.codeShut?"Show the code window again":"Fold the code window away";cf.classList.toggle("off",!!U.codeShut);}}
function foldPanel(k,on){var U=L7().ui,F=U.fold=folds();if(on==null)on=!F[k];
  if(on&&FOLDS.filter(function(x){return x[0]!==k&&!F[x[0]];}).length===0){ingToast("One panel stays open: open another before folding this one.");return;}
  if(on)F[k]=true;else delete F[k];saveSoon();applySizes();segThumbs($("lx7"));}
function wireFolds(){FOLDS.forEach(function(x){var pn=$(x[1]);if(!pn)return;var k=pn.querySelector(".l-fold");if(k)k.onclick=function(e){e.stopPropagation();foldPanel(x[0]);};
    pn.addEventListener("click",function(e){if(pn.classList.contains("is-folded")&&!e.target.closest(".l-fold")){e.preventDefault();e.stopPropagation();foldPanel(x[0],false);}},true);});
  var cf=$("l7CodeFold");if(cf)cf.onclick=function(e){e.stopPropagation();var U=L7().ui;U.codeShut=!U.codeShut;if(!U.codeShut)delete U.codeShut;saveSoon();applySizes();};}
function applySizes(){var P=$("l7Panels");if(!P)return;var U=L7().ui;applyFolds();if(one()){P.style.removeProperty("--w1");P.style.removeProperty("--w2");}
  else{var W=P.getBoundingClientRect().width;if(U.w1)P.style.setProperty("--w1",clamp(U.w1,230,Math.max(230,Math.min(560,W-32-240-280)))+"px");else P.style.removeProperty("--w1");
    if(U.w2)P.style.setProperty("--w2",clamp(U.w2,240,Math.max(240,W-32-280-(U.w1||300)))+"px");else P.style.removeProperty("--w2");}
  var now=$("l7Now");if(now){if(U.now){var rd=$("l7Rd").getBoundingClientRect().height;now.style.height=clamp(U.now,90,Math.max(90,rd-150))+"px";now.style.maxHeight="none";}else{now.style.removeProperty("height");now.style.removeProperty("max-height");}}
  applyZoom();}
function dragger(el,axis,move){if(!el||el.__d)return;el.__d=1;
  el.addEventListener("pointerdown",function(e){if(e.button!==0)return;e.preventDefault();try{el.setPointerCapture(e.pointerId);}catch(_){}el.classList.add("drag");document.body.classList.add("l7-resizing",axis==="x"?"col":"row");
    function mv(ev){move(axis==="x"?ev.clientX:ev.clientY);applySizes();}
    function up(){el.classList.remove("drag");document.body.classList.remove("l7-resizing","col","row");el.removeEventListener("pointermove",mv);el.removeEventListener("pointerup",up);el.removeEventListener("pointercancel",up);saveSoon();}
    el.addEventListener("pointermove",mv);el.addEventListener("pointerup",up);el.addEventListener("pointercancel",up);});
  el.addEventListener("keydown",function(e){var d=(e.key==="ArrowLeft"||e.key==="ArrowUp")?-24:(e.key==="ArrowRight"||e.key==="ArrowDown")?24:0;if(!d)return;e.preventDefault();var r=el.getBoundingClientRect();move((axis==="x"?r.left+r.width/2:r.top+r.height/2)+d);applySizes();saveSoon();});}
function segThumbs(root){if(!root)return;[].forEach.call(root.querySelectorAll(".l-seg,.l-tabs"),function(seg){var th=seg.querySelector(".l-thumb");if(!th)return;
  var on=seg.querySelector('button[aria-pressed="true"],button[aria-selected="true"]');if(!on||!on.offsetWidth){th.style.width="0";return;}
  th.style.width=on.offsetWidth+"px";th.style.transform="translateX("+(on.offsetLeft-3)+"px)";});}
function wireFrame(){var U=L7().ui;wireFolds();wireZoom();
  dragger($("l7G1"),"x",function(x){U.w1=Math.round(x-$("l7Brief").getBoundingClientRect().left);});
  dragger($("l7G2"),"x",function(x){U.w2=Math.round(x-$("l7Read").getBoundingClientRect().left-8);});
  dragger($("l7Vg"),"y",function(y){U.now=Math.round(y-$("l7Now").getBoundingClientRect().top-7);});
  [["l7G1","w1"],["l7G2","w2"],["l7Vg","now"]].forEach(function(p){$(p[0]).addEventListener("dblclick",function(){delete U[p[1]];applySizes();saveSoon();});});
  [].forEach.call($("l7Tabs").querySelectorAll("button"),function(b){b.onclick=function(){setPanel(b.getAttribute("data-p"));};});
  var fmt=$("l7Fmt");[].forEach.call(fmt.querySelectorAll("button"),function(b){b.setAttribute("aria-pressed",(L7().brief.fmt||"docx")===b.getAttribute("data-v")?"true":"false");
    b.onclick=function(){L7().brief.fmt=b.getAttribute("data-v");[].forEach.call(fmt.querySelectorAll("button"),function(x){x.setAttribute("aria-pressed",x===b?"true":"false");});segThumbs(fmt.parentNode);saveSoon();};});
  $("l7Save").onclick=save;$("l7Copy").onclick=function(){curDoc().then(function(d){if(d)lxCopy(d.md);else ingToast("There is nothing to copy yet.");});};
  /* the mouse wheel moves the rows that scroll sideways, since no bar shows */
  [].forEach.call($("lx7").querySelectorAll(".l-outline,.l-dtabs"),function(box){box.addEventListener("wheel",function(e){if(Math.abs(e.deltaX)>Math.abs(e.deltaY)||box.scrollWidth<=box.clientWidth+1)return;box.scrollLeft+=e.deltaY;e.preventDefault();},{passive:false});});
  /* the seals turn toward the pointer, lift, and sink when pressed */
  var root=$("lx7");root.addEventListener("pointermove",function(e){var t=e.target&&e.target.closest?e.target.closest(".l-app"):null,ls=t&&t.querySelector(".ls");
    [].forEach.call(root.querySelectorAll(".ls.hov"),function(x){if(x!==ls){x.classList.remove("hov","down");x.style.removeProperty("--rx");x.style.removeProperty("--ry");}});
    if(!ls||e.pointerType==="touch")return;var r=ls.getBoundingClientRect(),px=(e.clientX-r.left)/r.width-.5,py=(e.clientY-r.top)/r.height-.5;ls.classList.add("hov");
    ls.style.setProperty("--ry",(clamp(px,-.8,.8)*30).toFixed(1)+"deg");ls.style.setProperty("--rx",(-clamp(py,-.8,.8)*24).toFixed(1)+"deg");},{passive:true});
  root.addEventListener("pointerdown",function(e){var t=e.target&&e.target.closest?e.target.closest(".l-app"):null,ls=t&&t.querySelector(".ls");if(ls)ls.classList.add("down");},{passive:true});
  root.addEventListener("pointerup",function(){[].forEach.call(root.querySelectorAll(".ls.down"),function(x){x.classList.remove("down");});},{passive:true});
  if(typeof ResizeObserver==="function"){var ro=new ResizeObserver(layoutSoon);ro.observe(root);}
  watchFollow();}
window.addEventListener("resize",layoutSoon);
/* the theme changes the seals' faces; 6.1: whether or not Lector is open at the time, so it is never seen in the other look */
try{new MutationObserver(function(){if($("lx7")){paintBrief();paintDoc();}}).observe(document.body,{attributes:true,attributeFilter:["data-theme"]});}catch(e){}

/* ---------------- Lector's own reading, drawn here ---------------- */
/* R86 took a "build" from any text that followed CD-BUILD-MARKER, and in Ingenium that is Lector's own pattern
   (\s*([^): a build that is not a plain name or number is left out of every fact sheet and document */
var oFT=lxFactsText;lxFactsText=function(run){try{var f=run&&run.facts;if(f&&f.build&&!/^[\w .:\/()+-]{1,40}$/.test(f.build))f.build="";}catch(e){}return oFT.apply(this,arguments);};window.lxFactsText=lxFactsText;
var oRP=lxReadParts;lxReadParts=function(run,parts,notes){try{R7.parts[run.id]=parts;R7.notes[run.id]=notes;R7.seen[run.id]=notes.map(Boolean);var have=notes.filter(Boolean).length;
    addEv({k:"step",app:appOf(run),label:"Reading",text:"Reading "+run.name+(run.kind==="app"?(run.depth==="thorough"?", every line of its code":", an overview"):"")+": "+parts.length+" parts"+(have?", "+have+" read before":"")+". A note is kept after every part."});
    showCurrentPart();}catch(e){}return oRP.apply(this,arguments);};
window.lxReadParts=lxReadParts;
var oPJ=lxPutJSON;lxPutJSON=function(ref,v){try{if(Array.isArray(v)){var run=lxState().runs.filter(function(r){return r.notesRef===ref;})[0];
    if(run){var seen=R7.seen[run.id]||[];v.forEach(function(x,i){if(x&&!seen[i]){seen[i]=true;var ps=R7.parts[run.id];
      addEv({k:"note",app:appOf(run),label:"Part "+(i+1)+" of "+v.length+(ps&&ps[i]?" · "+ps[i].t+(ps[i].of>1?" ("+ps[i].k+" of "+ps[i].of+")":""):""),text:x,runId:run.id,part:i});}});R7.seen[run.id]=seen;R7.notes[run.id]=v;}}}catch(e){}
  return oPJ.apply(this,arguments);};
window.lxPutJSON=lxPutJSON;
var oSS=lxSetStep;lxSetStep=function(t){R7.step=t;var r=oSS.apply(this,arguments);try{if(/^Reading part/.test(t))showCurrentPart();if(/^Joining|^Writing the analysis/.test(t)&&R7.pin==null)codeIdle({head:t,body:/^Joining/.test(t)?"Lector is joining its notes into one account, keeping every distinct fact, name, number and quotation.":"Lector is writing the analysis, one section at a time, from its notes and the measures of the file."});}catch(e){}return r;};
window.lxSetStep=lxSetStep;
lxPaintLive=function(){paintLiveSoon();};window.lxPaintLive=lxPaintLive;
lxPaintRun=function(){paintProgress();};window.lxPaintRun=lxPaintRun;
lxRender=function(){try{if(!$("page-lector").classList.contains("active")&&$("lx7")){paintBrief();return;}render();}catch(e){try{console.error("R108",e);}catch(_){}}};window.lxRender=lxRender;
/* while Lector writes, a message in the chat waits, as before; a reading gives way to it and carries on by itself */
try{var og=go;go=function(p){var r=og.apply(this,arguments);try{document.body.classList.toggle("lx7-on",p==="lector");if(p==="lector"){layoutSoon();setTimeout(fit,120);}}catch(e){}return r;};window.go=go;}catch(e){}
/* a set left under way when the app closed waits, paused, for Go on */
(function(){try{var j=L7().job;if(j&&(j.status==="reading"||j.status==="writing"))j.status=j.status==="writing"?"writing":"paused";}catch(e){}})();
ORDER.forEach(function(k){if(L7().brief.apps.indexOf(k)>=0)prepare(k);});
window.IngLector={render:render,state:L7,go:r7Go,run:r7Run,R7:R7,paper:paper,htmlDoc:htmlDoc,check:check,writeDoc:writeDoc,gather:gather,setKey:setKey,runFor:runFor,staleRun:staleRun,ensureRun:ensureRun,fit:fit,setPanel:setPanel,tables:tables,parsePost:parsePost};
/* 6.2: for the tests */
try{window.IngLector.atlasOf=atlasOf;window.IngLector.atlasMd=atlasMd;window.IngLector.atlasDoc=atlasDoc;window.IngLector.midTab=midTab;window.IngLector.askWritten=askWritten;window.IngLector.askSend=askSend;}catch(e){}
try{if($("page-lector").classList.contains("active")){document.body.classList.add("lx7-on");render();}}catch(e){}
})();
;try{window.__ingParts["p40"]="running";}catch(_){}
</script>
