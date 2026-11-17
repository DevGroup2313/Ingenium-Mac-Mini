<script>try{(window.__ingParts=window.__ingParts||{})["p250"]="started";}catch(_){}
/* ============ R250 · THE TOUR, THE GUIDE AND HELP, UP TO DATE (Ingenium 6.53, 7 November 2026) ============
   Her words (7 November 2026): "Please make sure that the guided tour and its demonstrations are also updated as well as the Guide
   page to reflect the latest pages and sections as well as updates recently made to Ingenium, they should all be properly updated to
   reflect the latest version of Ingenium, the same for all of the different editions of Ingeniums and its demos."
   Measured on 6.52 (the tour as the page builds it, 75 cards; the Guide, 18 topics; Help, 14 pages): none of them named the top bar's
   model key and How it answers (6.46, 6.52), Connect a service (6.46), Context and compacting (6.47), how long a model thinks and the
   sources given only when asked (6.46), or the Offline Project made in Fabrica (6.48, 6.51). Each now has its card in the tour, at
   the place where the tour already shows that part of the page, a topic in the Guide, and a line in Help. The Offline Project's card
   and topic are made only where the master edition carries it (window.IngOffline). Every card rings an element the page has; a card
   for a page an edition leaves out is taken out by modules/r231.js, as every other. */
