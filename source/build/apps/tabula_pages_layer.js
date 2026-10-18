(function(){
  if(window.__cdRealPagesOn) return; window.__cdRealPagesOn=true;
  var d=document;
  var css=[
    '.cd-realpaper{background:transparent !important;box-shadow:none !important;border-radius:0 !important;}',
    '.cd-realpaper>#docheader,.cd-realpaper>#toc,.cd-realpaper>#editor,.cd-realpaper>#footnotes,.cd-realpaper>#biblio,.cd-realpaper>#endnotes,.cd-realpaper>#docfooter{position:relative;z-index:1;}',
    '#pageguides .pg-sep{background:transparent !important;box-shadow:none !important;}',
    '#pageguides .pg-sep::after{display:none !important;}',
    '#pageguides .pg-num{transform:translateY(76px) !important;}',
    'body .canvas.cd-realcanvas{background:#cfd3d9 !important;}',
    'body .canvas.cd-realcanvas.cd-night{background:#171a20 !important;}',
    '#cd-pages{position:absolute;left:0;right:0;top:0;z-index:0;pointer-events:none;}',
    '.cd-page{position:absolute;left:0;right:0;background:#ffffff;border-radius:2px;'
      +'box-shadow:inset 0 1px 0 rgba(255,255,255,.95),inset 0 -1px 0 rgba(20,30,42,.06),0 0 0 1px rgba(20,30,42,.16),0 1px 0 rgba(20,30,42,.24),0 0 28px rgba(20,30,42,.14),0 -6px 14px -6px rgba(20,30,42,.18),0 10px 18px -6px rgba(20,30,42,.30),0 22px 38px -16px rgba(20,30,42,.32);}',
    '#cd-pages.cd-night .cd-page{background:#31373f;'
      +'box-shadow:inset 0 1px 0 rgba(255,255,255,.12),0 0 0 1px rgba(255,255,255,.14),0 1px 0 rgba(0,0,0,.6),0 0 28px rgba(0,0,0,.5),0 -6px 14px -6px rgba(0,0,0,.55),0 10px 18px -6px rgba(0,0,0,.62),0 22px 38px -16px rgba(0,0,0,.66);}',
    '.cd-realpaper #editor img{max-width:100% !important;max-height:820px !important;height:auto !important;}',
    '.cd-realpaper #editor svg,.cd-realpaper #editor canvas,.cd-realpaper #editor video{max-width:100% !important;max-height:820px !important;height:auto;}',
    '.cd-realpaper #editor table{max-width:100% !important;}',
    'html.cd-dark .t-prev{background:#262b31 !important;border-color:rgba(255,255,255,.14) !important;}',
    'html.cd-dark .tile{background:rgba(255,255,255,.03);}',
    '.editor h1.tpl-title{font-size:30px;line-height:1.15;margin:0 0 4px;}',
    '.editor p.tpl-sub{color:var(--ink-2);font-size:15px;margin:0 0 12px;}',
    '.editor table.tpl-meta{width:100%;border-collapse:collapse;margin:6px 0 14px;font-size:14px;}',
    '.editor table.tpl-meta td{border:1px solid var(--line);padding:6px 10px;vertical-align:top;}',
    '.editor table.tpl-meta td:first-child{width:26%;font-weight:600;background:rgba(27,107,147,.07);}',
    '.editor table.tpl-table{width:100%;}',
    '.editor table.tpl-table th{background:rgba(27,107,147,.09);text-align:left;}',
    '.editor hr.tpl-rule{border:0;border-top:1px solid var(--line);margin:16px 0;}',
    '.editor .tpl-ph{color:var(--ink-3);}',
    '.editor .tpl-guide{color:var(--ink-3);font-style:italic;font-size:13px;margin:-4px 0 12px;}',
    'html.cd-dark .editor table.tpl-meta td:first-child,html.cd-dark .editor table.tpl-table th{background:rgba(255,255,255,.07);}',
    '@keyframes cdPageIn{0%{opacity:.001;transform:translateY(10px) scale(.985)}60%{opacity:1}100%{transform:none;opacity:1}}',
    '.cd-page.cd-page-in{animation:cdPageIn .3s cubic-bezier(.34,1.3,.64,1) both;}'
  ].join('');
  var st=d.createElement('style'); st.id='cd-realpages-style'; st.textContent=css; (d.head||d.documentElement).appendChild(st);

  // ---- multi-row sticky header: tile each row at the true cumulative height ----
  function fixHeader(){
    try{
      var rows=['.titlebar','.ribtabs','.ribbon','.tabs'].map(function(s){return d.querySelector(s);}).filter(Boolean);
      var y=0;
      for(var i=0;i<rows.length;i++){ var t=(i===0)?0:(Math.floor(y)-1); rows[i].style.setProperty('top', t+'px','important'); y+=rows[i].getBoundingClientRect().height; }
    }catch(e){}
  }

  // ---- real page cards behind the writing flow ----
  var GAP=80, BOT=-14, pool=[];
  /* ---- night ink: in dark mode keep every author colour, lift only the ones too dark to read; emitted as rules keyed on the authored text, so the document is never touched ---- */
  function parseCol(str){
    try{ var c=str.trim().toLowerCase(), m;
      if((m=c.match(/^#([0-9a-f]{3})$/))) return [parseInt(m[1][0]+m[1][0],16),parseInt(m[1][1]+m[1][1],16),parseInt(m[1][2]+m[1][2],16)];
      if((m=c.match(/^#([0-9a-f]{6})/))) return [parseInt(m[1].slice(0,2),16),parseInt(m[1].slice(2,4),16),parseInt(m[1].slice(4,6),16)];
      if((m=c.match(/^rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/))) return [+m[1],+m[2],+m[3]];
      var d2=document.createElement('span'); d2.style.color=c; d2.style.display='none'; document.body.appendChild(d2); var cs=getComputedStyle(d2).color; d2.remove();
      if((m=cs.match(/(\d+)\D+(\d+)\D+(\d+)/))) return [+m[1],+m[2],+m[3]];
    }catch(e){} return null;
  }
  function toHsl(r,g,b){ r/=255;g/=255;b/=255; var mx=Math.max(r,g,b),mn=Math.min(r,g,b),h=0,s2=0,l=(mx+mn)/2; if(mx!==mn){ var d=mx-mn; s2=l>0.5?d/(2-mx-mn):d/(mx+mn); if(mx===r)h=((g-b)/d+(g<b?6:0)); else if(mx===g)h=(b-r)/d+2; else h=(r-g)/d+4; h/=6; } return [h,s2,l]; }
  function nightColor(rgb){ var hsl=toHsl(rgb[0],rgb[1],rgb[2]); var h=hsl[0],sat=hsl[1],l=hsl[2];
    if(sat<0.12) return null;                          /* black, greys: use the sheet's own ink */
    if(l>=0.55) return 'rgb('+rgb.join(',')+')';       /* already readable on a dark sheet: keep exactly */
    var L=0.68, S=Math.min(sat,0.85); return 'hsl('+Math.round(h*360)+','+Math.round(S*100)+'%,'+Math.round(L*100)+'%)'; }
  function cssEsc(t){ return t.replace(/\\/g,'\\\\').replace(/"/g,'\\"'); }
  function nightInk(on){
    try{
      var st=d.getElementById('cd-night-ink'); if(!st){ st=d.createElement('style'); st.id='cd-night-ink'; (d.head||d.documentElement).appendChild(st); }
      if(!on){ st.textContent=''; return; }
      var ed=d.getElementById('editor'); if(!ed) return;
      var rules=[], seen={};
      ed.querySelectorAll('[style*="color"],font[color]').forEach(function(el){
        var decl=null, sel=null;
        if(el.tagName==='FONT' && el.getAttribute('color')){ decl=el.getAttribute('color'); sel='.cd-dark .editor font[color="'+cssEsc(decl)+'"]'; }
        else { var m=(el.getAttribute('style')||'').match(/(?:^|;)\s*color\s*:\s*([^;]+)/i); if(!m) return; decl=m[1].trim(); sel='.cd-dark .editor [style*="'+cssEsc(m[0].replace(/^;/,'').trim())+'"]'; }
        if(seen[sel]) return; seen[sel]=1;
        var rgb=parseCol(decl); if(!rgb) return;
        var nc=nightColor(rgb); rules.push(sel+'{color:'+(nc||'var(--ink)')+' !important;}');
      });
      st.textContent=rules.join('\n');
    }catch(e){}
  }
  function isNight(){
    try{ var bg=getComputedStyle(d.body).backgroundColor, m=bg&&bg.match(/[\d.]+/g);
         if(m&&m.length>=3&&(m.length<4||parseFloat(m[3])>0)){ return (0.299*m[0]+0.587*m[1]+0.114*m[2])<128; } }catch(e){}
    try{ return d.documentElement.classList.contains('cd-dark')||d.body.getAttribute('data-theme')==='night'; }catch(e){ return false; }
  }
  function writingPaper(){ var ed=d.getElementById('editor'); return ed?ed.closest('.paper'):null; }
  function ensure(host,n){
    var wrap=host.querySelector(':scope > #cd-pages');
    if(!wrap){ wrap=d.createElement('div'); wrap.id='cd-pages'; host.insertBefore(wrap,host.firstChild); }
    while(pool.length<n){ var c=d.createElement('div'); c.className='cd-page cd-page-in'; wrap.appendChild(c); pool.push(c); }
    return wrap;
  }
  function render(){
    try{
      var paper=writingPaper(); if(!paper) return;
      paper.classList.add('cd-realpaper');
      /* the sheet keeps its old outline shadow through class rules (cd-pop) that outrank any stylesheet; inline !important wins every time */
      try{ paper.style.setProperty('box-shadow','none','important'); paper.style.setProperty('background','transparent','important'); paper.style.setProperty('border-radius','0','important'); paper.style.setProperty('outline','none','important'); paper.style.setProperty('border','0','important'); }catch(e){}
      try{ var cv=paper.closest('.canvas'); if(cv) cv.classList.add('cd-realcanvas'); }catch(e){}
      var seps=[].slice.call(paper.querySelectorAll('#pageguides .pg-sep'))
        .map(function(s){ return parseFloat(s.style.top)||0; }).filter(function(y){return y>0;})
        .sort(function(a,b){return a-b;});
      var PH=Math.max(paper.offsetHeight, paper.scrollHeight);
      /* Word draws every page at full size from the start: the first page is a full sheet even when empty,
         a new page appears whole the moment a line spills onto it, and the last page is never a stub. */
      var STD_H=970, FIRST_H=986, BOTTOM_PAD=40;
      /* the content's true extent: the lowest edge of the sheet's own children plus the bottom padding; never the sheet's own height, which includes the minimum we set */
      var contentH=0; try{ var kids=paper.children; for(var k=0;k<kids.length;k++){ var el=kids[k]; if(el.id==='cd-pages'||el.id==='pageguides') continue; var bb=el.offsetTop+el.offsetHeight; if(bb>contentH) contentH=bb; } contentH+=54; }catch(e){}
      var n=seps.length+1;
      var wrap=ensure(paper,n);
      var night=isNight(); wrap.classList.toggle('cd-night',night); nightInk(night);
      try{ var cv2=paper.closest('.canvas'); if(cv2) cv2.classList.toggle('cd-night',night); }catch(e){}
      for(var i=0;i<pool.length;i++) pool[i].style.display = i<n?'block':'none';
      var lastBottom=0;
      for(var i=0;i<n;i++){
        var top, h;
        if(n===1){ top=0; h=Math.max(FIRST_H, contentH); }
        else if(i===0){ top=0; h=(seps[0]+BOT)-0; }
        else { top=seps[i-1]+BOT+GAP; h=(i===n-1)? Math.max(STD_H, contentH-top) : ((seps[i]+BOT)-top); }
        h=Math.max(40,h);
        pool[i].style.top=top+'px'; pool[i].style.height=h+'px';
        lastBottom=top+h;
      }
      wrap.style.height=lastBottom+'px';
      /* extend the transparent sheet so the canvas scrolls to the foot of the last full page */
      paper.style.setProperty('min-height',(lastBottom+BOTTOM_PAD)+'px','important');
    }catch(e){}
  }
  var t=null; function schedule(){ if(t)clearTimeout(t); t=setTimeout(function(){ fixHeader(); render(); },50); }
  function hook(){
    var paper=writingPaper(); if(!paper) return false;
    var pg=paper.querySelector('#pageguides');
    if(pg){ try{ new MutationObserver(schedule).observe(pg,{childList:true}); }catch(e){} }
    var ed=d.getElementById('editor'); if(ed){ try{ ed.addEventListener('input',schedule,{passive:true}); }catch(e){} }
    try{ d.addEventListener('load', function(ev){ var t=ev.target; if(t && t.tagName==='IMG' && ed && ed.contains(t)){ setTimeout(function(){ try{ ed.dispatchEvent(new Event('input',{bubbles:true})); }catch(e){} schedule(); }, 30); } }, true); }catch(e){}
    try{ window.addEventListener('resize',schedule); }catch(e){}
    /* the size and font boxes follow the selection, as Word's do */
    function syncFontBoxes(){ try{ var sl=getSelection(); if(!sl||!sl.rangeCount) return; var n=sl.anchorNode; if(!n) return; var el=n.nodeType===1?n:n.parentElement; var edx=d.getElementById('editor'); if(!el||!edx||!edx.contains(el)) return; var cs=getComputedStyle(el);
        var px=parseFloat(cs.fontSize); var ss=d.getElementById('sizeSel'); if(px&&ss){ var pt=Math.round(px*0.75*2)/2; var opts=[].slice.call(ss.options); var tmp=null; opts.forEach(function(o){ if(o.className==='cd-tmp') tmp=o; }); var match=null; opts.forEach(function(o){ if(!match && o.className!=='cd-tmp' && parseFloat(o.value||o.textContent)===pt) match=o; }); if(match){ if(tmp) tmp.remove(); ss.value=match.value||match.textContent; } else { if(!tmp){ tmp=d.createElement('option'); tmp.className='cd-tmp'; ss.appendChild(tmp); } tmp.textContent=String(pt); tmp.value=String(pt); ss.value=String(pt); } }
        var fs=d.getElementById('fontSel'); if(fs&&cs.fontFamily){ var fam=cs.fontFamily.split(',')[0].replace(/["']/g,'').trim().toLowerCase(); [].slice.call(fs.options).forEach(function(o){ if((o.value||o.textContent).toLowerCase().indexOf(fam)===0) fs.value=o.value||o.textContent; }); } }catch(e){} }
    try{ d.addEventListener('selectionchange', function(){ setTimeout(syncFontBoxes,0); }); }catch(e){}
    try{ d.addEventListener('click', function(ev){ var t=ev.target; if(t&&t.closest&&t.closest('.ribbon,.rib-row,.ribtabs')) setTimeout(syncFontBoxes,80); }, true); }catch(e){}
    /* template fields: a click selects the whole field; once typed over, the muted style is removed */
    try{ d.addEventListener('click', function(ev){ var t=ev.target&&ev.target.closest&&ev.target.closest('.editor .tpl-ph'); if(t){ var r=d.createRange(); r.selectNodeContents(t); var sl=getSelection(); sl.removeAllRanges(); sl.addRange(r); } }, true); }catch(e){}
    try{ if(ed) ed.addEventListener('input', function(){ ed.querySelectorAll('.tpl-ph').forEach(function(el){ var tx=el.textContent||''; if(!/^\s*\[[\s\S]*\]\s*$/.test(tx)){ var p=el.parentNode; if(!p) return; while(el.firstChild) p.insertBefore(el.firstChild, el); p.removeChild(el); } }); }, {passive:true}); }catch(e){}
    try{ window.addEventListener('message',function(ev){ var m=ev&&ev.data; if(m&&(m.kind==='cd-theme-apply'||m.kind==='cd-smooth')) schedule(); }); }catch(e){}
    fixHeader(); render(); return true;
  }
  if(d.readyState!=='loading') hook(); else d.addEventListener('DOMContentLoaded',hook);
  var k=0,iv=setInterval(function(){ if(hook()||++k>20) clearInterval(iv); },400);
  setInterval(function(){ fixHeader(); schedule(); },1500);
})();
