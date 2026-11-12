<style id="r285-css">
/* ============ R285 · FABRICA: RULES BEFORE MAIN, SAFETY ON EVERY VERSION, WHAT CHANGED WHILE YOU WERE AWAY (Ingenium 6.91, 12 November 2026) ============
   Her words, on the preview of phase 2's second stage (https://claude.ai/artifact/VNwsz2ywj3XkXaCq8gws1o, version 4, with the pieces of
   commit 9287840): "I approve of the preview, please push it everywhere." As the preview drew them, in Fabrica's own parts:
   - Rules before main, in Care, Settings: Only through a pull request (no version goes straight into main), Your review first (main
     waits for an approval), The checks pass first (Fabrica's checks on the pull request's newest version), Kept versions stay as they are
     (no rewriting of main's history). Each a switch, off until she turns it on, kept with the repository. Fabrica holds to them on this
     computer: Keep this version, Bring it into main, a merge, a rebase, a branch moved backward or taken away are refused in plain words
     when a rule says so; a pull request's merge box says what main still waits for. A program other than Fabrica is not held by them,
     and the box says so.
   - Safety, on every version, in Care, Checks, beside Fabrica's five: no secrets left in the code (keys, tokens and private keys of the
     kinds whose form is known, read in every file each of the newest versions changed), the parts it uses and their licences (each
     part's notice read and named; the parts a manifest only names said as such), large files kept whole. Read on this computer, with
     nothing sent anywhere; kept with the version it read, and read again on asking.
   - What changed while you were away: a raised row above Your apps when something came that she did not make here (new versions on a
     branch, a new idea, a new release, an issue or a pull request someone else wrote in); its list in Ingenium's own look; a choice
     opens it; Mark all as read. What she does in Fabrica herself is never counted.
   Drawn with Fabrica's tokens and parts (--f-*, .h-box, .f-ck, .f-sw); nothing tilts or glows. */
#fb .r285-rules .r285-lead{font-size:13px;line-height:1.5;color:var(--f-ink2);margin:0 0 4px}
#fb .r285-rule{display:flex;align-items:center;justify-content:space-between;gap:12px;padding:9px 0;border-top:1px solid var(--f-hair)}
#fb .r285-rule b{display:block;font-weight:600;color:var(--f-ink1);font-size:13px}
#fb .r285-rule small{display:block;color:var(--f-ink3);font-size:12px}
#fb .r285-rule .f-sw{margin:0;flex:0 0 auto}
#fb .r285-need{margin:8px 0 0;font-size:12.5px;line-height:1.45;color:var(--f-warn)}
#fb .r285-need.ok{color:var(--f-ok)}
#fb .r285-safe .r285-rows{display:flex;flex-direction:column;gap:8px;margin-top:8px}
#fb .r285-safe .f-row{margin-top:10px}
#fb .r285-away{display:flex;align-items:center;gap:9px;width:calc(100% - 16px);margin:8px 8px 2px;padding:8px 11px;border:1px solid var(--f-hair);border-radius:12px;cursor:pointer;text-align:left;
  background:linear-gradient(var(--f-a),var(--f-b));box-shadow:var(--f-pill);color:var(--f-ink2);font:12.5px/1.3 var(--f-sans);transition:transform .16s cubic-bezier(.34,1.35,.64,1),box-shadow .2s;box-sizing:border-box}