(function r250(){
"use strict";
if(window.__r250)return;window.__r250=1;
var W=window,D=document;
function $(id){return D.getElementById(id);}
function mk(t,c,x){var e=D.createElement(t);if(c)e.className=c;if(x!=null)e.textContent=x;return e;}
function warn(e){try{console.warn("r250",e);}catch(_){}}
function T(){try{return Array.isArray(W.ING_TOUR)?W.ING_TOUR:null;}catch(e){return null;}}
function bare(t){return String(t||"").replace(/^[^A-Za-z]+/,"").trim();}
/* a card goes after the first of its anchors the tour has (other modules add cards as Ingenium starts, so a card already placed is
   taken out and placed again after its anchor); it belongs to that card's chapter, without starting a part of its own */
function after(titles,card){var L=T();if(!L)return;titles=[].concat(titles);
  for(var i=L.length-1;i>=0;i--)if(L[i]&&L[i].r250===card.r250){card=L[i];L.splice(i,1);}
  var at=-1;for(var k=0;k<titles.length&&at<0;k++)L.forEach(function(s,i){if(at<0&&s&&bare(s.t)===titles[k])at=i;});if(at<0)return;
  card.chap=L[at].chap;L.splice(at+1,0,card);}

/* ---------- 1. the tour ---------- */
function tour(){try{if(!T())return;
  after(["Effort, beside the model","Choosing the model"],{r250:"who",levels:["new","some","expert"],go:function(){W.go("chat");},ring:"#activeModelPill",
    t:"🗝️ Who answers, from any page",
    b:"The top bar's model key says who answers now, on every page. Press it to choose: a model on this device, or a service you connected. Under Who answers, How it answers sets the effort, the longest reply and how much the model keeps in mind; each model and each service keeps its own, and Ingenium gives them back when you choose it again.",
    tip:"Lector, Vocatio, Blend, Build and Code all use what is set here, so you can change it without going back to the chat."});
  after("Who answers, from any page",{r250:"connect",go:function(){W.go("chat");},ring:"#chatModelBtn",
    t:"🔌 Connect a service",
    b:"To use Claude, OpenAI, Gemini, Ollama or another service, open the model menu and choose Connect a service: pick the service, paste its key (or the address of your Ollama), and choose a model. The key stays on this device. Find a model, at the top of the menu, finds any model you have, by name.",
    tip:"A service you connected is listed under Who answers with the models of this device, so changing between them is one press."});
  after("Controls",{r250:"context",go:function(){W.go("chat");},ring:[".ing-mem-pill","#chatInput"],
    t:"🧠 Context and compacting",
    b:"The memory key in the message box shows how much of the model's memory the conversation fills, part by part. When it is nearly full, Ingenium compacts the earlier part into a summary that takes its place for the model; every message stays on the page. Compact now does it at once; Automatic can be turned off.",
    tip:"A compacted conversation costs fewer tokens on every reply, with a connected service as with a model on this device."});
  after("Reading its thinking",{r250:"thinklen",go:function(){W.go("chat");},ring:["#effKey","#chatInput"],
    t:"⏳ How long it thinks, and sources when you ask",
    b:"In the effort key's menu, How long it thinks sets how long a model on this device may think before it answers (Brief, Standard, Deep or Open), and Only when it helps lets it skip thinking for an easy question. A model that goes round in circles is stopped and answers. Sources and citations come when you ask for them, not with every reply.",
    tip:"Write \"with sources\" or \"cite\" in a message when you want them."});
  if(W.IngOffline&&typeof W.IngOffline==="object")after("Fabrica",{r250:"offline",go:function(){W.go("fabrica");},ring:["#fbBring","#fbRepos"],
    t:"🏛️ The Offline Project, made from your apps",
    b:"Bring one in offers The Offline Project, made from the apps your library keeps now: all four, or without Inkwell. It is then kept in Your apps beside Ingenium and your other apps, with its crest, its versions and its ships, like any app; making it again adds a new version. Its own choices (each app's copy, the hall's words, Make and open, Save the app) are in Bring one in too, and it is listed in Code's Your apps and the + menu.",
    tip:"It is in Your apps only once you have made it in Fabrica, as any app you work on there."});
}catch(e){warn(e);}}

/* ---------- 2. the Guide ---------- */
function topic(id,title,rows,before){var g=$("page-guide");if(!g||$(id))return null;var card=mk("div","card");card.id=id;
  card.appendChild(mk("h2","sec",title));
  rows.forEach(function(r,i){var t=mk("div","tip");t.appendChild(mk("span","tip-mark",String(i+1)));var d=mk("div");d.appendChild(mk("b",null,r[0]+" "));d.appendChild(D.createTextNode(r[1]));t.appendChild(d);card.appendChild(t);});
  var ref=before?$(before):null;if(ref&&ref.parentNode===g)g.insertBefore(card,ref.nextSibling);else g.appendChild(card);return card;}
function guide(){try{
  topic("whoGuide","Models and services: who answers, and how",[
    ["Who answers.","The top bar's model key shows the model or service that answers now, on every page. Press it to choose another: a model on this device or a service you connected."],
    ["How it answers.","Under Who answers: Effort (Auto, or Low to Max), Longest reply (or Follows the effort) and Context (a model's window, or the memory Ingenium gives a service). The chat's Controls show the same settings."],
    ["Kept for each.","Each model and each service keeps its own settings; they come back when Ingenium starts and whenever you choose it again. One used for the first time starts from the last settings you chose."],
    ["Connect a service.","In the model menu: choose the service, paste its key (or Ollama's address), choose a model. Keys stay on this device, in its store."],
    ["Find a model.","At the top of the model menu, it finds any model of yours, on this device or at a service, by its name."]],"guideEffortCard");
  topic("ctxGuide","Context and compacting in a chat",[
    ["The memory key.","In the message box, it shows how full the model's memory is; pressed, it opens Context: the share each part takes (the instructions, the files, the conversation)."],
    ["Compacting.","Near the limit, Ingenium summarises the earlier part of the conversation; the summary takes its place for the model, and every message stays on the page. Compact now does it at once; Automatic can be turned off."],
    ["Fewer tokens.","After a compact, each reply sends the summary instead of every earlier message, so a long conversation costs less and stays within the model's window."],
    ["Slash commands.","Type / in any chat, in Chat or Code, for the list: compact, clear, a new chat, the effort and more. The + menu's Slash commands shows the same list."]],"whoGuide");
  topic("thinkGuide","Thinking and sources in a chat",[
    ["How long it thinks.","In the effort key's menu: Brief, Standard, Deep or Open, for a model on this device. A model that goes round in circles is stopped and answers."],
    ["Only when it helps.","The model skips thinking for an easy question and thinks for a hard one."],
    ["Sources when you ask.","Replies give sources and citations when you ask for them (\"with sources\", \"cite\"), not every time."]],"ctxGuide");
  /* 7.21 (her words, 15 November 2026: "The guided tour, its demonstrations and the Guide brought up to date with every page"): topics for the
     pages the Guide did not yet name, in the tour's own words and the pages' own; each only where its page exists in this edition */
  /* Home's keys as this copy shows them (Fabrica and Lector are not in every edition): the tour's step said "bring in a model,
     chat, Vesta and Adamas", the keys of an earlier Home; the Guide and the tour now read them from Home itself */
  var doors=(function(){try{var k=(W.IngHome&&IngHome.keys)?IngHome.keys():[],n=k.map(function(x){return x.t;}),f=k.filter(function(x){return x.k==="focus";})[0];
    if(n.length<2)return "";return "open the main rooms: "+n.slice(0,-1).join(", ")+" and "+n[n.length-1]+", each with a line saying what it is for."+(f?" The "+f.t+" key also shows the step you are working on, so it is waiting when you come back.":"")+
      " Further down, Bring in a model opens Mentes, where you get a model or bring your own.";}catch(e){return "";}})();
  if(doors&&W.ING_TOUR)ING_TOUR.forEach(function(s){if(s.ring==="#homeFocusQuick")s.b="These keys "+doors;});
  topic("homeGuide","Home: where Ingenium opens",[
    ["Your next step.","The large button always shows your next useful step: getting your first model, loading it, or starting a chat."],
    doors?["The doors.","Its keys "+doors]:null].filter(Boolean),"guideTourCard");
  if($("page-build"))topic("adGuide","Adamas: pages and small apps",[
    ["Code in, a page out.","In the tab Your page, describe what you want and a model writes it, or write it yourself; the preview beside it runs as you type. It works fully offline and does not need a model."],
    ["An app for your devices.","A finished page can become an app for your devices: Download as an app, Adamas's second tab, makes a build kit for each device, or every kit at once."],
    ["The diamond.","Point at the diamond and it turns to you. Press it, or any part of its holder (the engine logo, the Orrery, the bezel, the band of brilliants, the rim), and it answers. The small diamond key in the corner of the head opens its colours beside it: by the hour, one look to keep, or a colour of your own, and the holder's band (7.29, refined in 7.30)."]]);
  var carried=(function(){try{var m=(W.IngBuiltin&&IngBuiltin.meta)||{},o=["forge","inkwell","cd"],k=Object.keys(m).sort(function(a,b){var i=o.indexOf(a),j=o.indexOf(b);return (i<0?9:i)-(j<0?9:j);}),n=k.map(function(x){return m[x].title||x;});return n.length>1?n.slice(0,-1).join(", ")+" and "+n[n.length-1]+" travel":n.length?n[0]+" travels":"";}catch(e){return "";}})();
  if($("page-lector"))topic("lxGuide","Lector: your apps read, your documents written",[
    ["It reads, then writes.","Lector reads one of your apps or a long document from end to end, thinks aloud as it goes, and writes the documents you need from it: a dossier, a portfolio piece, a cover letter, an appendix. It works on this device, or with your other computer's model when you have linked one."],
    carried?["Your apps, carried inside.",carried+" inside Ingenium and are kept on this device on its first start, each checked against its fingerprint. A newer copy you add yourself always stays."]:null,
    W.IngRecipe?["The recipe.","Measure opens each of your apps in a frame that refuses every request to another address and reads its figures; Check then finds the figures an update has changed in your own words, and Update changes your Word file itself, keeping the version before."]:null,
    ["The model, and a second pass.","Lector names the model it will use and says when a larger one is ready on this device. Examine each section, on by default, strikes or marks what the material does not support."],
    ["Your sources, cited.","With Cite my sources on, Lector cites the sources kept in Fontes, numbered, and ends with a References list in your chosen style; no source that is not yours is ever invented."]].filter(Boolean));
  if($("page-fabrica"))topic("fbGuide","Fabrica: your apps as repositories",[
    ["Every version kept.","Fabrica keeps each of your apps as a real git repository on this device: every version, line by line, with branches, tags and undo by a new version. Nothing leaves the device unless you send it."],
    ["The tree.","Its header shows the open app as a tree: main the trunk, each idea a branch, each release a collar. Press a version to see what it changed, in the panels below."],
    ["Test and ship.","Test runs the app's own checks; Ship makes the one-page app, the web app and the installers from the version you choose. Checks reads each version for secrets left in the code, the parts it uses and their licences."],
    ["Your publishing name.","Each time Fabrica makes a Mac, Windows or web app or build kits, it asks \u201cPublish it as\u2026\u201d, the name kept so far on a raised plate, with where it shows: publish as it is, with a new name, or with no name. Don't ask me again stops the asking. The Ship part and Download as an app show the name on the same \u201cPublished as\u201d plate; its Change edits the name and that choice."],
    ["From Chat and Code.","Chat's app card and a Code session on an app have Keep in Fabrica: the page, or the project's files, is kept here as a new app or a new version, ready to test and to ship. Code's start window opens an app from Fabrica (From Fabrica), and the + menu sends an app's page with your message."],
    ["On this computer.","In the Mac and Windows apps, On this computer opens every repository on your drives, and you work on it right there."],
    ["GitHub, when you want it.","Sign in on GitHub's own page, or with a token, and each repository can be sent to GitHub and brought back, version for version. Without a token, Fabrica works entirely on this device."]]);
  if($("page-tabula"))topic("appsGuide","The apps, as in Carpe Diem",[
    ["Five apps, whole.","Tabula (writing), Abacus (tables), Imago (slides), Scriba (recordings and notes) and Fontes (sources). Each opens full width with the Desk bar at the top; Desk brings Ingenium back."],
    ["Floating windows.","The arrow on the side column floats an app into a window you can move, size from any edge or fill the screen with. Each floating window keeps a tab on the Desk bar: the minus folds it into its tab, the tab brings it back, and its cross closes it."],
    ["Long documents.","Tabula holds a thesis of 100,000 words."]]);
  if(W.IngOffline&&typeof W.IngOffline==="object")topic("opGuide","The Offline Project, made in Fabrica",[
    ["Brought in.","Fabrica's Bring one in offers it: all four apps, or without Inkwell, made from the copy of each app your library keeps now. It is then an app in Your apps beside the others, with its crest, versions and ships; making it again adds a version."],
    ["Open or save.","Bring one in's third choice opens its own card: each app's copy, Make and open, and Save the app, one file that opens on any device with no connection."],
    ["In your lists.","It is listed in Code's Your apps and the + menu's One of your apps, made fresh when chosen."],
    ["Its hall's words.","Edit its words in Code opens the hall's page as a project of its own; every making uses your words until you choose the hall Ingenium carries again."]],"fdGuide");
}catch(e){warn(e);}}

/* ---------- 3. Help, on the pages ---------- */
function help(){try{var H=W.IngHelp,P=H&&H.pages;if(!P)return;
  function add(pg,d){var p=P[pg];if(!p||!Array.isArray(p.dos)||p.dos.some(function(x){return x&&x[0]===d[0];}))return;p.dos.push(d);}
  add("chat",["Choose who answers, from any page","The top bar's model key: a model on this device or a service you connected, and How it answers under it.","#activeModelPill"]);
  add("chat",["See and free the model's memory","The memory key in the message box opens Context: how full it is, and Compact now.",".ing-mem-pill"]);
  add("chat",["Use a slash command","Type / in the message box for the list of commands.","#chatInput"]);
  add("settings",["Connect a service","Settings opens on Connect a service: choose the service, paste its key, choose a model.","#waHero"]);
  if(W.IngOffline&&typeof W.IngOffline==="object")add("fabrica",["Make the Offline Project","Bring one in: The Offline Project, all four apps or without Inkwell; it is then kept in Your apps like any app.","#fbBring"]);
}catch(e){warn(e);}}

function boot(){tour();guide();help();}
try{guide();help();}catch(e){warn(e);}
/* the tour's cards once Ingenium has started (every module has added its own by then), and once more a moment later */
(function wait(n){if(W.__ingReady===true){try{boot();}catch(e){warn(e);}setTimeout(function(){try{var tc=D.getElementById("ingTour");if(tc&&!tc.hidden&&tc.offsetParent)return;tour();}catch(e){warn(e);}},2500);return;}if(n<240)setTimeout(function(){wait(n+1);},500);})(0);
W.IngTourUpdate={version:1,boot:boot};
})();
;try{window.__ingParts["p250"]="running";}catch(_){}
</script>
