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

shim(edition) -> the <script> to place first in <head>, or "" for the master edition."""


def shim(edition):
    if edition == "master":
        return ""
    p = "ing-" + edition + ":"
    js = r"""(function(){var P="%s";
try{var LS=window.localStorage,SP=Storage.prototype,g=SP.getItem,s=SP.setItem,r=SP.removeItem,k=SP.key,c=SP.clear,ld=Object.getOwnPropertyDescriptor(SP,"length");
  function own(){var o=[],n=ld.get.call(LS);for(var i=0;i<n;i++){var x=k.call(LS,i);if(x!=null&&x.indexOf(P)===0)o.push(x);}return o;}
  SP.getItem=function(n){return this===LS?g.call(this,P+n):g.call(this,n);};
  SP.setItem=function(n,v){return this===LS?s.call(this,P+n,v):s.call(this,n,v);};
  SP.removeItem=function(n){return this===LS?r.call(this,P+n):r.call(this,n);};
  SP.key=function(i){if(this!==LS)return k.call(this,i);var x=own()[i];return x==null?null:x.slice(P.length);};
  SP.clear=function(){if(this!==LS)return c.call(this);own().forEach(function(x){r.call(LS,x);});};
  Object.defineProperty(SP,"length",{configurable:true,enumerable:true,get:function(){return this===LS?own().length:ld.get.call(this);}});
  var kd=Object.getOwnPropertyDescriptor(StorageEvent.prototype,"key");
  Object.defineProperty(StorageEvent.prototype,"key",{configurable:true,enumerable:true,get:function(){var v=kd.get.call(this);if(this.storageArea!==LS||v==null)return v;return v.indexOf(P)===0?v.slice(P.length):"\u0000another copy";}});
}catch(e){}
try{var F=IDBFactory.prototype,o=F.open,d=F.deleteDatabase,dbs=F.databases;
  F.open=function(n,v){return v===undefined?o.call(this,P+n):o.call(this,P+n,v);};
  F.deleteDatabase=function(n){return d.call(this,P+n);};
  if(dbs)F.databases=function(){return dbs.call(this).then(function(l){return l.filter(function(x){return x.name.indexOf(P)===0;}).map(function(x){return {name:x.name.slice(P.length),version:x.version};});});};
}catch(e){}})();""" % p
    return '<script id="ing-own-store">' + js + "</script>"
