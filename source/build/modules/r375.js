<script>try{(window.__ingParts=window.__ingParts||{})["p375"]="started";}catch(_){}
/* ============ R375 · CODE'S LIST IS OF SESSIONS; CHAT'S, OF CONVERSATIONS (Ingenium 7.77, 24 November 2026) ============
   Her question (24 November 2026): "I also want you rename the "Conversations" inside of the app to "Sessions" instead, or perhaps you
   could offer me some recommendations for the names for the chat pages". My recommendation: Conversations for Chat, Sessions for Code
   (Code already names a new one "New session" and has a Session column). Her answer: "I approve of your recommendations for the naming
   question."
   So on Code, the list and everything about it says sessions: the list (its name for a screen reader), its search ("Search sessions"),
   its hide key, the ☰ key's hint ("Show the list of sessions"), the conversations menu's heading, and the name asked when renaming
   ("Name this session"). Chat is unchanged. */
(function r375(){
"use strict";
if(window.__r375)return;window.__r375=1;
var W=window,D=document;
function code(){try{return !!(W.CC&&CC.mode==="code");}catch(e){return false;}}
function word(){return code()?"session":"conversation";}
function set(el,attr,v){if(!el)return;if(attr==="text"){if(el.textContent!==v)el.textContent=v;}else if(el.getAttribute(attr)!==v)el.setAttribute(attr,v);}
function paint(){var w=word(),W2=w.charAt(0).toUpperCase()+w.slice(1)+"s",s=D.getElementById("ccSide");
  if(s){set(s,"aria-label",W2);set(s.querySelector(".cc-search"),"placeholder","Search "+w+"s");set(s.querySelector(".cc-hide"),"aria-label","Hide the list of "+w+"s");}
  var sb=D.getElementById("ccSideBtn");set(sb,"title","Show the list of "+w+"s");set(sb,"aria-label","Show the list of "+w+"s");
  var mh=D.querySelector("#chatConvMenu .chat-menu-head");if(mh)set(mh,"text",W2);}
/* the name asked when renaming */
(function wrapPrompt(){var n=0;(function wait(){var o=W.ingPrompt;if(typeof o!=="function"){if(++n<240)setTimeout(wait,250);return;}if(o.__r375)return;
  var p=function(opts){try{if(code()&&opts&&opts.title==="Name this conversation")opts=Object.assign({},opts,{title:"Name this session"});}catch(e){}return o.apply(this,[opts].concat([].slice.call(arguments,1)));};
  p.__r375=1;try{ingPrompt=p;}catch(e){}W.ingPrompt=p;})();})();
var T=0;function soon(){if(T)return;T=setTimeout(function(){T=0;try{paint();}catch(e){}},40);}
try{new MutationObserver(function(rs){for(var i=0;i<rs.length;i++){var t=rs[i].target;if(t&&t.nodeType===1&&(t.id==="ccSide"||t.id==="chatCol"||t.id==="chatConvMenu"||(t.closest&&t.closest("#ccSide,#chatConvMenu,.chat-top")))){soon();return;}}})
  .observe(D.body||D.documentElement,{childList:true,subtree:true});}catch(e){}
setInterval(function(){try{var p=D.getElementById("page-chat");if(p&&p.classList.contains("active"))paint();}catch(e){}},1500);
W.IngSessionsWord={paint:paint,word:word};
})();
;try{window.__ingParts["p375"]="running";}catch(_){}
</script>