#fb .r285-away[hidden]{display:none}
#fb .r285-away:hover{transform:translateY(-2px);box-shadow:var(--f-pophi)}
#fb .r285-away:active{transform:translateY(1px);box-shadow:var(--f-press);transition-duration:.06s}
#fb .r285-away:focus-visible{outline:2px solid var(--f-ring);outline-offset:2px}
#fb .r285-away svg{width:16px;height:16px;flex:0 0 auto;fill:none;stroke:var(--f-acc);stroke-width:1.8;stroke-linecap:round;stroke-linejoin:round}
#fb .r285-away b{color:var(--f-acc);font-weight:700}
#fb .r285-away i{margin-left:auto;font-style:normal;color:var(--f-ink3);font-size:15px}
#fb .r285-away.r285-read b{color:var(--f-ink2)}
#fb .r285-away.r285-read svg{stroke:var(--f-ink3)}
@media (prefers-reduced-motion:reduce){#fb .r285-away{transition:none}}
@media (forced-colors:active){#fb .r285-away{border:1px solid CanvasText}}
</style>
<script>try{(window.__ingParts=window.__ingParts||{})["p285"]="started";}catch(_){}
/* window.IngGuard {rules, prOk, mergeNote, safety, away, scan, state}: see the stylesheet above. */
(function r285(){
"use strict";
if(window.IngGuard||!window.IngRepo)return;
var W=window,D=document,IR=W.IngRepo;
function H(){return W.fbHub||null;}
function X(){return W.fbHubHost||null;}
function el(tag,cls,html){var e=D.createElement(tag);if(cls)e.className=cls;if(html!=null)e.innerHTML=html;return e;}
function esc(s){return String(s==null?"":s).replace(/[&<>"']/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c];});}
function toast(m){var x=X();if(x&&x.toast)x.toast(m);}
function fail(e){var x=X();if(x&&x.fail)x.fail(e);else toast(String(e&&e.message||e));}
function who(){try{var a=IR.author&&IR.author();if(a&&a.name)return a.name;}catch(e){}return "You";}
function keep(rec){var h=H();return h&&h.keep?Promise.resolve(h.keep(rec)):Promise.resolve();}
function live(id){var h=H();return h&&h.live?Promise.resolve(h.live(id)).catch(function(){return null;}):Promise.resolve(null);}
function list(anchor,groups,onPick){var k=W.IngDisk;if(k&&k.openList)return k.openList(anchor,groups,onPick);}
function plural(n,one,many){return n.toLocaleString("en-GB")+" "+(n===1?one:(many||one+"s"));}
function gb(n){n=+n||0;return n>=1e9?(n/1e9).toFixed(1)+" GB":n>=1e6?(n/1e6).toFixed(n>=1e8?0:1)+" MB":Math.max(1,Math.round(n/1e3))+" KB";}

/* ================= rules before main ================= */
var RULES=[["pr","Only through a pull request","no version goes straight into main"],["review","Your review first","main waits for an approval"],
  ["checks","The checks pass first","Fabrica's checks, on the pull request's newest version"],["keep","Kept versions stay as they are","no rewriting of main's history"]];
/* main as the hub names it (modules/r141.js, defBranch): the one GitHub named, else main, else master, else the first idea */
function mainOf(r,rec){var b=r&&r.branches||[];return (rec&&rec.defBranch&&b.indexOf(rec.defBranch)>=0)?rec.defBranch:b.indexOf("main")>=0?"main":b.indexOf("master")>=0?"master":(b[0]||r&&r.branch||"main");}
function anyOn(rs){return !!(rs&&(rs.pr||rs.review||rs.checks||rs.keep));}
function rules(r,rec,w){if(!r||!rec)return;var main=mainOf(r,rec),rs=rec.rules||{};
  var box=el("div","h-box h-blk r285-rules");box.id="hSetRules";box.innerHTML='<b class="h-big">Rules before main</b>';
  box.appendChild(el("p","r285-lead","What must be true before anything joins "+esc(main)+". Fabrica holds to them on this computer; a program other than Fabrica that writes to the repository is not held by them."));
  RULES.forEach(function(x){var row=el("div","r285-rule");row.setAttribute("data-rule",x[0]);row.innerHTML="<div><b>"+esc(x[1])+"</b><small>"+esc(x[2].replace("main",main))+"</small></div>";
    var lab=el("label","f-sw");lab.innerHTML='<input type="checkbox" aria-label="'+esc(x[1])+'"'+(rs[x[0]]?" checked":"")+">";row.appendChild(lab);
    lab.querySelector("input").onchange=function(){var on=this.checked;rec.rules=Object.assign({},rec.rules||{});rec.rules[x[0]]=on;keep(rec).then(function(){toast(x[1]+": "+(on?"on":"off")+", for "+main+".");},fail);};
    box.appendChild(row);});
  w.appendChild(box);}
function rulesOf(id){return live(id).then(function(rec){return {rules:rec&&rec.rules||{},rec:rec};});}
function lastReview(p){var k=null;(p.comments||[]).forEach(function(c){if(c.kind==="approve"||c.kind==="changes")k=c.kind;});return k;}
function refuse(m){var e=new Error(m);e.ingRule=true;return Promise.reject(e);}
/* what main still waits for, before this pull request joins it */
function waits(r,rec,p,info){var rs=rec&&rec.rules||{},main=mainOf(r,rec),need=[];if(!p||p.to!==main||!anyOn(rs))return Promise.resolve({need:need,on:false});
  if(rs.review&&lastReview(p)!=="approve")need.push("your approval");
  var head=info&&!info.__err&&info.fromOid;
  return (rs.checks?(head?IR.notes(r.id,head).then(function(n){return n&&n.test&&n.test.ok;},function(){return false;}):Promise.resolve(false)):Promise.resolve(true)).then(function(passed){
    if(!passed)need.push("the checks to pass on "+p.from+"'s newest version");return {need:need,on:true};});}
function prOk(r,rec,p,info){return waits(r,rec,p,info).then(function(x){if(!x.need.length)return;
  return refuse(mainOf(r,rec)+" waits for "+x.need.join(" and ")+" (Rules before main)."+(x.need.some(function(t){return /checks/.test(t);})?" Run them in Care, Checks, on "+p.from+".":""));});}
function mergeNote(r,rec,p,box,mg,info){if(!p||p.state!=="open"||!mg)return;waits(r,rec,p,info).then(function(x){if(!x.on||!box.isConnected)return;
  var n=el("p","r285-need"+(x.need.length?"":" ok"));n.textContent=x.need.length?"Rules before main: "+mainOf(r,rec)+" waits for "+x.need.join(" and ")+".":"Rules before main: everything "+mainOf(r,rec)+" waits for is here.";
  box.appendChild(n);if(x.need.length){mg.disabled=true;mg.title=n.textContent;}});}
/* the rules, asked before each of Fabrica's own writes that could bring a version into main or take one from it */
function guard(kind,id,args){return rulesOf(id).then(function(x){var rs=x.rules;if(!anyOn(rs))return null;
  return IR.info(id).then(function(s){var main=mainOf(s,x.rec),onMain=!s.detached&&s.branch===main,pr=W.__ingPrMerge===id;
    if(kind==="commit"&&rs.pr&&onMain&&!s.merging)return refuse(main+" takes new versions only through a pull request (Rules before main): keep this on an idea of its own, then open a pull request.");
    if(kind==="revert"&&rs.pr&&onMain)return refuse(main+" takes new versions only through a pull request (Rules before main): undo it on an idea of its own, then open a pull request.");
    if((kind==="merge"||kind==="rebase")&&rs.pr&&onMain&&!pr)return refuse(main+" takes versions only through a pull request (Rules before main): open a pull request for this idea, and merge it there.");
    if(kind==="delBranch"&&rs.keep&&String(args[1]||"")===main)return refuse(main+" stays, with every version it holds (Rules before main: kept versions stay as they are).");
    if(kind==="setRef"&&rs.keep){var nm=String(args[1]||""),k=/^refs\//.test(nm)?nm:"refs/heads/"+nm,to=String(args[2]||"");if(k!=="refs/heads/"+main||!/^[0-9a-f]{40}$/.test(to))return null;
      return IR.resolve(id,k).then(function(old){if(!old||old===to)return null;return IR.log(id,{ref:to,max:20000}).then(function(l){if(l.some(function(c){return c.oid===old;}))return null;
        return refuse(main+" would lose versions it holds, so it was not moved (Rules before main: kept versions stay as they are).");});},function(){return null;});}
    return null;});});}
/* Fabrica's own writes: held to the rules (each a refusal in plain words), and followed, so that what she does here is never news to her */
var REFS={delBranch:"h",setRef:"r",branch:"h",tag:"t",delTag:"t"};
function named(k,args){var t=REFS[k],nm=String(args[1]||"");if(!t||!nm)return [];return [t==="h"?"refs/heads/"+nm:t==="t"?"refs/tags/"+nm:(/^refs\//.test(nm)?nm:"refs/heads/"+nm)];}
["commit","merge","rebase","revert","delBranch","setRef","branch","tag","delTag"].forEach(function(k){var f=IR[k];if(typeof f!=="function")return;var held=k!=="branch"&&k!=="tag"&&k!=="delTag";
  IR[k]=function(id){var args=arguments,names=named(k,args);begin(id);
    return (held?guard(k,id,args):Promise.resolve()).then(function(){return f.apply(IR,args);}).then(function(v){end(id,names);return v;},function(e){end(id,names);throw e;});};});

/* ================= safety, on every version ================= */
var SECRETS=[["an AWS access key",/\b(?:AKIA|ASIA)[0-9A-Z]{16}\b/],["a GitHub token",/\bgh[pousr]_[A-Za-z0-9]{36,255}\b/],["a GitHub token",/\bgithub_pat_[A-Za-z0-9_]{22,255}\b/],
  ["a Slack token",/\bxox[baprs]-[A-Za-z0-9-]{10,}\b/],["a Google API key",/\bAIza[0-9A-Za-z_\-]{35}\b/],["a Stripe live key",/\b[rs]k_live_[0-9a-zA-Z]{20,}\b/],
  ["an Anthropic key",/\bsk-ant-[A-Za-z0-9_\-]{20,}\b/],["an OpenAI key",/\bsk-(?:proj-)?[A-Za-z0-9_\-]{32,}\b/],["a Hugging Face token",/\bhf_[A-Za-z0-9]{30,}\b/],
  ["a private key",/-----BEGIN (?:RSA |EC |DSA |OPENSSH |PGP |ENCRYPTED )?PRIVATE KEY(?: BLOCK)?-----/]];
var ENVLINE=/^\s*(?:export\s+)?[A-Za-z0-9_]*(?:PASSWORD|PASSWD|SECRET|TOKEN|API_?KEY)[A-Za-z0-9_]*\s*[=:]\s*["']?([^\s"'#]{8,})/i;
var TEXTP=/\.(md|markdown|txt|text|rst|js|mjs|cjs|ts|tsx|jsx|json|jsonc|html?|css|scss|less|py|rb|go|rs|java|kt|swift|c|h|cc|cpp|hpp|cs|php|sh|bash|zsh|bat|cmd|ps1|ya?ml|toml|ini|cfg|conf|xml|plist|properties|gradle|sql|lua|dart|vue|svelte|env|pem|key|tf|tfvars)$/i;
function texty(p){var n=p.split("/").pop();return TEXTP.test(n)||/^\.env(\..*)?$/i.test(n)||/^(Dockerfile|Makefile|Procfile|\.npmrc|\.netrc|\.pypirc|credentials|config)$/i.test(n);}
function mask(v){v=String(v);if(/^-----BEGIN/.test(v))return "";return v.length<=8?v.slice(0,2)+"…":v.slice(0,4)+"…"+v.slice(-2);}
/* what an environment file's example holds in place of a value */
var PLACE=/^(\$\{?|<|%|\{\{)|^(your|change|replace|placeholder|dummy|example|sample|xxx|redacted|insert|enter)|^(none|null|nil|todo|test|secret|password|token|undefined|false|true|empty)$/i;
var LICS=[["MIT",/Permission is hereby granted, free of charge/i],["Apache 2.0",/Apache License[\s\S]{0,200}Version 2\.0/i],
  ["BSD 3-Clause",/Redistribution and use in source and binary forms[\s\S]*Neither the name/i],["BSD 2-Clause",/Redistribution and use in source and binary forms/i],
  ["AGPL",/GNU AFFERO GENERAL PUBLIC LICENSE/i],["LGPL",/GNU LESSER GENERAL PUBLIC LICENSE/i],["GPL 3",/GNU GENERAL PUBLIC LICENSE[\s\S]{0,200}Version 3/i],["GPL 2",/GNU GENERAL PUBLIC LICENSE[\s\S]{0,200}Version 2/i],
  ["MPL 2.0",/Mozilla Public License,?\s*(?:Version|v\.?)\s*2\.0/i],["ISC",/Permission to use, copy, modify, and\/or distribute this software for any purpose/i],
  ["the Unlicense",/This is free and unencumbered software released into the public domain/i],["CC0 1.0",/CC0 1\.0/i],["zlib",/This software is provided ['‘]as-is['’]/i]];
function licOf(t){for(var i=0;i<LICS.length;i++)if(LICS[i][1].test(t))return LICS[i][0];return null;}
function spdx(id){id=String(id||"").replace(/[^\w.\-+]/g,"");var m={"MIT":"MIT","Apache-2.0":"Apache 2.0","BSD-3-Clause":"BSD 3-Clause","BSD-2-Clause":"BSD 2-Clause","ISC":"ISC","MPL-2.0":"MPL 2.0","GPL-3.0":"GPL 3","GPL-2.0":"GPL 2","LGPL-3.0":"LGPL","LGPL-2.1":"LGPL","Unlicense":"the Unlicense","CC0-1.0":"CC0 1.0","Zlib":"zlib"};
  return m[id]||m[id.replace(/-(only|or-later)$/,"")]||id||null;}
function st(){return IR.core.store();}
/* a file's text, unless it is larger than the limit or is not text (a zero byte in its first 8,000) */
function textOf(oid,limit){return st().need(oid,"blob").then(function(o){var b=o.body;if(limit&&b.length>limit)return {big:true};var n=Math.min(b.length,8000);for(var i=0;i<n;i++)if(b[i]===0)return {bin:true};
  return {t:new TextDecoder().decode(b)};},function(){return {gone:true};});}
function textOfOid(oid){return textOf(oid,0).then(function(x){return x.t==null?null:x.t;});}
function treeEnts(oid){return oid?st().need(oid,"tree").then(function(o){return IR.core.parseTree(o.body);}):Promise.resolve([]);}
/* the files a version changed against the one before it: only the folders that differ are opened */
function changed(a,b,pre,out){if(a===b)return Promise.resolve(out);return Promise.all([treeEnts(a),treeEnts(b)]).then(function(x){var A={},jobs=[];x[0].forEach(function(e){A[e.name]=e;});
  x[1].forEach(function(e){var o=A[e.name],p=pre+e.name;if(o&&o.oid===e.oid)return;var dir=e.mode==="40000"||e.mode==="040000";if(e.mode==="160000")return;
    if(dir)jobs.push(changed(o&&(o.mode==="40000"||o.mode==="040000")?o.oid:null,e.oid,p+"/",out));else out.push({path:p,oid:e.oid});});
  return Promise.all(jobs).then(function(){return out;});});}
var CACHE=new Map();
var VEND=/(^|\/)(vendor|vendors|third[_-]?party|external|libs?|assets\/lib)\//i;
/* the folder a notice covers: a file inside it, at any depth, is that part's */
function coveredBy(dirs,path){var p=path;while(p.indexOf("/")>0){p=p.replace(/\/[^/]+$/,"");if(dirs[p])return dirs[p];}return null;}
function scan(r,again){var key=r.id+"|"+r.head;if(!again&&CACHE.has(key))return CACHE.get(key);
  var t0=Date.now(),LIM={versions:100,blobs:4000,bytes:40*1048576,ms:30000,one:1048576};
  var job=(again?Promise.resolve(null):IR.notes(r.id,r.head).then(function(n){return n&&n.safety&&n.safety.v===1?n.safety:null;},function(){return null;})).then(function(had){if(had)return had;
    return IR.log(r.id,{ref:r.head,max:LIM.versions}).then(function(log){var trees={},seen={},blobs=[],res={v:1,head:r.head,versions:log.length,read:0,skipped:0,secrets:[],parts:[],own:null,declared:[],large:[],at:Date.now()};
      log.forEach(function(c){trees[c.oid]=c.tree;});
      function parentTree(c){var p=c.parents&&c.parents[0];if(!p)return Promise.resolve(null);if(trees[p])return Promise.resolve(trees[p]);
        return st().need(p,"commit").then(function(o){return IR.core.parseCommit(o.body).tree;},function(){return null;});}
      /* every text file each of the newest versions changed, newest first; a file's content read once, however many versions hold it */
      return log.reduce(function(pr,c){return pr.then(function(){if(Date.now()-t0>LIM.ms)return;return parentTree(c).then(function(pt){return changed(pt,c.tree,"",[]);}).then(function(ch){
          ch.forEach(function(f){if(seen[f.oid]||!texty(f.path))return;seen[f.oid]=1;blobs.push({path:f.path,oid:f.oid,v:c.short});});});});},Promise.resolve())
      .then(function(){var bytes=0,had={};return blobs.reduce(function(pr,b,i){return pr.then(function(){if(i>=LIM.blobs||bytes>=LIM.bytes||Date.now()-t0>LIM.ms){res.skipped++;return;}
          return textOf(b.oid,LIM.one).then(function(x){if(x.big){res.skipped++;return;}if(x.t==null)return;var t=x.t;res.read++;bytes+=t.length;
            var ls=t.split("\n"),nm=b.path.split("/").pop(),env=/^\.env(\.|$)|\.env$/i.test(nm)&&!/\.(example|sample|template|dist|defaults?)$/i.test(nm);
            for(var k=0;k<ls.length&&res.secrets.length<50;k++){var L=ls[k],hit=null;if(L.length>4000)L=L.slice(0,4000);
              for(var j=0;j<SECRETS.length;j++){var m=SECRETS[j][1].exec(L);if(m){hit=[SECRETS[j][0],m[0]];break;}}
              if(!hit&&env){var e=ENVLINE.exec(L);if(e&&!PLACE.test(e[1]))hit=["a password or key in an environment file",e[1]];}
              if(!hit)continue;var hk=hit[0]+"|"+b.path+"|"+hit[1];if(had[hk])continue;had[hk]=1;
              res.secrets.push({kind:hit[0],path:b.path,line:k+1,v:b.v,mask:mask(hit[1])});}});});},Promise.resolve());})
      /* the newest version's files: the parts made by others it keeps, its own licence, the parts a manifest names, its large files */
      .then(function(){return IR.files(r.id,r.head).then(function(fs){var dirs={},LICF=/(^|\/)(LICEN[CS]E|COPYING|NOTICE)([.\-_][A-Za-z0-9.\-_]+)?$/i;
          var lic=fs.filter(function(f){return LICF.test(f.path)&&(f.size==null||f.size<262144);}).slice(0,400);
          var minis=fs.filter(function(f){return (/\.min\.(js|css)$/i.test(f.path)||(VEND.test(f.path)&&/\.(js|mjs|css)$/i.test(f.path)))&&!/(^|\/)node_modules\//.test(f.path)&&(f.size==null||f.size<8*1048576);}).slice(0,200);
          fs.forEach(function(f){if(f.size!=null&&f.size>48*1048576)res.large.push({path:f.path,size:f.size});});
          var mf=fs.filter(function(f){return /(^|\/)(package\.json|requirements\.txt|Podfile|go\.mod|Cargo\.toml|Gemfile|composer\.json)$/.test(f.path)&&!/(^|\/)node_modules\//.test(f.path)&&(f.size==null||f.size<1048576);}).slice(0,20);
          return Promise.all(lic.map(function(f){return textOfOid(f.oid).then(function(t){var d=f.path.indexOf("/")<0?"":f.path.replace(/\/[^/]+$/,"");var name=t?licOf(t):null;
              if(!d){if(!/NOTICE/i.test(f.path)&&(name||!res.own))res.own=name||"in its own words";return;}
              if(!dirs[d]||name)dirs[d]={dir:d,lic:name||(dirs[d]&&dirs[d].lic)||null};});}))
            .then(function(){return Promise.all(minis.map(function(f){if(coveredBy(dirs,f.path))return null;
              return st().need(f.oid,"blob").then(function(o){var t=new TextDecoder().decode(o.body.subarray(0,4096)),m=/SPDX-License-Identifier:\s*([^\s*]+)/.exec(t)||/@license\s+([^\s*]+)/i.exec(t);
                var nm=m?spdx(m[1]):licOf(t),banner=/\(c\)|©|copyright/i.test(t);
                /* a file of her own build (outside a folder of parts, with no notice in it) is not a part made by others */
                if(!nm&&!banner&&!VEND.test(f.path))return;dirs[f.path]={dir:f.path,lic:nm};},function(){return null;});}));})
            .then(function(){return Promise.all(mf.map(function(f){return textOfOid(f.oid).then(function(t){if(t==null)return;var n=0,kind=f.path.split("/").pop();
                try{if(kind==="package.json"){var j=JSON.parse(t);n=Object.keys(j.dependencies||{}).length+Object.keys(j.devDependencies||{}).length;}
                  else if(kind==="requirements.txt")n=t.split("\n").filter(function(l){return l.trim()&&!/^\s*[#-]/.test(l);}).length;
                  else if(kind==="Podfile")n=(t.match(/^\s*pod\s+['"]/gm)||[]).length;else if(kind==="go.mod")n=(t.match(/^\s+[\w.\-]+\/[\w.\-/]+\s+v/gm)||[]).length;
                  else if(kind==="Gemfile")n=(t.match(/^\s*gem\s+['"]/gm)||[]).length;else if(kind==="Cargo.toml"){var sec=/\[dependencies\]([\s\S]*?)(\n\[|$)/.exec(t);n=sec?sec[1].split("\n").filter(function(l){return /^\s*[\w\-]+\s*=/.test(l);}).length:0;}
                  else if(kind==="composer.json"){var c2=JSON.parse(t);n=Object.keys(c2.require||{}).length;}}catch(e){}
                if(n)res.declared.push({path:f.path,n:n});});}));})
            .then(function(){res.parts=Object.keys(dirs).sort().map(function(k){return dirs[k];});return res;});});})
      .then(function(res){return Promise.resolve(IR.setNote(r.id,r.head,"safety",res)).catch(function(){}).then(function(){return res;});});});});
  CACHE.set(key,job);job.catch(function(){CACHE.delete(key);});if(CACHE.size>16)CACHE.delete(CACHE.keys().next().value);return job;}
function row(state,mark,title,small){var e=el("div","f-ck "+state);e.innerHTML='<span class="m">'+mark+"</span><div>"+esc(title)+"<small>"+esc(small)+"</small></div>";return e;}
function safety(r,rec,w){if(!r||!r.head)return;var box=el("div","h-box h-blk r285-safe");box.id="hSafety";box.innerHTML='<b class="h-big">Safety, on every version</b>Read on this computer, with nothing sent anywhere.';
  var rows=el("div","r285-rows");rows.appendChild(row("run","…","Reading the newest versions…","its files, the parts it uses, its large files"));box.appendChild(rows);
  var keys=el("div","f-row"),again=el("button","f-btn sm","Read it again");again.type="button";again.onclick=function(){again.disabled=true;paint(true);};keys.appendChild(again);box.appendChild(keys);w.appendChild(box);
  function paint(fresh){scan(r,fresh).then(function(res){if(!box.isConnected)return;rows.innerHTML="";again.disabled=false;
      var s=res.secrets,read=plural(res.read,"file")+" read"+(res.skipped?", "+plural(res.skipped,"file")+" left unread, too large or past what one reading holds":"");
      if(!s.length)rows.appendChild(row("ok","✓","No secrets left in the code","no key, token or password of a known form in "+(res.versions>1?"the "+res.versions+" newest versions":"this version")+" ("+read+")"));
      else rows.appendChild(row("warn","!",plural(s.length,"possible secret")+" left in the code",s.slice(0,3).map(function(x){return x.kind+(x.mask?" ("+x.mask+")":"")+" in "+x.path+", line "+x.line+", version "+x.v;}).join("\n")+
        (s.length>3?"\nand "+(s.length-3)+" more":"")+"\nA secret stays in the history even when taken out of the newest version: make a new key where the old one was made, and stop the old one there."));
      var parts=res.parts,by={},named=parts.filter(function(p){return p.lic;}),nolic=parts.filter(function(p){return !p.lic;}),dec=res.declared.reduce(function(a,d){return a+d.n;},0);
      named.forEach(function(p){by[p.lic]=(by[p.lic]||0)+1;});
      var words=(parts.length?plural(parts.length,"part")+" made by others kept in it"+(named.length?": "+Object.keys(by).sort().map(function(k){return by[k]+" under "+k;}).join(", "):"")+(nolic.length?(named.length?"; ":": ")+nolic.length+" whose licence Fabrica could not name":""):"no part made by others kept in it")+
        (res.own?"; its own licence: "+res.own:"; no licence of its own")+(dec?"; "+plural(dec,"more part")+" named in "+res.declared.map(function(d){return d.path;}).join(", ")+", fetched when it is built, their licences not kept in the repository":"");
      rows.appendChild(row(nolic.length?"warn":"ok",nolic.length?"!":"✓","The parts it uses, and their licences",words+(nolic.length?"\nFabrica could not name the licence of: "+nolic.slice(0,4).map(function(p){return p.dir;}).join(", ")+(nolic.length>4?", and "+(nolic.length-4)+" more":""):"")));
      rows.appendChild(row("ok","✓","Large files kept whole",res.large.length?res.large.slice(0,4).map(function(f){return f.path+", "+gb(f.size);}).join("; ")+(res.large.length>4?"; and "+(res.large.length-4)+" more":"")+", each kept whole in every version that holds it":"no file over 48 MB in this version"));
      box.setAttribute("data-head",res.head);},function(e){if(!box.isConnected)return;rows.innerHTML="";again.disabled=false;rows.appendChild(row("warn","!","It could not be read",String(e&&e.message||e)));});}
  paint(false);}

/* ================= what changed while you were away ================= */
var AW={busy:false,at:0,items:[],sig:"",justRead:false};
function F(){var x=X();return x&&x.FBS?x.FBS():null;}
function snapOf(f){if(!f.away||typeof f.away!=="object"||f.away.v!==2)f.away={v:2,repos:{}};return f.away;}
function short(o){return String(o||"").slice(0,12);}
function refsNow(r){if(r.disk&&r.disk.away)return Promise.reject(new Error("the drive is not connected"));
  var names=(r.branches||[]).map(function(b){return "refs/heads/"+b;}).concat((r.tags||[]).map(function(t){return "refs/tags/"+t;}));
  return Promise.all(names.map(function(k){return IR.resolve(r.id,k).then(function(o){return [k,o];},function(){return [k,null];});})).then(function(x){var m={},n=0;x.forEach(function(p){if(p[1]){m[p[0]]=short(p[1]);n++;}});
    if(names.length&&!n)throw new Error("it could not be read");return m;});}
/* what others brought to an issue or a pull request: the item when they opened it, and each comment they wrote */
function itemsNow(id){var me=who();return live(id).then(function(rec){var m={};if(!rec)return m;(rec.issues||[]).concat(rec.pulls||[]).forEach(function(i){var o=0,last=null,opened=null;
    if(i.by&&i.by!==me){o++;opened=i.by;last=i.by;}(i.comments||[]).forEach(function(c){if(c.by&&c.by!==me){o++;last=c.by;}});
    m[(i.kind==="pr"?"p":"i")+i.n]={o:o,last:last,opened:opened,t:i.title,n:i.n,k:i.kind==="pr"?"pr":"issue"};});return m;});}
function stateOf(r){return Promise.all([refsNow(r),itemsNow(r.id)]).then(function(x){var items={};Object.keys(x[1]).forEach(function(k){items[k]=x[1][k].o;});return {refs:x[0],items:items,full:x[1]};});}
/* her own writes: while one runs the repository is not read for news; after it, the ideas and tags it changed are followed */
var HOLD={},TOUCH={},PEND={};
function begin(id){HOLD[id]=(HOLD[id]||0)+1;}
function end(id,names){HOLD[id]=Math.max(0,(HOLD[id]||0)-1);var p=PEND[id]||(PEND[id]={});if(names.length)names.forEach(function(k){p[k]=1;});else p["@here"]=1;
  clearTimeout(TOUCH[id]);TOUCH[id]=setTimeout(function(){follow(id);},300);}
function busyRepo(id){return !!(HOLD[id]||TOUCH[id]);}
function follow(id){if(HOLD[id]){TOUCH[id]=setTimeout(function(){follow(id);},300);return;}
  var f=F(),x=X(),ks=Object.keys(PEND[id]||{});delete PEND[id];var was=f?snapOf(f).repos[id]:null;
  (was&&was.refs?IR.info(id).then(function(s){var want={};ks.forEach(function(k){if(k==="@here"){if(!s.detached&&s.branch)want["refs/heads/"+s.branch]=1;}else want[k]=1;});
      return Promise.all(Object.keys(want).map(function(k){return IR.resolve(id,k).then(function(o){return [k,o];},function(){return [k,null];});})).then(function(got){
        got.forEach(function(p){if(p[1])was.refs[p[0]]=short(p[1]);else delete was.refs[p[0]];});if(x&&x.saveSoon)x.saveSoon();});}):Promise.resolve())
    .catch(function(){}).then(function(){delete TOUCH[id];AW.items=AW.items.filter(function(it){return !(it.id===id&&(it.kind==="versions"||it.kind==="idea"||it.kind==="release")&&ks.indexOf("refs/"+(it.kind==="release"?"tags/"+it.tag:"heads/"+it.branch))>=0);});
      AW.sig="";var box=D.getElementById("fbRepos");if(box&&box.isConnected)away(box);else draw();});}
function news(r,was,now){var out=[];
  return Object.keys(now.refs).sort().reduce(function(p,k){return p.then(function(){var o=was.refs[k],n=now.refs[k];if(o===n)return;var nm=k.replace(/^refs\/(heads|tags)\//,"");
      if(/^refs\/tags\//.test(k)){if(!o)out.push({kind:"release",id:r.id,repo:r.name,tag:nm,what:nm,tail:"kept as a release"});return;}
      if(!o){out.push({kind:"idea",id:r.id,repo:r.name,branch:nm,what:nm,tail:"a new idea"});return;}
      return IR.log(r.id,{ref:k,max:300}).then(function(l){var i=-1;for(var j=0;j<l.length;j++)if(l[j].oid.indexOf(o)===0){i=j;break;}
        out.push({kind:"versions",id:r.id,repo:r.name,branch:nm,from:i>=0?l[i].oid:null,what:nm,tail:i<0?"its versions written over":plural(i,"new version")});},function(){});});},Promise.resolve())
    .then(function(){Object.keys(now.full).sort().forEach(function(k){var a=now.full[k],b=was.items?was.items[k]:undefined;if(!a.o||!a.last||(b!=null&&a.o<=b))return;
      out.push({kind:a.k,id:r.id,repo:r.name,n:a.n,what:"#"+a.n+" "+a.t,tail:(b==null&&a.opened?a.opened+" opened it":a.last+" wrote")});});return out;});}
function compute(){var f=F(),x=X();if(!f||!x||!x.C||AW.busy)return Promise.resolve(AW.items);AW.busy=true;var sn=snapOf(f),rs=(x.C.repos||[]).slice(),found=[];
  return rs.reduce(function(p,r){return p.then(function(){if(busyRepo(r.id))return;return stateOf(r).then(function(now){if(busyRepo(r.id))return;var was=sn.repos[r.id];
      if(!was||!was.refs){sn.repos[r.id]={refs:now.refs,items:now.items};if(x.saveSoon)x.saveSoon();return;}
      return news(r,was,now).then(function(n){found=found.concat(n);});});}).catch(function(){});},Promise.resolve())
    .then(function(){AW.busy=false;AW.at=Date.now();var many={};found.forEach(function(it){many[it.id]=1;});var two=Object.keys(many).length>1;
      found.forEach(function(it){it.label=it.what+" · "+it.tail+(two?", in "+it.repo:"");});AW.items=found;if(found.length)AW.justRead=false;return found;},function(){AW.busy=false;return AW.items;});}
/* read: each repository's snapshot is what it holds now (one the drive cannot give now keeps its old one) */
function markRead(){var f=F(),x=X();if(!f||!x||!x.C)return Promise.resolve();var sn=snapOf(f);
  return Promise.all((x.C.repos||[]).map(function(r){return stateOf(r).then(function(now){sn.repos[r.id]={refs:now.refs,items:now.items};},function(){});})).then(function(){if(x.saveSoon)x.saveSoon();AW.items=[];AW.justRead=true;draw();});}
var ROW=null;
var BELL='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 16.5V11a6 6 0 0 1 12 0v5.5l1.5 2h-15z"/><path d="M10 20.5a2 2 0 0 0 4 0"/></svg>';
function draw(){if(!ROW)return;var n=AW.items.length;ROW.hidden=!n&&!AW.justRead;ROW.classList.toggle("r285-read",!n);
  var t=n?"<b>"+n+" new</b> while you were away":"<b>All read</b>",s=ROW.querySelector("span");if(s&&s.innerHTML!==t)s.innerHTML=t;ROW.setAttribute("data-n",String(n));}
/* a choice opens what it names: the versions that came, as a comparison; a new idea, against main; a release; an issue or a pull request */
function openItem(it){var x=X();if(!x)return;x.FBS().sel=it.id;x.S.home=false;x.S.appPg=false;if(x.saveSoon)x.saveSoon();
  Promise.resolve(x.refresh()).then(function(){var r=x.cur();if(!r||r.id!==it.id)return;var H2=H();
    if((it.kind==="issue"||it.kind==="pr")&&H2){x.paint();H2.open(it.kind==="pr"?"pulls":"issues",{n:it.n});return;}
    if(it.kind==="versions"&&it.from&&H2){x.paint();H2.open("compare",{a:it.from,b:"refs/heads/"+it.branch});return;}
    if(it.kind==="idea"&&H2){return live(r.id).then(function(rec){var m=mainOf(r,rec);x.paint();if(m===it.branch){x.S.view="ideas";x.paint();return;}H2.open("compare",{a:"refs/heads/"+m,b:"refs/heads/"+it.branch});});}
    x.S.view=it.kind==="release"?"releases":it.kind==="idea"?"ideas":"history";x.paint();}).catch(fail);}
function away(box){if(!box||!box.parentNode)return;if(!ROW){ROW=el("button","r285-away",BELL+"<span></span><i aria-hidden=\"true\">›</i>");ROW.type="button";ROW.id="fbAway";ROW.hidden=true;
    ROW.title="What changed while you were away";ROW.onclick=function(e){e.preventDefault();e.stopPropagation();var items=AW.items.slice();
      list(ROW,[{label:items.length?"While you were away":"",items:items.map(function(it){return {it:it,label:it.label};})},{label:"",items:[{read:true,label:items.length?"Mark all as read":"Nothing new since you looked"}]}],function(o){
        markRead();if(o.it)openItem(o.it);});};}
  if(ROW.parentNode!==box.parentNode||ROW.nextSibling!==box)box.parentNode.insertBefore(ROW,box);
  var x=X(),sig=(x&&x.C&&x.C.repos||[]).map(function(r){return r.id+":"+(r.head||"")+":"+(r.tags||[]).length+":"+(r.branches||[]).length;}).join(",");
  draw();if(sig===AW.sig&&Date.now()-AW.at<20000)return;AW.sig=sig;compute().then(draw);}

/* read again now, past the twenty seconds the row waits between readings */
function check(){AW.sig="";AW.at=0;var box=D.getElementById("fbRepos");return compute().then(function(){if(box&&box.isConnected)away(box);else draw();return AW.items.slice();});}
W.IngGuard={rules:rules,prOk:prOk,mergeNote:mergeNote,safety:safety,scan:scan,away:away,check:check,mainOf:mainOf,markRead:markRead,state:function(){return {items:AW.items.slice(),busy:AW.busy,cache:CACHE.size};}};
try{window.__ingParts["p285"]="running";}catch(_){}
})();
</script>
