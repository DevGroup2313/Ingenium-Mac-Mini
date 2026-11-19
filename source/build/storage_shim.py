"""6.8.1 (27 October 2026): an edition other than the owner's keeps its storage under its own name.

The owner's words: "Please make sure that all of my handdrawn signatures samples and personal informations are also removed
from the apps ribbons of Ingenium and the Forge's demos. I want my personal information protected and not featured on the
demos."

Nothing of hers is written into a demo, gift or full edition (editions.py), but a browser keeps one store for every page of
one address, and every GitHub Pages site of one account shares one address. So a demo opened on her own device read what
her own copy keeps there: Tabula's, Abacus's and Imago's signatures, marks, letterheads and documents (under the names
Carpe Diem gives them, cd_signatures_v1 and the rest), and Ingenium's own state. In those editions this script runs before
any other, in the page and in each app's frame, and puts every name it stores under a prefix of its own ("ing-demo:" and so
on), in localStorage and in IndexedDB; a storage event from another copy is not passed on as one of its own. The owner's
master edition stores as before, so nothing of hers moves.

7.45, the full edition only: when its owner asks (modules/r332.js; her words, 19 November 2026, "I don't want my data and my past chats to
be lost when I replace my master edition of Ingenium with the new Full edition on my HP laptop ... Please allow for my data to be
transferred to this new one"), it takes the master edition's stores at this address as its own: the flag "ing.carry.v1" (kept under its
own prefix) says "adopt", and from the next load this script passes the master's names through unchanged, as the master does, while the
other editions' prefixed stores stay out of sight. Nothing is copied, so nothing can be half copied, and what is sealed stays sealed with
the same sign-in. window.__ingOwnStore keeps the store's own functions for r332 (whether this copy is fresh, the master's names).

shim(edition) -> the <script> to place first in <head>, or "" for the master edition."""


def shim(edition):
    if edition == "master":
        return ""
    p = "ing-" + edition + ":"
    adopt = "true" if edition == "full" else "false"
    js = r"""(function(){var P="%s",X=/^ing-[a-z]+:/,A=false;
try{if(%s)A=/"how":"adopt"/.test(Storage.prototype.getItem.call(window.localStorage,P+"ing.carry.v1")||"");}catch(e){}
var Q=A?"":P;
try{var LS=window.localStorage,SP=Storage.prototype,g=SP.getItem,s=SP.setItem,r=SP.removeItem,k=SP.key,c=SP.clear,ld=Object.getOwnPropertyDescriptor(SP,"length");
  function mine(x){return A?!X.test(x):x.indexOf(P)===0;}
  function own(){var o=[],n=ld.get.call(LS);for(var i=0;i<n;i++){var x=k.call(LS,i);if(x!=null&&mine(x))o.push(x);}return o;}
  SP.getItem=function(n){return this===LS?g.call(this,Q+n):g.call(this,n);};
  SP.setItem=function(n,v){return this===LS?s.call(this,Q+n,v):s.call(this,n,v);};
  SP.removeItem=function(n){return this===LS?r.call(this,Q+n):r.call(this,n);};
  SP.key=function(i){if(this!==LS)return k.call(this,i);var x=own()[i];return x==null?null:x.slice(Q.length);};
  SP.clear=function(){if(this!==LS)return c.call(this);own().forEach(function(x){r.call(LS,x);});};
  Object.defineProperty(SP,"length",{configurable:true,enumerable:true,get:function(){return this===LS?own().length:ld.get.call(this);}});
  var kd=Object.getOwnPropertyDescriptor(StorageEvent.prototype,"key");
  Object.defineProperty(StorageEvent.prototype,"key",{configurable:true,enumerable:true,get:function(){var v=kd.get.call(this);if(this.storageArea!==LS||v==null)return v;return mine(v)?v.slice(Q.length):"\u0000another copy";}});
}catch(e){}
try{var F=IDBFactory.prototype,o=F.open,d=F.deleteDatabase,dbs=F.databases;
  F.open=function(n,v){return v===undefined?o.call(this,Q+n):o.call(this,Q+n,v);};
  F.deleteDatabase=function(n){return d.call(this,Q+n);};
  if(dbs)F.databases=function(){return dbs.call(this).then(function(l){return l.filter(function(x){return mine(x.name);}).map(function(x){return {name:x.name.slice(Q.length),version:x.version};});});};
}catch(e){}
try{window.__ingOwnStore={P:P,adopted:A,fresh:g.call(LS,P+"ingenium_v4")==null,
  rawGet:function(n){return g.call(LS,n);},rawSet:function(n,v){return s.call(LS,n,v);},rawRemove:function(n){return r.call(LS,n);},
  rawKeys:function(){var a=[],n=ld.get.call(LS);for(var i=0;i<n;i++){var x=k.call(LS,i);if(x!=null)a.push(x);}return a;}};}catch(e){}})();""" % (p, adopt)
    return '<script id="ing-own-store">' + js + "</script>"
