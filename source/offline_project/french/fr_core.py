import sys
p=sys.argv[1]
s=open(p,encoding='utf-8').read()
R=[
# module level: spheres with French, a language hook, French dates
('''var SPH={academic:{icon:"🎓",label:"Academic",word:"academic"},work:{icon:"💼",label:"Professional",word:"professional"},
  creative:{icon:"🎨",label:"Creative",word:"creative"},personal:{icon:"🌱",label:"Personal",word:"personal"}};''',
'''var SPH={academic:{icon:"🎓",label:"Academic",word:"academic",fr:"Académique",frw:"académique"},work:{icon:"💼",label:"Professional",word:"professional",fr:"Professionnel",frw:"professionnelle"},
  creative:{icon:"🎨",label:"Creative",word:"creative",fr:"Créatif",frw:"créative"},personal:{icon:"🌱",label:"Personal",word:"personal",fr:"Personnel",frw:"personnelle"}};
/* the language: each app says which it speaks (Carpe Diem is fully bilingual); English unless told otherwise */
var LANGF=null;function isFr(){try{return !!(LANGF&&LANGF()==="fr");}catch(e){return false;}}
function T(en,fr){return isFr()?fr:en;}
function sLabel(k){return isFr()?SPH[k].fr:SPH[k].label;}
function sWord(k){return isFr()?SPH[k].frw:SPH[k].word;}
function loc(){return isFr()?"fr-FR":undefined;}'''),
('''  creative:"paint\\\\w*|draw\\\\w*''','''  creative:"peinture|peindre|dessin\\\\w*|chansons?|musique|poèmes?|poésie|roman\\\\w*|tricot\\\\w*|couture|toiles?|mélodies?|personnages?|scènes?|aquarelles?|paint\\\\w*|draw\\\\w*'''),
('''  work:"work|jobs?|''','''  work:"travail|emplois?|factures?|réunions?|entretiens?|candidatures?|échéances?|contrats?|collègues?|salaire|rapports?|bureau|work|jobs?|'''),
('''  academic:"thesis|''','''  academic:"thèses?|mémoires?|chapitres?|séminaires?|cours|examens?|bibliographie|recherches?|colloques?|université|professeurs?|devoirs?|thesis|'''),
('''function ago(at){var s=Math.max(0,(Date.now()-at)/1000);if(s<60)return "just now";var m=Math.round(s/60);if(m<60)return m+" minute"+(m===1?"":"s")+" ago";
  var h=Math.round(m/60);if(h<24)return h+" hour"+(h===1?"":"s")+" ago";var d=Math.round(h/24);if(d===1)return "yesterday";if(d<7)return d+" days ago";
  var w=Math.round(d/7);if(w<5)return w+" week"+(w===1?"":"s")+" ago";return new Date(at).toLocaleDateString(undefined,{day:"numeric",month:"long"});}
function waited(at){var d=Math.floor((Date.now()-at)/864e5);if(d<1){var h=Math.floor((Date.now()-at)/36e5);return h<1?"less than an hour":h+" hour"+(h===1?"":"s");}return d+" day"+(d===1?"":"s");}
function when(t){var d=new Date(t),n=new Date(),tm=d.toLocaleTimeString(undefined,{hour:"numeric",minute:"2-digit"});
  if(dayKey(d)===dayKey(n))return "today, "+tm;var tmr=new Date(n.getTime()+864e5);if(dayKey(d)===dayKey(tmr))return "tomorrow, "+tm;
  return d.toLocaleDateString(undefined,{weekday:"long",day:"numeric",month:"long"})+", "+tm;}''',
'''function pl(n,en,fr){return n+" "+(isFr()?fr:en)+(n===1?"":"s");}
function ago(at){var s=Math.max(0,(Date.now()-at)/1000);if(s<60)return T("just now","à l’instant");var m=Math.round(s/60);if(m<60)return isFr()?"il y a "+pl(m,"","minute"):pl(m,"minute","")+" ago";
  var h=Math.round(m/60);if(h<24)return isFr()?"il y a "+pl(h,"","heure"):pl(h,"hour","")+" ago";var d=Math.round(h/24);if(d===1)return T("yesterday","hier");if(d<7)return isFr()?"il y a "+d+" jours":d+" days ago";
  var w=Math.round(d/7);if(w<5)return isFr()?"il y a "+pl(w,"","semaine"):pl(w,"week","")+" ago";return new Date(at).toLocaleDateString(loc(),{day:"numeric",month:"long"});}
function waited(at){var d=Math.floor((Date.now()-at)/864e5);if(d<1){var h=Math.floor((Date.now()-at)/36e5);return h<1?T("less than an hour","moins d’une heure"):pl(h,"hour","heure");}return pl(d,"day","jour");}
function when(t){var d=new Date(t),n=new Date(),tm=d.toLocaleTimeString(loc(),{hour:"numeric",minute:"2-digit"});
  if(dayKey(d)===dayKey(n))return T("today, ","aujourd’hui, ")+tm;var tmr=new Date(n.getTime()+864e5);if(dayKey(d)===dayKey(tmr))return T("tomorrow, ","demain, ")+tm;
  return d.toLocaleDateString(loc(),{weekday:"long",day:"numeric",month:"long"})+", "+tm;}'''),
('''var REMIND=[["In an hour",function(){return Date.now()+36e5;}],["This evening",function(){''','''var REMIND=[[["In an hour","Dans une heure"],function(){return Date.now()+36e5;}],[["This evening","Ce soir"],function(){'''),
('''  ["Tomorrow morning",function(){return at9(1);}],["In three days",function(){return at9(3);}],["Next week",function(){return at9(7);}]];''',
 '''  [["Tomorrow morning","Demain matin"],function(){return at9(1);}],[["In three days","Dans trois jours"],function(){return at9(3);}],[["Next week","La semaine prochaine"],function(){return at9(7);}]];'''),
('''  var H=host||{},P=H.prefix||"tc_",app=H.app||"ingenium";''','''  var H=host||{},P=H.prefix||"tc_",app=H.app||"ingenium";if(H.lang)LANGF=H.lang;
  function hv(v){return typeof v==="function"?v():v;}'''),
# badge
('''    var bits=[];if(n)bits.push(n+" in the Inbox");if(dr)bits.push("1 put away");if(t)bits.push(t+" caught today");
    var title=(dr?"Bring back your thought":"Catch a thought")+(bits.length?" ("+bits.join(", ")+")":"");''',
'''    var bits=[];if(n)bits.push(n+T(" in the Inbox"," dans la Boîte"));if(dr)bits.push(T("1 put away","1 mise de côté"));if(t)bits.push(t+T(" caught today"," saisie"+(t===1?"":"s")+" aujourd’hui"));
    var title=(dr?T("Bring back your thought","Rouvrir votre pensée"):T("Catch a thought","Saisir une pensée"))+(bits.length?" ("+bits.join(", ")+")":"");'''),
('''if(ob)ob.textContent="Inbox"+(n?" · "+n:"");}''','''if(ob)ob.textContent=T("Inbox","Boîte")+(n?" · "+n:"");}'''),
# open
('''"aria-label":"Your thought",placeholder:H.placeholder||"A thought, a task, a worry: let it go"});''','''"aria-label":T("Your thought","Votre pensée"),placeholder:hv(H.placeholder)||T("A thought, a task, a worry: let it go","Une pensée, une tâche, un souci : laissez-la aller")});'''),
('''el("button","tc-key tc-keep",{type:"button",text:"Keep",title:"Keep it in the Inbox (Ctrl and Enter)",on:{click:function(){keep();}}}),
      el("button","tc-key tc-open",{type:"button",text:"Inbox"+(n?" · "+n:""),title:"Open the Inbox",on:''',
 '''el("button","tc-key tc-keep",{type:"button",text:T("Keep","Garder"),title:T("Keep it in the Inbox (Ctrl and Enter)","La garder dans la Boîte (Ctrl et Entrée)"),on:{click:function(){keep();}}}),
      el("button","tc-key tc-open",{type:"button",text:T("Inbox","Boîte")+(n?" · "+n:""),title:T("Open the Inbox","Ouvrir la Boîte"),on:'''),
('''text:"−",title:"Put it away for now: the 💭 keeps your words and reminds you","aria-label":"Put the thought away for now",''','''text:"−",title:T("Put it away for now: the 💭 keeps your words and reminds you","La mettre de côté : le 💭 garde vos mots et vous la rappelle"),"aria-label":T("Put the thought away for now","Mettre la pensée de côté"),'''),
('''text:"✕",title:"Close","aria-label":"Close",on:{click:function(){closeAsk();}}})]);''','''text:"✕",title:T("Close","Fermer"),"aria-label":T("Close","Fermer"),on:{click:function(){closeAsk();}}})]);'''),
('''[el("span",null,{text:"Keep these words in the Inbox?"}),
      el("button","tc-key tc-keep tc-small",{type:"button",text:"Keep them",on:{click:function(){keep();}}}),
      el("button","tc-key tc-small",{type:"button",text:"Let them go",on:''','''[el("span",null,{text:T("Keep these words in the Inbox?","Garder ces mots dans la Boîte ?")}),
      el("button","tc-key tc-keep tc-small",{type:"button",text:T("Keep them","Les garder"),on:{click:function(){keep();}}}),
      el("button","tc-key tc-small",{type:"button",text:T("Let them go","Les laisser partir"),on:'''),
('''el("button","tc-key tc-small",{type:"button",text:"Back",on:{click:function(){askOff();}}})]);''','''el("button","tc-key tc-small",{type:"button",text:T("Back","Retour"),on:{click:function(){askOff();}}})]);'''),
('''text:"💭",title:"Drag me anywhere"})''','''text:"💭",title:T("Drag me anywhere","Déplacez-moi où vous voulez")})'''),
('''title:d==="se"?"Drag any edge or corner to resize; double-click for the usual size":null''','''title:d==="se"?T("Drag any edge or corner to resize; double-click for the usual size","Tirez un bord ou un coin pour changer la taille ; double-cliquez pour la taille habituelle"):null'''),
('''cloud=dress(el("div","tc-cloud",{role:"dialog","aria-label":"Catch a thought"},[tilt]));''','''cloud=dress(el("div","tc-cloud",{role:"dialog","aria-label":T("Catch a thought","Saisir une pensée")},[tilt]));'''),
('''toast(H.keptText||"Kept in the Inbox. Back to what you were doing.");};''','''toast(hv(H.keptText)||T("Kept in the Inbox. Back to what you were doing.","Gardée dans la Boîte. Retour à ce que vous faisiez."));};'''),
('''if(!quietly)toast("Put away. The 💭 keeps your words and will remind you.");};''','''if(!quietly)toast(T("Put away. The 💭 keeps your words and will remind you.","Mise de côté. Le 💭 garde vos mots et vous la rappellera."));};'''),
# inbox
('''  var DONE={key:"done",label:"✓ Done",word:"done",run:function(it){toast("Done. One less thing to hold.");}};
  function places(){var p=(H.places||[]).slice();return p.concat([DONE]);}''',
'''  function done1(){return {key:"done",label:T("✓ Done","✓ Fait"),word:T("done","fait"),run:function(it){toast(T("Done. One less thing to hold.","Fait. Une chose de moins à porter."));}};}
  function places(){var p=(hv(H.places)||[]).slice();return p.concat([done1()]);}'''),
('''return SK.filter(function(k){return c[k];}).map(function(k){return c[k]+" "+SPH[k].word;}).join(", ");}''','''return SK.filter(function(k){return c[k];}).map(function(k){return c[k]+" "+sWord(k)+(isFr()&&c[k]>1?"s":"");}).join(", ");}'''),
('''sh=el("div","tc-sheet",{role:"dialog","aria-modal":"true","aria-label":"The Inbox"});''','''sh=el("div","tc-sheet",{role:"dialog","aria-modal":"true","aria-label":T("The Inbox","La Boîte")});'''),
('''text:"💭"}),"The Inbox"]));
      sh.appendChild(el("button","tc-key tc-round tc-sheet-x",{type:"button",text:"✕",title:"Close","aria-label":"Close the Inbox",on:{click:closeSheet}}));
      sh.appendChild(el("p","tc-lead",{text:(items.length?items.length+" waiting"+(t?" · "+t+" caught today":"")+". Send each one where it belongs, or let it go.":"Nothing is waiting."+(t?" "+t+" caught today, all sorted.":""))}));''',
'''text:"💭"}),T("The Inbox","La Boîte")]));
      sh.appendChild(el("button","tc-key tc-round tc-sheet-x",{type:"button",text:"✕",title:T("Close","Fermer"),"aria-label":T("Close the Inbox","Fermer la Boîte"),on:{click:closeSheet}}));
      sh.appendChild(el("p","tc-lead",{text:(items.length?items.length+T(" waiting"," en attente")+(t?" · "+t+T(" caught today"," saisie"+(t===1?"":"s")+" aujourd’hui"):"")+T(". Send each one where it belongs, or let it go.",". Envoyez chacune à sa place, ou laissez-la partir."):T("Nothing is waiting.","Rien n’attend.")+(t?" "+t+T(" caught today, all sorted."," saisie"+(t===1?"":"s")+" aujourd’hui, toutes triées."):""))}));'''),
('''text:"All · "+items.length,''','''text:T("All · ","Toutes · ")+items.length,'''),
('''text:SPH[k].icon+" "+SPH[k].label+" · "+c[k],on:{click:function(){filter=filter===k?"all":k;drawSheet();}}}));});''','''text:SPH[k].icon+" "+sLabel(k)+" · "+c[k],on:{click:function(){filter=filter===k?"all":k;drawSheet();}}}));});'''),
('''{text:items.length?"Nothing here in this part of your life.":"The Inbox is empty. A clear head."}''','''{text:items.length?T("Nothing here in this part of your life.","Rien ici dans cette part de votre vie."):T("The Inbox is empty. A clear head.","La Boîte est vide. Une tête dégagée.")}'''),
('''text:SPH[s].icon+" "+SPH[s].label,title:"Which part of your life this belongs to",
          on:{click:function(){menu(sc,SK.map(function(k){return [SPH[k].icon+" "+SPH[k].label,''','''text:SPH[s].icon+" "+sLabel(s),title:T("Which part of your life this belongs to","À quelle part de votre vie elle appartient"),
          on:{click:function(){menu(sc,SK.map(function(k){return [SPH[k].icon+" "+sLabel(k),'''),
('''text:it.remindAt?"⏰ "+when(it.remindAt):"⏰ Remind me",title:"When should this come back to you?",
          on:{click:function(){menu(rc,REMIND.map(function(r){return [r[0],function(){it.remindAt=r[1]();it.reminded=0;changed();drawSheet();toast("It will come back to you "+when(it.remindAt)+".");}];})
            .concat(it.remindAt?[["No reminder",''','''text:it.remindAt?"⏰ "+when(it.remindAt):T("⏰ Remind me","⏰ Me la rappeler"),title:T("When should this come back to you?","Quand doit-elle vous revenir ?"),
          on:{click:function(){menu(rc,REMIND.map(function(r){return [T(r[0][0],r[0][1]),function(){it.remindAt=r[1]();it.reminded=0;changed();drawSheet();toast(T("It will come back to you ","Elle vous reviendra ")+when(it.remindAt)+".");}];})
            .concat(it.remindAt?[[T("No reminder","Pas de rappel"),'''),
('''[el("span",null,null,["Suggested: ",el("b",null,{text:sp.word}),sg.why?": "+sg.why:""]),
          el("button","tc-key tc-keep tc-small",{type:"button",text:"Do it",''','''[el("span",null,null,[T("Suggested: ","Suggestion : "),el("b",null,{text:sp.word}),sg.why?": "+sg.why:""]),
          el("button","tc-key tc-keep tc-small",{type:"button",text:T("Do it","Le faire"),'''),
('''{type:"button",text:"+ Catch another",on:''','''{type:"button",text:T("+ Catch another","+ En saisir une autre"),on:'''),
('''{type:"button",text:"✨ Suggest where each goes",title:"Your model on this device suggests a place for each; nothing moves until you press Do it",
        on:{click:function(){var b=this;b.disabled=true;b.textContent="Thinking…";''','''{type:"button",text:T("✨ Suggest where each goes","✨ Suggérer une place pour chacune"),title:hv(H.suggestTitle)||T("Your model on this device suggests a place for each; nothing moves until you press Do it","Une place suggérée pour chacune ; rien ne bouge avant que vous appuyiez sur Le faire"),
        on:{click:function(){var b=this;b.disabled=true;b.textContent=T("Thinking…","Un instant…");'''),
('''cadLabel={gentle:"Gentle reminders",often:"Frequent reminders",off:"Reminders off"}[cad];
      var cb=el("button","tc-chip",{type:"button",text:"⏰ "+cadLabel,title:"How often the 💭 reminds you of what waits",
        on:{click:function(){menu(cb,[["Gentle: every few hours",function(){cadence("gentle");drawSheet();}],["Often: about every hour",function(){cadence("often");drawSheet();}],["Off: only the number on the 💭",function(){cadence("off");drawSheet();}]]);}}});''',
'''cadLabel={gentle:T("Gentle reminders","Rappels doux"),often:T("Frequent reminders","Rappels fréquents"),off:T("Reminders off","Rappels désactivés")}[cad];
      var cb=el("button","tc-chip",{type:"button",text:"⏰ "+cadLabel,title:T("How often the 💭 reminds you of what waits","À quelle fréquence le 💭 vous rappelle ce qui attend"),
        on:{click:function(){menu(cb,[[T("Gentle: every few hours","Doux : toutes les quelques heures"),function(){cadence("gentle");drawSheet();}],[T("Often: about every hour","Souvent : environ toutes les heures"),function(){cadence("often");drawSheet();}],[T("Off: only the number on the 💭","Désactivés : seulement le nombre sur le 💭"),function(){cadence("off");drawSheet();}]]);}}});'''),
('''{type:"button",text:"Let them all go",on:{click:function(){
          end.innerHTML="";end.appendChild(el("span",null,{text:"Let all "+items.length+" go?"}));
          end.appendChild(el("button","tc-key tc-small",{type:"button",text:"Yes, let them go",on:{click:function(){list().length=0;SUG={};changed();drawSheet();}}}));
          end.appendChild(el("button","tc-key tc-keep tc-small",{type:"button",text:"Keep them",on:{click:drawSheet}}));}}});''',
'''{type:"button",text:T("Let them all go","Tout laisser partir"),on:{click:function(){
          end.innerHTML="";end.appendChild(el("span",null,{text:T("Let all "+items.length+" go?","Laisser partir les "+items.length+" ?")}));
          end.appendChild(el("button","tc-key tc-small",{type:"button",text:T("Yes, let them go","Oui, les laisser partir"),on:{click:function(){list().length=0;SUG={};changed();drawSheet();}}}));
          end.appendChild(el("button","tc-key tc-keep tc-small",{type:"button",text:T("Keep them","Les garder"),on:{click:drawSheet}}));}}});'''),
# nudges
('''{type:"button",text:"✕","aria-label":"Close the reminder",on:{click:closeNudge}});''','''{type:"button",text:"✕","aria-label":T("Close the reminder","Fermer le rappel"),on:{click:closeNudge}});'''),
('''return nudge("You put a thought away "+ago(dr.at)+":",dr.t,[["Bring it back",function(){open();}],["Keep it in the Inbox",function(){var d=draft();if(d){list().unshift({id:uid(),t:d.t,at:d.at,sphere:guess(d.t)});ls("draft",null);countToday();changed();toast("Kept in the Inbox.");}}]]);}''',
 '''return nudge(T("You put a thought away "+ago(dr.at)+":","Vous avez mis une pensée de côté "+ago(dr.at)+" :"),dr.t,[[T("Bring it back","La reprendre"),function(){open();}],[T("Keep it in the Inbox","La garder dans la Boîte"),function(){var d=draft();if(d){list().unshift({id:uid(),t:d.t,at:d.at,sphere:guess(d.t)});ls("draft",null);countToday();changed();toast(T("Kept in the Inbox.","Gardée dans la Boîte."));}}]]);}'''),
('''return nudge("A thought you asked to come back to"+(due.at?", from "+ago(due.at):"")+":",due.t,[["Open it",function(){due.remindAt=null;save();openInbox(due.id);}],
        ["Later",function(){due.remindAt=Date.now()+2*36e5;due.reminded=0;save();toast("It will come back "+when(due.remindAt)+".");}],["Done",function(){take(due.id);toast("Done. One less thing to hold.");}]]);}''',
 '''return nudge(T("A thought you asked to come back to"+(due.at?", from "+ago(due.at):"")+":","Une pensée que vous vouliez retrouver"+(due.at?", notée "+ago(due.at):"")+" :"),due.t,[[T("Open it","L’ouvrir"),function(){due.remindAt=null;save();openInbox(due.id);}],
        [T("Later","Plus tard"),function(){due.remindAt=Date.now()+2*36e5;due.reminded=0;save();toast(T("It will come back ","Elle reviendra ")+when(due.remindAt)+".");}],[T("Done","Fait"),function(){take(due.id);toast(T("Done. One less thing to hold.","Fait. Une chose de moins à porter."));}]]);}'''),
('''if(!items.length)return nudge("Nothing waits in the Inbox. A clear head.",null,[["Catch a thought",function(){open("");}]]);''','''if(!items.length)return nudge(T("Nothing waits in the Inbox. A clear head.","Rien n’attend dans la Boîte. Une tête dégagée."),null,[[T("Catch a thought","Saisir une pensée"),function(){open("");}]]);'''),
('''var c=balance(items),head=items.length===1?"One thought is waiting in the Inbox.":items.length+" thoughts are waiting in the Inbox: "+balanceWords(c)+".";
      return nudge(head+" Your oldest "+SPH[s].word+" one has waited "+waited(it.at)+":",it.t,[["Open the Inbox",function(){openInbox(it.id);}],["Not now",function(){ls("roundAt",Date.now());}]]);}''',
 '''var c=balance(items),head=items.length===1?T("One thought is waiting in the Inbox.","Une pensée attend dans la Boîte."):T(items.length+" thoughts are waiting in the Inbox: "+balanceWords(c)+".",items.length+" pensées attendent dans la Boîte : "+balanceWords(c)+".");
      return nudge(head+T(" Your oldest "+sWord(s)+" one has waited "+waited(it.at)+":"," Votre plus ancienne pensée "+sWord(s)+" attend depuis "+waited(it.at)+" :"),it.t,[[T("Open the Inbox","Ouvrir la Boîte"),function(){openInbox(it.id);}],[T("Not now","Pas maintenant"),function(){ls("roundAt",Date.now());}]]);}'''),
('''setLook:function(v){ls("look",v==="layered"?"layered":"note");redress();},when:when,ago:ago};''','''setLook:function(v){ls("look",v==="layered"?"layered":"note");redress();},when:when,ago:ago,sphereLabel:sLabel,T:T};'''),
('''window.ThoughtCloud={create:create,guess:guess,spheres:SPH,v:1};''','''window.ThoughtCloud={create:create,guess:guess,spheres:SPH,v:2};'''),
]
for a,b in R:
    n=s.count(a)
    if n!=1:
        print("MISS",n,repr(a[:90])); sys.exit(1)
    s=s.replace(a,b)
open(p,'w',encoding='utf-8').write(s)
print("ok",len(R))
