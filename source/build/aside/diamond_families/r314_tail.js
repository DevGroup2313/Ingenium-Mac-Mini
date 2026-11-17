
/* ---------- Settings, Everyday: "The diamond on Adamas" ---------- */
function card(){if(D.getElementById("dmcCard"))return D.getElementById("dmcCard");var pg=D.getElementById("page-settings");if(!pg)return null;
  var c=mk("section","card");c.id="dmcCard";c.setAttribute("aria-labelledby","dmcCardH");var h2=mk("h2","sec");h2.id="dmcCardH";var ic=mk("span","st-ic");ic.setAttribute("aria-hidden","true");ic.innerHTML=KEYGEM;h2.appendChild(ic);h2.appendChild(D.createTextNode("The diamond on Adamas"));c.appendChild(h2);
  c.appendChild(mk("p","small muted","The diamond at the head of Adamas: its stone, from a family of gemstones or a colour of your own, in four shades (by the hour, pastel, medium, deep) with a night shade of its own for the night theme; the northern lights behind it take its colour; the holder's band; the light that passes through it. The same choices open from the small diamond key in the corner of Adamas's head."));
  var P=panel("settings");P.keep=true;c.appendChild(P.el);
  var place=null;try{place=pg.querySelector("#rmP-settings-everyday");}catch(e){}
  if(place)place.appendChild(c);else pg.appendChild(c);return c;}
/* the line a tile in Settings shows for it (modules/r313.js) */
function says(){var d=get(),a=(d.fam==="own"?"Your colour":famName(d.fam))+", "+shadeName(d.shade).toLowerCase();
  return [a,"band: "+(d.band?nameOf(d.band).replace(/ \(#.*$/,""):"Ingenium's violet"),"light "+(d.light?"on":"off")].join(" · ");}

function boot(){try{card();}catch(e){}try{apply();}catch(e){}}
var og=W.go;if(typeof og==="function")W.go=function(p){var r=og.apply(this,arguments);try{if(p==="build")setTimeout(function(){addKey();apply();},30);else if(HP)closeHead(false);}catch(e){}return r;};
function watchHead(){var pg=D.getElementById("page-build");if(!pg||pg.__dmcW)return;pg.__dmcW=1;try{new MutationObserver(function(){if(head()&&!D.getElementById("bdColours")){addKey();apply();}}).observe(pg,{childList:true});}catch(e){}if(head())addKey();}
if(D.readyState==="loading")D.addEventListener("DOMContentLoaded",function(){setTimeout(function(){boot();watchHead();},0);});else setTimeout(function(){boot();watchHead();},0);
D.addEventListener("visibilitychange",function(){if(!D.hidden){try{apply();paintAll();}catch(e){}}});
W.IngDiamondColours={says:says,get:get,set:set,reset:reset,open:openHead,close:function(){closeHead(false);},show:showOnAdamas,
  families:function(){return FAMS.map(function(f){return {key:f[0],name:f[1]};});},shades:function(){return SHADES.map(function(s){return {key:s[0],name:s[1]};});},
  family:function(f,own){return famObj(f||get().fam,own||get().own);},drawn:function(f,own,i){return shadeSrc(f,own,i);},
  jewels:function(){return JEWELS.map(function(j){return {name:j[0],hex:j[1]};});},apply:apply,card:card,stone:function(k,i){return stone(k,i);},holder:function(b,i){return holderImg(b,i);},
  layout:function(o){if(o){var was=!!HP;if(was)closeHead(false);if(o.key)LAYOUT.key=o.key;if(o.place)LAYOUT.place=o.place;addKey();if(was)openHead();}return {key:LAYOUT.key,place:LAYOUT.place};}};
})();
